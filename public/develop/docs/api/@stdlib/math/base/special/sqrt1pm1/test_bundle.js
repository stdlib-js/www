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

},{"./is_nan.js":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./abs.js":6}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/tools/evalpoly":20,"@stdlib/math/base/utils/float64-get-high-word":23,"@stdlib/math/base/utils/float64-set-high-word":25,"@stdlib/math/constants/float64-exponent-bias":28,"@stdlib/math/constants/float64-half-ln-two":29,"@stdlib/math/constants/float64-ninf":30,"@stdlib/math/constants/float64-pinf":31}],9:[function(require,module,exports){
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

},{"./expm1.js":8}],10:[function(require,module,exports){
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

},{"./log1p.js":11}],11:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/tools/evalpoly":20,"@stdlib/math/base/utils/float64-get-high-word":23,"@stdlib/math/base/utils/float64-set-high-word":25,"@stdlib/math/constants/float64-exponent-bias":28,"@stdlib/math/constants/float64-ninf":30,"@stdlib/math/constants/float64-pinf":31}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

/**
* Compute the value of `sqrt(1+x)-1`.
*
* @module @stdlib/math/base/special/sqrt1pm1
*
* @example
* var sqrt1pm1 = require( '@stdlib/math/base/special/sqrt1pm1' );
*
* var v = sqrt1pm1( 3.0 );
* // returns 1.0
*
* v = sqrt1pm1( 0.5 );
* // returns ~0.225
*
* v = sqrt1pm1( 0.02 );
* // returns ~0.01
*
* v = sqrt1pm1( -0.5 );
* // returns ~-0.292
*/

// MODULES //

var sqrt1pm1 = require( './sqrt1pm1.js' );


// EXPORTS //

module.exports = sqrt1pm1;

},{"./sqrt1pm1.js":14}],14:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link https://github.com/boostorg/math/blob/fa1896fbc4c6fadc167307342ceb20bf2b6c0688/include/boost/math/special_functions/sqrt1pm1.hpp}.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );


// MAIN //

/**
* Computes the value of `sqrt(1+x)-1`.
*
* @param {number} x - input value
* @returns {number} square root of 1+x minus one.
*
* @example
* var v = sqrt1pm1( 3.0 );
* // returns 1.0
*
* @example
* var v = sqrt1pm1( 0.5 );
* // returns ~0.225
*
* @example
* var v = sqrt1pm1( 0.02 );
* // returns ~0.01
*
* @example
* var v = sqrt1pm1( -0.5 );
* // returns ~-0.292
*
* @example
* var v = sqrt1pm1( -1.1 );
* // returns NaN
*
* @example
* var v = sqrt1pm1( NaN );
* // returns NaN
*/
function sqrt1pm1( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( abs( x ) > 0.75 ) {
		return sqrt( 1.0 + x ) - 1.0;
	}
	return expm1( log1p( x ) / 2.0 );
} // end FUNCTION sqrt1pm1()


// EXPORTS //

