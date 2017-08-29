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

},{"@stdlib/math/constants/float64-ninf":67,"@stdlib/math/constants/float64-pinf":68}],6:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":67}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":68}],12:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":48,"@stdlib/math/base/utils/float64-get-high-word":52,"@stdlib/math/base/utils/float64-to-words":58}],17:[function(require,module,exports){
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

var TINY = 1e-300;
var VERY_TINY = 2.848094538889218e-306; // 0x00800000, 0x00000000

// 2**-28 = 1/(1<<28) = 1/268435456
var SMALL = 3.725290298461914e-9;

var ERX = 8.45062911510467529297e-1; // 0x3FEB0AC1, 0x60000000

// Coefficients for approximation to erf on [0, 0.84375)
var EFX = 1.28379167095512586316e-1;  // 0x3FC06EBA, 0x8214DB69
var EFX8 = 1.02703333676410069053;    // 0x3FF06EBA, 0x8214DB69
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
* Evaluates the error function.
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
* var y = erf( 2.0 );
* // returns ~0.9953
*
* @example
* var y = erf( -1.0 );
* // returns ~-0.8427
*
* @example
* var y = erf( -0.0 );
* // returns -0.0
*
* @example
* var y = erf( NaN );
* // returns NaN
*/
function erf( x ) {
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
		return 1.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return -1.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return x;
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
			if ( ax < VERY_TINY ) {
				// Avoid underflow:
				return 0.125 * ( (8.0*x) + (EFX8*x) );
			}
			return x + (EFX*x);
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;
		return x + (x*y);
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return -ERX - (p/q);
		}
		return ERX + (p/q);
	}
	// +inf > |x| >= 6
	if ( ax >= 6.0 ) {
		if ( sign ) {
			return TINY - 1.0; // raise inexact
		}
		return 1.0 - TINY; // raise inexact
	}
	s = 1.0 / (ax*ax);

	// |x| < 1/0.35 ~ 2.857143
	if ( ax < 2.857142857142857 ) {
		r = RAC + ( s*polyvalRA( s ) );
		s = SAC + ( s*polyvalSA( s ) );
	}
	// |x| >= 1/0.35 ~ 2.857143
	else {
		r = RBC + ( s*polyvalRB( s ) );
		s = SBC + ( s*polyvalSB( s ) );
	}
	z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
	r = exp( -(z*z) - 0.5625 ) * exp( ( (z-ax) * (z+ax) ) + (r/s) );
	if ( sign ) {
		return (r/ax) - 1.0;
	}
	return 1.0 - (r/ax);
} // end FUNCTION erf()


// EXPORTS //

