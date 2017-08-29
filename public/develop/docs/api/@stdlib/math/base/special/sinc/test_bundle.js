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

},{"@stdlib/math/constants/float64-ninf":65,"@stdlib/math/constants/float64-pinf":67}],6:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./abs.js":8}],10:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":46,"@stdlib/math/base/utils/float64-get-high-word":50,"@stdlib/math/base/utils/float64-to-words":56}],11:[function(require,module,exports){
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

},{"./copysign.js":10}],12:[function(require,module,exports){
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
		return kernelCos( x, z );
	}
	// Case: cos(Inf or NaN) is NaN */
	else if ( ix >= 0x7ff00000 ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = rempio2( x, y );
	switch ( n & 3 ) {
	case 0:
		return kernelCos( y[0], y[1] );
	case 1:
		return -kernelSin( y[0], y[1] );
	case 2:
		return -kernelCos( y[0], y[1] );
	default:
		return kernelSin( y[0], y[1] );
	}
} // end FUNCTION cos()


// EXPORTS //

module.exports = cos;

},{"@stdlib/math/base/special/kernel-cos":16,"@stdlib/math/base/special/kernel-sin":18,"@stdlib/math/base/special/rempio2":22,"@stdlib/math/base/utils/float64-get-high-word":50}],13:[function(require,module,exports){
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

},{"./cos.js":12}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"./floor.js":14}],16:[function(require,module,exports){
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

},{"./kernel_cos.js":17}],17:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":42}],18:[function(require,module,exports){
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

},{"./kernel_sin.js":19}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./ldexp.js":21}],21:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/copysign":11,"@stdlib/math/base/utils/float64-exponent":44,"@stdlib/math/base/utils/float64-from-words":46,"@stdlib/math/base/utils/float64-normalize":54,"@stdlib/math/base/utils/float64-to-words":56,"@stdlib/math/constants/float64-exponent-bias":60,"@stdlib/math/constants/float64-max-base2-exponent":63,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":62,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":64,"@stdlib/math/constants/float64-ninf":65,"@stdlib/math/constants/float64-pinf":67}],22:[function(require,module,exports){
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

},{"./rempio2.js":24}],23:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":15,"@stdlib/math/base/special/ldexp":20}],24:[function(require,module,exports){
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

},{"./kernel_rempio2.js":23,"./rempio2_medium.js":25,"@stdlib/math/base/utils/float64-from-words":46,"@stdlib/math/base/utils/float64-get-high-word":50,"@stdlib/math/base/utils/float64-get-low-word":52}],25:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":26,"@stdlib/math/base/utils/float64-get-high-word":50}],26:[function(require,module,exports){
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

},{"./round.js":27}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"./sin.js":29}],29:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":16,"@stdlib/math/base/special/kernel-sin":18,"@stdlib/math/base/special/rempio2":22,"@stdlib/math/base/utils/float64-get-high-word":50}],30:[function(require,module,exports){
'use strict';

/**
* Compute the normalized cardinal sine of a number.
*
* @module @stdlib/math/base/special/sinc
*
* @example
* var sinc = require( '@stdlib/math/base/special/sinc' );
*
* var v = sinc( 0.5 );
* // returns ~0.637
*
* v = sinc( -1.2 );
* // returns ~-0.156

* v = sinc( 0.0 );
* // returns 1.0
*
* v = sinc( NaN );
* // returns NaN
*/

// MODULES //

var sinc = require( './sinc.js' );


// EXPORTS //