module.exports = sqrt1pm1;

},{"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/abs":7,"@stdlib/math/base/special/expm1":9,"@stdlib/math/base/special/log1p":10,"@stdlib/math/base/special/sqrt":12}],15:[function(require,module,exports){
module.exports={"x": [0.7600000000000000,0.8593393393393394,0.9586786786786787,1.0580180180180179,1.1573573573573572,1.2566966966966966,1.3560360360360360,1.4553753753753753,1.5547147147147147,1.6540540540540540,1.7533933933933934,1.8527327327327328,1.9520720720720719,2.0514114114114115,2.1507507507507508,2.2500900900900902,2.3494294294294296,2.4487687687687689,2.5481081081081083,2.6474474474474476,2.7467867867867870,2.8461261261261264,2.9454654654654657,3.0448048048048051,3.1441441441441436,3.2434834834834829,3.3428228228228223,3.4421621621621616,3.5415015015015010,3.6408408408408404,3.7401801801801797,3.8395195195195191,3.9388588588588584,4.0381981981981978,4.1375375375375372,4.2368768768768765,4.3362162162162159,4.4355555555555553,4.5348948948948946,4.6342342342342340,4.7335735735735733,4.8329129129129127,4.9322522522522521,5.0315915915915914,5.1309309309309308,5.2302702702702701,5.3296096096096095,5.4289489489489489,5.5282882882882873,5.6276276276276267,5.7269669669669661,5.8263063063063054,5.9256456456456448,6.0249849849849841,6.1243243243243235,6.2236636636636629,6.3230030030030022,6.4223423423423416,6.5216816816816809,6.6210210210210203,6.7203603603603597,6.8196996996996990,6.9190390390390384,7.0183783783783777,7.1177177177177171,7.2170570570570565,7.3163963963963958,7.4157357357357352,7.5150750750750746,7.6144144144144139,7.7137537537537533,7.8130930930930926,7.9124324324324320,8.0117717717717714,8.1111111111111107,8.2104504504504501,8.3097897897897894,8.4091291291291288,8.5084684684684682,8.6078078078078075,8.7071471471471469,8.8064864864864862,8.9058258258258256,9.0051651651651650,9.1045045045045043,9.2038438438438437,9.3031831831831830,9.4025225225225224,9.5018618618618618,9.6012012012012011,9.7005405405405405,9.7998798798798799,9.8992192192192192,9.9985585585585586,10.0978978978978979,10.1972372372372373,10.2965765765765749,10.3959159159159142,10.4952552552552536,10.5945945945945930,10.6939339339339323,10.7932732732732717,10.8926126126126110,10.9919519519519504,11.0912912912912898,11.1906306306306291,11.2899699699699685,11.3893093093093078,11.4886486486486472,11.5879879879879866,11.6873273273273259,11.7866666666666653,11.8860060060060047,11.9853453453453440,12.0846846846846834,12.1840240240240227,12.2833633633633621,12.3827027027027015,12.4820420420420408,12.5813813813813802,12.6807207207207195,12.7800600600600589,12.8793993993993983,12.9787387387387376,13.0780780780780770,13.1774174174174163,13.2767567567567557,13.3760960960960951,13.4754354354354344,13.5747747747747738,13.6741141141141131,13.7734534534534525,13.8727927927927919,13.9721321321321312,14.0714714714714706,14.1708108108108100,14.2701501501501493,14.3694894894894887,14.4688288288288280,14.5681681681681674,14.6675075075075068,14.7668468468468461,14.8661861861861855,14.9655255255255248,15.0648648648648642,15.1642042042042036,15.2635435435435429,15.3628828828828823,15.4622222222222216,15.5615615615615610,15.6609009009009004,15.7602402402402397,15.8595795795795791,15.9589189189189185,16.0582582582582596,16.1575975975975972,16.2569369369369383,16.3562762762762759,16.4556156156156170,16.5549549549549546,16.6542942942942958,16.7536336336336333,16.8529729729729745,16.9523123123123121,17.0516516516516532,17.1509909909909908,17.2503303303303319,17.3496696696696695,17.4490090090090106,17.5483483483483482,17.6476876876876894,17.7470270270270269,17.8463663663663681,17.9457057057057057,18.0450450450450468,18.1443843843843844,18.2437237237237255,18.3430630630630631,18.4424024024024042,18.5417417417417418,18.6410810810810830,18.7404204204204206,18.8397597597597617,18.9390990990990993,19.0384384384384404,19.1377777777777780,19.2371171171171191,19.3364564564564567,19.4357957957957979,19.5351351351351354,19.6344744744744766,19.7338138138138142,19.8331531531531517,19.9324924924924929,20.0318318318318305,20.1311711711711716,20.2305105105105092,20.3298498498498503,20.4291891891891879,20.5285285285285291,20.6278678678678666,20.7272072072072078,20.8265465465465454,20.9258858858858865,21.0252252252252241,21.1245645645645652,21.2239039039039028,21.3232432432432439,21.4225825825825815,21.5219219219219227,21.6212612612612602,21.7206006006006014,21.8199399399399390,21.9192792792792801,22.0186186186186177,22.1179579579579588,22.2172972972972964,22.3166366366366375,22.4159759759759751,22.5153153153153163,22.6146546546546539,22.7139939939939950,22.8133333333333326,22.9126726726726737,23.0120120120120113,23.1113513513513524,23.2106906906906900,23.3100300300300312,23.4093693693693687,23.5087087087087099,23.6080480480480475,23.7073873873873886,23.8067267267267262,23.9060660660660673,24.0054054054054049,24.1047447447447460,24.2040840840840836,24.3034234234234248,24.4027627627627623,24.5021021021021035,24.6014414414414411,24.7007807807807822,24.8001201201201198,24.8994594594594609,24.9987987987987985,25.0981381381381397,25.1974774774774772,25.2968168168168184,25.3961561561561560,25.4954954954954971,25.5948348348348347,25.6941741741741758,25.7935135135135134,25.8928528528528545,25.9921921921921921,26.0915315315315333,26.1908708708708708,26.2902102102102084,26.3895495495495496,26.4888888888888872,26.5882282282282283,26.6875675675675659,26.7869069069069070,26.8862462462462446,26.9855855855855857,27.0849249249249233,27.1842642642642645,27.2836036036036020,27.3829429429429432,27.4822822822822808,27.5816216216216219,27.6809609609609595,27.7803003003003006,27.8796396396396382,27.9789789789789793,28.0783183183183169,28.1776576576576581,28.2769969969969956,28.3763363363363368,28.4756756756756744,28.5750150150150155,28.6743543543543531,28.7736936936936942,28.8730330330330318,28.9723723723723730,29.0717117117117105,29.1710510510510517,29.2703903903903893,29.3697297297297304,29.4690690690690680,29.5684084084084091,29.6677477477477467,29.7670870870870878,29.8664264264264254,29.9657657657657666,30.0651051051051041,30.1644444444444453,30.2637837837837829,30.3631231231231240,30.4624624624624616,30.5618018018018027,30.6611411411411403,30.7604804804804814,30.8598198198198190,30.9591591591591602,31.0584984984984978,31.1578378378378389,31.2571771771771765,31.3565165165165176,31.4558558558558552,31.5551951951951963,31.6545345345345339,31.7538738738738751,31.8532132132132126,31.9525525525525538,32.0518918918918914,32.1512312312312289,32.2505705705705665,32.3499099099099112,32.4492492492492488,32.5485885885885864,32.6479279279279240,32.7472672672672616,32.8466066066065991,32.9459459459459438,33.0452852852852814,33.1446246246246190,33.2439639639639566,33.3433033033033013,33.4426426426426389,33.5419819819819764,33.6413213213213140,33.7406606606606587,33.8399999999999963,33.9393393393393339,34.0386786786786715,34.1380180180180162,34.2373573573573537,34.3366966966966913,34.4360360360360289,34.5353753753753736,34.6347147147147112,34.7340540540540488,34.8333933933933864,34.9327327327327311,35.0320720720720686,35.1314114114114062,35.2307507507507438,35.3300900900900885,35.4294294294294261,35.5287687687687637,35.6281081081081012,35.7274474474474459,35.8267867867867835,35.9261261261261211,36.0254654654654587,36.1248048048048034,36.2241441441441410,36.3234834834834786,36.4228228228228161,36.5221621621621608,36.6215015015014984,36.7208408408408360,36.8201801801801736,36.9195195195195183,37.0188588588588559,37.1181981981981934,37.2175375375375310,37.3168768768768757,37.4162162162162133,37.5155555555555509,37.6148948948948885,37.7142342342342332,37.8135735735735707,37.9129129129129083,38.0122522522522459,38.1115915915915906,38.2109309309309282,38.3102702702702658,38.4096096096096034,38.5089489489489480,38.6082882882882856,38.7076276276276232,38.8069669669669608,38.9063063063062984,39.0056456456456431,39.1049849849849807,39.2043243243243182,39.3036636636636558,39.4030030030030005,39.5023423423423381,39.6016816816816757,39.7010210210210133,39.8003603603603580,39.8996996996996955,39.9990390390390331,40.0983783783783707,40.1977177177177154,40.2970570570570530,40.3963963963963906,40.4957357357357282,40.5950750750750728,40.6944144144144104,40.7937537537537480,40.8930930930930856,40.9924324324324303,41.0917717717717679,41.1911111111111055,41.2904504504504430,41.3897897897897877,41.4891291291291253,41.5884684684684629,41.6878078078078005,41.7871471471471452,41.8864864864864828,41.9858258258258203,42.0851651651651579,42.1845045045045026,42.2838438438438402,42.3831831831831778,42.4825225225225154,42.5818618618618601,42.6812012012011976,42.7805405405405352,42.8798798798798728,42.9792192192192175,43.0785585585585551,43.1778978978978927,43.2772372372372303,43.3765765765765750,43.4759159159159125,43.5752552552552501,43.6745945945945877,43.7739339339339324,43.8732732732732700,43.9726126126126076,44.0719519519519451,44.1712912912912898,44.2706306306306274,44.3699699699699650,44.4693093093093026,44.5686486486486473,44.6679879879879849,44.7673273273273225,44.8666666666666600,44.9660060060060047,45.0653453453453423,45.1646846846846799,45.2640240240240175,45.3633633633633551,45.4627027027026998,45.5620420420420373,45.6613813813813749,45.7607207207207125,45.8600600600600572,45.9593993993993948,46.0587387387387324,46.1580780780780700,46.2574174174174146,46.3567567567567522,46.4560960960960898,46.5554354354354274,46.6547747747747721,46.7541141141141097,46.8534534534534473,46.9527927927927848,47.0521321321321295,47.1514714714714671,47.2508108108108047,47.3501501501501423,47.4494894894894870,47.5488288288288246,47.6481681681681621,47.7475075075074997,47.8468468468468444,47.9461861861861820,48.0455255255255196,48.1448648648648572,48.2442042042042019,48.3435435435435394,48.4428828828828770,48.5422222222222146,48.6415615615615593,48.7409009009008969,48.8402402402402345,48.9395795795795721,49.0389189189189167,49.1382582582582543,49.2375975975975919,49.3369369369369295,49.4362762762762742,49.5356156156156118,49.6349549549549494,49.7342942942942869,49.8336336336336316,49.9329729729729692,50.0323123123123068,50.1316516516516444,50.2309909909909891,50.3303303303303267,50.4296696696696642,50.5290090090090018,50.6283483483483465,50.7276876876876841,50.8270270270270217,50.9263663663663593,51.0257057057057040,51.1250450450450415,51.2243843843843791,51.3237237237237167,51.4230630630630614,51.5224024024023990,51.6217417417417366,51.7210810810810742,51.8204204204204117,51.9197597597597564,52.0190990990990940,52.1184384384384316,52.2177777777777692,52.3171171171171139,52.4164564564564515,52.5157957957957890,52.6151351351351266,52.7144744744744713,52.8138138138138089,52.9131531531531465,53.0124924924924841,53.1118318318318288,53.2111711711711663,53.3105105105105039,53.4098498498498415,53.5091891891891862,53.6085285285285238,53.7078678678678614,53.8072072072071990,53.9065465465465437,54.0058858858858812,54.1052252252252188,54.2045645645645564,54.3039039039039011,54.4032432432432387,54.5025825825825763,54.6019219219219138,54.7012612612612585,54.8006006006005961,54.8999399399399337,54.9992792792792713,55.0986186186186160,55.1979579579579536,55.2972972972972912,55.3966366366366287,55.4959759759759734,55.5953153153153110,55.6946546546546486,55.7939939939939862,55.8933333333333309,55.9926726726726685,56.0920120120120060,56.1913513513513436,56.2906906906906883,56.3900300300300259,56.4893693693693635,56.5887087087087011,56.6880480480480458,56.7873873873873833,56.8867267267267209,56.9860660660660585,57.0854054054054032,57.1847447447447408,57.2840840840840784,57.3834234234234160,57.4827627627627606,57.5821021021020982,57.6814414414414358,57.7807807807807734,57.8801201201201181,57.9794594594594557,58.0787987987987933,58.1781381381381308,58.2774774774774684,58.3768168168168131,58.4761561561561507,58.5754954954954883,58.6748348348348259,58.7741741741741706,58.8735135135135081,58.9728528528528457,59.0721921921921833,59.1715315315315280,59.2708708708708656,59.3702102102102032,59.4695495495495408,59.5688888888888854,59.6682282282282230,59.7675675675675606,59.8669069069068982,59.9662462462462429,60.0655855855855805,60.1649249249249181,60.2642642642642556,60.3636036036036003,60.4629429429429379,60.5622822822822755,60.6616216216216131,60.7609609609609578,60.8603003003002954,60.9596396396396329,61.0589789789789705,61.1583183183183152,61.2576576576576528,61.3569969969969904,61.4563363363363280,61.5556756756756727,61.6550150150150102,61.7543543543543478,61.8536936936936854,61.9530330330330301,62.0523723723723677,62.1517117117117053,62.2510510510510429,62.3503903903903876,62.4497297297297251,62.5490690690690627,62.6484084084084003,62.7477477477477450,62.8470870870870826,62.9464264264264202,63.0457657657657577,63.1451051051051024,63.2444444444444400,63.3437837837837776,63.4431231231231152,63.5424624624624599,63.6418018018017975,63.7411411411411351,63.8404804804804726,63.9398198198198173,64.0391591591591549,64.1384984984984925,64.2378378378378301,64.3371771771771819,64.4365165165165195,64.5358558558558570,64.6351951951951946,64.7345345345345322,64.8338738738738698,64.9332132132132074,65.0325525525525592,65.1318918918918968,65.2312312312312343,65.3305705705705719,65.4299099099099095,65.5292492492492471,65.6285885885885847,65.7279279279279223,65.8272672672672741,65.9266066066066116,66.0259459459459492,66.1252852852852868,66.2246246246246244,66.3239639639639620,66.4233033033032996,66.5226426426426372,66.6219819819819890,66.7213213213213265,66.8206606606606641,66.9200000000000017,67.0193393393393393,67.1186786786786769,67.2180180180180145,67.3173573573573520,67.4166966966967038,67.5160360360360414,67.6153753753753790,67.7147147147147166,67.8140540540540542,67.9133933933933918,68.0127327327327293,68.1120720720720669,68.2114114114114187,68.3107507507507563,68.4100900900900939,68.5094294294294315,68.6087687687687691,68.7081081081081066,68.8074474474474442,68.9067867867867818,69.0061261261261336,69.1054654654654712,69.2048048048048088,69.3041441441441464,69.4034834834834840,69.5028228228228215,69.6021621621621591,69.7015015015014967,69.8008408408408485,69.9001801801801861,69.9995195195195237,70.0988588588588613,70.1981981981981988,70.2975375375375364,70.3968768768768740,70.4962162162162116,70.5955555555555634,70.6948948948949010,70.7942342342342386,70.8935735735735761,70.9929129129129137,71.0922522522522513,71.1915915915915889,71.2909309309309265,71.3902702702702641,71.4896096096096159,71.5889489489489534,71.6882882882882910,71.7876276276276286,71.8869669669669662,71.9863063063063038,72.0856456456456414,72.1849849849849790,72.2843243243243307,72.3836636636636683,72.4830030030030059,72.5823423423423435,72.6816816816816811,72.7810210210210187,72.8803603603603563,72.9796996996996938,73.0790390390390456,73.1783783783783832,73.2777177177177208,73.3770570570570584,73.4763963963963960,73.5757357357357336,73.6750750750750711,73.7744144144144087,73.8737537537537605,73.9730930930930981,74.0724324324324357,74.1717717717717733,74.2711111111111109,74.3704504504504484,74.4697897897897860,74.5691291291291236,74.6684684684684754,74.7678078078078130,74.8671471471471506,74.9664864864864882,75.0658258258258257,75.1651651651651633,75.2645045045045009,75.3638438438438385,75.4631831831831903,75.5625225225225279,75.6618618618618655,75.7612012012012030,75.8605405405405406,75.9598798798798782,76.0592192192192158,76.1585585585585534,76.2578978978979052,76.3572372372372428,76.4565765765765804,76.5559159159159179,76.6552552552552555,76.7545945945945931,76.8539339339339307,76.9532732732732683,77.0526126126126059,77.1519519519519577,77.2512912912912952,77.3506306306306328,77.4499699699699704,77.5493093093093080,77.6486486486486456,77.7479879879879832,77.8473273273273207,77.9466666666666725,78.0460060060060101,78.1453453453453477,78.2446846846846853,78.3440240240240229,78.4433633633633605,78.5427027027026980,78.6420420420420356,78.7413813813813874,78.8407207207207250,78.9400600600600626,79.0393993993994002,79.1387387387387378,79.2380780780780754,79.3374174174174129,79.4367567567567505,79.5360960960961023,79.6354354354354399,79.7347747747747775,79.8341141141141151,79.9334534534534527,80.0327927927927902,80.1321321321321278,80.2314714714714654,80.3308108108108172,80.4301501501501548,80.5294894894894924,80.6288288288288300,80.7281681681681675,80.8275075075075051,80.9268468468468427,81.0261861861861803,81.1255255255255321,81.2248648648648697,81.3242042042042073,81.4235435435435448,81.5228828828828824,81.6222222222222200,81.7215615615615576,81.8209009009008952,81.9202402402402470,82.0195795795795846,82.1189189189189221,82.2182582582582597,82.3175975975975973,82.4169369369369349,82.5162762762762725,82.6156156156156101,82.7149549549549619,82.8142942942942994,82.9136336336336370,83.0129729729729746,83.1123123123123122,83.2116516516516498,83.3109909909909874,83.4103303303303250,83.5096696696696625,83.6090090090090143,83.7083483483483519,83.8076876876876895,83.9070270270270271,84.0063663663663647,84.1057057057057023,84.2050450450450398,84.3043843843843774,84.4037237237237292,84.5030630630630668,84.6024024024024044,84.7017417417417420,84.8010810810810796,84.9004204204204171,84.9997597597597547,85.0990990990990923,85.1984384384384441,85.2977777777777817,85.3971171171171193,85.4964564564564569,85.5957957957957944,85.6951351351351320,85.7944744744744696,85.8938138138138072,85.9931531531531590,86.0924924924924966,86.1918318318318342,86.2911711711711717,86.3905105105105093,86.4898498498498469,86.5891891891891845,86.6885285285285221,86.7878678678678739,86.8872072072072115,86.9865465465465491,87.0858858858858866,87.1852252252252242,87.2845645645645618,87.3839039039038994,87.4832432432432370,87.5825825825825888,87.6819219219219264,87.7812612612612639,87.8806006006006015,87.9799399399399391,88.0792792792792767,88.1786186186186143,88.2779579579579519,88.3772972972973037,88.4766366366366412,88.5759759759759788,88.6753153153153164,88.7746546546546540,88.8739939939939916,88.9733333333333292,89.0726726726726667,89.1720120120120185,89.2713513513513561,89.3706906906906937,89.4700300300300313,89.5693693693693689,89.6687087087087065,89.7680480480480441,89.8673873873873816,89.9667267267267192,90.0660660660660710,90.1654054054054086,90.2647447447447462,90.3640840840840838,90.4634234234234214,90.5627627627627589,90.6621021021020965,90.7614414414414341,90.8607807807807859,90.9601201201201235,91.0594594594594611,91.1587987987987987,91.2581381381381362,91.3574774774774738,91.4568168168168114,91.5561561561561490,91.6554954954955008,91.7548348348348384,91.8541741741741760,91.9535135135135135,92.0528528528528511,92.1521921921921887,92.2515315315315263,92.3508708708708639,92.4502102102102157,92.5495495495495533,92.6488888888888908,92.7482282282282284,92.8475675675675660,92.9469069069069036,93.0462462462462412,93.1455855855855788,93.2449249249249306,93.3442642642642681,93.4436036036036057,93.5429429429429433,93.6422822822822809,93.7416216216216185,93.8409609609609561,93.9403003003002937,94.0396396396396455,94.1389789789789830,94.2383183183183206,94.3376576576576582,94.4369969969969958,94.5363363363363334,94.6356756756756710,94.7350150150150085,94.8343543543543603,94.9336936936936979,95.0330330330330355,95.1323723723723731,95.2317117117117107,95.3310510510510483,95.4303903903903858,95.5297297297297234,95.6290690690690752,95.7284084084084128,95.8277477477477504,95.9270870870870880,96.0264264264264256,96.1257657657657631,96.2251051051051007,96.3244444444444383,96.4237837837837759,96.5231231231231277,96.6224624624624653,96.7218018018018029,96.8211411411411405,96.9204804804804780,97.0198198198198156,97.1191591591591532,97.2184984984984908,97.3178378378378426,97.4171771771771802,97.5165165165165178,97.6158558558558553,97.7151951951951929,97.8145345345345305,97.9138738738738681,98.0132132132132057,98.1125525525525575,98.2118918918918951,98.3112312312312326,98.4105705705705702,98.5099099099099078,98.6092492492492454,98.7085885885885830,98.8079279279279206,98.9072672672672724,99.0066066066066099,99.1059459459459475,99.2052852852852851,99.3046246246246227,99.4039639639639603,99.5033033033032979,99.6026426426426355,99.7019819819819872,99.8013213213213248,99.9006606606606624,100.0000000000000000],  "expected": [0.3266499161421599,0.3635759382371557,0.3995280199691176,0.4345793871438477,0.4687945252339951,0.5022305737458204,0.5349384469860790,0.5669637441164284,0.5983474949818375,0.6291267765444328,0.6593352263461996,0.6890034732743249,0.7181595013479023,0.7468289588312336,0.7750354223932407,0.8028006240541659,0.8301446471329608,0.8570860962186888,0.8836422452546844,0.9098291670847023,0.9356618472209415,0.9611542841209935,0.9863195778790144,1.0111700089263476,1.0357171080835723,1.0599717190979789,1.0839440546288239,1.1076437465003810,1.1310798909242004,1.1542610892927625,1.1771954850633373,1.1998907971805144,1.2223543504263352,1.2445931030363160,1.2666136718765149,1.2884223554398511,1.3100251548881920,1.3314277933394281,1.3526357335751946,1.3736541943244878,1.3944881652607042,1.4151424208342069,1.4356215330490598,1.4559298832807892,1.4760716732217043,1.4960509350312283,1.5158715407606982,1.5355372111150229,1.5550515236073590,1.5744179201574142,1.5936397141790852,1.6127200971987614,1.6316621450417310,1.6504688236206411,1.6691429943568634,1.6876874192628248,1.7061047657108550,1.7243976109118768,1.7425684461252158,1.7606196806190129,1.7785536453990516,1.7963725967223501,1.8140787194104999,1.8316741299765371,1.8491608795780059,1.8665409568078837,1.8838162903341114,1.9009887513976569,1.9180601561782571,1.9350322680363181,1.9519067996387949,1.9686854149763144,1.9853697312782601,2.0019613208320610,2.0184617127124720,2.0348723944262384,2.0511948134771383,2.0674303788560757,2.0835804624605578,2.0996464004476070,2.1156294945238829,2.1315310131765397,2.1473521928481132,2.1630942390585148,2.1787583274770204,2.1943456049469416,2.2098571904655171,2.2252941761213849,2.2406576279918653,2.2559485870021354,2.2711680697482572,2.2863170692859018,2.3013965558864964,2.3164074777624295,2.3313507617628466,2.3462273140414771,2.3610380206978578,2.3757837483932400,2.3904653449423803,2.4050836398823736,2.4196394450195964,2.4341335549557872,2.4485667475942248,2.4629397846269216,2.4772534120036878,2.4915083603838943,2.5057053455716964,2.5198450689354650,2.5339282178121061,2.5479554658969419,2.5619274736197712,2.5758448885077030,2.5897083455353314,2.6035184674627856,2.6172758651621644,2.6309811379328347,2.6446348738060665,2.6582376498394278,2.6717900324013684,2.6852925774463796,2.6987458307811201,2.7121503283218553,2.7255065963435627,2.7388151517210284,2.7520765021622462,2.7652911464344183,2.7784595745828424,2.7915822681429576,2.8046597003458054,2.8176923363171600,2.8306806332705565,2.8436250406944552,2.8565260005337434,2.8693839473657987,2.8821993085712987,2.8949725044999752,2.9077039486314913,2.9203940477316164,2.9330432020038666,2.9456518052367682,2.9582202449469013,2.9707489025178671,2.9832381533353218,2.9956883669182117,3.0080999070463381,3.0204731318843807,3.0328083941024948,3.0451060409935957,3.0573664145874506,3.0695898517616689,3.0817766843497081,3.0939272392459838,3.1060418385081734,3.1181207994568245,3.1301644347723325,3.1421730525893770,3.1541469565889146,3.1660864460877765,3.1779918161259744,3.1898633575517659,3.2017013571045592,3.2135060974957224,3.2252778574873595,3.2370169119691168,3.2487235320330807,3.2603979850468185,3.2720405347246331,3.2836514411970628,3.2952309610786950,3.3067793475343441,3.3182968503436268,3.3297837159640000,3.3412401875922928,3.3526665052247804,3.3640629057158478,3.3754296228352692,3.3867668873241632,3.3980749269496382,3.4093539665581858,3.4206042281278410,3.4318259308191568,3.4430192910250144,3.4541845224193128,3.4653218360045557,3.4764314401583816,3.4875135406790445,3.4985683408299044,3.5095960413829150,3.5205968406611747,3.5315709345805386,3.5425185166903255,3.5534397782131490,3.5643349080838878,3.5752040929878195,3.5860475173979420,3.5968653636115091,3.6076578117857787,3.6184250399730260,3.6291672241548145,3.6398845382755516,3.6505771542753562,3.6612452421222388,3.6718889698436268,3.6825085035572425,3.6931040075013488,3.7036756440643908,3.7142235738140279,3.7247479555255900,3.7352489462099649,3.7457267011409243,3.7561813738819145,3.7666131163123149,3.7770220786531787,3.7874084094924765,3.7977722558098375,3.8081137630008257,3.8184330749007289,3.8287303338079086,3.8390056805066859,3.8492592542898052,3.8594911929804603,3.8697016329539116,3.8798907091586932,3.8900585551374203,3.9002053030472110,3.9103310836797300,3.9204360264808535,3.9305202595699811,3.9405839097589839,3.9506271025708157,3.9606499622577731,3.9706526118194372,3.9806351730202776,3.9905977664069532,4.0005405113252914,4.0104635259369710,4.0203669272359051,4.0302508310643343,4.0401153521286357,4.0499606040148572,4.0597866992039737,4.0695937490868817,4.0793818639791315,4.0891511531354086,4.0989017247637554,4.1086336860395596,4.1183471431192977,4.1280422011540443,4.1377189643027537,4.1473775357453135,4.1570180176953846,4.1666405114130187,4.1762451172170660,4.1858319344973811,4.1954010617268223,4.2049525964730492,4.2144866354101316,4.2240032743299665,4.2335026081535059,4.2429847309418030,4.2524497359068780,4.2618977154224087,4.2713287610342521,4.2807429634707885,4.2901404126531073,4.2995211977050269,4.3088854069629594,4.3182331279856099,4.3275644475635344,4.3368794517285361,4.3461782257629258,4.3554608542086237,4.3647274208761342,4.3739780088533706,4.3832127005143482,4.3924315775277405,4.4016347208653102,4.4108222108102018,4.4199941269651148,4.4291505482603517,4.4382915529617399,4.4474172186784404,4.4565276223706309,4.4656228403570832,4.4747029483226184,4.4837680213254565,4.4928181338044544,4.5018533595862396,4.5108737718922329,4.5198794433455758,4.5288704459779492,4.5378468512362948,4.5468087299894417,4.5557561525346326,4.5646891886039569,4.5736079073706923,4.5825123774555525,4.5914026669328498,4.6002788433365644,4.6091409736663298,4.6179891243933362,4.6268233614661423,4.6356437503164161,4.6444503558645831,4.6532432425254058,4.6620224742134759,4.6707881143486434,4.6795402258613485,4.6882788711979062,4.6970041123256934,4.7057160107382838,4.7144146274605010,4.7231000230534042,4.7317722576192098,4.7404313908061431,4.7490774818132246,4.7577105893949918,4.7663307718661585,4.7749380871062082,4.7835325925639296,4.7921143452618908,4.8006834018008533,4.8092398183641256,4.8177836507218625,4.8263149542353050,4.8348337838609661,4.8433401941547629,4.8518342392760880,4.8603159729918408,4.8687854486803861,4.8772427193354861,4.8856878375701607,4.8941208556205105,4.9025418253494824,4.9109507982505942,4.9193478254516076,4.9277329577181543,4.9361062454573164,4.9444677387211629,4.9528174872102397,4.9611555402770167,4.9694819469292906,4.9777967558335448,4.9861000153182697,4.9943917733772398,5.0026720776727487,5.0109409755388050,5.0191985139842945,5.0274447396960920,5.0356796990421406,5.0439034380745005,5.0521160025323457,5.0603174378449394,5.0685077891345562,5.0766871012193908,5.0848554186164074,5.0930127855441762,5.1011592459256576,5.1092948433909688,5.1174196212801046,5.1255336226456354,5.1336368902553646,5.1417294665949616,5.1498113938705607,5.1578827140113281,5.1659434686719967,5.1739936992353819,5.1820334468148532,5.1900627522567877,5.1980816561429890,5.2060901987930812,5.2140884202668767,5.2220763603667093,5.2300540586397455,5.2380215543802757,5.2459788866319625,5.2539260941900805,5.2618632156037171,5.2697902891779611,5.2777073529760532,5.2856144448215199,5.2935116023002839,5.3013988627627455,5.3092762633258470,5.3171438408751071,5.3250016320666385,5.3328496733291386,5.3406880008658622,5.3485166506565651,5.3563356584594395,5.3641450598130094,5.3719448900380229,5.3797351842393120,5.3875159773076389,5.3952873039215135,5.4030491985490032,5.4108016954495142,5.4185448286755555,5.4262786320744798,5.4340031392902191,5.4417183837649814,5.4494243987409510,5.4571212172619470,5.4648088721750891,5.4724873961324239,5.4801568215925478,5.4878171808222040,5.4954685058978701,5.5031108287073227,5.5107441809511908,5.5183685941444836,5.5259840996181149,5.5335907285204051,5.5411885118185626,5.5487774803001582,5.5563576645745787,5.5639290950744709,5.5714918020571629,5.5790458156060776,5.5865911656321270,5.5941278818750941,5.6016559939050037,5.6091755311234701,5.6166865227650415,5.6241889978985258,5.6316829854283004,5.6391685140956138,5.6466456124798690,5.6541143089999011,5.6615746319152329,5.6690266093273243,5.6764702691808075,5.6839056392647098,5.6913327472136617,5.6987516205090980,5.7061622864804429,5.7135647723062855,5.7209591050155399,5.7283453114886003,5.7357234184584778,5.7430934525119328,5.7504554400905903,5.7578094074920454,5.7651553808709615,5.7724933862401562,5.7798234494716754,5.7871455962978535,5.7944598523123734,5.8017662429713077,5.8090647935941506,5.8163555293648450,5.8236384753327926,5.8309136564138599,5.8381810973913755,5.8454408229171086,5.8526928575122490,5.8599372255683750,5.8671739513484056,5.8744030589875518,5.8816245724942560,5.8888385157511198,5.8960449125158272,5.9032437864220597,5.9104351609803931,5.9176190595792022,5.9247955054855437,5.9319645218460346,5.9391261316877264,5.9462803579189636,5.9534272233302437,5.9605667505950608,5.9676989622707453,5.9748238807992964,5.9819415285082060,5.9890519276112721,5.9961551002094131,6.0032510682914628,6.0103398537349708,6.0174214783069857,6.0244959636648332,6.0315633313568950,6.0386236028233684,6.0456767993970288,6.0527229423039790,6.0597620526643983,6.0667941514932764,6.0738192597011498,6.0808373980948227,6.0878485873780903,6.0948528481524500,6.1018502009178057,6.1088406660731689,6.1158242639173537,6.1228010146496645,6.1297709383705747,6.1367340550824068,6.1436903846899966,6.1506399470013626,6.1575827617283609,6.1645188484873374,6.1714482267997770,6.1783709160929403,6.1852869357005043,6.1921963048631872,6.1990990427293760,6.2059951683557459,6.2128847007078729,6.2197676586608406,6.2266440609998481,6.2335139264208044,6.2403772735309220,6.2472341208493054,6.2540844868075345,6.2609283897502443,6.2677658479356921,6.2745968795363334,6.2814215026393780,6.2882397352473545,6.2950515952786636,6.3018571005681228,6.3086562688675167,6.3154491178461347,6.3222356650913065,6.3290159281089347,6.3357899243240201,6.3425576710811846,6.3493191856451903,6.3560744852014537,6.3628235868565506,6.3695665076387300,6.3763032644984063,6.3830338743086630,6.3897583538657425,6.3964767198895354,6.4031889890240681,6.4098951778379796,6.4165953028250016,6.4232893804044320,6.4299774269216021,6.4366594586483457,6.4433354917834542,6.4500055424531446,6.4566696267115065,6.4633277605409543,6.4699799598526768,6.4766262404870778,6.4832666182142189,6.4899011087342542,6.4965297276778644,6.5031524906066842,6.5097694130137329,6.5163805103238337,6.5229857978940320,6.5295852910140173,6.5361790049065309,6.5427669547277763,6.5493491555678274,6.5559256224510314,6.5624963703364081,6.5690614141180470,6.5756207686255008,6.5821744486241780,6.5887224688157291,6.5952648438384323,6.6018015882675725,6.6083327166158234,6.6148582433336252,6.6213781828095506,6.6278925493706806,6.6344013572829716,6.6409046207516171,6.6474023539214127,6.6538945708771102,6.6603812856437790,6.6668625121871576,6.6733382644140038,6.6798085561724427,6.6862734012523122,6.6927328133855095,6.6991868062463240,6.7056353934517832,6.7120785885619805,6.7185164050804147,6.7249488564543149,6.7313759560749711,6.7377977172780570,6.7442141533439557,6.7506252774980799,6.7570311029111858,6.7634316426996941,6.7698269099259996,6.7762169175987843,6.7826016786733270,6.7889812060518047,6.7953555125836029,6.8017246110656133,6.8080885142425380,6.8144472348071803,6.8208007854007455,6.8271491786131335,6.8334924269832289,6.8398305429991879,6.8461635390987281,6.8524914276694124,6.8588142210489336,6.8651319315253891,6.8714445713375660,6.8777521526752139,6.8840546876793232,6.8903521884423924,6.8966446670087027,6.9029321353745869,6.9092146054886934,6.9154920892522540,6.9217645985193439,6.9280321450971476,6.9342947407462141,6.9405523971807126,6.9468051260686963,6.9530529390323466,6.9592958476482316,6.9655338634475550,6.9717669979164008,6.9779952624959867,6.9842186685829031,6.9904372275293598,6.9966509506434269,7.0028598491892744,7.0090639343874077,7.0152632174149119,7.0214577094056772,7.0276474214506397,7.0338323645980108,7.0400125498535004,7.0461879881805594,7.0523586905005953,7.0585246676932005,7.0646859305963776,7.0708424900067577,7.0769943566798315,7.0831415413301517,7.0892840546315661,7.0954219072174283,7.1015551096808078,7.1076836725747103,7.1138076064122853,7.1199269216670427,7.1260416287730504,7.1321517381251507,7.1382572600791647,7.1443582049520984,7.1504545830223432,7.1565464045298768,7.1626336796764676,7.1687164186258734,7.1747946315040405,7.1808683283992902,7.1869375193625338,7.1930022144074446,7.1990624235106679,7.2051181566120039,7.2111694236145993,7.2172162343851358,7.2232585987540237,7.2292965265155757,7.2353300274282066,7.2413591112146065,7.2473837875619278,7.2534040661219699,7.2594199565113531,7.2654314683117036,7.2714386110698239,7.2774413942978811,7.2834398274735701,7.2894339200403007,7.2954236814073603,7.3014091209500922,7.3073902480100656,7.3133670718952413,7.3193396018801522,7.3253078472060569,7.3312718170811166,7.3372315206805574,7.3431869671468331,7.3491381655897943,7.3550851250868448,7.3610278546831065,7.3669663633915814,7.3729006601933040,7.3788307540375104,7.3847566538417890,7.3906783684922335,7.3965959068436078,7.4025092777194939,7.4084184899124459,7.4143235521841468,7.4202244732655540,7.4261212618570553,7.4320139266286116,7.4379024762199162,7.4437869192405337,7.4496672642700474,7.4555435198582121,7.4614156945250922,7.4672837967612082,7.4731478350276781,7.4790078177563668,7.4848637533500160,7.4907156501823948,7.4965635165984370,7.5024073609143738,7.5082471914178814,7.5140830163682111,7.5199148439963270,7.5257426825050437,7.5315665400691589,7.5373864248355869,7.5432023449234951,7.5490143084244306,7.5548223234024547,7.5606263978942767,7.5664265399093722,7.5722227574301293,7.5780150584119603,7.5838034507834386,7.5895879424464248,7.5953685412761889,7.6011452551215353,7.6069180918049319,7.6126870591226279,7.6184521648447827,7.6242134167155822,7.6299708224533642,7.6357243897507363,7.6414741262746997,7.6472200396667596,7.6529621375430601,7.6587004274944803,7.6644349170867709,7.6701656138606591,7.6758925253319674,7.6816156589917330,7.6873350223063106,7.6930506227175002,7.6987624676426520,7.7044705644747751,7.7101749205826593,7.7158755433109807,7.7215724399804095,7.7272656178877224,7.7329550843059138,7.7386408464842997,7.7443229116486307,7.7500012870011918,7.7556759797209178,7.7613469969634927,7.7670143458614547,7.7726780335243060,7.7783380670386126,7.7839944534681127,7.7896471998538086,7.7952963132140827,7.8009418005447912,7.8065836688193642,7.8122219249889095,7.8178565759823169,7.8234876287063457,7.8291150900457325,7.8347389668632879,7.8403592659999948,7.8459759942750971,7.8515891584862114,7.8571987654094091,7.8628048217993225,7.8684073343892269,7.8740063098911524,7.8796017549959601,7.8851936763734454,7.8907820806724320,7.8963669745208556,7.9019483645258628,7.9075262572739025,7.9131006593308122,7.9186715772419092,7.9242390175320843,7.9298029867058872,7.9353634912476121,7.9409205376213947,7.9464741322712946,7.9520242816213766,7.9575709920758140,7.9631142700189539,7.9686541218154208,7.9741905538101925,7.9797235723286857,7.9852531836768392,7.9907793941412066,7.9963022099890271,8.0018216374683178,8.0073376828079521,8.0128503522177414,8.0183596518885203,8.0238655879922192,8.0293681666819570,8.0348673940921138,8.0403632763384110,8.0458558195179908,8.0513450297094984,8.0568309129731563,8.0623134753508463,8.0677927228661819,8.0732686615245886,8.0787412973133854,8.0842106362018527,8.0896766841413132,8.0951394470652041,8.1005989308891593,8.1060551415110726,8.1115080848111845,8.1169577666521473,8.1224041928791042,8.1278473693197562,8.1332873017844420,8.1387239960662061,8.1441574579408691,8.1495876931671063,8.1550147074865098,8.1604385066236667,8.1658590962862281,8.1712764821649717,8.1766906699338868,8.1821016652502276,8.1875094737545897,8.1929141010709792,8.1983155528068838,8.2037138345533300,8.2091089518849589,8.2145009103600959,8.2198897155208073,8.2252753728929804,8.2306578879863732,8.2360372662946943,8.2414135132956652,8.2467866344510767,8.2521566352068643,8.2575235209931677,8.2628872972243954,8.2682479692992903,8.2736055426009880,8.2789600224970847,8.2843114143397010,8.2896597234655367,8.2950049551959424,8.3003471148369758,8.3056862076794626,8.3110222389990636,8.3163552140563244,8.3216851380967487,8.3270120163508512,8.3323358540342145,8.3376566563475567,8.3429744284767882,8.3482891755930666,8.3536009028528611,8.3589096153980016,8.3642153183557522,8.3695180168388532,8.3748177159455857,8.3801144207598313,8.3854081363511241,8.3906988677747094,8.3959866200716018,8.4012713982686353,8.4065532073785256,8.4118320523999248,8.4171079383174714,8.4223808701018488,8.4276508527098422,8.4329178910843883,8.4381819901546340,8.4434431548359843,8.4487013900301644,8.4539567006252625,8.4592090914957918,8.4644585675027386,8.4697051334936138,8.4749487943025130,8.4801895547501580,8.4854274196439530,8.4906623937780381,8.4958944819333375,8.5011236888776143,8.5063500193655130,8.5115734781386205,8.5167940699255116,8.5220117994417919,8.5272266713901601,8.5324386904604523,8.5376478613296847,8.5428541886621154,8.5480576771092771,8.5532583313100421,8.5584561558906618,8.5636511554648109,8.5688433346336463,8.5740326979858441,8.5792192500976530,8.5844029955329404,8.5895839388432353,8.5947620845677797,8.5999374372335780,8.6051100013554311,8.6102797814359953,8.6154467819658187,8.6206110074233919,8.6257724622751972,8.6309311509757372,8.6360870779676002,8.6412402476814947,8.6463906645362876,8.6515383329390652,8.6566832572851595,8.6618254419582055,8.6669648913301742,8.6721016097614250,8.6772356016007421,8.6823668711853834,8.6874954228411152,8.6926212608822642,8.6977443896117528,8.7028648133211455,8.7079825362906860,8.7130975627893434,8.7182098970748516,8.7233195433937549,8.7284265059814423,8.7335307890621898,8.7386323968492086,8.7437313335446749,8.7488276033397803,8.7539212104147630,8.7590121589389529,8.7641004530708138,8.7691860969579754,8.7742690947372797,8.7793494505348200,8.7844271684659709,8.7895022526354403,8.7945747071372988,8.7996445360550215,8.8047117434615263,8.8097763334192134,8.8148383099799990,8.8198976771853577,8.8249544390663583,8.8300085996436994,8.8350601629277499,8.8401091329185846,8.8451555136060236,8.8501993089696622,8.8552405229789173,8.8602791595930537,8.8653152227612289,8.8703487164225248,8.8753796445059834,8.8804080109306458,8.8854338196055824,8.8904570744299338,8.8954777792929480,8.9004959380740019,8.9055115546426560,8.9105246328586709,8.9155351765720567,8.9205431896230962,8.9255486758423856,8.9305516390508668,8.9355520830598643,8.9405500116711121,8.9455454286767928,8.9505383378595749,8.9555287429926373,8.9605166478397038,8.9655020561550849,8.9704849716837032,8.9754653981611252,8.9804433393136023,8.9854187988580918,8.9903917805022999,8.9953622879447082,9.0003303248746036,9.0052958949721198,9.0102590019082562,9.0152196493449228,9.0201778409349576,9.0251335803221746,9.0300868711413784,9.0350377170184064,9.0399861215701556,9.0449320884046127,9.0498756211208899]}

},{}],16:[function(require,module,exports){
module.exports={"x": [-0.7500000000000000,-0.7484984984984985,-0.7469969969969970,-0.7454954954954955,-0.7439939939939940,-0.7424924924924925,-0.7409909909909910,-0.7394894894894894,-0.7379879879879880,-0.7364864864864865,-0.7349849849849850,-0.7334834834834835,-0.7319819819819819,-0.7304804804804805,-0.7289789789789790,-0.7274774774774775,-0.7259759759759760,-0.7244744744744744,-0.7229729729729730,-0.7214714714714715,-0.7199699699699700,-0.7184684684684685,-0.7169669669669669,-0.7154654654654655,-0.7139639639639640,-0.7124624624624625,-0.7109609609609610,-0.7094594594594594,-0.7079579579579580,-0.7064564564564565,-0.7049549549549550,-0.7034534534534534,-0.7019519519519519,-0.7004504504504504,-0.6989489489489490,-0.6974474474474475,-0.6959459459459459,-0.6944444444444444,-0.6929429429429429,-0.6914414414414415,-0.6899399399399400,-0.6884384384384384,-0.6869369369369369,-0.6854354354354354,-0.6839339339339340,-0.6824324324324325,-0.6809309309309309,-0.6794294294294294,-0.6779279279279279,-0.6764264264264265,-0.6749249249249250,-0.6734234234234234,-0.6719219219219219,-0.6704204204204204,-0.6689189189189189,-0.6674174174174174,-0.6659159159159159,-0.6644144144144144,-0.6629129129129129,-0.6614114114114114,-0.6599099099099099,-0.6584084084084084,-0.6569069069069069,-0.6554054054054054,-0.6539039039039038,-0.6524024024024024,-0.6509009009009009,-0.6493993993993994,-0.6478978978978979,-0.6463963963963963,-0.6448948948948949,-0.6433933933933934,-0.6418918918918919,-0.6403903903903904,-0.6388888888888888,-0.6373873873873874,-0.6358858858858859,-0.6343843843843844,-0.6328828828828829,-0.6313813813813813,-0.6298798798798799,-0.6283783783783784,-0.6268768768768769,-0.6253753753753754,-0.6238738738738738,-0.6223723723723724,-0.6208708708708709,-0.6193693693693694,-0.6178678678678678,-0.6163663663663663,-0.6148648648648649,-0.6133633633633634,-0.6118618618618619,-0.6103603603603603,-0.6088588588588588,-0.6073573573573574,-0.6058558558558559,-0.6043543543543544,-0.6028528528528528,-0.6013513513513513,-0.5998498498498499,-0.5983483483483484,-0.5968468468468469,-0.5953453453453453,-0.5938438438438438,-0.5923423423423424,-0.5908408408408409,-0.5893393393393394,-0.5878378378378378,-0.5863363363363363,-0.5848348348348349,-0.5833333333333334,-0.5818318318318318,-0.5803303303303303,-0.5788288288288288,-0.5773273273273274,-0.5758258258258259,-0.5743243243243243,-0.5728228228228228,-0.5713213213213213,-0.5698198198198199,-0.5683183183183184,-0.5668168168168168,-0.5653153153153153,-0.5638138138138138,-0.5623123123123124,-0.5608108108108107,-0.5593093093093093,-0.5578078078078078,-0.5563063063063063,-0.5548048048048049,-0.5533033033033032,-0.5518018018018018,-0.5503003003003003,-0.5487987987987988,-0.5472972972972973,-0.5457957957957957,-0.5442942942942943,-0.5427927927927928,-0.5412912912912913,-0.5397897897897898,-0.5382882882882882,-0.5367867867867868,-0.5352852852852853,-0.5337837837837838,-0.5322822822822822,-0.5307807807807807,-0.5292792792792793,-0.5277777777777778,-0.5262762762762763,-0.5247747747747747,-0.5232732732732732,-0.5217717717717718,-0.5202702702702703,-0.5187687687687688,-0.5172672672672672,-0.5157657657657657,-0.5142642642642643,-0.5127627627627628,-0.5112612612612613,-0.5097597597597597,-0.5082582582582582,-0.5067567567567568,-0.5052552552552553,-0.5037537537537538,-0.5022522522522522,-0.5007507507507507,-0.4992492492492492,-0.4977477477477478,-0.4962462462462462,-0.4947447447447447,-0.4932432432432433,-0.4917417417417417,-0.4902402402402403,-0.4887387387387387,-0.4872372372372372,-0.4857357357357358,-0.4842342342342342,-0.4827327327327328,-0.4812312312312312,-0.4797297297297297,-0.4782282282282282,-0.4767267267267267,-0.4752252252252252,-0.4737237237237237,-0.4722222222222222,-0.4707207207207207,-0.4692192192192192,-0.4677177177177177,-0.4662162162162162,-0.4647147147147147,-0.4632132132132132,-0.4617117117117117,-0.4602102102102102,-0.4587087087087087,-0.4572072072072072,-0.4557057057057057,-0.4542042042042042,-0.4527027027027027,-0.4512012012012012,-0.4496996996996997,-0.4481981981981982,-0.4466966966966967,-0.4451951951951952,-0.4436936936936937,-0.4421921921921922,-0.4406906906906907,-0.4391891891891892,-0.4376876876876877,-0.4361861861861862,-0.4346846846846847,-0.4331831831831832,-0.4316816816816817,-0.4301801801801802,-0.4286786786786787,-0.4271771771771772,-0.4256756756756757,-0.4241741741741742,-0.4226726726726727,-0.4211711711711712,-0.4196696696696697,-0.4181681681681682,-0.4166666666666667,-0.4151651651651652,-0.4136636636636637,-0.4121621621621622,-0.4106606606606606,-0.4091591591591592,-0.4076576576576577,-0.4061561561561561,-0.4046546546546547,-0.4031531531531531,-0.4016516516516517,-0.4001501501501502,-0.3986486486486486,-0.3971471471471472,-0.3956456456456456,-0.3941441441441442,-0.3926426426426426,-0.3911411411411411,-0.3896396396396397,-0.3881381381381381,-0.3866366366366367,-0.3851351351351351,-0.3836336336336336,-0.3821321321321322,-0.3806306306306306,-0.3791291291291291,-0.3776276276276276,-0.3761261261261261,-0.3746246246246246,-0.3731231231231231,-0.3716216216216216,-0.3701201201201201,-0.3686186186186186,-0.3671171171171171,-0.3656156156156156,-0.3641141141141141,-0.3626126126126126,-0.3611111111111111,-0.3596096096096096,-0.3581081081081081,-0.3566066066066066,-0.3551051051051051,-0.3536036036036036,-0.3521021021021021,-0.3506006006006006,-0.3490990990990991,-0.3475975975975976,-0.3460960960960961,-0.3445945945945946,-0.3430930930930931,-0.3415915915915916,-0.3400900900900901,-0.3385885885885886,-0.3370870870870871,-0.3355855855855856,-0.3340840840840841,-0.3325825825825826,-0.3310810810810811,-0.3295795795795796,-0.3280780780780781,-0.3265765765765766,-0.3250750750750751,-0.3235735735735736,-0.3220720720720721,-0.3205705705705706,-0.3190690690690691,-0.3175675675675675,-0.3160660660660661,-0.3145645645645646,-0.3130630630630631,-0.3115615615615616,-0.3100600600600600,-0.3085585585585586,-0.3070570570570570,-0.3055555555555556,-0.3040540540540541,-0.3025525525525525,-0.3010510510510511,-0.2995495495495495,-0.2980480480480481,-0.2965465465465466,-0.2950450450450450,-0.2935435435435436,-0.2920420420420420,-0.2905405405405406,-0.2890390390390390,-0.2875375375375375,-0.2860360360360361,-0.2845345345345345,-0.2830330330330330,-0.2815315315315315,-0.2800300300300300,-0.2785285285285286,-0.2770270270270270,-0.2755255255255255,-0.2740240240240240,-0.2725225225225225,-0.2710210210210210,-0.2695195195195195,-0.2680180180180180,-0.2665165165165165,-0.2650150150150150,-0.2635135135135135,-0.2620120120120120,-0.2605105105105105,-0.2590090090090090,-0.2575075075075075,-0.2560060060060060,-0.2545045045045045,-0.2530030030030030,-0.2515015015015015,-0.2500000000000000,-0.2484984984984985,-0.2469969969969970,-0.2454954954954955,-0.2439939939939940,-0.2424924924924925,-0.2409909909909910,-0.2394894894894894,-0.2379879879879880,-0.2364864864864865,-0.2349849849849850,-0.2334834834834835,-0.2319819819819819,-0.2304804804804805,-0.2289789789789790,-0.2274774774774775,-0.2259759759759760,-0.2244744744744744,-0.2229729729729730,-0.2214714714714715,-0.2199699699699700,-0.2184684684684685,-0.2169669669669669,-0.2154654654654655,-0.2139639639639640,-0.2124624624624625,-0.2109609609609610,-0.2094594594594594,-0.2079579579579580,-0.2064564564564565,-0.2049549549549550,-0.2034534534534534,-0.2019519519519519,-0.2004504504504504,-0.1989489489489490,-0.1974474474474475,-0.1959459459459459,-0.1944444444444444,-0.1929429429429429,-0.1914414414414415,-0.1899399399399400,-0.1884384384384384,-0.1869369369369369,-0.1854354354354354,-0.1839339339339340,-0.1824324324324325,-0.1809309309309309,-0.1794294294294294,-0.1779279279279279,-0.1764264264264265,-0.1749249249249250,-0.1734234234234234,-0.1719219219219219,-0.1704204204204204,-0.1689189189189190,-0.1674174174174174,-0.1659159159159159,-0.1644144144144144,-0.1629129129129129,-0.1614114114114115,-0.1599099099099099,-0.1584084084084084,-0.1569069069069069,-0.1554054054054054,-0.1539039039039040,-0.1524024024024024,-0.1509009009009009,-0.1493993993993994,-0.1478978978978979,-0.1463963963963965,-0.1448948948948949,-0.1433933933933934,-0.1418918918918919,-0.1403903903903904,-0.1388888888888888,-0.1373873873873874,-0.1358858858858859,-0.1343843843843844,-0.1328828828828829,-0.1313813813813813,-0.1298798798798799,-0.1283783783783784,-0.1268768768768769,-0.1253753753753754,-0.1238738738738738,-0.1223723723723724,-0.1208708708708709,-0.1193693693693694,-0.1178678678678678,-0.1163663663663663,-0.1148648648648649,-0.1133633633633634,-0.1118618618618619,-0.1103603603603603,-0.1088588588588588,-0.1073573573573574,-0.1058558558558559,-0.1043543543543544,-0.1028528528528528,-0.1013513513513513,-0.0998498498498499,-0.0983483483483484,-0.0968468468468469,-0.0953453453453453,-0.0938438438438438,-0.0923423423423424,-0.0908408408408409,-0.0893393393393394,-0.0878378378378378,-0.0863363363363363,-0.0848348348348349,-0.0833333333333334,-0.0818318318318318,-0.0803303303303303,-0.0788288288288288,-0.0773273273273274,-0.0758258258258259,-0.0743243243243243,-0.0728228228228228,-0.0713213213213213,-0.0698198198198198,-0.0683183183183184,-0.0668168168168168,-0.0653153153153153,-0.0638138138138138,-0.0623123123123123,-0.0608108108108109,-0.0593093093093093,-0.0578078078078078,-0.0563063063063063,-0.0548048048048048,-0.0533033033033034,-0.0518018018018018,-0.0503003003003003,-0.0487987987987988,-0.0472972972972973,-0.0457957957957958,-0.0442942942942943,-0.0427927927927928,-0.0412912912912913,-0.0397897897897898,-0.0382882882882883,-0.0367867867867868,-0.0352852852852853,-0.0337837837837838,-0.0322822822822822,-0.0307807807807808,-0.0292792792792793,-0.0277777777777778,-0.0262762762762763,-0.0247747747747747,-0.0232732732732733,-0.0217717717717718,-0.0202702702702703,-0.0187687687687688,-0.0172672672672672,-0.0157657657657658,-0.0142642642642643,-0.0127627627627628,-0.0112612612612613,-0.0097597597597597,-0.0082582582582582,-0.0067567567567568,-0.0052552552552553,-0.0037537537537538,-0.0022522522522522,-0.0007507507507507,0.0007507507507507,0.0022522522522522,0.0037537537537538,0.0052552552552553,0.0067567567567568,0.0082582582582582,0.0097597597597597,0.0112612612612613,0.0127627627627628,0.0142642642642643,0.0157657657657657,0.0172672672672672,0.0187687687687688,0.0202702702702703,0.0217717717717718,0.0232732732732732,0.0247747747747747,0.0262762762762763,0.0277777777777778,0.0292792792792793,0.0307807807807807,0.0322822822822822,0.0337837837837838,0.0352852852852853,0.0367867867867868,0.0382882882882882,0.0397897897897898,0.0412912912912913,0.0427927927927928,0.0442942942942943,0.0457957957957957,0.0472972972972973,0.0487987987987988,0.0503003003003003,0.0518018018018018,0.0533033033033034,0.0548048048048048,0.0563063063063063,0.0578078078078078,0.0593093093093093,0.0608108108108109,0.0623123123123123,0.0638138138138138,0.0653153153153153,0.0668168168168168,0.0683183183183184,0.0698198198198198,0.0713213213213213,0.0728228228228228,0.0743243243243243,0.0758258258258259,0.0773273273273273,0.0788288288288288,0.0803303303303303,0.0818318318318318,0.0833333333333334,0.0848348348348348,0.0863363363363363,0.0878378378378378,0.0893393393393394,0.0908408408408409,0.0923423423423423,0.0938438438438438,0.0953453453453453,0.0968468468468469,0.0983483483483484,0.0998498498498498,0.1013513513513513,0.1028528528528528,0.1043543543543544,0.1058558558558559,0.1073573573573573,0.1088588588588588,0.1103603603603603,0.1118618618618619,0.1133633633633634,0.1148648648648649,0.1163663663663663,0.1178678678678678,0.1193693693693694,0.1208708708708709,0.1223723723723724,0.1238738738738738,0.1253753753753754,0.1268768768768769,0.1283783783783784,0.1298798798798799,0.1313813813813813,0.1328828828828829,0.1343843843843844,0.1358858858858859,0.1373873873873874,0.1388888888888888,0.1403903903903904,0.1418918918918919,0.1433933933933934,0.1448948948948949,0.1463963963963963,0.1478978978978979,0.1493993993993994,0.1509009009009009,0.1524024024024024,0.1539039039039038,0.1554054054054054,0.1569069069069069,0.1584084084084084,0.1599099099099099,0.1614114114114114,0.1629129129129129,0.1644144144144144,0.1659159159159159,0.1674174174174174,0.1689189189189189,0.1704204204204204,0.1719219219219219,0.1734234234234234,0.1749249249249250,0.1764264264264264,0.1779279279279279,0.1794294294294294,0.1809309309309309,0.1824324324324325,0.1839339339339340,0.1854354354354354,0.1869369369369369,0.1884384384384384,0.1899399399399400,0.1914414414414415,0.1929429429429429,0.1944444444444444,0.1959459459459459,0.1974474474474475,0.1989489489489490,0.2004504504504504,0.2019519519519519,0.2034534534534534,0.2049549549549550,0.2064564564564565,0.2079579579579579,0.2094594594594594,0.2109609609609610,0.2124624624624625,0.2139639639639640,0.2154654654654654,0.2169669669669669,0.2184684684684685,0.2199699699699700,0.2214714714714715,0.2229729729729729,0.2244744744744744,0.2259759759759760,0.2274774774774775,0.2289789789789790,0.2304804804804804,0.2319819819819819,0.2334834834834835,0.2349849849849850,0.2364864864864865,0.2379879879879879,0.2394894894894894,0.2409909909909910,0.2424924924924925,0.2439939939939940,0.2454954954954955,0.2469969969969970,0.2484984984984985,0.2500000000000000,0.2515015015015014,0.2530030030030030,0.2545045045045045,0.2560060060060061,0.2575075075075075,0.2590090090090089,0.2605105105105106,0.2620120120120120,0.2635135135135136,0.2650150150150150,0.2665165165165164,0.2680180180180181,0.2695195195195195,0.2710210210210211,0.2725225225225225,0.2740240240240239,0.2755255255255256,0.2770270270270270,0.2785285285285286,0.2800300300300300,0.2815315315315314,0.2830330330330331,0.2845345345345345,0.2860360360360361,0.2875375375375375,0.2890390390390389,0.2905405405405406,0.2920420420420420,0.2935435435435436,0.2950450450450450,0.2965465465465464,0.2980480480480481,0.2995495495495495,0.3010510510510511,0.3025525525525525,0.3040540540540539,0.3055555555555556,0.3070570570570570,0.3085585585585586,0.3100600600600600,0.3115615615615615,0.3130630630630631,0.3145645645645645,0.3160660660660661,0.3175675675675675,0.3190690690690690,0.3205705705705706,0.3220720720720720,0.3235735735735736,0.3250750750750750,0.3265765765765765,0.3280780780780781,0.3295795795795795,0.3310810810810811,0.3325825825825826,0.3340840840840840,0.3355855855855856,0.3370870870870870,0.3385885885885886,0.3400900900900901,0.3415915915915917,0.3430930930930931,0.3445945945945945,0.3460960960960962,0.3475975975975976,0.3490990990990992,0.3506006006006006,0.3521021021021020,0.3536036036036037,0.3551051051051051,0.3566066066066067,0.3581081081081081,0.3596096096096095,0.3611111111111112,0.3626126126126126,0.3641141141141142,0.3656156156156156,0.3671171171171170,0.3686186186186187,0.3701201201201201,0.3716216216216217,0.3731231231231231,0.3746246246246245,0.3761261261261262,0.3776276276276276,0.3791291291291292,0.3806306306306306,0.3821321321321320,0.3836336336336337,0.3851351351351351,0.3866366366366367,0.3881381381381381,0.3896396396396395,0.3911411411411412,0.3926426426426426,0.3941441441441442,0.3956456456456456,0.3971471471471471,0.3986486486486487,0.4001501501501501,0.4016516516516517,0.4031531531531531,0.4046546546546546,0.4061561561561562,0.4076576576576576,0.4091591591591592,0.4106606606606606,0.4121621621621621,0.4136636636636637,0.4151651651651651,0.4166666666666667,0.4181681681681682,0.4196696696696696,0.4211711711711712,0.4226726726726726,0.4241741741741742,0.4256756756756757,0.4271771771771771,0.4286786786786787,0.4301801801801801,0.4316816816816818,0.4331831831831832,0.4346846846846846,0.4361861861861862,0.4376876876876876,0.4391891891891893,0.4406906906906907,0.4421921921921921,0.4436936936936937,0.4451951951951951,0.4466966966966968,0.4481981981981982,0.4496996996996996,0.4512012012012012,0.4527027027027026,0.4542042042042043,0.4557057057057057,0.4572072072072071,0.4587087087087087,0.4602102102102101,0.4617117117117118,0.4632132132132132,0.4647147147147146,0.4662162162162162,0.4677177177177176,0.4692192192192193,0.4707207207207207,0.4722222222222223,0.4737237237237237,0.4752252252252251,0.4767267267267268,0.4782282282282282,0.4797297297297298,0.4812312312312312,0.4827327327327327,0.4842342342342343,0.4857357357357357,0.4872372372372373,0.4887387387387387,0.4902402402402402,0.4917417417417418,0.4932432432432432,0.4947447447447448,0.4962462462462462,0.4977477477477477,0.4992492492492493,0.5007507507507507,0.5022522522522523,0.5037537537537538,0.5052552552552552,0.5067567567567568,0.5082582582582582,0.5097597597597598,0.5112612612612613,0.5127627627627627,0.5142642642642643,0.5157657657657657,0.5172672672672673,0.5187687687687688,0.5202702702702702,0.5217717717717718,0.5232732732732732,0.5247747747747749,0.5262762762762763,0.5277777777777777,0.5292792792792793,0.5307807807807807,0.5322822822822824,0.5337837837837838,0.5352852852852852,0.5367867867867868,0.5382882882882882,0.5397897897897899,0.5412912912912913,0.5427927927927927,0.5442942942942943,0.5457957957957957,0.5472972972972974,0.5487987987987988,0.5503003003003002,0.5518018018018018,0.5533033033033032,0.5548048048048049,0.5563063063063063,0.5578078078078077,0.5593093093093093,0.5608108108108107,0.5623123123123124,0.5638138138138138,0.5653153153153152,0.5668168168168168,0.5683183183183182,0.5698198198198199,0.5713213213213213,0.5728228228228227,0.5743243243243243,0.5758258258258258,0.5773273273273274,0.5788288288288288,0.5803303303303302,0.5818318318318318,0.5833333333333333,0.5848348348348349,0.5863363363363363,0.5878378378378377,0.5893393393393394,0.5908408408408408,0.5923423423423424,0.5938438438438438,0.5953453453453452,0.5968468468468469,0.5983483483483483,0.5998498498498499,0.6013513513513513,0.6028528528528529,0.6043543543543544,0.6058558558558558,0.6073573573573574,0.6088588588588588,0.6103603603603605,0.6118618618618619,0.6133633633633633,0.6148648648648649,0.6163663663663663,0.6178678678678680,0.6193693693693694,0.6208708708708708,0.6223723723723724,0.6238738738738738,0.6253753753753755,0.6268768768768769,0.6283783783783783,0.6298798798798799,0.6313813813813813,0.6328828828828830,0.6343843843843844,0.6358858858858858,0.6373873873873874,0.6388888888888888,0.6403903903903905,0.6418918918918919,0.6433933933933933,0.6448948948948949,0.6463963963963963,0.6478978978978980,0.6493993993993994,0.6509009009009008,0.6524024024024024,0.6539039039039038,0.6554054054054055,0.6569069069069069,0.6584084084084083,0.6599099099099099,0.6614114114114114,0.6629129129129130,0.6644144144144144,0.6659159159159158,0.6674174174174174,0.6689189189189189,0.6704204204204205,0.6719219219219219,0.6734234234234233,0.6749249249249250,0.6764264264264264,0.6779279279279280,0.6794294294294294,0.6809309309309308,0.6824324324324325,0.6839339339339339,0.6854354354354355,0.6869369369369369,0.6884384384384383,0.6899399399399400,0.6914414414414414,0.6929429429429430,0.6944444444444444,0.6959459459459458,0.6974474474474475,0.6989489489489489,0.7004504504504505,0.7019519519519519,0.7034534534534533,0.7049549549549550,0.7064564564564564,0.7079579579579580,0.7094594594594594,0.7109609609609608,0.7124624624624625,0.7139639639639639,0.7154654654654655,0.7169669669669669,0.7184684684684683,0.7199699699699700,0.7214714714714714,0.7229729729729730,0.7244744744744744,0.7259759759759761,0.7274774774774775,0.7289789789789789,0.7304804804804805,0.7319819819819819,0.7334834834834836,0.7349849849849850,0.7364864864864864,0.7379879879879880,0.7394894894894894,0.7409909909909911,0.7424924924924925,0.7439939939939939,0.7454954954954955,0.7469969969969970,0.7484984984984986,0.7500000000000000],  "expected": [-0.5000000000000000,-0.4985007462602746,-0.4970059612649440,-0.4955156052913980,-0.4940296392020517,-0.4925480244323533,-0.4910707229791068,-0.4895976973890983,-0.4881289107480166,-0.4866643266696601,-0.4852039092854191,-0.4837476232340266,-0.4822954336515680,-0.4808473061617425,-0.4794032068663686,-0.4779631023361256,-0.4765269596015244,-0.4750947461441012,-0.4736664298878258,-0.4722419791907200,-0.4708213628366787,-0.4694045500274889,-0.4679915103750382,-0.4665822138937112,-0.4651766309929641,-0.4637747324700770,-0.4623764895030733,-0.4609818736438073,-0.4595908568112101,-0.4582034112846931,-0.4568195096977019,-0.4554391250314189,-0.4540622306086086,-0.4526888000876013,-0.4513188074564146,-0.4499522270270040,-0.4485890334296442,-0.4472292016074333,-0.4458727068109196,-0.4445195245928454,-0.4431696308030065,-0.4418230015832240,-0.4404796133624235,-0.4391394428518220,-0.4378024670402172,-0.4364686631893772,-0.4351380088295291,-0.4338104817549422,-0.4324860600196043,-0.4311647219329892,-0.4298464460559111,-0.4285312111964674,-0.4272189964060626,-0.4259097809755163,-0.4246035444312494,-0.4233002665315490,-0.4219999272629076,-0.4207025068364393,-0.4194079856843645,-0.4181163444565669,-0.4168275640172196,-0.4155416254414763,-0.4142585100122297,-0.4129781992169331,-0.4117006747444834,-0.4104259184821660,-0.4091539125126586,-0.4078846391110930,-0.4066180807421732,-0.4053542200573491,-0.4040930398920440,-0.4028345232629346,-0.4015786533652830,-0.4003254135703184,-0.3990747874226684,-0.3978267586378380,-0.3965813110997356,-0.3953384288582450,-0.3940980961268424,-0.3928602972802563,-0.3916250168521719,-0.3903922395329751,-0.3891619501675398,-0.3879341337530538,-0.3867087754368841,-0.3854858605144812,-0.3842653744273195,-0.3830473027608756,-0.3818316312426426,-0.3806183457401780,-0.3794074322591874,-0.3781988769416409,-0.3769926660639233,-0.3757887860350155,-0.3745872233947077,-0.3733879648118442,-0.3721909970825967,-0.3709963071287692,-0.3698038819961303,-0.3686137088527748,-0.3674257749875117,-0.3662400678082815,-0.3650565748405979,-0.3638752837260175,-0.3626961822206333,-0.3615192581935947,-0.3603444996256507,-0.3591718946077188,-0.3580014313394755,-0.3568330981279714,-0.3556668833862681,-0.3545027756320972,-0.3533407634865422,-0.3521808356727398,-0.3510229810146039,-0.3498671884355685,-0.3487134469573518,-0.3475617456987400,-0.3464120738743890,-0.3452644207936469,-0.3441187758593938,-0.3429751285668999,-0.3418334685027025,-0.3406937853434986,-0.3395560688550570,-0.3384203088911453,-0.3372864953924741,-0.3361546183856585,-0.3350246679821933,-0.3338966343774461,-0.3327705078496641,-0.3316462787589967,-0.3305239375465332,-0.3294034747333537,-0.3282848809195961,-0.3271681467835350,-0.3260532630806762,-0.3249402206428636,-0.3238290103773993,-0.3227196232661774,-0.3216120503648298,-0.3205062828018851,-0.3194023117779394,-0.3183001285648392,-0.3171997245048768,-0.3161010910099961,-0.3150042195610112,-0.3139091017068360,-0.3128157290637232,-0.3117240933145170,-0.3106341862079138,-0.3095459995577353,-0.3084595252422110,-0.3073747552032703,-0.3062916814458463,-0.3052102960371874,-0.3041305911061801,-0.3030525588426802,-0.3019761914968536,-0.3009014813785265,-0.2998284208565444,-0.2987570023581400,-0.2976872183683090,-0.2966190614291963,-0.2955525241394883,-0.2944875991538152,-0.2934242791821606,-0.2923625569892794,-0.2913024253941233,-0.2902438772692738,-0.2891869055403838,-0.2881315031856257,-0.2870776632351472,-0.2860253787705338,-0.2849746429242798,-0.2839254488792645,-0.2828777898682371,-0.2818316591733065,-0.2807870501254394,-0.2797439561039639,-0.2787023705360802,-0.2776622868963772,-0.2766236987063557,-0.2755865995339575,-0.2745509829931009,-0.2735168427432211,-0.2724841724888185,-0.2714529659790105,-0.2704232170070909,-0.2693949194100935,-0.2683680670683617,-0.2673426539051241,-0.2663186738860746,-0.2652961210189579,-0.2642749893531611,-0.2632552729793088,-0.2622369660288649,-0.2612200626737379,-0.2602045571258922,-0.2591904436369636,-0.2581777164978796,-0.2571663700384845,-0.2561563986271689,-0.2551477966705040,-0.2541405586128803,-0.2531346789361499,-0.2521301521592749,-0.2511269728379778,-0.2501251355643981,-0.2491246349667517,-0.2481254657089952,-0.2471276224904935,-0.2461311000456921,-0.2451358931437925,-0.2441419965884324,-0.2431494052173687,-0.2421581139021647,-0.2411681175478815,-0.2401794110927716,-0.2391919895079779,-0.2382058477972344,-0.2372209809965721,-0.2362373841740267,-0.2352550524293509,-0.2342739808937297,-0.2332941647294982,-0.2323155991298642,-0.2313382793186324,-0.2303622005499325,-0.2293873581079507,-0.2284137473066635,-0.2274413634895751,-0.2264702020294575,-0.2255002583280935,-0.2245315278160231,-0.2235640059522918,-0.2225976882242025,-0.2216325701470700,-0.2206686472639784,-0.2197059151455402,-0.2187443693896598,-0.2177840056212978,-0.2168248194922394,-0.2158668066808644,-0.2149099628919200,-0.2139542838562964,-0.2129997653308041,-0.2120464030979547,-0.2110941929657430,-0.2101431307674321,-0.2091932123613409,-0.2082444336306332,-0.2072967904831100,-0.2063502788510035,-0.2054048946907731,-0.2044606339829041,-0.2035174927317083,-0.2025754669651266,-0.2016345527345341,-0.2006947461145467,-0.1997560432028303,-0.1988184401199115,-0.1978819330089906,-0.1969465180357569,-0.1960121913882049,-0.1950789492764536,-0.1941467879325668,-0.1932157036103758,-0.1922856925853038,-0.1913567511541917,-0.1904288756351265,-0.1895020623672711,-0.1885763077106952,-0.1876516080462091,-0.1867279597751983,-0.1858053593194604,-0.1848838031210431,-0.1839632876420841,-0.1830438093646530,-0.1821253647905940,-0.1812079504413709,-0.1802915628579135,-0.1793761986004650,-0.1784618542484318,-0.1775485264002341,-0.1766362116731584,-0.1757249067032115,-0.1748146081449752,-0.1739053126714635,-0.1729970169739810,-0.1720897177619815,-0.1711834117629299,-0.1702780957221640,-0.1693737664027581,-0.1684704205853881,-0.1675680550681978,-0.1666666666666667,-0.1657662522134783,-0.1648668085583908,-0.1639683325681084,-0.1630708211261538,-0.1621742711327421,-0.1612786795046561,-0.1603840431751223,-0.1594903590936887,-0.1585976242261031,-0.1577058355541934,-0.1568149900757480,-0.1559250848043982,-0.1550361167695012,-0.1541480830160249,-0.1532609806044326,-0.1523748066105701,-0.1514895581255526,-0.1506052322556540,-0.1497218261221961,-0.1488393368614392,-0.1479577616244744,-0.1470770975771154,-0.1461973418997930,-0.1453184917874492,-0.1444405444494334,-0.1435634971093984,-0.1426873470051985,-0.1418120913887877,-0.1409377275261193,-0.1400642526970463,-0.1391916641952223,-0.1383199593280041,-0.1374491354163547,-0.1365791897947470,-0.1357101198110688,-0.1348419228265285,-0.1339745962155613,-0.1331081373657372,-0.1322425436776685,-0.1313778125649193,-0.1305139414539150,-0.1296509277838532,-0.1287887690066151,-0.1279274625866776,-0.1270670060010265,-0.1262073967390697,-0.1253486323025528,-0.1244907102054733,-0.1236336279739974,-0.1227773831463763,-0.1219219732728640,-0.1210673959156353,-0.1202136486487052,-0.1193607290578477,-0.1185086347405172,-0.1176573633057686,-0.1168069123741796,-0.1159572795777732,-0.1151084625599400,-0.1142604589753631,-0.1134132664899412,-0.1125668827807148,-0.1117213055357913,-0.1108765324542712,-0.1100325612461757,-0.1091893896323734,-0.1083470153445091,-0.1075054361249327,-0.1066646497266281,-0.1058246539131435,-0.1049854464585221,-0.1041470251472329,-0.1033093877741030,-0.1024725321442493,-0.1016364560730121,-0.1008011573858880,-0.0999666339184641,-0.0991328835163526,-0.0982999040351260,-0.0974676933402524,-0.0966362493070324,-0.0958055698205349,-0.0949756527755350,-0.0941464960764513,-0.0933180976372849,-0.0924904553815571,-0.0916635672422497,-0.0908374311617440,-0.0900120450917616,-0.0891874069933049,-0.0883635148365984,-0.0875403666010301,-0.0867179602750944,-0.0858962938563340,-0.0850753653512836,-0.0842551727754131,-0.0834357141530715,-0.0826169875174320,-0.0817989909104363,-0.0809817223827403,-0.0801651799936599,-0.0793493618111170,-0.0785342659115863,-0.0777198903800426,-0.0769062333099079,-0.0760932928029998,-0.0752810669694791,-0.0744695539277994,-0.0736587518046559,-0.0728486587349347,-0.0720392728616630,-0.0712305923359595,-0.0704226153169850,-0.0696153399718933,-0.0688087644757833,-0.0680028870116503,-0.0671977057703385,-0.0663932189504933,-0.0655894247585149,-0.0647863214085111,-0.0639839071222514,-0.0631821801291205,-0.0623811386660734,-0.0615807809775896,-0.0607811053156287,-0.0599821099395854,-0.0591837931162457,-0.0583861531197427,-0.0575891882315133,-0.0567928967402548,-0.0559972769418823,-0.0552023271394861,-0.0544080456432891,-0.0536144307706052,-0.0528214808457979,-0.0520291942002387,-0.0512375691722663,-0.0504466041071457,-0.0496562973570282,-0.0488666472809112,-0.0480776522445982,-0.0472893106206598,-0.0465016207883943,-0.0457145811337885,-0.0449281900494800,-0.0441424459347179,-0.0433573471953254,-0.0425728922436619,-0.0417890794985855,-0.0410059073854158,-0.0402233743358973,-0.0394414787881622,-0.0386602191866946,-0.0378795939822939,-0.0370996016320394,-0.0363202405992545,-0.0355415093534713,-0.0347634063703958,-0.0339859301318727,-0.0332090791258512,-0.0324328518463506,-0.0316572467934261,-0.0308822624731352,-0.0301078973975040,-0.0293341500844937,-0.0285610190579679,-0.0277885028476596,-0.0270165999891382,-0.0262453090237777,-0.0254746284987242,-0.0247045569668639,-0.0239350929867918,-0.0231662351227799,-0.0223979819447457,-0.0216303320282220,-0.0208632839543250,-0.0200968363097248,-0.0193309876866142,-0.0185657366826787,-0.0178010819010669,-0.0170370219503604,-0.0162735554445445,-0.0155106810029785,-0.0147483972503670,-0.0139867028167307,-0.0132255963373778,-0.0124650764528754,-0.0117051418090213,-0.0109457910568156,-0.0101870228524331,-0.0094288358571953,-0.0086712287375430,-0.0079142001650088,-0.0071577488161900,-0.0064018733727216,-0.0056465725212495,-0.0048918449534039,-0.0041376893657729,-0.0033841044598761,-0.0026310889421384,-0.0018786415238645,-0.0011267609212129,-0.0003754458551704,0.0003753049484732,0.0011254927591507,0.0018751188415419,0.0026241844555991,0.0033726908565714,0.0041206392950292,0.0048680310168892,0.0056148672634376,0.0063611492713552,0.0071068782727404,0.0078520554951335,0.0085966821615403,0.0093407594904551,0.0100842886958842,0.0108272709873689,0.0115697075700089,0.0123115996444843,0.0130529484070792,0.0137937550497033,0.0145340207599148,0.0152737467209426,0.0160129341117082,0.0167515841068475,0.0174896978767329,0.0182272765874949,0.0189643214010431,0.0197008334750883,0.0204368139631632,0.0211722640146435,0.0219071847747692,0.0226415773846650,0.0233754429813612,0.0241087826978142,0.0248415976629268,0.0255738890015686,0.0263056578345962,0.0270369052788730,0.0277676324472893,0.0284978404487818,0.0292275303883536,0.0299567033670934,0.0306853604821950,0.0314135028269767,0.0321411314909000,0.0328682475595892,0.0335948521148499,0.0343209462346877,0.0350465309933275,0.0357716074612312,0.0364961767051166,0.0372202397879757,0.0379437977690927,0.0386668517040624,0.0393894026448078,0.0401114516395980,0.0408329997330664,0.0415540479662276,0.0422745973764957,0.0429946489977012,0.0437142038601081,0.0444332629904320,0.0451518274118561,0.0458698981440492,0.0465874762031817,0.0473045626019429,0.0480211583495575,0.0487372644518024,0.0494528819110229,0.0501680117261489,0.0508826548927118,0.0515968124028600,0.0523104852453753,0.0530236744056891,0.0537363808658978,0.0544486056047786,0.0551603495978056,0.0558716138171652,0.0565823992317714,0.0572927068072814,0.0580025375061108,0.0587118922874489,0.0594207721072739,0.0601291779183676,0.0608371106703306,0.0615445713095974,0.0622515607794504,0.0629580800200354,0.0636641299683756,0.0643697115583865,0.0650748257208901,0.0657794733836292,0.0664836554712817,0.0671873729054748,0.0678906266047991,0.0685934174848224,0.0692957464581038,0.0699976144342075,0.0706990223197163,0.0713999710182458,0.0721004614304573,0.0728004944540718,0.0735000709838833,0.0741991919117719,0.0748978581267177,0.0755960705148132,0.0762938299592767,0.0769911373404657,0.0776879935358895,0.0783843994202220,0.0790803558653148,0.0797758637402097,0.0804709239111516,0.0811655372416006,0.0818597045922454,0.0825534268210146,0.0832467047830902,0.0839395393309190,0.0846319313142253,0.0853238815800230,0.0860153909726277,0.0867064603336685,0.0873970905021001,0.0880872823142149,0.0887770366036544,0.0894663542014214,0.0901552359358911,0.0908436826328234,0.0915316951153739,0.0922192742041054,0.0929064207170001,0.0935931354694697,0.0942794192743677,0.0949652729420002,0.0956506972801370,0.0963356930940231,0.0970202611863891,0.0977044023574630,0.0983881174049802,0.0990714071241950,0.0997542723078912,0.1004367137463930,0.1011187322275752,0.1018003285368742,0.1024815034572986,0.1031622577694393,0.1038425922514806,0.1045225076792098,0.1052020048260279,0.1058810844629602,0.1065597473586659,0.1072379942794485,0.1079158259892660,0.1085932432497408,0.1092702468201698,0.1099468374575343,0.1106230159165096,0.1112987829494753,0.1119741393065248,0.1126490857354748,0.1133236229818756,0.1139977517890200,0.1146714728979532,0.1153447870474825,0.1160176949741861,0.1166901974124233,0.1173622950943434,0.1180339887498948,0.1187052791068349,0.1193761668907388,0.1200466528250082,0.1207167376308815,0.1213864220274417,0.1220557067316261,0.1227245924582353,0.1233930799199415,0.1240611698272980,0.1247288628887475,0.1253961598106315,0.1260630612971984,0.1267295680506123,0.1273956807709621,0.1280614001562692,0.1287267269024970,0.1293916617035587,0.1300562052513260,0.1307203582356376,0.1313841213443072,0.1320474952631323,0.1327104806759020,0.1333730782644056,0.1340352887084406,0.1346971126858205,0.1353585508723837,0.1360196039420009,0.1366802725665832,0.1373405574160906,0.1380004591585387,0.1386599784600083,0.1393191159846516,0.1399778723947011,0.1406362483504770,0.1412942445103947,0.1419518615309728,0.1426091000668407,0.1432659607707460,0.1439224442935625,0.1445785512842970,0.1452342823900974,0.1458896382562603,0.1465446195262374,0.1471992268416442,0.1478534608422660,0.1485073221660665,0.1491608114491942,0.1498139293259897,0.1504666764289932,0.1511190533889512,0.1517710608348243,0.1524226993937937,0.1530739696912681,0.1537248723508916,0.1543754079945495,0.1550255772423760,0.1556753807127612,0.1563248190223571,0.1569738927860856,0.1576226026171440,0.1582709491270131,0.1589189329254627,0.1595665546205593,0.1602138148186722,0.1608607141244799,0.1615072531409777,0.1621534324694827,0.1627992527096420,0.1634447144594382,0.1640898183151956,0.1647345648715877,0.1653789547216425,0.1660229884567497,0.1666666666666667,0.1673099899395244,0.1679529588618346,0.1685955740184949,0.1692378359927962,0.1698797453664281,0.1705213027194849,0.1711625086304726,0.1718033636763137,0.1724438684323547,0.1730840234723710,0.1737238293685732,0.1743632866916137,0.1750023960105914,0.1756411578930588,0.1762795729050274,0.1769176416109732,0.1775553645738432,0.1781927423550606,0.1788297755145310,0.1794664646106481,0.1801028102002989,0.1807388128388701,0.1813744730802531,0.1820097914768503,0.1826447685795801,0.1832794049378828,0.1839137010997262,0.1845476576116105,0.1851812750185748,0.1858145538642019,0.1864474946906237,0.1870800980385272,0.1877123644471588,0.1883442944543312,0.1889758885964272,0.1896071474084061,0.1902380714238084,0.1908686611747612,0.1914989171919837,0.1921288400047921,0.1927584301411047,0.1933876881274476,0.1940166144889591,0.1946452097493954,0.1952734744311356,0.1959014090551863,0.1965290141411874,0.1971562902074161,0.1977832377707932,0.1984098573468870,0.1990361494499187,0.1996621145927670,0.2002877532869735,0.2009130660427473,0.2015380533689700,0.2021627157731998,0.2027870537616776,0.2034110678393307,0.2040347585097781,0.2046581262753351,0.2052811716370179,0.2059038950945487,0.2065262971463596,0.2071483782895983,0.2077701390201319,0.2083915798325517,0.2090127012201781,0.2096335036750649,0.2102539876880037,0.2108741537485290,0.2114940023449219,0.2121135339642155,0.2127327490921982,0.2133516482134197,0.2139702318111939,0.2145885003676040,0.2152064543635072,0.2158240942785384,0.2164414205911150,0.2170584337784407,0.2176751343165108,0.2182915226801155,0.2189075993428442,0.2195233647770908,0.2201388194540565,0.2207539638437551,0.2213687984150167,0.2219833236354918,0.2225975399716559,0.2232114478888130,0.2238250478511002,0.2244383403214917,0.2250513257618028,0.2256640046326939,0.2262763773936745,0.2268884445031077,0.2275002064182135,0.2281116635950732,0.2287228164886334,0.2293336655527096,0.2299442112399906,0.2305544540020422,0.2311643942893109,0.2317740325511280,0.2323833692357134,0.2329924047901796,0.2336011396605354,0.2342095742916894,0.2348177091274545,0.2354255446105509,0.2360330811826105,0.2366403192841803,0.2372472593547260,0.2378539018326364,0.2384602471552261,0.2390662957587399,0.2396720480783564,0.2402775045481911,0.2408826656013008,0.2414875316696867,0.2420921031842980,0.2426963805750358,0.2433003642707565,0.2439040546992752,0.2445074522873693,0.2451105574607824,0.2457133706442272,0.2463158922613894,0.2469181227349312,0.2475200624864942,0.2481217119367036,0.2487230715051714,0.2493241416104992,0.2499249226702828,0.2505254151011141,0.2511256193185859,0.2517255357372944,0.2523251647708427,0.2529245068318441,0.2535235623319257,0.2541223316817314,0.2547208152909253,0.2553190135681949,0.2559169269212544,0.2565145557568479,0.2571119004807528,0.2577089614977830,0.2583057392117916,0.2589022340256748,0.2594984463413745,0.2600943765598820,0.2606900250812407,0.2612853923045493,0.2618804786279652,0.2624752844487070,0.2630698101630587,0.2636640561663716,0.2642580228530679,0.2648517106166438,0.2654451198496722,0.2660382509438066,0.2666311042897826,0.2672236802774228,0.2678159792956379,0.2684080017324311,0.2689997479749003,0.2695912184092413,0.2701824134207509,0.2707733333938295,0.2713639787119841,0.2719543497578315,0.2725444469131007,0.2731342705586363,0.2737238210744009,0.2743130988394782,0.2749021042320761,0.2754908376295288,0.2760792994083002,0.2766674899439869,0.2772554096113202,0.2778430587841697,0.2784304378355454,0.2790175471376011,0.2796043870616369,0.2801909579781013,0.2807772602565953,0.2813632942658736,0.2819490603738486,0.2825345589475923,0.2831197903533389,0.2837047549564884,0.2842894531216081,0.2848738852124363,0.2854580515918839,0.2860419526220379,0.2866255886641635,0.2872089600787072,0.2877920672252987,0.2883749104627543,0.2889574901490783,0.2895398066414673,0.2901218602963110,0.2907036514691960,0.2912851805149075,0.2918664477874324,0.2924474536399615,0.2930281984248920,0.2936086824938303,0.2941889061975941,0.2947688698862150,0.2953485739089413,0.2959280186142398,0.2965072043497988,0.2970861314625303,0.2976648002985725,0.2982432112032920,0.2988213645212867,0.2993992605963874,0.2999768997716613,0.3005542823894131,0.3011314087911885,0.3017082793177757,0.3022848943092083,0.3028612541047674,0.3034373590429840,0.3040132094616413,0.3045888056977769,0.3051641480876853,0.3057392369669202,0.3063140726702964,0.3068886555318927,0.3074629858850534,0.3080370640623915,0.3086108903957900,0.3091844652164048,0.3097577888546666,0.3103308616402832,0.3109036839022417,0.3114762559688108,0.3120485781675431,0.3126206508252767,0.3131924742681381,0.3137640488215439,0.3143353748102032,0.3149064525581198,0.3154772823885940,0.3160478646242249,0.3166181995869127,0.3171882875978608,0.3177581289775778,0.3183277240458793,0.3188970731218905,0.3194661765240483,0.3200350345701028,0.3206036475771199,0.3211720158614833,0.3217401397388963,0.3223080195243839,0.3228756555322952]}

},{}],17:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var sqrt1pm1 = require( './../lib' );


