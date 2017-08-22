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

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],2:[function(require,module,exports){
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

},{"./is_little_endian.js":3}],3:[function(require,module,exports){
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

},{"./ctors.js":1}],4:[function(require,module,exports){
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

},{"./is_even.js":5}],5:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":8}],6:[function(require,module,exports){
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

},{"./is_infinite.js":7}],7:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],8:[function(require,module,exports){
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

},{"./is_integer.js":9}],9:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":80}],10:[function(require,module,exports){
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

},{"./is_nan.js":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./is_negative_zero.js":13}],13:[function(require,module,exports){
'use strict';

// MODULES //

var NINF = require( '@stdlib/math/constants/float64-ninf' );


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
} // end FUNCTION isNegativeZero()


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/math/constants/float64-ninf":210}],14:[function(require,module,exports){
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

},{"./is_odd.js":15}],15:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":4}],16:[function(require,module,exports){
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

},{"./is_positive_zero.js":17}],17:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );


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
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/math/constants/float64-pinf":212}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./abs.js":18}],20:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}.
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
var asin = require( '@stdlib/math/base/special/asin' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/math/constants/float64-fourth-pi' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.


// MAIN //

/**
* Computes the arccosine of a number.
*
* @param {number} x - input value
* @returns {number} arccosine (in radians)
*
* @example
* var v = acos( 1.0 );
* // returns 0.0
*
* @example
* var v = acos( 0.707 ); // ~pi/4
* // returns ~0.7855
*
* @example
* var v = acos( NaN );
* // returns NaN
*/
function acos( x ) {
	var z;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x < -1.0 || x > 1.0 ) {
		return NaN;
	}
	if ( x > 0.5 ) {
		return 2.0 * asin( sqrt( 0.5 - (0.5*x) ) );
	}
	z = PIO4 - asin( x );
	z += MOREBITS;
	z += PIO4;
	return z;
} // end FUNCTION acos()


// EXPORTS //

module.exports = acos;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/asin":23,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/constants/float64-fourth-pi":197}],21:[function(require,module,exports){
'use strict';

/**
* Compute the arccosine of a number.
*
* @module @stdlib/math/base/special/acos
*
* @example
* var acos = require( '@stdlib/math/base/special/acos' );
*
* var v = acos( 1.0 );
* // returns 0.0
*
* v = acos( 0.707 ); // ~pi/4
* // returns ~0.7855
*
* v = acos( NaN );
* // returns NaN
*/

// MODULES //

var acos = require( './acos.js' );


// EXPORTS //

module.exports = acos;

},{"./acos.js":20}],22:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}.
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

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/math/constants/float64-fourth-pi' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.

/*
* arcsin(x) = x + x^3 P(x^2)/Q(x^2)
* 0 <= x <= 0.625
* Peak relative error = 1.2e-18
*/
var P = [
	-8.198089802484824371615e0,
	1.956261983317594739197e1,
	-1.626247967210700244449e1,
	5.444622390564711410273e0,
	-6.019598008014123785661e-1,
	4.253011369004428248960e-3
];
var Q = [
	-4.918853881490881290097e1,
	1.395105614657485689735e2,
	-1.471791292232726029859e2,
	7.049610280856842141659e1,
	-1.474091372988853791896e1,
	1.0
];

/*
* arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
* 0 <= x <= 0.5
* Peak relative error = 4.2e-18
*/
var R = [
	2.853665548261061424989e1,
	-2.556901049652824852289e1,
	6.968710824104713396794e0,
	-5.634242780008963776856e-1,
	2.967721961301243206100e-3
];
var S = [
	3.424398657913078477438e2,
	-3.838770957603691357202e2,
	1.470656354026814941758e2,
	-2.194779531642920639778e1,
	1.0
];


// FUNCTIONS //

// Compile functions to evaluate rational functions based on the above coefficients...
var ratevalPQ = evalrational( P, Q );
var ratevalRS = evalrational( R, S );


// MAIN //

/**
* Computes the arcsine of a number.
*
* @param {number} x - input value
* @returns {number} arcsine (in radians)
*
* @example
* var v = asin( 0.0 );
* // returns ~0.0
*
* @example
* var v = asin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = asin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = asin( NaN );
* // returns NaN
*/
function asin( x ) {
	var sgn;
	var zz;
	var a;
	var p;
	var z;

	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x > 0.0 ) {
		a = x;
	} else {
		sgn = true;
		a = -x;
	}
	if ( a > 1.0 ) {
		return NaN;
	}
	if ( a > 0.625 ) {
		// arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
		zz = 1.0 - a;
		p = zz * ratevalRS( zz );
		zz = sqrt( zz + zz );
		z = PIO4 - zz;
		zz = ( zz*p ) - MOREBITS;
		z -= zz;
		z += PIO4;
	} else {
		if ( a < 1.0e-8 ) {
			return x;
		}
		zz = a * a;
		z = zz * ratevalPQ( zz );
		z = ( a*z ) + a;
	}
	return ( sgn ) ? -z : z;
} // end FUNCTION asin()


// EXPORTS //

module.exports = asin;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalrational":163,"@stdlib/math/constants/float64-fourth-pi":197}],23:[function(require,module,exports){
'use strict';

/**
* Compute the arcsine of a number.
*
* @module @stdlib/math/base/special/asin
*
* @example
* var PI = require( '@stdlib/math/constants/float64-pi' );
* var asin = require( '@stdlib/math/base/special/asin' );
*
* var v = asin( 0.0 );
* // returns 0.0
*
* v = asin( PI/2.0 );
* // returns ~1.0
*
* v = asin( -PI/6.0 );
* // returns ~-0.5
*
* v = asin( NaN );
* // returns NaN
*/

// MODULES //

var asin = require( './asin.js' );


// EXPORTS //

module.exports = asin;

},{"./asin.js":22}],24:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/beta.hpp}.
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

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var E = require( '@stdlib/math/constants/float64-e' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var G = 10.90051099999999983936049829935654997826;
var NUM = [
	709811.662581657956893540610814842699825,
	679979.847415722640161734319823103390728,
	293136.785721159725251629480984140341656,
	74887.5403291467179935942448101441897121,
	12555.29058241386295096255111537516768137,
	1443.42992444170669746078056942194198252,
	115.2419459613734722083208906727972935065,
	6.30923920573262762719523981992008976989,
	0.2266840463022436475495508977579735223818,
	0.004826466289237661857584712046231435101741,
	0.4624429436045378766270459638520555557321e-4
];
var DENOM = [
	0,
	362880,
	1026576,
	1172700,
	723680,
	269325,
	63273,
	9450,
	870,
	45,
	1
];


// FUNCTIONS //

/**
* Calculate the Lanczos approximation scaled by exp(G).
*
* @private
* @param {number} z - input value
* @returns {number} Lanczos approximation
*/
var lanczosSumExpGScaled = evalrational( NUM, DENOM );


// MAIN //

/**
* Evaluate the beta function.
*
* @param {NonNegativeNumber} a - input value
* @param {NonNegativeNumber} b - input value
* @returns {number} evaluated beta function
*
* @example
* var v = beta( 0, 0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = beta( 1, 1 );
* // returns 1
*
* @example
* var v = beta( -1, 2 );
* // returns NaN
*
* @example
* var v = beta( 5, 0.2 );
* // returns ~3.382
*
* @example
* var v = beta( 4, 1 );
* // returns 0.25
*
* @example
* var v = beta( NaN, 2 );
* // returns NaN
*/
function beta( a, b ) {
	var prefix;
	var ambh;
	var agh;
	var bgh;
	var cgh;
	var res;
	var tmp;
	var c;

	prefix = 1;
	c = a + b;
	if ( isnan( a ) || isnan( b ) ) {
		return NaN;
	}
	if ( a < 0.0 || b < 0.0 ) {
		return NaN;
	}
	if ( b === 1.0 ) {
		return 1.0 / a;
	} else if ( a === 1.0 ) {
		return 1.0 / b;
	} else if ( c < EPSILON ) {
		res = c / a;
		res /= b;
		return res;
	}

	// Special cases:
	if ( c === a && b < EPSILON ) {
		return 1.0 / b;
	} else if ( c === b && a < EPSILON ) {
		return 1.0 / a;
	}

	if ( a < b ) {
		// Swap a and b:
		tmp = b;
		b = a;
		a = tmp;
	}

	// Lanczos calculation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	res = lanczosSumExpGScaled( a ) * ( lanczosSumExpGScaled( b ) /
		lanczosSumExpGScaled( c ) );
	ambh = a - 0.5 - b;
	if ( ( abs( b * ambh ) < ( cgh * 100.0 ) ) && a > 100.0 ) {
		// Special case where the base of the power term is close to 1; compute (1+x)^y instead:
		res *= exp( ambh * log1p( -b / cgh ) );
	} else {
		res *= pow( agh / cgh, a - 0.5 - b );
	}
	if ( cgh > 1e10 ) {
		// This avoids possible overflow, but appears to be marginally less accurate:
		res *= pow( (agh / cgh) * (bgh / cgh), b );
	} else {
		res *= pow( (agh * bgh) / (cgh * cgh), b );
	}
	res *= sqrt( E / bgh);

	// If a and b were originally less than 1 we need to scale the result:
	res *= prefix;
	return res;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalrational":163,"@stdlib/math/constants/float64-e":193,"@stdlib/math/constants/float64-eps":194}],25:[function(require,module,exports){
'use strict';

/**
* Evaluate the beta function.
*
* @module @stdlib/math/base/special/beta
*
* @example
* var beta = require( '@stdlib/math/base/special/beta' );
*
* var v = beta( 0.0, 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = beta( 1.0, 1.0 );
* // returns 1.0
*
* v = beta( -1.0, 2.0 );
* // returns NaN
*
* v = beta( 5.0, 0.2 );
* // returns ~3.382
*
* v = beta( 4.0, 1.0 );
* // returns 0.25
*
* v = beta( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var beta = require( './beta.js' );


// EXPORTS //

module.exports = beta;

},{"./beta.js":24}],26:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
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

var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );
var fullIGammaPrefix = require( './full_igamma_prefix.js' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );


// MAIN //

/**
* This is DiDonato and Morris's BGRAT routine, see Eq's 9 through 9.6.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {NonNegativeInteger} s0 - initial value
* @param {number} mult - initial value
* @param {boolean} normalised - boolean indicating whether to evaluate the regularized or non-regularized incomplete beta function
* @returns {number} function value
*/
function betaSmallBLargeASeries( a, b, x, y, s0, mult, normalised ) {
	var prefix;
	var tmp1;
	var tnp1;
	var sum;
	var b2n;
	var bm1;
	var lx2;
	var lxp;
	var mbn;
	var lx;
	var t4;
	var h;
	var j;
	var m;
	var n;
	var p;
	var r;
	var t;
	var u;

	// Some values we'll need later, these are Eq 9.1:
	bm1 = b - 1.0;
	t = a + ( bm1 / 2.0 );
	if ( y < 0.35 ) {
		lx = log1p( -y );
	} else {
		lx = ln( x );
	}
	u = -t * lx;

	// And from from 9.2:
	h = regularisedGammaPrefix( b, u );
	if ( h <= MIN_VALUE ) {
		return s0;
	}
	if ( normalised ) {
		prefix = h / gammaDeltaRatio( a, b );
		prefix /= pow( t, b );
	} else {
		prefix = fullIGammaPrefix( b, u ) / pow( t, b );
	}
	prefix *= mult;

	// We need the quantity Pn, unfortunately this is computed recursively, and requires a full history of all the previous values so no choice but to declare a big table and hope it's big enough...
	p = new Array( 30 );
	p[ 0 ] = 1;  // see 9.3.

	// Now an initial value for J, see 9.6: gammainc( u, b, regularized, upper )
	j = gammainc( u, b, true, true );
	j /= h;

	// Now we can start to pull things together and evaluate the sum in Eq 9:
	sum = s0 + ( prefix * j ); // Value at N = 0

	// Some variables we'll need...
	tnp1 = 1.0; // 2*N+1
	lx2 = lx / 2.0;
	lx2 *= lx2;
	lxp = 1.0;
	t4 = 4.0 * t * t;
	b2n = b;
	for ( n = 1; n < p.length; ++n ) {
		// Begin by evaluating the next Pn from Eq 9.4:
		tnp1 += 2;
		p[ n ] = 0.0;
		mbn = b - n;
		tmp1 = 3;
		for ( m = 1; m < n; ++m ) {
			mbn = ( m * b ) - n;
			p[ n ] += mbn * p[ n-m ] / factorial( tmp1 );
			tmp1 += 2;
		}
		p[ n ] /= n;
		p[ n ] += bm1 / factorial( tnp1 );

		// Now we want Jn from Jn-1 using Eq 9.6:
		j = ( ( b2n * ( b2n+1.0 ) * j ) + ( ( u+b2n+1.0 ) * lxp ) ) / t4;
		lxp *= lx2;
		b2n += 2.0;

		// Pull it together with Eq 9:
		r = prefix * p[ n ] * j;
		sum += r;
		if ( r > 1.0 ) {
			if ( abs( r ) < abs( EPSILON * sum ) ) {
				break;
			}
		} else if ( abs( r / EPSILON ) < abs( sum ) ) {
			break;
		}
	}
	return sum;
} // end FUNCTION betaSmallBLargeASeries()


// EXPORTS //

module.exports = betaSmallBLargeASeries;

},{"./full_igamma_prefix.js":29,"./regularised_gamma_prefix.js":36,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/factorial":78,"@stdlib/math/base/special/gamma-delta-ratio":83,"@stdlib/math/base/special/gammainc":98,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/pow":129,"@stdlib/math/constants/float64-eps":194,"@stdlib/math/constants/float64-smallest-normal":213}],27:[function(require,module,exports){
'use strict';

// MODULES //

var ibetaImp = require( './ibeta_imp.js' );


// MAIN //

/**
* Evaluates the incomplete beta function.
*
* @param {Probability} x - function parameter
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete beta function
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete beta function
* @returns {number} function value
*
* @example
* var y = betainc( 0.5, 2.0, 2.0 );
* // returns 0.5
*
* @example
* var y = betainc( 0.5, 2.0, 2.0, false );
* // returns ~0.083
*
* @example
* var y = betainc( 0.2, 1.0, 2.0 );
* // returns 0.36
*/
function betainc( x, a, b, regularized, upper ) {
	if ( regularized !== false ) {
		return upper ?
			ibetaImp( a, b, x, true, true ) :
			ibetaImp( a, b, x, false, true );
	}
	return upper ?
		ibetaImp( a, b, x, true, false ) :
		ibetaImp( a, b, x, false, false );
} // end FUNCTION betainc()


// EXPORTS //

module.exports = betainc;

},{"./ibeta_imp.js":32}],28:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
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

var binomcoef = require( '@stdlib/math/base/special/binomcoef' );
var floor = require( '@stdlib/math/base/special/floor' );
var pow = require( '@stdlib/math/base/special/pow' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );


// MAIN //

/**
* For integer arguments we can relate the incomplete beta to the  complement of the binomial distribution cdf and use this finite sum.
*
* @private
* @param {NonNegativeInteger} n - number of trials
* @param {NonNegativeInteger} k - function input
* @param {Probability} x - function input
* @param {Probability} y - probability equal to `1-x`
* @returns {number} sum
*/
function binomialCCDF( n, k, x, y ) {
	var startTerm;
	var result;
	var start;
	var term;
	var i;

	result = pow( x, n );
	if ( result > MIN_VALUE ) {
		term = result;
		for ( i = floor( n - 1 ); i > k; --i ) {
			term *= ((i + 1) * y) / ((n - i) * x);
			result += term;
		}
	} else {
		// First term underflows so we need to start at the mode of the distribution and work outwards:
		start = floor( n * x );
		if ( start <= k + 1 ) {
			start = floor( k + 2 );
		}
		result = pow( x, start ) * pow( y, n - start );
		result *= binomcoef( floor(n), floor(start) );
		if ( result === 0 ) {
			// OK, starting slightly above the mode didn't work, we'll have to sum the terms the old fashioned way:
			for ( i = start - 1; i > k; --i ) {
				result += pow( x, i ) * pow( y, n - i );
				result *= binomcoef( floor(n), floor(i) );
			}
		} else {
			term = result;
			startTerm = result;
			for ( i = start - 1; i > k; --i ) {
				term *= ((i + 1) * y) / ((n - i) * x);
				result += term;
			}
			term = startTerm;
			for ( i = start + 1; i <= n; ++i ) {
				term *= (n - i + 1) * x / (i * y);
				result += term;
			}
		}
	}
	return result;
} // end FUNCTION binomialCCDF()


// EXPORTS

module.exports = binomialCCDF;

},{"@stdlib/math/base/special/binomcoef":56,"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/pow":129,"@stdlib/math/constants/float64-smallest-normal":213}],29:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );


// MAIN //

/**
* Calculates the power term prefix (z^a)(e^-z) used in the non-normalised incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function fullIGammaPrefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else if ( alz > MIN_LN ) {
		prefix = pow( z, a ) * exp( -z );
	}
	else if ( z/a < MAX_LN ) {
		prefix = pow( z / exp(z/a), a );
	} else {
		prefix = exp( alz - z );
	}
	return prefix;
} // end FUNCTION fullIGammaPrefix()


// EXPORTS //

module.exports = fullIGammaPrefix;

},{"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/pow":129,"@stdlib/math/constants/float64-max-ln":206,"@stdlib/math/constants/float64-min-ln":209}],30:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
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

var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// MAIN //

/**
* Computes the difference between `ibeta(a,b,x)` and `ibeta(a+k,b,x)`.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {NonNegativeInteger} k - function input
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {Object} pderiv - object holding the derivative in the `value` property
* @returns {number} difference between ibeta(a,b,x) and ibeta(a+k,b,x)
*/
function ibetaAStep( a, b, x, y, k, normalised, pderiv ) {
	var prefix;
	var term;
	var sum;
	var i;

	prefix = ibetaPowerTerms( a, b, x, y, normalised );
	if ( pderiv ) {
		pderiv.value = prefix;
	}
	prefix /= a;
	if ( prefix === 0.0 ) {
		return prefix;
	}
	sum = 1.0;
	term = 1.0;
	// Series summation from 0 to k-1:
	for ( i = 0; i < k-1; ++i ) {
		term *= (a+b+i) * x / (a+i+1.0);
		sum += term;
	}
	prefix *= sum;
	return prefix;
} // end FUNCTION ibetaAStep()


// EXPORTS

module.exports = ibetaAStep;

},{"./ibeta_power_terms.js":33}],31:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
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

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// FUNCTIONS //

/**
* Continued fraction for the incomplete beta.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @returns {Function} series function
*/
function ibetaFraction2t( a, b, x, y ) {
	var m = 0;
	return next;

	/**
	* Calculate the numerator and denominator of the next term of the series.
	*
	* @private
	* @returns {Array} series expansion terms
	*/
	function next() {
		var denom;
		var aN;
		var bN;

		aN = (a + m - 1) * (a + b + m - 1) * m * (b - m) * x * x;
		denom = a + ( 2.0*m ) - 1.0;
		aN /= denom * denom;
		bN = m;
		bN += (m * (b - m) * x) / ( a + ( 2.0*m ) - 1.0 );
		bN += ( (a+m) * ( (a*y) - (b*x) + 1.0 + ( m*(2.0-x) ) ) ) /
			( a + (2.0*m) + 1.0 );
		m += 1;
		return [ aN, bN ];
	}
} // end FUNCTION ibetaFraction2t()


// MAIN //

/**
* Evaluates the incomplete beta via the continued fraction representation.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {Object} pderiv - object holding the derivative in the `value` property
* @returns {number} incomplete beta value
*/
function ibetaFraction2( a, b, x, y, normalised, pderiv ) {
	var result;
	var fract;
	var f;

	result = ibetaPowerTerms( a, b, x, y, normalised );
	if ( pderiv ) {
		pderiv.value = result;
	}
	if ( result === 0.0 ) {
		return result;
	}
	f = ibetaFraction2t( a, b, x, y );
	fract = continuedFraction( f, {
		'keep': true,
		'maxIter': 1000
	});
	return result / fract;
} // end FUNCTION ibetaFraction2()


// EXPORTS

module.exports = ibetaFraction2;

},{"./ibeta_power_terms.js":33,"@stdlib/math/base/tools/continued-fraction":157}],32:[function(require,module,exports){
/* eslint-disable max-statements */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var expm1 = require( '@stdlib/math/base/special/expm1' );
var floor = require( '@stdlib/math/base/special/floor' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var asin = require( '@stdlib/math/base/special/asin' );
var beta = require( '@stdlib/math/base/special/beta' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var MAX_FLOAT64 = require( '@stdlib/math/constants/float64-max' );
var MIN_FLOAT64 = require( '@stdlib/math/constants/float64-smallest-normal' );
var MAX_INT32 = require( '@stdlib/math/constants/int32-max' );
var HALF_PI = require( '@stdlib/math/constants/float64-half-pi' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var betaSmallBLargeASeries = require( './beta_small_b_large_a_series.js' );
var risingFactorialRatio = require( './rising_factorial_ratio.js' );
var ibetaPowerTerms = require( './ibeta_power_terms.js' );
var ibetaFraction2 = require( './ibeta_fraction2.js');
var binomialCCDF = require( './binomial_ccdf.js' );
var ibetaAStep = require( './ibeta_a_step.js' );
var ibetaSeries = require( './ibeta_series.js' );


// MAIN //

/**
* Evaluates the incomplete beta function. This function divides up the input range and selects the right implementation method for each domain.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function input
* @param {boolean} invert - boolean indicating if the function should return the upper tail of the incomplete beta function instead
* @param {boolean} normalised - boolean indicating if the function should evaluate the regularized incomplete beta function
* @param {Object} [pderiv] - derivative container
* @returns {number} function value
*/
function ibetaImp( a, b, x, invert, normalised, pderiv ) {
	var lambda;
	var prefix;
	var fract;
	var bbar;
	var div;
	var tmp;
	var k;
	var n;
	var p;
	var y;
	y = 1.0 - x;
	if ( pderiv ) {
		// Value not set...
		pderiv.value = -1;
	}
	if ( x < 0.0 || x > 1.0 ) {
		return NaN;
	}
	if ( normalised ) {
		if ( a < 0.0 || b < 0.0 ) {
			return NaN;
		}
		// Extend to a few very special cases...
		if ( a === 0.0 ) {
			if ( b === 0.0 ) {
				return NaN;
			}
			if ( b > 0.0 ) {
				return invert ? 0.0 : 1.0;
			}
		} else if ( b === 0.0 ) {
			if ( a > 0.0 ) {
				return invert ? 1.0 : 0.0;
			}
		}
	} else if ( a <= 0.0 || b <= 0.0 ) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( pderiv ) {
			if ( a === 1.0 ) {
				pderiv.value = 1.0;
			} else {
				pderiv.value = a < 1.0 ? MAX_FLOAT64 / 2.0 : MIN_FLOAT64 * 2.0;
			}
		}
		if ( invert ) {
			return normalised ? 1.0 : beta( a, b );
		}
		return 0.0;
	}
	if ( x === 1.0 ) {
		if ( pderiv ) {
			if ( b === 1 ) {
				pderiv.value = 1;
			} else {
				pderiv.value = b < 1 ? MAX_FLOAT64 / 2 : MIN_FLOAT64 * 2;
			}
		}
		if ( invert ) {
			return 0.0;
		}
		return normalised ? 1.0 : beta( a, b );
	}
	if ( a === 0.5 && b === 0.5 ) {
		if ( pderiv ) {
			pderiv.value = 1.0 / PI * sqrt( y * x );
		}
		// We have an arcsine distribution:
		p = invert ? asin( sqrt(y) ) : asin( sqrt(x) );
		p /= HALF_PI;
		if ( !normalised ) {
			p *= PI;
		}
		return p;
	}
	if ( a === 1.0 ) {
		tmp = b;
		b = a;
		a = tmp;

		tmp = y;
		y = x;
		x = tmp;

		invert = !invert;
	}
	if ( b === 1.0 ) {
		// Special case see: http://functions.wolfram.com/GammaBetaErf/BetaRegularized/03/01/01/
		if ( a === 1.0 ) {
			if ( pderiv ) {
				pderiv.value = 1.0;
			}
			return invert ? y : x;
		}
		if ( pderiv ) {
			pderiv.value = a * pow( x, a - 1.0 );
		}
		if ( y < 0.5 ) {
			p = invert ? -expm1( a * log1p(-y) ) : exp( a * log1p(-y) );
		} else {
			p = invert ? -( pow( x, a ) - 1 ) : pow( x, a );
		}
		if ( !normalised ) {
			p /= a;
		}
		return p;
	}
	if ( min(a, b) <= 1.0 ) {
		if ( x > 0.5 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;

			invert = !invert;
		}
		if ( max( a, b ) <= 1.0 ) {
			// Both a,b < 1:
			if ( (a >= min( 0.2, b ) ) || ( pow(x, a) <= 0.9 ) ) {
				if ( invert ) {
					fract = -(normalised ? 1.0 : beta( a, b ) );
					invert = false;
					fract = -ibetaSeries(
						a, b, x, fract, normalised, pderiv, y
					);
				} else {
					fract = ibetaSeries(
						a, b, x, 0, normalised, pderiv, y
					);
				}
			} else {
				tmp = b;
				b = a;
				a = tmp;

				tmp = y;
				y = x;
				x = tmp;

				invert = !invert;
				if ( y >= 0.3 ) {
					if ( invert ) {
						fract = -( normalised ? 1.0 : beta( a, b ) );
						invert = false;
						fract = -ibetaSeries(
							a, b, x, fract, normalised, pderiv, y
						);
					} else {
						fract = ibetaSeries(
							a, b, x, 0, normalised, pderiv, y
						);
					}
				} else {
					// Sidestep on a, and then use the series representation:
					if ( normalised ) {
						prefix = 1;
					} else {
						prefix = risingFactorialRatio( a + b, a, 20 );
					}
					fract = ibetaAStep( a, b, x, y, 20, normalised, pderiv );
					if ( invert ) {
						fract -= ( normalised ? 1 : beta( a, b ) );
						invert = false;
						fract = -betaSmallBLargeASeries(
							a + 20, b, x, y, fract, prefix, normalised
						);
					} else {
						fract = betaSmallBLargeASeries(
							a + 20, b, x, y, fract, prefix, normalised
						);
					}
				}
			}
		} else if ( b <= 1 || ( x < 0.1 && ( pow(b * x, a) <= 0.7 ) ) ) {
			if ( invert ) {
				fract = -( normalised ? 1 : beta( a, b ) );
				invert = false;
				fract = -ibetaSeries( a, b, x, fract, normalised, pderiv, y );
			} else {
				fract = ibetaSeries( a, b, x, 0, normalised, pderiv, y );
			}
		} else {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;
			invert = !invert;

			if ( y >= 0.3 ) {
				if (invert) {
					fract = -(normalised ? 1 : beta( a, b ));
					invert = false;
					fract = -ibetaSeries(
						a, b, x, fract, normalised, pderiv, y
					);
				} else {
					fract = ibetaSeries(
						a, b, x, 0, normalised, pderiv, y
					);
				}
			}
			else if ( a >= 15 ) {
				if ( invert ) {
					fract = -(normalised ? 1 : beta( a, b ));
					invert = false;
					fract = -betaSmallBLargeASeries(
						a, b, x, y, fract, 1, normalised
					);
				} else {
					fract = betaSmallBLargeASeries(
						a, b, x, y, 0, 1, normalised
					);
				}
			}
			else {
				if ( normalised ) {
					prefix = 1;
				} else {
					// Sidestep to improve errors:
					prefix = risingFactorialRatio( a + b, a, 20 );
				}
				fract = ibetaAStep( a, b, x, y, 20, normalised, pderiv );
				if ( invert ) {
					fract -= ( normalised ? 1 : beta( a, b ) );
					invert = false;
					fract = -betaSmallBLargeASeries(
						a + 20, b, x, y, fract, prefix, normalised
					);
				} else {
					fract = betaSmallBLargeASeries(
						a + 20, b, x, y, fract, prefix, normalised
					);
				}
			}
		}
	} else {
		// Both a,b >= 1:
		if ( a < b ) {
			lambda = a - ( (a + b) * x );
		} else {
			lambda = ( (a + b) * y ) - b;
		}
		if ( lambda < 0.0 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;
			invert = !invert;
		}
		if ( b < 40.0 ) {
			if (
				floor(a) === a &&
				floor(b) === b &&
				a < MAX_INT32 - 100
			) {
				// Relate to the binomial distribution and use a finite sum:
				k = a - 1;
				n = b + k;
				fract = binomialCCDF( n, k, x, y );
				if ( !normalised ) {
					fract *= beta( a, b );
				}
			}
			else if ( b * x <= 0.7 ) {
				if ( invert ) {
					fract = -( normalised ? 1.0 : beta( a, b ) );
					invert = false;
					fract = -ibetaSeries(
						a, b, x, fract, normalised, pderiv, y
					);
				} else {
					fract = ibetaSeries(
						a, b, x, 0.0, normalised, pderiv, y
					);
				}
			}
			else if ( a > 15.0 ) {
				// Sidestep so we can use the series representation:
				n = floor( b );
				if ( n === b ) {
					n -= 1;
				}
				bbar = b - n;
				if ( normalised ) {
					prefix = 1;
				} else {
					prefix = risingFactorialRatio( a + bbar, bbar, n );
				}
				fract = ibetaAStep( bbar, a, y, x, n, normalised );
				fract = betaSmallBLargeASeries(
					a, bbar, x, y, fract, 1.0, normalised
				);
				fract /= prefix;
			}
			else if ( normalised ) {
				n = floor( b );
				bbar = b - n;
				if ( bbar <= 0 ) {
					n -= 1;
					bbar += 1;
				}
				fract = ibetaAStep( bbar, a, y, x, n, normalised );
				fract += ibetaAStep( a, bbar, x, y, 20, normalised );
				if ( invert ) {
					fract -= 1;
				}
				fract = betaSmallBLargeASeries(
					a + 20.0, bbar, x, y, fract, 1, normalised
				);
				if ( invert ) {
					fract = -fract;
					invert = false;
				}
			}
			else {
				fract = ibetaFraction2( a, b, x, y, normalised, pderiv );
			}
		} else {
			fract = ibetaFraction2( a, b, x, y, normalised, pderiv );
		}
	}
	if ( pderiv ) {
		if ( pderiv.value < 0.0 ) {
			pderiv.value = ibetaPowerTerms( a, b, x, y, true );
		}
		div = y * x;
		if ( pderiv.value !== 0.0 ) {
			if ( ( MAX_FLOAT64 * div < pderiv.value ) ) {
				// Overflow, return an arbitrarily large value:
				pderiv.value = MAX_FLOAT64 / 2.0;
			} else {
				pderiv.value /= div;
			}
		}
	}
	return invert ? ( normalised ? 1.0 : beta( a, b ) ) - fract : fract;
} // end FUNCTION ibetaImp()


// EXPORTS //

module.exports = ibetaImp;

},{"./beta_small_b_large_a_series.js":26,"./binomial_ccdf.js":28,"./ibeta_a_step.js":30,"./ibeta_fraction2.js":31,"./ibeta_power_terms.js":33,"./ibeta_series.js":34,"./rising_factorial_ratio.js":37,"@stdlib/math/base/special/asin":23,"@stdlib/math/base/special/beta":25,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/expm1":75,"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/max":125,"@stdlib/math/base/special/min":127,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/constants/float64-half-pi":200,"@stdlib/math/constants/float64-max":207,"@stdlib/math/constants/float64-pi":211,"@stdlib/math/constants/float64-smallest-normal":213,"@stdlib/math/constants/int32-max":217}],33:[function(require,module,exports){
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
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
var E = require( '@stdlib/math/constants/float64-e' );


// MAIN //

/**
* Computes the leading power terms in the incomplete beta function. When normalized,
*
* ``` tex
* \frac{ x^a y^b }{ \operatorname{Beta}(a,b) }
* ```
*
* and otherwise
*
* ``` tex
* x^a y^b
* ```
*
* #### Notes
*
* - Almost all of the error in the incomplete beta comes from this function, particularly when a and b are large. Computing large powers are *hard* though, and using logarithms just leads to horrendous cancellation errors.
* - For \\( l1 * l2 > 0 \\) or \\( \operatorname{min}( a, b ) < 1 \\), the two power terms both go in the same direction (towards zero or towards infinity). In this case if either term overflows or underflows, then the product of the two must do so also. Alternatively, if one exponent is less than one, then we can't productively use it to eliminate overflow or underflow from the other term.  Problems with spurious overflow/underflow can't be ruled out in this case, but it is *very* unlikely since one of the power terms will evaluate to a number close to 1.
* - If \\( \max( \abs(l1), \abs(l2) ) < 0.5 \\), both exponents are near one and both the exponents are greater than one, and, further, these two power terms tend in opposite directions (one toward zero, the other toward infinity), so we have to combine the terms to avoid any risk of overflow or underflow. We do this by moving one power term inside the other, we have:
*
*    ``` tex
*    (1 + l_1)^a \cdot (1 + l_2)^b \\
*    = ((1 + l_1) \cdot (1 + l_2)^(b/a))^a \\
*    = (1 + l_1 + l_3 + l_1*l_3)^a
*    ```
*
*    and
*
*    ``` tex
*    l_3 = (1 + l_2)^(b/a) - 1 \\
*    = \exp((b/a) * \ln(1 + l_2)) - 1
*    ```
*
*  The tricky bit is deciding which term to move inside. By preference we move the larger term inside, so that the size of the largest exponent is reduced.  However, that can only be done as long as l3 (see above) is also small.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @returns {number} power terms
*/
function ibetaPowerTerms( a, b, x, y, normalised ) {
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

	if ( !normalised ) {
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
} // end FUNCTION ibetaPowerTerms()


// EXPORTS //

module.exports = ibetaPowerTerms;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/expm1":75,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":85,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/max":125,"@stdlib/math/base/special/min":127,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/constants/float64-e":193,"@stdlib/math/constants/float64-gamma-lanczos-g":198,"@stdlib/math/constants/float64-max-ln":206,"@stdlib/math/constants/float64-min-ln":209}],34:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/beta.hpp}.
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
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
var E = require( '@stdlib/math/constants/float64-e' );


// FUNCTIONS //

/**
* Series approximation to the incomplete beta.
*
* @private
* @param {NonNegativeNumber} a_ - function parameter
* @param {NonNegativeNumber} b_ - function parameter
* @param {Probability} x_ - function parameter
* @param {number} mult - initial value
* @returns {Function} series function
*/
function ibetaSeriesT( a_, b_, x_, mult ) {
	var result = mult;
	var poch = 1.0 - b_;
	var apn = a_;
	var x = x_;
	var n = 1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		var r = result / apn;
		apn += 1.0;
		result *= poch * x / n;
		n += 1;
		poch += 1.0;
		return r;
	} // end FUNCTION next()
} // end FUNCTION ibetaSeriesT()


// MAIN //

/**
* Incomplete beta series.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {NonNegativeInteger} s0 - initial value
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {Object} pderiv - object holding the derivative in the `value` property
* @param {Probability} y - probability equal to `1-x`
* @returns {number} function value
*/
function ibetaSeries( a, b, x, s0, normalised, pderiv, y ) {
	var result;
	var agh;
	var bgh;
	var cgh;
	var l1;
	var l2;
	var c;
	var s;

	if ( normalised ) {
		c = a + b;

		// Incomplete beta power term, combined with the Lanczos approximation:
		agh = a + G - 0.5;
		bgh = b + G - 0.5;
		cgh = c + G - 0.5;
		result = lanczosSumExpGScaled( c ) / ( lanczosSumExpGScaled( a ) *
			lanczosSumExpGScaled( b ) );

		l1 = ln( cgh / bgh ) * ( b - 0.5 );
		l2 = ln( x * cgh / agh ) * a;

		// Check for over/underflow in the power terms:
		if (
			l1 > MIN_LN &&
			l1 < MAX_LN &&
			l2 > MIN_LN &&
			l2 < MAX_LN
		) {
			if ( a * b < bgh * 10.0 ) {
				result *= exp( ( b-0.5 ) * log1p( a / bgh ) );
			} else {
				result *= pow( cgh / bgh, b - 0.5 );
			}
			result *= pow( x * cgh / agh, a );
			result *= sqrt( agh / E );

			if ( pderiv ) {
				pderiv.value = result * pow( y, b );
			}
		}
		else {
			// We need logs, and this *will* cancel:
			result = ln( result ) + l1 + l2 + ( ( ln( agh ) - 1.0 ) / 2.0 );
			if ( pderiv ) {
				pderiv.value = exp( result + ( b * ln( y ) ) );
			}
			result = exp(result);
		}
	}
	else {
		// Non-normalised, just compute the power:
		result = pow( x, a );
	}
	if ( result < MIN_VALUE ) {
		return s0; // Safeguard: series can't cope with denorms.
	}
	s = ibetaSeriesT( a, b, x, result );
	result = sumSeries( s, {
		'initialValue': s0,
		'maxTerms': 100
	});
	return result;
} // end FUNCTION ibetaSeries()


// EXPORTS //

module.exports = ibetaSeries;

},{"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":85,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/sum-series":166,"@stdlib/math/constants/float64-e":193,"@stdlib/math/constants/float64-gamma-lanczos-g":198,"@stdlib/math/constants/float64-max-ln":206,"@stdlib/math/constants/float64-min-ln":209,"@stdlib/math/constants/float64-smallest-normal":213}],35:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete beta function.
*
* @module @stdlib/math/base/special/betainc
*
* @example
* var betainc = require( '@stdlib/math/base/special/betainc' );
*
* var y = betainc( 0.5, 2.0, 2.0 );
* // returns 0.5
*
* y = betainc( 0.5, 2.0, 2.0, false );
* // returns ~0.083
*
* y = betainc( 0.2, 1.0, 2.0 );
* // returns 0.36
*
* y = betainc( 0.2, 1.0, 2.0, true, true );
* // returns 0.64
*/

// MODULES //

var betainc = require( './betainc.js' );


// EXPORTS //

module.exports = betainc;

},{"./betainc.js":27}],36:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14
* Copyright Christopher Kormanyos 2013-14
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
var E = require( '@stdlib/math/constants/float64-e' );


// MAIN //

/**
* Computes (z^a)(e^-z)/tgamma(a).
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} (z^a)(e^-z)/tgamma(a)
*/
function regularisedGammaPrefix( a, z ) {
	var amza;
	var alz;
	var amz;
	var sq;
	var agh = a + G - 0.5;
	var prefix;
	var d = ( (z - a) - G + 0.5 ) / agh;

	if ( a < 1 ) {
		// We have to treat a < 1 as a special case because our Lanczos approximations are optimised against the factorials with a > 1, and very small values of a can give rather erroneous results
		if ( z <= MIN_LN ) {
			// Oh dear, have to use logs, should be free of cancellation errors though:
			return exp( ( a * ln(z) ) - z - gammaln( a ) );
		}
		// Direct calculation, no danger of overflow as gamma(a) < 1/a for small a:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100 && a > 150 ) {
		// Special case for large a and a ~ z.
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * ( 0.5-G ) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. Direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= MIN_LN ||
			max(alz, amz) >= MAX_LN
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2 > MIN_LN &&
				max(alz, amz)/2 < MAX_LN
			) {
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2 ) * exp( amz / 2 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4 > MIN_LN &&
				max(alz, amz)/4 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4 ) * exp( amz / 4 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > MIN_LN &&
				amza < MAX_LN
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else
		{
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczosSumExpGScaled( a );
	return prefix;
} // end FUNCTION regularisedGammaPrefix()


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/gamma":89,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":85,"@stdlib/math/base/special/gammaln":118,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/max":125,"@stdlib/math/base/special/min":127,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/constants/float64-e":193,"@stdlib/math/constants/float64-gamma-lanczos-g":198,"@stdlib/math/constants/float64-max-ln":206,"@stdlib/math/constants/float64-min-ln":209}],37:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Calculates
*
*    ``` tex
*    \frac{ (a)(a+1)(a+2)...(a+k-1) }{ (b)(b+1)(b+2)...(b+k-1) }
*    ```
*
* - This function computes the delta in `beta(a,b,x) = prefix + delta * beta(a+k,b,x)`. It is only called with small `k`, for large `k` it is grossly inefficient.
*
* @private
* @param {number} a - input value
* @param {number} b - input value
* @param {number} k - input value
* @returns {number} ratio value
*/
function risingFactorialRatio( a, b, k ) {
	var result;
	var i;
	if ( k === 0 ) {
		return 1.0;
	}
	result = 1.0;
	for ( i = 0; i < k; ++i ) {
		result *= ( a + i ) / ( b + i );
	}
	return result;
} // end FUNCTION risingFactorialRatio()


// EXPORTS //

module.exports = risingFactorialRatio;

},{}],38:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ibetaInvImp = require( './ibeta_inv_imp.js' );


// MAIN //

/**
* Returns a value p such that `p = betainc(a, b, x)`.
*
* @param {Probability} p - function parameter
* @param {PositiveNumber} a - function parameter
* @param {PositiveNumber} b - function parameter
* @param {boolean} [upper=false] - boolean indicating if the function should return the inverse of the upper tail of the incomplete beta function
* @returns {number} function value
*
* @example
* var y = betaincinv( 0.2, 3.0, 3.0 );
* // returns ~0.327
*
* @example
* var y = betaincinv( 0.4, 3.0, 3.0 );
* // returns ~0.446
*
* @example
* var y = betaincinv( 0.4, 3.0, 3.0, true );
* // returns ~0.554
*
* @example
* var y = betaincinv( 0.4, 1.0, 6.0 );
* // returns ~0.082
*
* @example
* var y = betaincinv( 0.8, 1.0, 6.0 );
* // returns ~0.235
*/
function betaincinv( p, a, b, upper ) {
	if (
		isnan( p ) ||
		isnan( a ) ||
		isnan( b )
	) {
		return NaN;
	}
	if ( a <= 0.0 || b <= 0.0 ) {
		return NaN;
	}
	if ( p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	if ( upper ) {
		return ibetaInvImp( a, b, 1.0 - p, p )[ 0 ];
	}
	return ibetaInvImp( a, b, p, 1.0 - p )[ 0 ];
} // end FUNCTION betaincinv()


// EXPORTS //

module.exports = betaincinv;

},{"./ibeta_inv_imp.js":41,"@stdlib/math/base/assert/is-nan":10}],39:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/detail/t_distribution_inv.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var inverseStudentsT = require( './inverse_students_t.js' );


// MAIN //

/**
* Returns the inverse of the incomplete beta function via the Student t distribution.
*
* @private
* @param {PositiveNumber} a - function parameter
* @param {Probability} p - probability value
* @param {Object} py - placeholder object holding one minus the returned value
* @returns {number} function value
*/
function findIBetaInvFromTDist( a, p, py ) {
	var df;
	var u;
	var v;
	var t;

	u = p / 2.0;
	v = 1.0 - u;
	df = a * 2.0;
	t = inverseStudentsT( df, u, v );
	if ( py ) {
		py.value = t * t / ( df + ( t*t ) );
	}
	return df / ( df + ( t*t ) );
} // end FUNCTION findIBetaInvFromTDist()


// EXPORTS //

module.exports = findIBetaInvFromTDist;

},{"./inverse_students_t.js":44}],40:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/tools/roots.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var abs = require( '@stdlib/math/base/special/abs');
var ldexp = require( '@stdlib/math/base/special/ldexp');
var sign = require( '@stdlib/math/base/special/signum');
var max = require( '@stdlib/math/base/special/max' );
var MAX_VALUE = require( '@stdlib/math/constants/float64-max' );


// MAIN //

/**
* Performs root finding via third order Halley iteration.
*
* @private
* @param {Array} fun - array of function and its first two derivatives
* @param {number} guess - initial starting value.
* @param {number} minimum - minimum possible value for the result,used as initial lower bracket.
* @param {number} maximum - maximum possible value for the result, used as initial upper bracket.
* @param {PositiveInteger} digits - desired number of binary digits
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} function value
*/
function halleyIterate( fun, guess, minimum, maximum, digits, maxIter ) {
	var convergence;
	var outOfBounds;
	var delta1;
	var delta2;
	var factor;
	var result;
	var f0Last;
	var count;
	var delta;
	var denom;
	var diff;
	var num;
	var res;
	var f0;
	var f1;
	var f2;

	f0 = 0.0;
	outOfBounds = false;
	result = guess;
	factor = ldexp( 1.0, 1.0 - digits );
	delta = max( 10000000 * guess, 10000000 );  // Arbitrarily large delta...
	f0Last = 0;
	delta1 = delta;
	delta2 = delta;

	count = maxIter;
	do {
		f0Last = f0;
		delta2 = delta1;
		delta1 = delta;
		res = fun( result);
		f0 = res[ 0 ];
		f1 = res[ 1 ];
		f2 = res[ 2 ];
		count -= 1;

		if ( f0 === 0.0 ) {
			break;
		}
		if ( f1 === 0.0 ) {
			// Oops zero derivative!!!
			if ( f0Last === 0.0 ) {
				// Must be the first iteration, pretend that we had a previous one at either min or max:
				if ( result === minimum ) {
					guess = maximum;
				} else {
					guess = minimum;
				}
				f0Last = fun( guess );
				delta = guess - result;
			}
			if ( sign( f0Last ) * sign( f0 ) < 0 ) {
				// We've crossed over so move in opposite direction to last step:
				if ( delta < 0 ) {
					delta = ( result - minimum ) / 2.0;
				} else {
					delta = ( result - maximum ) / 2.0;
				}
			// Move in same direction as last step:
			} else if ( delta < 0 ) {
				delta = (result - maximum) / 2;
			} else {
				delta = (result - minimum) / 2;
			}
			// eslint-disable-next-line no-negated-condition
		} else if ( f2 === 0.0 ) {
			delta = f0 / f1;
		} else {
			denom = 2.0 * f0;
			num = ( 2.0 * f1 ) - ( f0 * ( f2 / f1 ) );
			if ( abs(num) < 1.0 && ( abs(denom) >= abs(num) * MAX_VALUE ) ) {
				// Possible overflow, use Newton step:
				delta = f0 / f1;
			} else {
				delta = denom / num;
			}
			if ( delta * f1 / f0 < 0.0 ) {
				// Probably cancellation error, try a Newton step instead:
				delta = f0 / f1;
				if ( abs(delta) > 2.0 * abs(guess) ) {
					delta = ( delta < 0.0 ? -1.0 : 1.0 ) * 2.0 * abs( guess );
				}
			}
		}
		convergence = abs( delta / delta2 );
		if ( convergence > 0.8 && convergence < 2.0 ) {
			// Last two steps haven't converged, try bisection:
			delta = delta > 0.0 ?
				( result - minimum ) / 2.0 :
				( result - maximum ) / 2.0;
			if ( abs(delta) > result ) {
				delta = sign( delta ) * result; // Protect against huge jumps!
			}
			// Reset delta2 so that this branch will *not* be taken on the next iteration:
			delta2 = delta * 3;
		}
		guess = result;
		result -= delta;

		// Check for out of bounds step:
		if ( result < minimum ) {
			if (
				abs(minimum) < 1 &&
				abs(result) > 1 &&
				( MAX_VALUE / abs(result) < abs(minimum) )
			) {
				diff = 1000.0;
			} else {
				diff = result / minimum;
			}
			if ( abs(diff) < 1.0 ) {
				diff = 1.0 / diff;
			}
			if ( !outOfBounds && diff > 0.0 && diff < 3.0 ) {
				// Only a small out of bounds step, lets assume that the result is probably approximately at minimum:
				delta = 0.99 * (guess - minimum);
				result = guess - delta;
				outOfBounds = true; // Only take this branch once!
			} else {
				delta = (guess - minimum) / 2.0;
				result = guess - delta;
				if ( result === minimum || result === maximum ) {
					break;
				}
			}
		}
		else if ( result > maximum ) {
			if (
				abs(maximum) < 1.0 &&
				abs(result) > 1.0 &&
				MAX_VALUE / abs(result) < abs(maximum)
			) {
				diff = 1000.0;
			} else {
				diff = result / maximum;
			}
			if ( abs(diff) < 1.0 ) {
				diff = 1.0 / diff;
			}
			if ( !outOfBounds && diff > 0.0 && diff < 3.0 ) {
				// Only a small out of bounds step, lets assume that the result is probably approximately at minimum:
				delta = 0.99 * (guess - maximum);
				result = guess - delta;
				outOfBounds = true; // Only take this branch once!
			} else {
				delta = ( guess - maximum ) / 2.0;
				result = guess - delta;
				if ( result === minimum || result === maximum ) {
					break;
				}
			}
		}
		// Update brackets:
		if ( delta > 0.0 ) {
			maximum = guess;
		} else {
			minimum = guess;
		}
	} while ( count && ( abs(result * factor) < abs(delta) ) );

	return result;
} // end FUNCTION halleyIterate()


// EXPORTS //

module.exports = halleyIterate;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/ldexp":119,"@stdlib/math/base/special/max":125,"@stdlib/math/base/special/signum":141,"@stdlib/math/constants/float64-max":207}],41:[function(require,module,exports){
/* eslint-disable max-statements, max-len, no-mixed-operators */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/detail/ibeta_inverse.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var betainc = require( '@stdlib/math/base/special/betainc' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var asin = require( '@stdlib/math/base/special/asin' );
var beta = require( '@stdlib/math/base/special/beta' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var sin = require( '@stdlib/math/base/special/sin' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var FLOAT64_MIN_NORM = require( '@stdlib/math/constants/float64-smallest-normal' );
var HALF_PI = require( '@stdlib/math/constants/float64-half-pi' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );
var findIBetaInvFromTDist = require( './find_ibeta_inv_from_t_dist.js' );
var temme1 = require( './temme1.js' );
var temme2 = require( './temme2.js' );
var temme3 = require( './temme3.js' );
var halleyIterate = require( './halley_iterate.js' );
var ibetaRoots = require( './ibeta_roots.js' );


// VARIABLES //

// Workspace for the polynomial coefficients:
var terms = new Array( 5 );


// MAIN //

/**
* Calculates the inverse of the incomplete beta function.
*
* @private
* @param {PositiveNumber} a - function parameter
* @param {PositiveNumber} b - function parameter
* @param {Probability} p - function parameter
* @param {Probability} q - probability equal to `1 - p`
* @returns {Array} two-element array holding function value `y` and `1-y`
*/
function ibetaInvImp( a, b, p, q ) {
	var maxIter;
	var digits;
	var invert;
	var lambda;
	var lower;
	var theta;
	var upper;
	var roots;
	var maxv;
	var minv;
	var bet;
	var ppa;
	var tmp;
	var xs2;
	var ap1;
	var bm1;
	var fs;
	var lx;
	var ps;
	var xg;
	var xs;
	var yp;
	var a2;
	var a3;
	var b2;
	var r;
	var l;
	var u;
	var x;
	var y;

	// The flag invert is set to true if we swap a for b and p for q, in which case the result has to be subtracted from 1:
	invert = false;
	// Handle trivial cases first...
	if ( q === 0.0 ) {
		return [ 1.0, 0.0 ];
	}
	else if ( p === 0.0 ) {
		return [ 0.0, 1.0 ];
	}
	else if ( a === 1.0 ) {
		if ( b === 1.0 ) {
			return [ p, 1.0 - p ];
		}
		// Change things around so we can handle as b == 1 special case below:
		tmp = b;
		b = a;
		a = tmp;

		tmp = q;
		q = p;
		p = tmp;

		invert = true;
	}
	// Depending upon which approximation method we use, we may end up calculating either x or y initially (where y = 1-x):
	x = 0.0; // Set to a safe zero to avoid a

	// For some of the methods we can put tighter bounds on the result than simply [0,1]:
	lower = 0.0;
	upper = 1.0;

	// Student's T with b = 0.5 gets handled as a special case, swap around if the arguments are in the "wrong" order:
	if ( a === 0.5 ) {
		if ( b === 0.5 ) {
			x = sin( p * HALF_PI );
			x *= x;
			y = sin( q * HALF_PI );
			y *= y;
			return [ x, y ];
		}
		else if ( b > 0.5 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = q;
			q = p;
			p = tmp;

			invert = !invert;
		}
	}
	// Select calculation method for the initial estimate:
	if ( b === 0.5 && a >= 0.5 && p !== 1.0 ) {
		// We have a Student's T distribution:
		yp = {};
		x = findIBetaInvFromTDist( a, p, yp );
		y = yp.value;
	}
	else if ( b === 1.0 ) {
		if ( p < q ) {
			if ( a > 1.0 ) {
				x = pow( p, 1.0 / a );
				y = -expm1( ln(p) / a );
			} else {
				x = pow( p, 1.0 / a );
				y = 1.0 - x;
			}
		} else {
			x = exp( log1p(-q) / a );
			y = -expm1( log1p(-q) / a );
		}
		if ( invert ) {
			tmp = y;
			y = x;
			x = tmp;
		}
		return [ x, y ];
	}
	else if ( a + b > 5.0 ) {
		// When a+b is large then we can use one of Prof Temme's asymptotic expansions, begin by swapping things around so that p < 0.5, we do this to avoid cancellations errors when p is large.
		if ( p > 0.5 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = q;
			q = p;
			p = tmp;

			invert = !invert;
		}
		minv = min( a, b );
		maxv = max( a, b );
		if ( ( sqrt(minv) > (maxv - minv) ) && minv > 5.0 ) {
			// When a and b differ by a small amount the curve is quite symmetrical and we can use an error function to approximate the inverse. This is the cheapest of the three Temme expansions, and the calculated value for x will never be much larger than p, so we don't have to worry about cancellation as long as p is small.
			x = temme1( a, b, p );
			y = 1.0 - x;
		} else {
			r = a + b;
			theta = asin( sqrt( a/r ) );
			lambda = minv / r;
			if (
				lambda >= 0.2 &&
				lambda <= 0.8 &&
				r >= 10
			) {
				// The second error function case is the next cheapest to use, it breaks down when the result is likely to be very small, if `a+b` is also small, but we can use a cheaper expansion there in any case. As before `x` won't be much larger than `p`, so as long as `p` is small we should be free of cancellation error.
				ppa = pow( p, 1.0/a );
				if ( ppa < 0.0025 && ( a + b < 200.0 ) ) {
					x = ppa * pow( a * beta( a, b ), 1.0/a );
				} else {
					x = temme2( p, r, theta );
				}
				y = 1.0 - x;
			} else {
				// If we get here then a and b are very different in magnitude and we need to use the third of Temme's methods which involves inverting the incomplete gamma.  This is much more expensive than the other methods.  We also can only use this method when a > b, which can lead to cancellation errors if we really want y (as we will when x is close to 1), so a different expansion is used in that case.
				if ( a < b ) {
					tmp = b;
					b = a;
					a = tmp;

					tmp = q;
					q = p;
					p = tmp;
					invert = !invert;
				}
				// Try and compute the easy way first:
				bet = 0.0;
				if ( b < 2.0 ) {
					bet = beta( a, b );
				}
				if ( bet === 0.0 ) {
					y = 1.0;
				} else {
					y = pow( b * q * bet, 1.0/b );
					x = 1.0 - y;
				}
			}
			if ( y > 1e-5 ) {
				x = temme3( a, b, p, q );
				y = 1.0 - x;
			}
		}
	}
	else if ( a < 1.0 && b < 1.0 ) {
		// Both a and b less than 1, there is a point of inflection at xs:
		xs = ( 1.0 - a ) / ( 2.0 - a - b );

		// Now we need to ensure that we start our iteration from the right side of the inflection point:
		fs = betainc( xs, a, b ) - p;
		if ( abs(fs) / p < EPSILON * 3.0 ) {
			// The result is at the point of inflection, best just return it:
			if ( invert ) {
				return [ 1.0 - xs, xs ];
			}
			return [ xs, 1.0 - xs ];
		}
		if ( fs < 0.0 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = q;
			q = p;
			p = tmp;

			invert = !invert;
			xs = 1.0 - xs;
		}
		xg = pow( a * p * beta( a, b ), 1.0/a );
		x = xg / ( 1.0 + xg );
		y = 1.0 / ( 1.0 + xg );

		// And finally we know that our result is below the inflection point, so set an upper limit on our search:
		if ( x > xs ) {
			x = xs;
		}
		upper = xs;
	}
	else if ( a > 1.0 && b > 1.0 ) {
		// Small a and b, both greater than 1, there is a point of inflection at xs, and it's complement is xs2, we must always start our iteration from the right side of the point of inflection.
		xs = ( a - 1.0 ) / ( a + b - 2.0 );
		xs2 = ( b - 1.0 ) / ( a + b - 2.0 );
		ps = betainc( xs, a, b ) - p;

		if ( ps < 0.0 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = q;
			q = p;
			p = tmp;

			tmp = xs2;
			xs2 = xs;
			xs = tmp;

			invert = !invert;
		}
		// Estimate x and y, using expm1 to get a good estimate for y when it's very small:
		lx = ln( p * a * beta( a, b ) ) / a;
		x = exp( lx );
		y = x < 0.9 ? 1.0 - x : -expm1(lx);

		if ( b < a && x < 0.2 ) {
			// Under a limited range of circumstances we can improve our estimate for x...
			ap1 = a - 1.0;
			bm1 = b - 1.0;
			a2 = a * a;
			a3 = a * a2;
			b2 = b * b;
			terms[ 0 ] = 0;
			terms[ 1 ] = 1;
			terms[ 2 ] = bm1 / ap1;
			ap1 *= ap1;
			terms[ 3 ] = bm1 * (3 * a * b + 5 * b + a2 - a - 4) / (2 * (a + 2) * ap1);
			ap1 *= (a + 1);
			terms[ 4 ] = bm1 * (33 * a * b2 + 31 * b2 + 8 * a2 * b2 - 30 * a * b - 47 * b + 11 * a2 * b + 6 * a3 * b + 18 + 4 * a - a3 + a2 * a2 - 10 * a2);
			terms[ 4 ] /= (3 * (a + 3) * (a + 2) * ap1);
			x = evalpoly( terms, x );
		}
		// Know that result is below the inflection point, so set an upper limit on search...
		if ( x > xs ) {
			x = xs;
		}
		upper = xs;
	} else {
		// Case: ( a <= 1 ) != ( b <= 1 )
		// If all else fails we get here, only one of a and b is above 1, and a+b is small.  Start by swapping things around so that we have a concave curve with b > a and no points of inflection in [0,1].  As long as we expect x to be small then we can use the simple (and cheap) power term to estimate x, but when we expect x to be large then this greatly underestimates x and leaves us trying to iterate "round the corner" which may take almost forever. We could use Temme's inverse gamma function case in that case, this works really rather well (albeit expensively) even though strictly speaking we're outside it's defined range. However it's expensive to compute, and an alternative approach which models the curve as a distorted quarter circle is much cheaper to compute, and still keeps the number of iterations required down to a reasonable level. With thanks to Prof. Temme for this suggestion.
		if ( b < a ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = q;
			q = p;
			p = tmp;
			invert = !invert;
		}
		if ( pow( p, 1.0/a ) < 0.5 ) {
			x = pow( p * a * beta( a, b ), 1.0/a );
			if ( x === 0 ) {
				x = FLOAT64_MIN_NORM;
			}
			y = 1.0 - x;
		}
		else {
			// Case: pow(q, 1/b) < 0.1
			// Model a distorted quarter circle:
			y = pow( 1.0 - pow( p, b * beta( a, b ) ), 1.0/b );
			if ( y === 0 ) {
				y = FLOAT64_MIN_NORM;
			}
			x = 1.0 - y;
		}
	}
	// Now we have a guess for x (and for y) we can set things up for iteration.  If x > 0.5 it pays to swap things round:
	if ( x > 0.5 ) {
		tmp = b;
		b = a;
		a = tmp;

		tmp = q;
		q = p;
		p = tmp;

		tmp = y;
		y = x;
		x = tmp;

		invert = !invert;
		l = 1.0 - upper;
		u = 1.0 - lower;
		lower = l;
		upper = u;
	}
	// Lower bound for our search:  We're not interested in denormalised answers as these tend to take up lots of iterations, given that we can't get accurate derivatives in this area (they tend to be infinite).
	if ( lower === 0 ) {
		if ( invert ) {
			// We're not interested in answers smaller than machine epsilon:
			lower = EPSILON;
			if ( x < lower ) {
				x = lower;
			}
		} else {
			lower = FLOAT64_MIN_NORM;
		}
		if ( x < lower ) {
			x = lower;
		}
	}
	// Figure out how many digits to iterate towards:
	digits = 32;
	if ( x < 1e-50 && ( a < 1.0 || b < 1.0 ) ) {
		// If we're in a region where the first derivative is very large, then we have to take care that the root-finder doesn't terminate prematurely.  We'll bump the precision up to avoid this, but we have to take care not to set the precision too high or the last few iterations will just thrash around and convergence may be slow in this case. Try 3/4 of machine epsilon:
		digits *= 3;
		digits /= 2;
	}
	// Now iterate, we can use either p or q as the target here depending on which is smaller:
	maxIter = 1000;
	roots = ibetaRoots( a, b, ( p < q ? p : q ), p >= q );
	x = halleyIterate( roots, x, lower, upper, digits, maxIter );

	// Tidy up, if we "lower" was too high then zero is the best answer we have:
	if ( x === lower ) {
		x = 0.0;
	}
	if ( invert ) {
		return [ 1.0 - x, x ];
	}
	return [ x, 1.0 - x ];
} // end FUNCTION ibetaInvImp()


// EXPORTS //

module.exports= ibetaInvImp;

},{"./find_ibeta_inv_from_t_dist.js":39,"./halley_iterate.js":40,"./ibeta_roots.js":42,"./temme1.js":50,"./temme2.js":51,"./temme3.js":52,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/asin":23,"@stdlib/math/base/special/beta":25,"@stdlib/math/base/special/betainc":35,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/expm1":75,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/max":125,"@stdlib/math/base/special/min":127,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sin":143,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float64-eps":194,"@stdlib/math/constants/float64-half-pi":200,"@stdlib/math/constants/float64-smallest-normal":213}],42:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/detail/ibeta_inverse.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var betainc = require( '@stdlib/math/base/special/betainc/lib/ibeta_imp.js' );
var abs = require( '@stdlib/math/base/special/abs');
var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
var FLOAT64_MIN_NORM = require( '@stdlib/math/constants/float64-smallest-normal' );


// MAIN //

/**
* Returns a root finding function.
*
* @private
* @param {PositiveNumber} a - function parameter
* @param {PositiveNumber} b - function parameter
* @param {Probability} target - probability value
* @param {boolean} invert - boolean indicating whether to find the roots of the upper or lower incomplete beta function
* @returns {Function} root finding function
*/
function ibetaRoots( a, b, target, invert ) {
	invert = invert || false;
	return roots;

	/**
	* Calculates roots.
	*
	* @private
	* @param {number} x - input value
	* @returns {Array} roots
	*/
	function roots( x ) {
		var f1p;
		var f1;
		var f2;
		var f;
		var y;

		y = 1.0 - x;
		f1p = {};
		f = betainc( a, b, x, invert, true, f1p ) - target;
		f1 = f1p.value;
		if ( invert ) {
			f1 = -f1;
		}
		if ( y === 0.0 ) {
			y = FLOAT64_MIN_NORM * 64.0;
		}
		if ( x === 0.0 ) {
			x = FLOAT64_MIN_NORM * 64.0;
		}
		f2 = f1 * ( -(y*a) + ( ( b-2.0 ) * x ) + 1.0 );
		if ( abs( f2 ) < y * x * FLOAT64_MAX ) {
			f2 /= (y * x);
		}
		if ( invert ) {
			f2 = -f2;
		}
		// Make sure we don't have a zero derivative:
		if ( f1 === 0.0 ) {
			f1 = (invert ? -1.0 : 1.0) * FLOAT64_MIN_NORM * 64.0;
		}
		return [ f, f1, f2 ];
	} // end FUNCTION roots()
} // end FUNCTION ibetaRoots()


// EXPORTS //

module.exports = ibetaRoots;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/betainc/lib/ibeta_imp.js":32,"@stdlib/math/constants/float64-max":207,"@stdlib/math/constants/float64-smallest-normal":213}],43:[function(require,module,exports){
'use strict';

/**
* Evaluate the inverse of the incomplete beta function.
*
* @module @stdlib/math/base/special/betaincinv
*
* @example
* var betaincinv = require( '@stdlib/math/base/special/betaincinv' );
*
* var y = betaincinv( 0.2, 3.0, 3.0 );
* // returns ~0.327
*
* y = betaincinv( 0.4, 3.0, 3.0 );
* // returns ~0.446
*
* y = betaincinv( 0.4, 3.0, 3.0, true );
* // returns ~0.554
*
* y = betaincinv( 0.4, 1.0, 6.0 );
* // returns ~0.082
*
* y = betaincinv( 0.8, 1.0, 6.0 );
* // returns ~0.235
*/

// MODULES //

var betaincinv = require( './betaincinv.js' );


// EXPORTS //

module.exports = betaincinv;

},{"./betaincinv.js":38}],44:[function(require,module,exports){
/* eslint-disable max-len, no-mixed-operators */
'use strict';

// MODULES //

var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var round = require( '@stdlib/math/base/special/round' );
var acos = require( '@stdlib/math/base/special/acos' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var cos = require( '@stdlib/math/base/special/cos' );
var pow = require( '@stdlib/math/base/special/pow' );
var sin = require( '@stdlib/math/base/special/sin' );
var SQRT2 = require( '@stdlib/math/constants/float64-sqrt-two' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var inverseStudentsTBodySeries = require( './inverse_students_t_body_series.js' );
var inverseStudentsTTailSeries = require( './inverse_students_t_tail_series.js' );
var inverseStudentsTHill = require( './inverse_students_t_hill.js' );


// MAIN //

/**
* Evaluates Student's t quantiles.
*
* @private
* @param {PositiveNumber} df - degrees of freedom
* @param {Probability} u - input probability
* @param {Probability} v - probability equal to `1-u`
*@returns {number} function value
*/
function inverseStudentsT( df, u, v ) {
	var crossover;
	var tolerance;
	var rootAlpha;
	var invert;
	var result;
	var alpha;
	var tmp;
	var p0;
	var p2;
	var p4;
	var p5;
	var p;
	var r;
	var x;
	var a;
	var b;
	var c;

	invert = false;
	result = 0;
	if ( u > v ) {
		// Function is symmetric, so invert it:
		tmp = v;
		v = u;
		u = tmp;
		invert = true;
	}
	if ( floor(df) === df && df < 20 ) {
		// We have integer degrees of freedom, try for the special cases first:
		tolerance = ldexp( 1.0, ( 2 * 53 ) / 3 );

		switch ( floor( df ) ) {
		case 1:
			// `df = 1` is the same as the Cauchy distribution, see Shaw Eq 35:
			if ( u === 0.5 ) {
				result = 0;
			} else {
				result = -cos( PI * u) / sin( PI * u);
			}
			break;
		case 2:
			// `df = 2` has an exact result, see Shaw Eq 36:
			result = ( (2.0*u) - 1) / sqrt( 2.0 * u * v );
			break;
		case 4:
			// `df = 4` has an exact result, see Shaw Eq 38 & 39:
			alpha = 4 * u * v;
			rootAlpha = sqrt( alpha );
			r = 4 * cos( acos( rootAlpha ) / 3 ) / rootAlpha;
			x = sqrt( r - 4 );
			result = u - 0.5 < 0 ? -x : x;
			break;
		case 6:
			// We get numeric overflow in this area:
			if ( u < 1e-150 ) {
				return ( invert ? -1 : 1 ) * inverseStudentsTHill( df, u );
			}
			// Newton-Raphson iteration of a polynomial case, choice of seed value is taken from Shaw's online supplement:
			a = 4.0 * ( u - (u*u) );// 1 - 4 * (u - 0.5f) * (u - 0.5f);
			b = pow( a, 1/3 );
			c = 0.85498797333834849467655443627193;
			p = 6 * ( 1 + ( c * ( (1/b) - 1 ) ) );
			do {
				p2 = p * p;
				p4 = p2 * p2;
				p5 = p * p4;
				p0 = p;
				// Next term is given by Eq 41:
				p = 2 * (8 * a * p5 - 270 * p2 + 2187) /
					(5 * (4 * a * p4 - 216 * p - 243));
			} while ( abs( (p - p0) / p ) > tolerance );
			// Use Eq 45 to extract the result:
			p = sqrt( p - df );
			result = (u - 0.5) < 0 ? -p : p;
			break;
		default:
			if ( df > 0x10000000 ) {
				result = erfcinv( 2.0 * u ) * SQRT2;
			} else if ( df < 3 ) {
				// Use a roughly linear scheme to choose between Shaw's tail series and body series:
				crossover = 0.2742 - ( df * 0.0242143 );
				if ( u > crossover ) {
					result = inverseStudentsTBodySeries( df, u );
				} else {
					result = inverseStudentsTTailSeries( df, u );
				}
			} else {
				// Use Hill's method except in the extreme tails where we use Shaw's tail series. The crossover point is roughly exponential in -df:
				crossover = ldexp( 1.0, round( df / -0.654 ) );
				if ( u > crossover ) {
					result = inverseStudentsTHill( df, u );
				} else {
					result = inverseStudentsTTailSeries( df, u );
				}
			}
		}
	} else if ( df > 0x10000000 ) {
		result = -erfcinv( 2 * u ) * SQRT2;
	} else if ( df < 3 ) {
		// Use a roughly linear scheme to choose between Shaw's tail series and body series:
		crossover = 0.2742 - ( df * 0.0242143 );
		if ( u > crossover ) {
			result = inverseStudentsTBodySeries( df, u );
		} else {
			result = inverseStudentsTTailSeries( df, u );
		}
	} else {
		// Use Hill's method except in the extreme tails where we use Shaw's tail series. The crossover point is roughly exponential in -df:
		crossover = ldexp( 1.0, round( df / -0.654) );
		if ( u > crossover ) {
			result = inverseStudentsTHill( df, u );
		} else {
			result = inverseStudentsTTailSeries( df, u );
		}
	}
	return invert ? -result : result;
} // end FUNCTION inverseStudentsT()


// EXPORTS //

module.exports = inverseStudentsT;

},{"./inverse_students_t_body_series.js":45,"./inverse_students_t_hill.js":46,"./inverse_students_t_tail_series.js":47,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/acos":21,"@stdlib/math/base/special/cos":63,"@stdlib/math/base/special/erfcinv":70,"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/ldexp":119,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/round":139,"@stdlib/math/base/special/sin":143,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/constants/float64-pi":211,"@stdlib/math/constants/float64-sqrt-two":216}],45:[function(require,module,exports){
/* eslint-disable max-len, no-mixed-operators */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/detail/t_distribution_inv.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var sqrt = require( '@stdlib/math/base/special/sqrt');
var PI = require( '@stdlib/math/constants/float64-pi' );


// VARIABLES //

// Workspace for the polynomial coefficients:
var c = new Array( 10 );


// MAIN //

/**
* Evaluates Student's t quantiles via a body series expansion. Tail and body series are due to Shaw.
*
* #### References
*
* - Shaw, W.T., 2006, "Sampling Student's T distribution - use of the inverse cumulative distribution function.", Journal of Computational Finance, Vol 9 Issue 4, pp 37-73, Summer 2006 (www.mth.kcl.ac.uk/~shaww/web_page/papers/Tdistribution06.pdf)
*
* @private
* @param {PositiveNumber} df - degrees of freedom
* @param {Probability} u - input probability
* @returns {number} function value
*/
function inverseStudentsTBodySeries( df, u ) {
	var idf;
	var c0;
	var v;

	// Body series for small N, start with Eq 56 of Shaw:
	v = gammaDeltaRatio( df / 2, 0.5 ) * sqrt( df * PI ) * ( u - 0.5 );
	c0 = 0;
	c[ 0 ] = 1;

	// Figure out what the coefficients are. They depend only on the degrees of freedom (Eq 57 of Shaw):
	idf = 1.0 / df;
	c[ 1 ] = 0.16666666666666666667 + 0.16666666666666666667 * idf;
	c[ 2 ] = (0.0083333333333333333333 * idf +
		0.066666666666666666667) * idf +
		0.058333333333333333333;
	c[ 3 ] = ((0.00019841269841269841270 * idf +
		0.0017857142857142857143) * idf +
		0.026785714285714285714) * idf +
		0.025198412698412698413;
	c[ 4 ] = (((2.7557319223985890653e-6 * idf +
		0.00037477954144620811287) * idf -
		0.0011078042328042328042) * idf +
		0.010559964726631393298) * idf +
		0.012039792768959435626;
	c[ 5 ] = ((((2.5052108385441718775e-8 * idf -
		0.000062705427288760622094) * idf +
		0.00059458674042007375341) * idf -
		0.0016095979637646304313) * idf +
		0.0061039211560044893378) * idf +
		0.0038370059724226390893;
	c[ 6 ] = (((((1.6059043836821614599e-10 * idf +
		0.000015401265401265401265) * idf -
		0.00016376804137220803887) * idf +
		0.00069084207973096861986) * idf -
		0.0012579159844784844785) * idf +
		0.0010898206731540064873) * idf +
		0.0032177478835464946576;
	c[ 7 ] = ((((((7.6471637318198164759e-13 * idf -
		3.9851014346715404916e-6) * idf +
		0.000049255746366361445727) * idf -
		0.00024947258047043099953) * idf +
		0.00064513046951456342991) * idf -
		0.00076245135440323932387) * idf +
		0.000033530976880017885309) * idf +
		0.0017438262298340009980;
	c[ 8 ] = (((((((2.8114572543455207632e-15 * idf +
		1.0914179173496789432e-6) * idf -
		0.000015303004486655377567) * idf +
		0.000090867107935219902229) * idf -
		0.00029133414466938067350) * idf +
		0.00051406605788341121363) * idf -
		0.00036307660358786885787) * idf -
		0.00031101086326318780412) * idf +
		0.00096472747321388644237;
	c[ 9 ] = ((((((((8.2206352466243297170e-18 * idf -
		3.1239569599829868045e-7) * idf +
		4.8903045291975346210e-6) * idf -
		0.000033202652391372058698) * idf +
		0.00012645437628698076975) * idf -
		0.00028690924218514613987) * idf +
		0.00035764655430568632777) * idf -
		0.00010230378073700412687) * idf -
		0.00036942667800009661203) * idf +
		0.00054229262813129686486;
	// Result is then a polynomial in v (see Eq 56 of Shaw)...
	// evaluate_odd_polynomial:
	return c0 + ( v * evalpoly( c, v*v ) );
} // end FUNCTION inverseStudentsTBodySeries()


// EXPORTS //

module.exports = inverseStudentsTBodySeries;

},{"@stdlib/math/base/special/gamma-delta-ratio":83,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float64-pi":211}],46:[function(require,module,exports){
/* eslint-disable no-mixed-operators */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/detail/t_distribution_inv.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var expm1 = require( '@stdlib/math/base/special/expm1');
var sqrt = require( '@stdlib/math/base/special/sqrt');
var pow = require( '@stdlib/math/base/special/pow');
var PI = require( '@stdlib/math/constants/float64-pi' );
var SQRT2 = require( '@stdlib/math/constants/float64-sqrt-two' );


// MAIN //

/**
* Evaluates Student's t quantiles via a method due to Hill.
*
* #### References
*
* - G. W. Hill, Algorithm 396, Student's t-Quantiles Communications of the ACM, 13(10): 619-620, Oct., 1970.
*
* @private
* @param {PositiveNumber} ndf - degrees of freedom
* @param {Probability} u - input probability
* @returns {number} function value
*/
function inverseStudentsTHill( ndf, u ) {
	var a;
	var b;
	var c;
	var d;
	var q;
	var x;
	var y;

	if ( ndf > 1e20 ) {
		return -erfcinv( 2 * u ) * SQRT2;
	}
	a = 1.0 / ( ndf - 0.5 );
	b = 48.0 / (a * a);
	c = ((20700 * a / b - 98) * a - 16) * a + 96.36;
	d = ((94.5 / (b + c) - 3) / b + 1) * sqrt( a * PI / 2 ) * ndf;
	y = pow(d * 2 * u, 2 / ndf);

	if ( y > ( 0.05 + a ) ) {
		// Asymptotic inverse expansion about normal:
		x = -erfcinv( 2 * u ) * SQRT2;
		y = x * x;

		if ( ndf < 5.0 ) {
			c += 0.3 * ( ndf - 4.5 ) * ( x + 0.6 );
		}
		c += (((0.05 * d * x - 5) * x - 7) * x - 2) * x + b;
		y = (((((0.4 * y + 6.3) * y + 36) * y + 94.5) / c - y - 3) / b + 1) * x;
		y = expm1( a * y * y );
	} else {
		y = ((1 / ( ( (ndf + 6) / (ndf * y) - 0.089 * d - 0.822 ) *
		(ndf + 2) * 3 ) + 0.5 / (ndf + 4)) * y - 1) *
		(ndf + 1) / (ndf + 2) + 1 / y;
	}
	q = sqrt( ndf * y );
	return -q;
} // end FUNCTION inverseStudentsTHill()


// EXPORTS //

module.exports = inverseStudentsTHill;

},{"@stdlib/math/base/special/erfcinv":70,"@stdlib/math/base/special/expm1":75,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/constants/float64-pi":211,"@stdlib/math/constants/float64-sqrt-two":216}],47:[function(require,module,exports){
/* eslint-disable max-len, no-mixed-operators */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/detail/t_distribution_inv.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var sqrt = require( '@stdlib/math/base/special/sqrt');
var pow = require( '@stdlib/math/base/special/pow');
var PI = require( '@stdlib/math/constants/float64-pi' );


// VARIABLES //

// Array for the coefficients d(k), these depend only on the number of degrees of freedom df, so at least in theory we could tabulate these for fixed df, see p15 of Shaw:
var d = new Array( 7 );


// MAIN //

/**
* Evaluates Student's t quantiles via a tail series expansion. Tail and body series are due to Shaw.
*
* #### References
*
* - Shaw, W.T., 2006, "Sampling Student's T distribution - use of the inverse cumulative distribution function.", Journal of Computational Finance, Vol 9 Issue 4, pp 37-73, Summer 2006 (www.mth.kcl.ac.uk/~shaww/web_page/papers/Tdistribution06.pdf)
*
* @private
* @param {number} df - degrees of freedom
* @param {number} v - function value
* @returns {number} tail value
*/
function inverseStudentsTTailSeries( df, v ) {
	var result;
	var power;
	var div;
	var np2;
	var np4;
	var np6;
	var rn;
	var w;

	// Tail series expansion, see section 6 of Shaw's paper. `w` is calculated using Eq 60:
	w = gammaDeltaRatio( df / 2.0, 0.5 ) * sqrt( df * PI ) * v;

	// Define some variables:
	np2 = df + 2;
	np4 = df + 4;
	np6 = df + 6;

	d[ 0 ] = 1;
	d[ 1 ] = -(df + 1) / (2 * np2);
	np2 *= (df + 2);
	d[ 2 ] = -df * (df + 1) * (df + 3) / (8 * np2 * np4);
	np2 *= df + 2;
	d[ 3 ] = -df * (df + 1) * (df + 5) * (((3 * df) + 7) * df -2) / (48 * np2 * np4 * np6);
	np2 *= (df + 2);
	np4 *= (df + 4);
	d[ 4 ] = -df * (df + 1) * (df + 7) *
		( (((((15 * df) + 154) * df + 465) * df + 286) * df - 336) * df + 64 ) /
		(384 * np2 * np4 * np6 * (df + 8));
	np2 *= (df + 2);
	d[ 5 ] = -df * (df + 1) * (df + 3) * (df + 9) *
		(((((((35 * df + 452) * df + 1573) * df + 600) * df - 2020) * df) + 928) * df -128) /
		(1280 * np2 * np4 * np6 * (df + 8) * (df + 10));
	np2 *= (df + 2);
	np4 *= (df + 4);
	np6 *= (df + 6);
	d[ 6 ] = -df * (df + 1) * (df + 11) *
		((((((((((((945 * df) + 31506) * df + 425858) * df + 2980236) * df + 11266745) * df + 20675018) * df + 7747124) * df - 22574632) * df - 8565600) * df + 18108416) * df - 7099392) * df + 884736) /
		(46080 * np2 * np4 * np6 * (df + 8) * (df + 10) * (df +12));

	// Now bring everything together to provide the result this is Eq 62 of Shaw:
	rn = sqrt( df );
	div = pow( rn * w, 1 / df );
	power = div * div;
	result = evalpoly( d, power );
	result *= rn;
	result /= div;
	return -result;
} // end FUNCTION inverseStudentsTTailSeries()


// EXPORTS //

module.exports = inverseStudentsTTailSeries;

},{"@stdlib/math/base/special/gamma-delta-ratio":83,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float64-pi":211}],48:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/tools/roots.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var sign = require( '@stdlib/math/base/special/signum' );
var abs = require( '@stdlib/math/base/special/abs' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var MAX_VALUE = require( '@stdlib/math/constants/float64-max' );


// MAIN //

/**
* Performs root finding via second order Newton-Raphson iteration.
*
* @private
* @param {Array} fun - two-element array of the function and its first derivative
* @param {number} guess - initial starting value.
* @param {number} min - minimum possible value for the result,used as initial lower bracket.
* @param {number} max - maximum possible value for the result, used as initial upper bracket.
* @param {PositiveInteger} digits - desired number of binary digits
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} function value
*/
function newtonRaphsonIterate( fun, guess, min, max, digits, maxIter ) {
	var f0last;
	var delta1;
	var delta2;
	var factor;
	var result;
	var count;
	var delta;
	var res;
	var f0;
	var f1;

	f0 = 0.0;
	f0last = 0.0;
	result = guess;

	factor = ldexp( 1.0, 1.0 - digits );
	delta = MAX_VALUE;
	delta1 = MAX_VALUE;
	delta2 = MAX_VALUE;

	count = maxIter;
	do {
		f0last = f0;
		delta2 = delta1;
		delta1 = delta;
		res = fun(result);
		f0 = res[ 0 ];
		f1 = res[ 1 ];
		count -= 1;
		if ( f0 === 0.0 ) {
			break;
		}
		if ( f1 === 0.0 ) {
			// Oops zero derivative!!!
			if ( f0last === 0.0 ) {
				// Must be the first iteration, pretend that we had a previous one at either min or max:
				if ( result === min ) {
					guess = max;
				} else {
					guess = min;
				}
				f0last = fun( guess );
				delta = guess - result;
			}
			if ( sign(f0last) * sign(f0) < 0 ) {
				// We've crossed over so move in opposite direction to last step:
				if ( delta < 0 ) {
					delta = (result - min) / 2.0;
				} else {
					delta = (result - max) / 2.0;
				}
			} else if ( delta < 0 ) {
				delta = (result - max) / 2.0;
			} else {
				delta = (result - min) / 2.0;
			}
		} else {
			delta = f0 / f1;
		}
		if ( abs(delta * 2.0) > abs(delta2) ) {
			// Last two steps haven't converged, try bisection:
			delta = delta > 0.0 ? (result - min) / 2.0 : (result - max) / 2.0;
		}
		guess = result;
		result -= delta;
		if ( result <= min ) {
			delta = 0.5 * (guess - min);
			result = guess - delta;
			if ( result === min || result === max ) {
				break;
			}
		} else if ( result >= max ) {
			delta = 0.5 * (guess - max);
			result = guess - delta;
			if ( result === min || result === max ) {
				break;
			}
		}
		// Update brackets:
		if ( delta > 0.0 ) {
			max = guess;
		} else {
			min = guess;
		}
	}
	while ( count && ( abs(result * factor) < abs(delta) ) );

	return result;
} // end FUNCTION newtonRaphsonIterate()


// EXPORTS //

module.exports = newtonRaphsonIterate;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/ldexp":119,"@stdlib/math/base/special/signum":141,"@stdlib/math/constants/float64-max":207}],49:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/detail/ibeta_inverse.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var ln = require( '@stdlib/math/base/special/ln' );
var MAX_VALUE = require( '@stdlib/math/constants/float64-max' );


// MAIN //

/**
* Helper function used by root finding code to convert `eta` to `x`.
*
* @private
* @param {number} t - first parameter
* @param {number} a - second parameter
* @returns {Function} root function
*/
function temmeRootFinder( t, a ) {
	return roots;

	/**
	* Calculates roots.
	*
	* @private
	* @param {number} x - function value
	* @returns {Array} function roots
	*/
	function roots( x ) {
		var big;
		var f1;
		var f;
		var y;

		y = 1.0 - x;
		if ( y === 0.0 ) {
			big = MAX_VALUE / 4.0;
			return [ -big, -big ];
		}
		if ( x === 0.0 ) {
			big = MAX_VALUE / 4.0;
			return [ -big, -big ];
		}
		f = ln( x ) + ( a * ln( y ) ) + t;
		f1 = ( 1.0 / x ) - ( a / y );
		return [ f, f1 ];
	} // end FUNCTION roots()
} // end FUNCTION temmeRootFinder()


// EXPORTS //

module.exports = temmeRootFinder;

},{"@stdlib/math/base/special/ln":121,"@stdlib/math/constants/float64-max":207}],50:[function(require,module,exports){
/* eslint-disable no-mixed-operators */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/detail/ibeta_inverse.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var sqrt = require( '@stdlib/math/base/special/sqrt');
var exp = require( '@stdlib/math/base/special/exp');
var r2 = require( '@stdlib/math/constants/float64-sqrt-two' );


// VARIABLES //

// Workspaces for the polynomial coefficients:
var workspace = new Array( 7 );
var terms = new Array( 4 );


// MAIN //

/**
* Carries out the first method by Temme.
*
* #### References
*
* - "Asymptotic Inversion of the Incomplete Beta Function", N.M. Temme, Journal of Computation and Applied Mathematics 41 (1992) 145-157, Section 2.
*
* @private
* @param {PositiveNumber} a - function parameter
* @param {PositiveNumber} b - function parameter
* @param {Probability} z - function parameter
* @returns {number} function value
*/
function temme1( a, b, z ) {
	var eta0;
	var eta2;
	var eta;
	var B2;
	var B3;
	var B;
	var c;
	var x;

	// Get the first approximation for eta from the inverse error function (Eq: 2.9 and 2.10):
	eta0 = erfcinv( 2.0 * z );
	eta0 /= -sqrt( a / 2.0 );

	terms[ 0 ] = eta0;

	// Calculate powers:
	B = b - a;
	B2 = B * B;
	B3 = B2 * B;

	// Calculate correction terms:

	// See eq following 2.15:
	workspace[ 0 ] = -B * r2 / 2;
	workspace[ 1 ] = ( 1 - (2.0*B) ) / 8.0;
	workspace[ 2 ] = -(B * r2 / 48.0);
	workspace[ 3 ] = -1.0 / 192.0;
	workspace[ 4 ] = -B * r2 / 3840.0;
	workspace[ 5 ] = 0.0;
	workspace[ 6 ] = 0.0;
	terms[ 1 ] = evalpoly( workspace, eta0 );

	// Eq Following 2.17:
	workspace[ 0 ] = B * r2 * ( (3.0*B) - 2.0) / 12.0;
	workspace[ 1 ] = ( (20.0*B2) - (12.0*B) + 1.0 ) / 128.0;
	workspace[ 2 ] = B * r2 * (20 * B - 1) / 960;
	workspace[ 3 ] = (16 * B2 + 30 * B - 15) / 4608;
	workspace[ 4 ] = B * r2 * (21 * B + 32) / 53760;
	workspace[ 5 ] = (-32 * B2 + 63) / 368640;
	workspace[ 6 ] = -B * r2 * (120 * B + 17) / 25804480;
	terms[ 2 ] = evalpoly( workspace, eta0 );

	// Eq Following 2.17:
	workspace[ 0 ] = B * r2 * (-75 * B2 + 80 * B - 16) / 480;
	workspace[ 1 ] = (-1080 * B3 + 868 * B2 - 90 * B - 45) / 9216;
	workspace[ 2 ] = B * r2 * (-1190 * B2 + 84 * B + 373) / 53760;
	workspace[ 3 ] = (-2240 * B3 - 2508 * B2 + 2100 * B - 165) / 368640;
	workspace[ 4 ] = 0.0;
	workspace[ 5 ] = 0.0;
	workspace[ 6 ] = 0.0;
	terms[ 3 ] = evalpoly( workspace, eta0 );

	// Bring them together to get a final estimate for eta:
	eta = evalpoly( terms, 1.0/a );

	// Now we need to convert eta to x, by solving the appropriate quadratic equation:
	eta2 = eta * eta;
	c = -exp( -eta2 / 2.0 );
	if ( eta2 === 0.0 ) {
		x = 0.5;
	} else {
		x = ( 1.0 + ( eta * sqrt( ( 1.0+c ) / eta2 ) ) ) / 2.0;
	}
	return x;
} // end FUNCTION temme1()


// EXPORTS //

module.exports = temme1;

},{"@stdlib/math/base/special/erfcinv":70,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float64-sqrt-two":216}],51:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/detail/ibeta_inverse.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var sin = require( '@stdlib/math/base/special/sin' );
var cos = require( '@stdlib/math/base/special/cos' );
var temmeRootFinder = require( './root_finder.js');
var newtonRaphsonIterate = require( './newton_raphson.js' );


// VARIABLES //

// Polynomial coefficients:
var workspace = new Array( 6 );
var terms = new Array( 4 );
var co1 = [
	-1.0,
	-5.0,
	5.0
];
var co2 = [
	1.0,
	21.0,
	-69.0,
	46.0
];
var co3 = [
	7.0,
	-2.0,
	33.0,
	-62.0,
	31.0
];
var co4 = [
	25.0,
	-52.0,
	-17.0,
	88.0,
	-115.0,
	46.0
];
var co5 = [
	7.0,
	12.0,
	-78.0,
	52.0
];
var co6 = [
	-7.0,
	2.0,
	183.0,
	-370.0,
	185.0
];
var co7 = [
	-533.0,
	776.0,
	-1835.0,
	10240.0,
	-13525.0,
	5410.0
];
var co8 = [
	-1579.0,
	3747.0,
	-3372.0,
	-15821.0,
	45588.0,
	-45213.0,
	15071.0
];
var co9 = [
	449.0,
	-1259.0,
	-769.0,
	6686.0,
	-9260.0,
	3704.0
];
var co10 = [
	63149.0,
	-151557.0,
	140052.0,
	-727469.0,
	2239932.0,
	-2251437.0,
	750479.0
];
var co11 = [
	29233.0,
	-78755.0,
	105222.0,
	146879.0,
	-1602610.0,
	3195183.0,
	-2554139.0,
	729754.0
];
var co12 = [
	1.0,
	-13.0,
	13.0
];
var co13 = [
	1.0,
	21.0,
	-69.0,
	46.0
];


// MAIN //

/**
* Carries out the second method by Temme.
*
* #### References
*
* - "Asymptotic Inversion of the Incomplete Beta Function", N.M. Temme, Journal of Computation and Applied Mathematics 41 (1992) 145-157, Section 3.
*
* @private
* @param {number} z - function parameter
* @param {number} r - function parameter
* @param {number} theta - function parameter
* @returns {number} function value
*/
function temme2( z, r, theta ) {
	var upper;
	var lower;
	var alpha;
	var roots;
	var eta0;
	var eta;
	var sc7;
	var sc6;
	var sc5;
	var sc4;
	var sc3;
	var sc2;
	var sc;
	var lu;
	var s2;
	var c2;
	var c;
	var s;
	var u;
	var x;

	// Get first estimate for eta, see Eq 3.9 and 3.10, but note there is a typo in Eq 3.10:
	eta0 = erfcinv( 2.0 * z );
	eta0 /= -sqrt( r / 2.0 );

	s = sin( theta );
	c = cos( theta );

	// Now we need to perturb eta0 to get eta, which we do by evaluating the polynomial in 1/r at the bottom of page 151, to do this we first need the error terms e1, e2 e3 which we'll fill into the array "terms".  Since these terms are themselves polynomials, we'll need another array "workspace" to calculate those...
	terms[ 0 ] = eta0;

	// Some powers of sin(theta) cos(theta) that we'll need later:
	sc = s * c;
	sc2 = sc * sc;
	sc3 = sc2 * sc;
	sc4 = sc2 * sc2;
	sc5 = sc2 * sc3;
	sc6 = sc3 * sc3;
	sc7 = sc4 * sc3;

	// Calculate e1 and put it in terms[1], see the middle of page 151:
	workspace[ 0 ] = ( (2.0*s*s) - 1.0 ) / ( 3.0 * s * c );
	workspace[ 1 ] = -evalpoly( co1, s*s ) / (36 * sc2);
	workspace[ 2 ] = evalpoly( co2, s*s ) / (1620 * sc3);
	workspace[ 3 ] = evalpoly( co3, s*s ) / (6480 * sc4);
	workspace[ 4 ] = evalpoly( co4, s*s ) / (90720 * sc5);
	workspace[ 5 ] = 0.0;
	terms[ 1 ] = evalpoly( workspace, eta0 );

	// Now evaluate e2 and put it in terms[2]:
	workspace[ 0 ] = -evalpoly( co5, s*s, 4 ) / (405 * sc3);
	workspace[ 1 ] = evalpoly( co6, s*s, 5 ) / (2592 * sc4);
	workspace[ 2 ] = -evalpoly( co7, s*s, 6 ) / (204120 * sc5);
	workspace[ 3 ] = -evalpoly( co8, s*s, 7 ) / (2099520 * sc6);
	workspace[ 4 ] = 0.0;
	workspace[ 5 ] = 0.0;
	terms[ 2 ] = evalpoly( workspace, eta0, 4 );

	// And e3, and put it in terms[3]:
	workspace[ 0 ] = evalpoly( co9, s*s ) / (102060 * sc5);
	workspace[ 1 ] = -evalpoly( co10, s*s ) / (20995200 * sc6);
	workspace[ 2 ] = evalpoly( co11, s*s ) / (36741600 * sc7);
	workspace[ 3 ] = 0.0;
	workspace[ 4 ] = 0.0;
	workspace[ 5 ] = 0.0;
	terms[ 3 ] = evalpoly( workspace, eta0 );

	// Bring the correction terms together to evaluate eta; this is the last equation on page 151:
	eta = evalpoly( terms, 1.0/r );

	// Now that we have eta we need to back solve for x, we seek the value of x that gives eta in Eq 3.2. The two methods used are described in section 5. Begin by defining a few variables we'll need later:
	s2 = s * s;
	c2 = c * c;
	alpha = c / s;
	alpha *= alpha;
	lu = ( -( eta*eta ) / ( 2.0*s2 ) ) + ln(s2) + ( c2 * ln(c2) / s2 );

	// Temme doesn't specify what value to switch on here, but this seems to work pretty well:
	if ( abs(eta) < 0.7 ) {
		// Small eta use the expansion Temme gives in the second equation of section 5, it's a polynomial in eta:
		workspace[ 0 ] = s * s;
		workspace[ 1 ] = s * c;
		workspace[ 2 ] = ( 1.0 - ( 2.0 * workspace[0] ) ) / 3.0;
		workspace[ 3 ] = evalpoly( co12, workspace[0] ) / ( 36.0 * s * c );
		workspace[ 4 ] = evalpoly( co13, workspace[0] ) /
			( 270.0 * workspace[0] * c * c );
		workspace[ 5 ] = 0.0;
		x = evalpoly( workspace, eta );
	} else {
		// If eta is large we need to solve Eq 3.2 more directly, begin by getting an initial approximation for x from the last equation on page 155, this is a polynomial in u:
		u = exp( lu );
		workspace[ 0 ] = u;
		workspace[ 1 ] = alpha;
		workspace[ 2 ] = 0;
		workspace[ 3 ] = 3 * alpha * ((3*alpha) + 1) / 6;
		workspace[ 4 ] = 4 * alpha * ((4*alpha) + 1) * ((4*alpha) + 2) / 24;
		workspace[ 5 ] = 5 * alpha * ((5*alpha) + 1) * ((5*alpha) + 2) *
			( (5*alpha) + 3) / 120;
		x = evalpoly( workspace, u );

		// At this point we may or may not have the right answer, Eq-3.2 has two solutions for x for any given eta, however the mapping in 3.2 is 1:1 with the sign of eta and x-sin^2(theta) being the same. So we can check if we have the right root of 3.2, and if not switch x for 1-x.  This transformation is motivated by the fact that the distribution is *almost* symmetric so 1-x will be in the right ball park for the solution:
		if ( ( x - s2 ) * eta < 0.0 ) {
			x = 1.0 - x;
		}
	}
	// The final step is a few Newton-Raphson iterations to clean up our approximation for x, this is pretty cheap in general, and very cheap compared to an incomplete beta evaluation. The limits set on x come from the observation that the sign of eta and x-sin^2(theta) are the same.
	if ( eta < 0.0 ) {
		lower = 0.0;
		upper = s2;
	} else {
		lower = s2;
		upper = 1.0;
	}
	// If our initial approximation is out of bounds then bisect:
	if ( x < lower || x > upper ) {
		x = ( lower + upper ) / 2;
	}
	roots = temmeRootFinder( -lu, alpha );

	// And iterate:
	x = newtonRaphsonIterate( roots, x, lower, upper, 32, 100 );
	return x;
} // end FUNCTION temme2()


// EXPORTS //

module.exports = temme2;

},{"./newton_raphson.js":48,"./root_finder.js":49,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/cos":63,"@stdlib/math/base/special/erfcinv":70,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/sin":143,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalpoly":160}],52:[function(require,module,exports){
/* eslint-disable max-statements, no-mixed-operators, max-len */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/detail/ibeta_inverse.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
var ln = require( '@stdlib/math/base/special/ln' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var temmeRootFinder = require( './root_finder.js' );
var newtonRaphsonIterate = require( './newton_raphson.js' );


// MAIN //

/**
* Carries out the third method by Temme.
*
* #### References
*
* - "Asymptotic Inversion of the Incomplete Beta Function", N.M. Temme, Journal of Computation and Applied Mathematics 41 (1992) 145-157, Section 4.
*
* @private
* @param {PositiveNumber} a - function parameter
* @param {PositiveNumber} b - function parameter
* @param {Probability} p - function parameter
* @param {Probability} q - probability equal to `1-p`
* @returns {number} function value
*/
function temme3( a, b, p, q ) {
	var cross;
	var roots;
	var lower;
	var upper;
	var eta0;
	var eta;
	var w10;
	var w12;
	var w13;
	var w14;
	var e1;
	var e2;
	var e3;
	var mu;
	var d2;
	var d3;
	var d4;
	var w2;
	var w3;
	var w4;
	var w5;
	var w6;
	var w7;
	var w8;
	var w9;
	var w1;
	var d;
	var w;
	var u;
	var x;

	// Begin by getting an initial approximation for the quantity eta from the dominant part of the incomplete beta:
	if ( p < q ) {
		eta0 = gammaincinv( p, b, true );
	} else {
		eta0 = gammaincinv( q, b, false );
	}
	eta0 /= a;

	// Define the variables and powers we'll need later on:
	mu = b / a;
	w = sqrt( 1.0 + mu );
	w2 = w * w;
	w3 = w2 * w;
	w4 = w2 * w2;
	w5 = w3 * w2;
	w6 = w3 * w3;
	w7 = w4 * w3;
	w8 = w4 * w4;
	w9 = w5 * w4;
	w10 = w5 * w5;
	d = eta0 - mu;
	d2 = d * d;
	d3 = d2 * d;
	d4 = d2 * d2;
	w1 = w + 1.0;
	w12 = w1 * w1;
	w13 = w1 * w12;
	w14 = w12 * w12;

	// Now we need to compute the perturbation error terms that convert eta0 to eta, these are all polynomials of polynomials. Probably these should be re-written to use tabulated data (see examples above), but it's less of a win in this case as we need to calculate the individual powers for the denominator terms anyway, so we might as well use them for the numerator-polynomials as well.
	// Refer to p154-p155 for the details of these expansions:
	e1 = (w + 2) * (w - 1) / (3 * w);
	e1 += (w3 + 9 * w2 + 21 * w + 5) * d / (36 * w2 * w1);
	e1 -= (w4 - 13 * w3 + 69 * w2 + 167 * w + 46) * d2 / (1620 * w12 * w3);
	e1 -= (7 * w5 + 21 * w4 + 70 * w3 + 26 * w2 - 93 * w - 31) * d3 / (6480 * w13 * w4);
	e1 -= (75 * w6 + 202 * w5 + 188 * w4 - 888 * w3 - 1345 * w2 + 118 * w + 138) * d4 / (272160 * w14 * w5);

	e2 = (28 * w4 + 131 * w3 + 402 * w2 + 581 * w + 208) * (w - 1) / (1620 * w1 * w3);
	e2 -= (35 * w6 - 154 * w5 - 623 * w4 - 1636 * w3 - 3983 * w2 - 3514 * w - 925) * d / (12960 * w12 * w4);
	e2 -= (2132 * w7 + 7915 * w6 + 16821 * w5 + 35066 * w4 + 87490 * w3 + 141183 * w2 + 95993 * w + 21640) * d2 / (816480 * w5 * w13);
	e2 -= (11053 * w8 + 53308 * w7 + 117010 * w6 + 163924 * w5 + 116188 * w4 - 258428 * w3 - 677042 * w2 - 481940 * w - 105497) * d3 / (14696640 * w14 * w6);

	e3 = -((3592 * w7 + 8375 * w6 - 1323 * w5 - 29198 * w4 - 89578 * w3 - 154413 * w2 - 116063 * w - 29632) * (w - 1)) / (816480 * w5 * w12);
	e3 -= (442043 * w9 + 2054169 * w8 + 3803094 * w7 + 3470754 * w6 + 2141568 * w5 - 2393568 * w4 - 19904934 * w3 - 34714674 * w2 - 23128299 * w - 5253353) * d / (146966400 * w6 * w13);
	e3 -= (116932 * w10 + 819281 * w9 + 2378172 * w8 + 4341330 * w7 + 6806004 * w6 + 10622748 * w5 + 18739500 * w4 + 30651894 * w3 + 30869976 * w2 + 15431867 * w + 2919016) * d2 / (146966400 * w14 * w7);

	// Combine eta0 and the error terms to compute eta (Second equation p155):
	eta = eta0 + e1 / a + e2 / (a * a) + e3 / (a * a * a);
	/*
		Now we need to solve Eq 4.2 to obtain x.  For any given value of
		eta there are two solutions to this equation, and since the distribution
		may be very skewed, these are not related by x ~ 1-x we used when
		implementing section 3 above.  However we know that:

			cross < x <= 1       ; iff eta < mu
				x == cross   ; iff eta == mu
				0 <= x < cross    ; iff eta > mu

		Where cross == 1 / (1 + mu)
		Many thanks to Prof Temme for clarifying this point. Therefore we'll just jump straight into Newton iterations to solve Eq 4.2 using these bounds, and simple bisection as the first guess, in practice this converges pretty quickly and we only need a few digits correct anyway:
	*/
	if ( eta <= 0 ) {
		eta = Number.MIN_VALUE;
	}
	u = eta - ( mu*ln(eta) ) + ( ( 1.0+mu ) * ln( 1.0+mu ) ) - mu;
	cross = 1.0 / ( 1.0 + mu );
	lower = eta < mu ? cross : 0.0;
	upper = eta < mu ? 1.0 : cross;
	x = (lower + upper) / 2.0;
	roots = temmeRootFinder( u, mu );
	x = newtonRaphsonIterate( roots, x, lower, upper, 32, 100 );
	return x;
} // end FUNCTION temme3()


// EXPORTS //

module.exports = temme3;

},{"./newton_raphson.js":48,"./root_finder.js":49,"@stdlib/math/base/special/gammaincinv":114,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/sqrt":152}],53:[function(require,module,exports){
module.exports={  "x": [0.86819659829914964,0.084374687343671845,0.41238169084542275,0.781327163581791,0.39940120060030021,0.17224262131065535,0.10983641820910456,0.88766733366683348,0.67997948974487255,0.56764832416208111,0.66550125062531273,0.68547123561780898,0.86869584792396204,0.66600050025012514,0.38941620810405209,0.38592146073036521,0.850223611805903,0.020470735367683845,0.56015957978989495,0.42985542771385699,0.94757728864432222,0.52770835417708861,0.47978039019509761,0.23764432216108056,0.77533616808404204,0.76684892446223119,0.64103801900950486,0.77383841920960483,0.54518209104552284,0.21517808904452229,0.7688459229614808,0.98552026013006511,0.92361330665332675,0.8906628314157079,0.3449829914957479,0.27658579289644825,0.23664582291145575,0.52021960980490245,0.58312506253126573,0.81577538769384694,0.49026463231615813,0.66799749874937475,0.073890445222611317,0.50174737368684341,0.67049374687343677,0.54817758879439726,0.5941085542771386,0.82975437718859435,0.55117308654327168,0.88816658329164588,0.77283991995998003,0.71342921460730369,0.44782841420710356,0.30654077038519262,0.525711355677839,0.78382341170585301,0.91163131565782896,0.60609054527263639,0.44033966983491751,0.78332416208104061,0.43085392696348179,0.79131215607803906,0.71193146573286648,0.40639069534767386,0.040440720360180094,0.57214157078539274,0.63554627313656831,0.70244572286143081,0.025962481240620314,0.7154262131065533,0.81627463731865935,0.92011855927963992,0.046431715857928969,0.73988944472236129,0.71392846423211609,0.45981040520260136,0.61008454227113562,0.64952526263131571,0.46929614807403708,0.68347423711855937,0.39990045022511261,0.37743421710855429,0.86520110055027522,0.63954027013506753,0.51422861430715361,0.91312906453226617,0.97054277138569289,0.25561730865432719,0.25461880940470238,0.045433216608304156,0.044933966983491752,0.22765932966483243,0.36595147573786896,0.10084992496248125,0.8497243621810906,0.049926463231615814,0.54867683841920967,0.26909704852426214,0.69445772886443224,0.53469784892446226,0.5406888444222111,0.27558729364682344,0.61657478739369687,0.63354927463731869,0.40589144572286145,0.74687893946973494,0.72640970485242629,0.36445372686343175,0.51372936468234121,0.37993046523261637,0.18722011005502753,0.3384927463731866,0.28008054027013507,0.65901100550275138,0.70893596798399205,0.52421360680340179,0.78532116058029022,0.32101900950475243,0.34997548774387194,0.01447973986993497,0.55167233616808409,0.49375937968984496,0.99151125562781395,0.19720510255127566,0.62306503251625822,0.31452876438219113,0.85222061030515261,0.26660080040020012,0.8632041020510256,0.54717908954477246,0.76135717858929475,0.08986643321660831,0.95406753376688347,0.24563231615807907,0.45481790895447727,0.52271585792896458,0.26110905452726363,0.59111305652826418,0.42685992996498251,0.82376338169084551,0.55716408204102053,0.41787343671835919,0.49226163081540775,0.35347023511755882,0.77982941470735379,0.4258614307153577,0.73489694847423714,0.087869434717358683,0.23864282141070536,0.89565532766383205,0.23464882441220614,0.93359829914957482,0.80878589294647329,0.98851575787893953,0.67348924462231119,0.86170635317658839,0.37344022011005507,0.95806153076538281,0.96455177588794405,0.67149224612306158,0.99201050525262635,0.56265582791395707,0.17823361680840422,0.71642471235617811,0.10783941970985493,0.20169834917458732,0.13779439719859932,0.069896448224112062,0.053920460230115062,0.71292996498249128,0.65351925962981494,0.39291095547773891,0.73939019509754889,0.70993446723361686,0.46829764882441227,0.93859079539769896,0.90763731865932973,0.13030565282641321,0.74288494247123571,0.85421760880440223,0.46430365182591299,0.52471285642821419,0.62805752876438226,0.59061380690345178,0.27858279139569786,0.7413871935967985,0.038443721860930466,0.19620660330165085,0.30554227113556781,0.084873936968484248,0.53020460230115063,0.9316013006503252,0.10035067533766884,0.21018559279639823,0.76235567783891955,0.95356828414207107,0.78032866433216619,0.36744922461230617,0.53819259629814908,0.72491195597798908,0.80778739369684849,0.41487793896948477,0.57663481740870437,0.3909139569784893,0.061409204602301155,0.92161630815407714,0.69295997998999503,0.85172136068034021,0.97653376688344184,0.55067383691845928,0.56415357678839428,0.2636053026513257,0.36694997498749377,0.87868084042021022,0.086371685842921472,0.041938469234617311,0.005493246623311656,0.11982141070535268,0.68996448224112061,0.31353026513256632,0.4663006503251626,0.43784342171085544,0.38042971485742877,0.52970535267633823,0.83824162081040532,0.018972986493246625,0.18971635817908955,0.26160830415207609,0.50673986993496756,0.57513706853426716,0.25312106053026517,0.13629664832416211,0.25362031015507758,0.96854577288644328,0.50823761880940477,0.30104902451225618,0.45581640820410207,0.45931115557778895,0.21118409204602304,0.96255477738869444,0.96954427213606809,0.11183341670835419,0.56914607303651832,0.019472236118059032,0.42136818409204607,0.34847773886943473,0.72591045522761388,0.35546723361680843,0.83973936968484253,0.44732916458229116,0.005992496248124062,0.86470185092546281,0.4787818909454728,0.38142821410705358,0.89915007503751887,0.026461730865432718,0.76784742371185599,0.53320010005002505,0.92511105552776396,0.90014857428714368,0.72241570785392706,0.31752426213106555,0.10184842421210606,0.93210055027513761,0.36245672836418213,0.18023061530765383,0.66699899949974994,0.074888944472236124,0.5661505752876439,0.75786243121560781,0.49525712856428217,0.69945022511255639,0.33000550275137569,0.099851425712856434,0.79181140570285147,0.9166238119059531,0.98651875937968991,0.25961130565282642,0.37044472236118065,0.20669084542271138,0.58562131065532774,0.26560230115057532,0.82875587793896954,0.9445817908954478,0.50474287143571794,0.83175137568784396,0.24413456728364183,0.69895097548774388,0.5252121060530266,0.48077888944472241,0.25411955977988998,0.58512206103051534,0.73040370185092551,0.64902601300650331,0.31952126063031516,0.4717923961980991,0.52720910455227621,0.057914457228614311,0.21567733866933469,0.54268584292146083,0.17324112056028015,0.43584642321160583,0.28507303651825916,0.021469234617308656,0.57064382191095553,0.11882291145572788,0.70494197098549283,0.72191645822911465,0.072392696348174093,0.64503201600800408,0.46480290145072539,0.93609454727363695,0.54318509254627323,0.24163831915957981,0.64203651825912966,0.35396948474237122,0.018473736868434218,0.069397198599299659,0.78631965982991503,0.064903951975988,0.40539219609804905,0.01547823911955978,0.38691995997999001,0.20469384692346174,0.16225762881440722,0.050425712856428218,0.22815857928964484,0.88217558779389704,0.55616558279139572,0.78831665832916464,0.094359679839919969,0.18222761380690347,0.69096298149074542,0.040939969984992497,0.84772736368184098,0.45631565782891448,0.86420260130065041,0.41088394197098554,0.49076388194097054,0.86969434717358685,0.012482741370685342,0.51822261130565284,0.87019359679839925,0.64003951975987994,0.97703301650825425,0.2631060530265133,0.42286593296648328,0.68447273636818418,0.47578639319659832,0.090864932466233131,0.24663081540770387,0.17473886943471736,0.90064782391195608,0.94807653826913463,0.38092896448224117,0.029457228614307156,0.15876288144072037,0.31203251625812911,0.7289059529764883,0.51073386693346678,0.57413856928464235,0.34747923961980992,0.52820760380190102,0.056416708354177093,0.067899449724862435,0.35846273136568285,0.25262181090545277,0.81078289144572291,0.40738919459729867,0.35996048024012012,0.88866583291645829,0.31602651325662834,0.52221660830415217,0.304543771885943,0.94957428714357184,0.64603051525762889,0.83225062531265637,0.40439369684842424,0.87268984492246127,0.97503601800900463,0.65302001000500254,0.90663881940970492,0.10584242121060532,0.078383691845922962,0.89865082541270647,0.86619959979990002,0.41188244122061035,0.88517108554277146,0.30304602301150579,0.65651475737868936,0.93809154577288656,0.7408879439719861,0.17374037018509256,0.9975022511255629,0.55766333166583293,0.29605652826413209,0.098353676838419224,0.27758429214607305,0.35796348174087045,0.33050475237618815,0.29156328164082046,0.89216058029014511,0.14378539269634819,0.34098899449724868,0.38841770885442722,0.88467183591795906,0.2980535267633817,0.74737818909454734,0.093361180590295162,0.94558029014507261,0.82625962981490753,0.96105702851425723,0.97353826913456731,0.71442771385692849,0.032951975987994001,0.68247573786893456,0.69395847923961984,0.31303101550775392,0.5936093046523262,0.3040445222611306,0.32950625312656329,0.80628964482241128,0.71991945972986504,0.63754327163581792,0.13280190095047525,0.61757328664332167,0.21867283641820912,0.33200250125062536,0.943583291645823,0.47378939469734871,0.79830165082541282,0.38642071035517761,0.20719009504752378,0.74538119059529773,0.80129714857428724,0.93659379689844935,0.43384942471235621,0.35646573286643324,0.26260680340170089,0.22716008004002003,0.13479889944972487,0.037445222611305659,0.059911455727863938,0.28307603801900955,0.66400350175087552,0.034449724862431218,0.28906703351675839,0.1522726363181591,0.95906003001500761,0.42036968484242127,0.54967533766883447,0.30204752376188099,0.42835767883941972,0.74038869434717369,0.078882941470735379,0.77883091545772898,0.66899599799899956,0.92810655327663838,0.18572236118059032,0.27259179589794902,0.78931515757878945,0.92111705852926473,0.58761830915457736,0.35746423211605804,0.4782826413206604,0.91013356678339175,0.14777938969484744,0.70444272136068042,0.12331615807903953,0.1053431715857929,0.18372536268134068,0.41587643821910958,0.08038069034517259,0.03045572786393197,0.38991545772886449,0.75137218609304657,0.53869184592296149,0.86020860430215118,0.030954977488744376,0.14328614307153578,0.64353426713356687,0.37493796898449228,0.38342521260630319,0.84622961480740377,0.15776438219109556,0.19371035517758881,0.074389694847423721,0.034948974487243628,0.92910505252626319,0.39440870435217612,0.051424212106053031,0.72091795897948985,0.26859779889944974,0.99850075037518771,0.53270085042521265,0.84822661330665339,0.16525312656328164,0.70843671835917965,0.77234067033516762,0.44483291645822914,0.49975037518759385,0.49875187593796905,0.73539619809904955,0.11283191595797901,0.03944222111055528,0.94258479239619819,0.86120710355177599,0.16475387693846924,0.61507703851925966,0.4722916458229115,0.45881190595297655,0.42386443221610809,0.93709304652326175,0.90913506753376694,0.91961930965482752,0.10833866933466735,0.63005452726363187,0.37943121560780391,0.86919509754877444,0.57563631815907956,0.5806288144072036,0.93759229614807416,0.4658014007003502,0.9980015007503753,0.2905647823911956,0.34697998999499752,0.61907103551775888,0.51972036018009005,0.9845217608804403,0.024963981990995501,0.77783241620810417,0.98601950975487751,0.022966983491745877,0.73339919959979993,0.74438269134567292,0.83274987493746877,0.68896598299149581,0.62006953476738369,0.30054977488744372,0.40489294647323665,0.39390945472736372,0.062906953476738373,0.29905202601300651,0.068897948974487255,0.23564732366183094,0.70544122061030523,0.69645472736368186,0.40888694347173588,0.44882691345672843,0.70643971985993004,0.40838769384692347,0.67099299649824917,0.50324512256128073,0.60159729864932476,0.41537718859429718,0.29256178089044527,0.73240070035017513,0.81377838919459733,0.7558654327163582,0.29206253126563286,0.78881590795397705,0.48876688344172092,0.33250175087543776,0.10234767383691847,0.3919124562281141,0.53969034517258629,0.032452726363181597,0.24063981990995501,0.61857178589294648,0.31852276138069036,0.083875437718859441,0.017974487243621814,0.3374942471235618,0.3779334667333667,0.6600095047523763,0.40189744872436223,0.87718309154577301,0.22666083041520763,0.16774937468734369,0.98102701350675348,0.90564032016008011,0.67199149574787398,0.95506603301650839,0.0733911955977989,0.39840270135067535,0.22865782891445724,0.82825662831415714,0.17973136568284143,0.57763331665832918,0.023466233116558283,0.50624062031015515,0.65202151075537773,0.50723911955977996,0.53569634817408707,0.15077488744372186,0.46280590295147578,0.89815157578789406,0.54667983991996005,0.24363531765882943,0.41987043521760886,0.033950475237618814,0.32800850425212608,0.64453276638319168,0.85771235617808916,0.75886093046523273,0.48177738869434722,0.30853776888444223,0.66500200100050033,0.10933716858429215,0.32051975987993997,0.54767833916958486,0.007989494747373687,0.67748324162081042,0.31802351175587795,0.98002851425712867,0.44383441720860434,0.48477288644322164,0.6874682341170586,0.40688994497248626,0.002497748874437219,0.13230265132566285,0.46879689844922467,0.65152226113056533,0.0039954977488744371,0.60359429714857438,0.50773836918459236,0.48277588794397203,0.55017458729364688,0.62106803401700861,0.67798249124562282,0.92211555777888954,0.68946523261630821,0.54418359179589804,0.061908454227113566,0.052422711355677845,0.97603451725862944,0.031454227113556783,0.39540720360180093,0.1457823911955978,0.64253576788394207,0.92461180590295156,0.98901500750375193,0.75836168084042033,0.87119209604802406,0.44982541270635323,0.31652576288144074,0.60059879939969985,0.60409354677338678,0.71093296648324167,0.76435267633816917,0.88017858929464743,0.25212256128064037,0.98152626313156588,0.84672886443221618,0.71842171085542772,0.54568134067033525,0.83025362681340675,0.95256978489244626,0.75087293646823416,0.065403201600800404,0.83374837418709358,0.863703351675838,0.8097843921960981,0.84073786893446734,0.00499399699849925,0.28457378689344676,0.45681490745372688,0.96555027513756886,0.33300100050025017,0.17124412206103054,0.12281690845422713,0.18622161080540273,0.63704402201100552,0.84373336668334176,0.80029864932466244,0.021968484242121063,0.2341495747873937,0.97952926463231627,0.56964532266133072,0.90114707353676848,0.63654477238619311,0.59960030015007504,0.7284067033516759,0.96355327663831924,0.34248674337168589,0.14977638819409705,0.0099864932466233111,0.68197648824412216,0.9840225112556279,0.594607803901951,0.12681090545272639,0.17274187093546775,0.83924012006003013,0.045932466233116566,0.85122211105552781,0.98951425712856433,0.57363931965982995,0.59860180090045023,0.17024562281140571,0.56515207603801909,0.95306903451725866,0.11682591295647825,0.50224662331165582,0.14827863931965984,0.62506203101550784,0.72041870935467744,0.37693496748374189,0.20069984992496251,0.42186743371685848,0.27908204102051026,0.72990445222611311,0.44682991495747876,0.58112806403201611,0.90963431715857934,0.53170235117558784,0.54468284142071044,0.37094397198599305,0.6065897948974488,0.050924962481240628,0.71143221610805407,0.20020060030015011,0.16175837918959482,0.062407703851925969,0.37144322161080545,0.78681890945472743,0.90214557278639329,0.75436768384192099,0.66300500250125072,0.42885692846423218,0.11333116558279141,0.87169134567283646,0.17523811905952977,0.63305002501250629,0.036446723361680845,0.60009954977488744,0.028957978989494752,0.91562531265632829,0.63155227613806908,0.65801250625312657,0.23115407703851928,0.1687478739369685,0.6749869934967484,0.75237068534267137,0.5531700850425213,0.41338019009504756,0.33399949974987497,0.082377688844422217,0.30753926963481742,0.78781740870435224,0.8092851425712857,0.49176238119059534,0.92610955477738877,0.46979539769884948,0.47428864432216111,0.39640570285142573,0.98701800900450232,0.16275687843921963,0.8627048524262132,0.57314007003501755,0.57913106553276639,0.77933016508254138,0.44083891945972992,0.88367333666833425,0.85271985992996502,0.71742321160580291,0.087370185092546279,0.75286993496748378,0.66999449724862437,0.39890195097548775,0.0014992496248124063,0.85721310655327676,0.96804652326163088,0.34148824412206108,0.016975987993997001,0.013481240620310156,0.90613956978489252,0.1527718859429715,0.25162331165582791,0.27608654327163584,0.58362431215607813,0.81327913956978493,0.31402951475737872,0.14228764382191098,0.97803151575787906,0.87468684342171088,0.82076788394197109,0.36495297648824415,0.65052376188094052,0.61308004002001004,0.44133816908454232,0.93509604802401214,0.056915957978989504,0.45731415707853929,0.93909004502251137,0.91462681340670338,0.50524212106053035,0.11133416708354178,0.6350470235117559,0.3914132066033017,0.98202551275637828,0.45082391195597804,0.12980640320160081,0.51572636318159082,0.9970030015007505,0.34198749374687348,0.16675087543771888,0.052921960980490249,0.23614657328664335,0.65401850925462734,0.48227663831915962,0.13929214607303653,0.87518609304652328,0.24762931465732868,0.21717508754377191,0.78482191095547782,0.25611655827913959,0.9036433216608305,0.74588044022011013,0.95856078039019521,0.48976538269134573,0.64652976488244129,0.48776838419209612,0.76485192596298157,0.23514807403701854,0.7968039019509755,0.099352176088044031,0.38242671335667838,0.72441270635317667,0.66150725362681351,0.45232166083041525,0.49276088044022015,0.20419459729864933,0.12381540770385194,0.24713006503251628,0.39690495247623814,0.70743821910955484,0.26210755377688849,0.057415207603801907,0.6345477738869435,0.092362681340670341,0.051923461730865435,0.97303901950975491,0.84223561780890455,0.15976138069034518,0.79880090045022523,0.58811755877938976,0.29955127563781891,0.51672486243121563,0.73090295147573792,0.15426963481740871,0.77733316658329166,0.60908604302151081,0.29555727863931969,0.48377438719359683,0.73839169584792408,0.24113906953476741,0.66949524762381196,0.97253976988494251,0.48726913456728366,0.24912706353176589,0.87967933966983503,0.81427763881940973,0.77483691845922964,0.090365682841420714,0.59810255127563783,0.79280990495247627,0.68047873936968495,0.90863581790895454,0.89415757878939472,0.060909954977488752,0.91862081040520271,0.13529814907453727,0.72291495747873946,0.30953626813406704,0.78981440720360185,0.85571535767883944,0.011484242121060532,0.095358179089544776,0.46030965482741376,0.042437718859429721,0.064404702351175597,0.21368034017008505,0.57963031515757879,0.010485742871435718,0.18871785892946474,0.78582041020510263,0.33649574787393699,0.61158229114557283,0.11582741370685344,0.20519309654827417,0.40089894947473742,0.22316608304152077,0.61058379189594802,0.5132301150575288,0.36545222611305656,0.68097798899449735,0.21068484242121063,0.85321910955477742,0.11932216108054028,0.77184142071035522,0.23814357178589296,0.72541120560280148,0.63804252126063032,0.97453676838419223,0.85921010505252637,0.71942021010505264,0.74887593796898455,0.88317408704352185,0.55217158579289649,0.32601150575287646,0.92660880440220117,0.61607553776888446,0.059412206103051535,0.52071885942971485,0.058912956478239124,0.38392446223111559,0.59011455727863937,0.25861280640320161,0.7279074537268635,0.3035452726363182,0.32201750875437724,0.28357528764382195,0.5411880940470235,0.9161245622811407,0.46080890445222616,0.12780940470235119,0.9306028014007004,0.42086893446723367,0.080879939969984993,0.24613156578289147,0.19420960480240121,0.071394197098549286,0.45032466233116564,0.60559129564782399,0.27159329664832421,0.30803851925962983,0.96205552776388203,0.9171230615307655,0.32151825912956483,0.2975542771385693,0.83624462231115559,0.24263681840920462,0.76085792896448234,0.54368434217108563,0.19920210105052527,0.81277988994497252,0.79081290645322666,0.24463381690845426,0.41737418709354679,0.41437868934467237,0.73439769884942474,0.4388419209604803,0.52870685342671342,0.86669884942471243,0.8901635817908955,0.39590645322661333,0.67948024012006014,0.33150325162581296,0.063905452726363193,0.91362831415707857,0.36045972986493252,0.34897698849424713,0.11632666333166584,0.75486693346673339,0.12231765882941471,0.9850210105052527,0.5002496248124062,0.36994547273636824,0.48926613306653333,0.98751725862931472,0.97553526763381704,0.27109404702351175,0.3444837418709355,0.20918709354677339,0.075887443721860931,0.74338419209604811,0.22616158079039522,0.8222656328164083,0.55916108054027014,0.51922111055527764,0.53120310155077544,0.15476888444222112,0.88916508254127069,0.23714507253626815,0.029956478239119563,0.61707403701850927,0.0044947473736868439,0.10134917458729366,0.97753226613306665,0.4248629314657329,0.77333916958479243,0.22366533266633318,0.15926213106553277,0.39341020510255131,0.55866183091545774,0.42785842921460732,0.24313606803401702,0.78082791395697859,0.71692396198099051,0.046930965482741373,0.9440825412706354,0.69495697848924465,0.12131915957978991,0.63604552276138071,0.28756928464232118,0.2331510755377689,0.69994947473736879,0.62955527763881947,0.8227648824412207,0.67648474237118561,0.15826363181590797,0.81477688844422214,0.014978989494747377,0.48327513756878443,0.57613556778389197,0.52371435717858938,0.93559529764882454,0.013980490245122563,0.99101200600300154,0.17074487243621814,0.46230665332666337,0.60509204602301159,0.61208154077038524,0.2096863431715858,0.95207053526763386,0.20619159579789897,0.79730315157578791,0.12181840920460231,0.51223161580790399,0.11832366183091547,0.69695397698849426,0.19470885442721361,0.26060980490245123,0.69845172586293147,0.38192746373186598,0.80678889444722368,0.29306103051525767,0.24812856428214108,0.1922126063031516,0.80079789894947484,0.91262981490745376,0.012981990995497749,0.29455877938969488,0.75037368684342176,0.84573036518259137,0.7963046523261631,0.65252076038019013,0.26959629814907454,0.96055777888944482,0.73589544772386195,0.95057278639319664,0.94158629314657338,0.8766838419209606,0.61357928964482245,0.30604152076038021,0.075388194097048528,0.73689394697348676,0.7823256628314158,0.10284692346173087,0.83674387193596811,0.6480275137568785,0.40988544272136074,0.76535117558779397,0.91812156078039031,0.66649974987493754,0.33899199599799901,0.63255077538769389,0.80329414707353686,0.40339519759879944,0.30504302151075541,0.31153326663331671,0.99600450225112569,0.21318109054527265,0.28257678839419714,0.088867933966983503,0.68696898449224619,0.077884442221110559,0.17923211605802902,0.94508104052026021,0.26510305152576291,0.21417958979489746,0.62705902951475745,0.4183726863431716,0.88616958479239627,0.40289594797398703,0.1932111055527764,0.35696498249124564,0.22166833416708356,0.43984042021010511,0.20269684842421212,0.0094872436218109077,0.95007353676838424,0.41887193596798405,0.55466783391695851,0.1692471235617809,0.60209654827413717,0.96505102551275646,0.9715412706353177,0.96754727363681847,0.03994147073536769,0.57264082041020514,0.80279489744872445,0.77084292146073041,0.027460230115057532,0.37393946973486747,0.96305402701350684,0.19770435217608806,0.64553126563281649,0.56565132566283149,0.81128214107053531,0.46729914957478741,0.57713406703351677,0.56065882941470735,0.15327113556778391,0.84423261630815416,0.34797848924462232,0.13380040020010006,0.3789319659829915,0.93309904952476241,0.63904102051025513,0.47478789394697352,0.85471685842921463,0.047929464732366187,0.51772336168084043,0.18921710855427715,0.90264482241120569,0.086870935467733876,0.33499799899949978,0.62356428214107062,0.56115807903951975,0.68646973486743379,0.9575622811405704,0.22066983491745876,0.86719809904952483,0.29505802901450728,0.65951025512756378,0.26460380190095051,0.88966433216608309,0.44633066533266635,0.31003551775887944,0.1697463731865933,0.51472786393196601,0.9041425712856429,0.69795247623811907,0.12731015507753879,0.82775737868934474,0.57114307153576793,0.87368834417208607,0.32451375687843925,0.701447223611806,0.033451225612806404,0.85970935467733878,0.99550525262631329,0.2336503251625813,0.25811355677838921,0.070894947473736869,0.62256578289144582,0.22416458229114558,0.37194247123561786,0.70594047023511763,0.40788844422211107,0.74987443721860936,0.53369934967483745,0.15526813406703352,0.95556528264132079,0.7693451725862932,0.096855927963982,0.81827163581790907,0.47329014507253631,0.59311005502751379,0.98052776388194107,0.49326013006503255,0.35247173586793401,0.96005852926463242,0.0084887443721860939,0.55966033016508254,0.30704002001000502,0.80728814407203608,0.55267083541770889,0.21817358679339671,0.69345922961480744,0.34947623811905953,0.62905602801400706,0.80179639819909965,0.11383041520760381,0.71892096048024023,0.70194647323661841,0.1293071535767884,0.45531715857928967,0.2576143071535768,0.84722811405702858,0.18122911455727866,0.36894697348674338,0.53419859929964986,0.50374437218609314,0.47029464732366189,0.43684492246123063,0.83724312156078051,0.54218659329664842,0.36295597798899454,0.016476738369184594,0.24962631315657832,0.53519709854927466,0.43285092546273141,0.097854427213606807,0.076386693346673348,0.41637568784392198,0.18322611305652828,0.10384542271135569,0.44333516758379193,0.9710420210105053,0.50124812406203101,0.058413706853426721,0.47628564282141073,0.036945972986493249,0.076885942971485752,0.26610155077538772,0.58711905952976495,0.35596648324162083,0.79330915457728868,0.52670985492746381,0.38741920960480242,0.083376188094047038,0.98352326163081549,0.29356028014007007,0.23265182591295649,0.8507228614307154,0.51023461730865438,0.62755827913956985,0.32551225612806406,0.18422461230615308,0.16725012506253129,0.49126313156578294,0.92261480740370194,0.61407853926963485,0.19820360180090046,0.2511240620310155,0.86220560280140079,0.41687493746873439,0.35496798399199603,0.69146223111555782,0.34048974487243627,0.73190145072536272,0.48427363681840924,0.56315507753876948,0.99500600300150088,0.35896198099049526,0.42636068034017011,0.58661980990495255,0.68397348674337177,0.77633466733366685,0.56864682341170592,0.11083491745872938,0.035947473736868435,0.94907503751875943,0.0019984992496248125,0.58861680840420216,0.065902451225612807,0.60858679339669841,0.10434467233616809,0.33999049524762381,0.1283086543271636,0.79430765382691348,0.23015557778889448,0.68147723861930976,0.13130415207603804,0.17773436718359181,0.93958929464732377,0.015977488744372187,0.89765232616308166,0.041439219609804907,0.67898099049524763,0.43434867433716862,0.63055377688844427,0.957063031515758,0.23065482741370688,0.14628164082041023,0.69246073036518263,0.10684092046023012,0.70793746873436725,0.13879289644822412,0.48577138569284645,0.023965482741370687,0.038942971485742876,0.54168734367183591,0.28657078539269637,0.02246773386693347,0.23215257628814409,0.043935467733866938,0.21168334167083544,0.99400750375187608,0.69046373186593302,0.6475282641320661,0.42735917958979491,0.22566233116558282,0.42236668334167088,0.89515607803901953,0.75686393196598301,0.47778339169584794,0.30903701850925464,0.88067783891945983,0.048927963981991,0.89315907953976992,0.99250975487743875,0.39490795397698852,0.0883686843421711,0.26011055527763882,0.61807253626813408,0.42935617808904458,0.84473186593296656,0.27309104552276142,0.76585042521260638,0.25511805902951479,0.67398849424712359,0.66200650325162591,0.90164632316158089,0.40039969984992502,0.18472386193096549,0.091863431715857938,0.64852676338169091,0.45781340670335169,0.18522311155577789,0.83874087043521772,0.51722411205602803,0.8761845922961482,0.44183741870935472,0.57014457228614313,0.17873286643321662,0.33100400200100055,0.68597048524262139,0.55516708354177091,0.28607153576788397,0.79979939969985003,0.81976938469234628,0.98801650825412712,0.82026863431715868,0.67298999499749879,0.3504747373686844,0.72940520260130071,0.51872186093046524,0.19021560780390195,0.31702501250625315,0.3379934967483742,0.72690895447723869,0.90464182091045531,0.74238569284642331,0.94607953976988501,0.86070785392696358,0.83075287643821916,0.36345522761380694,0.62406353176588303,0.45831265632816415,0.95606453226613319,0.88666883441720867,0.53220160080040024,0.89665382691345685,0.047430215107553783,0.94707803901950982,0.24513306653326666,0.30005052526263132,0.12531315657828915,0.69745322661330666,0.56365432716358188,0.12481390695347674,0.36944622311155578,0.28557228614307156,0.16425462731365684,0.64403351675837928,0.15676588294147076,0.43035467733866939,0.5127308654327164,0.87318909454727367,0.47728414207103553,0.20768934467233618,0.91213056528264136,0.14128914457228617,0.91912006003001512,0.79380840420210108,0.82925512756378195,0.27808354177088546,0.89265982991495751,0.79231065532766387,0.76734817408704359,0.66450275137568793,0.028458729364682345,0.92760730365182598,0.48127813906953482,0.12431465732866434,0.28057978989494747,0.85871085542771397,0.65851175587793898,0.93259979989995001,0.37443871935967987,0.82675887943971993,0.41288094047023516,0.68297498749374697,0.55666483241620812,0.16026063031515758,0.2506248124062031,0.59560630315157581,0.4727908954477239,0.1517733866933467,0.85671385692846436,0.15377038519259631,0.71243071535767888,0.19970135067533767,0.69545622811405705,0.92860580290145078,0.11532816408204104,0.51123311655827919,0.33549724862431218,0.57463781890945476,0.14029064532266133,0.69196148074037023,0.11732516258129065,0.49425862931465736,0.28956628314157079,0.58612056028014015,0.70943521760880446,0.59910105052526264,0.5671490745372687,0.52321510755377698,0.085872436218109069,0.2641045522761381,0.28157828914457234,0.89964932466233127,0.56814757378689351,0.27059479739869935,0.33449874937468738,0.92960430215107559,0.14178839419709857,0.14078989494747374,0.16075987993996999,0.94857578789394703,0.74637968984492253,0.29855277638819411,0.87918009004502262,0.48027963981991001,0.15127413706853429,0.27508804402201104,0.91512606303151578,0.73889094547273648,0.65501700850425215,0.97004352176088049,0.23165332666333169,0.30254677338669339,0.12631165582791395,0.74488194097048532,0.96604952476238126,0.82725812906453233,0.45282091045522765,0.9031440720360181,0.36145822911455733,0.39241170585292651,0.82526113056528272,0.46679989994997501,0.99350825412706356,0.6340485242621311,0.61557628814407206,0.13829364682341172,0.96155627813906963,0.34348524262131069,0.13579739869934968,0.83125212606303156,0.74837668834417215,0.87219059529764886,0.86769734867433723,0.58162731365682852,0.16824862431215609,0.16625162581290648,0.48527213606803404,0.73739319659829916,0.84023861930965493,0.90813656828414213,0.55566633316658331,0.32900700350175088,0.65551625812906456,0.077385192596298155,0.20818859429714859,0.96405252626313165,0.83424762381190598,0.95456678339169587,0.28806853426713358,0.0064917458729364689,0.53919109554777389,0.13429964982491246,0.97853076538269146,0.19071485742871438,0.48676988494247125,0.89715307653826926,0.65102301150575292,0.81228064032016012,0.22216758379189597,0.58012956478239119,0.49775337668834424,0.64303501750875447,0.128807903951976,0.90713806903451732,0.79780240120060042,0.44583141570785395,0.94008854427213617,0.75985942971485754,0.99001350675337674,0.10634167083541772,0.066401700850425224,0.19520810405202604,0.33949124562281141,0.28707003501750877,0.79930015007503763,0.60808754377188601,0.4318524262131066,0.11432966483241622,0.82426263131565791,0.66350425212606312,0.066900950475237628,0.69595547773886945,0.002996998499249625,0.59710405202601302,0.32251675837918964,0.73789244622311156,0.40239669834917463,0.42336518259129569,0.75336918459229618,0.34598149074537271,0.60309504752376197,0.31902201100550276,0.65701400700350177,0.026960980490245125,0.60459279639819918,0.011983491745872939,0.51173236618309159,0.84922511255627819,0.55816258129064533,0.75386843421710859,0.31552726363181594,0.19570735367683845,0.80828664332166089,0.82326413206603311,0.32850775387693848,0.042936968484242125,0.85821160580290157,0.41937118559279646,0.27359029514757383,0.60958529264632322,0.22017058529264635,0.79530615307653829,0.1757373686843422,0.44233666833416713,0.32501300650325166,0.4313531765882942,0.67598549274637321,0.33350025012506257,0.17423961980990496,0.60109804902451236,0.81677388694347175,0.39041470735367689,0.89465682841420713,0.3849229614807404,0.46180740370185097,0.91762231115557791,0.05591745872936469,0.89166133066533271,0.6470290145072537,0.88167633816908464,0.49675487743871938,0.83324912456228117,0.9565637818909456,0.2396413206603302,0.82176638319159589,0.093860430215107565,0.38891695847923963,0.3110340170085043,0.23914207103551777,0.27408954477238623,0.95157128564282145,0.14678089044522263,0.99300900450225116,0.41387943971985997,0.7149269634817409,0.54618059029514765,0.6075882941470736,0.81527613806903454,0.044434717358679342,0.063406203101550776,0.99450675337668848,0.29655577788894449,0.15576738369184592,0.16575237618809407,0.10883791895947975,0.53619559779889947,0.18771935967983994,0.11233266633316659,0.72341420710355187,0.32750925462731367,0.77034367183591801,0.64153726863431726,0.21218259129564784,0.2571150575287644,0.35946123061530766,0.14927713856928465,0.76335417708854436,0.28207753876938474,0.77134217108554282,0.59261080540270139,0.89615457728864445,0.80579039519759887,0.56465282641320669,0.88716808404202108,0.14278689344672338,0.7818264132066034,0.72740820410205109,0.62655977988994505,0.1452831415707854,0.07189344672336169,0.048428714357178597,0.78432266133066542,0.079382191095547783,0.97903001500750386,0.65751325662831417,0.88267483741870945,0.10334617308654329,0.62156728364182101,0.5401895947973987,0.45381940970485246,0.22116908454227116,0.31502801400700353,0.82576038019009512,0.024464732366183094,0.63854177088544273,0.46130815407703857,0.84323411705852935,0.57813256628314158,0.22516308154077042,0.44832766383191602,0.043436218109054535,0.3784327163581791,0.85621460730365184,0.6205687843921962,0.05541820910455228,0.003496248124062031,0.94657878939469742,0.94308404202101059,0.94108704352176098,0.16125912956478242,0.17174337168584294,0.079881440720360186,0.17673586793396701,0.9311020510255128,0.13180340170085045,0.20868784392196099,0.84872586293146579,0.95107203601800905,0.12581240620310155,0.61108304152076043,0.97403751875937972,0.86570035017508762,0.99051275637818914,0.59510705352676341,0.29006553276638319,0.28856778389194598,0.42436368184092049,0.87818159079539782,0.26710005002501253,0.22965632816408207,0.65451775887943975,0.67249074537268638,0.08137918959479741,0.54917608804402207,0.29106403201600806,0.83574537268634319,0.089367183591795907,0.16325612806403203,0.20119909954977491,0.6884667333666834,0.62456278139069543,0.76035867933966994,0.49475787893946976,0.068398699349674838,0.36794847423711857,0.89365832916458232,0.19121410705352679,0.37543721860930468,0.18172836418209107,0.31053476738369185,0.44932616308154083,0.87568534267133569,0.91063281640820415,0.73389844922461234,0.38292596298149079,0.76385342671335676,0.84173636818409214,0.77833166583291657,0.76984442221110561,0.82476188094047032,0.92061780890445233,0.006990995497748875,0.32701000500250127,0.054419709854927466,0.017475237618809408,0.28407453726863435,0.2166758379189595,0.32401450725362685,0.63205152576288148,0.3439844922461231,0.80529114557278647,0.6605087543771887,0.49575637818909457,0.78282491245622821,0.10734017008504253,0.054918959479739876,0.26809854927463733,0.010984992496248125,0.92311405702851435,0.67698399199599801,0.62556128064032024,0.25911205602801402,0.45132316158079044,0.4792811405702852,0.84523111555777897,0.32651075537768887,0.15726513256628316,0.21268184092046025,0.7004487243621812,0.45431865932966486,0.80479189594797407,0.75936018009004513,0.24213756878439222,0.70693896948474244,0.30154827413706858,0.85371835917958983,0.384423711855928,0.27009554777388695,0.68497198599299658,0.7009479739869936,0.61957028514257129,0.7159254627313657,0.44433366683341674,0.035448224112056032,0.48627063531765885,0.39790345172586294,0.031953476738369187,0.18821860930465234,0.83524612306153079,0.20219759879939972,0.98302401200600309,0.70294497248624321,0.13679589794897451,0.63105302651325668,0.84273486743371695,0.14877788894447225,0.66849674837418716,0.22466383191595801,0.32002051025512757,0.092861930965482745,0.37643571785892949,0.097355177588794403,0.46380440220110059,0.94208554277138579,0.2970550275137569,0.8911620810405203,0.51622561280640322,0.74937518759379695,0.96654877438719367,0.34648074037018511,0.094858929464732372,0.38791845922961482,0.47079389694847429,0.80379339669834926,0.50923611805902957,0.6610080040020011,0.81028364182091051,0.43734417208604304,0.16375537768884443,0.43335017508754381,0.082876938469234621,0.87069284642321165,0.60259579789894957,0.58462281140570294,0.36844772386193098,0.096356678339169596,0.98252476238119069,0.36395447723861934,0.74388344172086052,0.50074887443721861,0.3854222111055528,0.61258079039519764,0.65002451225612812,0.44533216608304155,0.13330115057528766,0.73639469734867435,0.020969984992496249,0.025463231615807908,0.50574137068534275,0.79480690345172589,0.33699499749874939,0.1048439219609805,0.20369534767383693,0.75736318159079541,0.57863181590795398,0.72391345672836427,0.59161230615307658,0.74787743871935974,0.13979139569784893,0.5666498249124563,0.40389444722361184,0.62606053026513264,0.87768234117058541,0.34298599299649829,0.82126713356678349,0.40938619309654833,0.32301600800400204,0.35197248624312161,0.256615807903952,0.57164232116058034,0.73289994997498753,0.0089879939969985008,0.19870285142571287,0.43834267133566784,0.88567033516758387,0.36095897948974492,0.35297098549274641,0.17723511755877941,0.43934117058529271,0.59760330165082542,0.091364182091045534,0.58412356178089053,0.81727313656828426,0.70344422211105562,0.21767433716858431,0.49925112556278145,0.053421210605302659,0.52121810905452726,0.35446873436718362,0.93409754877438722,0.5536693346673337,0.22266683341670837,0.81777238619309667,0.81927013506753388,0.999,0.93010355177588799,0.15626663331665835,0.76285492746373196,0.62206653326663341,0.20569234617308657,0.072891945972986497,0.007490245122561281,0.37593646823411708,0.098852926463231627,0.61457778889444725,0.7683466733366684,0.7418864432216109,0.94058779389694858,0.58212656328164092,0.96704802401200607,0.58262581290645332,0.27458879439719863,0.1208199099549775,0.674487743871936,0.049427213606803404,0.83474687343671838,0.92411255627813915,0.2161765882941471,0.48826763381690852,0.432351675837919,0.59660480240120062,0.88417258629314666,0.66250575287643831,0.47129314657328669,0.81877088544272147,0.85521610805402704,0.192711855927964,0.52920610305152582,0.79031365682841426,0.93459679839919962,0.65601550775387696,0.91113206603301655,0.019971485742871439,0.14728014007003504,0.027959479739869939,0.45332016008004006,0.687967483741871,0.76185642821410715,0.4253621810905453,0.77683391695847925,0.84123711855927974,0.96904502251125568,0.5541685842921461,0.56165732866433227,0.52171735867933966,0.75187143571785897,0.22915707853926964,0.081878439219609814,0.19171335667833919,0.14428464232116059,0.53769334667333668,0.83774237118559292,0.36195747873936973,0.78731815907953984,0.11782441220610307,0.53669484742371187,0.14478389194597299,0.81178139069534772,0.31253176588294151,0.20319609804902453,0.37244172086043026,0.59610555277638821,0.90514107053526771,0.13080490245122561,0.50424362181090554,0.76634967483741878,0.24862781390695349,0.71792246123061532,0.34548224112056031,0.71043371685842926,0.18672086043021513,0.6754862431215608,0.80229564782391205,0.87418759379689848,0.28107903951975988,0.070395697848924466,0.26759929964982493,0.6070890445222612,0.1762366183091546,0.46779839919959981,0.59211155577788899,0.53719409704852428,0.27958129064532267,0.27209254627313662,0.9720405202601301,0.13729514757378691,0.47678489244622313,0.99650375187593809,0.88117708854427224,0.66749824912456235,0.67848174087043522,0.77433766883441724,0.11033566783391696,0.50274587293646833,0.085373186593296652,0.72141720860430225,0.43484792396198102,0.50973536768384198,0.91412756378189097,0.47528714357178592,0.7563646823411706,0.5262106053026514,0.39740420210105054,0.49825262631315664,0.060410705352676342,0.001,0.80429264632316166,0.46330515257628818,0.21467883941970986,0.37294097048524266,0.49625562781390697,0.53070385192596303,0.037944472236118063,0.3509739869934968,0.58961530765382697,0.3514732366183092,0.40139819909954982,0.095857428714357193,0.33599649824912459,0.51522711355677842,0.21917208604302152,0.27708504252126065,0.56215657828914467,0.62855677838919466,0.95955927963982002,0.1203206603301651,0.50873686843421717,0.64053876938469245,0.19670585292646325,0.44283591795897953,0.41038469234617314,0.11482891445722862,0.49725412706353178,0.92710805402701357,0.2401405702851426,0.43634567283641823,0.15027563781890946,0.21967133566783392,0.45182241120560285,0.32351525762881445,0.92561030515257636,0.067400200100050031,0.4653021510755378,0.77583541770885445,0.58911605802901457,0.2501255627813907,0.73140220110055032,0.18072986493246626,0.29405952976488248,0.18272686343171587,0.36645072536268136,0.7553661830915458,0.43534717358679342,0.41138319159579795,0.79580540270135069,0.70394347173586802],  "a": [27.792896448224109,62.856428214107048,65.827913956978492,93.957978989494748,60.479239619809903,43.096048024012006,50.277138569284638,36.410205102551274,74.247123561780882,74.296648324162078,36.113056528264131,31.705352676338169,28.040520260130062,67.264132066033014,87.074037018509244,30.021510755377687,93.462731365682842,97.325662831415698,89.995997998999499,24.32616308154077,41.313156578289146,30.368184092046022,15.659329664832416,99.05902951475737,49.732366183091543,65.92696348174087,58.151575787893947,10.95447723861931,12.242121060530264,37.59879939969985,83.854927463731869,67.907953976988495,28.43671835917959,48.34567283641821,18.135567783891947,99.900950475237607,38.242621310655323,57.458229114557277,16.7983991995998,66.174587293646823,45.770385192596294,43.393196598299149,39.134067033516757,71.968984492246122,47.157078539269634,56.616308154077039,82.270135067533758,67.412706353176588,61.568784392196093,71.820410205102547,58.79539769884942,88.262631315657828,70.433716858429207,39.38169084542271,23.682341170585293,53.743871935967981,67.214607303651817,36.707353676838416,2.832416208104052,42.848424212106053,36.657828914457227,3.8724362181090544,11.301150575287643,81.824412206103048,53.694347173586792,60.033516758379186,86.875937968984488,46.067533766883443,58.646823411705853,16.550775387693847,76.228114057028506,99.653326663331654,15.857428714357178,97.820910455227605,3.4762381190595297,31.85392696348174,23.286143071535768,82.864432216108057,27.990995497748873,34.033016508254128,74.890945472736362,32.745372686343174,72.761380690345163,60.92496248124062,81.081540770385189,57.804902451225608,18.630815407703849,55.328664332166078,52.65432716358179,94.898949474737364,24.623311655827912,49.781890945472732,83.458729364682341,63.203101550775386,72.315657828914453,2.4857428714357175,48.692346173086541,28.337668834417208,74.692846423211606,30.912956478239117,51.119059529764883,67.858429214607298,99.158079039519748,64.589794897448712,66.075537768884445,23.137568784392194,7.586793396698349,24.177588794397199,56.31915957978989,21.008004002000998,11.94497248624312,7.4382191095547769,39.777888944472231,71.523261630815398,74.989994997498741,8.6268134067033522,39.183591795897946,91.679839919959974,47.256128064032012,35.172086043021508,26.455727863931966,26.15857928964482,42.402701350675336,82.319659829914954,6.2991495747873936,19.126063031515756,47.206603301650823,89.451225612806397,80.734867433716857,76.970985492746365,65.728864432216099,96.186593296648326,67.165082541270635,3.6248124062031013,45.027513756878434,24.52426213106553,13.57928964482241,6.5962981490745367,86.430215107553778,42.699849924962479,18.779389694847424,21.948974487243621,92.521760880440212,27.000500250125061,89.500750375187593,77.367183591795893,77.713856928464224,14.272636318159078,36.014007003501746,20.809904952476238,15.015507753876937,12.044022011005502,22.493746873436717,29.526263131565781,7.3391695847923959,39.975987993996995,25.415707853926964,51.069534767383686,23.880440220110053,56.022011005502748,9.6668334167083536,76.525262631315655,64.441220610305152,2.0895447723861933,11.202101050525263,90.887443721860933,79.447223611805896,76.079539769884946,65.332666333166586,33.983491745872932,49.48474237118559,9.8154077038519247,5.9029514757378685,66.818409204602304,93.759879939969977,77.664332166083042,36.261630815407699,81.873936968484244,70.334667333666829,10.112556278139069,2.584792396198099,73.801400700350172,75.7328664332166,70.730865432716357,37.054027013506754,19.324162081040519,14.569784892446222,33.191095547773884,96.285642821410704,23.533766883441722,25.514757378689342,93.363681840920449,50.425712856428213,46.711355677838917,98.16758379189595,63.698349174587293,66.768884442221108,27.891945972986491,74.346173086543274,54.536268134067029,41.610305152576288,95.344672336168074,71.62231115557779,46.315157578789389,94.799899949974986,56.368684342171086,17.343171585792895,75.089044522261133,86.826413206603291,34.082541270635318,70.879439719859931,98.662831415707856,71.275637818909445,37.400700350175086,71.176588294147066,43.145572786393195,82.765382691345664,11.004002001000499,1.1980990495247623,39.579789894947474,83.161580790395192,21.305152576288144,44.532266133066528,27.396698349174585,42.353176588294147,79.348174087043517,2.2876438219109554,83.211105552776388,26.85192596298149,44.185592796398197,35.51875937968984,51.911455727863931,52.456228114057026,64.738369184592301,36.360680340170084,56.566783391695843,14.470735367683842,9.6173086543271626,28.090045022511255,27.198599299649825,83.755877938969476,20.859429714857427,62.757378689344669,29.031015507753875,89.302651325662822,78.50625312656328,77.763381690845421,57.062031015507749,35.716858429214604,31.408204102051023,16.10505252626313,4.8134067033516761,39.332166083041521,63.450725362681339,97.721860930465226,31.606303151575787,34.330165082541271,90.936968484242115,23.187093546773387,95.641820910455223,66.570785392696351,65.035517758879436,93.017008504252118,38.787393696848426,93.858929464732356,61.667833916958479,48.494247123561777,20.562281140570285,13.678339169584792,75.435717858929465,76.822411205602805,45.374187093546773,64.54027013506753,32.844422211105552,54.882941470735368,56.517258629314654,4.9619809904952472,17.442221110555277,52.406703351675837,67.660330165082541,66.867933966983486,4.565782891445723,21.503251625812904,14.025012506253127,20.116558279139568,61.915457728864432,65.382191095547768,8.8249124562281125,20.21560780390195,18.828914457228613,10.706853426713357,84.152076038019004,43.789394697348669,99.603801900950472,8.3791895947973991,46.562781390695342,34.726363181590791,3.0800400200100051,96.582791395697839,77.268134067033515,21.206103051525762,10.904952476238119,43.838919459729865,1.7428714357178587,40.52076038019009,53.100050025012507,83.310155077538766,10.063031515757878,65.877438719359674,49.4352176088044,50.821910955477733,16.451725862931465,80.883441720860432,44.334167083541772,41.560780390195099,4.417208604302151,24.227113556778388,4.6648324162081041,19.967983991995997,17.68984492246123,9.5677838919459735,9.9639819909954976,15.807903951975987,27.149074537268632,52.060030015007499,27.941470735367684,48.74187093546773,23.6328164082041,92.125562781390684,28.832916458229114,10.310655327663831,63.995497748874435,79.546273136568274,39.827413706853427,64.886943471735862,79.793896948474227,72.612806403201603,36.756878439219605,9.9144572286143067,82.81490745372686,22.988994497248623,39.084542271135568,86.974987493746866,57.854427213606797,35.568284142071036,42.254127063531762,77.11955977988994,31.903451725862929,74.643321660830409,31.655827913956976,68.551775887943975,17.145072536268135,5.8039019509754874,74.791895947973984,80.586293146573283,84.053026513256626,90.392196098049027,70.483241620810404,82.369184592296151,45.671335667833915,15.26313156578289,78.654827413706855,58.052526263131561,67.066033016508257,6.8439219609804898,29.130065032516256,21.701350675337668,67.75937968984492,15.906953476738369,95.097048524262121,93.413206603301646,51.366683341670836,57.408704352176088,14.767883941970984,36.855927963981991,3.3771885942971487,13.727863931965983,74.544272136068031,79.298649324662321,18.333666833416707,17.739369684842419,58.597298649324657,56.121060530265133,77.515757878939468,96.384692346173082,46.463731865932964,20.166083041520761,27.842421210605302,4.8629314657328662,18.234617308654325,23.335667833916958,37.202601300650322,62.262131065532763,77.466233116558271,40.916958479239618,7.2896448224112049,81.527263631815899,64.985992996498254,48.296148074037013,25.663331665832914,89.005502751375687,12.935467733866933,50.57428714357178,98.563781890945464,18.482241120560278,59.587793896948469,8.7753876938469233,62.460230115057527,44.383691845922961,80.487243621810904,98.712356178089038,26.802401200600301,45.572286143071537,40.966483241620807,27.545272636318156,9.4687343671835915,73.850925462731368,93.215107553776889,70.829914957478735,17.590795397698848,43.690345172586291,41.362681340670335,58.745872936468231,80.190095047523755,86.182591295647825,6.9429714857428708,10.657328664332166,53.397198599299649,87.915957978989496,66.125062531265627,85.538769384692344,53.595297648824406,23.038519259629815,66.917458729364682,71.077538769384688,61.271635817908951,51.663831915957978,45.275137568784388,91.432216108054021,51.614307153576789,11.895447723861931,1.0495247623811905,26.703351675837919,55.477238619309652,71.721360680340169,54.140070035017509,46.018009004502247,86.925462731365684,64.639319659829908,35.617808904452225,48.197098549274635,60.974487243621809,65.778389194597295,60.528764382191092,8.5772886443221594,81.576788394197095,63.797398699349671,11.746873436718358,13.48024012006003,1.2971485742871436,57.359179589794891,75.782391195597796,6.9924962481240618,15.510755377688843,66.521260630315155,28.486243121560779,32.893946973486742,69.59179589794897,58.894447223611806,31.556778389194594,11.152576288144072,2.1885942971485743,70.03751875937968,73.306153076538266,40.223611805902948,36.311155577788895,76.921460730365183,2.4362181090545274,25.118559279639818,40.421710855427712,46.760880440220106,21.354677338669333,28.189094547273637,22.097548774387192,33.785392696348175,32.200600300150072,45.176088044022009,33.488244122061026,82.17108554277138,64.688844422211105,21.651825912956479,44.136068034017008,8.0325162581290641,12.786893446723361,50.920960480240119,64.243121560780395,43.244622311155574,7.0915457728864428,4.5162581290645321,5.6553276638319154,57.210605302651324,45.077038519259631,96.978989494747367,13.133566783391695,25.910955477738867,57.01250625312656,49.187593796898447,89.550275137568775,27.495747873936967,16.74887443721861,21.10705352676338,97.771385692846422,36.954977488744369,2.3866933466733364,97.870435217608801,44.680840420210103,12.836418209104552,48.593296648324163,85.09304652326162,35.07303651825913,32.29964982491245,73.603301650825415,55.526763381690841,35.865432716358178,63.153576788394197,65.134567283641815,70.384192096048025,92.91795897948974,53.149574787393696,48.098049024512257,38.440720360180087,63.84692346173086,84.102551275637822,83.607303651825916,16.699349674837418,71.572786393196594,2.9809904952476236,19.423211605802901,74.148074037018503,35.320660330165083,80.04152076038018,21.404202101050526,9.5182591295647825,64.490745372686348,75.28714357178589,32.794897448724356,77.317658829414697,40.372186093046523,29.971985992996498,93.660830415207599,71.325162581290641,56.170585292646322,33.438719359679837,7.4877438719359679,78.852926463231611,36.509254627313652,83.359679839919963,42.996998499249621,94.354177088544262,60.23161580790395,93.314157078539267,47.553276638319154,66.471735867933958,52.951475737868932,60.776388194097045,22.048024012006003,42.155077538769383,53.496248124062028,83.26063031515757,97.672336168084044,93.165582791395693,60.627813906953477,6.8934467233616807,60.429714857428714,9.1715857928964475,45.423711855927962,40.718859429714854,65.184092046023011,99.306653326663323,9.0725362681340673,56.863931965982992,25.069034517258629,96.533266633316657,69.443221610805395,41.016008004001996,90.441720860430209,70.23561780890445,54.288644322161076,1.8419209604802402,78.159579789894948,96.78089044522261,29.575787893946973,11.796398199099549,56.913456728364181,92.967483741870936,50.475237618809402,18.432716358179089,81.923461730865426,75.039519759879937,13.925962981490745,4.7143571785892942,57.309654827413702,11.647823911955978,41.115057528764382,44.284642321160575,31.16058029014507,8.1810905452726352,57.111555777888945,94.94847423711856,54.041020510255123,70.087043521760876,30.714857428714357,91.08554277138569,26.604302151075537,14.866933466733366,71.919459729864926,38.29214607303652,21.602301150575286,31.507253626813405,58.696348174087042,38.68834417208604,39.035017508754379,40.174087043521759,29.773886943471734,45.720860430215104,98.761880940470235,49.286643321660826,51.168584292146072,2.7333666833416705,39.926463231615806,92.571285642821408,52.753376688344169,24.821410705352676,38.638819409704851,3.7238619309654828,73.45472736368184,10.855427713856928,23.830915457728864,3.7733866933466733,18.036518259129565,17.937468734367183,91.976988494247124,72.266133066533257,19.868934467233615,57.953476738369183,24.425212606303152,48.444722361180588,60.578289144572281,33.636818409204601,51.762881440720356,12.390695347673836,37.747373686843417,22.889944972486241,31.457728864432216,47.998999499749871,73.504252126063022,22.394697348674335,99.702851425712851,92.274137068534259,60.875437718859423,29.427213606803399,42.650325162581289,100,61.024012006002998,15.213606803401699,50.376188094047023,59.092546273136563,45.81990995497749,48.04852426213106,46.909454727363681,43.987493746873433,91.877938969484731,83.656828414207098,31.259629814907452,66.273636818409202,35.023511755877941,86.281640820410203,46.513256628314153,90.837918959479737,53.050525262631311,15.16408204102051,78.704352176088037,17.986993496748372,61.865932966483236,65.233616808404193,47.305652826413201,33.042521260630316,91.135067533766886,53.644822411205602,51.317158579289639,11.400200100050025,30.07103551775888,62.70785392696348,53.991495747873934,80.33866933466733,85.192096048024013,80.437718859429708,43.294147073536763,24.474737368684341,27.050025012506254,85.984492246123054,58.993496748374184,73.999499749874929,27.297648824412203,47.949474737368682,88.31215607803901,2.8819409704852426,32.250125062531268,47.65232616308154,47.899949974987493,24.920460230115058,48.543771885942967,92.076038019009502,18.729864932466231,86.47973986993496,43.640820410205102,41.461730865432713,95.592296148074027,34.231115557778885,97.22661330665332,44.43321660830415,94.255127563781883,68.106053026513251,90.243621810905452,6.1505752876438216,61.717358679339668,80.239619809904951,1.3961980990495246,35.766383191595793,26.752876438219108,20.314657328664332,1.2476238119059531,78.803401700850415,85.687343671835919,8.2801400700350172,34.874937468734366,20.463231615807903,90.095047523761878,11.84592296148074,19.621310655327662,10.558279139569784,48.395197598799399,16.600300150075036,63.005002501250623,5.3086543271635813,21.552776388194097,64.292646323161577,70.68134067033516,53.79339669834917,16.006003001500751,33.092046023011505,95.443721860930467,45.473236618309151,44.631315657828914,85.885442721360675,42.006503251625809,73.652826413206597,29.32816408204102,79.744372186093045,59.835417708854422,81.972986493246623,81.72536268134067,62.559279639819906,48.989494747373683,87.8664332166083,11.548774387193596,55.081040520260125,42.6008004002001,91.630315157578778,63.599299649824907,40.867433716858429,62.361180590295142,93.56178089044522,5.1105552776388192,23.236618309154576,69.393696848424213,53.298149074537264,37.004502251125558,17.838419209604801,48.147573786893446,51.713356678339167,94.453226613306654,18.531765882941471,41.758879439719855,10.459229614807404,9.0230115057528764,2.0400200100050023,45.968484242121058,6.7943971985992997,81.675837918959473,13.876438219109554,88.460730365182584,73.256628314157069,71.226113056528263,30.863431715857928,13.430715357678839,87.816908454227104,33.933966983491743,75.237618809404694,4.9124562281140562,89.69884942471235,95.39419709854927,5.7048524262131064,47.850425212606304,29.625312656328163,26.257628814407202,72.860430215107556,55.724862431215605,39.233116558279136,26.307153576788394,37.549274637318661,71.374687343671837,51.020010005002497,92.670335167583787,87.569284642321151,31.952976488244122,58.201100550275136,68.304152076038022,7.735367683841921,8.8744372186093052,84.548274137068532,4.31815907953977,17.640320160080041,94.057028514257127,47.008504252126059,62.806903451725859,96.731365682841414,61.370685342671329,18.927963981990995,50.623811905952977,6.2496248124062026,24.573786893446723,31.754877438719358,88.114057028514253,4.4667333666833411,22.642321160580288,98.316158079039511,43.73986993496748,16.05552776388194,42.798899449724857,78.902451225612808,78.555777888944462,49.385692846423211,68.997498749374685,7.636318159079539,68.601300650325157,7.8839419709854921,33.141570785392695,78.110055027513752,61.222111055527762,16.897448724362178,65.481240620310146,12.885942971485742,35.221610805402698,90.738869434717358,42.105552776388194,61.32116058029014,60.083041520760375,51.416208104052025,59.389694847423712,55.625812906453227,28.733866933466732,19.720360180090044,22.74137068534267,37.945472736368181,69.096548274137064,39.629314657328663,2.3371685842921459,90.590295147573784,86.133066533266629,8.9239619809904944,46.95897948974487,92.224612306153077,69.245122561280638,17.194597298649324,86.628314157078535,55.427713856928463,69.542271135567788,94.997998999499742,73.355677838919462,70.136568284142072,69.938469234617301,65.085042521260632,56.764882441220607,80.635817908954479,84.795897948974485,12.440220110055026,25.564282141070535,44.730365182591292,10.16208104052026,68.254627313656826,44.086543271635819,42.452226113056525,99.801900950475229,54.239119559779887,20.265132566283139,63.500250125062529,32.398699349674835,43.195097548774385,63.40120060030015,45.621810905452726,34.973986993496744,43.04652326163081,93.710355177588795,58.300150075037514,7.9334667333666831,10.211605802901451,63.054527263631812,18.58129064532266,56.418209104552275,58.498249124562278,19.670835417708854,28.387193596798397,68.700350175087536,88.411205602801402,29.476738369184591,22.592796398199098,4.0210105052526259,57.903951975987994,50.227613806903449,52.802901450725358,5.0610305152576283,49.336168084042022,72.414707353676832,50.17808904452226,88.163581790895449,28.981490745372685,54.783891945972982,33.240620310155073,14.37168584292146,38.836918459229615,23.583291645822911,22.840420210105052,32.497748874437221,32.448224112056025,90.986493246623311,92.026513256628306,93.264632316158071,84.696848424212106,17.392696348174088,21.899449724862428,74.098549274637321,27.446223111555778,14.817408704352175,23.979489744872435,73.009004502251116,22.69184592296148,96.236118059029508,92.719859929964983,3.9219609804902449,25.2176088044022,17.788894447223612,96.087543771885933,70.285142571285633,33.587293646823412,1,46.364682341170585,4.3676838419209609,5.3581790895447723,51.564782391195592,72.216608304152075,13.331665832916457,31.111055527763881,25.168084042021011,64.391695847923955,19.918459229614808,68.007003501750873,36.459729864932463,14.718359179589795,85.043521760880438,85.241620810405195,95.493246623311649,61.519259629814904,69.690845422711348,98.068534267133558,62.113556778389189,84.498749374687335,51.515257628814403,68.947973986993489,62.509754877438716,25.613806903451724,75.534767383691843,7.537268634317158,64.837418709354665,40.07503751875938,60.18209104552276,76.67383691845923,1.6933466733366682,1.5942971485742872,3.5752876438219108,6.1010505252626315,95.790395197598798,37.895947973986992,12.143071535767884,98.365682841420707,87.42071035517759,85.835917958979479,6.2001000500250125,58.943971985992995,86.578789394697338,1.8914457228614308,35.122561280640319,21.80040020010005,82.715857928964482,50.772386193096544,81.131065532766385,66.026013006503248,30.318659329664833,3.9714857428714354,57.606803401700844,75.584292146073039,9.4192096048024005,50.326663331665827,59.637318659329665,1.7923961980990495,57.161080540270135,29.37768884442221,79.991995997998998,39.678839419709853,99.851425712856425,67.610805402701345,55.922961480740369,19.571785892946473,11.499249624812405,5.4572286143071533,73.949974987493746,25.366183091545771,29.823411705852926,8.7258629314657323,65.629814907453721,77.862431215607799,83.706353176588294,6.4477238619309656,70.780390195097539,53.842921460730359,15.461230615307652,88.510255127563781,46.810405202601295,91.828414207103549,65.431715857928964,58.349674837418704,80.289144572286133,55.774387193596795,90.78839419709854,34.37968984492246,33.537768884442222,91.333166583291643,40.12456228114057,95.988494247123555,29.674837418709352,31.804402201100547,97.078039019509745,89.797898949474728,45.918959479739868,94.403701850925458,98.019009504752376,20.710855427713856,61.469734867433715,85.588294147073526,82.517758879439711,79.249124562281139,55.378189094547274,26.208104052026012,80.982491245622811,23.781390695347671,38.589294647323662,77.070035017508758,53.199099549774886,41.263631815907949,32.101550775387693,52.307653826913452,25.960480240120059,68.848924462231111,66.620310155077533,58.3991995997999,39.480740370185089,54.189594797398698,72.959479739869934,12.192596298149073,62.01450725362681,65.976488244122052,25.712856428214106,37.697848924462228,45.869434717358679,1.9409704852426213,50.079039519759874,88.609304652326159,32.943471735867931,76.178589294647324,37.450225112556275,51.26763381690845,23.731865932966482,8.5277638819409702,34.280640320160082,75.930965482741371,16.996498249124564,65.580290145072539,6.0020010005002495,62.212606303151574,55.576288144072031,66.966983491745864,98.811405702851417,94.601800900450215,85.439719859929966,70.532766383191586,52.208604302151073,85.934967483741872,76.376688344172081,82.666333166583286,26.554777388694347,52.703851925962979,91.580790395197596,19.472736368184091,72.117558779389697,53.941970985492745,37.846423211605803,29.922461230615305,49.237118559279637,4.6153076538269131,16.204102051025512,13.975487743871936,77.911955977988995,35.271135567783894,83.409204602301145,24.375687843921959,33.735867933966979,22.790895447723862,30.764382191095546,78.060530265132556,55.675337668834416,19.819409704852426,5.8534267133566784,48.890445222611305,22.939469734867433,86.083541770885432,87.272136068034015,55.972486243121558,92.818909454727361,30.219609804902451,89.154077038519262,80.78439219609804,17.046023011505753,45.324662331165584,54.585792896448218,70.631815907953978,49.138069034517258,77.416708354177089,57.557278639319655,50.722861430715355,80.388194097048526,81.279639819909946,14.668834417208604,5.7543771885942974,72.563281640820406,2.6343171585792895,8.3296648324162081,30.96248124062031,14.223111555777889,68.056528264132069,22.543271635817909,37.648324162081039,84.251125562781382,14.916458229114557,61.123061530765376,61.420210105052526,60.825912956478234,56.220110055027511,73.108054027013509,53.892446223111556,54.734367183591793,71.770885442721351,7.1905952976488239,76.426213106553277,89.25312656328164,30.120560280140069,3.3276638319159577,24.029014507253624,52.604802401200601,87.123561780890441,64.045022511255624,52.010505252626309,35.370185092546272,78.753876938469233,24.672836418209105,30.170085042521258,6.4972486243121557,1.4952476238119059,91.481740870435218,82.220610305152576,50.87143571785893,62.608804402201095,41.21410705352676,87.767383691845922,9.7658829414707355,72.0680340170085,79.001500750375186,64.936468234117058,85.142571285642816,56.269634817408701,14.421210605302651,2.2381190595297649,67.016508254127061,97.523761880940469,72.711855927963981,37.499749874937464,8.9734867433716854,89.352176088044018,23.43471735867934,35.815907953976989,12.68784392196098,5.5562781390695344,11.449724862431214,63.945972986493246,59.439219609804901,4.268634317158579,97.622811405702848,42.204602301150572,47.800900450225107,56.071535767883937,43.591295647823912,1.6438219109554777,17.293646823411706,7.7848924462231111,73.702351175587793,50.12856428214107,81.180590295147567,89.847423711855924,32.349174587293646,38.391195597798898,94.700850425212607,97.919959979989997,86.776888444222109,23.088044022011005,5.6058029014507254,82.022511255627805,41.857928964482241,51.218109054527261,63.648824412206103,35.419709854927461,69.839419709854923,16.847923961980989,79.150075037518761,29.278639319659828,85.786393196598297,68.898449224612307,38.539769884942473,96.681840920460232,88.807403701850916,32.547273636818403,60.281140570285139,54.833416708354171,80.685342671335661,3.2286143071535767,60.132566283141571,92.47223611805903,49.583791895947975,55.031515757878935,84.350175087543761,95.83991995997998,76.277638819409702,4.219109554777388,88.361680840420206,94.30465232616308,97.127563781890942,48.246623311655824,75.386193096548268,61.618309154577283,49.039019509754873,61.964982491245621,71.869934967483744,99.455227613806898,15.411705852926463,44.482741370685339,81.477738869434717,22.147073536768382,88.658829414707355,81.774887443721852,36.063531765882942,42.749374687343668,32.002501250625315,24.128064032016006,37.301650825412707,84.993996998499242,87.519759879939969,67.115557778889439,57.260130065032513,91.778889444722353,99.752376188094047,64.342171085542759,83.805402701350673,62.163081540770385,87.371185592796394,18.284142071035518,85.489244622311148,74.593796898449227,82.468234117058529,46.117058529264632,5.9524762381190595,87.618809404702347,92.769384692346165,90.144572286143074,95.542771385692845,76.871935967983987,86.380690345172582,10.360180090045022,34.577788894447224,44.779889944972481,98.860930465232613,96.830415207603792,69.195597798899442,71.473736868434216,50.970485242621308,84.449224612306153,69.789894947473741,51.861930965482742,73.207103551775887,49.534267133566779,92.422711355677833,5.2591295647823912,69.888944472236119,89.599799899949971,74.494747373686835,2.5352676338169085,46.2656328164082,3.8229114557278638,26.109054527263631,67.511755877938967,16.154577288644319,69.492746373186591,39.530265132566278,95.047523761880939,37.252126063031511,88.559779889944963,58.003001500750372,15.065032516258128,67.808904452226116,74.445222611305653,15.708854427213605,27.099549774887443,7.68584292146073,44.581790895447725,49.633316658329164,48.642821410705352,26.950975487743872,99.108554277138566,94.849424712356168,68.749874937468732,88.708354177088538,55.823911955977984,17.541270635317659,7.1410705352676338,53.34767383691846,84.399699849924957,43.343671835917959,51.465732866433214,20.611805902951474,24.870935467733865,76.723361680840412,97.573286643321651,11.251625812906452,67.709854927463724,24.722361180590294,18.185092546273136,47.602801400700351,14.322161080540269,79.595797898949471,74.84142071035518,41.659829914957477,74.395697848924456,92.868434217108543,46.859929964982491,42.501750875437715,97.375187593796895,69.14607303651826,60.726863431715856,58.250625312656325,63.252626313156576,44.977988994497245,57.70585292646323,96.879939969984989,39.728364182091042,38.341670835417709,53.446723361680839,47.355177588794398,58.10205102551275,3.5257628814407203,90.194097048524256,3.2781390695347672,98.514257128564282,68.155577788894448,16.253626813406704,18.680340170085042,66.422211105552776,83.013006503251617,15.312656328164081,41.412206103051524,16.402201100550272,27.248124062031014,53.248624312156075,1.3466733366683341,37.351175587793897,7.2401200600300148,23.385192596298147,64.787893946973483,91.927463731865927,82.418709354677333,59.736368184092044,7.834417208604302,4.7638819409704851,11.103051525762881,6.0515257628814405,52.109554777388695,25.267133566783389,78.357678839419705,53.545772886443217,21.750875437718857,32.052026013006497,96.137068534267129,59.983991995997997,11.350675337668834,3.4267133566783392,63.351675837918954,19.522261130565283,13.381190595297648,29.229114557278638,79.496748374187092,23.484242121060529,28.535767883941968,8.2306153076538262,15.114557278639319,15.956478239119559,88.955977988994491,84.003501750875429,98.61330665332666,12.539269634817408,33.68634317158579,69.987993996998497,1.9904952476238118,10.756378189094546,54.338169084542265,59.785892946473233,89.946473236618303,79.397698849424714,56.715357678839418,20.958479239619809,34.132066033016507,52.555277638819405,98.959979989994991,12.489744872436217,10.261130565282642,34.478739369684838,92.373186593296637,79.199599799899943,26.505252626313155,61.073536768384187,66.719359679839911,32.596798399199599,89.401700850425215,19.769884942471236,2.6838419209604805,78.456728364182084,99.257128564282141,55.87343671835918,87.321660830415198,72.167083541770879,59.934467233616807,72.464232116058028,90.045522761380681,54.437218609304651,99.009504752376188,7.3886943471735869,85.390195097548769,73.157578789394691,57.507753876938466,99.207603801900945,55.18009004502251,14.965982991495748,2.9314657328664331,48.939969984992494,75.485242621310647,86.03401700850425,44.878939469734867,42.303651825912958,94.552276138069033,67.31365682841421,80.932966483241614,3.6743371685842918,30.566283141570786,28.63481740870435,26.653826913456726,50.029514757378685,62.658329164582291,19.076538269134566,19.175587793896948,83.508254127063523,25.811905952976488,79.100550275137564,60.677338669334667,91.5312656328164,93.809404702351173,63.104052026013001,78.011005502751374,95.740870435217602,66.669834917458729,68.502251125562779,36.806403201600801,84.597798899449714,1.1485742871435718,25.019509754877436,6.6458229114557277,72.909954977488738,70.928964482241113,94.00750375187593,96.434217108554279,1.5447723861930966,44.928464232116056,45.522761380690341,87.668334167083543,33.339669834917459,29.872936468234116,66.323161580790398,10.508754377188595,76.327163581790899,95.69134567283642,56.814407203601796,40.471235617808901,79.89294647323662,34.627313656828413,94.156078039019505,3.1295647823911956,77.020510255127562,81.42821410705352,40.81790895447724,67.957478739369677,87.173086543271637,15.758379189594796,13.529764882441221,62.905952976488244,91.184592296148068,30.813906953476739,38.73786893446723,97.474237118559273,73.405202601300644,77.961480740370178,18.977488744372184,95.146573286643317,41.065532766383193,59.884942471235618,86.331165582791385,21.156578289144573,1.4457228614307154,13.826913456728363,79.843421710855424,10.409704852426213,54.981990995497746,20.017508754377189,82.072036018009001,41.511255627813902,89.896948474237121,67.561280640320163,89.104552276138065,46.661830915457728,33.290145072536269,92.62081040520259,76.624312156078034,84.894947473736863,30.417708854427211,43.888444222111055,93.066533266633314,16.501250625312657,36.558779389694848,92.323661830915455,63.302151075537765,74.197598799399699,69.344172086043017,78.407203601800902,79.051025512756368,54.387693846923462,88.213106553276631,2.1390695347673834,59.290645322661327,30.615807903951975,22.345172586293145,38.935967983991993,79.942471235617802,38.985492746373183,97.177088544272138,43.442721360680338,36.21210605302651,5.4077038519259624,26.010005002501249,35.667333666833414,28.585292646323161,89.055027513756869,83.11205602801401,9.3696848424212096,74.940470235117559,30.665332666333164,26.901450725362679,73.90045022511255,53.001000500250122,54.635317658829415,45.12656328164082,9.7163581790895446,84.94447223611806,28.139569784892444,47.503751875937965,84.845422711355667,87.222611305652819,14.520260130065031,77.56528264132065,20.760380190095045,34.181590795397696,77.614807403701846,97.424712356178091,61.172586293146573,27.347173586793396,70.97848924462231,8.6763381690845414,59.241120560280137,63.896448224112056,11.05352676338169,62.064032016007999,75.683341670835418,39.876938469234616,76.772886443221608,59.48874437218609,26.059529764882441,52.852426213106554,64.193596798399199,6.7448724362181087,17.095547773886942,5.0115057528764382,95.245622811405696,47.701850925462729,71.028014007003492,41.164582291145571,16.649824912456225,45.225612806403198,73.553776888444219,46.414207103551774,25.762381190595296,98.464732366183085,11.994497248624311,22.444222111055527,29.179589794897446,34.924462231115555,22.246123061530763,47.751375687843918,82.616808404202104,79.645322661330667,99.950475237618804,24.771885942971483,59.53826913456728,38.886443221610804,95.938969484742373,21.849924962481239,50.673336668334166,17.244122061030513,57.755377688844419,47.404702351175587,8.0820410205102551,90.689344672336162,88.856928464232112,26.406203101550773,32.151075537768882,36.162581290645321,95.889444722361176,69.294647323661835,6.6953476738369178,97.276138069034516,78.258629314657327,73.058529264632313,93.116058029014496,19.27463731865933,20.067033516758379,54.090545272636312,89.748374187093546,3.0305152576288141,80.536768384192087,35.964482241120557,58.84492246123061,28.684342171085543,59.686843421710854,4.0705352676338169,97.028514257128563,22.196598299149574,29.080540270135067,87.024512256128062,7.982991495747874,59.191595797898948,76.574787393696852,16.303151575787894,98.910455227613795,43.492246123061527,80.833916958479236,70.186093046523254,51.96098049024512,54.48674337168584,24.969984992496247,49.831415707853928,40.768384192096043,65.679339669834917,85.637818909454722,90.342671335667831,16.352676338169083,49.930465232616307,31.061530765382688,36.608304152076037,19.373686843421709,58.547773886943467,15.609804902451225,40.025512756378184,18.878439219609803,13.183091545772886,72.810905452726359,49.979989994997496,96.038019009504751,47.058029014507248,28.931965982991496,33.884442221110554,34.429214607303649,2.7828914457228615,21.057528764382191,20.512756378189092,34.825412706353177,72.018509254627304,39.282641320660325,43.937968984492244,77.218609304652318,88.064532266133057,81.329164582291142,49.880940470235117,30.467233616808404,13.084042021010506,17.887943971985994,67.462231115557771,96.929464732366185,81.626313156578291,41.956978489244619,12.588794397198599,62.955477738869433,87.717858929464725,31.012006003001499,60.380190095047524,13.034517258629315,12.737368684342171,82.913956978489239,74.049024512256125,6.3981990995497746,7.0420210105052528,69.641320660330166,80.140570285142573,38.044522261130567,13.232616308154077,78.95197598799399,98.118059029514754,38.094047023511756,93.611305652826402,41.709354677338666,57.656328164082041,97.969484742371179,38.490245122561277,33.834917458729365,99.356178089044519,42.056028014007005,87.965482741370678,55.130565282641321,36.90545272636318,68.353676838419204,72.36518259129565,76.129064532266128,78.605302651325658,21.453726863431715,34.775887943971988,65.283141570785389,80.091045522761377,16.946973486743371,78.308154077038509,56.665832916458228,38.193096548274134,71.671835917958973,83.904452226113051,10.607803901950975,52.505752876438216,76.030015007503749,82.121560780390197,68.452726363181583,54.684842421210604,86.677838919459731,24.078539269634817,94.106553276638309,73.751875937968975,31.309154577288641,95.196098049024513,72.51375687843921,84.746373186593289,75.881440720360175,75.980490245122553,83.55777888944472,94.750375187593789,77.812906453226603,52.901950975487743,30.26913456728364,52.159079539769884,12.638319159579789,59.142071035517759,20.90895447723862,52.357178589294648,98.415207603801903,32.992996498249127,81.230115057528764,81.378689344672338,61.766883441720857,28.238619309654826,63.747873936968482,11.697348674337167,52.258129064532262,91.382691345672839,56.962981490745371,28.288144072036015,11.598299149574787,66.224112056028005,82.567283641820907,21.255627813906951,91.729364682341171,14.124062031015507,87.470235117558772,67.363181590795392,12.341170585292646,93.908454227113552,3.1790895447723861,88.015007503751875,71.42421210605302,9.2211105552776385,61.816408204102046,6.5467733866933466,13.282141070535268,31.358679339669834,88.906453226613309,62.410705352676338,56.467733866933465,48.840920460230116,51.812406203101546,91.036018009004493,22.295647823911956,85.291145572786391,96.632316158079036,91.283641820910447,13.628814407203601,40.669334667333665,15.362181090545272,95.295147573786892,27.594797398699349,44.037018509254622,64.094547273636806,6.3486743371685836,25.316658329164582,55.229614807403699,84.300650325162579,43.541770885442716,60.330665332666328,99.554277138569276,90.491245622811405,41.90745372686343,25.465232616308153,41.808404202101052,5.1600800400200102,68.20510255127563,94.651325662831411,70.582291145572782,1.0990495247623813,49.088544272136069,37.153076538269133,9.8649324662331157,14.074537268634316,32.695847923961978,69.047023511755881,64.144072036018002,34.528264132066035,63.549774887443718,4.1200600300150079,20.413706853426714,10.013506753376689,91.234117058529264,5.5067533766883443,12.093546773386693,93.512256128064024,89.649324662331168,10.805902951475737,75.633816908454222,19.027013506753377,25.861430715357677,98.266633316658329,84.2016008004002,18.383191595797896,66.37268634317158,20.661330665332667,68.403201600800401,39.4312156078039,24.276638319159577,46.216108054027011,42.897948974487242,5.2096048024012003,19.225112556278138,15.560280140070034,68.650825412706354,13.777388694347174,96.483741870935461,18.086043021510754,90.540770385192587,8.4287143571785883,62.311655827913953,83.062531265632813,47.454227113556776,20.364182091045521,35.914957478739368,17.491745872936466,27.74337168584292,12.291645822911455,12.984992496248124,23.929964982491246,68.799399699849928,83.953976988494247,44.235117558779386,8.4782391195597793,75.138569284642315,85.736868434217101,65.530765382691342,46.166583291645821,85.340670335167573,99.405702851425701,92.17508754377188,72.662331165582785,81.032016008003993,40.619809904952476,54.932466233116557,42.947473736868432,40.570285142571286,8.131565782891446,31.210105052526263,48.79139569784892,9.1220610305152565,34.676838419209602,90.293146573286634,9.2706353176588294,40.273136568284137,86.232116058029007,69.740370185092544,9.3201600800400204,79.694847423711849,88.757878939469734,27.644322161080538,26.356678339169584,75.336668334167086,98.217108554277132,14.173586793396698,86.727363681840913,55.279139569784888,75.831915957978993,42.551275637818911,44.829414707353678,86.529264632316156,75.188094047023512,35.469234617308651,94.205602801400701,37.103551775887944,71.127063531765884,21.99849924962481,28.783391695847921,96.335167583791886,30.516758379189593,4.1695847923961979,74.742371185592788,90.63981990995498,27.693846923461731,49.682841420710353,40.322661330665333,46.612306153076538,78.209104552276131,14.619309654827413,37.796898449224614,50.524762381190591,38.143571785892945,77.169084542271136,59.340170085042516,58.448724362181089,32.646323161580789,29.724362181090545,37.99499749874937,94.502751375687836,84.64732366183091,28.882441220610303,99.504752376188094,82.963481740870435,47.107553776888444,59.043021510755374,76.475737868934459,33.389194597298648,89.203601800900444],  "b": [97.375187593796895,89.25312656328164,5.5562781390695344,41.808404202101052,38.73786893446723,40.768384192096043,20.611805902951474,32.002501250625315,22.543271635817909,51.663831915957978,28.337668834417208,97.870435217608801,65.035517758879436,37.99499749874937,76.178589294647324,45.621810905452726,31.655827913956976,15.659329664832416,23.781390695347671,54.140070035017509,73.850925462731368,29.37768884442221,16.946973486743371,95.889444722361176,53.298149074537264,18.927963981990995,74.247123561780882,5.8039019509754874,60.677338669334667,13.381190595297648,86.083541770885432,50.821910955477733,80.734867433716857,74.197598799399699,41.90745372686343,90.194097048524256,96.830415207603792,71.077538769384688,80.685342671335661,10.360180090045022,81.477738869434717,21.404202101050526,43.343671835917959,59.290645322661327,78.50625312656328,98.266633316658329,36.756878439219605,74.791895947973984,29.32816408204102,95.83991995997998,88.31215607803901,69.542271135567788,36.311155577788895,52.060030015007499,89.055027513756869,42.105552776388194,30.615807903951975,84.251125562781382,17.788894447223612,64.144072036018002,95.542771385692845,73.652826413206597,12.737368684342171,43.937968984492244,81.824412206103048,16.253626813406704,9.8154077038519247,3.8724362181090544,28.882441220610303,39.876938469234616,23.979489744872435,84.845422711355667,23.929964982491246,40.421710855427712,8.8744372186093052,45.027513756878434,77.020510255127562,20.859429714857427,44.086543271635819,4.8629314657328662,8.3791895947973991,43.789394697348669,5.3581790895447723,67.115557778889439,42.353176588294147,1.2971485742871436,48.989494747373683,71.968984492246122,82.963481740870435,13.777388694347174,89.599799899949971,75.089044522261133,91.333166583291643,71.226113056528263,54.783891945972982,50.673336668334166,37.499749874937464,97.573286643321651,88.460730365182584,9.5677838919459735,55.081040520260125,98.910455227613795,30.813906953476739,47.107553776888444,73.306153076538266,11.94497248624312,54.882941470735368,44.878939469734867,84.350175087543761,90.590295147573784,20.90895447723862,21.354677338669333,79.348174087043517,92.521760880440212,46.2656328164082,53.199099549774886,75.336668334167086,61.420210105052526,75.039519759879937,23.038519259629815,91.630315157578778,94.354177088544262,96.681840920460232,62.410705352676338,11.350675337668834,87.371185592796394,77.515757878939468,78.852926463231611,69.59179589794897,35.221610805402698,35.568284142071036,93.809404702351173,49.979989994997496,12.489744872436217,21.057528764382191,71.919459729864926,38.985492746373183,58.696348174087042,72.216608304152075,15.758379189594796,35.023511755877941,55.279139569784888,86.727363681840913,39.926463231615806,11.895447723861931,3.4267133566783392,81.774887443721852,40.619809904952476,29.427213606803399,96.483741870935461,50.920960480240119,1.3466733366683341,56.913456728364181,24.969984992496247,66.224112056028005,32.497748874437221,58.943971985992995,63.84692346173086,76.525262631315655,64.243121560780395,27.891945972986491,60.726863431715856,52.555277638819405,95.988494247123555,40.471235617808901,79.793896948474227,13.925962981490745,61.667833916958479,49.385692846423211,2.2876438219109554,19.819409704852426,73.553776888444219,79.001500750375186,27.545272636318156,86.875937968984488,33.537768884442222,57.210605302651324,11.004002001000499,43.195097548774385,22.939469734867433,22.097548774387192,39.233116558279136,70.730865432716357,68.799399699849928,76.376688344172081,4.9619809904952472,59.340170085042516,74.098549274637321,61.519259629814904,96.978989494747367,22.889944972486241,85.340670335167573,60.479239619809903,38.044522261130567,94.799899949974986,78.407203601800902,94.00750375187593,13.282141070535268,62.70785392696348,45.423711855927962,11.796398199099549,28.931965982991496,30.516758379189593,37.697848924462228,86.776888444222109,72.464232116058028,99.207603801900945,10.310655327663831,79.447223611805896,41.21410705352676,88.510255127563781,65.92696348174087,71.374687343671837,1.4457228614307154,70.186093046523254,54.090545272636312,12.935467733866933,66.570785392696351,68.155577788894448,31.85392696348174,62.806903451725859,10.95447723861931,57.507753876938466,5.2096048024012003,89.69884942471235,64.787893946973483,96.384692346173082,24.52426213106553,15.609804902451225,63.648824412206103,55.229614807403699,80.78439219609804,20.413706853426714,48.34567283641821,98.61330665332666,49.781890945472732,32.992996498249127,41.016008004001996,9.4687343671835915,92.719859929964983,37.301650825412707,99.603801900950472,69.047023511755881,73.603301650825415,47.305652826413201,81.42821410705352,97.474237118559273,32.151075537768882,36.360680340170084,52.951475737868932,5.5067533766883443,47.553276638319154,89.352176088044018,13.48024012006003,74.742371185592788,43.442721360680338,13.232616308154077,89.748374187093546,3.3771885942971487,29.130065032516256,49.138069034517258,7.2401200600300148,25.118559279639818,80.635817908954479,60.776388194097045,81.378689344672338,69.096548274137064,34.429214607303649,31.16058029014507,95.245622811405696,79.942471235617802,11.449724862431214,94.403701850925458,64.837418709354665,41.115057528764382,8.7753876938469233,83.26063031515757,51.713356678339167,74.494747373686835,21.552776388194097,41.511255627813902,62.361180590295142,29.080540270135067,97.969484742371179,64.688844422211105,21.899449724862428,32.794897448724356,15.16408204102051,14.668834417208604,65.134567283641815,77.367183591795893,69.195597798899442,3.1295647823911956,92.91795897948974,31.111055527763881,17.640320160080041,50.524762381190591,32.101550775387693,24.870935467733865,80.190095047523755,43.73986993496748,18.135567783891947,46.711355677838917,18.383191595797896,65.085042521260632,84.746373186593289,74.544272136068031,19.027013506753377,74.593796898449227,6.8934467233616807,97.721860930465226,36.261630815407699,64.441220610305152,44.383691845922961,23.335667833916958,77.713856928464224,94.502751375687836,63.104052026013001,85.09304652326162,50.029514757378685,96.731365682841414,55.130565282641321,8.0325162581290641,20.116558279139568,83.508254127063523,40.966483241620807,8.6763381690845414,74.296648324162078,43.987493746873433,89.995997998999499,35.172086043021508,89.203601800900444,50.17808904452226,53.496248124062028,53.397198599299649,17.491745872936466,22.69184592296148,65.728864432216099,63.698349174587293,16.05552776388194,66.075537768884445,46.166583291645821,94.997998999499742,85.885442721360675,34.825412706353177,37.450225112556275,27.000500250125061,11.103051525762881,74.049024512256125,36.410205102551274,88.856928464232112,98.316158079039511,90.63981990995498,50.57428714357178,31.012006003001499,62.856428214107048,8.8249124562281125,14.817408704352175,48.098049024512257,99.900950475237607,2.1885942971485743,70.334667333666829,72.36518259129565,60.083041520760375,46.909454727363681,73.058529264632313,45.374187093546773,97.325662831415698,77.911955977988995,92.670335167583787,29.229114557278638,26.604302151075537,83.55777888944472,53.050525262631311,46.315157578789389,24.128064032016006,44.631315657828914,14.322161080540269,21.453726863431715,74.692846423211606,40.52076038019009,30.566283141570786,47.701850925462729,59.637318659329665,76.624312156078034,88.609304652326159,83.161580790395192,38.836918459229615,72.315657828914453,69.839419709854923,44.334167083541772,30.021510755377687,99.257128564282141,82.715857928964482,87.222611305652819,76.475737868934459,49.039019509754873,32.745372686343174,91.729364682341171,4.4667333666833411,82.072036018009001,80.437718859429708,94.700850425212607,4.7143571785892942,52.406703351675837,63.747873936968482,85.588294147073526,60.578289144572281,85.192096048024013,13.57928964482241,8.1810905452726352,23.830915457728864,83.310155077538766,46.760880440220106,67.907953976988495,82.666333166583286,70.384192096048025,33.339669834917459,53.595297648824406,39.035017508754379,67.808904452226116,30.368184092046022,30.170085042521258,55.922961480740369,49.4352176088044,86.03401700850425,51.614307153576789,81.72536268134067,3.0800400200100051,38.539769884942473,60.033516758379186,50.87143571785893,25.811905952976488,31.804402201100547,17.095547773886942,55.031515757878935,57.458229114557277,25.712856428214106,42.501750875437715,60.528764382191092,20.710855427713856,24.474737368684341,75.188094047023512,66.37268634317158,81.279639819909946,71.869934967483744,7.0915457728864428,62.163081540770385,7.8839419709854921,84.94447223611806,37.004502251125558,95.097048524262121,9.6668334167083536,11.251625812906452,19.670835417708854,80.833916958479236,28.981490745372685,63.896448224112056,30.318659329664833,20.463231615807903,57.359179589794891,73.999499749874929,86.925462731365684,76.277638819409702,37.945472736368181,69.888944472236119,59.191595797898948,26.356678339169584,99.653326663331654,15.510755377688843,87.173086543271637,70.928964482241113,42.996998499249621,7.2896448224112049,5.3086543271635813,72.117558779389697,14.965982991495748,32.695847923961978,4.6153076538269131,99.504752376188094,39.530265132566278,45.473236618309151,42.056028014007005,11.400200100050025,11.647823911955978,80.091045522761377,58.250625312656325,54.041020510255123,51.96098049024512,78.357678839419705,92.026513256628306,88.708354177088538,56.863931965982992,32.893946973486742,90.540770385192587,15.312656328164081,46.562781390695342,50.425712856428213,17.046023011505753,33.141570785392695,19.522261130565283,85.489244622311148,29.476738369184591,12.044022011005502,90.144572286143074,21.849924962481239,22.592796398199098,38.341670835417709,51.119059529764883,86.182591295647825,85.241620810405195,77.56528264132065,37.796898449224614,3.9219609804902449,57.062031015507749,28.733866933466732,95.047523761880939,49.583791895947975,66.966983491745864,35.914957478739368,40.12456228114057,75.683341670835418,95.69134567283642,31.309154577288641,4.565782891445723,79.100550275137564,14.916458229114557,15.065032516258128,72.167083541770879,90.936968484242115,5.6553276638319154,90.243621810905452,82.17108554277138,98.514257128564282,73.009004502251116,32.349174587293646,80.239619809904951,42.699849924962479,20.21560780390195,9.8649324662331157,29.922461230615305,48.840920460230116,36.014007003501746,92.47223611805903,75.28714357178589,85.687343671835919,44.532266133066528,88.114057028514253,19.225112556278138,38.193096548274134,65.976488244122052,22.493746873436717,13.678339169584792,70.433716858429207,27.297648824412203,60.974487243621809,97.672336168084044,68.403201600800401,91.382691345672839,7.4382191095547769,92.17508754377188,97.078039019509745,48.147573786893446,33.092046023011505,49.336168084042022,32.250125062531268,21.503251625812904,43.393196598299149,82.864432216108057,53.248624312156075,45.869434717358679,24.375687843921959,79.199599799899943,33.290145072536269,61.32116058029014,1,8.5277638819409702,27.248124062031014,94.057028514257127,64.639319659829908,43.492246123061527,13.727863931965983,2.2381190595297649,98.860930465232613,81.873936968484244,8.131565782891446,47.800900450225107,20.166083041520761,34.775887943971988,43.838919459729865,15.114557278639319,69.740370185092544,29.872936468234116,61.618309154577283,47.850425212606304,45.81990995497749,63.054527263631812,5.1600800400200102,19.621310655327662,49.682841420710353,91.5312656328164,59.587793896948469,16.996498249124564,92.571285642821408,33.834917458729365,40.025512756378184,61.024012006002998,2.584792396198099,26.950975487743872,2.1390695347673834,83.409204602301145,76.772886443221608,89.401700850425215,88.658829414707355,79.546273136568274,61.766883441720857,21.008004002000998,93.314157078539267,46.513256628314153,62.509754877438716,54.684842421210604,53.892446223111556,7.982991495747874,47.058029014507248,19.571785892946473,55.724862431215605,12.588794397198599,10.112556278139069,87.074037018509244,41.758879439719855,59.439219609804901,96.929464732366185,52.852426213106554,27.74337168584292,34.082541270635318,8.3296648324162081,37.054027013506754,78.902451225612808,45.572286143071537,25.316658329164582,42.402701350675336,7.9334667333666831,83.755877938969476,83.805402701350673,95.39419709854927,54.338169084542265,25.069034517258629,44.829414707353678,34.280640320160082,19.324162081040519,50.277138569284638,88.064532266133057,34.132066033016507,42.155077538769383,16.303151575787894,82.121560780390197,94.601800900450215,70.879439719859931,91.481740870435218,28.783391695847921,96.632316158079036,59.983991995997997,58.894447223611806,2.832416208104052,95.740870435217602,23.43471735867934,61.915457728864432,11.202101050525263,35.320660330165083,69.245122561280638,87.668334167083543,21.255627813906951,25.168084042021011,52.307653826913452,39.777888944472231,11.05352676338169,3.7733866933466733,27.792896448224109,16.402201100550272,48.296148074037013,57.755377688844419,78.456728364182084,19.373686843421709,43.690345172586291,41.659829914957477,98.365682841420707,99.405702851425701,23.682341170585293,99.009504752376188,38.935967983991993,66.323161580790398,16.847923961980989,53.842921460730359,9.2706353176588294,76.871935967983987,96.186593296648326,32.943471735867931,62.064032016007999,2.9314657328664331,72.266133066533257,34.033016508254128,56.121060530265133,7.735367683841921,99.950475237618804,78.555777888944462,8.9239619809904944,58.84492246123061,24.029014507253624,85.736868434217101,66.867933966983486,57.01250625312656,46.810405202601295,68.254627313656826,21.156578289144573,35.370185092546272,69.393696848424213,51.911455727863931,10.459229614807404,72.810905452726359,57.408704352176088,28.139569784892444,83.656828414207098,87.569284642321151,26.208104052026012,54.387693846923462,6.6953476738369178,25.514757378689342,75.782391195597796,25.019509754877436,93.908454227113552,91.580790395197596,10.063031515757878,61.073536768384187,39.579789894947474,67.511755877938967,48.04852426213106,88.015007503751875,2.8819409704852426,80.586293146573283,93.017008504252118,58.498249124562278,87.618809404702347,49.880940470235117,62.658329164582291,44.185592796398197,12.192596298149073,41.709354677338666,52.65432716358179,62.955477738869433,83.359679839919963,61.172586293146573,94.651325662831411,39.183591795897946,60.132566283141571,45.918959479739868,72.51375687843921,52.753376688344169,92.274137068534259,83.904452226113051,76.129064532266128,52.208604302151073,36.21210605302651,18.630815407703849,4.5162581290645321,22.147073536768382,92.373186593296637,27.495747873936967,53.100050025012507,57.161080540270135,31.556778389194594,89.847423711855924,50.772386193096544,90.986493246623311,5.0610305152576283,29.031015507753875,88.906453226613309,49.930465232616307,79.051025512756368,56.566783391695843,56.31915957978989,46.414207103551774,41.560780390195099,91.234117058529264,83.211105552776388,29.526263131565781,94.106553276638309,63.549774887443718,65.778389194597295,73.702351175587793,79.991995997998998,64.045022511255624,14.124062031015507,12.242121060530264,3.9714857428714354,49.534267133566779,29.575787893946973,55.972486243121558,52.258129064532262,15.213606803401699,77.466233116558271,45.770385192596294,62.559279639819906,38.787393696848426,66.521260630315155,80.883441720860432,35.617808904452225,57.309654827413702,9.9144572286143067,39.282641320660325,43.888444222111055,21.206103051525762,81.972986493246623,27.050025012506254,42.897948974487242,58.993496748374184,82.418709354677333,82.913956978489239,17.194597298649324,28.189094547273637,78.159579789894948,37.153076538269133,51.317158579289639,56.764882441220607,5.7048524262131064,68.106053026513251,30.714857428714357,92.62081040520259,67.214607303651817,13.826913456728363,92.818909454727361,65.827913956978492,78.258629314657327,10.211605802901451,52.357178589294648,4.1695847923961979,10.805902951475737,44.284642321160575,31.952976488244122,42.749374687343668,56.071535767883937,7.834417208604302,80.536768384192087,54.932466233116557,8.7258629314657323,65.233616808404193,35.964482241120557,48.692346173086541,97.919959979989997,42.650325162581289,64.490745372686348,75.138569284642315,54.981990995497746,37.846423211605803,61.964982491245621,33.68634317158579,89.302651325662822,11.994497248624311,7.1410705352676338,9.0230115057528764,78.704352176088037,68.749874937468732,81.675837918959473,58.349674837418704,27.842421210605302,47.65232616308154,35.122561280640319,18.333666833416707,72.761380690345163,36.707353676838416,40.916958479239618,34.330165082541271,65.580290145072539,49.237118559279637,43.591295647823912,71.127063531765884,10.409704852426213,7.636318159079539,9.7658829414707355,6.9924962481240618,44.037018509254622,39.38169084542271,17.145072536268135,27.941470735367684,15.411705852926463,24.821410705352676,39.629314657328663,14.223111555777889,67.016508254127061,1.5942971485742872,46.216108054027011,72.018509254627304,9.3201600800400204,91.976988494247124,52.505752876438216,78.209104552276131,7.537268634317158,38.440720360180087,70.780390195097539,62.311655827913953,57.606803401700844,51.762881440720356,30.219609804902451,20.562281140570285,18.878439219609803,11.84592296148074,23.286143071535768,96.533266633316657,93.165582791395693,22.345172586293145,77.169084542271136,78.654827413706855,2.4362181090545274,84.399699849924957,50.12856428214107,66.719359679839911,68.056528264132069,40.570285142571286,26.257628814407202,16.352676338169083,94.156078039019505,10.657328664332166,17.293646823411706,21.701350675337668,65.431715857928964,26.059529764882441,91.828414207103549,35.667333666833414,26.752876438219108,26.85192596298149,37.252126063031511,47.503751875937965,32.448224112056025,75.584292146073039,54.189594797398698,11.746873436718358,87.8664332166083,26.010005002501249,40.669334667333665,80.932966483241614,75.831915957978993,48.642821410705352,69.294647323661835,64.193596798399199,3.6248124062031013,50.970485242621308,67.412706353176588,11.598299149574787,69.492746373186591,68.700350175087536,47.751375687843918,98.761880940470235,63.351675837918954,24.32616308154077,5.1105552776388192,11.697348674337167,95.146573286643317,73.45472736368184,45.324662331165584,49.633316658329164,5.2591295647823912,82.765382691345664,67.462231115557771,44.779889944972481,89.005502751375687,15.807903951975987,39.134067033516757,3.5752876438219108,56.517258629314654,19.423211605802901,66.026013006503248,81.230115057528764,41.164582291145571,21.305152576288144,5.9524762381190595,51.218109054527261,66.471735867933958,64.738369184592301,62.113556778389189,74.989994997498741,69.690845422711348,30.912956478239117,44.977988994497245,7.7848924462231111,56.220110055027511,77.664332166083042,59.389694847423712,68.898449224612307,12.885942971485742,64.54027013506753,48.444722361180588,57.70585292646323,1.3961980990495246,61.370685342671329,77.862431215607799,99.851425712856425,93.957978989494748,6.9429714857428708,95.493246623311649,52.159079539769884,79.496748374187092,93.512256128064024,85.984492246123054,22.295647823911956,59.043021510755374,31.408204102051023,70.285142571285633,33.042521260630316,65.679339669834917,82.319659829914954,8.2801400700350172,45.720860430215104,87.717858929464725,66.669834917458729,65.332666333166586,49.187593796898447,88.559779889944963,50.722861430715355,81.081540770385189,84.449224612306153,94.94847423711856,78.803401700850415,21.750875437718857,99.455227613806898,23.533766883441722,76.079539769884946,93.710355177588795,9.0725362681340673,24.177588794397199,42.947473736868432,68.452726363181583,24.623311655827912,70.087043521760876,88.361680840420206,75.237618809404694,13.430715357678839,14.520260130065031,50.623811905952977,77.070035017508758,34.181590795397696,58.10205102551275,1.2476238119059531,16.699349674837418,34.726363181590791,18.680340170085042,39.827413706853427,71.42421210605302,76.574787393696852,58.052526263131561,72.860430215107556,48.395197598799399,44.136068034017008,48.197098549274635,64.886943471735862,6.7448724362181087,93.462731365682842,64.391695847923955,83.062531265632813,89.797898949474728,96.236118059029508,10.508754377188595,16.550775387693847,71.770885442721351,87.024512256128062,6.5467733866933466,42.848424212106053,23.6328164082041,2.7828914457228615,26.554777388694347,27.693846923461731,84.053026513256626,93.264632316158071,47.602801400700351,35.51875937968984,29.625312656328163,58.151575787893947,8.4287143571785883,55.823911955977984,3.4762381190595297,29.179589794897446,63.005002501250623,29.674837418709352,93.611305652826402,17.838419209604801,66.422211105552776,47.355177588794398,78.110055027513752,46.018009004502247,93.759879939969977,61.271635817908951,98.563781890945464,31.705352676338169,75.386193096548268,42.6008004002001,56.616308154077039,3.1790895447723861,68.353676838419204,22.246123061530763,94.30465232616308,13.034517258629315,48.494247123561777,87.321660830415198,53.991495747873934,11.548774387193596,13.133566783391695,59.241120560280137,35.766383191595793,77.317658829414697,46.661830915457728,27.347173586793396,37.59879939969985,15.906953476738369,25.960480240120059,70.483241620810404,8.2306153076538262,70.582291145572782,54.585792896448218,97.276138069034516,97.523761880940469,60.825912956478234,29.724362181090545,6.8439219609804898,40.07503751875938,82.468234117058529,49.088544272136069,51.168584292146072,74.890945472736362,13.975487743871936,40.273136568284137,87.470235117558772,78.011005502751374,85.786393196598297,4.268634317158579,5.6058029014507254,89.550275137568775,28.535767883941968,57.804902451225608,19.769884942471236,97.127563781890942,86.430215107553778,9.1220610305152565,93.215107553776889,1.1980990495247623,28.288144072036015,85.538769384692344,4.0705352676338169,28.43671835917959,49.732366183091543,90.095047523761878,91.135067533766886,14.173586793396698,34.577788894447224,25.465232616308153,98.415207603801903,42.798899449724857,24.722361180590294,92.967483741870936,89.946473236618303,14.074537268634316,42.204602301150572,51.564782391195592,68.947973986993489,35.07303651825913,19.076538269134566,98.959979989994991,43.294147073536763,22.196598299149574,17.392696348174088,63.450725362681339,13.876438219109554,33.438719359679837,47.256128064032012,28.832916458229114,87.272136068034015,40.867433716858429,21.99849924962481,92.769384692346165,98.811405702851417,96.879939969984989,35.469234617308651,27.990995497748873,21.602301150575286,84.102551275637822,65.382191095547768,70.68134067033516,16.600300150075036,78.308154077038509,57.656328164082041,13.331665832916457,69.789894947473741,3.2781390695347672,2.7333666833416705,10.261130565282642,73.207103551775887,1.7428714357178587,85.835917958979479,61.222111055527762,16.10505252626313,76.67383691845923,36.162581290645321,77.614807403701846,84.2016008004002,66.818409204602304,97.622811405702848,21.80040020010005,5.8534267133566784,23.484242121060529,43.04652326163081,14.619309654827413,27.149074537268632,50.326663331665827,24.078539269634817,6.4972486243121557,7.586793396698349,38.638819409704851,29.773886943471734,48.939969984992494,36.063531765882942,63.797398699349671,4.417208604302151,60.875437718859423,54.239119559779887,89.649324662331168,2.3371685842921459,28.040520260130062,39.728364182091042,75.881440720360175,44.730365182591292,60.380190095047524,3.3276638319159577,12.539269634817408,27.446223111555778,95.938969484742373,68.848924462231111,38.589294647323662,40.174087043521759,57.557278639319655,77.812906453226603,97.820910455227605,45.968484242121058,59.835417708854422,14.37168584292146,10.607803901950975,24.920460230115058,24.276638319159577,73.90045022511255,67.858429214607298,66.917458729364682,55.526763381690841,51.861930965482742,1.1485742871435718,80.289144572286133,30.26913456728364,6.2001000500250125,69.14607303651826,84.795897948974485,97.424712356178091,1.9904952476238118,82.517758879439711,26.15857928964482,90.78839419709854,62.212606303151574,55.625812906453227,42.551275637818911,21.651825912956479,51.020010005002497,90.887443721860933,50.475237618809402,46.612306153076538,86.529264632316156,34.874937468734366,26.109054527263631,39.332166083041521,17.887943971985994,79.645322661330667,12.390695347673836,40.718859429714854,25.613806903451724,89.104552276138065,78.753876938469233,5.4077038519259624,55.576288144072031,85.043521760880438,94.898949474737364,82.369184592296151,26.653826913456726,74.643321660830409,53.941970985492745,83.607303651825916,15.708854427213605,24.771885942971483,17.986993496748372,80.982491245622811,43.244622311155574,31.457728864432216,86.578789394697338,56.368684342171086,17.739369684842419,50.079039519759874,16.451725862931465,30.665332666333164,88.262631315657828,79.89294647323662,72.662331165582785,26.455727863931966,36.558779389694848,33.933966983491743,55.378189094547274,44.482741370685339,5.9029514757378685,74.940470235117559,35.865432716358178,90.293146573286634,70.532766383191586,51.26763381690845,37.103551775887944,98.464732366183085,20.661330665332667,71.523261630815398,19.472736368184091,36.954977488744369,41.065532766383193,34.973986993496744,16.204102051025512,9.7163581790895446,73.801400700350172,90.738869434717358,31.903451725862929,59.142071035517759,52.703851925962979,77.763381690845421,48.543771885942967,19.720360180090044,83.706353176588294,17.68984492246123,62.905952976488244,30.863431715857928,59.48874437218609,6.1505752876438216,13.529764882441221,22.988994497248623,25.762381190595296,57.260130065032513,84.003501750875429,79.150075037518761,91.036018009004493,21.10705352676338,23.137568784392194,83.854927463731869,18.828914457228613,38.391195597798898,40.322661330665333,6.7943971985992997,46.463731865932964,25.415707853926964,45.077038519259631,20.067033516758379,92.224612306153077,84.498749374687335,81.576788394197095,90.491245622811405,80.140570285142573,6.4477238619309656,18.432716358179089,72.612806403201603,16.501250625312657,82.81490745372686,33.636818409204601,87.42071035517759,55.477238619309652,67.31365682841421,64.936468234117058,99.108554277138566,95.344672336168074,68.20510255127563,16.74887443721861,16.897448724362178,20.958479239619809,19.27463731865933,31.358679339669834,79.694847423711849,39.678839419709853,73.355677838919462,99.702851425712851,90.837918959479737,22.444222111055527,91.778889444722353,64.094547273636806,40.81790895447724,64.589794897448712,91.08554277138569,1.9409704852426213,25.564282141070535,86.826413206603291,87.519759879939969,92.422711355677833,73.405202601300644,87.767383691845922,6.6458229114557277,55.18009004502251,33.983491745872932,92.125562781390684,55.774387193596795,37.400700350175086,28.684342171085543,68.551775887943975,86.677838919459731,52.802901450725358,97.028514257128563,18.036518259129565,13.084042021010506,53.545772886443217,46.117058529264632,49.286643321660826,88.163581790895449,52.604802401200601,44.581790895447725,82.220610305152576,71.721360680340169,4.1200600300150079,1.7923961980990495,92.076038019009502,33.884442221110554,10.013506753376689,67.660330165082541,17.937468734367183,18.729864932466231,46.067533766883443,70.136568284142072,10.756378189094546,70.631815907953978,25.267133566783389,91.432216108054021,43.541770885442716,35.815907953976989,93.363681840920449,58.745872936468231,6.3981990995497746,86.331165582791385,34.478739369684838,89.896948474237121,60.281140570285139,4.9124562281140562,67.610805402701345,64.985992996498254,6.3486743371685836,68.502251125562779,38.490245122561277,92.323661830915455,41.263631815907949,20.760380190095045,85.439719859929966,17.244122061030513,38.886443221610804,3.0305152576288141,5.0115057528764382,98.712356178089038,61.865932966483236,76.426213106553277,15.26313156578289,1.8914457228614308,18.531765882941471,4.0210105052526259,38.143571785892945,36.855927963981991,46.95897948974487,22.840420210105052,42.006503251625809,84.548274137068532,1.0990495247623813,27.644322161080538,74.395697848924456,26.901450725362679,45.275137568784388,29.278639319659828,12.68784392196098,65.481240620310146,9.1715857928964475,86.281640820410203,6.5962981490745367,69.641320660330166,56.022011005502748,97.22661330665332,75.7328664332166,94.552276138069033,14.767883941970984,51.069534767383686,79.397698849424714,20.512756378189092,12.093546773386693,2.5352676338169085,56.665832916458228,67.75937968984492,7.4877438719359679,8.4782391195597793,37.747373686843417,36.113056528264131,4.6648324162081041,33.191095547773884,87.965482741370678,55.87343671835918,6.0515257628814405,23.880440220110053,82.567283641820907,76.723361680840412,19.967983991995997,52.010505252626309,72.959479739869934,53.644822411205602,66.273636818409202,36.459729864932463,76.921460730365183,67.264132066033014,12.786893446723361,83.013006503251617,62.460230115057527,37.202601300650322,76.327163581790899,10.706853426713357,71.325162581290641,57.903951975987994,95.196098049024513,9.3696848424212096,22.394697348674335,19.175587793896948,58.646823411705853,63.302151075537765,81.180590295147567,94.453226613306654,87.816908454227104,69.987993996998497,56.269634817408701,17.442221110555277,82.270135067533758,70.23561780890445,59.092546273136563,37.895947973986992,88.213106553276631,3.6743371685842918,89.500750375187593,62.757378689344669,86.232116058029007,54.833416708354171,74.148074037018503,52.901950975487743,48.593296648324163,43.145572786393195,93.116058029014496,48.890445222611305,5.7543771885942974,67.363181590795392,10.558279139569784,60.92496248124062,59.736368184092044,45.12656328164082,74.84142071035518,76.228114057028506,70.829914957478735,23.088044022011005,42.303651825912958,71.028014007003492,54.437218609304651,16.006003001500751,26.307153576788394,86.628314157078535,3.7238619309654828,20.364182091045521,58.448724362181089,67.709854927463724,70.97848924462231,26.505252626313155,79.744372186093045,85.637818909454722,61.816408204102046,15.560280140070034,58.79539769884942,74.445222611305653,82.022511255627805,73.504252126063022,7.1905952976488239,7.0420210105052528,41.610305152576288,56.715357678839418,96.285642821410704,38.242621310655323,44.235117558779386,84.894947473736863,23.731865932966482,63.945972986493246,96.335167583791886,27.198599299649825,54.734367183591793,57.111555777888945,31.210105052526263,33.587293646823412,61.717358679339668,75.534767383691843,39.975987993996995,7.3886943471735869,68.601300650325157,71.62231115557779,92.868434217108543,68.304152076038022,55.328664332166078,23.583291645822911,59.884942471235618,12.341170585292646,12.984992496248124,73.157578789394691,20.265132566283139,99.05902951475737,94.205602801400701,78.605302651325658,44.680840420210103,66.125062531265627,18.977488744372184,16.649824912456225,72.0680340170085,14.569784892446222,53.446723361680839,1.4952476238119059,24.672836418209105,33.389194597298648,31.061530765382688,58.3991995997999,23.385192596298147,18.482241120560278,66.768884442221108,60.330665332666328,84.597798899449714,90.342671335667831,25.2176088044022,32.398699349674835,93.56178089044522,12.836418209104552,56.467733866933465,99.801900950475229,9.4192096048024005,70.03751875937968,41.857928964482241,85.934967483741872,57.953476738369183,53.743871935967981,49.48474237118559,58.201100550275136,77.11955977988994,41.956978489244619,25.663331665832914,47.899949974987493,69.443221610805395,5.4572286143071533,13.628814407203601,42.452226113056525,44.928464232116056,28.090045022511255,32.646323161580789,88.807403701850916,77.218609304652318,46.364682341170585,26.802401200600301,83.953976988494247,32.29964982491245,44.43321660830415,90.689344672336162,32.547273636818403,20.809904952476238,51.366683341670836,63.153576788394197,62.262131065532763,98.118059029514754,34.231115557778885,71.572786393196594,43.096048024012006,31.754877438719358,93.660830415207599,30.120560280140069,53.694347173586792,86.133066533266629,15.956478239119559,42.254127063531762,26.406203101550773,74.346173086543274,81.923461730865426,25.366183091545771,90.045522761380681,68.650825412706354,95.641820910455223,84.300650325162579,80.33866933466733,18.284142071035518,16.7983991995998,30.96248124062031,98.019009504752376,41.461730865432713,98.16758379189595,7.3391695847923959,18.779389694847424,35.271135567783894,64.292646323161577,24.425212606303152,80.04152076038018,60.23161580790395,45.225612806403198,31.259629814907452,86.47973986993496,99.554277138569276,58.547773886943467,34.924462231115555,34.528264132066035,79.595797898949471,76.970985492746365,32.200600300150072,4.219109554777388,81.131065532766385,28.63481740870435,71.275637818909445,95.790395197598798,84.64732366183091,63.500250125062529,66.174587293646823,36.509254627313652,97.177088544272138,72.711855927963981,69.344172086043017,85.390195097548769,60.18209104552276,95.592296148074027,82.616808404202104,68.007003501750873,51.515257628814403,56.962981490745371,84.696848424212106,49.831415707853928,33.735867933966979,52.456228114057026,65.184092046023011,8.6268134067033522,54.536268134067029,2.0895447723861933,18.58129064532266,18.234617308654325,79.843421710855424,67.957478739369677,69.938469234617301,28.585292646323161,41.313156578289146,14.421210605302651,67.561280640320163,68.997498749374685,7.68584292146073,90.441720860430209,55.427713856928463,11.499249624812405,37.648324162081039,48.74187093546773,98.662831415707856,27.396698349174585,54.288644322161076,73.751875937968975,32.596798399199599,6.2991495747873936,9.9639819909954976,45.671335667833915,47.008504252126059,78.060530265132556,94.255127563781883,33.488244122061026,25.910955477738867,96.78089044522261,51.465732866433214,56.814407203601796,99.158079039519748,59.785892946473233,81.329164582291142,11.152576288144072,60.429714857428714,60.627813906953477,88.955977988994491,19.868934467233615,9.5182591295647825,53.79339669834917,20.017508754377189,15.362181090545272,81.626313156578291,90.392196098049027,96.434217108554279,96.137068534267129,77.416708354177089,50.376188094047023,79.298649324662321,99.306653326663323,51.416208104052025,75.485242621310647,20.314657328664332,27.099549774887443,99.356178089044519,4.7638819409704851,63.995497748874435,22.642321160580288,94.849424712356168,88.411205602801402,72.563281640820406,31.606303151575787,53.34767383691846,83.11205602801401,33.785392696348175,76.030015007503749,30.07103551775888,81.032016008003993,62.01450725362681,59.686843421710854,80.388194097048526,63.599299649824907,58.003001500750372,18.086043021510754,64.342171085542759,35.419709854927461,58.300150075037514,73.949974987493746,1.6438219109554777,3.5257628814407203,11.301150575287643,71.473736868434216,35.716858429214604,8.5772886443221594,71.820410205102547,9.2211105552776385,39.480740370185089,38.29214607303652,26.703351675837919,22.048024012006003,41.362681340670335,1.5447723861930966,77.961480740370178,71.176588294147066,24.573786893446723,9.6173086543271626,85.142571285642816,85.291145572786391,15.461230615307652,10.855427713856928,53.001000500250122,72.414707353676832,17.343171585792895,2.3866933466733364,15.857428714357178,59.53826913456728,61.123061530765376,2.4857428714357175,4.8134067033516761,75.980490245122553,8.9734867433716854,53.149574787393696,37.549274637318661,72.909954977488738,93.858929464732356,39.4312156078039,98.068534267133558,19.126063031515756,30.417708854427211,63.40120060030015,65.629814907453721,6.1010505252626315,15.015507753876937,36.90545272636318,59.934467233616807,1.8419209604802402,79.249124562281139,65.877438719359674,73.256628314157069,27.594797398699349,52.109554777388695,2.6343171585792895,47.454227113556776,78.95197598799399,2.6838419209604805,34.627313656828413,40.223611805902948,96.087543771885933,86.380690345172582,36.608304152076037,36.806403201600801,33.240620310155073,12.291645822911455,17.541270635317659,75.435717858929465,43.640820410205102,10.904952476238119,28.238619309654826,80.487243621810904,24.227113556778388,46.859929964982491,62.608804402201095,1.6933466733366682,4.3676838419209609,47.998999499749871,67.066033016508257,65.283141570785389,83.458729364682341,12.143071535767884,87.123561780890441,34.676838419209602,34.37968984492246,55.675337668834416,1.0495247623811905,19.918459229614808,36.657828914457227,89.451225612806397,10.16208104052026,86.974987493746866,22.74137068534267,45.522761380690341,63.252626313156576,22.790895447723862,41.412206103051524,14.272636318159078,14.025012506253127,87.915957978989496,97.771385692846422,81.527263631815899,48.79139569784892,96.582791395697839,23.187093546773387,3.2286143071535767,61.469734867433715,71.671835917958973,95.443721860930467,56.418209104552275,6.2496248124062026,4.31815907953977,14.866933466733366,6.0020010005002495,48.246623311655824,30.764382191095546,50.227613806903449,67.165082541270635,38.094047023511756,100,73.108054027013509,77.268134067033515,32.844422211105552,45.176088044022009,37.351175587793897,29.971985992996498,29.823411705852926,88.757878939469734,54.635317658829415,99.752376188094047,31.507253626813405,28.486243121560779,98.217108554277132,93.413206603301646,39.084542271135568,47.206603301650823,13.183091545772886,32.052026013006497,2.9809904952476236,18.185092546273136,96.038019009504751,93.066533266633314,51.812406203101546,47.949474737368682,8.0820410205102551,91.283641820910447,66.620310155077533,91.877938969484731,54.48674337168584,16.154577288644319,58.597298649324657,95.295147573786892,14.470735367683842,84.993996998499242,84.152076038019004,12.440220110055026,28.387193596798397,3.8229114557278638,25.861430715357677,89.154077038519262,61.568784392196093,38.68834417208604,75.633816908454222,30.467233616808404,2.0400200100050023,91.184592296148068,56.170585292646322,14.718359179589795,40.372186093046523,91.927463731865927,17.590795397698848,91.679839919959974,94.750375187593789,75.930965482741371,12.638319159579789,57.854427213606797,21.948974487243621,47.404702351175587,76.822411205602805,65.530765382691342,47.157078539269634,23.236618309154576,63.203101550775386],  "lower_regularized": [0.26383658326265991,0.35871426571278686,0.91904523965270102,0.72319449779131362,0.59774667604597864,0.46227906507522698,0.64225858449324602,0.60517665898742934,0.78859872180851154,0.59778424814192921,0.58734317552634185,0.26191086729339125,0.35480826066253052,0.6598580671158274,0.52251486749153964,0.37969337425357058,0.78712934494847897,0.78886459446852286,0.79841503667647895,0.29920958982954798,0.43227333924526989,0.51289642799300716,0.47537688431241326,0.48256514577158593,0.51993000053670246,0.81079449513913748,0.45455378845731814,0.74370976738760941,0.16982268543008189,0.69019205204921252,0.52164068054175328,0.66881995338527822,0.32184251606820552,0.44905596171520895,0.27652662927729627,0.50409409266585636,0.25481832329870807,0.44897416515996597,0.17817374960639459,0.90004488404721916,0.3579173807683288,0.696515643664672,0.39539189247051076,0.54873152911438483,0.39381448786973988,0.36966106049307984,0.70229406858394217,0.51396188175870328,0.68494746445507737,0.47497302681721293,0.42971121070659357,0.58177605148690559,0.65479389529633514,0.40406437712685367,0.21082604214750827,0.60070999943205805,0.74912276221943508,0.31372307649423697,0.11487008116071805,0.43737987629303737,0.26941297866356928,0.067970786038787978,0.52686294523440436,0.64130095540411625,0.32420788870790457,0.79788191180965939,0.91141970297384034,0.94585670515632403,0.56956205823837314,0.32617285385147576,0.79934981770809443,0.59150217902209501,0.2728225051928207,0.73306373040447947,0.34564401477648143,0.40790051326780052,0.24227929114605942,0.81561695492272468,0.38287830774032516,0.90469812806142413,0.89411547488955301,0.40957398438284631,0.96134939480900261,0.49150877586107339,0.65925308662711413,0.99680980338413805,0.38271661702057791,0.4055545356932605,0.36030352907139895,0.81551297890914975,0.15382968110895986,0.36569562269328476,0.46443920740601852,0.41535920376188995,0.61440442951545493,0.010943527868950807,0.57197460714633763,0.20127962088169163,0.47753597108787027,0.77379196738329059,0.48619547747133768,0.38397047479927321,0.77520583631134965,0.59464593661226639,0.4638562003131167,0.71445635931223428,0.14343160216034787,0.32889986559601653,0.40131683839110621,0.17527249413963275,0.28851075944351506,0.21975067521979119,0.30811132460893298,0.45166478482120442,0.64320060862349837,0.1383039345338147,0.37685246955480367,0.58072708154849928,0.368888000660826,0.46204105600244899,0.22748200778367939,0.21490530973256747,0.40162694958969897,0.53379329063619541,0.38801273984445622,0.16014493561249996,0.4239610431151955,0.50757225366759706,0.58153812163025398,0.69235390581861789,0.68307641939048014,0.45762884175976687,0.64929587888439955,0.14847449948907085,0.67665463587823538,0.25511331835025364,0.21795806994464856,0.1056183281998371,0.53767821571182162,0.78458506194713051,0.35656908044477248,0.27177034514848381,0.51549811905220067,0.37999535213957836,0.90812465559378464,0.95719284182514786,0.51210321427419148,0.18288779650043199,0.50679900672509082,0.22262231115300882,0.18916338877844152,0.98667865383303877,0.32695684661484264,0.69024366305470164,0.11234333013786386,0.61501367771907212,0.28372915439475155,0.52482473130376062,0.31797564219220859,0.48589937026020785,0.4439807132964938,0.56452312863743959,0.50842262844548292,0.026846623851764447,0.14840912436014417,0.50061139914482777,0.81046214248676429,0.48958964347012812,0.49478976210863573,0.96347594227197464,0.73720854826292392,0.1054130170834686,0.084853632778185278,0.73500932806311037,0.51616345920221873,0.76364383507557265,0.45524489070373586,0.84343784998480553,0.64967545352064471,0.39063485902944245,0.088909788070091783,0.65659120478163358,0.530656150720344,0.51666680913097163,0.30013404472848521,0.85272420726284803,0.12195989128340107,0.27089960634385263,0.59073984372774313,0.14743454597401279,0.5329535358118449,0.57784304356123228,0.39444044988724425,0.50769414992576345,0.53444913840106922,0.51856985615538009,0.44521731528578939,0.65523987413643026,0.54675154711641982,0.57557864840269246,0.82907016708921444,0.76042058972351456,0.71125360458796871,0.53659557787177647,0.46488955690650235,0.49962389282884972,0.16385223478940938,0.91537999409274484,0.59855388238690455,0.45955804098504566,0.45083339403721412,0.57552149142554609,0.48539821249046367,0.99172304662785471,0.44624054504070121,0.35784750514289132,0.76354643959206481,0.096937064557311561,0.020592574794222718,0.52581600640728476,0.56656850609110898,0.65059119024949008,0.4210677663735668,0.85189350112751527,0.36078408844225668,0.4642378615480649,0.01014333001742616,0.74761170297130775,0.63573145862389702,0.41820524409175741,0.3568605282290957,0.34487085316201799,0.68611627457915558,0.65747373069017767,0.26903770178880976,0.50677491747778947,0.29472159605250253,0.18027836034638314,0.6927984712064349,0.29781642930348057,0.76740734798668542,0.13229391268923255,0.48361481462251299,0.1964494631601599,0.64635007577036063,0.47541809322709577,0.46617927252651392,0.62164752742505247,0.55403693020916589,0.36433229226079816,0.48531284930854129,0.13595652033865599,0.30247888729522771,0.81431737680913496,0.61458577086395616,0.3137763602820503,0.77069671099468062,0.5064045307788535,0.95232537861330935,0.81401696505522358,0.60275995065334387,0.88617830356833771,0.73869693828242289,0.38971076471298405,0.59353633198979305,0.3931790432211188,0.43161799606009277,0.28213996059516694,0.31369657824915159,0.46845881726281752,0.48953074192970875,0.82874792196797087,0.38858439482039242,0.27581893569983656,0.61295181036875634,0.91972796537175061,0.12225182962954402,0.21721326018440329,0.39808791244263769,0.7220480220468386,0.62778736644157063,0.046943705160155488,0.49100461948600099,0.17809474683189466,0.23568433692627952,0.78486905418781527,0.63354166897290021,0.41678941473930164,0.5863522526106707,0.21986799601893212,0.097154069205830931,0.55762246167929996,0.95838662732748092,0.53121263501933813,0.17802433834312806,0.72363573738964293,0.41025916349907804,0.027161238645297646,0.76709054042129943,0.49496012594254185,0.27160720797811189,0.35808233384187432,0.45418292629587115,0.0081105030954099731,0.39142433366915291,0.3365349442440852,0.54927657043241274,0.39567613543800234,0.40786780891490165,0.89746766543819545,0.3379870490698193,0.41168730398809411,0.56130477203415352,0.46245258165439707,0.66340082924297594,0.041698672700110052,0.13308809259763685,0.029612343033108002,0.21962024164501201,0.18400315022451441,0.081028541036768736,0.071325910005909252,0.63933102305371403,0.51531304319642857,0.34285460769455656,0.31062700031175927,0.81581470882615015,0.29316033419395993,0.68335020425153536,0.27356756955531403,0.148871011146334,0.38152299974777404,0.63497537563553796,0.33924451743428896,0.59552304779144738,0.81811613737360145,0.80932004874125718,0.34708799813775321,0.1304593749895539,0.87845769844804178,0.16265445874085674,0.460610936096435,0.51970493510041882,0.41678486435510925,0.62281080516708298,0.49478972468644583,0.73380888505521624,0.77673101718126314,0.49951296326597694,0.38485038342078581,0.40826046094264018,0.11746031157734166,0.092597569367190005,0.66675757953822001,0.71046362597685941,0.49453872959127143,0.88287312083744507,0.80821228351715768,0.65752541237300532,0.3139177213559633,0.90247040511787846,0.51196737822232763,0.44793292156100994,0.45724968621751266,0.066445216217408051,0.26764296677850075,0.28448787237123208,0.44409933508905336,0.1582871984532209,0.49338436752483472,0.80774917061475227,0.63409472499218977,0.40912157461761312,0.1901449889420104,0.53281795010090161,0.13769047176310914,0.28828520747906355,0.83183852209300324,0.83276702207232156,0.28331713601974734,0.32634115496707711,0.72248389085685727,0.47939867349624721,0.50503068308159849,0.60503226498824425,0.38944019426778248,0.18462923891623903,0.4903375851451347,0.046431595119914286,0.22253779066359974,0.43535715929109237,0.59297348860197086,0.34944731767728576,0.59374233234993301,0.32437258489951687,0.068483265212877495,0.56935763118761562,0.63748596842044192,0.32963574382776228,0.83016595085567702,0.49933526792102217,0.18381704217824615,0.30621939290882444,0.94863278636432247,0.24386509098504613,0.53706286168723283,0.075313199103312328,0.53773375786278488,0.28820165769169881,0.90921717117664935,0.94752550123479273,0.65090019870547855,0.43673141444198382,0.49702991616262809,0.20741711933115611,0.1153850387803179,0.53319196812579428,0.71843417291753131,0.58014070132437778,0.27743870278170912,0.37089231388147825,0.62726698904782874,0.69076469323369594,0.60438740896904697,0.58934717881042009,0.079903459026206602,0.13296906102414427,0.3764637181994166,0.98990568769014398,0.62951262026149635,0.6218270467334891,0.49896628723370556,0.41309647017079154,0.70956728512498224,0.84224510190904434,0.59710210603660985,0.46531197074369707,0.6178747737629785,0.65764973337366994,0.4249013824077903,0.27273691746625489,0.0018611442554876156,0.19686774572197002,0.42920982447537015,0.48575673248085971,0.35066433683885789,0.84402276645256702,0.54157318110308383,0.94655608786060796,0.28598708890653379,0.57291334751105605,0.37007195973042956,0.86817029849062721,0.87256016117558799,0.18773669159385453,0.53245101700894981,0.70977158322615264,0.21903248080227802,0.24498905739331145,0.024543496352842756,0.53756356869190836,0.56353678178887145,0.077471810032171587,0.15267322439450903,0.63507585360819474,0.35186752362569346,0.30513135438795641,0.7508941199119098,0.32722688713632953,0.58369525050623006,0.084417051305696975,0.022050216515634068,0.55503693571898716,0.84223986025590791,0.87554410103798019,0.36511806868707686,0.84327977984374514,0.11471061441975035,0.7056073594266522,0.2482392034454719,0.56195940842958114,0.29970962015137054,0.38304944893174603,0.74278905781252857,0.67884162431986561,0.2495872984884431,0.36701361137216448,0.2911241243369212,0.67361054803359199,0.44085154661223641,0.13379384075637857,0.35562834476548022,0.09649566519995384,0.49326267990202227,0.36262149767968033,0.85258511211721522,0.4302070476225624,0.14371299940800908,0.27020956013121378,0.132036964991083,0.74769290589909021,0.3443197843386665,0.79137966305178975,0.40132705554162135,0.15908075159376675,0.79908094984060973,0.74431761434849775,0.66078014547990949,0.36435018081455905,0.15802196920953143,0.19260342882657025,0.55062056642948376,0.58255908418315971,0.63760702690283755,0.68539517218036772,0.53786399596119516,0.12715719376484161,0.47939891349213143,0.60470366411746812,0.50537312621842123,0.45742378487800978,0.55573697061959193,0.36324526832988041,0.70203182547616794,0.91920813320364692,0.43506860960592553,0.83985493581955972,0.86434937941055923,0.52015092355062065,0.26937607590194412,0.91183438671724804,0.50243688085115901,0.42869494137825559,0.48201065531951592,0.21172571442207291,0.73258628985489072,0.042551465841723674,0.32883317280238555,0.76519691200833284,0.77086481825234265,0.71774760233237789,0.22366776130544069,0.17435669604851062,0.35316378880142718,0.47062362143337144,0.29810101893838475,0.6575300886799017,0.30385506614833929,0.60170389786224177,0.73254078376013732,0.50967148813646279,0.73807526889944453,0.71322172825621977,0.10133313790883348,0.73523285398325711,0.34711849926152799,0.48336991076676805,0.4269748895202865,0.53345550396098762,0.87225174199905897,0.53254280178506574,0.32689793845982412,0.56031855855567525,0.54847670828862349,0.53921211296665517,0.41157310682048759,0.54980000939766493,0.51669602367870038,0.51291787130885902,0.62931348914358987,0.61445767254905936,0.60578247494874193,0.065373583606577065,0.63032869909482669,0.14356598948946878,0.98013212399419136,0.88710859688829491,0.67030436496237145,0.47895744868381424,0.21240347475288926,0.63118629018882544,0.68248784363586912,0.99557790187343287,0.35802486813746404,0.32195300924547038,0.89848313061497098,0.63788678284954226,0.68236016601380756,0.049081836025143023,0.55262478403722459,0.86760096028871658,0.31458464448103807,0.28086671194660812,0.48416263889026806,0.6189338019557189,0.51957483291666762,0.28621964425522722,0.94693432540977074,0.76491675708665408,0.20563080156145602,0.016983844355096901,0.46958134591825107,0.43898154191303151,0.35035498471533733,0.6066189471576604,0.43445325068003232,0.096311097403572146,0.97130165714707162,0.73203522760221096,0.95510228686516152,0.46124205348535391,0.18829860888077812,0.52184131240662346,0.21105099361925833,0.24136539521752254,0.53205598725906555,0.64500238008962185,0.20437045346487637,0.38993406001464637,0.35921843809006515,0.35767497609640109,0.41546807789233597,0.85884308534284881,0.24876893052080848,0.71706852157440759,0.64064301719868855,0.79754485864719005,0.84451774040349181,0.032581858091484853,0.5143288034687673,0.6645671745848486,0.37125505816880039,0.32390457371277609,0.48826773195198109,0.034094425027959015,0.95386543328985851,0.12529143220090058,0.21931076919749379,0.038698667670204308,0.44237585936617074,0.383704692168368,0.96989251917898878,0.49110725239571668,0.23578547891015,0.37245472460484708,0.28396312128278867,0.67446326753629549,0.58788198127079194,0.52905187682413612,0.7671579310917771,0.25771917128461408,0.27215988639790611,0.53869757705506904,0.48630945813322529,0.7794874307540155,0.47679633808110183,0.22589119395056811,0.64674612336259651,0.52715841272777397,0.6030795287416405,0.26979796813518558,0.46900386169850017,0.66308040352877606,0.97995316210571037,0.06620231172766762,0.65274811165348812,0.48333353246751481,0.88969186325280858,0.55342054419011155,0.36058547501607241,0.28674028843205668,0.77984581368738448,0.78433204350754582,0.42751711323027913,0.66477033902154847,0.62430615115396837,0.94498113681990581,0.7358662378490376,0.8552165566517419,0.58715304424661841,0.22216428509624589,0.51086913214302698,0.5311416300920252,0.67040237277205605,0.59167673375591645,0.28458873256277284,0.16829146691424018,0.81290026726795639,0.43612679900156398,0.58158284048003128,0.10223632990019089,0.57508867376430117,0.58381264644008202,0.77270863253892108,0.55254562734347357,0.55521059244509785,0.71855833320371809,0.42238727648838692,0.83965833968737646,0.2782020479278669,0.78286078849621166,0.45701099148540136,0.90884221254981412,0.17678240854276558,0.39222789862744106,0.9269214015879832,0.034398594861781005,0.51790576518525244,0.34836629547172593,0.39006065919540367,0.33430187869451444,0.50229064604138485,0.5825925978876304,0.57522488948660055,0.7141398909732809,0.39056732817707862,0.42671228034464775,0.91145387697491809,0.24827314764356559,0.65081007325816653,0.56443617225273801,0.49284457646447938,0.37696346146149828,0.76366877426192226,0.13032272568271236,0.94507282958204397,0.78819003953598399,0.020394439212989609,0.57798631443644177,0.17686808133342549,0.22325975624840749,0.030296098862493341,0.57792118704616191,0.60773287670455234,0.11500298638481384,0.32024487458436152,0.24178165721054196,0.97760624687392284,0.13996110639069395,0.14714662437720252,0.11149093069250554,0.37389216415380039,0.2845049727325073,0.50736053370253298,0.092807409605181981,0.60532289170372255,0.54013731567849288,0.55094995603542252,0.49756157208510821,0.19266569068635123,0.34898058449747305,0.55448997555595203,0.53332131446042463,0.42242486933611795,0.64141494464819016,0.46926515729280371,0.53956169633836581,0.28374950546450534,0.49445409265982104,0.44831295936022597,0.64355515521046058,0.68769685316367868,0.82501040642808876,0.95371112077150666,0.82183709520670378,0.071846136180808387,0.70321101349938198,0.46722935571347318,0.60608804786834769,0.51893489895744782,0.35603653132587748,0.63665233602996696,0.49195118943854826,0.19739143058312825,0.29808592315933763,0.49044911643003197,0.46591641278128815,0.28931461029296329,0.20886435247479992,0.47097173067383141,0.5719202421143591,0.67602423786474874,0.13106556411310391,0.4213184924364306,0.34223117153153831,0.11228813441531464,0.020259276164794691,0.42894462691297319,0.089994287451217556,0.49941697302407589,0.24674800496098886,0.80546471576049083,0.85553584032681351,0.98032872302169782,0.45880226981313604,0.31029295001751811,0.56094746238764015,0.41118273318591925,0.82327141167233342,0.12511383444497798,0.65789456158376702,0.5599759585805516,0.12459426686299049,0.54642134792767816,0.2497607720829346,0.36355477665635294,0.48909568550761362,0.81915937761023372,0.52209855296417929,0.37100105939161288,0.57101281363455259,0.51184015055438548,0.61746027016117877,0.65269477893544725,0.62961163037258383,0.25115883194038352,0.46663341257919988,0.82878320239215841,0.34258568784326204,0.098098235293806318,0.71134153714166881,0.07151822887548806,0.27148653786794097,0.92784908293115076,0.4462533106932749,0.60851280182594392,0.50001009640179683,0.5034852853163484,0.61534020325494843,0.347458848877222,0.082304902583891532,0.20373627565844676,0.67921847820577186,0.59969272918517014,0.47284228415949014,0.72363910326185232,0.66529427828567822,0.48777233303370848,0.29074062392242461,0.36727050896217905,0.85522917731600989,0.56991963378723653,0.52247934215301939,0.85255114525689468,0.13333085590867616,0.66736796635007511,0.11236306813229385,0.25320452943292843,0.67411279534002555,0.44161161398572452,0.21332211193948308,0.55639348078290973,0.21891154082215494,0.35947884234446964,0.75541099271646961,0.29135170650173309,0.85770092776035323,0.9541542901951966,0.85313285668534344,0.40132757186243639,0.49961879201566639,0.29723094234723352,0.28875818549819254,0.35688138730538421,0.45625840449758454,0.70112908694591425,0.71403797446628869,0.059490474045101292,0.76105080334119679,0.61271362732710555,0.29552313497778865,0.36619927918951439,0.67611111902837939,0.5913647588439378,0.22770342173634581,0.92532723509980097,0.77091608403975709,0.82687325249156152,0.93177875583800662,0.5468203060342125,0.56987662703867192,0.77027211146318408,0.71057741283502429,0.6655527806880861,0.72860536059679482,0.71493623123280392,0.42479041578322174,0.28781800504760657,0.93343337334842669,0.13722737869935117,0.47591276845483665,0.78793191465350443,0.32622124058653901,0.65722447945433293,0.39439264921317374,0.77282287580916054,0.58458174344038671,0.36206598163640435,0.35328555178051235,0.55785139690002761,0.43230231420865928,0.57378477686397256,0.69911585663700815,0.89493453005821899,0.87837524763237318,0.29581830577893692,0.11316321865090119,0.45051304385117297,0.46354012420001889,0.40272546564361839,0.48806199325497462,0.91917127382213126,0.19036277745515645,0.58094219865519858,0.50746071314970287,0.2872470588980261,0.37003617189762361,0.089246841154428908,0.81045857194823667,0.32696055548818148,0.81326209829105323,0.17067615923079099,0.70198406804072078,0.58379143154008095,0.65420007463954755,0.44748963353831445,0.54006025317926987,0.66284712659153933,0.46321862043110856,0.23409487191966699,0.40350702200526495,0.32585799125357889,0.22495975734118678,0.38794347219282987,0.69607171835381576,0.48998347733968445,0.84354154674518722,0.75037285249555996,0.49337592020611654,0.16359032551140043,0.36424324130442781,0.4876428561926841,0.33270035091791961,0.82443061971768761,0.27401053490303112,0.55740659126754322,0.7281930636940096,0.55433110991345336,0.56656546653178186,0.063030523981159506,0.22502503652457728,0.20991755162366732,0.80225430302315637,0.96259861825446102,0.8190961557986165,0.0052833596154506094,0.40723427027557751,0.066463862736101886,0.044433346041419963,0.95445968138533932,0.451505719979996,0.14671658455500319,0.34301984743975966,0.24630219638470699,0.75058710892985592,0.47547752770277452,0.95421612497919017,0.37460348135698801,0.42744168297963014,0.65170018318341316,0.58786944485029613,0.67546129863278881,0.72519350504250402,0.89805450552908128,0.60060177554333993,0.51184728991625583,0.53582406845960617,0.49649033456329528,0.48512453108650372,0.47479993405299414,0.45777995777212011,0.58200074467998941,0.64682966332954128,0.50322233115325565,0.26098351064420067,0.51697320758217302,0.41896644669575017,0.028573577692936166,0.073757488991613634,0.05706704798045277,0.12086299546682282,0.97889094914339669,0.33314078322324481,0.12274050003920796,0.50148726061414162,0.47515963426932739,0.90806668433803828,0.077810410998654905,0.55786187643634855,0.45640095457224855,0.046088367076581947,0.31018782293341352,0.40663516185542875,0.59826789262390467,0.58838004287720391,0.50634085197604051,0.69213578291893485,0.33038872407674802,0.065676234867890967,0.89578855897511533,0.57903153857786638,0.12298774503202356,0.33306390955909237,0.47521400605095726,0.033958789453158465,0.39418098368500654,0.4496293830939333,0.41060033134916296,0.42220064200768498,0.4785185410967327,0.45769961649997526,0.73531935124134296,0.17234397419059469,0.26309518240686852,0.11824631964853216,0.40954810235038436,0.80012606545910192,0.47328213948061648,0.16616825255800427,0.43844482395304557,0.78272119510196325,0.50974952112427241,0.050013226087987708,0.50621770583038328,0.7884766398194859,0.59498034263831301,0.6143843146071345,0.34785520321323737,0.69461406887173482,0.56765569610272604,0.99712209654383055,0.73460324770439234,0.58924341427469584,0.85463892025771571,0.5222420547767227,0.35686525366637428,0.55918667291699242,0.37780524599148241,0.63468853019040194,0.41418778981055659,0.51293487785503344,0.72818505337442585,0.62633897094891244,0.88934294145072512,0.48399423302608685,0.54802003525117504,0.22322890388042693,0.43736954899266656,0.42397962851713272,0.9189709685268983,0.84380666217861633,0.42518001847224257,0.25934066600983635,0.96053517841490299,0.38105312813117398,0.5956424310714753,0.97504611789272977,0.71243795425102208,0.58481048932758617,0.25426010770837787,0.33927273476867043,0.5056196778704718,0.62315262727853593,0.66600687782610679,0.43874741646415016,0.8541013691433601,0.42511754270607122,0.93413747040443829,0.41191017791182499,0.46792377978257133,0.65279873411695177,0.22624577934094697,0.66792412268526768,0.46462998548574536,0.0274655608021411,0.35319370035688524,0.64386121719737888,0.22964171376846637,0.54805575077191293,0.24316175622534711,0.49020289689653401,0.31254073701760082,0.1520224672137549,0.38325287199749514,0.93994771925800347,0.20809946323657347,0.82585645415477182,0.11168754913396381,0.8993830657638362,0.44836121826665121,0.44107774674066935,0.67976652640881019,0.91449377199282245,0.79514398298101374,0.52962755594806687,0.68488537163810304,0.49319807247963016,0.63766895069899754,0.75971608128049195,0.46803676239907899,0.76657922908777354,0.78810124830045059,0.22102991550756979,0.8632921832601097,0.4781259282417854,0.38886837529712986,0.19397735880347519,0.32278826205844185,0.12216450104660273,0.37610868340518544,0.67027250126734883,0.70627112749110743,0.23160842755307098,0.63203358129782539,0.27498006008536213,0.36879818973181361,0.50982839967072668,0.40743626556904039,0.48370658172705094,0.422627433385875,0.20457658720632779,0.82169939191213259,0.86804253415822674,0.24649422756102587,0.73033290796096795,0.61867652744277823,0.70852882795917493,0.5330698144122783,0.25223302639066508,0.89493545108657824,0.42815110278099122,0.9514674544788837,0.68876820866240951,0.41055017717727488,0.91537765117226777,0.68524373823763829,0.6171911924216763,0.43585439129945219,0.338698729682338,0.87117794260106707,0.62136446293818981,0.44772884609742425,0.1291075953903445,0.59664369748878665,0.055907344453449512,0.045933321313355292,0.26725667457411628,0.43112514413101222,0.60271741003305412,0.3319076186142127,0.34151308983343714,0.73480516553942909,0.44485315403386694,0.34290855388394659,0.66699698779246774,0.76923744677084016,0.69805565909312162,0.57418745126786175,0.79486535789805612,0.63382338049594211,0.69305439036626348,0.19289419050913353,0.45197234180756185,0.75489270939670705,0.41363398862772677,0.034174572544724113,0.17637110756373667,0.38564722986984334,0.71722918903113064,0.65911122355781837,0.73478276198278714,0.27892269770290901,0.56025524324728582,0.29626008132125642,0.55999503776510529,0.090821821367926991,0.031186912297471715,0.83567282676445331,0.53652151077141885,0.92234928480895995,0.9818675722643101,0.75092049347821599,0.53224065762339978,0.877309260938126,0.45659235514241181,0.56057035069487526,0.79666776341482104,0.56476460751580315,0.6149352733875213,0.14129372298356477,0.0030767759080130241,0.47151023402611647,0.50291129712712734,0.76386644354245326,0.79524986335280656,0.1705458193675965,0.66711006548957441,0.54495837945339876,0.48995017277139796,0.19106359657481262,0.33765874192791601,0.64356444571422677,0.83240837737700613,0.60382015070276973,0.043158434018262679,0.60985579464031103,0.50417404743472538,0.43825358632128691,0.91903884234827449,0.4565873342734672,0.025370734066754053,0.14962733560307639,0.57675156382203441,0.81278357651152511,0.52967173323855687,0.48776805481732194,0.70973236791366034,0.34903770534523815,0.93927452063213079,0.87104361807644759,0.7482071469986229,0.43926564518673084,0.24832858748307265,0.20240456421533684,0.68442677488280101,0.37887956528156758,0.36772903059940504,0.43617716661240952,0.42311818708836729,0.5224356491374289,0.58515779122142453,0.87029687992911853,0.58250009839857497,0.77956712483465218,0.48906486215572648,0.48550832389598514,0.57738850547306886,0.60827721381332545,0.39634684875650766,0.99200652213692353,0.43772786746040221,0.73583593153167659,0.1643262433187912,0.38693325487716651,0.58274777305813419,0.23173505098900476,0.97508810445825345,0.44724606424778818,0.79725702023093881,0.40826878353318774,0.047998041435246483,0.56752478958382624,0.72187019891555382,0.79244765326061561,0.50967316485613801,0.41020403559752888,0.50631300011769087,0.59155158278432396,0.33235511752973756,0.73006617582643685,0.72650382059469054,0.30769771588530231,0.70594998261424902,0.5188542400905326,0.7738985555571728,0.65562795619797176,0.71812579449349923,0.30763571124255756,0.29850204362422705,0.89080441517587761,0.24727181066530185,0.30233767188904148,0.39944039057476477,0.44764086809434389,0.72215352003259026,0.40953485672485357,0.54825238264954346,0.51716795317538489,0.72384999242887027,0.74026428272290534,0.87868310387550563,0.53819650970787458,0.31735862156784017,0.72477466289909809,0.43315148936444542,0.5862539329020352,0.79082441494688616,0.13196874690847024,0.84212071731182647,0.73320712219850348,0.5493511350621455,0.48222386371703235,0.56481881697434633,0.85382156834845124,0.20101102034644311,0.4233105885463127,0.41489746586806653,0.70209801204493327,0.94132292217784008,0.52227227359043216,0.63903010589525666,0.38982380815434048,0.51864377510763371,0.59711998037956382,0.60535229980720018,0.47530638829934591,0.69375750725631358,0.52901911294750048,0.11164407259641598,0.67251550388949199,0.68235260252624341,0.64082990808602025,0.21037745448705833,0.83250487518547089,0.077952777172519569,0.21626374903650955,0.68854174948609992,0.17081614334356995,0.54938476403503611,0.35747285998827544,0.66815251322852365,0.61942609004902616,0.54613796936624159,0.81100569227211283,0.30335158257789585,0.73014852222817228,0.57532726405028167,0.6873842551677789,0.71395141269322748,0.24876642721387232,0.5836670736867744,0.4411493966525446,0.34864969346741337,0.27851577834700425,0.56853123991846033,0.84227033056673217,0.81769327094441724,0.55526681200682815,0.79592737542856262,0.28995462928740073,0.16225525849196731,0.88706434171046877,0.71463868516912521,0.69998017417034275,0.53742866671158951,0.60523724381628663,0.15257198102221056,0.5394945854777824,0.51904606838057299,0.092603102692611239,0.41097750308573083,0.8349696139002093,0.50988649696402621,0.34486616822316896,0.43381044575249833,0.46782233741581369,0.64661672266735426,0.33715855171616876,0.5290867512841847,0.57323752807022721,0.42016340089563653,0.34432823267477058,0.50323178924342893,0.46866295492211024,0.84467981851880936,0.72321730594073574,0.81477974886650784,0.74750780520118143,0.69612691652915537,0.52672261661588671,0.56981142470464685,0.37954376009581131,0.37680799251061858,0.35921579492351102,0.62230579675938047,0.067789817796626531,0.58308060952507335,0.032837270464557415,0.58200630308435364,0.47016872389252123,0.93282986524373424,0.53390504535741068,0.42033528960730104,0.52281964043532714,0.1326575789932895,0.38140959259558144,0.16036979810871949,0.73694059476934126,0.45873518554055365,0.037068437546414652,0.28467168714274549,0.074502102236299425,0.45132139763696894,0.6444492335134876,0.59494620200961479,0.4549866826048532,0.55503487311948196,0.11484614918371051,0.11287657951854897,0.46078483672660941,0.081605982243649108,0.54020345817052562,0.28010474793583273,0.48988437267174506,0.44680366971316465,0.32533584037741187,0.25629316165621413,0.58132123166371052,0.95514209488260593,0.90327084245759226,0.035837380263873009,0.65538180802700952,0.53982532832173025,0.13759681994296791,0.57985345615198702,0.85840610036645015,0.34588855111326067,0.2604188132073717,0.38245358543943769,0.23936614969328929,0.30617837691559996,0.45306742511647202,0.61702852467242175,0.79358245529248617,0.13771083794181957,0.33724499344231229,0.95122900997485649,0.018337546472884214,0.17322311128250079,0.35224073386485777,0.56048282522719195,0.96415672850529155,0.55666213801738174,0.55112457603664433,0.71157109836342636,0.30769524329449827,0.51789632518407358,0.54118909072009769,0.34382833181493411,0.40996018686083058,0.28144802575614125,0.88614445490988147,0.65618899935447339,0.89099637896349082,0.95431003254986813,0.39973476033689137,0.47052991536897909,0.55254107042469158,0.59022059847219066,0.33707782272833786,0.87443985053990514,0.95616684455184675,0.53851712338873892,0.74256672399918622,0.63612717042732114,0.77921310257888121,0.68304833988161584,0.52360476259012301,0.96512291912765935,0.74633159664572668,0.08586307805662724,0.78691331762607419,0.66215207205699811,0.72892846695116598,0.8930296589541169,0.43701593581876624,0.66264342465132553,0.010772349687608308,0.84803115560578657,0.59427650218876349,0.64547391913630092,0.38310857676819776,0.33314817193866686,0.41029037868083762,0.8268205230258997,0.56612184647783481,0.099785591939154442,0.53863227039807604,0.70403650699990139,0.96991791270358463,0.48752111110271129,0.51921394144873956,0.65374692469142914,0.71573076390046486,0.68949936028983927,0.43908694990250446,0.91575154839410711,0.71074686538931087,0.54106814619571708,0.62188503233077053,0.95859648934832686,0.79607066285756245,0.62268457834900692,0.41317934847368376,0.70527558237981147,0.36932618372039194,0.52060190138754703,0.0080893536470347163,0.31270183889668818,0.16413642742274809,0.47953456757811846,0.46208873620922641,0.90958542094258787,0.55323671963670562,0.0037126289022878928,0.57554300785218604,0.25925087518709822,0.90129321128286555,0.29663012986723919,0.37184036631493667,0.4006945519539768,0.50769115547492416,0.80295332728297575,0.82095532398922266,0.50420689259848273,0.36688699747943793,0.51193833277649303,0.19679938892229706,0.52731551961447098,0.0072088852292677376,0.57949160347080997,0.86282752836445553,0.33693658525588466,0.5209683091388887,0.57682155392860923,0.23983122299997545,0.1615377463605146,0.97032032010704994,0.48813891066439491,0.24873251626673848,0.35444492010163142,0.63264709813508868,0.47266996953443874,0.60815250153969569,0.23784717425929056,0.7207915235690977,0.26887750356202705,0.54390874554225932,0.92884827905202694,0.22925708781941409,0.14376747771145715,0.16343665045468647,0.5327990727024513,0.1972740572555271,0.46261708436145277,0.19462358432402621,0.58709793131574917,0.62645957340474556,0.67701206343651454,0.54643580009390758,0.55569052365555205,0.81088553082866088,0.58350129288799568,0.56083590805841999,0.95719486574656321,0.84374263393429449,0.43023857628181961,0.36021541265866541,0.60303838431537415,0.28787649090478928,0.30120161442364807,0.50035634855767219,0.47422859766203734,0.80430018425305583,0.61361664359128543,0.47049790542733927,0.58702211381379099,0.41536268351855743,0.94168371900188619,0.22937472719344162,0.60155777422589551,0.3961703910400281,0.13100003779176925,0.41792397215016464,0.74767341777379892,0.29168481013096548,0.76723695250173762,0.35851956161214726,0.22619343264938463,0.16488211296637265,0.2757568243513977,0.32361545031911304,0.51630307440980505,0.7091287829571451,0.60444201627787331,0.11988944731803307,0.61694702770671395,0.76739618319330949,0.26378110986574432,0.46474905144593992,0.39161336117011425,0.41833008238926167,0.48599637779985788,0.30630459658277037,0.63777562260073117,0.75822588871170515,0.79697974824417006,0.58493786713074691,0.77106272289532363,0.15120844575871698,0.47443550502789211,0.22031697588168328,0.37455965509429134,0.4791075154261264,0.77712661183259502,0.82343406498921301,0.2137142394575676,0.90334422876677778,0.15409798909331898,0.99450908395794624,0.66047434768833946,0.2653462714683506,0.67257756353136455,0.5597939200212585,0.58424051834722446,0.78815407686520822,0.5128100886941388,0.20969286538023429,0.39876117114181714,0.41117629565942737,0.28319136890250768,0.35675501409772387,0.033358117042833528,0.87953687604853859,0.37525980048396657,0.40379595768484217,0.87086061420609295,0.20286945108368076,0.43412019677799019,0.35677278708695642,0.52341863031907099,0.40878672074902556,0.72493624776276333,0.12671625947585721,0.18568475205323159,0.32934293311856283,0.51761878439487685,0.40125997618208487,0.35688585725388516,0.91884616197224811,0.89113551501736499,0.7634537588796293,0.29026215287316254,0.69478620628857535,0.6558431855108463,0.55993813228090628,0.32551769682635762,0.5345798671565628,0.34954964293225271,0.38422330084959422,0.58500701190768412,0.21286004690526097,0.47690278593798602,0.70275514571221454,0.58881552556767314,0.4080587139660713,0.29778562289375704,0.61156330176296303,0.39270999023111186,0.21916416395957167,0.52479663510447627,0.6022971779023486,0.65983856183776057,0.51653794450057533,0.41099083065741698,0.30765429561151553,0.38465935310010207,0.79494774705985471,0.049422249509750722,0.80399198851221787,0.2868149386572213,0.4044591033901978,0.46902271819361541,0.37848189586529901,0.048699856897856747,0.54513288129742521,0.26259125812515144,0.29126841819229771,0.81730480953685825,0.38736504614456835,0.70659942024376765,0.46729473991068587,0.32478098602461813,0.53514447913096486,0.91929816682816912,0.7060208816183744,0.64576669938446296,0.37376004950554198,0.57645103544463128,0.21297574559340113,0.41544083355835643,0.44928804681155293,0.69464852126765941,0.48222169446261137,0.50692580412722477,0.23595981669537072,0.58854953237582786,0.52173577028095464,0.26225310543710023,0.13948143022350779,0.61472583197490682,0.54870856983296257,0.39211657115672666,0.42890656483009315,0.16622213757879387,0.40702989445201254,0.36551675526313704,0.60038453861284036,0.46265738041404164,0.41395461319847626,0.22015458461379306,0.28498323031634376,0.046795459737689921,0.19152625519846228,0.29522705488021006,0.29369775851991475,0.43757624720103555,0.39090141689490421,0.43353150276331459,0.62033194299546979,0.49858895792142538,0.59447311747008447,0.62302488294237879,0.39459218546091246,0.1773655190346953,0.72964540042613002,0.54694694359982254,0.94700845999161587,0.81533446217893613,0.68375295694525362,0.077215877132599101,0.4422360125003223,0.59498027200703707,0.46640257723922945,0.69398724005371204,0.52541751047327667,0.11492443848512936,0.55952098609757583,0.93784817818043065,0.040612074733561633,0.12656037229206177,0.83046923336407663,0.66106566844593717,0.36840815268482885,0.10667347485761522,0.68653066677259589,0.64088792214855028,0.41219923108371503,0.72188288157249059,0.92502705153087694,0.85786617604740467,0.70864234001799487,0.54900661763142977,0.28423016450826166,0.46607675898050971,0.54084654693327994,0.77117824732924201,0.39612016171907571,0.41821252615930465,0.5648057179796141,0.45498039675766055,0.55368502206900916,0.45277461314657252,0.64712319088438164,0.29795308486849786,0.56873352484001893,0.4836843427778012,0.47729306752696948,0.88324179415522797,0.45109712518278705,0.77927240598468883,0.81150994469508797,0.53238566937011089,0.10247782794127007,0.34051002172800698,0.45223749754053855,0.53006718399169905,0.57023749231624588,0.36111386822153757,0.48912154854979778,0.21604101917927698,0.48010768712158397,0.78666789025300354,0.58995234213301306,0.47418590407655736,0.90278381087290749,0.53620380277705959,0.80064381444027211,0.45211859471675403,0.50853286608059312,0.57544325820516984,0.74078568707454795,0.44547802003830572,0.27260769111109562,0.59482870370202412,0.15197871222608392,0.72060959912411193,0.18735599030002897,0.50062526166928689,0.61412536908550375,0.27042313338416585,0.54541522792815289,0.55676275487548832,0.78417150014746051,0.33390653417424021,0.5259182449056955,0.12876368574997968,0.40680353506148798,0.99573377385788175,0.93564658092006636,0.69054494700788949,0.10431756521788497,0.6433666292503607,0.91612823237847696,0.17219482539900219,0.91724064542954553,0.31727398047134553,0.71819447472606446,0.68047923088211393,0.35594762974611677,0.62903650621098717,0.71066047166445268,0.51591172214452563,0.56382171705439077,0.27876581984061699,0.83625986738986091,0.094763820989988479,0.16549226624539662,0.85310352284388713,0.93359461888797413,0.49391689861500959,0.469275737770952,0.75693340114592755,0.93624437969332974,0.79955957203800809,0.16357182179642926,0.56996876912419192,0.95372484374042654,0.95901342634443254,0.17855289677210012,0.85688943110709981,0.30603070133263638,0.72649392241066513,0.3594326947935173,0.32680224496057636,0.5909889008021757,0.035063234771134606,0.60421496661206386,0.55802359083603614,0.61039562636114497,0.46648700795224218,0.88243617601965274,0.87016520268765074,0.70453014866018215,0.42289922299973254,0.98099131478747115,0.36279637963212241,0.066508933257201169,0.5204022344204936,0.8140200536666623,0.53663390680945555,0.27287495061127942,0.54960710125998724,0.38651490514376957,0.84466378072060255,0.37835328733935292,0.33158021718058162,0.37793753642010736,0.35029688170800005,0.47827056083270642,0.65752329738552517,0.14243806549703125,0.61060692729563226,0.43193662483508405,0.58593019065835839,0.20703666328823231,0.54091986431603367,0.77543008238641653,0.52911887424582582,0.35960781420156174,0.58515166660625262,0.17035048293849631,0.90424814802431308,0.93659755904618447,0.64157229168061358,0.25871950864919868,0.48873867236721596,0.2288028151923335,0.80116448730070311,0.31438303189972655,0.34410316049185491,0.62230917866109159,0.41040753732436752,0.72731277013543649,0.46485880809242103,0.31096840834230638,0.48605231424590367,0.46190013428894244,0.52640228729473926,0.49920963516193229,0.63839888094589947,0.13689281889329313,0.7146469838483398,0.69136369569742817,0.72177537389124968,0.63191953131572487,0.32435451814721561,0.19048820426758384,0.22878192740373185,0.13026689348135287,0.098096792537554142,0.52787616827857786,0.93405799481826146,0.57434368816792292,0.39152760528009262,0.08139565457299372,0.54615556035795132,0.91845862753526175,0.98088077681118357,0.6960858867407661,0.93596323868758469,0.77138613034704895,0.79523312799855883,0.61091266442216718,0.56592691852116495,0.55858610641725615,0.30785918467103635,0.36961985042018897,0.28525387209535241,0.23158269557768851,0.39855023849688587,0.5682254488493329,0.32877604099381569,0.53415033061363959,0.53027005561478491,0.14424357399324395,0.27671540310242226,0.73353913128459935,0.63728388944425685,0.025205281724069956,0.49281539317665862,0.69152648557436969,0.324783780931929,0.64474304160236895,0.70237285278600847,0.97479079178511419,0.28858745189522139,0.46029722136402784,0.38109798495168923,0.57790907159956417,0.45683354032160634,0.78042334803225266,0.47070071404678182,0.53195407389018801,0.24729661588451926,0.61055973752432524,0.70896291443056869,0.56287279026104498,0.25368489661638399,0.58059866694770634,0.53220024986616377,0.27979710629607452,0.1587836393334166,0.71984295613461158,0.95817382225125769,0.43516062781408876,0.35688557682718491,0.46676538667862111,0.50852847513726773,0.50193638368643445,0.25248947134048111,0.92660702298651698,0.35099425316083149,0.38071492307106169,0.89192429513246363,0.5210523771356943,0.38472595737549126,0.70174068630872199,0.25229357524578389,0.25920075436296119,0.57812816563972125,0.8396466619477515,0.30465109845095872,0.78810377852931524,0.62260036876223446,0.40995034645670209,0.46652791674458355,0.60938035136126678,0.64406703137276022,0.60696915731991652],  "upper_regularized": [0.18101034267443919,0.46843320992703552,0.93274787945306781,0.66166216841570902,0.62276379511386548,0.56549808257291889,0.77417552673389545,0.45894570983237504,0.7484611505231048,0.58282368960847175,0.53432062572643668,0.22544584672655274,0.24847044669617627,0.61964904911608387,0.54447647531466059,0.41240012558872724,0.70664252959440055,0.92043717337549791,0.78689043493139244,0.31769158913426115,0.28787187859863733,0.50386735087565693,0.48431740846232435,0.53372064097644301,0.44536577773296643,0.7451074853430798,0.4233441142668774,0.56874452395628083,0.15993859575690228,0.78715580977480937,0.46522149260773143,0.47204798573360851,0.20219262103961336,0.34057950526416991,0.32385152962911429,0.54708514719343759,0.31039654635449104,0.4445186542408241,0.16217459542428625,0.83038729089837282,0.35999695294292239,0.64567398024775369,0.55402559501320836,0.54835030633834947,0.35564870994096925,0.36028084069818544,0.68210884185055543,0.43412544246511903,0.67231491595638027,0.38204082478847179,0.36924260122461772,0.53719583231522849,0.66683936916966702,0.45653299542576059,0.20588396475625448,0.52103422973196789,0.62285399199473712,0.2912041794981659,0.1368778548786134,0.36310591547537208,0.2829827532883582,0.0293835368018572,0.41225092861425294,0.66146444454654985,0.47031485046406485,0.78086572634527318,0.89038010865528472,0.90703409848014749,0.76329027968077545,0.25714829524334204,0.72268751499771267,0.48847325315072282,0.53055792568006599,0.68331508869312585,0.20135887215068882,0.41927211147651083,0.21873038943553427,0.78545087774057432,0.39174889511034328,0.85511293961163792,0.91060567161231476,0.44498647139979952,0.89977900108128417,0.45992242701449682,0.65620027720985863,0.95030590529282433,0.17970388709268353,0.46333712745648109,0.41558794847258401,0.92241345395719987,0.2835639050112414,0.43116107371036677,0.49035853316107814,0.52514724986144889,0.52347721487393861,0.10173097324185287,0.55887554055474875,0.24703762163872195,0.43782217672337725,0.76217952300529701,0.47626517288563275,0.42935177985758571,0.7530960369273848,0.56269585149509271,0.48403280024517042,0.60793764265776762,0.094352889057708902,0.36877048393958073,0.39846845175506734,0.19783974668860563,0.4375552774800347,0.28763253646837933,0.35848973739184264,0.41989728523284636,0.59459859921735669,0.13300433091346142,0.30677111158495374,0.61759438663036803,0.40287330793253612,0.73744881532947726,0.21752292357327524,0.21607904290994076,0.21686077120320615,0.60393798577137281,0.31588519949806781,0.19596540369179258,0.33315522262651404,0.55555134470681045,0.49252069410255944,0.68195533479593262,0.61563315665001717,0.5548476027157091,0.4958599746701508,0.28980998239153649,0.68969054144764408,0.25006103860352175,0.29510854732055453,0.088734433376875949,0.55227907185635206,0.67694537363611196,0.33782411646253785,0.29306966854492489,0.51694827451719372,0.42521136434998075,0.8592531996333026,0.96517374903527053,0.46236952803752712,0.34209162905616913,0.59435758595483557,0.13436807143647211,0.26369109330519408,0.76132315422473951,0.23874283082942346,0.38913118884481729,0.081428443586696861,0.48798788080484345,0.31600474801013867,0.36527362321660212,0.16559268150693163,0.44543771248179176,0.11131229647830958,0.55112849033225819,0.59325388233084853,0.011556360775288644,0.2891828805303937,0.56446034308095405,0.89026467706635992,0.61443322015013779,0.64293248963591276,0.92103271065877945,0.69432147154666135,0.12439626078526225,0.050270217760899787,0.68321975799793921,0.52208611152811868,0.62986485254557212,0.32186524877480999,0.91810373147922686,0.59018212773019274,0.22232840748503538,0.099447428541581381,0.65103205134307407,0.50363479219625296,0.49723864423312503,0.35186466661068944,0.74792382650174705,0.28396163847265354,0.34719287100290824,0.63026306577070867,0.24613578605862851,0.52202142055068068,0.46684819611157446,0.51526141699601136,0.59484128700627203,0.48303244727970185,0.37881228383515547,0.38508221509515889,0.70470654612610095,0.53857662597808997,0.51597414284302168,0.73080619017898318,0.77671331726119996,0.69372976114609108,0.56672993447912867,0.57907074566840555,0.37609741756621889,0.13076312338409124,0.84256828498601322,0.44530133920157067,0.44489988525025553,0.43810043860593334,0.62385533132805759,0.51390455985754646,0.92775676288650955,0.56073760802200934,0.53113228354199615,0.93871904654931015,0.18918529534056724,0.0074396569520464688,0.5831108243917561,0.57351119374766424,0.67680119451898113,0.45101537792542878,0.84246150786765805,0.28064027033492817,0.63523569065690078,0.034882177608611654,0.79911160869271414,0.63322001759463253,0.40022356058624714,0.42504770893899219,0.43777049437107851,0.75585050818868471,0.48538153768043296,0.26746015225962116,0.55731510165432063,0.30958563030346631,0.1914866921322973,0.80603927312565926,0.16241213909457919,0.61101439507932176,0.21579102677003389,0.46843095137277407,0.37845743185936009,0.66252109892265487,0.50624746310024293,0.42106646629108269,0.65938706381205647,0.43703031465665426,0.37830234406323571,0.92832583733221219,0.050263018265542567,0.30680442018428233,0.84035645339008813,0.5183290404188774,0.53235933717606299,0.67572941658737318,0.50019787987361519,0.77279729700106936,0.71719340508395002,0.54846588633590032,0.91915929153057552,0.83403189036373648,0.26228018728472297,0.62121227261964995,0.46892467159792189,0.39236908463067749,0.46903488679828842,0.2907367408466614,0.4152463956871974,0.49048161537615342,0.77334460645890579,0.42289276613506616,0.39812046190003586,0.53080126618245049,0.80456766160262561,0.015840578567934256,0.28443927272268016,0.42703919015058461,0.79603784034872238,0.6075513859605276,0.084355463760589861,0.3590244548227739,0.079266646585707076,0.23458668461967663,0.6928272642150729,0.69954902539380903,0.31359869337877305,0.57571198316017946,0.22425082071150509,0.14278186423366426,0.54031601288584741,0.91569250864615304,0.50361786851011336,0.23876215686565325,0.73152626640870333,0.40297586827910342,0.17103436852253265,0.82457949581958179,0.48640496130992428,0.38105573285706151,0.38729966282214728,0.51393680500422623,0.24597994556031252,0.37454551384671986,0.4343331087568606,0.50642140737165497,0.29157432906094966,0.53041515715899334,0.8654602265510063,0.34487203238065722,0.21886256662583431,0.55235080902653966,0.53698706559005316,0.61994511441177735,0.059704295911652536,0.2861306449268306,0.1182012842636487,0.15906104896397355,0.34459392442373343,0.094148425818580295,0.26055915491360154,0.69527660932076785,0.63412840318193242,0.42514356260160313,0.50347067567770942,0.88551857428934477,0.1909510363094252,0.67201413365482232,0.21068912343190799,0.31050732686833654,0.45380737532563437,0.59228869823232644,0.51641809648371573,0.50158113061711684,0.82663342001162532,0.71369034719005942,0.36846796590516373,0.13228541892365547,0.79551764961716243,0.36807865831071701,0.45566508711092379,0.43625046726659616,0.38741341318040035,0.38744408641566119,0.56578290273633625,0.75052304644715639,0.712701122236297,0.50450176212612952,0.54584580884287615,0.46245380037002315,0.17903974230911962,0.03176849121807751,0.52471955707649154,0.73617249249678185,0.64806175755826623,0.93919663315402058,0.84824313885132341,0.60599760562777372,0.31184621783722055,0.87425206355962459,0.54408835790517096,0.44176249023302239,0.59723185746537366,0.19963939748399462,0.30003991433772398,0.36064138688906228,0.37664312029036284,0.17636635711782422,0.51957971836309613,0.71418881228435827,0.68558573622573482,0.40450294988086455,0.24127182336418826,0.35500235369505817,0.092247002274835926,0.18179968957396014,0.85062418694568476,0.74020124743863336,0.12317343802218428,0.27883605674514061,0.59012138901393085,0.60139730314867146,0.6246817429568069,0.50890718442972105,0.29890043234445346,0.20195770569283553,0.34552774935586933,0.074108837301895228,0.18781832644630886,0.25856130640825464,0.51446525314024949,0.42140091429232845,0.37441586161031437,0.31241308903169135,0.10091237545882824,0.67861200904229069,0.69387010078542077,0.35890012208704086,0.88586182548132564,0.54130333711188638,0.096051107219358514,0.39022505980794298,0.96489980256406449,0.27342391138751299,0.42928829582311051,0.10656483523718543,0.47760779066972642,0.39807607932280525,0.79411467987048234,0.89998439908414141,0.40614607527539981,0.27462169728129332,0.43657905049978579,0.37677780469763411,0.085718284674522069,0.49092591451420653,0.75658596136603418,0.55907560977256154,0.34057189816984418,0.41175309976354479,0.52635944494022768,0.63220584805132629,0.5746657844357238,0.68128937101140086,0.063914541536067737,0.20656874586027155,0.41304800742657433,0.93216529513266166,0.63572325212270653,0.55361988085772074,0.52726067159134393,0.52987732670333876,0.64746142702751641,0.77127165429336275,0.45613979760522133,0.48127140214275005,0.65994209843039375,0.70876600575272819,0.49539980435949349,0.4582416892293194,0.12900082144186889,0.33173264907459604,0.48104504759745903,0.45154754778306877,0.51035596207814171,0.89523831814211818,0.62447515085984018,0.82144902975530976,0.30269783854579269,0.55946906087324333,0.41061076246264394,0.88193047686915815,0.81764161945468017,0.42908840849348212,0.47213067630082217,0.6676699269937616,0.098527354190405494,0.36944964673575553,0.078721251095232286,0.46243643130809159,0.44831337318853015,0.065710192771929091,0.18112504891729686,0.64021045686496214,0.22957587347697261,0.40949992928687456,0.7019405944350583,0.41607228787303835,0.75439076702788299,0.14148340523926298,0.029838775981027396,0.68280987610075894,0.95993226890116201,0.90160647960619278,0.30356025510440376,0.83582950115792498,0.0271420590255462,0.9456742066332422,0.32980034068168523,0.52239526426302052,0.33613798857548827,0.41782661463185322,0.57617049495053396,0.80825931672776141,0.32329935171618068,0.50746461146590482,0.47816467831045667,0.55031093386524066,0.46317895268304671,0.25318949247413142,0.30774326893982706,0.1463052475611713,0.11485830318001609,0.35598963044120596,0.76211422163142584,0.53283262642423379,0.096812403568167116,0.14103351304323866,0.14752607946516427,0.74775512613762418,0.34458047195270458,0.74411849056522195,0.64137124625390729,0.29409773587924393,0.64114605533012692,0.62553412289641053,0.73971811683198674,0.33281669786462109,0.16305965086676263,0.20058853378121247,0.5650440635293571,0.40631431849135019,0.14304656405509344,0.57689637661572368,0.67829181151897722,0.10662306182895423,0.51044997677369996,0.51436104867405796,0.4826589475272815,0.43357540498306396,0.43041460978981744,0.36998255618708736,0.36099492806362232,0.95179199398098346,0.46772461523533343,0.81502830931164105,0.86107010323841815,0.33103864488671975,0.42671005762954667,0.83620543626012911,0.32908996024851778,0.58278226641237474,0.43595449731989122,0.15793788227748073,0.6449998017569617,0.023583648179206225,0.29282020897031924,0.80927388457029492,0.80036238041140573,0.74059859646758797,0.39077658478284211,0.23759028765829801,0.46948334902691219,0.52937637856662856,0.25370341573166205,0.61261715037483855,0.32274310286663721,0.61967438516384488,0.68963458203610917,0.52946360534002879,0.69295480004425258,0.7121441077984344,0.084414331022147765,0.75336631395695464,0.40070900819976163,0.43738951937257609,0.34468913221549669,0.48257265030148716,0.91325803657268612,0.47360591685753362,0.32910021741270062,0.60030800086115654,0.68122279441382694,0.56526697511220281,0.39823654822075821,0.76641423067830383,0.58793831287150078,0.48947578324691143,0.66604901343269474,0.72423250674970918,0.80935539037048321,0.089434823532637639,0.66111949967309536,0.11085151862253323,0.9887482568878404,0.76333552135109861,0.74140168943554818,0.54819803581895743,0.056136069782090736,0.50140359201184148,0.6138763900602261,0.94730868635227528,0.46795559167228645,0.34388297757402181,0.93902271284789485,0.55228443423008244,0.77656818020333696,0.03617807949398804,0.72416445039043853,0.86659584730383254,0.27869950830709256,0.27832988955629229,0.47592241969860372,0.70134988758550754,0.52910265358386621,0.16899529627223939,0.94117182417366507,0.82264521997466322,0.22655995868656081,0.095406414892502164,0.51084106262276563,0.37051046709584451,0.26503107388347974,0.52772220438440842,0.4398447090157333,0.13462627749378062,0.95025837734764207,0.82419409705041446,0.97706208883430445,0.45159402832003342,0.39589114844053891,0.48751528402622035,0.24815888181464793,0.089083846840189204,0.54425947988579637,0.64975897526788207,0.16884029363121397,0.41617291438899173,0.61049755170548459,0.47131613891355179,0.42350520845256712,0.81746951575398741,0.53789103390473558,0.68724533030210444,0.63914230902281988,0.80195238398028901,0.83263690507543853,0.022111955773203327,0.46309428745755582,0.552415564868175,0.33261972344118818,0.31214135303172263,0.67358441885340892,0.18604816900567284,0.82365211124698023,0.34661009303283297,0.24138534594830061,0.11572156475042442,0.38744692604730796,0.21568003957871415,0.84777737701607825,0.4350912516840203,0.14865650931627819,0.38234241590685919,0.33376935373281696,0.64622130182493076,0.56240900387705361,0.46140434557279603,0.69120980625127504,0.14026783032230025,0.32672914880327675,0.27185535602972621,0.36844275796009762,0.71682939572444615,0.4675970278827597,0.15664558249144353,0.52103921605855696,0.47716226728958216,0.7514125666174859,0.19692188233720576,0.36233978223278973,0.59586424314280129,0.93122430996995342,0.23230434144691622,0.71448558606323909,0.49321074636774287,0.7009880735310422,0.6002438453292418,0.44701784717555287,0.38207414488206676,0.84512751673671249,0.75601760326908118,0.3206688100431257,0.58551764522279459,0.87296591508047383,0.97434286633656508,0.5088945154819644,0.8430740937770751,0.4595526979936092,0.18905137480795919,0.49071274464864023,0.43132540749763132,0.4993689874135106,0.63001001830108494,0.36502551810318595,0.34173890819469643,0.77722529737651169,0.27136614434689516,0.55655894432284747,0.19301834248372388,0.70713454437501833,0.49225333410770722,0.92044028667037237,0.46949754386092107,0.38513519449794059,0.70271637878576509,0.39839932986664284,0.94764954564895765,0.26354045845250829,0.6456448543945521,0.56788032237395469,0.90848322314520691,0.25254806411269587,0.36468712340632958,0.89318951468613261,0.050299487595831541,0.62867195758673389,0.36474422409373075,0.44403607741684348,0.27202356249336707,0.51601286923653022,0.56657735642291762,0.36476423949545028,0.70759359527182786,0.3802695121420312,0.46065960162166264,0.89596885857920205,0.39509068195258495,0.60745054832569501,0.66067150974194966,0.56673081370622469,0.49874136563254201,0.78903379899164361,0.069737285565127219,0.85381807765594531,0.73099120898073189,0.0093034701519509808,0.60070030419617781,0.26801090732594524,0.14095676955648356,0.18737204904695862,0.54936750170099724,0.75598984921200352,0.097068410172413508,0.52421183406063399,0.13894981380898169,0.96624922809037317,0.11188522532345518,0.19948731635184289,0.1938219500562508,0.33660485859340383,0.21222357333738132,0.49541263117322099,0.11165313662127013,0.67654876904378614,0.6716499964011059,0.59580307472538052,0.42380066954002232,0.12845885935239157,0.35101466364005612,0.44966236048650449,0.54155886960036592,0.42867030009918189,0.66324200013413115,0.270461730618482,0.62579898369648623,0.19917951440140355,0.48002486915805281,0.43128386458027712,0.57871299708308288,0.70035238892815266,0.7141140353658616,0.87629264305265286,0.77795681421649809,0.1546508494896266,0.63227649148341258,0.42244400228391776,0.62654537694384105,0.79969753803200994,0.26953338446390496,0.46431100503339967,0.52204541157699103,0.80639183809282944,0.59652336928497174,0.38667147819773501,0.56669533160522367,0.34724292193840145,0.26762060423217343,0.45032783064541276,0.48215699313895921,0.71431044612624373,0.2072053730594702,0.25239395974733564,0.18362339791803065,0.061898675296342444,0.033802012108681952,0.39287923316355511,0.072524311008895337,0.51104058191878432,0.11660691498372611,0.91207862729973455,0.86360314642328928,0.90301929130015146,0.31067779175735244,0.30843061810288269,0.66001189003870187,0.37476763191776036,0.84486048985730711,0.017981923354575543,0.66794991506533541,0.64765928493546898,0.12070769562594433,0.29650123431533476,0.28406367547245004,0.48507999014494169,0.62937670710760185,0.88213802343078307,0.47726615627703045,0.3761506516489217,0.70655530189685967,0.41914630251546026,0.69096849313838404,0.71514196348398273,0.5656949194075741,0.30613405170699959,0.35882297764930576,0.77160696680293972,0.10941895083602989,0.099741227715103117,0.67993191386842711,0.073648985971977707,0.20044413988342225,0.96056329087187053,0.37014591505143146,0.73301905578980509,0.52176813008397793,0.4509150089974574,0.54302985795223169,0.35703031427425702,0.083483383662651123,0.27314446515506519,0.83122259179796687,0.65549899815686619,0.56412790972783644,0.63518415835956998,0.71465774864073184,0.66589158824902284,0.25076652134612198,0.49918274828054499,0.95374946065733468,0.41777031477251136,0.42435346202311403,0.92290963464895259,0.07415735174496553,0.64664671570941601,0.16021514531021522,0.25002029357562827,0.6205301998978956,0.53239337116874075,0.15197481218094336,0.53121036397158905,0.28448939339024581,0.36345383647062007,0.70457053859613972,0.3485645001255443,0.82003625911616262,0.8125455537496169,0.8560337656539122,0.45844161760912722,0.39507857967212073,0.22269476157387427,0.21463736047418494,0.54335255219797463,0.42950890850289414,0.62554601433746404,0.65666534456159964,0.0092129840318098295,0.66097565226500177,0.7405617722373623,0.12588286457053996,0.46855166241015361,0.62870020014489658,0.63700161063214733,0.16006483810501243,0.85939832374936742,0.95399130585291048,0.92227109169002819,0.93666528331434706,0.7001263101057138,0.70869387526267225,0.83766242390549728,0.6914570994414837,0.88469131123596356,0.80137957159889683,0.64878548670074976,0.50695827901437318,0.26146755719636527,0.99178393125085618,0.22089368892607508,0.49713493159976591,0.86639639132353397,0.30368455543722583,0.65466691167268676,0.42382624675144265,0.69354300482690123,0.661805288362879,0.26620706919611725,0.46598033639102499,0.49014992480345476,0.50442593128709157,0.49962006103299517,0.65761542669622941,0.75866883337174362,0.78280334007881947,0.20549216850164609,0.075410365121156231,0.35708799601074109,0.44300698581074183,0.44132046431176253,0.36576875861750952,0.881711216381036,0.3172436220635223,0.57622526801268492,0.63149620389351735,0.3147228772242196,0.34248079768902867,0.16715571127183637,0.75227125433934994,0.36775748985043116,0.85634558029952124,0.27122264594515549,0.69066237529009789,0.46664336254922395,0.66491292525067491,0.53217165450031334,0.35780886976642245,0.68364624911814309,0.64194657772213526,0.31968807015741646,0.49591863777332934,0.51812264140921338,0.23557641065105758,0.36003292216510902,0.77677328354504249,0.52751006813692014,0.70894103279246967,0.64050865625960218,0.52942063845693288,0.2063323355540212,0.25652774391031447,0.54593847207326596,0.2648581680170784,0.80438846195527136,0.364967668095243,0.48248626926010285,0.59743233391100325,0.60737523522236203,0.58282475373163567,0.078409311471690168,0.17984322735160185,0.22403468488280981,0.79699203818218922,0.89995772408993513,0.66054742776170594,0.0096911554803940717,0.36568938296387238,0.10044685183841781,0.16339726343658001,0.85210460522355946,0.48017389480965061,0.17860310890529604,0.47755804719371692,0.19286769570244852,0.85336622863829092,0.21268732450391722,0.95418533217241974,0.40829037424363018,0.43203443911951928,0.47195438874298373,0.43594999700139198,0.72330898404880439,0.76362892560003692,0.94705488476162936,0.71174003169672329,0.45415895227868924,0.5968416507237837,0.41016084627231941,0.47270829518157426,0.47060630613561982,0.447367764624716,0.6715024822501936,0.33739719523865719,0.56815194644420053,0.42435450918414719,0.48968750157536017,0.63303060142451106,0.22739979597802187,0.0018625807609267391,0.069825378803536842,0.066750133935918624,0.99495487079103628,0.43037933195106187,0.14207459687703805,0.49099249842461162,0.4886699120618076,0.94537125568010738,0.041875668968879738,0.50345240635509569,0.58593233197254024,0.0035502965362329852,0.2681258961012209,0.58219891331073859,0.56941739042987649,0.64856066085884179,0.56543657824646854,0.6424257943485524,0.29897893459967079,0.025459414721776107,0.85883641489559248,0.66714160875602457,0.069893938139422296,0.53019435552069882,0.47896880779270756,0.02500950613434855,0.38936259334625012,0.28681630489385052,0.58274244066778091,0.22598409286580753,0.54665858896245734,0.46550976483932449,0.7081437861500478,0.15306154763233309,0.39117754762503004,0.028132467736777151,0.47243949940448665,0.67570182061466022,0.63078466605992234,0.16299513531844945,0.54054421270437825,0.73923752966361322,0.5789048695068495,0.082469255568943217,0.46315534222808091,0.81766576297012394,0.43656918611096446,0.65883555676249383,0.40717563994958117,0.76344474192455902,0.49176846459184542,0.95218522897533797,0.90331379060397299,0.64454352242677415,0.80624018894140015,0.40437548718852168,0.28147008510151217,0.52900472389327902,0.43881459325003375,0.5011549223210443,0.3447921588109964,0.32715349373906727,0.60602309527467668,0.53446312589022649,0.86313682345565068,0.52102769896389745,0.65812121480668273,0.17362409590262159,0.37503710231936094,0.51758957319761423,0.85526245952548041,0.81456410299815041,0.44525233508395745,0.20206793785629953,0.88374660992416243,0.33044379874992741,0.64686826560343635,0.96199139397693922,0.62238801353755757,0.61377158962951484,0.29657828422953025,0.37839783836637075,0.21603848691480779,0.69694356597156115,0.72015478674519295,0.56336716032663958,0.80090390146765222,0.56011902964168647,0.97603348504228082,0.18793843386617406,0.5241279156866131,0.72769872094530841,0.20187972134455373,0.69380376727672077,0.35284287920859841,0.039899748562457968,0.4278566219300724,0.67386169008689989,0.28933255673060254,0.56091309104637954,0.30684884087142361,0.73708907648147082,0.17233344757103788,0.17320992879065061,0.36924668633406033,0.98021785174686415,0.18578242689658275,0.65897312879429637,0.023206464206550925,0.74023034003182531,0.61878485455545562,0.42644406716975969,0.61390009546067581,0.8701018108131291,0.92509658182710486,0.55778431212865121,0.4988927789518196,0.5596464047594607,0.60496808415600023,0.74609528111612433,0.35943055383327499,0.7749321912087721,0.7732264050098322,0.20779296736855707,0.93147000267236046,0.38826378239431419,0.42892325333731152,0.27715899718944381,0.3468409105005445,0.029843161480732492,0.32576333599079893,0.68338150141482057,0.6141934868928095,0.3715709997692484,0.62829913436421414,0.3696721522459569,0.25393990357165058,0.72612770052725994,0.45767735766241247,0.45924113959314461,0.40948171462977045,0.16775920927341181,0.31388446057625063,0.93008069412177896,0.16221976542833463,0.77381682493303505,0.58521460130517211,0.77197551502861705,0.44428684154048409,0.26318127674506203,0.92357055537453092,0.50038465550623046,0.94774245326882089,0.54116273898994927,0.36778484078916118,0.97318187911233178,0.58184091235474333,0.60164819059480601,0.34409066737788002,0.37536060316558234,0.83259755810218561,0.77625615179484708,0.28407738485762801,0.013672910613088717,0.66206483762280766,0.12567522390838029,0.12492463787007319,0.24247314980685686,0.57417669291109608,0.63301300450300224,0.27399191590228972,0.36311700323398671,0.67858641709388723,0.43035635659007859,0.42076518631382515,0.50400631659636819,0.6977461205346599,0.82604760743989358,0.49659066136835545,0.80141696890231096,0.60942882319681368,0.50914448228415876,0.19513162347185511,0.48154061753510796,0.61301170701894303,0.73294657730559332,0.02886161162557745,0.21238943989247455,0.3178457076277541,0.70637680481168197,0.73373575239824573,0.68108665193889595,0.31124320902955499,0.53289934199809552,0.22030663164250192,0.72818150618555488,0.058028116597004006,0.012086806489731787,0.90859217765768963,0.54560888008244357,0.96264930410207117,0.93385135923762463,0.85164253541932555,0.55854343876908874,0.8600855677817838,0.45584712104805963,0.56682390593129917,0.81072552984132984,0.48757725674409258,0.60415534324491582,0.16772410087258519,0.073576641754447766,0.52997394032650003,0.49657941421970347,0.77851078578292909,0.9269290017641153,0.39224705597256099,0.68432057991520268,0.68739340095351831,0.64681789039172899,0.20541822699617962,0.073729513938609922,0.64284739059974805,0.94470851813777212,0.60970204586112708,0.23974198962338228,0.72073489235084032,0.5746948746387297,0.41758910142397221,0.94296949724226209,0.37761556169192995,0.022671185117262422,0.16991452650217148,0.92603379579736833,0.62560825374649198,0.58667589107973961,0.54603783111876825,0.62537439220900359,0.34649326938790753,0.91308596000925579,0.89888280299273338,0.81449492034025495,0.5105784833115693,0.25030952791239797,0.063009483026364166,0.65975650184251655,0.46291022912430579,0.42557491599852248,0.35236013662435228,0.44625189960557204,0.55505360549164517,0.49543370280196791,0.89804270226970873,0.49851993130705086,0.78268082443096343,0.47574703131624146,0.24858337594070423,0.60519181485570361,0.62333409912407656,0.37310386108940152,0.97807899865771442,0.37349121693742898,0.72120632375654992,0.53362876837200945,0.54415209347730009,0.46028191950669967,0.45347932440150279,0.96514206059441376,0.56367914184495116,0.77679734223928409,0.50507788739237469,0.071831787002135591,0.65951964350826719,0.65688345336747289,0.84459226528645281,0.46224198168889813,0.49666562664239977,0.59317947209559929,0.43356827395250475,0.50489256963383333,0.61517214464589653,0.85138944766127078,0.25117145662850104,0.72490458003922675,0.49256043769202351,0.49783491803592117,0.71578429512326824,0.80447317954704733,0.26691886541050858,0.40607270323556061,0.82889629599106429,0.35878783833518668,0.30530978161250577,0.5460937079196303,0.58242508179422681,0.7123939993142917,0.45822321929521331,0.70781318427204842,0.57103175801123562,0.87396546089600269,0.80462306494996061,0.64842418670479984,0.49986475661602198,0.27319229040496634,0.73979455916245052,0.49235465871246031,0.60260343743804201,0.65084759759218669,0.075752672983494182,0.84608881140422465,0.77196799403295713,0.46118193525838591,0.60638997440264164,0.46326330571308194,0.66193516453695833,0.23320646640821405,0.58600993189091943,0.47887434784014171,0.67886542984806275,0.94928937022864701,0.43787647239178967,0.69401502845810481,0.33119186304293424,0.57136876319054342,0.55655603609956239,0.56156488837178664,0.37795022354179897,0.72123624629544458,0.59855791641351819,0.32610106460575355,0.63737527291269236,0.69096576800287257,0.72061881032111696,0.060647854421378183,0.82815943422666161,0.023236562876689595,0.22753044001496359,0.67197054619429619,0.25753788099669678,0.58861501147353923,0.31514730238115879,0.65718771382318009,0.69074825339397894,0.48206773233648065,0.72231796216356037,0.10439809135019731,0.64466971452315336,0.5367880764646451,0.76133207945310399,0.62346214958368029,0.24142476686262926,0.6844352834518892,0.48715628422833446,0.38366422782201309,0.22754643226652649,0.47381675450144839,0.7957791769259317,0.67295683754614255,0.47283932199973333,0.69996993729046653,0.33335840646498116,0.12980719067729132,0.89547654495238549,0.57241708287349879,0.55955575910769939,0.52920191098490743,0.40801937626167495,0.27810589006436504,0.41260089461617117,0.57041882647663988,0.12488753525461874,0.50506948906314697,0.76048112027598258,0.48322994037000933,0.44747400710623142,0.49412202076769507,0.51230159762403205,0.73331829413818372,0.30674322130071369,0.61656691629324067,0.58694326441225197,0.41717840786444887,0.25651649008393607,0.50734071183243401,0.53819899522906467,0.71882749122115153,0.82626939783755615,0.68360731451498591,0.65386552532885933,0.59989138014411503,0.57084224355235547,0.43080937197770736,0.30636013240814503,0.32054774974835426,0.32488648243415075,0.81076848669250146,0.013473381120125933,0.58681108623590994,0.12034684929927932,0.62654942386947887,0.38593192422519906,0.87737173870514951,0.31345785240766127,0.44599941878273691,0.45074143522948767,0.14738899035238284,0.33869535667449657,0.15024174547194658,0.87082992038156026,0.52339172837521197,0.02347873400763148,0.29011028684248491,0.15586567335162058,0.31847908858918134,0.74166708297796824,0.5511306183640049,0.5197971915538051,0.50684421020571202,0.040805378831718475,0.31307082373354039,0.45502009617153011,0.11420508961801894,0.52120426552592336,0.39821935553606941,0.45105222814438301,0.56203741485186787,0.32699855213820994,0.30290870171214407,0.56468441912027156,0.92252255987898946,0.8583789721721774,0.029717431024683019,0.64974502333488371,0.77557204685963221,0.18933198453407707,0.66179691264419682,0.75751984291990337,0.32637851463745526,0.31619323494596635,0.48066582027768123,0.11911100648708201,0.46857486151294925,0.53321358913809147,0.70022650615765347,0.66969675952641927,0.096421776773058909,0.39023256949417917,0.87847363412926027,0.019756272052494254,0.30295641547119984,0.4004934603400887,0.43541287591562972,0.93592844636517936,0.52382240338105768,0.38186375322052141,0.82933636503792585,0.35583016842546911,0.63622810169631749,0.49357292828597726,0.13640389911817966,0.2509181512132973,0.29125260892184607,0.79632545382355879,0.68688744325804829,0.92028917402007848,0.89498218244158723,0.40609856802063027,0.23083538174920526,0.52598375415717646,0.54067860072449003,0.82706234091150366,0.73435621608759183,0.97088291940104521,0.64977477490717162,0.66399771459304047,0.57613372525068518,0.66782896960371563,0.58263686354629829,0.5079965283222182,0.99580386518495967,0.81730117797648738,0.088164860987626159,0.73579124864995293,0.57328177515657097,0.59439834992047569,0.88470676427667072,0.47723177432765279,0.58302935839815084,0.062073123943600372,0.91743474962933247,0.44557622403634278,0.56584741951681872,0.25174182521318422,0.38254135197095401,0.58970962131916238,0.81850756896975441,0.65984970865564474,0.010869864220807594,0.65876965022186806,0.7087966431936138,0.84453302138194475,0.44994926821963704,0.44163068986086207,0.78691962132418891,0.68014349509267691,0.68997342332122669,0.39300756024197719,0.97080484034187731,0.58048651221921999,0.47881963816498013,0.63266785820148597,0.85506426055907936,0.73692222675558883,0.44998047915351985,0.51689136923799772,0.83807032476915455,0.45915781004647982,0.55352470842051482,0.026468608572636804,0.23445027492642828,0.1343065237953299,0.49357606657316633,0.56437265363452793,0.85154351045490884,0.52178388470984027,0.056610876372326722,0.51908792277003379,0.49691535525371661,0.88601062788441731,0.33862146491165307,0.30737692008547263,0.41985279103887452,0.55149368475090654,0.74530288744271944,0.84842972252086624,0.47983708304204009,0.41200345202610322,0.48003981317587902,0.3462235390708196,0.50763911263351325,0.11142162011482387,0.57697066785150708,0.7840176579638598,0.3245045121101639,0.46250456557505792,0.61583548084764927,0.34625301151582927,0.10329375189106282,0.92041538647865284,0.52120791850578785,0.41464884975563243,0.26582523834738891,0.64849526042276906,0.52228093405527432,0.58424343676839319,0.32213022855937196,0.65580539390895121,0.3429648259867692,0.55777502595191042,0.95116104965791537,0.2449253421550304,0.06477174723284905,0.20192493734223879,0.61133582950575804,0.17057322830995345,0.38426830159619929,0.21760393885240217,0.48624353901076811,0.66143594792664673,0.68479970385016942,0.42866253185411268,0.68410194285714643,0.67548246939296419,0.53479709002572118,0.47254482614011462,0.95755993429833575,0.76955162377620379,0.25892355857481492,0.425693039236065,0.53168811362515456,0.48223909512977087,0.32551542704371361,0.53731931860809012,0.53767745106628928,0.85207560423906115,0.46795058296666436,0.55541023034651371,0.39491306508369106,0.43441871359108652,0.91156314346174261,0.19738614535286753,0.57474175378103765,0.30454100378112897,0.25237066895500204,0.59095539883835124,0.53149640580783641,0.3362950970674432,0.84010593477929829,0.45049355180013956,0.32141006406013767,0.15319383655534627,0.36788573645419864,0.44605527616273033,0.43948328361128319,0.74511315953539969,0.54358798254799767,0.095517043818807906,0.68794656894650352,0.85036895511702604,0.29692491471860238,0.55089970511074682,0.33447266365262968,0.47008408013790859,0.41214485949649499,0.2693195011171311,0.5347793988198668,0.63361996242469321,0.77983244129742424,0.48888665185103969,0.85129979862946648,0.10277330927862444,0.42845112237593957,0.19403661449790863,0.49244806765524962,0.60040267278490023,0.89000744700937118,0.7505159283133519,0.33944984456368177,0.73996961797682981,0.1187766091644253,0.95185294250927299,0.78036812931452082,0.22523324101699763,0.66270124078605952,0.56974692069803312,0.67756204314476787,0.82707662925237002,0.4294933189115368,0.40241305876052047,0.36929855663363692,0.41888887726341156,0.13930066134910923,0.33002467840106892,0.065769881237480801,0.88755723810011478,0.54163445901113438,0.42717280516343387,0.75551574486288053,0.17696843433277648,0.60409183186492266,0.56761891711653845,0.36715432598021114,0.24373394644920252,0.60395604368618361,0.21495483212101454,0.26481036712863043,0.4927065233686847,0.63545568934208019,0.23724732627583112,0.45829136804360227,0.95943547989235611,0.81627542453860857,0.63701807542628641,0.42144973014640391,0.66661690823400632,0.42913041185365769,0.4786320455914998,0.13240824319567085,0.51011023639345288,0.43116599551004764,0.43030167734626334,0.60604077999509631,0.098234574857432061,0.52309721406201393,0.7622111148760754,0.5311255371752106,0.36039025304349109,0.43219415926299498,0.60194851369271651,0.43464210559915639,0.10770701209019977,0.62694112952714243,0.68750505301049125,0.73496944372801309,0.4805374529369576,0.36675461062781389,0.23440711171566725,0.38574126976688339,0.89776970230769348,0.073272223551069868,0.70039966288073685,0.36475301864872017,0.43089437155184096,0.59249233498397347,0.41808247919660529,0.055308366536837419,0.46205600566071026,0.15723852003600358,0.23853778058576749,0.83921667369729247,0.25237404614973552,0.6064979840628808,0.40968907244067704,0.23742188635903785,0.46862655133737724,0.78258832147867752,0.8961225624148843,0.68698996527799994,0.52112501908337949,0.79343587145507688,0.26034852611503728,0.4898465204102303,0.49856136290571845,0.66258684445005633,0.51287084727793963,0.44452196222354118,0.19653065759950286,0.58968911574078475,0.4252029480320349,0.36897731898819314,0.26916512032686363,0.67692132609310662,0.94655862770347821,0.27055341946752548,0.36347245081413726,0.14107987657221635,0.45636159651917291,0.37571779051887583,0.60441708507370229,0.36855504987450483,0.46931396764577471,0.29696262850834987,0.35690255267117849,0.024351606731277734,0.20037077862188873,0.21213304672434768,0.23916539303067502,0.49373577129861479,0.34020056688172923,0.486681365987162,0.53054026059166237,0.52097316108189751,0.64643544026254462,0.57124336776003704,0.33869507711341823,0.15182230931810578,0.62554543796296525,0.55957426797720455,0.99666578435262632,0.81800009595759271,0.714453327640175,0.2079271625578899,0.5195136781785803,0.51781453257686272,0.57445194924392184,0.48921806659162759,0.42319598815001158,0.20350614026903746,0.53244570572766792,0.87394397926611178,0.092090740693673206,0.092222729036222056,0.88857697664709479,0.70128041562984778,0.5090529149768368,0.12574861228473688,0.79614765394951714,0.64794461429708616,0.27180353559450715,0.76338904962228549,0.80705211559643708,0.85438678498106224,0.65637107261669114,0.35319960170274572,0.31853825221203363,0.56020435752651243,0.5734910943811401,0.77693147059548939,0.32938491122658631,0.4157769229818713,0.52779154928825467,0.38867741811127826,0.56713726347109183,0.5301915980476436,0.67514472818288307,0.43434688242877867,0.46818438364196019,0.46368182468305913,0.44195551453154885,0.90527241821724247,0.57479667243751398,0.52068276557521598,0.8398347115651239,0.48140854932962146,0.1023645003540376,0.36333868951855097,0.43055848941126917,0.49952834087103498,0.58272487008341134,0.4553975346496314,0.4428299401147085,0.43186397652325831,0.62847947472323384,0.78544831711860352,0.4823793649498892,0.50437088472524327,0.96951286408220594,0.60350009080416811,0.74159133065317506,0.43701193978454866,0.46317372280000729,0.5576655718827187,0.68292554212091083,0.5503315549223069,0.25865772001038545,0.62052302120077429,0.12826983224425814,0.60436746952977582,0.21963173246406956,0.41486333071816084,0.63181339588044783,0.30961909499422396,0.57680008778949587,0.61140576323830043,0.76727698937690503,0.27440526974666618,0.75096332958984446,0.20370377683615759,0.42043421038605439,0.9657911440070891,0.95617309532514161,0.74476161250153539,0.17413608516630757,0.65781540586227938,0.90122376016094397,0.28759745632739958,0.90521896122257306,0.20868757673205379,0.67432654261106828,0.75295499147333034,0.35625633098726173,0.75633507394123112,0.68712836883440453,0.54486999188541319,0.43790438934658105,0.25806530240494246,0.89727841974024358,0.04698924418785224,0.10320050969556382,0.4467601867994101,0.84257327497845869,0.58760281799660807,0.40668015620153541,0.72332293799353942,0.97909030524141216,0.89881659172491979,0.39939227913869541,0.59577557824204508,0.99189626579186407,0.94647087225473103,0.12326005413359654,0.78650785753119257,0.150179072698751,0.71028643992710061,0.19682746919875907,0.31022239236115018,0.64822791090199472,0.08866477131477038,0.53674714846642979,0.72776466544337404,0.53113337181511677,0.33250278484106738,0.93694908527303467,0.8720086536061169,0.71823392675437303,0.39899803572426745,0.87443078355140347,0.32651729524093487,0.070824964410961297,0.44386012801551333,0.73413571677949008,0.61412717148751605,0.23800488357429869,0.46736160259921056,0.25614493977601938,0.75317085919651272,0.20446359345474746,0.56822120887298333,0.45838197719876,0.50371392763526257,0.49221762097523425,0.61030781570794401,0.071450301799739074,0.64266784728014337,0.29216265208486486,0.50885736735001441,0.043066839545558198,0.51225588081061224,0.76356595543981176,0.52494333485875322,0.25341327453081802,0.65032199809119673,0.29993780080004562,0.97722238707288711,0.9774816603990043,0.63364611451927144,0.17145462839141384,0.51957378616122152,0.16667934131626591,0.89490775961426039,0.30679176530659441,0.47974918819530804,0.52481008361399939,0.45930103410305728,0.95293135472573431,0.51715654191277938,0.28012432774084994,0.38278720721385529,0.68788699730791114,0.52561692827641571,0.38589754685414579,0.69333353027954259,0.093561332554173468,0.75281161205241998,0.64448574565891903,0.81693891845220956,0.55526306730360553,0.25508961859749252,0.11431604477536636,0.27701789286311684,0.27991004064757879,0.13608224105420955,0.48809837640927251,0.9773060193255193,0.58097428673988893,0.37046777918151597,0.076458711318246969,0.59661815972657772,0.94957453114585533,0.87356386119464224,0.815587725792429,0.93890976890185607,0.56535762631485709,0.70319973087136756,0.57245269376489361,0.52797485348451823,0.4736185343630176,0.40188869724615345,0.36900186364702708,0.40487955009937676,0.15891542050315605,0.41705572632287663,0.56561207963772508,0.14600391188622289,0.54187577821343169,0.47832090577325026,0.13850142686268402,0.29662095710516084,0.73389664095360529,0.77866895581262996,0.19070868553866019,0.42785691373925738,0.69903926878520173,0.41300214714642053,0.69349032547362366,0.703202498470482,0.97235312002668117,0.59298829357955429,0.48860074143120119,0.3630883073139437,0.61110771701774547,0.48310481447020148,0.90777601977234068,0.50247882349271122,0.52874836828612326,0.30883086280529298,0.657339637617946,0.68921785189586526,0.5341587650255496,0.12870042393492784,0.74827840302503412,0.53057475116362529,0.25009069907804105,0.3384165293432671,0.73249620151383421,0.9669651556057276,0.59885929140300553,0.35744634909693285,0.3262530551617781,0.58472879703283132,0.51487418789778305,0.39646061841378805,0.976616633147814,0.36074818425191318,0.42707748858299854,0.78232534162484757,0.66758952358175139,0.39165880012412974,0.59961761086561871,0.23471654637677611,0.31207982988708566,0.53110342853064763,0.90134971882798642,0.35951255965890117,0.85107679183666729,0.65139105003663866,0.34960691811682554,0.48112041906685882,0.62898057059459378,0.53587994316675014,0.56416253822040019]}

},{}],54:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var betaincinv = require( './../lib' );


// FIXTURES //

var fixtures = require( './fixtures/cpp/output.json' );
var lowerRegularized = fixtures.lower_regularized;
var upperRegularized = fixtures.upper_regularized;
var x = fixtures.x;
var a = fixtures.a;
var b = fixtures.b;


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof betaincinv, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = betaincinv( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.2, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.2, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if `p` is outside the interval `[0,1]`', function test( t ) {
	var y = betaincinv( 1.5, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( -0.5, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a nonpositive `a`, the function returns `NaN`', function test( t ) {
	var y;

	y = betaincinv( 0.5, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `b`, the function returns `NaN`', function test( t ) {
	var y;

	y = betaincinv( 0.5, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, 2.0, -1/0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = betaincinv( 0.5, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the inverse of the lower regularized incomplete beta function', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var y;

	expected = lowerRegularized;
	for ( i = 0; i < x.length; i++ ) {
		y = betaincinv( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+'. a: '+a[i]+'. b: '+b[i]+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 15.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse of the upper regularized incomplete beta function', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var y;

	expected = upperRegularized;
	for ( i = 0; i < x.length; i++ ) {
		y = betaincinv( x[i], a[i], b[i], true );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+'. a: '+a[i]+'. b: '+b[i]+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 15.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/betaincinv/test/test.js")
},{"./../lib":43,"./fixtures/cpp/output.json":53,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-eps":194,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212,"tape":280}],55:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var round = require( '@stdlib/math/base/special/round' );


// MAIN //

/**
* Computes the binomial coefficient of two integers.
*
* #### Method
*
* * Instead of evaluating the factorial form, which is inefficient and prone to overflow for large inputs arguments, this module computes the following multiplicative representation of the binomial coefficient for integer arguments
*
*   ``` tex
*   \binom nk = \prod_{i=1}^k \frac{n+1-i}{i}
*   ```
*
* @param {integer} n - input value
* @param {integer} k - second input value
* @returns {number} function value
*
* @example
* var v = binomcoef( 8, 2 );
* // returns 28
*
* @example
* var v = binomcoef( 0, 0 );
* // returns 1
*
* @example
* var v = binomcoef( -4, 2 );
* // returns 10
*
* @example
* var v = binomcoef( NaN, 3 );
* // returns NaN
*
* @example
* var v = binomcoef( 5, NaN );
* // returns NaN
*
* @example
* var v = binomcoef( NaN, NaN );
* // returns NaN
*/
function binomcoef( n, k ) {
	var res;
	var j;
	if ( isnan( n ) || isnan( k ) ) {
		return NaN;
	}
	if ( !isInteger( n ) || !isInteger( k ) ) {
		return NaN;
	}
	if ( k < 0 ) {
		return 0;
	}
	if ( n < 0 ) {
		res = binomcoef( -n + k - 1, k );
		if ( isOdd( k ) ) {
			res = -res;
		}
		return res;
	}
	if ( k > n ) {
		return 0;
	}
	if ( k === 0 || k === n ) {
		return 1;
	}
	if ( k === 1 || k === n - 1 ) {
		return n;
	}
	if ( n - k < k ) {
		k = n - k;
	}
	// Use recursive definition...
	res = n;
	for ( j = 2; j <= k; j++ ) {
		res *= ( n - j + 1 ) / j;
	}
	// Correct for rounding errors...
	return isInteger( res ) ? res : round( res );
} // end FUNCTION binomcoef()


// EXPORTS //

module.exports = binomcoef;

},{"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/round":139}],56:[function(require,module,exports){
'use strict';

/**
* Compute the binomial coefficient.
*
* @module @stdlib/math/base/special/binomcoef
*
* @example
* var binomcoef = require( '@stdlib/math/base/special/binomcoef' );
*
* var v = binomcoef( 8, 2 );
* // returns 28
*
* v = binomcoef( 0, 0 );
* // returns 1
*
* v = binomcoef( -4, 2 );
* // returns 10
*
* v = binomcoef( 5, 3 );
* // returns 10
*
* v = binomcoef( NaN, 3 );
* // returns NaN
*
* v = binomcoef( 5, NaN );
* // returns NaN
*
* v = binomcoef( NaN, NaN );
* // returns NaN
*/

// MODULES //

var binomcoef = require( './binomcoef.js' );


// EXPORTS //

module.exports = binomcoef;

},{"./binomcoef.js":55}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"./ceil.js":57}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":170,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-to-words":186}],60:[function(require,module,exports){
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

},{"./copysign.js":59}],61:[function(require,module,exports){
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
var cosKernel = require( './cos_kernel.js' );
var sinKernel = require( './sin_kernel.js' );
var remPio2 = require( './rem_pio2.js' );


// MAIN //

/**
* Computes the cosine of a number.
*
* @param {number} x - input value
* @returns {number} cosine (in radians)
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
	var y;
	var z;

	y = new Array( 2 );
	z = 0.0;
	ix = getHighWord( x );

	// Case: |x| ~< pi/4
	ix &= 0x7fffffff;
	if ( ix <= 0x3fe921fb ) {
		// Case: x < 2**-27
		if ( ix<0x3e400000 ) {
			if ( (x|0) === 0 ) {
				// Generate inexact...
				return 1.0;
			}
		}
		return cosKernel( x, z );
	}
	// Case: cos(Inf or NaN) is NaN */
	else if ( ix >= 0x7ff00000 ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = remPio2( x, y );
	switch ( n & 3 ) {
	case 0:
		return cosKernel( y[0], y[1] );
	case 1:
		return -sinKernel( y[0], y[1], 1 );
	case 2:
		return -cosKernel( y[0], y[1] );
	default:
		return sinKernel( y[0], y[1], 1 );
	}
} // end FUNCTION cos()


// EXPORTS //

module.exports = cos;

},{"./cos_kernel.js":62,"./rem_pio2.js":64,"./sin_kernel.js":66,"@stdlib/math/base/utils/float64-get-high-word":174}],62:[function(require,module,exports){
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

// VARIABLES //

var C1  =  4.16666666666666019037e-02; /* 0x3FA55555, 0x5555554C */
var C2  = -1.38888888888741095749e-03; /* 0xBF56C16C, 0x16C15177 */
var C3  =  2.48015872894767294178e-05; /* 0x3EFA01A0, 0x19CB1590 */
var C4  = -2.75573143513906633035e-07; /* 0xBE927E4F, 0x809C52AD */
var C5  =  2.08757232129817482790e-09; /* 0x3E21EE9E, 0xBDB4B1C4 */
var C6  = -1.13596475577881948265e-11; /* 0xBDA8FAE9, 0xBE8838D4 */


// MAIN //

/**
* Compute the cos function on \\( [-\pi/4, \pi/4] \\), \\( \pi/4 \approx 0.785398164 \\)
*
* #### Method
*
* * Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive x.
* * If \\( x < 2^-27 \\), return 1 with inexact if \\( x \ne 0 \\).
* * \\( cos(x) \\) is approximated by a polynomial of degree 14 on \\( [0,\pi/4] \\)
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*   ```
*
*   where the remez error is
*
*   ``` tex
*   \left| \cos(x) - \left( 1 - 0.5x^2 + C_1x^4 +C_2x^6 +C_3x^8 +C_4x^{10} +C_5x^{12}  +C_6x^{15} \right) \right| \le 2^{-58}
*   ```
* * Let \\( C_1x^4 +C_2x^6 +C_3x^8 +C_4x^{10} +C_5x^{12}  +C_6x^{14} \\), then
*
*   ``` tex
*    \cos(x) \approx 1 - \tfrac{x \cdot x}{2} + r
*   ```
*
*   Since \\( \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y \\), a correction term is necessary in \\( \cos(x) \\) and hence
*
*   ``` tex
*   \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*   ```
*
*   For better accuracy, rearrange to
*
*   ``` tex
*   \cos(x+y) \approx w + \left( tmp + ( r - x \cdot y ) \right)
*   ```
*
*   where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( tmp \\) is a tiny correction term ( \\( 1 - \frac{x \cdot x}{2} = w + tmp \\) exactly in infinite precision). The exactness of w + tmp in infinite precision depends on w and tmp having the same precision as x.
*
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of x.
* @returns {number} cosine (in radians)
*/
function cosKernel( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z  = x * x;
	w  = z * z;
	r  = z * ( C1 + z*(C2+z*C3) ) + w * w * ( C4 + z*(C5+z*C6) );
	hz = 0.5 * z;
	w  = 1.0 - hz;
	return w + ( ( (1.0-w) - hz ) + ( z*r - x*y ) );
} // end FUNCTION cosKernel()


// EXPORTS //

module.exports = cosKernel;

},{}],63:[function(require,module,exports){
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

},{"./cos.js":61}],64:[function(require,module,exports){
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
var round = require( '@stdlib/math/base/special/round' );
var remPio2Kernel = require( './rem_pio2_kernel.js' );


// VARIABLES //

var ZERO =  0.00000000000000000000e+00; /* 0x00000000, 0x00000000 */
var TWO24 =  1.67772160000000000000e+07; /* 0x41700000, 0x00000000 */

// 53 bits of 2/PI
var INVPIO2 =  6.36619772367581382433e-01; /* 0x3FE45F30, 0x6DC9C883 */

// First 33 bit of PI/2
var PIO2_1  =  1.57079632673412561417e+00; /* 0x3FF921FB, 0x54400000 */

// PIO2_1T = PI/2 - PIO2_1
var PIO2_1T =  6.07710050650619224932e-11; /* 0x3DD0B461, 0x1A626331 */

// Second 33 bit of PI/2
var PIO2_2  =  6.07710050630396597660e-11; /* 0x3DD0B461, 0x1A600000 */

// PIO2_2T = PI/2 - ( PIO2_1 + PIO2_2 )
var PIO2_2T =  2.02226624879595063154e-21; /* 0x3BA3198A, 0x2E037073 */

// Third 33 bit of PI/2
var PIO2_3  =  2.02226624871116645580e-21; /* 0x3BA3198A, 0x2E000000 */

// PIO2_3T = PI/2 - ( PIO2_1 + PIO2_2 + PIO2_3 )
var PIO2_3T =  8.47842766036889956997e-32; /* 0x397B839A, 0x252049C1 */


// MAIN //

/**
* Compute x - n*pi/2 = r. Returns n and stores the remainder `r`
* as two numbers y[0] and y[1] such that y[0]+y[1] = r.
*
* @private
* @param {number} x - input value
* @param {Array} y - remainder elements
* @returns {integer} n - factor of pi/2
*/
function remPio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var tx;
	var ty;
	var i;
	var n;
	var z;

	tx = new Array( 3 );
	ty = new Array( 2 );

	hx = getHighWord( x );
	ix = hx & 0x7fffffff;

	// Case: |x| ~<= pi/4 , no need for reduction
	if ( ix <= 0x3fe921fb ) {
		y[ 0 ] = x;
		y[ 1 ] = 0;
		return 0;
	}

	// Case: |x| ~<= 5pi/4
	if ( ix <= 0x400f6a7a ) {
		// Case: |x| ~= pi/2 or 2pi/2
		if ( (ix & 0xfffff) === 0x921fb ) {
			// Cancellation => use medium case
			return remPio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3pi/4
		if ( ix <= 0x4002d97c ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = ( z - y[0] ) - PIO2_1T;
				return 1.0;
			} else {
				z = x + PIO2_1;
				y[ 0 ] = z + PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + PIO2_1T;
				return -1.0;
			}
		}
		else {
			if ( x > 0.0 ) {
				z = x - 2 * PIO2_1;
				y[ 0 ] = z - 2 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) -2 * PIO2_1T;
				return 2;
			} else {
				z = x + 2 * PIO2_1;
				y[ 0 ] = z + 2 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 2 * PIO2_1T;
				return -2;
			}
		}
	}
	// Case: |x| ~<= 9pi/4
	if ( ix <= 0x401c463b ) {
		// Case: |x| ~<= 7pi/4
		if ( ix <= 0x4015fdbc ) {
			// Case: |x| ~= 3pi/2
			if ( ix === 0x4012d97c ) {
				return remPio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - 3 * PIO2_1;
				y[ 0 ] = z - 3 * PIO2_1T;
				y[ 1 ] = (z-y[0]) - 3 * PIO2_1T;
				return 3;
			} else {
				z = x + 3 * PIO2_1;
				y[ 0 ] = z + 3 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 3 * PIO2_1T;
				return -3;
			}
		} else {
			if ( ix === 0x401921fb ) {
				// Case: |x| ~= 4pi/2
				return remPio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - 4.0 * PIO2_1;
				y[ 0 ] = z - 4.0 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) - 4.0 * PIO2_1T;
				return +4;
			} else {
				z = x + 4.0 * PIO2_1;
				y[ 0 ] = z + 4.0 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 4.0 * PIO2_1T;
				return -4;
			}
		}
	}
	// Case: |x| ~< 2^20*(pi/2), medium size
	if ( ix < 0x413921fb ) {
		return remPio2Medium( x, ix, y );
	}
	// All other (large) arguments...
	// Case: x is inf or NaN */
	if ( ix >= 0x7ff00000 ) {
		y[ 0 ] = y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|,ilogb(x)-23)...
	low = getLowWord( x );
	// e0 = ilogb(z)-23:
	e0 = ( ix >> 20 ) - 1046;
	z = fromWords( ix - ((e0<<20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		tx[ i ] = z|0;
		z = ( z - tx[i] ) * TWO24;
	}
	tx[ 2 ] = z;
	nx = 3;
	while ( tx[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx--;
	}
	n = remPio2Kernel( tx, ty, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -ty[ 0 ];
		y[ 1 ] = -ty[ 1 ];
		return -n;
	}
	y[ 0 ] = ty[ 0 ];
	y[ 1 ] = ty[ 1 ];
	return n;
} // end FUNCTION remPio2()


/**
* Compute x - n*pi/2 = r for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {int32} ix - higher word
* @param {Array} y - remainder elements
* @returns {integer} n - factor of pi/2
*/
function remPio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - n * PIO2_1;
	w = n * PIO2_1T;
	// 1st round good to 85 bit...
	j = ix >> 20;
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high>>20) & 0x7ff );
	if ( i > 16 ) {
		// 2nd iteration needed, good to 118...
		t  = r;
		w  = n * PIO2_2;
		r  = t - w;
		w  = n * PIO2_2T - ( (t-r) - w );
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high>>20) & 0x7ff );
		if ( i > 49 )  {
			// 3rd iteration need, 151 bits acc
			t  = r;
			w  = n * PIO2_3;
			r  = t - w;
			w  = n * PIO2_3T - ( (t-r) - w );
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = ( r - y[0] ) - w;
	return n;
} // end FUNCTION remPio2Medium()


// EXPORTS //

module.exports = remPio2;

},{"./rem_pio2_kernel.js":65,"@stdlib/math/base/special/round":139,"@stdlib/math/base/utils/float64-from-words":170,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-get-low-word":176}],65:[function(require,module,exports){
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

var INIT_JK = [
	3,
	4,
	4,
	6
]; /* initial value for jk */

/*
* Table of constants for 2/pi, 396 Hex digits (476 decimal) of 2/pi
*
*		integer array, contains the (24*i)-th to (24*i+23)-th
*		bit of 2/pi after binary point. The corresponding
*		floating value is
*
*			ipio2[i] * 2^(-24(i+1)).
*
* NB: This table must have at least (e0-3)/24 + jk terms.
*     For quad precision (e0 <= 16360, jk = 6), this is 686.
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

// Double precision array, obtained by cutting pi/2 into 24 bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, /* 0x3FF921FB, 0x40000000 */
	7.54978941586159635335e-08, /* 0x3E74442D, 0x00000000 */
	5.39030252995776476554e-15, /* 0x3CF84698, 0x80000000 */
	3.28200341580791294123e-22, /* 0x3B78CC51, 0x60000000 */
	1.27065575308067607349e-29, /* 0x39F01B83, 0x80000000 */
	1.22933308981111328932e-36, /* 0x387A2520, 0x40000000 */
	2.73370053816464559624e-44, /* 0x36E38222, 0x80000000 */
	2.16741683877804819444e-51 /* 0x3569F31D, 0x00000000 */
];
var TWO24 =  1.67772160000000000000e+07; /* 0x41700000, 0x00000000 */
var TWON24 =  5.96046447753906250000e-08; /* 0x3E700000, 0x00000000 */


// FUNCTIONS //

/**
* Helper function performing the computation for remPio2Kernel().
*
* @private
* @param {PositiveNumber} x - input value
* @param {Array} y - ouput result in an array of double precision numbers.
* @param {integer} jz - number of terms of ipio2[] used.
* @param {Array} q - array with integral value, representing the 24-bits chunk of the product of x and 2/pi.
* @param {integer} q0 - the corresponding exponent of q[0]. Note that the exponent for q[i] would be q0-24*i.
* @param {integer} jk - jk+1 is the initial number of terms of IPIO2[] needed in the computation.
* @param {integer} jv - index for pointing to the suitable ipio2[] for the computation
* @param {integer} jx - nx - 1
* @param {Array} f - IPIO2[] in floating point
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of N
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f, prec ) {
	var carry;
	var fq;
	var fw;
	var ih;
	var iq;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// jp+1 is the number of terms in PIo2[] needed:
	jp = jk;

	fq = new Array( 20 );
	iq = new Array( 20 );

	// Distill q[] into iq[] reversingly...
	for ( i = 0, j = jz, z = q[ jz ]; j > 0; i++, j-- ) {
		fw = ( TWON24 * z ) | 0;
		iq[ i ] = ( z-TWO24 * fw ) | 0;
		z = q[ j-1 ] + fw;
	}

	// Compute n...
	z  = ldexp( z, q0 );
	// Trim off integer >= 8:
	z -= 8.0 * floor( z * 0.125 );
	n  = z | 0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need iq[jz-1] to determine n...
		i  = ( iq[jz-1] >> (24-q0) );
		n += i;
		iq[ jz-1 ] -= i << (24-q0);
		ih = iq[ jz-1 ] >> (23-q0);
	}
	else if ( q0 === 0 ) {
		ih = iq[ jz-1 ] >> 23;
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;
		// Compute 1-q:
		for ( i = 0; i < jz; i++ ) {
			j = iq[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					iq[ i ] = 0x1000000 - j;
				}
			} else  {
				iq[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) {
			case 1:
				iq[ jz-1 ] &= 0x7fffff;
			break;
			case 2:
				iq[ jz-1 ] &= 0x3fffff;
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
	// Check if recomputation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz - 1; i >= jk; i-- ) {
			j |= iq[ i ];
		}
		if ( j === 0 ) {
			// Need recomputation...
			for( k = 1; iq[jk-k] === 0; k++ ) {}   /* k = no. of terms needed */
			for ( i = jz + 1; i <= jz + k; i++ ) {
				// Add q[jz+1] to q[jz+k]...
				f[ jx+i ] = IPIO2[ jv+i ];
				for ( j = 0, fw = 0.0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + i-j ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f, prec );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( iq[jz] === 0 ) {
			jz--;
			q0-=24;
		}
	} else {
		// Break z into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z) | 0;
			iq[ jz ] = ( z - TWO24*fw ) | 0;
			jz += 1;
			q0 += 24;
			iq[ jz ] = fw;
		} else {
			iq[ jz ] = z | 0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * iq[i];
		fw *= TWON24;
	}
	// Compute PIo2[0,...,jp]*q[jz,...,0]...
	for( i = jz; i >= 0; i-- ) {
		for( fw = 0.0, k = 0; k <= jp && k <= jz - i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		fq[ jz-i ] = fw;
	}
	// Compress fq[] into y[]...
	switch ( prec ) {
	case 0:
		fw = 0.0;
		for ( i = jz; i >= 0; i-- ) {
			fw += fq[ i ];
		}
		y[ 0 ] = ( ih === 0 )? fw: -fw;
	break;
	case 1:
	case 2:
		fw = 0.0;
		for ( i = jz; i >= 0; i-- ) {
			fw += fq[ i ];
		}
		y[ 0 ] = ( ih === 0 ) ? fw: -fw;
		fw = fq[ 0 ] - fw;
		for ( i = 1; i <= jz; i++ ) {
			fw += fq[i];
		}
		y[ 1 ] = ( ih === 0 )? fw: -fw;
	break;
	case 3:
		for ( i = jz; i > 0; i-- ) {
			fw = fq[ i-1 ] + fq[ i ];
			fq[ i ] += fq[ i-1 ]-fw;
			fq[ i-1 ] = fw;
		}
		for ( i = jz; i > 1; i-- ) {
			fw = fq[ i-1 ] + fq[ i ];
			fq[ i ]  += fq[ i-1 ] - fw;
			fq[ i-1 ] = fw;
		}
		for ( fw = 0.0, i = jz; i >= 2; i-- ) {
			fw += fq[ i ];
		}
		if ( ih === 0 ) {
			y[ 0 ] =  fq[ 0 ];
			y[ 1 ] =  fq[ 1 ];
			y[ 2 ] =  fw;
		} else {
			y[ 0 ] = -fq[ 0 ];
			y[ 1 ] = -fq[ 1 ];
			y[ 2 ] = -fw;
		}
	}
	return n & 7;
} // end FUNCTION compute()


// MAIN //

/*
* Return the last three digits of N with `y = x - N*pi/2` so that `|y| < pi/2`.
*
* #### Method
*
* The method is to compute the integer (mod 8) and fraction parts of (2/pi)*x without doing the full multiplication. In general we skip the part of the product that are known to be a huge integer (more accurately, = 0 mod 8 ). Thus the number of operations are independent of the exponent of the input.
*
* @param {PositiveNumber} x - input value
* @param {Array} y - ouput result in an array of double precision numbers.
* @param {PositiveInteger} e0 - The exponent of x[0]. Must be <= 16360
* @param {PositiveInteger} nx - dimension of x[]
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of N
*/
function remPio2Kernel( x, y, e0, nx, prec ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var f;
	var m;
	var q;

	f = new Array( 20 );
	q = new Array( 20 );

	// Initialize jk...
	jk = INIT_JK[ prec ];
	// Determine jx, jv, q0, note that 3 > q0
	jx =  nx - 1;
	jv = ( e0 - 3 ) / 24;
	jv = jv | 0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 =  e0 - 24 * ( jv + 1 );

	// Set up f[0] to f[jx+jk] where f[jx+jk] = ipio2[jv+jk]:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++, j++ ) {
		f[ i ] = ( j < 0 ) ? 0.0 : IPIO2[ j ];
	}
	// Compute q[0],q[1],...q[jk]:
	for ( i = 0; i <= jk; i++ ) {
		for ( j = 0, fw = 0.0; j <= jx; j++ ) {
			fw += x[ j ] * f[ jx + i-j ];
		}
		q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, q, q0, jk, jv, jx, f, prec );
} // end FUNCTION remPio2Kernel()


// EXPORTS //

module.exports = remPio2Kernel;

},{"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/ldexp":119}],66:[function(require,module,exports){
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

var S1  = -1.66666666666666324348e-01; /* 0xBFC55555, 0x55555549 */
var S2  =  8.33333333332248946124e-03; /* 0x3F811111, 0x1110F8A6 */
var S3  = -1.98412698298579493134e-04; /* 0xBF2A01A0, 0x19C161D5 */
var S4  =  2.75573137070700676789e-06; /* 0x3EC71DE3, 0x57B1FE7D */
var S5  = -2.50507602534068634195e-08; /* 0xBE5AE5E6, 0x8A2B9CEB */
var S6  =  1.58969099521155010221e-10; /* 0x3DE5D93A, 0x5ACFD57C */


// MAIN //

/**
* Computes the sin function on \\( \approx [-\pi/4, \pi/4] \\) (except on -0), \\( \pi/4 \approx 0.7854 \\)
*
* #### Method
*
* * Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive x.
* * Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves -0. Callers may do the optimization \\( \sin(x) \approx x \\) for tiny x.
* * \\( \sin(x) \\) is approximated by a polynomial of degree 13 on \\( \left[0,\tfrac{pi}{4} \right] \\)
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
* * We have \\( \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y \\). For better accuracy, let
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
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of x.
* @param {number} iy - indicates whether y is 0. (if iy = 0, y assumed to be 0).
* @returns sine (in radians)
*/
function sinKernel( x, y, iy ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + z * ( S3 + z*S4 ) + z * w * ( S5 + z*S6 );
	v = z * x;
	if ( iy === 0 ) {
		return x + v * ( S1 + z*r );
	}
	else {
		return x - ( ( z * (0.5*y-v*r) - y ) - v * S1 );
	}
} // end FUNCTION sinKernel()


// EXPORTS //

module.exports = sinKernel;

},{}],67:[function(require,module,exports){
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

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1; // 0x3FEB0AC1, 0x60000000

// Coefficients for approximation to erf on [0, 0.84375)
var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var PP = [
	-3.25042107247001499370e-1, // 0xBFD4CD7D, 0x691CB913
	-2.84817495755985104766e-2, // 0xBF9D2A51, 0xDBD7194F
	-5.77027029648944159157e-3, // 0xBF77A291, 0x236668E4
	-2.37630166566501626084e-5  // 0xBEF8EAD6, 0x120016AC
];
var QQC = 1.0;
var QQ = [
	3.97917223959155352819e-1, // 0x3FD97779, 0xCDDADC09
	6.50222499887672944485e-2, // 0x3FB0A54C, 0x5536CEBA
	5.08130628187576562776e-3, // 0x3F74D022, 0xC4D36B0F
	1.32494738004321644526e-4, // 0x3F215DC9, 0x221C1A10
	-3.96022827877536812320e-6 // 0xBED09C43, 0x42A26120
];

// Coefficients for approximation to erf on [0.84375, 1.25)
var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var PA = [
	4.14856118683748331666e-1,  // 0x3FDA8D00, 0xAD92B34D
	-3.72207876035701323847e-1, // 0xBFD7D240, 0xFBB8C3F1
	3.18346619901161753674e-1,  // 0x3FD45FCA, 0x805120E4
	-1.10894694282396677476e-1, // 0xBFBC6398, 0x3D3E28EC
	3.54783043256182359371e-2,  // 0x3FA22A36, 0x599795EB
	-2.16637559486879084300e-3  // 0xBF61BF38, 0x0A96073F
];
var QAC = 1.0;
var QA = [
	1.06420880400844228286e-1, // 0x3FBB3E66, 0x18EEE323
	5.40397917702171048937e-1, // 0x3FE14AF0, 0x92EB6F33
	7.18286544141962662868e-2, // 0x3FB2635C, 0xD99FE9A7
	1.26171219808761642112e-1, // 0x3FC02660, 0xE763351F
	1.36370839120290507362e-2, // 0x3F8BEDC2, 0x6B51DD1C
	1.19844998467991074170e-2  // 0x3F888B54, 0x5735151D
];

// Coefficients for approximation to erfc on [1.25, 1/0.35)
var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var RA = [
	-6.93858572707181764372e-1, // 0xBFE63416, 0xE4BA7360
	-1.05586262253232909814e1,  // 0xC0251E04, 0x41B0E726
	-6.23753324503260060396e1,  // 0xC04F300A, 0xE4CBA38D
	-1.62396669462573470355e2,  // 0xC0644CB1, 0x84282266
	-1.84605092906711035994e2,  // 0xC067135C, 0xEBCCABB2
	-8.12874355063065934246e1,  // 0xC0545265, 0x57E4D2F2
	-9.81432934416914548592     // 0xC023A0EF, 0xC69AC25C
];
var SAC = 1.0;
var SA = [
	1.96512716674392571292e1,  // 0x4033A6B9, 0xBD707687
	1.37657754143519042600e2,  // 0x4061350C, 0x526AE721
	4.34565877475229228821e2,  // 0x407B290D, 0xD58A1A71
	6.45387271733267880336e2,  // 0x40842B19, 0x21EC2868
	4.29008140027567833386e2,  // 0x407AD021, 0x57700314
	1.08635005541779435134e2,  // 0x405B28A3, 0xEE48AE2C
	6.57024977031928170135,    // 0x401A47EF, 0x8E484A93
	-6.04244152148580987438e-2 // 0xBFAEEFF2, 0xEE749A62
];

// Coefficients for approximation to erfc on [1/0.35, 28]
var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var RB = [
	-7.99283237680523006574e-1, // 0xBFE993BA, 0x70C285DE
	-1.77579549177547519889e1,  // 0xC031C209, 0x555F995A
	-1.60636384855821916062e2,  // 0xC064145D, 0x43C5ED98
	-6.37566443368389627722e2,  // 0xC083EC88, 0x1375F228
	-1.02509513161107724954e3,  // 0xC0900461, 0x6A2E5992
	-4.83519191608651397019e2  // 0xC07E384E, 0x9BDC383F
];
var SBC = 1.0;
var SB = [
	3.03380607434824582924e1, // 0x403E568B, 0x261D5190
	3.25792512996573918826e2, // 0x40745CAE, 0x221B9F0A
	1.53672958608443695994e3, // 0x409802EB, 0x189D5118
	3.19985821950859553908e3, // 0x40A8FFB7, 0x688C246A
	2.55305040643316442583e3, // 0x40A3F219, 0xCEDF3BE6
	4.74528541206955367215e2, // 0x407DA874, 0xE79FE763
	-2.24409524465858183362e1 // 0xC03670E2, 0x42712D62
];


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var polyvalPP = evalpoly( PP );
var polyvalQQ = evalpoly( QQ );
var polyvalPA = evalpoly( PA );
var polyvalQA = evalpoly( QA );
var polyvalRA = evalpoly( RA );
var polyvalSA = evalpoly( SA );
var polyvalRB = evalpoly( RB );
var polyvalSB = evalpoly( SB );


// MAIN //

/**
* Evaluates the complementary error function.
*
* ``` tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ``` tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* #### Method
*
* 1. For \\(|x| \in [0, 0.84375)\\),
*
*    ``` tex
*    \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*    0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*    \end{cases}
*    ```
*
*    where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*    ``` tex
*    \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*    ```
*
*    <!-- <note> -->
*    The formula is derived by noting
*
*    ``` tex
*    \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*    ```
*
*    and that
*
*    ``` tex
*    \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*    ```
*
*    is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*    <!-- </note> -->
*
* 2. For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*    ``` tex
*    \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*    1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*    \end{cases}
*    ```
*
*    where
*
*    ``` tex
*    \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*    ```
*
*    <!-- <note> -->
*    Here, we use the Taylor series expansion at \\(x = 1\\)
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*    &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*    \end{align*}
*    ```
*
*    using a rational approximation to approximate
*
*    ``` tex
*    \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*    ```
*
*    <!-- </note> -->
*    Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*    - \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*    - \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3. For \\(x \in [1.25,1/0.35)\\),
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*    \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*    \end{align*}
*    ```
*
*    where
*
*    - \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*    - \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4. For \\(x \in [1/0.35,28)\\),
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*    2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*    2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*    \end{cases}
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erf}(x) = \begin{cases}
*    \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*    \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*    \end{cases}
*    ```
*
*    where
*
*    - \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*    - \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5. For \\(x \in [28, \infty)\\),
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*    \end{align*}
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*    2 - \mathrm{tiny} & \textrm{if}\ x < 0
*    \end{cases}
*    ```
*
*
* #### Special Cases
*
* ``` tex
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
* #### Notes
*
* * To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*    ``` tex
*    -x^2 = -s^2 + (s-x)(s+x)
*    ```
*
*    and
*
*    ``` tex
*    e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*    ```
*
* * `#4` and `#5` make use of the asymptotic series
*
*    ``` tex
*    \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*    ```
*
*    We use a rational approximation to approximate
*
*    ``` tex
*    g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*    ```
*
* * The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*    ``` tex
*    |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*    ```
*
*    and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*    ``` tex
*    |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*    ```
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
* var y = erfc( Number.POSITIVE_INFINITY );
* // returns 0.0
*
* @example
* var y = erfc( Number.NEGATIVE_INFINITY );
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
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/base/utils/float64-set-low-word":183,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],68:[function(require,module,exports){
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
* y = erfc( Number.POSITIVE_INFINITY );
* // returns 0.0
*
* y = erfc( Number.NEGATIVE_INFINITY );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var erfc = require( './erfc.js' );


// EXPORTS //

module.exports = erfc;

},{"./erfc.js":67}],69:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/detail/erf_inv.hpp}.
*
* This implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

// Coefficients for erfinv on [0, 0.5]:
var Y1 = 8.91314744949340820313e-2;
var P1 = [
	-5.08781949658280665617e-4,
	-8.36874819741736770379e-3,
	3.34806625409744615033e-2,
	-1.26926147662974029034e-2,
	-3.65637971411762664006e-2,
	2.19878681111168899165e-2,
	8.22687874676915743155e-3,
	-5.38772965071242932965e-3,
	0.0,
	0.0
];
var Q1 = [
	1.0,
	-9.70005043303290640362e-1,
	-1.56574558234175846809,
	1.56221558398423026363,
	6.62328840472002992063e-1,
	-7.1228902341542847553e-1,
	-5.27396382340099713954e-2,
	7.95283687341571680018e-2,
	-2.33393759374190016776e-3,
	8.86216390456424707504e-4
];

// Coefficients for erfinv for 0.5 > 1-x >= 0:
var Y2 = 2.249481201171875;
var P2 = [
	-2.02433508355938759655e-1,
	1.05264680699391713268e-1,
	8.37050328343119927838,
	1.76447298408374015486e1,
	-1.88510648058714251895e1,
	-4.46382324441786960818e1,
	1.7445385985570866523e1,
	2.11294655448340526258e1,
	-3.67192254707729348546
];
var Q2 = [
	1.0,
	6.24264124854247537712,
	3.9713437953343869095,
	-2.86608180499800029974e1,
	-2.01432634680485188801e1,
	4.85609213108739935468e1,
	1.08268667355460159008e1,
	-2.26436933413139721736e1,
	1.72114765761200282724
];

// Coefficients for erfinv for sqrt( -log(1-x) ):
var Y3 = 8.07220458984375e-1;
var P3 = [
	-1.31102781679951906451e-1,
	-1.63794047193317060787e-1,
	1.17030156341995252019e-1,
	3.87079738972604337464e-1,
	3.37785538912035898924e-1,
	1.42869534408157156766e-1,
	2.90157910005329060432e-2,
	2.14558995388805277169e-3,
	-6.79465575181126350155e-7,
	2.85225331782217055858e-8,
	-6.81149956853776992068e-10
];
var Q3 = [
	1.0,
	3.46625407242567245975,
	5.38168345707006855425,
	4.77846592945843778382,
	2.59301921623620271374,
	8.48854343457902036425e-1,
	1.52264338295331783612e-1,
	1.105924229346489121e-2,
	0.0,
	0.0,
	0.0
];

var Y4 = 9.3995571136474609375e-1;
var P4 = [
	-3.50353787183177984712e-2,
	-2.22426529213447927281e-3,
	1.85573306514231072324e-2,
	9.50804701325919603619e-3,
	1.87123492819559223345e-3,
	1.57544617424960554631e-4,
	4.60469890584317994083e-6,
	-2.30404776911882601748e-10,
	2.66339227425782031962e-12
];
var Q4 = [
	1.0,
	1.3653349817554063097,
	7.62059164553623404043e-1,
	2.20091105764131249824e-1,
	3.41589143670947727934e-2,
	2.63861676657015992959e-3,
	7.64675292302794483503e-5,
	0.0,
	0.0
];

var Y5 = 9.8362827301025390625e-1;
var P5 = [
	-1.67431005076633737133e-2,
	-1.12951438745580278863e-3,
	1.05628862152492910091e-3,
	2.09386317487588078668e-4,
	1.49624783758342370182e-5,
	4.49696789927706453732e-7,
	4.62596163522878599135e-9,
	-2.81128735628831791805e-14,
	9.9055709973310326855e-17
];
var Q5 = [
	1.0,
	5.91429344886417493481e-1,
	1.38151865749083321638e-1,
	1.60746087093676504695e-2,
	9.64011807005165528527e-4,
	2.75335474764726041141e-5,
	2.82243172016108031869e-7,
	0.0,
	0.0
];


// FUNCTIONS //

// Compile functions for evaluating rational functions...
var rationalFcnR1 = evalrational( P1, Q1 );
var rationalFcnR2 = evalrational( P2, Q2 );
var rationalFcnR3 = evalrational( P3, Q3 );
var rationalFcnR4 = evalrational( P4, Q4 );
var rationalFcnR5 = evalrational( P5, Q5 );


// MAIN //

/**
* Evaluates the inverse complementary error function.
*
* Note that
*
* ``` tex
* \operatorname{erfc^{-1}}(1-z) = \operatorname{erf^{-1}}(z)
* ```
*
* #### Method
*
* 1. For \\(|x| \leq 0.5\\), we evaluate the inverse error function using the rational approximation
*
*    ``` tex
*    \operatorname{erf^{-1}}(x) = x(x+10)(\mathrm{Y} + \operatorname{R}(x))
*    ```
*
*    where \\(Y\\) is a constant and \\(\operatorname{R}(x)\\) is optimized for a low absolute error compared to \\(|Y|\\).
*
*    <!-- <note> -->
*    Max error \\(2.001849\mbox{e-}18\\). Maximum deviation found (error term at infinite precision) \\(8.030\mbox{e-}21\\).
*    <!-- </note> -->
*
* 2. For \\(0.5 > 1-|x| \geq 0\\), we evaluate the inverse error function using the rational approximation
*
*    ``` tex
*    \operatorname{erf^{-1}} = \frac{\sqrt{-2 \cdot \ln(1-x)}}{\mathrm{Y} + \operatorname{R}(1-x)}
*    ```
*
*    where \\(Y\\) is a constant, and \\(\operatorname{R}(q)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*    <!-- <note> -->
*    Max error \\(7.403372\mbox{e-}17\\). Maximum deviation found (error term at infinite precision) \\(4.811\mbox{e-}20\\).
*    <!-- </note> -->
*
* 3. For \\(1-|x| < 0.25\\), we have a series of rational approximations all of the general form
*
*    ``` tex
*    p = \sqrt{-\ln(1-x)}
*    ```
*
*    Accordingly, the result is given by
*
*    ``` tex
*    \operatorname{erf^{-1}}(x) = p(\mathrm{Y} + \operatorname{R}(p-B))
*    ```
*
*    where \\(Y\\) is a constant, \\(B\\) is the lowest value of \\(p\\) for which the approximation is valid, and \\(\operatorname{R}(x-B)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*    <!-- <note> -->
*    Almost all code will only go through the first or maybe second approximation.  After that we are dealing with very small input values.
*      * If \\(p < 3\\), max error \\(1.089051\mbox{e-}20\\).
*      * If \\(p < 6\\), max error \\(8.389174\mbox{e-}21\\).
*      * If \\(p < 18\\), max error \\(1.481312\mbox{e-}19\\).
*      * If \\(p < 44\\), max error \\(5.697761\mbox{e-}20\\).
*      * If \\(p \geq 44\\), max error \\(1.279746\mbox{e-}20\\).
*
*    <!-- </note> -->
*    <!-- <note> -->
*    The Boost library can accommodate \\(80\\) and \\(128\\) bit long doubles. JavaScript only supports a \\(64\\) bit double (IEEE 754). Accordingly, the smallest \\(p\\) (in JavaScript at the time of this writing) is \\(\sqrt{-\ln(\sim5\mbox{e-}324)} = 27.284429111150214\\).
*    <!-- </note> -->
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfcinv( 0.5 );
* // returns ~0.4769
*
* @example
* var y = erfcinv( 0.8 );
* // returns ~-0.1791
*
* @example
* var y = erfcinv( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var y = erfcinv( 2.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var y = erfcinv( NaN );
* // returns NaN
*/
function erfcinv( x ) {
	var sign;
	var qs;
	var q;
	var g;
	var r;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	// Special case: 2
	if ( x === 2.0 ) {
		return NINF;
	}
	// Special case: 1
	if ( x === 1.0 ) {
		return 0.0;
	}
	if ( x > 2.0 || x < 0.0 ) {
		return NaN;
	}
	// Argument reduction (reduce to interval [0,1]). If `x` is outside [0,1], we can take advantage of the complementary error function reflection formula: `erfc(-z) = 2 - erfc(z)`, by negating the result once finished.
	if ( x > 1.0 ) {
		sign = -1.0;
		q = 2.0 - x;
	} else {
		sign = 1.0;
		q = x;
	}
	x = 1.0 - q;

	// x = 1-q <= 0.5
	if ( x <= 0.5 ) {
		g = x * ( x + 10.0 );
		r = rationalFcnR1( x );
		return sign * ( (g*Y1) + (g*r) );
	}
	// q >= 0.25
	if ( q >= 0.25 ) {
		g = sqrt( -2.0 * ln(q) );
		q -= 0.25;
		r = rationalFcnR2( q );
		return sign * ( g / (Y2+r) );
	}
	q = sqrt( -ln( q ) );

	// q < 3
	if ( q < 3.0 ) {
		qs = q - 1.125;
		r = rationalFcnR3( qs );
		return sign * ( (Y3*q) + (r*q) );
	}
	// q < 6
	if ( q < 6.0 ) {
		qs = q - 3.0;
		r = rationalFcnR4( qs );
		return sign * ( (Y4*q) + (r*q) );
	}
	// q < 18
	qs = q - 6.0;
	r = rationalFcnR5( qs );
	return sign * ( (Y5*q) + (r*q) );
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalrational":163,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],70:[function(require,module,exports){
'use strict';

/**
* Evaluate the inverse complementary error function.
*
* @module @stdlib/math/base/special/erfcinv
*
* @example
* var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
*
* var y = erfcinv( 0.5 );
* // returns ~0.4769
*
* y = erfcinv( 0.8 );
* // returns ~-0.1791
*
* y = erfcinv( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* y = erfcinv( 2.0 );
* // returns Number.NEGATIVE_INFINITY
*
* y = erfcinv( NaN );
* // returns NaN
*/

// MODULES //

var erfcinv = require( './erfcinv.js' );


// EXPORTS //

module.exports = erfcinv;

},{"./erfcinv.js":69}],71:[function(require,module,exports){
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
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
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
* #### Method
*
* 1. We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*   ``` tex
*   \begin{align*}
*   x &= k \cdot \ln(2) + r \\
*   |r| &\leq 0.5 \cdot \ln(2)
*   \end{align*}
*   ```
*
*   <!-- <note> -->
*   \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*   <!-- </note> -->
*
* 2. We approximate of \\( e^{r} \\) by a special rational function on the interval \\([0,0.34658]\\):
*
*   ``` tex
*   \begin{align*}
*   R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*   &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*   \end{align*}
*   ```
*
*   We use a special Remes algorithm on \\([0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*   ``` tex
*   R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*   ```
*
*   where \\( z = r^2 \\) and
*
*   ``` tex
*   \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*   ```
*
*   <!-- <note> -->
*   The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*   <!-- </note> -->
*   The computation of \\( e^{r} \\) thus becomes
*
*   ``` tex
*   \begin{align*}
*   e^{r} &= 1 + \frac{2r}{R-r} \\
*           &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*   \end{align*}
*   ```
*
*   where
*
*   ``` tex
*   R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*   ```
*
* 3. We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*   ``` tex
*   e^{x} = 2^k e^{r}
*   ```
*
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* #### Notes
*
* - According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
* - For IEEE double,
*   * if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*   * if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
* - The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
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
} // end FUNCTION exp()


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":72,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":153,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],72:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

var P = [
	1.66666666666666019037e-01,  /* 0x3FC55555; 0x5555553E */
	-2.77777777770155933842e-03, /* 0xBF66C16C; 0x16BEBD93 */
	6.61375632143793436117e-05, /* 0x3F11566A; 0xAF25DE2C */
	-1.65339022054652515390e-06,/* 0xBEBBBD41; 0xC5D26BF1 */
	4.13813679705723846039e-08 /* 0x3E663769; 0x72BEA4D0 */
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyval_P = evalpoly( P );


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
	c = r - t*polyval_P( t );
	y = 1.0 - ((lo - (r*c)/(2.0-c)) - hi);

	return ldexp( y, k );
} // end FUNCTION expmulti()


// EXPORTS //

module.exports = expmulti;

},{"@stdlib/math/base/special/ldexp":119,"@stdlib/math/base/tools/evalpoly":160}],73:[function(require,module,exports){
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

},{"./exp.js":71}],74:[function(require,module,exports){
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

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var LN2_HALF = require( '@stdlib/math/constants/float64-half-ln-two' );


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

// Scaled polynomial coefficients:
var Q = [
	-3.33333333333331316428e-02, // 0xBFA11111 0x111110F4
	1.58730158725481460165e-03,  // 0x3F5A01A0 0x19FE5585
	-7.93650757867487942473e-05, // 0xBF14CE19 0x9EAADBB7
	4.00821782732936239552e-06,  // 0x3ED0CFCA 0x86E65239
	-2.01099218183624371326e-07 // 0xBE8AFDB7 0x6E09C32D
];


// FUNCTIONS //

var polyval = evalpoly.factory( Q );


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* #### Method
*
* 1. Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*    ``` tex
*    x = k \cdot \ln(2) + r
*    ```
*
*    where
*
*    ``` tex
*    |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*    ```
*
*    <!-- <note> -->
*    A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*    <!-- </note> -->
*
* 2. To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\([0,0.34658]\\). Since
*
*    ``` tex
*    r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*    ```
*
*    we define \\(\operatorname{R1}(r^2)\\) by
*
*    ``` tex
*    r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*    ```
*
*    That is,
*
*    ``` tex
*    \begin{align*}
*    \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*    &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*    &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*    \end{align*}
*    ```
*
*    We use a special Remes algorithm on \\([0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*    ``` tex
*    \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*    ```
*
*    where
*
*    ``` tex
*    \begin{align*}
*    \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*    \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*    \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*    \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*    \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*    \end{align*}
*    ```
*
*    where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*    ``` tex
*    \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*    ```
*
*    \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*    ``` tex
*    \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*    ```
*
*    To compensate for the error in the argument reduction, we use
*
*    ``` tex
*    \begin{align*}
*    \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*    &\approx \operatorname{expm1}(r) + c + rc
*    \end{align*}
*    ```
*
*    Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*    ``` tex
     \begin{align*}
*    \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*    &= r - \mathrm{E}
*    \end{align*}
*    ```
*
* 3. To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*    ``` tex
*    \operatorname{expm1}(x) = \begin{cases}
*    2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*    2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*    \end{cases}
*    ```
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* #### Notes
*
* - For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
* - To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
* - To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*   * if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*   * if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*   * if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*   * if \\(k = 1\\),
*     - if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*     - else return \\(1+2(r-\mathrm{E})\\)
*   * if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*   * if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*   * else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
* - For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
* - The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* #### Accuracy
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
	hx = highWord( y );

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
			k = k|0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
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
		hi = highWord( y ) + (k<<20);
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = 1072693248 - (0x200000>>k);
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (BIAS-k)<<20 );
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = highWord( y ) + (k<<20);
	y = setHighWord( y, hi );
	return y;
} // end FUNCTION expm1()


// EXPORTS //

module.exports = expm1;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-set-high-word":181,"@stdlib/math/constants/float64-exponent-bias":196,"@stdlib/math/constants/float64-half-ln-two":199,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],75:[function(require,module,exports){
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

},{"./expm1.js":74}],76:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var FACTORIALS = require( './factorials.json' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Evaluates the factorial of `x`.
*
* @param {number} x - input value
* @returns {number} factorial
*
* @example
* var v = factorial( 3.0 );
* // returns 6.0
*
* @example
* var v = factorial( -1.5 );
* // returns ~-3.545
*
* @example
* var v = factorial( -0.5 );
* // returns ~1.772
*
* @example
* var v = factorial( 0.5 );
* // returns ~0.886
*
* @example
* var v = factorial( -10.0 );
* // returns NaN
*
* @example
* var v = factorial( 171.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = factorial( NaN );
* // returns NaN
*/
function factorial( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInteger( x ) ) {
		if ( x < 0 ) {
			return NaN;
		}
		if ( x <= MAX_FACTORIAL ) {
			return FACTORIALS[ x ];
		}
		return PINF;
	}
	return gamma( x + 1.0 );
} // end FUNCTION factorial()


// EXPORTS //

module.exports = factorial;

},{"./factorials.json":77,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gamma":89,"@stdlib/math/constants/float64-pinf":212}],77:[function(require,module,exports){
module.exports=[
	1,
	1,
	2,
	6,
	24,
	120,
	720,
	5040,
	40320,
	362880.0,
	3628800.0,
	39916800.0,
	479001600.0,
	6227020800.0,
	87178291200.0,
	1307674368000.0,
	20922789888000.0,
	355687428096000.0,
	6402373705728000.0,
	121645100408832000.0,
	0.243290200817664e19,
	0.5109094217170944e20,
	0.112400072777760768e22,
	0.2585201673888497664e23,
	0.62044840173323943936e24,
	0.15511210043330985984e26,
	0.403291461126605635584e27,
	0.10888869450418352160768e29,
	0.304888344611713860501504e30,
	0.8841761993739701954543616e31,
	0.26525285981219105863630848e33,
	0.822283865417792281772556288e34,
	0.26313083693369353016721801216e36,
	0.868331761881188649551819440128e37,
	0.29523279903960414084761860964352e39,
	0.103331479663861449296666513375232e41,
	0.3719933267899012174679994481508352e42,
	0.137637530912263450463159795815809024e44,
	0.5230226174666011117600072241000742912e45,
	0.203978820811974433586402817399028973568e47,
	0.815915283247897734345611269596115894272e48,
	0.3345252661316380710817006205344075166515e50,
	0.1405006117752879898543142606244511569936e52,
	0.6041526306337383563735513206851399750726e53,
	0.265827157478844876804362581101461589032e55,
	0.1196222208654801945619631614956577150644e57,
	0.5502622159812088949850305428800254892962e58,
	0.2586232415111681806429643551536119799692e60,
	0.1241391559253607267086228904737337503852e62,
	0.6082818640342675608722521633212953768876e63,
	0.3041409320171337804361260816606476884438e65,
	0.1551118753287382280224243016469303211063e67,
	0.8065817517094387857166063685640376697529e68,
	0.427488328406002556429801375338939964969e70,
	0.2308436973392413804720927426830275810833e72,
	0.1269640335365827592596510084756651695958e74,
	0.7109985878048634518540456474637249497365e75,
	0.4052691950487721675568060190543232213498e77,
	0.2350561331282878571829474910515074683829e79,
	0.1386831185456898357379390197203894063459e81,
	0.8320987112741390144276341183223364380754e82,
	0.507580213877224798800856812176625227226e84,
	0.3146997326038793752565312235495076408801e86,
	0.1982608315404440064116146708361898137545e88,
	0.1268869321858841641034333893351614808029e90,
	0.8247650592082470666723170306785496252186e91,
	0.5443449390774430640037292402478427526443e93,
	0.3647111091818868528824985909660546442717e95,
	0.2480035542436830599600990418569171581047e97,
	0.1711224524281413113724683388812728390923e99,
	0.1197857166996989179607278372168909873646e101,
	0.8504785885678623175211676442399260102886e102,
	0.6123445837688608686152407038527467274078e104,
	0.4470115461512684340891257138125051110077e106,
	0.3307885441519386412259530282212537821457e108,
	0.2480914081139539809194647711659403366093e110,
	0.188549470166605025498793226086114655823e112,
	0.1451830920282858696340707840863082849837e114,
	0.1132428117820629783145752115873204622873e116,
	0.8946182130782975286851441715398316520698e117,
	0.7156945704626380229481153372318653216558e119,
	0.5797126020747367985879734231578109105412e121,
	0.4753643337012841748421382069894049466438e123,
	0.3945523969720658651189747118012061057144e125,
	0.3314240134565353266999387579130131288001e127,
	0.2817104114380550276949479442260611594801e129,
	0.2422709538367273238176552320344125971528e131,
	0.210775729837952771721360051869938959523e133,
	0.1854826422573984391147968456455462843802e135,
	0.1650795516090846108121691926245361930984e137,
	0.1485715964481761497309522733620825737886e139,
	0.1352001527678402962551665687594951421476e141,
	0.1243841405464130725547532432587355307758e143,
	0.1156772507081641574759205162306240436215e145,
	0.1087366156656743080273652852567866010042e147,
	0.103299784882390592625997020993947270954e149,
	0.9916779348709496892095714015418938011582e150,
	0.9619275968248211985332842594956369871234e152,
	0.942689044888324774562618574305724247381e154,
	0.9332621544394415268169923885626670049072e156,
	0.9332621544394415268169923885626670049072e158,
	0.9425947759838359420851623124482936749562e160,
	0.9614466715035126609268655586972595484554e162,
	0.990290071648618040754671525458177334909e164,
	0.1029901674514562762384858386476504428305e167,
	0.1081396758240290900504101305800329649721e169,
	0.1146280563734708354534347384148349428704e171,
	0.1226520203196137939351751701038733888713e173,
	0.132464181945182897449989183712183259981e175,
	0.1443859583202493582204882102462797533793e177,
	0.1588245541522742940425370312709077287172e179,
	0.1762952551090244663872161047107075788761e181,
	0.1974506857221074023536820372759924883413e183,
	0.2231192748659813646596607021218715118256e185,
	0.2543559733472187557120132004189335234812e187,
	0.2925093693493015690688151804817735520034e189,
	0.339310868445189820119825609358857320324e191,
	0.396993716080872089540195962949863064779e193,
	0.4684525849754290656574312362808384164393e195,
	0.5574585761207605881323431711741977155627e197,
	0.6689502913449127057588118054090372586753e199,
	0.8094298525273443739681622845449350829971e201,
	0.9875044200833601362411579871448208012564e203,
	0.1214630436702532967576624324188129585545e206,
	0.1506141741511140879795014161993280686076e208,
	0.1882677176888926099743767702491600857595e210,
	0.237217324288004688567714730513941708057e212,
	0.3012660018457659544809977077527059692324e214,
	0.3856204823625804217356770659234636406175e216,
	0.4974504222477287440390234150412680963966e218,
	0.6466855489220473672507304395536485253155e220,
	0.8471580690878820510984568758152795681634e222,
	0.1118248651196004307449963076076169029976e225,
	0.1487270706090685728908450891181304809868e227,
	0.1992942746161518876737324194182948445223e229,
	0.269047270731805048359538766214698040105e231,
	0.3659042881952548657689727220519893345429e233,
	0.5012888748274991661034926292112253883237e235,
	0.6917786472619488492228198283114910358867e237,
	0.9615723196941089004197195613529725398826e239,
	0.1346201247571752460587607385894161555836e242,
	0.1898143759076170969428526414110767793728e244,
	0.2695364137888162776588507508037290267094e246,
	0.3854370717180072770521565736493325081944e248,
	0.5550293832739304789551054660550388118e250,
	0.80479260574719919448490292577980627711e252,
	0.1174997204390910823947958271638517164581e255,
	0.1727245890454638911203498659308620231933e257,
	0.2556323917872865588581178015776757943262e259,
	0.380892263763056972698595524350736933546e261,
	0.571338395644585459047893286526105400319e263,
	0.8627209774233240431623188626544191544816e265,
	0.1311335885683452545606724671234717114812e268,
	0.2006343905095682394778288746989117185662e270,
	0.308976961384735088795856467036324046592e272,
	0.4789142901463393876335775239063022722176e274,
	0.7471062926282894447083809372938315446595e276,
	0.1172956879426414428192158071551315525115e279,
	0.1853271869493734796543609753051078529682e281,
	0.2946702272495038326504339507351214862195e283,
	0.4714723635992061322406943211761943779512e285,
	0.7590705053947218729075178570936729485014e287,
	0.1229694218739449434110178928491750176572e290,
	0.2004401576545302577599591653441552787813e292,
	0.3287218585534296227263330311644146572013e294,
	0.5423910666131588774984495014212841843822e296,
	0.9003691705778437366474261723593317460744e298,
	0.1503616514864999040201201707840084015944e301,
	0.2526075744973198387538018869171341146786e303,
	0.4269068009004705274939251888899566538069e305,
	0.7257415615307998967396728211129263114717e307
]

},{}],78:[function(require,module,exports){
'use strict';

/**
* Evaluate the factorial function.
*
* @module @stdlib/math/base/special/factorial
*
* @example
* var factorial = require( '@stdlib/math/base/special/factorial' );
*
* var v = factorial( 3.0 );
* // returns 6.0
*
* v = factorial( -1.5 );
* // returns ~-3.545
*
* v = factorial( -0.5 );
* // returns ~1.772
*
* v = factorial( 0.5 );
* // returns ~0.886
*
* v = factorial( -10.0 );
* // returns NaN
*
* v = factorial( 171.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = factorial( NaN );
* // returns NaN
*/

// MODULES //

var factorial = require( './factorial.js' );


// EXPORTS //

module.exports = factorial;

},{"./factorial.js":76}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./floor.js":79}],81:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammaDeltaRatioLanczos = require( './gamma_delta_ratio_lanczos.js' );


// VARIABLES //

var MAX_FACTORIAL = 170;


// MAIN //

/**
* Computes the ratio of two gamma functions.
*
* ## Notes
*
* * Specifically, the function evaluates
*
*   ``` tex
*   \frac{ \Gamma( z ) }{ \Gamma( z + \delta ) }
*   ```
*
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*
* @example
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* @example
* var y = gammaDeltaRatio( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/
function gammaDeltaRatio( z, delta ) {
	var result;
	var idelta;
	var iz;

	if ( z <= 0.0 || z + delta <= 0.0 ) {
		// This isn't very sophisticated, or accurate, but it does work:
		return gamma( z ) / gamma( z + delta );
	}
	idelta = floor( delta );
	if ( idelta === delta ) {
		iz = floor( z );
		if ( iz === z ) {
			// As both `z` and `delta` are integers, see if we can use a table lookup:
			if ( z <= MAX_FACTORIAL && ( z + delta <= MAX_FACTORIAL ) ) {
				return factorial( iz - 1.0 ) / factorial( idelta + iz - 1.0 ); // eslint-disable-line max-len
			}
		}
		if ( abs(delta) < 20.0 ) {
			// As `delta` is a small integer, we can use a finite product:
			if ( delta === 0.0 ) {
				return 1.0;
			}
			if ( delta < 0.0 ) {
				z -= 1.0;
				result = z;
				delta += 1.0;
				while ( delta !== 0.0 ) {
					z -= 1.0;
					result *= z;
					delta += 1.0;
				}
				return result;
			}
			result = 1.0 / z;
			delta -= 1.0;
			while ( delta !== 0.0 ) {
				z += 1.0;
				result /= z;
				delta -= 1.0;
			}
			return result;
		}
	}
	return gammaDeltaRatioLanczos( z, delta );
} // end FUNCTION gammaDeltaRatio()


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio_lanczos.js":82,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/factorial":78,"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/gamma":89}],82:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );
var E = require( '@stdlib/math/constants/float64-e' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );


// VARIABLES //

var MAX_FACTORIAL = 170;
var FACTORIAL_169 = 4.269068009004705e+304;


/**
* Calculates the ratio of two gamma functions via Lanczos approximation.
*
* ## Notes
*
* * When \\( z < \epsilon \\), we get spurious numeric overflow unless we're very careful. This can occur either inside `lanczosSum(z)` or in the final combination of terms. To avoid this, split the product up into 2 (or 3) parts:
*
*   ``` tex
*   \begin{align}
*   G(z) / G(L) &= 1 / (z \cdot G(L)) ; z < \eps, L = z + \delta = \delta \\
*   z * G(L) &= z * G(lim) \cdot (G(L)/G(lim)) ; lim = \text{largest factorial}
*   \end{align}
*   ````
*
* @private
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*/
function gammaDeltaRatioLanczos( z, delta ) {
	var result;
	var ratio;
	var zgh;

	if ( z < EPSILON ) {
		if ( delta > MAX_FACTORIAL ) {
			ratio = gammaDeltaRatioLanczos( delta, MAX_FACTORIAL-delta );
			ratio *= z;
			ratio *= FACTORIAL_169;
			return 1.0 / ratio;
		}
		return 1.0 / ( z * gamma( z+delta ) );
	}
	zgh = z + G - 0.5;
	if ( z + delta === z ) {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ) );
		} else {
			result = 1.0;
		}
	} else {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ));
		} else {
			result = pow( zgh / (zgh+delta), z-0.5 );
		}
		// Split up the calculation to avoid spurious overflow:
		result *= lanczosSum( z ) / lanczosSum( z + delta );
	}
	result *= pow( E / ( zgh+delta ), delta );
	return result;
} // end FUNCTION gammaDeltaRatioLanczos()


// EXPORTS //

module.exports = gammaDeltaRatioLanczos;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/gamma":89,"@stdlib/math/base/special/gamma-lanczos-sum":87,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/pow":129,"@stdlib/math/constants/float64-e":193,"@stdlib/math/constants/float64-eps":194,"@stdlib/math/constants/float64-gamma-lanczos-g":198}],83:[function(require,module,exports){
'use strict';

/**
* Calculate the ratio of two gamma functions.
*
* @module @stdlib/math/base/special/gamma-delta-ratio
*
* @example
* var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
*
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* y = gammaDeltaRatio( 4.0, 0.5 );
* // returns 2.0
*
* y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/

// MODULES //

var gammaDeltaRatio = require( './gamma_delta_ratio.js' );


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio.js":81}],84:[function(require,module,exports){
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

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;


// VARIABLES //

var NUM = [
	709811.662581657956893540610814842699825,
	679979.847415722640161734319823103390728,
	293136.785721159725251629480984140341656,
	74887.5403291467179935942448101441897121,
	12555.29058241386295096255111537516768137,
	1443.42992444170669746078056942194198252,
	115.2419459613734722083208906727972935065,
	6.30923920573262762719523981992008976989,
	0.2266840463022436475495508977579735223818,
	0.004826466289237661857584712046231435101741,
	0.4624429436045378766270459638520555557321e-4
];
var DENOM = [
	0.0,
	362880.0,
	1026576.0,
	1172700.0,
	723680.0,
	269325.0,
	63273.0,
	9450.0,
	870.0,
	45.0,
	1.0
];


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
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = evalrational( NUM, DENOM );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"@stdlib/math/base/tools/evalrational":163}],85:[function(require,module,exports){
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
* // returns Number.POSITIVE_INFINITY
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":84}],86:[function(require,module,exports){
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

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;


// VARIABLES //

var NUM = [
	38474670393.31776828316099004518914832218,
	36857665043.51950660081971227404959150474,
	15889202453.72942008945006665994637853242,
	4059208354.298834770194507810788393801607,
	680547661.1834733286087695557084801366446,
	78239755.00312005289816041245285376206263,
	6246580.776401795264013335510453568106366,
	341986.3488721347032223777872763188768288,
	12287.19451182455120096222044424100527629,
	261.6140441641668190791708576058805625502,
	2.506628274631000502415573855452633787834
];
var DENOM = [
	0.0,
	362880.0,
	1026576.0,
	1172700.0,
	723680.0,
	269325.0,
	63273.0,
	9450.0,
	870.0,
	45.0,
	1.0
];


// MAIN //

/**
* Calculates the Lanczos sum approximation.
*
* @name gammaLanczosSum
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* @example
* var v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* @example
* var v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* @example
* var v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* @example
* var v = gammaLanczosSum( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gammaLanczosSum( NaN );
* // returns NaN
*/
var gammaLanczosSum = evalrational( NUM, DENOM );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"@stdlib/math/base/tools/evalrational":163}],87:[function(require,module,exports){
'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum
*
* @example
* var gammaLanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
*
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* v = gammaLanczosSum( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gammaLanczosSum( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSum = require( './gamma_lanczos_sum.js' );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"./gamma_lanczos_sum.js":86}],88:[function(require,module,exports){
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
var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );


// VARIABLES //

var P = [
	9.99999999999999996796e-01,
	4.94214826801497100753e-01,
	2.07448227648435975150e-01,
	4.76367800457137231464e-02,
	1.04213797561761569935e-02,
	1.19135147006586384913e-03,
	1.60119522476751861407e-04,
	0
];
var Q = [
	1.00000000000000000320e+00,
	7.14304917030273074085e-02,
	-2.34591795718243348568e-01,
	3.58236398605498653373e-02,
	1.18139785222060435552e-02,
	-4.45641913851797240494e-03,
	5.39605580493303397842e-04,
	-2.31581873324120129819e-05
];


// FUNCTIONS //

// Compile a function to evaluate a rational function based on the above coefficients...
var rateval = evalrational( P, Q );


// MAIN //

/**
* Evaluates the gamma function.
*
* #### Method
*
* 1. Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2. Large negative arguments are made positive using a reflection formula.
* 3. Large arguments are handled by Stirling's formula.
*
*
* #### Notes
*
* * Relative error:
*
*   | arithmetic | domain    | # trials | peak    | rms     |
*   |:----------:|:---------:|:--------:|:-------:|:-------:|
*   | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*   | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*   | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*   | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* * Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
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
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gamma( -0.0 );
* // returns Number.NEGATIVE_INFINITY
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
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"./small_approximation.js":90,"./stirling_approximation.js":91,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/sin":143,"@stdlib/math/base/tools/evalrational":163,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pi":211,"@stdlib/math/constants/float64-pinf":212}],89:[function(require,module,exports){
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
* // returns Number.POSITIVE_INFINITY
*
* v = gamma( -0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":88}],90:[function(require,module,exports){
'use strict';

// MODULES //

var EULER = require( '@stdlib/math/constants/float64-eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( ( 1.0 + ( EULER*x ) ) * x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/constants/float64-eulergamma":195}],91:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );


// VARIABLES //

var MAX_STIRLING = 143.01608;
var S = [
	8.33333333333482257126e-02,
	3.47222221605458667310e-03,
	-2.68132617805781232825e-03,
	-2.29549961613378126380e-04,
	7.87311395793093628397e-04
];


// FUNCTIONS //

// Compile a function to evaluate a polynomial based on the above coefficients...
var polyval = evalpoly( S );


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
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
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float64-sqrt-two-pi":215}],92:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Calculates normalised Q when a is an integer.
*
* @private
* @param {integer} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteGammaQ( a, x ) {
	var term;
	var sum;
	var e;
	var n;

	e = exp( -x );
	sum = e;
	if ( sum !== 0.0 ) {
		term = sum;
		for ( n = 1; n < a; ++n ) {
			term /= n;
			term *= x;
			sum += term;
		}
	}
	return sum;
} // end FUNCTION finiteGammaQ()


// EXPORTS //

module.exports = finiteGammaQ;

},{"@stdlib/math/base/special/exp":73}],93:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// MAIN //

/**
* Calculates normalised Q when a is a half-integer.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteHalfGammaQ( a, x ) {
	var half;
	var term;
	var sum;
	var e;
	var n;

	e = erfc( sqrt(x) );
	if ( e !== 0 && a > 1.0 ) {
		term = exp( -x ) / sqrt( PI * x );
		term *= x;
		half = 0.5;
		term /= half;
		sum = term;
		for ( n = 2; n < a; ++n ) {
			term /= n - half;
			term *= x;
			sum += term;
		}
		e += sum;
	}
	return e;
} // end FUNCTION finiteHalfGammaQ()


// EXPORTS //

module.exports = finiteHalfGammaQ;

},{"@stdlib/math/base/special/erfc":68,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/constants/float64-pi":211}],94:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );


// MAIN //

/**
* Calculates the power term prefix (z^a)(e^-z) used in the non-normalised incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function fullIGammaPrefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else {
		/* eslint-disable no-lonely-if */
		if ( alz > MIN_LN ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( z/a < MAX_LN ) {
			prefix = pow( z / exp(z/a), a );
		} else {
			prefix = exp( alz - z );
		}
	}
	return prefix;
} // end FUNCTION fullIGammaPrefix()


// EXPORTS //

module.exports = fullIGammaPrefix;

},{"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/pow":129,"@stdlib/math/constants/float64-max-ln":206,"@stdlib/math/constants/float64-min-ln":209}],95:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14
* (C) Christopher Kormanyos 2013-14
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var finiteGammaQ = require( './finite_gamma_q.js' );
var finiteHalfGammaQ = require( './finite_half_gamma_q.js' );
var fullIGammaPrefix = require( './full_igamma_prefix.js' );
var igammaTemmeLarge = require( './igamma_temme_large.js' );
var lowerGammaSeries = require( './lower_gamma_series.js' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );
var tgammaSmallUpperPart = require( './tgamma_small_upper_part.js' );
var upperGammaFraction = require( './upper_gamma_fraction.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Computes the regularized incomplete gamma function. The upper tail is calculated via the modified Lentz's method for computing continued fractions, the lower tail using a power expansion.
*
*
* #### Notes
*
* - When a >= MAX_FACTORIAL and computing the non-normalized incomplete gamma, result is rather hard to compute unless we use logs. There are really two options a) if x is a long way from a in value then we can reliably use methods 2 and 4 below in logarithmic form and go straight to the result. Otherwise we let the regularized gamma take the strain (the result is unlikely to underflow in the central region anyway) and combine with lgamma in the hopes that we get a finite result.
*
* @param {NonNegativeNumber} x - function parameter
* @param {PositiveNumber} a - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete gamma function
* @returns {number} function value
*/
function gammainc( x, a, regularized, upper ) {
	var optimisedInvert;
	var normalised;
	var evalMethod;
	var initValue;
	var isHalfInt;
	var useTemme;
	var isSmallA;
	var invert;
	var result;
	var isInt;
	var sigma;
	var gam;
	var res;
	var fa;
	var g;

	if ( x < 0.0 || a <= 0.0 ) {
		return NaN;
	}
	normalised = ( regularized === void 0 ) ? true : regularized;
	invert = upper;
	result = 0.0;
	if ( a >= MAX_FACTORIAL && !normalised ) {
		if ( invert && ( a * 4.0 < x ) ) {
			// This is method 4 below, done in logs:
			result = ( a * ln(x) ) - x;
			result += ln( upperGammaFraction( a, x ) );
		}
		else if ( !invert && ( a > 4.0 * x ) ) {
			// This is method 2 below, done in logs:
			result = ( a * ln(x) ) - x;
			initValue = 0;
			result += ln( lowerGammaSeries( a, x, initValue ) / a );
		}
		else {
			result = gammainc( a, x, true, invert );
			if ( result === 0.0 ) {
				if ( invert ) {
					// Try http://functions.wolfram.com/06.06.06.0039.01
					result = 1.0 + ( 1.0 / (12.0*a) ) + ( 1.0 / (288.0*a*a) );
					result = ln( result ) - a + ( ( a-0.5 ) * ln(a) );
					result += ln( SQRT_TWO_PI );
				} else {
					// This is method 2 below, done in logs, we're really outside the range of this method, but since the result is almost certainly infinite, we should probably be OK:
					result = ( a * ln( x ) ) - x;
					initValue = 0.0;
					result += ln( lowerGammaSeries( a, x, initValue ) / a);
				}
			}
			else {
				result = ln( result ) + gammaln( a );
			}
		}
		if ( result > MAX_LN ) {
			return PINF;
		}
		return exp( result );
	}
	isSmallA = ( a < 30 ) && ( a <= x + 1.0 ) && ( x < MAX_LN );
	if ( isSmallA ) {
		fa = floor( a );
		isInt = ( fa === a );
		isHalfInt = isInt ? false : ( abs( fa - a ) === 0.5 );
	} else {
		isInt = isHalfInt = false;
	}
	if ( isInt && x > 0.6 ) {
		// Calculate Q via finite sum:
		invert = !invert;
		evalMethod = 0;
	}
	else if ( isHalfInt && x > 0.2 ) {
		// Calculate Q via finite sum for half integer a:
		invert = !invert;
		evalMethod = 1;
	}
	else if ( x < SQRT_EPSILON && a > 1.0 ) {
		evalMethod = 6;
	}
	else if ( x < 0.5 ) {
		// Changeover criterion chosen to give a changeover at Q ~ 0.33:
		if ( -0.4 / ln( x ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else if ( x < 1.1 ) {
		// Changeover here occurs when P ~ 0.75 or Q ~ 0.25:
		if ( x * 0.75 < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else {
		// Begin by testing whether we're in the "bad" zone where the result will be near 0.5 and the usual series and continued fractions are slow to converge:
		useTemme = false;
		if ( normalised && a > 20 ) {
			sigma = abs( (x-a)/a );
			if ( a > 200 ) {
				// Limit chosen so that we use Temme's expansion only if the result would be larger than about 10^-6. Below that the regular series and continued fractions converge OK, and if we use Temme's method we get increasing errors from the dominant erfc term as it's (inexact) argument increases in magnitude.
				if ( 20 / a > sigma * sigma ) {
					useTemme = true;
				}
			} else if ( sigma < 0.4 ) {
				useTemme = true;
			}
		}
		if ( useTemme ) {
			evalMethod = 5;
		}
		// Regular case where the result will not be too close to 0.5: Changeover occurs at P ~ Q ~ 0.5. Note that series computation of P is about x2 faster than continued fraction calculation of Q, so try and use the CF only when really necessary, especially for small x.
		else if ( x - ( 1.0 / (3.0 * x) ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 4;
			invert = !invert;
		}
	}

	/* eslint-disable default-case */
	switch ( evalMethod ) {
	case 0:
		result = finiteGammaQ( a, x );
		if (normalised === false ) {
			result *= gamma( a );
		}
		break;
	case 1:
		result = finiteHalfGammaQ( a, x );
		if ( normalised === false ) {
			result *= gamma( a );
		}
		break;
	case 2:
		// Compute P:
		result = normalised ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0.0 ) {
			initValue = 0.0;
			optimisedInvert = false;
			if ( invert ) {
				initValue = normalised ? 1.0 : gamma(a);
				if (
					normalised ||
					result >= 1.0 ||
					FLOAT64_MAX * result > initValue
				) {
					initValue /= result;
					if (
						normalised ||
						a < 1.0 ||
						( FLOAT64_MAX / a > initValue )
					) {
						initValue *= -a;
						optimisedInvert = true;
					}
					else {
						initValue = 0.0;
					}
				}
				else {
					initValue = 0.0;
				}
			}
		}
		result *= lowerGammaSeries( a, x, initValue ) / a;
		if ( optimisedInvert ) {
			invert = false;
			result = -result;
		}
		break;
	case 3:
		// Compute Q:
		invert = !invert;
		res = tgammaSmallUpperPart( a, x, invert );
		result = res[ 0 ];
		g = res[ 1 ];
		invert = false;
		if ( normalised ) {
			result /= g;
		}
		break;
	case 4:
		// Compute Q:
		result = normalised ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0 ) {
			result *= upperGammaFraction( a, x );
		}
		break;
	case 5:
		result = igammaTemmeLarge( a, x );
		if ( x >= a ) {
			invert = !invert;
		}
		break;
	case 6:
		// Since x is so small that P is necessarily very small too, use http://functions.wolfram.com/GammaBetaErf/GammaRegularized/06/01/05/01/01/
		result = normalised ?
			pow(x, a) / gamma( a + 1.0 ) :
			pow( x, a ) / a;
		result *= 1.0 - ( a * x / ( a + 1.0 ) );
		break;
	}
	if ( normalised && result > 1.0 ) {
		result = 1.0;
	}
	if ( invert ) {
		gam = normalised ? 1.0 : gamma( a );
		result = gam - result;
	}
	return result;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;

},{"./finite_gamma_q.js":92,"./finite_half_gamma_q.js":93,"./full_igamma_prefix.js":94,"./igamma_temme_large.js":97,"./lower_gamma_series.js":99,"./regularised_gamma_prefix.js":101,"./tgamma_small_upper_part.js":103,"./upper_gamma_fraction.js":104,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/gamma":89,"@stdlib/math/base/special/gammaln":118,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/pow":129,"@stdlib/math/constants/float64-max":207,"@stdlib/math/constants/float64-max-ln":206,"@stdlib/math/constants/float64-pinf":212,"@stdlib/math/constants/float64-sqrt-eps":214,"@stdlib/math/constants/float64-sqrt-two-pi":215}],96:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/gamma.hpp}.
*
* This implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );


// MAIN //

/**
* Computes `Γ(x+1) - 1`.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammap1m1( 1e-3 );
* // returns ~-0.001
*
* @example
* var v = gammap1m1( -3/2 );
* // returns ~-4.545
*
* @example
* var v = gammap1m1( 4.0 );
* // returns 23
*
* @example
* var v = gammap1m1( 1/2 );
* // returns ~-0.114
*
* @example
* var v = gammap1m1( NaN );
* // returns NaN
*/
function gammap1m1( x ) {
	if ( x < -0.5 ) {
		// Best method is simply to subtract 1 from gamma:
		return gamma( 1.0 + x ) - 1.0;
	}
	if ( x < 0.0 ) {
		// Use expm1 on gammaln:
		return expm1( -log1p(x) + gammaln( x + 2.0 ) );
	}
	if ( x < 2.0 ) {
		// Use expm1 on gammaln:
		return expm1( gammaln( x + 1.0 ) );
	}
	// Best method is simply to subtract 1 from gamma:
	return gamma( 1.0 + x ) - 1.0;
} // end FUNCTION gammap1m1()


// EXPORTS //

module.exports = gammap1m1;

},{"@stdlib/math/base/special/expm1":75,"@stdlib/math/base/special/gamma":89,"@stdlib/math/base/special/gammaln":118,"@stdlib/math/base/special/log1p":123}],97:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// VARIABLES //

// Pre-allocate workspace array:
var workspace = new Array( 10 );

// Polynomical coefficients...
var C0 = [
	-0.33333333333333333,
	0.083333333333333333,
	-0.014814814814814815,
	0.0011574074074074074,
	0.0003527336860670194,
	-0.00017875514403292181,
	0.39192631785224378e-4,
	-0.21854485106799922e-5,
	-0.185406221071516e-5,
	0.8296711340953086e-6,
	-0.17665952736826079e-6,
	0.67078535434014986e-8,
	0.10261809784240308e-7,
	-0.43820360184533532e-8,
	0.91476995822367902e-9
];
var C1 = [
	-0.0018518518518518519,
	-0.0034722222222222222,
	0.0026455026455026455,
	-0.00099022633744855967,
	0.00020576131687242798,
	-0.40187757201646091e-6,
	-0.18098550334489978e-4,
	0.76491609160811101e-5,
	-0.16120900894563446e-5,
	0.46471278028074343e-8,
	0.1378633446915721e-6,
	-0.5752545603517705e-7,
	0.11951628599778147e-7
];
var C2 = [
	0.0041335978835978836,
	-0.0026813271604938272,
	0.00077160493827160494,
	0.20093878600823045e-5,
	-0.00010736653226365161,
	0.52923448829120125e-4,
	-0.12760635188618728e-4,
	0.34235787340961381e-7,
	0.13721957309062933e-5,
	-0.6298992138380055e-6,
	0.14280614206064242e-6
];
var C3 = [
	0.00064943415637860082,
	0.00022947209362139918,
	-0.00046918949439525571,
	0.00026772063206283885,
	-0.75618016718839764e-4,
	-0.23965051138672967e-6,
	0.11082654115347302e-4,
	-0.56749528269915966e-5,
	0.14230900732435884e-5
];
var C4 = [
	-0.0008618882909167117,
	0.00078403922172006663,
	-0.00029907248030319018,
	-0.14638452578843418e-5,
	0.66414982154651222e-4,
	-0.39683650471794347e-4,
	0.11375726970678419e-4
];
var C5 = [
	-0.00033679855336635815,
	-0.69728137583658578e-4,
	0.00027727532449593921,
	-0.00019932570516188848,
	0.67977804779372078e-4,
	0.1419062920643967e-6,
	-0.13594048189768693e-4,
	0.80184702563342015e-5,
	-0.22914811765080952e-5
];
var C6 = [
	0.00053130793646399222,
	-0.00059216643735369388,
	0.00027087820967180448,
	0.79023532326603279e-6,
	-0.81539693675619688e-4,
	0.56116827531062497e-4,
	-0.18329116582843376e-4
];
var C7 = [
	0.00034436760689237767,
	0.51717909082605922e-4,
	-0.00033493161081142236,
	0.0002812695154763237,
	-0.00010976582244684731
];
var C8 = [
	-0.00065262391859530942,
	0.00083949872067208728,
	-0.00043829709854172101
];

// Compile functions for evaluating polynomial functions...
var polyvalC0 = evalpoly.factory( C0 );
var polyvalC1 = evalpoly.factory( C1 );
var polyvalC2 = evalpoly.factory( C2 );
var polyvalC3 = evalpoly.factory( C3 );
var polyvalC4 = evalpoly.factory( C4 );
var polyvalC5 = evalpoly.factory( C5 );
var polyvalC6 = evalpoly.factory( C6 );
var polyvalC7 = evalpoly.factory( C7 );
var polyvalC8 = evalpoly.factory( C8 );


// MAIN //

/**
* Asymptotic expansions of the incomplete gamma functions when a is large and x ~ a. (IEEE double precision or 10^-17).
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} value of asymptotic expansion
*/
function igammaTemmeLarge( a, x ) {
	var result;
	var sigma;
	var phi;
	var y;
	var z;

	sigma = ( x - a ) / a;
	phi = -ln( 1 + sigma ) + sigma;
	y = a * phi;
	z = sqrt( 2 * phi );
	if ( x < a ) {
		z = -z;
	}
	workspace[ 0 ] = polyvalC0( z );
	workspace[ 1 ] = polyvalC1( z );
	workspace[ 2 ] = polyvalC2( z );
	workspace[ 3 ] = polyvalC3( z );
	workspace[ 4 ] = polyvalC4( z );
	workspace[ 5 ] = polyvalC5( z );
	workspace[ 6 ] = polyvalC6( z );
	workspace[ 7 ] = polyvalC7( z );
	workspace[ 8 ] = polyvalC8( z );
	workspace[ 9 ] = -0.00059676129019274625;
	result = evalpoly( workspace, 1.0/a );
	result *= exp( -y ) / sqrt( 2.0 * PI * a );
	if ( x < a ) {
		result = -result;
	}
	result += erfc( sqrt(y) ) / 2.0;
	return result;
} // end FUNCTION igammaTemmeLarge()


// EXPORTS //

module.exports = igammaTemmeLarge;

},{"@stdlib/math/base/special/erfc":68,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float64-pi":211}],98:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete gamma function.
*
* @module @stdlib/math/base/special/gammainc
*
* @example
* var gammainc = require( '@stdlib/math/base/special/gammainc' );
*
* var v = gammainc( 6.0, 2.0 );
* // returns ~0.9826
*
* v = gammainc( 1.0, 2.0, true, true );
* // returns ~0.7358
*
* v = gammainc( 7.0, 5.0 );
* // returns ~0.8270
*
* v = gammainc( 7.0, 5.0, false );
* // returns ~19.8482
*
* v = gammainc( NaN, 2.0 );
* // returns NaN
*
* v = gammainc( 6.0, NaN );
* // returns NaN
*/

// MODULES //

var gammainc = require( './gammainc.js' );


// EXPORTS //

module.exports = gammainc;

},{"./gammainc.js":95}],99:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var lowerIncompleteGammaSeries = require( './lower_incomplete_gamma_series' );


// MAIN //

/**
* Sums elements of the series expansion of the lower incomplete gamma function.
*
* #### Method
*
* Multiply result by ((z^a) * (e^-z) / a) to get the full lower incomplete integral. Then divide by tgamma(a) to get the normalised value.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @param {number} initialValue - initial value of the resulting sum
* @returns {number} sum of terms of lower gamma series
*/
function lowerGammaSeries( a, z, initialValue ) {
	var result;
	var s;

	initialValue = initialValue || 0.0;
	s = lowerIncompleteGammaSeries( a, z );
	result = sumSeries( s, {
		'initialValue': initialValue
	});
	return result;
} // end FUNCTION lowerGammaSeries()


// EXPORTS //

module.exports = lowerGammaSeries;

},{"./lower_incomplete_gamma_series":100,"@stdlib/math/base/tools/sum-series":166}],100:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the incomplete gamma function.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function lowerIncompleteGammaSeries( a1, z1 ) {
	var result = 1.0;
	var a = a1;
	var z = z1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		var r = result;
		a += 1.0;
		result *= z/a;
		return r;
	} // end FUNCTION next()
} // end FUNCTION lowerIncompleteGammaSeries()


// EXPORTS //

module.exports = lowerIncompleteGammaSeries;

},{}],101:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var E = require( '@stdlib/math/constants/float64-e' );


// VARIABLES //

var LOG_MAX_VALUE = 709.0;
var LOG_MIN_VALUE = -708.0;
var G = 10.90051099999999983936049829935654997826;
var NUM = [
	709811.662581657956893540610814842699825,
	679979.847415722640161734319823103390728,
	293136.785721159725251629480984140341656,
	74887.5403291467179935942448101441897121,
	12555.29058241386295096255111537516768137,
	1443.42992444170669746078056942194198252,
	115.2419459613734722083208906727972935065,
	6.30923920573262762719523981992008976989,
	0.2266840463022436475495508977579735223818,
	0.004826466289237661857584712046231435101741,
	0.4624429436045378766270459638520555557321e-4
];
var DENOM = [
	0,
	362880,
	1026576,
	1172700,
	723680,
	269325,
	63273,
	9450,
	870,
	45,
	1
];


// FUNCTIONS //

/**
* Calculate the Lanczos approximation scaled by exp(G).
*
* @private
* @param {number} z - input value
* @returns {number} Lanczos approximation
*/
var lanczosSumExpGScaled = evalrational( NUM, DENOM );


// MAIN //

/**
* Computes (z^a)(e^-z)/tgamma(a).
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} (z^a)(e^-z)/tgamma(a)
*/
function regularisedGammaPrefix( a, z ) {
	var prefix;
	var amza;
	var agh;
	var alz;
	var amz;
	var sq;
	var d;

	agh = a + G - 0.5;
	d = ( (z - a) - G + 0.5 ) / agh;
	if ( a < 1 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimised against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= LOG_MIN_VALUE ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - ( z - gammaln( a ) ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100 && a > 150 ) {
		// Special case for large a and a ~ z:
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * (0.5 - G) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= LOG_MIN_VALUE ||
			max(alz, amz) >= LOG_MAX_VALUE
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2 > LOG_MIN_VALUE &&
				max(alz, amz)/2 < LOG_MAX_VALUE
			) {
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2 ) * exp( amz / 2 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4 > LOG_MIN_VALUE &&
				max(alz, amz)/4 < LOG_MAX_VALUE &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4 ) * exp( amz / 4 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > LOG_MIN_VALUE &&
				amza < LOG_MAX_VALUE
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else {
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczosSumExpGScaled( a );
	return prefix;
} // end FUNCTION regularisedGammaPrefix()


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/gamma":89,"@stdlib/math/base/special/gammaln":118,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/log1p":123,"@stdlib/math/base/special/max":125,"@stdlib/math/base/special/min":127,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalrational":163,"@stdlib/math/constants/float64-e":193}],102:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

/**
* Series representation for upper fraction when z is small.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {Function}  series function
*/
function smallGamma2Series( a, x ) {
	var result;
	var apn;
	var n;
	var r;

	result = -x;
	x = -x;
	apn = a + 1.0;
	n = 1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		r = result / apn;
		result *= x;
		n += 1;
		result /= n;
		apn += 1.0;
		return r;
	} // end FUNCTION next();
} // end FUNCTION smallGamma2Series()


// EXPORTS //

module.exports = smallGamma2Series;

},{}],103:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var powm1 = require( '@stdlib/math/base/special/powm1' );
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var smallGamma2Series = require( './small_gamma2_series.js' );
var tgamma1pm1 = require( './gammap1m1.js' );


// MAIN //

/**
* Compute the full upper fraction (Q) when a is very small.
*
* @param {number} a - function parameter
* @param {number} x - function parameter
* @param {boolean} invert - boolean indicating if the upper tail of the incomplete gamma function should be evaluated
* @returns {Array} full upper fraction (Q) and pgam
*/
function tgammaSmallUpperPart( a, x, invert ) {
	var initialValue;
	var result;
	var pgam;
	var p;
	var s;

	result = tgamma1pm1( a );
	pgam = ( result + 1.0 ) / a;
	p = powm1( x, a );
	result -= p;
	result /= a;
	s = smallGamma2Series( a, x );
	p += 1.0;
	initialValue = invert ? pgam : 0.0;
	result = -p * sumSeries( s, {
		'initialValue': (initialValue - result) / p
	});
	if ( invert ) {
		result = -result;
	}
	return [ result, pgam ];
} // end FUNCTION tgammaSmallUpperPart()


// EXPORTS //

module.exports = tgammaSmallUpperPart;

},{"./gammap1m1.js":96,"./small_gamma2_series.js":102,"@stdlib/math/base/special/powm1":137,"@stdlib/math/base/tools/sum-series":166}],104:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var upperIncompleteGammaFract = require( './upper_incomplete_gamma_fract' );


// MAIN //

/**
* Evaluate the lower incomplete gamma integral via a series expansion and divide by gamma(z) to normalise.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} function value
*/
function upperGammaFraction( a, z ) {
	var f = upperIncompleteGammaFract( a, z );
	return 1.0 / ( z - a + 1.0 + continuedFraction( f ) );
} // end FUNCTION upperGammaFraction()


// EXPORTS //

module.exports = upperGammaFraction;

},{"./upper_incomplete_gamma_fract":105,"@stdlib/math/base/tools/continued-fraction":157}],105:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the upper incomplete gamma fraction.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function upperIncompleteGammaFract( a1, z1 ) {
	var z = z1 - a1 + 1.0;
	var a = a1;
	var k = 0;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {Array} series expansion terms
	*/
	function next() {
		k += 1;
		z += 2.0;
		return [
			k * (a - k),
			z
		];
	} // end FUNCTION next()
} // end FUNCTION upperIncompleteGammaFract()


// EXPORTS //

module.exports = upperIncompleteGammaFract;

},{}],106:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Computes the sum of a Chebyshev polynomial.
*
* @private
* @param {PositiveInteger} n - degree of polynomial
* @param {number} t - input value
* @param {Array} ak - coefficients of the Chebyshev polynomial
* @returns {number} Chebyshev sum
*/
function chepolsum( n, t, ak ) {
	var tt;
	var u0;
	var u1;
	var u2;
	var k;

	u0 = 0.0;
	u1 = 0.0;
	tt = t + t;
	k = n;
	do {
		u2 = u1;
		u1 = u0;
		u0 = ( tt*u1 ) - u2 + ak[ k ];
		k -= 1;
	} while ( k >= 0 );
	return ( u0 - u2 ) / 2.0;
} // end FUNCTION chepolsum()


// EXPORTS //

module.exports = chepolsum;

},{}],107:[function(require,module,exports){
/* eslint-disable max-statements */
'use strict';

// MODULES //

var debug = require( 'debug' )( 'gammaincinv:compute' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var min = require( '@stdlib/math/base/special/min' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var higherNewton = require( './higher_newton.js' );
var lambdaeta = require( './lambdaeta.js' );
var gamstar = require( './gamstar.js' );
var eps1 = require( './eps1.js' );
var eps2 = require( './eps2.js' );
var eps3 = require( './eps3.js' );


// VARIABLES //

var ONEO6 = 0.166666666666666666666666666667;
var ONEO12 = 0.0833333333333333333333333333333;
var ONEO24 = 0.0416666666666666666666666666667;


// MAIN //

/**
* This routine computes xr in the equations P(a,xr)=p and Q(a,xr)=q with a as a given positive parameter; p and q satisfy p+q=1. The equation is inverted with min(p,q).
*
* @private
* @param {number} a - scale value of incomplete gamma function
* @param {Probability} p - probability value
* @param {Probability} q - probability value
* @returns {number} solution of the equations P(a,xr)=p and Q(a,xr)=q with a as a given positive parameter.
*/
function compute( a, p, q ) {
	var ap1inv;
	var invfp;
	var lgama;
	var pcase;
	var porq;
	var ainv;
	var logr;
	var ap22;
	var ap14;
	var ap13;
	var ap12;
	var vgam;
	var vmin;
	var xini;
	var ap1;
	var ap2;
	var ap3;
	var eta;
	var p6;
	var p5;
	var x0;
	var ck;
	var a2;
	var L2;
	var L3;
	var L4;
	var b2;
	var b3;
	var p3;
	var a4;
	var fp;
	var p4;
	var p2;
	var a3;
	var xr;
	var b;
	var L;
	var i;
	var k;
	var m;
	var r;
	var s;
	var y;

	ck = new Array( 5 );
	if ( p < 0.5) {
		pcase = true;
		porq = p;
		s = -1;
	} else {
		pcase = false;
		porq = q;
		s = 1;
	}
	k = 0;
	if ( abs( a - 1 ) < 1e-4 ) {
		m = 0;
		if ( pcase ) {
			if ( p < 1e-3 ) {
				p2 = p * p;
				p3 = p2 * p;
				p4 = p3 * p;
				p5 = p4 * p;
				p6 = p5 * p;
				x0 = p + ( p2*0.5 ) + ( p3*(1/3) ) + ( p4*0.25 );
				x0 += ( p5*0.2 ) + ( p6*(1/6) );
			} else {
				x0 = -ln( 1 - p );
			}
		} else {
			x0 = -ln( q );
		}
		if ( a === 1 ) {
			k = 2;
			xr = x0;
		} else {
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( q < 1e-30 && a < 0.5 ) {
		m = 0;
		x0 = -ln( q * gamma(a) ) + ( ( a-1.0 ) * ln( -ln( q * gamma(a) ) ));
		k = 1;
		lgama = gammaln( a );
	}
	if ( a > 1.0 && a < 500.0 && p < 1e-80 ) {
		m = 0;
		ainv = 1.0 / a;
		ap1inv = 1.0 / ( a + 1.0 );
		x0 = ( gammaln( a+1.0 )+ ln( p ) ) * ainv;
		x0 = exp( x0 );
		xini = x0;
		for ( i = 0; i < 10; i++ ) {
			x0 = xini * exp( x0 * ainv ) * pow( 1.0 - ( x0*ap1inv ), ainv );
		}
		k = 1;
		lgama = gammaln( a );
	}

	logr = (1.0/a) * ( ln(p) + gammaln( a + 1 ) );
	if ( ( logr < ln( 0.2 * ( 1.0+a ) ) ) && ( k === 0 ) ) {
		r = exp( logr );
		m = 0;
		a2 = a * a;
		a3 = a2 * a;
		a4 = a3 * a;
		ap1 = a + 1;
		ap12 = ap1 * ap1;
		ap13 = ap1 * ap12;
		ap14 = ap12 * ap12;
		ap2 = a + 2;
		ap22 = ap2 * ap2;
		ap3 = a + 3;
		ck[ 0 ] = 1.0;
		ck[ 1 ] = 1.0 / ap1;
		ck[ 2 ] = 0.5 * ( ( 3.0*a ) + 5.0 ) / ( ap12 * ap2 );
		ck[ 3 ] = (1/3) * ( 31.0 + (8.0*a2) + (33.0*a) ) / ( ap13 * ap2 * ap3 );
		ck[ 4 ] = ONEO24 * ( 2888.0 + (1179.0*a3) + (125.0*a4) + (3971.0*a2) +
			(5661.0*a) ) / ( ap14 * ap22 * ap3 * ( a+4.0 ) );
		x0 = r * evalpoly( ck, r );
		lgama = gammaln( a );
		k = 1;
	}
	if ( ( a < 10.0 ) && ( k === 0 ) ) {
		vgam = sqrt( a ) / ( gamstar(a) * SQRT_TWO_PI );
		vmin = min( 0.02, vgam );
		if ( q < vmin ) {
			m = 0;
			b = 1.0 - a;
			b2 = b * b;
			b3 = b2 * b;
			eta = sqrt( -2.0/a * ln( q / vgam ) );
			x0 = a * lambdaeta(eta);
			L = ln( x0 );
			if ( x0 > 5 ) {
				L2 = L * L;
				L3 = L2 * L;
				L4 = L3 * L;
				r = 1.0 / x0;
				ck[ 0 ] = L - 1.0;
				ck[ 1 ] = ( (3.0*b) - (2.0*b*L) + L2 - ( 2.0*L ) + 2.0 ) * 0.5;
				ck[ 2 ] =( (24*b*L) - (11*b2) - (24*b) - (6*L2) + (12*L) -
					12.0 - (9*b*L2) + (6*b2*L) + (2*L3) ) * ONEO6;
				ck[ 3 ] = ( (-12*b3*L) + (84*b*L2) - (114*b2*L) + (72+(36*L2)) +
					(((3*L4)-(72*L)+162) * (b-(168*b*L))) - ((12*L3)+(25*b3)) -
					( (22*b*L3)+(36*b2*L2)+(120*b2) ) ) * ONEO12;
				ck[ 4 ] = 0.0;
				x0 = x0 - L + ( b*r*evalpoly( ck, r ) );
			} else {
				r = 1.0 / x0;
				L2 = L * L;
				ck[ 0 ] = L - 1.0;
				if ( ( L - ( b*r*ck[ 0 ] ) ) < x0 ) {
					x0 = x0 - L + ( b * r * ck[ 0 ] );
				}
			}
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( ( abs( porq - 0.5 ) < 1e-5 ) && ( k === 0 ) ) {
		m = 0;
		ainv = 1.0 / a;
		x0 = a - (1/3) + ( ( 0.0197530864197530864197530864198 +
			( 0.00721144424848128551832255535959 * ainv ) ) * ainv );
		lgama = gammaln( a );
		k = 1;
	}
	if ( ( a < 1 ) && ( k === 0 ) ) {
		m = 0;
		if (pcase) {
			x0 = exp( (1/a) * ( ln(porq) + gammaln(a+1) ) );
		} else {
			x0 = exp( (1/a) * ( ln(1-porq) + gammaln(a+1) ) );
		}
		lgama = gammaln( a );
		k = 1;
	}
	if ( k === 0 ) {
		m = 1;
		ainv = 1 / a;
		r = erfcinv( 2 * porq );
		eta = s * r / sqrt( a * 0.5 );
		if ( r < MAX_FLOAT32 ) {
			eta += ( eps1(eta) + ( (eps2(eta)+(eps3(eta)*ainv))*ainv ) ) * ainv;
			x0 = a * lambdaeta(eta);
			y = eta;
			fp = -sqrt( a / (2*PI) ) * exp( -0.5*a*y*y ) / ( gamstar(a) );
			invfp = 1 / fp;
		} else {
			debug( 'Warning: Overflow problems in one or more steps of the computation.' );
			return NaN;
		}
	}
	if ( k < 2 ) {
		xr = higherNewton( x0, a, m, p, q, lgama, invfp, pcase );
	}
	return xr;
} // end FUNCTION compute()


// EXPORTS //

module.exports = compute;

},{"./eps1.js":108,"./eps2.js":109,"./eps3.js":110,"./gamstar.js":112,"./higher_newton.js":113,"./lambdaeta.js":115,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/erfcinv":70,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/gamma":89,"@stdlib/math/base/special/gammaln":118,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/min":127,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float32-max":191,"@stdlib/math/constants/float64-pi":211,"@stdlib/math/constants/float64-sqrt-two-pi":215,"debug":229}],108:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );
var lambdaeta = require( './lambdaeta.js' );


// VARIABLES //

var AK = [
	-3.333333333438e-1,
	-2.070740359969e-1,
	-5.041806657154e-2,
	-4.923635739372e-3,
	-4.293658292782e-5
];
var BK = [
	1.000000000000e+0,
	7.045554412463e-1,
	2.118190062224e-1,
	3.048648397436e-2,
	1.605037988091e-3
];


// FUNCTIONS //

var rateval = evalrational.factory( AK, BK );


// MAIN //

/**
* Evaluates the `eps1` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps1( eta ) {
	var la;
	if ( abs( eta ) < 1.0 ) {
		return rateval( eta );
	}
	la = lambdaeta( eta );
	return ln( eta / ( la - 1.0 ) ) / eta;
} // end FUNCTION eps1()


// EXPORTS //

module.exports = eps1;

},{"./lambdaeta.js":115,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/tools/evalrational":163}],109:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var AK1 = [
	-1.72847633523e-2,
	-1.59372646475e-2,
	-4.64910887221e-3,
	-6.06834887760e-4,
	-6.14830384279e-6
];
var BK1 = [
	1.00000000000e+0,
	7.64050615669e-1,
	2.97143406325e-1,
	5.79490176079e-2,
	5.74558524851e-3
];

var AK2 = [
	-1.72839517431e-2,
	-1.46362417966e-2,
	-3.57406772616e-3,
	-3.91032032692e-4,
	2.49634036069e-6
];
var BK2 = [
	1.00000000000e+0,
	6.90560400696e-1,
	2.49962384741e-1,
	4.43843438769e-2,
	4.24073217211e-3
];

var AK3 = [
	9.99944669480e-1,
	1.04649839762e+2,
	8.57204033806e+2,
	7.31901559577e+2,
	4.55174411671e+1
];
var BK3 = [
	1.00000000000e+0,
	1.04526456943e+2,
	8.23313447808e+2,
	3.11993802124e+3,
	3.97003311219e+3
];


// FUNCTIONS //

var rateval1 = evalrational.factory( AK1, BK1 );
var rateval2 = evalrational.factory( AK2, BK2 );
var rateval3 = evalrational.factory( AK3, BK3 );


// MAIN //

/**
* Evaluates the `eps2` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps2( eta ) {
	var lnmeta;
	var x;
	if ( eta < -5.0 ) {
		x = eta * eta;
		lnmeta = ln( -eta );
		return ( 12.0 - x - ( 6.0*( lnmeta*lnmeta ) ) ) / ( 12.0 * x * eta );
	}
	else if ( eta < -2.0 ) {
		return rateval1( eta );
	}
	else if ( eta < 2.0 ) {
		return rateval2( eta );
	}
	else if ( eta < 1000.0 ) {
		x = 1.0 / eta;
		return rateval3( eta ) / ( -12.0 * eta );
	}
	return -1.0 / ( 12.0 * eta );
} // end FUNCTION eps2()


// EXPORTS //

module.exports = eps2;

},{"@stdlib/math/base/special/ln":121,"@stdlib/math/base/tools/evalrational":163}],110:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var ak1 = [
	4.95346498136e-2,
	2.99521337141e-2,
	6.88296911516e-3,
	5.12634846317e-4,
	-2.01411722031e-5
];
var bk1 = [
	1.00000000000e+0,
	7.59803615283e-1,
	2.61547111595e-1,
	4.64854522477e-2,
	4.03751193496e-3
];

var ak2 = [
	4.52313583942e-3,
	1.20744920113e-3,
	-7.89724156582e-5,
	-5.04476066942e-5,
	-5.35770949796e-6
];
var bk2 = [
	1.00000000000e+0,
	9.12203410349e-1,
	4.05368773071e-1,
	9.01638932349e-2,
	9.48935714996e-3
];

var ak3 = [
	4.39937562904e-3,
	4.87225670639e-4,
	-1.28470657374e-4,
	5.29110969589e-6,
	1.57166771750e-7
];
var bk3 = [
	1.00000000000e+0,
	7.94435257415e-1,
	3.33094721709e-1,
	7.03527806143e-2,
	8.06110846078e-3
];

var ak4 = [
	-1.14811912320e-3,
	-1.12850923276e-1,
	1.51623048511e+0,
	-2.18472031183e-1,
	7.30002451555e-2
];
var bk4 = [
	1.00000000000e+0,
	1.42482206905e+1,
	6.97360396285e+1,
	2.18938950816e+2,
	2.77067027185e+2
];

var ak5 = [
	-1.45727889667e-4,
	-2.90806748131e-1,
	-1.33085045450e+1,
	1.99722374056e+2,
	-1.14311378756e+1
];
var bk5 = [
	1.00000000000e+0,
	1.39612587808e+2,
	2.18901116348e+3,
	7.11524019009e+3,
	4.55746081453e+4
];


// FUNCTIONS //

var rational1 = evalrational.factory( ak1, bk1 );
var rational2 = evalrational.factory( ak2, bk2 );
var rational3 = evalrational.factory( ak3, bk3 );
var rational4 = evalrational.factory( ak4, bk4 );
var rational5 = evalrational.factory( ak5, bk5 );


// MAIN //

/**
* Evaluates the `eps3` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps3( eta ) {
	var eta3;
	var x;
	var y;

	if ( eta < -8.0 ) {
		x = eta * eta;
		y = ln( -eta ) / eta;
		return ( -30.0 + ( eta*y*( (6.0*x*y*y) - 12.0+x ) ) ) /
			( 12.0 * eta * x * x );
	}
	else if ( eta < -4.0 ) {
		return rational1( eta ) / ( eta * eta );
	}
	else if ( eta < -2.0 ) {
		return rational2( eta );
	}
	else if ( eta < 2.0 ) {
		return rational3( eta );
	}
	else if ( eta < 10.0 ) {
		x = 1.0 / eta;
		return rational4( x ) / ( eta * eta );
	}
	else if ( eta < 100.0 ) {
		x = 1.0 / eta;
		return rational5( x ) / ( eta * eta );
	}
	eta3 = eta * eta * eta;
	return -ln( eta ) / ( 12.0 * eta3 );
} // end FUNCTION eps3()


// EXPORTS //

module.exports = eps3;

},{"@stdlib/math/base/special/ln":121,"@stdlib/math/base/tools/evalrational":163}],111:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var FLOAT32_SMALLEST = require( '@stdlib/math/constants/float32-smallest-normal' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var compute = require( './compute.js' );


// MAIN //

/*
* Translated from the Fortran module by
* ----------------------------------------------------------------------
* Authors:
*  Amparo Gil    (U. Cantabria, Santander, Spain)
*                 e-mail: amparo.gil@unican.es
*  Javier Segura (U. Cantabria, Santander, Spain)
*                 e-mail: javier.segura@unican.es
*  Nico M. Temme (CWI, Amsterdam, The Netherlands)
*                 e-mail: nico.temme@cwi.nl
* ---------------------------------------------------------------------
*/

/**
* Inverts the lower gamma function, i.e. computes xr such that P(a,xr) = p.
*
* #### Method
*
* The present code uses different methods of computation depending on the values of the input values: Taylor, asymptotic expansions and high-order Newton methods.
*
* #### Notes
*
* * The claimed accuracy obtained using this inversion routine is near 1e-12.
*
* #### References
*
* * A. Gil, J. Segura and N.M. Temme, GammaCHI: a package for the inversion and computation of the gamma and chi-square distribution functions (central and noncentral). Computer Physics Commun
* * A. Gil, J. Segura and N.M. Temme. Efficient and accurate algorithms for the computation and inversion of the incomplete gamma function ratios. SIAM J Sci Comput. (2012) 34(6), A2965-A2981
*
* @param {Probability} p - probability value
* @param {number} a - scale parameter
* @param {boolean} [upper=false] - boolean indicating if the function should invert the upper tail of the incomplete gamma function instead, i.e. compute xr such that Q(a,xr)=p.
* @returns {number} function value of the inverse
*/
function gammaincinv( p, a, upper ) {
	if ( isnan( p ) || isnan( a ) ) {
		return NaN;
	}
	if ( a < FLOAT32_SMALLEST ) {
		return NaN;
	}
	if ( p > 1.0 || p < 0.0 ) {
		return NaN;
	}
	if ( upper === true ) {
		// Case: Invert upper gamma function...
		if ( p === 0.0 ) {
			return PINF;
		} else if ( p === 1.0 ) {
			return 0.0;
		}
		return compute( a, 1.0 - p, p );
	}
	// Default: Invert lower gamma function
	if ( p === 0.0 ) {
		return 0.0;
	} else if ( p === 1.0 ) {
		return PINF;
	}
	return compute( a, p, 1.0 - p );
} // end FUNCTION gammaincinv()


// EXPORTS //

module.exports = gammaincinv;

},{"./compute.js":107,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float32-smallest-normal":192,"@stdlib/math/constants/float64-pinf":212}],112:[function(require,module,exports){
'use strict';

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var ln = require( '@stdlib/math/base/special/ln' );
var FLOAT32_MAX = require( '@stdlib/math/constants/float32-max' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var stirling = require( './stirling.js' );


// MAIN //

/**
* Computes the regulated gamma function.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamstar( x ) {
	if ( x >= 3.0 ) {
		return exp( stirling(x) );
	}
	else if ( x > 0.0 ) {
		return gamma(x) / ( exp( -x + ( ( x-0.5 ) * ln(x) ) ) * SQRT_TWO_PI );
	}
	// Case: x <= 0.0
	return FLOAT32_MAX;
} // end FUNCTION gamstar()


// EXPORTS //

module.exports = gamstar;

},{"./stirling.js":116,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/gamma":89,"@stdlib/math/base/special/ln":121,"@stdlib/math/constants/float32-max":191,"@stdlib/math/constants/float64-sqrt-two-pi":215}],113:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'gammaincinv:higher_newton' );
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );


// MAIN //

/**
* Implementation of the high order Newton-like method.
*
* @private
* @param {number} x0 - initial value
* @param {number} a - scale parameter
* @param {number} m - indicator
* @param {Probability} p - probability value
* @param {Probability} q - probability value
* @param {number} lgama - logarithm of scale parameter
* @param {number} invfp - one over `fp`
* @param {boolean} pcase - boolean indicating whether p < 0.5
* @returns {number} function value of the inverse
*/
function higherNewton( x0, a, m, p, q, lgama, invfp, pcase ) {
	var dlnr;
	var xini;
	var ck0;
	var ck1;
	var ck2;
	var a2;
	var x2;
	var px;
	var qx;
	var xr;
	var t;
	var n;
	var r;
	var x;

	x = x0;
	t = 1;
	n = 1;
	a2 = a * a;
	xini = x0;
	do {
		x = x0;
		x2 = x * x;
		if ( m === 0 ) {
			dlnr = ( ( 1.0-a ) * ln( x ) ) + x + lgama;
			if ( dlnr > ln( MAX_FLOAT32 ) ) {
				debug( 'Warning: overflow problems in one or more steps of the computation. The initial approximation to the root is returned.' );
				return xini;
			}
			r = exp( dlnr );
		} else {
			r = -invfp * x;
		}
		if ( pcase ) {
			// gammainc( x, s[, regularized = true ][, upper = false ] )
			px = gammainc( x, a, true, false );
			ck0 = -r * ( px - p );
		} else {
			// gammainc( x, s[, regularized = true ][, upper = true ] )
			qx = gammainc( x, a, true, true );
			ck0 = r * ( qx - q );
		}
		r = ck0;
		if ( ( p > 1e-120 ) || ( n > 1 ) ) {
			ck1 = 0.5 * ( x - a + 1.0 ) / x;
			ck2 = ( (2*x2) - (4*x*a) + (4*x) + (2*a2) - (3*a) + 1 ) / x2;
			ck2 /= 6.0;
			x0 = x + ( r * ( 1.0 + ( r * ( ck1 + (r*ck2) ) ) ) );
		} else {
			x0 = x + r;
		}
		t = abs( ( x/x0 ) - 1.0 );
		n += 1;
		x = x0;
		if ( x < 0 ) {
			x = xini;
			n = 100;
		}
	} while ( ( ( t > 2e-14 ) && ( n < 35 ) ) );
	if ( ( t > 2e-14 ) || ( n > 99 ) ) {
		debug( 'Warning: the number of iterations in the Newton method reached the upper limit N=35. The last value obtained for the root is given as output.' );
	}
	xr = x || 0;
	return xr;
} // end FUNCTION higherNewton()


// EXPORTS //

module.exports = higherNewton;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/gammainc":98,"@stdlib/math/base/special/ln":121,"@stdlib/math/constants/float32-max":191,"debug":229}],114:[function(require,module,exports){
'use strict';

/**
* Computes the inverse of the lower incomplete gamma function
*
* @module @stdlib/math/base/special/gammaincinv
*
* @example
* var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
*
* var val = gammaincinv( 0.5, 2.0 );
* // returns ~1.678
*
* val = gammaincinv( 0.1, 10.0 );
* // returns ~6.221
*
* val = gammaincinv( 0.75, 3.0 );
* // returns ~3.92
*
* val = gammaincinv( 0.75, 3.0, true );
* // returns ~1.727
*
* val = gammaincinv( 0.75, NaN );
* // returns NaN
*
* val = gammaincinv( NaN, 3.0 );
* // returns NaN
*/

// MODULES //

var gammaincinv = require( './gammaincinv.js' );


// EXPORTS //

module.exports = gammaincinv;

},{"./gammaincinv.js":111}],115:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );


// VARIABLES //

var ONEO12 = 0.0833333333333333333333333333333;
var ONEO120 = 0.00833333333333333333333333333333;

var AK1 = [
	0,
	1.0,
	1.0,
	1.5,
	2.66666666666666666666666666667,
	5.20833333333333333333333333333,
	10.8
];

var AK2 = [
	1.0,
	1.0,
	0.333333333333333333333333333333,
	0.0277777777777777777777777777778,
	-0.00370370370370370370370370370370,
	0.000231481481481481481481481481481,
	0.0000587889476778365667254556143445
];


// FUNCTIONS //

var polyval1 = evalpoly.factory( AK1 );
var polyval2 = evalpoly.factory( AK2 );


// MAIN //

/**
* Returns the positive number satisfying eta^2/2=lambda-1-ln(lambda) with sign(lambda-1)=sign(eta);
*
* @private
* @param {number} eta - eta value
* @returns {number} value satisfying equation
*/
function lambdaeta( eta ) {
	var L2;
	var L3;
	var L4;
	var L5;
	var ak;
	var la;
	var L;
	var q;
	var r;
	var s;

	ak = new Array( 6 );
	s = eta * eta * 0.5;
	if ( eta === 0.0 ) {
		la = 0.0;
	}
	else if ( eta < -1.0 ) {
		r = exp( -1.0 - s );
		la = polyval1( r );
	}
	else if ( eta < 1.0 ) {
		r = eta;
		la = polyval2( r );
	}
	else {
		r = 11.0 + s;
		L = ln( r );
		la = r + L;
		r = 1.0 / r;
		L2 = L * L;
		L3 = L2 * L;
		L4 = L3 * L;
		L5 = L4 * L;
		ak[ 0 ] = 1.0;
		ak[ 1 ] = ( 2.0-L ) * 0.5;
		ak[ 2 ] = ( ( -9.0*L ) + 6.0 + ( 2.0*L2 ) ) / 6.0;
		ak[ 4 ] = ( 60.0 + (350.0*L2) - (300.0*L) - (125.0*L3) + (12.0*L4) );
		ak[ 4 ] /= 60.0;
		ak[ 3 ] = -( (3*L3)+ (36*L) - (22*L2) - 12 ) * ONEO12;
		ak[ 5 ] = -(-120 - (274*L4) + (900*L) -
			(1700*L2) + (1125*L3) + (20*L5));
		ak[ 5 ] *= ONEO120;
		la += ( L * r * evalpoly( ak, r ) );
	}
	r = 1.0;
	if ( ( eta > -3.5 && eta < -0.03 ) || ( eta > 0.03 && eta < 40.0 ) ) {
		r = 1.0;
		q = la;
		do {
			la = q * ( s + ln(q) ) / ( q - 1.0 );
			r = abs( ( q/la ) - 1.0 );
			q = la;
		} while ( r > 1e-8 );
	}
	return la;
} // end FUNCTION lambdaeta()


// EXPORTS //

module.exports = lambdaeta;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/tools/evalpoly":160}],116:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
var SMALLEST_FLOAT32 = require( '@stdlib/math/constants/float32-smallest-normal' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );
var chepolsum = require( './chepolsum.js' );


// Polyomial coefficients:

var A = [
	1.996379051590076518221,
	-0.17971032528832887213e-2,
	0.131292857963846713e-4,
	-0.2340875228178749e-6,
	0.72291210671127e-8,
	-0.3280997607821e-9,
	0.198750709010e-10,
	-0.15092141830e-11,
	0.1375340084e-12,
	-0.145728923e-13,
	0.17532367e-14,
	-0.2351465e-15,
	0.346551e-16,
	-0.55471e-17,
	0.9548e-18,
	-0.1748e-18,
	0.332e-19,
	-0.58e-20
];

var C = [
	0.25721014990011306473e-1,
	0.82475966166999631057e-1,
	-0.25328157302663562668e-2,
	0.60992926669463371e-3,
	-0.33543297638406e-3,
	0.250505279903e-3
];
var C6 = 0.30865217988013567769;

var D = [
	0.0833333333333333333333333333333,
	-0.00277777777777777777777777777778,
	0.000793650793650793650793650793651,
	-0.000595238095238095238095238095238
];


// FUNCTIONS //

var polyval1 = evalpoly.factory( C );
var polyval2 = evalpoly.factory( D );


// MAIN //

/**
* Computes the stirling series corresponding with asymptotic series for log(gamma(x)), that is:  1/(12x)-1/(360x**3)...; x>= 3}
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function stirling( x ) {
	var z;
	if ( x < SMALLEST_FLOAT32 ) {
		return MAX_FLOAT32;
	}
	else if ( x < 1.0 ) {
		return gammaln( x+1.0 ) - ( (x+0.5) * ln(x) ) + x - LN_SQRT_TWO_PI;
	}
	else if ( x < 2.0 ) {
		return gammaln( x ) - ( (x-0.5) * ln(x) ) + x - LN_SQRT_TWO_PI;
	}
	else if ( x < 3.0 ) {
		return gammaln( x-1.0 ) - ( (x-0.5) * ln(x) ) + x -
			LN_SQRT_TWO_PI + ln( x-1.0 );
	}
	else if ( x < 12.0 ) {
		z = ( 18.0 / ( x * x ) ) - 1.0;
		return chepolsum( 17, z, A ) / ( 12.0 * x );
	}
	z = 1.0 / ( x * x );
	if ( x < 1000.0 ) {
		return polyval1( z ) / ( C6 + z ) / x;
	}
	return polyval2( z ) / x;
} // end FUNCTION stirling()


// EXPORTS //

module.exports = stirling;

},{"./chepolsum.js":106,"@stdlib/math/base/special/gammaln":118,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float32-max":191,"@stdlib/math/constants/float32-smallest-normal":192,"@stdlib/math/constants/float64-ln-sqrt-two-pi":202}],117:[function(require,module,exports){
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
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var PI = require( '@stdlib/math/constants/float64-pi' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A1 = [
	6.73523010531292681824e-02, // 0x3FB13E001A5562A7
	7.38555086081402883957e-03, // 0x3F7E404FB68FEFE8
	1.19270763183362067845e-03, // 0x3F538A94116F3F5D
	2.20862790713908385557e-04, // 0x3F2CF2ECED10E54D
	2.52144565451257326939e-05  // 0x3EFA7074428CFA52
];
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var A2 = [
	2.05808084325167332806e-02, // 0x3F951322AC92547B
	2.89051383673415629091e-03, // 0x3F67ADD8CCB7926B
	5.10069792153511336608e-04, // 0x3F40B6C689B99C00
	1.08011567247583939954e-04, // 0x3F1C5088987DFB07
	4.48640949618915160150e-05  // 0x3F07858E90A45837
];
var RC = 1.0;
var R = [
	1.39200533467621045958e+00, // 0x3FF645A762C4AB74
	7.21935547567138069525e-01, // 0x3FE71A1893D3DCDC
	1.71933865632803078993e-01, // 0x3FC601EDCCFBDF27
	1.86459191715652901344e-02, // 0x3F9317EA742ED475
	7.77942496381893596434e-04, // 0x3F497DDACA41A95B
	7.32668430744625636189e-06  // 0x3EDEBAF7A5B38140
];
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var S = [
	2.14982415960608852501e-01,  // 0x3FCB848B36E20878
	3.25778796408930981787e-01,  // 0x3FD4D98F4F139F59
	1.46350472652464452805e-01,  // 0x3FC2BB9CBEE5F2F7
	2.66422703033638609560e-02,  // 0x3F9B481C7E939961
	1.84028451407337715652e-03,  // 0x3F5E26B67368F239
	3.19475326584100867617e-05   // 0x3F00BFECDD17E945
];
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T1 = [
	-3.27885410759859649565e-02, // 0xBFA0C9A8DF35B713
	6.10053870246291332635e-03,  // 0x3F78FCE0E370E344
	-1.40346469989232843813e-03, // 0xBF56FE8EBF2D1AF1
	3.15632070903625950361e-04   // 0x3F34AF6D6C0EBBF7
];
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T2 = [
	1.79706750811820387126e-02,  // 0x3F9266E7970AF9EC
	-3.68452016781138256760e-03, // 0xBF6E2EFFB3E914D7
	8.81081882437654011382e-04,  // 0x3F4CDF0CEF61A8E9
	-3.12754168375120860518e-04  // 0xBF347F24ECC38C38
];
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var T3 = [
	-1.03142241298341437450e-02, // 0xBF851F9FBA91EC6A
	2.25964780900612472250e-03,  // 0x3F6282D32E15C915
	-5.38595305356740546715e-04, // 0xBF41A6109C73E0EC
	3.35529192635519073543e-04   // 0x3F35FD3EE8C2D3F4
];
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var U = [
	6.32827064025093366517e-01,  // 0x3FE4401E8B005DFF
	1.45492250137234768737e+00,  // 0x3FF7475CD119BD6F
	9.77717527963372745603e-01,  // 0x3FEF497644EA8450
	2.28963728064692451092e-01,  // 0x3FCD4EAEF6010924
	1.33810918536787660377e-02   // 0x3F8B678BBF2BAB09
];
var VC = 1.0;
var V = [
	2.45597793713041134822e+00, // 0x4003A5D7C2BD619C
	2.12848976379893395361e+00, // 0x40010725A42B18F5
	7.69285150456672783825e-01, // 0x3FE89DFBE45050AF
	1.04222645593369134254e-01, // 0x3FBAAE55D6537C88
	3.21709242282423911810e-03  // 0x3F6A5ABB57D0CF61
];
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var W = [
	8.33333333333329678849e-02,  // 0x3FB555555555553B
	-2.77777777728775536470e-03, // 0xBF66C16C16B02E5C
	7.93650558643019558500e-04,  // 0x3F4A019F98CF38B6
	-5.95187557450339963135e-04, // 0xBF4380CB8C0FE741
	8.36339918996282139126e-04,  // 0x3F4B67BA4CDAD5D1
	-1.63092934096575273989e-03  // 0xBF5AB89D0B9E43E4
];
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO58 = 288230376151711744; // 2**58
var TINY = 8.470329472543003e-22;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var polyvalA1 = evalpoly( A1 );
var polyvalA2 = evalpoly( A2 );
var polyvalR = evalpoly( R );
var polyvalS = evalpoly( S );
var polyvalT1 = evalpoly( T1 );
var polyvalT2 = evalpoly( T2 );
var polyvalT3 = evalpoly( T3 );
var polyvalU = evalpoly( U );
var polyvalV = evalpoly( V );
var polyvalW = evalpoly( W );


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* #### Method
*
* 1. Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in [0,8]\\), we may reduce \\(x\\) to a number in \\([1.5,2.5]\\) by
*
*   ``` tex
*   \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*   ```
*
*   For example,
*
*   ``` tex
*   \begin{align}
*   \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*   &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*   &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*   \end{align}
*   ```
*
* 2. Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its
minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\([\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\([1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*   ``` tex
*   \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*   ```
*
*   where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3. Compute a rational approximation in the primary interval \\([2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*   ``` tex
*   \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*   ```
*
*   with accuracy
*
*   ``` tex
*   \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*   ```
*
*   The algorithms are based on the observation
*
*   ``` tex
*   \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*   ```
*
*   where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 3. For \\(x \geq 8\\),
*
*   ``` tex
*   \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*   ```
*
*   which can be expressed
*
*   ``` tex
*   \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*   ```
*
*   Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*   ``` tex
*   f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*   ```
*
*   by
*
*   ``` tex
*   w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*   ```

*   where
*
*   ``` tex
*   |w - f(z)| < 2^{-58.74}
*   ```
*
* 4. For negative \\(x\\), since
*
*   ``` tex
*   -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*   ```
*
*   where \\(\Gamma\\) is the gamma function, we have
*
*   ``` tex
*   \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*   ```
*
*   Since \\(\Gamma(-x)\\) is positive,
*
*   ``` tex
*   \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*   ```
*
*   for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*   ``` tex
*   \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*   ```
*
*   and
*
*   ``` tex
*   \begin{align}
*   \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*   &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*   \end{align}
*   ```
*
*   <!-- <note> -->
*   Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*   <!-- </note> -->
*
*
* #### Special Cases
*
* ``` tex
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
* // returns Number.POSITIVE_INFINITY
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
} // end FUNCTION gammaln()


// EXPORTS //

module.exports = gammaln;

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/sinpi":150,"@stdlib/math/base/special/trunc":153,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/constants/float64-pi":211,"@stdlib/math/constants/float64-pinf":212}],118:[function(require,module,exports){
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
* // returns Number.POSITIVE_INFINITY
*
* v = gammaln( NaN );
* // returns NaN
*/

// MODULES //

var gammaln = require( './gammaln.js' );


// EXPORTS //

module.exports = gammaln;

},{"./gammaln.js":117}],119:[function(require,module,exports){
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

},{"./ldexp.js":120}],120:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":60,"@stdlib/math/base/utils/float64-exponent":168,"@stdlib/math/base/utils/float64-from-words":170,"@stdlib/math/base/utils/float64-normalize":178,"@stdlib/math/base/utils/float64-to-words":186,"@stdlib/math/constants/float64-exponent-bias":196,"@stdlib/math/constants/float64-max-base2-exponent":205,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":204,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":208,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],121:[function(require,module,exports){
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
* // returns Number.NEGATIVE_INFINITY
*
* v = ln( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
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

},{"./ln.js":122}],122:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3fe62e42 fee00000
var LN2_LO = 1.90821492927058770002e-10; // 3dea39ef 35793c76
var TWO54 = 1.80143985094819840000e+16; // 0x43500000, 0x00000000
var P = [
	3.999999999940941908e-01,  // 3FD99999 9997FA04
	2.222219843214978396e-01,  // 3FCC71C5 1D8E78AF
	1.531383769920937332e-01  // 3FC39A09 D078C69F
];
var Q = [
	6.666666666666735130e-01, // 3FE55555 55555593
	2.857142874366239149e-01, // 3FD24924 94229359
	1.818357216161805012e-01, // 3FC74664 96CB03DE
	1.479819860511658591e-01 // 3FC2F112 DF3E5244
];

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;


// FUNCTIONS //

// Compile functions to evaluate polynomial functions based on the above coefficients...
var polyvalP = evalpoly( P );
var polyvalQ = evalpoly( Q );


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
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = ln( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
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
	var words;
	var hfsq;
	var hx;
	var k;
	var t2;
	var t1;
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

	words = toWords( x );
	hx = words[ 0 ];

	k = 0;
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54;
		// Subnormal number, scale up x:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( hx>>20 ) - BIAS;
	hx &= HIGH_SIGNIFICAND_MASK;
	i = (hx+0x95f64) & 0x100000;
	// Normalize x or x/2...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 );
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0.0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (0.33333333333333333*f) );
		if ( k === 0.0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f );
	z = s * s;
	i = hx - 0x6147a;
	w = z * z;
	j = 0x6b851 - hx;
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0.0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - ( s * ( f - R ) );
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
} // end FUNCTION ln()


// EXPORTS //

module.exports = ln;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-set-high-word":181,"@stdlib/math/base/utils/float64-to-words":186,"@stdlib/math/constants/float64-exponent-bias":196,"@stdlib/math/constants/float64-ninf":210}],123:[function(require,module,exports){
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
* // returns Number.NEGATIVE_INFINITY
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

},{"./log1p.js":124}],124:[function(require,module,exports){
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

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01;  // 0x3fda8279 0x99fcef34

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

// Polynomial coefficients:
var Lp = [
	6.666666666666735130e-01, // 0x3FE55555 0x55555593
	3.999999999940941908e-01, // 0x3FD99999 0x9997FA04
	2.857142874366239149e-01, // 0x3FD24924 0x94229359
	2.222219843214978396e-01, // 0x3FCC71C5 0x1D8E78AF
	1.818357216161805012e-01, // 0x3FC74664 0x96CB03DE
	1.531383769920937332e-01, // 0x3FC39A09 0xD078C69F
	1.479819860511658591e-01 // 0x3FC2F112 0xDF3E5244
];


// FUNCTIONS //

var polyval = evalpoly.factory( Lp );


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* #### Method
*
* 1. Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*    ``` tex
*    1+x = 2^k (1+f)
*    ```
*
*    where
*
*    ``` tex
*    \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*    ```
*
*    <!-- <note> -->
*    If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*    ``` tex
*    u = \operatorname{round}(1+x)
*    ```
*
*    and
*
*    ``` tex
*    c = (1+x) - u
*    ```
*
*    then
*
*    ``` tex
*    \ln (1+x) - \ln u \approx \frac{c}{u}
*    ```
*
*    We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*    <!-- </note> -->
*    <!-- <note> -->
*    When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*    <!-- </note> -->
*
* 2. Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*    ``` tex
*    s = \frac{f}{2+f}
*    ```
*
*    based on
*
*    ``` tex
*    \begin{align*}
*    \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*            &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*            &= 2s + sR \\
*    \end{align*}
*    ```
*
*     We use a special Reme algorithm on \\([0,0.1716]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ``` tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ``` tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*     <!-- </note> -->
*
*     Note that
*
*     ``` tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ``` tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3. Finally,
*
*    ``` tex
*    \begin{align*}
*    \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*    &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*    \end{align*}
*    ```
*
*    Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*    ``` tex
*    \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*    ```
*
*    where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* #### Special Cases
*
* - \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* - \\(\operatorname{log1p}(+\infty) = +\infty\\)
* - \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* - \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* #### Notes
*
* * According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
* * The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
* * Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*    ``` javascript
*    var u = 1.0 + x;
*    if ( u === 1.0 ) {
*      return x;
*    } else {
*      return ln(u) * (x/(u-1.0));
*    }
*    ```
*
*    See HP-15C Advanced Functions Handbook, p.193.
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
* // returns Number.NEGATIVE_INFINITY
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
} // end FUNCTION log1p()


// EXPORTS //

module.exports = log1p;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-set-high-word":181,"@stdlib/math/constants/float64-exponent-bias":196,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],125:[function(require,module,exports){
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
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


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
} // end FUNCTION max()


// EXPORTS //

module.exports = max;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],127:[function(require,module,exports){
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
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


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
} // end FUNCTION min()


// EXPORTS //

module.exports = min;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],129:[function(require,module,exports){
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

},{"./pow.js":132}],130:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-set-high-word":181,"@stdlib/math/base/utils/float64-set-low-word":183,"@stdlib/math/constants/float64-exponent-bias":196}],131:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/base/utils/float64-set-low-word":183}],132:[function(require,module,exports){
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

},{"./log2ax.js":130,"./logx.js":131,"./pow2.js":133,"./x_is_zero.js":134,"./y_is_huge.js":135,"./y_is_infinite.js":136,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/sqrt":152,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-get-low-word":176,"@stdlib/math/base/utils/float64-set-low-word":183,"@stdlib/math/base/utils/float64-to-words":186,"@stdlib/math/base/utils/uint32-to-int32":189,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],133:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":119,"@stdlib/math/base/tools/evalpoly":160,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-set-high-word":181,"@stdlib/math/base/utils/float64-set-low-word":183,"@stdlib/math/base/utils/uint32-to-int32":189,"@stdlib/math/constants/float64-exponent-bias":196,"@stdlib/math/constants/float64-ln-two":203}],134:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":60,"@stdlib/math/constants/float64-ninf":210,"@stdlib/math/constants/float64-pinf":212}],135:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":174}],136:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-pinf":212}],137:[function(require,module,exports){
'use strict';

/**
* Evaluate `bˣ - 1`.
*
* @module @stdlib/math/base/special/powm1
*
* @example
* var powm1 = require( '@stdlib/math/base/special/powm1' );
*
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
*
* y = powm1( NaN, 3.0 );
* // returns NaN
*
* y = powm1( 5.0, NaN );
* // returns NaN
*/

// MODULES //

var powm1 = require( './powm1.js' );


// EXPORTS //

module.exports = powm1;

},{"./powm1.js":138}],138:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/powm1.hpp}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var ln = require( '@stdlib/math/base/special/ln' );
var pow = require( '@stdlib/math/base/special/pow' );
var trunc = require( '@stdlib/math/base/special/trunc' );


// MAIN //

/**
* Evaluates `bˣ - 1`.
*
* @param {number} b - base
* @param {number} x - exponent
* @returns {number} function value
*
* @example
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* @example
* var y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* @example
* var y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* @example
* var y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
*
* @example
* var y = powm1( NaN, 3.0 );
* // returns NaN
*
* @example
* var y = powm1( 5.0, NaN );
* // returns NaN
*/
function powm1( b, x ) {
	var y;
	if (
		isnan( b ) ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		// Any number raised to zero (including 0) is always 1 => b^0 - 1 = 0
		return 0.0;
	}
	if ( b === 0.0 ) {
		// Zero raised to any number (except 0) is always zero => 0^x - 1 = -1
		return -1.0;
	}
	if ( b < 0.0 && x%2.0 === 0 ) {
		// If `x` is even, recognize that `(-b)**x == (b)**x`...
		b = -b;
	}
	if ( b > 0.0 ) {
		if (
			abs( x*(b-1.0) ) < 0.5 ||
			abs( x ) < 0.2
		) {
			// No good/quick approximation for ln(b)*x, so we have to evaluate...
			y = ln( b ) * x;
			if ( y < 0.5 ) {
				return expm1( y );
			}
		}
	} else if ( trunc( x ) !== x ) {
		// Exponentiation would yield a complex result...
		return NaN;
	}
	return pow( b, x ) - 1.0;
} // end FUNCTION powm1()


// EXPORTS //

module.exports = powm1;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/expm1":75,"@stdlib/math/base/special/ln":121,"@stdlib/math/base/special/pow":129,"@stdlib/math/base/special/trunc":153}],139:[function(require,module,exports){
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

},{"./round.js":140}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
'use strict';

/**
* Evaluate the signum function.
*
* @module @stdlib/math/base/special/signum
*
* @example
* var signum = require( '@stdlib/math/base/special/signum' );
*
* var sign = signum( -5.0 );
* // returns -1.0
*
* sign = signum( 5.0 );
* // returns 1.0
*
* sign = signum( -0.0 );
* // returns -0.0
*
* sign = signum( 0.0 );
* // returns 0.0
*
* sign = signum( NaN );
* // returns NaN
*/

// MODULES //

var signum = require( './signum.js' );


// EXPORTS //

module.exports = signum;

},{"./signum.js":142}],142:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the signum function.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var sign = signum( -5.0 );
* // returns -1.0
*
* @example
* var sign = signum( 5.0 );
* // returns 1.0
*
* @example
* var sign = signum( -0.0 );
* // returns -0.0
*
* @example
* var sign = signum( 0.0 );
* // returns 0.0
*
* @example
* var sign = signum( NaN );
* // returns NaN
*/
function signum( x ) {
	if ( x === 0.0 || isnan( x ) ) {
		return x; // addresses both +-0
	}
	return ( x < 0.0 ) ? -1.0 : 1.0;
} // end FUNCTION signum()


// EXPORTS //

module.exports = signum;

},{"@stdlib/math/base/assert/is-nan":10}],143:[function(require,module,exports){
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

},{"./sin.js":149}],144:[function(require,module,exports){
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

// VARIABLES //

var C1 = 4.16666666666666019037e-02;  // 0x3FA55555, 0x5555554C
var C2 = -1.38888888888741095749e-03; // 0xBF56C16C, 0x16C15177
var C3 = 2.48015872894767294178e-05;  // 0x3EFA01A0, 0x19CB1590
var C4 = -2.75573143513906633035e-07; // 0xBE927E4F, 0x809C52AD
var C5 = 2.08757232129817482790e-09;  // 0x3E21EE9E, 0xBDB4B1C4
var C6 = -1.13596475577881948265e-11; // 0xBDA8FAE9, 0xBE8838D4


// MAIN //

/**
* Computes the cosine on \\( [-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* * Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
* * If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
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
* @private
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine (in radians)
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;
	z = x * x;
	w = z * z;
	r = z * (C1 + (z * (C2 + (z*C3))));
	r += w * w * (C4 + (z * (C5 + (z*C6))));
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
} // end FUNCTION kernelCos()


// EXPORTS //

module.exports = kernelCos;

},{}],145:[function(require,module,exports){
/* eslint-disable no-plusplus */
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

// Initial value for `jk`:
var INIT_JK = [ 3, 4, 4, 6 ];

/*
* Table of constants for `2/pi` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (24*i)-th to (24*i+23)-th bit of `2/pi` after binary point. The corresponding floating value is
*
* ``` text
* ipio2[i] * 2^(-24(i+1))
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (e0 <= 16360, jk = 6), this is `686`.
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

// Double precision array, obtained by cutting `pi/2` into `24` bits chunks...
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
* Performs the computation for `kernelRemPio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Array<number>} y - output result in an array of double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/pi`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f, prec ) {
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
	for ( i = 0; j > 0; i++, j-- ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // trim off integer >= 8
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
			switch ( q0 ) {
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			default:
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
				// k = number of terms needed
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
			return compute( x, y, jz, q, q0, jk, jv, jx, f, prec );
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
	switch ( prec ) {
	case 0:
		fw = 0.0;
		for ( i = jz; i >= 0; i-- ) {
			fw += FQ[ i ];
		}
		if ( ih === 0 ) {
			y[ 0 ] = fw;
		} else {
			y[ 0 ] = -fw;
		}
		break;
	case 1:
	case 2:
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
		break;
	case 3:
		for ( i = jz; i > 0; i-- ) {
			fw = FQ[ i-1 ] + FQ[ i ];
			FQ[ i ] += FQ[ i-1 ] - fw;
			FQ[ i-1 ] = fw;
		}
		for ( i = jz; i > 1; i-- ) {
			fw = FQ[ i-1 ] + FQ[ i ];
			FQ[ i ] += FQ[ i-1 ] - fw;
			FQ[ i-1 ] = fw;
		}
		fw = 0.0;
		for ( i = jz; i >= 2; i-- ) {
			fw += FQ[ i ];
		}
		if ( ih === 0 ) {
			y[ 0 ] = FQ[ 0 ];
			y[ 1 ] = FQ[ 1 ];
			y[ 2 ] = fw;
		} else {
			y[ 0 ] = -FQ[ 0 ];
			y[ 1 ] = -FQ[ 1 ];
			y[ 2 ] = -fw;
		}
		break;
	default:
		break;
	}
	return ( n & 7 );
} // end FUNCTION compute()


// MAIN //

/**
* Return the last three digits of `N` with `y = x - N*pi/2` so that `|y| < pi/2`.
*
* ## Method
*
* The method is to compute the integer (mod 8) and fraction parts of `(2/pi)*x` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals 0 mod 8 ). Thus, the number of operations are independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Array<number>} y - output result in an array of double precision numbers
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of `N`
*/
function kernelRemPio2( x, y, e0, nx, prec ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk`:
	jk = INIT_JK[ prec ];

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
	for ( i = 0; i <= m; i++, j++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
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
	return compute( x, y, jz, Q, q0, jk, jv, jx, F, prec );
} // end FUNCTION kernelRemPio2()


// EXPORTS //

module.exports = kernelRemPio2;

},{"@stdlib/math/base/special/floor":80,"@stdlib/math/base/special/ldexp":119}],146:[function(require,module,exports){
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
* * Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
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
* @private
* @param {number} x - input value (assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @param {number} iy - indicates whether `y` is `0` (if `iy = 0`, `y` assumed to be `0`)
* @returns {number} sine (in radians)
*/
function kernelSin( x, y, iy ) {
	var r;
	var v;
	var w;
	var z;
	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( iy === 0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
} // end FUNCTION kernelSin()


// EXPORTS //

module.exports = kernelSin;

},{}],147:[function(require,module,exports){
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
var remPio2Kernel = require( './kernel_rem_pio2.js' );
var remPio2Medium = require( './rem_pio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of PI/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = PI/2 - PIO2_1:
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

// High word significand for PI and PI/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb;

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// High word for 3*PI/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c;

// High word for 5*PI/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a;

// High word for 6*PI/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c;

// High word for 7*PI/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc;

// High word for 8*PI/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb;

// High word for 9*PI/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b;

// 2^20*pi/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb;

// Arrays for storing temporary values (note that, in C, this would not be thread-safe):
var TX = new Array( 3 );
var TY = new Array( 2 );


// MAIN //

/**
* Computes `x - n*pi/2 = r`.
*
* ## Notes
*
* * Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
*
* @private
* @param {number} x - input value
* @param {Array<number>} y - remainder elements
* @returns {integer} factor of `pi/2`
*/
function remPio2( x, y ) {
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

	// Case: |x| ~<= pi/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5pi/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= pi/2 or pi
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return remPio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3pi/4
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
	// Case: |x| ~<= 9pi/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7pi/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3pi/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return remPio2Medium( x, ix, y );
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
		// Case: |x| ~= 4pi/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return remPio2Medium( x, ix, y );
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
	// Case: |x| ~< 2^20*pi/2 (medium size)
	if ( ix < MEDIUM ) {
		return remPio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // e0 = ilogb(z) - 23 => unbiased exponent minus 23
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
	n = remPio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
} // end FUNCTION remPio2()


// EXPORTS //

module.exports = remPio2;

},{"./kernel_rem_pio2.js":145,"./rem_pio2_medium.js":148,"@stdlib/math/base/utils/float64-from-words":170,"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/base/utils/float64-get-low-word":176}],148:[function(require,module,exports){
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

// 53 bits of 2/PI:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of PI/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = PI/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of PI/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = PI/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of PI/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = PI/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff;


// MAIN //

/**
* Computes `x - n*pi/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {Array<number>} y - remainder elements
* @returns {integer} factor of `pi/2`
*/
function remPio2( x, ix, y ) {
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
} // end FUNCTION remPio2()


// EXPORTS //

module.exports = remPio2;

},{"@stdlib/math/base/special/round":139,"@stdlib/math/base/utils/float64-get-high-word":174}],149:[function(require,module,exports){
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
var kernelCos = require( './kernel_cos.js' );
var kernelSin = require( './kernel_sin.js' );
var remPio2 = require( './rem_pio2.js' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff;

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000;

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000;

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ];


// MAIN //

/**
* Computes the sine of a number.
*
* #### Method
*
* * Let `S`, `C`, and `T` denote the `sin`, `cos` and `tan`, respectively, on `[-PI/4, +PI/4]`.
* * Reduce the argument `x` to `y1+y2 = x-k*pi/2` in `[-pi/4 , +pi/4]`, and let `n = k mod 4`. We have
*
*   | n   |  sin(x)  |  cos(x)  |  tan(x)  |
*   |:---:|:--------:|:--------:|:--------:|
*   |  0  |     S    |     C    |    T     |
*   |  1  |     C    |    -S    |   -1/T   |
*   |  2  |    -S    |    -C    |    T     |
*   |  3  |    -C    |     S    |   -1/T   |
*
*
* @param {number} x - input value
* @returns {number} sine (in radians)
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
	var z;

	z = 0.0;
	ix = getHighWord( x );

	// Case: |x| ~< pi/4
	ix &= ABS_MASK;
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, z, 0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = remPio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[0], Y[1], 1 );
	case 1:
		return kernelCos( Y[0], Y[1] );
	case 2:
		return -kernelSin( Y[0], Y[1], 1 );
	default:
		return -kernelCos( Y[0], Y[1] );
	}
} // end FUNCTION sin()


// EXPORTS //

module.exports = sin;

},{"./kernel_cos.js":144,"./kernel_sin.js":146,"./rem_pio2.js":147,"@stdlib/math/base/utils/float64-get-high-word":174}],150:[function(require,module,exports){
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

},{"./sinpi.js":151}],151:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/copysign":60,"@stdlib/math/base/special/cos":63,"@stdlib/math/base/special/sin":143,"@stdlib/math/constants/float64-pi":211}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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
* v = trunc( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = trunc( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var trunc = require( './trunc.js' );


// EXPORTS //

module.exports = trunc;

},{"./trunc.js":154}],154:[function(require,module,exports){
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
* var v = trunc( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = trunc( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
} // end FUNCTION trunc()


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":58,"@stdlib/math/base/special/floor":80}],155:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );
var TINY = require( '@stdlib/math/constants/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var delta;
	var a0;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;

	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus

	return a0 / f;
} // end FUNCTION continuedFractionA()

/**
* Evaluates
*      b0 +   a1
*      ---------------
*      b1 +   a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var delta;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	return f;
} // end FUNCTION continuedFractionB()


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* #### References
* * Lentz, W.J. 1976, Applied Optics, vol. 15, pp. 668-671.
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
} // end FUNCTION continuedFraction()


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float32-smallest-normal":192,"@stdlib/math/constants/float64-eps":194}],156:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );
var TINY = require( '@stdlib/math/constants/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var a0;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return a0 / f;
} // end FUNCTION continuedFractionA()

/**
* Evaluates
*      b0 +    a1
*      ---------------
*      b1 +     a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return f;
} // end FUNCTION continuedFractionB()


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* #### References
* * Lentz, W.J. 1976, Applied Optics, vol. 15, pp. 668-671.
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator();
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function* generator() {
*    var i = 0;
*    while ( true ) {
*        i++;
*        yield [ i, i ];
*    }
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
} // end FUNCTION continuedFraction()


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float32-smallest-normal":192,"@stdlib/math/constants/float64-eps":194}],157:[function(require,module,exports){
'use strict';

/**
* Calculates a continued fraction approximation.
*
* @module @stdlib/math/base/tools/continued-fraction
*
* @example
* var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
*
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' )();


// EXPORTS //

module.exports = hasGeneratorsSupport ? require( './generators.js' ) : require( './basic.js' );

},{"./basic.js":155,"./generators.js":156,"@stdlib/utils/detect-generator-support":221}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{"./evalpoly.js":158}],160:[function(require,module,exports){
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

},{"./evalpoly.js":158,"./factory.js":159,"@stdlib/utils/define-read-only-property":219}],161:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":19}],162:[function(require,module,exports){
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

},{"./evalrational.js":161}],163:[function(require,module,exports){
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

},{"./evalrational.js":161,"./factory.js":162,"@stdlib/utils/define-read-only-property":219}],164:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/
function sumSeries( generator, options ) {
	var nextTerm;
	var tolerance;
	var counter;
	var result;
	var opts;

	opts = {};

	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	// Repeatedly call function...
	do {
		nextTerm = generator();
		result += nextTerm;
	}
	while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus

	return result;
} // end FUNCTION sum_series()


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-eps":194}],165:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesGenerator( 0.9 );
* var out = sumSeries( gen );
* // returns 10
*
* function* geometricSeriesGenerator( x ) {
*     var exponent = 0;
*     while ( true ) {
*         yield Math.pow( x, exponent );
*         exponent += 1;
*     }
* }
*/
function sumSeries( generator, options ) {
	var isgenerator;
	var tolerance;
	var nextTerm;
	var counter;
	var result;
	var opts;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	isgenerator = typeof generator.next === 'function';
	if ( isgenerator === true ) {
		// Case A: Iterate over generator object created by a generator function...
		for ( nextTerm of generator ) {
			result += nextTerm;
			if (
				abs(tolerance * result) >= abs(nextTerm) ||
				--counter === 0 // eslint-disable-line no-plusplus
			) {
				break;
			}
		}
	} else {
		// Case B: Repeatedly call function...
		do {
			nextTerm = generator();
			result += nextTerm;
		}
		while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus
	}
	return result;
} // end FUNCTION sumSeries()


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-eps":194}],166:[function(require,module,exports){
'use strict';

/**
* Sum the elements of the series given by the supplied function.
*
* @module @stdlib/math/base/tools/sum-series
*
* @example
* var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
*
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' )();


// EXPORTS //

module.exports = hasGeneratorsSupport ? require( './generators.js' ) : require( './basic.js' );

},{"./basic.js":164,"./generators.js":165,"@stdlib/utils/detect-generator-support":221}],167:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":174,"@stdlib/math/constants/float64-exponent-bias":196,"@stdlib/math/constants/float64-high-word-exponent-mask":201}],168:[function(require,module,exports){
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

},{"./exponent.js":167}],169:[function(require,module,exports){
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

},{"./indices.js":171}],170:[function(require,module,exports){
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

},{"./from_words.js":169}],171:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],172:[function(require,module,exports){
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

},{"./high.js":173}],173:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],174:[function(require,module,exports){
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

},{"./get_high_word.js":172}],175:[function(require,module,exports){
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

},{"./low.js":177}],176:[function(require,module,exports){
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

},{"./get_low_word.js":175}],177:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],178:[function(require,module,exports){
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

},{"./normalize.js":179}],179:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-smallest-normal":213}],180:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":173}],181:[function(require,module,exports){
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

},{"./set_high_word.js":182}],182:[function(require,module,exports){
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

},{"./high.js":180}],183:[function(require,module,exports){
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

},{"./set_low_word.js":185}],184:[function(require,module,exports){
arguments[4][177][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":177}],185:[function(require,module,exports){
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

},{"./low.js":184}],186:[function(require,module,exports){
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

},{"./to_words.js":188}],187:[function(require,module,exports){
arguments[4][171][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":171}],188:[function(require,module,exports){
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

},{"./indices.js":187}],189:[function(require,module,exports){
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

},{"./uint32_to_int32.js":190}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
'use strict';

/**
* Maximum single-precision floating-point number.
*
* @module @stdlib/math/constants/float32-max
* @type {number}
*
* @example
* var FLOAT32_MAX = require( '@stdlib/math/constants/float32-max' );
* // returns 3.4028234663852886e+38
*/


// MAIN //

/**
* The maximum single-precision floating-point number is given by
*
* ``` tex
* 2^{127} (2 - 2^{-23})
* ```
*
* @constant
* @type {number}
* @default 3.4028234663852886e+38
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_MAX = 3.4028234663852886e+38;


// EXPORTS //

module.exports = FLOAT32_MAX;

},{}],192:[function(require,module,exports){
'use strict';

/**
* Smallest positive single-precision floating-point normal number.
*
* @module @stdlib/math/constants/float32-smallest-normal
* @type {number}
*
* @example
* var FLOAT32_SMALLEST_NORMAL = require( '@stdlib/math/constants/float32-smallest-normal' );
* // returns 1.1754943508222875e-38
*/


// MAIN //

/**
* The smallest positive single-precision floating-point normal number has the value
*
* ``` tex
* \frac{1}{2^{127-1}}
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 0 00000001 00000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 1.1754943508222875e-38
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_SMALLEST_NORMAL = 1.1754943508222875e-38;


// EXPORTS //

module.exports = FLOAT32_SMALLEST_NORMAL;


},{}],193:[function(require,module,exports){
'use strict';

/**
* Euler's number.
*
* @module @stdlib/math/constants/float64-e
* @type {number}
*
* @example
* var E = require( '@stdlib/math/constants/float64-e' );
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

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
'use strict';

/**
* The Euler-Mascheroni constant.
*
* @module @stdlib/math/constants/float64-eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/math/constants/float64-eulergamma' );
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

},{}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
'use strict';

/**
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/math/constants/float64-fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

},{}],198:[function(require,module,exports){
'use strict';

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/math/constants/float64-gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
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

},{}],199:[function(require,module,exports){
'use strict';

/**
* One half times the natural logarithm of 2.
*
* @module @stdlib/math/constants/float64-half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/math/constants/float64-half_ln2' );
* // returns 3.46573590279972654709e-01
*/


// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ``` tex
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

},{}],200:[function(require,module,exports){
'use strict';

/**
* One half times the mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/math/constants/float64-half-pi' );
* // returns 1.5707963267948966
*/


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963267948966
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var HALF_PI = 1.5707963267948966;


// EXPORTS //

module.exports = HALF_PI;

},{}],201:[function(require,module,exports){
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

},{}],202:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the square root of `2π`.
*
* @module @stdlib/math/constants/float64-ln-sqrt-two-pi
* @type {number}
*
* @example
* var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
* // returns 0.9189385332046728
*/


// MAIN //

/**
* Natural logarithm of the square root of `2π`.
*
* ``` tex
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

},{}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* The natural logarithm of the maximum double-precision floating-point number is given by
*
* ``` tex
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

},{}],207:[function(require,module,exports){
'use strict';

/**
* Maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* The maximum double-precision floating-point number is given by
*
* ``` tex
* 2^{1023} (2 - 2^{-52})
* ```
*
* @constant
* @type {number}
* @default 1.7976931348623157e+308
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX = 1.7976931348623157e+308;


// EXPORTS //

module.exports = FLOAT64_MAX;

},{}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* The natural logarithm of the smallest normalized double-precision floating-point number is given by
*
* ``` tex
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

},{}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
'use strict';

/**
* Square root of double-precision floating-point epsilon.
*
* @module @stdlib/math/constants/float64-sqrt-eps
* @type {number}
*
* @example
* var FLOAT64_SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
* // returns 0.14901161193847656e-7
*/


// MAIN //

/**
* Square root of double-precision floating-point epsilon.
*
* ``` tex
* \sqrt{\frac{1}{2^{52}}}
* ```
*
* @constant
* @type {number}
* @default 0.14901161193847656e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_SQRT_EPSILON = 0.1490116119384765625e-7;


// EXPORTS //

module.exports = FLOAT64_SQRT_EPSILON;

},{}],215:[function(require,module,exports){
'use strict';

/**
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/math/constants/float64-sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
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

},{}],216:[function(require,module,exports){
'use strict';

/**
* Square root of `2`.
*
* @module @stdlib/math/constants/float64-sqrt-two
* @type {number}
*
* @example
* var SQRT2 = require( '@stdlib/math/constants/float64-sqrt-two' );
* // returns 1.4142135623730951
*/


// MAIN //

/**
* Square root of `2`.
*
* ``` tex
* \sqrt{2}
* ```
*
* @constant
* @type {number}
* @default 1.4142135623730951
*/
var SQRT2 = 1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623e+00; // eslint-disable-line max-len


// EXPORTS //

module.exports = SQRT2;

},{}],217:[function(require,module,exports){
'use strict';

/**
* Maximum signed 32-bit integer.
*
* @module @stdlib/math/constants/int32-max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
* // returns 2147483647
*/


// MAIN //

/**
* The maximum signed 32-bit integer is given by
*
* ``` tex
* 2^{31} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 01111111111111111111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 2147483647
*/
var INT32_MAX = 2147483647|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MAX;

},{}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{"./define_read_only_property.js":218}],220:[function(require,module,exports){
'use strict';

// MODULES //

var evil = require( '@stdlib/utils/eval' );


// MAIN //

/**
* Tests for native `function*()` support.
*
* @returns {boolean} boolean indicating if an environment has native `function*()` support
*
* @example
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/
function hasGeneratorSupport() {
	var bool;
	try {
		evil( '"use strict"; (function* () {})' );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
} // end FUNCTION hasGeneratorSupport()


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"@stdlib/utils/eval":222}],221:[function(require,module,exports){
'use strict';

/**
* Tests for native `function*()` support.
*
* @module @stdlib/utils/detect-generator-support
*
* @example
* var hasGeneratorSupport = require( '@stdlib/utils/detect-generator-support' );
*
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/

// MODULES //

var hasGeneratorSupport = require( './detect_generator_support.js' );


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"./detect_generator_support.js":220}],222:[function(require,module,exports){
/* eslint-disable no-eval */
'use strict';

/**
* Alias for `eval` global.
*
* @module @stdlib/utils/eval
*
* @example
* var evil = require( '@stdlib/utils/@stdlib/utils/eval' );
*
* var v = evil( '5*4*3*2*1' );
* // returns 120
*/

// MODULES //

var evil = eval;


// EXPORTS //

module.exports = evil;

},{}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){

},{}],225:[function(require,module,exports){
arguments[4][224][0].apply(exports,arguments)
},{"dup":224}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
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

},{"base64-js":223,"ieee754":248}],228:[function(require,module,exports){
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
},{"../../is-buffer/index.js":250}],229:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require('_process'))
},{"./debug":230,"_process":226}],230:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":252}],231:[function(require,module,exports){
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

},{"./lib/is_arguments.js":232,"./lib/keys.js":233}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],234:[function(require,module,exports){
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

},{"foreach":244,"object-keys":254}],235:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],236:[function(require,module,exports){
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

},{"./helpers/isFinite":237,"./helpers/isNaN":238,"./helpers/mod":239,"./helpers/sign":240,"es-to-primitive/es5":241,"has":247,"is-callable":251}],237:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],238:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],239:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],240:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],241:[function(require,module,exports){
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

},{"./helpers/isPrimitive":242,"is-callable":251}],242:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],243:[function(require,module,exports){
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

},{}],244:[function(require,module,exports){

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


},{}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":245}],247:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":246}],248:[function(require,module,exports){
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

},{}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
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

},{}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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

},{"./isArguments":255}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
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
},{"_process":226}],257:[function(require,module,exports){
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
},{"_process":226}],258:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":259}],259:[function(require,module,exports){
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
},{"./_stream_readable":261,"./_stream_writable":263,"core-util-is":228,"inherits":249,"process-nextick-args":257}],260:[function(require,module,exports){
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
},{"./_stream_transform":262,"core-util-is":228,"inherits":249}],261:[function(require,module,exports){
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
},{"./_stream_duplex":259,"./internal/streams/BufferList":264,"./internal/streams/destroy":265,"./internal/streams/stream":266,"_process":226,"core-util-is":228,"events":243,"inherits":249,"isarray":267,"process-nextick-args":257,"safe-buffer":274,"string_decoder/":268,"util":224}],262:[function(require,module,exports){
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
},{"./_stream_duplex":259,"core-util-is":228,"inherits":249}],263:[function(require,module,exports){
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
},{"./_stream_duplex":259,"./internal/streams/destroy":265,"./internal/streams/stream":266,"_process":226,"core-util-is":228,"inherits":249,"process-nextick-args":257,"safe-buffer":274,"util-deprecate":286}],264:[function(require,module,exports){
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
},{"safe-buffer":274}],265:[function(require,module,exports){
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
},{"process-nextick-args":257}],266:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":243}],267:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],268:[function(require,module,exports){
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
},{"safe-buffer":274}],269:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":270}],270:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":259,"./lib/_stream_passthrough.js":260,"./lib/_stream_readable.js":261,"./lib/_stream_transform.js":262,"./lib/_stream_writable.js":263}],271:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":270}],272:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":263}],273:[function(require,module,exports){
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
},{"_process":226,"through":285}],274:[function(require,module,exports){
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

},{"buffer":227}],275:[function(require,module,exports){
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

},{"events":243,"inherits":249,"readable-stream/duplex.js":258,"readable-stream/passthrough.js":269,"readable-stream/readable.js":270,"readable-stream/transform.js":271,"readable-stream/writable.js":272}],276:[function(require,module,exports){
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

},{"es-abstract/es5":236,"function-bind":246}],277:[function(require,module,exports){
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

},{"./implementation":276,"./polyfill":278,"./shim":279,"define-properties":234,"function-bind":246}],278:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":276}],279:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":278,"define-properties":234}],280:[function(require,module,exports){
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
},{"./lib/default_stream":281,"./lib/results":283,"./lib/test":284,"_process":226,"defined":235,"through":285}],281:[function(require,module,exports){
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
},{"_process":226,"fs":225,"through":285}],282:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":226}],283:[function(require,module,exports){
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
},{"_process":226,"events":243,"function-bind":246,"has":247,"inherits":249,"object-inspect":253,"resumer":273,"through":285}],284:[function(require,module,exports){
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
},{"./next_tick":282,"deep-equal":231,"defined":235,"events":243,"has":247,"inherits":249,"path":256,"string.prototype.trim":277}],285:[function(require,module,exports){
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
},{"_process":226,"stream":275}],286:[function(require,module,exports){
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
},{}]},{},[54]);
