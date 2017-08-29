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

},{"@stdlib/math/constants/float64-ninf":113,"@stdlib/math/constants/float64-pinf":115}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":29}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":113}],14:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./abs.js":16}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./ceil.js":18}],20:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":82,"@stdlib/math/base/utils/float64-get-high-word":86,"@stdlib/math/base/utils/float64-to-words":98}],21:[function(require,module,exports){
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

},{"./copysign.js":20}],22:[function(require,module,exports){
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

},{"./expmulti.js":23,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":71,"@stdlib/math/constants/float64-ninf":113,"@stdlib/math/constants/float64-pinf":115}],23:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":50,"@stdlib/math/base/tools/evalpoly":75}],24:[function(require,module,exports){
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

},{"./exp.js":22}],25:[function(require,module,exports){
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

},{"./factorials.json":26,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gamma":43,"@stdlib/math/constants/float64-pinf":115}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./factorial.js":25}],28:[function(require,module,exports){
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

},{"./gamma_delta_ratio_lanczos.js":31,"@stdlib/math/base/special/abs":17,"@stdlib/math/base/special/factorial":27,"@stdlib/math/base/special/floor":29,"@stdlib/math/base/special/gamma":43}],31:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":17,"@stdlib/math/base/special/exp":24,"@stdlib/math/base/special/gamma":43,"@stdlib/math/base/special/gamma-lanczos-sum":41,"@stdlib/math/base/special/log1p":52,"@stdlib/math/base/special/pow":54,"@stdlib/math/constants/float64-e":103,"@stdlib/math/constants/float64-eps":104,"@stdlib/math/constants/float64-gamma-lanczos-g":107}],32:[function(require,module,exports){
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

},{"./gamma_delta_ratio.js":30}],33:[function(require,module,exports){
module.exports={"z": [2.4529058116232463,19.306613226452907,22.270541082164328,5.2424849699398797,6.869739478957916,5.8236472945891782,4.1963927855711418,29.186372745490985,23.723446893787575,8.5551102204408824,4.1382765531062127,9.8917835671342687,20.294589178356713,9.6012024048096194,24.827655310621243,27.268537074148298,3.4408817635270541,23.839679358717436,24.769539078156313,18.957915831663328,21.747494989979963,24.420841683366735,21.456913827655313,21.340681362725451,12.448897795591183,9.07815631262525,26.338677354709422,14.773547094188377,29.244488977955914,21.68937875751503,30,8.7875751503006008,11.460921843687375,23.955911823647295,12.971943887775552,19.422845691382765,1.8136272545090182,1.6392785571142285,1,16.633266533066134,20.352705410821645,18.841683366733466,18.725450901803608,16.168336673346694,11.809619238476955,22.503006012024048,23.432865731462925,19.480961923847698,28.605210420841683,13.378757515030061,23.258517034068138,29.128256513026052,22.851703406813627,20.585170340681362,19.655310621242485,16.110220440881765,25.350701402805612,24.943887775551104,2.3947895791583167,29.593186372745492,16.691382765531063,15.935871743486974,3.3827655310621245,18.086172344689381,4.6613226452905812,2.8597194388777556,15.064128256513026,5.591182364729459,26.629258517034071,11.519038076152306,14.889779559118237,11.170340681362726,11.867735470941884,28.837675350701403,12.739478957915832,18.260521042084168,5.3587174348697397,20.120240480961925,22.735470941883769,8.4388777555110224,3.6152304609218437,9.4268537074148302,26.164328657314631,29.825651302605213,15.993987975951905,4.7194388777555112,28.024048096192384,17.795591182364731,21.631262525050101,21.16633266533066,14.482965931863728,24.885771543086172,5.3006012024048097,7.2184368737474953,1.5811623246492985,12.681362725450903,6.4629258517034067,13.72745490981964,9.1943887775551101,5.8817635270541082,24.537074148296593,28.779559118236474,7.3346693386773554,10.763527054108216,13.320641282565131,2.5691382765531063,12.913827655310621,5.0100200400801604,14.308617234468938,19.597194388777556,25.176352705410821,12.855711422845692,9.7174348697394795,10.937875751503006,14.192384769539078,9.0200400801603209,12.216432865731463,1.4649298597194389,27.559118236472948,27.907815631262526,23.607214428857716,5.4168336673346698,4.2545090180360727,1.9879759519038076,26.571142284569138,23.781563126252507,18.14428857715431,2.2204408817635271,17.1563126252505,7.5671342685370746,22.038076152304612,6.6372745490981968,25.757515030060123,23.142284569138276,8.2645290581162332,26.977955911823649,3.6733466933867738,28.430861723446895,4.9519038076152304,16.284569138276552,18.60921843687375,26.687374749499,27.675350701402806,6.811623246492986,19.132264529058116,8.6713426853707425,18.202404809619239,15.645290581162325,22.328657314629261,3.8476953907815634,3.0340681362725452,18.783567134268537,24.246492985971944,21.92184368737475,29.651302605210422,15.006012024048097,17.040080160320642,14.831663326653308,3.963927855711423,14.947895791583168,21.805611222444892,14.018036072144289,27.849699398797597,11.635270541082164,6.5210420841683367,27.036072144288578,6.4048096192384776,8.7294589178356716,2.743486973947896,13.901803607214429,10.647294589178356,5.4749498997995998,29.302605210420843,22.967935871743489,22.90981963927856,5.765531062124249,20.759519038076153,25.583166332665332,10.298597194388778,25.408817635270541,6.3466933867735476,9.252505010020041,27.326653306613228,13.785571142284569,23.897795591182366,2.6272545090180364,17.38877755511022,22.38677354709419,24.304609218436873,26.45490981963928,2.1042084168336674,25.69939879759519,28.663326653306616,25.641282565130261,21.282565130260522,26.22244488977956,21.050100200400802,17.098196392785571,16.052104208416836,12.390781563126254,9.9498997995991996,28.082164328657317,20.991983967935873,17.330661322645291,18.318637274549101,5.9398797595190382,22.61923847695391,23.200400801603209,23.665330661322646,13.49498997995992,6.2304609218436875,10.066132264529058,11.054108216432866,23.026052104208418,20.236472945891784,5.1843687374749496,15.819639278557116,3.7895791583166334,15.587174348697395,23.549098196392787,2.2785571142284571,2.685370741482966,17.505010020040082,16.749498997995993,16.342685370741485,15.296593186372746,15.354709418837675,28.953907815631265,18.434869739478959,19.364729458917836,3.2084168336673349,24.188376753507015,24.711422845691384,15.122244488977957,10.124248496993989,27.617234468937877,8.0320641282565131,15.180360721442886,12.274549098196394,14.715430861723448,9.6593186372745503,19.887775551102205,18.37675350701403,19.945891783567134,28.547094188376754,28.488977955911825,19.248496993987978,12.100200400801604,8.6132264529058116,9.4849699398797593,4.3126252505010019,7.9158316633266539,16.923847695390783,25.873747494989981,24.130260521042086,13.61122244488978,7.6252505010020046,26.513026052104209,8.090180360721444,24.653306613226455,28.256513026052104,9.5430861723446903,23.316633266533067,7.1603206412825653,28.895791583166336,29.767535070140283,13.436873747494991,14.599198396793588,10.995991983967937,26.803607214428858,28.372745490981966,1.871743486973948,11.344689378757515,19.074148296593187,10.531062124248498,22.15430861723447,20.410821643286575,5.707414829659319,19.190380761523048,1.1743486973947896,22.444889779559119,10.182364729458918,6.9278557114228461,6.6953907815631268,11.286573146292586,2.9178356713426856,27.791583166332668,27.501002004008019,20.933867735470944,3.2665330661322645,5.649298597194389,1.6973947895791583,23.490981963927858,4.8937875751503004,1.9298597194388778,17.446893787575149,27.094188376753507,4.7775551102204412,16.865731462925851,26.396793587174351,23.084168336673347,20.527054108216433,3.7314629258517034,26.91983967935872,5.9979959919839683,11.751503006012024,29.476953907815634,11.402805611222446,18.667334669338679,7.7995991983967938,17.85370741482966,12.507014028056112,19.713426853707414,21.515030060120242,17.679358717434869,17.969939879759519,16.575150300601202,26.861723446893787,11.228456913827657,3.3246492985971945,2.0460921843687374,7.0440881763527052,6.0561122244488983,18.492985971943888,25.292585170340683,17.272545090180362,8.2064128256513023,6.753507014028056,18.028056112224451,3.0921843687374748,24.478957915831664,28.314629258517034,25.525050100200403,28.140280561122246,7.1022044088176353,22.096192384769541,12.623246492985972,1.0581162324649298,11.983967935871744,15.761523046092185,14.366733466933868,14.134268537074149,13.553106212424851,25.002004008016034,16.517034068136272,13.146292585170341,4.0220440881763526,15.529058116232466,6.5791583166332668,9.1362725450901809,8.9038076152304608,4.0801603206412826,11.112224448897797,16.981963927855713,22.793587174348698,2.162324649298597,29.709418837675351,21.224448897795593,29.012024048096194,20.178356713426854,15.877755511022045,19.829659318637276,15.470941883767535,7.3927855711422845,14.424849699398798,20.643286573146295,16.400801603206414,9.7755511022044086,29.418837675350701,13.204408817635271,25.234468937875754,27.384769539078157,11.693386773547095,12.332665330661323,1.4068136272545091,12.797595190380761,13.262525050100201,8.4969939879759515,17.737474949899799,10.240480961923849,24.072144288577157,7.8577154308617239,20.701402805611224,20.004008016032063,8.3226452905811623,7.7414829659318638,14.541082164328659,14.250501002004009,15.238476953907817,1.7555110220440882,14.657314629258517,1.5230460921843687,2.5110220440881763,29.941883767535071,20.468937875751504,10.705410821643287,25.118236472945892,29.883767535070142,26.280561122244489,11.577154308617235,18.899799599198399,29.535070140280563,6.1142284569138283,10.879759519038076,26.106212424849701,10.821643286573147,1.1162324649298596,13.8436873747495,19.539078156312627,27.733466933867735,2.8016032064128256,6.2885771543086175,10.472945891783567,27.152304609218437,1.3486973947895793,19.771543086172347,7.6833667334669338,26.745490981963929,25.466933867735474,22.212424849699399,29.360721442885772,13.669338677354711,4.4288577154308619,4.545090180360722,14.076152304609218,4.3707414829659319,21.863727454909821,10.008016032064129,17.62124248496994,27.442885771543086,17.91182364729459,5.0681362725450905,25.98997995991984,12.158316633266534,7.4509018036072145,11.925851703406813,22.561122244488978,12.565130260521043,12.042084168336673,13.030060120240481,8.1482965931863731,15.412825651302606,10.589178356713427,16.458917835671343,21.398797595190381,4.8356713426853712,13.95991983967936,20.875751503006011,4.486973947895792,16.226452905811623,25.060120240480963,21.573146292585172,29.070140280561123,23.374749498997996,5.1262525050100205,15.703406813627256,20.062124248496996,7.2765531062124253,7.9739478957915839,21.979959919839679,10.414829659318638,17.563126252505011,28.721442885771545,8.8456913827655317,6.1723446893787575,21.108216432865731,18.551102204408817,8.9619238476953917,28.198396793587175,19.016032064128257,20.817635270541082,2.9759519038076152,9.3687374749498993,24.362725450901806,5.5330661322645289,17.214428857715433,9.3106212424849701,24.595190380761522,10.356713426853707,7.5090180360721446,24.014028056112224,3.905811623246493,3.4989979959919841,9.8336673346693395,2.3366733466933871,3.5571142284569142,8.3807615230460932,25.93186372745491,3.1503006012024048,4.6032064128256511,27.965931863727455,1.2324649298597194,6.9859719438877761,22.677354709418839,1.2905811623246493,13.08817635270541,16.807615230460922,27.210420841683369,25.815631262525052,26.048096192384772],  "delta": [25.671342685370739,-28.677354709418836,-24.829659318637276,18.697394789579157,-14.128256513026052,-10.521042084168336,13.286573146292582,28.557114228456911,21.583166332665328,-22.184368737474951,23.987975951903806,12.204408817635269,-17.134268537074149,-17.975951903807616,-12.925851703406813,13.527054108216433,-29.158316633266534,18.937875751503007,24.949899799599194,-27.114228456913828,0.060120240480959097,28.917835671342687,-9.3186372745491006,17.014028056112224,-13.406813627254511,0.78156312625250379,4.7494989979959925,-20.861723446893787,27.114228456913828,8.1162324649298583,-28.797595190380761,11.8436873747495,10.280561122244485,-14.008016032064129,-18.096192384769537,-29.398797595190381,10.160320641282567,-16.172344689378757,20.501002004008015,-24.949899799599198,-8.9579158316633283,1.7434869739478955,-15.450901803607215,-14.248496993987976,25.551102204408814,-18.216432865731463,-16.052104208416836,-3.667334669338679,16.172344689378754,-28.316633266533067,-15.210420841683367,-23.867735470941884,12.084168336673343,-22.424849699398798,-25.070140280561123,-7.9959919839679365,-10.641282565130261,-10.881763527054108,-8.1162324649298618,9.4388777555110224,-13.286573146292586,17.374749498997993,-16.773547094188377,4.1482965931863731,-3.9078156312625261,-22.665330661322646,18.577154308617231,-24.709418837675351,-1.9839679358717461,-5.2304609218436866,1.9839679358717426,-9.1983967935871753,7.7555110220440895,-12.324649298597194,1.8637274549098173,6.6733466933867689,24.4689378757515,9.3186372745490971,27.835671342685366,-19.418837675350701,14.368737474949896,-0.90180360721442909,-3.5470941883767537,3.3066132264529031,11.362725450901799,7.2745490981963883,17.975951903807612,-11.723446893787575,23.146292585170336,29.639278557114224,26.032064128256508,28.196392785571142,17.254509018036067,-1.6232464929859738,-29.278557114228455,3.0661322645290596,16.773547094188373,-2.8256513026052126,0.66132264529057849,27.955911823647291,-14.96993987975952,18.336673346693388,22.064128256513023,20.741482965931858,29.519038076152299,-14.609218436873748,-0.78156312625250735,-28.436873747494989,-12.444889779559119,3.7875751503005972,-18.817635270541082,-17.855711422845694,2.825651302605209,-11.002004008016034,20.260521042084164,5.831663326653306,20.140280561122239,14.729458917835672,28.677354709418836,26.152304609218433,5.5911823647294554,2.2244488977955896,-12.204408817635272,-23.386773547094187,17.855711422845687,-5.591182364729459,-22.545090180360724,-21.943887775551104,-25.551102204408817,-27.474949899799601,11.603206412825649,29.15831663326653,27.715430861723448,-12.805611222444892,-28.196392785571142,-3.426853707414832,30,-2.3446893787575149,15.93186372745491,6.7935871743486942,-15.330661322645291,25.430861723446888,16.653306613226448,23.507014028056112,9.1983967935871718,18.817635270541082,17.615230460921843,-13.16633266533066,-0.420841683366735,-24.228456913827657,17.494989979959918,-6.0721442885771566,26.753507014028052,4.3887775551102166,19.899799599198396,5.3507014028056119,-6.7935871743486977,16.052104208416829,-2.7054108216432873,27.474949899799597,-28.557114228456914,-4.1482965931863731,-8.837675350701403,-2.2244488977955932,19.539078156312627,14.609218436873746,-0.3006012024048097,10.040080160320642,-3.7875751503006008,15.330661322645291,-26.753507014028056,4.5090180360721419,13.046092184368739,22.304609218436873,-9.4388777555110224,-16.893787575150299,-9.5591182364729477,-2.5851703406813655,29.759519038076149,-29.519038076152306,-17.494989979959918,-17.735470941883769,-26.272545090180362,29.038076152304605,-16.292585170340683,25.190380761523045,-1.3827655310621267,25.07014028056112,-6.1923847695390783,-22.304609218436873,2.9458917835671343,20.020040080160321,-1.7434869739478955,23.386773547094187,-4.6292585170340708,6.5531062124248507,21.342685370741478,14.008016032064127,7.3947895791583136,11.00200400801603,-27.835671342685369,-20.260521042084168,-11.963927855711425,2.1042084168336643,-25.671342685370742,6.4328657314629254,12.925851703406813,-12.565130260521041,-5.1102204408817649,-13.527054108216433,20.62124248496994,29.398797595190381,-25.791583166332664,-8.7174348697394812,19.178356713426851,-4.3887775551102202,4.0280561122244478,8.837675350701403,5.7114228456913807,0.90180360721442909,17.735470941883769,-6.4328657314629254,-7.2745490981963954,8.2364729458917836,-5.4709418837675372,6.1923847695390748,-14.849699398797595,-19.058116232464933,-23.266533066132265,7.995991983967933,14.849699398797597,-29.759519038076153,-10.040080160320642,19.418837675350701,-11.242484969939881,23.026052104208418,15.450901803607209,22.424849699398798,14.248496993987978,-20.981963927855713,-19.298597194388776,-23.747494989979959,24.228456913827657,15.811623246492985,12.685370741482963,-20.020040080160321,7.6352705410821642,10.521042084168336,-21.342685370741485,9.9198396793587165,14.488977955911821,7.5150300601202389,0.54108216432865675,-4.0280561122244514,-26.032064128256515,5.4709418837675372,-27.955911823647295,24.108216432865731,-23.507014028056112,8.9579158316633283,3.4268537074148284,23.747494989979955,-26.993987975951903,21.462925851703403,9.0781563126252465,20.981963927855709,-7.6352705410821642,17.134268537074149,19.77955911823647,-29.879759519038075,-8.5971943887775559,2.7054108216432837,-0.66132264529058205,10.761523046092179,-8.3567134268537089,20.38076152304609,12.444889779559119,-4.9899799599198396,14.128256513026052,-30,27.234468937875747,26.392785571142284,28.436873747494985,-23.987975951903806,-11.122244488977955,4.989979959919836,-27.715430861723448,-24.468937875751504,10.400801603206411,16.292585170340679,-11.8436873747495,-1.5030060120240485,24.348697394789575,3.9078156312625225,-15.691382765531063,-24.589178356713425,13.887775551102202,-14.729458917835672,-19.659318637274552,-6.3126252505010036,24.709418837675351,-17.615230460921843,13.767535070140276,-18.937875751503007,-9.9198396793587165,-19.899799599198396,-13.647294589178358,19.659318637274545,21.703406813627254,18.216432865731463,13.647294589178358,-13.76753507014028,4.2685370741482984,-5.7114228456913843,8.5971943887775524,-7.1543086172344701,-29.038076152304608,18.456913827655306,-13.046092184368739,6.3126252505010001,23.627254509018037,15.69138276553106,-1.8637274549098208,7.0340681362725448,2.4649298597194402,-10.160320641282567,-1.0220440881763544,-9.6793587174348694,-27.354709418837675,3.5470941883767537,9.6793587174348659,-7.7555110220440895,-14.368737474949901,11.122244488977955,2.3446893787575149,-6.5531062124248507,24.829659318637269,-7.0340681362725448,-27.595190380761522,22.785571142284567,-12.685370741482966,5.1102204408817613,1.6232464929859702,0.42084168336673144,-20.140280561122246,-20.380761523046093,-17.254509018036075,8.4769539078156271,18.096192384769537,-12.084168336673347,-6.913827655310623,-23.627254509018037,-2.9458917835671343,15.09018036072144,12.805611222444888,5.2304609218436866,-23.026052104208418,-11.482965931863728,-7.3947895791583171,-18.697394789579157,26.633266533066127,-5.9519038076152313,-15.811623246492987,0.1803607214428844,12.324649298597194,16.53306613226453,-8.4769539078156306,23.266533066132261,-11.603206412825653,6.9138276553106195,-5.831663326653306,-23.146292585170343,-22.905811623246493,-25.31062124248497,-26.513026052104209,28.797595190380761,-26.392785571142284,11.963927855711418,-11.362725450901806,-24.108216432865731,-21.22244488977956,26.272545090180358,-10.761523046092186,8.3567134268537089,-7.5150300601202424,25.91182364729459,-16.53306613226453,26.513026052104209,-0.54108216432865675,-20.501002004008015,16.412825651302605,28.316633266533067,-8.2364729458917836,4.8697394789579178,-29.639278557114228,20.861723446893784,21.823647294589179,19.058116232464926,-27.23446893787575,1.5030060120240485,-14.488977955911825,9.5591182364729477,-22.785571142284567,10.641282565130261,-1.1422845691382761,-21.703406813627254,27.354709418837672,26.993987975951903,25.791583166332664,-20.741482965931866,25.31062124248497,8.7174348697394777,-22.064128256513026,-3.3066132264529067,-19.779559118236474,-18.456913827655313,21.102204408817634,-26.633266533066134,-2.4649298597194402,-19.539078156312627,1.1422845691382761,28.076152304609217,1.0220440881763508,15.210420841683366,-3.0661322645290596,14.969939879759515,7.1543086172344701,-4.5090180360721455,-15.090180360721444,-6.673346693386776,21.943887775551097,22.184368737474948,16.893787575150299,9.7995991983967912,23.867735470941881,19.298597194388776,-28.07615230460922,29.278557114228455,13.406813627254508,-4.2685370741482984,29.879759519038075,3.667334669338679,11.723446893787575,22.905811623246493,-15.93186372745491,11.242484969939881,-15.571142284569138,-21.823647294589179,-17.374749498997996,-7.8757515030060112,21.22244488977956,13.166332665330657,10.881763527054105,-25.430861723446895,-1.2625250501002014,11.482965931863724,-16.412825651302605,-5.3507014028056119,15.571142284569135,-18.577154308617235,-10.280561122244489,-25.91182364729459,27.595190380761522,7.8757515030060077,-28.917835671342687,6.0721442885771495,-10.400801603206414,-18.336673346693388,0.3006012024048097,-26.873747494989981,-0.06012024048096265,1.3827655310621232,12.565130260521038,4.6292585170340672,-0.18036072144288795,-2.1042084168336679,-24.348697394789578,-9.7995991983967947,-9.07815631262525,-25.190380761523045,-3.1863727454909814,5.9519038076152313,-13.887775551102205,-19.178356713426854,22.665330661322642,-21.462925851703407,-20.62124248496994,-4.8697394789579178,-16.653306613226455,1.2625250501001979,-26.152304609218437,-4.7494989979959925,-21.583166332665328,22.545090180360717,3.1863727454909778,-17.014028056112224,24.589178356713425,-21.102204408817634,2.5851703406813584,26.873747494989978],  "expected": [7.8261882177501559e-29,3.8673895092763456e+21,-1.303271296337738e+20,1.6274219666751274e-21,1112366.8413225811,-1666.3030821537857,9.4608154573715607e-14,3.9713588872615691e-47,1.2692666726401231e-33,149609388820551.47,4.3243130395422851e-28,4.1456502795696194e-15,1.255048372754091e+17,-3973950867.3851047,11386253383661706,2.5416740282354452e-21,1.2305968401662643e+26,2.5539610171319339e-29,1.458861216257781e-39,-4.7960912734535361e+19,0.83207530572402555,3.1727387598593399e-46,173577672844.79019,1.3691795411852001e-25,-4971551.1257831585,0.18001323743021877,1.2983551753196061e-07,-3525792741062.4565,1.2894378216089818e-44,4.3085436763233228e-12,9.6364394815013689e+30,3.2013437946741085e-14,4.6805962992247934e-13,69693434874068656,8028343064.7426453,1.8203073475706497e+21,2.49639539280124e-08,-104179475873.42973,8.9955072386090216e-20,-1.6021733986306954e+17,37611999055.100334,0.0057839701954067423,1101568100501555.5,2143321491861.6155,1.8408435740437713e-35,2.7650886506663272e+19,2.9250179690156575e+18,33372.636980448369,7.1252064611646666e-26,-8.539075090827962e+19,4.5329471739114605e+17,1.3093124607307057e+28,3.0121600108477418e-18,1.8590400271660416e+17,3.3268007804385603e+18,278661600.23880666,47511559354217.07,70829329971293.172,130.04574831303805,3.805812573441508e-15,2947784005504.1924,1.4118086406447796e-24,15192886601.064169,4.3347036747923559e-06,11.959175216703526,4.3590396778758669e+17,4.1927124437963304e-26,1.2120390727911342e+18,599.81805600284861,62970.049511324949,0.0044204211436311746,5487543.9366172701,7.2532747167760626e-10,32909839749617308,0.008199659511692001,1.4958412232561745e-09,8.4612962334443322e-30,1.30697046366885e-13,8.7166219801133797e-44,-9410140226.6661491,1.1132199746174339e-14,6.8720462821888306,77162.923770687339,1.1755430684736147e-05,9.8852198114031735e-16,4.0344231699233854e-07,9.8580106017340155e-29,1460991571032.6812,1.4461738520322072e-35,2.8344973435384161e-46,1.624085326150502e-37,3.8558769623642238e-45,1.3489094921863303e-19,17.812265661364243,2.5591513439012721e+28,0.0003279049420518351,1.1463942856329875e-19,1065.906256819798,0.2333764376229053,1.9990593352298309e-35,1.0249986838999264e+18,1.6957191730963275e-29,1.1685847763363025e-27,1.3942580132391541e-27,1.4031850764619797e-42,-29605193.154956896,6.9845359832796294,7.5418570511888816e+23,14689758295.107342,9.8805647013213978e-06,4.8756566079822134e+21,7.0977878983340847e-05,0.0012662430380712109,-193129.62325367486,2.4078667664656015e-28,7.1723649428421949e-07,2.4058251815562795e-27,3.9702064914016204e-13,7.7189989419531544e-47,1.4774589674650193e-42,1.2656053584877189e-08,0.018568242272300493,15064.168070356209,5.2439849466821624e+19,3.275673334390978e-28,21147518.479367826,-7277439603162172,2.8631276854382819e+17,-9.255539126158953e+17,3.5718126592001566e+20,2.3261482872633624e-17,7.3990914127886887e-38,1.345736942508938e-44,2248013579187607.8,1.1556965633202983e+21,59616.188874271647,1.4639569114029471e-36,2221.7157237470165,1.3033725835279307e-17,1.994665397228994e-09,783155062127669.25,5.8663707170950936e-41,1.7796844342543172e-26,1.9484207757192488e-29,2.8865062997142732e-13,9.9828822663168924e-24,1.1788452241932153e-25,379113236467.16309,3.6455361638947918,-1.1357607283324432e+19,3.5000216150298331e-18,14703010.760213934,1.853299613026013e-42,9.4599827566791737e-07,2.5740873800690985e-32,2.5159339170190032e-07,36919027.843737602,3.1195260481251564e-22,6.3394985414004719,4.6814675402969603e-40,-1.9350343287660278e+22,24093.875894804085,998264036081.79871,167.91430536464398,1.5862814261692918e-23,5.0795080250257378e-23,1.6928094562007923,6.9338358165748018e-12,0.071675110177771173,7.2556160076318464e-21,-4.6805734891771935e+18,0.00014363686851068879,6.8518872218329896e-21,1.3589479931952621e-34,534719445687.77832,551357415.95732033,202306378426.42447,3612.1978145336207,2.8274240460836789e-41,-7.055705231489835e+24,1798437223.4896359,-2537857372.3195763,1.2132515728513714e+27,4.919956741407705e-42,8.1476581245724385e+18,2.4514827069241436e-28,47.021027470323588,5.2696903022635491e-39,138123502.84885514,9.3484997469481645e+24,0.040506137629483782,1.4308357157463586e-31,318.86802997668929,3.5154273569154946e-37,720342.31000936893,2.6471889546666783e-10,1.9547389846695489e-32,7.2262305973306276e-20,3.3234089280122625e-10,2.7238387798686587e-14,1.6633367614190151e+20,4.0557623420018384e+24,55460836092250.68,0.0023175265945440397,2.6165775185392251e+18,1.0854417852464293e-06,1.6866214705829709e-19,1355538248151842.8,5125799.2583707608,-53108155.493215635,7.1990061601855785e-25,1.471182575427649e-40,-6.1491379450540058e+17,87363510554.042969,1.031799925891399e-28,27.197086100619558,1.031302830013817e-05,2.4676505929175355e-08,7.058527240695604e-08,0.05801770411462074,9.0831390123208857e-18,5.7239474595741591,142061670.08748898,1.7507820968884372e-11,1250138.5051430659,1.8035118395970006e-08,128802979534.13698,9.0990271485015613e+23,-18001207004646936,1.4125412119679556e-11,5.8187368022160359e-15,4.7622591929133721e+24,6795774664210.1777,2.0742273813533893e-27,58608.229886288304,4.0848394163197292e-37,1.057917459064118e-18,4.2869428802092322e-32,9.2290908129548681e-19,-11516632191999.904,76422659512.315155,2.3052239651446109e+17,3.277600123600486e-36,2.3803490648168198e-23,3.4768053334615333e-20,4.2025562004347255e+24,4.8046794858445231e-11,1.4711088162649887e-13,-13124642350009.111,5.5085580496288837e-12,2.5070252991827386e-15,1.5323936321925547e-08,0.21800379957666619,323762.63630527287,6.901615193861426e+21,2.7970892345589554e-07,-4.3431334739293341e+21,1.1910271119405508e-38,7666108918163771,9.2340250313164911e-14,9.2346404019445832e-06,1.8101640776963571e-31,1.2184647743716041e+22,1.1258408662563212e-26,1.717436196649474e-14,3.5365805054142108e-34,16948381.994327772,9.1445908819063108e-24,2.9161106715884493e-26,1.0568100363301211e+26,600465982934.64709,0.073504989324176567,4.7400169744956999,1.5673548978805124e-15,1120218.647662163,3.3304368654186009e-31,2.5989216913326439e-18,57.753696202302635,1.3977334877013559e-20,-7.5215092678151405e+29,1.1532952958178574e-42,6.7762407493104141e-36,5.8470455250020405e-37,85474493228890800,1265013.6612518376,0.00044330880809526833,4.326285640476441e+26,1.0156798628032787e+27,2.388956310752834e-15,7.8566188524640518e-17,-12655.868132426036,0.1919517568183583,3.7412389745303134e-38,0.00077480923020922722,9730496253.0278358,68155750109942520,7.1960278135134286e-22,2680852.2300534588,-12866663786085.035,360030304.3512612,1.252791929740165e-38,3.17494307502296e+17,5.0675768613070248e-14,6.3816108943305624e+22,197.54798008612653,-172967970947.59625,1.8434703037036029e+18,2.874623833704785e-26,3.0466212547231796e-32,2.0652695201524741e-22,1.5863341330175123e-19,36887645.613047525,2.1307984494408897e-06,15179961.917856315,3.7452275189040169e-12,138531347.34025064,-3.1440610453558316e+21,2.8750501560338125e-29,1827905.9882345311,1.7050105729411413e-05,1.890861900126813e-25,1.5831146826841819e-18,17.200406378408676,4.3606718088797061e-10,0.00032470835276539751,50629338568.822021,7.5150430820642926,-183.27821425492786,7.9902302325588591e+19,0.0058929123272893546,7.7805211868971263e-15,47948428300.896851,6.376952590084201e+17,1.2703313146068575e-17,0.0082188835887800037,182419938.35918048,9.7766538023946945e-35,16.034849421228376,8.1133746238507794e+19,6.7889649013231818e-33,17956744003.432148,6.7528787010865724e-07,0.014016712916681561,0.25929425576223986,22178302394709.477,1203713123177.697,14968507122.989233,1.3749509988047155e-11,1.5081314784598186e-21,-15758.21705954018,32972.827481863671,1.3018049958329825e+18,669.59777361974523,1.8858648521083211e-21,2.388826638783833e-19,0.00071044636661065968,8.2575940352478595e+27,23582740623234.883,20036856228.337566,2.3346689101946973e+17,4.1546594365903901e-39,16193212.987272697,-77111546337.53299,0.70421265028773716,1.0661360514098374e-16,1.1838799754056656e-24,911823594.53012609,7.2047361166192232e-31,5922710761995219,4.6506698785736568e-09,63130342.695339993,1.7489700581485381e+26,250903134452314.59,-11706869544183906,2.02350460131205e+24,3.8790502962621041e-41,1.0326375583495402e+18,2.900081787580386e-14,729995619118.23181,4922320438581309,1.8564690412201524e+22,2.7606760593212428e-34,3121201930373.4521,3.4123455005786196e-12,8413.174032312214,1.1677371871132202e-33,409561783.37211198,3.5207435081119979e-38,4.2452997335946066,-12017788992102874,1.0383920767100715e-22,1.7255797921117177e-31,140.2698835447778,4.7912171399077162e-08,4.2646369311925788e+22,9.8389715741611378e-28,2.0578045354988257e-34,6.0233822582393796e-31,-1.7373510461047879e+24,0.024412726993808885,464725148926972.12,2.493795471708728e-15,-5556846545106699,2.3162095186964111e-13,39.585002452768606,-8259774335107.168,1.8149200208226798e-29,9.2708289555463062e-39,3.3317178353223786e-39,6.3546917079188116e+24,1.062609162841769e-28,2.2327309427080641e-09,55829437787613.18,41825.129156654308,-6266741057478576,69016352815678856,1.8016440128112907e-26,2.0790562784263785e+25,2453.6461572826242,6.4887805075356893e+19,0.020999038326916731,2.038469532699118e-40,0.21797149495428891,2.1018371618575481e-16,2043.8986056424424,5.6127522535685878e-16,1.0388870446523997e-10,7070.4629171640481,88880118006751.469,1422960033.5153742,2.3026402599775267e-32,2.8805678247028937e-26,1.6522592325262098e-26,1.3100524588541278e-12,2.1545519772800272e-30,5.8267845578619432e-26,2.70692033996121e+22,8.6091825209449779e-42,1.6894513455762598e-17,21283.766227262782,4.4665825706975408e-40,3.2690102026983901e-05,1.0418636319286672e-14,2.3344379383237822e-33,1.6412372301073267e+17,1.1598852472149327e-11,2419213083.2216868,-84927563974040336,-5840771733.033349,236513257.71229672,2.135825179451834e-33,1.1788769123049675e-19,2.2563998451545001e-17,-4.260384901235344e+20,5.7356315517357723,7.8254785139726717e-16,37205314202014096,1252.0202410242618,7.7437792341495737e-19,1.6067531164689215e+19,133317.97454666893,-2.4828771287585423e+18,2.6490798487977913e-45,3.0212522949838643e-09,-4.271468881336636e+23,4.6304068637446256e-09,254226590753.5715,9287276798.2740498,0.36786082062356873,2.7480227826476945e+19,1.1983774355429548,0.20413890463882065,2.1452426148848705e-15,2.7450978248795667e-07,1.334428108425828,326.35789949797851,4347012932225104,3374275961324.1572,905235.88347397489,1.2932720709427968e+18,18679.759723057185,2.0241215174297408e-05,-9053255.2703714184,55747382919.339676,1.9106812695874075e-24,1599191422134756,-2108455358436.0327,4238255.1351954956,17096569245.246347,0.14062321722950064,1.0401855682673782e+28,3.4458483714375712,-92789814886184.047,6.6677206007547526e-35,0.079792525123932034,944814115.89348805,3.4399459720190397e-36,5.5672883655468805e+24,0.00020723694879962125,3.0625562907811428e-43]}

},{}],34:[function(require,module,exports){
module.exports={  "z": [1,1.0581162324649298,1.1162324649298596,1.1743486973947896,1.2324649298597194,1.2905811623246493,1.3486973947895793,1.4068136272545091,1.4649298597194389,1.5230460921843687,1.5811623246492985,1.6392785571142285,1.6973947895791583,1.7555110220440882,1.8136272545090182,1.871743486973948,1.9298597194388778,1.9879759519038076,2.0460921843687374,2.1042084168336674,2.162324649298597,2.2204408817635271,2.2785571142284571,2.3366733466933871,2.3947895791583167,2.4529058116232463,2.5110220440881763,2.5691382765531063,2.6272545090180364,2.685370741482966,2.743486973947896,2.8016032064128256,2.8597194388777556,2.9178356713426856,2.9759519038076152,3.0340681362725452,3.0921843687374748,3.1503006012024048,3.2084168336673349,3.2665330661322645,3.3246492985971945,3.3827655310621245,3.4408817635270541,3.4989979959919841,3.5571142284569142,3.6152304609218437,3.6733466933867738,3.7314629258517034,3.7895791583166334,3.8476953907815634,3.905811623246493,3.963927855711423,4.0220440881763526,4.0801603206412826,4.1382765531062127,4.1963927855711418,4.2545090180360727,4.3126252505010019,4.3707414829659319,4.4288577154308619,4.486973947895792,4.545090180360722,4.6032064128256511,4.6613226452905812,4.7194388777555112,4.7775551102204412,4.8356713426853712,4.8937875751503004,4.9519038076152304,5.0100200400801604,5.0681362725450905,5.1262525050100205,5.1843687374749496,5.2424849699398797,5.3006012024048097,5.3587174348697397,5.4168336673346698,5.4749498997995998,5.5330661322645289,5.591182364729459,5.649298597194389,5.707414829659319,5.765531062124249,5.8236472945891782,5.8817635270541082,5.9398797595190382,5.9979959919839683,6.0561122244488983,6.1142284569138283,6.1723446893787575,6.2304609218436875,6.2885771543086175,6.3466933867735476,6.4048096192384776,6.4629258517034067,6.5210420841683367,6.5791583166332668,6.6372745490981968,6.6953907815631268,6.753507014028056,6.811623246492986,6.869739478957916,6.9278557114228461,6.9859719438877761,7.0440881763527052,7.1022044088176353,7.1603206412825653,7.2184368737474953,7.2765531062124253,7.3346693386773554,7.3927855711422845,7.4509018036072145,7.5090180360721446,7.5671342685370746,7.6252505010020046,7.6833667334669338,7.7414829659318638,7.7995991983967938,7.8577154308617239,7.9158316633266539,7.9739478957915839,8.0320641282565131,8.090180360721444,8.1482965931863731,8.2064128256513023,8.2645290581162332,8.3226452905811623,8.3807615230460932,8.4388777555110224,8.4969939879759515,8.5551102204408824,8.6132264529058116,8.6713426853707425,8.7294589178356716,8.7875751503006008,8.8456913827655317,8.9038076152304608,8.9619238476953917,9.0200400801603209,9.07815631262525,9.1362725450901809,9.1943887775551101,9.252505010020041,9.3106212424849701,9.3687374749498993,9.4268537074148302,9.4849699398797593,9.5430861723446903,9.6012024048096194,9.6593186372745503,9.7174348697394795,9.7755511022044086,9.8336673346693395,9.8917835671342687,9.9498997995991996,10.008016032064129,10.066132264529058,10.124248496993989,10.182364729458918,10.240480961923849,10.298597194388778,10.356713426853707,10.414829659318638,10.472945891783567,10.531062124248498,10.589178356713427,10.647294589178356,10.705410821643287,10.763527054108216,10.821643286573147,10.879759519038076,10.937875751503006,10.995991983967937,11.054108216432866,11.112224448897797,11.170340681362726,11.228456913827657,11.286573146292586,11.344689378757515,11.402805611222446,11.460921843687375,11.519038076152306,11.577154308617235,11.635270541082164,11.693386773547095,11.751503006012024,11.809619238476955,11.867735470941884,11.925851703406813,11.983967935871744,12.042084168336673,12.100200400801604,12.158316633266534,12.216432865731463,12.274549098196394,12.332665330661323,12.390781563126254,12.448897795591183,12.507014028056112,12.565130260521043,12.623246492985972,12.681362725450903,12.739478957915832,12.797595190380761,12.855711422845692,12.913827655310621,12.971943887775552,13.030060120240481,13.08817635270541,13.146292585170341,13.204408817635271,13.262525050100201,13.320641282565131,13.378757515030061,13.436873747494991,13.49498997995992,13.553106212424851,13.61122244488978,13.669338677354711,13.72745490981964,13.785571142284569,13.8436873747495,13.901803607214429,13.95991983967936,14.018036072144289,14.076152304609218,14.134268537074149,14.192384769539078,14.250501002004009,14.308617234468938,14.366733466933868,14.424849699398798,14.482965931863728,14.541082164328659,14.599198396793588,14.657314629258517,14.715430861723448,14.773547094188377,14.831663326653308,14.889779559118237,14.947895791583168,15.006012024048097,15.064128256513026,15.122244488977957,15.180360721442886,15.238476953907817,15.296593186372746,15.354709418837675,15.412825651302606,15.470941883767535,15.529058116232466,15.587174348697395,15.645290581162325,15.703406813627256,15.761523046092185,15.819639278557116,15.877755511022045,15.935871743486974,15.993987975951905,16.052104208416836,16.110220440881765,16.168336673346694,16.226452905811623,16.284569138276552,16.342685370741485,16.400801603206414,16.458917835671343,16.517034068136272,16.575150300601202,16.633266533066134,16.691382765531063,16.749498997995993,16.807615230460922,16.865731462925851,16.923847695390783,16.981963927855713,17.040080160320642,17.098196392785571,17.1563126252505,17.214428857715433,17.272545090180362,17.330661322645291,17.38877755511022,17.446893787575149,17.505010020040082,17.563126252505011,17.62124248496994,17.679358717434869,17.737474949899799,17.795591182364731,17.85370741482966,17.91182364729459,17.969939879759519,18.028056112224451,18.086172344689381,18.14428857715431,18.202404809619239,18.260521042084168,18.318637274549101,18.37675350701403,18.434869739478959,18.492985971943888,18.551102204408817,18.60921843687375,18.667334669338679,18.725450901803608,18.783567134268537,18.841683366733466,18.899799599198399,18.957915831663328,19.016032064128257,19.074148296593187,19.132264529058116,19.190380761523048,19.248496993987978,19.306613226452907,19.364729458917836,19.422845691382765,19.480961923847698,19.539078156312627,19.597194388777556,19.655310621242485,19.713426853707414,19.771543086172347,19.829659318637276,19.887775551102205,19.945891783567134,20.004008016032063,20.062124248496996,20.120240480961925,20.178356713426854,20.236472945891784,20.294589178356713,20.352705410821645,20.410821643286575,20.468937875751504,20.527054108216433,20.585170340681362,20.643286573146295,20.701402805611224,20.759519038076153,20.817635270541082,20.875751503006011,20.933867735470944,20.991983967935873,21.050100200400802,21.108216432865731,21.16633266533066,21.224448897795593,21.282565130260522,21.340681362725451,21.398797595190381,21.456913827655313,21.515030060120242,21.573146292585172,21.631262525050101,21.68937875751503,21.747494989979963,21.805611222444892,21.863727454909821,21.92184368737475,21.979959919839679,22.038076152304612,22.096192384769541,22.15430861723447,22.212424849699399,22.270541082164328,22.328657314629261,22.38677354709419,22.444889779559119,22.503006012024048,22.561122244488978,22.61923847695391,22.677354709418839,22.735470941883769,22.793587174348698,22.851703406813627,22.90981963927856,22.967935871743489,23.026052104208418,23.084168336673347,23.142284569138276,23.200400801603209,23.258517034068138,23.316633266533067,23.374749498997996,23.432865731462925,23.490981963927858,23.549098196392787,23.607214428857716,23.665330661322646,23.723446893787575,23.781563126252507,23.839679358717436,23.897795591182366,23.955911823647295,24.014028056112224,24.072144288577157,24.130260521042086,24.188376753507015,24.246492985971944,24.304609218436873,24.362725450901806,24.420841683366735,24.478957915831664,24.537074148296593,24.595190380761522,24.653306613226455,24.711422845691384,24.769539078156313,24.827655310621243,24.885771543086172,24.943887775551104,25.002004008016034,25.060120240480963,25.118236472945892,25.176352705410821,25.234468937875754,25.292585170340683,25.350701402805612,25.408817635270541,25.466933867735474,25.525050100200403,25.583166332665332,25.641282565130261,25.69939879759519,25.757515030060123,25.815631262525052,25.873747494989981,25.93186372745491,25.98997995991984,26.048096192384772,26.106212424849701,26.164328657314631,26.22244488977956,26.280561122244489,26.338677354709422,26.396793587174351,26.45490981963928,26.513026052104209,26.571142284569138,26.629258517034071,26.687374749499,26.745490981963929,26.803607214428858,26.861723446893787,26.91983967935872,26.977955911823649,27.036072144288578,27.094188376753507,27.152304609218437,27.210420841683369,27.268537074148298,27.326653306613228,27.384769539078157,27.442885771543086,27.501002004008019,27.559118236472948,27.617234468937877,27.675350701402806,27.733466933867735,27.791583166332668,27.849699398797597,27.907815631262526,27.965931863727455,28.024048096192384,28.082164328657317,28.140280561122246,28.198396793587175,28.256513026052104,28.314629258517034,28.372745490981966,28.430861723446895,28.488977955911825,28.547094188376754,28.605210420841683,28.663326653306616,28.721442885771545,28.779559118236474,28.837675350701403,28.895791583166336,28.953907815631265,29.012024048096194,29.070140280561123,29.128256513026052,29.186372745490985,29.244488977955914,29.302605210420843,29.360721442885772,29.418837675350701,29.476953907815634,29.535070140280563,29.593186372745492,29.651302605210422,29.709418837675351,29.767535070140283,29.825651302605213,29.883767535070142,29.941883767535071,30],  "delta": [13,-15,17,14,-15,19,17,-11,5,-8,-17,2,-9,-13,2,20,19,20,19,19,-14,9,19,20,19,-16,-1,12,12,-8,-15,-20,-3,-16,17,6,12,16,19,0,6,12,-19,-6,14,-12,18,7,7,-4,11,10,10,-1,-4,-3,6,-13,-13,-8,8,12,-19,-8,-9,15,-19,-14,-17,20,13,13,8,-15,-7,11,18,0,-19,7,-3,-15,-5,-12,11,-18,12,-19,-13,-4,0,-2,-2,-1,6,12,9,17,10,13,-9,8,7,-20,6,9,-14,6,-16,-2,0,11,19,3,-7,15,3,13,-11,-20,10,13,-10,13,0,18,8,-4,16,-3,19,3,2,-14,-15,11,-14,-11,-10,13,14,20,-10,-7,13,-8,-11,-20,18,-12,-6,17,-12,14,-10,19,5,11,-1,20,-6,-18,14,12,3,4,2,10,17,8,-9,7,11,-4,10,3,-5,-12,3,1,-17,-4,-18,-6,1,4,11,-6,18,19,-15,-14,3,-4,-1,-5,-20,9,-7,-5,-14,18,12,-3,-8,15,1,5,-14,-16,4,-1,-10,-7,6,1,8,9,10,20,-2,9,-17,17,-11,0,17,2,-14,0,13,-2,2,2,20,-2,-17,15,-2,4,-16,0,19,20,-20,-19,11,20,13,-6,15,7,-17,-6,-4,15,-10,-19,12,7,-3,10,17,-15,-13,20,-10,-17,-15,-9,-15,12,15,-17,3,5,2,-20,-15,7,14,1,5,-3,-6,-12,1,-15,-4,-5,-17,11,-11,-19,-15,-10,-13,0,-11,13,-3,20,-18,13,17,-8,18,-19,0,-10,0,2,-7,16,16,-6,-5,-19,-16,-14,11,15,-5,-12,-11,-9,-4,0,-17,-11,-15,0,18,19,19,6,3,11,-18,-3,-11,2,-6,-18,13,-7,-20,-4,-19,17,-14,13,6,-10,10,-15,6,0,-2,-5,2,9,-8,-9,10,5,-13,13,8,-8,-13,-5,-5,-6,5,13,11,7,-17,-5,18,-2,11,-8,-1,17,-3,0,-2,10,-8,-16,0,-4,0,15,13,-6,12,17,6,2,-5,-15,13,-12,1,18,-6,20,18,-11,15,-20,2,-5,5,11,4,-1,-12,2,-8,-20,-1,16,-11,-13,14,16,-13,-2,-11,-14,-14,-11,-11,12,-3,-1,-8,-17,17,6,-3,5,-13,3,17,9,20,-6,-3,7,-16,9,-10,-14,-4,-15,4,-2,-10,-19,4,12,9,-14,-11,14,-16,-7,-8,6,-7,-3,-3,12,0,-16,-17,20,-10,-13,12,11,-19,-10,18,-10,9,-16,0,-6,3,-9,-11,19,-2,-12],  "expected": [1.6059043836821613e-10,4182601172.1219335,1.9041922869191427e-15,6.6522078772335007e-12,9065662862.2963867,3.1105031712609836e-18,9.2041717158034299e-16,379818.92376003211,0.0032755551954492469,-503.9560806808874,1138245443266.2334,0.2311330299840528,2195.1427906945469,14800106.62597033,0.19596811005650783,2.7618938818673093e-20,4.9391663872792204e-19,2.0206399304146537e-20,3.6487754459077548e-19,3.145451759518742e-19,53394052.848723635,1.8242280901244417e-07,2.0374036537840527e-19,8.2905937185885988e-21,1.5383598507133943e-19,10593862305.571529,1.5110220440881763,5.0403843693003061e-11,4.5144761943784917e-11,84.053590076653009,-337276304.87064797,195979308162005.44,-0.22428574483435398,1163608019.214915,1.7272897116923808e-17,4.7594860735362798e-05,1.9547481273661962e-11,2.3232448033557337e-16,2.5216877179405582e-20,1,3.3870610522063398e-05,1.200221763501266e-11,5959721054174.7686,-3.515608747564051,3.5172189554320858e-14,-104333.35959222059,2.1506659327528174e-19,2.2347227866493378e-06,2.0911043720454056e-06,-0.67932371529669522,7.8736268258965275e-11,1.0116478167857496e-09,9.3540405767405475e-10,3.0801603206412826,1.0562127873578786,8.3993162931579537,1.2905431574094234e-05,-430186.52236985398,-451845.61753998324,42.048145500996213,8.6224101189522617e-08,2.1060037769005584e-12,-1027256295694.3588,37.897429003613254,-143.9646046784498,2.7444343237715109e-16,-399905030777.10956,984595.39462341066,-578708528.00095952,3.8031529875142691e-23,6.1542489144188459e-14,5.6930103927986475e-14,4.1613764144204873e-08,15731050.522293827,15.17464782020228,1.1900561734356343e-11,1.1088792452700474e-20,1,369935539952.70959,3.5336726777088504e-07,44.949798472853843,13089393.440373646,67.074008255761001,-14978.790302521389,6.5355531871038982e-12,-3610489860.0055327,3.3815758326311407e-13,-39681430752.529236,-65397.12324880666,148.72252296025616,1,22.680471162766416,23.24043678539444,5.4048096192384776,2.158574768431044e-06,1.8772002000847303e-13,7.9992939442384714e-10,4.4709582562290987e-20,4.5893776738067028e-11,7.7825873275532822e-15,-215.86491935738331,9.17454303322442e-09,1.2190428853329956e-07,63522509182.83139,1.460559646243313e-06,5.0407536973817287e-10,-546870.93457828928,1.3055029669777403e-06,-57750322.237433165,33.793366291701645,1,1.3080152851966356e-12,2.3493842069322235e-23,0.0016123195407334711,1667.1034786938806,6.3769672442460318e-18,0.0015169303703832617,2.5380993333085928e-15,3750.3013364959329,-209810469737.60278,1.4486150573024678e-11,2.006002424594631e-15,991.94739871457966,1.7864315601407137e-15,1,2.3587215332168816e-22,3.0606181581140392e-09,1110.1126282853672,1.1914365725910187e-19,267.74717016492491,6.2930661885624461e-24,0.0011379351975374654,0.011924134840448531,1039912.5015326047,-5435857.7033774741,3.7703901921176102e-13,440208.75376887649,-2925.4274616363928,-835.89317350257238,7.3415599306253761e-16,3.1438698998838419e-17,1.0470243589029943e-25,-14477.070489886737,67140.309807834856,5.6325002019544692e-16,114664.93603407241,49304.732905697994,-443943576146.80237,5.1194170793759524e-23,-132556.85913499701,45312.252932850301,1.1346124022648189e-21,-93063.669305288902,1.5487342326870738e-17,-15746.619288688127,1.1797771878655943e-24,4.048104194355194e-06,1.3562602466554358e-13,9.1823647294589179,3.1319312521250506e-26,80796.585396796407,4425246205.6964407,9.693050823869735e-18,4.8586706162052789e-15,0.00065715925753503913,4.7631527022021217e-05,0.0080637242805470469,1.8200648188353232e-12,4.1912958090229132e-22,6.2742447108364067e-10,2865860.8905117023,1.0531789558380959e-08,7.123054753796517e-14,5171.8844673738058,1.3841072187116333e-12,0.00055851370777604942,34969.036760034403,-1624316.9831436439,0.00053508004500911054,0.087697715289982422,1057124944.2321125,6413.8963089502504,-7129424329.5132141,252630.76649474655,0.085518423307626379,3.2897187200602513e-05,4.0383133619873329e-14,301510.97290660196,4.8418088561953178e-24,1.5285793946486361e-25,-10567909.569473483,9184592.954983538,0.00044148362244288565,8677.611882485844,11.274549098196394,66772.236393060899,551452290470.3031,1.2706035426939359e-11,2630439.948243496,75729.77315839201,67083692.738170497,2.4051142919337759e-24,9.2115122151510299e-16,1248.0731011864893,17201563.731488153,4.7089509506671876e-20,0.077089448478294451,1.333159151886259e-06,-50339162.120421924,-490569574.92775393,2.1639894792083998e-05,12.262525050100201,394328386.99346644,5407064.1807750762,6.3196660371642817e-08,0.0741015741015741,1.5046828889931978e-10,6.7721357853698882e-12,2.8981632518569692e-13,9.2017017322162511e-28,150.68525829213536,6.0026027869430117e-12,3169020516.5541663,2.4255960352379148e-23,3209136188.2712631,1,2.1050634110157167e-23,0.0046378710789518572,3311276305.1103373,1,1.2086865539909073e-17,166.8017397520492,0.0044595222255426727,0.004425089052338107,4.1928548435922278e-28,172.86492825330018,-26767154297.478127,1.1590398077123159e-20,177.48324705523274,1.3988298432709326e-05,4025382488.2041383,1,9.5156841949899273e-27,2.6568220612462669e-28,-2137271534563.5044,604325972752.3114,4.7602020641962162e-15,2.176793646122039e-28,6.164370104205294e-18,2765489.523298305,6.8046540052614624e-21,1.3592095739963263e-09,171215021581.22748,3111181.1851516385,30490.443654676437,5.5728208937152331e-21,9593845107.5616817,454687380504.21509,1.2050740440109696e-16,1.1410738984648813e-09,2795.21097673035,7.7556960277284322e-14,4.2062744973975584e-24,3178094658929.1963,1196886851887.0105,9.1053353154243247e-29,17315201167.39846,-1531953540845.2595,7175983300312.4502,3094098465.9641156,9738676376832.875,7.8754825419830052e-17,2.8830257380330591e-21,-1757077856308.1301,0.00017420483427395798,4.1148074113352841e-07,0.0032530437458420975,-14147276151758.502,30146879213429.699,7.5054782362053787e-10,6.6787880618699979e-20,0.057701202590194262,3.6987119407473023e-07,3670.2827963789791,7212267.6097132592,1766779273578.9724,0.056749687251222564,93761491305645.938,53327.961806571046,692889.8105217393,211132953493696.75,1.2179742852123755e-15,479510925506.4787,-10675277884753.217,209935962095409.97,79680958642.072693,19437455808479.406,1,673896485558.61401,1.0896050335644567e-18,4422.7046902669572,1.7814155846756901e-29,1077025148384539,9.6023666436004725e-19,7.7070147350872623e-25,1507966686.151474,1.995004695381725e-26,-570328894618599.62,1,153670418212.73047,1,0.002611666491822066,170749455.906221,1.9268757559941093e-23,1.8589359111838132e-23,15054534.905463165,1151817.7182802549,10541117662683768,8054487483458656,557938624769821.38,5.4996256710057517e-16,5.0223606899320341e-22,1280873.2623312008,19363412483507.832,2616734293029.3975,31264602838.169815,91874.150826671408,1,69028378945524416,3331990924198.3066,6563858832167293,1,7.2973604515248596e-27,1.8325907241990977e-28,1.7625388671124046e-28,6.9245603013782678e-09,0.00010045796314725392,3.5409945051028722e-16,5.6235995579514131e+17,6521.9733488768625,5563580497856.7949,0.0022017141186322659,26728122.153854601,1.0580683702981124e+18,2.812863938066489e-19,398948581.57780397,3.5592369285072205e+18,120534.32388488008,4.2966548637761219e+18,1.4916481120902432e-25,4966213691545141,2.3069409768583496e-19,5.3711243788416362e-09,940460607659.86597,7.3233012637592246e-15,45325804286665736,5.0672739205535204e-09,1,412.06784711707991,2355080.8468235196,0.0019900930210499366,1.9396704675974878e-13,8351183400.3884573,112354036550.2202,5.8587623886573668e-15,1.2120580405458779e-07,1624379578843790,1.4828420409763063e-19,5.1177754725079054e-12,10064411485.562513,2002816073537027.8,2826626.5981948446,2869090.2405457147,48565491.177130692,1.0888249160017238e-07,1.1955287254959998e-19,1.3733549913445334e-16,1.3027283301487295e-10,8.9527234495619011e+18,3180819.6389921401,1.3111973414698737e-27,468.13848137156072,1.1955553572652754e-16,14431847078.87566,22.316633266533067,4.4686303131135209e-26,9824.1340869457035,1,485.91273127417168,3.4254025478058307e-15,17178370026.666576,3.7277093175944499e+18,1,206234.79634224917,1,5.0516382843648354e-23,6.9068127253527755e-20,74241065.505680248,2.3712615420534882e-18,2.860622999696726e-26,2.7652206246640289e-09,0.0016259669828421863,4400553.3412378114,9.7707236125191091e+17,5.6380140565596665e-20,944624169315273.62,0.040658355740242812,5.3507161671921994e-28,89315116.100918382,2.6794650896996827e-31,4.8569614508343419e-28,93062059782812.781,3.1244211998392592e-23,2.5939847145048181e+22,0.0015312300179897279,5239602.0681350809,6.7918972358339292e-08,5.5063365264886888e-17,1.9474045630103676e-06,24.350701402805612,1699868689415202,0.0014836098473070107,36395311350.102898,6.7372585579495765e+22,24.641282565130261,5.371425638761867e-25,155030787266873.25,28374996003631212,8.0371475683568465e-22,4.7933837060868209e-25,32151867226097308,602.35902667057576,188885636799526.59,4.4261501921608141e+17,4.6332839486677562e+17,208211034242694.97,215040551905624.16,9.680116151421916e-19,14600.623290862673,25.513026052104209,53913308843.140701,7.5630688575504463e+20,7.7996067846110062e-27,1.6147401974293193e-09,15234.845104411981,5.0234356583037606e-08,61349899321062112,4.5720106208604983e-05,6.5571151861562607e-27,3.7970434397311403e-14,6.728830841807406e-32,174922435.88312632,16108.66625375683,4.3039264834522677e-11,1.5801065341475445e+20,3.4320700667304387e-14,24369156859772.359,1.2731716015641196e+18,396427.22915787,1.7558919302406263e+19,1.3732534556708817e-06,690.9973453921873,28596573567063.648,2.4228501463133891e+23,1.3303663717584067e-06,5.2919713871683331e-19,2.8599515096096017e-14,1.9314268667099284e+18,575656061989132.12,2.9301429817669743e-22,3.5797161310963374e+20,4989246324.2323999,103659992597.53703,1.1395254675978449e-09,5246274289.79673,18805.553012281969,18929.175166892761,4.1226776556689328e-19,1,5.5649211193510245e+20,6.9470572101202493e+21,2.5169847429768691e-32,47869118518497.156,2.4330956180879197e+17,3.5724074112939567e-19,1.4067353150546181e-17,1.0966947827268517e+24,54226032718970.797,4.6479874921062496e-29,56974209778135.125,1.9452429813723021e-14,9.8296994971114589e+20,1,315778653.47743434,3.4565748320169636e-05,3338092646122.5269,1272734787104559.8,7.5468275237138569e-31,808.69075224597498,24858235898496000]}

},{}],35:[function(require,module,exports){
module.exports={"z": [254,277,81,279,208,74,119,187,290,292,89,293,290,171,250,85,155,279,248,290,214,58,263,284,220,240,236,148,214,92,227,57,119,61,74,256,224,129,288,58,160,145,242,249,96,172,161,212,228,239,119,220,214,90,79,175,290,135,196,106,238,114,176,225,273,290,187,84,87,114,261,113,254,111,283,137,99,113,204,168,138,258,196,187,280,121,240,239,145,192,69,63,183,245,284,82,192,167,52,134,90,249,128,182,91,201,116,214,222,237,163,71,107,279,88,257,185,300,69,161,76,291,51,244,255,268,71,150,115,250,158,278,95,116,86,84,268,195,188,86,264,206,138,178,150,69,110,80,96,110,154,62,276,287,173,172,134,275,142,77,245,147,110,151,74,83,286,289,194,65,108,138,256,53,60,92,212,233,212,163,187,124,236,97,222,96,142,207,245,70,283,244,172,159,162,126,177,178,255,249,211,145,253,183,138,285,269,188,206,197,102,125,168,107,261,98,106,92,107,159,128,281,157,96,277,295,160,77,114,152,199,115,201,228,105,79,124,130,156,177,71,115,251,57,283,233,172,195,109,165,291,187,180,108,172,206,220,149,142,297,59,272,279,249,74,115,134,220,84,231,76,214,174,245,229,276,273,133,225,99,57,236,175,170,277,203,205,265,252,194,95,110,272,57,172,92,295,228,175,168,64,221,60,67,180,74,255,255,231,87,215,180,294,212,250,163,158,257,70,83,93,148,258,251,65,150,182,154,214,207,123,158,53,297,91,76,143,99,172,135,288,281,63,235,117,156,187,286,154,296,125,225,217,185,225,217,94,82,300,92,58,190,271,217,97,142,165,296,89,264,211,144,97,157,170,80,197,106,146,196,113,122,204,116,256,296,233,136,196,77,277,270,255,115,199,55,156,128,90,94,156,73,200,168,224,225,210,58,67,130,183,214,152,255,230,293,183,131,76,203,245,156,72,116,88,120,160,182,164,269,180,286,210,290,110,219,122,218,224,67,113,106,217,261,136,245,219,51,201,147,279,50,166,156,165,243,130,246,168,58,94,231,168,88,135,202,98,235,110,280,117,242,97,122,72,194,221,187,156,211,212,220,209,287,102,228,109,79,202,162,165,216,243,137,216,154,261,259,114,203,196,185,268,116,129,79,285,212,170,210,186,212,186,230,181,299,104,76,77,65,151,162,141,241,207,243,284,294,98,84,224,73,181,183,266,171,148,218,236,180,137,87,197,115,61,239,110,161,222,140,234,149,221,226,161,54,133,156,117,99,256,157,272,148,243,149,252,239,144,104,248,288,132,218,160,259,242,91,266,298,179,271,197,88,100,152,237,257,248,129,184,72,78,84,220,174,97,174,87,63,263,190,283,224,196,254,270,298,50,267,203,298,182,170,251,107,175,276,194,262,235,197,111,217,70,207,215,233,273,296,243,195,283,195,54,80,266,171,262,102,188,208,58,204,140,62,172,98,80,101,86,97,60,209,120,185,224,175,184,161,81,173,264,269,117,102,191,210,154,101,287,70,76,85,91,205,194,63,283,232,235,65,265,284,297,265,247,178,94,150,83,57,285,125,124,133,167,212,56,261,190,264,137,161,63,94,216,133,275,79,298,185,227,300,122,154,166,241,255,75,94,140,64,180,134,94,102,277,219,167,278,76,237,234,191,96,199,125,83,103,274,67,110,63,160,53,275,99,73,127,164,75,299,133,124,65,124,61,176,241,208,72,70,245,277,183,77,257,134,123,237,52,62,217,201,182,233,227,246,122,223,189,149,65,245,134,202,236,76,82,187,171,273,250,234,62,68,72,250,286,221,83,231,77,79,210,132,214,238,196,235,108,234,293,267,71,141,142,221,200,248,142,101,71,243,101,147,188,107,211,171,88,246,75,123,109,183,72,151,76,78,246,123,201,292,158,224,240,158,214,77,284,97,116,250,172,243,149,118,59,218,157,163,203,64,129,243,224,81,82,73,51,156,214,231,183,77,208,81,83,74,85,92,99,129,129,104,113,274,226,189,96,103,69,279,227,190,128,91,206,297,92,114,149,68,221,150,296,150,205,88,145,90,240,268,138,222,123,183,258,199,134,125,163,156,140,190,236,156,157,81,56,122,129,214,290,284,164,110,241,240,235,236,76,221,166,103,74,256,93,91,217,274,179,226,88,289,185,220,59,253,237,80,181,131,187,150,154,95,114,55,281,214,284,91,281,249,194,160,114,238,107,66,242,218,229,211,155,148,254,129,254,248,263,176,209,288,161,65,267],  "delta": [84,259,293,105,127,187,97,299,300,292,232,296,77,250,124,51,78,210,270,176,250,140,103,221,150,235,169,155,93,125,250,129,268,87,299,256,81,241,173,216,81,102,62,59,152,164,172,249,281,252,227,50,228,211,164,244,194,270,252,54,256,256,285,153,156,195,89,241,107,253,298,133,125,53,104,277,262,289,245,297,66,249,199,233,224,220,148,190,102,182,151,138,198,139,292,88,149,147,232,147,282,159,266,205,80,168,135,182,229,298,230,279,176,190,176,166,187,162,264,201,175,295,58,295,141,220,136,264,61,215,238,83,296,73,120,251,69,207,52,220,184,160,100,84,145,241,60,113,176,256,296,256,125,62,112,186,272,136,58,90,270,102,118,173,106,173,289,213,240,159,188,63,130,151,278,253,114,82,173,145,230,122,206,253,128,146,136,254,217,145,165,126,278,172,239,77,148,268,140,280,186,85,100,288,298,110,54,147,245,169,185,54,275,98,272,160,87,110,250,168,72,211,208,196,232,139,220,227,90,83,162,60,250,92,258,131,214,155,246,78,299,95,241,116,111,75,136,120,293,103,202,106,97,150,153,92,125,209,88,243,271,290,54,196,242,132,82,123,262,107,175,50,53,121,74,146,139,230,66,178,156,223,113,150,116,284,168,203,172,179,111,133,176,199,127,291,108,237,130,129,289,184,268,284,217,122,66,108,226,98,155,284,85,211,168,159,111,176,277,69,229,204,97,149,119,265,278,204,95,179,256,140,254,123,93,173,99,266,101,204,270,148,287,91,293,191,200,82,192,189,127,80,235,110,256,96,128,271,219,235,65,83,72,52,164,209,182,174,134,113,108,93,199,232,270,227,108,169,54,237,214,69,168,300,183,275,243,101,277,144,262,132,132,215,197,62,243,173,172,157,149,244,294,237,209,68,208,182,124,131,208,299,179,231,111,133,237,221,220,69,165,225,67,67,182,115,171,82,73,80,293,239,117,231,154,169,63,204,173,277,284,280,126,248,106,162,178,107,228,297,214,118,167,50,162,293,126,103,112,252,172,152,104,185,231,121,186,239,133,251,265,53,272,198,71,282,279,296,275,288,284,52,245,56,197,213,132,77,81,294,183,216,227,67,101,158,52,67,136,128,299,117,265,139,237,262,104,292,228,296,240,98,138,99,258,289,242,266,164,133,260,189,80,103,173,152,240,139,243,296,262,259,142,62,294,261,268,68,58,204,234,204,216,288,116,280,79,128,268,108,252,189,286,176,217,88,294,209,94,68,174,247,166,271,212,276,51,224,196,76,298,107,133,223,291,106,281,269,158,168,191,260,87,210,299,210,160,57,70,183,246,234,97,115,163,165,219,94,97,74,131,92,56,258,111,85,89,126,58,152,246,161,54,121,288,93,73,118,100,239,251,197,174,198,192,96,276,56,116,246,200,189,74,282,149,60,196,153,82,202,63,262,163,171,66,105,211,294,288,234,155,222,222,108,299,159,236,134,141,298,231,260,149,263,93,287,138,146,150,230,259,288,66,216,94,143,92,78,88,149,149,57,162,74,279,167,238,233,234,214,104,62,64,155,253,129,271,152,100,56,66,219,70,132,142,250,94,73,64,122,229,173,277,151,66,144,262,141,85,155,268,300,183,149,133,60,264,95,133,158,132,113,83,72,288,120,195,138,129,244,142,98,52,148,277,297,227,210,205,282,271,54,230,198,64,210,124,166,287,188,176,83,228,282,276,209,135,216,215,117,211,157,251,133,228,214,110,280,201,146,245,174,272,149,119,110,50,149,100,243,202,245,175,146,258,82,112,176,82,295,232,106,221,162,218,278,260,103,288,270,227,293,156,260,73,219,74,225,104,245,70,151,102,71,180,295,91,280,126,195,261,147,51,52,99,148,99,259,245,69,123,119,206,281,106,121,71,132,63,203,186,137,182,300,264,276,82,204,258,297,212,238,240,217,185,233,245,172,199,292,69,58,143,69,246,169,160,120,179,142,79,200,54,167,76,135,71,101,179,169,58,264,288,264,296,266,256,280,200,257,184,279,92,54,264,261,247,233,234,197,191,281,201,75,205,234,123,129,194,210,63,295,248,210,131,294,176,281,192,162,292,80,297,107,199,193,241,153,64,177,93,182,184,221,168,133,144,84,233,132,215,65,277,76,74,148,217,174,166,103,152,77,172,78,140,122,132,115,186,67,54,83,275,236,201,289,279,110,276,161,191,138,59,191,137,243,208,274,266,134,216,221,150,54,51,147,300,100,207,280],  "expected": [3.9512336318324206e-208,0,0,4.080394337501373e-265,3.3582978799520646e-309,0,1.0097942000546689e-215,0,0,0,0,0,2.2636492460135369e-194,0,1.4826972929339595e-309,1.231843060719651e-104,7.4309353271604595e-179,0,0,0,0,4.0495169031073889e-292,1.0433202312681724e-257,0,0,0,0,0,4.2156696806571514e-225,1.3492445214760675e-272,0,1.72467278103055e-266,0,4.8174884414118783e-175,0,0,9.7505016219175678e-197,0,0,0,7.2438183701744624e-187,6.546626583681227e-234,1.1629649806536292e-151,7.0728541728964317e-145,0,0,0,0,0,0,0,4.2072523213067755e-120,0,0,0,0,0,0,0,3.669854156404638e-115,0,0,0,0,0,0,7.5906472176368781e-211,0,3.5360598757093904e-229,0,0,5.729218001404629e-299,7.8933874682920561e-313,7.9237891254315028e-114,4.4262968900998579e-263,0,0,0,0,0,7.7118036156542548e-148,0,0,0,0,0,0,0,6.546626583681227e-234,0,2.4703282292062327e-323,3.9903200820834049e-290,0,0,0,1.3579371442477711e-184,0,0,0,0,0,0,0,0,2.0471694653231029e-169,0,9.0480165445724252e-305,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.296023933043237e-110,0,0,0,2.1390536730520491e-289,0,2.2620488991606007e-132,0,0,1.9389049070091413e-208,0,1.0850889795423531e-159,1.0363030219859975e-258,0,8.8093255621111303e-172,0,8.4597809043698369e-122,0,0,0,1.6823078073590548e-227,3.5040024120468866e-197,0,0,3.3821423789852355e-129,2.520074069254891e-240,0,0,0,0,1.5775458266030439e-316,8.6056246383494849e-156,1.9982706117172641e-264,0,0,0,4.8136050818046102e-130,2.0941351206594151e-187,0,2.262506281450496e-234,2.2348093186893495e-262,0,4.0051595489869317e-222,0,0,0,0,0,0,6.3562274031767187e-141,0,1.2408414352911193e-314,0,0,3.0014865285057091e-277,2.0126600308194751e-200,0,0,0,3.5243648496638128e-276,0,0,1.4294061423354231e-314,9.8813129168249309e-324,2.4577861059911039e-315,0,0,7.9307212903048324e-310,0,1.2590439805681531e-313,0,0,0,5.8794918258700547e-171,0,0,0,0,0,1.6453608516577556e-193,1.3391729288437644e-248,0,0,6.5801655552891844e-279,4.1937085433014805e-134,0,0,0,0,2.4155718289251226e-118,0,8.6442766267151484e-215,0,0,3.0462155690308377e-189,8.5288894436182516e-238,0,0,7.639966944155686e-160,0,0,0,0,0,0,0,3.4324560488714859e-198,3.8055371291393036e-190,0,3.9585855735310513e-130,0,9.7700680862964377e-225,0,2.2472289653823009e-281,0,0,0,1.5060442229444553e-182,0,5.0475266538234802e-210,0,3.3309045363623813e-237,3.2257318827252506e-281,5.6627877056182806e-183,1.4821969375237396e-323,6.4338550843172094e-289,0,9.6043362222823177e-241,0,1.4961177087327929e-252,4.0030744960366161e-229,0,0,2.3742245788458017e-221,1.4790063172382083e-306,0,5.6269659339116919e-200,0,0,0,6.9180871529150717e-135,0,0,3.0001539143940827e-297,3.2059537743832919e-184,1.7451091338357067e-301,0,5.9256252511420061e-263,0,1.4637334741716402e-119,1.2974601454560261e-122,5.6034056261057931e-301,5.294718201346388e-180,0,0,0,9.2797078258328422e-160,0,0,0,2.5713243518959895e-267,0,2.6593689226924131e-293,0,0,0,0,0,3.9999971190147589e-241,6.0858864562218028e-298,0,0,3.6372026973741116e-301,0,4.2770030195627619e-275,0,2.5073167912274619e-309,3.9003106580819669e-305,0,0,0,0,0,1.7246487610648221e-258,6.2098058389131618e-163,2.5244723385923171e-269,0,1.0872040180306256e-208,0,0,2.2911792783092789e-215,0,0,0,1.2787511113481871e-258,0,0,5.5100588271430214e-143,0,0,1.1553836061617586e-241,0,1.047718035509604e-247,0,0,0,4.4583841116979901e-230,0,0,0,0,1.3723562389310971e-314,1.2267704678616675e-198,0,2.7493605546629373e-226,0,2.5271315140560785e-237,0,0,0,0,3.0473737547899132e-223,0,0,0,9.0282756177709266e-207,0,0,1.8561186217194477e-288,2.1841123633095352e-194,0,5.0473815989171847e-262,0,4.7670346696414233e-233,2.2918497491352768e-280,0,0,0,4.1039734790712269e-127,1.0374949018810708e-196,1.1199220539957826e-179,1.0924221477225055e-124,0,0,0,0,1.6553448562846031e-292,1.4977313581509589e-283,5.104890162206359e-262,3.0656263709647977e-212,0,0,0,0,1.9823551212679935e-259,0,2.0409169528386778e-121,0,0,8.3615999143954308e-152,0,0,0,0,0,2.1399041989270931e-229,0,8.2557355719870608e-311,0,0,0,0,0,6.8033098496675608e-120,0,0,0,0,0,0,0,0,0,1.092090079771318e-164,0,0,5.6232106856199386e-260,1.2987597509938577e-299,0,0,0,0,6.6131904632499266e-273,0,0,0,0,1.7735960352818802e-164,0,0,1.2294085571071697e-135,4.4199605575941394e-146,0,2.4589981754248341e-258,0,5.2787545637519845e-193,1.5942281586126989e-168,9.0659908763891908e-200,0,0,2.0778636630832333e-284,0,0,0,3.6323602728486004e-138,0,0,0,0,0,1.6844659995977871e-308,0,2.7443711337248536e-241,0,0,2.5929421392358534e-214,0,0,0,4.045458785672367e-238,0,1.7617393820038534e-113,0,0,1.4845496532701467e-287,3.4062973257727158e-255,2.5101696334647568e-263,0,0,0,8.3282878928289775e-244,0,0,7.2474782252180534e-293,0,0,6.0858864562218028e-298,0,0,2.2205552731480486e-129,0,0,3.1553383701031889e-144,0,0,0,0,0,0,5.7499690054759804e-125,0,1.463655517557848e-140,0,0,3.2563400908235594e-295,2.3645736640570895e-159,1.1927164860197525e-193,0,0,0,0,5.6290537340542008e-150,2.2559160665999995e-245,0,1.8221443303786775e-128,7.6457342504914219e-166,1.7254036126186928e-306,1.1338571965824592e-310,0,2.4189158542779157e-279,0,2.225998595558751e-314,0,0,2.3692049178927632e-263,0,0,0,0,3.1952403990495587e-237,0,1.2968416415029642e-242,0,0,0,0,0,1.2678752368739545e-279,0,0,5.8944114331431966e-181,1.9936564214540599e-254,0,0,0,0,0,0,0,0,0,4.7046159162288445e-145,0,0,0,7.1424817939038098e-164,3.5476880660023721e-141,0,0,0,0,0,4.2045762164201964e-239,0,5.3561228661661729e-172,6.5511676303540115e-301,0,4.5918383848167681e-247,0,0,0,0,0,2.2521388401796377e-174,0,0,3.2063812172383444e-208,1.0470028025096869e-144,0,0,0,0,0,0,2.9166454198403687e-125,0,0,8.8728574706395433e-164,0,1.5393224749613535e-271,4.6584559712880269e-305,0,0,8.2698109715911338e-265,0,0,0,0,0,0,1.3506419695934354e-207,0,0,0,0,1.3038045586203016e-140,3.2123752121665784e-172,0,0,0,2.2595093249068673e-203,1.9911277182789804e-246,0,0,0,1.0789254232056431e-220,2.0004553931763513e-206,8.6006024732879992e-148,0,1.0810302979509296e-218,3.0031865193572449e-140,0,1.083687639683192e-266,1.1690040330865148e-210,8.0060213739137484e-223,1.284570679187241e-322,4.9594116953733919e-110,0,0,0,6.8253942571688804e-126,7.0778231078243349e-286,0,2.9069146740775513e-203,3.0683616401447205e-170,2.4517543632153383e-298,4.5625213425156203e-239,0,0,0,0,0,0,2.0128289555209679e-231,0,5.7775682942942888e-136,1.0891824534426409e-292,0,0,0,5.5114663554509004e-186,0,1.3350213001845082e-310,9.3037018095829705e-123,0,0,4.8994022827282122e-204,0,4.4353733642941663e-148,0,0,0,3.5372505249995198e-148,5.6374677239500247e-215,0,0,0,0,0,0,0,1.1724847520878883e-261,0,0,0,2.8411739029746724e-319,0,0,0,0,0,0,6.7334005562005232e-206,0,0,0,0,0,0,0,1.3070211722778067e-134,0,6.6672308035960191e-201,0,2.2505290751686991e-219,2.3376871264346819e-156,7.8447528276437454e-222,0,0,1.5676087531204273e-112,0,4.369033553480686e-186,0,0,0,0,0,0,6.199428003875463e-221,1.5177599838458704e-120,1.0557753206170391e-160,0,0,1.1186053524307096e-295,0,0,2.6510804991387292e-201,1.8625637747016933e-138,1.5204815583386334e-155,0,6.5340754575250847e-157,9.1991358228478212e-311,2.373198699381255e-299,0,6.638519513890761e-228,4.1136018035350528e-163,8.3003862464544275e-160,1.4358927548703824e-260,0,0,0,0,5.6449829950076704e-145,0,0,0,8.7589092744535332e-211,0,0,0,0,0,1.1602192230377729e-305,5.765574406978225e-126,0,4.4357098168357296e-239,0,0,0,9.2031668408586154e-239,1.9012856225299142e-203,1.2394984941539786e-175,0,2.2267253290235183e-262,0,5.7504663114240168e-315,2.1289306942134422e-278,0,0,1.6559438470957861e-201,1.9021415967831296e-111,2.9738137075288162e-313,0,0,0,0,0,0,0,8.5780854306622132e-109,0,0,8.4708614823085101e-141,0,5.8002778869421882e-281,0,0,0,0,2.7525631191280139e-170,0,0,0,0,8.4442337373087346e-290,0,0,5.8261489602923178e-264,0,0,0,0,0,0,6.9896969491599108e-271,0,0,0,0,0,0,1.2584511577213748e-316,7.4446847148441574e-296,2.5797797900392621e-250,1.9535502217396828e-118,0,2.2063366125445439e-209,0,0,0,0,0,0,1.3168951590846967e-164,3.267759399367149e-233,0,1.3833774336691234e-202,0,0,1.7634053942073793e-225,0,0,0,0,0,4.903099470984567e-250,0,0,0,0,0,0,8.5444694155371791e-182,0,6.2390099859254179e-167,0,9.9775573177610295e-254,0,3.2123752121665784e-172,0,2.9145236771223154e-222,6.3106767402063778e-144,0,0,3.943249231796948e-208,0,2.7568193750495203e-280,0,0,9.3872472709836843e-323,8.9397507666264832e-125,1.3944535676084496e-104,1.9564881976212935e-221,0,1.4041807686137446e-234,0,0,4.469878813452123e-141,1.8408881472697212e-262,5.0108454811451053e-296,0,0,1.7411177357599584e-269,5.4632645915144782e-283,5.6597271271113292e-172,0,5.1358520526898515e-144,0,0,0,0,0,0,0,1.0364677738002397e-201,0,0,0,0,0,0,0,0,0,0,0,0,0,3.2260179495935005e-140,2.296023933043237e-110,0,7.5863532166232353e-166,0,0,0,1.4617048050917609e-291,0,8.4929569386384802e-309,3.4088256947097225e-162,0,1.6799378100935145e-112,0,2.9080228941585275e-169,5.5981117518107065e-309,1.5412053979514357e-152,1.9582949849764668e-223,0,0,3.17962588008989e-136,0,0,0,0,0,0,0,0,0,0,0,8.207690217291931e-203,7.9832515971995323e-122,0,0,0,0,0,0,0,0,0,8.204370601798157e-184,0,0,7.1909287144121691e-302,1.2169673627848465e-292,0,0,1.9821845101991998e-149,0,0,0,5.5004047955285446e-307,0,0,0,0,0,0,4.719023285062222e-158,0,7.2383209600562229e-242,0,0,0,0,3.9099599098990275e-138,0,5.4615219120767956e-229,0,0,0,0,1.5896515110011311e-314,1.1363509854348671e-321,3.8109802158273775e-173,0,2.2222726330454381e-289,0,2.1261218567495218e-156,0,4.7449429288088012e-178,1.2344354943040832e-179,0,0,0,0,3.0966310962913391e-209,0,1.9109605160587989e-188,0,3.5320232542203036e-183,9.6836866584884323e-322,3.3905637991320659e-292,8.0817197243586341e-308,2.1873050436793313e-267,0,1.1106204476603061e-145,1.7426876756372562e-103,8.8764874385174079e-209,0,0,0,0,0,8.1276057343738359e-264,0,0,0,8.1488010437438061e-309,5.476012226981668e-117,0,0,0,0,0,0,0,0,0,0,1.2736583604165117e-133,3.9507661429135997e-118,0,0,1.2309353900671782e-232,0,0]}

},{}],36:[function(require,module,exports){
module.exports={  "z": [69.050100200400806,30.759519038076153,52.979959919839679,14.094188376753507,39.885771543086172,9.5310621242484963,98.214428857715433,8.539078156312625,67.661322645290582,96.428857715430865,16.474949899799597,79.565130260521045,47.62324649298597,63.891783567134269,23.418837675350701,42.06813627254509,51.591182364729463,69.843687374749507,11.316633266533067,73.216432865731463,2.1903807615230462,65.478957915831671,17.070140280561123,77.779559118236477,57.741482965931866,30.164328657314631,48.615230460921843,15.681362725450903,85.913827655310627,33.338677354709418,27.783567134268537,13.498997995991985,18.062124248496993,65.082164328657313,97.420841683366731,99.603206412825656,15.284569138276554,86.112224448897791,64.486973947895791,79.763527054108224,31.553106212424851,62.503006012024052,58.53507014028056,87.699398797595194,19.649298597194388,8.1422845691382761,41.671342685370739,81.152304609218433,41.869739478957918,33.93386773547094,26.791583166332664,73.811623246492985,64.090180360721448,29.172344689378757,61.709418837675351,85.318637274549104,32.148296593186373,62.106212424849701,67.859719438877761,37.306613226452903,65.280561122244492,90.873747494989985,59.923847695390783,35.719438877755515,8.7374749498997986,38.298597194388776,85.715430861723448,2.3887775551102202,25.799599198396795,31.751503006012026,30.362725450901806,86.31062124248497,1.9919839679358717,94.643286573146298,39.290581162324649,2.785571142284569,14.68937875751503,82.739478957915836,34.925851703406813,88.492985971943895,98.412825651302612,40.679358717434873,26.98997995991984,86.707414829659314,13.895791583166332,66.074148296593194,28.180360721442888,96.825651302605209,9.3326653306613228,47.226452905811627,61.90781563126253,95.436873747494985,32.941883767535074,20.839679358717436,21.038076152304608,74.803607214428865,52.384769539078157,55.559118236472948,60.122244488977955,71.430861723446895,34.132264529058119,91.865731462925851,5.7615230460921847,44.84569138276553,81.350701402805612,3.1823647294589179,67.06613226452906,44.250501002004007,35.521042084168336,12.110220440881763,49.210420841683366,1.1983967935871744,37.703406813627254,18.458917835671343,73.018036072144284,2.5871743486973946,68.851703406813627,44.448897795591186,31.354709418837675,50.004008016032067,54.368737474949903,20.442885771543086,21.633266533066134,57.939879759519037,72.62124248496994,83.533066132264537,74.605210420841686,91.667334669338686,84.326653306613224,18.260521042084168,66.272545090180358,3.3807615230460923,72.026052104208418,84.921843687374746,7.3486973947895793,87.501002004008015,99.008016032064134,32.743486973947896,43.060120240480963,5.1663326653306614,97.222444889779567,6.5551102204408815,8.9358717434869739,54.567134268537075,82.937875751503014,98.809619238476955,75.200400801603209,30.561122244488978,84.525050100200403,82.342685370741478,92.857715430861731,22.823647294589179,21.236472945891784,90.675350701402806,29.965931863727455,20.046092184368739,24.609218436873746,97.024048096192388,57.146292585170343,55.360721442885776,89.881763527054105,32.545090180360724,86.905811623246493,23.617234468937877,82.144288577154313,79.366733466933866,80.160320641282567,17.863727454909821,93.849699398797597,5.5631262525050102,77.38276553106212,13.30060120240481,50.99599198396794,11.91182364729459,62.701402805611224,99.801603206412821,42.46492985971944,93.651302605210418,74.010020040080164,81.945891783567134,61.511022044088179,34.330661322645291,89.68336673346694,19.252505010020041,46.234468937875754,88.889779559118239,79.168336673346701,51.987975951903806,37.108216432865731,53.178356713426858,94.24649298597194,26.196392785571142,47.821643286573149,27.38677354709419,5.9599198396793591,45.639278557114231,23.220440881763526,54.170340681362724,85.517034068136269,11.515030060120241,51.392785571142284,56.947895791583164,68.653306613226448,71.827655310621239,55.955911823647298,70.637274549098194,35.322645290581164,1,40.282565130260522,83.731462925851702,38.100200400801604,63.296593186372746,32.346693386773552,54.765531062124246,22.426853707414828,12.903807615230461,11.118236472945892,92.659318637274552,19.054108216432866,53.971943887775552,17.268537074148298,1.3967935871743486,69.24849699398797,42.266533066132268,75.597194388777552,97.61923847695391,26.593186372745492,95.833667334669343,1.7935871743486973,27.585170340681362,7.1503006012024048,56.749498997995993,54.963927855711425,9.7294589178356716,22.228456913827657,66.470941883767537,75.795591182364731,60.320641282565134,73.613226452905806,36.314629258517037,50.797595190380761,83.92985971943888,3.9759519038076152,23.022044088176354,45.440881763527052,33.140280561122246,22.030060120240481,22.625250501002004,93.056112224448896,87.30260521042085,93.254509018036075,15.482965931863728,2.9839679358717435,80.953907815631268,64.68537074148297,24.410821643286575,84.723446893787582,80.557114228456911,45.837675350701403,37.901803607214433,59.328657314629261,48.218436873747493,82.541082164328657,97.817635270541089,87.104208416833671,84.128256513026059,85.120240480961925,50.202404809619239,94.841683366733463,89.286573146292582,5.3647294589178358,77.581162324649299,19.847695390781563,50.400801603206411,61.312625250501,78.176352705410821,58.93186372745491,70.438877755511029,63.494989979959918,43.853707414829657,60.717434869739478,95.040080160320642,33.735470941883769,6.1583166332665336,96.627254509018044,6.3567134268537071,16.276553106212425,23.815631262525052,3.7775551102204408,99.404809619238478,83.334669338677358,70.835671342685373,91.072144288577149,10.12625250501002,90.080160320641284,42.861723446893791,21.831663326653306,88.69138276553106,75.99398797595191,61.114228456913828,48.416833667334672,35.124248496993985,25.006012024048097,24.212424849699399,11.713426853707414,33.537074148296597,47.424849699398798,28.37875751503006,24.014028056112224,68.058116232464926,64.288577154308626,10.324649298597194,46.432865731462925,53.77354709418838,95.238476953907821,36.513026052104209,39.687374749499,63.693386773547097,4.9679358717434869,19.450901803607216,4.1743486973947892,83.136272545090179,53.37675350701403,55.757515030060119,60.915831663326657,71.034068136272552,57.344689378757515,40.877755511022045,51.789579158316634,12.705410821643287,31.1563126252505,12.308617234468938,14.490981963927856,100,43.655310621242485,27.188376753507015,41.274549098196395,86.509018036072149,51.194388777555112,28.577154308617235,15.086172344689379,40.084168336673351,9.1342685370741492,27.981963927855713,10.523046092184369,58.138276553106216,76.787575150300597,38.496993987975955,91.270541082164328,38.695390781563127,74.406813627254508,49.805611222444888,25.402805611222444,1.5951903807615231,39.488977955911821,69.645290581162328,77.977955911823642,29.76753507014028,16.673346693386776,46.036072144288575,34.529058116232463,20.641282565130261,69.446893787575149,89.484969939879761,29.370741482965933,92.06412825651303,25.204408817635272,8.3406813627254515,59.130260521042082,67.264529058116239,45.242484969939881,78.573146292585179,13.697394789579159,95.635270541082164,41.472945891783567,56.352705410821642,89.088176352705418,63.098196392785574,57.543086172344694,76.985971943887776,76.192384769539075,67.462925851703403,28.77555110220441,14.887775551102205,75.00200400801603,15.879759519038076,78.969939879759522,46.829659318637276,68.454909819639283,44.052104208416836,91.468937875751507,37.505010020040082,12.507014028056112,39.092184368737477,55.162324649298597,66.867735470941881,78.771543086172343,56.551102204408821,98.016032064128254,18.657314629258519,6.9519038076152304,88.294589178356716,70.240480961923851,13.102204408817636,25.99799599198397,48.813627254509022,81.549098196392791,43.456913827655313,58.336673346693388,42.663326653306612,62.304609218436873,76.390781563126254,68.256513026052104,43.258517034068134,10.721442885771543,20.244488977955911,72.819639278557119,96.230460921843687,75.398797595190388,50.599198396793589,16.07815631262525,7.5470941883767537,38.893787575150299,40.480961923847694,26.394789579158317,30.957915831663328,72.224448897795597,71.629258517034074,72.422845691382761,17.665330661322646,45.044088176352709,64.883767535070149,94.444889779559119,48.020040080160321,18.85571142284569,36.90981963927856,10.919839679358718,6.753507014028056,79.961923847695388,46.631262525050104,93.452905811623253,52.583166332665328,36.116232464929858,88.096192384769537,94.048096192384776,56.15430861723447,17.46693386773547,28.973947895791582,34.727454909819642,99.206412825651299,70.042084168336672,49.012024048096194,92.460921843687373,73.414829659318642,36.711422845691381,4.7695390781563125,14.292585170340681,90.476953907815627,65.677354709418836,47.028056112224448,78.374749498998,3.5791583166332668,81.747494989979955,98.611222444889776,52.781563126252507,44.647294589178358,25.601202404809619,90.278557114228462,71.232464929859717,9.9278557114228452,80.358717434869746,35.917835671342687,31.949899799599198,59.725450901803612,16.871743486973948,53.575150300601202,76.589178356713433,58.733466933867739,49.607214428857716,62.899799599198396,4.5711422845691381,65.875751503006015,4.3727454909819645,87.897795591182373,41.076152304609217,7.7454909819639282,52.186372745490985,21.434869739478959,77.184368737474955,49.408817635270545,80.755511022044089,66.669338677354716,96.032064128256522,7.9438877755511026,24.807615230460922,60.519038076152306,29.569138276553108,59.527054108216433,92.262525050100209,74.208416833667343],  "delta": [2.3887775551102205e-18,4.9607214428857712e-17,7.262124248496994e-17,1.9649298597194391e-17,6.6669338677354714e-17,8.9286573146292594e-17,5.496392785571142e-17,2.9569138276553104e-17,4.7226452905811623e-17,3.9885771543086167e-17,7.8573146292585178e-17,2.2228456913827657e-17,1.0324649298597196e-17,3.1354709418837675e-17,9.2262525050100207e-17,3.9290581162324649e-17,4.2663326653306609e-17,9.0080160320641288e-17,5.1591182364729454e-17,4.2068136272545085e-17,7.2819639278557116e-17,9.5040080160320643e-17,6.3098196392785571e-17,8.9881763527054112e-17,1.4094188376753506e-17,3.0957915831663322e-17,9.1865731462925854e-17,2.0046092184368738e-17,1.5681362725450901e-17,8.1549098196392791e-17,4.6234468937875746e-17,7.3018036072144293e-17,1.7935871743486975e-18,8.2144288577154308e-17,3.7901803607214425e-17,3.7775551102204409e-18,7.4010020040080164e-17,3.1751503006012022e-17,7.1503006012024048e-18,5.1987975951903807e-17,9.4246492985971949e-17,6.7066132264529067e-17,3.2545090180360717e-17,5.3647294589178357e-18,5.079759519038076e-17,3.214829659318637e-17,8.7104208416833675e-17,6.6074148296593184e-17,5.4567134268537073e-17,4.6432865731462923e-17,4.8218436873747494e-17,3.5521042084168336e-17,9.5635270541082173e-17,1.7466933867735472e-17,1.9054108216432867e-17,4.5242484969939875e-17,4.3258517034068133e-17,5.2186372745490978e-17,3.8695390781563125e-17,5.6551102204408827e-17,6.6470941883767537e-17,3.1553106212424846e-17,1.2903807615230462e-17,7.8374749498998001e-17,8.1945891783567144e-17,6.9519038076152297e-18,3.7505010020040078e-17,9.1270541082164336e-17,3.8893787575150296e-17,2.5402805611222446e-17,4.1869739478957915e-17,2.4212424849699399e-17,8.730260521042084e-17,3.3807615230460922e-18,3.3933867735470941e-17,3.4330661322645288e-17,1.0721442885771543e-17,9.7619238476953915e-17,5.0202404809619236e-17,1.3300601202404809e-17,4.2861723446893786e-17,2.7188376753507015e-17,2.6394789579158317e-17,9.3651302605210419e-17,9.5436873747494996e-17,1.4490981963927856e-17,2.4807615230460923e-17,3.8496993987975949e-17,4.4250501002004004e-17,3.5917835671342683e-17,7.1629258517034069e-17,5.0004008016032059e-17,2.2823647294589181e-17,4.028256513026052e-17,3.3537074148296588e-17,8.1422845691382774e-18,5.8138276553106216e-17,4.8020040080160317e-17,6.9248496993987986e-17,8.7501002004008016e-17,3.0164328657314628e-17,2.9965931863727451e-17,2.0641282565130262e-17,6.9843687374749503e-17,5.9599198396793588e-18,1.6276553106212425e-17,6.7535070140280561e-18,3.9759519038076153e-18,2.7585170340681365e-17,7.420841683366734e-17,8.5390781563126245e-18,3.0759519038076151e-17,2.1434869739478959e-17,9.9801603206412834e-17,5.6154308617234474e-17,4.372745490981964e-18,9.2659318637274548e-17,1.4292585170340683e-17,1.9919839679358718e-18,7.9366733466933872e-17,7.0637274549098198e-17,3.2346693386773546e-17,6.2899799599198406e-17,8.6905811623246499e-17,5.1392785571142284e-17,1.468937875751503e-17,9.7420841683366738e-17,7.996192384769539e-17,7.3414829659318646e-17,3.8100200400801602e-17,5.2979959919839678e-17,6.3567134268537075e-18,2.3418837675350701e-17,6.3891783567134277e-17,9.7294589178356721e-18,4.9805611222444889e-17,9.3452905811623254e-17,6.8851703406813632e-17,9.9603206412825657e-17,9.7817635270541079e-17,8.5913827655310628e-17,6.21062124248497e-17,3.631462925851703e-17,5.4170340681362726e-17,1.1118236472945893e-17,1.1983967935871744e-18,4.9012024048096188e-17,1.7070140280561122e-17,8.4921843687374757e-17,9.6627254509018044e-17,6.9050100200400809e-17,8.5318637274549098e-17,3.7306613226452901e-17,7.0240480961923857e-17,1.8458917835671343e-17,9.6825651302605208e-17,6.8454909819639279e-17,4.967935871743487e-18,7.4605210420841681e-17,2.520440881763527e-17,1.4887775551102207e-17,4.6036072144288575e-17,2.9839679358717435e-18,6.0915831663326652e-17,1.1911823647294591e-17,5.6749498997995992e-17,1.5284569138276554e-17,9.940480961923848e-17,7.34869739478958e-18,4.1472945891783568e-17,7.2026052104208422e-17,1.6871743486973949e-17,5.1663326653306614e-18,5.1194388777555107e-17,3.6909819639278554e-17,8.8096192384769546e-17,5.9923847695390781e-17,2.8775551102204409e-17,9.1342685370741483e-18,2.9370741482965927e-17,5.2781563126252502e-17,4.7028056112224446e-17,6.3494989979959924e-17,9.8214428857715433e-17,9.6428857715430867e-17,4.345691382765531e-17,2.897394789579158e-17,9.4841683366733466e-17,2.3815631262525052e-17,6.3693386773547101e-17,5.5162324649298597e-17,1.5951903807615231e-18,3.4727454909819635e-17,6.0717434869739488e-17,5.2384769539078155e-17,3.1156312625250499e-17,5.6352705410821638e-17,5.952705410821644e-17,5.8336673346693393e-17,8.6112224448897804e-17,6.0519038076152311e-17,8.4326653306613227e-17,6.5875751503006019e-17,4.4052104208416833e-17,3.3140280561122241e-17,5.893186372745491e-17,4.4448897795591181e-17,9.3849699398797595e-17,4.7821643286573147e-17,2.7783567134268539e-17,8.7374749498998012e-18,4.1274549098196391e-17,7.0438877755511021e-17,8.8294589178356723e-17,8.055711422845692e-17,7.5470941883767535e-18,3.1823647294589179e-18,7.1034068136272551e-17,6.7661322645290585e-17,7.7977955911823648e-17,2.0244488977955912e-17,2.9172344689378757e-17,4.0877755511022044e-17,8.1747494989979967e-17,3.4132264529058111e-17,8.6310621242484969e-17,4.8813627254509018e-17,2.1236472945891786e-17,4.0480961923847691e-17,7.7581162324649307e-17,1.0919839679358717e-17,7.6985971943887777e-17,7.8771543086172342e-17,9.8412825651302609e-17,8.9484969939879758e-17,5.9725450901803605e-17,6.0122244488977958e-17,7.004208416833668e-17,3.5322645290581159e-17,1.6673346693386775e-17,3.2743486973947893e-17,8.0358717434869743e-17,8.3136272545090179e-17,6.627254509018036e-17,7.7454909819639271e-18,3.3735470941883764e-17,4.4845691382765528e-17,4.4647294589178357e-17,8.8889779559118241e-17,5.7146292585170345e-17,9.0476953907815629e-17,7.9168336673346695e-17,1.1316633266533067e-17,9.8016032064128256e-17,5.9130260521042087e-17,2.7855711422845692e-18,8.8691382765531064e-17,9.0278557114228465e-17,6.7859719438877761e-17,5.7615230460921844e-18,4.7695390781563127e-18,3.9092184368737472e-17,7.9565130260521049e-17,4.9210420841683365e-17,9.0873747494989983e-17,9.8611222444889786e-17,2.8180360721442886e-17,8.5120240480961921e-17,1.8855711422845691e-17,3.7108216432865731e-17,9.9999999999999998e-17,5.4368737474949896e-17,3.948897795591182e-17,6.4883767535070148e-17,7.6390781563126259e-17,1.3967935871743488e-18,2.1903807615230462e-18,1.9450901803607214e-17,5.5955911823647297e-17,4.0084168336673343e-17,3.6711422845691377e-17,8.5715430861723451e-17,5.7939879759519039e-17,1.6474949899799601e-17,1.3697394789579159e-17,2.560120240480962e-17,4.6631262525050099e-17,5.3376753507014025e-17,1.0126252505010019e-17,2.5006012024048096e-17,7.361322645290581e-17,8.3406813627254509e-18,7.1430861723446892e-17,5.3178356713426849e-17,5.2583166332665325e-17,3.4529058116232465e-17,2.7981963927855709e-17,9.2460921843687383e-17,7.0835671342685374e-17,6.5551102204408818e-18,3.294188376753507e-17,3.0561122244488975e-17,7.5398797595190388e-17,8.3334669338677356e-17,1.8062124248496996e-17,9.7024048096192385e-17,1.2507014028056111e-17,4.5711422845691383e-18,8.412825651302605e-17,6.4486973947895795e-17,6.5280561122244489e-17,3.7703406813627254e-17,4.8416833667334664e-17,6.9645290581162327e-17,7.5597194388777565e-17,9.6032064128256514e-17,5.5631262525050101e-18,9.9008016032064127e-17,8.6509018036072145e-17,1.5879759519038078e-17,4.762324649298597e-17,5.8535070140280569e-17,6.5478957915831666e-17,8.0160320641282566e-17,6.4090180360721442e-17,4.3060120240480956e-17,9.3254509018036078e-17,6.3296593186372747e-17,4.2266533066132262e-17,2.3022044088176354e-17,6.4685370741482972e-17,1.3498997995991986e-17,8.0953907815631261e-17,8.2541082164328661e-17,6.2503006012024053e-17,1.052304609218437e-17,5.5559118236472944e-17,1.9252505010020041e-17,8.4525050100200403e-17,2.4609218436873749e-17,4.5440881763527052e-17,4.365531062124248e-17,9.5833667334669337e-17,6.1907815631262523e-17,5.7543086172344698e-17,2.3617234468937875e-17,8.2739478957915838e-17,8.3929859719438886e-17,4.1743486973947896e-18,4.7424849699398794e-17,7.5002004008016035e-17,7.6192384769539082e-17,8.2937875751503015e-17,1.2308617234468938e-17,4.5044088176352704e-17,7.5795591182364729e-17,9.14689378757515e-17,9.2857715430861724e-17,5.0599198396793583e-17,6.8653306613226456e-17,9.9206412825651304e-17,1.1713426853707414e-17,7.7184368737474953e-17,8.789779559118237e-17,6.944689378757515e-17,6.8058116232464938e-17,8.2342685370741485e-17,2.5871743486973949e-18,3.5719438877755506e-17,2.2625250501002004e-17,6.1511022044088182e-17,2.242685370741483e-17,5.4765531062124244e-17,5.5360721442885767e-17,1.2110220440881764e-17,1.6078156312625251e-17,5.0995991983967936e-17,5.6947895791583168e-17,9.1667334669338677e-17,1.5482965931863727e-17,7.6589178356713436e-17,8.1350701402805614e-17,9.3056112224448901e-17,7.67875751503006e-17,1.7268537074148296e-17,9.8809619238476963e-17,4.3853707414829657e-17,9.523847695390782e-17,9.7222444889779562e-17,8.9358717434869747e-18,2.599799599198397e-17,1.3102204408817635e-17,2.6791583166332664e-17,9.4048096192384772e-17,7.7779559118236471e-17,2.6196392785571144e-17,6.686773547094189e-17,5.0400801603206413e-17,7.1827655310621245e-17,1.3895791583166333e-17,7.1232464929859728e-17,3.5791583166332666e-18,9.3326653306613219e-18,5.1789579158316631e-17,8.1152304609218437e-17,9.4444889779559125e-17,6.270140280561123e-17,1.7665330661322646e-17,5.7344689378757522e-17,7.3811623246492987e-17,4.9408817635270535e-17,7.9763527054108225e-17,7.5200400801603211e-17,2.203006012024048e-17,6.7462925851703408e-17,3.1949899799599199e-17,4.5639278557114228e-17,2.4014028056112225e-17,2.976753507014028e-17,9.4643286573146302e-17,4.5837675350701399e-17,2.5799599198396794e-17,3.0362725450901798e-17,8.9683366733466935e-17,4.8615230460921841e-17,3.4925851703406812e-17,4.1671342685370738e-17,6.2304609218436877e-17,7.8176352705410824e-17,1.0000000000000001e-18,8.3731462925851709e-17,2.4410821643286575e-17,6.1312625250501006e-17,1.151503006012024e-17,7.4406813627254517e-17,2.0839679358717436e-17,5.3773547094188373e-17,2.0442885771543085e-17,3.5124248496993989e-17,5.8733466933867734e-17,5.3971943887775549e-17,2.1831663326653307e-17,2.8577154308617233e-17,2.1633266533066133e-17,2.3220440881763528e-17,2.8378757515030056e-17,1.826052104208417e-17,8.5517034068136274e-17,6.8256513026052102e-17,5.5757515030060121e-17,7.5993987975951906e-17,7.3216432865731469e-17,4.682965931863727e-17,7.738276553106213e-17,3.3338677354709417e-17,2.1038076152304609e-17,1.8657314629258517e-17,6.7264529058116231e-17,3.611623246492986e-17,8.0755511022044096e-17,6.4288577154308618e-17,9.206412825651303e-17,9.1072144288577159e-17,7.8969939879759519e-17,7.9438877755511038e-18,5.3575150300601202e-17,1.9847695390781565e-17,7.4803607214428858e-17,9.9278557114228457e-18,1.508617234468938e-17,3.9687374749498996e-17,2.6593186372745491e-17,6.1709418837675359e-17,2.6989979959919841e-17,1.786372745490982e-17,8.6707414829659322e-17,7.2224448897795599e-17,2.7386773547094188e-17,6.0320641282565135e-17,5.7741482965931863e-17,9.5310621242484986e-18,3.8298597194388778e-17,4.1076152304609214e-17,6.1114228456913829e-17,9.6230460921843691e-17,5.9328657314629264e-17,8.3533066132264532e-17,8.7699398797595193e-17,8.9088176352705417e-17,1.2705410821643288e-17,8.472344689378758e-17,3.6513026052104207e-17,6.5082164328657313e-17,8.8492985971943887e-17,9.0675350701402806e-17,4.2464929859719439e-17,4.0679358717434867e-17,6.1583166332665331e-18,7.2422845691382763e-17,6.5677354709418843e-17],  "expected": [1,0.99999999999999978,0.99999999999999967,1,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999989,1,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999978,1,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999967,1,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999978,1,0.99999999999999967,0.99999999999999978,1,0.99999999999999978,0.99999999999999989,1,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999989,1,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999989,1,0.99999999999999967,0.99999999999999978,1,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,1,1,0.99999999999999989,1,1,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999989,1,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999989,1,0.99999999999999978,1,1,1,1,0.99999999999999989,0.99999999999999978,1,1,0.99999999999999989,0.99999999999999967,0.99999999999999978,1,0.99999999999999956,1,1,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999978,1,0.99999999999999989,0.99999999999999967,1,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999978,1,1,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,1,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999989,1,0.99999999999999978,1,0.99999999999999978,0.99999999999999989,0.99999999999999967,1,0.99999999999999989,0.99999999999999967,1,1,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999989,1,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999978,1,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999989,1,0.99999999999999978,0.99999999999999989,1,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999978,1,1,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999989,1,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999989,1,0.99999999999999978,1,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999978,1,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999978,1,0.99999999999999956,0.99999999999999978,1,0.99999999999999956,0.99999999999999956,0.99999999999999978,1,1,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999967,1,1,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,1,0.99999999999999989,1,0.99999999999999989,0.99999999999999978,1,0.99999999999999989,0.99999999999999967,1,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999967,1,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999978,1,0.99999999999999967,1,1,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999967,1,0.99999999999999956,0.99999999999999989,1,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999978,1,0.99999999999999978,0.99999999999999967,0.99999999999999978,1,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999967,1,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,1,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999967,1,0.99999999999999967,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999978,1,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999978,1,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999956,1,0.99999999999999989,1,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,1,0.99999999999999989,1,1,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999989,1,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999967,1,0.99999999999999967,0.99999999999999989,0.99999999999999967,1,0.99999999999999978,0.99999999999999989,0.99999999999999989,1,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,1,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999989,1,1,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999967,1,0.99999999999999978,0.99999999999999989,0.99999999999999967,1,1,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999989,1,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999978,1,0.99999999999999989,1,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,1,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999989,1,0.99999999999999967,0.99999999999999967]}

},{}],37:[function(require,module,exports){
module.exports={  "z": [41,46,7,46,32,5,14,28,48,49,8,49,48,25,41,8,22,46,40,48,33,2,43,47,34,38,38,20,33,9,36,2,14,3,5,42,35,16,48,2,22,20,39,40,10,25,23,33,36,38,14,34,33,9,6,25,48,18,30,12,38,13,26,35,45,48,28,7,8,13,43,13,41,13,47,18,10,13,31,24,18,42,30,28,46,15,38,38,20,29,4,3,27,39,47,7,29,24,1,17,9,40,16,27,9,31,14,33,35,38,23,5,12,46,8,42,27,50,4,23,6,49,1,39,41,44,5,20,13,41,22,46,10,14,8,7,44,29,28,8,43,32,18,26,21,4,12,7,10,12,21,3,46,48,25,25,17,46,19,6,40,20,13,21,5,7,48,48,29,3,12,18,42,1,3,9,33,37,33,23,28,15,38,10,35,10,19,32,40,5,47,39,25,22,23,16,26,26,41,40,33,19,41,27,18,47,44,28,32,30,11,16,24,12,43,10,12,9,12,22,16,47,22,10,46,49,22,6,13,21,30,14,31,36,12,6,15,16,22,26,5,14,41,2,47,37,25,29,12,23,49,28,27,12,25,32,34,20,19,50,2,45,46,40,5,14,17,34,7,37,6,33,25,39,36,46,45,17,35,10,2,38,26,24,46,31,31,43,41,29,10,12,45,2,25,9,49,36,26,24,3,35,3,4,27,5,41,41,37,8,33,26,49,33,41,23,22,42,5,7,9,20,42,41,4,20,27,21,33,32,15,22,1,50,9,6,19,10,25,17,48,47,3,37,14,22,28,48,21,50,16,36,34,27,35,34,9,7,50,9,2,29,45,34,10,19,24,50,8,43,33,19,10,22,25,7,30,12,20,30,13,15,31,14,42,50,37,18,30,6,46,44,41,14,30,2,22,16,9,9,22,5,30,24,35,35,32,2,4,16,27,33,21,41,36,49,27,17,6,31,39,22,5,14,8,15,23,27,23,44,26,48,32,48,13,34,15,34,35,4,13,12,34,43,18,40,34,1,31,20,46,1,24,22,24,39,17,40,24,2,9,37,24,8,18,31,10,37,13,46,14,39,10,15,5,29,35,28,22,33,33,34,32,48,11,36,12,6,31,23,23,34,39,18,34,21,43,42,13,31,30,28,44,14,16,6,47,33,24,32,28,33,28,37,27,50,11,6,6,4,21,23,19,39,32,39,47,49,10,7,35,5,27,27,44,25,20,34,38,27,18,8,30,14,3,38,13,23,35,18,37,20,35,36,23,1,17,22,14,10,42,22,45,20,39,20,41,38,19,11,40,48,17,34,22,42,39,9,44,50,26,45,30,8,10,21,38,42,40,16,27,5,6,7,34,25,10,25,8,3,43,29,47,35,30,41,44,50,1,44,31,50,27,24,41,12,25,46,29,43,37,30,13,34,5,32,34,37,45,50,39,30,47,30,1,7,44,25,43,11,28,32,2,31,19,3,25,10,7,11,8,10,3,32,15,27,35,25,27,23,7,25,43,44,14,11,29,33,21,11,48,5,6,8,9,32,29,3,47,37,37,4,44,47,50,43,40,26,9,20,7,2,47,16,15,17,24,33,2,43,28,43,18,23,3,9,34,17,45,6,50,27,36,50,15,21,24,39,41,6,9,18,3,27,17,9,11,46,34,24,46,6,38,37,29,10,30,15,7,11,45,4,13,3,23,1,45,10,5,16,23,6,50,17,15,4,15,3,26,39,32,5,5,39,46,27,6,42,17,15,38,1,3,34,31,27,37,36,40,15,35,28,20,4,40,17,31,38,6,7,28,25,45,40,37,3,4,5,40,48,35,7,37,6,6,33,17,33,38,30,38,12,37,49,44,5,19,19,35,30,40,19,11,5,39,11,20,28,12,33,25,8,40,6,15,12,27,5,21,6,6,40,15,31,49,22,35,38,22,33,6,47,10,14,40,25,39,20,14,2,34,22,23,31,3,16,39,35,7,7,5,1,22,33,37,27,6,32,7,7,5,8,9,10,16,16,11,13,45,36,28,10,11,4,46,36,28,16,9,32,50,9,13,20,4,35,21,50,21,32,8,20,9,38,44,18,35,15,27,42,30,17,15,23,22,18,28,38,22,22,7,2,15,16,33,48,47,23,13,39,38,38,38,6,35,24,11,5,42,9,9,34,45,26,36,8,48,28,34,2,41,38,7,27,17,28,20,21,10,13,2,47,33,47,9,47,40,29,23,13,38,12,4,39,34,36,33,21,20,41,16,41,40,43,26,32,48,23,4,44],  "delta": [7,42,49,12,16,28,10,50,50,49,37,50,6,40,15,1,6,32,44,26,40,19,11,35,20,38,24,22,9,16,40,16,44,8,50,42,7,39,25,34,7,11,3,2,21,23,25,40,47,41,36,1,36,33,23,39,29,44,41,1,42,42,48,21,22,30,8,39,12,41,50,17,15,1,11,46,43,48,39,50,4,40,30,37,35,34,20,29,11,27,21,18,30,18,49,8,20,20,37,20,47,22,44,32,6,24,18,27,36,50,37,46,26,28,26,24,28,23,43,31,25,49,2,49,19,34,18,43,3,34,38,7,50,5,15,41,4,32,1,35,27,22,10,7,20,39,3,13,26,42,50,42,16,3,13,28,45,18,2,9,44,11,14,25,12,25,48,33,38,22,28,3,17,21,46,41,13,7,25,19,36,15,32,41,16,20,18,41,34,19,23,16,46,25,38,6,20,44,19,46,28,8,10,48,50,13,1,20,39,24,28,1,46,10,45,23,8,12,40,24,5,33,32,30,37,18,35,36,9,7,23,3,40,9,42,17,33,22,40,6,50,10,39,14,13,6,18,15,49,11,31,12,10,21,21,9,15,32,8,39,45,48,1,30,39,17,7,15,43,12,26,1,1,15,5,20,18,36,4,26,22,35,13,21,14,47,24,31,25,26,13,17,26,30,16,49,12,38,17,16,48,27,44,47,34,15,4,12,36,10,22,47,8,33,24,22,13,26,46,4,36,31,10,20,14,43,46,31,10,26,42,18,41,15,9,25,10,44,11,31,44,20,48,9,49,29,30,7,29,28,16,7,37,13,42,10,16,45,34,37,4,7,5,1,23,32,27,25,17,13,12,9,30,37,44,36,12,24,1,38,33,4,24,50,27,45,39,11,46,19,43,17,17,33,30,3,39,25,25,22,20,39,49,38,32,4,32,27,15,17,32,50,26,37,13,17,38,35,35,4,23,35,4,4,27,14,25,7,5,7,49,38,14,37,21,24,3,31,25,46,47,46,16,40,12,23,26,12,36,50,33,14,24,1,23,49,16,11,13,41,25,21,11,28,37,15,28,38,17,41,43,1,45,30,5,47,46,50,46,48,47,1,39,2,30,33,17,6,7,49,27,34,36,4,11,22,1,4,18,16,50,14,43,18,38,43,11,49,36,50,38,10,18,10,42,48,39,44,23,17,42,28,7,11,25,21,38,18,39,50,43,42,19,3,49,43,44,4,2,31,37,31,34,48,14,46,6,16,44,12,41,28,48,26,34,8,49,32,9,4,25,40,24,45,33,46,1,35,30,6,50,12,17,35,49,12,47,44,22,24,29,42,8,32,50,32,22,2,5,27,40,37,10,14,23,24,34,9,10,5,17,9,2,42,13,8,8,16,2,21,40,23,1,15,48,9,5,14,11,38,41,30,25,30,29,10,46,2,14,40,30,28,5,47,20,2,30,21,7,31,3,43,23,25,4,12,33,49,48,37,22,35,35,12,50,22,38,17,19,50,37,42,20,43,9,48,18,20,20,36,42,48,4,34,9,19,9,6,8,20,20,2,23,5,46,24,38,37,37,33,11,3,3,22,41,16,45,21,11,2,4,34,5,17,19,40,9,5,3,15,36,25,46,21,4,19,43,19,8,22,44,50,27,20,17,3,43,10,17,22,17,13,7,5,48,14,29,18,16,39,19,10,1,20,46,50,36,32,32,47,45,1,37,30,3,32,15,24,48,28,26,7,36,47,46,32,18,34,33,14,33,22,41,17,36,33,13,46,31,20,40,25,45,20,14,13,1,20,11,39,31,39,25,20,42,7,13,26,7,49,37,12,35,23,34,46,42,11,48,44,36,49,22,42,5,34,5,35,11,39,5,21,11,5,26,49,9,46,16,30,43,20,1,1,10,20,10,42,39,4,15,14,32,47,12,15,5,17,3,31,28,18,27,50,43,46,7,31,42,50,33,38,38,34,28,37,39,25,30,49,4,2,19,4,40,24,23,15,26,19,6,30,1,24,6,17,5,11,26,24,2,43,48,43,50,44,42,46,30,42,27,46,9,1,43,43,40,37,37,30,29,47,31,6,31,37,15,16,29,33,3,49,40,32,17,49,26,47,29,23,49,7,50,12,30,29,39,21,3,26,9,27,27,35,24,17,19,7,37,17,34,4,46,6,5,20,34,25,24,11,21,6,25,6,18,15,17,13,28,4,1,7,45,38,31,48,46,13,46,23,29,18,2,29,18,39,32,45,44,17,34,35,21,1,1,20,50,11,32,46],  "expected": [3.154841299182556e-12,5.6753318305408012e-77,5.6708973395409886e-71,2.9516731675370551e-21,3.1794662405941711e-26,9.1209378116513842e-35,2.4087176110456819e-13,7.500094741264283e-86,2.6885936359955231e-93,1.2905249452778511e-91,1.89596881214106e-51,1.3168621890590318e-93,6.049831640445245e-11,4.889773840731746e-66,6.4263497348074096e-26,0.125,4.6920336775409238e-09,8.2394044095833366e-58,5.1698791434896808e-79,5.785605399634358e-47,4.297104014771794e-69,4.1103176233121648e-19,3.2866537502714929e-19,9.49198299315682e-64,2.0312408647950259e-33,5.547855605263179e-67,2.7116409810559653e-41,3.6363501572094641e-33,7.8657985980093265e-15,6.4985258866595489e-20,4.1650567607080926e-70,2.8114572543455206e-15,1.5365147107345794e-67,5.5114638447971777e-07,1.0396645122491812e-70,8.4786017953230766e-76,8.825426026966464e-12,5.6647609749478183e-60,4.2234919417330813e-45,9.6775929586318907e-41,1.6757263134074728e-10,4.5860052364736535e-16,1.5634771732332708e-05,0.00060975609756097561,1.3680531107447158e-27,2.3990434815830211e-36,4.346093263737357e-39,4.297104014771794e-69,2.1737322793929734e-83,1.2154195815726332e-72,1.0237064703361271e-53,0.029411764705882353,1.0609962334456977e-61,1.2052901255038175e-45,3.9358670844838056e-28,3.1294552580683175e-64,1.3716466096809764e-52,7.00751168724703e-70,7.3813157673096139e-70,0.083333333333333329,1.5385057994590295e-74,2.0750040201274059e-63,3.4699797302510845e-81,2.3253262425262921e-35,4.8834321474425625e-39,1.7813592333519175e-54,1.0537804632083056e-12,6.0189486099716185e-54,4.143200164298662e-14,1.1205021708687992e-61,1.1295701458246694e-91,5.4174903185490746e-23,6.4263497348074096e-26,0.076923076923076927,1.3577696570670454e-19,1.7940378103551024e-73,4.4989859890944208e-63,5.7565477930681541e-74,1.5500763111350191e-66,5.7832995504184739e-84,6.9618490671122253e-06,5.7705363818968852e-72,6.3755142561397912e-50,8.5815530904842149e-62,1.6714143966210924e-63,7.0226263865058321e-51,3.3962001700055058e-34,2.5284984029709511e-50,4.5860052364736535e-16,2.401375697660589e-44,9.6704254265767103e-24,8.2206352466243297e-19,5.6721837151846872e-49,7.3561695682319253e-31,5.3268476464660237e-91,8.258936830365401e-09,2.4560207642706179e-32,4.2790539059255558e-31,7.2654601791530714e-44,5.6245067804178701e-29,3.1757025101429537e-69,4.0186519339249405e-38,9.4292252850456359e-69,1.7157240517800021e-52,4.6250046250046248e-07,1.1490582713305919e-39,7.5728359291546202e-25,1.8973530426272019e-45,2.4646744801782048e-62,6.5300464630382753e-90,8.1048128969446277e-60,7.8910785999195792e-64,2.9001392087921733e-36,2.6760432005709337e-50,5.8042331528690633e-34,4.056006766978873e-42,1.7470325842768836e-45,9.9336530469562076e-42,1.0903892409368875e-57,2.6293132539284203e-49,4.5239851545790864e-31,1.2905249452778511e-91,0.5,2.4814176559545445e-88,5.8833064312661127e-33,4.1613153583754226e-61,2.1352299341881376e-20,3.865433866191104e-69,0.0003663003663003663,2.4665766021000094e-60,3.6840058622475584e-61,1.483076211580009e-12,2.6166126332127973e-75,9.7261126672891379e-07,4.4839828617950892e-18,2.7839725300516278e-57,2.3360337883927153e-07,3.6640886529539028e-53,0.035714285714285712,3.5871729925708856e-48,8.2105305166946335e-48,1.9235235462074109e-36,3.2665230280847421e-14,5.8948659245285129e-11,2.9818071289117606e-30,4.2704440387748634e-51,0.00045787545787545788,5.9188573775695178e-15,3.5118049328283409e-35,9.3375180905733258e-63,2.0310451656568459e-82,7.5236857624645231e-55,2.3567156007072967e-28,8.5034013605442174e-06,4.5078431560120188e-20,7.6923188556929866e-45,4.122065698380606e-71,6.0335780868082354e-32,0.002631578947368421,1.3764894717275669e-09,5.1698791434896808e-79,4.5860052364736535e-16,1.1877305774386991e-18,2.0338211333766594e-38,1.1470745597729724e-12,8.7561002991853295e-32,2.5036183938390313e-89,3.6135979254948016e-60,5.601013672110909e-64,3.2234751421922368e-24,1.9569090477679982e-39,0.00014619883040935673,1.4231718257232726e-29,1.9572941063391263e-20,1.6110952141502473e-61,6.6285060239324469e-59,2.1996819238926714e-21,6.1572739723021839e-12,6.4927421118702843e-42,3.3599875452615452e-29,5.4921939779098976e-60,9.8598323797593167e-21,8.0432186986135532e-56,1.1931310843078405e-59,9.707105093732408e-27,4.1041593322341474e-26,1.7210990748078684e-26,1.3428450046161856e-70,4.5631667138850171e-60,9.283608409513641e-22,3.2156050136803531e-41,2.265700227015433e-27,5.1796526232647148e-77,9.2848356088934447e-39,1.3508021494907713e-61,2.5595033334971414e-08,1.296683001795623e-31,9.0643920907132502e-74,5.8833064312661127e-33,7.2407270917222413e-83,3.1622550710453364e-47,1.5875301916491849e-11,2.6826881795770034e-17,1.2191820673855162e-81,9.7525800322855924e-81,3.9677663853508046e-23,0.022727272727272728,4.2103213101782024e-32,6.8646236635979417e-67,2.0683048883950653e-39,6.9381320784501746e-39,0.0625,1.510732015118875e-76,7.8128917383917633e-13,6.6658818775438118e-82,1.3790857971216893e-30,3.2814145301245403e-10,1.6572800657194649e-14,2.5734199857620087e-59,4.2710243800909847e-37,5.3749570003439971e-07,6.1508049795656196e-60,1.1951423881492818e-50,1.7790082252436347e-41,2.5164323947923702e-67,2.2805237453984972e-32,7.185800794548352e-56,3.5871729925708856e-48,9.3754700860701152e-12,2.2343017512099639e-10,1.0962015908493847e-37,0.00029761904761904765,2.2143947301928841e-68,3.887167911806934e-15,9.3375180905733258e-63,1.0676149670940688e-19,3.370860665522799e-49,9.5008560480031592e-32,1.0065589787561634e-64,1.8863570958491241e-09,1.0396645122491812e-70,2.4087176110456819e-13,9.1202623791931261e-70,7.6471637318198164e-13,3.9677663853508046e-23,2.6476278080899391e-10,4.4159836309151734e-28,5.0465450144923631e-24,4.7971231608901281e-75,1.2944369619078858e-16,1.3876216033900038e-56,5.338235316330022e-19,1.0841362790208905e-15,1.5169943768338583e-28,5.1867320071824916e-33,1.0078054453699448e-14,6.9948257293071765e-25,7.8424105279510022e-50,1.5875301916491849e-11,3.2794543825299898e-72,1.817315401561479e-58,2.1371467159002745e-88,0.021739130434782608,1.1920050111345286e-52,3.9725060825812687e-52,2.3475791380379325e-23,8.0932911731134914e-10,6.9948257293071765e-25,1.1836617899879369e-60,2.9965833424351943e-20,1.4593500498642214e-32,0.030303030303030304,0.040000000000000001,1.2234781225883339e-25,1.2664486348696875e-08,1.450379347790441e-35,8.4470093215315294e-32,2.5940073456481049e-55,5.6447424868477503e-07,3.5118049328283409e-35,3.8681701706306841e-23,2.2477136984723768e-61,2.9656862868500125e-20,9.7251225134671721e-33,8.625579098588705e-25,1.8270230789719791e-81,1.1490582713305919e-39,3.143109232524e-55,9.8926994316557876e-44,1.320756633713324e-42,3.2284676604924639e-16,1.3092268269826931e-22,2.2191891053694638e-46,1.2161250415535179e-34,7.6043238124359292e-25,9.9489427009491028e-73,1.4918801608919026e-21,2.3116065021929911e-66,1.1039959077287934e-26,1.2673873020726547e-24,6.575898833266316e-65,5.816475720840766e-46,3.634630803122958e-58,1.9727696499798948e-64,4.8466781123728876e-56,1.9729524591898392e-16,3.0693450999747088e-07,1.0115717117560344e-20,6.0749018877631811e-63,1.4169744561901425e-11,1.1398658051599472e-36,2.5330852030832916e-79,1.7459831574156548e-14,3.1903732341218755e-56,6.430254630576261e-42,4.2283141362900752e-34,1.7305306977378155e-19,9.172335520078862e-46,7.8910785999195792e-64,0.00019841269841269841,1.516775049712848e-50,3.9996293692550114e-48,2.1566708894638654e-17,9.8055107187768538e-35,1.6868743526073125e-14,3.865433866191104e-69,6.5860215280165586e-78,1.5684821055902005e-48,1.8728091900022204e-16,2.0289819099594638e-43,1.2261387391661944e-64,2.5047179882858791e-27,2.9893108271424046e-50,4.7938889652021808e-27,1.133579564952114e-10,4.5239851545790864e-31,2.0999076609116201e-14,8.4886528096121143e-65,6.0044470838080088e-17,8.0900655972547185e-47,1.9128916367074268e-81,1.0108704545206105e-35,6.575898833266316e-65,3.1097343294455473e-15,1.9787181731857749e-76,1.6798443350871047e-45,2.6868238650874834e-49,1.1203391926750453e-12,3.9996293692550109e-45,4.1897569168437094e-51,1.5902955451224704e-22,7.3545216891387197e-12,7.2490425887594257e-64,1.9771241912333415e-20,1.5658108122962754e-73,1.4372721690714715e-16,6.4985258866595489e-20,4.6418109411291647e-64,1.5417010990236961e-62,3.3706112215841065e-52,0.0083333333333333332,2.9505852969832555e-11,4.3701312367890935e-09,0.029411764705882353,1.3790857971216893e-30,2.105068089081585e-49,8.5000123355407492e-43,1.8388843108027041e-45,8.1231573583244362e-21,1.106617424333836e-22,9.8985686575170216e-20,5.8797414505525358e-13,1.7790082252436347e-41,2.1735634587260592e-59,2.5017722170368573e-73,5.1245328465298366e-49,2.6430774858902302e-19,3.8629854261111743e-33,0.050000000000000003,2.4243193506151697e-64,4.0042861312419186e-48,1.3616557734204793e-05,1.1490582713305919e-39,3.1408224971202773e-78,1.3488728705998326e-47,5.5940849391939316e-84,1.4994204338549133e-68,1.1666153671731223e-15,3.5639130193813405e-79,1.9340850853153419e-22,6.4492407165236376e-79,7.2605884668255101e-30,2.0132674607792638e-29,1.1316460805683683e-48,6.3755142561397912e-50,0.041666666666666664,6.1400097704125969e-63,1.6027085101219904e-36,4.6433865222952507e-33,1.5200590119385732e-28,1.527267066027975e-30,3.9725060825812687e-52,7.8077909357776885e-85,5.093188432506187e-62,5.4236344980071883e-55,5.6447424868477503e-07,4.1474852043584379e-54,3.2798892370698378e-30,9.3715241811517366e-16,4.96967357850772e-24,1.7157240517800021e-52,5.5353508515227229e-88,4.4213502899492595e-40,5.6199056780588046e-66,8.3238426178755399e-22,1.5051456719630082e-30,3.1783529964756351e-63,1.3488838197370146e-53,1.4707409269540631e-46,8.9845322293140134e-07,1.0304235728012668e-39,7.185800794548352e-56,0.00059523809523809529,1.7507002801120447e-05,1.7071273979026655e-35,2.8593513901302015e-19,4.346093263737357e-39,4.6444398193254946e-11,1.0322474090590033e-07,1.9864232894495878e-12,4.6891617976366005e-83,9.1804644418701768e-70,6.8740060121645982e-23,7.8033947755896501e-68,5.5163431884867579e-29,2.1426048969171937e-40,0.00024509803921568627,6.8433505871914229e-53,2.1288301138277206e-42,9.8638482498994734e-63,3.4539286758408925e-72,9.8494532739396113e-70,1.4275154549606482e-26,2.9556405858496243e-72,4.0228116109418007e-17,6.4816966676208719e-40,6.2612650406697659e-44,2.08767569878681e-09,4.8728818947364914e-61,7.1086580797989605e-82,1.0563338986645304e-59,1.1470745597729725e-11,9.9960145065959221e-38,0.045454545454545456,4.6981268181000835e-36,2.4814176559545445e-88,7.951477725612352e-23,6.7067204489425084e-19,6.9495915321851957e-20,7.117406731291439e-52,4.6433865222952507e-33,9.1789193783932589e-36,8.7564853305533457e-17,4.8775068511504728e-37,1.5408149851858065e-57,2.2174212942466447e-24,2.6364901898110663e-38,1.1245653253911849e-66,5.4174903185490746e-23,4.9375386925704969e-75,8.7581338511871024e-66,0.02564102564102564,1.571972742520762e-66,3.2795103414871312e-44,6.6137566137566142e-05,1.2289355239246003e-80,4.1251227999223225e-81,7.500094741264283e-86,1.4008605958375023e-75,3.6765800355813927e-84,2.9412640284651144e-82,0.029411764705882353,6.8646236635979417e-67,0.00042517006802721087,4.4475205631090867e-42,4.166532208741255e-57,1.3092268269826931e-22,3.0062530062530061e-06,1.9271840903719461e-11,1.3216096711738912e-81,1.847828768595815e-42,2.380875547852146e-58,1.5811388475000059e-63,6.9618490671122253e-06,3.2665276569806169e-18,1.731595312956888e-33,0.023255813953488372,2.7965144244214012e-07,1.805830106183025e-24,4.8204810744492274e-26,9.8832796655413777e-87,3.2550215343475745e-22,2.49370641038914e-78,7.5728359291546202e-25,3.0589709264718217e-58,9.6665712849014846e-60,1.3577696570670454e-19,4.5389876982486327e-86,1.8641069662972643e-58,1.4184336557026977e-87,1.3202389369975716e-63,1.8728091900022204e-16,9.1027146726052732e-29,6.7602920205337987e-17,1.626151941073957e-70,6.3235722318614704e-90,5.9656554215392019e-57,1.9727696499798947e-61,3.9358670844838056e-28,2.466190573987299e-18,7.7308677323822069e-68,3.6956575371916304e-44,4.1275784982878805e-10,8.5983595499262929e-19,1.1565196886768945e-41,3.7713502764526367e-36,1.6602967607637554e-69,2.2805237453984972e-32,2.923171156554209e-56,1.0126602392037479e-72,2.0335205354497081e-75,4.3615569637475501e-57,3.3713758046686195e-30,4.5612114577631816e-05,4.857151627046078e-90,1.7012051075850628e-71,6.1356093114144501e-71,6.3088298382416027e-07,0.00067476383265856947,9.9511995003240131e-51,1.5408149851858065e-57,9.6362945534030205e-42,4.4596615100628366e-57,1.2268052673751804e-74,9.5589546647747705e-14,3.4884474652426998e-82,7.4816251286839525e-08,2.1490480339492842e-24,2.6070776095509079e-77,4.0228116109418007e-17,2.5622358746666322e-72,4.7035641382438933e-43,6.2106636554084957e-85,2.0357665022942681e-44,1.5808761748006374e-54,2.4801587301587302e-05,2.5368181707509932e-78,1.1951423881492818e-50,5.5400505054050682e-12,5.8275058275058275e-05,6.1454647984528372e-44,1.0065589787561634e-64,1.0718683378934509e-42,9.5868895490850783e-73,6.1497446790204235e-58,1.4749060844746275e-74,0.024390243902439025,2.2477136984723768e-61,5.157416818249883e-46,1.7343767343767344e-07,1.2356395375667421e-90,1.8648502011148783e-21,2.4095387047310156e-24,3.5012875703708026e-60,4.2651948478793763e-81,7.8253660720749836e-21,1.8565966901851903e-84,4.998873321216023e-64,7.3251482211638435e-39,1.3607743899940011e-43,6.7193560933726293e-47,1.0972308205712216e-76,6.4239469679064872e-13,2.4708447572828257e-43,2.6166126332127973e-75,3.0163117415196162e-50,9.924605990664832e-38,0.00055370985603543741,7.6733627499367713e-09,9.3072503491404782e-40,7.4087482435329484e-67,7.1743459851417715e-49,9.1765964781837796e-11,2.9594286887847587e-16,1.2212847912428004e-38,4.9980072532979611e-38,6.0064291968628785e-48,7.1452920297315307e-14,1.4169744561901425e-11,0.00039682539682539683,1.0131053674640246e-29,2.2151541268643059e-14,0.00044326241134751772,1.5658108122962754e-73,6.293041633071977e-21,6.5725860399636583e-14,3.8949476263717406e-14,7.3752137926187403e-29,0.5,4.761346343756499e-37,2.2143947301928841e-68,9.9336530469562076e-42,0.037037037037037035,4.9428104780833536e-23,4.3988767537376012e-87,1.6407072650622702e-11,7.0172483965587417e-08,8.625579098588705e-25,1.4947058885724062e-17,1.9631364771213205e-68,2.5622358746666322e-72,6.3755142561397912e-50,3.4801670505506079e-35,4.3797443758025106e-51,2.7639205489852682e-36,2.4580620618779145e-16,9.7061712939348777e-81,0.00071123755334281653,1.1309092595927414e-24,3.6847802050898759e-74,2.1089319427764739e-52,2.1817009784510367e-46,3.5475182980993818e-09,4.68935923602808e-81,4.1103176233121648e-19,0.017857142857142856,1.3515369699853199e-53,5.1867320071824916e-33,2.3097945226157999e-12,1.0847611129534357e-43,4.1050903119868638e-05,2.4858293310184852e-74,1.6117375710961184e-24,2.0891968569647126e-41,5.6960583276372751e-06,2.2941491195459449e-11,1.5309537692806173e-53,1.5438014535955504e-73,3.1189935367475434e-69,1.4031221551460204e-53,5.7002212947696489e-28,1.3650975447415632e-49,1.4530920358306143e-43,1.3610531904085904e-19,6.8705492124506072e-79,3.2487047146436744e-35,4.8213507045739527e-66,1.8547131249843729e-26,3.3713758046686195e-30,1.8355689877415156e-83,1.1917518247743806e-50,1.1398074220819922e-69,4.4645926646572562e-35,2.49370641038914e-78,5.5400505054050682e-12,1.5438014535955503e-72,5.5407828441945136e-29,3.2622959343677689e-33,2.9818071289117606e-30,6.5946741291862957e-52,1.5666582504633827e-77,2.9755198340571568e-67,0.00033068783068783067,1.5066126568797719e-46,1.133579564952114e-10,2.7036277556072883e-31,2.2151541268643059e-14,4.9603174603174603e-05,2.3837004099469048e-14,5.2319840456841573e-34,5.2319840456841573e-34,0.050000000000000003,1.1098709426005824e-40,3.5475182980993818e-09,5.8885104623094017e-86,2.5810952153501916e-42,1.4049764195147011e-67,4.9288920314576e-61,3.3706112215841065e-52,1.5081558707598081e-51,2.0242492231287748e-12,0.041666666666666664,9.0461716601534222e-06,9.5008560480031592e-32,6.8663769393306884e-63,7.951477725612352e-23,1.0424050904320239e-74,6.155275347863715e-35,2.08767569878681e-09,0.00052854122621564484,1.3242226812860851e-06,7.4516577347652921e-61,3.164476848687375e-07,5.5103795742289342e-26,3.9145882126782525e-20,3.2479679517268987e-57,6.1802703270073273e-15,4.0952053335954262e-07,1.0278548668927947e-05,4.932381147974598e-17,2.1592452367278657e-66,2.6000037732242291e-40,1.7824604691022381e-81,5.0780834376040137e-38,1.3616557734204793e-05,1.1927228515647044e-28,4.7491975920083007e-71,1.2905560646020923e-32,6.5725860399636583e-14,1.1020427836554655e-26,4.998873321216023e-64,9.7525800322855924e-81,2.2619925772895432e-31,7.3290778362361295e-32,2.4095387047310156e-24,0.0010101010101010101,8.4886528096121143e-64,9.4217407507782801e-18,2.8550309099212965e-28,2.1611383363260385e-34,3.8011541946891883e-30,1.8743048362303472e-14,5.1777076585268363e-12,1.1120036793977744e-08,1.6170204262165794e-82,1.4036815915184625e-17,3.761553411122477e-48,3.3131157190051465e-25,6.4056898025644126e-19,5.9656554215392019e-57,1.34079513040183e-33,9.6354263020929685e-10,0.076923076923076927,1.7793582784901148e-21,4.5321960453566253e-76,3.287949416633158e-65,3.7142542147135385e-65,1.0847611129534357e-44,6.4517286390879275e-41,4.1553081636901274e-74,3.0818933108425054e-74,0.16666666666666666,2.5107502752649599e-68,3.8023308307097173e-45,0.00024509803921568627,5.8065557751791348e-40,9.8598323797593167e-21,4.9591925264495952e-27,3.4699797302510845e-81,9.6082939312896144e-49,2.0289819099594638e-43,6.0125060125060129e-07,2.9414818539081259e-47,1.8565966901851903e-84,8.8477874038271364e-85,1.7157240517800021e-52,4.6418042047568207e-21,1.3483952091480052e-60,3.4396537403293868e-50,2.8593513901302015e-19,1.149031242659079e-57,8.8967913924505741e-22,3.3104217354843903e-53,2.8550309099212965e-28,4.8728818947364914e-61,2.9080068674237323e-54,6.1154762090514168e-22,1.7824604691022381e-81,1.7028643016207552e-54,2.9528660597193821e-28,8.9251216300887692e-70,1.3500019591741191e-40,9.5868895490850783e-73,2.3209021023784102e-22,4.7715646780945021e-24,2.3663597711422357e-18,0.032258064516129031,3.3962001700055058e-34,5.7353727988648623e-12,6.0189486099716185e-54,4.632454939806006e-51,3.1294552580683175e-64,1.5534323737586247e-44,1.4708266078165282e-34,3.2849177880341439e-74,5.5114638447971785e-06,2.867686399432431e-13,9.047970309158174e-32,3.706938526539503e-12,2.6079358269156578e-91,3.4713725072932462e-64,1.1245829017382083e-13,4.3739293591894904e-61,3.9358670844838056e-28,5.8829637078162521e-45,2.3235985824874404e-80,8.9011886690830809e-66,4.3553702093074894e-18,4.885780763645237e-86,1.9779717257566442e-75,3.0790598609210641e-63,4.7971231608901281e-75,1.5825723066195273e-37,8.3555106691380409e-78,4.8667370591514899e-09,4.5887116920966764e-44,2.4765470989727281e-07,1.4976721656006039e-54,2.4680431186075772e-18,3.5651755156105439e-66,7.6733627499367713e-09,3.1387443462229062e-31,7.102628853083421e-14,6.6137566137566142e-05,4.1219580965232446e-45,2.6166126332127972e-74,3.9898245557320782e-13,2.4359257706362614e-78,3.6658351155515408e-21,8.3613301719866107e-51,1.7012051075850628e-71,4.6285796913529549e-25,0.025000000000000001,0.16666666666666666,1.4050852731099812e-13,4.8543820058683465e-27,1.0841362790208905e-15,4.3615569637475501e-57,1.7542885058321705e-62,0.00033068783068783067,4.932381147974598e-17,4.7715646780945021e-24,1.5843045127957157e-47,1.8270230789719791e-81,1.4918801608919026e-21,1.3734370616966789e-22,1.4473698684225e-08,5.9623690184616663e-29,8.2345191040843218e-05,1.3271952653947001e-52,1.3819602744926341e-35,4.3366342498934191e-32,9.7550137023009456e-37,3.1408224971202773e-78,4.290999689096435e-77,5.1796526232647148e-77,4.3722864672004398e-12,3.9996293692550114e-48,4.9045549566647774e-64,6.4469596404571724e-67,1.5951866170609377e-56,3.6840058622475584e-61,1.3508021494907713e-61,2.0904663328419546e-57,7.5399752576318108e-33,1.6212545910300655e-56,3.6025036397812851e-69,2.1288301138277206e-42,1.9355185917263782e-39,5.6708973395409886e-71,0.00059523809523809529,0.5,6.2617949707146978e-29,7.0735364853011916e-07,1.9729216234933069e-70,1.326001924344357e-38,3.9358670844838056e-28,1.4943491330792604e-24,2.7362813434954155e-33,4.6418042047568206e-23,6.613756613756614e-06,3.661791930293148e-40,0.1111111111111111,4.1790478700657253e-32,2.5595033334971414e-08,4.96967357850772e-24,2.775002775002775e-06,1.8528597008043707e-14,2.2191891053694638e-46,7.4509053983970212e-41,0.0012315270935960591,4.4989859890944208e-63,1.5438014535955503e-72,1.0903892409368875e-57,1.1580103579273965e-92,1.1550343839782503e-77,6.3632032476807022e-71,2.5762910614878788e-72,7.7090356427224164e-41,1.839513704953679e-72,3.2261128259696563e-49,1.7466363805786243e-67,9.3754700860701152e-12,0.050000000000000003,1.0903892409368875e-57,2.0335205354497081e-75,2.9238141763869509e-64,2.5107502752649599e-68,6.0031752669576878e-59,1.6200077208224059e-50,1.3548630142084647e-38,2.2347061885979205e-76,1.9766758058262606e-42,2.2781913697518079e-10,1.826401310790973e-55,1.5408149851858065e-57,4.8535525468662038e-25,3.2866107932531052e-22,3.1764228805034249e-47,1.0112964068610038e-58,3.3602150537634409e-05,2.5368181707509932e-78,3.7765073166318785e-61,4.8690986183859631e-51,9.7684001543149277e-26,6.5342286216313468e-79,2.5471735078756962e-42,4.152913649098452e-84,1.6798443350871047e-45,1.9219609710409431e-35,5.6708973395409886e-71,2.4801587301587302e-05,6.8705492124506072e-79,1.2009275838546848e-16,8.3613301719866107e-51,1.3716466096809764e-52,1.9532903067808887e-71,1.860458219967633e-32,0.0003663003663003663,4.1219580965232446e-45,2.5013080475975055e-15,1.084725814874538e-46,1.084725814874538e-46,1.4707409269540631e-46,1.2560097671583551e-40,3.168468255181637e-26,4.1041593322341473e-25,6.0125060125060129e-07,2.9540529846206535e-66,2.5994103546638198e-21,2.8697383940567085e-47,6.3088298382416027e-07,1.7892192305517099e-84,1.8863570958491241e-09,1.2664486348696875e-08,4.6285796913529549e-25,4.4612320067837052e-62,1.3500019591741191e-40,2.1426048969171937e-40,2.08767569878681e-09,1.6074607735699763e-36,2.2781913697518079e-10,8.7561002991853295e-32,1.5326651403774133e-09,7.086878543326517e-26,7.7500512722561289e-24,3.27008824213495e-25,2.8018116058612252e-19,2.6364901898110663e-38,2.2893772893772894e-05,0.5,1.2871982213713287e-12,1.8124068943402034e-78,1.6602967607637554e-69,1.9766758058262606e-42,5.060505264142723e-89,7.2407270917222413e-83,9.114060296173208e-21,4.5321960453566253e-76,4.6355825113334095e-32,2.5284984029709511e-50,4.5145752654575619e-24,0.050000000000000003,1.4340737210880023e-50,5.5980998233750916e-30,3.1237925705310694e-68,2.073742602179219e-54,2.9498121689492552e-73,6.1356093114144501e-71,2.0132674607792638e-29,2.1497835877058668e-51,3.2887688028000125e-62,2.4513776796942137e-36,0.023255813953488372,0.038461538461538464,5.3012308933476242e-33,2.6885936359955231e-93,1.2944369619078858e-16,5.8065557751791348e-40,3.6597666079466791e-84]}

},{}],38:[function(require,module,exports){
module.exports={  "z": [1.0000000000000001e-15,4.1040080160320641e-17,9.0190180360721459e-16,1.511503006012024e-16,9.3793787575150302e-16,7.4574549098196396e-16,3.5535470941883773e-16,7.5375350701402809e-16,4.35434869739479e-16,8.5185170340681367e-16,2.3723647294589182e-16,6.8768737474949911e-16,5.3153106212424858e-16,5.8358316633266536e-16,5.5155110220440885e-16,8.6586573146292597e-16,6.5365330661322654e-16,5.815811623246494e-16,8.1981963927855716e-16,1.2112024048096193e-16,3.173166332665331e-16,8.4784769539078166e-16,3.9739679358717442e-16,7.3072144288577163e-17,2.4124048096192389e-16,5.6356312625250509e-16,2.8528456913827659e-16,5.6556513026052114e-16,5.4554509018036078e-16,7.4774749498998002e-16,3.1931863727454915e-16,3.6936873747494992e-16,2.902805611222445e-17,1.6516432865731463e-16,9.5195190380761531e-16,3.913907815631263e-16,1.5515430861723447e-16,7.857855711422847e-16,9.3993987975951917e-16,8.2782765531062129e-16,4.2742685370741487e-16,2.2522444889779563e-16,3.7937875751503011e-16,4.8148096192384776e-16,5.505410821643287e-17,4.1741683366733474e-16,2.7026052104208421e-17,4.1541482965931868e-16,2.6726653306613233e-16,5.7157114228456921e-16,3.4134068136272548e-16,5.2352304609218445e-16,7.2372344689378763e-16,6.9569539078156324e-16,9.9799799599198412e-16,4.5745691382765537e-16,8.9589579158316632e-16,9.5795791583166338e-16,2.1721643286573148e-16,3.9539478957915836e-16,7.9779759519038084e-16,1.4314228456913828e-16,5.3353306613226463e-16,4.5345290581162326e-16,1.3513426853707415e-16,1.4714629258517034e-16,5.9159118236472948e-16,5.2552505010020051e-16,9.7997995991983971e-16,3.613607214428858e-16,4.8948897795591188e-16,3.1030060120240482e-17,9.2792785571142303e-16,8.0580561122244496e-16,6.2762725450901811e-16,4.0540480961923855e-16,3.0530460921843691e-16,5.5555511022044096e-16,3.8538476953907823e-16,8.5785771543086184e-16,6.3062124248497003e-17,3.2132064128256516e-16,7.8378356713426864e-16,7.2972945891783571e-16,9.0990981963927862e-16,1.0110020040080162e-16,9.0590581162324651e-16,7.7977955911823653e-16,3.3133066132264534e-16,1.9519438877755513e-16,4.3343286573146299e-16,3.0930861723446897e-16,8.7987975951903817e-16,6.1961923847695398e-16,2.1020040080160322e-17,4.8548496993987977e-16,2.5325250501002008e-16,5.7557515030060123e-16,4.4344288577154313e-16,8.5385370741482973e-16,9.6996993987975953e-16,8.8588577154308624e-16,7.6576553106212433e-16,9.199198396793588e-16,4.0340280561122249e-16,9.3593587174348706e-16,9.4994989979959936e-16,2.1321242484969942e-16,9.6396392785571146e-16,1.0310220440881765e-16,5.0350300601202408e-16,4.514509018036073e-16,1.8518436873747495e-16,9.7096192384769557e-17,6.1361322645290591e-16,5.4354308617234472e-16,2.8928857715430865e-16,2.6326252505010026e-16,7.0170140280561131e-16,4.8748697394789583e-16,2.8728657314629264e-16,1.5014028056112227e-17,6.8168136272545094e-16,8.9789779559118248e-16,1.101002004008016e-17,2.7927855711422852e-16,9.8598597194388778e-16,3.3533466933867741e-16,1.2912825651302605e-16,4.8348296593186381e-16,4.6346292585170345e-16,2.5024048096192389e-17,2.5725651302605214e-16,6.5064128256513035e-17,2.3323246492985976e-16,9.6596593186372761e-16,3.033026052104209e-16,8.6186172344689386e-16,6.2162124248497004e-16,5.6156112224448903e-16,1.1511422845691383e-16,6.83683366733467e-16,2.2722645290581164e-16,6.1060120240480971e-17,3.3032064128256513e-17,1.571563126252505e-16,7.3573547094188387e-16,8.738737474949901e-16,5.1951903807615234e-16,6.9369338677354718e-16,8.7787775551102211e-16,1.6916833667334669e-16,6.7367334669338681e-16,9.8798797595190394e-16,9.5395390781563127e-16,8.8988977955911825e-16,9.5094188376753513e-17,9.9399398797595201e-16,5.8558517034068141e-16,1.7117034068136272e-16,7.4974949899799607e-16,3.473466933867736e-16,4.9549498997995996e-16,5.3052104208416838e-17,4.9749699398797601e-16,4.9149098196392794e-16,3.5135070140280566e-16,9.9199198396793605e-16,3.5735671342685373e-16,1.0710621242484972e-16,4.0740681362725455e-16,6.7066132264529067e-17,7.8978957915831671e-16,1.5315230460921844e-16,4.3042084168336673e-17,4.7747695390781564e-16,9.2192184368737476e-16,4.794789579158317e-16,9.339338677354711e-16,8.598597194388778e-16,7.7577555110220451e-16,3.0730661322645296e-16,6.3163126252505012e-16,9.1391382765531073e-16,5.675671342685371e-16,8.4184168336673359e-16,1.4114028056112225e-16,4.654649298597195e-16,3.6536472945891786e-16,4.6746693386773556e-16,7.9179158316633277e-16,7.9078156312625258e-17,3.7737675350701405e-16,3.7537474949899804e-16,7.5975951903807626e-16,4.3943887775551106e-16,9.8398396793587182e-16,8.108016032064129e-17,1.3713627254509018e-16,2.7127054108216439e-16,2.612605210420842e-16,7.9979959919839689e-16,7.1171142284569149e-16,2.292284569138277e-16,1.5915831663326653e-16,3.2332264529058122e-16,7.7777755511022057e-16,8.1381362725450909e-16,1.3113026052104209e-16,3.4534468937875754e-16,1.2512424849699399e-16,9.8998997995991989e-16,6.2562525050100205e-16,5.6956913827655316e-16,3.0130060120240484e-16,1.2712625250501002e-16,7.3173146292585176e-16,8.1581563126252515e-16,6.9169138276553112e-16,7.3773747494989983e-16,9.9098196392785589e-17,9.2992985971943899e-16,6.7767735470941893e-16,6.0960921843687379e-16,4.7347294589178363e-16,4.934929859719439e-16,5.075070140280562e-16,2.3923847695390783e-16,9.0790781563126266e-16,8.0780761523046102e-16,9.2392384769539092e-16,2.9729659318637278e-16,5.4954909819639289e-16,4.5044088176352704e-17,7.6176152304609221e-16,5.1050100200400806e-17,8.2582565130260533e-16,1.9919839679358719e-16,1.3313226452905812e-16,1.9119038076152304e-16,9.7597595190380779e-16,1.1111022044088177e-16,1.131122244488978e-16,8.3983967935871753e-16,1.0510420841683368e-16,4.2342284569138281e-16,6.1561523046092187e-16,9.3193186372745495e-16,3.5034068136272545e-17,4.1341282565130267e-16,8.2182164328657322e-16,6.3763727454909829e-16,6.4964929859719443e-16,8.2382364729458928e-16,5.2152104208416839e-16,2.0120040080160323e-16,2.0920841683366735e-16,4.5945891783567143e-16,8.6786773547094193e-16,1.4514428857715431e-16,6.6166132264529067e-16,9.5595591182364743e-16,7.3373346693386782e-16,5.7757715430861729e-16,7.6776753507014038e-16,3.3333266533066135e-16,5.1351302605210427e-16,2.6526452905811627e-16,9.1591583166332669e-16,1.931923847695391e-16,4.4744689378757519e-16,9.1791783567134285e-16,7.6376352705410827e-16,6.8968937875751507e-16,2.4524448897795595e-16,1.901803607214429e-17,6.976973947895792e-16,7.0060120240480964e-18,3.3933867735470947e-16,2.5125050100200402e-16,6.9969939879759525e-16,4.214208416833668e-16,8.6386372745490991e-16,5.1751703406813638e-16,9.1191182364729478e-16,8.3583567134268542e-16,7.5575551102204414e-16,7.5074148296593194e-17,5.8758717434869747e-16,6.556553106212426e-16,1.1711623246492986e-16,5.0550501002004014e-16,4.4944889779559125e-16,8.0380360721442891e-16,7.1971943887775562e-16,4.7547494989979969e-16,6.1161122244488985e-16,6.9068136272545099e-17,6.7567535070140287e-16,4.2942885771543093e-16,4.7046092184368736e-17,1.8918837675350701e-16,2.3022044088176354e-17,5.4154108216432876e-16,1.7917835671342685e-16,5.0950901803607215e-16,7.0770741482965938e-16,6.6366332665330673e-16,6.6766733466933874e-16,3.1531462925851709e-16,1.6116032064128256e-16,7.4174148296593195e-16,3.6336272545090185e-16,3.7337274549098199e-16,3.1131062124248503e-16,4.0140080160320648e-16,7.0370340681362737e-16,3.7036072144288577e-17,8.3783767535070147e-16,8.0180160320641295e-16,1.9719639278557116e-16,4.6946893787575152e-16,1.7717635270541082e-16,5.0040080160320645e-18,8.6986973947895798e-16,4.1941883767535075e-16,5.7957915831663334e-16,5.3753707414829665e-16,8.2982965931863735e-16,2.8128056112224452e-16,7.1571543086172351e-16,9.0080160320641282e-18,9.9599599198396796e-16,4.9949899799599207e-16,1.3012024048096195e-17,8.9088176352705417e-17,7.1371342685370745e-16,8.7086172344689385e-17,3.2732665330661328e-16,7.9579559118236478e-16,5.4754709418837683e-16,1.7317234468937875e-16,5.5955911823647297e-16,7.1771743486973956e-16,1.0910821643286575e-16,1.3913827655310621e-16,2.3523446893787577e-16,4.5545490981963932e-16,1.8118036072144288e-16,2.4924849699398801e-16,3.1331262525050103e-16,5.535531062124249e-16,5.9359318637274554e-16,2.9929859719438883e-16,7.2572545090180369e-16,2.0720641282565132e-16,6.5765731462925856e-16,9.5995991983967954e-16,7.43743486973948e-16,7.7377354709418845e-16,3.5935871743486979e-16,8.0980961923847708e-16,6.7967935871743498e-16,7.2172144288577158e-16,5.2952905811623252e-16,6.5165130260521049e-16,6.3963927855711425e-16,8.9389378757515037e-16,6.3363326653306618e-16,7.7076152304609226e-17,5.9759719438877765e-16,7.8778757515030065e-16,8.5084168336673354e-17,6.5965931863727462e-16,8.5585571142284579e-16,8.4984969939879771e-16,5.1551503006012032e-16,9.4394388777555128e-16,2.1521442885771545e-16,1.7016032064128259e-17,9.4194188376753513e-16,5.3553507014028059e-16,3.8938877755511029e-16,4.3143086172344694e-16,8.9189178356713441e-16,1.0000000000000001e-18,4.0940881763527061e-16,3.9939879759519043e-16,2.2122044088176354e-16,9.0390380761523055e-16,1.6716633266533066e-16,4.7147094188376757e-16,5.955951903807616e-16,4.4544488977955913e-16,9.8198196392785587e-16,1.631623246492986e-16,2.312304609218437e-16,8.1181162324649304e-16,8.318316633266534e-16,3.6736673346693392e-16,8.178176352705412e-16,1.8718637274549098e-16,6.4564529058116242e-16,3.9339278557114236e-16,1.7517434869739479e-16,7.1070140280561131e-17,6.2962925851703416e-16,8.458456913827656e-16,9.3092184368737481e-17,6.4364328657314636e-16,2.9129058116232471e-16,4.4144088176352712e-16,6.0360320641282572e-16,5.7357314629258527e-16,9.4594589178356724e-16,3.4334268537074154e-16,3.8138076152304612e-16,5.0150100200400803e-16,7.0970941883767544e-16,8.4384368737474954e-16,2.1121042084168338e-16,6.7167134268537086e-16,4.2542484969939887e-16,9.619619238476955e-16,3.2532464929859722e-16,9.7197194388777568e-16,6.416412825651303e-16,7.5175150300601213e-16,7.9379358717434882e-16,5.2752705410821646e-16,3.7137074148296598e-16,8.8788777555110229e-16,2.0320240480961926e-16,8.7587575150300605e-16,3.4934869739478961e-16,6.0760721442885774e-16,7.577575150300602e-16,6.3563527054108223e-16,6.8568537074148305e-16,8.8188176352705422e-16,4.9048096192384774e-17,1.4914829659318637e-16,8.8388376753507018e-16,2.6926853707414833e-16,7.8178156312625258e-16,7.0570541082164332e-16,2.4724649298597196e-16,2.9529458917835677e-16,6.4764729458917847e-16,2.9329258517034071e-16,2.5525450901803608e-16,1.2312224448897796e-16,4.1141082164328662e-16,2.732725450901804e-16,6.0160120240480967e-16,2.0520440881763529e-16,3.9038076152304609e-17,2.592585170340682e-16,4.3743687374749506e-16,5.905811623246494e-17,6.696693386773548e-16,5.9959919839679361e-16,6.1761723446893792e-16,6.2362324649298599e-16,4.6146092184368739e-16,1.1911823647294589e-16,9.6796793587174357e-16,9.7397394789579164e-16,2.4324248496993989e-16,6.0560521042084178e-16,7.6976953907815644e-16,7.3973947895791589e-16,9.479478957915832e-16,1.8318236472945891e-16,3.3733667334669341e-16,5.1151102204408821e-16,8.3383366733466946e-16,2.2322244488977958e-16,5.7056112224448908e-17,8.3082164328657322e-17,8.7187174348697404e-16,3.8738677354709424e-16,3.8338276553106217e-16,8.9989979959919844e-16,5.8958917835671353e-16,5.5755711422845702e-16,2.7527454909819645e-16,9.2592585170340687e-16,2.8328256513026058e-16,3.5335270541082167e-16,2.1921843687374751e-16,2.7727655310621246e-16,3.2932865731462929e-16,9.1090180360721449e-17,7.717715430861724e-16,7.2772745490981975e-16,5.395390781563127e-16,3.0020040080160323e-18,9.7797795591182375e-16,6.6566533066132269e-16],  "delta": [191.78356713426854,291.18236472945893,241.48296593186373,267.5350701402806,109.21843687374749,202.60521042084167,234.66933867735472,107.61523046092185,188.57715430861725,116.83366733466934,281.16232464929863,159.71943887775552,209.0180360721443,271.54308617234472,211.82364729458919,184.16833667334669,205.81162324649299,286.77354709418842,141.68336673346693,167.33466933867737,244.68937875751504,263.52705410821648,112.82565130260521,158.51703406813627,175.75150300601203,204.60921843687373,190.58116232464931,233.46693386773546,213.02605210420842,243.88777555110221,123.24649298597194,132.86573146292585,189.37875751503006,269.13827655310621,278.75751503006012,144.88977955911824,239.07815631262525,162.92585170340681,146.49298597194388,248.69739478957916,195.79158316633266,282.36472945891785,295.59118236472943,263.92785571142286,259.91983967935869,215.83166332665331,196.59318637274549,142.48496993987976,193.38677354709421,199.79959919839678,299.19839679358722,276.75350701402806,118.8376753507014,277.95591182364728,116.03206412825651,124.8496993987976,273.94789579158316,198.99799599198397,293.98797595190382,128.85771543086173,186.17234468937875,192.58517034068137,107.21442885771543,187.77555110220442,258.31663326653307,200.20040080160322,299.59919839679355,184.5691382765531,171.34268537074149,259.11823647294591,267.93587174348698,296.79358717434872,251.10220440881764,257.51503006012024,289.57915831663331,136.87374749498997,183.7675350701403,175.35070140280561,274.749498997996,297.1943887775551,253.90781563126254,102.00400801603206,291.98396793587176,156.51302605210421,236.27254509018036,168.13627254509018,274.34869739478961,266.33266533066131,101.20240480961924,228.25651302605212,294.38877755511021,244.28857715430863,284.7695390781563,127.65531062124248,241.08216432865731,233.86773547094188,239.47895791583167,228.65731462925851,161.32264529058116,179.35871743486973,101.60320641282566,248.29659318637275,234.2685370741483,104.40881763527054,105.21042084168337,201.40280561122245,243.08617234468937,140.4809619238477,125.250501002004,190.1803607214429,215.03006012024048,145.69138276553107,289.17835671342687,265.93186372745492,153.70741482965931,237.47494989979961,287.57515030060119,141.28256513026054,181.76352705410824,265.13026052104209,162.52505010020042,253.1062124248497,271.14228456913827,237.87575150300603,207.81563126252507,257.11422845691379,181.36272545090179,283.96793587174352,298.79759519038078,285.17034068136275,183.36673346693385,227.45490981963928,219.43887775551104,277.55511022044089,247.49498997995991,235.07014028056113,189.77955911823648,218.63727454909821,280.76152304609218,212.62525050100203,278.35671342685373,260.32064128256513,176.95390781563128,150.90180360721445,243.48697394789579,172.14428857715433,279.15831663326651,174.94989979959919,199.39879759519039,113.22645290581163,230.6613226452906,130.46092184368737,272.74549098196394,119.23847695390782,255.11022044088176,264.32865731462925,200.60120240480961,156.91382765531063,254.70941883767534,300,226.65330661322645,182.16432865731463,294.78957915831666,232.26452905811624,192.18436873747495,110.82164328657315,287.17434869739481,238.67735470941884,235.47094188376755,122.0440881763527,164.52905811623248,297.99599198396794,261.52304609218436,270.74148296593188,155.31062124248496,295.99198396793588,160.52104208416833,151.30260521042084,118.43687374749499,204.20841683366734,262.32464929859719,120.44088176352706,174.14829659318639,117.23446893787576,254.30861723446895,137.27454909819639,203.40681362725451,198.59719438877755,159.3186372745491,134.46893787575152,117.63527054108216,216.63326653306615,178.95791583166334,203.00601202404812,110.42084168336673,194.58917835671343,122.44488977955912,154.90981963927857,247.89579158316633,285.97194388777552,165.7314629258517,272.34468937875749,202.20440881763528,109.61923847695391,194.18837675350701,221.4428857715431,269.5390781563126,217.03406813627254,250.70140280561122,120.04008016032064,143.68737474949899,226.25250501002006,118.03607214428858,142.88577154308618,123.64729458917836,249.09819639278558,208.21643286573146,148.89779559118236,277.15430861723451,135.67134268537075,114.42885771543087,225.45090180360722,201.80360721442887,293.18637274549098,193.7875751503006,219.83967935871743,276.35270541082161,275.15030060120239,195.39078156312627,151.70340681362725,260.72144288577158,186.57314629258519,213.82765531062125,192.98597194388776,130.06012024048096,185.77154308617236,253.50701402805612,154.10821643286573,229.05811623246493,286.37274549098197,206.61322645290582,144.48897795591182,139.67935871743487,222.64529058116233,250.30060120240481,172.94589178356713,108.81763527054107,157.71543086172346,169.73947895791582,116.43286573146293,196.19238476953907,285.57114228456913,170.54108216432866,249.89979959919839,283.56713426853707,291.58316633266531,114.02805611222445,173.74749498997994,160.12024048096191,231.4629258517034,121.6432865731463,120.84168336673346,296.39278557114233,158.11623246492985,245.49098196392785,111.62324649298597,273.54709418837672,182.56513026052104,164.12825651302606,251.90380761523048,170.14028056112227,203.80761523046093,185.37074148296594,224.248496993988,221.84368737474949,261.12224448897797,223.44689378757516,281.9639278557114,149.29859719438878,261.9238476953908,106.81362725450902,270.34068136272549,128.0561122244489,262.72545090180358,150.10020040080161,191.38276553106215,124.04809619238478,252.70541082164328,198.19639278557116,263.12625250501003,106.41282565130261,138.07615230460922,108.01603206412825,268.73747494989982,255.51102204408818,213.42685370741484,121.24248496993988,279.55911823647295,147.69539078156313,148.49699398797594,210.22044088176352,176.15230460921845,245.89178356713427,266.7334669338677,232.66533066132266,165.33066132264531,176.55310621242484,152.10420841683367,235.87174348697394,256.31262525050101,130.86172344689379,273.14629258517039,100.80160320641282,284.36873747494991,209.41883767535069,145.29058116232466,194.98997995991982,115.23046092184369,258.71743486973946,160.92184368737475,140.08016032064128,282.7655310621243,249.498997995992,223.04609218436875,271.9438877755511,177.75551102204409,102.40480961923848,287.97595190380764,289.97995991983964,245.09018036072143,102.8056112224449,144.0881763527054,108.41683366733467,177.35470941883767,231.86372745490982,126.85370741482966,154.50901803607215,288.37675350701403,214.22845691382764,136.47294589178358,104.80961923847696,100,255.9118236472946,137.67535070140281,173.34669338677355,147.29458917835672,196.99398797595191,131.66332665330663,216.2324649298597,114.82965931863727,155.7114228456914,264.7294589178357,219.0380761523046,132.46492985971943,119.63927855711422,241.88376753507015,136.07214428857716,268.33667334669337,180.16032064128257,239.87975951903809,265.53106212424848,225.85170340681361,126.45290581162325,229.45891783567134,103.60721442885772,178.15631262525051,126.05210420841684,220.64128256513027,224.64929859719439,218.23647294589179,150.501002004008,164.92985971943887,257.91583166332668,205.41082164328657,247.09418837675352,197.79559118236472,129.65931863727454,142.08416833667334,251.50300601202406,215.4308617234469,217.43486973947896,267.13426853707415,168.93787575150301,170.94188376753507,132.06412825651302,236.67334669338678,201.00200400801603,146.8937875751503,171.74348697394788,152.90581162324651,259.5190380761523,133.26653306613227,180.9619238476954,139.27855711422845,167.73547094188376,292.78557114228454,161.72344689378758,131.26252505010021,166.53306613226454,153.3066132264529,112.42484969939881,166.93386773547093,292.38476953907815,113.62725450901803,290.38076152304609,143.2865731462926,256.71342685370746,279.9599198396794,112.02404809619239,115.6312625250501,207.01402805611224,122.84569138276554,210.62124248496994,103.2064128256513,209.81963927855713,231.06212424849699,188.17635270541081,229.85971943887776,148.09619238476955,293.58717434869743,163.32665330661322,220.24048096192385,237.07414829659319,187.374749498998,106.01202404809619,298.39679358717433,290.78156312625254,104.00801603206413,133.66733466933869,205.01002004008018,280.36072144288579,105.61122244488978,179.75951903807615,211.42284569138278,152.50501002004009,221.04208416833666,182.96593186372746,297.59519038076155,140.88176352705412,157.31462925851704,207.41482965931863,208.61723446893788,135.27054108216433,295.19038076152304,242.68537074148298,163.72745490981964,128.45691382765531,110.02004008016033,180.56112224448898,100.40080160320642,283.16633266533063,269.93987975951904,230.26052104208418,217.83567134268537,275.55110220440883,186.97394789579158,223.84769539078155,227.8557114228457,197.39478957915833,111.22244488977955,211.02204408817636,134.86973947895791,156.11222444889779,281.56312625250501,149.69939879759519,174.54909819639278,129.25851703406815,172.54509018036072,222.24448897795591,162.124248496994,138.47695390781564,275.95190380761522,225.05010020040081,178.5571142284569,206.2124248496994,138.87775551102203,252.30460921843687,238.27655310621242,184.96993987975952,146.09218436873749,233.06613226452907,158.91783567134269,240.28056112224451,246.29258517034069,166.13226452905812,246.6933867735471,168.5370741482966,188.97795591182364,125.65130260521042,127.25450901803607,214.62925851703409,227.05410821643287,190.9819639278557,212.22444889779558,124.44889779559118,240.6813627254509,288.77755511022042,242.28456913827657,169.33867735470943,134.06813627254508],  "expected": [0,0,0,0,2.8908049550807439e-160,0,0,6.5376435991806777e-157,0,7.6328084010128681e-176,0,2.0472678875757639e-267,0,0,0,3.9525251667299724e-322,0,0,3.0817679551743174e-228,1.6549208660232749e-283,0,0,2.9031823284073401e-167,8.5217474443255456e-264,1.3311582430790293e-302,0,0,0,0,0,9.6920993572897429e-189,4.6657223035181204e-209,0,0,0,7.9637359758539546e-235,0,1.5094632109385235e-274,1.1339453110744187e-238,0,0,0,0,0,0,0,0,1.1475608467472839e-229,0,0,0,0,6.4021998141789955e-180,0,2.9416681599007171e-174,2.9967459804342685e-192,0,0,0,1.3086974908133966e-200,0,0,6.0080209992603691e-156,0,0,0,0,7.9050503334599447e-323,2.4158604167955851e-293,0,0,0,0,0,0,1.2539615138862538e-217,9.0809265705621115e-321,4.5815981145121099e-302,0,0,0,3.2411143746741827e-145,0,2.1468317845639567e-260,0,3.2735168598018479e-285,0,0,1.2717386115738827e-143,0,0,0,0,2.8475400016445417e-198,0,0,0,0,9.2892138324323701e-271,2.9235607260506075e-311,6.8349128159994636e-145,0,0,1.6458625528881776e-150,9.0470893597767485e-152,0,0,4.5330121823087209e-225,2.0564667173944657e-193,0,0,1.2795589881696517e-236,0,0,3.5416190888086755e-254,0,0,6.9745943344879865e-227,1.3405840872138132e-316,0,3.1741739231775621e-273,0,0,0,0,0,7.6650986570017765e-316,0,0,0,4.8285035568065025e-320,0,0,0,0,0,0,0,0,0,0,0,2.8225606012338802e-305,4.6898756333619776e-247,0,2.4405338242944875e-294,0,2.3065385109083947e-301,0,2.5048695385845153e-168,0,1.2617796830146591e-203,0,6.9174210971286177e-181,0,0,0,2.0812778047742485e-261,0,0,0,3.3678775253801917e-317,0,0,0,2.9645030377852207e-163,0,0,0,9.334636841470619e-186,8.2515539108618425e-278,0,0,0,1.5707865406032381e-256,0,2.6173936448391272e-269,8.0033327209305651e-249,3.3589395639150442e-179,0,0,7.079270966662823e-183,1.9956098461792844e-299,1.0565864140632215e-176,0,8.4155641230508419e-219,0,0,2.938892384109403e-266,1.4480470257162349e-212,1.8086880087597357e-177,0,5.2860973675429697e-310,0,1.2623419557792323e-162,0,1.4827646643117115e-187,6.2884889159682298e-256,0,0,2.78194613259424e-280,0,0,1.8048855698552793e-160,0,0,0,0,0,4.2881543451818937e-182,9.7913747845804996e-232,0,3.3902282816649734e-178,1.1477393369804869e-230,1.4930679572828008e-189,0,0,7.9934988809438132e-244,0,2.5279826600747572e-215,5.939423589658778e-170,0,0,0,0,0,0,0,0,6.3590361804335914e-250,0,0,0,0,1.9698577825876458e-203,0,0,1.4511733285938436e-254,0,0,0,2.0572053518250706e-233,4.4770059114711351e-223,0,0,1.4619892425779105e-296,2.8821492087924677e-159,3.8592287396408162e-263,2.545863647428794e-288,1.0575545911932223e-174,0,0,2.2410367333205824e-291,0,0,0,1.8759748744871279e-169,2.1664831297158986e-298,2.1248556440176442e-268,0,1.0340801061328031e-185,3.3387058912975959e-184,0,8.1977355555991493e-264,0,1.0044383598097651e-164,0,5.4793510540425518e-318,2.8329551640989884e-277,0,2.5479503477939545e-290,0,0,0,0,0,0,0,2.5890998170126424e-244,0,2.9755668891099059e-155,0,2.9272131877833989e-199,0,1.7431325847592453e-246,0,8.6411029102900986e-191,0,0,0,1.1529124711898351e-153,2.7123177213117966e-220,1.6829714899589072e-157,0,0,0,7.6456856160295068e-185,0,3.9210768927786463e-241,1.1259377301701394e-242,0,2.1395530756317501e-303,0,0,0,1.104268640481147e-279,7.2028477065796024e-305,1.0350202103973615e-250,0,0,1.8817259344863294e-204,0,7.3585890727247683e-143,0,0,1.0576983459373249e-235,0,3.5592455499572773e-171,0,3.9340549771188733e-270,3.5497621116084308e-224,0,0,0,0,2.4141117475414501e-307,2.8182183073457611e-146,0,0,0,3.5736894155794992e-147,1.8587551805800074e-231,1.1640110265449317e-158,1.6140476504891005e-306,0,9.6054385811392218e-196,5.3819002525584399e-256,0,0,4.5784602003160657e-217,4.2964385929519824e-151,6.1875369883536908e-141,0,1.3740123618551498e-219,7.1978797641112651e-297,1.4071987044939701e-239,0,1.3390259810917468e-206,0,3.5364621968405205e-171,2.8584558007472685e-258,0,0,4.0777631998839761e-208,1.3871708956044489e-181,0,3.9660309590607625e-216,0,5.2417182343773828e-313,0,0,0,8.751391490907839e-196,0,1.1788643731156922e-148,1.9496236020117096e-308,6.455592238243929e-195,0,0,0,3.5721124803474746e-247,5.5232962691971947e-279,0,0,0,0,2.0437387901164473e-202,3.6786475679234895e-229,0,0,0,0,1.3979483042090319e-287,4.3052853756663788e-292,9.6790673995795329e-208,0,0,3.6189171772607809e-239,1.3627974021143998e-293,1.3545340263547434e-252,0,5.1552456114378675e-210,1.0185764710187324e-314,8.2148750187651632e-223,2.6241300321289958e-285,0,2.3240587833855558e-271,5.3007331592279958e-206,1.4538284703741498e-282,4.4425548955916581e-253,9.3533482059835496e-167,8.3215963879920108e-283,0,6.6429560166669872e-169,0,1.2599246249851913e-230,0,0,5.4401632366233615e-165,3.0585166544127132e-173,0,4.816857004272048e-188,0,6.9719817052207282e-148,0,0,0,0,5.0458029622698041e-242,0,7.2973008455824296e-275,0,0,0,2.687632996657811e-153,0,0,1.294229501414933e-149,4.3131692514844976e-211,0,0,6.3670924106133936e-153,1.5358965632200877e-311,0,2.6264839369942423e-251,0,2.3811493801318877e-319,0,1.9439151174799138e-226,3.094648520700528e-262,0,0,1.5069013796526042e-214,0,0,2.8351542357093451e-276,1.4639538143703146e-199,2.1347582568358096e-161,7.5123533486130416e-314,5.7758210043671027e-142,0,0,0,0,0,0,0,0,0,3.7425685708808648e-163,0,1.5845477658559661e-213,1.9188427921687286e-259,0,2.5623094799510922e-245,1.3387407827547888e-299,7.6327038316091123e-202,5.0052177547760941e-296,0,1.1564991686754102e-272,2.4735465489767719e-221,0,0,8.6946162648498142e-309,0,5.1633904021731279e-222,0,0,9.3872472709836843e-323,9.4495973302285713e-237,0,2.1118876672846934e-265,0,0,1.5909138465498873e-281,0,1.5426311646574354e-286,0,1.010614954866794e-193,3.4796276799523633e-197,0,0,0,0,1.2267836565506799e-191,0,0,0,7.1281637078113829e-289,7.2364247011124503e-212]}

},{}],39:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var gammaDeltaRatio = require( './../lib' );