// FIXTURES //

var large = require( './fixtures/cpp/large.json' );
var small = require( './fixtures/cpp/small.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof sqrt1pm1, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = sqrt1pm1( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	var v = sqrt1pm1( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `0` if provided `0`', function test( t ) {
	var v = sqrt1pm1( 0.0 );
	t.equal( v, 0.0, 'returns zero' );
	t.end();
});

tape( 'the function returns `-1` if provided `-1`', function test( t ) {
	var v = sqrt1pm1( -1.0 );
	t.equal( v, -1.0, 'returns negative one' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `x < -1`', function test( t ) {
	var v = sqrt1pm1( -1.5 );
	t.equal( isnan( v ), true, 'returns NaN' );
	sqrt1pm1( -2.0 );
	t.equal( isnan( v ), true, 'returns NaN' );
	sqrt1pm1( -3.0 );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function handles large `x` values (|x| > 0.75)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = large.x;
	expected = large.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = sqrt1pm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. E: ' + expected[ i ] + '. Δ: ' + delta + '. tol: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function handles small `x` values (|x| <= 0.75)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = small.x;
	expected = small.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = sqrt1pm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 390.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. E: ' + expected[ i ] + '. Δ: ' + delta + '. tol: ' + tol + '.' );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/sqrt1pm1/test/test.js")
},{"./../lib":13,"./fixtures/cpp/large.json":15,"./fixtures/cpp/small.json":16,"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/abs":7,"@stdlib/math/constants/float64-eps":27,"@stdlib/math/constants/float64-pinf":31,"tape":88}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./evalpoly.js":18}],20:[function(require,module,exports){
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

},{"./evalpoly.js":18,"./factory.js":19,"@stdlib/utils/define-read-only-property":33}],21:[function(require,module,exports){
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

},{"./high.js":22}],22:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],23:[function(require,module,exports){
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

},{"./get_high_word.js":21}],24:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":22}],25:[function(require,module,exports){
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

},{"./set_high_word.js":26}],26:[function(require,module,exports){
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

},{"./high.js":24}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"./define_read_only_property.js":32}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){

},{}],36:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"base64-js":34,"ieee754":57}],39:[function(require,module,exports){
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
},{"../../is-buffer/index.js":59}],40:[function(require,module,exports){
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

},{"./lib/is_arguments.js":41,"./lib/keys.js":42}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],43:[function(require,module,exports){
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

},{"foreach":53,"object-keys":62}],44:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],45:[function(require,module,exports){
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

},{"./helpers/isFinite":46,"./helpers/isNaN":47,"./helpers/mod":48,"./helpers/sign":49,"es-to-primitive/es5":50,"has":56,"is-callable":60}],46:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],47:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],48:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],49:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],50:[function(require,module,exports){
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

},{"./helpers/isPrimitive":51,"is-callable":60}],51:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){

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


},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":54}],56:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":55}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"./isArguments":63}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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
},{"_process":37}],65:[function(require,module,exports){
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
},{"_process":37}],66:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":67}],67:[function(require,module,exports){
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
},{"./_stream_readable":69,"./_stream_writable":71,"core-util-is":39,"inherits":58,"process-nextick-args":65}],68:[function(require,module,exports){
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
},{"./_stream_transform":70,"core-util-is":39,"inherits":58}],69:[function(require,module,exports){
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
},{"./_stream_duplex":67,"./internal/streams/BufferList":72,"./internal/streams/destroy":73,"./internal/streams/stream":74,"_process":37,"core-util-is":39,"events":52,"inherits":58,"isarray":75,"process-nextick-args":65,"safe-buffer":82,"string_decoder/":76,"util":35}],70:[function(require,module,exports){
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
},{"./_stream_duplex":67,"core-util-is":39,"inherits":58}],71:[function(require,module,exports){
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
},{"./_stream_duplex":67,"./internal/streams/destroy":73,"./internal/streams/stream":74,"_process":37,"core-util-is":39,"inherits":58,"process-nextick-args":65,"safe-buffer":82,"util-deprecate":94}],72:[function(require,module,exports){
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
},{"safe-buffer":82}],73:[function(require,module,exports){
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
},{"process-nextick-args":65}],74:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":52}],75:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],76:[function(require,module,exports){
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
},{"safe-buffer":82}],77:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":78}],78:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":67,"./lib/_stream_passthrough.js":68,"./lib/_stream_readable.js":69,"./lib/_stream_transform.js":70,"./lib/_stream_writable.js":71}],79:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":78}],80:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":71}],81:[function(require,module,exports){
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
},{"_process":37,"through":93}],82:[function(require,module,exports){
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

},{"buffer":38}],83:[function(require,module,exports){
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

},{"events":52,"inherits":58,"readable-stream/duplex.js":66,"readable-stream/passthrough.js":77,"readable-stream/readable.js":78,"readable-stream/transform.js":79,"readable-stream/writable.js":80}],84:[function(require,module,exports){
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

},{"es-abstract/es5":45,"function-bind":55}],85:[function(require,module,exports){
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

},{"./implementation":84,"./polyfill":86,"./shim":87,"define-properties":43,"function-bind":55}],86:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":84}],87:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":86,"define-properties":43}],88:[function(require,module,exports){
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
},{"./lib/default_stream":89,"./lib/results":91,"./lib/test":92,"_process":37,"defined":44,"through":93}],89:[function(require,module,exports){
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
},{"_process":37,"fs":36,"through":93}],90:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":37}],91:[function(require,module,exports){
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
},{"_process":37,"events":52,"function-bind":55,"has":56,"inherits":58,"object-inspect":61,"resumer":81,"through":93}],92:[function(require,module,exports){
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
},{"./next_tick":90,"deep-equal":40,"defined":44,"events":52,"has":56,"inherits":58,"path":64,"string.prototype.trim":85}],93:[function(require,module,exports){
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
},{"_process":37,"stream":83}],94:[function(require,module,exports){
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
},{}]},{},[17]);
