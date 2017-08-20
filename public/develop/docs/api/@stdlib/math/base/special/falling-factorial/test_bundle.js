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

},{"@stdlib/math/constants/float64-ninf":107,"@stdlib/math/constants/float64-pinf":109}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":38}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":107}],14:[function(require,module,exports){
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

},{"./is_nonnegative_integer.js":15}],15:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/math/base/special/floor":38}],16:[function(require,module,exports){
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

},{"./is_odd.js":17}],17:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":4}],18:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"./ceil.js":20}],22:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":76,"@stdlib/math/base/utils/float64-get-high-word":80,"@stdlib/math/base/utils/float64-to-words":92}],23:[function(require,module,exports){
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

},{"./copysign.js":22}],24:[function(require,module,exports){
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

},{"./expmulti.js":25,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":65,"@stdlib/math/constants/float64-ninf":107,"@stdlib/math/constants/float64-pinf":109}],25:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":43,"@stdlib/math/base/tools/evalpoly":69}],26:[function(require,module,exports){
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

},{"./exp.js":24}],27:[function(require,module,exports){
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

},{"./factorials.json":28,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gamma":40,"@stdlib/math/constants/float64-pinf":109}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./factorial.js":27}],30:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/factorials.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006, 2010.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var abs = require( '@stdlib/math/base/special/abs' );
var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var gammaDeltaRatio = require( './tgamma_delta_ratio.js' );


// VARIABLES //

var MAX_FACTORIAL = 170;


// FUNCTIONS //

/**
* Computes the rising factorial of x and n.
*
* ## Notes
*
* * The rising factorial is defined as
*
*   ``` tex
*   \operatorname{risingFactorial}(x, n) = x (x-1) (x-2) (x-3) \ldots (x-n+1)
*   ```
*
*   or equivalently
*
*   ``` tex
*   \operatorname{risingFactorial}(x, n) = \frac{ \Gamma(x + n) }{ \Gamma(x) };
*   ```
*
* @private
* @param {number} x - first function parameter
* @param {integer} n - second function parameter
* @returns {number} function value
*/
function risingFactorial( x, n ) {
	var result;
	var inv;
	var val;

	if ( isnan( x ) || !isInteger( n ) ) {
		return NaN;
	}
	if ( x < 0.0 ) {
		// For x less than zero, we really have a falling factorial, modulo a possible change of sign. Note that the falling factorial isn't defined for negative n, so we'll get rid of that case first:
		inv = false;
		if ( n < 0.0 ) {
			x += n;
			n = -n;
			inv = true;
		}
		result = ( (n&1) ? -1 : 1 ) * fallingFactorial( -x, n );
		if ( inv ) {
			result = 1.0 / result;
		}
		return result;
	}
	if ( n === 0.0 ) {
		return 1.0;
	}
	if ( x === 0.0 ) {
		if ( n < 0 ) {
			return -gammaDeltaRatio( x + 1.0, -n );
		}
		return 0.0;
	}
	if ( x < 1.0 && x + n < 0.0 ) {
		val = gammaDeltaRatio( 1.0 - x, -n );
		return ( n & 1 ) ? -val : val;
	}
	// We don't optimize this for small n, because gammaDeltaRatio is already optimized for that use case:
	return 1.0 / gammaDeltaRatio( x, n );
} // end FUNCTION risingFactorial()


// MAIN //

/**
* Computes the falling factorial of x and n.
*
* ## Notes
*
* * The falling factorial is defined as
*
*   ``` tex
*   \operatorname{fallingFactorial}(x, n) = x (x-1) (x-2) (x-3) \ldots (x-n+1)
*   ```
*
* @param {number} x - first function parameter
* @param {NonNegativeInteger} n - second function parameter
* @returns {number} function value
*
* @example
* var v = fallingFactorial( 0.9, 5 );
* // returns ~0.644
*
* @example
* var v = fallingFactorial( -9.0, 3 );
* // returns -990
*
* @example
* var v = fallingFactorial( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = fallingFactorial( 3.0, -2 );
* // returns NaN
*/
function fallingFactorial( x, n ) {
	var result;
	var xp1;
	var n2;
	var t1;
	var t2;

	if ( isnan( x ) || !isNonNegativeInteger( n ) ) {
		return NaN;
	}
	if ( x === 0.0 ) {
		return 0.0;
	}
	if ( x < 0 ) {
		// For x < 0 we really have a rising factorial modulo a possible change of sign:
		return ( n&1 ? -1 : 1 ) * risingFactorial( -x, n );
	}
	if ( n === 0 ) {
		return 1.0;
	}
	if ( x < 0.5 ) {
		// 1 + x below will throw away digits, so split up calculation:
		if ( n > MAX_FACTORIAL - 2 ) {
			// If the two end of the range are far apart we have a ratio of two very large numbers, split the calculation up into two blocks:
			t1 = x * fallingFactorial( x - 1, MAX_FACTORIAL - 2 );
			t2 = fallingFactorial( x-MAX_FACTORIAL+1, n-MAX_FACTORIAL+1 );
			if ( FLOAT64_MAX / abs(t1) < abs(t2) ) {
				return PINF;
			}
			return t1 * t2;
		}
		return x * fallingFactorial( x - 1.0, n - 1.0 );
	}
	if ( x <= n - 1.0 ) {
		// `x+1-n` will be negative and gammaDeltaRatio won't handle it, split the product up into three parts:
		xp1 = x + 1.0;
		n2 = abs( floor( xp1 ) );
		if ( n2 === xp1 ) {
			return 0.0;
		}
		result = gammaDeltaRatio( xp1, -n2 );
		x -= n2;
		result *= x;
		n2 += 1.0;
		if ( n2 < n ) {
			result *= fallingFactorial( x - 1.0, n - n2 );
		}
		return result;
	}
	// Simple case: just the ratio of two (positive argument) gamma functions. Note that we don't optimize this for small n, because gammaDeltaRatio is already optimized for that use case:
	return gammaDeltaRatio( x + 1.0, -n );
} // end FUNCTION fallingFactorial()


// EXPORTS //

module.exports = fallingFactorial;

},{"./tgamma_delta_ratio.js":32,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/floor":38,"@stdlib/math/constants/float64-max":105,"@stdlib/math/constants/float64-pinf":109}],31:[function(require,module,exports){
'use strict';

/**
* Compute the falling factorial.
*
* @module @stdlib/math/base/special/falling-factorial
*
* @example
* var fallingFactorial = require( '@stdlib/math/base/special/falling-factorial' );
*
* var v = fallingFactorial( 0.9, 5 );
* // returns ~0.644
*
* v = fallingFactorial( -9.0, 3 );
* // returns -990
*
* v = fallingFactorial( 0.0, 2 );
* // returns 0.0
*
* v = fallingFactorial( 3.0, -2s );
* // returns NaN
*/

// MODULES //

var fallingFactorial = require( './falling_factorial.js' );


// EXPORTS //

module.exports = fallingFactorial;

},{"./falling_factorial.js":30}],32:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
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

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var factorial = require( '@stdlib/math/base/special/factorial' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );
var E = require( '@stdlib/math/constants/float64-e' );


// VARIABLES //

var MAX_FACTORIAL = 170;
var G = 10.90051099999999983936049829935654997826;
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
* Calculate the Lanczos sum approximation.
*
* @private
* @param {number} z - input value
* @returns {number} Lanczos approximation
*/
var lanczosSum = evalrational( NUM, DENOM );


/**
* Calculates the ratio of two gamma functions via Lanczos approximation.
*
* #### Notes
*
* - When \\( z < \epsilon \\), we get spurious numeric overflow unless we're very careful, this can occur either inside lanczosSum(z) or in the final combination of terms, to avoid this, split the product up into 2 (or 3) parts:
*
*   ``` tex
*    G(z) / G(L) = 1 / (z \cdot G(L)) ; z < \eps, L = z + \delta = \delta \\
*    z * G(L) = z * G(lim) \cdot (G(L)/G(lim)) ; lim = \text{largest factorial}
*   ````
*
* @private
* @param {number} z - function value
* @param {number} delta - difference
* @returns {number} gamma ratio
*/
function tgammaDeltaRatioImpLanczos( z, delta ) {
	var result;
	var ratio;
	var zgh;
	if ( z < EPSILON ) {
		if ( MAX_FACTORIAL < delta ) {
			ratio = tgammaDeltaRatioImpLanczos( delta, MAX_FACTORIAL - delta );
			ratio *= z;
			ratio *= factorial( MAX_FACTORIAL - 1 );
			return 1.0 / ratio;
		}
		return 1.0 / ( z * gamma( z + delta ) );
	}
	zgh = z + G - 0.5;
	if ( z + delta === z ) {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5 - z ) * log1p( delta / zgh ) );
		} else {
			result = 1.0;
		}
	} else {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5 - z ) * log1p( delta / zgh ));
		} else {
			result = pow( zgh / (zgh + delta), z - 0.5 );
		}
		// Split the calculation up to avoid spurious overflow:
		result *= lanczosSum( z ) / lanczosSum( z + delta );
	}
	result *= pow( E / ( zgh + delta ), delta );
	return result;
} // end FUNCTION tgammaDeltaRatioImpLanczos()


// MAIN //

/**
* Implementation of the gamma ratio.
*
* @private
* @param {number} z - function value
* @param {number} delta - difference
* @returns {number} gamma ratio
*/
function tgammaDeltaRatioImp( z, delta ) {
	var result;

	if ( z <= 0.0 || z + delta <= 0.0 ) {
		// This isn't very sophisticated, or accurate, but it does work:
		return gamma( z ) / gamma( z + delta );
	}
	if ( floor(delta) === delta ) {
		if ( floor(z) === z ) {
			// Both z and delta are integers, see if we can just use table lookup of the factorials to get the result:
			if ( z <= MAX_FACTORIAL && ( z + delta <= MAX_FACTORIAL ) ) {
				return factorial( floor(z) - 1.0 ) /
					factorial( floor(z+delta) - 1.0 );
			}
		}
		if ( abs(delta) < 20 ) {
			// Delta is a small integer, we can use a finite product:
			if ( delta === 0 ) {
				return 1.0;
			}
			if ( delta < 0 ) {
				z -= 1.0;
				result = z;
				delta += 1;
				while ( delta !== 0 ) {
					z -= 1;
					result *= z;
					delta += 1;
				}
				return result;
			}
			result = 1.0 / z;
			delta -= 1;
			while ( delta !== 0 ) {
				z += 1;
				result /= z;
				delta -= 1;
			}
			return result;
		}
	}
	return tgammaDeltaRatioImpLanczos( z, delta );
} // end FUNCTION tgammaDeltaRatioImp()


// EXPORTS //