// FIXTURES //

var decimalsIntegers = require( './fixtures/cpp/decimals_integers.json' );
var largeIntegers = require( './fixtures/cpp/large_integers.json' );
var smallIntegers = require( './fixtures/cpp/small_integers.json' );
var largeTiny = require( './fixtures/cpp/large_tiny.json' );
var tinyLarge = require( './fixtures/cpp/tiny_large.json' );
var decimals = require( './fixtures/cpp/decimals.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof gammaDeltaRatio, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` for either parameter', function test( t ) {
	var v;

	v = gammaDeltaRatio( NaN, 5.0 );
	t.equal( isnan( v ), true, 'returns NaN' );

	v = gammaDeltaRatio( 1.0, NaN );
	t.equal( isnan( v ), true, 'returns NaN' );

	v = gammaDeltaRatio( NaN, NaN );
	t.equal( isnan( v ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `0` for very large `z` and negligible `delta`', function test( t ) {
	var v;

	v = gammaDeltaRatio( 1.0e100, 20.7 );
	t.equal( v, 0.0, 'returns 0' );

	v = gammaDeltaRatio( 1.0e120, 100.1 );
	t.equal( v, 0.0, 'returns 0' );

	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (decimals)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = decimals.z;
	diff = decimals.delta;
	expected = decimals.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 100.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (small integers)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = smallIntegers.z;
	diff = smallIntegers.delta;
	expected = smallIntegers.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 10.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (large integers)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = largeIntegers.z;
	diff = largeIntegers.delta;
	expected = largeIntegers.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 150.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (non-integer `z`, integer `delta`)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = decimalsIntegers.z;
	diff = decimalsIntegers.delta;
	expected = decimalsIntegers.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 100.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (tiny `z`, large `delta`)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = tinyLarge.z;
	diff = tinyLarge.delta;
	expected = tinyLarge.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 100.0 * EPS * abs( expected[ i ] );

		// Handle cases where either the expected value is zero or `v` is zero and the expected value is very small...
		if ( tol < 1.0e-300 ) {
			tol = 1.0e-300;
		}
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (large `z`, tiny `delta`)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = largeTiny.z;
	diff = largeTiny.delta;
	expected = largeTiny.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/gamma-delta-ratio/test/test.js")
},{"./../lib":32,"./fixtures/cpp/decimals.json":33,"./fixtures/cpp/decimals_integers.json":34,"./fixtures/cpp/large_integers.json":35,"./fixtures/cpp/large_tiny.json":36,"./fixtures/cpp/small_integers.json":37,"./fixtures/cpp/tiny_large.json":38,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":17,"@stdlib/math/constants/float64-eps":104,"tape":174}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":78}],41:[function(require,module,exports){
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

},{"./gamma_lanczos_sum.js":40}],42:[function(require,module,exports){
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

},{"./small_approximation.js":44,"./stirling_approximation.js":45,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":17,"@stdlib/math/base/special/floor":29,"@stdlib/math/base/special/sin":68,"@stdlib/math/base/tools/evalrational":78,"@stdlib/math/constants/float64-ninf":113,"@stdlib/math/constants/float64-pi":114,"@stdlib/math/constants/float64-pinf":115}],43:[function(require,module,exports){
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

},{"./gamma.js":42}],44:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":105}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":24,"@stdlib/math/base/special/pow":54,"@stdlib/math/base/tools/evalpoly":75,"@stdlib/math/constants/float64-sqrt-two-pi":117}],46:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number on `[-pi/4, pi/4]`.
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

},{"./kernel_cos.js":47}],47:[function(require,module,exports){
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
	2.48015872894767294178e-05  // 0x3EFA01A0, 0x19CB1590
];
var C46 = [
	-2.75573143513906633035e-07, // 0xBE927E4F, 0x809C52AD
	2.08757232129817482790e-09, // 0x3E21EE9E, 0xBDB4B1C4
	-1.13596475577881948265e-11 // 0xBDA8FAE9, 0xBE8838D4
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
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine (in radians)
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

},{"@stdlib/math/base/tools/evalpoly":75}],48:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number on `[-pi/4, pi/4]`.
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

},{"./kernel_sin.js":49}],49:[function(require,module,exports){
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
* @param {number} x - input value (assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine (in radians)
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
	if ( y === 0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
} // end FUNCTION kernelSin()


// EXPORTS //

module.exports = kernelSin;

},{}],50:[function(require,module,exports){
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

},{"./ldexp.js":51}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":21,"@stdlib/math/base/utils/float64-exponent":80,"@stdlib/math/base/utils/float64-from-words":82,"@stdlib/math/base/utils/float64-normalize":90,"@stdlib/math/base/utils/float64-to-words":98,"@stdlib/math/constants/float64-exponent-bias":106,"@stdlib/math/constants/float64-max-base2-exponent":111,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":110,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":112,"@stdlib/math/constants/float64-ninf":113,"@stdlib/math/constants/float64-pinf":115}],52:[function(require,module,exports){
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

},{"./log1p.js":53}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":75,"@stdlib/math/base/utils/float64-get-high-word":86,"@stdlib/math/base/utils/float64-set-high-word":93,"@stdlib/math/constants/float64-exponent-bias":106,"@stdlib/math/constants/float64-ninf":113,"@stdlib/math/constants/float64-pinf":115}],54:[function(require,module,exports){
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

},{"./pow.js":57}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":75,"@stdlib/math/base/utils/float64-get-high-word":86,"@stdlib/math/base/utils/float64-set-high-word":93,"@stdlib/math/base/utils/float64-set-low-word":95,"@stdlib/math/constants/float64-exponent-bias":106}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":75,"@stdlib/math/base/utils/float64-set-low-word":95}],57:[function(require,module,exports){
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

},{"./log2ax.js":55,"./logx.js":56,"./pow2.js":58,"./x_is_zero.js":59,"./y_is_huge.js":60,"./y_is_infinite.js":61,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":17,"@stdlib/math/base/special/sqrt":70,"@stdlib/math/base/utils/float64-get-high-word":86,"@stdlib/math/base/utils/float64-get-low-word":88,"@stdlib/math/base/utils/float64-set-low-word":95,"@stdlib/math/base/utils/float64-to-words":98,"@stdlib/math/base/utils/uint32-to-int32":101,"@stdlib/math/constants/float64-ninf":113,"@stdlib/math/constants/float64-pinf":115}],58:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":50,"@stdlib/math/base/tools/evalpoly":75,"@stdlib/math/base/utils/float64-get-high-word":86,"@stdlib/math/base/utils/float64-set-high-word":93,"@stdlib/math/base/utils/float64-set-low-word":95,"@stdlib/math/base/utils/uint32-to-int32":101,"@stdlib/math/constants/float64-exponent-bias":106,"@stdlib/math/constants/float64-ln-two":109}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":21,"@stdlib/math/constants/float64-ninf":113,"@stdlib/math/constants/float64-pinf":115}],60:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":86}],61:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":17,"@stdlib/math/constants/float64-pinf":115}],62:[function(require,module,exports){
'use strict';

