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

},{"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":46}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":133}],14:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":135}],18:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the natural logarithm of the probability density function
*
* @example
* var logpdf = factory( 5.0 );
*
* var y = logpdf( 0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* y = logpdf( 5.0 );
* // returns Number.POSITIVE_INFINITY
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return nan;
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (logPDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of the probability density function
	*
	* @example
	* var y = logpdf( 10.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : NINF;
	} // end FUNCTION logpdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":21,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],19:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution logarithm of probability density function (logPDF).
*
* @module @stdlib/math/base/dist/degenerate/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dist/degenerate/logpdf' );
*
* var y = logpdf( 2.0, 0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var factory = require( '@stdlib/math/base/dist/degenerate/logpdf' ).factory;
*
* var logPDF = factory( 10.0 );
*
* var y = logPDF( 10.0 );
* // returns Number.POSITIVE_INFINITY
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":18,"./logpdf.js":20,"@stdlib/utils/define-read-only-property":139}],20:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} natural logarithm of probability density function
*
* @example
* var y = logpdf( 2.0, 3.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var y = logpdf( 3.0, 3.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var y = logpdf( NaN, 0.0 );
* // returns NaN
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*/
function logpdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : NINF;
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],21:[function(require,module,exports){
'use strict';

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for an invalid degenerate distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = logpdf( 3.14 );
* // returns NaN
*/
function logpdf() {
	return NaN;
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{}],22:[function(require,module,exports){
'use strict';

// MODULES //

var degenerate = require( '@stdlib/math/base/dist/degenerate/logpdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var gammaDeriv = require( './gamma_p_derivative.js' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 3.0, 1.5 );
*
* var y = logpdf( 1.0 );
* // returns ~-0.977
*
* y = logpdf( 4.0 );
* // returns ~-2.704
*/
function factory( alpha, beta ) {
	if ( isnan( alpha ) || isnan( beta ) ) {
		return nan;
	}
	if ( alpha < 0.0 || beta <= 0.0 ) {
		return nan;
	}
	if ( alpha === 0.0 ) {
		return degenerate( 0.0 );
	}
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( -1.2 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 || x === PINF ) {
			return NINF;
		}
		return ln( gammaDeriv( alpha, x * beta ) ) + ln( beta );
	} // end FUNCTION logpdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./gamma_p_derivative.js":23,"./nan.js":26,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/degenerate/logpdf":19,"@stdlib/math/base/special/ln":61,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],23:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_58_0/boost/math/special_functions/gamma.hpp}.
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
* LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );


// MAIN //

/**
* Calculates the partial derivative with respect to x of the incomplete gamma function.
*
* @private
* @param {PositiveNumber} a - function parameter
* @param {NonNegativeNumber} x - function parameter
* @returns {number} function value
*/
function gammaPDerivative( a, x ) {
	var f1;
	if ( a <= 0.0 ) {
		return NaN;
	}
	if ( x < 0.0 ) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( a > 1.0 ) {
			return 0.0;
		}
		return a === 1.0 ? 1.0 : PINF;
	}
	f1 = regularisedGammaPrefix( a, x );
	if ( x < 1.0 && ( FLOAT64_MAX * x < f1 ) ) {
		return PINF;
	}
	if ( f1 === 0.0 ) {
		// Underflow in calculation, use logs instead:
		f1 = (a * ln( x )) - x - gammaln( a ) - ln( x );
		f1 = exp( f1 );
	} else {
		f1 /= x;
	}
	return f1;
} // end FUNCTION gammaPDerivative()


// EXPORTS //

module.exports = gammaPDerivative;

},{"./regularised_gamma_prefix.js":27,"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/gammaln":54,"@stdlib/math/base/special/ln":61,"@stdlib/math/constants/float64-max":130,"@stdlib/math/constants/float64-pinf":135}],24:[function(require,module,exports){
'use strict';

/**
* Gamma distribution logarithm of probability density function (PDF).
*
* @module @stdlib/math/base/dist/gamma/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dist/gamma/logpdf' );
*
* var y = logpdf( 2.0, 0.5, 1.0 );
* // returns ~-2.919
*
* @example
* var factory = require( '@stdlib/math/base/dist/gamma/logpdf' ).factory;
*
* var logpdf = factory( 6.0, 7.0 );
* var y = logpdf( 2.0 );
* // returns ~-3.646
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":22,"./logpdf.js":25,"@stdlib/utils/define-read-only-property":139}],25:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var gammaDeriv = require( './gamma_p_derivative.js' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.5, 1.0 );
* // returns ~-2.919
* @example
* var y = logpdf( 0.1, 1.0, 1.0 );
* // returns ~-0.1
* @example
* var y = logpdf( -1.0, 4.0, 2.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var y = logpdf( NaN, 0.6, 1.0 );
* // returns NaN
* @example
* var y = logpdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = logpdf( 0.0, 1.0, NaN );
* // returns NaN
* @example
* // Negative shape parameter:
* var y = logpdf( 2.0, -1.0, 1.0 );
* // returns NaN
* @example
* // Negative rate parameter:
* var y = logpdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function logpdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x < 0.0 || x === PINF ) {
		return NINF;
	}
	if ( alpha === 0.0 ) {
		// Point mass at 0...
		return x === 0.0 ? PINF : NINF;
	}
	return ln( gammaDeriv( alpha, x * beta ) ) + ln( beta );
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{"./gamma_p_derivative.js":23,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":61,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],26:[function(require,module,exports){
'use strict';

/**
* Evaluates the logarithm of the probability density function (PDF) for an invalid gamma distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = logpdf( 3.14 );
* // returns NaN
*/
function logpdf() {
	return NaN;
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{}],27:[function(require,module,exports){
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
* Computes `(z^a)*(e^-z) / gamma(a)`.
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} function value
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
	if ( a < 1.0 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimized against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= MIN_LN ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - z - gammaln( a ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100.0 && a > 150.0 ) {
		// Special case for large a and a ~ z:
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
				min(alz, amz)/2.0 > MIN_LN &&
				max(alz, amz)/2.0 < MAX_LN
			) {
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2.0 ) * exp( amz / 2.0 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4.0 > MIN_LN &&
				max(alz, amz)/4.0 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4.0 ) * exp( amz / 4.0 );
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/gamma":50,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":48,"@stdlib/math/base/special/gammaln":54,"@stdlib/math/base/special/ln":61,"@stdlib/math/base/special/log1p":63,"@stdlib/math/base/special/max":65,"@stdlib/math/base/special/min":67,"@stdlib/math/base/special/pow":69,"@stdlib/math/base/special/sqrt":87,"@stdlib/math/constants/float64-e":120,"@stdlib/math/constants/float64-gamma-lanczos-g":124,"@stdlib/math/constants/float64-max-ln":129,"@stdlib/math/constants/float64-min-ln":132}],28:[function(require,module,exports){
module.exports={"expected":[-2.051344231932842,-0.21219189060643506,-3.3244818589782548,-29.01981210500155,-41.812849244170245,-6.707933726671271,-18.98702967991586,-67.67026717819974,-30.653767813814493,-15.567972692436825,-19.168597648117178,-41.520494061035855,-26.48822451781793,-44.871939270402805,-1.23460960086327,-55.49830646448175,-22.667365179030373,-39.47047890039156,-42.89651195596674,-12.008826014118199,-0.33049873784562234,-4.124130902824027,-10.622054003810755,-55.455490428334315,-6.278832273334354,-15.418085636784056,0.9589508526438673,-10.21912714645335,-65.45324440701891,-82.3512805612325,-0.16653178580292582,0.3179607724477944,-4.597948545486865,-6.160191408701798,-41.42049488922578,-6.467115242004813,-68.58203524984097,-21.87565800346879,-2.0668631818078946,-0.4663568116270178,-3.4371157867330817,-0.02185163079697494,-11.631051997200371,-38.21953888981426,-1.8997347358142083,-14.34294835428668,-20.935277510432087,-47.73873667309305,-3.077071736711234,-13.64460479074365,-22.735627441143244,-15.575601103109985,-3.472287940124615,0.5696837783619046,-0.28248969394509205,-4.4347530158808,-13.394285651331266,-16.508374043980577,-13.514261683419726,-57.818229618657135,0.8375763024887575,-3.012596377706529,-3.108298280473382,0.3732957131852883,-7.357780794685349,-2.9247627242668157,-39.4360689145375,-29.640053905012206,-5.0668079461311315,-31.272044429713986,-12.12216261560521,-54.3016807967146,-1.7126039284078463,-2.037598927925577,-64.76724316800829,-34.21726009859137,0.3881602674614486,-0.24893618350299773,-1.5393895462435352,-51.645917514736645,-7.386867040756909,-5.971852953887516,-32.76215262734634,-11.72881030310035,-50.46522984405357,-50.733324305001176,-11.811042091070219,-8.330126937116122,-1.3752533080602043,-45.18268727645974,-13.665677818794373,-3.0187059533261147,-75.26470066388087,-62.07682843371864,-1.6467412079154307,-19.795856680031434,-14.312367806073562,-18.193641978547202,-10.944796910161125,-21.313347534116414,0.21831681015131954,-5.529107831652551,-7.023786841173301,0.23977601306628138,-66.25531060654951,-6.404388477550869,-12.71322617178257,0.2149471230786335,-53.667389241395256,-8.465187823872691,-64.94961910839518,-0.37710898043230046,-59.16287114398888,-10.16902968912656,-30.20499501580722,-37.00663583561599,-0.8892088286309674,-5.35616188689024,-4.115789425903943,-36.92260820384934,-1.7623930934295329,-2.629284534407607,-8.308103342760933,-5.469238249356474,-9.633908223593258,-11.599037218223181,-15.682240256033563,-18.020122054294347,-61.491655875715075,-9.438754574522227,-1.2085808915221699,-7.296890863101866,-10.902992891324153,-20.611439741415058,-58.837642262156805,-42.27237738713081,0.12551842165600702,-6.898424509913511,-14.291166058127526,-17.416712432639372,-16.37218189449024,-3.43394236407304,-10.131831658986917,-1.8046911806237675,-0.4428166942527958,-0.747753527577208,-5.4596792958287415,-5.397137227300006,-3.325798051910629,-10.665632684807019,-9.207527552928592,-7.723291712179353,-33.70378690550361,-31.796586929516998,-7.670187831857582,-2.1199961403142504,-1.8357049061697888,-2.6250262455715996,-3.3902922664227146,-45.41379412361305,-0.7519611055291833,-1.6209245884414702,-26.74434935943675,-11.983884109705222,-79.3874222295879,-18.293158491245872,-47.85393683772569,-5.124985433336283,-20.427201059740014,-18.458482128524942,-20.145907946250848,-48.49311429888439,-0.271989454672076,-0.015360061810241632,-35.61429478756645,-62.913941212650585,-4.493441569301984,-2.7469774809111125,-0.32966077426001883,-2.8353542415372406,-16.89779513529035,-1.1108366073821787,-34.526089274857796,-0.8680639229135689,-1.3215597271283475,-24.600003359483043,-18.717499080736097,-31.032635488663423,-66.65761622234793,-71.88121999438918,-8.70232134582183,-52.784908588350575,-62.50719594730124,-0.6529966473066033,-0.9604987702194081,-15.675539916257181,0.662556246768701,-22.94811917599387,-1.6480448661992617,-50.80593249372543,-11.13026459236503,-8.48104660880623,-20.06903930775563,-5.855126842651847,-38.70511076848073,0.05680331365999303,-18.434596081795476,-10.29605217055392,-2.9327117301457744,-0.8861153793549739,-12.242166361129565,-42.142053907191396,-6.91151876307447,-14.699978972310223,-21.537888224877687,-13.409210436082521,-18.737270626235627,-36.973018630808824,-0.8799839015985946,-35.67472189019064,-34.5751449676035,-40.022929890671705,-6.95419465100477,-36.83124542517946,-14.339439970459475,-15.481374593383613,-0.3005260358397841,-9.501002068910706,-0.9864375477458212,0.448687299419809,-2.1987668562433567,-70.7720054992761,-0.31522140664833165,-4.437760937453399,-12.963896249231421,-34.486690271517986,-4.61446784781041,0.17317181873923904,-67.78436080464321,-8.293369001106857,-23.773996112175478,-29.14945096649405,-2.721067885584882,-56.806829422345075,-23.424042439678903,-26.69356562717987,-0.3697891945257643,-35.04094571647866,-4.4082319565602734,-0.7435553610471564,-32.69369104619284,-7.1663362858731166,-14.601763478874643,-1.2997939072009288,-68.34091870855445,-58.27594237940808,-0.5068372627806141,-34.13185275418844,-4.575899911719226,-62.65518755880497,-51.846948322529485,-8.028003746629004,-24.75490152780368,-62.70835462732026,0.9421065968573106,-5.578592104582835,-4.3412425532246814,-86.52505487836721,-2.400070195744665,-8.286617525937757,-0.6859333455834498,-35.20238742913241,-4.818065715886892,-22.485883089577143,-30.541628412125426,-31.11839987527046,-71.5581901307272,-33.856209344649564,-17.41273447756081,-23.155452635467764,-1.2494814847819082,-51.03627583867265,-55.833500971054654,-10.053313442282409,-9.842998345949166,-0.1511635901164894,-11.277816813662792,-14.112983161167087,-18.27032080448275,-3.053134574391176,-0.0766661059377558,-10.586377291758794,-0.07722358113972527,-32.39705595326227,-52.578913730280135,-11.847612378517526,-40.43949900879148,-1.351339457790592,-11.297972220733154,-13.12122100227843,-52.718055545841025,-1.5440818753517793,-0.5828734704882885,-7.702741179656168,-20.081446329769204,0.616496983351364,-41.5759559172981,-19.804924860196504,-1.1280898406976938,-5.6038199505419675,-5.665146775476126,-14.770741660672797,-38.95429554835282,-14.986557611534701,-68.67314391403312,-69.6357830304316,-29.52929102551513,-35.632675048625146,0.45480136403534877,-33.5783464709894,-36.34236913897692,-2.3086163556588417,-16.024853466818687,-32.70357466235472,-5.9761325257380715,-5.15055167077556,-2.7298037925275445,-10.628504743665111,-39.64147252374458,-29.14632365849398,-74.92882207311689,-5.883284451958269,-29.22649411820467,-35.51628135940268,-8.895096409791822,-15.668793939676446,-34.384634606287136,-46.57745786057229,0.10524084299094172,0.4042301320938062,-8.851961885199003,-18.154620001079227,-12.7959116665097,-54.212739129377624,-17.103737647461905,-28.4420692769491,-23.137399466547837,-44.389187528576116,-9.891300457454921,-108.83271771534118,-41.55849840575657,-37.0798587256606,-39.400727856572885,-13.630082917509537,-7.850929377072559,-46.38071023349995,-15.45050709520547,-4.388512627708403,-5.323634236516343,0.2595082006495555,-74.74419577401945,-37.30616059235264,-10.584077330940897,-0.834325853004791,-27.12004522034461,0.31496347658899726,-49.584616760134615,-1.9575294034230408,-12.98733495167663,-18.06883858649972,-7.623369038078231,-0.1399682343856239,-17.199544268888676,-26.331864320103872,-33.5501998874668,-7.037357660746851,-32.5955657817092,-9.663098797135598,-2.8724871115867927,0.5632790215324475,-4.788992011344526,-0.10741364155305,-44.06544548667001,-20.227145438524634,-2.9229155346711835,-90.80804229131614,-10.31598287315704,-11.670957918361552,-2.7271936381598842,-26.199123449267223,-15.656780287321979,-7.447854246973217,-57.574303345735345,-30.66022726767343,-2.239277723355858,-94.20444253436318,-1.3348400409277246,-71.45318675439304,-2.3799459995467687,-68.91930453212446,-14.38165979274199,-0.5617775313276874,-8.888596976775387,-64.96906627485684,-1.3958633058491663,-7.3089797465237325,-49.789199014558456,-26.230466361944362,-4.355543445877489,-4.649865724928704,-15.804594127730596,-31.786647330783104,-4.329133609582856,-16.02910883269785,-10.658412613025352,-51.6812199906757,-46.34348598808966,-0.6764790268722538,-10.844891863033059,-13.506063627585565,-14.980287019845898,-3.686645752640071,-24.26706206428012,-16.57102954361042,-39.55793809286825,-5.704725471191026,-4.554088154324848,-58.609291496265584,-1.302303006397814,-8.726465305877477,-30.83488244107476,-29.06189918798761,-16.962591947577437,-10.552843560359001,-51.2143167535723,-74.96175667589985,-2.514569321230019,-23.55110623004578,-65.53082491580778,0.5922682648096678,-0.7213357784791912,-34.264470569270976,-3.827182751293777,-32.7749328293763,-16.600351095243074,-80.06510184234378,-4.891148991052623,-40.990229206054956,-20.423129777964167,-2.59631050055185,-51.27412674834192,-7.284101336176826,-4.108804701994581,-45.40018802031198,-43.91447036362225,-39.460233266943014,-72.91671941609378,-9.732194296264769,-2.3910159972890708,-15.447028473642465,-37.08721990511081,0.23014931713404296,-13.805448790239861,-18.8210287694161,-5.464158369124068,-43.974569037471454,-30.867482828042135,-5.911626869643218,-47.55978596746585,0.6780045587574723,-0.14798467789241387,-37.82369165830524,-9.319124447965983,-50.611886062666485,-13.666234085741909,-2.452344014632434,-27.008892453312914,1.0148817198583515,-7.60530243122576,-70.47165521245894,-9.866946066167072,-30.86662443436954,-0.5651982278636809,-31.74147397354763,0.23783954307719624,-13.908321511904116,-8.929405811931613,-7.39238618707955,-26.632037546288657,-80.04690603045387,-36.33100885138067,-9.090047119778255,-2.0265657293561756,-32.718503114349005,-7.090994082316524,-68.90968194599412,-29.994735277920576,-30.007228891160786,-5.495447204411003,-8.331025887483175,-39.19427759149555,-4.617250987078755,-19.022783970472325,0.2539444271212372,-20.196435964511327,-4.762782724930311,-0.4312177547706817,-44.30479202914323,-37.6377313276033,0.06203610906773127,-0.7970096559777162,-13.19609344755418,-25.102838282843773,-2.929896851567183,-5.750817465185048,-13.683731340822387,-58.54955137237064,-14.396453909475687,-70.09930551948962,-40.15859881411286,-0.40123767445706715,-20.018967470651813,-20.254741168553,-28.95913155779184,-5.659104742419691,-58.529626819208694,-46.974877558867774,-1.2092448790028678,-51.97277206656039,-42.505283631247735,-1.5375260296504343,-17.593401834539605,-22.08344830859564,-20.482438885047355,0.8438658438542945,-1.7495965447362276,-7.425939799031346,-17.268933288979117,-15.86818931291102,-44.31300997035924,-9.437356190215459,-1.538393678761393,-37.700097174984485,-6.324890582963352,-25.789338807064436,-0.026336693672181166,-92.37411735772831,-21.552672564615836,-33.89372894099666,-18.17474226856885,-17.927115729258386,-9.020735081963604,-9.244634946355546,-45.70882866014454,-26.375420897164865,-0.2612183418959595,-31.990371529935523,-42.021874259131664,-28.783799470580806,-0.2257013936837362,-27.246243198108232,-4.037027402716767,-52.06049390269952,0.28292770134342504,-6.118748407588505,-34.95689364939531,0.00853565708811832,0.44480794240332955,0.011110817493314329,-19.991117544448745,-1.498690131761895,-37.48072373878142,-7.8170001419849084,-4.116621946428944,-3.7969644788950268,-13.265538683007726,-63.5124421796029,0.29875432909679134,-95.63777793849951,-37.759859155582284,-3.670546183478978,-0.9281211220575898,-67.07062070708167,-4.982904850315855,-10.982558041188684,-4.680715868166116,-2.9371191393032388,-9.194021574857082,-12.154960981506406,-0.5294578141634787,-39.91562301404716,-4.664879041249574,-38.31867504261295,0.17997332214535078,-7.777200242127346,-2.562540745803622,-45.18612383404552,-39.73435280547677,-18.723591299363207,-13.788890676293835,-8.60806372096605,-0.6908408578751097,-1.1563142325600455,-0.09993480273131627,-7.96767008792662,-17.00357527331069,-41.14236482123101,-16.757839427484488,-1.0267803838002147,-24.064967001884394,-11.148863978119927,-0.32988475577840015,-47.65469738923758,-8.891687267231509,-10.947266868691754,-20.77588148805932,-15.740810371744699,-22.119094865120193,-4.178195673303727,0.2785544728272753,-0.1365535762694834,-7.860970094411079,-31.153622040278183,-63.94316128415989,0.34128587624334816,0.8084679291555936,-0.2586807344975077,-6.351168686863196,-7.048961960130621,-24.30564832744994,-8.908616121414905,-15.155592939568395,-13.21084479427391,0.03188794256822236,-20.736361082915305,-15.891213163761972,-22.884263998889733,-60.32428967006906,-7.605036269085535,-9.263573098248479,-0.5492928335867857,-0.8111092971671816,-18.239288665473083,-16.159196754490246,-14.976241658189164,-5.178975178269052,-39.50750723043489,-3.453224474377031,1.2719589836475893,-19.712712106123718,-2.0825912484796785,-28.081407197051753,-17.971267655824246,0.9825347270930043,-21.209010342821827,0.42408938776041927,-29.22445954299973,-5.0096042715087385,-49.79591139880958,-2.5294422523867977,-21.822611296637536,-8.299848308678182,-0.925016255029516,-2.161125837484722,-8.709208046717132,-17.922355790641745,0.142618534998336,-20.993694062638987,0.8116984583889857,-4.9277083605723675,-6.870549512860132,-18.105426202435325,-31.033475154344046,-28.246851637538903,-38.14622568123532,-24.64444420455335,-55.835774989533284,-15.741771724403318,-5.088578011535978,-0.5389910380970591,-3.72314239881062,-5.133015729686855,-25.66397958410992,-2.174199891732446,0.13862365446614344,-4.579840847811707,-92.5929533336956,-6.372782297250451,-5.647272320567177,-0.12073518386735138,-11.344243480778644,-20.631906584472638,-66.27500806185337,-25.52855012211138,-36.566539065397706,-3.3303503469268687,-0.19480795355405212,-1.3093535330114876,-54.10345029670375,-26.133359700627572,-2.262566099463054,-33.145767671096266,-0.6757417471100657,-14.8973283876679,-14.549707410067638,-13.581356230131803,-8.388108089987732,-22.451228696052617,-8.594198446870227,-5.084953007391839,-0.42710198770301266,-12.580152897906327,-19.07191046579721,-1.4260757062972096,-83.41358764520345,-2.421043047880143,-62.41191981186953,-9.346021181071812,-49.74749119354559,-5.906933912103904,-12.199165065730782,0.2689068598829709,-0.20799160460821575,-13.772848810945948,-0.5169246636948097,-0.2719068749859965,-20.066006235923993,-15.503450579751096,-23.235779805106134,-24.668152483265033,-29.063916452637066,-3.166516259545255,-5.103529155628561,-0.44858483545755323,-2.198790337987331,-57.746575590122646,-3.757634153602077,-7.087307031536749,-35.92992158270094,-3.642363980649709,-39.014459482717704,-59.11782745259283,-4.0371612048189345,-48.65420681501121,-6.8538893963108976,-11.757495693586021,-16.85462916772139,-4.0767304656232035,-12.51815671749762,-56.51357915092538,-0.026734698609982566,-18.310081614535704,-28.155424084012285,-26.133498818389377,-47.66158669932964,0.5494857378660765,-15.480265747193076,-37.14661408324472,-44.048850610413744,-11.405425020986389,-8.75770628804134,-2.581077707104304,-41.896066329124594,0.29311532745649105,-0.3012791015888361,-4.29377640635623,-7.831609709267887,-24.12725515681836,0.4554287347607091,-70.75726937637361,-20.97264119963592,-49.779994802534446,-9.993065180808959,-11.392474986671894,-19.8652907001672,-20.769777193641236,-86.02266920872431,-63.84531564177935,-5.713872128793025,-51.440627587263,-29.6291605891945,-38.58334877094531,-45.11865793112171,-14.790485347898166,-2.8165789306069184,-33.06805330894176,-10.39831342126337,-2.607995135640939,-52.77761866508719,-23.473473124447317,-2.281924570157055,-55.733181571475235,-17.262679130096544,0.4585773589348845,-0.6103473268629322,-12.914170421175594,-8.900587797807344,-18.661809999289424,-13.015667517258475,-3.0000916696732336,-34.080005240558535,-44.182874511447324,0.3693699891585127,-0.02490521474445373,0.6238159646731636,-29.522378892522728,-54.282010395552774,-8.31492303539818,-37.688359983123,-36.152921590315046,-12.100542370592365,-9.26493972889757,-53.09927686243666,-29.429491935823947,-47.2502582242144,-5.788728834893407,-28.17749230993117,-21.862720484536368,-7.5728495436238354,-9.086060039398088,-11.816158504586667,-18.809331701639156,-1.274206373134517,-96.7916619109129,-25.54321344930971,-13.79063591814391,-26.113265715068536,-28.536519374192665,-3.8901638082017844,-38.85616632955013,-14.484130009089341,-16.38587636759825,-26.224140270317545,-7.0974723887050954,-24.020977338203167,-41.38437883287723,-21.434251226898237,-24.015971334551235,-56.29153958531326,-7.971095268162245,-60.17944151752859,0.16781544863128595,-3.1782113199133613,-27.706892752423094,-37.14342357583951,-55.647930593969235,-12.850711354330233,-17.69808018500135,-3.7016096089592696,-42.66720802548716,-6.4684981631516525,-10.475228903376038,-0.040565197663266606,-14.142964494379237,-13.874500525452373,-0.08593899760495605,-0.45089352770836344,-7.762563650352686,-17.263009560649262,-1.5024226431019225,-70.26849297746396,-34.98190547229011,-8.362846466836679,-5.059084352484429,-14.388058459323211,-71.28263337522154,-0.9277401406171433,-24.473655289403485,0.5860600610999178,-19.214132271507726,-6.99323825429471,-16.732218054684743,0.8936212264058994,-15.95664759705102,-7.80995762564573,-28.941531739374614,0.07075090470138168,-55.80243349324848,-58.964615141842195,-23.09786071353512,-55.48984700881431,-27.038986574853013,-1.1342521381868869,-15.128668667802856,-47.9632117169783,0.6877202038693668,-5.863515948660563,-19.742827930245834,-12.007339756833808,0.05140009271793167,-12.33510363477277,-4.627943527287125,-54.380106788446994,-21.026030948230833,-18.86594698711864,-34.97563908061628,-8.958252908180834,-27.36173474913369,-36.34863597827702,0.44303283362193335,-1.0473356742766429,0.6879200284338407,-32.09578153439727,-1.1076807760712644,-7.692880095009646,-28.82886776652654,-48.98613583368288,-5.727948721464696,-26.40397403623005,-12.26738645712021,-9.020806189369738,-16.18941720914768,-32.77431141865177,-68.31200074325547,-0.3983193743963809,-1.4092922814217874,-12.613663011963634,-1.249832273652721,-9.454412669807601,-10.635750108633195,-13.872703951561505,-27.860796244840476,0.24862242297721293,-58.46757664531386,-24.091738467098875,-30.565381816618245,-22.910404880874324,-3.0428281407820785,-0.674309806422936,-20.880796250003158,-10.133682662996828,-55.57073358367193,-21.582337168601235,-19.427136069679598,-37.8724617751086,0.7104778157604725,-21.634081168847807,-7.1427362356765,-0.10249691090715762,-6.840281085344787,-13.417355254475819,-14.438187366785751,-0.6712767062246985,-28.110143401011698,-59.95994619361231,-5.925122658860638,-42.5842180109221,-24.342633701744752,-22.5549628567418,-22.517213485476766,-22.124622374807544,-15.73228772739452,-48.06075898522268,-34.212865857764555,-66.24425323100057,-24.180542081292213,-3.5457797429831253,-74.52620348588279,-0.37949513031687054,-6.249687781787491,-0.2924945030516448,-18.243793619652536,-1.1952543404541442,-14.005460301514935,-52.82340166797294,-19.487575388129628,0.08734011620047388,-7.479317251610662,-46.48488464235946,-5.800684966889309,-2.2470475112694666,-40.46598965182775,-3.31506847291022,-22.01066831788404,-86.2770251543402,-30.430753602145174,-11.241603965743376,-22.06778067089305,-11.966964611881679,-31.5904735731718,-3.1812674987323932,-7.961812622784941,-62.84900454259262,-14.224843814122313,-19.105649606580805,0.18262658641140428,0.0753429467221225,-27.515346070540605,0.009293209628404853,-4.324962139144498,-12.251799488470756,-36.61259864923665,-0.7713102587186924,-22.113473400747246,-7.188757119310081,-4.914924487827736,-3.398012549613488,-20.671600192603755,-2.9553528849292396,-17.42865999697656],"alpha":[19.53926134652371,22.20894235877841,22.362537515676692,21.583149371201536,11.619609709896906,29.097468385796446,12.715594797599387,14.04909195756451,11.35538930577888,24.901271777368198,29.974391191063617,29.60020544279108,21.532156906129543,29.439452655863004,24.20269616929229,21.335725587429863,27.37576325428241,19.44968037866145,15.643349912746816,17.782270401341712,22.2331443043301,20.888844461491487,21.74982838280407,12.184869328381392,11.981060259435893,29.861291824303493,13.211635468379775,19.240836421913553,26.76356280322406,11.737498427274113,25.880083315579498,17.512617399345704,24.76460028813318,19.052762673555414,18.57036739613254,19.71944215815835,17.23579822577982,23.55948146627686,20.652936596019096,28.16716335758499,20.338839945790298,29.97296378128691,17.350332682541712,23.34595368167347,25.58600713807528,21.633194986907306,16.22692417810064,18.30258366183724,14.900619955975358,16.226583918550883,10.79692421460682,13.836142379247448,21.836047078051397,14.14397468594184,17.789332857943386,28.145995678584008,20.967297011526227,27.715678703275376,21.682515229093497,17.41903941792827,11.548664389821006,28.816561472802675,14.736370603170371,12.879162970343367,27.371916961573678,13.665307859750687,19.644710663802158,25.93431545731646,15.438809149513538,28.236600709798335,25.59336530519468,18.220191559793093,24.94687734249267,24.54893582555517,28.928701637930963,21.99951851061386,22.026063693485835,24.521863864475947,27.39389028801667,19.999719122010102,14.772250704704092,26.82822651876782,26.320797893742927,28.6971780471111,15.381677704306886,28.233103160927403,23.61889768297765,27.11674099305272,17.549769567273366,26.584198022481598,21.191931704475525,26.42064213873478,20.324253100670823,28.530784783609665,16.68677867049087,15.115080282115727,16.473042404922403,14.81891902363742,28.796875061814635,12.046156874882747,17.777859864074802,23.147936453371187,15.894925281865708,27.05053725898731,11.290203254013607,22.513261399006733,13.311347452697749,18.05342285693237,12.772867940356614,12.080603188466297,14.706388214696773,29.29297733613663,16.742436244659412,23.694143366875224,18.933689556046254,24.73747531772686,22.33054276762092,13.016309193629274,29.67403156575071,14.694418572948127,18.237822765042402,27.154134914195268,13.574378041936374,12.15580327247531,12.78252373480749,29.08463816092441,17.716418263861996,15.96291496222998,16.50659621923857,25.201894931337968,26.48648730661169,28.062124332515033,25.31371413679432,10.117763936722897,23.629028457819615,13.566189282552642,13.418949809204467,11.038939582547735,25.166442403049345,14.193547005295702,28.98154430928426,24.62747519014755,29.879348072630314,14.96170164269385,19.415929843496308,20.867602344005014,14.746620641809653,28.207133432126884,15.256000827417528,22.499689079705874,24.02965281104949,20.9944033883614,17.556867911804694,13.133582470905395,16.18707635834232,28.755666426345204,21.526016697174747,27.959879229692483,11.684945207357327,18.506155071350435,11.32562076776702,11.74919071267253,10.61174493792814,18.001251117101702,11.439068661454215,28.23560648161124,11.599017278684776,29.097276107610153,22.55993689927248,18.388372783815093,28.55906685814393,18.701267898479163,13.825574203737578,10.877975976874904,19.289002636747114,11.209773345831536,16.30097653876573,21.745402045440265,29.84313780063889,26.799035295014846,10.37923679668026,24.435458619872396,17.438637069846337,25.792501001630377,15.15982807598576,11.956703676362302,12.082031581277604,19.900581913744205,16.364794181149755,21.945556372432545,11.95596770020396,26.010241562419747,14.741439837391429,10.128227880727096,29.35250474543841,10.992723647351038,24.56188644308414,23.742603806321938,15.67387021445576,15.82677762843559,21.47149913772692,22.425943415869614,23.865353757992857,23.26940097061694,22.530077393490444,24.92161973423915,28.76522932668602,15.81651900270407,28.312518790173623,19.153946201224606,25.23184011163132,20.541081805919536,25.26204897130823,24.637929688394248,12.98740775849232,23.69119068264628,15.58461828212113,21.486464833610608,15.245483683824844,13.203645613454075,15.561807445461312,13.771069616588392,23.44931327344067,15.266766521437836,13.06072962843083,19.751704260287028,12.113135579320794,21.876009908579775,25.708108843368652,12.60336257098226,12.792586268257192,14.637187216727693,24.055843063905428,11.256023410012489,10.988701274211605,22.151718596042613,25.340791228402804,22.08653228226848,15.891595539994112,11.339879120242248,29.457336537088494,13.81616804023372,10.310070092921544,24.54810205588896,16.309703374396534,28.81179438313611,17.296299618621838,26.985438490477385,28.16596313892617,15.441260566649744,15.583860484809108,13.309604966501759,16.736155329743386,25.691915252724016,14.123608104941102,22.717065895386277,16.252630806621674,28.30538740956204,29.837595155161864,21.06624667907613,27.516417628395576,12.744316789629199,21.552364641051994,20.445719273410532,10.447839706179082,22.418469588698407,28.235509840549323,15.502558557486573,13.935237032919474,28.7125693259736,20.652930606777335,12.345538147106998,12.413646156048422,13.776609747052735,18.84764866467039,24.32621937138616,24.91913125474816,17.466900632778316,26.010634735141274,19.25541893486856,28.177188882749963,27.181085654830866,20.715707069196373,19.764262935348217,18.056248718509828,23.740852787229795,23.04102856329734,26.123538378672855,17.487651544006162,26.207278971109883,22.14464476697828,19.46326802232715,17.106138824287687,24.899111361621358,11.282924665313878,15.125583042804976,15.373397402983041,29.235202400391678,28.45034394114331,22.24047453761706,16.506938327689397,11.39345382431664,10.382348641765669,24.438500153716298,20.23382237509079,21.888702573540066,12.277641024878836,25.438132203070776,25.529863174343536,25.208252194032358,17.80190835210512,27.73989007681265,16.04173978717233,23.96260228899103,15.303562823124572,26.660979243861213,15.640140240086362,20.596573264882725,22.78196221100074,12.089283897288432,19.327653517463986,27.634740695156413,22.661068724808846,27.06753183812058,14.17478285974758,24.70785487879968,28.208620335814025,16.670918387508912,21.102341574969298,13.13299208655129,12.555815002786872,23.981965536084694,23.89798769221478,25.21092245724782,26.348088156834898,12.269574858677238,18.954522121483738,17.478683865001233,24.181798270640552,25.150332230125272,10.280756745788352,29.041541222074365,12.142656195172874,24.423678122684763,28.64184898146017,10.4180814533448,29.592780946773914,23.732619406070118,29.77535510622831,10.511319512968061,16.957086076860758,12.045030009862847,21.244063527720336,26.863868835841608,24.042534961881987,12.145998903972789,16.081723867117567,23.28168263697816,25.02650898320338,18.675711349524935,16.615201943815382,16.29798651706311,16.025542470322986,25.33716087143614,15.56338477529659,16.47315680784413,14.981193142793042,14.205108425136466,22.800188267184403,27.028001843897734,19.152566165272912,23.94948062886167,25.688049917010325,10.33443686933213,19.840886121073996,11.1878672536516,26.023472251748842,29.397601106476397,27.528647386197626,23.083342078938035,13.144731133831087,20.807629720287895,12.818814208711608,17.167920371308103,19.28179313130056,13.865108683968327,13.62849622369052,16.381331979230367,24.32874540013995,14.551203936593705,20.696876902484334,28.56185281977046,23.560647889215,24.296166584385738,28.692761912705073,12.493988269359924,18.063937213333112,14.203380339780974,16.775311266381863,26.7453849744045,16.83867435503194,22.755038101375664,15.091510379743944,25.418319252060734,23.32621015396283,27.675826147090245,10.73739588265903,27.639684855053616,15.299375304740197,29.99683997097045,21.065851156237045,25.38139396246576,24.60843707363713,26.137243805603646,24.22557700261644,19.368895329860514,17.774078609076437,23.171895865558252,10.448775519891772,26.111829154302306,23.294567849956263,28.008161626974506,14.307874234010033,14.342236529327321,21.930819197918087,15.509076532788843,15.86538232874771,22.594540138655482,12.479999373934527,14.741673659458513,23.476586214341985,15.511537871559163,20.589739602872328,21.818021668649074,25.59393307959523,12.952110058665909,23.481746161272508,15.667635782535143,27.8267426971006,26.130068718725646,14.387259060495747,18.095185148393035,21.75388461939771,14.798572560376556,13.512559724855588,15.104848376785025,22.07029215565918,11.475910543289185,12.35304520383889,19.815230920247178,10.418618002230513,20.409809689116642,24.765180092530738,11.525063434444265,15.249528525515231,12.452601507120583,16.77666780904778,19.759264463355382,27.178937127402158,12.982081221400108,18.29579058055634,22.104837379362827,13.90120819532395,18.42671729485997,18.126899074413622,15.241645955132208,14.863608087000895,16.81513006229143,12.162453430721914,25.50556807299109,21.224722065424334,13.046021178738005,19.70796430001041,27.206825354009688,25.47116041379809,29.013890513947366,14.780938505423805,17.892249966881803,26.269073640712513,11.11558717137453,23.21165074198248,22.696441002458517,13.137398886926043,11.664937495078377,12.901194643491811,29.552810619746413,27.307159525828343,22.981343421232,12.990536642525722,10.81130776831252,22.539770500573976,11.712736475126908,18.726115106880545,18.655512172511514,23.495180672428198,12.60642669934844,17.173061037204032,22.21965310637819,23.844301146682064,17.619147848297846,22.16540610576547,29.976249273570748,12.909553067127995,29.93728309869127,26.033120270463648,18.462805742260876,16.178533576569897,25.148441821388367,29.972088983349977,15.721328503328657,16.872798967568983,18.16033206240524,23.293265932613167,16.151066492762915,14.25308817324892,16.429595051476444,21.32638074639378,28.752942831446763,16.59639835901924,15.735314035473142,15.386453220333735,19.875147215398034,20.26803069698124,23.29502785990121,29.281283791414662,12.01713867024468,16.400997549564053,22.664745610217963,10.71176188775845,27.79985882087182,13.645370128975918,19.99381527555954,16.622611694722313,14.188695532966635,14.816368344637517,19.083575932188765,29.95313324200406,13.64547091570917,21.717013349012685,13.753977662543765,26.15417758084751,14.99493362308089,24.377693963028392,26.893492196302486,20.95486127804779,24.421266103296432,14.657878283559679,25.342632457589794,23.891555588371244,25.622325164964955,28.382112596069454,26.641360068170442,28.341140039420946,10.779369515883307,11.478357243982948,27.407955700524667,27.84770283350515,12.054749316380025,12.428211828380157,27.44363903365678,20.87833413351612,27.13148654372158,12.375986661954839,23.323363418732935,17.369103693400877,14.675001051255801,20.00297623459412,21.967262939278367,23.40369660635702,17.396075503003562,21.99623694337867,20.298278492734955,17.909982455441067,25.812305866035892,29.342103208674946,29.440033446200893,23.739804478810015,25.771255991177785,10.297770257872031,22.135722430031798,29.88952194688447,13.336839360541664,15.27138717247363,24.852690537092048,29.690272211130306,19.170587908895275,26.19337166879006,16.858431359655214,29.461498492114238,25.98327187724429,29.038291433943368,18.326675477034957,18.831915919166228,12.9128970292493,28.173658290426733,27.229347997208077,13.182129878575552,18.752466489048416,24.115474734106044,15.289365216774744,29.92299562939975,24.375086956533544,29.105900409101658,22.073100499689176,26.38457471292178,19.26630293835536,29.286616792051507,24.03067563980324,27.119050984956324,11.811083711909177,28.426313183667816,29.592988381866977,15.534585810231203,24.065162623993306,14.925639655981149,23.36570439233347,25.822841582718276,25.691550280343748,22.099010836667652,17.579535642562835,24.928775419466064,21.849718926686876,12.741684903217422,21.522034790883176,19.04116489455179,16.22037982206981,26.51501519605334,26.50414788096869,11.69483063984979,12.293795756177449,11.279192902712087,18.280882992163082,25.399734896649488,20.768869384500306,19.843116834923404,11.47573747882706,26.984010699542978,19.386493541332822,13.59942669105012,24.741818286969668,20.803470368798138,19.953413283421032,28.46433103820649,25.951190320894348,22.51678556406844,28.872104871273518,25.05082911548138,16.44739144757844,10.066471712240666,10.259486450616482,28.561458136079978,12.81374087352602,18.93792399207866,15.196774964997534,21.946358337621604,15.647279485184761,24.552885690285127,13.221362107621726,18.85548424491774,22.200866373385487,13.791908612988927,16.273097330223383,26.70453523648299,16.020774791239045,25.33615608532,19.500758383323355,10.032992275584359,19.138228455758714,13.605712681956854,27.351980921134547,20.368768396030514,27.223811994351603,16.806164317258837,18.044245887884784,13.276342845255709,15.175170862624704,10.327551464840239,15.141680063844634,20.785968848969397,21.969071204801768,17.739348881046247,27.33564804050408,19.397515883856418,24.264769711169233,21.762597121265316,27.119194163615777,13.477488337220969,24.40540731180257,28.749254179437102,27.836509035148453,15.917866118242024,24.181533628325468,16.12836917745029,25.272304469177314,15.568975205705602,19.39818992853708,19.467153187049973,25.14736583453203,27.164587363924756,23.179405352386965,14.421574277104652,13.975266304129281,10.001936838084152,22.49861130107189,15.50417870989703,17.183216378721035,13.954394298988962,13.374139629706292,22.208012578671287,27.726946616871345,15.69409116503465,28.33864137761364,23.256532168322583,10.539191125733902,17.82973902603766,21.08579260753035,15.485478294655174,14.858667094868956,17.277788255210762,23.618089582962263,12.5370487730265,11.339842153595988,29.146784672573588,22.092913047861646,18.417670562148135,22.20206120073999,24.791319598710324,16.62470136035626,25.712519582448866,23.32854930326397,11.887893404766224,12.653188914264302,11.383640143709354,20.899002323772045,24.27813338188787,29.098203459884285,18.170364923610958,13.122404817503943,23.80139128848728,14.110796837161343,16.591105535414997,28.182642985478175,11.20450059814537,13.96825639057015,29.3915630475251,15.01044178654503,20.84747799717465,19.959706677150763,28.2323878324439,11.882679388315744,13.584337594882019,12.46531863464365,15.509121214382603,11.882194316091205,27.56357611433835,16.64968762053551,17.452993999517247,20.907963023759947,15.585414382656872,21.014392160887375,29.30069181472608,19.8352926053266,21.658266584230546,17.28975879330381,17.56653124536828,13.449198518046765,25.75763103794628,20.818121302903343,16.73055703385982,14.53080317394397,11.690568382047907,13.446078389014534,11.782229354141428,19.052568349153283,14.618361622136163,21.21498755919673,17.489180335447756,11.44378811281677,26.333574369013782,18.858535850505774,25.798392581975808,11.231096312830209,14.637211138071557,20.153904553580478,23.562679783123688,26.70442622625493,13.94123166184626,24.883301468640667,15.334775487688056,22.67783881372383,24.962703550950657,16.4983660562573,22.147408282111844,26.536952642607574,15.992008593075365,10.3971975890496,17.854500751014548,22.899384583291482,27.423827655572147,22.125285304060263,15.069238508924649,29.292891573887992,20.406803920827677,18.32198675724454,11.664750443408822,20.155478169149355,18.770452063255497,20.371738911414162,24.188539375610922,17.03410507881509,19.240589981014928,27.643314676795416,18.6561044980689,22.045710034548037,27.516034533954187,25.340642317417892,12.870266909025268,15.501316364306756,29.414464410530833,22.58971923466065,28.550727089846166,26.828645626368726,29.824599978107976,13.915084477165465,16.606701371257685,18.359779396334165,21.420664789267704,28.02882593646276,21.850514468408004,26.986179779661505,22.439945492866478,18.831714950857638,16.416006894087456,11.015491172427417,17.835567266572895,23.81700680415271,20.79260513157504,11.49812594543186,13.225010725172353,27.761432864121684,16.81399971245945,26.17257820296567,14.524295820196468,15.81996881361313,22.482080887829174,20.784178329725794,12.650428148514589,20.29543870731647,28.310901659578317,24.553714489368254,24.116654275263848,23.572475472581367,21.57246811204789,21.974924698208497,18.2500020202739,18.454019814874904,16.335959131443616,22.555168916419504,17.635972056964214,13.371471118535014,16.12797709539917,24.82781940389046,28.831358248141285,13.0985403239808,10.923628341291675,10.245618314956836,15.845832010466832,13.978742798480944,10.031524502100048,13.895215031556504,21.182366167483767,23.427875757353227,12.799856507785336,26.18770889396646,26.33852578978952,12.642579442855858,10.96146696350373,13.19058913689867,29.66734683335477,15.334976898109414,13.754998814177842,15.504171252900733,28.72413465561571,23.224275778465028,11.079418966858405,16.750657435142546,17.84840528848598,19.22431879045241,25.26431272424601,28.87282982481194,20.52076369287565,26.70747966871348,17.075493580073342,24.184852970904984,27.452619619696506,16.011160270222486,12.770380244064917,20.424962380828674,19.553885793432165,14.247548984450233,25.518935162920123,25.703819364751276,14.668440740619847,23.683482959523584,28.64797825321608,13.819820033037411,24.986581966063945,10.536403685827974,20.369766455416155,10.999413713974654,14.338383052654562,20.563807959621037,26.715650222118583,23.4581893905391,28.215612501606397,27.532619764031292,21.734912007430335,20.596887784822133,15.594460118417057,17.435812461549464,26.94899594630279,14.558891924271112,20.38685840276113,14.54099182449006,27.875959889366154,17.75298789779964,21.58521549140555,14.08275165506867,10.397835029648332,21.46631268233229,13.10180057994251,22.841779216413304,14.154168010786874,22.60558414860022,18.48653194994,14.444029383697966,26.969698228723132,13.554122383315278,28.804593513392852,13.566338090628495,20.089238799405695,15.303205632494542,28.976311193749538,16.74843186419882,11.807604035884243,23.594768116194018,13.754864031363244,24.081019563601416,22.252425649733677,22.69530505793721,14.350610053981514,18.64295549904751,20.168160224388924,17.52689549967968,14.283307580850103,13.893582855749962,28.1628604392797,13.480349594734463,22.38024510718859,16.04318880298475,11.845940001094512,26.539494032339945,28.581524291310426,20.02143167845979,10.392472759448165,12.81502833332738,27.36740100503349,29.578153588985124,20.191556215825944,21.634716502288754,14.065550165255463,11.200835875613286,23.07573416334722,10.326162156904735,17.01213597974411,22.838073008373655,22.86160804974206,23.530111845040146,10.42273363097927,24.866115175606026,27.656472711776267,27.268414571762953,27.31417266444009,10.921261281839438,11.293370763393412,14.861753541865435,27.671537645547126,11.541283956340704,28.04110221485495,17.475705156103075,17.12394104585085,25.51852775927919,17.945259379949707,13.761563005629117,29.649762942649176,19.787447696046108,17.500920771469353,19.734083197977267,27.12227541312103,17.10027226965955],"x":[1.8897470835099417,1.1879890178750196,1.3267346542518788,3.2554230992497555,4.129724325193438,2.999399419754687,3.3794480685412633,3.9835707450315114,4.774059070843496,2.9089108166547337,3.6932075381609986,4.992704229325366,3.2008584705127974,4.485307180479605,3.0468050819570305,3.949050393631044,4.777683004455078,4.341978510812227,2.973207718237161,0.18730834061779333,0.8810046057880472,2.163554873933329,3.001317069674181,3.2934396726273008,1.5808619036892135,0.4248955302065005,0.4964197395966885,4.183748744843076,4.549202595404359,4.608313772438284,2.382887251946574,0.963035790990745,0.7806096097917192,0.21149325403234664,3.417965123761766,1.480757321988383,4.144149511813266,4.851154928230797,1.3171744966894006,0.7211175617261689,0.6123316391572231,2.103071305428934,2.6969505614683076,0.06770341614406039,2.5384631985315154,2.8275238405779977,2.068361005117395,0.0294029148812347,2.1753797206400103,2.5090967039735954,3.1095595577908988,3.448598580464094,0.8433657425999419,0.7651506681475873,0.7559779357056962,1.285865494099201,2.1228197609252133,2.5346746083432214,1.8671171755443805,3.5926113499834766,0.296523909615809,1.3887030205134154,2.032576121138727,0.8647553707797062,2.536381471175747,0.3560447293074853,4.340049274138292,4.3590125801305435,2.677376953537549,4.160620106788906,3.382948142556066,4.2759250991445725,1.567576936817734,1.6036837599097065,0.07034014088705853,3.1831193087684087,0.7236244688328064,1.753643117807765,1.6014479167144002,3.7605570933325625,2.3294453984736796,1.8979675701641852,3.415256721155848,2.25153795612834,3.1339146973246357,4.409547522597724,4.318027874889475,2.048205519215739,2.2473494669577443,4.8530321706423525,0.333853954533353,2.5002777414961286,4.475649960962661,4.990851637754222,0.8956492821031381,3.170517605745112,3.3064635082134783,2.5719958621247354,0.3173336638208768,4.0035791108618435,0.8419997856338446,1.9340626859051346,3.15294013126854,1.4731144906369054,4.177172846084394,0.6802338733688362,3.678677970363898,1.2370135321252573,4.676497251752581,2.5443511869247173,3.9685673297765636,2.0782866814373193,3.6982803175286416,2.014854034675283,3.947006008650198,4.477526835291354,1.8949337302641844,1.307737497244169,1.6138789897230932,4.730680453046059,0.5392861756796508,3.7793708728176667,1.6492213006415135,2.3554891396605147,1.7880739672613422,3.988333985931636,1.8161092641225385,4.245476770313443,4.367584785771714,2.4723981863820366,1.6541684648776989,2.588053727119346,2.0480049784566114,2.029268315031839,4.6555798751509485,4.322470976395717,0.6221862372743325,1.530602572764661,2.5673328865915024,1.9992043327963205,3.945682230263292,2.2543553450891043,4.015447789651208,1.4713588419693524,0.9867634361933619,1.1992436076915125,2.281343274649564,3.088132578535544,1.351930907159079,1.836695003215768,2.226719500456692,0.38459554048135836,4.096624364562692,4.702414731592609,1.3174743980704073,1.5067405376282395,1.2272206148491471,2.209844904080885,0.2049403237773062,4.8074723421934955,1.1910728623325206,0.5636954961872609,3.098146851461724,0.36677959514623826,4.996690710510288,0.48394669638870624,3.0491970429416524,3.7964867218002905,4.580106718030764,2.23126102912509,0.36411092341638973,3.5424727246286047,1.0625268372110874,0.22034907339505194,4.554330100131253,4.95783157856435,1.5415921560574408,1.7360715942205485,2.7049073278982725,2.5525992798753516,1.6577235610359398,2.7054130780010666,3.0457385176733567,1.8332568426168971,0.5673507471553074,1.9937680301974081,1.985364878480378,2.669699322268465,4.078456458801147,4.527110466549187,2.946490028526667,4.023492405638246,4.027484485517831,0.7875107437777717,1.8625945118200915,1.4244146269795388,1.0130208650865868,0.14331460295097798,0.6535644309149891,4.661652710993724,1.874210025056945,2.228461382469238,2.5846968330973064,4.049490236741988,4.388599345302831,1.390266731725155,0.22827637271243706,3.2543788054194334,1.8638085586658282,1.3009721604861457,4.465210488011219,4.536402805082127,1.7713710443565656,3.56317710454631,0.05710141298083671,3.700516632640322,1.992560750060225,3.230550899859277,1.8052354317940078,2.5329104287500237,3.890778435412563,3.5400650290754676,2.581587580746525,3.598280940121649,0.0814111802136197,1.88882385461832,0.6954858332724112,3.248080384288806,1.3146028211686722,0.8006789721463747,1.7137050186322589,4.894502283239129,2.4949545312236863,0.9343795391208365,1.4841166469440015,4.97721018683561,3.4737357692195903,0.9827098657689071,4.213129298757324,2.9590926995325937,4.050270443845237,2.9548150245305616,0.11526034668942642,4.376591281277711,3.238363306204696,3.7496868203998046,1.2762782564229447,4.172818142601783,1.9084925317692247,1.718275344205863,3.182433682821144,2.3496346831762924,2.35861193352879,2.782409176262229,4.496601757136234,3.994155009750604,1.1056942752544385,0.168397159582232,2.0119437103566207,4.252433062427084,0.048442388073612896,0.08187786289126642,4.3581057600651985,4.710492792981263,0.4834225721419616,3.6089029375544235,1.9807863177339202,4.947479324499704,1.771535123940311,2.2905838805677323,1.6393505377381812,4.27570537622957,2.1525502401261187,2.2053643133739067,3.0355162685296766,3.4654344143457037,4.73348151529008,2.964269176559875,2.3213834253814913,2.6593992146311454,0.864596737949922,4.118161439520518,3.7281368664888404,1.6950448818549968,0.19216155298162896,1.7390213510059804,0.4888345009016648,0.607704618037046,2.709237306453527,1.399637909256335,0.5733786793595086,4.443614536551656,0.9433784317410376,3.2228639115781474,3.6459264801693947,2.921484797506703,3.7058847132957453,1.418552419160578,2.845778816336847,4.500115955322866,3.4687561551795385,1.1437087803455448,1.3564120124597956,3.2751261227072526,2.5735095541876896,1.002615669592295,3.91171008267154,2.7418494792980863,1.7399239135533628,0.9018812124266518,1.4048902921883222,3.090812887110265,3.0187611363391778,0.2797558205494244,4.097809121412866,4.960810295022258,4.920122266455001,3.877552880898741,1.1960115426494378,3.8783370655121043,3.443960361481544,1.0382918348654824,2.8152658322518134,3.2820915078778357,2.516547674205208,2.3107751826576894,1.779067440934684,2.1975090460389435,3.04535542104737,3.723586158665894,4.573592532352125,0.5536959195345381,0.18915329335852382,4.391422982722496,1.8206991819738982,3.382079103385184,4.328263087812671,4.880378680240055,1.3160061885286045,1.3297741176009603,2.006423409867184,4.168584425574576,0.13069065323983997,4.455442426878596,2.659916351000305,3.3025728192313974,2.997558729680322,4.77009066634287,3.4962308416758834,4.8854337107966606,3.9809108142392615,2.44246701485217,3.0824616318858835,3.1891912218850127,4.224723821033127,2.865752947835345,2.0515164419483622,1.0977687664332547,1.9430689094981013,1.2925620949224226,4.947230757608541,4.615346545105856,2.433532147811298,1.4966402539425105,2.3393526469261827,1.0983045360682686,3.4048650991337457,0.4289254255754871,2.5556250782462655,0.28096679696271276,1.5310625501789976,2.1770230620107265,2.9104962262352982,3.782003242804958,4.543646955732596,2.3130797556080607,4.80995248787086,3.3802411958618697,0.6847500379871596,1.0672332466557155,0.35495374160856463,0.9997013650174646,3.182268067711014,3.981947163122838,0.4963927724275774,4.782128212546088,1.9860480191768548,2.6434187368886053,2.80111036807365,3.4693517718336455,0.23813431185500167,2.147363733461407,4.571066516234166,3.425711712977706,1.928024097970058,4.579967551786845,1.18627908396023,4.385992055467408,0.4792430136335424,4.994275261311022,1.9048057916772454,0.6449818601977653,0.1860136639215404,0.053127793711882365,0.7180065671961033,3.6489321393796503,3.259981208958602,3.1708734486373515,2.160684402996298,3.037783791736376,0.2319060082647728,3.157185902279822,1.6753924796964415,3.5726247289776456,3.4109354530737734,3.879200442236507,3.2149192595924356,1.5607888890455435,1.5037703158421512,2.930721260706873,2.155961985741647,1.8076289061779371,3.4464603113361845,2.4901285721372535,4.031470642384005,0.4361607072838003,0.18607193559788127,4.019503627166483,1.4349122163254135,1.7553338134203955,0.1305261057821927,4.877078995614937,0.20745994723273653,0.21318266329812596,4.090393273403409,4.213552610723726,1.7073992098257473,4.454397301332186,4.946538239481089,0.9789813446531825,0.8103212794693293,3.0293100967910744,2.678186302555611,3.7648515450770925,1.8720013332019647,4.476990353549214,2.0538249918541784,3.1187691847032104,3.094442669175793,1.469767306060219,4.361641219064346,3.947925024988841,3.0429465209143713,4.79662800492839,3.419058377168853,4.6794741204460095,4.325461091900465,2.958930624381191,2.6777909216969196,4.174171711846215,3.083505794215581,1.150901943180327,2.0120369534935287,2.2161629078537004,2.468590427645724,2.936424041772275,4.282398613270724,1.7129103978720317,4.158037137977644,0.8307190761959204,1.0759838945704003,2.8748750327430317,3.4557123818240987,4.1250870257488925,4.783829993004676,1.6721415245520932,2.1717771094683513,0.5496935787685675,2.792962540202052,4.5325033740309735,4.346229485753044,3.380798047132493,1.0608265528293037,3.506891005800025,0.7124477245075422,3.8159946188889506,3.3748885051822386,4.328894417016853,1.9848622552145523,4.900921560447362,3.2523200137887964,1.7927104925561466,1.395643064395975,3.877110118957331,2.2065103980383203,4.528836666930594,4.152728611386206,2.833188817077912,2.5096263288393117,2.902674317941335,4.94873518141532,4.065627072799973,1.8073410564540104,1.6468478647582774,3.793680982419001,1.2845018542150033,1.617632245655145,3.738162741970158,4.88204329927922,1.1956128608563221,0.3587530842333686,2.2975000051747454,4.693882771920418,2.2216770669913877,2.514298804337598,1.8830261833141393,4.56491842089286,0.7131121535372875,4.569280816816471,3.1700364614543517,0.2903225648299934,3.3754791297185314,2.3864614000271454,4.111609323153176,4.130100384162283,4.888203947809879,4.63848216813615,2.7573693580803607,3.095558606817045,3.977612867803535,1.727017336725346,0.2863891427739407,4.702216978048158,1.9769950470852493,0.6543098633173761,2.3773507575246278,3.1197876050765485,2.334283707970113,3.9058849535452933,4.858744107069988,3.3115560513116593,0.8330081804717371,4.379917832691875,0.5078110822274373,0.0722172965364698,1.2457534128762482,4.707538052353714,2.8137409844511154,4.934226497338184,2.5288088476063466,0.2625953583883345,0.6756997383681906,0.8333992112497357,4.132379251119241,4.434961285764444,2.698220251304464,3.7631982677910223,3.8561535794744706,3.2470847522626975,1.2910461815528518,2.5014565105089726,1.7934723659119312,4.134239291910976,1.3791090418897345,1.6204193238237696,3.632718968213864,0.4753315879461184,0.9541747916478638,1.5643369867974244,4.6740499159343605,1.1052910971014218,3.327501010702807,3.0777152908753393,2.3353257724059215,0.725200550807712,3.473145782402156,4.957036696901045,1.1921636935798097,4.622609383940141,3.252685540232073,1.9444987031069894,0.6957788107475227,4.470496778685094,3.6845831340569077,2.3951091968062785,3.100032421689808,1.1580965863716963,1.5766472089300099,4.725292442761665,2.1643506688517666,0.18251123545580783,0.26359548944706934,3.763613323162951,1.1011723074200386,3.0037964230064427,3.6711375201716856,3.4573009617949433,4.732653936389624,3.647477989196506,4.282613946022026,2.015150059436869,1.9386432895823824,2.7541441567345473,0.5217821425468216,1.852646478022123,2.2726761763168213,0.23325509124362043,3.6529944407019697,2.3804081317601966,2.9588544131049543,2.4626360104007725,2.6686668240609066,3.4219243003902178,1.7874487481849977,1.7784445853004016,2.785698736021396,2.78926034157739,4.096446570573843,2.3330437669009996,0.9069705353472723,2.2617495222391826,2.8996558132082964,4.106994129771575,0.012970803094405348,1.1145129115013053,0.6467929925671001,2.597218812655285,2.3806079292625784,1.3991813708664225,2.5410870336516966,2.622421589046385,3.4413071551855836,4.270840075973084,1.68886024464579,3.2167702396124067,2.580262633525238,3.1969123584483548,4.557287738995893,2.6610289785738983,0.3227195698743146,1.0324151762053335,0.4577384703547571,3.396460231679821,3.5042422082361435,2.991681488287611,3.8273993932552077,4.57050858700628,2.5200735697022534,0.35089312025384123,2.2037717309670724,1.3713583056856549,3.4639796434579906,4.475219603345291,0.5749169766230822,3.3682977878982956,0.9761593247355638,3.9307576483981133,2.6812319199387282,4.509439977235983,1.3142167801415372,4.376162202047733,0.3867216906172777,1.7325620763499283,0.6260299366342037,0.5649928915116431,4.987552658259148,0.34221718500061504,3.897003206603449,0.6416479273783582,4.4577788022387965,3.4574294430004358,2.805168601070498,2.688285111866211,3.1655244682836194,3.0143812149419205,4.547878544276218,3.9870225770357792,0.15685274623141732,3.7143031509388056,1.2934183671084631,0.3130872428195519,3.5524474022513752,4.637315333397688,2.980081937046082,1.5867517425904154,3.0490261343752314,4.636030402320989,2.1320092227588674,3.806396832152963,2.08917039752212,3.1498246140968567,3.649083695252827,4.548912386721302,3.2213873541816653,3.2593234026391684,1.3729539252143241,1.3936003748273673,1.8176882233590475,4.70027313065966,2.9045505772419524,0.3255580441836947,2.9609469561537303,1.1620062161875633,0.43267292651739564,3.514133595185923,2.089509379562524,0.2151099722148775,3.437389027509541,1.8153566653132536,0.6117967531496415,0.5637069257384653,2.346675995200045,3.7391385264524635,0.2426312778319084,4.748490679274489,2.5575446119448006,3.825333275913768,0.2692938375626419,3.7380497214590127,2.149535275537687,1.5402196988943584,0.9360622732107404,1.9383428703498795,0.24558931756539892,1.9777847653426728,0.9652873488555413,2.794810913319866,0.2048098078291194,2.656039607880399,0.27967859756425795,2.060097801624994,1.988271001643015,1.8310804797602576,1.607134235623351,3.1661167848327776,4.736007328283476,2.8734421313323413,1.808144277358299,4.562675364244456,2.202101736035064,2.8762301336428555,4.440593007790557,0.928206292003384,3.026896031407178,0.5988884274143169,3.2275938443030827,2.0738620650537665,0.5317303246244509,0.2943741592937532,4.838306448768267,0.6185785732972326,1.9171424207265386,2.1957044690917837,4.396941463371917,3.9784649708906428,0.9330474996578542,4.370129312238634,4.679721492027397,3.0554783812271435,2.9938630270652844,0.7125532937996126,2.8803730581319065,4.151018127926745,1.1224375599705838,1.5075040857681876,0.25721951132010257,2.3291811606531687,0.0814939333330833,0.703630609525534,4.75469590363236,2.173680494474628,4.358624233646316,2.0341186649899434,2.0995645406537378,1.9228910094324003,2.7849529145713268,4.639823581291016,4.208397254480845,3.4123079683331623,3.815609995551813,0.2052856168444006,2.5153995045250896,4.781877817016239,0.32995255494928655,2.4715159096687547,3.9098298608976236,2.5881958827703198,3.4350550907205446,3.2514288116136747,0.14723197865833426,1.5901594292428967,3.819740835408619,0.25806847706482894,1.2316806619935416,0.33446800391105147,1.47747595885923,2.0198195642393904,2.1843997863794815,3.7119974031157454,0.7330411519324664,4.110721687918007,4.199286224032081,1.1768306932903783,1.3631581313644403,0.6536451482790873,2.6459022696183943,4.167870763741898,1.6705082879668132,4.601631176589151,3.061414108887708,4.660803174992822,2.3298572437511664,4.797430398108072,2.9934485672109243,4.21987943229234,3.66067613750214,3.845916596260781,3.001447234001154,2.7311003196508157,2.7476103891052195,2.58159973128837,2.6193423210284172,0.8845454762162619,4.847122663548157,3.1356092611224327,1.8563562260544142,2.9644082434076333,4.711852866906407,3.260333356270537,4.0227150505724225,2.174172262006838,2.6752507774374235,2.6833742503956417,0.10843854312562073,2.4100571198741036,3.3549835461483344,3.9759180942293137,2.2091734467077053,3.439967094360311,0.9104821763045745,4.406528657665727,0.8185569763996248,2.043221067026697,2.5912137280039502,3.787911369009027,3.9511693232760905,2.3448369241193445,3.9791945665761985,0.8666703787384844,4.792534034950689,2.3844007438059425,2.828748233062294,1.7272416721716588,2.6888924407238832,2.842735299732949,0.4932268794091621,1.9106692313133922,2.1231761261950344,4.117047732875003,1.4820257112035884,4.282060869841335,3.1595335942084612,0.3941258739538944,0.1444182130334104,1.364005403237123,3.945141080696671,1.4812493653343484,3.203108144271274,0.6425655027822574,2.446170578673277,1.8914590282204136,4.4606379291264195,0.42614750372348964,4.10330880090271,0.6343974772919492,2.8049583915340683,1.1313235644671915,4.389663602294992,4.736778561520408,3.1682727080681596,4.467220380405049,3.8445956909329357,1.6655111750275098,4.933461857017283,4.100750229245392,0.7972939937541268,1.4917595047457444,2.833389815364736,2.292208688104276,1.8990935223549121,3.7399033037806184,1.2628061890598041,4.787414650626722,0.18954863900210395,3.966511217311368,3.709874391097147,1.8073988651212347,4.075309534538568,3.688731380136121,0.8024380964088162,1.0169095858895683,0.8981113259429663,2.460836324206699,2.2363168424519153,1.0452385274401088,3.274925733097145,0.10048400033232818,1.0251942350445997,3.524975843082294,1.46175296130732,2.361093804180311,4.656017340049364,4.101615344909116,4.816787224183941,1.6568394244945006,2.274234145779178,0.2804679314784886,1.6859981070342678,2.3550020737838073,2.249865641934946,4.794535419522502,4.419229762167159,0.6644267793072378,3.980305550860935,3.3765724283944234,2.586826585184172,0.10130200693655111,0.27112500543486906,0.7790115241920226,0.12054220005893068,2.7388224208638556,3.85390553242697,3.6189081409942894,4.293360111724873,3.978417260344825,0.5884172801586174,3.074146048510724,2.508156518857223,2.3594990817180617,2.533967120129834,3.5074096800851207,4.1613118948697645,0.7431707277548116,3.59142846584232,3.7739140496150734,2.442617454321182,3.592979886164127,4.271071720199941,3.6744974714586265,4.300327081327794,0.05741247906179914,3.4724827507017118,3.3707959459830636,3.1600573806062924,4.774304691866788,2.407314024565208,0.7263274023359589,4.662966637653259,0.5134480293164734,2.6122388783213513,0.7360392101435209,4.944515961842514,0.9709418998038688,4.316750839963309,3.5058405025840855,2.9493399027689824,1.872139812217496,2.1958838374949616,3.897164629520077,2.5773673608568948,1.3767025112242148,3.180148699912726,2.1443652738624994,2.090853323698557,4.668220986983679,2.846969537320052,4.861526057822195,2.432220418213975,2.711926876007804,3.1010585540704385,2.7171666152492193,0.7444292224065385,0.03923380350036254,2.0325321928113516,2.4709893750736986,0.4595446096917588,1.875943198729707,3.4579996492548637,2.0516541504501697,1.5049428373124363,3.3348526515430645,3.7228874487271,0.9253399712981258,3.307279058595878,3.905532260360187,1.4621364230723732,1.1297882742662957,0.20622160988278293,0.7667220093949778,2.9852302200384195],"beta":[15.714339764938927,14.477835959335756,28.442800882794366,23.860450107793447,17.869076401123777,17.609858770549085,14.091384612396238,27.51137866659168,12.474132547210036,21.771312992012476,20.802343077620083,21.79629202478679,23.141157276235084,25.246889878745566,10.151734829455709,28.187513395884203,16.285835746113634,20.081323970233154,28.332414907475872,19.24878389325029,18.14991521833083,16.865956361090575,16.656282760528352,27.726169903586285,18.028363617982027,19.19390719079262,23.37337122758392,10.727293524647497,29.60230803073634,26.076564368567624,10.701903076346625,21.27529095568122,14.96139151313496,29.94804927771984,25.81688840467105,27.42141414072899,28.48865307068188,14.481924421046433,24.461967606175236,27.52514623979554,15.70718701404791,13.391896132742943,16.70244929425464,22.84921942296465,14.168105948128895,19.878356006395975,27.755052231846147,13.817694277658763,11.86726172612168,18.534946336374034,15.754571752283315,12.998701006575235,12.893697356329113,16.39561974141307,16.261480883237844,11.352920309096746,25.470879985230578,27.428127536190438,29.783600929828424,29.47837207498226,27.101767145680192,12.188188923164489,12.703711824463353,17.060534494776892,20.582228678009784,15.319367951174957,20.16833718360889,19.695493910937813,11.373791316063864,22.175722185196783,17.215553829521845,24.133128657147857,10.423477137663916,22.815976420089385,14.856903519545028,26.87988107453213,24.087401206030744,11.708355295439695,11.628017585943384,27.61227845292354,14.633348269935906,25.86638464201115,26.735185806069012,27.92908109000455,29.60842103643799,26.941677974616724,12.570220531614233,26.498426709061704,10.869100163968941,22.30098281087312,14.127358487172392,16.225392334250767,29.677574661087075,26.820267753612086,10.567118332956497,16.784322865138627,14.371090119414959,19.722675336991603,29.609564478882117,12.302747514305604,16.62795843733816,22.234363930149044,10.969849548622808,16.83119402881892,24.216885332630163,12.946652386649111,10.766098274864895,16.14712607580469,19.291206662280484,12.38659208929295,27.21952747301589,16.59415390552931,28.655720472842326,26.213029686793252,18.789838879865957,20.978822493997534,15.410013913800116,22.02154931996159,10.094875177467566,15.705061610625846,18.133114075321338,10.330743209539733,20.841933597462123,11.301109556693532,19.626354679207246,15.582359647645557,28.958866452460434,12.197290336162503,24.729638696980242,21.56056850847735,21.84577869209603,20.476497145432656,27.60331950620554,22.39826416474098,25.771488545750337,18.180243465848122,15.24329544436907,18.358848242570236,24.081249832832906,24.443075386101746,17.87015637090233,17.59573979909398,15.055513620906318,16.090122609328965,13.978149885937468,23.871423464612434,13.385441085081027,15.7149943556214,20.682290717747055,28.350477223519288,23.062044383918547,17.926573359031522,18.578962484449924,13.755435596841913,28.661726961179568,12.230290692977741,26.80937274471429,18.886385835076208,18.45374765198258,19.283446411158746,13.722435774285856,10.027584334751008,17.3272749600758,10.574850741149797,23.217418896505478,13.412088594436312,26.63342138868324,12.786853768821803,14.515596970866378,25.79695355243966,16.543581906452882,27.471139511373135,17.229391614735157,26.158718709887484,17.964193791575752,19.563777729637803,20.52948710983614,20.018663879997625,12.011368667657072,15.849604518611136,24.95301167674432,11.529561330046501,25.3894061749737,10.563516976970266,14.521784714647863,27.21858183903418,23.568964947832796,29.06925069196101,27.910341750376197,29.24077879532301,10.676901701910095,29.149907292146253,26.133840446375793,19.900943741578278,20.490653879646864,28.83816873092234,23.88361780770655,24.016534927286486,12.813521152341814,20.09919927383361,27.35779270398419,21.373786894845882,26.68725115452983,10.436914379550837,20.990372649777953,20.849219329034774,28.28278653928755,12.323553300866141,23.387444576022304,10.147868307536282,12.858333800123592,20.43849654533772,27.698017260033183,17.158834986968788,13.178440643176348,15.51932124015066,26.71046443378077,27.318443235086846,11.328394022808276,27.800402295666075,18.853521866765806,21.61999985392646,17.74737620847555,21.03768992753631,17.64326649522538,29.442452291542605,25.414865164172667,14.783214872339192,13.765883321723269,17.96448230376905,12.464004059510533,23.357763870965044,10.389162902232233,26.809728828790192,25.093873513543414,17.199427706160392,12.239973907313736,18.155807379030588,27.06086267155338,10.066638007879565,20.537225869224656,21.422216853668306,27.115375335479257,27.278033948749766,18.64447808740006,23.11526479185237,17.53693698136859,22.86228681912244,24.753057098216217,11.843396962879682,22.390765367355357,13.374599992149578,20.738540664899972,12.020038884753017,24.552418566773454,29.44237343323948,20.068547359518124,18.95329493882293,24.72082048047497,28.083970960249015,29.15184268313184,29.471765898283174,16.33832718327362,25.058079288473373,19.98873312945034,11.286939405615675,23.76527121337867,27.155658192908213,13.178968573688703,24.54419350258389,16.39170208441543,15.757937312091785,12.05753557147455,24.896769703239983,24.643320124845992,24.65299797854158,29.221090174881688,25.825400018104467,29.491004541563065,24.662631983418706,21.47685550661665,28.475922544351477,29.64159333509244,27.70739213698762,22.600722207269484,15.768843166437776,13.278598653251446,11.49403736208042,20.46640385025222,29.998833917462527,27.018971383110838,10.297142347760522,23.515599151563272,27.411392263710574,23.515282028920513,14.25954618731144,21.687987047668138,28.62949431098047,21.53656665950905,12.080630782696895,28.2040190236923,16.43680485531315,10.342045608235049,14.735081628900035,24.441119524108434,21.610448501312668,19.184429237322504,25.91811890634876,10.515198033052595,12.457337293538862,25.87628887380724,21.446199578443213,26.555220917311324,19.530688425616184,27.745650926489613,28.129131184352403,13.55940187357833,21.805153580718013,19.510287391367566,16.7494806930467,24.15963225530959,16.04786412557372,21.51361243158462,28.214405963651046,12.112755543854288,19.001890854438432,24.173617175173344,19.41208405137818,29.912582940412513,16.55151956067126,24.926233300760806,17.874560149160722,13.848086353751095,21.12992803579204,29.941510530224548,12.47931909568492,18.397079644376248,18.852619205370665,21.372787579327557,18.749792493072285,14.711631960795572,17.631051902815386,11.05250065064011,25.99881025692899,27.02158056483924,16.744692486516254,27.64964011599959,21.33554510154933,17.191166462077774,29.810647417585354,21.339282298568065,28.534732054741433,29.534437876538462,19.729625052877257,11.238882150718918,28.200360025943077,24.026499816002445,10.209452658857963,23.225560303000677,13.727288300208746,24.979947010712714,16.91751697484171,17.007631711704626,22.4873765333425,27.520374147113337,16.404579092730437,26.654908971295285,15.545736097654315,21.89784230312657,20.94109221079895,27.362370652623625,11.537312326031955,23.101606726396273,13.839928526732038,17.639735506409593,12.055424890456795,18.72463005703848,17.507669080634845,22.26047278642077,22.510489580277127,11.656001904773511,26.700324967105743,24.970570540597855,14.355073823011457,18.545292153545528,28.242598890418293,18.829335332425572,16.487847610283023,13.10340634681106,17.497420854375186,16.438501545731754,25.335176422211276,25.87773291762186,24.74069189078067,21.725966898035512,29.536286529143744,22.789771727601696,26.03395629470002,16.778452012212345,27.79638455583494,25.764385306404613,23.523982144637436,17.96451464479871,12.147064241230744,19.934607083359012,14.182252209023979,24.953627042954885,26.57430272820575,13.526741441867127,16.1595951865884,17.3143585068675,27.993158165319457,25.433928280319854,18.387185608421287,15.696412005151812,26.43105142453279,28.880934858331813,11.121170391568423,22.08898568962669,21.05588616794175,27.979497908896246,25.08038250944744,16.7398107293903,19.12299555322136,22.87330920342603,11.536141197500722,28.854805432451933,29.294421956979626,13.247596499392348,20.976264321725523,17.48442539388373,13.505120932990584,17.140906299294606,27.499535344060764,27.974760238165885,27.32336994447192,21.335604953710746,13.230278611050768,27.659424573462626,24.037469770914225,11.152244158998252,25.84028568128199,13.601899088131923,18.48076098269032,24.88629748570756,28.180818627650396,19.465177336252246,23.351669604867645,15.834542521546432,21.938485148425634,18.789669400665407,10.456932938555617,13.414266082521674,16.185922299428846,24.708265944366396,15.529874131963135,28.20519346757178,15.351047312563399,14.721268686914737,10.268598537768838,26.6896350491658,16.437578123762627,21.441936458530186,26.246865631154442,14.294576215606973,28.851807342828412,15.670269380026781,20.435822314986765,19.67310888004347,26.975606810350627,25.146758462597848,25.238801268402263,12.828267435962264,28.305569091073743,12.57576339359376,10.900899551225631,28.927689944541285,29.1949128599386,18.25068017020557,23.243717937878206,11.534672110997644,24.310749218765018,17.449086350509035,17.658652897500232,23.34913716057414,17.596392132198552,16.221235512800945,10.393465952757639,29.694339945375063,23.486154030741982,27.48091552421016,18.108846978752272,21.080923013509416,19.8621389723821,21.064676220665916,23.70334644598314,16.975173416597464,28.372345236707055,17.261224760769572,13.68233418924337,18.573079717902075,11.859876603642743,27.046653657366125,18.931950888161133,19.01489929029151,27.766871161811263,12.450315960799486,28.006329920980765,21.328930194208326,15.43164893268694,26.509439659637337,21.380251458666123,15.897429644105724,12.207504479411941,12.002113893325408,25.142780569358084,25.165051293568744,11.51489060219021,25.878308461591413,25.542695645610106,29.993428665041584,18.306856921180934,26.53478955460471,19.536998613259474,12.080755004346425,19.229033488850312,19.465700658660467,10.653630580164393,27.089037720085972,26.945931373011778,11.993857330946454,11.458558969150952,12.457296449547162,26.870149884342077,23.14800344965085,11.554604703184253,17.78477786122197,20.33001082815977,14.919941055762816,16.73524323180871,16.344628128545594,29.43412397808278,21.515823598891814,22.250826868330364,29.60025318040099,23.76043633761884,29.497078242383246,26.143269477446317,17.835586924746956,27.25500773577957,24.681371574106763,14.22386311969285,12.686151876310126,18.49976210270221,12.29973376360292,10.033646650223478,24.650163691911033,19.474849916966654,18.452965451476388,16.797539005199905,29.706623985356124,25.147554834395663,21.18030585805524,15.851590055894569,22.41577442607042,19.854868271111044,28.631083921501443,19.888151347547254,16.978052210759145,12.193556409036827,12.5423832030746,26.02828895353867,12.70744037480149,18.367033921480378,21.369594246760503,19.001302329989784,25.402839699149148,24.621150942374722,28.299886486639522,27.828278557697782,24.45223742443136,11.12261472811153,24.978433922279322,11.567192224577877,26.23205939343267,11.15616327423503,12.846058200039217,26.077876965893246,13.421900819056232,14.418787936908966,14.939956967034057,26.054538378373614,22.499702624753468,13.0574798457153,17.927031720192765,10.627129640464336,23.57549756330205,18.1810882600075,18.307200832563506,10.35417559993681,29.200559654862328,15.840125284835157,13.430083209571752,29.074644396722917,28.449813558515245,25.01596304277851,11.516421121326514,17.38786328900284,14.561147154135604,17.838889218485615,24.869564876027166,12.119297094923729,26.193768508140884,28.657497869470387,22.882330126773912,24.808146241531848,23.35070279014046,18.169199823769336,16.322441561297975,23.376842373887698,10.77897794185095,15.553438422372423,15.398884297590412,25.228355954003696,15.390764533971808,22.443537018001102,10.62086348940011,20.57550325235223,21.1216039773158,21.347057652117037,11.768582646975002,15.039044270723272,13.921521100467391,13.054868069680342,19.542272397080275,16.064645947428463,24.434038370393836,24.776334096826123,12.183368275405165,24.962757756619354,27.475526046511266,26.30394807978558,21.51287644150399,18.733583282167956,19.570485210718353,12.635636886342372,21.41175317131172,11.303702263057787,28.02813279402571,20.176538316639174,13.256700796349023,17.242051439356473,12.678274881990713,25.63235130548368,19.916364475915938,17.357683564608326,21.1127349764394,10.106811037515616,21.942609389696027,27.02357323935384,12.139540271207764,11.085875827113911,20.260138484594535,12.798858824526086,15.84484776986816,11.518069998915879,17.4025362348667,15.842870614467488,22.114997326589673,10.171639484919952,11.761638817589354,25.382189204463085,26.68059245004318,22.165844975022267,24.34536456556969,13.075474973999913,21.829234179561126,12.258657456483139,10.048593430327353,22.333925668943376,23.12310323661892,13.059116280256283,14.789620956970309,11.642871950691799,14.264727252802638,14.796742410596643,29.351481839968354,21.740261092860326,12.965822716861673,14.62823127402768,13.343409935527951,19.137682836865007,24.777881867329043,24.5817528697195,23.350987535991898,24.519686277027706,17.090958883062942,18.98224378629957,25.751388115125113,26.37373875199225,19.417338789928102,23.195389898632513,12.383485608083284,11.536590472934707,13.134866703568044,23.104069348355555,14.175795518467789,15.565497949261374,26.390033492790373,21.190475281623257,17.51471264107633,27.19781577942509,17.617459355377996,18.057278528659758,28.744519330580985,12.471577946866258,27.951144136982137,11.957730241627882,25.628914576864116,20.58260267612664,25.19749850461764,10.690700182326719,17.340033246981164,20.27756948668508,11.30029165188625,16.95589285547713,25.182470116929924,12.03658622003076,28.919813786908556,11.227848024444409,28.99477586292818,11.609368209728558,13.78057958910826,16.285193930040542,10.926131378084637,27.34285461615876,10.87656408124522,17.3928476877698,19.883933732673672,11.79326581261476,28.308729738710866,29.172832431457078,26.123562628686273,28.922474987639553,20.999274555415354,12.756156844259085,28.639956237137824,16.40915809876615,28.395437592027267,18.884705769586326,14.952217850886056,24.518745229435442,29.930708396508244,12.524168882786814,28.558958904146298,18.12701477739299,11.558398774746212,18.567946956299366,27.980686298815264,16.780524258917456,15.90581974931375,10.55250162952948,22.8133390768971,13.863389569249872,14.319907953783302,17.01537741460671,21.931483981375482,28.395728641845107,19.058718873755996,23.99432731471949,22.50804922473504,20.024158907133625,16.608560691494215,22.749679035460137,27.616482922996216,23.509461425671425,29.893291091897147,23.480454812427535,13.631766507707553,26.519418384590274,15.134604788123859,27.698663493074392,17.612666567603497,12.092332607053592,14.704023917009476,23.588651958179412,14.53543428268743,10.603047235364095,29.34288000216678,20.54983139939075,23.817203664588597,26.523455956052278,15.945485847509456,22.89832747324872,27.039101562640873,24.440053886644137,20.658048743443,29.977408277229575,16.8143149825272,15.565963486572949,17.433886974755865,26.701512351536003,18.616940107903815,11.358270629990376,20.330685552936202,28.74166859202857,25.042003420066106,26.83105192089367,20.3850808182988,25.67845530081428,10.27949398322015,24.30178807701858,21.36845584180957,26.455906365373675,26.756579042513884,12.34123609363344,15.556456698642522,18.94311475081075,20.264302278286067,17.693399947045535,24.239375906262342,27.416487482516114,22.429784537046498,29.25973339540713,20.364069591273406,27.322206723782067,24.778332500640946,18.62265514352357,11.110201533402574,25.036916485106,26.743666173285497,20.536995086982834,24.08286929754575,18.829945568590134,26.717516262832074,29.345814062636904,16.400217431614124,23.751661887322975,27.52315526188084,12.178757657825274,24.312799350885168,24.949625228818046,12.566657311440505,25.281706621098806,23.79923242043248,27.928661282591875,16.78030168304666,14.770633837525429,17.409206145433856,21.090222294860112,19.255276084244827,18.58554711324683,13.774810095013068,21.014042848655087,17.589647073656312,24.960331337302275,10.2195281489091,21.918123806108643,13.018837533139651,13.958494691221839,27.42286394115187,29.05883641376454,27.749073888342526,25.096410972605018,28.76714931327824,26.399992255269883,14.942203313076732,17.931323426024694,17.691781979124492,20.665064324756003,22.878934085374816,13.942364473159934,23.91410790778835,15.942794527523358,15.948530110123421,21.653907912797017,10.879407312385103,21.356115033423496,27.904057385272093,18.3582123714772,21.191391224660336,16.517565291238547,12.436148466684722,11.979154484548502,19.455077108197255,22.157042581002337,24.596029348009335,21.363140224375453,25.403828136426824,16.26165146974653,13.549907312278101,10.609178193191443,21.030570269196573,21.07615439446547,18.210946616953564,20.169272103620372,18.802712634985355,17.906759498842316,22.652955751355886,15.076475816354812,16.95583121637265,25.935371885283143,28.036505232854022,13.903709807960292,11.395993313954635,19.164899159401322,11.993689940153818,25.372785301858233,20.35323275704034,24.825939264032737,15.321940466073274,12.164477335863758,22.373155392838193,27.247312527657645,20.923639887161766,16.257441387239776,18.59666827319442,17.120811343502652,16.51524551095898,19.487387902445,13.090300315808223,14.160418850699958,23.120055004488567,25.146906452702368,24.09150480508011,28.211543623934475,26.896905194531758,20.0802010636065,20.710198139613336,25.117460865058774,13.047652750712224,29.71845345204047,14.847634714415188,15.171038453132134,20.951839571973867,20.420921141435706,24.796479310014657,12.618905556258913,12.368939927778522,12.280525602797464,14.795436140312631,10.9088167596637,27.023451518738373,18.761267211881055,25.284194024174404,18.00312072278259,22.152339908088553,17.559196985813866,18.905047481618126,16.262295741231863,16.762352573935615,15.328658581827694,29.623204376389154,24.38236052783172,22.684994215798483,23.78701908988298,20.59834146801053,24.842145900787994,28.815641110559906,12.903477190237833,23.24788834310035,14.040144002063379,19.796512851404348,12.139650133775204,23.934803170911568,16.502841006132535,15.15893221580496,25.42766956689078,25.07937709968632,15.852955032063694,17.26597015866872,22.50358415966575,17.46273527480341,22.777757292801468,29.525776780098482,28.830731522467318,10.678350597685679,29.40773194679993,12.516274804542329,28.12339134447745,15.597526804381294,14.332720892242104,22.925319324810395,18.91840751621844,18.423078175308444,21.791256521114622,14.033646881143266,16.31852961201212,14.148814350294385,21.93882254465702,13.59654268682644,25.53894872109991,27.985016103989583,16.27823511897209,13.840740711065393,25.707887495325906,28.02074438997146,12.64114055227072,19.55289834134472,17.889719000214697]}
},{}],29:[function(require,module,exports){
module.exports={"expected":[-33.24417799263499,-52.9511021004472,-72.41550992340545,-0.10842520107228726,-23.43586410113789,-7.288107864282914,-13.782023368434537,-33.39607830878284,-42.595652516592324,-28.17459239125704,-24.147884863335555,-5.679942619363436,-56.64704011143847,-43.58774427126353,-20.833615359395594,-47.74907883612442,-3.0900778631845567,-38.789951674688794,-10.825779981538211,-27.786896001401686,-45.90330000290265,-22.97539079741756,-24.348849324828432,-44.458052425118225,-27.645290393241325,-0.4708943460821797,-16.625555089878297,-1.392677661577903,0.25716048340880526,-9.106578517449652,-43.3340728270698,-19.603285489671016,-22.38102636059445,-33.47472851892445,-0.03655656455993972,-57.70645634955205,-98.69438310426979,-20.445149514787282,-21.106046896345628,-17.832695531467113,-35.18808656997751,-41.805898396150084,-13.181563489435815,-41.562448998316626,-33.451532660151855,-16.165207723857293,-4.989057800566016,-41.32720753107858,-2.7293474623195353,-41.24040052633114,-33.827758620482406,-14.653661256455148,-28.36714936579219,-5.531812063703808,-18.49038418696561,-17.378707997377646,-37.640875049667194,-24.365932042998686,-48.10453822719249,-25.938923859399015,-42.268075851320674,-47.18034802231782,-36.912735599843735,-3.4362174510875025,0.41574318658065534,-16.286450719230277,-5.105015018817584,-50.393227766663315,-19.997839241718818,-24.461383020898865,-44.96929433779621,-49.7445999134606,-83.04019776174295,0.7925069682868728,0.250197656112356,-47.002187303244746,-15.421741504872852,-27.467980652380113,-40.856232728775005,-19.353078701039443,-62.40865674893226,-53.44799666415858,-23.986689206644538,-7.282649235797532,-45.71229889878755,-56.476723978591025,0.4700894892254084,-44.346067009455005,-14.796207833331284,-28.77345527460122,-69.2474624212938,-72.81111826411171,-39.29694706276034,-16.705681742912816,0.7793199492381568,-3.1958857605289275,-18.340720345052173,-32.926211003064026,-22.183407320204076,-18.95838731531944,-26.15074020974363,-45.812214256256546,0.5525175954368504,-49.22948474348227,-14.664857517046867,0.3839763661707696,-43.64197425646624,-56.079018339465414,-1.9702343062821317,-8.838703251255085,-11.060180450834174,-32.079936136084775,-25.48447186503425,0.8798801648470504,-2.5729841459111573,-59.05205911410136,-40.94191349397457,-46.82776946176174,-33.463529643739236,-33.2543003326852,-53.60583763343548,-31.974325016668644,-68.51987565676762,-4.2363696464300205,-29.343584115734945,-22.539852573920392,-20.321225693759196,-14.547596779833647,-29.605597114707663,-43.56947248906618,-43.64284670587257,-9.272339720355932,-8.398991938750093,-14.791267952596149,-3.625158991651857,-40.721116630281,-19.588624938121335,-43.512907105477204,-31.28384131430546,-40.645792249190364,-8.504251546804749,-2.0214389158854806,-2.727049178361454,-27.05894021456453,-37.49670369787704,-49.15010624061197,-22.55415503420019,-39.15053452551894,-30.33220618491378,-23.98523827637617,-41.60605659067235,-36.582358680596585,-9.002449252514486,-16.2619761017427,-1.1019024184431196,-14.045482761223765,-38.62324195366158,-8.31122803806067,-7.181166624343057,-26.275977303452105,-34.615939182796176,-24.878962981086165,-23.745873557451286,-48.86278156053666,-32.09749253594194,-25.426562325125186,-58.30612039395561,-3.4530914714564362,-29.932606749450542,-0.7355730115967711,-38.52076810434343,-10.10238707662047,-1.6687586279748112,-47.00114335786582,-20.926092992168563,-23.882237049573753,-62.84305053170725,-49.34404416649606,-10.26517745348868,-19.58000583295481,-36.034262911486636,-47.27370190771142,-32.44531623472095,-0.2750287112983787,-53.96672885131571,-27.939035539775272,-3.1062921170790014,-25.895925507104867,-54.42799663010661,-34.821848737682714,-38.268092432307,-15.726392349453402,-41.178875656244166,-4.1150333374281765,0.04032189374874484,-12.549898539594125,-14.295028669007309,-20.071709523774555,-51.70586231165204,-31.60500439627554,-7.296653261359743,-20.923661403680093,-8.799661457495215,-51.43623577974199,-31.449841671404595,-49.64929927279419,-45.12941564194776,-1.9131360729360098,-11.541323479518955,-3.5924217337132265,-16.45974651772717,-0.9887776438488798,-0.9582373762283871,-41.922105518887,-23.970924537724425,-48.246814577601995,-36.92261072651295,-35.74765026876592,-38.479207437988734,-21.179044825792584,-39.654758935319464,-9.068024159733168,-25.38464015113397,-48.108600059101086,-0.666749122243103,-29.646242210186298,-20.04952042113508,-19.444746665920594,-69.50257673325524,-44.40200599956803,-38.39732701466314,-79.88125155733658,-41.56374939578578,-18.9590983746044,-5.3731539176596375,-2.1410839349114337,-12.794758941687583,-54.917927518577955,-20.172799001783304,-34.55486167890291,-54.55394537949431,-21.670387967798224,-0.04096088282576149,-23.03254665398259,-24.106039730946197,-48.90043080757252,-30.33156418670886,-45.55183780229956,-33.48165349994354,-41.51045076582201,-23.698989842699785,-45.51099222542719,-28.926662494116567,-44.7650603337219,-64.49758943923017,-27.227701228476175,-21.602717032902127,-77.50392562653262,-7.486821413243019,-42.32445876957365,-31.229798306960255,-45.956728334133366,-28.632040113493765,-35.79856801336144,-36.52964863992451,-11.089164503618795,-26.499508040932184,-29.196469480388572,-47.8679472986633,-23.585116490282026,-34.38901586426808,-10.749287678668775,-58.37993328614064,-30.798315049763588,-43.559224029585835,-54.86652824274061,-6.5177574520123045,-1.3902692145832098,-24.880151180352463,-29.131416542670912,-38.72469400412233,-25.420270866834915,-3.2780170262057657,-36.07079506345092,-16.387776396215752,2.2299228032359855,-18.804044426059846,-7.5881859312334665,-37.60220844759871,-34.359479615667254,-39.38925695707249,-4.67986512357187,-35.12960932607246,-1.8264432964416448,0.47050496468505143,-19.062251580268963,-11.870606590664195,-6.832257752115661,-57.96701767559387,-21.403624806280327,-46.744622916899715,-28.24523746976734,-16.502653075634132,-81.82724249406904,-7.53659877193195,-62.94882943530134,-45.32964055234735,-14.268011961719237,-21.496496154803427,-24.327001078678787,0.7822739898293594,-24.18148805921354,-4.424555836064212,-29.978346380640293,-42.13276426786343,-67.78881008726943,-12.450981105664921,-5.883756059547861,-70.33694540236196,-29.278391321084104,-36.714043285019,-25.875149406646983,-9.277738864316156,-61.727445062085735,-1.6973983168838997,-12.64873819987287,-24.104470218148947,-9.824330119539523,-10.605550990958541,0.18500750742177097,-33.08314054694097,-17.912065462407742,-39.54823500795322,0.9861112170238104,-29.149370556360452,0.4938988228829815,-36.179168461744204,-30.16040229441025,-8.703192820657637,-28.795433577170016,0.5348193339664942,-18.80297999905494,-6.7989982883249995,0.38070915287330953,-15.950732325756734,-60.35208536098568,-16.09746683906984,-31.433750102597067,-30.052815132245698,-4.206249880523979,-42.117506983336376,-1.5975291704365624,-42.78589319422067,-5.037894415812433,0.8023995415585694,-0.15545286687629956,-0.9026870395849786,-7.813463107718672,0.5210111688570267,-48.208908277196265,-19.2218800230733,-7.10521058359814,-3.175407904095379,-14.172609766547806,-42.36332017265133,-35.71110921098464,-38.34121629319393,-33.5179747588249,-6.463229451359762,-57.19953455932085,-8.6442191803738,-10.304466783528586,-20.64916120275349,-37.95926859974683,-35.52479480070007,-29.565622924642025,-13.329562218889057,-47.40407897112474,-46.57037812003995,-40.89820794955125,-46.28535559180844,-6.0248273776816585,-7.345013276923817,-11.994829487422939,-22.563825740212856,-8.905108958358147,-59.18120614638152,-7.763798936662437,-37.27735410616838,-7.601144421023377,-16.679493919259116,-30.711922399311625,-5.764477338923465,-32.13783118634667,-20.24070578064623,0.1322379653031973,-4.9628453656738305,-44.921236883486266,-9.006604087938232,-46.75148704336165,-38.0838197473529,-16.07991667493988,-1.788197515835655,-9.793381200937551,-55.07809414715657,-81.21737821455548,-18.542887369848298,-33.334311621356036,-21.25568879449904,-2.457361664808131,-9.832811509558443,-24.70564206228586,0.7141812229393816,-78.09227028289838,-27.1241690650322,-0.0578225661912275,-17.156437947780905,-1.8659386609634456,-3.2963408067273754,-20.387957425948223,-46.656842642786316,-41.959416381555044,-11.497730223162192,-22.463820065699675,-49.62731250602167,-26.13846779281697,-52.686393763833465,-33.70880132144717,-13.672030467472913,-5.658558999643928,-1.4218481061001336,-23.164352766429115,-61.3477415353635,-74.33509165280188,-3.2801159171046272,-12.637521359615842,0.3624255667555927,0.44085858132353306,-56.181139417528954,-8.80309737573009,-18.28075351386024,-38.91312139972282,-25.689976435477085,-6.935429446502196,-22.930258867803126,1.1676477927452638,-50.505483020085535,-71.01618128740927,-15.589042183524167,-13.490598836170827,-47.45782815497501,-74.78304705307173,-0.25006606126152375,-41.70492359124315,-22.451641671769167,-51.73800728906855,-15.83605246907564,-10.346849841407424,-3.6568176579443126,-13.665599593198921,-11.95450623873377,-43.274867650570094,-3.1967767457749963,-44.45935908369589,-9.921886230356701,-47.812219793387214,1.5571442319751505,-19.869132880185255,-11.031970215349084,0.6041106077224345,-13.838303875805147,-3.718782366981435,-46.797475224309814,-18.393031254477304,-8.781440822472616,-12.34089995367746,-43.28385730771708,-55.64122082409986,-9.015062307762902,-37.31143562678612,-20.29374423639205,-33.028139922787155,-18.569369885988305,-11.326218862220225,-45.6325129598868,-44.52657413616788,-16.262664566021538,-14.870354238647902,-23.755094859559023,-0.8698068358501794,-45.14965844602574,0.49656589701117637,-57.2377763541308,-32.27247019898303,-53.464335166056415,-7.218108515215453,-5.525843834584753,-19.446566111149526,0.1695731445505273,1.259536635084264,-12.675544424215712,-4.155057942736295,-12.87254896589072,-19.002524975341597,-35.91917168504857,-30.81816960963668,-2.037154018021958,-40.208042710173046,-10.735302906746304,-54.02092097474293,-18.110988089168927,-14.194681925974104,-43.80065065495055,-37.26584746157434,-35.541280309581765,-9.26337099667594,-36.331702683597555,-2.373468281677615,-48.3233326769315,-8.171392505666358,-45.72744498439029,-11.517268830463667,0.07951062896695094,-30.13001482098777,0.5691825765873011,-7.097474569331109,-52.12084858276029,-20.381307913122107,-15.939935064060853,-0.8900602765428967,-25.01966661641078,-16.781767420505762,-21.267768699740717,-6.849122352328443,-12.627929861420787,-37.53805592591651,-21.247922592836062,-21.840534081905457,-52.21693267141052,-28.386191041021423,-34.877107575393374,-5.092690256505572,-57.81695045472031,0.6295374577229951,-13.016728339812643,-0.3433247758551725,-47.85650933761384,0.286032416730603,-48.636897636850826,-63.28962714765353,-25.285895344608413,-2.4199101130683958,-14.433374972355194,-55.64588628330911,-9.43491143892319,-4.0161613768574345,-30.133772775819207,-43.15914151055249,-0.8116155571919941,-11.058058333273653,-50.57788699484989,-43.33303306969835,-13.936108932893003,-42.42468353967158,-18.79769000137885,-3.4803260592285423,-35.68665934163738,-15.446100798958964,-9.675645985917786,-12.098511007035556,-1.4285268029218767,-49.27166633857226,-52.82700070271794,-9.814118875111319,-3.302884464416923,-22.368093450500027,-58.484505557408454,0.4836999331878995,-20.60670893720485,-53.80436295660296,-50.90529101810522,-18.689604729500516,-22.13868089498792,-25.08013139751526,-42.35487303049218,0.14948866039576458,0.03174317225777479,-1.5132396492539972,-1.1273938134029733,-39.96022348149113,-69.80144159278605,-39.28568004457138,-27.154877084829657,-23.291193956226785,-14.491001694442051,-64.29121621852516,1.1255435511952672,-16.406891848352267,-15.809725434618233,-17.03895421613022,-1.63740472527093,-8.63243621752452,-28.194664042646796,-17.915975690030113,-52.3027034375199,-59.17280071202151,-35.58416678086595,-53.12085503986645,-44.93645966905787,0.23249654600043357,-0.5882910310479859,-3.1767910395061443,1.323908410786129,-52.10676489085436,-1.008995444960195,-2.0232929694345585,-11.163657906127499,-23.057095638375934,-2.4465488543505876,-40.85853966212826,-48.301998725423836,-33.38677065046079,-36.3165412022501,-34.11833562133031,-9.144418813395848,1.550699575805493,-47.63502878715355,-11.301710215229347,-20.686887260314233,-26.75639710761195,-23.533946521738034,-56.53437671858363,-17.88522590972106,-49.669231100211114,-27.970874782595335,1.5519070971478264,-50.133252116402716,-23.783823333340766,-25.101076801037554,-49.907498498995935,-2.1752108400711325,-1.8084751322548414,-37.89603217081644,-33.29662028275716,0.3516902283682213,-31.091804908294055,-55.89520119124547,-1.0000255935907854,-36.4394321001474,-44.53882539692507,-62.42123547888797,-22.622287413915693,-51.70012142727842,-7.33561759948295,-67.59966374865269,1.3139870900716948,-25.10175920688779,-58.35525442296586,-41.97214011631381,-37.642446428932516,-40.562261154647736,-21.05027771108994,-33.91059972024054,-10.333103570279011,-59.78590735094744,-1.9780809145263385,-60.89054241173416,-8.34972626024421,-39.89763591026349,-20.7844480567893,-24.489627677780945,-9.275442568342969,-19.11644122967221,-22.56073869052964,-18.611973339397398,-1.4540711110339428,-46.168230103765964,-41.4221201964555,-36.63747248240602,-30.405064467369275,-5.802590868216315,-40.03804028231809,-51.9201920187386,-14.352039076482349,-10.892082426101457,-63.694691006121175,-2.680771198577587,-78.48971321717848,-4.833298360769208,-21.290896574477664,-20.405510293370583,-13.869162732947858,-0.7943849965588403,-13.114026428304431,-44.208477351036514,-1.7698587486274477,-18.22350121722894,-47.216652888214334,1.0639239206790496,-18.189666927762314,-52.6793527502104,-16.490637939528842,-3.323428831956389,-35.50798274499823,-67.35061541217206,-77.04780251695853,-14.903288040543911,-20.706651072424624,-8.369775001562143,-54.21764650749766,-1.9738861167482296,-2.1114988780345088,-1.0837867198992752,-11.073314605813984,-62.81321708920899,-21.584912902168156,-25.819771126067884,-24.43075994608307,-0.7645931988885448,-38.66485887883578,0.8972026552902235,-31.831023834983405,-0.46214577565391135,-40.62912598896742,-13.175357161188867,-36.180315138708934,-1.3581353136130874,-3.8417062426689434,-0.5141942555562484,-18.04196470976425,-9.185994199315674,-5.084559324000661,-41.915004427176775,-24.649883980396876,-26.14579851493079,-44.136144483407776,-73.46951482768746,-71.1551444533314,-15.881828117927121,-4.553764069339546,-7.829848955564643,-28.243605826030006,-56.09612856172645,-60.02990586530065,-86.26894982337718,-9.66843602769946,-49.26142288061532,-40.60210125497562,-57.35302107101029,-22.796288910092578,-49.35205942645514,-10.017782770700185,-22.52457654884492,-79.72141530962126,-47.228172221327476,-10.800343498933257,-42.67779057913132,-29.939261011475054,-34.903975006356646,0.29823465774126845,-72.46923003672792,-40.70165929461393,-40.570648483642,-17.90374928521754,-13.143824814851715,-0.9662288127251464,-1.398525282352589,-34.770157386169934,-9.00677803860841,-64.15466839216546,-7.277140440377103,-8.775236732781963,-55.10791100483057,-2.7910139026423852,-48.61120986167197,-45.761349310515335,1.0219424211477557,-25.512641767403245,-10.867599274735499,-32.526433770633936,-52.69937526170961,-39.03124205582112,-9.894175371458108,-2.0851209361662306,-18.786969796627876,-31.5186119782552,-46.41701384006359,-80.03212150214806,-28.564953353836973,-1.2453462227132066,-58.69627570434955,-1.2336534800141683,-33.50072727834149,-3.0615024520602105,-35.959333443919256,-35.57919452453956,-30.203033369642633,-25.59469418698083,-34.549272278187885,-32.8433835519657,-18.193827827150265,-7.664597789664986,-53.80003514920195,-26.086921290545867,-35.14182585762283,-1.811986720474132,-42.067854467773785,-11.83862729362747,-60.0629929311134,1.0426093801520007,-57.10249345743212,-16.723695741255593,-8.34088642477939,-10.829960557243822,-17.585493523087052,-21.408290341672938,-9.429826209812013,-30.291486981006514,-44.51510407278476,-17.475401047396065,-25.80606012551375,-13.792752397361156,-9.313918870750072,-10.36384079756701,-16.273005797107558,-28.093112591106316,-29.33813934368569,-32.408758862111185,-3.98464563177329,-7.25331897224635,-7.457442366326548,-47.85582465912616,-71.5654150877758,-16.55860235088541,-0.4909312869305591,-4.309288629214533,-17.832203217243382,1.1189332700923598,-37.58846979804851,-68.48614923708772,-17.38732839683822,-5.37603708386655,0.6074592679364805,-17.48365193374161,-70.8662724474956,-52.807753360885485,-40.06554787672375,-49.59613551348628,-11.5737972654935,-11.521255399856734,-25.19400096901941,-28.378063241561737,-7.1101768179653515,-57.12442986577858,-8.66517600865875,-0.47696188229082237,-13.971648930738821,-1.4691047042975636,-2.223361003865152,-54.00320702642563,-22.95483056387324,-42.52999818520628,-10.564656298163515,-24.78165651619985,-61.48759013642448,-3.1122697295487196,-7.196815290040318,-40.029863975308,-62.85599330266664,0.9918537081949501,-20.77524618724592,-23.201646832335214,-35.73100223399922,-0.48908709284650476,0.9151448008817198,-4.937291333904834,-73.07345567350384,-9.061670283821332,-21.284386417404086,-30.68984954915235,-3.6676711332950096,-41.03570236461639,-7.570795617239696,-49.829222577081616,-25.6676722399414,-61.07852011330066,-3.2736557749621875,-36.908119958138826,-28.392650217558096,-45.943327129643855,-25.4346354123846,-14.716692076108103,-16.56207961433835,-51.73150341862116,-6.7947938328842925,-57.66193332494843,-10.702038834204652,-0.21892744765895555,-9.738528093058378,-0.34674211789239706,1.1271124817125777,-24.46926564282055,-49.175623943624956,-0.1722947981643328,-24.692175823245815,-44.06679746431604,-29.603807828397375,-47.30455964745362,-1.0027571264364399,-14.610732067027374,-0.010408459979472706,-18.462150797000778,-43.835030184607284,0.4310899411030451,0.9401837396861865,-10.151119712869857,-56.03512718636488,-5.146696190983669,-78.78201927007646,-25.06747906432654,-56.50036848938078,-39.153191609101334,-18.336575411161412,-5.251757061967279,-47.80507574454436,-6.079038820892379,-54.567342581534355,-49.71178146439894,-49.5283621068391,-10.907887603312144,-0.7244513285980707,-10.614501346065984,-0.5992897387273111,0.9645889947580435,-24.40577797128031,-34.08788762436215,-27.87630387704099,-23.079658333063065,-42.481432756303,-46.94310072633078,-2.231283618475812,-35.99882202634585,-52.0832655065153,-10.920174448603321,-41.38390682704151,-24.715262129446685,-1.6246473906794532,-12.328343187775681,-22.061531833725255,-30.54750478866833,-4.931789425901231,-10.596358205995887,-27.558498820910494,-68.20511872393863,-24.123781234052974,-43.00197497749018,-11.707905293871665,-1.1201371198608858,-4.966020556877137,-5.841816339867535,-12.599740050051588,-37.44479929558539,-60.899911815270116,-8.329090773504152,0.5321884925119718,-39.08473843246305,-8.646442105564962,-45.18907067744489,-32.099237574635154,-54.58226016733233,-14.71959650081981,-55.33464412765046,-31.721327688179286,-41.82123469909964,-15.228163569125352,-25.253911127427884,-18.10094256459734,-6.7325704215496565,-4.830840372765076,-1.2176237559194543,0.21592506436805126,-57.21470824815958,-37.80359293875397,-63.735974756885234,1.083413202270107,1.206770747783149,-1.3116558711545898,0.7525848397299555,-1.0498497018996442,-32.767123821808106,-15.573075850840432,0.07978462460163627,-15.271419871200433,-29.838898496157196,-62.216872196772265,-5.0857054750999975,-10.851681019925332,-52.88124218855641,-26.767201089958036,0.5587199952519262],"alpha":[6.434888863063437,8.281439031253461,2.233836888566232,4.7559749031633825,0.19703572533027014,4.591366147750556,7.24044694265551,9.439640973360255,1.3010636034906597,5.530928513050403,3.4598535737321323,4.6350750303938675,3.691162328117925,7.783437317074233,4.081072613444072,0.8602945702385423,1.2924580876590186,6.7130692888198285,6.49719321536641,5.315346108202547,6.84487329424141,0.8393642426745274,8.285995860569372,0.4578226276595654,3.5435239010880126,1.3169691767546254,7.94395670051083,9.595415876663795,9.695684018293038,2.079688308990353,0.5781251365573481,4.436637508492492,6.058819158063111,4.911092509666448,7.519605471618663,5.716128624742702,0.43310294017725015,8.78737620059091,9.259046527890247,3.2507182601543128,6.309916225356604,6.42655909222279,4.8160555716139815,5.058451601512193,7.6373612208328705,0.4974725520134138,3.672816016448315,3.290670263717903,3.7735113558656264,1.413210380915817,2.010161106605144,6.722406781695769,0.2544728350687042,8.41998823532299,8.946307242167087,3.2598482292136732,9.266570927702286,0.15087764165814033,9.515887981253105,3.1362993588708243,9.469468557431588,3.0742205548717427,1.0101175786971406,7.835845465003977,7.327126474974284,4.919087295165829,4.776065860798253,2.5039222699335495,4.120542957072891,9.491939477154771,2.735215938851898,5.868655472997235,1.267455369879884,8.125356207333322,7.524072443020917,4.9381651921120895,1.808379695384028,2.9751887194875515,3.597697860189537,3.6085596406481946,1.547646579773645,0.49652741809177225,2.5445892923680002,6.422932992502921,6.501560128555126,3.271697321541722,8.53905298718246,7.659562169279408,6.790437574917494,2.566623503498149,0.9392588693590231,1.0343459478765005,3.6138145070600136,8.104687684663297,5.461342393441207,3.387058582966933,1.115828343103742,5.748588524745346,7.16494352572548,2.7588601079969766,3.1296646196122158,0.04939872295993908,4.903161401212359,5.590270486614464,8.150174587866807,6.7561499692782405,0.3442682348030224,0.8081295011847378,9.802723931294008,8.757525969526267,8.414844193492105,6.057503996428553,7.5641988059277265,8.934847068549587,3.4536121035744083,1.7247740173321247,4.03144605998897,7.8729707637357755,2.2467371010670623,6.47758346153333,6.590600136185422,6.4659544704415435,0.21616890606155126,0.5434142403353825,6.761825079355468,3.437427827783146,8.421552169162773,6.004742560092254,4.540060870782538,5.807129629120064,9.325367186072118,9.362632687517227,4.5441570937468505,4.391855154411514,3.3548045820012917,4.756674862956906,3.123834899173834,8.553322436950587,1.0435352934420838,0.32457265252569645,9.475387875152153,3.0909646330302154,2.504932785598417,2.047054077859729,9.959780326968168,0.4560051728507353,6.897094763744365,8.610050810578898,3.6646334080833043,0.7101203222871044,1.466806441063544,4.654036978157967,5.822854771353847,6.692052641479247,8.980538112369734,7.696464549114561,1.3157471377362429,3.2312061411064863,7.137651639165268,6.161286802313555,6.458622831823675,8.987545116495145,5.038026256750103,9.46572834734356,0.22676029675045228,5.674156098481189,3.6023002962500605,3.5032380543680763,6.980547279783538,1.9098143982169091,6.242643323612915,2.2649566492772966,1.524448981454003,5.572961657327515,4.517092190499563,5.3886438012927425,8.772474932872807,4.529827635860453,5.101311586186943,5.659193197557675,5.909816189373034,1.5001887276388826,9.29763954385397,4.68733711559562,2.9129148808210092,3.6906998408747005,2.588844067187983,6.9813638129503675,0.10861542385631306,9.926979580052912,0.29506374289938186,1.253697938127123,8.09483363661451,5.910725254956382,9.630128549410964,1.7198689765166564,2.7666024641451537,6.531763932163472,6.847286001789077,8.916251246344844,1.3422234337084338,8.340831370269813,7.176463514790907,8.132767368702094,8.640381709640634,2.0726241944568025,0.9574009513081139,7.886096460422516,3.6943232882747834,9.664778502618939,1.5506937393662334,4.5778550715949855,6.848170861217668,2.1203969583511872,9.441146999884761,3.9828293204605103,3.4334948053292647,4.834110121038848,3.236957954988051,6.503425071798395,3.014609618664168,0.016796890425114785,0.790539414201874,4.769666649344229,6.8029074309103805,3.096875195167925,5.264752590038211,8.139608823840735,5.8510997174648,1.1363674209764363,7.507875062246039,3.725616651473931,9.31704019161666,7.038949113658759,6.067281199247107,8.002864870521357,6.112511967246512,8.150093535145583,3.03639042069608,4.322009386336221,5.855135864246819,7.379192760216888,5.0881265871102865,2.5394306108050335,7.572762996022138,9.990230382902293,0.809038887118465,5.2198208976218075,4.260230190242959,9.356791372183595,2.448593840492914,0.23219299950819616,9.54282027775043,5.594904155351759,5.90440841133028,9.156396103115451,4.773744318699052,3.2175429486381435,9.46433768001512,2.2855435281890846,4.917583755870387,8.776846709989492,4.004349835765004,2.888650536820969,1.8407343093577588,2.538854737939642,0.4598298690157909,4.3380772970009325,3.026178312847203,5.776956696797882,4.8315363727146625,2.1390880174871674,1.49836939051198,5.717608127143929,9.74257259476807,3.1530558435315537,1.2203782609775016,8.604429446782982,5.42838682458396,5.864598343801665,0.7211596369894435,4.010692767948052,9.494822422073161,7.382667682758203,5.593999065058495,1.0064860900101236,3.392035324887499,6.91120799657706,8.014403042901854,0.6612077125981175,9.197872264085788,6.231405864122356,8.730321072882468,5.244597409742644,4.548701152668788,7.758359168492039,5.264327420536317,5.48046469740382,5.834753239627495,3.038418124636255,0.5968243072590607,8.889073283782697,1.6097938564007164,0.23332563977651377,5.574029979070465,2.405037630579505,2.457116840919109,5.859098658645358,4.125157204046285,9.55838229925419,2.5484899321372545,1.6108283498178277,7.406835292120264,7.02890262747756,5.64173439920356,6.708561465695513,9.97928976727932,0.42559727507816225,1.8181392418976983,1.837929447967297,1.6547217071816522,0.6988841405298918,6.404411374120813,9.384622212893419,9.028053362384416,2.2343019780975015,7.57217418242907,5.063071982137419,4.513555253535458,5.500476458555861,4.027255786032056,2.917096809423416,8.680216213813289,1.2726287381947876,6.723874476804688,8.336864099984034,4.328771147487944,2.5429509403884865,1.4334859593823701,0.9777810006479504,4.700328322695966,7.3096676415303925,5.053569776994333,9.272082602407075,1.2989467414370792,7.176146555666256,7.30958609075876,3.1666363988245005,0.7782985279303367,8.434103871637209,5.829518898688965,8.702314505962601,2.8542380381513532,1.21027404205994,9.73276306953026,9.97751289997238,7.64716204458683,8.24678754432455,9.53156485542097,2.508243223650699,7.114889319773021,8.808210113091338,9.160122622997651,2.232429732638399,8.960446269085661,7.974110670095957,4.391788119670865,3.7053711521821797,6.6612237072707625,5.7075643116382,6.076479649642401,6.582404827943387,6.231445135820208,2.946376228759451,3.188828343299399,7.337589259590736,0.48092097488439567,7.757502773776497,9.126282855230588,7.055809977055931,6.161898222320971,9.041531487674359,6.392326703096495,9.000172299008653,2.604354128135433,9.914841274825076,1.5604203069519262,9.110126901681907,9.62474474310281,6.669306062601825,2.558034771562747,1.0539502382991195,9.54111873375015,6.746826797327219,9.849214225485333,5.793667181445894,6.403051327447908,3.2633522248906477,2.2862512339708974,4.536690771050362,4.530991553678046,7.725241747667127,2.5216547813669155,0.6613910104049259,0.9059744092832034,0.5009888822307085,0.08418392961492716,5.875022293026236,8.850032019865203,4.128317473511844,6.793662848466717,7.700995494036558,9.624735488749847,1.8560819101451598,2.3049302309198128,5.148123902376405,9.740602437905558,3.3582648666271875,5.672392181849144,6.1877075667225,1.0113698981054609,3.5357393433857487,8.249307915871942,0.8821586798518033,1.9529300846663267,8.22615737454014,9.436776263100366,0.5059987810540667,1.4743612022881813,1.2434436603584587,0.9571236544495565,5.0150078865695935,7.2116661424292205,1.353170679293103,8.958328065891639,1.137697615508173,2.134347982231284,7.479522219983668,1.89224248495651,6.693540805871936,0.6646424838180653,3.0474755070992776,3.4495878387651624,2.838261526129604,5.933512381608548,5.567270926398525,2.3373104670521228,3.748000204368762,5.431914899195842,7.751644105932243,7.50515733170541,4.453181899847509,6.906548177100746,2.4593764083459058,0.7040274291272186,2.837235739776569,2.909052401659822,5.608153886988156,9.170073115453361,9.32145500234886,1.9106019390142959,8.69092395652503,9.755323021431428,7.508212844443967,8.694351512964218,4.974541086260251,3.385946262231263,4.737898625118648,7.629960854382047,9.933118918545409,9.563750731101592,6.535922973000295,1.1536307622988318,9.095500965938077,3.9339402036968507,9.420511173864822,6.0593271578667025,0.715409332141157,7.711714186984273,2.4889495138872997,6.242535865739828,4.492364578923378,3.6419977377957125,0.6204658584123579,0.6680715335394249,0.8574151603875224,8.481329167551886,4.2090390791451,4.096194535451067,7.397109927306906,1.240566153992806,5.090059324286567,0.577205398828724,4.061318149317248,2.690384279792226,6.900313642126776,9.009840842578878,7.271701773570934,5.341929827730498,3.3609553195905195,9.91303250818241,0.6808989102904794,7.947618146991426,1.1739980113133197,0.7095438618872429,1.9712465117704303,5.813766050210698,8.796168624358353,4.482230087354393,3.959837025006563,1.5521594757818935,0.4169983014101142,5.031167868953532,8.362374587087423,1.3198890649403072,8.759082362574514,0.8974430329567484,6.6231934724544805,0.37341039620057526,6.037559123996479,9.840652091235116,3.477186032077473,7.210281224545254,3.516349833867487,7.885414394970267,0.38771324369063276,2.55607557862211,9.888894658588683,4.329865691343637,7.778093369043044,6.845603437022072,8.22034639754162,1.8368122458297975,0.9156248259218858,4.563190335576952,5.10477945912581,3.005495285441817,1.328256194440669,7.715915290197135,7.909279739375494,8.53262436072949,6.789110940530671,0.8191368955706468,6.812427475608962,0.9563334920712596,1.9800439114023893,4.247872463914364,8.89597531933158,2.990195403259428,2.3568148738204497,2.3075587626892213,9.882815949928755,5.402965262557224,5.687369758105987,3.8774019073203125,1.5411460816531353,3.264531900186256,4.635148681618446,4.812748034704633,8.057866009969914,7.629038702640559,1.4247223051533364,9.561996347065797,5.28233286368587,4.31982605879586,7.942233494602937,0.17525070722474556,5.649299891651474,5.734242749007978,4.806805702930137,4.151476163263805,2.6696631408567795,0.9432008991516372,3.400030444780775,9.51361244746806,1.434109093059508,4.027459559279527,9.338766764209321,5.838313035191261,8.718179355970562,4.6331000991947064,0.3614825985511372,1.4616494059760177,0.9369340739548537,9.83050133448543,9.135963960818469,1.1208839416412752,8.530043977581927,0.9246771171694323,1.2727688303750284,1.1869935229883066,7.9111484249047725,8.56221508838644,3.987287328869258,2.4569863933236635,6.2166301908034916,1.0239699106784195,6.591858372892336,1.734699732695315,5.244224453382785,6.496548053347649,6.560092796684184,7.447044282617137,9.817666486605818,2.9049930302771387,5.613096570524183,1.6356628476667323,2.8274955138094615,0.5110388397863863,4.060660199036548,9.558361629888124,9.69692141170885,3.2441547093151923,3.5901815424015937,2.094181677421514,7.557491525860732,0.5519878728259231,5.205409581361151,8.01548220742813,0.5542187023888423,2.029736881118027,9.8796352331026,4.163797215074574,1.5410056426629626,6.931699347304385,2.204756158826162,1.7985454143386281,1.3520149873479492,1.56981963759802,2.7438371661046257,7.972117556011646,0.3026641451298051,1.5188539377255328,0.34380178367015013,8.819331086962299,2.1889411856063012,6.588832596188771,9.344376406360016,8.923986394847693,2.2227747143297405,4.425626321543168,1.6164342769320705,6.168230101746117,3.717405520961634,8.858701396074618,9.926258266301886,0.8223070895104989,9.462031966749409,1.4900190317571393,6.727086599284067,1.909758659685652,4.360386838024784,1.2042316823868848,6.855521108085478,3.879742277278644,4.561798180275911,1.0912822045894766,5.1477861262053715,8.42023956769452,5.166755529351816,4.094455127555115,5.2919446690975525,8.862553249624657,8.084579318695077,5.239850543910194,2.2124325163730396,8.229881149497846,8.72041326382284,6.265194849232907,5.637995049207523,1.5965678047138687,9.04181126552298,1.5285145812004908,3.818841788424572,0.6288413345447696,9.010425831818482,0.6652197570042206,6.8819193033738095,6.749719197338231,5.675498023580983,8.964220120329989,2.9933855500885342,3.6794828509253708,5.103166575272784,3.1198548468839027,0.8348990121383681,7.304516511557402,0.4410158178386525,9.651019857750875,8.04297224832653,3.300991010051366,8.768411118593274,7.425441568443998,0.5736858142454393,3.927696238549876,2.782768908029125,4.922764559746593,3.2199929839820207,7.926732267310108,5.537638311268013,3.954189396046439,5.911852039708858,2.12574297886309,8.559587955366698,4.208385743199705,0.9377036095586644,2.7406354689075663,2.486958131248569,2.390491184598227,7.296475605748087,6.212667110541905,5.564328137207237,8.186894983488479,3.558707080859198,0.9633333329219562,0.0632214139595777,1.8727974104703349,9.25553474670002,9.884358851617632,4.2423147003317325,4.976141009669792,9.309325971783808,5.57285720112219,9.971287995621713,3.579783280323434,4.57118492815505,7.2458518396946765,8.45484566516478,7.428148079001509,0.7051549212414598,1.4591318744088966,6.458817363034761,0.9844547347696264,9.691616185191773,7.590235898124435,5.819385561225358,1.1131306660473816,5.661509797703328,8.9694509883945,4.962328265774715,2.049689446384879,1.31333096695752,9.656231856166702,6.583382561056796,0.7335778457340147,5.803463151076789,8.206300494748191,5.003520378888037,4.331600201728079,3.0172382360318606,1.9605486718538812,0.3930462083585029,2.754139437585308,4.355654950685635,9.33512739837582,2.3678705678949785,9.118060401221646,4.528919169460179,6.842265045168188,9.076974600911212,0.9945514212269013,2.2859389995196167,4.9103764779215116,4.071585158750399,0.15831571853356596,5.888918597921499,3.682330888362455,7.780368725541356,5.545691917056663,6.604250358637593,9.903198944283067,2.691403202843834,4.954638435614818,4.688396755036342,2.8941937817717123,0.047038554948555245,2.620381983847122,0.2427269029901824,1.8251707418969643,6.8125139793668765,3.484053603632582,0.6470608077986428,5.779237737985863,5.5362270096302435,7.466779660148046,4.5800292401543485,5.328811938832132,2.15916546558524,3.720250017707305,4.352719791382538,2.08111559127498,9.6827696218038,9.60139605376825,3.5019713149194365,7.859066654458653,8.687219241622536,8.333573039532132,3.8592747285105933,7.50328006123659,2.9555664721335018,5.66461780092427,8.129039376717586,2.8872286660465463,1.9050947936390972,3.8015328364993484,4.342048156450209,6.687518176815441,2.797027885477692,4.596303017762173,7.021545314941962,2.4633962939160403,8.155898180554441,8.36313927172714,2.4065908934987257,9.681298228166877,5.0238923244422695,1.2101463341971042,3.4514254419664114,2.807628851543429,6.2259775240264,9.589150539390282,5.57959202676593,7.1875785170255435,2.675104059240321,0.46927971217216813,8.71474821834334,3.7992646459916046,6.461287145511159,8.989846611666852,3.3240875113917445,8.403609829960212,8.596199645068177,2.9284042760730844,7.727641516986723,9.679715832728855,7.9387762897611776,6.226815972938875,2.815876979897991,6.00217946043837,2.139979823201197,8.180427243097387,2.1919170253249165,1.8437469505160697,8.04188014138331,1.8555555051431516,0.4264162608416133,4.623891191859039,6.875523747833798,6.487533388546247,0.14159477308933077,5.638563953822436,0.34483363537111344,0.31546071693706157,5.679488071054624,9.14263928389296,2.4043498877352865,1.494857476774265,2.0082191218541734,7.860670993752725,0.8703414490882788,6.056488648870417,5.162173571780741,3.541406584388036,8.849693105693317,4.1964916023486865,9.737577994952789,4.5419442672332195,0.9761260541962513,3.7704971408956944,5.085165126422641,8.19468523764472,6.839656402769691,5.978698342817131,2.4763656297997527,1.8035345525305657,0.3968248882060177,0.5634449016744747,9.554050597356111,0.20769307745225785,7.180283973966057,4.247333191858996,8.2087823186059,1.6827041423330713,0.8017729095644688,5.201842914456638,3.277814616596768,8.740901160479272,7.802070222700063,7.928011974855735,8.993082763184407,8.433994787706014,5.4137287579820725,4.254255483204934,3.2305381939195565,0.8494536850435819,3.849480996349335,9.688348032278968,7.765437279547578,3.309466645687469,5.465929007983439,3.472394483027217,8.318870020463805,9.36182379634326,7.847887264903262,3.431601028555784,8.56450393937655,2.913591738871524,0.06829376563254996,7.6715805016141525,5.965650638400486,6.292589827086652,9.191160963217202,5.933971794582282,8.681079985843397,6.094457042059711,3.2359273669557465,4.190649272045275,0.4896370923212734,3.9817799094930284,1.7093087625153336,9.34597194156704,2.9190179351041,9.416116716297756,3.196629942877074,5.209734519988565,2.2095013206735037,5.690186300718249,4.918213250712582,0.5941521437005837,8.909654419265543,6.7317065449505975,7.727030083228936,3.567667593117261,1.5524435194335506,1.1778796945754455,7.871512489798569,9.83368373056342,4.788696584324763,0.3687697230229525,1.015336386462784,3.563922145384293,4.963121916353526,5.75790129303551,2.061057526281529,6.722145894879574,4.1234631754525015,7.772121728555346,9.31703666375353,9.700945583386494,9.575648293448948,9.924999850918772,4.684249616792711,3.095588422443576,1.7699679342074104,5.272015070378342,6.749287795813979,6.705520230592128,7.753667156056395,6.271916529597014,2.9854888715814876,9.730644099145579,3.89290083306991,8.865402818102336,5.5179651344394625,4.242392769067338,6.841140746728909,9.886021436852284,3.400779340474045,4.3093751431027645,1.3826641988255406,7.00994556188718,0.3326154241262991,5.92196290771936,1.8082572021730514,6.84495564651982,7.738029706893334,6.095372231213998,9.021682787108123,3.2255867649693237,5.350243232115091,2.5817010626687886,4.730448197442456,2.581004772047095,3.7239214821452116,4.6099564378404985,4.067720534354244,3.646439945844895,5.016857957008527,3.771048416610776,1.3814291470440265,5.307952922578291,2.0013978259855203,1.9150951839509545,3.5464161542271544,5.040016787333257,9.654202093606703,5.185196574735258,7.868246282985359,3.6131687035265614,2.5974086947863673],"x":[4.101884711090973,3.982588260904069,4.775489588310814,0.6275848702036235,2.0979077756468123,1.0880154424716926,2.166872652213682,4.717892498720674,4.208546822356503,3.268669505113561,2.3738426946435256,1.0702332887068067,3.539524027787686,3.8167799632523227,2.552949695917044,3.6503850698708296,0.4337811629802457,4.642100850854954,2.1621641164476046,2.3417001750736732,3.9006892446240515,1.7284782669434284,3.377726529262363,4.000970866046087,2.4688326457354934,0.3142624500711344,3.3379868539517954,0.2470882991132317,0.346625321310029,0.9142527999848682,2.6656204656432014,2.1442052342120332,3.6646231510652125,3.6412099389135246,0.8950399627509997,3.9686585968382126,4.993963905221722,3.503394036487857,4.123758295740462,2.37682262742842,3.229718591147628,4.740503090869067,1.6163687390024017,4.172606481830949,2.8230013536078524,0.8739692951398215,1.126411087521575,3.6222204978391104,0.6214935719853731,3.8933990713076705,2.820961336403668,1.962858976372227,1.9257919488160857,1.4819146137837058,2.037128079303121,1.9858862711654934,4.169312880734833,1.9482812261022109,4.21802951725663,2.0764496754789254,4.443511135409612,4.370073511491586,2.3787413245217803,1.4033166894888671,0.6997836160656123,1.8335479858575299,1.0364989660636637,3.634606368442599,2.4357067749980867,2.655059710721911,2.873191743210329,3.820863629336345,4.504924054553606,0.4764550388182687,0.6570022958150112,3.8379804600891845,1.9611190103082388,2.5499822312856555,3.981975648941037,2.8938434703655447,3.5874806842650733,3.5193176373804578,2.588418473797829,1.3477143397623725,4.32382727919637,3.534454158424519,0.6051013515784731,4.558989424528965,1.942705419082309,2.3886426716840417,4.5632639373174975,4.3003792097936415,4.1757232323010545,2.55879704485795,0.420460826067961,0.6860216326666801,1.1155165242818343,2.6921720755232927,2.463056418671501,1.5674059616398595,2.8447131756009183,2.593780843668937,0.2429881385751087,4.299389428489326,2.0248362881399293,0.6947043265074182,3.395949445974443,4.743144390489981,1.1383256844580902,0.08206871099222135,1.9788840481866699,2.624639552437995,4.276566015834407,0.4860996273980456,0.5956139940613803,3.832440507678835,4.500598614802698,3.676026772516453,2.532481001995074,3.5468218952041175,4.420687332787074,2.8102873933926356,3.619141608475821,0.31582565778690785,3.4500770965800607,2.6113046870888637,2.456783597653672,1.664250773599183,3.7282695179578473,3.740751114881994,4.637029204098662,1.6168052800758226,1.3122369743873041,2.37194505457482,0.5698292108611691,4.032165688080375,2.0155529200452627,3.574270219304422,1.9893864699336306,3.6240808201379626,2.1710121527138826,0.564194623062424,0.7486963207614106,2.987341535700958,3.711753106434289,2.4819935793336514,2.539880969762497,3.2366306870385375,2.1855898878893045,1.7818440621725007,2.5946532858899394,4.718763243117287,2.052604288898685,2.389602775652807,0.21151767994527115,2.99009296808183,2.723842365925757,1.5488689593837446,1.2916093603341139,3.1241149646673163,3.5734367059172136,2.7244135438576613,3.2842420008030784,4.524807820066608,1.7331784739149136,2.702067969755506,4.427777411548699,0.9529597318765282,2.528362234114001,0.36592686124120144,4.686370894787944,0.8541932680628428,0.2918342247960093,4.332087350381539,3.257584320922983,2.560008715821911,4.673992036824206,4.143741706114144,1.4333136788999346,2.065907705393596,4.756278419597336,2.7425125134930575,3.687032940017575,0.5872195858626128,4.9657332180213025,2.8942821331982413,0.49163976982749213,3.450449770020916,4.403463974756835,3.172262149799657,3.034734291573268,1.1227667466851965,3.375820684673325,0.06002743638196195,0.34405777409927896,1.146191070836703,1.2112057490306594,1.9160236870092684,3.806525706182483,4.262896264111271,0.9339595486843721,2.514671635346576,1.912994751535142,3.8632278443339074,4.132490745358691,4.723991743342788,2.9406274109789097,1.025217851293353,1.7380738703415033,0.163507525929818,1.1385086910050712,0.08748702489268179,0.1216787466864866,2.7574056139838365,2.690974777571715,3.1367439560738797,3.814595889154968,4.823476074205958,3.6855386571811746,3.0591414189390234,2.9567521193275317,0.4709751939866147,1.394390322603033,4.3356073050418145,0.1602707812758719,2.340197222981868,2.3841640235026484,2.5614932188959227,4.65626502022494,2.845835654887361,4.851145146083918,4.875135857293693,3.940613097653242,3.2762584880487546,1.390096446780268,1.1799075827712302,2.663057175583262,4.210629887806835,2.0196133822152262,3.8560986702561872,4.549874713557317,3.7826644715822932,0.6216427130031676,2.6968152629016853,3.1560500640420983,4.731306906016121,3.035063890641153,4.6406390023718425,2.653128365908193,3.6921162136373065,2.8257070084733704,3.2295647571846064,4.688646791955854,4.993861759090911,4.276929564019712,2.902189020238042,3.1122044574832977,4.607447451878345,1.740423093459662,4.020705048352163,4.312356265791898,3.647401327891331,2.1147172663623492,2.7820757774572415,3.3534736683464095,1.385518849621794,2.4053484321236085,2.3064415703545773,4.403153435439194,2.3601494661283153,3.3168489296012504,1.0838720915683853,4.785617371301418,2.5543130188791965,3.8602916947288723,3.6746972896348176,0.5695503757714526,0.22732700798934635,2.1356114741536425,4.029808288671395,2.164490739563255,1.8950147868049905,1.0081244524000454,3.8544330204782415,1.963306221615384,0.037593917876762584,1.4777883912741974,1.5045464788551222,3.8178015274260755,1.7940556923190487,4.468183813069457,1.3578395518062336,3.764669819308877,0.9694802797046975,0.46930032862687154,2.428256343877594,1.873148962809087,1.3018961436923626,3.9903519502733764,1.7796132337844428,3.2938732507556336,4.498446947553586,1.859248629077379,4.202689929215516,0.02116476603390982,4.343344657259875,3.3767509756157588,1.6309397966952266,2.91837201838225,3.59864300206469,0.27097818291970777,2.0085448605701117,1.3632143502778205,3.3820820942970475,4.189441537291935,4.923090838640948,2.6638894079014594,0.46909327812779567,4.042531610324989,2.9869426100726635,3.2863089458497106,2.2282646724011723,1.4306275882410935,4.6768107372408005,1.4624497911881051,1.1904928935341885,2.250475119543517,2.0552828127760026,1.6420436284150342,0.5054614964138837,2.7992322994563104,1.400498699597873,3.88147686083971,0.12831540633185923,3.2086208261420115,0.2596184358659692,4.3497012865668445,2.182242887805007,0.7812898459525608,2.839044439174793,0.4425374795025627,3.3392955535179993,1.0079074386908304,0.6164146098517842,1.5352354536658552,4.516709829328585,3.2232273319847318,3.853312744857634,2.714802411924513,1.510941040476801,3.3055009519463727,1.4192797866964024,2.7964032629054025,0.46728450358224816,0.43575167778756807,1.1581786471726863,0.8077435251480369,1.600675906400989,0.35696068357657706,3.7181856862094187,2.401929281434997,2.153547242209437,0.1743093367517079,1.937947563800646,3.513334831265029,4.4846344481582605,3.317729511164763,2.51916463482699,0.05292981637981975,4.91269239926964,0.02773336809329008,1.347307324725372,2.491005843541946,3.7307026803543044,2.8624776236683838,3.9684512939969387,1.3331757206562977,3.709275969287157,3.8802934838238423,4.887991882294297,3.320821909683752,0.13518132924873916,1.702354324109926,1.6780391918772897,2.268148117057429,1.5043477594124222,3.74336972060222,2.4547876790891476,3.308804896383263,1.2297425687090446,1.8301927257271033,2.520146229323501,1.7713482550714232,4.282538259455052,3.2801614547011892,0.20233717407190266,1.1542461958897166,4.638141947664806,1.362789398468034,3.9498379427262864,4.233460155402736,2.46773052839922,0.5767740113128583,0.6484508499771247,3.3206996187459814,4.383112969150923,1.1625981277267494,3.8522300742168305,3.76227075738098,0.6683210813360663,2.0765968480137875,2.6290852505236684,0.5980705946676057,4.314071489244035,3.1127076796684996,0.19782614075184113,2.4170145296221435,0.6100848428714822,1.2182334265839334,2.12508212646478,2.499102727642449,4.0794488790378045,1.6215828466651538,1.7495903110541133,4.311248436376486,3.678077508162593,4.518110667219234,2.195092850473559,1.0998222011718861,0.6020877690535031,0.27454349949344703,2.310872701844806,4.738460703826224,4.263377545068154,1.1044913953821522,1.0769868433608487,0.2358498319573843,0.6942481565216974,4.390395182003815,1.3267077919828008,1.2936991303160006,2.655637535393244,3.0823458923622593,1.1785035225251106,2.529901940930386,0.18023848314250301,4.762433559106299,4.687811830913856,1.8344848918563417,1.7608180751376745,4.277772622463565,4.62845826826292,0.7835290411070905,2.538292381307091,2.122668069040816,3.7190875819263636,2.313153617081335,1.2240065320629034,1.0892244920543415,1.920874595790727,0.9972339632807281,3.748489246046973,1.093638762631285,3.725706750607868,2.0555913736721223,4.610606836529501,0.1249304125169981,1.9978617606672389,1.4887926677629104,0.5964403410363306,3.2900561207621015,1.3386511158354142,4.260126315801393,3.7265050250308063,1.0995265777187946,1.9552348133758868,4.867124762430233,3.084519942469247,2.40443060715,4.096962280977864,3.3846598235771372,2.4388302597057008,2.3593332707575665,0.713841276158893,3.3951360740603165,3.5826150269911006,3.2997368310166686,1.3747056238559374,3.348313946552275,0.8980254134680488,4.662577546732968,0.16783196051253668,4.7927732224248185,3.7917975072978005,4.766869197983637,1.170913120937711,1.7663464189960587,3.582283523572285,0.6014847288697189,0.20156950977899823,0.04451630712213994,0.529663102477671,2.741814334066419,1.9086048065087036,1.9049939263393412,2.9385583482155617,1.0078565678589246,4.589778339984313,2.1079493491040457,4.394661096281057,2.070480089681437,1.0598319234455278,4.968354941891234,3.8790524372907087,2.571327534865974,2.0470734171002594,3.566525651263283,0.13662929656219736,3.2483665192844025,1.6663869480069382,4.303864986294954,1.5370414708573432,0.27565949483315255,2.4644890570063427,0.4874185660781094,0.4087446949611362,4.761314204287693,2.538146291432748,2.6916261704445077,0.9048629677604636,3.5503723977788795,1.9104916943643269,1.3719170456069063,0.7392364160830811,1.3297319805164365,4.117723813047568,1.6810406043860682,1.6930983299197666,4.46952688722562,3.6828491159787036,4.787071642003646,1.6219494962160275,3.390041611493756,0.5222834576519864,1.0977063632934625,0.35849491785170273,3.583670222921931,0.6455735354451286,4.157064068601982,4.169896637818327,2.054619957769235,1.6341345407770913,2.044611802109598,3.9034824497900997,1.7782032590787356,0.4323704766915737,2.2064445397452137,3.144812281290652,0.683834045141114,2.4197154478654226,4.094855476991811,2.46720354733771,2.554111714257108,4.881196289986485,2.8332730691756325,1.65253812597434,3.327610991905771,2.228176626697352,1.1850173404183262,1.4872649654720582,0.04582737202520559,4.361991308897829,2.998209090644811,1.6674602323641152,1.0182112526075149,1.9172094468763967,3.655617446583358,0.4675700541552219,2.3012280364684488,4.847285052391859,3.328805191081856,1.583307984421618,1.782509948414981,2.2434375912649362,4.604202820962341,0.8720726844217619,0.2078147255591023,0.18197879580688192,0.20185776180280168,4.303903051795047,4.777143354245182,4.059801365265932,4.048947623483769,2.140561740657035,1.5373681683547313,4.315461099106098,0.11767489710787116,2.5083858950120144,1.4621653385250832,1.9232703456771927,1.0122412343846676,0.02006715130729475,2.7772245978829857,3.1003806624533468,3.89445286005899,4.778871001360696,3.4622660539694428,4.694187532951658,3.405350468979318,0.46538933690964734,0.9633493372796997,1.56128041319739,0.18419348817461878,4.475908640278231,0.3835018664792156,1.0792164126533599,1.1311403058276426,2.8956152048433417,1.0633541318953743,3.6048266145537387,3.160572849851765,4.424266546161099,3.0292913161463275,1.9680893451836068,2.1045933688662686,0.12050754298441935,2.782686931718713,1.0149664196089092,1.656772538340825,2.9004386228216705,3.0532753674170463,4.113573898574469,1.5616232295587817,4.6229489358734,2.8527513729468037,0.048605236830434606,3.805607661970103,2.53788708451969,2.7551314573631602,4.146493558515387,0.61467408465533,0.3704350844049109,4.092783127291661,2.989206383745524,0.5794467948694249,3.698868263131656,4.020140780866678,1.3846317016163356,4.061620010854382,4.113603578629183,4.977291272449381,2.672674575840237,3.9674147366227985,2.111531209137165,4.374602822923961,0.20139049948856846,2.6199795608324616,4.1307839531127435,4.740197542414038,3.656960655723711,3.5750040248875123,1.8610747395640637,4.4567024173222025,1.4758690305385258,4.905566235871782,0.4023855686219413,4.955656124510201,2.4581417558717247,4.996873350957625,3.2010759540859004,1.5595374659125827,2.105499655941061,1.236820984511483,2.079121120945715,1.613588479946364,1.0517334857243077,3.4493705679312168,3.392359064291356,4.939833739332454,2.3814021241129812,1.6382151667767653,2.525065345340903,3.3628632498620528,1.5091118608160725,1.305038185592744,4.210747408029084,0.998284426385535,4.190615645857168,1.1708802271977092,3.2906967115588683,2.7337465615476644,1.899846629606411,0.909091206889483,0.7450335502371241,3.723458278680767,0.539715479749554,1.8661730363189133,4.7174601564699,0.3348607843540774,1.7667724339730617,3.3383447519586062,1.8418509523669246,0.5662721119956737,3.4496251340377224,4.1460575146218375,4.371284491216489,2.081051911609908,2.0285905383617173,1.0738973444279498,4.630387850751777,0.9503673143436864,0.7308473077124089,0.8720741485386885,1.3309122320645994,4.568256079826912,1.571570191386984,1.71777956717157,4.180127856390695,1.1797379156913745,3.3573566963630053,0.35057877403333215,3.4525332932292363,0.5977240356034685,3.4940073152687843,1.9469235948741792,3.027409428622261,0.7479372614643143,0.10575024595435134,0.16895624058305692,1.642518877044965,1.2654622214146771,1.0370705282453274,2.695754289523661,2.9947755169141743,2.481561253497725,4.170725468571618,4.429594255577237,4.677382946632336,2.6316653849489438,0.9046290217062247,1.1689798706683274,2.14423368610794,4.921619710169085,4.111997547849388,4.7688993026761555,1.349365635861134,4.225919303467636,3.8907601184972385,4.249765751766999,2.7548017910518463,3.423769483877792,0.6537696750807709,2.7851434593719473,4.988591449457647,4.002027506803203,1.0380148836332714,4.361057945120683,3.6758517293938064,3.3422149271480404,0.7307528222830328,4.233484471345388,3.491091647942529,4.078238770159782,1.6132113526194658,1.0977056254082385,0.8424196071295198,0.5434718397795246,4.994466122174886,0.013976619448723415,4.994707334932073,1.9247015108201315,0.810070846437817,3.7320303128006804,1.0797932815267786,4.566311523591381,2.979493825191696,0.22496479205649123,1.9814267010287034,1.5134525016047418,2.6994929900994844,4.0964253650489235,3.1529263680350175,1.3503523156414876,0.06666361747582505,2.9344352745552293,2.4871376265087006,3.7288403424280556,4.464441186307319,2.766184446234472,0.6148548726732117,4.656245855934941,0.9530990276765505,4.266087683926755,0.6358687987147849,3.3627168693594345,4.705082552592053,3.3382388421434364,2.3845964020012103,3.693926030175602,3.217423936192799,3.1471524293064723,1.7058453096715032,3.768192902709827,1.9901014320535093,3.3645514068473705,0.9294284493682559,3.489285701439636,1.1063313188724322,4.771291328221862,0.2788902024646367,3.580222971171667,2.755071838872769,1.444147180399511,1.3528391675952622,2.136636905257875,2.2833260378174094,0.842695195999984,2.3092125439416034,3.8077496457269797,2.9469397030397038,3.0347556482708136,2.34185979852666,1.399547406685443,1.0831522947428984,1.3842221193033177,3.6692761395551345,2.134715479442042,2.615395576373334,1.5671248547604633,1.342161584017364,1.5233109192813332,3.976910154398412,4.270115428438421,3.007375610321824,0.9852217648983241,0.15606898499084365,1.8814824311852796,0.20018188601593212,3.5190238338206448,4.722050732479417,2.057491701598738,0.8667862600539689,0.18245352166747053,3.5467397077002194,4.832770998590292,3.8134608265374323,4.27544654466694,4.394789166789961,2.0025078543446915,0.568153401004099,2.468689429860947,1.5182458623083828,0.45418464452720575,4.434446112043126,0.06119266876068563,0.4514757814229575,1.0278327646053742,0.4168865192813631,1.0073869209796416,3.178969298769414,3.721664356518043,4.427128484307616,1.189356624914375,3.38367981556035,4.229990409415331,1.2769362007868879,1.4906003292309167,2.188443131103882,4.156921912317587,0.24192490602051642,2.8824190980628783,2.138428107953476,3.753641801431372,0.399624423976217,0.18791379250540974,0.38634442271658687,4.693955263960885,1.5640032362989442,1.3082820072247459,3.8519018740664324,0.976658352021248,4.883623939498998,0.9236836639661195,4.523624789949547,2.676943751394334,3.889094451899222,0.9843625240702814,3.8506677677813093,4.271980787051859,3.779824629331511,2.632012230587284,2.1256817151047125,2.279587877656658,3.378318993709665,0.47215529197264683,3.5850937825948472,1.9887137274307987,0.6135766766071205,1.1835672962996702,0.0982757467614237,0.23282395138598866,4.40268315866167,4.907201054473839,0.6857739109628236,2.257213293720527,3.877264088643111,3.3893908646067517,4.071232716549532,0.23979392782359388,1.9041874542399517,0.5001322496376881,2.673487454139395,3.9463149917029705,0.7561212724333599,0.31634385867635784,1.1948379570638956,3.691368002490906,0.3527393189034578,4.988042683213594,1.5396346589340737,4.566376683310169,2.7687983438226493,2.7982659620254924,0.7513491271707173,3.58542172244856,1.0530280143240645,4.875039229142112,4.351877190393772,3.8799205994028396,2.1573842132688457,0.22925399802241508,2.453095915716675,0.3915107906173665,0.14451745549812767,1.595931746398882,3.6136297946979603,4.873102526622716,2.8553585852530103,2.4436194208833353,2.895327070890361,0.5596409986852868,4.734094915295529,4.032020953413539,1.0967024970477568,4.850410251405222,2.541799568309304,0.941742450787304,1.706655132132372,2.5188284664969354,3.242356819770398,1.3260263076808698,1.6070242705739723,2.6241544837425423,4.500249148713471,3.641078365902457,3.5971435821565056,2.1206738568469907,0.9200902517205756,1.2822211141559237,0.8013898178282663,2.8414313860273186,2.6154717401476457,4.863775153153788,1.7710544724759303,0.3760631137668258,3.391736962463364,1.8892513226113727,4.872578761683445,3.1123311764197883,4.152748860605575,0.0159263242449037,2.9836318769112724,4.830853632155318,4.571857055607139,1.7066942218584413,3.0416850808476137,1.850083810047366,1.950543742696036,0.9402946305881565,0.6859807713822708,0.04016592786588724,4.748599596563805,4.123680829053341,4.17554808781998,0.13062435417159013,0.1585880061543432,0.5016263046459846,0.2045480767715535,0.06159924521224713,3.2502179908018904,2.647612938954534,0.2251685618022503,1.2912953205881117,2.4201759192306858,4.04659234321465,1.3561204625695322,1.7924980489895115,4.700905555902894,2.1546707218513337,0.053584591995755604],"beta":[12.597038772747101,19.74006250483525,16.865304424479326,11.212036894353307,10.373176370894539,16.411489895885204,14.20892595387447,12.449624013779621,10.990824355018432,13.430530308314657,14.476086313788363,14.711975744871115,19.67142105446697,17.519523785395705,12.599937865433438,13.619646317397544,14.844463626295708,12.607439302125806,11.756145548962007,18.49146853259628,17.185628532401243,14.472058826882815,13.527833692526453,11.03375257120714,15.562488189946745,10.562420866186264,10.582623663836667,15.645496469555138,17.065254227781292,16.142902042331702,16.547739101723213,14.84296045140399,10.445206087997995,13.228070880157336,10.63386975949291,19.36042107474711,19.695337307715093,11.946338066715633,10.535817866760137,11.237275735958054,16.670999523916805,12.900175625242367,15.695381004132248,13.74440334183043,19.571660322090704,19.60707747930456,11.409807629599321,14.374962155939796,17.053148042769706,11.659058499300434,14.254796926073471,15.792338007123332,14.167621160654642,14.60589005397999,19.81915087065237,13.303852856294103,15.230232290268015,11.469616726827933,18.058991682414693,17.139199645016387,15.593211777682733,13.133239105334207,16.719916897237297,12.248242563327203,10.925692977643642,15.939252353031826,14.692632869525022,16.240061838639363,12.875044537732471,18.340430125922666,18.926916889121287,17.96937793337641,19.379198220700808,14.953764419022008,14.655720739660056,16.423753255580316,10.329534847444355,14.341235345031752,13.161209989533578,10.068195351240535,18.8919112068861,15.226629949216612,12.168720472416101,15.597026225717938,15.21860461283387,19.257359628636593,11.437849499024562,14.742858155652206,16.128382035056234,15.41707519701325,15.713372512581707,17.63767735421166,12.14846435589466,14.105686164452395,12.66280845612204,15.216134532519387,19.47324302946968,18.59758577074616,16.645646560561993,17.310616376688095,12.464120010510321,16.21668619597551,11.116446685993873,15.62733257596561,16.707275443660187,10.074473754101746,12.591638051663747,12.155346626133081,15.44984927081503,11.799480109826172,14.896201399036759,19.01823193705181,10.569109976738659,17.605367661143518,16.514350875833596,16.960158739434057,11.923390375172197,19.257931312007553,16.087179773231043,14.648240745944845,16.903353767603136,18.050761068137987,18.42972359304583,18.548318226293294,13.961287766586581,12.409014477494157,16.847061221901107,17.774736899417366,11.4903548061858,16.501974863364705,15.200390354885268,17.872754364227795,14.471023665610245,10.926779344770136,19.775505429052437,13.795015684499736,14.163373356376272,19.238983035386607,17.24598962165996,10.90993361317155,12.664780332176065,14.86991047977796,10.562753413547217,11.082829289644739,17.527794088216645,19.88532470547568,16.070292964406384,19.775527315362805,19.146849495265784,14.287218089643751,17.883984520631998,10.72838568116114,10.58121950027996,13.694077079343508,17.03295777600711,10.571646051441896,15.665578676562326,10.261907132712194,17.204023971852322,13.855631045079688,14.957944948685881,17.659715558948303,11.446566809090042,16.98111008688432,17.84844817726992,15.28626930174845,16.00137989633129,11.07202332621611,19.66998607274322,12.990410578409078,12.165015812715199,19.283869294856732,19.406093673823683,14.934336897164577,10.152125847210398,15.190892461533704,19.410665218716403,15.514099747662941,15.658565886345306,16.801888441460143,11.215103214096407,19.078304585338834,15.616430425713222,12.923562978020506,12.859704664462456,13.467277552053979,18.748003180461517,12.934923791701728,11.628715466353253,19.54429911084139,12.22876939679573,17.30469810391167,19.26685904841832,12.884438459515144,16.113397712550302,15.19786663456185,18.3206039013103,19.492877153444887,19.30860788047987,13.030606364648571,11.408463080531748,16.68065001116414,12.580117329973366,19.82091080142594,13.255560865390015,11.943903118706356,16.229692862105736,14.523101375832152,11.952710852584671,15.934873827481189,18.605305112476646,11.880850215125093,18.20783351478586,17.80995866350908,17.82325293630369,19.68771432486746,12.511847800612404,10.40131035983219,13.251588960809094,12.441098174441505,16.78704810822463,12.258239849260658,19.729918108562856,14.672018565732966,15.533821038152878,16.831006960786432,14.340958987314238,15.479647747105474,19.273139884645094,16.80182165472488,12.370155258770069,19.231447521899227,17.319881156641532,11.118585875167625,12.596616265492926,12.92323032872746,10.12927434446758,19.096038106117533,14.341114291720727,12.369714812081478,16.191966587540403,10.658985550436862,11.844388013758467,11.271919404224231,13.917398674385694,16.50796862144935,10.503483965428028,13.370933537960688,17.623895000548025,18.514802646948763,10.90132368323287,13.577792549666972,11.430100954448594,12.445209397333874,19.786199960278417,17.666443886253926,11.095820543048829,19.432653365283215,15.080706257967849,12.364867704156488,10.54783998629879,19.761465467720726,19.365049841070114,16.24356623028262,12.604956697555586,12.813984974647495,11.005830478648274,18.37558381772522,13.161789451226918,16.76237667876255,14.795118741483792,15.329692277282653,13.195076502906014,18.650115237249167,18.546098216985033,17.94247296229123,17.521094138943848,14.306948783697086,18.8941038966287,11.310481924540873,18.657503417500756,19.795827910196195,19.9065417605318,14.86656415669977,15.673213875733392,18.886807956028886,19.433490990084444,14.747078395340196,15.87355305033692,19.97203694136258,14.61434800819011,12.335148549923149,15.787465930572047,11.108361906083879,11.940453432224679,15.83238709005088,13.078287388530374,14.354674658187118,19.41042912273462,17.12783476363196,14.406443988296251,11.424381710677725,11.233621297996786,19.048063160307233,13.383302419814916,16.46883247173476,15.885932325496668,17.749848922096046,11.267698218821655,13.418464495246212,11.164286571192006,14.448534530992294,13.414331401325732,14.654216061527496,14.219257818873583,18.35626146842973,12.71359896415052,14.321183161210108,19.023024047385373,11.639340423256515,12.7212147607123,12.170078404031813,16.56681337474313,19.47702262278141,10.428099254979905,15.899964535815405,19.697640015279475,10.374312621405888,13.081760873455151,15.677469322141102,16.294663267626838,18.93544498234892,16.597566289307444,16.648600217389056,14.9397385272787,18.916368488307388,11.349903293848824,17.567887641006543,16.276020861126703,10.954232488908753,13.177433806118806,11.014970763154963,18.049804045499936,11.593786362770919,12.693577693938112,18.53199235669207,10.365021889669938,10.63796352105678,11.627854325725863,12.828517203457288,18.248935539169814,10.297084161355992,18.7740198714834,18.132932933810533,17.74854014496367,10.606111693564458,15.815296544369035,15.489313250595988,17.683636755865944,15.258629710119795,15.52862924036896,11.243062897738058,14.633156928862077,10.368882553992414,19.484388848620238,12.962994954055718,15.735924362475869,17.977577259865853,12.427008960899549,15.476557394161741,11.40480136638563,18.940427120604397,14.877839872251082,12.696060432807226,15.997805921475642,12.502435615913093,10.268451691802047,19.177717576593487,18.95859254188573,12.625881779954184,19.819888950283328,11.86476905029027,12.169931385639583,19.123286411991174,13.343485873202546,19.55169892157263,17.224953862642455,10.406536087684586,19.393758145623,17.937709034403024,13.038941253154189,13.300011034489428,13.29926160495759,11.935874913706837,13.359191117494545,13.003892792093792,15.374633184382338,11.976165136812025,10.783375128286059,15.586589851388354,12.295245596091334,14.009140272031944,11.987963112969455,17.786519012780246,17.311599275553007,18.56513081464371,13.929916913794305,13.095084588020253,11.406672207856117,15.98642264655405,11.889074158422257,17.173831407201163,16.586744541835756,19.68644072392456,10.909020564635728,10.635519614474688,16.540871698657917,13.929823395978708,11.256088180346715,17.33564994273369,19.886232468091453,13.084056565974047,18.53452351546126,14.089846068305471,13.000450877147152,12.950733811761111,17.952177498965774,15.556718234237872,16.326407713320812,14.937947343359657,14.641671132125039,16.128751112136484,17.90415648869761,18.50920347287874,17.27512600701162,14.638795062274921,16.7632291989694,10.724359190538319,14.25163558961221,17.85955356423809,15.226426909865369,18.47510868524607,11.600508854061582,11.57229113876091,15.446105225797735,19.8678311508768,12.235153857337934,18.051295406377555,16.092440835581563,17.994154590125024,16.454121952838946,19.649505622611805,12.729742799252627,19.755475962797636,11.151391017842226,16.55404760182126,10.194038984199098,19.431071932470626,18.483553564593453,18.117955150246324,17.504600583908527,18.347318974210335,18.425516998450586,18.032570994710333,13.773972189977993,13.841667064308789,19.022657596846187,16.489661912314915,19.055888544546136,19.53311888657906,10.562816928582006,11.725354775590404,11.720351587158335,10.67141423869608,16.773991326601127,16.945204666939166,12.697527141972703,18.533501076112817,10.404155557809098,11.009283107456515,10.721290480947799,19.266886324897186,12.104188724643812,18.04553984285524,13.748028205619311,12.962902221779451,10.890677414069835,19.09103667268296,10.519338482277636,13.431088145086791,10.406703813833806,14.143094200827003,12.013049796816397,11.731507315677273,13.133395097302296,18.78397681376672,12.627863393515,10.444632095060008,11.829585795592344,15.822645134799604,17.640974986129983,10.742167996801548,11.176732532108657,11.561309554015548,19.736985622771833,12.544527626297183,11.912342386881607,14.220366125625105,10.086770542904652,15.354307719100436,10.780647897131432,13.679008198982526,11.982322804575237,15.732283471250856,15.386049740877084,13.42224087840936,10.728228588263175,11.728752738514531,14.690795716697378,12.762173202371628,17.241641353716872,13.269970776723758,13.553266896240698,16.6661288235911,12.421958944041545,19.494098142572504,12.755279411728434,17.497401049856816,10.03076869973228,13.971344042275938,12.181164453648847,19.26229046931815,19.731706657268084,12.337667433696014,18.329625199748886,12.885471222813866,18.01297554310035,15.203344761932753,17.048164552111288,13.473457153268516,12.199249036239229,11.141618808582756,17.6438473701655,14.65761670029509,14.137686335577593,11.815562116963779,17.300705980068678,17.786738453175644,14.121901224772053,17.205099617040187,15.786694231371394,10.953903662743013,13.645740299359726,19.096057072565735,10.427059931669316,19.01052091614972,18.342894324478248,18.508884667126722,12.732915574607171,11.792913611904057,18.130606557723333,19.48285780827245,13.794230886284298,12.03459928269955,10.687851426226691,10.367691120132784,10.047977403153572,13.274930612015082,19.571757559783826,16.209763501751215,13.83332921173169,13.351441001275123,18.50485036179426,10.822806467566071,19.76521686008798,13.843193747135178,19.865466077135135,14.310937743519336,15.73761588820078,16.602031861262464,19.979707964042667,11.609506507664722,14.850159181307252,12.182985515113543,15.246714458826622,12.59832410073447,13.083422142139426,16.55572822195893,19.56503150519698,10.084532674025002,15.36873308231927,15.324841460626065,12.221524962201757,16.3142035803293,13.8704604720407,19.76812408934326,10.895717818586018,13.010091261329128,14.21252146220845,16.018909658015087,12.093722274180385,18.804954257866267,17.526379394333535,13.160539857271798,16.00766694871178,16.304243896166227,11.698709524258694,13.364920031296897,13.245828212903207,12.476801902272408,14.639464523244715,12.37572267327057,16.15648653089363,14.354960726576136,14.319758357033521,13.45576942934763,10.548966882927346,12.897685183943947,15.145101275927553,11.41909653581633,17.491330752971923,13.512505962455117,16.323866849229567,19.924794006994667,11.38886679029559,17.194318677694795,19.352719997166872,14.847719250025502,15.31556517566975,12.058406676848854,14.457425575770252,13.43061109305604,14.262725170788578,10.495389590220697,18.03790774887338,15.415065639198628,18.674166095287614,18.755558230622604,17.507560951022953,13.837522219265072,17.685031922061487,15.482551806686963,13.748238985644164,15.01918330890942,11.351776354698186,15.501750094200872,14.35461210739549,10.198147958502055,10.015853140812101,15.837032189127418,13.850139753024962,13.044029353047693,13.923319900204714,10.050383881740409,18.643289754435248,18.030438415954144,10.616041176195758,18.353633508695285,13.998451283985226,14.622252110567743,15.016886088502911,19.196108911705647,13.03809494870978,19.149877485674768,15.786308926043887,17.72138762667553,17.56726511207669,10.486007658018785,11.715354974150838,11.113766192092257,18.957666090602856,13.274537704135735,19.3017775124515,16.204768097600002,12.178451487353165,14.67571354401622,13.680420298356529,18.35725580075725,11.358216757690533,19.805643605054893,13.927508668244615,19.858295043604272,19.222459209206235,18.237898455510404,14.564032146625044,15.586437455351717,15.61440584102379,18.68041561024546,19.516145893385623,12.593797563556237,10.825459836448978,17.921662323364572,13.0591339179609,19.46557800911833,15.329121183599057,13.870563154663358,16.892606802597214,12.25761086740878,19.55618813306352,18.653851955703782,19.86778165560719,17.194454651090105,14.734567627665623,17.272137555753226,19.883083608496506,18.21850926067755,10.667173353891313,13.808534346576495,13.480291522574293,16.686127967675937,13.281740355741672,16.89817829101078,15.836663299000062,15.19351108278152,14.293752271522425,11.828806274547524,18.516003855539637,11.386496066661753,12.262589179685166,15.524642410578487,15.42271186177838,16.494965960632864,15.677751274238643,19.701370131914054,11.474048164252753,16.661839296853252,17.942528470482053,17.535932089577273,17.525600694773964,11.799815261707046,10.107760596993693,17.548005746492684,16.564581771423732,16.427795883610738,18.81938782414765,14.929831937539955,17.353702454528054,19.439384794723644,13.94045106594217,16.533037879663787,11.028593947572364,14.993192836121054,17.3550027645012,19.892585847095166,18.404228460537624,17.153768294179052,17.563362131723245,14.449812423186883,16.994066207772402,11.427860830808577,16.36513635350574,16.143826498079882,10.92513241029178,19.18912135578933,18.688311019187992,16.68538714178547,15.809633885854952,11.751970438451615,16.39832178499542,10.049030812051093,17.79178605490695,13.795886336933563,13.701046131826526,18.159115205284984,10.630000352461286,12.149892177775586,15.579178274666896,11.304160919217306,13.99192873710402,17.242848013076685,13.761926878472314,19.781091596620264,19.255132446760914,10.564255395580087,12.758519440244026,14.033855481237971,11.96225010813507,12.255737294599014,10.256001037088767,19.356803437696534,15.77710210314878,12.667363174579542,17.327726235614662,15.761184554950493,12.695328243567891,18.30620862793907,17.03997896627532,19.740724817217572,14.388297099659544,14.774657646171788,14.139213065549223,16.880417416558615,13.910401815090427,16.62018428075126,17.390778446563573,12.667162843934243,15.83378652197573,15.53654636749905,15.130374727453022,13.077055015390847,10.342772218209042,14.22723495370126,16.95354446650623,16.1001262148515,13.974616778959156,10.067532987659074,17.90250763933436,17.65927280509424,15.887798705285723,18.7401991269288,18.40227538658077,13.111868930651509,17.95827496091335,12.673696456181244,18.998107804627075,15.446176600021474,15.155830423151286,17.813556156266095,14.141301092027842,11.192288412397044,16.607439551759942,11.66073617535994,18.043534810639617,16.184362229007682,12.015463739014727,13.918646404484456,19.2802284572769,19.61314331312333,12.626830119764605,11.126873179083335,16.150867111909314,18.528859669336597,19.298013937723212,11.617056289880455,14.094017997238895,10.421835380928254,18.05723964062608,17.14087603138752,15.817971183777699,16.124394690787696,18.17850980876066,12.230869657406437,18.73099597394443,10.304549418194899,16.018787135353605,13.747646464073227,12.740103634929001,16.174778866725493,13.233247144270923,18.53633162333496,16.629875848630252,18.548703044966675,16.494687116982043,17.133977229113803,17.278455825044105,10.737751796721835,17.921549709421505,14.17086357706745,15.416962618240168,17.698993307657176,10.461628166754322,13.244225460111814,16.563467052689294,14.01791209350022,18.01080989238636,15.392266604099964,11.545215583755205,19.603702324874256,18.345809786451497,14.553355094290714,14.322977069498638,19.486861559254915,14.237948429444156,13.111235346717663,12.890854359942438,14.959801999774104,15.656589682383913,18.520654976698125,15.40595808254761,13.135463954726552,12.499106392044514,13.255302226252121,12.904326420132366,11.346456957513578,15.10780010228711,18.72182526731111,19.250064607166973,15.395094017674998,11.585751973248248,19.194827452299755,18.100607380107412,13.278681811899514,12.176300820503496,18.642899629388765,19.772583027434273,19.859754126982846,15.7186327742647,19.31306630587991,15.351669799149105,17.46451214000534,16.069576965232404,10.354487498775562,15.659703084629388,16.754018677016333,15.482405778335707,17.881710326378283,11.328577186365468,10.687194305003668,12.541997908643685,15.444607320749054,19.4320012871271,15.140085174251519,15.788547214651716,11.357941474052932,14.934364984606095,15.476451656301894,19.106273320904638,18.464745176910355,18.73963853300553,19.85923620487543,18.651320901783016,17.6493303489746,14.544945033487334,17.045305593691484,18.06131699111213,10.710684281026666,15.002922334428874,15.114012414424465,12.910226790102579,13.926028840497231,11.487591852725135,11.12287501559395,18.90742621857452,17.477424440343533,17.506620027051426,15.56817722920597,10.852434261224177,12.739465520647,17.22308287126497,17.22008919338502,17.154794622044296,10.734412964121718,17.56942375636409,15.127127665597275,12.662836910813684,14.433857733479156,15.164130211311518,19.402807695026773,18.33587130720904,17.29394834656599,17.524953175733643,13.600793375217144,14.095004921622067,16.534214592480616,10.568080467559982,17.691396078696712,12.745575126940787,14.285215721980155,13.539647756213586,16.28827786146314,11.802663777348855,19.13923192263855,18.251523832632266,11.52656554919967,15.412497928882763,17.553440446428706,15.15141416327079,11.536935632682129,14.520651853156043,14.186434855101817,11.201808410679428,18.294551758150455,10.034416461901788,10.355816960642057,18.8433016722236,15.030607502386797,18.396750390778323,12.373812574367225,12.75701620502565,15.175659565626043,10.478724103784177,15.411764918644016,11.135904823956654,18.447396724808275,18.541612037279133,15.922858173510189,16.73150178777343,13.711315587409278,10.382402480302401,11.286331924938862,10.870313643286702,19.343002229490672,16.160327762583165,16.883191405125448,19.681615077735387,16.988379749294403,12.878405702490985,16.43924897488077,17.541129832252018,10.731021083930061]}
},{}],30:[function(require,module,exports){
module.exports={"expected":[-2.1353207548124384,-3.225597967573286,-5.694389536582939,-4.654509326979774,-15.34088068795053,-7.2936218766846,-1.5120922765793865,-3.88758751882097,-6.2220052407941715,-4.295447606541424,-6.005164724634836,-3.4097792169195547,-15.81041235200776,-5.236416587163547,-1.5615925395643062,-0.7068568653864802,-10.093554623035502,-3.4709007953565116,-5.393390159939003,-5.6342601960785625,-3.068403484113098,-0.6941972323589625,-1.3473515501147646,-6.572463868392861,-14.85130522526178,-29.535063129589144,-1.3328212968826703,-1.2730561953586932,-4.8094013380367855,-2.7964597696100166,-1.0460060753056337,-15.541750003852155,-0.3768437393474815,-0.9584078736543244,-2.932898632811111,-19.157574693622916,-20.949723502830285,-4.066322208417663,-4.015692715526084,-36.163706604287235,-2.2004314285729594,-26.265895348607277,-2.2622503510694467,-19.625474781435656,-0.5467158379669534,-6.2546345420325755,-2.553730204476787,-15.489375288272983,-4.564587072956431,-6.76942969482172,-30.239882918701795,-7.747921887702099,-0.2718437844915802,-0.3874998674314163,-11.257842929158466,-6.40841412086364,-1.5064295265725307,-4.014975574295969,-1.1176422193674271,-7.419393810281563,-5.5461929128282295,-1.739323959949387,-15.506936773017102,-6.20623084147126,-33.90113484509288,-8.86105488556821,-10.759122978675338,-45.66434086577518,-3.066493876349982,-3.5259678100245777,-0.8199369547226958,-36.38521050377087,-8.104143298786724,-2.9551145688191016,-6.035838837324391,-16.831249335472776,-0.7877511771846297,-56.484610367204084,-6.174480580496812,-2.737071448631165,-16.137139361149952,-1.072626010279052,-26.641234416065437,-64.7306085477267,-3.024923286333709,-5.202041525455055,-13.541697968869675,-1.509127079047886,-2.4589990231308008,-53.78215615954878,-2.2520099463911176,-15.291235336417987,-1.1318887897539016,-11.00908030463828,-22.64711833803435,-4.623880737605381,-10.82754181970369,-1.7764324211577225,-2.4242751938757485,-2.291611087878246,-4.672727879519407,-3.441181703466422,-1.8056721355560312,-10.10251685960639,-3.9933422250294637,-16.868293485190073,-13.275474211017361,-4.760714966268292,-1.8592557129993261,-1.2940191178134788,-6.447429884560771,-7.788408315063669,-16.57945652369544,-1.749171951813259,-1.538819713901436,-3.743359968013277,-0.9630056028605756,-13.533405574814623,-11.915598701807635,-12.882906159795546,-1.992818128001648,-0.7940101679673575,-32.169438660818436,-1.5670524227905398,-6.8114782416984685,-1.1826720255141998,-4.4268933406192055,-0.4828615712161686,-12.806832231852788,-40.561929778877364,-7.604134073247938,-1.9566825821315346,-0.8971134378332848,-8.159883593547892,-1.7787296374002641,-11.007773451574012,-28.838881044211504,-1.459463948934085,-2.346521713941598,-14.757042169742764,-34.33654031918187,-23.875909513383554,-6.8573841746687805,-5.46128830433781,-19.564882957035277,-1.4495787058262461,-2.855206651311729,-6.79500895327007,-36.73035198628088,-2.76390158994211,-15.826985536555886,-6.744948472666237,-35.66261227263504,-16.29127746410487,-4.514393986354417,-7.177578716318871,-1.1848246707455306,-10.125979719812474,-1.0669447751151147,-89.47480426184916,-3.221737913255362,-1.8513255150287256,-24.996170585070157,-21.01521470779729,-0.5721910098870444,-7.104641523987551,-11.41116906241478,-5.808022940648566,-12.616354590740071,-3.5879955620502724,-33.616159903633815,-11.393040637633549,-0.8539797190751948,-1.4945248734303391,-1.1676001640303721,-0.7491271160771897,-1.9505756756487085,-3.265429652917251,-1.112873687148812,-6.703211544977872,-14.44500572456756,-0.2585677980575456,-4.068987738806329,-10.434906491070251,-1.962952717255029,-9.831242369492276,-0.4812003397227542,-0.24542014232627252,-3.5681373664646117,-5.292605498796838,-4.662027789642791,-14.562927488075106,-30.091392051393424,-29.085888988299597,-0.9430962172617474,-26.88597382219186,-3.627718506260046,-18.999501626550906,-36.27816251825965,-6.187048493351468,-2.0181756081241913,-0.7290434851194965,-2.7423760742096275,-4.089843475350829,-3.6130741794558885,-35.40701800208495,-3.8321056653017602,-12.742437256500471,-7.318229605027903,-1.9922621823077646,-0.5865628119503064,-0.9885823049810247,-32.535636751726614,-1.9976044283994365,-0.9393843941172639,-9.431370996202263,-3.4843176935551416,-2.666030200652488,-0.5208958292197696,-4.250448567290867,-15.044498327210125,-5.251958247219731,-3.892828541747175,-7.869210017903146,-43.141149167707084,-5.065615865517273,-0.7758725950624636,-1.5282889324418507,-15.875036082394596,-31.817359659593667,-3.2412238027119837,-3.606390449366943,-4.9194802476454225,-1.0708467931335313,-1.5617807311735739,-1.3699560549223524,-36.14227535593626,-6.982561232336756,-41.9169605528861,-52.469007664712244,-0.36156428616046243,-7.053430623363104,-0.2916171048065306,-3.465820627054904,-10.25448661826115,-1.7063090726731622,-19.022418875349715,-11.242239834878438,-33.81644234647447,-1.1540311678992983,-3.436127904528271,-0.6719627769513103,-0.6350524769901829,-8.315791350935399,-1.7569530943430642,-2.4862477894294748,-29.433287797037416,-5.931647713390401,-0.9270439213256694,-6.168683100483093,-0.8481332178218524,-1.2821513108465545,-106.98476069176085,-10.621356354436887,-5.623988231920315,-8.458036622890857,-1.8422714410418286,-28.091471978603682,-3.234839914671763,-4.165544139976236,-1.391419705116592,-10.305851180562621,-11.611384261459,-12.073306695384128,-1.3929737578006545,-2.8055044718502606,-4.435536788715244,-3.4217902205476523,-20.246999359225708,-15.194798177709018,-9.505698516769549,-4.676730701860657,-8.224396925542045,-6.566079708819111,-2.949863838942886,-9.559083393556332,0.204742573490182,-5.5242406134487165,-5.928926343819791,-0.6313016058297098,-10.569453493951142,-3.024100237823447,-6.208395679919056,-4.665501733056895,0.07665515076811014,-10.706773975205634,-0.9926636507566049,-15.705618960486412,-1.5214702235663293,-3.020837352797942,-14.338765355327903,-21.246005447508967,-0.8782238478083331,-1.0131617487171787,-2.149476237573717,-4.1268255473335405,-1.4179495295742695,-1.606021709701344,-12.791426143188216,-0.5240497499343728,-14.57640111059213,-4.1175839928028966,-6.196707886735453,-23.80878853666763,-3.044418291396216,-10.885091449459344,-1.1562730897494102,-0.593539825227009,-13.34911880047436,-2.0264286078345215,-5.326707555568548,-9.422424445736862,-8.841737907265731,-0.7013048602133187,-11.97660680947067,-7.18756868919821,-0.2603973523199876,-10.588594078378492,-0.6502656727903409,-42.871328100422225,-0.8764769876252214,-8.007504051421211,-0.41882761350562747,-4.888745868752677,-0.7154823585438739,-0.8432341308394111,-0.17994707273445476,-2.6397278922600633,-0.7566473100871156,-6.7453587522658705,-70.21434348072177,-9.854715680557335,-45.57042732850565,-5.793726620305699,-0.19667828591710546,-0.754773630203172,-1.2437504880405954,-8.326604458871948,-15.71366909275965,-2.5119519320302333,-13.106670763893154,-2.577805644662832,-13.188602240543025,-1.4683262505982313,-1.5822481924802156,-1.8777197335084366,-1.1854267187085017,-30.38155106668164,-10.914087503330473,-4.367456390336764,-8.822762585987913,-13.515793192323848,-10.31086474326589,-5.544811357859553,-8.275607180665281,-1.6425681630312257,-47.66258596059554,-7.478149241388205,-8.633738146108005,-35.959477198929136,-8.895198513073469,-1.168418089976518,-0.87393177340513,-8.175361318074074,-9.637812864320475,-48.77138627589335,-4.4790798651005534,-8.187190050462974,-1.126213222592894,-0.08351033431810828,-5.966580249690299,-3.8590720177898366,-37.21860797250428,-1.6393442595573609,-38.52603237297406,-0.70374024988668,-5.8706891344558025,-6.158522586647406,-4.260492694639471,-44.87115417232729,-26.081047850643227,-10.326963555901672,-3.205149185041832,-1.2245737089189168,-6.130698852731115,-14.640436844327793,-2.2569396617237483,-1.329576146138816,-2.778538089783166,-1.3414039758385972,-10.227765172527866,-1.8575416759566303,-17.498641623362623,-13.026965909579664,-11.774464247288243,-6.409961937379617,-5.4716778481326696,-1.0496965785310202,-1.2932886683436045,-44.34017010513562,-5.267089777671195,-0.16685179864540256,-2.360395859395572,-7.72495009723018,-1.2384094249492366,-11.09152199965628,-50.92747713480472,-64.18217955445445,-9.61838236561021,-1.3307868128051346,-11.272564712726767,-5.2961161065989675,-9.003367316298636,-0.1694328726509049,-9.590079674207663,-2.6090320639353406,-2.570349894251545,-1.8093823097749633,-3.5710980940338217,-2.003014025102929,-2.7014499166779244,-11.273495119356124,-0.4165911168137275,-3.209635621434586,-32.82322598178077,-6.299085893110152,-26.97619126845852,-2.1771905701985093,-2.062521603979234,-2.081928581941822,-7.409172227327556,-3.4376572475616185,-4.927248799492781,-8.31159325747916,-2.618365988927418,-0.08128354513451796,-7.38896972328301,-11.267378044900205,-48.774273561863524,-49.51353615301776,-1.22324882500261,-1.7152102104993483,-7.885848719669964,-11.62298930155307,-5.7165063308512565,-10.924243477709004,-12.698310521639485,-0.2164163146000364,-1.1750858599558918,-9.52876616982062,-1.8138335538360932,-11.96347403929328,-14.318084060567909,-0.5151185963742391,-2.8343245762560283,-8.608305960968668,-14.04688879271706,-1.1169961713498764,-90.40476868788701,-8.045066291431388,-0.8909165360144704,-0.11302018323878515,-0.8556693881370265,-3.9401941341071174,-1.3393506622931373,-7.308858071821389,-7.912002786698739,-15.786613351457696,-0.7733240038222893,-2.556123407341896,-4.591970066040027,-0.9771741422832907,-6.042546033379152,-34.839010152231964,-36.78625691448763,-11.543333955657516,-5.6653086776439245,-6.384583756604397,-1.0757990971860205,-6.079957486962551,-2.1806348086789535,-6.557062222624491,-74.83222614833262,-3.424184450967865,-5.2672493351626075,-1.338702579856764,-0.8325436611282493,-4.902188013122518,-10.017097650904459,-1.3356762101134092,-6.428957089562285,-2.5257561992801474,-5.367315669050235,-1.7579849674020105,-3.800375552103429,-3.479015499040848,-1.3930504192529176,-1.5376510564964119,-1.7369584866661807,-8.065217881360866,-14.943989538384658,-3.5488198737205545,-1.3668041347172477,-2.4361527629758495,-3.7365300049634493,-2.677956374481293,-1.1140036123493333,-6.640002178905505,-1.9029178007561385,-6.292352793032879,-5.9698681977158925,-0.16405511780653814,-0.3400658502616567,-0.20446132071946765,-19.869590617660457,-25.282134537100784,-5.523549507459031,-5.600792783802688,-0.6237303010162605,-4.824041179352153,-1.3102684245001996,-1.0738648641227158,-10.151053511580962,-3.9243530280639685,-1.4542284805433747,-0.9342296688006804,-1.0434155752097585,-2.6524582058864876,-1.3264345231527783,-6.590244350070504,-54.736679682138934,-16.74579416882378,-4.2896518094783955,-5.763433172962299,-1.1445515251404248,-11.87034737330034,-18.14092115818399,-4.765696712143462,-14.08653734085914,-0.816812447587393,-37.093663568030955,-3.7809471359118794,-16.153187765011566,-29.431983366321923,-1.1797171423984205,-1.1677296195894011,-1.2079208184768953,-5.873414671512182,-1.0954932697038604,-0.9039312333055212,-77.95971991254758,-8.365176490511077,-39.450249186489806,-14.300847296395723,-0.6051801114232371,-0.0499851075143547,-1.3772783927875338,-2.173680791676409,-11.853329067542095,-1.0546280514355724,-15.566047544929518,-2.0275611354772662,-8.862865776450334,-2.949056529844965,-0.4580747878850977,-18.342568638906428,-43.52475941082568,-11.891894979886292,-3.130456866047812,-13.489807722725143,-14.528033861847566,-8.032597083792954,-1.8072931679511457,-16.45776385202564,-19.138935172586407,-0.04451802703403773,-13.337720032032234,-37.618786524864944,-18.323720502865893,-10.385247638718758,-3.12642578532359,-0.5022096544655783,-4.6211730255910535,-18.784154048580465,-3.1308760877205444,-12.032023000004356,-2.2190788662131,-0.5585093641927439,-6.336006663183266,-6.074328479178076,-0.674656890361355,-1.0624921821842404,-4.480880783696986,-1.739692799261182,-6.308059909444166,-0.6166206928607121,-1.5803410642136206,-2.4067034033093977,-3.083982282471685,-7.919582439079848,-5.925158521124244,-23.66555058609344,-0.22735989604940543,-15.557174583946486,-1.4435074845417095,-1.400851843757657,-3.52171687469641,-19.660929078671863,-3.152307819755296,-0.6765065207348822,-30.174027405621423,-1.7676554296839746,-12.395895400123457,-3.622686283386518,-11.74028018562942,-3.9089484261655434,-0.03369034720483022,-0.6646412003311672,-1.0267010535386631,-4.8196491953947005,0.09962029276758377,-3.26074253801666,-7.046025095578028,-1.089335384009175,-0.2523447863157169,-1.080672208502082,-23.184964445778377,-0.7231202122436242,-3.8689420804840466,-17.863100345285037,-24.483310947894154,-1.574897222706316,-4.958856892121263,-1.2957863503846196,-2.816548279100868,-2.01395837672371,-1.9676086037562845,-9.696178147302545,-2.2794907517552763,-16.28537057652164,-0.7273946421542048,-18.667444551297905,-1.542215735996509,-28.164524133416307,-15.537522126813222,-5.973143865400476,-6.556458024460516,-0.4378592467367497,-20.889503214135566,-27.750345548908058,-2.793870962467909,-16.059003694685984,-1.0759792082906712,-0.6197099343049692,-2.8334449898853817,-5.744363925819602,-10.38744073851157,-2.302349407178249,-14.471348934713491,-1.0229659689107138,-13.79009256995661,-4.786360832400134,-0.7956646749012364,-12.839751688432866,-0.6708777533126424,-0.48081945329160813,-5.441018108099328,-38.80522508741807,-1.1967632969399158,-6.395504550561705,-1.0048719592323354,-1.3007928747955062,-3.276469451041334,-3.4117222653035943,-3.9259483939736493,-35.22899537305771,-7.178414521006725,-4.0523369189399165,-1.483457383020419,-0.5028148486718282,-5.248097954244287,-1.185162951145636,-16.610560343761897,-14.066794946862018,-1.8657179158730233,-4.521753958004846,-0.543719414892536,-5.325091148639723,-8.651343598510326,-0.7424993819947918,-18.566699787869688,-11.405963491146167,-9.583585254778892,-4.710368596702471,-8.705956411627007,-5.001987309797946,-4.096109206421107,-8.323183103992639,-0.7521125860043156,-3.040092911123281,-28.531238564057144,-0.7662738492456433,-7.166761423203121,-14.058266750249834,-3.4108676084806433,-1.0761232940310361,-6.352764049293151,-14.656851126201255,-42.5026001676679,-2.4315118619117637,-7.457618061666652,-0.24814064965086513,-17.118236856440554,-2.207128555628148,-0.6085582827418836,-2.1264452139809107,-3.188158115488342,-10.135847586920246,-1.611122641407166,-15.400636673278559,-5.1686022185222065,-4.1765736544100704,-26.42470479878643,-1.6396258753123794,-5.926908123361784,-12.086676619194531,-35.00624028297691,-31.70624460048479,-23.63991259444494,-4.996281933109512,-0.8225008562048648,-12.49840505124993,-4.665787455337979,-2.4783158455342225,-15.116364437308647,-0.44484350339417467,-0.7354537178593863,-12.182797961760546,-0.9018074852926015,-0.8522623189668024,-1.47713078864478,-3.3517228398501806,-5.376926334126372,-32.03064625322112,-0.31240137465725004,-5.078479821061203,-29.97752355781907,-4.282082614108715,-5.401927976804102,-20.297126137648263,-5.166205067744405,-2.947704300043391,-1.035383257931609,-22.70540775197965,-11.315938309391589,-1.3777707336063505,-3.2921992830742832,-18.60184464313585,-28.749897571761867,-0.30088000086902245,-4.979060368208913,-8.764224132870023,-7.519918915763011,-2.3363476182339697,-6.6524416080999575,-4.811567471052522,-1.6388126541182169,-9.742972711278215,-1.1114970415510685,-3.820316960027242,-1.0255252184730932,-5.539080021773569,-3.6937361398527235,-1.505402696045249,-12.984372241132547,-6.923575161183058,-1.909177919100522,-7.045820689219971,-52.83631924341259,-5.602646219431306,-14.2794582705735,-1.5216645561280253,-0.4348312498554372,-2.1672814659604214,-8.32166161562812,-75.9707334609469,-12.632646079326951,-12.272855121182323,-8.53461631517925,-33.54963483972358,-3.557604045992453,-11.838916351094225,-5.044426823145475,-1.5674928274988125,-6.094001585297382,-0.7426115835918363,-3.992100851013534,-0.379340863607335,-1.2429737985021088,-39.32212634682609,-2.681154577027509,-1.2945018349172905,-2.495930896846115,-2.0816183272145414,-41.99207245162592,-3.643772595253987,-7.487337621412966,-0.6197877726179599,-1.7585544341272588,-11.915542589761674,-0.30645335640638827,-10.570464572755604,-8.639624955458604,-37.582750915874314,-1.2631189403879695,-6.248770792456141,-8.514467267744974,-6.814813826542094,-0.9722121547932192,-1.2826630876188012,-12.618441414370112,-0.3596934587396863,-40.186209260996144,-6.168852185012506,-6.578548653611308,-4.810605833158885,-6.391808101725975,-0.7085466864460033,-11.29724652809309,-21.78376839814654,-4.963003552429097,-12.862983242760881,-16.935596653841753,-6.410676452940712,-7.145307687114717,-1.6835884659052227,-12.754226936248257,-0.5020826903737625,-3.9894178938330978,-22.875718871918156,-2.002237589590793,-8.306195135266504,-2.9503475675735036,-3.50910026117412,-0.6089285342967485,-7.44981907234142,-7.414992381366437,-8.386172275249193,-5.13375434566388,-4.541701544841532,-22.525884550420344,-19.874978134102154,-11.943150286616326,-32.52915215758723,-3.326749490256031,-1.2249983101236026,-1.7244545636326214,-8.745888061296855,-29.642688821531195,-3.557942341615882,-9.783733539125407,-1.7122380675163653,-4.28593454743822,-7.058355838335422,-0.3933501041280738,-3.241233348632529,-9.159298274229029,-2.158038999221629,-2.4617387786602865,-1.3329244788121886,-10.97101516809603,-2.6856562371888786,-5.970711140678466,-10.331216344663009,-0.3319250696965328,-14.321943385240788,-2.4389613991504664,-0.3168953934026706,-1.4390581530335087,-78.50675754908887,-5.11501979811957,-2.5093577955793718,-9.154943267639576,-18.83154823328698,-4.216573465032379,-6.257427079126852,-7.512112098697623,-0.5128985915455768,-1.2917724074232442,-16.69166892683797,-2.0368319391544474,-13.80205984260274,-1.8977760941063484,-3.6616014788050597,-1.6527348501691308,-4.857713961380804,-6.987704326304395,-2.1777550371131986,-28.673605342465763,-6.919956330448652,-1.0769905139260874,-7.010641439248946,-1.5127357462196513,-10.140926667183045,-1.0227441920696698,-11.010180113789694,-9.281748516490904,-36.0876275337288,-1.5478569075969124,-0.6556786405036528,-39.50774133920528,-3.614134709337165,-0.10264213140439882,-2.5995943335425586,-2.282169391041653,-2.3105308507674946,-5.0768313462187225,-4.90106054271276,-0.27577086276161067,-7.855792333188948,-5.151732121742912,-9.168140641730574,-8.360122677975877,-1.6796277080000253,-3.3754531616607086,-1.9904279200607746,-0.6716743319935672,-1.9672439540673143,-9.916050853559566,-2.165275610977358,-1.2788561487856953,-8.542814873016056,-1.135975217910023,-1.2532355590337485,-28.092484024413963,-2.430911722706753,-23.007982914459983,-7.204840048841438,-13.550603970429139,-10.641088225204133,-2.556593838976183,-43.81021541198825,-18.74995118009016,-8.763594909132289,-3.2341082761185054,-3.349301367910777,-7.800894863910374,-5.301397241480101,-1.5514608863682295,-3.0588974749108284,-1.1735457950764283,-0.6025968432111408,-6.060757500538186,-9.340321993430827,-6.597619495167245,-1.2524320597573022,-7.316826276072547,-10.538492115976851,-8.599822291559917,-1.5536582340700231,-21.479411647508606,-0.9431617578279219,-3.86317369792179,-2.1067159333815297,-1.010924331801863,-1.8532468695058686,-0.8440017647574087,-68.45516411020705,-8.589085972924527,-5.881580674175874,-3.1526924341659406,-0.037783763664648085,-0.35726611518548834,-0.903309205833124,-0.6481602630786574,-22.88736950576259,-1.565166934839323,-2.0807596031681195,-54.086155835662325,-101.68325388434653,-3.5286890776985773,-5.480575038806444,-3.965084470456188,-0.7534332860232862,-0.4193294275683499,-8.294699201870653,-2.6368276147370224,-0.8375996968967088,-1.4660667560220007,-1.5316126135031556],"alpha":[12.28762224950727,10.799669805839873,19.43791720547155,18.864360197777483,14.51939260027377,11.147737810337246,12.645278488915055,19.25562660443248,11.568330760192406,10.756025596840463,15.972505625719398,12.165089331794352,18.617156757719584,10.323829050043464,19.689237015564327,13.217584617828642,16.090251012460584,18.480927370630138,13.19684361696671,12.225407887877006,19.691923209917697,10.85177531841498,13.435761918811831,19.06063268219126,12.928557862658145,15.662317796773245,17.911090924107633,17.390151317702333,11.681529279135635,17.3221257871555,14.771500742235464,10.37477386350986,15.34882617110143,18.257248577482983,16.029177766907864,11.484506482380766,18.58286990465908,18.651235379117026,17.247313557319494,17.96568260937756,17.97102420631489,14.99651370560966,19.558377103096518,10.314273434122232,11.766135183031173,10.183132091678457,17.519122918151325,16.285854561740038,12.622740662253332,15.311266867798734,17.548001684739212,10.091309512853687,14.624877586080721,11.403653160885112,19.351629522093567,13.648382612788758,19.466855532927198,19.569916132574008,13.96225171084702,18.25944805136847,14.79464587468196,13.88865214200273,19.33905524810144,15.723082248284971,17.53079478221037,13.569239354577718,19.418794180980353,14.280206780434463,13.521082366850798,11.996878951467579,18.317010203922543,10.334376918044825,12.206407504027778,15.703676416197814,14.113061657415003,13.415768082171109,17.05027385629404,16.579033374184817,10.008218467773274,12.108290256897744,11.427424285035004,17.57564085156127,19.39260438507643,18.573047434309128,17.159199145500654,18.137543359607957,18.857734484153195,11.779756762481334,14.603657316723883,16.72202933546987,17.970728111354646,11.336035106879512,15.290590021959298,18.65901615110009,19.439580298735567,13.569455785293169,10.316467315270446,15.271127873334585,11.366775848834285,18.587353077378495,15.255601664952225,11.58351692992181,13.436576204153862,11.519963739867467,14.46734717490453,16.84271029483043,17.105321510375138,10.403566871904266,10.151739363094208,18.612513676090472,13.045889759518182,17.472358595187558,14.845264604446749,16.17185270838246,13.070041650069955,15.151701324985282,10.17091653086789,14.757232497639396,15.527005030380822,17.06968761503945,12.563577968921212,18.347998614902533,19.189125749723843,11.051734590050993,19.048956308912814,13.168810456675114,15.435855422056239,16.414345925688195,10.815297825378284,10.58928294528068,13.876873615451036,16.111197541137976,11.61241199503377,12.206845027380151,14.791522979768567,19.89826173210398,19.853114333276178,17.18095846057422,15.40501745419017,11.523439403175333,13.761003159467284,15.726922178203733,13.788063096143127,13.342916186945523,15.778814103033438,13.902267352358335,11.513899869768931,12.389053898720032,11.766237880257398,15.474611542952264,12.42809343645,14.259796991761352,12.292323812622977,19.62427701217672,13.907557338010273,14.550927585604562,18.73756852021669,18.290719056323017,18.396071267256538,16.033284319655813,19.99768846920354,13.992958333797525,16.500350180907766,11.390177577868965,18.89237296369823,17.663304899237616,18.50126838322782,12.065329839084942,14.909646232726796,16.370029690229806,19.706513689465897,19.13327841952211,12.53836517783137,12.616741227653785,14.172642923904966,16.40081096886574,13.853386973872064,18.73209532671592,10.775445096179556,18.700790671966203,15.404136991662643,13.022123094831441,10.211435785452217,12.15175672932759,19.30280645758838,13.35819542386798,13.613696320311103,11.677399723643722,18.35035656940066,16.257861175860796,10.68452410338018,19.705174298045073,17.700057058696544,19.734206163180925,15.060917605695822,19.29114324810212,10.99048708707933,18.776568660560297,17.812670904434697,10.218129552970252,13.613632884930402,19.172925110227933,11.611438471524998,18.701915949394646,12.520501683848932,14.750986125975793,10.98439224451262,13.849298215631102,16.256067882119684,11.241644260489975,13.998006899222798,19.235290205052333,12.598171815862013,14.97800968707018,16.740660083828587,16.878275409541068,13.080090573954635,16.183741676353193,13.488713357708393,12.72633335537967,13.586905268945024,12.18079021343178,18.34110006007431,18.690367841667126,10.77815560778028,13.710899111776822,14.973966083895707,14.137688579324063,17.931804197612237,17.567395015956553,10.918342470450053,12.238505199815538,14.639808789145096,14.009694498603618,10.480486440835186,10.467347868716638,14.583183916923527,19.81332783803186,14.39374970672137,18.698312618258882,16.29898138669507,10.148705933441978,10.372878069065594,10.392347161457582,15.454350631125218,19.710527575691174,10.669629615104146,16.57869949822509,11.884300571142404,14.349112026720663,13.783340384996896,10.488306052912012,12.803535848613052,15.288159611952432,16.429527647066543,15.117319186704862,13.501730834586185,19.850086867920314,13.202770000934931,12.98957864175639,10.672625033646057,19.02344270752105,19.344811740261804,14.663722495110438,19.141320234293485,17.990667268509668,11.355928260744674,17.630066759863283,13.337238333735378,15.546730589433517,11.45977149951598,19.66395925318116,12.220180109674502,10.720576145919932,11.460260699415116,16.90880577620922,16.22285621503356,13.668491334016046,14.382126269753305,16.38624900982654,13.540186239558356,15.336685081003212,10.22228961573148,14.695514283886746,17.591949952890182,13.47108936453515,10.883004118475569,14.239940411093169,11.855518049855679,16.607085462136858,19.700773658364664,11.72398873824834,16.459293262648124,15.021889583861707,13.497532392290983,15.28187202065062,13.090169522244082,19.497003024664643,13.169787760497174,14.29387114162742,17.941273605413592,11.209734945210796,18.58814605865951,13.208514911230937,17.598658607803493,10.873477126441584,16.145038436992845,15.612196990072187,16.45142107374913,18.68051637396299,16.699579320431507,14.702980559510712,10.232518769523528,17.440812185759185,19.334470336781237,17.173365929523918,17.19084510711013,17.239079245031604,19.446318501849923,14.62373721838083,18.581528038786146,14.451658757530177,17.196933681472974,15.902649175038015,18.921728483545763,19.997546021378326,10.065940657405761,15.50860391867295,19.132155841705224,11.485305909806133,11.432458014798819,19.1577333009682,12.823564074150351,15.641915840007691,10.675719379234225,12.906296602009984,11.38976540946851,12.125297913731174,16.154902872816123,13.281571448796983,19.023933871486328,17.7880933304017,14.943259700266271,18.40806462417509,13.836392648214662,14.946351687744215,16.497582275245755,13.994019733158003,19.552764750034875,13.696735764395434,14.832151312091577,11.781799442893888,12.372273146726247,16.55228394082563,15.606059252866288,19.916738762491185,15.027884205600984,16.23162652070133,13.415225143225275,13.307657593269422,15.199744973831395,10.023228654050804,17.953638374294037,18.439059137271656,12.599613567538182,17.59088198528644,18.132887791936184,13.230440481940382,14.309256540291337,19.434551854366617,19.20225513126362,18.576148965821332,15.046975859871798,19.260654644064832,16.2987293752186,14.729360151559149,17.65664908262962,17.039721730693373,15.098178114112313,14.210640949382087,11.93030183372628,14.828320384527181,13.817811986846342,16.500399698917423,12.514753602929147,17.245129891163764,10.33351045730222,10.075466473377704,14.970446481181357,19.026809298655714,19.38847039663983,15.274629926488545,10.746323368947845,14.265904134659959,16.759176337617287,16.29788180045171,14.415980541234749,11.090759903988385,18.36410920734707,13.009509800109525,16.85769539213597,13.229180884008668,13.257966044040836,17.68328951322868,18.46260392892361,18.964164144482282,15.703173573119802,15.626514276304036,18.90957825100348,17.09111060168792,18.49842408544268,16.14100612781118,10.256494708491402,16.609891255884186,17.69697718799339,13.539740578850708,18.4711354360425,18.262930834534252,14.20939881912388,16.14607900670486,17.037024185804206,19.80001091482761,15.552787044831389,16.013130660574213,13.566872215724226,13.210473267806018,12.300833952823602,12.226363129421621,17.659078973122057,16.197370184999528,10.6057658370894,10.967367797506636,16.398213721171963,16.003524357089276,11.985757190029801,12.674003895927708,12.507070401969758,17.89835310100635,18.410533732050787,10.609414130013157,15.570340774571962,17.50538759645284,10.933958955944153,15.252417855982456,15.388053460159716,16.500238050876497,16.482598253535578,18.4543553945426,19.36920105905203,15.812215878493065,12.481238833436759,14.537513575766663,14.411804037232658,19.778194191005532,10.786195729901543,17.883438097678923,15.165356803783363,13.964423817369022,12.201927891539125,19.822941872611942,13.772701824580615,12.645673094174775,12.496886835524524,10.715550705118059,11.123891845943042,13.202046974825123,14.120907837308978,15.08515176589819,12.63070357954762,16.948508345944187,10.780017678514346,15.529259120194743,15.165625617894523,10.183373082331972,17.258267202642305,10.434258279573731,10.999050867469464,17.143206133207656,10.625005821207104,15.678577968413848,18.197898469868402,18.660128253253873,14.117578918440586,16.905265890623685,11.488860069899175,19.926850690341286,18.16167634687118,11.656262121441456,14.810180422292484,18.018942064562154,18.597064384570935,15.9147955956841,17.87430535450994,19.626148867907382,10.978982383509045,11.329669414559936,10.216307414457457,11.986163617002305,12.042917008252443,11.081587074719764,16.137837676894687,15.156808271492894,15.183887960380309,12.62233234464506,15.060739323773793,17.623844790935767,19.287759867500725,18.160287481324044,17.95480429805918,14.157463952782226,17.673708324091955,17.58855683342024,14.913031700291917,11.410812494086105,18.911819143871043,10.476892073066846,15.487259966099213,17.934223653849088,11.432964288823147,17.942678679000856,11.204466552329746,12.75776305929561,13.499447769391672,10.774872106267807,16.70243154240022,13.603109433534213,10.380913348449516,14.353120289697056,14.17335632632093,15.157313161392826,15.722692788998117,17.93501946625012,17.106761531325027,12.62066944188371,13.670455002918223,14.290721709215077,18.743731565966044,10.67652332756062,16.01996045709047,14.494659338990772,15.33939281792874,15.969220699282324,14.774154622129977,14.722965145398499,12.443233883750482,12.54648384972061,13.286351139060086,10.136390095193708,13.37647961829347,12.042963616132496,16.489770595497976,12.503660757706045,19.490474061173764,19.18004669325691,16.337963503024625,18.455955397601844,12.726285144724352,16.498947263807842,15.533383565784476,19.740545165667577,11.107052932229545,11.107885351940618,19.502084321915255,19.006303002668265,19.00544774951405,17.96133771726097,19.122579311165293,15.487647468443166,17.848000020545463,15.691552840715568,14.900471333308797,18.42836962316694,15.662827326611819,16.36420200621961,19.599804467504107,14.481101216924973,12.517785207664527,12.27248771517856,19.994607897916246,15.436928858993594,13.832362345325018,14.787681783780046,13.200506784633689,16.13091340579598,17.290224499778414,13.386852382778986,17.0965418168982,18.335548604509874,18.930737560876775,12.178561550057234,16.21521532097695,13.093161172049903,19.71866475666139,19.577184358297316,15.570958330688313,10.573885155612475,13.788047772442326,17.135718393310988,13.441693585728176,13.447745497671676,18.708309308945434,12.449581611461397,10.918627878661255,11.927340917925056,15.375963292767587,17.874177528856908,19.739349783553706,17.238232060561188,15.734884371059621,11.944072274512909,16.019629318520533,14.279157123791869,12.473635321415511,18.23208466775229,14.881827761458021,15.090285647184679,11.843024061497353,19.300912460571197,19.11070000274951,18.666114279692877,15.407196036129955,13.193063609058271,13.93806473762687,17.97593791772049,13.282284754419553,14.176706438470454,17.436880065636338,17.670652496586094,19.376853365885978,15.940655501087356,10.053146670621466,18.738145015069612,14.01399394059668,11.035986689836728,19.839533897522255,16.921694135214054,12.08428208010341,16.057886444100227,19.019545118413504,17.5847781184304,14.28395983835575,14.60944972384129,18.384517027024422,13.774316870392786,12.440947187226104,17.694433641265064,17.723095119379956,15.863605998488527,17.358768819277287,11.231436522167336,15.361474289993604,11.86310942794534,10.908584145395583,11.844649608014466,17.97023070748746,12.185759549981059,12.797760729092712,18.179670204478267,11.431586167534306,13.429001699913805,11.057759269183977,13.822504161714587,11.294456699182753,13.381509863940417,19.401952330191385,12.636728955231852,13.20497031765018,16.006011049499918,17.737294010362042,12.677906940563057,16.644397354390954,18.92421348152139,17.15613795066588,10.322715309359431,12.799943159080387,15.371113467530765,15.246834208430936,16.27630023379531,17.52422983282636,16.184898242206224,10.825443694189454,11.49944475600208,17.600882535214268,14.541079116622843,10.632779811158063,14.21454679915222,16.139316839120106,18.490384712113233,12.120567560743128,12.242254319642218,14.218699006004904,12.639731789983287,15.250361923308233,18.459196058857643,13.912046873072828,19.47414205834064,13.877160277645807,15.318976926308132,15.819771203336696,10.133957148458686,18.92787708078833,12.251297274100047,19.38068587707394,14.724920409868487,17.934656033548954,14.13387506471773,12.219778895245293,11.558981159798075,16.717307187916553,16.744250420758032,15.745529541003517,14.206975261351019,18.896193537301098,12.892606165088507,10.80738431210213,14.747771934968274,18.33689007606824,13.060548352563778,14.750892655851048,10.520493911056958,18.03114960691702,10.44253009199194,11.76356817910164,16.300216085674222,10.14388478753718,12.804398410098283,10.306426157015283,16.82439384269169,11.560837276629778,10.234746702211876,18.51549130712465,15.046086353286714,17.13137460058333,15.584711425797211,12.571488284262484,10.351513195503838,18.730191698360656,18.572260380011812,13.878412685169943,16.615238851521347,12.898819754656499,10.039960643427424,10.67749960606385,11.707341496123858,11.025287949856112,19.60153752252888,15.958925623349455,11.716650564129187,14.750178646771989,12.81062362635775,17.25962500673596,11.161168122305039,13.722798445646271,12.916956703060693,16.483057259191504,14.370208799722235,15.763026986147853,18.663134317858916,15.876045840061526,17.312043164054415,16.577209656058137,13.73976866411266,10.39150109237956,17.753062648709772,11.206946425962421,10.734959338981271,12.859272814122566,17.6639588348237,15.816281128022045,15.127015480584145,14.617223859029995,10.062158797630548,19.13534235972655,17.999926423621087,10.136325582675955,12.288494304228514,12.176636956161621,12.371852126822755,10.833887425272795,18.099814502767458,16.29365313405088,13.872382266140267,15.948415481210931,12.505316629038905,17.7102749916355,14.00052722056574,15.62724184308966,18.220376882743253,19.19850368453623,16.264604938502952,19.46900989165367,10.089953415622265,13.496457913079073,15.071382149483725,18.495244425857177,16.063259972067602,18.54070877874477,10.868570582182695,14.449821123933578,14.353401488339962,14.373081107624419,13.954052193438054,12.473657950683098,11.599285984712314,17.67143733061335,16.48082054110658,17.959136808991524,13.711685864739314,10.134947628858226,19.94928225566827,13.215765804301853,13.704352900121314,19.467203705246014,12.679106510709051,16.30716683568775,12.770033618058815,11.065622923578417,16.712326910977957,12.326931815570417,14.075209343899115,16.91303850080651,13.86065879064634,18.643314118690313,17.28102547929501,16.310622352573247,13.45884969905984,13.269382543498347,15.989465061248767,19.09158645718681,14.43419723071056,10.683391980622618,11.966931177459866,17.769544553940403,12.077572393755192,16.38198173449693,19.939378763679525,16.18152488710522,18.818764432170944,12.158042441200344,14.955775516013345,16.161374462937864,10.535608043316952,19.29949321586672,17.01820210353624,11.132744420618275,17.05387311582276,16.094509577028393,17.558402872965537,19.190704578151458,14.231091200971562,12.365756889454909,18.769131028106475,17.179241962514133,15.501922499651673,15.007825209247208,13.45365881116679,11.995825645507296,12.961821361638657,12.42303967774811,17.0479317128685,17.469041900806435,12.996839636028806,12.174676177240505,19.674086273369817,15.969889642515362,10.991888657753297,10.632436043455032,18.659597372504464,16.92146187376286,14.792214426644739,11.615643488871058,16.581686301272118,17.369667719594315,14.768401462676879,14.400392072288478,16.491974954841318,11.197586855766916,12.714693896453422,19.33997238371736,12.183068925320878,13.045727919192707,14.693556295214327,14.686116705200561,16.18823412571178,10.667936008000684,19.12032457961144,13.17118078756916,13.31002007297164,10.617105897987212,13.47891851486565,17.43312731527356,19.687454066044886,11.055443604487332,17.66053593216861,10.51644427840163,14.676946575662308,15.658253431259928,16.474860911637002,16.673070077939798,13.50627659997526,16.54634974929992,11.967945651559784,17.767663813649012,18.968872543482806,10.518249516577862,12.366232213418677,10.4188246983461,13.230098974786056,10.869066199246513,15.441405295800394,19.05451266433661,17.86255687545475,16.396245329596887,10.744444611174886,16.315419896144867,10.957219963748766,18.37661225764584,19.08495971837949,16.08495282196299,18.95286082131074,16.320003153875703,12.842481743290426,11.678039013903481,19.24903930224877,16.277668517975684,16.869922250176327,13.59272316085897,10.429152401817461,12.021215159342457,13.762372168918803,17.365684658379898,10.258992260758092,19.45290170969887,14.069378646491678,15.929141931769923,12.803978732636017,17.202429169637355,12.684959989001133,11.148320271122119,18.852085026123923,14.071544781708667,15.851843098499456,12.241072723546418,15.248555769339509,19.580646446775205,13.045257658184113,12.198123628501385,18.89936473689069,12.598350995791439,13.898780124956433,14.7252422518166,17.168354248757502,12.56326372874107,18.790431324609482,10.667857291159459,14.46480071985928,18.220299808551875,13.744762521311804,10.92545539888793,10.53631526048376,15.01639117699779,14.386148568498953,15.522747810168969,10.09888810925337,18.840739262242103,12.092131734117473,15.178834649506117,16.929258924795857,11.798538654814728,13.445638347072615,14.413105677692444,15.630291636703726,18.557225655358515,17.217695611804615,19.896019200228594,19.99675619810541,13.290479164019827,16.031376006261237,14.500566135838572,18.030484273383976,15.711554957227312,12.427646053282597,19.253059030063774,14.298493573378536,19.415699743478626,18.27723682226031,11.596873748626468,18.042659086291323,15.321512489033873,18.152448039762277,15.906399117809402,18.44540561842919,14.595684681804036,19.96124674875582,15.265926379026576,15.555862406242298,14.157200664734493,17.23890044250122,17.430922498444396,16.812525558814144],"x":[2.198413896381226,1.1927959442272251,0.9491646120335884,1.6020246304965313,1.882803177068052,3.6070440500157233,3.079915659157657,1.605741294628732,3.964166844020993,3.754938316569966,4.9880120335211755,4.324145733389788,1.1866048375294347,3.6365534641770356,2.2219814601980934,2.2632013628054137,1.1338874401507149,4.3120392132168694,0.8420727426324193,4.415853389768934,3.1364527124753137,1.9248252653431697,3.282979760141033,2.8607072068446637,0.2945350382162426,4.020233228209264,4.972398388275911,1.2679230530343844,4.535845781973867,3.6835635347778384,4.016197373211449,4.241893063362372,1.759312805619252,4.233950578353781,4.466557614501272,0.2143374207365567,3.0365688415519445,3.1554266780219886,3.1704395368232463,4.906493566283448,3.3895178328683286,0.3628874770338497,3.5213579804197934,4.696498059088476,1.603583429640375,0.5713278541491817,3.526856034175924,0.5512470883073162,4.729504300918407,3.509460018620847,0.11890278951244282,2.959636528426687,1.7635283959535486,1.7399096831990768,2.1790291035639964,1.229274481341881,3.453602572645307,1.2195095657337873,1.8337184700497577,2.1387072372246085,2.4896352427986113,4.259373603991417,0.5905080427478859,4.486432165311177,2.514892954802681,4.23643384551513,2.4905553487486887,1.91422858127403,3.5137050228502966,2.7096412453937324,2.3972329402702455,0.09202787638728838,4.547601491608707,4.791626467757302,0.849365955984186,3.028974523036708,3.3905098076353712,0.09782885946660769,4.663364592719816,3.247170471293004,2.424199569501254,1.8335282006067455,4.967198096849894,0.028914176097482036,0.9679812528178311,4.409051545693341,0.5442839263096544,3.207212813747613,2.408123885033604,2.299259708290793,4.032289004082971,4.466125974647452,4.47284276980287,0.708899808470268,0.6967013096814734,3.47877518445849,4.54164794387943,3.096102523043336,1.7740701332792486,1.8057859414041044,3.8309102806955764,3.9967272027464973,2.7928827890116317,4.72908067885421,0.6582906433128499,0.7710913680011211,2.8811985463251744,1.3963149908446193,2.60663791891264,3.8111326977562454,0.3429732570491584,1.0757533190558222,0.3323010881080046,3.8464811631540075,4.346467307580663,3.834152938399834,3.161918135219872,0.49849127974201823,4.767162089184658,3.39822559254174,3.1506284366336157,3.6595916871335508,1.216259126179161,2.4059716181926403,2.677304254686014,1.2124747656871582,3.8803691965327545,2.604040847373157,4.488311226300951,0.036562067052857694,2.162215445022065,3.236281503622841,2.9127782737314654,4.980815926968712,3.9763356309698983,0.8302242889195199,0.7249388903722975,3.545524733584755,4.635149863756948,3.9910170621935626,0.12212781795274519,3.654101650666105,3.87362673742171,4.579097409867277,3.025709157231189,3.605481438928374,3.014369618770276,4.10927749061444,0.13139157620998265,1.7131224554126956,1.814903331279356,1.6024566897808934,0.019539478057071236,0.4321890491182545,4.530063015252787,1.3144785069379672,3.501473787252417,0.8945443253379093,4.147067105208485,0.7293324963994252,4.412172995841015,3.9057812129560645,0.39252736365216534,4.832992768366894,2.573882447654557,0.8300287453602118,4.898077619816221,0.4850295837218743,0.409119305811404,3.5262471535531894,0.7371029019620212,1.5937361973072928,2.8452251359155376,3.647680957969496,2.0090938240579757,2.6250184349755292,2.994091102541229,4.984825161840785,0.6484832893625414,2.4481424729315027,0.2525872869493817,1.6804377252781277,3.6761513095983367,2.774892545677212,2.260153759037422,2.58695317710935,2.0092716868006457,1.728301089534805,3.817073317179618,4.545811326814338,2.4872255144804867,3.164070919200077,4.515174036319723,2.42411764834522,3.9368318383347125,4.209747491763503,1.9498650546097163,0.35678598624394153,0.14037233758361745,3.3526179591521066,0.747886758587607,3.4599300867308616,3.6777840789112504,4.069120411064265,4.566709950356315,0.9299871777725899,3.457413266324141,0.5446874358307929,3.3566212949767382,3.4714989064924118,2.583178808001172,3.573800021993984,0.34795145824890183,2.7545296877576533,4.14441803648557,1.1856092771048687,3.4349155572621592,2.612624064638248,2.4461095565610402,2.59023166774592,0.41133762913573735,2.8279312538315518,3.3224930644805415,2.95550894444911,0.949769476553527,2.1902621572954137,3.3278376898094986,2.690661408246038,0.34641140894773326,3.4127848084924386,2.7336031582236417,3.2638348390780028,3.1022623573101615,2.3448033161526096,4.95945933588848,4.941555857989448,1.0817744831200615,1.1362365188802948,0.03417134573237113,0.08244063097681775,2.05827181688377,3.902984655087441,1.705733989234307,4.373242733772219,4.794767675834382,3.367906501356368,4.040767066400841,2.7408886293064247,0.583984053248302,3.364361188770668,3.787281278997604,2.3638933950959484,0.9642478365329366,0.47069377146457425,4.175593844531903,2.4675156326513314,1.7955504919231713,4.4840421056733595,3.5556131718698802,2.997196447570815,0.6198438821931329,4.017542170878001,0.0148553405606755,0.32018974595716343,1.4875826534986358,4.7425328505710285,1.9157995136743244,1.5414953194989722,2.761963472038121,3.4849733066790654,3.4472631218340624,4.954087530273531,2.40396075841923,4.824585159952306,1.998456471045159,2.752343204855535,3.1169876816463415,0.6322772688454203,0.6610593423020306,1.1957440178838596,0.7318070652504505,4.1082899598324545,0.19783994825366302,2.0864411621588275,2.9491575238799195,3.2989838872518185,0.9231878949013805,3.9301285248855446,3.0498465888002366,2.3117230732367244,2.142267345262361,3.208590097006491,1.9043703109036203,4.265463679192401,1.30079579927031,3.0685730926536117,2.5358110585464253,2.357093231832461,3.156761496436802,3.2218740181713645,2.9731214818770377,1.5191402835488899,3.7731516218836223,3.389406385795043,3.5569589911304944,2.3544004998075394,1.1395596536176456,3.629154042347198,4.386521680904981,2.8263867650767494,0.94755192249519,1.058073665994116,0.9211652506682333,0.2983532341363426,1.5034923617869123,0.5570699997278727,2.3913716417459807,2.984268902403552,1.079262645442739,2.3482104052698407,0.8733290376892777,4.357375194146926,4.391420894038411,3.1532020309184574,0.5995283902594639,4.808120559608813,1.4313544701243441,0.3432966115281033,1.5206391521242713,0.6909419272065009,2.4583651531759063,4.283635870859421,2.142456657939528,3.1480968877856155,2.395393670664674,2.398141434702988,1.594349186019104,0.6353564148380109,3.391849179889136,3.046045160033474,0.374666619434052,1.021670149850894,0.12287901127039258,4.574406259317472,1.2726094745892857,2.976820060285367,2.4805486457432324,4.511605076686887,0.573079896313089,3.6994882528606543,2.0850179430422386,4.15502065849129,4.548674626387408,1.1801171339212357,1.7038819979772413,2.8980057265851134,2.980453859339752,3.3294698769973285,4.437661158780422,0.6252549388639239,2.2069422718327747,0.5600419928162204,3.4336102529260195,1.006521139270674,4.37289756564614,3.3688598095152065,0.5015347765742806,0.4395198722033755,4.536470881402353,0.28596878307697193,1.4263450679728629,3.928208794173249,3.5997772802448615,1.2719824785666012,4.835765860142001,0.01826283251469052,0.8516538318561329,0.4958887171101811,4.739912900940622,1.5347688437673235,1.038203051636919,3.8658343057169176,0.07726783987946573,3.468428799190324,1.54963948103786,3.332535751761987,0.44931307633057305,0.23033945504778774,4.867945528735137,0.6317712078501958,2.4467257066695813,0.7769780669803472,0.7173585394362059,1.139542097194589,1.897549310688389,0.7770758282126022,2.978397379076112,3.732655235032606,1.318997702341973,3.3596517983147622,4.838955944769996,2.7308192050029225,1.351777951539327,0.44821546773509247,3.5780781990904567,0.7255994586407277,1.3491527861732522,3.1729694015847243,1.4268826718852712,0.08550605772209119,0.9997241216527364,1.8619928654683382,0.7756065129663536,0.5636254790264128,4.96543203777691,4.134484048636048,0.8779353890240948,0.785725698525731,4.093115972939589,4.561858553350672,4.555184443973985,1.3682401486397677,2.302086337722363,1.5630919615885752,4.205237407564604,2.77519171822728,2.6033822521976093,2.4097573926998663,1.491397138122228,3.281078235692924,2.4145137922129747,4.641936715657694,2.4371228661182665,3.466158832866486,2.9953194103254512,4.338274422128148,0.054550517482870875,1.741660591535129,4.995097380061121,3.3906184520617835,2.823582567444337,4.442054354379813,0.5207441420348824,4.851752160104618,4.417507078941741,1.514787918509084,2.074017973770421,4.64218538787909,0.14643760178774223,0.058889966619056766,3.3212146952750854,2.4100653809535446,0.3889241925880871,0.9784599912873582,2.6929808656094556,4.901868772204269,2.6253798857223467,1.7409149495146126,3.461424359291887,4.935076436762323,1.6487120789220644,0.3102042657045945,4.721750525935038,1.020949541468289,4.787396221333761,4.91423378320348,1.4719703152623809,4.665068017783777,1.8904299673547553,3.8114561307595842,2.087670881995055,1.2654480028528892,3.528592860131168,2.8024079137562072,2.4696009233539673,3.497930666395479,1.680512386257672,0.3255971988136275,2.586602331202239,1.0858664428522424,3.9366488105412833,1.797100798448048,4.683467397677969,0.8576394685674171,1.0800386210734414,4.6155944803702456,4.383585433038817,3.9359770130459615,3.58981669033259,3.900567574652124,1.4246835403427627,4.806607765766779,0.8867024917008393,3.731991661421057,3.44450215716828,2.225593720892168,1.104390989831141,2.1097713219778145,1.331229581920187,4.171653505634605,3.792487669607525,3.307752267448624,2.133256191208228,2.407621615885823,3.0067595326728713,2.0724106152840283,2.7496426329307466,4.897205762494355,3.1629350181533002,3.5518292637854088,4.752821659140405,1.2576732361360043,2.1633557812704196,2.8909960076893304,4.729560016727282,3.0539711502145304,3.2396277887769553,2.33941597051028,3.64972274120567,4.6348671769288945,4.84386340070391,1.600239924121053,1.778037385344744,1.487993113277437,1.3427259361122579,0.7929008240488222,0.9458776574743522,4.562494996584068,2.0081467244390225,3.0199042618349434,2.704774446991344,3.1441121570062425,1.493451766343994,0.5640411529811407,4.538475053397577,0.9744364153403884,4.606535808876064,3.4582056942948736,3.161732562456266,3.4081632094134715,0.27622633022484355,3.3149961509560377,0.9200012997224094,0.8496249952805568,4.121993553862952,2.037936440377144,0.13387555249936844,0.4921459656733218,4.790054028765472,2.3163601445910653,0.13421787083000458,4.835259868428416,3.9726262834797934,1.2903180023040328,3.7252386202802654,2.587120731717821,2.4839577495178364,4.228521084547721,1.2066011703166402,3.867073643298954,0.11809237298534003,4.157382261913352,2.9856731393699576,0.533284719745325,2.660305111999437,1.7209519252881644,4.344113234458411,2.777691301355103,4.559809625293296,1.2119889010616702,0.5057745019756266,4.388690198781696,0.5642037862320082,1.4313605886698078,2.7778521193080885,2.028518291287038,1.121286888757761,3.9705880603447605,3.041907247454626,0.4552656095289642,0.4032273701396527,3.65079276197947,4.3253855480368255,1.997820217511147,0.9007576427286679,1.249848661863402,4.483700849670598,0.11397224864090227,0.4363900242364327,0.69762301813867,1.8328886036464853,1.8626939087251482,0.8708453951255546,0.9783307420018317,1.3902598768164487,4.443141006856041,2.4040634257860685,2.3776495030276967,0.797198316896135,2.9469692344512644,1.6955997365167375,4.031678971650699,3.4605491514433098,3.146927027522609,3.606458580930827,2.1284375346790387,4.911046387514277,1.3749616010668697,1.4259727198366245,3.682231888502608,3.4043916867009463,0.3622346429857448,1.7463340558199958,0.5046616838682716,3.002037387380865,3.3639792401615,2.9144613417204646,3.1109651086086574,4.485244741443186,1.417287837822544,0.5052563722644166,3.55370516493853,4.286235390282178,3.6812118587318112,4.051158214666239,2.9184794941755032,1.7059190187510465,2.2311267467770826,4.49434401890133,0.6481467950256214,0.843506856640861,4.368495526845914,4.14109429351443,3.745446078641188,2.2642695931366106,4.753474705107539,1.6916162789011824,2.9424897874119393,4.603494783913542,3.546832935753783,1.241476407051173,3.087511525122768,4.836157612695347,4.72913386542915,2.678398624397349,1.670511450897868,2.653294822009873,4.688447582678561,1.1587936811244037,4.408447930580808,1.6991079980176083,4.552080428367327,2.8440248468146234,0.07594686888489965,1.5141604546534893,0.7666696708698606,3.984839297343111,2.277965760947679,1.541809361023161,0.5679788632441318,4.358834276891427,1.5751029797657723,1.745504040033291,2.6812980291818733,4.075791047634891,2.071812937115649,4.993877074510873,4.868166450452009,0.41934344935100953,3.889267337684441,1.7884460190087659,4.447820292586119,3.4641382230899884,3.6815131920616615,0.795883049753785,1.8872968668459944,3.5459161469481293,2.198749775641713,3.947377216359569,4.238554014998586,2.085917095803891,4.072727106772572,3.6341998859810176,3.9865495230626746,3.279176437639295,4.02977513296193,4.631797441903957,4.366160180208519,4.22248313432325,1.502079518152012,1.1995715263073659,4.256035290136545,4.614122207328305,0.6008007084486244,0.7869508123517077,3.592839561267195,2.511582790149256,3.706841711456036,0.8981326916512489,0.97876310628358,2.3658525519181914,4.773756690759474,4.495367314194595,3.618441969614606,4.247850886141013,1.5411071848051106,3.325838144216217,3.312862871971456,3.1144820163245757,3.0128757753613544,0.6615211876204385,1.3896594470431811,1.8531044995729806,4.389462448726443,3.0828410113543514,4.259640438777782,2.0402459330703437,0.27845196886661205,0.4350164331901085,3.3415560024309543,4.853760969135345,1.6088746063829762,4.579548319773627,3.5427923671030923,2.2313314040465015,4.856305677738196,4.697635283351634,0.763568538884386,2.9947843331681243,4.276865243668145,2.239168122119952,0.8169528655532654,0.7298923192726181,2.794217710426655,4.381144795159163,1.244449295107679,0.4574910947832944,2.9250884175365943,0.5024403067172134,1.3248722480393937,3.194588065823014,0.3578714654813131,1.7323163955731302,4.184439664153631,0.09378286699281646,2.743241722486137,2.2128487736609226,1.694766758011922,1.0991296573416376,1.1456857410350207,1.9963098319291683,0.4944297805800646,4.003344936760566,1.5268616017927827,2.2020508973511124,3.852778789829178,0.2491159041030777,4.444217454055489,3.78142925695244,0.4357337141194184,3.9772930166579243,1.1127825035345773,3.2828827385301587,0.2751067129868967,4.108739878442719,4.366159742132948,0.6380356146594557,0.23827326894186207,0.3179475765571016,1.8249092557432478,2.810364739445678,3.0927181450530328,4.549792371735637,3.39689138861321,4.918469375201853,2.6623838386012624,3.9438982834116265,1.4011536709542949,3.007232575156895,3.810950678779416,4.419035342731188,4.840761089651523,0.8518724052079785,4.560863515423059,0.3489663803922993,3.853471418871578,2.6160259358358884,1.0815522325867843,4.2841020088635595,3.4386140404124275,4.502523969171943,4.615217862620532,1.9996033847302908,4.3078155665404285,2.2366833287003587,0.9321335196472469,0.48074761117229636,4.445189426115719,1.23328866173119,3.2155455813905522,2.0429321742307263,4.5578868730665745,1.5951881214205121,4.854636321463746,4.730087096828422,3.250402008228109,1.1755726704168123,1.717667086732827,3.8994085880229354,0.23665223241135735,1.8402828958946549,3.1552860398798686,4.844190787837381,0.840408692378164,0.27975430472525376,3.1819789736639468,3.2790113580318305,2.823908056249863,2.1049323282274726,4.155952363724417,1.4710798015641258,1.4191898655939283,4.504618905796233,0.7991454213226845,3.4412306051252073,0.6993524338230139,2.3017340458023448,4.39067033794077,4.436589332302776,1.5728856988928697,4.270299135547038,1.859573396399341,0.12393736905188524,4.012536914071555,2.38499541404096,3.198385781910542,4.657083648902621,3.288253257730922,4.427681015348083,0.35986593469162553,3.24290782351507,2.9293553510393733,2.058551247399303,0.7138881419451626,0.52422722602672,4.087234208234165,4.480724310764658,2.253426606129132,1.3858831941131067,1.4493085382070447,0.9070516356239133,4.772747694427231,3.130589286279953,3.1905148303118844,2.7654802428963277,3.1934405292869714,2.9663989743700068,1.21507893183457,0.6876522484452963,3.9236538554136113,1.589453678227859,0.11642534290131179,1.080611064466287,1.6531389395119467,2.033700495231475,4.182465958572078,3.079092227420647,4.445883227672903,0.10509172483399998,4.74749194463353,0.22515484495778337,1.8086321316927512,3.3227507528291422,4.96467174649997,1.9892528286228717,0.9479131970711663,0.28546610910992976,4.302852950376854,1.11458386575781,1.5525581071927386,0.7168858306795844,4.947620580713651,4.065881233098603,4.656751400906625,1.1914654137878333,1.4231950950271433,4.323055678401422,1.8423351380569652,1.7466978213001916,3.797331181611867,1.6692196567844308,3.0190700325328015,0.19718047953761864,0.23025891428887335,4.82995462001587,4.33922647408695,4.342882795460486,2.3684028522154588,3.2889082086483237,0.7332714417964092,1.481856672892381,4.257575837831417,1.622629880649712,4.514631669178617,2.084191685335308,3.704017351895078,0.4847830811548859,3.544254477461104,4.127970628476546,0.8931362773888307,3.6446396318663075,1.6670421451193351,4.300249848877629,3.471307099492061,1.0569038478407056,4.078704711963599,2.9371217820906947,0.44030549944506503,4.396445522740961,3.0779420543769573,0.6330851081593825,2.2857979967097664,1.4476456981298624,3.3621688407845527,2.202923832624508,0.979306644700626,4.850180832439318,0.5753984351169605,1.714161121381611,4.148697544661627,3.9996579852284486,3.1700839494222164,3.852091329215682,4.031321524430221,4.480560587307803,3.97509757912902,2.500432822270491,0.7292248496323239,4.450453294949606,1.9097360915815043,4.884709707041852,3.8268820485990593,3.0005586685847963,4.131202803381581,0.9267447155527775,0.9014949253692972,0.07838996451587033,0.8413264119028574,4.6594947506019535,0.904117720152896,3.1830507467537164,1.8274743219668987,2.2676892341785293,1.024159621198154,2.4362769538809745,0.6718198975629008,4.264997604542752,0.5576951960044152,2.229778979033059,2.3309516222661064,4.290778145235441,2.735515022558219,0.6415647353351583,3.1926843807201175,4.54904640496487,2.5887633437895796,3.6148949416415235,1.0216658663784661,4.181842565975468,3.712603898300487,0.19681311545706626,2.8101104654210616,0.9039118255212397,4.198921002602665,2.018507191442722,3.253446977005349,2.636571293636173,2.6522655238661863,1.3746141211733054,2.1294906747200706,0.8026152129649056,1.4408769424137513,2.4896983680530473,3.058554659181698,1.8174868424660295,0.3349127193856405,2.260384723002069,2.1799882908522528,0.021789466834725157,1.2938245426182005,2.4362451437047783,4.171613584287143,3.244336813871099,2.8696211806188474,1.5495326463974401,3.7983388622863035,4.982644093369947,2.971089285961672,2.5146233385464933,4.291234896945566],"beta":[9.03767188546121,3.680222966787523,8.081221077227383,5.278242529796042,1.1644873889055152,7.625612608646659,5.663459963266211,5.843808453293267,6.5947441229762145,5.693154651928762,6.387574348313372,4.897825198724142,2.914753217407504,0.985099312514579,5.990292893753755,7.065276849730894,3.490941717683773,2.411841029539621,5.090178391567612,5.855964256550998,3.6256509808901405,7.081899219350538,3.045895057345007,2.6551287956064207,5.088859554696699,0.2459369146355339,4.235282313380148,8.723194998403914,1.0441901462318715,7.333956055851378,4.067560463582396,9.017488246213883,7.234460609343634,4.019455956198632,5.630009426281886,3.37476315129025,0.8663649634213311,3.002328410605304,9.57743822282027,0.2018244593183649,7.77324363483859,2.5483640484368197,8.083517015868619,9.255888196270302,9.366492460552095,4.140064745801942,7.572493801021059,4.594143508796654,5.112951911902313,9.415351914912435,8.853086493616988,9.076430737039134,9.407173360529534,5.633167909768064,2.4276040512802455,3.4358845602849453,7.444443432252752,7.559274602850663,5.191868647161,3.0166956998570815,2.279422296303606,4.390911392966263,6.167485597763635,7.156460178918607,0.40221707380685645,7.958450721543109,2.2357687720990005,0.11584337010313916,2.0532249630798627,8.213732082489035,9.51776520362952,0.9557243901054591,0.7376282681094604,5.130054821874614,5.254619593678973,0.5565959180292168,5.4663895066912165,1.762825668319774,5.005714140397981,6.209740390791114,0.49419070157788125,6.7357770321033765,0.42815808287641977,5.867090625944897,8.621471145685497,7.602891463781547,7.197064163337856,5.0327770546294985,9.810159432096937,0.11124837847964253,6.437274862355949,8.866132989719869,3.7637857563698796,6.570757644390288,3.4561496841038886,7.563126110706378,6.898530122544129,7.032146260198968,3.235112951900827,6.03193900485691,7.471647487834748,1.4204169569858016,7.087670503418511,6.810849575557169,8.546663605428561,3.280989900693705,1.2909877686357851,2.421303922895517,6.034927366578824,3.842656445248369,9.934350125488628,5.113320794916987,5.4884017507700245,5.737711583989265,3.8449813586853088,2.0003053150324934,3.5269177819207576,4.735421960190564,8.736403957759254,1.1369415638246827,2.496803903445337,5.295469023160306,1.145777105548238,2.932235843771176,2.760557715019727,6.650927454890598,1.8601774046002184,6.368168100979976,7.825686790037101,1.6611121751704272,1.8806141016273514,3.2670863840245556,3.423850582665251,0.6762031065292473,5.1004241051427375,6.366198408510355,2.4657272922566142,3.5974821791592393,2.155738593556269,9.857708219835722,2.9284223064097104,0.4018401116164583,7.932398138631598,1.1525888955250951,0.6562154231141815,5.0541218922593885,6.571164144306931,6.903079728904277,1.20690925694938,4.710206844617668,0.8104655772968439,2.8109604870299876,9.12203607665533,8.10468706949016,5.7413147769448685,3.325806287991131,4.236685890860841,5.450715185553725,5.0803249199961575,0.02908518976801666,7.074350401935523,5.010573353485206,3.3820186185231282,9.796956030142642,6.391504857791048,6.9901141169607905,9.29206435974929,6.823490971939565,6.249539888247906,7.911799767852186,1.830007881485034,3.1515397112360333,3.7656896512355464,4.574522459952382,4.8615454874918225,7.424220658636762,6.873196734206726,2.217908618568678,8.752572177744453,2.941020326278536,9.054754983765477,6.839238363825815,1.1537811920664787,0.88479943138146,5.43561937142512,1.1986530970972398,7.881900672387772,6.8469708075129265,2.629094523746638,6.819225028393799,9.16043248472793,1.4144974015652334,0.30088737599134996,0.7657951233843874,3.734946400397172,0.48698560576020844,2.3407969205566004,7.457819885200472,5.5351694106926885,7.239067675139152,9.022238590090996,5.185781931993043,1.728730205257707,7.848850647620456,4.822737645140873,0.5291266643196901,1.398680237158516,4.070775688882793,1.6826143122040849,4.8299479860756716,5.060113413624919,6.335277236489054,0.9243383693246776,3.4044493158131917,3.9681972415406164,3.8524223004673486,6.745046206661163,9.981890839566681,5.415173757932427,9.623481394314815,4.147092140556081,9.162865863198986,2.8597636343861743,2.240341536087729,0.07456251386386503,2.4070311235739195,4.422856591055497,3.565265889217366,8.474017359898976,0.344804607597049,7.341548385175123,6.85389689414019,9.250803804883901,7.921776235605222,1.7193828063544547,1.9915219680685836,0.4193427462595878,6.345918938769541,6.577462411749304,4.370613474075531,7.0294314741082236,6.500316031698972,6.039140079331329,4.2920590857771,0.8566449925301889,7.986497041244229,0.1957410450231012,1.4922598403924625,0.413314518820731,5.274374465954654,1.865994412864962,4.928117429569376,8.656853529025447,8.277307806356456,5.2964522893442245,9.857647742667524,0.3319286213044981,8.353253254159904,3.4961433640521844,9.58462659530393,9.458794287564674,3.787350994595189,1.4860310315518555,8.922125241408946,5.2726069503641355,8.352940836151753,9.490285229172803,0.922850932545658,8.492497845882399,8.072079524525456,4.341259180282311,9.160279953874447,0.9036345314110772,7.002725009156379,3.6657105157146685,9.911283763897874,9.599550855710117,8.711322220415806,2.0304782570024593,2.320234663754488,3.9735770976376883,1.701417757859991,8.331502174570728,2.371413496970627,9.626272131736958,1.0039598003476224,9.984176952780757,1.4400568448023576,8.698323456924497,5.956114962726451,2.6716366301589223,6.343932030815418,3.183936641880638,6.57505413635487,9.631753188681857,1.2129241564223037,6.58752588961587,1.6943237711780856,2.9283522875823698,7.416207384398095,1.2723774886812933,0.4381667393162192,5.421913283168218,3.3254337999052175,7.183557882764767,9.405560197536683,8.547417335414245,5.794529922896552,0.8439102819229682,6.9599520692390175,3.1329267823100326,5.667173404524897,2.775743378072022,5.464711931889427,6.810780329855477,7.116106683065233,9.581623813378005,5.773546311373825,4.081874063111841,3.7566446862111214,8.41789061452246,8.26303678105646,8.937419609338324,5.24139396162707,7.361629373351826,8.341357972348458,8.219879096424359,9.369721518055735,9.315863045731717,0.13926430218802466,3.713227726391497,9.50095108628254,6.18656725090363,9.543669980139121,5.092179955158221,4.267404019142223,7.324597546463691,8.096895220461276,4.683156159963016,1.4112570794858148,0.4337118555243191,4.685137731700355,1.8171638388408495,1.7702738980959576,8.623877153758912,5.597613628098969,8.962549852100526,7.396319563826377,6.40148929326017,2.193709639643804,1.331804015468283,1.647538962850399,8.439076350795107,8.482871915804683,5.708604777371969,4.616808767280132,3.8253523009609203,0.3074793967813161,8.27478570089809,7.5490237703837515,1.9174690836491326,1.7385165955166926,1.5021335670811187,7.1716962805804085,7.121730825842532,7.117288501074701,0.921032694693471,7.340659391594988,7.578419332623241,3.7851709494790065,4.219584719935277,5.6888890458935375,3.9474974654292705,4.980858301117433,0.9834050207363676,8.095436081400349,8.643933189912492,9.65267245917294,3.1219966000879618,8.452187496940926,3.3542114111484844,6.777029546731423,3.6694732703965083,3.372597789116951,0.14026936507312016,5.176835333050969,5.507163205674718,9.082731748935641,1.494739186834766,1.0282788530295428,0.8613582693981914,4.396715045267337,5.639413534647697,7.622578577807289,3.3081207257395118,3.5622501512978944,7.468159776631998,2.3435133914419604,7.374332454264474,2.9070376936442988,8.465814367252547,3.051122992248807,1.069766079053991,7.874608885849971,1.3588240243163563,9.377235045303426,4.348220710731717,6.0339035582079,8.67091227407759,4.731205459758712,7.433613194879252,9.004167289294509,5.646204359554292,8.537948904490587,4.046672441702239,9.02559652005008,0.48495945040622157,0.24662738971382714,8.807317876553451,2.920690832009405,9.461685267632769,6.152891287396898,1.8887612949508648,8.76392114036854,0.8145282442052415,7.838064820527113,7.899513742517989,7.733177171332031,5.74298501846588,7.170536971295991,7.739494457484621,0.41614727648689565,6.771894918801178,2.5174134166004514,0.10428560662782749,6.410234989712427,7.7870612186887245,6.033888830994956,2.606789212513747,4.790720584598748,1.8215939431454742,6.411003988878363,6.0288099152162005,0.9903770516202948,2.1354667084524914,9.517678329144095,2.644953942748618,9.755745925024328,3.544788649663826,3.549412205946607,4.733453206330855,3.864281869581474,9.204685646198554,5.181878350141973,1.2759863662403226,1.024379646958491,1.1655586420017294,7.328127532374101,4.3012454014813395,8.964130532168603,4.859920038284735,5.982529074301506,8.514139245228442,7.035454163425163,1.3035665469289759,6.605370661636869,1.5293438412332683,3.348440186792705,0.0019603697739567494,1.4984503249158165,3.857297457505624,9.930469648297077,4.573268410106932,1.472256611244489,9.548670509869554,7.557891048994609,1.510792918060353,8.19990752240422,4.625069825328387,7.31516284582896,2.253404220581956,7.439640692109977,6.265578266398522,0.9319976566195587,0.15857141989802148,1.2460220769591457,7.88403751605127,0.952352064023887,4.879571815768249,1.9290378133448804,7.527490935981769,6.852402528863745,0.10934374989763462,2.969634860890795,1.129429151039485,3.3858087560768513,5.785321612352538,2.0729907261305014,1.7537804895194942,3.169655456243834,8.826629855976352,2.7116506754012493,2.7728355302492624,7.899077912787902,2.432695034737402,4.322028916692946,5.048186585346834,4.622388714095753,7.908509782475248,9.45582023704266,0.7655762065121174,6.664621361034562,4.646374220985776,6.479803533673348,6.547623199980979,5.8595033349499515,5.925955251246862,2.8932626738253187,4.545322052440877,7.643888464945279,5.112608548475706,8.632874481917023,8.7421787825201,6.452496452925855,1.5611232481303627,0.9969127979898618,3.039544418617244,6.329314928242664,8.685499250309917,2.1579861581501802,4.179674175777004,4.522344589986746,3.0111602942310545,8.032853557593338,3.7166122099585275,9.153227536878637,3.757222520263701,5.149223286261078,3.7680022980347427,9.25435365087103,0.5196146422044357,0.7617609888286858,6.336155481501926,5.783930302518963,3.333219740291662,1.0794379852009328,8.488172597659114,5.68829666395712,0.4624636205726951,6.436725187656234,4.243267125217156,4.602651957557713,1.0094781853596602,1.2635131369808672,5.338282878004332,9.36752517056166,6.9311821904807385,1.6107951783150631,8.217789776816137,4.56325477533726,0.0249193205176379,6.969749450540652,0.3443155638827866,7.08402922814307,8.160268284251217,9.868504762241571,5.4400483714815735,8.505543865623276,9.943775499043479,8.344256865902835,4.063147557832563,5.806839819001153,6.987462156401989,5.784715711188362,6.985896501442834,0.8508510872082375,0.1260694507826421,9.188740291587473,3.768164376299936,5.684064489131229,4.596070362326071,9.43813755928812,4.1631005918623405,1.2710389182032156,2.5779688099222975,8.991507420338834,0.8527375362913303,6.84915741757258,6.556914149936846,3.0887345631370855,4.502545873601349,8.465193451429835,9.802110517600521,3.2138074922257154,5.430934286248821,7.559525060150554,9.105534897398474,6.188460174380981,4.972078214379887,9.935109115509551,8.30584400621451,3.1619750544826264,6.4008475755815315,5.466078887521595,8.933018150589795,6.784429552958871,3.138593993701453,6.860463410940632,5.4182793765209265,8.09041818429845,9.555281903766426,2.678943306850654,7.367194944607959,6.308587419261176,6.72698760414648,3.319520029147507,7.503352277028581,0.9972642137159404,6.646592314620521,9.551862031223797,1.5477067035747094,5.223052604586169,9.319745085718573,8.165016765017448,9.362304879019767,8.91906171146755,9.974676015640645,6.3995290154862765,4.722031220312859,9.184623312313938,9.2498802776484,6.796748022300523,7.556338544883294,3.2139643148828023,8.55197545680233,3.426212973269518,0.4159694082089205,4.84898496607541,6.846372817458888,0.8121841835163668,0.8071462820313235,6.550478759395963,6.848963830540411,3.3287507642604885,7.949646208543264,6.308352472167034,4.290923939806817,8.22532901943685,8.166788117960714,9.256351041492422,6.677876231507214,9.9279095855003,5.456962848718705,4.286448001234717,2.2006719123201557,4.540504088341151,1.0711387843527898,9.01709814191944,0.47343594306258563,1.0748247345078887,4.154582867385328,1.1582974535205048,9.22983441332397,5.130851194172958,7.251827984016643,2.0573881850072118,0.6138857369659334,2.180746316308324,7.622342100451991,3.3852415027691274,1.831128891148115,2.0864129610140925,5.3426009808174975,9.392386594676612,9.984411237085624,6.669007815509962,1.7600751191518182,0.26526724449143835,5.360301401386938,7.847815827163287,6.9947788537638145,3.37054572730769,7.8994630272684185,6.188467166541162,6.318706423129137,0.1207735214479011,7.453528688706433,2.227864989081789,3.6333416698230403,6.1918747894552295,4.247495610218501,2.6486599212520434,0.513325618799414,6.075024302953254,9.087917898025937,9.547906017334782,5.289668825458371,8.131645898972032,4.735152073130173,6.417279478765893,1.3240162600943806,7.422208336777951,9.752258002275289,7.757104428659014,9.45919550585927,3.4628258838221226,1.6093437775737351,0.865469867416977,4.800760895287475,9.105304447896899,1.4377401646738286,7.099838348778896,3.7063293879504577,9.25405789826089,6.4930536760892394,3.7487899334486174,3.4771412250372236,5.581550285967212,0.65485321330506,5.121837227558387,7.779226949855773,6.886075064345183,9.363869975365322,6.791972244530051,4.167592385294363,3.7494137762491553,1.1209544518277759,5.427272975464268,2.588359851527602,8.83500621480964,3.615231921419013,7.325593572104765,1.9104139252309937,3.7644244283867456,6.150354058900513,1.0818387756536696,2.289689484144226,0.46952502416683695,1.8289795350877824,5.046277832915695,4.230233791804641,2.9099916474656284,2.1251715383085634,4.365259517172955,9.355836983122066,7.18614789634697,8.954042370070784,1.0697894994191492,8.66141600923342,7.218173325655175,5.7229228680275135,8.040580909613016,1.3655037387946445,0.27061619077244137,7.449900618298731,1.5653857036668306,3.254933101622821,7.23071775561033,1.7699332095232156,4.718443989298205,7.911859706147977,5.698044547592569,2.7664077122700004,6.612634037355534,8.213003176012734,2.9137548109545097,8.034796346540345,9.714454753680474,2.8434828609162044,9.438150123473907,2.1439911960822977,9.165363175800996,8.707792295907865,7.889222138057541,4.936855855114892,9.519894700687246,4.151414776723865,1.8161678269222503,4.476726025474487,8.036453570381974,3.5536858087100387,1.1512308117901449,8.099090989920839,3.415774298142482,9.997404476182627,8.091289767296326,8.868292185517028,5.792999220187125,0.11303679641345932,1.952990246122266,1.013735283496433,2.6761355189558644,7.681797683129963,2.308787492475146,2.7423110797829597,0.05432476005363007,8.316422239751375,7.7513599654139975,3.0567220360729763,0.17386826146805756,3.299374667534418,0.6451764995977483,2.761868361143449,2.9608604895037804,7.313720682179952,5.436216831219685,6.953499993084713,9.50839063217729,3.006746180212534,4.099628006068374,3.6547938743581088,5.664713173985099,5.795187449582706,7.367868934951143,1.5055573343986062,7.311125220516674,8.495604051653752,6.459031660265222,9.032740900216494,9.499791218624697,9.146118740471945,2.06447715849313,9.105708222845546,0.9037971857794291,6.011000439910497,5.65377654749847,1.4999829946416976,7.678763516189912,4.563775251365049,5.879598592215922,8.1236343762179,7.069291853092425,4.912152560151021,6.680558030557478,2.489063522793664,3.0055227590473343,7.100438214688758,6.201232298387637,7.955259146532283,3.519447278054675,9.52190854348899,0.48263236054256975,1.7417775024601756,8.023805197735571,4.727975531886943,3.0408976858273173,9.820019586692194,6.677635867999038,6.573673808299256,0.7821692385876311,6.769190435967445,1.4013714546701128,8.842688423132346,2.4934291409244924,5.722600520765813,9.898028110134135,9.907221629235742,2.586368472864129,5.6899080923045116,7.850058740173871,1.2439339601617672,7.874268633999362,1.784211885600735,0.9009418002799796,3.9294872775422696,2.3501915175063615,2.2468868754882476,9.280613646623735,9.25417624780643,5.254365047862867,8.216120869278353,5.707561684000002,2.545194957141703,6.4700708849268835,6.364197245959011,8.120358707050123,6.564052699898079,4.319812566623185,9.48688300029778,4.84129793859184,3.2788283265854368,1.8200639678989927,7.456736974548718,8.623176016424456,6.686201471464059,2.86162181894837,4.63416789173473,8.018434239726165,9.33915391979481,0.0041473879525089075,4.345078298614324,9.889743001256289,8.893804639548954,9.876983758547679,4.213343230938468,7.082303381450473,7.953504742510431,6.125874251842305,3.8432200626444746,2.097107932901119,6.421944236736039,9.083624398873965,6.607493116686429,6.859993219588558,7.81245662198727,1.3410788525898387,4.553301917538368,5.62262125903586,0.0793501327738988,5.336001830018812,4.309227829597367,3.7908424877784563,2.924855825293413,9.056042613641939,9.826916756882667,8.058659376510901,1.9559017541673862,2.3655469271536544,2.796617325675683,6.737325267656047,0.8217319982059168,2.547402502655083,7.45427577430087,8.695967457645178,4.328216730083623,9.085489565628393,1.1816119899296385,5.121163095539574,7.700820035550093,7.794990235888008,8.135651404010037,0.6514040228737583,1.796563688428665,2.5126516890701422,1.9606240721166746,4.634140921421983,8.130585273198538,8.46052301284147,7.0536828316316,5.943473561560815,2.567146173647825,1.280510422870682,5.156678163359265,4.433536892246841,1.9665809421943714,6.842758053454503,7.1847802067001005,7.632421967419574,8.429304979198633,3.1072146427856095,7.321258976432404,0.27920165106812833,0.5231568729437108,5.583139798972034,1.987545709319689,9.043367835635632,1.5479596404159723,7.923990287201519,3.0769755718162495,8.352154225155136,4.0127743509943326,5.3943118215801,7.8763282554249,9.16017191916334,1.7065270072564376,6.333046473652835,9.349033051492047,4.066593482167358,7.286129200818314,2.6329750933117335,5.6972606181680945,4.451819976093532,9.3393966365505,2.768066976226957,7.207375904585143,8.580962259821515,4.1376004586679755,0.03226903222176336,2.7734939260353375,3.404015031358907,8.890072104597026,8.914627611015877,7.797931110255993,3.9524279413921404,8.222844606465147,5.845096447785629,7.632251257782528,5.090377450263299,5.784976024544537,0.018800655750796924,3.2542455059954145,8.31184284903692,2.136658764802426,8.170864689914243,7.718495244245767,9.485500313997871,4.317123338936224,6.8438932536060015,9.62296178958759,5.020239735791527]}
},{}],31:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logpdf = factory( 0.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `-infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.5, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `-infinity` when provided `-infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.5, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 2.0, 0.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 2.0, -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 2.0, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha < 0` , the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0, 0.5 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, 1.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, PINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NaN );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `alpha` equals `0`, the created function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 2.0 );

	y = logpdf( -2.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to 0' );

	y = logpdf( 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var logpdf;
	var alpha;
	var delta;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 900.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large shape parameter `alpha`', function test( t ) {
	var expected;
	var logpdf;
	var alpha;
	var delta;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large rate parameter `beta`', function test( t ) {
	var expected;
	var logpdf;
	var alpha;
	var delta;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/logpdf/test/test.factory.js")
},{"./../lib/factory.js":22,"./fixtures/julia/both_large.json":28,"./fixtures/julia/large_rate.json":29,"./fixtures/julia/large_shape.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-eps":121,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135,"tape":194}],32:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/logpdf/test/test.js")
},{"./../lib":24,"tape":194}],33:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var logpdf = require( './../lib' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `alpha` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = logpdf( NINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `alpha < 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `alpha` equals `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = logpdf( 0.0, 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to 0' );

	y = logpdf( 1.0, 0.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -1.5, 0.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( PINF, 0.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( NINF, 0.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( NaN, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 900.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/logpdf/test/test.logpdf.js")
},{"./../lib":24,"./fixtures/julia/both_large.json":28,"./fixtures/julia/large_rate.json":29,"./fixtures/julia/large_shape.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-eps":121,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135,"tape":194}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"./abs.js":34}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{"./ceil.js":36}],38:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":99,"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/base/utils/float64-to-words":115}],39:[function(require,module,exports){
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

},{"./copysign.js":38}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":55,"@stdlib/math/base/special/kernel-sin":57,"@stdlib/math/base/special/rempio2":77,"@stdlib/math/base/utils/float64-get-high-word":103}],41:[function(require,module,exports){
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

},{"./cos.js":40}],42:[function(require,module,exports){
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

},{"./expmulti.js":43,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":88,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],43:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":59,"@stdlib/math/base/tools/evalpoly":92}],44:[function(require,module,exports){
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

},{"./exp.js":42}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"./floor.js":45}],47:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":95}],48:[function(require,module,exports){
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

},{"./gamma_lanczos_sum_expg_scaled.js":47}],49:[function(require,module,exports){
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

},{"./small_approximation.js":51,"./stirling_approximation.js":52,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/floor":46,"@stdlib/math/base/special/sin":83,"@stdlib/math/base/tools/evalrational":95,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pi":134,"@stdlib/math/constants/float64-pinf":135}],50:[function(require,module,exports){
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

},{"./gamma.js":49}],51:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":122}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/pow":69,"@stdlib/math/base/tools/evalpoly":92,"@stdlib/math/constants/float64-sqrt-two-pi":137}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/ln":61,"@stdlib/math/base/special/sinpi":85,"@stdlib/math/base/special/trunc":88,"@stdlib/math/base/tools/evalpoly":92,"@stdlib/math/constants/float64-pi":134,"@stdlib/math/constants/float64-pinf":135}],54:[function(require,module,exports){
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

},{"./gammaln.js":53}],55:[function(require,module,exports){
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

},{"./kernel_cos.js":56}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":92}],57:[function(require,module,exports){
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

},{"./kernel_sin.js":58}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"./ldexp.js":60}],60:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":39,"@stdlib/math/base/utils/float64-exponent":97,"@stdlib/math/base/utils/float64-from-words":99,"@stdlib/math/base/utils/float64-normalize":107,"@stdlib/math/base/utils/float64-to-words":115,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-max-base2-exponent":128,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":127,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":131,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],61:[function(require,module,exports){
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

},{"./ln.js":62}],62:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":92,"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/base/utils/float64-set-high-word":110,"@stdlib/math/base/utils/float64-to-words":115,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-ninf":133}],63:[function(require,module,exports){
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

},{"./log1p.js":64}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":92,"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/base/utils/float64-set-high-word":110,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],65:[function(require,module,exports){
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

},{"./max.js":66}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],67:[function(require,module,exports){
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

},{"./min.js":68}],68:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],69:[function(require,module,exports){
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

},{"./pow.js":72}],70:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":92,"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/base/utils/float64-set-high-word":110,"@stdlib/math/base/utils/float64-set-low-word":112,"@stdlib/math/constants/float64-exponent-bias":123}],71:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":92,"@stdlib/math/base/utils/float64-set-low-word":112}],72:[function(require,module,exports){
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

},{"./log2ax.js":70,"./logx.js":71,"./pow2.js":73,"./x_is_zero.js":74,"./y_is_huge.js":75,"./y_is_infinite.js":76,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/sqrt":87,"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/base/utils/float64-get-low-word":105,"@stdlib/math/base/utils/float64-set-low-word":112,"@stdlib/math/base/utils/float64-to-words":115,"@stdlib/math/base/utils/uint32-to-int32":118,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":59,"@stdlib/math/base/tools/evalpoly":92,"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/base/utils/float64-set-high-word":110,"@stdlib/math/base/utils/float64-set-low-word":112,"@stdlib/math/base/utils/uint32-to-int32":118,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-ln-two":126}],74:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":39,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135}],75:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":103}],76:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-pinf":135}],77:[function(require,module,exports){
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

},{"./rempio2.js":79}],78:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":46,"@stdlib/math/base/special/ldexp":59}],79:[function(require,module,exports){
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

},{"./kernel_rempio2.js":78,"./rempio2_medium.js":80,"@stdlib/math/base/utils/float64-from-words":99,"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/base/utils/float64-get-low-word":105}],80:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":81,"@stdlib/math/base/utils/float64-get-high-word":103}],81:[function(require,module,exports){
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

},{"./round.js":82}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{"./sin.js":84}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":55,"@stdlib/math/base/special/kernel-sin":57,"@stdlib/math/base/special/rempio2":77,"@stdlib/math/base/utils/float64-get-high-word":103}],85:[function(require,module,exports){
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

},{"./sinpi.js":86}],86:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/copysign":39,"@stdlib/math/base/special/cos":41,"@stdlib/math/base/special/sin":83,"@stdlib/math/constants/float64-pi":134}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{"./trunc.js":89}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":37,"@stdlib/math/base/special/floor":46}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{"./evalpoly.js":90}],92:[function(require,module,exports){
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

},{"./evalpoly.js":90,"./factory.js":91,"@stdlib/utils/define-read-only-property":139}],93:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35}],94:[function(require,module,exports){
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

},{"./evalrational.js":93}],95:[function(require,module,exports){
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

},{"./evalrational.js":93,"./factory.js":94,"@stdlib/utils/define-read-only-property":139}],96:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":103,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-high-word-exponent-mask":125}],97:[function(require,module,exports){
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

},{"./exponent.js":96}],98:[function(require,module,exports){
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

},{"./indices.js":100}],99:[function(require,module,exports){
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

},{"./from_words.js":98}],100:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],101:[function(require,module,exports){
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

},{"./high.js":102}],102:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],103:[function(require,module,exports){
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

},{"./get_high_word.js":101}],104:[function(require,module,exports){
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

},{"./low.js":106}],105:[function(require,module,exports){
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

},{"./get_low_word.js":104}],106:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],107:[function(require,module,exports){
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

},{"./normalize.js":108}],108:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-smallest-normal":136}],109:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":102}],110:[function(require,module,exports){
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

},{"./set_high_word.js":111}],111:[function(require,module,exports){
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

},{"./high.js":109}],112:[function(require,module,exports){
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

},{"./set_low_word.js":114}],113:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":106}],114:[function(require,module,exports){
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

},{"./low.js":113}],115:[function(require,module,exports){
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

},{"./to_words.js":117}],116:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":100}],117:[function(require,module,exports){
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

},{"./indices.js":116}],118:[function(require,module,exports){
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

},{"./uint32_to_int32.js":119}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{"./define_read_only_property.js":138}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){

},{}],142:[function(require,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"dup":141}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"base64-js":140,"ieee754":163}],145:[function(require,module,exports){
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
},{"../../is-buffer/index.js":165}],146:[function(require,module,exports){
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

},{"./lib/is_arguments.js":147,"./lib/keys.js":148}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],149:[function(require,module,exports){
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

},{"foreach":159,"object-keys":168}],150:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],151:[function(require,module,exports){
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

},{"./helpers/isFinite":152,"./helpers/isNaN":153,"./helpers/mod":154,"./helpers/sign":155,"es-to-primitive/es5":156,"has":162,"is-callable":166}],152:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],153:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],154:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],155:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],156:[function(require,module,exports){
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

},{"./helpers/isPrimitive":157,"is-callable":166}],157:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){

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


},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":160}],162:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":161}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{"./isArguments":169}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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
},{"_process":143}],171:[function(require,module,exports){
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
},{"_process":143}],172:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":173}],173:[function(require,module,exports){
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
},{"./_stream_readable":175,"./_stream_writable":177,"core-util-is":145,"inherits":164,"process-nextick-args":171}],174:[function(require,module,exports){
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
},{"./_stream_transform":176,"core-util-is":145,"inherits":164}],175:[function(require,module,exports){
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
},{"./_stream_duplex":173,"./internal/streams/BufferList":178,"./internal/streams/destroy":179,"./internal/streams/stream":180,"_process":143,"core-util-is":145,"events":158,"inherits":164,"isarray":181,"process-nextick-args":171,"safe-buffer":188,"string_decoder/":182,"util":141}],176:[function(require,module,exports){
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
},{"./_stream_duplex":173,"core-util-is":145,"inherits":164}],177:[function(require,module,exports){
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
},{"./_stream_duplex":173,"./internal/streams/destroy":179,"./internal/streams/stream":180,"_process":143,"core-util-is":145,"inherits":164,"process-nextick-args":171,"safe-buffer":188,"util-deprecate":200}],178:[function(require,module,exports){
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
},{"safe-buffer":188}],179:[function(require,module,exports){
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
},{"process-nextick-args":171}],180:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":158}],181:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],182:[function(require,module,exports){
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
},{"safe-buffer":188}],183:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":184}],184:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":173,"./lib/_stream_passthrough.js":174,"./lib/_stream_readable.js":175,"./lib/_stream_transform.js":176,"./lib/_stream_writable.js":177}],185:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":184}],186:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":177}],187:[function(require,module,exports){
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
},{"_process":143,"through":199}],188:[function(require,module,exports){
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

},{"buffer":144}],189:[function(require,module,exports){
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

},{"events":158,"inherits":164,"readable-stream/duplex.js":172,"readable-stream/passthrough.js":183,"readable-stream/readable.js":184,"readable-stream/transform.js":185,"readable-stream/writable.js":186}],190:[function(require,module,exports){
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

},{"es-abstract/es5":151,"function-bind":161}],191:[function(require,module,exports){
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

},{"./implementation":190,"./polyfill":192,"./shim":193,"define-properties":149,"function-bind":161}],192:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":190}],193:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":192,"define-properties":149}],194:[function(require,module,exports){
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
},{"./lib/default_stream":195,"./lib/results":197,"./lib/test":198,"_process":143,"defined":150,"through":199}],195:[function(require,module,exports){
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
},{"_process":143,"fs":142,"through":199}],196:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":143}],197:[function(require,module,exports){
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
},{"_process":143,"events":158,"function-bind":161,"has":162,"inherits":164,"object-inspect":167,"resumer":187,"through":199}],198:[function(require,module,exports){
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
},{"./next_tick":196,"deep-equal":146,"defined":150,"events":158,"has":162,"inherits":164,"path":170,"string.prototype.trim":191}],199:[function(require,module,exports){
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
},{"_process":143,"stream":189}],200:[function(require,module,exports){
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
},{}]},{},[31,32,33]);
