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
* Tests if a value is `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( null );
* // returns false
*/
function isnan( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"./object.js":8,"./primitive.js":9}],7:[function(require,module,exports){
'use strict';

/**
* Test if a value is `NaN`.
*
* @module @stdlib/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*
* @example
* // Use interface to check for `NaN` primitives...
* var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns false
*
* @example
* // Use interface to check for `NaN` objects...
* var isnan = require( '@stdlib/assert/is-nan' ).isObject;
*
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isnan = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isnan, 'isPrimitive', isPrimitive );
setReadOnly( isnan, 'isObject', isObject );


// EXPORTS //

module.exports = isnan;

},{"./generic.js":6,"./object.js":8,"./primitive.js":9,"@stdlib/utils/define-read-only-property":88}],8:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a number object having a value of `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value of `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value.valueOf() )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":11,"@stdlib/math/base/assert/is-nan":18}],9:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a `NaN` number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `NaN` number primitive
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns false
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":11,"@stdlib/math/base/assert/is-nan":18}],10:[function(require,module,exports){
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

},{"./object.js":12,"./primitive.js":13}],11:[function(require,module,exports){
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

},{"./generic.js":10,"./object.js":12,"./primitive.js":13,"@stdlib/utils/define-read-only-property":88}],12:[function(require,module,exports){
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

},{"./try2serialize.js":15,"@stdlib/utils/detect-tostringtag-support":92,"@stdlib/utils/native-class":93}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],15:[function(require,module,exports){
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

},{"./tostring.js":14}],16:[function(require,module,exports){
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

},{"./is_infinite.js":17}],17:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":79,"@stdlib/math/constants/float64-pinf":82}],18:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"./abs.js":20}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./ceil.js":22}],24:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":60,"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/base/utils/float64-to-words":70}],25:[function(require,module,exports){
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

},{"./copysign.js":24}],26:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":30,"@stdlib/math/base/special/kernel-sin":32,"@stdlib/math/base/special/rempio2":36,"@stdlib/math/base/utils/float64-get-high-word":64}],27:[function(require,module,exports){
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

},{"./cos.js":26}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./floor.js":28}],30:[function(require,module,exports){
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

},{"./kernel_cos.js":31}],31:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":53}],32:[function(require,module,exports){
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

},{"./kernel_sin.js":33}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./ldexp.js":35}],35:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":16,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/copysign":25,"@stdlib/math/base/utils/float64-exponent":58,"@stdlib/math/base/utils/float64-from-words":60,"@stdlib/math/base/utils/float64-normalize":68,"@stdlib/math/base/utils/float64-to-words":70,"@stdlib/math/constants/float64-exponent-bias":74,"@stdlib/math/constants/float64-max-base2-exponent":77,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":76,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":78,"@stdlib/math/constants/float64-ninf":79,"@stdlib/math/constants/float64-pinf":82}],36:[function(require,module,exports){
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

},{"./rempio2.js":38}],37:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":29,"@stdlib/math/base/special/ldexp":34}],38:[function(require,module,exports){
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

},{"./kernel_rempio2.js":37,"./rempio2_medium.js":39,"@stdlib/math/base/utils/float64-from-words":60,"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/base/utils/float64-get-low-word":66}],39:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":40,"@stdlib/math/base/utils/float64-get-high-word":64}],40:[function(require,module,exports){
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

},{"./round.js":41}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"./sin.js":43}],43:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":30,"@stdlib/math/base/special/kernel-sin":32,"@stdlib/math/base/special/rempio2":36,"@stdlib/math/base/utils/float64-get-high-word":64}],44:[function(require,module,exports){
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

},{"./sinpi.js":45}],45:[function(require,module,exports){
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
var PI = require( '@stdlib/math/constants/float64-pi' );


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
} // end FUNCTION sinpi()


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/math/base/assert/is-infinite":16,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/abs":21,"@stdlib/math/base/special/copysign":25,"@stdlib/math/base/special/cos":27,"@stdlib/math/base/special/sin":42,"@stdlib/math/constants/float64-pi":81}],46:[function(require,module,exports){
'use strict';

/**
* Evaluate the trigamma function.
*
* @module @stdlib/math/base/special/trigamma
*
* @example
* var trigamma = require( '@stdlib/math/base/special/trigamma' );
*
* var v = trigamma( -2.5 );
* // returns ~9.539
*
* v = trigamma( 1.0 );
* // returns ~1.645
*
* v = trigamma( 10.0 );
* // returns ~0.105
*
* v = trigamma( NaN );
* // returns NaN
*
* v = trigamma( -1.0 );
* // returns NaN
*/

// MODULES //

var trigamma = require( './trigamma.js' );


// EXPORTS //

module.exports = trigamma;

},{"./trigamma.js":47}],47:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_65_0/boost/math/special_functions/trigamma.hpp}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var floor = require( '@stdlib/math/base/special/floor' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI_SQUARED = require( '@stdlib/math/constants/float64-pi-squared' );


// VARIABLES //

var YOFFSET24 = 3.558437347412109375;

// Polynomial coefficients...
var P12 = [
	-0.999999999999999082554457936871832533,
	-4.71237311120865266379041700054847734,
	-7.94125711970499027763789342500817316,
	-5.74657746697664735258222071695644535,
	-0.404213349456398905981223965160595687,
	2.47877781178642876561595890095758896,
	2.07714151702455125992166949812126433,
	0.858877899162360138844032265418028567,
	0.20499222604410032375789018837922397,
	0.0272103140348194747360175268778415049,
	0.0015764849020876949848954081173520686
];
var Q12 = [
	1.0,
	4.71237311120863419878375031457715223,
	9.58619118655339853449127952145877467,
	11.0940067269829372437561421279054968,
	8.09075424749327792073276309969037885,
	3.87705890159891405185343806884451286,
	1.22758678701914477836330837816976782,
	0.249092040606385004109672077814668716,
	0.0295750413900655597027079600025569048,
	0.00157648490200498142247694709728858139,
	0.161264050344059471721062360645432809e-14
];
var P24 = [
	-2.55843734739907925764326773972215085,
	-12.2830208240542011967952466273455887,
	-23.9195022162767993526575786066414403,
	-24.9256431504823483094158828285470862,
	-14.7979122765478779075108064826412285,
	-4.46654453928610666393276765059122272,
	-0.0191439033405649675717082465687845002,
	0.515412052554351265708917209749037352,
	0.195378348786064304378247325360320038,
	0.0334761282624174313035014426794245393,
	0.002373665205942206348500250056602687,
	0
];
var Q24 = [
	1.0,
	4.80098558454419907830670928248659245,
	9.99220727843170133895059300223445265,
	11.8896146167631330735386697123464976,
	8.96613256683809091593793565879092581,
	4.47254136149624110878909334574485751,
	1.48600982028196527372434773913633152,
	0.319570735766764237068541501137990078,
	0.0407358345787680953107374215319322066,
	0.00237366520593271641375755486420859837,
	0.239554887903526152679337256236302116e-15,
	-0.294749244740618656265237072002026314e-17
];
var P48 = [
	0.166626112697021464248967707021688845e-16,
	0.499999999999997739552090249208808197,
	6.40270945019053817915772473771553187,
	41.3833374155000608013677627389343329,
	166.803341854562809335667241074035245,
	453.39964786925369319960722793414521,
	851.153712317697055375935433362983944,
	1097.70657567285059133109286478004458,
	938.431232478455316020076349367632922,
	487.268001604651932322080970189930074,
	119.953445242335730062471193124820659
];
var Q48 = [
	1.0,
	12.4720855670474488978638945855932398,
	78.6093129753298570701376952709727391,
	307.470246050318322489781182863190127,
	805.140686101151538537565264188630079,
	1439.12019760292146454787601409644413,
	1735.6105285756048831268586001383127,
	1348.32500712856328019355198611280536,
	607.225985860570846699704222144650563,
	119.952317857277045332558673164517227,
	0.000140165918355036060868680809129436084
];
var P816 = [
	-0.184828315274146610610872315609837439e-19,
	0.500000000000000004122475157735807738,
	3.02533865247313349284875558880415875,
	13.5995927517457371243039532492642734,
	35.3132224283087906757037999452941588,
	67.1639424550714159157603179911505619,
	83.5767733658513967581959839367419891,
	71.073491212235705900866411319363501,
	35.8621515614725564575893663483998663,
	8.72152231639983491987779743154333318
];
var Q816 = [
	1.0,
	5.71734397161293452310624822415866372,
	25.293404179620438179337103263274815,
	62.2619767967468199111077640625328469,
	113.955048909238993473389714972250235,
	130.807138328938966981862203944329408,
	102.423146902337654110717764213057753,
	44.0424772805245202514468199602123565,
	8.89898032477904072082994913461386099,
	-0.0296627336872039988632793863671456398
];
var P16INF = [
	0.0,
	0.500000000000000000000000000000087317,
	0.345625669885456215194494735902663968,
	9.62895499360842232127552650044647769,
	3.5936085382439026269301003761320812,
	49.459599118438883265036646019410669,
	7.77519237321893917784735690560496607,
	74.4536074488178075948642351179304121,
	2.75209340397069050436806159297952699,
	23.9292359711471667884504840186561598,
	0
];
var Q16INF = [
	1.0,
	0.357918006437579097055656138920742037,
	19.1386039850709849435325005484512944,
	0.874349081464143606016221431763364517,
	98.6516097434855572678195488061432509,
	-16.1051972833382893468655223662534306,
	154.316860216253720989145047141653727,
	-40.2026880424378986053105969312264534,
	60.1679136674264778074736441126810223,
	-13.3414844622256422644504472438320114,
	2.53795636200649908779512969030363442
];


// FUNCTIONS //

// Compile functions to evaluate rational functions based on the above coefficients...
var rateval12 = evalrational( P12, Q12 );
var rateval24 = evalrational( P24, Q24 );
var rateval48 = evalrational( P48, Q48 );
var rateval816 = evalrational( P816, Q816 );
var rateval16INF = evalrational( P16INF, Q16INF );


// MAIN //

/**
* Evaluates the trigamma function.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = trigamma( -2.5 );
* // returns ~9.539
*
* @example
* var v = trigamma( 1.0 );
* // returns ~1.645
*
* @example
* var v = trigamma( 10.0 );
* // returns ~0.105
*
* @example
* var v = trigamma( NaN );
* // returns NaN
*
* @example
* var v = trigamma( -1.0 );
* // returns NaN
*/
function trigamma( x ) {
	var result;
	var s;
	var y;
	var z;

	result = 0.0;

	// Check for negative arguments and use reflection:
	if ( x <= 0 ) {
		if ( floor( x ) === x ) {
			return NaN;
		}
		s = sinpi( x );
		z = 1.0 - x;
		return -trigamma( z ) + ( PI_SQUARED / ( s*s ) );
	}
	if ( x < 1.0 ) {
		result = 1.0 / ( x*x );
		x += 1.0;
	}
	if ( x <= 2.0 ) {
		result += ( 2.0+rateval12( x ) ) / ( x*x );
	}
	else if ( x <= 4.0 ) {
		result += ( YOFFSET24+rateval24( x ) ) / ( x*x );
	}
	else if ( x <= 8.0 ) {
		y = 1.0 / x;
		result += ( 1.0+rateval48( y ) ) / x;
	}
	else if ( x <= 16.0 ) {
		y = 1.0 / x;
		result += ( 1.0+rateval816( y ) ) / x;
	}
	else {
		y = 1.0 / x;
		result += ( 1.0+rateval16INF( y ) ) / x;
	}
	return result;
} // end FUNCTION trigamma()


// EXPORTS //

module.exports = trigamma;

},{"@stdlib/math/base/special/floor":29,"@stdlib/math/base/special/sinpi":44,"@stdlib/math/base/tools/evalrational":56,"@stdlib/math/constants/float64-pi-squared":80}],48:[function(require,module,exports){
module.exports={  "x": [-0.01,-0.109445,-0.20889000000000002,-0.30833500000000003,-0.40778000000000003,-0.50722500000000004,-0.60667000000000004,-0.70611500000000005,-0.80556000000000005,-0.90500500000000006,-1.0044500000000001,-1.1038950000000001,-1.2033400000000001,-1.3027850000000001,-1.4022300000000001,-1.5016750000000001,-1.6011200000000001,-1.7005650000000001,-1.8000100000000001,-1.8994550000000001,-1.9989000000000001,-2.0983450000000001,-2.1977899999999999,-2.2972349999999997,-2.3966799999999999,-2.4961250000000001,-2.5955699999999999,-2.6950149999999997,-2.7944599999999999,-2.8939050000000002,-2.99335,-3.0927949999999997,-3.19224,-3.2916850000000002,-3.39113,-3.4905749999999998,-3.59002,-3.6894650000000002,-3.78891,-3.8883549999999998,-3.9878,-4.0872450000000002,-4.1866900000000005,-4.2861349999999998,-4.38558,-4.4850250000000003,-4.5844699999999996,-4.6839149999999998,-4.7833600000000001,-4.8828050000000003,-4.9822500000000005,-5.0816949999999999,-5.1811400000000001,-5.2805850000000003,-5.3800299999999996,-5.4794749999999999,-5.5789200000000001,-5.6783650000000003,-5.7778100000000006,-5.8772549999999999,-5.9767000000000001,-6.0761450000000004,-6.1755899999999997,-6.2750349999999999,-6.3744800000000001,-6.4739250000000004,-6.5733700000000006,-6.6728149999999999,-6.7722600000000002,-6.8717050000000004,-6.9711499999999997,-7.070595,-7.1700400000000002,-7.2694850000000004,-7.3689300000000006,-7.468375,-7.5678200000000002,-7.6672650000000004,-7.7667099999999998,-7.866155,-7.9656000000000002,-8.0650449999999996,-8.1644900000000007,-8.263935,-8.3633800000000011,-8.4628250000000005,-8.5622699999999998,-8.6617150000000009,-8.7611600000000003,-8.8606049999999996,-8.9600500000000007,-9.0594950000000001,-9.1589399999999994,-9.2583850000000005,-9.3578299999999999,-9.457275000000001,-9.5567200000000003,-9.6561649999999997,-9.7556100000000008,-9.8550550000000001,-9.9545000000000012,-10.053945000000001,-10.15339,-10.252835000000001,-10.35228,-10.451725,-10.551170000000001,-10.650615,-10.75006,-10.849505000000001,-10.94895,-11.048395000000001,-11.14784,-11.247285,-11.346730000000001,-11.446175,-11.545620000000001,-11.645065000000001,-11.74451,-11.843955000000001,-11.9434,-12.042845,-12.142290000000001,-12.241735,-12.34118,-12.440625000000001,-12.54007,-12.639515000000001,-12.738960000000001,-12.838405,-12.937850000000001,-13.037295,-13.136740000000001,-13.236185000000001,-13.33563,-13.435075000000001,-13.534520000000001,-13.633965,-13.733410000000001,-13.832855,-13.9323,-14.031745000000001,-14.13119,-14.230635000000001,-14.330080000000001,-14.429525,-14.528970000000001,-14.628415,-14.727860000000002,-14.827305000000001,-14.92675,-15.026195000000001,-15.125640000000001,-15.225085,-15.324530000000001,-15.423975,-15.52342,-15.622865000000001,-15.72231,-15.821755000000001,-15.921200000000001,-16.020645000000002,-16.120090000000001,-16.219535000000004,-16.318980000000003,-16.418425000000003,-16.517870000000002,-16.617315000000001,-16.716760000000004,-16.816205000000004,-16.915650000000003,-17.015095000000002,-17.114540000000002,-17.213985000000001,-17.313430000000004,-17.412875000000003,-17.512320000000003,-17.611765000000002,-17.711210000000001,-17.810655000000004,-17.910100000000003,-18.009545000000003,-18.108990000000002,-18.208435000000001,-18.307880000000001,-18.407325000000004,-18.506770000000003,-18.606215000000002,-18.705660000000002,-18.805105000000001,-18.904550000000004,-19.003995000000003,-19.103440000000003,-19.202885000000002,-19.302330000000001,-19.401775000000004,-19.501220000000004,-19.600665000000003,-19.700110000000002,-19.799555000000002,-19.899000000000004,-19.998445000000004,-20.097890000000003,-20.197335000000002,-20.296780000000002,-20.396225000000001,-20.495670000000004,-20.595115000000003,-20.694560000000003,-20.794005000000002,-20.893450000000001,-20.992895000000004,-21.092340000000004,-21.191785000000003,-21.291230000000002,-21.390675000000002,-21.490120000000001,-21.589565000000004,-21.689010000000003,-21.788455000000003,-21.887900000000002,-21.987345000000001,-22.086790000000004,-22.186235000000003,-22.285680000000003,-22.385125000000002,-22.484570000000001,-22.584015000000004,-22.683460000000004,-22.782905000000003,-22.882350000000002,-22.981795000000002,-23.081240000000005,-23.180685000000004,-23.280130000000003,-23.379575000000003,-23.479020000000002,-23.578465000000001,-23.677910000000004,-23.777355000000004,-23.876800000000003,-23.976245000000002,-24.075690000000002,-24.175135000000004,-24.274580000000004,-24.374025000000003,-24.473470000000002,-24.572915000000002,-24.672360000000001,-24.771805000000004,-24.871250000000003,-24.970695000000003,-25.070140000000002,-25.169585000000001,-25.269030000000004,-25.368475000000004,-25.467920000000003,-25.567365000000002,-25.666810000000002,-25.766255000000005,-25.865700000000004,-25.965145000000003,-26.064590000000003,-26.164035000000002,-26.263480000000005,-26.362925000000004,-26.462370000000004,-26.561815000000003,-26.661260000000002,-26.760705000000002,-26.860150000000004,-26.959595000000004,-27.059040000000003,-27.158485000000002,-27.257930000000002,-27.357375000000005,-27.456820000000004,-27.556265000000003,-27.655710000000003,-27.755155000000002,-27.854600000000001,-27.954045000000004,-28.053490000000004,-28.152935000000003,-28.252380000000002,-28.351825000000002,-28.451270000000005,-28.550715000000004,-28.650160000000003,-28.749605000000003,-28.849050000000002,-28.948495000000005,-29.047940000000004,-29.147385000000003,-29.246830000000003,-29.346275000000002,-29.445720000000005,-29.545165000000004,-29.644610000000004,-29.744055000000003,-29.843500000000002,-29.942945000000002,-30.042390000000005,-30.141835000000004,-30.241280000000003,-30.340725000000003,-30.440170000000002,-30.539615000000005,-30.639060000000004,-30.738505000000004,-30.837950000000003,-30.937395000000002,-31.036840000000002,-31.136285000000004,-31.235730000000004,-31.335175000000003,-31.434620000000002,-31.534065000000002,-31.633510000000005,-31.732955000000004,-31.832400000000003,-31.931845000000003,-32.031289999999998,-32.130735000000001,-32.230179999999997,-32.329625,-32.429070000000003,-32.528514999999999,-32.627960000000002,-32.727404999999997,-32.82685,-32.926295000000003,-33.025739999999999,-33.125185000000002,-33.224629999999998,-33.324075000000001,-33.423520000000003,-33.522964999999999,-33.622410000000002,-33.721854999999998,-33.821300000000001,-33.920744999999997,-34.020189999999999,-34.119635000000002,-34.219079999999998,-34.318525000000001,-34.417969999999997,-34.517415,-34.616860000000003,-34.716304999999998,-34.815750000000001,-34.915194999999997,-35.01464,-35.114085000000003,-35.213529999999999,-35.312975000000002,-35.412419999999997,-35.511865,-35.611310000000003,-35.710754999999999,-35.810200000000002,-35.909644999999998,-36.00909,-36.108535000000003,-36.207979999999999,-36.307425000000002,-36.406869999999998,-36.506315000000001,-36.605759999999997,-36.705204999999999,-36.804650000000002,-36.904094999999998,-37.003540000000001,-37.102984999999997,-37.20243,-37.301875000000003,-37.401319999999998,-37.500765000000001,-37.600209999999997,-37.699655,-37.799100000000003,-37.898544999999999,-37.997990000000001,-38.097434999999997,-38.19688,-38.296325000000003,-38.395769999999999,-38.495215000000002,-38.594659999999998,-38.694105,-38.793550000000003,-38.892994999999999,-38.992440000000002,-39.091884999999998,-39.191330000000001,-39.290775000000004,-39.390219999999999,-39.489665000000002,-39.589109999999998,-39.688555000000001,-39.788000000000004,-39.887445,-39.986890000000002,-40.086334999999998,-40.185780000000001,-40.285224999999997,-40.38467,-40.484115000000003,-40.583559999999999,-40.683005000000001,-40.782449999999997,-40.881895,-40.981340000000003,-41.080784999999999,-41.180230000000002,-41.279674999999997,-41.37912,-41.478565000000003,-41.578009999999999,-41.677455000000002,-41.776899999999998,-41.876345000000001,-41.975790000000003,-42.075234999999999,-42.174680000000002,-42.274124999999998,-42.373570000000001,-42.473015000000004,-42.57246,-42.671905000000002,-42.771349999999998,-42.870795000000001,-42.970239999999997,-43.069685,-43.169130000000003,-43.268574999999998,-43.368020000000001,-43.467464999999997,-43.56691,-43.666355000000003,-43.765799999999999,-43.865245000000002,-43.964689999999997,-44.064135,-44.163580000000003,-44.263024999999999,-44.362470000000002,-44.461914999999998,-44.561360000000001,-44.660805000000003,-44.760249999999999,-44.859695000000002,-44.959139999999998,-45.058585000000001,-45.158030000000004,-45.257474999999999,-45.356920000000002,-45.456364999999998,-45.555810000000001,-45.655255000000004,-45.7547,-45.854145000000003,-45.953589999999998,-46.053035000000001,-46.152480000000004,-46.251925,-46.351370000000003,-46.450814999999999,-46.550260000000002,-46.649704999999997,-46.74915,-46.848595000000003,-46.948039999999999,-47.047485000000002,-47.146929999999998,-47.246375,-47.345820000000003,-47.445264999999999,-47.544710000000002,-47.644154999999998,-47.743600000000001,-47.843045000000004,-47.942489999999999,-48.041935000000002,-48.141379999999998,-48.240825000000001,-48.340270000000004,-48.439715,-48.539160000000003,-48.638604999999998,-48.738050000000001,-48.837495000000004,-48.93694,-49.036385000000003,-49.135829999999999,-49.235275000000001,-49.334719999999997,-49.434165,-49.533610000000003,-49.633054999999999,-49.732500000000002,-49.831944999999997,-49.93139,-50.030835000000003,-50.130279999999999,-50.229725000000002,-50.329169999999998,-50.428615000000001,-50.528060000000004,-50.627504999999999,-50.726950000000002,-50.826394999999998,-50.925840000000001,-51.025285000000004,-51.12473,-51.224175000000002,-51.323619999999998,-51.423065000000001,-51.522510000000004,-51.621955,-51.721400000000003,-51.820844999999998,-51.920290000000001,-52.019735000000004,-52.11918,-52.218625000000003,-52.318069999999999,-52.417515000000002,-52.516960000000005,-52.616405,-52.715850000000003,-52.815294999999999,-52.914740000000002,-53.014184999999998,-53.113630000000001,-53.213075000000003,-53.312519999999999,-53.411965000000002,-53.511409999999998,-53.610855000000001,-53.710300000000004,-53.809744999999999,-53.909190000000002,-54.008634999999998,-54.108080000000001,-54.207525000000004,-54.30697,-54.406415000000003,-54.505859999999998,-54.605305000000001,-54.704750000000004,-54.804195,-54.903640000000003,-55.003084999999999,-55.102530000000002,-55.201975000000004,-55.30142,-55.400865000000003,-55.500309999999999,-55.599755000000002,-55.699199999999998,-55.798645,-55.898090000000003,-55.997534999999999,-56.096980000000002,-56.196424999999998,-56.295870000000001,-56.395315000000004,-56.494759999999999,-56.594205000000002,-56.693649999999998,-56.793095000000001,-56.892540000000004,-56.991985,-57.091430000000003,-57.190874999999998,-57.290320000000001,-57.389765000000004,-57.48921,-57.588655000000003,-57.688099999999999,-57.787545000000001,-57.886990000000004,-57.986435,-58.085880000000003,-58.185324999999999,-58.284770000000002,-58.384215000000005,-58.48366,-58.583105000000003,-58.682549999999999,-58.781995000000002,-58.881440000000005,-58.980885000000001,-59.080330000000004,-59.179774999999999,-59.279220000000002,-59.378664999999998,-59.478110000000001,-59.577555000000004,-59.677,-59.776445000000002,-59.875889999999998,-59.975335000000001,-60.074780000000004,-60.174225,-60.273670000000003,-60.373114999999999,-60.472560000000001,-60.572005000000004,-60.67145,-60.770895000000003,-60.870339999999999,-60.969785000000002,-61.069230000000005,-61.168675,-61.268120000000003,-61.367564999999999,-61.467010000000002,-61.566455000000005,-61.665900000000001,-61.765345000000003,-61.864789999999999,-61.964235000000002,-62.063679999999998,-62.163125000000001,-62.262570000000004,-62.362015,-62.461460000000002,-62.560904999999998,-62.660350000000001,-62.759795000000004,-62.85924,-62.958685000000003,-63.058129999999998,-63.157575000000001,-63.257020000000004,-63.356465,-63.455910000000003,-63.555354999999999,-63.654800000000002,-63.754245000000004,-63.85369,-63.953135000000003,-64.052580000000006,-64.152025000000009,-64.251470000000012,-64.350915000000015,-64.450360000000003,-64.549805000000006,-64.649250000000009,-64.748695000000012,-64.848140000000015,-64.947585000000004,-65.047030000000007,-65.146475000000009,-65.245920000000012,-65.345365000000015,-65.444810000000004,-65.544255000000007,-65.64370000000001,-65.743145000000013,-65.842590000000015,-65.942035000000004,-66.041480000000007,-66.14092500000001,-66.240370000000013,-66.339815000000016,-66.439260000000004,-66.538705000000007,-66.63815000000001,-66.737595000000013,-66.837040000000016,-66.936485000000005,-67.035930000000008,-67.13537500000001,-67.234820000000013,-67.334265000000002,-67.433710000000005,-67.533155000000008,-67.632600000000011,-67.732045000000014,-67.831490000000002,-67.930935000000005,-68.030380000000008,-68.129825000000011,-68.229270000000014,-68.328715000000003,-68.428160000000005,-68.527605000000008,-68.627050000000011,-68.726495000000014,-68.825940000000003,-68.925385000000006,-69.024830000000009,-69.124275000000011,-69.223720000000014,-69.323165000000003,-69.422610000000006,-69.522055000000009,-69.621500000000012,-69.720945000000015,-69.820390000000003,-69.919835000000006,-70.019280000000009,-70.118725000000012,-70.218170000000015,-70.317615000000004,-70.417060000000006,-70.516505000000009,-70.615950000000012,-70.715395000000015,-70.814840000000004,-70.914285000000007,-71.01373000000001,-71.113175000000012,-71.212620000000015,-71.312065000000004,-71.411510000000007,-71.51095500000001,-71.610400000000013,-71.709845000000016,-71.809290000000004,-71.908735000000007,-72.00818000000001,-72.107625000000013,-72.207070000000016,-72.306515000000005,-72.405960000000007,-72.50540500000001,-72.604850000000013,-72.704295000000016,-72.803740000000005,-72.903185000000008,-73.002630000000011,-73.102075000000013,-73.201520000000002,-73.300965000000005,-73.400410000000008,-73.499855000000011,-73.599300000000014,-73.698745000000002,-73.798190000000005,-73.897635000000008,-73.997080000000011,-74.096525000000014,-74.195970000000003,-74.295415000000006,-74.394860000000008,-74.494305000000011,-74.593750000000014,-74.693195000000003,-74.792640000000006,-74.892085000000009,-74.991530000000012,-75.090975000000014,-75.190420000000003,-75.289865000000006,-75.389310000000009,-75.488755000000012,-75.588200000000015,-75.687645000000003,-75.787090000000006,-75.886535000000009,-75.985980000000012,-76.085425000000015,-76.184870000000004,-76.284315000000007,-76.383760000000009,-76.483205000000012,-76.582650000000015,-76.682095000000004,-76.781540000000007,-76.88098500000001,-76.980430000000013,-77.079875000000015,-77.179320000000004,-77.278765000000007,-77.37821000000001,-77.477655000000013,-77.577100000000016,-77.676545000000004,-77.775990000000007,-77.87543500000001,-77.974880000000013,-78.074325000000016,-78.173770000000005,-78.273215000000008,-78.37266000000001,-78.472105000000013,-78.571550000000016,-78.670995000000005,-78.770440000000008,-78.869885000000011,-78.969330000000014,-79.068775000000016,-79.168220000000005,-79.267665000000008,-79.367110000000011,-79.466555000000014,-79.566000000000017,-79.665445000000005,-79.764890000000008,-79.864335000000011,-79.963780000000014,-80.063225000000003,-80.162670000000006,-80.262115000000009,-80.361560000000011,-80.461005000000014,-80.560450000000003,-80.659895000000006,-80.759340000000009,-80.858785000000012,-80.958230000000015,-81.057675000000003,-81.157120000000006,-81.256565000000009,-81.356010000000012,-81.455455000000015,-81.554900000000004,-81.654345000000006,-81.753790000000009,-81.853235000000012,-81.952680000000015,-82.052125000000004,-82.151570000000007,-82.25101500000001,-82.350460000000012,-82.449905000000015,-82.549350000000004,-82.648795000000007,-82.74824000000001,-82.847685000000013,-82.947130000000016,-83.046575000000004,-83.146020000000007,-83.24546500000001,-83.344910000000013,-83.444355000000016,-83.543800000000005,-83.643245000000007,-83.74269000000001,-83.842135000000013,-83.941580000000016,-84.041025000000005,-84.140470000000008,-84.239915000000011,-84.339360000000013,-84.438805000000016,-84.538250000000005,-84.637695000000008,-84.737140000000011,-84.836585000000014,-84.936030000000017,-85.035475000000005,-85.134920000000008,-85.234365000000011,-85.333810000000014,-85.433255000000017,-85.532700000000006,-85.632145000000008,-85.731590000000011,-85.831035000000014,-85.930480000000003,-86.029925000000006,-86.129370000000009,-86.228815000000012,-86.328260000000014,-86.427705000000003,-86.527150000000006,-86.626595000000009,-86.726040000000012,-86.825485000000015,-86.924930000000003,-87.024375000000006,-87.123820000000009,-87.223265000000012,-87.322710000000015,-87.422155000000004,-87.521600000000007,-87.621045000000009,-87.720490000000012,-87.819935000000015,-87.919380000000004,-88.018825000000007,-88.11827000000001,-88.217715000000013,-88.317160000000015,-88.416605000000004,-88.516050000000007,-88.61549500000001,-88.714940000000013,-88.814385000000016,-88.913830000000004,-89.013275000000007,-89.11272000000001,-89.212165000000013,-89.311610000000016,-89.411055000000005,-89.510500000000008,-89.60994500000001,-89.709390000000013,-89.808835000000016,-89.908280000000005,-90.007725000000008,-90.107170000000011,-90.206615000000014,-90.306060000000016,-90.405505000000005,-90.504950000000008,-90.604395000000011,-90.703840000000014,-90.803285000000017,-90.902730000000005,-91.002175000000008,-91.101620000000011,-91.201065000000014,-91.300510000000017,-91.399955000000006,-91.499400000000009,-91.598845000000011,-91.698290000000014,-91.797735000000017,-91.897180000000006,-91.996625000000009,-92.096070000000012,-92.195515000000015,-92.294960000000017,-92.394405000000006,-92.493850000000009,-92.593295000000012,-92.692740000000015,-92.792185000000003,-92.891630000000006,-92.991075000000009,-93.090520000000012,-93.189965000000015,-93.289410000000004,-93.388855000000007,-93.48830000000001,-93.587745000000012,-93.687190000000015,-93.786635000000004,-93.886080000000007,-93.98552500000001,-94.084970000000013,-94.184415000000016,-94.283860000000004,-94.383305000000007,-94.48275000000001,-94.582195000000013,-94.681640000000016,-94.781085000000004,-94.880530000000007,-94.97997500000001,-95.079420000000013,-95.178865000000016,-95.278310000000005,-95.377755000000008,-95.477200000000011,-95.576645000000013,-95.676090000000016,-95.775535000000005,-95.874980000000008,-95.974425000000011,-96.073870000000014,-96.173315000000017,-96.272760000000005,-96.372205000000008,-96.471650000000011,-96.571095000000014,-96.670540000000017,-96.769985000000005,-96.869430000000008,-96.968875000000011,-97.068320000000014,-97.167765000000017,-97.267210000000006,-97.366655000000009,-97.466100000000012,-97.565545000000014,-97.664990000000017,-97.764435000000006,-97.863880000000009,-97.963325000000012,-98.062770000000015,-98.162215000000018,-98.261660000000006,-98.361105000000009,-98.460550000000012,-98.559995000000015,-98.659440000000004,-98.758885000000006,-98.858330000000009,-98.957775000000012,-99.057220000000015,-99.156665000000004,-99.256110000000007,-99.35555500000001,-99.455000000000013,-99.554445000000015,-99.653890000000004,-99.753335000000007,-99.85278000000001,-99.952225000000013,-100.05167000000002,-100.151115,-100.25056000000001,-100.35000500000001,-100.44945000000001,-100.54889500000002,-100.64834,-100.74778500000001,-100.84723000000001,-100.94667500000001,-101.04612000000002,-101.145565,-101.24501000000001,-101.34445500000001,-101.44390000000001,-101.54334500000002,-101.64279000000001,-101.74223500000001,-101.84168000000001,-101.94112500000001,-102.04057000000002,-102.14001500000001,-102.23946000000001,-102.33890500000001,-102.43835000000001,-102.53779500000002,-102.63724000000001,-102.73668500000001,-102.83613000000001,-102.93557500000001,-103.03502000000002,-103.13446500000001,-103.23391000000001,-103.33335500000001,-103.43280000000001,-103.53224500000002,-103.63169000000001,-103.73113500000001,-103.83058000000001,-103.93002500000001,-104.02947000000002,-104.12891500000001,-104.22836000000001,-104.32780500000001,-104.42725000000002,-104.52669500000002,-104.62614000000001,-104.72558500000001,-104.82503000000001,-104.92447500000002,-105.02392000000002,-105.12336500000001,-105.22281000000001,-105.32225500000001,-105.42170000000002,-105.521145,-105.62059000000001,-105.72003500000001,-105.81948000000001,-105.91892500000002,-106.01837,-106.11781500000001,-106.21726000000001,-106.31670500000001,-106.41615000000002,-106.515595,-106.61504000000001,-106.71448500000001,-106.81393000000001,-106.91337500000002,-107.01282,-107.11226500000001,-107.21171000000001,-107.31115500000001,-107.41060000000002,-107.51004500000001,-107.60949000000001,-107.70893500000001,-107.80838000000001,-107.90782500000002,-108.00727000000001,-108.10671500000001,-108.20616000000001,-108.30560500000001,-108.40505000000002,-108.50449500000001,-108.60394000000001,-108.70338500000001,-108.80283000000001,-108.90227500000002,-109.00172000000001,-109.10116500000001,-109.20061000000001,-109.30005500000001,-109.39950000000002,-109.49894500000001,-109.59839000000001,-109.69783500000001,-109.79728000000001,-109.89672500000002,-109.99617000000001,-110.09561500000001,-110.19506000000001,-110.29450500000002,-110.39395000000002,-110.49339500000001,-110.59284000000001,-110.69228500000001,-110.79173000000002,-110.89117500000002,-110.99062000000001,-111.09006500000001,-111.18951000000001,-111.28895500000002,-111.3884,-111.48784500000001,-111.58729000000001,-111.68673500000001,-111.78618000000002,-111.885625,-111.98507000000001,-112.08451500000001,-112.18396000000001,-112.28340500000002,-112.38285,-112.48229500000001,-112.58174000000001,-112.68118500000001,-112.78063000000002,-112.88007500000001,-112.97952000000001,-113.07896500000001,-113.17841000000001,-113.27785500000002,-113.37730000000001,-113.47674500000001,-113.57619000000001,-113.67563500000001,-113.77508000000002,-113.87452500000001,-113.97397000000001,-114.07341500000001,-114.17286000000001,-114.27230500000002,-114.37175000000001,-114.47119500000001,-114.57064000000001,-114.67008500000001,-114.76953000000002,-114.86897500000001,-114.96842000000001,-115.06786500000001,-115.16731000000001,-115.26675500000002,-115.36620000000001,-115.46564500000001,-115.56509000000001,-115.66453500000001,-115.76398000000002,-115.86342500000001,-115.96287000000001,-116.06231500000001,-116.16176000000002,-116.26120500000002,-116.36065000000001,-116.46009500000001,-116.55954000000001,-116.65898500000002,-116.75843000000002,-116.85787500000001,-116.95732000000001,-117.05676500000001,-117.15621000000002,-117.25565500000002,-117.35510000000001,-117.45454500000001,-117.55399000000001,-117.65343500000002,-117.75288000000002,-117.85232500000001,-117.95177000000001,-118.05121500000001,-118.15066000000002,-118.250105,-118.34955000000001,-118.44899500000001,-118.54844000000001,-118.64788500000002,-118.74733000000001,-118.84677500000001,-118.94622000000001,-119.04566500000001,-119.14511000000002,-119.24455500000001,-119.34400000000001,-119.44344500000001,-119.54289000000001,-119.64233500000002,-119.74178000000001,-119.84122500000001,-119.94067000000001,-120.04011500000001,-120.13956000000002,-120.23900500000001,-120.33845000000001,-120.43789500000001,-120.53734000000001,-120.63678500000002,-120.73623000000001,-120.83567500000001,-120.93512000000001,-121.03456500000001,-121.13401000000002,-121.23345500000001,-121.33290000000001,-121.43234500000001,-121.53179000000002,-121.63123500000002,-121.73068000000001,-121.83012500000001,-121.92957000000001,-122.02901500000002,-122.12846000000002,-122.22790500000001,-122.32735000000001,-122.42679500000001,-122.52624000000002,-122.62568500000002,-122.72513000000001,-122.82457500000001,-122.92402000000001,-123.02346500000002,-123.12291000000002,-123.22235500000001,-123.32180000000001,-123.42124500000001,-123.52069000000002,-123.62013500000002,-123.71958000000001,-123.81902500000001,-123.91847000000001,-124.01791500000002,-124.11736000000001,-124.21680500000001,-124.31625000000001,-124.41569500000001,-124.51514000000002,-124.61458500000001,-124.71403000000001,-124.81347500000001,-124.91292000000001,-125.01236500000002,-125.11181000000001,-125.21125500000001,-125.31070000000001,-125.41014500000001,-125.50959000000002,-125.60903500000001,-125.70848000000001,-125.80792500000001,-125.90737000000001,-126.00681500000002,-126.10626000000001,-126.20570500000001,-126.30515000000001,-126.40459500000001,-126.50404000000002,-126.60348500000001,-126.70293000000001,-126.80237500000001,-126.90182000000001,-127.00126500000002,-127.10071000000001,-127.20015500000001,-127.29960000000001,-127.39904500000002,-127.49849000000002,-127.59793500000001,-127.69738000000001,-127.79682500000001,-127.89627000000002,-127.99571500000002,-128.09515999999999,-128.194605,-128.29405,-128.393495,-128.49294,-128.59238500000001,-128.69183000000001,-128.79127499999998,-128.89071999999999,-128.99016499999999,-129.08960999999999,-129.189055,-129.2885,-129.387945,-129.48739,-129.58683500000001,-129.68628000000001,-129.78572499999999,-129.88516999999999,-129.98461499999999,-130.08405999999999,-130.183505,-130.28295,-130.382395,-130.48184000000001,-130.58128500000001,-130.68073000000001,-130.78017499999999,-130.87961999999999,-130.97906499999999,-131.07850999999999,-131.177955,-131.2774,-131.376845,-131.47629000000001,-131.57573500000001,-131.67518000000001,-131.77462499999999,-131.87406999999999,-131.97351499999999,-132.07295999999999,-132.172405,-132.27185,-132.371295,-132.47074000000001,-132.57018500000001,-132.66963000000001,-132.76907499999999,-132.86851999999999,-132.96796499999999,-133.06741,-133.166855,-133.2663,-133.365745,-133.46519000000001,-133.56463500000001,-133.66408000000001,-133.76352499999999,-133.86296999999999,-133.96241499999999,-134.06186,-134.161305,-134.26075,-134.360195,-134.45964000000001,-134.55908500000001,-134.65852999999998,-134.75797499999999,-134.85741999999999,-134.95686499999999,-135.05631,-135.155755,-135.2552,-135.354645,-135.45409000000001,-135.55353500000001,-135.65297999999999,-135.75242499999999,-135.85186999999999,-135.95131499999999,-136.05076,-136.150205,-136.24965,-136.34909500000001,-136.44854000000001,-136.54798500000001,-136.64742999999999,-136.74687499999999,-136.84631999999999,-136.94576499999999,-137.04521,-137.144655,-137.2441,-137.34354500000001,-137.44299000000001,-137.54243500000001,-137.64187999999999,-137.74132499999999,-137.84076999999999,-137.94021499999999,-138.03966,-138.139105,-138.23855,-138.33799500000001,-138.43744000000001,-138.53688500000001,-138.63632999999999,-138.73577499999999,-138.83521999999999,-138.934665,-139.03411,-139.133555,-139.233,-139.33244500000001,-139.43189000000001,-139.53133500000001,-139.63077999999999,-139.73022499999999,-139.82966999999999,-139.929115,-140.02856,-140.128005,-140.22745,-140.32689500000001,-140.42634000000001,-140.52578499999998,-140.62522999999999,-140.72467499999999,-140.82411999999999,-140.923565,-141.02301,-141.122455,-141.22190000000001,-141.32134500000001,-141.42079000000001,-141.52023499999999,-141.61967999999999,-141.71912499999999,-141.81856999999999,-141.918015,-142.01746,-142.116905,-142.21635000000001,-142.31579500000001,-142.41524000000001,-142.51468499999999,-142.61412999999999,-142.71357499999999,-142.81301999999999,-142.912465,-143.01191,-143.111355,-143.21080000000001,-143.31024500000001,-143.40969000000001,-143.50913499999999,-143.60857999999999,-143.70802499999999,-143.80747,-143.906915,-144.00636,-144.105805,-144.20525000000001,-144.30469500000001,-144.40414000000001,-144.50358499999999,-144.60302999999999,-144.70247499999999,-144.80192,-144.901365,-145.00081,-145.100255,-145.19970000000001,-145.29914500000001,-145.39859000000001,-145.49803499999999,-145.59747999999999,-145.69692499999999,-145.79637,-145.895815,-145.99526,-146.094705,-146.19415000000001,-146.29359500000001,-146.39303999999998,-146.49248499999999,-146.59192999999999,-146.69137499999999,-146.79082,-146.890265,-146.98971,-147.08915500000001,-147.18860000000001,-147.28804500000001,-147.38748999999999,-147.48693499999999,-147.58637999999999,-147.68582499999999,-147.78527,-147.884715,-147.98416,-148.08360500000001,-148.18305000000001,-148.28249500000001,-148.38193999999999,-148.48138499999999,-148.58082999999999,-148.68027499999999,-148.77972,-148.879165,-148.97861,-149.07805500000001,-149.17750000000001,-149.27694500000001,-149.37638999999999,-149.47583499999999,-149.57527999999999,-149.674725,-149.77417,-149.873615,-149.97306,-150.07250500000001,-150.17195000000001,-150.27139500000001,-150.37083999999999,-150.47028499999999,-150.56972999999999,-150.669175,-150.76862,-150.868065,-150.96751,-151.06695500000001,-151.16640000000001,-151.26584500000001,-151.36528999999999,-151.46473499999999,-151.56417999999999,-151.663625,-151.76307,-151.862515,-151.96196,-152.06140500000001,-152.16085000000001,-152.26029500000001,-152.35973999999999,-152.45918499999999,-152.55862999999999,-152.658075,-152.75752,-152.856965,-152.95641000000001,-153.05585500000001,-153.15530000000001,-153.25474499999999,-153.35418999999999,-153.45363499999999,-153.55307999999999,-153.652525,-153.75197,-153.851415,-153.95086000000001,-154.05030500000001,-154.14975000000001,-154.24919499999999,-154.34863999999999,-154.44808499999999,-154.54752999999999,-154.646975,-154.74642,-154.845865,-154.94531000000001,-155.04475500000001,-155.14420000000001,-155.24364499999999,-155.34308999999999,-155.44253499999999,-155.54198,-155.641425,-155.74087,-155.840315,-155.93976000000001,-156.03920500000001,-156.13865000000001,-156.23809499999999,-156.33753999999999,-156.43698499999999,-156.53643,-156.635875,-156.73532,-156.834765,-156.93421000000001,-157.03365500000001,-157.13310000000001,-157.23254499999999,-157.33198999999999,-157.43143499999999,-157.53088,-157.630325,-157.72977,-157.829215,-157.92866000000001,-158.02810500000001,-158.12755000000001,-158.22699499999999,-158.32643999999999,-158.42588499999999,-158.52533,-158.624775,-158.72422,-158.82366500000001,-158.92311000000001,-159.02255500000001,-159.12200000000001,-159.22144499999999,-159.32088999999999,-159.42033499999999,-159.51978,-159.619225,-159.71867,-159.81811500000001,-159.91756000000001,-160.01700500000001,-160.11644999999999,-160.21589499999999,-160.31533999999999,-160.41478499999999,-160.51423,-160.613675,-160.71312,-160.81256500000001,-160.91201000000001,-161.01145500000001,-161.11089999999999,-161.21034499999999,-161.30978999999999,-161.409235,-161.50868,-161.608125,-161.70757,-161.80701500000001,-161.90646000000001,-162.00590500000001,-162.10534999999999,-162.20479499999999,-162.30423999999999,-162.403685,-162.50313,-162.602575,-162.70202,-162.80146500000001,-162.90091000000001,-163.00035500000001,-163.09979999999999,-163.19924499999999,-163.29868999999999,-163.398135,-163.49758,-163.597025,-163.69647000000001,-163.79591500000001,-163.89536000000001,-163.99480500000001,-164.09424999999999,-164.19369499999999,-164.29313999999999,-164.392585,-164.49203,-164.591475,-164.69092000000001,-164.79036500000001,-164.88981000000001,-164.98925500000001,-165.08869999999999,-165.18814499999999,-165.28758999999999,-165.387035,-165.48648,-165.585925,-165.68537000000001,-165.78481500000001,-165.88426000000001,-165.98370499999999,-166.08314999999999,-166.18259499999999,-166.28203999999999,-166.381485,-166.48093,-166.580375,-166.67982000000001,-166.77926500000001,-166.87871000000001,-166.97815499999999,-167.07759999999999,-167.17704499999999,-167.27649,-167.375935,-167.47538,-167.574825,-167.67427000000001,-167.77371500000001,-167.87316000000001,-167.97260499999999,-168.07204999999999,-168.17149499999999,-168.27094,-168.370385,-168.46983,-168.569275,-168.66872000000001,-168.76816500000001,-168.86761000000001,-168.96705499999999,-169.06649999999999,-169.16594499999999,-169.26539,-169.364835,-169.46428,-169.56372500000001,-169.66317000000001,-169.76261500000001,-169.86206000000001,-169.96150499999999,-170.06094999999999,-170.16039499999999,-170.25984,-170.359285,-170.45873,-170.55817500000001,-170.65762000000001,-170.75706500000001,-170.85651000000001,-170.95595499999999,-171.05539999999999,-171.15484499999999,-171.25429,-171.353735,-171.45318,-171.55262500000001,-171.65207000000001,-171.75151500000001,-171.85095999999999,-171.95040499999999,-172.04984999999999,-172.149295,-172.24874,-172.348185,-172.44763,-172.54707500000001,-172.64652000000001,-172.74596500000001,-172.84540999999999,-172.94485499999999,-173.04429999999999,-173.143745,-173.24319,-173.342635,-173.44208,-173.54152500000001,-173.64097000000001,-173.74041500000001,-173.83985999999999,-173.93930499999999,-174.03874999999999,-174.138195,-174.23764,-174.337085,-174.43653,-174.53597500000001,-174.63542000000001,-174.73486500000001,-174.83430999999999,-174.93375499999999,-175.03319999999999,-175.132645,-175.23209,-175.331535,-175.43098000000001,-175.53042500000001,-175.62987000000001,-175.72931500000001,-175.82875999999999,-175.92820499999999,-176.02764999999999,-176.127095,-176.22654,-176.325985,-176.42543000000001,-176.52487500000001,-176.62432000000001,-176.72376500000001,-176.82320999999999,-176.92265499999999,-177.02209999999999,-177.121545,-177.22099,-177.320435,-177.41988000000001,-177.51932500000001,-177.61877000000001,-177.71821500000001,-177.81765999999999,-177.91710499999999,-178.01655,-178.115995,-178.21544,-178.314885,-178.41433000000001,-178.51377500000001,-178.61322000000001,-178.71266499999999,-178.81210999999999,-178.91155499999999,-179.011,-179.110445,-179.20989,-179.309335,-179.40878000000001,-179.50822500000001,-179.60767000000001,-179.70711499999999,-179.80655999999999,-179.90600499999999,-180.00545,-180.104895,-180.20434,-180.303785,-180.40323000000001,-180.50267500000001,-180.60212000000001,-180.70156499999999,-180.80100999999999,-180.90045499999999,-180.9999,-181.099345,-181.19879,-181.29823500000001,-181.39768000000001,-181.49712500000001,-181.59657000000001,-181.69601499999999,-181.79545999999999,-181.89490499999999,-181.99435,-182.093795,-182.19324,-182.29268500000001,-182.39213000000001,-182.49157500000001,-182.59102000000001,-182.69046499999999,-182.78990999999999,-182.88935499999999,-182.9888,-183.088245,-183.18769,-183.28713500000001,-183.38658000000001,-183.48602500000001,-183.58547000000002,-183.68491499999999,-183.78435999999999,-183.883805,-183.98325,-184.082695,-184.18214,-184.28158500000001,-184.38103000000001,-184.48047500000001,-184.57992000000002,-184.67936499999999,-184.77880999999999,-184.878255,-184.9777,-185.077145,-185.17659,-185.27603500000001,-185.37548000000001,-185.47492500000001,-185.57436999999999,-185.67381499999999,-185.77325999999999,-185.872705,-185.97215,-186.071595,-186.17104,-186.27048500000001,-186.36993000000001,-186.46937500000001,-186.56881999999999,-186.66826499999999,-186.76770999999999,-186.867155,-186.9666,-187.066045,-187.16549000000001,-187.26493500000001,-187.36438000000001,-187.46382500000001,-187.56326999999999,-187.66271499999999,-187.76215999999999,-187.861605,-187.96105,-188.060495,-188.15994000000001,-188.25938500000001,-188.35883000000001,-188.45827500000001,-188.55771999999999,-188.65716499999999,-188.75660999999999,-188.856055,-188.9555,-189.054945,-189.15439000000001,-189.25383500000001,-189.35328000000001,-189.45272500000002,-189.55216999999999,-189.65161499999999,-189.75106,-189.850505,-189.94995,-190.049395,-190.14884000000001,-190.24828500000001,-190.34773000000001,-190.44717500000002,-190.54661999999999,-190.64606499999999,-190.74551,-190.844955,-190.9444,-191.043845,-191.14329000000001,-191.24273500000001,-191.34218000000001,-191.44162499999999,-191.54106999999999,-191.64051499999999,-191.73996,-191.839405,-191.93885,-192.03829500000001,-192.13774000000001,-192.23718500000001,-192.33663000000001,-192.43607499999999,-192.53551999999999,-192.63496499999999,-192.73441,-192.833855,-192.9333,-193.03274500000001,-193.13219000000001,-193.23163500000001,-193.33108000000001,-193.43052499999999,-193.52996999999999,-193.62941499999999,-193.72886,-193.828305,-193.92775,-194.02719500000001,-194.12664000000001,-194.22608500000001,-194.32553000000001,-194.42497499999999,-194.52441999999999,-194.623865,-194.72331,-194.822755,-194.9222,-195.02164500000001,-195.12109000000001,-195.22053500000001,-195.31998000000002,-195.41942499999999,-195.51886999999999,-195.618315,-195.71776,-195.817205,-195.91665,-196.01609500000001,-196.11554000000001,-196.21498500000001,-196.31443000000002,-196.41387499999999,-196.51331999999999,-196.612765,-196.71221,-196.811655,-196.9111,-197.01054500000001,-197.10999000000001,-197.20943500000001,-197.30887999999999,-197.40832499999999,-197.50776999999999,-197.607215,-197.70666,-197.806105,-197.90555000000001,-198.00499500000001,-198.10444000000001,-198.20388500000001,-198.30332999999999,-198.40277499999999,-198.50221999999999,-198.601665,-198.70111,-198.800555,-198.90000000000001],  "expected": [10001.669304101071,85.438163088196973,25.256840107781848,13.407110958984756,9.7289686529368176,8.9458402581191425,10.212797531762844,14.725559018539085,29.266839855075563,113.47861158498577,50501.321265891143,95.398303371251231,27.190412244536031,14.34891266388072,10.348018790576285,9.3799152713494376,10.469128179142469,14.671329165870272,28.14099165767405,101.86436351644036,826449.17576424498,106.36733050907182,28.755552180092881,14.918879857052724,10.645173562212266,9.5402896286893295,10.495307913523179,14.435102699865128,26.952706389436841,91.912029781531942,22615.929084775449,119.20168350781036,30.334321989806028,15.417108241549089,10.864947460747386,9.6289557455288417,10.459743621136578,14.157487011709161,25.810788499896564,83.372678491166937,6721.6929409271906,134.49961592381439,32.008416458736257,15.90417201229428,11.059374440996121,9.6915434267088383,10.402565892200627,13.873010847912626,24.736906677100368,76.004225709349853,3177.0834262708804,152.98852530017356,33.815779000756145,16.401207963455857,11.246240393892146,9.7439017845007179,10.337926380628934,13.593543229890843,23.733980292372308,69.606720042708844,1845.1330752913132,175.64754242884879,35.784661331264452,16.918484969479117,11.43344534747297,9.7929834767755413,10.271979414054639,13.323830075576561,22.799489809441731,64.018920832578388,1204.618998418131,203.84657053098454,37.942093818919858,17.462428935304494,11.625199636514084,9.8423396086802732,10.207767847767688,13.065840701971968,21.929215431336225,59.11091743118719,848.23095776894741,239.55991551285283,40.317091451682408,18.03794453595436,11.82410054577324,9.8939987676898919,10.14692699575596,12.820308235840669,21.118517991417662,54.777514214273097,629.76008339080238,285.72187632091118,42.942472522642049,18.649352951899893,12.03196567415984,9.9492301742163889,10.090385546637075,12.587367845808958,20.36282567354294,50.932955637229654,486.24122611469937,346.84934098298936,45.856344509838699,19.300837246401624,12.250213826226934,10.008894218709408,10.038690068835653,12.366851974945737,19.65782306590512,47.506838550150199,386.93433427291018,430.19021758932593,49.103647761191517,19.996689171337174,12.480057757497685,10.073619229734446,9.9921692424309896,12.158438321310857,18.999517354317135,44.440961209195947,315.38318608449083,547.97523293042934,52.73796809785717,20.741469851104728,12.722610512928643,10.143897479004778,9.9510229621014474,11.961728509203834,18.384250897665375,41.686887792120515,262.13218755815842,722.17523120606813,56.823791957966122,21.540132969895541,12.978948976636703,10.220140633469457,9.9153734524240633,11.776291714890752,17.808690055855347,39.204055180559259,221.43446647199443,995.54213436011321,61.439397544655293,22.39813403012813,13.250155014674688,10.302713543217703,9.8852959642929292,11.601689539285905,17.269803953935341,36.958291194992661,189.63395629850569,1460.5776926645181,66.680632523102943,23.321538638413838,13.537344443316897,10.391955860172034,9.8608379306661558,11.437490384036872,16.764839692292743,34.920646544767301,164.3148278176912,2349.4601918574094,72.665924869111862,24.317138127553395,13.841689293776534,10.488196538656506,9.8420313219067417,11.283277740470073,16.291297144543453,33.066467506207303,143.82885692943137,4391.9127524774622,79.543022679894435,25.392578889437182,14.16443647697019,10.591764038310657,9.828900852305166,11.13865485143457,15.846904833884061,31.374654614479546,127.02031603541647,10979.33845430506,87.498188506166784,26.556511242903476,14.506924719544239,10.702993872663114,9.8214695815396738,11.003247169576792,15.429597545715323,29.82706611381532,113.05938484888276,62659.782169145765,96.768931329960196,27.818763931514258,14.870600979107293,10.822234498373879,9.8197628416810865,10.876703461367764,15.037495907927559,28.408034851131315,101.33777931913157,413563.89495073096,107.66192579508456,29.190551217186265,15.257037183826249,10.949852169860565,9.8238110682215662,10.758696076669818,14.668887952833421,27.103974677539327,91.401392160487561,19812.667119166217,120.5786853049692,30.684720954967016,15.667947945663729,11.086235165914777,9.8336519047483577,10.648920708662796,14.322212567301555,25.903057934779952,82.905671094240304,6247.4305741383296,136.05307680785978,32.316054052574692,16.105209798694556,11.231797663179233,9.8493318234461125,10.547095850524059,13.996044688991773,24.794949749252673,75.585368045831913,3020.5504192441072,154.80735874611008,34.101628467835134,16.570882477720524,11.386983450282818,9.8709074239000696,10.452962081676167,13.689082089390491,23.770587995511764,69.233603248382295,1775.3596424018037,177.83798388229542,36.061264594330197,17.067232758532789,11.552269626026957,9.8984465217240523,10.366281269808052,13.400133583773883,22.822000184373387,63.687104816407363,1167.6946764387253,206.55070920724111,38.218073851813308,17.596761419831566,11.728170393750077,9.9320291053663876,10.286835744868847,13.128108516108826,21.942150367595861,58.815626434796798,826.3926363017157,242.98026940881348,40.599138997828263,18.162233953806624,11.915241045080325,9.9717482175203571,10.21442748166363,12.872007378698351,21.124810569966414,54.51424424300783,615.7974882794133,290.1609905657902,43.236363779883149,18.766715747154681,12.114082215638334,10.017710802907073,10.148877314783183,12.630913439600791,20.364452362511493,50.697671243521462,476.78427000284404,352.77964926483298,46.167542023026208,19.413612578996073,12.325344490397656,10.070038554335889,10.09002420104966,12.403985264118242,19.65615505295515,47.296007182799329,380.23837553473669,438.38589174042039,49.437713513936409,20.106717441232245,12.54973343585101,10.128868782314692,10.03772453897388,12.190450029277743,18.995527647847322,44.251524169888739,310.4721656413231,559.77908053375404,53.10089819720816,20.850264887130216,12.788015138985047,10.19435532907217,9.9918515509500931,11.989597541867177,18.378642277176951,41.516209302074493,258.42567370746372,740.08589344320387,57.222334386003148,21.648994364828994,13.041022338840142,10.266669545008421,9.9522947314387942,11.800774881119541,17.801977198765684,39.049867199679277,218.56985438187507,1024.6490832545996,61.881395685230814,22.50822430666118,13.309661244934411,10.346001343877409,9.9189593627973789,11.62338159655353,17.262367840521698,36.818641259784492,187.37531937190911,1512.5898681802073,67.17543250370791,23.433939139470212,13.594919148041591,10.432560352134578,9.8917660994368681,11.456865399829958,16.75696461228905,34.793851265505396,162.50333176714921,2456.4319523756049,73.224888959358566,24.432891877650949,13.897872942910137,10.526577167671215,9.8706506204262414,11.300718296851592,16.283196439782714,32.951072303274245,142.35441509581338,4668.97423392977,80.180203131615059,25.512725588636066,14.219698699786225,10.628304743474978,9.8555633504070652,11.154473112822709,15.83873915203138,31.269399391063111,125.80469262863397,12105.68337910521,88.231238068199573,26.682117819001569,14.561682442533945,10.738019912534218,9.8464692486340795,11.017700368675907,15.421487999335641,29.730856226826379,112.04575313749582,79801.533260407072,97.620362729990276,27.950953090029124,14.925232316320397,10.856025071488032,9.8433476660645436,10.890005472275231,15.029533697765386,28.319916659222905,100.48406388756871,247521.88969740403,108.66089127367208,29.330529884268177,15.311892358052456,10.982650042111523,9.8461922706390173,10.771026192185564,14.66114149385864,27.023114973639945,90.675905948625328,17499.975537782513,121.76354426052703,30.833810243731243,15.723358119005981,11.11825413170406,9.855011041203154,10.660430385654134,14.314732823611234,25.828726643124902,82.284186141095404,5821.5462748988657,137.4751830463367,32.475722314569488,16.161494432629134,11.263228415846095,9.8698263308961067,10.557913955826253,13.988869206336881,24.726505351629736,75.04910592041206,2875.2170094677467,156.53678189392451,34.273529079427114,16.628355672889885,11.41799826983773,9.8906750012656168,10.463199016197123,13.682238069142212,23.707465233803564,68.767829499583513,1709.3934639579406,179.97238563639721,36.247280362707833,17.12620891175392,11.583026178480081,9.9176086288572165,10.376032242922941,13.393640243687312,22.763699660539462,63.280128603804265,1132.3771450542647,209.2295335988585,38.420370319463665,17.657560460834393,11.758814857773499,9.9506937865631127,10.296183397930806,13.12197891526387,21.888229726273501,58.458077201376661,805.33125695901992,246.40822060587118,40.820229511524701,18.22518637511407,11.945910726666291,9.9900124026058492,10.223444007817138,12.866249836368768,21.074877002915095,54.198541129300509,602.24626529694683,294.64845175548407,43.479190029057428,18.832167609739333,12.144907772294689,10.035662200677912,10.157626185344336,12.625532643971779,20.318156219200354,50.417628732084673,467.55904915739001,358.81558900715424,46.43557493467096,19.481930659225007,12.356451858331781,10.087757225462729,10.098561581966257,12.398983142457178,19.613184378877918,47.046538435627468,373.67850030871307,446.7768851239025,49.735081055836069,20.178294678279631,12.581245533258411,10.146428458538173,10.046100461261883,12.18582643348409,18.955603502841253,44.028415361923336,305.64310744396329,571.93289545621121,53.432548998159348,20.925526292943676,12.820053403761886,10.211824530514537,10.000110884457344,11.985350790338824,18.341514711263859,41.315946186966194,254.76903420257796,758.64048533065602,57.594249449339863,21.72840357021926,13.073708148275536,10.28411253620029,9.9604780003897826,11.796902188251849,17.767421783756511,38.869500542288414,215.73539092175326,1055.0252303313903,62.300865339236658,22.592290937297768,13.343117257151889,10.363478960632378,9.9271034333312969,11.619879413983895,17.230182672658859,36.655681496563425,185.13436266289176,1567.4090761466789,67.651422861495973,23.523227245342639,13.629270599443096,10.450130724970144,9.8999047630633505,11.453729688114972,16.726967715207895,34.646185361024337,160.7014689735536,2570.8637312668598,73.768532757537471,24.528029680429789,13.933248932100275,10.544296362551167,9.8788150924864997,11.297944742144383,16.255223508628774,32.816897617964941,140.88433704496677,4973.100044810828,80.805465827206746,25.614416865798763,14.256233486106279,10.646227336865607,9.8637826988799748,11.152057299965175,15.812641589087905,31.147170698471371,124.58995309873487,13414.709079566095,88.955834697161393,26.791155314922374,14.599516786152739,10.756199514847752,9.8547707657027566,11.015637919698781,15.397131199413167,29.619242977221788,111.03070283248033,105075.91651316023,98.467039650536336,28.068234437290705,14.964514886685027,10.874514810739347,9.8517571925626157,10.888292157421754,15.006795548141486,28.217768287754549,99.627415456178241,164579.13962573817,109.65924880343493,29.457076639750944,15.352781238311456,11.001503017882767,9.854734481683753,10.769658019118593,14.639911058998157,26.929432569309995,89.946507065166898,15569.843525954137,122.95267776131963,30.970790802556568,15.766022435761053,11.137523848194034,9.8637096998845344,10.659403671362869,14.294909189423061,25.742639680986358,81.658175519136336,5437.7841106617407,138.90759106123096,32.624479673144549,16.206116143078823,11.282969201792721,9.8787045157459836,10.557225384856419,13.970360462521725,24.647252480840404,74.507958425658344,2740.1279502487118,158.28428662572782,34.435614693715493,16.675131545183167,11.438265692384057,9.899755312316401,10.462845688122115,13.664960411352153,23.634378334037212,68.296986380203222,1647.0348364928211,182.13534281281184,36.42449571350231,17.175352739289277,11.603877457561369,9.9269133763675477,10.376011711415869,13.37751717988731,22.69619054711292,62.868020954753099,1098.6343049175887,211.95159784200084,38.614818286491953,17.709305557541242,11.780309287309027,9.9602451659019646,10.296493703355216,13.106940562930196,21.82577901334836,58.095418765439945,785.0603562257794,249.90085147920061,41.034378320673845,18.279788406655886,11.968110108711944,9.999832658318704,10.224083704902622,12.852232299055151,21.017024734018385,53.877808779214838,589.13259619746952,299.23325458427269,43.715953440743327,18.889907825452692,12.167876870351098,10.045773782385682,10.158594367234127,12.612477457378777,20.264493952088909,50.132675804989951,458.59401935016001,365.00101023779769,46.698413586514789,19.54311960188258,12.380258876189613,10.098182937951618,10.099857901699862,12.386836781502421,19.56334847273709,46.792303472068028,367.28197693830703,455.40519825882689,50.028131606601285,20.243276464023694,12.605962626106358,10.157191608170349,10.047725151580098,12.174539873025946,18.90926940385889,43.800700269932648,300.92100617401172,584.48189377827907,53.760790161621443,20.994683572700772,12.845757228772058,10.222949069917634,10.00206477667594,11.974879113202237,18.298392070724113,41.111245546980818,251.18477560575502,777.89786079257533,57.963717487828021,21.80216330758908,13.10048046255695,10.295623209069269,9.9627625429760798,11.787204235037725,17.727250273131489,38.684869012156689,212.95120274968676,1086.7701647666784,62.718936614940809,22.671131167509998,13.371045571801517,10.375401448394776,9.9297207107316439,11.610917469875405,17.192728384496796,36.488629900729585,182.92905025553438,1625.2634742122141,68.127188410512673,23.607685017085611,13.658448899487738,10.462491797020672,9.902857515261493,11.445469202511786,16.692020058171309,34.494598586833362,158.92528186989119,2693.4866050925616,74.31330081135377,24.618710429312998,13.963778473408109,10.557124031751258,9.8821067357215249,11.290354077491076,16.222592520850593,32.678969242631176,139.43297433574941,5307.9538717521555,81.433444784063923,25.712005527782548,14.288223681920213,10.659551022025738,9.8674173479146727,11.145107506601461,15.782155606854483,31.021350561833451,123.38896673210816,14948.189561834612,89.685074578875216,26.896429564033536,14.633086197788543,10.7700502119646,9.8587532580068071,11.009302533958168,15.368634828654663,29.504194852000172,110.02580454233374,144576.71238399993,99.32075019123225,28.182080529438885,14.999792335215915,10.888925274845947,9.8560931147586768,10.882547020551224,14.980147894783901,28.112335485020377,98.778265503575099,117286.06876996846,110.66767670903316,29.580508470308562,15.389907056800727,11.016507957489013,9.8594301985962112,10.764481114892511,14.614984181282319,26.832609824106168,89.222625729649621,13942.327197270941,124.15583155163729,31.10497294901354,15.805149884900882,11.153160134448783,9.8687723865307238,10.654774980526273,14.271586741104166,25.65355004144466,81.036187109928832,5090.7728053246046,140.35928065336284,32.770755408159708,16.247413017064183,11.29927609469037,9.8841421926162383,10.553126754761736,13.948536500688885,24.565128208809316,73.969693714442812,2614.3484507755447,160.05825564020503,34.595540236280087,16.718781999443035,11.455285086571253,9.9055768843026915,10.459260716123726,13.644538346602115,23.558545041092799,67.828150987986334,1588.0311156337964,184.33483027951488,36.599882361071316,17.221559377497048,11.621654150579989,9.9331286757201269,10.372925640763169,13.358408849926606,22.626053954733457,62.457244717172429,1066.3793141291101,214.7247085489015,38.807784573751313,17.758291822364701,11.798891273440228,9.9668649996193608,10.293893330479985,13.08906541347111,21.76081385291377,57.73356642907968,765.54593773387626,253.46614460542688,41.247415030429686,18.331801327276654,11.987548901981578,10.006868860408812,10.221957297133795,12.835516658213541,20.956765400575936,53.557473047598201,576.44258614820251,303.92411385401203,43.952005220292165,18.945221185355457,12.188227860714496,10.053239271474617,10.156931590095468,12.596853891753689,20.208526602440774,49.847799623814581,449.8839097504374,371.34635727758035,46.960982202084402,19.602037603257621,12.401581723456372,10.106091780763093,10.098649755053387,12.37224352378189,19.511304318493131,46.537895230765876,361.04754719432367,464.28497222529364,50.321407651070899,20.306137980936079,12.628321696796876,10.165559089451921,10.04696391397775,12.160920312374525,18.86081899750349,43.572616689451593,296.30656505768792,597.44819053824858,54.089822543626688,21.061867104751922,12.869222081850591,10.231791769452203,10.001743957367266,11.962181340878168,18.253240420330837,40.906024476443356,247.67457704816078,797.89849825175645,58.334633616266743,21.87409277008021,13.125126390849095,10.304959086481356,9.9628768411013517,11.775380638712136,17.685132651357506,38.499599442075855,210.21944286321286,1119.9717047561885,63.139231378533758,22.748282684463543,13.396954206944603,10.385249936542948,9.9302659813012131,11.599924370991205,17.1534067215017,36.320850019143009,180.76174207318951,1686.3855263406524,68.606107658458725,23.690594921531009,13.685708889461029,10.472873904859384,9.9038307415894913,11.43526653176586,16.655279827458084,34.342215172296946,157.17719124984546,2825.1055714923027,74.862356371860926,24.707984723236798,13.992486243133044,10.56806245765493,9.8835060080439732,11.280905084161674,16.188240042677307,32.540193439404113,138.00272761261544,5677.8234839913694,82.067115220862419,25.808331115001295,14.318484289102406,10.671070278685308,9.8692418479802768,11.136378497991972,15.75001570658328,30.894646340309691,122.20406928504593,16760.539813820236,90.421772361890177,27.000587646869221,14.665014298182385,10.782176764108605,9.8610032494838258,11.001262641702167,15.338548797782583,29.388237370112094,109.03330521367448,211391.83756292285,100.18417762051941,28.294962659677555,15.033513273875991,10.901687691195557,9.8587699393541559,10.875167990933253,14.951971710903793,28.005977235405197,97.938760436449556,87794.7743303631,111.68875994025396,29.703135873575736,15.425558104726548,11.029937078538167,9.8625362778352503,10.757737120694033,14.588586950210232,26.734852946909065,88.506303306793797,12557.320913729767,125.37553247495686,31.238519908894283,15.842881643881228,11.167289257868498,9.8723112291939632,10.648642452214752,14.246849330198598,25.563523552260964,80.420157032621631,4775.966564189147,141.83277320247612,32.916577715452519,16.287391019597688,11.314141180394905,9.8881184078841997,10.547584229109605,13.925350337152112,24.482069169465564,73.436144989232346,2497.0436997914626,161.86127881439685,34.755209997645906,16.761188535534128,11.470924983758065,9.9099962007065763,10.454288700578939,13.622804358547407,23.481782912154323,67.363057388303787,1532.1472644572939,186.57361730787338,36.775230845568117,17.266595586029919,11.638110849371255,9.9379979660508226,10.36850649209882,13.338036531308376,22.554997529967103,62.049439379506637,1035.5273246659069,217.55199089285261,39.000955290982269,17.806180091954364,11.816210184118036,9.9721923120006881,10.290011146431508,13.069971996754409,21.694940300201374,57.374070026853921,746.75214176100326,257.10787840502525,41.46092993118414,18.382788060224719,12.005779165230084,10.012663455797796,10.218597819892011,12.817626380991578,20.895611030065055,53.238999140964168,564.15945189684351,308.72599170126352,44.188847862843765,18.999579989006541,12.207422692770283,10.059511667912073,10.154082120664036,12.580097345490616,20.151679057825778,49.56438573519285,441.42036678958294,377.85878271839852,47.224703041248588,19.660072986132128,12.421798800634644,10.112853804762512,10.096299077607528,12.356557074508181,19.458395946255767,46.284624412151736,354.97094831670336,473.4276006717065,50.616258439964938,20.368189647121785,12.649623584520233,10.172823934984848,10.045102229469634,12.146245584581081,18.811521195456411,43.345405077920574,291.7976520707611,610.85196690876023,54.420929423900041,21.12831495995831,12.891676714075766,10.239574065064744,10.00036282572697,11.948464757039829,18.207258803720325,40.70145755314951,244.23747721787919,818.68257420136217,58.708222166875139,21.94536277751385,13.148807606685615,10.313274971160691,9.9619691314720349,11.762573007892577,17.642202904228906,38.314804641162802,207.53981894865578,1154.7217492126651,63.562922241187096,22.824853739591102,13.421942352312509,10.394117145045508,9.9298258298299977,11.587980520849285,17.113291024640461,36.15339674927317,178.63253839559181,1751.0274244578507,69.089309212228031,23.773006953584463,13.712091492872165,10.48231186331725,9.9038535163710772,11.424144979027554,16.617763773239407,34.190035711513325,155.45753098046643,2966.6240653670434,75.416792644957198,24.796848280249655,14.020358776138229,10.578092390389699,9.8839882808842496,11.270567739260363,16.153129962550441,32.401519867928776,136.59406955925186,6087.7683837538534,82.707544999256911,25.904338751243102,14.347951023668958,10.681715327292851,9.8701813727112544,11.126790400129565,15.717136349429323,30.76795990041667,121.03581412412898,18923.718663014341,91.166982911859435,27.104527510758153,14.696189275306667,10.793462120021823,9.8623989466238502,10.992391721057858,15.307741307598963,29.272227531656583,108.05380241396614,338023.83240233827,101.05837972349471,28.407734781946459,15.066521400159747,10.913640743099485,9.8606218869646352,10.866984855156973,14.923091860640694,27.899508398113277,97.109518733514236,68174.718444701604,112.72358068188407,29.82577178686924,15.460536396534822,11.042587576200107,9.8648457084818286,10.750214863177462,14.561503595472931,26.636937193746686,87.798164148813129,11368.932653909265,126.61291737893846,31.372206400914187,15.879980642152425,11.180669494160986,9.8750805329749092,10.641756479942163,14.221443052219238,25.473298229180251,79.810705754191972,4489.5005398085486,143.32930460662266,33.062685741735969,16.326776402525606,11.328286193532438,9.8913511415431401,10.541312108160488,13.90151224915051,24.398778338818296,72.907922515433398,2387.4695725918027,163.69475876522071,34.915330075725841,16.803042961311323,11.485872782054868,9.9136971029012297,10.448610017590145,13.600435053523316,23.404761933468443,66.902301609481654,1479.1676314350495,188.85338045233843,36.951216645706701,17.311120803884471,11.653902661142938,9.9421729789048729,10.363402730200761,13.317045152581501,22.483660179760076,61.645184228392125,1005.9986235950283,220.43557223337399,39.194977666662368,17.853599366994882,11.832890735726743,9.9768486091230528,10.285465574354726,13.050275415309731,21.628767964134553,57.017490636885185,728.6444062681411,260.82893588060716,41.675544347489868,18.433348966495114,12.023396990699423,10.017809477013179,10.214595393100938,12.799148465990614,20.834143595079262,52.922929170298296,552.26646190418865,313.64307882986071,44.427079158223677,19.053557635998587,12.226030478892838,10.06515716100964,10.150609393516909,12.56276831624516,20.094507205512379,49.282957009138578,433.19463788724073,384.54484403867895,47.490152807958211,19.717773757310621,12.4414537720703,10.119009874636719,10.093344125667851,12.340312923861701,19.405154606508919,46.03299470288821,349.04735106229873,482.84418463687103,50.913242192743603,20.429955545395373,12.670387934052787,10.179503100614806,10.042654581207485,12.13102756501887,18.761883965095958,43.119550221416404,287.39151353671684,624.71373757453148,54.754653388000179,21.194528675332471,12.913618083975365,10.246790324857308,9.9984134029499501,11.934218922038982,18.16093317097847,40.498011096084298,240.87188589845167,840.29214906713196,59.0850133224736,22.016453617334307,13.171999628036353,10.321043877268645,9.9605101979172055,11.749249802024423,17.598926148943697,38.130932993150161,204.91142382085823,1191.1187141793102,63.990530777473843,22.901304593295613,13.446465250232819,10.402455887367458,9.928850947431453,11.57553441300669,17.072826687164348,35.986701132680132,176.54094809980481,1819.4653263187979,69.577310655669606,23.855362503397977,13.738032766810914,10.491239363991529,9.903357508794187,11.412534133885254,16.57989860377279,34.038474531890671,153.76607085441805,3119.0609789512155,75.977129040995223,24.885724719148186,14.047813965908137,10.587629409712511,9.8839672039875879,11.259753722708016,16.117671277740826,32.263346785737966,135.20693724457223,6543.795071630605,83.355262930409992,26.000435332829863,14.377024573626029,10.691884582123274,9.8706324916639741,11.116737914963469,15.683909735381938,30.641674077128357,119.88424722883822,21534.484475804606,91.92125461440294,27.2086403365292,14.726995511154188,10.804288415885271,9.8633207194666905,10.98306836968098,15.276588618493241,29.15653339012071,107.08741364009504,624915.4037507663,101.94393853374136,28.520773335253256,15.099185635315147,10.925151121369831,9.8620139544627587,10.858360926451013,14.893869470385807,27.793282873531325,96.290704884142997,54465.879336156562,113.77277464465607,29.948778857121813,15.495196187930738,11.054811477932237,9.8667088901740865,10.742263141057174,14.534080866616911,26.539202923215807,87.098403329419682,10341.633739615305,127.86870496987815,31.506382216267237,15.91678721884308,11.193638942360881,9.8774168293795483,10.634452071411049,14.195700991928762,25.383201480420237,79.208047770774229,4228.0725000231714,144.84972073577669,33.209417357615159,16.365896294691094,11.342035995907713,9.8941637425351878,10.534632288953881,13.877342326723847,24.31557074439311,72.385252514116388,2284.9616110738143,165.55973711538999,35.076227369058508,16.844659862295522,11.50044075656136,9.9169904023315905,10.4425340937255,13.577738157763982,23.327785298871255,66.446116232377804,1428.8946225260847,191.17546716970458,37.128156667689346,17.355437704033992,11.669329886981815,9.9459525955874035,10.357911913959954,13.295730670586915,22.412333788178902,61.244714436206209,977.71881999182256,223.37728914177046,39.390159647969227,17.90084100547687,11.849221832815683,9.9811214143735949,10.280542873403601,13.030260416931563,21.562577919866477,56.6640633647066,711.1899600026527,264.63196089881399,41.891558383070731,18.483764656298984,12.040680431078153,10.022583628984773,10.210225511610581,12.780356980492709,20.772633839967579,52.609496297627643,540.7474848626897,318.67940626366317,44.66699260202796,19.107424528356209,12.244318934025449,10.070442146131807,10.146778644292267,12.545130689605756,20.037271914933307,49.003743344455515,425.1981113515302,391.41107875419613,47.757619794534698,19.775400625299977,12.460804500589749,10.12481655653456,10.09004035241486,12.323765246764726,19.3518317281093,45.783231819616461,343.27187307215536,492.54608448508895,51.212643640263131,20.491687183178172,12.690863215170825,10.185843776956878,10.039867090182147,12.115511162975263,18.712149708242428,42.895273026306953,283.08525648492434,639.05491020181307,55.091277576562668,21.260751030089349,12.935285702571566,10.253678792660795,9.9961329033335851,11.919679900224555,18.114497290464271,40.295900785717038,237.57603520758346,862.77182646812116,59.465291063120965,22.087599796660488,13.194933418363661,10.328495507277561,9.9587287503532771,11.735638638421431,17.555527894855544,37.94819469303625,202.33315691896547,1229.2686441975454,64.422344877520615,22.977861922865785,13.470745706259832,10.41048770821582,9.9275619202421197,11.56280559428329,17.032231315620074,35.820967734320639,174.48628226311808,1892.0026923873129,70.070407763309348,23.937880849999864,13.763747728493312,10.499870156970285,9.9025555414715374,11.400645829173888,16.541894361596796,33.887730508648758,152.10238424624214,3283.5694033592276,76.543674481116412,24.974826345045269,14.075059392180872,10.596879815078294,9.8836481776225167,11.248667491068403,16.082066789022015,32.125867381210078,133.84107572590059,7053.0786371783261,84.010598204470639,26.096826611998125,14.405905414679344,10.701777218020787,9.870793506044258,11.106418442851176,15.65053172995969,30.515976420870249,118.74922852647462,24725.406544467158,92.684946779475041,27.313125745803561,14.757626694655846,10.814848011105878,9.8639600766351396,10.973483235212447,15.245279952301946,29.041336940421068,106.13407704320807,1524161.1857534044,102.84125740599815,28.634272239432594,15.131693183736544,10.936404663339298,9.8631311485862287,10.849480387649709,14.864487395695782,27.687477207699498,95.482311033075348,44511.819925289354,114.83680936089149,30.072345744207219,15.529718487108555,11.066788377514371,9.868304603630687,10.73405994562005,14.506495516884748,26.4418213562391,86.407050615656416,9447.5723894312159,129.14345676840688,31.641231217625002,15.953476461472748,11.20637121728196,9.879492935027125,10.626901285835189,14.169794051486733,25.293399337231858,78.612239198399806,3988.8474611258093,146.394722391111,33.356952122079228,16.404920126703196,11.355558474863173,9.8967233121788727,10.527711145128205,13.853005860113363,24.232607370886431,71.86820955818142,2188.9251482512122,167.45712474035187,35.238077669732895,16.886203265228261,11.514791306347492,9.9200377214638156,10.436221851323653,13.554873577326088,23.2510090941642,65.994588681223405,1381.1470674601771,193.54111263430823,37.306223532795244,17.399705152713167,11.684549665330957,9.9494931845298265,10.35218973717353,13.274247824102634,22.341169691971817,60.848126247182812,950.6185762301219,226.37889216848359,39.586671361653579,17.948058947856563,11.865355569992195,9.9851620560084804,10.27539372073344,13.010076779768793,21.496516905327443,56.313890344441482,694.35786341956714,268.51955262661431,42.109140454139698,18.534184371489612,12.05777674373239,10.02713240332397,10.205634037591697,12.761396938956272,20.711224053121622,52.298806398407166,529.58711370461651,323.83903204215653,44.908755828329795,19.161325430084187,12.262430675311647,10.075508472035448,10.142731112167729,12.527324904066631,19.980111172254485,48.726852771358701,417.42246254357849,398.46418824635907,48.027271975290958,19.833094091787373,12.479989151143927,10.130411240960017,10.086524556898473,12.307050084758663,19.298561139590934,45.535444769646908,337.6397280684011,502.54511207250994,51.514632481138769,20.553521011445579,12.71118332023134,10.191979072192238,10.036872289561053,12.099828193787808,18.662448237144087,42.672682600048503,278.87599427645324,653.89801661545164,55.430975151985891,21.327114633628558,12.956809361325398,10.260368462077286,9.9936497602619543,11.904975443648603,18.068077095836639,40.095235175981458,234.34811931350717,886.16912304633604,59.849234241343453,22.15893029160457,13.217734832537506,10.335754900223369,9.9567492807787179,11.721863361345607,17.512130330823087,37.766697254778691,199.80385737488143,1269.2861163231435,64.858551984122784,23.054651280435102,13.494905796072038,10.41833384477078,9.9260794499889347,11.549914149608489,16.991623483780145,35.656302667906324,172.4677804887996,1968.9737774135504,70.56880041198535,24.020684334055751,13.78935482537219,10.508321823388773,9.9015646700795301,11.38859653227305,16.503866130943376,33.737908090841003,150.46596786764053,3461.458610823061,77.116646459500288,25.064272505440396,14.10221001917459,10.605957670868092,9.8831447491122564,11.23742202962131,16.046428212426061,31.989184247566712,132.49615151611064,7624.2468240150538,84.673793046291891,26.193629170291032,14.434705167278739,10.711503915740769,9.8707745863416498,11.09594161641715,15.617110798138146,30.39096753408413,117.63053939386054,28682.032486306587,93.458336304819056,27.418097794089988,14.788191236880584,10.825248330117651,9.8644239374522318,10.963742721362488,15.213920635931624,28.926736702600984,105.19365329604804,7934936.8280939851,103.75066207750487,28.74834328129317,15.164149376866293,10.947505658920139,9.8640772576127755,10.840446531876585,14.835047934306425,27.582187780128194,94.684253537893142,37056.754901967841,115.9160800160634,30.196582246866377,15.564205671459558,11.078619546933629,9.8697336209479669,10.72570557258944,14.478846919736377,26.34488669955984,85.724062026175062,8664.6659227922828,130.43766807349655,31.776861526978099,15.990147915231756,11.21896468466978,9.8814067157109537,10.619201529840772,14.143818781068283,25.203983821466093,78.02326462755137,3769.3805820007547,147.96495176860023,33.505396831874108,16.443944730165882,11.368949196944627,9.8991249151138572,10.520643297875193,13.828596673406144,24.149978058637217,71.356799000538786,2098.8267416679591,169.38778412886481,35.400986853141013,16.92776740401078,11.529017301419803,9.922931424446201,10.429765225394121,13.531932503727262,23.1745209935305,65.547739485876974,1335.7586602693154,195.95151847333875,37.485522667228601,17.444014899817109,11.699652268186169,9.9528845057927402,10.346325543727815,13.252685262037543,22.270253423714646,60.455451317654791,924.63325466664128,229.44212161689771,39.784618346060967,17.995342572124645,11.881379715876896,9.9890577823615505,10.270104960178632,12.989810696646924,21.430668343034643,55.967011385242856,678.11894046509224,272.49433943148097,42.328396889408545,18.584695229315031,12.074771284880253,10.031540625160217,10.200905402104485,12.742352161332848,20.649995583818406,51.990905227582566,518.77067993085222,329.12611533733497,45.152476788529292,19.215345308635367,12.280448734099508,10.080438625522662,10.138548899097392,12.509432486732873,19.923104294230559,48.452335336731387,409.85969504824567,405.71111671226981,48.299219961176249,19.890937086029385,12.499088514519618,10.135874157802665,10.082876592199074,12.290246749057268,19.245420168717974,45.289686642104151,332.14627586568974,512.85362610642642,51.819323296437609,20.615538034453728,12.731426880756661,10.19798703742414,10.033747860512293,12.084055826784667,18.612854936051953,42.45183412286611,274.76089891089248,669.26685765347634,55.773866345721686,21.393698681136982,12.978265610988375,10.266935280426168,9.9910395568373165,11.890180650926347,18.021746074575749,39.896070809948412,231.18634645396222,910.53477303767113,60.236970923863282,22.230522608296241,13.240478416436162,10.342895971677001,9.9546453451093129,11.707997067152098,17.468805095016144,37.586498024009067,197.32235467864245,1311.2951516171613,65.299290881027588,23.131748608779059,13.519018134183527,10.426066250072367,9.924475133453166,11.536931238920365,16.951073028250619,35.492763649032156,170.48465978189469,2050.74753489557,71.072641959101858,24.103847468329842,13.814924811927909,10.516664420298072,9.9004545976237885,11.376455530043337,16.465881994545708,33.589065029268539,148.85628869636818,3654.2202286827333,77.696218147085403,25.154136426451334,14.129334810702385,10.614931202146245,9.8825247904771825,11.22608481308917,16.010821924176877,31.853354911572524,131.17179753717491,8267.7478932983304,85.345047674572882,26.290915103504471,14.463491072194541,10.721131129953342,9.8706418339334956,11.08537315688268,15.583711656464311,30.266704518923433,116.52792566832591,33670.48425175374,94.241660615793251,27.52362761980126,14.818754721670999,10.835554116504106,9.8647766906600118,10.95391085228257,15.182573772382675,28.812789199479269,104.26596672319687,100000003.27771926,104.67244171205078,28.86305683600175,15.196618206471486,10.958517197752007,9.864915013430517,10.831321740530276,14.805612620976472,27.477470415603815,93.896412293442623,31329.151930759432,117.01094872278989,30.321558198149031,15.598720204528821,11.090366476981208,9.8710570708178871,10.717260812901934,14.451195086073533,26.248453989679465,85.049357430153606,7975.2240084900368,131.75180560249967,31.913342690782649,16.026862578589736,11.231479289622285,9.8832177485589234,10.611412054251511,14.117833711112564,25.115009113616281,77.441073076582057,3567.5544815397652,149.56102862396955,33.654821046270349,16.483029701228681,11.382266612885788,9.9014266266034969,10.513486506394356,13.804171858933143,24.067736082344421,70.850991361234236,2014.1867815270432,171.35256428030749,35.565024846978787,16.96941053519377,11.543175747755541,9.9257281325334219,10.423220530217771,13.508970632471117,23.098373330390455,65.105555179089805,1292.5765404488943,198.40788670444419,37.666124795023556,17.488423925387725,11.714693304759425,9.9561817727190647,10.340374247983341,13.231097323254977,22.199636351497393,60.066688196674633,899.70256219376233,232.56874104110341,39.984072643012752,18.042747645734281,11.897348529394492,9.9928624432829452,10.264730149540428,12.969515188872601,21.365082620847911,55.623434105033276,662.44568134679105,276.55901292547526,42.549401691740215,18.635351849923094,12.091717008226878,10.035860823669328,10.19609184818359,12.723274389352685,20.588997832118221,51.685807272713923,508.28423358651406,334.54495311936722,45.39823224959639,19.269537704132507,12.298424802635092,10.085283856387022,10.13428297363904,12.491503936637251,19.866299691422878,48.180210739537934,402.50214721919474,413.15909527219549,48.573544297772493,19.948982138106832,12.518153064061305,10.141255317310643,10.07914619124713,12.273404531788472,19.192456239547642,45.045981085020891,326.78703885791793,523.48459612197496,52.12680170721152,20.677789845831235,12.7516431926505,10.203916481805484,10.0305423378084,12.06824218190944,18.563416249258303,42.232754222823466,270.73722128954375,685.18662318647489,56.120043532061118,21.460553908027997,12.999702610496987,10.273426892893436,9.9883496658210067,11.875342503484326,17.975549700922581,39.698436546128228,228.0889604679507,935.92302684523565,60.628602435618426,22.302426708087424,13.263211231629148,10.349965238728391,9.952463188974356,11.694085631385864,17.425596703686985,37.40762750594498,194.88749038604226,1355.4301992187534,65.744674758816615,23.209203186805247,13.543128723643632,10.433730347788838,9.9227941227966117,11.523901663509427,16.910623521196872,35.330382372354258,168.53613593474972,2137.732067190927,71.582061380127485,24.1874189502633,13.840502670910404,10.52494231148213,9.8992694152986402,11.364266580164413,16.427984595807285,33.441233848012153,147.27280480906225,3863.5596288713919,78.282539649649081,25.244466336735563,14.156477766946781,10.623843745270634,9.88183136332872,11.214698585226826,15.975289655330879,31.718412442089097,129.86763329671277,8996.3318790780104,86.024540728357252,26.388732298815732,14.492306184436016,10.730701201025928,9.870437311163764,11.074754822832757,15.550375140852942,30.143220763217194,115.4411171274094,40083.405152588653,95.035137309653976,27.629762914210826,14.849359296078379,10.845806745110584,9.8650594286260418,10.944028429238729,15.151279320217261,28.699527958265175,103.3508240756568]}

},{}],49:[function(require,module,exports){
module.exports={  "x": [0.01,0.11004502251125563,0.21009004502251127,0.31013506753376691,0.41018009004502254,0.51022511255627823,0.6102701350675338,0.71031515757878938,0.81036018009004507,0.91040520260130076,1.0104502251125564,1.1104952476238119,1.2105402701350676,1.3105852926463233,1.4106303151575788,1.5106753376688344,1.6107203601800901,1.7107653826913458,1.8108104052026015,1.910855427713857,2.0109004502251127,2.1109454727363679,2.2109904952476236,2.3110355177588793,2.411080540270135,2.5111255627813907,2.6111705852926463,2.711215607803902,2.8112606303151573,2.911305652826413,3.0113506753376686,3.1113956978489243,3.21144072036018,3.3114857428714357,3.4115307653826914,3.5115757878939471,3.6116208104052028,3.711665832916458,3.8117108554277137,3.9117558779389694,4.0118009004502255,4.1118459229614803,4.211890945472736,4.3119359679839917,4.4119809904952474,4.5120260130065031,4.6120710355177588,4.7121160580290145,4.8121610805402701,4.9122061030515258,5.0122511255627815,5.1122961480740372,5.2123411705852929,5.3123861930965486,5.4124312156078043,5.51247623811906,5.6125212606303148,5.7125662831415704,5.8126113056528261,5.9126563281640818,6.0127013506753375,6.1127463731865932,6.2127913956978489,6.3128364182091046,6.4128814407203603,6.5129264632316159,6.6129714857428716,6.7130165082541273,6.813061530765383,6.9131065532766387,7.0131515757878944,7.1131965982991501,7.2132416208104058,7.3132866433216606,7.4133316658329163,7.5133766883441719,7.6134217108554276,7.7134667333666833,7.813511755877939,7.9135567783891947,8.0136018009004513,8.1136468234117061,8.2136918459229609,8.3137368684342174,8.4137818909454722,8.5138269134567288,8.6138719359679836,8.7139169584792402,8.813961980990495,8.9140070035017516,9.0140520260130064,9.1140970485242629,9.2141420710355177,9.3141870935467743,9.4142321160580291,9.5142771385692857,9.6143221610805405,9.7143671835917953,9.8144122061030519,9.9144572286143067,10.014502251125563,10.114547273636818,10.214592296148075,10.314637318659329,10.414682341170586,10.514727363681841,10.614772386193097,10.714817408704352,10.814862431215609,10.914907453726864,11.01495247623812,11.114997498749375,11.21504252126063,11.315087543771886,11.415132566283141,11.515177588794398,11.615222611305652,11.715267633816909,11.815312656328164,11.91535767883942,12.015402701350675,12.115447723861932,12.215492746373187,12.315537768884443,12.415582791395698,12.515627813906955,12.615672836418209,12.715717858929466,12.815762881440721,12.915807903951976,13.015852926463232,13.115897948974487,13.215942971485743,13.315987993996998,13.416033016508255,13.51607803901951,13.616123061530766,13.716168084042021,13.816213106553278,13.916258129064532,14.016303151575789,14.116348174087044,14.2163931965983,14.316438219109555,14.416483241620812,14.516528264132067,14.616573286643321,14.716618309154578,14.816663331665833,14.916708354177089,15.016753376688344,15.116798399199601,15.216843421710855,15.316888444222112,15.416933466733367,15.516978489244623,15.617023511755878,15.717068534267135,15.81711355677839,15.917158579289646,16.017203601800905,16.117248624312158,16.217293646823414,16.317338669334671,16.417383691845924,16.51742871435718,16.617473736868437,16.717518759379693,16.817563781890946,16.917608804402203,17.01765382691346,17.117698849424716,17.217743871935969,17.317788894447226,17.417833916958482,17.517878939469739,17.617923961980992,17.717968984492249,17.818014007003505,17.918059029514758,18.018104052026015,18.118149074537271,18.218194097048528,18.318239119559781,18.418284142071037,18.518329164582294,18.618374187093551,18.718419209604804,18.81846423211606,18.918509254627317,19.018554277138573,19.118599299649826,19.218644322161083,19.31868934467234,19.418734367183593,19.518779389694849,19.618824412206106,19.718869434717362,19.818914457228615,19.918959479739872,20.019004502251128,20.119049524762385,20.219094547273638,20.319139569784895,20.419184592296151,20.519229614807408,20.619274637318661,20.719319659829917,20.819364682341174,20.919409704852427,21.019454727363684,21.11949974987494,21.219544772386197,21.31958979489745,21.419634817408706,21.519679839919963,21.619724862431219,21.719769884942473,21.819814907453729,21.919859929964986,22.019904952476242,22.119949974987495,22.219994997498752,22.320040020010008,22.420085042521261,22.520130065032518,22.620175087543775,22.720220110055031,22.820265132566284,22.920310155077541,23.020355177588797,23.120400200100054,23.220445222611307,23.320490245122564,23.42053526763382,23.520580290145077,23.62062531265633,23.720670335167586,23.820715357678843,23.920760380190099,24.020805402701352,24.120850425212609,24.220895447723866,24.320940470235119,24.420985492746375,24.521030515257632,24.621075537768888,24.721120560280141,24.821165582791398,24.921210605302655,25.021255627813911,25.121300650325164,25.221345672836421,25.321390695347677,25.421435717858934,25.521480740370187,25.621525762881443,25.7215707853927,25.821615807903953,25.92166083041521,26.021705852926466,26.121750875437723,26.221795897948976,26.321840920460232,26.421885942971489,26.521930965482746,26.621975987993999,26.722021010505255,26.822066033016512,26.922111055527768,27.022156078039021,27.122201100550278,27.222246123061534,27.322291145572787,27.422336168084044,27.522381190595301,27.622426213106557,27.72247123561781,27.822516258129067,27.922561280640323,28.02260630315158,28.122651325662833,28.22269634817409,28.322741370685346,28.422786393196603,28.522831415707856,28.622876438219112,28.722921460730369,28.822966483241625,28.923011505752878,29.023056528264135,29.123101550775392,29.223146573286645,29.323191595797901,29.423236618309158,29.523281640820414,29.623326663331667,29.723371685842924,29.823416708354181,29.923461730865437,30.02350675337669,30.123551775887947,30.223596798399203,30.32364182091046,30.423686843421713,30.523731865932969,30.623776888444226,30.723821910955479,30.823866933466736,30.923911955977992,31.023956978489249,31.124002001000502,31.224047023511758,31.324092046023015,31.424137068534272,31.524182091045525,31.624227113556781,31.724272136068038,31.824317158579294,31.924362181090547,32.024407203601804,32.124452226113057,32.22449724862431,32.32454227113557,32.424587293646823,32.524632316158076,32.624677338669336,32.724722361180589,32.824767383691842,32.924812406203102,33.024857428714355,33.124902451225616,33.224947473736869,33.324992496248122,33.425037518759382,33.525082541270635,33.625127563781888,33.725172586293148,33.825217608804401,33.925262631315654,34.025307653826914,34.125352676338167,34.225397698849427,34.32544272136068,34.425487743871933,34.525532766383193,34.625577788894446,34.7256228114057,34.82566783391696,34.925712856428213,35.025757878939473,35.125802901450726,35.225847923961979,35.325892946473239,35.425937968984492,35.525982991495745,35.626028014007005,35.726073036518258,35.826118059029511,35.926163081540771,36.026208104052024,36.126253126563284,36.226298149074537,36.326343171585791,36.426388194097051,36.526433216608304,36.626478239119557,36.726523261630817,36.82656828414207,36.926613306653323,37.026658329164583,37.126703351675836,37.226748374187096,37.326793396698349,37.426838419209602,37.526883441720862,37.626928464232115,37.726973486743368,37.827018509254628,37.927063531765882,38.027108554277142,38.127153576788395,38.227198599299648,38.327243621810908,38.427288644322161,38.527333666833414,38.627378689344674,38.727423711855927,38.82746873436718,38.92751375687844,39.027558779389693,39.127603801900953,39.227648824412206,39.327693846923459,39.42773886943472,39.527783891945973,39.627828914457226,39.727873936968486,39.827918959479739,39.927963981990999,40.028009004502252,40.128054027013505,40.228099049524765,40.328144072036018,40.428189094547271,40.528234117058531,40.628279139569784,40.728324162081037,40.828369184592297,40.92841420710355,41.028459229614811,41.128504252126064,41.228549274637317,41.328594297148577,41.42863931965983,41.528684342171083,41.628729364682343,41.728774387193596,41.828819409704849,41.928864432216109,42.028909454727362,42.128954477238622,42.228999499749875,42.329044522261128,42.429089544772388,42.529134567283641,42.629179589794894,42.729224612306155,42.829269634817408,42.929314657328668,43.029359679839921,43.129404702351174,43.229449724862434,43.329494747373687,43.42953976988494,43.5295847923962,43.629629814907453,43.729674837418706,43.829719859929966,43.929764882441219,44.029809904952479,44.129854927463732,44.229899949974985,44.329944972486246,44.429989994997499,44.530035017508752,44.630080040020012,44.730125062531265,44.830170085042518,44.930215107553778,45.030260130065031,45.130305152576291,45.230350175087544,45.330395197598797,45.430440220110057,45.53048524262131,45.630530265132563,45.730575287643823,45.830620310155076,45.930665332666337,46.03071035517759,46.130755377688843,46.230800400200103,46.330845422711356,46.430890445222609,46.530935467733869,46.630980490245122,46.731025512756375,46.831070535267635,46.931115557778888,47.031160580290148,47.131205602801401,47.231250625312654,47.331295647823914,47.431340670335167,47.53138569284642,47.631430715357681,47.731475737868934,47.831520760380194,47.931565782891447,48.0316108054027,48.13165582791396,48.231700850425213,48.331745872936466,48.431790895447726,48.531835917958979,48.631880940470232,48.731925962981492,48.831970985492745,48.932016008004005,49.032061030515258,49.132106053026511,49.232151075537772,49.332196098049025,49.432241120560278,49.532286143071538,49.632331165582791,49.732376188094044,49.832421210605304,49.932466233116557,50.032511255627817,50.13255627813907,50.232601300650323,50.332646323161583,50.432691345672836,50.532736368184089,50.632781390695349,50.732826413206602,50.832871435717863,50.932916458229116,51.032961480740369,51.133006503251629,51.233051525762882,51.333096548274135,51.433141570785395,51.533186593296648,51.633231615807901,51.733276638319161,51.833321660830414,51.933366683341674,52.033411705852927,52.13345672836418,52.23350175087544,52.333546773386693,52.433591795897946,52.533636818409207,52.63368184092046,52.73372686343172,52.833771885942973,52.933816908454226,53.033861930965486,53.133906953476739,53.233951975987992,53.333996998499252,53.434042021010505,53.534087043521758,53.634132066033018,53.734177088544271,53.834222111055531,53.934267133566784,54.034312156078038,54.134357178589298,54.234402201100551,54.334447223611804,54.434492246123064,54.534537268634317,54.63458229114557,54.73462731365683,54.834672336168083,54.934717358679343,55.034762381190596,55.134807403701849,55.234852426213109,55.334897448724362,55.434942471235615,55.534987493746875,55.635032516258129,55.735077538769389,55.835122561280642,55.935167583791895,56.035212606303155,56.135257628814408,56.235302651325661,56.335347673836921,56.435392696348174,56.535437718859427,56.635482741370687,56.73552776388194,56.8355727863932,56.935617808904453,57.035662831415706,57.135707853926966,57.23575287643822,57.335797898949473,57.435842921460733,57.535887943971986,57.635932966483246,57.735977988994499,57.836023011505752,57.936068034017012,58.036113056528265,58.136158079039518,58.236203101550778,58.336248124062031,58.436293146573284,58.536338169084544,58.636383191595797,58.736428214107057,58.836473236618311,58.936518259129564,59.036563281640824,59.136608304152077,59.23665332666333,59.33669834917459,59.436743371685843,59.536788394197096,59.636833416708356,59.736878439219609,59.836923461730869,59.936968484242122,60.037013506753375,60.137058529264635,60.237103551775888,60.337148574287141,60.437193596798402,60.537238619309655,60.637283641820915,60.737328664332168,60.837373686843421,60.937418709354681,61.037463731865934,61.137508754377187,61.237553776888447,61.3375987993997,61.437643821910953,61.537688844422213,61.637733866933466,61.737778889444726,61.837823911955979,61.937868934467232,62.037913956978493,62.137958979489746,62.238004002000999,62.338049024512259,62.438094047023512,62.538139069534765,62.638184092046025,62.738229114557278,62.838274137068538,62.938319159579791,63.038364182091044,63.138409204602304,63.238454227113557,63.33849924962481,63.43854427213607,63.538589294647323,63.638634317158584,63.738679339669837,63.83872436218109,63.93876938469235,64.038814407203617,64.13885942971487,64.238904452226123,64.338949474737376,64.438994497248629,64.539039519759882,64.639084542271149,64.739129564782402,64.839174587293655,64.939219609804908,65.039264632316161,65.139309654827429,65.239354677338682,65.339399699849935,65.439444722361188,65.539489744872441,65.639534767383694,65.739579789894961,65.839624812406214,65.939669834917467,66.03971485742872,66.139759879939973,66.23980490245124,66.339849924962493,66.439894947473746,66.539939969984999,66.639984992496252,66.740030015007505,66.840075037518773,66.940120060030026,67.040165082541279,67.140210105052532,67.240255127563785,67.340300150075052,67.440345172586305,67.540390195097558,67.640435217608811,67.740480240120064,67.840525262631317,67.940570285142584,68.040615307653837,68.14066033016509,68.240705352676343,68.340750375187596,68.440795397698864,68.540840420210117,68.64088544272137,68.740930465232623,68.840975487743876,68.941020510255129,69.041065532766396,69.141110555277649,69.241155577788902,69.341200600300155,69.441245622811408,69.541290645322675,69.641335667833928,69.741380690345181,69.841425712856434,69.941470735367687,70.041515757878955,70.141560780390208,70.241605802901461,70.341650825412714,70.441695847923967,70.54174087043522,70.641785892946487,70.74183091545774,70.841875937968993,70.941920960480246,71.041965982991499,71.142011005502766,71.242056028014019,71.342101050525272,71.442146073036525,71.542191095547778,71.642236118059031,71.742281140570299,71.842326163081552,71.942371185592805,72.042416208104058,72.142461230615311,72.242506253126578,72.342551275637831,72.442596298149084,72.542641320660337,72.64268634317159,72.742731365682843,72.84277638819411,72.942821410705363,73.042866433216616,73.142911455727869,73.242956478239122,73.34300150075039,73.443046523261643,73.543091545772896,73.643136568284149,73.743181590795402,73.843226613306655,73.943271635817922,74.043316658329175,74.143361680840428,74.243406703351681,74.343451725862934,74.443496748374201,74.543541770885454,74.643586793396707,74.74363181590796,74.843676838419213,74.943721860930481,75.043766883441734,75.143811905952987,75.24385692846424,75.343901950975493,75.443946973486746,75.543991995998013,75.644037018509266,75.744082041020519,75.844127063531772,75.944172086043025,76.044217108554292,76.144262131065545,76.244307153576798,76.344352176088051,76.444397198599304,76.544442221110558,76.644487243621825,76.744532266133078,76.844577288644331,76.944622311155584,77.044667333666837,77.144712356178104,77.244757378689357,77.34480240120061,77.444847423711863,77.544892446223116,77.644937468734369,77.744982491245636,77.845027513756889,77.945072536268142,78.045117558779395,78.145162581290649,78.245207603801916,78.345252626313169,78.445297648824422,78.545342671335675,78.645387693846928,78.745432716358181,78.845477738869448,78.945522761380701,79.045567783891954,79.145612806403207,79.24565782891446,79.345702851425727,79.44574787393698,79.545792896448233,79.645837918959487,79.74588294147074,79.845927963982007,79.94597298649326,80.046018009004513,80.146063031515766,80.246108054027019,80.346153076538272,80.446198099049539,80.546243121560792,80.646288144072045,80.746333166583298,80.846378189094551,80.946423211605818,81.046468234117071,81.146513256628324,81.246558279139578,81.346603301650831,81.446648324162084,81.546693346673351,81.646738369184604,81.746783391695857,81.84682841420711,81.946873436718363,82.04691845922963,82.146963481740883,82.247008504252136,82.347053526763389,82.447098549274642,82.547143571785895,82.647188594297162,82.747233616808415,82.847278639319669,82.947323661830922,83.047368684342175,83.147413706853442,83.247458729364695,83.347503751875948,83.447548774387201,83.547593796898454,83.647638819409707,83.747683841920974,83.847728864432227,83.94777388694348,84.047818909454733,84.147863931965986,84.247908954477253,84.347953976988506,84.44799899949976,84.548044022011013,84.648089044522266,84.748134067033533,84.848179089544786,84.948224112056039,85.048269134567292,85.148314157078545,85.248359179589798,85.348404202101065,85.448449224612318,85.548494247123571,85.648539269634824,85.748584292146077,85.848629314657344,85.948674337168598,86.048719359679851,86.148764382191104,86.248809404702357,86.34885442721361,86.448899449724877,86.54894447223613,86.648989494747383,86.749034517258636,86.849079539769889,86.949124562281156,87.049169584792409,87.149214607303662,87.249259629814915,87.349304652326168,87.449349674837421,87.549394697348689,87.649439719859942,87.749484742371195,87.849529764882448,87.949574787393701,88.049619809904968,88.149664832416221,88.249709854927474,88.349754877438727,88.44979989994998,88.549844922461233,88.6498899449725,88.749934967483753,88.849979989995006,88.950025012506259,89.050070035017512,89.15011505752878,89.250160080040033,89.350205102551286,89.450250125062539,89.550295147573792,89.650340170085045,89.750385192596312,89.850430215107565,89.950475237618818,90.050520260130071,90.150565282641324,90.250610305152591,90.350655327663844,90.450700350175097,90.55074537268635,90.650790395197603,90.750835417708871,90.850880440220124,90.950925462731377,91.05097048524263,91.151015507753883,91.251060530265136,91.351105552776403,91.451150575287656,91.551195597798909,91.651240620310162,91.751285642821415,91.851330665332682,91.951375687843935,92.051420710355188,92.151465732866441,92.251510755377694,92.351555777888947,92.451600800400215,92.551645822911468,92.651690845422721,92.751735867933974,92.851780890445227,92.951825912956494,93.051870935467747,93.151915957979,93.251960980490253,93.352006003001506,93.452051025512759,93.552096048024026,93.652141070535279,93.752186093046532,93.852231115557785,93.952276138069038,94.052321160580306,94.152366183091559,94.252411205602812,94.352456228114065,94.452501250625318,94.552546273136571,94.652591295647838,94.752636318159091,94.852681340670344,94.952726363181597,95.05277138569285,95.152816408204117,95.25286143071537,95.352906453226623,95.452951475737876,95.552996498249129,95.653041520760397,95.75308654327165,95.853131565782903,95.953176588294156,96.053221610805409,96.153266633316662,96.253311655827929,96.353356678339182,96.453401700850435,96.553446723361688,96.653491745872941,96.753536768384208,96.853581790895461,96.953626813406714,97.053671835917967,97.15371685842922,97.253761880940473,97.353806903451741,97.453851925962994,97.553896948474247,97.6539419709855,97.753986993496753,97.85403201600802,97.954077038519273,98.054122061030526,98.154167083541779,98.254212106053032,98.354257128564285,98.454302151075552,98.554347173586805,98.654392196098058,98.754437218609311,98.854482241120564,98.954527263631832,99.054572286143085,99.154617308654338,99.254662331165591,99.354707353676844,99.454752376188097,99.554797398699364,99.654842421210617,99.75488744372187,99.854932466233123,99.954977488744376,100.05502251125564,100.1550675337669,100.25511255627815,100.3551575787894,100.45520260130066,100.55524762381192,100.65529264632318,100.75533766883443,100.85538269134568,100.95542771385693,101.05547273636819,101.15551775887945,101.25556278139071,101.35560780390196,101.45565282641321,101.55569784892447,101.65574287143573,101.75578789394699,101.85583291645824,101.95587793896949,102.05592296148075,102.155967983992,102.25601300650327,102.35605802901452,102.45610305152577,102.55614807403703,102.65619309654828,102.75623811905955,102.8562831415708,102.95632816408205,103.05637318659331,103.15641820910456,103.25646323161581,103.35650825412708,103.45655327663833,103.55659829914958,103.65664332166084,103.75668834417209,103.85673336668336,103.95677838919461,104.05682341170586,104.15686843421712,104.25691345672837,104.35695847923962,104.45700350175089,104.55704852426214,104.6570935467734,104.75713856928465,104.8571835917959,104.95722861430717,105.05727363681842,105.15731865932968,105.25736368184093,105.35740870435218,105.45745372686345,105.5574987493747,105.65754377188595,105.75758879439721,105.85763381690846,105.95767883941971,106.05772386193098,106.15776888444223,106.25781390695349,106.35785892946474,106.45790395197599,106.55794897448726,106.65799399699851,106.75803901950977,106.85808404202102,106.95812906453227,107.05817408704353,107.15821910955479,107.25826413206605,107.3583091545773,107.45835417708855,107.5583991995998,107.65844422211107,107.75848924462233,107.85853426713358,107.95857928964483,108.05862431215608,108.15866933466734,108.2587143571786,108.35875937968986,108.45880440220111,108.55884942471236,108.65889444722362,108.75893946973488,108.85898449224614,108.95902951475739,109.05907453726864,109.1591195597799,109.25916458229115,109.35920960480242,109.45925462731367,109.55929964982492,109.65934467233618,109.75938969484743,109.8594347173587,109.95947973986995,110.0595247623812,110.15956978489245,110.25961480740371,110.35965982991497,110.45970485242623,110.55974987493748,110.65979489744873,110.75983991995999,110.85988494247124,110.95992996498251,111.05997498749376,111.16002001000501,111.26006503251627,111.36011005502752,111.46015507753879,111.56020010005004,111.66024512256129,111.76029014507255,111.8603351675838,111.96038019009505,112.06042521260632,112.16047023511757,112.26051525762882,112.36056028014008,112.46060530265133,112.5606503251626,112.66069534767385,112.7607403701851,112.86078539269636,112.96083041520761,113.06087543771886,113.16092046023013,113.26096548274138,113.36101050525264,113.46105552776389,113.56110055027514,113.66114557278641,113.76119059529766,113.86123561780892,113.96128064032017,114.06132566283142,114.16137068534267,114.26141570785394,114.3614607303652,114.46150575287645,114.5615507753877,114.66159579789895,114.76164082041022,114.86168584292147,114.96173086543273,115.06177588794398,115.16182091045523,115.2618659329665,115.36191095547775,115.46195597798901,115.56200100050026,115.66204602301151,115.76209104552277,115.86213606803403,115.96218109054529,116.06222611305654,116.16227113556779,116.26231615807905,116.36236118059031,116.46240620310157,116.56245122561282,116.66249624812407,116.76254127063532,116.86258629314658,116.96263131565784,117.0626763381691,117.16272136068035,117.2627663831916,117.36281140570286,117.46285642821412,117.56290145072538,117.66294647323663,117.76299149574788,117.86303651825914,117.96308154077039,118.06312656328166,118.16317158579291,118.26321660830416,118.36326163081542,118.46330665332667,118.56335167583794,118.66339669834919,118.76344172086044,118.86348674337169,118.96353176588295,119.0635767883942,119.16362181090547,119.26366683341672,119.36371185592797,119.46375687843923,119.56380190095048,119.66384692346175,119.763891945973,119.86393696848425,119.96398199099551,120.06402701350676,120.16407203601801,120.26411705852928,120.36416208104053,120.46420710355179,120.56425212606304,120.66429714857429,120.76434217108556,120.86438719359681,120.96443221610807,121.06447723861932,121.16452226113057,121.26456728364184,121.36461230615309,121.46465732866434,121.5647023511756,121.66474737368685,121.7647923961981,121.86483741870937,121.96488244122062,122.06492746373188,122.16497248624313,122.26501750875438,122.36506253126565,122.4651075537769,122.56515257628816,122.66519759879941,122.76524262131066,122.86528764382192,122.96533266633318,123.06537768884444,123.16542271135569,123.26546773386694,123.36551275637819,123.46555777888946,123.56560280140071,123.66564782391197,123.76569284642322,123.86573786893447,123.96578289144573,124.06582791395699,124.16587293646825,124.2659179589795,124.36596298149075,124.46600800400201,124.56605302651327,124.66609804902453,124.76614307153578,124.86618809404703,124.96623311655829,125.06627813906954,125.16632316158081,125.26636818409206,125.36641320660331,125.46645822911456,125.56650325162582,125.66654827413709,125.76659329664834,125.86663831915959,125.96668334167084,126.0667283641821,126.16677338669336,126.26681840920462,126.36686343171587,126.46690845422712,126.56695347673838,126.66699849924963,126.7670435217609,126.86708854427215,126.9671335667834,127.06717858929466,127.16722361180591,127.26726863431718,127.36731365682843,127.46735867933968,127.56740370185094,127.66744872436219,127.76749374687344,127.86753876938471,127.96758379189596,128.06762881440721,128.16767383691845,128.26771885942972,128.36776388194096,128.46780890445223,128.56785392696347,128.66789894947473,128.767943971986,128.86798899449724,128.96803401700851,129.06807903951974,129.16812406203101,129.26816908454228,129.36821410705352,129.46825912956479,129.56830415207602,129.66834917458729,129.76839419709856,129.8684392196098,129.96848424212106,130.0685292646323,130.16857428714357,130.26861930965484,130.36866433216608,130.46870935467734,130.56875437718858,130.66879939969985,130.76884442221109,130.86888944472236,130.96893446723362,131.06897948974486,131.16902451225613,131.26906953476737,131.36911455727864,131.4691595797899,131.56920460230114,131.66924962481241,131.76929464732365,131.86933966983491,131.96938469234618,132.06942971485742,132.16947473736869,132.26951975987993,132.36956478239119,132.46960980490246,132.5696548274137,132.66969984992497,132.76974487243621,132.86978989494747,132.96983491745871,133.06987993996998,133.16992496248125,133.26996998499249,133.37001500750375,133.47006003001499,133.57010505252626,133.67015007503753,133.77019509754876,133.87024012006003,133.97028514257127,134.07033016508254,134.17037518759381,134.27042021010504,134.37046523261631,134.47051025512755,134.57055527763882,134.67060030015008,134.77064532266132,134.87069034517259,134.97073536768383,135.0707803901951,135.17082541270636,135.2708704352176,135.37091545772887,135.47096048024011,135.57100550275138,135.67105052526261,135.77109554777388,135.87114057028515,135.97118559279639,136.07123061530766,136.17127563781889,136.27132066033016,136.37136568284143,136.47141070535267,136.57145572786393,136.67150075037517,136.77154577288644,136.87159079539771,136.97163581790895,137.07168084042021,137.17172586293145,137.27177088544272,137.37181590795399,137.47186093046523,137.57190595297649,137.67195097548773,137.771995997999,137.87204102051024,137.97208604302151,138.07213106553277,138.17217608804401,138.27222111055528,138.37226613306652,138.47231115557778,138.57235617808905,138.67240120060029,138.77244622311156,138.8724912456228,138.97253626813406,139.07258129064533,139.17262631315657,139.27267133566784,139.37271635817908,139.47276138069034,139.57280640320161,139.67285142571285,139.77289644822412,139.87294147073536,139.97298649324662,140.07303151575789,140.17307653826913,140.2731215607804,140.37316658329163,140.4732116058029,140.57325662831414,140.67330165082541,140.77334667333668,140.87339169584791,140.97343671835918,141.07348174087042,141.17352676338169,141.27357178589295,141.37361680840419,141.47366183091546,141.5737068534267,141.67375187593797,141.77379689844923,141.87384192096047,141.97388694347174,142.07393196598298,142.17397698849425,142.27402201100551,142.37406703351675,142.47411205602802,142.57415707853926,142.67420210105053,142.77424712356176,142.87429214607303,142.9743371685843,143.07438219109554,143.1744272136068,143.27447223611804,143.37451725862931,143.47456228114058,143.57460730365182,143.67465232616308,143.77469734867432,143.87474237118559,143.97478739369686,144.0748324162081,144.17487743871936,144.2749224612306,144.37496748374187,144.47501250625314,144.57505752876438,144.67510255127564,144.77514757378688,144.87519259629815,144.97523761880942,145.07528264132065,145.17532766383192,145.27537268634316,145.37541770885443,145.47546273136567,145.57550775387693,145.6755527763882,145.77559779889944,145.87564282141071,145.97568784392195,146.07573286643321,146.17577788894448,146.27582291145572,146.37586793396699,146.47591295647823,146.57595797898949,146.67600300150076,146.776048024012,146.87609304652327,146.9761380690345,147.07618309154577,147.17622811405704,147.27627313656828,147.37631815907955,147.47636318159078,147.57640820410205,147.67645322661329,147.77649824912456,147.87654327163582,147.97658829414706,148.07663331665833,148.17667833916957,148.27672336168084,148.3767683841921,148.47681340670334,148.57685842921461,148.67690345172585,148.77694847423712,148.87699349674838,148.97703851925962,149.07708354177089,149.17712856428213,149.2771735867934,149.37721860930466,149.4772636318159,149.57730865432717,149.67735367683841,149.77739869934967,149.87744372186094,149.97748874437218,150.07753376688345,150.17757878939469,150.27762381190595,150.37766883441719,150.47771385692846,150.57775887943973,150.67780390195097,150.77784892446223,150.87789394697347,150.97793896948474,151.07798399199601,151.17802901450725,151.27807403701851,151.37811905952975,151.47816408204102,151.57820910455229,151.67825412706352,151.77829914957479,151.87834417208603,151.9783891945973,152.07843421710857,152.1784792396198,152.27852426213107,152.37856928464231,152.47861430715358,152.57865932966482,152.67870435217608,152.77874937468735,152.87879439719859,152.97883941970986,153.0788844422211,153.17892946473236,153.27897448724363,153.37901950975487,153.47906453226614,153.57910955477738,153.67915457728864,153.77919959979991,153.87924462231115,153.97928964482242,154.07933466733365,154.17937968984492,154.27942471235619,154.37946973486743,154.47951475737869,154.57955977988993,154.6796048024012,154.77964982491247,154.87969484742371,154.97973986993497,155.07978489244621,155.17982991495748,155.27987493746872,155.37991995997999,155.47996498249125,155.58001000500249,155.68005502751376,155.780100050025,155.88014507253627,155.98019009504753,156.08023511755877,156.18028014007004,156.28032516258128,156.38037018509254,156.48041520760381,156.58046023011505,156.68050525262632,156.78055027513756,156.88059529764882,156.98064032016009,157.08068534267133,157.1807303651826,157.28077538769384,157.3808204102051,157.48086543271634,157.58091045522761,157.68095547773888,157.78100050025012,157.88104552276138,157.98109054527262,158.08113556778389,158.18118059029516,158.2812256128064,158.38127063531766,158.4813156578289,158.58136068034017,158.68140570285144,158.78145072536267,158.88149574787394,158.98154077038518,159.08158579289645,159.18163081540771,159.28167583791895,159.38172086043022,159.48176588294146,159.58181090545273,159.68185592796399,159.78190095047523,159.8819459729865,159.98199099549774,160.08203601800901,160.18208104052025,160.28212606303151,160.38217108554278,160.48221610805402,160.58226113056529,160.68230615307652,160.78235117558779,160.88239619809906,160.9824412206103,161.08248624312156,161.1825312656328,161.28257628814407,161.38262131065534,161.48266633316658,161.58271135567784,161.68275637818908,161.78280140070035,161.88284642321162,161.98289144572286,162.08293646823412,162.18298149074536,162.28302651325663,162.38307153576787,162.48311655827914,162.5831615807904,162.68320660330164,162.78325162581291,162.88329664832415,162.98334167083542,163.08338669334668,163.18343171585792,163.28347673836919,163.38352176088043,163.48356678339169,163.58361180590296,163.6836568284142,163.78370185092547,163.88374687343671,163.98379189594797,164.08383691845924,164.18388194097048,164.28392696348175,164.38397198599299,164.48401700850425,164.58406203101552,164.68410705352676,164.78415207603803,164.88419709854927,164.98424212106053,165.08428714357177,165.18433216608304,165.28437718859431,165.38442221110554,165.48446723361681,165.58451225612805,165.68455727863932,165.78460230115058,165.88464732366182,165.98469234617309,166.08473736868433,166.1847823911956,166.28482741370686,166.3848724362181,166.48491745872937,166.58496248124061,166.68500750375188,166.78505252626314,166.88509754877438,166.98514257128565,167.08518759379689,167.18523261630816,167.28527763881939,167.38532266133066,167.48536768384193,167.58541270635317,167.68545772886444,167.78550275137567,167.88554777388694,167.98559279639821,168.08563781890945,168.18568284142071,168.28572786393195,168.38577288644322,168.48581790895449,168.58586293146573,168.68590795397699,168.78595297648823,168.8859979989995,168.98604302151077,169.08608804402201,169.18613306653327,169.28617808904451,169.38622311155578,169.48626813406705,169.58631315657829,169.68635817908955,169.78640320160079,169.88644822411206,169.9864932466233,170.08653826913456,170.18658329164583,170.28662831415707,170.38667333666834,170.48671835917958,170.58676338169084,170.68680840420211,170.78685342671335,170.88689844922462,170.98694347173586,171.08698849424712,171.18703351675839,171.28707853926963,171.3871235617809,171.48716858429214,171.5872136068034,171.68725862931467,171.78730365182591,171.88734867433718,171.98739369684841,172.08743871935968,172.18748374187092,172.28752876438219,172.38757378689346,172.48761880940469,172.58766383191596,172.6877088544272,172.78775387693847,172.88779889944973,172.98784392196097,173.08788894447224,173.18793396698348,173.28797898949475,173.38802401200601,173.48806903451725,173.58811405702852,173.68815907953976,173.78820410205103,173.88824912456229,173.98829414707353,174.0883391695848,174.18838419209604,174.28842921460731,174.38847423711857,174.48851925962981,174.58856428214108,174.68860930465232,174.78865432716358,174.88869934967482,174.98874437218609,175.08878939469736,175.1888344172086,175.28887943971986,175.3889244622311,175.48896948474237,175.58901450725364,175.68905952976488,175.78910455227614,175.88914957478738,175.98919459729865,176.08923961980992,176.18928464232116,176.28932966483242,176.38937468734366,176.48941970985493,176.5894647323662,176.68950975487743,176.7895547773887,176.88959979989994,176.98964482241121,177.08968984492245,177.18973486743371,177.28977988994498,177.38982491245622,177.48986993496749,177.58991495747873,177.68995997998999,177.79000500250126,177.8900500250125,177.99009504752377,178.09014007003501,178.19018509254627,178.29023011505754,178.39027513756878,178.49032016008005,178.59036518259128,178.69041020510255,178.79045522761382,178.89050025012506,178.99054527263633,179.09059029514756,179.19063531765883,179.29068034017007,179.39072536268134,179.4907703851926,179.59081540770384,179.69086043021511,179.79090545272635,179.89095047523762,179.99099549774888,180.09104052026012,180.19108554277139,180.29113056528263,180.3911755877939,180.49122061030516,180.5912656328164,180.69131065532767,180.79135567783891,180.89140070035018,180.99144572286144,181.09149074537268,181.19153576788395,181.29158079039519,181.39162581290645,181.49167083541772,181.59171585792896,181.69176088044023,181.79180590295147,181.89185092546273,181.99189594797397,182.09194097048524,182.19198599299651,182.29203101550775,182.39207603801901,182.49212106053025,182.59216608304152,182.69221110555279,182.79225612806403,182.89230115057529,182.99234617308653,183.0923911955978,183.19243621810907,183.2924812406203,183.39252626313157,183.49257128564281,183.59261630815408,183.69266133066535,183.79270635317658,183.89275137568785,183.99279639819909,184.09284142071036,184.1928864432216,184.29293146573286,184.39297648824413,184.49302151075537,184.59306653326664,184.69311155577788,184.79315657828914,184.89320160080041,184.99324662331165,185.09329164582292,185.19333666833415,185.29338169084542,185.39342671335669,185.49347173586793,185.5935167583792,185.69356178089043,185.7936068034017,185.89365182591297,185.99369684842421,186.09374187093547,186.19378689344671,186.29383191595798,186.39387693846925,186.49392196098049,186.59396698349175,186.69401200600299,186.79405702851426,186.8941020510255,186.99414707353677,187.09419209604803,187.19423711855927,187.29428214107054,187.39432716358178,187.49437218609305,187.59441720860431,187.69446223111555,187.79450725362682,187.89455227613806,187.99459729864932,188.09464232116059,188.19468734367183,188.2947323661831,188.39477738869434,188.4948224112056,188.59486743371687,188.69491245622811,188.79495747873938,188.89500250125062,188.99504752376188,189.09509254627312,189.19513756878439,189.29518259129566,189.3952276138069,189.49527263631816,189.5953176588294,189.69536268134067,189.79540770385194,189.89545272636317,189.99549774887444,190.09554277138568,190.19558779389695,190.29563281640822,190.39567783891945,190.49572286143072,190.59576788394196,190.69581290645323,190.79585792896449,190.89590295147573,190.995947973987,191.09599299649824,191.19603801900951,191.29608304152077,191.39612806403201,191.49617308654328,191.59621810905452,191.69626313156579,191.79630815407702,191.89635317658829,191.99639819909956,192.0964432216108,192.19648824412207,192.2965332666333,192.39657828914457,192.49662331165584,192.59666833416708,192.69671335667834,192.79675837918958,192.89680340170085,192.99684842421212,193.09689344672336,193.19693846923462,193.29698349174586,193.39702851425713,193.4970735367684,193.59711855927964,193.6971635817909,193.79720860430214,193.89725362681341,193.99729864932465,194.09734367183592,194.19738869434718,194.29743371685842,194.39747873936969,194.49752376188093,194.59756878439219,194.69761380690346,194.7976588294147,194.89770385192597,194.99774887443721,195.09779389694847,195.19783891945974,195.29788394197098,195.39792896448225,195.49797398699349,195.59801900950475,195.69806403201602,195.79810905452726,195.89815407703853,195.99819909954977,196.09824412206103,196.1982891445723,196.29833416708354,196.39837918959481,196.49842421210604,196.59846923461731,196.69851425712855,196.79855927963982,196.89860430215109,196.99864932466232,197.09869434717359,197.19873936968483,197.2987843921961,197.39882941470736,197.4988744372186,197.59891945972987,197.69896448224111,197.79900950475238,197.89905452726364,197.99909954977488,198.09914457228615,198.19918959479739,198.29923461730866,198.39927963981992,198.49932466233116,198.59936968484243,198.69941470735367,198.79945972986494,198.89950475237617,198.99954977488744,199.09959479739871,199.19963981990995,199.29968484242121,199.39972986493245,199.49977488744372,199.59981990995499,199.69986493246623,199.79990995497749,199.89995497748873,200],  "expected": [10001.621213528313,83.991843295291133,23.908930601161877,11.518994574499217,6.958998081517815,4.7676840232433699,3.5363351786906443,2.7690219983155369,2.2543886195699208,1.8897440925005111,1.6201604552485112,1.4140082693753828,1.2519765885184968,1.1217005184006386,1.01494372895709,0.92603411001971092,0.85095265206849768,0.78678073288340455,0.7313528471465357,0.68303164013689976,0.64055819921422763,0.60295002397478481,0.56942999546191941,0.53937597251590208,0.5122844030066328,0.4877436387752031,0.46541408558839237,0.44501324351827942,0.42630429702964207,0.4090873158938958,0.39319239994440019,0.37847428751718853,0.36480807764082002,0.3520858080106245,0.340213696545073,0.32910990188745687,0.3187026929913595,0.30892894361004086,0.29973288665597214,0.29106507779806395,0.282881528587686,0.27514297775606161,0.2678142757586171,0.26086386263233119,0.25426332312963718,0.24798700615583671,0.2420116979594451,0.23631634045160083,0.23088178757154762,0.22569059385398849,0.22072683035504737,0.2159759239062107,0.21142451632841533,0.20706034078140945,0.20287211287018445,0.19884943449921863,0.19498270877120283,0.19126306448153838,0.1876822889725816,0.1842327682898704,0.18090743373248278,0.17769971401615045,0.17460349237478284,0.17161306801690238,0.16872312143082546,0.16592868309843314,0.16322510523387451,0.16060803621202899,0.1580733973932619,0.15561736208697732,0.15323633642756398,0.15092694196326784,0.14868599978191552,0.14651051601776705,0.14439766860152378,0.14234479513102671,0.14034938175375591,0.13840905296415187,0.13652156222924419,0.13468478336528678,0.13289670259622446,0.13115541123199351,0.12945909891101118,0.12780604735683901,0.12619462460400305,0.1246232796523964,0.12309053751364829,0.12159499461637008,0.12013531454034118,0.11871022405251386,0.11731850942024047,0.11595901297938756,0.11463062993703349,0.11333230539027118,0.11206303154428163,0.11082184511432397,0.10960782489762502,0.10842008950235649,0.10725779522198087,0.10612013404423404,0.10500633178490745,0.10391564633740642,0.10284736602979665,0.10180080808172351,0.10077531715419714,0.099770263985793195,0.098785044109325162,0.097819076643506822,0.096871803154545411,0.095942686582992737,0.0950312102315337,0.094136876809716621,0.093259207531924973,0.09239774126516305,0.091552033723477477,0.090721656706065829,0.08990619737633522,0.089105257579366992,0.088318453195423377,0.087545413527296306,0.086785780719450575,0.086039209207054101,0.085305365193117516,0.084583926152084779,0.083874580358328094,0.083177026438101681,0.082490972943605384,0.081816137947895648,0.081152248659464132,0.080499041055379167,0.07985625953195602,0.079223656571987003,0.078600992427623043,0.077988034818055357,0.077384558641197462,0.076790345698617798,0.07620518443301777,0.075628869677593344,0.075061202416657313,0.074501989556936959,0.073951043708995676,0.073408182978260017,0.072873230765163416,0.072346015573946043,0.071826370829676814,0.071314134703088172,0.070809149942837143,0.07031126371482839,0.06982032744825474,0.069336196688029914,0.068858730953306274,0.068387793601786651,0.067923251699555806,0.067464975896170953,0.067012840304765689,0.066566722386933758,0.066126502842172363,0.065692065501675223,0.065263297226277703,0.064840087808365365,0.064422329877567963,0.06400991881006951,0.063602752641373481,0.063200731982371083,0.062803759938567155,0.062411742032326252,0.062024586128008076,0.06164220235986767,0.06126450306260204,0.060891402704430581,0.060522817822602368,0.060158666961227895,0.059798870611338477,0.059443351153080533,0.059092032799956791,0.058744841545030194,0.058401705109010466,0.058062552890146973,0.057727315915854983,0.057395926796005747,0.057068319677813992,0.056744430202259707,0.056424195461983351,0.056107553960596981,0.055794445573355916,0.055484811509138331,0.055178594273682088,0.054875737634030808,0.054576186584142886,0.054279887311619472,0.053986787165509004,0.053696834625148009,0.053409979269999436,0.05312617175045152,0.052845363759541561,0.052567508005570709,0.052292558185577293,0.052020468959637176,0.05175119592596153,0.051484695596763039,0.051220925374863266,0.050959843531014598,0.050701409181911489,0.050445582268866647,0.050192323537128984,0.049941594515820704,0.049693357498472111,0.049447575524133494,0.049204212359044208,0.048963232478839894,0.048724601051279362,0.048488283919473782,0.048254247585600991,0.048022459195088713,0.047792886521251007,0.047565497950362981,0.047340262467158993,0.047117149640740687,0.046896129610881153,0.046677173074712572,0.046460251273784559,0.046245335981481457,0.046032399490786934,0.045821414602384737,0.045612354613084952,0.0454051933045653,0.045199904932417663,0.04499646421549016,0.044794846325515447,0.044595026877016421,0.044396981917480718,0.044200687917795564,0.044006121762935085,0.043813260742892296,0.043622082543848327,0.04343256523957166,0.043244687283040352,0.04305842749828067,0.042873765072415568,0.04269067954791668,0.042509150815053881,0.04232915910453653,0.042150684980340712,0.041973709332717081,0.041798213371373891,0.041624178618830332,0.041451586903935009,0.041280420355544925,0.041110661396360312,0.040942292736910885,0.040775297369689101,0.040609658563426361,0.040445359857508044,0.040282385056523491,0.040120718224947102,0.03996034368194696,0.039801245996317326,0.039643409981531715,0.039486820690913048,0.039331463412917794,0.039177323666530907,0.039024387196768602,0.038872639970285894,0.038722068171086248,0.038572658196330482,0.03842439665224219,0.038277270350107279,0.038131266302364908,0.037986371718787604,0.037842574002747965,0.037699860747569897,0.03755821973296198,0.037417638921530924,0.037278106455372967,0.03713961065274124,0.037002140004787069,0.036865683172373348,0.03673022898295817,0.036595766427546778,0.036462284657710259,0.03632977298266922,0.036198220866440714,0.036067617925046945,0.035937953923784176,0.035809218774550233,0.035681402533229295,0.03555449539713236,0.03542848770249224,0.035303369922011482,0.035179132662462122,0.035055766662335862,0.034933262789543548,0.03481161203916263,0.034690805531231529,0.034570834508589783,0.034451690334762738,0.034333364491889916,0.034215848578695834,0.034099134308502366,0.033983213507281604,0.033868078111748315,0.033753720167490973,0.033640131827140596,0.033527305348576307,0.033415233093166949,0.033303907524047806,0.033193321204431622,0.033083466795953212,0.032974337057046686,0.032865924841354852,0.032758223096169707,0.032651224860903598,0.032544923265590164,0.03243931152941449,0.032334382959271768,0.032230130948353801,0.032126548974762796,0.032023630600151752,0.031921369468390928,0.031819759304259711,0.031718793912163423,0.031618467174874466,0.03151877305229725,0.031419705580256439,0.031321258869307922,0.031223427103572097,0.031126204539588916,0.031029585505194291,0.030933564398417282,0.030838135686397747,0.030743293904323947,0.030649033654389656,0.030555349604770451,0.030462236488618628,0.030369689103076497,0.030277702308307616,0.030186271026545485,0.030095390241159495,0.03000505499573769,0.029915260393185931,0.029826001594843249,0.029737273819612955,0.029649072343109178,0.029561392496818627,0.029474229667277047,0.02938757929526032,0.029301436874989741,0.029215797953351174,0.029130658129127941,0.029046013052247053,0.028961858423038476,0.028878189991507357,0.028795003556618685,0.028712294965594375,0.028630060113222409,0.028548294941177773,0.028466995437355012,0.028386157635212197,0.028305777613125957,0.028225851493757479,0.028146375443429239,0.028067345671512162,0.027988758429823148,0.027910610012032617,0.027832896753082006,0.027755615028610948,0.027678761254393953,0.027602331885786414,0.027526323417179817,0.027450732381465837,0.027375555349509313,0.027300788929629834,0.027226429767091758,0.027152474543602603,0.027078919976819535,0.027005762819863874,0.026932999860843469,0.026860627922382724,0.026788643861160207,0.026717044567453687,0.026645826964692396,0.026574988009016493,0.02650452468884348,0.026434434024441525,0.026364713067509534,0.02629535890076384,0.026226368637531389,0.026157739421349351,0.026089468425570941,0.026021552852977428,0.025953989935396212,0.025886776933324768,0.02581991113556048,0.025753389858836157,0.025687210447461171,0.025621370272968149,0.025555866733765021,0.025490697254792444,0.025425859287186436,0.025361350307946121,0.025297167819606569,0.025233309349916525,0.02516977245152105,0.025106554701648957,0.025043653701804884,0.02498106707746604,0.024918792477783468,0.024856827575287736,0.024795170065599056,0.024733817667141677,0.024672768120862498,0.024612019189953871,0.024551568659580438,0.024491414336610038,0.024431554049348523,0.024371985647278455,0.024312707000801629,0.024253716000985345,0.024195010559312335,0.024136588607434346,0.024078448096929286,0.024020586999061812,0.023963003304547457,0.023905695023320038,0.023848660184302473,0.023791896835180844,0.023735403042181642,0.023679176889852237,0.023623216480844429,0.02356751993570105,0.023512085392645602,0.023456911007374841,0.023401994952854267,0.023347335419116523,0.023292930613062531,0.023238778758265483,0.023184878094777529,0.02313122687893911,0.023077823383190997,0.023024665895888898,0.022971752721120592,0.022919082178525629,0.022866652603117477,0.022814462345108092,0.022762509769734929,0.022710793257090248,0.022659311201952796,0.022608062013621751,0.022557044115752902,0.022506255946197061,0.022455695956840657,0.022405362613448433,0.022355254395508312,0.022305369796078296,0.022255707321635412,0.022206265491926711,0.022157042839822196,0.02210803791116973,0.022059249264651873,0.022010675471644571,0.021962315116077765,0.021914166794297776,0.021866229114931527,0.021818500698752557,0.021770980178548734,0.021723666198991746,0.021676557416508268,0.021629652499152788,0.021582950126482099,0.021536448989431429,0.021490147790192111,0.021444045242090891,0.021398140069470748,0.021352431007573246,0.021306916802422419,0.021261596210710089,0.021216467999682676,0.021171530947029463,0.021126783840772219,0.02108222547915628,0.02103785467054297,0.020993670233303389,0.020949670995713536,0.02090585579585074,0.020862223481491395,0.02081877291000999,0.020775502948279345,0.02073241247257215,0.0206895003684637,0.020646765530735803,0.02060420686328196,0.020561823279013611,0.020519613699767611,0.020477577056214832,0.020435712287769848,0.020394018342501763,0.020352494177046123,0.020311138756517882,0.020269951054425438,0.020228930052585737,0.020188074741040351,0.020147384117972629,0.020106857189625803,0.020066492970222109,0.020026290481882866,0.019986248754549518,0.019946366825905615,0.019906643741299749,0.019867078553669357,0.01982767032346551,0.01978841811857851,0.01974932101426443,0.019710378093072509,0.019671588444773368,0.019632951166288125,0.019594465361618324,0.019556130141776665,0.01951794462471856,0.019479907935274515,0.019442019205083257,0.01940427757252567,0.019366682182659481,0.019329232187154717,0.019291926744229915,0.019254765018589033,0.019217746181359137,0.019180869410028778,0.019144133888387063,0.019107538806463476,0.019071083360468321,0.019034766752733898,0.018998588191656337,0.018962546891638069,0.018926642073030978,0.018890872962080196,0.01885523879086852,0.018819738797261457,0.018784372224852915,0.01874913832291146,0.018714036346327227,0.018679065555559381,0.018644225216584195,0.018609514600843712,0.018574932985194931,0.018540479651859631,0.018506153888374694,0.018471954987543008,0.018437882247384896,0.018403934971090111,0.018370112466970307,0.0183364140484121,0.018302839033830589,0.018269386746623408,0.018236056515125297,0.018202847672563142,0.01816975955701151,0.018136791511348695,0.018103942883213195,0.018071213024960717,0.018038601293621583,0.018006107050858665,0.017973729662925715,0.017941468500626185,0.01790932293927246,0.017877292358645554,0.01784537614295521,0.017813573680800457,0.017781884365130562,0.017750307593206418,0.017718842766562323,0.017687489290968184,0.017656246576392101,0.017625114036963381,0.01759409109093589,0.017563177160651842,0.017532371672505945,0.01750167405690992,0.017471083748257402,0.017440600184889216,0.017410222809058983,0.017379951066899126,0.01734978440838721,0.01731972228731261,0.017289764161243591,0.017259909491494634,0.01723015774309419,0.017200508384752712,0.017170960888831042,0.017141514731309107,0.017112169391754938,0.017082924353294025,0.017053779102578971,0.01702473312975945,0.016995785928452481,0.016966936995713017,0.016938185832004803,0.016909531941171545,0.016880974830408388,0.016852514010233653,0.016824148994460879,0.016795879300171138,0.016767704447685629,0.016739623960538557,0.016711637365450276,0.016683744192300683,0.01665594397410293,0.016628236246977336,0.016600620550125605,0.016573096425805279,0.016545663419304434,0.016518321078916667,0.016491068955916299,0.016463906604533805,0.016436833581931553,0.016409849448179702,0.016382953766232389,0.016356146101904154,0.016329426023846533,0.016302793103524983,0.016276246915195924,0.016249787035884068,0.016223413045359986,0.01619712452611782,0.016170921063353279,0.016144802244941817,0.016118767661417031,0.016092816905949259,0.016066949574324401,0.016041165264922923,0.016015463578699082,0.015989844119160334,0.015964306492346945,0.01593885030681182,0.015913475173600471,0.015888180706231231,0.015862966520675641,0.015837832235338984,0.015812777471041074,0.015787801850997162,0.015762905000799063,0.015738086548396445,0.015713346124078299,0.015688683360454585,0.015664097892438028,0.01563958935722614,0.015615157394283345,0.015590801645323307,0.015566521754291438,0.01554231736734752,0.015518188132848535,0.015494133701331632,0.015470153725497255,0.01544624786019244,0.015422415762394245,0.015398657091193348,0.015374971507777793,0.015351358675416888,0.015327818259445245,0.015304349927246977,0.015280953348240025,0.015257628193860638,0.015234374137548003,0.015211190854728987,0.015188078022803066,0.015165035321127335,0.015142062431001696,0.015119159035654157,0.015096324820226286,0.015073559471758768,0.015050862679177128,0.015028234133277541,0.015005673526712808,0.014983180553978433,0.014960754911398838,0.014938396297113703,0.014916104411064409,0.014893878954980627,0.014871719632367011,0.014849626148490018,0.014827598210364836,0.014805635526742448,0.014783737808096772,0.014761904766611962,0.01474013611616979,0.014718431572337142,0.014696790852353652,0.014675213675119394,0.014653699761182738,0.014632248832728265,0.014610860613564831,0.014589534829113692,0.014568271206396781,0.014547069474025029,0.014525929362186848,0.014504850602636671,0.014483832928683611,0.014462876075180219,0.014441979778511327,0.014421143776582997,0.014400367808811569,0.014379651616112789,0.014358994940891058,0.014338397527028731,0.014317859119875554,0.014297379466238156,0.014276958314369656,0.014256595413959336,0.01423629051612243,0.014216043373389971,0.014195853739698743,0.014175721370381316,0.01415564602215616,0.014135627453117848,0.014115665422727339,0.014095759691802342,0.014075910022507772,0.014056116178346267,0.014036377924148802,0.014016695026065385,0.013997067251555802,0.013977494369380476,0.013957976149591383,0.01393851236352304,0.013919102783783594,0.013899747184245944,0.013880445340038974,0.013861197027538847,0.013842002024360358,0.013822860109348379,0.013803771062569369,0.013784734665302941,0.013765750700033514,0.01374681895044203,0.013727939201397735,0.013709111238950038,0.013690334850320417,0.013671609823894417,0.013652935949213692,0.013634313016968122,0.013615740818987993,0.013597219148236252,0.013578747798800795,0.013560326565886849,0.0135419552458094,0.01352363363598569,0.013505361534927767,0.013487138742235102,0.013468965058587258,0.013450840285736629,0.013432764226501227,0.013414736684757542,0.013396757465433437,0.013378826374501114,0.013360943218970141,0.013343107806880526,0.013325319947295843,0.013307579450296432,0.013289886126972629,0.013272239789418062,0.013254640250723003,0.013237087324967763,0.013219580827216162,0.013202120573509014,0.013184706380857692,0.01316733806723774,0.013150015451582524,0.013132738353776945,0.013115506594651201,0.013098319995974578,0.013081178380449322,0.013064081571704536,0.013047029394290127,0.013030021673670816,0.013013058236220173,0.012996138909214711,0.01297926352082803,0.01296243190012499,0.012945643877055948,0.012928899282451041,0.012912197948014474,0.012895539706318914,0.012878924390799877,0.012862351835750178,0.012845821876314438,0.012829334348483596,0.012812889089089497,0.012796485935799512,0.012780124727111188,0.012763805302346951,0.012747527501648858,0.012731291165973359,0.012715096137086128,0.012698942257556921,0.012682829370754475,0.012666757320841448,0.012650725952769389,0.012634735112273761,0.012618784645868983,0.012602874400843527,0.01258700422525505,0.012571173967925538,0.012555383478436525,0.012539632607124323,0.012523921205075287,0.012508249124121133,0.012492616216834274,0.012477022336523201,0.012461467337227888,0.012445951073715246,0.012430473401474598,0.012415034176713202,0.012399633256351782,0.012384270498020124,0.012368945760052681,0.012353658901484221,0.012338409782045499,0.012323198262158986,0.012308024202934583,0.012292887466165416,0.012277787914323627,0.012262725410556218,0.012247699818680916,0.012232711003182059,0.012217758829206534,0.012202843162559724,0.012187963869701503,0.012173120817742239,0.012158313874438853,0.012143542908190879,0.012128807788036565,0.012114108383649014,0.012099444565332332,0.012084816204017823,0.01207022317126019,0.01205566533923378,0.012041142580728862,0.012026654769147908,0.012012201778501923,0.01199778348340679,0.011983399759079647,0.011969050481335281,0.011954735526582563,0.011940454771820888,0.011926208094636671,0.01191199537319983,0.01189781648626032,0.011883671313144694,0.011869559733752665,0.011855481628553719,0.011841436878583732,0.011827425365441627,0.011813446971286039,0.011799501578832016,0.011785589071347738,0.011771709332651262,0.011757862247107287,0.011744047699623939,0.011730265575649587,0.011716515761169673,0.011702798142703577,0.011689112607301481,0.011675459042541284,0.011661837336525512,0.011648247377878266,0.011634689055742185,0.011621162259775442,0.011607666880148731,0.011594202807542312,0.011580769933143054,0.011567368148641493,0.011553997346228946,0.011540657418594594,0.011527348258922628,0.011514069760889386,0.011500821818660537,0.011487604326888251,0.011474417180708428,0.011461260275737906,0.011448133508071712,0.011435036774280335,0.011421969971406997,0.011408932996964971,0.011395925748934884,0.01138294812576207,0.011370000026353919,0.011357081350077253,0.011344191996755723,0.011331331866667221,0.011318500860541298,0.011305698879556623,0.011292925825338434,0.011280181599956026,0.01126746610592025,0.011254779246181019,0.011242120924124846,0.011229491043572388,0.011216889508776012,0.011204316224417371,0.011191771095605015,0.011179254027871982,0.011166764927173445,0.011154303699884349,0.011141870252797071,0.011129464493119101,0.01111708632847073,0.011104735666882755,0.011092412416794208,0.011080116487050084,0.011067847786899105,0.011055606225991482,0.011043391714376688,0.011031204162501272,0.011019043481206661,0.01100690958172698,0.01099480237568691,0.010982721775099525,0.010970667692364168,0.010958640040264334,0.010946638731965563,0.010934663681013359,0.010922714801331106,0.010910792007218003,0.010898895213347025,0.010887024334762879,0.010875179286879989,0.010863359985480483,0.010851566346712195,0.010839798287086687,0.010828055723477274,0.010816338573117071,0.010804646753597049,0.010792980182864098,0.010781338779219109,0.010769722461315074,0.010758131148155181,0.010746564759090936,0.010735023213820298,0.010723506432385812,0.010712014335172765,0.010700546842907357,0.010689103876654869,0.01067768535781786,0.010666291208134365,0.010654921349676105,0.010643575704846713,0.010632254196379967,0.010620956747338034,0.01060968328110974,0.010598433721408817,0.010587207992272201,0.010576006018058311,0.010564827723445355,0.010553673033429644,0.010542541873323907,0.010531434168755632,0.010520349845665406,0.010509288830305264,0.010498251049237068,0.010487236429330865,0.010476244897763285,0.010465276382015925,0.010454330809873767,0.010443408109423577,0.01043250820905235,0.010421631037445728,0.01041077652358645,0.010399944596752812,0.010389135186517122,0.010378348222744183,0.01036758363558977,0.010356841355499122,0.010346121313205446,0.010335423439728431,0.010324747666372763,0.010314093924726663,0.010303462146660414,0.010292852264324918,0.010282264210150247,0.010271697916844215,0.010261153317390949,0.010250630345049467,0.01024012893335228,0.010229649016103985,0.010219190527379879,0.01020875340152457,0.010198337573150614,0.010187942977137139,0.010177569548628491,0.01016721722303289,0.010156885936021083,0.010146575623525014,0.010136286221736504,0.010126017667105924,0.010115769896340897,0.010105542846404997,0.010095336454516443,0.010085150658146842,0.010074985395019878,0.010064840603110071,0.010054716220641496,0.010044612186086545,0.01003452843816467,0.010024464915841146,0.010014421558325843,0.010004398305071997,0.009994395095774997,0.00998441187037118,0.0099744485690366185,0.0099645051321859308,0.0099545815004710939,0.0099446776147802621,0.0099347934162365929,0.0099249288461970842,0.0099150838462514074,0.0099052583582207587,0.0098954523241567127,0.0098856656863400838,0.0098758983872797926,0.0098661503697117427,0.0098564215765976973,0.0098467119511241701,0.0098370214367013153,0.0098273499769618369,0.0098176975157598882,0.009808063997169986,0.0097984493654859322,0.0097888535652197409,0.0097792765411005671,0.0097697182380736547,0.0097601786012992686,0.009750657576151657,0.0097411551082180001,0.0097316711432973834,0.0097222056273997531,0.0097127585067449118,0.0097033297277614797,0.0096939192370858913,0.0096845269815613935,0.0096751529082370301,0.0096657969643666672,0.0096564590974079836,0.0096471392550214995,0.0096378373850695958,0.0096285534356155434,0.0096192873549225278,0.0096100390914527038,0.0096008085938662259,0.0095915958110203061,0.0095824006919682635,0.009573223185958591,0.0095640632424340219,0.0095549208110305931,0.0095457958415767312,0.0095366882840923328,0.0095275980887878451,0.0095185252060633729,0.0095094695865077603,0.0095004311808977032,0.0094914099401968571,0.0094824058155549458,0.0094734187583068834,0.0094644487199719001,0.0094554956522526629,0.0094465595070344147,0.0094376402363841108,0.0094287377925495602,0.0094198521279585789,0.0094109831952181328,0.0094021309471135073,0.0093932953366074566,0.0093844763168393838,0.0093756738411244992,0.0093668878629530085,0.0093581183359892888,0.0093493652140710665,0.0093406284512086227,0.0093319080015839724,0.0093232038195500792,0.0093145158596300431,0.0093058440765163182,0.0092971884250699216,0.0092885488603196564,0.0092799253374613172,0.0092713178118569405,0.0092627262390340068,0.0092541505746846983,0.00924559077466512,0.0092370467949945499,0.0092285185918546935,0.0092200061215889171,0.0092115093407015153,0.0092030282058569689,0.0091945626738792023,0.0091861127017508586,0.0091776782466125688,0.0091692592657622203,0.0091608557166542471,0.0091524675568989029,0.0091440947442615571,0.0091357372366619796,0.0091273949921736406,0.009119067969023004,0.009110756125588839,0.0091024594204015125,0.0090941778121423171,0.0090859112596427712,0.0090776597218839399,0.0090694231579957658,0.0090612015272563788,0.0090529947890914345,0.0090448029030734539,0.0090366258289211396,0.0090284635264987322,0.0090203159558153497,0.0090121830770243279,0.0090040648504225856,0.0089959612364499588,0.0089878721956885756,0.0089797976888622046,0.0089717376768356279,0.0089636921206140037,0.0089556609813422425,0.0089476442203043714,0.0089396417989229277,0.0089316536787583233,0.0089236798215082402,0.0089157201890070203,0.0089077747432250443,0.0088998434462681363,0.0088919262603769592,0.008884023147926412,0.0088761340714250386,0.0088682589935144343,0.0088603978769686512,0.0088525506846936202,0.0088447173797265542,0.0088368979252353829,0.0088290922845181696,0.0088213004210025286,0.00881352229824507,0.0088057578799308183,0.0087980071298726509,0.0087902700120107407,0.008782546490411991,0.0087748365292694835,0.0087671400929019202,0.0087594571457530763,0.0087517876523912526,0.0087441315775087305,0.0087364888859212328,0.008728859542567375,0.0087212435125081419,0.0087136407609263462,0.0087060512531261028,0.0086984749545322929,0.0086909118306900505,0.0086833618472642298,0.0086758249700388933,0.0086683011649167866,0.0086607903979188366,0.0086532926351836261,0.0086458078429668943,0.0086383359876410284,0.0086308770356945536,0.0086234309537316471,0.0086159977084716254,0.0086085772667484507,0.0086011695955102441,0.0085937746618187927,0.0085863924328490535,0.0085790228758886831,0.0085716659583375387,0.0085643216477072053,0.0085569899116205196,0.0085496707178110889,0.0085423640341228176,0.0085350698285094444,0.0085277880690340629,0.0085205187238686642,0.0085132617612936647,0.008506017149697457,0.0084987848575759362,0.0084915648535320576,0.0084843571062753701,0.0084771615846215703,0.0084699782574920533,0.0084628070939134666,0.008455648063017256,0.0084485011340392335,0.0084413662763191295,0.0084342434593001614,0.0084271326525285854,0.0084200338256532805,0.0084129469484252959,0.0084058719906974361,0.0083988089224238324,0.0083917577136595062,0.0083847183345599641,0.0083776907553807563,0.0083706749464770736,0.008363670878303326,0.0083566785214127231,0.0083496978464568643,0.0083427288241853369,0.0083357714254452923,0.0083288256211810491,0.0083218913824336868,0.0083149686803406404,0.008308057486135308,0.0083011577711466448,0.0082942695067987661,0.0082873926646105569,0.008280527216195278,0.0082736731332601794,0.008266830387606101,0.0082599989511270983,0.0082531787958100462,0.0082463698937342653,0.0082395722170711377,0.0082327857380837255,0.0082260104291263982,0.0082192462626444526,0.0082124932111737395,0.0082057512473402983,0.00819902034385998,0.0081923004735380833,0.008185591609268985,0.0081788937240357788,0.00817220679090991,0.0081655307830508159,0.00815886567370557,0.0081522114362085184,0.0081455680439809254,0.0081389354705306265,0.0081323136894516663,0.0081257026744239562,0.008119102399212921,0.0081125128376691533,0.0081059339637280688,0.0080993657514095586,0.0080928081748176551,0.0080862612081401882,0.0080797248256484402,0.0080731990016968177,0.0080666837107225119,0.0080601789272451672,0.0080536846258665428,0.0080472007812701953,0.0080407273682211317,0.0080342643615654973,0.0080278117362302427,0.0080213694672228008,0.0080149375296307661,0.008008515898621572,0.0080021045494421648,0.0079957034574187017,0.0079893125979562177,0.0079829319465383203,0.0079765614787268707,0.0079702011701616778,0.0079638509965601813,0.0079575109337171462,0.0079511809575043575,0.0079448610438703042,0.007938551168839892,0.0079322513085141183,0.0079259614390697914,0.0079196815367592165,0.0079134115779099026,0.0079071515389242605,0.0079009013962793168,0.0078946611265264029,0.0078884307062908783,0.0078822101122718313,0.0078759993212417865,0.0078697983100464199,0.0078636070556042641,0.0078574255349064363,0.0078512537250163376,0.0078450916030693776,0.0078389391462726898,0.0078327963319048555,0.0078266631373156096,0.0078205395399255848,0.0078144255172260136,0.0078083210467784648,0.0078022261062145604,0.0077961406732357137,0.0077900647256128486,0.0077839982411861278,0.0077779411978646917,0.0077718935736263801,0.0077658553465174765,0.0077598264946524336,0.0077538069962136092,0.0077477968294510117,0.0077417959726820244,0.0077358044042911593,0.0077298221027297899,0.007723849046515888,0.0077178852142337799,0.0077119305845338749,0.007705985136132425,0.007700048847811264,0.0076941216984175512,0.0076882036668635308,0.0076822947321262694,0.007676394873247421,0.0076705040693329637,0.0076646222995529686,0.007658749543141343,0.0076528857793955879,0.0076470309876765612,0.0076411851474082271,0.0076353482380774208,0.0076295202392336076,0.0076237011304886408,0.0076178908915165286,0.0076120895020531923,0.0076062969418962366,0.0076005131909047128,0.0075947382289988782,0.0075889720361599789,0.0075832145924300031,0.0075774658779114617,0.0075717258727671533,0.0075659945572199355,0.0075602719115525057,0.0075545579161071614,0.007548852551285591,0.0075431557975486341,0.0075374676354160721,0.0075317880454663973,0.0075261170083365941,0.0075204545047219216,0.0075148005153756895,0.0075091550211090451,0.0075035180027907562,0.0074978894413469865,0.0074922693177610937,0.0074866576130734035,0.0074810543083810048,0.0074754593848375336,0.0074698728236529581,0.0074642946060933801,0.0074587247134808099,0.0074531631271929711,0.0074476098286630869,0.0074420647993796709,0.0074365280208863321,0.007430999474781555,0.0074254791427185076,0.007419967006404838,0.0074144630476024606,0.0074089672481273726,0.0074034795898494351,0.0073980000546921918,0.0073925286246326544,0.0073870652817011172,0.0073816100079809556,0.0073761627856084259,0.0073707235967724804,0.0073652924237145624,0.0073598692487284196,0.0073544540541599151,0.0073490468224068212,0.0073436475359186472,0.0073382561771964351,0.0073328727287925791,0.0073274971733106355,0.0073221294934051285,0.0073167696717813761,0.0073114176911952926,0.0073060735344532115,0.0073007371844116993,0.0072954086239773678,0.0072900878361066993,0.0072847748038058577,0.0072794695101305144,0.0072741719381856588,0.0072688820711254301,0.0072635998921529322,0.0072583253845200542,0.0072530585315273011,0.007247799316523606,0.0072425477229061666,0.0072373037341202659,0.0072320673336590926,0.0072268385050635771,0.007221617231922212,0.0072164034978708857,0.0072111972865927087,0.0072059985818178404,0.0072008073673233289,0.0071956236269329283,0.0071904473445169453,0.007185278503992064,0.0071801170893211761,0.0071749630845132266,0.0071698164736230348,0.0071646772407511399,0.0071595453700436362,0.0071544208456920007,0.0071493036519329478,0.0071441937730482479,0.0071390911933645849,0.0071339958972533798,0.0071289078691306445,0.0071238270934568162,0.0071187535547365972,0.0071136872375188046,0.0071086281263962039,0.0071035762060053641,0.007098531461026493,0.007093493876183285,0.0070884634362427699,0.007083440126015153,0.0070784239303536703,0.0070734148341544331,0.0070684128223562678,0.007063417879940582,0.0070584299919311966,0.0070534491433942104,0.0070484753194378436,0.0070435085052122873,0.0070385486859095639,0.0070335958467633705,0.0070286499730489432,0.0070237110500828964,0.0070187790632230945,0.0070138539978684966,0.0070089358394590101,0.0070040245734753585,0.0069991201854389257,0.0069942226609116236,0.0069893319854957472,0.0069844481448338297,0.0069795711246085088,0.0069747009105423788,0.0069698374883978608,0.0069649808439770566,0.0069601309631216112,0.0069552878317125809,0.0069504514356702879,0.0069456217609541893,0.0069407987935627448,0.00693598251953327,0.0069311729249418126,0.006926369995903011,0.0069215737185699669,0.0069167840791341095,0.0069120010638250573,0.0069072246589104982,0.0069024548506960437,0.0068976916255251144,0.0068929349697787919,0.0068881848698757039,0.0068834413122718886,0.0068787042834606623,0.0068739737699725018,0.0068692497583749011,0.0068645322352722622,0.0068598211873057572,0.0068551166011531998,0.006850418463528931,0.0068457267611836828,0.006841041480904462,0.0068363626095144228,0.0068316901338727372,0.0068270240408744871,0.0068223643174505234,0.0068177109505673586,0.0068130639272270411,0.0068084232344670275,0.0068037888593600725,0.0067991607890141,0.0067945390105720914,0.006789923511211958,0.0067853142781464301,0.0067807112986229363,0.0067761145599234832,0.0067715240493645421,0.0067669397542969283,0.0067623616621056903,0.0067577897602099906,0.0067532240360629889,0.0067486644771517319,0.0067441110709970335,0.0067395638051533672,0.0067350226672087486,0.0067304876447846209,0.0067259587255357484,0.0067214358971500977,0.0067169191473487322,0.0067124084638856968,0.0067079038345479068,0.0067034052471550438,0.006698912689559436,0.0066944261496459595,0.0066899456153319235,0.0066854710745669578,0.0066810025153329171,0.0066765399256437591,0.0066720832935454498,0.0066676326071158452,0.0066631878544645955,0.0066587490237330366,0.0066543161030940745,0.0066498890807520968,0.0066454679449428544,0.0066410526839333645,0.0066366432860218063,0.0066322397395374129,0.0066278420328403764,0.0066234501543217346,0.0066190640924032795,0.0066146838355374505,0.0066103093722072303,0.0066059406909260519,0.0066015777802376878,0.0065972206287161599,0.0065928692249656341,0.0065885235576203204,0.0065841836153443783,0.0065798493868318127,0.0065755208608063807,0.00657119802602149,0.0065668808712601038,0.006562569385334646,0.0065582635570868974,0.006553963375387906,0.0065496688291378875,0.0065453799072661325,0.0065410965987309118,0.0065368188925193742,0.0065325467776474657,0.0065282802431598196,0.0065240192781296754,0.0065197638716587829,0.0065155140128773008,0.0065112696909437181,0.006507030895044748,0.0065027976143952467,0.0064985698382381196,0.0064943475558442206,0.0064901307565122784,0.00648591942956879,0.0064817135643679405,0.0064775131502915117,0.0064733181767487871,0.0064691286331764724,0.0064649445090385971,0.0064607657938264354,0.0064565924770584072,0.0064524245482800039,0.0064482619970636897,0.0064441048130088191,0.0064399529857415523,0.0064358065049147642,0.0064316653602079638,0.006427529541327204,0.0064233990380049974,0.0064192738400002357,0.0064151539370980943,0.0064110393191099636,0.0064069299758733513,0.0064028258972518032,0.0063987270731348253,0.0063946334934377909,0.0063905451481018668,0.0063864620270939259,0.0063823841204064639,0.0063783114180575255,0.0063742439100906113,0.0063701815865746091,0.0063661244376036997,0.0063620724532972911,0.0063580256237999256,0.0063539839392812054,0.0063499473899357155,0.0063459159659829383,0.0063418896576671793,0.0063378684552574879,0.0063338523490475748,0.0063298413293557424,0.0063258353865247958,0.006321834510921975,0.0063178386929388739,0.0063138479229913613,0.006309862191519508,0.0063058814889875086,0.0063019058058836038,0.0062979351327200122,0.0062939694600328408,0.0062900087783820261,0.0062860530783512454,0.0062821023505478515,0.0062781565856027946,0.0062742157741705459,0.0062702799069290303,0.0062663489745795461,0.0062624229678466961,0.0062585018774783127,0.006254585694245386,0.0062506744089419934,0.0062467680123852202,0.0062428664954150975,0.0062389698488945237,0.0062350780637091948,0.0062311911307675379,0.0062273090410006303,0.0062234317853621405,0.0062195593548282496,0.0062156917403975841,0.0062118289330911486,0.0062079709239522508,0.0062041177040464404,0.0062002692644614272,0.0061964255963070291,0.0061925866907150901,0.0061887525388394154,0.0061849231318557114,0.0061810984609615045,0.006177278517376086,0.0061734632923404354,0.0061696527771171608,0.0061658469629904287,0.006162045841265896,0.0061582494032706488,0.0061544576403531294,0.0061506705438830779,0.0061468881052514635,0.006143110315870416,0.0061393371671731676,0.0061355686506139812,0.0061318047576680908,0.0061280454798316383,0.0061242908086216004,0.0061205407355757373,0.0061167952522525196,0.0061130543502310687,0.0061093180211110962,0.0061055862565128323,0.0061018590480769758,0.0060981363874646199,0.0060944182663571966,0.0060907046764564149,0.0060869956094841936,0.0060832910571826087,0.0060795910113138202,0.006075895463660024,0.006072204406023381,0.0060685178302259616,0.0060648357281096856,0.0060611580915362565,0.0060574849123871096,0.0060538161825633438,0.0060501518939856712,0.0060464920385943513,0.0060428366083491308,0.0060391855952291913,0.0060355389912330843,0.0060318967883786767,0.0060282589787030924,0.0060246255542626484,0.0060209965071328078,0.0060173718294081104,0.0060137515132021244,0.006010135550647386,0.0060065239338953384,0.0060029166551162838,0.0059993137064993174,0.0059957150802522783,0.0059921207686016885,0.0059885307637926998,0.0059849450580890381,0.0059813636437729438,0.0059777865131451224,0.0059742136585246844,0.0059706450722490931,0.005967080746674111,0.0059635206741737385,0.0059599648471401695,0.0059564132579837271,0.0059528658991328176,0.0059493227630338739,0.0059457838421512988,0.0059422491289674167,0.0059387186159824161,0.0059351922957143,0.0059316701606988327,0.0059281522034894804,0.0059246384166573721,0.0059211287927912323,0.0059176233244973399,0.0059141220043994729,0.0059106248251388528,0.0059071317793741003,0.0059036428597811774,0.0059001580590533403,0.0058966773699010849,0.0058932007850521001,0.005889728297251217,0.0058862598992603507,0.0058827955838584613,0.0058793353438414946,0.0058758791720223387,0.0058724270612307708,0.0058689790043134063,0.0058655349941336534,0.0058620950235716606,0.0058586590855242695,0.0058552271729049657,0.0058517992786438272,0.0058483753956874831,0.0058449555169990544,0.0058415396355581163,0.0058381277443606437,0.0058347198364189657,0.0058313159047617179,0.0058279159424337937,0.0058245199424962982,0.0058211278980264992,0.0058177398021177825,0.005814355647879607,0.0058109754284374482,0.0058075991369327638,0.0058042267665229397,0.0058008583103812466,0.0057974937616967941,0.0057941331136744812,0.0057907763595349574,0.0057874234925145689,0.0057840745058653211,0.0057807293928548277,0.0057773881467662654,0.0057740507608983376,0.0057707172285652144,0.0057673875430965032,0.0057640616978371952,0.0057607396861476222,0.0057574215014034175,0.0057541071369954623,0.0057507965863298526,0.0057474898428278489,0.0057441868999258319,0.0057408877510752663,0.0057375923897426467,0.0057343008094094643,0.0057310130035721583,0.0057277289657420745,0.0057244486894454261,0.0057211721682232418,0.0057178993956313352,0.005714630365240253,0.0057113650706352385,0.0057081035054161889,0.0057048456631976097,0.005701591537608579,0.0056983411222926985,0.0056950944109080606,0.0056918513971272013,0.0056886120746370596,0.0056853764371389394,0.005682144478348466,0.0056789161919955471,0.005675691571824331,0.0056724706115931648,0.0056692533050745611,0.0056660396460551463,0.005662829628335633,0.0056596232457307698,0.0056564204920693086,0.0056532213611939618,0.0056500258469613625,0.0056468339432420274,0.0056436456439203156,0.0056404609428943901,0.0056372798340761816,0.0056341023113913417,0.0056309283687792158,0.0056277580001927938,0.0056245911995986787,0.0056214279609770471,0.0056182682783216054,0.0056151121456395623,0.00561195955695158,0.0056088105062917434,0.0056056649877075215,0.0056025229952597266,0.005599384523022481,0.0055962495650831766,0.0055931181155424404,0.0055899901685140946,0.0055868657181251226,0.0055837447585156312,0.0055806272838388113,0.0055775132882609074,0.0055744027659611747,0.0055712957111318457,0.0055681921179780974,0.005565091980718008,0.0055619952935825273,0.005558902050815437,0.0055558122466733192,0.0055527258754255165,0.0055496429313540959,0.0055465634087538225,0.0055434873019321101,0.0055404146052089988,0.005537345312917114,0.0055342794194016311,0.0055312169190202456,0.0055281578061431294,0.005525102075152907,0.0055220497204446157,0.0055190007364256683,0.0055159551175158273,0.0055129128581471601,0.0055098739527640181,0.0055068383958229881,0.0055038061817928715,0.0055007773051546447,0.0054977517604014236,0.005494729542038437,0.0054917106445829854,0.0054886950625644146,0.005485682790524078,0.0054826738230153065,0.0054796681546033735,0.0054766657798654651,0.0054736666933906438,0.0054706708897798197,0.0054676783636457144,0.0054646891096128318,0.0054617031223174253,0.0054587203964074626,0.0054557409265426002,0.0054527647073941438,0.0054497917336450222,0.0054468219999897535,0.0054438555011344144,0.0054408922317966063,0.0054379321867054266,0.0054349753606014392,0.0054320217482366371,0.0054290713443744167,0.0054261241437895446,0.0054231801412681279,0.0054202393316075846,0.0054173017096166062,0.0054143672701151384,0.0054114360079343393,0.0054085079179165569,0.0054055829949152976,0.0054026612337951894,0.0053997426294319631,0.0053968271767124111,0.0053939148705343665,0.0053910057058066691,0.0053880996774491336,0.0053851967803925259,0.0053822970095785266,0.0053794003599597091,0.0053765068264995056,0.005373616404172177,0.0053707290879627893,0.0053678448728671762,0.0053649637538919189,0.0053620857260543121,0.0053592107843823357,0.0053563389239146292,0.0053534701397004586,0.0053506044267996921,0.0053477417802827686,0.0053448821952306715,0.0053420256667349002,0.0053391721898974412,0.0053363217598307406,0.0053334743716576755,0.0053306300205115285,0.0053277887015359569,0.0053249504098849664,0.0053221151407228853,0.0053192828892243329,0.0053164536505741957,0.0053136274199676011,0.0053108041926098835,0.0053079839637165671,0.0053051667285133287,0.0053023524822359792,0.0052995412201304309,0.0052967329374526738,0.00529392762946875,0.0052911252914547204,0.0052883259186966482,0.0052855295064905645,0.0052827360501424446,0.0052799455449681829,0.0052771579862935653,0.0052743733694542447,0.0052715916897957092,0.005268812942673267,0.0052660371234520102,0.0052632642275067948,0.0052604942502222111,0.0052577271869925632,0.005254963033221839,0.0052522017843236865,0.0052494434357213881,0.0052466879828478368,0.0052439354211455064,0.0052411857460664341,0.0052384389530721878,0.0052356950376338451,0.0052329539952319683,0.0052302158213565772,0.0052274805115071297,0.005224748061192489,0.005222018465930906,0.0052192917212499938,0.0052165678226866975,0.0052138467657872785,0.0052111285461072842,0.0052084131592115236,0.0052057006006740502,0.0052029908660781261,0.0052002839510162111,0.0051975798510899276,0.0051948785619100445,0.005192180079096451,0.0051894843982781278,0.0051867915150931353,0.0051841014251885779,0.0051814141242205857,0.0051787296078542955,0.0051760478717638178,0.0051733689116322222,0.0051706927231515085,0.0051680193020225886,0.0051653486439552582,0.005162680744668178,0.0051600155998888491,0.0051573532053535908,0.005154693556807516,0.0051520366500045116,0.0051493824807072137,0.0051467310446869858,0.0051440823377238952,0.0051414363556066935,0.0051387930941327901,0.0051361525491082352,0.0051335147163476926,0.00513087959167442,0.0051282471709202465,0.0051256174499255515,0.0051229904245392406,0.0051203660906187281,0.0051177444440299079,0.0051151254806471418,0.0051125091963532257,0.0051098955870393804,0.0051072846486052226,0.0051046763769587418,0.0051020707680162879,0.0050994678177025392,0.0050968675219504904,0.0050942698767014235,0.005091674877904892,0.0050890825215187006,0.0050864928035088764,0.0050839057198496605,0.0050813212665234732,0.0050787394395209046,0.0050761602348406883,0.0050735836484896799,0.0050710096764828416,0.0050684383148432155,0.005065869559601908,0.0050633034067980656,0.0050607398524788565,0.0050581788926994525,0.005055620523523003,0.0050530647410206193,0.0050505115412713556,0.0050479609203621838,0.0050454128743879769,0.0050428673994514896,0.0050403244916633382,0.0050377841471419757,0.0050352463620136822,0.0050327111324125371,0.0050301784544803984,0.0050276483243668927,0.0050251207382293831,0.0050225956922329605,0.00502007318255042,0.0050175532053622369,0.0050150357568565567,0.0050125208332291683]}

},{}],50:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var incrspace = require( '@stdlib/math/utils/incrspace' );
var isnan = require( '@stdlib/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var trigamma = require( './../lib' );


// FIXTURES //

var positive = require( './fixtures/cpp/positive.json' );
var negative = require( './fixtures/cpp/negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof trigamma, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided a `NaN`, the function returns `NaN` ', function test( t ) {
	var val = trigamma( NaN );
	t.strictEqual( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `0`, the function returns `NaN` ', function test( t ) {
	var val = trigamma( 0.0 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided positive infinity, the function returns `0` ', function test( t ) {
	var val = trigamma( PINF );
	t.strictEqual( val, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided negative infinity, the function returns `NaN` ', function test( t ) {
	var val = trigamma( NINF );
	t.strictEqual( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative integer, the function returns `NaN`', function test( t ) {
	var values;
	var val;
	var i;

	values = incrspace( -1.0, -100.0, -1.0 );
	for ( i = 0; i < values.length; i++ ) {
		val = trigamma( values[ i ] );
		t.strictEqual( isnan( val ), true, 'returns NaN' );
	}
	t.end();
});

tape( 'the function evaluates the trigamma function for positive numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = positive.x;
	expected = positive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = trigamma( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the trigamma function for negative numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = negative.x;
	expected = negative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = trigamma( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});


}).call(this,"/lib/node_modules/@stdlib/math/base/special/trigamma/test/test.js")
},{"./../lib":46,"./fixtures/cpp/negative.json":48,"./fixtures/cpp/positive.json":49,"@stdlib/assert/is-nan":7,"@stdlib/math/base/special/abs":21,"@stdlib/math/constants/float64-eps":73,"@stdlib/math/constants/float64-ninf":79,"@stdlib/math/constants/float64-pinf":82,"@stdlib/math/utils/incrspace":86,"tape":152}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"./evalpoly.js":51}],53:[function(require,module,exports){
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

},{"./evalpoly.js":51,"./factory.js":52,"@stdlib/utils/define-read-only-property":88}],54:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/tools/rational.hpp}.
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

var abs = require( '@stdlib/math/base/special/abs' );


// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\). Coefficients should be sorted in ascending degree.
*
* #### Notes
*
* * The implementation uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} P - numerator polynomial coefficients sorted in ascending degree
* @param {NumericAray} Q - denominator polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*
* @example
* var P = [ -6.0, -5.0 ];
* var Q = [ 3.0, 0.5 ];
*
* var v = evalrational( P, Q, 6.0 ); //  => ( -6*6^0 - 5*6^1 ) / ( 3*6^0 + 0.5*6^1 ) = (-6-30)/(3+3)
* // returns -6.0
*
* @example
* // 2x^3 + 4x^2 - 5x^1 - 6x^0 => degree 4
* var P = [ -6.0, -5.0, 4.0, 2.0 ];
*
* // 0.5x^1 + 3x^0 => degree 2
* var Q = [ 3.0, 0.5, 0.0, 0.0 ]; // zero-padded
*
* var v = evalrational( P, Q, 6.0 ); // => ( -6*6^0 - 5*6^1 + 4*6^2 + 2*6^3 ) / ( 3*6^0 + 0.5*6^1 + 0*6^2 + 0*6^3 ) = (-6-30+144+432)/(3+3)
* // returns 90.0
*/
function evalrational( P, Q, x ) {
	var len;
	var s1;
	var s2;
	var i;

	len = P.length;
	if ( len === 0 ) {
		return NaN;
	}
	if ( len !== Q.length ) {
		return NaN;
	}
	if ( x === 0.0 || len === 1 ) {
		return P[ 0 ] / Q[ 0 ];
	}
	// Use Horner's method...
	if ( abs( x ) <= 1.0 ) {
		s1 = P[ len-1 ];
		s2 = Q[ len-1 ];
		for ( i = len-2; i >= 0; --i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	} else {
		x = 1.0 / x; // use inverse to avoid overflow
		s1 = P[ 0 ];
		s2 = Q[ 0 ];
		for( i = 1; i < len; ++i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	}
	return s1 / s2;
} // end FUNCTION evalrational()


// EXPORTS //

module.exports = evalrational;

},{"@stdlib/math/base/special/abs":21}],55:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( './evalrational.js' );


// MAIN //

/**
* Generates a function for evaluating a rational function.
*
* #### Notes
*
* * The compiled function uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} P - numerator polynomial coefficients sorted in ascending degree
* @param {NumericArray} Q - denominator polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a rational function
*
* @example
* var P = [ 20.0, 8.0, 3.0 ];
* var Q = [ 10.0, 9.0, 1.0 ];
*
* var rational = evalrational.factory( P, Q );
*
* var v = rational( 10.0 ); // => (20*10^0 + 8*10^1 + 3*10^2) / (10*10^0 + 9*10^1 + 1*10^2) = (20+80+300)/(10+90+100)
* // returns 2.0
*
* v = rational( 2.0 ); // => (20*2^0 + 8*2^1 + 3*2^2) / (10*2^0 + 9*2^1 + 1*2^2) = (20+16+12)/(10+18+4)
* // returns 1.5
*/
function factory( P, Q ) {
	var f;
	var r;
	var n;
	var m;
	var i;

	// Avoid exceeding maximum stack size on V8 :(. Note that the value of `500` was empirically determined...
	if ( P.length > 500 ) {
		return rational;
	}
	// Code generation. Start with the function definition...
	f = 'return function evalrational(x){';

	// Create the function body...
	n = P.length;

	// Declare variables...
	f += 'var ax,s1,s2;';

	// If no coefficients, the function always returns NaN...
	if ( n === 0 ) {
		f += 'return NaN;';
	}
	// If P and Q have different lengths, the function always returns NaN...
	else if ( n !== Q.length ) {
		f += 'return NaN;';
	}
	// If P and Q have only one coefficient, the function always returns the ratio of the first coefficients...
	else if ( n === 1 ) {
		r = P[ 0 ] / Q[ 0 ];
		f += 'return ' + r + ';';
	}
	// If more than one coefficient, apply Horner's method to both the numerator and denominator...
	else {
		// If `x == 0`, return the ratio of the first coefficients...
		r = P[ 0 ] / Q[ 0 ];
		f += 'if(x===0.0){return ' + r + ';}';

		// Compute the absolute value of `x`...
		f += 'if(x<0.0){ax=-x;}else{ax=x;}';

		// If `abs(x) <= 1`, evaluate the numerator and denominator of the rational function using Horner's method...
		f += 'if(ax<=1.0){';
		f += 's1 = ' + P[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += P[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
		f += 's2 = ' + Q[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += Q[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the if statement...
		f += '}else{';

		// If `abs(x) > 1`, evaluate the numerator and denominator via the inverse to avoid overflow...
		f += 'x = 1.0/x;';
		m = n - 1;
		f += 's1 = ' + P[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += P[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		m = n - 1;
		f += 's2 = ' + Q[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += Q[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the else statement...
		f += '}';

		// Return the ratio of the two sums...
		f += 'return s1/s2;';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalrational.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )(); // eslint-disable-line no-new-func

	/*
	* returns
	*	function evalrational( x ) {
	*		var ax, s1, s2;
	*		if ( x === 0.0 ) {
	*			return P[0] / Q[0];
	*		}
	*		if ( x < 0.0 ) {
	*			ax = -x;
	*		} else {
	*			ax = x;
	*		}
	*		if ( ax <= 1.0 ) {
	*			s1 = P[0]+x*(P[1]+x*(P[2]+x*(P[3]+...+x*(P[n-2]+x*P[n-1]))));
	*			s2 = Q[0]+x*(Q[1]+x*(Q[2]+x*(Q[3]+...+x*(Q[n-2]+x*Q[n-1]))));
	*		} else {
	*			x = 1.0/x;
	*			s1 = P[n-1]+x*(P[n-2]+x*(P[n-3]+x*(P[n-4]+...+x*(P[1]+x*P[0]))));
	*			s2 = Q[n-1]+x*(Q[n-2]+x*(Q[n-3]+x*(Q[n-4]+...+x*(Q[1]+x*Q[0]))));
	*		}
	*		return s1 / s2;
	*	}
	*/

	/**
	* Evaluates a rational function.
	*
	* @private
	* @param {number} x - value at which to evaluate a rational function
	* @returns {number} evaluated rational function
	*/
	function rational( x ) {
		return evalrational( P, Q, x );
	} // end FUNCTION rational()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./evalrational.js":54}],56:[function(require,module,exports){
'use strict';

/**
* Evaluate a rational function.
*
* @module @stdlib/math/base/tools/evalrational
*
* @example
* var evalrational = require( '@stdlib/math/base/tools/evalrational' );
*
* // 2x^3 + 4x^2 - 5x^1 - 6x^0 => degree 4
* var P = [ -6.0, -5.0, 4.0, 2.0 ];
*
* // 0.5x^1 + 3x^0 => degree 2
* var Q = [ 3.0, 0.5, 0.0, 0.0 ]; // zero-padded
*
* var v = evalrational( P, Q, 6.0 ); // => ( -6*6^0 - 5*6^1 + 4*6^2 + 2*6^3 ) / ( 3*6^0 + 0.5*6^1 + 0*6^2 + 0*6^3 ) = (-6-30+144+432)/(3+3)
* // returns 90.0
*
* @example
* var evalrational = require( '@stdlib/math/base/tools/evalrational' );
*
* var P = [ 20.0, 8.0, 3.0 ];
* var Q = [ 10.0, 9.0, 1.0 ];
*
* var rational = evalrational.factory( P, Q );
*
* var v = rational( 10.0 ); // => (20*10^0 + 8*10^1 + 3*10^2) / (10*10^0 + 9*10^1 + 1*10^2) = (20+80+300)/(10+90+100)
* // returns 2.0
*
* v = rational( 2.0 ); // => (20*2^0 + 8*2^1 + 3*2^2) / (10*2^0 + 9*2^1 + 1*2^2) = (20+16+12)/(10+18+4)
* // returns 1.5
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var evalrational = require( './evalrational.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalrational, 'factory', factory );


// EXPORTS //

module.exports = evalrational;

},{"./evalrational.js":54,"./factory.js":55,"@stdlib/utils/define-read-only-property":88}],57:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/constants/float64-exponent-bias":74,"@stdlib/math/constants/float64-high-word-exponent-mask":75}],58:[function(require,module,exports){
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

},{"./exponent.js":57}],59:[function(require,module,exports){
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

},{"./indices.js":61}],60:[function(require,module,exports){
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

},{"./from_words.js":59}],61:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],62:[function(require,module,exports){
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

},{"./high.js":63}],63:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],64:[function(require,module,exports){
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

},{"./get_high_word.js":62}],65:[function(require,module,exports){
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

},{"./low.js":67}],66:[function(require,module,exports){
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

},{"./get_low_word.js":65}],67:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],68:[function(require,module,exports){
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

},{"./normalize.js":69}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":16,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/abs":21,"@stdlib/math/constants/float64-smallest-normal":83}],70:[function(require,module,exports){
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

},{"./to_words.js":72}],71:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":61}],72:[function(require,module,exports){
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

},{"./indices.js":71}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
'use strict';

/**
* Square of the mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-pi-squared
* @type {number}
*
* @example
* var PI_SQUARED = require( '@stdlib/math/constants/float64-pi-squared' );
* // returns 9.869604401089358
*/


// MAIN //

/**
* Square of the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 9.869604401089358
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI_SQUARED = 9.86960440108935861883449099987615113531369940724079062641334937622004482241920524300177340371855223182402591377; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI_SQUARED;

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{"@stdlib/assert/is-number":11,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/ceil":23,"@stdlib/math/constants/uint32-max":84}],86:[function(require,module,exports){
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

},{"./incrspace.js":85}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{"./define_read_only_property.js":87}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{"./detect_symbol_support.js":89}],91:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":90}],92:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":91}],93:[function(require,module,exports){
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

},{"./native_class.js":94,"./polyfill.js":95,"@stdlib/utils/detect-tostringtag-support":92}],94:[function(require,module,exports){
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

},{"./tostring.js":96}],95:[function(require,module,exports){
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

},{"./tostring.js":96,"./tostringtag.js":97,"@stdlib/assert/has-own-property":2}],96:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],97:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){

},{}],100:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"dup":99}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{"base64-js":98,"ieee754":121}],103:[function(require,module,exports){
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
},{"../../is-buffer/index.js":123}],104:[function(require,module,exports){
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

},{"./lib/is_arguments.js":105,"./lib/keys.js":106}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],107:[function(require,module,exports){
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

},{"foreach":117,"object-keys":126}],108:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],109:[function(require,module,exports){
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

},{"./helpers/isFinite":110,"./helpers/isNaN":111,"./helpers/mod":112,"./helpers/sign":113,"es-to-primitive/es5":114,"has":120,"is-callable":124}],110:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],111:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],112:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],113:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],114:[function(require,module,exports){
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

},{"./helpers/isPrimitive":115,"is-callable":124}],115:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){

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


},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":118}],120:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":119}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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
},{"_process":101}],129:[function(require,module,exports){
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
},{"_process":101}],130:[function(require,module,exports){
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
},{"./_stream_readable":133,"./_stream_writable":135,"core-util-is":103,"inherits":122,"process-nextick-args":129}],132:[function(require,module,exports){
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
},{"./_stream_transform":134,"core-util-is":103,"inherits":122}],133:[function(require,module,exports){
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
},{"./_stream_duplex":131,"./internal/streams/BufferList":136,"./internal/streams/destroy":137,"./internal/streams/stream":138,"_process":101,"core-util-is":103,"events":116,"inherits":122,"isarray":139,"process-nextick-args":129,"safe-buffer":146,"string_decoder/":140,"util":99}],134:[function(require,module,exports){
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
},{"./_stream_duplex":131,"core-util-is":103,"inherits":122}],135:[function(require,module,exports){
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
},{"./_stream_duplex":131,"./internal/streams/destroy":137,"./internal/streams/stream":138,"_process":101,"core-util-is":103,"inherits":122,"process-nextick-args":129,"safe-buffer":146,"util-deprecate":158}],136:[function(require,module,exports){
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
},{"safe-buffer":146}],137:[function(require,module,exports){
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

},{"events":116}],139:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],140:[function(require,module,exports){
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
},{"safe-buffer":146}],141:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":142}],142:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":131,"./lib/_stream_passthrough.js":132,"./lib/_stream_readable.js":133,"./lib/_stream_transform.js":134,"./lib/_stream_writable.js":135}],143:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":142}],144:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":135}],145:[function(require,module,exports){
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
},{"_process":101,"through":157}],146:[function(require,module,exports){
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

},{"buffer":102}],147:[function(require,module,exports){
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

},{"events":116,"inherits":122,"readable-stream/duplex.js":130,"readable-stream/passthrough.js":141,"readable-stream/readable.js":142,"readable-stream/transform.js":143,"readable-stream/writable.js":144}],148:[function(require,module,exports){
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

},{"es-abstract/es5":109,"function-bind":119}],149:[function(require,module,exports){
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

},{"./implementation":148,"./polyfill":150,"./shim":151,"define-properties":107,"function-bind":119}],150:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":148}],151:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":150,"define-properties":107}],152:[function(require,module,exports){
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
},{"./lib/default_stream":153,"./lib/results":155,"./lib/test":156,"_process":101,"defined":108,"through":157}],153:[function(require,module,exports){
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
},{"_process":101,"fs":100,"through":157}],154:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":101}],155:[function(require,module,exports){
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
},{"_process":101,"events":116,"function-bind":119,"has":120,"inherits":122,"object-inspect":125,"resumer":145,"through":157}],156:[function(require,module,exports){
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
},{"./next_tick":154,"deep-equal":104,"defined":108,"events":116,"has":120,"inherits":122,"path":128,"string.prototype.trim":149}],157:[function(require,module,exports){
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
},{"_process":101,"stream":147}],158:[function(require,module,exports){
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
},{}]},{},[50]);