module.exports = tgammaDeltaRatioImp;

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/exp":26,"@stdlib/math/base/special/factorial":29,"@stdlib/math/base/special/floor":38,"@stdlib/math/base/special/gamma":40,"@stdlib/math/base/special/log1p":45,"@stdlib/math/base/special/pow":47,"@stdlib/math/base/tools/evalrational":72,"@stdlib/math/constants/float64-e":97,"@stdlib/math/constants/float64-eps":98}],33:[function(require,module,exports){
module.exports={  "x": [29.888888888888889,16.45945945945946,16.576576576576578,31.177177177177178,24.96996996996997,10.096096096096096,31.138138138138139,34.534534534534536,18.255255255255257,25.243243243243246,9.93993993993994,39.258258258258259,7.9489489489489493,30.396396396396398,27.039039039039039,25.984984984984987,22.315315315315317,1.1561561561561562,39.804804804804803,2.6786786786786787,30.318318318318319,5.9189189189189193,32.6996996996997,13.921921921921923,34.027027027027032,25.087087087087088,4.8648648648648649,19.036036036036037,24.930930930930931,12.477477477477478,34.33933933933934,22.588588588588589,18.372372372372372,9.8228228228228236,26.765765765765767,37.891891891891895,21.027027027027028,31.840840840840841,29.771771771771771,29.45945945945946,22.744744744744747,32.270270270270274,32.153153153153156,11.657657657657658,17.63063063063063,13.336336336336338,32.738738738738739,17.942942942942942,8.2222222222222214,27.312312312312311,12.633633633633634,27.585585585585587,15.483483483483484,20.402402402402402,28.405405405405407,12.321321321321321,3.8888888888888888,36.486486486486491,34.456456456456458,26.804804804804807,13.843843843843844,5.0210210210210215,17.357357357357358,14.546546546546548,38.633633633633636,9.0420420420420431,19.66066066066066,26.336336336336338,9.9009009009009006,4.786786786786787,33.51951951951952,23.915915915915917,34.261261261261261,10.33033033033033,33.246246246246244,11.189189189189189,32.621621621621621,34.651651651651655,36.135135135135137,16.615615615615617,33.051051051051054,19.231231231231231,7.0120120120120122,24.033033033033036,34.378378378378379,4.2792792792792795,20.285285285285287,29.03003003003003,8.9639639639639643,4.9819819819819822,1,29.42042042042042,34.066066066066064,27.156156156156158,22.900900900900901,39.414414414414416,32.036036036036037,28.093093093093096,12.78978978978979,28.054054054054056,37.033033033033036,1.8198198198198199,1.1951951951951951,1.4294294294294294,23.057057057057058,8.4564564564564577,25.672672672672675,16.264264264264263,21.846846846846848,11.384384384384385,25.867867867867869,27.741741741741741,35.705705705705704,34.183183183183182,12.126126126126126,38.36036036036036,32.582582582582589,21.72972972972973,1.5465465465465464,15.834834834834835,23.018018018018019,22.783783783783786,7.2072072072072073,19.543543543543546,33.402402402402402,10.75975975975976,10.837837837837839,37.852852852852855,1.9759759759759761,21.885885885885887,19.30930930930931,37.189189189189193,17.747747747747749,37.657657657657658,31.294294294294296,17.66966966966967,29.264264264264266,7.7147147147147148,10.447447447447448,12.984984984984985,5.8798798798798799,2.4444444444444446,13.18018018018018,35.354354354354356,5.2162162162162167,15.561561561561563,8.1051051051051051,10.408408408408409,32.387387387387392,10.135135135135135,6.3483483483483489,12.438438438438439,3.2642642642642645,8.378378378378379,34.144144144144143,35.471471471471475,18.840840840840841,26.687687687687689,7.6756756756756763,1.2732732732732732,24.306306306306308,15.327327327327328,31.021021021021021,38.828828828828833,16.108108108108109,32.777777777777779,4.0840840840840844,24.228228228228229,9.2372372372372382,33.597597597597598,2.5225225225225225,10.525525525525525,19.582582582582582,9.9789789789789793,19.27027027027027,13.102102102102103,3.9279279279279282,22.54954954954955,1.4684684684684686,39.024024024024023,23.33033033033033,18.294294294294296,17.084084084084086,36.681681681681681,14.351351351351353,20.987987987987989,10.018018018018019,37.735735735735737,35.510510510510514,3.7327327327327327,38.516516516516518,6.8948948948948949,15.288288288288289,30.903903903903906,22.432432432432432,18.801801801801801,37.774774774774777,17.318318318318319,28.171171171171171,37.969969969969974,19.933933933933936,18.45045045045045,20.558558558558559,31.684684684684687,21.183183183183186,12.906906906906908,33.870870870870874,3.1471471471471473,23.447447447447448,14.468468468468469,8.4954954954954953,7.2462462462462467,33.48048048048048,36.72072072072072,14.156156156156156,39.492492492492495,5.5285285285285291,13.141141141141141,11.618618618618619,27.468468468468469,9.7447447447447448,27.624624624624627,18.996996996996998,17.591591591591591,34.222222222222221,35.666666666666671,20.636636636636638,18.48948948948949,11.54054054054054,39.960960960960961,34.105105105105103,35.237237237237238,18.87987987987988,2.288288288288288,19.6996996996997,23.798798798798799,1.5075075075075075,9.5105105105105103,32.075075075075077,21.066066066066067,3.6156156156156158,33.987987987987992,7.9099099099099099,15.24924924924925,34.612612612612615,23.75975975975976,33.753753753753756,4.3573573573573574,35.588588588588593,3.5765765765765765,38.789789789789793,5.9579579579579578,36.798798798798799,8.4174174174174183,6.7387387387387392,14.741741741741743,22.471471471471471,31.606606606606608,5.7627627627627627,23.174174174174176,24.57957957957958,37.462462462462462,18.216216216216218,20.597597597597598,24.891891891891891,18.528528528528529,16.537537537537538,13.492492492492493,39.726726726726731,5.6066066066066069,34.885885885885884,21.651651651651651,9.6666666666666679,8.6516516516516511,20.948948948948949,11.891891891891893,11.930930930930931,25.438438438438439,32.66066066066066,15.756756756756758,21.495495495495497,33.948948948948953,26.453453453453456,27.195195195195197,23.525525525525527,7.5585585585585591,15.6006006006006,11.696696696696698,34.573573573573576,16.42042042042042,8.0660660660660675,25.204204204204206,39.219219219219219,30.201201201201201,22.081081081081081,14.975975975975976,36.291291291291294,31.06006006006006,6.8168168168168171,3.5375375375375375,22.003003003003005,7.3243243243243246,31.528528528528529,20.714714714714717,34.690690690690694,1.6246246246246248,3.1861861861861862,18.762762762762762,22.042042042042041,9.5885885885885891,20.870870870870871,29.966966966966968,17.864864864864867,1.7807807807807809,35.432432432432435,6.2312312312312317,28.834834834834837,2.1321321321321323,8.2612612612612608,22.12012012012012,15.015015015015015,35.276276276276278,25.78978978978979,30.825825825825827,5.7237237237237242,11.774774774774775,2.3663663663663663,2.9519519519519521,20.753753753753756,21.144144144144146,19.816816816816818,30.981981981981981,21.105105105105107,26.648648648648649,34.768768768768773,15.054054054054054,6.5435435435435441,32.894894894894897,28.24924924924925,12.828828828828829,10.876876876876878,37.384384384384383,35.198198198198199,10.603603603603604,29.810810810810811,20.207207207207208,22.627627627627628,20.90990990990991,12.516516516516518,33.636636636636638,39.102102102102101,17.396396396396398,11.111111111111111,7.8318318318318321,11.306306306306306,14.312312312312313,23.642642642642642,34.846846846846852,7.3633633633633639,9.393393393393394,24.813813813813816,11.813813813813814,5.06006006006006,29.84984984984985,12.75075075075075,22.978978978978979,15.873873873873874,16.069069069069069,13.648648648648649,15.093093093093094,28.483483483483486,7.0900900900900901,2.0930930930930929,30.786786786786788,26.102102102102101,3.8498498498498499,4.2402402402402402,15.951951951951953,32.114114114114116,19.075075075075077,6.4654654654654653,19.426426426426428,39.063063063063062,6.2702702702702702,30.27927927927928,24.501501501501501,19.855855855855857,26.063063063063066,24.735735735735737,22.237237237237238,36.252252252252255,27.234234234234236,14.624624624624625,28.132132132132131,32.816816816816818,5.3723723723723724,12.867867867867869,11.96996996996997,14.507507507507508,36.525525525525524,17.435435435435437,27,18.723723723723726,28.561561561561561,3.3423423423423424,13.726726726726728,37.423423423423422,28.444444444444446,39.18018018018018,9.2762762762762758,11.15015015015015,13.57057057057057,33.675675675675677,27.663663663663666,2.9909909909909911,17.981981981981981,15.990990990990991,10.993993993993994,35.900900900900901,12.555555555555555,37.57957957957958,9.1591591591591595,14.585585585585585,38.672672672672675,33.168168168168172,26.414414414414416,29.498498498498499,28.678678678678679,11.033033033033034,5.6846846846846848,25.945945945945947,8.7687687687687692,32.426426426426431,3.9669669669669672,10.213213213213214,38.711711711711715,25.594594594594597,36.915915915915917,19.387387387387388,38.984984984984983,23.213213213213216,30.708708708708709,29.732732732732735,23.954954954954957,17.162162162162161,13.375375375375375,11.57957957957958,35.315315315315317,13.765765765765765,19.465465465465467,13.804804804804805,3.2252252252252251,36.408408408408413,38.906906906906912,27.975975975975977,28.756756756756758,2.7177177177177176,28.366366366366368,7.9879879879879878,40,4.3183183183183189,20.129129129129129,26.60960960960961,38.087087087087092,38.867867867867872,2.015015015015015,22.822822822822825,16.381381381381381,5.4114114114114118,27.780780780780781,31.255255255255257,30.084084084084086,27.546546546546548,23.486486486486488,35.822822822822822,4.7477477477477477,23.408408408408409,35.93993993993994,19.192192192192191,26.57057057057057,4.0060060060060056,35.159159159159159,25.906906906906908,28.990990990990991,10.36936936936937,20.09009009009009,33.831831831831835,9.1981981981981988,38.477477477477478,26.18018018018018,9.0810810810810807,25.009009009009009,8.3003003003003002,18.567567567567568,37.501501501501501,39.882882882882882,8.1441441441441444,9.861861861861863,6.6606606606606604,8.0270270270270281,2.756756756756757,26.141141141141141,3.4204204204204207,23.993993993993996,11.228228228228229,27.702702702702705,20.48048048048048,15.366366366366368,8.5345345345345347,33.792792792792795,12.009009009009009,11.423423423423424,39.375375375375377,26.960960960960961,7.2852852852852852,1.7027027027027026,14.936936936936938,2.4054054054054053,3.810810810810811,5.0990990990990994,6.6216216216216219,39.648648648648653,35.393393393393396,21.534534534534536,17.513513513513516,9.1201201201201201,23.837837837837839,6.5825825825825826,3.3813813813813813,9.0030030030030037,10.798798798798799,33.129129129129133,28.21021021021021,14.81981981981982,4.5525525525525525,17.903903903903906,29.927927927927929,9.7837837837837842,18.099099099099099,27.273273273273276,15.717717717717719,23.876876876876878,37.930930930930934,17.201201201201201,21.3003003003003,36.330330330330334,27.117117117117118,29.693693693693696,39.765765765765764,5.5675675675675675,13.297297297297298,23.096096096096097,23.681681681681681,30.123123123123126,24.618618618618619,23.135135135135137,8.3393393393393396,7.5195195195195197,31.645645645645647,26.882882882882885,31.099099099099099,31.723723723723726,25.828828828828829,16.498498498498499,38.009009009009013,10.954954954954955,30.162162162162165,34.729729729729733,31.48948948948949,21.69069069069069,17.825825825825827,25.048048048048049,20.675675675675677,16.342342342342342,24.15015015015015,26.219219219219219,29.225225225225227,25.75075075075075,37.150150150150154,30.24024024024024,33.909909909909913,20.363363363363366,16.693693693693696,19.972972972972972,15.795795795795796,38.321321321321321,20.441441441441441,27.936936936936938,3.6936936936936937,26.921921921921921,24.462462462462462,14.078078078078079,27.42942942942943,24.657657657657658,38.048048048048052,8.1831831831831838,26.258258258258259,19.114114114114116,12.243243243243244,36.174174174174176,10.057057057057058,25.321321321321321,21.573573573573576,29.303303303303306,1.0780780780780781,32.231231231231234,1.117117117117117,36.603603603603602,2.5615615615615619,31.87987987987988,11.852852852852854,26.531531531531531,29.108108108108109,38.204204204204203,5.801801801801802,3.3033033033033035,3.069069069069069,37.306306306306304,3.1081081081081083,7.8708708708708714,20.324324324324326,26.726726726726728,21.924924924924927,8.8078078078078086,4.1621621621621623,11.462462462462463,35.783783783783782,7.5975975975975976,37.54054054054054,9.4324324324324333,5.2552552552552552,37.696696696696698,19.894894894894897,13.063063063063064,24.54054054054054,31.372372372372375,12.711711711711713,21.222222222222221,4.4354354354354353,25.711711711711711,31.567567567567568,14.897897897897899,28.795795795795797,1.6636636636636637,6.1921921921921923,35.627627627627632,15.678678678678679,5.4894894894894897,5.1771771771771773,28.873873873873876,24.423423423423426,21.963963963963966,9.3153153153153152,36.213213213213216,20.012012012012011,37.345345345345343,36.837837837837839,25.477477477477478,10.486486486486486,25.282282282282281,18.177177177177178,4.513513513513514,19.738738738738739,30.552552552552555,17.474474474474476,38.165165165165163,24.111111111111111,33.207207207207212,22.51051051051051,37.111111111111114,31.957957957957959,30.006006006006007,36.447447447447452,38.126126126126124,29.342342342342345,17.006006006006007,34.924924924924923,12.3993993993994,12.048048048048049,22.276276276276278,10.642642642642643,10.72072072072072,6.3093093093093096,13.453453453453454,23.252252252252251,7.0510510510510516,2.3273273273273274,16.888888888888889,18.06006006006006,36.75975975975976,36.954954954954957,35.861861861861861,8.8858858858858873,1.0390390390390389,4.7087087087087092,21.33933933933934,13.531531531531533,14.039039039039039,17.045045045045047,14,2.2102102102102101,23.603603603603606,17.123123123123122,11.501501501501503,22.93993993993994,16.966966966966968,33.441441441441441,3.771771771771772,2.8738738738738738,6.1141141141141144,8.5735735735735741,7.6366366366366369,10.564564564564565,9.3543543543543546,36.642642642642642,15.912912912912914,38.750750750750754,38.945945945945944,29.069069069069069,22.159159159159159,25.36036036036036,7.4804804804804803,6.9339339339339343,1.8588588588588588,24.852852852852855,18.138138138138139,30.864864864864867,23.36936936936937,20.792792792792792,28.951951951951951,27.39039039039039,7.4414414414414418,24.696696696696698,33.714714714714717,33.558558558558559,16.732732732732735,39.687687687687692,37.618618618618619,22.705705705705707,30.63063063063063,32.972972972972975,1.3123123123123124,30.357357357357358,4.5915915915915919,13.882882882882884,6.075075075075075,9.5495495495495497,32.50450450450451,13.687687687687689,3.4984984984984986,39.336336336336338,7.1681681681681688,4.9429429429429437,26.297297297297298,30.66966966966967,12.087087087087088,37.267267267267272,32.933933933933936,22.198198198198199,16.225225225225223,35.549549549549553,21.261261261261261,22.393393393393396,3.03003003003003,33.363363363363362,1.897897897897898,32.348348348348352,4.045045045045045,22.354354354354356,6.1531531531531529,36.057057057057058,1.5855855855855856,7.4024024024024024,23.72072072072072,36.096096096096097,16.147147147147148,27.858858858858859,31.216216216216218,18.411411411411411,6.9729729729729728,1.9369369369369369,4.8258258258258255,5.9969969969969972,2.4834834834834836,39.141141141141141,12.36036036036036,27.507507507507508,32.309309309309313,15.444444444444445,13.60960960960961,36.564564564564563,14.702702702702704,21.768768768768769,21.807807807807809,27.897897897897899,11.267267267267268,29.381381381381381,1.2342342342342343,39.843843843843842,15.405405405405405,23.564564564564566,36.018018018018019,32.192192192192195,31.333333333333336,14.273273273273274,24.774774774774777,39.921921921921921,26.375375375375377,18.957957957957959,5.8408408408408414,39.609609609609613,39.453453453453456,18.021021021021021,9.7057057057057055,12.672672672672673,21.417417417417418,2.0540540540540544,18.684684684684687,1.7417417417417418,39.570570570570574,13.960960960960961,20.246246246246248,24.072072072072071,14.780780780780781,38.555555555555557,39.531531531531535,34.3003003003003,15.171171171171173,18.645645645645647,19.621621621621621,13.024024024024024,2.6006006006006004,33.090090090090094,15.21021021021021,32.543543543543549,38.438438438438439,12.165165165165165,7.7537537537537542,9.4714714714714709,16.810810810810811,9.6276276276276285,5.2942942942942945,8.6126126126126117,21.378378378378379,19.348348348348349,27.351351351351351,6.0360360360360366,2.795795795795796,29.576576576576578,24.267267267267268,24.345345345345347,31.45045045045045,1.3513513513513513,6.5045045045045047,36.993993993993996,27.078078078078079,27.81981981981982,34.417417417417418,8.924924924924925,21.456456456456458,16.03003003003003,38.3993993993994,2.8348348348348349,12.204204204204204,23.291291291291291,30.942942942942945,4.2012012012012008,37.813813813813816,13.219219219219219,39.297297297297298,33.324324324324323,36.876876876876878,24.384384384384386,7.1291291291291294,12.282282282282283,10.252252252252253,31.411411411411411,19.777777777777779,4.3963963963963959,25.633633633633636,28.522522522522525,30.513513513513516,10.174174174174174,5.6456456456456454,2.1711711711711712,17.786786786786788,38.594594594594597,19.504504504504506,17.24024024024024,28.015015015015017,31.996996996996998,28.63963963963964,17.552552552552552,17.27927927927928,16.654654654654657,30.435435435435437,13.414414414414415,4.6306306306306304,16.303303303303302,4.9039039039039043,14.663663663663664,6.4264264264264268,29.186186186186188,6.6996996996996998,25.516516516516518,8.846846846846848,35.744744744744743,2.2492492492492495,29.615615615615617,14.858858858858859,18.333333333333336,16.927927927927929,31.918918918918919,11.345345345345345,10.291291291291291,18.606606606606608,37.072072072072075,3.6546546546546548,25.126126126126128,28.6006006006006,8.7297297297297298,14.42942942942943,6.7777777777777777,34.495495495495497,20.51951951951952,38.282282282282281,36.369369369369373,30.747747747747749,11.072072072072073,30.474474474474476,25.555555555555557,5.3333333333333339,3.4594594594594597,15.522522522522523,37.228228228228232,22.861861861861861,4.1231231231231238,12.945945945945946,35.042042042042041,29.147147147147148,28.912912912912915,34.963963963963963,2.6396396396396398,6.3873873873873874,20.168168168168169,7.7927927927927927,25.165165165165167,26.024024024024026,21.612612612612612,13.258258258258259,16.84984984984985,14.39039039039039,14.117117117117118,5.1381381381381379,16.771771771771775,29.537537537537538,24.189189189189189,29.654654654654657,35.978978978978979,26.843843843843846,2.9129129129129128,8.6906906906906904,11.735735735735735,33.012012012012015,6.8558558558558564,4.4744744744744747,28.327327327327328,20.831831831831831,10.915915915915916,28.717717717717719,14.234234234234235,35.003003003003002,15.63963963963964,25.3993993993994,31.762762762762765,12.594594594594595,22.666666666666668,28.288288288288289,4.6696696696696698,1.3903903903903905,26.492492492492495,20.051051051051051,10.681681681681683,32.855855855855857,35.081081081081081,31.801801801801801,35.12012012012012,5.4504504504504503,30.045045045045047,16.186186186186188,30.591591591591591,33.285285285285283,15.132132132132133,34.807807807807812,18.918918918918919,32.465465465465471,14.195195195195195,19.153153153153152,38.243243243243242,17.708708708708709],  "n": [33,6,37,34,6,39,37,9,26,13,4,22,12,8,22,40,39,40,39,39,7,30,39,40,39,5,20,32,33,12,6,1,17,5,37,26,32,36,39,21,27,32,2,15,34,9,38,28,28,16,31,30,30,19,16,17,27,7,7,13,29,32,2,13,12,35,2,6,4,40,33,33,28,6,13,31,39,20,2,27,18,6,16,9,31,3,32,2,8,17,20,19,18,20,26,32,29,37,31,33,12,29,28,1,27,29,7,26,5,19,20,31,39,23,14,36,24,33,9,1,31,33,11,33,21,38,28,17,36,17,39,24,22,7,6,31,6,10,11,33,34,40,11,14,33,12,10,1,38,9,14,37,8,34,11,39,25,32,19,40,15,3,34,32,24,24,22,30,37,28,12,28,31,16,31,23,16,9,23,22,4,17,3,15,22,24,32,15,38,39,6,7,23,16,19,16,1,30,14,16,7,38,32,18,13,35,22,25,7,5,25,19,11,14,27,22,28,29,30,40,19,29,4,37,10,21,37,23,7,21,34,19,22,22,40,18,4,35,18,25,5,20,39,40,1,2,31,40,33,15,35,28,4,14,16,35,11,2,33,27,18,30,37,6,8,40,11,4,6,12,6,33,35,4,24,26,22,1,6,28,35,22,25,18,15,8,21,6,17,16,4,31,10,2,5,11,8,21,10,33,17,40,2,33,37,13,38,2,20,10,20,22,14,36,37,14,15,2,5,7,32,36,16,9,10,11,17,20,4,9,6,20,38,39,39,27,24,31,3,18,10,23,15,3,33,13,1,17,2,37,7,33,26,11,30,6,26,20,19,16,22,29,12,12,30,25,8,33,28,13,8,16,15,14,26,33,32,27,4,16,38,19,32,13,20,37,18,20,18,31,13,5,21,16,21,35,33,15,32,37,26,22,16,6,33,8,22,38,15,40,38,10,36,1,23,16,25,32,24,20,9,22,13,1,19,37,10,8,34,36,8,18,10,6,7,10,10,32,18,19,13,4,37,26,18,26,8,24,37,30,40,15,18,28,5,29,11,7,17,6,24,18,11,2,25,32,29,7,9,34,5,13,12,27,13,17,17,32,21,5,4,40,11,8,33,31,2,11,38,10,30,5,20,14,24,12,10,39,19,9,39,25,22,10,21,8,10,17,20,17,25,7,28,12,16,26,15,7,40,31,2,36,36,39,37,1,32,24,4,31,11,14,14,6,28,12,6,34,29,10,5,21,27,1,20,1,32,12,29,4,37,16,36,15,14,29,28,3,8,21,2,17,30,28,21,11,20,17,37,11,25,38,25,19,35,25,33,20,24,21,8,10,10,14,36,21,2,24,20,13,7,39,40,10,29,30,21,13,19,13,3,39,28,22,2,35,3,38,21,27,4,12,33,3,33,10,29,29,6,8,27,17,21,38,39,6,26,26,33,19,19,18,18,10,34,21,4,37,6,4,7,29,16,25,34,8,33,16,3,12,16,35,22,37,17,25,27,8,26,21,12,33,18,15,1,33,40,12,7,7,5,20,15,8,8,35,20,9,14,25,39,36,37,16,3,38,30,7,11,39,17,23,22,24,38,6,17,23,40,23,13,13,29,5,27,30,22,10,28,33,27,8,8,13,6,36,40,27,7,30,2,3,23,6,36,4,27,1,8,19,15,26,19,22,40,20,7,14,35,11,26,10,16,7,8,24,18,30,20,36,5,29,24,10,10,20,16,1,24,30,11,27,12,4,25,19,11,40,33,22,40,36,30,31,14,9,24,37,5,15,37,34,36,14,33,14,11,27,24,24,1,2,18,31,13,20,7,20,8,18,17,16,4,32,24,39,19,30,28,26,28,3,26,26,2,22,3,12,13,14,22,26,27,40,17,21,33,29,29,10,39,14,22,30,14,28,5,28,25,4,32,19,17,28,4,3,11,3,7,22,12,11,18,20,22,6,19,4,36,5,21,39,38,31,26,11,39,29,10,17,28,19,12,3,27,25,28,20,3,37,11,38,9,37,27,13,34,32,14,10,32,18,28,21,1,10,25,29,16,40,37,27,1,11,19,19,17,1,19,18,31,39,13,13,32,9,19,10,2,33,8,20,29,17,19,9,7,22,14,29,25,12,8,22,30,31,10,14,37,33,11,35,31,1,8,36,12,24,4,4,24,37,28,37,22,40,18,37,26,38,26,38,28,1,26,32,38,2,9,24,29,26,10,14,5,5,25,5,19,39,19,22,27,27,31,29,15,3,27,9,17,18,34,1,34,3,11,14,25,13],  "expected": [-4.3886221059843497e+31,7070544.8882273873,1.4139735800053593e+31,4.357465144220028e+33,126488377.27751982,9.5190620794060715e+34,-1.6838711517649709e+35,22338723492157.648,-9.3507414728819548e+18,38466641770116920,4896.5623698118616,7.0689734403953426e+31,11760.57549481965,265989355145.09485,9.6609211210626562e+25,3.7314062717352112e+34,6.939993103431472e+33,4.7758954383045142e+43,4.2496481465602042e+47,3.5720331987353083e+40,11142743021.001657,1.6578468200861511e+24,1.5760863285844819e+38,1.0926992740159466e+35,2.0210482702957327e+38,6497685.6455710428,-1566946488182.2026,2.1292885095051499e+24,4.9253384412987463e+27,1822885251.7672205,1032824080.4027877,22.588588588588589,15610041729764188,26934.258988654881,6.6078766859444654e+32,9.6658681438572102e+35,5.1028701099657551e+24,1.6974820595633396e+35,-1.6779611870210931e+36,3.8499902708500635e+26,2.2071306952649218e+22,7.4792040718877443e+35,1001.6721045369695,-159198147.14187291,2.3076897550935007e+27,372198366.18207031,-2.8985414387422806e+37,1.2696704725559991e+20,-8.3799629603314519e+20,3.5726231994219377e+20,7.1425644582835888e+23,2.936214322733078e+28,3.801460129353035e+22,6.6196642783841751e+18,8.8572247543467213e+20,4367483231.0175209,-3.5169457024255488e+21,46628119363.568176,30047071171.00349,1.101685875394777e+17,-1.1416785891563261e+21,9.8359523536770581e+26,283.92049707365027,276397518320.6214,1.6393287688917978e+18,-2.2639319076946131e+29,366.88091695298903,180600454.54476771,4804.9744740364176,-1.0403695430658196e+40,6.0924760391894958e+37,-1.9031849381229967e+27,6.3138881438405044e+35,198599.20006526369,4.0255847854632755e+18,-7.8518011635379235e+23,1.5775007708249394e+38,5.9076833918298812e+27,1269.6128560993427,3.0734679918332502e+19,6.9063874240425873e+24,21255354.414959367,2436797.8016566355,481689374117.76611,1.1477675771069588e+38,31.98501642621439,-2.8627189461050379e+25,813.71261351441535,339614.06313476438,87416718.72528103,0,3.7412772777209228e+24,1.4814091212035081e+25,2.643092658255928e+24,-4.0487237865862595e+21,7.9818908643340856e+42,4.7508765746227627e+34,1.2634271418397332e+33,4.5804311685994436e+23,4.3504984628002506e+29,8.9871185072005632e+17,-2.1196500960265746e+26,4.2853634193634204e+25,1.4294294294294296,-9.8166556705588972e+21,2.1059177203805322e+22,2996468783.6670823,-2.0757777001368804e+18,3040330.9216052475,-71700926905.714233,4.647850510434683e+23,-7.6260656657816566e+28,-8.7588665134029312e+40,9.0358322377987185e+30,-77176843.105962202,6.8311839998590922e+44,1.4048619007945564e+31,-7.9728129669083995e+26,-739.80307476960036,15.834834834834837,-2.3952138362463467e+24,1.5477505708828782e+27,-6888.8593897301953,-2.9716604373338871e+26,2.6844460339429983e+28,-4.3054367164516978e+33,-1.3773061760680175e+20,9.3940342820527689e+24,4.4362158359252274e+35,7.9696902718294231e+18,-3.9090898614858638e+33,2.679273829657949e+33,5786424446374633,59363258527.702621,563950905.58207393,-7.4406654015539441e+23,363084826.34346181,6324.8550764148085,5300357.7146356944,1.1432544710841106e+25,1.0948860714735095e+30,-2.7020549612815599e+42,4192967308.3980317,2.4130101970301151e+20,-1.8548463932730255e+29,485701993532.71692,-5006.1146107959885,10.408408408408409,-1.9060831937084435e+37,4686610.3074000683,-993723.62544514879,6.9925189986602611e+31,32.228824831667261,-1.2327911974525945e+29,12068210410028204,-6.0657886672940876e+40,1.8269650046877752e+18,-3.9795161763947152e+28,-42947625296.443573,5.3411041964249475e+43,2.2783792969972285e+18,2926.6762255586764,3.6433668965726596e+32,3.0409484230790266e+42,-12190201788953838,1.8051811115250513e+31,-633623250939941.38,-2.2022783935918892e+25,-6.6558177501474061e+32,2.0739745550740064e+35,-122826.8387680634,-3.1976207231967376e+20,-2.0803205777906159e+24,9024323.910593031,-1.3449574289939316e+24,-235278687980299.47,73295936.926146463,237940302008.13431,-5.0255316726838405e+18,5.8479728580056916e+31,225921.75438565665,13025919368192352,4144.8324533715886,1.0398364303040002e+22,-159395211837677.41,-1.195937801671401e+18,-3.2959920150449078e+24,1.7746888877481507e+22,2.6933076756460142e+40,-2.9186388865532585e+39,2168078722.0053244,3803.9323653365163,-2051539058742057.5,5.8730837914074753e+21,4.0941684941313226e+20,14366297954912038,37.774774774774777,5.114735161707488e+22,3.9241194483218196e+18,4.5787361055786866e+23,380047853.08024019,-2.4173801673930345e+32,-4.2872238116012846e+25,2.3357663797563872e+24,1500026353547109.2,3.0504846446954086e+28,5.4040700965469091e+29,-3.3450676722000495e+19,1444801004.5791581,291704.05175890069,1.9756614364633254e+17,-40546998082.642105,9337785005623548,4.6697517685469132e+20,6.4208444336505979e+18,8.5303169287019025e+31,2.0958664565856106e+22,-1.0920490806907446e+21,5.799992224973388e+22,2.4209660745903456e+36,-31935411310.324688,-2.2731094445790086e+28,92959.902432069925,-1.2624507890949115e+31,513290754711306,2.1338540437254089e+29,1.729583245982014e+31,1.0093100401863424e+17,2708417.6287236372,6.5185541865452168e+30,4.5129346342438653e+38,5.9176135765879623e+26,-22383976550972344,-34378607723868124,7.5467870656698338e+34,6.5842466166918192e+20,0.56235909650431226,-1.1022412985902672e+30,3.2064656359611276e+24,-2.2680707942048612e+19,-3.6155101140355002,3.3514590315844311e+27,-1.0672791333035202e+36,1.6307352297345435e+35,34.612612612612615,540.76642408173939,2.7811004485762219e+37,-3.4567418958157613e+40,2.3132309637433437e+40,-39645334.050582379,5.3620970461333019e+44,1.6218074085413154e+21,1549414.4995575042,-1832125.523785925,-49320043.501937181,3.9113789631215832e+28,38457546646431.422,967.37097457818163,-8.7945532661397554e+28,-3.5951042285564177e+22,1.8247317993829488e+21,5.6830900298539201e+39,8.2175270713164794e+30,34200509.594130658,41865762491.760567,-9.7138602764611818e+34,309286265609.74158,20325.169594690193,2644734017.2775536,24962.234520814574,1144202333.5289297,-8.9229028161407784e+26,-8.2940149099129706e+29,2488.6229254318168,-4.6579881168456806e+18,3.19224660215376e+17,11693260655540.898,25.438438438438439,745514360.04161024,1.69224836887693e+20,-1.2941956859074877e+29,5.8518744004447955e+29,1.3900398322301833e+27,3.6874415420115159e+22,1.0828882729771492e+18,9956.3101987052905,-92500604184084.016,543821.09233013971,1.2194709726916563e+24,77127269325271.906,1751.5294888393121,-4.8710154911116583e+26,2458932601383390.5,881.91135279423565,3224984.7956112451,52891317388.13604,1310839904086.8804,2.4202284776286138e+27,-1441.9514633663127,-5.5817207799044005e+30,9.406340512521046e+18,2.2538071822170966e+38,962.51958264570862,4.2643075817750772e+26,1.0579638317305699e+39,-3784637.2042868882,2.0453823126253734e+38,333.27850372895415,6.1603320826826719e+20,917109.35528156476,3.6121017547452621e+19,6.3066343753751482e+27,220091488122695.81,6.262193896043876e+36,-1.3435780331310456e+40,-747989.19500382373,9.0154334734796685e+19,2.4138552967381801,8420.7015655230753,898754760.91477132,4.102820055256691e+23,8.5002934409091572e+39,9.1371832306578194e+19,6897989073510.8477,899.57609196890553,293789450.34437805,27489569126.970047,-6475284873577.1123,136497.49968403875,115291139516.48938,26183515.532516625,2.0229231261884291e+26,1.1350186956053535e+32,9.164205144205256e+34,7.7405156920987355e+39,-2.8542649314790246e+18,-48626660893496448,3.3006312685744624e+36,20205.906483763749,-20282175547.742924,30992514.017551288,2.2676802114195647e+32,4.7336124398770229e+21,876.12909476313439,-5.9424147682906939e+31,593397289108872.88,22.627627627627628,1.8480207630609359e+18,144.14666919171427,-6.7799336961433399e+37,79076947703.539215,-1.4860608493149795e+26,3.6957573149686074e+17,-10618.287650677214,5.8085851586364281e+22,2548401.7946830913,6.876991223499005e+22,6.9572426849486555e+27,-50584843812.237335,93029094.05717048,1.7795128140637237e+24,-1.8593030377804097e+21,5110.1584615211914,38425341050882024,-3.0884498151198855e+22,5.1278582009840042e+20,477080385.6813674,3.0007854730148038e+25,1.5180488910492896e+20,773333875167.96069,146724559041.66711,17879906.842049837,75882787.513657361,2.0383666952571372e+19,5.9301839873163046e+26,-1.4000818408283627e+30,-3.7181661470771278e+28,-3.5567965595654528e+18,876046.29683791089,23044048687101780,-9.169875072565743e+35,4.8947124530008294e+17,4.4930836242888263e+42,125267.35071107653,9.8208645672058473e+25,1.3460212644292419e+32,8.9573251805685325e+17,6.1185861330953003e+23,2.2202163560726958e+21,1.2380173529976621e+25,1.6071806467399786e+19,10151526.551153738,31846513391725.254,7.0944208072853422e+20,1.5120713191304016e+28,-1.6890104829460785e+32,1.021901189401376e+26,-27381808.693874106,-9.1161109699355806e+24,1.4645873137220979e+42,6.2255350430360054e+18,9.0740578753486273e+25,12510144964276922,309304898.60197139,-7.3008260299635759e+30,96949406.897204429,1.5248395385620634e+31,-5.7300740455790893e+34,3.5821372030321504e+22,1.7028106564146014e+37,2.0571319081772456e+33,2167482824.4928493,3.0094912030572253e+37,27.663663663663666,6676956433843683,3087983398543428.5,-7553857124871420,-5.8525976949710975e+23,6.9819509507397372e+32,-1038811619344.6923,52852036824791.188,25453214469411.93,298581671583.23334,38.672672672672675,1.1460028959164829e+26,6.6665035940136638e+32,89151783997591.781,156232508172.47556,1.4470941043712495e+27,2.7555876606749998e+33,61777832266.832306,-3032935598.7971754,273504071116807.81,0.76391081856115517,760765.07854636805,2120046593685355.2,15877137539105.469,9.7559028844861278e+40,3.1325187885019264e+17,8.3020024637095504e+27,8448658591880215,725730.33445795171,-3.0142660299093428e+34,2.459779392312934e+22,98822173321981.656,9.1316844440595994e+17,12830512.534324924,3.6824925954200922e+32,-2.3277380840005844e+31,1.8930793094451162e+23,2.7713811596745439e+35,-38284769.981866673,7.6516222611842196e+25,4.5544525076333713e+38,11739052.617326654,3.1939173398690859e+30,9401.6528551031734,6611603086.1534185,-19523653.257718965,2763633600,-4.9733751564570528e+17,1.5903975185239716e+18,425559319050923.69,1412.5391156922692,2.0488621315520301e+35,-2.5580096598342116e+29,4.0484442107031619e+23,70935990.620578855,-276.00045107092603,5.1884984424302144e+30,21304789.709222399,7.8133490597110413e+17,11343671980013636,-1.2948222923678914e+23,1.3306373302929881e+19,1318710706.5151405,6.012283668005616e+19,1.3665459149885149e+40,-36355706857252080,8881149.3696011286,24.301564991879506,5.2728071334655379e+40,293353179366461.19,172566766649.4418,9.0705224083029095e+26,8.3400975244571025e+23,1110.7610132655179,-98286.489349657757,3.3848305458849954e+45,20984863299880.754,6.6565489589159058e+22,6388143.8508742759,-382281806954.86902,579413921716322.88,3.6676136226124962e+33,2.5680369565454234e+18,-7251.700137336743,-1.7018639897534622e+35,65623483310.105637,1172.1447293236747,2.4198393019845846e+40,5.9984334372119635e+26,6064370635259262,7094622249407.6533,-3180650846782.2227,113557788044.42691,919687850696.22876,-935490956566.36023,-446142004382.84851,7.2070984905592101e+23,2066787303874167.2,2444265.0008549327,8.0851371577865305e+38,8142450022622459,49247458.438119605,2.6230879058727409e+22,1057328139410.0249,12.119092697052229,6.5609451150158773e+40,-1.5608631024381136e+26,37.224251278305339,1.5525243629125213e+46,1.8690434831424877e+40,-6.5151023689472858e+33,-1.3203706501776024e+31,9.1201201201201201,4.016074387476338e+26,-45851190720863968,4.2422493954100142,-5.5538205008719967e+22,20986505.35307746,7.6534345279478907e+19,4.0279902533865073e+18,3297324.0453993976,-8.1354744857080927e+22,8038797977210.0332,420813456.1335398,2.2399781569624587e+28,2.3978360780191711e+21,34610894376015.055,472894.24440246978,8.1258397665760125e+22,1.2052168114008046e+37,17.201201201201201,1.102432155648146e+20,36.330330330330334,3.7043434258952103e+28,35512775675701588,1.5195038793475001e+40,232.94026500391374,-3.512046876612104e+31,5.7216314177474826e+18,5.2484499089425092e+30,2.2041639716751999e+20,2.8582666305975453e+17,-4.9586874464690684e+23,-1.0411464124029857e+21,270.58701674376812,383450304431.64929,1.2763840832991036e+25,936.05486567648734,1.6378990817523465e+23,2.8043822188610572e+26,-3.2414453924485189e+20,1.4809345752395196e+30,34783684.775413617,8.6819814181174083e+25,1.3520313823879708e+24,-7.5667605958796771e+35,22834359425446.094,-6.38365545262592e+17,3.6807860872559801e+32,4.69545991983138e+19,22939354306972.59,3.7039629048937361e+29,7.43579721030637e+26,-1.7872732309374999e+31,3.9325463903030535e+23,2.5753370278325547e+33,9.6528678927667904e+26,714840530441.08301,852296523776.13062,54253178996.148636,3275696527403814,5.0279923741231491e+29,1.8913516134210851e+30,397.41108676243812,1.1304958209566136e+28,12129283378794.51,1.1880455487398586e+17,2034491993.1018307,4.0146051869968354e+33,2.2966903434142953e+36,9988351990378.4023,1.5413787706511173e+39,-3.0193253584457272e+23,5.0189119462571896e+24,191371902093046.5,89662407911.202942,1.5532609786272852e+19,733.89589226702037,-3.2114629186620362e+34,2.3398210115807578e+22,2.6452120710385314e+27,0.084174264354444292,2.0341018179472898e+35,-0.11551068965239909,-8.7757514426574598e+41,1394671391198733.8,1.7697379964168398e+33,11220.495868612026,6345938617382700,-7.0942521724283272e+30,51459.0996062751,-7.1474006306426401e+28,948.26936257285672,-5.5658116130966224e+24,5.3551103785235042e+38,1.3244571939080916,28000.36152925044,6.9637524993562522e+20,2.301576351071619e+21,9.1682384863510502e+20,-2.4758154973460269e+34,7.9337863862835818e+38,463119.38224945066,7.8183504043423492e+34,5.9021912730353746e+18,1.753726260148809e+42,-41788926960.411438,-137092943651.29031,1.7739040233832412e+26,9.7386014884793587e+17,1129367619.3032744,-1.2119072075914999e+29,3.3961832170526787e+27,15487.419655324162,-1.4740909244113428e+31,-13.095308109151144,342173.67314328981,15262670009.034063,8.0636482816478767e+20,1.2094373705072519e+21,-1.3358841837325422e+21,-1.077782976608883e+30,1112124945491.7976,-1.1870150087189232e+26,104352813.46931313,68.709590254702945,23269721609603616,2.3924264935991939e+19,-1.8956205516841011e+28,42832230833983.406,1.8681505767128361e+41,4.141622193734247e+17,4.1857427856916822e+34,3.0828651343276194e+36,52090342306.410973,-1.2724643916990026e+18,1.0465661909095741e+24,10684554568892.225,9.3292464494812082e+29,6.9460626396448858e+17,2.9342495613477696e+20,17.474474474474476,5.9967208060888079e+42,-9.2998799285817231e+34,1.862481508476904e+17,1036952521.3248668,53092094408.47644,23995892.89977356,7.3565997966085771e+25,9.2088607445366446e+21,2030462821521.5574,192709391872.55515,-7.5979760055712488e+26,7.4246122581456739e+27,130531024.24685952,-25387302.369765718,1.0175757497358871e+21,1.7161135057285118e+35,-7.5258120430421876e+30,3.1407435544465807e+34,8839305801.2924576,10996.233728249797,6.3275955407600496e+34,-2.7750268750166142e+27,92590134.14638482,1340858190372.6941,1.4169062920834793e+42,5.5054087277740239e+24,5.2047808486057737e+31,-20054490168170.094,3.9425899338977452e+19,-1.3483778986047541e+37,43612418.465041488,-25520079432.338512,139781309978709.89,1.7748473631783856e+34,0,1060624.1597340347,11475955109211852,-1.7971949131760573e+21,73188.360227564786,8.2665013433044115e+21,-5.5562453972560149e+21,3.4680481133847023e+29,637.21330616851003,-5.858407393566124e+23,2.7662068196138082e+28,5.2663100833669112e+19,13233.275580253505,3890890.2086267485,-907165.7534939443,1572229196.5910017,2.2219650909803964e+29,-1.6621782002935527e+45,4.0013716579565978e+37,8014668156.7847185,-1.0319371304115799e+24,617.78751724697668,265.67784271028052,453718059641955.62,1.7293940085857882,-7.0230796887113508e+30,75942.03605585442,2.6300556242793206e+32,23.36936936936937,7446284113.877573,2.31844050907687e+24,3.0822448558754173e+19,6.9037814629037629e+18,1.4159752457279905e+22,4.6042735577976732e+29,5.031977445976118e+39,-101963182756367.92,88534668312.038208,7.0873820635990576e+20,2.1370221922867757e+29,2880636581006149,1.6545498339298374e+33,6462.6212055706173,3.9594913771949486e+21,23.146944646897396,110167001.69519864,-17695221232472748,5058413552.6357927,4.5802410860044422e+35,2070282099751.769,1.7208554310593972e+35,72293436.917215437,-3.4701849781251319e+22,-46740945024024528,22167941330907.508,141755332066081.81,-217241833282.46429,3.1235615455788791e+23,32.933933933933936,-3.6071891243558856e+20,-2.8298246116749481e+22,20380328236948704,-2.0542456731659081e+21,416379604626307,0.19026331014156833,3.524027753378271e+32,-5100939960031.29,5941806862811926,-1.014806350241199e+40,1.5392532812549632e+27,-121738190675698.62,-1.4484490517879506e+41,1.6192051009094944e+37,1.1209773746870114e+24,-7.6082781711579114e+25,3.4667547402800117e+20,4658008238.4805098,9.7744591727533281e+27,-2.891395732372146e+35,1168465.5795180481,685771.81025040383,-4.3671805000120815e+37,-8.0946064928029745e+30,1.9204034966078034e+31,-12843458.525416207,3.6496729381086615e+43,-309815651.85208654,672354457539282,3.7704125304564794e+33,21977391312973084,8143948252921807,36.564564564564563,201.46676406135867,3.2138939191787885e+19,-6.8137936627883707e+24,2.1906473476327517e+17,416459068831.02478,8715701653.2323284,776646765247094.25,2995835067889.0913,1730711035139.8442,7.2885652268293439e+19,1.5449794653728103e+23,885029.62234344403,9.7110267154955473e+33,-8610545135191241,1.7367277777674169e+34,1.5198532507450241e+28,-1.5562845508590266e+27,-1.985855835613302e+20,1.5959513818225324e+19,1.0719702805772818e+39,56821.440829948806,-6.9081943010075213e+17,1.3616658818704228e+18,147.9239599960321,8.6937351680622281e+19,0.11703156772550569,17786900973341.355,-2464170.6854595272,1.6842268963553102e+21,16678137363467.342,-9.0383473771829363e+19,1.0459714754532357e+23,-1.8191652253799208e+35,1.4104955728555697e+25,4.748802981640027e+30,7.3366995598410551e+38,-1.3621393083142405e+21,9.8670922357796661e+21,518793874853.36115,-2.283177493226336e+33,-10525127.177159088,2.3947047179443605e+29,2.264066534988362e+22,5.5635520304202228e+19,2.5307598987954796e+38,103324.39499102895,1.3450951655238182e+21,-1.2170988925406742e+17,54367.681517222903,7.1650012858573941e+25,-147448150059.02856,507335756.07570547,1.7328420878396766e+22,100686.88188292569,18271.861488954255,629.79161671807071,3.995434711826781,9179986374.4751301,5.6306654645317601e+23,1630303596568210.2,4094295943933038,2684023338610.1528,-1015931298365.6874,1.046966627412556e+31,217255304.62967107,6.885631606297659e+23,1171386.0773141496,-1.1761252934388218e+31,2751417.9338955968,15657338581440.26,1.0138939451451685e+45,-4.0958363812895448e+38,5.4074120748610536e+23,2.5494658090101266e+22,3297935335086235,8.8931470305991753e+38,1.1092747818053874e+39,1387452235.8768823,2.1434364661420155e+25,1.2895106571187305e+35,1.9702841112902518e+27,1672775257763021,224.11910793459913,9.9384751031799644e+18,66447662885399432,3.3111321132508849e+33,1.0460126688449092e+18,35.782763040615471,-3.0575757468575771e+32,1102657488214962,-8.9313430725781558e+35,5037296.6419297764,-9.5415557858751e+34,1.3789755676189084e+23,41084198417722.305,7.5472611254098458e+43,2.3600733008260225e+25,86643407155421.891,47930982380193.023,2.5994145299787873e+35,1.5720846988280165e+23,5.5008768813028789e+20,-829378874112090.62,16.654654654654657,129421757334328.25,-82651598822357600,1.571752728584983e+24,54743096070613.766,-4.0034554945333944e+39,2.0800792016846823e+31,3.3878201930283228e+20,29.186186186186188,6319.4700783338767,4.2984538627028243e+22,19446236654.057526,2.603836922015237e+24,2.2492492492492495,4.5494615286923456e+24,-277564335139.38129,9.7058672691433612e+23,1.3183205927334053e+33,2.0752122463983101e+18,-23649247.979253646,-3.8194481698592313e+25,26188541105.074532,2.261924765546526e+27,889.83444519267471,606.19608797987178,7.0302140939178761e+30,216724.72163213964,-5040127900418.6787,6.6866374815999385e+22,1.1578641065832571e+24,8.7262125951382497e+18,63750804704439.375,45494453240.202934,1.6709330191202258e+28,6373177.409083046,1.0318466303235521e+33,1.0608148414247794e+26,22952.285578267416,42.73505342497473,485018371936295.69,3.9316140282288043e+39,1.4919946006381303e+25,-338.4363941447088,-282766916.4749341,-4.9473139000408335e+38,-1.0336779984927537e+31,1325925447192314.5,8.8893544817093452e+39,4.0382408350181884e+28,6.3873873873873874,5517154992.5193624,1.0835390530693774e+32,2765465270280132,2.1335815984586559e+26,162623.42338906397,18769.818655457526,-32003545570159576,2.4947037944936108e+31,-6.2737133062577799e+19,-1.0400470924019858e+35,-1319666102729348,1.8005059594609407e+37,1.1052316647781456e+21,-3.1876432992874553e+34,9.9860610700291413e+34,-5.1069712623709823e+33,-6.8271109342383964e+20,-4.1126149653353219e+34,1.5655153528901871e+20,33.012012012012015,-5.1280487976809452e+18,-3.6166786744365735e+28,-4.3536628995447137e+34,413.13338563789011,17544647.659798119,4.5603934152227712e+28,1.6299778426652079e+21,2.8588287459283963e+34,20650709659.102509,5.3204811341827098e+17,23222561.995610129,127578.09959301862,2.9692947605664804e+21,12464119.826381046,279403156780.74304,-1.239290602245017e+42,1.4727572227358094e+23,-1.4133748708590141e+17,1.549304080799607e+19,9.5104204067169414e+33,5.0863686628203831e+38,2.8072568533351452e+34,4.5361333541170887e+21,83.697437393565949,4.8717698921599884e+31,4801273381.8189535,6.8495963341506623e+22,8.2613509548136208e+24,1.0510015537421619e+27,34.807807807807812,-8.3072645883358609e+26,31121.72152159195,19087323363.711697,1228453939012662.8,1.0822134688375239e+35,37278856829923.539]}

},{}],34:[function(require,module,exports){
module.exports={"x": [-36.485285285285286,-5.8114114114114113,-25.821321321321321,-9.0066066066066064,-38.402402402402402,-17.393993993993995,-16.794894894894895,-25.302102102102104,-30.654054054054054,-7.0096096096096092,-24.143843843843843,-10.684084084084084,-6.9297297297297291,-39.960060060060059,-29.855255255255255,-2.2966966966966966,-30.294594594594596,-12.481381381381381,-8.1678678678678676,-20.669069069069071,-24.303603603603605,-37.763363363363361,-28.617117117117118,-3.6546546546546548,-8.6072072072072068,-0.89879879879879876,-8.3276276276276278,-21.66756756756757,-14.158858858858858,-13.959159159159158,-17.074474474474474,-12.88078078078078,-29.615615615615617,-37.124324324324327,-39.440840840840842,-33.809309309309313,-10.724024024024024,-11.562762762762762,-12.441441441441441,-6.57027027027027,-2.1369369369369369,-37.324024024024027,-34.927627627627629,-5.8912912912912905,-1.0585585585585586,-20.828828828828829,-0.17987987987987988,-28.018018018018019,-34.608108108108105,-25.262162162162163,-24.742942942942943,-9.7255255255255246,-5.6915915915915907,-4.8927927927927923,-5.4120120120120117,-24.423423423423426,-8.0480480480480487,-22.226726726726728,-12.042042042042041,-18.112912912912915,-10.923723723723723,-30.414414414414416,-13.679579579579579,-7.1693693693693685,-10.045045045045045,-15.237237237237236,-19.031531531531531,-23.824324324324326,-20.149849849849851,-30.614114114114116,-16.275675675675675,-32.611111111111114,-29.176276276276276,-15.157357357357357,-28.896696696696697,-35.526726726726729,-8.0879879879879883,-37.563663663663661,-23.065465465465465,-11.403003003003002,-18.632132132132135,-31.652552552552553,-16.994594594594595,-20.509309309309309,-23.984084084084085,-10.284684684684684,-8.7270270270270256,-8.0081081081081074,-15.676576576576576,-27.85825825825826,-1.1384384384384385,-17.633633633633636,-24.782882882882884,-24.223723723723726,-16.115915915915917,-36.565165165165169,-26.93963963963964,-10.803903903903903,-0.85885885885885882,-9.5258258258258248,-20.908708708708708,-23.504804804804806,-18.592192192192194,-8.2477477477477468,-22.346546546546548,-27.259159159159161,-16.555255255255258,-26.100900900900903,-32.69099099099099,-31.452852852852853,-29.216216216216218,-22.745945945945948,-0.9387387387387387,-25.541741741741742,-3.9342342342342342,-10.843843843843842,-29.935135135135138,-33.290090090090089,-30.334534534534534,-22.106906906906907,-27.698498498498498,-32.651051051051049,-0.25975975975975973,-11.442942942942942,-14.638138138138137,-3.7345345345345344,-11.882282282282281,-18.392492492492494,-14.837837837837837,-39.480780780780783,-17.114414414414416,-9.1264264264264252,-34.887687687687688,-6.21081081081081,-1.7774774774774775,-12.92072072072072,-28.377477477477477,-21.987087087087087,-15.117417417417416,-1.8972972972972975,-21.06846846846847,-35.36696696696697,-7.7684684684684679,-29.575675675675676,-26.979579579579582,-13.12042042042042,-13.47987987987988,-11.043543543543542,-4.4135135135135126,-27.099399399399399,-2.8957957957957956,-30.813813813813816,-12.840840840840841,-7.8882882882882877,-7.7285285285285283,-28.45735735735736,-3.0156156156156158,-7.3291291291291287,-17.194294294294295,-3.5747747747747747,-29.256156156156155,-36.445345345345345,-4.4534534534534531,-39.201201201201201,-28.25765765765766,-35.486786786786787,-23.584684684684685,-33.09039039039039,-26.22072072072072,-3.9741741741741743,-10.005105105105104,-16.754954954954957,-28.776876876876877,-22.666066066066065,-1.5378378378378379,-27.059459459459461,-2.1768768768768769,-24.543243243243243,-15.516816816816815,-21.947147147147149,-20.03003003003003,-14.518318318318318,-1.4978978978978978,-6.6900900900900897,-0.53933933933933931,-39.001501501501501,-25.182282282282284,-25.941141141141141,-14.598198198198197,-32.131831831831832,-36.125825825825828,-35.327027027027029,-38.282582582582585,-17.034534534534536,-35.087387387387388,-37.004504504504503,-28.537237237237239,-33.649549549549548,-24.463363363363364,-14.558258258258258,-39.520720720720725,-32.331531531531532,-11.083483483483484,-10.524324324324324,-7.5687687687687681,-26.899699699699699,-32.850750750750748,-14.757957957957958,-13.919219219219219,-39.680480480480483,-22.506306306306307,-0.65915915915915912,-4.1738738738738732,-9.8054054054054056,-3.1354354354354355,-7.6486486486486482,-29.296096096096097,-38.16276276276276,-27.13933933933934,-5.7315315315315312,-18.272672672672673,-12.800900900900901,-39.321021021021025,-32.29159159159159,-31.852252252252253,-20.109909909909909,-31.173273273273274,-2.216816816816817,-0.739039039039039,-21.787387387387387,-1.6975975975975977,-13.200300300300301,-36.964564564564569,-28.217717717717719,-19.63063063063063,-9.2462462462462458,-13.599699699699698,-6.8897897897897895,-13.000600600600601,-6.0909909909909903,-18.751951951951952,-4.0540540540540535,-19.111411411411414,-1.3780780780780781,-10.324624624624624,-0.97867867867867864,-25.701501501501504,-27.01951951951952,-21.188288288288291,-14.917717717717718,-33.769369369369372,-39.560660660660659,-31.892192192192194,-23.424924924924927,-23.145345345345348,-15.916216216216215,-21.707507507507508,-13.759459459459459,-17.793393393393394,-4.1339339339339336,-9.406006006006006,-36.245645645645645,-13.320120120120119,-33.330030030030031,-22.186786786786787,-32.49129129129129,-35.76636636636637,-38.522222222222226,-16.315615615615616,-10.244744744744745,-2.9357357357357357,-21.907207207207207,-3.1753753753753755,-14.198798798798798,-16.235735735735737,-30.693993993993995,-19.950150150150151,-18.432432432432435,-2.7360360360360363,-23.105405405405406,-39.360960960960959,-38.442342342342343,-38.642042042042043,-13.04054054054054,-27.33903903903904,-25.981081081081083,-39.880180180180183,-13.799399399399398,-9.5657657657657644,-12.161861861861862,-9.4858858858858852,-26.779879879879882,-12.68108108108108,-15.197297297297297,-22.945645645645648,-27.65855855855856,-27.978078078078077,-5.2522522522522515,-33.689489489489489,-10.084984984984985,-22.905705705705707,-21.028528528528529,-13.63963963963964,-21.507807807807808,-26.300600600600603,-36.924624624624627,-1.2582582582582584,-35.047447447447446,-19.910210210210209,-3.7744744744744745,-12.960660660660659,-14.278678678678679,-36.884684684684686,-27.378978978978981,-26.340540540540541,-10.164864864864864,-15.596696696696696,-19.351051051051051,-13.839339339339338,-12.281681681681681,-25.222222222222221,-37.803303303303302,-7.848348348348348,-1.2981981981981983,-2.5363363363363365,-13.08048048048048,-7.0495495495495488,-22.985585585585586,-20.269669669669671,-11.642642642642642,-35.007507507507505,-28.05795795795796,-36.325525525525528,-7.3690690690690683,-38.681981981981984,-17.673573573573574,-17.953153153153153,-37.483783783783785,-7.0894894894894893,-29.655555555555555,-18.312612612612615,-8.2078078078078072,-39.8003003003003,-27.73843843843844,-32.770870870870873,-11.363063063063063,-5.5318318318318314,-21.26816816816817,-18.472372372372373,-15.396996996996997,-23.544744744744747,-3.494894894894895,-5.2921921921921919,-2.9756756756756757,-13.719519519519519,-0.13993993993993994,-18.672072072072073,-23.784384384384385,-26.140840840840841,-2.7759759759759759,-6.849849849849849,-11.163363363363363,-28.177777777777777,-20.469369369369371,-8.9666666666666668,-6.4504504504504503,-4.5732732732732728,-28.856756756756759,-21.427927927927929,-13.519819819819819,-30.454354354354354,-23.305105105105106,-29.735435435435438,-3.6147147147147147,-38.721921921921926,-29.535735735735738,-12.241741741741741,-9.0864864864864856,-31.412912912912915,-0.10000000000000001,-18.033033033033036,-7.5288288288288285,-16.595195195195195,-37.084384384384386,-17.354054054054053,-1.9771771771771771,-14.478378378378379,-1.7375375375375377,-13.160360360360359,-2.2567567567567566,-30.893693693693695,-36.045945945945945,-13.559759759759759,-27.53873873873874,-20.988588588588591,-28.417417417417418,-15.436936936936936,-24.902702702702705,-33.569669669669672,-10.404504504504503,-37.643543543543544,-4.4933933933933927,-30.973573573573574,-5.8513513513513509,-30.853753753753754,-22.266666666666669,-14.238738738738737,-25.661561561561562,-2.6162162162162161,-4.2936936936936929,-16.954654654654657,-39.161261261261259,-10.963663663663663,-4.9726726726726724,-13.999099099099098,-2.5762762762762761,-15.277177177177176,-8.407507507507507,-31.093393393393395,-2.3366366366366367,-6.5303303303303295,-18.712012012012014,-9.4459459459459456,-12.121921921921921,-4.5333333333333332,-17.993093093093094,-8.9267267267267254,-36.645045045045045,-38.322522522522526,-34.648048048048047,-17.154354354354357,-12.72102102102102,-33.010510510510514,-17.753453453453453,-39.6006006006006,-19.870270270270272,-16.874774774774774,-28.137837837837839,-36.405405405405403,-21.747447447447449,-34.807807807807805,-17.433933933933936,-31.732432432432432,-4.093993993993994,-39.720420420420417,-6.4903903903903899,-35.287087087087087,-31.133333333333333,-16.675075075075075,-15.836336336336336,-24.263663663663664,-32.89069069069069,-25.901201201201204,-33.170270270270272,-25.102402402402404,-20.94864864864865,-10.604204204204203,-33.92912912912913,-6.7699699699699698,-31.333033033033033,-2.4165165165165168,-30.054954954954955,-4.733033033033033,-12.641141141141141,-1.6177177177177178,-24.942642642642642,-31.812312312312311,-30.933633633633633,-5.4519519519519513,-0.57927927927927925,-11.323123123123123,-16.515315315315316,-26.500300300300299,-26.180780780780783,-9.1663663663663666,-18.232732732732735,-35.646546546546546,-18.951651651651652,-3.5348348348348346,-21.14834834834835,-19.710510510510513,-34.967567567567571,-30.374474474474475,-15.357057057057057,-36.724924924924927,-24.343543543543543,-38.122822822822826,-27.578678678678678,-4.6531531531531529,-30.254654654654654,-23.384984984984985,-25.062462462462463,-37.204204204204203,-11.722522522522523,-32.171771771771773,-1.5777777777777779,-1.8573573573573574,-16.355555555555558,-31.053453453453454,-29.056456456456456,-5.6117117117117115,-28.696996996996997,-25.581681681681683,-38.801801801801801,-11.682582582582581,-0.33963963963963961,-25.621621621621621,-19.311111111111114,-0.29969969969969967,-24.703003003003005,-25.861261261261262,-37.963063063063061,-35.247147147147146,-24.583183183183184,-36.844744744744744,-21.348048048048049,-7.4489489489489484,-0.49939939939939937,-20.54924924924925,-35.207207207207205,-35.846246246246245,-21.308108108108108,-38.242642642642643,-10.644144144144144,-36.684984984984986,-22.146846846846849,-9.7654654654654642,-36.605105105105103,-12.32162162162162,-12.081981981981981,-5.571771771771771,-19.750450450450451,-18.911711711711714,-16.715015015015016,-29.016516516516518,-10.204804804804803,-25.421921921921921,-39.081381381381384,-31.372972972972974,-0.41951951951951949,-15.476876876876876,-39.640540540540542,-0.45945945945945943,-3.0954954954954954,-22.027027027027028,-10.444444444444445,-19.430930930930931,-32.411411411411414,-16.075975975975975,-17.913213213213215,-20.868768768768771,-22.626126126126128,-6.4105105105105098,-20.709009009009009,-35.926126126126128,-28.65705705705706,-31.253153153153153,-37.923123123123126,-37.883183183183185,-19.231231231231231,-15.716516516516515,-14.718018018018018,-8.4474474474474466,-6.0510510510510507,-23.464864864864865,-35.886186186186187,-11.922222222222222,-7.4090090090090088,-33.449849849849848,-9.8852852852852848,-37.363963963963961,-18.512312312312314,-23.904204204204206,-14.039039039039038,-38.881681681681684,-31.612612612612612,-15.556756756756757,-14.957657657657657,-26.859759759759761,-17.234234234234236,-0.77897897897897894,-32.930630630630631,-0.69909909909909906,-4.9327327327327319,-26.380480480480482,-18.192792792792794,-31.532732732732732,-18.831831831831831,-15.876276276276275,-33.369969969969972,-3.2951951951951952,-34.088888888888889,-31.293093093093095,-8.5273273273273276,-20.74894894894895,-38.042942942942943,-4.8129129129129122,-22.706006006006007,-5.4918918918918918,-30.134834834834834,-34.288588588588588,-5.6516516516516511,-7.488888888888888,-6.8099099099099094,-36.525225225225228,-18.352552552552552,-34.048948948948947,-39.760360360360359,-29.455855855855855,-17.873273273273274,-26.021021021021021,-7.8084084084084076,-8.4873873873873862,-6.2906906906906901,-4.2537537537537533,-27.299099099099099,-32.051951951951949,-34.727927927927929,-11.203303303303302,-18.791891891891893,-29.895195195195196,-28.976576576576576,-3.2552552552552552,-21.587687687687687,-16.195795795795796,-38.841741741741743,-4.0141141141141139,-27.498798798798799,-9.6456456456456454,-5.372072072072072,-6.6102102102102096,-23.225225225225227,-19.510810810810813,-2.4564564564564564,-11.962162162162162,-15.956156156156155,-7.6087087087087077,-2.6960960960960962,-11.762462462462462,-16.155855855855858,-27.418918918918919,-30.534234234234233,-4.6930930930930925,-2.0969969969969968,-19.271171171171172,-32.531231231231232,-5.012612612612612,-32.571171171171173,-29.495795795795797,-8.6471471471471464,-29.415915915915917,-30.214714714714717,-14.797897897897897,-36.205705705705704,-8.766966966966967,-22.066966966966969,-5.2123123123123118,-8.2876876876876864,-7.6885885885885878,-10.883783783783784,-11.802402402402402,-11.842342342342342,-30.094894894894896,-28.297597597597598,-12.56126126126126,-4.7729729729729726,-25.022522522522522,-27.93813813813814,-34.568168168168171,-37.284084084084085,-3.0555555555555558,-31.572672672672674,-35.96606606606607,-21.46786786786787,-6.6501501501501501,-38.602102102102101,-30.733933933933933,-24.663063063063063,-2.855855855855856,-28.577177177177177,-39.840240240240242,-22.785885885885886,-24.103903903903905,-35.127327327327329,-6.0111111111111111,-2.0570570570570572,-14.438438438438437,-23.864264264264264,-3.2153153153153151,-14.877777777777776,-31.772372372372374,-9.3660660660660664,-1.4180180180180182,-34.767867867867871,-23.704504504504506,-1.8174174174174174,-24.982582582582584,-39.041441441441442,-33.609609609609613,-34.32852852852853,-18.871771771771773,-11.602702702702702,-21.86726726726727,-16.036036036036037,-22.586186186186186,-0.37957957957957955,-35.56666666666667,-37.723423423423426,-1.0186186186186186,-21.627627627627628,-13.24024024024024,-26.42042042042042,-23.664564564564564,-38.56216216216216,-22.466366366366366,-35.726426426426428,-7.9681681681681678,-31.932132132132132,-13.399999999999999,-13.360060060060059,-29.975075075075075,-2.4963963963963964,-3.8543543543543541,-37.403903903903903,-36.165765765765769,-27.778378378378378,-34.248648648648647,-7.2891891891891891,-22.865765765765765,-30.174774774774775,-16.635135135135137,-37.683483483483485,-11.123423423423423,-5.1324324324324317,-37.164264264264268,-26.580180180180182,-4.373573573573573,-23.744444444444447,-5.1723723723723722,-15.996096096096096,-33.529729729729731,-9.2063063063063062,-25.381981981981983,-24.822822822822825,-9.965165165165164,-5.7714714714714708,-6.1309309309309308,-35.606606606606604,-19.550750750750751,-26.699999999999999,-26.460360360360362,-5.3321321321321316,-27.458858858858861,-33.889189189189189,-2.6561561561561562,-26.060960960960962,-0.81891891891891888,-20.788888888888891,-19.151351351351352,-33.250150150150148,-33.72942942942943,-2.3765765765765767,-34.408408408408413,-35.446846846846846,-6.9696696696696687,-33.210210210210214,-31.972072072072073,-12.601201201201201,-36.804804804804803,-9.046546546546546,-5.9711711711711706,-6.1708708708708704,-37.603603603603602,-25.741441441441442,-39.241141141141142,-29.136336336336338,-8.127927927927928,-29.336036036036038,-34.847747747747746,-29.775375375375376,-20.189789789789792,-17.713513513513515,-21.228228228228229,-19.071471471471472,-25.501801801801804,-15.796396396396396,-17.513813813813815,-3.454954954954955,-18.072972972972973,-12.002102102102102,-1.0984984984984985,-32.012012012012008,-32.371471471471473,-5.0525525525525516,-11.283183183183182,-27.898198198198198,-37.523723723723727,-9.326126126126125,-18.152852852852853,-23.025525525525527,-19.790390390390392,-19.470870870870872,-30.574174174174175,-1.3381381381381381,-24.623123123123126,-13.43993993993994,-4.3336336336336334,-3.6945945945945948,-22.546246246246248,-22.386486486486486,-37.244144144144144,-6.3306306306306297,-1.1783783783783783,-23.185285285285286,-34.168768768768771,-38.003003003003002,-12.52132132132132,-1.6576576576576576,-4.8528528528528527,-27.818318318318319,-19.390990990990993,-24.024024024024026,-32.451351351351349,-35.406906906906904,-11.243243243243242,-34.448348348348347,-25.342042042042042,-34.687987987987988,-16.914714714714716,-38.482282282282284,-26.260660660660662,-13.28018018018018,-10.484384384384384,-34.009009009009013,-3.8942942942942942,-7.209309309309309,-34.52822822822823,-32.730930930930931,-5.0924924924924921,-24.862762762762763,-22.825825825825827,-29.815315315315317,-36.085885885885887,-31.213213213213216,-6.3705705705705702,-3.4150150150150149,-1.2183183183183184,-20.309609609609609,-2.8159159159159159,-33.409909909909913,-39.920120120120117,-21.827327327327328,-34.208708708708713,-12.201801801801802,-15.317117117117116,-39.281081081081084,-37.044444444444444,-19.191291291291293,-31.692492492492494,-35.16726726726727,-17.553753753753753,-10.364564564564564,-8.8468468468468462,-1.457957957957958,-5.931231231231231,-33.130330330330331,-33.489789789789789,-39.121321321321325,-32.211711711711715,-22.306606606606607,-15.756456456456457,-14.398498498498498,-20.069969969969971,-6.2507507507507505,-26.62012012012012,-4.2138138138138137,-37.443843843843844,-32.810810810810814,-29.375975975975976,-34.368468468468471,-21.387987987987987,-31.013513513513516,-7.2492492492492486,-10.564264264264263,-28.816816816816818,-23.624624624624627,-30.015015015015017,-23.265165165165165,-3.8144144144144145,-28.097897897897898,-14.118918918918919,-2.0171171171171172,-14.678078078078077,-38.082882882882885,-38.202702702702702,-38.76186186186186,-8.687087087087086,-4.6132132132132124,-28.497297297297298,-20.42942942942943,-15.037537537537537,-12.361561561561562,-29.096396396396397,-20.22972972972973,-15.077477477477476,-0.61921921921921919,-11.003603603603603,-8.8069069069069066,-30.494294294294296,-36.764864864864869,-36.285585585585586,-9.9252252252252244,-40,-28.337537537537539,-26.660060060060061,-17.473873873873874,-28.736936936936939,-38.96156156156156,-26.81981981981982,-17.314114114114115,-31.492792792792795,-34.12882882882883,-14.358558558558558,-23.345045045045048,-20.589189189189192,-7.9282282282282281,-9.685585585585585,-22.426426426426428,-19.83033033033033,-32.970570570570572,-26.540240240240241,-17.833333333333336,-13.879279279279279,-25.461861861861863,-19.590690690690693,-14.078978978978979,-33.969069069069072,-24.383483483483484,-18.552252252252252,-27.219219219219219,-35.806306306306304,-24.183783783783785,-8.3675675675675674,-27.618618618618619,-8.5672672672672672,-29.695495495495496,-3.3750750750750753,-36.006006006006004,-6.7300300300300293,-33.050450450450448,-24.063963963963964,-26.739939939939941,-39.400900900900901,-20.34954954954955,-0.21981981981981982,-36.365465465465469,-23.944144144144143,-33.849249249249247,-21.547747747747749,-9.8453453453453452,-16.435435435435437,-1.9372372372372373,-34.488288288288288,-12.401501501501501,-20.389489489489492,-18.991591591591593,-30.773873873873875,-17.274174174174174,-15.636636636636636,-21.108408408408408,-25.781381381381383,-10.763963963963963,-20.629129129129129,-25.142342342342342,-8.8867867867867858,-11.522822822822823,-28.936636636636639,-16.834834834834837,-9.2861861861861854,-37.843243243243244,-3.3351351351351353,-14.318618618618618,-27.179279279279282,-9.6057057057057058,-19.990090090090092,-12.76096096096096,-11.482882882882882,-10.124924924924924,-35.686486486486487,-19.670570570570572,-17.593693693693695,-32.251651651651649,-16.395495495495496,-32.091891891891891,-14.997597597597597,-7.1294294294294289,-24.503303303303305,-16.475375375375375,-38.36246246246246,-38.921621621621625],  "n": [33,6,37,34,6,39,37,9,26,13,4,22,12,8,22,40,39,40,39,39,7,30,39,40,39,5,20,32,33,12,6,1,17,5,37,26,32,36,39,21,27,32,2,15,34,9,38,28,28,16,31,30,30,19,16,17,27,7,7,13,29,32,2,13,12,35,2,6,4,40,33,33,28,6,13,31,39,20,2,27,18,6,16,9,31,3,32,2,8,17,20,19,18,20,26,32,29,37,31,33,12,29,28,1,27,29,7,26,5,19,20,31,39,23,14,36,24,33,9,1,31,33,11,33,21,38,28,17,36,17,39,24,22,7,6,31,6,10,11,33,34,40,11,14,33,12,10,1,38,9,14,37,8,34,11,39,25,32,19,40,15,3,34,32,24,24,22,30,37,28,12,28,31,16,31,23,16,9,23,22,4,17,3,15,22,24,32,15,38,39,6,7,23,16,19,16,1,30,14,16,7,38,32,18,13,35,22,25,7,5,25,19,11,14,27,22,28,29,30,40,19,29,4,37,10,21,37,23,7,21,34,19,22,22,40,18,4,35,18,25,5,20,39,40,1,2,31,40,33,15,35,28,4,14,16,35,11,2,33,27,18,30,37,6,8,40,11,4,6,12,6,33,35,4,24,26,22,1,6,28,35,22,25,18,15,8,21,6,17,16,4,31,10,2,5,11,8,21,10,33,17,40,2,33,37,13,38,2,20,10,20,22,14,36,37,14,15,2,5,7,32,36,16,9,10,11,17,20,4,9,6,20,38,39,39,27,24,31,3,18,10,23,15,3,33,13,1,17,2,37,7,33,26,11,30,6,26,20,19,16,22,29,12,12,30,25,8,33,28,13,8,16,15,14,26,33,32,27,4,16,38,19,32,13,20,37,18,20,18,31,13,5,21,16,21,35,33,15,32,37,26,22,16,6,33,8,22,38,15,40,38,10,36,1,23,16,25,32,24,20,9,22,13,1,19,37,10,8,34,36,8,18,10,6,7,10,10,32,18,19,13,4,37,26,18,26,8,24,37,30,40,15,18,28,5,29,11,7,17,6,24,18,11,2,25,32,29,7,9,34,5,13,12,27,13,17,17,32,21,5,4,40,11,8,33,31,2,11,38,10,30,5,20,14,24,12,10,39,19,9,39,25,22,10,21,8,10,17,20,17,25,7,28,12,16,26,15,7,40,31,2,36,36,39,37,1,32,24,4,31,11,14,14,6,28,12,6,34,29,10,5,21,27,1,20,1,32,12,29,4,37,16,36,15,14,29,28,3,8,21,2,17,30,28,21,11,20,17,37,11,25,38,25,19,35,25,33,20,24,21,8,10,10,14,36,21,2,24,20,13,7,39,40,10,29,30,21,13,19,13,3,39,28,22,2,35,3,38,21,27,4,12,33,3,33,10,29,29,6,8,27,17,21,38,39,6,26,26,33,19,19,18,18,10,34,21,4,37,6,4,7,29,16,25,34,8,33,16,3,12,16,35,22,37,17,25,27,8,26,21,12,33,18,15,1,33,40,12,7,7,5,20,15,8,8,35,20,9,14,25,39,36,37,16,3,38,30,7,11,39,17,23,22,24,38,6,17,23,40,23,13,13,29,5,27,30,22,10,28,33,27,8,8,13,6,36,40,27,7,30,2,3,23,6,36,4,27,1,8,19,15,26,19,22,40,20,7,14,35,11,26,10,16,7,8,24,18,30,20,36,5,29,24,10,10,20,16,1,24,30,11,27,12,4,25,19,11,40,33,22,40,36,30,31,14,9,24,37,5,15,37,34,36,14,33,14,11,27,24,24,1,2,18,31,13,20,7,20,8,18,17,16,4,32,24,39,19,30,28,26,28,3,26,26,2,22,3,12,13,14,22,26,27,40,17,21,33,29,29,10,39,14,22,30,14,28,5,28,25,4,32,19,17,28,4,3,11,3,7,22,12,11,18,20,22,6,19,4,36,5,21,39,38,31,26,11,39,29,10,17,28,19,12,3,27,25,28,20,3,37,11,38,9,37,27,13,34,32,14,10,32,18,28,21,1,10,25,29,16,40,37,27,1,11,19,19,17,1,19,18,31,39,13,13,32,9,19,10,2,33,8,20,29,17,19,9,7,22,14,29,25,12,8,22,30,31,10,14,37,33,11,35,31,1,8,36,12,24,4,4,24,37,28,37,22,40,18,37,26,38,26,38,28,1,26,32,38,2,9,24,29,26,10,14,5,5,25,5,19,39,19,22,27,27,31,29,15,3,27,9,17,18,34,1,34,3,11,14,25,13],  "expected": [-3.2965650042096897e+56,289006.4973211271,-1.7279320724457932e+60,3.5218676930137397e+46,4658199242.0478439,-9.7538602644065962e+59,-1.6037998652121354e+56,-15374794327983.229,2.1636776181368877e+42,-170742400294093.34,430803.1531929464,5.0585092609960125e+28,8260507136971.0791,12585836602014.383,1.6181401139375895e+35,8.6867428391346917e+49,-3.5919895345557313e+65,7.9345016094036483e+58,-1.4805619038135425e+54,-3.9994771255533679e+61,-11100570782.933876,2.3049569908626699e+51,-8.5860195899727997e+64,4.1546806908223291e+51,-3.239114017782828e+54,-94.488712335857869,3.2893564866221822e+24,6.1702659802419178e+49,-1.0747677882283173e+48,2427029978183147.5,54973946.75151816,-12.880780780780782,-5.219982197157493e+26,-91372197.870162204,-6.3751895535337584e+64,1.4310826098921235e+43,2.6253501694113216e+44,3.4630141738008298e+51,-1.454566780492417e+57,-8.0500952721725065e+24,-4.5270066164465279e+29,8.1698970915437023e+54,1254.8667993218444,-17560834434899786,3.7473810259705836e+38,-3414021155386.8135,5.1461796780903345e+42,1.1808400712824102e+45,8.436617619127233e+46,1.4994164414109191e+24,-1.6571609542966397e+49,3.7904144868190396e+40,4.8109163183989621e+37,-9.0149843771153462e+20,1.865335290227263e+17,-3.9677530539749357e+25,-6.302480787634785e+34,-6359444853.3481283,-163625043.55551594,-7.9389212192873382e+17,-5.0799001430309027e+39,7.7718836020594705e+52,200.81047705363019,-203178540921124.91,146058213782418.5,-9.3237391504594159e+51,381.23072396721039,328578808.50740701,218523.45977327632,3.2638203218927477e+67,-1.2979100288584971e+49,-2.3839109507079887e+55,2.6302557865051735e+45,29462259.755107183,-1.0553690848193295e+20,-3.9083394792753268e+52,-1.2812851741533213e+54,2.4413163981844053e+33,555.0811626040454,-6.2998880567932623e+36,4.517020745522545e+25,1574976112.9555452,1.2530283073810465e+22,-3034408918019.8735,-8.8106539913569288e+48,-1425.7534254312748,1.3169902471788231e+43,72.13790357925491,17260362860.07465,-2.2799745319368677e+26,3.9464916512920033e+18,-7.9733979477941984e+26,2.0084443558021699e+27,2.6807975134642013e+30,2.8667081163657672e+37,5.064254008099015e+54,-3.0107087962201106e+46,-5.2938256773699227e+52,-4.5776731799454356e+33,-1.8854178004129117e+45,1.036923587810663e+17,-2.0894612925019128e+45,5.8860208838339599e+41,-8.2477477477477468,-3.2160304548494926e+41,-3.8104186319053188e+46,-1053894753.9750373,1.0733844455049043e+41,-50035313.608455434,-2.8518115792374558e+30,4.5660661030340728e+31,-3.0495413247363475e+48,-1.5669535290619164e+46,-5.9493597415975605e+35,53312174003456.141,1.2009376614961432e+51,4.6516051772485079e+38,-3.8385217051684281e+55,-64635731353435.125,-22.106906906906907,-1.717801118927694e+50,-2.4521418401878397e+55,-1925939.8850160937,-3.1025678958132882e+46,-8.5499472328572236e+28,2.8672836835076444e+48,4.4174648357088666e+38,-1.0810536144804104e+24,2.847855257984446e+53,-2.8915066275310995e+28,-6.9696037766503583e+59,7.7261206691122034e+30,2.2783143538953998e+36,-4734324.9645776497,3488.6831570169466,-1.1423630367512967e+44,858725867.03369224,160153229439306.19,-190076907311079.53,-2.136185476869912e+38,1.0144591976917344e+53,1.4846342958422797e+69,-1028613762937.0033,5.7891270317595773e+21,-3.3824391708575324e+53,1404201166662248.2,3098487236768.4165,-11.043543543543542,1.515393479788846e+49,-26376307364977.836,8583722868269.667,-1.1855535278981517e+62,4692800805.1809883,5.4794312046691349e+45,-991399677389.34631,-7.4698664773950754e+64,-5.6513495947988413e+27,1.2953171111701937e+42,-5.7278156708355751e+26,3.3691697627041952e+51,-2.2073577630191494e+23,-52466.69121933818,6.5462505036590151e+42,2.5860728883163152e+55,1.6734776673759297e+38,1.0280944211086672e+40,3.510572716341871e+33,1.2687261843957876e+50,-2.4713621544293189e+60,1.2948723731681484e+33,141380847793035.84,9.9519765431867447e+40,-3.8579981091417826e+50,3.8851838692715274e+23,-5.948813724613845e+34,-1.5653309955183733e+36,542782472007219.25,-12117718855732.02,-2.5653686686968637e+32,1.1392377898258657e+33,213713.07179565547,-6.4631195182582077e+22,-13.087720819648204,-48735544619346808,1.6341721995752859e+20,6.0213217266764672e+40,1.333949742176159e+51,-5.1187488554471867e+22,5.4951385328047935e+56,-1.6197214777084945e+66,3301530387.7157707,-120333616444.99872,-6.917670910156829e+38,1.2873886708102209e+22,-1.5044999115289423e+31,2.1718222834534006e+26,-28.537237237237239,1.8232533418324299e+50,6.6000375301026506e+20,2.1830984903547494e+21,-249364664218.65982,2.7027579457001603e+64,4.3499615411395018e+44,5.1898072933392854e+22,-310455764354521.81,-1.1565596822086598e+57,8.1204348673537777e+35,-1.8335459079391652e+35,-377709279.18326157,-125433176.21370403,-1.5865521900393667e+38,-32410865593517808,-18533964348.287777,59662494645266512,-6.150200255708613e+30,1.0777798999164171e+27,2.8536095617202735e+45,-4.3407318531668813e+49,1.958744560918196e+48,5.6219619789125808e+53,-1.2765267887639566e+27,-5.4937713441256667e+40,2772576.1826560576,-3.7800190379830366e+62,3905539116545430.5,-7.2671570789492443e+30,-1.5774273443103148e+62,-1.1173985420985581e+24,-2412.4724973565058,-2.3778860817060969e+31,3.8709877849764353e+39,-2.0637115606337998e+25,6.2140466892938461e+36,6.3464401069223445e+34,7.532896853552617e+62,1.3201066843284429e+22,51414.984718940716,-3.7849882854670037e+46,5.540586199082742e+23,-2.5813846379186044e+30,-3803928.5630026599,4.7732776148881166e+21,-7.1807277286118192e+60,3.7274497228497329e+48,-10.324624624624624,1.936490634778923,-3.6114148854854212e+49,1.3742077385188665e+66,-2.1037930981384641e+51,-9.5654161304120361e+19,-2.4207719088020428e+59,1.4115210133051553e+48,1240523.8213963751,4.0586239430644721e+20,5.0300458714792584e+23,-2.1063715675251524e+52,-4560930163389142,203.08218407596783,-6.8640096751848225e+49,-5.8922458243678497e+31,1.5765470210103492e+22,9.2740963345155702e+50,-1.9667618663471608e+54,2101440754.3442302,183551471138.56573,1.5438605634539143e+68,-4.9988667036061274e+17,2561689.7482066923,43281204.995431237,171633608213742.69,18631.554045735258,-4.1441935662664241e+51,-1.0991839473824379e+43,60123.159944037092,1.9425502448745433e+34,2.2180527515432204e+42,2.6483174702819885e+32,-18.432432432432435,14470.469592938874,2.9461491638027085e+43,-1.0784853952247219e+61,1.2346685618940579e+37,-3.1669731437767862e+42,5.7412623457490521e+23,-9.6496659126550109e+22,556926036858.90112,-3.8759440546462465e+35,18137938.788424555,-7.0737716122997555e+20,3.1391330649320849e+20,14264.839236205085,-8.4695611511835273e+49,1941998408160.1992,246.15514243973703,-9582408.0209992118,-42793979838778536,943665691332.75818,-9.9490959835377285e+23,6413467367084356,-4.3961068326493452e+45,-1.7208256038509154e+25,3.5273771929486921e+63,199.67940913886861,-2.8488417753753989e+51,-2.6535457474442551e+60,-1.5980420686455321e+21,1.4853687385627359e+45,1263.3710200290379,1.5737000536842019e+29,761791970.8589884,5.2905074216595978e+26,2.1685927898622509e+30,7.8751568920208982e+22,1.0784912990819796e+59,-2.7494633213119121e+60,82639147667096256,-1.5398903642196856e+20,393.81422783143501,-977171.52519441652,-183131396.22403291,1.3789591040767997e+51,2.8443820223076916e+62,4.3095396147111501e+18,-794757.16120964184,109797738.75952448,-56775726543207.68,-3.8259539468757697e+19,1.2385960656244787e+30,223414.52746073288,-49455071746.915741,2766961858.2663398,2.4514872482173084e+31,5.4781536850796981e+65,-3.3760954726647877e+53,-2.2206666974128413e+68,-5.5008579949857786e+39,9.0318950833804905e+34,-1.3181039464101034e+53,-521.2854100068198,2.4805294004379832e+28,35223378278403.922,-7.0281507980231671e+28,-1.0610983413533822e+25,-23706.275904343569,-2.6683750348137565e+55,-9511088677854620,-5.5318318318318314,-6.6465415323795646e+24,359.70091343595846,-2.9312489097698164e+55,-9102858365.7336235,-1.8356874077968687e+40,1.9169947177120209e+31,-2988547331.1921701,6.9740278445051149e+42,22.808601839221932,3.108328794333345e+38,2.0454959556701337e+30,-1.8532638285888502e+29,2029356785906586.2,3.3876415243191573e+26,-6.9726129019955162e+39,1.9974811449852703e+18,84479143396782544,1.2334390291214624e+40,-4.7095917535968007e+30,12743114.800760379,-1.4908526136868849e+54,7.3569933160621904e+42,-46652214406705720,1734687388481.2397,5.4770975948509387e+23,-2.6955927471201226e+23,31369585045778.184,2.1008987809669124e+44,-2.5069396028078012e+54,2.0836874062078615e+45,-2.8989376277843673e+35,1170744.2860944648,180858689641.59909,3.7081658568576501e+58,-4.3682949025011128e+22,3.8222749352700511e+47,-1.6777342940006688e+21,2.3500852138337377e+28,-4.8579798333344525e+44,1.9709142657401171e+24,2.4962353858221994e+19,6.3851015329811679e+23,-5.660893491958323e+35,-2.1931697721285136e+20,-79440141.286335543,-3.1232331245018349e+28,4.4841878601003026e+24,-1.3639822910387974e+31,-4.0641509925365812e+57,-4.959413489633583e+48,-3.1381002358114109e+22,7.1080229742238757e+53,-2.8628910164716523e+52,1.193063509961119e+44,6.6839762408507723e+24,2.0514839195174811e+25,297828.35535814101,-6.7131154537663166e+54,188205504672.81619,2.0874399971498332e+30,9.3737045330167595e+61,-82279313237631.844,2.0856886311344124e+52,1.045085957105858e+58,24633655856462096,1.4365088561085081e+51,-4.9726726726726724,-5.968507573706665e+31,1330361855698384.8,-3.0836862708383147e+35,7.8931996782260706e+42,9.1869967685420349e+38,1.2060771358299595e+20,-1195785087.020165,1.0157479717601487e+32,-1903095098109177.2,-12.121921921921921,-4.8849810789586357e+20,-6.4393479019576337e+56,149972755013.87076,6658559477273.9473,7.6038453884839625e+58,3.1521658846467468e+61,31512189127.2118,4.3099340993375285e+23,5354645855639356,67557418.223927528,-252669775825.25616,68874770720805.68,18161837738151.215,1.4163116158695318e+52,4.8816349733126641e+29,-1.3600290277285749e+28,-8.2366366071454774e+20,127622.17137408453,-2.4485015675319981e+62,1.7980141109122096e+30,1.7882734953228374e+30,1.5837865919336543e+32,5051454085092.6641,9.4018529093526903e+38,-1.3911085473343703e+56,7.6653589313507193e+43,9.9576692824131976e+64,-9.4287962487269419e+23,3.6944691833539874e+27,3.5144940365925749e+46,-14523652.414683422,-2.3894930419673876e+44,-10562145944552.418,-92707234240.462479,-2.6641908669861249e+19,1488395881.7930992,4.7761629194537092e+25,3.0025360732278759e+28,-38960196877.299782,172.43959049139227,-1.2900320692511046e+26,1.0922799674439727e+51,-8.9503441664311403e+47,-51181879066.994347,-419847315.33804196,4.3363487179525321e+37,-408016.82784254442,-3.178733786399399e+17,1.0744966684600257e+18,-5.9231480062935123e+42,-1477114930483097.8,-9.7131983171030601e+23,-6.7937102577779774e+27,4.5251501986020193e+48,-4.0745311373667546e+22,-6584680.5373792415,201273.04166620297,1.0927965623215409e+69,-1.0383992746159875e+17,15059227092.464161,-3.8514452496820761e+56,-1.1904327021468234e+49,1491.4724428031639,-41645860187784608,2.6559221289617525e+49,2484320153105098.5,9.924886346480053e+46,-14416660.931577267,2.0892640203178207e+33,3.1099250758426502e+17,1.7014608662188646e+39,2343714800.6333885,29749095.802728012,-2.7522995349262412e+59,-2.3533032608471046e+30,-45847804312199.164,-9.7216119992952945e+51,-1.1576723005445369e+40,1.2832880873178773e+34,22670854008027652,-4.7271149578522337e+27,3833.1857500911137,587323379418342.5,-1.9742515928472062e+24,99167808777940256,-4.607120548600221e+25,-1.7831169737413381e+39,-191918081017.05988,1.234060922336024e+47,5.0718135071491923e+17,2.0490895353364415e+26,3.0027691341291133e+39,-1.2009580422210005e+17,-1053.2647656478637,2.0930386386991279e+63,-3.1895320373254113e+52,1320.7996161927692,3.9879963779442565e+56,3.8223189207165383e+62,-9.6087843041449074e+55,-9.6322011790446827e+63,-22.146846846846849,6.5095939417956425e+43,1.830662824233847e+40,36018.190489004985,-3.9170610774420579e+43,-107737602045.36334,6.2324752800169468e+19,3.9101121687896973e+19,49145185.006130859,2.3584972813446989e+45,166213523725228.06,468577901.88762546,1.2326139909959318e+59,-6.70072257309345e+47,445777.31483658811,-1603872.8452191595,-3.4977397646948745e+35,-9.4685044569221251e+26,-3.0954954954954954,6.6649955979973782e+29,-10.444444444444445,7.2993694294816143e+48,8.3844201348582052e+18,-2.2021216280404874e+42,141091.52338496849,-1.4545408186194623e+58,3.8017242975500886e+23,6.3053453828038052e+47,-3.616935438494972e+21,5.743777483508711e+22,-1.0437994181445728e+47,1.0444710013197567e+46,-58929.9787096824,8496719099959.7949,-3.7938177009022857e+30,262.72540793045295,-7.5678486579404467e+22,5.5513547031828282e+39,7.933198613471953e+34,-7.2856065127689997e+31,-5.1638922425006829e+17,1.9044344818461184e+26,-6.0167653486534566e+19,-9.1392472066563509e+62,-6136197239428.9238,-1.6486006603510097e+42,6.4148009132561708e+58,-4.4794896723019008e+38,-4.3728970684763947e+25,-7.9165276466711239e+60,-6.8880510599250887e+40,-5.70106841276557e+48,3.2644036282443835e+27,6.8882362537663886e+37,-7.9656075229660342e+29,21194.804372669907,5241039953384016,1382149.5869782052,242505216503086.62,4.5667241966912865e+58,-1.7108401227359766e+30,1025.8459663266872,1.9072646722157474e+35,7.1300340831586509e+27,-5.1456522179406981e+20,-265385.54645995848,-7.5524071578215147e+66,5.7683073076074148e+67,109169658818.72287,-2.0020766313754711e+44,2.7174974614561274e+51,-4.658542931815623e+23,-8.0341604317646643e+18,-2.3766281661298419e+21,-1.6690812002699615e+20,-43909.043263319349,-1.0593389404088019e+52,9.1358581234265341e+35,3.1909470664805233e+26,1370.6173029786544,-3.3323683575772403e+53,-43020.090135678431,6.0538846380874492e+66,-2.5620489696595971e+33,-6.638206634079794e+39,571771.8007586411,20070152998683.492,-3.6355300569916504e+44,-380.23992714820702,-1.1140408395105293e+41,1014616260970563.9,-1.0468127224871723e+48,-5.685581128140092e+48,6315925.2498276597,58431762021.055649,-7.5112828412024517e+43,-3.8807077482668871e+26,-2.2611948369411014e+22,1.7795631059596619e+60,-2.2560045940075279e+59,4967134728.7349253,1.5185276423705308e+30,2.8062078269597084e+41,-2.265457894163904e+45,-1.9672225110540042e+21,-1.2537455322298719e+22,8.282287964635399e+26,8.1928690947837726e+25,95217970.404337376,2.8447212514445363e+48,-2.7397726682392327e+29,6676.925392179407,-4.3389807338983411e+45,8058413.8170040445,96396.362198442119,-23736163629.148106,-3.8233009833483985e+47,63158421162737656,-5.3045373798940942e+26,1.6694633303859318e+52,2795005527672.832,-5.8900886469716679e+41,3.9698795651071767e+25,-28330.397938539983,44042650675544.977,1.048260074556349e+25,-1.6968277616044602e+58,3.5378776187133056e+30,-6.8615244073666729e+63,-2.9720571414341386e+20,-1.1340555238754356e+38,-5.1549882128694804e+32,318777061.55587447,1.0757839870485366e+33,-1.993606799727011e+27,561890343913738.62,-5.3760651093349357e+46,3.0600851164024374e+28,-1.4679411957409641e+23,-12.56126126126126,-3.5273839097221094e+41,2.0901438901283543e+65,1.8317457391582979e+18,-104573451981.2175,-170678838833.6138,-2676.6687914909658,1.5272242759271911e+32,-2.9083478387668529e+24,145986256610.44858,90987030.086296201,-6.6013696400647867e+60,1.0021929917968e+32,-12587218670097.203,7948990900065.958,-1.0727613105107722e+40,-4.973992825297068e+68,1.7032815969623036e+57,-3.5504932892977179e+59,1.0812997969944495e+26,-337.62481618655693,2.4534305352827767e+46,1.6125775380658617e+43,-9902814291.7721233,-4438462966.0060892,-4.1789176153092613e+58,-1.3680413554079085e+27,-3.2750430748030738e+29,4.6778864051630385e+21,7.0409819167588664e+39,1.4759003382796908e+61,3734.5641410902967,-5.3423945855298473e+25,-9.8948695343975655e+38,3.783376964718888e+68,-9.7156868174970709e+37,-1.1994074983587116e+18,-11467946987762434,-5.313839562296281e+44,-1879295.1386329001,-3.8970991105530372e+41,1.3681360992690587e+31,3.1791817825027797e+36,17597232321240002,3.2792589378214263e+29,-3.1893997906918224e+51,-5.6051720155229689e+37,627337084167.90527,288127250175.30865,-2.6093536218374928e+21,238786994.67786616,6.7922664180071953e+61,4.8384342022636946e+55,-2.7408803059927129e+44,-302691803.20727021,4.5404446361077332e+42,928.48020083146207,-39.246307476943706,-4.9943190003998979e+25,4015152280.9804883,9.2416643774804572e+61,732689.53078575933,-1.1095298155523093e+45,-7.2891891891891891,226524534610.59885,-1.5311481364970753e+30,-3.0982230711462946e+20,1.2186061544156647e+44,-2.7664848976307434e+24,2.1211915955765249e+25,5.7226090180393248e+69,1.0759913192434827e+31,-899301.01234309154,4.7222887359421723e+20,-1.2319396215808913e+45,-307758634093028.88,1.2172864998498988e+43,186157519852.72641,1.5915049574183763e+24,-12674131950.566025,959523309.09419835,5.0013429877610961e+28,2.6019969414461591e+20,6.2663962678122865e+50,1.2179596524567727e+29,6.0265177242872696e+58,-18557329.2489575,-6.9708378426971077e+35,1.0118962986575639e+38,6758845352135987,135315282.65884927,7.9887909435709346e+30,11022772944355.547,-20.788888888888891,2.4879992128615936e+35,1.4078728364308659e+50,-2.8342114457856531e+17,-8.820326600325146e+29,1.5600723122232039e+19,1860002.6065528106,-1.0886517033991134e+31,-6.4921515267044897e+30,-1.6944254442796362e+17,9.4552318838430919e+58,-4.0557514597000231e+56,6.9809872997583257e+27,9.3791603204635578e+53,3.9276550260201627e+47,2.0971040011505617e+51,-3.7289008921493075e+49,1.6615782433927888e+23,-46860867085411.32,1.9585096187953619e+30,-3.5738999339516783e+61,-67678920.40402104,-2.7405227796706077e+23,-7.1480934666130876e+57,3.1960857368797183e+51,3.6802181284232972e+56,4.2785076257185153e+19,-9.9925367535041379e+52,5.9274482482125363e+18,-674472115406320.25,-1.3080523550637421e+31,1.0015770039881961e+35,2.5948105798283675e+32,-1.0984984984984985,1056.780925069213,8.7428552502837114e+28,-4.7973425623980752e+38,-8930369218572984,2.2464051882904746e+31,-177932391357.62213,1.1169363070884829e+25,46182102578.751724,7.3687024139824324e+26,-2.6800979148838046e+24,6.1667294222291642e+22,1055760.6936100796,9.5850138667633819e+35,1.5445835989004773e+37,-6.0016410174617733e+57,-3.4369207667739132e+20,7.1790051755030688e+35,1.870217194467564e+43,6.8634607586007096e+39,3.9182745280786364e+47,-386.60386438520317,7.8341818084199175e+26,1.2728105234994707e+40,1201.6735279423569,1.0089943686512571e+37,-2458.529532052843,2846539379.5060868,-12117279832408.689,2.8503029770720741e+21,1.7273126090706651e+32,2.3954091260824625e+40,-3.7743687892173826e+44,1.5306250942357167e+69,-3.7857215859813825e+21,-3.3028481886519681e+34,-8.7330432427276598e+52,-5.5478604343258796e+48,-5.2428272890336251e+42,21045498317187456,-1.0410421666196767e+64,1.0374751869539804e+18,4.0148972524855493e+28,2.2964285917569968e+50,49960089089789.359,5.7983623574135815e+35,-64790831.012446426,2.6740367708899179e+46,-4.3795785138017231e+29,481281.4864463869,1.7598025689237837e+50,-1.2805503260866192e+30,-8.0722602722904002e+27,1.0178008167883631e+46,3682.9899832739352,-81.644036391124231,-74633598.050782934,-9655.3726434488744,-141347.14333803509,1.0832328338750239e+36,7.444734244626994e+19,-4794508183818415,1.9536107239065162e+29,2.5215597852625868e+26,5.7061859929780429e+30,5292952668.0972757,-3.477203385696727e+31,182225.13765885483,3.5058992471258936e+60,-70669055.308937684,-1.0311074952294789e+30,-6.1629743544040761e+55,1.0509000537006845e+53,-4.5226192496791994e+34,6.0757888382445624e+31,-2.384766701121233e+17,-4.7460497225193357e+66,-7.4640627078185225e+49,4312024435343015.5,-1.2227300245611776e+25,3.5890438343304558e+40,-5.9763205743076812e+25,69900042021818984,-373.94577051756187,-8.1060133362817019e+42,-7.9068652336196608e+28,4.3865190183895674e+47,2.798876340644187e+32,-27997.534520452544,-1.812691530224317e+63,-3987662664432298.5,9.4524724818864283e+63,-2248903000.2100301,-3.6663797641521819e+52,-3.6846488200910958e+43,-1.2184257673889733e+19,2.2682778145971462e+56,2.5943442187600494e+50,43825408280412.422,1302925466662029.8,2.2187704293128008e+46,1.2705640399794574e+17,1.1374122318068898e+40,-1.7718483514427003e+35,-38.202702702702702,22461692395639256,-1.3962597063253072e+32,-1.641223479118478e+35,6.9580194748258647e+24,1.8348261327616439e+63,-1.8658671646496618e+55,-2.0199814280329084e+37,-29.096396396396397,-2415332828510957,-1.0626686278337414e+26,-27233459532386516,-3.0111050761290394e+21,-8.8069069069069066,-1.7922278446124543e+30,5.6459592429619519e+29,-6.2987698855196158e+52,-3.027716947946914e+55,-3.9542426439112395e+21,-8.5333348340564165e+19,4.4476404063118243e+51,-909013562775.48682,-7.4123916653186169e+29,23525135167131088,746.1225549874199,-4.0971248750189412e+49,2209797242948.5957,5.2286460302229907e+32,-3.3927660130385349e+41,-2.2011709279316777e+25,-6.3912866205423071e+27,-3922378469.5166721,-48366047.800846957,1.5935981649219539e+33,6.5101015998412751e+19,-1.8931231302520173e+48,-2.8282497019386077e+39,22779202121114360,7755058063.1569614,1.1898665700821837e+34,3.4063615512018122e+45,-4.6898119452736347e+44,6901616418585379,6.3615832189836342e+20,-1.2082184262989981e+57,-4.1038164052361766e+53,-5.0533349473021062e+17,-1.0746836855595982e+56,-1.8793690273494319e+41,-27.618618618618619,387389090.10478586,7.310267938098104e+59,82275097588.636307,1.3462877214105352e+40,4419.0417170105111,1422016.1990628375,1.0464090892221369e+37,-3.9138036843855455e+60,1.2945806359329939e+48,-8.4600425331180487e+57,2.4169084359183643e+19,3.1601972704799746e+69,1.2535103694468127e+27,-1.2329047059739096e+63,3.5278125924205849e+39,5.5513106299165552e+53,3.9129270930432279e+37,1.6609791710522039e+46,7.8512789928897007e+46,-12.4015015015015,1.3648008883944189e+39,4.7104959962276e+48,7.7828755142560716e+63,315.67126757388019,-401130358609.7804,1.1882150448913097e+36,-1.259931483173253e+46,7.6253497577917358e+34,93987386415358.953,8.9885204290564679e+20,-146523.99883134803,-439896.20735995274,-1.3472236461497452e+40,-2336998.4174629971,-3.7662173790670618e+23,-1.2248436945734037e+68,-5.1458378933246263e+19,2.2527402699456968e+30,-1.2019013776605133e+43,-5.9935084720763229e+35,-2.4767640981602496e+47,-5.2341459705406089e+40,-6.5181261219312425e+18,-1365.7397782474191,-2.5491227877229741e+45,-2209917606391.394,-6.2852374803086421e+23,8.2855283431217207e+28,7.3371679490405206e+50,-32.091891891891891,1.4198445764826375e+50,-529.12523667273024,-13830903382736538,9.1495048555731384e+18,-2.7495755017073616e+42,-2.8987676870883101e+21]}

},{}],35:[function(require,module,exports){
module.exports={"x": [0.22472472472472471,0.46496496496496498,0.023523523523523524,0.47747747747747749,0.4069069069069069,0.42792792792792794,0.40790790790790793,0.3058058058058058,0.31031031031031031,0.083083083083083084,0.46696696696696699,0.16616616616616617,0.15665665665665665,0.10710710710710711,0.18718718718718719,0.40090090090090091,0.46296296296296297,0.16966966966966968,0.17217217217217218,0.12412412412412413,0.01951951951951952,0.10010010010010009,0.45095095095095095,0.27227227227227224,0.069069069069069067,0.46846846846846846,0.012512512512512512,0.48348348348348347,0.44644644644644643,0.33533533533533533,0.32032032032032032,0.074574574574574573,0.035035035035035036,0.46246246246246248,0.3808808808808809,0.48148148148148145,0.39939939939939939,0.27377377377377377,0.14514514514514515,0.19769769769769768,0.44394394394394393,0.40490490490490488,0.45295295295295296,0.23573573573573572,0.40640640640640641,0.46646646646646645,0.41141141141141141,0.12462462462462462,0.34734734734734735,0.22922922922922923,0.14714714714714713,0.30130130130130128,0.20170170170170171,0.41741741741741739,0.37037037037037035,0.096596596596596598,0.28278278278278279,0.28378378378378377,0.28578578578578578,0.19919919919919921,0.29229229229229231,0.24974974974974976,0.37787787787787785,0.31781781781781782,0.29829829829829829,0.085085085085085083,0.088088088088088087,0.24074074074074073,0.028028028028028028,0.048048048048048048,0.027027027027027029,0.039539539539539537,0.090090090090090086,0.16266266266266266,0.11061061061061062,0.32182182182182184,0.23273273273273273,0.47347347347347346,0.096096096096096095,0.22622622622622623,0.17267267267267267,0.031531531531531529,0.073073073073073078,0.002002002002002002,0.21021021021021022,0.31131131131131129,0.24224224224224225,0.3938938938938939,0.078078078078078081,0.15565565565565564,0.34634634634634637,0.24524524524524524,0.10810810810810811,0.27627627627627627,0.091591591591591595,0.46196196196196193,0.4094094094094094,0.35935935935935936,0.48048048048048048,0.44694694694694692,0.36736736736736736,0.15065065065065064,0.28078078078078078,0.46596596596596596,0.48998998998998999,0.30380380380380378,0.48248248248248249,0.011011011011011011,0.25575575575575576,0.47047047047047047,0.45145145145145144,0.14014014014014015,0.062562562562562568,0.13163163163163163,0.30280280280280281,0.061561561561561562,0.43843843843843844,0.015015015015015015,0.004004004004004004,0.30530530530530531,0.078578578578578584,0.37387387387387389,0.10510510510510511,0.44744744744744747,0.02952952952952953,0.0045045045045045045,0.45795795795795796,0.097097097097097101,0.11561561561561562,0.020520520520520519,0.40840840840840842,0.067067067067067068,0.13863863863863865,0.26576576576576577,0.093093093093093091,0.25725725725725723,0.28728728728728731,0.0090090090090090089,0.46346346346346345,0.03003003003003003,0.22222222222222221,0.48848848848848847,0.31931931931931934,0.4144144144144144,0.022522522522522521,0.10910910910910911,0.14114114114114115,0.49599599599599598,0.20920920920920921,0.3338338338338338,0.23823823823823823,0.047547547547547545,0.3988988988988989,0.33583583583583582,0.06506506506506507,0.17667667667667666,0.057557557557557558,0.0080080080080080079,0.16166166166166165,0.42442442442442441,0.14464464464464463,0.32082082082082081,0.055555555555555552,0.01051051051051051,0.23873873873873874,0.37987987987987987,0.14414414414414414,0.19869869869869869,0.37537537537537535,0.38838838838838841,0.026026026026026026,0.42042042042042044,0.32582582582582581,0.45595595595595595,0.016516516516516516,0.10960960960960961,0.35485485485485485,0.40740740740740738,0.1066066066066066,0.33283283283283283,0.2797797797797798,0.40590590590590592,0.38938938938938938,0.14914914914914915,0.24474474474474475,0.44244244244244246,0.13013013013013014,0.31831831831831831,0.23623623623623624,0.2747747747747748,0.47447447447447449,0.047047047047047048,0.11011011011011011,0.064064064064064064,0.098598598598598597,0.2977977977977978,0.49199199199199201,0.17617617617617617,0.23223223223223222,0.44144144144144143,0.056556556556556559,0.084084084084084076,0.37487487487487486,0.082082082082082078,0.090590590590590589,0.017017017017017015,0.36186186186186187,0.41341341341341342,0.045045045045045043,0.41791791791791794,0.011511511511511512,0.26426426426426425,0.12262262262262262,0.032532532532532535,0.066066066066066062,0.1996996996996997,0.14814814814814814,0.030530530530530529,0.26176176176176175,0.4014014014014014,0.36036036036036034,0.16866866866866867,0.089589589589589583,0.17817817817817819,0.49299299299299298,0.20520520520520522,0.36836836836836839,0.45045045045045046,0.1866866866866867,0.29929929929929927,0.26126126126126126,0.15915915915915915,0.24574574574574573,0.48798798798798798,0.43093093093093093,0.37187187187187187,0.36086086086086083,0.31681681681681684,0.15115115115115116,0.49699699699699701,0.20420420420420421,0.44344344344344344,0.15765765765765766,0.26476476476476474,0.39739739739739738,0.17067067067067068,0.43693693693693691,0.1981981981981982,0.092092092092092098,0.12862862862862862,0.37637637637637639,0.49399399399399396,0.17967967967967968,0.22172172172172172,0.41491491491491489,0.060560560560560563,0.16116116116116116,0.035535535535535533,0.16516516516516516,0.4924924924924925,0.2772772772772773,0.25475475475475473,0.36536536536536535,0.49449449449449451,0.1056056056056056,0.12562562562562563,0.29879879879879878,0.12912912912912913,0.028528528528528527,0.33683683683683685,0.25175175175175174,0.476976976976977,0.1086086086086086,0.054054054054054057,0.41991991991991989,0.024524524524524523,0.14164164164164164,0.08858858858858859,0.17317317317317318,0.29979979979979982,0.18168168168168167,0.12162162162162161,0.089089089089089094,0.21071071071071071,0.1011011011011011,0.42192192192192191,0.36686686686686687,0.3288288288288288,0.14314314314314314,0.34984984984984985,0.29079079079079079,0.34934934934934936,0.11311311311311312,0.37137137137137138,0.023023023023023025,0.44944944944944942,0.066566566566566565,0.44794794794794796,0.24174174174174173,0.11411411411411411,0.43343343343343343,0.071071071071071065,0.23673673673673673,0.25025025025025027,0.080580580580580582,0.45395395395395394,0.12012012012012012,0.48548548548548548,0.42292292292292294,0.37737737737737737,0.47897897897897895,0.072072072072072071,0.06956956956956957,0.26726726726726724,0.079579579579579576,0.20270270270270271,0.12062062062062062,0.25675675675675674,0.16916916916916916,0.36786786786786785,0.21621621621621623,0.28828828828828829,0.39239239239239238,0.34534534534534533,0.38788788788788786,0.12312312312312312,0.21821821821821821,0.24324324324324323,0.24924924924924924,0.22822822822822822,0.021021021021021019,0.21521521521521522,0.13363363363363362,0.2022022022022022,0.22122122122122123,0.28428428428428426,0.16416416416416416,0.44194194194194192,0.21921921921921922,0.30780780780780781,0.48748748748748749,0.0095095095095095103,0.25525525525525528,0.095095095095095089,0.1956956956956957,0.35085085085085083,0.23373373373373374,0.41041041041041043,0.1841841841841842,0.43193193193193191,0.077577577577577578,0.14214214214214213,0.34784784784784784,0.27177177177177175,0.043543543543543541,0.28878878878878878,0.18268268268268267,0.34834834834834832,0.067567567567567571,0.45895895895895894,0.24424424424424424,0.3083083083083083,0.34234234234234234,0.026526526526526525,0.19519519519519518,0.1966966966966967,0.31381381381381379,0.0015015015015015015,0.29729729729729731,0.086086086086086089,0.12212212212212212,0.3108108108108108,0.4794794794794795,0.26326326326326327,0.11961961961961962,0.4249249249249249,0.34334334334334332,0.44044044044044045,0.33783783783783783,0.27527527527527529,0.16066066066066065,0.49649649649649652,0.16666666666666666,0.17017017017017017,0.051051051051051052,0.16466466466466467,0.23023023023023023,0.015515515515515516,0.22872872872872874,0.040540540540540543,0.17867867867867868,0.21471471471471471,0.072572572572572575,0.15965965965965967,0.32332332332332331,0.32682682682682684,0.29179179179179177,0.29679679679679677,0.3238238238238238,0.40040040040040037,0.024024024024024024,0.25775775775775778,0.30680680680680683,0.033033033033033031,0.12512512512512514,0.16316316316316315,0.17167167167167166,0.24674674674674674,0.25625625625625625,0.17767767767767767,0.2902902902902903,0.24374374374374375,0.12762762762762764,0.22372372372372373,0.46796796796796797,0.43743743743743746,0.3313313313313313,0.14564564564564564,0.25325325325325326,0.04954954954954955,0.11661661661661661,0.47647647647647645,0.23423423423423423,0.48398398398398396,0.0085085085085085076,0.062062062062062065,0.47547547547547547,0.33933933933933935,0.29429429429429427,0.33233233233233234,0.018518518518518517,0.092592592592592587,0.20370370370370369,0.094094094094094097,0.28528528528528529,0.38138138138138139,0.47847847847847846,0.14764764764764765,0.082582582582582581,0.30980980980980982,0.39589589589589591,0.22772772772772773,0.41591591591591592,0.45495495495495497,0.42142142142142142,0.36936936936936937,0.25925925925925924,0.16016016016016016,0.083583583583583587,0.39489489489489488,0.42092092092092093,0.16766766766766766,0.013513513513513514,0.079079079079079073,0.12812812812812813,0.055055055055055056,0.13913913913913914,0.20770770770770772,0.35635635635635637,0.075075075075075076,0.0005005005005005005,0.19719719719719719,0.45695695695695693,0.45845845845845845,0.39189189189189189,0.27427427427427425,0.45645645645645644,0.20020020020020018,0.22072072072072071,0.49799799799799799,0.18468468468468469,0.1006006006006006,0.29629629629629628,0.15615615615615616,0.18318318318318319,0.3733733733733734,0.061061061061061059,0.46446446446446443,0.053553553553553554,0.26526526526526528,0.26976976976976974,0.27927927927927926,0.13963963963963963,0.41391391391391391,0.15015015015015015,0.22322322322322322,0.13763763763763764,0.06356356356356356,0.056056056056056056,0.15815815815815815,0.1016016016016016,0.31631631631631629,0.37887887887887889,0.003003003003003003,0.0070070070070070069,0.13113113113113112,0.45245245245245247,0.36236236236236236,0.070070070070070073,0.34434434434434436,0.14964964964964964,0.098098098098098094,0.031031031031031032,0.13813813813813813,0.36286286286286284,0.21971971971971971,0.4039039039039039,0.43493493493493496,0.068068068068068061,0.037037037037037035,0.48898898898898896,0.43143143143143142,0.24724724724724725,0.28928928928928926,0.059559559559559556,0.44094094094094094,0.32482482482482483,0.32732732732732733,0.42942942942942941,0.46396396396396394,0.25375375375375375,0.16816816816816815,0.4119119119119119,0.085585585585585586,0.39339339339339341,0.11511511511511512,0.053053053053053051,0.041541541541541542,0.20820820820820821,0.4169169169169169,0.3758758758758759,0.45995995995995997,0.046046046046046049,0.40890890890890891,0.45445445445445443,0.39439439439439439,0.4894894894894895,0.30430430430430433,0.093593593593593594,0.35385385385385387,0.005005005005005005,0.34084084084084082,0.17567567567567569,0.2822822822822823,0.32782782782782782,0.022022022022022022,0.24024024024024024,0.19269269269269268,0.4274274274274274,0.38388388388388389,0.46996996996996998,0.28678678678678676,0.18818818818818819,0.04004004004004004,0.19369369369369369,0.23473473473473475,0.47297297297297297,0.31181181181181183,0.39539539539539537,0.087587587587587584,0.29579579579579579,0.043043043043043044,0.25425425425425424,0.050050050050050046,0.43993993993993996,0.26626626626626626,0.13513513513513514,0.25125125125125125,0.21571571571571571,0.15265265265265265,0.42542542542542544,0.23323323323323322,0.3858858858858859,0.049049049049049047,0.052552552552552555,0.44494494494494496,0.021521521521521522,0.33333333333333331,0.42342342342342343,0.19019019019019018,0.038038038038038041,0.01001001001001001,0.19619619619619619,0.45945945945945943,0.39789789789789787,0.43943943943943942,0.38988988988988987,0.46546546546546547,0.27877877877877877,0.42642642642642642,0.35235235235235235,0.46896896896896895,0.14614614614614616,0.26376376376376376,0.36486486486486486,0.075575575575575579,0.35035035035035034,0.17717717717717718,0.22972972972972971,0.13413413413413414,0.30930930930930933,0.17367367367367367,0.14664664664664664,0.087087087087087081,0.070570570570570576,0.44544544544544545,0.044044044044044044,0.3133133133133133,0.33433433433433435,0.080080080080080079,0.27027027027027029,0.073573573573573567,0.42892892892892892,0.37287287287287285,0.24624624624624625,0.30730730730730732,0.23973973973973975,0.11261261261261261,0.14064064064064064,0.41841841841841843,0.02002002002002002,0.2072072072072072,0.06006006006006006,0.45745745745745747,0.36336336336336333,0.081581581581581575,0.1906906906906907,0.3003003003003003,0.4974974974974975,0.012012012012012012,0.19219219219219219,0.03903903903903904,0.45545545545545546,0.49899899899899902,0.38288288288288286,0.42692692692692691,0.21271271271271272,0.034534534534534533,0.18118118118118118,0.27777777777777779,0.44894894894894893,0.49099099099099097,0.033533533533533534,0.35535535535535534,0.25275275275275277,0.41641641641641641,0.29129129129129128,0.28478478478478481,0.30080080080080079,0.32432432432432434,0.2952952952952953,0.44444444444444442,0.26676676676676675,0.43793793793793795,0.48598598598598597,0.42392392392392392,0.32932932932932935,0.076076076076076082,0.48498498498498499,0.38638638638638639,0.1941941941941942,0.34684684684684686,0.34184184184184185,0.39289289289289286,0.10260260260260261,0.13713713713713713,0.13263263263263264,0.041041041041041039,0.33183183183183185,0.15865865865865866,0.23173173173173173,0.37937937937937938,0.27827827827827828,0.045545545545545546,0.057057057057057055,0.34584584584584582,0.33083083083083081,0.26226226226226224,0.032032032032032032,0.33983983983983984,0.44844844844844844,0.21871871871871873,0.35835835835835833,0.13313313313313313,0.48298298298298298,0.2877877877877878,0.31231231231231232,0.17467467467467468,0.34134134134134136,0.48648648648648646,0.22422422422422422,0.23123123123123124,0.36886886886886888,0.15365365365365366,0.063063063063063057,0.43543543543543545,0.095595595595595592,0.058058058058058054,0.26026026026026028,0.35685685685685686,0.34384384384384387,0.21721721721721721,0.26076076076076077,0.28128128128128127,0.30230230230230232,0.49149149149149146,0.17517517517517517,0.31431431431431434,0.33633633633633631,0.33033033033033032,0.36436436436436437,0.31281281281281281,0.1021021021021021,0.3158158158158158,0.091091091091091092,0.38188188188188188,0.042542542542542541,0.054554554554554553,0.12962962962962962,0.481981981981982,0.41091091091091092,0.3913913913913914,0.37437437437437437,0.17917917917917917,0.027527527527527528,0.11161161161161161,0.47247247247247248,0.097597597597597591,0.1931931931931932,0.35435435435435436,0.22522522522522523,0.28628628628628627,0.37087087087087089,0.42592592592592593,0.40340340340340342,0.0945945945945946,0.27677677677677676,0.1111111111111111,0.28178178178178176,0.43593593593593594,0.30480480480480482,0.38488488488488487,0.3888888888888889,0.22272272272272273,0.064564564564564567,0.081081081081081086,0.036536536536536539,0.47397397397397395,0.23923923923923923,0.11361361361361361,0.43293293293293295,0.32832832832832831,0.11761761761761762,0.43043043043043044,0.048548548548548551,0.47497497497497498,0.016016016016016016,0.12362362362362363,0.052052052052052052,0.1916916916916917,0.30180180180180177,0.36136136136136138,0.20670670670670671,0.17117117117117117,0.3783783783783784,0.25975975975975973,0.099599599599599603,0.28978978978978981,0.38738738738738737,0.10760760760760761,0.051551551551551549,0.03403403403403403,0.2927927927927928,0.017517517517517518,0.18218218218218218,0.30880880880880879,0.494994994994995,0.058558558558558557,0.12712712712712712,0.13213213213213212,0.036036036036036036,0.38038038038038036,0.46146146146146144,0.11461461461461461,0.11861861861861862,0.0075075075075075074,0.43243243243243246,0.38438438438438438,0.14864864864864866,0.46746746746746748,0.35135135135135137,0.4844844844844845,0.2007007007007007,0.24874874874874875,0.046546546546546545,0.22672672672672672,0.26776776776776778,0.43443443443443441,0.22572572572572572,0.47197197197197199,0.34284284284284283,0.3963963963963964,0.20620620620620619,0.38238238238238237,0.41891891891891891,0.40540540540540543,0.2122122122122122,0.41241241241241239,0.35985985985985985,0.32282282282282282,0.038538538538538537,0.068568568568568564,0.31531531531531531,0.44994994994994997,0.19119119119119118,0.30630630630630629,0.42842842842842843,0.26876876876876876,0.10460460460460461,0.050550550550550549,0.39689689689689689,0.019019019019019021,0.21171171171171171,0.3213213213213213,0.27327327327327328,0.0990990990990991,0.34884884884884887,0.39039039039039036,0.40290290290290293,0.15165165165165165,0.13563563563563563,0.1041041041041041,0.24274274274274274,0.5,0.22022022022022023,0.013013013013013013,0.27127127127127126,0.29379379379379378,0.38688688688688688,0.35285285285285284,0.025525525525525526,0.15215215215215216,0.065565565565565559,0.24124124124124124,0.37237237237237236,0.0035035035035035035,0.11611611611611611,0.18068068068068069,0.49049049049049048,0.07407407407407407,0.28328328328328328,0.11211211211211211,0.35585585585585583,0.26826826826826827,0.23073073073073072,0.21771771771771772,0.15415415415415415,0.037537537537537538,0.49849849849849848,0.13613613613613612,0.071571571571571568,0.46046046046046046,0.36586586586586584,0.35185185185185186,0.18568568568568569,0.1036036036036036,0.40990990990990989,0.23523523523523523,0.43643643643643643,0.35885885885885888,0.18968968968968969,0.22722722722722721,0.31981981981981983,0.16716716716716717,0.044544544544544547,0.47997997997997999,0.40190190190190189,0.29329329329329329,0.2137137137137137,0.45195195195195192,0.31731731731731733,0.32232232232232233,0.39989989989989988,0.47597597597597596,0.18518518518518517,0.08458458458458458,0.3833833833833834,0.014014014014014014,0.34034034034034033,0.11811811811811812,0.076576576576576572,0.36386386386386388,0.486986986986987,0.44594594594594594,0.29479479479479481,0.0025025025025025025,0.33483483483483484,0.24774774774774774,0.2112112112112112,0.37687687687687688,0.26276276276276278,0.4299299299299299,0.15715715715715717,0.41291291291291293,0.17417417417417416,0.34484484484484484,0.39089089089089091,0.001001001001001001,0.12612612612612611,0.25075075075075076,0.006006006006006006,0.27077077077077077,0.25825825825825827,0.33883883883883886,0.3263263263263263,0.15515515515515516,0.16566566566566565,0.43893893893893893,0.28028028028028029,0.39839839839839841,0.47797797797797797,0.018018018018018018,0,0.14364364364364365,0.025025025025025023,0.19469469469469469,0.46946946946946949,0.05905905905905906,0.31481481481481483,0.42242242242242239,0.18618618618618618,0.32982982982982983,0.1031031031031031,0.13463463463463463,0.13663663663663664,0.38538538538538536,0.43393393393393392,0.4194194194194194,0.18868868868868868,0.27277277277277279,0.36986986986986986,0.21421421421421422,0.18768768768768768,0.47097097097097096,0.20120120120120119,0.3033033033033033,0.029029029029029027,0.2087087087087087,0.40240240240240238,0.14264264264264265,0.2097097097097097,0.16216216216216217,0.23773773773773774,0.11911911911911911,0.1061061061061061,0.18018018018018017,0.27577577577577578,0.48098098098098097,0.35735735735735735,0.35785785785785784,0.13063063063063063,0.014514514514514514,0.26926926926926925,0.21671671671671672,0.23723723723723725,0.042042042042042038,0.25225225225225223,0.25875875875875876,0.33833833833833832,0.45345345345345345,0.44294294294294295,0.077077077077077075,0.0055055055055055055,0.49549549549549549,0.49949949949949951,0.11711711711711711,0.2057057057057057,0.33733733733733734,0.36636636636636638,0.0065065065065065065,0.16366366366366367,0.21321321321321321,0.40440440440440439,0.086586586586586592,0.47147147147147145,0.32532532532532532,0.15465465465465467,0.15315315315315314,0.24824824824824826,0.46096096096096095,0.31881881881881879,0.35335335335335333,0.12662662662662663,0.41541541541541543,0.12112112112112113,0.2032032032032032,0.1891891891891892,0.2047047047047047,0.18368368368368368,0.49349349349349347],  "n": [139,24,154,142,22,165,156,38,108,53,17,94,48,33,93,169,163,170,165,165,27,124,166,167,163,19,83,136,137,51,25,1,72,20,156,109,135,150,164,86,112,136,7,62,145,37,159,116,116,68,129,126,127,81,67,72,112,30,30,52,121,136,6,54,48,149,8,26,17,169,140,140,119,22,54,130,162,84,6,113,75,22,65,36,131,9,136,7,32,70,84,78,76,83,110,135,121,157,129,138,47,120,116,1,112,121,28,110,21,78,85,132,164,98,58,150,100,138,39,4,128,140,44,140,87,160,119,71,152,72,164,99,94,27,24,130,26,40,44,138,143,169,44,57,139,51,42,3,158,37,60,155,34,145,43,163,105,133,81,168,60,12,142,135,100,102,94,125,156,119,49,116,129,67,129,96,65,36,97,90,13,69,10,60,91,101,133,61,159,165,23,27,97,68,80,66,3,124,58,67,28,158,136,75,53,147,90,106,29,21,103,81,45,58,112,91,118,122,128,169,77,123,15,156,39,86,156,95,26,86,141,79,92,93,170,77,14,146,76,103,19,85,164,167,1,6,132,167,139,62,148,116,15,59,68,146,45,8,137,113,74,128,155,23,31,168,45,17,25,49,24,137,148,14,99,107,94,2,25,116,146,91,106,75,60,34,88,24,69,65,13,130,41,7,21,44,32,86,41,140,71,167,9,140,154,52,161,9,84,43,84,93,58,151,154,59,63,6,19,28,133,150,67,36,42,47,69,84,17,38,23,84,161,163,163,111,98,129,11,74,40,94,61,10,140,55,3,69,8,155,29,138,111,44,125,23,111,84,77,65,93,123,51,49,127,106,33,139,117,54,32,66,63,59,107,139,133,114,14,65,158,78,132,52,83,155,75,84,76,129,53,19,87,67,87,148,139,62,136,156,110,93,65,24,138,34,91,162,60,169,160,41,149,3,94,67,106,133,100,82,36,92,52,4,81,154,40,34,144,151,34,76,39,26,30,41,39,136,75,81,53,16,157,110,74,108,32,100,154,124,167,61,75,116,19,121,44,28,70,23,102,77,45,8,103,136,121,29,38,142,20,56,51,112,55,72,73,133,87,20,15,169,45,31,137,130,5,46,158,42,125,18,84,59,99,48,41,165,79,37,164,104,93,39,89,33,40,69,84,71,107,29,116,51,68,109,63,26,168,131,7,151,151,164,156,4,136,100,17,131,45,56,58,22,116,50,24,145,123,40,19,86,112,1,85,3,133,49,122,17,154,66,152,61,57,123,119,12,34,88,6,73,127,118,86,44,82,69,154,45,104,159,106,81,147,104,137,84,99,88,32,42,41,57,151,86,5,102,84,53,29,164,167,40,122,127,86,55,81,55,11,162,116,91,8,149,13,159,89,114,17,50,140,12,139,40,123,120,26,34,113,72,89,160,166,25,111,110,137,81,78,75,74,42,141,87,15,155,23,14,30,122,67,105,142,33,137,68,11,48,68,146,90,155,71,105,112,31,107,88,50,141,74,62,3,139,168,50,29,30,19,84,64,34,34,147,84,35,58,105,162,150,157,67,9,161,126,29,46,166,72,96,94,102,161,23,72,97,168,95,52,53,120,21,114,126,92,42,119,140,114,32,31,54,22,150,170,115,30,126,6,11,96,23,150,16,114,2,33,78,63,108,79,91,167,85,27,58,146,43,110,40,64,30,33,102,73,124,82,150,21,121,101,40,39,82,66,4,100,128,43,112,50,14,105,81,46,170,141,91,168,153,125,132,59,35,100,155,19,64,155,145,150,56,140,56,45,113,102,100,4,9,73,131,54,84,28,83,31,73,72,68,17,132,102,166,81,128,119,108,119,13,109,108,6,90,12,51,55,56,91,108,112,170,70,88,140,124,123,42,165,57,91,128,56,117,18,116,104,14,133,79,72,119,16,12,46,12,27,90,48,45,75,83,90,23,78,17,149,21,89,165,161,129,109,46,163,124,41,71,115,81,50,10,115,105,119,84,12,154,44,159,39,157,114,52,144,135,59,39,133,77,115,87,2,40,103,122,66,168,156,112,1,47,79,80,73,1,79,76,131,166,55,52,134,37,81,43,7,138,30,83,123,70,81,37,26,92,58,123,104,49,33,93,126,129,42,57,156,137,46,146,131,3,33,151,49,101,16,15,98,158,117,156,93,167,73,154,110,162,111,159,116,2,109,133,161,5,36,100,121,111,41,56,21,19,104,22,77,166,78,91,113,113,131,121,60,12,113,36,71,74,144,2,142,12,44,59,105,54],  "expected": [4.3027820907706534e+235,-1.6766678616266957e+21,-4.1341542177611199e+267,-5.0210543415341851e+241,-3.9784809733704714e+18,1.0181520111805113e+292,-1.6547655284756302e+272,-1.0641025551703204e+42,-6.7838474926405842e+170,4.569556672394714e+66,1594823331658.2058,-8.0159251263540645e+142,-1.9782254417808458e+58,1.8069799365606968e+34,8.6763355434309568e+140,8.6994208093960221e+300,3.2634986031310789e+287,-2.6790058375797675e+303,2.0725855005531603e+292,1.9890373143839239e+292,7.2992645436442309e+24,-7.0252283587965755e+203,-1.5098959262108252e+294,4.8487068061317797e+296,5.7188271660497893e+287,460519930461743.12,5.5872604956098611e+120,-7.0639854541684848e+228,1.1335073133018772e+231,2.0186326800987932e+63,5.3690522442334061e+22,0.074574574574574573,-2.5117425734323917e+100,-8668475989914213,-1.8450962564253959e+272,3.9082006999735169e+172,7.5578805440090629e+226,-2.1044113164488626e+259,-1.253235535688172e+290,-1.9901310460224118e+127,-6.0413630151033884e+178,-9.9531354723106315e+228,87.352735056400533,-3.7562581860879323e+82,1.9882486450441602e+248,1.9532206591330109e+40,6.2609504087561743e+278,-1.8516855171179524e+187,-1.4154230854870232e+187,-2.656647968812394e+93,2.5026008997261832e+214,-1.0177143373861473e+208,1.5458845899325269e+210,3.1290150883656159e+117,2.9925220286092917e+91,-5.1029080890916003e+100,-1.0341039476477318e+179,-7.5534014309353429e+29,-7.5376768907499595e+29,-1.2117269975790961e+65,3.7485458235267705e+197,-1.6099645210348951e+229,-16.740486647187403,-2.8925283039604366e+68,-1.8844098503008957e+58,1.3448361625736713e+257,-351.14134667518294,-1.4128881174982326e+24,533072558080.21466,9.2098371139417772e+300,-2.2375888198550608e+237,-3.053086909005948e+237,2.587720748197417e+193,-4.4883290687389204e+18,-2.8264601070752608e+68,-2.5096361571281396e+216,-4.4977446306889008e+285,-1.36593123403288e+123,-9.1938273069734819,1.2843879766465925e+181,2.3913211483480057e+106,-1.4348908945976323e+18,6.526269888974782e+87,-2.0515886759256363e+37,4.1526680916081566e+218,4925.3465738653204,-1.6333082820776738e+229,93.05248753701234,-4.6641078321226039e+32,-1.2314668106645142e+97,-2.1435684953342264e+123,-1.0052830648095846e+112,-1.5630369772513081e+108,3.0763541535869299e+121,-8.1003625104337422e+174,5.8000477997341538e+226,2.5501217737564253e+197,3.1149734981658476e+274,1.0534400700311264e+214,-1.5444366096915977e+233,3.4817511023328457e+56,-3.6705598734735927e+195,-1.7068201128678162e+187,0.46596596596596596,-4.9386248212338147e+178,3.6359991966793328e+197,-6.2214172638644925e+26,-1.5000045297929674e+174,2.3341544032808554e+17,-5.2712007890645656e+111,1.2475712167865308e+125,-5.431720660221834e+220,-8.763855608733363e+289,-6.3256077410808989e+150,-2.7646058439365173e+75,-1.6573510518320077e+259,-3.4397775747988615e+154,-6.928870103141459e+232,2.0590047834372945e+42,-0.96856633634064127,-1.5375307257976795e+212,-3.9639440709218602e+237,-3.9819845463506214e+51,-2.9369397083660372e+237,6.1608731843094497e+128,-1.2939708792359995e+280,1.471184061992973e+193,7.2161837304278139e+98,-5.1613927221057452e+263,-1.5794489231683485e+100,-6.7709348791508965e+289,4.4536851938482499e+152,-7.7591476260912129e+142,3.6023378656280779e+25,-1.6876014614682502e+21,-2.9654872764665292e+216,-1.3769636502341722e+24,-1.7684434260999827e+44,-2.9516246271827518e+51,-1.2751962618377593e+233,1.6720619524479742e+244,5.8215819341713965e+300,-4.3542675256310319e+51,3.6402172812572431e+73,1.3757037291671486e+235,2.0104513073209495e+63,-2.5279797451505442e+48,0.37597688873652019,-7.2492135803958651e+276,2.7620819187409763e+40,-1.0319783367907455e+79,1.122620648021334e+270,-5.7547155690131512e+35,2.5831995840101955e+248,6.8742118927509674e+49,7.7603297652494978e+287,4.3756545083945034e+164,8.5711244467639614e+221,5.0655094636128863e+117,-4.693211482520376e+298,-1.0032513826053215e+79,-4410063.5500380713,-7.7359669426497926e+241,1.9772900859518988e+226,-6.1383296828611844e+154,-4.2880617909274728e+158,-7.8320934841075679e+142,9.8702455737582068e+205,-1.8847572095496575e+272,1.9476592605452431e+193,2.875259244008244e+59,-1.0865629122764692e+187,1.9266107770910536e+214,2.2456994101581264e+91,5.8211479738703926e+213,-6.3816290558466143e+146,7.3700179270555333e+87,-6.5425909138127841e+38,6.0479090773313442e+148,-9.1030490328530025e+134,52332277.478543483,1.2060279949139244e+95,-40450.637588244652,-1.0117639757915012e+79,9.9104261100312936e+136,3.3698556533306579e+156,7.0418836701400447e+222,5.4078578345068409e+80,1.0958187578714081e+279,1.7646011701457556e+292,7.2458151649889198e+19,1.5798128748705669e+25,6.1308960108168271e+148,-1.7132087626656766e+93,-5.3677593210574594e+115,-5.464405472293347e+89,0.37690529617454044,-8.0465649770450711e+203,-3.05590764704374e+75,2.3693305085403844e+91,-4.9287071193643092e+26,-6.1028928754168912e+276,-1.1171260190581642e+229,1.8074352436979137e+106,4.8101206915786432e+66,1.8184209655305071e+252,-8.3506383010486534e+134,-4.2875797255065202e+166,1.1487767180699539e+28,1.8865029175590886e+17,1.0422646724168506e+160,4.766463146354172e+117,1.8821565745063376e+53,-1.1331290162951665e+75,-8.180859761583721e+178,1.0369397333138139e+137,-2.6136088227805267e+191,-2.0954655970706646e+199,-1.7861721818908844e+212,8.6812548819537366e+300,1.0141614999013251e+110,6.5468476616524833e+201,5797936513.5405207,-3.0444601585233216e+272,2.4460133005725399e+43,-1.9834193521367584e+127,-1.9355781340091882e+272,3.906971316456603e+144,-1.3769625470919729e+24,-1.7178185328430849e+127,7.789699982932106e+239,8.0277149146735579e+113,-8.9806484528369375e+138,3.8529664760846203e+140,-1.288061826658816e+303,9.7946752476087096e+109,-627873167.55589545,-3.9721952697394132e+250,-1.7519138878673755e+108,2.7192850354605188e+160,617042043086708.5,1.2873739501901562e+125,-1.2635425220003669e+290,4.941419135651581e+296,0.39739739739739738,-13.547864962540558,-2.7802350850094218e+220,5.5719341358686823e+296,3.8083072457841183e+235,-3.5175384984685338e+82,-6.9075945016022304e+254,-7.9054273967487667e+186,8491353597.2562609,1.7781294209762352e+77,-1.7312020624191096e+93,-3.4702705260019287e+250,2.0693650114748591e+53,-163.17575827940615,2.3803863110083224e+231,5.4439775743919193e+180,-2.9813602542572907e+104,-1.8124057629181714e+212,1.265862647967477e+270,6.8348363674235494e+19,1.8196851209390963e+31,-9.1061723710451481e+298,1.9734515129713707e+53,1721493270639.4456,1.58823267130927e+22,8.3242394951736206e+59,-2.3975408353874826e+21,9.8701060380209058e+230,-1.0139250864515039e+255,-282766916.47493267,3.7518189047265996e+152,2.470629574092524e+168,-7.8003763579239355e+142,-0.080740650560470376,5.4416704831827546e+22,-1.6277624218992938e+187,-5.1708809138071892e+250,9.6138597840502513e+136,-6.0017386701728514e+166,2.3894466740120395e+106,-8.6740580364344083e+78,-5.4151968255286833e+35,-1.0582316425952133e+131,-2.2414005714523608e+21,1.75290470864696e+95,7.4703249704634003e+87,52230811.149479575,-2.2977117189729566e+216,5.6260394410121582e+46,94.482490021241745,51538065316330592,-3.0928368054417426e+51,-4.171059217820874e+32,-1.0695179541433996e+127,6.6418986488164146e+46,-5.7819879223672855e+237,5.2312752253820546e+98,4.2516319719678315e+296,4775.4872598207985,-5.7065247565310609e+237,-1.0229897380903402e+268,-7.2439177001822482e+64,2.835144286031606e+283,4074.4419111706561,-1.6649207240079899e+123,8.9629832809678956e+49,-1.3349292926966097e+123,6.1780172016502181e+140,-2.0348452276319452e+75,3.2015812920070994e+261,-1.0161139339389339e+268,1.7897832703439191e+77,2.1231500586823066e+84,-16.203118411173946,584844955774775.38,-8.3562406796323757e+26,7.1068645609617879e+222,-2.0260711455025003e+259,2.798527248026582e+91,-7.5721405387947221e+38,-2.095743645226e+48,3.8818879422387307e+56,1.8158353289774381e+95,-2.6899183826897661e+123,2121638373554.1951,-1.1478702554625107e+42,2.1855995666220458e+19,-2.7732524251754923e+123,2.9129643181676614e+283,7.614371639195744e+287,7.4206350495838595e+287,9.3071516045851487e+176,-6.611657196243017e+150,1.2513653380073939e+214,401292.75995361962,-2.7986714731028435e+104,-9.6042427566030386e+44,-1.0477278861817848e+142,6.0506586176042491e+80,-26176.03596423029,-6.175821911193012e+237,1.4382067978962115e+70,0.3163423073364296,1.1880113582998649e+95,-559.63678922231202,9.660287514867757e+269,1.7353022583163027e+28,-3.2025569147629376e+233,7.7921517833453414e+176,-4.6946807408749309e+51,5.1755219168011257e+205,1.033284731629473e+20,1.0726655690311268e+177,-2.1311439379255679e+123,9.104938288313775e+109,5.2490774814414167e+87,8.258905654426166e+140,5.2742987734752248e+201,1.9863730481759436e+63,2.9239563672649431e+59,1.5535537519594789e+210,-7.3322068484363761e+166,2.1004748150023386e+34,1.0301496777470836e+234,1.895721082460875e+189,-2.4703264489493451e+68,-6.0625214424808216e+32,-5.3155053993077079e+89,1.2214061610091363e+84,1.7059030485802148e+77,7.2308564779667575e+168,2.3360240764101064e+235,5.2282564144321025e+222,-7.6973599471772478e+182,-643705467.9934175,8.8054016059563406e+87,-7.4456911971499163e+276,-4.7303226723329733e+111,-5.5474399932247267e+220,-1.1922791586104691e+65,1.8769320811436525e+121,1.9691821876493679e+270,2.3532400112709319e+106,-5.663428569566209e+122,-1.7621512219049262e+108,1.2525484702164025e+214,6.2254314849807974e+66,622786856852258.38,1.2144198212802273e+129,3.9645746291224438e+91,1.386519540302582e+129,-8.2233736529185465e+254,3.7267543566779206e+235,-3.4335177894048526e+82,-1.3294148509820402e+229,-1.7068193124907581e+272,-3.0545405830031473e+174,8.0792009952906185e+140,8.2886588422810713e+87,-7.5419630980025405e+20,-3.1086379931383588e+233,-7.1020611506765432e+35,1.03811088784235e+137,-4.3752256223520562e+285,-1.0114626382855986e+79,1.5833392364662748e+301,-1.5298089526447101e+281,6.6333506906646048e+46,1.5783507303696883e+257,0.3084884217334235,-3.8848543328480743e+142,2.4038000667559692e+91,-5.6701335486592821e+166,7.2126376451339254e+222,-5.9967961937100375e+154,-2.2399680886230265e+119,-7.3434675745830168e+38,-4.4247959124090227e+138,-1.1983315996786207e+65,-0.95260172227515894,5.8372320456580185e+116,-8.7616427792147699e+267,-1.0012065943395495e+45,-6.5680516498539494e+35,-2.040924868889036e+246,2.6538437244691698e+261,-1.4903436329432942e+35,-1.448462696532119e+108,4.3369994572503308e+43,-1.0116464113686442e+24,-7.5416475219991523e+29,5.2476719280529925e+46,2.5725130720521271e+43,-1.7333715899970771e+229,1.8138829068899732e+106,4.3360712328935575e+117,4.5045834685854884e+66,-133507757486.37395,2.4893823808714004e+274,-4.7624371545187358e+174,-2.0017650105664668e+104,-5.6610067554870132e+170,-7.0480193233020062e+32,-6.3756928129355382e+154,-1.0429353256494722e+268,-4.8490378431771231e+203,2.8609576996555701e+296,6.2084310350559962e+80,4.1837581272858494e+105,-1.5099328406980735e+187,516924327203892.38,2.7334646341697475e+197,-4.5123268615314242e+51,-9.6942151178647987e+26,-9.6380252753233882e+96,6.3663155357973062e+19,-4.7054347044372549e+156,1.3618059190141262e+110,1.3137087628095262e+53,-567.14034130169716,4.176888605336436e+160,-1.5252320840784662e+229,2.0984949559127774e+197,2.6824034570470812e+28,-1.149472237499446e+42,-4.5498056704822413e+241,-11321708795678356,-7.9766308400178405e+71,2.1835295544478858e+63,-1.1791113620595274e+179,1.7747092749176283e+70,-4.5102337956975432e+100,2.7701098007364979e+102,3.2402388184452512e+222,9.8829266244310788e+128,-11796015788825360,9148440362.1265354,1.3309684269364657e+301,1.9816715069230382e+53,1.7579225589045456e+31,2.3604187804216412e+231,-3.1478932456337683e+216,2.4438177713079909,-5.730936848941376e+54,-4.7811405395583814e+276,-2.6205233409879722e+48,8.7611016544440112e+205,-34444720513494.262,-1.9396659642872545e+123,6.9608868394177984e+75,6.3702864308683685e+151,-1.8669771083741612e+58,4.2725633813485974e+46,1.3311897388004572e+292,5.5898613833669416e+113,2.7053447456420595e+40,-1.2579817518636945e+290,-5.7753251817294034e+162,3.2917272006819784e+140,3.9625635957583375e+43,9.3915763875254247e+132,2.2681399549005252e+34,-1.2482788932492752e+45,1.0908238659502075e+95,-1.9031743631357363e+123,3.7051889975161988e+98,3.2992267107568516e+168,1.9861778069013017e+28,-1.829904341838478e+187,2.2097013493678884e+63,-1.6282580587804247e+93,4.6520502991247464e+172,1.9940300067346968e+84,-1.3118798747319026e+24,-4.5905644034924426e+298,1.8914097314954812e+218,92.783428715766163,3.6584039471823726e+261,1.9676830697070382e+261,-1.0489694753039457e+290,-1.7559976900057452e+272,-0.55390138229594155,-1.0644022885238718e+229,-3.1221542832520525e+154,2073355005031.0691,2.3147220366043923e+218,1.6729906863844494e+53,-5.6085161676067418e+71,-1.5052206977467443e+75,-3.9612572176780063e+18,-9.4366430720996221e+186,-3.4926028944120357e+61,-1.5617030401477957e+21,2.8504977315101972e+248,5.5414182354862019e+201,-1.4139818345516078e+45,31487612550527.105,-1.5422823299291655e+127,-1.1891055799577531e+179,0.2822822822822823,1.8884417108818413e+125,0.042599815690223419,6.8502023838662118e+222,9.7972943039111556e+59,-2.8605632819714776e+199,1892368269520.2422,-5.2903059921421584e+267,-5.5832704042640582e+89,-5.4831223086657275e+263,2.7587472769997817e+80,5.4494320336400668e+73,6.2207616431920741e+201,1.3766122450354948e+193,-4430785.5946550863,-5.8055846593222893e+35,-1.1785961817529509e+131,-16.727568329302425,2.1348308816724752e+102,1.4313962555316563e+210,-1.5174809003077535e+191,-1.1034606634802908e+127,-4.7253943803419135e+51,-3.9345298157446839e+119,1.7565933867413433e+95,-1.2360192446651947e+268,2.0394235911742778e+53,-3.7780995632720114e+162,1.1019293887433977e+279,-4.7461675551276446e+166,2.746065680675593e+117,4.5986226137250283e+252,-3.4934902364438852e+162,6.9940322601823119e+230,-2.2235825117069384e+123,3.7017326494192294e+152,-1.4851559406301653e+131,-2.6803671174056172e+32,-3.2071693030955775e+47,6.6790072578767358e+46,3.1206337282841379e+73,2.0840513085466668e+261,-1.1055958351643544e+127,3.6089847730347651,-3.0787833874024288e+158,-2.5323204485189346e+123,4.0975576308777001e+66,2.3804144431112929e+28,-5.155125741448965e+289,5.6197329772764141e+296,-1.6412541949168557e+45,-3.6272138730630264e+199,1.1846938336697931e+210,-1.5002292740459051e+127,1.7679503522963377e+70,5.004036605830987e+117,1.6500772048219014e+70,414915.13837312144,-4.7996481550675135e+285,-1.9272063804683984e+187,8.2574589609051519e+136,-295.04517384057021,7.6604624765893482e+256,18373468.893500131,9.0011173796455246e+278,1.0223459327804521e+133,-1.1615817673745554e+183,2119549408231.1936,-3.2042158872610373e+61,-3.1827180514175338e+237,-4211579.0186931491,4.1455900408003173e+235,-1.5482137111587124e+45,6.1697648383306562e+201,-3.3951254242281628e+195,-1.2538562081198978e+24,-5.4673354934084389e+35,3.5538292310431616e+180,-6.2070777850985671e+100,8.1955951376749025e+132,-8.093834808725992e+280,-2.1833995080248356e+294,3.6990964601608368e+22,1.0702568221799479e+177,-8.1539909023355714e+174,8.9512015782700052e+230,8.0981974217139141e+116,-1.0467645730229128e+112,1.0656763600686213e+106,-1.7650274945214203e+104,-1.4747032448875916e+48,5.3501758655690763e+239,9.9218735393351652e+128,8920280668.4773769,8.7800546193641626e+269,1.0136179811209649e+20,-665886377.76285112,-5.4033004353094115e+29,-2.1636983923741728e+199,1.5538774946047549e+91,5.0306523474908991e+164,-1.1166758216401269e+242,1.6870661961481026e+34,1.9822525197693042e+231,-2.4569467705057939e+93,415899.26616658928,-1.7938307462385929e+58,-2.4070575870897428e+93,-2.4446090692056786e+250,-1.0640645673247689e+135,9.4076520742387752e+269,4.2729751291946903e+98,3.9362737068663267e+164,-9.1301833832815432e+178,1.4818671779301379e+31,3.3593563449811644e+168,-9.9279685426391371e+130,-4.7841036673673156e+61,6.0954097569330028e+239,-2.5700250471384103e+104,-2.6869011956313271e+82,0.17470345079172628,4.3841831096776906e+235,-9.2226271514539512e+298,-2.0743389028615641e+61,2.4679219457509484e+28,-7.3188152819388395e+29,628713080158790.38,-1.9365138949296334e+123,-1.3747943849871181e+86,-3.2772529331466537e+35,-3.9129207799522021e+35,5.2616921412516325e+252,-2.2387918134648173e+123,2.4652916809099586e+37,-1.1183142597954292e+75,5.2810926494598752e+164,-2.1612561155451569e+285,-2.3499680564975388e+259,3.1264163057255415e+274,3.7790524347978192e+91,4093.9089499676411,2.4604708471223043e+283,-9.8671149378092676e+207,2.6105691480859588e+28,-8.1156504378549723e+54,-1.2736040615807098e+294,-6.1408567761507488e+100,-6.9311261757873104e+146,-5.6311725967902441e+142,-6.3820540345157277e+158,2.074329506029289e+283,8.0360592411259666e+19,-5.0754472921403495e+100,4.2582316703080845e+148,-8.3296945066774021e+298,5.4791942054436409e+144,-1.0026775157979925e+65,6.261586133414975e+66,-3.3686767066792682e+195,2.309593582829671e+17,-1.2399574638708602e+183,-4.9413778177014656e+207,-9.4404432617993465e+138,-2.4701720434811901e+48,2.3270082316988422e+193,-4.6104034019960022e+237,-1.0267873294574742e+183,-6.6389974789857748e+32,1.7852500656411702e+31,-2.9046330592256537e+68,-3.3157971968478172e+18,-1.4838963852644723e+259,-1.4223266918573263e+303,1.0356024499541695e+185,-6.7595515687446169e+29,-5.1659350650794368e+207,-16.403428120510281,387777.09804572334,-4.8994747846195098e+146,1.0105296616739634e+20,-8.9853071942098175e+258,-99730994551.660675,-6.7069180428927687e+182,-0.088072306540775011,2.2444789715422928e+34,-7.9110237013207754e+111,2.3403338939017414e+84,-7.2099884198394121e+170,5.8445041184781865e+113,5.9906850591117951e+136,3.0832529429456501e+296,1.9361368464633436e+125,3.5738423552368162e+25,-2.6638323449063345e+75,-4.3895303279798335e+250,7.5883617913554421e+49,-8.0584999478785562e+174,-1.3128251871997334e+45,-1.0492699522516357e+86,-7.7889445096846227e+29,1.3027333350304234e+34,-4.9865491631943157e+158,1.8711657512530589e+102,-3.4842659164702702e+203,-3.996691388269107e+119,-2.2688938537045189e+259,1.8228689765418826e+17,3.387205258305985e+197,5.8922600279706443e+156,-1.1566920624428001e+45,2.0639772310531477e+43,-2.0176446493546726e+119,-1.2237404457657893e+89,-0.58473326518644031,-3.7018159565204655e+154,-1.9743131362991418e+212,1.0523564866635271e+50,-8.2488420704842154e+178,-4.7916748476651208e+61,-603007068.63224435,4.6578255365775817e+164,4.8027803552909236e+117,-7.6257587508140467e+54,-2.1806501809099249e+303,5.2585797911776494e+239,9.160321503439935e+136,-5.7654582925750201e+298,3.6844362659084338e+265,8.3486984366486829e+205,-1.3483955378847275e+220,1.7829022418135971e+77,2.3310461242451649e+37,-2.7032928275664041e+154,1.2983744511345665e+270,514799401033393.94,-1.3813367703691301e+86,9.084035775414453e+269,2.2032195813449443e+248,-1.0580269707484073e+259,-8.4984888702242231e+71,-5.8572370488331659e+237,-9.2082938511475119e+70,1.4227148982360509e+53,8.4993530336213775e+180,-6.345736086460698e+158,-3.0506149634788855e+154,-0.99518451189625656,4082.2446550772565,4.4664359077826515e+102,3.9138733107716273e+218,-1.606611822454501e+68,-2.7443544026341408e+123,-9.6173739628954571e+26,1.9315970353887127e+121,2.3195267583853577e+31,2.2806645103635094e+102,-4.922864837808593e+100,-1.8403663463499854e+93,2068986488116.3613,-3.4598668846074956e+220,-3.7186640749576882e+158,-1.8463511349233158e+294,5.0810571098246402e+117,-1.1088022466499616e+212,2.1550965504436628e+193,-6.5516705252785383e+170,1.4670463660743037e+193,26448145.958642732,7.2058626662917585e+172,-4.1665689659026205e+170,-14.389817226970358,-9.7625107797453694e+134,-3885284.3713045949,2.2784502012596912e+63,1.4822838053286695e+70,-5.0773044982487062e+71,6.6607214713457669e+136,-2.1102309497673288e+170,-1.1684884805880259e+179,-1.9781095576930482e+303,-1.1673700436898298e+97,-1.2558315879513963e+131,-4.3348584780572976e+237,-4.9323167397282287e+203,3.8354048582717627e+201,-2.588849991761735e+48,2.0304122922080407e+292,4.5373552720521823e+73,9.9396354372388162e+136,-7.5338310605681517e+211,-9.7247453319239044e+71,4.1187346267705749e+188,-35449075528639.742,-1.6532639076609368e+187,-4.3630985620810064e+162,-633764416.75598013,2.4814697610394756e+222,7.9606531981378726e+113,-4.0434350290584328e+100,2.9428072147192292e+193,-123340714695.31932,-138375.50307322748,-8.2418710592882918e+54,-4063388.4185471525,2.2886015010094637e+25,-8.3596825499042936e+134,-1.9304957020412916e+58,1.805724697978873e+53,1.8200398833078868e+106,3.1230262840081826e+121,-1.125078804614945e+135,1.0497712435874134e+20,-1.0252957806880033e+112,690998907533.03845,5.9668315665377706e+256,1.9974731112879555e+17,9.201783086739989e+132,8.7777260909730748e+291,1.9012815941299158e+283,1.7709955565388105e+214,8.9712821763878267e+172,-7.7883844013335496e+54,4.1380879583291846e+287,-7.630794475727948e+203,4.4938619580068887e+46,6.6645857165687093e+98,1.7031352095179686e+185,5.0170890255130853e+117,-4.2019321431271572e+61,-36921.001287432031,8.9256634811389886e+184,3.114864263054094e+164,1.8510749330884577e+193,-2.4560944459050279e+123,-4297933.4389558779,-5.7520246669936098e+267,-4.3708352927620465e+51,8.7462230068638129e+278,3.269358634988411e+43,1.8969454480836806e+274,-1.4987028835630868e+183,-8.8982023322186893e+64,-1.5165621588850871e+246,2.5860805040201193e+226,1.4668263505340619e+77,3.7045647036494861e+43,5.6073607291880687e+222,1.0036263287065427e+110,7.130837168436638e+184,9.2224187277948085e+128,-0.2078908237566896,-5.0505019545589319e+43,5.0374996693872229e+160,-4.9960279168735025e+199,-6.120450124491308e+89,-5.720682711406612e+298,-2.6891779280418064e+272,-6.3989637460070918e+178,0.15715715715715717,3.0689270764954376e+56,8.1189104321227115e+113,-4.9649869961973241e+115,3.0577245857341771e+102,0.001001001001001001,7.5541404000954798e+113,-1.7159295390765793e+108,3.7588421213668622e+217,-2.9370013852965512e+294,1.7178370876591873e+70,-1.0145317338856854e+65,-7.3271859612442303e+224,2.9568156057846017e+40,5.082573350916423e+117,7.5172049133181995e+49,94.741212927733926,-1.8918147837116475e+233,-4.9520154453292174e+29,7.8265423133498031e+120,0,-1.208139224377208e+97,1.5809258228454937e+117,3.1053685234502456e+40,-9.5564064830420449e+23,-5.8931016442981467e+138,-2.6972614634766251e+75,3.5495076792997997e+201,-6.7652600345003951e+162,8.4531302321642675e+59,1.7692316493501017e+34,8.2901135404074595e+140,-1.2084061796639269e+208,1.5711833924859402e+214,-1.837031963604364e+48,3.5818085570181897e+73,-3.0278681943262346e+272,2.077622822347863e+231,-7.5818427168708054e+54,-5.0255888529489437e+250,4.228239921075169e+218,0.38096876815412667,2.2559751781824848e+34,2.9066913871816196e+261,3.1639310914263858e+59,6.3393098058972415e+156,-117452542981.29709,7686082929.0309801,-6.570366408624348e+150,-7.448571184818451e+276,2.1526525399437386e+189,-2.8835834065670213e+272,7.6044455395896857e+140,5.6492282968260356e+296,4.1108372688786201e+102,-5.0193546145202797e+267,-6.8909507323891571e+174,-3.1466451678933395e+285,1.0251853650445342e+177,2.4779655264257507e+278,-1.7518385536538015e+187,-0.16975058141224306,8.5538127684599206e+172,3.7309456563134779e+222,2.6896296295573504e+283,3.4251259711248228,-7.6778763963612331e+38,-3.2357569839318388e+154,2.224012002861125e+197,8.1064390076181549e+176,4.3873424485538195e+45,-4.9049687631849516e+71,1.5273318309566883e+17,492205708803614.31,-6.7014114197737851e+162,-4.5093045422896486e+18,9.9608700889065366e+109,-3.4007726001501723e+293,-1.0358057739295795e+112,1.0280424106477975e+137,7.8919045166805656e+180,1.0735385842791837e+181,1.8279989864406188e+218,3.418142274666867e+197,-1.0209474276557473e+79,-3773867.9916384309,1.2411066788282217e+181,-5.5943739267853763e+38,7.4052281253822137e+98,-2.4891342458916712e+104,-2.3852323852695143e+246,-0.24284544805065322,-1.1617944264232776e+242,-4235638.1303750761,-4.8603752451942266e+51,1.789317604596016e+77,7.0262786555311875e+164,-1.6950835960368824e+68]}

},{}],36:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var fallingFactorial = require( './../lib' );


