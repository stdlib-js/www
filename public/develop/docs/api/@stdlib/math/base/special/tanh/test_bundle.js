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

},{"./is_infinite.js":5}],5:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":60,"@stdlib/math/constants/float64-pinf":61}],6:[function(require,module,exports){
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

},{"./is_nan.js":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./is_negative_zero.js":9}],9:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":60}],10:[function(require,module,exports){
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

},{"./is_positive_zero.js":11}],11:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":61}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./abs.js":12}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"./ceil.js":14}],16:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":44,"@stdlib/math/base/utils/float64-get-high-word":48,"@stdlib/math/base/utils/float64-to-words":51}],17:[function(require,module,exports){
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

},{"./copysign.js":16}],18:[function(require,module,exports){
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

},{"./expmulti.js":19,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/trunc":33,"@stdlib/math/constants/float64-ninf":60,"@stdlib/math/constants/float64-pinf":61}],19:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":23,"@stdlib/math/base/tools/evalpoly":37}],20:[function(require,module,exports){
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

},{"./exp.js":18}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./floor.js":21}],23:[function(require,module,exports){
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

},{"./ldexp.js":24}],24:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/copysign":17,"@stdlib/math/base/utils/float64-exponent":42,"@stdlib/math/base/utils/float64-from-words":44,"@stdlib/math/base/utils/float64-normalize":49,"@stdlib/math/base/utils/float64-to-words":51,"@stdlib/math/constants/float64-exponent-bias":55,"@stdlib/math/constants/float64-max-base2-exponent":58,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":57,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":59,"@stdlib/math/constants/float64-ninf":60,"@stdlib/math/constants/float64-pinf":61}],25:[function(require,module,exports){
'use strict';

/**
* Compute the hyperbolic tangent of a number.
*
* @module @stdlib/math/base/special/tanh
*
* @example
* var tanh = require( '@stdlib/math/base/special/tanh' );
*
* var v = tanh( 0.0 );
* // returns 0.0
*
* var v = tanh( -0.0 );
* // returns -0.0
*
* v = tanh( 2.0 );
* // returns ~0.964
*
* v = tanh( -2.0 );
* // returns ~-0.964
*
* v = tanh( NaN );
* // returns NaN
*/

// MODULES //

var tanh = require( './tanh.js' );


// EXPORTS //

module.exports = tanh;

},{"./tanh.js":26}],26:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );


// VARIABLES //

// log(2**127)
var MAXLOG = 8.8029691931113054295988e+01;

var P = [
	-1.61468768441708447952e3,
	-9.92877231001918586564e1,
	-9.64399179425052238628e-1,
	0.0
];
var Q = [
	4.84406305325125486048e3,
	2.23548839060100448583e3,
	1.12811678491632931402e2,
	1.0
];


// FUNCTIONS //

// Compile a function to evaluate a rational function based on the above coefficients...
var ratval = evalrational( P, Q );


// MAIN //

/**
* Computes the hyperbolic tangent of a number.
*
* #### Method
*
* For \\( |x| < 0.625 \\), we use a rational function of the form (Cody &amp; Waite)
*
* ``` tex
* x + x^3 \frac{\mathrm{P}(x)}{\mathrm{Q}(x)}
* ```
*
* Otherwise,
*
* ``` tex
* \begin{align*}
* \operatorname{tanh}(x) &= \frac{\operatorname{sinh}(x)}{\operatorname{cosh(x)}} \\
* &= 1 - \frac{2}{e^{2x} + 1}
* \end{align*}
* ```
*
* #### Notes
*
* * Relative error:
*
*   | arithmetic | domain | # trials | peak    | rms     |
*   |:----------:|:------:|:--------:|:-------:|:-------:|
*   | DEC        | -2,2   | 50000    | 3.3e-17 | 6.4e-18 |
*   | IEEE       | -2,2   | 30000    | 2.5e-16 | 5.8e-17 |
*
*
* @param {number} x - input value
* @returns {number} hyperbolic tangent (in radians)
*
* @example
* var v = tanh( 0.0 );
* // returns 0.0
*
* @example
* var v = tanh( 2.0 );
* // returns ~0.964
*
* @example
* var v = tanh( -2.0 );
* // returns ~-0.964
*
* @example
* var v = tanh( NaN );
* // returns NaN
*/
function tanh( x ) {
	var s;
	var z;
	z = abs( x );
	if ( z > 0.5*MAXLOG ) {
		return ( x < 0.0 ) ? -1.0 : 1.0;
	}
	if ( z >= 0.625 ) {
		s = exp( 2.0 * z );
		z = 1.0 - ( 2.0/(s+1.0) );
		if ( x < 0.0 ) {
			z = -z;
		}
	} else {
		if ( x === 0.0 ) {
			return x; // handle `+-0`
		}
		s = x * x;
		z = x + ( x*s*ratval( s ) );
	}
	return z;
} // end FUNCTION tanh()


// EXPORTS //

