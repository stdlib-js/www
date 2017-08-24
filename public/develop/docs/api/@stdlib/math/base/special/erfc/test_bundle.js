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

},{"@stdlib/math/constants/float64-ninf":63,"@stdlib/math/constants/float64-pinf":64}],6:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"./ceil.js":10}],12:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":44,"@stdlib/math/base/utils/float64-get-high-word":48,"@stdlib/math/base/utils/float64-to-words":54}],13:[function(require,module,exports){
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

},{"./copysign.js":12}],14:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/exp":31,"@stdlib/math/base/tools/evalpoly":40,"@stdlib/math/base/utils/float64-set-low-word":51,"@stdlib/math/constants/float64-ninf":63,"@stdlib/math/constants/float64-pinf":64}],15:[function(require,module,exports){
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

},{"./erfc.js":14}],16:[function(require,module,exports){
module.exports={"expected":[1.999593047982555,1.9996911995894764,1.9997668325923286,1.999824809893153,1.9998690216081059,1.9999025605571388,1.9999278706802224,1.999946871475729,1.9999610614637822,1.9999716035119106,1.9999793946459878,1.9999851227260605,1.9999893121103618,1.9999923601740688,1.9999945663015113,1.9999961547380622,1.9999972924750173,1.9999981031496346,1.999998677773955,1.999999082959691,1.9999993671812455,1.9999995655131535,1.9999997031899923,1.9999997982640212,1.9999998635764187,1.9999999082100346,1.9999999385532243,1.9999999590739688,1.9999999728796456,1.9999999821192846,1.9999999882708415,1.9999999923450924,1.9999999950294676,1.999999996788895,1.999999997936077,1.9999999986801678,1.9999999991602904,1.9999999994684752,1.999999999665265,1.99999999979027,1.9999999998692624,1.9999999999189186,1.9999999999499711,1.9999999999692888,1.9999999999812434,1.9999999999886031,1.9999999999931104,1.9999999999958564,1.9999999999975206,1.999999999998524,1.9999999999991258,1.999999999999485,1.999999999999698,1.999999999999824,1.9999999999998979,1.999999999999941,1.999999999999966,1.9999999999999807,1.999999999999989,1.9999999999999938,1.9999999999999964,1.999999999999998,1.999999999999999,1.9999999999999993,1.9999999999999998,1.9999999999999998,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0],"x":[-2.5,-2.5511022044088176,-2.6022044088176353,-2.653306613226453,-2.7044088176352705,-2.755511022044088,-2.806613226452906,-2.8577154308617234,-2.908817635270541,-2.9599198396793587,-3.0110220440881763,-3.062124248496994,-3.1132264529058116,-3.164328657314629,-3.215430861723447,-3.2665330661322645,-3.317635270541082,-3.3687374749498997,-3.4198396793587174,-3.470941883767535,-3.5220440881763526,-3.5731462925851702,-3.624248496993988,-3.6753507014028055,-3.726452905811623,-3.7775551102204408,-3.8286573146292584,-3.879759519038076,-3.9308617234468937,-3.9819639278557113,-4.033066132264529,-4.084168336673347,-4.135270541082164,-4.186372745490982,-4.2374749498997994,-4.2885771543086175,-4.339679358717435,-4.390781563126253,-4.44188376753507,-4.492985971943888,-4.544088176352705,-4.595190380761523,-4.6462925851703405,-4.697394789579159,-4.748496993987976,-4.799599198396794,-4.850701402805611,-4.901803607214429,-4.952905811623246,-5.004008016032064,-5.0551102204408815,-5.1062124248497,-5.157314629258517,-5.208416833667335,-5.259519038076152,-5.31062124248497,-5.361723446893787,-5.412825651302605,-5.463927855711423,-5.515030060120241,-5.566132264529058,-5.617234468937876,-5.668336673346693,-5.719438877755511,-5.770541082164328,-5.8216432865731464,-5.872745490981964,-5.923847695390782,-5.974949899799599,-6.026052104208417,-6.077154308617234,-6.128256513026052,-6.179358717434869,-6.2304609218436875,-6.281563126252505,-6.332665330661323,-6.38376753507014,-6.434869739478958,-6.485971943887775,-6.537074148296593,-6.5881763527054105,-6.6392785571142285,-6.690380761523046,-6.741482965931864,-6.792585170340681,-6.843687374749499,-6.894789579158316,-6.945891783567134,-6.9969939879759515,-7.04809619238477,-7.099198396793587,-7.150300601202405,-7.201402805611222,-7.25250501002004,-7.303607214428857,-7.354709418837675,-7.405811623246493,-7.456913827655311,-7.508016032064128,-7.559118236472946,-7.610220440881764,-7.661322645290581,-7.712424849699399,-7.763527054108216,-7.8146292585170345,-7.865731462925852,-7.91683366733467,-7.967935871743487,-8.019038076152304,-8.070140280561123,-8.12124248496994,-8.172344689378757,-8.223446893787575,-8.274549098196394,-8.32565130260521,-8.376753507014028,-8.427855711422845,-8.478957915831664,-8.530060120240481,-8.581162324649299,-8.632264529058116,-8.683366733466935,-8.734468937875752,-8.785571142284569,-8.836673346693386,-8.887775551102205,-8.938877755511022,-8.98997995991984,-9.041082164328657,-9.092184368737476,-9.143286573146293,-9.19438877755511,-9.245490981963927,-9.296593186372746,-9.347695390781563,-9.39879759519038,-9.449899799599198,-9.501002004008017,-9.552104208416834,-9.603206412825651,-9.654308617234468,-9.705410821643287,-9.756513026052104,-9.807615230460922,-9.858717434869739,-9.909819639278558,-9.960921843687375,-10.012024048096192,-10.06312625250501,-10.114228456913828,-10.165330661322646,-10.216432865731463,-10.26753507014028,-10.318637274549099,-10.369739478957916,-10.420841683366733,-10.47194388777555,-10.52304609218437,-10.574148296593187,-10.625250501002004,-10.676352705410821,-10.72745490981964,-10.778557114228457,-10.829659318637274,-10.880761523046091,-10.93186372745491,-10.982965931863728,-11.034068136272545,-11.085170340681362,-11.136272545090181,-11.187374749498998,-11.238476953907815,-11.289579158316633,-11.340681362725451,-11.391783567134269,-11.442885771543086,-11.493987975951903,-11.545090180360722,-11.59619238476954,-11.647294589178356,-11.698396793587174,-11.749498997995993,-11.80060120240481,-11.851703406813627,-11.902805611222444,-11.953907815631263,-12.00501002004008,-12.056112224448897,-12.107214428857715,-12.158316633266534,-12.20941883767535,-12.260521042084168,-12.311623246492985,-12.362725450901804,-12.413827655310621,-12.464929859719438,-12.516032064128256,-12.567134268537075,-12.618236472945892,-12.669338677354709,-12.720440881763528,-12.771543086172345,-12.822645290581162,-12.87374749498998,-12.924849699398798,-12.975951903807616,-13.027054108216433,-13.07815631262525,-13.129258517034069,-13.180360721442886,-13.231462925851703,-13.28256513026052,-13.33366733466934,-13.384769539078157,-13.435871743486974,-13.486973947895791,-13.53807615230461,-13.589178356713427,-13.640280561122244,-13.691382765531062,-13.74248496993988,-13.793587174348698,-13.844689378757515,-13.895791583166332,-13.946893787575151,-13.997995991983968,-14.049098196392785,-14.100200400801603,-14.151302605210422,-14.202404809619239,-14.253507014028056,-14.304609218436873,-14.355711422845692,-14.40681362725451,-14.457915831663327,-14.509018036072144,-14.560120240480963,-14.61122244488978,-14.662324649298597,-14.713426853707414,-14.764529058116233,-14.81563126252505,-14.866733466933868,-14.917835671342685,-14.968937875751504,-15.02004008016032,-15.071142284569138,-15.122244488977955,-15.173346693386774,-15.224448897795591,-15.275551102204409,-15.326653306613226,-15.377755511022045,-15.428857715430862,-15.47995991983968,-15.531062124248496,-15.582164328657315,-15.633266533066132,-15.68436873747495,-15.735470941883767,-15.786573146292586,-15.837675350701403,-15.88877755511022,-15.939879759519037,-15.990981963927856,-16.04208416833667,-16.093186372745492,-16.14428857715431,-16.195390781563127,-16.246492985971944,-16.29759519038076,-16.34869739478958,-16.399799599198396,-16.450901803607213,-16.502004008016034,-16.55310621242485,-16.604208416833668,-16.655310621242485,-16.706412825651302,-16.75751503006012,-16.808617234468937,-16.859719438877754,-16.910821643286575,-16.96192384769539,-17.01302605210421,-17.064128256513026,-17.115230460921843,-17.16633266533066,-17.217434869739478,-17.268537074148295,-17.319639278557116,-17.370741482965933,-17.42184368737475,-17.472945891783567,-17.524048096192384,-17.5751503006012,-17.62625250501002,-17.677354709418836,-17.728456913827657,-17.779559118236474,-17.83066132264529,-17.881763527054108,-17.932865731462925,-17.983967935871743,-18.03507014028056,-18.08617234468938,-18.137274549098198,-18.188376753507015,-18.239478957915832,-18.29058116232465,-18.341683366733466,-18.392785571142284,-18.4438877755511,-18.49498997995992,-18.54609218436874,-18.597194388777556,-18.648296593186373,-18.69939879759519,-18.750501002004007,-18.801603206412825,-18.852705410821642,-18.903807615230463,-18.95490981963928,-19.006012024048097,-19.057114228456914,-19.10821643286573,-19.15931863727455,-19.210420841683366,-19.261523046092183,-19.312625250501004,-19.36372745490982,-19.414829659318638,-19.465931863727455,-19.517034068136272,-19.56813627254509,-19.619238476953907,-19.670340681362724,-19.721442885771545,-19.772545090180362,-19.82364729458918,-19.874749498997996,-19.925851703406813,-19.97695390781563,-20.028056112224448,-20.079158316633265,-20.130260521042086,-20.181362725450903,-20.23246492985972,-20.283567134268537,-20.334669338677354,-20.38577154308617,-20.43687374749499,-20.487975951903806,-20.539078156312627,-20.590180360721444,-20.64128256513026,-20.69238476953908,-20.743486973947896,-20.794589178356713,-20.84569138276553,-20.896793587174347,-20.947895791583168,-20.998997995991985,-21.050100200400802,-21.10120240480962,-21.152304609218437,-21.203406813627254,-21.25450901803607,-21.305611222444888,-21.35671342685371,-21.407815631262526,-21.458917835671343,-21.51002004008016,-21.561122244488978,-21.612224448897795,-21.663326653306612,-21.71442885771543,-21.76553106212425,-21.816633266533067,-21.867735470941884,-21.9188376753507,-21.96993987975952,-22.021042084168336,-22.072144288577153,-22.12324649298597,-22.17434869739479,-22.225450901803608,-22.276553106212425,-22.327655310621243,-22.37875751503006,-22.429859719438877,-22.480961923847694,-22.53206412825651,-22.583166332665332,-22.63426853707415,-22.685370741482966,-22.736472945891784,-22.7875751503006,-22.838677354709418,-22.889779559118235,-22.940881763527056,-22.991983967935873,-23.04308617234469,-23.094188376753507,-23.145290581162325,-23.196392785571142,-23.24749498997996,-23.298597194388776,-23.349699398797597,-23.400801603206414,-23.45190380761523,-23.50300601202405,-23.554108216432866,-23.605210420841683,-23.6563126252505,-23.707414829659317,-23.758517034068138,-23.809619238476955,-23.860721442885772,-23.91182364729459,-23.962925851703407,-24.014028056112224,-24.06513026052104,-24.11623246492986,-24.16733466933868,-24.218436873747496,-24.269539078156313,-24.32064128256513,-24.371743486973948,-24.422845691382765,-24.473947895791582,-24.5250501002004,-24.57615230460922,-24.627254509018037,-24.678356713426854,-24.72945891783567,-24.78056112224449,-24.831663326653306,-24.882765531062123,-24.93386773547094,-24.98496993987976,-25.03607214428858,-25.087174348697395,-25.138276553106213,-25.18937875751503,-25.240480961923847,-25.291583166332664,-25.34268537074148,-25.393787575150302,-25.44488977955912,-25.495991983967937,-25.547094188376754,-25.59819639278557,-25.649298597194388,-25.700400801603205,-25.751503006012022,-25.802605210420843,-25.85370741482966,-25.904809619238478,-25.955911823647295,-26.007014028056112,-26.05811623246493,-26.109218436873746,-26.160320641282564,-26.211422845691384,-26.2625250501002,-26.31362725450902,-26.364729458917836,-26.415831663326653,-26.46693386773547,-26.518036072144287,-26.569138276553105,-26.620240480961925,-26.671342685370742,-26.72244488977956,-26.773547094188377,-26.824649298597194,-26.87575150300601,-26.92685370741483,-26.977955911823646,-27.029058116232466,-27.080160320641284,-27.1312625250501,-27.182364729458918,-27.233466933867735,-27.284569138276552,-27.33567134268537,-27.386773547094187,-27.437875751503007,-27.488977955911825,-27.54008016032064,-27.59118236472946,-27.642284569138276,-27.693386773547093,-27.74448897795591,-27.795591182364728,-27.84669338677355,-27.897795591182366,-27.948897795591183,-28.0]}
},{}],17:[function(require,module,exports){
module.exports={"expected":[0.0004069520174449589,0.00030880041052359816,0.00023316740767145548,0.00017519010684690845,0.00013097839189404574,9.743944286111578e-5,7.212931977767867e-5,5.312852427110615e-5,3.8938536217875765e-5,2.8396488089280856e-5,2.0605354012051346e-5,1.4877273939379776e-5,1.0687889638156806e-5,7.63982593114639e-6,5.4336984887703195e-6,3.845261937719896e-6,2.7075249826049197e-6,1.8968503653673572e-6,1.3222260450349212e-6,9.170403090153074e-7,6.328187544487037e-7,4.344868465437044e-7,2.968100077298704e-7,2.0173597884028895e-7,1.3642358123055085e-7,9.178996530798272e-8,6.144677555864793e-8,4.092603121892798e-8,2.7120354419532912e-8,1.7880715282845406e-8,1.1729158564367383e-8,7.654907661219912e-9,4.970532428875517e-9,3.21110487009534e-9,2.0639230082070517e-9,1.3198323239956759e-9,8.397096935221856e-10,5.315249042120435e-10,3.3473494460328945e-10,2.0972994403732317e-10,1.3073768224187017e-10,8.108137439998144e-11,5.0028842768037197e-11,3.0711280838346554e-11,1.8756535597298123e-11,1.1396819700661659e-11,6.889540245191615e-12,4.1435396146930954e-12,2.4792860696283503e-12,1.475893086464987e-12,8.740887136333538e-13,5.150243298634842e-13,3.019053991051736e-13,1.7606953430751179e-13,1.0215675091765985e-13,5.896832403244509e-14,3.3864035220409914e-14,1.9347560287237693e-14,1.0997163300256669e-14,6.218727172807004e-15,3.4985502270657246e-15,1.958122832584274e-15,1.090326084191459e-15,6.040000593806946e-16,3.3287496921182207e-16,1.8251071150036466e-16,9.955386662422028e-17,5.402440203382401e-17,2.9166437395889326e-17,1.5665270876585617e-17,8.370532401470611e-18,4.449676658499209e-18,2.353225709479825e-18,1.2381066179968515e-18,6.480543275196986e-19,3.37460762805542e-19,1.7482085896130724e-19,9.0099196880513e-20,4.619616349053602e-20,2.3563936473681065e-20,1.195766418140062e-20,6.036720623815567e-21,3.0318776061492074e-21,1.5148783924775957e-21,7.53007075207206e-22,3.723704346332989e-22,1.8319172475630533e-22,8.96583452245e-23,4.365454672618668e-23,2.1145688942502618e-23,1.0189842913095602e-23,4.885017675558818e-24,2.329793901660196e-24,1.1054046875186637e-24,5.217677799376089e-25,2.4501072744474174e-25,1.1445758142745905e-25,5.319311117471028e-26,2.4593329438180003e-26,1.1311758386309712e-26,5.175991154481656e-27,2.3561736915389997e-27,1.0670166959586616e-27,4.807120751362933e-28,2.1545100496618735e-28,9.606417779473302e-29,4.2611188707684375e-29,1.8803333465390279e-29,8.254577582797946e-30,3.60498497643939e-30,1.5662477516618248e-30,6.769641303624757e-31,2.9108434839099897e-31,1.245144791492877e-31,5.298689544583763e-32,2.2431820566531743e-32,9.447302388493715e-33,3.958204030009263e-33,1.649815676243747e-33,6.840996844408715e-34,2.8219537923705703e-34,1.1580485894853452e-34,4.7276996262002085e-35,1.9200786449962894e-35,7.757719036734376e-36,3.118134224106854e-36,1.2468124807570583e-36,4.959671350814367e-37,1.962681961536775e-37,7.726665102714145e-38,3.0260717989471524e-38,1.1789929441483015e-38,4.5697020235964236e-39,1.7620130391753134e-39,6.758880654393403e-40,2.5791982653136667e-40,9.791265713127527e-41,3.6977451286929926e-41,1.38924554122478e-41,5.192360347502481e-42,1.930608833710873e-42,7.1411356468197484e-43,2.627747825633363e-43,9.619297997005903e-44,3.503049279624802e-44,1.2690892757948307e-44,4.573840838989298e-45,1.639882595237345e-45,5.849075002102657e-46,2.075411605915702e-46,7.325947500154593e-47,2.572561514758216e-47,8.98690263123362e-48,3.123176325769533e-48,1.0797546191528083e-48,3.7136043952120595e-49,1.2705978194845145e-49,4.324763668524245e-50,1.4643954298513094e-50,4.9328279331769433e-51,1.6530085237512948e-51,5.510558950993248e-52,1.827500716965935e-52,6.029214211366873e-53,1.9788142980659422e-53,6.460861726957169e-54,2.098538056564146e-54,6.780850424902572e-55,2.1796778414571143e-55,6.970135188691915e-56,2.217332185168073e-56,7.017152387926795e-57,2.209182346521472e-57,6.918989188053062e-58,2.155728656884865e-58,6.681682235703168e-59,2.0602396732788834e-59,6.319603135958059e-60,1.9284213239983803e-60,5.8540177108825815e-61,1.767852617245191e-61,5.3110198760726095e-62,1.5872654966690278e-62,4.7191190670602553e-63,1.3957638218173832e-63,4.106790190051375e-64,1.2020778803260624e-64,3.5002748031675185e-65,1.0139372072529822e-65,2.9218592920255447e-66,8.376195251127996e-67,2.3887653019660374e-67,6.77702841028592e-68,1.912688315314432e-68,5.370171039220693e-69,1.4999299870219197e-69,4.1676645472660586e-70,1.1520023484220147e-70,3.1677635523616488e-71,8.665445181087392e-72,2.3581296228802644e-72,6.38385607475772e-73,1.7192422091994816e-73,4.606059608098199e-74,1.2276102371050063e-74,3.2548415777675243e-75,8.584945917498323e-76,2.2525973865793356e-76,5.879871591022099e-77,1.5268286873990846e-77,3.944127404995499e-78,1.0135604720658516e-78,2.5911135932630047e-79,6.5896333417042664e-80,1.6671474451276938e-80,4.195895743456831e-81,1.0505415566765309e-81,2.616613692909695e-82,6.483414127237157e-83,1.5981062569043581e-83,3.918729013468749e-84,9.559220091502374e-85,2.319729228058576e-85,5.600021451287076e-86,1.3448678357608583e-86,3.212972452846706e-87,7.636103997725778e-88,1.8054026002085545e-88,4.2463290908514946e-89,9.935518828936977e-90,2.3126224075643906e-90,5.354958946193162e-91,1.233515926081986e-91,2.826640240413558e-92,6.443672162482523e-93,1.461279935578888e-93,3.296631880101846e-94,7.398513980736485e-95,1.6517926100499742e-95,3.668626325192983e-96,8.105659222920772e-97,1.7815994620057062e-97,3.895548701442876e-98,8.473522805426765e-99,1.833564247356932e-99,3.946980607793728e-100,8.452215294562932e-101,1.8005814580547886e-101,3.815852931016677e-102,8.044648658868099e-103,1.687171000606408e-103,3.5200404792219427e-104,7.305883068406998e-105,1.5084615635463995e-105,3.0983624565075837e-106,6.330916788479451e-107,1.2868779796102312e-107,2.602222838141164e-108,5.234653256419727e-109,1.0475328369288605e-109,2.0853724606942972e-110,4.129865000087872e-111,8.136249937002383e-112,1.5945894377102218e-112,3.10892061698849e-113,6.029849920504063e-114,1.1634278763456433e-114,2.2331016546353567e-115,4.263964295100973e-116,8.099433366833788e-117,1.5304942389919152e-117,2.8770321832436715e-118,5.38014119586038e-119,1.0008719853089452e-119,1.8522485968513478e-120,3.410011716851408e-121,6.245228006248416e-122,1.1378277769184871e-122,2.062246360100754e-123,3.7182648097191273e-124,6.669231909121041e-125,1.190000190019252e-125,2.1122918658321968e-126,3.7298939461189954e-127,6.55201190582923e-128,1.1449551813572501e-128,1.9903886528863622e-129,3.4420950294548867e-130,5.921658680096289e-131,1.0134431938492682e-131,1.7254045977827832e-132,2.9222540639917503e-133,4.923573771204867e-134,8.252363773595678e-135,1.3759786434586518e-135,2.2823403919799092e-136,3.7660363884120777e-137,6.181928239372808e-138,1.009482368375975e-138,1.639867757862651e-139,2.6500508447176734e-140,4.2602477531450275e-141,6.813194007335218e-142,1.0839316205715835e-142,1.715490140785468e-143,2.7009077951949056e-144,4.230254167911242e-145,6.591106338951967e-146,1.0216104075875978e-146,1.5752424749581227e-147,2.416265287722357e-148,3.687031887688186e-149,5.5968572701632e-150,8.45174938927003e-151,1.2696499882562672e-151,1.897389181931103e-152,2.820744918484425e-153,4.1716338074499434e-154,6.137386792539496e-155,8.982469374562578e-156,1.3078047591455247e-156,1.8941962921382626e-157,2.729241298566254e-158,3.9119541250585265e-159,5.578024559942195e-160,7.912285042839587e-161,1.1164987569663275e-161,1.5672900052981506e-162,2.1886447204398016e-163,3.040436533316108e-164,4.201761219500674e-165,5.776456821994473e-166,7.899987710827292e-167,1.0747959115379127e-167,1.4546559446148643e-168,1.9585255498192446e-169,2.6232087768107392e-170,3.495192636932285e-171,4.632804851718948e-172,6.108738180211849e-173,8.012971849789523e-174,1.0456113963632521e-174,1.3573178807909005e-175,1.7527799209926166e-176,2.251685604304379e-177,2.877548428428171e-178,3.6582387523402434e-179,4.6265360544900824e-180,5.820688289886944e-181,7.284960594127522e-182,9.070151276950142e-183,1.123404863678311e-183,1.3841797814633117e-184,1.6966142940782062e-185,2.068750650388627e-186,2.509386551621946e-187,3.028038301015806e-188,3.634875403323243e-189,4.340622795012782e-190,5.156427380633766e-191,6.093686298789168e-192,7.1638353555634535e-193,8.378097344702397e-194,9.747191507914714e-195,1.128100714412254e-195,1.2988246303763505e-196,1.487604253573644e-197,1.6949564705222515e-198,1.92116168705598e-199,2.1662246985556886e-200,2.429837866301135e-201,2.711348127866707e-202,3.009729420297586e-203,3.323562082565399e-204,3.6510207213333086e-205,3.989871867087531e-206,4.337482515559504e-207,4.690840345422251e-208,5.046586035108683e-209,5.401057681074697e-210,5.750346862731452e-211,6.090365424607789e-212,6.416921575751168e-213,6.72580346287582e-214,7.012867980505579e-215,7.274132260301355e-216,7.505865052344547e-217,7.704675088925854e-218,7.86759351712942e-219,7.992147604962618e-220,8.076423165718956e-221,8.119113498775943e-222,8.119553098199032e-223,8.077734913872202e-224,7.99431053946945e-225,7.870573320249197e-226,7.708424992728173e-227,7.510327058813712e-228,7.2792386319265e-229,7.018542947881118e-230,6.731965089273287e-231,6.423483714748535e-232,6.097239705804446e-233,5.757444642267586e-234,5.40829189790433e-235,5.053872920460562e-236,4.698100941182103e-237,4.344643966939881e-238,3.99686846539295e-239,3.6577946833294914e-240,3.330064063429558e-241,3.0159187668895657e-242,2.7171928877198787e-243,2.4353145750051394e-244,2.1713179738725373e-245,1.9258636620772505e-246,1.6992661004315303e-247,1.4915265311976941e-248,1.3023697448516687e-249,1.1312831851648892e-250,9.775569658713777e-252,8.403235183740097e-253,7.185957672797357e-254,6.113029273254655e-255,5.1732322033381786e-256,4.355130142005384e-257,3.647320790216256e-258,3.038648315104645e-259,2.518375928347334e-260,2.076320137592426e-261,1.70294923031855e-262,1.3894493032919911e-263,1.1277616507241194e-264,9.10595592952262e-266,7.314208945275402e-267,5.844438197407338e-268,4.645706402305026e-269,3.673620783763198e-270,2.8898177445429907e-271,2.261414344103976e-272,1.7604487371567139e-273,1.363327415877709e-274,1.050293046271929e-275,8.049230082757893e-277,6.13665510409925e-278,4.654173880148415e-279,3.511454145482742e-280,2.63551140188718e-281,1.9677788623234864e-282,1.4615752143632584e-283,1.079939752454875e-284,7.938004830375714e-286,5.80439094339464e-287,4.222167046520137e-288,3.055256101163612e-289,2.1993445615656743e-290,1.5749702910091055e-291,1.1219794184861558e-292,7.951166355760435e-294,5.605446452819748e-295,3.9311805337796214e-296,2.7426423294582475e-297,1.9034819350163196e-298,1.314200829592931e-299,9.0262654343998e-301,6.167197320258209e-302,4.1918039314119937e-303,2.8343106219055974e-304,1.9064582052830642e-305,1.275676301842387e-306,8.49155124708792e-308,5.62298499039788e-309,3.704078222127e-310,2.4273181569163e-311,1.58236469051e-312,1.02617110094e-313,6.6201265e-315,4.2486025e-316,2.712434e-317,1.722683e-318,1.0884e-319,6.843e-321,4.3e-322,2.5e-323,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"x":[2.5,2.5511022044088176,2.6022044088176353,2.653306613226453,2.7044088176352705,2.755511022044088,2.806613226452906,2.8577154308617234,2.908817635270541,2.9599198396793587,3.0110220440881763,3.062124248496994,3.1132264529058116,3.164328657314629,3.215430861723447,3.2665330661322645,3.317635270541082,3.3687374749498997,3.4198396793587174,3.470941883767535,3.5220440881763526,3.5731462925851702,3.624248496993988,3.6753507014028055,3.726452905811623,3.7775551102204408,3.8286573146292584,3.879759519038076,3.9308617234468937,3.9819639278557113,4.033066132264529,4.084168336673347,4.135270541082164,4.186372745490982,4.2374749498997994,4.2885771543086175,4.339679358717435,4.390781563126253,4.44188376753507,4.492985971943888,4.544088176352705,4.595190380761523,4.6462925851703405,4.697394789579159,4.748496993987976,4.799599198396794,4.850701402805611,4.901803607214429,4.952905811623246,5.004008016032064,5.0551102204408815,5.1062124248497,5.157314629258517,5.208416833667335,5.259519038076152,5.31062124248497,5.361723446893787,5.412825651302605,5.463927855711423,5.515030060120241,5.566132264529058,5.617234468937876,5.668336673346693,5.719438877755511,5.770541082164328,5.8216432865731464,5.872745490981964,5.923847695390782,5.974949899799599,6.026052104208417,6.077154308617234,6.128256513026052,6.179358717434869,6.2304609218436875,6.281563126252505,6.332665330661323,6.38376753507014,6.434869739478958,6.485971943887775,6.537074148296593,6.5881763527054105,6.6392785571142285,6.690380761523046,6.741482965931864,6.792585170340681,6.843687374749499,6.894789579158316,6.945891783567134,6.9969939879759515,7.04809619238477,7.099198396793587,7.150300601202405,7.201402805611222,7.25250501002004,7.303607214428857,7.354709418837675,7.405811623246493,7.456913827655311,7.508016032064128,7.559118236472946,7.610220440881764,7.661322645290581,7.712424849699399,7.763527054108216,7.8146292585170345,7.865731462925852,7.91683366733467,7.967935871743487,8.019038076152304,8.070140280561123,8.12124248496994,8.172344689378757,8.223446893787575,8.274549098196394,8.32565130260521,8.376753507014028,8.427855711422845,8.478957915831664,8.530060120240481,8.581162324649299,8.632264529058116,8.683366733466935,8.734468937875752,8.785571142284569,8.836673346693386,8.887775551102205,8.938877755511022,8.98997995991984,9.041082164328657,9.092184368737476,9.143286573146293,9.19438877755511,9.245490981963927,9.296593186372746,9.347695390781563,9.39879759519038,9.449899799599198,9.501002004008017,9.552104208416834,9.603206412825651,9.654308617234468,9.705410821643287,9.756513026052104,9.807615230460922,9.858717434869739,9.909819639278558,9.960921843687375,10.012024048096192,10.06312625250501,10.114228456913828,10.165330661322646,10.216432865731463,10.26753507014028,10.318637274549099,10.369739478957916,10.420841683366733,10.47194388777555,10.52304609218437,10.574148296593187,10.625250501002004,10.676352705410821,10.72745490981964,10.778557114228457,10.829659318637274,10.880761523046091,10.93186372745491,10.982965931863728,11.034068136272545,11.085170340681362,11.136272545090181,11.187374749498998,11.238476953907815,11.289579158316633,11.340681362725451,11.391783567134269,11.442885771543086,11.493987975951903,11.545090180360722,11.59619238476954,11.647294589178356,11.698396793587174,11.749498997995993,11.80060120240481,11.851703406813627,11.902805611222444,11.953907815631263,12.00501002004008,12.056112224448897,12.107214428857715,12.158316633266534,12.20941883767535,12.260521042084168,12.311623246492985,12.362725450901804,12.413827655310621,12.464929859719438,12.516032064128256,12.567134268537075,12.618236472945892,12.669338677354709,12.720440881763528,12.771543086172345,12.822645290581162,12.87374749498998,12.924849699398798,12.975951903807616,13.027054108216433,13.07815631262525,13.129258517034069,13.180360721442886,13.231462925851703,13.28256513026052,13.33366733466934,13.384769539078157,13.435871743486974,13.486973947895791,13.53807615230461,13.589178356713427,13.640280561122244,13.691382765531062,13.74248496993988,13.793587174348698,13.844689378757515,13.895791583166332,13.946893787575151,13.997995991983968,14.049098196392785,14.100200400801603,14.151302605210422,14.202404809619239,14.253507014028056,14.304609218436873,14.355711422845692,14.40681362725451,14.457915831663327,14.509018036072144,14.560120240480963,14.61122244488978,14.662324649298597,14.713426853707414,14.764529058116233,14.81563126252505,14.866733466933868,14.917835671342685,14.968937875751504,15.02004008016032,15.071142284569138,15.122244488977955,15.173346693386774,15.224448897795591,15.275551102204409,15.326653306613226,15.377755511022045,15.428857715430862,15.47995991983968,15.531062124248496,15.582164328657315,15.633266533066132,15.68436873747495,15.735470941883767,15.786573146292586,15.837675350701403,15.88877755511022,15.939879759519037,15.990981963927856,16.04208416833667,16.093186372745492,16.14428857715431,16.195390781563127,16.246492985971944,16.29759519038076,16.34869739478958,16.399799599198396,16.450901803607213,16.502004008016034,16.55310621242485,16.604208416833668,16.655310621242485,16.706412825651302,16.75751503006012,16.808617234468937,16.859719438877754,16.910821643286575,16.96192384769539,17.01302605210421,17.064128256513026,17.115230460921843,17.16633266533066,17.217434869739478,17.268537074148295,17.319639278557116,17.370741482965933,17.42184368737475,17.472945891783567,17.524048096192384,17.5751503006012,17.62625250501002,17.677354709418836,17.728456913827657,17.779559118236474,17.83066132264529,17.881763527054108,17.932865731462925,17.983967935871743,18.03507014028056,18.08617234468938,18.137274549098198,18.188376753507015,18.239478957915832,18.29058116232465,18.341683366733466,18.392785571142284,18.4438877755511,18.49498997995992,18.54609218436874,18.597194388777556,18.648296593186373,18.69939879759519,18.750501002004007,18.801603206412825,18.852705410821642,18.903807615230463,18.95490981963928,19.006012024048097,19.057114228456914,19.10821643286573,19.15931863727455,19.210420841683366,19.261523046092183,19.312625250501004,19.36372745490982,19.414829659318638,19.465931863727455,19.517034068136272,19.56813627254509,19.619238476953907,19.670340681362724,19.721442885771545,19.772545090180362,19.82364729458918,19.874749498997996,19.925851703406813,19.97695390781563,20.028056112224448,20.079158316633265,20.130260521042086,20.181362725450903,20.23246492985972,20.283567134268537,20.334669338677354,20.38577154308617,20.43687374749499,20.487975951903806,20.539078156312627,20.590180360721444,20.64128256513026,20.69238476953908,20.743486973947896,20.794589178356713,20.84569138276553,20.896793587174347,20.947895791583168,20.998997995991985,21.050100200400802,21.10120240480962,21.152304609218437,21.203406813627254,21.25450901803607,21.305611222444888,21.35671342685371,21.407815631262526,21.458917835671343,21.51002004008016,21.561122244488978,21.612224448897795,21.663326653306612,21.71442885771543,21.76553106212425,21.816633266533067,21.867735470941884,21.9188376753507,21.96993987975952,22.021042084168336,22.072144288577153,22.12324649298597,22.17434869739479,22.225450901803608,22.276553106212425,22.327655310621243,22.37875751503006,22.429859719438877,22.480961923847694,22.53206412825651,22.583166332665332,22.63426853707415,22.685370741482966,22.736472945891784,22.7875751503006,22.838677354709418,22.889779559118235,22.940881763527056,22.991983967935873,23.04308617234469,23.094188376753507,23.145290581162325,23.196392785571142,23.24749498997996,23.298597194388776,23.349699398797597,23.400801603206414,23.45190380761523,23.50300601202405,23.554108216432866,23.605210420841683,23.6563126252505,23.707414829659317,23.758517034068138,23.809619238476955,23.860721442885772,23.91182364729459,23.962925851703407,24.014028056112224,24.06513026052104,24.11623246492986,24.16733466933868,24.218436873747496,24.269539078156313,24.32064128256513,24.371743486973948,24.422845691382765,24.473947895791582,24.5250501002004,24.57615230460922,24.627254509018037,24.678356713426854,24.72945891783567,24.78056112224449,24.831663326653306,24.882765531062123,24.93386773547094,24.98496993987976,25.03607214428858,25.087174348697395,25.138276553106213,25.18937875751503,25.240480961923847,25.291583166332664,25.34268537074148,25.393787575150302,25.44488977955912,25.495991983967937,25.547094188376754,25.59819639278557,25.649298597194388,25.700400801603205,25.751503006012022,25.802605210420843,25.85370741482966,25.904809619238478,25.955911823647295,26.007014028056112,26.05811623246493,26.109218436873746,26.160320641282564,26.211422845691384,26.2625250501002,26.31362725450902,26.364729458917836,26.415831663326653,26.46693386773547,26.518036072144287,26.569138276553105,26.620240480961925,26.671342685370742,26.72244488977956,26.773547094188377,26.824649298597194,26.87575150300601,26.92685370741483,26.977955911823646,27.029058116232466,27.080160320641284,27.1312625250501,27.182364729458918,27.233466933867735,27.284569138276552,27.33567134268537,27.386773547094187,27.437875751503007,27.488977955911825,27.54008016032064,27.59118236472946,27.642284569138276,27.693386773547093,27.74448897795591,27.795591182364728,27.84669338677355,27.897795591182366,27.948897795591183,28.0]}
},{}],18:[function(require,module,exports){
module.exports={"expected":[1.9999999999984626,1.9999999999997868,1.9999999999999725,1.9999999999999967,1.9999999999999996,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0],"x":[-5.0,-5.190380761523046,-5.380761523046092,-5.571142284569138,-5.761523046092185,-5.95190380761523,-6.142284569138276,-6.332665330661323,-6.5230460921843685,-6.713426853707415,-6.903807615230461,-7.094188376753507,-7.284569138276553,-7.474949899799599,-7.6653306613226455,-7.855711422845691,-8.046092184368737,-8.236472945891784,-8.42685370741483,-8.617234468937875,-8.807615230460922,-8.997995991983968,-9.188376753507015,-9.37875751503006,-9.569138276553106,-9.759519038076153,-9.949899799599198,-10.140280561122244,-10.330661322645291,-10.521042084168336,-10.711422845691382,-10.901803607214429,-11.092184368737476,-11.28256513026052,-11.472945891783567,-11.663326653306614,-11.853707414829659,-12.044088176352705,-12.234468937875752,-12.424849699398798,-12.615230460921843,-12.80561122244489,-12.995991983967937,-13.186372745490981,-13.376753507014028,-13.567134268537075,-13.75751503006012,-13.947895791583166,-14.138276553106213,-14.32865731462926,-14.519038076152304,-14.70941883767535,-14.899799599198397,-15.090180360721442,-15.280561122244489,-15.470941883767535,-15.661322645290582,-15.851703406813627,-16.04208416833667,-16.23246492985972,-16.422845691382765,-16.613226452905813,-16.803607214428858,-16.993987975951903,-17.18436873747495,-17.374749498997996,-17.56513026052104,-17.75551102204409,-17.945891783567134,-18.13627254509018,-18.326653306613228,-18.517034068136272,-18.707414829659317,-18.897795591182366,-19.08817635270541,-19.278557114228455,-19.468937875751504,-19.65931863727455,-19.849699398797597,-20.04008016032064,-20.230460921843687,-20.420841683366735,-20.61122244488978,-20.801603206412825,-20.991983967935873,-21.182364729458918,-21.372745490981963,-21.56312625250501,-21.753507014028056,-21.9438877755511,-22.13426853707415,-22.324649298597194,-22.51503006012024,-22.705410821643287,-22.895791583166332,-23.08617234468938,-23.276553106212425,-23.46693386773547,-23.65731462925852,-23.847695390781563,-24.03807615230461,-24.228456913827657,-24.4188376753507,-24.609218436873746,-24.799599198396795,-24.98997995991984,-25.180360721442884,-25.370741482965933,-25.561122244488978,-25.751503006012022,-25.94188376753507,-26.132264529058116,-26.322645290581164,-26.51302605210421,-26.703406813627254,-26.893787575150302,-27.084168336673347,-27.274549098196392,-27.46492985971944,-27.655310621242485,-27.84569138276553,-28.03607214428858,-28.226452905811623,-28.416833667334668,-28.607214428857716,-28.79759519038076,-28.987975951903806,-29.178356713426854,-29.3687374749499,-29.559118236472944,-29.749498997995993,-29.939879759519037,-30.130260521042086,-30.32064128256513,-30.511022044088175,-30.701402805611224,-30.89178356713427,-31.082164328657313,-31.272545090180362,-31.462925851703407,-31.65330661322645,-31.8436873747495,-32.034068136272545,-32.22444889779559,-32.414829659318634,-32.605210420841686,-32.79559118236473,-32.985971943887776,-33.17635270541082,-33.366733466933866,-33.55711422845691,-33.74749498997996,-33.93787575150301,-34.12825651302605,-34.3186372745491,-34.50901803607214,-34.699398797595194,-34.88977955911824,-35.08016032064128,-35.27054108216433,-35.46092184368737,-35.65130260521042,-35.84168336673347,-36.032064128256515,-36.22244488977956,-36.412825651302605,-36.60320641282565,-36.793587174348694,-36.983967935871746,-37.17434869739479,-37.364729458917836,-37.55511022044088,-37.745490981963925,-37.93587174348698,-38.12625250501002,-38.31663326653307,-38.50701402805611,-38.69739478957916,-38.8877755511022,-39.078156312625254,-39.2685370741483,-39.45891783567134,-39.64929859719439,-39.83967935871743,-40.03006012024048,-40.22044088176353,-40.410821643286575,-40.60120240480962,-40.791583166332664,-40.98196392785571,-41.17234468937876,-41.362725450901806,-41.55310621242485,-41.743486973947896,-41.93386773547094,-42.124248496993985,-42.31462925851704,-42.50501002004008,-42.69539078156313,-42.88577154308617,-43.07615230460922,-43.26653306613226,-43.45691382765531,-43.64729458917836,-43.8376753507014,-44.02805611222445,-44.21843687374749,-44.408817635270545,-44.59919839679359,-44.789579158316634,-44.97995991983968,-45.170340681362724,-45.36072144288577,-45.55110220440882,-45.741482965931866,-45.93186372745491,-46.122244488977955,-46.312625250501,-46.503006012024045,-46.6933867735471,-46.88376753507014,-47.07414829659319,-47.26452905811623,-47.454909819639276,-47.64529058116233,-47.83567134268537,-48.02605210420842,-48.21643286573146,-48.40681362725451,-48.59719438877755,-48.787575150300604,-48.97795591182365,-49.168336673346694,-49.35871743486974,-49.549098196392784,-49.73947895791583,-49.92985971943888,-50.120240480961925,-50.31062124248497,-50.501002004008015,-50.69138276553106,-50.88176352705411,-51.07214428857716,-51.2625250501002,-51.452905811623246,-51.64328657314629,-51.833667334669336,-52.02404809619239,-52.21442885771543,-52.40480961923848,-52.59519038076152,-52.78557114228457,-52.97595190380761,-53.166332665330664,-53.35671342685371,-53.547094188376754,-53.7374749498998,-53.92785571142284,-54.11823647294589,-54.30861723446894,-54.498997995991985,-54.68937875751503,-54.879759519038075,-55.07014028056112,-55.26052104208417,-55.450901803607216,-55.64128256513026,-55.831663326653306,-56.02204408817635,-56.212424849699396,-56.40280561122245,-56.59318637274549,-56.78356713426854,-56.97394789579158,-57.16432865731463,-57.35470941883767,-57.545090180360724,-57.73547094188377,-57.92585170340681,-58.11623246492986,-58.3066132264529,-58.496993987975955,-58.687374749499,-58.877755511022045,-59.06813627254509,-59.258517034068134,-59.44889779559118,-59.63927855711423,-59.829659318637276,-60.02004008016032,-60.210420841683366,-60.40080160320641,-60.591182364729455,-60.78156312625251,-60.97194388777555,-61.1623246492986,-61.35270541082164,-61.54308617234469,-61.73346693386774,-61.92384769539078,-62.11422845691383,-62.30460921843687,-62.49498997995992,-62.68537074148296,-62.875751503006015,-63.06613226452906,-63.256513026052104,-63.44689378757515,-63.637274549098194,-63.82765531062124,-64.01803607214428,-64.20841683366733,-64.39879759519039,-64.58917835671343,-64.77955911823648,-64.96993987975952,-65.16032064128257,-65.35070140280561,-65.54108216432866,-65.7314629258517,-65.92184368737475,-66.11222444889779,-66.30260521042084,-66.49298597194388,-66.68336673346694,-66.87374749498998,-67.06412825651303,-67.25450901803607,-67.44488977955912,-67.63527054108216,-67.82565130260521,-68.01603206412825,-68.2064128256513,-68.39679358717434,-68.58717434869739,-68.77755511022045,-68.96793587174349,-69.15831663326654,-69.34869739478958,-69.53907815631263,-69.72945891783567,-69.91983967935872,-70.11022044088176,-70.3006012024048,-70.49098196392785,-70.6813627254509,-70.87174348697395,-71.062124248497,-71.25250501002004,-71.44288577154309,-71.63326653306613,-71.82364729458918,-72.01402805611222,-72.20440881763527,-72.39478957915831,-72.58517034068136,-72.7755511022044,-72.96593186372745,-73.15631262525051,-73.34669338677355,-73.5370741482966,-73.72745490981964,-73.91783567134269,-74.10821643286573,-74.29859719438878,-74.48897795591182,-74.67935871743487,-74.86973947895791,-75.06012024048096,-75.25050100200401,-75.44088176352706,-75.6312625250501,-75.82164328657315,-76.0120240480962,-76.20240480961924,-76.39278557114228,-76.58316633266533,-76.77354709418837,-76.96392785571142,-77.15430861723446,-77.34468937875752,-77.53507014028057,-77.72545090180361,-77.91583166332666,-78.1062124248497,-78.29659318637275,-78.48697394789579,-78.67735470941884,-78.86773547094188,-79.05811623246493,-79.24849699398797,-79.43887775551102,-79.62925851703407,-79.81963927855712,-80.01002004008016,-80.20040080160321,-80.39078156312625,-80.5811623246493,-80.77154308617234,-80.96192384769539,-81.15230460921843,-81.34268537074148,-81.53306613226452,-81.72344689378758,-81.91382765531063,-82.10420841683367,-82.29458917835672,-82.48496993987976,-82.6753507014028,-82.86573146292585,-83.0561122244489,-83.24649298597194,-83.43687374749499,-83.62725450901803,-83.81763527054109,-84.00801603206413,-84.19839679358718,-84.38877755511022,-84.57915831663327,-84.76953907815631,-84.95991983967936,-85.1503006012024,-85.34068136272545,-85.53106212424849,-85.72144288577154,-85.91182364729458,-86.10220440881764,-86.29258517034069,-86.48296593186373,-86.67334669338678,-86.86372745490982,-87.05410821643287,-87.24448897795591,-87.43486973947896,-87.625250501002,-87.81563126252505,-88.00601202404809,-88.19639278557115,-88.3867735470942,-88.57715430861724,-88.76753507014028,-88.95791583166333,-89.14829659318637,-89.33867735470942,-89.52905811623246,-89.71943887775551,-89.90981963927855,-90.1002004008016,-90.29058116232466,-90.4809619238477,-90.67134268537075,-90.86172344689379,-91.05210420841684,-91.24248496993988,-91.43286573146293,-91.62324649298597,-91.81362725450902,-92.00400801603206,-92.1943887775551,-92.38476953907815,-92.57515030060121,-92.76553106212425,-92.9559118236473,-93.14629258517034,-93.33667334669339,-93.52705410821643,-93.71743486973948,-93.90781563126252,-94.09819639278557,-94.28857715430861,-94.47895791583166,-94.66933867735472,-94.85971943887776,-95.0501002004008,-95.24048096192385,-95.4308617234469,-95.62124248496994,-95.81162324649299,-96.00200400801603,-96.19238476953907,-96.38276553106212,-96.57314629258516,-96.76352705410822,-96.95390781563127,-97.14428857715431,-97.33466933867736,-97.5250501002004,-97.71543086172345,-97.90581162324649,-98.09619238476954,-98.28657314629258,-98.47695390781563,-98.66733466933867,-98.85771543086172,-99.04809619238478,-99.23847695390782,-99.42885771543087,-99.61923847695391,-99.80961923847696,-100.0]}
},{}],19:[function(require,module,exports){
module.exports={"expected":[1.5374597944280351e-12,2.1310468082849912e-13,2.7506056996031658e-14,3.3057980933130337e-15,3.699188532464819e-16,3.853815758640912e-17,3.737699045144061e-18,3.37460762805542e-19,2.8361315881461315e-20,2.218675928371619e-21,1.6155022068110937e-22,1.094839839711932e-23,6.905694905209709e-25,4.053810753125472e-26,2.2146514900591615e-27,1.1259539648219047e-28,5.3271818333718415e-30,2.3454444427936862e-31,9.609334852661791e-33,3.663468866069502e-34,1.2996120530972905e-35,4.289914116042375e-37,1.3176170448693438e-38,3.76554734530175e-40,1.0012863916506838e-41,2.477269164170462e-43,5.702516075372072e-45,1.2213281752574489e-46,2.433689597214722e-48,4.511901992968226e-50,7.782350314283348e-52,1.2488600801373194e-53,1.8645076091263088e-55,2.5897486169416666e-57,3.346493964509367e-59,4.0230698968942104e-61,4.4994196291788086e-63,4.681481084513088e-65,4.531422201375211e-67,4.080440443336474e-69,3.4182021377023756e-71,2.663812666360916e-73,1.9311768324525036e-75,1.3024172372393823e-77,8.171191253503354e-80,4.7689776664967037e-82,2.5892113413840478e-84,1.307704848894711e-86,6.1439801212733176e-89,2.685255427945165e-91,1.0917296831795596e-93,4.1289194107320025e-96,1.4526052118879018e-98,4.753865558181889e-101,1.447213372050443e-103,4.0982924220963573e-106,1.0795839419105247e-108,2.6454005216252095e-111,6.029849920504063e-114,1.2784983626364918e-116,2.5215701812614096e-119,4.6261297339339035e-122,7.894763377842802e-125,1.2532385111216917e-127,1.850548337151627e-130,2.5417805117890703e-133,3.247472103294603e-136,3.85941500780623e-139,4.266435011117392e-142,4.387077984094474e-145,4.196151293895837e-148,3.733288177552179e-151,3.0895522322064156e-154,2.3782762835072733e-157,1.7029069499033686e-160,1.1341761744508301e-163,7.02635802521391e-167,4.048921650486047e-170,2.1702363061603777e-173,1.0820129643892877e-176,5.017818497340024e-180,2.164480871724483e-183,8.684567056554992e-187,3.241138023572343e-190,1.1251259597592336e-193,3.6329413184415094e-197,1.091110181423684e-200,3.0481140108034637e-204,7.920372031996691e-208,1.9143050665271568e-211,4.303554837762059e-215,8.998986618295336e-219,1.7502875505418087e-222,3.1664614776546048e-226,5.328285766422076e-230,8.339668804521544e-234,1.2141087968374867e-237,1.6440440102848418e-241,2.0706935920718285e-245,2.4258522915365034e-249,2.643373539477338e-253,2.6791557525803195e-257,2.525702548237453e-261,2.2146793035482692e-265,1.806273429043785e-269,1.3702497999345365e-273,9.668502733264994e-278,6.3454371693732674e-282,3.873524892272634e-286,2.1993445615656743e-290,1.161507354243482e-294,5.70547856265656e-299,2.6067733898161395e-303,1.107784381744049e-307,4.378724610968e-312,1.6098305e-316,5.504e-321,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"x":[5.0,5.190380761523046,5.380761523046092,5.571142284569138,5.761523046092185,5.95190380761523,6.142284569138276,6.332665330661323,6.5230460921843685,6.713426853707415,6.903807615230461,7.094188376753507,7.284569138276553,7.474949899799599,7.6653306613226455,7.855711422845691,8.046092184368737,8.236472945891784,8.42685370741483,8.617234468937875,8.807615230460922,8.997995991983968,9.188376753507015,9.37875751503006,9.569138276553106,9.759519038076153,9.949899799599198,10.140280561122244,10.330661322645291,10.521042084168336,10.711422845691382,10.901803607214429,11.092184368737476,11.28256513026052,11.472945891783567,11.663326653306614,11.853707414829659,12.044088176352705,12.234468937875752,12.424849699398798,12.615230460921843,12.80561122244489,12.995991983967937,13.186372745490981,13.376753507014028,13.567134268537075,13.75751503006012,13.947895791583166,14.138276553106213,14.32865731462926,14.519038076152304,14.70941883767535,14.899799599198397,15.090180360721442,15.280561122244489,15.470941883767535,15.661322645290582,15.851703406813627,16.04208416833667,16.23246492985972,16.422845691382765,16.613226452905813,16.803607214428858,16.993987975951903,17.18436873747495,17.374749498997996,17.56513026052104,17.75551102204409,17.945891783567134,18.13627254509018,18.326653306613228,18.517034068136272,18.707414829659317,18.897795591182366,19.08817635270541,19.278557114228455,19.468937875751504,19.65931863727455,19.849699398797597,20.04008016032064,20.230460921843687,20.420841683366735,20.61122244488978,20.801603206412825,20.991983967935873,21.182364729458918,21.372745490981963,21.56312625250501,21.753507014028056,21.9438877755511,22.13426853707415,22.324649298597194,22.51503006012024,22.705410821643287,22.895791583166332,23.08617234468938,23.276553106212425,23.46693386773547,23.65731462925852,23.847695390781563,24.03807615230461,24.228456913827657,24.4188376753507,24.609218436873746,24.799599198396795,24.98997995991984,25.180360721442884,25.370741482965933,25.561122244488978,25.751503006012022,25.94188376753507,26.132264529058116,26.322645290581164,26.51302605210421,26.703406813627254,26.893787575150302,27.084168336673347,27.274549098196392,27.46492985971944,27.655310621242485,27.84569138276553,28.03607214428858,28.226452905811623,28.416833667334668,28.607214428857716,28.79759519038076,28.987975951903806,29.178356713426854,29.3687374749499,29.559118236472944,29.749498997995993,29.939879759519037,30.130260521042086,30.32064128256513,30.511022044088175,30.701402805611224,30.89178356713427,31.082164328657313,31.272545090180362,31.462925851703407,31.65330661322645,31.8436873747495,32.034068136272545,32.22444889779559,32.414829659318634,32.605210420841686,32.79559118236473,32.985971943887776,33.17635270541082,33.366733466933866,33.55711422845691,33.74749498997996,33.93787575150301,34.12825651302605,34.3186372745491,34.50901803607214,34.699398797595194,34.88977955911824,35.08016032064128,35.27054108216433,35.46092184368737,35.65130260521042,35.84168336673347,36.032064128256515,36.22244488977956,36.412825651302605,36.60320641282565,36.793587174348694,36.983967935871746,37.17434869739479,37.364729458917836,37.55511022044088,37.745490981963925,37.93587174348698,38.12625250501002,38.31663326653307,38.50701402805611,38.69739478957916,38.8877755511022,39.078156312625254,39.2685370741483,39.45891783567134,39.64929859719439,39.83967935871743,40.03006012024048,40.22044088176353,40.410821643286575,40.60120240480962,40.791583166332664,40.98196392785571,41.17234468937876,41.362725450901806,41.55310621242485,41.743486973947896,41.93386773547094,42.124248496993985,42.31462925851704,42.50501002004008,42.69539078156313,42.88577154308617,43.07615230460922,43.26653306613226,43.45691382765531,43.64729458917836,43.8376753507014,44.02805611222445,44.21843687374749,44.408817635270545,44.59919839679359,44.789579158316634,44.97995991983968,45.170340681362724,45.36072144288577,45.55110220440882,45.741482965931866,45.93186372745491,46.122244488977955,46.312625250501,46.503006012024045,46.6933867735471,46.88376753507014,47.07414829659319,47.26452905811623,47.454909819639276,47.64529058116233,47.83567134268537,48.02605210420842,48.21643286573146,48.40681362725451,48.59719438877755,48.787575150300604,48.97795591182365,49.168336673346694,49.35871743486974,49.549098196392784,49.73947895791583,49.92985971943888,50.120240480961925,50.31062124248497,50.501002004008015,50.69138276553106,50.88176352705411,51.07214428857716,51.2625250501002,51.452905811623246,51.64328657314629,51.833667334669336,52.02404809619239,52.21442885771543,52.40480961923848,52.59519038076152,52.78557114228457,52.97595190380761,53.166332665330664,53.35671342685371,53.547094188376754,53.7374749498998,53.92785571142284,54.11823647294589,54.30861723446894,54.498997995991985,54.68937875751503,54.879759519038075,55.07014028056112,55.26052104208417,55.450901803607216,55.64128256513026,55.831663326653306,56.02204408817635,56.212424849699396,56.40280561122245,56.59318637274549,56.78356713426854,56.97394789579158,57.16432865731463,57.35470941883767,57.545090180360724,57.73547094188377,57.92585170340681,58.11623246492986,58.3066132264529,58.496993987975955,58.687374749499,58.877755511022045,59.06813627254509,59.258517034068134,59.44889779559118,59.63927855711423,59.829659318637276,60.02004008016032,60.210420841683366,60.40080160320641,60.591182364729455,60.78156312625251,60.97194388777555,61.1623246492986,61.35270541082164,61.54308617234469,61.73346693386774,61.92384769539078,62.11422845691383,62.30460921843687,62.49498997995992,62.68537074148296,62.875751503006015,63.06613226452906,63.256513026052104,63.44689378757515,63.637274549098194,63.82765531062124,64.01803607214428,64.20841683366733,64.39879759519039,64.58917835671343,64.77955911823648,64.96993987975952,65.16032064128257,65.35070140280561,65.54108216432866,65.7314629258517,65.92184368737475,66.11222444889779,66.30260521042084,66.49298597194388,66.68336673346694,66.87374749498998,67.06412825651303,67.25450901803607,67.44488977955912,67.63527054108216,67.82565130260521,68.01603206412825,68.2064128256513,68.39679358717434,68.58717434869739,68.77755511022045,68.96793587174349,69.15831663326654,69.34869739478958,69.53907815631263,69.72945891783567,69.91983967935872,70.11022044088176,70.3006012024048,70.49098196392785,70.6813627254509,70.87174348697395,71.062124248497,71.25250501002004,71.44288577154309,71.63326653306613,71.82364729458918,72.01402805611222,72.20440881763527,72.39478957915831,72.58517034068136,72.7755511022044,72.96593186372745,73.15631262525051,73.34669338677355,73.5370741482966,73.72745490981964,73.91783567134269,74.10821643286573,74.29859719438878,74.48897795591182,74.67935871743487,74.86973947895791,75.06012024048096,75.25050100200401,75.44088176352706,75.6312625250501,75.82164328657315,76.0120240480962,76.20240480961924,76.39278557114228,76.58316633266533,76.77354709418837,76.96392785571142,77.15430861723446,77.34468937875752,77.53507014028057,77.72545090180361,77.91583166332666,78.1062124248497,78.29659318637275,78.48697394789579,78.67735470941884,78.86773547094188,79.05811623246493,79.24849699398797,79.43887775551102,79.62925851703407,79.81963927855712,80.01002004008016,80.20040080160321,80.39078156312625,80.5811623246493,80.77154308617234,80.96192384769539,81.15230460921843,81.34268537074148,81.53306613226452,81.72344689378758,81.91382765531063,82.10420841683367,82.29458917835672,82.48496993987976,82.6753507014028,82.86573146292585,83.0561122244489,83.24649298597194,83.43687374749499,83.62725450901803,83.81763527054109,84.00801603206413,84.19839679358718,84.38877755511022,84.57915831663327,84.76953907815631,84.95991983967936,85.1503006012024,85.34068136272545,85.53106212424849,85.72144288577154,85.91182364729458,86.10220440881764,86.29258517034069,86.48296593186373,86.67334669338678,86.86372745490982,87.05410821643287,87.24448897795591,87.43486973947896,87.625250501002,87.81563126252505,88.00601202404809,88.19639278557115,88.3867735470942,88.57715430861724,88.76753507014028,88.95791583166333,89.14829659318637,89.33867735470942,89.52905811623246,89.71943887775551,89.90981963927855,90.1002004008016,90.29058116232466,90.4809619238477,90.67134268537075,90.86172344689379,91.05210420841684,91.24248496993988,91.43286573146293,91.62324649298597,91.81362725450902,92.00400801603206,92.1943887775551,92.38476953907815,92.57515030060121,92.76553106212425,92.9559118236473,93.14629258517034,93.33667334669339,93.52705410821643,93.71743486973948,93.90781563126252,94.09819639278557,94.28857715430861,94.47895791583166,94.66933867735472,94.85971943887776,95.0501002004008,95.24048096192385,95.4308617234469,95.62124248496994,95.81162324649299,96.00200400801603,96.19238476953907,96.38276553106212,96.57314629258516,96.76352705410822,96.95390781563127,97.14428857715431,97.33466933867736,97.5250501002004,97.71543086172345,97.90581162324649,98.09619238476954,98.28657314629258,98.47695390781563,98.66733466933867,98.85771543086172,99.04809619238478,99.23847695390782,99.42885771543087,99.61923847695391,99.80961923847696,100.0]}
},{}],20:[function(require,module,exports){
module.exports={"expected":[1.842700792949715,1.84435789101441,1.846001706047248,1.8476322921340793,1.8492497037721,1.8508539958613035,1.8524452236959503,1.8540234429560551,1.8555887096988957,1.8571410803505402,1.8586806116974004,1.8602073608778054,1.8617213853736017,1.8632227430017774,1.864711491906116,1.866187690548875,1.8676513977024962,1.8691026724413446,1.8705415741334799,1.8719681624324582,1.8733824972691702,1.8747846388437108,1.8761746476172854,1.8775525843041525,1.8789185098636043,1.8802724854919837,1.8816145726147424,1.8829448328785388,1.8842633281433752,1.8855701204747808,1.8868652721360335,1.888148845580427,1.8894209034435838,1.890681508535812,1.8919307238345076,1.893168612476607,1.8943952377510835,1.8956106630914953,1.8968149520685802,1.8980081683829035,1.8991903758575541,1.9003616384308928,1.9015220201493528,1.9026715851602944,1.90381039770491,1.9049385221111863,1.90605602278692,1.9071629642127887,1.9082594109354778,1.9093454275608641,1.9104210787472569,1.911486429198695,1.9125415436583042,1.9135864869017116,1.9146213237305196,1.91564611896584,1.916660937441887,1.917665843999632,1.9186609034805175,1.9196461807202354,1.9206217405425632,1.9215876477532652,1.9225439671340552,1.9234907634366216,1.9244281013767162,1.925356045628306,1.9262746608177896,1.927184011518277,1.928084162243933,1.928975177444387,1.929857121499206,1.9307300587124339,1.931594053307194,1.9324491694203605,1.9332954710972914,1.9341330222866304,1.934961886835174,1.935782128482803,1.9365938108574827,1.9373969974703282,1.938191751710736,1.9389781368415822,1.9397562159944872,1.9405260521651484,1.9412877082087374,1.9420412468353652,1.9427867306056141,1.9435242219261362,1.944253783045318,1.944975476049013,1.9456893628563396,1.946395505215547,1.9470939646999461,1.947784802703908,1.9484680804389287,1.9491438589297605,1.949812199010608,1.9504731613213926,1.9511268063040805,1.951773194199079,1.9524123850416961,1.953044438658667,1.9536694146647455,1.9542873724593617,1.954898371223342,1.9555024699156969,1.9560997272704703,1.9566902017936567,1.957273951760179,1.957851035210932,1.9584215099498894,1.9589854335412737,1.9595428633067886,1.9600938563229162,1.9606384694182735,1.9611767591710347,1.961708781906412,1.9622345936942005,1.9627542503463826,1.9632678074147947,1.963775320188853,1.9642768436933407,1.9647724326862548,1.9652621416567115,1.9657460248229126,1.9662241361301682,1.9666965292489798,1.9671632575731808,1.9676243742181336,1.9680799320189857,1.968529983528981,1.9689745810178276,1.9694137764701234,1.969847621583834,1.9702761677688292,1.9706994661454709,1.9711175675432575,1.9715305224995217,1.9719383812581797,1.9723411937685367,1.9727390096841413,1.973131878361694,1.9735198488600063,1.9739029699390114,1.9742812900588245,1.9746548573788538,1.9750237197569611,1.9753879247486712,1.9757475196064294,1.976102551278908,1.9764530664103608,1.9767991113400214,1.9771407321015533,1.977477974422541,1.9778108837240311,1.9781395051201138,1.9784638834175534,1.9787840631154598,1.9791000884050052,1.9794120031691822,1.9797198509826066,1.9800236751113596,1.9803235185128731,1.9806194238358565,1.980911433420261,1.9811995892972876,1.9814839331894303,1.981764506510563,1.9820413503660592,1.9823145055529547,1.9825840125601433,1.9828499115686113,1.983112242451709,1.983371044775455,1.9836263577988786,1.9838782204743952,1.9841266714482155,1.9843717490607895,1.984613491347283,1.9848519360380859,1.9850871205593525,1.985319082033576,1.9855478572801888,1.9857734828161986,1.98599599485685,1.986215429316319,1.9864318218084336,1.9866452076474246,1.986855621848703,1.9870630991296658,1.987267673910528,1.9874693803151797,1.987668252172073,1.9878643230151287,1.9880576260846725,1.9882481943283925,1.9884360604023223,1.9886212566718464,1.9888038152127285,1.9889837678121631,1.9891611459698482,1.9893359808990778,1.9895083035278598,1.9896781445000487,1.9898455341765022,1.9900105026362562,1.9901730796777184,1.9903332948198798,1.9904911773035467,1.9906467560925873,1.9908000598751983,1.990951117065185,1.9910999558032612,1.9912466039583623,1.991391089128975,1.9915334386444812,1.9916736795665169,1.9918118386903452,1.991947942546243,1.9920820174009004,1.992214089258833,1.9923441838638072,1.992472326700277,1.9925985429948327,1.9927228577176592,1.9928452955840086,1.9929658810556785,1.9930846383425043,1.9932015914038588,1.9933167639501623,1.9934301794443998,1.9935418611036484,1.9936518319006125,1.993760114565165,1.9938667315858987,1.9939717052116817,1.9940750574532218,1.9941768100846355,1.9942769846450246,1.9943756024400559,1.9944726845435492,1.9945682517990675,1.9946623248215134,1.99475492399873,1.9948460694931032,1.9949357812431712,1.9950240789652345,1.9951109821549706,1.9951965100890503,1.9952806818267566,1.9953635162116063,1.9954450318729735,1.9955252472277125,1.995604180481785,1.9956818496318867,1.9957582724670733,1.99583346657039,1.9959074493204991,1.9959802378933063,1.9960518492635897,1.9961223002066262,1.9961916072998176,1.9962597869243144,1.9963268552666402,1.9963928283203136,1.9964577218874675,1.9965215515804675,1.9965843328235269,1.9966460808543212,1.996706810725597,1.9967665373067802,1.9968252752855804,1.9968830391695918,1.9969398432878902,1.9969957017926279,1.9970506286606216,1.9971046376949402,1.997157742526484,1.9972099566155634,1.9972612932534701,1.9973117655640449,1.9973613865052395,1.997410168870674,1.9974581252911896,1.9975052682363934,1.9975516100162005,1.9975971627823683,1.9976419385300255,1.9976859490991958,1.9977292061763134,1.9977717212957347,1.9978135058412412,1.9978545710475373,1.9978949280017406,1.9979345876448662,1.9979735607733022,1.998011858040281,1.99804948995734,1.998086466895778,1.9981227990881028,1.99815849662947,1.998193569479118,1.9982280274617903,1.9982618802691543,1.9982951374612101,1.9983278084676912,1.998359902589458,1.998391428999883,1.9984223967462273,1.998452814751009,1.9984826918133634,1.9985120366103948,1.99854085769852,1.998569163514802,1.9985969623782773,1.998624262491272,1.9986510719407116,1.9986773986994195,1.9987032506274094,1.9987286354731664,1.9987535608749207,1.998778034361912,1.9988020633556438,1.998825655171131,1.9988488170181362,1.9988715560023973,1.9988938791268478,1.9989157932928248,1.9989373053012711,1.9989584218539254,1.9989791495545048,1.9989994949098786,1.9990194643312296,1.9990390641352105,1.9990583005450886,1.9990771796918803,1.9990957076154787,1.9991138902657704,1.9991317335037426,1.9991492431025826,1.9991664247487664,1.9991832840431378,1.9991998265019801,1.9992160575580766,1.999231982561762,1.9992476067819658,1.999262935407245,1.999277973546808,1.9992927262315296,1.999307198414956,1.9993213949743016,1.9993353207114348,1.9993489803538573,1.9993623785556713,1.9993755198985397,1.9993884088926357,1.999401049977585,1.999413447523396,1.999425605831385,1.9994375291350885,1.9994492216011688,1.9994606873303093,1.9994719303581028,1.9994829546559283,1.9994937641318202,1.9995043626313298,1.999514753938376,1.9995249417760876,1.9995349298076386,1.999544721637072,1.999554320810118,1.9995637308150007,1.9995729550832384,1.9995819969904338,1.9995908598570575,1.999599546949221,1.9996080614794418,1.9996164066074023,1.999624585440697,1.9996326010355747,1.9996404563976686,1.999648154482723,1.9996556981973075,1.9996630903995256,1.9996703338997155,1.9996774314611405,1.9996843858006743,1.9996911995894764,1.9996978754536607,1.9997044159749564,1.9997108236913603,1.999717101097782,1.9997232506466815,1.9997292747486997,1.9997351757732802,1.9997409560492843,1.9997466178655992,1.9997521634717375,1.9997575950784305,1.9997629148582146,1.999768124946008,1.9997732274396844,1.9997782244006357,1.9997831178543295,1.9997879097908606,1.9997926021654933,1.999797196899198,1.999801695879182,1.999806100959412,1.9998104139611297,1.9998146366733638,1.9998187708534307,1.9998228182274334,1.99982678049075,1.9998306593085189,1.9998344563161161,1.9998381731196262,1.9998418112963077,1.9998453723950513,1.9998488579368345,1.999852269415166,1.9998556082965284,1.9998588760208125,1.9998620740017454,1.9998652036273152,1.9998682662601872,1.9998712632381166,1.9998741958743536,1.9998770654580444,1.9998798732546264,1.999882620506217,1.9998853084319985,1.9998879382285957,1.9998905110704501,1.999893028110188,1.9998954904789832,1.9998978992869145,1.9999002556233187,1.9999025605571388,1.9999048151372656,1.9999070203928757,1.9999091773337652,1.9999112869506765,1.9999133502156234,1.9999153680822073,1.9999173414859328,1.9999192713445166,1.9999211585581924,1.9999230040100107,1.9999248085661347,1.9999265730761322,1.9999282983732622,1.9999299852747574,1.9999316345821037,1.9999332470813136,1.9999348235431962,1.9999363647236243,1.9999378713637956,1.9999393441904911,1.9999407839163286,1.9999421912400137,1.9999435668465853,1.9999449114076588,1.9999462255816645,1.9999475100140824,1.999948765337674,1.99994999217271,1.9999511911271939,1.9999523627970837,1.999953507766508,1.9999546266079802,1.9999557198826088,1.9999567881403044,1.9999578319199833,1.9999588517497682,1.9999598481471845,1.9999608216193556,1.9999617726631922,1.9999627017655819,1.9999636094035722,1.9999644960445535,1.999965362146437,1.999966208157831,1.999967034518214,1.999967841658103,1.9999686299992239,1.999969399954673,1.9999701519290807,1.9999708863187695,1.9999716035119106,1.9999723038886783,1.9999729878213997,1.9999736556747054,1.9999743078056735,1.9999749445639752,1.9999755662920142,1.9999761733250672,1.9999767659914185,1.999977344612496,1.9999779095030015],"x":[-1.0,-1.0040080160320641,-1.0080160320641283,-1.0120240480961924,-1.0160320641282565,-1.0200400801603207,-1.0240480961923848,-1.028056112224449,-1.032064128256513,-1.0360721442885772,-1.0400801603206413,-1.0440881763527055,-1.0480961923847696,-1.0521042084168337,-1.0561122244488979,-1.060120240480962,-1.0641282565130261,-1.0681362725450902,-1.0721442885771544,-1.0761523046092185,-1.0801603206412826,-1.0841683366733468,-1.088176352705411,-1.092184368737475,-1.0961923847695392,-1.1002004008016033,-1.1042084168336674,-1.1082164328657316,-1.1122244488977955,-1.1162324649298596,-1.1202404809619237,-1.1242484969939879,-1.128256513026052,-1.1322645290581161,-1.1362725450901803,-1.1402805611222444,-1.1442885771543085,-1.1482965931863727,-1.1523046092184368,-1.156312625250501,-1.160320641282565,-1.1643286573146292,-1.1683366733466933,-1.1723446893787575,-1.1763527054108216,-1.1803607214428857,-1.1843687374749499,-1.188376753507014,-1.1923847695390781,-1.1963927855711423,-1.2004008016032064,-1.2044088176352705,-1.2084168336673347,-1.2124248496993988,-1.216432865731463,-1.220440881763527,-1.2244488977955912,-1.2284569138276553,-1.2324649298597194,-1.2364729458917836,-1.2404809619238477,-1.2444889779559118,-1.248496993987976,-1.25250501002004,-1.2565130260521042,-1.2605210420841684,-1.2645290581162325,-1.2685370741482966,-1.2725450901803608,-1.276553106212425,-1.280561122244489,-1.2845691382765532,-1.2885771543086173,-1.2925851703406814,-1.2965931863727456,-1.3006012024048097,-1.3046092184368738,-1.308617234468938,-1.312625250501002,-1.3166332665330662,-1.3206412825651304,-1.3246492985971945,-1.3286573146292586,-1.3326653306613228,-1.3366733466933867,-1.3406813627254508,-1.344689378757515,-1.348697394789579,-1.3527054108216432,-1.3567134268537073,-1.3607214428857715,-1.3647294589178356,-1.3687374749498997,-1.3727454909819639,-1.376753507014028,-1.3807615230460921,-1.3847695390781563,-1.3887775551102204,-1.3927855711422845,-1.3967935871743486,-1.4008016032064128,-1.404809619238477,-1.408817635270541,-1.4128256513026052,-1.4168336673346693,-1.4208416833667334,-1.4248496993987976,-1.4288577154308617,-1.4328657314629258,-1.43687374749499,-1.440881763527054,-1.4448897795591182,-1.4488977955911824,-1.4529058116232465,-1.4569138276553106,-1.4609218436873748,-1.464929859719439,-1.468937875751503,-1.4729458917835672,-1.4769539078156313,-1.4809619238476954,-1.4849699398797596,-1.4889779559118237,-1.4929859719438878,-1.496993987975952,-1.501002004008016,-1.5050100200400802,-1.5090180360721444,-1.5130260521042085,-1.5170340681362726,-1.5210420841683367,-1.5250501002004009,-1.529058116232465,-1.5330661322645291,-1.5370741482965933,-1.5410821643286574,-1.5450901803607215,-1.5490981963927857,-1.5531062124248498,-1.5571142284569137,-1.5611222444889779,-1.565130260521042,-1.5691382765531061,-1.5731462925851702,-1.5771543086172344,-1.5811623246492985,-1.5851703406813626,-1.5891783567134268,-1.593186372745491,-1.597194388777555,-1.6012024048096192,-1.6052104208416833,-1.6092184368737474,-1.6132264529058116,-1.6172344689378757,-1.6212424849699398,-1.625250501002004,-1.629258517034068,-1.6332665330661322,-1.6372745490981964,-1.6412825651302605,-1.6452905811623246,-1.6492985971943888,-1.653306613226453,-1.657314629258517,-1.6613226452905812,-1.6653306613226453,-1.6693386773547094,-1.6733466933867736,-1.6773547094188377,-1.6813627254509018,-1.685370741482966,-1.68937875751503,-1.6933867735470942,-1.6973947895791583,-1.7014028056112225,-1.7054108216432866,-1.7094188376753507,-1.7134268537074149,-1.717434869739479,-1.7214428857715431,-1.7254509018036073,-1.7294589178356714,-1.7334669338677355,-1.7374749498997997,-1.7414829659318638,-1.745490981963928,-1.749498997995992,-1.7535070140280562,-1.7575150300601203,-1.7615230460921845,-1.7655310621242486,-1.7695390781563127,-1.7735470941883769,-1.777555110220441,-1.781563126252505,-1.785571142284569,-1.7895791583166332,-1.7935871743486973,-1.7975951903807614,-1.8016032064128256,-1.8056112224448897,-1.8096192384769538,-1.813627254509018,-1.817635270541082,-1.8216432865731462,-1.8256513026052104,-1.8296593186372745,-1.8336673346693386,-1.8376753507014028,-1.8416833667334669,-1.845691382765531,-1.8496993987975952,-1.8537074148296593,-1.8577154308617234,-1.8617234468937875,-1.8657314629258517,-1.8697394789579158,-1.87374749498998,-1.877755511022044,-1.8817635270541082,-1.8857715430861723,-1.8897795591182365,-1.8937875751503006,-1.8977955911823647,-1.9018036072144289,-1.905811623246493,-1.9098196392785571,-1.9138276553106213,-1.9178356713426854,-1.9218436873747495,-1.9258517034068137,-1.9298597194388778,-1.933867735470942,-1.937875751503006,-1.9418837675350702,-1.9458917835671343,-1.9498997995991985,-1.9539078156312626,-1.9579158316633267,-1.9619238476953909,-1.965931863727455,-1.9699398797595191,-1.9739478957915833,-1.9779559118236474,-1.9819639278557115,-1.9859719438877756,-1.9899799599198398,-1.993987975951904,-1.997995991983968,-2.002004008016032,-2.006012024048096,-2.0100200400801604,-2.0140280561122244,-2.0180360721442887,-2.0220440881763526,-2.026052104208417,-2.030060120240481,-2.0340681362725452,-2.038076152304609,-2.0420841683366735,-2.0460921843687374,-2.0501002004008018,-2.0541082164328657,-2.05811623246493,-2.062124248496994,-2.0661322645290583,-2.070140280561122,-2.0741482965931866,-2.0781563126252505,-2.082164328657315,-2.0861723446893787,-2.090180360721443,-2.094188376753507,-2.0981963927855714,-2.1022044088176353,-2.1062124248496996,-2.1102204408817635,-2.1142284569138274,-2.118236472945892,-2.1222444889779557,-2.12625250501002,-2.130260521042084,-2.1342685370741483,-2.1382765531062122,-2.1422845691382766,-2.1462925851703405,-2.150300601202405,-2.1543086172344688,-2.158316633266533,-2.162324649298597,-2.1663326653306614,-2.1703406813627253,-2.1743486973947896,-2.1783567134268536,-2.182364729458918,-2.186372745490982,-2.190380761523046,-2.19438877755511,-2.1983967935871744,-2.2024048096192383,-2.2064128256513027,-2.2104208416833666,-2.214428857715431,-2.218436873747495,-2.2224448897795592,-2.226452905811623,-2.2304609218436875,-2.2344689378757514,-2.2384769539078158,-2.2424849699398797,-2.246492985971944,-2.250501002004008,-2.2545090180360723,-2.258517034068136,-2.2625250501002006,-2.2665330661322645,-2.270541082164329,-2.2745490981963927,-2.278557114228457,-2.282565130260521,-2.2865731462925853,-2.2905811623246493,-2.2945891783567136,-2.2985971943887775,-2.302605210420842,-2.306613226452906,-2.31062124248497,-2.314629258517034,-2.3186372745490984,-2.3226452905811623,-2.3266533066132267,-2.3306613226452906,-2.3346693386773545,-2.338677354709419,-2.3426853707414828,-2.346693386773547,-2.350701402805611,-2.3547094188376754,-2.3587174348697393,-2.3627254509018036,-2.3667334669338675,-2.370741482965932,-2.374749498997996,-2.37875751503006,-2.382765531062124,-2.3867735470941884,-2.3907815631262523,-2.3947895791583167,-2.3987975951903806,-2.402805611222445,-2.406813627254509,-2.4108216432865732,-2.414829659318637,-2.4188376753507015,-2.4228456913827654,-2.4268537074148298,-2.4308617234468937,-2.434869739478958,-2.438877755511022,-2.4428857715430863,-2.44689378757515,-2.4509018036072145,-2.4549098196392785,-2.458917835671343,-2.4629258517034067,-2.466933867735471,-2.470941883767535,-2.4749498997995993,-2.4789579158316633,-2.4829659318637276,-2.4869739478957915,-2.490981963927856,-2.49498997995992,-2.498997995991984,-2.503006012024048,-2.5070140280561124,-2.5110220440881763,-2.5150300601202407,-2.5190380761523046,-2.523046092184369,-2.527054108216433,-2.531062124248497,-2.535070140280561,-2.5390781563126255,-2.5430861723446894,-2.5470941883767537,-2.5511022044088176,-2.555110220440882,-2.559118236472946,-2.56312625250501,-2.567134268537074,-2.571142284569138,-2.5751503006012024,-2.5791583166332663,-2.5831663326653307,-2.5871743486973946,-2.591182364729459,-2.595190380761523,-2.599198396793587,-2.603206412825651,-2.6072144288577155,-2.6112224448897794,-2.6152304609218437,-2.6192384769539077,-2.623246492985972,-2.627254509018036,-2.6312625250501003,-2.635270541082164,-2.6392785571142285,-2.6432865731462925,-2.647294589178357,-2.6513026052104207,-2.655310621242485,-2.659318637274549,-2.6633266533066133,-2.6673346693386772,-2.6713426853707416,-2.6753507014028055,-2.67935871743487,-2.6833667334669338,-2.687374749498998,-2.691382765531062,-2.6953907815631264,-2.6993987975951903,-2.7034068136272547,-2.7074148296593186,-2.711422845691383,-2.715430861723447,-2.719438877755511,-2.723446893787575,-2.7274549098196395,-2.7314629258517034,-2.7354709418837677,-2.7394789579158316,-2.743486973947896,-2.74749498997996,-2.7515030060120242,-2.755511022044088,-2.7595190380761525,-2.7635270541082164,-2.7675350701402808,-2.7715430861723447,-2.775551102204409,-2.779559118236473,-2.783567134268537,-2.787575150300601,-2.791583166332665,-2.7955911823647295,-2.7995991983967934,-2.8036072144288577,-2.8076152304609217,-2.811623246492986,-2.81563126252505,-2.8196392785571143,-2.823647294589178,-2.8276553106212425,-2.8316633266533064,-2.835671342685371,-2.8396793587174347,-2.843687374749499,-2.847695390781563,-2.8517034068136273,-2.8557114228456912,-2.8597194388777556,-2.8637274549098195,-2.867735470941884,-2.8717434869739478,-2.875751503006012,-2.879759519038076,-2.8837675350701404,-2.8877755511022043,-2.8917835671342687,-2.8957915831663326,-2.899799599198397,-2.903807615230461,-2.907815631262525,-2.911823647294589,-2.9158316633266534,-2.9198396793587174,-2.9238476953907817,-2.9278557114228456,-2.93186372745491,-2.935871743486974,-2.9398797595190382,-2.943887775551102,-2.9478957915831665,-2.9519038076152304,-2.9559118236472948,-2.9599198396793587,-2.963927855711423,-2.967935871743487,-2.9719438877755513,-2.975951903807615,-2.9799599198396796,-2.9839679358717435,-2.987975951903808,-2.9919839679358717,-2.995991983967936,-3.0]}
},{}],21:[function(require,module,exports){
module.exports={"expected":[0.15729920705028513,0.15564210898558992,0.15399829395275186,0.15236770786592066,0.15075029622790007,0.1491460041386965,0.1475547763040497,0.14597655704394474,0.14441129030110442,0.1428589196494599,0.14131938830259966,0.13979263912219456,0.13827861462639837,0.1367772569982225,0.1352885080938839,0.13381230945112488,0.1323486022975037,0.13089732755865524,0.12945842586652018,0.12803183756754177,0.12661750273082978,0.12521536115628928,0.12382535238271476,0.12244741569584752,0.12108149013639574,0.11972751450801636,0.11838542738525759,0.1170551671214614,0.11573667185662487,0.11442987952521917,0.11313472786396665,0.1118511544195731,0.11057909655641622,0.1093184914641882,0.10806927616549239,0.10683138752339294,0.10560476224891632,0.10438933690850474,0.10318504793141979,0.1019918316170964,0.10080962414244585,0.09963836156910726,0.09847797985064706,0.09732841483970556,0.09618960229509005,0.09506147788881371,0.09394397721307993,0.09283703578721123,0.09174058906452214,0.09065457243913573,0.08957892125274308,0.08851357080130501,0.08745845634169581,0.08641351309828842,0.0853786762694803,0.08435388103415986,0.08333906255811283,0.08233415600036802,0.0813390965194824,0.0803538192797646,0.07937825945743684,0.07841235224673479,0.07745603286594475,0.07650923656337837,0.07557189862328387,0.07464395437169401,0.07372533918221029,0.07281598848172299,0.07191583775606698,0.071024822555613,0.07014287850079393,0.0692699412875662,0.06840594669280595,0.06755083057963954,0.06670452890270868,0.06586697771336956,0.0650381131648261,0.06421787151719714,0.0634061891425173,0.06260300252967169,0.06180824828926391,0.06102186315841789,0.06024378400551283,0.0594739478348516,0.05871229179126267,0.057958753164634856,0.05721326939438589,0.05647577807386384,0.055746216954682,0.055024523950986996,0.05431063714366025,0.05360449478445287,0.052906035300053875,0.05221519729609206,0.051531919561071254,0.05085614107023954,0.05018780098939198,0.04952683867860743,0.04887319369591939,0.04822680580092088,0.0475876149583039,0.04695556134133312,0.046330585335254415,0.04571262754063822,0.045101628776657854,0.04449753008430316,0.04390027272952967,0.04330979820634326,0.04272604823982101,0.04214896478906798,0.04157849005011052,0.04101456645872633,0.040457136693211326,0.03990614367708387,0.03936153058172646,0.03882324082896531,0.038291218093587966,0.03776540630579949,0.03724574965361732,0.03673219258520528,0.036224679811147034,0.03572315630665931,0.03522756731374528,0.03473785834328844,0.034253975177087406,0.033775863869831835,0.03330347075102018,0.03283674242681927,0.03237562578186641,0.0319200679810143,0.031470016471019144,0.03102541898217241,0.030586223529876666,0.030152378416165918,0.0297238322311708,0.029300533854529152,0.028882432456742473,0.02846947750047845,0.02806161874182031,0.027658806231463322,0.027260990315858716,0.02686812163830604,0.026480151139993673,0.02609703006098859,0.02571870994117554,0.025345142621146215,0.024976280243038877,0.024612075251328868,0.024252480393570672,0.023897448721091844,0.023546933589639288,0.023200888659978613,0.022859267898446802,0.02252202557745887,0.022189116275968927,0.02186049487988624,0.021536116582446675,0.021215936884540213,0.020899911594994897,0.02058799683081777,0.020280149017393424,0.019976324888640488,0.019676481487126765,0.01938057616414343,0.019088566579738852,0.018800410702712506,0.01851606681056965,0.01823549348943709,0.017958649633940706,0.017685494447045237,0.01741598743985679,0.017150088431388683,0.016887757548291096,0.01662895522454507,0.016373642201121398,0.016121779525604882,0.01587332855178457,0.015628250939210404,0.015386508652716882,0.015148063961914187,0.014912879440647352,0.01468091796642401,0.014452142719811153,0.014226517183801513,0.014004005143150058,0.013784570683681073,0.01356817819156642,0.013354792352575424,0.013144378151296944,0.012936900870334092,0.012732326089472166,0.012530619684820247,0.012331747827927014,0.012135676984871231,0.011942373915327457,0.011751805671607437,0.011563939597677667,0.01137874332815369,0.011196184787271534,0.011016232187836797,0.010838854030151928,0.010664019100922085,0.010491696472140162,0.01032185549995134,0.010154465823497754,0.009989497363743665,0.009826920322281635,0.00966670518012018,0.009508822696453333,0.00935324390741261,0.009199940124801805,0.009048882934815086,0.008900044196738822,0.00875339604163761,0.008608910871024927,0.008466561355518829,0.00832632043348318,0.008188161309654796,0.00805205745375694,0.007917982599099616,0.007785910741167054,0.007655816136192808,0.007527673299722894,0.007401457005167356,0.00727714228234068,0.007154704415991439,0.007034118944321588,0.0069153616574957845,0.0067984085961411206,0.006683236049837673,0.006569820555600217,0.0064581388963515195,0.006348168099387541,0.006239885434834961,0.006133268414101349,0.006028294788318356,0.0059249425467783005,0.005823189915364467,0.005723015354975487,0.005624397559944139,0.005527315456450904,0.005431748200932608,0.005337675178486501,0.005245076001270059,0.005153930506896876,0.0050642187568289325,0.004975921034765563,0.0048890178450294265,0.004803489910949799,0.004719318173243473,0.004636483788393554,0.004554968127026478,0.004474752772287479,0.004395819518214894,0.004318150368113403,0.00424172753292674,0.004166533429609827,0.004092550679500941,0.0040197621066938366,0.00394815073641039,0.003877699793373746,0.0038083927001824687,0.003740213075685688,0.0036731447333597424,0.003607171679686295,0.003542278112532406,0.0034784484195325483,0.0034156671764730287,0.0033539191456787953,0.003293189274403083,0.003233462693219882,0.003174724714419655,0.0031169608304082927,0.003060156712109723,0.003004298207372153,0.0029493713393783463,0.002895362305059924,0.0028422574735160596,0.0027900433844365823,0.002738706746529786,0.0026882344359550753,0.0026386134947605625,0.0025898311293259023,0.0025418747088103797,0.0024947317636065556,0.002448389983799473,0.0024028372176317335,0.0023580614699744247,0.002314050900804201,0.0022707938236865097,0.0022282787042652357,0.002186494158758759,0.0021454289524626977,0.0021050719982593094,0.0020654123551338303,0.0020264392266977106,0.001988141959719017,0.0019505100426599632,0.001913533104221822,0.0018772009118971844,0.0018415033705298008,0.0018064305208819712,0.0017719725382097104,0.0017381197308456537,0.001704862538789915,0.0016721915323088565,0.0016400974105419855,0.00160857100011693,0.0015776032537726825,0.0015471852489910886,0.0015173081866367427,0.001487963389605268,0.001459142301480138,0.0014308364851980076,0.0014030376217227145,0.0013757375087279024,0.0013489280592884245,0.0013226013005804805,0.0012967493725906316,0.0012713645268336454,0.0012464391250793098,0.0012219656380881615,0.0011979366443562666,0.001174344828868991,0.0011511829818638905,0.0011284439976026626,0.0011061208731522757,0.0010842067071752193,0.001062694698728981,0.0010415781460746958,0.0010208504454950662,0.0010005050901214898,0.0009805356687704956,0.0009609358647894233,0.0009416994549114198,0.0009228203081197364,0.0009042923845213202,0.0008861097342297521,0.0008682664962574756,0.0008507568974173839,0.0008335752512337017,0.000816715956862222,0.0008001734980198378,0.0007839424419234184,0.0007680174382379731,0.0007523932180341443,0.0007370645927549685,0.0007220264531919505,0.0007072737684703795,0.0006928015850439307,0.0006786050256984825,0.0006646792885651833,0.0006510196461426993,0.0006376214443286741,0.0006244801014603278,0.0006115911073642233,0.000598950022415127,0.0005865524766039855,0.0005743941686149468,0.0005624708649114419,0.0005507783988312564,0.0005393126696906006,0.0005280696418971109,0.0005170453440717853,0.0005062358681797837,0.0004956373686700958,0.00048524606162400396,0.0004750582239123408,0.000465070192361468,0.0004552783629279754,0.0004456791898820229,0.00043626918499932226,0.0004270449167616829,0.00041800300956611295,0.0004091401429424006,0.0004004530507791642,0.00039193852055829616,0.00038359339259778544,0.0003754145593028439,0.0003673989644253192,0.0003595436023313186,0.0003518455172770244,0.0003443018026926255,0.00033690960047434216,0.0003296661002844697,0.0003225685388594167,0.0003156141993256608,0.00030880041052359816,0.00030212454633920865,0.00029558402504351045,0.0002891763086397284,0.0002828989022181417,0.0002767493533185497,0.0002707252513002981,0.0002648242267198247,0.00025904395071565397,0.00025338213440080447,0.00024783652826253406,0.00024240492156938907,0.00023708514178548092,0.00023187505399195556,0.00022677256031557937,0.00022177559936440545,0.00021688214567044516,0.00021209020913930652,0.00020739783450672564,0.0002028031008019516,0.00019830412081791067,0.00019389904058811052,0.00018958603887020986,0.00018536332663621362,0.00018122914656921972,0.00017718177256667678,0.00017321950925007883,0.00016934069148105615,0.00016554368388378953,0.0001618268803737047,0.0001581887036923763,0.00015462760494859744,0.00015114206316554403,0.00014773058483399018,0.0001443917034715046,0.00014112397918758298,0.000137925998254648,0.00013479637268487118,0.00013173373981274872,0.00012873676188338552,0.00012580412564642036,0.0001229345419555459,0.00012012674537355716,0.00011737949378288272,0.00011469156800153206,0.00011206177140441384,0.00010948892954995917,0.00010697188981200442,0.00010450952101686877,0.00010210071308558058,9.974437668118917e-5,9.743944286111578e-5,9.518486273448084e-5,9.297960712436209e-5,9.082266623492116e-5,8.871304932335316e-5,8.66497843765979e-5,8.463191779276747e-5,8.265851406722997e-5,8.072865548330257e-5,7.884144180749913e-5,7.69959899892787e-5,7.519143386524784e-5,7.342692386775942e-5,7.170162673786305e-5,7.001472524254982e-5,6.83654178962473e-5,6.67529186865084e-5,6.517645680384997e-5,6.363527637568621e-5,6.212863620431271e-5,6.0655809508887285e-5,5.9216083671363895e-5,5.780875998632651e-5,5.643315341467993e-5,5.508859234114513e-5,5.377441833551662e-5,5.248998591763037e-5,5.1234662326000324e-5,5.0007827290072755e-5,4.88088728060572e-5,4.763720291628405e-5,4.6492233492048045e-5,4.5373392019888726e-5,4.428011739126753e-5,4.321185969559353e-5,4.2168080016558165e-5,4.114825023173172e-5,4.015185281538247e-5,3.9178380644472305e-5,3.8227336807790166e-5,3.729823441817806e-5,3.639059642781166e-5,3.550395544649103e-5,3.463785356290405e-5,3.3791842168819174e-5,3.296548178617056e-5,3.215834189699306e-5,3.1370000776170706e-5,3.0600045326957335e-5,2.9848070919233264e-5,2.9113681230457573e-5,2.8396488089280856e-5,2.7696111321778453e-5,2.701217860026994e-5,2.6344325294685605e-5,2.5692194326446357e-5,2.5055436024818664e-5,2.4433707985711603e-5,2.382667493287844e-5,2.323400858149047e-5,2.265538750404637e-5,2.2090496998585438e-5],"x":[1.0,1.0040080160320641,1.0080160320641283,1.0120240480961924,1.0160320641282565,1.0200400801603207,1.0240480961923848,1.028056112224449,1.032064128256513,1.0360721442885772,1.0400801603206413,1.0440881763527055,1.0480961923847696,1.0521042084168337,1.0561122244488979,1.060120240480962,1.0641282565130261,1.0681362725450902,1.0721442885771544,1.0761523046092185,1.0801603206412826,1.0841683366733468,1.088176352705411,1.092184368737475,1.0961923847695392,1.1002004008016033,1.1042084168336674,1.1082164328657316,1.1122244488977955,1.1162324649298596,1.1202404809619237,1.1242484969939879,1.128256513026052,1.1322645290581161,1.1362725450901803,1.1402805611222444,1.1442885771543085,1.1482965931863727,1.1523046092184368,1.156312625250501,1.160320641282565,1.1643286573146292,1.1683366733466933,1.1723446893787575,1.1763527054108216,1.1803607214428857,1.1843687374749499,1.188376753507014,1.1923847695390781,1.1963927855711423,1.2004008016032064,1.2044088176352705,1.2084168336673347,1.2124248496993988,1.216432865731463,1.220440881763527,1.2244488977955912,1.2284569138276553,1.2324649298597194,1.2364729458917836,1.2404809619238477,1.2444889779559118,1.248496993987976,1.25250501002004,1.2565130260521042,1.2605210420841684,1.2645290581162325,1.2685370741482966,1.2725450901803608,1.276553106212425,1.280561122244489,1.2845691382765532,1.2885771543086173,1.2925851703406814,1.2965931863727456,1.3006012024048097,1.3046092184368738,1.308617234468938,1.312625250501002,1.3166332665330662,1.3206412825651304,1.3246492985971945,1.3286573146292586,1.3326653306613228,1.3366733466933867,1.3406813627254508,1.344689378757515,1.348697394789579,1.3527054108216432,1.3567134268537073,1.3607214428857715,1.3647294589178356,1.3687374749498997,1.3727454909819639,1.376753507014028,1.3807615230460921,1.3847695390781563,1.3887775551102204,1.3927855711422845,1.3967935871743486,1.4008016032064128,1.404809619238477,1.408817635270541,1.4128256513026052,1.4168336673346693,1.4208416833667334,1.4248496993987976,1.4288577154308617,1.4328657314629258,1.43687374749499,1.440881763527054,1.4448897795591182,1.4488977955911824,1.4529058116232465,1.4569138276553106,1.4609218436873748,1.464929859719439,1.468937875751503,1.4729458917835672,1.4769539078156313,1.4809619238476954,1.4849699398797596,1.4889779559118237,1.4929859719438878,1.496993987975952,1.501002004008016,1.5050100200400802,1.5090180360721444,1.5130260521042085,1.5170340681362726,1.5210420841683367,1.5250501002004009,1.529058116232465,1.5330661322645291,1.5370741482965933,1.5410821643286574,1.5450901803607215,1.5490981963927857,1.5531062124248498,1.5571142284569137,1.5611222444889779,1.565130260521042,1.5691382765531061,1.5731462925851702,1.5771543086172344,1.5811623246492985,1.5851703406813626,1.5891783567134268,1.593186372745491,1.597194388777555,1.6012024048096192,1.6052104208416833,1.6092184368737474,1.6132264529058116,1.6172344689378757,1.6212424849699398,1.625250501002004,1.629258517034068,1.6332665330661322,1.6372745490981964,1.6412825651302605,1.6452905811623246,1.6492985971943888,1.653306613226453,1.657314629258517,1.6613226452905812,1.6653306613226453,1.6693386773547094,1.6733466933867736,1.6773547094188377,1.6813627254509018,1.685370741482966,1.68937875751503,1.6933867735470942,1.6973947895791583,1.7014028056112225,1.7054108216432866,1.7094188376753507,1.7134268537074149,1.717434869739479,1.7214428857715431,1.7254509018036073,1.7294589178356714,1.7334669338677355,1.7374749498997997,1.7414829659318638,1.745490981963928,1.749498997995992,1.7535070140280562,1.7575150300601203,1.7615230460921845,1.7655310621242486,1.7695390781563127,1.7735470941883769,1.777555110220441,1.781563126252505,1.785571142284569,1.7895791583166332,1.7935871743486973,1.7975951903807614,1.8016032064128256,1.8056112224448897,1.8096192384769538,1.813627254509018,1.817635270541082,1.8216432865731462,1.8256513026052104,1.8296593186372745,1.8336673346693386,1.8376753507014028,1.8416833667334669,1.845691382765531,1.8496993987975952,1.8537074148296593,1.8577154308617234,1.8617234468937875,1.8657314629258517,1.8697394789579158,1.87374749498998,1.877755511022044,1.8817635270541082,1.8857715430861723,1.8897795591182365,1.8937875751503006,1.8977955911823647,1.9018036072144289,1.905811623246493,1.9098196392785571,1.9138276553106213,1.9178356713426854,1.9218436873747495,1.9258517034068137,1.9298597194388778,1.933867735470942,1.937875751503006,1.9418837675350702,1.9458917835671343,1.9498997995991985,1.9539078156312626,1.9579158316633267,1.9619238476953909,1.965931863727455,1.9699398797595191,1.9739478957915833,1.9779559118236474,1.9819639278557115,1.9859719438877756,1.9899799599198398,1.993987975951904,1.997995991983968,2.002004008016032,2.006012024048096,2.0100200400801604,2.0140280561122244,2.0180360721442887,2.0220440881763526,2.026052104208417,2.030060120240481,2.0340681362725452,2.038076152304609,2.0420841683366735,2.0460921843687374,2.0501002004008018,2.0541082164328657,2.05811623246493,2.062124248496994,2.0661322645290583,2.070140280561122,2.0741482965931866,2.0781563126252505,2.082164328657315,2.0861723446893787,2.090180360721443,2.094188376753507,2.0981963927855714,2.1022044088176353,2.1062124248496996,2.1102204408817635,2.1142284569138274,2.118236472945892,2.1222444889779557,2.12625250501002,2.130260521042084,2.1342685370741483,2.1382765531062122,2.1422845691382766,2.1462925851703405,2.150300601202405,2.1543086172344688,2.158316633266533,2.162324649298597,2.1663326653306614,2.1703406813627253,2.1743486973947896,2.1783567134268536,2.182364729458918,2.186372745490982,2.190380761523046,2.19438877755511,2.1983967935871744,2.2024048096192383,2.2064128256513027,2.2104208416833666,2.214428857715431,2.218436873747495,2.2224448897795592,2.226452905811623,2.2304609218436875,2.2344689378757514,2.2384769539078158,2.2424849699398797,2.246492985971944,2.250501002004008,2.2545090180360723,2.258517034068136,2.2625250501002006,2.2665330661322645,2.270541082164329,2.2745490981963927,2.278557114228457,2.282565130260521,2.2865731462925853,2.2905811623246493,2.2945891783567136,2.2985971943887775,2.302605210420842,2.306613226452906,2.31062124248497,2.314629258517034,2.3186372745490984,2.3226452905811623,2.3266533066132267,2.3306613226452906,2.3346693386773545,2.338677354709419,2.3426853707414828,2.346693386773547,2.350701402805611,2.3547094188376754,2.3587174348697393,2.3627254509018036,2.3667334669338675,2.370741482965932,2.374749498997996,2.37875751503006,2.382765531062124,2.3867735470941884,2.3907815631262523,2.3947895791583167,2.3987975951903806,2.402805611222445,2.406813627254509,2.4108216432865732,2.414829659318637,2.4188376753507015,2.4228456913827654,2.4268537074148298,2.4308617234468937,2.434869739478958,2.438877755511022,2.4428857715430863,2.44689378757515,2.4509018036072145,2.4549098196392785,2.458917835671343,2.4629258517034067,2.466933867735471,2.470941883767535,2.4749498997995993,2.4789579158316633,2.4829659318637276,2.4869739478957915,2.490981963927856,2.49498997995992,2.498997995991984,2.503006012024048,2.5070140280561124,2.5110220440881763,2.5150300601202407,2.5190380761523046,2.523046092184369,2.527054108216433,2.531062124248497,2.535070140280561,2.5390781563126255,2.5430861723446894,2.5470941883767537,2.5511022044088176,2.555110220440882,2.559118236472946,2.56312625250501,2.567134268537074,2.571142284569138,2.5751503006012024,2.5791583166332663,2.5831663326653307,2.5871743486973946,2.591182364729459,2.595190380761523,2.599198396793587,2.603206412825651,2.6072144288577155,2.6112224448897794,2.6152304609218437,2.6192384769539077,2.623246492985972,2.627254509018036,2.6312625250501003,2.635270541082164,2.6392785571142285,2.6432865731462925,2.647294589178357,2.6513026052104207,2.655310621242485,2.659318637274549,2.6633266533066133,2.6673346693386772,2.6713426853707416,2.6753507014028055,2.67935871743487,2.6833667334669338,2.687374749498998,2.691382765531062,2.6953907815631264,2.6993987975951903,2.7034068136272547,2.7074148296593186,2.711422845691383,2.715430861723447,2.719438877755511,2.723446893787575,2.7274549098196395,2.7314629258517034,2.7354709418837677,2.7394789579158316,2.743486973947896,2.74749498997996,2.7515030060120242,2.755511022044088,2.7595190380761525,2.7635270541082164,2.7675350701402808,2.7715430861723447,2.775551102204409,2.779559118236473,2.783567134268537,2.787575150300601,2.791583166332665,2.7955911823647295,2.7995991983967934,2.8036072144288577,2.8076152304609217,2.811623246492986,2.81563126252505,2.8196392785571143,2.823647294589178,2.8276553106212425,2.8316633266533064,2.835671342685371,2.8396793587174347,2.843687374749499,2.847695390781563,2.8517034068136273,2.8557114228456912,2.8597194388777556,2.8637274549098195,2.867735470941884,2.8717434869739478,2.875751503006012,2.879759519038076,2.8837675350701404,2.8877755511022043,2.8917835671342687,2.8957915831663326,2.899799599198397,2.903807615230461,2.907815631262525,2.911823647294589,2.9158316633266534,2.9198396793587174,2.9238476953907817,2.9278557114228456,2.93186372745491,2.935871743486974,2.9398797595190382,2.943887775551102,2.9478957915831665,2.9519038076152304,2.9559118236472948,2.9599198396793587,2.963927855711423,2.967935871743487,2.9719438877755513,2.975951903807615,2.9799599198396796,2.9839679358717435,2.987975951903808,2.9919839679358717,2.995991983967936,3.0]}
},{}],22:[function(require,module,exports){
module.exports={"expected":[1.7421009647076606,1.742339359504527,1.7425776013954357,1.7428156904019665,1.7430536265457834,1.743291409848634,1.743529040332351,1.7437665180188502,1.7440038429301326,1.7442410150882823,1.7444780345154682,1.7447149012339418,1.7449516152660394,1.7451881766341808,1.7454245853608688,1.7456608414686903,1.745896944980316,1.7461328959184987,1.7463686943060757,1.7466043401659674,1.7468398335211766,1.7470751743947899,1.7473103628099769,1.7475453987899892,1.7477802823581625,1.7480150135379147,1.748249592352746,1.74848401882624,1.748718292982062,1.7489524148439608,1.7491863844357667,1.7494202017813925,1.7496538669048336,1.749887379830167,1.7501207405815526,1.7503539491832314,1.750587005659527,1.7508199100348443,1.7510526623336704,1.751285262580574,1.7515177108002056,1.7517500070172964,1.7519821512566605,1.752214143543192,1.752445983901867,1.7526776723577426,1.7529092089359577,1.7531405936617315,1.7533718265603644,1.7536029076572377,1.753833836977814,1.7540646145476362,1.7542952403923278,1.7545257145375934,1.7547560370092177,1.754986207833066,1.7552162270350842,1.755446094641298,1.755675810677814,1.7559053751708185,1.7561347881465776,1.7563640496314383,1.7565931596518267,1.756822118234249,1.757050925405291,1.7572795811916184,1.7575080856199765,1.7577364387171903,1.7579646405101637,1.7581926910258803,1.7584205902914027,1.7586483383338734,1.7588759351805137,1.759103380858623,1.7593306753955815,1.7595578188188465,1.7597848111559553,1.7600116524345237,1.7602383426822454,1.760464881926894,1.7606912701963204,1.7609175075184547,1.7611435939213047,1.761369529432957,1.761595314081576,1.7618209478954046,1.7620464309027635,1.762271763132051,1.7624969446117438,1.7627219753703962,1.7629468554366403,1.7631715848391856,1.7633961636068192,1.7636205917684058,1.7638448693528872,1.764068996389283,1.7642929729066896,1.7645167989342807,1.764740474501307,1.7649639996370965,1.7651873743710533,1.7654105987326592,1.7656336727514725,1.765856596457128,1.766079369879337,1.7663019930478876,1.766524465992644,1.7667467887435473,1.7669689613306143,1.7671909837839381,1.767412856133688,1.7676345784101093,1.7678561506435235,1.7680775728643274,1.7682988451029937,1.7685199673900716,1.768740939756185,1.7689617622320335,1.7691824348483927,1.7694029576361125,1.7696233306261195,1.7698435538494142,1.7700636273370733,1.770283551120248,1.7705033252301643,1.7707229496981234,1.7709424245555014,1.771161749833749,1.7713809255643913,1.7715999517790284,1.7718188285093346,1.7720375557870587,1.7722561336440237,1.772474562112127,1.7726928412233403,1.7729109710097088,1.7731289515033524,1.7733467827364646,1.7735644647413125,1.7737819975502371,1.7739993811956536,1.77421661571005,1.774433701125988,1.7746506374761033,1.774867424793104,1.7750840631097724,1.7753005524589633,1.775516892873605,1.7757330843866983,1.775949127031318,1.7761650208406103,1.776380765847795,1.7765963620861651,1.776811809589085,1.7770271083899924,1.777242258522397,1.7774572600198817,1.7776721129161008,1.7778868172447808,1.778101373039721,1.778315780334792,1.778530039163937,1.7787441495611707,1.778958111560579,1.7791719251963207,1.779385590502626,1.7795991075137951,1.7798124762642016,1.7800256967882895,1.7802387691205745,1.780451693295643,1.7806644693481524,1.7808770973128323,1.7810895772244817,1.7813019091179718,1.7815140930282438,1.78172612899031,1.7819380170392527,1.7821497572102256,1.7823613495384523,1.7825727940592269,1.7827840908079136,1.7829952398199473,1.7832062411308327,1.7834170947761443,1.7836278007915274,1.7838383592126958,1.7840487700754344,1.7842590334155972,1.7844691492691078,1.7846791176719596,1.7848889386602154,1.7850986122700068,1.7853081385375353,1.7855175174990716,1.7857267491909559,1.7859358336495958,1.78614477091147,1.7863535610131245,1.7865622039911746,1.7867706998823047,1.7869790487232673,1.7871872505508835,1.7873953054020428,1.7876032133137039,1.787810974322892,1.7880185884667026,1.7882260557822975,1.788433376306908,1.7886405500778324,1.788847577132437,1.7890544575081564,1.7892611912424923,1.7894677783730142,1.7896742189373591,1.789880512973232,1.790086660518404,1.7902926616107147,1.7904985162880704,1.7907042245884446,1.7909097865498778,1.7911152022104768,1.7913204716084166,1.791525594781938,1.7917305717693486,1.7919354026090226,1.792140087339401,1.7923446259989908,1.7925490186263662,1.7927532652601665,1.7929573659390978,1.7931613207019323,1.7933651295875084,1.7935687926347297,1.7937723098825664,1.793975681370054,1.7941789071362941,1.7943819872204532,1.794584921661764,1.7947877104995242,1.7949903537730971,1.7951928515219109,1.7953952037854592,1.795597410603301,1.7957994720150596,1.7960013880604233,1.796203158779146,1.7964047842110453,1.7966062643960043,1.7968075993739703,1.797008789184955,1.7972098338690345,1.7974107334663494,1.7976114880171044,1.7978120975615686,1.7980125621400744,1.798212881793019,1.7984130565608634,1.7986130864841319,1.798812971603413,1.7990127119593584,1.7992123075926836,1.7994117585441676,1.7996110648546528,1.7998102265650449,1.8000092437163127,1.8002081163494874,1.800406844505665,1.8006054282260027,1.8008038675517217,1.801002162524105,1.8012003131844994,1.8013983195743135,1.8015961817350186,1.8017938997081486,1.8019914735352995,1.8021889032581302,1.8023861889183606,1.8025833305577736,1.8027803282182142,1.8029771819415887,1.8031738917698656,1.8033704577450753,1.8035668799093094,1.8037631583047216,1.8039592929735266,1.8041552839580006,1.8043511313004816,1.8045468350433687,1.8047423952291215,1.804937811900261,1.8051330850993699,1.8053282148690908,1.8055232012521274,1.8057180442912446,1.8059127440292673,1.806107300509081,1.8063017137736324,1.8064959838659278,1.8066901108290336,1.8068840947060778,1.8070779355402466,1.807271633374788,1.8074651882530086,1.8076586002182755,1.8078518693140158,1.8080449955837157,1.8082379790709215,1.8084308198192387,1.8086235178723322,1.8088160732739267,1.8090084860678055,1.8092007562978116,1.8093928840078468,1.8095848692418723,1.8097767120439077,1.8099684124580318,1.8101599705283817,1.8103513862991538,1.8105426598146026,1.8107337911190413,1.8109247802568413,1.8111156272724325,1.811306332210303,1.8114968951149988,1.8116873160311244,1.8118775950033421,1.8120677320763718,1.8122577272949913,1.8124475807040366,1.8126372923484004,1.8128268622730341,1.8130162905229454,1.8132055771432003,1.8133947221789213,1.8135837256752887,1.8137725876775397,1.8139613082309682,1.8141498873809256,1.8143383251728198,1.8145266216521154,1.8147147768643341,1.8149027908550537,1.8150906636699085,1.8152783953545897,1.8154659859548445,1.8156534355164764,1.8158407440853446,1.8160279117073654,1.8162149384285102,1.8164018242948066,1.816588569352338,1.8167751736472435,1.8169616372257178,1.8171479601340113,1.8173341424184297,1.8175201841253343,1.8177060853011415,1.8178918459923228,1.818077466245405,1.8182629461069697,1.8184482856236541,1.8186334848421495,1.8188185438092024,1.8190034625716134,1.8191882411762388,1.8193728796699884,1.819557378099827,1.8197417365127735,1.8199259549559006,1.8201100334763365,1.8202939721212619,1.8204777709379125,1.820661429973578,1.8208449492756007,1.8210283288913782,1.8212115688683608,1.8213946692540526,1.8215776300960114,1.8217604514418475,1.821943133339226,1.8221256758358637,1.8223080789795316,1.8224903428180532,1.8226724673993049,1.8228544527712167,1.8230362989817706,1.823218006079001,1.8233995741109963,1.823581003125896,1.823762293171893,1.823943444297232,1.82412445655021,1.8243053299791763,1.8244860646325323,1.8246666605587316,1.8248471178062793,1.8250274364237327,1.8252076164597004,1.825387657962843,1.825567560981873,1.8257473255655532,1.8259269517626993,1.8261064396221776,1.826285789192905,1.8264650005238505,1.826644073664034,1.826823008662526,1.8270018055684476,1.8271804644309717,1.8273589852993213,1.82753736822277,1.8277156132506416,1.8278937204323111,1.8280716898172034,1.8282495214547938,1.8284272153946075,1.8286047716862206,1.8287821903792578,1.8289594715233952,1.8291366151683581,1.8293136213639212,1.8294904901599094,1.829667221606197,1.829843815752708,1.8300202726494152,1.8301965923463412,1.830372774893558,1.8305488203411864,1.8307247287393964,1.8309005001384067,1.8310761345884852,1.8312516321399486,1.8314269928431621,1.8316022167485397,1.8317773039065441,1.831952254367686,1.8321270681825248,1.8323017454016681,1.8324762860757715,1.832650690255539,1.8328249579917228,1.8329990893351225,1.8331730843365857,1.8333469430470077,1.8335206655173322,1.8336942517985495,1.8338677019416978,1.834041015997863,1.8342141940181782,1.8343872360538231,1.8345601421560254,1.8347329123760594,1.8349055467652464,1.8350780453749551,1.8352504082566008,1.8354226354616445,1.8355947270415953,1.8357666830480084,1.8359385035324849,1.8361101885466729,1.8362817381422665,1.8364531523710061,1.8366244312846782,1.8367955749351155,1.8369665833741964,1.8371374566538452,1.8373081948260324,1.8374787979427731,1.8376492660561294,1.837819599218208,1.837989797481161,1.8381598608971865,1.8383297895185275,1.838499583397472,1.8386692425863531,1.8388387671375492,1.8390081571034833,1.8391774125366238,1.8393465334894827,1.839515520014618,1.8396843721646317,1.8398530899921695,1.8400216735499226,1.8401901228906263,1.84035843806706,1.8405266191320468,1.8406946661384544,1.8408625791391946,1.8410303581872225,1.841198003335537,1.841365514637182,1.8415328921452427,1.8417001359128502,1.8418672459931773,1.8420342224394413,1.8422010653049021,1.842367774642863,1.842534350506671,1.842700792949715],"x":[-0.8,-0.8004008016032064,-0.8008016032064128,-0.8012024048096192,-0.8016032064128257,-0.8020040080160321,-0.8024048096192384,-0.8028056112224449,-0.8032064128256513,-0.8036072144288577,-0.8040080160320642,-0.8044088176352705,-0.8048096192384769,-0.8052104208416834,-0.8056112224448898,-0.8060120240480962,-0.8064128256513026,-0.806813627254509,-0.8072144288577154,-0.8076152304609219,-0.8080160320641283,-0.8084168336673346,-0.8088176352705411,-0.8092184368737475,-0.8096192384769539,-0.8100200400801604,-0.8104208416833667,-0.8108216432865731,-0.8112224448897796,-0.811623246492986,-0.8120240480961923,-0.8124248496993988,-0.8128256513026052,-0.8132264529058116,-0.8136272545090181,-0.8140280561122244,-0.8144288577154308,-0.8148296593186373,-0.8152304609218437,-0.8156312625250501,-0.8160320641282565,-0.8164328657314629,-0.8168336673346693,-0.8172344689378758,-0.8176352705410822,-0.8180360721442885,-0.818436873747495,-0.8188376753507014,-0.8192384769539078,-0.8196392785571143,-0.8200400801603206,-0.820440881763527,-0.8208416833667335,-0.8212424849699399,-0.8216432865731463,-0.8220440881763527,-0.8224448897795591,-0.8228456913827655,-0.823246492985972,-0.8236472945891784,-0.8240480961923847,-0.8244488977955912,-0.8248496993987976,-0.825250501002004,-0.8256513026052105,-0.8260521042084168,-0.8264529058116232,-0.8268537074148297,-0.8272545090180361,-0.8276553106212425,-0.8280561122244489,-0.8284569138276553,-0.8288577154308617,-0.8292585170340682,-0.8296593186372746,-0.8300601202404809,-0.8304609218436874,-0.8308617234468938,-0.8312625250501002,-0.8316633266533067,-0.832064128256513,-0.8324649298597194,-0.8328657314629259,-0.8332665330661323,-0.8336673346693386,-0.8340681362725451,-0.8344689378757515,-0.8348697394789579,-0.8352705410821644,-0.8356713426853707,-0.8360721442885771,-0.8364729458917836,-0.83687374749499,-0.8372745490981964,-0.8376753507014028,-0.8380761523046092,-0.8384769539078156,-0.8388777555110221,-0.8392785571142285,-0.8396793587174348,-0.8400801603206413,-0.8404809619238477,-0.8408817635270541,-0.8412825651302606,-0.8416833667334669,-0.8420841683366733,-0.8424849699398798,-0.8428857715430862,-0.8432865731462926,-0.843687374749499,-0.8440881763527054,-0.8444889779559118,-0.8448897795591183,-0.8452905811623247,-0.845691382765531,-0.8460921843687375,-0.8464929859719439,-0.8468937875751503,-0.8472945891783568,-0.8476953907815631,-0.8480961923847695,-0.848496993987976,-0.8488977955911824,-0.8492985971943888,-0.8496993987975952,-0.8501002004008016,-0.850501002004008,-0.8509018036072145,-0.8513026052104209,-0.8517034068136272,-0.8521042084168337,-0.8525050100200401,-0.8529058116232465,-0.853306613226453,-0.8537074148296593,-0.8541082164328657,-0.8545090180360722,-0.8549098196392786,-0.855310621242485,-0.8557114228456913,-0.8561122244488978,-0.8565130260521042,-0.8569138276553107,-0.857314629258517,-0.8577154308617234,-0.8581162324649299,-0.8585170340681363,-0.8589178356713427,-0.859318637274549,-0.8597194388777555,-0.8601202404809619,-0.8605210420841684,-0.8609218436873748,-0.8613226452905811,-0.8617234468937875,-0.862124248496994,-0.8625250501002004,-0.8629258517034069,-0.8633266533066132,-0.8637274549098196,-0.864128256513026,-0.8645290581162325,-0.8649298597194389,-0.8653306613226452,-0.8657314629258517,-0.8661322645290581,-0.8665330661322646,-0.866933867735471,-0.8673346693386773,-0.8677354709418837,-0.8681362725450902,-0.8685370741482966,-0.868937875751503,-0.8693386773547094,-0.8697394789579158,-0.8701402805611222,-0.8705410821643287,-0.8709418837675351,-0.8713426853707414,-0.8717434869739479,-0.8721442885771543,-0.8725450901803607,-0.8729458917835672,-0.8733466933867735,-0.87374749498998,-0.8741482965931864,-0.8745490981963928,-0.8749498997995993,-0.8753507014028056,-0.875751503006012,-0.8761523046092184,-0.8765531062124249,-0.8769539078156313,-0.8773547094188376,-0.8777555110220441,-0.8781563126252505,-0.878557114228457,-0.8789579158316633,-0.8793587174348697,-0.8797595190380761,-0.8801603206412826,-0.880561122244489,-0.8809619238476953,-0.8813627254509018,-0.8817635270541082,-0.8821643286573146,-0.8825651302605211,-0.8829659318637274,-0.8833667334669338,-0.8837675350701403,-0.8841683366733467,-0.8845691382765531,-0.8849699398797595,-0.8853707414829659,-0.8857715430861723,-0.8861723446893788,-0.8865731462925852,-0.8869739478957915,-0.887374749498998,-0.8877755511022044,-0.8881763527054108,-0.8885771543086173,-0.8889779559118236,-0.88937875751503,-0.8897795591182365,-0.8901803607214429,-0.8905811623246493,-0.8909819639278557,-0.8913827655310621,-0.8917835671342685,-0.892184368737475,-0.8925851703406814,-0.8929859719438877,-0.8933867735470942,-0.8937875751503006,-0.894188376753507,-0.8945891783567135,-0.8949899799599198,-0.8953907815631262,-0.8957915831663327,-0.8961923847695391,-0.8965931863727455,-0.8969939879759519,-0.8973947895791583,-0.8977955911823647,-0.8981963927855712,-0.8985971943887776,-0.8989979959919839,-0.8993987975951904,-0.8997995991983968,-0.9002004008016032,-0.9006012024048096,-0.901002004008016,-0.9014028056112224,-0.9018036072144289,-0.9022044088176353,-0.9026052104208416,-0.9030060120240481,-0.9034068136272545,-0.9038076152304609,-0.9042084168336674,-0.9046092184368737,-0.9050100200400801,-0.9054108216432866,-0.905811623246493,-0.9062124248496994,-0.9066132264529058,-0.9070140280561122,-0.9074148296593186,-0.9078156312625251,-0.9082164328657315,-0.9086172344689378,-0.9090180360721443,-0.9094188376753507,-0.9098196392785571,-0.9102204408817636,-0.9106212424849699,-0.9110220440881763,-0.9114228456913828,-0.9118236472945892,-0.9122244488977956,-0.912625250501002,-0.9130260521042084,-0.9134268537074148,-0.9138276553106213,-0.9142284569138277,-0.914629258517034,-0.9150300601202405,-0.9154308617234469,-0.9158316633266533,-0.9162324649298598,-0.9166332665330661,-0.9170340681362725,-0.917434869739479,-0.9178356713426854,-0.9182364729458918,-0.9186372745490982,-0.9190380761523046,-0.919438877755511,-0.9198396793587175,-0.9202404809619239,-0.9206412825651302,-0.9210420841683367,-0.9214428857715431,-0.9218436873747495,-0.9222444889779559,-0.9226452905811623,-0.9230460921843687,-0.9234468937875752,-0.9238476953907816,-0.9242484969939879,-0.9246492985971944,-0.9250501002004008,-0.9254509018036072,-0.9258517034068137,-0.92625250501002,-0.9266533066132264,-0.9270541082164329,-0.9274549098196393,-0.9278557114228457,-0.928256513026052,-0.9286573146292585,-0.9290581162324649,-0.9294589178356714,-0.9298597194388778,-0.9302605210420841,-0.9306613226452906,-0.931062124248497,-0.9314629258517034,-0.9318637274549099,-0.9322645290581162,-0.9326653306613226,-0.9330661322645291,-0.9334669338677355,-0.9338677354709419,-0.9342685370741483,-0.9346693386773547,-0.9350701402805611,-0.9354709418837676,-0.935871743486974,-0.9362725450901803,-0.9366733466933868,-0.9370741482965932,-0.9374749498997996,-0.9378757515030061,-0.9382765531062124,-0.9386773547094188,-0.9390781563126253,-0.9394789579158317,-0.9398797595190381,-0.9402805611222445,-0.9406813627254509,-0.9410821643286573,-0.9414829659318638,-0.9418837675350702,-0.9422845691382765,-0.942685370741483,-0.9430861723446894,-0.9434869739478958,-0.9438877755511023,-0.9442885771543086,-0.944689378757515,-0.9450901803607215,-0.9454909819639279,-0.9458917835671342,-0.9462925851703406,-0.9466933867735471,-0.9470941883767535,-0.94749498997996,-0.9478957915831663,-0.9482965931863727,-0.9486973947895792,-0.9490981963927856,-0.949498997995992,-0.9498997995991983,-0.9503006012024048,-0.9507014028056112,-0.9511022044088177,-0.9515030060120241,-0.9519038076152304,-0.9523046092184368,-0.9527054108216433,-0.9531062124248497,-0.9535070140280562,-0.9539078156312625,-0.9543086172344689,-0.9547094188376753,-0.9551102204408818,-0.9555110220440882,-0.9559118236472945,-0.956312625250501,-0.9567134268537074,-0.9571142284569139,-0.9575150300601203,-0.9579158316633266,-0.958316633266533,-0.9587174348697395,-0.9591182364729459,-0.9595190380761524,-0.9599198396793587,-0.9603206412825651,-0.9607214428857715,-0.961122244488978,-0.9615230460921844,-0.9619238476953907,-0.9623246492985972,-0.9627254509018036,-0.96312625250501,-0.9635270541082165,-0.9639278557114228,-0.9643286573146292,-0.9647294589178357,-0.9651302605210421,-0.9655310621242486,-0.9659318637274549,-0.9663326653306613,-0.9667334669338677,-0.9671342685370742,-0.9675350701402805,-0.9679358717434869,-0.9683366733466934,-0.9687374749498998,-0.9691382765531062,-0.9695390781563126,-0.969939879759519,-0.9703406813627254,-0.9707414829659319,-0.9711422845691383,-0.9715430861723446,-0.9719438877755511,-0.9723446893787575,-0.972745490981964,-0.9731462925851704,-0.9735470941883767,-0.9739478957915831,-0.9743486973947896,-0.974749498997996,-0.9751503006012024,-0.9755511022044088,-0.9759519038076152,-0.9763527054108216,-0.9767535070140281,-0.9771543086172345,-0.9775551102204408,-0.9779559118236473,-0.9783567134268537,-0.9787575150300601,-0.9791583166332666,-0.9795591182364729,-0.9799599198396793,-0.9803607214428858,-0.9807615230460922,-0.9811623246492986,-0.981563126252505,-0.9819639278557114,-0.9823647294589178,-0.9827655310621243,-0.9831663326653307,-0.983567134268537,-0.9839679358717435,-0.9843687374749499,-0.9847695390781563,-0.9851703406813628,-0.9855711422845691,-0.9859719438877755,-0.986372745490982,-0.9867735470941884,-0.9871743486973948,-0.9875751503006012,-0.9879759519038076,-0.988376753507014,-0.9887775551102205,-0.9891783567134268,-0.9895791583166332,-0.9899799599198397,-0.9903807615230461,-0.9907815631262525,-0.9911823647294589,-0.9915831663326653,-0.9919839679358717,-0.9923847695390782,-0.9927855711422846,-0.9931863727454909,-0.9935871743486974,-0.9939879759519038,-0.9943887775551102,-0.9947895791583167,-0.995190380761523,-0.9955911823647294,-0.9959919839679359,-0.9963927855711423,-0.9967935871743487,-0.9971943887775551,-0.9975951903807615,-0.9979959919839679,-0.9983967935871744,-0.9987975951903808,-0.9991983967935871,-0.9995991983967936,-1.0]}
},{}],23:[function(require,module,exports){
module.exports={"expected":[0.2578990352923395,0.2576606404954732,0.25742239860456434,0.2571843095980334,0.25694637345421656,0.25670859015136593,0.25647095966764916,0.2562334819811498,0.25599615706986745,0.25575898491171756,0.2555219654845319,0.2552850987660582,0.2550483847339606,0.2548118233658193,0.2545754146391313,0.2543391585313096,0.2541030550196842,0.25386710408150137,0.2536313056939242,0.25339565983403267,0.25316016647882333,0.25292482560521,0.25268963719002324,0.2524546012100108,0.2522197176418374,0.25198498646208534,0.25175040764725404,0.2515159811737601,0.2512817070179379,0.2510475851560392,0.2508136155642334,0.2505797982186076,0.25034613309516646,0.2501126201698329,0.24987925941844735,0.2496460508167686,0.2494129943404731,0.24918008996515573,0.24894733766632954,0.24871473741942596,0.24848228919979454,0.24824999298270356,0.24801784874333965,0.24778585645680817,0.24755401609813316,0.2473223276422573,0.24709079106404225,0.24685940633826853,0.2466281734396356,0.2463970923427622,0.2461661630221859,0.24593538545236382,0.24570475960767213,0.24547428546240663,0.24524396299078233,0.24501379216693397,0.24478377296491582,0.24455390535870192,0.24432418932218591,0.24409462482918148,0.24386521185342225,0.24363595036856162,0.24340684034817334,0.2431778817657511,0.24294907459470905,0.24272041880838158,0.24249191438002338,0.24226356128280968,0.24203535948983634,0.24180730897411978,0.24157940970859726,0.24135166166612654,0.24112406481948645,0.24089661914137694,0.24066932460441864,0.2404421811811535,0.24021518884404464,0.23998834756547638,0.23976165731775445,0.23953511807310596,0.23930872980367957,0.2390824924815454,0.23885640607869535,0.23863047056704306,0.238404685918424,0.23817905210459545,0.2379535690972367,0.23772823686794908,0.23750305538825622,0.2372780246296038,0.23705314456335969,0.23682841516081443,0.23660383639318083,0.23637940823159426,0.2361551306471128,0.23593100361071695,0.23570702709331037,0.23548320106571924,0.2352595254986929,0.23503600036290362,0.23481262562894667,0.23458940126734068,0.2343663272485274,0.234143403542872,0.23392063012066305,0.2336980069521124,0.23347553400735588,0.23325321125645265,0.23303103866938568,0.23280901621606198,0.23258714386631205,0.23236542158989065,0.23214384935647658,0.2319224271356727,0.2317011548970062,0.23148003260992836,0.231259060243815,0.23103823776796645,0.23081756515160745,0.2305970423638875,0.2303766693738806,0.23015644615058573,0.2299363726629266,0.229716448879752,0.22949667476983576,0.22927705030187656,0.22905757544449856,0.22883825016625103,0.22861907443560867,0.22840004822097165,0.22818117149066547,0.22796244421294137,0.22774386635597632,0.22752543788787294,0.22730715877665975,0.22708902899029115,0.22687104849664752,0.22665321726353543,0.22643553525868754,0.2262180024497628,0.2260006188043464,0.22578338428995007,0.22556629887401192,0.2253493625238968,0.22513257520689595,0.2249159368902276,0.22469944754103666,0.22448310712639502,0.22426691561330156,0.22405087296868212,0.22383497915938977,0.22361923415220486,0.22340363791383494,0.2231881904109151,0.22297289161000772,0.22275774147760286,0.22254273998011823,0.22232788708389922,0.22211318275521919,0.221898626960279,0.22168421966520788,0.2214699608360629,0.22125585043882945,0.22104188843942094,0.22082807480367914,0.22061440949737426,0.22040089248620492,0.22018752373579834,0.2199743032117104,0.2197612308794256,0.2195483067043572,0.21933553065184758,0.21912290268716783,0.2189104227755183,0.21869809088202818,0.21848590697175618,0.21827387100969015,0.21806198296074733,0.21785024278977452,0.21763865046154784,0.21742720594077328,0.21721590919208641,0.21700476018005263,0.2167937588691673,0.21658290522385554,0.21637219920847267,0.2161616407873041,0.21595122992456547,0.21574096658440275,0.2155308507308921,0.21532088232804034,0.21511106133978478,0.21490138772999334,0.21469186146246472,0.21448248250092825,0.21427325080904427,0.2140641663504041,0.21385522908853008,0.21364643898687558,0.2134377960088253,0.2132293001176952,0.21302095127673268,0.21281274944911655,0.21260469459795706,0.2123967866862963,0.21218902567710793,0.21198141153329747,0.2117739442177024,0.21156662369309193,0.21135944992216754,0.2111524228675628,0.21094554249184347,0.21073880875750767,0.21053222162698576,0.21032578106264074,0.21011948702676808,0.20991333948159593,0.2097073383892852,0.20950148371192945,0.2092957754115553,0.2090902134501223,0.208884797789523,0.20867952839158332,0.20847440521806204,0.2082694282306515,0.20806459739097743,0.20785991266059903,0.20765537400100906,0.20745098137363385,0.20724673473983357,0.2070426340609022,0.20683867929806762,0.20663487041249173,0.20643120736527035,0.20622769011743367,0.206024318629946,0.205821092863706,0.20561801277954686,0.20541507833823605,0.2052122895004758,0.20500964622690293,0.20480714847808904,0.20460479621454064,0.20440258939669897,0.20420052798494048,0.20399861193957658,0.20379684122085395,0.20359521578895456,0.2033937356039955,0.20319240062602958,0.20299121081504495,0.2027901661309655,0.2025892665336506,0.2023885119828956,0.20218790243843157,0.20198743785992568,0.20178711820698098,0.20158694343913666,0.20138691351586815,0.20118702839658714,0.20098728804064173,0.20078769240731648,0.20058824145583232,0.20038893514534706,0.20018977343495503,0.19999075628368748,0.19979188365051248,0.19959315549433504,0.19939457177399728,0.1991961324482784,0.19899783747589492,0.1987996868155006,0.19860168042568652,0.19840381826498138,0.19820610029185137,0.19800852646470032,0.19781109674186992,0.19761381108163947,0.1974166694422263,0.19721967178178576,0.1970228180584112,0.1968261082301343,0.19662954225492466,0.19643312009069053,0.19623684169527844,0.19604070702647347,0.19584471604199932,0.19564886869951822,0.19545316495663134,0.19525760477087858,0.19506218809973885,0.19486691490063013,0.19467178513090927,0.19447679874787255,0.19428195570875545,0.19408725597073279,0.19389269949091892,0.19369828622636762,0.19350401613407234,0.19330988917096623,0.19311590529392225,0.19292206445975327,0.19272836662521203,0.19253481174699139,0.19234139978172432,0.19214813068598413,0.19195500441628416,0.19176202092907843,0.1915691801807613,0.19137648212766775,0.19118392672607346,0.1909915139321946,0.19079924370218848,0.1906071159921532,0.19041513075812772,0.19022328795609236,0.19003158754196836,0.18984002947161835,0.18964861370084624,0.18945734018539742,0.1892662088809588,0.18907521974315877,0.18888437272756758,0.1886936677896971,0.18850310488500116,0.18831268396887557,0.18812240499665794,0.1879322679236283,0.1877422727050087,0.18755241929596353,0.18736270765159957,0.18717313772696598,0.1869837094770546,0.18679442285679979,0.18660527782107872,0.18641627432471136,0.18622741232246043,0.18603869176903182,0.1858501126190744,0.18566167482718018,0.18547337834788452,0.1852852231356659,0.18509720914494635,0.18490933633009143,0.1847216046454102,0.18453401404515551,0.18434656448352374,0.18415925591465532,0.1839720882926346,0.1837850615714898,0.18359817570519346,0.18341143064766208,0.18322482635275655,0.1830383627742822,0.18285203986598864,0.1826658575815702,0.18247981587466564,0.18229391469885856,0.1821081540076773,0.1819225337545951,0.1817370538930303,0.18155171437634596,0.18136651515785057,0.18118145619079778,0.18099653742838656,0.1808117588237612,0.18062712033001152,0.18044262190017296,0.18025826348722662,0.1800740450440993,0.17988996652366362,0.17970602787873813,0.17952222906208745,0.1793385700264222,0.17915505072439933,0.17897167110862183,0.17878843113163922,0.1786053307459474,0.1784223699039888,0.1782395485581525,0.17805686666077414,0.17787432416413632,0.17769192102046844,0.17750965718194683,0.17732753260069495,0.17714554722878326,0.17696370101822953,0.17678199392099883,0.17660042588900363,0.17641899687410384,0.17623770682810694,0.17605655570276804,0.1758755434497901,0.17569467002082373,0.17551393536746768,0.17533333944126844,0.17515288219372074,0.17497256357626748,0.17479238354029972,0.17461234203715706,0.17443243901812724,0.17425267443444675,0.17407304823730063,0.17389356037782255,0.1737142108070951,0.17353499947614948,0.17335592633596608,0.17317699133747422,0.17299819443155234,0.1728195355690282,0.17264101470067866,0.17246263177723012,0.1722843867493584,0.17210627956768884,0.17192831018279656,0.1717504785452062,0.17157278460539235,0.1713952283137795,0.17121780962074215,0.17104052847660473,0.17086338483164198,0.17068637863607883,0.1705095098400906,0.170332778393803,0.17015618424729215,0.1699797273505849,0.16980340765365873,0.1696272251064419,0.1694511796588136,0.1692752712606037,0.1690994998615934,0.16892386541151483,0.1687483678600514,0.16857300715683787,0.16839778325146015,0.1682226960934558,0.1680477456323139,0.16787293181747515,0.16769825459833196,0.16752371392422846,0.16734930974446086,0.16717504200827718,0.1670009106648776,0.16682691566341448,0.16665305695299226,0.16647933448266783,0.16630574820145053,0.16613229805830204,0.16595898400213688,0.16578580598182188,0.16561276394617697,0.1654398578439747,0.16526708762394066,0.16509445323475347,0.16492195462504475,0.16474959174339937,0.16457736453835548,0.16440527295840457,0.16423331695199167,0.16406149646751517,0.1638898114533272,0.16371826185773358,0.1635468476289939,0.16337556871532175,0.16320442506488445,0.16303341662580353,0.16286254334615463,0.16269180517396767,0.16252120205722684,0.1623507339438706,0.16218040078179208,0.16201020251883888,0.16184013910281336,0.16167021048147245,0.16150041660252804,0.16133075741364689,0.1611612328624508,0.1609918428965166,0.1608225874633763,0.16065346651051718,0.16048447998538187,0.16031562783536848,0.16014691000783063,0.15997832645007734,0.1598098771093736,0.15964156193294005,0.15947338086795318,0.1593053338615455,0.1591374208608054,0.15896964181277756,0.15880199666446276,0.15863448536281816,0.15846710785475726,0.1582998640871499,0.1581327540068227,0.1579657775605587,0.15779893469509784,0.15763222535713678,0.15746564949332903,0.15729920705028513],"x":[0.8,0.8004008016032064,0.8008016032064128,0.8012024048096192,0.8016032064128257,0.8020040080160321,0.8024048096192384,0.8028056112224449,0.8032064128256513,0.8036072144288577,0.8040080160320642,0.8044088176352705,0.8048096192384769,0.8052104208416834,0.8056112224448898,0.8060120240480962,0.8064128256513026,0.806813627254509,0.8072144288577154,0.8076152304609219,0.8080160320641283,0.8084168336673346,0.8088176352705411,0.8092184368737475,0.8096192384769539,0.8100200400801604,0.8104208416833667,0.8108216432865731,0.8112224448897796,0.811623246492986,0.8120240480961923,0.8124248496993988,0.8128256513026052,0.8132264529058116,0.8136272545090181,0.8140280561122244,0.8144288577154308,0.8148296593186373,0.8152304609218437,0.8156312625250501,0.8160320641282565,0.8164328657314629,0.8168336673346693,0.8172344689378758,0.8176352705410822,0.8180360721442885,0.818436873747495,0.8188376753507014,0.8192384769539078,0.8196392785571143,0.8200400801603206,0.820440881763527,0.8208416833667335,0.8212424849699399,0.8216432865731463,0.8220440881763527,0.8224448897795591,0.8228456913827655,0.823246492985972,0.8236472945891784,0.8240480961923847,0.8244488977955912,0.8248496993987976,0.825250501002004,0.8256513026052105,0.8260521042084168,0.8264529058116232,0.8268537074148297,0.8272545090180361,0.8276553106212425,0.8280561122244489,0.8284569138276553,0.8288577154308617,0.8292585170340682,0.8296593186372746,0.8300601202404809,0.8304609218436874,0.8308617234468938,0.8312625250501002,0.8316633266533067,0.832064128256513,0.8324649298597194,0.8328657314629259,0.8332665330661323,0.8336673346693386,0.8340681362725451,0.8344689378757515,0.8348697394789579,0.8352705410821644,0.8356713426853707,0.8360721442885771,0.8364729458917836,0.83687374749499,0.8372745490981964,0.8376753507014028,0.8380761523046092,0.8384769539078156,0.8388777555110221,0.8392785571142285,0.8396793587174348,0.8400801603206413,0.8404809619238477,0.8408817635270541,0.8412825651302606,0.8416833667334669,0.8420841683366733,0.8424849699398798,0.8428857715430862,0.8432865731462926,0.843687374749499,0.8440881763527054,0.8444889779559118,0.8448897795591183,0.8452905811623247,0.845691382765531,0.8460921843687375,0.8464929859719439,0.8468937875751503,0.8472945891783568,0.8476953907815631,0.8480961923847695,0.848496993987976,0.8488977955911824,0.8492985971943888,0.8496993987975952,0.8501002004008016,0.850501002004008,0.8509018036072145,0.8513026052104209,0.8517034068136272,0.8521042084168337,0.8525050100200401,0.8529058116232465,0.853306613226453,0.8537074148296593,0.8541082164328657,0.8545090180360722,0.8549098196392786,0.855310621242485,0.8557114228456913,0.8561122244488978,0.8565130260521042,0.8569138276553107,0.857314629258517,0.8577154308617234,0.8581162324649299,0.8585170340681363,0.8589178356713427,0.859318637274549,0.8597194388777555,0.8601202404809619,0.8605210420841684,0.8609218436873748,0.8613226452905811,0.8617234468937875,0.862124248496994,0.8625250501002004,0.8629258517034069,0.8633266533066132,0.8637274549098196,0.864128256513026,0.8645290581162325,0.8649298597194389,0.8653306613226452,0.8657314629258517,0.8661322645290581,0.8665330661322646,0.866933867735471,0.8673346693386773,0.8677354709418837,0.8681362725450902,0.8685370741482966,0.868937875751503,0.8693386773547094,0.8697394789579158,0.8701402805611222,0.8705410821643287,0.8709418837675351,0.8713426853707414,0.8717434869739479,0.8721442885771543,0.8725450901803607,0.8729458917835672,0.8733466933867735,0.87374749498998,0.8741482965931864,0.8745490981963928,0.8749498997995993,0.8753507014028056,0.875751503006012,0.8761523046092184,0.8765531062124249,0.8769539078156313,0.8773547094188376,0.8777555110220441,0.8781563126252505,0.878557114228457,0.8789579158316633,0.8793587174348697,0.8797595190380761,0.8801603206412826,0.880561122244489,0.8809619238476953,0.8813627254509018,0.8817635270541082,0.8821643286573146,0.8825651302605211,0.8829659318637274,0.8833667334669338,0.8837675350701403,0.8841683366733467,0.8845691382765531,0.8849699398797595,0.8853707414829659,0.8857715430861723,0.8861723446893788,0.8865731462925852,0.8869739478957915,0.887374749498998,0.8877755511022044,0.8881763527054108,0.8885771543086173,0.8889779559118236,0.88937875751503,0.8897795591182365,0.8901803607214429,0.8905811623246493,0.8909819639278557,0.8913827655310621,0.8917835671342685,0.892184368737475,0.8925851703406814,0.8929859719438877,0.8933867735470942,0.8937875751503006,0.894188376753507,0.8945891783567135,0.8949899799599198,0.8953907815631262,0.8957915831663327,0.8961923847695391,0.8965931863727455,0.8969939879759519,0.8973947895791583,0.8977955911823647,0.8981963927855712,0.8985971943887776,0.8989979959919839,0.8993987975951904,0.8997995991983968,0.9002004008016032,0.9006012024048096,0.901002004008016,0.9014028056112224,0.9018036072144289,0.9022044088176353,0.9026052104208416,0.9030060120240481,0.9034068136272545,0.9038076152304609,0.9042084168336674,0.9046092184368737,0.9050100200400801,0.9054108216432866,0.905811623246493,0.9062124248496994,0.9066132264529058,0.9070140280561122,0.9074148296593186,0.9078156312625251,0.9082164328657315,0.9086172344689378,0.9090180360721443,0.9094188376753507,0.9098196392785571,0.9102204408817636,0.9106212424849699,0.9110220440881763,0.9114228456913828,0.9118236472945892,0.9122244488977956,0.912625250501002,0.9130260521042084,0.9134268537074148,0.9138276553106213,0.9142284569138277,0.914629258517034,0.9150300601202405,0.9154308617234469,0.9158316633266533,0.9162324649298598,0.9166332665330661,0.9170340681362725,0.917434869739479,0.9178356713426854,0.9182364729458918,0.9186372745490982,0.9190380761523046,0.919438877755511,0.9198396793587175,0.9202404809619239,0.9206412825651302,0.9210420841683367,0.9214428857715431,0.9218436873747495,0.9222444889779559,0.9226452905811623,0.9230460921843687,0.9234468937875752,0.9238476953907816,0.9242484969939879,0.9246492985971944,0.9250501002004008,0.9254509018036072,0.9258517034068137,0.92625250501002,0.9266533066132264,0.9270541082164329,0.9274549098196393,0.9278557114228457,0.928256513026052,0.9286573146292585,0.9290581162324649,0.9294589178356714,0.9298597194388778,0.9302605210420841,0.9306613226452906,0.931062124248497,0.9314629258517034,0.9318637274549099,0.9322645290581162,0.9326653306613226,0.9330661322645291,0.9334669338677355,0.9338677354709419,0.9342685370741483,0.9346693386773547,0.9350701402805611,0.9354709418837676,0.935871743486974,0.9362725450901803,0.9366733466933868,0.9370741482965932,0.9374749498997996,0.9378757515030061,0.9382765531062124,0.9386773547094188,0.9390781563126253,0.9394789579158317,0.9398797595190381,0.9402805611222445,0.9406813627254509,0.9410821643286573,0.9414829659318638,0.9418837675350702,0.9422845691382765,0.942685370741483,0.9430861723446894,0.9434869739478958,0.9438877755511023,0.9442885771543086,0.944689378757515,0.9450901803607215,0.9454909819639279,0.9458917835671342,0.9462925851703406,0.9466933867735471,0.9470941883767535,0.94749498997996,0.9478957915831663,0.9482965931863727,0.9486973947895792,0.9490981963927856,0.949498997995992,0.9498997995991983,0.9503006012024048,0.9507014028056112,0.9511022044088177,0.9515030060120241,0.9519038076152304,0.9523046092184368,0.9527054108216433,0.9531062124248497,0.9535070140280562,0.9539078156312625,0.9543086172344689,0.9547094188376753,0.9551102204408818,0.9555110220440882,0.9559118236472945,0.956312625250501,0.9567134268537074,0.9571142284569139,0.9575150300601203,0.9579158316633266,0.958316633266533,0.9587174348697395,0.9591182364729459,0.9595190380761524,0.9599198396793587,0.9603206412825651,0.9607214428857715,0.961122244488978,0.9615230460921844,0.9619238476953907,0.9623246492985972,0.9627254509018036,0.96312625250501,0.9635270541082165,0.9639278557114228,0.9643286573146292,0.9647294589178357,0.9651302605210421,0.9655310621242486,0.9659318637274549,0.9663326653306613,0.9667334669338677,0.9671342685370742,0.9675350701402805,0.9679358717434869,0.9683366733466934,0.9687374749498998,0.9691382765531062,0.9695390781563126,0.969939879759519,0.9703406813627254,0.9707414829659319,0.9711422845691383,0.9715430861723446,0.9719438877755511,0.9723446893787575,0.972745490981964,0.9731462925851704,0.9735470941883767,0.9739478957915831,0.9743486973947896,0.974749498997996,0.9751503006012024,0.9755511022044088,0.9759519038076152,0.9763527054108216,0.9767535070140281,0.9771543086172345,0.9775551102204408,0.9779559118236473,0.9783567134268537,0.9787575150300601,0.9791583166332666,0.9795591182364729,0.9799599198396793,0.9803607214428858,0.9807615230460922,0.9811623246492986,0.981563126252505,0.9819639278557114,0.9823647294589178,0.9827655310621243,0.9831663326653307,0.983567134268537,0.9839679358717435,0.9843687374749499,0.9847695390781563,0.9851703406813628,0.9855711422845691,0.9859719438877755,0.986372745490982,0.9867735470941884,0.9871743486973948,0.9875751503006012,0.9879759519038076,0.988376753507014,0.9887775551102205,0.9891783567134268,0.9895791583166332,0.9899799599198397,0.9903807615230461,0.9907815631262525,0.9911823647294589,0.9915831663326653,0.9919839679358717,0.9923847695390782,0.9927855711422846,0.9931863727454909,0.9935871743486974,0.9939879759519038,0.9943887775551102,0.9947895791583167,0.995190380761523,0.9955911823647294,0.9959919839679359,0.9963927855711423,0.9967935871743487,0.9971943887775551,0.9975951903807615,0.9979959919839679,0.9983967935871744,0.9987975951903808,0.9991983967935871,0.9995991983967936,1.0]}
},{}],24:[function(require,module,exports){
module.exports={"expected":[1.7421009647076606,1.7401882991566318,1.7382658354669251,1.7363335631770103,1.7343914721763778,1.7324395527079512,1.7304777953704829,1.7285061911209323,1.7265247312768275,1.7245334075186076,1.7225322118919473,1.7205211368100644,1.7185001750560058,1.7164693197849163,1.7144285645262882,1.7123779031861885,1.7103173300494687,1.708246839781952,1.7061664274326016,1.7040760884356667,1.7019758186128062,1.6998656141751929,1.6977454717255929,1.6956153882604252,1.6934753611717965,1.6913253882495136,1.6891654676830727,1.6869955980636253,1.684815778385918,1.6826260080502111,1.6804262868641708,1.6782166150447355,1.6759969932199594,1.6737674224308279,1.671527904133049,1.6692784401988185,1.6670190329185566,1.6647496850026209,1.6624703995829897,1.6601811802149196,1.6578820308785747,1.6555729559806271,1.6532539603558325,1.6509250492685723,1.6485862284143713,1.6462375039213837,1.6438788823518515,1.6415103707035317,1.6391319764110952,1.6367437073474935,1.634345571825298,1.6319375785980053,1.6295197368613137,1.6270920562543683,1.6246545468609737,1.6222072192107757,1.6197500842804116,1.617283153494626,1.6148064387273573,1.6123199523027893,1.6098237069963703,1.6073177160358003,1.6048019931019817,1.6022765523299407,1.599741408309711,1.5971965760871858,1.5946420711649345,1.5920779095029847,1.5895041075195702,1.586920682091844,1.5843276505565558,1.5817250307106931,1.57911284081209,1.5764910995799961,1.5738598261956138,1.5712190403025945,1.5685687620075037,1.5659090118802466,1.5632398109544567,1.560561180727849,1.5578731431625368,1.5551757206853092,1.552468936187872,1.5497528130270533,1.5470273750249675,1.5442926464691462,1.5415486521126267,1.5387954171740048,1.536032967337451,1.5332613287526844,1.530480528034911,1.5276905922647228,1.5248915489879589,1.5220834262155258,1.5192662524231806,1.5164400565512752,1.5136048680044603,1.5107607166513501,1.5079076328241512,1.5050456473182454,1.5021747913917403,1.499295096764975,1.4964065956199897,1.4935093205999528,1.4906033048085505,1.4876885818093362,1.4847651856250381,1.48183315073683,1.47889251208356,1.4759433050609394,1.4729855655206925,1.4700193297696653,1.467044634568896,1.4640615171326425,1.461070015127373,1.458070166670713,1.4550620103303555,1.4520455851229304,1.4490209305128305,1.4459880864110026,1.4429470931736943,1.4398979916011632,1.4368408229363445,1.43377562886348,1.430702451506706,1.4276213334286012,1.4245323176286966,1.4214354475419424,1.4183307670371388,1.4152183204153228,1.4120981524081204,1.4089703081760538,1.4058348333068142,1.4026917738134907,1.3995411761327636,1.3963830871230556,1.3932175540626457,1.3900446246477425,1.3868643469905209,1.3836767696171164,1.3804819414655845,1.3772799118838188,1.3740707306274316,1.3708544478575966,1.367631114138852,1.3644007804368674,1.3611634981161707,1.357919318937839,1.354668295057151,1.3514104790212027,1.3481459237664835,1.3448746826164193,1.3415968092788741,1.3383123578436185,1.3350213827797588,1.331723938933133,1.3284200815236662,1.3251098661426943,1.3217933487502493,1.31847058567231,1.3151416335980166,1.3118065495768518,1.3084653910157846,1.3051182156763814,1.3017650816718822,1.2984060474642416,1.2950411718611363,1.291670514012941,1.288294133409666,1.2849120898778674,1.2815244435775195,1.278131254998857,1.274732584959185,1.2713284945996552,1.2679190453820117,1.2645042990853042,1.2610843178025704,1.2576591639374888,1.2542289002009968,1.2507935896078832,1.2473532954733477,1.243908081409531,1.2404580113220156,1.2370031494062983,1.2335435601442326,1.2300793083004433,1.2266104589187126,1.2231370773183388,1.2196592290904666,1.2161769800943918,1.2126903964538371,1.2091995445532036,1.2057044910337937,1.2022053027900115,1.1987020469655345,1.195194790949462,1.1916836023724389,1.1881685491027545,1.184649699242418,1.1811271211232097,1.1776008833027096,1.1740710545603035,1.1705377038931657,1.1670009005122204,1.163460713838082,1.1599172134969722,1.1563704693166188,1.1528205513221323,1.1492675297318633,1.14571147495324,1.1421524575785864,1.1385905483809216,1.135025818309742,1.1314583384867833,1.1278881802017677,1.1243154149081307,1.120740114218735,1.1171623499015644,1.113582193875405,1.1099997182055088,1.1064149950992441,1.1028280969017301,1.0992390960914573,1.0956480652758962,1.0920550771870898,1.0884602046772365,1.0848635207142583,1.0812650983773584,1.077665010852567,1.0740633314282764,1.0704601334907653,1.0668554905197127,1.0632494760837043,1.0596421638357265,1.056033627508654,1.0524239409107294,1.0488131779210335,1.0452014124849494,1.04158871860962,1.0379751703593978,1.0343608418512908,1.030745807250401,1.0271301407653597,1.023513916643757,1.0198972091675678,1.0162800926485747,1.012662641423787,1.009044929850858,1.0054270323034988,1.001809023166893,0.9981909768331069,0.994572967696501,0.9909550701491422,0.9873373585762131,0.9837199073514254,0.9801027908324322,0.976486083356243,0.9728698592346402,0.9692541927495989,0.9656391581487092,0.9620248296406022,0.95841128139038,0.9547985875150505,0.9511868220789665,0.9475760590892707,0.9439663724913461,0.9403578361642736,0.9367505239162957,0.9331445094802872,0.9295398665092348,0.9259366685717236,0.9223349891474331,0.9187349016226417,0.9151364792857418,0.9115397953227636,0.9079449228129103,0.9043519347241039,0.9007609039085426,0.8971719030982699,0.8935850049007558,0.8900002817944912,0.8864178061245951,0.8828376500984356,0.879259885781265,0.8756845850918692,0.8721118197982324,0.8685416615132167,0.8649741816902582,0.8614094516190784,0.8578475424214137,0.85428852504676,0.8507324702681366,0.8471794486778677,0.8436295306833812,0.8400827865030278,0.8365392861619181,0.8329990994877796,0.8294622961068343,0.8259289454396965,0.8223991166972905,0.8188728788767904,0.815350300757582,0.8118314508972455,0.8083163976275611,0.804805209050538,0.8012979530344655,0.7977946972099884,0.7942955089662063,0.7908004554467966,0.7873096035461629,0.7838230199056082,0.7803407709095335,0.7768629226816613,0.7733895410812874,0.7699206916995568,0.7664564398557675,0.7629968505937017,0.7595419886779845,0.7560919185904691,0.7526467045266523,0.7492064103921168,0.7457710997990032,0.7423408360625113,0.7389156821974295,0.735495700914696,0.7320809546179883,0.7286715054003448,0.7252674150408149,0.721868745001143,0.7184755564224806,0.7150879101221326,0.711705866590334,0.708329485987059,0.7049588281388636,0.7015939525357585,0.6982349183281178,0.6948817843236186,0.6915346089842155,0.6881934504231483,0.6848583664019834,0.68152941432769,0.6782066512497507,0.6748901338573056,0.6715799184763338,0.668276061066867,0.6649786172202411,0.6616876421563817,0.658403190721126,0.6551253173835808,0.6518540762335165,0.6485895209787974,0.645331704942849,0.6420806810621611,0.6388365018838293,0.6355992195631326,0.6323688858611479,0.6291455521424034,0.6259292693725683,0.6227200881161813,0.6195180585344155,0.6163232303828837,0.6131356530094791,0.6099553753522574,0.6067824459373543,0.6036169128769443,0.6004588238672364,0.5973082261865093,0.5941651666931859,0.5910296918239462,0.5879018475918797,0.5847816795846772,0.5816692329628613,0.5785645524580575,0.5754676823713035,0.5723786665713988,0.5692975484932941,0.5662243711365199,0.5631591770636555,0.5601020083988368,0.5570529068263057,0.5540119135889975,0.5509790694871695,0.5479544148770696,0.5449379896696444,0.5419298333292871,0.538929984872627,0.5359384828673573,0.532955365431104,0.5299806702303347,0.5270144344793076,0.5240566949390606,0.5211074879164399,0.5181668492631698,0.5152348143749619,0.512311418190664,0.5093966951914495,0.5064906794000473,0.5035934043800104,0.500704903235025,0.4978252086082598,0.4949543526817546,0.4920923671758489,0.4892392833486498,0.4863951319955399,0.4835599434487247,0.4807337475768193,0.4779165737844741,0.47510845101204097,0.472309407735277,0.4695194719650891,0.46673867124731555,0.4639670326625489,0.4612045828259952,0.45845134788737346,0.45570735353085373,0.45297262497503243,0.45024718697294674,0.447531063812128,0.4448242793146908,0.44212685683746306,0.43943881927215095,0.43676018904554337,0.43409098811975333,0.43143123799249616,0.42878095969740554,0.42614017380438635,0.4235089004200037,0.4208871591879101,0.4182749692893069,0.4156723494434442,0.4130793179081559,0.41049589248042984,0.40792209049701533,0.4053579288350655,0.40280342391281415,0.400258591690289,0.39772344767005935,0.3951980068980182,0.3926822839641997,0.39017629300362955,0.3876800476972107,0.38519356127264276,0.38271684650537413,0.38024991571958844,0.37779278078922424,0.37534545313902634,0.37290794374563174,0.3704802631386863,0.36806242140199474,0.36565442817470195,0.36325629265250636,0.3608680235889048,0.3584896292964682,0.35612111764814847,0.3537624960786163,0.35141377158562886,0.3490749507314277,0.3467460396441675,0.34442704401937285,0.34211796912142545,0.33981881978508033,0.3375296004170103,0.3352503149973791,0.3329809670814434,0.33072155980118156,0.328472095866951,0.3262325775691722,0.32400300678004057,0.3217833849552643,0.31957371313582916,0.31737399194978877,0.31518422161408205,0.3130044019363747,0.3108345323169271,0.3086746117504864,0.3065246388282034,0.30438461173957476,0.3022545282744072,0.3001343858248072,0.2980241813871938,0.29592391156433334,0.29383357256739834,0.2917531602180481,0.2896826699505313,0.2876220968138113,0.2855714354737116,0.2835306802150835,0.2814998249439943,0.2794788631899356,0.2774677881080526,0.2754665924813924,0.27347526872317235,0.27149380887906766,0.26952220462951726,0.26756044729204886,0.2656085278236222,0.26366643682298974,0.26173416453307485,0.2598117008433682,0.2578990352923395],"x":[-0.8,-0.7967935871743487,-0.7935871743486974,-0.790380761523046,-0.7871743486973948,-0.7839679358717435,-0.7807615230460921,-0.7775551102204409,-0.7743486973947896,-0.7711422845691382,-0.767935871743487,-0.7647294589178357,-0.7615230460921844,-0.7583166332665331,-0.7551102204408817,-0.7519038076152305,-0.7486973947895792,-0.7454909819639278,-0.7422845691382766,-0.7390781563126253,-0.7358717434869739,-0.7326653306613227,-0.7294589178356713,-0.72625250501002,-0.7230460921843688,-0.7198396793587174,-0.7166332665330661,-0.7134268537074149,-0.7102204408817635,-0.7070140280561122,-0.7038076152304609,-0.7006012024048096,-0.6973947895791583,-0.694188376753507,-0.6909819639278557,-0.6877755511022045,-0.6845691382765531,-0.6813627254509018,-0.6781563126252504,-0.6749498997995992,-0.6717434869739479,-0.6685370741482966,-0.6653306613226453,-0.662124248496994,-0.6589178356713427,-0.6557114228456914,-0.6525050100200401,-0.6492985971943888,-0.6460921843687375,-0.6428857715430861,-0.6396793587174349,-0.6364729458917836,-0.6332665330661322,-0.630060120240481,-0.6268537074148297,-0.6236472945891783,-0.6204408817635271,-0.6172344689378757,-0.6140280561122244,-0.6108216432865732,-0.6076152304609218,-0.6044088176352705,-0.6012024048096193,-0.5979959919839679,-0.5947895791583167,-0.5915831663326653,-0.588376753507014,-0.5851703406813628,-0.5819639278557114,-0.5787575150300601,-0.5755511022044089,-0.5723446893787575,-0.5691382765531062,-0.565931863727455,-0.5627254509018036,-0.5595190380761523,-0.556312625250501,-0.5531062124248497,-0.5498997995991984,-0.5466933867735471,-0.5434869739478958,-0.5402805611222445,-0.5370741482965932,-0.5338677354709419,-0.5306613226452905,-0.5274549098196393,-0.524248496993988,-0.5210420841683366,-0.5178356713426854,-0.5146292585170341,-0.5114228456913827,-0.5082164328657315,-0.5050100200400801,-0.5018036072144288,-0.49859719438877753,-0.49539078156312627,-0.49218436873747495,-0.48897795591182364,-0.4857715430861723,-0.48256513026052106,-0.47935871743486974,-0.4761523046092184,-0.4729458917835671,-0.46973947895791585,-0.46653306613226453,-0.4633266533066132,-0.46012024048096195,-0.45691382765531063,-0.4537074148296593,-0.450501002004008,-0.44729458917835674,-0.4440881763527054,-0.4408817635270541,-0.4376753507014028,-0.4344689378757515,-0.4312625250501002,-0.4280561122244489,-0.4248496993987976,-0.4216432865731463,-0.418436873747495,-0.4152304609218437,-0.41202404809619236,-0.4088176352705411,-0.4056112224448898,-0.40240480961923847,-0.39919839679358715,-0.3959919839679359,-0.3927855711422846,-0.38957915831663326,-0.38637274549098194,-0.3831663326653307,-0.37995991983967936,-0.37675350701402804,-0.3735470941883767,-0.37034068136272547,-0.36713426853707415,-0.36392785571142283,-0.36072144288577157,-0.35751503006012025,-0.35430861723446894,-0.3511022044088176,-0.34789579158316636,-0.34468937875751504,-0.3414829659318637,-0.3382765531062124,-0.33507014028056115,-0.33186372745490983,-0.3286573146292585,-0.3254509018036072,-0.32224448897795593,-0.3190380761523046,-0.3158316633266533,-0.312625250501002,-0.3094188376753507,-0.3062124248496994,-0.3030060120240481,-0.29979959919839677,-0.2965931863727455,-0.2933867735470942,-0.2901803607214429,-0.28697394789579156,-0.2837675350701403,-0.280561122244489,-0.27735470941883766,-0.27414829659318635,-0.2709418837675351,-0.26773547094188377,-0.26452905811623245,-0.26132264529058113,-0.2581162324649299,-0.25490981963927856,-0.25170340681362724,-0.24849699398797595,-0.24529058116232466,-0.24208416833667334,-0.23887775551102206,-0.23567134268537074,-0.23246492985971945,-0.22925851703406813,-0.22605210420841684,-0.22284569138276553,-0.21963927855711424,-0.21643286573146292,-0.21322645290581163,-0.21002004008016031,-0.20681362725450902,-0.2036072144288577,-0.20040080160320642,-0.1971943887775551,-0.1939879759519038,-0.1907815631262525,-0.1875751503006012,-0.1843687374749499,-0.1811623246492986,-0.17795591182364728,-0.174749498997996,-0.17154308617234468,-0.1683366733466934,-0.16513026052104207,-0.16192384769539078,-0.15871743486973947,-0.15551102204408818,-0.1523046092184369,-0.14909819639278557,-0.14589178356713428,-0.14268537074148296,-0.13947895791583168,-0.13627254509018036,-0.13306613226452907,-0.12985971943887775,-0.12665330661322646,-0.12344689378757515,-0.12024048096192384,-0.11703406813627254,-0.11382765531062124,-0.11062124248496993,-0.10741482965931863,-0.10420841683366733,-0.10100200400801604,-0.09779559118236474,-0.09458917835671343,-0.09138276553106213,-0.08817635270541083,-0.08496993987975952,-0.08176352705410822,-0.07855711422845692,-0.07535070140280561,-0.07214428857715431,-0.06893787575150301,-0.0657314629258517,-0.0625250501002004,-0.0593186372745491,-0.056112224448897796,-0.05290581162324649,-0.04969939879759519,-0.04649298597194389,-0.043286573146292584,-0.04008016032064128,-0.03687374749498998,-0.033667334669338675,-0.030460921843687375,-0.027254509018036072,-0.02404809619238477,-0.020841683366733466,-0.017635270541082163,-0.014428857715430862,-0.011222444889779559,-0.008016032064128256,-0.004809619238476954,-0.0016032064128256513,0.0016032064128256513,0.004809619238476954,0.008016032064128256,0.011222444889779559,0.014428857715430862,0.017635270541082163,0.020841683366733466,0.02404809619238477,0.027254509018036072,0.030460921843687375,0.033667334669338675,0.03687374749498998,0.04008016032064128,0.043286573146292584,0.04649298597194389,0.04969939879759519,0.05290581162324649,0.056112224448897796,0.0593186372745491,0.0625250501002004,0.0657314629258517,0.06893787575150301,0.07214428857715431,0.07535070140280561,0.07855711422845692,0.08176352705410822,0.08496993987975952,0.08817635270541083,0.09138276553106213,0.09458917835671343,0.09779559118236474,0.10100200400801604,0.10420841683366733,0.10741482965931863,0.11062124248496993,0.11382765531062124,0.11703406813627254,0.12024048096192384,0.12344689378757515,0.12665330661322646,0.12985971943887775,0.13306613226452907,0.13627254509018036,0.13947895791583168,0.14268537074148296,0.14589178356713428,0.14909819639278557,0.1523046092184369,0.15551102204408818,0.15871743486973947,0.16192384769539078,0.16513026052104207,0.1683366733466934,0.17154308617234468,0.174749498997996,0.17795591182364728,0.1811623246492986,0.1843687374749499,0.1875751503006012,0.1907815631262525,0.1939879759519038,0.1971943887775551,0.20040080160320642,0.2036072144288577,0.20681362725450902,0.21002004008016031,0.21322645290581163,0.21643286573146292,0.21963927855711424,0.22284569138276553,0.22605210420841684,0.22925851703406813,0.23246492985971945,0.23567134268537074,0.23887775551102206,0.24208416833667334,0.24529058116232466,0.24849699398797595,0.25170340681362724,0.25490981963927856,0.2581162324649299,0.26132264529058113,0.26452905811623245,0.26773547094188377,0.2709418837675351,0.27414829659318635,0.27735470941883766,0.280561122244489,0.2837675350701403,0.28697394789579156,0.2901803607214429,0.2933867735470942,0.2965931863727455,0.29979959919839677,0.3030060120240481,0.3062124248496994,0.3094188376753507,0.312625250501002,0.3158316633266533,0.3190380761523046,0.32224448897795593,0.3254509018036072,0.3286573146292585,0.33186372745490983,0.33507014028056115,0.3382765531062124,0.3414829659318637,0.34468937875751504,0.34789579158316636,0.3511022044088176,0.35430861723446894,0.35751503006012025,0.36072144288577157,0.36392785571142283,0.36713426853707415,0.37034068136272547,0.3735470941883767,0.37675350701402804,0.37995991983967936,0.3831663326653307,0.38637274549098194,0.38957915831663326,0.3927855711422846,0.3959919839679359,0.39919839679358715,0.40240480961923847,0.4056112224448898,0.4088176352705411,0.41202404809619236,0.4152304609218437,0.418436873747495,0.4216432865731463,0.4248496993987976,0.4280561122244489,0.4312625250501002,0.4344689378757515,0.4376753507014028,0.4408817635270541,0.4440881763527054,0.44729458917835674,0.450501002004008,0.4537074148296593,0.45691382765531063,0.46012024048096195,0.4633266533066132,0.46653306613226453,0.46973947895791585,0.4729458917835671,0.4761523046092184,0.47935871743486974,0.48256513026052106,0.4857715430861723,0.48897795591182364,0.49218436873747495,0.49539078156312627,0.49859719438877753,0.5018036072144288,0.5050100200400801,0.5082164328657315,0.5114228456913827,0.5146292585170341,0.5178356713426854,0.5210420841683366,0.524248496993988,0.5274549098196393,0.5306613226452905,0.5338677354709419,0.5370741482965932,0.5402805611222445,0.5434869739478958,0.5466933867735471,0.5498997995991984,0.5531062124248497,0.556312625250501,0.5595190380761523,0.5627254509018036,0.565931863727455,0.5691382765531062,0.5723446893787575,0.5755511022044089,0.5787575150300601,0.5819639278557114,0.5851703406813628,0.588376753507014,0.5915831663326653,0.5947895791583167,0.5979959919839679,0.6012024048096193,0.6044088176352705,0.6076152304609218,0.6108216432865732,0.6140280561122244,0.6172344689378757,0.6204408817635271,0.6236472945891783,0.6268537074148297,0.630060120240481,0.6332665330661322,0.6364729458917836,0.6396793587174349,0.6428857715430861,0.6460921843687375,0.6492985971943888,0.6525050100200401,0.6557114228456914,0.6589178356713427,0.662124248496994,0.6653306613226453,0.6685370741482966,0.6717434869739479,0.6749498997995992,0.6781563126252504,0.6813627254509018,0.6845691382765531,0.6877755511022045,0.6909819639278557,0.694188376753507,0.6973947895791583,0.7006012024048096,0.7038076152304609,0.7070140280561122,0.7102204408817635,0.7134268537074149,0.7166332665330661,0.7198396793587174,0.7230460921843688,0.72625250501002,0.7294589178356713,0.7326653306613227,0.7358717434869739,0.7390781563126253,0.7422845691382766,0.7454909819639278,0.7486973947895792,0.7519038076152305,0.7551102204408817,0.7583166332665331,0.7615230460921844,0.7647294589178357,0.767935871743487,0.7711422845691382,0.7743486973947896,0.7775551102204409,0.7807615230460921,0.7839679358717435,0.7871743486973948,0.790380761523046,0.7935871743486974,0.7967935871743487,0.8]}
},{}],25:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[1.0e-309,9.9799599198397e-310,9.95991983967936e-310,9.9398797595191e-310,9.91983967935875e-310,9.8997995991984e-310,9.8797595190381e-310,9.85971943887776e-310,9.83967935871747e-310,9.81963927855714e-310,9.7995991983968e-310,9.7795591182365e-310,9.75951903807615e-310,9.73947895791587e-310,9.71943887775554e-310,9.6993987975952e-310,9.6793587174349e-310,9.65931863727455e-310,9.63927855711427e-310,9.61923847695394e-310,9.5991983967936e-310,9.5791583166333e-310,9.55911823647295e-310,9.53907815631267e-310,9.51903807615234e-310,9.498997995992e-310,9.4789579158317e-310,9.45891783567135e-310,9.43887775551106e-310,9.41883767535073e-310,9.3987975951904e-310,9.37875751503007e-310,9.35871743486974e-310,9.3386773547094e-310,9.31863727454913e-310,9.2985971943888e-310,9.27855711422847e-310,9.25851703406814e-310,9.2384769539078e-310,9.21843687374753e-310,9.1983967935872e-310,9.17835671342687e-310,9.15831663326654e-310,9.1382765531062e-310,9.11823647294593e-310,9.0981963927856e-310,9.07815631262527e-310,9.05811623246494e-310,9.0380761523046e-310,9.0180360721443e-310,8.997995991984e-310,8.97795591182366e-310,8.95791583166333e-310,8.937875751503e-310,8.9178356713427e-310,8.8977955911824e-310,8.87775551102206e-310,8.85771543086173e-310,8.8376753507014e-310,8.8176352705411e-310,8.7975951903808e-310,8.77755511022046e-310,8.75751503006013e-310,8.7374749498998e-310,8.7174348697395e-310,8.6973947895792e-310,8.67735470941886e-310,8.65731462925853e-310,8.6372745490982e-310,8.6172344689379e-310,8.5971943887776e-310,8.57715430861725e-310,8.5571142284569e-310,8.5370741482966e-310,8.5170340681363e-310,8.496993987976e-310,8.47695390781565e-310,8.4569138276553e-310,8.436873747495e-310,8.4168336673347e-310,8.3967935871744e-310,8.37675350701405e-310,8.3567134268537e-310,8.3366733466934e-310,8.31663326653306e-310,8.2965931863728e-310,8.27655310621245e-310,8.2565130260521e-310,8.2364729458918e-310,8.21643286573145e-310,8.19639278557117e-310,8.17635270541084e-310,8.1563126252505e-310,8.1362725450902e-310,8.11623246492985e-310,8.09619238476957e-310,8.07615230460924e-310,8.0561122244489e-310,8.0360721442886e-310,8.01603206412825e-310,7.99599198396797e-310,7.97595190380764e-310,7.9559118236473e-310,7.935871743487e-310,7.91583166332665e-310,7.89579158316637e-310,7.87575150300604e-310,7.8557114228457e-310,7.83567134268538e-310,7.81563126252504e-310,7.79559118236476e-310,7.77555110220443e-310,7.7555110220441e-310,7.73547094188377e-310,7.71543086172344e-310,7.69539078156316e-310,7.67535070140283e-310,7.6553106212425e-310,7.63527054108217e-310,7.61523046092184e-310,7.59519038076156e-310,7.57515030060123e-310,7.5551102204409e-310,7.53507014028057e-310,7.51503006012024e-310,7.49498997995996e-310,7.47494989979963e-310,7.4549098196393e-310,7.43486973947897e-310,7.41482965931863e-310,7.39478957915835e-310,7.374749498998e-310,7.3547094188377e-310,7.33466933867736e-310,7.31462925851703e-310,7.29458917835675e-310,7.2745490981964e-310,7.2545090180361e-310,7.23446893787576e-310,7.21442885771543e-310,7.19438877755515e-310,7.1743486973948e-310,7.1543086172345e-310,7.13426853707416e-310,7.11422845691383e-310,7.0941883767535e-310,7.0741482965932e-310,7.0541082164329e-310,7.03406813627256e-310,7.01402805611222e-310,6.9939879759519e-310,6.9739478957916e-310,6.9539078156313e-310,6.93386773547095e-310,6.9138276553106e-310,6.8937875751503e-310,6.87374749499e-310,6.8537074148297e-310,6.83366733466935e-310,6.813627254509e-310,6.7935871743487e-310,6.7735470941884e-310,6.7535070140281e-310,6.73346693386775e-310,6.7134268537074e-310,6.6933867735471e-310,6.6733466933868e-310,6.6533066132265e-310,6.63326653306615e-310,6.6132264529058e-310,6.5931863727455e-310,6.5731462925852e-310,6.55310621242487e-310,6.53306613226454e-310,6.5130260521042e-310,6.4929859719439e-310,6.4729458917836e-310,6.45290581162327e-310,6.43286573146294e-310,6.4128256513026e-310,6.3927855711423e-310,6.372745490982e-310,6.35270541082167e-310,6.33266533066134e-310,6.312625250501e-310,6.2925851703407e-310,6.2725450901804e-310,6.25250501002007e-310,6.23246492985974e-310,6.2124248496994e-310,6.19238476953907e-310,6.1723446893788e-310,6.15230460921846e-310,6.13226452905813e-310,6.1122244488978e-310,6.09218436873747e-310,6.07214428857714e-310,6.05210420841686e-310,6.03206412825653e-310,6.0120240480962e-310,5.99198396793587e-310,5.97194388777554e-310,5.95190380761526e-310,5.93186372745493e-310,5.9118236472946e-310,5.89178356713427e-310,5.87174348697394e-310,5.85170340681366e-310,5.83166332665333e-310,5.811623246493e-310,5.79158316633266e-310,5.77154308617233e-310,5.75150300601205e-310,5.7314629258517e-310,5.7114228456914e-310,5.69138276553106e-310,5.67134268537073e-310,5.65130260521045e-310,5.6312625250501e-310,5.6112224448898e-310,5.59118236472946e-310,5.57114228456913e-310,5.55110220440885e-310,5.5310621242485e-310,5.5110220440882e-310,5.49098196392786e-310,5.47094188376753e-310,5.45090180360725e-310,5.4308617234469e-310,5.4108216432866e-310,5.39078156312625e-310,5.3707414829659e-310,5.35070140280564e-310,5.3306613226453e-310,5.310621242485e-310,5.29058116232465e-310,5.2705410821643e-310,5.25050100200404e-310,5.2304609218437e-310,5.2104208416834e-310,5.19038076152305e-310,5.1703406813627e-310,5.15030060120244e-310,5.1302605210421e-310,5.1102204408818e-310,5.09018036072145e-310,5.0701402805611e-310,5.05010020040084e-310,5.0300601202405e-310,5.01002004008017e-310,4.98997995991984e-310,4.9699398797595e-310,4.9498997995992e-310,4.9298597194389e-310,4.90981963927857e-310,4.88977955911824e-310,4.8697394789579e-310,4.8496993987976e-310,4.8296593186373e-310,4.80961923847697e-310,4.78957915831664e-310,4.7695390781563e-310,4.749498997996e-310,4.7294589178357e-310,4.70941883767537e-310,4.68937875751504e-310,4.6693386773547e-310,4.6492985971944e-310,4.6292585170341e-310,4.60921843687376e-310,4.58917835671343e-310,4.5691382765531e-310,4.54909819639277e-310,4.5290581162325e-310,4.50901803607216e-310,4.48897795591183e-310,4.4689378757515e-310,4.44889779559117e-310,4.4288577154309e-310,4.40881763527056e-310,4.38877755511023e-310,4.3687374749499e-310,4.34869739478957e-310,4.3286573146293e-310,4.30861723446896e-310,4.28857715430863e-310,4.2685370741483e-310,4.24849699398797e-310,4.2284569138277e-310,4.20841683366735e-310,4.188376753507e-310,4.1683366733467e-310,4.14829659318636e-310,4.1282565130261e-310,4.10821643286575e-310,4.0881763527054e-310,4.0681362725451e-310,4.04809619238476e-310,4.0280561122245e-310,4.00801603206415e-310,3.9879759519038e-310,3.9679358717435e-310,3.94789579158316e-310,3.9278557114229e-310,3.90781563126255e-310,3.8877755511022e-310,3.8677354709419e-310,3.84769539078156e-310,3.82765531062123e-310,3.80761523046094e-310,3.7875751503006e-310,3.7675350701403e-310,3.74749498997995e-310,3.7274549098196e-310,3.70741482965934e-310,3.687374749499e-310,3.6673346693387e-310,3.64729458917835e-310,3.627254509018e-310,3.60721442885774e-310,3.5871743486974e-310,3.5671342685371e-310,3.54709418837675e-310,3.5270541082164e-310,3.50701402805614e-310,3.4869739478958e-310,3.4669338677355e-310,3.44689378757515e-310,3.4268537074148e-310,3.40681362725453e-310,3.3867735470942e-310,3.36673346693387e-310,3.34669338677354e-310,3.3266533066132e-310,3.30661322645293e-310,3.2865731462926e-310,3.26653306613227e-310,3.24649298597194e-310,3.2264529058116e-310,3.20641282565133e-310,3.186372745491e-310,3.16633266533067e-310,3.14629258517034e-310,3.12625250501e-310,3.10621242484973e-310,3.0861723446894e-310,3.06613226452907e-310,3.04609218436874e-310,3.0260521042084e-310,3.0060120240481e-310,2.9859719438878e-310,2.96593186372746e-310,2.94589178356713e-310,2.9258517034068e-310,2.9058116232465e-310,2.8857715430862e-310,2.86573146292586e-310,2.84569138276553e-310,2.8256513026052e-310,2.8056112224449e-310,2.7855711422846e-310,2.76553106212426e-310,2.74549098196393e-310,2.7254509018036e-310,2.70541082164327e-310,2.685370741483e-310,2.66533066132266e-310,2.64529058116233e-310,2.625250501002e-310,2.60521042084167e-310,2.5851703406814e-310,2.56513026052105e-310,2.5450901803607e-310,2.5250501002004e-310,2.50501002004006e-310,2.4849699398798e-310,2.46492985971945e-310,2.4448897795591e-310,2.4248496993988e-310,2.40480961923846e-310,2.3847695390782e-310,2.36472945891785e-310,2.3446893787575e-310,2.3246492985972e-310,2.30460921843686e-310,2.2845691382766e-310,2.26452905811625e-310,2.2444889779559e-310,2.2244488977956e-310,2.20440881763526e-310,2.18436873747497e-310,2.16432865731464e-310,2.1442885771543e-310,2.124248496994e-310,2.10420841683365e-310,2.08416833667337e-310,2.06412825651304e-310,2.0440881763527e-310,2.0240480961924e-310,2.00400801603205e-310,1.98396793587177e-310,1.96392785571144e-310,1.9438877755511e-310,1.9238476953908e-310,1.90380761523045e-310,1.88376753507017e-310,1.86372745490984e-310,1.8436873747495e-310,1.8236472945892e-310,1.80360721442885e-310,1.78356713426856e-310,1.76352705410823e-310,1.7434869739479e-310,1.72344689378757e-310,1.70340681362724e-310,1.68336673346696e-310,1.66332665330663e-310,1.6432865731463e-310,1.62324649298597e-310,1.60320641282564e-310,1.5831663326653e-310,1.56312625250503e-310,1.5430861723447e-310,1.52304609218437e-310,1.50300601202404e-310,1.4829659318637e-310,1.46292585170343e-310,1.4428857715431e-310,1.42284569138277e-310,1.40280561122244e-310,1.3827655310621e-310,1.3627254509018e-310,1.3426853707415e-310,1.32264529058116e-310,1.30260521042083e-310,1.2825651302605e-310,1.2625250501002e-310,1.2424849699399e-310,1.22244488977956e-310,1.20240480961923e-310,1.1823647294589e-310,1.1623246492986e-310,1.1422845691383e-310,1.12224448897796e-310,1.10220440881763e-310,1.0821643286573e-310,1.062124248497e-310,1.0420841683367e-310,1.02204408817636e-310,1.00200400801603e-310,9.819639278557e-311,9.619238476954e-311,9.418837675351e-311,9.2184368737475e-311,9.018036072144e-311,8.817635270541e-311,8.617234468938e-311,8.416833667335e-311,8.2164328657315e-311,8.016032064128e-311,7.815631262525e-311,7.615230460922e-311,7.414829659319e-311,7.2144288577155e-311,7.014028056112e-311,6.813627254509e-311,6.613226452906e-311,6.412825651303e-311,6.2124248496995e-311,6.012024048096e-311,5.811623246493e-311,5.61122244489e-311,5.4108216432867e-311,5.2104208416834e-311,5.01002004008e-311,4.809619238477e-311,4.6092184368735e-311,4.4088176352707e-311,4.2084168336674e-311,4.008016032064e-311,3.807615230461e-311,3.6072144288575e-311,3.4068136272547e-311,3.2064128256514e-311,3.006012024048e-311,2.805611222445e-311,2.6052104208415e-311,2.4048096192387e-311,2.2044088176354e-311,2.004008016032e-311,1.8036072144287e-311,1.6032064128254e-311,1.4028056112226e-311,1.2024048096193e-311,1.002004008016e-311,8.016032064127e-312,6.012024048094e-312,4.008016032066e-312,2.004008016033e-312,0.0]}
},{}],26:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[-1.0e-300,-9.979959920040082e-301,-9.959919840080161e-301,-9.93987976012024e-301,-9.91983968016032e-301,-9.899799600200401e-301,-9.879759520240481e-301,-9.859719440280562e-301,-9.839679360320642e-301,-9.819639280360723e-301,-9.799599200400803e-301,-9.779559120440882e-301,-9.75951904048096e-301,-9.739478960521041e-301,-9.719438880561123e-301,-9.699398800601202e-301,-9.679358720641283e-301,-9.659318640681363e-301,-9.639278560721442e-301,-9.619238480761522e-301,-9.599198400801603e-301,-9.579158320841683e-301,-9.559118240881764e-301,-9.539078160921844e-301,-9.519038080961925e-301,-9.498998001002004e-301,-9.478957921042084e-301,-9.458917841082164e-301,-9.438877761122243e-301,-9.418837681162325e-301,-9.398797601202406e-301,-9.378757521242485e-301,-9.358717441282567e-301,-9.338677361322646e-301,-9.318637281362724e-301,-9.298597201402806e-301,-9.278557121442885e-301,-9.258517041482966e-301,-9.238476961523046e-301,-9.218436881563127e-301,-9.198396801603207e-301,-9.178356721643288e-301,-9.158316641683366e-301,-9.138276561723447e-301,-9.118236481763527e-301,-9.098196401803608e-301,-9.078156321843687e-301,-9.058116241883769e-301,-9.038076161923849e-301,-9.018036081963928e-301,-8.997996002004008e-301,-8.977955922044087e-301,-8.957915842084168e-301,-8.93787576212425e-301,-8.917835682164329e-301,-8.897795602204409e-301,-8.877755522244491e-301,-8.85771544228457e-301,-8.837675362324649e-301,-8.817635282364728e-301,-8.79759520240481e-301,-8.77755512244489e-301,-8.757515042484969e-301,-8.737474962525051e-301,-8.717434882565132e-301,-8.69739480260521e-301,-8.677354722645291e-301,-8.65731464268537e-301,-8.63727456272545e-301,-8.617234482765532e-301,-8.597194402805611e-301,-8.577154322845691e-301,-8.557114242885772e-301,-8.537074162925852e-301,-8.517034082965931e-301,-8.496994003006012e-301,-8.476953923046092e-301,-8.456913843086173e-301,-8.436873763126253e-301,-8.416833683166334e-301,-8.396793603206412e-301,-8.376753523246494e-301,-8.356713443286573e-301,-8.336673363326652e-301,-8.316633283366734e-301,-8.296593203406813e-301,-8.276553123446893e-301,-8.256513043486976e-301,-8.236472963527054e-301,-8.216432883567135e-301,-8.196392803607215e-301,-8.176352723647294e-301,-8.156312643687375e-301,-8.136272563727455e-301,-8.116232483767535e-301,-8.096192403807616e-301,-8.076152323847696e-301,-8.056112243887777e-301,-8.036072163927854e-301,-8.016032083967936e-301,-7.995992004008017e-301,-7.975951924048095e-301,-7.955911844088178e-301,-7.935871764128258e-301,-7.915831684168337e-301,-7.895791604208417e-301,-7.875751524248496e-301,-7.855711444288577e-301,-7.835671364328657e-301,-7.815631284368737e-301,-7.795591204408818e-301,-7.775551124448898e-301,-7.755511044488979e-301,-7.73547096452906e-301,-7.715430884569136e-301,-7.695390804609219e-301,-7.675350724649299e-301,-7.65531064468938e-301,-7.635270564729458e-301,-7.615230484769539e-301,-7.59519040480962e-301,-7.5751503248497e-301,-7.55511024488978e-301,-7.53507016492986e-301,-7.51503008496994e-301,-7.49499000501002e-301,-7.4749499250501e-301,-7.454909845090181e-301,-7.4348697651302604e-301,-7.414829685170341e-301,-7.3947896052104205e-301,-7.374749525250502e-301,-7.3547094452905814e-301,-7.334669365330661e-301,-7.3146292853707415e-301,-7.294589205410823e-301,-7.274549125450902e-301,-7.254509045490982e-301,-7.2344689655310626e-301,-7.214428885571143e-301,-7.194388805611223e-301,-7.174348725651302e-301,-7.154308645691383e-301,-7.134268565731464e-301,-7.114228485771543e-301,-7.094188405811623e-301,-7.074148325851704e-301,-7.054108245891783e-301,-7.034068165931864e-301,-7.014028085971944e-301,-6.993988006012024e-301,-6.9739479260521044e-301,-6.953907846092185e-301,-6.9338677661322645e-301,-6.913827686172345e-301,-6.8937876062124254e-301,-6.873747526252505e-301,-6.8537074462925855e-301,-6.833667366332666e-301,-6.813627286372746e-301,-6.793587206412826e-301,-6.7735471264529066e-301,-6.753507046492986e-301,-6.733466966533067e-301,-6.7134268865731455e-301,-6.693386806613227e-301,-6.673346726653307e-301,-6.653306646693387e-301,-6.6332665667334665e-301,-6.613226486773548e-301,-6.593186406813627e-301,-6.573146326853708e-301,-6.5531062468937875e-301,-6.533066166933868e-301,-6.513026086973948e-301,-6.492986007014029e-301,-6.472945927054108e-301,-6.452905847094189e-301,-6.4328657671342694e-301,-6.412825687174349e-301,-6.392785607214429e-301,-6.372745527254509e-301,-6.35270544729459e-301,-6.33266536733467e-301,-6.31262528737475e-301,-6.292585207414829e-301,-6.272545127454911e-301,-6.2525050474949894e-301,-6.23246496753507e-301,-6.21242488757515e-301,-6.192384807615231e-301,-6.1723447276553105e-301,-6.152304647695391e-301,-6.1322645677354706e-301,-6.112224487775552e-301,-6.092184407815632e-301,-6.072144327855711e-301,-6.0521042478957916e-301,-6.032064167935872e-301,-6.012024087975952e-301,-5.991984008016032e-301,-5.971943928056113e-301,-5.951903848096192e-301,-5.931863768136273e-301,-5.911823688176353e-301,-5.891783608216433e-301,-5.871743528256513e-301,-5.851703448296594e-301,-5.831663368336673e-301,-5.811623288376754e-301,-5.7915832084168334e-301,-5.771543128456913e-301,-5.751503048496994e-301,-5.731462968537074e-301,-5.7114228885771545e-301,-5.691382808617234e-301,-5.6713427286573146e-301,-5.651302648697395e-301,-5.6312625687374755e-301,-5.611222488777554e-301,-5.5911824088176356e-301,-5.571142328857716e-301,-5.551102248897796e-301,-5.531062168937875e-301,-5.511022088977957e-301,-5.490982009018036e-301,-5.470941929058117e-301,-5.450901849098196e-301,-5.430861769138276e-301,-5.410821689178357e-301,-5.390781609218438e-301,-5.3707415292585165e-301,-5.350701449298597e-301,-5.3306613693386774e-301,-5.310621289378758e-301,-5.2905812094188375e-301,-5.270541129458917e-301,-5.2505010494989985e-301,-5.230460969539079e-301,-5.210420889579158e-301,-5.190380809619238e-301,-5.1703407296593195e-301,-5.150300649699399e-301,-5.130260569739479e-301,-5.110220489779559e-301,-5.090180409819639e-301,-5.07014032985972e-301,-5.0501002498998e-301,-5.030060169939879e-301,-5.01002008997996e-301,-4.989980010020041e-301,-4.96993993006012e-301,-4.9498998501002e-301,-4.929859770140281e-301,-4.909819690180361e-301,-4.889779610220441e-301,-4.869739530260521e-301,-4.849699450300601e-301,-4.829659370340682e-301,-4.809619290380761e-301,-4.789579210420842e-301,-4.769539130460922e-301,-4.749499050501002e-301,-4.729458970541082e-301,-4.709418890581163e-301,-4.689378810621242e-301,-4.669338730661323e-301,-4.649298650701403e-301,-4.629258570741483e-301,-4.609218490781563e-301,-4.589178410821644e-301,-4.569138330861723e-301,-4.549098250901804e-301,-4.529058170941884e-301,-4.509018090981964e-301,-4.488978011022044e-301,-4.468937931062125e-301,-4.4488978511022045e-301,-4.428857771142285e-301,-4.408817691182364e-301,-4.388777611222445e-301,-4.3687375312625255e-301,-4.348697451302605e-301,-4.328657371342685e-301,-4.308617291382766e-301,-4.288577211422846e-301,-4.268537131462926e-301,-4.248497051503006e-301,-4.228456971543086e-301,-4.208416891583167e-301,-4.188376811623247e-301,-4.168336731663326e-301,-4.1482966517034065e-301,-4.128256571743488e-301,-4.108216491783567e-301,-4.088176411823647e-301,-4.0681363318637275e-301,-4.048096251903808e-301,-4.028056171943888e-301,-4.008016091983968e-301,-3.987976012024048e-301,-3.967935932064129e-301,-3.947895852104209e-301,-3.927855772144288e-301,-3.907815692184369e-301,-3.887775612224449e-301,-3.86773553226453e-301,-3.847695452304609e-301,-3.82765537234469e-301,-3.807615292384769e-301,-3.78757521242485e-301,-3.76753513246493e-301,-3.74749505250501e-301,-3.7274549725450904e-301,-3.7074148925851704e-301,-3.687374812625251e-301,-3.6673347326653305e-301,-3.6472946527054114e-301,-3.627254572745491e-301,-3.6072144927855715e-301,-3.587174412825651e-301,-3.567134332865732e-301,-3.5470942529058116e-301,-3.527054172945892e-301,-3.507014092985972e-301,-3.486974013026052e-301,-3.4669339330661322e-301,-3.4468938531062127e-301,-3.4268537731462927e-301,-3.4068136931863728e-301,-3.3867736132264532e-301,-3.3667335332665333e-301,-3.3466934533066133e-301,-3.3266533733466934e-301,-3.306613293386774e-301,-3.286573213426854e-301,-3.266533133466934e-301,-3.2464930535070144e-301,-3.2264529735470944e-301,-3.2064128935871745e-301,-3.186372813627255e-301,-3.166332733667335e-301,-3.1462926537074146e-301,-3.126252573747495e-301,-3.106212493787575e-301,-3.0861724138276556e-301,-3.0661323338677352e-301,-3.046092253907816e-301,-3.0260521739478957e-301,-3.0060120939879762e-301,-2.9859720140280563e-301,-2.9659319340681367e-301,-2.9458918541082164e-301,-2.9258517741482972e-301,-2.905811694188377e-301,-2.8857716142284573e-301,-2.865731534268537e-301,-2.8456914543086174e-301,-2.8256513743486975e-301,-2.805611294388777e-301,-2.785571214428858e-301,-2.7655311344689376e-301,-2.745491054509018e-301,-2.725450974549098e-301,-2.7054108945891786e-301,-2.6853708146292582e-301,-2.6653307346693387e-301,-2.6452906547094187e-301,-2.625250574749499e-301,-2.605210494789579e-301,-2.5851704148296597e-301,-2.5651303348697393e-301,-2.5450902549098198e-301,-2.5250501749499e-301,-2.50501009498998e-301,-2.48497001503006e-301,-2.4649299350701404e-301,-2.4448898551102204e-301,-2.4248497751503005e-301,-2.4048096951903805e-301,-2.384769615230461e-301,-2.364729535270541e-301,-2.344689455310621e-301,-2.3246493753507016e-301,-2.3046092953907816e-301,-2.2845692154308617e-301,-2.264529135470942e-301,-2.244489055511022e-301,-2.2244489755511022e-301,-2.204408895591182e-301,-2.1843688156312627e-301,-2.1643287356713423e-301,-2.144288655711423e-301,-2.124248575751503e-301,-2.1042084957915833e-301,-2.084168415831663e-301,-2.064128335871744e-301,-2.0440882559118235e-301,-2.024048175951904e-301,-2.004008095991984e-301,-1.9839680160320644e-301,-1.963927936072144e-301,-1.9438878561122245e-301,-1.9238477761523046e-301,-1.9038076961923846e-301,-1.883767616232465e-301,-1.8637275362725451e-301,-1.8436874563126254e-301,-1.8236473763527056e-301,-1.8036072963927857e-301,-1.783567216432866e-301,-1.763527136472946e-301,-1.7434870565130262e-301,-1.7234469765531065e-301,-1.7034068965931863e-301,-1.6833668166332666e-301,-1.6633267366733466e-301,-1.643286656713427e-301,-1.6232465767535072e-301,-1.6032064967935872e-301,-1.5831664168336675e-301,-1.5631263368737475e-301,-1.5430862569138278e-301,-1.523046176953908e-301,-1.503006096993988e-301,-1.4829660170340683e-301,-1.4629259370741486e-301,-1.4428858571142286e-301,-1.4228457771543089e-301,-1.402805697194389e-301,-1.382765617234469e-301,-1.3627255372745492e-301,-1.3426854573146293e-301,-1.3226453773547095e-301,-1.3026052973947896e-301,-1.2825652174348698e-301,-1.26252513747495e-301,-1.2424850575150301e-301,-1.2224449775551104e-301,-1.2024048975951904e-301,-1.1823648176352707e-301,-1.162324737675351e-301,-1.142284657715431e-301,-1.1222445777555112e-301,-1.1022044977955913e-301,-1.0821644178356715e-301,-1.0621243378757514e-301,-1.0420842579158314e-301,-1.0220441779559117e-301,-1.002004097995992e-301,-9.81964018036072e-302,-9.619239380761522e-302,-9.418838581162325e-302,-9.218437781563127e-302,-9.018036981963928e-302,-8.81763618236473e-302,-8.617235382765532e-302,-8.416834583166334e-302,-8.216433783567134e-302,-8.016032983967936e-302,-7.815632184368737e-302,-7.61523138476954e-302,-7.414830585170341e-302,-7.214429785571143e-302,-7.014028985971944e-302,-6.813628186372747e-302,-6.613227386773547e-302,-6.412826587174349e-302,-6.21242578757515e-302,-6.012024987975952e-302,-5.811624188376754e-302,-5.611223388777556e-302,-5.410822589178357e-302,-5.210421789579159e-302,-5.01002098997996e-302,-4.809620190380762e-302,-4.6092193907815634e-302,-4.4088185911823644e-302,-4.2084177915831664e-302,-4.008016991983968e-302,-3.80761619238477e-302,-3.607215392785571e-302,-3.406814593186373e-302,-3.2064137935871745e-302,-3.006012993987976e-302,-2.8056121943887775e-302,-2.605211394789579e-302,-2.404810595190381e-302,-2.2044097955911823e-302,-2.004008995991984e-302,-1.8036081963927856e-302,-1.6032073967935873e-302,-1.4028065971943888e-302,-1.2024057975951906e-302,-1.002004997995992e-302,-8.016041983967936e-303,-6.012033987975951e-303,-4.0080259919839685e-303,-2.004017995991984e-303,-1.0e-308]}
},{}],27:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[1.0e-300,9.979959920040082e-301,9.959919840080161e-301,9.93987976012024e-301,9.91983968016032e-301,9.899799600200401e-301,9.879759520240481e-301,9.859719440280562e-301,9.839679360320642e-301,9.819639280360723e-301,9.799599200400803e-301,9.779559120440882e-301,9.75951904048096e-301,9.739478960521041e-301,9.719438880561123e-301,9.699398800601202e-301,9.679358720641283e-301,9.659318640681363e-301,9.639278560721442e-301,9.619238480761522e-301,9.599198400801603e-301,9.579158320841683e-301,9.559118240881764e-301,9.539078160921844e-301,9.519038080961925e-301,9.498998001002004e-301,9.478957921042084e-301,9.458917841082164e-301,9.438877761122243e-301,9.418837681162325e-301,9.398797601202406e-301,9.378757521242485e-301,9.358717441282567e-301,9.338677361322646e-301,9.318637281362724e-301,9.298597201402806e-301,9.278557121442885e-301,9.258517041482966e-301,9.238476961523046e-301,9.218436881563127e-301,9.198396801603207e-301,9.178356721643288e-301,9.158316641683366e-301,9.138276561723447e-301,9.118236481763527e-301,9.098196401803608e-301,9.078156321843687e-301,9.058116241883769e-301,9.038076161923849e-301,9.018036081963928e-301,8.997996002004008e-301,8.977955922044087e-301,8.957915842084168e-301,8.93787576212425e-301,8.917835682164329e-301,8.897795602204409e-301,8.877755522244491e-301,8.85771544228457e-301,8.837675362324649e-301,8.817635282364728e-301,8.79759520240481e-301,8.77755512244489e-301,8.757515042484969e-301,8.737474962525051e-301,8.717434882565132e-301,8.69739480260521e-301,8.677354722645291e-301,8.65731464268537e-301,8.63727456272545e-301,8.617234482765532e-301,8.597194402805611e-301,8.577154322845691e-301,8.557114242885772e-301,8.537074162925852e-301,8.517034082965931e-301,8.496994003006012e-301,8.476953923046092e-301,8.456913843086173e-301,8.436873763126253e-301,8.416833683166334e-301,8.396793603206412e-301,8.376753523246494e-301,8.356713443286573e-301,8.336673363326652e-301,8.316633283366734e-301,8.296593203406813e-301,8.276553123446893e-301,8.256513043486976e-301,8.236472963527054e-301,8.216432883567135e-301,8.196392803607215e-301,8.176352723647294e-301,8.156312643687375e-301,8.136272563727455e-301,8.116232483767535e-301,8.096192403807616e-301,8.076152323847696e-301,8.056112243887777e-301,8.036072163927854e-301,8.016032083967936e-301,7.995992004008017e-301,7.975951924048095e-301,7.955911844088178e-301,7.935871764128258e-301,7.915831684168337e-301,7.895791604208417e-301,7.875751524248496e-301,7.855711444288577e-301,7.835671364328657e-301,7.815631284368737e-301,7.795591204408818e-301,7.775551124448898e-301,7.755511044488979e-301,7.73547096452906e-301,7.715430884569136e-301,7.695390804609219e-301,7.675350724649299e-301,7.65531064468938e-301,7.635270564729458e-301,7.615230484769539e-301,7.59519040480962e-301,7.5751503248497e-301,7.55511024488978e-301,7.53507016492986e-301,7.51503008496994e-301,7.49499000501002e-301,7.4749499250501e-301,7.454909845090181e-301,7.4348697651302604e-301,7.414829685170341e-301,7.3947896052104205e-301,7.374749525250502e-301,7.3547094452905814e-301,7.334669365330661e-301,7.3146292853707415e-301,7.294589205410823e-301,7.274549125450902e-301,7.254509045490982e-301,7.2344689655310626e-301,7.214428885571143e-301,7.194388805611223e-301,7.174348725651302e-301,7.154308645691383e-301,7.134268565731464e-301,7.114228485771543e-301,7.094188405811623e-301,7.074148325851704e-301,7.054108245891783e-301,7.034068165931864e-301,7.014028085971944e-301,6.993988006012024e-301,6.9739479260521044e-301,6.953907846092185e-301,6.9338677661322645e-301,6.913827686172345e-301,6.8937876062124254e-301,6.873747526252505e-301,6.8537074462925855e-301,6.833667366332666e-301,6.813627286372746e-301,6.793587206412826e-301,6.7735471264529066e-301,6.753507046492986e-301,6.733466966533067e-301,6.7134268865731455e-301,6.693386806613227e-301,6.673346726653307e-301,6.653306646693387e-301,6.6332665667334665e-301,6.613226486773548e-301,6.593186406813627e-301,6.573146326853708e-301,6.5531062468937875e-301,6.533066166933868e-301,6.513026086973948e-301,6.492986007014029e-301,6.472945927054108e-301,6.452905847094189e-301,6.4328657671342694e-301,6.412825687174349e-301,6.392785607214429e-301,6.372745527254509e-301,6.35270544729459e-301,6.33266536733467e-301,6.31262528737475e-301,6.292585207414829e-301,6.272545127454911e-301,6.2525050474949894e-301,6.23246496753507e-301,6.21242488757515e-301,6.192384807615231e-301,6.1723447276553105e-301,6.152304647695391e-301,6.1322645677354706e-301,6.112224487775552e-301,6.092184407815632e-301,6.072144327855711e-301,6.0521042478957916e-301,6.032064167935872e-301,6.012024087975952e-301,5.991984008016032e-301,5.971943928056113e-301,5.951903848096192e-301,5.931863768136273e-301,5.911823688176353e-301,5.891783608216433e-301,5.871743528256513e-301,5.851703448296594e-301,5.831663368336673e-301,5.811623288376754e-301,5.7915832084168334e-301,5.771543128456913e-301,5.751503048496994e-301,5.731462968537074e-301,5.7114228885771545e-301,5.691382808617234e-301,5.6713427286573146e-301,5.651302648697395e-301,5.6312625687374755e-301,5.611222488777554e-301,5.5911824088176356e-301,5.571142328857716e-301,5.551102248897796e-301,5.531062168937875e-301,5.511022088977957e-301,5.490982009018036e-301,5.470941929058117e-301,5.450901849098196e-301,5.430861769138276e-301,5.410821689178357e-301,5.390781609218438e-301,5.3707415292585165e-301,5.350701449298597e-301,5.3306613693386774e-301,5.310621289378758e-301,5.2905812094188375e-301,5.270541129458917e-301,5.2505010494989985e-301,5.230460969539079e-301,5.210420889579158e-301,5.190380809619238e-301,5.1703407296593195e-301,5.150300649699399e-301,5.130260569739479e-301,5.110220489779559e-301,5.090180409819639e-301,5.07014032985972e-301,5.0501002498998e-301,5.030060169939879e-301,5.01002008997996e-301,4.989980010020041e-301,4.96993993006012e-301,4.9498998501002e-301,4.929859770140281e-301,4.909819690180361e-301,4.889779610220441e-301,4.869739530260521e-301,4.849699450300601e-301,4.829659370340682e-301,4.809619290380761e-301,4.789579210420842e-301,4.769539130460922e-301,4.749499050501002e-301,4.729458970541082e-301,4.709418890581163e-301,4.689378810621242e-301,4.669338730661323e-301,4.649298650701403e-301,4.629258570741483e-301,4.609218490781563e-301,4.589178410821644e-301,4.569138330861723e-301,4.549098250901804e-301,4.529058170941884e-301,4.509018090981964e-301,4.488978011022044e-301,4.468937931062125e-301,4.4488978511022045e-301,4.428857771142285e-301,4.408817691182364e-301,4.388777611222445e-301,4.3687375312625255e-301,4.348697451302605e-301,4.328657371342685e-301,4.308617291382766e-301,4.288577211422846e-301,4.268537131462926e-301,4.248497051503006e-301,4.228456971543086e-301,4.208416891583167e-301,4.188376811623247e-301,4.168336731663326e-301,4.1482966517034065e-301,4.128256571743488e-301,4.108216491783567e-301,4.088176411823647e-301,4.0681363318637275e-301,4.048096251903808e-301,4.028056171943888e-301,4.008016091983968e-301,3.987976012024048e-301,3.967935932064129e-301,3.947895852104209e-301,3.927855772144288e-301,3.907815692184369e-301,3.887775612224449e-301,3.86773553226453e-301,3.847695452304609e-301,3.82765537234469e-301,3.807615292384769e-301,3.78757521242485e-301,3.76753513246493e-301,3.74749505250501e-301,3.7274549725450904e-301,3.7074148925851704e-301,3.687374812625251e-301,3.6673347326653305e-301,3.6472946527054114e-301,3.627254572745491e-301,3.6072144927855715e-301,3.587174412825651e-301,3.567134332865732e-301,3.5470942529058116e-301,3.527054172945892e-301,3.507014092985972e-301,3.486974013026052e-301,3.4669339330661322e-301,3.4468938531062127e-301,3.4268537731462927e-301,3.4068136931863728e-301,3.3867736132264532e-301,3.3667335332665333e-301,3.3466934533066133e-301,3.3266533733466934e-301,3.306613293386774e-301,3.286573213426854e-301,3.266533133466934e-301,3.2464930535070144e-301,3.2264529735470944e-301,3.2064128935871745e-301,3.186372813627255e-301,3.166332733667335e-301,3.1462926537074146e-301,3.126252573747495e-301,3.106212493787575e-301,3.0861724138276556e-301,3.0661323338677352e-301,3.046092253907816e-301,3.0260521739478957e-301,3.0060120939879762e-301,2.9859720140280563e-301,2.9659319340681367e-301,2.9458918541082164e-301,2.9258517741482972e-301,2.905811694188377e-301,2.8857716142284573e-301,2.865731534268537e-301,2.8456914543086174e-301,2.8256513743486975e-301,2.805611294388777e-301,2.785571214428858e-301,2.7655311344689376e-301,2.745491054509018e-301,2.725450974549098e-301,2.7054108945891786e-301,2.6853708146292582e-301,2.6653307346693387e-301,2.6452906547094187e-301,2.625250574749499e-301,2.605210494789579e-301,2.5851704148296597e-301,2.5651303348697393e-301,2.5450902549098198e-301,2.5250501749499e-301,2.50501009498998e-301,2.48497001503006e-301,2.4649299350701404e-301,2.4448898551102204e-301,2.4248497751503005e-301,2.4048096951903805e-301,2.384769615230461e-301,2.364729535270541e-301,2.344689455310621e-301,2.3246493753507016e-301,2.3046092953907816e-301,2.2845692154308617e-301,2.264529135470942e-301,2.244489055511022e-301,2.2244489755511022e-301,2.204408895591182e-301,2.1843688156312627e-301,2.1643287356713423e-301,2.144288655711423e-301,2.124248575751503e-301,2.1042084957915833e-301,2.084168415831663e-301,2.064128335871744e-301,2.0440882559118235e-301,2.024048175951904e-301,2.004008095991984e-301,1.9839680160320644e-301,1.963927936072144e-301,1.9438878561122245e-301,1.9238477761523046e-301,1.9038076961923846e-301,1.883767616232465e-301,1.8637275362725451e-301,1.8436874563126254e-301,1.8236473763527056e-301,1.8036072963927857e-301,1.783567216432866e-301,1.763527136472946e-301,1.7434870565130262e-301,1.7234469765531065e-301,1.7034068965931863e-301,1.6833668166332666e-301,1.6633267366733466e-301,1.643286656713427e-301,1.6232465767535072e-301,1.6032064967935872e-301,1.5831664168336675e-301,1.5631263368737475e-301,1.5430862569138278e-301,1.523046176953908e-301,1.503006096993988e-301,1.4829660170340683e-301,1.4629259370741486e-301,1.4428858571142286e-301,1.4228457771543089e-301,1.402805697194389e-301,1.382765617234469e-301,1.3627255372745492e-301,1.3426854573146293e-301,1.3226453773547095e-301,1.3026052973947896e-301,1.2825652174348698e-301,1.26252513747495e-301,1.2424850575150301e-301,1.2224449775551104e-301,1.2024048975951904e-301,1.1823648176352707e-301,1.162324737675351e-301,1.142284657715431e-301,1.1222445777555112e-301,1.1022044977955913e-301,1.0821644178356715e-301,1.0621243378757514e-301,1.0420842579158314e-301,1.0220441779559117e-301,1.002004097995992e-301,9.81964018036072e-302,9.619239380761522e-302,9.418838581162325e-302,9.218437781563127e-302,9.018036981963928e-302,8.81763618236473e-302,8.617235382765532e-302,8.416834583166334e-302,8.216433783567134e-302,8.016032983967936e-302,7.815632184368737e-302,7.61523138476954e-302,7.414830585170341e-302,7.214429785571143e-302,7.014028985971944e-302,6.813628186372747e-302,6.613227386773547e-302,6.412826587174349e-302,6.21242578757515e-302,6.012024987975952e-302,5.811624188376754e-302,5.611223388777556e-302,5.410822589178357e-302,5.210421789579159e-302,5.01002098997996e-302,4.809620190380762e-302,4.6092193907815634e-302,4.4088185911823644e-302,4.2084177915831664e-302,4.008016991983968e-302,3.80761619238477e-302,3.607215392785571e-302,3.406814593186373e-302,3.2064137935871745e-302,3.006012993987976e-302,2.8056121943887775e-302,2.605211394789579e-302,2.404810595190381e-302,2.2044097955911823e-302,2.004008995991984e-302,1.8036081963927856e-302,1.6032073967935873e-302,1.4028065971943888e-302,1.2024057975951906e-302,1.002004997995992e-302,8.016041983967936e-303,6.012033987975951e-303,4.0080259919839685e-303,2.004017995991984e-303,1.0e-308]}
},{}],28:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var erfc = require( './../lib' );