/**
* Compute `x - n*pi/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var x = 128.0;
* var y = new Array( 2 );
* var n = rempio2( x, y );
* // returns 81.0
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

},{"./rempio2.js":64}],63:[function(require,module,exports){
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
* Table of constants for `2/pi` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (24*i)-th to (24*i+23)-th bit of `2/pi` after binary point. The corresponding floating value is
*
* ``` tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
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
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Collection} y - output result in an array of double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/pi`
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
	// eslint-disable-next-line no-plusplus
	for ( i = 0; j > 0; i++, j-- ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
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
* Returns the last three binary digits of `N` with `y = x - N*pi/2` so that `|y| < pi/2`.
*
* ## Method
*
* * The method is to compute the integer (mod 8) and fraction parts of `(2/pi)*x` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals 0 mod 8 ). Thus, the number of operations is independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Collection} y - output result in an array of double precision numbers
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
	// eslint-disable-next-line no-plusplus
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
	return compute( x, y, jz, Q, q0, jk, jv, jx, F );
} // end FUNCTION kernelRempio2()


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/math/base/special/floor":29,"@stdlib/math/base/special/ldexp":50}],64:[function(require,module,exports){
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
* * The function does not perform input validation for `y` due to performance considerations. You should ensure to only supply an array, typed array, or an array-like object for `y`.
*
*
* @param {number} x - input value
* @param {Collection} y - remainder elements
* @returns {integer} factor of `pi/2`
*
* @example
* var x = 128.0;
* var y = new Array( 2 );
* var n = rempio2( x, y );
* // returns 81.0
*
* var y1 = y[ 0 ];
* // returns ~0.765
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = new Array( 2 );
* var n = rempio2( NaN, y );
* // returns 0.0
*
* var y1 = y[ 0 ];
* // returns NaN
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
			return rempio2Medium( x, ix, y );
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
		// Case: |x| ~= 4pi/2
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
	// Case: |x| ~< 2^20*pi/2 (medium size)
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

},{"./kernel_rempio2.js":63,"./rempio2_medium.js":65,"@stdlib/math/base/utils/float64-from-words":82,"@stdlib/math/base/utils/float64-get-high-word":86,"@stdlib/math/base/utils/float64-get-low-word":88}],65:[function(require,module,exports){
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
* @param {Collection} y - remainder elements
* @returns {integer} factor of `pi/2`
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

},{"@stdlib/math/base/special/round":66,"@stdlib/math/base/utils/float64-get-high-word":86}],66:[function(require,module,exports){
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

},{"./round.js":67}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{"./sin.js":69}],69:[function(require,module,exports){
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
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[0], Y[1] );
	case 1:
		return kernelCos( Y[0], Y[1] );
	case 2:
		return -kernelSin( Y[0], Y[1] );
	default:
		return -kernelCos( Y[0], Y[1] );
	}
} // end FUNCTION sin()


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":46,"@stdlib/math/base/special/kernel-sin":48,"@stdlib/math/base/special/rempio2":62,"@stdlib/math/base/utils/float64-get-high-word":86}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"./trunc.js":72}],72:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":19,"@stdlib/math/base/special/floor":29}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"./evalpoly.js":73}],75:[function(require,module,exports){
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

},{"./evalpoly.js":73,"./factory.js":74,"@stdlib/utils/define-read-only-property":119}],76:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":17}],77:[function(require,module,exports){
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

},{"./evalrational.js":76}],78:[function(require,module,exports){
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

},{"./evalrational.js":76,"./factory.js":77,"@stdlib/utils/define-read-only-property":119}],79:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":86,"@stdlib/math/constants/float64-exponent-bias":106,"@stdlib/math/constants/float64-high-word-exponent-mask":108}],80:[function(require,module,exports){
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

},{"./exponent.js":79}],81:[function(require,module,exports){
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

},{"./indices.js":83}],82:[function(require,module,exports){
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

},{"./from_words.js":81}],83:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],84:[function(require,module,exports){
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

},{"./high.js":85}],85:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],86:[function(require,module,exports){
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

},{"./get_high_word.js":84}],87:[function(require,module,exports){
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

},{"./low.js":89}],88:[function(require,module,exports){
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

},{"./get_low_word.js":87}],89:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],90:[function(require,module,exports){
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

},{"./normalize.js":91}],91:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":17,"@stdlib/math/constants/float64-smallest-normal":116}],92:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":85}],93:[function(require,module,exports){
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

},{"./set_high_word.js":94}],94:[function(require,module,exports){
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

},{"./high.js":92}],95:[function(require,module,exports){
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

},{"./set_low_word.js":97}],96:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":89}],97:[function(require,module,exports){
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

},{"./low.js":96}],98:[function(require,module,exports){
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

},{"./to_words.js":100}],99:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":83}],100:[function(require,module,exports){
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

},{"./indices.js":99}],101:[function(require,module,exports){
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

},{"./uint32_to_int32.js":102}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{"./define_read_only_property.js":118}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){

},{}],122:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"dup":121}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{"base64-js":120,"ieee754":143}],125:[function(require,module,exports){
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
},{"../../is-buffer/index.js":145}],126:[function(require,module,exports){
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

},{"./lib/is_arguments.js":127,"./lib/keys.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],129:[function(require,module,exports){
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

},{"foreach":139,"object-keys":148}],130:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],131:[function(require,module,exports){
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

},{"./helpers/isFinite":132,"./helpers/isNaN":133,"./helpers/mod":134,"./helpers/sign":135,"es-to-primitive/es5":136,"has":142,"is-callable":146}],132:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],133:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],134:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],135:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],136:[function(require,module,exports){
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

},{"./helpers/isPrimitive":137,"is-callable":146}],137:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){

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


},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":140}],142:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":141}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{"./isArguments":149}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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
},{"_process":123}],151:[function(require,module,exports){
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
},{"_process":123}],152:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":153}],153:[function(require,module,exports){
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
},{"./_stream_readable":155,"./_stream_writable":157,"core-util-is":125,"inherits":144,"process-nextick-args":151}],154:[function(require,module,exports){
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
},{"./_stream_transform":156,"core-util-is":125,"inherits":144}],155:[function(require,module,exports){
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
},{"./_stream_duplex":153,"./internal/streams/BufferList":158,"./internal/streams/destroy":159,"./internal/streams/stream":160,"_process":123,"core-util-is":125,"events":138,"inherits":144,"isarray":161,"process-nextick-args":151,"safe-buffer":168,"string_decoder/":162,"util":121}],156:[function(require,module,exports){
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
},{"./_stream_duplex":153,"core-util-is":125,"inherits":144}],157:[function(require,module,exports){
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
},{"./_stream_duplex":153,"./internal/streams/destroy":159,"./internal/streams/stream":160,"_process":123,"core-util-is":125,"inherits":144,"process-nextick-args":151,"safe-buffer":168,"util-deprecate":180}],158:[function(require,module,exports){
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
},{"safe-buffer":168}],159:[function(require,module,exports){
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
},{"process-nextick-args":151}],160:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":138}],161:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],162:[function(require,module,exports){
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
},{"safe-buffer":168}],163:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":164}],164:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":153,"./lib/_stream_passthrough.js":154,"./lib/_stream_readable.js":155,"./lib/_stream_transform.js":156,"./lib/_stream_writable.js":157}],165:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":164}],166:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":157}],167:[function(require,module,exports){
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
},{"_process":123,"through":179}],168:[function(require,module,exports){
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

},{"buffer":124}],169:[function(require,module,exports){
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

},{"events":138,"inherits":144,"readable-stream/duplex.js":152,"readable-stream/passthrough.js":163,"readable-stream/readable.js":164,"readable-stream/transform.js":165,"readable-stream/writable.js":166}],170:[function(require,module,exports){
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

},{"es-abstract/es5":131,"function-bind":141}],171:[function(require,module,exports){
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

},{"./implementation":170,"./polyfill":172,"./shim":173,"define-properties":129,"function-bind":141}],172:[function(require,module,exports){
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

},{"./polyfill":172,"define-properties":129}],174:[function(require,module,exports){
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
},{"./lib/default_stream":175,"./lib/results":177,"./lib/test":178,"_process":123,"defined":130,"through":179}],175:[function(require,module,exports){
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
},{"_process":123,"fs":122,"through":179}],176:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":123}],177:[function(require,module,exports){
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
},{"_process":123,"events":138,"function-bind":141,"has":142,"inherits":144,"object-inspect":147,"resumer":167,"through":179}],178:[function(require,module,exports){
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
},{"./next_tick":176,"deep-equal":126,"defined":130,"events":138,"has":142,"inherits":144,"path":150,"string.prototype.trim":171}],179:[function(require,module,exports){
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
},{"_process":123,"stream":169}],180:[function(require,module,exports){
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
},{}]},{},[39]);