module.exports = erf;

},{"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/exp":35,"@stdlib/math/base/tools/evalpoly":44,"@stdlib/math/base/utils/float64-set-low-word":55,"@stdlib/math/constants/float64-ninf":67,"@stdlib/math/constants/float64-pinf":68}],19:[function(require,module,exports){
'use strict';

/**
* Evaluate the error function.
*
* @module @stdlib/math/base/special/erf
*
* @example
* var erf = require( '@stdlib/math/base/special/erf' );
*
* var y = erf( 2.0 );
* // returns ~0.9953
*
* y = erf( -1.0 );
* // returns ~-0.8427
*
* y = erf( -0.0 );
* // returns -0.0
*
* y = erf( NaN );
* // returns NaN
*/

// MODULES //

var erf = require( './erf.js' );


// EXPORTS //

module.exports = erf;

},{"./erf.js":18}],20:[function(require,module,exports){
module.exports={"expected":[-0.999593047982555,-0.9996038255858644,-0.9996143360360442,-0.9996245854406972,-0.9996345797816159,-0.999644324917021,-0.9996538265837686,-0.9996630903995256,-0.9996721218649155,-0.9996809263656329,-0.9996895091745278,-0.9996978754536608,-0.9997060302563272,-0.9997139785290526,-0.9997217251135585,-0.9997292747486997,-0.9997366320723721,-0.9997438016233925,-0.9997507878433504,-0.9997575950784306,-0.9997642275812101,-0.9997706895124254,-0.9997769849427143,-0.9997831178543296,-0.999789092142827,-0.999794911618726,-0.9998005800091454,-0.9998061009594119,-0.9998114780346441,-0.999816714721311,-0.9998218144287647,-0.9998267804907499,-0.9998316161668872,-0.9998363246441333,-0.999840909038217,-0.9998453723950514,-0.9998497176921229,-0.999853947839857,-0.9998580656829612,-0.9998620740017453,-0.9998659755134199,-0.999869772873372,-0.9998734686764196,-0.9998770654580444,-0.9998805656956037,-0.9998839718095206,-0.9998872861644544,-0.99989051107045,-0.9998936487840674,-0.9998967015094912,-0.9998996713996202,-0.9999025605571389,-0.9999053710355676,-0.9999081048402962,-0.9999107639295977,-0.9999133502156234,-0.9999158655653816,-0.9999183118016967,-0.999920690704151,-0.9999230040100108,-0.9999252534151328,-0.9999274405748563,-0.9999295671048766,-0.9999316345821038,-0.999933644545504,-0.9999355984969263,-0.9999374979019121,-0.9999393441904911,-0.9999411387579606,-0.9999428829656509,-0.9999445781416749,-0.9999462255816645,-0.9999478265494917,-0.9999493822779763,-0.9999508939695795,-0.9999523627970838,-0.9999537899042599,-0.9999551764065204,-0.9999565233915599,-0.9999578319199834,-0.9999591030259211,-0.9999603377176317,-0.9999615369780932,-0.9999627017655818,-0.9999638330142393,-0.9999649316346285,-0.9999659985142777,-0.9999670345182138,-0.999968040489485,-0.9999690172496715,-0.9999699655993871,-0.9999708863187695,-0.9999717801679606,-0.9999726478875767,-0.9999734901991687,-0.9999743078056735,-0.9999751013918546,-0.9999758716247339,-0.9999766191540149,-0.999977344612496,-0.9999780486164752,-0.9999787317661466,-0.999979394645988,-0.9999800378251394,-0.9999806618577751,-0.9999812672834659,-0.9999818546275342,-0.9999824244014016,-0.9999829771029283,-0.999983513216745,-0.9999840332145784,-0.9999845375555684,-0.9999850266865784,-0.9999855010424996,-0.9999859610465474,-0.9999864071105515,-0.9999868396352402,-0.9999872590105169,-0.9999876656157316,-0.9999880598199457,-0.9999884419821903,-0.99998881245172,-0.9999891715682592,-0.9999895196622439,-0.9999898570550575,-0.9999901840592614,-0.9999905009788198,-0.9999908081093194,-0.999991105738185,-0.9999913941448879,-0.9999916736011519,-0.9999919443711527,-0.999992206711713,-0.9999924608724935,-0.9999927070961789,-0.9999929456186599,-0.9999931766692097,-0.9999934004706584,-0.9999936172395607,-0.9999938271863617,-0.9999940305155576,-0.9999942274258526,-0.9999944181103125,-0.9999946027565138,-0.9999947815466897,-0.9999949546578729,-0.9999951222620336,-0.9999952845262157,-0.9999954416126683,-0.999995593678975,-0.9999957408781792,-0.9999958833589069,-0.9999960212654858,-0.9999961547380622,-0.9999962839127144,-0.9999964089215633,-0.9999965298928805,-0.9999966469511936,-0.9999967602173886,-0.9999968698088099,-0.9999969758393579,-0.9999970784195837,-0.9999971776567818,-0.9999972736550802,-0.9999973665155281,-0.999997456336182,-0.9999975432121883,-0.999997627235865,-0.9999977084967813,-0.9999977870818334,-0.9999978630753207,-0.9999979365590184,-0.9999980076122487,-0.9999980763119503,-0.9999981427327458,-0.9999982069470074,-0.9999982690249208,-0.9999983290345479,-0.9999983870418868,-0.9999984431109314,-0.9999984973037286,-0.9999985496804341,-0.9999986002993669,-0.9999986492170626,-0.9999986964883245,-0.9999987421662738,-0.9999987863023987,-0.9999988289466013,-0.9999988701472445,-0.9999989099511963,-0.9999989484038737,-0.9999989855492856,-0.9999990214300732,-0.9999990560875512,-0.9999990895617463,-0.9999991218914355,-0.9999991531141826,-0.9999991832663749,-0.9999992123832574,-0.9999992404989672,-0.9999992676465662,-0.999999293858074,-0.9999993191644977,-0.9999993435958635,-0.9999993671812456,-0.9999993899487948,-0.9999994119257665,-0.9999994331385477,-0.9999994536126833,-0.9999994733729015,-0.9999994924431387,-0.9999995108465636,-0.9999995286056004,-0.9999995457419518,-0.9999995622766211,-0.9999995782299334,-0.9999995936215561,-0.9999996084705203,-0.9999996227952389,-0.9999996366135271,-0.9999996499426198,-0.99999966279919,-0.9999996751993664,-0.9999996871587501,-0.9999996986924311,-0.9999997098150042,-0.9999997205405845,-0.9999997308828225,-0.9999997408549185,-0.9999997504696372,-0.9999997597393206,-0.9999997686759022,-0.9999997772909194,-0.9999997855955259,-0.9999997936005047,-0.9999998013162786,-0.9999998087529229,-0.9999998159201757,-0.9999998228274488,-0.9999998294838386,-0.9999998358981352,-0.9999998420788336,-0.999999848034142,-0.9999998537719914,-0.9999998593000451,-0.9999998646257066,-0.999999869756128,-0.999999874698219,-0.999999879458654,-0.9999998840438797,-0.9999998884601232,-0.9999998927133985,-0.999999896809514,-0.9999999007540784,-0.9999999045525086,-0.9999999082100347,-0.9999999117317067,-0.9999999151224006,-0.9999999183868238,-0.999999921529521,-0.9999999245548792,-0.9999999274671333,-0.999999930270371,-0.999999932968538,-0.9999999355654418,-0.9999999380647575,-0.9999999404700317,-0.9999999427846866,-0.9999999450120246,-0.9999999471552318,-0.9999999492173826,-0.9999999512014429,-0.999999953110274,-0.9999999549466363,-0.9999999567131923,-0.9999999584125103,-0.9999999600470675,-0.9999999616192529,-0.9999999631313705,-0.9999999645856424,-0.9999999659842113,-0.9999999673291432,-0.9999999686224302,-0.999999969865993,-0.9999999710616836,-0.9999999722112869,-0.999999973316524,-0.9999999743790536,-0.9999999754004749,-0.9999999763823288,-0.9999999773261009,-0.9999999782332226,-0.9999999791050733,-0.9999999799429826,-0.9999999807482312,-0.9999999815220534,-0.9999999822656384,-0.9999999829801317,-0.9999999836666372,-0.999999984326218,-0.9999999849598983,-0.9999999855686647,-0.9999999861534671,-0.9999999867152208,-0.9999999872548073,-0.9999999877730751,-0.9999999882708415,-0.9999999887488935,-0.9999999892079889,-0.9999999896488573,-0.999999990072201,-0.9999999904786963,-0.999999990868994,-0.999999991243721,-0.9999999916034801,-0.999999991948852,-0.9999999922803954,-0.999999992598648,-0.9999999929041272,-0.9999999931973311,-0.9999999934787388,-0.9999999937488112,-0.999999994007992,-0.9999999942567078,-0.9999999944953695,-0.9999999947243716,-0.9999999949440944,-0.9999999951549031,-0.9999999953571493,-0.999999995551171,-0.9999999957372933,-0.9999999959158289,-0.9999999960870783,-0.9999999962513308,-0.9999999964088644,-0.9999999965599462,-0.9999999967048332,-0.9999999968437725,-0.9999999969770015,-0.9999999971047485,-0.9999999972272329,-0.9999999973446656,-0.9999999974572494,-0.999999997565179,-0.9999999976686416,-0.999999997767817,-0.9999999978628783,-0.9999999979539915,-0.9999999980413162,-0.9999999981250057,-0.9999999982052074,-0.9999999982820625,-0.9999999983557073,-0.9999999984262722,-0.9999999984938825,-0.999999998558659,-0.9999999986207169,-0.9999999986801676,-0.9999999987371179,-0.9999999987916699,-0.9999999988439221,-0.9999999988939691,-0.9999999989419013,-0.999999998987806,-0.9999999990317665,-0.9999999990738633,-0.9999999991141731,-0.9999999991527702,-0.9999999991897252,-0.9999999992251062,-0.9999999992589786,-0.9999999992914053,-0.9999999993224461,-0.999999999352159,-0.9999999993805992,-0.99999999940782,-0.9999999994338723,-0.9999999994588049,-0.9999999994826649,-0.9999999995054973,-0.9999999995273451,-0.9999999995482499,-0.9999999995682513,-0.9999999995873873,-0.9999999996056945,-0.999999999623208,-0.9999999996399612,-0.9999999996559865,-0.9999999996713146,-0.9999999996859751,-0.9999999996999964,-0.9999999997134058,-0.9999999997262293,-0.9999999997384917,-0.9999999997502174,-0.9999999997614288,-0.9999999997721483,-0.9999999997823967,-0.9999999997921944,-0.9999999998015608,-0.9999999998105142,-0.9999999998190726,-0.999999999827253,-0.9999999998350716,-0.999999999842544,-0.9999999998496852,-0.9999999998565097,-0.999999999863031,-0.9999999998692624,-0.9999999998752163,-0.999999999880905,-0.9999999998863399,-0.9999999998915322,-0.9999999998964924,-0.9999999999012305,-0.9999999999057564,-0.9999999999100794,-0.9999999999142082,-0.9999999999181515,-0.9999999999219173,-0.9999999999255137,-0.9999999999289478,-0.999999999932227,-0.9999999999353579,-0.9999999999383473,-0.9999999999412014,-0.999999999943926,-0.999999999946527,-0.9999999999490099,-0.9999999999513799,-0.999999999953642,-0.999999999955801,-0.9999999999578616,-0.999999999959828,-0.9999999999617046,-0.9999999999634954,-0.9999999999652041,-0.9999999999668344,-0.99999999996839,-0.999999999969874,-0.9999999999712897,-0.9999999999726403,-0.9999999999739286,-0.9999999999751575,-0.9999999999763297,-0.9999999999774476,-0.9999999999785139,-0.9999999999795306,-0.9999999999805003,-0.9999999999814249,-0.9999999999823065,-0.9999999999831471,-0.9999999999839486,-0.9999999999847128,-0.9999999999854412,-0.9999999999861356,-0.9999999999867976,-0.9999999999874286,-0.99999999998803,-0.9999999999886032,-0.9999999999891495,-0.99999999998967,-0.9999999999901662,-0.9999999999906389,-0.9999999999910894,-0.9999999999915186,-0.9999999999919275,-0.999999999992317,-0.9999999999926882,-0.9999999999930418,-0.9999999999933785,-0.9999999999936994,-0.9999999999940049,-0.9999999999942959,-0.9999999999945731,-0.999999999994837,-0.9999999999950884,-0.9999999999953277,-0.9999999999955557,-0.9999999999957726,-0.9999999999959792,-0.9999999999961758,-0.9999999999963631,-0.9999999999965413,-0.9999999999967111,-0.9999999999968725,-0.9999999999970263,-0.9999999999971726,-0.9999999999973118,-0.9999999999974443,-0.9999999999975704,-0.9999999999976904,-0.9999999999978045,-0.9999999999979132,-0.9999999999980166,-0.9999999999981148,-0.9999999999982084,-0.9999999999982974,-0.9999999999983821,-0.9999999999984626],"x":[-2.5,-2.50501002004008,-2.5100200400801604,-2.5150300601202407,-2.5200400801603204,-2.5250501002004007,-2.530060120240481,-2.535070140280561,-2.5400801603206413,-2.5450901803607215,-2.5501002004008018,-2.555110220440882,-2.5601202404809618,-2.565130260521042,-2.570140280561122,-2.5751503006012024,-2.5801603206412826,-2.585170340681363,-2.590180360721443,-2.595190380761523,-2.600200400801603,-2.6052104208416833,-2.6102204408817635,-2.6152304609218437,-2.620240480961924,-2.625250501002004,-2.630260521042084,-2.635270541082164,-2.6402805611222444,-2.6452905811623246,-2.650300601202405,-2.655310621242485,-2.6603206412825653,-2.6653306613226455,-2.6703406813627253,-2.6753507014028055,-2.6803607214428857,-2.685370741482966,-2.690380761523046,-2.6953907815631264,-2.7004008016032066,-2.7054108216432864,-2.7104208416833666,-2.715430861723447,-2.720440881763527,-2.7254509018036073,-2.7304609218436875,-2.7354709418837677,-2.7404809619238475,-2.7454909819639277,-2.750501002004008,-2.755511022044088,-2.7605210420841684,-2.7655310621242486,-2.770541082164329,-2.775551102204409,-2.780561122244489,-2.785571142284569,-2.7905811623246493,-2.7955911823647295,-2.8006012024048097,-2.80561122244489,-2.81062124248497,-2.81563126252505,-2.82064128256513,-2.8256513026052104,-2.8306613226452906,-2.835671342685371,-2.840681362725451,-2.8456913827655312,-2.850701402805611,-2.8557114228456912,-2.8607214428857715,-2.8657314629258517,-2.870741482965932,-2.875751503006012,-2.8807615230460923,-2.8857715430861726,-2.8907815631262523,-2.8957915831663326,-2.900801603206413,-2.905811623246493,-2.9108216432865732,-2.9158316633266534,-2.9208416833667337,-2.9258517034068134,-2.9308617234468937,-2.935871743486974,-2.940881763527054,-2.9458917835671343,-2.9509018036072145,-2.9559118236472948,-2.9609218436873745,-2.9659318637274548,-2.970941883767535,-2.975951903807615,-2.9809619238476954,-2.9859719438877756,-2.990981963927856,-2.995991983967936,-3.001002004008016,-3.006012024048096,-3.0110220440881763,-3.0160320641282565,-3.0210420841683367,-3.026052104208417,-3.031062124248497,-3.036072144288577,-3.041082164328657,-3.0460921843687374,-3.0511022044088176,-3.056112224448898,-3.061122244488978,-3.0661322645290583,-3.071142284569138,-3.0761523046092183,-3.0811623246492985,-3.0861723446893787,-3.091182364729459,-3.096192384769539,-3.1012024048096194,-3.1062124248496996,-3.1112224448897794,-3.1162324649298596,-3.12124248496994,-3.12625250501002,-3.1312625250501003,-3.1362725450901805,-3.1412825651302607,-3.1462925851703405,-3.1513026052104207,-3.156312625250501,-3.161322645290581,-3.1663326653306614,-3.1713426853707416,-3.176352705410822,-3.1813627254509016,-3.186372745490982,-3.191382765531062,-3.1963927855711423,-3.2014028056112225,-3.2064128256513027,-3.211422845691383,-3.216432865731463,-3.221442885771543,-3.226452905811623,-3.2314629258517034,-3.2364729458917836,-3.241482965931864,-3.246492985971944,-3.2515030060120242,-3.256513026052104,-3.2615230460921842,-3.2665330661322645,-3.2715430861723447,-3.276553106212425,-3.281563126252505,-3.2865731462925853,-3.291583166332665,-3.2965931863727453,-3.3016032064128256,-3.306613226452906,-3.311623246492986,-3.3166332665330662,-3.3216432865731464,-3.3266533066132267,-3.3316633266533064,-3.3366733466933867,-3.341683366733467,-3.346693386773547,-3.3517034068136273,-3.3567134268537075,-3.3617234468937878,-3.3667334669338675,-3.3717434869739478,-3.376753507014028,-3.381763527054108,-3.3867735470941884,-3.3917835671342687,-3.396793587174349,-3.4018036072144286,-3.406813627254509,-3.411823647294589,-3.4168336673346693,-3.4218436873747495,-3.4268537074148298,-3.43186372745491,-3.43687374749499,-3.44188376753507,-3.44689378757515,-3.4519038076152304,-3.4569138276553106,-3.461923847695391,-3.466933867735471,-3.4719438877755513,-3.476953907815631,-3.4819639278557113,-3.4869739478957915,-3.4919839679358717,-3.496993987975952,-3.502004008016032,-3.5070140280561124,-3.512024048096192,-3.5170340681362724,-3.5220440881763526,-3.527054108216433,-3.532064128256513,-3.5370741482965933,-3.5420841683366735,-3.5470941883767537,-3.5521042084168335,-3.5571142284569137,-3.562124248496994,-3.567134268537074,-3.5721442885771544,-3.5771543086172346,-3.582164328657315,-3.5871743486973946,-3.592184368737475,-3.597194388777555,-3.6022044088176353,-3.6072144288577155,-3.6122244488977957,-3.617234468937876,-3.6222444889779557,-3.627254509018036,-3.632264529058116,-3.6372745490981964,-3.6422845691382766,-3.647294589178357,-3.652304609218437,-3.6573146292585172,-3.662324649298597,-3.6673346693386772,-3.6723446893787575,-3.6773547094188377,-3.682364729458918,-3.687374749498998,-3.6923847695390783,-3.697394789579158,-3.7024048096192383,-3.7074148296593186,-3.712424849699399,-3.717434869739479,-3.7224448897795592,-3.7274549098196395,-3.7324649298597192,-3.7374749498997994,-3.7424849699398797,-3.74749498997996,-3.75250501002004,-3.7575150300601203,-3.7625250501002006,-3.7675350701402808,-3.7725450901803605,-3.7775551102204408,-3.782565130260521,-3.787575150300601,-3.7925851703406814,-3.7975951903807617,-3.802605210420842,-3.8076152304609217,-3.812625250501002,-3.817635270541082,-3.8226452905811623,-3.8276553106212425,-3.8326653306613228,-3.837675350701403,-3.8426853707414828,-3.847695390781563,-3.852705410821643,-3.8577154308617234,-3.8627254509018036,-3.867735470941884,-3.872745490981964,-3.8777555110220443,-3.882765531062124,-3.8877755511022043,-3.8927855711422845,-3.8977955911823647,-3.902805611222445,-3.907815631262525,-3.9128256513026054,-3.917835671342685,-3.9228456913827654,-3.9278557114228456,-3.932865731462926,-3.937875751503006,-3.9428857715430863,-3.9478957915831665,-3.9529058116232463,-3.9579158316633265,-3.9629258517034067,-3.967935871743487,-3.972945891783567,-3.9779559118236474,-3.9829659318637276,-3.987975951903808,-3.9929859719438876,-3.997995991983968,-4.0030060120240485,-4.008016032064128,-4.013026052104208,-4.018036072144288,-4.0230460921843685,-4.028056112224449,-4.033066132264529,-4.038076152304609,-4.043086172344689,-4.04809619238477,-4.05310621242485,-4.05811623246493,-4.06312625250501,-4.0681362725450905,-4.073146292585171,-4.078156312625251,-4.08316633266533,-4.0881763527054105,-4.093186372745491,-4.098196392785571,-4.103206412825651,-4.108216432865731,-4.113226452905812,-4.118236472945892,-4.123246492985972,-4.128256513026052,-4.1332665330661325,-4.138276553106213,-4.143286573146293,-4.148296593186373,-4.153306613226453,-4.158316633266533,-4.163326653306613,-4.168336673346693,-4.173346693386773,-4.1783567134268536,-4.183366733466934,-4.188376753507014,-4.193386773547094,-4.198396793587174,-4.203406813627255,-4.208416833667335,-4.213426853707415,-4.218436873747495,-4.2234468937875755,-4.228456913827655,-4.233466933867735,-4.238476953907815,-4.2434869739478955,-4.248496993987976,-4.253507014028056,-4.258517034068136,-4.263527054108216,-4.268537074148297,-4.273547094188377,-4.278557114228457,-4.283567134268537,-4.2885771543086175,-4.293587174348698,-4.298597194388778,-4.303607214428857,-4.3086172344689375,-4.313627254509018,-4.318637274549098,-4.323647294589178,-4.328657314629258,-4.333667334669339,-4.338677354709419,-4.343687374749499,-4.348697394789579,-4.3537074148296595,-4.35871743486974,-4.36372745490982,-4.3687374749499,-4.37374749498998,-4.37875751503006,-4.38376753507014,-4.38877755511022,-4.3937875751503,-4.398797595190381,-4.403807615230461,-4.408817635270541,-4.413827655310621,-4.4188376753507015,-4.423847695390782,-4.428857715430862,-4.433867735470942,-4.438877755511022,-4.443887775551103,-4.448897795591182,-4.453907815631262,-4.458917835671342,-4.463927855711423,-4.468937875751503,-4.473947895791583,-4.478957915831663,-4.4839679358717435,-4.488977955911824,-4.493987975951904,-4.498997995991984,-4.504008016032064,-4.509018036072145,-4.514028056112225,-4.519038076152305,-4.524048096192384,-4.529058116232465,-4.534068136272545,-4.539078156312625,-4.544088176352705,-4.5490981963927855,-4.554108216432866,-4.559118236472946,-4.564128256513026,-4.569138276553106,-4.574148296593187,-4.579158316633267,-4.584168336673347,-4.589178356713427,-4.594188376753507,-4.599198396793587,-4.604208416833667,-4.609218436873747,-4.614228456913827,-4.619238476953908,-4.624248496993988,-4.629258517034068,-4.634268537074148,-4.6392785571142285,-4.644288577154309,-4.649298597194389,-4.654308617234469,-4.659318637274549,-4.66432865731463,-4.669338677354709,-4.674348697394789,-4.679358717434869,-4.68436873747495,-4.68937875751503,-4.69438877755511,-4.69939879759519,-4.7044088176352705,-4.709418837675351,-4.714428857715431,-4.719438877755511,-4.724448897795591,-4.729458917835672,-4.734468937875752,-4.739478957915832,-4.744488977955911,-4.749498997995992,-4.754509018036072,-4.759519038076152,-4.764529058116232,-4.7695390781563125,-4.774549098196393,-4.779559118236473,-4.784569138276553,-4.789579158316633,-4.794589178356714,-4.799599198396794,-4.804609218436874,-4.809619238476954,-4.8146292585170345,-4.819639278557114,-4.824649298597194,-4.829659318637274,-4.8346693386773545,-4.839679358717435,-4.844689378757515,-4.849699398797595,-4.854709418837675,-4.859719438877756,-4.864729458917836,-4.869739478957916,-4.874749498997996,-4.8797595190380765,-4.884769539078157,-4.889779559118236,-4.894789579158316,-4.8997995991983965,-4.904809619238477,-4.909819639278557,-4.914829659318637,-4.919839679358717,-4.924849699398798,-4.929859719438878,-4.934869739478958,-4.939879759519038,-4.9448897795591185,-4.949899799599199,-4.954909819639279,-4.959919839679359,-4.9649298597194385,-4.969939879759519,-4.974949899799599,-4.979959919839679,-4.984969939879759,-4.98997995991984,-4.99498997995992,-5.0]}
},{}],21:[function(require,module,exports){
module.exports={"expected":[0.999593047982555,0.9996038255858644,0.9996143360360442,0.9996245854406972,0.9996345797816159,0.999644324917021,0.9996538265837686,0.9996630903995256,0.9996721218649155,0.9996809263656329,0.9996895091745278,0.9996978754536608,0.9997060302563272,0.9997139785290526,0.9997217251135585,0.9997292747486997,0.9997366320723721,0.9997438016233925,0.9997507878433504,0.9997575950784306,0.9997642275812101,0.9997706895124254,0.9997769849427143,0.9997831178543296,0.999789092142827,0.999794911618726,0.9998005800091454,0.9998061009594119,0.9998114780346441,0.999816714721311,0.9998218144287647,0.9998267804907499,0.9998316161668872,0.9998363246441333,0.999840909038217,0.9998453723950514,0.9998497176921229,0.999853947839857,0.9998580656829612,0.9998620740017453,0.9998659755134199,0.999869772873372,0.9998734686764196,0.9998770654580444,0.9998805656956037,0.9998839718095206,0.9998872861644544,0.99989051107045,0.9998936487840674,0.9998967015094912,0.9998996713996202,0.9999025605571389,0.9999053710355676,0.9999081048402962,0.9999107639295977,0.9999133502156234,0.9999158655653816,0.9999183118016967,0.999920690704151,0.9999230040100108,0.9999252534151328,0.9999274405748563,0.9999295671048766,0.9999316345821038,0.999933644545504,0.9999355984969263,0.9999374979019121,0.9999393441904911,0.9999411387579606,0.9999428829656509,0.9999445781416749,0.9999462255816645,0.9999478265494917,0.9999493822779763,0.9999508939695795,0.9999523627970838,0.9999537899042599,0.9999551764065204,0.9999565233915599,0.9999578319199834,0.9999591030259211,0.9999603377176317,0.9999615369780932,0.9999627017655818,0.9999638330142393,0.9999649316346285,0.9999659985142777,0.9999670345182138,0.999968040489485,0.9999690172496715,0.9999699655993871,0.9999708863187695,0.9999717801679606,0.9999726478875767,0.9999734901991687,0.9999743078056735,0.9999751013918546,0.9999758716247339,0.9999766191540149,0.999977344612496,0.9999780486164752,0.9999787317661466,0.999979394645988,0.9999800378251394,0.9999806618577751,0.9999812672834659,0.9999818546275342,0.9999824244014016,0.9999829771029283,0.999983513216745,0.9999840332145784,0.9999845375555684,0.9999850266865784,0.9999855010424996,0.9999859610465474,0.9999864071105515,0.9999868396352402,0.9999872590105169,0.9999876656157316,0.9999880598199457,0.9999884419821903,0.99998881245172,0.9999891715682592,0.9999895196622439,0.9999898570550575,0.9999901840592614,0.9999905009788198,0.9999908081093194,0.999991105738185,0.9999913941448879,0.9999916736011519,0.9999919443711527,0.999992206711713,0.9999924608724935,0.9999927070961789,0.9999929456186599,0.9999931766692097,0.9999934004706584,0.9999936172395607,0.9999938271863617,0.9999940305155576,0.9999942274258526,0.9999944181103125,0.9999946027565138,0.9999947815466897,0.9999949546578729,0.9999951222620336,0.9999952845262157,0.9999954416126683,0.999995593678975,0.9999957408781792,0.9999958833589069,0.9999960212654858,0.9999961547380622,0.9999962839127144,0.9999964089215633,0.9999965298928805,0.9999966469511936,0.9999967602173886,0.9999968698088099,0.9999969758393579,0.9999970784195837,0.9999971776567818,0.9999972736550802,0.9999973665155281,0.999997456336182,0.9999975432121883,0.999997627235865,0.9999977084967813,0.9999977870818334,0.9999978630753207,0.9999979365590184,0.9999980076122487,0.9999980763119503,0.9999981427327458,0.9999982069470074,0.9999982690249208,0.9999983290345479,0.9999983870418868,0.9999984431109314,0.9999984973037286,0.9999985496804341,0.9999986002993669,0.9999986492170626,0.9999986964883245,0.9999987421662738,0.9999987863023987,0.9999988289466013,0.9999988701472445,0.9999989099511963,0.9999989484038737,0.9999989855492856,0.9999990214300732,0.9999990560875512,0.9999990895617463,0.9999991218914355,0.9999991531141826,0.9999991832663749,0.9999992123832574,0.9999992404989672,0.9999992676465662,0.999999293858074,0.9999993191644977,0.9999993435958635,0.9999993671812456,0.9999993899487948,0.9999994119257665,0.9999994331385477,0.9999994536126833,0.9999994733729015,0.9999994924431387,0.9999995108465636,0.9999995286056004,0.9999995457419518,0.9999995622766211,0.9999995782299334,0.9999995936215561,0.9999996084705203,0.9999996227952389,0.9999996366135271,0.9999996499426198,0.99999966279919,0.9999996751993664,0.9999996871587501,0.9999996986924311,0.9999997098150042,0.9999997205405845,0.9999997308828225,0.9999997408549185,0.9999997504696372,0.9999997597393206,0.9999997686759022,0.9999997772909194,0.9999997855955259,0.9999997936005047,0.9999998013162786,0.9999998087529229,0.9999998159201757,0.9999998228274488,0.9999998294838386,0.9999998358981352,0.9999998420788336,0.999999848034142,0.9999998537719914,0.9999998593000451,0.9999998646257066,0.999999869756128,0.999999874698219,0.999999879458654,0.9999998840438797,0.9999998884601232,0.9999998927133985,0.999999896809514,0.9999999007540784,0.9999999045525086,0.9999999082100347,0.9999999117317067,0.9999999151224006,0.9999999183868238,0.999999921529521,0.9999999245548792,0.9999999274671333,0.999999930270371,0.999999932968538,0.9999999355654418,0.9999999380647575,0.9999999404700317,0.9999999427846866,0.9999999450120246,0.9999999471552318,0.9999999492173826,0.9999999512014429,0.999999953110274,0.9999999549466363,0.9999999567131923,0.9999999584125103,0.9999999600470675,0.9999999616192529,0.9999999631313705,0.9999999645856424,0.9999999659842113,0.9999999673291432,0.9999999686224302,0.999999969865993,0.9999999710616836,0.9999999722112869,0.999999973316524,0.9999999743790536,0.9999999754004749,0.9999999763823288,0.9999999773261009,0.9999999782332226,0.9999999791050733,0.9999999799429826,0.9999999807482312,0.9999999815220534,0.9999999822656384,0.9999999829801317,0.9999999836666372,0.999999984326218,0.9999999849598983,0.9999999855686647,0.9999999861534671,0.9999999867152208,0.9999999872548073,0.9999999877730751,0.9999999882708415,0.9999999887488935,0.9999999892079889,0.9999999896488573,0.999999990072201,0.9999999904786963,0.999999990868994,0.999999991243721,0.9999999916034801,0.999999991948852,0.9999999922803954,0.999999992598648,0.9999999929041272,0.9999999931973311,0.9999999934787388,0.9999999937488112,0.999999994007992,0.9999999942567078,0.9999999944953695,0.9999999947243716,0.9999999949440944,0.9999999951549031,0.9999999953571493,0.999999995551171,0.9999999957372933,0.9999999959158289,0.9999999960870783,0.9999999962513308,0.9999999964088644,0.9999999965599462,0.9999999967048332,0.9999999968437725,0.9999999969770015,0.9999999971047485,0.9999999972272329,0.9999999973446656,0.9999999974572494,0.999999997565179,0.9999999976686416,0.999999997767817,0.9999999978628783,0.9999999979539915,0.9999999980413162,0.9999999981250057,0.9999999982052074,0.9999999982820625,0.9999999983557073,0.9999999984262722,0.9999999984938825,0.999999998558659,0.9999999986207169,0.9999999986801676,0.9999999987371179,0.9999999987916699,0.9999999988439221,0.9999999988939691,0.9999999989419013,0.999999998987806,0.9999999990317665,0.9999999990738633,0.9999999991141731,0.9999999991527702,0.9999999991897252,0.9999999992251062,0.9999999992589786,0.9999999992914053,0.9999999993224461,0.999999999352159,0.9999999993805992,0.99999999940782,0.9999999994338723,0.9999999994588049,0.9999999994826649,0.9999999995054973,0.9999999995273451,0.9999999995482499,0.9999999995682513,0.9999999995873873,0.9999999996056945,0.999999999623208,0.9999999996399612,0.9999999996559865,0.9999999996713146,0.9999999996859751,0.9999999996999964,0.9999999997134058,0.9999999997262293,0.9999999997384917,0.9999999997502174,0.9999999997614288,0.9999999997721483,0.9999999997823967,0.9999999997921944,0.9999999998015608,0.9999999998105142,0.9999999998190726,0.999999999827253,0.9999999998350716,0.999999999842544,0.9999999998496852,0.9999999998565097,0.999999999863031,0.9999999998692624,0.9999999998752163,0.999999999880905,0.9999999998863399,0.9999999998915322,0.9999999998964924,0.9999999999012305,0.9999999999057564,0.9999999999100794,0.9999999999142082,0.9999999999181515,0.9999999999219173,0.9999999999255137,0.9999999999289478,0.999999999932227,0.9999999999353579,0.9999999999383473,0.9999999999412014,0.999999999943926,0.999999999946527,0.9999999999490099,0.9999999999513799,0.999999999953642,0.999999999955801,0.9999999999578616,0.999999999959828,0.9999999999617046,0.9999999999634954,0.9999999999652041,0.9999999999668344,0.99999999996839,0.999999999969874,0.9999999999712897,0.9999999999726403,0.9999999999739286,0.9999999999751575,0.9999999999763297,0.9999999999774476,0.9999999999785139,0.9999999999795306,0.9999999999805003,0.9999999999814249,0.9999999999823065,0.9999999999831471,0.9999999999839486,0.9999999999847128,0.9999999999854412,0.9999999999861356,0.9999999999867976,0.9999999999874286,0.99999999998803,0.9999999999886032,0.9999999999891495,0.99999999998967,0.9999999999901662,0.9999999999906389,0.9999999999910894,0.9999999999915186,0.9999999999919275,0.999999999992317,0.9999999999926882,0.9999999999930418,0.9999999999933785,0.9999999999936994,0.9999999999940049,0.9999999999942959,0.9999999999945731,0.999999999994837,0.9999999999950884,0.9999999999953277,0.9999999999955557,0.9999999999957726,0.9999999999959792,0.9999999999961758,0.9999999999963631,0.9999999999965413,0.9999999999967111,0.9999999999968725,0.9999999999970263,0.9999999999971726,0.9999999999973118,0.9999999999974443,0.9999999999975704,0.9999999999976904,0.9999999999978045,0.9999999999979132,0.9999999999980166,0.9999999999981148,0.9999999999982084,0.9999999999982974,0.9999999999983821,0.9999999999984626],"x":[2.5,2.50501002004008,2.5100200400801604,2.5150300601202407,2.5200400801603204,2.5250501002004007,2.530060120240481,2.535070140280561,2.5400801603206413,2.5450901803607215,2.5501002004008018,2.555110220440882,2.5601202404809618,2.565130260521042,2.570140280561122,2.5751503006012024,2.5801603206412826,2.585170340681363,2.590180360721443,2.595190380761523,2.600200400801603,2.6052104208416833,2.6102204408817635,2.6152304609218437,2.620240480961924,2.625250501002004,2.630260521042084,2.635270541082164,2.6402805611222444,2.6452905811623246,2.650300601202405,2.655310621242485,2.6603206412825653,2.6653306613226455,2.6703406813627253,2.6753507014028055,2.6803607214428857,2.685370741482966,2.690380761523046,2.6953907815631264,2.7004008016032066,2.7054108216432864,2.7104208416833666,2.715430861723447,2.720440881763527,2.7254509018036073,2.7304609218436875,2.7354709418837677,2.7404809619238475,2.7454909819639277,2.750501002004008,2.755511022044088,2.7605210420841684,2.7655310621242486,2.770541082164329,2.775551102204409,2.780561122244489,2.785571142284569,2.7905811623246493,2.7955911823647295,2.8006012024048097,2.80561122244489,2.81062124248497,2.81563126252505,2.82064128256513,2.8256513026052104,2.8306613226452906,2.835671342685371,2.840681362725451,2.8456913827655312,2.850701402805611,2.8557114228456912,2.8607214428857715,2.8657314629258517,2.870741482965932,2.875751503006012,2.8807615230460923,2.8857715430861726,2.8907815631262523,2.8957915831663326,2.900801603206413,2.905811623246493,2.9108216432865732,2.9158316633266534,2.9208416833667337,2.9258517034068134,2.9308617234468937,2.935871743486974,2.940881763527054,2.9458917835671343,2.9509018036072145,2.9559118236472948,2.9609218436873745,2.9659318637274548,2.970941883767535,2.975951903807615,2.9809619238476954,2.9859719438877756,2.990981963927856,2.995991983967936,3.001002004008016,3.006012024048096,3.0110220440881763,3.0160320641282565,3.0210420841683367,3.026052104208417,3.031062124248497,3.036072144288577,3.041082164328657,3.0460921843687374,3.0511022044088176,3.056112224448898,3.061122244488978,3.0661322645290583,3.071142284569138,3.0761523046092183,3.0811623246492985,3.0861723446893787,3.091182364729459,3.096192384769539,3.1012024048096194,3.1062124248496996,3.1112224448897794,3.1162324649298596,3.12124248496994,3.12625250501002,3.1312625250501003,3.1362725450901805,3.1412825651302607,3.1462925851703405,3.1513026052104207,3.156312625250501,3.161322645290581,3.1663326653306614,3.1713426853707416,3.176352705410822,3.1813627254509016,3.186372745490982,3.191382765531062,3.1963927855711423,3.2014028056112225,3.2064128256513027,3.211422845691383,3.216432865731463,3.221442885771543,3.226452905811623,3.2314629258517034,3.2364729458917836,3.241482965931864,3.246492985971944,3.2515030060120242,3.256513026052104,3.2615230460921842,3.2665330661322645,3.2715430861723447,3.276553106212425,3.281563126252505,3.2865731462925853,3.291583166332665,3.2965931863727453,3.3016032064128256,3.306613226452906,3.311623246492986,3.3166332665330662,3.3216432865731464,3.3266533066132267,3.3316633266533064,3.3366733466933867,3.341683366733467,3.346693386773547,3.3517034068136273,3.3567134268537075,3.3617234468937878,3.3667334669338675,3.3717434869739478,3.376753507014028,3.381763527054108,3.3867735470941884,3.3917835671342687,3.396793587174349,3.4018036072144286,3.406813627254509,3.411823647294589,3.4168336673346693,3.4218436873747495,3.4268537074148298,3.43186372745491,3.43687374749499,3.44188376753507,3.44689378757515,3.4519038076152304,3.4569138276553106,3.461923847695391,3.466933867735471,3.4719438877755513,3.476953907815631,3.4819639278557113,3.4869739478957915,3.4919839679358717,3.496993987975952,3.502004008016032,3.5070140280561124,3.512024048096192,3.5170340681362724,3.5220440881763526,3.527054108216433,3.532064128256513,3.5370741482965933,3.5420841683366735,3.5470941883767537,3.5521042084168335,3.5571142284569137,3.562124248496994,3.567134268537074,3.5721442885771544,3.5771543086172346,3.582164328657315,3.5871743486973946,3.592184368737475,3.597194388777555,3.6022044088176353,3.6072144288577155,3.6122244488977957,3.617234468937876,3.6222444889779557,3.627254509018036,3.632264529058116,3.6372745490981964,3.6422845691382766,3.647294589178357,3.652304609218437,3.6573146292585172,3.662324649298597,3.6673346693386772,3.6723446893787575,3.6773547094188377,3.682364729458918,3.687374749498998,3.6923847695390783,3.697394789579158,3.7024048096192383,3.7074148296593186,3.712424849699399,3.717434869739479,3.7224448897795592,3.7274549098196395,3.7324649298597192,3.7374749498997994,3.7424849699398797,3.74749498997996,3.75250501002004,3.7575150300601203,3.7625250501002006,3.7675350701402808,3.7725450901803605,3.7775551102204408,3.782565130260521,3.787575150300601,3.7925851703406814,3.7975951903807617,3.802605210420842,3.8076152304609217,3.812625250501002,3.817635270541082,3.8226452905811623,3.8276553106212425,3.8326653306613228,3.837675350701403,3.8426853707414828,3.847695390781563,3.852705410821643,3.8577154308617234,3.8627254509018036,3.867735470941884,3.872745490981964,3.8777555110220443,3.882765531062124,3.8877755511022043,3.8927855711422845,3.8977955911823647,3.902805611222445,3.907815631262525,3.9128256513026054,3.917835671342685,3.9228456913827654,3.9278557114228456,3.932865731462926,3.937875751503006,3.9428857715430863,3.9478957915831665,3.9529058116232463,3.9579158316633265,3.9629258517034067,3.967935871743487,3.972945891783567,3.9779559118236474,3.9829659318637276,3.987975951903808,3.9929859719438876,3.997995991983968,4.0030060120240485,4.008016032064128,4.013026052104208,4.018036072144288,4.0230460921843685,4.028056112224449,4.033066132264529,4.038076152304609,4.043086172344689,4.04809619238477,4.05310621242485,4.05811623246493,4.06312625250501,4.0681362725450905,4.073146292585171,4.078156312625251,4.08316633266533,4.0881763527054105,4.093186372745491,4.098196392785571,4.103206412825651,4.108216432865731,4.113226452905812,4.118236472945892,4.123246492985972,4.128256513026052,4.1332665330661325,4.138276553106213,4.143286573146293,4.148296593186373,4.153306613226453,4.158316633266533,4.163326653306613,4.168336673346693,4.173346693386773,4.1783567134268536,4.183366733466934,4.188376753507014,4.193386773547094,4.198396793587174,4.203406813627255,4.208416833667335,4.213426853707415,4.218436873747495,4.2234468937875755,4.228456913827655,4.233466933867735,4.238476953907815,4.2434869739478955,4.248496993987976,4.253507014028056,4.258517034068136,4.263527054108216,4.268537074148297,4.273547094188377,4.278557114228457,4.283567134268537,4.2885771543086175,4.293587174348698,4.298597194388778,4.303607214428857,4.3086172344689375,4.313627254509018,4.318637274549098,4.323647294589178,4.328657314629258,4.333667334669339,4.338677354709419,4.343687374749499,4.348697394789579,4.3537074148296595,4.35871743486974,4.36372745490982,4.3687374749499,4.37374749498998,4.37875751503006,4.38376753507014,4.38877755511022,4.3937875751503,4.398797595190381,4.403807615230461,4.408817635270541,4.413827655310621,4.4188376753507015,4.423847695390782,4.428857715430862,4.433867735470942,4.438877755511022,4.443887775551103,4.448897795591182,4.453907815631262,4.458917835671342,4.463927855711423,4.468937875751503,4.473947895791583,4.478957915831663,4.4839679358717435,4.488977955911824,4.493987975951904,4.498997995991984,4.504008016032064,4.509018036072145,4.514028056112225,4.519038076152305,4.524048096192384,4.529058116232465,4.534068136272545,4.539078156312625,4.544088176352705,4.5490981963927855,4.554108216432866,4.559118236472946,4.564128256513026,4.569138276553106,4.574148296593187,4.579158316633267,4.584168336673347,4.589178356713427,4.594188376753507,4.599198396793587,4.604208416833667,4.609218436873747,4.614228456913827,4.619238476953908,4.624248496993988,4.629258517034068,4.634268537074148,4.6392785571142285,4.644288577154309,4.649298597194389,4.654308617234469,4.659318637274549,4.66432865731463,4.669338677354709,4.674348697394789,4.679358717434869,4.68436873747495,4.68937875751503,4.69438877755511,4.69939879759519,4.7044088176352705,4.709418837675351,4.714428857715431,4.719438877755511,4.724448897795591,4.729458917835672,4.734468937875752,4.739478957915832,4.744488977955911,4.749498997995992,4.754509018036072,4.759519038076152,4.764529058116232,4.7695390781563125,4.774549098196393,4.779559118236473,4.784569138276553,4.789579158316633,4.794589178356714,4.799599198396794,4.804609218436874,4.809619238476954,4.8146292585170345,4.819639278557114,4.824649298597194,4.829659318637274,4.8346693386773545,4.839679358717435,4.844689378757515,4.849699398797595,4.854709418837675,4.859719438877756,4.864729458917836,4.869739478957916,4.874749498997996,4.8797595190380765,4.884769539078157,4.889779559118236,4.894789579158316,4.8997995991983965,4.904809619238477,4.909819639278557,4.914829659318637,4.919839679358717,4.924849699398798,4.929859719438878,4.934869739478958,4.939879759519038,4.9448897795591185,4.949899799599199,4.954909819639279,4.959919839679359,4.9649298597194385,4.969939879759519,4.974949899799599,4.979959919839679,4.984969939879759,4.98997995991984,4.99498997995992,5.0]}
},{}],22:[function(require,module,exports){
module.exports={"expected":[-0.8427007929497149,-0.8443578910144101,-0.8460017060472481,-0.8476322921340793,-0.8492497037721,-0.8508539958613035,-0.8524452236959503,-0.8540234429560553,-0.8555887096988956,-0.8571410803505402,-0.8586806116974003,-0.8602073608778055,-0.8617213853736017,-0.8632227430017775,-0.8647114919061161,-0.8661876905488751,-0.8676513977024963,-0.8691026724413448,-0.8705415741334799,-0.8719681624324582,-0.8733824972691703,-0.8747846388437107,-0.8761746476172853,-0.8775525843041525,-0.8789185098636043,-0.8802724854919837,-0.8816145726147424,-0.8829448328785386,-0.8842633281433752,-0.8855701204747808,-0.8868652721360334,-0.888148845580427,-0.8894209034435838,-0.8906815085358119,-0.8919307238345076,-0.8931686124766071,-0.8943952377510836,-0.8956106630914953,-0.8968149520685802,-0.8980081683829036,-0.8991903758575541,-0.9003616384308928,-0.9015220201493529,-0.9026715851602944,-0.9038103977049099,-0.9049385221111863,-0.9060560227869201,-0.9071629642127887,-0.9082594109354779,-0.9093454275608642,-0.9104210787472569,-0.911486429198695,-0.9125415436583042,-0.9135864869017116,-0.9146213237305197,-0.9156461189658401,-0.9166609374418871,-0.917665843999632,-0.9186609034805175,-0.9196461807202354,-0.9206217405425632,-0.9215876477532652,-0.9225439671340553,-0.9234907634366216,-0.9244281013767162,-0.925356045628306,-0.9262746608177898,-0.927184011518277,-0.928084162243933,-0.928975177444387,-0.9298571214992061,-0.9307300587124339,-0.931594053307194,-0.9324491694203605,-0.9332954710972913,-0.9341330222866304,-0.9349618868351739,-0.9357821284828028,-0.9365938108574827,-0.9373969974703283,-0.9381917517107361,-0.9389781368415822,-0.9397562159944872,-0.9405260521651484,-0.9412877082087373,-0.9420412468353652,-0.9427867306056141,-0.9435242219261362,-0.944253783045318,-0.944975476049013,-0.9456893628563398,-0.9463955052155472,-0.9470939646999461,-0.947784802703908,-0.9484680804389287,-0.9491438589297605,-0.949812199010608,-0.9504731613213926,-0.9511268063040806,-0.9517731941990791,-0.9524123850416961,-0.9530444386586668,-0.9536694146647455,-0.9542873724593618,-0.9548983712233421,-0.9555024699156969,-0.9560997272704703,-0.9566902017936567,-0.9572739517601789,-0.9578510352109321,-0.9584215099498895,-0.9589854335412736,-0.9595428633067886,-0.9600938563229161,-0.9606384694182736,-0.9611767591710347,-0.9617087819064121,-0.9622345936942005,-0.9627542503463826,-0.9632678074147947,-0.9637753201888529,-0.9642768436933407,-0.9647724326862547,-0.9652621416567115,-0.9657460248229126,-0.9662241361301682,-0.9666965292489799,-0.9671632575731808,-0.9676243742181336,-0.9680799320189857,-0.9685299835289809,-0.9689745810178276,-0.9694137764701234,-0.9698476215838341,-0.9702761677688292,-0.9706994661454709,-0.9711175675432575,-0.9715305224995215,-0.9719383812581797,-0.9723411937685367,-0.9727390096841413,-0.973131878361694,-0.9735198488600063,-0.9739029699390114,-0.9742812900588245,-0.9746548573788538,-0.9750237197569611,-0.9753879247486711,-0.9757475196064294,-0.9761025512789081,-0.9764530664103607,-0.9767991113400214,-0.9771407321015532,-0.9774779744225411,-0.977810883724031,-0.9781395051201137,-0.9784638834175533,-0.9787840631154597,-0.9791000884050051,-0.9794120031691822,-0.9797198509826066,-0.9800236751113595,-0.9803235185128732,-0.9806194238358565,-0.9809114334202611,-0.9811995892972875,-0.9814839331894304,-0.9817645065105629,-0.9820413503660593,-0.9823145055529547,-0.9825840125601432,-0.9828499115686113,-0.9831122424517089,-0.9833710447754549,-0.9836263577988786,-0.9838782204743951,-0.9841266714482154,-0.9843717490607896,-0.9846134913472832,-0.9848519360380859,-0.9850871205593527,-0.985319082033576,-0.9855478572801889,-0.9857734828161985,-0.98599599485685,-0.9862154293163189,-0.9864318218084336,-0.9866452076474246,-0.986855621848703,-0.9870630991296659,-0.9872676739105278,-0.9874693803151797,-0.987668252172073,-0.9878643230151287,-0.9880576260846725,-0.9882481943283926,-0.9884360604023223,-0.9886212566718463,-0.9888038152127284,-0.9889837678121632,-0.989161145969848,-0.9893359808990779,-0.9895083035278598,-0.9896781445000487,-0.9898455341765022,-0.9900105026362563,-0.9901730796777184,-0.9903332948198799,-0.9904911773035466,-0.9906467560925873,-0.9908000598751981,-0.9909511170651849,-0.9910999558032612,-0.9912466039583624,-0.9913910891289751,-0.9915334386444812,-0.9916736795665169,-0.9918118386903452,-0.9919479425462431,-0.9920820174009004,-0.9922140892588329,-0.9923441838638072,-0.9924723267002771,-0.9925985429948326,-0.9927228577176593,-0.9928452955840086,-0.9929658810556784,-0.9930846383425043,-0.9932015914038589,-0.9933167639501623,-0.9934301794443998,-0.9935418611036485,-0.9936518319006125,-0.993760114565165,-0.9938667315858987,-0.9939717052116817,-0.9940750574532217,-0.9941768100846355,-0.9942769846450246,-0.9943756024400559,-0.9944726845435491,-0.9945682517990674,-0.9946623248215135,-0.9947549239987299,-0.9948460694931032,-0.9949357812431711,-0.9950240789652345,-0.9951109821549706,-0.9951965100890502,-0.9952806818267566,-0.9953635162116065,-0.9954450318729735,-0.9955252472277125,-0.9956041804817851,-0.9956818496318866,-0.9957582724670733,-0.9958334665703902,-0.995907449320499,-0.9959802378933061,-0.9960518492635896,-0.9961223002066263,-0.9961916072998175,-0.9962597869243143,-0.9963268552666402,-0.9963928283203137,-0.9964577218874676,-0.9965215515804674,-0.996584332823527,-0.9966460808543212,-0.996706810725597,-0.9967665373067801,-0.9968252752855803,-0.9968830391695918,-0.9969398432878903,-0.9969957017926279,-0.9970506286606217,-0.9971046376949401,-0.9971577425264839,-0.9972099566155634,-0.9972612932534702,-0.9973117655640449,-0.9973613865052394,-0.9974101688706741,-0.9974581252911896,-0.9975052682363934,-0.9975516100162005,-0.9975971627823683,-0.9976419385300256,-0.9976859490991958,-0.9977292061763134,-0.9977717212957348,-0.9978135058412413,-0.9978545710475373,-0.9978949280017407,-0.9979345876448662,-0.9979735607733022,-0.998011858040281,-0.99804948995734,-0.9980864668957782,-0.9981227990881029,-0.9981584966294702,-0.9981935694791181,-0.9982280274617903,-0.9982618802691543,-0.9982951374612101,-0.9983278084676911,-0.9983599025894581,-0.9983914289998831,-0.9984223967462273,-0.9984528147510089,-0.9984826918133632,-0.9985120366103948,-0.9985408576985199,-0.998569163514802,-0.9985969623782773,-0.9986242624912721,-0.9986510719407116,-0.9986773986994195,-0.9987032506274094,-0.9987286354731664,-0.9987535608749207,-0.9987780343619118,-0.9988020633556437,-0.998825655171131,-0.9988488170181361,-0.9988715560023973,-0.9988938791268477,-0.9989157932928248,-0.998937305301271,-0.9989584218539252,-0.998979149554505,-0.9989994949098785,-0.9990194643312295,-0.9990390641352106,-0.9990583005450886,-0.9990771796918803,-0.9990957076154787,-0.9991138902657702,-0.9991317335037425,-0.9991492431025826,-0.9991664247487663,-0.9991832840431378,-0.9991998265019801,-0.9992160575580766,-0.999231982561762,-0.9992476067819659,-0.999262935407245,-0.999277973546808,-0.9992927262315296,-0.9993071984149561,-0.9993213949743015,-0.9993353207114348,-0.9993489803538573,-0.9993623785556713,-0.9993755198985397,-0.9993884088926358,-0.9994010499775848,-0.999413447523396,-0.9994256058313851,-0.9994375291350885,-0.9994492216011688,-0.9994606873303093,-0.9994719303581029,-0.9994829546559282,-0.9994937641318202,-0.9995043626313299,-0.999514753938376,-0.9995249417760876,-0.9995349298076386,-0.999544721637072,-0.999554320810118,-0.9995637308150007,-0.9995729550832383,-0.9995819969904339,-0.9995908598570576,-0.9995995469492208,-0.9996080614794417,-0.9996164066074023,-0.9996245854406972,-0.9996326010355747,-0.9996404563976686,-0.9996481544827229,-0.9996556981973074,-0.9996630903995256,-0.9996703338997155,-0.9996774314611406,-0.9996843858006743,-0.9996911995894764,-0.9996978754536608,-0.9997044159749565,-0.9997108236913602,-0.9997171010977819,-0.9997232506466814,-0.9997292747486997,-0.9997351757732802,-0.9997409560492844,-0.9997466178655992,-0.9997521634717375,-0.9997575950784306,-0.9997629148582146,-0.9997681249460081,-0.9997732274396844,-0.9997782244006356,-0.9997831178543296,-0.9997879097908607,-0.9997926021654933,-0.999797196899198,-0.9998016958791821,-0.9998061009594119,-0.9998104139611298,-0.9998146366733638,-0.9998187708534307,-0.9998228182274334,-0.9998267804907499,-0.999830659308519,-0.9998344563161162,-0.9998381731196263,-0.9998418112963077,-0.9998453723950514,-0.9998488579368344,-0.999852269415166,-0.9998556082965285,-0.9998588760208125,-0.9998620740017453,-0.9998652036273151,-0.9998682662601872,-0.9998712632381166,-0.9998741958743536,-0.9998770654580444,-0.9998798732546265,-0.9998826205062171,-0.9998853084319985,-0.9998879382285956,-0.99989051107045,-0.999893028110188,-0.9998954904789832,-0.9998978992869144,-0.9999002556233189,-0.9999025605571389,-0.9999048151372655,-0.9999070203928756,-0.999909177333765,-0.9999112869506767,-0.9999133502156234,-0.9999153680822073,-0.9999173414859328,-0.9999192713445167,-0.9999211585581925,-0.9999230040100108,-0.9999248085661347,-0.9999265730761322,-0.9999282983732621,-0.9999299852747574,-0.9999316345821038,-0.9999332470813135,-0.9999348235431962,-0.9999363647236243,-0.9999378713637956,-0.9999393441904911,-0.9999407839163287,-0.9999421912400137,-0.9999435668465854,-0.9999449114076588,-0.9999462255816645,-0.9999475100140823,-0.999948765337674,-0.99994999217271,-0.999951191127194,-0.9999523627970838,-0.9999535077665079,-0.9999546266079801,-0.9999557198826088,-0.9999567881403044,-0.9999578319199834,-0.9999588517497683,-0.9999598481471846,-0.9999608216193555,-0.9999617726631922,-0.9999627017655818,-0.9999636094035722,-0.9999644960445535,-0.999965362146437,-0.9999662081578312,-0.9999670345182138,-0.999967841658103,-0.9999686299992239,-0.999969399954673,-0.9999701519290808,-0.9999708863187695,-0.9999716035119107,-0.9999723038886782,-0.9999729878213998,-0.9999736556747053,-0.9999743078056735,-0.9999749445639752,-0.9999755662920143,-0.9999761733250672,-0.9999767659914185,-0.999977344612496,-0.9999779095030014],"x":[-1.0,-1.0040080160320641,-1.0080160320641283,-1.0120240480961924,-1.0160320641282565,-1.0200400801603207,-1.0240480961923848,-1.028056112224449,-1.032064128256513,-1.0360721442885772,-1.0400801603206413,-1.0440881763527055,-1.0480961923847696,-1.0521042084168337,-1.0561122244488979,-1.060120240480962,-1.0641282565130261,-1.0681362725450902,-1.0721442885771544,-1.0761523046092185,-1.0801603206412826,-1.0841683366733468,-1.088176352705411,-1.092184368737475,-1.0961923847695392,-1.1002004008016033,-1.1042084168336674,-1.1082164328657316,-1.1122244488977955,-1.1162324649298596,-1.1202404809619237,-1.1242484969939879,-1.128256513026052,-1.1322645290581161,-1.1362725450901803,-1.1402805611222444,-1.1442885771543085,-1.1482965931863727,-1.1523046092184368,-1.156312625250501,-1.160320641282565,-1.1643286573146292,-1.1683366733466933,-1.1723446893787575,-1.1763527054108216,-1.1803607214428857,-1.1843687374749499,-1.188376753507014,-1.1923847695390781,-1.1963927855711423,-1.2004008016032064,-1.2044088176352705,-1.2084168336673347,-1.2124248496993988,-1.216432865731463,-1.220440881763527,-1.2244488977955912,-1.2284569138276553,-1.2324649298597194,-1.2364729458917836,-1.2404809619238477,-1.2444889779559118,-1.248496993987976,-1.25250501002004,-1.2565130260521042,-1.2605210420841684,-1.2645290581162325,-1.2685370741482966,-1.2725450901803608,-1.276553106212425,-1.280561122244489,-1.2845691382765532,-1.2885771543086173,-1.2925851703406814,-1.2965931863727456,-1.3006012024048097,-1.3046092184368738,-1.308617234468938,-1.312625250501002,-1.3166332665330662,-1.3206412825651304,-1.3246492985971945,-1.3286573146292586,-1.3326653306613228,-1.3366733466933867,-1.3406813627254508,-1.344689378757515,-1.348697394789579,-1.3527054108216432,-1.3567134268537073,-1.3607214428857715,-1.3647294589178356,-1.3687374749498997,-1.3727454909819639,-1.376753507014028,-1.3807615230460921,-1.3847695390781563,-1.3887775551102204,-1.3927855711422845,-1.3967935871743486,-1.4008016032064128,-1.404809619238477,-1.408817635270541,-1.4128256513026052,-1.4168336673346693,-1.4208416833667334,-1.4248496993987976,-1.4288577154308617,-1.4328657314629258,-1.43687374749499,-1.440881763527054,-1.4448897795591182,-1.4488977955911824,-1.4529058116232465,-1.4569138276553106,-1.4609218436873748,-1.464929859719439,-1.468937875751503,-1.4729458917835672,-1.4769539078156313,-1.4809619238476954,-1.4849699398797596,-1.4889779559118237,-1.4929859719438878,-1.496993987975952,-1.501002004008016,-1.5050100200400802,-1.5090180360721444,-1.5130260521042085,-1.5170340681362726,-1.5210420841683367,-1.5250501002004009,-1.529058116232465,-1.5330661322645291,-1.5370741482965933,-1.5410821643286574,-1.5450901803607215,-1.5490981963927857,-1.5531062124248498,-1.5571142284569137,-1.5611222444889779,-1.565130260521042,-1.5691382765531061,-1.5731462925851702,-1.5771543086172344,-1.5811623246492985,-1.5851703406813626,-1.5891783567134268,-1.593186372745491,-1.597194388777555,-1.6012024048096192,-1.6052104208416833,-1.6092184368737474,-1.6132264529058116,-1.6172344689378757,-1.6212424849699398,-1.625250501002004,-1.629258517034068,-1.6332665330661322,-1.6372745490981964,-1.6412825651302605,-1.6452905811623246,-1.6492985971943888,-1.653306613226453,-1.657314629258517,-1.6613226452905812,-1.6653306613226453,-1.6693386773547094,-1.6733466933867736,-1.6773547094188377,-1.6813627254509018,-1.685370741482966,-1.68937875751503,-1.6933867735470942,-1.6973947895791583,-1.7014028056112225,-1.7054108216432866,-1.7094188376753507,-1.7134268537074149,-1.717434869739479,-1.7214428857715431,-1.7254509018036073,-1.7294589178356714,-1.7334669338677355,-1.7374749498997997,-1.7414829659318638,-1.745490981963928,-1.749498997995992,-1.7535070140280562,-1.7575150300601203,-1.7615230460921845,-1.7655310621242486,-1.7695390781563127,-1.7735470941883769,-1.777555110220441,-1.781563126252505,-1.785571142284569,-1.7895791583166332,-1.7935871743486973,-1.7975951903807614,-1.8016032064128256,-1.8056112224448897,-1.8096192384769538,-1.813627254509018,-1.817635270541082,-1.8216432865731462,-1.8256513026052104,-1.8296593186372745,-1.8336673346693386,-1.8376753507014028,-1.8416833667334669,-1.845691382765531,-1.8496993987975952,-1.8537074148296593,-1.8577154308617234,-1.8617234468937875,-1.8657314629258517,-1.8697394789579158,-1.87374749498998,-1.877755511022044,-1.8817635270541082,-1.8857715430861723,-1.8897795591182365,-1.8937875751503006,-1.8977955911823647,-1.9018036072144289,-1.905811623246493,-1.9098196392785571,-1.9138276553106213,-1.9178356713426854,-1.9218436873747495,-1.9258517034068137,-1.9298597194388778,-1.933867735470942,-1.937875751503006,-1.9418837675350702,-1.9458917835671343,-1.9498997995991985,-1.9539078156312626,-1.9579158316633267,-1.9619238476953909,-1.965931863727455,-1.9699398797595191,-1.9739478957915833,-1.9779559118236474,-1.9819639278557115,-1.9859719438877756,-1.9899799599198398,-1.993987975951904,-1.997995991983968,-2.002004008016032,-2.006012024048096,-2.0100200400801604,-2.0140280561122244,-2.0180360721442887,-2.0220440881763526,-2.026052104208417,-2.030060120240481,-2.0340681362725452,-2.038076152304609,-2.0420841683366735,-2.0460921843687374,-2.0501002004008018,-2.0541082164328657,-2.05811623246493,-2.062124248496994,-2.0661322645290583,-2.070140280561122,-2.0741482965931866,-2.0781563126252505,-2.082164328657315,-2.0861723446893787,-2.090180360721443,-2.094188376753507,-2.0981963927855714,-2.1022044088176353,-2.1062124248496996,-2.1102204408817635,-2.1142284569138274,-2.118236472945892,-2.1222444889779557,-2.12625250501002,-2.130260521042084,-2.1342685370741483,-2.1382765531062122,-2.1422845691382766,-2.1462925851703405,-2.150300601202405,-2.1543086172344688,-2.158316633266533,-2.162324649298597,-2.1663326653306614,-2.1703406813627253,-2.1743486973947896,-2.1783567134268536,-2.182364729458918,-2.186372745490982,-2.190380761523046,-2.19438877755511,-2.1983967935871744,-2.2024048096192383,-2.2064128256513027,-2.2104208416833666,-2.214428857715431,-2.218436873747495,-2.2224448897795592,-2.226452905811623,-2.2304609218436875,-2.2344689378757514,-2.2384769539078158,-2.2424849699398797,-2.246492985971944,-2.250501002004008,-2.2545090180360723,-2.258517034068136,-2.2625250501002006,-2.2665330661322645,-2.270541082164329,-2.2745490981963927,-2.278557114228457,-2.282565130260521,-2.2865731462925853,-2.2905811623246493,-2.2945891783567136,-2.2985971943887775,-2.302605210420842,-2.306613226452906,-2.31062124248497,-2.314629258517034,-2.3186372745490984,-2.3226452905811623,-2.3266533066132267,-2.3306613226452906,-2.3346693386773545,-2.338677354709419,-2.3426853707414828,-2.346693386773547,-2.350701402805611,-2.3547094188376754,-2.3587174348697393,-2.3627254509018036,-2.3667334669338675,-2.370741482965932,-2.374749498997996,-2.37875751503006,-2.382765531062124,-2.3867735470941884,-2.3907815631262523,-2.3947895791583167,-2.3987975951903806,-2.402805611222445,-2.406813627254509,-2.4108216432865732,-2.414829659318637,-2.4188376753507015,-2.4228456913827654,-2.4268537074148298,-2.4308617234468937,-2.434869739478958,-2.438877755511022,-2.4428857715430863,-2.44689378757515,-2.4509018036072145,-2.4549098196392785,-2.458917835671343,-2.4629258517034067,-2.466933867735471,-2.470941883767535,-2.4749498997995993,-2.4789579158316633,-2.4829659318637276,-2.4869739478957915,-2.490981963927856,-2.49498997995992,-2.498997995991984,-2.503006012024048,-2.5070140280561124,-2.5110220440881763,-2.5150300601202407,-2.5190380761523046,-2.523046092184369,-2.527054108216433,-2.531062124248497,-2.535070140280561,-2.5390781563126255,-2.5430861723446894,-2.5470941883767537,-2.5511022044088176,-2.555110220440882,-2.559118236472946,-2.56312625250501,-2.567134268537074,-2.571142284569138,-2.5751503006012024,-2.5791583166332663,-2.5831663326653307,-2.5871743486973946,-2.591182364729459,-2.595190380761523,-2.599198396793587,-2.603206412825651,-2.6072144288577155,-2.6112224448897794,-2.6152304609218437,-2.6192384769539077,-2.623246492985972,-2.627254509018036,-2.6312625250501003,-2.635270541082164,-2.6392785571142285,-2.6432865731462925,-2.647294589178357,-2.6513026052104207,-2.655310621242485,-2.659318637274549,-2.6633266533066133,-2.6673346693386772,-2.6713426853707416,-2.6753507014028055,-2.67935871743487,-2.6833667334669338,-2.687374749498998,-2.691382765531062,-2.6953907815631264,-2.6993987975951903,-2.7034068136272547,-2.7074148296593186,-2.711422845691383,-2.715430861723447,-2.719438877755511,-2.723446893787575,-2.7274549098196395,-2.7314629258517034,-2.7354709418837677,-2.7394789579158316,-2.743486973947896,-2.74749498997996,-2.7515030060120242,-2.755511022044088,-2.7595190380761525,-2.7635270541082164,-2.7675350701402808,-2.7715430861723447,-2.775551102204409,-2.779559118236473,-2.783567134268537,-2.787575150300601,-2.791583166332665,-2.7955911823647295,-2.7995991983967934,-2.8036072144288577,-2.8076152304609217,-2.811623246492986,-2.81563126252505,-2.8196392785571143,-2.823647294589178,-2.8276553106212425,-2.8316633266533064,-2.835671342685371,-2.8396793587174347,-2.843687374749499,-2.847695390781563,-2.8517034068136273,-2.8557114228456912,-2.8597194388777556,-2.8637274549098195,-2.867735470941884,-2.8717434869739478,-2.875751503006012,-2.879759519038076,-2.8837675350701404,-2.8877755511022043,-2.8917835671342687,-2.8957915831663326,-2.899799599198397,-2.903807615230461,-2.907815631262525,-2.911823647294589,-2.9158316633266534,-2.9198396793587174,-2.9238476953907817,-2.9278557114228456,-2.93186372745491,-2.935871743486974,-2.9398797595190382,-2.943887775551102,-2.9478957915831665,-2.9519038076152304,-2.9559118236472948,-2.9599198396793587,-2.963927855711423,-2.967935871743487,-2.9719438877755513,-2.975951903807615,-2.9799599198396796,-2.9839679358717435,-2.987975951903808,-2.9919839679358717,-2.995991983967936,-3.0]}
},{}],23:[function(require,module,exports){
module.exports={"expected":[0.8427007929497149,0.8443578910144101,0.8460017060472481,0.8476322921340793,0.8492497037721,0.8508539958613035,0.8524452236959503,0.8540234429560553,0.8555887096988956,0.8571410803505402,0.8586806116974003,0.8602073608778055,0.8617213853736017,0.8632227430017775,0.8647114919061161,0.8661876905488751,0.8676513977024963,0.8691026724413448,0.8705415741334799,0.8719681624324582,0.8733824972691703,0.8747846388437107,0.8761746476172853,0.8775525843041525,0.8789185098636043,0.8802724854919837,0.8816145726147424,0.8829448328785386,0.8842633281433752,0.8855701204747808,0.8868652721360334,0.888148845580427,0.8894209034435838,0.8906815085358119,0.8919307238345076,0.8931686124766071,0.8943952377510836,0.8956106630914953,0.8968149520685802,0.8980081683829036,0.8991903758575541,0.9003616384308928,0.9015220201493529,0.9026715851602944,0.9038103977049099,0.9049385221111863,0.9060560227869201,0.9071629642127887,0.9082594109354779,0.9093454275608642,0.9104210787472569,0.911486429198695,0.9125415436583042,0.9135864869017116,0.9146213237305197,0.9156461189658401,0.9166609374418871,0.917665843999632,0.9186609034805175,0.9196461807202354,0.9206217405425632,0.9215876477532652,0.9225439671340553,0.9234907634366216,0.9244281013767162,0.925356045628306,0.9262746608177898,0.927184011518277,0.928084162243933,0.928975177444387,0.9298571214992061,0.9307300587124339,0.931594053307194,0.9324491694203605,0.9332954710972913,0.9341330222866304,0.9349618868351739,0.9357821284828028,0.9365938108574827,0.9373969974703283,0.9381917517107361,0.9389781368415822,0.9397562159944872,0.9405260521651484,0.9412877082087373,0.9420412468353652,0.9427867306056141,0.9435242219261362,0.944253783045318,0.944975476049013,0.9456893628563398,0.9463955052155472,0.9470939646999461,0.947784802703908,0.9484680804389287,0.9491438589297605,0.949812199010608,0.9504731613213926,0.9511268063040806,0.9517731941990791,0.9524123850416961,0.9530444386586668,0.9536694146647455,0.9542873724593618,0.9548983712233421,0.9555024699156969,0.9560997272704703,0.9566902017936567,0.9572739517601789,0.9578510352109321,0.9584215099498895,0.9589854335412736,0.9595428633067886,0.9600938563229161,0.9606384694182736,0.9611767591710347,0.9617087819064121,0.9622345936942005,0.9627542503463826,0.9632678074147947,0.9637753201888529,0.9642768436933407,0.9647724326862547,0.9652621416567115,0.9657460248229126,0.9662241361301682,0.9666965292489799,0.9671632575731808,0.9676243742181336,0.9680799320189857,0.9685299835289809,0.9689745810178276,0.9694137764701234,0.9698476215838341,0.9702761677688292,0.9706994661454709,0.9711175675432575,0.9715305224995215,0.9719383812581797,0.9723411937685367,0.9727390096841413,0.973131878361694,0.9735198488600063,0.9739029699390114,0.9742812900588245,0.9746548573788538,0.9750237197569611,0.9753879247486711,0.9757475196064294,0.9761025512789081,0.9764530664103607,0.9767991113400214,0.9771407321015532,0.9774779744225411,0.977810883724031,0.9781395051201137,0.9784638834175533,0.9787840631154597,0.9791000884050051,0.9794120031691822,0.9797198509826066,0.9800236751113595,0.9803235185128732,0.9806194238358565,0.9809114334202611,0.9811995892972875,0.9814839331894304,0.9817645065105629,0.9820413503660593,0.9823145055529547,0.9825840125601432,0.9828499115686113,0.9831122424517089,0.9833710447754549,0.9836263577988786,0.9838782204743951,0.9841266714482154,0.9843717490607896,0.9846134913472832,0.9848519360380859,0.9850871205593527,0.985319082033576,0.9855478572801889,0.9857734828161985,0.98599599485685,0.9862154293163189,0.9864318218084336,0.9866452076474246,0.986855621848703,0.9870630991296659,0.9872676739105278,0.9874693803151797,0.987668252172073,0.9878643230151287,0.9880576260846725,0.9882481943283926,0.9884360604023223,0.9886212566718463,0.9888038152127284,0.9889837678121632,0.989161145969848,0.9893359808990779,0.9895083035278598,0.9896781445000487,0.9898455341765022,0.9900105026362563,0.9901730796777184,0.9903332948198799,0.9904911773035466,0.9906467560925873,0.9908000598751981,0.9909511170651849,0.9910999558032612,0.9912466039583624,0.9913910891289751,0.9915334386444812,0.9916736795665169,0.9918118386903452,0.9919479425462431,0.9920820174009004,0.9922140892588329,0.9923441838638072,0.9924723267002771,0.9925985429948326,0.9927228577176593,0.9928452955840086,0.9929658810556784,0.9930846383425043,0.9932015914038589,0.9933167639501623,0.9934301794443998,0.9935418611036485,0.9936518319006125,0.993760114565165,0.9938667315858987,0.9939717052116817,0.9940750574532217,0.9941768100846355,0.9942769846450246,0.9943756024400559,0.9944726845435491,0.9945682517990674,0.9946623248215135,0.9947549239987299,0.9948460694931032,0.9949357812431711,0.9950240789652345,0.9951109821549706,0.9951965100890502,0.9952806818267566,0.9953635162116065,0.9954450318729735,0.9955252472277125,0.9956041804817851,0.9956818496318866,0.9957582724670733,0.9958334665703902,0.995907449320499,0.9959802378933061,0.9960518492635896,0.9961223002066263,0.9961916072998175,0.9962597869243143,0.9963268552666402,0.9963928283203137,0.9964577218874676,0.9965215515804674,0.996584332823527,0.9966460808543212,0.996706810725597,0.9967665373067801,0.9968252752855803,0.9968830391695918,0.9969398432878903,0.9969957017926279,0.9970506286606217,0.9971046376949401,0.9971577425264839,0.9972099566155634,0.9972612932534702,0.9973117655640449,0.9973613865052394,0.9974101688706741,0.9974581252911896,0.9975052682363934,0.9975516100162005,0.9975971627823683,0.9976419385300256,0.9976859490991958,0.9977292061763134,0.9977717212957348,0.9978135058412413,0.9978545710475373,0.9978949280017407,0.9979345876448662,0.9979735607733022,0.998011858040281,0.99804948995734,0.9980864668957782,0.9981227990881029,0.9981584966294702,0.9981935694791181,0.9982280274617903,0.9982618802691543,0.9982951374612101,0.9983278084676911,0.9983599025894581,0.9983914289998831,0.9984223967462273,0.9984528147510089,0.9984826918133632,0.9985120366103948,0.9985408576985199,0.998569163514802,0.9985969623782773,0.9986242624912721,0.9986510719407116,0.9986773986994195,0.9987032506274094,0.9987286354731664,0.9987535608749207,0.9987780343619118,0.9988020633556437,0.998825655171131,0.9988488170181361,0.9988715560023973,0.9988938791268477,0.9989157932928248,0.998937305301271,0.9989584218539252,0.998979149554505,0.9989994949098785,0.9990194643312295,0.9990390641352106,0.9990583005450886,0.9990771796918803,0.9990957076154787,0.9991138902657702,0.9991317335037425,0.9991492431025826,0.9991664247487663,0.9991832840431378,0.9991998265019801,0.9992160575580766,0.999231982561762,0.9992476067819659,0.999262935407245,0.999277973546808,0.9992927262315296,0.9993071984149561,0.9993213949743015,0.9993353207114348,0.9993489803538573,0.9993623785556713,0.9993755198985397,0.9993884088926358,0.9994010499775848,0.999413447523396,0.9994256058313851,0.9994375291350885,0.9994492216011688,0.9994606873303093,0.9994719303581029,0.9994829546559282,0.9994937641318202,0.9995043626313299,0.999514753938376,0.9995249417760876,0.9995349298076386,0.999544721637072,0.999554320810118,0.9995637308150007,0.9995729550832383,0.9995819969904339,0.9995908598570576,0.9995995469492208,0.9996080614794417,0.9996164066074023,0.9996245854406972,0.9996326010355747,0.9996404563976686,0.9996481544827229,0.9996556981973074,0.9996630903995256,0.9996703338997155,0.9996774314611406,0.9996843858006743,0.9996911995894764,0.9996978754536608,0.9997044159749565,0.9997108236913602,0.9997171010977819,0.9997232506466814,0.9997292747486997,0.9997351757732802,0.9997409560492844,0.9997466178655992,0.9997521634717375,0.9997575950784306,0.9997629148582146,0.9997681249460081,0.9997732274396844,0.9997782244006356,0.9997831178543296,0.9997879097908607,0.9997926021654933,0.999797196899198,0.9998016958791821,0.9998061009594119,0.9998104139611298,0.9998146366733638,0.9998187708534307,0.9998228182274334,0.9998267804907499,0.999830659308519,0.9998344563161162,0.9998381731196263,0.9998418112963077,0.9998453723950514,0.9998488579368344,0.999852269415166,0.9998556082965285,0.9998588760208125,0.9998620740017453,0.9998652036273151,0.9998682662601872,0.9998712632381166,0.9998741958743536,0.9998770654580444,0.9998798732546265,0.9998826205062171,0.9998853084319985,0.9998879382285956,0.99989051107045,0.999893028110188,0.9998954904789832,0.9998978992869144,0.9999002556233189,0.9999025605571389,0.9999048151372655,0.9999070203928756,0.999909177333765,0.9999112869506767,0.9999133502156234,0.9999153680822073,0.9999173414859328,0.9999192713445167,0.9999211585581925,0.9999230040100108,0.9999248085661347,0.9999265730761322,0.9999282983732621,0.9999299852747574,0.9999316345821038,0.9999332470813135,0.9999348235431962,0.9999363647236243,0.9999378713637956,0.9999393441904911,0.9999407839163287,0.9999421912400137,0.9999435668465854,0.9999449114076588,0.9999462255816645,0.9999475100140823,0.999948765337674,0.99994999217271,0.999951191127194,0.9999523627970838,0.9999535077665079,0.9999546266079801,0.9999557198826088,0.9999567881403044,0.9999578319199834,0.9999588517497683,0.9999598481471846,0.9999608216193555,0.9999617726631922,0.9999627017655818,0.9999636094035722,0.9999644960445535,0.999965362146437,0.9999662081578312,0.9999670345182138,0.999967841658103,0.9999686299992239,0.999969399954673,0.9999701519290808,0.9999708863187695,0.9999716035119107,0.9999723038886782,0.9999729878213998,0.9999736556747053,0.9999743078056735,0.9999749445639752,0.9999755662920143,0.9999761733250672,0.9999767659914185,0.999977344612496,0.9999779095030014],"x":[1.0,1.0040080160320641,1.0080160320641283,1.0120240480961924,1.0160320641282565,1.0200400801603207,1.0240480961923848,1.028056112224449,1.032064128256513,1.0360721442885772,1.0400801603206413,1.0440881763527055,1.0480961923847696,1.0521042084168337,1.0561122244488979,1.060120240480962,1.0641282565130261,1.0681362725450902,1.0721442885771544,1.0761523046092185,1.0801603206412826,1.0841683366733468,1.088176352705411,1.092184368737475,1.0961923847695392,1.1002004008016033,1.1042084168336674,1.1082164328657316,1.1122244488977955,1.1162324649298596,1.1202404809619237,1.1242484969939879,1.128256513026052,1.1322645290581161,1.1362725450901803,1.1402805611222444,1.1442885771543085,1.1482965931863727,1.1523046092184368,1.156312625250501,1.160320641282565,1.1643286573146292,1.1683366733466933,1.1723446893787575,1.1763527054108216,1.1803607214428857,1.1843687374749499,1.188376753507014,1.1923847695390781,1.1963927855711423,1.2004008016032064,1.2044088176352705,1.2084168336673347,1.2124248496993988,1.216432865731463,1.220440881763527,1.2244488977955912,1.2284569138276553,1.2324649298597194,1.2364729458917836,1.2404809619238477,1.2444889779559118,1.248496993987976,1.25250501002004,1.2565130260521042,1.2605210420841684,1.2645290581162325,1.2685370741482966,1.2725450901803608,1.276553106212425,1.280561122244489,1.2845691382765532,1.2885771543086173,1.2925851703406814,1.2965931863727456,1.3006012024048097,1.3046092184368738,1.308617234468938,1.312625250501002,1.3166332665330662,1.3206412825651304,1.3246492985971945,1.3286573146292586,1.3326653306613228,1.3366733466933867,1.3406813627254508,1.344689378757515,1.348697394789579,1.3527054108216432,1.3567134268537073,1.3607214428857715,1.3647294589178356,1.3687374749498997,1.3727454909819639,1.376753507014028,1.3807615230460921,1.3847695390781563,1.3887775551102204,1.3927855711422845,1.3967935871743486,1.4008016032064128,1.404809619238477,1.408817635270541,1.4128256513026052,1.4168336673346693,1.4208416833667334,1.4248496993987976,1.4288577154308617,1.4328657314629258,1.43687374749499,1.440881763527054,1.4448897795591182,1.4488977955911824,1.4529058116232465,1.4569138276553106,1.4609218436873748,1.464929859719439,1.468937875751503,1.4729458917835672,1.4769539078156313,1.4809619238476954,1.4849699398797596,1.4889779559118237,1.4929859719438878,1.496993987975952,1.501002004008016,1.5050100200400802,1.5090180360721444,1.5130260521042085,1.5170340681362726,1.5210420841683367,1.5250501002004009,1.529058116232465,1.5330661322645291,1.5370741482965933,1.5410821643286574,1.5450901803607215,1.5490981963927857,1.5531062124248498,1.5571142284569137,1.5611222444889779,1.565130260521042,1.5691382765531061,1.5731462925851702,1.5771543086172344,1.5811623246492985,1.5851703406813626,1.5891783567134268,1.593186372745491,1.597194388777555,1.6012024048096192,1.6052104208416833,1.6092184368737474,1.6132264529058116,1.6172344689378757,1.6212424849699398,1.625250501002004,1.629258517034068,1.6332665330661322,1.6372745490981964,1.6412825651302605,1.6452905811623246,1.6492985971943888,1.653306613226453,1.657314629258517,1.6613226452905812,1.6653306613226453,1.6693386773547094,1.6733466933867736,1.6773547094188377,1.6813627254509018,1.685370741482966,1.68937875751503,1.6933867735470942,1.6973947895791583,1.7014028056112225,1.7054108216432866,1.7094188376753507,1.7134268537074149,1.717434869739479,1.7214428857715431,1.7254509018036073,1.7294589178356714,1.7334669338677355,1.7374749498997997,1.7414829659318638,1.745490981963928,1.749498997995992,1.7535070140280562,1.7575150300601203,1.7615230460921845,1.7655310621242486,1.7695390781563127,1.7735470941883769,1.777555110220441,1.781563126252505,1.785571142284569,1.7895791583166332,1.7935871743486973,1.7975951903807614,1.8016032064128256,1.8056112224448897,1.8096192384769538,1.813627254509018,1.817635270541082,1.8216432865731462,1.8256513026052104,1.8296593186372745,1.8336673346693386,1.8376753507014028,1.8416833667334669,1.845691382765531,1.8496993987975952,1.8537074148296593,1.8577154308617234,1.8617234468937875,1.8657314629258517,1.8697394789579158,1.87374749498998,1.877755511022044,1.8817635270541082,1.8857715430861723,1.8897795591182365,1.8937875751503006,1.8977955911823647,1.9018036072144289,1.905811623246493,1.9098196392785571,1.9138276553106213,1.9178356713426854,1.9218436873747495,1.9258517034068137,1.9298597194388778,1.933867735470942,1.937875751503006,1.9418837675350702,1.9458917835671343,1.9498997995991985,1.9539078156312626,1.9579158316633267,1.9619238476953909,1.965931863727455,1.9699398797595191,1.9739478957915833,1.9779559118236474,1.9819639278557115,1.9859719438877756,1.9899799599198398,1.993987975951904,1.997995991983968,2.002004008016032,2.006012024048096,2.0100200400801604,2.0140280561122244,2.0180360721442887,2.0220440881763526,2.026052104208417,2.030060120240481,2.0340681362725452,2.038076152304609,2.0420841683366735,2.0460921843687374,2.0501002004008018,2.0541082164328657,2.05811623246493,2.062124248496994,2.0661322645290583,2.070140280561122,2.0741482965931866,2.0781563126252505,2.082164328657315,2.0861723446893787,2.090180360721443,2.094188376753507,2.0981963927855714,2.1022044088176353,2.1062124248496996,2.1102204408817635,2.1142284569138274,2.118236472945892,2.1222444889779557,2.12625250501002,2.130260521042084,2.1342685370741483,2.1382765531062122,2.1422845691382766,2.1462925851703405,2.150300601202405,2.1543086172344688,2.158316633266533,2.162324649298597,2.1663326653306614,2.1703406813627253,2.1743486973947896,2.1783567134268536,2.182364729458918,2.186372745490982,2.190380761523046,2.19438877755511,2.1983967935871744,2.2024048096192383,2.2064128256513027,2.2104208416833666,2.214428857715431,2.218436873747495,2.2224448897795592,2.226452905811623,2.2304609218436875,2.2344689378757514,2.2384769539078158,2.2424849699398797,2.246492985971944,2.250501002004008,2.2545090180360723,2.258517034068136,2.2625250501002006,2.2665330661322645,2.270541082164329,2.2745490981963927,2.278557114228457,2.282565130260521,2.2865731462925853,2.2905811623246493,2.2945891783567136,2.2985971943887775,2.302605210420842,2.306613226452906,2.31062124248497,2.314629258517034,2.3186372745490984,2.3226452905811623,2.3266533066132267,2.3306613226452906,2.3346693386773545,2.338677354709419,2.3426853707414828,2.346693386773547,2.350701402805611,2.3547094188376754,2.3587174348697393,2.3627254509018036,2.3667334669338675,2.370741482965932,2.374749498997996,2.37875751503006,2.382765531062124,2.3867735470941884,2.3907815631262523,2.3947895791583167,2.3987975951903806,2.402805611222445,2.406813627254509,2.4108216432865732,2.414829659318637,2.4188376753507015,2.4228456913827654,2.4268537074148298,2.4308617234468937,2.434869739478958,2.438877755511022,2.4428857715430863,2.44689378757515,2.4509018036072145,2.4549098196392785,2.458917835671343,2.4629258517034067,2.466933867735471,2.470941883767535,2.4749498997995993,2.4789579158316633,2.4829659318637276,2.4869739478957915,2.490981963927856,2.49498997995992,2.498997995991984,2.503006012024048,2.5070140280561124,2.5110220440881763,2.5150300601202407,2.5190380761523046,2.523046092184369,2.527054108216433,2.531062124248497,2.535070140280561,2.5390781563126255,2.5430861723446894,2.5470941883767537,2.5511022044088176,2.555110220440882,2.559118236472946,2.56312625250501,2.567134268537074,2.571142284569138,2.5751503006012024,2.5791583166332663,2.5831663326653307,2.5871743486973946,2.591182364729459,2.595190380761523,2.599198396793587,2.603206412825651,2.6072144288577155,2.6112224448897794,2.6152304609218437,2.6192384769539077,2.623246492985972,2.627254509018036,2.6312625250501003,2.635270541082164,2.6392785571142285,2.6432865731462925,2.647294589178357,2.6513026052104207,2.655310621242485,2.659318637274549,2.6633266533066133,2.6673346693386772,2.6713426853707416,2.6753507014028055,2.67935871743487,2.6833667334669338,2.687374749498998,2.691382765531062,2.6953907815631264,2.6993987975951903,2.7034068136272547,2.7074148296593186,2.711422845691383,2.715430861723447,2.719438877755511,2.723446893787575,2.7274549098196395,2.7314629258517034,2.7354709418837677,2.7394789579158316,2.743486973947896,2.74749498997996,2.7515030060120242,2.755511022044088,2.7595190380761525,2.7635270541082164,2.7675350701402808,2.7715430861723447,2.775551102204409,2.779559118236473,2.783567134268537,2.787575150300601,2.791583166332665,2.7955911823647295,2.7995991983967934,2.8036072144288577,2.8076152304609217,2.811623246492986,2.81563126252505,2.8196392785571143,2.823647294589178,2.8276553106212425,2.8316633266533064,2.835671342685371,2.8396793587174347,2.843687374749499,2.847695390781563,2.8517034068136273,2.8557114228456912,2.8597194388777556,2.8637274549098195,2.867735470941884,2.8717434869739478,2.875751503006012,2.879759519038076,2.8837675350701404,2.8877755511022043,2.8917835671342687,2.8957915831663326,2.899799599198397,2.903807615230461,2.907815631262525,2.911823647294589,2.9158316633266534,2.9198396793587174,2.9238476953907817,2.9278557114228456,2.93186372745491,2.935871743486974,2.9398797595190382,2.943887775551102,2.9478957915831665,2.9519038076152304,2.9559118236472948,2.9599198396793587,2.963927855711423,2.967935871743487,2.9719438877755513,2.975951903807615,2.9799599198396796,2.9839679358717435,2.987975951903808,2.9919839679358717,2.995991983967936,3.0]}
},{}],24:[function(require,module,exports){
module.exports={"expected":[-0.7421009647076605,-0.7423393595045268,-0.7425776013954357,-0.7428156904019666,-0.7430536265457834,-0.7432914098486341,-0.7435290403323508,-0.7437665180188502,-0.7440038429301326,-0.7442410150882824,-0.7444780345154681,-0.7447149012339418,-0.7449516152660395,-0.7451881766341807,-0.7454245853608688,-0.7456608414686904,-0.7458969449803158,-0.7461328959184986,-0.7463686943060758,-0.7466043401659673,-0.7468398335211767,-0.74707517439479,-0.7473103628099768,-0.7475453987899893,-0.7477802823581625,-0.7480150135379147,-0.748249592352746,-0.7484840188262399,-0.748718292982062,-0.7489524148439608,-0.7491863844357666,-0.7494202017813925,-0.7496538669048336,-0.7498873798301671,-0.7501207405815526,-0.7503539491832314,-0.750587005659527,-0.7508199100348443,-0.7510526623336704,-0.751285262580574,-0.7515177108002055,-0.7517500070172964,-0.7519821512566603,-0.7522141435431918,-0.7524459839018669,-0.7526776723577426,-0.7529092089359577,-0.7531405936617315,-0.7533718265603644,-0.7536029076572378,-0.753833836977814,-0.7540646145476362,-0.7542952403923279,-0.7545257145375934,-0.7547560370092177,-0.754986207833066,-0.7552162270350842,-0.7554460946412981,-0.7556758106778141,-0.7559053751708185,-0.7561347881465778,-0.7563640496314383,-0.7565931596518267,-0.7568221182342489,-0.757050925405291,-0.7572795811916184,-0.7575080856199766,-0.7577364387171903,-0.7579646405101637,-0.7581926910258802,-0.7584205902914027,-0.7586483383338735,-0.7588759351805136,-0.7591033808586231,-0.7593306753955814,-0.7595578188188464,-0.7597848111559553,-0.7600116524345236,-0.7602383426822455,-0.7604648819268941,-0.7606912701963204,-0.7609175075184547,-0.7611435939213047,-0.761369529432957,-0.761595314081576,-0.7618209478954046,-0.7620464309027634,-0.7622717631320509,-0.7624969446117438,-0.7627219753703962,-0.7629468554366403,-0.7631715848391856,-0.7633961636068192,-0.7636205917684058,-0.7638448693528872,-0.764068996389283,-0.7642929729066896,-0.7645167989342807,-0.7647404745013071,-0.7649639996370964,-0.7651873743710533,-0.7654105987326593,-0.7656336727514725,-0.765856596457128,-0.766079369879337,-0.7663019930478876,-0.7665244659926441,-0.7667467887435474,-0.7669689613306143,-0.767190983783938,-0.7674128561336879,-0.7676345784101093,-0.7678561506435234,-0.7680775728643273,-0.7682988451029937,-0.7685199673900717,-0.768740939756185,-0.7689617622320335,-0.7691824348483925,-0.7694029576361125,-0.7696233306261194,-0.7698435538494143,-0.7700636273370733,-0.7702835511202479,-0.7705033252301643,-0.7707229496981234,-0.7709424245555014,-0.771161749833749,-0.7713809255643913,-0.7715999517790284,-0.7718188285093346,-0.7720375557870587,-0.7722561336440237,-0.7724745621121271,-0.7726928412233403,-0.7729109710097088,-0.7731289515033525,-0.7733467827364646,-0.7735644647413125,-0.7737819975502371,-0.7739993811956536,-0.77421661571005,-0.7744337011259881,-0.7746506374761032,-0.774867424793104,-0.7750840631097724,-0.7753005524589633,-0.775516892873605,-0.7757330843866984,-0.7759491270313179,-0.7761650208406102,-0.7763807658477951,-0.7765963620861651,-0.7768118095890849,-0.7770271083899923,-0.7772422585223971,-0.7774572600198818,-0.7776721129161007,-0.7778868172447808,-0.778101373039721,-0.7783157803347921,-0.778530039163937,-0.7787441495611706,-0.778958111560579,-0.7791719251963208,-0.7793855905026258,-0.7795991075137951,-0.7798124762642017,-0.7800256967882896,-0.7802387691205744,-0.7804516932956428,-0.7806644693481524,-0.7808770973128322,-0.7810895772244817,-0.7813019091179718,-0.7815140930282438,-0.7817261289903098,-0.7819380170392527,-0.7821497572102255,-0.7823613495384522,-0.7825727940592268,-0.7827840908079136,-0.7829952398199473,-0.7832062411308327,-0.7834170947761444,-0.7836278007915274,-0.7838383592126958,-0.7840487700754345,-0.7842590334155972,-0.7844691492691079,-0.7846791176719596,-0.7848889386602153,-0.7850986122700067,-0.7853081385375352,-0.7855175174990717,-0.7857267491909558,-0.785935833649596,-0.78614477091147,-0.7863535610131245,-0.7865622039911747,-0.7867706998823047,-0.7869790487232673,-0.7871872505508835,-0.7873953054020429,-0.7876032133137038,-0.787810974322892,-0.7880185884667025,-0.7882260557822975,-0.788433376306908,-0.7886405500778324,-0.7888475771324371,-0.7890544575081565,-0.7892611912424923,-0.7894677783730142,-0.7896742189373592,-0.7898805129732319,-0.790086660518404,-0.7902926616107148,-0.7904985162880706,-0.7907042245884447,-0.7909097865498776,-0.7911152022104769,-0.7913204716084167,-0.791525594781938,-0.7917305717693485,-0.7919354026090226,-0.792140087339401,-0.7923446259989909,-0.7925490186263662,-0.7927532652601664,-0.7929573659390978,-0.7931613207019323,-0.7933651295875083,-0.7935687926347297,-0.7937723098825663,-0.793975681370054,-0.794178907136294,-0.7943819872204532,-0.794584921661764,-0.7947877104995242,-0.7949903537730971,-0.795192851521911,-0.7953952037854594,-0.795597410603301,-0.7957994720150595,-0.7960013880604234,-0.796203158779146,-0.7964047842110454,-0.7966062643960045,-0.7968075993739704,-0.797008789184955,-0.7972098338690345,-0.7974107334663494,-0.7976114880171044,-0.7978120975615685,-0.7980125621400743,-0.798212881793019,-0.7984130565608634,-0.7986130864841319,-0.7988129716034129,-0.7990127119593583,-0.7992123075926836,-0.7994117585441677,-0.7996110648546529,-0.799810226565045,-0.8000092437163125,-0.8002081163494875,-0.8004068445056649,-0.8006054282260028,-0.8008038675517216,-0.801002162524105,-0.8012003131844994,-0.8013983195743135,-0.8015961817350187,-0.8017938997081486,-0.8019914735352996,-0.8021889032581301,-0.8023861889183606,-0.8025833305577736,-0.8027803282182142,-0.8029771819415887,-0.8031738917698658,-0.8033704577450753,-0.8035668799093094,-0.8037631583047216,-0.8039592929735265,-0.8041552839580006,-0.8043511313004817,-0.8045468350433687,-0.8047423952291214,-0.8049378119002611,-0.8051330850993699,-0.8053282148690908,-0.8055232012521275,-0.8057180442912446,-0.8059127440292673,-0.8061073005090811,-0.8063017137736324,-0.8064959838659277,-0.8066901108290337,-0.8068840947060778,-0.8070779355402468,-0.807271633374788,-0.8074651882530086,-0.8076586002182756,-0.8078518693140159,-0.8080449955837158,-0.8082379790709215,-0.8084308198192387,-0.8086235178723322,-0.8088160732739266,-0.8090084860678054,-0.8092007562978115,-0.8093928840078468,-0.8095848692418722,-0.8097767120439077,-0.8099684124580316,-0.8101599705283816,-0.8103513862991538,-0.8105426598146026,-0.8107337911190412,-0.8109247802568412,-0.8111156272724325,-0.8113063322103029,-0.8114968951149988,-0.8116873160311244,-0.811877595003342,-0.8120677320763717,-0.8122577272949913,-0.8124475807040364,-0.8126372923484004,-0.812826862273034,-0.8130162905229454,-0.8132055771432002,-0.8133947221789213,-0.8135837256752887,-0.8137725876775396,-0.8139613082309681,-0.8141498873809256,-0.8143383251728198,-0.8145266216521155,-0.8147147768643341,-0.8149027908550537,-0.8150906636699086,-0.8152783953545898,-0.8154659859548445,-0.8156534355164763,-0.8158407440853447,-0.8160279117073654,-0.8162149384285102,-0.8164018242948066,-0.8165885693523379,-0.8167751736472434,-0.8169616372257178,-0.8171479601340114,-0.8173341424184298,-0.8175201841253343,-0.8177060853011414,-0.8178918459923227,-0.8180774662454049,-0.8182629461069697,-0.818448285623654,-0.8186334848421495,-0.8188185438092023,-0.8190034625716134,-0.8191882411762388,-0.8193728796699885,-0.819557378099827,-0.8197417365127734,-0.8199259549559007,-0.8201100334763364,-0.8202939721212619,-0.8204777709379125,-0.8206614299735778,-0.8208449492756007,-0.8210283288913781,-0.8212115688683608,-0.8213946692540526,-0.8215776300960113,-0.8217604514418475,-0.8219431333392259,-0.8221256758358637,-0.8223080789795316,-0.8224903428180532,-0.822672467399305,-0.8228544527712167,-0.8230362989817704,-0.8232180060790012,-0.8233995741109964,-0.8235810031258961,-0.8237622931718931,-0.823943444297232,-0.8241244565502099,-0.8243053299791763,-0.8244860646325323,-0.8246666605587316,-0.8248471178062793,-0.8250274364237326,-0.8252076164597003,-0.825387657962843,-0.8255675609818728,-0.8257473255655532,-0.8259269517626994,-0.8261064396221774,-0.826285789192905,-0.8264650005238505,-0.8266440736640339,-0.8268230086625258,-0.8270018055684476,-0.8271804644309718,-0.8273589852993213,-0.8275373682227699,-0.8277156132506416,-0.8278937204323111,-0.8280716898172035,-0.8282495214547938,-0.8284272153946076,-0.8286047716862205,-0.8287821903792578,-0.8289594715233952,-0.829136615168358,-0.8293136213639212,-0.8294904901599094,-0.829667221606197,-0.8298438157527078,-0.8300202726494151,-0.8301965923463412,-0.8303727748935581,-0.8305488203411864,-0.8307247287393963,-0.8309005001384067,-0.8310761345884852,-0.8312516321399486,-0.8314269928431621,-0.8316022167485398,-0.8317773039065441,-0.831952254367686,-0.8321270681825249,-0.832301745401668,-0.8324762860757715,-0.8326506902555392,-0.8328249579917228,-0.8329990893351225,-0.8331730843365855,-0.8333469430470077,-0.8335206655173322,-0.8336942517985495,-0.8338677019416979,-0.8340410159978632,-0.8342141940181781,-0.834387236053823,-0.8345601421560254,-0.8347329123760593,-0.8349055467652465,-0.8350780453749552,-0.8352504082566007,-0.8354226354616445,-0.8355947270415954,-0.8357666830480083,-0.8359385035324849,-0.8361101885466729,-0.8362817381422665,-0.836453152371006,-0.8366244312846782,-0.8367955749351156,-0.8369665833741965,-0.8371374566538453,-0.8373081948260324,-0.8374787979427731,-0.8376492660561294,-0.8378195992182079,-0.8379897974811611,-0.8381598608971866,-0.8383297895185275,-0.838499583397472,-0.8386692425863531,-0.8388387671375492,-0.8390081571034834,-0.8391774125366237,-0.8393465334894828,-0.8395155200146182,-0.8396843721646315,-0.8398530899921693,-0.8400216735499226,-0.8401901228906263,-0.8403584380670599,-0.8405266191320468,-0.8406946661384544,-0.8408625791391946,-0.8410303581872225,-0.8411980033355372,-0.8413655146371818,-0.8415328921452427,-0.8417001359128501,-0.8418672459931773,-0.8420342224394413,-0.8422010653049021,-0.8423677746428632,-0.842534350506671,-0.8427007929497149],"x":[-0.8,-0.8004008016032064,-0.8008016032064128,-0.8012024048096192,-0.8016032064128257,-0.8020040080160321,-0.8024048096192384,-0.8028056112224449,-0.8032064128256513,-0.8036072144288577,-0.8040080160320642,-0.8044088176352705,-0.8048096192384769,-0.8052104208416834,-0.8056112224448898,-0.8060120240480962,-0.8064128256513026,-0.806813627254509,-0.8072144288577154,-0.8076152304609219,-0.8080160320641283,-0.8084168336673346,-0.8088176352705411,-0.8092184368737475,-0.8096192384769539,-0.8100200400801604,-0.8104208416833667,-0.8108216432865731,-0.8112224448897796,-0.811623246492986,-0.8120240480961923,-0.8124248496993988,-0.8128256513026052,-0.8132264529058116,-0.8136272545090181,-0.8140280561122244,-0.8144288577154308,-0.8148296593186373,-0.8152304609218437,-0.8156312625250501,-0.8160320641282565,-0.8164328657314629,-0.8168336673346693,-0.8172344689378758,-0.8176352705410822,-0.8180360721442885,-0.818436873747495,-0.8188376753507014,-0.8192384769539078,-0.8196392785571143,-0.8200400801603206,-0.820440881763527,-0.8208416833667335,-0.8212424849699399,-0.8216432865731463,-0.8220440881763527,-0.8224448897795591,-0.8228456913827655,-0.823246492985972,-0.8236472945891784,-0.8240480961923847,-0.8244488977955912,-0.8248496993987976,-0.825250501002004,-0.8256513026052105,-0.8260521042084168,-0.8264529058116232,-0.8268537074148297,-0.8272545090180361,-0.8276553106212425,-0.8280561122244489,-0.8284569138276553,-0.8288577154308617,-0.8292585170340682,-0.8296593186372746,-0.8300601202404809,-0.8304609218436874,-0.8308617234468938,-0.8312625250501002,-0.8316633266533067,-0.832064128256513,-0.8324649298597194,-0.8328657314629259,-0.8332665330661323,-0.8336673346693386,-0.8340681362725451,-0.8344689378757515,-0.8348697394789579,-0.8352705410821644,-0.8356713426853707,-0.8360721442885771,-0.8364729458917836,-0.83687374749499,-0.8372745490981964,-0.8376753507014028,-0.8380761523046092,-0.8384769539078156,-0.8388777555110221,-0.8392785571142285,-0.8396793587174348,-0.8400801603206413,-0.8404809619238477,-0.8408817635270541,-0.8412825651302606,-0.8416833667334669,-0.8420841683366733,-0.8424849699398798,-0.8428857715430862,-0.8432865731462926,-0.843687374749499,-0.8440881763527054,-0.8444889779559118,-0.8448897795591183,-0.8452905811623247,-0.845691382765531,-0.8460921843687375,-0.8464929859719439,-0.8468937875751503,-0.8472945891783568,-0.8476953907815631,-0.8480961923847695,-0.848496993987976,-0.8488977955911824,-0.8492985971943888,-0.8496993987975952,-0.8501002004008016,-0.850501002004008,-0.8509018036072145,-0.8513026052104209,-0.8517034068136272,-0.8521042084168337,-0.8525050100200401,-0.8529058116232465,-0.853306613226453,-0.8537074148296593,-0.8541082164328657,-0.8545090180360722,-0.8549098196392786,-0.855310621242485,-0.8557114228456913,-0.8561122244488978,-0.8565130260521042,-0.8569138276553107,-0.857314629258517,-0.8577154308617234,-0.8581162324649299,-0.8585170340681363,-0.8589178356713427,-0.859318637274549,-0.8597194388777555,-0.8601202404809619,-0.8605210420841684,-0.8609218436873748,-0.8613226452905811,-0.8617234468937875,-0.862124248496994,-0.8625250501002004,-0.8629258517034069,-0.8633266533066132,-0.8637274549098196,-0.864128256513026,-0.8645290581162325,-0.8649298597194389,-0.8653306613226452,-0.8657314629258517,-0.8661322645290581,-0.8665330661322646,-0.866933867735471,-0.8673346693386773,-0.8677354709418837,-0.8681362725450902,-0.8685370741482966,-0.868937875751503,-0.8693386773547094,-0.8697394789579158,-0.8701402805611222,-0.8705410821643287,-0.8709418837675351,-0.8713426853707414,-0.8717434869739479,-0.8721442885771543,-0.8725450901803607,-0.8729458917835672,-0.8733466933867735,-0.87374749498998,-0.8741482965931864,-0.8745490981963928,-0.8749498997995993,-0.8753507014028056,-0.875751503006012,-0.8761523046092184,-0.8765531062124249,-0.8769539078156313,-0.8773547094188376,-0.8777555110220441,-0.8781563126252505,-0.878557114228457,-0.8789579158316633,-0.8793587174348697,-0.8797595190380761,-0.8801603206412826,-0.880561122244489,-0.8809619238476953,-0.8813627254509018,-0.8817635270541082,-0.8821643286573146,-0.8825651302605211,-0.8829659318637274,-0.8833667334669338,-0.8837675350701403,-0.8841683366733467,-0.8845691382765531,-0.8849699398797595,-0.8853707414829659,-0.8857715430861723,-0.8861723446893788,-0.8865731462925852,-0.8869739478957915,-0.887374749498998,-0.8877755511022044,-0.8881763527054108,-0.8885771543086173,-0.8889779559118236,-0.88937875751503,-0.8897795591182365,-0.8901803607214429,-0.8905811623246493,-0.8909819639278557,-0.8913827655310621,-0.8917835671342685,-0.892184368737475,-0.8925851703406814,-0.8929859719438877,-0.8933867735470942,-0.8937875751503006,-0.894188376753507,-0.8945891783567135,-0.8949899799599198,-0.8953907815631262,-0.8957915831663327,-0.8961923847695391,-0.8965931863727455,-0.8969939879759519,-0.8973947895791583,-0.8977955911823647,-0.8981963927855712,-0.8985971943887776,-0.8989979959919839,-0.8993987975951904,-0.8997995991983968,-0.9002004008016032,-0.9006012024048096,-0.901002004008016,-0.9014028056112224,-0.9018036072144289,-0.9022044088176353,-0.9026052104208416,-0.9030060120240481,-0.9034068136272545,-0.9038076152304609,-0.9042084168336674,-0.9046092184368737,-0.9050100200400801,-0.9054108216432866,-0.905811623246493,-0.9062124248496994,-0.9066132264529058,-0.9070140280561122,-0.9074148296593186,-0.9078156312625251,-0.9082164328657315,-0.9086172344689378,-0.9090180360721443,-0.9094188376753507,-0.9098196392785571,-0.9102204408817636,-0.9106212424849699,-0.9110220440881763,-0.9114228456913828,-0.9118236472945892,-0.9122244488977956,-0.912625250501002,-0.9130260521042084,-0.9134268537074148,-0.9138276553106213,-0.9142284569138277,-0.914629258517034,-0.9150300601202405,-0.9154308617234469,-0.9158316633266533,-0.9162324649298598,-0.9166332665330661,-0.9170340681362725,-0.917434869739479,-0.9178356713426854,-0.9182364729458918,-0.9186372745490982,-0.9190380761523046,-0.919438877755511,-0.9198396793587175,-0.9202404809619239,-0.9206412825651302,-0.9210420841683367,-0.9214428857715431,-0.9218436873747495,-0.9222444889779559,-0.9226452905811623,-0.9230460921843687,-0.9234468937875752,-0.9238476953907816,-0.9242484969939879,-0.9246492985971944,-0.9250501002004008,-0.9254509018036072,-0.9258517034068137,-0.92625250501002,-0.9266533066132264,-0.9270541082164329,-0.9274549098196393,-0.9278557114228457,-0.928256513026052,-0.9286573146292585,-0.9290581162324649,-0.9294589178356714,-0.9298597194388778,-0.9302605210420841,-0.9306613226452906,-0.931062124248497,-0.9314629258517034,-0.9318637274549099,-0.9322645290581162,-0.9326653306613226,-0.9330661322645291,-0.9334669338677355,-0.9338677354709419,-0.9342685370741483,-0.9346693386773547,-0.9350701402805611,-0.9354709418837676,-0.935871743486974,-0.9362725450901803,-0.9366733466933868,-0.9370741482965932,-0.9374749498997996,-0.9378757515030061,-0.9382765531062124,-0.9386773547094188,-0.9390781563126253,-0.9394789579158317,-0.9398797595190381,-0.9402805611222445,-0.9406813627254509,-0.9410821643286573,-0.9414829659318638,-0.9418837675350702,-0.9422845691382765,-0.942685370741483,-0.9430861723446894,-0.9434869739478958,-0.9438877755511023,-0.9442885771543086,-0.944689378757515,-0.9450901803607215,-0.9454909819639279,-0.9458917835671342,-0.9462925851703406,-0.9466933867735471,-0.9470941883767535,-0.94749498997996,-0.9478957915831663,-0.9482965931863727,-0.9486973947895792,-0.9490981963927856,-0.949498997995992,-0.9498997995991983,-0.9503006012024048,-0.9507014028056112,-0.9511022044088177,-0.9515030060120241,-0.9519038076152304,-0.9523046092184368,-0.9527054108216433,-0.9531062124248497,-0.9535070140280562,-0.9539078156312625,-0.9543086172344689,-0.9547094188376753,-0.9551102204408818,-0.9555110220440882,-0.9559118236472945,-0.956312625250501,-0.9567134268537074,-0.9571142284569139,-0.9575150300601203,-0.9579158316633266,-0.958316633266533,-0.9587174348697395,-0.9591182364729459,-0.9595190380761524,-0.9599198396793587,-0.9603206412825651,-0.9607214428857715,-0.961122244488978,-0.9615230460921844,-0.9619238476953907,-0.9623246492985972,-0.9627254509018036,-0.96312625250501,-0.9635270541082165,-0.9639278557114228,-0.9643286573146292,-0.9647294589178357,-0.9651302605210421,-0.9655310621242486,-0.9659318637274549,-0.9663326653306613,-0.9667334669338677,-0.9671342685370742,-0.9675350701402805,-0.9679358717434869,-0.9683366733466934,-0.9687374749498998,-0.9691382765531062,-0.9695390781563126,-0.969939879759519,-0.9703406813627254,-0.9707414829659319,-0.9711422845691383,-0.9715430861723446,-0.9719438877755511,-0.9723446893787575,-0.972745490981964,-0.9731462925851704,-0.9735470941883767,-0.9739478957915831,-0.9743486973947896,-0.974749498997996,-0.9751503006012024,-0.9755511022044088,-0.9759519038076152,-0.9763527054108216,-0.9767535070140281,-0.9771543086172345,-0.9775551102204408,-0.9779559118236473,-0.9783567134268537,-0.9787575150300601,-0.9791583166332666,-0.9795591182364729,-0.9799599198396793,-0.9803607214428858,-0.9807615230460922,-0.9811623246492986,-0.981563126252505,-0.9819639278557114,-0.9823647294589178,-0.9827655310621243,-0.9831663326653307,-0.983567134268537,-0.9839679358717435,-0.9843687374749499,-0.9847695390781563,-0.9851703406813628,-0.9855711422845691,-0.9859719438877755,-0.986372745490982,-0.9867735470941884,-0.9871743486973948,-0.9875751503006012,-0.9879759519038076,-0.988376753507014,-0.9887775551102205,-0.9891783567134268,-0.9895791583166332,-0.9899799599198397,-0.9903807615230461,-0.9907815631262525,-0.9911823647294589,-0.9915831663326653,-0.9919839679358717,-0.9923847695390782,-0.9927855711422846,-0.9931863727454909,-0.9935871743486974,-0.9939879759519038,-0.9943887775551102,-0.9947895791583167,-0.995190380761523,-0.9955911823647294,-0.9959919839679359,-0.9963927855711423,-0.9967935871743487,-0.9971943887775551,-0.9975951903807615,-0.9979959919839679,-0.9983967935871744,-0.9987975951903808,-0.9991983967935871,-0.9995991983967936,-1.0]}
},{}],25:[function(require,module,exports){
module.exports={"expected":[0.7421009647076605,0.7423393595045268,0.7425776013954357,0.7428156904019666,0.7430536265457834,0.7432914098486341,0.7435290403323508,0.7437665180188502,0.7440038429301326,0.7442410150882824,0.7444780345154681,0.7447149012339418,0.7449516152660395,0.7451881766341807,0.7454245853608688,0.7456608414686904,0.7458969449803158,0.7461328959184986,0.7463686943060758,0.7466043401659673,0.7468398335211767,0.74707517439479,0.7473103628099768,0.7475453987899893,0.7477802823581625,0.7480150135379147,0.748249592352746,0.7484840188262399,0.748718292982062,0.7489524148439608,0.7491863844357666,0.7494202017813925,0.7496538669048336,0.7498873798301671,0.7501207405815526,0.7503539491832314,0.750587005659527,0.7508199100348443,0.7510526623336704,0.751285262580574,0.7515177108002055,0.7517500070172964,0.7519821512566603,0.7522141435431918,0.7524459839018669,0.7526776723577426,0.7529092089359577,0.7531405936617315,0.7533718265603644,0.7536029076572378,0.753833836977814,0.7540646145476362,0.7542952403923279,0.7545257145375934,0.7547560370092177,0.754986207833066,0.7552162270350842,0.7554460946412981,0.7556758106778141,0.7559053751708185,0.7561347881465778,0.7563640496314383,0.7565931596518267,0.7568221182342489,0.757050925405291,0.7572795811916184,0.7575080856199766,0.7577364387171903,0.7579646405101637,0.7581926910258802,0.7584205902914027,0.7586483383338735,0.7588759351805136,0.7591033808586231,0.7593306753955814,0.7595578188188464,0.7597848111559553,0.7600116524345236,0.7602383426822455,0.7604648819268941,0.7606912701963204,0.7609175075184547,0.7611435939213047,0.761369529432957,0.761595314081576,0.7618209478954046,0.7620464309027634,0.7622717631320509,0.7624969446117438,0.7627219753703962,0.7629468554366403,0.7631715848391856,0.7633961636068192,0.7636205917684058,0.7638448693528872,0.764068996389283,0.7642929729066896,0.7645167989342807,0.7647404745013071,0.7649639996370964,0.7651873743710533,0.7654105987326593,0.7656336727514725,0.765856596457128,0.766079369879337,0.7663019930478876,0.7665244659926441,0.7667467887435474,0.7669689613306143,0.767190983783938,0.7674128561336879,0.7676345784101093,0.7678561506435234,0.7680775728643273,0.7682988451029937,0.7685199673900717,0.768740939756185,0.7689617622320335,0.7691824348483925,0.7694029576361125,0.7696233306261194,0.7698435538494143,0.7700636273370733,0.7702835511202479,0.7705033252301643,0.7707229496981234,0.7709424245555014,0.771161749833749,0.7713809255643913,0.7715999517790284,0.7718188285093346,0.7720375557870587,0.7722561336440237,0.7724745621121271,0.7726928412233403,0.7729109710097088,0.7731289515033525,0.7733467827364646,0.7735644647413125,0.7737819975502371,0.7739993811956536,0.77421661571005,0.7744337011259881,0.7746506374761032,0.774867424793104,0.7750840631097724,0.7753005524589633,0.775516892873605,0.7757330843866984,0.7759491270313179,0.7761650208406102,0.7763807658477951,0.7765963620861651,0.7768118095890849,0.7770271083899923,0.7772422585223971,0.7774572600198818,0.7776721129161007,0.7778868172447808,0.778101373039721,0.7783157803347921,0.778530039163937,0.7787441495611706,0.778958111560579,0.7791719251963208,0.7793855905026258,0.7795991075137951,0.7798124762642017,0.7800256967882896,0.7802387691205744,0.7804516932956428,0.7806644693481524,0.7808770973128322,0.7810895772244817,0.7813019091179718,0.7815140930282438,0.7817261289903098,0.7819380170392527,0.7821497572102255,0.7823613495384522,0.7825727940592268,0.7827840908079136,0.7829952398199473,0.7832062411308327,0.7834170947761444,0.7836278007915274,0.7838383592126958,0.7840487700754345,0.7842590334155972,0.7844691492691079,0.7846791176719596,0.7848889386602153,0.7850986122700067,0.7853081385375352,0.7855175174990717,0.7857267491909558,0.785935833649596,0.78614477091147,0.7863535610131245,0.7865622039911747,0.7867706998823047,0.7869790487232673,0.7871872505508835,0.7873953054020429,0.7876032133137038,0.787810974322892,0.7880185884667025,0.7882260557822975,0.788433376306908,0.7886405500778324,0.7888475771324371,0.7890544575081565,0.7892611912424923,0.7894677783730142,0.7896742189373592,0.7898805129732319,0.790086660518404,0.7902926616107148,0.7904985162880706,0.7907042245884447,0.7909097865498776,0.7911152022104769,0.7913204716084167,0.791525594781938,0.7917305717693485,0.7919354026090226,0.792140087339401,0.7923446259989909,0.7925490186263662,0.7927532652601664,0.7929573659390978,0.7931613207019323,0.7933651295875083,0.7935687926347297,0.7937723098825663,0.793975681370054,0.794178907136294,0.7943819872204532,0.794584921661764,0.7947877104995242,0.7949903537730971,0.795192851521911,0.7953952037854594,0.795597410603301,0.7957994720150595,0.7960013880604234,0.796203158779146,0.7964047842110454,0.7966062643960045,0.7968075993739704,0.797008789184955,0.7972098338690345,0.7974107334663494,0.7976114880171044,0.7978120975615685,0.7980125621400743,0.798212881793019,0.7984130565608634,0.7986130864841319,0.7988129716034129,0.7990127119593583,0.7992123075926836,0.7994117585441677,0.7996110648546529,0.799810226565045,0.8000092437163125,0.8002081163494875,0.8004068445056649,0.8006054282260028,0.8008038675517216,0.801002162524105,0.8012003131844994,0.8013983195743135,0.8015961817350187,0.8017938997081486,0.8019914735352996,0.8021889032581301,0.8023861889183606,0.8025833305577736,0.8027803282182142,0.8029771819415887,0.8031738917698658,0.8033704577450753,0.8035668799093094,0.8037631583047216,0.8039592929735265,0.8041552839580006,0.8043511313004817,0.8045468350433687,0.8047423952291214,0.8049378119002611,0.8051330850993699,0.8053282148690908,0.8055232012521275,0.8057180442912446,0.8059127440292673,0.8061073005090811,0.8063017137736324,0.8064959838659277,0.8066901108290337,0.8068840947060778,0.8070779355402468,0.807271633374788,0.8074651882530086,0.8076586002182756,0.8078518693140159,0.8080449955837158,0.8082379790709215,0.8084308198192387,0.8086235178723322,0.8088160732739266,0.8090084860678054,0.8092007562978115,0.8093928840078468,0.8095848692418722,0.8097767120439077,0.8099684124580316,0.8101599705283816,0.8103513862991538,0.8105426598146026,0.8107337911190412,0.8109247802568412,0.8111156272724325,0.8113063322103029,0.8114968951149988,0.8116873160311244,0.811877595003342,0.8120677320763717,0.8122577272949913,0.8124475807040364,0.8126372923484004,0.812826862273034,0.8130162905229454,0.8132055771432002,0.8133947221789213,0.8135837256752887,0.8137725876775396,0.8139613082309681,0.8141498873809256,0.8143383251728198,0.8145266216521155,0.8147147768643341,0.8149027908550537,0.8150906636699086,0.8152783953545898,0.8154659859548445,0.8156534355164763,0.8158407440853447,0.8160279117073654,0.8162149384285102,0.8164018242948066,0.8165885693523379,0.8167751736472434,0.8169616372257178,0.8171479601340114,0.8173341424184298,0.8175201841253343,0.8177060853011414,0.8178918459923227,0.8180774662454049,0.8182629461069697,0.818448285623654,0.8186334848421495,0.8188185438092023,0.8190034625716134,0.8191882411762388,0.8193728796699885,0.819557378099827,0.8197417365127734,0.8199259549559007,0.8201100334763364,0.8202939721212619,0.8204777709379125,0.8206614299735778,0.8208449492756007,0.8210283288913781,0.8212115688683608,0.8213946692540526,0.8215776300960113,0.8217604514418475,0.8219431333392259,0.8221256758358637,0.8223080789795316,0.8224903428180532,0.822672467399305,0.8228544527712167,0.8230362989817704,0.8232180060790012,0.8233995741109964,0.8235810031258961,0.8237622931718931,0.823943444297232,0.8241244565502099,0.8243053299791763,0.8244860646325323,0.8246666605587316,0.8248471178062793,0.8250274364237326,0.8252076164597003,0.825387657962843,0.8255675609818728,0.8257473255655532,0.8259269517626994,0.8261064396221774,0.826285789192905,0.8264650005238505,0.8266440736640339,0.8268230086625258,0.8270018055684476,0.8271804644309718,0.8273589852993213,0.8275373682227699,0.8277156132506416,0.8278937204323111,0.8280716898172035,0.8282495214547938,0.8284272153946076,0.8286047716862205,0.8287821903792578,0.8289594715233952,0.829136615168358,0.8293136213639212,0.8294904901599094,0.829667221606197,0.8298438157527078,0.8300202726494151,0.8301965923463412,0.8303727748935581,0.8305488203411864,0.8307247287393963,0.8309005001384067,0.8310761345884852,0.8312516321399486,0.8314269928431621,0.8316022167485398,0.8317773039065441,0.831952254367686,0.8321270681825249,0.832301745401668,0.8324762860757715,0.8326506902555392,0.8328249579917228,0.8329990893351225,0.8331730843365855,0.8333469430470077,0.8335206655173322,0.8336942517985495,0.8338677019416979,0.8340410159978632,0.8342141940181781,0.834387236053823,0.8345601421560254,0.8347329123760593,0.8349055467652465,0.8350780453749552,0.8352504082566007,0.8354226354616445,0.8355947270415954,0.8357666830480083,0.8359385035324849,0.8361101885466729,0.8362817381422665,0.836453152371006,0.8366244312846782,0.8367955749351156,0.8369665833741965,0.8371374566538453,0.8373081948260324,0.8374787979427731,0.8376492660561294,0.8378195992182079,0.8379897974811611,0.8381598608971866,0.8383297895185275,0.838499583397472,0.8386692425863531,0.8388387671375492,0.8390081571034834,0.8391774125366237,0.8393465334894828,0.8395155200146182,0.8396843721646315,0.8398530899921693,0.8400216735499226,0.8401901228906263,0.8403584380670599,0.8405266191320468,0.8406946661384544,0.8408625791391946,0.8410303581872225,0.8411980033355372,0.8413655146371818,0.8415328921452427,0.8417001359128501,0.8418672459931773,0.8420342224394413,0.8422010653049021,0.8423677746428632,0.842534350506671,0.8427007929497149],"x":[0.8,0.8004008016032064,0.8008016032064128,0.8012024048096192,0.8016032064128257,0.8020040080160321,0.8024048096192384,0.8028056112224449,0.8032064128256513,0.8036072144288577,0.8040080160320642,0.8044088176352705,0.8048096192384769,0.8052104208416834,0.8056112224448898,0.8060120240480962,0.8064128256513026,0.806813627254509,0.8072144288577154,0.8076152304609219,0.8080160320641283,0.8084168336673346,0.8088176352705411,0.8092184368737475,0.8096192384769539,0.8100200400801604,0.8104208416833667,0.8108216432865731,0.8112224448897796,0.811623246492986,0.8120240480961923,0.8124248496993988,0.8128256513026052,0.8132264529058116,0.8136272545090181,0.8140280561122244,0.8144288577154308,0.8148296593186373,0.8152304609218437,0.8156312625250501,0.8160320641282565,0.8164328657314629,0.8168336673346693,0.8172344689378758,0.8176352705410822,0.8180360721442885,0.818436873747495,0.8188376753507014,0.8192384769539078,0.8196392785571143,0.8200400801603206,0.820440881763527,0.8208416833667335,0.8212424849699399,0.8216432865731463,0.8220440881763527,0.8224448897795591,0.8228456913827655,0.823246492985972,0.8236472945891784,0.8240480961923847,0.8244488977955912,0.8248496993987976,0.825250501002004,0.8256513026052105,0.8260521042084168,0.8264529058116232,0.8268537074148297,0.8272545090180361,0.8276553106212425,0.8280561122244489,0.8284569138276553,0.8288577154308617,0.8292585170340682,0.8296593186372746,0.8300601202404809,0.8304609218436874,0.8308617234468938,0.8312625250501002,0.8316633266533067,0.832064128256513,0.8324649298597194,0.8328657314629259,0.8332665330661323,0.8336673346693386,0.8340681362725451,0.8344689378757515,0.8348697394789579,0.8352705410821644,0.8356713426853707,0.8360721442885771,0.8364729458917836,0.83687374749499,0.8372745490981964,0.8376753507014028,0.8380761523046092,0.8384769539078156,0.8388777555110221,0.8392785571142285,0.8396793587174348,0.8400801603206413,0.8404809619238477,0.8408817635270541,0.8412825651302606,0.8416833667334669,0.8420841683366733,0.8424849699398798,0.8428857715430862,0.8432865731462926,0.843687374749499,0.8440881763527054,0.8444889779559118,0.8448897795591183,0.8452905811623247,0.845691382765531,0.8460921843687375,0.8464929859719439,0.8468937875751503,0.8472945891783568,0.8476953907815631,0.8480961923847695,0.848496993987976,0.8488977955911824,0.8492985971943888,0.8496993987975952,0.8501002004008016,0.850501002004008,0.8509018036072145,0.8513026052104209,0.8517034068136272,0.8521042084168337,0.8525050100200401,0.8529058116232465,0.853306613226453,0.8537074148296593,0.8541082164328657,0.8545090180360722,0.8549098196392786,0.855310621242485,0.8557114228456913,0.8561122244488978,0.8565130260521042,0.8569138276553107,0.857314629258517,0.8577154308617234,0.8581162324649299,0.8585170340681363,0.8589178356713427,0.859318637274549,0.8597194388777555,0.8601202404809619,0.8605210420841684,0.8609218436873748,0.8613226452905811,0.8617234468937875,0.862124248496994,0.8625250501002004,0.8629258517034069,0.8633266533066132,0.8637274549098196,0.864128256513026,0.8645290581162325,0.8649298597194389,0.8653306613226452,0.8657314629258517,0.8661322645290581,0.8665330661322646,0.866933867735471,0.8673346693386773,0.8677354709418837,0.8681362725450902,0.8685370741482966,0.868937875751503,0.8693386773547094,0.8697394789579158,0.8701402805611222,0.8705410821643287,0.8709418837675351,0.8713426853707414,0.8717434869739479,0.8721442885771543,0.8725450901803607,0.8729458917835672,0.8733466933867735,0.87374749498998,0.8741482965931864,0.8745490981963928,0.8749498997995993,0.8753507014028056,0.875751503006012,0.8761523046092184,0.8765531062124249,0.8769539078156313,0.8773547094188376,0.8777555110220441,0.8781563126252505,0.878557114228457,0.8789579158316633,0.8793587174348697,0.8797595190380761,0.8801603206412826,0.880561122244489,0.8809619238476953,0.8813627254509018,0.8817635270541082,0.8821643286573146,0.8825651302605211,0.8829659318637274,0.8833667334669338,0.8837675350701403,0.8841683366733467,0.8845691382765531,0.8849699398797595,0.8853707414829659,0.8857715430861723,0.8861723446893788,0.8865731462925852,0.8869739478957915,0.887374749498998,0.8877755511022044,0.8881763527054108,0.8885771543086173,0.8889779559118236,0.88937875751503,0.8897795591182365,0.8901803607214429,0.8905811623246493,0.8909819639278557,0.8913827655310621,0.8917835671342685,0.892184368737475,0.8925851703406814,0.8929859719438877,0.8933867735470942,0.8937875751503006,0.894188376753507,0.8945891783567135,0.8949899799599198,0.8953907815631262,0.8957915831663327,0.8961923847695391,0.8965931863727455,0.8969939879759519,0.8973947895791583,0.8977955911823647,0.8981963927855712,0.8985971943887776,0.8989979959919839,0.8993987975951904,0.8997995991983968,0.9002004008016032,0.9006012024048096,0.901002004008016,0.9014028056112224,0.9018036072144289,0.9022044088176353,0.9026052104208416,0.9030060120240481,0.9034068136272545,0.9038076152304609,0.9042084168336674,0.9046092184368737,0.9050100200400801,0.9054108216432866,0.905811623246493,0.9062124248496994,0.9066132264529058,0.9070140280561122,0.9074148296593186,0.9078156312625251,0.9082164328657315,0.9086172344689378,0.9090180360721443,0.9094188376753507,0.9098196392785571,0.9102204408817636,0.9106212424849699,0.9110220440881763,0.9114228456913828,0.9118236472945892,0.9122244488977956,0.912625250501002,0.9130260521042084,0.9134268537074148,0.9138276553106213,0.9142284569138277,0.914629258517034,0.9150300601202405,0.9154308617234469,0.9158316633266533,0.9162324649298598,0.9166332665330661,0.9170340681362725,0.917434869739479,0.9178356713426854,0.9182364729458918,0.9186372745490982,0.9190380761523046,0.919438877755511,0.9198396793587175,0.9202404809619239,0.9206412825651302,0.9210420841683367,0.9214428857715431,0.9218436873747495,0.9222444889779559,0.9226452905811623,0.9230460921843687,0.9234468937875752,0.9238476953907816,0.9242484969939879,0.9246492985971944,0.9250501002004008,0.9254509018036072,0.9258517034068137,0.92625250501002,0.9266533066132264,0.9270541082164329,0.9274549098196393,0.9278557114228457,0.928256513026052,0.9286573146292585,0.9290581162324649,0.9294589178356714,0.9298597194388778,0.9302605210420841,0.9306613226452906,0.931062124248497,0.9314629258517034,0.9318637274549099,0.9322645290581162,0.9326653306613226,0.9330661322645291,0.9334669338677355,0.9338677354709419,0.9342685370741483,0.9346693386773547,0.9350701402805611,0.9354709418837676,0.935871743486974,0.9362725450901803,0.9366733466933868,0.9370741482965932,0.9374749498997996,0.9378757515030061,0.9382765531062124,0.9386773547094188,0.9390781563126253,0.9394789579158317,0.9398797595190381,0.9402805611222445,0.9406813627254509,0.9410821643286573,0.9414829659318638,0.9418837675350702,0.9422845691382765,0.942685370741483,0.9430861723446894,0.9434869739478958,0.9438877755511023,0.9442885771543086,0.944689378757515,0.9450901803607215,0.9454909819639279,0.9458917835671342,0.9462925851703406,0.9466933867735471,0.9470941883767535,0.94749498997996,0.9478957915831663,0.9482965931863727,0.9486973947895792,0.9490981963927856,0.949498997995992,0.9498997995991983,0.9503006012024048,0.9507014028056112,0.9511022044088177,0.9515030060120241,0.9519038076152304,0.9523046092184368,0.9527054108216433,0.9531062124248497,0.9535070140280562,0.9539078156312625,0.9543086172344689,0.9547094188376753,0.9551102204408818,0.9555110220440882,0.9559118236472945,0.956312625250501,0.9567134268537074,0.9571142284569139,0.9575150300601203,0.9579158316633266,0.958316633266533,0.9587174348697395,0.9591182364729459,0.9595190380761524,0.9599198396793587,0.9603206412825651,0.9607214428857715,0.961122244488978,0.9615230460921844,0.9619238476953907,0.9623246492985972,0.9627254509018036,0.96312625250501,0.9635270541082165,0.9639278557114228,0.9643286573146292,0.9647294589178357,0.9651302605210421,0.9655310621242486,0.9659318637274549,0.9663326653306613,0.9667334669338677,0.9671342685370742,0.9675350701402805,0.9679358717434869,0.9683366733466934,0.9687374749498998,0.9691382765531062,0.9695390781563126,0.969939879759519,0.9703406813627254,0.9707414829659319,0.9711422845691383,0.9715430861723446,0.9719438877755511,0.9723446893787575,0.972745490981964,0.9731462925851704,0.9735470941883767,0.9739478957915831,0.9743486973947896,0.974749498997996,0.9751503006012024,0.9755511022044088,0.9759519038076152,0.9763527054108216,0.9767535070140281,0.9771543086172345,0.9775551102204408,0.9779559118236473,0.9783567134268537,0.9787575150300601,0.9791583166332666,0.9795591182364729,0.9799599198396793,0.9803607214428858,0.9807615230460922,0.9811623246492986,0.981563126252505,0.9819639278557114,0.9823647294589178,0.9827655310621243,0.9831663326653307,0.983567134268537,0.9839679358717435,0.9843687374749499,0.9847695390781563,0.9851703406813628,0.9855711422845691,0.9859719438877755,0.986372745490982,0.9867735470941884,0.9871743486973948,0.9875751503006012,0.9879759519038076,0.988376753507014,0.9887775551102205,0.9891783567134268,0.9895791583166332,0.9899799599198397,0.9903807615230461,0.9907815631262525,0.9911823647294589,0.9915831663326653,0.9919839679358717,0.9923847695390782,0.9927855711422846,0.9931863727454909,0.9935871743486974,0.9939879759519038,0.9943887775551102,0.9947895791583167,0.995190380761523,0.9955911823647294,0.9959919839679359,0.9963927855711423,0.9967935871743487,0.9971943887775551,0.9975951903807615,0.9979959919839679,0.9983967935871744,0.9987975951903808,0.9991983967935871,0.9995991983967936,1.0]}
},{}],26:[function(require,module,exports){
module.exports={"expected":[-0.7421009647076605,-0.7401882991566319,-0.7382658354669251,-0.7363335631770103,-0.7343914721763778,-0.7324395527079511,-0.7304777953704827,-0.7285061911209323,-0.7265247312768276,-0.7245334075186076,-0.7225322118919474,-0.7205211368100645,-0.7185001750560057,-0.7164693197849165,-0.7144285645262883,-0.7123779031861887,-0.7103173300494687,-0.7082468397819519,-0.7061664274326016,-0.7040760884356667,-0.7019758186128062,-0.6998656141751928,-0.6977454717255929,-0.6956153882604252,-0.6934753611717965,-0.6913253882495136,-0.6891654676830729,-0.6869955980636253,-0.684815778385918,-0.6826260080502112,-0.6804262868641708,-0.6782166150447356,-0.6759969932199594,-0.6737674224308278,-0.6715279041330491,-0.6692784401988184,-0.6670190329185566,-0.6647496850026209,-0.6624703995829897,-0.6601811802149197,-0.6578820308785746,-0.6555729559806271,-0.6532539603558325,-0.6509250492685723,-0.6485862284143712,-0.6462375039213837,-0.6438788823518515,-0.6415103707035318,-0.6391319764110952,-0.6367437073474936,-0.634345571825298,-0.6319375785980053,-0.6295197368613137,-0.6270920562543683,-0.6246545468609737,-0.6222072192107758,-0.6197500842804116,-0.6172831534946258,-0.6148064387273573,-0.6123199523027893,-0.6098237069963705,-0.6073177160358003,-0.6048019931019818,-0.6022765523299407,-0.599741408309711,-0.5971965760871858,-0.5946420711649345,-0.5920779095029847,-0.5895041075195702,-0.5869206820918441,-0.5843276505565558,-0.581725030710693,-0.5791128408120899,-0.5764910995799962,-0.5738598261956137,-0.5712190403025945,-0.5685687620075038,-0.5659090118802467,-0.5632398109544566,-0.560561180727849,-0.5578731431625369,-0.5551757206853092,-0.5524689361878721,-0.5497528130270533,-0.5470273750249676,-0.5442926464691462,-0.5415486521126266,-0.5387954171740048,-0.5360329673374511,-0.5332613287526844,-0.530480528034911,-0.5276905922647229,-0.524891548987959,-0.5220834262155258,-0.5192662524231807,-0.5164400565512752,-0.5136048680044601,-0.5107607166513503,-0.5079076328241511,-0.5050456473182454,-0.5021747913917403,-0.499295096764975,-0.49640659561998957,-0.49350932059995267,-0.49060330480855047,-0.48768858180933605,-0.4847651856250381,-0.48183315073683014,-0.4788925120835601,-0.4759433050609394,-0.4729855655206924,-0.4700193297696653,-0.467044634568896,-0.46406151713264265,-0.461070015127373,-0.4580701666707129,-0.45506201033035565,-0.4520455851229303,-0.4490209305128305,-0.44598808641100257,-0.4429470931736943,-0.43989799160116316,-0.4368408229363446,-0.43377562886348003,-0.4307024515067059,-0.42762133342860115,-0.42453231762869653,-0.42143544754194245,-0.4183307670371387,-0.41521832041532286,-0.41209815240812037,-0.40897030817605384,-0.40583483330681414,-0.4026917738134907,-0.3995411761327637,-0.39638308712305564,-0.39321755406264564,-0.3900446246477426,-0.3868643469905208,-0.38367676961711633,-0.3804819414655844,-0.37727991188381876,-0.3740707306274316,-0.37085444785759664,-0.3676311141388521,-0.3644007804368674,-0.3611634981161706,-0.35791931893783885,-0.35466829505715103,-0.3514104790212026,-0.3481459237664835,-0.3448746826164192,-0.34159680927887404,-0.33831235784361835,-0.3350213827797589,-0.33172393893313296,-0.3284200815236662,-0.3251098661426944,-0.3217933487502494,-0.31847058567230996,-0.3151416335980166,-0.3118065495768517,-0.3084653910157845,-0.3051182156763814,-0.3017650816718822,-0.29840604746424154,-0.29504117186113643,-0.291670514012941,-0.2882941334096661,-0.2849120898778675,-0.28152444357751943,-0.278131254998857,-0.27473258495918507,-0.2713284945996553,-0.26791904538201167,-0.26450429908530404,-0.26108431780257046,-0.25765916393748867,-0.2542289002009967,-0.2507935896078833,-0.24735329547334778,-0.24390808140953096,-0.24045801132201552,-0.23700314940629824,-0.23354356014423253,-0.2300793083004432,-0.2266104589187125,-0.22313707731833865,-0.21965922909046656,-0.21617698009439176,-0.2126903964538371,-0.20919954455320347,-0.2057044910337937,-0.20220530279001156,-0.19870204696553448,-0.195194790949462,-0.19168360237243887,-0.18816854910275455,-0.18464969924241798,-0.1811271211232096,-0.17760088330270954,-0.17407105456030345,-0.17053770389316564,-0.16700090051222044,-0.16346071383808194,-0.15991721349697213,-0.15637046931661874,-0.15282055132213232,-0.1492675297318634,-0.14571147495324005,-0.1421524575785863,-0.1385905483809215,-0.1350258183097418,-0.1314583384867833,-0.12788818020176762,-0.12431541490813079,-0.120740114218735,-0.11716234990156439,-0.11358219387540493,-0.10999971820550881,-0.10641499509924421,-0.10282809690173011,-0.0992390960914574,-0.09564806527589613,-0.09205507718708975,-0.0884602046772364,-0.08486352071425819,-0.08126509837735829,-0.07766501085256697,-0.07406333142827638,-0.07046013349076519,-0.0668554905197128,-0.06324947608370438,-0.059642163835726424,-0.05603362750865397,-0.052423940910729355,-0.04881317792103344,-0.045201412484949445,-0.04158871860961998,-0.03797517035939785,-0.034360841851290805,-0.030745807250401068,-0.02713014076535976,-0.02351391664375696,-0.019897209167567726,-0.016280092648574575,-0.012662641423786905,-0.009044929850857832,-0.005427032303498896,-0.0018090231668931181,0.0018090231668931181,0.005427032303498896,0.009044929850857832,0.012662641423786905,0.016280092648574575,0.019897209167567726,0.02351391664375696,0.02713014076535976,0.030745807250401068,0.034360841851290805,0.03797517035939785,0.04158871860961998,0.045201412484949445,0.04881317792103344,0.052423940910729355,0.05603362750865397,0.059642163835726424,0.06324947608370438,0.0668554905197128,0.07046013349076519,0.07406333142827638,0.07766501085256697,0.08126509837735829,0.08486352071425819,0.0884602046772364,0.09205507718708975,0.09564806527589613,0.0992390960914574,0.10282809690173011,0.10641499509924421,0.10999971820550881,0.11358219387540493,0.11716234990156439,0.120740114218735,0.12431541490813079,0.12788818020176762,0.1314583384867833,0.1350258183097418,0.1385905483809215,0.1421524575785863,0.14571147495324005,0.1492675297318634,0.15282055132213232,0.15637046931661874,0.15991721349697213,0.16346071383808194,0.16700090051222044,0.17053770389316564,0.17407105456030345,0.17760088330270954,0.1811271211232096,0.18464969924241798,0.18816854910275455,0.19168360237243887,0.195194790949462,0.19870204696553448,0.20220530279001156,0.2057044910337937,0.20919954455320347,0.2126903964538371,0.21617698009439176,0.21965922909046656,0.22313707731833865,0.2266104589187125,0.2300793083004432,0.23354356014423253,0.23700314940629824,0.24045801132201552,0.24390808140953096,0.24735329547334778,0.2507935896078833,0.2542289002009967,0.25765916393748867,0.26108431780257046,0.26450429908530404,0.26791904538201167,0.2713284945996553,0.27473258495918507,0.278131254998857,0.28152444357751943,0.2849120898778675,0.2882941334096661,0.291670514012941,0.29504117186113643,0.29840604746424154,0.3017650816718822,0.3051182156763814,0.3084653910157845,0.3118065495768517,0.3151416335980166,0.31847058567230996,0.3217933487502494,0.3251098661426944,0.3284200815236662,0.33172393893313296,0.3350213827797589,0.33831235784361835,0.34159680927887404,0.3448746826164192,0.3481459237664835,0.3514104790212026,0.35466829505715103,0.35791931893783885,0.3611634981161706,0.3644007804368674,0.3676311141388521,0.37085444785759664,0.3740707306274316,0.37727991188381876,0.3804819414655844,0.38367676961711633,0.3868643469905208,0.3900446246477426,0.39321755406264564,0.39638308712305564,0.3995411761327637,0.4026917738134907,0.40583483330681414,0.40897030817605384,0.41209815240812037,0.41521832041532286,0.4183307670371387,0.42143544754194245,0.42453231762869653,0.42762133342860115,0.4307024515067059,0.43377562886348003,0.4368408229363446,0.43989799160116316,0.4429470931736943,0.44598808641100257,0.4490209305128305,0.4520455851229303,0.45506201033035565,0.4580701666707129,0.461070015127373,0.46406151713264265,0.467044634568896,0.4700193297696653,0.4729855655206924,0.4759433050609394,0.4788925120835601,0.48183315073683014,0.4847651856250381,0.48768858180933605,0.49060330480855047,0.49350932059995267,0.49640659561998957,0.499295096764975,0.5021747913917403,0.5050456473182454,0.5079076328241511,0.5107607166513503,0.5136048680044601,0.5164400565512752,0.5192662524231807,0.5220834262155258,0.524891548987959,0.5276905922647229,0.530480528034911,0.5332613287526844,0.5360329673374511,0.5387954171740048,0.5415486521126266,0.5442926464691462,0.5470273750249676,0.5497528130270533,0.5524689361878721,0.5551757206853092,0.5578731431625369,0.560561180727849,0.5632398109544566,0.5659090118802467,0.5685687620075038,0.5712190403025945,0.5738598261956137,0.5764910995799962,0.5791128408120899,0.581725030710693,0.5843276505565558,0.5869206820918441,0.5895041075195702,0.5920779095029847,0.5946420711649345,0.5971965760871858,0.599741408309711,0.6022765523299407,0.6048019931019818,0.6073177160358003,0.6098237069963705,0.6123199523027893,0.6148064387273573,0.6172831534946258,0.6197500842804116,0.6222072192107758,0.6246545468609737,0.6270920562543683,0.6295197368613137,0.6319375785980053,0.634345571825298,0.6367437073474936,0.6391319764110952,0.6415103707035318,0.6438788823518515,0.6462375039213837,0.6485862284143712,0.6509250492685723,0.6532539603558325,0.6555729559806271,0.6578820308785746,0.6601811802149197,0.6624703995829897,0.6647496850026209,0.6670190329185566,0.6692784401988184,0.6715279041330491,0.6737674224308278,0.6759969932199594,0.6782166150447356,0.6804262868641708,0.6826260080502112,0.684815778385918,0.6869955980636253,0.6891654676830729,0.6913253882495136,0.6934753611717965,0.6956153882604252,0.6977454717255929,0.6998656141751928,0.7019758186128062,0.7040760884356667,0.7061664274326016,0.7082468397819519,0.7103173300494687,0.7123779031861887,0.7144285645262883,0.7164693197849165,0.7185001750560057,0.7205211368100645,0.7225322118919474,0.7245334075186076,0.7265247312768276,0.7285061911209323,0.7304777953704827,0.7324395527079511,0.7343914721763778,0.7363335631770103,0.7382658354669251,0.7401882991566319,0.7421009647076605],"x":[-0.8,-0.7967935871743487,-0.7935871743486974,-0.790380761523046,-0.7871743486973948,-0.7839679358717435,-0.7807615230460921,-0.7775551102204409,-0.7743486973947896,-0.7711422845691382,-0.767935871743487,-0.7647294589178357,-0.7615230460921844,-0.7583166332665331,-0.7551102204408817,-0.7519038076152305,-0.7486973947895792,-0.7454909819639278,-0.7422845691382766,-0.7390781563126253,-0.7358717434869739,-0.7326653306613227,-0.7294589178356713,-0.72625250501002,-0.7230460921843688,-0.7198396793587174,-0.7166332665330661,-0.7134268537074149,-0.7102204408817635,-0.7070140280561122,-0.7038076152304609,-0.7006012024048096,-0.6973947895791583,-0.694188376753507,-0.6909819639278557,-0.6877755511022045,-0.6845691382765531,-0.6813627254509018,-0.6781563126252504,-0.6749498997995992,-0.6717434869739479,-0.6685370741482966,-0.6653306613226453,-0.662124248496994,-0.6589178356713427,-0.6557114228456914,-0.6525050100200401,-0.6492985971943888,-0.6460921843687375,-0.6428857715430861,-0.6396793587174349,-0.6364729458917836,-0.6332665330661322,-0.630060120240481,-0.6268537074148297,-0.6236472945891783,-0.6204408817635271,-0.6172344689378757,-0.6140280561122244,-0.6108216432865732,-0.6076152304609218,-0.6044088176352705,-0.6012024048096193,-0.5979959919839679,-0.5947895791583167,-0.5915831663326653,-0.588376753507014,-0.5851703406813628,-0.5819639278557114,-0.5787575150300601,-0.5755511022044089,-0.5723446893787575,-0.5691382765531062,-0.565931863727455,-0.5627254509018036,-0.5595190380761523,-0.556312625250501,-0.5531062124248497,-0.5498997995991984,-0.5466933867735471,-0.5434869739478958,-0.5402805611222445,-0.5370741482965932,-0.5338677354709419,-0.5306613226452905,-0.5274549098196393,-0.524248496993988,-0.5210420841683366,-0.5178356713426854,-0.5146292585170341,-0.5114228456913827,-0.5082164328657315,-0.5050100200400801,-0.5018036072144288,-0.49859719438877753,-0.49539078156312627,-0.49218436873747495,-0.48897795591182364,-0.4857715430861723,-0.48256513026052106,-0.47935871743486974,-0.4761523046092184,-0.4729458917835671,-0.46973947895791585,-0.46653306613226453,-0.4633266533066132,-0.46012024048096195,-0.45691382765531063,-0.4537074148296593,-0.450501002004008,-0.44729458917835674,-0.4440881763527054,-0.4408817635270541,-0.4376753507014028,-0.4344689378757515,-0.4312625250501002,-0.4280561122244489,-0.4248496993987976,-0.4216432865731463,-0.418436873747495,-0.4152304609218437,-0.41202404809619236,-0.4088176352705411,-0.4056112224448898,-0.40240480961923847,-0.39919839679358715,-0.3959919839679359,-0.3927855711422846,-0.38957915831663326,-0.38637274549098194,-0.3831663326653307,-0.37995991983967936,-0.37675350701402804,-0.3735470941883767,-0.37034068136272547,-0.36713426853707415,-0.36392785571142283,-0.36072144288577157,-0.35751503006012025,-0.35430861723446894,-0.3511022044088176,-0.34789579158316636,-0.34468937875751504,-0.3414829659318637,-0.3382765531062124,-0.33507014028056115,-0.33186372745490983,-0.3286573146292585,-0.3254509018036072,-0.32224448897795593,-0.3190380761523046,-0.3158316633266533,-0.312625250501002,-0.3094188376753507,-0.3062124248496994,-0.3030060120240481,-0.29979959919839677,-0.2965931863727455,-0.2933867735470942,-0.2901803607214429,-0.28697394789579156,-0.2837675350701403,-0.280561122244489,-0.27735470941883766,-0.27414829659318635,-0.2709418837675351,-0.26773547094188377,-0.26452905811623245,-0.26132264529058113,-0.2581162324649299,-0.25490981963927856,-0.25170340681362724,-0.24849699398797595,-0.24529058116232466,-0.24208416833667334,-0.23887775551102206,-0.23567134268537074,-0.23246492985971945,-0.22925851703406813,-0.22605210420841684,-0.22284569138276553,-0.21963927855711424,-0.21643286573146292,-0.21322645290581163,-0.21002004008016031,-0.20681362725450902,-0.2036072144288577,-0.20040080160320642,-0.1971943887775551,-0.1939879759519038,-0.1907815631262525,-0.1875751503006012,-0.1843687374749499,-0.1811623246492986,-0.17795591182364728,-0.174749498997996,-0.17154308617234468,-0.1683366733466934,-0.16513026052104207,-0.16192384769539078,-0.15871743486973947,-0.15551102204408818,-0.1523046092184369,-0.14909819639278557,-0.14589178356713428,-0.14268537074148296,-0.13947895791583168,-0.13627254509018036,-0.13306613226452907,-0.12985971943887775,-0.12665330661322646,-0.12344689378757515,-0.12024048096192384,-0.11703406813627254,-0.11382765531062124,-0.11062124248496993,-0.10741482965931863,-0.10420841683366733,-0.10100200400801604,-0.09779559118236474,-0.09458917835671343,-0.09138276553106213,-0.08817635270541083,-0.08496993987975952,-0.08176352705410822,-0.07855711422845692,-0.07535070140280561,-0.07214428857715431,-0.06893787575150301,-0.0657314629258517,-0.0625250501002004,-0.0593186372745491,-0.056112224448897796,-0.05290581162324649,-0.04969939879759519,-0.04649298597194389,-0.043286573146292584,-0.04008016032064128,-0.03687374749498998,-0.033667334669338675,-0.030460921843687375,-0.027254509018036072,-0.02404809619238477,-0.020841683366733466,-0.017635270541082163,-0.014428857715430862,-0.011222444889779559,-0.008016032064128256,-0.004809619238476954,-0.0016032064128256513,0.0016032064128256513,0.004809619238476954,0.008016032064128256,0.011222444889779559,0.014428857715430862,0.017635270541082163,0.020841683366733466,0.02404809619238477,0.027254509018036072,0.030460921843687375,0.033667334669338675,0.03687374749498998,0.04008016032064128,0.043286573146292584,0.04649298597194389,0.04969939879759519,0.05290581162324649,0.056112224448897796,0.0593186372745491,0.0625250501002004,0.0657314629258517,0.06893787575150301,0.07214428857715431,0.07535070140280561,0.07855711422845692,0.08176352705410822,0.08496993987975952,0.08817635270541083,0.09138276553106213,0.09458917835671343,0.09779559118236474,0.10100200400801604,0.10420841683366733,0.10741482965931863,0.11062124248496993,0.11382765531062124,0.11703406813627254,0.12024048096192384,0.12344689378757515,0.12665330661322646,0.12985971943887775,0.13306613226452907,0.13627254509018036,0.13947895791583168,0.14268537074148296,0.14589178356713428,0.14909819639278557,0.1523046092184369,0.15551102204408818,0.15871743486973947,0.16192384769539078,0.16513026052104207,0.1683366733466934,0.17154308617234468,0.174749498997996,0.17795591182364728,0.1811623246492986,0.1843687374749499,0.1875751503006012,0.1907815631262525,0.1939879759519038,0.1971943887775551,0.20040080160320642,0.2036072144288577,0.20681362725450902,0.21002004008016031,0.21322645290581163,0.21643286573146292,0.21963927855711424,0.22284569138276553,0.22605210420841684,0.22925851703406813,0.23246492985971945,0.23567134268537074,0.23887775551102206,0.24208416833667334,0.24529058116232466,0.24849699398797595,0.25170340681362724,0.25490981963927856,0.2581162324649299,0.26132264529058113,0.26452905811623245,0.26773547094188377,0.2709418837675351,0.27414829659318635,0.27735470941883766,0.280561122244489,0.2837675350701403,0.28697394789579156,0.2901803607214429,0.2933867735470942,0.2965931863727455,0.29979959919839677,0.3030060120240481,0.3062124248496994,0.3094188376753507,0.312625250501002,0.3158316633266533,0.3190380761523046,0.32224448897795593,0.3254509018036072,0.3286573146292585,0.33186372745490983,0.33507014028056115,0.3382765531062124,0.3414829659318637,0.34468937875751504,0.34789579158316636,0.3511022044088176,0.35430861723446894,0.35751503006012025,0.36072144288577157,0.36392785571142283,0.36713426853707415,0.37034068136272547,0.3735470941883767,0.37675350701402804,0.37995991983967936,0.3831663326653307,0.38637274549098194,0.38957915831663326,0.3927855711422846,0.3959919839679359,0.39919839679358715,0.40240480961923847,0.4056112224448898,0.4088176352705411,0.41202404809619236,0.4152304609218437,0.418436873747495,0.4216432865731463,0.4248496993987976,0.4280561122244489,0.4312625250501002,0.4344689378757515,0.4376753507014028,0.4408817635270541,0.4440881763527054,0.44729458917835674,0.450501002004008,0.4537074148296593,0.45691382765531063,0.46012024048096195,0.4633266533066132,0.46653306613226453,0.46973947895791585,0.4729458917835671,0.4761523046092184,0.47935871743486974,0.48256513026052106,0.4857715430861723,0.48897795591182364,0.49218436873747495,0.49539078156312627,0.49859719438877753,0.5018036072144288,0.5050100200400801,0.5082164328657315,0.5114228456913827,0.5146292585170341,0.5178356713426854,0.5210420841683366,0.524248496993988,0.5274549098196393,0.5306613226452905,0.5338677354709419,0.5370741482965932,0.5402805611222445,0.5434869739478958,0.5466933867735471,0.5498997995991984,0.5531062124248497,0.556312625250501,0.5595190380761523,0.5627254509018036,0.565931863727455,0.5691382765531062,0.5723446893787575,0.5755511022044089,0.5787575150300601,0.5819639278557114,0.5851703406813628,0.588376753507014,0.5915831663326653,0.5947895791583167,0.5979959919839679,0.6012024048096193,0.6044088176352705,0.6076152304609218,0.6108216432865732,0.6140280561122244,0.6172344689378757,0.6204408817635271,0.6236472945891783,0.6268537074148297,0.630060120240481,0.6332665330661322,0.6364729458917836,0.6396793587174349,0.6428857715430861,0.6460921843687375,0.6492985971943888,0.6525050100200401,0.6557114228456914,0.6589178356713427,0.662124248496994,0.6653306613226453,0.6685370741482966,0.6717434869739479,0.6749498997995992,0.6781563126252504,0.6813627254509018,0.6845691382765531,0.6877755511022045,0.6909819639278557,0.694188376753507,0.6973947895791583,0.7006012024048096,0.7038076152304609,0.7070140280561122,0.7102204408817635,0.7134268537074149,0.7166332665330661,0.7198396793587174,0.7230460921843688,0.72625250501002,0.7294589178356713,0.7326653306613227,0.7358717434869739,0.7390781563126253,0.7422845691382766,0.7454909819639278,0.7486973947895792,0.7519038076152305,0.7551102204408817,0.7583166332665331,0.7615230460921844,0.7647294589178357,0.767935871743487,0.7711422845691382,0.7743486973947896,0.7775551102204409,0.7807615230460921,0.7839679358717435,0.7871743486973948,0.790380761523046,0.7935871743486974,0.7967935871743487,0.8]}
},{}],27:[function(require,module,exports){
module.exports={"expected":[1.12837916709551e-309,1.126117886199533e-309,1.12385660530355e-309,1.12159532440757e-309,1.119334043511585e-309,1.1170727626156e-309,1.114811481719616e-309,1.11255020082363e-309,1.11028891992765e-309,1.10802763903167e-309,1.105766358135684e-309,1.1035050772397e-309,1.101243796343715e-309,1.098982515447736e-309,1.096721234551756e-309,1.09445995365577e-309,1.09219867275979e-309,1.089937391863803e-309,1.087676110967824e-309,1.08541483007184e-309,1.083153549175855e-309,1.08089226827987e-309,1.078630987383887e-309,1.076369706487907e-309,1.074108425591923e-309,1.07184714469594e-309,1.069585863799954e-309,1.06732458290397e-309,1.065063302007996e-309,1.06280202111201e-309,1.060540740216027e-309,1.058279459320043e-309,1.05601817842406e-309,1.053756897528074e-309,1.051495616632095e-309,1.04923433573611e-309,1.046973054840126e-309,1.04471177394414e-309,1.042450493048157e-309,1.04018921215218e-309,1.037927931256194e-309,1.035666650360214e-309,1.03340536946423e-309,1.031144088568246e-309,1.028882807672266e-309,1.02662152677628e-309,1.0243602458803e-309,1.022098964984313e-309,1.01983768408833e-309,1.01757640319235e-309,1.015315122296365e-309,1.01305384140038e-309,1.010792560504397e-309,1.00853127960841e-309,1.006269998712433e-309,1.004008717816454e-309,1.00174743692047e-309,9.99486156024485e-310,9.972248751285e-310,9.9496359423252e-310,9.92702313336537e-310,9.90441032440553e-310,9.8817975154457e-310,9.85918470648584e-310,9.83657189752605e-310,9.8139590885662e-310,9.79134627960636e-310,9.7687334706465e-310,9.74612066168667e-310,9.72350785272693e-310,9.7008950437671e-310,9.67828223480724e-310,9.6556694258474e-310,9.63305661688756e-310,9.61044380792776e-310,9.5878309989679e-310,9.5652181900081e-310,9.54260538104823e-310,9.5199925720884e-310,9.4973797631286e-310,9.47476695416875e-310,9.4521541452089e-310,9.42954133624907e-310,9.4069285272892e-310,9.3843157183294e-310,9.36170290936964e-310,9.3390901004098e-310,9.31647729144995e-310,9.2938644824901e-310,9.27125167353026e-310,9.24863886457047e-310,9.22602605561063e-310,9.2034132466508e-310,9.18080043769094e-310,9.1581876287311e-310,9.1355748197713e-310,9.11296201081146e-310,9.0903492018516e-310,9.06773639289177e-310,9.04512358393193e-310,9.0225107749722e-310,8.99989796601234e-310,8.9772851570525e-310,8.95467234809266e-310,8.9320595391328e-310,8.909446730173e-310,8.8868339212132e-310,8.86422111225333e-310,8.8416083032935e-310,8.81899549433365e-310,8.79638268537385e-310,8.773769876414e-310,8.75115706745417e-310,8.7285442584943e-310,8.70593144953453e-310,8.68331864057474e-310,8.6607058316149e-310,8.63809302265505e-310,8.6154802136952e-310,8.59286740473536e-310,8.57025459577557e-310,8.54764178681573e-310,8.5250289778559e-310,8.50241616889604e-310,8.4798033599362e-310,8.4571905509764e-310,8.43457774201656e-310,8.41196493305677e-310,8.3893521240969e-310,8.3667393151371e-310,8.3441265061773e-310,8.32151369721744e-310,8.2989008882576e-310,8.27628807929776e-310,8.2536752703379e-310,8.2310624613781e-310,8.2084496524183e-310,8.18583684345843e-310,8.1632240344986e-310,8.14061122553875e-310,8.11799841657895e-310,8.09538560761916e-310,8.0727727986593e-310,8.05015998969947e-310,8.02754718073963e-310,8.0049343717798e-310,7.98232156282e-310,7.95970875386015e-310,7.9370959449003e-310,7.91448313594046e-310,7.8918703269806e-310,7.86925751802083e-310,7.846644709061e-310,7.82403190010114e-310,7.80141909114135e-310,7.7788062821815e-310,7.7561934732217e-310,7.73358066426187e-310,7.710967855302e-310,7.6883550463422e-310,7.66574223738234e-310,7.64312942842254e-310,7.6205166194627e-310,7.59790381050286e-310,7.575291001543e-310,7.55267819258317e-310,7.5300653836234e-310,7.50745257466353e-310,7.48483976570374e-310,7.4622269567439e-310,7.43961414778405e-310,7.41700133882426e-310,7.3943885298644e-310,7.37177572090457e-310,7.34916291194473e-310,7.3265501029849e-310,7.3039372940251e-310,7.28132448506525e-310,7.2587116761054e-310,7.23609886714556e-310,7.2134860581857e-310,7.190873249226e-310,7.16826044026613e-310,7.1456476313063e-310,7.12303482234645e-310,7.1004220133866e-310,7.0778092044268e-310,7.05519639546697e-310,7.0325835865071e-310,7.0099707775473e-310,6.98735796858744e-310,6.96474515962764e-310,6.9421323506678e-310,6.91951954170796e-310,6.8969067327481e-310,6.87429392378827e-310,6.85168111482843e-310,6.8290683058687e-310,6.80645549690884e-310,6.783842687949e-310,6.76122987898915e-310,6.7386170700293e-310,6.7160042610695e-310,6.69339145210967e-310,6.67077864314983e-310,6.64816583419e-310,6.62555302523015e-310,6.60294021627035e-310,6.5803274073105e-310,6.55771459835066e-310,6.5351017893908e-310,6.512488980431e-310,6.48987617147123e-310,6.4672633625114e-310,6.44465055355155e-310,6.4220377445917e-310,6.39942493563186e-310,6.37681212667207e-310,6.3541993177122e-310,6.3315865087524e-310,6.30897369979254e-310,6.2863608908327e-310,6.2637480818729e-310,6.24113527291306e-310,6.2185224639532e-310,6.19590965499337e-310,6.17329684603353e-310,6.1506840370738e-310,6.12807122811394e-310,6.1054584191541e-310,6.08284561019425e-310,6.0602328012344e-310,6.0376199922746e-310,6.01500718331477e-310,5.99239437435493e-310,5.9697815653951e-310,5.94716875643525e-310,5.92455594747545e-310,5.9019431385156e-310,5.87933032955577e-310,5.85671752059597e-310,5.83410471163613e-310,5.81149190267633e-310,5.7888790937165e-310,5.76626628475665e-310,5.7436534757968e-310,5.72104066683696e-310,5.69842785787717e-310,5.67581504891732e-310,5.6532022399575e-310,5.63058943099764e-310,5.6079766220378e-310,5.58536381307795e-310,5.56275100411816e-310,5.54013819515836e-310,5.5175253861985e-310,5.4949125772387e-310,5.47229976827884e-310,5.44968695931904e-310,5.4270741503592e-310,5.40446134139936e-310,5.3818485324395e-310,5.35923572347967e-310,5.33662291451987e-310,5.31401010556003e-310,5.2913972966002e-310,5.26878448764035e-310,5.24617167868055e-310,5.22355886972076e-310,5.2009460607609e-310,5.17833325180107e-310,5.15572044284123e-310,5.1331076338814e-310,5.1104948249216e-310,5.08788201596175e-310,5.0652692070019e-310,5.04265639804206e-310,5.0200435890822e-310,4.99743078012243e-310,4.9748179711626e-310,4.9522051622028e-310,4.92959235324295e-310,4.9069795442831e-310,4.8843667353233e-310,4.86175392636346e-310,4.8391411174036e-310,4.8165283084438e-310,4.79391549948394e-310,4.77130269052414e-310,4.7486898815643e-310,4.72607707260446e-310,4.7034642636446e-310,4.68085145468477e-310,4.65823864572498e-310,4.6356258367652e-310,4.61301302780534e-310,4.5904002188455e-310,4.56778740988565e-310,4.54517460092586e-310,4.522561791966e-310,4.49994898300617e-310,4.47733617404633e-310,4.4547233650865e-310,4.4321105561267e-310,4.40949774716685e-310,4.386884938207e-310,4.36427212924716e-310,4.3416593202873e-310,4.3190465113275e-310,4.29643370236773e-310,4.2738208934079e-310,4.25120808444805e-310,4.2285952754882e-310,4.20598246652836e-310,4.18336965756857e-310,4.1607568486087e-310,4.1381440396489e-310,4.11553123068904e-310,4.0929184217292e-310,4.0703056127694e-310,4.04769280380956e-310,4.0250799948497e-310,4.00246718588987e-310,3.97985437693003e-310,3.9572415679703e-310,3.93462875901044e-310,3.9120159500506e-310,3.88940314109075e-310,3.8667903321309e-310,3.8441775231711e-310,3.82156471421127e-310,3.79895190525143e-310,3.7763390962916e-310,3.75372628733174e-310,3.73111347837195e-310,3.7085006694121e-310,3.68588786045226e-310,3.6632750514924e-310,3.6406622425326e-310,3.61804943357283e-310,3.595436624613e-310,3.57282381565315e-310,3.5502110066933e-310,3.52759819773346e-310,3.50498538877367e-310,3.4823725798138e-310,3.459759770854e-310,3.43714696189414e-310,3.4145341529343e-310,3.3919213439745e-310,3.36930853501466e-310,3.3466957260548e-310,3.32408291709497e-310,3.3014701081352e-310,3.2788572991754e-310,3.25624449021554e-310,3.2336316812557e-310,3.21101887229585e-310,3.188406063336e-310,3.1657932543762e-310,3.14318044541637e-310,3.12056763645653e-310,3.0979548274967e-310,3.07534201853684e-310,3.052729209577e-310,3.0301164006172e-310,3.0075035916574e-310,2.98489078269757e-310,2.96227797373773e-310,2.9396651647779e-310,2.9170523558181e-310,2.89443954685825e-310,2.8718267378984e-310,2.84921392893856e-310,2.8266011199787e-310,2.8039883110189e-310,2.7813755020591e-310,2.75876269309924e-310,2.7361498841394e-310,2.71353707517955e-310,2.6909242662198e-310,2.66831145725996e-310,2.6456986483001e-310,2.6230858393403e-310,2.60047303038043e-310,2.57786022142064e-310,2.5552474124608e-310,2.53263460350095e-310,2.5100217945411e-310,2.48740898558127e-310,2.46479617662147e-310,2.44218336766163e-310,2.4195705587018e-310,2.396957749742e-310,2.37434494078215e-310,2.35173213182236e-310,2.3291193228625e-310,2.30650651390267e-310,2.28389370494283e-310,2.261280895983e-310,2.2386680870232e-310,2.21605527806335e-310,2.1934424691035e-310,2.17082966014366e-310,2.1482168511838e-310,2.125604042224e-310,2.1029912332642e-310,2.0803784243044e-310,2.05776561534454e-310,2.0351528063847e-310,2.0125399974249e-310,1.98992718846506e-310,1.9673143795052e-310,1.9447015705454e-310,1.92208876158553e-310,1.89947595262574e-310,1.8768631436659e-310,1.85425033470605e-310,1.8316375257462e-310,1.80902471678637e-310,1.7864119078265e-310,1.7637990988668e-310,1.74118628990694e-310,1.7185734809471e-310,1.69596067198725e-310,1.6733478630274e-310,1.6507350540676e-310,1.62812224510777e-310,1.60550943614793e-310,1.5828966271881e-310,1.56028381822824e-310,1.53767100926845e-310,1.5150582003086e-310,1.49244539134876e-310,1.4698325823889e-310,1.44721977342907e-310,1.42460696446933e-310,1.4019941555095e-310,1.37938134654964e-310,1.3567685375898e-310,1.33415572862996e-310,1.31154291967016e-310,1.2889301107103e-310,1.2663173017505e-310,1.24370449279063e-310,1.2210916838308e-310,1.198478874871e-310,1.17586606591115e-310,1.1532532569513e-310,1.13064044799147e-310,1.1080276390316e-310,1.0854148300719e-310,1.06280202111204e-310,1.0401892121522e-310,1.01757640319235e-310,9.949635942325e-311,9.723507852727e-311,9.4973797631287e-311,9.2712516735303e-311,9.045123583932e-311,8.8189954943334e-311,8.5928674047355e-311,8.366739315137e-311,8.1406112255386e-311,7.91448313594e-311,7.6883550463417e-311,7.4622269567443e-311,7.236098867146e-311,7.0099707775474e-311,6.783842687949e-311,6.5577145983506e-311,6.3315865087526e-311,6.105458419154e-311,5.879330329556e-311,5.6532022399573e-311,5.427074150359e-311,5.2009460607605e-311,4.9748179711625e-311,4.748689881564e-311,4.522561791966e-311,4.2964337023677e-311,4.0703056127693e-311,3.8441775231714e-311,3.618049433573e-311,3.3919213439745e-311,3.165793254376e-311,2.9396651647776e-311,2.7135370751797e-311,2.4874089855813e-311,2.261280895983e-311,2.0351528063844e-311,1.809024716786e-311,1.582896627188e-311,1.35676853759e-311,1.1306404479917e-311,9.04512358393e-312,6.78384268795e-312,4.52256179197e-312,2.261280895984e-312,0.0],"x":[1.0e-309,9.9799599198397e-310,9.95991983967936e-310,9.9398797595191e-310,9.91983967935875e-310,9.8997995991984e-310,9.8797595190381e-310,9.85971943887776e-310,9.83967935871747e-310,9.81963927855714e-310,9.7995991983968e-310,9.7795591182365e-310,9.75951903807615e-310,9.73947895791587e-310,9.71943887775554e-310,9.6993987975952e-310,9.6793587174349e-310,9.65931863727455e-310,9.63927855711427e-310,9.61923847695394e-310,9.5991983967936e-310,9.5791583166333e-310,9.55911823647295e-310,9.53907815631267e-310,9.51903807615234e-310,9.498997995992e-310,9.4789579158317e-310,9.45891783567135e-310,9.43887775551106e-310,9.41883767535073e-310,9.3987975951904e-310,9.37875751503007e-310,9.35871743486974e-310,9.3386773547094e-310,9.31863727454913e-310,9.2985971943888e-310,9.27855711422847e-310,9.25851703406814e-310,9.2384769539078e-310,9.21843687374753e-310,9.1983967935872e-310,9.17835671342687e-310,9.15831663326654e-310,9.1382765531062e-310,9.11823647294593e-310,9.0981963927856e-310,9.07815631262527e-310,9.05811623246494e-310,9.0380761523046e-310,9.0180360721443e-310,8.997995991984e-310,8.97795591182366e-310,8.95791583166333e-310,8.937875751503e-310,8.9178356713427e-310,8.8977955911824e-310,8.87775551102206e-310,8.85771543086173e-310,8.8376753507014e-310,8.8176352705411e-310,8.7975951903808e-310,8.77755511022046e-310,8.75751503006013e-310,8.7374749498998e-310,8.7174348697395e-310,8.6973947895792e-310,8.67735470941886e-310,8.65731462925853e-310,8.6372745490982e-310,8.6172344689379e-310,8.5971943887776e-310,8.57715430861725e-310,8.5571142284569e-310,8.5370741482966e-310,8.5170340681363e-310,8.496993987976e-310,8.47695390781565e-310,8.4569138276553e-310,8.436873747495e-310,8.4168336673347e-310,8.3967935871744e-310,8.37675350701405e-310,8.3567134268537e-310,8.3366733466934e-310,8.31663326653306e-310,8.2965931863728e-310,8.27655310621245e-310,8.2565130260521e-310,8.2364729458918e-310,8.21643286573145e-310,8.19639278557117e-310,8.17635270541084e-310,8.1563126252505e-310,8.1362725450902e-310,8.11623246492985e-310,8.09619238476957e-310,8.07615230460924e-310,8.0561122244489e-310,8.0360721442886e-310,8.01603206412825e-310,7.99599198396797e-310,7.97595190380764e-310,7.9559118236473e-310,7.935871743487e-310,7.91583166332665e-310,7.89579158316637e-310,7.87575150300604e-310,7.8557114228457e-310,7.83567134268538e-310,7.81563126252504e-310,7.79559118236476e-310,7.77555110220443e-310,7.7555110220441e-310,7.73547094188377e-310,7.71543086172344e-310,7.69539078156316e-310,7.67535070140283e-310,7.6553106212425e-310,7.63527054108217e-310,7.61523046092184e-310,7.59519038076156e-310,7.57515030060123e-310,7.5551102204409e-310,7.53507014028057e-310,7.51503006012024e-310,7.49498997995996e-310,7.47494989979963e-310,7.4549098196393e-310,7.43486973947897e-310,7.41482965931863e-310,7.39478957915835e-310,7.374749498998e-310,7.3547094188377e-310,7.33466933867736e-310,7.31462925851703e-310,7.29458917835675e-310,7.2745490981964e-310,7.2545090180361e-310,7.23446893787576e-310,7.21442885771543e-310,7.19438877755515e-310,7.1743486973948e-310,7.1543086172345e-310,7.13426853707416e-310,7.11422845691383e-310,7.0941883767535e-310,7.0741482965932e-310,7.0541082164329e-310,7.03406813627256e-310,7.01402805611222e-310,6.9939879759519e-310,6.9739478957916e-310,6.9539078156313e-310,6.93386773547095e-310,6.9138276553106e-310,6.8937875751503e-310,6.87374749499e-310,6.8537074148297e-310,6.83366733466935e-310,6.813627254509e-310,6.7935871743487e-310,6.7735470941884e-310,6.7535070140281e-310,6.73346693386775e-310,6.7134268537074e-310,6.6933867735471e-310,6.6733466933868e-310,6.6533066132265e-310,6.63326653306615e-310,6.6132264529058e-310,6.5931863727455e-310,6.5731462925852e-310,6.55310621242487e-310,6.53306613226454e-310,6.5130260521042e-310,6.4929859719439e-310,6.4729458917836e-310,6.45290581162327e-310,6.43286573146294e-310,6.4128256513026e-310,6.3927855711423e-310,6.372745490982e-310,6.35270541082167e-310,6.33266533066134e-310,6.312625250501e-310,6.2925851703407e-310,6.2725450901804e-310,6.25250501002007e-310,6.23246492985974e-310,6.2124248496994e-310,6.19238476953907e-310,6.1723446893788e-310,6.15230460921846e-310,6.13226452905813e-310,6.1122244488978e-310,6.09218436873747e-310,6.07214428857714e-310,6.05210420841686e-310,6.03206412825653e-310,6.0120240480962e-310,5.99198396793587e-310,5.97194388777554e-310,5.95190380761526e-310,5.93186372745493e-310,5.9118236472946e-310,5.89178356713427e-310,5.87174348697394e-310,5.85170340681366e-310,5.83166332665333e-310,5.811623246493e-310,5.79158316633266e-310,5.77154308617233e-310,5.75150300601205e-310,5.7314629258517e-310,5.7114228456914e-310,5.69138276553106e-310,5.67134268537073e-310,5.65130260521045e-310,5.6312625250501e-310,5.6112224448898e-310,5.59118236472946e-310,5.57114228456913e-310,5.55110220440885e-310,5.5310621242485e-310,5.5110220440882e-310,5.49098196392786e-310,5.47094188376753e-310,5.45090180360725e-310,5.4308617234469e-310,5.4108216432866e-310,5.39078156312625e-310,5.3707414829659e-310,5.35070140280564e-310,5.3306613226453e-310,5.310621242485e-310,5.29058116232465e-310,5.2705410821643e-310,5.25050100200404e-310,5.2304609218437e-310,5.2104208416834e-310,5.19038076152305e-310,5.1703406813627e-310,5.15030060120244e-310,5.1302605210421e-310,5.1102204408818e-310,5.09018036072145e-310,5.0701402805611e-310,5.05010020040084e-310,5.0300601202405e-310,5.01002004008017e-310,4.98997995991984e-310,4.9699398797595e-310,4.9498997995992e-310,4.9298597194389e-310,4.90981963927857e-310,4.88977955911824e-310,4.8697394789579e-310,4.8496993987976e-310,4.8296593186373e-310,4.80961923847697e-310,4.78957915831664e-310,4.7695390781563e-310,4.749498997996e-310,4.7294589178357e-310,4.70941883767537e-310,4.68937875751504e-310,4.6693386773547e-310,4.6492985971944e-310,4.6292585170341e-310,4.60921843687376e-310,4.58917835671343e-310,4.5691382765531e-310,4.54909819639277e-310,4.5290581162325e-310,4.50901803607216e-310,4.48897795591183e-310,4.4689378757515e-310,4.44889779559117e-310,4.4288577154309e-310,4.40881763527056e-310,4.38877755511023e-310,4.3687374749499e-310,4.34869739478957e-310,4.3286573146293e-310,4.30861723446896e-310,4.28857715430863e-310,4.2685370741483e-310,4.24849699398797e-310,4.2284569138277e-310,4.20841683366735e-310,4.188376753507e-310,4.1683366733467e-310,4.14829659318636e-310,4.1282565130261e-310,4.10821643286575e-310,4.0881763527054e-310,4.0681362725451e-310,4.04809619238476e-310,4.0280561122245e-310,4.00801603206415e-310,3.9879759519038e-310,3.9679358717435e-310,3.94789579158316e-310,3.9278557114229e-310,3.90781563126255e-310,3.8877755511022e-310,3.8677354709419e-310,3.84769539078156e-310,3.82765531062123e-310,3.80761523046094e-310,3.7875751503006e-310,3.7675350701403e-310,3.74749498997995e-310,3.7274549098196e-310,3.70741482965934e-310,3.687374749499e-310,3.6673346693387e-310,3.64729458917835e-310,3.627254509018e-310,3.60721442885774e-310,3.5871743486974e-310,3.5671342685371e-310,3.54709418837675e-310,3.5270541082164e-310,3.50701402805614e-310,3.4869739478958e-310,3.4669338677355e-310,3.44689378757515e-310,3.4268537074148e-310,3.40681362725453e-310,3.3867735470942e-310,3.36673346693387e-310,3.34669338677354e-310,3.3266533066132e-310,3.30661322645293e-310,3.2865731462926e-310,3.26653306613227e-310,3.24649298597194e-310,3.2264529058116e-310,3.20641282565133e-310,3.186372745491e-310,3.16633266533067e-310,3.14629258517034e-310,3.12625250501e-310,3.10621242484973e-310,3.0861723446894e-310,3.06613226452907e-310,3.04609218436874e-310,3.0260521042084e-310,3.0060120240481e-310,2.9859719438878e-310,2.96593186372746e-310,2.94589178356713e-310,2.9258517034068e-310,2.9058116232465e-310,2.8857715430862e-310,2.86573146292586e-310,2.84569138276553e-310,2.8256513026052e-310,2.8056112224449e-310,2.7855711422846e-310,2.76553106212426e-310,2.74549098196393e-310,2.7254509018036e-310,2.70541082164327e-310,2.685370741483e-310,2.66533066132266e-310,2.64529058116233e-310,2.625250501002e-310,2.60521042084167e-310,2.5851703406814e-310,2.56513026052105e-310,2.5450901803607e-310,2.5250501002004e-310,2.50501002004006e-310,2.4849699398798e-310,2.46492985971945e-310,2.4448897795591e-310,2.4248496993988e-310,2.40480961923846e-310,2.3847695390782e-310,2.36472945891785e-310,2.3446893787575e-310,2.3246492985972e-310,2.30460921843686e-310,2.2845691382766e-310,2.26452905811625e-310,2.2444889779559e-310,2.2244488977956e-310,2.20440881763526e-310,2.18436873747497e-310,2.16432865731464e-310,2.1442885771543e-310,2.124248496994e-310,2.10420841683365e-310,2.08416833667337e-310,2.06412825651304e-310,2.0440881763527e-310,2.0240480961924e-310,2.00400801603205e-310,1.98396793587177e-310,1.96392785571144e-310,1.9438877755511e-310,1.9238476953908e-310,1.90380761523045e-310,1.88376753507017e-310,1.86372745490984e-310,1.8436873747495e-310,1.8236472945892e-310,1.80360721442885e-310,1.78356713426856e-310,1.76352705410823e-310,1.7434869739479e-310,1.72344689378757e-310,1.70340681362724e-310,1.68336673346696e-310,1.66332665330663e-310,1.6432865731463e-310,1.62324649298597e-310,1.60320641282564e-310,1.5831663326653e-310,1.56312625250503e-310,1.5430861723447e-310,1.52304609218437e-310,1.50300601202404e-310,1.4829659318637e-310,1.46292585170343e-310,1.4428857715431e-310,1.42284569138277e-310,1.40280561122244e-310,1.3827655310621e-310,1.3627254509018e-310,1.3426853707415e-310,1.32264529058116e-310,1.30260521042083e-310,1.2825651302605e-310,1.2625250501002e-310,1.2424849699399e-310,1.22244488977956e-310,1.20240480961923e-310,1.1823647294589e-310,1.1623246492986e-310,1.1422845691383e-310,1.12224448897796e-310,1.10220440881763e-310,1.0821643286573e-310,1.062124248497e-310,1.0420841683367e-310,1.02204408817636e-310,1.00200400801603e-310,9.819639278557e-311,9.619238476954e-311,9.418837675351e-311,9.2184368737475e-311,9.018036072144e-311,8.817635270541e-311,8.617234468938e-311,8.416833667335e-311,8.2164328657315e-311,8.016032064128e-311,7.815631262525e-311,7.615230460922e-311,7.414829659319e-311,7.2144288577155e-311,7.014028056112e-311,6.813627254509e-311,6.613226452906e-311,6.412825651303e-311,6.2124248496995e-311,6.012024048096e-311,5.811623246493e-311,5.61122244489e-311,5.4108216432867e-311,5.2104208416834e-311,5.01002004008e-311,4.809619238477e-311,4.6092184368735e-311,4.4088176352707e-311,4.2084168336674e-311,4.008016032064e-311,3.807615230461e-311,3.6072144288575e-311,3.4068136272547e-311,3.2064128256514e-311,3.006012024048e-311,2.805611222445e-311,2.6052104208415e-311,2.4048096192387e-311,2.2044088176354e-311,2.004008016032e-311,1.8036072144287e-311,1.6032064128254e-311,1.4028056112226e-311,1.2024048096193e-311,1.002004008016e-311,8.016032064127e-312,6.012024048094e-312,4.008016032066e-312,2.004008016033e-312,0.0]}
},{}],28:[function(require,module,exports){
module.exports={"expected":[-1.1283791670955126e-300,-1.1261178862221426e-300,-1.1238566053487722e-300,-1.121595324475402e-300,-1.1193340436020319e-300,-1.1170727627286617e-300,-1.1148114818552915e-300,-1.1125502009819213e-300,-1.1102889201085513e-300,-1.1080276392351811e-300,-1.105766358361811e-300,-1.1035050774884406e-300,-1.1012437966150702e-300,-1.0989825157417002e-300,-1.0967212348683302e-300,-1.0944599539949598e-300,-1.0921986731215896e-300,-1.0899373922482194e-300,-1.0876761113748493e-300,-1.085414830501479e-300,-1.0831535496281089e-300,-1.0808922687547387e-300,-1.0786309878813687e-300,-1.0763697070079985e-300,-1.0741084261346283e-300,-1.071847145261258e-300,-1.0695858643878878e-300,-1.0673245835145177e-300,-1.0650633026411474e-300,-1.0628020217677774e-300,-1.0605407408944072e-300,-1.0582794600210368e-300,-1.056018179147667e-300,-1.0537568982742966e-300,-1.0514956174009263e-300,-1.0492343365275563e-300,-1.0469730556541859e-300,-1.0447117747808159e-300,-1.0424504939074457e-300,-1.0401892130340755e-300,-1.0379279321607053e-300,-1.0356666512873353e-300,-1.033405370413965e-300,-1.0311440895405948e-300,-1.0288828086672246e-300,-1.0266215277938544e-300,-1.024360246920484e-300,-1.0220989660471142e-300,-1.019837685173744e-300,-1.0175764043003736e-300,-1.0153151234270035e-300,-1.0130538425536331e-300,-1.0107925616802631e-300,-1.008531280806893e-300,-1.0062699999335227e-300,-1.0040087190601525e-300,-1.0017474381867827e-300,-9.994861573134123e-301,-9.97224876440042e-301,-9.949635955666716e-301,-9.927023146933018e-301,-9.904410338199316e-301,-9.881797529465612e-301,-9.859184720731912e-301,-9.83657191199821e-301,-9.813959103264508e-301,-9.791346294530806e-301,-9.768733485797103e-301,-9.746120677063401e-301,-9.7235078683297e-301,-9.700895059595999e-301,-9.678282250862297e-301,-9.655669442128595e-301,-9.633056633394893e-301,-9.61044382466119e-301,-9.58783101592749e-301,-9.565218207193788e-301,-9.542605398460086e-301,-9.519992589726384e-301,-9.497379780992682e-301,-9.47476697225898e-301,-9.45215416352528e-301,-9.429541354791577e-301,-9.406928546057873e-301,-9.384315737324173e-301,-9.361702928590471e-301,-9.339090119856769e-301,-9.316477311123069e-301,-9.293864502389365e-301,-9.271251693655663e-301,-9.248638884921963e-301,-9.22602607618826e-301,-9.203413267454558e-301,-9.180800458720856e-301,-9.158187649987154e-301,-9.135574841253454e-301,-9.112962032519752e-301,-9.09034922378605e-301,-9.067736415052345e-301,-9.045123606318646e-301,-9.022510797584945e-301,-8.999897988851241e-301,-8.977285180117541e-301,-8.95467237138384e-301,-8.932059562650137e-301,-8.909446753916435e-301,-8.886833945182732e-301,-8.86422113644903e-301,-8.841608327715328e-301,-8.818995518981628e-301,-8.796382710247926e-301,-8.773769901514224e-301,-8.751157092780522e-301,-8.728544284046822e-301,-8.705931475313117e-301,-8.683318666579417e-301,-8.660705857845715e-301,-8.638093049112013e-301,-8.61548024037831e-301,-8.59286743164461e-301,-8.570254622910907e-301,-8.547641814177205e-301,-8.525029005443504e-301,-8.502416196709803e-301,-8.4798033879761e-301,-8.457190579242398e-301,-8.434577770508696e-301,-8.411964961774994e-301,-8.389352153041292e-301,-8.36673934430759e-301,-8.344126535573889e-301,-8.321513726840188e-301,-8.298900918106487e-301,-8.276288109372783e-301,-8.253675300639081e-301,-8.231062491905381e-301,-8.208449683171677e-301,-8.185836874437977e-301,-8.163224065704275e-301,-8.140611256970574e-301,-8.117998448236872e-301,-8.095385639503168e-301,-8.072772830769468e-301,-8.050160022035766e-301,-8.027547213302063e-301,-8.004934404568362e-301,-7.98232159583466e-301,-7.959708787100959e-301,-7.937095978367257e-301,-7.914483169633555e-301,-7.891870360899853e-301,-7.869257552166151e-301,-7.84664474343245e-301,-7.824031934698747e-301,-7.801419125965046e-301,-7.778806317231344e-301,-7.756193508497642e-301,-7.73358069976394e-301,-7.710967891030238e-301,-7.688355082296536e-301,-7.665742273562834e-301,-7.643129464829132e-301,-7.62051665609543e-301,-7.597903847361729e-301,-7.575291038628027e-301,-7.552678229894325e-301,-7.530065421160625e-301,-7.507452612426921e-301,-7.48483980369322e-301,-7.462226994959518e-301,-7.4396141862258165e-301,-7.417001377492115e-301,-7.394388568758412e-301,-7.371775760024711e-301,-7.349162951291009e-301,-7.326550142557308e-301,-7.3039373338236045e-301,-7.281324525089904e-301,-7.2587117163562024e-301,-7.2360989076225006e-301,-7.213486098888798e-301,-7.190873290155096e-301,-7.168260481421395e-301,-7.145647672687693e-301,-7.123034863953991e-301,-7.1004220552202886e-301,-7.0778092464865875e-301,-7.055196437752885e-301,-7.032583629019183e-301,-7.009970820285482e-301,-6.98735801155178e-301,-6.964745202818077e-301,-6.942132394084376e-301,-6.919519585350674e-301,-6.8969067766169734e-301,-6.8742939678832716e-301,-6.851681159149569e-301,-6.829068350415867e-301,-6.806455541682165e-301,-6.783842732948463e-301,-6.761229924214761e-301,-6.73861711548106e-301,-6.716004306747358e-301,-6.693391498013656e-301,-6.670778689279955e-301,-6.648165880546252e-301,-6.625553071812551e-301,-6.602940263078849e-301,-6.5803274543451465e-301,-6.5577146456114455e-301,-6.535101836877743e-301,-6.512489028144041e-301,-6.48987621941034e-301,-6.467263410676637e-301,-6.444650601942936e-301,-6.4220377932092334e-301,-6.399424984475532e-301,-6.3768121757418305e-301,-6.3541993670081295e-301,-6.331586558274426e-301,-6.308973749540726e-301,-6.286360940807024e-301,-6.263748132073321e-301,-6.241135323339619e-301,-6.218522514605918e-301,-6.1959097058722164e-301,-6.1732968971385146e-301,-6.150684088404812e-301,-6.12807127967111e-301,-6.105458470937409e-301,-6.082845662203708e-301,-6.0602328534700044e-301,-6.037620044736303e-301,-6.0150072360026015e-301,-5.9923944272689e-301,-5.969781618535198e-301,-5.947168809801495e-301,-5.924556001067795e-301,-5.901943192334093e-301,-5.8793303836003895e-301,-5.8567175748666885e-301,-5.8341047661329874e-301,-5.8114919573992856e-301,-5.788879148665583e-301,-5.766266339931881e-301,-5.743653531198179e-301,-5.721040722464478e-301,-5.698427913730776e-301,-5.6758151049970735e-301,-5.653202296263372e-301,-5.6305894875296715e-301,-5.607976678795968e-301,-5.585363870062267e-301,-5.562751061328565e-301,-5.540138252594864e-301,-5.517525443861161e-301,-5.494912635127459e-301,-5.4722998263937576e-301,-5.4496870176600565e-301,-5.427074208926354e-301,-5.404461400192652e-301,-5.381848591458951e-301,-5.359235782725248e-301,-5.336622973991546e-301,-5.314010165257845e-301,-5.291397356524143e-301,-5.268784547790442e-301,-5.24617173905674e-301,-5.223558930323038e-301,-5.200946121589336e-301,-5.178333312855634e-301,-5.155720504121932e-301,-5.1331076953882304e-301,-5.110494886654529e-301,-5.087882077920827e-301,-5.065269269187125e-301,-5.042656460453424e-301,-5.020043651719721e-301,-4.99743084298602e-301,-4.9748180342523165e-301,-4.9522052255186155e-301,-4.9295924167849145e-301,-4.906979608051212e-301,-4.88436679931751e-301,-4.861753990583809e-301,-4.839141181850106e-301,-4.816528373116405e-301,-4.7939155643827024e-301,-4.771302755649001e-301,-4.7486899469152995e-301,-4.7260771381815985e-301,-4.703464329447895e-301,-4.680851520714193e-301,-4.658238711980493e-301,-4.63562590324679e-301,-4.613013094513088e-301,-4.5904002857793865e-301,-4.5677874770456855e-301,-4.545174668311984e-301,-4.522561859578281e-301,-4.499949050844579e-301,-4.477336242110878e-301,-4.454723433377176e-301,-4.4321106246434734e-301,-4.4094978159097716e-301,-4.3868850071760705e-301,-4.364272198442369e-301,-4.341659389708667e-301,-4.319046580974965e-301,-4.296433772241263e-301,-4.273820963507561e-301,-4.251208154773859e-301,-4.2285953460401575e-301,-4.205982537306456e-301,-4.183369728572754e-301,-4.160756919839053e-301,-4.13814411110535e-301,-4.115531302371649e-301,-4.092918493637946e-301,-4.070305684904245e-301,-4.0476928761705426e-301,-4.0250800674368415e-301,-4.002467258703139e-301,-3.979854449969438e-301,-3.957241641235736e-301,-3.934628832502034e-301,-3.912016023768332e-301,-3.88940321503463e-301,-3.8667904063009285e-301,-3.844177597567227e-301,-3.821564788833525e-301,-3.798951980099823e-301,-3.776339171366121e-301,-3.753726362632419e-301,-3.7311135538987177e-301,-3.708500745165016e-301,-3.6858879364313135e-301,-3.6632751276976125e-301,-3.6406623189639102e-301,-3.6180495102302084e-301,-3.595436701496507e-301,-3.572823892762805e-301,-3.5502110840291023e-301,-3.527598275295401e-301,-3.504985466561699e-301,-3.4823726578279976e-301,-3.4597598490942953e-301,-3.4371470403605943e-301,-3.414534231626892e-301,-3.39192142289319e-301,-3.3693086141594883e-301,-3.346695805425787e-301,-3.3240829966920845e-301,-3.3014701879583835e-301,-3.2788573792246808e-301,-3.2562445704909798e-301,-3.233631761757277e-301,-3.2110189530235756e-301,-3.1884061442898737e-301,-3.1657933355561715e-301,-3.1431805268224704e-301,-3.1205677180887677e-301,-3.0979549093550663e-301,-3.0753421006213644e-301,-3.052729291887663e-301,-3.0301164831539607e-301,-3.0075036744202592e-301,-2.984890865686557e-301,-2.9622780569528555e-301,-2.9396652482191532e-301,-2.917052439485452e-301,-2.89443963075175e-301,-2.871826822018048e-301,-2.849214013284346e-301,-2.8266012045506443e-301,-2.8039883958169424e-301,-2.781375587083241e-301,-2.758762778349539e-301,-2.736149969615837e-301,-2.713537160882135e-301,-2.6909243521484335e-301,-2.6683115434147317e-301,-2.64569873468103e-301,-2.6230859259473284e-301,-2.6004731172136265e-301,-2.5778603084799242e-301,-2.5552474997462228e-301,-2.532634691012521e-301,-2.510021882278819e-301,-2.4874090735451163e-301,-2.4647962648114153e-301,-2.442183456077713e-301,-2.4195706473440116e-301,-2.3969578386103097e-301,-2.3743450298766083e-301,-2.351732221142906e-301,-2.329119412409205e-301,-2.3065066036755022e-301,-2.2838937949418008e-301,-2.261280986208099e-301,-2.2386681774743975e-301,-2.2160553687406948e-301,-2.1934425600069937e-301,-2.1708297512732915e-301,-2.1482169425395896e-301,-2.125604133805888e-301,-2.1029913250721863e-301,-2.0803785163384844e-301,-2.0577657076047826e-301,-2.0351528988710807e-301,-2.0125400901373792e-301,-1.989927281403677e-301,-1.9673144726699755e-301,-1.9447016639362736e-301,-1.9220888552025714e-301,-1.89947604646887e-301,-1.876863237735168e-301,-1.8542504290014662e-301,-1.8316376202677645e-301,-1.8090248115340625e-301,-1.7864120028003608e-301,-1.7637991940666587e-301,-1.741186385332957e-301,-1.7185735765992554e-301,-1.6959607678655535e-301,-1.6733479591318517e-301,-1.65073515039815e-301,-1.6281223416644481e-301,-1.6055095329307463e-301,-1.5828967241970444e-301,-1.5602839154633423e-301,-1.5376711067296407e-301,-1.5150582979959388e-301,-1.4924454892622372e-301,-1.469832680528535e-301,-1.4472198717948334e-301,-1.4246070630611318e-301,-1.4019942543274297e-301,-1.379381445593728e-301,-1.356768636860026e-301,-1.3341558281263243e-301,-1.3115430193926227e-301,-1.2889302106589208e-301,-1.266317401925219e-301,-1.243704593191517e-301,-1.2210917844578154e-301,-1.1984789757241131e-301,-1.1758661669904113e-301,-1.1532533582567094e-301,-1.1306405495230077e-301,-1.1080277407893059e-301,-1.085414932055604e-301,-1.0628021233219023e-301,-1.0401893145882005e-301,-1.0175765058544988e-301,-9.94963697120797e-302,-9.72350888387095e-302,-9.497380796533934e-302,-9.271252709196914e-302,-9.045124621859896e-302,-8.818996534522877e-302,-8.59286844718586e-302,-8.366740359848842e-302,-8.140612272511823e-302,-7.914484185174805e-302,-7.688356097837788e-302,-7.462228010500769e-302,-7.23609992316375e-302,-7.009971835826731e-302,-6.783843748489714e-302,-6.557715661152696e-302,-6.331587573815678e-302,-6.10545948647866e-302,-5.879331399141641e-302,-5.653203311804623e-302,-5.427075224467605e-302,-5.200947137130586e-302,-4.974819049793568e-302,-4.74869096245655e-302,-4.522562875119531e-302,-4.2964347877825136e-302,-4.070306700445495e-302,-3.844178613108477e-302,-3.6180505257714587e-302,-3.3919224384344406e-302,-3.165794351097422e-302,-2.939666263760404e-302,-2.713538176423386e-302,-2.4874100890863675e-302,-2.2612820017493494e-302,-2.035153914412331e-302,-1.809025827075313e-302,-1.5828977397382947e-302,-1.3567696524012766e-302,-1.1306415650642582e-302,-9.0451347772724e-303,-6.783853903902217e-303,-4.522573030532036e-303,-2.261292157161853e-303,-1.1283791670955125e-308],"x":[-1.0e-300,-9.979959920040082e-301,-9.959919840080161e-301,-9.93987976012024e-301,-9.91983968016032e-301,-9.899799600200401e-301,-9.879759520240481e-301,-9.859719440280562e-301,-9.839679360320642e-301,-9.819639280360723e-301,-9.799599200400803e-301,-9.779559120440882e-301,-9.75951904048096e-301,-9.739478960521041e-301,-9.719438880561123e-301,-9.699398800601202e-301,-9.679358720641283e-301,-9.659318640681363e-301,-9.639278560721442e-301,-9.619238480761522e-301,-9.599198400801603e-301,-9.579158320841683e-301,-9.559118240881764e-301,-9.539078160921844e-301,-9.519038080961925e-301,-9.498998001002004e-301,-9.478957921042084e-301,-9.458917841082164e-301,-9.438877761122243e-301,-9.418837681162325e-301,-9.398797601202406e-301,-9.378757521242485e-301,-9.358717441282567e-301,-9.338677361322646e-301,-9.318637281362724e-301,-9.298597201402806e-301,-9.278557121442885e-301,-9.258517041482966e-301,-9.238476961523046e-301,-9.218436881563127e-301,-9.198396801603207e-301,-9.178356721643288e-301,-9.158316641683366e-301,-9.138276561723447e-301,-9.118236481763527e-301,-9.098196401803608e-301,-9.078156321843687e-301,-9.058116241883769e-301,-9.038076161923849e-301,-9.018036081963928e-301,-8.997996002004008e-301,-8.977955922044087e-301,-8.957915842084168e-301,-8.93787576212425e-301,-8.917835682164329e-301,-8.897795602204409e-301,-8.877755522244491e-301,-8.85771544228457e-301,-8.837675362324649e-301,-8.817635282364728e-301,-8.79759520240481e-301,-8.77755512244489e-301,-8.757515042484969e-301,-8.737474962525051e-301,-8.717434882565132e-301,-8.69739480260521e-301,-8.677354722645291e-301,-8.65731464268537e-301,-8.63727456272545e-301,-8.617234482765532e-301,-8.597194402805611e-301,-8.577154322845691e-301,-8.557114242885772e-301,-8.537074162925852e-301,-8.517034082965931e-301,-8.496994003006012e-301,-8.476953923046092e-301,-8.456913843086173e-301,-8.436873763126253e-301,-8.416833683166334e-301,-8.396793603206412e-301,-8.376753523246494e-301,-8.356713443286573e-301,-8.336673363326652e-301,-8.316633283366734e-301,-8.296593203406813e-301,-8.276553123446893e-301,-8.256513043486976e-301,-8.236472963527054e-301,-8.216432883567135e-301,-8.196392803607215e-301,-8.176352723647294e-301,-8.156312643687375e-301,-8.136272563727455e-301,-8.116232483767535e-301,-8.096192403807616e-301,-8.076152323847696e-301,-8.056112243887777e-301,-8.036072163927854e-301,-8.016032083967936e-301,-7.995992004008017e-301,-7.975951924048095e-301,-7.955911844088178e-301,-7.935871764128258e-301,-7.915831684168337e-301,-7.895791604208417e-301,-7.875751524248496e-301,-7.855711444288577e-301,-7.835671364328657e-301,-7.815631284368737e-301,-7.795591204408818e-301,-7.775551124448898e-301,-7.755511044488979e-301,-7.73547096452906e-301,-7.715430884569136e-301,-7.695390804609219e-301,-7.675350724649299e-301,-7.65531064468938e-301,-7.635270564729458e-301,-7.615230484769539e-301,-7.59519040480962e-301,-7.5751503248497e-301,-7.55511024488978e-301,-7.53507016492986e-301,-7.51503008496994e-301,-7.49499000501002e-301,-7.4749499250501e-301,-7.454909845090181e-301,-7.4348697651302604e-301,-7.414829685170341e-301,-7.3947896052104205e-301,-7.374749525250502e-301,-7.3547094452905814e-301,-7.334669365330661e-301,-7.3146292853707415e-301,-7.294589205410823e-301,-7.274549125450902e-301,-7.254509045490982e-301,-7.2344689655310626e-301,-7.214428885571143e-301,-7.194388805611223e-301,-7.174348725651302e-301,-7.154308645691383e-301,-7.134268565731464e-301,-7.114228485771543e-301,-7.094188405811623e-301,-7.074148325851704e-301,-7.054108245891783e-301,-7.034068165931864e-301,-7.014028085971944e-301,-6.993988006012024e-301,-6.9739479260521044e-301,-6.953907846092185e-301,-6.9338677661322645e-301,-6.913827686172345e-301,-6.8937876062124254e-301,-6.873747526252505e-301,-6.8537074462925855e-301,-6.833667366332666e-301,-6.813627286372746e-301,-6.793587206412826e-301,-6.7735471264529066e-301,-6.753507046492986e-301,-6.733466966533067e-301,-6.7134268865731455e-301,-6.693386806613227e-301,-6.673346726653307e-301,-6.653306646693387e-301,-6.6332665667334665e-301,-6.613226486773548e-301,-6.593186406813627e-301,-6.573146326853708e-301,-6.5531062468937875e-301,-6.533066166933868e-301,-6.513026086973948e-301,-6.492986007014029e-301,-6.472945927054108e-301,-6.452905847094189e-301,-6.4328657671342694e-301,-6.412825687174349e-301,-6.392785607214429e-301,-6.372745527254509e-301,-6.35270544729459e-301,-6.33266536733467e-301,-6.31262528737475e-301,-6.292585207414829e-301,-6.272545127454911e-301,-6.2525050474949894e-301,-6.23246496753507e-301,-6.21242488757515e-301,-6.192384807615231e-301,-6.1723447276553105e-301,-6.152304647695391e-301,-6.1322645677354706e-301,-6.112224487775552e-301,-6.092184407815632e-301,-6.072144327855711e-301,-6.0521042478957916e-301,-6.032064167935872e-301,-6.012024087975952e-301,-5.991984008016032e-301,-5.971943928056113e-301,-5.951903848096192e-301,-5.931863768136273e-301,-5.911823688176353e-301,-5.891783608216433e-301,-5.871743528256513e-301,-5.851703448296594e-301,-5.831663368336673e-301,-5.811623288376754e-301,-5.7915832084168334e-301,-5.771543128456913e-301,-5.751503048496994e-301,-5.731462968537074e-301,-5.7114228885771545e-301,-5.691382808617234e-301,-5.6713427286573146e-301,-5.651302648697395e-301,-5.6312625687374755e-301,-5.611222488777554e-301,-5.5911824088176356e-301,-5.571142328857716e-301,-5.551102248897796e-301,-5.531062168937875e-301,-5.511022088977957e-301,-5.490982009018036e-301,-5.470941929058117e-301,-5.450901849098196e-301,-5.430861769138276e-301,-5.410821689178357e-301,-5.390781609218438e-301,-5.3707415292585165e-301,-5.350701449298597e-301,-5.3306613693386774e-301,-5.310621289378758e-301,-5.2905812094188375e-301,-5.270541129458917e-301,-5.2505010494989985e-301,-5.230460969539079e-301,-5.210420889579158e-301,-5.190380809619238e-301,-5.1703407296593195e-301,-5.150300649699399e-301,-5.130260569739479e-301,-5.110220489779559e-301,-5.090180409819639e-301,-5.07014032985972e-301,-5.0501002498998e-301,-5.030060169939879e-301,-5.01002008997996e-301,-4.989980010020041e-301,-4.96993993006012e-301,-4.9498998501002e-301,-4.929859770140281e-301,-4.909819690180361e-301,-4.889779610220441e-301,-4.869739530260521e-301,-4.849699450300601e-301,-4.829659370340682e-301,-4.809619290380761e-301,-4.789579210420842e-301,-4.769539130460922e-301,-4.749499050501002e-301,-4.729458970541082e-301,-4.709418890581163e-301,-4.689378810621242e-301,-4.669338730661323e-301,-4.649298650701403e-301,-4.629258570741483e-301,-4.609218490781563e-301,-4.589178410821644e-301,-4.569138330861723e-301,-4.549098250901804e-301,-4.529058170941884e-301,-4.509018090981964e-301,-4.488978011022044e-301,-4.468937931062125e-301,-4.4488978511022045e-301,-4.428857771142285e-301,-4.408817691182364e-301,-4.388777611222445e-301,-4.3687375312625255e-301,-4.348697451302605e-301,-4.328657371342685e-301,-4.308617291382766e-301,-4.288577211422846e-301,-4.268537131462926e-301,-4.248497051503006e-301,-4.228456971543086e-301,-4.208416891583167e-301,-4.188376811623247e-301,-4.168336731663326e-301,-4.1482966517034065e-301,-4.128256571743488e-301,-4.108216491783567e-301,-4.088176411823647e-301,-4.0681363318637275e-301,-4.048096251903808e-301,-4.028056171943888e-301,-4.008016091983968e-301,-3.987976012024048e-301,-3.967935932064129e-301,-3.947895852104209e-301,-3.927855772144288e-301,-3.907815692184369e-301,-3.887775612224449e-301,-3.86773553226453e-301,-3.847695452304609e-301,-3.82765537234469e-301,-3.807615292384769e-301,-3.78757521242485e-301,-3.76753513246493e-301,-3.74749505250501e-301,-3.7274549725450904e-301,-3.7074148925851704e-301,-3.687374812625251e-301,-3.6673347326653305e-301,-3.6472946527054114e-301,-3.627254572745491e-301,-3.6072144927855715e-301,-3.587174412825651e-301,-3.567134332865732e-301,-3.5470942529058116e-301,-3.527054172945892e-301,-3.507014092985972e-301,-3.486974013026052e-301,-3.4669339330661322e-301,-3.4468938531062127e-301,-3.4268537731462927e-301,-3.4068136931863728e-301,-3.3867736132264532e-301,-3.3667335332665333e-301,-3.3466934533066133e-301,-3.3266533733466934e-301,-3.306613293386774e-301,-3.286573213426854e-301,-3.266533133466934e-301,-3.2464930535070144e-301,-3.2264529735470944e-301,-3.2064128935871745e-301,-3.186372813627255e-301,-3.166332733667335e-301,-3.1462926537074146e-301,-3.126252573747495e-301,-3.106212493787575e-301,-3.0861724138276556e-301,-3.0661323338677352e-301,-3.046092253907816e-301,-3.0260521739478957e-301,-3.0060120939879762e-301,-2.9859720140280563e-301,-2.9659319340681367e-301,-2.9458918541082164e-301,-2.9258517741482972e-301,-2.905811694188377e-301,-2.8857716142284573e-301,-2.865731534268537e-301,-2.8456914543086174e-301,-2.8256513743486975e-301,-2.805611294388777e-301,-2.785571214428858e-301,-2.7655311344689376e-301,-2.745491054509018e-301,-2.725450974549098e-301,-2.7054108945891786e-301,-2.6853708146292582e-301,-2.6653307346693387e-301,-2.6452906547094187e-301,-2.625250574749499e-301,-2.605210494789579e-301,-2.5851704148296597e-301,-2.5651303348697393e-301,-2.5450902549098198e-301,-2.5250501749499e-301,-2.50501009498998e-301,-2.48497001503006e-301,-2.4649299350701404e-301,-2.4448898551102204e-301,-2.4248497751503005e-301,-2.4048096951903805e-301,-2.384769615230461e-301,-2.364729535270541e-301,-2.344689455310621e-301,-2.3246493753507016e-301,-2.3046092953907816e-301,-2.2845692154308617e-301,-2.264529135470942e-301,-2.244489055511022e-301,-2.2244489755511022e-301,-2.204408895591182e-301,-2.1843688156312627e-301,-2.1643287356713423e-301,-2.144288655711423e-301,-2.124248575751503e-301,-2.1042084957915833e-301,-2.084168415831663e-301,-2.064128335871744e-301,-2.0440882559118235e-301,-2.024048175951904e-301,-2.004008095991984e-301,-1.9839680160320644e-301,-1.963927936072144e-301,-1.9438878561122245e-301,-1.9238477761523046e-301,-1.9038076961923846e-301,-1.883767616232465e-301,-1.8637275362725451e-301,-1.8436874563126254e-301,-1.8236473763527056e-301,-1.8036072963927857e-301,-1.783567216432866e-301,-1.763527136472946e-301,-1.7434870565130262e-301,-1.7234469765531065e-301,-1.7034068965931863e-301,-1.6833668166332666e-301,-1.6633267366733466e-301,-1.643286656713427e-301,-1.6232465767535072e-301,-1.6032064967935872e-301,-1.5831664168336675e-301,-1.5631263368737475e-301,-1.5430862569138278e-301,-1.523046176953908e-301,-1.503006096993988e-301,-1.4829660170340683e-301,-1.4629259370741486e-301,-1.4428858571142286e-301,-1.4228457771543089e-301,-1.402805697194389e-301,-1.382765617234469e-301,-1.3627255372745492e-301,-1.3426854573146293e-301,-1.3226453773547095e-301,-1.3026052973947896e-301,-1.2825652174348698e-301,-1.26252513747495e-301,-1.2424850575150301e-301,-1.2224449775551104e-301,-1.2024048975951904e-301,-1.1823648176352707e-301,-1.162324737675351e-301,-1.142284657715431e-301,-1.1222445777555112e-301,-1.1022044977955913e-301,-1.0821644178356715e-301,-1.0621243378757514e-301,-1.0420842579158314e-301,-1.0220441779559117e-301,-1.002004097995992e-301,-9.81964018036072e-302,-9.619239380761522e-302,-9.418838581162325e-302,-9.218437781563127e-302,-9.018036981963928e-302,-8.81763618236473e-302,-8.617235382765532e-302,-8.416834583166334e-302,-8.216433783567134e-302,-8.016032983967936e-302,-7.815632184368737e-302,-7.61523138476954e-302,-7.414830585170341e-302,-7.214429785571143e-302,-7.014028985971944e-302,-6.813628186372747e-302,-6.613227386773547e-302,-6.412826587174349e-302,-6.21242578757515e-302,-6.012024987975952e-302,-5.811624188376754e-302,-5.611223388777556e-302,-5.410822589178357e-302,-5.210421789579159e-302,-5.01002098997996e-302,-4.809620190380762e-302,-4.6092193907815634e-302,-4.4088185911823644e-302,-4.2084177915831664e-302,-4.008016991983968e-302,-3.80761619238477e-302,-3.607215392785571e-302,-3.406814593186373e-302,-3.2064137935871745e-302,-3.006012993987976e-302,-2.8056121943887775e-302,-2.605211394789579e-302,-2.404810595190381e-302,-2.2044097955911823e-302,-2.004008995991984e-302,-1.8036081963927856e-302,-1.6032073967935873e-302,-1.4028065971943888e-302,-1.2024057975951906e-302,-1.002004997995992e-302,-8.016041983967936e-303,-6.012033987975951e-303,-4.0080259919839685e-303,-2.004017995991984e-303,-1.0e-308]}
},{}],29:[function(require,module,exports){
module.exports={"expected":[1.1283791670955126e-300,1.1261178862221426e-300,1.1238566053487722e-300,1.121595324475402e-300,1.1193340436020319e-300,1.1170727627286617e-300,1.1148114818552915e-300,1.1125502009819213e-300,1.1102889201085513e-300,1.1080276392351811e-300,1.105766358361811e-300,1.1035050774884406e-300,1.1012437966150702e-300,1.0989825157417002e-300,1.0967212348683302e-300,1.0944599539949598e-300,1.0921986731215896e-300,1.0899373922482194e-300,1.0876761113748493e-300,1.085414830501479e-300,1.0831535496281089e-300,1.0808922687547387e-300,1.0786309878813687e-300,1.0763697070079985e-300,1.0741084261346283e-300,1.071847145261258e-300,1.0695858643878878e-300,1.0673245835145177e-300,1.0650633026411474e-300,1.0628020217677774e-300,1.0605407408944072e-300,1.0582794600210368e-300,1.056018179147667e-300,1.0537568982742966e-300,1.0514956174009263e-300,1.0492343365275563e-300,1.0469730556541859e-300,1.0447117747808159e-300,1.0424504939074457e-300,1.0401892130340755e-300,1.0379279321607053e-300,1.0356666512873353e-300,1.033405370413965e-300,1.0311440895405948e-300,1.0288828086672246e-300,1.0266215277938544e-300,1.024360246920484e-300,1.0220989660471142e-300,1.019837685173744e-300,1.0175764043003736e-300,1.0153151234270035e-300,1.0130538425536331e-300,1.0107925616802631e-300,1.008531280806893e-300,1.0062699999335227e-300,1.0040087190601525e-300,1.0017474381867827e-300,9.994861573134123e-301,9.97224876440042e-301,9.949635955666716e-301,9.927023146933018e-301,9.904410338199316e-301,9.881797529465612e-301,9.859184720731912e-301,9.83657191199821e-301,9.813959103264508e-301,9.791346294530806e-301,9.768733485797103e-301,9.746120677063401e-301,9.7235078683297e-301,9.700895059595999e-301,9.678282250862297e-301,9.655669442128595e-301,9.633056633394893e-301,9.61044382466119e-301,9.58783101592749e-301,9.565218207193788e-301,9.542605398460086e-301,9.519992589726384e-301,9.497379780992682e-301,9.47476697225898e-301,9.45215416352528e-301,9.429541354791577e-301,9.406928546057873e-301,9.384315737324173e-301,9.361702928590471e-301,9.339090119856769e-301,9.316477311123069e-301,9.293864502389365e-301,9.271251693655663e-301,9.248638884921963e-301,9.22602607618826e-301,9.203413267454558e-301,9.180800458720856e-301,9.158187649987154e-301,9.135574841253454e-301,9.112962032519752e-301,9.09034922378605e-301,9.067736415052345e-301,9.045123606318646e-301,9.022510797584945e-301,8.999897988851241e-301,8.977285180117541e-301,8.95467237138384e-301,8.932059562650137e-301,8.909446753916435e-301,8.886833945182732e-301,8.86422113644903e-301,8.841608327715328e-301,8.818995518981628e-301,8.796382710247926e-301,8.773769901514224e-301,8.751157092780522e-301,8.728544284046822e-301,8.705931475313117e-301,8.683318666579417e-301,8.660705857845715e-301,8.638093049112013e-301,8.61548024037831e-301,8.59286743164461e-301,8.570254622910907e-301,8.547641814177205e-301,8.525029005443504e-301,8.502416196709803e-301,8.4798033879761e-301,8.457190579242398e-301,8.434577770508696e-301,8.411964961774994e-301,8.389352153041292e-301,8.36673934430759e-301,8.344126535573889e-301,8.321513726840188e-301,8.298900918106487e-301,8.276288109372783e-301,8.253675300639081e-301,8.231062491905381e-301,8.208449683171677e-301,8.185836874437977e-301,8.163224065704275e-301,8.140611256970574e-301,8.117998448236872e-301,8.095385639503168e-301,8.072772830769468e-301,8.050160022035766e-301,8.027547213302063e-301,8.004934404568362e-301,7.98232159583466e-301,7.959708787100959e-301,7.937095978367257e-301,7.914483169633555e-301,7.891870360899853e-301,7.869257552166151e-301,7.84664474343245e-301,7.824031934698747e-301,7.801419125965046e-301,7.778806317231344e-301,7.756193508497642e-301,7.73358069976394e-301,7.710967891030238e-301,7.688355082296536e-301,7.665742273562834e-301,7.643129464829132e-301,7.62051665609543e-301,7.597903847361729e-301,7.575291038628027e-301,7.552678229894325e-301,7.530065421160625e-301,7.507452612426921e-301,7.48483980369322e-301,7.462226994959518e-301,7.4396141862258165e-301,7.417001377492115e-301,7.394388568758412e-301,7.371775760024711e-301,7.349162951291009e-301,7.326550142557308e-301,7.3039373338236045e-301,7.281324525089904e-301,7.2587117163562024e-301,7.2360989076225006e-301,7.213486098888798e-301,7.190873290155096e-301,7.168260481421395e-301,7.145647672687693e-301,7.123034863953991e-301,7.1004220552202886e-301,7.0778092464865875e-301,7.055196437752885e-301,7.032583629019183e-301,7.009970820285482e-301,6.98735801155178e-301,6.964745202818077e-301,6.942132394084376e-301,6.919519585350674e-301,6.8969067766169734e-301,6.8742939678832716e-301,6.851681159149569e-301,6.829068350415867e-301,6.806455541682165e-301,6.783842732948463e-301,6.761229924214761e-301,6.73861711548106e-301,6.716004306747358e-301,6.693391498013656e-301,6.670778689279955e-301,6.648165880546252e-301,6.625553071812551e-301,6.602940263078849e-301,6.5803274543451465e-301,6.5577146456114455e-301,6.535101836877743e-301,6.512489028144041e-301,6.48987621941034e-301,6.467263410676637e-301,6.444650601942936e-301,6.4220377932092334e-301,6.399424984475532e-301,6.3768121757418305e-301,6.3541993670081295e-301,6.331586558274426e-301,6.308973749540726e-301,6.286360940807024e-301,6.263748132073321e-301,6.241135323339619e-301,6.218522514605918e-301,6.1959097058722164e-301,6.1732968971385146e-301,6.150684088404812e-301,6.12807127967111e-301,6.105458470937409e-301,6.082845662203708e-301,6.0602328534700044e-301,6.037620044736303e-301,6.0150072360026015e-301,5.9923944272689e-301,5.969781618535198e-301,5.947168809801495e-301,5.924556001067795e-301,5.901943192334093e-301,5.8793303836003895e-301,5.8567175748666885e-301,5.8341047661329874e-301,5.8114919573992856e-301,5.788879148665583e-301,5.766266339931881e-301,5.743653531198179e-301,5.721040722464478e-301,5.698427913730776e-301,5.6758151049970735e-301,5.653202296263372e-301,5.6305894875296715e-301,5.607976678795968e-301,5.585363870062267e-301,5.562751061328565e-301,5.540138252594864e-301,5.517525443861161e-301,5.494912635127459e-301,5.4722998263937576e-301,5.4496870176600565e-301,5.427074208926354e-301,5.404461400192652e-301,5.381848591458951e-301,5.359235782725248e-301,5.336622973991546e-301,5.314010165257845e-301,5.291397356524143e-301,5.268784547790442e-301,5.24617173905674e-301,5.223558930323038e-301,5.200946121589336e-301,5.178333312855634e-301,5.155720504121932e-301,5.1331076953882304e-301,5.110494886654529e-301,5.087882077920827e-301,5.065269269187125e-301,5.042656460453424e-301,5.020043651719721e-301,4.99743084298602e-301,4.9748180342523165e-301,4.9522052255186155e-301,4.9295924167849145e-301,4.906979608051212e-301,4.88436679931751e-301,4.861753990583809e-301,4.839141181850106e-301,4.816528373116405e-301,4.7939155643827024e-301,4.771302755649001e-301,4.7486899469152995e-301,4.7260771381815985e-301,4.703464329447895e-301,4.680851520714193e-301,4.658238711980493e-301,4.63562590324679e-301,4.613013094513088e-301,4.5904002857793865e-301,4.5677874770456855e-301,4.545174668311984e-301,4.522561859578281e-301,4.499949050844579e-301,4.477336242110878e-301,4.454723433377176e-301,4.4321106246434734e-301,4.4094978159097716e-301,4.3868850071760705e-301,4.364272198442369e-301,4.341659389708667e-301,4.319046580974965e-301,4.296433772241263e-301,4.273820963507561e-301,4.251208154773859e-301,4.2285953460401575e-301,4.205982537306456e-301,4.183369728572754e-301,4.160756919839053e-301,4.13814411110535e-301,4.115531302371649e-301,4.092918493637946e-301,4.070305684904245e-301,4.0476928761705426e-301,4.0250800674368415e-301,4.002467258703139e-301,3.979854449969438e-301,3.957241641235736e-301,3.934628832502034e-301,3.912016023768332e-301,3.88940321503463e-301,3.8667904063009285e-301,3.844177597567227e-301,3.821564788833525e-301,3.798951980099823e-301,3.776339171366121e-301,3.753726362632419e-301,3.7311135538987177e-301,3.708500745165016e-301,3.6858879364313135e-301,3.6632751276976125e-301,3.6406623189639102e-301,3.6180495102302084e-301,3.595436701496507e-301,3.572823892762805e-301,3.5502110840291023e-301,3.527598275295401e-301,3.504985466561699e-301,3.4823726578279976e-301,3.4597598490942953e-301,3.4371470403605943e-301,3.414534231626892e-301,3.39192142289319e-301,3.3693086141594883e-301,3.346695805425787e-301,3.3240829966920845e-301,3.3014701879583835e-301,3.2788573792246808e-301,3.2562445704909798e-301,3.233631761757277e-301,3.2110189530235756e-301,3.1884061442898737e-301,3.1657933355561715e-301,3.1431805268224704e-301,3.1205677180887677e-301,3.0979549093550663e-301,3.0753421006213644e-301,3.052729291887663e-301,3.0301164831539607e-301,3.0075036744202592e-301,2.984890865686557e-301,2.9622780569528555e-301,2.9396652482191532e-301,2.917052439485452e-301,2.89443963075175e-301,2.871826822018048e-301,2.849214013284346e-301,2.8266012045506443e-301,2.8039883958169424e-301,2.781375587083241e-301,2.758762778349539e-301,2.736149969615837e-301,2.713537160882135e-301,2.6909243521484335e-301,2.6683115434147317e-301,2.64569873468103e-301,2.6230859259473284e-301,2.6004731172136265e-301,2.5778603084799242e-301,2.5552474997462228e-301,2.532634691012521e-301,2.510021882278819e-301,2.4874090735451163e-301,2.4647962648114153e-301,2.442183456077713e-301,2.4195706473440116e-301,2.3969578386103097e-301,2.3743450298766083e-301,2.351732221142906e-301,2.329119412409205e-301,2.3065066036755022e-301,2.2838937949418008e-301,2.261280986208099e-301,2.2386681774743975e-301,2.2160553687406948e-301,2.1934425600069937e-301,2.1708297512732915e-301,2.1482169425395896e-301,2.125604133805888e-301,2.1029913250721863e-301,2.0803785163384844e-301,2.0577657076047826e-301,2.0351528988710807e-301,2.0125400901373792e-301,1.989927281403677e-301,1.9673144726699755e-301,1.9447016639362736e-301,1.9220888552025714e-301,1.89947604646887e-301,1.876863237735168e-301,1.8542504290014662e-301,1.8316376202677645e-301,1.8090248115340625e-301,1.7864120028003608e-301,1.7637991940666587e-301,1.741186385332957e-301,1.7185735765992554e-301,1.6959607678655535e-301,1.6733479591318517e-301,1.65073515039815e-301,1.6281223416644481e-301,1.6055095329307463e-301,1.5828967241970444e-301,1.5602839154633423e-301,1.5376711067296407e-301,1.5150582979959388e-301,1.4924454892622372e-301,1.469832680528535e-301,1.4472198717948334e-301,1.4246070630611318e-301,1.4019942543274297e-301,1.379381445593728e-301,1.356768636860026e-301,1.3341558281263243e-301,1.3115430193926227e-301,1.2889302106589208e-301,1.266317401925219e-301,1.243704593191517e-301,1.2210917844578154e-301,1.1984789757241131e-301,1.1758661669904113e-301,1.1532533582567094e-301,1.1306405495230077e-301,1.1080277407893059e-301,1.085414932055604e-301,1.0628021233219023e-301,1.0401893145882005e-301,1.0175765058544988e-301,9.94963697120797e-302,9.72350888387095e-302,9.497380796533934e-302,9.271252709196914e-302,9.045124621859896e-302,8.818996534522877e-302,8.59286844718586e-302,8.366740359848842e-302,8.140612272511823e-302,7.914484185174805e-302,7.688356097837788e-302,7.462228010500769e-302,7.23609992316375e-302,7.009971835826731e-302,6.783843748489714e-302,6.557715661152696e-302,6.331587573815678e-302,6.10545948647866e-302,5.879331399141641e-302,5.653203311804623e-302,5.427075224467605e-302,5.200947137130586e-302,4.974819049793568e-302,4.74869096245655e-302,4.522562875119531e-302,4.2964347877825136e-302,4.070306700445495e-302,3.844178613108477e-302,3.6180505257714587e-302,3.3919224384344406e-302,3.165794351097422e-302,2.939666263760404e-302,2.713538176423386e-302,2.4874100890863675e-302,2.2612820017493494e-302,2.035153914412331e-302,1.809025827075313e-302,1.5828977397382947e-302,1.3567696524012766e-302,1.1306415650642582e-302,9.0451347772724e-303,6.783853903902217e-303,4.522573030532036e-303,2.261292157161853e-303,1.1283791670955125e-308],"x":[1.0e-300,9.979959920040082e-301,9.959919840080161e-301,9.93987976012024e-301,9.91983968016032e-301,9.899799600200401e-301,9.879759520240481e-301,9.859719440280562e-301,9.839679360320642e-301,9.819639280360723e-301,9.799599200400803e-301,9.779559120440882e-301,9.75951904048096e-301,9.739478960521041e-301,9.719438880561123e-301,9.699398800601202e-301,9.679358720641283e-301,9.659318640681363e-301,9.639278560721442e-301,9.619238480761522e-301,9.599198400801603e-301,9.579158320841683e-301,9.559118240881764e-301,9.539078160921844e-301,9.519038080961925e-301,9.498998001002004e-301,9.478957921042084e-301,9.458917841082164e-301,9.438877761122243e-301,9.418837681162325e-301,9.398797601202406e-301,9.378757521242485e-301,9.358717441282567e-301,9.338677361322646e-301,9.318637281362724e-301,9.298597201402806e-301,9.278557121442885e-301,9.258517041482966e-301,9.238476961523046e-301,9.218436881563127e-301,9.198396801603207e-301,9.178356721643288e-301,9.158316641683366e-301,9.138276561723447e-301,9.118236481763527e-301,9.098196401803608e-301,9.078156321843687e-301,9.058116241883769e-301,9.038076161923849e-301,9.018036081963928e-301,8.997996002004008e-301,8.977955922044087e-301,8.957915842084168e-301,8.93787576212425e-301,8.917835682164329e-301,8.897795602204409e-301,8.877755522244491e-301,8.85771544228457e-301,8.837675362324649e-301,8.817635282364728e-301,8.79759520240481e-301,8.77755512244489e-301,8.757515042484969e-301,8.737474962525051e-301,8.717434882565132e-301,8.69739480260521e-301,8.677354722645291e-301,8.65731464268537e-301,8.63727456272545e-301,8.617234482765532e-301,8.597194402805611e-301,8.577154322845691e-301,8.557114242885772e-301,8.537074162925852e-301,8.517034082965931e-301,8.496994003006012e-301,8.476953923046092e-301,8.456913843086173e-301,8.436873763126253e-301,8.416833683166334e-301,8.396793603206412e-301,8.376753523246494e-301,8.356713443286573e-301,8.336673363326652e-301,8.316633283366734e-301,8.296593203406813e-301,8.276553123446893e-301,8.256513043486976e-301,8.236472963527054e-301,8.216432883567135e-301,8.196392803607215e-301,8.176352723647294e-301,8.156312643687375e-301,8.136272563727455e-301,8.116232483767535e-301,8.096192403807616e-301,8.076152323847696e-301,8.056112243887777e-301,8.036072163927854e-301,8.016032083967936e-301,7.995992004008017e-301,7.975951924048095e-301,7.955911844088178e-301,7.935871764128258e-301,7.915831684168337e-301,7.895791604208417e-301,7.875751524248496e-301,7.855711444288577e-301,7.835671364328657e-301,7.815631284368737e-301,7.795591204408818e-301,7.775551124448898e-301,7.755511044488979e-301,7.73547096452906e-301,7.715430884569136e-301,7.695390804609219e-301,7.675350724649299e-301,7.65531064468938e-301,7.635270564729458e-301,7.615230484769539e-301,7.59519040480962e-301,7.5751503248497e-301,7.55511024488978e-301,7.53507016492986e-301,7.51503008496994e-301,7.49499000501002e-301,7.4749499250501e-301,7.454909845090181e-301,7.4348697651302604e-301,7.414829685170341e-301,7.3947896052104205e-301,7.374749525250502e-301,7.3547094452905814e-301,7.334669365330661e-301,7.3146292853707415e-301,7.294589205410823e-301,7.274549125450902e-301,7.254509045490982e-301,7.2344689655310626e-301,7.214428885571143e-301,7.194388805611223e-301,7.174348725651302e-301,7.154308645691383e-301,7.134268565731464e-301,7.114228485771543e-301,7.094188405811623e-301,7.074148325851704e-301,7.054108245891783e-301,7.034068165931864e-301,7.014028085971944e-301,6.993988006012024e-301,6.9739479260521044e-301,6.953907846092185e-301,6.9338677661322645e-301,6.913827686172345e-301,6.8937876062124254e-301,6.873747526252505e-301,6.8537074462925855e-301,6.833667366332666e-301,6.813627286372746e-301,6.793587206412826e-301,6.7735471264529066e-301,6.753507046492986e-301,6.733466966533067e-301,6.7134268865731455e-301,6.693386806613227e-301,6.673346726653307e-301,6.653306646693387e-301,6.6332665667334665e-301,6.613226486773548e-301,6.593186406813627e-301,6.573146326853708e-301,6.5531062468937875e-301,6.533066166933868e-301,6.513026086973948e-301,6.492986007014029e-301,6.472945927054108e-301,6.452905847094189e-301,6.4328657671342694e-301,6.412825687174349e-301,6.392785607214429e-301,6.372745527254509e-301,6.35270544729459e-301,6.33266536733467e-301,6.31262528737475e-301,6.292585207414829e-301,6.272545127454911e-301,6.2525050474949894e-301,6.23246496753507e-301,6.21242488757515e-301,6.192384807615231e-301,6.1723447276553105e-301,6.152304647695391e-301,6.1322645677354706e-301,6.112224487775552e-301,6.092184407815632e-301,6.072144327855711e-301,6.0521042478957916e-301,6.032064167935872e-301,6.012024087975952e-301,5.991984008016032e-301,5.971943928056113e-301,5.951903848096192e-301,5.931863768136273e-301,5.911823688176353e-301,5.891783608216433e-301,5.871743528256513e-301,5.851703448296594e-301,5.831663368336673e-301,5.811623288376754e-301,5.7915832084168334e-301,5.771543128456913e-301,5.751503048496994e-301,5.731462968537074e-301,5.7114228885771545e-301,5.691382808617234e-301,5.6713427286573146e-301,5.651302648697395e-301,5.6312625687374755e-301,5.611222488777554e-301,5.5911824088176356e-301,5.571142328857716e-301,5.551102248897796e-301,5.531062168937875e-301,5.511022088977957e-301,5.490982009018036e-301,5.470941929058117e-301,5.450901849098196e-301,5.430861769138276e-301,5.410821689178357e-301,5.390781609218438e-301,5.3707415292585165e-301,5.350701449298597e-301,5.3306613693386774e-301,5.310621289378758e-301,5.2905812094188375e-301,5.270541129458917e-301,5.2505010494989985e-301,5.230460969539079e-301,5.210420889579158e-301,5.190380809619238e-301,5.1703407296593195e-301,5.150300649699399e-301,5.130260569739479e-301,5.110220489779559e-301,5.090180409819639e-301,5.07014032985972e-301,5.0501002498998e-301,5.030060169939879e-301,5.01002008997996e-301,4.989980010020041e-301,4.96993993006012e-301,4.9498998501002e-301,4.929859770140281e-301,4.909819690180361e-301,4.889779610220441e-301,4.869739530260521e-301,4.849699450300601e-301,4.829659370340682e-301,4.809619290380761e-301,4.789579210420842e-301,4.769539130460922e-301,4.749499050501002e-301,4.729458970541082e-301,4.709418890581163e-301,4.689378810621242e-301,4.669338730661323e-301,4.649298650701403e-301,4.629258570741483e-301,4.609218490781563e-301,4.589178410821644e-301,4.569138330861723e-301,4.549098250901804e-301,4.529058170941884e-301,4.509018090981964e-301,4.488978011022044e-301,4.468937931062125e-301,4.4488978511022045e-301,4.428857771142285e-301,4.408817691182364e-301,4.388777611222445e-301,4.3687375312625255e-301,4.348697451302605e-301,4.328657371342685e-301,4.308617291382766e-301,4.288577211422846e-301,4.268537131462926e-301,4.248497051503006e-301,4.228456971543086e-301,4.208416891583167e-301,4.188376811623247e-301,4.168336731663326e-301,4.1482966517034065e-301,4.128256571743488e-301,4.108216491783567e-301,4.088176411823647e-301,4.0681363318637275e-301,4.048096251903808e-301,4.028056171943888e-301,4.008016091983968e-301,3.987976012024048e-301,3.967935932064129e-301,3.947895852104209e-301,3.927855772144288e-301,3.907815692184369e-301,3.887775612224449e-301,3.86773553226453e-301,3.847695452304609e-301,3.82765537234469e-301,3.807615292384769e-301,3.78757521242485e-301,3.76753513246493e-301,3.74749505250501e-301,3.7274549725450904e-301,3.7074148925851704e-301,3.687374812625251e-301,3.6673347326653305e-301,3.6472946527054114e-301,3.627254572745491e-301,3.6072144927855715e-301,3.587174412825651e-301,3.567134332865732e-301,3.5470942529058116e-301,3.527054172945892e-301,3.507014092985972e-301,3.486974013026052e-301,3.4669339330661322e-301,3.4468938531062127e-301,3.4268537731462927e-301,3.4068136931863728e-301,3.3867736132264532e-301,3.3667335332665333e-301,3.3466934533066133e-301,3.3266533733466934e-301,3.306613293386774e-301,3.286573213426854e-301,3.266533133466934e-301,3.2464930535070144e-301,3.2264529735470944e-301,3.2064128935871745e-301,3.186372813627255e-301,3.166332733667335e-301,3.1462926537074146e-301,3.126252573747495e-301,3.106212493787575e-301,3.0861724138276556e-301,3.0661323338677352e-301,3.046092253907816e-301,3.0260521739478957e-301,3.0060120939879762e-301,2.9859720140280563e-301,2.9659319340681367e-301,2.9458918541082164e-301,2.9258517741482972e-301,2.905811694188377e-301,2.8857716142284573e-301,2.865731534268537e-301,2.8456914543086174e-301,2.8256513743486975e-301,2.805611294388777e-301,2.785571214428858e-301,2.7655311344689376e-301,2.745491054509018e-301,2.725450974549098e-301,2.7054108945891786e-301,2.6853708146292582e-301,2.6653307346693387e-301,2.6452906547094187e-301,2.625250574749499e-301,2.605210494789579e-301,2.5851704148296597e-301,2.5651303348697393e-301,2.5450902549098198e-301,2.5250501749499e-301,2.50501009498998e-301,2.48497001503006e-301,2.4649299350701404e-301,2.4448898551102204e-301,2.4248497751503005e-301,2.4048096951903805e-301,2.384769615230461e-301,2.364729535270541e-301,2.344689455310621e-301,2.3246493753507016e-301,2.3046092953907816e-301,2.2845692154308617e-301,2.264529135470942e-301,2.244489055511022e-301,2.2244489755511022e-301,2.204408895591182e-301,2.1843688156312627e-301,2.1643287356713423e-301,2.144288655711423e-301,2.124248575751503e-301,2.1042084957915833e-301,2.084168415831663e-301,2.064128335871744e-301,2.0440882559118235e-301,2.024048175951904e-301,2.004008095991984e-301,1.9839680160320644e-301,1.963927936072144e-301,1.9438878561122245e-301,1.9238477761523046e-301,1.9038076961923846e-301,1.883767616232465e-301,1.8637275362725451e-301,1.8436874563126254e-301,1.8236473763527056e-301,1.8036072963927857e-301,1.783567216432866e-301,1.763527136472946e-301,1.7434870565130262e-301,1.7234469765531065e-301,1.7034068965931863e-301,1.6833668166332666e-301,1.6633267366733466e-301,1.643286656713427e-301,1.6232465767535072e-301,1.6032064967935872e-301,1.5831664168336675e-301,1.5631263368737475e-301,1.5430862569138278e-301,1.523046176953908e-301,1.503006096993988e-301,1.4829660170340683e-301,1.4629259370741486e-301,1.4428858571142286e-301,1.4228457771543089e-301,1.402805697194389e-301,1.382765617234469e-301,1.3627255372745492e-301,1.3426854573146293e-301,1.3226453773547095e-301,1.3026052973947896e-301,1.2825652174348698e-301,1.26252513747495e-301,1.2424850575150301e-301,1.2224449775551104e-301,1.2024048975951904e-301,1.1823648176352707e-301,1.162324737675351e-301,1.142284657715431e-301,1.1222445777555112e-301,1.1022044977955913e-301,1.0821644178356715e-301,1.0621243378757514e-301,1.0420842579158314e-301,1.0220441779559117e-301,1.002004097995992e-301,9.81964018036072e-302,9.619239380761522e-302,9.418838581162325e-302,9.218437781563127e-302,9.018036981963928e-302,8.81763618236473e-302,8.617235382765532e-302,8.416834583166334e-302,8.216433783567134e-302,8.016032983967936e-302,7.815632184368737e-302,7.61523138476954e-302,7.414830585170341e-302,7.214429785571143e-302,7.014028985971944e-302,6.813628186372747e-302,6.613227386773547e-302,6.412826587174349e-302,6.21242578757515e-302,6.012024987975952e-302,5.811624188376754e-302,5.611223388777556e-302,5.410822589178357e-302,5.210421789579159e-302,5.01002098997996e-302,4.809620190380762e-302,4.6092193907815634e-302,4.4088185911823644e-302,4.2084177915831664e-302,4.008016991983968e-302,3.80761619238477e-302,3.607215392785571e-302,3.406814593186373e-302,3.2064137935871745e-302,3.006012993987976e-302,2.8056121943887775e-302,2.605211394789579e-302,2.404810595190381e-302,2.2044097955911823e-302,2.004008995991984e-302,1.8036081963927856e-302,1.6032073967935873e-302,1.4028065971943888e-302,1.2024057975951906e-302,1.002004997995992e-302,8.016041983967936e-303,6.012033987975951e-303,4.0080259919839685e-303,2.004017995991984e-303,1.0e-308]}
},{}],30:[function(require,module,exports){
module.exports={"expected":[-0.9999999999984626,-0.999999999999787,-0.9999999999999725,-0.9999999999999967,-0.9999999999999997,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0],"x":[-5.0,-5.190380761523046,-5.380761523046092,-5.571142284569138,-5.761523046092185,-5.95190380761523,-6.142284569138276,-6.332665330661323,-6.5230460921843685,-6.713426853707415,-6.903807615230461,-7.094188376753507,-7.284569138276553,-7.474949899799599,-7.6653306613226455,-7.855711422845691,-8.046092184368737,-8.236472945891784,-8.42685370741483,-8.617234468937875,-8.807615230460922,-8.997995991983968,-9.188376753507015,-9.37875751503006,-9.569138276553106,-9.759519038076153,-9.949899799599198,-10.140280561122244,-10.330661322645291,-10.521042084168336,-10.711422845691382,-10.901803607214429,-11.092184368737476,-11.28256513026052,-11.472945891783567,-11.663326653306614,-11.853707414829659,-12.044088176352705,-12.234468937875752,-12.424849699398798,-12.615230460921843,-12.80561122244489,-12.995991983967937,-13.186372745490981,-13.376753507014028,-13.567134268537075,-13.75751503006012,-13.947895791583166,-14.138276553106213,-14.32865731462926,-14.519038076152304,-14.70941883767535,-14.899799599198397,-15.090180360721442,-15.280561122244489,-15.470941883767535,-15.661322645290582,-15.851703406813627,-16.04208416833667,-16.23246492985972,-16.422845691382765,-16.613226452905813,-16.803607214428858,-16.993987975951903,-17.18436873747495,-17.374749498997996,-17.56513026052104,-17.75551102204409,-17.945891783567134,-18.13627254509018,-18.326653306613228,-18.517034068136272,-18.707414829659317,-18.897795591182366,-19.08817635270541,-19.278557114228455,-19.468937875751504,-19.65931863727455,-19.849699398797597,-20.04008016032064,-20.230460921843687,-20.420841683366735,-20.61122244488978,-20.801603206412825,-20.991983967935873,-21.182364729458918,-21.372745490981963,-21.56312625250501,-21.753507014028056,-21.9438877755511,-22.13426853707415,-22.324649298597194,-22.51503006012024,-22.705410821643287,-22.895791583166332,-23.08617234468938,-23.276553106212425,-23.46693386773547,-23.65731462925852,-23.847695390781563,-24.03807615230461,-24.228456913827657,-24.4188376753507,-24.609218436873746,-24.799599198396795,-24.98997995991984,-25.180360721442884,-25.370741482965933,-25.561122244488978,-25.751503006012022,-25.94188376753507,-26.132264529058116,-26.322645290581164,-26.51302605210421,-26.703406813627254,-26.893787575150302,-27.084168336673347,-27.274549098196392,-27.46492985971944,-27.655310621242485,-27.84569138276553,-28.03607214428858,-28.226452905811623,-28.416833667334668,-28.607214428857716,-28.79759519038076,-28.987975951903806,-29.178356713426854,-29.3687374749499,-29.559118236472944,-29.749498997995993,-29.939879759519037,-30.130260521042086,-30.32064128256513,-30.511022044088175,-30.701402805611224,-30.89178356713427,-31.082164328657313,-31.272545090180362,-31.462925851703407,-31.65330661322645,-31.8436873747495,-32.034068136272545,-32.22444889779559,-32.414829659318634,-32.605210420841686,-32.79559118236473,-32.985971943887776,-33.17635270541082,-33.366733466933866,-33.55711422845691,-33.74749498997996,-33.93787575150301,-34.12825651302605,-34.3186372745491,-34.50901803607214,-34.699398797595194,-34.88977955911824,-35.08016032064128,-35.27054108216433,-35.46092184368737,-35.65130260521042,-35.84168336673347,-36.032064128256515,-36.22244488977956,-36.412825651302605,-36.60320641282565,-36.793587174348694,-36.983967935871746,-37.17434869739479,-37.364729458917836,-37.55511022044088,-37.745490981963925,-37.93587174348698,-38.12625250501002,-38.31663326653307,-38.50701402805611,-38.69739478957916,-38.8877755511022,-39.078156312625254,-39.2685370741483,-39.45891783567134,-39.64929859719439,-39.83967935871743,-40.03006012024048,-40.22044088176353,-40.410821643286575,-40.60120240480962,-40.791583166332664,-40.98196392785571,-41.17234468937876,-41.362725450901806,-41.55310621242485,-41.743486973947896,-41.93386773547094,-42.124248496993985,-42.31462925851704,-42.50501002004008,-42.69539078156313,-42.88577154308617,-43.07615230460922,-43.26653306613226,-43.45691382765531,-43.64729458917836,-43.8376753507014,-44.02805611222445,-44.21843687374749,-44.408817635270545,-44.59919839679359,-44.789579158316634,-44.97995991983968,-45.170340681362724,-45.36072144288577,-45.55110220440882,-45.741482965931866,-45.93186372745491,-46.122244488977955,-46.312625250501,-46.503006012024045,-46.6933867735471,-46.88376753507014,-47.07414829659319,-47.26452905811623,-47.454909819639276,-47.64529058116233,-47.83567134268537,-48.02605210420842,-48.21643286573146,-48.40681362725451,-48.59719438877755,-48.787575150300604,-48.97795591182365,-49.168336673346694,-49.35871743486974,-49.549098196392784,-49.73947895791583,-49.92985971943888,-50.120240480961925,-50.31062124248497,-50.501002004008015,-50.69138276553106,-50.88176352705411,-51.07214428857716,-51.2625250501002,-51.452905811623246,-51.64328657314629,-51.833667334669336,-52.02404809619239,-52.21442885771543,-52.40480961923848,-52.59519038076152,-52.78557114228457,-52.97595190380761,-53.166332665330664,-53.35671342685371,-53.547094188376754,-53.7374749498998,-53.92785571142284,-54.11823647294589,-54.30861723446894,-54.498997995991985,-54.68937875751503,-54.879759519038075,-55.07014028056112,-55.26052104208417,-55.450901803607216,-55.64128256513026,-55.831663326653306,-56.02204408817635,-56.212424849699396,-56.40280561122245,-56.59318637274549,-56.78356713426854,-56.97394789579158,-57.16432865731463,-57.35470941883767,-57.545090180360724,-57.73547094188377,-57.92585170340681,-58.11623246492986,-58.3066132264529,-58.496993987975955,-58.687374749499,-58.877755511022045,-59.06813627254509,-59.258517034068134,-59.44889779559118,-59.63927855711423,-59.829659318637276,-60.02004008016032,-60.210420841683366,-60.40080160320641,-60.591182364729455,-60.78156312625251,-60.97194388777555,-61.1623246492986,-61.35270541082164,-61.54308617234469,-61.73346693386774,-61.92384769539078,-62.11422845691383,-62.30460921843687,-62.49498997995992,-62.68537074148296,-62.875751503006015,-63.06613226452906,-63.256513026052104,-63.44689378757515,-63.637274549098194,-63.82765531062124,-64.01803607214428,-64.20841683366733,-64.39879759519039,-64.58917835671343,-64.77955911823648,-64.96993987975952,-65.16032064128257,-65.35070140280561,-65.54108216432866,-65.7314629258517,-65.92184368737475,-66.11222444889779,-66.30260521042084,-66.49298597194388,-66.68336673346694,-66.87374749498998,-67.06412825651303,-67.25450901803607,-67.44488977955912,-67.63527054108216,-67.82565130260521,-68.01603206412825,-68.2064128256513,-68.39679358717434,-68.58717434869739,-68.77755511022045,-68.96793587174349,-69.15831663326654,-69.34869739478958,-69.53907815631263,-69.72945891783567,-69.91983967935872,-70.11022044088176,-70.3006012024048,-70.49098196392785,-70.6813627254509,-70.87174348697395,-71.062124248497,-71.25250501002004,-71.44288577154309,-71.63326653306613,-71.82364729458918,-72.01402805611222,-72.20440881763527,-72.39478957915831,-72.58517034068136,-72.7755511022044,-72.96593186372745,-73.15631262525051,-73.34669338677355,-73.5370741482966,-73.72745490981964,-73.91783567134269,-74.10821643286573,-74.29859719438878,-74.48897795591182,-74.67935871743487,-74.86973947895791,-75.06012024048096,-75.25050100200401,-75.44088176352706,-75.6312625250501,-75.82164328657315,-76.0120240480962,-76.20240480961924,-76.39278557114228,-76.58316633266533,-76.77354709418837,-76.96392785571142,-77.15430861723446,-77.34468937875752,-77.53507014028057,-77.72545090180361,-77.91583166332666,-78.1062124248497,-78.29659318637275,-78.48697394789579,-78.67735470941884,-78.86773547094188,-79.05811623246493,-79.24849699398797,-79.43887775551102,-79.62925851703407,-79.81963927855712,-80.01002004008016,-80.20040080160321,-80.39078156312625,-80.5811623246493,-80.77154308617234,-80.96192384769539,-81.15230460921843,-81.34268537074148,-81.53306613226452,-81.72344689378758,-81.91382765531063,-82.10420841683367,-82.29458917835672,-82.48496993987976,-82.6753507014028,-82.86573146292585,-83.0561122244489,-83.24649298597194,-83.43687374749499,-83.62725450901803,-83.81763527054109,-84.00801603206413,-84.19839679358718,-84.38877755511022,-84.57915831663327,-84.76953907815631,-84.95991983967936,-85.1503006012024,-85.34068136272545,-85.53106212424849,-85.72144288577154,-85.91182364729458,-86.10220440881764,-86.29258517034069,-86.48296593186373,-86.67334669338678,-86.86372745490982,-87.05410821643287,-87.24448897795591,-87.43486973947896,-87.625250501002,-87.81563126252505,-88.00601202404809,-88.19639278557115,-88.3867735470942,-88.57715430861724,-88.76753507014028,-88.95791583166333,-89.14829659318637,-89.33867735470942,-89.52905811623246,-89.71943887775551,-89.90981963927855,-90.1002004008016,-90.29058116232466,-90.4809619238477,-90.67134268537075,-90.86172344689379,-91.05210420841684,-91.24248496993988,-91.43286573146293,-91.62324649298597,-91.81362725450902,-92.00400801603206,-92.1943887775551,-92.38476953907815,-92.57515030060121,-92.76553106212425,-92.9559118236473,-93.14629258517034,-93.33667334669339,-93.52705410821643,-93.71743486973948,-93.90781563126252,-94.09819639278557,-94.28857715430861,-94.47895791583166,-94.66933867735472,-94.85971943887776,-95.0501002004008,-95.24048096192385,-95.4308617234469,-95.62124248496994,-95.81162324649299,-96.00200400801603,-96.19238476953907,-96.38276553106212,-96.57314629258516,-96.76352705410822,-96.95390781563127,-97.14428857715431,-97.33466933867736,-97.5250501002004,-97.71543086172345,-97.90581162324649,-98.09619238476954,-98.28657314629258,-98.47695390781563,-98.66733466933867,-98.85771543086172,-99.04809619238478,-99.23847695390782,-99.42885771543087,-99.61923847695391,-99.80961923847696,-100.0]}
},{}],31:[function(require,module,exports){
module.exports={"expected":[0.9999999999984626,0.999999999999787,0.9999999999999725,0.9999999999999967,0.9999999999999997,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[5.0,5.190380761523046,5.380761523046092,5.571142284569138,5.761523046092185,5.95190380761523,6.142284569138276,6.332665330661323,6.5230460921843685,6.713426853707415,6.903807615230461,7.094188376753507,7.284569138276553,7.474949899799599,7.6653306613226455,7.855711422845691,8.046092184368737,8.236472945891784,8.42685370741483,8.617234468937875,8.807615230460922,8.997995991983968,9.188376753507015,9.37875751503006,9.569138276553106,9.759519038076153,9.949899799599198,10.140280561122244,10.330661322645291,10.521042084168336,10.711422845691382,10.901803607214429,11.092184368737476,11.28256513026052,11.472945891783567,11.663326653306614,11.853707414829659,12.044088176352705,12.234468937875752,12.424849699398798,12.615230460921843,12.80561122244489,12.995991983967937,13.186372745490981,13.376753507014028,13.567134268537075,13.75751503006012,13.947895791583166,14.138276553106213,14.32865731462926,14.519038076152304,14.70941883767535,14.899799599198397,15.090180360721442,15.280561122244489,15.470941883767535,15.661322645290582,15.851703406813627,16.04208416833667,16.23246492985972,16.422845691382765,16.613226452905813,16.803607214428858,16.993987975951903,17.18436873747495,17.374749498997996,17.56513026052104,17.75551102204409,17.945891783567134,18.13627254509018,18.326653306613228,18.517034068136272,18.707414829659317,18.897795591182366,19.08817635270541,19.278557114228455,19.468937875751504,19.65931863727455,19.849699398797597,20.04008016032064,20.230460921843687,20.420841683366735,20.61122244488978,20.801603206412825,20.991983967935873,21.182364729458918,21.372745490981963,21.56312625250501,21.753507014028056,21.9438877755511,22.13426853707415,22.324649298597194,22.51503006012024,22.705410821643287,22.895791583166332,23.08617234468938,23.276553106212425,23.46693386773547,23.65731462925852,23.847695390781563,24.03807615230461,24.228456913827657,24.4188376753507,24.609218436873746,24.799599198396795,24.98997995991984,25.180360721442884,25.370741482965933,25.561122244488978,25.751503006012022,25.94188376753507,26.132264529058116,26.322645290581164,26.51302605210421,26.703406813627254,26.893787575150302,27.084168336673347,27.274549098196392,27.46492985971944,27.655310621242485,27.84569138276553,28.03607214428858,28.226452905811623,28.416833667334668,28.607214428857716,28.79759519038076,28.987975951903806,29.178356713426854,29.3687374749499,29.559118236472944,29.749498997995993,29.939879759519037,30.130260521042086,30.32064128256513,30.511022044088175,30.701402805611224,30.89178356713427,31.082164328657313,31.272545090180362,31.462925851703407,31.65330661322645,31.8436873747495,32.034068136272545,32.22444889779559,32.414829659318634,32.605210420841686,32.79559118236473,32.985971943887776,33.17635270541082,33.366733466933866,33.55711422845691,33.74749498997996,33.93787575150301,34.12825651302605,34.3186372745491,34.50901803607214,34.699398797595194,34.88977955911824,35.08016032064128,35.27054108216433,35.46092184368737,35.65130260521042,35.84168336673347,36.032064128256515,36.22244488977956,36.412825651302605,36.60320641282565,36.793587174348694,36.983967935871746,37.17434869739479,37.364729458917836,37.55511022044088,37.745490981963925,37.93587174348698,38.12625250501002,38.31663326653307,38.50701402805611,38.69739478957916,38.8877755511022,39.078156312625254,39.2685370741483,39.45891783567134,39.64929859719439,39.83967935871743,40.03006012024048,40.22044088176353,40.410821643286575,40.60120240480962,40.791583166332664,40.98196392785571,41.17234468937876,41.362725450901806,41.55310621242485,41.743486973947896,41.93386773547094,42.124248496993985,42.31462925851704,42.50501002004008,42.69539078156313,42.88577154308617,43.07615230460922,43.26653306613226,43.45691382765531,43.64729458917836,43.8376753507014,44.02805611222445,44.21843687374749,44.408817635270545,44.59919839679359,44.789579158316634,44.97995991983968,45.170340681362724,45.36072144288577,45.55110220440882,45.741482965931866,45.93186372745491,46.122244488977955,46.312625250501,46.503006012024045,46.6933867735471,46.88376753507014,47.07414829659319,47.26452905811623,47.454909819639276,47.64529058116233,47.83567134268537,48.02605210420842,48.21643286573146,48.40681362725451,48.59719438877755,48.787575150300604,48.97795591182365,49.168336673346694,49.35871743486974,49.549098196392784,49.73947895791583,49.92985971943888,50.120240480961925,50.31062124248497,50.501002004008015,50.69138276553106,50.88176352705411,51.07214428857716,51.2625250501002,51.452905811623246,51.64328657314629,51.833667334669336,52.02404809619239,52.21442885771543,52.40480961923848,52.59519038076152,52.78557114228457,52.97595190380761,53.166332665330664,53.35671342685371,53.547094188376754,53.7374749498998,53.92785571142284,54.11823647294589,54.30861723446894,54.498997995991985,54.68937875751503,54.879759519038075,55.07014028056112,55.26052104208417,55.450901803607216,55.64128256513026,55.831663326653306,56.02204408817635,56.212424849699396,56.40280561122245,56.59318637274549,56.78356713426854,56.97394789579158,57.16432865731463,57.35470941883767,57.545090180360724,57.73547094188377,57.92585170340681,58.11623246492986,58.3066132264529,58.496993987975955,58.687374749499,58.877755511022045,59.06813627254509,59.258517034068134,59.44889779559118,59.63927855711423,59.829659318637276,60.02004008016032,60.210420841683366,60.40080160320641,60.591182364729455,60.78156312625251,60.97194388777555,61.1623246492986,61.35270541082164,61.54308617234469,61.73346693386774,61.92384769539078,62.11422845691383,62.30460921843687,62.49498997995992,62.68537074148296,62.875751503006015,63.06613226452906,63.256513026052104,63.44689378757515,63.637274549098194,63.82765531062124,64.01803607214428,64.20841683366733,64.39879759519039,64.58917835671343,64.77955911823648,64.96993987975952,65.16032064128257,65.35070140280561,65.54108216432866,65.7314629258517,65.92184368737475,66.11222444889779,66.30260521042084,66.49298597194388,66.68336673346694,66.87374749498998,67.06412825651303,67.25450901803607,67.44488977955912,67.63527054108216,67.82565130260521,68.01603206412825,68.2064128256513,68.39679358717434,68.58717434869739,68.77755511022045,68.96793587174349,69.15831663326654,69.34869739478958,69.53907815631263,69.72945891783567,69.91983967935872,70.11022044088176,70.3006012024048,70.49098196392785,70.6813627254509,70.87174348697395,71.062124248497,71.25250501002004,71.44288577154309,71.63326653306613,71.82364729458918,72.01402805611222,72.20440881763527,72.39478957915831,72.58517034068136,72.7755511022044,72.96593186372745,73.15631262525051,73.34669338677355,73.5370741482966,73.72745490981964,73.91783567134269,74.10821643286573,74.29859719438878,74.48897795591182,74.67935871743487,74.86973947895791,75.06012024048096,75.25050100200401,75.44088176352706,75.6312625250501,75.82164328657315,76.0120240480962,76.20240480961924,76.39278557114228,76.58316633266533,76.77354709418837,76.96392785571142,77.15430861723446,77.34468937875752,77.53507014028057,77.72545090180361,77.91583166332666,78.1062124248497,78.29659318637275,78.48697394789579,78.67735470941884,78.86773547094188,79.05811623246493,79.24849699398797,79.43887775551102,79.62925851703407,79.81963927855712,80.01002004008016,80.20040080160321,80.39078156312625,80.5811623246493,80.77154308617234,80.96192384769539,81.15230460921843,81.34268537074148,81.53306613226452,81.72344689378758,81.91382765531063,82.10420841683367,82.29458917835672,82.48496993987976,82.6753507014028,82.86573146292585,83.0561122244489,83.24649298597194,83.43687374749499,83.62725450901803,83.81763527054109,84.00801603206413,84.19839679358718,84.38877755511022,84.57915831663327,84.76953907815631,84.95991983967936,85.1503006012024,85.34068136272545,85.53106212424849,85.72144288577154,85.91182364729458,86.10220440881764,86.29258517034069,86.48296593186373,86.67334669338678,86.86372745490982,87.05410821643287,87.24448897795591,87.43486973947896,87.625250501002,87.81563126252505,88.00601202404809,88.19639278557115,88.3867735470942,88.57715430861724,88.76753507014028,88.95791583166333,89.14829659318637,89.33867735470942,89.52905811623246,89.71943887775551,89.90981963927855,90.1002004008016,90.29058116232466,90.4809619238477,90.67134268537075,90.86172344689379,91.05210420841684,91.24248496993988,91.43286573146293,91.62324649298597,91.81362725450902,92.00400801603206,92.1943887775551,92.38476953907815,92.57515030060121,92.76553106212425,92.9559118236473,93.14629258517034,93.33667334669339,93.52705410821643,93.71743486973948,93.90781563126252,94.09819639278557,94.28857715430861,94.47895791583166,94.66933867735472,94.85971943887776,95.0501002004008,95.24048096192385,95.4308617234469,95.62124248496994,95.81162324649299,96.00200400801603,96.19238476953907,96.38276553106212,96.57314629258516,96.76352705410822,96.95390781563127,97.14428857715431,97.33466933867736,97.5250501002004,97.71543086172345,97.90581162324649,98.09619238476954,98.28657314629258,98.47695390781563,98.66733466933867,98.85771543086172,99.04809619238478,99.23847695390782,99.42885771543087,99.61923847695391,99.80961923847696,100.0]}
},{}],32:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var erf = require( './../lib' );


// FIXTURES //

var veryLargeNegative = require( './fixtures/julia/very_large_negative.json' );
var veryLargePositive = require( './fixtures/julia/very_large_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var subnormal = require( './fixtures/julia/subnormal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof erf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[-5,-100]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargeNegative.expected;
	x = veryLargeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[5,100]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargePositive.expected;
	x = veryLargePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[-2.5,-5]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeNegative.expected;
	x = largeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[2.5,5]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largePositive.expected;
	x = largePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[-1,-3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumNegative.expected;
	x = mediumNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[1,3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumPositive.expected;
	x = mediumPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[-0.8,-1]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = smallNegative.expected;
	x = smallNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[0.8,1]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = smallPositive.expected;
	x = smallPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[-0.8,0.8]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = smaller.expected;
	x = smaller.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[-1e-300,-1e-308]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = tinyNegative.expected;
	x = tinyNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the error function for `x` on the interval `[1e-300,1e-308]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = tinyPositive.expected;
	x = tinyPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the error function for subnormal `x`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = subnormal.expected;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erf( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'if provided `-0`, the function returns `-0`', function test( t ) {
	var y = erf( -0.0 );
	t.equal( isNegativeZero( y ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `+0`, the function returns `+0`', function test( t ) {
	var y = erf( +0.0 );
	t.equal( isPositiveZero( y ), true, 'returns +0' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `-1`', function test( t ) {
	var y = erf( NINF );
	t.equal( y, -1.0, 'returns -1' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `+1`', function test( t ) {
	var y = erf( PINF );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var y = erf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/erf/test/test.js")
},{"./../lib":19,"./fixtures/julia/large_negative.json":20,"./fixtures/julia/large_positive.json":21,"./fixtures/julia/medium_negative.json":22,"./fixtures/julia/medium_positive.json":23,"./fixtures/julia/small_negative.json":24,"./fixtures/julia/small_positive.json":25,"./fixtures/julia/smaller.json":26,"./fixtures/julia/subnormal.json":27,"./fixtures/julia/tiny_negative.json":28,"./fixtures/julia/tiny_positive.json":29,"./fixtures/julia/very_large_negative.json":30,"./fixtures/julia/very_large_positive.json":31,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/assert/is-negative-zero":8,"@stdlib/math/base/assert/is-positive-zero":10,"@stdlib/math/base/special/abs":13,"@stdlib/math/constants/float64-eps":61,"@stdlib/math/constants/float64-ninf":67,"@stdlib/math/constants/float64-pinf":68,"tape":126}],33:[function(require,module,exports){
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

},{"./expmulti.js":34,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/trunc":40,"@stdlib/math/constants/float64-ninf":67,"@stdlib/math/constants/float64-pinf":68}],34:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":38,"@stdlib/math/base/tools/evalpoly":44}],35:[function(require,module,exports){
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

},{"./exp.js":33}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{"./floor.js":36}],38:[function(require,module,exports){
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

},{"./ldexp.js":39}],39:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/copysign":17,"@stdlib/math/base/utils/float64-exponent":46,"@stdlib/math/base/utils/float64-from-words":48,"@stdlib/math/base/utils/float64-normalize":53,"@stdlib/math/base/utils/float64-to-words":58,"@stdlib/math/constants/float64-exponent-bias":62,"@stdlib/math/constants/float64-max-base2-exponent":65,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":64,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":66,"@stdlib/math/constants/float64-ninf":67,"@stdlib/math/constants/float64-pinf":68}],40:[function(require,module,exports){
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

},{"./trunc.js":41}],41:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":15,"@stdlib/math/base/special/floor":37}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"./evalpoly.js":42}],44:[function(require,module,exports){
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

},{"./evalpoly.js":42,"./factory.js":43,"@stdlib/utils/define-read-only-property":71}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":52,"@stdlib/math/constants/float64-exponent-bias":62,"@stdlib/math/constants/float64-high-word-exponent-mask":63}],46:[function(require,module,exports){
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

},{"./exponent.js":45}],47:[function(require,module,exports){
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

},{"./indices.js":49}],48:[function(require,module,exports){
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

},{"./from_words.js":47}],49:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],50:[function(require,module,exports){
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

},{"./high.js":51}],51:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],52:[function(require,module,exports){
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

},{"./get_high_word.js":50}],53:[function(require,module,exports){
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

},{"./normalize.js":54}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/abs":13,"@stdlib/math/constants/float64-smallest-normal":69}],55:[function(require,module,exports){
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

},{"./set_low_word.js":57}],56:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],57:[function(require,module,exports){
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

},{"./low.js":56}],58:[function(require,module,exports){
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

},{"./to_words.js":60}],59:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":49}],60:[function(require,module,exports){
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

},{"./indices.js":59}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"./define_read_only_property.js":70}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){

},{}],74:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"base64-js":72,"ieee754":95}],77:[function(require,module,exports){
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
},{"../../is-buffer/index.js":97}],78:[function(require,module,exports){
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

},{"./lib/is_arguments.js":79,"./lib/keys.js":80}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],81:[function(require,module,exports){
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

},{"foreach":91,"object-keys":100}],82:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],83:[function(require,module,exports){
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

},{"./helpers/isFinite":84,"./helpers/isNaN":85,"./helpers/mod":86,"./helpers/sign":87,"es-to-primitive/es5":88,"has":94,"is-callable":98}],84:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],85:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],86:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],87:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],88:[function(require,module,exports){
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

},{"./helpers/isPrimitive":89,"is-callable":98}],89:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){

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


},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":92}],94:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":93}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{"./isArguments":101}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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
},{"_process":75}],103:[function(require,module,exports){
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
},{"_process":75}],104:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":105}],105:[function(require,module,exports){
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
},{"./_stream_readable":107,"./_stream_writable":109,"core-util-is":77,"inherits":96,"process-nextick-args":103}],106:[function(require,module,exports){
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
},{"./_stream_transform":108,"core-util-is":77,"inherits":96}],107:[function(require,module,exports){
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
},{"./_stream_duplex":105,"./internal/streams/BufferList":110,"./internal/streams/destroy":111,"./internal/streams/stream":112,"_process":75,"core-util-is":77,"events":90,"inherits":96,"isarray":113,"process-nextick-args":103,"safe-buffer":120,"string_decoder/":114,"util":73}],108:[function(require,module,exports){
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
},{"./_stream_duplex":105,"core-util-is":77,"inherits":96}],109:[function(require,module,exports){
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
},{"./_stream_duplex":105,"./internal/streams/destroy":111,"./internal/streams/stream":112,"_process":75,"core-util-is":77,"inherits":96,"process-nextick-args":103,"safe-buffer":120,"util-deprecate":132}],110:[function(require,module,exports){
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
},{"safe-buffer":120}],111:[function(require,module,exports){
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
},{"process-nextick-args":103}],112:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":90}],113:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],114:[function(require,module,exports){
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
},{"safe-buffer":120}],115:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":116}],116:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":105,"./lib/_stream_passthrough.js":106,"./lib/_stream_readable.js":107,"./lib/_stream_transform.js":108,"./lib/_stream_writable.js":109}],117:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":116}],118:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":109}],119:[function(require,module,exports){
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
},{"_process":75,"through":131}],120:[function(require,module,exports){
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

},{"buffer":76}],121:[function(require,module,exports){
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

},{"events":90,"inherits":96,"readable-stream/duplex.js":104,"readable-stream/passthrough.js":115,"readable-stream/readable.js":116,"readable-stream/transform.js":117,"readable-stream/writable.js":118}],122:[function(require,module,exports){
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

},{"es-abstract/es5":83,"function-bind":93}],123:[function(require,module,exports){
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

},{"./implementation":122,"./polyfill":124,"./shim":125,"define-properties":81,"function-bind":93}],124:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":122}],125:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":124,"define-properties":81}],126:[function(require,module,exports){
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
},{"./lib/default_stream":127,"./lib/results":129,"./lib/test":130,"_process":75,"defined":82,"through":131}],127:[function(require,module,exports){
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
},{"_process":75,"fs":74,"through":131}],128:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":75}],129:[function(require,module,exports){
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
},{"_process":75,"events":90,"function-bind":93,"has":94,"inherits":96,"object-inspect":99,"resumer":119,"through":131}],130:[function(require,module,exports){
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
},{"./next_tick":128,"deep-equal":78,"defined":82,"events":90,"has":94,"inherits":96,"path":102,"string.prototype.trim":123}],131:[function(require,module,exports){
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
},{"_process":75,"stream":121}],132:[function(require,module,exports){
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