module.exports = sinc;

},{"./sinc.js":31}],31:[function(require,module,exports){
'use strict';

// MODULES //

var sinpi = require( '@stdlib/math/base/special/sinpi' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// MAIN //

/**
* Computes the normalized cardinal sine of a number.
*
* #### Method
*
* For \\( x \neq 0 \\), the normalized cardinal sine is calculated as
*
* ``` tex
* \operatorname{sinc}(x) = \frac{\operatorname{sin}(\pi x)}{\pi x}.
* ```
*
*
* #### Special Cases
*
* ``` tex
* \begin{align}
* \operatorname{sinc}(0) &= 1 & \\
* \operatorname{sinc}(\infty) &= 0 & \\
* \operatorname{sinc}(-\infty) &= 0 & \\
* \operatorname{sinc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align}
* ```
*
*
* @param {number} x - input value
* @returns {number} cardinal sine
*
* @example
* var v = sinc( 0.5 );
* // returns ~0.637
*
* @example
* var v = sinc( -1.2 );
* // returns ~-0.156
*
* @example
* var v = sinc( 0.0 );
* // returns 1.0
*
* @example
* var v = sinc( NaN );
* // returns NaN
*/
function sinc( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return 0.0;
	}
	if ( x === 0.0 ) {
		return 1.0;
	}
	return sinpi( x ) / ( PI * x );
} // end FUNCTION sinc()


// EXPORTS //

module.exports = sinc;

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/sinpi":38,"@stdlib/math/constants/float64-pi":66}],32:[function(require,module,exports){
module.exports={"expected":[0.0,-0.0004979484171856053,-0.0009841399885140729,-0.0014465974938411748,-0.001873915821329042,-0.0022555432153013566,-0.002582041805419834,-0.002845320985171439,-0.0030388378693467265,-0.003157759864523715,-0.0031990853139244606,-0.0031617192056659906,-0.0030465020362126353,-0.002856191071681028,-0.0025953944202871545,-0.002270459490870487,-0.0018893185364843,-0.0014612950408170098,-0.0009968756725717792,-0.0005074533850053559,-5.047953504107395e-6,0.0004979891943641825,0.0009892786084450267,0.0014567174418617138,0.0018887775777249986,0.002274789913622713,0.0026052077940286423,0.0028718430868188084,0.0030680690666735405,0.003188985079062221,0.003231538893921081,0.0031946036951719567,0.003079007765459827,0.002887516087604052,0.002624764266710047,0.002297146350598696,0.0019126592622949528,0.001480707628769972,0.0010118737685612493,0.0005176584631119219,1.0198861363700948e-5,-0.0004980295636934392,-0.0009945196882999979,-0.0014670405030020358,-0.0019039383969259704,-0.002294424540413871,-0.002628841279696403,-0.0028989009665132703,-0.0030978913172011774,-0.0032208422133739355,-0.00326464979997276,-0.0032281547830542373,-0.003112172953577059,-0.002919477137058461,-0.0026547309634748686,-0.0023243760378063583,-0.0019364752399723662,-0.0015005159652911758,-0.001027178106299872,-0.0005280724493664604,-1.545589339407222e-5,0.0004980695251135532,0.0009998664106766566,0.0014775729769418826,0.0019194075529372137,0.002314459127279241,0.0026529567659724818,0.002926511251937036,0.0031283229710997546,0.0032533508943310163,0.003298438456543866,0.00326239319062105,0.003146018108595766,0.0029520940078529984,0.002685313086918562,0.0023521654539889717,0.0019607812722298736,0.0015207323804181968,0.0010427982287369107,0.0005387018526958475,2.0822351418051697e-5,-0.0004981090785657377,-0.001005322090856745,-0.0014883214261299312,-0.0019351947067978814,-0.0023349062082004823,-0.002677569362315304,-0.002954691265781971,-0.003159383145946983,-0.0032865315700335456,-0.0033329261431463155,-0.003297340507108926,-0.003180564597991611,-0.0029853873174923,-0.0027165299926846776,-0.0023805322100585694,-0.0019855927834285998,-0.0015413697222672565,-0.0010587440800023894,-0.0005495534558027233,-2.6301676208954497e-5,0.0004981482239912289,0.0010108901837920985,0.0014992926896293514,0.0019513099269824446,0.0023557788460340265,0.002702694816065715,0.0029834590624454606,0.003191091767267006,0.003320405553214996,0.0033681350395562424,0.0033330192356046673,0.0032158346941821626,0.003019378557122128,0.0027484018570227975,0.002409494663957775,0.002010925852557115,0.0015624413845310434,0.001075026026713675,0.0005606343297113969,3.189745487887599e-5,-0.0004981869613324518,-0.0010165742915382609,-0.0015104938978460383,-0.0019677637111083822,-0.0023770906607018085,-0.0027283495464680823,-0.0030128334670749615,-0.0032234696116672655,-0.003354995067429716,-0.0034040882739307583,-0.003369452841914527,-0.0032518516229450554,-0.0030540901382987242,-0.002780949720741039,-0.0024390719606944716,-0.0020367972483311494,-0.0015839613357489504,-0.001091654880652145,-0.0005719518492535973,-3.761342874095078e-5,0.0004982252905318412,0.001022378171167947,0.0015219324882094376,0.0019845670090447563,0.0023988558592064244,0.0027545506808907545,0.0030428341171408273,0.003256538352768117,0.003390323296233511,0.003440809974044072,0.003406665806602925,0.003288639614979209,0.003089545442794039,0.0028141955360155855,0.002469284074977216,0.002063224466578198,0.0016059441504799085,0.0011086419229187027,0.0005835137095606349,4.3453501686560485e-5,-0.0004982632115330347,-0.0010283057431994059,-0.001533616221877156,-0.0020017312475315977,-0.0024210892676064023,-0.0027813160934166492,-0.003073481506728138,-0.0032903206101400993,-0.0034264144355852654,-0.003478325321881563,-0.0034446836804439013,-0.003326223960848225,-0.0031257688756715562,-0.0028481622162732953,-0.0025001518566542887,-0.002090225770078284,-0.001628405042528276,-0.0011259989296769795,-0.0005953279436442237,-4.942174911208309e-5,0.0004983007242796662,0.0010343611005830435,0.0015455532015407746,0.002019268356425221,0.0024438063651054985,0.0028086644459837766,0.0031047970337596863,0.0033248400014794723,0.0034632937497192768,0.0035166606118513114,0.0034835331435485407,0.003364631069569198,0.003162785921883737,0.0028828736893883916,0.0025316970791701855,0.0021178202310554437,0.0016513599003776449,0.001143738199612283,0.0006074029411455721,5.552242744295473e-5,-0.0004983378287165857,-0.001040548518285073,-0.001557751890422174,-0.002037190796694864,-0.002467023320419674,-0.002836615232277634,-0.0031368030503765147,-0.0033601211982765395,-0.003500987630758621,-0.003555843312895935,-0.003523242068456614,-0.003403888531130716,-0.003200623206669064,-0.0029183549544499247,-0.0025639424912796407,-0.0021460277765237355,-0.0016748253250103383,-0.001161872583236179,-0.0006197474683495501,-6.175998429688796e-5,0.0004983745247886269,0.0010468724635200573,0.001570221132549645,0.002055511590311878,0.002490757030600152,0.002865188824589519,0.003169522916727579,0.003396189985250863,0.0035395236623659747,0.0035959021348129865,0.0035638395875052563,0.0034440251832525124,0.003239308560047316,0.0029546321423858986,0.00259691187227384,0.0021748692367183297,0.0016988186702973905,0.0011804155141881586,0.0006323706895593717,6.813906934222675e-5,-0.0004984108124418531,-0.0010533376066790532,-0.0015829701744203663,-0.0020742443521781905,-0.0025150251625112746,-0.002894406523879812,-0.003202981058438294,-0.003433073323855914,-0.0035789306877536333,-0.0036368670991204738,-0.00360535616481757,-0.0034850711827247886,-0.0032788710857435607,-0.0029917325807501194,-0.002630630091004051,-0.002204366396855014,-0.0017233580861699474,-0.001199381042689853,-0.0006452821899462679,-7.466454590211034e-5,0.0004984466916222977,0.0010599488330143533,0.0015960086881562086,0.0020934033242626738,0.0025398461971736074,0.0029242906133038495,0.003237203028056906,0.00347079942018024,0.0036192388824060036,0.0036787696148350255,0.003647823673284301,0.003527058081699554,0.0033193412348973984,0.003029684863012243,0.0026651231690070472,0.002234542052492471,0.0017484625647933205,0.0012187838713316977,0.0006584919999888736,8.134150337040277e-5,-0.0004984821622772376,-0.001066711255137382,-0.0016093467962793224,-0.0021130034121211038,-0.002565239477209873,-0.002954864415482041,-0.003272215570802842,-0.003509397797605817,-0.0036604798318989884,-0.0037216425595647646,-0.003691275476948093,-0.0035700189093381,-0.0033607508849519876,-0.0030685189227173115,-0.0027004183480726107,-0.002265420068788891,-0.0017741519899950786,-0.0012386393933787395,-0.0006720106216383503,-8.817527050085159e-5,0.000498517224353906,0.0010736302264018885,0.0016229950982362409,0.002133060224000768,0.002591225257645969,0.0029861523538260355,0.00330804669497175,0.0035488993746164476,0.0037026866152389693,0.0037655203663567944,0.0037357465192371557,0.003613988259260146,0.0034031334241501426,0.003108266112921947,0.002736544162618248,0.0022970254439807916,0.0018004471902129562,0.0012589637338102466,0.0006858490563475613,9.517142964761325e-5,-0.0004985518778007949,-0.001080711355241041,-0.0016369646988212603,-0.002153590112741015,-0.0026178247603512532,-0.0030181800182567525,-0.003344725747388711,-0.003589336548186579,-0.003745893894182583,-0.0038104391167815476,-0.0037812734175394326,-0.003659002383279734,-0.003446523842110451,-0.0031489592913472677,-0.0027735305172788627,-0.002329384377434712,-0.0018273699952635265,-0.001279773793318108,-0.0007000188351267093,-0.00010233583203185616,0.0004985861225663366,0.0010879605205442054,0.001651267238654529,0.0021746102207105132,0.0026450602324217917,0.003050974235689144,0.003382283494334375,0.003630743283224622,0.0037901380090449408,0.0038564366407827476,0.0038278945646545333,0.0037050992919631983,0.0034909588269975552,0.0031906329117375796,0.002811408770151105,0.0023625243426653605,0.0018549432972521389,0.0013010872955213537,0.0007145320507927611,0.00010967461412752293,-0.0004986199586002391,-0.001095383888156867,-0.0016659149268954672,-0.0021961385280363276,-0.0026729550088480064,-0.0030845631456884472,-0.0034207522084155942,-0.0036731552085880258,-0.003835457081552563,-0.0039035526238738205,-0.0038756502377148556,-0.003752318862593936,-0.003536476869856068,-0.0032333231219556875,-0.002850211822183158,-0.002396474165743659,-0.0018831911159860532,-0.0013229228376689499,-0.000729401392607532,-0.00011719421525729847,0.0004986533858521337,0.0011029879286062277,0.0016809205763798618,0.0022181939044144776,0.0027015335798338228,0.0031189762817496777,0.0034601657618934943,0.003716609720242386,0.003881891125352535,0.003951828722319142,0.003924582715224827,0.0038007029551900286,0.0035831183767293805,0.0032770678694049025,0.0028899742132417537,0.0024312641095693027,0.0019121386692788332,0.0013452999451408507,0.0007446401835075916,0.0001249013965102919,-0.000498686404272945,-0.0011107794361543178,-0.0016962976413981126,-0.0022407961648112304,-0.002730821663179478,-0.003154244658690453,-0.0035005597270388582,-0.00376114609219053,-0.003929482164852002,-0.004001308687002701,-0.003974736402933296,-0.003850295537282631,-0.0036309257892521546,-0.0033219070144208536,-0.002930732225449789,-0.002466925964521319,-0.0019418124485833497,-0.001368239130077827,-0.0007602624201610082,-0.00013280326109271938,0.0004987190138135041,0.0011187655493018677,0.001712060258343741,0.002263966129405304,0.0027608462821736048,0.00319040086670408,0.0035419714841371133,0.0038068055958650603,0.00397827436312883,0.004052038496758475,0.004026157969326973,0.0039011428182383874,0.0036799437144705953,0.003367882452348414,0.002972523994440541,0.002503493146061756,0.001972240300425282,0.0013917619545153609,0.0007762828160985754,0.0001409072762459341,-0.000498751214425952,-0.0011269537728676021,-0.0017282232894953666,-0.002287725688147475,-0.0027916358494945565,-0.003227479172668968,-0.0035844403378348733,-0.003853631628745344,-0.004028314159732833,-0.00410406650201642,-0.004078896491613337,-0.003953293393987211,-0.0037302190647274754,-0.003415038245086422,-0.003015389629249405,-0.0025410007999179213,-0.002003451514168219,-0.0014158910984247287,-0.0007927168482044509,-0.00014922129686829603,0.0004987830060623196,0.0011353520017919668,0.0017448023702120214,0.0023120978703630836,0.0028232202576643542,0.003265515629379815,0.0036280076425864788,0.0039016698530433777,0.004079650419280244,0.004157443579707545,0.004133003613153557,0.0040067984031086894,0.003781801208532114,0.0034634207629714703,0.003059371341631531,0.0025794859155436026,0.0020354769166868003,0.001440650433117972,0.000809580806869352,0.00015775359100368895,-0.0004988143886759659,-0.0011439685468184455,-0.0017618139598620337,-0.0023371069198578395,-0.0028556309766647717,-0.003304548193428921,-0.003672716938044913,-0.003950968345388164,-0.004132334591842,-0.004212223300471078,-0.0041885337134062684,-0.004061711695331435,-0.003834742133435919,-0.0035130788379586146,-0.003104513585685571,-0.002618987448624658,-0.002068348974596193,-0.0014660651005107062,-0.0008268918501536366,-0.00016651286736473167,0.0004988453622201207,0.001152812162233677,0.001779275396828912,0.002362778376046668,0.0028889011593813633,0.003344616852551425,0.003718614095326008,0.004001577758542031,0.004186420886231281,0.00426846210931905,0.004245544091558453,0.0041180900136112,0.00388909662204386,0.0035640639291636806,0.0031508632087512657,0.002659546453486447,0.0021021019047454403,0.0014921615988015187,0.0008446680623330474,0.00017550830508916387,-0.0004988759266493618,-0.001161892075855331,-0.0017972049579859917,-0.0023891391616713644,-0.0029230657556224377,-0.0033857637633289235,-0.003765747475181695,-0.004053551496290331,-0.004241966457418358,-0.004326219521038878,-0.0043040951651462525,-0.0041759931910834505,-0.003944922442412582,-0.0036164303019479366,-0.0031984696146588124,-0.0027012062263444907,-0.002136771793770344,-0.0015189678751761518,-0.0008629285172529031,-0.0001847495859371765,0.0004989060819181181,0.001171218021489431,0.001815621923063279,0.0024162176777453677,0.0029581616355329,0.003428033400252026,0.0038141680992259076,0.0041069459027759676,0.004299031609433661,0.004385558331756163,0.004364250685113706,0.004235484364325886,0.004002280554228679,0.0036702352218526595,0.0032473849405272276,0.0027440124604536926,0.0021723967275787473,0.0015465134262239314,0.0008816933469513917,0.00019424692917314562,-0.0004989358279821871,-0.00118080027409129,-0.0018345466443885374,-0.002444043906424473,-0.0029942277233235655,-0.0034714727172461034,-0.0038639298354905707,-0.00416182046768777,-0.004357680015274515,-0.004446544848238485,-0.004426077968918025,-0.00429663020453047,-0.004061235332311548,-0.003725539164843909,-0.0032976642484385324,-0.00278801341432119,-0.002209016931750107,-0.0015748294068192038,-0.0009009838160769917,-0.0002040111293898457,0.0004989651647971963,0.0011906496879029755,0.001854000622527379,0.00247264952259193,0.0030313051423310907,0.003516131322897338,0.003915089599727332,0.004218238048875759,0.004417978955500211,0.0045092491367007045,0.004489648153473979,0.004359501168362803,0.004121854809166118,0.003782406045486839,0.003349365733473225,0.002833260094286147,0.0022466749239332625,0.001603948748318357,0.0009208224026722554,0.0002140535975756675,-0.0004989940923201636,-0.0012007777378588993,-0.0018740065884190315,-0.0025020680150257975,-0.0030694373725496556,-0.0035620616707499387,-0.003967707574039605,-0.004276265114142462,-0.004479999577396246,-0.004573745293074292,-0.004555036469934834,-0.004424171770494853,-0.004184210938504212,-0.0038409034648629265,-0.0034025509497552704,-0.0028798064529203336,-0.002285415679457893,-0.001633906287010624,-0.0009412328859753212,-0.0002243864057470228,0.0004990226105079152,0.0012111965645976927,0.0018945885926617018,0.002532334818128306,0.0031086704218984186,0.0036093192662131927,0.004021847444607473,0.004335972004167912,0.004543817176805342,0.00464011173693275,0.004622322542542066,0.004490720880025752,0.004248379881883172,0.0039011029802484038,0.003457285056356873,0.002927709604868079,0.0023252868115176983,0.001664738903877841,0.0009622404419539777,0.00023502233551934661,-0.0004990507193186902,-0.001221919023445403,-0.0019157721026907203,-0.0025634874553012907,-0.003149053012647872,-0.003657962891790274,-0.004077576660482938,-0.004397433218752754,-0.0046095115049737305,-0.004708431531524252,-0.004691590714039125,-0.004559232043271503,-0.004314442320859904,-0.003963080398819343,-0.0035136370851241356,-0.0029770300619459526,-0.002366338767438618,-0.0016964856768440163,-0.0009838717473853724,-0.0002459749310211105,0.0004990784187105133,0.0012329587377918046,0.001937584108669108,0.0025955656951928766,0.0031906367845885584,0.003708054852554489,0.004134966715663405,0.004460727728830894,0.004677167103040538,0.004778792732657876,0.0047629304004462095,0.004629793835699608,0.004382483797353004,0.004026916097914493,0.0035716802327426353,0.0030278319895318258,0.002408625042738683,0.0017291880468313775,0.0010061550933810979,0.000257258556617783,-0.0004991057086428458,-0.0012443301573194486,-0.00196005323902232,-0.00262861172217786,-0.0032334765167283713,-0.0037596612440242093,-0.004194093456927031,-0.004525939316996899,-0.004746873667121443,-0.004851288769524329,-0.004836436478333121,-0.004702500246127501,-0.004452595085229361,-0.004092695374704395,-0.00363149217963671,-0.003080183486532642,-0.0024522024148836115,-0.001762889999112639,-0.001029120509375415,-0.0002688884599578775,0.0004991325890751277,0.0012560486216152238,0.0019832098866509633,0.0026626703226140984,0.0032776303695147735,0.003812852244862413,0.00425503742021364,0.0045931569496381495,0.004818726447300286,0.004926018860914603,0.0049122097081178645,0.004777451096687194,0.0045248725965120525,0.004160508828461759,0.00369315543862843,0.0031341568914942967,0.002497131198891782,0.0017976382616219783,0.0010527998987214108,0.0002808808409249539,-0.0004991590599673905,-0.001268130429746832,-0.002007086346997732,-0.0026977890885985433,-0.0033231601498391965,-0.0038677024371222344,-0.00431788419869166,-0.0046624751841449616,-0.004892826684262159,-0.00500308847073524,-0.004990357197361619,-0.004854752502503775,-0.004599418826029224,-0.004230452779039355,-0.0037567577366424847,-0.0031898291177523837,-0.0025434755272024895,-0.0018334825221112672,-0.0010772271871774145,-0.0002932529271535201,0.0004991851212808195,0.0012805929164737,0.0020317169692812696,0.002734018641177403,0.0033701316013577025,0.003924291157115461,0.0043827248460450085,0.004733994615120348,0.004969282087775558,0.005082609807218276,0.005070992908540356,0.004934517375537622,0.0046763428388188755,0.004302629725616512,0.0038223924331743596,0.0032472820208839064,0.002591303656543708,0.0018704756662674044,0.001102438485742836,0.0003060230568437195,-0.0004992107729767691,-0.0012934545358373121,-0.0020571383223919448,-0.0027714128752081325,-0.003418614723000364,-0.003982702880372353,-0.004449656318979023,-0.004807822364015872,-0.005048207361780579,-0.0051647023707949305,-0.005154238216354864,-0.005016865977622425,-0.00475576080516197,-0.004377148850312425,-0.0038901589797166376,-0.003306602802156573,-0.0026406883048833213,-0.0019086740391963822,-0.0011284722694826124,-0.0003192107697180752,0.0004992360150173086,0.0013067349529809705,0.002083389377130332,0.002810029228366162,0.0034686841189110838,0.004043027644622638,0.004518781963465712,0.004884072617206557,0.0051297247814656565,0.00524949355625904,0.005240222520311385,0.005101926528395135,0.004837796588765052,0.004454126571867653,0.003960163424899833,0.0033678844521541663,0.0026917070219641434,0.0019481377329887916,0.001155369574205037,0.00033283690706444556,-0.0004992608473651126,-0.0013204551451590709,-0.002110511706700611,-0.0028499289771196233,-0.0035204193834989695,-0.004105361515251484,-0.004590212049858264,-0.004962867218188989,-0.005213964828439405,-0.005337119315601866,-0.005329083919074996,-0.005189835874581361,-0.0049225823943547355,-0.004533687155300853,-0.004032518970743513,-0.003431226239326559,-0.0027444425973930627,-0.00198893090345579,-0.0011831742131067637,-0.0003469237219449453,0.0004992852699834612,0.001334637513027222,0.002138549707627634,0.0028911775628799184,0.003573905525780575,0.004169807098291436,0.004664064362702018,0.0050443363203623295,0.005301066890937123,0.005427724888771913,0.0054209699539874675,0.005280740227984156,0.005010259481806343,0.004615963384254445,0.0041073465861544605,0.003496734248862375,0.0027989835108012304,0.0020311221195462256,0.001211933015790789,0.0003614950007958476,-0.0004993092828362403,-0.001349306003455068,-0.002167550843566953,-0.002933844951979487,-0.003629233437771507,-0.00423647410671219,-0.004740464851877603,-0.005128619107748382,-0.005391180036965443,-0.0055214656106216805,-0.005516038430169592,-0.005374795980547332,-0.005100978954919898,-0.0047010973036822395,-0.0041847756846658795,-0.003564521978037302,-0.002855424429223849,-0.0020747847494479673,-0.001241696092400159,-0.0003765761978162575,0.0004993328858879418,0.0013644862452781303,0.002197565914824165,0.0029780060336419465,0.0036865004123560227,0.004305479986582424,0.004819548352648121,0.005215864592045647,0.005484463869405808,0.005618507803472118,0.0056144583248202125,0.005472170606050852,0.005194902634108511,0.004789241041616164,0.00426494487440376,0.0036347109950666994,0.0029138667575810077,0.002119997387946734,0.0012725171260012716,0.00039219458374272734,-0.0004993560791036628,-0.0013802056996074816,-0.002228649356802987,-0.003023741060706416,-0.003745810716841524,-0.004376950610621241,-0.0049014593832697444,-0.005306232495619118,-0.0055810894733952805,-0.005719029766083681,-0.0057164107937097515,-0.0055730436593746996,-0.005292204023601741,-0.004880557720013452,-0.0043480027894247505,-0.0037074316695068334,-0.002974419248993278,-0.0021668443302790726,-0.0013044536968056491,-0.0004083794108390892,0.0004993788624491068,0.0013964938265517643,0.0022608595710706075,0.003071136138562334,0.0038072762293109965,0.004451021047755252,0.004986353030091614,0.005399894231433152,0.005681240467815142,0.005823222871405137,0.0058220902884803544,0.00567760788587446,0.005393069385325811,0.0049752224661573485,0.004434109012914148,0.0037828239834388124,0.003037198682660485,0.0022154160984898313,0.001337567642349765,0.00042516209620153196,-0.0004994012358905829,-0.001413382270481044,-0.002294259293276324,-0.0031202837685617006,-0.0038710171459441123,-0.0045278364185797,-0.005074395931549558,-0.005497033992576092,-0.005785114174483438,-0.005931292787319428,-0.005931705799250733,-0.0057860704552892585,-0.005497698933444512,-0.005073423537804843,-0.0045234351043086955,-0.003861038434053021,-0.0031023306181918254,-0.002265810027208975,-0.0013719254583731547,-0.0004425764257956385,0.0004994231993950062,0.0014309050662837338,0.002328916002800086,0.0031712834531242825,0.003937162768715742,0.004607552848123224,0.0051657673741894745,0.005597849965947223,0.005892922920715492,0.00604346083677062,0.006045482239232985,0.00589865433680216,0.0056063081656796115,0.005175363577291166,0.004616165744253739,0.0039422370398797205,0.0031699502366417673,0.002318130916824251,0.0014075987458627799,0.00046065878201354227,-0.0004994447529298979,-0.0014490988694453005,-0.0023649023797592404,-0.003224242370864638,-0.004005852384333669,-0.004690338529078103,-0.005260660515888773,-0.005702555686933521,-0.006004895493344948,-0.006159965516198533,-0.006163661990663994,-0.006015599834457481,-0.005719129350038298,-0.00528126101217035,-0.004712500013473497,-0.004026594464822248,-0.0032402032801042424,-0.0023724917632710714,-0.0014446647105886001,-0.0004794483979762931,0.0004994658964633853,0.0014680032132216182,0.002402296815886421,0.003279276131380149,0.004077236246987845,0.004776374910732589,0.005359283753837758,0.0058113815545614185,0.006121278765158374,0.006281064194202998,0.0062865066344118545,0.0061371663051847155,0.005836413188532,0.005391351622764299,0.004812652824190476,0.004114299276403143,0.003313247103609064,0.002429014575136549,0.0014832067224623852,0.00049898764232188,-0.0004994866299642018,-0.0014876607967040138,-0.0024411839868356293,-0.003336509620886159,-0.004151476679503171,-0.004865858031292078,-0.0054618622576696665,-0.005924576529748495,-0.006242339518075985,-0.006407035015899065,-0.006414298889231547,-0.006263634085278337,-0.0059584306829663135,-0.005505890300295326,-0.004916856525754135,-0.004205555357299137,-0.003389251855298386,-0.002487831290511065,-0.0015233149432513535,-0.0005193223388304313,0.0004995069534018319,0.0015081178081936151,0.002481655494709924,0.003396077951716217,0.004228749309879922,0.004959000014178264,0.005568639691477361,0.006042410043000381,0.006368366491416408,0.006538179042619891,0.006547344790928543,0.006395306655450966,0.006085475232027197,0.005625153023194407,0.005025362709726539,0.004300583492403815,0.003468401803513102,0.0025490848080893997,0.0015650870325921698,0.000540502125959515,-0.0004995268667459349,-0.0015294242890396418,-0.002523810591072749,-0.003458127530881927,-0.004309244463048439,-0.005056030752344932,-0.0056798801524359024,-0.006165174142321336,-0.006499672688346078,-0.006674822661613705,-0.006685976146785181,-0.006532513079655107,-0.006217864993821124,-0.005749439083839183,-0.00513844424394292,-0.004399623157422036,-0.00355089683257666,-0.002612930149483023,-0.0016086289439431784,-0.0005625808622302939,0.0004995463699672048,0.0015516345439747503,0.002567756992455373,0.003522817265481432,0.004393168731053918,0.0051571998087626405,0.00579587035849868,0.006293185917383429,0.00663659797929637,0.006817320306335428,0.006830553306687212,0.0066756107589302964,0.0063559455539161066,0.005879073603542854,0.0052563975701654195,0.004502934539498232,0.0036369541328365278,0.002679535772645588,0.0016540558241312868,0.0005856170844319539,-0.0004995654630368001,-0.001574807605029865,-0.0026136118024667624,-0.0035903199258494715,-0.004480746748942261,-0.005262778566147284,-0.005916922123318421,-0.006426790242315971,-0.006779512047935621,-0.00696605753506431,-0.006981468299673631,-0.006824988548794429,-0.006500092945987263,-0.006014410380286908,-0.005379545306061812,-0.004610800825773317,-0.003726810115047434,-0.0027490850598400076,-0.0017014930325724936,-0.0006096745268524057,0.0004995841459264859,0.0015990077573746666,0.002661502557124518,0.00366082369106865,0.004572223208487779,0.005373062664920417,0.006043375163372362,0.006566362887066885,0.006928817733460248,0.007121454524150196,0.007139148393392101,0.006981070297430318,0.006650717080657745,0.006155835121716455,0.005508239199596709,0.004723530802254397,0.0038207225846256412,0.0028217780078207697,0.001751077299161873,0.0006348227112328063,-0.0004996024186086334,-0.0016243051369436027,-0.0027115684130571555,-0.0037345339059533106,-0.004667865147774014,-0.0054883747755184375,-0.006175600290505054,-0.006712314056442612,-0.007084954832834188,-0.007283970042533686,-0.007304060144513753,-0.007144318872459579,-0.0068082656483729465,-0.00630376912560896,-0.005642863492807218,-0.004841461813221321,-0.003918973217882978,-0.0028978331530358048,-0.0018029580433547453,-0.000661137618945707,0.0004996202810562207,0.0016507764115494547,0.002763961501886978,0.0038116750840514395,0.00476796456174382,0.005609067759797775,0.006314003053072047,0.00686509242701998,0.0072484044385550265,0.007454105986715664,0.007476714020971239,0.007315240756871837,0.00697322857456826,0.00645867348177893,0.005783838762709905,0.004964963140903979,0.004021870390332069,0.002977489770878448,0.0018572988812404086,0.0006887024590844695,-0.0004996377332428323,-0.0016785055594146566,-0.0028188484785587834,-0.0038924931978167655,-0.004872841387469698,-0.005735528286773773,-0.006459027900989132,-0.00702518976560601,-0.007419693902059468,-0.007632412570596073,-0.007657669692472181,-0.00749439131022715,-0.0071461431205133005,-0.006621053883690652,-0.005931626320208761,-0.005094439876749037,-0.00412975241688066,-0.0030610103956079625,-0.0019142793526266359,-0.0007176085488191038,0.0004996547751426591,0.0017075847617731318,0.0028764122968070907,0.003977258305157144,0.00498284692843379,0.005868180980738414,0.006611162964793749,0.0071931462293892065,0.007599402530636992,0.007819494283229648,0.007847542104792373,0.007682380810259297,0.007327599741707257,0.006791466155552376,0.006086733263927448,0.005230337369769898,0.004242991275637051,0.003148683716845993,0.001974096906540806,0.0007479563256406181,-0.0004996714067304989,-0.001738115429529981,-0.002936854251610923,-0.00406626757144897,-0.005098367795032375,-0.006007493195508426,-0.0067709455569826904,-0.007369556468131376,-0.007788168147512269,-0.008016016750413116,-0.008047008476746451,-0.007879881413354087,-0.007518248838415677,-0.006970522622169472,-0.006249718305618962,-0.005373146354899208,-0.004361996901685738,-0.0032408279199805166,-0.002036969191411513,-0.0007798565151358726,0.0004996876279817562,0.001770209388071569,0.0030003963366801744,0.004159848758271796,0.005219830454435312,0.00615398052791303,0.006938968526270473,0.007555076673659634,0.007986694671629482,0.008222714664223712,0.008256816387595532,0.008087635201188133,0.007718808560978605,0.0071588994753847635,0.006421198508172137,0.005523408885788824,0.004487222155278088,0.0033377945519282148,0.0021031367059087002,0.0008134314829056422,-0.000499703438872442,-0.0018039902493973679,-0.003067283975158818,-0.004258364265178828,-0.005347706502646116,-0.006308213207596361,-0.0071158876231350015,-0.007750432752783476,-0.008195760906976714,-0.008440400979594465,-0.008477793158440083,-0.00830646351654873,-0.007930073867307213,-0.0073573453238827856,-0.006601857107479762,-0.005681725223228556,-0.0046191685913440795,-0.00343997301124608,-0.002172865878491089,-0.000848816805416778,0.0004997188393791741,0.0018395950070607538,0.0031377891943448924,0.0043622158295575945,0.00548251879613691,0.006470823530053587,0.007302430069540686,0.00795642983820608,0.008416230772783183,0.008669977620587218,0.008710856775759574,0.008537277835914221,0.008152927073374361,0.007566691154240954,0.0067924526271774775,0.005848761863716986,0.004758393185276712,0.003547795783489767,0.002246452658789748,0.0008861631022999444,-0.0004997338294791775,-0.0018771758973029884,-0.00321221433100436,-0.004471850013078171,-0.005624848611131677,-0.006642514537169457,-0.007499404568950085,-0.008173963400150804,-0.008649065257907065,-0.008912447993631547,-0.008957028661184158,-0.008781092482245416,-0.008388350191923908,-0.007787861982682491,-0.006993829542630063,-0.006025260934597521,-0.00490551620515694,-0.0036617445702319786,-0.0023242267229033843,-0.0009256381823074528,0.0004997484091502838,0.0019169025796951778,0.0032908963737016744,0.004587764632723605,0.005775344037248705,0.006824070196554876,0.007707713047173838,0.008404032282078013,0.008895336448238294,0.009168931673829792,0.009217448662096237,0.009039039551906143,0.008637439423280494,0.00802189054207004,0.0072069308103380825,0.006212051235057717,0.005061230465070703,0.0037823574949215487,0.0024065564186282855,0.0009674295674134457,-0.0004997625783709313,-0.0019589647031661435,-0.003374212073684432,-0.0047105163317371,-0.005934729861138727,-0.00701636739054331,-0.00792836448357954,-0.00864775406075006,-0.009156244058995261,-0.009440681717724978,-0.009493392727115867,-0.009312386519058333,-0.008901422249298773,-0.008269933431326915,-0.007432812654895259,-0.006410061269489353,-0.005226312250712162,-0.003910237612970433,-0.0024938546071045717,-0.0010117474751470943,0.0004997763371201655,0.0020035749392887845,0.003462583987844246,0.004840729533390602,0.0061038192581056505,0.007220390101644551,0.008162491280137086,0.008906383228972753,0.009433135009774935,0.009729105167362266,0.009786293844752715,0.009602557095107062,0.009181677692858837,0.008533290260114216,0.007672662102749089,0.006620334705659712,0.0054016342808136195,0.004046063010037322,0.0025865855963589407,0.0010588283592409028,-0.0004997896853776387,-0.00205097258519768,-0.0035564876582846873,-0.004979107081491587,-0.006283527689693456,-0.007437246278714156,-0.008411368728706002,-0.009181332825301973,-0.009727526716384924,-0.010035787453696708,-0.010097766970372691,-0.009911156067689896,-0.009479760448602735,-0.00881342645756093,-0.007927817877065648,-0.006844048800851644,-0.005588181161158136,-0.004190598845406027,-0.0026852734125083896,-0.0011089391344622614,0.0004998026231236104,0.0021014278649721407,0.0036564601859800858,0.005126442950356316,0.00647488950859523,0.007668187994082764,0.008676438283004689,0.009474200297950855,0.010041134949701522,0.010362521592814119,0.010429638856830072,0.01023999903404854,0.009797429776316572,0.00911200059013373,0.008199795430191765,0.007082536482775649,0.00578706790892566,0.0043447117920560625,0.002790511719708866,0.0011623822450053728,-0.0004998151503389469,-0.0021552470927320567,-0.003763110524900982,-0.005283637509551593,-0.006679077906832461,-0.007914635665988832,-0.008959335531986636,-0.0097867986025394,-0.010375907341593256,-0.01071134331031862,-0.010783983952346933,-0.010591148192132959,-0.010136684290920787,-0.009430897264079186,-0.0084903171022179,-0.007337312959898937,-0.005999562283412168,-0.004509387448960357,-0.0029029757854541617,-0.0012195017797111186,0.0004998272670051219,0.0022127789058054284,0.0038771319133282475,0.005451715963279508,0.0068974290198050275,0.008178207336127728,0.009261924021310554,0.010121193812462388,0.01073406392005948,0.011084573547377905,0.011163167855840832,0.01096695567991756,0.010499804102458802,0.00977226699134646,0.008801348673583398,0.007610107983526702,0.006227111867964588,0.0046857514647080855,0.003023437000742889,0.0012806908953553464,-0.0004998389731042158,-0.002274421835964055,-0.003999316978568101,-0.005631850762340595,-0.007131471232654131,-0.00846075427748175,-0.009586336400759704,-0.010479750890638568,-0.011118146456355518,-0.011484870223983422,-0.01156990025341489,-0.011370116387791783,-0.010889402183820174,-0.010138574801233098,-0.009135143951220975,-0.007902905213460468,-0.006471377125873054,-0.00487509532933025,-0.003152780615042457,-0.001346400886507567,0.0004998502686189164,0.002340633566277561,0.004130576210748532,0.005825389024356908,0.007382961047751267,0.008764404588953112,0.009935024818272702,0.010865189766344709,0.011531078943048102,0.01191529170012241,0.012007299840468286,0.011803732751077144,0.011308487412946367,0.010532659921096364,0.00949429952644526,0.008217990581521268,0.006734272026314245,0.0050789080839449925,0.0032920275482569024,0.0014171523444164776,-0.0004998611535325186,-0.0024119423282804933,-0.004271960716259689,-0.006033886318456931,-0.007653927293463686,-0.009091616947969672,-0.010310823079117648,-0.011280654529437162,-0.011976242246615457,-0.012379375139769267,-0.012478974519597449,-0.01227139481779388,-0.011760542506896118,-0.010957809582676706,-0.00988182251890185,-0.008558012147395192,-0.007018014343138497,-0.0052989155953275845,-0.003442361416709588,-0.0014935489886831372,0.0004998716278289244,0.0024889610399411273,0.004424690453950987,0.006259148607228472,0.007946726028588931,0.009445247394025387,0.010717023904460795,0.011729799466980577,0.012457566967998242,0.012881234026972468,0.012989121238799589,0.012777279964959283,0.012249621120025238,0.01141785101478432,0.010301215047417406,0.008926054764172664,0.0073251884244305825,0.005537129588137686,0.0036051622875877326,0.0015762949496619493,-0.0004998816914927914,-0.0025724049855013645,-0.004590189559913259,-0.006503284740106256,-0.00826410928824345,-0.009828632983852033,-0.011157475749066484,-0.012216896927351098,-0.012979649911765305,-0.01342568052680455,-0.013542651320281375,-0.013326278128651059,-0.012780469839135626,-0.01191726707436337,-0.01075658045299994,-0.00932573401241398,-0.007658824195577588,-0.005795909385283268,-0.0037820492007743915,-0.0016662165495358848,0.0004998913445089461,0.0026631141174971538,0.00477013092766235,0.0067687727305811955,0.008609311920774534,0.010245697509493373,0.011636705209578624,0.012746973757611902,0.013547901476296881,0.014018380403549201,0.014145349210283263,0.013924150503129907,0.013358682855896302,0.012461342919452703,0.011252758102018584,0.00976131546474939,0.008022497514517292,0.006078040372536607,0.003974934235069368,0.0017642900102140923,-0.0004999005868632548,-0.0027620814550023795,-0.0049664930020716334,-0.007058544233101008,-0.008986162324739762,-0.010701086379985947,-0.012160073278409874,-0.01332598555263255,-0.014168733985685347,-0.014666051071562288,-0.014804075531180369,-0.014577732631325226,-0.01399090000536382,-0.013056353901713934,-0.011795496162110052,-0.010237867625189771,-0.00842045892941534,-0.00638683472261581,-0.004186091948690948,-0.0018716770589677124,0.0004999094185420486,0.00287048961502302,0.005181632877782936,0.007376093329870268,0.009399225129245892,0.011200340504971734,0.012733976888613273,0.013961041533492402,0.014849804875587623,0.015376717471201845,0.015527029563466578,0.015295197081771052,0.014685063051126261,0.013709808857247924,0.012391675444855458,0.010761460183788627,0.008857800681197014,0.006726262111548684,0.004418249548285629,0.0019897711891188065,-0.0004999178395322659,-0.0029897583307750167,-0.005418381437338485,-0.007725618200310448,-0.009853987110754086,-0.011750123003712042,-0.013366111842978676,-0.014660698091045404,-0.015600334323726319,-0.016160046474455167,-0.016324092491425985,-0.016086397156987883,-0.015450751233894125,-0.01443076883642403,-0.013049602836854107,-0.01133942406496496,-0.009340675894370185,-0.007101121390555302,-0.004674705383281189,-0.0021202584910250057,0.0004999258498214523,0.0031216070153280927,0.005680168691896224,0.00811220788424745,0.01035710244503576,0.012358518460985912,0.01406582010540616,0.01543534676709281,0.0164315253418428,0.017027789454111136,0.01720728197172487,0.016963322376947847,0.016299626238109367,0.01523027005054772,0.013779400937706705,0.011980696971165165,0.009876590028559139,0.0075172690089661464,0.004959486720135837,0.0022651987038900872,-0.0004999334493977613,-0.0032681382378879765,-0.005971191135590831,-0.008542091822640277,-0.010916720628327143,-0.013035433339911882,-0.014844554818168681,-0.01629773412717272,-0.01735712708081612,-0.017994376158632423,-0.018191362554092323,-0.01794071057576574,-0.01724603059531682,-0.016121893082504484,-0.014593532832559097,-0.012696289115624747,-0.010474793999178085,-0.007981927351863769,-0.005277562875973007,-0.002427134790205834,0.0004999406382499534,0.0034319507492050765,0.006296638515645208,0.009022978255544349,0.011542931513181105,0.01379313982622832,0.015716512391245194,0.017263668974895407,0.018394201740041794,0.019077723889096176,0.019294678073157472,0.019036883255541804,0.01830780501559801,0.017122540982044753,0.015507520032454175,0.013499920917995685,0.011146822898354138,0.008504107630408701,0.0056351377808999265,0.002609243472602071,-0.0004999474163673963,-0.003616295024378269,-0.006663006176108738,-0.009564520720248104,-0.012248379345277055,-0.014647026851347274,-0.016699506154456256,-0.018353000702765035,-0.019564186441956236,-0.02030035889874853,-0.02054030625648175,-0.020274905349463867,-0.019507424159823372,-0.018253521502547703,-0.016540941959918513,-0.014408911596615046,-0.011907247368846102,-0.009095200253482405,-0.006040058790253993,-0.002815545785387743,0.0004999537837400654,0.003825291230864221,0.007078533177597518,0.010178973033506908,0.013049125734071241,0.015616656616311184,0.01781619660230772,0.019590998332757507,0.020894391493352135,0.02169100022536502,0.02195769110143211,0.021684226547443234,0.020873605650342932,0.019542081840961685,0.017718854799131892,0.015445441904884439,0.012774742459901284,0.009769815533596396,0.0065023994595077815,0.0030512075413408474,-0.0004999597403585432,-0.004064240946168138,-0.007553829533469238,-0.010882128020591146,-0.013965887828077738,-0.01672728214438614,-0.019095860432197388,-0.021010335728581388,-0.02242015964433271,-0.023286844851593526,-0.023585000752886786,-0.023303054811625274,-0.02244363953422503,-0.0210236331485044,-0.01907385042888005,-0.016638388672805315,-0.013773642326682486,-0.010547007984849897,-0.007035309238976557,-0.0033229779441487865,0.0004999652862140198,0.004340083300719416,0.008102795183753802,0.011694694561402047,0.015025856884812715,0.01801207897605098,0.02057699534870267,0.022654018410591694,0.024188053565816138,0.025136945372233994,0.025472617162239794,0.025181873754796753,0.024266844906126683,0.02274505577530648,0.020649119713045,0.018026057899468144,0.014936259535971766,0.011452105212472875,0.0076562845047458234,0.0036398465970852944,-0.0004999704212984408,-0.004662080146458924,-0.00874400231728427,-0.012644371875125142,-0.016265441537321165,-0.019515516452917665,-0.02231126066493941,-0.024579817743191713,-0.02626069202230027,-0.027307342293871464,-0.027688446438060007,-0.0273888031865175,-0.026409845806358884,-0.024769751780945926,-0.02250314231701907,-0.019660375494870534,-0.01630644685707196,-0.012519520958176236,-0.008389126633342703,-0.004014057258478694,0.0004999751456039276,0.005042876660268622,0.009502838605092542,0.013769070874739083,0.01773453509766169,0.02129861064849018,0.024369627586925395,0.026867203255982346,0.028724323500909723,0.029889115177902006,0.030326263682841043,0.030018037484782146,0.028964890906297284,0.027185626436596784,0.02471710845601142,0.021613531138895765,0.01794525422382682,0.013797231029453067,0.009267063289083565,0.004462726824327107,-0.0004999794591236295,-0.005500201507258421,-0.01041494936313575,-0.015122097767925552,-0.019503395495178665,-0.02344740987169951,-0.026852333797550428,-0.029628585216403165,-0.031701133358597124,-0.03301149209331342,-0.033519328252961715,-0.033203641663975256,-0.03206348363128898,-0.030118191546738345,-0.027407128868067964,-0.023988931670441,-0.01994027501969843,-0.015354184264487215,-0.010337927703079418,-0.005010537669552639,0.0004999833618511663,0.0060597067783225746,0.01153200027416424,0.01678085196368086,0.02167421608177798,0.02608729880143247,0.02990570327086984,0.0330283555186565,0.035370137351112864,0.03686415868545219,0.037463609790383184,0.037143143467409614,0.035899748085635654,0.03375308433137408,0.030745271273611756,0.0269401205777288,0.02242183110802162,0.017293169422147762,0.011673174455208277,0.0056944367032340255,-0.0004999868537807644,-0.006759951276797449,-0.012931816860374167,-0.018862172060414205,-0.024401597056645626,-0.02940837678972897,-0.03375207243519965,-0.03731686260315953,-0.04000457005326665,-0.041737296306062384,-0.042459595079703864,-0.042140125802848705,-0.04077274032215785,-0.03837696906924548,-0.03499788707570154,-0.03070535499784223,-0.025592645387472197,-0.019774479462189867,-0.013384514226768273,-0.006572333619781862,0.0004999899349072574,0.007661685923094698,0.014737340888804688,0.02155112357544523,0.027931079912776952,0.033713394656709875,0.03874651588525045,0.04289504043866155,0.046043262752153966,0.04809829629297826,0.04899268585018807,0.04868644004828253,0.047168426426974816,0.04445708596298059,0.040600439679584474,0.035675376635813556,0.029786229723793814,0.023062662928087254,0.015656910604921387,0.007740425514916414,-0.000499992605226233,-0.008866502592579446,-0.017154864477134043,-0.025159312550910806,-0.03267754510405275,-0.039515712488908054,-0.04549328337019278,-0.05044767005173991,-0.05423849765455427,-0.056751408606241706,-0.057901303270916867,-0.05763492941910795,-0.055932747365152566,-0.05281001368478218,-0.04831704411740193,-0.042538635162671444,-0.03559264357197898,-0.027627742960354456,-0.018820396657069215,-0.00937110520379557,0.000499994864733469,0.010558087605421663,0.02055908147188417,0.03025533970306005,0.03940160679616202,0.047760993603911533,0.0551108797452098,0.06124859141693846,0.06599671540832616,0.06920791613822018,0.07076913177280675,0.07060503777420397,0.06868068134314281,0.06500320784720393,0.05962262010271856,0.05263153288132015,0.04416390777299434,0.034392777052016085,0.023526988931147484,0.011807030010445595,-0.0004999967134257442,-0.013106138745335857,-0.02570898710078263,-0.03799855973928189,-0.04966452564529567,-0.06040360885843763,-0.0699270043039464,-0.07796763352247421,-0.08428706849279462,-0.08868195574505121,-0.09098978085123151,-0.09109382504126834,-0.08892718092846849,-0.08447571285442106,-0.07777986882055789,-0.06893527492942458,-0.05809206921936693,-0.04545295919545017,-0.03127001565003504,-0.015840243913447575,0.0004999981513004579,0.01738163892660421,0.0344104665610476,0.05117549186887743,0.06725793467404159,0.08224065035583895,0.09571779973862263,0.10730455590546896,0.11664663627926364,0.1234294475873677,0.1273866351949371,0.1283078367450191,0.1260454529686226,0.12052026571419104,0.11172575438709667,0.09973098668999142,0.08468198733600249,0.06680151871809546,0.04638723974713541,0.023808242557048796,-0.0004999991783552169,-0.0260422026827106,-0.05227126862330819,-0.07859756170011685,-0.10439931806693205,-0.1290339921507744,-0.15185033272407747,-0.17220095940620642,-0.1894551965684494,-0.2030119122415731,-0.2123121053306151,-0.2168509853762307,-0.21618929530524725,-0.2099636390140855,-0.19789559204640889,-0.17979939477273835,-0.15558805296510078,-0.1252777000001067,-0.0889901075505834,-0.046953266897194146,0.0004999997945887241,0.052935400477926546,0.1098224699283309,0.17054172711652502,0.23439358093258905,0.30060883659125076,0.36836062236504513,0.4367775269616815,0.5049577125022463,0.5719837472068464,0.6369378860023601,0.6989175166812505,0.7570504842010011,0.8105100063474131,0.8585289003020907,0.900412851548317,0.9355524737985185,0.9634339308982586,0.9836479185198092,0.9958968343713442,1.0,0.9958968343713442,0.9836479185198092,0.9634339308982586,0.9355524737985185,0.900412851548317,0.8585289003020907,0.8105100063474131,0.7570504842010011,0.6989175166812505,0.6369378860023601,0.5719837472068464,0.5049577125022463,0.4367775269616815,0.36836062236504513,0.30060883659125076,0.23439358093258905,0.17054172711652502,0.1098224699283309,0.052935400477926546,0.0004999997945887241,-0.046953266897194146,-0.0889901075505834,-0.1252777000001067,-0.15558805296510078,-0.17979939477273835,-0.19789559204640889,-0.2099636390140855,-0.21618929530524725,-0.2168509853762307,-0.2123121053306151,-0.2030119122415731,-0.1894551965684494,-0.17220095940620642,-0.15185033272407747,-0.1290339921507744,-0.10439931806693205,-0.07859756170011685,-0.05227126862330819,-0.0260422026827106,-0.0004999991783552169,0.023808242557048796,0.04638723974713541,0.06680151871809546,0.08468198733600249,0.09973098668999142,0.11172575438709667,0.12052026571419104,0.1260454529686226,0.1283078367450191,0.1273866351949371,0.1234294475873677,0.11664663627926364,0.10730455590546896,0.09571779973862263,0.08224065035583895,0.06725793467404159,0.05117549186887743,0.0344104665610476,0.01738163892660421,0.0004999981513004579,-0.015840243913447575,-0.03127001565003504,-0.04545295919545017,-0.05809206921936693,-0.06893527492942458,-0.07777986882055789,-0.08447571285442106,-0.08892718092846849,-0.09109382504126834,-0.09098978085123151,-0.08868195574505121,-0.08428706849279462,-0.07796763352247421,-0.0699270043039464,-0.06040360885843763,-0.04966452564529567,-0.03799855973928189,-0.02570898710078263,-0.013106138745335857,-0.0004999967134257442,0.011807030010445595,0.023526988931147484,0.034392777052016085,0.04416390777299434,0.05263153288132015,0.05962262010271856,0.06500320784720393,0.06868068134314281,0.07060503777420397,0.07076913177280675,0.06920791613822018,0.06599671540832616,0.06124859141693846,0.0551108797452098,0.047760993603911533,0.03940160679616202,0.03025533970306005,0.02055908147188417,0.010558087605421663,0.000499994864733469,-0.00937110520379557,-0.018820396657069215,-0.027627742960354456,-0.03559264357197898,-0.042538635162671444,-0.04831704411740193,-0.05281001368478218,-0.055932747365152566,-0.05763492941910795,-0.057901303270916867,-0.056751408606241706,-0.05423849765455427,-0.05044767005173991,-0.04549328337019278,-0.039515712488908054,-0.03267754510405275,-0.025159312550910806,-0.017154864477134043,-0.008866502592579446,-0.000499992605226233,0.007740425514916414,0.015656910604921387,0.023062662928087254,0.029786229723793814,0.035675376635813556,0.040600439679584474,0.04445708596298059,0.047168426426974816,0.04868644004828253,0.04899268585018807,0.04809829629297826,0.046043262752153966,0.04289504043866155,0.03874651588525045,0.033713394656709875,0.027931079912776952,0.02155112357544523,0.014737340888804688,0.007661685923094698,0.0004999899349072574,-0.006572333619781862,-0.013384514226768273,-0.019774479462189867,-0.025592645387472197,-0.03070535499784223,-0.03499788707570154,-0.03837696906924548,-0.04077274032215785,-0.042140125802848705,-0.042459595079703864,-0.041737296306062384,-0.04000457005326665,-0.03731686260315953,-0.03375207243519965,-0.02940837678972897,-0.024401597056645626,-0.018862172060414205,-0.012931816860374167,-0.006759951276797449,-0.0004999868537807644,0.0056944367032340255,0.011673174455208277,0.017293169422147762,0.02242183110802162,0.0269401205777288,0.030745271273611756,0.03375308433137408,0.035899748085635654,0.037143143467409614,0.037463609790383184,0.03686415868545219,0.035370137351112864,0.0330283555186565,0.02990570327086984,0.02608729880143247,0.02167421608177798,0.01678085196368086,0.01153200027416424,0.0060597067783225746,0.0004999833618511663,-0.005010537669552639,-0.010337927703079418,-0.015354184264487215,-0.01994027501969843,-0.023988931670441,-0.027407128868067964,-0.030118191546738345,-0.03206348363128898,-0.033203641663975256,-0.033519328252961715,-0.03301149209331342,-0.031701133358597124,-0.029628585216403165,-0.026852333797550428,-0.02344740987169951,-0.019503395495178665,-0.015122097767925552,-0.01041494936313575,-0.005500201507258421,-0.0004999794591236295,0.004462726824327107,0.009267063289083565,0.013797231029453067,0.01794525422382682,0.021613531138895765,0.02471710845601142,0.027185626436596784,0.028964890906297284,0.030018037484782146,0.030326263682841043,0.029889115177902006,0.028724323500909723,0.026867203255982346,0.024369627586925395,0.02129861064849018,0.01773453509766169,0.013769070874739083,0.009502838605092542,0.005042876660268622,0.0004999751456039276,-0.004014057258478694,-0.008389126633342703,-0.012519520958176236,-0.01630644685707196,-0.019660375494870534,-0.02250314231701907,-0.024769751780945926,-0.026409845806358884,-0.0273888031865175,-0.027688446438060007,-0.027307342293871464,-0.02626069202230027,-0.024579817743191713,-0.02231126066493941,-0.019515516452917665,-0.016265441537321165,-0.012644371875125142,-0.00874400231728427,-0.004662080146458924,-0.0004999704212984408,0.0036398465970852944,0.0076562845047458234,0.011452105212472875,0.014936259535971766,0.018026057899468144,0.020649119713045,0.02274505577530648,0.024266844906126683,0.025181873754796753,0.025472617162239794,0.025136945372233994,0.024188053565816138,0.022654018410591694,0.02057699534870267,0.01801207897605098,0.015025856884812715,0.011694694561402047,0.008102795183753802,0.004340083300719416,0.0004999652862140198,-0.0033229779441487865,-0.007035309238976557,-0.010547007984849897,-0.013773642326682486,-0.016638388672805315,-0.01907385042888005,-0.0210236331485044,-0.02244363953422503,-0.023303054811625274,-0.023585000752886786,-0.023286844851593526,-0.02242015964433271,-0.021010335728581388,-0.019095860432197388,-0.01672728214438614,-0.013965887828077738,-0.010882128020591146,-0.007553829533469238,-0.004064240946168138,-0.0004999597403585432,0.0030512075413408474,0.0065023994595077815,0.009769815533596396,0.012774742459901284,0.015445441904884439,0.017718854799131892,0.019542081840961685,0.020873605650342932,0.021684226547443234,0.02195769110143211,0.02169100022536502,0.020894391493352135,0.019590998332757507,0.01781619660230772,0.015616656616311184,0.013049125734071241,0.010178973033506908,0.007078533177597518,0.003825291230864221,0.0004999537837400654,-0.002815545785387743,-0.006040058790253993,-0.009095200253482405,-0.011907247368846102,-0.014408911596615046,-0.016540941959918513,-0.018253521502547703,-0.019507424159823372,-0.020274905349463867,-0.02054030625648175,-0.02030035889874853,-0.019564186441956236,-0.018353000702765035,-0.016699506154456256,-0.014647026851347274,-0.012248379345277055,-0.009564520720248104,-0.006663006176108738,-0.003616295024378269,-0.0004999474163673963,0.002609243472602071,0.0056351377808999265,0.008504107630408701,0.011146822898354138,0.013499920917995685,0.015507520032454175,0.017122540982044753,0.01830780501559801,0.019036883255541804,0.019294678073157472,0.019077723889096176,0.018394201740041794,0.017263668974895407,0.015716512391245194,0.01379313982622832,0.011542931513181105,0.009022978255544349,0.006296638515645208,0.0034319507492050765,0.0004999406382499534,-0.002427134790205834,-0.005277562875973007,-0.007981927351863769,-0.010474793999178085,-0.012696289115624747,-0.014593532832559097,-0.016121893082504484,-0.01724603059531682,-0.01794071057576574,-0.018191362554092323,-0.017994376158632423,-0.01735712708081612,-0.01629773412717272,-0.014844554818168681,-0.013035433339911882,-0.010916720628327143,-0.008542091822640277,-0.005971191135590831,-0.0032681382378879765,-0.0004999334493977613,0.0022651987038900872,0.004959486720135837,0.0075172690089661464,0.009876590028559139,0.011980696971165165,0.013779400937706705,0.01523027005054772,0.016299626238109367,0.016963322376947847,0.01720728197172487,0.017027789454111136,0.0164315253418428,0.01543534676709281,0.01406582010540616,0.012358518460985912,0.01035710244503576,0.00811220788424745,0.005680168691896224,0.0031216070153280927,0.0004999258498214523,-0.0021202584910250057,-0.004674705383281189,-0.007101121390555302,-0.009340675894370185,-0.01133942406496496,-0.013049602836854107,-0.01443076883642403,-0.015450751233894125,-0.016086397156987883,-0.016324092491425985,-0.016160046474455167,-0.015600334323726319,-0.014660698091045404,-0.013366111842978676,-0.011750123003712042,-0.009853987110754086,-0.007725618200310448,-0.005418381437338485,-0.0029897583307750167,-0.0004999178395322659,0.0019897711891188065,0.004418249548285629,0.006726262111548684,0.008857800681197014,0.010761460183788627,0.012391675444855458,0.013709808857247924,0.014685063051126261,0.015295197081771052,0.015527029563466578,0.015376717471201845,0.014849804875587623,0.013961041533492402,0.012733976888613273,0.011200340504971734,0.009399225129245892,0.007376093329870268,0.005181632877782936,0.00287048961502302,0.0004999094185420486,-0.0018716770589677124,-0.004186091948690948,-0.00638683472261581,-0.00842045892941534,-0.010237867625189771,-0.011795496162110052,-0.013056353901713934,-0.01399090000536382,-0.014577732631325226,-0.014804075531180369,-0.014666051071562288,-0.014168733985685347,-0.01332598555263255,-0.012160073278409874,-0.010701086379985947,-0.008986162324739762,-0.007058544233101008,-0.0049664930020716334,-0.0027620814550023795,-0.0004999005868632548,0.0017642900102140923,0.003974934235069368,0.006078040372536607,0.008022497514517292,0.00976131546474939,0.011252758102018584,0.012461342919452703,0.013358682855896302,0.013924150503129907,0.014145349210283263,0.014018380403549201,0.013547901476296881,0.012746973757611902,0.011636705209578624,0.010245697509493373,0.008609311920774534,0.0067687727305811955,0.00477013092766235,0.0026631141174971538,0.0004998913445089461,-0.0016662165495358848,-0.0037820492007743915,-0.005795909385283268,-0.007658824195577588,-0.00932573401241398,-0.01075658045299994,-0.01191726707436337,-0.012780469839135626,-0.013326278128651059,-0.013542651320281375,-0.01342568052680455,-0.012979649911765305,-0.012216896927351098,-0.011157475749066484,-0.009828632983852033,-0.00826410928824345,-0.006503284740106256,-0.004590189559913259,-0.0025724049855013645,-0.0004998816914927914,0.0015762949496619493,0.0036051622875877326,0.005537129588137686,0.0073251884244305825,0.008926054764172664,0.010301215047417406,0.01141785101478432,0.012249621120025238,0.012777279964959283,0.012989121238799589,0.012881234026972468,0.012457566967998242,0.011729799466980577,0.010717023904460795,0.009445247394025387,0.007946726028588931,0.006259148607228472,0.004424690453950987,0.0024889610399411273,0.0004998716278289244,-0.0014935489886831372,-0.003442361416709588,-0.0052989155953275845,-0.007018014343138497,-0.008558012147395192,-0.00988182251890185,-0.010957809582676706,-0.011760542506896118,-0.01227139481779388,-0.012478974519597449,-0.012379375139769267,-0.011976242246615457,-0.011280654529437162,-0.010310823079117648,-0.009091616947969672,-0.007653927293463686,-0.006033886318456931,-0.004271960716259689,-0.0024119423282804933,-0.0004998611535325186,0.0014171523444164776,0.0032920275482569024,0.0050789080839449925,0.006734272026314245,0.008217990581521268,0.00949429952644526,0.010532659921096364,0.011308487412946367,0.011803732751077144,0.012007299840468286,0.01191529170012241,0.011531078943048102,0.010865189766344709,0.009935024818272702,0.008764404588953112,0.007382961047751267,0.005825389024356908,0.004130576210748532,0.002340633566277561,0.0004998502686189164,-0.001346400886507567,-0.003152780615042457,-0.00487509532933025,-0.006471377125873054,-0.007902905213460468,-0.009135143951220975,-0.010138574801233098,-0.010889402183820174,-0.011370116387791783,-0.01156990025341489,-0.011484870223983422,-0.011118146456355518,-0.010479750890638568,-0.009586336400759704,-0.00846075427748175,-0.007131471232654131,-0.005631850762340595,-0.003999316978568101,-0.002274421835964055,-0.0004998389731042158,0.0012806908953553464,0.003023437000742889,0.0046857514647080855,0.006227111867964588,0.007610107983526702,0.008801348673583398,0.00977226699134646,0.010499804102458802,0.01096695567991756,0.011163167855840832,0.011084573547377905,0.01073406392005948,0.010121193812462388,0.009261924021310554,0.008178207336127728,0.0068974290198050275,0.005451715963279508,0.0038771319133282475,0.0022127789058054284,0.0004998272670051219,-0.0012195017797111186,-0.0029029757854541617,-0.004509387448960357,-0.005999562283412168,-0.007337312959898937,-0.0084903171022179,-0.009430897264079186,-0.010136684290920787,-0.010591148192132959,-0.010783983952346933,-0.01071134331031862,-0.010375907341593256,-0.0097867986025394,-0.008959335531986636,-0.007914635665988832,-0.006679077906832461,-0.005283637509551593,-0.003763110524900982,-0.0021552470927320567,-0.0004998151503389469,0.0011623822450053728,0.002790511719708866,0.0043447117920560625,0.00578706790892566,0.007082536482775649,0.008199795430191765,0.00911200059013373,0.009797429776316572,0.01023999903404854,0.010429638856830072,0.010362521592814119,0.010041134949701522,0.009474200297950855,0.008676438283004689,0.007668187994082764,0.00647488950859523,0.005126442950356316,0.0036564601859800858,0.0021014278649721407,0.0004998026231236104,-0.0011089391344622614,-0.0026852734125083896,-0.004190598845406027,-0.005588181161158136,-0.006844048800851644,-0.007927817877065648,-0.00881342645756093,-0.009479760448602735,-0.009911156067689896,-0.010097766970372691,-0.010035787453696708,-0.009727526716384924,-0.009181332825301973,-0.008411368728706002,-0.007437246278714156,-0.006283527689693456,-0.004979107081491587,-0.0035564876582846873,-0.00205097258519768,-0.0004997896853776387,0.0010588283592409028,0.0025865855963589407,0.004046063010037322,0.0054016342808136195,0.006620334705659712,0.007672662102749089,0.008533290260114216,0.009181677692858837,0.009602557095107062,0.009786293844752715,0.009729105167362266,0.009433135009774935,0.008906383228972753,0.008162491280137086,0.007220390101644551,0.0061038192581056505,0.004840729533390602,0.003462583987844246,0.0020035749392887845,0.0004997763371201655,-0.0010117474751470943,-0.0024938546071045717,-0.003910237612970433,-0.005226312250712162,-0.006410061269489353,-0.007432812654895259,-0.008269933431326915,-0.008901422249298773,-0.009312386519058333,-0.009493392727115867,-0.009440681717724978,-0.009156244058995261,-0.00864775406075006,-0.00792836448357954,-0.00701636739054331,-0.005934729861138727,-0.0047105163317371,-0.003374212073684432,-0.0019589647031661435,-0.0004997625783709313,0.0009674295674134457,0.0024065564186282855,0.0037823574949215487,0.005061230465070703,0.006212051235057717,0.0072069308103380825,0.00802189054207004,0.008637439423280494,0.009039039551906143,0.009217448662096237,0.009168931673829792,0.008895336448238294,0.008404032282078013,0.007707713047173838,0.006824070196554876,0.005775344037248705,0.004587764632723605,0.0032908963737016744,0.0019169025796951778,0.0004997484091502838,-0.0009256381823074528,-0.0023242267229033843,-0.0036617445702319786,-0.00490551620515694,-0.006025260934597521,-0.006993829542630063,-0.007787861982682491,-0.008388350191923908,-0.008781092482245416,-0.008957028661184158,-0.008912447993631547,-0.008649065257907065,-0.008173963400150804,-0.007499404568950085,-0.006642514537169457,-0.005624848611131677,-0.004471850013078171,-0.00321221433100436,-0.0018771758973029884,-0.0004997338294791775,0.0008861631022999444,0.002246452658789748,0.003547795783489767,0.004758393185276712,0.005848761863716986,0.0067924526271774775,0.007566691154240954,0.008152927073374361,0.008537277835914221,0.008710856775759574,0.008669977620587218,0.008416230772783183,0.00795642983820608,0.007302430069540686,0.006470823530053587,0.00548251879613691,0.0043622158295575945,0.0031377891943448924,0.0018395950070607538,0.0004997188393791741,-0.000848816805416778,-0.002172865878491089,-0.00343997301124608,-0.0046191685913440795,-0.005681725223228556,-0.006601857107479762,-0.0073573453238827856,-0.007930073867307213,-0.00830646351654873,-0.008477793158440083,-0.008440400979594465,-0.008195760906976714,-0.007750432752783476,-0.0071158876231350015,-0.006308213207596361,-0.005347706502646116,-0.004258364265178828,-0.003067283975158818,-0.0018039902493973679,-0.000499703438872442,0.0008134314829056422,0.0021031367059087002,0.0033377945519282148,0.004487222155278088,0.005523408885788824,0.006421198508172137,0.0071588994753847635,0.007718808560978605,0.008087635201188133,0.008256816387595532,0.008222714664223712,0.007986694671629482,0.007555076673659634,0.006938968526270473,0.00615398052791303,0.005219830454435312,0.004159848758271796,0.0030003963366801744,0.001770209388071569,0.0004996876279817562,-0.0007798565151358726,-0.002036969191411513,-0.0032408279199805166,-0.004361996901685738,-0.005373146354899208,-0.006249718305618962,-0.006970522622169472,-0.007518248838415677,-0.007879881413354087,-0.008047008476746451,-0.008016016750413116,-0.007788168147512269,-0.007369556468131376,-0.0067709455569826904,-0.006007493195508426,-0.005098367795032375,-0.00406626757144897,-0.002936854251610923,-0.001738115429529981,-0.0004996714067304989,0.0007479563256406181,0.001974096906540806,0.003148683716845993,0.004242991275637051,0.005230337369769898,0.006086733263927448,0.006791466155552376,0.007327599741707257,0.007682380810259297,0.007847542104792373,0.007819494283229648,0.007599402530636992,0.0071931462293892065,0.006611162964793749,0.005868180980738414,0.00498284692843379,0.003977258305157144,0.0028764122968070907,0.0017075847617731318,0.0004996547751426591,-0.0007176085488191038,-0.0019142793526266359,-0.0030610103956079625,-0.00412975241688066,-0.005094439876749037,-0.005931626320208761,-0.006621053883690652,-0.0071461431205133005,-0.00749439131022715,-0.007657669692472181,-0.007632412570596073,-0.007419693902059468,-0.00702518976560601,-0.006459027900989132,-0.005735528286773773,-0.004872841387469698,-0.0038924931978167655,-0.0028188484785587834,-0.0016785055594146566,-0.0004996377332428323,0.0006887024590844695,0.0018572988812404086,0.002977489770878448,0.004021870390332069,0.004964963140903979,0.005783838762709905,0.00645867348177893,0.00697322857456826,0.007315240756871837,0.007476714020971239,0.007454105986715664,0.0072484044385550265,0.00686509242701998,0.006314003053072047,0.005609067759797775,0.00476796456174382,0.0038116750840514395,0.002763961501886978,0.0016507764115494547,0.0004996202810562207,-0.000661137618945707,-0.0018029580433547453,-0.0028978331530358048,-0.003918973217882978,-0.004841461813221321,-0.005642863492807218,-0.00630376912560896,-0.0068082656483729465,-0.007144318872459579,-0.007304060144513753,-0.007283970042533686,-0.007084954832834188,-0.006712314056442612,-0.006175600290505054,-0.0054883747755184375,-0.004667865147774014,-0.0037345339059533106,-0.0027115684130571555,-0.0016243051369436027,-0.0004996024186086334,0.0006348227112328063,0.001751077299161873,0.0028217780078207697,0.0038207225846256412,0.004723530802254397,0.005508239199596709,0.006155835121716455,0.006650717080657745,0.006981070297430318,0.007139148393392101,0.007121454524150196,0.006928817733460248,0.006566362887066885,0.006043375163372362,0.005373062664920417,0.004572223208487779,0.00366082369106865,0.002661502557124518,0.0015990077573746666,0.0004995841459264859,-0.0006096745268524057,-0.0017014930325724936,-0.0027490850598400076,-0.003726810115047434,-0.004610800825773317,-0.005379545306061812,-0.006014410380286908,-0.006500092945987263,-0.006824988548794429,-0.006981468299673631,-0.00696605753506431,-0.006779512047935621,-0.006426790242315971,-0.005916922123318421,-0.005262778566147284,-0.004480746748942261,-0.0035903199258494715,-0.0026136118024667624,-0.001574807605029865,-0.0004995654630368001,0.0005856170844319539,0.0016540558241312868,0.002679535772645588,0.0036369541328365278,0.004502934539498232,0.0052563975701654195,0.005879073603542854,0.0063559455539161066,0.0066756107589302964,0.006830553306687212,0.006817320306335428,0.00663659797929637,0.006293185917383429,0.00579587035849868,0.0051571998087626405,0.004393168731053918,0.003522817265481432,0.002567756992455373,0.0015516345439747503,0.0004995463699672048,-0.0005625808622302939,-0.0016086289439431784,-0.002612930149483023,-0.00355089683257666,-0.004399623157422036,-0.00513844424394292,-0.005749439083839183,-0.006217864993821124,-0.006532513079655107,-0.006685976146785181,-0.006674822661613705,-0.006499672688346078,-0.006165174142321336,-0.0056798801524359024,-0.005056030752344932,-0.004309244463048439,-0.003458127530881927,-0.002523810591072749,-0.0015294242890396418,-0.0004995268667459349,0.000540502125959515,0.0015650870325921698,0.0025490848080893997,0.003468401803513102,0.004300583492403815,0.005025362709726539,0.005625153023194407,0.006085475232027197,0.006395306655450966,0.006547344790928543,0.006538179042619891,0.006368366491416408,0.006042410043000381,0.005568639691477361,0.004959000014178264,0.004228749309879922,0.003396077951716217,0.002481655494709924,0.0015081178081936151,0.0004995069534018319,-0.0005193223388304313,-0.0015233149432513535,-0.002487831290511065,-0.003389251855298386,-0.004205555357299137,-0.004916856525754135,-0.005505890300295326,-0.0059584306829663135,-0.006263634085278337,-0.006414298889231547,-0.006407035015899065,-0.006242339518075985,-0.005924576529748495,-0.0054618622576696665,-0.004865858031292078,-0.004151476679503171,-0.003336509620886159,-0.0024411839868356293,-0.0014876607967040138,-0.0004994866299642018,0.00049898764232188,0.0014832067224623852,0.002429014575136549,0.003313247103609064,0.004114299276403143,0.004812652824190476,0.005391351622764299,0.005836413188532,0.0061371663051847155,0.0062865066344118545,0.006281064194202998,0.006121278765158374,0.0058113815545614185,0.005359283753837758,0.004776374910732589,0.004077236246987845,0.003279276131380149,0.002402296815886421,0.0014680032132216182,0.0004994658964633853,-0.0004794483979762931,-0.0014446647105886001,-0.0023724917632710714,-0.0032402032801042424,-0.004026594464822248,-0.004712500013473497,-0.00528126101217035,-0.005719129350038298,-0.006015599834457481,-0.006163661990663994,-0.006159965516198533,-0.006004895493344948,-0.005702555686933521,-0.005260660515888773,-0.004690338529078103,-0.004005852384333669,-0.003224242370864638,-0.0023649023797592404,-0.0014490988694453005,-0.0004994447529298979,0.00046065878201354227,0.0014075987458627799,0.002318130916824251,0.0031699502366417673,0.0039422370398797205,0.004616165744253739,0.005175363577291166,0.0056063081656796115,0.00589865433680216,0.006045482239232985,0.00604346083677062,0.005892922920715492,0.005597849965947223,0.0051657673741894745,0.004607552848123224,0.003937162768715742,0.0031712834531242825,0.002328916002800086,0.0014309050662837338,0.0004994231993950062,-0.0004425764257956385,-0.0013719254583731547,-0.002265810027208975,-0.0031023306181918254,-0.003861038434053021,-0.0045234351043086955,-0.005073423537804843,-0.005497698933444512,-0.0057860704552892585,-0.005931705799250733,-0.005931292787319428,-0.005785114174483438,-0.005497033992576092,-0.005074395931549558,-0.0045278364185797,-0.0038710171459441123,-0.0031202837685617006,-0.002294259293276324,-0.001413382270481044,-0.0004994012358905829,0.00042516209620153196,0.001337567642349765,0.0022154160984898313,0.003037198682660485,0.0037828239834388124,0.004434109012914148,0.0049752224661573485,0.005393069385325811,0.00567760788587446,0.0058220902884803544,0.005823222871405137,0.005681240467815142,0.005399894231433152,0.004986353030091614,0.004451021047755252,0.0038072762293109965,0.003071136138562334,0.0022608595710706075,0.0013964938265517643,0.0004993788624491068,-0.0004083794108390892,-0.0013044536968056491,-0.0021668443302790726,-0.002974419248993278,-0.0037074316695068334,-0.0043480027894247505,-0.004880557720013452,-0.005292204023601741,-0.0055730436593746996,-0.0057164107937097515,-0.005719029766083681,-0.0055810894733952805,-0.005306232495619118,-0.0049014593832697444,-0.004376950610621241,-0.003745810716841524,-0.003023741060706416,-0.002228649356802987,-0.0013802056996074816,-0.0004993560791036628,0.00039219458374272734,0.0012725171260012716,0.002119997387946734,0.0029138667575810077,0.0036347109950666994,0.00426494487440376,0.004789241041616164,0.005194902634108511,0.005472170606050852,0.0056144583248202125,0.005618507803472118,0.005484463869405808,0.005215864592045647,0.004819548352648121,0.004305479986582424,0.0036865004123560227,0.0029780060336419465,0.002197565914824165,0.0013644862452781303,0.0004993328858879418,-0.0003765761978162575,-0.001241696092400159,-0.0020747847494479673,-0.002855424429223849,-0.003564521978037302,-0.0041847756846658795,-0.0047010973036822395,-0.005100978954919898,-0.005374795980547332,-0.005516038430169592,-0.0055214656106216805,-0.005391180036965443,-0.005128619107748382,-0.004740464851877603,-0.00423647410671219,-0.003629233437771507,-0.002933844951979487,-0.002167550843566953,-0.001349306003455068,-0.0004993092828362403,0.0003614950007958476,0.001211933015790789,0.0020311221195462256,0.0027989835108012304,0.003496734248862375,0.0041073465861544605,0.004615963384254445,0.005010259481806343,0.005280740227984156,0.0054209699539874675,0.005427724888771913,0.005301066890937123,0.0050443363203623295,0.004664064362702018,0.004169807098291436,0.003573905525780575,0.0028911775628799184,0.002138549707627634,0.001334637513027222,0.0004992852699834612,-0.0003469237219449453,-0.0011831742131067637,-0.00198893090345579,-0.0027444425973930627,-0.003431226239326559,-0.004032518970743513,-0.004533687155300853,-0.0049225823943547355,-0.005189835874581361,-0.005329083919074996,-0.005337119315601866,-0.005213964828439405,-0.004962867218188989,-0.004590212049858264,-0.004105361515251484,-0.0035204193834989695,-0.0028499289771196233,-0.002110511706700611,-0.0013204551451590709,-0.0004992608473651126,0.00033283690706444556,0.001155369574205037,0.0019481377329887916,0.0026917070219641434,0.0033678844521541663,0.003960163424899833,0.004454126571867653,0.004837796588765052,0.005101926528395135,0.005240222520311385,0.00524949355625904,0.0051297247814656565,0.004884072617206557,0.004518781963465712,0.004043027644622638,0.0034686841189110838,0.002810029228366162,0.002083389377130332,0.0013067349529809705,0.0004992360150173086,-0.0003192107697180752,-0.0011284722694826124,-0.0019086740391963822,-0.0026406883048833213,-0.003306602802156573,-0.0038901589797166376,-0.004377148850312425,-0.00475576080516197,-0.005016865977622425,-0.005154238216354864,-0.0051647023707949305,-0.005048207361780579,-0.004807822364015872,-0.004449656318979023,-0.003982702880372353,-0.003418614723000364,-0.0027714128752081325,-0.0020571383223919448,-0.0012934545358373121,-0.0004992107729767691,0.0003060230568437195,0.001102438485742836,0.0018704756662674044,0.002591303656543708,0.0032472820208839064,0.0038223924331743596,0.004302629725616512,0.0046763428388188755,0.004934517375537622,0.005070992908540356,0.005082609807218276,0.004969282087775558,0.004733994615120348,0.0043827248460450085,0.003924291157115461,0.0033701316013577025,0.002734018641177403,0.0020317169692812696,0.0012805929164737,0.0004991851212808195,-0.0002932529271535201,-0.0010772271871774145,-0.0018334825221112672,-0.0025434755272024895,-0.0031898291177523837,-0.0037567577366424847,-0.004230452779039355,-0.004599418826029224,-0.004854752502503775,-0.004990357197361619,-0.00500308847073524,-0.004892826684262159,-0.0046624751841449616,-0.00431788419869166,-0.0038677024371222344,-0.0033231601498391965,-0.0026977890885985433,-0.002007086346997732,-0.001268130429746832,-0.0004991590599673905,0.0002808808409249539,0.0010527998987214108,0.0017976382616219783,0.002497131198891782,0.0031341568914942967,0.00369315543862843,0.004160508828461759,0.0045248725965120525,0.004777451096687194,0.0049122097081178645,0.004926018860914603,0.004818726447300286,0.0045931569496381495,0.00425503742021364,0.003812852244862413,0.0032776303695147735,0.0026626703226140984,0.0019832098866509633,0.0012560486216152238,0.0004991325890751277,-0.0002688884599578775,-0.001029120509375415,-0.001762889999112639,-0.0024522024148836115,-0.003080183486532642,-0.00363149217963671,-0.004092695374704395,-0.004452595085229361,-0.004702500246127501,-0.004836436478333121,-0.004851288769524329,-0.004746873667121443,-0.004525939316996899,-0.004194093456927031,-0.0037596612440242093,-0.0032334765167283713,-0.00262861172217786,-0.00196005323902232,-0.0012443301573194486,-0.0004991057086428458,0.000257258556617783,0.0010061550933810979,0.0017291880468313775,0.002408625042738683,0.0030278319895318258,0.0035716802327426353,0.004026916097914493,0.004382483797353004,0.004629793835699608,0.0047629304004462095,0.004778792732657876,0.004677167103040538,0.004460727728830894,0.004134966715663405,0.003708054852554489,0.0031906367845885584,0.0025955656951928766,0.001937584108669108,0.0012329587377918046,0.0004990784187105133,-0.0002459749310211105,-0.0009838717473853724,-0.0016964856768440163,-0.002366338767438618,-0.0029770300619459526,-0.0035136370851241356,-0.003963080398819343,-0.004314442320859904,-0.004559232043271503,-0.004691590714039125,-0.004708431531524252,-0.0046095115049737305,-0.004397433218752754,-0.004077576660482938,-0.003657962891790274,-0.003149053012647872,-0.0025634874553012907,-0.0019157721026907203,-0.001221919023445403,-0.0004990507193186902,0.00023502233551934661,0.0009622404419539777,0.001664738903877841,0.0023252868115176983,0.002927709604868079,0.003457285056356873,0.0039011029802484038,0.004248379881883172,0.004490720880025752,0.004622322542542066,0.00464011173693275,0.004543817176805342,0.004335972004167912,0.004021847444607473,0.0036093192662131927,0.0031086704218984186,0.002532334818128306,0.0018945885926617018,0.0012111965645976927,0.0004990226105079152,-0.0002243864057470228,-0.0009412328859753212,-0.001633906287010624,-0.002285415679457893,-0.0028798064529203336,-0.0034025509497552704,-0.0038409034648629265,-0.004184210938504212,-0.004424171770494853,-0.004555036469934834,-0.004573745293074292,-0.004479999577396246,-0.004276265114142462,-0.003967707574039605,-0.0035620616707499387,-0.0030694373725496556,-0.0025020680150257975,-0.0018740065884190315,-0.0012007777378588993,-0.0004989940923201636,0.0002140535975756675,0.0009208224026722554,0.001603948748318357,0.0022466749239332625,0.002833260094286147,0.003349365733473225,0.003782406045486839,0.004121854809166118,0.004359501168362803,0.004489648153473979,0.0045092491367007045,0.004417978955500211,0.004218238048875759,0.003915089599727332,0.003516131322897338,0.0030313051423310907,0.00247264952259193,0.001854000622527379,0.0011906496879029755,0.0004989651647971963,-0.0002040111293898457,-0.0009009838160769917,-0.0015748294068192038,-0.002209016931750107,-0.00278801341432119,-0.0032976642484385324,-0.003725539164843909,-0.004061235332311548,-0.00429663020453047,-0.004426077968918025,-0.004446544848238485,-0.004357680015274515,-0.00416182046768777,-0.0038639298354905707,-0.0034714727172461034,-0.0029942277233235655,-0.002444043906424473,-0.0018345466443885374,-0.00118080027409129,-0.0004989358279821871,0.00019424692917314562,0.0008816933469513917,0.0015465134262239314,0.0021723967275787473,0.0027440124604536926,0.0032473849405272276,0.0036702352218526595,0.004002280554228679,0.004235484364325886,0.004364250685113706,0.004385558331756163,0.004299031609433661,0.0041069459027759676,0.0038141680992259076,0.003428033400252026,0.0029581616355329,0.0024162176777453677,0.001815621923063279,0.001171218021489431,0.0004989060819181181,-0.0001847495859371765,-0.0008629285172529031,-0.0015189678751761518,-0.002136771793770344,-0.0027012062263444907,-0.0031984696146588124,-0.0036164303019479366,-0.003944922442412582,-0.0041759931910834505,-0.0043040951651462525,-0.004326219521038878,-0.004241966457418358,-0.004053551496290331,-0.003765747475181695,-0.0033857637633289235,-0.0029230657556224377,-0.0023891391616713644,-0.0017972049579859917,-0.001161892075855331,-0.0004988759266493618,0.00017550830508916387,0.0008446680623330474,0.0014921615988015187,0.0021021019047454403,0.002659546453486447,0.0031508632087512657,0.0035640639291636806,0.00388909662204386,0.0041180900136112,0.004245544091558453,0.00426846210931905,0.004186420886231281,0.004001577758542031,0.003718614095326008,0.003344616852551425,0.0028889011593813633,0.002362778376046668,0.001779275396828912,0.001152812162233677,0.0004988453622201207,-0.00016651286736473167,-0.0008268918501536366,-0.0014660651005107062,-0.002068348974596193,-0.002618987448624658,-0.003104513585685571,-0.0035130788379586146,-0.003834742133435919,-0.004061711695331435,-0.0041885337134062684,-0.004212223300471078,-0.004132334591842,-0.003950968345388164,-0.003672716938044913,-0.003304548193428921,-0.0028556309766647717,-0.0023371069198578395,-0.0017618139598620337,-0.0011439685468184455,-0.0004988143886759659,0.00015775359100368895,0.000809580806869352,0.001440650433117972,0.0020354769166868003,0.0025794859155436026,0.003059371341631531,0.0034634207629714703,0.003781801208532114,0.0040067984031086894,0.004133003613153557,0.004157443579707545,0.004079650419280244,0.0039016698530433777,0.0036280076425864788,0.003265515629379815,0.0028232202576643542,0.0023120978703630836,0.0017448023702120214,0.0011353520017919668,0.0004987830060623196,-0.00014922129686829603,-0.0007927168482044509,-0.0014158910984247287,-0.002003451514168219,-0.0025410007999179213,-0.003015389629249405,-0.003415038245086422,-0.0037302190647274754,-0.003953293393987211,-0.004078896491613337,-0.00410406650201642,-0.004028314159732833,-0.003853631628745344,-0.0035844403378348733,-0.003227479172668968,-0.0027916358494945565,-0.002287725688147475,-0.0017282232894953666,-0.0011269537728676021,-0.000498751214425952,0.0001409072762459341,0.0007762828160985754,0.0013917619545153609,0.001972240300425282,0.002503493146061756,0.002972523994440541,0.003367882452348414,0.0036799437144705953,0.0039011428182383874,0.004026157969326973,0.004052038496758475,0.00397827436312883,0.0038068055958650603,0.0035419714841371133,0.00319040086670408,0.0027608462821736048,0.002263966129405304,0.001712060258343741,0.0011187655493018677,0.0004987190138135041,-0.00013280326109271938,-0.0007602624201610082,-0.001368239130077827,-0.0019418124485833497,-0.002466925964521319,-0.002930732225449789,-0.0033219070144208536,-0.0036309257892521546,-0.003850295537282631,-0.003974736402933296,-0.004001308687002701,-0.003929482164852002,-0.00376114609219053,-0.0035005597270388582,-0.003154244658690453,-0.002730821663179478,-0.0022407961648112304,-0.0016962976413981126,-0.0011107794361543178,-0.000498686404272945,0.0001249013965102919,0.0007446401835075916,0.0013452999451408507,0.0019121386692788332,0.0024312641095693027,0.0028899742132417537,0.0032770678694049025,0.0035831183767293805,0.0038007029551900286,0.003924582715224827,0.003951828722319142,0.003881891125352535,0.003716609720242386,0.0034601657618934943,0.0031189762817496777,0.0027015335798338228,0.0022181939044144776,0.0016809205763798618,0.0011029879286062277,0.0004986533858521337,-0.00011719421525729847,-0.000729401392607532,-0.0013229228376689499,-0.0018831911159860532,-0.002396474165743659,-0.002850211822183158,-0.0032333231219556875,-0.003536476869856068,-0.003752318862593936,-0.0038756502377148556,-0.0039035526238738205,-0.003835457081552563,-0.0036731552085880258,-0.0034207522084155942,-0.0030845631456884472,-0.0026729550088480064,-0.0021961385280363276,-0.0016659149268954672,-0.001095383888156867,-0.0004986199586002391,0.00010967461412752293,0.0007145320507927611,0.0013010872955213537,0.0018549432972521389,0.0023625243426653605,0.002811408770151105,0.0031906329117375796,0.0034909588269975552,0.0037050992919631983,0.0038278945646545333,0.0038564366407827476,0.0037901380090449408,0.003630743283224622,0.003382283494334375,0.003050974235689144,0.0026450602324217917,0.0021746102207105132,0.001651267238654529,0.0010879605205442054,0.0004985861225663366,-0.00010233583203185616,-0.0007000188351267093,-0.001279773793318108,-0.0018273699952635265,-0.002329384377434712,-0.0027735305172788627,-0.0031489592913472677,-0.003446523842110451,-0.003659002383279734,-0.0037812734175394326,-0.0038104391167815476,-0.003745893894182583,-0.003589336548186579,-0.003344725747388711,-0.0030181800182567525,-0.0026178247603512532,-0.002153590112741015,-0.0016369646988212603,-0.001080711355241041,-0.0004985518778007949,9.517142964761325e-5,0.0006858490563475613,0.0012589637338102466,0.0018004471902129562,0.0022970254439807916,0.002736544162618248,0.003108266112921947,0.0034031334241501426,0.003613988259260146,0.0037357465192371557,0.0037655203663567944,0.0037026866152389693,0.0035488993746164476,0.00330804669497175,0.0029861523538260355,0.002591225257645969,0.002133060224000768,0.0016229950982362409,0.0010736302264018885,0.000498517224353906,-8.817527050085159e-5,-0.0006720106216383503,-0.0012386393933787395,-0.0017741519899950786,-0.002265420068788891,-0.0027004183480726107,-0.0030685189227173115,-0.0033607508849519876,-0.0035700189093381,-0.003691275476948093,-0.0037216425595647646,-0.0036604798318989884,-0.003509397797605817,-0.003272215570802842,-0.002954864415482041,-0.002565239477209873,-0.0021130034121211038,-0.0016093467962793224,-0.001066711255137382,-0.0004984821622772376,8.134150337040277e-5,0.0006584919999888736,0.0012187838713316977,0.0017484625647933205,0.002234542052492471,0.0026651231690070472,0.003029684863012243,0.0033193412348973984,0.003527058081699554,0.003647823673284301,0.0036787696148350255,0.0036192388824060036,0.00347079942018024,0.003237203028056906,0.0029242906133038495,0.0025398461971736074,0.0020934033242626738,0.0015960086881562086,0.0010599488330143533,0.0004984466916222977,-7.466454590211034e-5,-0.0006452821899462679,-0.001199381042689853,-0.0017233580861699474,-0.002204366396855014,-0.002630630091004051,-0.0029917325807501194,-0.0032788710857435607,-0.0034850711827247886,-0.00360535616481757,-0.0036368670991204738,-0.0035789306877536333,-0.003433073323855914,-0.003202981058438294,-0.002894406523879812,-0.0025150251625112746,-0.0020742443521781905,-0.0015829701744203663,-0.0010533376066790532,-0.0004984108124418531,6.813906934222675e-5,0.0006323706895593717,0.0011804155141881586,0.0016988186702973905,0.0021748692367183297,0.00259691187227384,0.0029546321423858986,0.003239308560047316,0.0034440251832525124,0.0035638395875052563,0.0035959021348129865,0.0035395236623659747,0.003396189985250863,0.003169522916727579,0.002865188824589519,0.002490757030600152,0.002055511590311878,0.001570221132549645,0.0010468724635200573,0.0004983745247886269,-6.175998429688796e-5,-0.0006197474683495501,-0.001161872583236179,-0.0016748253250103383,-0.0021460277765237355,-0.0025639424912796407,-0.0029183549544499247,-0.003200623206669064,-0.003403888531130716,-0.003523242068456614,-0.003555843312895935,-0.003500987630758621,-0.0033601211982765395,-0.0031368030503765147,-0.002836615232277634,-0.002467023320419674,-0.002037190796694864,-0.001557751890422174,-0.001040548518285073,-0.0004983378287165857,5.552242744295473e-5,0.0006074029411455721,0.001143738199612283,0.0016513599003776449,0.0021178202310554437,0.0025316970791701855,0.0028828736893883916,0.003162785921883737,0.003364631069569198,0.0034835331435485407,0.0035166606118513114,0.0034632937497192768,0.0033248400014794723,0.0031047970337596863,0.0028086644459837766,0.0024438063651054985,0.002019268356425221,0.0015455532015407746,0.0010343611005830435,0.0004983007242796662,-4.942174911208309e-5,-0.0005953279436442237,-0.0011259989296769795,-0.001628405042528276,-0.002090225770078284,-0.0025001518566542887,-0.0028481622162732953,-0.0031257688756715562,-0.003326223960848225,-0.0034446836804439013,-0.003478325321881563,-0.0034264144355852654,-0.0032903206101400993,-0.003073481506728138,-0.0027813160934166492,-0.0024210892676064023,-0.0020017312475315977,-0.001533616221877156,-0.0010283057431994059,-0.0004982632115330347,4.3453501686560485e-5,0.0005835137095606349,0.0011086419229187027,0.0016059441504799085,0.002063224466578198,0.002469284074977216,0.0028141955360155855,0.003089545442794039,0.003288639614979209,0.003406665806602925,0.003440809974044072,0.003390323296233511,0.003256538352768117,0.0030428341171408273,0.0027545506808907545,0.0023988558592064244,0.0019845670090447563,0.0015219324882094376,0.001022378171167947,0.0004982252905318412,-3.761342874095078e-5,-0.0005719518492535973,-0.001091654880652145,-0.0015839613357489504,-0.0020367972483311494,-0.0024390719606944716,-0.002780949720741039,-0.0030540901382987242,-0.0032518516229450554,-0.003369452841914527,-0.0034040882739307583,-0.003354995067429716,-0.0032234696116672655,-0.0030128334670749615,-0.0027283495464680823,-0.0023770906607018085,-0.0019677637111083822,-0.0015104938978460383,-0.0010165742915382609,-0.0004981869613324518,3.189745487887599e-5,0.0005606343297113969,0.001075026026713675,0.0015624413845310434,0.002010925852557115,0.002409494663957775,0.0027484018570227975,0.003019378557122128,0.0032158346941821626,0.0033330192356046673,0.0033681350395562424,0.003320405553214996,0.003191091767267006,0.0029834590624454606,0.002702694816065715,0.0023557788460340265,0.0019513099269824446,0.0014992926896293514,0.0010108901837920985,0.0004981482239912289,-2.6301676208954497e-5,-0.0005495534558027233,-0.0010587440800023894,-0.0015413697222672565,-0.0019855927834285998,-0.0023805322100585694,-0.0027165299926846776,-0.0029853873174923,-0.003180564597991611,-0.003297340507108926,-0.0033329261431463155,-0.0032865315700335456,-0.003159383145946983,-0.002954691265781971,-0.002677569362315304,-0.0023349062082004823,-0.0019351947067978814,-0.0014883214261299312,-0.001005322090856745,-0.0004981090785657377,2.0822351418051697e-5,0.0005387018526958475,0.0010427982287369107,0.0015207323804181968,0.0019607812722298736,0.0023521654539889717,0.002685313086918562,0.0029520940078529984,0.003146018108595766,0.00326239319062105,0.003298438456543866,0.0032533508943310163,0.0031283229710997546,0.002926511251937036,0.0026529567659724818,0.002314459127279241,0.0019194075529372137,0.0014775729769418826,0.0009998664106766566,0.0004980695251135532,-1.545589339407222e-5,-0.0005280724493664604,-0.001027178106299872,-0.0015005159652911758,-0.0019364752399723662,-0.0023243760378063583,-0.0026547309634748686,-0.002919477137058461,-0.003112172953577059,-0.0032281547830542373,-0.00326464979997276,-0.0032208422133739355,-0.0030978913172011774,-0.0028989009665132703,-0.002628841279696403,-0.002294424540413871,-0.0019039383969259704,-0.0014670405030020358,-0.0009945196882999979,-0.0004980295636934392,1.0198861363700948e-5,0.0005176584631119219,0.0010118737685612493,0.001480707628769972,0.0019126592622949528,0.002297146350598696,0.002624764266710047,0.002887516087604052,0.003079007765459827,0.0031946036951719567,0.003231538893921081,0.003188985079062221,0.0030680690666735405,0.0028718430868188084,0.0026052077940286423,0.002274789913622713,0.0018887775777249986,0.0014567174418617138,0.0009892786084450267,0.0004979891943641825,-5.047953504107395e-6,-0.0005074533850053559,-0.0009968756725717792,-0.0014612950408170098,-0.0018893185364843,-0.002270459490870487,-0.0025953944202871545,-0.002856191071681028,-0.0030465020362126353,-0.0031617192056659906,-0.0031990853139244606,-0.003157759864523715,-0.0030388378693467265,-0.002845320985171439,-0.002582041805419834,-0.0022555432153013566,-0.001873915821329042,-0.0014465974938411748,-0.0009841399885140729,-0.0004979484171856053,0.0],"x":[-100.0,-99.95002498750625,-99.9000499750125,-99.85007496251875,-99.80009995002499,-99.75012493753124,-99.70014992503748,-99.65017491254373,-99.60019990004997,-99.55022488755623,-99.50024987506247,-99.45027486256872,-99.40029985007496,-99.35032483758121,-99.30034982508745,-99.2503748125937,-99.20039980009994,-99.1504247876062,-99.10044977511244,-99.05047476261869,-99.00049975012493,-98.95052473763118,-98.90054972513744,-98.85057471264368,-98.80059970014993,-98.75062468765617,-98.70064967516242,-98.65067466266866,-98.60069965017492,-98.55072463768116,-98.50074962518741,-98.45077461269365,-98.4007996001999,-98.35082458770614,-98.3008495752124,-98.25087456271864,-98.20089955022489,-98.15092453773113,-98.10094952523738,-98.05097451274362,-98.00099950024988,-97.95102448775611,-97.90104947526237,-97.85107446276862,-97.80109945027486,-97.75112443778112,-97.70114942528735,-97.65117441279361,-97.60119940029985,-97.5512243878061,-97.50124937531234,-97.4512743628186,-97.40129935032483,-97.35132433783109,-97.30134932533733,-97.25137431284358,-97.20139930034982,-97.15142428785607,-97.10144927536231,-97.05147426286857,-97.0014992503748,-96.95152423788106,-96.90154922538731,-96.85157421289355,-96.8015992003998,-96.75162418790605,-96.7016491754123,-96.65167416291854,-96.60169915042479,-96.55172413793103,-96.50174912543729,-96.45177411294353,-96.40179910044978,-96.35182408795602,-96.30184907546227,-96.25187406296851,-96.20189905047476,-96.151924037981,-96.10194902548726,-96.0519740129935,-96.00199900049975,-95.95202398800599,-95.90204897551224,-95.8520739630185,-95.80209895052474,-95.75212393803099,-95.70214892553723,-95.65217391304348,-95.60219890054972,-95.55222388805598,-95.50224887556222,-95.45227386306847,-95.40229885057471,-95.35232383808096,-95.3023488255872,-95.25237381309346,-95.2023988005997,-95.15242378810595,-95.10244877561219,-95.05247376311844,-95.00249875062468,-94.95252373813094,-94.90254872563717,-94.85257371314343,-94.80259870064968,-94.75262368815592,-94.70264867566218,-94.65267366316841,-94.60269865067467,-94.55272363818091,-94.50274862568716,-94.4527736131934,-94.40279860069965,-94.3528235882059,-94.30284857571215,-94.25287356321839,-94.20289855072464,-94.15292353823088,-94.10294852573713,-94.05297351324337,-94.00299850074963,-93.95302348825587,-93.90304847576212,-93.85307346326836,-93.80309845077461,-93.75312343828087,-93.7031484257871,-93.65317341329336,-93.6031984007996,-93.55322338830585,-93.50324837581209,-93.45327336331835,-93.40329835082458,-93.35332333833084,-93.30334832583708,-93.25337331334333,-93.20339830084957,-93.15342328835582,-93.10344827586206,-93.05347326336832,-93.00349825087456,-92.95352323838081,-92.90354822588705,-92.8535732133933,-92.80359820089954,-92.7536231884058,-92.70364817591205,-92.65367316341829,-92.60369815092454,-92.55372313843078,-92.50374812593704,-92.45377311344328,-92.40379810094953,-92.35382308845577,-92.30384807596202,-92.25387306346826,-92.20389805097452,-92.15392303848076,-92.10394802598701,-92.05397301349325,-92.0039980009995,-91.95402298850574,-91.904047976012,-91.85407296351823,-91.80409795102449,-91.75412293853073,-91.70414792603698,-91.65417291354323,-91.60419790104947,-91.55422288855573,-91.50424787606197,-91.45427286356822,-91.40429785107446,-91.35432283858071,-91.30434782608695,-91.2543728135932,-91.20439780109945,-91.1544227886057,-91.10444777611194,-91.0544727636182,-91.00449775112443,-90.95452273863069,-90.90454772613693,-90.85457271364318,-90.80459770114942,-90.75462268865567,-90.70464767616193,-90.65467266366817,-90.60469765117442,-90.55472263868066,-90.50474762618691,-90.45477261369315,-90.4047976011994,-90.35482258870564,-90.3048475762119,-90.25487256371814,-90.20489755122439,-90.15492253873063,-90.10494752623688,-90.05497251374312,-90.00499750124938,-89.95502248875562,-89.90504747626187,-89.85507246376811,-89.80509745127436,-89.7551224387806,-89.70514742628686,-89.65517241379311,-89.60519740129935,-89.5552223888056,-89.50524737631184,-89.4552723638181,-89.40529735132434,-89.35532233883059,-89.30534732633683,-89.25537231384308,-89.20539730134932,-89.15542228885558,-89.10544727636182,-89.05547226386807,-89.00549725137431,-88.95552223888056,-88.9055472263868,-88.85557221389305,-88.8055972013993,-88.75562218890555,-88.70564717641179,-88.65567216391804,-88.6056971514243,-88.55572213893053,-88.50574712643679,-88.45577211394303,-88.40579710144928,-88.35582208895552,-88.30584707646177,-88.25587206396801,-88.20589705147427,-88.1559220389805,-88.10594702648676,-88.055972013993,-88.00599700149925,-87.95602198900549,-87.90604697651175,-87.85607196401799,-87.80609695152424,-87.75612193903048,-87.70614692653673,-87.65617191404297,-87.60619690154923,-87.55622188905548,-87.50624687656172,-87.45627186406797,-87.40629685157421,-87.35632183908046,-87.3063468265867,-87.25637181409296,-87.2063968015992,-87.15642178910545,-87.10644677661169,-87.05647176411794,-87.00649675162418,-86.95652173913044,-86.90654672663668,-86.85657171414293,-86.80659670164917,-86.75662168915542,-86.70664667666166,-86.65667166416792,-86.60669665167416,-86.55672163918041,-86.50674662668666,-86.4567716141929,-86.40679660169916,-86.3568215892054,-86.30684657671165,-86.25687156421789,-86.20689655172414,-86.15692153923038,-86.10694652673664,-86.05697151424287,-86.00699650174913,-85.95702148925537,-85.90704647676162,-85.85707146426786,-85.80709645177411,-85.75712143928035,-85.70714642678661,-85.65717141429285,-85.6071964017991,-85.55722138930535,-85.5072463768116,-85.45727136431785,-85.40729635182409,-85.35732133933034,-85.30734632683658,-85.25737131434283,-85.20739630184907,-85.15742128935533,-85.10744627686157,-85.05747126436782,-85.00749625187406,-84.95752123938031,-84.90754622688655,-84.8575712143928,-84.80759620189905,-84.7576211894053,-84.70764617691154,-84.65767116441779,-84.60769615192403,-84.55772113943029,-84.50774612693654,-84.45777111444278,-84.40779610194903,-84.35782108945527,-84.30784607696152,-84.25787106446776,-84.20789605197402,-84.15792103948026,-84.10794602698651,-84.05797101449275,-84.007996001999,-83.95802098950524,-83.9080459770115,-83.85807096451774,-83.80809595202399,-83.75812093953023,-83.70814592703648,-83.65817091454272,-83.60819590204898,-83.55822088955522,-83.50824587706147,-83.45827086456772,-83.40829585207396,-83.35832083958022,-83.30834582708646,-83.25837081459271,-83.20839580209895,-83.1584207896052,-83.10844577711144,-83.0584707646177,-83.00849575212393,-82.95852073963019,-82.90854572713643,-82.85857071464268,-82.80859570214892,-82.75862068965517,-82.70864567716141,-82.65867066466767,-82.6086956521739,-82.55872063968016,-82.5087456271864,-82.45877061469265,-82.40879560219891,-82.35882058970515,-82.3088455772114,-82.25887056471764,-82.2088955522239,-82.15892053973013,-82.10894552723639,-82.05897051474263,-82.00899550224888,-81.95902048975512,-81.90904547726137,-81.85907046476761,-81.80909545227387,-81.7591204397801,-81.70914542728636,-81.6591704147926,-81.60919540229885,-81.55922038980509,-81.50924537731134,-81.45927036481758,-81.40929535232384,-81.35932033983009,-81.30934532733633,-81.25937031484258,-81.20939530234882,-81.15942028985508,-81.10944527736132,-81.05947026486757,-81.00949525237381,-80.95952023988006,-80.9095452273863,-80.85957021489256,-80.8095952023988,-80.75962018990505,-80.70964517741129,-80.65967016491754,-80.60969515242378,-80.55972013993004,-80.50974512743628,-80.45977011494253,-80.40979510244878,-80.35982008995502,-80.30984507746128,-80.25987006496752,-80.20989505247377,-80.15992003998001,-80.10994502748626,-80.0599700149925,-80.00999500249875,-79.960019990005,-79.91004497751125,-79.86006996501749,-79.81009495252374,-79.76011994002998,-79.71014492753623,-79.66016991504247,-79.61019490254873,-79.56021989005497,-79.51024487756122,-79.46026986506746,-79.41029485257371,-79.36031984007997,-79.3103448275862,-79.26036981509246,-79.2103948025987,-79.16041979010495,-79.11044477761119,-79.06046976511745,-79.01049475262369,-78.96051974012994,-78.91054472763618,-78.86056971514243,-78.81059470264867,-78.76061969015493,-78.71064467766116,-78.66066966516742,-78.61069465267366,-78.56071964017991,-78.51074462768615,-78.4607696151924,-78.41079460269864,-78.3608195902049,-78.31084457771115,-78.26086956521739,-78.21089455272364,-78.16091954022988,-78.11094452773614,-78.06096951524238,-78.01099450274863,-77.96101949025487,-77.91104447776112,-77.86106946526736,-77.81109445277362,-77.76111944027986,-77.71114442778611,-77.66116941529235,-77.6111944027986,-77.56121939030484,-77.5112443778111,-77.46126936531734,-77.41129435282359,-77.36131934032983,-77.31134432783608,-77.26136931534234,-77.21139430284857,-77.16141929035483,-77.11144427786107,-77.06146926536732,-77.01149425287356,-76.96151924037981,-76.91154422788605,-76.86156921539231,-76.81159420289855,-76.7616191904048,-76.71164417791104,-76.6616691654173,-76.61169415292353,-76.56171914042979,-76.51174412793603,-76.46176911544228,-76.41179410294852,-76.36181909045477,-76.31184407796101,-76.26186906546727,-76.21189405297352,-76.16191904047976,-76.11194402798601,-76.06196901549225,-76.0119940029985,-75.96201899050475,-75.912043978011,-75.86206896551724,-75.81209395302349,-75.76211894052973,-75.71214392803599,-75.66216891554222,-75.61219390304848,-75.56221889055472,-75.51224387806097,-75.46226886556721,-75.41229385307346,-75.3623188405797,-75.31234382808596,-75.2623688155922,-75.21239380309845,-75.1624187906047,-75.11244377811094,-75.0624687656172,-75.01249375312344,-74.96251874062969,-74.91254372813593,-74.86256871564218,-74.81259370314842,-74.76261869065468,-74.71264367816092,-74.66266866566717,-74.61269365317341,-74.56271864067966,-74.5127436281859,-74.46276861569216,-74.4127936031984,-74.36281859070465,-74.31284357821089,-74.26286856571714,-74.2128935532234,-74.16291854072963,-74.11294352823589,-74.06296851574213,-74.01299350324838,-73.96301849075462,-73.91304347826087,-73.86306846576711,-73.81309345327337,-73.7631184407796,-73.71314342828586,-73.6631684157921,-73.61319340329835,-73.5632183908046,-73.51324337831085,-73.46326836581709,-73.41329335332334,-73.36331834082958,-73.31334332833583,-73.26336831584207,-73.21339330334833,-73.16341829085458,-73.11344327836082,-73.06346826586707,-73.01349325337331,-72.96351824087957,-72.9135432283858,-72.86356821589206,-72.8135932033983,-72.76361819090455,-72.71364317841079,-72.66366816591704,-72.61369315342328,-72.56371814092954,-72.51374312843578,-72.46376811594203,-72.41379310344827,-72.36381809095452,-72.31384307846076,-72.26386806596702,-72.21389305347326,-72.16391804097951,-72.11394302848576,-72.063968015992,-72.01399300349826,-71.9640179910045,-71.91404297851075,-71.86406796601699,-71.81409295352324,-71.76411794102948,-71.71414292853574,-71.66416791604198,-71.61419290354823,-71.56421789105447,-71.51424287856072,-71.46426786606696,-71.41429285357322,-71.36431784107945,-71.31434282858571,-71.26436781609195,-71.2143928035982,-71.16441779110444,-71.1144427786107,-71.06446776611695,-71.01449275362319,-70.96451774112944,-70.91454272863568,-70.86456771614193,-70.81459270364817,-70.76461769115443,-70.71464267866067,-70.66466766616692,-70.61469265367316,-70.56471764117941,-70.51474262868565,-70.4647676161919,-70.41479260369815,-70.3648175912044,-70.31484257871064,-70.26486756621689,-70.21489255372313,-70.16491754122939,-70.11494252873563,-70.06496751624188,-70.01499250374813,-69.96501749125437,-69.91504247876063,-69.86506746626686,-69.81509245377312,-69.76511744127936,-69.71514242878561,-69.66516741629185,-69.6151924037981,-69.56521739130434,-69.5152423788106,-69.46526736631684,-69.41529235382309,-69.36531734132933,-69.31534232883558,-69.26536731634182,-69.21539230384808,-69.16541729135432,-69.11544227886057,-69.06546726636682,-69.01549225387306,-68.96551724137932,-68.91554222888556,-68.86556721639181,-68.81559220389805,-68.7656171914043,-68.71564217891054,-68.6656671664168,-68.61569215392304,-68.56571714142929,-68.51574212893553,-68.46576711644178,-68.41579210394802,-68.36581709145428,-68.31584207896051,-68.26586706646677,-68.21589205397301,-68.16591704147926,-68.1159420289855,-68.06596701649175,-68.01599200399801,-67.96601699150425,-67.9160419790105,-67.86606696651674,-67.816091954023,-67.76611694152923,-67.71614192903549,-67.66616691654173,-67.61619190404798,-67.56621689155422,-67.51624187906047,-67.46626686656671,-67.41629185407297,-67.3663168415792,-67.31634182908546,-67.2663668165917,-67.21639180409795,-67.16641679160419,-67.11644177911045,-67.06646676661668,-67.01649175412294,-66.96651674162919,-66.91654172913543,-66.86656671664169,-66.81659170414792,-66.76661669165418,-66.71664167916042,-66.66666666666667,-66.61669165417291,-66.56671664167916,-66.5167416291854,-66.46676661669166,-66.4167916041979,-66.36681659170415,-66.31684157921039,-66.26686656671664,-66.21689155422288,-66.16691654172914,-66.11694152923538,-66.06696651674163,-66.01699150424787,-65.96701649175412,-65.91704147926038,-65.86706646676662,-65.81709145427287,-65.76711644177911,-65.71714142928536,-65.6671664167916,-65.61719140429786,-65.5672163918041,-65.51724137931035,-65.46726636681659,-65.41729135432284,-65.36731634182908,-65.31734132933533,-65.26736631684157,-65.21739130434783,-65.16741629185407,-65.11744127936032,-65.06746626686656,-65.01749125437281,-64.96751624187905,-64.91754122938531,-64.86756621689156,-64.8175912043978,-64.76761619190405,-64.7176411794103,-64.66766616691655,-64.61769115442279,-64.56771614192904,-64.51774112943528,-64.46776611694153,-64.41779110444777,-64.36781609195403,-64.31784107946027,-64.26786606696652,-64.21789105447276,-64.16791604197901,-64.11794102948525,-64.0679660169915,-64.01799100449774,-63.968015992004,-63.918040979510245,-63.86806596701649,-63.81809095452274,-63.768115942028984,-63.71814092953523,-63.66816591704148,-63.618190904547724,-63.56821589205397,-63.51824087956022,-63.468265867066464,-63.41829085457271,-63.368315842078964,-63.31834082958521,-63.26836581709146,-63.2183908045977,-63.16841579210395,-63.1184407796102,-63.06846576711644,-63.01849075462269,-62.968515742128936,-62.91854072963518,-62.86856571714143,-62.818590704647676,-62.76861569215392,-62.71864067966017,-62.668665667166415,-62.61869065467266,-62.56871564217891,-62.518740629685155,-62.4687656171914,-62.41879060469765,-62.3688155922039,-62.31884057971015,-62.268865567216395,-62.21889055472264,-62.16891554222889,-62.118940529735134,-62.06896551724138,-62.01899050474763,-61.969015492253874,-61.91904047976012,-61.86906546726637,-61.81909045477261,-61.76911544227886,-61.71914042978511,-61.66916541729135,-61.6191904047976,-61.569215392303846,-61.51924037981009,-61.46926536731634,-61.419290354822586,-61.36931534232883,-61.319340329835086,-61.26936531734133,-61.21939030484758,-61.169415292353825,-61.11944027986007,-61.06946526736632,-61.019490254872565,-60.96951524237881,-60.91954022988506,-60.869565217391305,-60.81959020489755,-60.7696151924038,-60.719640179910044,-60.66966516741629,-60.61969015492254,-60.569715142428784,-60.51974012993503,-60.46976511744128,-60.41979010494752,-60.36981509245377,-60.31984007996002,-60.26986506746627,-60.21989005497252,-60.16991504247876,-60.11994002998501,-60.069965017491256,-60.0199900049975,-59.97001499250375,-59.920039980009996,-59.87006496751624,-59.82008995502249,-59.770114942528735,-59.72013993003498,-59.67016491754123,-59.620189905047475,-59.57021489255372,-59.52023988005997,-59.470264867566215,-59.42028985507246,-59.37031484257871,-59.320339830084954,-59.27036481759121,-59.220389805097454,-59.1704147926037,-59.12043978010995,-59.070464767616194,-59.02048975512244,-58.97051474262869,-58.920539730134934,-58.87056471764118,-58.82058970514743,-58.77061469265367,-58.72063968015992,-58.670664667666166,-58.62068965517241,-58.57071464267866,-58.520739630184906,-58.47076461769115,-58.4207896051974,-58.370814592703645,-58.32083958020989,-58.27086456771614,-58.22088955522239,-58.17091454272864,-58.120939530234885,-58.07096451774113,-58.02098950524738,-57.971014492753625,-57.92103948025987,-57.87106446776612,-57.821089455272364,-57.77111444277861,-57.72113943028486,-57.671164417791104,-57.62118940529735,-57.5712143928036,-57.521239380309844,-57.47126436781609,-57.42128935532234,-57.37131434282858,-57.32133933033483,-57.271364317841076,-57.22138930534732,-57.17141429285358,-57.12143928035982,-57.07146426786607,-57.021489255372316,-56.97151424287856,-56.92153923038481,-56.871564217891056,-56.8215892053973,-56.77161419290355,-56.721639180409795,-56.67166416791604,-56.62168915542229,-56.571714142928535,-56.52173913043478,-56.47176411794103,-56.421789105447274,-56.37181409295352,-56.32183908045977,-56.271864067966014,-56.22188905547226,-56.171914042978514,-56.12193903048476,-56.07196401799101,-56.021989005497254,-55.9720139930035,-55.92203898050975,-55.87206396801599,-55.82208895552224,-55.77211394302849,-55.72213893053473,-55.67216391804098,-55.622188905547226,-55.57221389305347,-55.52223888055972,-55.472263868065966,-55.42228885557221,-55.37231384307846,-55.322338830584705,-55.27236381809095,-55.2223888055972,-55.172413793103445,-55.1224387806097,-55.072463768115945,-55.02248875562219,-54.97251374312844,-54.922538730634685,-54.87256371814093,-54.82258870564718,-54.772613693153424,-54.72263868065967,-54.67266366816592,-54.622688655672164,-54.57271364317841,-54.52273863068466,-54.4727636181909,-54.42278860569715,-54.3728135932034,-54.32283858070964,-54.27286356821589,-54.222888555722136,-54.17291354322838,-54.122938530734636,-54.07296351824088,-54.02298850574713,-53.973013493253376,-53.92303848075962,-53.87306346826587,-53.823088455772115,-53.77311344327836,-53.72313843078461,-53.673163418290855,-53.6231884057971,-53.57321339330335,-53.523238380809595,-53.47326336831584,-53.42328835582209,-53.373313343328334,-53.32333833083458,-53.27336331834083,-53.223388305847074,-53.17341329335332,-53.12343828085957,-53.07346326836582,-53.02348825587207,-52.973513243378314,-52.92353823088456,-52.87356321839081,-52.82358820589705,-52.7736131934033,-52.723638180909546,-52.67366316841579,-52.62368815592204,-52.573713143428286,-52.52373813093453,-52.47376311844078,-52.423788105947025,-52.37381309345327,-52.32383808095952,-52.273863068465765,-52.22388805597201,-52.17391304347826,-52.123938030984505,-52.07396301849075,-52.023988005997005,-51.97401299350325,-51.9240379810095,-51.874062968515744,-51.82408795602199,-51.77411294352824,-51.724137931034484,-51.67416291854073,-51.62418790604698,-51.574212893553224,-51.52423788105947,-51.47426286856572,-51.42428785607196,-51.37431284357821,-51.324337831084456,-51.2743628185907,-51.22438780609695,-51.174412793603196,-51.12443778110944,-51.07446276861569,-51.02448775612194,-50.97451274362819,-50.924537731134436,-50.87456271864068,-50.82458770614693,-50.774612693653175,-50.72463768115942,-50.67466266866567,-50.624687656171915,-50.57471264367816,-50.52473763118441,-50.474762618690654,-50.4247876061969,-50.37481259370315,-50.324837581209394,-50.27486256871564,-50.22488755622189,-50.174912543728134,-50.12493753123438,-50.07496251874063,-50.02498750624687,-49.97501249375313,-49.92503748125937,-49.87506246876562,-49.825087456271866,-49.77511244377811,-49.72513743128436,-49.675162418790606,-49.62518740629685,-49.5752123938031,-49.525237381309346,-49.47526236881559,-49.42528735632184,-49.375312343828085,-49.32533733133433,-49.27536231884058,-49.225387306346825,-49.17541229385307,-49.12543728135932,-49.075462268865564,-49.02548725637181,-48.97551224387806,-48.92553723138431,-48.87556221889056,-48.825587206396804,-48.77561219390305,-48.7256371814093,-48.675662168915544,-48.62568715642179,-48.57571214392804,-48.52573713143428,-48.47576211894053,-48.425787106446776,-48.37581209395302,-48.32583708145927,-48.275862068965516,-48.22588705647176,-48.17591204397801,-48.125937031484256,-48.0759620189905,-48.02598700649675,-47.976011994002995,-47.92603698150925,-47.876061969015495,-47.82608695652174,-47.77611194402799,-47.726136931534235,-47.67616191904048,-47.62618690654673,-47.576211894052975,-47.52623688155922,-47.47626186906547,-47.426286856571714,-47.37631184407796,-47.32633683158421,-47.276361819090454,-47.2263868065967,-47.17641179410295,-47.12643678160919,-47.07646176911544,-47.026486756621686,-46.97651174412793,-46.92653673163418,-46.87656171914043,-46.82658670664668,-46.776611694152926,-46.72663668165917,-46.67666166916542,-46.626686656671666,-46.57671164417791,-46.52673663168416,-46.476761619190405,-46.42678660669665,-46.3768115942029,-46.326836581709145,-46.27686156921539,-46.22688655672164,-46.176911544227885,-46.12693653173413,-46.07696151924038,-46.026986506746624,-45.97701149425287,-45.92703648175912,-45.877061469265364,-45.82708645677162,-45.777111444277864,-45.72713643178411,-45.67716141929036,-45.6271864067966,-45.57721139430285,-45.5272363818091,-45.47726136931534,-45.42728635682159,-45.377311344327836,-45.32733633183408,-45.27736131934033,-45.227386306846576,-45.17741129435282,-45.12743628185907,-45.077461269365315,-45.02748625687156,-44.97751124437781,-44.927536231884055,-44.8775612193903,-44.827586206896555,-44.7776111944028,-44.72763618190905,-44.677661169415295,-44.62768615692154,-44.57771114442779,-44.527736131934034,-44.47776111944028,-44.42778610694653,-44.377811094452774,-44.32783608195902,-44.27786106946527,-44.22788605697151,-44.17791104447776,-44.12793603198401,-44.07796101949025,-44.0279860069965,-43.978010994502746,-43.92803598200899,-43.87806096951524,-43.828085957021486,-43.77811094452774,-43.728135932033986,-43.67816091954023,-43.62818590704648,-43.578210894552726,-43.52823588205897,-43.47826086956522,-43.428285857071465,-43.37831084457771,-43.32833583208396,-43.278360819590205,-43.22838580709645,-43.1784107946027,-43.128435782108944,-43.07846076961519,-43.02848575712144,-42.978510744627684,-42.92853573213393,-42.87856071964018,-42.82858570714642,-42.77861069465268,-42.728635682158924,-42.67866066966517,-42.62868565717142,-42.57871064467766,-42.52873563218391,-42.478760619690156,-42.4287856071964,-42.37881059470265,-42.328835582208896,-42.27886056971514,-42.22888555722139,-42.178910544727636,-42.12893553223388,-42.07896051974013,-42.028985507246375,-41.97901049475262,-41.92903548225887,-41.879060469765115,-41.82908545727136,-41.77911044477761,-41.72913543228386,-41.67916041979011,-41.629185407296355,-41.5792103948026,-41.52923538230885,-41.479260369815094,-41.42928535732134,-41.37931034482759,-41.329335332333834,-41.27936031984008,-41.22938530734633,-41.17941029485257,-41.12943528235882,-41.079460269865066,-41.02948525737131,-40.97951024487756,-40.929535232383806,-40.87956021989005,-40.8295852073963,-40.779610194902546,-40.72963518240879,-40.679660169915046,-40.62968515742129,-40.57971014492754,-40.529735132433785,-40.47976011994003,-40.42978510744628,-40.379810094952525,-40.32983508245877,-40.27986006996502,-40.229885057471265,-40.17991004497751,-40.12993503248376,-40.079960019990004,-40.02998500749625,-39.9800099950025,-39.930034982508744,-39.88005997001499,-39.83008495752124,-39.78010994502748,-39.73013493253373,-39.68015992003998,-39.63018490754623,-39.58020989505248,-39.53023488255872,-39.48025987006497,-39.430284857571216,-39.38030984507746,-39.33033483258371,-39.280359820089956,-39.2303848075962,-39.18040979510245,-39.130434782608695,-39.08045977011494,-39.03048475762119,-38.980509745127435,-38.93053473263368,-38.88055972013993,-38.830584707646175,-38.78060969515242,-38.73063468265867,-38.680659670164914,-38.63068465767117,-38.580709645177414,-38.53073463268366,-38.48075962018991,-38.430784607696154,-38.3808095952024,-38.33083458270865,-38.28085957021489,-38.23088455772114,-38.18090954522739,-38.13093453273363,-38.08095952023988,-38.030984507746126,-37.98100949525237,-37.93103448275862,-37.881059470264866,-37.83108445777111,-37.78110944527736,-37.731134432783605,-37.68115942028985,-37.6311844077961,-37.58120939530235,-37.5312343828086,-37.481259370314845,-37.43128435782109,-37.38130934532734,-37.331334332833585,-37.28135932033983,-37.23138430784608,-37.181409295352324,-37.13143428285857,-37.08145927036482,-37.031484257871064,-36.98150924537731,-36.93153423288356,-36.8815592203898,-36.83158420789605,-36.7816091954023,-36.73163418290854,-36.68165917041479,-36.631684157921036,-36.58170914542729,-36.531734132933536,-36.48175912043978,-36.43178410794603,-36.381809095452276,-36.33183408295852,-36.28185907046477,-36.231884057971016,-36.18190904547726,-36.13193403298351,-36.081959020489755,-36.031984007996,-35.98200899550225,-35.932033983008495,-35.88205897051474,-35.83208395802099,-35.782108945527234,-35.73213393303348,-35.68215892053973,-35.632183908045974,-35.58220889555222,-35.532233883058474,-35.48225887056472,-35.43228385807097,-35.382308845577214,-35.33233383308346,-35.28235882058971,-35.23238380809595,-35.1824087956022,-35.132433783108446,-35.08245877061469,-35.03248375812094,-34.982508745627186,-34.93253373313343,-34.88255872063968,-34.832583708145926,-34.78260869565217,-34.73263368315842,-34.682658670664665,-34.63268365817091,-34.58270864567716,-34.53273363318341,-34.48275862068966,-34.432783608195905,-34.38280859570215,-34.3328335832084,-34.282858570714644,-34.23288355822089,-34.18290854572714,-34.132933533233384,-34.08295852073963,-34.03298350824588,-33.983008495752124,-33.93303348325837,-33.88305847076462,-33.83308345827086,-33.78310844577711,-33.733133433283356,-33.6831584207896,-33.63318340829585,-33.583208395802096,-33.53323338330834,-33.483258370814596,-33.43328335832084,-33.38330834582709,-33.333333333333336,-33.28335832083958,-33.23338330834583,-33.183408295852075,-33.13343328335832,-33.08345827086457,-33.033483258370815,-32.98350824587706,-32.93353323338331,-32.883558220889554,-32.8335832083958,-32.78360819590205,-32.733633183408294,-32.68365817091454,-32.63368315842079,-32.583708145927034,-32.53373313343328,-32.48375812093953,-32.43378310844578,-32.38380809595203,-32.33383308345827,-32.28385807096452,-32.23388305847077,-32.18390804597701,-32.13393303348326,-32.083958020989506,-32.03398300849575,-31.984007996002,-31.934032983508246,-31.884057971014492,-31.83408295852074,-31.784107946026985,-31.734132933533232,-31.684157921039482,-31.63418290854573,-31.584207896051975,-31.53423288355822,-31.484257871064468,-31.434282858570715,-31.38430784607696,-31.334332833583208,-31.284357821089454,-31.2343828085957,-31.18440779610195,-31.134432783608197,-31.084457771114444,-31.03448275862069,-30.984507746126937,-30.934532733633183,-30.88455772113943,-30.834582708645677,-30.784607696151923,-30.73463268365817,-30.684657671164416,-30.634682658670666,-30.584707646176913,-30.53473263368316,-30.484757621189406,-30.434782608695652,-30.3848075962019,-30.334832583708145,-30.284857571214392,-30.23488255872064,-30.184907546226885,-30.134932533733135,-30.08495752123938,-30.034982508745628,-29.985007496251875,-29.93503248375812,-29.885057471264368,-29.835082458770614,-29.78510744627686,-29.735132433783107,-29.685157421289354,-29.635182408795604,-29.58520739630185,-29.535232383808097,-29.485257371314344,-29.43528235882059,-29.385307346326837,-29.335332333833083,-29.28535732133933,-29.235382308845576,-29.185407296351823,-29.13543228385807,-29.08545727136432,-29.035482258870566,-28.985507246376812,-28.93553223388306,-28.885557221389305,-28.835582208895552,-28.7856071964018,-28.735632183908045,-28.68565717141429,-28.635682158920538,-28.58570714642679,-28.535732133933035,-28.48575712143928,-28.435782108945528,-28.385807096451774,-28.33583208395802,-28.285857071464267,-28.235882058970514,-28.18590704647676,-28.135932033983007,-28.085957021489257,-28.035982008995504,-27.98600699650175,-27.936031984007997,-27.886056971514243,-27.83608195902049,-27.786106946526736,-27.736131934032983,-27.68615692153923,-27.636181909045476,-27.586206896551722,-27.536231884057973,-27.48625687156422,-27.436281859070466,-27.386306846576712,-27.33633183408296,-27.286356821589205,-27.23638180909545,-27.1864067966017,-27.136431784107945,-27.08645677161419,-27.03648175912044,-26.986506746626688,-26.936531734132934,-26.88655672163918,-26.836581709145428,-26.786606696651674,-26.73663168415792,-26.686656671664167,-26.636681659170414,-26.58670664667666,-26.53673163418291,-26.486756621689157,-26.436781609195403,-26.38680659670165,-26.336831584207896,-26.286856571714143,-26.23688155922039,-26.186906546726636,-26.136931534232883,-26.08695652173913,-26.036981509245376,-25.987006496751626,-25.937031484257872,-25.88705647176412,-25.837081459270365,-25.787106446776612,-25.73713143428286,-25.687156421789105,-25.63718140929535,-25.587206396801598,-25.537231384307844,-25.487256371814095,-25.43728135932034,-25.387306346826588,-25.337331334332834,-25.28735632183908,-25.237381309345327,-25.187406296851574,-25.13743128435782,-25.087456271864067,-25.037481259370313,-24.987506246876563,-24.93753123438281,-24.887556221889056,-24.837581209395303,-24.78760619690155,-24.737631184407796,-24.687656171914043,-24.63768115942029,-24.587706146926536,-24.537731134432782,-24.48775612193903,-24.43778110944528,-24.387806096951525,-24.337831084457772,-24.28785607196402,-24.237881059470265,-24.18790604697651,-24.137931034482758,-24.087956021989005,-24.03798100949525,-23.988005997001498,-23.938030984507748,-23.888055972013994,-23.83808095952024,-23.788105947026487,-23.738130934532734,-23.68815592203898,-23.638180909545227,-23.588205897051473,-23.53823088455772,-23.488255872063966,-23.438280859570217,-23.388305847076463,-23.33833083458271,-23.288355822088956,-23.238380809595203,-23.18840579710145,-23.138430784607696,-23.088455772113942,-23.03848075962019,-22.988505747126435,-22.938530734632682,-22.888555722138932,-22.83858070964518,-22.788605697151425,-22.73863068465767,-22.688655672163918,-22.638680659670165,-22.58870564717641,-22.538730634682658,-22.488755622188904,-22.43878060969515,-22.3888055972014,-22.338830584707647,-22.288855572213894,-22.23888055972014,-22.188905547226387,-22.138930534732634,-22.08895552223888,-22.038980509745127,-21.989005497251373,-21.93903048475762,-21.88905547226387,-21.839080459770116,-21.789105447276363,-21.73913043478261,-21.689155422288856,-21.639180409795102,-21.58920539730135,-21.539230384807595,-21.489255372313842,-21.43928035982009,-21.38930534732634,-21.339330334832585,-21.28935532233883,-21.239380309845078,-21.189405297351325,-21.13943028485757,-21.089455272363818,-21.039480259870064,-20.98950524737631,-20.939530234882557,-20.889555222388804,-20.839580209895054,-20.7896051974013,-20.739630184907547,-20.689655172413794,-20.63968015992004,-20.589705147426287,-20.539730134932533,-20.48975512243878,-20.439780109945026,-20.389805097451273,-20.339830084957523,-20.28985507246377,-20.239880059970016,-20.189905047476262,-20.13993003498251,-20.089955022488756,-20.039980009995002,-19.99000499750125,-19.940029985007495,-19.89005497251374,-19.84007996001999,-19.79010494752624,-19.740129935032485,-19.69015492253873,-19.640179910044978,-19.590204897551224,-19.54022988505747,-19.490254872563717,-19.440279860069964,-19.39030484757621,-19.340329835082457,-19.290354822588707,-19.240379810094954,-19.1904047976012,-19.140429785107447,-19.090454772613693,-19.04047976011994,-18.990504747626186,-18.940529735132433,-18.89055472263868,-18.840579710144926,-18.790604697651176,-18.740629685157423,-18.69065467266367,-18.640679660169916,-18.590704647676162,-18.54072963518241,-18.490754622688655,-18.4407796101949,-18.39080459770115,-18.340829585207395,-18.290854572713645,-18.24087956021989,-18.190904547726138,-18.140929535232384,-18.09095452273863,-18.040979510244878,-17.991004497751124,-17.94102948525737,-17.891054472763617,-17.841079460269864,-17.79110444777611,-17.74112943528236,-17.691154422788607,-17.641179410294853,-17.5912043978011,-17.541229385307346,-17.491254372813593,-17.44127936031984,-17.391304347826086,-17.341329335332333,-17.29135432283858,-17.24137931034483,-17.191404297851076,-17.141429285357322,-17.09145427286357,-17.041479260369815,-16.991504247876062,-16.94152923538231,-16.891554222888555,-16.8415792103948,-16.791604197901048,-16.741629185407298,-16.691654172913545,-16.64167916041979,-16.591704147926038,-16.541729135432284,-16.49175412293853,-16.441779110444777,-16.391804097951024,-16.34182908545727,-16.291854072963517,-16.241879060469763,-16.191904047976013,-16.14192903548226,-16.091954022988507,-16.041979010494753,-15.992003998001,-15.942028985507246,-15.892053973013493,-15.842078960519741,-15.792103948025987,-15.742128935532234,-15.69215392303848,-15.642178910544727,-15.592203898050975,-15.542228885557222,-15.492253873063468,-15.442278860569715,-15.392303848075962,-15.342328835582208,-15.292353823088456,-15.242378810594703,-15.19240379810095,-15.142428785607196,-15.092453773113442,-15.04247876061969,-14.992503748125937,-14.942528735632184,-14.89255372313843,-14.842578710644677,-14.792603698150925,-14.742628685657172,-14.692653673163418,-14.642678660669665,-14.592703648175911,-14.54272863568216,-14.492753623188406,-14.442778610694653,-14.3928035982009,-14.342828585707146,-14.292853573213394,-14.24287856071964,-14.192903548225887,-14.142928535732134,-14.09295352323838,-14.042978510744629,-13.993003498250875,-13.943028485757122,-13.893053473263368,-13.843078460769615,-13.793103448275861,-13.74312843578211,-13.693153423288356,-13.643178410794603,-13.59320339830085,-13.543228385807096,-13.493253373313344,-13.44327836081959,-13.393303348325837,-13.343328335832084,-13.29335332333833,-13.243378310844578,-13.193403298350825,-13.143428285857071,-13.093453273363318,-13.043478260869565,-12.993503248375813,-12.94352823588206,-12.893553223388306,-12.843578210894552,-12.793603198400799,-12.743628185907047,-12.693653173413294,-12.64367816091954,-12.593703148425787,-12.543728135932033,-12.493753123438282,-12.443778110944528,-12.393803098450775,-12.343828085957021,-12.293853073463268,-12.243878060969514,-12.193903048475763,-12.14392803598201,-12.093953023488256,-12.043978010994502,-11.994002998500749,-11.944027986006997,-11.894052973513244,-11.84407796101949,-11.794102948525737,-11.744127936031983,-11.694152923538232,-11.644177911044478,-11.594202898550725,-11.544227886056971,-11.494252873563218,-11.444277861069466,-11.394302848575713,-11.344327836081959,-11.294352823588206,-11.244377811094452,-11.1944027986007,-11.144427786106947,-11.094452773613193,-11.04447776111944,-10.994502748625687,-10.944527736131935,-10.894552723638181,-10.844577711144428,-10.794602698650674,-10.744627686156921,-10.69465267366317,-10.644677661169416,-10.594702648675662,-10.544727636181909,-10.494752623688155,-10.444777611194402,-10.39480259870065,-10.344827586206897,-10.294852573713143,-10.24487756121939,-10.194902548725636,-10.144927536231885,-10.094952523738131,-10.044977511244378,-9.995002498750624,-9.94502748625687,-9.89505247376312,-9.845077461269366,-9.795102448775612,-9.745127436281859,-9.695152423788105,-9.645177411294354,-9.5952023988006,-9.545227386306847,-9.495252373813093,-9.44527736131934,-9.395302348825588,-9.345327336331835,-9.295352323838081,-9.245377311344328,-9.195402298850574,-9.145427286356822,-9.095452273863069,-9.045477261369316,-8.995502248875562,-8.945527236381809,-8.895552223888055,-8.845577211394303,-8.79560219890055,-8.745627186406796,-8.695652173913043,-8.64567716141929,-8.595702148925538,-8.545727136431784,-8.495752123938031,-8.445777111444277,-8.395802098950524,-8.345827086456772,-8.295852073963019,-8.245877061469265,-8.195902048975512,-8.145927036481758,-8.095952023988007,-8.045977011494253,-7.9960019990005,-7.946026986506746,-7.896051974012994,-7.84607696151924,-7.796101949025488,-7.746126936531734,-7.696151924037981,-7.646176911544228,-7.596201899050475,-7.546226886556721,-7.496251874062969,-7.446276861569215,-7.396301849075463,-7.346326836581709,-7.296351824087956,-7.246376811594203,-7.19640179910045,-7.146426786606697,-7.096451774112944,-7.04647676161919,-6.9965017491254375,-6.946526736631684,-6.896551724137931,-6.846576711644178,-6.796601699150425,-6.746626686656672,-6.6966516741629185,-6.646676661669165,-6.5967016491754125,-6.546726636681659,-6.496751624187906,-6.446776611694153,-6.3968015992003995,-6.346826586706647,-6.296851574212893,-6.246876561719141,-6.196901549225387,-6.146926536731634,-6.096951524237881,-6.046976511744128,-5.997001499250374,-5.947026486756622,-5.897051474262868,-5.847076461769116,-5.797101449275362,-5.747126436781609,-5.697151424287856,-5.647176411794103,-5.59720139930035,-5.547226386806597,-5.497251374312843,-5.447276361819091,-5.397301349325337,-5.347326336831585,-5.297351324337831,-5.247376311844078,-5.197401299350325,-5.147426286856572,-5.097451274362818,-5.047476261869066,-4.997501249375312,-4.94752623688156,-4.897551224387806,-4.847576211894053,-4.7976011994003,-4.747626186906547,-4.697651174412794,-4.6476761619190405,-4.597701149425287,-4.5477261369315345,-4.497751124437781,-4.4477761119440276,-4.397801099450275,-4.3478260869565215,-4.297851074462769,-4.2478760619690155,-4.197901049475262,-4.147926036981509,-4.097951024487756,-4.047976011994003,-3.99800099950025,-3.948025987006497,-3.898050974512744,-3.8480759620189904,-3.7981009495252374,-3.7481259370314843,-3.6981509245377313,-3.648175912043978,-3.598200899550225,-3.548225887056472,-3.4982508745627188,-3.4482758620689653,-3.3983008495752123,-3.3483258370814593,-3.2983508245877062,-3.248375812093953,-3.1984007996001997,-3.1484257871064467,-3.0984507746126937,-3.0484757621189407,-2.998500749625187,-2.948525737131434,-2.898550724637681,-2.848575712143928,-2.798600699650175,-2.7486256871564216,-2.6986506746626686,-2.6486756621689156,-2.5987006496751626,-2.548725637181409,-2.498750624687656,-2.448775612193903,-2.39880059970015,-2.348825587206397,-2.2988505747126435,-2.2488755622188905,-2.1989005497251375,-2.1489255372313845,-2.098950524737631,-2.048975512243878,-1.999000499750125,-1.949025487256372,-1.8990504747626187,-1.8490754622688657,-1.7991004497751124,-1.7491254372813594,-1.6991504247876061,-1.6491754122938531,-1.5992003998000999,-1.5492253873063468,-1.4992503748125936,-1.4492753623188406,-1.3993003498250876,-1.3493253373313343,-1.2993503248375813,-1.249375312343828,-1.199400299850075,-1.1494252873563218,-1.0994502748625687,-1.0494752623688155,-0.9995002498750625,-0.9495252373813093,-0.8995502248875562,-0.8495752123938031,-0.7996001999000499,-0.7496251874062968,-0.6996501749125438,-0.6496751624187906,-0.5997001499250375,-0.5497251374312844,-0.49975012493753124,-0.4497751124437781,-0.39980009995002497,-0.3498250874562719,-0.29985007496251875,-0.24987506246876562,-0.19990004997501248,-0.14992503748125938,-0.09995002498750624,-0.04997501249375312,0.0,0.04997501249375312,0.09995002498750624,0.14992503748125938,0.19990004997501248,0.24987506246876562,0.29985007496251875,0.3498250874562719,0.39980009995002497,0.4497751124437781,0.49975012493753124,0.5497251374312844,0.5997001499250375,0.6496751624187906,0.6996501749125438,0.7496251874062968,0.7996001999000499,0.8495752123938031,0.8995502248875562,0.9495252373813093,0.9995002498750625,1.0494752623688155,1.0994502748625687,1.1494252873563218,1.199400299850075,1.249375312343828,1.2993503248375813,1.3493253373313343,1.3993003498250876,1.4492753623188406,1.4992503748125936,1.5492253873063468,1.5992003998000999,1.6491754122938531,1.6991504247876061,1.7491254372813594,1.7991004497751124,1.8490754622688657,1.8990504747626187,1.949025487256372,1.999000499750125,2.048975512243878,2.098950524737631,2.1489255372313845,2.1989005497251375,2.2488755622188905,2.2988505747126435,2.348825587206397,2.39880059970015,2.448775612193903,2.498750624687656,2.548725637181409,2.5987006496751626,2.6486756621689156,2.6986506746626686,2.7486256871564216,2.798600699650175,2.848575712143928,2.898550724637681,2.948525737131434,2.998500749625187,3.0484757621189407,3.0984507746126937,3.1484257871064467,3.1984007996001997,3.248375812093953,3.2983508245877062,3.3483258370814593,3.3983008495752123,3.4482758620689653,3.4982508745627188,3.548225887056472,3.598200899550225,3.648175912043978,3.6981509245377313,3.7481259370314843,3.7981009495252374,3.8480759620189904,3.898050974512744,3.948025987006497,3.99800099950025,4.047976011994003,4.097951024487756,4.147926036981509,4.197901049475262,4.2478760619690155,4.297851074462769,4.3478260869565215,4.397801099450275,4.4477761119440276,4.497751124437781,4.5477261369315345,4.597701149425287,4.6476761619190405,4.697651174412794,4.747626186906547,4.7976011994003,4.847576211894053,4.897551224387806,4.94752623688156,4.997501249375312,5.047476261869066,5.097451274362818,5.147426286856572,5.197401299350325,5.247376311844078,5.297351324337831,5.347326336831585,5.397301349325337,5.447276361819091,5.497251374312843,5.547226386806597,5.59720139930035,5.647176411794103,5.697151424287856,5.747126436781609,5.797101449275362,5.847076461769116,5.897051474262868,5.947026486756622,5.997001499250374,6.046976511744128,6.096951524237881,6.146926536731634,6.196901549225387,6.246876561719141,6.296851574212893,6.346826586706647,6.3968015992003995,6.446776611694153,6.496751624187906,6.546726636681659,6.5967016491754125,6.646676661669165,6.6966516741629185,6.746626686656672,6.796601699150425,6.846576711644178,6.896551724137931,6.946526736631684,6.9965017491254375,7.04647676161919,7.096451774112944,7.146426786606697,7.19640179910045,7.246376811594203,7.296351824087956,7.346326836581709,7.396301849075463,7.446276861569215,7.496251874062969,7.546226886556721,7.596201899050475,7.646176911544228,7.696151924037981,7.746126936531734,7.796101949025488,7.84607696151924,7.896051974012994,7.946026986506746,7.9960019990005,8.045977011494253,8.095952023988007,8.145927036481758,8.195902048975512,8.245877061469265,8.295852073963019,8.345827086456772,8.395802098950524,8.445777111444277,8.495752123938031,8.545727136431784,8.595702148925538,8.64567716141929,8.695652173913043,8.745627186406796,8.79560219890055,8.845577211394303,8.895552223888055,8.945527236381809,8.995502248875562,9.045477261369316,9.095452273863069,9.145427286356822,9.195402298850574,9.245377311344328,9.295352323838081,9.345327336331835,9.395302348825588,9.44527736131934,9.495252373813093,9.545227386306847,9.5952023988006,9.645177411294354,9.695152423788105,9.745127436281859,9.795102448775612,9.845077461269366,9.89505247376312,9.94502748625687,9.995002498750624,10.044977511244378,10.094952523738131,10.144927536231885,10.194902548725636,10.24487756121939,10.294852573713143,10.344827586206897,10.39480259870065,10.444777611194402,10.494752623688155,10.544727636181909,10.594702648675662,10.644677661169416,10.69465267366317,10.744627686156921,10.794602698650674,10.844577711144428,10.894552723638181,10.944527736131935,10.994502748625687,11.04447776111944,11.094452773613193,11.144427786106947,11.1944027986007,11.244377811094452,11.294352823588206,11.344327836081959,11.394302848575713,11.444277861069466,11.494252873563218,11.544227886056971,11.594202898550725,11.644177911044478,11.694152923538232,11.744127936031983,11.794102948525737,11.84407796101949,11.894052973513244,11.944027986006997,11.994002998500749,12.043978010994502,12.093953023488256,12.14392803598201,12.193903048475763,12.243878060969514,12.293853073463268,12.343828085957021,12.393803098450775,12.443778110944528,12.493753123438282,12.543728135932033,12.593703148425787,12.64367816091954,12.693653173413294,12.743628185907047,12.793603198400799,12.843578210894552,12.893553223388306,12.94352823588206,12.993503248375813,13.043478260869565,13.093453273363318,13.143428285857071,13.193403298350825,13.243378310844578,13.29335332333833,13.343328335832084,13.393303348325837,13.44327836081959,13.493253373313344,13.543228385807096,13.59320339830085,13.643178410794603,13.693153423288356,13.74312843578211,13.793103448275861,13.843078460769615,13.893053473263368,13.943028485757122,13.993003498250875,14.042978510744629,14.09295352323838,14.142928535732134,14.192903548225887,14.24287856071964,14.292853573213394,14.342828585707146,14.3928035982009,14.442778610694653,14.492753623188406,14.54272863568216,14.592703648175911,14.642678660669665,14.692653673163418,14.742628685657172,14.792603698150925,14.842578710644677,14.89255372313843,14.942528735632184,14.992503748125937,15.04247876061969,15.092453773113442,15.142428785607196,15.19240379810095,15.242378810594703,15.292353823088456,15.342328835582208,15.392303848075962,15.442278860569715,15.492253873063468,15.542228885557222,15.592203898050975,15.642178910544727,15.69215392303848,15.742128935532234,15.792103948025987,15.842078960519741,15.892053973013493,15.942028985507246,15.992003998001,16.041979010494753,16.091954022988507,16.14192903548226,16.191904047976013,16.241879060469763,16.291854072963517,16.34182908545727,16.391804097951024,16.441779110444777,16.49175412293853,16.541729135432284,16.591704147926038,16.64167916041979,16.691654172913545,16.741629185407298,16.791604197901048,16.8415792103948,16.891554222888555,16.94152923538231,16.991504247876062,17.041479260369815,17.09145427286357,17.141429285357322,17.191404297851076,17.24137931034483,17.29135432283858,17.341329335332333,17.391304347826086,17.44127936031984,17.491254372813593,17.541229385307346,17.5912043978011,17.641179410294853,17.691154422788607,17.74112943528236,17.79110444777611,17.841079460269864,17.891054472763617,17.94102948525737,17.991004497751124,18.040979510244878,18.09095452273863,18.140929535232384,18.190904547726138,18.24087956021989,18.290854572713645,18.340829585207395,18.39080459770115,18.4407796101949,18.490754622688655,18.54072963518241,18.590704647676162,18.640679660169916,18.69065467266367,18.740629685157423,18.790604697651176,18.840579710144926,18.89055472263868,18.940529735132433,18.990504747626186,19.04047976011994,19.090454772613693,19.140429785107447,19.1904047976012,19.240379810094954,19.290354822588707,19.340329835082457,19.39030484757621,19.440279860069964,19.490254872563717,19.54022988505747,19.590204897551224,19.640179910044978,19.69015492253873,19.740129935032485,19.79010494752624,19.84007996001999,19.89005497251374,19.940029985007495,19.99000499750125,20.039980009995002,20.089955022488756,20.13993003498251,20.189905047476262,20.239880059970016,20.28985507246377,20.339830084957523,20.389805097451273,20.439780109945026,20.48975512243878,20.539730134932533,20.589705147426287,20.63968015992004,20.689655172413794,20.739630184907547,20.7896051974013,20.839580209895054,20.889555222388804,20.939530234882557,20.98950524737631,21.039480259870064,21.089455272363818,21.13943028485757,21.189405297351325,21.239380309845078,21.28935532233883,21.339330334832585,21.38930534732634,21.43928035982009,21.489255372313842,21.539230384807595,21.58920539730135,21.639180409795102,21.689155422288856,21.73913043478261,21.789105447276363,21.839080459770116,21.88905547226387,21.93903048475762,21.989005497251373,22.038980509745127,22.08895552223888,22.138930534732634,22.188905547226387,22.23888055972014,22.288855572213894,22.338830584707647,22.3888055972014,22.43878060969515,22.488755622188904,22.538730634682658,22.58870564717641,22.638680659670165,22.688655672163918,22.73863068465767,22.788605697151425,22.83858070964518,22.888555722138932,22.938530734632682,22.988505747126435,23.03848075962019,23.088455772113942,23.138430784607696,23.18840579710145,23.238380809595203,23.288355822088956,23.33833083458271,23.388305847076463,23.438280859570217,23.488255872063966,23.53823088455772,23.588205897051473,23.638180909545227,23.68815592203898,23.738130934532734,23.788105947026487,23.83808095952024,23.888055972013994,23.938030984507748,23.988005997001498,24.03798100949525,24.087956021989005,24.137931034482758,24.18790604697651,24.237881059470265,24.28785607196402,24.337831084457772,24.387806096951525,24.43778110944528,24.48775612193903,24.537731134432782,24.587706146926536,24.63768115942029,24.687656171914043,24.737631184407796,24.78760619690155,24.837581209395303,24.887556221889056,24.93753123438281,24.987506246876563,25.037481259370313,25.087456271864067,25.13743128435782,25.187406296851574,25.237381309345327,25.28735632183908,25.337331334332834,25.387306346826588,25.43728135932034,25.487256371814095,25.537231384307844,25.587206396801598,25.63718140929535,25.687156421789105,25.73713143428286,25.787106446776612,25.837081459270365,25.88705647176412,25.937031484257872,25.987006496751626,26.036981509245376,26.08695652173913,26.136931534232883,26.186906546726636,26.23688155922039,26.286856571714143,26.336831584207896,26.38680659670165,26.436781609195403,26.486756621689157,26.53673163418291,26.58670664667666,26.636681659170414,26.686656671664167,26.73663168415792,26.786606696651674,26.836581709145428,26.88655672163918,26.936531734132934,26.986506746626688,27.03648175912044,27.08645677161419,27.136431784107945,27.1864067966017,27.23638180909545,27.286356821589205,27.33633183408296,27.386306846576712,27.436281859070466,27.48625687156422,27.536231884057973,27.586206896551722,27.636181909045476,27.68615692153923,27.736131934032983,27.786106946526736,27.83608195902049,27.886056971514243,27.936031984007997,27.98600699650175,28.035982008995504,28.085957021489257,28.135932033983007,28.18590704647676,28.235882058970514,28.285857071464267,28.33583208395802,28.385807096451774,28.435782108945528,28.48575712143928,28.535732133933035,28.58570714642679,28.635682158920538,28.68565717141429,28.735632183908045,28.7856071964018,28.835582208895552,28.885557221389305,28.93553223388306,28.985507246376812,29.035482258870566,29.08545727136432,29.13543228385807,29.185407296351823,29.235382308845576,29.28535732133933,29.335332333833083,29.385307346326837,29.43528235882059,29.485257371314344,29.535232383808097,29.58520739630185,29.635182408795604,29.685157421289354,29.735132433783107,29.78510744627686,29.835082458770614,29.885057471264368,29.93503248375812,29.985007496251875,30.034982508745628,30.08495752123938,30.134932533733135,30.184907546226885,30.23488255872064,30.284857571214392,30.334832583708145,30.3848075962019,30.434782608695652,30.484757621189406,30.53473263368316,30.584707646176913,30.634682658670666,30.684657671164416,30.73463268365817,30.784607696151923,30.834582708645677,30.88455772113943,30.934532733633183,30.984507746126937,31.03448275862069,31.084457771114444,31.134432783608197,31.18440779610195,31.2343828085957,31.284357821089454,31.334332833583208,31.38430784607696,31.434282858570715,31.484257871064468,31.53423288355822,31.584207896051975,31.63418290854573,31.684157921039482,31.734132933533232,31.784107946026985,31.83408295852074,31.884057971014492,31.934032983508246,31.984007996002,32.03398300849575,32.083958020989506,32.13393303348326,32.18390804597701,32.23388305847077,32.28385807096452,32.33383308345827,32.38380809595203,32.43378310844578,32.48375812093953,32.53373313343328,32.583708145927034,32.63368315842079,32.68365817091454,32.733633183408294,32.78360819590205,32.8335832083958,32.883558220889554,32.93353323338331,32.98350824587706,33.033483258370815,33.08345827086457,33.13343328335832,33.183408295852075,33.23338330834583,33.28335832083958,33.333333333333336,33.38330834582709,33.43328335832084,33.483258370814596,33.53323338330834,33.583208395802096,33.63318340829585,33.6831584207896,33.733133433283356,33.78310844577711,33.83308345827086,33.88305847076462,33.93303348325837,33.983008495752124,34.03298350824588,34.08295852073963,34.132933533233384,34.18290854572714,34.23288355822089,34.282858570714644,34.3328335832084,34.38280859570215,34.432783608195905,34.48275862068966,34.53273363318341,34.58270864567716,34.63268365817091,34.682658670664665,34.73263368315842,34.78260869565217,34.832583708145926,34.88255872063968,34.93253373313343,34.982508745627186,35.03248375812094,35.08245877061469,35.132433783108446,35.1824087956022,35.23238380809595,35.28235882058971,35.33233383308346,35.382308845577214,35.43228385807097,35.48225887056472,35.532233883058474,35.58220889555222,35.632183908045974,35.68215892053973,35.73213393303348,35.782108945527234,35.83208395802099,35.88205897051474,35.932033983008495,35.98200899550225,36.031984007996,36.081959020489755,36.13193403298351,36.18190904547726,36.231884057971016,36.28185907046477,36.33183408295852,36.381809095452276,36.43178410794603,36.48175912043978,36.531734132933536,36.58170914542729,36.631684157921036,36.68165917041479,36.73163418290854,36.7816091954023,36.83158420789605,36.8815592203898,36.93153423288356,36.98150924537731,37.031484257871064,37.08145927036482,37.13143428285857,37.181409295352324,37.23138430784608,37.28135932033983,37.331334332833585,37.38130934532734,37.43128435782109,37.481259370314845,37.5312343828086,37.58120939530235,37.6311844077961,37.68115942028985,37.731134432783605,37.78110944527736,37.83108445777111,37.881059470264866,37.93103448275862,37.98100949525237,38.030984507746126,38.08095952023988,38.13093453273363,38.18090954522739,38.23088455772114,38.28085957021489,38.33083458270865,38.3808095952024,38.430784607696154,38.48075962018991,38.53073463268366,38.580709645177414,38.63068465767117,38.680659670164914,38.73063468265867,38.78060969515242,38.830584707646175,38.88055972013993,38.93053473263368,38.980509745127435,39.03048475762119,39.08045977011494,39.130434782608695,39.18040979510245,39.2303848075962,39.280359820089956,39.33033483258371,39.38030984507746,39.430284857571216,39.48025987006497,39.53023488255872,39.58020989505248,39.63018490754623,39.68015992003998,39.73013493253373,39.78010994502748,39.83008495752124,39.88005997001499,39.930034982508744,39.9800099950025,40.02998500749625,40.079960019990004,40.12993503248376,40.17991004497751,40.229885057471265,40.27986006996502,40.32983508245877,40.379810094952525,40.42978510744628,40.47976011994003,40.529735132433785,40.57971014492754,40.62968515742129,40.679660169915046,40.72963518240879,40.779610194902546,40.8295852073963,40.87956021989005,40.929535232383806,40.97951024487756,41.02948525737131,41.079460269865066,41.12943528235882,41.17941029485257,41.22938530734633,41.27936031984008,41.329335332333834,41.37931034482759,41.42928535732134,41.479260369815094,41.52923538230885,41.5792103948026,41.629185407296355,41.67916041979011,41.72913543228386,41.77911044477761,41.82908545727136,41.879060469765115,41.92903548225887,41.97901049475262,42.028985507246375,42.07896051974013,42.12893553223388,42.178910544727636,42.22888555722139,42.27886056971514,42.328835582208896,42.37881059470265,42.4287856071964,42.478760619690156,42.52873563218391,42.57871064467766,42.62868565717142,42.67866066966517,42.728635682158924,42.77861069465268,42.82858570714642,42.87856071964018,42.92853573213393,42.978510744627684,43.02848575712144,43.07846076961519,43.128435782108944,43.1784107946027,43.22838580709645,43.278360819590205,43.32833583208396,43.37831084457771,43.428285857071465,43.47826086956522,43.52823588205897,43.578210894552726,43.62818590704648,43.67816091954023,43.728135932033986,43.77811094452774,43.828085957021486,43.87806096951524,43.92803598200899,43.978010994502746,44.0279860069965,44.07796101949025,44.12793603198401,44.17791104447776,44.22788605697151,44.27786106946527,44.32783608195902,44.377811094452774,44.42778610694653,44.47776111944028,44.527736131934034,44.57771114442779,44.62768615692154,44.677661169415295,44.72763618190905,44.7776111944028,44.827586206896555,44.8775612193903,44.927536231884055,44.97751124437781,45.02748625687156,45.077461269365315,45.12743628185907,45.17741129435282,45.227386306846576,45.27736131934033,45.32733633183408,45.377311344327836,45.42728635682159,45.47726136931534,45.5272363818091,45.57721139430285,45.6271864067966,45.67716141929036,45.72713643178411,45.777111444277864,45.82708645677162,45.877061469265364,45.92703648175912,45.97701149425287,46.026986506746624,46.07696151924038,46.12693653173413,46.176911544227885,46.22688655672164,46.27686156921539,46.326836581709145,46.3768115942029,46.42678660669665,46.476761619190405,46.52673663168416,46.57671164417791,46.626686656671666,46.67666166916542,46.72663668165917,46.776611694152926,46.82658670664668,46.87656171914043,46.92653673163418,46.97651174412793,47.026486756621686,47.07646176911544,47.12643678160919,47.17641179410295,47.2263868065967,47.276361819090454,47.32633683158421,47.37631184407796,47.426286856571714,47.47626186906547,47.52623688155922,47.576211894052975,47.62618690654673,47.67616191904048,47.726136931534235,47.77611194402799,47.82608695652174,47.876061969015495,47.92603698150925,47.976011994002995,48.02598700649675,48.0759620189905,48.125937031484256,48.17591204397801,48.22588705647176,48.275862068965516,48.32583708145927,48.37581209395302,48.425787106446776,48.47576211894053,48.52573713143428,48.57571214392804,48.62568715642179,48.675662168915544,48.7256371814093,48.77561219390305,48.825587206396804,48.87556221889056,48.92553723138431,48.97551224387806,49.02548725637181,49.075462268865564,49.12543728135932,49.17541229385307,49.225387306346825,49.27536231884058,49.32533733133433,49.375312343828085,49.42528735632184,49.47526236881559,49.525237381309346,49.5752123938031,49.62518740629685,49.675162418790606,49.72513743128436,49.77511244377811,49.825087456271866,49.87506246876562,49.92503748125937,49.97501249375313,50.02498750624687,50.07496251874063,50.12493753123438,50.174912543728134,50.22488755622189,50.27486256871564,50.324837581209394,50.37481259370315,50.4247876061969,50.474762618690654,50.52473763118441,50.57471264367816,50.624687656171915,50.67466266866567,50.72463768115942,50.774612693653175,50.82458770614693,50.87456271864068,50.924537731134436,50.97451274362819,51.02448775612194,51.07446276861569,51.12443778110944,51.174412793603196,51.22438780609695,51.2743628185907,51.324337831084456,51.37431284357821,51.42428785607196,51.47426286856572,51.52423788105947,51.574212893553224,51.62418790604698,51.67416291854073,51.724137931034484,51.77411294352824,51.82408795602199,51.874062968515744,51.9240379810095,51.97401299350325,52.023988005997005,52.07396301849075,52.123938030984505,52.17391304347826,52.22388805597201,52.273863068465765,52.32383808095952,52.37381309345327,52.423788105947025,52.47376311844078,52.52373813093453,52.573713143428286,52.62368815592204,52.67366316841579,52.723638180909546,52.7736131934033,52.82358820589705,52.87356321839081,52.92353823088456,52.973513243378314,53.02348825587207,53.07346326836582,53.12343828085957,53.17341329335332,53.223388305847074,53.27336331834083,53.32333833083458,53.373313343328334,53.42328835582209,53.47326336831584,53.523238380809595,53.57321339330335,53.6231884057971,53.673163418290855,53.72313843078461,53.77311344327836,53.823088455772115,53.87306346826587,53.92303848075962,53.973013493253376,54.02298850574713,54.07296351824088,54.122938530734636,54.17291354322838,54.222888555722136,54.27286356821589,54.32283858070964,54.3728135932034,54.42278860569715,54.4727636181909,54.52273863068466,54.57271364317841,54.622688655672164,54.67266366816592,54.72263868065967,54.772613693153424,54.82258870564718,54.87256371814093,54.922538730634685,54.97251374312844,55.02248875562219,55.072463768115945,55.1224387806097,55.172413793103445,55.2223888055972,55.27236381809095,55.322338830584705,55.37231384307846,55.42228885557221,55.472263868065966,55.52223888055972,55.57221389305347,55.622188905547226,55.67216391804098,55.72213893053473,55.77211394302849,55.82208895552224,55.87206396801599,55.92203898050975,55.9720139930035,56.021989005497254,56.07196401799101,56.12193903048476,56.171914042978514,56.22188905547226,56.271864067966014,56.32183908045977,56.37181409295352,56.421789105447274,56.47176411794103,56.52173913043478,56.571714142928535,56.62168915542229,56.67166416791604,56.721639180409795,56.77161419290355,56.8215892053973,56.871564217891056,56.92153923038481,56.97151424287856,57.021489255372316,57.07146426786607,57.12143928035982,57.17141429285358,57.22138930534732,57.271364317841076,57.32133933033483,57.37131434282858,57.42128935532234,57.47126436781609,57.521239380309844,57.5712143928036,57.62118940529735,57.671164417791104,57.72113943028486,57.77111444277861,57.821089455272364,57.87106446776612,57.92103948025987,57.971014492753625,58.02098950524738,58.07096451774113,58.120939530234885,58.17091454272864,58.22088955522239,58.27086456771614,58.32083958020989,58.370814592703645,58.4207896051974,58.47076461769115,58.520739630184906,58.57071464267866,58.62068965517241,58.670664667666166,58.72063968015992,58.77061469265367,58.82058970514743,58.87056471764118,58.920539730134934,58.97051474262869,59.02048975512244,59.070464767616194,59.12043978010995,59.1704147926037,59.220389805097454,59.27036481759121,59.320339830084954,59.37031484257871,59.42028985507246,59.470264867566215,59.52023988005997,59.57021489255372,59.620189905047475,59.67016491754123,59.72013993003498,59.770114942528735,59.82008995502249,59.87006496751624,59.920039980009996,59.97001499250375,60.0199900049975,60.069965017491256,60.11994002998501,60.16991504247876,60.21989005497252,60.26986506746627,60.31984007996002,60.36981509245377,60.41979010494752,60.46976511744128,60.51974012993503,60.569715142428784,60.61969015492254,60.66966516741629,60.719640179910044,60.7696151924038,60.81959020489755,60.869565217391305,60.91954022988506,60.96951524237881,61.019490254872565,61.06946526736632,61.11944027986007,61.169415292353825,61.21939030484758,61.26936531734133,61.319340329835086,61.36931534232883,61.419290354822586,61.46926536731634,61.51924037981009,61.569215392303846,61.6191904047976,61.66916541729135,61.71914042978511,61.76911544227886,61.81909045477261,61.86906546726637,61.91904047976012,61.969015492253874,62.01899050474763,62.06896551724138,62.118940529735134,62.16891554222889,62.21889055472264,62.268865567216395,62.31884057971015,62.3688155922039,62.41879060469765,62.4687656171914,62.518740629685155,62.56871564217891,62.61869065467266,62.668665667166415,62.71864067966017,62.76861569215392,62.818590704647676,62.86856571714143,62.91854072963518,62.968515742128936,63.01849075462269,63.06846576711644,63.1184407796102,63.16841579210395,63.2183908045977,63.26836581709146,63.31834082958521,63.368315842078964,63.41829085457271,63.468265867066464,63.51824087956022,63.56821589205397,63.618190904547724,63.66816591704148,63.71814092953523,63.768115942028984,63.81809095452274,63.86806596701649,63.918040979510245,63.968015992004,64.01799100449774,64.0679660169915,64.11794102948525,64.16791604197901,64.21789105447276,64.26786606696652,64.31784107946027,64.36781609195403,64.41779110444777,64.46776611694153,64.51774112943528,64.56771614192904,64.61769115442279,64.66766616691655,64.7176411794103,64.76761619190405,64.8175912043978,64.86756621689156,64.91754122938531,64.96751624187905,65.01749125437281,65.06746626686656,65.11744127936032,65.16741629185407,65.21739130434783,65.26736631684157,65.31734132933533,65.36731634182908,65.41729135432284,65.46726636681659,65.51724137931035,65.5672163918041,65.61719140429786,65.6671664167916,65.71714142928536,65.76711644177911,65.81709145427287,65.86706646676662,65.91704147926038,65.96701649175412,66.01699150424787,66.06696651674163,66.11694152923538,66.16691654172914,66.21689155422288,66.26686656671664,66.31684157921039,66.36681659170415,66.4167916041979,66.46676661669166,66.5167416291854,66.56671664167916,66.61669165417291,66.66666666666667,66.71664167916042,66.76661669165418,66.81659170414792,66.86656671664169,66.91654172913543,66.96651674162919,67.01649175412294,67.06646676661668,67.11644177911045,67.16641679160419,67.21639180409795,67.2663668165917,67.31634182908546,67.3663168415792,67.41629185407297,67.46626686656671,67.51624187906047,67.56621689155422,67.61619190404798,67.66616691654173,67.71614192903549,67.76611694152923,67.816091954023,67.86606696651674,67.9160419790105,67.96601699150425,68.01599200399801,68.06596701649175,68.1159420289855,68.16591704147926,68.21589205397301,68.26586706646677,68.31584207896051,68.36581709145428,68.41579210394802,68.46576711644178,68.51574212893553,68.56571714142929,68.61569215392304,68.6656671664168,68.71564217891054,68.7656171914043,68.81559220389805,68.86556721639181,68.91554222888556,68.96551724137932,69.01549225387306,69.06546726636682,69.11544227886057,69.16541729135432,69.21539230384808,69.26536731634182,69.31534232883558,69.36531734132933,69.41529235382309,69.46526736631684,69.5152423788106,69.56521739130434,69.6151924037981,69.66516741629185,69.71514242878561,69.76511744127936,69.81509245377312,69.86506746626686,69.91504247876063,69.96501749125437,70.01499250374813,70.06496751624188,70.11494252873563,70.16491754122939,70.21489255372313,70.26486756621689,70.31484257871064,70.3648175912044,70.41479260369815,70.4647676161919,70.51474262868565,70.56471764117941,70.61469265367316,70.66466766616692,70.71464267866067,70.76461769115443,70.81459270364817,70.86456771614193,70.91454272863568,70.96451774112944,71.01449275362319,71.06446776611695,71.1144427786107,71.16441779110444,71.2143928035982,71.26436781609195,71.31434282858571,71.36431784107945,71.41429285357322,71.46426786606696,71.51424287856072,71.56421789105447,71.61419290354823,71.66416791604198,71.71414292853574,71.76411794102948,71.81409295352324,71.86406796601699,71.91404297851075,71.9640179910045,72.01399300349826,72.063968015992,72.11394302848576,72.16391804097951,72.21389305347326,72.26386806596702,72.31384307846076,72.36381809095452,72.41379310344827,72.46376811594203,72.51374312843578,72.56371814092954,72.61369315342328,72.66366816591704,72.71364317841079,72.76361819090455,72.8135932033983,72.86356821589206,72.9135432283858,72.96351824087957,73.01349325337331,73.06346826586707,73.11344327836082,73.16341829085458,73.21339330334833,73.26336831584207,73.31334332833583,73.36331834082958,73.41329335332334,73.46326836581709,73.51324337831085,73.5632183908046,73.61319340329835,73.6631684157921,73.71314342828586,73.7631184407796,73.81309345327337,73.86306846576711,73.91304347826087,73.96301849075462,74.01299350324838,74.06296851574213,74.11294352823589,74.16291854072963,74.2128935532234,74.26286856571714,74.31284357821089,74.36281859070465,74.4127936031984,74.46276861569216,74.5127436281859,74.56271864067966,74.61269365317341,74.66266866566717,74.71264367816092,74.76261869065468,74.81259370314842,74.86256871564218,74.91254372813593,74.96251874062969,75.01249375312344,75.0624687656172,75.11244377811094,75.1624187906047,75.21239380309845,75.2623688155922,75.31234382808596,75.3623188405797,75.41229385307346,75.46226886556721,75.51224387806097,75.56221889055472,75.61219390304848,75.66216891554222,75.71214392803599,75.76211894052973,75.81209395302349,75.86206896551724,75.912043978011,75.96201899050475,76.0119940029985,76.06196901549225,76.11194402798601,76.16191904047976,76.21189405297352,76.26186906546727,76.31184407796101,76.36181909045477,76.41179410294852,76.46176911544228,76.51174412793603,76.56171914042979,76.61169415292353,76.6616691654173,76.71164417791104,76.7616191904048,76.81159420289855,76.86156921539231,76.91154422788605,76.96151924037981,77.01149425287356,77.06146926536732,77.11144427786107,77.16141929035483,77.21139430284857,77.26136931534234,77.31134432783608,77.36131934032983,77.41129435282359,77.46126936531734,77.5112443778111,77.56121939030484,77.6111944027986,77.66116941529235,77.71114442778611,77.76111944027986,77.81109445277362,77.86106946526736,77.91104447776112,77.96101949025487,78.01099450274863,78.06096951524238,78.11094452773614,78.16091954022988,78.21089455272364,78.26086956521739,78.31084457771115,78.3608195902049,78.41079460269864,78.4607696151924,78.51074462768615,78.56071964017991,78.61069465267366,78.66066966516742,78.71064467766116,78.76061969015493,78.81059470264867,78.86056971514243,78.91054472763618,78.96051974012994,79.01049475262369,79.06046976511745,79.11044477761119,79.16041979010495,79.2103948025987,79.26036981509246,79.3103448275862,79.36031984007997,79.41029485257371,79.46026986506746,79.51024487756122,79.56021989005497,79.61019490254873,79.66016991504247,79.71014492753623,79.76011994002998,79.81009495252374,79.86006996501749,79.91004497751125,79.960019990005,80.00999500249875,80.0599700149925,80.10994502748626,80.15992003998001,80.20989505247377,80.25987006496752,80.30984507746128,80.35982008995502,80.40979510244878,80.45977011494253,80.50974512743628,80.55972013993004,80.60969515242378,80.65967016491754,80.70964517741129,80.75962018990505,80.8095952023988,80.85957021489256,80.9095452273863,80.95952023988006,81.00949525237381,81.05947026486757,81.10944527736132,81.15942028985508,81.20939530234882,81.25937031484258,81.30934532733633,81.35932033983009,81.40929535232384,81.45927036481758,81.50924537731134,81.55922038980509,81.60919540229885,81.6591704147926,81.70914542728636,81.7591204397801,81.80909545227387,81.85907046476761,81.90904547726137,81.95902048975512,82.00899550224888,82.05897051474263,82.10894552723639,82.15892053973013,82.2088955522239,82.25887056471764,82.3088455772114,82.35882058970515,82.40879560219891,82.45877061469265,82.5087456271864,82.55872063968016,82.6086956521739,82.65867066466767,82.70864567716141,82.75862068965517,82.80859570214892,82.85857071464268,82.90854572713643,82.95852073963019,83.00849575212393,83.0584707646177,83.10844577711144,83.1584207896052,83.20839580209895,83.25837081459271,83.30834582708646,83.35832083958022,83.40829585207396,83.45827086456772,83.50824587706147,83.55822088955522,83.60819590204898,83.65817091454272,83.70814592703648,83.75812093953023,83.80809595202399,83.85807096451774,83.9080459770115,83.95802098950524,84.007996001999,84.05797101449275,84.10794602698651,84.15792103948026,84.20789605197402,84.25787106446776,84.30784607696152,84.35782108945527,84.40779610194903,84.45777111444278,84.50774612693654,84.55772113943029,84.60769615192403,84.65767116441779,84.70764617691154,84.7576211894053,84.80759620189905,84.8575712143928,84.90754622688655,84.95752123938031,85.00749625187406,85.05747126436782,85.10744627686157,85.15742128935533,85.20739630184907,85.25737131434283,85.30734632683658,85.35732133933034,85.40729635182409,85.45727136431785,85.5072463768116,85.55722138930535,85.6071964017991,85.65717141429285,85.70714642678661,85.75712143928035,85.80709645177411,85.85707146426786,85.90704647676162,85.95702148925537,86.00699650174913,86.05697151424287,86.10694652673664,86.15692153923038,86.20689655172414,86.25687156421789,86.30684657671165,86.3568215892054,86.40679660169916,86.4567716141929,86.50674662668666,86.55672163918041,86.60669665167416,86.65667166416792,86.70664667666166,86.75662168915542,86.80659670164917,86.85657171414293,86.90654672663668,86.95652173913044,87.00649675162418,87.05647176411794,87.10644677661169,87.15642178910545,87.2063968015992,87.25637181409296,87.3063468265867,87.35632183908046,87.40629685157421,87.45627186406797,87.50624687656172,87.55622188905548,87.60619690154923,87.65617191404297,87.70614692653673,87.75612193903048,87.80609695152424,87.85607196401799,87.90604697651175,87.95602198900549,88.00599700149925,88.055972013993,88.10594702648676,88.1559220389805,88.20589705147427,88.25587206396801,88.30584707646177,88.35582208895552,88.40579710144928,88.45577211394303,88.50574712643679,88.55572213893053,88.6056971514243,88.65567216391804,88.70564717641179,88.75562218890555,88.8055972013993,88.85557221389305,88.9055472263868,88.95552223888056,89.00549725137431,89.05547226386807,89.10544727636182,89.15542228885558,89.20539730134932,89.25537231384308,89.30534732633683,89.35532233883059,89.40529735132434,89.4552723638181,89.50524737631184,89.5552223888056,89.60519740129935,89.65517241379311,89.70514742628686,89.7551224387806,89.80509745127436,89.85507246376811,89.90504747626187,89.95502248875562,90.00499750124938,90.05497251374312,90.10494752623688,90.15492253873063,90.20489755122439,90.25487256371814,90.3048475762119,90.35482258870564,90.4047976011994,90.45477261369315,90.50474762618691,90.55472263868066,90.60469765117442,90.65467266366817,90.70464767616193,90.75462268865567,90.80459770114942,90.85457271364318,90.90454772613693,90.95452273863069,91.00449775112443,91.0544727636182,91.10444777611194,91.1544227886057,91.20439780109945,91.2543728135932,91.30434782608695,91.35432283858071,91.40429785107446,91.45427286356822,91.50424787606197,91.55422288855573,91.60419790104947,91.65417291354323,91.70414792603698,91.75412293853073,91.80409795102449,91.85407296351823,91.904047976012,91.95402298850574,92.0039980009995,92.05397301349325,92.10394802598701,92.15392303848076,92.20389805097452,92.25387306346826,92.30384807596202,92.35382308845577,92.40379810094953,92.45377311344328,92.50374812593704,92.55372313843078,92.60369815092454,92.65367316341829,92.70364817591205,92.7536231884058,92.80359820089954,92.8535732133933,92.90354822588705,92.95352323838081,93.00349825087456,93.05347326336832,93.10344827586206,93.15342328835582,93.20339830084957,93.25337331334333,93.30334832583708,93.35332333833084,93.40329835082458,93.45327336331835,93.50324837581209,93.55322338830585,93.6031984007996,93.65317341329336,93.7031484257871,93.75312343828087,93.80309845077461,93.85307346326836,93.90304847576212,93.95302348825587,94.00299850074963,94.05297351324337,94.10294852573713,94.15292353823088,94.20289855072464,94.25287356321839,94.30284857571215,94.3528235882059,94.40279860069965,94.4527736131934,94.50274862568716,94.55272363818091,94.60269865067467,94.65267366316841,94.70264867566218,94.75262368815592,94.80259870064968,94.85257371314343,94.90254872563717,94.95252373813094,95.00249875062468,95.05247376311844,95.10244877561219,95.15242378810595,95.2023988005997,95.25237381309346,95.3023488255872,95.35232383808096,95.40229885057471,95.45227386306847,95.50224887556222,95.55222388805598,95.60219890054972,95.65217391304348,95.70214892553723,95.75212393803099,95.80209895052474,95.8520739630185,95.90204897551224,95.95202398800599,96.00199900049975,96.0519740129935,96.10194902548726,96.151924037981,96.20189905047476,96.25187406296851,96.30184907546227,96.35182408795602,96.40179910044978,96.45177411294353,96.50174912543729,96.55172413793103,96.60169915042479,96.65167416291854,96.7016491754123,96.75162418790605,96.8015992003998,96.85157421289355,96.90154922538731,96.95152423788106,97.0014992503748,97.05147426286857,97.10144927536231,97.15142428785607,97.20139930034982,97.25137431284358,97.30134932533733,97.35132433783109,97.40129935032483,97.4512743628186,97.50124937531234,97.5512243878061,97.60119940029985,97.65117441279361,97.70114942528735,97.75112443778112,97.80109945027486,97.85107446276862,97.90104947526237,97.95102448775611,98.00099950024988,98.05097451274362,98.10094952523738,98.15092453773113,98.20089955022489,98.25087456271864,98.3008495752124,98.35082458770614,98.4007996001999,98.45077461269365,98.50074962518741,98.55072463768116,98.60069965017492,98.65067466266866,98.70064967516242,98.75062468765617,98.80059970014993,98.85057471264368,98.90054972513744,98.95052473763118,99.00049975012493,99.05047476261869,99.10044977511244,99.1504247876062,99.20039980009994,99.2503748125937,99.30034982508745,99.35032483758121,99.40029985007496,99.45027486256872,99.50024987506247,99.55022488755623,99.60019990004997,99.65017491254373,99.70014992503748,99.75012493753124,99.80009995002499,99.85007496251875,99.9000499750125,99.95002498750625,100.0]}
},{}],33:[function(require,module,exports){
module.exports={"expected":[-0.00012456166817413633,0.0004485363190720794,-0.00017370827106411615,-0.00033371098985048416,0.0003960794276259615,7.070922033827375e-5,-0.00044381646165508724,0.00022451289188387877,0.0002951771893628472,-0.0004213310341718492,-1.5306201729055812e-5,0.00043224605453137736,-0.0002723127380086448,-0.0002517802428141902,0.00044033697192269206,-4.081280581228234e-5,-0.0004139427829786389,0.0003163500852671505,0.00020414214667276422,-0.0004527520191807128,9.679505815467949e-5,0.0003891281535495211,-0.00035591808131396705,-0.00015295505533659607,0.0004583285848238975,-0.0001517824796260571,-0.0003581250181319909,0.00039037195131701446,9.897134727210262e-5,-0.0004569213254009395,0.00020492468500101838,0.00032135353708778817,-0.0004191393570243477,-4.29926906881224e-5,0.00044849024875725667,-0.00025539199702521716,-0.00027932562932896267,0.0004417297450081565,-1.4141734110297437e-5,-0.0004331022442213629,0.0003023882621858372,0.00023263798046580558,-0.000457742533774014,7.156768447441117e-5,0.00041093100265587174,-0.0003451632688212084,-0.0001819637025590335,0.0004668740057011242,-0.00012840879444002393,-0.00038225531370002734,0.00038302457600337145,0.00012804276017808685,-0.00046892278820837024,0.00018378981125359985,0.00034745575194722317,-0.0004153485689011816,-7.167129709387688e-5,0.0004637938288719342,-0.0002368499314778339,-0.00030700978824197073,0.0004415905664349678,1.3690015693093893e-5,-0.0004515007911564774,0.0002867560355594167,0.0002614853863877762,-0.00046129381985587074,4.502822317389798e-5,0.00043216682064953324,-0.0003327156195349021,-0.00021153316895525847,0.000474097256239904,-0.00010359139897942509,-0.00040602365586887157,0.00037398922538575506,0.0001578772582215507,-0.00047974183857938047,0.00016110173738841538,0.0003734090824891023,-0.0004099021773953018,-0.00010130491919904906,0.0004780754339262904,-0.000216669323847829,-0.00033476275484213515,0.00043985544066247337,4.265515091544096e-5,-0.00046905610262283984,0.0002694257206448756,0.0002906204334056127,-0.0004633354295648641,1.719361073401099e-5,0.0004527537447291062,-0.000318537381340959,-0.00024160671133976848,0.0004799226083029125,-7.733650038442338e-5,-0.0004293500639941509,0.00036321865772150574,0.00018842632658484364,-0.0004892987424923938,0.00013685575037981405,0.00039913683476174564,-0.0004027441987402949,-0.00013185417824028594,0.0004912526798820674,-0.0001948345377183081,-0.0003625124826838629,0.00043646054832369375,7.272418655424063e-5,-0.0004856845593808922,0.00025037094414381085,0.0003199770156595405,-0.00046379675926683223,-1.1917154553437444e-5,0.00047260837039280227,-0.0003025918191997055,-0.0002721253666324918,0.0004842738536530704,-4.96521941775743e-5,-0.0004521528086444286,0.00035066633563768645,0.00021963923439861674,-0.0004975129761029134,0.00011104881305088553,0.0004245603999014984,-0.00039381902930526227,-0.00016327753200737145,0.0005032421044814115,-0.00017133136556089733,-0.0003901848888360297,0.0004313421215273247,0.00010386557434102734,-0.0005013012032192575,0.00022956648570499172,0.00034948691644292706,-0.0004626069309715108,-4.2283156664285e-5,0.0004916457268359846,-0.00028484305221613816,-0.0003030280354270631,0.0004870741939521858,-2.0548305944674597e-5,-0.0004743484052807341,0.0003362862609105027,0.0002514631384894882,-0.0005043031269140812,8.36793926531448e-5,0.00044959926797750067,-0.0003830712805127985,-0.00019553139906074298,0.000513959082262885,-0.0001461468457153575,-0.0004177038896086314,0.0004244362816055426,0.00013604584736876386,-0.0005158196685269618,0.00020698808518880522,0.0003790798673126206,-0.00045969463584213173,-7.388172644203076e-5,0.0005097792277739571,-0.0002652558534504313,-0.00033425156570982033,0.00048824609316607974,9.96379237790855e-6,-0.0004958515869522188,0.00032003276946225264,0.00028384319260983036,-0.0005095867583742871,5.4747259339822434e-5,0.00047417102504542804,-0.00037044557201949184,-0.00022857029398719807,0.0005233177047583111,-0.00011926904481589921,-0.00044499142425314325,0.00041567883381718815,0.0001692297814612144,-0.0005291520815489374,0.00018261221128355363,0.00040868360045341666,-0.0004549879340620999,-0.00010668862868584863,0.0005269205932043179,-0.0002437954074460275,-0.0003657308355737295,0.00048771108649920666,4.187139440292516e-5,-0.0005165752519293346,0.0003018602809907197,0.00031672266177951364,-0.0005132802319913924,2.42532509194827e-5,0.0004981913298579033,-0.000355886277094324,-0.00026234697418496127,0.0005312306200468168,-9.068680123431466e-5,-0.0004719674637152419,0.0004050050125443303,0.00020338057468064497,-0.0005412089217153614,0.00015641578627025986,0.0004382238921207425,-0.0004484140043083215,-0.00014067827407813113,0.0005429797368433264,-0.00022042701953752563,-0.0003973988335899183,0.00048538953893378776,7.516070269542579e-5,-0.0005364303814904181,0.00028172299663471544,0.000350043041341552,-0.0005152984799977097,-7.801000407762146e-6,0.000521573866060382,-0.0003393372130185621,-0.00029681259878702065,0.0005376088247982569,-6.038942428545137e-5,-0.0004985500010211604,0.0003923491693388424,0.00023846004666525875,-0.0005518988384253565,0.00012837586074931423,0.0004676245946158323,-0.00043989883483650514,-0.00017582395876365638,0.0005578646130234418,-0.00019511576988824847,-0.0004291867352927588,0.0004812003451710532,0.00010981710765263008,-0.0005553259222132413,0.0002595745368309426,0.00038374418029128623,-0.0005155547203066365,-4.1413384460164684e-5,0.0005442302649539507,-0.0003207412679768389,-0.00033191690049243184,0.0005423614006606293,-2.8366342914278037e-5,-0.0005246550192643582,0.00037764439471893587,0.0002744288598432371,-0.0005611284154307029,9.846923094611996e-5,0.0004968076538069981,-0.00042936684666144666,-0.00021209813497523837,0.0005714810156756065,-0.00016782610382756792,-0.00046102397397605185,0.0004750605611994852,0.00014582550663002364,-0.0005731686260681292,0.00023536750998938714,0.0004177644084027761,-0.0005139601039155561,-7.658167879819882e-5,0.0005660699929854685,-0.00030003995423297263,-0.0003676083712641698,0.000545395185273537,5.393303672148185e-6,-0.0005501964324141239,0.0003608220628293908,0.0003112467650252817,-0.0005688018734452578,6.66719897233761e-5,0.0005256931086616965,-0.0004167404374311668,-0.0002494727168123518,0.0005837323205899436,-0.00013852134836638466,-0.0004928383036931595,0.00046688495577864464,0.00018317066908393577,-0.0005898628403054575,0.00020905300071418143,0.0004520406666265192,-0.0005104232829475933,-0.00011330397120295386,0.0005870001969956307,-0.0002771728753189477,-0.00040383446310245585,0.0005466143662484645,4.0901142535133084e-5,-0.0005750859932436706,0.00034181128585932284,0.0003488728744309019,-0.0005748206997252689,3.2959000591197204e-5,0.0005541990685870974,-0.00040193943226748524,-0.000287919426178665,0.0005945191603775274,-0.00010716314265709941,-0.0005245558519694641,0.00045658546771951033,0.00022183765473448932,-0.0006053102375192277,0.00018057996394952488,0.00048650864018616,-0.0005048498850934226,-0.0001515791479480414,0.0006069254988501045,-0.00025207709238713225,-0.00044054180540769244,0.0005459199840427669,7.817012174517948e-5,-0.0005992331615359451,0.0003205382623575068,0.0003872659659095396,-0.0005790831910288816,-2.6967182962459274e-6,0.0005822416635436168,-0.0003848804249405658,-0.0003274101849937627,0.0006037390193522763,-7.37107675413901e-5,-0.0005561011592703283,0.0004440705518487528,0.00026181229330904507,-0.0006194094742598853,0.00014989450848765167,0.0005211028937362893,-0.000497141877174878,-0.00019140745889077528,0.0006257477293319169,-0.00022468637166690635,-0.0004776764408442629,0.0005432093266426345,0.00011721515682433612,-0.0006225449242982003,0.00029692550013021596,0.0004263848229936368,-0.0005814838934401476,-4.032471603723474e-5,0.0006097349608639508,-0.0003654759891157782,-0.00036791756120142116,0.0006112857327945965,-3.812035602664286e-5,-0.0005873972016811067,0.00042924439278511656,0.0003030817363653981,-0.0006320557640548405,0.00011693904959428937,0.000555757007875549,-0.00048719679674499774,-0.00023279117292036297,0.0006433655889802109,-0.00019493029092440637,-0.0005151840821071842,0.0005383751951826252,0.000158053885442217,-0.0006449255579313964,0.0002708908900729826,0.00046618861653912046,-0.0005819129188700316,-7.995795627767648e-5,0.0006365908414076816,-0.0003436337348314409,-0.00040941527786089184,0.0006170488715872453,-3.4396238365693364e-7,-0.0006183653925285538,0.00041200596092519533,0.0003456350941564253,-0.0006431403475253614,8.16513058467855e-5,0.0005904037162213398,-0.0004749068258311929,-0.0002757353404600831,0.0006596742207963513,-0.0001627331777239013,-0.0005530103926260722,0.0005313050148494895,0.00020070755080561287,-0.000666276320043661,0.00024234660179861604,0.0005066373351142866,-0.0005802551133967092,-0.00012163381399387592,0.0006627188260415063,-0.00031925517957707446,-0.0004518787968596433,0.0006209129888183405,3.967153771137284e-5,-0.0006489255577462528,0.00039224787902661867,0.0003894641736163504,-0.0006525498382705992,4.396310937883601e-5,0.00062497504214829,-0.0004601576748217366,-0.0003202486837468762,0.0006745646762273069,-0.0001280128458016495,-0.0005911012950484771,0.0005218797593382275,0.0002452020391133128,-0.0006864950557307215,0.0002111977649356838,0.000547692273100128,-0.0005763890466927572,-0.00016539525169769557,0.0006880258413481077,-0.000292234395957088,-0.0004952859916460453,0.0006227566993431686,8.198575029240206e-5,-0.0006789958786141356,0.0003698550601189606,0.0004345643375383374,-0.0006601654180598565,3.798991176725682e-6,0.0006594024341622075,-0.000442827236699072,-0.0003663446407629654,0.0006879232513513908,-9.067908756389645e-5,-0.0006294033123753893,0.0005099726493462989,0.0002915691027750374,-0.0007054756994778026,0.0001773408910287198,0.0005893165877776671,-0.0005701857842049062,-0.00021129221249545688,0.0007124159107911405,-0.0002624563884490558,-0.0005396179270638326,0.0006224515561055044,0.00012666631240467653,-0.0007084927939985744,0.00034470306762769025,0.00048093551014244504,-0.0006658618482844193,-3.8925506638762455e-5,0.0006936168987149291,-0.00042278396178207416,-0.00041404259531758195,0.0006996306644182158,-5.063187003643488e-5,-0.0006678639479625238,0.000495447575570884,0.0003398478092533135,-0.0007231076491104179,0.0001406619794213257,0.0006314759396580153,-0.0005615073939656795,-0.00025938327710763466,0.0007357897541149982,-0.0002297951395332963,-0.000584859769133401,0.0006198606777279072,0.00017379074169197837,-0.0007373308522747821,0.00031665613585580877,0.0005285833608709029,-0.0006695062560870872,-8.430585217840328e-5,0.0007275491290585265,-0.0003998848901376244,-0.00046336933438106953,0.0007095610384118557,-7.75916771947288e-6,-0.0007064321123344968,0.00047815718365721405,0.00039008626597529603,-0.0007392749820839392,0.00010103423551010707,0.0006741392341983467,-0.0005502051271990107,-0.0003097376445559679,0.0007580442732704699,-0.00019411124953493396,-0.0006310018538217974,0.0006148370697758587,0.00022344865491130653,-0.0007654225005863134,0.00028556477236704487,0.0005775207069177935,-0.0006709566424612329,-0.00013245095585173036,0.0007611296284635723,-0.00037397326182992335,-0.0005143607850012877,0.0007175806425271957,3.8065652320656336e-5,-0.0007450586070384055,0.00045794054152902095,0.00044234368563577487,-0.0007538554763697327,5.8315310104981454e-5,0.000717279488131591,-0.0005361171952083469,-0.00036243751272811036,0.0007790718972772163,-0.000155249073629507,-0.0006780409519903127,0.0006072215662181262,0.00027574444313245496,-0.0007926777957749918,0.0002512628419831064,0.0006277691863882861,-0.0006700600449744519,-0.0001834861117745654,0.000794288825775187,-0.0003448756028182626,-0.000567064097938486,0.0007235463335701548,8.698700169671053e-5,-0.0007836966787628592,0.0004346202870745869,0.0004966928745054416,-0.0007667193875943131,1.2343942697224056e-5,0.0007608748503678707,-0.0005190660430132672,-0.00041758095686709096,0.0007987597506586073,-0.00011303323180833755,-0.0007259817784811798,0.0005968402965700792,0.00033080051668238846,-0.0008190040169196047,0.00021356400318583724,0.0006793612690999517,-0.0006666502683640411,-0.0002375565758217347,0.0008269571808112885,-0.000312398154606676,-0.0006215401648126207,0.0007273036211717714,0.00013917093862373154,-0.0008223026609488164,0.00040799912429235254,0.0005532232507290031,-0.0007777279199740055,-3.706414313367566e-5,0.0008049098163878196,-0.0004988549908266503,-0.0004752854331439743,0.000816988599711263,-6.726433070043813e-5,-0.0007748388077058107,0.0005835015561140858,0.00038876126673274906,-0.0008443051535447506,0.0001722573290108936,0.0007323426922566649,-0.000660545070262788,-0.00029483194600332966,0.0008590652764856759,-0.000276322475945554,-0.0006778666819351168,0.0007286842577456566,0.0001948099155161718,-0.0008608367254843519,0.00037785549586455105,0.0006120445323308066,-0.0007867313096117011,-9.012129041853215e-5,0.0008493766871179257,-0.00047526407493905326,-0.0005356920736943555,0.0008336315168993461,-1.7713686395006457e-5,-0.0008246384775051377,0.0005669919186844694,0.00044979793607755265,-0.0008684812356296175,0.00012710189225876418,0.000786775435562244,-0.0006515426541892085,-0.00035551156276490074,0.0008905438936950091,-0.0002363999909853572,-0.0007361419097074306,0.0007275032230025167,0.0002541286470554513,-0.0008992637743603523,0.00034393820568986375,0.0006732912790951917,-0.0007935664129593309,-0.00014707416700905144,0.0008942773396766021,-0.00044804486581438805,-0.000598970992842504,0.000848552184645008,3.58832303209993e-5,-0.0008754218895060851,0.0005470713798517421,0.0005141146539167053,-0.0008914274607267569,7.782002349823515e-5,0.000842741387658368,-0.0006394172739397751,-0.0004198312177610088,0.0009213240638593112,-0.0001923451845589495,-0.0007964893253653697,0.0007235549302334848,0.00031739141873913477,-0.0009375545111457186,0.00030595969023145366,0.000737128533461601,-0.0007980536578778951,-0.00020821157943568566,0.0009396253999222684,-0.0004169139673056412,-0.0006653278976281883,0.0008616027336186371,9.383499816905384e-5,-0.0009272481506285773,0.0005234672471390933,0.0005819559753028539,-0.0009130330585740554,2.408885187451331e-5,0.0009003469073194987,-0.0006239136872178456,-0.0004880715577518202,0.0009513370924149846,-0.00014382704323060214,-0.0008590634345313574,0.0007166084225512762,0.000384911265687759,-0.0009756867459868408,0.00026358753395412454,0.0008037588902287548,-0.000799993165609784,-0.00027387431108503643,0.0009854489380689735,-0.00038154479809130717,-0.0007350123978761266,0.0008726209741890288,0.0001565046008188065,-0.000980198551191728,0.0004958663946117935,0.0006536163857225062,-0.0009331798127442013,-3.4470398842348966e-5,0.0009597285548784803,-0.0006047401035927985,-0.000560568707523518,0.0009805145443330166,-9.045819783037602e-5,-0.0009240571019187258,0.0007064012445161511,0.0004570616055293964,-0.0010136470072727609,0.0002164336785943075,0.0008734314438317912,-0.0007991597828927923,-0.0003444676229596536,0.0010317938527584255,-0.0003415571116210217,-0.0008083285550187401,0.0008814268283013175,0.00022432261873191233,-0.0010343818467806337,0.0004639053588795084,0.0007294524006357697,-0.0009517401293956868,-9.830608122277898e-5,0.0010210603713882468,-0.0005815591404862235,-0.0006377278303527933,0.0010087881795774023,-3.1781020293844424e-5,-0.0009917108962841142,0.0006926315569370302,0.000534291128220437,-0.0010514325607661355,0.00016404056882303458,0.0009464532314650014,-0.0007952966649720858,-0.00042047729721402774,0.0010787281719488128,-0.000296503504019921,-0.0008856484146069101,0.0008878176955528182,0.0002978042049458165,-0.0010899410137170887,0.0004271575525692051,0.0008098981325968859,-0.000968574500905952,-0.00016795376388856255,0.0010845632295607658,-0.0005539761120188006,-0.00072004062440203,0.0010360898218713251,3.2750364522243604e-5,-0.0010623251389058972,0.0006749478930355778,0.0006171430617178392,-0.0010890539769312525,0.0001058631775154153,0.0010232040353603227,-0.000788106907797335,-0.0005024904538550386,0.0011263475902021603,-0.0002458518596010785,-0.0009674295658691278,0.000891562380563817,0.0003775711734426736,-0.001147061997215636,0.0003851165789799142,0.0008954855519421678,-0.0009835281505735502,-0.0002440592490104013,0.0011505169942555408,-0.0005215236999209037,-0.0008081081622102554,0.001062351137494892,0.0001037936187010369,-0.0011362756290627823,0.0006529357057300633,0.0007062803956424131,-0.0011265384457573007,4.124541447799306e-5,0.001104155767477257,-0.0007772425182842924,-0.0005912228861615011,0.0011747826962334998,-0.00018896224195460827,-0.0010542382116127636,0.000892393051347432,0.0004643810914025477,-0.0012059851918136937,0.0003371741993800588,0.0009868711899399915,-0.0009964265533721171,-0.00032740898028303097,0.0012192765472632645,-0.0004836416465879647,-0.0009026710876045519,0.0010875032909538349,0.00018214938513556257,-0.001214034443108361,0.0006260994856623769,0.0008025193358197096,-0.0011639341257739643,-3.0611233712196184e-5,0.001189898197830279,-0.0007622896982636906,-0.0006875554315598233,0.0012242085457648628,-0.0001250560763474782,-0.001146779891949144,0.0008899944620173027,0.000559166112364569,-0.0012670207253608267,0.00028259085362547753,0.0010848718211618632,-0.0010070693901902256,-0.00041897076508874264,0.0012912932099202973,-0.0004396494918928274,-0.0010046501030235248,0.0011114764293958333,0.0002688032011894827,-0.0012961978455399727,0.0005938386676472211,0.0009068743121164311,-0.0012013159468612525,-0.00011068998385703361,0.001281173607232969,-0.0007427489401278721,-0.0007925830715857579,0.0012748575420049957,-5.3174456752931195e-5,-0.001245941015453367,0.0008839893111688632,0.0006630855836360853,-0.0013305691267389407,0.00022045563547311493,0.001190512872775012,-0.0010152222814007103,-0.0005199491373502018,0.0013671438349804213,-0.0003887094212901264,-0.0011152010986612878,0.0011341989245123956,0.00036498268825800454,-0.0013835243441990286,0.0005554146723408574,0.0010206194901172033,-0.0012387934928238416,-0.00020021665968386048,0.0013789242202030235,-0.0007180076884251345,-0.0009076822889600812,0.0013270370654889987,2.7879170267855555e-5,-0.0013528459304808236,0.0008739180408220478,0.0007775984917953167,-0.0013971497553622913,0.00014963105556950126,0.0013050952108605398,-0.0010206053128353485,-0.0006318618958132099,0.0014475710019363037,-0.0003297747878091963,-0.0012357915145639765,0.0011555962640975325,0.0004722369314745313,-0.0014769874957254422,0.0005099050490576404,0.0011453743213680624,-0.0012765219175862408,-0.00030074039124785017,0.0014843583038672249,-0.0006873021361319154,-0.0010346051369381586,0.0013811540608216898,0.00011961922101145157,-0.0014689367972884246,0.0008592104729925433,0.0009045650677983454,-0.0014674406520044049,6.867540325256134e-5,0.0014302890161991652,-0.0010228768309867152,-0.0007566479151387555,0.0015335396280128349,-0.00026151743704354134,-0.0013683081525123545,0.0011755894261525138,0.0005925487899744965,-0.0015778506242123604,0.00045613843994926466,0.0012832248745383815,-0.001314717383360894,-0.00041424831227983067,0.0015990441358393129,-0.0006496627848852304,-0.001175613270402968,0.0014377500436850833,0.0002239925168205131,-0.0015960876771315493,0.0008391451868269648,0.0010463922414414228,-0.0015423355848493956,-2.4268647682825248e-5,0.0015682685271050762,-0.0010216100961604531,-0.00089682223463965,0.0016263184250944632,-0.0001822229188619299,-0.0015152126895599401,0.0011940924696269744,0.0007284972632769551,-0.0016877748883841015,0.00039260032831306163,0.001436899739089401,-0.001353679405780134,-0.0005433322264946662,0.0017250466235562887,-0.0006038351318764142,-0.00133367327403637,0.0014975521123324327,0.0003435456007555665,-0.001736771291677795,0.00081279000549713,0.0012062467508895973,-0.0016230276600917146,-0.00013163763824145251,0.0017219100642948428,-0.00101625886571144,-0.001055704531872975,0.0017275999726321886,-8.963573167844645e-5,-0.0016797715101844425,0.0012110089059382536,0.0008834980377314484,-0.0018089795025767355,0.00031729304252168383,0.0016100314892168405,-0.0013938240446039886,-0.0006914369601852669,0.0018651310544589696,-0.0005481611603211011,-0.0015127487185683905,0.001561549250651372,0.0004816755524014695,-0.0018943092305612375,0.0007789125176643558,0.001388375728226459,-0.00171113519295785,-0.0002566940802807168,0.001895090999768784,-0.0010061052980523963,-0.0012377649788820238,0.0018396826483312034,1.927558152519472e-5,-0.001866404920126553,0.0012262261124555546,0.0010621699752255114,-0.001944486098320289,0.00022752185752014347,0.001807556583127426,-0.0014357346714945806,-0.0008632412706060296,0.002023075948247241,-0.0004803970362291537,-0.001718249891405408,0.0016311099243953107,0.0006430173241968965,-0.002073258812710258,0.0007358414560358085,0.0015986038309784506,-0.00180889711028355,-0.00040391023840991827,0.0020931553303056706,-0.0009901786349749832,-0.001449164453931996,0.001965755148947577,0.00014868647147221216,-0.0020812349963641344,0.0012396064864991434,0.0012709118468380034,-0.0020985037872636152,0.00011955731303421825,0.002036347535888577,-0.0014802422836416086,-0.001065261923589826,0.0022041699143329958,-0.0003974230321248504,-0.001957750379336125,0.0017081696903955366,0.0008340629479795417,-0.0022800324632093463,0.0006812443135512643,0.0018451318510395577,-0.001919487309381664,-0.0005795867604962659,0.0023236653300032733,-0.0009671236178624162,-0.0016986297334834783,0.0021103581690160213,0.0003045147547068961,-0.0023329777621587697,0.0012509729427486898,0.0015188449298456186,-0.0022770595549118475,-1.1918720415943296e-5,0.0023062516967374044,-0.0015285576469618195,-0.0013068500116493488,0.002416032579526081,-0.00029476325717711925,-0.002242175566487638,0.001795542883008963,0.0010641925074866318,-0.0025239308813735204,0.0006117555816293639,0.0021398741361190942,-0.002047542085281566,-0.0007928928619910753,0.0025976678506795447,-0.0009349782817713523,-0.0019989339832992884,0.002280166923792778,0.0004954370710155672,-0.0026344617922406752,0.0012600841012209052,0.001819424298168349,-0.0024890781036488014,-0.00017476407879320292,0.002631878458549123,-0.0015824990754146177,-0.0016019127413476626,0.002670036367036641,-0.00016575189468562404,-0.0025878704168812803,0.0018974660672278019,0.001347476173252693,-0.002818953038002398,0.0005223238430495113,0.002500812752963247,-0.0022000906716207525,-0.0010577061468329794,0.0029319394405921797,-0.0008907789395969425,-0.0023695346608832357,0.002485388841847612,0.0007347091416077469,-0.0030053545178221775,0.0012665895504637046,0.0021933465239831838,-0.00274833553419209,-0.0003811016092036691,0.0030358499820140007,-0.0016449077728799529,-0.0019720621544148742,0.0029839136141396757,0.0],"x":[-709.0895,-708.481626247505,-707.87375249501,-707.2658787425149,-706.65800499002,-706.050131237525,-705.4422574850299,-704.8343837325349,-704.22650998004,-703.6186362275449,-703.0107624750499,-702.4028887225548,-701.7950149700599,-701.1871412175649,-700.5792674650698,-699.9713937125748,-699.3635199600799,-698.7556462075848,-698.1477724550898,-697.5398987025948,-696.9320249500998,-696.3241511976048,-695.7162774451098,-695.1084036926147,-694.5005299401198,-693.8926561876248,-693.2847824351297,-692.6769086826347,-692.0690349301398,-691.4611611776447,-690.8532874251497,-690.2454136726546,-689.6375399201597,-689.0296661676647,-688.4217924151696,-687.8139186626746,-687.2060449101797,-686.5981711576846,-685.9902974051896,-685.3824236526946,-684.7745499001996,-684.1666761477046,-683.5588023952096,-682.9509286427145,-682.3430548902196,-681.7351811377246,-681.1273073852295,-680.5194336327345,-679.9115598802396,-679.3036861277445,-678.6958123752495,-678.0879386227545,-677.4800648702595,-676.8721911177645,-676.2643173652694,-675.6564436127744,-675.0485698602795,-674.4406961077844,-673.8328223552894,-673.2249486027944,-672.6170748502994,-672.0092010978044,-671.4013273453094,-670.7934535928143,-670.1855798403194,-669.5777060878244,-668.9698323353293,-668.3619585828343,-667.7540848303394,-667.1462110778443,-666.5383373253493,-665.9304635728543,-665.3225898203593,-664.7147160678643,-664.1068423153692,-663.4989685628742,-662.8910948103793,-662.2832210578842,-661.6753473053892,-661.0674735528942,-660.4595998003992,-659.8517260479042,-659.2438522954092,-658.6359785429141,-658.0281047904192,-657.4202310379242,-656.8123572854291,-656.2044835329341,-655.5966097804392,-654.9887360279441,-654.3808622754491,-653.772988522954,-653.1651147704591,-652.5572410179641,-651.949367265469,-651.341493512974,-650.7336197604791,-650.125746007984,-649.517872255489,-648.909998502994,-648.302124750499,-647.694250998004,-647.086377245509,-646.4785034930139,-645.870629740519,-645.262755988024,-644.6548822355289,-644.0470084830339,-643.439134730539,-642.8312609780439,-642.2233872255489,-641.6155134730539,-641.0076397205589,-640.3997659680639,-639.7918922155689,-639.1840184630738,-638.5761447105789,-637.9682709580838,-637.3603972055888,-636.7525234530938,-636.1446497005988,-635.5367759481038,-634.9289021956088,-634.3210284431137,-633.7131546906188,-633.1052809381238,-632.4974071856287,-631.8895334331337,-631.2816596806388,-630.6737859281437,-630.0659121756487,-629.4580384231537,-628.8501646706587,-628.2422909181637,-627.6344171656687,-627.0265434131736,-626.4186696606787,-625.8107959081836,-625.2029221556886,-624.5950484031936,-623.9871746506986,-623.3793008982036,-622.7714271457086,-622.1635533932135,-621.5556796407186,-620.9478058882236,-620.3399321357285,-619.7320583832335,-619.1241846307386,-618.5163108782435,-617.9084371257485,-617.3005633732535,-616.6926896207585,-616.0848158682635,-615.4769421157685,-614.8690683632734,-614.2611946107785,-613.6533208582835,-613.0454471057884,-612.4375733532934,-611.8296996007984,-611.2218258483034,-610.6139520958084,-610.0060783433133,-609.3982045908184,-608.7903308383234,-608.1824570858283,-607.5745833333333,-606.9667095808384,-606.3588358283433,-605.7509620758483,-605.1430883233533,-604.5352145708583,-603.9273408183633,-603.3194670658683,-602.7115933133732,-602.1037195608783,-601.4958458083833,-600.8879720558882,-600.2800983033932,-599.6722245508982,-599.0643507984032,-598.4564770459082,-597.8486032934131,-597.2407295409182,-596.6328557884232,-596.0249820359281,-595.4171082834331,-594.8092345309382,-594.2013607784431,-593.5934870259481,-592.985613273453,-592.3777395209581,-591.7698657684631,-591.161992015968,-590.554118263473,-589.9462445109781,-589.338370758483,-588.730497005988,-588.122623253493,-587.514749500998,-586.906875748503,-586.299001996008,-585.6911282435129,-585.083254491018,-584.475380738523,-583.8675069860279,-583.2596332335329,-582.651759481038,-582.0438857285429,-581.4360119760479,-580.8281382235529,-580.2202644710579,-579.6123907185629,-579.0045169660679,-578.3966432135728,-577.7887694610779,-577.1808957085829,-576.5730219560878,-575.9651482035928,-575.3572744510979,-574.7494006986028,-574.1415269461078,-573.5336531936127,-572.9257794411178,-572.3179056886228,-571.7100319361277,-571.1021581836327,-570.4942844311378,-569.8864106786427,-569.2785369261477,-568.6706631736527,-568.0627894211577,-567.4549156686627,-566.8470419161677,-566.2391681636726,-565.6312944111777,-565.0234206586827,-564.4155469061876,-563.8076731536926,-563.1997994011977,-562.5919256487026,-561.9840518962076,-561.3761781437125,-560.7683043912176,-560.1604306387226,-559.5525568862275,-558.9446831337325,-558.3368093812376,-557.7289356287425,-557.1210618762475,-556.5131881237525,-555.9053143712575,-555.2974406187625,-554.6895668662675,-554.0816931137724,-553.4738193612775,-552.8659456087825,-552.2580718562874,-551.6501981037924,-551.0423243512975,-550.4344505988024,-549.8265768463074,-549.2187030938123,-548.6108293413174,-548.0029555888224,-547.3950818363273,-546.7872080838323,-546.1793343313374,-545.5714605788423,-544.9635868263473,-544.3557130738523,-543.7478393213573,-543.1399655688623,-542.5320918163673,-541.9242180638722,-541.3163443113773,-540.7084705588823,-540.1005968063872,-539.4927230538922,-538.8848493013973,-538.2769755489022,-537.6691017964072,-537.0612280439121,-536.4533542914172,-535.8454805389222,-535.2376067864271,-534.6297330339321,-534.0218592814372,-533.4139855289421,-532.8061117764471,-532.1982380239521,-531.5903642714571,-530.9824905189621,-530.374616766467,-529.766743013972,-529.1588692614771,-528.550995508982,-527.943121756487,-527.335248003992,-526.727374251497,-526.119500499002,-525.511626746507,-524.9037529940119,-524.295879241517,-523.688005489022,-523.0801317365269,-522.4722579840319,-521.864384231537,-521.2565104790419,-520.6486367265469,-520.0407629740519,-519.4328892215569,-518.8250154690619,-518.2171417165669,-517.6092679640718,-517.0013942115769,-516.3935204590819,-515.7856467065868,-515.1777729540918,-514.5698992015969,-513.9620254491018,-513.3541516966068,-512.7462779441117,-512.1384041916168,-511.5305304391218,-510.92265668662674,-510.31478293413176,-509.7069091816367,-509.09903542914174,-508.4911616766467,-507.8832879241517,-507.2754141716567,-506.6675404191617,-506.05966666666666,-505.4517929141717,-504.84391916167664,-504.23604540918166,-503.6281716566866,-503.02029790419164,-502.4124241516966,-501.8045503992016,-501.1966766467066,-500.5888028942116,-499.98092914171656,-499.3730553892216,-498.76518163672654,-498.15730788423156,-497.5494341317365,-496.94156037924154,-496.3336866267465,-495.7258128742515,-495.1179391217565,-494.5100653692615,-493.90219161676646,-493.2943178642715,-492.68644411177644,-492.07857035928146,-491.4706966067864,-490.86282285429144,-490.2549491017964,-489.6470753493014,-489.0392015968064,-488.4313278443114,-487.82345409181636,-487.2155803393214,-486.60770658682634,-485.99983283433136,-485.3919590818363,-484.78408532934134,-484.1762115768463,-483.5683378243513,-482.9604640718563,-482.3525903193613,-481.74471656686626,-481.1368428143713,-480.52896906187624,-479.92109530938126,-479.3132215568862,-478.70534780439124,-478.0974740518962,-477.4896002994012,-476.8817265469062,-476.2738527944112,-475.66597904191616,-475.0581052894212,-474.45023153692614,-473.84235778443116,-473.2344840319361,-472.62661027944114,-472.0187365269461,-471.4108627744511,-470.8029890219561,-470.1951152694611,-469.58724151696606,-468.9793677644711,-468.37149401197604,-467.76362025948106,-467.155746506986,-466.54787275449104,-465.939999001996,-465.332125249501,-464.724251497006,-464.116377744511,-463.50850399201596,-462.900630239521,-462.29275648702594,-461.68488273453096,-461.0770089820359,-460.46913522954094,-459.8612614770459,-459.2533877245509,-458.6455139720559,-458.0376402195609,-457.42976646706586,-456.8218927145709,-456.21401896207584,-455.60614520958086,-454.9982714570858,-454.39039770459084,-453.7825239520958,-453.1746501996008,-452.5667764471058,-451.9589026946108,-451.35102894211576,-450.7431551896208,-450.13528143712574,-449.52740768463076,-448.9195339321357,-448.31166017964074,-447.7037864271457,-447.0959126746507,-446.4880389221557,-445.8801651696607,-445.27229141716566,-444.6644176646707,-444.05654391217564,-443.44867015968066,-442.8407964071856,-442.23292265469064,-441.6250489021956,-441.0171751497006,-440.4093013972056,-439.8014276447106,-439.19355389221556,-438.5856801397206,-437.97780638722554,-437.36993263473056,-436.7620588822355,-436.15418512974054,-435.5463113772455,-434.9384376247505,-434.3305638722555,-433.7226901197605,-433.11481636726546,-432.5069426147705,-431.89906886227544,-431.29119510978046,-430.6833213572854,-430.07544760479044,-429.4675738522954,-428.8597000998004,-428.2518263473054,-427.6439525948104,-427.03607884231536,-426.4282050898204,-425.82033133732534,-425.21245758483036,-424.6045838323353,-423.99671007984034,-423.3888363273453,-422.7809625748503,-422.1730888223553,-421.5652150698603,-420.95734131736526,-420.3494675648703,-419.74159381237524,-419.13372005988026,-418.5258463073852,-417.91797255489024,-417.3100988023952,-416.7022250499002,-416.0943512974052,-415.4864775449102,-414.87860379241516,-414.2707300399202,-413.66285628742514,-413.05498253493016,-412.4471087824351,-411.83923502994014,-411.2313612774451,-410.6234875249501,-410.0156137724551,-409.4077400199601,-408.79986626746506,-408.1919925149701,-407.58411876247504,-406.97624500998006,-406.368371257485,-405.76049750499004,-405.152623752495,-404.54475,-403.936876247505,-403.32900249501,-402.72112874251496,-402.11325499002,-401.50538123752494,-400.89750748502996,-400.2896337325349,-399.68175998003994,-399.0738862275449,-398.4660124750499,-397.8581387225549,-397.2502649700599,-396.64239121756486,-396.0345174650699,-395.42664371257484,-394.81876996007986,-394.2108962075848,-393.60302245508984,-392.9951487025948,-392.3872749500998,-391.7794011976048,-391.1715274451098,-390.56365369261476,-389.9557799401198,-389.34790618762474,-388.74003243512976,-388.1321586826347,-387.52428493013974,-386.9164111776447,-386.3085374251497,-385.7006636726547,-385.0927899201597,-384.48491616766466,-383.8770424151697,-383.26916866267464,-382.66129491017966,-382.0534211576846,-381.44554740518964,-380.8376736526946,-380.2297999001996,-379.6219261477046,-379.0140523952096,-378.40617864271456,-377.7983048902196,-377.19043113772454,-376.58255738522956,-375.9746836327345,-375.36680988023954,-374.7589361277445,-374.1510623752495,-373.5431886227545,-372.9353148702595,-372.32744111776447,-371.7195673652695,-371.11169361277445,-370.50381986027946,-369.8959461077844,-369.28807235528944,-368.6801986027944,-368.0723248502994,-367.4644510978044,-366.8565773453094,-366.24870359281437,-365.6408298403194,-365.03295608782435,-364.42508233532936,-363.8172085828343,-363.20933483033934,-362.6014610778443,-361.9935873253493,-361.3857135728543,-360.7778398203593,-360.16996606786427,-359.5620923153693,-358.95421856287425,-358.34634481037926,-357.7384710578842,-357.13059730538924,-356.5227235528942,-355.9148498003992,-355.3069760479042,-354.6991022954092,-354.09122854291417,-353.4833547904192,-352.87548103792415,-352.26760728542916,-351.6597335329341,-351.05185978043914,-350.4439860279441,-349.8361122754491,-349.2282385229541,-348.6203647704591,-348.01249101796407,-347.4046172654691,-346.79674351297405,-346.18886976047907,-345.580996007984,-344.97312225548905,-344.365248502994,-343.757374750499,-343.149500998004,-342.541627245509,-341.93375349301397,-341.325879740519,-340.71800598802395,-340.11013223552897,-339.5022584830339,-338.89438473053895,-338.2865109780439,-337.6786372255489,-337.0707634730539,-336.4628897205589,-335.85501596806387,-335.2471422155689,-334.63926846307385,-334.03139471057887,-333.4235209580838,-332.81564720558885,-332.2077734530938,-331.5998997005988,-330.9920259481038,-330.3841521956088,-329.77627844311377,-329.1684046906188,-328.56053093812375,-327.95265718562877,-327.3447834331337,-326.73690968063875,-326.1290359281437,-325.5211621756487,-324.9132884231537,-324.3054146706587,-323.69754091816367,-323.0896671656687,-322.48179341317365,-321.87391966067867,-321.2660459081836,-320.65817215568865,-320.0502984031936,-319.4424246506986,-318.8345508982036,-318.2266771457086,-317.61880339321357,-317.0109296407186,-316.40305588822355,-315.79518213572857,-315.1873083832335,-314.57943463073855,-313.9715608782435,-313.3636871257485,-312.7558133732535,-312.1479396207585,-311.54006586826347,-310.9321921157685,-310.32431836327345,-309.71644461077847,-309.10857085828343,-308.50069710578845,-307.8928233532934,-307.2849496007984,-306.6770758483034,-306.0692020958084,-305.46132834331337,-304.8534545908184,-304.24558083832335,-303.63770708582837,-303.02983333333333,-302.42195958083835,-301.8140858283433,-301.2062120758483,-300.5983383233533,-299.9904645708583,-299.38259081836327,-298.7747170658683,-298.16684331337325,-297.55896956087827,-296.95109580838323,-296.34322205588825,-295.7353483033932,-295.1274745508982,-294.5196007984032,-293.9117270459082,-293.30385329341317,-292.6959795409182,-292.08810578842315,-291.48023203592817,-290.87235828343313,-290.26448453093815,-289.6566107784431,-289.0487370259481,-288.4408632734531,-287.8329895209581,-287.22511576846307,-286.6172420159681,-286.00936826347305,-285.40149451097807,-284.79362075848303,-284.18574700598805,-283.577873253493,-282.96999950099803,-282.362125748503,-281.754251996008,-281.14637824351297,-280.538504491018,-279.93063073852295,-279.32275698602797,-278.71488323353293,-278.10700948103795,-277.4991357285429,-276.89126197604793,-276.2833882235529,-275.6755144710579,-275.06764071856287,-274.4597669660679,-273.85189321357285,-273.24401946107787,-272.63614570858283,-272.02827195608785,-271.4203982035928,-270.81252445109783,-270.2046506986028,-269.5967769461078,-268.98890319361277,-268.3810294411178,-267.77315568862275,-267.16528193612777,-266.55740818363273,-265.94953443113775,-265.3416606786427,-264.73378692614773,-264.1259131736527,-263.5180394211577,-262.91016566866267,-262.3022919161677,-261.69441816367265,-261.08654441117767,-260.47867065868263,-259.87079690618765,-259.2629231536926,-258.65504940119763,-258.0471756487026,-257.4393018962076,-256.83142814371257,-256.2235543912176,-255.61568063872255,-255.00780688622754,-254.39993313373253,-253.79205938123752,-253.1841856287425,-252.5763118762475,-251.9684381237525,-251.36056437125748,-250.75269061876247,-250.14481686626746,-249.53694311377245,-248.92906936127744,-248.32119560878243,-247.71332185628742,-247.1054481037924,-246.4975743512974,-245.8897005988024,-245.28182684630738,-244.67395309381237,-244.06607934131736,-243.45820558882235,-242.85033183632734,-242.24245808383233,-241.63458433133732,-241.0267105788423,-240.4188368263473,-239.8109630738523,-239.20308932135728,-238.59521556886227,-237.98734181636726,-237.37946806387225,-236.77159431137724,-236.16372055888223,-235.55584680638722,-234.9479730538922,-234.3400993013972,-233.7322255489022,-233.12435179640718,-232.51647804391217,-231.90860429141716,-231.30073053892215,-230.69285678642714,-230.08498303393213,-229.47710928143712,-228.8692355289421,-228.2613617764471,-227.6534880239521,-227.04561427145708,-226.43774051896207,-225.82986676646706,-225.22199301397205,-224.61411926147704,-224.00624550898203,-223.39837175648702,-222.790498003992,-222.182624251497,-221.574750499002,-220.96687674650698,-220.35900299401197,-219.75112924151696,-219.14325548902195,-218.53538173652694,-217.92750798403193,-217.31963423153692,-216.7117604790419,-216.1038867265469,-215.4960129740519,-214.88813922155688,-214.28026546906187,-213.67239171656686,-213.06451796407185,-212.45664421157684,-211.84877045908183,-211.24089670658682,-210.6330229540918,-210.0251492015968,-209.4172754491018,-208.80940169660678,-208.20152794411177,-207.59365419161676,-206.98578043912175,-206.37790668662674,-205.77003293413173,-205.16215918163672,-204.55428542914171,-203.9464116766467,-203.3385379241517,-202.73066417165668,-202.12279041916167,-201.51491666666666,-200.90704291417165,-200.29916916167664,-199.69129540918163,-199.08342165668662,-198.47554790419161,-197.8676741516966,-197.2598003992016,-196.65192664670658,-196.04405289421157,-195.43617914171656,-194.82830538922155,-194.22043163672654,-193.61255788423153,-193.00468413173652,-192.39681037924151,-191.7889366267465,-191.1810628742515,-190.57318912175649,-189.96531536926148,-189.35744161676647,-188.74956786427146,-188.14169411177645,-187.53382035928144,-186.92594660678643,-186.31807285429142,-185.7101991017964,-185.1023253493014,-184.49445159680639,-183.88657784431138,-183.27870409181637,-182.67083033932136,-182.06295658682635,-181.45508283433134,-180.84720908183633,-180.23933532934132,-179.6314615768463,-179.0235878243513,-178.41571407185629,-177.80784031936128,-177.19996656686627,-176.59209281437126,-175.98421906187625,-175.37634530938124,-174.76847155688623,-174.16059780439122,-173.5527240518962,-172.9448502994012,-172.3369765469062,-171.72910279441118,-171.12122904191617,-170.51335528942116,-169.90548153692615,-169.29760778443114,-168.68973403193613,-168.08186027944112,-167.4739865269461,-166.8661127744511,-166.2582390219561,-165.65036526946108,-165.04249151696607,-164.43461776447106,-163.82674401197605,-163.21887025948104,-162.61099650698603,-162.00312275449102,-161.395249001996,-160.787375249501,-160.179501497006,-159.57162774451098,-158.96375399201597,-158.35588023952096,-157.74800648702595,-157.14013273453094,-156.53225898203593,-155.92438522954092,-155.3165114770459,-154.7086377245509,-154.1007639720559,-153.49289021956088,-152.88501646706587,-152.27714271457086,-151.66926896207585,-151.06139520958084,-150.45352145708583,-149.84564770459082,-149.2377739520958,-148.6299001996008,-148.0220264471058,-147.41415269461078,-146.80627894211577,-146.19840518962076,-145.59053143712575,-144.98265768463074,-144.37478393213573,-143.76691017964072,-143.1590364271457,-142.5511626746507,-141.9432889221557,-141.33541516966068,-140.72754141716567,-140.11966766467066,-139.51179391217565,-138.90392015968064,-138.29604640718563,-137.68817265469062,-137.0802989021956,-136.4724251497006,-135.8645513972056,-135.25667764471058,-134.64880389221557,-134.04093013972056,-133.43305638722555,-132.82518263473054,-132.21730888223553,-131.60943512974052,-131.0015613772455,-130.3936876247505,-129.7858138722555,-129.17794011976048,-128.57006636726547,-127.96219261477046,-127.35431886227545,-126.74644510978044,-126.13857135728543,-125.53069760479042,-124.92282385229541,-124.3149500998004,-123.70707634730539,-123.09920259481038,-122.49132884231537,-121.88345508982036,-121.27558133732535,-120.66770758483034,-120.05983383233533,-119.45196007984032,-118.84408632734531,-118.2362125748503,-117.62833882235529,-117.02046506986028,-116.41259131736527,-115.80471756487026,-115.19684381237525,-114.58897005988024,-113.98109630738523,-113.37322255489022,-112.76534880239521,-112.1574750499002,-111.54960129740519,-110.94172754491018,-110.33385379241517,-109.72598003992016,-109.11810628742515,-108.51023253493014,-107.90235878243513,-107.29448502994012,-106.68661127744511,-106.0787375249501,-105.47086377245509,-104.86299001996008,-104.25511626746507,-103.64724251497006,-103.03936876247505,-102.43149500998004,-101.82362125748503,-101.21574750499002,-100.60787375249501,-100.0]}
},{}],34:[function(require,module,exports){
module.exports={"expected":[0.0,0.0029792754636741255,-0.001993216148375205,-0.0016100602087220858,0.0030467579370803085,-0.0004475613063522405,-0.0027114687669971536,0.002256697938508038,0.001169853835441462,-0.003013484803006078,0.0008602463935379906,0.0024033641352912273,-0.0024589469853749492,-0.0007305071732594921,0.0029202677242617043,-0.001232245763235776,-0.0020630506662764106,0.002599568947293905,0.0003002891378391285,-0.0027721937386625027,0.0015587432547885677,0.0016987561953284002,-0.002679248190034568,0.00011310712621759552,0.0025750406012091088,-0.0018359517957342686,-0.0013187136042428897,0.002699694697245789,-0.0005026624998417884,-0.002335158512118168,0.0020611329402736495,0.0009310297828684405,-0.0026635765355469626,0.0008621177993408531,0.002059345668370648,-0.0022325999165822385,-0.0005435594627216438,0.0025744390874599685,-0.0011860459515960276,-0.0017547197778943963,0.0023497042374687476,0.00016378601310587667,-0.0024366125098491094,0.0014699093332958442,0.0014285877261119263,-0.002412806247820519,0.00020128887099304346,0.0022551090841772714,-0.0017101014708617093,-0.0010883155933760192,0.0024232302831901963,-0.0005452448511579276,-0.0020355122959738597,0.0019039726009748776,0.0007412011897165366,-0.002383205393235794,0.0008623304776511447,0.0017838596130469971,-0.0020498388957545513,-0.00039435120183611106,0.002295792838033255,-0.0011475372916105646,-0.0015065210241819245,0.0021469754570506185,5.456493851913547e-5,-0.002164801791239546,0.0013966594764518775,0.0012100754518941876,-0.002195593476313569,0.00027177348279554736,0.0019946948787267463,-0.0016063383102249656,-0.0009011871643554247,0.002196802235458256,-0.0005787928403763429,-0.0017904853420974782,0.001774090952121163,0.0005864842835976115,-0.002152556885593532,0.0008612209382024031,0.0015576277414072839,-0.0018983233815596807,-0.00027244142085622487,0.0020655931802733515,-0.0011144579225742593,-0.0013019041990135155,0.0019783275922151825,-3.4731632639015546e-5,-0.0019393505542376792,0.0013346357917388668,0.0010293082359147322,-0.0020142634209648707,0.0003291933674448311,0.001777885124108405,-0.0015186633648187752,-0.0007459282630555287,0.0020071256581682658,-0.0006055645453446646,-0.0015857743413633374,0.0016642562457213222,0.0004578327633195453,-0.0019586973363281885,0.000859011285775657,0.0013680151478842144,-0.0017699515915522625,-0.00017095913643722915,0.0018714903247300998,-0.0010853160360165934,-0.0011299175688353593,0.0018351077683137556,-0.0001089919194565455,-0.0017486745642397857,0.0012809354482263007,0.0008769957255988133,-0.00185988924435072,0.0003766547470212589,0.0015939974556541938,-0.0014430444369953202,-0.0006148582626531987,0.0018452373293098006,-0.0006270882079658821,-0.0014116950639802772,0.0015695659510999071,0.0003491001569860977,-0.0017928276087309078,0.0008558549059122084,0.0012063969174792842,-0.0016591862577157476,-8.519781787662621e-5,0.0017050151475738223,-0.0010590889692026516,-0.0009830262625969562,0.0017113558015323948,-0.0001715907096898753,-0.0015847687361691017,0.0012335514371201778,0.0007466976829867576,-0.0017262759601549657,0.0004163187508799807,0.0014355956259224647,-0.0013766725350074995,-0.0005026140023646952,0.0017048722661948516,-0.0006444356840285458,-0.0012614583467721425,0.0014865803750104506,0.0002559643672092497,-0.0016487549010891795,0.000851861949221547,0.0010666853116508613,-0.0015621158748773047,-1.1825347282561193e-5,0.001560167481826749,-0.001035053233220367,-0.0008558769933991929,0.0016028339426194809,-0.00022493319883552944,-0.0014419253556700424,0.0011910529016600497,0.0006338095057089341,-0.0016089912251755897,0.00044973586739035734,0.0012973447863833159,-0.001317531983073542,-0.0004053374313823742,0.0015815209599554512,-0.0006583815857509619,-0.0011301645556565502,0.0014128162518540685,0.00017529771875798622,-0.0015219956949537859,0.0008471143188675415,0.0009444616131660376,-0.0014759002041407948,5.1583588511459594e-5,0.0014325788520096526,-0.0010126834985609416,-0.0007445624864418464,0.0015064479671521632,-0.00027078011051604226,-0.0013159662951294654,0.0011523932806956376,0.0005349522064454682,-0.0015047814241174488,0.0004780478181602545,0.0011753192284204989,-0.0012641399606687952,-0.00032018251615178225,0.001471856069244756,-0.0006695002314206082,-0.0010141898834340082,0.0013464371116390563,0.00010478110776001028,-0.0014092253259174019,0.0008416748798673108,0.000836441561475848,-0.0013984282480241444,0.00010683641967421802,0.0013189942626506837,-0.0009915899648546022,-0.0006461646711721043,0.0014198870545036916,-0.00031045027490115065,-0.0012037638217580159,0.0011167903677009976,0.0004475904443447207,-0.00141120545362812,0.0005021143672876432,0.001066566832106961,-0.0012153823655971679,-0.0002450040237373813,0.0013733700088620873,-0.0006782270228454514,-0.0009107972072172862,0.0012860566426252343,4.265859462657374e-5,-0.001307927370417672,0.0008355933308266153,0.000740133831226824,-0.0013280994127812483,0.0001553078202529342,0.0012169396647977693,-0.0009714781101762534,-0.0005584607064549555,0.0013413917008813243,-0.0003449513652802219,-0.0011029309021845033,0.0010836486830044251,0.00036978497654394023,-0.001326397051389375,0.0005225957287020922,0.0009688256257126555,-0.0011704068520604972,-0.00017815444816831008,0.0012841381503688836,-0.0006848985992559372,-0.0008178811507843829,0.001230609696813746,-1.2423787619437931e-5,-0.0012161630479980412,0.0008289100675411926,0.0006536148389591469,-0.001263679023919916,0.00019806208530200685,0.0011245018547612787,-0.0009521220130784322,-0.0004797279181821006,0.001269599528333046,-0.00037506685752077294,-0.0010116149502696493,0.0010525077092868893,0.00030002739837380727,-0.0012489059369248012,0.0005400077090381635,0.0008803338868186255,-0.0011285510812608377,-0.00011834763844172199,0.0012026596131698981,-0.0006897798620140684,-0.000733796287886776,0.0011792652611956813,-6.152690207682556e-5,-0.0011324152954415695,0.0008216587952091083,0.0005753761329460774,-0.0012042002994845816,0.00023593624537371173,0.001040178819226027,-0.0009333461904117788,-0.00040861088286385554,0.0012034401017523581,-0.00040141540975818465,-0.0009283568319588484,0.0010230064645726257,0.00023712693406600008,-0.0011775888693621435,0.0005547595591086139,0.0007996996454726447,-0.0010892933620438845,-6.456489428787353e-5,0.001127747519328269,-0.0006930826186210775,-0.0006572384829493584,0.0011313662840414535,-0.00010549385146576817,-0.001055480745416828,0.0008138683366718615,0.0005042184630164543,-0.001148896237965788,0.0002695978682950941,0.0009627755521346809,-0.0009150129383983017,-0.00034402872196560006,0.0011420614935392871,-0.00042449235434413373,-0.0008519922442678512,0.0009948586961383676,0.0001801311053011166,-0.0011115332319187043,0.0005671805448207877,0.0007258089840098178,-0.0010522179314775828,-1.598886179053775e-5,0.001058451664254,-0.0006949787281278473,-0.0005871611333496286,0.0010863871595139744,-0.00014500325271483573,-0.0009843932740455992,0.0008055639101085816,0.0004391766795879883,-0.0010971512841817968,0.0002995861072688289,0.0008913299998454116,-0.0008970133237395981,-0.00028510909545016955,0.001084777950195067,-0.0004446992875638237,-0.0007815813184468871,0.0009678351559105994,0.0001282690116321463,-0.00105000234858789,0.0005775389732995199,0.0006577603112098393,-0.0010169900466332046,2.804392134864751e-5,0.000994002955301013,-0.0006956095502944873,-0.0005227148955044816,0.0010439031054046252,-0.00018060763299204187,-0.0009183688523777786,0.0007967680482065037,0.00037946547785186046,-0.0010484663807433345,0.00032634139915522755,0.0008250594359597722,-0.0008792606519864788,-0.00023114033410306665,0.0010310319083547414,-0.00046236555803659746,-0.0007163574516293629,0.0009417507046488958,8.091004437302698e-5,-0.0009923956473050148,0.0005860560598922003,0.0005948164133435348,-0.0009833377971062796,6.807769361623512e-5,0.0009337727884685199,-0.0006950928558250687,-0.00046320355528669415,0.0010035677240717946,-0.00021276157914984343,-0.0008567650820811999,0.0007875012698686575,0.00032443953495499685,-0.0010024332697186015,0.00035022731246808173,0.000763320978476752,-0.000861685652113379,-0.0001815361496705193,0.0009803659692553827,-0.00047776412797277305,-0.0006556895053432837,0.0009164547755715609,3.753334703287576e-5,-0.0009382191692859657,0.0005929161968150506,0.0005363689138422088,-0.0009510386124335929,0.00010456319745428592,0.0008772428773799706,-0.000693527958549,-0.0004080512128330798,0.0009650963028186391,-0.0002418426946570464,-0.0007990510465291421,0.0007777825778247056,0.00027356377386094076,-0.0009587153075089482,0.0003715468634264869,0.0007055820802231602,-0.0008442328721830423,-0.00013580922857946265,0.000932401911949231,-0.0004911234539505824,-0.0005990534662092553,0.0008918242177439423,-2.295105511994674e-6,-0.0008870634185623318,0.0005982746668962828,0.00048191154944462723,-0.0009199091076241082,0.00013787704566828063,0.0008239825249146696,-0.0006909995804918932,-0.00035677753557261855,0.0009282532098543924,-0.00026816742018544913,-0.0007447845334216765,0.0007676298316355365,0.00022639087416510402,-0.0009170329439358485,0.0003905548675621323,0.0006513981713603462,-0.0008268579440140079,-9.355120515582686e-5,0.0008868247645589673,-0.0005026365052228273,-0.0005460109155328666,0.0008677578529841229,-3.893993799724279e-5,-0.0008385865040995688,0.0006022635137712523,0.00043101981195984006,-0.0008897973403584664,0.00016833648869781686,0.0007736312791523626,-0.0006875807995544392,-0.00030897885584466907,0.0008928422589142646,-0.00029200312855550103,-0.0006935946076528275,0.000757060030097228,0.0001825440495535346,-0.0008771525930519789,0.0004074674064838694,0.0006003955094363684,-0.0008095254808846105,-5.441728576754712e-5,0.0008433705652588901,-0.000512467692495063,-0.00049619247208885,0.0008441722849949306,-7.270979097830835e-5,-0.0007925011546825039,0.0006049960621591469,0.00038333525372570305,-0.0008605768360485035,0.00019621080824775135,0.0007258855411615938,-0.000683335323367571,-0.00026431356337556074,0.0008586992565855853,-0.00031357747860962377,-0.0006451681227017707,0.0007460895268224608,0.00014170370684818436,-0.0008388780050655434,0.0004224691659374896,0.000552257874102999,-0.0007922074427854336,-1.8114310692704403e-5,0.0008018168519798746,-0.0005207582504027664,-0.00044928491706307624,0.0008209986360896753,-0.000103867761086333,-0.0007485646060062899,0.0006065704363216131,0.0003385532557767146,-0.0008321419261501659,0.00022173020322475685,0.0006804881117866564,-0.0006783192616553134,-0.00022249069540764555,0.0008256861755300592,-0.00033308572600284774,-0.0005992391691076235,0.000734734195877897,0.00010359700283760044,-0.0008020435063789516,0.0004357191829384458,0.0005067161366012223,-0.0007748818513753147,1.5608610764412367e-5,0.0007619751956391498,-0.0005276304612637873,-0.0004050210794925213,0.0007981799796142985,-0.00013263960786804918,-0.0007065706443437474,0.0006070723258360485,0.00029641339869564,-0.000804404073987393,0.0002450927888467234,0.0006372199508023376,-0.000672582520821278,-0.00018326093638496797,0.0007936865534211969,-0.00035069649286572843,-0.0005555807394208909,0.0007230095596378409,6.798959014752772e-5,-0.0007665086514537082,0.0004473553898621326,0.00046354000404795384,-0.0007575317695528252,4.6967516514424486e-5,0.0007236852815396025,-0.000533191000467803,-0.00036317181512094716,0.0007756693001354563,-0.00015922026525120496,-0.0006663432879538362,0.0006065771794149465,0.0002566918119051607,-0.0007772889515250134,0.0002664701600758878,0.0005958936201434798,-0.0006661699107614005,-0.00014640945356297867,0.0007626018261641945,-0.0003665563620951521,-0.0005139980842707544,0.0007109308877290952,3.467903485830333e-5,-0.0007321539532975986,0.0004574982388993845,0.00042253142682514676,-0.000740144483408414,7.614951639379714e-5,0.0006868101762318708,-0.000537533608898265,-0.0003235395897103111,0.0007534278582400403,-0.00018377905244283162,-0.0006277317253268845,0.0006051519595262611,0.0002191950426393928,-0.0007507340931503852,0.0002860118512883509,0.0005563480223527879,-0.000659122030186195,-0.00011175014588947485,0.0007323483805615144,-0.0003807935660515887,-0.00047432337186101216,0.0006985132736222186,3.4895237608323725e-6,-0.0006988774463240106,0.0004662536164453213,0.0003835192905163019,-0.0007227108405003029,0.00010331756384225403,0.0006512325111192178,-0.0005407412446469809,-0.00028595330418038176,0.0007314238685739574,-0.00020646387733626662,-0.0005906062273746366,0.0006028565564691299,0.00018375510353683277,-0.0007246869970963069,0.00030384893916197986,0.0005184441447546039,-0.0006514759798317626,-7.91209911894204e-5,0.000702855166257393,-0.00039352097088628593,-0.0004364113615902343,0.0006857716937711265,-2.5732424172785848e-5,-0.0006665918975652137,0.00047371520410027746,0.0003463551092431759,-0.0007052247099926039,0.00012861432798061466,0.0006168513815313028,-0.0005428878281169923,-0.0002502640897213281,0.0007096314225915304,-0.00022740465235545184,-0.0005548548211942609,0.0005997449359989511,0.00015022544259397512,-0.0006991035772602435,0.0003200969745387858,0.0004820615915422394,-0.0006432659407289464,-4.838025447180998e-5,0.0006740617462969756,-0.00040483850817512625,-0.0004001358736453262,0.0006727210530003506,-5.3121457508109226e-5,-0.0006352225273035273,0.0004799664046415104,0.00031090950643144295,-0.0006876825386062542,0.00015216535776238198,0.0005835798089758065,-0.0005440396668908958,-0.00021634186700222462,0.0006880296041016052,-0.0002467160894219357,-0.0005203805643788438,0.0005958660767162902,0.0001184776410004798,-0.0006739468915963454,0.00033485838434152426,0.0004470957382812631,-0.0006345236457930259,-1.9403376985043196e-5,0.0006459166945081157,-0.0004148351692929124,-0.0003653868884735699,0.0006593762189651974,-7.879626740366248e-5,-0.0006047051332135077,0.0004850819232253814,0.00027706931976321966,-0.0006700829825072534,0.00017408168455675647,0.0005513426502482998,-0.0005442566263671647,-0.00018407251209565957,0.0006666017579147497,-0.00026450000157517454,-0.0004870992966391657,0.0005912647402593221,8.839868990362672e-5,-0.0006491860905180519,0.00034822445169613124,0.0004134553819262464,-0.0006252787664154937,7.919592394691378e-6,0.0006183762692389784,-0.0004235906511910742,-0.0003320681485286113,0.000645752047858201,-0.00010286196420599278,-0.00057498453655664,0.0004891290732801709,0.00024473520466680905,-0.0006524265998304834,0.0001944619759003529,0.0005200748637641333,-0.0005435930970541319,-0.00015335550775557317,0.0006453348809720156,-0.0002808472096629886,-0.00045493777359500325,0.0005859821075480117,5.98887310194043e-5,-0.0006247955416009731,0.0003602769578742635,0.00038106078819870716,-0.0006155592308406221,3.368613057811362e-5,0.0005914033088972725,-0.00043117672224957126,-0.00030009516341714327,0.0006318634030530909,-0.0001254120534432102,-0.0005460132872524853,0.0004921688609832573,0.00021381963881200378,-0.000634715591963591,0.00021339432798943902,0.0004897200634720162,-0.0005420987980762779,-0.00012410198567886838,0.0006242191121436688,-0.0002958391306838252,-0.0004238321086904548,0.0005800563069680723,3.285917145533284e-5,-0.0006007540965328736,0.00037108955123159326,0.00034984205980751875,-0.0006053914874178866,5.798302206819674e-5,0.0005649663067159265,-0.00043765836182202146,-0.00026939354123584644,0.0006177251680100249,-0.00014653008769467644,-0.0005177505784385826,0.0004942568904750718,0.00018424525132169483,-0.0006169535843014684,0.00023095776546447428,0.0004602293058172914,-0.0005398194478824327,-9.623308581428357e-5,0.0006032473020385624,-0.00030954910782780593,-0.00039372646515637555,0.0005735228548118898,7.231102401405132e-6,-0.0005770444735818669,0.00038072889432824627,0.00031973776539783366,-0.0005948007230233516,8.088785485874259e-5,0.0005390386312734718,-0.0004430947156519983,-0.00023989758534415784,0.0006033522544898022,-0.00016629105454584914,-0.0004901613316301605,0.0004954441230201088,0.0001559434165764097,-0.0005991454391533695,0.0002472235025410301,0.00043156006674800447,-0.0005367973266106636,-6.967857435765748e-5,0.0005824146480964002,-0.0003220435296369405,-0.0003645719521476765,0.0005664150240347973,-1.706603391939056e-5,-0.0005536527344507622,0.00038925562971670356,0.0002906937816749301,-0.0005838110447998862,0.0001024702824456779,0.0005135978662649832,-0.00044753990057073317,-0.00021154910844156714,0.0005887596069104288,-0.00018476254836899197,-0.0004632154216395823,0.0004957775164635517,0.00012885306490677137,-0.0005812970949980481,0.0002622560084092722,0.00040367537460838504,-0.0005330717495396091,-4.437567406310273e-5,0.0005617183832606941,-0.0003333827759961598,-0.0003363256885695814,0.0005587641541063122,-4.009557329180576e-5,-0.0005305678387019818,0.0003967251966390485,0.00026266231082662907,-0.0005724456317125719,0.00012279309340131812,0.0004886252484018912,-0.0004510436851235055,-0.000184296425556483,0.0005739622035160234,-0.00020200576402745193,-0.0004368870166414138,0.0004953005660244287,0.00010291967207456578,-0.000563415427453541,0.000276113911204274,0.00037654307162039165,-0.0005286794671681825,-2.026806977779629e-5,0.0005411575088732758,-0.0003436220211331504,-0.00030895000539188117,0.0005505999121917476,-6.19145899783407e-5,-0.0005077812622831868,0.00040318852447158163,0.0002356010428878263,-0.00056072686113293,0.0001419131217591834,0.0004641051864979099,-0.00045365206750700067,-0.00015809349513649817,0.0005589750548992409,-0.00021807634309608864,-0.0004111540136170215,0.0004940537633374602,7.809439691898478e-5,-0.0005455081282411419,0.0002888507681289269,0.00035013518199981095,-0.00052365500442898,2.6949406444112564e-6,0.0005207325642627576,-0.00035281191792421523,-0.0002824117629394844,0.000541950513914816,-8.257471717796273e-5,-0.00048528666930390063,0.0004086926237472642,0.0002094724385714032,-0.0005486764146600608,0.00015988202502962025,0.0004400248480765016,-0.0004554077680783523,-0.00013289918336879033,0.0005438132003187865,-0.00023302509731606418,-0.0003859975532080708,0.000492074987410574,5.433334241940327e-5,-0.0005275835991389851,0.00030051572404048756,0.00032442736895242765,-0.0005180309491572131,2.4559174203117406e-5,0.0005004454269347999,-0.0003609991831878843,-0.00025668176411372583,0.0005328429103868954,-0.00010212285061106723,-0.0004630796282708956,0.00041328109164830027,0.00018424311272205947,-0.0005363153665958887,0.00017674695160458517,0.0004163738024100838,-0.0004563506504529876,-0.00010867663153388918,0.0005284917021741056,-0.0002468986293580149,-0.0003614016010094391,0.0004893998386108009,3.159692005888673e-5,-0.0005096508584870117,0.00031115407664239865,0.0002993984661066695,-0.0005118381980560254,4.536618904580977e-5,0.0004802991384107882,-0.0003682270999871322,-0.00023173424804089865,0.0005233029469539293,-0.00012060175408178015,-0.0004411573656231384,0.00041699454573728757,0.00015988330221126753,-0.0005236642578654432,0.00019255111530527285,0.00039314371095043864,-0.0004565180826283799,-8.539270991402614e-5,0.0005130256389366968,-0.00025973986728707336,-0.00033735258471192077,0.00048606192475775814,9.849301046875935e-6,-0.0004917194582530689,0.0003208077631192502,0.000275030071580044,-0.0005051061668989215,6.515382527429952e-5,0.00046029775166413976,-0.0003745359500578736,-0.00020754645145970468,0.0005133554981264789,-0.00013805058246067018,-0.00041951855070254657,0.0004198709972141081,0.00013636640502051812,-0.0005107431576727447,0.0002073342916231998,0.00037032805773747497,-0.0004559452475200564,-6.301754473911945e-5,0.0004974300967878493,-0.00027158852618965805,-0.0003138390784011632,0.0004820931067852069,-1.0942059094114257e-5,-0.0004737994100301985,0.00032951578040244097,0.0002513061949792329,-0.0004978629705147723,8.395667348019323e-5,0.0004404461968287785,-0.00037996338715046835,-0.00018409822740775417,0.0005030245823716784,-0.0001545053347907475,-0.0003981631073402862,0.00042194617299007417,0.00011366857959676537,-0.0004975717147828186,0.00022113324764242126,0.0003479219136845424,-0.00045466541064563917,-4.152410702457753e-5,0.000481720160171666,-0.0002824815080571915,-0.0002908515268494217,0.00047752371012609133,-3.080683371742933e-5,-0.0004559011186223664,0.00033731454912903333,0.0002282129493314538,-0.0004901355771368249,0.00010180648193104646,0.0004207501624334902,-0.00038454476020395026,-0.00016137171258630493,0.0004923334598104647,-0.0001699992480245433,-0.0003770920480732716,0.00042325379426738126,9.176839545557078e-5,-0.00048416919999772114,0.00023398211556930107,0.0003259217296883323,-0.00045271015136749855,-2.0887854078206197e-5,0.00046591090144026075,-0.0002924532491237518,-0.0002683820038638678,0.00047238270692576335,-4.9772185244983406e-5,-0.00043803532211032407,0.00034423822964321625,0.00020573828130721067,-0.00048194994092084527,0.00011873251146262034,0.0004012159898882143,-0.00038831339375482556,-0.00013935103624418204,0.0004813047153509064,-0.00018456314011447563,-0.00035630732768631763,0.00042382581801617695,7.064652752861056e-5,-0.0004705545411327832,0.0002459127181164884,0.0003043251543699163,-0.000450109563025027,-1.0864160017897483e-6,0.00045001736974218,-0.00030153602230708216,-0.00024642399975760646,0.0004666978733366515,-6.7863080051694e-5,-0.00042021303747612947,0.0003503189969907615,0.00018387173421102604,-0.00047333111580433564,0.00013476184562737173,0.0003818505793307864,-0.0003913008317527686,-0.00011802206461842993,0.0004699603293713311,-0.00019822570973715623,-0.00033581171332293077,0.000423692646681408,5.028548800144333e-5,-0.00045674635158664967,0.0002569548526302955,0.00028313087294535184,-0.0004468924264113883,1.7900679216854216e-5,0.00043405457928224605,-0.0003097602011504271,-0.00022497223381818656,0.00046049592545026937,-8.510256446193555e-5,-0.0004024455110205291,0.000355587280723984,0.0001626042391185345,-0.00046430335336383874,0.00014991966241170517,0.00036266130525185506,-0.0003935370499542101,-9.737217593668417e-5,0.0004583217377259187,-0.00021101379874331126,-0.00031560866886107643,0.00042288331059115933,3.066939039840132e-5,-0.00044276295342523186,0.0002671365397323596,0.0002623384642965578,-0.0004430863603340888,3.6092247396543585e-5,0.0004180374970649535,-0.00031715449062810096,-0.0002040224883184826,0.00045380263685465197,-0.00010151200725054635,-0.0003847441729339321,0.000360071974399775,0.00014192793028522645,-0.00045489018690516463,0.00016422947282997377,0.00034365594057455314,-0.0003950506412372269,-7.739006178925866e-5,0.00044640988256592235,-0.00022295262245921826,-0.0002957022516200915,0.00042142562682715877,1.1783741510252315e-5,-0.00042862239575578386,0.0002764842413368855,0.00024194827377569037,-0.0004387179524069969,5.3505661159641884e-5,0.00040198103021769715,-0.00032374612933564357,-0.0001835714611625162,0.0004466429403360313],"x":[100.0,100.60925648702595,101.21851297405189,101.82776946107785,102.4370259481038,103.04628243512974,103.65553892215569,104.26479540918163,104.87405189620759,105.48330838323353,106.09256487025948,106.70182135728543,107.31107784431137,107.92033433133733,108.52959081836327,109.13884730538922,109.74810379241517,110.35736027944112,110.96661676646707,111.57587325349301,112.18512974051896,112.7943862275449,113.40364271457086,114.01289920159681,114.62215568862275,115.2314121756487,115.84066866267464,116.4499251497006,117.05918163672655,117.6684381237525,118.27769461077844,118.88695109780438,119.49620758483034,120.10546407185629,120.71472055888223,121.32397704590818,121.93323353293412,122.54249001996008,123.15174650698603,123.76100299401197,124.37025948103792,124.97951596806388,125.58877245508982,126.19802894211577,126.80728542914171,127.41654191616766,128.02579840319362,128.63505489021955,129.2443113772455,129.85356786427147,130.4628243512974,131.07208083832336,131.6813373253493,132.29059381237525,132.8998502994012,133.50910678642714,134.1183632734531,134.72761976047903,135.336876247505,135.94613273453095,136.55538922155688,137.16464570858284,137.77390219560877,138.38315868263473,138.9924151696607,139.60167165668662,140.21092814371258,140.8201846307385,141.42944111776447,142.03869760479043,142.64795409181636,143.25721057884232,143.86646706586825,144.4757235528942,145.08498003992017,145.6942365269461,146.30349301397206,146.91274950099802,147.52200598802395,148.1312624750499,148.74051896207584,149.3497754491018,149.95903193612776,150.5682884231537,151.17754491017965,151.78680139720558,152.39605788423154,153.0053143712575,153.61457085828343,154.2238273453094,154.83308383233532,155.44234031936128,156.05159680638724,156.66085329341317,157.27010978043913,157.87936626746506,158.48862275449102,159.09787924151698,159.7071357285429,160.31639221556887,160.9256487025948,161.53490518962076,162.14416167664672,162.75341816367265,163.3626746506986,163.97193113772454,164.5811876247505,165.19044411177646,165.7997005988024,166.40895708582835,167.01821357285428,167.62747005988024,168.2367265469062,168.84598303393213,169.4552395209581,170.06449600798402,170.67375249500998,171.28300898203594,171.89226546906187,172.50152195608783,173.11077844311376,173.72003493013972,174.32929141716568,174.9385479041916,175.54780439121757,176.1570608782435,176.76631736526946,177.37557385229542,177.98483033932135,178.5940868263473,179.20334331337327,179.8125998003992,180.42185628742516,181.0311127744511,181.64036926147705,182.249625748503,182.85888223552894,183.4681387225549,184.07739520958083,184.6866516966068,185.29590818363275,185.90516467065868,186.51442115768464,187.12367764471057,187.73293413173653,188.3421906187625,188.95144710578842,189.56070359281438,190.1699600798403,190.77921656686627,191.38847305389223,191.99772954091816,192.60698602794412,193.21624251497005,193.825499001996,194.43475548902197,195.0440119760479,195.65326846307386,196.2625249500998,196.87178143712575,197.4810379241517,198.09029441117764,198.6995508982036,199.30880738522953,199.9180638722555,200.52732035928145,201.13657684630738,201.74583333333334,202.35508982035927,202.96434630738523,203.5736027944112,204.18285928143712,204.79211576846308,205.401372255489,206.01062874251497,206.61988522954093,207.22914171656686,207.83839820359282,208.44765469061878,209.0569111776447,209.66616766467067,210.2754241516966,210.88468063872256,211.49393712574852,212.10319361277445,212.7124500998004,213.32170658682634,213.9309630738523,214.54021956087826,215.1494760479042,215.75873253493015,216.36798902195608,216.97724550898204,217.586501996008,218.19575848303393,218.8050149700599,219.41427145708582,220.02352794411178,220.63278443113774,221.24204091816367,221.85129740518963,222.46055389221556,223.06981037924152,223.67906686626748,224.2883233532934,224.89757984031937,225.5068363273453,226.11609281437126,226.72534930139722,227.33460578842315,227.9438622754491,228.55311876247504,229.162375249501,229.77163173652696,230.3808882235529,230.99014471057885,231.59940119760478,232.20865768463074,232.8179141716567,233.42717065868263,234.0364271457086,234.64568363273452,235.25494011976048,235.86419660678644,236.47345309381237,237.08270958083833,237.69196606786429,238.30122255489022,238.91047904191618,239.5197355289421,240.12899201596807,240.73824850299403,241.34750499001996,241.95676147704592,242.56601796407185,243.1752744510978,243.78453093812377,244.3937874251497,245.00304391217566,245.6123003992016,246.22155688622755,246.8308133732535,247.44006986027944,248.0493263473054,248.65858283433133,249.2678393213573,249.87709580838325,250.48635229540918,251.09560878243514,251.70486526946107,252.31412175648703,252.92337824351299,253.53263473053892,254.14189121756488,254.7511477045908,255.36040419161677,255.96966067864273,256.57891716566866,257.1881736526946,257.7974301397206,258.40668662674653,259.01594311377244,259.6251996007984,260.23445608782436,260.8437125748503,261.4529690618763,262.0622255489022,262.67148203592814,263.2807385229541,263.88999500998005,264.499251497006,265.1085079840319,265.7177644710579,266.32702095808384,266.9362774451098,267.54553393213575,268.15479041916166,268.7640469061876,269.3733033932136,269.98255988023953,270.5918163672655,271.2010728542914,271.81032934131736,272.4195858283433,273.0288423153693,273.63809880239523,274.24735528942114,274.8566117764471,275.46586826347306,276.075124750499,276.684381237525,277.2936377245509,277.90289421157684,278.5121506986028,279.12140718562875,279.7306636726547,280.3399201596806,280.9491766467066,281.55843313373254,282.1676896207585,282.77694610778445,283.38620259481036,283.9954590818363,284.6047155688623,285.21397205588823,285.8232285429142,286.4324850299401,287.04174151696606,287.650998003992,288.260254491018,288.86951097804393,289.47876746506984,290.0880239520958,290.69728043912176,291.3065369261477,291.9157934131737,292.5250499001996,293.13430638722554,293.7435628742515,294.35281936127745,294.9620758483034,295.5713323353293,296.1805888223553,296.78984530938123,297.3991017964072,298.00835828343315,298.61761477045906,299.226871257485,299.836127744511,300.44538423153693,301.0546407185629,301.6638972055888,302.27315369261476,302.8824101796407,303.4916666666667,304.10092315369263,304.71017964071854,305.3194361277445,305.92869261477045,306.5379491017964,307.1472055888224,307.7564620758483,308.36571856287424,308.9749750499002,309.58423153692615,310.1934880239521,310.802744510978,311.412000998004,312.02125748502993,312.6305139720559,313.23977045908185,313.8490269461078,314.4582834331337,315.0675399201597,315.67679640718563,316.2860528942116,316.89530938123755,317.50456586826346,318.1138223552894,318.7230788423154,319.33233532934133,319.9415918163673,320.5508483033932,321.16010479041915,321.7693612774451,322.3786177644711,322.98787425149703,323.59713073852294,324.2063872255489,324.81564371257485,325.4249001996008,326.0341566866268,326.6434131736527,327.25266966067863,327.8619261477046,328.47118263473055,329.0804391217565,329.6896956087824,330.2989520958084,330.90820858283433,331.5174650698603,332.12672155688625,332.73597804391216,333.3452345309381,333.9544910179641,334.56374750499003,335.173003992016,335.7822604790419,336.39151696606785,337.0007734530938,337.6100299401198,338.21928642714573,338.82854291417163,339.4377994011976,340.04705588822355,340.6563123752495,341.2655688622755,341.8748253493014,342.48408183632733,343.0933383233533,343.70259481037925,344.3118512974052,344.9211077844311,345.5303642714571,346.13962075848303,346.748877245509,347.35813373253495,347.96739021956085,348.5766467065868,349.1859031936128,349.79515968063873,350.4044161676647,351.0136726546906,351.62292914171655,352.2321856287425,352.8414421157685,353.45069860279443,354.05995508982033,354.6692115768463,355.27846806387225,355.8877245508982,356.4969810379242,357.1062375249501,357.71549401197603,358.324750499002,358.93400698602795,359.5432634730539,360.1525199600798,360.7617764471058,361.37103293413173,361.9802894211577,362.58954590818365,363.19880239520955,363.8080588822355,364.4173153692615,365.02657185628743,365.6358283433134,366.2450848303393,366.85434131736525,367.4635978043912,368.0728542914172,368.68211077844313,369.29136726546903,369.900623752495,370.50988023952095,371.1191367265469,371.7283932135729,372.3376497005988,372.94690618762473,373.5561626746507,374.16541916167665,374.7746756487026,375.38393213572857,375.9931886227545,376.60244510978043,377.2117015968064,377.82095808383235,378.4302145708583,379.0394710578842,379.6487275449102,380.25798403193613,380.8672405189621,381.47649700598805,382.08575349301395,382.6950099800399,383.3042664670659,383.91352295409183,384.5227794411178,385.1320359281437,385.74129241516965,386.3505489021956,386.9598053892216,387.56906187624753,388.17831836327343,388.7875748502994,389.39683133732535,390.0060878243513,390.61534431137727,391.2246007984032,391.83385728542913,392.4431137724551,393.05237025948105,393.661626746507,394.2708832335329,394.8801397205589,395.48939620758483,396.0986526946108,396.70790918163675,397.31716566866265,397.9264221556886,398.5356786427146,399.14493512974053,399.7541916167665,400.3634481037924,400.97270459081835,401.5819610778443,402.19121756487027,402.80047405189623,403.40973053892213,404.0189870259481,404.62824351297405,405.2375,405.84675648702597,406.4560129740519,407.06526946107783,407.6745259481038,408.28378243512975,408.8930389221557,409.5022954091816,410.1115518962076,410.72080838323353,411.3300648702595,411.93932135728545,412.54857784431135,413.1578343313373,413.7670908183633,414.37634730538923,414.9856037924152,415.5948602794411,416.20411676646705,416.813373253493,417.42262974051897,418.03188622754493,418.64114271457083,419.2503992015968,419.85965568862275,420.4689121756487,421.07816866267467,421.6874251497006,422.29668163672653,422.9059381237525,423.51519461077845,424.1244510978044,424.7337075848303,425.3429640718563,425.95222055888223,426.5614770459082,427.17073353293415,427.77999001996005,428.389246506986,428.998502994012,429.60775948103793,430.2170159680639,430.8262724550898,431.43552894211575,432.0447854291417,432.65404191616767,433.26329840319363,433.87255489021953,434.4818113772455,435.09106786427145,435.7003243512974,436.30958083832337,436.91883732534933,437.52809381237523,438.1373502994012,438.74660678642715,439.3558632734531,439.96511976047907,440.574376247505,441.18363273453093,441.7928892215569,442.40214570858285,443.0114021956088,443.6206586826347,444.22991516966067,444.83917165668663,445.4484281437126,446.05768463073855,446.66694111776445,447.2761976047904,447.88545409181637,448.49471057884233,449.1039670658683,449.7132235528942,450.32248003992015,450.9317365269461,451.54099301397207,452.15024950099803,452.75950598802393,453.3687624750499,453.97801896207585,454.5872754491018,455.19653193612777,455.8057884231537,456.41504491017963,457.0243013972056,457.63355788423155,458.2428143712575,458.8520708582834,459.46132734530937,460.07058383233533,460.6798403193613,461.28909680638725,461.89835329341315,462.5076097804391,463.11686626746507,463.72612275449103,464.335379241517,464.9446357285429,465.55389221556885,466.1631487025948,466.77240518962077,467.38166167664673,467.99091816367263,468.6001746506986,469.20943113772455,469.8186876247505,470.42794411177647,471.0372005988024,471.64645708582833,472.2557135728543,472.86497005988025,473.4742265469062,474.0834830339321,474.69273952095807,475.30199600798403,475.91125249501,476.52050898203595,477.12976546906185,477.7390219560878,478.34827844311377,478.95753493013973,479.5667914171657,480.1760479041916,480.78530439121755,481.3945608782435,482.00381736526947,482.61307385229543,483.22233033932133,483.8315868263473,484.44084331337325,485.0500998003992,485.65935628742517,486.26861277445107,486.87786926147703,487.487125748503,488.09638223552895,488.7056387225549,489.3148952095808,489.92415169660677,490.53340818363273,491.1426646706587,491.75192115768465,492.36117764471055,492.9704341317365,493.57969061876247,494.18894710578843,494.7982035928144,495.4074600798403,496.01671656686625,496.6259730538922,497.23522954091817,497.84448602794413,498.4537425149701,499.062999001996,499.67225548902195,500.2815119760479,500.89076846307387,501.5000249500998,502.10928143712573,502.7185379241517,503.32779441117765,503.9370508982036,504.54630738522957,505.15556387225547,505.76482035928143,506.3740768463074,506.98333333333335,507.5925898203593,508.2018463073852,508.81110279441117,509.42035928143713,510.0296157684631,510.63887225548905,511.24812874251495,511.8573852295409,512.4666417165669,513.0758982035928,513.6851546906188,514.2944111776447,514.9036676646707,515.5129241516966,516.1221806387225,516.7314371257485,517.3406936127744,517.9499500998004,518.5592065868263,519.1684630738523,519.7777195608783,520.3869760479042,520.9962325349302,521.605489021956,522.214745508982,522.824001996008,523.4332584830339,524.0425149700599,524.6517714570858,525.2610279441118,525.8702844311377,526.4795409181637,527.0887974051897,527.6980538922156,528.3073103792415,528.9165668662674,529.5258233532934,530.1350798403193,530.7443363273453,531.3535928143713,531.9628493013972,532.5721057884232,533.1813622754491,533.7906187624751,534.399875249501,535.0091317365269,535.6183882235529,536.2276447105788,536.8369011976048,537.4461576846307,538.0554141716567,538.6646706586827,539.2739271457086,539.8831836327346,540.4924401197604,541.1016966067864,541.7109530938123,542.3202095808383,542.9294660678643,543.5387225548902,544.1479790419162,544.7572355289421,545.3664920159681,545.9757485029941,546.5850049900199,547.1942614770459,547.8035179640718,548.4127744510978,549.0220309381237,549.6312874251497,550.2405439121757,550.8498003992016,551.4590568862276,552.0683133732535,552.6775698602794,553.2868263473054,553.8960828343313,554.5053393213573,555.1145958083832,555.7238522954092,556.3331087824351,556.9423652694611,557.5516217564871,558.160878243513,558.7701347305389,559.3793912175648,559.9886477045908,560.5979041916167,561.2071606786427,561.8164171656687,562.4256736526946,563.0349301397206,563.6441866267465,564.2534431137725,564.8626996007984,565.4719560878243,566.0812125748503,566.6904690618762,567.2997255489022,567.9089820359281,568.5182385229541,569.1274950099801,569.736751497006,570.346007984032,570.9552644710578,571.5645209580838,572.1737774451097,572.7830339321357,573.3922904191617,574.0015469061876,574.6108033932136,575.2200598802395,575.8293163672655,576.4385728542915,577.0478293413173,577.6570858283433,578.2663423153692,578.8755988023952,579.4848552894211,580.0941117764471,580.7033682634731,581.312624750499,581.921881237525,582.531137724551,583.1403942115768,583.7496506986027,584.3589071856287,584.9681636726547,585.5774201596806,586.1866766467066,586.7959331337325,587.4051896207585,588.0144461077845,588.6237025948104,589.2329590818364,589.8422155688622,590.4514720558882,591.0607285429141,591.6699850299401,592.2792415169661,592.888498003992,593.497754491018,594.107010978044,594.7162674650699,595.3255239520959,595.9347804391217,596.5440369261477,597.1532934131736,597.7625499001996,598.3718063872255,598.9810628742515,599.5903193612775,600.1995758483034,600.8088323353294,601.4180888223553,602.0273453093812,602.6366017964071,603.2458582834331,603.8551147704591,604.464371257485,605.073627744511,605.682884231537,606.2921407185629,606.9013972055889,607.5106536926148,608.1199101796407,608.7291666666666,609.3384231536926,609.9476796407185,610.5569361277445,611.1661926147705,611.7754491017964,612.3847055888224,612.9939620758483,613.6032185628743,614.2124750499001,614.8217315369261,615.4309880239521,616.040244510978,616.649500998004,617.25875748503,617.8680139720559,618.4772704590819,619.0865269461078,619.6957834331338,620.3050399201596,620.9142964071856,621.5235528942115,622.1328093812375,622.7420658682635,623.3513223552894,623.9605788423154,624.5698353293413,625.1790918163673,625.7883483033933,626.3976047904191,627.0068612774451,627.616117764471,628.225374251497,628.834630738523,629.4438872255489,630.0531437125749,630.6624001996008,631.2716566866268,631.8809131736527,632.4901696606786,633.0994261477045,633.7086826347305,634.3179391217565,634.9271956087824,635.5364520958084,636.1457085828343,636.7549650698603,637.3642215568863,637.9734780439122,638.5827345309381,639.191991017964,639.80124750499,640.410503992016,641.0197604790419,641.6290169660679,642.2382734530938,642.8475299401198,643.4567864271457,644.0660429141717,644.6752994011975,645.2845558882235,645.8938123752495,646.5030688622754,647.1123253493014,647.7215818363273,648.3308383233533,648.9400948103793,649.5493512974052,650.1586077844312,650.7678642714571,651.377120758483,651.986377245509,652.5956337325349,653.2048902195609,653.8141467065868,654.4234031936128,655.0326596806387,655.6419161676647,656.2511726546907,656.8604291417166,657.4696856287425,658.0789421157684,658.6881986027944,659.2974550898203,659.9067115768463,660.5159680638723,661.1252245508982,661.7344810379242,662.3437375249501,662.9529940119761,663.562250499002,664.1715069860279,664.7807634730539,665.3900199600798,665.9992764471058,666.6085329341317,667.2177894211577,667.8270459081837,668.4363023952096,669.0455588822356,669.6548153692614,670.2640718562874,670.8733283433133,671.4825848303393,672.0918413173653,672.7010978043912,673.3103542914172,673.9196107784431,674.5288672654691,675.1381237524951,675.7473802395209,676.3566367265469,676.9658932135728,677.5751497005988,678.1844061876247,678.7936626746507,679.4029191616767,680.0121756487026,680.6214321357286,681.2306886227545,681.8399451097804,682.4492015968063,683.0584580838323,683.6677145708583,684.2769710578842,684.8862275449102,685.4954840319361,686.1047405189621,686.7139970059881,687.323253493014,687.9325099800399,688.5417664670658,689.1510229540918,689.7602794411177,690.3695359281437,690.9787924151697,691.5880489021956,692.1973053892216,692.8065618762475,693.4158183632735,694.0250748502993,694.6343313373253,695.2435878243513,695.8528443113772,696.4621007984032,697.0713572854291,697.6806137724551,698.2898702594811,698.899126746507,699.508383233533,700.1176397205588,700.7268962075848,701.3361526946107,701.9454091816367,702.5546656686627,703.1639221556886,703.7731786427146,704.3824351297405,704.9916916167665,705.6009481037925,706.2102045908183,706.8194610778443,707.4287175648702,708.0379740518962,708.6472305389221,709.2564870259481,709.8657435129741,710.475]}
},{}],35:[function(require,module,exports){
module.exports={"expected":[1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0],"x":[-1.0e-200,-9.980079681474104e-201,-9.960159362948207e-201,-9.94023904442231e-201,-9.920318725896413e-201,-9.900398407370517e-201,-9.880478088844622e-201,-9.860557770318725e-201,-9.840637451792829e-201,-9.820717133266931e-201,-9.800796814741036e-201,-9.780876496215138e-201,-9.760956177689244e-201,-9.741035859163346e-201,-9.721115540637451e-201,-9.701195222111553e-201,-9.681274903585657e-201,-9.66135458505976e-201,-9.641434266533866e-201,-9.621513948007968e-201,-9.601593629482072e-201,-9.581673310956175e-201,-9.561752992430278e-201,-9.541832673904382e-201,-9.521912355378486e-201,-9.50199203685259e-201,-9.482071718326692e-201,-9.462151399800797e-201,-9.4422310812749e-201,-9.422310762749003e-201,-9.402390444223107e-201,-9.382470125697212e-201,-9.362549807171315e-201,-9.342629488645418e-201,-9.32270917011952e-201,-9.302788851593624e-201,-9.28286853306773e-201,-9.262948214541833e-201,-9.243027896015936e-201,-9.22310757749004e-201,-9.203187258964143e-201,-9.183266940438247e-201,-9.163346621912351e-201,-9.143426303386455e-201,-9.123505984860558e-201,-9.103585666334662e-201,-9.083665347808764e-201,-9.063745029282868e-201,-9.043824710756973e-201,-9.023904392231076e-201,-9.00398407370518e-201,-8.984063755179282e-201,-8.964143436653386e-201,-8.94422311812749e-201,-8.924302799601593e-201,-8.904382481075697e-201,-8.8844621625498e-201,-8.864541844023904e-201,-8.844621525498008e-201,-8.82470120697211e-201,-8.804780888446214e-201,-8.78486056992032e-201,-8.764940251394423e-201,-8.745019932868526e-201,-8.72509961434263e-201,-8.705179295816732e-201,-8.685258977290837e-201,-8.66533865876494e-201,-8.645418340239044e-201,-8.625498021713147e-201,-8.605577703187252e-201,-8.585657384661354e-201,-8.565737066135457e-201,-8.545816747609562e-201,-8.525896429083666e-201,-8.50597611055777e-201,-8.486055792031872e-201,-8.466135473505975e-201,-8.446215154980078e-201,-8.426294836454184e-201,-8.406374517928287e-201,-8.38645419940239e-201,-8.366533880876493e-201,-8.346613562350598e-201,-8.3266932438247e-201,-8.306772925298806e-201,-8.286852606772908e-201,-8.266932288247013e-201,-8.247011969721115e-201,-8.227091651195219e-201,-8.207171332669321e-201,-8.187251014143427e-201,-8.16733069561753e-201,-8.147410377091634e-201,-8.127490058565737e-201,-8.10756974003984e-201,-8.087649421513944e-201,-8.067729102988048e-201,-8.047808784462152e-201,-8.027888465936254e-201,-8.007968147410359e-201,-7.988047828884461e-201,-7.968127510358565e-201,-7.948207191832669e-201,-7.928286873306773e-201,-7.908366554780877e-201,-7.88844623625498e-201,-7.868525917729083e-201,-7.848605599203186e-201,-7.828685280677292e-201,-7.808764962151395e-201,-7.788844643625498e-201,-7.768924325099601e-201,-7.749004006573705e-201,-7.729083688047809e-201,-7.709163369521913e-201,-7.689243050996017e-201,-7.669322732470119e-201,-7.649402413944224e-201,-7.629482095418326e-201,-7.609561776892429e-201,-7.589641458366532e-201,-7.569721139840638e-201,-7.549800821314741e-201,-7.529880502788844e-201,-7.509960184262948e-201,-7.490039865737051e-201,-7.470119547211155e-201,-7.450199228685259e-201,-7.430278910159363e-201,-7.410358591633466e-201,-7.39043827310757e-201,-7.370517954581672e-201,-7.350597636055776e-201,-7.33067731752988e-201,-7.310756999003985e-201,-7.290836680478088e-201,-7.270916361952191e-201,-7.250996043426294e-201,-7.231075724900399e-201,-7.211155406374503e-201,-7.191235087848606e-201,-7.171314769322709e-201,-7.151394450796814e-201,-7.131474132270916e-201,-7.111553813745019e-201,-7.091633495219124e-201,-7.071713176693226e-201,-7.051792858167331e-201,-7.031872539641434e-201,-7.011952221115537e-201,-6.99203190258964e-201,-6.972111584063746e-201,-6.952191265537849e-201,-6.932270947011952e-201,-6.912350628486055e-201,-6.89243030996016e-201,-6.872509991434262e-201,-6.852589672908367e-201,-6.83266935438247e-201,-6.812749035856574e-201,-6.792828717330677e-201,-6.772908398804781e-201,-6.752988080278883e-201,-6.733067761752989e-201,-6.713147443227092e-201,-6.693227124701196e-201,-6.673306806175298e-201,-6.653386487649402e-201,-6.633466169123506e-201,-6.61354585059761e-201,-6.593625532071714e-201,-6.573705213545817e-201,-6.55378489501992e-201,-6.533864576494023e-201,-6.513944257968128e-201,-6.494023939442231e-201,-6.474103620916335e-201,-6.4541833023904385e-201,-6.434262983864542e-201,-6.4143426653386446e-201,-6.394422346812749e-201,-6.374502028286852e-201,-6.354581709760956e-201,-6.3346613912350596e-201,-6.3147410727091634e-201,-6.2948207541832664e-201,-6.27490043565737e-201,-6.254980117131474e-201,-6.235059798605577e-201,-6.2151394800796815e-201,-6.1952191615537845e-201,-6.175298843027888e-201,-6.155378524501992e-201,-6.135458205976096e-201,-6.115537887450199e-201,-6.0956175689243034e-201,-6.0756972503984064e-201,-6.05577693187251e-201,-6.035856613346614e-201,-6.015936294820718e-201,-5.996015976294821e-201,-5.9760956577689245e-201,-5.956175339243028e-201,-5.9362550207171306e-201,-5.916334702191235e-201,-5.896414383665338e-201,-5.876494065139442e-201,-5.856573746613546e-201,-5.8366534280876495e-201,-5.8167331095617525e-201,-5.796812791035857e-201,-5.77689247250996e-201,-5.756972153984064e-201,-5.7370518354581676e-201,-5.7171315169322706e-201,-5.6972111984063744e-201,-5.6772908798804774e-201,-5.657370561354582e-201,-5.637450242828685e-201,-5.617529924302789e-201,-5.5976096057768925e-201,-5.577689287250996e-201,-5.557768968725099e-201,-5.537848650199204e-201,-5.517928331673307e-201,-5.4980080131474106e-201,-5.4780876946215144e-201,-5.458167376095617e-201,-5.4382470575697204e-201,-5.418326739043824e-201,-5.398406420517928e-201,-5.378486101992031e-201,-5.3585657834661355e-201,-5.3386454649402386e-201,-5.318725146414342e-201,-5.298804827888446e-201,-5.27888450936255e-201,-5.258964190836653e-201,-5.2390438723107574e-201,-5.2191235537848604e-201,-5.199203235258964e-201,-5.179282916733068e-201,-5.159362598207171e-201,-5.139442279681275e-201,-5.1195219611553785e-201,-5.099601642629482e-201,-5.079681324103585e-201,-5.05976100557769e-201,-5.039840687051793e-201,-5.019920368525897e-201,-5.00000005e-201,-4.9800797314741035e-201,-4.9601594129482065e-201,-4.940239094422311e-201,-4.920318775896414e-201,-4.900398457370517e-201,-4.8804781388446216e-201,-4.8605578203187246e-201,-4.8406375017928284e-201,-4.820717183266932e-201,-4.800796864741036e-201,-4.780876546215139e-201,-4.7609562276892435e-201,-4.7410359091633465e-201,-4.72111559063745e-201,-4.701195272111554e-201,-4.681274953585658e-201,-4.661354635059761e-201,-4.641434316533865e-201,-4.6215139980079684e-201,-4.6015936794820714e-201,-4.581673360956176e-201,-4.561753042430279e-201,-4.541832723904383e-201,-4.521912405378486e-201,-4.5019920868525895e-201,-4.4820717683266926e-201,-4.462151449800796e-201,-4.4422311312749e-201,-4.422310812749004e-201,-4.402390494223107e-201,-4.3824701756972114e-201,-4.3625498571713144e-201,-4.3426295386454175e-201,-4.322709220119522e-201,-4.302788901593625e-201,-4.282868583067729e-201,-4.2629482645418326e-201,-4.243027946015936e-201,-4.2231076274900394e-201,-4.203187308964144e-201,-4.183266990438247e-201,-4.163346671912351e-201,-4.1434263533864544e-201,-4.123506034860558e-201,-4.103585716334661e-201,-4.083665397808766e-201,-4.063745079282869e-201,-4.043824760756971e-201,-4.0239044422310756e-201,-4.0039841237051786e-201,-3.9840638051792824e-201,-3.964143486653386e-201,-3.94422316812749e-201,-3.924302849601593e-201,-3.9043825310756975e-201,-3.8844622125498005e-201,-3.864541894023904e-201,-3.844621575498008e-201,-3.824701256972112e-201,-3.804780938446215e-201,-3.7848606199203186e-201,-3.7649403013944224e-201,-3.7450199828685254e-201,-3.72509966434263e-201,-3.705179345816733e-201,-3.685259027290837e-201,-3.6653387087649405e-201,-3.645418390239044e-201,-3.625498071713147e-201,-3.605577753187252e-201,-3.585657434661355e-201,-3.565737116135458e-201,-3.545816797609562e-201,-3.525896479083665e-201,-3.5059761605577685e-201,-3.486055842031872e-201,-3.466135523505976e-201,-3.446215204980079e-201,-3.4262948864541835e-201,-3.4063745679282866e-201,-3.38645424940239e-201,-3.366533930876494e-201,-3.346613612350598e-201,-3.326693293824701e-201,-3.306772975298805e-201,-3.2868526567729085e-201,-3.266932338247012e-201,-3.2470120197211156e-201,-3.2270917011952194e-201,-3.2071713826693224e-201,-3.1872510641434262e-201,-3.16733074561753e-201,-3.1474104270916334e-201,-3.127490108565737e-201,-3.1075697900398405e-201,-3.087649471513944e-201,-3.0677291529880477e-201,-3.0478088344621515e-201,-3.027888515936255e-201,-3.0079681974103587e-201,-2.9880478788844624e-201,-2.9681275603585655e-201,-2.9482072418326692e-201,-2.928286923306773e-201,-2.9083666047808764e-201,-2.88844628625498e-201,-2.868525967729084e-201,-2.848605649203187e-201,-2.8286853306772907e-201,-2.808765012151394e-201,-2.788844693625498e-201,-2.7689243750996017e-201,-2.749004056573705e-201,-2.7290837380478085e-201,-2.7091634195219123e-201,-2.6892431009960157e-201,-2.6693227824701194e-201,-2.6494024639442232e-201,-2.6294821454183266e-201,-2.6095618268924304e-201,-2.589641508366534e-201,-2.569721189840637e-201,-2.549800871314741e-201,-2.5298805527888447e-201,-2.509960234262948e-201,-2.4900399157370515e-201,-2.4701195972111553e-201,-2.4501992786852587e-201,-2.4302789601593625e-201,-2.4103586416334662e-201,-2.3904383231075696e-201,-2.3705180045816734e-201,-2.350597686055777e-201,-2.3306773675298806e-201,-2.3107570490039843e-201,-2.2908367304780877e-201,-2.270916411952191e-201,-2.2509960934262946e-201,-2.231075774900398e-201,-2.2111554563745017e-201,-2.1912351378486055e-201,-2.171314819322709e-201,-2.1513945007968127e-201,-2.1314741822709164e-201,-2.11155386374502e-201,-2.0916335452191236e-201,-2.0717132266932274e-201,-2.0517929081673308e-201,-2.0318725896414345e-201,-2.0119522711155376e-201,-1.992031952589641e-201,-1.9721116340637448e-201,-1.9521913155378485e-201,-1.932270997011952e-201,-1.9123506784860557e-201,-1.8924303599601595e-201,-1.872510041434263e-201,-1.8525897229083666e-201,-1.8326694043824704e-201,-1.8127490858565738e-201,-1.7928287673306776e-201,-1.772908448804781e-201,-1.7529881302788844e-201,-1.7330678117529878e-201,-1.7131474932270916e-201,-1.693227174701195e-201,-1.6733068561752987e-201,-1.6533865376494025e-201,-1.633466219123506e-201,-1.6135459005976097e-201,-1.593625582071713e-201,-1.5737052635458167e-201,-1.5537849450199204e-201,-1.5338646264940238e-201,-1.5139443079681274e-201,-1.4940239894422312e-201,-1.4741036709163346e-201,-1.4541833523904382e-201,-1.434263033864542e-201,-1.4143427153386455e-201,-1.394422396812749e-201,-1.3745020782868525e-201,-1.3545817597609561e-201,-1.3346614412350597e-201,-1.3147411227091633e-201,-1.294820804183267e-201,-1.2749004856573706e-201,-1.254980167131474e-201,-1.2350598486055776e-201,-1.2151395300796812e-201,-1.1952192115537848e-201,-1.1752988930278886e-201,-1.1553785745019921e-201,-1.1354582559760957e-201,-1.115537937450199e-201,-1.0956176189243027e-201,-1.0756973003984063e-201,-1.0557769818725099e-201,-1.0358566633466137e-201,-1.0159363448207172e-201,-9.960160262948206e-202,-9.760957077689242e-202,-9.561753892430278e-202,-9.362550707171314e-202,-9.163347521912352e-202,-8.964144336653388e-202,-8.764941151394422e-202,-8.56573796613546e-202,-8.366534780876493e-202,-8.16733159561753e-202,-7.968128410358565e-202,-7.768925225099602e-202,-7.569722039840638e-202,-7.370518854581673e-202,-7.171315669322709e-202,-6.972112484063745e-202,-6.77290929880478e-202,-6.573706113545816e-202,-6.374502928286853e-202,-6.175299743027889e-202,-5.976096557768924e-202,-5.77689337250996e-202,-5.577690187250995e-202,-5.378487001992031e-202,-5.179283816733068e-202,-4.980080631474103e-202,-4.78087744621514e-202,-4.581674260956176e-202,-4.3824710756972105e-202,-4.183267890438247e-202,-3.9840647051792827e-202,-3.7848615199203186e-202,-3.585658334661355e-202,-3.3864551494023903e-202,-3.1872519641434266e-202,-2.988048778884462e-202,-2.7888455936254974e-202,-2.589642408366534e-202,-2.3904392231075696e-202,-2.1912360378486054e-202,-1.9920328525896413e-202,-1.7928296673306774e-202,-1.5936264820717132e-202,-1.3944232968127489e-202,-1.195220111553785e-202,-9.960169262948207e-203,-7.968137410358565e-203,-5.976105557768924e-203,-3.984073705179283e-203,-1.9920418525896415e-203,-1.0e-208]}
},{}],36:[function(require,module,exports){
module.exports={"expected":[1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0000000000000002,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0000000000000002],"x":[1.0e-300,9.980079681474106e-301,9.960159362948207e-301,9.94023904442231e-301,9.920318725896415e-301,9.900398407370519e-301,9.880478088844623e-301,9.860557770318725e-301,9.840637451792829e-301,9.820717133266933e-301,9.800796814741037e-301,9.780876496215141e-301,9.760956177689242e-301,9.741035859163347e-301,9.721115540637451e-301,9.701195222111553e-301,9.681274903585657e-301,9.661354585059761e-301,9.641434266533864e-301,9.621513948007968e-301,9.601593629482072e-301,9.581673310956176e-301,9.56175299243028e-301,9.541832673904382e-301,9.521912355378486e-301,9.501992036852588e-301,9.482071718326694e-301,9.462151399800798e-301,9.442231081274899e-301,9.422310762749004e-301,9.402390444223108e-301,9.38247012569721e-301,9.362549807171316e-301,9.342629488645419e-301,9.322709170119521e-301,9.302788851593627e-301,9.282868533067729e-301,9.262948214541833e-301,9.243027896015937e-301,9.22310757749004e-301,9.203187258964143e-301,9.183266940438247e-301,9.163346621912351e-301,9.143426303386455e-301,9.123505984860558e-301,9.103585666334662e-301,9.083665347808764e-301,9.06374502928287e-301,9.043824710756974e-301,9.023904392231074e-301,9.00398407370518e-301,8.984063755179282e-301,8.964143436653386e-301,8.944223118127492e-301,8.924302799601594e-301,8.904382481075697e-301,8.884462162549802e-301,8.864541844023905e-301,8.844621525498009e-301,8.824701206972113e-301,8.804780888446215e-301,8.784860569920319e-301,8.764940251394421e-301,8.745019932868527e-301,8.72509961434263e-301,8.705179295816731e-301,8.685258977290837e-301,8.66533865876494e-301,8.645418340239043e-301,8.625498021713149e-301,8.605577703187251e-301,8.585657384661354e-301,8.565737066135458e-301,8.545816747609562e-301,8.525896429083666e-301,8.50597611055777e-301,8.486055792031872e-301,8.466135473505976e-301,8.44621515498008e-301,8.426294836454184e-301,8.406374517928286e-301,8.38645419940239e-301,8.366533880876494e-301,8.346613562350597e-301,8.326693243824702e-301,8.306772925298805e-301,8.286852606772909e-301,8.266932288247013e-301,8.247011969721115e-301,8.227091651195219e-301,8.207171332669325e-301,8.187251014143427e-301,8.16733069561753e-301,8.147410377091633e-301,8.127490058565737e-301,8.107569740039841e-301,8.087649421513945e-301,8.067729102988048e-301,8.04780878446215e-301,8.027888465936256e-301,8.00796814741036e-301,7.988047828884462e-301,7.968127510358568e-301,7.94820719183267e-301,7.928286873306772e-301,7.908366554780878e-301,7.88844623625498e-301,7.868525917729084e-301,7.848605599203187e-301,7.82868528067729e-301,7.808764962151395e-301,7.788844643625499e-301,7.768924325099603e-301,7.749004006573705e-301,7.729083688047807e-301,7.709163369521913e-301,7.689243050996017e-301,7.669322732470119e-301,7.649402413944225e-301,7.629482095418325e-301,7.609561776892431e-301,7.589641458366533e-301,7.569721139840637e-301,7.549800821314741e-301,7.529880502788844e-301,7.509960184262948e-301,7.490039865737053e-301,7.470119547211156e-301,7.450199228685259e-301,7.430278910159363e-301,7.410358591633465e-301,7.39043827310757e-301,7.370517954581674e-301,7.350597636055776e-301,7.33067731752988e-301,7.310756999003985e-301,7.2908366804780875e-301,7.2709163619521915e-301,7.250996043426295e-301,7.231075724900399e-301,7.211155406374503e-301,7.191235087848606e-301,7.171314769322709e-301,7.151394450796814e-301,7.131474132270916e-301,7.11155381374502e-301,7.091633495219123e-301,7.0717131766932264e-301,7.051792858167331e-301,7.0318725396414344e-301,7.011952221115538e-301,6.9920319025896416e-301,6.9721115840637456e-301,6.952191265537849e-301,6.932270947011952e-301,6.912350628486056e-301,6.89243030996016e-301,6.872509991434263e-301,6.852589672908367e-301,6.83266935438247e-301,6.812749035856574e-301,6.792828717330678e-301,6.7729083988047805e-301,6.7529880802788845e-301,6.7330677617529885e-301,6.713147443227092e-301,6.693227124701196e-301,6.673306806175299e-301,6.653386487649402e-301,6.633466169123507e-301,6.613545850597609e-301,6.593625532071713e-301,6.573705213545817e-301,6.55378489501992e-301,6.533864576494024e-301,6.513944257968128e-301,6.4940239394422306e-301,6.474103620916335e-301,6.4541833023904386e-301,6.434262983864542e-301,6.414342665338646e-301,6.394422346812749e-301,6.374502028286853e-301,6.354581709760957e-301,6.33466139123506e-301,6.314741072709163e-301,6.294820754183267e-301,6.274900435657371e-301,6.254980117131474e-301,6.2350597986055775e-301,6.2151394800796815e-301,6.1952191615537855e-301,6.175298843027889e-301,6.155378524501992e-301,6.135458205976096e-301,6.1155378874502e-301,6.095617568924303e-301,6.075697250398406e-301,6.05577693187251e-301,6.035856613346614e-301,6.015936294820717e-301,5.996015976294821e-301,5.9760956577689236e-301,5.956175339243028e-301,5.936255020717132e-301,5.916334702191235e-301,5.896414383665339e-301,5.8764940651394435e-301,5.856573746613546e-301,5.83665342808765e-301,5.816733109561753e-301,5.796812791035856e-301,5.776892472509961e-301,5.756972153984063e-301,5.737051835458167e-301,5.7171315169322705e-301,5.6972111984063745e-301,5.6772908798804785e-301,5.657370561354582e-301,5.637450242828685e-301,5.61752992430279e-301,5.597609605776893e-301,5.577689287250996e-301,5.557768968725099e-301,5.537848650199204e-301,5.517928331673307e-301,5.49800801314741e-301,5.478087694621514e-301,5.458167376095617e-301,5.438247057569721e-301,5.418326739043825e-301,5.398406420517928e-301,5.378486101992032e-301,5.3585657834661365e-301,5.338645464940239e-301,5.318725146414343e-301,5.298804827888446e-301,5.27888450936255e-301,5.258964190836654e-301,5.239043872310756e-301,5.21912355378486e-301,5.199203235258965e-301,5.1792829167330675e-301,5.1593625982071715e-301,5.1394422796812755e-301,5.119521961155378e-301,5.099601642629483e-301,5.079681324103586e-301,5.059761005577689e-301,5.039840687051793e-301,5.019920368525897e-301,5.00000005e-301,4.980079731474104e-301,4.960159412948207e-301,4.940239094422311e-301,4.920318775896414e-301,4.900398457370518e-301,4.8804781388446215e-301,4.8605578203187255e-301,4.840637501792829e-301,4.820717183266933e-301,4.800796864741036e-301,4.780876546215139e-301,4.760956227689243e-301,4.741035909163347e-301,4.72111559063745e-301,4.701195272111553e-301,4.681274953585658e-301,4.661354635059761e-301,4.6414343165338645e-301,4.6215139980079685e-301,4.601593679482072e-301,4.581673360956176e-301,4.56175304243028e-301,4.541832723904382e-301,4.521912405378487e-301,4.501992086852591e-301,4.482071768326693e-301,4.462151449800797e-301,4.4422311312749e-301,4.422310812749004e-301,4.402390494223108e-301,4.3824701756972105e-301,4.3625498571713145e-301,4.3426295386454185e-301,4.322709220119522e-301,4.302788901593626e-301,4.282868583067729e-301,4.262948264541833e-301,4.243027946015937e-301,4.22310762749004e-301,4.203187308964143e-301,4.183266990438246e-301,4.163346671912351e-301,4.143426353386454e-301,4.1235060348605575e-301,4.1035857163346615e-301,4.0836653978087654e-301,4.063745079282869e-301,4.043824760756973e-301,4.023904442231075e-301,4.00398412370518e-301,3.984063805179284e-301,3.964143486653386e-301,3.94422316812749e-301,3.924302849601594e-301,3.904382531075697e-301,3.884462212549801e-301,3.8645418940239035e-301,3.8446215754980075e-301,3.824701256972112e-301,3.8047809384462155e-301,3.784860619920319e-301,3.764940301394423e-301,3.745019982868526e-301,3.72509966434263e-301,3.705179345816733e-301,3.685259027290837e-301,3.66533870876494e-301,3.645418390239044e-301,3.6254980717131477e-301,3.6055777531872513e-301,3.5856574346613544e-301,3.5657371161354584e-301,3.545816797609562e-301,3.525896479083665e-301,3.5059761605577688e-301,3.4860558420318727e-301,3.4661355235059763e-301,3.4462152049800795e-301,3.4262948864541835e-301,3.406374567928287e-301,3.3864542494023906e-301,3.366533930876494e-301,3.3466136123505978e-301,3.3266932938247014e-301,3.306772975298805e-301,3.2868526567729085e-301,3.266932338247012e-301,3.2470120197211157e-301,3.2270917011952197e-301,3.207171382669323e-301,3.187251064143426e-301,3.1673307456175304e-301,3.1474104270916335e-301,3.127490108565737e-301,3.1075697900398403e-301,3.0876494715139443e-301,3.067729152988048e-301,3.0478088344621514e-301,3.027888515936255e-301,3.0079681974103586e-301,2.988047878884462e-301,2.968127560358566e-301,2.9482072418326693e-301,2.928286923306773e-301,2.908366604780877e-301,2.88844628625498e-301,2.8685259677290836e-301,2.8486056492031868e-301,2.828685330677291e-301,2.8087650121513944e-301,2.788844693625498e-301,2.7689243750996015e-301,2.7490040565737055e-301,2.7290837380478087e-301,2.7091634195219127e-301,2.689243100996016e-301,2.66932278247012e-301,2.649402463944223e-301,2.629482145418327e-301,2.60956182689243e-301,2.589641508366534e-301,2.5697211898406377e-301,2.549800871314741e-301,2.5298805527888444e-301,2.5099602342629484e-301,2.490039915737052e-301,2.470119597211155e-301,2.450199278685259e-301,2.4302789601593627e-301,2.4103586416334663e-301,2.3904383231075695e-301,2.3705180045816735e-301,2.350597686055777e-301,2.3306773675298806e-301,2.310757049003984e-301,2.2908367304780878e-301,2.2709164119521913e-301,2.250996093426295e-301,2.2310757749003985e-301,2.2111554563745017e-301,2.1912351378486056e-301,2.1713148193227092e-301,2.151394500796813e-301,2.131474182270916e-301,2.1115538637450204e-301,2.0916335452191235e-301,2.071713226693227e-301,2.0517929081673307e-301,2.0318725896414347e-301,2.011952271115538e-301,1.992031952589642e-301,1.972111634063745e-301,1.952191315537849e-301,1.932270997011952e-301,1.9123506784860557e-301,1.8924303599601593e-301,1.8725100414342633e-301,1.8525897229083667e-301,1.8326694043824702e-301,1.812749085856574e-301,1.7928287673306774e-301,1.7729084488047812e-301,1.7529881302788843e-301,1.733067811752988e-301,1.7131474932270917e-301,1.693227174701195e-301,1.6733068561752988e-301,1.6533865376494022e-301,1.633466219123506e-301,1.6135459005976096e-301,1.5936255820717132e-301,1.5737052635458167e-301,1.5537849450199203e-301,1.5338646264940239e-301,1.5139443079681277e-301,1.494023989442231e-301,1.4741036709163348e-301,1.4541833523904384e-301,1.4342630338645418e-301,1.4143427153386453e-301,1.394422396812749e-301,1.3745020782868525e-301,1.3545817597609563e-301,1.3346614412350597e-301,1.3147411227091634e-301,1.2948208041832668e-301,1.2749004856573706e-301,1.2549801671314742e-301,1.2350598486055777e-301,1.2151395300796813e-301,1.195219211553785e-301,1.1752988930278885e-301,1.1553785745019923e-301,1.1354582559760956e-301,1.1155379374501992e-301,1.0956176189243026e-301,1.0756973003984064e-301,1.05577698187251e-301,1.0358566633466135e-301,1.015936344820717e-301,9.960160262948209e-302,9.760957077689242e-302,9.56175389243028e-302,9.362550707171316e-302,9.163347521912351e-302,8.964144336653387e-302,8.764941151394421e-302,8.565737966135458e-302,8.366534780876494e-302,8.16733159561753e-302,7.968128410358565e-302,7.768925225099601e-302,7.569722039840638e-302,7.370518854581674e-302,7.171315669322708e-302,6.972112484063744e-302,6.772909298804781e-302,6.573706113545817e-302,6.374502928286853e-302,6.175299743027888e-302,5.976096557768924e-302,5.776893372509961e-302,5.577690187250996e-302,5.378487001992031e-302,5.179283816733067e-302,4.980080631474104e-302,4.78087744621514e-302,4.5816742609561755e-302,4.382471075697211e-302,4.183267890438247e-302,3.984064705179283e-302,3.784861519920319e-302,3.585658334661355e-302,3.3864551494023906e-302,3.1872519641434264e-302,2.988048778884462e-302,2.7888455936254984e-302,2.5896424083665337e-302,2.39043922310757e-302,2.1912360378486057e-302,1.9920328525896415e-302,1.7928296673306775e-302,1.5936264820717133e-302,1.394423296812749e-302,1.1952201115537848e-302,9.960169262948207e-303,7.968137410358566e-303,5.976105557768924e-303,3.9840737051792834e-303,1.9920418525896414e-303,1.0e-308]}
},{}],37:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var sinc = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof sinc, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the cardinal sine', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinc( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 2.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cardinal sine (large negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinc( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 2.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cardinal sine (large positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinc( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 2.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cardinal sine (tiny negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinc( x[i] );
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