// FIXTURES //

var largerNegative = require( './fixtures/julia/larger_negative.json' );
var largerPositive = require( './fixtures/julia/larger_positive.json' );
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
	t.equal( typeof erfc, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the complementary error function for `x` on the interval `[-5,-100]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largerNegative.expected;
	x = largerNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
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

tape( 'the function evaluates the complementary error function for `x` on the interval `[5,100]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largerPositive.expected;
	x = largerPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
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

tape( 'the function evaluates the complementary error function for `x` on the interval `[-2.5,-28]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeNegative.expected;
	x = largeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
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

tape( 'the function evaluates the complementary error function for `x` on the interval `[2.5,28]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largePositive.expected;
	x = largePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
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

tape( 'the function evaluates the complementary error function for `x` on the interval `[-1,-3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumNegative.expected;
	x = mediumNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
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

tape( 'the function evaluates the complementary error function for `x` on the interval `[1,3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumPositive.expected;
	x = mediumPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
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

tape( 'the function evaluates the complementary error function for `x` on the interval `[-0.8,-1]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallNegative.expected;
	x = smallNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
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

tape( 'the function evaluates the complementary error function for `x` on the interval `[0.8,1]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = smallPositive.expected;
	x = smallPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the complementary error function for `x` on the interval `[-0.8,0.8]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = smaller.expected;
	x = smaller.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the complementary error function for `x` on the interval `[-1e-300,-1e-308]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = tinyNegative.expected;
	x = tinyNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the complementary error function for `x` on the interval `[1e-300,1e-308]`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = tinyPositive.expected;
	x = tinyPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the complementary error function for subnormal `x`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	expected = subnormal.expected;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfc( x[i] );
		t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'if provided `-0`, the function returns `1`', function test( t ) {
	var y = erfc( -0.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `+0`, the function returns `1`', function test( t ) {
	var y = erfc( +0.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `2`', function test( t ) {
	var y = erfc( NINF );
	t.equal( y, 2.0, 'returns 2' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `0`', function test( t ) {
	var y = erfc( PINF );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var y = erfc( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/erfc/test/test.js")
},{"./../lib":15,"./fixtures/julia/large_negative.json":16,"./fixtures/julia/large_positive.json":17,"./fixtures/julia/larger_negative.json":18,"./fixtures/julia/larger_positive.json":19,"./fixtures/julia/medium_negative.json":20,"./fixtures/julia/medium_positive.json":21,"./fixtures/julia/small_negative.json":22,"./fixtures/julia/small_positive.json":23,"./fixtures/julia/smaller.json":24,"./fixtures/julia/subnormal.json":25,"./fixtures/julia/tiny_negative.json":26,"./fixtures/julia/tiny_positive.json":27,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/abs":9,"@stdlib/math/constants/float64-eps":57,"@stdlib/math/constants/float64-ninf":63,"@stdlib/math/constants/float64-pinf":64,"tape":122}],29:[function(require,module,exports){
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

},{"./expmulti.js":30,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/trunc":36,"@stdlib/math/constants/float64-ninf":63,"@stdlib/math/constants/float64-pinf":64}],30:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":34,"@stdlib/math/base/tools/evalpoly":40}],31:[function(require,module,exports){
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

},{"./exp.js":29}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"./floor.js":32}],34:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/copysign":13,"@stdlib/math/base/utils/float64-exponent":42,"@stdlib/math/base/utils/float64-from-words":44,"@stdlib/math/base/utils/float64-normalize":49,"@stdlib/math/base/utils/float64-to-words":54,"@stdlib/math/constants/float64-exponent-bias":58,"@stdlib/math/constants/float64-max-base2-exponent":61,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":60,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":62,"@stdlib/math/constants/float64-ninf":63,"@stdlib/math/constants/float64-pinf":64}],36:[function(require,module,exports){
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

},{"./trunc.js":37}],37:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":11,"@stdlib/math/base/special/floor":33}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"./evalpoly.js":38}],40:[function(require,module,exports){
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

},{"./evalpoly.js":38,"./factory.js":39,"@stdlib/utils/define-read-only-property":67}],41:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":48,"@stdlib/math/constants/float64-exponent-bias":58,"@stdlib/math/constants/float64-high-word-exponent-mask":59}],42:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":4,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/special/abs":9,"@stdlib/math/constants/float64-smallest-normal":65}],51:[function(require,module,exports){
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

},{"./set_low_word.js":53}],52:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],53:[function(require,module,exports){
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

},{"./low.js":52}],54:[function(require,module,exports){
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

},{"./to_words.js":56}],55:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":45}],56:[function(require,module,exports){
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

},{"./indices.js":55}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"./define_read_only_property.js":66}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){

},{}],70:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"dup":69}],71:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){
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

},{"base64-js":68,"ieee754":91}],73:[function(require,module,exports){
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
},{"../../is-buffer/index.js":93}],74:[function(require,module,exports){
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

},{"./lib/is_arguments.js":75,"./lib/keys.js":76}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],77:[function(require,module,exports){
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

},{"foreach":87,"object-keys":96}],78:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],79:[function(require,module,exports){
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

},{"./helpers/isFinite":80,"./helpers/isNaN":81,"./helpers/mod":82,"./helpers/sign":83,"es-to-primitive/es5":84,"has":90,"is-callable":94}],80:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],81:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],82:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],83:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],84:[function(require,module,exports){
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

},{"./helpers/isPrimitive":85,"is-callable":94}],85:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){

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


},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":88}],90:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":89}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{"./isArguments":97}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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
},{"_process":71}],99:[function(require,module,exports){
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
},{"_process":71}],100:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":101}],101:[function(require,module,exports){
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
},{"./_stream_readable":103,"./_stream_writable":105,"core-util-is":73,"inherits":92,"process-nextick-args":99}],102:[function(require,module,exports){
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
},{"./_stream_transform":104,"core-util-is":73,"inherits":92}],103:[function(require,module,exports){
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
},{"./_stream_duplex":101,"./internal/streams/BufferList":106,"./internal/streams/destroy":107,"./internal/streams/stream":108,"_process":71,"core-util-is":73,"events":86,"inherits":92,"isarray":109,"process-nextick-args":99,"safe-buffer":116,"string_decoder/":110,"util":69}],104:[function(require,module,exports){
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
},{"./_stream_duplex":101,"core-util-is":73,"inherits":92}],105:[function(require,module,exports){
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
},{"./_stream_duplex":101,"./internal/streams/destroy":107,"./internal/streams/stream":108,"_process":71,"core-util-is":73,"inherits":92,"process-nextick-args":99,"safe-buffer":116,"util-deprecate":128}],106:[function(require,module,exports){
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
},{"safe-buffer":116}],107:[function(require,module,exports){
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
},{"process-nextick-args":99}],108:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":86}],109:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],110:[function(require,module,exports){
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
},{"safe-buffer":116}],111:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":112}],112:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":101,"./lib/_stream_passthrough.js":102,"./lib/_stream_readable.js":103,"./lib/_stream_transform.js":104,"./lib/_stream_writable.js":105}],113:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":112}],114:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":105}],115:[function(require,module,exports){
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
},{"_process":71,"through":127}],116:[function(require,module,exports){
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

},{"buffer":72}],117:[function(require,module,exports){
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

},{"events":86,"inherits":92,"readable-stream/duplex.js":100,"readable-stream/passthrough.js":111,"readable-stream/readable.js":112,"readable-stream/transform.js":113,"readable-stream/writable.js":114}],118:[function(require,module,exports){
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

},{"es-abstract/es5":79,"function-bind":89}],119:[function(require,module,exports){
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

},{"./implementation":118,"./polyfill":120,"./shim":121,"define-properties":77,"function-bind":89}],120:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":118}],121:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":120,"define-properties":77}],122:[function(require,module,exports){
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
},{"./lib/default_stream":123,"./lib/results":125,"./lib/test":126,"_process":71,"defined":78,"through":127}],123:[function(require,module,exports){
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
},{"_process":71,"fs":70,"through":127}],124:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":71}],125:[function(require,module,exports){
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
},{"_process":71,"events":86,"function-bind":89,"has":90,"inherits":92,"object-inspect":95,"resumer":115,"through":127}],126:[function(require,module,exports){
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
},{"./next_tick":124,"deep-equal":74,"defined":78,"events":86,"has":90,"inherits":92,"path":98,"string.prototype.trim":119}],127:[function(require,module,exports){
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
},{"_process":71,"stream":117}],128:[function(require,module,exports){
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
},{}]},{},[28]);