// FIXTURES //

var negative = require( './fixtures/cpp/negative.json' );
var large = require( './fixtures/cpp/large.json' );
var small = require( './fixtures/cpp/small.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof fallingFactorial, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided a negative `n`', function test( t ) {
	var val = fallingFactorial( 0.5, -1.0 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );

	val = fallingFactorial( 0.5, -2.0 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided a non-integer `n`', function test( t ) {
	var val = fallingFactorial( 0.5, 1.5 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );

	val = fallingFactorial( 0.5, 0.3 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );

	val = fallingFactorial( 2.0, -0.3 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `0` for `x = 0`', function test( t ) {
	var val = fallingFactorial( 0.0, 2 );
	t.strictEqual( val, 0, 'returns 0' );

	val = fallingFactorial( 0.0, 1 );
	t.strictEqual( val, 0, 'returns 0' );
	t.end();
});

tape( 'the function returns `1` for `n = 0`', function test( t ) {
	var val = fallingFactorial( 2.0, 0 );
	t.strictEqual( val, 1, 'returns 1' );

	val = fallingFactorial( -1.7, 0 );
	t.strictEqual( val, 1, 'returns 1' );
	t.end();
});

tape( 'the function returns `+infinity` for small `x` and large `n`', function test( t ) {
	t.equal( fallingFactorial( 0.2, 200 ), PINF, 'equals +infinity' );
	t.equal( fallingFactorial( 0.4, 175 ), PINF, 'equals +infinity' );
	t.equal( fallingFactorial( 0.1, 250 ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function evaluates the falling factorial for large `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var x;
	var y;

	expected = large.expected;
	x = large.x;
	n = large.n;
	for ( i = 0; i < x.length; i++ ) {
		y = fallingFactorial( x[i], n[i] );
		if ( y === expected[i] ) {
			t.strictEqual( y, expected[i], 'x: '+x[i]+'. n: '+n[i]+', y: '+y+'. expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the falling factorial for small `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var x;
	var y;

	expected = small.expected;
	x = small.x;
	n = small.n;
	for ( i = 0; i < x.length; i++ ) {
		y = fallingFactorial( x[i], n[i] );
		if ( y === expected[i] ) {
			t.strictEqual( y, expected[i], 'x: '+x[i]+'. n: '+n[i]+', y: '+y+'. expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 160.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the falling factorial for negative `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var x;
	var y;

	expected = negative.expected;
	x = negative.x;
	n = negative.n;
	for ( i = 0; i < x.length; i++ ) {
		y = fallingFactorial( x[i], n[i] );
		if ( y === expected[i] ) {
			t.strictEqual( y, expected[i], 'x: '+x[i]+'. n: '+n[i]+', y: '+y+'. expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 60.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});


}).call(this,"/lib/node_modules/@stdlib/math/base/special/falling-factorial/test/test.js")
},{"./../lib":31,"./fixtures/cpp/large.json":33,"./fixtures/cpp/negative.json":34,"./fixtures/cpp/small.json":35,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-eps":98,"@stdlib/math/constants/float64-pinf":109,"tape":168}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./floor.js":37}],39:[function(require,module,exports){
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
	if (
		x < -170.5674972726612 ||
		x > 171.61447887182298
	) {
		return PINF;
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

},{"./small_approximation.js":41,"./stirling_approximation.js":42,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/floor":38,"@stdlib/math/base/special/sin":57,"@stdlib/math/base/tools/evalrational":72,"@stdlib/math/constants/float64-ninf":107,"@stdlib/math/constants/float64-pi":108,"@stdlib/math/constants/float64-pinf":109}],40:[function(require,module,exports){
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

},{"./gamma.js":39}],41:[function(require,module,exports){
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
	return z / ( (1.0 + EULER*x) * x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/constants/float64-eulergamma":99}],42:[function(require,module,exports){
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
	w = 1.0 + w * polyval( w );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, 0.5*x - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/base/special/exp":26,"@stdlib/math/base/special/pow":47,"@stdlib/math/base/tools/evalpoly":69,"@stdlib/math/constants/float64-sqrt-two-pi":111}],43:[function(require,module,exports){
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

},{"./ldexp.js":44}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":23,"@stdlib/math/base/utils/float64-exponent":74,"@stdlib/math/base/utils/float64-from-words":76,"@stdlib/math/base/utils/float64-normalize":84,"@stdlib/math/base/utils/float64-to-words":92,"@stdlib/math/constants/float64-exponent-bias":100,"@stdlib/math/constants/float64-max-base2-exponent":104,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":103,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":106,"@stdlib/math/constants/float64-ninf":107,"@stdlib/math/constants/float64-pinf":109}],45:[function(require,module,exports){
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

},{"./log1p.js":46}],46:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":69,"@stdlib/math/base/utils/float64-get-high-word":80,"@stdlib/math/base/utils/float64-set-high-word":87,"@stdlib/math/constants/float64-exponent-bias":100,"@stdlib/math/constants/float64-ninf":107,"@stdlib/math/constants/float64-pinf":109}],47:[function(require,module,exports){
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

},{"./pow.js":50}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":69,"@stdlib/math/base/utils/float64-get-high-word":80,"@stdlib/math/base/utils/float64-set-high-word":87,"@stdlib/math/base/utils/float64-set-low-word":89,"@stdlib/math/constants/float64-exponent-bias":100}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":69,"@stdlib/math/base/utils/float64-set-low-word":89}],50:[function(require,module,exports){
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

},{"./log2ax.js":48,"./logx.js":49,"./pow2.js":51,"./x_is_zero.js":52,"./y_is_huge.js":53,"./y_is_infinite.js":54,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/abs":19,"@stdlib/math/base/special/sqrt":64,"@stdlib/math/base/utils/float64-get-high-word":80,"@stdlib/math/base/utils/float64-get-low-word":82,"@stdlib/math/base/utils/float64-set-low-word":89,"@stdlib/math/base/utils/float64-to-words":92,"@stdlib/math/base/utils/uint32-to-int32":95,"@stdlib/math/constants/float64-ninf":107,"@stdlib/math/constants/float64-pinf":109}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":43,"@stdlib/math/base/tools/evalpoly":69,"@stdlib/math/base/utils/float64-get-high-word":80,"@stdlib/math/base/utils/float64-set-high-word":87,"@stdlib/math/base/utils/float64-set-low-word":89,"@stdlib/math/base/utils/uint32-to-int32":95,"@stdlib/math/constants/float64-exponent-bias":100,"@stdlib/math/constants/float64-ln-two":102}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/copysign":23,"@stdlib/math/constants/float64-ninf":107,"@stdlib/math/constants/float64-pinf":109}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":80}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-pinf":109}],55:[function(require,module,exports){
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

},{"./sin.js":63}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":38,"@stdlib/math/base/special/ldexp":43}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{"./kernel_rem_pio2.js":59,"./rem_pio2_medium.js":62,"@stdlib/math/base/utils/float64-from-words":76,"@stdlib/math/base/utils/float64-get-high-word":80,"@stdlib/math/base/utils/float64-get-low-word":82}],62:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":55,"@stdlib/math/base/utils/float64-get-high-word":80}],63:[function(require,module,exports){
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

},{"./kernel_cos.js":58,"./kernel_sin.js":60,"./rem_pio2.js":61,"@stdlib/math/base/utils/float64-get-high-word":80}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{"./trunc.js":66}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":21,"@stdlib/math/base/special/floor":38}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{"./evalpoly.js":67}],69:[function(require,module,exports){
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

},{"./evalpoly.js":67,"./factory.js":68,"@stdlib/utils/define-read-only-property":113}],70:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":19}],71:[function(require,module,exports){
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

},{"./evalrational.js":70}],72:[function(require,module,exports){
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

},{"./evalrational.js":70,"./factory.js":71,"@stdlib/utils/define-read-only-property":113}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":80,"@stdlib/math/constants/float64-exponent-bias":100,"@stdlib/math/constants/float64-high-word-exponent-mask":101}],74:[function(require,module,exports){
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

},{"./exponent.js":73}],75:[function(require,module,exports){
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

},{"./indices.js":77}],76:[function(require,module,exports){
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

},{"./from_words.js":75}],77:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],78:[function(require,module,exports){
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

},{"./high.js":79}],79:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],80:[function(require,module,exports){
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

},{"./get_high_word.js":78}],81:[function(require,module,exports){
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

},{"./low.js":83}],82:[function(require,module,exports){
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

},{"./get_low_word.js":81}],83:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],84:[function(require,module,exports){
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

},{"./normalize.js":85}],85:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":19,"@stdlib/math/constants/float64-smallest-normal":110}],86:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":79}],87:[function(require,module,exports){
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

},{"./set_high_word.js":88}],88:[function(require,module,exports){
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

},{"./high.js":86}],89:[function(require,module,exports){
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

},{"./set_low_word.js":91}],90:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":83}],91:[function(require,module,exports){
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

},{"./low.js":90}],92:[function(require,module,exports){
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

},{"./to_words.js":94}],93:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":77}],94:[function(require,module,exports){
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

},{"./indices.js":93}],95:[function(require,module,exports){
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

},{"./uint32_to_int32.js":96}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{"./define_read_only_property.js":112}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){

},{}],116:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"dup":115}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"base64-js":114,"ieee754":137}],119:[function(require,module,exports){
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
},{"../../is-buffer/index.js":139}],120:[function(require,module,exports){
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

},{"./lib/is_arguments.js":121,"./lib/keys.js":122}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],123:[function(require,module,exports){
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

},{"foreach":133,"object-keys":142}],124:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],125:[function(require,module,exports){
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

},{"./helpers/isFinite":126,"./helpers/isNaN":127,"./helpers/mod":128,"./helpers/sign":129,"es-to-primitive/es5":130,"has":136,"is-callable":140}],126:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],127:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],128:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],129:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],130:[function(require,module,exports){
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

},{"./helpers/isPrimitive":131,"is-callable":140}],131:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){

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


},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":134}],136:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":135}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{"./isArguments":143}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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
},{"_process":117}],145:[function(require,module,exports){
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
},{"_process":117}],146:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":147}],147:[function(require,module,exports){
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
},{"./_stream_readable":149,"./_stream_writable":151,"core-util-is":119,"inherits":138,"process-nextick-args":145}],148:[function(require,module,exports){
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
},{"./_stream_transform":150,"core-util-is":119,"inherits":138}],149:[function(require,module,exports){
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
},{"./_stream_duplex":147,"./internal/streams/BufferList":152,"./internal/streams/destroy":153,"./internal/streams/stream":154,"_process":117,"core-util-is":119,"events":132,"inherits":138,"isarray":155,"process-nextick-args":145,"safe-buffer":162,"string_decoder/":156,"util":115}],150:[function(require,module,exports){
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
},{"./_stream_duplex":147,"core-util-is":119,"inherits":138}],151:[function(require,module,exports){
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
},{"./_stream_duplex":147,"./internal/streams/destroy":153,"./internal/streams/stream":154,"_process":117,"core-util-is":119,"inherits":138,"process-nextick-args":145,"safe-buffer":162,"util-deprecate":174}],152:[function(require,module,exports){
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
},{"safe-buffer":162}],153:[function(require,module,exports){
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
},{"process-nextick-args":145}],154:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":132}],155:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],156:[function(require,module,exports){
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
},{"safe-buffer":162}],157:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":158}],158:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":147,"./lib/_stream_passthrough.js":148,"./lib/_stream_readable.js":149,"./lib/_stream_transform.js":150,"./lib/_stream_writable.js":151}],159:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":158}],160:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":151}],161:[function(require,module,exports){
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
},{"_process":117,"through":173}],162:[function(require,module,exports){
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

},{"buffer":118}],163:[function(require,module,exports){
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

},{"events":132,"inherits":138,"readable-stream/duplex.js":146,"readable-stream/passthrough.js":157,"readable-stream/readable.js":158,"readable-stream/transform.js":159,"readable-stream/writable.js":160}],164:[function(require,module,exports){
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

},{"es-abstract/es5":125,"function-bind":135}],165:[function(require,module,exports){
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

},{"./implementation":164,"./polyfill":166,"./shim":167,"define-properties":123,"function-bind":135}],166:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":164}],167:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":166,"define-properties":123}],168:[function(require,module,exports){
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
},{"./lib/default_stream":169,"./lib/results":171,"./lib/test":172,"_process":117,"defined":124,"through":173}],169:[function(require,module,exports){
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
},{"_process":117,"fs":116,"through":173}],170:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":117}],171:[function(require,module,exports){
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
},{"_process":117,"events":132,"function-bind":135,"has":136,"inherits":138,"object-inspect":141,"resumer":161,"through":173}],172:[function(require,module,exports){
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
},{"./next_tick":170,"deep-equal":120,"defined":124,"events":132,"has":136,"inherits":138,"path":144,"string.prototype.trim":165}],173:[function(require,module,exports){
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
},{"_process":117,"stream":163}],174:[function(require,module,exports){
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
},{}]},{},[36]);