tape( 'the function computes the cardinal sine (tiny positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinc( x[i] );
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
	var v = sinc( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `1.0` if provided `0.0`', function test( t ) {
	var v = sinc( 0.0 );
	t.equal( v, 1.0, 'returns 1.0' );
	t.end();
});

tape( 'the function returns `0.0` if provided positive or negative infinity', function test( t ) {
	var v = sinc( PINF );
	t.equal( v, 0.0, 'returns 0.0' );

	v = sinc( NINF );
	t.equal( v, 0.0, 'returns 0.0' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/sinc/test/test.js")
},{"./../lib":30,"./fixtures/julia/data.json":32,"./fixtures/julia/large_negative.json":33,"./fixtures/julia/large_positive.json":34,"./fixtures/julia/tiny_negative.json":35,"./fixtures/julia/tiny_positive.json":36,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/abs":9,"@stdlib/math/constants/float64-eps":59,"@stdlib/math/constants/float64-ninf":65,"@stdlib/math/constants/float64-pinf":67,"tape":125}],38:[function(require,module,exports){
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

},{"./sinpi.js":39}],39:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/abs":9,"@stdlib/math/base/special/copysign":11,"@stdlib/math/base/special/cos":13,"@stdlib/math/base/special/sin":28,"@stdlib/math/constants/float64-pi":66}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"./evalpoly.js":40}],42:[function(require,module,exports){
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

},{"./evalpoly.js":40,"./factory.js":41,"@stdlib/utils/define-read-only-property":70}],43:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":50,"@stdlib/math/constants/float64-exponent-bias":60,"@stdlib/math/constants/float64-high-word-exponent-mask":61}],44:[function(require,module,exports){
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

},{"./exponent.js":43}],45:[function(require,module,exports){
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

},{"./indices.js":47}],46:[function(require,module,exports){
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

},{"./from_words.js":45}],47:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],48:[function(require,module,exports){
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

},{"./high.js":49}],49:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],50:[function(require,module,exports){
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

},{"./get_high_word.js":48}],51:[function(require,module,exports){
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

},{"./low.js":53}],52:[function(require,module,exports){
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

},{"./get_low_word.js":51}],53:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],54:[function(require,module,exports){
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

},{"./normalize.js":55}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/abs":9,"@stdlib/math/constants/float64-smallest-normal":68}],56:[function(require,module,exports){
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

},{"./to_words.js":58}],57:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":47}],58:[function(require,module,exports){
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

},{"./indices.js":57}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{"./define_read_only_property.js":69}],71:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){

},{}],73:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"dup":72}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{"base64-js":71,"ieee754":94}],76:[function(require,module,exports){
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
},{"../../is-buffer/index.js":96}],77:[function(require,module,exports){
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

},{"./lib/is_arguments.js":78,"./lib/keys.js":79}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],80:[function(require,module,exports){
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

},{"foreach":90,"object-keys":99}],81:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],82:[function(require,module,exports){
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

},{"./helpers/isFinite":83,"./helpers/isNaN":84,"./helpers/mod":85,"./helpers/sign":86,"es-to-primitive/es5":87,"has":93,"is-callable":97}],83:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],84:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],85:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],86:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],87:[function(require,module,exports){
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

},{"./helpers/isPrimitive":88,"is-callable":97}],88:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){

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


},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":91}],93:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":92}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"./isArguments":100}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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
},{"_process":74}],102:[function(require,module,exports){
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
},{"_process":74}],103:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":104}],104:[function(require,module,exports){
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
},{"./_stream_readable":106,"./_stream_writable":108,"core-util-is":76,"inherits":95,"process-nextick-args":102}],105:[function(require,module,exports){
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
},{"./_stream_transform":107,"core-util-is":76,"inherits":95}],106:[function(require,module,exports){
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
},{"./_stream_duplex":104,"./internal/streams/BufferList":109,"./internal/streams/destroy":110,"./internal/streams/stream":111,"_process":74,"core-util-is":76,"events":89,"inherits":95,"isarray":112,"process-nextick-args":102,"safe-buffer":119,"string_decoder/":113,"util":72}],107:[function(require,module,exports){
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
},{"./_stream_duplex":104,"core-util-is":76,"inherits":95}],108:[function(require,module,exports){
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
},{"./_stream_duplex":104,"./internal/streams/destroy":110,"./internal/streams/stream":111,"_process":74,"core-util-is":76,"inherits":95,"process-nextick-args":102,"safe-buffer":119,"util-deprecate":131}],109:[function(require,module,exports){
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
},{"safe-buffer":119}],110:[function(require,module,exports){
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
},{"process-nextick-args":102}],111:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":89}],112:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],113:[function(require,module,exports){
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
},{"safe-buffer":119}],114:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":115}],115:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":104,"./lib/_stream_passthrough.js":105,"./lib/_stream_readable.js":106,"./lib/_stream_transform.js":107,"./lib/_stream_writable.js":108}],116:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":115}],117:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":108}],118:[function(require,module,exports){
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
},{"_process":74,"through":130}],119:[function(require,module,exports){
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

},{"buffer":75}],120:[function(require,module,exports){
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

},{"events":89,"inherits":95,"readable-stream/duplex.js":103,"readable-stream/passthrough.js":114,"readable-stream/readable.js":115,"readable-stream/transform.js":116,"readable-stream/writable.js":117}],121:[function(require,module,exports){
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

},{"es-abstract/es5":82,"function-bind":92}],122:[function(require,module,exports){
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

},{"./implementation":121,"./polyfill":123,"./shim":124,"define-properties":80,"function-bind":92}],123:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":121}],124:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":123,"define-properties":80}],125:[function(require,module,exports){
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
},{"./lib/default_stream":126,"./lib/results":128,"./lib/test":129,"_process":74,"defined":81,"through":130}],126:[function(require,module,exports){
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
},{"_process":74,"fs":73,"through":130}],127:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":74}],128:[function(require,module,exports){
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
},{"_process":74,"events":89,"function-bind":92,"has":93,"inherits":95,"object-inspect":98,"resumer":118,"through":130}],129:[function(require,module,exports){
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
},{"./next_tick":127,"deep-equal":77,"defined":81,"events":89,"has":93,"inherits":95,"path":101,"string.prototype.trim":122}],130:[function(require,module,exports){
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
},{"_process":74,"stream":120}],131:[function(require,module,exports){
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
},{}]},{},[37]);