module.exports = tanh;

},{"@stdlib/math/base/special/abs":13,"@stdlib/math/base/special/exp":20,"@stdlib/math/base/tools/evalrational":40}],27:[function(require,module,exports){
module.exports={"expected":[-0.9999092042625951,-0.9999082927082255,-0.9999073720026235,-0.9999064420539272,-0.9999055027693525,-0.9999045540551843,-0.9999035958167667,-0.999902627958494,-0.9999016503838011,-0.9999006629951532,-0.9998996656940374,-0.9998986583809515,-0.999897640955395,-0.9998966133158588,-0.9998955753598148,-0.9998945269837061,-0.9998934680829367,-0.9998923985518605,-0.9998913182837715,-0.9998902271708927,-0.9998891251043655,-0.9998880119742387,-0.999886887669458,-0.9998857520778541,-0.9998846050861326,-0.9998834465798618,-0.9998822764434616,-0.9998810945601921,-0.9998799008121421,-0.9998786950802167,-0.999877477244126,-0.9998762471823731,-0.999875004772242,-0.9998737498897847,-0.9998724824098101,-0.99987120220587,-0.999869909150248,-0.9998686031139457,-0.9998672839666702,-0.9998659515768216,-0.9998646058114787,-0.9998632465363873,-0.9998618736159453,-0.9998604869131902,-0.9998590862897851,-0.9998576716060052,-0.9998562427207234,-0.9998547994913963,-0.9998533417740506,-0.9998518694232681,-0.9998503822921716,-0.9998488802324098,-0.9998473630941433,-0.9998458307260288,-0.9998442829752048,-0.9998427196872756,-0.9998411407062966,-0.9998395458747585,-0.9998379350335715,-0.9998363080220497,-0.9998346646778948,-0.9998330048371801,-0.9998313283343341,-0.9998296350021243,-0.9998279246716402,-0.9998261971722765,-0.9998244523317161,-0.9998226899759135,-0.9998209099290765,-0.9998191120136494,-0.9998172960502951,-0.9998154618578773,-0.9998136092534422,-0.9998117380522009,-0.99980984806751,-0.9998079391108544,-0.9998060109918269,-0.9998040635181106,-0.9998020964954591,-0.9998001097276774,-0.9997981030166019,-0.9997960761620814,-0.9997940289619567,-0.9997919612120405,-0.999789872706097,-0.999787763235822,-0.999785632590821,-0.9997834805585895,-0.999781306924491,-0.9997791114717359,-0.9997768939813602,-0.999774654232203,-0.9997723920008854,-0.9997701070617873,-0.9997677991870259,-0.9997654681464321,-0.9997631137075284,-0.9997607356355052,-0.9997583336931979,-0.9997559076410627,-0.9997534572371533,-0.9997509822370966,-0.9997484823940683,-0.9997459574587688,-0.9997434071793975,-0.9997408313016287,-0.9997382295685857,-0.9997356017208155,-0.9997329474962631,-0.9997302666302447,-0.9997275588554224,-0.999724823901777,-0.9997220614965812,-0.9997192713643724,-0.9997164532269258,-0.9997136068032261,-0.9997107318094397,-0.9997078279588868,-0.9997048949620125,-0.9997019325263584,-0.999698940356533,-0.9996959181541826,-0.9996928656179618,-0.9996897824435034,-0.9996866683233879,-0.9996835229471134,-0.9996803460010641,-0.99967713716848,-0.9996738961294243,-0.9996706225607525,-0.9996673161360801,-0.9996639765257498,-0.9996606033967989,-0.9996571964129264,-0.9996537552344593,-0.9996502795183191,-0.9996467689179873,-0.9996432230834718,-0.9996396416612706,-0.9996360242943386,-0.9996323706220505,-0.9996286802801656,-0.9996249529007921,-0.9996211881123497,-0.9996173855395328,-0.9996135448032739,-0.9996096655207053,-0.9996057473051213,-0.9996017897659395,-0.9995977925086627,-0.9995937551348387,-0.9995896772420219,-0.9995855584237321,-0.9995813982694153,-0.9995771963644019,-0.9995729522898662,-0.9995686656227849,-0.9995643359358942,-0.9995599627976485,-0.9995555457721768,-0.9995510844192397,-0.9995465782941857,-0.999542026947907,-0.9995374299267948,-0.999532786772695,-0.9995280970228613,-0.9995233602099107,-0.9995185758617764,-0.9995137435016612,-0.9995088626479899,-0.9995039328143617,-0.9994989535095021,-0.9994939242372142,-0.9994888444963286,-0.999483713780655,-0.9994785315789313,-0.9994732973747726,-0.9994680106466207,-0.9994626708676917,-0.9994572775059243,-0.9994518300239267,-0.9994463278789234,-0.9994407705227016,-0.9994351574015564,-0.9994294879562363,-0.9994237616218876,-0.9994179778279986,-0.9994121359983426,-0.9994062355509212,-0.9994002758979067,-0.9993942564455834,-0.9993881765942892,-0.999382035738356,-0.9993758332660495,-0.9993695685595092,-0.9993632409946864,-0.9993568499412832,-0.9993503947626892,-0.9993438748159192,-0.9993372894515495,-0.9993306380136528,-0.9993239198397342,-0.9993171342606652,-0.999310280600617,-0.9993033581769947,-0.9992963663003688,-0.9992893042744073,-0.9992821713958068,-0.9992749669542227,-0.9992676902321994,-0.9992603405050988,-0.9992529170410288,-0.999245419100771,-0.9992378459377075,-0.999230196797747,-0.9992224709192503,-0.9992146675329548,-0.9992067858618991,-0.9991988251213453,-0.9991907845187017,-0.999182663253445,-0.9991744605170403,-0.999166175492862,-0.9991578073561126,-0.9991493552737415,-0.9991408184043622,-0.9991321958981699,-0.9991234868968571,-0.9991146905335287,-0.9991058059326171,-0.9990968322097945,-0.9990877684718871,-0.9990786138167856,-0.999069367333357,-0.9990600281013545,-0.999050595191326,-0.9990410676645236,-0.9990314445728097,-0.9990217249585646,-0.999011907854591,-0.9990019922840196,-0.998991977260212,-0.9989818617866636,-0.9989716448569054,-0.998961325454405,-0.998950902552466,-0.9989403751141269,-0.9989297420920593,-0.9989190024284642,-0.9989081550549679,-0.9988971988925168,-0.9988861328512714,-0.9988749558304983,-0.9988636667184626,-0.9988522643923178,-0.9988407477179956,-0.998829115550094,-0.998817366731765,-0.9988055000946003,-0.9987935144585166,-0.9987814086316396,-0.9987691814101862,-0.998756831578347,-0.9987443579081661,-0.9987317591594201,-0.9987190340794974,-0.9987061814032735,-0.9986931998529881,-0.9986800881381186,-0.9986668449552535,-0.9986534689879648,-0.9986399589066782,-0.9986263133685428,-0.9986125310172992,-0.9985986104831464,-0.9985845503826073,-0.9985703493183928,-0.9985560058792652,-0.998541518639899,-0.9985268861607421,-0.9985121069878735,-0.9984971796528617,-0.99848210267262,-0.998466874549262,-0.9984514937699538,-0.9984359588067667,-0.9984202681165271,-0.9984044201406651,-0.9983884133050626,-0.9983722460198984,-0.9983559166794932,-0.9983394236621523,-0.9983227653300069,-0.9983059400288534,-0.9982889460879927,-0.9982717818200657,-0.9982544455208892,-0.9982369354692887,-0.9982192499269307,-0.9982013871381524,-0.9981833453297907,-0.9981651227110087,-0.9981467174731208,-0.9981281277894165,-0.9981093518149818,-0.9980903876865193,-0.9980712335221665,-0.9980518874213121,-0.9980323474644109,-0.9980126117127966,-0.9979926782084928,-0.9979725449740221,-0.9979522100122141,-0.99793167130601,-0.9979109268182669,-0.9978899744915593,-0.9978688122479786,-0.9978474379889318,-0.9978258495949363,-0.9978040449254144,-0.9977820218184853,-0.9977597780907547,-0.9977373115371029,-0.9977146199304705,-0.9976917010216421,-0.997668552539028,-0.9976451721884438,-0.9976215576528878,-0.9975977065923163,-0.9975736166434162,-0.9975492854193768,-0.997524710509658,-0.9974998894797563,-0.9974748198709702,-0.9974494992001608,-0.9974239249595125,-0.9973980946162897,-0.9973720056125924,-0.997345655365108,-0.9973190412648626,-0.9972921606769678,-0.9972650109403671,-0.9972375893675783,-0.9972098932444344,-0.9971819198298214,-0.997153666355414,-0.9971251300254086,-0.9970963080162537,-0.9970671974763777,-0.9970377955259144,-0.9970080992564258,-0.9969781057306213,-0.996947811982076,-0.9969172150149448,-0.9968863118036744,-0.9968550992927123,-0.9968235743962136,-0.9967917339977443,-0.9967595749499822,-0.9967270940744147,-0.9966942881610337,-0.9966611539680282,-0.9966276882214735,-0.9965938876150169,-0.9965597488095614,-0.9965252684329466,-0.9964904430796248,-0.9964552693103359,-0.9964197436517788,-0.9963838625962785,-0.9963476226014525,-0.9963110200898706,-0.9962740514487152,-0.9962367130294355,-0.9961990011474002,-0.9961609120815459,-0.9961224420740228,-0.9960835873298368,-0.9960443440164882,-0.9960047082636073,-0.9959646761625862,-0.9959242437662075,-0.9958834070882691,-0.9958421621032058,-0.9958005047457077,-0.995758430910334,-0.9957159364511243,-0.9956730171812054,-0.9956296688723952,-0.9955858872548021,-0.9955416680164217,-0.9954970068027285,-0.9954518992162648,-0.9954063408162254,-0.9953603271180383,-0.9953138535929422,-0.9952669156675588,-0.9952195087234623,-0.9951716280967449,-0.9951232690775771,-0.9950744269097653,-0.995025096790305,-0.9949752738689289,-0.9949249532476522,-0.9948741299803127,-0.9948227990721077,-0.9947709554791251,-0.9947185941078722,-0.9946657098147982,-0.9946122974058136,-0.994558351635805,-0.994503867208145,-0.9944488387741983,-0.9943932609328225,-0.9943371282298653,-0.9942804351576561,-0.9942231761544937,-0.9941653456041294,-0.9941069378352448,-0.9940479471209255,-0.9939883676781295,-0.9939281936671511,-0.9938674191910806,-0.993806038295257,-0.9937440449667191,-0.9936814331336481,-0.993618196664808,-0.9935543293689794,-0.9934898249943885,-0.993424677228132,-0.9933588796955951,-0.9932924259598659,-0.9932253095211435,-0.9931575238161419,-0.993089062217487,-0.9930199180331103,-0.9929500845056353,-0.9928795548117597,-0.9928083220616319,-0.9927363792982214,-0.9926637194966846,-0.9925903355637242,-0.9925162203369433,-0.992441366584194,-0.9923657670029201,-0.9922894142194941,-0.9922123007885482,-0.9921344191922997,-0.9920557618398711,-0.9919763210666025,-0.9918960891333605,-0.9918150582258388,-0.9917332204538545,-0.9916505678506372,-0.9915670923721127,-0.9914827858961799,-0.9913976402219823,-0.9913116470691724,-0.9912247980771702,-0.9911370848044158,-0.9910484987276146,-0.9909590312409773,-0.9908686736554524,-0.9907774171979529,-0.9906852530105762,-0.9905921721498173,-0.9904981655857756,-0.990403224201355,-0.9903073387914569,-0.9902105000621677,-0.9901126986299376,-0.9900139250207541,-0.9899141696693082,-0.9898134229181533,-0.9897116750168578,-0.9896089161211501,-0.9895051362920572,-0.9894003254950354,-0.9892944735990947,-0.9891875703759156,-0.989079605498959,-0.9889705685425683,-0.9888604489810648,-0.988749236187836,-0.9886369194344151,-0.9885234878895554,-0.9884089306182952,-0.9882932365810164,-0.9881763946324951,-0.9880583935209447,-0.9879392218870521,-0.9878188682630048,-0.9876973210715123,-0.987574568624818,-0.987450599123704,-0.9873254006564892,-0.9871989611980181,-0.9870712686086418,-0.9869423106331929,-0.9868120748999504,-0.9866805489195977,-0.9865477200841726,-0.9864135756660092,-0.9862781028166716,-0.98614128856588,-0.986003119820428,-0.9858635833630923,-0.9857226658515345,-0.9855803538171937,-0.9854366336641719,-0.9852914916681111,-0.9851449139750614,-0.9849968866003412,-0.9848473954273895,-0.9846964262066095,-0.9845439645542033,-0.9843899959509997,-0.984234505741272,-0.9840774791315482,-0.9839189011894126,-0.9837587568422992,-0.9835970308762761,-0.9834337079348219,-0.983268772517593,-0.9831022089791834,-0.9829340015278748,-0.9827641342243789,-0.9825925909805708,-0.9824193555582141,-0.9822444115676774,-0.9820677424666414,-0.9818893315587992,-0.9817091619925462,-0.9815272167596621,-0.981343478693985,-0.9811579304700753,-0.9809705546018728,-0.9807813334413441,-0.9805902491771213,-0.9803972838331332,-0.9802024192672268,-0.9800056371697808,-0.9798069190623105,-0.9796062462960642,-0.9794036000506107,-0.979198961332419,-0.9789923109734292,-0.9787836296296143,-0.9785728977795349,-0.9783600957228846,-0.9781452035790267,-0.9779282012855236,-0.9777090685966572,-0.9774877850819413,-0.9772643301246254,-0.9770386829201909,-0.9768108224748382,-0.9765807276039671,-0.9763483769306479,-0.9761137488840851,-0.9758768216980725,-0.975637573409442,-0.9753959818565022,-0.9751520246774716,-0.9749056793089023,-0.9746569229840968,-0.9744057327315176,-0.9741520853731888,-0.97389595752309,-0.9736373255855438,-0.9733761657535951,-0.973112454007384,-0.9728461661125113,-0.9725772776183966,-0.9723057638566307,-0.9720315999393201,-0.9717547607574251,-0.971475220979092,-0.9711929550479783,-0.9709079371815714,-0.9706201413695018,-0.9703295413718496,-0.9700361107174456,-0.9697398227021661,-0.9694406503872227,-0.9691385665974462,-0.9688335439195649,-0.9685255547004782,-0.9682145710455251,-0.9679005648167478,-0.9675835076311505,-0.9672633708589538,-0.9669401256218446,-0.9666137427912221,-0.9662841929864403,-0.9659514465730454,-0.965615473661011,-0.9652762441029692,-0.9649337274924396,-0.9645878931620535,-0.9642387101817779,-0.9638861473571347,-0.9635301732274197,-0.9631707560639183,-0.9628078638681205,-0.962441464369933,-0.9620715250258928,-0.9616980130173767,-0.9613208952488129,-0.9609401383458909,-0.9605557086537715,-0.9601675722352978,-0.9597756948692058,-0.9593800420483372,-0.958980578977852,-0.9585772705734444,-0.9581700814595586,-0.9577589759676091,-0.9573439181342017,-0.9569248716993595,-0.95650180010475,-0.9560746664919182,-0.9556434337005223,-0.955208064266575,-0.9547685204206896,-0.9543247640863306,-0.9538767568780719,-0.9534244600998597,-0.9529678347432831,-0.9525068414858515,-0.9520414406892801,-0.9515715923977829,-0.9510972563363752,-0.9506183919091847,-0.9501349581977725,-0.949646913959464,-0.9491542176256913,-0.948656827300346,-0.9481547007581445,-0.9476477954430055,-0.9471360684664402,-0.9466194766059567,-0.946097976303478,-0.9455715236637755,-0.945040074452917,-0.9445035840967315,-0.9439620076792908,-0.9434152999414079,-0.9428634152791537,-0.9423063077423931,-0.9417439310333393,-0.9411762385051297,-0.9406031831604214,-0.9400247176500093,-0.9394407942714664,-0.9388513649678067,-0.9382563813261731,-0.9376557945765487,-0.937049555590495,-0.9364376148799158,-0.9358199225958486,-0.9351964285272834,-0.9345670821000117,-0.933931832375504,-0.9332906280498194,-0.9326434174525455,-0.9319901485457716,-0.9313307689230953,-0.9306652258086643,-0.9299934660562521,-0.9293154361483712,-0.9286310821954239,-0.9279403499348909,-0.9272431847305598,-0.9265395315717941,-0.9258293350728442,-0.9251125394721997,-0.9243890886319879,-0.9236589260374146,-0.9229219947962534,-0.92217823763838,-0.9214275969153567,-0.9206700146000655,-0.9199054322863915,-0.9191337911889604,-0.9183550321429262,-0.9175690956038156,-0.9167759216474278,-0.9159754499697901,-0.9151676198871733,-0.914352370336166,-0.9135296398738098,-0.9126993666777967,-0.911861488546731,-0.9110159429004551,-0.910162666780443,-0.9093015968502604,-0.9084326693960949,-0.9075558203273569,-0.9066709851773529,-0.9057780991040315,-0.9048770968908058,-0.903967912947452,-0.9030504813110867,-0.9021247356472224,-0.9011906092509069,-0.9002480350479438,-0.899296945596198,-0.8983372730869873,-0.8973689493465621,-0.8963919058376745,-0.8954060736612375,-0.8944113835580785,-0.8934077659107861,-0.8923951507456533,-0.8913734677347187,-0.8903426461979068,-0.8893026151052703,-0.8882533030793348,-0.8871946383975488,-0.8861265489948396,-0.8850489624662785,-0.8839618060698556,-0.8828650067293664,-0.8817584910374126,-0.880642185258518,-0.8795160153323633,-0.8783799068771382,-0.8772337851930156,-0.8760775752657496,-0.8749112017703972,-0.8737345890751671,-0.8725476612453983,-0.871350342047667,-0.8701425549540287,-0.8689242231463922,-0.8676952695210314,-0.8664556166932355,-0.8652051870020973,-0.8639439025154463,-0.8626716850349235,-0.8613884561012033,-0.8600941369993624,-0.8587886487643991,-0.8574719121869034,-0.8561438478188815,-0.8548043759797349,-0.8534534167623969,-0.8520908900396293,-0.8507167154704783,-0.8493308125068952,-0.8479331004005204,-0.8465234982096357,-0.8451019248062834,-0.8436682988835567,-0.8422225389630623,-0.8407645634025567,-0.8392942904037579,-0.8378116380203358,-0.8363165241660798,-0.8348088666232503,-0.8332885830511098,-0.8317555909946404,-0.8302098078934471,-0.8286511510908481,-0.8270795378431546,-0.8254948853291415,-0.8238971106597115,-0.822286130887751,-0.8206618630181834,-0.8190242240182181,-0.8173731308277981,-0.8157085003702473,-0.814030249563119,-0.8123382953292452,-0.8106325546079918,-0.8089129443667161,-0.8071793816124319,-0.8054317834036799,-0.803670066862608,-0.8018941491872585,-0.8001039476640668,-0.7982993796805697,-0.7964803627383268,-0.7946468144660521,-0.7927986526329611,-0.7909357951623293,-0.7890581601452666,-0.7871656658547059,-0.7852582307596063,-0.7833357735393736,-0.7813982130984933,-0.779445468581384,-0.777477459387462,-0.7754941051864274,-0.7734953259337608,-0.77148104188644,-0.7694511736188708,-0.7674056420390332,-0.7653443684048423,-0.763267274340725,-0.7611742818544086,-0.7590653133539239,-0.7569402916648207,-0.7547991400475934,-0.7526417822153176,-0.7504681423514977,-0.7482781451281184,-0.7460717157239075,-0.7438487798427997,-0.7416092637326074,-0.7393530942038896,-0.7370801986490254,-0.7347905050614801,-0.7324839420552716,-0.7301604388846284,-0.7278199254638388,-0.7254623323872894,-0.7230875909496898,-0.7206956331664799,-0.7182863917944187,-0.71585980035235,-0.7134157931421413,-0.7109543052697961,-0.7084752726667298,-0.7059786321112136,-0.7034643212499745,-0.7009322786199532,-0.6983824436702146,-0.6958147567840031,-0.6932291593009435,-0.6906255935393809,-0.6880040028188509,-0.6853643314826829,-0.6827065249207257,-0.68003052959219,-0.6773362930486072,-0.6746237639568939,-0.6718928921225192,-0.6691436285127673,-0.6663759252800915,-0.6635897357855506,-0.6607850146223233,-0.6579617176392941,-0.6551198019647021,-0.6522592260298474,-0.6493799495928485,-0.6464819337624415,-0.6435651410218148,-0.6406295352524737,-0.6376750817581209,-0.6347017472885549,-0.631709500063567,-0.6286983097968389,-0.6256681477198243,-0.6226189866056117,-0.6195508007927559,-0.6164635662090723,-0.6133572603953827,-0.6102318625292031,-0.6070873534483684,-0.603923715674577,-0.6007409334368544,-0.5975389926949175,-0.5943178811624377,-0.5910775883301849,-0.587818105489049,-0.5845394257529246,-0.5812415440814485,-0.5779244573025814,-0.574588164135022,-0.5712326652104428,-0.5678579630955345,-0.5644640623138522,-0.5610509693674499,-0.5576186927582901,-0.554167243009421,-0.5506966326859069,-0.5472068764155018,-0.5436979909090546,-0.5401699949806311,-0.5366229095673483,-0.5330567577488997,-0.5294715647667676,-0.5258673580431067,-0.5222441671992868,-0.5186020240740856,-0.5149409627415157,-0.5112610195282763,-0.5075622330308178,-0.5038446441320049,-0.5001082960173688,-0.49635323419093375,-0.49257950649061044,-0.488787163103137,-0.48497625657856436,-0.4811468418442663,-0.47729897621846734,-0.4734327194232743,-0.46954813359720116,-0.4656452833071744,-0.461724235560008,-0.4577850598133366,-0.4538278279859947,-0.44985261446783226,-0.4458594961289538,-0.4418485523283715,-0.4378198649220603,-0.4337735182704051,-0.42970959924502933,-0.4256281972349947,-0.4215294041523617,-0.4174133144371008,-0.41328002506134526,-0.4091296355329756,-0.4049622478985258,-0.40077796674540356,-0.3965768992034142,-0.39235915494558177,-0.38812484618825516,-0.3838740876904965,-0.3796069967527397,-0.375323693214713,-0.3710242994526192,-0.36670894037556595,-0.3623777434212396,-0.3580308385508153,-0.3536683582431008,-0.3492904374879039,-0.3448972137786218,-0.34048882710404577,-0.3360654199393776,-0.33162713723645276,-0.3271741264131678,-0.3227065373421068,-0.3182245223383665,-0.31372823614657497,-0.3092178359271038,-0.3046934812414701,-0.30015533403692957,-0.2956035586302572,-0.29103832169071686,-0.28645979222221907,-0.2818681415446679,-0.2772635432744976,-0.2726461733044002,-0.26801620978224655,-0.26337383308920187,-0.2587192258170403,-0.2540525727446604,-0.24937406081380492,-0.24468387910399078,-0.2399822188066521,-0.2352692731985024,-0.2305452376141212,-0.2258103094177708,-0.22106468797445072,-0.21630857462019545,-0.21154217263162428,-0.2067656871947503,-0.20197932537305716,-0.197183296074853,-0.19237781001990972,-0.1875630797053991,-0.1827393193711341,-0.17790674496412776,-0.17306557410247964,-0.16821602603860245,-0.16335832162179945,-0.15849268326020718,-0.15361933488211416,-0.1487385018966709,-0.14385041115400335,-0.13895529090474504,-0.1340533707590018,-0.12914488164476454,-0.12423005576578482,-0.11930912655892907,-0.11438232865102797,-0.10944989781523687,-0.1045120709269238,-0.09956908591910306,-0.09462118173743063,-0.08966859829478002,-0.08471157642541614,-0.07975035783878517,-0.0747851850729399,-0.06981630144761833,-0.06484395101699508,-0.059868378522125294,-0.05488982934309937,-0.049908549450929755,-0.044924785359188396,-0.0399387840754158,-0.03495079305232153,-0.029961060138796694,-0.02496983353075903,-0.01997736172185107,-0.014983893454012328,-0.009989677667946315,-0.00499496345350333,0.0,0.00499496345350333,0.009989677667946315,0.014983893454012328,0.01997736172185107,0.02496983353075903,0.029961060138796694,0.03495079305232153,0.0399387840754158,0.044924785359188396,0.049908549450929755,0.05488982934309937,0.059868378522125294,0.06484395101699508,0.06981630144761833,0.0747851850729399,0.07975035783878517,0.08471157642541614,0.08966859829478002,0.09462118173743063,0.09956908591910306,0.1045120709269238,0.10944989781523687,0.11438232865102797,0.11930912655892907,0.12423005576578482,0.12914488164476454,0.1340533707590018,0.13895529090474504,0.14385041115400335,0.1487385018966709,0.15361933488211416,0.15849268326020718,0.16335832162179945,0.16821602603860245,0.17306557410247964,0.17790674496412776,0.1827393193711341,0.1875630797053991,0.19237781001990972,0.197183296074853,0.20197932537305716,0.2067656871947503,0.21154217263162428,0.21630857462019545,0.22106468797445072,0.2258103094177708,0.2305452376141212,0.2352692731985024,0.2399822188066521,0.24468387910399078,0.24937406081380492,0.2540525727446604,0.2587192258170403,0.26337383308920187,0.26801620978224655,0.2726461733044002,0.2772635432744976,0.2818681415446679,0.28645979222221907,0.29103832169071686,0.2956035586302572,0.30015533403692957,0.3046934812414701,0.3092178359271038,0.31372823614657497,0.3182245223383665,0.3227065373421068,0.3271741264131678,0.33162713723645276,0.3360654199393776,0.34048882710404577,0.3448972137786218,0.3492904374879039,0.3536683582431008,0.3580308385508153,0.3623777434212396,0.36670894037556595,0.3710242994526192,0.375323693214713,0.3796069967527397,0.3838740876904965,0.38812484618825516,0.39235915494558177,0.3965768992034142,0.40077796674540356,0.4049622478985258,0.4091296355329756,0.41328002506134526,0.4174133144371008,0.4215294041523617,0.4256281972349947,0.42970959924502933,0.4337735182704051,0.4378198649220603,0.4418485523283715,0.4458594961289538,0.44985261446783226,0.4538278279859947,0.4577850598133366,0.461724235560008,0.4656452833071744,0.46954813359720116,0.4734327194232743,0.47729897621846734,0.4811468418442663,0.48497625657856436,0.488787163103137,0.49257950649061044,0.49635323419093375,0.5001082960173688,0.5038446441320049,0.5075622330308178,0.5112610195282763,0.5149409627415157,0.5186020240740856,0.5222441671992868,0.5258673580431067,0.5294715647667676,0.5330567577488997,0.5366229095673483,0.5401699949806311,0.5436979909090546,0.5472068764155018,0.5506966326859069,0.554167243009421,0.5576186927582901,0.5610509693674499,0.5644640623138522,0.5678579630955345,0.5712326652104428,0.574588164135022,0.5779244573025814,0.5812415440814485,0.5845394257529246,0.587818105489049,0.5910775883301849,0.5943178811624377,0.5975389926949175,0.6007409334368544,0.603923715674577,0.6070873534483684,0.6102318625292031,0.6133572603953827,0.6164635662090723,0.6195508007927559,0.6226189866056117,0.6256681477198243,0.6286983097968389,0.631709500063567,0.6347017472885549,0.6376750817581209,0.6406295352524737,0.6435651410218148,0.6464819337624415,0.6493799495928485,0.6522592260298474,0.6551198019647021,0.6579617176392941,0.6607850146223233,0.6635897357855506,0.6663759252800915,0.6691436285127673,0.6718928921225192,0.6746237639568939,0.6773362930486072,0.68003052959219,0.6827065249207257,0.6853643314826829,0.6880040028188509,0.6906255935393809,0.6932291593009435,0.6958147567840031,0.6983824436702146,0.7009322786199532,0.7034643212499745,0.7059786321112136,0.7084752726667298,0.7109543052697961,0.7134157931421413,0.71585980035235,0.7182863917944187,0.7206956331664799,0.7230875909496898,0.7254623323872894,0.7278199254638388,0.7301604388846284,0.7324839420552716,0.7347905050614801,0.7370801986490254,0.7393530942038896,0.7416092637326074,0.7438487798427997,0.7460717157239075,0.7482781451281184,0.7504681423514977,0.7526417822153176,0.7547991400475934,0.7569402916648207,0.7590653133539239,0.7611742818544086,0.763267274340725,0.7653443684048423,0.7674056420390332,0.7694511736188708,0.77148104188644,0.7734953259337608,0.7754941051864274,0.777477459387462,0.779445468581384,0.7813982130984933,0.7833357735393736,0.7852582307596063,0.7871656658547059,0.7890581601452666,0.7909357951623293,0.7927986526329611,0.7946468144660521,0.7964803627383268,0.7982993796805697,0.8001039476640668,0.8018941491872585,0.803670066862608,0.8054317834036799,0.8071793816124319,0.8089129443667161,0.8106325546079918,0.8123382953292452,0.814030249563119,0.8157085003702473,0.8173731308277981,0.8190242240182181,0.8206618630181834,0.822286130887751,0.8238971106597115,0.8254948853291415,0.8270795378431546,0.8286511510908481,0.8302098078934471,0.8317555909946404,0.8332885830511098,0.8348088666232503,0.8363165241660798,0.8378116380203358,0.8392942904037579,0.8407645634025567,0.8422225389630623,0.8436682988835567,0.8451019248062834,0.8465234982096357,0.8479331004005204,0.8493308125068952,0.8507167154704783,0.8520908900396293,0.8534534167623969,0.8548043759797349,0.8561438478188815,0.8574719121869034,0.8587886487643991,0.8600941369993624,0.8613884561012033,0.8626716850349235,0.8639439025154463,0.8652051870020973,0.8664556166932355,0.8676952695210314,0.8689242231463922,0.8701425549540287,0.871350342047667,0.8725476612453983,0.8737345890751671,0.8749112017703972,0.8760775752657496,0.8772337851930156,0.8783799068771382,0.8795160153323633,0.880642185258518,0.8817584910374126,0.8828650067293664,0.8839618060698556,0.8850489624662785,0.8861265489948396,0.8871946383975488,0.8882533030793348,0.8893026151052703,0.8903426461979068,0.8913734677347187,0.8923951507456533,0.8934077659107861,0.8944113835580785,0.8954060736612375,0.8963919058376745,0.8973689493465621,0.8983372730869873,0.899296945596198,0.9002480350479438,0.9011906092509069,0.9021247356472224,0.9030504813110867,0.903967912947452,0.9048770968908058,0.9057780991040315,0.9066709851773529,0.9075558203273569,0.9084326693960949,0.9093015968502604,0.910162666780443,0.9110159429004551,0.911861488546731,0.9126993666777967,0.9135296398738098,0.914352370336166,0.9151676198871733,0.9159754499697901,0.9167759216474278,0.9175690956038156,0.9183550321429262,0.9191337911889604,0.9199054322863915,0.9206700146000655,0.9214275969153567,0.92217823763838,0.9229219947962534,0.9236589260374146,0.9243890886319879,0.9251125394721997,0.9258293350728442,0.9265395315717941,0.9272431847305598,0.9279403499348909,0.9286310821954239,0.9293154361483712,0.9299934660562521,0.9306652258086643,0.9313307689230953,0.9319901485457716,0.9326434174525455,0.9332906280498194,0.933931832375504,0.9345670821000117,0.9351964285272834,0.9358199225958486,0.9364376148799158,0.937049555590495,0.9376557945765487,0.9382563813261731,0.9388513649678067,0.9394407942714664,0.9400247176500093,0.9406031831604214,0.9411762385051297,0.9417439310333393,0.9423063077423931,0.9428634152791537,0.9434152999414079,0.9439620076792908,0.9445035840967315,0.945040074452917,0.9455715236637755,0.946097976303478,0.9466194766059567,0.9471360684664402,0.9476477954430055,0.9481547007581445,0.948656827300346,0.9491542176256913,0.949646913959464,0.9501349581977725,0.9506183919091847,0.9510972563363752,0.9515715923977829,0.9520414406892801,0.9525068414858515,0.9529678347432831,0.9534244600998597,0.9538767568780719,0.9543247640863306,0.9547685204206896,0.955208064266575,0.9556434337005223,0.9560746664919182,0.95650180010475,0.9569248716993595,0.9573439181342017,0.9577589759676091,0.9581700814595586,0.9585772705734444,0.958980578977852,0.9593800420483372,0.9597756948692058,0.9601675722352978,0.9605557086537715,0.9609401383458909,0.9613208952488129,0.9616980130173767,0.9620715250258928,0.962441464369933,0.9628078638681205,0.9631707560639183,0.9635301732274197,0.9638861473571347,0.9642387101817779,0.9645878931620535,0.9649337274924396,0.9652762441029692,0.965615473661011,0.9659514465730454,0.9662841929864403,0.9666137427912221,0.9669401256218446,0.9672633708589538,0.9675835076311505,0.9679005648167478,0.9682145710455251,0.9685255547004782,0.9688335439195649,0.9691385665974462,0.9694406503872227,0.9697398227021661,0.9700361107174456,0.9703295413718496,0.9706201413695018,0.9709079371815714,0.9711929550479783,0.971475220979092,0.9717547607574251,0.9720315999393201,0.9723057638566307,0.9725772776183966,0.9728461661125113,0.973112454007384,0.9733761657535951,0.9736373255855438,0.97389595752309,0.9741520853731888,0.9744057327315176,0.9746569229840968,0.9749056793089023,0.9751520246774716,0.9753959818565022,0.975637573409442,0.9758768216980725,0.9761137488840851,0.9763483769306479,0.9765807276039671,0.9768108224748382,0.9770386829201909,0.9772643301246254,0.9774877850819413,0.9777090685966572,0.9779282012855236,0.9781452035790267,0.9783600957228846,0.9785728977795349,0.9787836296296143,0.9789923109734292,0.979198961332419,0.9794036000506107,0.9796062462960642,0.9798069190623105,0.9800056371697808,0.9802024192672268,0.9803972838331332,0.9805902491771213,0.9807813334413441,0.9809705546018728,0.9811579304700753,0.981343478693985,0.9815272167596621,0.9817091619925462,0.9818893315587992,0.9820677424666414,0.9822444115676774,0.9824193555582141,0.9825925909805708,0.9827641342243789,0.9829340015278748,0.9831022089791834,0.983268772517593,0.9834337079348219,0.9835970308762761,0.9837587568422992,0.9839189011894126,0.9840774791315482,0.984234505741272,0.9843899959509997,0.9845439645542033,0.9846964262066095,0.9848473954273895,0.9849968866003412,0.9851449139750614,0.9852914916681111,0.9854366336641719,0.9855803538171937,0.9857226658515345,0.9858635833630923,0.986003119820428,0.98614128856588,0.9862781028166716,0.9864135756660092,0.9865477200841726,0.9866805489195977,0.9868120748999504,0.9869423106331929,0.9870712686086418,0.9871989611980181,0.9873254006564892,0.987450599123704,0.987574568624818,0.9876973210715123,0.9878188682630048,0.9879392218870521,0.9880583935209447,0.9881763946324951,0.9882932365810164,0.9884089306182952,0.9885234878895554,0.9886369194344151,0.988749236187836,0.9888604489810648,0.9889705685425683,0.989079605498959,0.9891875703759156,0.9892944735990947,0.9894003254950354,0.9895051362920572,0.9896089161211501,0.9897116750168578,0.9898134229181533,0.9899141696693082,0.9900139250207541,0.9901126986299376,0.9902105000621677,0.9903073387914569,0.990403224201355,0.9904981655857756,0.9905921721498173,0.9906852530105762,0.9907774171979529,0.9908686736554524,0.9909590312409773,0.9910484987276146,0.9911370848044158,0.9912247980771702,0.9913116470691724,0.9913976402219823,0.9914827858961799,0.9915670923721127,0.9916505678506372,0.9917332204538545,0.9918150582258388,0.9918960891333605,0.9919763210666025,0.9920557618398711,0.9921344191922997,0.9922123007885482,0.9922894142194941,0.9923657670029201,0.992441366584194,0.9925162203369433,0.9925903355637242,0.9926637194966846,0.9927363792982214,0.9928083220616319,0.9928795548117597,0.9929500845056353,0.9930199180331103,0.993089062217487,0.9931575238161419,0.9932253095211435,0.9932924259598659,0.9933588796955951,0.993424677228132,0.9934898249943885,0.9935543293689794,0.993618196664808,0.9936814331336481,0.9937440449667191,0.993806038295257,0.9938674191910806,0.9939281936671511,0.9939883676781295,0.9940479471209255,0.9941069378352448,0.9941653456041294,0.9942231761544937,0.9942804351576561,0.9943371282298653,0.9943932609328225,0.9944488387741983,0.994503867208145,0.994558351635805,0.9946122974058136,0.9946657098147982,0.9947185941078722,0.9947709554791251,0.9948227990721077,0.9948741299803127,0.9949249532476522,0.9949752738689289,0.995025096790305,0.9950744269097653,0.9951232690775771,0.9951716280967449,0.9952195087234623,0.9952669156675588,0.9953138535929422,0.9953603271180383,0.9954063408162254,0.9954518992162648,0.9954970068027285,0.9955416680164217,0.9955858872548021,0.9956296688723952,0.9956730171812054,0.9957159364511243,0.995758430910334,0.9958005047457077,0.9958421621032058,0.9958834070882691,0.9959242437662075,0.9959646761625862,0.9960047082636073,0.9960443440164882,0.9960835873298368,0.9961224420740228,0.9961609120815459,0.9961990011474002,0.9962367130294355,0.9962740514487152,0.9963110200898706,0.9963476226014525,0.9963838625962785,0.9964197436517788,0.9964552693103359,0.9964904430796248,0.9965252684329466,0.9965597488095614,0.9965938876150169,0.9966276882214735,0.9966611539680282,0.9966942881610337,0.9967270940744147,0.9967595749499822,0.9967917339977443,0.9968235743962136,0.9968550992927123,0.9968863118036744,0.9969172150149448,0.996947811982076,0.9969781057306213,0.9970080992564258,0.9970377955259144,0.9970671974763777,0.9970963080162537,0.9971251300254086,0.997153666355414,0.9971819198298214,0.9972098932444344,0.9972375893675783,0.9972650109403671,0.9972921606769678,0.9973190412648626,0.997345655365108,0.9973720056125924,0.9973980946162897,0.9974239249595125,0.9974494992001608,0.9974748198709702,0.9974998894797563,0.997524710509658,0.9975492854193768,0.9975736166434162,0.9975977065923163,0.9976215576528878,0.9976451721884438,0.997668552539028,0.9976917010216421,0.9977146199304705,0.9977373115371029,0.9977597780907547,0.9977820218184853,0.9978040449254144,0.9978258495949363,0.9978474379889318,0.9978688122479786,0.9978899744915593,0.9979109268182669,0.99793167130601,0.9979522100122141,0.9979725449740221,0.9979926782084928,0.9980126117127966,0.9980323474644109,0.9980518874213121,0.9980712335221665,0.9980903876865193,0.9981093518149818,0.9981281277894165,0.9981467174731208,0.9981651227110087,0.9981833453297907,0.9982013871381524,0.9982192499269307,0.9982369354692887,0.9982544455208892,0.9982717818200657,0.9982889460879927,0.9983059400288534,0.9983227653300069,0.9983394236621523,0.9983559166794932,0.9983722460198984,0.9983884133050626,0.9984044201406651,0.9984202681165271,0.9984359588067667,0.9984514937699538,0.998466874549262,0.99848210267262,0.9984971796528617,0.9985121069878735,0.9985268861607421,0.998541518639899,0.9985560058792652,0.9985703493183928,0.9985845503826073,0.9985986104831464,0.9986125310172992,0.9986263133685428,0.9986399589066782,0.9986534689879648,0.9986668449552535,0.9986800881381186,0.9986931998529881,0.9987061814032735,0.9987190340794974,0.9987317591594201,0.9987443579081661,0.998756831578347,0.9987691814101862,0.9987814086316396,0.9987935144585166,0.9988055000946003,0.998817366731765,0.998829115550094,0.9988407477179956,0.9988522643923178,0.9988636667184626,0.9988749558304983,0.9988861328512714,0.9988971988925168,0.9989081550549679,0.9989190024284642,0.9989297420920593,0.9989403751141269,0.998950902552466,0.998961325454405,0.9989716448569054,0.9989818617866636,0.998991977260212,0.9990019922840196,0.999011907854591,0.9990217249585646,0.9990314445728097,0.9990410676645236,0.999050595191326,0.9990600281013545,0.999069367333357,0.9990786138167856,0.9990877684718871,0.9990968322097945,0.9991058059326171,0.9991146905335287,0.9991234868968571,0.9991321958981699,0.9991408184043622,0.9991493552737415,0.9991578073561126,0.999166175492862,0.9991744605170403,0.999182663253445,0.9991907845187017,0.9991988251213453,0.9992067858618991,0.9992146675329548,0.9992224709192503,0.999230196797747,0.9992378459377075,0.999245419100771,0.9992529170410288,0.9992603405050988,0.9992676902321994,0.9992749669542227,0.9992821713958068,0.9992893042744073,0.9992963663003688,0.9993033581769947,0.999310280600617,0.9993171342606652,0.9993239198397342,0.9993306380136528,0.9993372894515495,0.9993438748159192,0.9993503947626892,0.9993568499412832,0.9993632409946864,0.9993695685595092,0.9993758332660495,0.999382035738356,0.9993881765942892,0.9993942564455834,0.9994002758979067,0.9994062355509212,0.9994121359983426,0.9994179778279986,0.9994237616218876,0.9994294879562363,0.9994351574015564,0.9994407705227016,0.9994463278789234,0.9994518300239267,0.9994572775059243,0.9994626708676917,0.9994680106466207,0.9994732973747726,0.9994785315789313,0.999483713780655,0.9994888444963286,0.9994939242372142,0.9994989535095021,0.9995039328143617,0.9995088626479899,0.9995137435016612,0.9995185758617764,0.9995233602099107,0.9995280970228613,0.999532786772695,0.9995374299267948,0.999542026947907,0.9995465782941857,0.9995510844192397,0.9995555457721768,0.9995599627976485,0.9995643359358942,0.9995686656227849,0.9995729522898662,0.9995771963644019,0.9995813982694153,0.9995855584237321,0.9995896772420219,0.9995937551348387,0.9995977925086627,0.9996017897659395,0.9996057473051213,0.9996096655207053,0.9996135448032739,0.9996173855395328,0.9996211881123497,0.9996249529007921,0.9996286802801656,0.9996323706220505,0.9996360242943386,0.9996396416612706,0.9996432230834718,0.9996467689179873,0.9996502795183191,0.9996537552344593,0.9996571964129264,0.9996606033967989,0.9996639765257498,0.9996673161360801,0.9996706225607525,0.9996738961294243,0.99967713716848,0.9996803460010641,0.9996835229471134,0.9996866683233879,0.9996897824435034,0.9996928656179618,0.9996959181541826,0.999698940356533,0.9997019325263584,0.9997048949620125,0.9997078279588868,0.9997107318094397,0.9997136068032261,0.9997164532269258,0.9997192713643724,0.9997220614965812,0.999724823901777,0.9997275588554224,0.9997302666302447,0.9997329474962631,0.9997356017208155,0.9997382295685857,0.9997408313016287,0.9997434071793975,0.9997459574587688,0.9997484823940683,0.9997509822370966,0.9997534572371533,0.9997559076410627,0.9997583336931979,0.9997607356355052,0.9997631137075284,0.9997654681464321,0.9997677991870259,0.9997701070617873,0.9997723920008854,0.999774654232203,0.9997768939813602,0.9997791114717359,0.999781306924491,0.9997834805585895,0.999785632590821,0.999787763235822,0.999789872706097,0.9997919612120405,0.9997940289619567,0.9997960761620814,0.9997981030166019,0.9998001097276774,0.9998020964954591,0.9998040635181106,0.9998060109918269,0.9998079391108544,0.99980984806751,0.9998117380522009,0.9998136092534422,0.9998154618578773,0.9998172960502951,0.9998191120136494,0.9998209099290765,0.9998226899759135,0.9998244523317161,0.9998261971722765,0.9998279246716402,0.9998296350021243,0.9998313283343341,0.9998330048371801,0.9998346646778948,0.9998363080220497,0.9998379350335715,0.9998395458747585,0.9998411407062966,0.9998427196872756,0.9998442829752048,0.9998458307260288,0.9998473630941433,0.9998488802324098,0.9998503822921716,0.9998518694232681,0.9998533417740506,0.9998547994913963,0.9998562427207234,0.9998576716060052,0.9998590862897851,0.9998604869131902,0.9998618736159453,0.9998632465363873,0.9998646058114787,0.9998659515768216,0.9998672839666702,0.9998686031139457,0.999869909150248,0.99987120220587,0.9998724824098101,0.9998737498897847,0.999875004772242,0.9998762471823731,0.999877477244126,0.9998786950802167,0.9998799008121421,0.9998810945601921,0.9998822764434616,0.9998834465798618,0.9998846050861326,0.9998857520778541,0.999886887669458,0.9998880119742387,0.9998891251043655,0.9998902271708927,0.9998913182837715,0.9998923985518605,0.9998934680829367,0.9998945269837061,0.9998955753598148,0.9998966133158588,0.999897640955395,0.9998986583809515,0.9998996656940374,0.9999006629951532,0.9999016503838011,0.999902627958494,0.9999035958167667,0.9999045540551843,0.9999055027693525,0.9999064420539272,0.9999073720026235,0.9999082927082255,0.9999092042625951],"x":[-5.0,-4.995004995004995,-4.99000999000999,-4.985014985014985,-4.98001998001998,-4.975024975024975,-4.97002997002997,-4.965034965034965,-4.96003996003996,-4.955044955044955,-4.95004995004995,-4.945054945054945,-4.94005994005994,-4.935064935064935,-4.93006993006993,-4.9250749250749255,-4.92007992007992,-4.915084915084915,-4.91008991008991,-4.905094905094905,-4.9000999000999,-4.895104895104895,-4.8901098901098905,-4.885114885114885,-4.88011988011988,-4.875124875124875,-4.87012987012987,-4.865134865134865,-4.86013986013986,-4.8551448551448555,-4.85014985014985,-4.845154845154845,-4.84015984015984,-4.835164835164835,-4.83016983016983,-4.825174825174825,-4.8201798201798205,-4.815184815184815,-4.810189810189811,-4.805194805194805,-4.8001998001998,-4.795204795204795,-4.79020979020979,-4.7852147852147855,-4.78021978021978,-4.775224775224776,-4.77022977022977,-4.765234765234765,-4.76023976023976,-4.755244755244755,-4.7502497502497505,-4.745254745254745,-4.740259740259741,-4.735264735264735,-4.73026973026973,-4.725274725274725,-4.72027972027972,-4.7152847152847155,-4.71028971028971,-4.705294705294706,-4.7002997002997,-4.695304695304696,-4.69030969030969,-4.685314685314685,-4.6803196803196805,-4.675324675324675,-4.670329670329671,-4.665334665334665,-4.660339660339661,-4.655344655344655,-4.65034965034965,-4.6453546453546455,-4.64035964035964,-4.635364635364636,-4.63036963036963,-4.625374625374626,-4.62037962037962,-4.615384615384615,-4.6103896103896105,-4.605394605394605,-4.600399600399601,-4.595404595404595,-4.590409590409591,-4.585414585414585,-4.580419580419581,-4.5754245754245755,-4.57042957042957,-4.565434565434566,-4.56043956043956,-4.555444555444556,-4.55044955044955,-4.545454545454546,-4.5404595404595405,-4.535464535464535,-4.530469530469531,-4.525474525474525,-4.520479520479521,-4.515484515484515,-4.510489510489511,-4.5054945054945055,-4.5004995004995,-4.495504495504496,-4.49050949050949,-4.485514485514486,-4.48051948051948,-4.475524475524476,-4.4705294705294705,-4.465534465534465,-4.460539460539461,-4.455544455544455,-4.450549450549451,-4.445554445554445,-4.440559440559441,-4.4355644355644355,-4.430569430569431,-4.425574425574426,-4.42057942057942,-4.415584415584416,-4.41058941058941,-4.405594405594406,-4.4005994005994005,-4.395604395604396,-4.390609390609391,-4.385614385614385,-4.380619380619381,-4.375624375624375,-4.370629370629371,-4.3656343656343655,-4.360639360639361,-4.355644355644356,-4.35064935064935,-4.345654345654346,-4.34065934065934,-4.335664335664336,-4.3306693306693305,-4.325674325674326,-4.320679320679321,-4.315684315684316,-4.310689310689311,-4.305694305694305,-4.300699300699301,-4.2957042957042955,-4.290709290709291,-4.285714285714286,-4.280719280719281,-4.275724275724276,-4.27072927072927,-4.265734265734266,-4.2607392607392605,-4.255744255744256,-4.250749250749251,-4.245754245754246,-4.240759240759241,-4.235764235764235,-4.230769230769231,-4.2257742257742255,-4.220779220779221,-4.215784215784216,-4.210789210789211,-4.205794205794206,-4.200799200799201,-4.195804195804196,-4.1908091908091905,-4.185814185814186,-4.180819180819181,-4.175824175824176,-4.170829170829171,-4.165834165834166,-4.160839160839161,-4.1558441558441555,-4.150849150849151,-4.145854145854146,-4.140859140859141,-4.135864135864136,-4.130869130869131,-4.125874125874126,-4.1208791208791204,-4.115884115884116,-4.110889110889111,-4.105894105894106,-4.100899100899101,-4.095904095904096,-4.090909090909091,-4.085914085914086,-4.080919080919081,-4.075924075924076,-4.070929070929071,-4.065934065934066,-4.060939060939061,-4.055944055944056,-4.050949050949051,-4.045954045954046,-4.040959040959041,-4.035964035964036,-4.030969030969031,-4.025974025974026,-4.020979020979021,-4.015984015984016,-4.010989010989011,-4.005994005994006,-4.000999000999001,-3.996003996003996,-3.991008991008991,-3.986013986013986,-3.981018981018981,-3.976023976023976,-3.971028971028971,-3.966033966033966,-3.961038961038961,-3.956043956043956,-3.9510489510489513,-3.946053946053946,-3.941058941058941,-3.936063936063936,-3.931068931068931,-3.926073926073926,-3.921078921078921,-3.9160839160839163,-3.911088911088911,-3.906093906093906,-3.901098901098901,-3.896103896103896,-3.891108891108891,-3.886113886113886,-3.8811188811188813,-3.8761238761238763,-3.871128871128871,-3.866133866133866,-3.861138861138861,-3.856143856143856,-3.851148851148851,-3.8461538461538463,-3.8411588411588413,-3.8361638361638364,-3.831168831168831,-3.826173826173826,-3.821178821178821,-3.816183816183816,-3.8111888111888113,-3.8061938061938063,-3.8011988011988014,-3.796203796203796,-3.791208791208791,-3.786213786213786,-3.781218781218781,-3.7762237762237763,-3.7712287712287713,-3.7662337662337664,-3.7612387612387614,-3.756243756243756,-3.751248751248751,-3.746253746253746,-3.7412587412587412,-3.7362637362637363,-3.7312687312687314,-3.7262737262737264,-3.721278721278721,-3.716283716283716,-3.711288711288711,-3.7062937062937062,-3.7012987012987013,-3.6963036963036964,-3.6913086913086914,-3.6863136863136865,-3.681318681318681,-3.676323676323676,-3.6713286713286712,-3.6663336663336663,-3.6613386613386614,-3.6563436563436564,-3.6513486513486515,-3.6463536463536466,-3.641358641358641,-3.6363636363636362,-3.6313686313686313,-3.6263736263736264,-3.6213786213786214,-3.6163836163836165,-3.6113886113886116,-3.606393606393606,-3.6013986013986012,-3.5964035964035963,-3.5914085914085914,-3.5864135864135864,-3.5814185814185815,-3.5764235764235766,-3.5714285714285716,-3.5664335664335662,-3.5614385614385613,-3.5564435564435564,-3.5514485514485514,-3.5464535464535465,-3.5414585414585416,-3.5364635364635366,-3.5314685314685317,-3.5264735264735263,-3.5214785214785214,-3.5164835164835164,-3.5114885114885115,-3.5064935064935066,-3.5014985014985016,-3.4965034965034967,-3.4915084915084913,-3.4865134865134864,-3.4815184815184814,-3.4765234765234765,-3.4715284715284715,-3.4665334665334666,-3.4615384615384617,-3.4565434565434567,-3.4515484515484514,-3.4465534465534464,-3.4415584415584415,-3.4365634365634365,-3.4315684315684316,-3.4265734265734267,-3.4215784215784217,-3.416583416583417,-3.4115884115884114,-3.4065934065934065,-3.4015984015984015,-3.3966033966033966,-3.3916083916083917,-3.3866133866133867,-3.381618381618382,-3.3766233766233764,-3.3716283716283715,-3.3666333666333665,-3.3616383616383616,-3.3566433566433567,-3.3516483516483517,-3.346653346653347,-3.341658341658342,-3.3366633366633365,-3.3316683316683315,-3.3266733266733266,-3.3216783216783217,-3.3166833166833167,-3.311688311688312,-3.306693306693307,-3.301698301698302,-3.2967032967032965,-3.2917082917082916,-3.2867132867132867,-3.2817182817182817,-3.276723276723277,-3.271728271728272,-3.266733266733267,-3.2617382617382615,-3.2567432567432566,-3.2517482517482517,-3.2467532467532467,-3.241758241758242,-3.236763236763237,-3.231768231768232,-3.226773226773227,-3.2217782217782216,-3.2167832167832167,-3.2117882117882117,-3.206793206793207,-3.201798201798202,-3.196803196803197,-3.191808191808192,-3.1868131868131866,-3.1818181818181817,-3.1768231768231767,-3.171828171828172,-3.166833166833167,-3.161838161838162,-3.156843156843157,-3.151848151848152,-3.1468531468531467,-3.1418581418581417,-3.136863136863137,-3.131868131868132,-3.126873126873127,-3.121878121878122,-3.116883116883117,-3.111888111888112,-3.1068931068931067,-3.101898101898102,-3.096903096903097,-3.091908091908092,-3.086913086913087,-3.081918081918082,-3.076923076923077,-3.0719280719280717,-3.0669330669330668,-3.061938061938062,-3.056943056943057,-3.051948051948052,-3.046953046953047,-3.041958041958042,-3.036963036963037,-3.0319680319680318,-3.026973026973027,-3.021978021978022,-3.016983016983017,-3.011988011988012,-3.006993006993007,-3.001998001998002,-2.997002997002997,-2.992007992007992,-2.987012987012987,-2.982017982017982,-2.977022977022977,-2.972027972027972,-2.967032967032967,-2.962037962037962,-2.957042957042957,-2.952047952047952,-2.947052947052947,-2.942057942057942,-2.937062937062937,-2.932067932067932,-2.927072927072927,-2.9220779220779223,-2.917082917082917,-2.912087912087912,-2.907092907092907,-2.902097902097902,-2.897102897102897,-2.892107892107892,-2.8871128871128873,-2.8821178821178823,-2.877122877122877,-2.872127872127872,-2.867132867132867,-2.862137862137862,-2.857142857142857,-2.8521478521478523,-2.8471528471528473,-2.842157842157842,-2.837162837162837,-2.832167832167832,-2.827172827172827,-2.822177822177822,-2.8171828171828173,-2.8121878121878123,-2.8071928071928074,-2.802197802197802,-2.797202797202797,-2.792207792207792,-2.787212787212787,-2.7822177822177823,-2.7772227772227773,-2.7722277722277724,-2.7672327672327675,-2.762237762237762,-2.757242757242757,-2.752247752247752,-2.7472527472527473,-2.7422577422577423,-2.7372627372627374,-2.7322677322677325,-2.727272727272727,-2.722277722277722,-2.717282717282717,-2.7122877122877123,-2.7072927072927073,-2.7022977022977024,-2.6973026973026974,-2.6923076923076925,-2.687312687312687,-2.682317682317682,-2.6773226773226773,-2.6723276723276723,-2.6673326673326674,-2.6623376623376624,-2.6573426573426575,-2.652347652347652,-2.647352647352647,-2.6423576423576423,-2.6373626373626373,-2.6323676323676324,-2.6273726273726274,-2.6223776223776225,-2.6173826173826176,-2.612387612387612,-2.6073926073926073,-2.6023976023976023,-2.5974025974025974,-2.5924075924075924,-2.5874125874125875,-2.5824175824175826,-2.5774225774225776,-2.5724275724275723,-2.5674325674325673,-2.5624375624375624,-2.5574425574425574,-2.5524475524475525,-2.5474525474525476,-2.5424575424575426,-2.5374625374625372,-2.5324675324675323,-2.5274725274725274,-2.5224775224775224,-2.5174825174825175,-2.5124875124875126,-2.5074925074925076,-2.5024975024975027,-2.4975024975024973,-2.4925074925074924,-2.4875124875124874,-2.4825174825174825,-2.4775224775224776,-2.4725274725274726,-2.4675324675324677,-2.4625374625374628,-2.4575424575424574,-2.4525474525474524,-2.4475524475524475,-2.4425574425574426,-2.4375624375624376,-2.4325674325674327,-2.4275724275724277,-2.4225774225774224,-2.4175824175824174,-2.4125874125874125,-2.4075924075924076,-2.4025974025974026,-2.3976023976023977,-2.3926073926073927,-2.387612387612388,-2.3826173826173824,-2.3776223776223775,-2.3726273726273726,-2.3676323676323676,-2.3626373626373627,-2.3576423576423577,-2.352647352647353,-2.347652347652348,-2.3426573426573425,-2.3376623376623376,-2.3326673326673326,-2.3276723276723277,-2.3226773226773227,-2.317682317682318,-2.312687312687313,-2.3076923076923075,-2.3026973026973026,-2.2977022977022976,-2.2927072927072927,-2.2877122877122877,-2.282717282717283,-2.277722277722278,-2.272727272727273,-2.2677322677322675,-2.2627372627372626,-2.2577422577422577,-2.2527472527472527,-2.247752247752248,-2.242757242757243,-2.237762237762238,-2.2327672327672325,-2.2277722277722276,-2.2227772227772227,-2.2177822177822177,-2.212787212787213,-2.207792207792208,-2.202797202797203,-2.197802197802198,-2.1928071928071926,-2.1878121878121877,-2.1828171828171827,-2.177822177822178,-2.172827172827173,-2.167832167832168,-2.162837162837163,-2.157842157842158,-2.1528471528471527,-2.1478521478521477,-2.142857142857143,-2.137862137862138,-2.132867132867133,-2.127872127872128,-2.122877122877123,-2.1178821178821177,-2.1128871128871127,-2.107892107892108,-2.102897102897103,-2.097902097902098,-2.092907092907093,-2.087912087912088,-2.082917082917083,-2.0779220779220777,-2.072927072927073,-2.067932067932068,-2.062937062937063,-2.057942057942058,-2.052947052947053,-2.047952047952048,-2.042957042957043,-2.037962037962038,-2.032967032967033,-2.027972027972028,-2.022977022977023,-2.017982017982018,-2.012987012987013,-2.007992007992008,-2.002997002997003,-1.998001998001998,-1.993006993006993,-1.988011988011988,-1.983016983016983,-1.978021978021978,-1.973026973026973,-1.968031968031968,-1.963036963036963,-1.9580419580419581,-1.953046953046953,-1.948051948051948,-1.943056943056943,-1.9380619380619382,-1.933066933066933,-1.928071928071928,-1.9230769230769231,-1.9180819180819182,-1.913086913086913,-1.908091908091908,-1.9030969030969032,-1.898101898101898,-1.893106893106893,-1.8881118881118881,-1.8831168831168832,-1.878121878121878,-1.873126873126873,-1.8681318681318682,-1.8631368631368632,-1.858141858141858,-1.8531468531468531,-1.8481518481518482,-1.8431568431568432,-1.838161838161838,-1.8331668331668332,-1.8281718281718282,-1.8231768231768233,-1.8181818181818181,-1.8131868131868132,-1.8081918081918082,-1.803196803196803,-1.7982017982017982,-1.7932067932067932,-1.7882117882117883,-1.7832167832167831,-1.7782217782217782,-1.7732267732267732,-1.7682317682317683,-1.7632367632367631,-1.7582417582417582,-1.7532467532467533,-1.7482517482517483,-1.7432567432567432,-1.7382617382617382,-1.7332667332667333,-1.7282717282717284,-1.7232767232767232,-1.7182817182817183,-1.7132867132867133,-1.7082917082917084,-1.7032967032967032,-1.6983016983016983,-1.6933066933066934,-1.6883116883116882,-1.6833166833166833,-1.6783216783216783,-1.6733266733266734,-1.6683316683316682,-1.6633366633366633,-1.6583416583416584,-1.6533466533466534,-1.6483516483516483,-1.6433566433566433,-1.6383616383616384,-1.6333666333666335,-1.6283716283716283,-1.6233766233766234,-1.6183816183816184,-1.6133866133866135,-1.6083916083916083,-1.6033966033966034,-1.5984015984015985,-1.5934065934065933,-1.5884115884115884,-1.5834165834165834,-1.5784215784215785,-1.5734265734265733,-1.5684315684315684,-1.5634365634365635,-1.5584415584415585,-1.5534465534465534,-1.5484515484515484,-1.5434565434565435,-1.5384615384615385,-1.5334665334665334,-1.5284715284715285,-1.5234765234765235,-1.5184815184815186,-1.5134865134865134,-1.5084915084915085,-1.5034965034965035,-1.4985014985014986,-1.4935064935064934,-1.4885114885114885,-1.4835164835164836,-1.4785214785214784,-1.4735264735264735,-1.4685314685314685,-1.4635364635364636,-1.4585414585414584,-1.4535464535464535,-1.4485514485514486,-1.4435564435564436,-1.4385614385614385,-1.4335664335664335,-1.4285714285714286,-1.4235764235764237,-1.4185814185814185,-1.4135864135864136,-1.4085914085914086,-1.4035964035964037,-1.3986013986013985,-1.3936063936063936,-1.3886113886113887,-1.3836163836163837,-1.3786213786213786,-1.3736263736263736,-1.3686313686313687,-1.3636363636363635,-1.3586413586413586,-1.3536463536463537,-1.3486513486513487,-1.3436563436563436,-1.3386613386613386,-1.3336663336663337,-1.3286713286713288,-1.3236763236763236,-1.3186813186813187,-1.3136863136863137,-1.3086913086913088,-1.3036963036963036,-1.2987012987012987,-1.2937062937062938,-1.2887112887112888,-1.2837162837162837,-1.2787212787212787,-1.2737262737262738,-1.2687312687312686,-1.2637362637362637,-1.2587412587412588,-1.2537462537462538,-1.2487512487512487,-1.2437562437562437,-1.2387612387612388,-1.2337662337662338,-1.2287712287712287,-1.2237762237762237,-1.2187812187812188,-1.2137862137862139,-1.2087912087912087,-1.2037962037962038,-1.1988011988011988,-1.193806193806194,-1.1888111888111887,-1.1838161838161838,-1.1788211788211789,-1.173826173826174,-1.1688311688311688,-1.1638361638361638,-1.158841158841159,-1.1538461538461537,-1.1488511488511488,-1.1438561438561439,-1.138861138861139,-1.1338661338661338,-1.1288711288711288,-1.123876123876124,-1.118881118881119,-1.1138861138861138,-1.1088911088911089,-1.103896103896104,-1.098901098901099,-1.0939060939060938,-1.088911088911089,-1.083916083916084,-1.078921078921079,-1.0739260739260739,-1.068931068931069,-1.063936063936064,-1.0589410589410588,-1.053946053946054,-1.048951048951049,-1.043956043956044,-1.0389610389610389,-1.033966033966034,-1.028971028971029,-1.023976023976024,-1.018981018981019,-1.013986013986014,-1.008991008991009,-1.003996003996004,-0.999000999000999,-0.994005994005994,-0.989010989010989,-0.984015984015984,-0.9790209790209791,-0.974025974025974,-0.9690309690309691,-0.964035964035964,-0.9590409590409591,-0.954045954045954,-0.949050949050949,-0.9440559440559441,-0.939060939060939,-0.9340659340659341,-0.929070929070929,-0.9240759240759241,-0.919080919080919,-0.9140859140859141,-0.9090909090909091,-0.9040959040959041,-0.8991008991008991,-0.8941058941058941,-0.8891108891108891,-0.8841158841158842,-0.8791208791208791,-0.8741258741258742,-0.8691308691308691,-0.8641358641358642,-0.8591408591408591,-0.8541458541458542,-0.8491508491508492,-0.8441558441558441,-0.8391608391608392,-0.8341658341658341,-0.8291708291708292,-0.8241758241758241,-0.8191808191808192,-0.8141858141858141,-0.8091908091908092,-0.8041958041958042,-0.7992007992007992,-0.7942057942057942,-0.7892107892107892,-0.7842157842157842,-0.7792207792207793,-0.7742257742257742,-0.7692307692307693,-0.7642357642357642,-0.7592407592407593,-0.7542457542457542,-0.7492507492507493,-0.7442557442557443,-0.7392607392607392,-0.7342657342657343,-0.7292707292707292,-0.7242757242757243,-0.7192807192807192,-0.7142857142857143,-0.7092907092907093,-0.7042957042957043,-0.6993006993006993,-0.6943056943056943,-0.6893106893106893,-0.6843156843156843,-0.6793206793206793,-0.6743256743256744,-0.6693306693306693,-0.6643356643356644,-0.6593406593406593,-0.6543456543456544,-0.6493506493506493,-0.6443556443556444,-0.6393606393606394,-0.6343656343656343,-0.6293706293706294,-0.6243756243756243,-0.6193806193806194,-0.6143856143856143,-0.6093906093906094,-0.6043956043956044,-0.5994005994005994,-0.5944055944055944,-0.5894105894105894,-0.5844155844155844,-0.5794205794205795,-0.5744255744255744,-0.5694305694305695,-0.5644355644355644,-0.5594405594405595,-0.5544455544455544,-0.5494505494505495,-0.5444555444555444,-0.5394605394605395,-0.5344655344655345,-0.5294705294705294,-0.5244755244755245,-0.5194805194805194,-0.5144855144855145,-0.5094905094905094,-0.5044955044955045,-0.4995004995004995,-0.4945054945054945,-0.48951048951048953,-0.48451548451548454,-0.47952047952047955,-0.4745254745254745,-0.4695304695304695,-0.4645354645354645,-0.4595404595404595,-0.45454545454545453,-0.44955044955044954,-0.44455544455544455,-0.43956043956043955,-0.43456543456543456,-0.42957042957042957,-0.4245754245754246,-0.4195804195804196,-0.4145854145854146,-0.4095904095904096,-0.4045954045954046,-0.3996003996003996,-0.3946053946053946,-0.38961038961038963,-0.38461538461538464,-0.37962037962037964,-0.37462537462537465,-0.3696303696303696,-0.3646353646353646,-0.3596403596403596,-0.3546453546453546,-0.34965034965034963,-0.34465534465534464,-0.33966033966033965,-0.33466533466533466,-0.32967032967032966,-0.3246753246753247,-0.3196803196803197,-0.3146853146853147,-0.3096903096903097,-0.3046953046953047,-0.2997002997002997,-0.2947052947052947,-0.2897102897102897,-0.28471528471528473,-0.27972027972027974,-0.27472527472527475,-0.26973026973026976,-0.2647352647352647,-0.2597402597402597,-0.2547452547452547,-0.24975024975024976,-0.24475524475524477,-0.23976023976023977,-0.23476523476523475,-0.22977022977022976,-0.22477522477522477,-0.21978021978021978,-0.21478521478521478,-0.2097902097902098,-0.2047952047952048,-0.1998001998001998,-0.19480519480519481,-0.18981018981018982,-0.1848151848151848,-0.1798201798201798,-0.17482517482517482,-0.16983016983016982,-0.16483516483516483,-0.15984015984015984,-0.15484515484515485,-0.14985014985014986,-0.14485514485514486,-0.13986013986013987,-0.13486513486513488,-0.12987012987012986,-0.12487512487512488,-0.11988011988011989,-0.11488511488511488,-0.10989010989010989,-0.1048951048951049,-0.0999000999000999,-0.09490509490509491,-0.0899100899100899,-0.08491508491508491,-0.07992007992007992,-0.07492507492507493,-0.06993006993006994,-0.06493506493506493,-0.059940059940059943,-0.054945054945054944,-0.04995004995004995,-0.04495504495504495,-0.03996003996003996,-0.03496503496503497,-0.029970029970029972,-0.024975024975024976,-0.01998001998001998,-0.014985014985014986,-0.00999000999000999,-0.004995004995004995,0.0,0.004995004995004995,0.00999000999000999,0.014985014985014986,0.01998001998001998,0.024975024975024976,0.029970029970029972,0.03496503496503497,0.03996003996003996,0.04495504495504495,0.04995004995004995,0.054945054945054944,0.059940059940059943,0.06493506493506493,0.06993006993006994,0.07492507492507493,0.07992007992007992,0.08491508491508491,0.0899100899100899,0.09490509490509491,0.0999000999000999,0.1048951048951049,0.10989010989010989,0.11488511488511488,0.11988011988011989,0.12487512487512488,0.12987012987012986,0.13486513486513488,0.13986013986013987,0.14485514485514486,0.14985014985014986,0.15484515484515485,0.15984015984015984,0.16483516483516483,0.16983016983016982,0.17482517482517482,0.1798201798201798,0.1848151848151848,0.18981018981018982,0.19480519480519481,0.1998001998001998,0.2047952047952048,0.2097902097902098,0.21478521478521478,0.21978021978021978,0.22477522477522477,0.22977022977022976,0.23476523476523475,0.23976023976023977,0.24475524475524477,0.24975024975024976,0.2547452547452547,0.2597402597402597,0.2647352647352647,0.26973026973026976,0.27472527472527475,0.27972027972027974,0.28471528471528473,0.2897102897102897,0.2947052947052947,0.2997002997002997,0.3046953046953047,0.3096903096903097,0.3146853146853147,0.3196803196803197,0.3246753246753247,0.32967032967032966,0.33466533466533466,0.33966033966033965,0.34465534465534464,0.34965034965034963,0.3546453546453546,0.3596403596403596,0.3646353646353646,0.3696303696303696,0.37462537462537465,0.37962037962037964,0.38461538461538464,0.38961038961038963,0.3946053946053946,0.3996003996003996,0.4045954045954046,0.4095904095904096,0.4145854145854146,0.4195804195804196,0.4245754245754246,0.42957042957042957,0.43456543456543456,0.43956043956043955,0.44455544455544455,0.44955044955044954,0.45454545454545453,0.4595404595404595,0.4645354645354645,0.4695304695304695,0.4745254745254745,0.47952047952047955,0.48451548451548454,0.48951048951048953,0.4945054945054945,0.4995004995004995,0.5044955044955045,0.5094905094905094,0.5144855144855145,0.5194805194805194,0.5244755244755245,0.5294705294705294,0.5344655344655345,0.5394605394605395,0.5444555444555444,0.5494505494505495,0.5544455544455544,0.5594405594405595,0.5644355644355644,0.5694305694305695,0.5744255744255744,0.5794205794205795,0.5844155844155844,0.5894105894105894,0.5944055944055944,0.5994005994005994,0.6043956043956044,0.6093906093906094,0.6143856143856143,0.6193806193806194,0.6243756243756243,0.6293706293706294,0.6343656343656343,0.6393606393606394,0.6443556443556444,0.6493506493506493,0.6543456543456544,0.6593406593406593,0.6643356643356644,0.6693306693306693,0.6743256743256744,0.6793206793206793,0.6843156843156843,0.6893106893106893,0.6943056943056943,0.6993006993006993,0.7042957042957043,0.7092907092907093,0.7142857142857143,0.7192807192807192,0.7242757242757243,0.7292707292707292,0.7342657342657343,0.7392607392607392,0.7442557442557443,0.7492507492507493,0.7542457542457542,0.7592407592407593,0.7642357642357642,0.7692307692307693,0.7742257742257742,0.7792207792207793,0.7842157842157842,0.7892107892107892,0.7942057942057942,0.7992007992007992,0.8041958041958042,0.8091908091908092,0.8141858141858141,0.8191808191808192,0.8241758241758241,0.8291708291708292,0.8341658341658341,0.8391608391608392,0.8441558441558441,0.8491508491508492,0.8541458541458542,0.8591408591408591,0.8641358641358642,0.8691308691308691,0.8741258741258742,0.8791208791208791,0.8841158841158842,0.8891108891108891,0.8941058941058941,0.8991008991008991,0.9040959040959041,0.9090909090909091,0.9140859140859141,0.919080919080919,0.9240759240759241,0.929070929070929,0.9340659340659341,0.939060939060939,0.9440559440559441,0.949050949050949,0.954045954045954,0.9590409590409591,0.964035964035964,0.9690309690309691,0.974025974025974,0.9790209790209791,0.984015984015984,0.989010989010989,0.994005994005994,0.999000999000999,1.003996003996004,1.008991008991009,1.013986013986014,1.018981018981019,1.023976023976024,1.028971028971029,1.033966033966034,1.0389610389610389,1.043956043956044,1.048951048951049,1.053946053946054,1.0589410589410588,1.063936063936064,1.068931068931069,1.0739260739260739,1.078921078921079,1.083916083916084,1.088911088911089,1.0939060939060938,1.098901098901099,1.103896103896104,1.1088911088911089,1.1138861138861138,1.118881118881119,1.123876123876124,1.1288711288711288,1.1338661338661338,1.138861138861139,1.1438561438561439,1.1488511488511488,1.1538461538461537,1.158841158841159,1.1638361638361638,1.1688311688311688,1.173826173826174,1.1788211788211789,1.1838161838161838,1.1888111888111887,1.193806193806194,1.1988011988011988,1.2037962037962038,1.2087912087912087,1.2137862137862139,1.2187812187812188,1.2237762237762237,1.2287712287712287,1.2337662337662338,1.2387612387612388,1.2437562437562437,1.2487512487512487,1.2537462537462538,1.2587412587412588,1.2637362637362637,1.2687312687312686,1.2737262737262738,1.2787212787212787,1.2837162837162837,1.2887112887112888,1.2937062937062938,1.2987012987012987,1.3036963036963036,1.3086913086913088,1.3136863136863137,1.3186813186813187,1.3236763236763236,1.3286713286713288,1.3336663336663337,1.3386613386613386,1.3436563436563436,1.3486513486513487,1.3536463536463537,1.3586413586413586,1.3636363636363635,1.3686313686313687,1.3736263736263736,1.3786213786213786,1.3836163836163837,1.3886113886113887,1.3936063936063936,1.3986013986013985,1.4035964035964037,1.4085914085914086,1.4135864135864136,1.4185814185814185,1.4235764235764237,1.4285714285714286,1.4335664335664335,1.4385614385614385,1.4435564435564436,1.4485514485514486,1.4535464535464535,1.4585414585414584,1.4635364635364636,1.4685314685314685,1.4735264735264735,1.4785214785214784,1.4835164835164836,1.4885114885114885,1.4935064935064934,1.4985014985014986,1.5034965034965035,1.5084915084915085,1.5134865134865134,1.5184815184815186,1.5234765234765235,1.5284715284715285,1.5334665334665334,1.5384615384615385,1.5434565434565435,1.5484515484515484,1.5534465534465534,1.5584415584415585,1.5634365634365635,1.5684315684315684,1.5734265734265733,1.5784215784215785,1.5834165834165834,1.5884115884115884,1.5934065934065933,1.5984015984015985,1.6033966033966034,1.6083916083916083,1.6133866133866135,1.6183816183816184,1.6233766233766234,1.6283716283716283,1.6333666333666335,1.6383616383616384,1.6433566433566433,1.6483516483516483,1.6533466533466534,1.6583416583416584,1.6633366633366633,1.6683316683316682,1.6733266733266734,1.6783216783216783,1.6833166833166833,1.6883116883116882,1.6933066933066934,1.6983016983016983,1.7032967032967032,1.7082917082917084,1.7132867132867133,1.7182817182817183,1.7232767232767232,1.7282717282717284,1.7332667332667333,1.7382617382617382,1.7432567432567432,1.7482517482517483,1.7532467532467533,1.7582417582417582,1.7632367632367631,1.7682317682317683,1.7732267732267732,1.7782217782217782,1.7832167832167831,1.7882117882117883,1.7932067932067932,1.7982017982017982,1.803196803196803,1.8081918081918082,1.8131868131868132,1.8181818181818181,1.8231768231768233,1.8281718281718282,1.8331668331668332,1.838161838161838,1.8431568431568432,1.8481518481518482,1.8531468531468531,1.858141858141858,1.8631368631368632,1.8681318681318682,1.873126873126873,1.878121878121878,1.8831168831168832,1.8881118881118881,1.893106893106893,1.898101898101898,1.9030969030969032,1.908091908091908,1.913086913086913,1.9180819180819182,1.9230769230769231,1.928071928071928,1.933066933066933,1.9380619380619382,1.943056943056943,1.948051948051948,1.953046953046953,1.9580419580419581,1.963036963036963,1.968031968031968,1.973026973026973,1.978021978021978,1.983016983016983,1.988011988011988,1.993006993006993,1.998001998001998,2.002997002997003,2.007992007992008,2.012987012987013,2.017982017982018,2.022977022977023,2.027972027972028,2.032967032967033,2.037962037962038,2.042957042957043,2.047952047952048,2.052947052947053,2.057942057942058,2.062937062937063,2.067932067932068,2.072927072927073,2.0779220779220777,2.082917082917083,2.087912087912088,2.092907092907093,2.097902097902098,2.102897102897103,2.107892107892108,2.1128871128871127,2.1178821178821177,2.122877122877123,2.127872127872128,2.132867132867133,2.137862137862138,2.142857142857143,2.1478521478521477,2.1528471528471527,2.157842157842158,2.162837162837163,2.167832167832168,2.172827172827173,2.177822177822178,2.1828171828171827,2.1878121878121877,2.1928071928071926,2.197802197802198,2.202797202797203,2.207792207792208,2.212787212787213,2.2177822177822177,2.2227772227772227,2.2277722277722276,2.2327672327672325,2.237762237762238,2.242757242757243,2.247752247752248,2.2527472527472527,2.2577422577422577,2.2627372627372626,2.2677322677322675,2.272727272727273,2.277722277722278,2.282717282717283,2.2877122877122877,2.2927072927072927,2.2977022977022976,2.3026973026973026,2.3076923076923075,2.312687312687313,2.317682317682318,2.3226773226773227,2.3276723276723277,2.3326673326673326,2.3376623376623376,2.3426573426573425,2.347652347652348,2.352647352647353,2.3576423576423577,2.3626373626373627,2.3676323676323676,2.3726273726273726,2.3776223776223775,2.3826173826173824,2.387612387612388,2.3926073926073927,2.3976023976023977,2.4025974025974026,2.4075924075924076,2.4125874125874125,2.4175824175824174,2.4225774225774224,2.4275724275724277,2.4325674325674327,2.4375624375624376,2.4425574425574426,2.4475524475524475,2.4525474525474524,2.4575424575424574,2.4625374625374628,2.4675324675324677,2.4725274725274726,2.4775224775224776,2.4825174825174825,2.4875124875124874,2.4925074925074924,2.4975024975024973,2.5024975024975027,2.5074925074925076,2.5124875124875126,2.5174825174825175,2.5224775224775224,2.5274725274725274,2.5324675324675323,2.5374625374625372,2.5424575424575426,2.5474525474525476,2.5524475524475525,2.5574425574425574,2.5624375624375624,2.5674325674325673,2.5724275724275723,2.5774225774225776,2.5824175824175826,2.5874125874125875,2.5924075924075924,2.5974025974025974,2.6023976023976023,2.6073926073926073,2.612387612387612,2.6173826173826176,2.6223776223776225,2.6273726273726274,2.6323676323676324,2.6373626373626373,2.6423576423576423,2.647352647352647,2.652347652347652,2.6573426573426575,2.6623376623376624,2.6673326673326674,2.6723276723276723,2.6773226773226773,2.682317682317682,2.687312687312687,2.6923076923076925,2.6973026973026974,2.7022977022977024,2.7072927072927073,2.7122877122877123,2.717282717282717,2.722277722277722,2.727272727272727,2.7322677322677325,2.7372627372627374,2.7422577422577423,2.7472527472527473,2.752247752247752,2.757242757242757,2.762237762237762,2.7672327672327675,2.7722277722277724,2.7772227772227773,2.7822177822177823,2.787212787212787,2.792207792207792,2.797202797202797,2.802197802197802,2.8071928071928074,2.8121878121878123,2.8171828171828173,2.822177822177822,2.827172827172827,2.832167832167832,2.837162837162837,2.842157842157842,2.8471528471528473,2.8521478521478523,2.857142857142857,2.862137862137862,2.867132867132867,2.872127872127872,2.877122877122877,2.8821178821178823,2.8871128871128873,2.892107892107892,2.897102897102897,2.902097902097902,2.907092907092907,2.912087912087912,2.917082917082917,2.9220779220779223,2.927072927072927,2.932067932067932,2.937062937062937,2.942057942057942,2.947052947052947,2.952047952047952,2.957042957042957,2.962037962037962,2.967032967032967,2.972027972027972,2.977022977022977,2.982017982017982,2.987012987012987,2.992007992007992,2.997002997002997,3.001998001998002,3.006993006993007,3.011988011988012,3.016983016983017,3.021978021978022,3.026973026973027,3.0319680319680318,3.036963036963037,3.041958041958042,3.046953046953047,3.051948051948052,3.056943056943057,3.061938061938062,3.0669330669330668,3.0719280719280717,3.076923076923077,3.081918081918082,3.086913086913087,3.091908091908092,3.096903096903097,3.101898101898102,3.1068931068931067,3.111888111888112,3.116883116883117,3.121878121878122,3.126873126873127,3.131868131868132,3.136863136863137,3.1418581418581417,3.1468531468531467,3.151848151848152,3.156843156843157,3.161838161838162,3.166833166833167,3.171828171828172,3.1768231768231767,3.1818181818181817,3.1868131868131866,3.191808191808192,3.196803196803197,3.201798201798202,3.206793206793207,3.2117882117882117,3.2167832167832167,3.2217782217782216,3.226773226773227,3.231768231768232,3.236763236763237,3.241758241758242,3.2467532467532467,3.2517482517482517,3.2567432567432566,3.2617382617382615,3.266733266733267,3.271728271728272,3.276723276723277,3.2817182817182817,3.2867132867132867,3.2917082917082916,3.2967032967032965,3.301698301698302,3.306693306693307,3.311688311688312,3.3166833166833167,3.3216783216783217,3.3266733266733266,3.3316683316683315,3.3366633366633365,3.341658341658342,3.346653346653347,3.3516483516483517,3.3566433566433567,3.3616383616383616,3.3666333666333665,3.3716283716283715,3.3766233766233764,3.381618381618382,3.3866133866133867,3.3916083916083917,3.3966033966033966,3.4015984015984015,3.4065934065934065,3.4115884115884114,3.416583416583417,3.4215784215784217,3.4265734265734267,3.4315684315684316,3.4365634365634365,3.4415584415584415,3.4465534465534464,3.4515484515484514,3.4565434565434567,3.4615384615384617,3.4665334665334666,3.4715284715284715,3.4765234765234765,3.4815184815184814,3.4865134865134864,3.4915084915084913,3.4965034965034967,3.5014985014985016,3.5064935064935066,3.5114885114885115,3.5164835164835164,3.5214785214785214,3.5264735264735263,3.5314685314685317,3.5364635364635366,3.5414585414585416,3.5464535464535465,3.5514485514485514,3.5564435564435564,3.5614385614385613,3.5664335664335662,3.5714285714285716,3.5764235764235766,3.5814185814185815,3.5864135864135864,3.5914085914085914,3.5964035964035963,3.6013986013986012,3.606393606393606,3.6113886113886116,3.6163836163836165,3.6213786213786214,3.6263736263736264,3.6313686313686313,3.6363636363636362,3.641358641358641,3.6463536463536466,3.6513486513486515,3.6563436563436564,3.6613386613386614,3.6663336663336663,3.6713286713286712,3.676323676323676,3.681318681318681,3.6863136863136865,3.6913086913086914,3.6963036963036964,3.7012987012987013,3.7062937062937062,3.711288711288711,3.716283716283716,3.721278721278721,3.7262737262737264,3.7312687312687314,3.7362637362637363,3.7412587412587412,3.746253746253746,3.751248751248751,3.756243756243756,3.7612387612387614,3.7662337662337664,3.7712287712287713,3.7762237762237763,3.781218781218781,3.786213786213786,3.791208791208791,3.796203796203796,3.8011988011988014,3.8061938061938063,3.8111888111888113,3.816183816183816,3.821178821178821,3.826173826173826,3.831168831168831,3.8361638361638364,3.8411588411588413,3.8461538461538463,3.851148851148851,3.856143856143856,3.861138861138861,3.866133866133866,3.871128871128871,3.8761238761238763,3.8811188811188813,3.886113886113886,3.891108891108891,3.896103896103896,3.901098901098901,3.906093906093906,3.911088911088911,3.9160839160839163,3.921078921078921,3.926073926073926,3.931068931068931,3.936063936063936,3.941058941058941,3.946053946053946,3.9510489510489513,3.956043956043956,3.961038961038961,3.966033966033966,3.971028971028971,3.976023976023976,3.981018981018981,3.986013986013986,3.991008991008991,3.996003996003996,4.000999000999001,4.005994005994006,4.010989010989011,4.015984015984016,4.020979020979021,4.025974025974026,4.030969030969031,4.035964035964036,4.040959040959041,4.045954045954046,4.050949050949051,4.055944055944056,4.060939060939061,4.065934065934066,4.070929070929071,4.075924075924076,4.080919080919081,4.085914085914086,4.090909090909091,4.095904095904096,4.100899100899101,4.105894105894106,4.110889110889111,4.115884115884116,4.1208791208791204,4.125874125874126,4.130869130869131,4.135864135864136,4.140859140859141,4.145854145854146,4.150849150849151,4.1558441558441555,4.160839160839161,4.165834165834166,4.170829170829171,4.175824175824176,4.180819180819181,4.185814185814186,4.1908091908091905,4.195804195804196,4.200799200799201,4.205794205794206,4.210789210789211,4.215784215784216,4.220779220779221,4.2257742257742255,4.230769230769231,4.235764235764235,4.240759240759241,4.245754245754246,4.250749250749251,4.255744255744256,4.2607392607392605,4.265734265734266,4.27072927072927,4.275724275724276,4.280719280719281,4.285714285714286,4.290709290709291,4.2957042957042955,4.300699300699301,4.305694305694305,4.310689310689311,4.315684315684316,4.320679320679321,4.325674325674326,4.3306693306693305,4.335664335664336,4.34065934065934,4.345654345654346,4.35064935064935,4.355644355644356,4.360639360639361,4.3656343656343655,4.370629370629371,4.375624375624375,4.380619380619381,4.385614385614385,4.390609390609391,4.395604395604396,4.4005994005994005,4.405594405594406,4.41058941058941,4.415584415584416,4.42057942057942,4.425574425574426,4.430569430569431,4.4355644355644355,4.440559440559441,4.445554445554445,4.450549450549451,4.455544455544455,4.460539460539461,4.465534465534465,4.4705294705294705,4.475524475524476,4.48051948051948,4.485514485514486,4.49050949050949,4.495504495504496,4.5004995004995,4.5054945054945055,4.510489510489511,4.515484515484515,4.520479520479521,4.525474525474525,4.530469530469531,4.535464535464535,4.5404595404595405,4.545454545454546,4.55044955044955,4.555444555444556,4.56043956043956,4.565434565434566,4.57042957042957,4.5754245754245755,4.580419580419581,4.585414585414585,4.590409590409591,4.595404595404595,4.600399600399601,4.605394605394605,4.6103896103896105,4.615384615384615,4.62037962037962,4.625374625374626,4.63036963036963,4.635364635364636,4.64035964035964,4.6453546453546455,4.65034965034965,4.655344655344655,4.660339660339661,4.665334665334665,4.670329670329671,4.675324675324675,4.6803196803196805,4.685314685314685,4.69030969030969,4.695304695304696,4.7002997002997,4.705294705294706,4.71028971028971,4.7152847152847155,4.72027972027972,4.725274725274725,4.73026973026973,4.735264735264735,4.740259740259741,4.745254745254745,4.7502497502497505,4.755244755244755,4.76023976023976,4.765234765234765,4.77022977022977,4.775224775224776,4.78021978021978,4.7852147852147855,4.79020979020979,4.795204795204795,4.8001998001998,4.805194805194805,4.810189810189811,4.815184815184815,4.8201798201798205,4.825174825174825,4.83016983016983,4.835164835164835,4.84015984015984,4.845154845154845,4.85014985014985,4.8551448551448555,4.86013986013986,4.865134865134865,4.87012987012987,4.875124875124875,4.88011988011988,4.885114885114885,4.8901098901098905,4.895104895104895,4.9000999000999,4.905094905094905,4.91008991008991,4.915084915084915,4.92007992007992,4.9250749250749255,4.93006993006993,4.935064935064935,4.94005994005994,4.945054945054945,4.95004995004995,4.955044955044955,4.96003996003996,4.965034965034965,4.97002997002997,4.975024975024975,4.98001998001998,4.985014985014985,4.99000999000999,4.995004995004995,5.0]}
},{}],28:[function(require,module,exports){
module.exports={"expected":[-0.9999092042625951,-0.9999993820529844,-0.9999999957945006,-0.9999999999713791,-0.9999999999998053,-0.9999999999999987,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0],"x":[-5.0,-7.495004995004995,-9.99000999000999,-12.485014985014985,-14.98001998001998,-17.475024975024976,-19.97002997002997,-22.465034965034967,-24.96003996003996,-27.455044955044954,-29.95004995004995,-32.44505494505494,-34.94005994005994,-37.435064935064936,-39.93006993006993,-42.425074925074924,-44.92007992007992,-47.41508491508492,-49.91008991008991,-52.405094905094906,-54.9000999000999,-57.39510489510489,-59.89010989010989,-62.38511488511489,-64.88011988011988,-67.37512487512487,-69.87012987012987,-72.36513486513486,-74.86013986013987,-77.35514485514486,-79.85014985014985,-82.34515484515485,-84.84015984015984,-87.33516483516483,-89.83016983016984,-92.32517482517483,-94.82017982017982,-97.31518481518482,-99.81018981018981,-102.3051948051948,-104.8001998001998,-107.2952047952048,-109.79020979020979,-112.28521478521479,-114.78021978021978,-117.27522477522477,-119.77022977022978,-122.26523476523477,-124.76023976023976,-127.25524475524476,-129.75024975024974,-132.24525474525475,-134.74025974025975,-137.23526473526474,-139.73026973026973,-142.22527472527472,-144.72027972027973,-147.21528471528472,-149.71028971028971,-152.2052947052947,-154.7002997002997,-157.19530469530469,-159.6903096903097,-162.1853146853147,-164.68031968031968,-167.17532467532467,-169.67032967032966,-172.16533466533465,-174.66033966033967,-177.15534465534466,-179.65034965034965,-182.14535464535464,-184.64035964035963,-187.13536463536462,-189.63036963036964,-192.12537462537463,-194.62037962037962,-197.1153846153846,-199.6103896103896,-202.1053946053946,-204.6003996003996,-207.0954045954046,-209.5904095904096,-212.08541458541458,-214.58041958041957,-217.07542457542456,-219.57042957042958,-222.06543456543457,-224.56043956043956,-227.05544455544455,-229.55044955044954,-232.04545454545453,-234.54045954045955,-237.03546453546454,-239.53046953046953,-242.02547452547452,-244.5204795204795,-247.0154845154845,-249.51048951048952,-252.0054945054945,-254.5004995004995,-256.9955044955045,-259.4905094905095,-261.9855144855145,-264.4805194805195,-266.9755244755245,-269.47052947052947,-271.96553446553446,-274.46053946053945,-276.95554445554444,-279.45054945054943,-281.9455544455544,-284.44055944055947,-286.93556443556446,-289.43056943056945,-291.92557442557444,-294.42057942057943,-296.9155844155844,-299.4105894105894,-301.9055944055944,-304.4005994005994,-306.8956043956044,-309.39060939060937,-311.88561438561436,-314.3806193806194,-316.8756243756244,-319.3706293706294,-321.8656343656344,-324.36063936063937,-326.85564435564436,-329.35064935064935,-331.84565434565434,-334.34065934065933,-336.8356643356643,-339.3306693306693,-341.8256743256743,-344.32067932067935,-346.81568431568434,-349.3106893106893,-351.8056943056943,-354.3006993006993,-356.7957042957043,-359.2907092907093,-361.7857142857143,-364.28071928071927,-366.77572427572426,-369.27072927072925,-371.76573426573424,-374.2607392607393,-376.7557442557443,-379.25074925074927,-381.74575424575426,-384.24075924075925,-386.73576423576424,-389.2307692307692,-391.7257742257742,-394.2207792207792,-396.7157842157842,-399.2107892107892,-401.70579420579423,-404.2007992007992,-406.6958041958042,-409.1908091908092,-411.6858141858142,-414.1808191808192,-416.6758241758242,-419.17082917082917,-421.66583416583416,-424.16083916083915,-426.65584415584414,-429.1508491508491,-431.6458541458542,-434.14085914085916,-436.63586413586415,-439.13086913086914,-441.62587412587413,-444.1208791208791,-446.6158841158841,-449.1108891108891,-451.6058941058941,-454.1008991008991,-456.5959040959041,-459.09090909090907,-461.5859140859141,-464.0809190809191,-466.5759240759241,-469.0709290709291,-471.5659340659341,-474.06093906093906,-476.55594405594405,-479.05094905094904,-481.54595404595403,-484.040959040959,-486.535964035964,-489.030969030969,-491.52597402597405,-494.02097902097904,-496.51598401598403,-499.010989010989,-501.505994005994,-504.000999000999,-506.496003996004,-508.991008991009,-511.486013986014,-513.981018981019,-516.476023976024,-518.971028971029,-521.4660339660339,-523.961038961039,-526.4560439560439,-528.951048951049,-531.4460539460539,-533.9410589410589,-536.436063936064,-538.9310689310689,-541.426073926074,-543.9210789210789,-546.416083916084,-548.9110889110889,-551.4060939060939,-553.9010989010989,-556.3961038961039,-558.8911088911088,-561.3861138861139,-563.8811188811189,-566.3761238761239,-568.8711288711289,-571.3661338661339,-573.8611388611389,-576.3561438561438,-578.8511488511489,-581.3461538461538,-583.8411588411589,-586.3361638361638,-588.8311688311688,-591.3261738261738,-593.8211788211788,-596.3161838161839,-598.8111888111888,-601.3061938061938,-603.8011988011988,-606.2962037962038,-608.7912087912088,-611.2862137862138,-613.7812187812187,-616.2762237762238,-618.7712287712287,-621.2662337662338,-623.7612387612388,-626.2562437562437,-628.7512487512488,-631.2462537462537,-633.7412587412588,-636.2362637362637,-638.7312687312688,-641.2262737262737,-643.7212787212787,-646.2162837162837,-648.7112887112887,-651.2062937062936,-653.7012987012987,-656.1963036963037,-658.6913086913087,-661.1863136863137,-663.6813186813187,-666.1763236763237,-668.6713286713286,-671.1663336663337,-673.6613386613386,-676.1563436563437,-678.6513486513486,-681.1463536463536,-683.6413586413587,-686.1363636363636,-688.6313686313687,-691.1263736263736,-693.6213786213787,-696.1163836163836,-698.6113886113886,-701.1063936063936,-703.6013986013986,-706.0964035964035,-708.5914085914086,-711.0864135864136,-713.5814185814186,-716.0764235764236,-718.5714285714286,-721.0664335664336,-723.5614385614385,-726.0564435564436,-728.5514485514485,-731.0464535464536,-733.5414585414585,-736.0364635364635,-738.5314685314685,-741.0264735264735,-743.5214785214786,-746.0164835164835,-748.5114885114886,-751.0064935064935,-753.5014985014985,-755.9965034965035,-758.4915084915085,-760.9865134865134,-763.4815184815185,-765.9765234765234,-768.4715284715285,-770.9665334665335,-773.4615384615385,-775.9565434565435,-778.4515484515484,-780.9465534465535,-783.4415584415584,-785.9365634365635,-788.4315684315684,-790.9265734265734,-793.4215784215784,-795.9165834165834,-798.4115884115885,-800.9065934065934,-803.4015984015984,-805.8966033966034,-808.3916083916084,-810.8866133866134,-813.3816183816184,-815.8766233766233,-818.3716283716284,-820.8666333666333,-823.3616383616384,-825.8566433566433,-828.3516483516484,-830.8466533466534,-833.3416583416583,-835.8366633366634,-838.3316683316683,-840.8266733266734,-843.3216783216783,-845.8166833166833,-848.3116883116883,-850.8066933066933,-853.3016983016983,-855.7967032967033,-858.2917082917083,-860.7867132867133,-863.2817182817183,-865.7767232767233,-868.2717282717283,-870.7667332667332,-873.2617382617383,-875.7567432567432,-878.2517482517483,-880.7467532467532,-883.2417582417582,-885.7367632367632,-888.2317682317682,-890.7267732267733,-893.2217782217782,-895.7167832167833,-898.2117882117882,-900.7067932067932,-903.2017982017982,-905.6968031968032,-908.1918081918081,-910.6868131868132,-913.1818181818181,-915.6768231768232,-918.1718281718282,-920.6668331668332,-923.1618381618382,-925.6568431568431,-928.1518481518482,-930.6468531468531,-933.1418581418582,-935.6368631368631,-938.1318681318681,-940.6268731268731,-943.1218781218781,-945.6168831168832,-948.1118881118881,-950.6068931068932,-953.1018981018981,-955.5969030969031,-958.0919080919081,-960.5869130869131,-963.081918081918,-965.5769230769231,-968.071928071928,-970.5669330669331,-973.061938061938,-975.556943056943,-978.0519480519481,-980.546953046953,-983.0419580419581,-985.536963036963,-988.0319680319681,-990.526973026973,-993.021978021978,-995.516983016983,-998.011988011988,-1000.506993006993,-1003.001998001998,-1005.497002997003,-1007.992007992008,-1010.487012987013,-1012.982017982018,-1015.477022977023,-1017.972027972028,-1020.467032967033,-1022.9620379620379,-1025.4570429570429,-1027.952047952048,-1030.447052947053,-1032.942057942058,-1035.437062937063,-1037.9320679320679,-1040.427072927073,-1042.922077922078,-1045.417082917083,-1047.9120879120878,-1050.4070929070929,-1052.902097902098,-1055.397102897103,-1057.8921078921078,-1060.3871128871128,-1062.8821178821179,-1065.377122877123,-1067.872127872128,-1070.3671328671328,-1072.8621378621378,-1075.357142857143,-1077.852147852148,-1080.3471528471528,-1082.8421578421578,-1085.3371628371629,-1087.832167832168,-1090.3271728271727,-1092.8221778221778,-1095.3171828171828,-1097.8121878121879,-1100.307192807193,-1102.8021978021977,-1105.2972027972028,-1107.7922077922078,-1110.2872127872129,-1112.7822177822177,-1115.2772227772227,-1117.7722277722278,-1120.2672327672328,-1122.7622377622379,-1125.2572427572427,-1127.7522477522477,-1130.2472527472528,-1132.7422577422578,-1135.2372627372627,-1137.7322677322677,-1140.2272727272727,-1142.7222777222778,-1145.2172827172826,-1147.7122877122877,-1150.2072927072927,-1152.7022977022978,-1155.1973026973028,-1157.6923076923076,-1160.1873126873127,-1162.6823176823177,-1165.1773226773228,-1167.6723276723276,-1170.1673326673326,-1172.6623376623377,-1175.1573426573427,-1177.6523476523475,-1180.1473526473526,-1182.6423576423576,-1185.1373626373627,-1187.6323676323677,-1190.1273726273726,-1192.6223776223776,-1195.1173826173826,-1197.6123876123877,-1200.1073926073925,-1202.6023976023976,-1205.0974025974026,-1207.5924075924077,-1210.0874125874127,-1212.5824175824175,-1215.0774225774226,-1217.5724275724276,-1220.0674325674327,-1222.5624375624375,-1225.0574425574425,-1227.5524475524476,-1230.0474525474526,-1232.5424575424574,-1235.0374625374625,-1237.5324675324675,-1240.0274725274726,-1242.5224775224776,-1245.0174825174824,-1247.5124875124875,-1250.0074925074925,-1252.5024975024976,-1254.9975024975024,-1257.4925074925075,-1259.9875124875125,-1262.4825174825176,-1264.9775224775224,-1267.4725274725274,-1269.9675324675325,-1272.4625374625375,-1274.9575424575426,-1277.4525474525474,-1279.9475524475524,-1282.4425574425575,-1284.9375624375625,-1287.4325674325673,-1289.9275724275724,-1292.4225774225774,-1294.9175824175825,-1297.4125874125873,-1299.9075924075923,-1302.4025974025974,-1304.8976023976024,-1307.3926073926075,-1309.8876123876123,-1312.3826173826174,-1314.8776223776224,-1317.3726273726274,-1319.8676323676323,-1322.3626373626373,-1324.8576423576424,-1327.3526473526474,-1329.8476523476525,-1332.3426573426573,-1334.8376623376623,-1337.3326673326674,-1339.8276723276724,-1342.3226773226772,-1344.8176823176823,-1347.3126873126873,-1349.8076923076924,-1352.3026973026972,-1354.7977022977022,-1357.2927072927073,-1359.7877122877123,-1362.2827172827174,-1364.7777222777222,-1367.2727272727273,-1369.7677322677323,-1372.2627372627373,-1374.7577422577422,-1377.2527472527472,-1379.7477522477523,-1382.2427572427573,-1384.7377622377621,-1387.2327672327672,-1389.7277722277722,-1392.2227772227773,-1394.7177822177823,-1397.2127872127871,-1399.7077922077922,-1402.2027972027972,-1404.6978021978023,-1407.192807192807,-1409.6878121878121,-1412.1828171828172,-1414.6778221778222,-1417.1728271728273,-1419.667832167832,-1422.1628371628371,-1424.6578421578422,-1427.1528471528472,-1429.647852147852,-1432.142857142857,-1434.6378621378622,-1437.1328671328672,-1439.627872127872,-1442.122877122877,-1444.6178821178821,-1447.1128871128872,-1449.6078921078922,-1452.102897102897,-1454.597902097902,-1457.0929070929071,-1459.5879120879122,-1462.082917082917,-1464.577922077922,-1467.072927072927,-1469.5679320679321,-1472.062937062937,-1474.557942057942,-1477.052947052947,-1479.547952047952,-1482.0429570429571,-1484.537962037962,-1487.032967032967,-1489.527972027972,-1492.022977022977,-1494.517982017982,-1497.012987012987,-1499.507992007992,-1502.002997002997,-1504.498001998002,-1506.993006993007,-1509.488011988012,-1511.983016983017,-1514.478021978022,-1516.973026973027,-1519.468031968032,-1521.963036963037,-1524.458041958042,-1526.9530469530469,-1529.448051948052,-1531.943056943057,-1534.438061938062,-1536.933066933067,-1539.4280719280719,-1541.923076923077,-1544.418081918082,-1546.913086913087,-1549.4080919080918,-1551.9030969030969,-1554.398101898102,-1556.893106893107,-1559.3881118881118,-1561.8831168831168,-1564.3781218781219,-1566.873126873127,-1569.368131868132,-1571.8631368631368,-1574.3581418581418,-1576.8531468531469,-1579.348151848152,-1581.8431568431567,-1584.3381618381618,-1586.8331668331668,-1589.328171828172,-1591.823176823177,-1594.3181818181818,-1596.8131868131868,-1599.3081918081919,-1601.803196803197,-1604.2982017982017,-1606.7932067932068,-1609.2882117882118,-1611.7832167832169,-1614.2782217782217,-1616.7732267732267,-1619.2682317682318,-1621.7632367632368,-1624.2582417582419,-1626.7532467532467,-1629.2482517482517,-1631.7432567432568,-1634.2382617382618,-1636.7332667332666,-1639.2282717282717,-1641.7232767232767,-1644.2182817182818,-1646.7132867132866,-1649.2082917082917,-1651.7032967032967,-1654.1983016983017,-1656.6933066933068,-1659.1883116883116,-1661.6833166833167,-1664.1783216783217,-1666.6733266733268,-1669.1683316683316,-1671.6633366633366,-1674.1583416583417,-1676.6533466533467,-1679.1483516483515,-1681.6433566433566,-1684.1383616383616,-1686.6333666333667,-1689.1283716283717,-1691.6233766233765,-1694.1183816183816,-1696.6133866133866,-1699.1083916083917,-1701.6033966033965,-1704.0984015984016,-1706.5934065934066,-1709.0884115884116,-1711.5834165834167,-1714.0784215784215,-1716.5734265734266,-1719.0684315684316,-1721.5634365634367,-1724.0584415584415,-1726.5534465534465,-1729.0484515484516,-1731.5434565434566,-1734.0384615384614,-1736.5334665334665,-1739.0284715284715,-1741.5234765234766,-1744.0184815184816,-1746.5134865134864,-1749.0084915084915,-1751.5034965034965,-1753.9985014985016,-1756.4935064935064,-1758.9885114885114,-1761.4835164835165,-1763.9785214785215,-1766.4735264735264,-1768.9685314685314,-1771.4635364635365,-1773.9585414585415,-1776.4535464535466,-1778.9485514485514,-1781.4435564435564,-1783.9385614385615,-1786.4335664335665,-1788.9285714285713,-1791.4235764235764,-1793.9185814185814,-1796.4135864135865,-1798.9085914085915,-1801.4035964035963,-1803.8986013986014,-1806.3936063936064,-1808.8886113886115,-1811.3836163836163,-1813.8786213786213,-1816.3736263736264,-1818.8686313686314,-1821.3636363636363,-1823.8586413586413,-1826.3536463536464,-1828.8486513486514,-1831.3436563436564,-1833.8386613386613,-1836.3336663336663,-1838.8286713286714,-1841.3236763236764,-1843.8186813186812,-1846.3136863136863,-1848.8086913086913,-1851.3036963036964,-1853.7987012987012,-1856.2937062937062,-1858.7887112887113,-1861.2837162837163,-1863.7787212787214,-1866.2737262737262,-1868.7687312687312,-1871.2637362637363,-1873.7587412587413,-1876.2537462537462,-1878.7487512487512,-1881.2437562437563,-1883.7387612387613,-1886.2337662337663,-1888.7287712287712,-1891.2237762237762,-1893.7187812187813,-1896.2137862137863,-1898.7087912087911,-1901.2037962037962,-1903.6988011988012,-1906.1938061938063,-1908.688811188811,-1911.1838161838161,-1913.6788211788212,-1916.1738261738262,-1918.6688311688313,-1921.163836163836,-1923.6588411588411,-1926.1538461538462,-1928.6488511488512,-1931.143856143856,-1933.638861138861,-1936.1338661338661,-1938.6288711288712,-1941.123876123876,-1943.618881118881,-1946.113886113886,-1948.6088911088912,-1951.1038961038962,-1953.598901098901,-1956.093906093906,-1958.5889110889111,-1961.0839160839162,-1963.578921078921,-1966.073926073926,-1968.568931068931,-1971.0639360639361,-1973.558941058941,-1976.053946053946,-1978.548951048951,-1981.043956043956,-1983.5389610389611,-1986.033966033966,-1988.528971028971,-1991.023976023976,-1993.518981018981,-1996.013986013986,-1998.508991008991,-2001.003996003996,-2003.499000999001,-2005.994005994006,-2008.489010989011,-2010.984015984016,-2013.479020979021,-2015.974025974026,-2018.4690309690309,-2020.964035964036,-2023.459040959041,-2025.954045954046,-2028.4490509490508,-2030.944055944056,-2033.439060939061,-2035.934065934066,-2038.429070929071,-2040.9240759240759,-2043.419080919081,-2045.914085914086,-2048.409090909091,-2050.904095904096,-2053.399100899101,-2055.894105894106,-2058.3891108891107,-2060.884115884116,-2063.379120879121,-2065.874125874126,-2068.369130869131,-2070.8641358641357,-2073.359140859141,-2075.854145854146,-2078.3491508491506,-2080.844155844156,-2083.3391608391607,-2085.834165834166,-2088.329170829171,-2090.8241758241757,-2093.319180819181,-2095.8141858141857,-2098.309190809191,-2100.804195804196,-2103.2992007992007,-2105.794205794206,-2108.2892107892108,-2110.7842157842156,-2113.279220779221,-2115.7742257742257,-2118.269230769231,-2120.7642357642358,-2123.2592407592406,-2125.754245754246,-2128.2492507492507,-2130.744255744256,-2133.2392607392608,-2135.7342657342656,-2138.229270729271,-2140.7242757242757,-2143.2192807192805,-2145.714285714286,-2148.2092907092906,-2150.704295704296,-2153.1993006993007,-2155.6943056943055,-2158.189310689311,-2160.6843156843156,-2163.179320679321,-2165.6743256743257,-2168.1693306693305,-2170.664335664336,-2173.1593406593406,-2175.6543456543454,-2178.1493506493507,-2180.6443556443555,-2183.139360639361,-2185.6343656343656,-2188.1293706293704,-2190.6243756243757,-2193.1193806193805,-2195.614385614386,-2198.1093906093906,-2200.6043956043954,-2203.0994005994007,-2205.5944055944055,-2208.0894105894104,-2210.5844155844156,-2213.0794205794205,-2215.5744255744257,-2218.0694305694306,-2220.5644355644354,-2223.0594405594406,-2225.5544455544455,-2228.0494505494507,-2230.5444555444556,-2233.0394605394604,-2235.5344655344657,-2238.0294705294705,-2240.5244755244757,-2243.0194805194806,-2245.5144855144854,-2248.0094905094907,-2250.5044955044955,-2252.9995004995003,-2255.4945054945056,-2257.9895104895104,-2260.4845154845157,-2262.9795204795205,-2265.4745254745253,-2267.9695304695306,-2270.4645354645354,-2272.9595404595407,-2275.4545454545455,-2277.9495504495503,-2280.4445554445556,-2282.9395604395604,-2285.4345654345652,-2287.9295704295705,-2290.4245754245753,-2292.9195804195806,-2295.4145854145854,-2297.9095904095902,-2300.4045954045955,-2302.8996003996003,-2305.3946053946056,-2307.8896103896104,-2310.3846153846152,-2312.8796203796205,-2315.3746253746253,-2317.86963036963,-2320.3646353646354,-2322.8596403596403,-2325.3546453546455,-2327.8496503496503,-2330.344655344655,-2332.8396603396604,-2335.3346653346653,-2337.8296703296705,-2340.3246753246754,-2342.81968031968,-2345.3146853146854,-2347.8096903096903,-2350.304695304695,-2352.7997002997004,-2355.294705294705,-2357.7897102897105,-2360.2847152847153,-2362.77972027972,-2365.2747252747254,-2367.76973026973,-2370.2647352647355,-2372.7597402597403,-2375.254745254745,-2377.7497502497504,-2380.244755244755,-2382.73976023976,-2385.2347652347653,-2387.72977022977,-2390.2247752247754,-2392.71978021978,-2395.214785214785,-2397.7097902097903,-2400.204795204795,-2402.6998001998004,-2405.194805194805,-2407.68981018981,-2410.1848151848153,-2412.67982017982,-2415.1748251748254,-2417.66983016983,-2420.164835164835,-2422.6598401598403,-2425.154845154845,-2427.64985014985,-2430.1448551448552,-2432.63986013986,-2435.1348651348653,-2437.62987012987,-2440.124875124875,-2442.6198801198802,-2445.114885114885,-2447.6098901098903,-2450.104895104895,-2452.5999000999,-2455.0949050949052,-2457.58991008991,-2460.084915084915,-2462.57992007992,-2465.074925074925,-2467.5699300699303,-2470.064935064935,-2472.55994005994,-2475.054945054945,-2477.54995004995,-2480.0449550449553,-2482.53996003996,-2485.034965034965,-2487.52997002997,-2490.024975024975,-2492.51998001998,-2495.014985014985,-2497.50999000999,-2500.004995004995,-2502.5,-2504.995004995005,-2507.49000999001,-2509.985014985015,-2512.48001998002,-2514.975024975025,-2517.47002997003,-2519.965034965035,-2522.46003996004,-2524.9550449550447,-2527.45004995005,-2529.945054945055,-2532.44005994006,-2534.935064935065,-2537.4300699300697,-2539.925074925075,-2542.42007992008,-2544.915084915085,-2547.41008991009,-2549.9050949050948,-2552.4000999001,-2554.895104895105,-2557.3901098901097,-2559.885114885115,-2562.3801198801198,-2564.875124875125,-2567.37012987013,-2569.8651348651347,-2572.36013986014,-2574.8551448551448,-2577.35014985015,-2579.845154845155,-2582.3401598401597,-2584.835164835165,-2587.33016983017,-2589.8251748251746,-2592.32017982018,-2594.8151848151847,-2597.31018981019,-2599.805194805195,-2602.3001998001996,-2604.795204795205,-2607.2902097902097,-2609.785214785215,-2612.28021978022,-2614.7752247752246,-2617.27022977023,-2619.7652347652347,-2622.26023976024,-2624.755244755245,-2627.2502497502496,-2629.745254745255,-2632.2402597402597,-2634.7352647352645,-2637.23026973027,-2639.7252747252746,-2642.22027972028,-2644.7152847152847,-2647.2102897102895,-2649.705294705295,-2652.2002997002996,-2654.695304695305,-2657.1903096903097,-2659.6853146853146,-2662.18031968032,-2664.6753246753246,-2667.1703296703295,-2669.6653346653347,-2672.1603396603396,-2674.655344655345,-2677.1503496503497,-2679.6453546453545,-2682.1403596403597,-2684.6353646353646,-2687.13036963037,-2689.6253746253747,-2692.1203796203795,-2694.6153846153848,-2697.1103896103896,-2699.6053946053944,-2702.1003996003997,-2704.5954045954045,-2707.0904095904098,-2709.5854145854146,-2712.0804195804194,-2714.5754245754247,-2717.0704295704295,-2719.5654345654348,-2722.0604395604396,-2724.5554445554444,-2727.0504495504497,-2729.5454545454545,-2732.0404595404593,-2734.5354645354646,-2737.0304695304694,-2739.5254745254747,-2742.0204795204795,-2744.5154845154843,-2747.0104895104896,-2749.5054945054944,-2752.0004995004997,-2754.4955044955045,-2756.9905094905093,-2759.4855144855146,-2761.9805194805194,-2764.4755244755243,-2766.9705294705295,-2769.4655344655343,-2771.9605394605396,-2774.4555444555444,-2776.9505494505493,-2779.4455544455545,-2781.9405594405594,-2784.4355644355646,-2786.9305694305694,-2789.4255744255743,-2791.9205794205795,-2794.4155844155844,-2796.9105894105896,-2799.4055944055945,-2801.9005994005993,-2804.3956043956046,-2806.8906093906094,-2809.385614385614,-2811.8806193806195,-2814.3756243756243,-2816.8706293706296,-2819.3656343656344,-2821.860639360639,-2824.3556443556445,-2826.8506493506493,-2829.3456543456546,-2831.8406593406594,-2834.335664335664,-2836.8306693306695,-2839.3256743256743,-2841.820679320679,-2844.3156843156844,-2846.810689310689,-2849.3056943056945,-2851.8006993006993,-2854.295704295704,-2856.7907092907094,-2859.285714285714,-2861.7807192807195,-2864.2757242757243,-2866.770729270729,-2869.2657342657344,-2871.7607392607392,-2874.255744255744,-2876.7507492507493,-2879.245754245754,-2881.7407592407594,-2884.2357642357642,-2886.730769230769,-2889.2257742257743,-2891.720779220779,-2894.2157842157844,-2896.7107892107892,-2899.205794205794,-2901.7007992007993,-2904.195804195804,-2906.690809190809,-2909.1858141858143,-2911.680819180819,-2914.1758241758243,-2916.670829170829,-2919.165834165834,-2921.6608391608393,-2924.155844155844,-2926.6508491508494,-2929.145854145854,-2931.640859140859,-2934.1358641358643,-2936.630869130869,-2939.125874125874,-2941.620879120879,-2944.115884115884,-2946.6108891108893,-2949.105894105894,-2951.600899100899,-2954.095904095904,-2956.590909090909,-2959.0859140859143,-2961.580919080919,-2964.075924075924,-2966.570929070929,-2969.065934065934,-2971.560939060939,-2974.055944055944,-2976.550949050949,-2979.045954045954,-2981.540959040959,-2984.035964035964,-2986.530969030969,-2989.025974025974,-2991.520979020979,-2994.015984015984,-2996.510989010989,-2999.005994005994,-3001.500999000999,-3003.996003996004,-3006.491008991009,-3008.986013986014,-3011.481018981019,-3013.976023976024,-3016.4710289710288,-3018.966033966034,-3021.461038961039,-3023.956043956044,-3026.451048951049,-3028.946053946054,-3031.441058941059,-3033.936063936064,-3036.431068931069,-3038.926073926074,-3041.421078921079,-3043.916083916084,-3046.411088911089,-3048.9060939060937,-3051.401098901099,-3053.896103896104,-3056.391108891109,-3058.886113886114,-3061.3811188811187,-3063.876123876124,-3066.371128871129,-3068.866133866134,-3071.361138861139,-3073.8561438561437,-3076.351148851149,-3078.846153846154,-3081.3411588411586,-3083.836163836164,-3086.3311688311687,-3088.826173826174,-3091.321178821179,-3093.8161838161836,-3096.311188811189,-3098.8061938061937,-3101.301198801199,-3103.796203796204,-3106.2912087912086,-3108.786213786214,-3111.2812187812187,-3113.7762237762236,-3116.271228771229,-3118.7662337662337,-3121.261238761239,-3123.7562437562437,-3126.2512487512486,-3128.746253746254,-3131.2412587412587,-3133.736263736264,-3136.2312687312688,-3138.7262737262736,-3141.221278721279,-3143.7162837162837,-3146.2112887112885,-3148.7062937062938,-3151.2012987012986,-3153.696303696304,-3156.1913086913087,-3158.6863136863135,-3161.1813186813188,-3163.6763236763236,-3166.171328671329,-3168.6663336663337,-3171.1613386613385,-3173.656343656344,-3176.1513486513486,-3178.646353646354,-3181.1413586413587,-3183.6363636363635,-3186.131368631369,-3188.6263736263736,-3191.1213786213784,-3193.6163836163837,-3196.1113886113885,-3198.606393606394,-3201.1013986013986,-3203.5964035964034,-3206.0914085914087,-3208.5864135864135,-3211.081418581419,-3213.5764235764236,-3216.0714285714284,-3218.5664335664337,-3221.0614385614385,-3223.5564435564434,-3226.0514485514486,-3228.5464535464534,-3231.0414585414587,-3233.5364635364635,-3236.0314685314684,-3238.5264735264736,-3241.0214785214785,-3243.5164835164837,-3246.0114885114886,-3248.5064935064934,-3251.0014985014986,-3253.4965034965035,-3255.9915084915083,-3258.4865134865136,-3260.9815184815184,-3263.4765234765237,-3265.9715284715285,-3268.4665334665333,-3270.9615384615386,-3273.4565434565434,-3275.9515484515487,-3278.4465534465535,-3280.9415584415583,-3283.4365634365636,-3285.9315684315684,-3288.426573426573,-3290.9215784215785,-3293.4165834165833,-3295.9115884115886,-3298.4065934065934,-3300.901598401598,-3303.3966033966035,-3305.8916083916083,-3308.3866133866136,-3310.8816183816184,-3313.3766233766232,-3315.8716283716285,-3318.3666333666333,-3320.861638361638,-3323.3566433566434,-3325.8516483516482,-3328.3466533466535,-3330.8416583416583,-3333.336663336663,-3335.8316683316684,-3338.3266733266732,-3340.8216783216785,-3343.3166833166833,-3345.811688311688,-3348.3066933066934,-3350.8016983016983,-3353.296703296703,-3355.7917082917083,-3358.286713286713,-3360.7817182817184,-3363.2767232767233,-3365.771728271728,-3368.2667332667334,-3370.761738261738,-3373.2567432567434,-3375.7517482517483,-3378.246753246753,-3380.7417582417584,-3383.236763236763,-3385.7317682317685,-3388.2267732267733,-3390.721778221778,-3393.2167832167834,-3395.711788211788,-3398.206793206793,-3400.7017982017983,-3403.196803196803,-3405.6918081918084,-3408.186813186813,-3410.681818181818,-3413.1768231768233,-3415.671828171828,-3418.1668331668334,-3420.661838161838,-3423.156843156843,-3425.6518481518483,-3428.146853146853,-3430.641858141858,-3433.136863136863,-3435.631868131868,-3438.1268731268733,-3440.621878121878,-3443.116883116883,-3445.611888111888,-3448.106893106893,-3450.6018981018983,-3453.096903096903,-3455.591908091908,-3458.0869130869132,-3460.581918081918,-3463.076923076923,-3465.571928071928,-3468.066933066933,-3470.5619380619382,-3473.056943056943,-3475.551948051948,-3478.046953046953,-3480.541958041958,-3483.0369630369632,-3485.531968031968,-3488.026973026973,-3490.521978021978,-3493.016983016983,-3495.511988011988,-3498.006993006993,-3500.501998001998,-3502.997002997003,-3505.492007992008,-3507.987012987013,-3510.482017982018,-3512.977022977023,-3515.472027972028,-3517.967032967033,-3520.462037962038,-3522.957042957043,-3525.452047952048,-3527.9470529470527,-3530.442057942058,-3532.937062937063,-3535.432067932068,-3537.927072927073,-3540.4220779220777,-3542.917082917083,-3545.412087912088,-3547.907092907093,-3550.402097902098,-3552.8971028971027,-3555.392107892108,-3557.887112887113,-3560.382117882118,-3562.877122877123,-3565.3721278721277,-3567.867132867133,-3570.362137862138,-3572.8571428571427,-3575.352147852148,-3577.8471528471528,-3580.342157842158,-3582.837162837163,-3585.3321678321677,-3587.827172827173,-3590.3221778221778,-3592.817182817183,-3595.312187812188,-3597.8071928071927,-3600.302197802198,-3602.7972027972028,-3605.2922077922076,-3607.787212787213,-3610.2822177822177,-3612.777222777223,-3615.272227772228,-3617.7672327672326,-3620.262237762238,-3622.7572427572427,-3625.252247752248,-3627.747252747253,-3630.2422577422576,-3632.737262737263,-3635.2322677322677,-3637.7272727272725,-3640.222277722278,-3642.7172827172826,-3645.212287712288,-3647.7072927072927,-3650.2022977022975,-3652.697302697303,-3655.1923076923076,-3657.687312687313,-3660.1823176823177,-3662.6773226773225,-3665.172327672328,-3667.6673326673326,-3670.1623376623374,-3672.6573426573427,-3675.1523476523475,-3677.647352647353,-3680.1423576423576,-3682.6373626373625,-3685.1323676323677,-3687.6273726273726,-3690.122377622378,-3692.6173826173826,-3695.1123876123875,-3697.6073926073927,-3700.1023976023976,-3702.5974025974024,-3705.0924075924077,-3707.5874125874125,-3710.0824175824177,-3712.5774225774226,-3715.0724275724274,-3717.5674325674327,-3720.0624375624375,-3722.5574425574428,-3725.0524475524476,-3727.5474525474524,-3730.0424575424577,-3732.5374625374625,-3735.0324675324673,-3737.5274725274726,-3740.0224775224774,-3742.5174825174827,-3745.0124875124875,-3747.5074925074923,-3750.0024975024976,-3752.4975024975024,-3754.9925074925077,-3757.4875124875125,-3759.9825174825173,-3762.4775224775226,-3764.9725274725274,-3767.4675324675327,-3769.9625374625375,-3772.4575424575423,-3774.9525474525476,-3777.4475524475524,-3779.9425574425572,-3782.4375624375625,-3784.9325674325673,-3787.4275724275726,-3789.9225774225774,-3792.4175824175823,-3794.9125874125875,-3797.4075924075923,-3799.9025974025976,-3802.3976023976024,-3804.8926073926073,-3807.3876123876125,-3809.8826173826174,-3812.377622377622,-3814.8726273726274,-3817.3676323676323,-3819.8626373626375,-3822.3576423576424,-3824.852647352647,-3827.3476523476525,-3829.8426573426573,-3832.3376623376626,-3834.8326673326674,-3837.327672327672,-3839.8226773226775,-3842.3176823176823,-3844.812687312687,-3847.3076923076924,-3849.802697302697,-3852.2977022977025,-3854.7927072927073,-3857.287712287712,-3859.7827172827174,-3862.277722277722,-3864.7727272727275,-3867.2677322677323,-3869.762737262737,-3872.2577422577424,-3874.752747252747,-3877.247752247752,-3879.7427572427573,-3882.237762237762,-3884.7327672327674,-3887.227772227772,-3889.722777222777,-3892.2177822177823,-3894.712787212787,-3897.2077922077924,-3899.7027972027972,-3902.197802197802,-3904.6928071928073,-3907.187812187812,-3909.682817182817,-3912.1778221778222,-3914.672827172827,-3917.1678321678323,-3919.662837162837,-3922.157842157842,-3924.6528471528472,-3927.147852147852,-3929.6428571428573,-3932.137862137862,-3934.632867132867,-3937.1278721278723,-3939.622877122877,-3942.117882117882,-3944.612887112887,-3947.107892107892,-3949.6028971028973,-3952.097902097902,-3954.592907092907,-3957.087912087912,-3959.582917082917,-3962.0779220779223,-3964.572927072927,-3967.067932067932,-3969.562937062937,-3972.057942057942,-3974.5529470529473,-3977.047952047952,-3979.542957042957,-3982.037962037962,-3984.532967032967,-3987.027972027972,-3989.522977022977,-3992.017982017982,-3994.512987012987,-3997.007992007992,-3999.502997002997,-4001.998001998002,-4004.493006993007,-4006.988011988012,-4009.483016983017,-4011.978021978022,-4014.473026973027,-4016.968031968032,-4019.4630369630368,-4021.958041958042,-4024.453046953047,-4026.948051948052,-4029.443056943057,-4031.9380619380618,-4034.433066933067,-4036.928071928072,-4039.423076923077,-4041.918081918082,-4044.4130869130868,-4046.908091908092,-4049.403096903097,-4051.8981018981017,-4054.393106893107,-4056.888111888112,-4059.383116883117,-4061.878121878122,-4064.3731268731267,-4066.868131868132,-4069.363136863137,-4071.858141858142,-4074.353146853147,-4076.8481518481517,-4079.343156843157,-4081.838161838162,-4084.3331668331666,-4086.828171828172,-4089.3231768231767,-4091.818181818182,-4094.313186813187,-4096.808191808192,-4099.303196803196,-4101.798201798202,-4104.293206793207,-4106.788211788212,-4109.283216783217,-4111.778221778221,-4114.273226773227,-4116.768231768232,-4119.263236763237,-4121.758241758242,-4124.2532467532465,-4126.748251748252,-4129.243256743257,-4131.738261738262,-4134.233266733267,-4136.7282717282715,-4139.223276723276,-4141.718281718282,-4144.213286713287,-4146.708291708292,-4149.2032967032965,-4151.698301698301,-4154.193306693307,-4156.688311688312,-4159.183316683317,-4161.6783216783215,-4164.173326673326,-4166.668331668332,-4169.163336663337,-4171.658341658342,-4174.1533466533465,-4176.648351648351,-4179.143356643357,-4181.638361638362,-4184.133366633367,-4186.6283716283715,-4189.123376623376,-4191.618381618382,-4194.113386613387,-4196.608391608392,-4199.1033966033965,-4201.598401598401,-4204.093406593406,-4206.588411588412,-4209.083416583417,-4211.5784215784215,-4214.073426573426,-4216.568431568431,-4219.063436563437,-4221.558441558442,-4224.0534465534465,-4226.548451548451,-4229.043456543456,-4231.538461538462,-4234.033466533467,-4236.5284715284715,-4239.023476523476,-4241.518481518481,-4244.013486513487,-4246.508491508492,-4249.0034965034965,-4251.498501498501,-4253.993506493506,-4256.488511488512,-4258.983516483517,-4261.4785214785215,-4263.973526473526,-4266.468531468531,-4268.963536463537,-4271.458541458542,-4273.953546453547,-4276.448551448551,-4278.943556443556,-4281.438561438561,-4283.933566433567,-4286.428571428572,-4288.923576423576,-4291.418581418581,-4293.913586413586,-4296.408591408592,-4298.903596403597,-4301.398601398601,-4303.893606393606,-4306.388611388611,-4308.883616383617,-4311.378621378622,-4313.873626373626,-4316.368631368631,-4318.863636363636,-4321.358641358642,-4323.853646353647,-4326.348651348651,-4328.843656343656,-4331.338661338661,-4333.833666333667,-4336.328671328672,-4338.823676323676,-4341.318681318681,-4343.813686313686,-4346.308691308691,-4348.803696303697,-4351.298701298701,-4353.793706293706,-4356.288711288711,-4358.783716283716,-4361.278721278722,-4363.773726273726,-4366.268731268731,-4368.763736263736,-4371.258741258741,-4373.753746253747,-4376.248751248751,-4378.743756243756,-4381.238761238761,-4383.733766233766,-4386.228771228772,-4388.723776223776,-4391.218781218781,-4393.713786213786,-4396.208791208791,-4398.703796203797,-4401.198801198801,-4403.693806193806,-4406.188811188811,-4408.683816183816,-4411.178821178821,-4413.6738261738265,-4416.168831168831,-4418.663836163836,-4421.158841158841,-4423.653846153846,-4426.1488511488515,-4428.643856143856,-4431.138861138861,-4433.633866133866,-4436.128871128871,-4438.6238761238765,-4441.118881118881,-4443.613886113886,-4446.108891108891,-4448.603896103896,-4451.0989010989015,-4453.593906093906,-4456.088911088911,-4458.583916083916,-4461.078921078921,-4463.5739260739265,-4466.068931068931,-4468.563936063936,-4471.058941058941,-4473.553946053946,-4476.0489510489515,-4478.543956043956,-4481.038961038961,-4483.533966033966,-4486.028971028971,-4488.523976023976,-4491.018981018981,-4493.513986013986,-4496.008991008991,-4498.503996003996,-4500.999000999001,-4503.494005994006,-4505.989010989011,-4508.484015984016,-4510.979020979021,-4513.474025974026,-4515.969030969031,-4518.464035964036,-4520.959040959041,-4523.454045954046,-4525.949050949051,-4528.444055944056,-4530.939060939061,-4533.434065934066,-4535.929070929071,-4538.424075924076,-4540.919080919081,-4543.414085914086,-4545.909090909091,-4548.404095904096,-4550.899100899101,-4553.394105894105,-4555.889110889111,-4558.384115884116,-4560.879120879121,-4563.374125874126,-4565.8691308691305,-4568.364135864136,-4570.859140859141,-4573.354145854146,-4575.849150849151,-4578.3441558441555,-4580.839160839161,-4583.334165834166,-4585.829170829171,-4588.324175824176,-4590.8191808191805,-4593.314185814186,-4595.809190809191,-4598.304195804196,-4600.799200799201,-4603.2942057942055,-4605.789210789211,-4608.284215784216,-4610.779220779221,-4613.274225774226,-4615.7692307692305,-4618.264235764236,-4620.759240759241,-4623.254245754246,-4625.749250749251,-4628.2442557442555,-4630.73926073926,-4633.234265734266,-4635.729270729271,-4638.224275724276,-4640.7192807192805,-4643.214285714285,-4645.709290709291,-4648.204295704296,-4650.699300699301,-4653.1943056943055,-4655.68931068931,-4658.184315684316,-4660.679320679321,-4663.174325674326,-4665.6693306693305,-4668.164335664335,-4670.659340659341,-4673.154345654346,-4675.649350649351,-4678.1443556443555,-4680.63936063936,-4683.134365634366,-4685.629370629371,-4688.124375624376,-4690.6193806193805,-4693.114385614385,-4695.60939060939,-4698.104395604396,-4700.599400599401,-4703.0944055944055,-4705.58941058941,-4708.084415584415,-4710.579420579421,-4713.074425574426,-4715.569430569431,-4718.064435564435,-4720.55944055944,-4723.054445554446,-4725.549450549451,-4728.044455544456,-4730.53946053946,-4733.034465534465,-4735.529470529471,-4738.024475524476,-4740.519480519481,-4743.014485514485,-4745.50949050949,-4748.004495504496,-4750.499500499501,-4752.994505494506,-4755.48951048951,-4757.984515484515,-4760.47952047952,-4762.974525474526,-4765.469530469531,-4767.964535464535,-4770.45954045954,-4772.954545454545,-4775.449550449551,-4777.944555444556,-4780.43956043956,-4782.934565434565,-4785.42957042957,-4787.924575424576,-4790.419580419581,-4792.914585414585,-4795.40959040959,-4797.904595404595,-4800.399600399601,-4802.894605394606,-4805.38961038961,-4807.884615384615,-4810.37962037962,-4812.874625374626,-4815.369630369631,-4817.864635364635,-4820.35964035964,-4822.854645354645,-4825.349650349651,-4827.844655344656,-4830.33966033966,-4832.834665334665,-4835.32967032967,-4837.824675324675,-4840.319680319681,-4842.814685314685,-4845.30969030969,-4847.804695304695,-4850.2997002997,-4852.794705294706,-4855.2897102897105,-4857.784715284715,-4860.27972027972,-4862.774725274725,-4865.269730269731,-4867.7647352647355,-4870.25974025974,-4872.754745254745,-4875.24975024975,-4877.744755244756,-4880.2397602397605,-4882.734765234765,-4885.22977022977,-4887.724775224775,-4890.219780219781,-4892.7147852147855,-4895.20979020979,-4897.704795204795,-4900.1998001998,-4902.694805194805,-4905.1898101898105,-4907.684815184815,-4910.17982017982,-4912.674825174825,-4915.16983016983,-4917.6648351648355,-4920.15984015984,-4922.654845154845,-4925.14985014985,-4927.644855144855,-4930.1398601398605,-4932.634865134865,-4935.12987012987,-4937.624875124875,-4940.11988011988,-4942.6148851148855,-4945.10989010989,-4947.604895104895,-4950.0999000999,-4952.594905094905,-4955.0899100899105,-4957.584915084915,-4960.07992007992,-4962.574925074925,-4965.06993006993,-4967.564935064935,-4970.05994005994,-4972.554945054945,-4975.04995004995,-4977.544955044955,-4980.03996003996,-4982.534965034965,-4985.02997002997,-4987.524975024975,-4990.01998001998,-4992.514985014985,-4995.00999000999,-4997.504995004995,-5000.0]}
},{}],29:[function(require,module,exports){
module.exports={"expected":[0.9999092042625951,0.9999993820529844,0.9999999957945006,0.9999999999713791,0.9999999999998053,0.9999999999999987,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[5.0,7.495004995004995,9.99000999000999,12.485014985014985,14.98001998001998,17.475024975024976,19.97002997002997,22.465034965034967,24.96003996003996,27.455044955044954,29.95004995004995,32.44505494505494,34.94005994005994,37.435064935064936,39.93006993006993,42.425074925074924,44.92007992007992,47.41508491508492,49.91008991008991,52.405094905094906,54.9000999000999,57.39510489510489,59.89010989010989,62.38511488511489,64.88011988011988,67.37512487512487,69.87012987012987,72.36513486513486,74.86013986013987,77.35514485514486,79.85014985014985,82.34515484515485,84.84015984015984,87.33516483516483,89.83016983016984,92.32517482517483,94.82017982017982,97.31518481518482,99.81018981018981,102.3051948051948,104.8001998001998,107.2952047952048,109.79020979020979,112.28521478521479,114.78021978021978,117.27522477522477,119.77022977022978,122.26523476523477,124.76023976023976,127.25524475524476,129.75024975024974,132.24525474525475,134.74025974025975,137.23526473526474,139.73026973026973,142.22527472527472,144.72027972027973,147.21528471528472,149.71028971028971,152.2052947052947,154.7002997002997,157.19530469530469,159.6903096903097,162.1853146853147,164.68031968031968,167.17532467532467,169.67032967032966,172.16533466533465,174.66033966033967,177.15534465534466,179.65034965034965,182.14535464535464,184.64035964035963,187.13536463536462,189.63036963036964,192.12537462537463,194.62037962037962,197.1153846153846,199.6103896103896,202.1053946053946,204.6003996003996,207.0954045954046,209.5904095904096,212.08541458541458,214.58041958041957,217.07542457542456,219.57042957042958,222.06543456543457,224.56043956043956,227.05544455544455,229.55044955044954,232.04545454545453,234.54045954045955,237.03546453546454,239.53046953046953,242.02547452547452,244.5204795204795,247.0154845154845,249.51048951048952,252.0054945054945,254.5004995004995,256.9955044955045,259.4905094905095,261.9855144855145,264.4805194805195,266.9755244755245,269.47052947052947,271.96553446553446,274.46053946053945,276.95554445554444,279.45054945054943,281.9455544455544,284.44055944055947,286.93556443556446,289.43056943056945,291.92557442557444,294.42057942057943,296.9155844155844,299.4105894105894,301.9055944055944,304.4005994005994,306.8956043956044,309.39060939060937,311.88561438561436,314.3806193806194,316.8756243756244,319.3706293706294,321.8656343656344,324.36063936063937,326.85564435564436,329.35064935064935,331.84565434565434,334.34065934065933,336.8356643356643,339.3306693306693,341.8256743256743,344.32067932067935,346.81568431568434,349.3106893106893,351.8056943056943,354.3006993006993,356.7957042957043,359.2907092907093,361.7857142857143,364.28071928071927,366.77572427572426,369.27072927072925,371.76573426573424,374.2607392607393,376.7557442557443,379.25074925074927,381.74575424575426,384.24075924075925,386.73576423576424,389.2307692307692,391.7257742257742,394.2207792207792,396.7157842157842,399.2107892107892,401.70579420579423,404.2007992007992,406.6958041958042,409.1908091908092,411.6858141858142,414.1808191808192,416.6758241758242,419.17082917082917,421.66583416583416,424.16083916083915,426.65584415584414,429.1508491508491,431.6458541458542,434.14085914085916,436.63586413586415,439.13086913086914,441.62587412587413,444.1208791208791,446.6158841158841,449.1108891108891,451.6058941058941,454.1008991008991,456.5959040959041,459.09090909090907,461.5859140859141,464.0809190809191,466.5759240759241,469.0709290709291,471.5659340659341,474.06093906093906,476.55594405594405,479.05094905094904,481.54595404595403,484.040959040959,486.535964035964,489.030969030969,491.52597402597405,494.02097902097904,496.51598401598403,499.010989010989,501.505994005994,504.000999000999,506.496003996004,508.991008991009,511.486013986014,513.981018981019,516.476023976024,518.971028971029,521.4660339660339,523.961038961039,526.4560439560439,528.951048951049,531.4460539460539,533.9410589410589,536.436063936064,538.9310689310689,541.426073926074,543.9210789210789,546.416083916084,548.9110889110889,551.4060939060939,553.9010989010989,556.3961038961039,558.8911088911088,561.3861138861139,563.8811188811189,566.3761238761239,568.8711288711289,571.3661338661339,573.8611388611389,576.3561438561438,578.8511488511489,581.3461538461538,583.8411588411589,586.3361638361638,588.8311688311688,591.3261738261738,593.8211788211788,596.3161838161839,598.8111888111888,601.3061938061938,603.8011988011988,606.2962037962038,608.7912087912088,611.2862137862138,613.7812187812187,616.2762237762238,618.7712287712287,621.2662337662338,623.7612387612388,626.2562437562437,628.7512487512488,631.2462537462537,633.7412587412588,636.2362637362637,638.7312687312688,641.2262737262737,643.7212787212787,646.2162837162837,648.7112887112887,651.2062937062936,653.7012987012987,656.1963036963037,658.6913086913087,661.1863136863137,663.6813186813187,666.1763236763237,668.6713286713286,671.1663336663337,673.6613386613386,676.1563436563437,678.6513486513486,681.1463536463536,683.6413586413587,686.1363636363636,688.6313686313687,691.1263736263736,693.6213786213787,696.1163836163836,698.6113886113886,701.1063936063936,703.6013986013986,706.0964035964035,708.5914085914086,711.0864135864136,713.5814185814186,716.0764235764236,718.5714285714286,721.0664335664336,723.5614385614385,726.0564435564436,728.5514485514485,731.0464535464536,733.5414585414585,736.0364635364635,738.5314685314685,741.0264735264735,743.5214785214786,746.0164835164835,748.5114885114886,751.0064935064935,753.5014985014985,755.9965034965035,758.4915084915085,760.9865134865134,763.4815184815185,765.9765234765234,768.4715284715285,770.9665334665335,773.4615384615385,775.9565434565435,778.4515484515484,780.9465534465535,783.4415584415584,785.9365634365635,788.4315684315684,790.9265734265734,793.4215784215784,795.9165834165834,798.4115884115885,800.9065934065934,803.4015984015984,805.8966033966034,808.3916083916084,810.8866133866134,813.3816183816184,815.8766233766233,818.3716283716284,820.8666333666333,823.3616383616384,825.8566433566433,828.3516483516484,830.8466533466534,833.3416583416583,835.8366633366634,838.3316683316683,840.8266733266734,843.3216783216783,845.8166833166833,848.3116883116883,850.8066933066933,853.3016983016983,855.7967032967033,858.2917082917083,860.7867132867133,863.2817182817183,865.7767232767233,868.2717282717283,870.7667332667332,873.2617382617383,875.7567432567432,878.2517482517483,880.7467532467532,883.2417582417582,885.7367632367632,888.2317682317682,890.7267732267733,893.2217782217782,895.7167832167833,898.2117882117882,900.7067932067932,903.2017982017982,905.6968031968032,908.1918081918081,910.6868131868132,913.1818181818181,915.6768231768232,918.1718281718282,920.6668331668332,923.1618381618382,925.6568431568431,928.1518481518482,930.6468531468531,933.1418581418582,935.6368631368631,938.1318681318681,940.6268731268731,943.1218781218781,945.6168831168832,948.1118881118881,950.6068931068932,953.1018981018981,955.5969030969031,958.0919080919081,960.5869130869131,963.081918081918,965.5769230769231,968.071928071928,970.5669330669331,973.061938061938,975.556943056943,978.0519480519481,980.546953046953,983.0419580419581,985.536963036963,988.0319680319681,990.526973026973,993.021978021978,995.516983016983,998.011988011988,1000.506993006993,1003.001998001998,1005.497002997003,1007.992007992008,1010.487012987013,1012.982017982018,1015.477022977023,1017.972027972028,1020.467032967033,1022.9620379620379,1025.4570429570429,1027.952047952048,1030.447052947053,1032.942057942058,1035.437062937063,1037.9320679320679,1040.427072927073,1042.922077922078,1045.417082917083,1047.9120879120878,1050.4070929070929,1052.902097902098,1055.397102897103,1057.8921078921078,1060.3871128871128,1062.8821178821179,1065.377122877123,1067.872127872128,1070.3671328671328,1072.8621378621378,1075.357142857143,1077.852147852148,1080.3471528471528,1082.8421578421578,1085.3371628371629,1087.832167832168,1090.3271728271727,1092.8221778221778,1095.3171828171828,1097.8121878121879,1100.307192807193,1102.8021978021977,1105.2972027972028,1107.7922077922078,1110.2872127872129,1112.7822177822177,1115.2772227772227,1117.7722277722278,1120.2672327672328,1122.7622377622379,1125.2572427572427,1127.7522477522477,1130.2472527472528,1132.7422577422578,1135.2372627372627,1137.7322677322677,1140.2272727272727,1142.7222777222778,1145.2172827172826,1147.7122877122877,1150.2072927072927,1152.7022977022978,1155.1973026973028,1157.6923076923076,1160.1873126873127,1162.6823176823177,1165.1773226773228,1167.6723276723276,1170.1673326673326,1172.6623376623377,1175.1573426573427,1177.6523476523475,1180.1473526473526,1182.6423576423576,1185.1373626373627,1187.6323676323677,1190.1273726273726,1192.6223776223776,1195.1173826173826,1197.6123876123877,1200.1073926073925,1202.6023976023976,1205.0974025974026,1207.5924075924077,1210.0874125874127,1212.5824175824175,1215.0774225774226,1217.5724275724276,1220.0674325674327,1222.5624375624375,1225.0574425574425,1227.5524475524476,1230.0474525474526,1232.5424575424574,1235.0374625374625,1237.5324675324675,1240.0274725274726,1242.5224775224776,1245.0174825174824,1247.5124875124875,1250.0074925074925,1252.5024975024976,1254.9975024975024,1257.4925074925075,1259.9875124875125,1262.4825174825176,1264.9775224775224,1267.4725274725274,1269.9675324675325,1272.4625374625375,1274.9575424575426,1277.4525474525474,1279.9475524475524,1282.4425574425575,1284.9375624375625,1287.4325674325673,1289.9275724275724,1292.4225774225774,1294.9175824175825,1297.4125874125873,1299.9075924075923,1302.4025974025974,1304.8976023976024,1307.3926073926075,1309.8876123876123,1312.3826173826174,1314.8776223776224,1317.3726273726274,1319.8676323676323,1322.3626373626373,1324.8576423576424,1327.3526473526474,1329.8476523476525,1332.3426573426573,1334.8376623376623,1337.3326673326674,1339.8276723276724,1342.3226773226772,1344.8176823176823,1347.3126873126873,1349.8076923076924,1352.3026973026972,1354.7977022977022,1357.2927072927073,1359.7877122877123,1362.2827172827174,1364.7777222777222,1367.2727272727273,1369.7677322677323,1372.2627372627373,1374.7577422577422,1377.2527472527472,1379.7477522477523,1382.2427572427573,1384.7377622377621,1387.2327672327672,1389.7277722277722,1392.2227772227773,1394.7177822177823,1397.2127872127871,1399.7077922077922,1402.2027972027972,1404.6978021978023,1407.192807192807,1409.6878121878121,1412.1828171828172,1414.6778221778222,1417.1728271728273,1419.667832167832,1422.1628371628371,1424.6578421578422,1427.1528471528472,1429.647852147852,1432.142857142857,1434.6378621378622,1437.1328671328672,1439.627872127872,1442.122877122877,1444.6178821178821,1447.1128871128872,1449.6078921078922,1452.102897102897,1454.597902097902,1457.0929070929071,1459.5879120879122,1462.082917082917,1464.577922077922,1467.072927072927,1469.5679320679321,1472.062937062937,1474.557942057942,1477.052947052947,1479.547952047952,1482.0429570429571,1484.537962037962,1487.032967032967,1489.527972027972,1492.022977022977,1494.517982017982,1497.012987012987,1499.507992007992,1502.002997002997,1504.498001998002,1506.993006993007,1509.488011988012,1511.983016983017,1514.478021978022,1516.973026973027,1519.468031968032,1521.963036963037,1524.458041958042,1526.9530469530469,1529.448051948052,1531.943056943057,1534.438061938062,1536.933066933067,1539.4280719280719,1541.923076923077,1544.418081918082,1546.913086913087,1549.4080919080918,1551.9030969030969,1554.398101898102,1556.893106893107,1559.3881118881118,1561.8831168831168,1564.3781218781219,1566.873126873127,1569.368131868132,1571.8631368631368,1574.3581418581418,1576.8531468531469,1579.348151848152,1581.8431568431567,1584.3381618381618,1586.8331668331668,1589.328171828172,1591.823176823177,1594.3181818181818,1596.8131868131868,1599.3081918081919,1601.803196803197,1604.2982017982017,1606.7932067932068,1609.2882117882118,1611.7832167832169,1614.2782217782217,1616.7732267732267,1619.2682317682318,1621.7632367632368,1624.2582417582419,1626.7532467532467,1629.2482517482517,1631.7432567432568,1634.2382617382618,1636.7332667332666,1639.2282717282717,1641.7232767232767,1644.2182817182818,1646.7132867132866,1649.2082917082917,1651.7032967032967,1654.1983016983017,1656.6933066933068,1659.1883116883116,1661.6833166833167,1664.1783216783217,1666.6733266733268,1669.1683316683316,1671.6633366633366,1674.1583416583417,1676.6533466533467,1679.1483516483515,1681.6433566433566,1684.1383616383616,1686.6333666333667,1689.1283716283717,1691.6233766233765,1694.1183816183816,1696.6133866133866,1699.1083916083917,1701.6033966033965,1704.0984015984016,1706.5934065934066,1709.0884115884116,1711.5834165834167,1714.0784215784215,1716.5734265734266,1719.0684315684316,1721.5634365634367,1724.0584415584415,1726.5534465534465,1729.0484515484516,1731.5434565434566,1734.0384615384614,1736.5334665334665,1739.0284715284715,1741.5234765234766,1744.0184815184816,1746.5134865134864,1749.0084915084915,1751.5034965034965,1753.9985014985016,1756.4935064935064,1758.9885114885114,1761.4835164835165,1763.9785214785215,1766.4735264735264,1768.9685314685314,1771.4635364635365,1773.9585414585415,1776.4535464535466,1778.9485514485514,1781.4435564435564,1783.9385614385615,1786.4335664335665,1788.9285714285713,1791.4235764235764,1793.9185814185814,1796.4135864135865,1798.9085914085915,1801.4035964035963,1803.8986013986014,1806.3936063936064,1808.8886113886115,1811.3836163836163,1813.8786213786213,1816.3736263736264,1818.8686313686314,1821.3636363636363,1823.8586413586413,1826.3536463536464,1828.8486513486514,1831.3436563436564,1833.8386613386613,1836.3336663336663,1838.8286713286714,1841.3236763236764,1843.8186813186812,1846.3136863136863,1848.8086913086913,1851.3036963036964,1853.7987012987012,1856.2937062937062,1858.7887112887113,1861.2837162837163,1863.7787212787214,1866.2737262737262,1868.7687312687312,1871.2637362637363,1873.7587412587413,1876.2537462537462,1878.7487512487512,1881.2437562437563,1883.7387612387613,1886.2337662337663,1888.7287712287712,1891.2237762237762,1893.7187812187813,1896.2137862137863,1898.7087912087911,1901.2037962037962,1903.6988011988012,1906.1938061938063,1908.688811188811,1911.1838161838161,1913.6788211788212,1916.1738261738262,1918.6688311688313,1921.163836163836,1923.6588411588411,1926.1538461538462,1928.6488511488512,1931.143856143856,1933.638861138861,1936.1338661338661,1938.6288711288712,1941.123876123876,1943.618881118881,1946.113886113886,1948.6088911088912,1951.1038961038962,1953.598901098901,1956.093906093906,1958.5889110889111,1961.0839160839162,1963.578921078921,1966.073926073926,1968.568931068931,1971.0639360639361,1973.558941058941,1976.053946053946,1978.548951048951,1981.043956043956,1983.5389610389611,1986.033966033966,1988.528971028971,1991.023976023976,1993.518981018981,1996.013986013986,1998.508991008991,2001.003996003996,2003.499000999001,2005.994005994006,2008.489010989011,2010.984015984016,2013.479020979021,2015.974025974026,2018.4690309690309,2020.964035964036,2023.459040959041,2025.954045954046,2028.4490509490508,2030.944055944056,2033.439060939061,2035.934065934066,2038.429070929071,2040.9240759240759,2043.419080919081,2045.914085914086,2048.409090909091,2050.904095904096,2053.399100899101,2055.894105894106,2058.3891108891107,2060.884115884116,2063.379120879121,2065.874125874126,2068.369130869131,2070.8641358641357,2073.359140859141,2075.854145854146,2078.3491508491506,2080.844155844156,2083.3391608391607,2085.834165834166,2088.329170829171,2090.8241758241757,2093.319180819181,2095.8141858141857,2098.309190809191,2100.804195804196,2103.2992007992007,2105.794205794206,2108.2892107892108,2110.7842157842156,2113.279220779221,2115.7742257742257,2118.269230769231,2120.7642357642358,2123.2592407592406,2125.754245754246,2128.2492507492507,2130.744255744256,2133.2392607392608,2135.7342657342656,2138.229270729271,2140.7242757242757,2143.2192807192805,2145.714285714286,2148.2092907092906,2150.704295704296,2153.1993006993007,2155.6943056943055,2158.189310689311,2160.6843156843156,2163.179320679321,2165.6743256743257,2168.1693306693305,2170.664335664336,2173.1593406593406,2175.6543456543454,2178.1493506493507,2180.6443556443555,2183.139360639361,2185.6343656343656,2188.1293706293704,2190.6243756243757,2193.1193806193805,2195.614385614386,2198.1093906093906,2200.6043956043954,2203.0994005994007,2205.5944055944055,2208.0894105894104,2210.5844155844156,2213.0794205794205,2215.5744255744257,2218.0694305694306,2220.5644355644354,2223.0594405594406,2225.5544455544455,2228.0494505494507,2230.5444555444556,2233.0394605394604,2235.5344655344657,2238.0294705294705,2240.5244755244757,2243.0194805194806,2245.5144855144854,2248.0094905094907,2250.5044955044955,2252.9995004995003,2255.4945054945056,2257.9895104895104,2260.4845154845157,2262.9795204795205,2265.4745254745253,2267.9695304695306,2270.4645354645354,2272.9595404595407,2275.4545454545455,2277.9495504495503,2280.4445554445556,2282.9395604395604,2285.4345654345652,2287.9295704295705,2290.4245754245753,2292.9195804195806,2295.4145854145854,2297.9095904095902,2300.4045954045955,2302.8996003996003,2305.3946053946056,2307.8896103896104,2310.3846153846152,2312.8796203796205,2315.3746253746253,2317.86963036963,2320.3646353646354,2322.8596403596403,2325.3546453546455,2327.8496503496503,2330.344655344655,2332.8396603396604,2335.3346653346653,2337.8296703296705,2340.3246753246754,2342.81968031968,2345.3146853146854,2347.8096903096903,2350.304695304695,2352.7997002997004,2355.294705294705,2357.7897102897105,2360.2847152847153,2362.77972027972,2365.2747252747254,2367.76973026973,2370.2647352647355,2372.7597402597403,2375.254745254745,2377.7497502497504,2380.244755244755,2382.73976023976,2385.2347652347653,2387.72977022977,2390.2247752247754,2392.71978021978,2395.214785214785,2397.7097902097903,2400.204795204795,2402.6998001998004,2405.194805194805,2407.68981018981,2410.1848151848153,2412.67982017982,2415.1748251748254,2417.66983016983,2420.164835164835,2422.6598401598403,2425.154845154845,2427.64985014985,2430.1448551448552,2432.63986013986,2435.1348651348653,2437.62987012987,2440.124875124875,2442.6198801198802,2445.114885114885,2447.6098901098903,2450.104895104895,2452.5999000999,2455.0949050949052,2457.58991008991,2460.084915084915,2462.57992007992,2465.074925074925,2467.5699300699303,2470.064935064935,2472.55994005994,2475.054945054945,2477.54995004995,2480.0449550449553,2482.53996003996,2485.034965034965,2487.52997002997,2490.024975024975,2492.51998001998,2495.014985014985,2497.50999000999,2500.004995004995,2502.5,2504.995004995005,2507.49000999001,2509.985014985015,2512.48001998002,2514.975024975025,2517.47002997003,2519.965034965035,2522.46003996004,2524.9550449550447,2527.45004995005,2529.945054945055,2532.44005994006,2534.935064935065,2537.4300699300697,2539.925074925075,2542.42007992008,2544.915084915085,2547.41008991009,2549.9050949050948,2552.4000999001,2554.895104895105,2557.3901098901097,2559.885114885115,2562.3801198801198,2564.875124875125,2567.37012987013,2569.8651348651347,2572.36013986014,2574.8551448551448,2577.35014985015,2579.845154845155,2582.3401598401597,2584.835164835165,2587.33016983017,2589.8251748251746,2592.32017982018,2594.8151848151847,2597.31018981019,2599.805194805195,2602.3001998001996,2604.795204795205,2607.2902097902097,2609.785214785215,2612.28021978022,2614.7752247752246,2617.27022977023,2619.7652347652347,2622.26023976024,2624.755244755245,2627.2502497502496,2629.745254745255,2632.2402597402597,2634.7352647352645,2637.23026973027,2639.7252747252746,2642.22027972028,2644.7152847152847,2647.2102897102895,2649.705294705295,2652.2002997002996,2654.695304695305,2657.1903096903097,2659.6853146853146,2662.18031968032,2664.6753246753246,2667.1703296703295,2669.6653346653347,2672.1603396603396,2674.655344655345,2677.1503496503497,2679.6453546453545,2682.1403596403597,2684.6353646353646,2687.13036963037,2689.6253746253747,2692.1203796203795,2694.6153846153848,2697.1103896103896,2699.6053946053944,2702.1003996003997,2704.5954045954045,2707.0904095904098,2709.5854145854146,2712.0804195804194,2714.5754245754247,2717.0704295704295,2719.5654345654348,2722.0604395604396,2724.5554445554444,2727.0504495504497,2729.5454545454545,2732.0404595404593,2734.5354645354646,2737.0304695304694,2739.5254745254747,2742.0204795204795,2744.5154845154843,2747.0104895104896,2749.5054945054944,2752.0004995004997,2754.4955044955045,2756.9905094905093,2759.4855144855146,2761.9805194805194,2764.4755244755243,2766.9705294705295,2769.4655344655343,2771.9605394605396,2774.4555444555444,2776.9505494505493,2779.4455544455545,2781.9405594405594,2784.4355644355646,2786.9305694305694,2789.4255744255743,2791.9205794205795,2794.4155844155844,2796.9105894105896,2799.4055944055945,2801.9005994005993,2804.3956043956046,2806.8906093906094,2809.385614385614,2811.8806193806195,2814.3756243756243,2816.8706293706296,2819.3656343656344,2821.860639360639,2824.3556443556445,2826.8506493506493,2829.3456543456546,2831.8406593406594,2834.335664335664,2836.8306693306695,2839.3256743256743,2841.820679320679,2844.3156843156844,2846.810689310689,2849.3056943056945,2851.8006993006993,2854.295704295704,2856.7907092907094,2859.285714285714,2861.7807192807195,2864.2757242757243,2866.770729270729,2869.2657342657344,2871.7607392607392,2874.255744255744,2876.7507492507493,2879.245754245754,2881.7407592407594,2884.2357642357642,2886.730769230769,2889.2257742257743,2891.720779220779,2894.2157842157844,2896.7107892107892,2899.205794205794,2901.7007992007993,2904.195804195804,2906.690809190809,2909.1858141858143,2911.680819180819,2914.1758241758243,2916.670829170829,2919.165834165834,2921.6608391608393,2924.155844155844,2926.6508491508494,2929.145854145854,2931.640859140859,2934.1358641358643,2936.630869130869,2939.125874125874,2941.620879120879,2944.115884115884,2946.6108891108893,2949.105894105894,2951.600899100899,2954.095904095904,2956.590909090909,2959.0859140859143,2961.580919080919,2964.075924075924,2966.570929070929,2969.065934065934,2971.560939060939,2974.055944055944,2976.550949050949,2979.045954045954,2981.540959040959,2984.035964035964,2986.530969030969,2989.025974025974,2991.520979020979,2994.015984015984,2996.510989010989,2999.005994005994,3001.500999000999,3003.996003996004,3006.491008991009,3008.986013986014,3011.481018981019,3013.976023976024,3016.4710289710288,3018.966033966034,3021.461038961039,3023.956043956044,3026.451048951049,3028.946053946054,3031.441058941059,3033.936063936064,3036.431068931069,3038.926073926074,3041.421078921079,3043.916083916084,3046.411088911089,3048.9060939060937,3051.401098901099,3053.896103896104,3056.391108891109,3058.886113886114,3061.3811188811187,3063.876123876124,3066.371128871129,3068.866133866134,3071.361138861139,3073.8561438561437,3076.351148851149,3078.846153846154,3081.3411588411586,3083.836163836164,3086.3311688311687,3088.826173826174,3091.321178821179,3093.8161838161836,3096.311188811189,3098.8061938061937,3101.301198801199,3103.796203796204,3106.2912087912086,3108.786213786214,3111.2812187812187,3113.7762237762236,3116.271228771229,3118.7662337662337,3121.261238761239,3123.7562437562437,3126.2512487512486,3128.746253746254,3131.2412587412587,3133.736263736264,3136.2312687312688,3138.7262737262736,3141.221278721279,3143.7162837162837,3146.2112887112885,3148.7062937062938,3151.2012987012986,3153.696303696304,3156.1913086913087,3158.6863136863135,3161.1813186813188,3163.6763236763236,3166.171328671329,3168.6663336663337,3171.1613386613385,3173.656343656344,3176.1513486513486,3178.646353646354,3181.1413586413587,3183.6363636363635,3186.131368631369,3188.6263736263736,3191.1213786213784,3193.6163836163837,3196.1113886113885,3198.606393606394,3201.1013986013986,3203.5964035964034,3206.0914085914087,3208.5864135864135,3211.081418581419,3213.5764235764236,3216.0714285714284,3218.5664335664337,3221.0614385614385,3223.5564435564434,3226.0514485514486,3228.5464535464534,3231.0414585414587,3233.5364635364635,3236.0314685314684,3238.5264735264736,3241.0214785214785,3243.5164835164837,3246.0114885114886,3248.5064935064934,3251.0014985014986,3253.4965034965035,3255.9915084915083,3258.4865134865136,3260.9815184815184,3263.4765234765237,3265.9715284715285,3268.4665334665333,3270.9615384615386,3273.4565434565434,3275.9515484515487,3278.4465534465535,3280.9415584415583,3283.4365634365636,3285.9315684315684,3288.426573426573,3290.9215784215785,3293.4165834165833,3295.9115884115886,3298.4065934065934,3300.901598401598,3303.3966033966035,3305.8916083916083,3308.3866133866136,3310.8816183816184,3313.3766233766232,3315.8716283716285,3318.3666333666333,3320.861638361638,3323.3566433566434,3325.8516483516482,3328.3466533466535,3330.8416583416583,3333.336663336663,3335.8316683316684,3338.3266733266732,3340.8216783216785,3343.3166833166833,3345.811688311688,3348.3066933066934,3350.8016983016983,3353.296703296703,3355.7917082917083,3358.286713286713,3360.7817182817184,3363.2767232767233,3365.771728271728,3368.2667332667334,3370.761738261738,3373.2567432567434,3375.7517482517483,3378.246753246753,3380.7417582417584,3383.236763236763,3385.7317682317685,3388.2267732267733,3390.721778221778,3393.2167832167834,3395.711788211788,3398.206793206793,3400.7017982017983,3403.196803196803,3405.6918081918084,3408.186813186813,3410.681818181818,3413.1768231768233,3415.671828171828,3418.1668331668334,3420.661838161838,3423.156843156843,3425.6518481518483,3428.146853146853,3430.641858141858,3433.136863136863,3435.631868131868,3438.1268731268733,3440.621878121878,3443.116883116883,3445.611888111888,3448.106893106893,3450.6018981018983,3453.096903096903,3455.591908091908,3458.0869130869132,3460.581918081918,3463.076923076923,3465.571928071928,3468.066933066933,3470.5619380619382,3473.056943056943,3475.551948051948,3478.046953046953,3480.541958041958,3483.0369630369632,3485.531968031968,3488.026973026973,3490.521978021978,3493.016983016983,3495.511988011988,3498.006993006993,3500.501998001998,3502.997002997003,3505.492007992008,3507.987012987013,3510.482017982018,3512.977022977023,3515.472027972028,3517.967032967033,3520.462037962038,3522.957042957043,3525.452047952048,3527.9470529470527,3530.442057942058,3532.937062937063,3535.432067932068,3537.927072927073,3540.4220779220777,3542.917082917083,3545.412087912088,3547.907092907093,3550.402097902098,3552.8971028971027,3555.392107892108,3557.887112887113,3560.382117882118,3562.877122877123,3565.3721278721277,3567.867132867133,3570.362137862138,3572.8571428571427,3575.352147852148,3577.8471528471528,3580.342157842158,3582.837162837163,3585.3321678321677,3587.827172827173,3590.3221778221778,3592.817182817183,3595.312187812188,3597.8071928071927,3600.302197802198,3602.7972027972028,3605.2922077922076,3607.787212787213,3610.2822177822177,3612.777222777223,3615.272227772228,3617.7672327672326,3620.262237762238,3622.7572427572427,3625.252247752248,3627.747252747253,3630.2422577422576,3632.737262737263,3635.2322677322677,3637.7272727272725,3640.222277722278,3642.7172827172826,3645.212287712288,3647.7072927072927,3650.2022977022975,3652.697302697303,3655.1923076923076,3657.687312687313,3660.1823176823177,3662.6773226773225,3665.172327672328,3667.6673326673326,3670.1623376623374,3672.6573426573427,3675.1523476523475,3677.647352647353,3680.1423576423576,3682.6373626373625,3685.1323676323677,3687.6273726273726,3690.122377622378,3692.6173826173826,3695.1123876123875,3697.6073926073927,3700.1023976023976,3702.5974025974024,3705.0924075924077,3707.5874125874125,3710.0824175824177,3712.5774225774226,3715.0724275724274,3717.5674325674327,3720.0624375624375,3722.5574425574428,3725.0524475524476,3727.5474525474524,3730.0424575424577,3732.5374625374625,3735.0324675324673,3737.5274725274726,3740.0224775224774,3742.5174825174827,3745.0124875124875,3747.5074925074923,3750.0024975024976,3752.4975024975024,3754.9925074925077,3757.4875124875125,3759.9825174825173,3762.4775224775226,3764.9725274725274,3767.4675324675327,3769.9625374625375,3772.4575424575423,3774.9525474525476,3777.4475524475524,3779.9425574425572,3782.4375624375625,3784.9325674325673,3787.4275724275726,3789.9225774225774,3792.4175824175823,3794.9125874125875,3797.4075924075923,3799.9025974025976,3802.3976023976024,3804.8926073926073,3807.3876123876125,3809.8826173826174,3812.377622377622,3814.8726273726274,3817.3676323676323,3819.8626373626375,3822.3576423576424,3824.852647352647,3827.3476523476525,3829.8426573426573,3832.3376623376626,3834.8326673326674,3837.327672327672,3839.8226773226775,3842.3176823176823,3844.812687312687,3847.3076923076924,3849.802697302697,3852.2977022977025,3854.7927072927073,3857.287712287712,3859.7827172827174,3862.277722277722,3864.7727272727275,3867.2677322677323,3869.762737262737,3872.2577422577424,3874.752747252747,3877.247752247752,3879.7427572427573,3882.237762237762,3884.7327672327674,3887.227772227772,3889.722777222777,3892.2177822177823,3894.712787212787,3897.2077922077924,3899.7027972027972,3902.197802197802,3904.6928071928073,3907.187812187812,3909.682817182817,3912.1778221778222,3914.672827172827,3917.1678321678323,3919.662837162837,3922.157842157842,3924.6528471528472,3927.147852147852,3929.6428571428573,3932.137862137862,3934.632867132867,3937.1278721278723,3939.622877122877,3942.117882117882,3944.612887112887,3947.107892107892,3949.6028971028973,3952.097902097902,3954.592907092907,3957.087912087912,3959.582917082917,3962.0779220779223,3964.572927072927,3967.067932067932,3969.562937062937,3972.057942057942,3974.5529470529473,3977.047952047952,3979.542957042957,3982.037962037962,3984.532967032967,3987.027972027972,3989.522977022977,3992.017982017982,3994.512987012987,3997.007992007992,3999.502997002997,4001.998001998002,4004.493006993007,4006.988011988012,4009.483016983017,4011.978021978022,4014.473026973027,4016.968031968032,4019.4630369630368,4021.958041958042,4024.453046953047,4026.948051948052,4029.443056943057,4031.9380619380618,4034.433066933067,4036.928071928072,4039.423076923077,4041.918081918082,4044.4130869130868,4046.908091908092,4049.403096903097,4051.8981018981017,4054.393106893107,4056.888111888112,4059.383116883117,4061.878121878122,4064.3731268731267,4066.868131868132,4069.363136863137,4071.858141858142,4074.353146853147,4076.8481518481517,4079.343156843157,4081.838161838162,4084.3331668331666,4086.828171828172,4089.3231768231767,4091.818181818182,4094.313186813187,4096.808191808192,4099.303196803196,4101.798201798202,4104.293206793207,4106.788211788212,4109.283216783217,4111.778221778221,4114.273226773227,4116.768231768232,4119.263236763237,4121.758241758242,4124.2532467532465,4126.748251748252,4129.243256743257,4131.738261738262,4134.233266733267,4136.7282717282715,4139.223276723276,4141.718281718282,4144.213286713287,4146.708291708292,4149.2032967032965,4151.698301698301,4154.193306693307,4156.688311688312,4159.183316683317,4161.6783216783215,4164.173326673326,4166.668331668332,4169.163336663337,4171.658341658342,4174.1533466533465,4176.648351648351,4179.143356643357,4181.638361638362,4184.133366633367,4186.6283716283715,4189.123376623376,4191.618381618382,4194.113386613387,4196.608391608392,4199.1033966033965,4201.598401598401,4204.093406593406,4206.588411588412,4209.083416583417,4211.5784215784215,4214.073426573426,4216.568431568431,4219.063436563437,4221.558441558442,4224.0534465534465,4226.548451548451,4229.043456543456,4231.538461538462,4234.033466533467,4236.5284715284715,4239.023476523476,4241.518481518481,4244.013486513487,4246.508491508492,4249.0034965034965,4251.498501498501,4253.993506493506,4256.488511488512,4258.983516483517,4261.4785214785215,4263.973526473526,4266.468531468531,4268.963536463537,4271.458541458542,4273.953546453547,4276.448551448551,4278.943556443556,4281.438561438561,4283.933566433567,4286.428571428572,4288.923576423576,4291.418581418581,4293.913586413586,4296.408591408592,4298.903596403597,4301.398601398601,4303.893606393606,4306.388611388611,4308.883616383617,4311.378621378622,4313.873626373626,4316.368631368631,4318.863636363636,4321.358641358642,4323.853646353647,4326.348651348651,4328.843656343656,4331.338661338661,4333.833666333667,4336.328671328672,4338.823676323676,4341.318681318681,4343.813686313686,4346.308691308691,4348.803696303697,4351.298701298701,4353.793706293706,4356.288711288711,4358.783716283716,4361.278721278722,4363.773726273726,4366.268731268731,4368.763736263736,4371.258741258741,4373.753746253747,4376.248751248751,4378.743756243756,4381.238761238761,4383.733766233766,4386.228771228772,4388.723776223776,4391.218781218781,4393.713786213786,4396.208791208791,4398.703796203797,4401.198801198801,4403.693806193806,4406.188811188811,4408.683816183816,4411.178821178821,4413.6738261738265,4416.168831168831,4418.663836163836,4421.158841158841,4423.653846153846,4426.1488511488515,4428.643856143856,4431.138861138861,4433.633866133866,4436.128871128871,4438.6238761238765,4441.118881118881,4443.613886113886,4446.108891108891,4448.603896103896,4451.0989010989015,4453.593906093906,4456.088911088911,4458.583916083916,4461.078921078921,4463.5739260739265,4466.068931068931,4468.563936063936,4471.058941058941,4473.553946053946,4476.0489510489515,4478.543956043956,4481.038961038961,4483.533966033966,4486.028971028971,4488.523976023976,4491.018981018981,4493.513986013986,4496.008991008991,4498.503996003996,4500.999000999001,4503.494005994006,4505.989010989011,4508.484015984016,4510.979020979021,4513.474025974026,4515.969030969031,4518.464035964036,4520.959040959041,4523.454045954046,4525.949050949051,4528.444055944056,4530.939060939061,4533.434065934066,4535.929070929071,4538.424075924076,4540.919080919081,4543.414085914086,4545.909090909091,4548.404095904096,4550.899100899101,4553.394105894105,4555.889110889111,4558.384115884116,4560.879120879121,4563.374125874126,4565.8691308691305,4568.364135864136,4570.859140859141,4573.354145854146,4575.849150849151,4578.3441558441555,4580.839160839161,4583.334165834166,4585.829170829171,4588.324175824176,4590.8191808191805,4593.314185814186,4595.809190809191,4598.304195804196,4600.799200799201,4603.2942057942055,4605.789210789211,4608.284215784216,4610.779220779221,4613.274225774226,4615.7692307692305,4618.264235764236,4620.759240759241,4623.254245754246,4625.749250749251,4628.2442557442555,4630.73926073926,4633.234265734266,4635.729270729271,4638.224275724276,4640.7192807192805,4643.214285714285,4645.709290709291,4648.204295704296,4650.699300699301,4653.1943056943055,4655.68931068931,4658.184315684316,4660.679320679321,4663.174325674326,4665.6693306693305,4668.164335664335,4670.659340659341,4673.154345654346,4675.649350649351,4678.1443556443555,4680.63936063936,4683.134365634366,4685.629370629371,4688.124375624376,4690.6193806193805,4693.114385614385,4695.60939060939,4698.104395604396,4700.599400599401,4703.0944055944055,4705.58941058941,4708.084415584415,4710.579420579421,4713.074425574426,4715.569430569431,4718.064435564435,4720.55944055944,4723.054445554446,4725.549450549451,4728.044455544456,4730.53946053946,4733.034465534465,4735.529470529471,4738.024475524476,4740.519480519481,4743.014485514485,4745.50949050949,4748.004495504496,4750.499500499501,4752.994505494506,4755.48951048951,4757.984515484515,4760.47952047952,4762.974525474526,4765.469530469531,4767.964535464535,4770.45954045954,4772.954545454545,4775.449550449551,4777.944555444556,4780.43956043956,4782.934565434565,4785.42957042957,4787.924575424576,4790.419580419581,4792.914585414585,4795.40959040959,4797.904595404595,4800.399600399601,4802.894605394606,4805.38961038961,4807.884615384615,4810.37962037962,4812.874625374626,4815.369630369631,4817.864635364635,4820.35964035964,4822.854645354645,4825.349650349651,4827.844655344656,4830.33966033966,4832.834665334665,4835.32967032967,4837.824675324675,4840.319680319681,4842.814685314685,4845.30969030969,4847.804695304695,4850.2997002997,4852.794705294706,4855.2897102897105,4857.784715284715,4860.27972027972,4862.774725274725,4865.269730269731,4867.7647352647355,4870.25974025974,4872.754745254745,4875.24975024975,4877.744755244756,4880.2397602397605,4882.734765234765,4885.22977022977,4887.724775224775,4890.219780219781,4892.7147852147855,4895.20979020979,4897.704795204795,4900.1998001998,4902.694805194805,4905.1898101898105,4907.684815184815,4910.17982017982,4912.674825174825,4915.16983016983,4917.6648351648355,4920.15984015984,4922.654845154845,4925.14985014985,4927.644855144855,4930.1398601398605,4932.634865134865,4935.12987012987,4937.624875124875,4940.11988011988,4942.6148851148855,4945.10989010989,4947.604895104895,4950.0999000999,4952.594905094905,4955.0899100899105,4957.584915084915,4960.07992007992,4962.574925074925,4965.06993006993,4967.564935064935,4970.05994005994,4972.554945054945,4975.04995004995,4977.544955044955,4980.03996003996,4982.534965034965,4985.02997002997,4987.524975024975,4990.01998001998,4992.514985014985,4995.00999000999,4997.504995004995,5000.0]}
},{}],30:[function(require,module,exports){
module.exports={"expected":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208],"x":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208]}
},{}],31:[function(require,module,exports){
module.exports={"expected":[1.0e-300,9.995004995054944e-301,9.99000999010989e-301,9.985014985164834e-301,9.980019980219781e-301,9.975024975274727e-301,9.97002997032967e-301,9.965034965384617e-301,9.960039960439559e-301,9.955044955494506e-301,9.950049950549451e-301,9.945054945604395e-301,9.940059940659342e-301,9.935064935714285e-301,9.930069930769232e-301,9.925074925824176e-301,9.920079920879121e-301,9.915084915934066e-301,9.91008991098901e-301,9.905094906043957e-301,9.9000999010989e-301,9.895104896153846e-301,9.890109891208793e-301,9.885114886263736e-301,9.880119881318683e-301,9.875124876373627e-301,9.870129871428572e-301,9.865134866483516e-301,9.86013986153846e-301,9.855144856593408e-301,9.850149851648351e-301,9.845154846703298e-301,9.840159841758242e-301,9.835164836813187e-301,9.830169831868134e-301,9.825174826923076e-301,9.820179821978023e-301,9.815184817032966e-301,9.810189812087912e-301,9.805194807142857e-301,9.800199802197802e-301,9.795204797252749e-301,9.790209792307693e-301,9.785214787362638e-301,9.780219782417583e-301,9.775224777472527e-301,9.770229772527474e-301,9.765234767582417e-301,9.760239762637363e-301,9.755244757692308e-301,9.750249752747253e-301,9.745254747802198e-301,9.740259742857144e-301,9.735264737912089e-301,9.730269732967032e-301,9.725274728021978e-301,9.720279723076923e-301,9.715284718131868e-301,9.710289713186812e-301,9.705294708241759e-301,9.700299703296704e-301,9.69530469835165e-301,9.690309693406595e-301,9.685314688461536e-301,9.680319683516483e-301,9.675324678571429e-301,9.670329673626374e-301,9.665334668681319e-301,9.660339663736263e-301,9.65534465879121e-301,9.650349653846153e-301,9.6453546489011e-301,9.640359643956045e-301,9.635364639010989e-301,9.630369634065934e-301,9.625374629120878e-301,9.620379624175825e-301,9.61538461923077e-301,9.610389614285715e-301,9.60539460934066e-301,9.600399604395604e-301,9.595404599450551e-301,9.590409594505493e-301,9.58541458956044e-301,9.580419584615385e-301,9.575424579670329e-301,9.570429574725276e-301,9.56543456978022e-301,9.560439564835166e-301,9.555444559890111e-301,9.550449554945055e-301,9.545454550000002e-301,9.540459545054944e-301,9.53546454010989e-301,9.530469535164834e-301,9.52547453021978e-301,9.520479525274727e-301,9.51548452032967e-301,9.510489515384617e-301,9.50549451043956e-301,9.500499505494506e-301,9.49550450054945e-301,9.490509495604395e-301,9.485514490659342e-301,9.480519485714285e-301,9.47552448076923e-301,9.470529475824176e-301,9.465534470879121e-301,9.460539465934068e-301,9.455544460989012e-301,9.450549456043955e-301,9.4455544510989e-301,9.440559446153846e-301,9.435564441208791e-301,9.430569436263736e-301,9.425574431318681e-301,9.420579426373627e-301,9.415584421428572e-301,9.410589416483517e-301,9.405594411538461e-301,9.400599406593408e-301,9.395604401648351e-301,9.390609396703297e-301,9.385614391758242e-301,9.380619386813187e-301,9.375624381868132e-301,9.370629376923078e-301,9.365634371978023e-301,9.360639367032968e-301,9.355644362087912e-301,9.350649357142857e-301,9.345654352197802e-301,9.340659347252748e-301,9.335664342307693e-301,9.330669337362638e-301,9.325674332417583e-301,9.320679327472529e-301,9.315684322527472e-301,9.310689317582417e-301,9.305694312637363e-301,9.300699307692308e-301,9.295704302747253e-301,9.290709297802197e-301,9.285714292857144e-301,9.280719287912087e-301,9.275724282967034e-301,9.27072927802198e-301,9.265734273076921e-301,9.260739268131868e-301,9.255744263186812e-301,9.250749258241759e-301,9.245754253296704e-301,9.240759248351648e-301,9.235764243406595e-301,9.230769238461538e-301,9.225774233516485e-301,9.220779228571429e-301,9.215784223626372e-301,9.21078921868132e-301,9.205794213736263e-301,9.20079920879121e-301,9.195804203846153e-301,9.1908091989011e-301,9.185814193956045e-301,9.180819189010989e-301,9.175824184065936e-301,9.170829179120878e-301,9.165834174175825e-301,9.160839169230768e-301,9.155844164285714e-301,9.15084915934066e-301,9.145854154395604e-301,9.140859149450551e-301,9.135864144505495e-301,9.13086913956044e-301,9.125874134615387e-301,9.120879129670329e-301,9.115884124725276e-301,9.11088911978022e-301,9.105894114835165e-301,9.10089910989011e-301,9.095904104945055e-301,9.090909100000002e-301,9.085914095054946e-301,9.080919090109891e-301,9.075924085164834e-301,9.07092908021978e-301,9.065934075274725e-301,9.06093907032967e-301,9.055944065384616e-301,9.05094906043956e-301,9.045954055494506e-301,9.040959050549451e-301,9.035964045604397e-301,9.03096904065934e-301,9.025974035714285e-301,9.02097903076923e-301,9.015984025824176e-301,9.010989020879121e-301,9.005994015934065e-301,9.000999010989012e-301,8.996004006043957e-301,8.991009001098902e-301,8.986013996153846e-301,8.98101899120879e-301,8.976023986263736e-301,8.971028981318682e-301,8.966033976373627e-301,8.961038971428572e-301,8.956043966483517e-301,8.951048961538463e-301,8.946053956593406e-301,8.941058951648353e-301,8.936063946703297e-301,8.931068941758242e-301,8.926073936813187e-301,8.92107893186813e-301,8.916083926923078e-301,8.911088921978023e-301,8.906093917032968e-301,8.901098912087913e-301,8.896103907142857e-301,8.891108902197802e-301,8.886113897252746e-301,8.881118892307693e-301,8.876123887362638e-301,8.871128882417582e-301,8.866133877472529e-301,8.861138872527472e-301,8.856143867582419e-301,8.851148862637364e-301,8.846153857692306e-301,8.841158852747253e-301,8.836163847802197e-301,8.831168842857144e-301,8.826173837912087e-301,8.821178832967033e-301,8.81618382802198e-301,8.811188823076923e-301,8.80619381813187e-301,8.801198813186814e-301,8.796203808241757e-301,8.791208803296702e-301,8.786213798351648e-301,8.781218793406595e-301,8.776223788461538e-301,8.771228783516483e-301,8.766233778571429e-301,8.761238773626374e-301,8.756243768681321e-301,8.751248763736263e-301,8.746253758791208e-301,8.741258753846153e-301,8.736263748901099e-301,8.731268743956044e-301,8.726273739010989e-301,8.721278734065936e-301,8.71628372912088e-301,8.711288724175825e-301,8.706293719230769e-301,8.701298714285714e-301,8.69630370934066e-301,8.691308704395604e-301,8.68631369945055e-301,8.681318694505495e-301,8.67632368956044e-301,8.671328684615385e-301,8.66633367967033e-301,8.661338674725276e-301,8.65634366978022e-301,8.651348664835165e-301,8.64635365989011e-301,8.641358654945055e-301,8.63636365e-301,8.631368645054946e-301,8.626373640109891e-301,8.621378635164836e-301,8.616383630219781e-301,8.611388625274723e-301,8.60639362032967e-301,8.601398615384616e-301,8.59640361043956e-301,8.591408605494506e-301,8.58641360054945e-301,8.581418595604397e-301,8.57642359065934e-301,8.571428585714287e-301,8.56643358076923e-301,8.561438575824174e-301,8.556443570879121e-301,8.551448565934065e-301,8.546453560989012e-301,8.541458556043957e-301,8.5364635510989e-301,8.531468546153847e-301,8.526473541208791e-301,8.521478536263738e-301,8.51648353131868e-301,8.511488526373625e-301,8.506493521428572e-301,8.501498516483516e-301,8.496503511538463e-301,8.491508506593406e-301,8.486513501648353e-301,8.481518496703298e-301,8.476523491758242e-301,8.471528486813187e-301,8.466533481868131e-301,8.461538476923078e-301,8.456543471978021e-301,8.451548467032967e-301,8.446553462087914e-301,8.441558457142857e-301,8.436563452197804e-301,8.431568447252748e-301,8.426573442307691e-301,8.421578437362638e-301,8.416583432417582e-301,8.411588427472529e-301,8.406593422527472e-301,8.401598417582418e-301,8.396603412637363e-301,8.391608407692308e-301,8.386613402747255e-301,8.381618397802199e-301,8.376623392857142e-301,8.371628387912087e-301,8.366633382967033e-301,8.361638378021978e-301,8.356643373076923e-301,8.351648368131868e-301,8.346653363186814e-301,8.341658358241759e-301,8.336663353296704e-301,8.331668348351648e-301,8.326673343406593e-301,8.321678338461538e-301,8.316683333516484e-301,8.311688328571429e-301,8.306693323626374e-301,8.301698318681318e-301,8.296703313736265e-301,8.29170830879121e-301,8.286713303846153e-301,8.281718298901099e-301,8.276723293956042e-301,8.27172828901099e-301,8.266733284065934e-301,8.26173827912088e-301,8.256743274175825e-301,8.25174826923077e-301,8.246753264285715e-301,8.241758259340657e-301,8.236763254395604e-301,8.23176824945055e-301,8.226773244505495e-301,8.22177823956044e-301,8.216783234615384e-301,8.21178822967033e-301,8.206793224725276e-301,8.201798219780221e-301,8.196803214835166e-301,8.191808209890108e-301,8.186813204945055e-301,8.181818199999999e-301,8.176823195054946e-301,8.171828190109891e-301,8.166833185164835e-301,8.161838180219782e-301,8.156843175274725e-301,8.151848170329672e-301,8.146853165384616e-301,8.14185816043956e-301,8.136863155494506e-301,8.13186815054945e-301,8.126873145604397e-301,8.12187814065934e-301,8.116883135714286e-301,8.111888130769232e-301,8.106893125824176e-301,8.101898120879123e-301,8.096903115934065e-301,8.09190811098901e-301,8.086913106043955e-301,8.0819181010989e-301,8.076923096153848e-301,8.071928091208791e-301,8.066933086263736e-301,8.061938081318682e-301,8.056943076373627e-301,8.051948071428572e-301,8.046953066483516e-301,8.041958061538461e-301,8.036963056593406e-301,8.031968051648352e-301,8.026973046703297e-301,8.021978041758242e-301,8.016983036813189e-301,8.011988031868133e-301,8.006993026923076e-301,8.001998021978021e-301,7.997003017032967e-301,7.992008012087914e-301,7.987013007142857e-301,7.982018002197802e-301,7.977022997252748e-301,7.972027992307693e-301,7.967032987362638e-301,7.962037982417583e-301,7.957042977472527e-301,7.952047972527472e-301,7.947052967582418e-301,7.942057962637363e-301,7.937062957692308e-301,7.932067952747253e-301,7.927072947802199e-301,7.922077942857144e-301,7.917082937912089e-301,7.912087932967033e-301,7.907092928021976e-301,7.902097923076923e-301,7.897102918131868e-301,7.892107913186814e-301,7.887112908241759e-301,7.882117903296703e-301,7.87712289835165e-301,7.872127893406593e-301,7.867132888461538e-301,7.862137883516484e-301,7.857142878571427e-301,7.852147873626374e-301,7.847152868681318e-301,7.842157863736265e-301,7.83716285879121e-301,7.832167853846153e-301,7.8271728489011e-301,7.822177843956042e-301,7.81718283901099e-301,7.812187834065933e-301,7.807192829120878e-301,7.802197824175825e-301,7.797202819230769e-301,7.792207814285716e-301,7.787212809340659e-301,7.782217804395606e-301,7.777222799450551e-301,7.772227794505493e-301,7.76723278956044e-301,7.762237784615384e-301,7.75724277967033e-301,7.752247774725274e-301,7.74725276978022e-301,7.742257764835166e-301,7.73726275989011e-301,7.732267754945057e-301,7.727272749999999e-301,7.722277745054944e-301,7.717282740109891e-301,7.712287735164835e-301,7.707292730219782e-301,7.702297725274725e-301,7.69730272032967e-301,7.692307715384616e-301,7.687312710439561e-301,7.682317705494508e-301,7.67732270054945e-301,7.672327695604395e-301,7.66733269065934e-301,7.662337685714286e-301,7.65734268076923e-301,7.652347675824176e-301,7.647352670879121e-301,7.642357665934067e-301,7.637362660989012e-301,7.632367656043955e-301,7.6273726510989e-301,7.622377646153846e-301,7.617382641208791e-301,7.612387636263736e-301,7.607392631318682e-301,7.602397626373627e-301,7.597402621428572e-301,7.592407616483517e-301,7.587412611538461e-301,7.582417606593406e-301,7.577422601648352e-301,7.572427596703297e-301,7.567432591758242e-301,7.562437586813187e-301,7.557442581868131e-301,7.552447576923076e-301,7.547452571978023e-301,7.542457567032968e-301,7.537462562087912e-301,7.532467557142857e-301,7.527472552197803e-301,7.522477547252748e-301,7.517482542307693e-301,7.512487537362638e-301,7.507492532417584e-301,7.502497527472527e-301,7.497502522527472e-301,7.492507517582418e-301,7.487512512637363e-301,7.482517507692308e-301,7.477522502747253e-301,7.472527497802197e-301,7.467532492857142e-301,7.462537487912088e-301,7.457542482967034e-301,7.452547478021978e-301,7.447552473076923e-301,7.4425574681318685e-301,7.437562463186813e-301,7.432567458241758e-301,7.427572453296703e-301,7.422577448351649e-301,7.417582443406594e-301,7.4125874384615384e-301,7.407592433516484e-301,7.402597428571428e-301,7.397602423626373e-301,7.3926074186813194e-301,7.387612413736264e-301,7.382617408791209e-301,7.377622403846154e-301,7.372627398901099e-301,7.367632393956043e-301,7.362637389010989e-301,7.3576423840659346e-301,7.35264737912088e-301,7.347652374175824e-301,7.342657369230769e-301,7.337662364285714e-301,7.33266735934066e-301,7.327672354395605e-301,7.32267734945055e-301,7.317682344505494e-301,7.312687339560439e-301,7.307692334615385e-301,7.302697329670331e-301,7.297702324725274e-301,7.29270731978022e-301,7.287712314835165e-301,7.28271730989011e-301,7.277722304945055e-301,7.272727300000001e-301,7.267732295054945e-301,7.26273729010989e-301,7.2577422851648356e-301,7.252747280219781e-301,7.247752275274725e-301,7.2427572703296705e-301,7.237762265384616e-301,7.232767260439561e-301,7.2277722554945054e-301,7.222777250549451e-301,7.217782245604395e-301,7.212787240659341e-301,7.2077922357142865e-301,7.202797230769231e-301,7.197802225824176e-301,7.1928072208791206e-301,7.187812215934066e-301,7.182817210989011e-301,7.177822206043956e-301,7.172827201098902e-301,7.167832196153847e-301,7.162837191208791e-301,7.157842186263736e-301,7.152847181318681e-301,7.147852176373627e-301,7.142857171428572e-301,7.137862166483517e-301,7.132867161538461e-301,7.127872156593406e-301,7.122877151648352e-301,7.117882146703298e-301,7.112887141758242e-301,7.107892136813187e-301,7.102897131868132e-301,7.097902126923077e-301,7.092907121978022e-301,7.087912117032967e-301,7.082917112087912e-301,7.077922107142857e-301,7.0729271021978026e-301,7.067932097252748e-301,7.0629370923076914e-301,7.0579420873626375e-301,7.052947082417583e-301,7.047952077472528e-301,7.042957072527473e-301,7.037962067582418e-301,7.032967062637362e-301,7.027972057692308e-301,7.0229770527472535e-301,7.017982047802198e-301,7.012987042857143e-301,7.0079920379120876e-301,7.002997032967033e-301,6.998002028021979e-301,6.993007023076923e-301,6.988012018131869e-301,6.983017013186813e-301,6.978022008241758e-301,6.9730270032967035e-301,6.968031998351648e-301,6.963036993406594e-301,6.9580419884615385e-301,6.953046983516484e-301,6.948051978571428e-301,6.9430569736263734e-301,6.938061968681319e-301,6.933066963736265e-301,6.928071958791209e-301,6.923076953846154e-301,6.918081948901099e-301,6.913086943956044e-301,6.908091939010989e-301,6.903096934065935e-301,6.898101929120879e-301,6.893106924175824e-301,6.8881119192307696e-301,6.883116914285715e-301,6.8781219093406584e-301,6.8731269043956045e-301,6.86813189945055e-301,6.863136894505495e-301,6.85814188956044e-301,6.853146884615384e-301,6.848151879670329e-301,6.843156874725275e-301,6.8381618697802205e-301,6.833166864835166e-301,6.828171859890109e-301,6.823176854945055e-301,6.81818185e-301,6.813186845054946e-301,6.80819184010989e-301,6.803196835164836e-301,6.79820183021978e-301,6.793206825274725e-301,6.7882118203296705e-301,6.783216815384616e-301,6.778221810439561e-301,6.7732268054945055e-301,6.768231800549451e-301,6.763236795604396e-301,6.7582417906593404e-301,6.7532467857142865e-301,6.748251780769231e-301,6.743256775824176e-301,6.738261770879121e-301,6.733266765934066e-301,6.728271760989011e-301,6.7232767560439556e-301,6.718281751098902e-301,6.713286746153846e-301,6.708291741208791e-301,6.703296736263737e-301,6.698301731318682e-301,6.693306726373626e-301,6.6883117214285715e-301,6.683316716483517e-301,6.678321711538462e-301,6.673326706593407e-301,6.668331701648351e-301,6.663336696703296e-301,6.658341691758242e-301,6.6533466868131875e-301,6.648351681868133e-301,6.643356676923076e-301,6.638361671978022e-301,6.633366667032967e-301,6.628371662087913e-301,6.623376657142858e-301,6.618381652197802e-301,6.613386647252747e-301,6.608391642307692e-301,6.6033966373626376e-301,6.598401632417583e-301,6.593406627472527e-301,6.5884116225274725e-301,6.583416617582418e-301,6.578421612637363e-301,6.5734266076923074e-301,6.5684316027472535e-301,6.563436597802198e-301,6.558441592857143e-301,6.5534465879120885e-301,6.548451582967033e-301,6.543456578021978e-301,6.538461573076923e-301,6.533466568131869e-301,6.528471563186813e-301,6.523476558241758e-301,6.518481553296704e-301,6.513486548351648e-301,6.508491543406593e-301,6.5034965384615385e-301,6.498501533516484e-301,6.493506528571429e-301,6.4885115236263735e-301,6.483516518681319e-301,6.478521513736263e-301,6.473526508791209e-301,6.4685315038461545e-301,6.4635364989011e-301,6.458541493956043e-301,6.453546489010989e-301,6.448551484065934e-301,6.44355647912088e-301,6.438561474175825e-301,6.433566469230769e-301,6.428571464285714e-301,6.423576459340659e-301,6.4185814543956046e-301,6.413586449450551e-301,6.408591444505494e-301,6.4035964395604395e-301,6.398601434615385e-301,6.39360642967033e-301,6.3886114247252745e-301,6.38361641978022e-301,6.378621414835165e-301,6.37362640989011e-301,6.3686314049450555e-301,6.3636364e-301,6.358641395054945e-301,6.3536463901098904e-301,6.348651385164836e-301,6.343656380219781e-301,6.338661375274725e-301,6.333666370329671e-301,6.328671365384615e-301,6.323676360439561e-301,6.3186813554945055e-301,6.313686350549451e-301,6.308691345604396e-301,6.3036963406593405e-301,6.298701335714286e-301,6.293706330769231e-301,6.288711325824176e-301,6.2837163208791215e-301,6.278721315934066e-301,6.273726310989011e-301,6.268731306043956e-301,6.263736301098901e-301,6.258741296153847e-301,6.253746291208791e-301,6.248751286263736e-301,6.243756281318681e-301,6.238761276373626e-301,6.2337662714285716e-301,6.228771266483518e-301,6.223776261538461e-301,6.2187812565934065e-301,6.213786251648352e-301,6.208791246703297e-301,6.203796241758242e-301,6.198801236813187e-301,6.193806231868132e-301,6.188811226923077e-301,6.1838162219780225e-301,6.178821217032967e-301,6.173826212087911e-301,6.1688312071428574e-301,6.163836202197803e-301,6.158841197252748e-301,6.153846192307692e-301,6.148851187362637e-301,6.143856182417582e-301,6.138861177472528e-301,6.133866172527473e-301,6.128871167582418e-301,6.123876162637363e-301,6.1188811576923075e-301,6.113886152747253e-301,6.108891147802198e-301,6.103896142857143e-301,6.0989011379120885e-301,6.093906132967033e-301,6.088911128021978e-301,6.083916123076923e-301,6.078921118131869e-301,6.073926113186814e-301,6.068931108241758e-301,6.063936103296704e-301,6.058941098351648e-301,6.053946093406593e-301,6.0489510884615394e-301,6.043956083516484e-301,6.038961078571428e-301,6.0339660736263735e-301,6.028971068681319e-301,6.023976063736264e-301,6.0189810587912085e-301,6.013986053846154e-301,6.008991048901099e-301,6.003996043956044e-301,5.9990010390109895e-301,5.994006034065935e-301,5.989011029120878e-301,5.9840160241758244e-301,5.97902101923077e-301,5.974026014285715e-301,5.969031009340659e-301,5.964036004395604e-301,5.959040999450549e-301,5.954045994505495e-301,5.94905098956044e-301,5.944055984615385e-301,5.939060979670329e-301,5.9340659747252745e-301,5.92907096978022e-301,5.924075964835166e-301,5.91908095989011e-301,5.914085954945055e-301,5.90909095e-301,5.904095945054945e-301,5.89910094010989e-301,5.894105935164836e-301,5.889110930219781e-301,5.884115925274725e-301,5.879120920329671e-301,5.874125915384615e-301,5.86913091043956e-301,5.8641359054945064e-301,5.859140900549451e-301,5.854145895604396e-301,5.8491508906593405e-301,5.844155885714286e-301,5.839160880769231e-301,5.834165875824176e-301,5.829170870879121e-301,5.824175865934066e-301,5.819180860989011e-301,5.8141858560439565e-301,5.809190851098901e-301,5.804195846153845e-301,5.7992008412087915e-301,5.794205836263737e-301,5.789210831318682e-301,5.7842158263736256e-301,5.779220821428571e-301,5.774225816483516e-301,5.769230811538462e-301,5.764235806593407e-301,5.759240801648352e-301,5.754245796703296e-301,5.7492507917582415e-301,5.744255786813187e-301,5.739260781868133e-301,5.734265776923077e-301,5.729270771978022e-301,5.724275767032967e-301,5.719280762087912e-301,5.7142857571428575e-301,5.709290752197803e-301,5.704295747252747e-301,5.6993007423076924e-301,5.694305737362638e-301,5.689310732417582e-301,5.684315727472527e-301,5.679320722527473e-301,5.674325717582418e-301,5.669330712637363e-301,5.6643357076923076e-301,5.659340702747253e-301,5.654345697802198e-301,5.649350692857143e-301,5.6443556879120886e-301,5.639360682967033e-301,5.634365678021978e-301,5.6293706730769235e-301,5.624375668131868e-301,5.619380663186813e-301,5.6143856582417585e-301,5.609390653296704e-301,5.604395648351649e-301,5.599400643406593e-301,5.594405638461538e-301,5.589410633516484e-301,5.584415628571429e-301,5.5794206236263744e-301,5.574425618681318e-301,5.569430613736263e-301,5.5644356087912085e-301,5.559440603846154e-301,5.5544455989011e-301,5.549450593956044e-301,5.544455589010989e-301,5.539460584065934e-301,5.534465579120879e-301,5.5294705741758245e-301,5.52447556923077e-301,5.519480564285714e-301,5.5144855593406594e-301,5.509490554395605e-301,5.50449554945055e-301,5.499500544505494e-301,5.49450553956044e-301,5.489510534615385e-301,5.48451552967033e-301,5.4795205247252746e-301,5.47452551978022e-301,5.469530514835164e-301,5.46453550989011e-301,5.459540504945056e-301,5.4545455e-301,5.449550495054945e-301,5.44455549010989e-301,5.439560485164835e-301,5.434565480219781e-301,5.4295704752747255e-301,5.424575470329671e-301,5.419580465384616e-301,5.41458546043956e-301,5.409590455494505e-301,5.404595450549451e-301,5.399600445604396e-301,5.3946054406593414e-301,5.389610435714286e-301,5.38461543076923e-301,5.3796204258241755e-301,5.374625420879122e-301,5.369630415934067e-301,5.3646354109890105e-301,5.359640406043956e-301,5.354645401098901e-301,5.349650396153846e-301,5.3446553912087915e-301,5.339660386263736e-301,5.334665381318681e-301,5.3296703763736264e-301,5.324675371428572e-301,5.319680366483517e-301,5.314685361538461e-301,5.309690356593407e-301,5.304695351648352e-301,5.299700346703297e-301,5.294705341758242e-301,5.289710336813187e-301,5.284715331868131e-301,5.279720326923077e-301,5.274725321978023e-301,5.269730317032967e-301,5.264735312087912e-301,5.259740307142857e-301,5.254745302197802e-301,5.249750297252748e-301,5.2447552923076925e-301,5.239760287362638e-301,5.234765282417582e-301,5.2297702774725274e-301,5.224775272527472e-301,5.219780267582418e-301,5.214785262637363e-301,5.209790257692308e-301,5.204795252747253e-301,5.199800247802197e-301,5.1948052428571426e-301,5.189810237912089e-301,5.184815232967034e-301,5.179820228021978e-301,5.174825223076923e-301,5.169830218131868e-301,5.164835213186813e-301,5.159840208241759e-301,5.154845203296703e-301,5.149850198351648e-301,5.1448551934065935e-301,5.139860188461539e-301,5.134865183516484e-301,5.129870178571428e-301,5.124875173626374e-301,5.119880168681319e-301,5.114885163736264e-301,5.1098901587912094e-301,5.104895153846153e-301,5.099900148901098e-301,5.094905143956044e-301,5.08991013901099e-301,5.084915134065935e-301,5.079920129120879e-301,5.074925124175824e-301,5.069930119230769e-301,5.064935114285715e-301,5.0599401093406595e-301,5.054945104395605e-301,5.049950099450549e-301,5.0449550945054944e-301,5.03996008956044e-301,5.034965084615385e-301,5.02997007967033e-301,5.024975074725275e-301,5.01998006978022e-301,5.014985064835164e-301,5.0099900598901096e-301,5.004995054945056e-301,5.00000005e-301,4.995005045054945e-301,4.99001004010989e-301,4.985015035164835e-301,4.98002003021978e-301,4.9750250252747255e-301,4.970030020329671e-301,4.965035015384615e-301,4.9600400104395605e-301,4.955045005494506e-301,4.950050000549451e-301,4.945054995604395e-301,4.940059990659341e-301,4.935064985714286e-301,4.930069980769231e-301,4.9250749758241764e-301,4.92007997087912e-301,4.915084965934066e-301,4.910089960989011e-301,4.905094956043957e-301,4.900099951098902e-301,4.8951049461538455e-301,4.890109941208791e-301,4.885114936263737e-301,4.880119931318682e-301,4.8751249263736265e-301,4.870129921428571e-301,4.865134916483516e-301,4.8601399115384614e-301,4.855144906593407e-301,4.850149901648352e-301,4.845154896703297e-301,4.840159891758242e-301,4.835164886813187e-301,4.830169881868132e-301,4.8251748769230766e-301,4.820179871978023e-301,4.815184867032967e-301,4.810189862087912e-301,4.805194857142857e-301,4.800199852197802e-301,4.795204847252747e-301,4.7902098423076925e-301,4.785214837362638e-301,4.780219832417582e-301,4.7752248274725275e-301,4.770229822527473e-301,4.765234817582417e-301,4.760239812637363e-301,4.755244807692308e-301,4.750249802747253e-301,4.745254797802198e-301,4.7402597928571434e-301,4.735264787912087e-301,4.730269782967033e-301,4.725274778021978e-301,4.720279773076924e-301,4.715284768131869e-301,4.7102897631868125e-301,4.705294758241758e-301,4.700299753296704e-301,4.695304748351649e-301,4.690309743406594e-301,4.685314738461538e-301,4.680319733516483e-301,4.6753247285714285e-301,4.6703297236263745e-301,4.665334718681319e-301,4.660339713736263e-301,4.655344708791209e-301,4.650349703846154e-301,4.645354698901099e-301,4.640359693956044e-301,4.635364689010989e-301,4.630369684065934e-301,4.625374679120879e-301,4.620379674175825e-301,4.615384669230769e-301,4.610389664285714e-301,4.6053946593406596e-301,4.600399654395605e-301,4.595404649450549e-301,4.5904096445054945e-301,4.58541463956044e-301,4.580419634615384e-301,4.57542462967033e-301,4.570429624725275e-301,4.56543461978022e-301,4.560439614835165e-301,4.55544460989011e-301,4.550449604945055e-301,4.5454546e-301,4.540459595054945e-301,4.535464590109891e-301,4.530469585164835e-301,4.5254745802197795e-301,4.520479575274725e-301,4.515484570329671e-301,4.510489565384616e-301,4.505494560439561e-301,4.500499555494505e-301,4.49550455054945e-301,4.4905095456043955e-301,4.4855145406593416e-301,4.480519535714287e-301,4.47552453076923e-301,4.470529525824176e-301,4.465534520879121e-301,4.460539515934066e-301,4.4555445109890114e-301,4.450549506043956e-301,4.445554501098901e-301,4.440559496153846e-301,4.435564491208792e-301,4.430569486263736e-301,4.425574481318681e-301,4.4205794763736266e-301,4.415584471428572e-301,4.410589466483517e-301,4.4055944615384615e-301,4.400599456593406e-301,4.395604451648351e-301,4.390609446703297e-301,4.385614441758242e-301,4.380619436813187e-301,4.375624431868132e-301,4.370629426923077e-301,4.365634421978022e-301,4.360639417032967e-301,4.355644412087912e-301,4.350649407142858e-301,4.345654402197802e-301,4.340659397252747e-301,4.335664392307692e-301,4.330669387362638e-301,4.325674382417583e-301,4.3206793774725275e-301,4.315684372527472e-301,4.310689367582417e-301,4.3056943626373625e-301,4.3006993576923086e-301,4.295704352747253e-301,4.2907093478021974e-301,4.285714342857143e-301,4.280719337912088e-301,4.275724332967033e-301,4.270729328021979e-301,4.265734323076923e-301,4.260739318131868e-301,4.255744313186813e-301,4.250749308241759e-301,4.245754303296703e-301,4.240759298351648e-301,4.2357642934065936e-301,4.230769288461539e-301,4.225774283516484e-301,4.2207792785714285e-301,4.215784273626373e-301,4.210789268681319e-301,4.205794263736264e-301,4.2007992587912095e-301,4.195804253846154e-301,4.190809248901098e-301,4.185814243956044e-301,4.180819239010989e-301,4.175824234065934e-301,4.1708292291208794e-301,4.165834224175824e-301,4.160839219230769e-301,4.155844214285714e-301,4.150849209340659e-301,4.145854204395605e-301,4.14085919945055e-301,4.1358641945054946e-301,4.13086918956044e-301,4.125874184615384e-301,4.1208791796703295e-301,4.1158841747252756e-301,4.11088916978022e-301,4.1058941648351644e-301,4.10089915989011e-301,4.095904154945055e-301,4.09090915e-301,4.0859141450549455e-301,4.08091914010989e-301,4.075924135164835e-301,4.07092913021978e-301,4.065934125274726e-301,4.06093912032967e-301,4.055944115384615e-301,4.050949110439561e-301,4.045954105494506e-301,4.040959100549451e-301,4.0359640956043955e-301,4.03096909065934e-301,4.025974085714286e-301,4.020979080769231e-301,4.0159840758241766e-301,4.010989070879121e-301,4.005994065934065e-301,4.000999060989011e-301,3.996004056043957e-301,3.991009051098902e-301,3.9860140461538464e-301,3.981019041208791e-301,3.976024036263736e-301,3.971029031318681e-301,3.966034026373627e-301,3.961039021428572e-301,3.956044016483516e-301,3.9510490115384616e-301,3.946054006593407e-301,3.941059001648351e-301,3.9360639967032965e-301,3.931068991758243e-301,3.926073986813187e-301,3.921078981868132e-301,3.916083976923077e-301,3.911088971978022e-301,3.906093967032967e-301,3.9010989620879125e-301,3.896103957142857e-301,3.891108952197802e-301,3.886113947252747e-301,3.881118942307693e-301,3.876123937362637e-301,3.871128932417582e-301,3.866133927472528e-301,3.861138922527473e-301,3.856143917582418e-301,3.8511489126373625e-301,3.846153907692307e-301,3.841158902747253e-301,3.836163897802198e-301,3.8311688928571436e-301,3.826173887912087e-301,3.8211788829670324e-301,3.8161838780219785e-301,3.811188873076923e-301,3.806193868131868e-301,3.8011988631868134e-301,3.796203858241759e-301,3.791208853296703e-301,3.786213848351648e-301,3.781218843406594e-301,3.776223838461538e-301,3.771228833516484e-301,3.7662338285714286e-301,3.761238823626374e-301,3.756243818681319e-301,3.7512488137362635e-301,3.746253808791209e-301,3.741258803846154e-301,3.736263798901099e-301,3.731268793956044e-301,3.726273789010989e-301,3.7212787840659342e-301,3.716283779120879e-301,3.7112887741758243e-301,3.7062937692307696e-301,3.701298764285714e-301,3.6963037593406597e-301,3.6913087543956045e-301,3.6863137494505494e-301,3.6813187445054946e-301,3.6763237395604395e-301,3.6713287346153847e-301,3.66633372967033e-301,3.661338724725275e-301,3.6563437197802197e-301,3.6513487148351653e-301,3.6463537098901098e-301,3.641358704945055e-301,3.6363637000000003e-301,3.631368695054945e-301,3.6263736901098904e-301,3.621378685164835e-301,3.6163836802197805e-301,3.6113886752747253e-301,3.6063936703296706e-301,3.601398665384616e-301,3.5964036604395602e-301,3.5914086554945055e-301,3.5864136505494508e-301,3.5814186456043956e-301,3.5764236406593404e-301,3.5714286357142857e-301,3.566433630769231e-301,3.5614386258241758e-301,3.556443620879121e-301,3.551448615934066e-301,3.546453610989011e-301,3.541458606043956e-301,3.5364636010989012e-301,3.531468596153846e-301,3.5264735912087913e-301,3.5214785862637366e-301,3.516483581318681e-301,3.5114885763736267e-301,3.506493571428571e-301,3.5014985664835164e-301,3.496503561538462e-301,3.4915085565934065e-301,3.4865135516483517e-301,3.481518546703297e-301,3.476523541758242e-301,3.4715285368131867e-301,3.466533531868132e-301,3.461538526923077e-301,3.456543521978022e-301,3.4515485170329673e-301,3.446553512087912e-301,3.441558507142857e-301,3.4365635021978022e-301,3.4315684972527475e-301,3.4265734923076923e-301,3.4215784873626376e-301,3.416583482417583e-301,3.4115884774725273e-301,3.406593472527473e-301,3.4015984675824173e-301,3.3966034626373626e-301,3.3916084576923083e-301,3.3866134527472527e-301,3.381618447802198e-301,3.3766234428571432e-301,3.371628437912088e-301,3.366633432967033e-301,3.3616384280219777e-301,3.3566434230769234e-301,3.3516484181318683e-301,3.346653413186813e-301,3.3416584082417583e-301,3.336663403296703e-301,3.331668398351648e-301,3.3266733934065937e-301,3.3216783884615385e-301,3.3166833835164834e-301,3.311688378571429e-301,3.3066933736263735e-301,3.3016983686813187e-301,3.2967033637362636e-301,3.291708358791209e-301,3.286713353846154e-301,3.281718348901099e-301,3.276723343956044e-301,3.2717283390109886e-301,3.2667333340659343e-301,3.261738329120879e-301,3.256743324175824e-301,3.2517483192307696e-301,3.2467533142857145e-301,3.2417583093406593e-301,3.2367633043956046e-301,3.2317682994505494e-301,3.2267732945054943e-301,3.22177828956044e-301,3.2167832846153848e-301,3.2117882796703296e-301,3.2067932747252753e-301,3.2017982697802197e-301,3.196803264835165e-301,3.19180825989011e-301,3.186813254945055e-301,3.1818182500000003e-301,3.176823245054945e-301,3.1718282401098904e-301,3.166833235164835e-301,3.1618382302197805e-301,3.1568432252747254e-301,3.15184822032967e-301,3.146853215384616e-301,3.1418582104395607e-301,3.1368632054945056e-301,3.1318682005494504e-301,3.1268731956043957e-301,3.1218781906593405e-301,3.1168831857142858e-301,3.111888180769231e-301,3.106893175824176e-301,3.1018981708791207e-301,3.096903165934066e-301,3.091908160989011e-301,3.0869131560439556e-301,3.0819181510989013e-301,3.0769231461538466e-301,3.071928141208791e-301,3.0669331362637367e-301,3.061938131318681e-301,3.0569431263736263e-301,3.0519481214285716e-301,3.0469531164835164e-301,3.0419581115384617e-301,3.0369631065934065e-301,3.0319681016483518e-301,3.0269730967032966e-301,3.021978091758242e-301,3.0169830868131867e-301,3.011988081868132e-301,3.0069930769230772e-301,3.001998071978022e-301,2.997003067032967e-301,2.992008062087912e-301,2.9870130571428574e-301,2.982018052197802e-301,2.9770230472527475e-301,2.9720280423076928e-301,2.9670330373626372e-301,2.962038032417583e-301,2.9570430274725273e-301,2.9520480225274726e-301,2.947053017582418e-301,2.9420580126373627e-301,2.937063007692308e-301,2.9320680027472528e-301,2.927072997802198e-301,2.922077992857143e-301,2.917082987912088e-301,2.912087982967033e-301,2.9070929780219782e-301,2.902097973076923e-301,2.8971029681318683e-301,2.892107963186813e-301,2.887112958241758e-301,2.8821179532967037e-301,2.877122948351648e-301,2.8721279434065933e-301,2.8671329384615386e-301,2.8621379335164834e-301,2.8571429285714287e-301,2.8521479236263735e-301,2.847152918681319e-301,2.8421579137362636e-301,2.837162908791209e-301,2.832167903846154e-301,2.8271728989010986e-301,2.8221778939560443e-301,2.817182889010989e-301,2.812187884065934e-301,2.807192879120879e-301,2.8021978741758244e-301,2.7972028692307693e-301,2.7922078642857145e-301,2.7872128593406594e-301,2.7822178543956042e-301,2.77722284945055e-301,2.7722278445054943e-301,2.7672328395604396e-301,2.762237834615385e-301,2.7572428296703297e-301,2.752247824725275e-301,2.7472528197802198e-301,2.742257814835165e-301,2.73726280989011e-301,2.732267804945055e-301,2.7272728000000004e-301,2.722277795054945e-301,2.7172827901098905e-301,2.7122877851648353e-301,2.70729278021978e-301,2.7022977752747254e-301,2.6973027703296703e-301,2.6923077653846155e-301,2.6873127604395608e-301,2.6823177554945056e-301,2.6773227505494505e-301,2.6723277456043957e-301,2.6673327406593406e-301,2.662337735714286e-301,2.6573427307692307e-301,2.652347725824176e-301,2.647352720879121e-301,2.6423577159340656e-301,2.6373627109890113e-301,2.6323677060439557e-301,2.627372701098901e-301,2.6223776961538466e-301,2.617382691208791e-301,2.6123876862637363e-301,2.6073926813186816e-301,2.6023976763736264e-301,2.5974026714285712e-301,2.5924076664835165e-301,2.5874126615384617e-301,2.5824176565934066e-301,2.577422651648352e-301,2.5724276467032967e-301,2.567432641758242e-301,2.5624376368131868e-301,2.557442631868132e-301,2.552447626923077e-301,2.547452621978022e-301,2.5424576170329674e-301,2.537462612087912e-301,2.5324676071428575e-301,2.527472602197802e-301,2.522477597252747e-301,2.517482592307693e-301,2.5124875873626373e-301,2.5074925824175825e-301,2.5024975774725278e-301,2.4975025725274726e-301,2.4925075675824175e-301,2.4875125626373627e-301,2.482517557692308e-301,2.477522552747253e-301,2.472527547802198e-301,2.467532542857143e-301,2.4625375379120878e-301,2.457542532967033e-301,2.4525475280219783e-301,2.447552523076923e-301,2.4425575181318684e-301,2.4375625131868136e-301,2.432567508241758e-301,2.4275725032967033e-301,2.422577498351648e-301,2.4175824934065934e-301,2.4125874884615387e-301,2.4075924835164835e-301,2.4025974785714288e-301,2.3976024736263736e-301,2.392607468681319e-301,2.3876124637362637e-301,2.3826174587912085e-301,2.3776224538461542e-301,2.372627448901099e-301,2.367632443956044e-301,2.362637439010989e-301,2.357642434065934e-301,2.352647429120879e-301,2.3476524241758245e-301,2.3426574192307693e-301,2.337662414285714e-301,2.33266740934066e-301,2.3276724043956043e-301,2.3226773994505495e-301,2.3176823945054944e-301,2.3126873895604396e-301,2.307692384615385e-301,2.3026973796703297e-301,2.297702374725275e-301,2.2927073697802194e-301,2.287712364835165e-301,2.28271735989011e-301,2.2777223549450548e-301,2.2727273500000004e-301,2.2677323450549453e-301,2.26273734010989e-301,2.2577423351648354e-301,2.2527473302197802e-301,2.247752325274725e-301,2.2427573203296707e-301,2.2377623153846156e-301,2.2327673104395604e-301,2.2277723054945057e-301,2.2227773005494505e-301,2.2177822956043958e-301,2.2127872906593406e-301,2.207792285714286e-301,2.202797280769231e-301,2.1978022758241756e-301,2.1928072708791212e-301,2.1878122659340657e-301,2.182817260989011e-301,2.177822256043956e-301,2.172827251098901e-301,2.1678322461538463e-301,2.1628372412087915e-301,2.1578422362637364e-301,2.152847231318681e-301,2.1478522263736265e-301,2.1428572214285713e-301,2.1378622164835166e-301,2.132867211538462e-301,2.1278722065934067e-301,2.1228772016483515e-301,2.1178821967032967e-301,2.112887191758242e-301,2.1078921868131864e-301,2.102897181868132e-301,2.0979021769230774e-301,2.0929071719780218e-301,2.0879121670329675e-301,2.082917162087912e-301,2.077922157142857e-301,2.0729271521978024e-301,2.0679321472527472e-301,2.0629371423076925e-301,2.0579421373626373e-301,2.0529471324175826e-301,2.0479521274725274e-301,2.0429571225274727e-301,2.0379621175824175e-301,2.0329671126373628e-301,2.027972107692308e-301,2.022977102747253e-301,2.0179820978021977e-301,2.012987092857143e-301,2.0079920879120882e-301,2.0029970829670327e-301,1.9980020780219783e-301,1.9930070730769236e-301,1.988012068131868e-301,1.9830170631868137e-301,1.978022058241758e-301,1.9730270532967034e-301,1.9680320483516482e-301,1.9630370434065935e-301,1.9580420384615387e-301,1.953047033516483e-301,1.948052028571429e-301,1.9430570236263737e-301,1.9380620186813185e-301,1.9330670137362638e-301,1.928072008791209e-301,1.9230770038461534e-301,1.918081998901099e-301,1.913086993956044e-301,1.9080919890109892e-301,1.903096984065934e-301,1.898101979120879e-301,1.893106974175824e-301,1.8881119692307694e-301,1.8831169642857142e-301,1.8781219593406595e-301,1.8731269543956043e-301,1.8681319494505496e-301,1.8631369445054947e-301,1.8581419395604395e-301,1.8531469346153847e-301,1.8481519296703298e-301,1.8431569247252746e-301,1.8381619197802197e-301,1.8331669148351652e-301,1.82817190989011e-301,1.823176904945055e-301,1.8181819e-301,1.813186895054945e-301,1.8081918901098902e-301,1.8031968851648352e-301,1.7982018802197803e-301,1.7932068752747253e-301,1.7882118703296704e-301,1.7832168653846154e-301,1.7782218604395605e-301,1.7732268554945053e-301,1.7682318505494506e-301,1.7632368456043958e-301,1.7582418406593407e-301,1.7532468357142857e-301,1.748251830769231e-301,1.7432568258241758e-301,1.7382618208791209e-301,1.733266815934066e-301,1.728271810989011e-301,1.7232768060439562e-301,1.7182818010989013e-301,1.7132867961538461e-301,1.7082917912087912e-301,1.7032967862637364e-301,1.6983017813186813e-301,1.6933067763736265e-301,1.6883117714285716e-301,1.6833167664835166e-301,1.6783217615384617e-301,1.6733267565934065e-301,1.6683317516483516e-301,1.6633367467032968e-301,1.6583417417582419e-301,1.653346736813187e-301,1.648351731868132e-301,1.6433567269230768e-301,1.638361721978022e-301,1.633366717032967e-301,1.628371712087912e-301,1.6233767071428572e-301,1.6183817021978025e-301,1.6133866972527473e-301,1.6083916923076923e-301,1.6033966873626374e-301,1.5984016824175824e-301,1.5934066774725275e-301,1.5884116725274727e-301,1.5834166675824176e-301,1.5784216626373626e-301,1.5734266576923079e-301,1.5684316527472527e-301,1.5634366478021978e-301,1.5584416428571426e-301,1.553446637912088e-301,1.5484516329670331e-301,1.543456628021978e-301,1.538461623076923e-301,1.5334666181318683e-301,1.5284716131868131e-301,1.5234766082417582e-301,1.5184816032967034e-301,1.5134865983516485e-301,1.5084915934065935e-301,1.5034965884615386e-301,1.4985015835164834e-301,1.4935065785714285e-301,1.4885115736263737e-301,1.4835165686813188e-301,1.4785215637362638e-301,1.4735265587912089e-301,1.468531553846154e-301,1.463536548901099e-301,1.458541543956044e-301,1.4535465390109889e-301,1.4485515340659343e-301,1.4435565291208792e-301,1.4385615241758242e-301,1.4335665192307693e-301,1.4285715142857143e-301,1.4235765093406594e-301,1.4185815043956044e-301,1.4135864994505495e-301,1.4085914945054945e-301,1.4035964895604398e-301,1.3986014846153846e-301,1.3936064796703297e-301,1.3886114747252747e-301,1.3836164697802197e-301,1.378621464835165e-301,1.37362645989011e-301,1.3686314549450549e-301,1.3636364500000002e-301,1.3586414450549452e-301,1.35364644010989e-301,1.348651435164835e-301,1.3436564302197806e-301,1.3386614252747254e-301,1.3336664203296704e-301,1.3286714153846153e-301,1.3236764104395603e-301,1.3186814054945056e-301,1.3136864005494504e-301,1.3086913956043957e-301,1.3036963906593407e-301,1.2987013857142858e-301,1.2937063807692308e-301,1.2887113758241759e-301,1.2837163708791207e-301,1.278721365934066e-301,1.2737263609890112e-301,1.268731356043956e-301,1.2637363510989011e-301,1.2587413461538464e-301,1.2537463412087912e-301,1.2487513362637363e-301,1.2437563313186813e-301,1.2387613263736262e-301,1.2337663214285716e-301,1.2287713164835167e-301,1.2237763115384615e-301,1.2187813065934066e-301,1.2137863016483516e-301,1.2087912967032967e-301,1.203796291758242e-301,1.1988012868131868e-301,1.193806281868132e-301,1.188811276923077e-301,1.183816271978022e-301,1.178821267032967e-301,1.173826262087912e-301,1.1688312571428573e-301,1.1638362521978023e-301,1.1588412472527474e-301,1.1538462423076922e-301,1.1488512373626375e-301,1.1438562324175825e-301,1.1388612274725273e-301,1.1338662225274724e-301,1.1288712175824179e-301,1.1238762126373627e-301,1.1188812076923077e-301,1.1138862027472528e-301,1.1088911978021978e-301,1.1038961928571429e-301,1.0989011879120877e-301,1.093906182967033e-301,1.088911178021978e-301,1.083916173076923e-301,1.0789211681318681e-301,1.0739261631868132e-301,1.068931158241758e-301,1.0639361532967033e-301,1.0589411483516485e-301,1.0539461434065934e-301,1.0489511384615384e-301,1.0439561335164837e-301,1.0389611285714285e-301,1.0339661236263736e-301,1.0289711186813186e-301,1.0239761137362639e-301,1.018981108791209e-301,1.013986103846154e-301,1.0089910989010988e-301,1.0039960939560439e-301,9.990010890109891e-302,9.94006084065934e-302,9.890110791208792e-302,9.84016074175824e-302,9.790210692307693e-302,9.740260642857144e-302,9.690310593406592e-302,9.640360543956043e-302,9.590410494505495e-302,9.540460445054946e-302,9.490510395604396e-302,9.440560346153847e-302,9.390610296703297e-302,9.340660247252748e-302,9.290710197802198e-302,9.240760148351649e-302,9.190810098901099e-302,9.14086004945055e-302,9.090910000000001e-302,9.04095995054945e-302,8.991009901098901e-302,8.941059851648351e-302,8.891109802197803e-302,8.841159752747252e-302,8.791209703296704e-302,8.741259653846154e-302,8.691309604395605e-302,8.641359554945054e-302,8.591409505494507e-302,8.541459456043956e-302,8.491509406593406e-302,8.441559357142858e-302,8.391609307692308e-302,8.341659258241758e-302,8.291709208791208e-302,8.24175915934066e-302,8.19180910989011e-302,8.14185906043956e-302,8.091909010989011e-302,8.041958961538462e-302,7.992008912087912e-302,7.942058862637363e-302,7.892108813186814e-302,7.842158763736264e-302,7.792208714285714e-302,7.742258664835165e-302,7.692308615384616e-302,7.642358565934065e-302,7.592408516483517e-302,7.542458467032967e-302,7.492508417582418e-302,7.442558368131868e-302,7.392608318681319e-302,7.342658269230769e-302,7.292708219780221e-302,7.24275817032967e-302,7.192808120879122e-302,7.142858071428571e-302,7.092908021978023e-302,7.042957972527472e-302,6.993007923076924e-302,6.943057873626374e-302,6.893107824175824e-302,6.843157774725275e-302,6.793207725274726e-302,6.743257675824176e-302,6.693307626373626e-302,6.643357576923077e-302,6.593407527472528e-302,6.543457478021978e-302,6.493507428571429e-302,6.44355737912088e-302,6.393607329670329e-302,6.34365728021978e-302,6.293707230769231e-302,6.243757181318682e-302,6.193807131868131e-302,6.143857082417584e-302,6.093907032967033e-302,6.043956983516483e-302,5.994006934065933e-302,5.944056884615385e-302,5.894106835164835e-302,5.844156785714285e-302,5.794206736263737e-302,5.744256686813187e-302,5.694306637362637e-302,5.644356587912088e-302,5.594406538461539e-302,5.544456489010989e-302,5.494506439560439e-302,5.444556390109891e-302,5.394606340659341e-302,5.344656291208791e-302,5.294706241758241e-302,5.244756192307693e-302,5.194806142857142e-302,5.144856093406594e-302,5.094906043956044e-302,5.044955994505495e-302,4.995005945054945e-302,4.945055895604396e-302,4.895105846153846e-302,4.845155796703297e-302,4.795205747252747e-302,4.745255697802198e-302,4.695305648351648e-302,4.6453555989010986e-302,4.5954055494505496e-302,4.5454555e-302,4.4955054505494506e-302,4.4455554010989016e-302,4.3956053516483516e-302,4.3456553021978026e-302,4.295705252747253e-302,4.2457552032967036e-302,4.195805153846154e-302,4.1458551043956045e-302,4.0959050549450555e-302,4.0459550054945055e-302,3.996004956043956e-302,3.9460549065934065e-302,3.896104857142857e-302,3.8461548076923075e-302,3.7962047582417585e-302,3.7462547087912084e-302,3.6963046593406594e-302,3.6463546098901104e-302,3.5964045604395604e-302,3.5464545109890114e-302,3.4965044615384614e-302,3.4465544120879124e-302,3.396604362637363e-302,3.3466543131868134e-302,3.2967042637362644e-302,3.246754214285714e-302,3.196804164835165e-302,3.1468541153846153e-302,3.096904065934066e-302,3.0469540164835163e-302,2.997003967032967e-302,2.947053917582418e-302,2.8971038681318683e-302,2.847153818681319e-302,2.797203769230769e-302,2.74725371978022e-302,2.69730367032967e-302,2.647353620879121e-302,2.5974035714285717e-302,2.547453521978022e-302,2.497503472527473e-302,2.4475534230769227e-302,2.3976033736263737e-302,2.347653324175824e-302,2.297703274725275e-302,2.2477532252747251e-302,2.1978031758241756e-302,2.1478531263736264e-302,2.097903076923077e-302,2.0479530274725276e-302,1.998002978021978e-302,1.9480529285714286e-302,1.8981028791208793e-302,1.8481528296703296e-302,1.79820278021978e-302,1.7482527307692305e-302,1.6983026813186815e-302,1.648352631868132e-302,1.5984025824175825e-302,1.548452532967033e-302,1.4985024835164835e-302,1.448552434065934e-302,1.3986023846153845e-302,1.3486523351648352e-302,1.2987022857142857e-302,1.2487522362637364e-302,1.198802186813187e-302,1.1488521373626374e-302,1.0989020879120879e-302,1.0489520384615385e-302,9.99001989010989e-303,9.490519395604396e-303,8.991018901098901e-303,8.491518406593407e-303,7.992017912087912e-303,7.492517417582418e-303,6.993016923076923e-303,6.493516428571428e-303,5.994015934065934e-303,5.494515439560439e-303,4.9950149450549454e-303,4.49551445054945e-303,3.9960139560439565e-303,3.4965134615384614e-303,2.9970129670329675e-303,2.4975124725274724e-303,1.998011978021978e-303,1.4985114835164835e-303,9.990109890109891e-304,4.995104945054945e-304,1.0e-308],"x":[1.0e-300,9.995004995054944e-301,9.99000999010989e-301,9.985014985164834e-301,9.980019980219781e-301,9.975024975274727e-301,9.97002997032967e-301,9.965034965384617e-301,9.960039960439559e-301,9.955044955494506e-301,9.950049950549451e-301,9.945054945604395e-301,9.940059940659342e-301,9.935064935714285e-301,9.930069930769232e-301,9.925074925824176e-301,9.920079920879121e-301,9.915084915934066e-301,9.91008991098901e-301,9.905094906043957e-301,9.9000999010989e-301,9.895104896153846e-301,9.890109891208793e-301,9.885114886263736e-301,9.880119881318683e-301,9.875124876373627e-301,9.870129871428572e-301,9.865134866483516e-301,9.86013986153846e-301,9.855144856593408e-301,9.850149851648351e-301,9.845154846703298e-301,9.840159841758242e-301,9.835164836813187e-301,9.830169831868134e-301,9.825174826923076e-301,9.820179821978023e-301,9.815184817032966e-301,9.810189812087912e-301,9.805194807142857e-301,9.800199802197802e-301,9.795204797252749e-301,9.790209792307693e-301,9.785214787362638e-301,9.780219782417583e-301,9.775224777472527e-301,9.770229772527474e-301,9.765234767582417e-301,9.760239762637363e-301,9.755244757692308e-301,9.750249752747253e-301,9.745254747802198e-301,9.740259742857144e-301,9.735264737912089e-301,9.730269732967032e-301,9.725274728021978e-301,9.720279723076923e-301,9.715284718131868e-301,9.710289713186812e-301,9.705294708241759e-301,9.700299703296704e-301,9.69530469835165e-301,9.690309693406595e-301,9.685314688461536e-301,9.680319683516483e-301,9.675324678571429e-301,9.670329673626374e-301,9.665334668681319e-301,9.660339663736263e-301,9.65534465879121e-301,9.650349653846153e-301,9.6453546489011e-301,9.640359643956045e-301,9.635364639010989e-301,9.630369634065934e-301,9.625374629120878e-301,9.620379624175825e-301,9.61538461923077e-301,9.610389614285715e-301,9.60539460934066e-301,9.600399604395604e-301,9.595404599450551e-301,9.590409594505493e-301,9.58541458956044e-301,9.580419584615385e-301,9.575424579670329e-301,9.570429574725276e-301,9.56543456978022e-301,9.560439564835166e-301,9.555444559890111e-301,9.550449554945055e-301,9.545454550000002e-301,9.540459545054944e-301,9.53546454010989e-301,9.530469535164834e-301,9.52547453021978e-301,9.520479525274727e-301,9.51548452032967e-301,9.510489515384617e-301,9.50549451043956e-301,9.500499505494506e-301,9.49550450054945e-301,9.490509495604395e-301,9.485514490659342e-301,9.480519485714285e-301,9.47552448076923e-301,9.470529475824176e-301,9.465534470879121e-301,9.460539465934068e-301,9.455544460989012e-301,9.450549456043955e-301,9.4455544510989e-301,9.440559446153846e-301,9.435564441208791e-301,9.430569436263736e-301,9.425574431318681e-301,9.420579426373627e-301,9.415584421428572e-301,9.410589416483517e-301,9.405594411538461e-301,9.400599406593408e-301,9.395604401648351e-301,9.390609396703297e-301,9.385614391758242e-301,9.380619386813187e-301,9.375624381868132e-301,9.370629376923078e-301,9.365634371978023e-301,9.360639367032968e-301,9.355644362087912e-301,9.350649357142857e-301,9.345654352197802e-301,9.340659347252748e-301,9.335664342307693e-301,9.330669337362638e-301,9.325674332417583e-301,9.320679327472529e-301,9.315684322527472e-301,9.310689317582417e-301,9.305694312637363e-301,9.300699307692308e-301,9.295704302747253e-301,9.290709297802197e-301,9.285714292857144e-301,9.280719287912087e-301,9.275724282967034e-301,9.27072927802198e-301,9.265734273076921e-301,9.260739268131868e-301,9.255744263186812e-301,9.250749258241759e-301,9.245754253296704e-301,9.240759248351648e-301,9.235764243406595e-301,9.230769238461538e-301,9.225774233516485e-301,9.220779228571429e-301,9.215784223626372e-301,9.21078921868132e-301,9.205794213736263e-301,9.20079920879121e-301,9.195804203846153e-301,9.1908091989011e-301,9.185814193956045e-301,9.180819189010989e-301,9.175824184065936e-301,9.170829179120878e-301,9.165834174175825e-301,9.160839169230768e-301,9.155844164285714e-301,9.15084915934066e-301,9.145854154395604e-301,9.140859149450551e-301,9.135864144505495e-301,9.13086913956044e-301,9.125874134615387e-301,9.120879129670329e-301,9.115884124725276e-301,9.11088911978022e-301,9.105894114835165e-301,9.10089910989011e-301,9.095904104945055e-301,9.090909100000002e-301,9.085914095054946e-301,9.080919090109891e-301,9.075924085164834e-301,9.07092908021978e-301,9.065934075274725e-301,9.06093907032967e-301,9.055944065384616e-301,9.05094906043956e-301,9.045954055494506e-301,9.040959050549451e-301,9.035964045604397e-301,9.03096904065934e-301,9.025974035714285e-301,9.02097903076923e-301,9.015984025824176e-301,9.010989020879121e-301,9.005994015934065e-301,9.000999010989012e-301,8.996004006043957e-301,8.991009001098902e-301,8.986013996153846e-301,8.98101899120879e-301,8.976023986263736e-301,8.971028981318682e-301,8.966033976373627e-301,8.961038971428572e-301,8.956043966483517e-301,8.951048961538463e-301,8.946053956593406e-301,8.941058951648353e-301,8.936063946703297e-301,8.931068941758242e-301,8.926073936813187e-301,8.92107893186813e-301,8.916083926923078e-301,8.911088921978023e-301,8.906093917032968e-301,8.901098912087913e-301,8.896103907142857e-301,8.891108902197802e-301,8.886113897252746e-301,8.881118892307693e-301,8.876123887362638e-301,8.871128882417582e-301,8.866133877472529e-301,8.861138872527472e-301,8.856143867582419e-301,8.851148862637364e-301,8.846153857692306e-301,8.841158852747253e-301,8.836163847802197e-301,8.831168842857144e-301,8.826173837912087e-301,8.821178832967033e-301,8.81618382802198e-301,8.811188823076923e-301,8.80619381813187e-301,8.801198813186814e-301,8.796203808241757e-301,8.791208803296702e-301,8.786213798351648e-301,8.781218793406595e-301,8.776223788461538e-301,8.771228783516483e-301,8.766233778571429e-301,8.761238773626374e-301,8.756243768681321e-301,8.751248763736263e-301,8.746253758791208e-301,8.741258753846153e-301,8.736263748901099e-301,8.731268743956044e-301,8.726273739010989e-301,8.721278734065936e-301,8.71628372912088e-301,8.711288724175825e-301,8.706293719230769e-301,8.701298714285714e-301,8.69630370934066e-301,8.691308704395604e-301,8.68631369945055e-301,8.681318694505495e-301,8.67632368956044e-301,8.671328684615385e-301,8.66633367967033e-301,8.661338674725276e-301,8.65634366978022e-301,8.651348664835165e-301,8.64635365989011e-301,8.641358654945055e-301,8.63636365e-301,8.631368645054946e-301,8.626373640109891e-301,8.621378635164836e-301,8.616383630219781e-301,8.611388625274723e-301,8.60639362032967e-301,8.601398615384616e-301,8.59640361043956e-301,8.591408605494506e-301,8.58641360054945e-301,8.581418595604397e-301,8.57642359065934e-301,8.571428585714287e-301,8.56643358076923e-301,8.561438575824174e-301,8.556443570879121e-301,8.551448565934065e-301,8.546453560989012e-301,8.541458556043957e-301,8.5364635510989e-301,8.531468546153847e-301,8.526473541208791e-301,8.521478536263738e-301,8.51648353131868e-301,8.511488526373625e-301,8.506493521428572e-301,8.501498516483516e-301,8.496503511538463e-301,8.491508506593406e-301,8.486513501648353e-301,8.481518496703298e-301,8.476523491758242e-301,8.471528486813187e-301,8.466533481868131e-301,8.461538476923078e-301,8.456543471978021e-301,8.451548467032967e-301,8.446553462087914e-301,8.441558457142857e-301,8.436563452197804e-301,8.431568447252748e-301,8.426573442307691e-301,8.421578437362638e-301,8.416583432417582e-301,8.411588427472529e-301,8.406593422527472e-301,8.401598417582418e-301,8.396603412637363e-301,8.391608407692308e-301,8.386613402747255e-301,8.381618397802199e-301,8.376623392857142e-301,8.371628387912087e-301,8.366633382967033e-301,8.361638378021978e-301,8.356643373076923e-301,8.351648368131868e-301,8.346653363186814e-301,8.341658358241759e-301,8.336663353296704e-301,8.331668348351648e-301,8.326673343406593e-301,8.321678338461538e-301,8.316683333516484e-301,8.311688328571429e-301,8.306693323626374e-301,8.301698318681318e-301,8.296703313736265e-301,8.29170830879121e-301,8.286713303846153e-301,8.281718298901099e-301,8.276723293956042e-301,8.27172828901099e-301,8.266733284065934e-301,8.26173827912088e-301,8.256743274175825e-301,8.25174826923077e-301,8.246753264285715e-301,8.241758259340657e-301,8.236763254395604e-301,8.23176824945055e-301,8.226773244505495e-301,8.22177823956044e-301,8.216783234615384e-301,8.21178822967033e-301,8.206793224725276e-301,8.201798219780221e-301,8.196803214835166e-301,8.191808209890108e-301,8.186813204945055e-301,8.181818199999999e-301,8.176823195054946e-301,8.171828190109891e-301,8.166833185164835e-301,8.161838180219782e-301,8.156843175274725e-301,8.151848170329672e-301,8.146853165384616e-301,8.14185816043956e-301,8.136863155494506e-301,8.13186815054945e-301,8.126873145604397e-301,8.12187814065934e-301,8.116883135714286e-301,8.111888130769232e-301,8.106893125824176e-301,8.101898120879123e-301,8.096903115934065e-301,8.09190811098901e-301,8.086913106043955e-301,8.0819181010989e-301,8.076923096153848e-301,8.071928091208791e-301,8.066933086263736e-301,8.061938081318682e-301,8.056943076373627e-301,8.051948071428572e-301,8.046953066483516e-301,8.041958061538461e-301,8.036963056593406e-301,8.031968051648352e-301,8.026973046703297e-301,8.021978041758242e-301,8.016983036813189e-301,8.011988031868133e-301,8.006993026923076e-301,8.001998021978021e-301,7.997003017032967e-301,7.992008012087914e-301,7.987013007142857e-301,7.982018002197802e-301,7.977022997252748e-301,7.972027992307693e-301,7.967032987362638e-301,7.962037982417583e-301,7.957042977472527e-301,7.952047972527472e-301,7.947052967582418e-301,7.942057962637363e-301,7.937062957692308e-301,7.932067952747253e-301,7.927072947802199e-301,7.922077942857144e-301,7.917082937912089e-301,7.912087932967033e-301,7.907092928021976e-301,7.902097923076923e-301,7.897102918131868e-301,7.892107913186814e-301,7.887112908241759e-301,7.882117903296703e-301,7.87712289835165e-301,7.872127893406593e-301,7.867132888461538e-301,7.862137883516484e-301,7.857142878571427e-301,7.852147873626374e-301,7.847152868681318e-301,7.842157863736265e-301,7.83716285879121e-301,7.832167853846153e-301,7.8271728489011e-301,7.822177843956042e-301,7.81718283901099e-301,7.812187834065933e-301,7.807192829120878e-301,7.802197824175825e-301,7.797202819230769e-301,7.792207814285716e-301,7.787212809340659e-301,7.782217804395606e-301,7.777222799450551e-301,7.772227794505493e-301,7.76723278956044e-301,7.762237784615384e-301,7.75724277967033e-301,7.752247774725274e-301,7.74725276978022e-301,7.742257764835166e-301,7.73726275989011e-301,7.732267754945057e-301,7.727272749999999e-301,7.722277745054944e-301,7.717282740109891e-301,7.712287735164835e-301,7.707292730219782e-301,7.702297725274725e-301,7.69730272032967e-301,7.692307715384616e-301,7.687312710439561e-301,7.682317705494508e-301,7.67732270054945e-301,7.672327695604395e-301,7.66733269065934e-301,7.662337685714286e-301,7.65734268076923e-301,7.652347675824176e-301,7.647352670879121e-301,7.642357665934067e-301,7.637362660989012e-301,7.632367656043955e-301,7.6273726510989e-301,7.622377646153846e-301,7.617382641208791e-301,7.612387636263736e-301,7.607392631318682e-301,7.602397626373627e-301,7.597402621428572e-301,7.592407616483517e-301,7.587412611538461e-301,7.582417606593406e-301,7.577422601648352e-301,7.572427596703297e-301,7.567432591758242e-301,7.562437586813187e-301,7.557442581868131e-301,7.552447576923076e-301,7.547452571978023e-301,7.542457567032968e-301,7.537462562087912e-301,7.532467557142857e-301,7.527472552197803e-301,7.522477547252748e-301,7.517482542307693e-301,7.512487537362638e-301,7.507492532417584e-301,7.502497527472527e-301,7.497502522527472e-301,7.492507517582418e-301,7.487512512637363e-301,7.482517507692308e-301,7.477522502747253e-301,7.472527497802197e-301,7.467532492857142e-301,7.462537487912088e-301,7.457542482967034e-301,7.452547478021978e-301,7.447552473076923e-301,7.4425574681318685e-301,7.437562463186813e-301,7.432567458241758e-301,7.427572453296703e-301,7.422577448351649e-301,7.417582443406594e-301,7.4125874384615384e-301,7.407592433516484e-301,7.402597428571428e-301,7.397602423626373e-301,7.3926074186813194e-301,7.387612413736264e-301,7.382617408791209e-301,7.377622403846154e-301,7.372627398901099e-301,7.367632393956043e-301,7.362637389010989e-301,7.3576423840659346e-301,7.35264737912088e-301,7.347652374175824e-301,7.342657369230769e-301,7.337662364285714e-301,7.33266735934066e-301,7.327672354395605e-301,7.32267734945055e-301,7.317682344505494e-301,7.312687339560439e-301,7.307692334615385e-301,7.302697329670331e-301,7.297702324725274e-301,7.29270731978022e-301,7.287712314835165e-301,7.28271730989011e-301,7.277722304945055e-301,7.272727300000001e-301,7.267732295054945e-301,7.26273729010989e-301,7.2577422851648356e-301,7.252747280219781e-301,7.247752275274725e-301,7.2427572703296705e-301,7.237762265384616e-301,7.232767260439561e-301,7.2277722554945054e-301,7.222777250549451e-301,7.217782245604395e-301,7.212787240659341e-301,7.2077922357142865e-301,7.202797230769231e-301,7.197802225824176e-301,7.1928072208791206e-301,7.187812215934066e-301,7.182817210989011e-301,7.177822206043956e-301,7.172827201098902e-301,7.167832196153847e-301,7.162837191208791e-301,7.157842186263736e-301,7.152847181318681e-301,7.147852176373627e-301,7.142857171428572e-301,7.137862166483517e-301,7.132867161538461e-301,7.127872156593406e-301,7.122877151648352e-301,7.117882146703298e-301,7.112887141758242e-301,7.107892136813187e-301,7.102897131868132e-301,7.097902126923077e-301,7.092907121978022e-301,7.087912117032967e-301,7.082917112087912e-301,7.077922107142857e-301,7.0729271021978026e-301,7.067932097252748e-301,7.0629370923076914e-301,7.0579420873626375e-301,7.052947082417583e-301,7.047952077472528e-301,7.042957072527473e-301,7.037962067582418e-301,7.032967062637362e-301,7.027972057692308e-301,7.0229770527472535e-301,7.017982047802198e-301,7.012987042857143e-301,7.0079920379120876e-301,7.002997032967033e-301,6.998002028021979e-301,6.993007023076923e-301,6.988012018131869e-301,6.983017013186813e-301,6.978022008241758e-301,6.9730270032967035e-301,6.968031998351648e-301,6.963036993406594e-301,6.9580419884615385e-301,6.953046983516484e-301,6.948051978571428e-301,6.9430569736263734e-301,6.938061968681319e-301,6.933066963736265e-301,6.928071958791209e-301,6.923076953846154e-301,6.918081948901099e-301,6.913086943956044e-301,6.908091939010989e-301,6.903096934065935e-301,6.898101929120879e-301,6.893106924175824e-301,6.8881119192307696e-301,6.883116914285715e-301,6.8781219093406584e-301,6.8731269043956045e-301,6.86813189945055e-301,6.863136894505495e-301,6.85814188956044e-301,6.853146884615384e-301,6.848151879670329e-301,6.843156874725275e-301,6.8381618697802205e-301,6.833166864835166e-301,6.828171859890109e-301,6.823176854945055e-301,6.81818185e-301,6.813186845054946e-301,6.80819184010989e-301,6.803196835164836e-301,6.79820183021978e-301,6.793206825274725e-301,6.7882118203296705e-301,6.783216815384616e-301,6.778221810439561e-301,6.7732268054945055e-301,6.768231800549451e-301,6.763236795604396e-301,6.7582417906593404e-301,6.7532467857142865e-301,6.748251780769231e-301,6.743256775824176e-301,6.738261770879121e-301,6.733266765934066e-301,6.728271760989011e-301,6.7232767560439556e-301,6.718281751098902e-301,6.713286746153846e-301,6.708291741208791e-301,6.703296736263737e-301,6.698301731318682e-301,6.693306726373626e-301,6.6883117214285715e-301,6.683316716483517e-301,6.678321711538462e-301,6.673326706593407e-301,6.668331701648351e-301,6.663336696703296e-301,6.658341691758242e-301,6.6533466868131875e-301,6.648351681868133e-301,6.643356676923076e-301,6.638361671978022e-301,6.633366667032967e-301,6.628371662087913e-301,6.623376657142858e-301,6.618381652197802e-301,6.613386647252747e-301,6.608391642307692e-301,6.6033966373626376e-301,6.598401632417583e-301,6.593406627472527e-301,6.5884116225274725e-301,6.583416617582418e-301,6.578421612637363e-301,6.5734266076923074e-301,6.5684316027472535e-301,6.563436597802198e-301,6.558441592857143e-301,6.5534465879120885e-301,6.548451582967033e-301,6.543456578021978e-301,6.538461573076923e-301,6.533466568131869e-301,6.528471563186813e-301,6.523476558241758e-301,6.518481553296704e-301,6.513486548351648e-301,6.508491543406593e-301,6.5034965384615385e-301,6.498501533516484e-301,6.493506528571429e-301,6.4885115236263735e-301,6.483516518681319e-301,6.478521513736263e-301,6.473526508791209e-301,6.4685315038461545e-301,6.4635364989011e-301,6.458541493956043e-301,6.453546489010989e-301,6.448551484065934e-301,6.44355647912088e-301,6.438561474175825e-301,6.433566469230769e-301,6.428571464285714e-301,6.423576459340659e-301,6.4185814543956046e-301,6.413586449450551e-301,6.408591444505494e-301,6.4035964395604395e-301,6.398601434615385e-301,6.39360642967033e-301,6.3886114247252745e-301,6.38361641978022e-301,6.378621414835165e-301,6.37362640989011e-301,6.3686314049450555e-301,6.3636364e-301,6.358641395054945e-301,6.3536463901098904e-301,6.348651385164836e-301,6.343656380219781e-301,6.338661375274725e-301,6.333666370329671e-301,6.328671365384615e-301,6.323676360439561e-301,6.3186813554945055e-301,6.313686350549451e-301,6.308691345604396e-301,6.3036963406593405e-301,6.298701335714286e-301,6.293706330769231e-301,6.288711325824176e-301,6.2837163208791215e-301,6.278721315934066e-301,6.273726310989011e-301,6.268731306043956e-301,6.263736301098901e-301,6.258741296153847e-301,6.253746291208791e-301,6.248751286263736e-301,6.243756281318681e-301,6.238761276373626e-301,6.2337662714285716e-301,6.228771266483518e-301,6.223776261538461e-301,6.2187812565934065e-301,6.213786251648352e-301,6.208791246703297e-301,6.203796241758242e-301,6.198801236813187e-301,6.193806231868132e-301,6.188811226923077e-301,6.1838162219780225e-301,6.178821217032967e-301,6.173826212087911e-301,6.1688312071428574e-301,6.163836202197803e-301,6.158841197252748e-301,6.153846192307692e-301,6.148851187362637e-301,6.143856182417582e-301,6.138861177472528e-301,6.133866172527473e-301,6.128871167582418e-301,6.123876162637363e-301,6.1188811576923075e-301,6.113886152747253e-301,6.108891147802198e-301,6.103896142857143e-301,6.0989011379120885e-301,6.093906132967033e-301,6.088911128021978e-301,6.083916123076923e-301,6.078921118131869e-301,6.073926113186814e-301,6.068931108241758e-301,6.063936103296704e-301,6.058941098351648e-301,6.053946093406593e-301,6.0489510884615394e-301,6.043956083516484e-301,6.038961078571428e-301,6.0339660736263735e-301,6.028971068681319e-301,6.023976063736264e-301,6.0189810587912085e-301,6.013986053846154e-301,6.008991048901099e-301,6.003996043956044e-301,5.9990010390109895e-301,5.994006034065935e-301,5.989011029120878e-301,5.9840160241758244e-301,5.97902101923077e-301,5.974026014285715e-301,5.969031009340659e-301,5.964036004395604e-301,5.959040999450549e-301,5.954045994505495e-301,5.94905098956044e-301,5.944055984615385e-301,5.939060979670329e-301,5.9340659747252745e-301,5.92907096978022e-301,5.924075964835166e-301,5.91908095989011e-301,5.914085954945055e-301,5.90909095e-301,5.904095945054945e-301,5.89910094010989e-301,5.894105935164836e-301,5.889110930219781e-301,5.884115925274725e-301,5.879120920329671e-301,5.874125915384615e-301,5.86913091043956e-301,5.8641359054945064e-301,5.859140900549451e-301,5.854145895604396e-301,5.8491508906593405e-301,5.844155885714286e-301,5.839160880769231e-301,5.834165875824176e-301,5.829170870879121e-301,5.824175865934066e-301,5.819180860989011e-301,5.8141858560439565e-301,5.809190851098901e-301,5.804195846153845e-301,5.7992008412087915e-301,5.794205836263737e-301,5.789210831318682e-301,5.7842158263736256e-301,5.779220821428571e-301,5.774225816483516e-301,5.769230811538462e-301,5.764235806593407e-301,5.759240801648352e-301,5.754245796703296e-301,5.7492507917582415e-301,5.744255786813187e-301,5.739260781868133e-301,5.734265776923077e-301,5.729270771978022e-301,5.724275767032967e-301,5.719280762087912e-301,5.7142857571428575e-301,5.709290752197803e-301,5.704295747252747e-301,5.6993007423076924e-301,5.694305737362638e-301,5.689310732417582e-301,5.684315727472527e-301,5.679320722527473e-301,5.674325717582418e-301,5.669330712637363e-301,5.6643357076923076e-301,5.659340702747253e-301,5.654345697802198e-301,5.649350692857143e-301,5.6443556879120886e-301,5.639360682967033e-301,5.634365678021978e-301,5.6293706730769235e-301,5.624375668131868e-301,5.619380663186813e-301,5.6143856582417585e-301,5.609390653296704e-301,5.604395648351649e-301,5.599400643406593e-301,5.594405638461538e-301,5.589410633516484e-301,5.584415628571429e-301,5.5794206236263744e-301,5.574425618681318e-301,5.569430613736263e-301,5.5644356087912085e-301,5.559440603846154e-301,5.5544455989011e-301,5.549450593956044e-301,5.544455589010989e-301,5.539460584065934e-301,5.534465579120879e-301,5.5294705741758245e-301,5.52447556923077e-301,5.519480564285714e-301,5.5144855593406594e-301,5.509490554395605e-301,5.50449554945055e-301,5.499500544505494e-301,5.49450553956044e-301,5.489510534615385e-301,5.48451552967033e-301,5.4795205247252746e-301,5.47452551978022e-301,5.469530514835164e-301,5.46453550989011e-301,5.459540504945056e-301,5.4545455e-301,5.449550495054945e-301,5.44455549010989e-301,5.439560485164835e-301,5.434565480219781e-301,5.4295704752747255e-301,5.424575470329671e-301,5.419580465384616e-301,5.41458546043956e-301,5.409590455494505e-301,5.404595450549451e-301,5.399600445604396e-301,5.3946054406593414e-301,5.389610435714286e-301,5.38461543076923e-301,5.3796204258241755e-301,5.374625420879122e-301,5.369630415934067e-301,5.3646354109890105e-301,5.359640406043956e-301,5.354645401098901e-301,5.349650396153846e-301,5.3446553912087915e-301,5.339660386263736e-301,5.334665381318681e-301,5.3296703763736264e-301,5.324675371428572e-301,5.319680366483517e-301,5.314685361538461e-301,5.309690356593407e-301,5.304695351648352e-301,5.299700346703297e-301,5.294705341758242e-301,5.289710336813187e-301,5.284715331868131e-301,5.279720326923077e-301,5.274725321978023e-301,5.269730317032967e-301,5.264735312087912e-301,5.259740307142857e-301,5.254745302197802e-301,5.249750297252748e-301,5.2447552923076925e-301,5.239760287362638e-301,5.234765282417582e-301,5.2297702774725274e-301,5.224775272527472e-301,5.219780267582418e-301,5.214785262637363e-301,5.209790257692308e-301,5.204795252747253e-301,5.199800247802197e-301,5.1948052428571426e-301,5.189810237912089e-301,5.184815232967034e-301,5.179820228021978e-301,5.174825223076923e-301,5.169830218131868e-301,5.164835213186813e-301,5.159840208241759e-301,5.154845203296703e-301,5.149850198351648e-301,5.1448551934065935e-301,5.139860188461539e-301,5.134865183516484e-301,5.129870178571428e-301,5.124875173626374e-301,5.119880168681319e-301,5.114885163736264e-301,5.1098901587912094e-301,5.104895153846153e-301,5.099900148901098e-301,5.094905143956044e-301,5.08991013901099e-301,5.084915134065935e-301,5.079920129120879e-301,5.074925124175824e-301,5.069930119230769e-301,5.064935114285715e-301,5.0599401093406595e-301,5.054945104395605e-301,5.049950099450549e-301,5.0449550945054944e-301,5.03996008956044e-301,5.034965084615385e-301,5.02997007967033e-301,5.024975074725275e-301,5.01998006978022e-301,5.014985064835164e-301,5.0099900598901096e-301,5.004995054945056e-301,5.00000005e-301,4.995005045054945e-301,4.99001004010989e-301,4.985015035164835e-301,4.98002003021978e-301,4.9750250252747255e-301,4.970030020329671e-301,4.965035015384615e-301,4.9600400104395605e-301,4.955045005494506e-301,4.950050000549451e-301,4.945054995604395e-301,4.940059990659341e-301,4.935064985714286e-301,4.930069980769231e-301,4.9250749758241764e-301,4.92007997087912e-301,4.915084965934066e-301,4.910089960989011e-301,4.905094956043957e-301,4.900099951098902e-301,4.8951049461538455e-301,4.890109941208791e-301,4.885114936263737e-301,4.880119931318682e-301,4.8751249263736265e-301,4.870129921428571e-301,4.865134916483516e-301,4.8601399115384614e-301,4.855144906593407e-301,4.850149901648352e-301,4.845154896703297e-301,4.840159891758242e-301,4.835164886813187e-301,4.830169881868132e-301,4.8251748769230766e-301,4.820179871978023e-301,4.815184867032967e-301,4.810189862087912e-301,4.805194857142857e-301,4.800199852197802e-301,4.795204847252747e-301,4.7902098423076925e-301,4.785214837362638e-301,4.780219832417582e-301,4.7752248274725275e-301,4.770229822527473e-301,4.765234817582417e-301,4.760239812637363e-301,4.755244807692308e-301,4.750249802747253e-301,4.745254797802198e-301,4.7402597928571434e-301,4.735264787912087e-301,4.730269782967033e-301,4.725274778021978e-301,4.720279773076924e-301,4.715284768131869e-301,4.7102897631868125e-301,4.705294758241758e-301,4.700299753296704e-301,4.695304748351649e-301,4.690309743406594e-301,4.685314738461538e-301,4.680319733516483e-301,4.6753247285714285e-301,4.6703297236263745e-301,4.665334718681319e-301,4.660339713736263e-301,4.655344708791209e-301,4.650349703846154e-301,4.645354698901099e-301,4.640359693956044e-301,4.635364689010989e-301,4.630369684065934e-301,4.625374679120879e-301,4.620379674175825e-301,4.615384669230769e-301,4.610389664285714e-301,4.6053946593406596e-301,4.600399654395605e-301,4.595404649450549e-301,4.5904096445054945e-301,4.58541463956044e-301,4.580419634615384e-301,4.57542462967033e-301,4.570429624725275e-301,4.56543461978022e-301,4.560439614835165e-301,4.55544460989011e-301,4.550449604945055e-301,4.5454546e-301,4.540459595054945e-301,4.535464590109891e-301,4.530469585164835e-301,4.5254745802197795e-301,4.520479575274725e-301,4.515484570329671e-301,4.510489565384616e-301,4.505494560439561e-301,4.500499555494505e-301,4.49550455054945e-301,4.4905095456043955e-301,4.4855145406593416e-301,4.480519535714287e-301,4.47552453076923e-301,4.470529525824176e-301,4.465534520879121e-301,4.460539515934066e-301,4.4555445109890114e-301,4.450549506043956e-301,4.445554501098901e-301,4.440559496153846e-301,4.435564491208792e-301,4.430569486263736e-301,4.425574481318681e-301,4.4205794763736266e-301,4.415584471428572e-301,4.410589466483517e-301,4.4055944615384615e-301,4.400599456593406e-301,4.395604451648351e-301,4.390609446703297e-301,4.385614441758242e-301,4.380619436813187e-301,4.375624431868132e-301,4.370629426923077e-301,4.365634421978022e-301,4.360639417032967e-301,4.355644412087912e-301,4.350649407142858e-301,4.345654402197802e-301,4.340659397252747e-301,4.335664392307692e-301,4.330669387362638e-301,4.325674382417583e-301,4.3206793774725275e-301,4.315684372527472e-301,4.310689367582417e-301,4.3056943626373625e-301,4.3006993576923086e-301,4.295704352747253e-301,4.2907093478021974e-301,4.285714342857143e-301,4.280719337912088e-301,4.275724332967033e-301,4.270729328021979e-301,4.265734323076923e-301,4.260739318131868e-301,4.255744313186813e-301,4.250749308241759e-301,4.245754303296703e-301,4.240759298351648e-301,4.2357642934065936e-301,4.230769288461539e-301,4.225774283516484e-301,4.2207792785714285e-301,4.215784273626373e-301,4.210789268681319e-301,4.205794263736264e-301,4.2007992587912095e-301,4.195804253846154e-301,4.190809248901098e-301,4.185814243956044e-301,4.180819239010989e-301,4.175824234065934e-301,4.1708292291208794e-301,4.165834224175824e-301,4.160839219230769e-301,4.155844214285714e-301,4.150849209340659e-301,4.145854204395605e-301,4.14085919945055e-301,4.1358641945054946e-301,4.13086918956044e-301,4.125874184615384e-301,4.1208791796703295e-301,4.1158841747252756e-301,4.11088916978022e-301,4.1058941648351644e-301,4.10089915989011e-301,4.095904154945055e-301,4.09090915e-301,4.0859141450549455e-301,4.08091914010989e-301,4.075924135164835e-301,4.07092913021978e-301,4.065934125274726e-301,4.06093912032967e-301,4.055944115384615e-301,4.050949110439561e-301,4.045954105494506e-301,4.040959100549451e-301,4.0359640956043955e-301,4.03096909065934e-301,4.025974085714286e-301,4.020979080769231e-301,4.0159840758241766e-301,4.010989070879121e-301,4.005994065934065e-301,4.000999060989011e-301,3.996004056043957e-301,3.991009051098902e-301,3.9860140461538464e-301,3.981019041208791e-301,3.976024036263736e-301,3.971029031318681e-301,3.966034026373627e-301,3.961039021428572e-301,3.956044016483516e-301,3.9510490115384616e-301,3.946054006593407e-301,3.941059001648351e-301,3.9360639967032965e-301,3.931068991758243e-301,3.926073986813187e-301,3.921078981868132e-301,3.916083976923077e-301,3.911088971978022e-301,3.906093967032967e-301,3.9010989620879125e-301,3.896103957142857e-301,3.891108952197802e-301,3.886113947252747e-301,3.881118942307693e-301,3.876123937362637e-301,3.871128932417582e-301,3.866133927472528e-301,3.861138922527473e-301,3.856143917582418e-301,3.8511489126373625e-301,3.846153907692307e-301,3.841158902747253e-301,3.836163897802198e-301,3.8311688928571436e-301,3.826173887912087e-301,3.8211788829670324e-301,3.8161838780219785e-301,3.811188873076923e-301,3.806193868131868e-301,3.8011988631868134e-301,3.796203858241759e-301,3.791208853296703e-301,3.786213848351648e-301,3.781218843406594e-301,3.776223838461538e-301,3.771228833516484e-301,3.7662338285714286e-301,3.761238823626374e-301,3.756243818681319e-301,3.7512488137362635e-301,3.746253808791209e-301,3.741258803846154e-301,3.736263798901099e-301,3.731268793956044e-301,3.726273789010989e-301,3.7212787840659342e-301,3.716283779120879e-301,3.7112887741758243e-301,3.7062937692307696e-301,3.701298764285714e-301,3.6963037593406597e-301,3.6913087543956045e-301,3.6863137494505494e-301,3.6813187445054946e-301,3.6763237395604395e-301,3.6713287346153847e-301,3.66633372967033e-301,3.661338724725275e-301,3.6563437197802197e-301,3.6513487148351653e-301,3.6463537098901098e-301,3.641358704945055e-301,3.6363637000000003e-301,3.631368695054945e-301,3.6263736901098904e-301,3.621378685164835e-301,3.6163836802197805e-301,3.6113886752747253e-301,3.6063936703296706e-301,3.601398665384616e-301,3.5964036604395602e-301,3.5914086554945055e-301,3.5864136505494508e-301,3.5814186456043956e-301,3.5764236406593404e-301,3.5714286357142857e-301,3.566433630769231e-301,3.5614386258241758e-301,3.556443620879121e-301,3.551448615934066e-301,3.546453610989011e-301,3.541458606043956e-301,3.5364636010989012e-301,3.531468596153846e-301,3.5264735912087913e-301,3.5214785862637366e-301,3.516483581318681e-301,3.5114885763736267e-301,3.506493571428571e-301,3.5014985664835164e-301,3.496503561538462e-301,3.4915085565934065e-301,3.4865135516483517e-301,3.481518546703297e-301,3.476523541758242e-301,3.4715285368131867e-301,3.466533531868132e-301,3.461538526923077e-301,3.456543521978022e-301,3.4515485170329673e-301,3.446553512087912e-301,3.441558507142857e-301,3.4365635021978022e-301,3.4315684972527475e-301,3.4265734923076923e-301,3.4215784873626376e-301,3.416583482417583e-301,3.4115884774725273e-301,3.406593472527473e-301,3.4015984675824173e-301,3.3966034626373626e-301,3.3916084576923083e-301,3.3866134527472527e-301,3.381618447802198e-301,3.3766234428571432e-301,3.371628437912088e-301,3.366633432967033e-301,3.3616384280219777e-301,3.3566434230769234e-301,3.3516484181318683e-301,3.346653413186813e-301,3.3416584082417583e-301,3.336663403296703e-301,3.331668398351648e-301,3.3266733934065937e-301,3.3216783884615385e-301,3.3166833835164834e-301,3.311688378571429e-301,3.3066933736263735e-301,3.3016983686813187e-301,3.2967033637362636e-301,3.291708358791209e-301,3.286713353846154e-301,3.281718348901099e-301,3.276723343956044e-301,3.2717283390109886e-301,3.2667333340659343e-301,3.261738329120879e-301,3.256743324175824e-301,3.2517483192307696e-301,3.2467533142857145e-301,3.2417583093406593e-301,3.2367633043956046e-301,3.2317682994505494e-301,3.2267732945054943e-301,3.22177828956044e-301,3.2167832846153848e-301,3.2117882796703296e-301,3.2067932747252753e-301,3.2017982697802197e-301,3.196803264835165e-301,3.19180825989011e-301,3.186813254945055e-301,3.1818182500000003e-301,3.176823245054945e-301,3.1718282401098904e-301,3.166833235164835e-301,3.1618382302197805e-301,3.1568432252747254e-301,3.15184822032967e-301,3.146853215384616e-301,3.1418582104395607e-301,3.1368632054945056e-301,3.1318682005494504e-301,3.1268731956043957e-301,3.1218781906593405e-301,3.1168831857142858e-301,3.111888180769231e-301,3.106893175824176e-301,3.1018981708791207e-301,3.096903165934066e-301,3.091908160989011e-301,3.0869131560439556e-301,3.0819181510989013e-301,3.0769231461538466e-301,3.071928141208791e-301,3.0669331362637367e-301,3.061938131318681e-301,3.0569431263736263e-301,3.0519481214285716e-301,3.0469531164835164e-301,3.0419581115384617e-301,3.0369631065934065e-301,3.0319681016483518e-301,3.0269730967032966e-301,3.021978091758242e-301,3.0169830868131867e-301,3.011988081868132e-301,3.0069930769230772e-301,3.001998071978022e-301,2.997003067032967e-301,2.992008062087912e-301,2.9870130571428574e-301,2.982018052197802e-301,2.9770230472527475e-301,2.9720280423076928e-301,2.9670330373626372e-301,2.962038032417583e-301,2.9570430274725273e-301,2.9520480225274726e-301,2.947053017582418e-301,2.9420580126373627e-301,2.937063007692308e-301,2.9320680027472528e-301,2.927072997802198e-301,2.922077992857143e-301,2.917082987912088e-301,2.912087982967033e-301,2.9070929780219782e-301,2.902097973076923e-301,2.8971029681318683e-301,2.892107963186813e-301,2.887112958241758e-301,2.8821179532967037e-301,2.877122948351648e-301,2.8721279434065933e-301,2.8671329384615386e-301,2.8621379335164834e-301,2.8571429285714287e-301,2.8521479236263735e-301,2.847152918681319e-301,2.8421579137362636e-301,2.837162908791209e-301,2.832167903846154e-301,2.8271728989010986e-301,2.8221778939560443e-301,2.817182889010989e-301,2.812187884065934e-301,2.807192879120879e-301,2.8021978741758244e-301,2.7972028692307693e-301,2.7922078642857145e-301,2.7872128593406594e-301,2.7822178543956042e-301,2.77722284945055e-301,2.7722278445054943e-301,2.7672328395604396e-301,2.762237834615385e-301,2.7572428296703297e-301,2.752247824725275e-301,2.7472528197802198e-301,2.742257814835165e-301,2.73726280989011e-301,2.732267804945055e-301,2.7272728000000004e-301,2.722277795054945e-301,2.7172827901098905e-301,2.7122877851648353e-301,2.70729278021978e-301,2.7022977752747254e-301,2.6973027703296703e-301,2.6923077653846155e-301,2.6873127604395608e-301,2.6823177554945056e-301,2.6773227505494505e-301,2.6723277456043957e-301,2.6673327406593406e-301,2.662337735714286e-301,2.6573427307692307e-301,2.652347725824176e-301,2.647352720879121e-301,2.6423577159340656e-301,2.6373627109890113e-301,2.6323677060439557e-301,2.627372701098901e-301,2.6223776961538466e-301,2.617382691208791e-301,2.6123876862637363e-301,2.6073926813186816e-301,2.6023976763736264e-301,2.5974026714285712e-301,2.5924076664835165e-301,2.5874126615384617e-301,2.5824176565934066e-301,2.577422651648352e-301,2.5724276467032967e-301,2.567432641758242e-301,2.5624376368131868e-301,2.557442631868132e-301,2.552447626923077e-301,2.547452621978022e-301,2.5424576170329674e-301,2.537462612087912e-301,2.5324676071428575e-301,2.527472602197802e-301,2.522477597252747e-301,2.517482592307693e-301,2.5124875873626373e-301,2.5074925824175825e-301,2.5024975774725278e-301,2.4975025725274726e-301,2.4925075675824175e-301,2.4875125626373627e-301,2.482517557692308e-301,2.477522552747253e-301,2.472527547802198e-301,2.467532542857143e-301,2.4625375379120878e-301,2.457542532967033e-301,2.4525475280219783e-301,2.447552523076923e-301,2.4425575181318684e-301,2.4375625131868136e-301,2.432567508241758e-301,2.4275725032967033e-301,2.422577498351648e-301,2.4175824934065934e-301,2.4125874884615387e-301,2.4075924835164835e-301,2.4025974785714288e-301,2.3976024736263736e-301,2.392607468681319e-301,2.3876124637362637e-301,2.3826174587912085e-301,2.3776224538461542e-301,2.372627448901099e-301,2.367632443956044e-301,2.362637439010989e-301,2.357642434065934e-301,2.352647429120879e-301,2.3476524241758245e-301,2.3426574192307693e-301,2.337662414285714e-301,2.33266740934066e-301,2.3276724043956043e-301,2.3226773994505495e-301,2.3176823945054944e-301,2.3126873895604396e-301,2.307692384615385e-301,2.3026973796703297e-301,2.297702374725275e-301,2.2927073697802194e-301,2.287712364835165e-301,2.28271735989011e-301,2.2777223549450548e-301,2.2727273500000004e-301,2.2677323450549453e-301,2.26273734010989e-301,2.2577423351648354e-301,2.2527473302197802e-301,2.247752325274725e-301,2.2427573203296707e-301,2.2377623153846156e-301,2.2327673104395604e-301,2.2277723054945057e-301,2.2227773005494505e-301,2.2177822956043958e-301,2.2127872906593406e-301,2.207792285714286e-301,2.202797280769231e-301,2.1978022758241756e-301,2.1928072708791212e-301,2.1878122659340657e-301,2.182817260989011e-301,2.177822256043956e-301,2.172827251098901e-301,2.1678322461538463e-301,2.1628372412087915e-301,2.1578422362637364e-301,2.152847231318681e-301,2.1478522263736265e-301,2.1428572214285713e-301,2.1378622164835166e-301,2.132867211538462e-301,2.1278722065934067e-301,2.1228772016483515e-301,2.1178821967032967e-301,2.112887191758242e-301,2.1078921868131864e-301,2.102897181868132e-301,2.0979021769230774e-301,2.0929071719780218e-301,2.0879121670329675e-301,2.082917162087912e-301,2.077922157142857e-301,2.0729271521978024e-301,2.0679321472527472e-301,2.0629371423076925e-301,2.0579421373626373e-301,2.0529471324175826e-301,2.0479521274725274e-301,2.0429571225274727e-301,2.0379621175824175e-301,2.0329671126373628e-301,2.027972107692308e-301,2.022977102747253e-301,2.0179820978021977e-301,2.012987092857143e-301,2.0079920879120882e-301,2.0029970829670327e-301,1.9980020780219783e-301,1.9930070730769236e-301,1.988012068131868e-301,1.9830170631868137e-301,1.978022058241758e-301,1.9730270532967034e-301,1.9680320483516482e-301,1.9630370434065935e-301,1.9580420384615387e-301,1.953047033516483e-301,1.948052028571429e-301,1.9430570236263737e-301,1.9380620186813185e-301,1.9330670137362638e-301,1.928072008791209e-301,1.9230770038461534e-301,1.918081998901099e-301,1.913086993956044e-301,1.9080919890109892e-301,1.903096984065934e-301,1.898101979120879e-301,1.893106974175824e-301,1.8881119692307694e-301,1.8831169642857142e-301,1.8781219593406595e-301,1.8731269543956043e-301,1.8681319494505496e-301,1.8631369445054947e-301,1.8581419395604395e-301,1.8531469346153847e-301,1.8481519296703298e-301,1.8431569247252746e-301,1.8381619197802197e-301,1.8331669148351652e-301,1.82817190989011e-301,1.823176904945055e-301,1.8181819e-301,1.813186895054945e-301,1.8081918901098902e-301,1.8031968851648352e-301,1.7982018802197803e-301,1.7932068752747253e-301,1.7882118703296704e-301,1.7832168653846154e-301,1.7782218604395605e-301,1.7732268554945053e-301,1.7682318505494506e-301,1.7632368456043958e-301,1.7582418406593407e-301,1.7532468357142857e-301,1.748251830769231e-301,1.7432568258241758e-301,1.7382618208791209e-301,1.733266815934066e-301,1.728271810989011e-301,1.7232768060439562e-301,1.7182818010989013e-301,1.7132867961538461e-301,1.7082917912087912e-301,1.7032967862637364e-301,1.6983017813186813e-301,1.6933067763736265e-301,1.6883117714285716e-301,1.6833167664835166e-301,1.6783217615384617e-301,1.6733267565934065e-301,1.6683317516483516e-301,1.6633367467032968e-301,1.6583417417582419e-301,1.653346736813187e-301,1.648351731868132e-301,1.6433567269230768e-301,1.638361721978022e-301,1.633366717032967e-301,1.628371712087912e-301,1.6233767071428572e-301,1.6183817021978025e-301,1.6133866972527473e-301,1.6083916923076923e-301,1.6033966873626374e-301,1.5984016824175824e-301,1.5934066774725275e-301,1.5884116725274727e-301,1.5834166675824176e-301,1.5784216626373626e-301,1.5734266576923079e-301,1.5684316527472527e-301,1.5634366478021978e-301,1.5584416428571426e-301,1.553446637912088e-301,1.5484516329670331e-301,1.543456628021978e-301,1.538461623076923e-301,1.5334666181318683e-301,1.5284716131868131e-301,1.5234766082417582e-301,1.5184816032967034e-301,1.5134865983516485e-301,1.5084915934065935e-301,1.5034965884615386e-301,1.4985015835164834e-301,1.4935065785714285e-301,1.4885115736263737e-301,1.4835165686813188e-301,1.4785215637362638e-301,1.4735265587912089e-301,1.468531553846154e-301,1.463536548901099e-301,1.458541543956044e-301,1.4535465390109889e-301,1.4485515340659343e-301,1.4435565291208792e-301,1.4385615241758242e-301,1.4335665192307693e-301,1.4285715142857143e-301,1.4235765093406594e-301,1.4185815043956044e-301,1.4135864994505495e-301,1.4085914945054945e-301,1.4035964895604398e-301,1.3986014846153846e-301,1.3936064796703297e-301,1.3886114747252747e-301,1.3836164697802197e-301,1.378621464835165e-301,1.37362645989011e-301,1.3686314549450549e-301,1.3636364500000002e-301,1.3586414450549452e-301,1.35364644010989e-301,1.348651435164835e-301,1.3436564302197806e-301,1.3386614252747254e-301,1.3336664203296704e-301,1.3286714153846153e-301,1.3236764104395603e-301,1.3186814054945056e-301,1.3136864005494504e-301,1.3086913956043957e-301,1.3036963906593407e-301,1.2987013857142858e-301,1.2937063807692308e-301,1.2887113758241759e-301,1.2837163708791207e-301,1.278721365934066e-301,1.2737263609890112e-301,1.268731356043956e-301,1.2637363510989011e-301,1.2587413461538464e-301,1.2537463412087912e-301,1.2487513362637363e-301,1.2437563313186813e-301,1.2387613263736262e-301,1.2337663214285716e-301,1.2287713164835167e-301,1.2237763115384615e-301,1.2187813065934066e-301,1.2137863016483516e-301,1.2087912967032967e-301,1.203796291758242e-301,1.1988012868131868e-301,1.193806281868132e-301,1.188811276923077e-301,1.183816271978022e-301,1.178821267032967e-301,1.173826262087912e-301,1.1688312571428573e-301,1.1638362521978023e-301,1.1588412472527474e-301,1.1538462423076922e-301,1.1488512373626375e-301,1.1438562324175825e-301,1.1388612274725273e-301,1.1338662225274724e-301,1.1288712175824179e-301,1.1238762126373627e-301,1.1188812076923077e-301,1.1138862027472528e-301,1.1088911978021978e-301,1.1038961928571429e-301,1.0989011879120877e-301,1.093906182967033e-301,1.088911178021978e-301,1.083916173076923e-301,1.0789211681318681e-301,1.0739261631868132e-301,1.068931158241758e-301,1.0639361532967033e-301,1.0589411483516485e-301,1.0539461434065934e-301,1.0489511384615384e-301,1.0439561335164837e-301,1.0389611285714285e-301,1.0339661236263736e-301,1.0289711186813186e-301,1.0239761137362639e-301,1.018981108791209e-301,1.013986103846154e-301,1.0089910989010988e-301,1.0039960939560439e-301,9.990010890109891e-302,9.94006084065934e-302,9.890110791208792e-302,9.84016074175824e-302,9.790210692307693e-302,9.740260642857144e-302,9.690310593406592e-302,9.640360543956043e-302,9.590410494505495e-302,9.540460445054946e-302,9.490510395604396e-302,9.440560346153847e-302,9.390610296703297e-302,9.340660247252748e-302,9.290710197802198e-302,9.240760148351649e-302,9.190810098901099e-302,9.14086004945055e-302,9.090910000000001e-302,9.04095995054945e-302,8.991009901098901e-302,8.941059851648351e-302,8.891109802197803e-302,8.841159752747252e-302,8.791209703296704e-302,8.741259653846154e-302,8.691309604395605e-302,8.641359554945054e-302,8.591409505494507e-302,8.541459456043956e-302,8.491509406593406e-302,8.441559357142858e-302,8.391609307692308e-302,8.341659258241758e-302,8.291709208791208e-302,8.24175915934066e-302,8.19180910989011e-302,8.14185906043956e-302,8.091909010989011e-302,8.041958961538462e-302,7.992008912087912e-302,7.942058862637363e-302,7.892108813186814e-302,7.842158763736264e-302,7.792208714285714e-302,7.742258664835165e-302,7.692308615384616e-302,7.642358565934065e-302,7.592408516483517e-302,7.542458467032967e-302,7.492508417582418e-302,7.442558368131868e-302,7.392608318681319e-302,7.342658269230769e-302,7.292708219780221e-302,7.24275817032967e-302,7.192808120879122e-302,7.142858071428571e-302,7.092908021978023e-302,7.042957972527472e-302,6.993007923076924e-302,6.943057873626374e-302,6.893107824175824e-302,6.843157774725275e-302,6.793207725274726e-302,6.743257675824176e-302,6.693307626373626e-302,6.643357576923077e-302,6.593407527472528e-302,6.543457478021978e-302,6.493507428571429e-302,6.44355737912088e-302,6.393607329670329e-302,6.34365728021978e-302,6.293707230769231e-302,6.243757181318682e-302,6.193807131868131e-302,6.143857082417584e-302,6.093907032967033e-302,6.043956983516483e-302,5.994006934065933e-302,5.944056884615385e-302,5.894106835164835e-302,5.844156785714285e-302,5.794206736263737e-302,5.744256686813187e-302,5.694306637362637e-302,5.644356587912088e-302,5.594406538461539e-302,5.544456489010989e-302,5.494506439560439e-302,5.444556390109891e-302,5.394606340659341e-302,5.344656291208791e-302,5.294706241758241e-302,5.244756192307693e-302,5.194806142857142e-302,5.144856093406594e-302,5.094906043956044e-302,5.044955994505495e-302,4.995005945054945e-302,4.945055895604396e-302,4.895105846153846e-302,4.845155796703297e-302,4.795205747252747e-302,4.745255697802198e-302,4.695305648351648e-302,4.6453555989010986e-302,4.5954055494505496e-302,4.5454555e-302,4.4955054505494506e-302,4.4455554010989016e-302,4.3956053516483516e-302,4.3456553021978026e-302,4.295705252747253e-302,4.2457552032967036e-302,4.195805153846154e-302,4.1458551043956045e-302,4.0959050549450555e-302,4.0459550054945055e-302,3.996004956043956e-302,3.9460549065934065e-302,3.896104857142857e-302,3.8461548076923075e-302,3.7962047582417585e-302,3.7462547087912084e-302,3.6963046593406594e-302,3.6463546098901104e-302,3.5964045604395604e-302,3.5464545109890114e-302,3.4965044615384614e-302,3.4465544120879124e-302,3.396604362637363e-302,3.3466543131868134e-302,3.2967042637362644e-302,3.246754214285714e-302,3.196804164835165e-302,3.1468541153846153e-302,3.096904065934066e-302,3.0469540164835163e-302,2.997003967032967e-302,2.947053917582418e-302,2.8971038681318683e-302,2.847153818681319e-302,2.797203769230769e-302,2.74725371978022e-302,2.69730367032967e-302,2.647353620879121e-302,2.5974035714285717e-302,2.547453521978022e-302,2.497503472527473e-302,2.4475534230769227e-302,2.3976033736263737e-302,2.347653324175824e-302,2.297703274725275e-302,2.2477532252747251e-302,2.1978031758241756e-302,2.1478531263736264e-302,2.097903076923077e-302,2.0479530274725276e-302,1.998002978021978e-302,1.9480529285714286e-302,1.8981028791208793e-302,1.8481528296703296e-302,1.79820278021978e-302,1.7482527307692305e-302,1.6983026813186815e-302,1.648352631868132e-302,1.5984025824175825e-302,1.548452532967033e-302,1.4985024835164835e-302,1.448552434065934e-302,1.3986023846153845e-302,1.3486523351648352e-302,1.2987022857142857e-302,1.2487522362637364e-302,1.198802186813187e-302,1.1488521373626374e-302,1.0989020879120879e-302,1.0489520384615385e-302,9.99001989010989e-303,9.490519395604396e-303,8.991018901098901e-303,8.491518406593407e-303,7.992017912087912e-303,7.492517417582418e-303,6.993016923076923e-303,6.493516428571428e-303,5.994015934065934e-303,5.494515439560439e-303,4.9950149450549454e-303,4.49551445054945e-303,3.9960139560439565e-303,3.4965134615384614e-303,2.9970129670329675e-303,2.4975124725274724e-303,1.998011978021978e-303,1.4985114835164835e-303,9.990109890109891e-304,4.995104945054945e-304,1.0e-308]}
},{}],32:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var tanh = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof tanh, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic tangent', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tanh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.7 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic tangent (tiny negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tanh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic tangent (tiny positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tanh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic tangent (large negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tanh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic tangent (large positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tanh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var v = tanh( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var v = tanh( -0.0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', function test( t ) {
	var v = tanh( +0.0 );
	t.equal( isPositiveZero( v ), true, 'returns +0' );
	t.end();
});

tape( 'the function returns `1.0` if provided `+infinity`', function test( t ) {
	var v = tanh( PINF );
	t.equal( v, 1.0, 'returns 1.0' );
	t.end();
});

tape( 'the function returns `-1.0` if provided `-infinity`', function test( t ) {
	var v = tanh( NINF );
	t.equal( v, -1.0, 'returns -1.0' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/tanh/test/test.js")
},{"./../lib":25,"./fixtures/julia/data.json":27,"./fixtures/julia/large_negative.json":28,"./fixtures/julia/large_positive.json":29,"./fixtures/julia/tiny_negative.json":30,"./fixtures/julia/tiny_positive.json":31,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/assert/is-negative-zero":8,"@stdlib/math/base/assert/is-positive-zero":10,"@stdlib/math/base/special/abs":13,"@stdlib/math/constants/float64-eps":54,"@stdlib/math/constants/float64-ninf":60,"@stdlib/math/constants/float64-pinf":61,"tape":119}],33:[function(require,module,exports){
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

},{"./trunc.js":34}],34:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":15,"@stdlib/math/base/special/floor":22}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"./evalpoly.js":35}],37:[function(require,module,exports){
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

},{"./evalpoly.js":35,"./factory.js":36,"@stdlib/utils/define-read-only-property":64}],38:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":13}],39:[function(require,module,exports){
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

},{"./evalrational.js":38}],40:[function(require,module,exports){
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

},{"./evalrational.js":38,"./factory.js":39,"@stdlib/utils/define-read-only-property":64}],41:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":48,"@stdlib/math/constants/float64-exponent-bias":55,"@stdlib/math/constants/float64-high-word-exponent-mask":56}],42:[function(require,module,exports){
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

},{"./exponent.js":41}],43:[function(require,module,exports){
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

},{"./indices.js":45}],44:[function(require,module,exports){
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

},{"./from_words.js":43}],45:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],46:[function(require,module,exports){
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

},{"./high.js":47}],47:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],48:[function(require,module,exports){
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

},{"./get_high_word.js":46}],49:[function(require,module,exports){
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

},{"./normalize.js":50}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/abs":13,"@stdlib/math/constants/float64-smallest-normal":62}],51:[function(require,module,exports){
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

},{"./to_words.js":53}],52:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":45}],53:[function(require,module,exports){
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

},{"./indices.js":52}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{"./define_read_only_property.js":63}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){

},{}],67:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"dup":66}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"base64-js":65,"ieee754":88}],70:[function(require,module,exports){
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
},{"../../is-buffer/index.js":90}],71:[function(require,module,exports){
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

},{"./lib/is_arguments.js":72,"./lib/keys.js":73}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],74:[function(require,module,exports){
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

},{"foreach":84,"object-keys":93}],75:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],76:[function(require,module,exports){
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

},{"./helpers/isFinite":77,"./helpers/isNaN":78,"./helpers/mod":79,"./helpers/sign":80,"es-to-primitive/es5":81,"has":87,"is-callable":91}],77:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],78:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],79:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],80:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],81:[function(require,module,exports){
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

},{"./helpers/isPrimitive":82,"is-callable":91}],82:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){

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


},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":85}],87:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":86}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{"./isArguments":94}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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
},{"_process":68}],96:[function(require,module,exports){
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
},{"_process":68}],97:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":98}],98:[function(require,module,exports){
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
},{"./_stream_readable":100,"./_stream_writable":102,"core-util-is":70,"inherits":89,"process-nextick-args":96}],99:[function(require,module,exports){
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
},{"./_stream_transform":101,"core-util-is":70,"inherits":89}],100:[function(require,module,exports){
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
},{"./_stream_duplex":98,"./internal/streams/BufferList":103,"./internal/streams/destroy":104,"./internal/streams/stream":105,"_process":68,"core-util-is":70,"events":83,"inherits":89,"isarray":106,"process-nextick-args":96,"safe-buffer":113,"string_decoder/":107,"util":66}],101:[function(require,module,exports){
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
},{"./_stream_duplex":98,"core-util-is":70,"inherits":89}],102:[function(require,module,exports){
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
},{"./_stream_duplex":98,"./internal/streams/destroy":104,"./internal/streams/stream":105,"_process":68,"core-util-is":70,"inherits":89,"process-nextick-args":96,"safe-buffer":113,"util-deprecate":125}],103:[function(require,module,exports){
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
},{"safe-buffer":113}],104:[function(require,module,exports){
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
},{"process-nextick-args":96}],105:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":83}],106:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],107:[function(require,module,exports){
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
},{"safe-buffer":113}],108:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":109}],109:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":98,"./lib/_stream_passthrough.js":99,"./lib/_stream_readable.js":100,"./lib/_stream_transform.js":101,"./lib/_stream_writable.js":102}],110:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":109}],111:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":102}],112:[function(require,module,exports){
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
},{"_process":68,"through":124}],113:[function(require,module,exports){
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

},{"buffer":69}],114:[function(require,module,exports){
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

},{"events":83,"inherits":89,"readable-stream/duplex.js":97,"readable-stream/passthrough.js":108,"readable-stream/readable.js":109,"readable-stream/transform.js":110,"readable-stream/writable.js":111}],115:[function(require,module,exports){
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

},{"es-abstract/es5":76,"function-bind":86}],116:[function(require,module,exports){
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

},{"./implementation":115,"./polyfill":117,"./shim":118,"define-properties":74,"function-bind":86}],117:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":115}],118:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":117,"define-properties":74}],119:[function(require,module,exports){
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
},{"./lib/default_stream":120,"./lib/results":122,"./lib/test":123,"_process":68,"defined":75,"through":124}],120:[function(require,module,exports){
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
},{"_process":68,"fs":67,"through":124}],121:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":68}],122:[function(require,module,exports){
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
},{"_process":68,"events":83,"function-bind":86,"has":87,"inherits":89,"object-inspect":92,"resumer":112,"through":124}],123:[function(require,module,exports){
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
},{"./next_tick":121,"deep-equal":71,"defined":75,"events":83,"has":87,"inherits":89,"path":95,"string.prototype.trim":116}],124:[function(require,module,exports){
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
},{"_process":68,"stream":114}],125:[function(require,module,exports){
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
},{}]},{},[32]);
