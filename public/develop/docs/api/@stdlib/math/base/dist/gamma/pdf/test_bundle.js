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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the probability density function
*
* @example
* var pdf = factory( 5.0 );
*
* var y = pdf( 0.0 );
* // returns 0.0
*
* y = pdf( 5.0 );
* // returns Number.POSITIVE_INFINITY
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return nan;
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated probability density function
	*
	* @example
	* var y = pdf( 10.0 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : 0.0;
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":20,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-pinf":135}],19:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/degenerate/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/degenerate/pdf' );
*
* var y = pdf( 2.0, 0.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/math/base/dist/degenerate/pdf' ).factory;
*
* var pdf = factory( 10.0 );
*
* var y = pdf( 10.0 );
* // returns Number.POSITIVE_INFINITY
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":18,"./pdf.js":21,"@stdlib/utils/define-read-only-property":139}],20:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid degenerate distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = pdf( 3.14 );
* // returns NaN
*/
function pdf() {
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{}],21:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated probability density function
*
* @example
* var y = pdf( 2.0, 3.0 );
* // returns 0.0
* @example
* var y = pdf( 3.0, 3.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var y = pdf( NaN, 0.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, NaN );
* // returns NaN
*/
function pdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : 0.0;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-pinf":135}],22:[function(require,module,exports){
'use strict';

// MODULES //

var degenerate = require( '@stdlib/math/base/dist/degenerate/pdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var gammaDeriv = require( './gamma_p_derivative.js' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 3.0, 1.5 );
*
* var y = pdf( 1.0 );
* // returns ~0.377
*
* y = pdf( 4.0 );
* // returns ~0.067
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
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( -1.2 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 || x === PINF ) {
			return 0.0;
		}
		return gammaDeriv( alpha, x * beta ) * beta;
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./gamma_p_derivative.js":23,"./nan.js":25,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/degenerate/pdf":19,"@stdlib/math/constants/float64-pinf":135}],23:[function(require,module,exports){
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
* Gamma distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/gamma/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/gamma/pdf' );
*
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.054
*
* var myPDF = pdf.factory( 6.0, 7.0 );
* y = myPDF( 2.0 );
* // returns ~0.026
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":22,"./pdf.js":26,"@stdlib/utils/define-read-only-property":139}],25:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid gamma distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = pdf( 3.14 );
* // returns NaN
*/
function pdf() {
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{}],26:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var gammaDeriv = require( './gamma_p_derivative.js' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.054
* @example
* var y = pdf( 0.1, 1.0, 1.0 );
* // returns ~0.904
* @example
* var y = pdf( -1.0, 4.0, 2.0 );
* // returns 0.0
* @example
* var y = pdf( NaN, 0.6, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, 1.0, NaN );
* // returns NaN
* @example
* // Negative shape parameter:
* var y = pdf( 2.0, -1.0, 1.0 );
* // returns NaN
* @example
* // Negative rate parameter:
* var y = pdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function pdf( x, alpha, beta ) {
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
		return 0.0;
	}
	if ( alpha === 0.0 ) {
		// Point mass at 0...
		return x === 0.0 ? PINF : 0.0;
	}
	return gammaDeriv( alpha, x * beta ) * beta;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./gamma_p_derivative.js":23,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-pinf":135}],27:[function(require,module,exports){
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
module.exports={"expected":[1.7817194147788455e-11,3.308178034090448e-13,1.3123476351699255e-15,1.022167513888721,3.926734709981621e-5,0.02283038357123311,0.09277732468095128,1.9360105207984478e-29,5.567709859690765e-10,0.4526203564170599,1.7147538808345492e-8,3.3921896681894842e-15,1.1804633308132058e-8,2.184434921369261e-15,9.614180931187872e-20,2.8722045351473346e-9,3.80867145009127e-10,0.00011046433484004643,0.05147362213995726,1.1376188116131628e-6,1.0537406600249076e-19,2.6390809432281145e-20,1.0467729631921528e-14,6.722446847529233e-13,5.084388706483358e-5,1.1783775322972992e-5,0.01039354169192418,1.9528324251461144e-5,1.04371094184912e-7,0.08661599254314385,1.929592378344565e-26,0.00024035266338257925,0.00027433440891363076,6.829842045642225e-14,0.12679814146492593,0.0008754654577251636,5.388919178081094e-20,0.010455640668038953,2.202020476257011e-6,1.7421732889762808e-6,1.0635670169096745,2.949379403319907e-11,2.2106197710619765e-7,5.6629723986220585e-18,2.7482503471053686e-12,1.345074192741121e-33,9.994035571243125e-7,0.711329131200586,7.003910535524651e-8,0.0005472042645634107,0.00010462217289950918,2.5444259760103514e-12,1.4957805088233204e-16,1.1943643936676854e-35,5.74965126154749e-13,0.5223948324561917,0.00031126694289846746,2.895536707490974e-9,0.00026878681189236033,1.613746422174562e-13,8.900620837235716e-24,1.1837851686062193e-5,1.6972699443537873,9.26983328460339e-6,9.69146121035833e-16,0.2216709460412164,2.106438673595915e-8,1.951292142386857e-12,2.105483820642593e-12,5.421277644290279e-19,1.2491579390982834,2.6327381836946453e-16,3.6249613311840724e-7,3.5734261444911384e-6,3.004011718596164e-11,7.006790387616651e-30,1.750369376539263e-12,3.092552154083681e-5,0.0021486146531462537,1.151719376351619e-12,7.803424591839117e-10,3.083769577473629e-10,0.9692359867085321,1.1300618462774574,1.892649492680255e-17,5.927823651652206e-15,2.2227376803464368e-33,0.0011367656901058296,0.030020708085724285,1.3184817123918617e-14,0.4970154786665089,0.9124587860918849,2.8362486148872834e-5,1.3804876992060404,0.03204063438382679,0.00017102521459889854,7.245762826729113e-7,5.465965013742223e-7,2.6825849136569335e-6,6.411287135663653e-31,0.9420425075854097,0.06467465450838247,0.5768351683554176,4.555280512355326e-8,3.239742038286993e-12,4.5570713252470574e-8,0.00292635127868346,2.974317574098876e-31,0.008748976843092221,0.0020740748779263557,1.511019759666034e-41,1.8388368204422343e-16,2.4645402174505858e-5,0.44020806732128465,0.00015680153777531964,0.006108590791778901,0.3348996748337429,9.592372925506121e-5,0.26342702518640604,0.34783430485960465,0.002446807631885688,0.7404227514257431,0.14797490472578345,0.0007796567102183718,2.984030867377536e-11,3.3185113039170506e-7,0.061435217546969796,8.011897590464359e-5,2.166188176243848e-17,2.0183947469477967e-23,0.30709141719287336,5.487050745466386e-25,1.6141436077069111,6.822766437509444e-27,1.9038697582698484e-26,4.41212566443303e-7,0.02334125768163452,0.00048537173158999075,0.08024870590710526,0.003107884070457331,1.5583716384744701,4.154230820568885e-16,1.3312067922412559e-6,4.795150137019374e-19,1.1435391570507404e-5,1.0345531123652025,4.5642816077262994e-26,6.542917928268553e-8,0.22761754178090893,1.5696869682917363e-15,6.846961083815622e-11,0.043472055215638114,0.014014974214380891,0.3784154010863123,4.905170670028494e-6,0.0012509275682762628,0.023358903835009426,4.7396225562948304e-35,8.347384317506866e-8,0.0008099843405984901,0.26814990282883927,0.00010620228717777717,1.9250219469180311e-35,1.3530066878200309,0.014612805216230377,2.8897041976290073e-5,2.9952545372649767e-13,0.030433644967032557,7.978871740610551e-27,0.0773334175942463,0.00015898443303385992,2.7060170448454557e-35,3.927994437328261e-15,0.05069754407033239,0.9924494274437113,0.180267522579089,0.06681353296327601,5.70342001682863e-20,1.5982774999403144e-28,0.5402303040191738,3.39332883571092e-28,0.004410649136111285,6.428660099699956e-10,3.475755677835217e-24,2.997264019133352e-34,2.6509075636242634e-11,1.0343683667258743,6.964490238262042e-5,0.42766845049748214,3.097557901948474e-14,4.871722480085063e-10,0.04750907455598149,8.052583456861904e-20,4.5990284350449375e-14,9.688498867082187e-6,4.9768037549274906e-20,0.018513470473180086,4.281811070462638e-34,1.9154181261810955e-11,1.8233521391191026e-9,4.7139161282292875e-16,0.0802150188202144,1.4913634283220327,5.949421458429113e-11,2.1958915692792222e-7,1.4238558401496856e-5,0.17439525643276413,6.929781423973199e-15,0.00017197485643938166,0.002443287570259344,2.8745781325513022e-6,1.3963161517146184e-10,6.623570473898004e-24,1.0101121654018521,1.7146019224552838,0.0010311772915776152,2.595007562346952e-27,8.362408724176572e-15,1.402619301531858,8.171762303837479e-12,0.25139145190618717,0.00785326216841933,0.0825438671483156,0.0009552292958794107,4.789242033023998e-13,3.9093502960650306e-7,1.4643047538128144e-20,6.621001973711723e-7,3.599830621757143e-5,1.824974413287354e-16,1.1741979810690006,2.8389271848032255e-10,0.008973345637870143,4.708265727424071e-40,1.3903807689074023e-14,2.6785589401285595e-6,2.4964461847435534e-18,5.2418050258198215e-11,1.8137298536257567e-26,0.3158658869207191,1.241872291373601e-18,1.8297162660743868e-9,1.0209196127508302,1.738614431262434e-15,6.339797767098447e-27,3.557214893021525e-19,4.862645289699164e-25,0.006153064810873187,4.919802451635802e-18,1.3378204420239939,0.2003417293616476,4.367463639869124e-9,1.5050865950745714e-5,0.26670164785402817,4.303264384470319e-10,3.9603988222503666e-23,1.9674635835273816e-15,4.697412857024649e-10,8.918328955422466e-12,6.749073152605485e-5,4.868813152618707e-18,0.08244343690842397,1.755788248555613e-16,8.367244529056087e-17,1.0320314796983819e-5,3.1619555621173607e-7,0.0011744153787071187,6.999447243108683e-7,0.27574383860216706,3.2272014692687578e-9,2.7430637382864344e-7,1.0863890183105829,1.2420884150735971,0.005317943384129134,4.077012069808262e-25,1.2028398650276977e-27,1.8701458557861226e-17,4.070069118435248e-10,9.254770512930754e-9,2.2137820113957978e-10,1.981045743488929e-29,0.021944820828484098,0.00031512269187082667,1.05940894995901e-34,0.061514798602328606,0.5087105393925186,3.441870377902737e-8,4.938858383617855e-21,1.4423234772130994e-11,2.142752157337376e-14,0.39928791880822084,9.435940285006839e-6,0.0006125341698134549,4.94408662875038e-12,0.9186059756365655,8.747702701507776e-20,3.442645731021938e-17,5.31089973885574e-19,0.0174134735111169,8.72804405131876e-17,1.4710905730638375,0.0820751027418383,4.7804154051099e-41,1.0298225317361645e-5,0.5276162946379949,0.47463823179019177,1.4410167149703728e-19,0.7931568321525899,4.994212993378281e-16,2.1779023004790067e-7,0.006325523079392851,2.2682733746913794e-5,2.0916357035622601e-7,0.49901129313370524,1.2895700218473525,1.3260003806704358e-29,6.577820708044611e-13,0.41196012215079564,0.1688104265935886,0.16530065461013013,3.777089693215516e-9,3.2055625379060593e-24,1.4035710575967371e-13,2.4189767338443596e-16,4.338695622078009e-12,4.3491998377296263e-13,0.01099612451581619,0.0037281175626748186,6.446686591446705e-32,6.726743458310827e-6,0.05114303013777723,1.7091821879989893e-12,0.9894043408546294,1.9778387465117155,5.987010949445663e-8,9.090715002895359e-15,0.03681848835552646,1.1255897597772667e-9,0.5692448816597359,1.6515619538800381,2.320145459387974e-13,1.5598631563815894e-18,0.023279030886107433,9.915105526781355e-18,4.422077587171641e-10,0.5498468421470911,2.448224085757668e-25,2.0478233892298812e-13,0.013516750715037853,6.276525065752281e-21,0.5616886020314451,1.589906994498205e-8,9.187701906464164e-18,6.692115411562742e-8,1.6623723180251217e-9,1.294453079345877e-16,9.697015946236987e-9,0.0046724478230619525,0.025217350690525404,4.635994897792017e-15,1.148332343478932e-7,0.0010595448534422732,0.9025688639398352,0.00023611849514687706,6.3324271629638665e-6,9.386661104529177e-35,1.7963513992501786e-10,1.4705882967419692,1.0902899866115477e-7,3.7666141540031297e-6,0.20092794774449368,2.923372681957638e-29,0.5321828929136312,4.280398102256303e-21,5.4873879014564635e-34,6.925502529912369e-13,1.6124849597012363e-10,5.1494971205800724e-9,7.0165595891755575e-6,1.2684888189873786,0.006874253210719526,0.031580496452984316,0.1681392083140744,0.015128169202537397,4.0167256604913226e-20,0.04020979959569758,2.121445364510696e-9,0.3492210861207748,4.419238401970111e-5,5.0439612797015154e-20,8.841913585638838e-13,2.4432111609575247e-8,0.0026100679079056168,9.428632635165837e-10,6.506239141267369e-32,2.1318877555289387e-12,4.2908169384362214e-17,0.0009937172947143324,1.9217155961146275e-11,1.7348703524755168e-15,1.684454011335198e-22,1.2868732160588357e-9,5.460583691610734e-10,8.649859188413524e-20,0.04401121118951889,1.0253465216902549,0.03463731775741183,0.0017453834803255854,0.0067396329374890505,1.2047032778052571e-17,1.2973045989204316e-5,5.3531380904309185e-9,0.239828282842615,7.383104612160702e-25,0.0016593130901991662,0.11133492284381397,0.03945799680696103,3.1739427450026264e-12,0.274820941923159,1.0035724711179658e-24,1.149852474681986e-15,3.4471123988530914e-17,9.274509600121958e-5,2.3227825767656646e-5,0.00761421907109008,0.00023546080620430156,2.393702035298001e-24,6.304482231394317e-18,1.7390405555216497,0.038862736943383984,0.14407572807743146,1.951922976587573e-15,3.785030310283318e-15,3.2193628184791105e-16,0.9041002369944762,9.56137854783914e-37,7.798367348538731e-20,4.857405218579087e-12,2.434860011720498e-8,2.327645238042382e-8,0.034390972629068046,1.083385837489859e-9,2.09515399990739e-16,3.934887299445826e-5,1.7881004789056914e-32,1.586615025003553e-15,4.12953148127883e-27,2.448989382956914e-7,0.08725379004295007,1.9693662760751308e-19,0.23615703811349967,1.498751329440135,0.001185484460998446,2.8342406942111303e-5,4.451587541257559e-23,2.2365523294991912e-14,1.470429045373328e-7,0.4835084417226702,4.274503080212132e-27,1.745085084311597e-6,1.2617313675481274,2.5969481874385165e-7,9.42578303109912e-18,1.5923695852625876e-18,3.4402879372080717e-17,5.286587806722987e-6,1.0031431218603168e-22,0.3235404236549071,3.237977337918261e-5,0.5029191893572434,1.3229803961327795e-7,1.1854288965759276,0.0007890070917790502,6.293154400676771e-16,8.629488411163685e-9,7.678658368347418e-9,0.004627600738739584,0.21740401093478712,0.0007230179320695865,1.5510415457101416,0.1399984452458866,1.014479977289442e-29,7.923889883082445e-22,2.7590433316997472e-33,0.2832347389001807,0.10584383721881295,8.265550327809968e-5,1.350800054061094e-10,0.3100094113176783,1.09802812174939e-9,0.005050716557977372,5.993082824240758e-14,1.6363202714667129e-6,2.29903567442491e-10,7.703603704286775e-8,3.7748718653792696e-5,0.10457397399855896,0.5523840871116481,0.9111621678726108,0.005468557604296825,2.781289656622655e-11,2.1977271503895149e-16,0.015677274061977137,2.4218907373449263,4.6921437396407625e-6,6.55944651029025e-16,0.20163918812843484,0.08159483640907837,2.0929860685112113e-16,2.9053602266803776e-6,1.3501677099702634e-5,1.5195351752769253,1.3733671620045908e-23,0.2104431400770027,0.09946267399275843,1.1343185209231011e-15,2.772480686877526e-17,0.0042888332693639545,1.1611831327174059e-29,5.590342097651061e-26,1.817982964496446e-14,0.15502641474219792,2.749307454952114e-5,9.235418939493246e-7,5.581098857553959e-15,1.5781929498599798,0.039702725470131296,1.4076875358689106e-24,0.19735150056242828,8.556530583214202e-9,0.0006510874030125062,0.03291895123656307,0.0003657690610727395,2.526227393319512e-11,0.07899379843285473,7.70046783670501e-14,0.0019446473227202477,0.03576110142209274,0.0009758202648440775,2.3147131906942667e-11,4.976915412435853e-9,1.1098389014182777e-8,1.4107901768343573e-19,4.865474175204785e-13,0.3096312012995124,0.07333866130793111,4.676113469438547e-23,0.01745222184678708,0.014638715661749218,1.156647196202008e-10,5.2817783358773974e-33,2.7755367139217366e-8,2.1203136414294022e-10,8.033649798424236e-14,0.028588875809251714,0.0003893763021488118,0.011017918622821126,1.410263000367345e-9,0.10800604380937978,1.825553657466815,0.8717780894874763,0.1477425549534087,4.512372702981114e-19,0.2550643879062574,0.9083626246692994,6.906261149030124e-5,0.10484841237050342,0.5775288896596336,2.339124344267246e-15,1.1647062430750562e-7,2.460901828622659e-32,0.022270962660597575,1.546277236001239,7.988846454017323e-6,2.1377272987541143,0.0015554722688675465,3.363762383664916e-31,5.031622718391104e-5,0.6856525741791907,3.411789406959519e-12,2.717598575410244e-8,0.8391697542962667,0.20061195476715807,1.6744218479253146,0.008132159637231072,2.2761184705974217e-5,0.2143771645725553,2.2130174990523736e-36,0.048938577047951,1.575377573870194e-15,8.213369806863515e-29,1.9913187182355816,7.594252849052205e-21,1.0465232269402927,0.019727215462843593,3.661959332871069e-6,2.0664995843193975e-12,3.806564002741009e-6,3.303765857823534e-28,7.97929586827681e-7,2.4363659980115276e-8,9.349157819299379e-8,0.0017288559986203182,4.031004555209891e-5,0.011133968992340131,0.15936436740430857,5.430554218015673e-10,1.2262245777627654e-7,5.158448680673779e-9,5.724474489760716e-6,6.164112122461763e-16,1.2118966150088035,2.0528340414440496e-17,1.044796315669779e-12,1.1141085705887417e-5,2.962960371076054e-11,2.3159103969590475,0.007775997378116709,5.99860858621392e-5,0.07318655771331771,0.060894956650300695,1.2614742726020378e-15,0.4517627443549041,8.132373515495876e-20,1.4886067853265486,1.1958449765575017,2.7113162047959355e-12,0.6404473988171349,0.00011356861525118669,0.004513715620437149,0.7482519041974189,1.4293662813465308e-39,1.919550150356083e-24,0.00010714185677184871,1.385294842055863e-10,0.005334791752778562,5.558673138490086e-11,3.6686063322099975e-25,0.012319101875988,0.3664426211182003,7.558455672930697e-12,0.058378992950232945,9.587317514057196e-10,2.3293965819762792e-7,1.4753735115110504e-14,5.1142355485030015e-18,8.789210343775246e-7,0.005847172552607978,0.004554814381992243,1.1202864555348622,0.34462243043372953,2.5452443623844475e-32,1.2785161793628953e-9,0.0006866916156499724,7.4570799043647045e-6,0.04677859383271148,2.095108853435682e-10,4.0443411042420464e-7,2.503861519815771e-5,2.4931094956088244e-15,3.351859051290609e-14,1.7128391039962667,0.6232919150243242,0.0006076522393768232,1.0948349141784853e-30,0.02624079271676376,0.00014285527332674112,1.6173186779588389,9.931973440504162e-8,9.640936775130771e-14,1.903445324787491e-11,0.041893894321031834,1.8088126975249522e-12,2.681601906125847e-7,3.022406174309918e-10,1.0733883297757049e-18,0.0018256592573495686,0.0055389786895089325,0.36392646979033266,0.012491563850936234,4.518312850972496e-10,0.838236673340343,7.409451539161272e-13,0.006585023811262905,0.0018234470878208126,1.329161599005463e-20,4.975192481351784e-22,0.3406498198989098,2.7296043886436852e-6,1.016764845835919e-5,0.022171202130674958,1.2235858604989333e-19,2.520606763755535e-8,2.4842995474769056,2.290521623409937e-6,7.949428956356336e-21,2.8377838316087218e-11,1.803731845456792e-8,1.383119125182444e-5,3.5955298004346724e-14,0.027744261381887937,6.1391885036362475e-21,0.8392921780694601,0.01471478979285447,0.051395413734480845,3.0625588781823275e-9,5.213796505372039e-8,0.014039390873328363,0.22485036198933608,0.3970776188201799,0.00026756535110634034,0.000315750992905011,1.5446348055868111e-7,9.563829344383183e-15,1.3512972236164617e-9,0.07988041726141604,2.318758040817607e-9,0.0077337850075434806,2.114391550096553e-17,3.929027677255569e-36,5.3572945066298164e-17,1.0937413001106327e-9,1.9421631604009264e-10,5.556180397317964e-33,8.917177925354484e-33,3.6017459688080166e-21,0.0002543435708713719,1.2604208028761955e-11,1.6469467310622133e-7,2.7752427802572648e-9,0.0006674048791841258,6.08511587491762e-13,0.04444811488851138,4.122063905331766e-27,2.5807319877971267e-13,2.025515511894212e-25,0.0774449812924133,0.0004582903291457972,0.3779459642701524,0.0634053608664889,4.920762148655382e-19,6.589537583641446e-6,0.6000339183177203,2.3208743284013922e-11,0.14040849913180536,0.0012599445790329696,1.2400644242078705e-29,3.587408153518932e-23,0.0036534209882683783,2.5086809294909294e-7,9.488291433969503e-6,1.682010052479421e-24,3.4937884933336793e-31,1.8053785524529558e-8,1.8588757935493605e-5,1.6778884153836757,0.04398221418986051,1.409238821628977e-15,0.002110497116428703,1.0202318099768244e-10,1.327435570742382,5.3576027109289114e-6,4.687713182454695e-19,0.004491444943982974,2.0728164916207142e-15,0.5923615891515964,1.924981745433328e-6,2.342913667501089e-11,1.2836499077208664e-34,0.36441738239309374,3.5346104485925323e-13,1.2484434658036977e-21,0.027397922000829397,2.2948462237892857e-5,0.035290912525818646,1.0063810310721155,2.914928977066878,0.010494157476372163,1.6032062342255773e-5,2.0478407616713796,0.06859634701673335,0.28986799580472156,9.045803096137762e-13,4.928907974573948e-10,0.00021808746855315588,7.118307221439673e-5,0.1854818729638375,5.685313546297063e-9,0.1926581237138096,0.43993016140954455,0.023815412246531345,6.146873442911985e-9,0.021301411621798477,2.7760751442129416e-6,2.2651029185756353,6.783106941656361e-6,1.9458188775280834e-17,1.5797478822090296e-16,0.0027136837583012752,0.0013580394503795458,0.10575814847682748,2.111020737844636e-5,8.488911106545031e-15,0.001848032868667896,0.0009981035425304626,0.004962366168710349,7.2237044926449515e-9,6.713067410844939e-29,1.2376715299188788e-8,8.001621365706484e-16,0.002689206321116335,5.812973998897561e-6,2.1593288885166947e-32,2.015151300735349e-8,2.1179815035659546e-10,1.2610200142531238e-8,2.822967211252727e-7,3.920653695749274e-17,0.00027580119411687155,8.308140197622661e-8,1.4465738082571526,7.243722644517103e-33,1.242314661572743e-13,2.013960681810581,0.2990649343980876,1.7489735020192655e-7,0.7189062041341815,1.1493051907630316e-11,4.463703673748531e-9,4.273980548467335e-5,0.21968466689613017,0.07273549281984255,1.9304934208674835e-5,3.850513643191969e-9,6.062096935937604e-5,0.2957999437509363,1.4498580203087176e-5,8.143038558445851e-5,0.18893669859123724,4.993354326664964e-7,1.2332677611273994e-18,1.6856579784503086e-15,2.872621252278251e-5,1.1747683216719617e-16,4.200130822856534e-24,7.468491448804074e-6,6.282328909636163e-10,6.362436182345299e-7,6.059067676480183e-11,4.112455215854963e-6,6.537002359116935e-39,7.1804138223330416e-12,0.0892008293391696,0.0037303884273848105,7.302996066340342e-13,3.386460922532911e-23,5.081663992451847e-7,2.02595987293182e-7,5.547791133477633e-9,2.2156897837714458,2.3090407060119675e-7,0.8055783057354988,2.093870764681016e-9,4.3658507878285015e-5,3.842295289043174e-24,8.495254569884434e-9,0.04455974770223466,5.576720125442604e-16,0.00254853120473398,0.8347934480006977,6.029555934713203e-17,0.6059792743393797,1.5467364930916436e-8,1.3826720437301343e-14,0.09009845998702148,0.0001500946422067265,1.7692690561568969e-15,1.0340227612915847e-10,1.0027369638484766e-6,1.0902874769128752e-29,1.7136269124440735e-7,0.14204076971540455,1.7632258568580917e-5,1.0022085181332317e-33,4.4893070952831114e-17,3.1586522908343555e-12,1.5183187978522908e-12,5.694837549326793e-10,0.21952706337133668,2.8344424812219797,1.0999061922436123e-7,0.00010073787311226491,7.637526648855334e-16,1.0324102518280833e-5,2.5130955662112533e-10,0.04441469001920465,0.001819468324233265,0.07121082015139832,9.655544809022046e-22,0.7884337719943912,1.0211454171643993e-6,4.3280685457255415e-5,2.6129942813376033e-6,8.930453028003688e-36,2.2081751735049724,0.004026421751824288,0.00968323529802561,5.11615555467856e-10,1.0339867670810716,1.2069984285062742e-11,0.0003265732987973966,0.010164287917389794,0.7051502446121328,0.06633044358473923,1.445470837560305,2.665058414964974e-14,0.8735615287087557,2.047970896266307e-15,1.7396067736702373e-19,2.652545248457259e-55,2.1256692606021442e-11,5.379892607261365e-7,6.027312721903731e-10,0.0010098194349105847,3.0338095080647777e-18,1.5556901096669879e-16,7.246430278466975e-18,1.0599220430687497e-6,2.4191205132246253e-10,0.0015030574745726027,1.4693768994994524e-11,1.2316224189733696e-6,1.2414317579655052e-13,2.0856985786134082e-7,7.977729237895269e-7,0.001923436015904149,1.258483174244971,6.978302009462335e-7,0.44474976980549275,1.108042606544928,0.2105130784794476,1.2642430530432558,2.553696788687024e-25,5.923966403762713e-17,1.3231047578445196e-14,1.4949760995047206e-5,2.7703355758640938e-14,0.023552106642015205,0.00028687306477173397,1.9494601934544777,0.17296733637513564,2.5193249357517243e-10,6.082319093973491e-15,0.04005881726486345,8.132996474475723e-15,0.00020519331059091507,0.6563981896181053,5.557979452073974e-37,1.2858691130392863e-30,1.9232459713459588e-19,1.1468002685880624e-5,0.00017110203870650088,3.11778739145971e-22,1.2926230238860882e-22,0.08443543853982807,1.1247455413125421e-23,1.257961556683356e-8,8.840391692366023e-19,2.748137365423096e-14,0.0003305979607206523,0.007273935085074128,0.8064870363417512,3.317544595951872e-5,0.7195686435874641,0.19857193325100772,1.1735703518156356e-33,0.6419671396168238,8.197487667108869e-10,1.0180829489178055e-10,1.3186540423144418e-6,6.736951092994921e-6,0.00011045804184669464,0.00019154492196757006,0.5796752516369681,0.702257155175523,6.208624555626876e-9,0.2955795023325357,3.2172382949352734e-10,1.3604345018389392e-20,6.155699168485373e-5,7.540310883939674e-7,0.12662214412030662,2.2736120676377265e-7,0.0010549388750960324,0.958686717164906,0.2426570583371363,0.2521710455853151,6.446645025696684e-13,6.885394113280935e-25,6.332599224250585e-7],"alpha":[10.989576430989905,22.217431514595777,21.957468224188553,21.606983354379757,22.52006991927258,24.220701056294033,25.8516946661041,13.368486704711039,17.93634471798612,17.504415657020104,27.13310085287569,16.177988710110334,14.028444007390291,22.24203427423641,26.128796121374876,12.486276474488003,16.37607809445734,22.719122024577864,23.871996904462335,17.611964078292594,29.862594422598598,13.626170927064774,11.269789210611947,26.274179576017712,11.100739523196346,20.4346737771504,15.005625627174322,12.146892353844336,23.197002299780188,16.43255428447549,28.07952876869763,15.227202747445098,13.189294880911975,27.87371579922636,17.018823659186214,26.861921246526745,20.093893646443377,15.262067433444809,20.914709232351065,13.488679930347477,28.79811376313894,17.212343289675506,22.026199716422745,17.496165010202446,29.251486496632126,13.139867195177759,15.545688963627047,17.71653355789521,25.82500554636257,22.11323010536195,24.63742961312289,21.825087538889658,12.428690809323065,12.327021800189527,25.475561685786047,18.856123377796642,27.325187691326374,11.629597681408335,26.350272574390715,10.24582162108901,17.409929583870813,12.133722364456867,11.921124458926538,27.341639808568452,10.57761569348747,26.222294119726143,28.977662044968625,26.0460849899247,20.359479915677486,10.854482886103188,19.29557749405616,12.627103372120523,15.995135842972502,24.742864915386363,17.41167848602009,17.45135754334495,25.02903972125244,17.18177573849864,23.620885385833688,19.643094702284575,12.196663651848496,22.82998420428662,17.209585695485945,11.371899710794748,26.796856245224706,17.486819543877875,20.69019089793835,21.62197440271732,14.803921225508464,10.750501856492104,17.926676441767153,21.7760312356631,29.180085176971495,16.273793034419803,28.21335136405771,18.487313400349123,11.159636815263045,29.765881196725104,15.200330307691384,11.111401718037875,22.10114358959927,10.362505888242243,28.517108239575965,23.951092628900895,26.32475860311487,19.311567223281653,28.122135906448836,26.267625359407564,23.269276394571605,26.26725461391843,10.979490400239786,13.56875639698243,11.783401018667234,21.968990436238084,26.63598577341501,16.793297344218846,23.187230017537,28.631247230286935,13.81872790114481,27.618725299105723,24.235017050269448,17.089059416996598,19.929826724282975,15.044091627487415,10.567337865774471,16.61304696136694,23.87640383241974,22.190676722072507,26.440747363892086,19.8368366766609,22.874709967230345,19.14646727770616,12.464780933378394,22.55439164777559,14.008062675828858,23.2462159745764,23.52611805639141,18.786297179325054,17.309799762096148,12.928644386350815,23.387457291544674,22.83892835450127,19.602882556047852,28.773931124736865,20.91091248707817,27.138088681370057,12.682361822274991,22.714586645491423,13.122072136262023,24.964591313842725,27.681654500610687,23.654076326236996,20.476892113120144,28.19172417287136,10.422980297740194,11.845948143545538,21.53033104058235,10.502383955370114,27.64656754034043,22.786509047224296,22.116609244005367,17.131764561914842,22.86454334322277,15.132574903249765,28.498155963925452,28.61482724487224,22.537798942153543,19.117229014902613,19.73407467174497,26.851242020919706,11.552086154240442,19.139435480543867,26.318410112334302,15.634715172928368,23.727285531368313,25.649734467186388,20.254513065488084,23.34230656311133,25.31980335262434,13.72972288094025,17.544435818889163,21.409661935070364,21.75996966193108,10.925411444359558,19.72306217261587,28.454221714627405,21.465296402937227,23.955089325872926,20.38491327529655,25.695312439597686,13.479585803591325,15.5226365750257,19.37040173516823,10.0821546508105,13.759667007876208,16.029333925434127,19.030110448729552,15.681090694864803,17.483250195688633,18.49393052325405,29.305782021509227,27.17948031474911,29.375282080783247,19.2235298376874,15.064073554679469,24.06608641965084,15.973275578603952,11.645028125571507,24.580285087273907,23.687600473035072,13.974760476742683,14.750629019562144,14.095978965494766,17.020593099203772,11.313904184467942,10.954751227771457,13.793996542700985,14.835594921526774,20.970542140914475,27.736875575096597,25.9478584037941,12.250979320071806,16.51377072699933,16.507416002680785,19.51766263338438,24.906482049779658,18.14119901210571,22.28574735413446,18.803460850966168,18.50593317940079,19.17248028303215,20.879700142459644,10.28730171101136,19.006249539005687,28.155134862405053,10.560142403024507,24.98428507606246,21.16140783915226,10.653574938836833,11.558669244333899,17.439406103785306,14.843111456409805,17.914801950834082,23.9779223296414,20.861888684182034,15.471187240789014,21.03621120668099,28.480989790440642,26.47842624345924,28.87038784270353,27.558105175811846,17.977578485386424,11.175819661310648,19.36963021340574,29.363853845773747,28.899308830309337,19.28520044747334,24.37589664932235,13.973954371675923,13.412741806266343,28.209999139025076,19.814396257229532,24.926227246561915,29.41547235662609,25.695097188201437,18.024953732687464,20.85210063658475,19.577999416657473,24.25423001990611,25.818974844366313,12.960782886919029,14.455033832177836,21.705645668698335,23.992731505453335,16.897879184766875,22.872658489860605,22.89636103718602,15.75127465220373,18.106194412828692,29.746476959412366,13.032670472322048,20.984742224421108,26.792769409306366,12.015122839445942,11.960187881945416,28.56303949364896,29.13794974348791,11.096465773034549,22.334702665611083,26.674964065565824,28.779986182345727,16.639779554784006,21.246985332901446,24.092506330871476,29.12443964209225,12.237553414231591,19.800712819791745,15.519326773950972,19.386298271802175,27.858394819115034,23.416074005226974,24.434485766397724,29.087771418995764,18.0677272535787,26.938639772031074,20.430058131573826,22.094522224691147,15.95414929729241,29.646063985589358,25.988091728609838,27.262820386238143,29.95904409488659,11.318470656847532,21.972135505214887,12.50996684941271,17.023928337023406,15.892693405853958,25.987894156480266,22.58631150831667,28.11895200328497,17.519503735676558,19.81281343059385,22.382870897227562,11.125587095967692,24.933769022077684,16.80263020604412,12.615547470107696,20.146376269965288,15.34551912905869,13.999046193155715,27.025317849519336,26.925712578264278,26.399557004197124,21.634953817386524,16.12543043469199,19.922793996957168,22.05944941891662,28.88454117179409,26.871262958638678,19.030618290310677,18.850498844073748,20.33693660866085,20.053810116597838,13.85459727437751,27.80061185910717,13.223337276194883,24.586683810183846,13.055384609288803,28.80429311218426,22.4181720492441,18.68427509018457,24.39295433124581,18.652264203176635,23.707137052829662,29.565687661305375,17.19735018287542,25.860297748687024,20.118309045244,11.389918393608468,24.50362187226306,28.27524707964521,15.142178987750672,28.804832369394433,11.333751088959678,12.171785618342511,23.035178951108772,23.908264598659514,14.989868941237333,24.759947433172,19.650009617873884,24.880660136821717,21.36416309129431,10.878404308837508,22.62555568088649,15.447043785575993,29.802433954399188,17.160155203890355,17.314939402192945,23.20659864617289,21.97680411918505,28.700919937240066,10.104057247431353,15.465536952351066,13.020342195700568,17.3113902064975,16.622127380063866,21.990639490145686,24.08609053028464,18.16747633180503,16.097374796134034,19.01281665511613,14.705104520427227,25.84734654971458,24.409633363994843,13.872450320179182,17.505202217585914,22.75715266299724,15.557073425472346,29.377728997781595,11.949169393721522,20.68514775712488,27.264044784188002,18.871533055453785,29.009392120651142,29.43428454937586,24.337319919915682,17.68758205619754,19.384802003736507,14.70810220085462,27.665591089605147,11.768346116851426,29.846108077655376,13.508731688145659,15.729365822118222,16.13707159406423,22.06134505271889,23.677523083396636,12.144652189231087,14.952389910032696,11.66700564685856,27.19549789600404,16.634575978092773,19.512456753889523,16.486455737519357,13.099885731489337,18.920255569689537,18.069579932542116,19.066917227640015,24.551656610537982,25.246033059031063,27.87109675658701,23.31760256249039,14.10113696430566,26.948966242294038,13.886741933073324,12.39318562976294,23.230361600215254,23.51667429598995,27.96517484618585,25.578521037142202,14.325236425904237,10.825291579412788,28.9337727496778,18.43667283106503,11.83368365040634,27.587223517411342,13.824955512713274,13.704010353590185,19.00184205578908,28.077606701959308,29.24280871325419,23.539548118216274,13.59474671006808,29.912841183213622,23.17978254424397,23.551967434432335,26.61639556092858,10.172614714767239,14.645975995021502,15.242388921101814,28.390918401352142,28.158671407166672,24.435285668600237,28.152267364094726,13.115967710597074,12.70004696194122,23.77867732242374,19.200376841046584,12.214207721156583,25.91533502117137,19.54421145147624,25.627271629403342,14.583643093647005,19.445610668677247,24.104982416888742,18.41228600223775,21.877028785418982,11.26813631523901,28.91972115868836,20.09204103748228,17.93912101804411,21.954366955893803,17.86724733509566,22.981819771357536,25.54748242736558,11.547340558314287,28.10059150931879,25.654829404972336,29.17281221660484,13.830011881260864,28.911748354694748,13.011732570594571,18.39577104602569,17.251350711136148,21.42664016672983,18.15724994239161,29.444120386390694,25.55341845926165,25.560502439899825,29.82359849069433,24.956266607027693,11.476389219364837,20.807802215877288,13.404095861174984,13.73142540857772,27.524809510365063,23.456099423489963,22.073346687351787,18.161459278565374,21.302299100480603,26.839523751945418,15.602848090152106,27.692907233481314,20.20502699556458,24.452339745552894,18.726491625359408,16.58249479622477,17.291964365567217,12.577830691342111,10.855534661545354,21.417113494624726,22.74380588301365,22.34944137306051,26.888578819753413,11.960562396862118,27.250790765647434,28.03743026590525,28.99004637737361,15.158475296909453,17.379954167703488,15.28787467566492,16.776135169389576,26.980272423470026,12.272945898727317,22.752165487990574,11.76065619171014,15.838373515923617,21.612598593328002,19.680598312938493,18.264743139869832,29.33411669767047,14.123811250812878,19.1837072297361,19.87456275253672,21.426536390209673,26.110180033359022,29.10887629487592,21.72155035965062,21.530980261066617,11.418841885955358,12.308736710427834,18.664131655872822,28.601692944381774,22.17053486552051,28.88125393049703,17.076759538039475,23.395409717935806,18.434131084327248,24.779611696084093,15.108263722563269,20.829434293405264,15.927679065440206,24.4363658144863,19.700875747726442,21.26533537182524,29.480910933385918,26.93919125851958,19.892223885075477,13.554672650599343,17.88324604506963,12.604520252988959,20.1736896747086,24.728759495595227,26.768806956139013,19.352903674824347,26.90449525511237,23.92940172003781,11.345923514768636,27.48183173100375,25.296036613438115,13.905401299112397,24.97722716425795,24.778183937813143,29.568678487405187,29.4172281091806,24.51737002622921,17.791878273046517,15.866622909213852,20.94413715644216,10.668673307193352,26.381176365410926,13.002915680519216,29.131227125938985,16.346740354459207,20.855014178682815,14.292343931903027,15.207208479885432,13.366043044540007,18.398456635143884,15.127846927122487,25.395395452226573,20.98744247014497,20.335062007215555,22.43638783441125,17.90527942774188,23.420749366304427,27.470493577481786,29.062926181583244,25.2800280191382,23.379841944878347,24.17485269780859,16.021335617951884,15.786121072062919,20.715341478657415,17.576241781187672,25.395572406467892,11.61976725353139,26.917959003408946,18.783974473447994,28.301579287358134,21.690587445723178,18.684758357812278,23.76456279129934,14.001701300876736,29.61393995918688,18.787440477695085,27.230347392386047,13.915010173148406,24.02662826340038,27.52317120317131,14.768919176288819,15.742273569302622,11.810807687865136,21.289815811227175,24.946368100691487,27.407755320702528,19.223528192619824,25.23488728652532,10.908603994251678,24.308178260261656,19.793990481423727,21.131002859089804,29.994808353942982,24.68847358493442,23.808861300531756,26.69558734582829,24.941241774889356,19.945218820849547,25.86229620037563,13.681849290144443,10.639013179972707,16.86515906039169,23.649196560280895,16.40639524432169,24.62950064894073,26.04902790418494,17.905892912158254,11.98627156611845,25.394645694378678,18.042492171390826,12.824697763070997,14.591192318746785,26.00655625268908,24.32536673103218,10.950229724251583,11.43501933781311,13.743627105950246,21.188485350040203,26.56600681660882,21.478013523429702,26.799798217621635,21.20732224594249,10.132511192035754,21.318065737303332,28.14943872263391,24.85336838114639,29.643431632459077,22.7351903264981,21.712460511936808,16.333530013423648,12.080448108931323,25.16687607446261,25.779723707874357,20.470503686984408,20.65848750744358,12.853664548823819,26.601244472238108,14.166234523836142,12.103878396049744,27.184885179426793,15.809448828397898,17.884999927662637,26.604029083242878,11.17815434420686,17.415859444358045,20.53225051236142,29.00421973505714,15.794489926520239,23.379475645625195,14.396309004090377,14.734859197414671,13.300665882131355,13.633964234362397,22.814412037215245,18.633429259825384,23.993577491863384,18.52247501387896,27.67163591435738,14.69562656204718,24.80814809021947,22.443350778049602,27.063275511145356,27.908144542980708,28.42743127094152,19.387741747165542,22.602601925131466,22.47033295193516,29.0940963959979,27.99011246194157,10.148321150854901,10.996464680317036,23.794013931577574,17.979913801168372,10.864242759806784,22.01177609210658,13.041214996342756,14.52567977295859,14.774993163494102,23.58236542158508,26.157092795163383,19.419653697712967,24.88679951286982,23.464316596509605,11.669306686219677,15.535904130793199,11.673470231616703,10.792716181503996,29.40633688673386,17.647056664426483,29.26107418388968,20.48598521237281,15.714298007298524,15.896452411525367,11.580278564394554,23.82275866937464,12.89222744418221,29.09321510550305,14.902399502303822,24.005834338583888,22.068638117444458,23.470025459725065,14.21324255137597,25.993530883143535,21.049999234067194,13.75779568003551,29.067660570663456,25.943125140613027,15.60204892863458,27.356703213130004,11.03632779899414,16.72349437066543,27.155935286005437,13.59334540798756,22.495939353332393,12.356655954474952,22.61803668834853,14.635301438032439,12.778087118336718,10.606205259707018,25.45586968769912,22.20188845761957,18.27909383531409,26.22628012118104,17.528764379735847,28.835100583196738,15.891451291965208,12.938103587521894,10.434201780833545,23.41999501311669,29.228773619703748,24.707086413315583,26.345265585505878,29.28998412951254,13.073962437744813,22.417472716679647,25.14647689546891,22.36450333898332,29.293069557958418,17.154134692239502,24.432940590582785,24.841370565991348,26.409207087640738,18.98009983837056,16.959778715463095,27.712359474862716,24.48064084224008,21.114997945366962,12.76806776498384,26.062810816286962,29.243098607388323,23.54301123276987,11.371444951104666,25.20101443780922,10.087152530595041,13.411898644812194,24.522688240151215,26.81508446793122,28.634250126543574,11.94011262332555,13.505293792159684,17.59515000956844,10.196002912741173,14.972027454470481,20.0064126473048,29.950715411237198,26.587740139250265,10.407706217516267,26.19401524220055,13.125824567632938,12.250170272587235,13.769889156272495,21.99510761821074,12.68434585522943,12.243522354603567,26.870171994623625,19.421711818479096,24.665122781681003,15.277213160176846,24.055877947937248,20.61445281926927,24.325463367446062,22.21233525908048,28.835535525034437,23.943760189298224,26.314099487597105,27.263001831469353,24.209231396977714,24.80107378604171,24.356248781738895,27.892582336319048,24.38479305271226,29.068304017469146,11.013522679505027,11.260787493221759,23.284521286458034,24.820868979681848,23.461899280959834,26.623879775277484,16.656822505553652,29.10254211069556,15.453071985694695,23.978052068160483,15.669023358532588,23.23098365050768,18.671261627274063,11.443683826303417,17.050636011357597,14.782749176238692,25.638894590986236,14.135664237775831,22.1511183479339,28.081527227133446,11.270806049610087,28.938430055602772,11.949378690108198,16.857826017598985,13.141672133781723,29.039670609744547,17.80271487681254,29.783077779755672,21.7126335867774,23.932977501377422,21.456340405570657,27.16195738922915,11.706775921878663,27.989256936924445,25.018902884314976,26.822552022451344,15.997455279233392,26.025390956838883,15.04765440022879,18.32108216068896,25.936565149445492,10.933370209477538,11.175514149864668,18.879272961474967,11.06878307621626,26.764804745940744,28.813420597856524,11.115876621779663,26.904875719340634,19.635801559152256,19.773883560840705,17.46862307243084,21.144708824598407,24.266665772591793,21.771001715776922,12.27892937639336,17.344017809599137,27.903890124665367,27.42961038874215,29.15710287641131,22.53990849718287,19.475697303431424,18.92740101297777,19.19277915763658,24.084659952007748,26.6509223951342,23.506886426577328,21.26282763598233,15.919185561897162,24.894439006403545,16.13317649990567,15.458829123777651,23.833198568414964,27.2553485220611,21.767790983828576,18.33632509587202,27.759407022121376,29.756852053035757,19.847122312677765,28.232806538600663,15.507742383838847,15.595548065174466,19.569710234725243,26.012519930009024,18.72578540164509,16.12589094479567,18.475652006910725,23.568895378063687,14.95360519141554,18.513949386438245,21.153215225544912,25.214486091975555,27.347173189527034,16.3698824523376,25.92314308008518,22.299866975190554,18.495178895805658,26.062361610522437,16.269789229003784,25.741267536692686,10.57549991599824,12.739889996517583,28.876493120780285,10.513930856755183,15.201363223789901,18.860983308626565,28.829429080848573,23.01348654282032,23.05601523573553,16.145595996356263,13.679882924381147,20.272610317875838,13.557163271581466,22.741749547963444,26.15842036394339,11.87949005843306,18.370382258263408,20.47086259311691,13.511878666817596,15.527701842973226,24.26866261666475,18.358806575783877,13.592590906020048,11.037384597503364,12.035104097879659,19.659659138213836,17.12793061359369,25.933723515773984,18.824644969273034,25.360645794763848,26.740054472494002,22.303043346183845,29.828966181870836,11.860771491613185,18.14238361350871,12.225730432801498,28.037398112083096,22.326115288893867,19.694696257268095,21.885597015367125,17.781202012392235,16.135232878443595,29.18338404493051,19.826294983826898,10.744767989586608,23.509360161525716,25.393577955393635,22.290227737507664,24.08818787263265,29.290081106732806,23.489870572368815,17.887111668682554,25.834669697513615,13.446773683767619,27.14102100763537,15.460606834056545,26.67014314569238,23.535505870466903],"x":[0.01629484317952623,3.82515865245314,4.437073613628142,1.7342987491581763,3.4428218576817837,0.3952617489020238,3.0917050740081278,4.77253944745182,4.998440954465932,1.4211549576681615,4.482993259085692,3.4828546508681004,0.04953172580733578,3.317077052900589,4.037609426017671,1.7406143950335773,4.707887411512438,1.826795953174205,2.7294404504810332,0.21180210265741461,4.677004996704031,3.7267565376828014,3.747750343564966,4.838630764272965,1.2241193597837574,3.4676653438982052,2.216515081013124,3.0948618122881397,4.006821131742441,1.189980185890781,4.980078382038647,1.6783245076312692,1.2557700530584515,3.2181673789697807,1.279777480665526,3.5219720017453993,3.6061337825184903,2.608750979918988,2.358539830697101,2.696432043932131,1.3478111193682007,2.477502120243358,2.734682953045856,2.9431073829616174,0.4573352379649931,4.444127508725102,3.903353817269032,1.7344776918387506,2.5297814827079734,2.8030673851802357,4.9911606982071035,3.997063277548434,2.631359038099389,4.2736820375185705,0.25013392965882675,1.1942284031408024,3.5636141338378957,2.211567930536098,0.3566151523134564,3.721770433618934,3.7669873275894874,3.017006476334594,0.6748028432314945,2.5346124686250593,4.356119590275535,0.8495357166611428,2.562318436439679,3.859013058848001,3.2485891778823506,4.914385783006063,1.3178943431637147,2.7694140651928336,2.744531960343793,4.237397503584801,2.986949703437638,4.037901181909466,3.5846357404557216,3.2852546235683313,2.4869842684888854,2.75951409891643,2.1733918853120526,3.6168318238934405,1.2822654990791538,0.6287055989369017,3.7382572597512773,3.3889656097295218,4.59506782096808,2.820331087819663,1.2946526772020805,2.109492322548979,0.5327123884376472,1.0861727514770836,0.43710643222730106,1.1265235232577497,1.2765527471412086,2.6611294353330472,1.5759183851680458,0.42301502986891504,2.130370406053,4.831862201031132,1.75006984107697,1.1999067555208864,3.1240166466668917,0.2416799411233861,3.092619320424549,3.0590896404422585,2.1445213701263666,4.819851124365551,0.9532742116485304,3.4020148205900282,4.667594753210356,4.167143145062074,2.3825909252077517,0.8009510296617872,2.765769638349973,1.911276166443544,1.4252187078905731,2.419687288949129,1.7015315647267426,1.0343107283354736,1.0178947322334742,1.6780472219170073,0.9062133538278061,2.1126463901887007,1.8088326865158821,1.8324556462464225,3.342405539579799,4.6021558680536625,3.954941124281288,4.667901129778763,0.8191496395465814,4.941804994672886,0.8536300555187515,4.012663767313722,4.578438637717328,4.475051941432195,1.870899592412315,2.610268651169174,1.724458299410978,0.19362152506160912,1.0764795995677445,3.215436032395387,2.8515239719671834,3.718519765925569,3.0485208117912244,1.5210246731961385,3.631595352538363,4.374021854427754,1.5069403254353553,4.614789388044462,3.048875937055513,1.1015506832125388,0.5004594805876639,1.7013249549966358,1.7881525027876677,2.5959680318399405,2.588627800323958,4.094988414901721,0.5336511948698375,1.7953309349891122,1.4702147276146116,2.1055895804494416,0.009557632302932273,0.3340054823205141,2.2635677502662066,4.991670786788288,3.5758321296556126,1.883050678605197,3.8069587700503247,2.4877213903502615,2.607660129597573,4.976560679585461,3.354393543275438,1.4480047323064082,1.5976607109071705,1.0822418473951578,0.44649839029212934,0.07550532876329785,4.392671169426729,0.33719128508391427,4.95810282857284,3.7850668401363388,2.4702017724589185,3.5589075499205602,4.467875578421566,3.035195424068049,1.3975757947014378,0.37646261384857826,1.0583623285562072,3.6078019589218204,2.0948725910796107,2.4286939699682506,3.332069473634239,4.403333863370195,2.133072263498806,4.51387879449269,1.3380012023230548,4.158754869137863,3.5683726012731043,2.4404306182274493,4.250129891608906,2.0172934634111686,1.2998334544117063,3.3631798759714773,3.086660787289089,0.47326004173572245,1.1498336884583982,2.3186577326537092,4.512869177149187,2.9750816844804326,2.161916344859931,3.4945610095049906,3.78877691970776,1.5467003979709526,0.5887518640978295,0.13552093129820975,4.552851977665162,4.437554337965121,0.7180496689611393,3.7895681855837324,2.037051565126151,0.17129848890634958,1.481791249328921,2.455379826656597,3.599221137225055,4.767957932830541,4.367287665656137,3.902833648564644,0.36442372412861634,3.988915847168922,0.8210250192339541,0.20537080233920646,0.07868602714035888,4.982643770157708,4.866642586312178,3.145228516786691,4.6010239693728705,3.7286040378519134,3.275687049698112,1.1978129252792291,4.676027341969564,2.1603852880947825,0.978351333315991,0.1100601959865799,4.911013565949023,4.604582001241305,4.648539654798379,2.7261389576206008,4.3772993038219,1.1368428492439897,2.319292832330887,4.903963666687632,3.170684757769513,1.3949987832347832,3.7220513453151396,4.789039121906883,3.682512960612816,4.5543089099877125,3.098135883068692,1.4577383011090272,4.017730398882192,2.991504966653568,4.492735231455864,0.11996015717920083,4.04552983527376,2.8652220524591385,2.5581414026072014,3.866581391021474,2.0433150522939436,3.2532998165032656,1.5387052285949199,1.372026968610438,1.4777718527651784,0.9233661028976603,4.705885389418722,4.102031326008806,4.872484390306812,3.351543944477066,3.3961697540966043,4.90531657393786,3.7849554555324803,1.3950309691860674,4.867825395199289,4.918368779425402,0.4479220051345034,0.8125812329278803,3.860855719416004,2.7243021579708717,2.986493749864737,4.624194131352572,2.9646841081246222,3.360986063533157,3.4596127121932363,4.342025087240284,2.2385416722611042,4.455239051007595,4.436584326792248,4.121133642345612,2.882889154512588,4.0016709026312345,1.30712076893999,0.4806015491175475,0.023468336604132167,0.12808241828485945,2.85589498445884,0.6205202160306211,3.398230944964342,1.1156973512711132,0.13647414294611138,3.102549301201286,4.432887920290449,0.34474748844169345,1.482959090829391,1.17429983548073,1.0371321084971308,4.447814685837754,3.4517271010201,1.3760279739806724,0.6867356945024772,1.8372640890727443,0.07379644429701959,4.068723296922327,0.14021967288652126,3.2437422794063075,3.845392920591062,3.489955250864236,2.3971413899719565,1.7168864814759965,4.37746270038563,1.4544778116444013,3.785896052966401,4.69694611978478,1.1128135490633873,0.8668940291077087,4.556645286531515,0.05277938409209981,2.094483194172291,3.986525353014451,1.8803185911383902,1.04831200053632,2.7246849200861565,4.487867253843566,1.5933501866584965,4.225770210502531,2.7550070972156613,1.388713116607121,4.886003619510964,4.73455288125721,3.2796473981610816,3.4602726483385893,0.4934558559960256,4.012568284193345,3.005156875959092,4.496675435448589,4.603614640894183,3.766417749009526,3.389130703107984,3.245760487922331,1.0934894459026812,3.6387228494463963,3.1365793620881233,2.259390152225241,2.3460628311292653,1.1014628569788387,3.1851871412403843,4.848337650492854,2.7573398812639436,0.6441054243290134,0.2003257352474308,3.90310572500403,1.8910754506203264,4.252674410600051,0.21519510569213418,4.608204249204501,4.138595099391203,0.3713290295044269,2.8623428518982075,4.343298026672792,4.549350046521839,1.4671920215654055,3.8788857372443153,0.7979045642200189,0.7098501305351623,1.5887903521394497,3.6197214099731445,1.446782969275735,0.2551610064421883,2.055918483323673,2.6058857503354993,4.450245901788991,0.13726383919361984,1.7629331380796498,1.8898892190135996,2.826884750278784,3.8805722586176374,3.862466189085257,3.1599756593596817,0.3266812736654179,4.904151887458125,2.2392058570206075,3.4501112384682253,0.2569028245625826,3.145210412655869,3.957148848113218,2.7537583965414036,1.818967410152167,1.8976466362064293,0.6059004150723102,1.5140216800538975,3.763128644447351,1.9823723735558851,2.706809130202843,1.0595648678527558,4.201130018523892,1.902726374003476,0.59613190394607,2.0854149675796787,3.4464329048632,1.9808299320940082,3.2914933391613665,4.1907635070349905,3.1889208072584765,3.980532271092528,1.8468704074501363,1.218551197261446,3.729779866894125,4.494087357452945,4.579982146565711,0.8571545121430391,1.847897604942167,2.5909356759670423,4.62057303928877,2.8381318300830047,4.909319647872106,1.3814376919130922,4.9362687260016544,3.704691337813102,3.699458841163942,2.9498634983139316,3.8042003799909896,0.29301094356655066,2.234300980601054,0.1116116558813729,3.8652672540412327,3.7029254982596904,4.849181300821312,4.987377562354826,1.8011017755440395,2.60957324504405,4.457293966317021,1.4506973717959282,1.238198258972525,0.2875553932404573,3.1190280378392576,4.785207237844596,3.501877194051138,2.317890999726858,0.7862080463339727,3.9605631835556974,3.2674891398463632,1.3101783598194228,4.582977296716466,4.04162554889255,0.08673853854955338,4.762050578530434,0.09502391061866344,4.066847420836053,1.208903784179468,1.9198920139002307,2.8970576691558794,4.054526522874404,1.1998203444944477,1.5164558808629702,4.553606040300489,2.754615596885144,2.9083117846949103,1.610384585055994,1.6297725250148543,0.8926236930391518,0.5352312856864405,2.036274984029883,4.393111380875353,3.3092437773043093,4.749418913696829,2.348693429354325,0.3148854208423524,2.0755467689907614,3.023757666803273,1.5799298925342742,2.8762915199974115,0.5016694400440636,4.507087177307104,0.26999665681490925,3.3953402532249557,0.18101017838681233,3.303132273719439,2.468398895111533,0.8904474325155443,1.4160280403902936,2.6032791050842876,2.880360459649587,2.4391683380104547,1.3980226468129198,0.5555848674676622,1.875350740448124,3.418885869679179,0.47747215041827995,2.5785685281762847,3.12897963466374,4.260512871745837,2.0825683582980323,0.7268193424248981,4.535526844858265,0.893344137742863,1.410415690610125,3.0135297243972237,3.579775700967237,0.6038043806979321,4.6472117976949825,3.0828271885891,3.9720123213641942,2.9310755520408307,2.4537333099543126,0.26390033786116374,3.1520871241341517,1.2936339864432,3.7630938471414757,4.534181111040942,0.6107222966593495,3.800745268881871,1.4034129312650634,1.9078270821086518,3.3797861873534663,4.926771764732471,0.7279427561626817,4.686869814056891,0.3851756724576283,2.7023706202331033,0.2560726158199411,2.2295118297858343,2.648376750405572,4.049022930682509,4.282622540097077,3.0607488318543474,1.4990570713266105,1.0939309301874856,4.748285001174002,2.4105860374911305,2.222881250979788,3.9198056728831587,4.7408835036968435,4.428993482792087,3.3823704109330164,3.2095091614412805,1.4587754509654027,2.636753413938775,3.7907454938505545,3.2713088181526553,0.6983539306590703,0.3823760126658027,0.9634588783295395,0.6367660679813192,3.4418096920583574,1.373450339705592,1.9210782515873592,0.6634302593761809,0.5586859004138167,1.1416219769628477,4.766304474131802,2.701133502825636,4.857651221629738,1.379665359314679,1.2773044091155838,0.33494037167834056,0.7703300123457535,3.8718514199983467,4.656972757697714,0.06280315709076945,2.0404105134528336,3.37366798770614,4.677937579942576,1.9264036639728288,1.7044217626960878,1.286444121432706,2.0337196306506486,3.54585508171263,1.2764029207908445,4.409742228695222,1.4009450143638136,4.0165448884473856,4.691161313196424,0.6989350402995487,4.51494153150702,1.0234536284686047,1.7176429145363536,1.564803709918271,3.7397931954692787,2.2894582125492113,4.071115130275704,3.8949359080921173,2.317872730448106,2.122026974661245,2.5614952468711607,3.251770994796599,0.5678697986945003,0.7711787176158469,3.1876895971864427,0.31773507978798854,2.8664589869503,4.226854480721789,0.14103426256254714,0.833073545850388,2.71953048858398,3.5806011713104713,3.2914331699409116,4.8243693085808275,0.39911125570562866,2.0351916663458383,1.9123035601147997,2.4136161997533847,2.1437004727022857,4.983665705428533,0.5800528952056294,3.782999976843706,1.3844654445297044,0.9347214191882847,2.8205051222701782,0.2701387422291879,2.5666893236312873,2.019456454153883,1.0583344310878218,4.723775568143861,3.5191544704098443,2.51785656901216,3.1790679402175437,1.938370657855193,2.662918121062795,0.05290444906658531,1.5719513741225766,1.5537663204871621,3.203079938358171,1.9085785416954948,2.8056670551426466,2.536688078884536,0.0935715117431013,3.9627652595098226,3.2466629360262655,0.26588453750056473,3.9076895005994428,0.991300156427315,0.9554391059773781,4.630838389185769,3.905265416840579,0.28331709103173064,0.4349265852561979,3.704480150870002,2.756691051566149,1.8090258049002117,1.9463299395882994,3.495565996458759,0.013212699722804366,0.5854131329505208,1.7192263931624785,2.2670047726589946,4.245524299505528,1.8257331742702543,3.1501461623513762,0.9618447892985782,0.42851697606463235,0.18824321236412533,4.445576294440986,0.7275004493817194,2.325433458621826,2.078178602405788,0.25130572701380527,3.781077999298711,4.8344762782703885,1.7204769976088363,1.7125711967704704,0.2525336867701067,4.063117507015691,2.2440666515708427,0.2300963072999318,0.3746231929014521,3.128250248568648,2.767405140584164,4.293439434784991,0.4058802757535873,2.2748587338447503,0.6800654735717615,0.427340623716137,4.524971523786434,4.916506658898127,0.5261066897844735,3.093983467455279,3.9521356891672212,4.454467472505593,3.9023725317281786,2.554904462110658,3.7651736452408113,1.9007451707501977,3.642326061631922,0.5138392402174718,1.531628886066606,2.525523697469112,3.295988653950289,2.3017672154648894,2.1779978528909294,1.79437427016237,1.7905041218912365,2.2383229631854484,3.3763891934870163,0.3948062250031936,4.323844113261741,0.1974684583989783,0.889079880446747,0.14484947675139304,1.9311711906072115,4.959781387043264,4.360006941653529,4.747171763894775,0.2549032545074026,4.532553185681754,4.391552075451885,4.874864969731057,2.881531585699968,0.2399470925998448,3.5091524738743485,4.851143784897052,4.204958260056682,0.23097195260490255,3.3758204300718364,0.6751002615602963,3.5011316183752292,2.4392000175142368,4.790066695418228,1.535688192325747,1.0854195208172235,1.5760795272900818,3.3269705472522118,4.834611377269999,1.9025567341791139,0.995603857296139,2.9057856887503264,2.515849018241212,2.9021035974790754,4.82771430237162,4.31414115981665,2.286383076569618,2.169612745912175,0.3105217009767114,3.951351628332361,4.957458736235905,2.364318356961231,2.0826764515190077,1.2748063685731448,0.8353202579717534,3.112082089386057,0.9947284008556612,2.4537845225019916,0.9174779080716078,3.4443480836365437,4.617281144052093,3.6420106407040107,2.5990456838025047,1.6655999179144032,0.1434398476755805,3.112475563341074,3.986238403664457,0.6218774208859168,3.041941802242334,4.816849823181771,3.7076630357274167,0.21155437744725725,2.5340735649436965,1.0091519180570563,0.42995004648270774,1.382762685964739,3.6597722579457015,0.871388006521554,1.7035824097259344,2.424883668001222,4.468213501176008,4.427649119598343,1.7328269297749654,0.3415654680008362,1.438559579947899,4.64958614133343,2.2059789601085775,2.5052183354838986,1.0350063376083196,0.19189905846429656,1.718121379550288,3.950548843019014,0.9215649056869435,3.4529590752394848,3.9926946090394013,2.6404133569119814,2.3526294230995304,3.186045813464453,2.3658252077255257,1.524986866883481,3.503990687681621,2.0631358056087814,1.602356727814227,1.713233505497157,0.5031819172636254,4.777064997707202,2.447280827031001,2.7072515037024347,0.44761420730116575,1.8437233160486055,4.371532747803109,4.0893447959527975,0.21767501495525643,4.80880684935174,3.098474544330715,3.413827790267611,2.1420145754888065,3.8587991275617304,0.978735541291047,4.768693718992083,4.3725386699915525,0.5115170274926895,1.4195336001194792,2.9005885190438265,0.7740686851550083,3.331560364750908,3.707919333696401,1.617190922533266,2.3813415824049624,2.717467473110995,3.797596383909684,4.437866276980489,2.2894840310457045,2.2722654552504675,4.503307073687774,0.3923192570711598,2.2714770250591023,0.534847312498713,4.671608350414694,4.658403568562869,1.3904154035405325,4.125341128305497,0.030307751466444044,3.665074927988768,2.4835954814346395,0.6766391933086369,2.9097820193754655,2.3947244376396757,4.850731098858835,0.22118558734201987,0.947206764105637,1.7829171630277918,4.954876435625969,3.5471049446191003,4.348836146813447,2.8194125137858075,0.16558441501862808,0.5177817631781056,2.4096580488406527,2.2859543062434806,1.6189950023948407,3.081368768042724,4.9790245259302415,2.231599461898287,1.2478466208460648,3.673237759056617,0.4247514628406879,0.7758986097480602,4.505526606363476,2.0093037894062715,0.17994699736997966,3.812194102445937,1.8540365957273075,4.434605135261877,4.4178799294987,3.2508042050513497,1.5787984590711257,4.593582423980632,4.315616517377933,0.3184214317739509,3.5826514878091142,4.903016366526685,3.107865048989631,0.07657633683392562,2.446281773223663,4.109638116016374,1.3345385949295097,0.44886836323283386,3.40936846812262,2.3412203965580716,3.468084438075648,3.254789301582962,2.5531186074823573,3.1935601486843543,1.5357908834960887,0.9521749358596676,4.168772558842737,2.6554157356467,2.940083658472439,2.8960511603839576,4.333700822927434,4.726337273869761,0.7820510655727775,2.3249215944637314,1.6006499296020704,2.7745413749301617,1.6636766653453872,3.2651066318828583,1.4016653208134033,3.7694628620521478,1.5279036298726056,1.570500486952009,1.2918515224276128,4.067737543137292,1.187666001799439,3.516966831021783,0.0958667704503291,0.008751017829361496,0.1434859577265879,3.039797128956195,0.081730499395688,2.7010980922590977,4.497759767608361,0.08967671430187507,3.6127195491222484,2.9155297437799,4.279512063719178,2.048607204212546,2.7156565499925067,0.1432076933227533,4.898775080135782,3.874937800781284,2.202246320106731,1.8231163665075112,1.0851439766315507,0.23349020817300836,2.045469216364044,1.8285943937650218,1.4804770344471185,1.4058121847589966,3.754327994851975,2.8341228613802736,0.19472117767073915,2.9399995572317605,4.038437890539938,1.337791224063003,4.360585360188739,0.8975759666884964,2.5298307228844727,0.13086418116272203,3.0459809776965296,0.4762597017073633,2.3879915026781537,2.620975883894978,2.1055037740223748,4.283903745571147,0.0038844343916999424,3.309545920757194,2.7127957135658254,2.832226697821667,0.03619387562572185,4.0979144848906195,1.0774047779512974,2.901228098134209,4.4120536531636825,3.262719674793387,0.04264280086082706,0.37316412671735577,1.4528824284125774,1.1992221688061977,2.685578917737035,1.1982731761685705,1.4227017659003838,4.379482345708778,1.0864316853461964,4.005175445307776,4.350179261828721,0.2655874539156111,2.0792073505067323,4.509380852979553,1.679481671091727,1.1599654715515462,2.969385566127507,3.4989063894392713,0.6428978162351018,3.7101585147376315,3.693947679614089,3.874743198570422,4.457802440124191,1.4547511450755046,3.6467887286720146,1.4194641439593525,0.7090252902449412,0.9011715253535346,2.90279159652869,2.6686571395453607,4.958954101356535,3.726159382017209],"beta":[17.974012511239913,20.443245210184237,19.180057076771554,11.705147661350924,14.53661656716626,28.960861725731956,12.045776722767236,22.203491650614456,11.950707972457892,16.82911029176563,15.599167551138846,20.993854698030724,24.243196525804688,25.726098134895405,26.194561121554894,28.157179580225197,12.230484068725499,27.15651167322383,13.51395492638269,14.977751568006706,24.02515740068448,22.07642765962728,16.4254194536967,17.35262187254575,27.15051149950959,14.129299274835226,13.170008644946286,11.32800280217387,15.208665458157903,23.40336329085286,25.965933451192633,22.044962081882158,27.09690422648866,28.1609304254371,21.482731169212993,14.231293680625239,26.333738712381315,11.196387138547298,22.560658180054332,15.276267999050184,25.11946460064113,25.64183119294494,21.382176716866155,28.577808050502625,10.602065219712603,26.18242000225337,11.517092677978095,12.223483677890087,26.287758698052105,16.004481079782096,10.140230511734561,18.656701335336972,26.47143453553209,27.992809053508225,12.971657528482154,11.155310853879152,14.851475980605784,21.27501562136835,26.743388000713978,15.054947056724796,26.57828809932338,11.87812166134822,14.789973653364875,23.83220202357219,14.408139189652772,19.511537849673903,28.649595257713266,21.33886983001338,22.32115920476867,14.680669269098159,15.807769433878104,25.03353777483886,17.41004246205688,13.522873590856088,21.2959012576097,28.945753050236963,22.558370547569165,12.90343014128917,17.86898872425532,26.19049703208775,22.959411948246977,19.216148004794775,11.137544880597634,24.800996812705705,26.748493939685073,22.12832040782117,29.05785932703822,15.134507390193566,21.477941187158898,28.851624865416696,20.590084990555685,15.615577339040865,22.884806813393656,15.327954131989152,12.376828887470719,15.707295420229457,24.8237068838485,20.079448313177977,20.55676066774263,21.566782111315813,11.331993341947015,16.623814870163045,10.144144175698502,20.23634140988491,26.645486077444275,18.412993042650605,23.445762034689412,28.957329667911583,11.28791767686986,13.958416062407778,28.04796763339313,17.09962308328819,14.474931449921629,18.089461199806692,19.469006974303234,17.345146029974718,22.56783633504533,23.943117991541,11.97416253195152,18.26959820214947,10.217812817505356,12.134034382585925,12.610691860214427,16.220853035454375,28.261539081857485,27.04986021830454,10.706185809828629,10.366702816911202,25.052521058208548,22.27732715720258,17.767044583430433,21.629644549136906,13.890866361779617,29.828840682204575,21.74961211945654,13.067116873687157,21.119171562571104,15.466830107056865,16.409013445481904,17.504411623790922,19.46425312220239,27.5930352076192,18.107831442471777,29.211607960178423,16.402182036394453,20.504457426632257,26.35756843906224,13.894586275268942,13.432297900575097,19.56935897210265,26.282938215889896,11.591621815760348,17.69022486186694,21.857318950460712,19.523723192708754,10.836605077092765,13.922063073130065,27.682857212937133,12.906001271011988,25.585795160786994,21.4131005201989,19.458780549069008,21.35754105335853,29.41696564938478,20.671328161757664,11.788525243509325,22.094036703321525,17.480459353709627,29.839943176209474,15.98627794956891,11.913055283406301,27.14393753838781,27.397408881031087,19.03270810252637,16.863368125697203,14.972927760892144,22.282768433837134,15.601193585097558,29.583088464672848,22.187208866680205,22.64329159927202,10.27502175240337,27.189041442512046,24.32014130999511,29.932682376254153,27.3013424319751,13.16718099329568,20.103537442548873,13.020688481877155,24.33299436197826,25.3082379968801,10.84249245322981,27.94108098574906,12.94569716215689,18.476812089390542,19.150391800658614,25.950087747332717,29.807569806993257,17.967538118594646,24.600729600220994,23.490828980785714,20.181722615541553,24.57746363152394,19.550046060144908,15.15072347001167,14.858231899595724,22.207521644251322,27.36549819815428,11.024412256713205,14.745762317975753,19.243180520639967,16.137734700652146,24.586137274698658,10.205196471836121,23.790889120034002,15.662542488279861,22.2713473200214,15.545641803970787,22.80616870643947,21.932410532529953,17.34670387723702,19.657847426728544,18.58382856210399,14.595060004982297,20.249221055125606,12.82718369309272,21.156085284989203,14.482360117918187,13.064955428626156,20.37745484786726,18.02716519198463,13.416526196821206,28.971321989617017,29.590867162968173,19.070774926719743,11.196181431292352,21.539243522085787,18.55646344252395,28.07294710872336,14.905016519088964,18.246433574467233,24.858316963316284,23.086374189398757,18.781695517712144,23.615767002040165,17.987846809213856,23.89761223829154,17.775488813131002,23.079902367186698,29.49637429386303,16.24928027048182,11.594163226365367,10.648282053767147,20.197907012792633,21.414676096436345,25.28226865736002,21.665905449749584,15.614034142383794,18.962042790138053,24.97357941073542,25.96612524029657,10.03145746489066,20.763215635728343,25.806220953197997,14.068208880255874,17.912137916466495,16.30642520086763,13.484390963614818,16.091089606555435,21.829815379156013,28.444145820731404,10.11783213409501,14.276630238085243,11.674668902353291,21.770912939427728,29.85511752076065,18.968388175027172,16.95612301704992,16.64109609608939,16.499841543437412,27.845165301101925,26.474547590596767,10.580707527531867,23.633341964005123,10.499227605141632,24.55188706746077,18.689955778902338,28.95923701047126,24.58050112781089,19.394127192610352,11.806803799282912,12.928518629127911,12.422158298151507,17.840351515426306,12.315715294622262,17.406067096931615,19.345663533882536,20.03598221836026,11.65394327144627,24.918425121691712,17.81192277266463,27.231266820901084,16.257141971948975,29.338052816768318,10.948961387406623,20.94346991266077,28.759791568368577,10.774263340417388,24.871863058321033,20.80346684050904,10.28183894494132,29.56156665111884,27.796225225047092,13.277849244422445,13.136862716135358,25.86563549492483,19.040830837111244,13.572376638513525,19.128898379271085,21.711024766110825,27.087672866291296,26.144534559080014,15.345010124629122,20.34432857373011,20.616358577559097,19.48176437457256,10.61417868412557,22.816006875011684,26.80703468469396,28.15910971188338,10.557625882216918,17.83148358063308,29.234752833057737,27.09589991316687,10.95807049511306,24.512769649074624,17.24983157844246,19.390314772549765,17.6839026661064,18.321049505560005,26.795602422842602,20.246458192564557,22.102173297068795,17.850886883646005,28.169507103721692,12.78672006697163,24.38611610000072,12.938723925845679,14.157490203573193,29.585684795279413,23.50276467021885,16.414735591063195,28.544328540287893,13.850899971939107,16.84049320760064,21.033787349489078,20.441503751123893,11.495302034219081,21.526787002435633,24.2689046772864,22.044861096660114,14.935813225446628,11.987097943746914,28.543392056960613,11.54102988904068,29.374575285211073,26.305203348222182,17.851348161572336,26.9887467431502,12.681347337313182,18.551368041269466,29.10048727695369,23.81743980147342,22.331213445320685,29.749385927653712,12.747806611489722,21.27135491856695,12.812213178680976,11.795492556830691,14.830337115866792,12.272776445534422,27.284330521354484,11.514326743345237,16.504182761488014,24.769694485933993,20.363474996404875,13.691141939757232,15.422657355935527,16.775523362252013,19.456641002060078,11.234366029048894,28.427291061159767,25.24006466639321,25.05660206687461,29.358299913992912,17.357239736980283,28.997843018375526,13.480058160924905,17.158076145813254,29.40183855940326,29.991867695377792,20.75273597486234,19.733865294956928,28.125058011695636,16.13823560541355,12.537503253157126,16.14743753918612,11.505933682053392,20.067977177581323,27.15387833964458,18.01109575611292,28.421974189258474,20.374852397945055,23.63541108658321,18.253159163577422,20.20118139028723,18.267204336896803,16.34813807550302,10.717570380408358,27.29875646296726,22.638167792328176,25.08227127597044,10.983791317987915,23.128920060490557,23.119066594564764,11.060344626836308,22.900022419467092,18.896046376722154,24.54024123391263,21.922409680187037,15.001203652442783,18.832208211515358,24.33589887381759,19.552097067796602,11.699261679483225,24.807243157163782,27.1608347863451,20.739233501719383,24.18811557403425,17.67475459415072,18.52689440311419,20.932785305584417,27.494534396424328,11.293443082197818,29.802811130209758,19.571918074982012,20.216478394404213,24.99713524489694,11.183364645982374,24.298141239244814,13.830447177135227,20.120337288473902,12.157743317942211,19.769770857370826,22.941192257477226,24.120287516649782,28.760979026295715,20.279479199249778,25.998183851837734,13.425370692281131,18.927400835107044,14.602786181617464,23.869776654460367,27.02236739834751,15.160515994404626,17.39445124548025,27.08344635565179,22.994589568217087,18.29728456777889,10.447227831755171,13.475863977187267,25.0716025355319,22.503460084362974,17.856753623945917,24.30608075900413,19.786030506056317,25.64269613914664,10.824646549338329,13.778233422446435,28.12015543762182,13.330101542753496,28.74131534004774,28.9416899714508,29.115559322146396,14.39877643133383,14.571573046774517,27.832403574696055,25.051768566162174,13.192431214234084,18.13006742528342,26.68131572698212,13.93111085038508,13.375188284333607,17.764395965875572,21.89253696687458,13.1884163900482,17.049844231821044,20.195195337236772,14.893712670946591,19.453645817527473,26.736820682068817,27.55817313262272,26.789942340986876,21.65029040897079,21.68396956887323,28.233822495321693,28.292116830896386,12.951806549324584,25.806130981835288,12.292042625168964,28.49033709802573,26.34173496131269,26.506022639306103,13.550278737789947,26.686664549169123,26.447327373716853,22.350282629844322,10.443331514440706,22.520338192486825,29.600276400705553,20.31592553027997,10.843577779508973,20.801315677031607,26.993198464692156,20.30707541402329,20.3340528856363,11.172311149124123,27.719024174589606,13.060673619784588,14.527429910012785,25.426120475254624,15.461345063947798,15.449565274996097,10.853033958073922,16.971912356919553,12.770435603011837,12.709224433260813,12.934186431428714,24.929312980988335,29.56907871347456,28.802334109395375,12.105267586685544,21.412119323041452,24.09060828491362,20.04758898925967,13.874863754385572,25.539603355248435,15.424576881567674,16.885435131942664,12.784618234341544,23.76240209395867,12.515914587029453,23.574147691522004,25.026827842516738,11.17616127606103,14.4888899488679,10.406155848222408,18.304616244699304,20.237683695383758,28.055768090066245,16.26220134061913,12.917017760015694,29.266317833211776,20.9635944660786,11.83729090328387,16.421872337494776,27.477651908466694,23.509766799814393,14.24612322754883,19.510817746706465,22.982514084141417,25.959006506069162,19.54102954804408,23.89708257667906,27.14245081231821,12.58118787123049,28.890907813944537,24.271645206282308,15.896158855856282,23.843908733100328,10.080430909367752,11.36955460673299,20.71772391560822,22.597253171891488,24.456552331706447,15.2178712540633,21.209332852957413,29.56074532955016,24.941817341094858,15.554665288037214,28.32345489972807,19.820340947878066,25.386559764352118,19.792681407172253,21.2617338168005,27.00828427354636,16.79112090994291,17.496987407707802,28.108164292078442,11.4505387230701,29.19444275016636,27.59281296539195,15.691321904171316,15.369506607346764,12.707581087130361,17.926433149832487,24.005558620430616,23.58371985760055,24.28340292093708,12.872836892760313,14.453153229763164,15.01224636472816,29.0888248450857,20.664617751648816,13.583461345530296,15.938592024605619,22.297587019769466,22.85191383222334,23.361709086430732,17.346317095960316,15.978006073667776,15.816057012747526,26.374105831311393,21.60267327968443,22.647168438665105,16.092185556682054,29.903362538557,27.935204764171267,19.809645153867073,24.072812239912047,18.53342561219565,29.276555299893474,25.396421871991286,18.647663439831135,23.41983085723549,24.84881183403655,24.850813186713147,16.93638721548519,14.94112040870517,21.178194436559604,21.771154377059293,17.784145652353228,28.475126957243223,24.731070164304413,23.747124734090686,25.6157934897138,18.631958603889828,28.26007849803848,11.467278875731832,11.202656277102484,17.76976555345492,26.330575294635427,17.56960992665476,16.28665139211641,16.128217279480292,10.546104040956008,22.458221422552338,22.79761749264756,28.867169682222745,22.07275466097187,22.584245785773778,19.455995309126315,18.72910214048796,21.280096759560383,24.34120027431775,12.32962053153296,10.943723620365727,19.416124689743924,14.90285234714262,10.227855597728954,18.003511730125204,14.576945404687883,22.9626789651751,27.651335474692825,21.189198232252483,26.512061410399774,10.662216609179298,24.38868176115415,17.128330271939618,23.289269742559576,12.200419848143964,11.998223878481493,14.607486910984019,21.651216849331,12.830447506137993,29.53347118792078,26.438496155161562,18.37828861254492,16.87282770153049,12.707968083386518,14.620603167875919,19.70753588608317,13.895177083853527,20.24439263247876,15.225654378753418,24.834638527386485,18.651142967256384,13.155370856218758,21.035570176081194,17.650151973239744,14.229935287784109,22.875947555036944,16.824879676383873,26.204056842796906,11.970366311064558,20.66206567236968,23.99488580684239,21.075329116231593,12.179485308549998,18.22737211906487,21.07102000403646,15.590166544761757,18.016373877006473,21.737722753881762,12.827699190844118,14.065802569712416,24.631971027785884,25.661335279051293,20.488273297513075,26.39329358919729,14.125911852596262,15.669437433763523,13.557006503851841,24.813459696585866,27.63688087002524,29.03049750519449,13.980708330657258,17.00138361433815,12.470640066298873,16.979825228434528,26.07763864769161,24.357280664207096,17.9452850023393,27.44045002852584,27.352326140683886,19.055173977474382,12.798111402963839,11.431927358186705,15.469151718415194,12.779341340892767,19.142080342523784,22.82635685723355,11.009510127034648,18.20073434211451,13.514913332016278,10.182248523290035,29.14334901130359,21.51179273744544,19.24692333169527,27.060060555760238,20.6554729101012,24.037781273687923,27.99140930040965,25.810974529323477,18.45622826862072,23.11251059602369,16.83075411990085,23.53325465922428,12.293784780006796,20.42512308723005,21.818720786612946,17.58511362432212,16.997054774281615,11.101609461537837,25.51026948020619,17.100889151367774,15.067409479772307,17.720617294678572,28.239314671591696,26.242929136882104,25.77242827407014,19.849549856739994,11.015063742457176,18.39562634383029,17.582827446631576,12.314919897871551,26.041070777765096,16.843961303050563,14.454810981813635,29.893300636394432,22.590222224351496,14.25514348565564,19.866321246858483,11.57107229050769,27.698637631362438,23.89090547898009,22.976759592254325,16.147425322138716,11.286406398629492,12.031534838575606,12.411506410506048,27.659630067123786,19.65811864276022,11.56133467026796,29.626630281390792,16.257071303530598,22.352433005043473,26.628932385163367,20.16026591391203,16.523540252199762,14.690818460771382,22.745392926824568,25.33418962856992,12.150132940919885,19.84772286863294,26.078654383537657,11.46462375043539,28.816278509312202,18.61433317276053,25.796648118349875,13.523536707178687,18.55948911993145,26.92683687545163,14.253130045877516,27.1373868792311,14.44312945448087,12.299560818937758,28.713117427791065,15.423841842680147,11.11157875697931,13.04241503870407,28.302128323464867,14.005867333931018,19.043143229164492,26.183077726805216,18.797501061152758,22.71337215259887,18.250967651417742,18.18755214814491,29.905538758271213,13.961501428833266,12.423245651370527,15.922790872669971,15.143537606080336,24.280466821754906,15.788275932250464,11.966501756200621,20.667864631122516,14.969414984966418,14.276884485107143,21.169625023434918,20.926200319074447,24.271448120107145,16.209128857158163,24.18627681178083,15.380195894002537,28.210442870675337,10.64946640951634,21.06746762450185,26.976282107012427,28.00210308989914,14.245880538276863,28.799692501314414,24.357717666778242,14.190902208338532,24.014262175482777,11.113998086802876,16.50388830869982,29.85365997727638,22.37458746127516,24.4046360276273,13.528907833675223,29.153751078590613,19.29185434184967,17.774813243549232,24.68609760358133,19.770767151570396,27.044010715011044,14.386597220199185,28.45921337629104,19.695274877264307,14.425332075017408,20.158132194877503,23.984617757273345,10.877823657454746,12.381844974243421,20.43995208504888,23.98973839394767,29.823587251345973,29.318610061567828,10.799902166619905,28.49518894399597,15.7734287041947,22.624726722101197,21.93572944163411,20.558465601873742,22.692048723804696,18.226208703589034,14.533722983808946,22.799952501000405,19.63846995368824,19.09747854106152,23.65676103231217,13.728041759420485,26.41430075375188,11.701121656235953,28.112445790737375,24.16567122381371,22.584138201076893,10.341240021265916,21.839194146188543,20.682382854924413,12.561800662797564,29.031132833683323,24.400765227252357,15.928616730020323,26.693062921336153,27.208960226425404,12.78488975674843,21.946869583895023,27.01057646161113,11.051635997518488,13.060052284271704,16.86911076689064,19.51878234307592,22.265123004834994,14.414358535472687,22.170543080172212,21.672171150711172,15.298366370427466,14.42710295990862,21.87207417161918,15.968009599193529,12.658342374414557,19.675809716788436,25.504384608789316,23.803138028598497,15.873893836227676,14.509978109848,22.22310238785605,22.144386918839402,24.020335704101853,15.778635259730152,16.268531270252296,29.521535392425697,19.13207718954824,28.298453548477358,21.146623071127184,11.611559882086775,14.428529744854801,16.681347620058688,16.552892473048576,23.602855581512813,25.17921498430542,18.854115214246683,11.135335490709384,16.912296530376775,25.377747726486575,12.561852797138137,27.920319274821054,12.770473950094537,10.793645163058434,22.167854540874487,20.04535117682928,28.145876890121357,18.239198631723074,10.40897659200306,28.449289983417557,29.668843142677034,28.46417389604952,14.143492283945648,13.118285319657303,28.372787913517424,24.103158646557606,22.482717572282777,29.543227421792864,10.178383472641492,27.78808798662225,20.284579847050587,25.310416500450913,24.956190400455366,26.6262979840188,21.24279416741762,23.970572256506646,29.704693920855284,25.867366639158845,22.4748755712659,12.253757524958315,18.28968101504717,19.477055601681723,23.877936579372935,10.355317355872483,24.61510381328811,18.969483972963936,10.281295238185034,17.146462565554238,28.791021344952284,19.014069244108104,28.98412388043436,12.559620063027523,13.211856745051387,12.970665908132673,16.532366343551175,27.28226178598497,26.85252187711081,24.301135783665448,12.183243149422754,24.453495414391718,24.595562603334933,15.735148453432641]}
},{}],29:[function(require,module,exports){
module.exports={"expected":[0.00017090542097012964,0.06681886714786979,0.1624009644571904,2.858758797423539e-14,1.4270182651965778e-10,7.348986069999151e-18,7.661367970110033e-6,1.4001474986358937e-22,1.5595501248268221e-7,1.6779972419456013e-5,8.45799052821115e-14,1.2024029262800563e-25,6.44387628540529e-15,1.8913767648413788e-8,1.3997323331091897e-12,1.5599376715046914e-22,2.595056003288023e-9,6.582525802578841e-31,2.590825795009544,2.6435174111613236e-17,3.0296836574275296e-6,0.837248828855231,1.4930276366093653,4.5560957041810835e-15,4.959888458026927e-13,5.646735160907392e-12,1.7281198871768981,3.966602544138083e-18,2.294274336680688e-6,6.27920189769134e-6,1.1906399384609017e-9,1.0059824649913181e-16,0.15288897604078908,3.904147230357847e-28,5.926007400470387e-13,3.3424347549098976e-17,3.5841230552140656e-16,1.0167235220377112e-10,0.5133627430779228,0.3981062730204492,8.25395359262056e-16,3.245467322767917,8.363188885321286e-21,0.1447200489031809,4.818879904888457e-9,1.44259761154737e-15,1.4252881578705002e-12,8.074796052090437e-14,8.010466583215155e-6,0.755338827769218,2.4012916415082993e-9,1.3810721741154067e-20,6.573872386757338e-8,0.00014103900648470663,3.867957715032335e-6,1.4394767562959638e-11,4.8452183564209434e-14,0.014052898848537266,6.483039990873048e-12,6.692995174885581e-7,1.8888664929921943,0.2795233545317673,5.075041086861837e-14,2.5046732826405306e-5,1.5274789998013196e-12,0.3256372115201834,8.52333058081187e-15,1.9655185614832236e-13,0.0010150556082267855,6.569894794569753e-38,6.287921947217462e-10,8.083089580027949e-26,2.999099306946487e-29,2.64595843290041e-15,0.000597921140423569,3.7146980890059393e-25,5.763940991280287e-9,0.10087331959225039,7.510772357436944e-17,0.5926445619875065,0.12480950551722916,1.0550654226422215e-11,0.0006608152663579016,0.00037456799903451334,2.817932092340545e-18,0.007984740112936622,2.7408103579728137e-17,0.031421033897509554,2.5308505698241433e-26,8.307880425474311e-9,1.459786275729628e-27,2.2955085057414175,1.812231579112671e-11,0.002203792980948652,7.190696064268785e-11,2.0335563725261493e-14,4.405502907056704e-15,3.472503606189492e-26,0.25742977619964186,3.5218220993778533e-20,3.3643595758168776,2.361193055921662e-12,0.003372471122404057,0.00034379642342347277,9.245861867725468e-9,7.818106145602292e-31,2.1454511238524943e-8,7.659515261905021e-12,2.372091686947336,1.5654008779174514e-6,2.757964139929243e-18,1.245319007942141,2.8972379585435073,3.118563004422049e-11,1.841926968669034e-26,0.10469327045978868,2.204336473734229,6.035947819830449e-7,1.9211610330768285e-20,9.891760725563307e-18,1.973086313951148,1.3451635540641747e-8,0.2186644485253202,9.112693133814813e-11,1.7648548505637637e-11,0.007293199522043381,1.697530186283332e-6,1.5700684501564617,1.7464281917383468e-7,6.828127584756334e-7,1.5058379865337468e-15,2.333982001242647e-6,7.671769743354146e-13,1.928193446105974,1.526650062719678e-16,2.412432248328247e-6,8.662498997173881e-13,0.015867775149104722,0.9540479412505457,2.332537948905802e-8,7.770373157724654e-9,0.00010256865924961521,3.115043052314973e-6,2.0902153896791494e-10,5.487553387265511e-12,8.973128417764235e-13,2.342853875893327e-24,1.6144782737338474e-15,1.5895692786650713e-11,0.03257681281449324,5.587868293837043e-26,1.2560904799670982,4.2944328398075214e-7,2.1933955728603646e-23,1.5453229503244478e-17,1.346895506508363e-15,9.561680933694415e-33,5.9527246624936725e-27,0.0006428096180880818,9.682160654212223e-14,2.554775646027543e-10,8.963542134161667e-10,0.00021224741391952617,3.726317965216222e-11,1.7069326921418706e-23,0.09963687026026426,4.678467104970504e-5,1.1061629040127402e-10,3.367813476996815e-6,1.2981314952793338e-24,3.725425328048518e-9,1.0533618282610455e-7,1.5195096597700586,6.508718115464744e-23,5.12500344268138,0.018631582925414555,4.842975549086419e-11,6.74306351323745e-11,5.855678990861255e-32,2.485125092409514,0.008445842308874433,3.4212265227873993e-12,6.886431007069478e-14,7.202988791707823e-17,0.005940498669110824,3.1565025848033903,0.09036069660081936,0.8054592334360308,1.4238010148265066e-17,0.3989279601196779,1.706864797202593e-9,1.0918850730843988e-15,8.305729792182147e-17,8.083072838785106e-14,0.0006681922473313434,8.94008716602558e-16,3.046503817284177e-8,0.9651980170426748,6.144412104105569e-15,1.383015226588537e-19,3.697224163655791e-26,2.9326893138596382e-5,3.725140569289695e-6,0.00013885847227921476,2.518083379181803,7.085301885948879e-12,4.626908073113572e-12,1.119092773373807e-23,0.07246124421460588,8.928014481446623e-5,1.8286363761064339e-7,0.006446063969505869,6.002166321736565e-5,3.2516734349073594e-23,1.9514224908869395,1.1665609229087188e-5,7.931867911734898e-19,6.318754475556953e-6,6.538452408940847e-13,6.191363898613843e-31,7.501113758372517e-9,2.44995267856508e-10,1.8638582030049293e-24,2.045520786942532e-24,1.1593973434379338e-12,0.004374519552942531,7.748401702635366e-17,8.890362031596094e-6,5.724117889715083e-32,1.9970479699881415e-22,2.185249832563861e-16,8.26978315000343e-5,1.5884816232110432e-9,4.4230030071983824e-23,0.5630886786064632,3.7170654197166697,7.994971766473275e-6,1.8612962536106082e-8,1.4016335421107557e-17,1.065559332127354,3.00306097335713e-7,6.895335532872651e-26,8.345589494225667e-5,2.0684691911431737e-10,3.692398896399779e-17,1.9571154128003275e-7,1.7274406880549322e-14,1.8938573760245964e-14,1.2526305429917685e-26,0.9530253455841452,0.0033802430240082383,2.3035628110088053e-16,4.760660284810798e-7,7.750038447973231e-23,0.0183029879791801,0.4477765085986028,5.248177195032917e-12,1.5162262090966304e-7,6.775250225434547e-26,5.558290403360161e-8,2.596461679765208e-29,3.4451129539168094e-10,5.042396692222107e-24,1.256572712688875e-9,1.4621707188720034e-19,1.0761497142358096e-6,3.378340802090667e-25,5.493060051418246e-15,0.00021063473972761585,2.0347881462939814e-6,1.4327575748254797e-8,2.8465158392508573e-19,2.330443307232573e-15,6.736142999056684e-13,2.276334721145261e-6,2.4894721882354355e-5,2.3782966225566638e-18,8.73574692247549e-11,7.504499321150623e-10,5.149103673392255e-7,3.290228132746848e-7,1.1722952262352399e-9,2.4453722367573732e-8,2.2955664824019815,2.2095460162645935e-18,2.784338244278073,4.9298165668684514e-8,8.001561807906262e-8,2.793379018161618e-12,1.372775431436515e-16,3.478887449948964e-35,1.843056195876367e-11,8.046409722021681e-10,1.2464431147230122e-13,1.5927133777428752e-18,9.433637545414496e-11,2.1682235029343363e-15,3.1491404138891076e-27,5.198092469076203e-6,3.6965277967039627e-13,0.00021825098334940553,0.4545859200054794,2.9325711755400497e-21,3.281111868824602e-17,1.1792679647833226e-32,2.4452082713945686e-19,2.1143920213716878e-36,3.762643938696383e-11,0.3900543417522253,2.9550650852391535e-14,6.829341150355592e-14,1.843113066216027e-17,5.058964832593169e-17,8.461285030407206e-16,7.075881322069852e-16,3.673850409828946e-5,4.205157266469728e-19,7.389687528522918e-14,6.015268150287487e-15,1.9970611261950205e-8,0.00026015903802401865,1.56042716018038,4.025713492571889e-18,0.00021439578814834892,8.013280984008055e-9,4.239726746656445e-40,0.00642499825306336,1.1450943365663667e-21,2.7166640331789246e-17,1.206643386619398e-8,3.174103125884144e-23,2.8119435947259856e-8,1.4570180990160866e-28,0.07443253376608926,4.872344245804403e-15,0.03725920501299584,2.473208254202177e-7,1.5108673397049743,3.3712282601831516e-10,1.8746811730858896e-25,4.310319899071775e-9,4.747179629755634e-5,0.002285465854651782,0.5906704154276671,6.177960427975084e-18,0.05614580881999641,4.625922022299268e-9,4.245695815507966e-9,9.343671671872115e-11,6.65578019521702e-7,3.7371508000182695e-28,1.0957366904108944e-18,0.00018723543261785626,8.50039083499867e-29,5.30345924477829e-14,9.679374975394534e-21,8.731947495565596e-6,3.110783163064958e-24,0.02672102011193756,4.1041852001611126e-12,8.08584614383877e-24,7.250454626605825e-5,3.9642013654264946e-14,1.0769256060971295,8.923088801549216e-17,3.097722299029245e-28,1.500590580768282e-10,1.1350391904735063e-13,8.690894418869215e-36,0.5753485928688507,1.9998144333828963e-11,5.668205567990918e-21,2.119687279085008e-6,5.46665871350544e-31,4.928766993834404e-6,0.5719093385813395,7.071871550564952e-20,1.3964350622941846e-14,1.9389557465510618,1.0382006463942077e-19,2.5033691621555913e-16,0.0031922405869395463,0.0007042943327430684,0.06112563344566057,3.839456748600097e-9,2.377160192534082e-8,9.471851851685869e-16,7.183533591314814e-20,2.961337956225407e-5,0.0003301369560453514,8.375585216163713e-10,5.610806974725204e-20,0.04437360571005259,0.0034742980939741026,1.7871448086483052e-8,2.75171610969996e-6,6.956683785935361e-25,0.0007240728892757786,1.7019743051098177e-15,1.0645312143868978e-15,1.9819069777298374e-24,5.43426009644325e-5,4.0935325815155216e-16,4.907653844528172e-10,1.0519269768083168,1.6527080997327907e-10,1.453998622735303,2.772955249645524e-17,1.13895836319287e-26,2.309048938494766e-14,0.015031323828789949,4.162675215478237e-20,2.9406804432821732e-19,2.4739782284323705e-32,2.961267048832627e-20,6.462292859041526e-21,1.4999631656386753e-18,4.010831795795264e-21,0.3162315606173897,1.3183064477129739e-11,5.768560935443979e-8,0.001157525513831991,1.0230598362019037e-5,1.8730082243513972,6.340786930817554e-24,3.381326638675671e-16,4.840955742769492e-21,0.0011424399972770588,7.220074219314956e-8,4.737238719665814e-16,5.232141728326218e-19,9.891578922780828e-32,8.68013524666722e-11,4.54193927888616e-8,0.005382229327044221,4.8068649510555145e-18,4.2532220715418405e-13,1.2182157346313582e-14,1.0094016811187494e-12,0.03267537861961625,8.644143233597654e-12,0.21076757136594856,1.0253508298995054e-7,6.0537192025694774e-30,9.01287968644646e-28,2.428073940440762e-14,9.42275559879133e-17,4.166111767152216e-13,4.9023517413878986e-36,7.432967935153727e-25,9.734439637250582e-32,0.36303669450330145,1.592137752057838e-7,2.3317238503082992e-30,1.5178956233496084,1.60214975617078e-7,9.917901842478838e-18,5.965717506036661e-17,4.9747501009215377e-17,7.162753922232319e-17,1.8223825617224476,0.09010309545402133,7.403829475308557e-12,0.011912836326381454,9.668119516094208e-22,4.074447052633098e-6,8.752592905139854e-11,0.008750978940636442,1.755763402679695e-30,1.6223256057018282e-31,4.280015838618398e-12,2.723448843369e-7,2.7319195097197554e-24,0.8763174534258872,1.0499122872003564e-19,2.3410124768814596e-12,0.0026857119633548684,0.008814535372827276,5.566600823782354e-23,3.6922888824826124e-15,1.9916399991109337e-12,0.6463931228524191,1.8317661170046156,3.944501338365159e-18,3.33626390885676,7.249146519781634e-33,1.0939990799314611e-6,0.12589858975006202,3.437083241957982e-8,4.045493585818359e-8,0.00022824328274668193,1.577029649388702e-10,5.283139751696291e-31,1.8209812359116302e-6,1.0844563439583087e-14,0.002320956620998347,1.4983582176514723,1.1832751353813486e-8,1.4756347828066971,2.046356178292247,1.284536056040592e-25,8.803371527961637e-11,7.5673808705604e-17,8.568294540900373e-13,0.0006242378230159323,1.9348497835396367e-20,2.7758297798803004e-13,7.493109423193957e-22,1.4032370899214483e-11,1.0111962219673324e-17,7.703569184987087e-6,1.9241774961768572,2.7842089743893506e-28,2.503180125153516e-12,8.76287669548812e-9,1.628462417101123,1.8985017696694243e-25,1.2755554884735683e-6,9.565435425728878e-28,5.748798894119876e-20,1.7169509518272013e-15,1.881743144142911e-23,8.59531159551262e-21,1.1432171233651334,5.955310013764462e-16,8.893530689428746e-11,1.7834196146015097e-13,3.0217595405365445e-13,9.311370804916118e-8,12.355321241130696,2.1152427416593316,3.2175169767286575e-9,9.087203499231102e-7,1.479544233002222e-21,1.0035260515204044e-13,2.0000231903269877e-28,0.01697875924707129,1.7274808122208722,0.0051266201832261766,2.317511448630166e-16,3.819034435768328e-22,1.757684476350321,0.00048704299191667497,7.638377327544406e-19,1.4726041126603902e-17,4.9232092139783e-8,3.3730991678559175e-22,1.1206681281924644e-5,0.0792855899404532,0.2332761310911412,2.228434931481652,4.0222339632088034e-14,3.035826364165479e-5,0.00016048160858215708,2.1590182911920755e-9,5.5009737407463564e-5,0.002874956060240459,2.3937284404826463e-31,1.4126227979265242e-7,3.948408336602175e-22,4.0259328159539265e-19,4.963203914396876e-15,1.2898798198499604e-6,2.1400121586537393e-8,4.787377059080712e-28,1.0168329942923407e-14,4.522860894346076,6.164916268496114e-22,5.735876703353307e-17,4.0356884608255893e-10,7.392788262272537e-6,3.8429079317325485e-7,4.7194605849153275,5.3303834325936275e-5,1.925839814155805e-5,7.067656457137915e-11,1.4644175394903304e-5,8.341798672198123e-18,1.6547826794740759e-19,1.5014869107242482e-27,3.3077715430862634e-13,0.0072550994668662055,0.01630154308150693,1.8121801281122441e-16,1.7504345988195802e-14,2.5721847542325428e-31,0.2211890253233981,2.9005754777237103,1.2380004100178263,2.5611001570730146e-23,2.054423485667857,2.0130352281029957e-26,1.300890252810865e-15,8.812105572500977e-15,2.6088627680920295e-6,6.85287782285852e-5,1.7518809662670358,1.4933960336800484e-12,6.11629107373839e-20,2.243382414246651e-18,8.425605079292166e-8,2.5449966094711987e-29,4.235606435778639e-37,2.6010943325734294e-9,7.26192787249732e-13,8.582244157875328e-5,1.783671970883527e-9,2.1604120383659027e-31,1.4148780821838524e-17,1.9474647852899245,0.03338199429231788,0.0007074731216997851,3.2452375236448706e-15,2.4712222152705734,0.0004159266305699098,1.1790303920342584e-26,0.9003442484967754,1.0931936396562681e-15,2.3987237375055178e-20,0.4042533506336688,1.0507790747765232e-23,9.45124321375621e-10,5.3803759209434935e-11,0.03279440613412719,0.00028140406971948384,5.5769853832474605e-11,4.262255010770299e-25,0.03803067190009026,0.12147663043516804,1.0020078726313233,1.2504367186486414e-7,0.0011451076388216545,4.022608580195501,1.57376381017817,1.1051649404356432e-24,4.931544908970388e-5,0.002518957091075952,9.584616925629833e-8,3.7543004354832947e-6,7.036869819612924e-20,1.1531260874651113e-8,4.882923680174084e-7,3.3313250410972295e-7,1.1109145417974761e-16,1.3866635096185192e-32,4.0726943803726544e-13,3.684823819505661e-12,0.0017493484668233952,8.520070492444335e-17,0.9768886053226062,1.9663620273309768e-6,3.0958508520819428,9.441477793440636e-24,0.001272995077973866,8.086282929577543e-9,5.4799666038136905e-21,1.032678256064373e-21,1.826113729223974e-9,0.011919707701516728,4.604272376912078e-18,0.6976073525159133,3.7691004953847834e-16,1.1936856778307793e-14,8.562644961754553e-24,0.0029742683160326067,1.000071585712802e-18,0.054491363963262235,9.785155818389834e-33,7.99094069330745e-19,4.095664291286539e-19,2.4322055692646166e-17,3.456364167726045e-5,0.014399209575576638,0.7953132033985489,1.3531653406981652,9.224733156466102e-15,0.015996146256822667,5.578087793934566e-11,4.785520010471436e-7,0.003334508411511425,2.9879397739164736e-11,1.6346964214891382,0.3964244325649553,2.7314120977014823e-19,2.796697222117592e-5,1.0629650905755737e-6,4.952569648179732e-15,2.646347230906201e-6,1.5435986247756347e-15,7.410833743273928e-5,1.1275072792921269e-5,0.0005983920934751525,8.136519116210667e-26,5.073041960873714e-5,0.001057111820906912,3.291134383487779,0.008715226073066353,6.182330330055331e-10,2.6783457856125627e-27,6.68915983744016e-7,5.057226270163682e-18,1.6165745956026472,7.592933843557124e-19,1.4711420752783902e-19,1.7340306043005715,0.0001392450288911975,3.305607741099317e-14,0.32175291098575215,8.120999225323136e-13,1.7733114148220228e-22,6.530165792147662e-25,0.0022280196288337567,3.2174624110530275e-11,2.2950396629230186e-7,2.2240655737199032e-8,3.351284414327126e-21,0.9118618141077899,1.071212126608993,1.4887034100985385e-17,4.6063433018239007e-7,1.449299222046893e-6,6.414846505973846e-14,1.6426922213538453e-9,1.8651403796691415e-21,5.637738438058097e-25,1.0503399563627129e-16,1.1479033701510204e-22,4.2897439858008483e-16,2.9743444114485542e-6,0.7086421793832642,1.0357952374123239e-10,1.5219983519040103,2.0640548099709996e-8,2.7358385482521737e-17,1.3647064926251665e-25,2.337892159360319,0.1848355952953381,6.590880215554001e-12,5.993040792362462e-16,0.014839367634749485,2.423852226802167,0.1412706724052295,8.140050098566981e-16,4.248660590384373e-19,7.039072454364262e-25,0.015069690207295022,7.36424459704687e-9,8.32719612401561e-5,8.916357878247889e-24,1.2634757963879936e-31,3.9798850690606127e-10,0.27100558881301806,1.888716623932347e-15,5.146771207260405e-33,1.390094716650112e-9,1.0570796549105884e-17,4.778111131871691e-11,0.035636838467326896,9.546765965783089e-11,1.5423121479170257e-20,2.2628146898337532e-9,0.001233374871917897,4.767277069748766e-8,1.5385340051588626e-14,3.292559788476411e-8,1.1485101389031503e-5,7.368098435886326e-17,3.204598915905908e-14,0.04203559426067973,0.17598420352121016,1.0326856355817067,5.650805547326631e-15,8.701929495200334e-24,1.1931444484483849e-14,5.9254495846387444e-18,5.240374271647319e-26,1.0689776082200156e-30,1.5029589209772824e-6,2.271624613240055e-20,2.9632019234516873,0.029871107816385575,1.2433243114307768e-27,5.113911632860514e-7,2.986899669349196e-10,1.2219910169944302e-26,2.3904625616645653e-29,0.01136874686912045,9.44926848936654e-20,5.009537752791079e-10,2.0489009005106662e-24,9.296452638052515e-27,2.2564303552275936e-5,3.5784109927922895e-21,0.07566133557385632,3.4883637121207903e-6,7.138777320131586e-15,4.520206180357528e-25,6.879857999206011e-19,6.2277304264446495e-9,1.5109572056729389e-21,3.8930645569726277e-13,1.114674229034483e-12,3.9361617810172153e-16,3.485191290206878e-31,1.89216725528442e-16,5.970964459900274e-17,4.737912606594457e-26,0.0636893556024386,9.72306594994145e-13,5.3505806399551824e-11,2.647299376272273e-23,2.1883256243897415e-6,7.020591317257426e-13,4.840521878326952e-8,5.9086557676615604e-27,2.283184720280478e-13,0.018018617544264398,2.0239838977147087,5.229515861796736e-24,0.00012545256558691746,1.736189428167067e-27,0.015257391658975801,1.7662105044342184e-24,0.0002932403915876803,9.384253315936138e-10,9.807317725310763e-8,6.932711943402912e-17,4.53856522571518e-5,0.00035337640031096946,0.004432075852400834,5.19320033212111e-12,2.8904020911136293e-12,0.006473607886106899,8.940508444531108e-14,1.4237719329894246e-20,1.770657415602049e-5,1.3618324775494035,8.043165781208452e-23,0.0009354618388093223,4.805530240535219e-17,1.8565732653809595e-14,1.8474456473333564e-16,2.6911053541257774,7.042152014966796e-17,2.260275274472425e-16,2.6886012418377903e-22,0.006370173645745078,1.608539010991422,9.511260348291466e-20,2.472579134386886e-18,1.4015271054598524,4.984747008987621e-11,5.504210786096725e-16,1.1012322272298352e-6,8.59797438843186e-9,0.33753779904544895,1.3022819869821774e-8,0.35585464090735436,2.755480784702066e-23,7.785804040564988e-12,9.669687697144036e-30,1.5582863833982203,8.181030928497837e-22,7.188932398093548e-11,0.3281025601379297,1.2649196491916898e-8,0.009153447392411593,0.6920436708606004,7.461896600748019e-9,6.569837714836084e-13,0.00034470277763937613,0.0005198818606788587,4.769942928473074e-7,9.809984130601772e-8,6.691675192614446e-22,0.31782655742791643,2.2442181385443576e-13,1.1115141218475752e-13,1.3679893206169393,1.7245326160292023e-7,4.578081855056134e-11,0.10468186012190675,4.342792848940217e-25,9.057010820371582e-21,4.01293342975314e-18,0.00028803234507568224,0.1157059158416088,0.008626611228866153,2.5157757621536838e-18,1.8651347569255586e-10,0.13984978873197243,1.488179408825747e-13,3.361115239264431e-35,2.597718118051121,8.469960502536322e-17,0.00509940370260981,2.0423758154105978e-9,4.49071506445878e-12,2.234894077851675e-14,2.733509545679622e-6,0.11009806937040545,0.03661725156656355,1.4159664337678326,0.8174700507849458,4.493720077192725e-15,1.5988284418865983,6.990906920054863e-16,0.18097680249027867,3.137063613403136e-19,3.77768403760867e-7,1.2571328469876603e-8,0.0007630385416551074,1.457922467521697,0.001344460170990399,7.519765675697046e-10,1.8603858912980287e-6,3.7520038986774996e-26,9.219717040131192e-17,1.0279616691150159e-18,0.37841138101698996,6.907060803560296e-12,2.8531857517867245e-18,7.035265398333015e-9,0.7703629492182302,2.0152354103075666e-25,0.5530484600636159,6.412941255456559e-15,3.8082904089574213e-16,1.6756859441947402e-5,0.5747429518689265,6.754892236763941e-20,0.005877462992469147,1.4016272188251568e-10,0.0010949876142406583,8.899214240523668e-17,1.406307815421597e-9,9.299650920317047e-34,4.884221059239228e-19,9.148609971704064e-18,9.784356497364587e-12,8.814629711917293e-9,2.069480521666407e-5,2.7210190914487244e-19,8.43574924600662e-15,6.162355544710678e-12,4.369386105038405e-24,2.0464542635367763e-8,6.832015206903997e-26,4.339709203673779e-22,5.99579824475769e-15,1.1772915037295572e-17,2.4322054021306348e-18,1.0449796884755015e-20,3.021086228561606e-14,2.807367162645575e-10,1.40007976674018e-18,7.791120953475983e-5,3.805361311391283e-9,7.724637713456081e-13,0.39797320354875587,9.419854157745844e-19,0.03261668426378621,0.016555042995012825,1.2689640467220798e-26,0.012696116332766018,4.46025607257926e-24,1.7831154436964838,0.5262485442328654,4.411207242856372e-16,1.2627861885370048e-6,4.344482905076892e-16,1.154942238256518e-12,1.1665641138857255e-24,2.767987843593142e-17,4.505116711589009e-9,7.066439599084006e-8,3.421724044207078e-19,6.805967387982031e-14,4.541797429902078e-11,4.007298090582288e-14,2.3736164977587002e-27,1.7238686958536163e-9,2.6169925730823615e-10,2.6400730432005383e-19,3.298875332338672e-8,0.018675677196187502,9.994389824207295e-20,1.9211333021007064e-9,0.4865187120207787,1.721441804182537e-7,3.929118079344187e-7,1.8580401044811548e-5,2.774608639758409,0.008397300554109387,3.458924643452852e-23,0.19989675556362746,0.0006904840255387431,7.077986083934268e-30,0.0021514822728852696,4.624282392729597e-18],"alpha":[8.348936344641968,6.738478424163146,6.253891148999009,4.362150116575389,4.649119966441313,3.573482038138931,7.880922299419506,3.6743585672320123,6.984642715659916,4.952269823073781,2.5153736771083923,2.7917747047772234,2.5981489283958337,2.4972349569943475,1.5326918503069198,1.6686983389932264,0.9515359424077174,5.717173621745008,5.543693834549968,4.503624136198658,3.1682178374541015,4.330115605177449,6.372505564283546,8.544148025447878,0.6723529100328673,9.64339756508445,5.988301809490542,1.1651481314765388,0.06621446225531846,8.618871743261227,2.58011527164411,4.354948245534946,8.562497115621737,0.9338836800875039,2.998782038292751,0.11218457739257115,3.8294285148575025,9.211788966115309,4.57624418059874,7.347239694260281,7.39862738261613,2.8568148237274205,2.2733241224631273,2.0670890716581725,4.429300103728515,4.7493105797207935,1.8060711420170006,1.848128228552599,7.312848946208432,8.42081363956603,1.0422850856101329,8.119580386668865,9.839354856038202,1.4725709118281438,9.631907018532754,1.8305668692027877,5.344487410359022,0.8583154746632427,8.672895244327714,3.052950249693933,5.490512561080283,1.8666541246645796,4.829005951587286,2.60455809663523,2.425701223676391,3.1836811106698604,7.186404309552692,7.532639643546739,5.0042055062845385,0.336237133793289,1.587568759271949,0.282659649075756,6.264470514510996,0.46535459659783784,8.331356550379443,4.76557857557153,7.905913126242899,5.78840456294061,0.011084085191095383,4.831094526734542,9.123853948818471,8.885914825098624,9.54401044380653,8.482240417960785,1.9288391536067828,6.7378667429053385,1.8294534610680313,5.6010204384095434,0.09091926549332996,1.8301318727645843,2.964188997211552,2.900756061812484,3.7290601115811595,7.509311117362545,6.860748838563524,1.45654422938857,1.333674673064844,5.327604925624705,8.064060530161326,7.791608364706835,4.993466612244017,2.9312880694218024,5.720084697439232,9.529944784736573,5.031093193895617,4.397898472420634,1.5840309835844613,9.536277154781914,3.4740763381965256,2.9679295975961195,1.6892282490856392,6.679798125300844,6.773687720084358,9.519646226665088,3.5812281530680012,5.470633300669087,2.7397046618894483,5.879124748429383,1.0242143689443428,9.406104610757257,0.13009499658628076,5.9653663245056325,3.058650932621092,3.1665976096101667,1.3807402354139997,4.690350255001805,2.146257366649027,5.559543960919521,8.201132285956854,3.8837770720997744,8.50013660914864,6.065354779486083,9.245957435648549,4.804977922279818,8.170576239491554,3.2393377809138624,5.803269728180689,5.566433532595196,3.4230392242546293,1.8385312438878554,5.5540208457918165,8.657611718753031,4.745796888926471,3.7199074897552187,5.876038810316397,5.059166090672457,8.659710349335118,4.374513721337725,1.7992438846759384,1.5789428455175059,2.0196896723975533,4.837264489116504,7.818551938057916,0.424891470090738,1.5706377701827878,6.366276281243161,3.85897131051844,7.384325512183558,2.1257083834746737,6.600132735788131,1.5532248303895302,0.40701527756808575,9.39042273199089,3.562270462551047,6.029279106226399,2.3180232101964626,4.3319172340625105,7.635060718344255,6.609477768515644,3.889065928170923,2.729394955860962,9.398329808474529,9.607502297514252,6.065712051658849,2.3330343132126075,2.1315166682958853,6.759545304934864,4.7525778945189145,2.24765622209111,4.393143252703487,3.7999153608477343,3.605424310010039,5.414961741166779,5.637949357440548,1.1875902029131025,4.476056730003901,7.619076881242062,7.942988166015413,3.765713232699559,9.23364552515244,3.5846223284056067,5.894346200342997,5.362518352764414,0.940877936596547,1.23638859622355,2.463517442395886,8.807757307217114,3.0222941947436666,2.9564440007975867,3.227459371490309,8.241062016542305,5.090880979990226,8.927977425005686,3.4131390555771457,2.281422379488802,4.9849648345412305,1.8795500121551356,0.7850361226631386,4.807493066649641,9.75524776633511,7.829077929159309,2.7740619342925577,8.536111559581162,3.614250469225011,6.255113118616034,9.135228090663439,0.6863714804320131,6.54199826078713,0.7428500380161784,3.658564189114233,0.9702192402487175,9.130446107324396,1.9611945597219371,0.6898727853259912,7.217275653572244,6.292817200682004,3.748187478640137,9.517955215860326,1.7915805370369964,8.635996793203258,2.67397962844812,9.339063073730982,1.045669470983337,6.0781025427996465,9.161889999456294,4.556745862365403,9.322845508138379,3.532001528383002,3.8692703897748526,2.5608243549503795,7.369282545031764,0.5460467075818509,2.3519354212024313,7.5000797464897495,4.604264871404267,2.729922644253695,0.44552112905020147,5.232735886601258,0.06112618045517548,5.334828991201766,1.748450558993968,7.971587103280027,0.9393648206464777,2.7069592246323504,5.817149884913322,1.690001479535852,9.67519296351905,7.680461121986701,6.051331229726666,1.1144502392664757,1.5234040717288866,1.5874385310953554,5.216124062936305,1.136688400768855,8.33664846728215,7.823956368610254,1.099852665702552,4.610961115636396,8.139823683358253,9.17680241018317,0.6416161749543092,5.984302016085319,6.320711068430434,5.829911596407998,2.987934663386951,6.964945221307741,0.8494261051991825,5.48064678426284,1.8993092098609443,6.674796425802574,8.456407296866011,7.558235945349747,4.42581329513855,7.889082337837046,8.50302226249292,0.8572907635907367,6.307459020858774,9.494170867639276,5.288061691241939,8.217214567925515,0.22546963280368315,8.988087462582392,7.123161925645245,2.2571382018532216,7.889694614588631,9.541653076866684,4.8237667498430365,5.39214307132482,8.693638785968414,9.679363369105348,1.6029001895899775,9.220017456600614,0.9428131617056601,2.185786192482604,3.806943585832281,3.1153884650923924,2.144552342742483,1.7337036718471066,4.398881045320455,3.940051569590417,3.9956192354084052,5.228986438768013,6.414653576502061,0.2190142112538651,5.400399507873335,4.782765631642545,3.4720896537756007,7.046305987432708,0.6619086741367575,3.2971077142965433,9.638115957314184,9.82645949344802,1.4138593370638475,4.251050100505907,2.0788668348661687,0.49131335661300346,2.3879035107340973,2.14492697701123,5.795870897799363,4.227440832427289,1.4329589465031423,7.988581600620435,6.180163339715303,8.702654910193559,1.1169071318808776,7.211579510671147,8.078967266714114,9.31461717199685,8.451459992928196,2.0134543843563812,4.601535228376179,9.527834751500164,3.1113473335700803,7.027930327679146,8.736288053099702,5.4861405791670315,8.734708472205831,6.441498567359907,8.88112183598639,8.99679502735813,0.5475740442269528,3.2926184481303933,5.166696472423775,2.4465376891442503,6.945982086252358,9.279538390259109,4.990451132769134,4.308382110562359,8.61050921767542,8.739949807625392,1.771149145503208,9.364135543004998,2.202809450545533,5.918293373406565,2.9590641028606646,4.738219058682085,2.7710815606209716,7.882686987401801,3.5811362943564973,8.404343743641515,7.813545129457886,0.37960992261200754,6.969502937848673,0.1182200791859156,9.280665291532863,6.247199019415895,1.1093944858982896,5.125269497534067,2.3544180993575936,5.218771983586487,8.50236387771913,3.823124146936012,9.482920520889087,0.7054284705118996,8.52410673044647,9.801058637251785,4.082826060153755,2.527648030787113,3.82157650452033,0.9194833381553202,8.823520116499331,2.349379463740029,1.2932414597008979,6.906829087551641,9.784572481093313,9.648488756136317,8.873480373493987,9.542694945590355,2.4687964506136884,4.0535439798424955,8.801366813910965,9.893519291988342,1.8982891714493921,5.900034768053568,6.050818769731576,1.9197024013221942,0.6759787325044142,3.0786102914116675,2.3566322371772186,6.822678822480299,8.845248304751149,0.08090317613301146,7.667990776827951,0.516586455928032,0.4352670491198052,6.4517860261735915,2.069441465454671,2.997587648382558,9.355941963548439,0.8955727873177444,2.1176916236249976,1.1656931056316444,0.3518066847883916,7.668223086414239,4.640791090335052,7.512166241454428,3.4041935550583036,3.9415329702696456,1.099906079800126,4.609598190872141,4.948354448078054,0.009934035415040121,1.3003079732598333,9.911028618471072,2.6269777686114315,4.691182150692987,5.063151816298688,5.734612141170032,6.842481065237596,5.911779193862903,5.510504392112843,1.3639609822510468,0.4844488208407949,1.8336683481475347,7.857277971661228,5.035525195915726,6.302898759193454,7.635585711940158,0.790408372860596,6.44257520858422,5.874577198150186,4.660788497001658,0.7613293229793316,2.257945478710035,7.319817369855757,3.378518650572615,3.1028310963391337,4.7959144878678845,9.96252881691147,7.807251601944496,8.69796107812251,7.330672832954191,8.456513969164083,6.585866950510992,6.564546329778443,6.288264264805969,7.478949735946088,6.775702575918389,0.25082731521311574,2.0914206478222286,8.930118744929029,3.771709295317429,8.071125727448678,7.417146121091984,6.8891265738458785,9.161169870035097,8.469738380907883,1.736367165433128,7.786289685537115,2.931393209650197,8.002017544367115,9.62217293265114,9.979606017187503,1.3630239681329126,5.043428122563302,0.5947215532168415,6.173813431083572,7.0720537710017,3.9429024022900228,3.8237771848423807,1.6488820660317693,1.4258711078774322,0.09132892739366127,1.7805757485993734,5.351381683850683,2.0313411813885263,9.137568988506652,9.823197320775998,9.226052568243713,4.621488893805128,6.911102379944298,1.524852441841742,6.9646870571368025,1.793058531524303,4.5908296597009475,2.8696492979094157,6.463024774862484,5.470514995212312,0.8661997958128143,9.116093518659696,0.4884319109471824,0.9445709828369808,1.258118303075475,5.51940167800754,3.847515684583389,3.8582490207402076,3.494398121696567,3.9969307209237392,6.538816554103564,4.139640373436491,4.105969476625946,1.7147614629981867,7.976202563099011,5.544614663345193,4.343368417770845,1.5635104598070337,4.049128881574462,2.243853522681405,9.066746913641182,1.0724761378929837,6.141221622379154,9.525633165058158,8.471520582389152,1.0831944032263374,7.928462584264331,4.508706417200347,0.9159265728786115,9.002776687546842,0.5104965157018415,3.658728410752208,0.4182510498223313,8.650583748371332,4.111986753475081,3.764243329694672,3.7217502216904608,6.328573509260986,4.0383114482499805,5.527182934681161,8.441857965103567,4.383328462517444,4.118355359663079,1.7551251041537763,8.338948726479465,1.7123583159628986,4.332041717739761,2.8306378319232595,7.933033490125705,1.0056988219144736,6.679762016228732,1.4446204673836105,3.764327411140651,2.1856276720907752,7.3787811741553195,4.243492396226102,9.006431941864726,6.415493246042583,3.481577531299489,5.001787860896414,2.509413158910647,8.711969773514628,1.3174533569517743,2.0694303433998362,3.298410419013542,3.611209661970587,5.584776488132399,4.341380639036474,5.747383167260596,3.762527915138991,3.074230211039275,0.6489026292159461,3.3970358545505253,1.860646931383385,3.619423779107216,3.7523616291494144,2.120703068198777,1.340880875455166,5.210048117562051,3.958623793320919,9.082433859255834,8.585483021440199,9.590281023094471,8.37899663792059,3.322174897407668,1.6028499566088161,7.229742166499722,9.395775786616785,6.113961118601797,6.117813736212745,0.19845232793918033,6.375538791484116,2.423093531331202,3.465990172406428,2.7745980386144753,8.535056421888129,1.8288106680709992,5.906045861571966,1.6096325666492395,4.495577092776955,8.380427758199477,7.057921772626276,3.876851954491074,9.750006417643046,6.346566162735277,7.694127330330966,8.47267458486323,1.2609464535405723,7.582712892681089,7.0649693375486144,5.9479200057291415,9.556719465622175,2.54848978802223,8.58882131173977,5.696135749999469,6.882886696797916,6.941365061212541,5.625517508872062,2.5918483160664496,1.9632707212566292,7.696276682677052,5.106616165690909,2.8035199667888833,8.48396103052126,4.490301237028358,7.83623378119213,2.8576567010783616,2.2830414703228863,5.101981349455292,3.590340404217549,8.029414327234232,9.64930626329053,7.561872414242103,2.130253033601295,3.3972880974079467,4.724140642137571,0.45794710490991264,5.714839976283503,0.5800695822081225,8.57734554823503,9.3858319460485,7.261925456927343,4.958650103939986,6.38862671584441,2.895657317795799,9.159984807554132,7.812520432370727,2.242553250457846,2.2740159513560076,9.824710072361766,1.8926884151888057,1.9533953596877085,8.959068950389133,6.542257341054942,0.5813946756424571,3.0721307335920467,4.857630145526688,5.816529267507433,2.1251013052985313,0.39580285855786546,2.3572323022777697,3.4529878419291227,2.445150482730778,7.96455332556167,2.1936118073783195,6.557013880548348,1.7710077503941535,4.736791168462893,5.566815539623029,0.13373581916383825,7.570267707979097,8.526994191603999,3.34450211798881,9.937250692214128,8.570206639319364,8.889807056591152,9.460974860870623,9.108905626958244,6.534453723044155,8.471643994304774,1.7872437450969336,8.468857880626203,9.372183366891978,3.3087220661941674,6.65761796042144,1.034056277757085,7.794755146520485,3.9411706718297013,1.016812376603311,3.0140804631013074,6.787089252244947,7.357468905714315,0.576123167680036,4.29733217591097,4.440800006699382,7.262996018146564,4.577521735877099,8.315429985723839,6.793214032381538,9.970748814242999,0.27109196901210053,0.00293969860984733,4.90541411911408,9.22233124291842,6.2034015144082915,1.2304080938674122,2.1841324768468673,2.3501492062231177,9.043235393524059,4.980693832735397,0.6244969720720195,0.043510812365716856,9.91841934962211,8.356828040747615,2.257908996357092,6.1917889940068065,6.635938792774844,9.847743748262536,7.418755975209286,4.002807812204323,9.856057550812416,4.009826154345728,4.840825939014772,7.316908796782762,7.417835999006799,5.265107186868089,0.1824768532595189,2.504069309642647,8.32298150311615,8.105293084570173,2.4087619479360267,0.8051808056347776,6.29675948721367,7.662544384712455,2.555224790398982,4.056873013207126,8.663287702058277,5.5692390782686925,0.796436675201313,0.5858477466403711,9.724834172198769,0.8395279120513366,4.019438821156973,4.094818053867031,5.170788767997405,1.6760741798105738,1.8468488141469153,0.5566595844222033,8.51689169086539,7.658608151082271,0.980839300693781,7.875107355387705,8.861809305043078,1.8441548155672827,8.357624423707897,2.977428404925655,3.914854174287552,2.1136531945647685,3.3695087019921766,5.430509183771239,3.138410222568855,8.210024976918714,9.617354481354322,8.314225679267082,8.24453872199842,1.0191092258713885,7.567837457542939,6.544209257509925,0.7440610058225916,7.933182509991759,0.9901365745760149,5.3990625527741765,6.395518964721227,2.1471339168702075,9.714098451584194,8.933481958255998,6.965710324077083,6.6599070060287975,4.416769418815658,6.659819195650067,7.756578688924913,1.8774157172868366,0.40884484657479847,2.680580046230492,4.202878646728745,2.1468173003558766,0.6269803170094246,7.225375560986507,6.348515574896318,2.40742603618348,7.6773201885833515,2.51393925008377,0.5195132734753383,9.355862503438095,4.093837761646924,3.0561447104409045,9.023070372708471,1.1420325466678904,1.3640204335080464,6.2844735092949655,7.408195377504647,0.8226610750133623,3.3649112416441107,5.267026861655017,0.25841171903337123,8.353732930708412,3.846048441327483,1.7559598037786572,0.3385004315494089,5.523748826593966,6.174908558694209,8.631336118017943,5.136838284698886,7.574386102960677,8.913992433819178,8.545753483271827,9.748090117916302,7.174713626857752,5.487794135361552,8.22212632761646,6.659870081478987,6.23433593403478,6.6300595391879895,9.359856628866883,3.300716044809864,5.886293483940468,0.035694136691870604,5.68880964859159,5.572928466261729,5.223188872626765,6.189619653484875,4.1628993757817145,5.299267665571293,1.0414002769516317,6.804607953449038,6.2176921621284675,5.495651080608477,5.223698712024085,7.344533183240487,8.063625718424793,0.3653516015589675,8.890371375076212,6.945725272786307,6.966013909282207,6.2226320682532466,2.075868354471886,7.830831813888142,6.743334040357915,3.8523017043363827,5.599057531295514,7.443510031328655,3.373176963969693,2.9812523403385582,6.021342836340562,0.6908718708203931,7.78807028929315,8.9042781161867,1.890641961211117,1.8580705413808718,4.118221305063699,0.0422667635235241,9.328101378155182,5.2545488270797325,2.753219527897812,8.075128605361678,2.269499579732477,0.9191942851444512,0.4974481338427683,0.1779508169327615,3.6967196189632645,8.85051641195814,3.4898718530935957,2.2509910722965354,8.078990387434086,6.670851911097113,2.168995101935969,4.779764095567572,6.789537973783171,4.8862646194788395,4.13924108826381,4.44268208470927,0.15058585403394886,9.420125448924434,9.317965986128234,0.2321201606215939,7.512102746721152,8.177805106580449,2.3647948267490992,8.345710352985112,4.870522440099398,9.033476703731173,0.27904572685082174,3.935775552704044,9.810355146586506,6.677234846110687,1.570047779135253,8.504106372220779,8.1333105865909,6.494478766303999,3.4175093602935758,9.067728915928722,4.138966586940556,8.286762605648486,4.005831317452213,5.487173605218267,0.5594065490536027,7.511992414652515,3.4620457879373734,1.5676706077931457,0.25372265522237925,0.8987956320630319,4.0493542896617,9.738083407276,0.30758676044925437,3.72603994283788,3.0692624752811803,3.313799461895619,7.300337479010766,6.751162996362419,2.3636065432366027,6.651346240219045,8.714359650354018,7.5354871417835305,6.690503131290875,9.503428701130215,2.5211915803903784,0.9848535903900046,8.766857999416908,1.66744093804162,9.19396971961751,1.6671688958131936,8.548635165823974,9.265226246040271,2.745417842118889,6.56765951560071,2.9486014353982326,0.46117243717211265,1.2577798498412296,6.719204479136753,4.3303994046554495,8.048956840103623,7.557408544692546,4.01291158694897,2.4165755418472057,9.900060378407677,9.052423534671748,7.894826491920545,9.43866854107583,9.26100394103452,4.020753057028865,0.1251311609082406,4.2596705906582795,6.46886104976748,8.839056861902538,9.340403929036556,1.3046836770711034,9.802599608635871,4.496772328365067,8.082200767373545,4.82836261942092,5.507363322028011,3.9532667781291275,2.892292903068503,2.6165516017196544,4.5507626385738975,0.6946111693400048,3.424547600260266,0.871951307902108,4.701323946668625,0.9396176728315941,6.089046771182409,1.2014843069033643,5.654936722713648,5.219568444327121,5.085336408713836,2.954768135945749,8.722208340165562,8.367652118224907,4.257447046172313,7.834562674200827,9.45975307805485,3.2666322691597816,0.5228041004493411,9.993926974042171,3.9945899818543507,2.317854364101075,3.2063585431100172,2.562893731774185,9.341452187450269,0.7115848631803967,2.957392959222971,5.625722398644624],"x":[1.5439553964653596,0.9281026927457747,0.9669589210382534,2.9770048726273926,2.5878503554209606,3.3037817308437987,2.5712170158634793,3.6398096787478798,2.600900171677135,1.2525057681315221,2.4277515275291672,3.5155088525100755,3.0449738570156826,1.4185212151719528,2.727396112842343,2.8724531676265297,1.2702143218968887,4.569115807373522,0.3564180133388839,4.3833316540140945,1.293408080349251,0.48847860737181503,0.5916235808903414,3.08155523048248,2.835800706579983,2.93723875235807,0.1654633460593513,2.2414452615378186,0.9705311944877404,2.5351353921624353,1.6331845332776518,2.6779654592337776,1.2882995043278278,4.829392743570962,3.6257521485837128,2.1540328928921273,4.520984096817415,3.070835712830214,0.6514675586088203,1.0295142716557892,4.369016325263547,0.10473859222855375,4.220280609643002,0.3805060915197045,1.7142748252002171,3.2310288627863057,1.7419915819841292,1.8784507612764467,2.490725641575169,0.290791691778034,2.207408836365168,4.402390799402789,2.7005016256024437,0.7226235504396106,1.7682690749346264,2.1975829837089766,2.473567685967326,0.35862889051859304,4.4902729438835465,1.5510076276162654,0.4351775850070505,0.4177742834122866,2.4500132017579257,1.4038641849227207,2.5298540953645943,0.6054219545994244,3.3638310928121484,4.070684346496448,1.7003808872013515,4.864535719151393,1.9240887397951523,3.0564098249105163,4.582238047252264,2.3843349441305115,1.8409950548519294,4.169798801637254,2.2314495607156717,0.07829369985638657,2.995717568727562,0.665056233825212,0.9376785286376421,2.586923032078783,2.0315313131555146,1.5542747314219096,4.606463032490208,1.0889117830139594,2.683526360670452,1.1248120440373954,4.888322739229891,1.3667356074568626,4.052655470205511,0.22856134790778637,2.435813668655915,2.000799031023366,2.6547124772249466,2.0472932738994887,2.2852495403958404,4.124269380873413,1.2336047436575182,3.7138829865129286,0.22177081234091012,3.0312706321506955,0.9879498899016947,2.1124987232341184,3.002026089112877,4.953088202650733,1.606972415197565,2.960861414308603,0.30518367972404925,1.6960871388298837,2.4704684683922418,0.2002372999240376,0.3040709704753708,4.113008224268373,4.138634389594303,0.8093261069681368,0.029658507089210806,1.821297426261932,4.345276069255143,4.454044043490631,0.03617415480670516,1.8991611428091226,0.6909833551441957,1.7408421659656304,1.7615636351394726,0.9694550751051145,1.3380450957348078,0.4168312644583272,1.9925743287159414,1.6084848509997018,3.4168131730805227,1.9294392964326623,4.2981205580269775,0.4324881464818542,4.4418943684060155,1.1037274829855614,3.9666590903169006,1.0389487530181096,0.47067126783023494,2.081220266112828,2.173616247840009,2.042829002824905,2.0336055136185713,2.1156937332306813,2.5805198354370695,2.40589848900965,4.460501024935093,3.0438720818097345,1.5471352201557387,0.41881657241855885,3.2903104627410853,0.5164996143198974,1.8715026914546096,4.906822043729226,2.738179150492238,3.659380404424555,4.559956547944076,4.537181680654156,1.0079290710988975,3.165298441982837,2.03429980348405,1.5030667487418858,1.4621331902118417,2.0027090881949885,3.662011326522788,0.5458788831376193,1.6787262717788065,2.212794848459346,2.4076369900219152,4.37807721203492,2.128800812977812,2.5093894275426623,0.5666376645820181,4.271536921284057,0.05602921253209714,0.5207328103179842,3.2795189760204666,3.030079499571172,4.338553536275736,0.3298340801698174,0.7772527555979647,2.257441224280956,3.2111628283233875,4.988146914539807,0.6071832018296175,0.23489243778333835,1.405290619059606,0.8284588158531647,2.6218719829672974,1.3117306488979974,2.008200275865495,3.6967981094648783,3.565086436275217,1.7184001083574252,0.625389382626198,2.353710119126251,2.3617721299375782,0.4577627745388002,2.174374545837704,4.472299791712979,4.803160585640587,2.189779540004073,2.335850045959531,0.9651000906305385,0.1835672382867759,2.0810318558714846,2.4705691975990463,4.509767403027432,0.6649418979311406,2.688291130441396,1.8936244646395461,0.7274892699877278,1.5342583011548017,3.443286544938915,0.4086908148640189,1.9192822289419553,3.1383752819298794,1.66703118880698,2.725863882751397,4.572564438178059,1.2073601672682466,3.4984414168436775,4.604392815487552,4.075978903529198,3.5206535520971913,1.5878483550504607,2.701215285234948,1.7436766357035083,4.017505357037777,3.9337157404698897,3.7212264136174165,1.4672736865880343,1.636897151922888,4.622132874390634,1.039544989295239,0.1738234700190855,1.641794602484512,1.4598774204654652,3.575084132712268,0.34146206875937946,2.213099952597787,3.6170625749614627,1.293013488255903,2.3895354493039447,3.657266294069643,1.6306676570762002,1.9776531085149218,3.3053055096427575,3.565469632597431,0.5251520893336958,0.7050254317119198,4.455477188184165,0.9496692489689729,4.616638361273119,1.2649512465546253,0.2659959022337288,3.165761068384707,2.0061114844698835,3.9964673833070288,1.608725955852195,3.7203649427799155,1.6796655053017928,3.560113033489877,1.4649537675462687,3.8407432458350943,2.6419585314169947,4.24439052600931,4.57572948999842,2.2331356015820756,2.7893734717202836,1.8451750314778637,3.716363021960624,4.142881951863875,3.0956100030433475,1.074714827206923,2.5685366746862726,3.638177898961117,2.340977378050697,1.391199502394459,1.6621541406019502,1.854332631086808,2.6906507028684667,1.5326360082158286,0.4536415130106397,3.757201862504341,0.11543353847037419,2.2573847799214897,2.8625051876474705,3.99531907384028,4.957467889993215,3.991032833828827,3.9576295752098636,2.806890324406346,2.0199463910383733,4.031631548220337,3.7488482134249344,2.495850710676517,4.905202241930999,1.9726346078732349,2.8102483421132938,0.9839377670322813,0.8307339040894179,2.535149349894308,4.410606129388998,4.78330967233937,4.729769437650234,4.654127119573239,2.000001868728841,0.674879857138353,2.7109797382821075,2.769461632138137,3.231382618784535,4.282526944812233,2.438433974869907,4.6432376502023995,2.028884680913705,4.857254407907766,3.5508529014149093,2.0882321242233095,1.4172406928459502,0.07326428284273767,0.7844814587400617,3.9894335062563857,1.466118290394135,1.4193066240446939,4.841325628123297,0.635872027736526,4.009926706272388,3.6385888060763794,2.770772875020533,3.635287759411132,3.0384151546741043,4.833866324691605,1.439286307425478,2.6231011599462173,0.14960573347011064,1.9298189165514068,0.7067349366802489,4.113756519792268,3.442215103989581,2.51395667602666,2.3670031984244613,1.0977494905666108,0.8695502827785806,4.114422341917599,0.8531227590507284,2.1162269173490666,2.0942743160095514,2.6176621101562825,1.9618125214346194,3.2494131929865864,2.9043533798877954,1.17555556860228,4.3740857127703725,4.274162123653275,4.94124471178421,1.6774626292242512,4.0204201897090925,0.1317032800482898,4.571518973238721,3.958157626095433,2.651986359313796,2.7169867391866775,0.5040418559783133,3.3371008095453103,4.199399070054902,2.509665289920806,3.0033403401503342,4.977980169251207,1.1656558175543863,4.28125800453858,3.0528125294710073,2.588767736753322,3.776910522986384,2.199931484072967,0.7436281814473933,2.6216488091285473,3.167540483264697,0.046044325587659696,3.330170550997271,3.7481581758868643,0.7708063252694086,1.4445056272262957,0.29585716348689894,2.909995903185104,0.03256109449882638,2.834500177053277,4.170653847089553,1.8249423766013617,0.7299113123312206,3.9823914904587765,2.8118505661173154,0.49159788400606974,1.0486425177351189,2.2380353701878377,2.0998408673945637,4.515959726877146,1.7682908267236142,2.998102926305272,3.7387915498504434,4.994566946176787,1.7321844547395082,2.682982975421356,1.961837159525761,0.6483958355004493,1.469567831485119,0.11965910033952531,4.474951529112298,4.370923282710157,4.408562544606932,1.7237433853474793,3.2516313625581237,4.370467703834532,4.407820143757714,4.394174073167151,4.816445609495289,3.322028422000356,2.997021333001072,1.342402861799682,1.9063212716875055,1.2252964127180344,0.6029054895188946,0.8870686057383426,0.4461124332275135,4.589621290905404,3.298561609890982,4.467428508020782,0.8647399309228765,1.3060875818022122,4.322649208363885,3.535487260825627,4.40300129014158,2.3044935528036357,3.4123430841888416,0.6420628153633179,4.7634009753278495,2.7837265951439107,2.7886620222545524,4.188188043634444,0.7990682327801091,2.4595286125783167,0.2970946231279459,1.0215945985736974,4.093782316175729,4.696317432747873,3.036191427699614,4.4821399444659065,2.7247319139567527,4.581327922287768,4.48422673333389,4.962790119543366,0.06375357649283431,1.3509436367832517,4.762066174682216,0.33670578974285714,1.57900882262905,2.898054256164034,3.7750260076039464,4.303327573380937,4.168070164150971,0.6394396141444525,0.9439074235269251,4.183154368344734,1.5664629290798493,3.969708270690461,1.8515014897703808,2.582447529773899,1.570785998052796,3.5508075873178404,3.9785765618341475,4.479856860219831,1.7954477685588888,4.898908085604974,0.607368494661984,3.5558485994781686,4.319043975975601,1.5258116409803613,0.591612952788918,4.11987931104714,2.2356549111254385,2.795214648943698,1.031926429872203,0.663086334431624,2.2509691027561542,0.2553479445776996,4.983887893040247,2.4368239539569037,0.17067417158513454,2.0771176510161125,2.5373369475796546,0.953948122555055,2.4525709346822486,3.610876472988118,1.6691084443998838,3.4656581496912695,0.6662244293528186,0.7875997993074446,2.9390883664522436,0.4018743793490176,0.21337160791268794,4.712335001620087,2.5489611206326135,3.500359115724451,1.8216647436905264,1.5334946932356253,3.4205822285540255,3.2345193468584146,3.904940541197118,1.3854833143473355,4.92433300779111,0.9433438552940776,0.12442911635240694,3.912691225972619,3.087859570105298,1.7509816275113121,0.30763875263610463,3.9760833681795846,1.5293311524611286,4.600076463278566,3.9316793171301176,2.91783340654293,3.1956143253325573,4.128884659900259,0.6539616123882042,3.0424092564920913,1.7270273641217926,2.103189450612061,2.6391865214462076,2.5732802355442597,0.022360893774020507,0.3974873788815425,3.385744892364028,1.6888460177221032,4.8859117138690324,3.119494444796894,4.765573669064578,0.48404591056718904,0.4263212061172217,0.5125679678762651,3.761469486816277,3.29502588958663,0.6249228472201174,0.886443212702761,4.99752080748994,4.264998697253603,2.908484149026039,4.873356088158643,1.84463170772315,1.1218758233723192,0.07210895960424679,0.3288693737638615,2.296900140621524,1.6512185513388833,1.0275956360995353,2.544027089733917,1.3106199535128016,2.004454346506921,4.330658323613118,2.027913753644998,3.4903135113420634,3.761209294864587,3.310761261990164,2.1834088936782936,1.7763283361729554,4.748556414987314,3.4200975164861136,0.15768988772853376,4.878613296700927,2.3332471530194954,3.8723706381565792,0.9552617369966865,1.1676531328726802,0.1361582011742879,1.0220473712083278,2.1597802095854792,2.281559497906068,2.184449416837352,4.187656050689018,2.8302285017288655,3.6888733630915627,2.368053841340388,0.8866498279108259,0.7093606497894833,3.50348673465163,2.3887029640187416,4.058098808982259,0.7951583203150892,0.2534410560205458,0.4883058307386212,4.556289466494327,0.55380059903544,4.907086985589636,2.4699639373939917,2.7897628535522214,2.8756482401260053,0.05179634890083662,0.5296649749201932,3.0873133429328337,2.9809125983706086,4.619718938335103,1.4579536555008765,3.9370330712038637,4.751995262871516,2.1763779663150107,2.5578570739202213,1.448027184835754,2.2656037437884136,4.6418927091903175,3.4454049941994302,0.5324828978384355,0.6861282134288893,1.5525856147397044,4.480031584174099,0.40886463415788277,1.3849173011291982,3.7007325494601275,0.18320677232412486,4.544059462617581,4.582550981057253,0.2588179626943077,3.4450796375842097,3.270327515404834,2.109199120417644,1.5310574763247875,1.4538206058729253,3.8460367779560523,4.631187099058307,0.6179061061395685,0.8606275410022368,0.552510428540407,1.4365056925234665,1.7057888552153422,0.18708182533239803,0.41920461334076453,3.3480865949201677,1.4095754642311908,1.2894133052673395,1.6884432341962063,2.097464908538197,4.530211546860929,2.202936802785972,1.3838532762199085,1.241184432043091,3.4987267466666836,3.792574182094789,2.761338399153468,1.4842163931464503,1.462548101019584,4.871965206303933,0.39518584928844747,2.3427626408842306,0.2768582431494415,4.207248347380496,1.7853339675229796,3.72940597418445,4.2654768408137835,3.766290659978284,2.2555052661649766,0.8286804520557634,3.323265536692057,0.3118019672262984,2.8115922313579187,2.337479514110793,4.421547200700758,1.5125146761039199,4.114380214763116,0.5333850744989244,3.771840760028693,3.851874644802471,4.17977747910038,3.0993442582502784,2.341777937407814,0.6100712900547045,0.19029644164853532,0.2578699512699001,3.3299191351418678,1.032732886738278,2.120844067788524,2.535356667168048,1.7839962889892258,2.7358871898341053,0.4019345383642903,0.8083067382884779,3.7724823461113264,1.8472073848724102,3.2056628644401854,3.310305842388047,3.0882301715153524,2.330732513561241,1.8369384547436463,2.1290462446710356,1.4950612690492604,4.4951181936494855,1.0785537911752974,1.348912677117411,0.19898302718120653,0.5180677068894091,2.766963575337523,4.888329903443917,1.8021424741875025,3.373530978106143,0.4443996306616882,4.241584026035446,4.764218807111168,0.3562454794789316,1.3983198603932256,3.708210627541381,1.0925494634549715,1.96755007046573,2.3026333943013833,4.447534688908212,0.10058730879509259,3.379203857814818,1.8250580843187192,1.6655850186738508,3.805280219600573,0.9036750808013838,0.6419777147019701,2.6460869830621645,0.6370143173613718,2.4650265152979776,4.407299904699345,1.842905690375114,3.5763453453241922,4.410536479666954,4.618189737264158,4.210552223120559,3.6720689952064456,2.0702836548169055,0.6441496636940436,2.03465889217884,0.6542955030149922,2.9736680807783,3.3543347019308745,3.566667245469258,0.2517672928287562,0.915734743054919,0.006139820396084961,3.5656351962697066,0.5446955447117552,0.4039189701886192,0.8952546663909888,2.725969889011867,4.372520446090023,4.800704134111112,0.9155645173239779,1.16667981659347,0.5841936649638269,4.445593988743185,4.8914802421309584,1.7787518024827875,0.7666640056753904,3.7098668654343703,4.418527606799917,1.3716967276678738,2.5798231760195014,2.386931188052194,1.4797044608344778,2.4562416994096603,4.6134929050276705,4.093549361031351,0.8931586613052456,3.0975433642879557,2.2279221463680265,1.8807899983295384,1.0433189301712986,2.7045718853166436,2.5080403038108012,0.8746250321938542,0.14922910588628824,0.6471517866721044,3.0495761366558485,4.693804703990056,1.8562539060853211,4.1383535676672025,4.156517292012291,3.968804848503833,1.852918016420051,2.8579642766794433,0.20502282030278485,0.9646135870961692,3.608951163992468,2.064218763296737,2.812490431171255,4.131028309592702,4.826695886591147,1.1431798359450596,4.596501001113773,3.802662805159681,4.074804875327054,3.71283243748901,1.6618686311606568,4.081601176624656,0.0008668761230190558,0.8095432234874778,3.1345699710908423,4.778552829253162,3.3286919344284973,3.430075532103436,4.021610482545529,1.8755745581055916,4.537310281144235,3.975840704638424,4.671829674020552,3.988495512268706,2.3149551501738106,4.359478156991141,0.8224070922191828,4.134025929442351,1.3320973377762468,4.224281908034026,2.1838356802444214,1.7677063347831445,3.2442120005634623,4.9841280195277,2.1741744628350967,0.28430505581813703,0.44873187163619654,4.653075567000339,1.7648210036182965,4.469071005705553,1.6375363422819678,4.61983897153461,1.7363263766249426,4.14157844213401,2.8022440589360817,3.0108638463092676,1.700533333971177,1.455349496934969,0.9884888194551278,3.250559688383775,3.206055218872895,0.8123941768701148,2.6706212848211273,2.170892941103105,1.3812579398985603,0.25983730306507913,4.832978143078983,0.027999310116983978,4.509474216405121,3.509274470156354,2.673484713970957,0.3708585801777309,3.8094259676866082,3.2909423222876564,3.8250017266628813,1.1861477574699042,0.3859895528414625,2.341022871424091,3.3982227695510305,0.6059352700303566,2.7069795571141295,4.282223323385297,1.4241448732924145,1.975302631390613,0.684206631544465,1.4713981309388524,0.5488295942738131,4.7209457002745765,3.0663390506604027,4.492985785041311,0.4553809839757572,4.495685223975964,3.5167225432164386,0.9126789912653421,1.2644578244063909,0.4936969296978744,0.045751639367999086,1.1142180282805658,3.5450456991624133,1.788178446820925,0.8601760024829763,2.6111377407516976,1.5894488657328265,3.430817370182777,0.16360062417261068,2.147170115875575,2.3136806019756917,0.6068847368657759,1.5267376776414687,2.3186042691749886,0.8786153492559234,4.4423307469271816,4.794919774630132,3.8164549035591833,1.9116889215588273,0.9270928201667694,0.8987057464652548,4.740580075455506,1.2230774289279622,0.9159458284612176,2.7274736996458837,4.493904158439621,0.4103640923595486,3.157311742088628,0.583110821036068,2.0634407871308023,2.781782280027778,3.75290782198618,0.9232767495944083,0.7056837440876274,1.6850932520671902,0.6276955121726535,0.2719785102739736,3.1679168936664404,0.6751681245180041,3.3100204391708568,0.5398840498864754,3.763760655019471,1.8644009298977404,2.888912735541014,1.3403267095576632,0.4789315982845077,0.5636349799493001,2.8243549040247204,2.15243318014433,3.7257164430612635,2.496258020708735,3.9472257299131277,0.6292504307464675,4.2255668158421535,2.9797502263219133,2.443510095265855,0.4484086207084448,4.971522409893333,0.7591523220796792,4.17523462446633,2.697839586797648,2.144741375257735,0.701327687213863,4.376020100198339,1.6804629537717686,4.109792324836604,1.0187962361034164,3.048284689271595,4.118925366943086,4.12171204642121,3.85440107319047,2.876634520860094,2.9178331081875686,2.2281974333289933,1.0356373823907172,3.7760936100259657,3.577475968121673,2.186290993695754,3.1049614635834786,1.7748704330042897,4.78127742782149,4.514642303854998,2.992986146675184,2.9523053979279403,4.004882930335968,3.896520992731227,3.0704422177837367,3.121764572545281,4.524968513573031,0.09286039553611625,2.4633509562155673,1.4795278832132863,0.45964928473159694,3.4761026567034845,1.33604526711669,1.9556824145633567,3.3861249758755685,1.5321016342926164,3.7611329682859873,0.6275303723754311,0.09413969947579037,4.18892593361575,1.9797784482251612,2.252915118570409,3.113750158052764,4.694053249177175,3.8333352625477835,2.628883432228327,0.9664132402296322,4.6751061907604825,2.6486457694236942,3.104370740191129,3.1220769831322626,4.763300072064855,2.4223201907048066,3.2378255813117796,3.7842588294686164,2.3655823196024484,1.5883840830257046,3.3978094131448655,2.1386326903381803,0.31686310736025236,1.762619347113683,1.301952146482852,0.08162797841809732,0.16339822006990246,0.63456787522569,3.719252393448358,0.42908145297770095,1.615432380613726,3.6348693091706084,0.99064924003472,4.426434052061708],"beta":[17.035120754473034,16.031912764604805,12.761522845450155,14.905711730920402,13.785087309095797,15.444760871408407,11.324730212744198,17.265845572525564,12.487127344228846,18.557828498571347,15.68253534495549,19.1628383393571,13.41380438322842,17.77218436062037,11.625872632508754,19.486955524016903,17.683245408941737,19.554929116647088,15.980789684627517,11.870658226338922,16.455927959702237,14.845199285441877,12.97979824771226,18.42081119382756,10.319591921338574,17.251068852032475,17.755075843446235,19.513396188749148,10.80903937814615,12.14482717640209,17.355488325545032,18.929266900924905,11.880423881211506,13.541626576305976,10.205537287683537,16.451686609089712,10.44852037212687,15.018456945805184,12.461064010410857,11.42821013783973,12.738495150181206,12.710037662902945,12.726191797579034,17.991065054085205,18.399954389037326,15.054165390750073,19.00814005117516,19.274880816033754,11.251238845693655,14.390919828827183,10.10912417229451,15.894169298807572,14.515867857120867,18.13013944285991,19.131614889790836,13.876563628352976,18.82741194214595,19.076457251904575,10.669024162505018,14.537261334371209,10.22281279185615,12.726854621642614,18.446951719015942,12.33950405713421,13.694429393106072,11.409257307645028,15.68153988800326,12.203048466469454,10.292315177864747,17.38077346672749,13.412850870350816,18.532457568662455,18.959560310177086,14.129765561405822,13.110352347808226,17.363070353719827,17.36305336463289,14.46999167024978,10.539292079592036,12.217255553639696,18.41394201463183,18.72658343969728,12.737784990355927,16.317195217197412,10.053104320132654,16.71503767860341,16.44840677079576,12.450225514137292,11.325957285439404,17.69632851759504,17.871274226390014,18.43625617309742,14.662448854380328,10.287534928608773,15.686893415457693,17.66100809458795,16.262725226894755,18.582553466618823,10.90469768862352,18.38548909010383,17.267036195103625,11.70964924167749,18.101049573253597,12.694245134316994,10.505605757515477,17.150104303704197,13.820236828572082,16.90642009533041,10.926880410704769,12.526328958554377,18.659065576075488,16.11582368124259,17.88424422664561,11.63899393486064,17.36146567664771,15.168394825231813,17.939851578543028,15.877912677118784,11.024873186129094,14.709499210117794,16.439754332245958,17.768604396407667,10.369363619172066,18.81915895746721,16.43985633124101,15.36888529177463,14.406992819206952,18.627341162473726,17.62793113349461,15.229492797461155,16.92874297681241,14.261514736868225,12.051963872922954,12.402385873527852,13.379808605702683,19.851823183586998,11.063979693906425,14.611764835193403,11.791524035583492,10.876157113665803,15.331883529224752,13.30765690402827,11.954308783651094,15.64806032156373,16.440484805128058,17.694762201278863,18.18123461726863,15.624668957417038,19.81631440957942,18.182107865835725,19.873577452674933,12.956260146397536,17.779766211906175,10.500323753118082,15.978521964639006,14.419747739984029,19.26876654643422,18.581851709570962,12.583831001095598,15.355161094062279,13.07119139971261,13.893720013692494,19.06716287100294,17.316879535239664,19.683509905770055,13.518662278554887,12.069644819138187,19.459414969297665,11.568117079164022,15.599824152024649,12.782302814224833,15.072569742932469,12.762969721393558,16.516807625978704,16.909252635621105,17.928405742617063,12.695725428018177,12.082127814819055,18.480476967448183,13.038508316017477,17.13520147613913,16.530835156155742,14.342822899637024,10.796588750104243,13.51543233989859,15.1208430172152,10.571280821940912,13.45076041750441,19.50421880731694,10.46242331895845,15.15789138542361,14.012869115706586,14.962594723128973,19.118678922936706,17.300699460267555,18.179442133884777,16.249751984456285,10.739172078497209,19.485718613140246,12.047750203937515,17.60158349498308,10.090312437659975,13.784500133438598,18.23607245939747,18.855043481135183,19.316515953882842,12.847025728932229,12.042732523591033,18.26325242925451,10.748105959341077,18.16153699428868,16.06549806586397,18.35508302558009,18.66259339139266,11.668790226162411,16.28610390170511,13.649010063469316,16.421039158384914,10.768101136651133,18.111367816516314,17.78882334853488,12.772837011621434,13.290968832767337,13.650818110972153,13.357278304920664,11.203450762524545,18.222289025159455,18.622571643504806,19.523612255064926,19.36675828273825,11.952818907082614,19.892239451221972,14.096448746373278,15.344190680104644,12.768224879711239,18.355266891999058,19.704985764069598,19.14359958437031,14.300388345172554,13.409404887470771,14.742048389009826,16.141434507176598,11.891168285966966,17.539052964698808,14.258355178262052,14.145301494189743,16.11133458445928,14.224457410657411,15.665271135037147,15.738518489830163,14.441355118815514,13.125080270959453,18.160174769356452,13.002126942755893,11.91000242279345,18.486687807519644,16.026341734174668,17.077992223271487,19.532727264526788,12.18478963232121,19.117235562257015,15.83183381972644,19.97361800586215,16.232245144882476,17.701619364289098,11.96864602031479,14.005402584155714,10.140168100838348,11.231359941505964,11.920448771915112,10.29743539671463,16.482577813340693,12.524767263156898,14.383949552825099,19.903669920263205,10.03529713506802,11.644229256707408,16.392186292233486,19.391649156786812,18.58441290907375,18.815221349676847,14.77823165142685,19.421834052015527,19.676441541872165,17.382580043404488,10.110756837318602,14.478751635264853,13.344268379294892,10.329602566969784,12.009788896420087,19.42942085943125,11.990548996375841,13.978720000104454,18.333982470145525,15.901509901304877,12.442878204657744,19.502485283359146,16.15082194992064,15.986985914144238,19.26672948040353,12.828442268263977,17.62200814404477,19.722979210722258,10.131899237872087,18.27557756921935,11.175942949487263,19.379266302989826,14.625662925969836,12.39037013184928,15.966041465583057,15.342611481697517,16.947114672766283,13.176376468851185,13.596155860204519,10.931754683918491,10.483818805962642,10.987993353659995,14.037871050709825,16.297747789544577,19.262258906710937,17.527044160253325,13.178800786114014,11.065612743121584,12.487805194509596,17.57449617356629,18.735935936049806,17.333739039883902,13.808750179596343,15.310949595185894,10.620041644900693,15.51831356361744,12.017365101085204,17.557243090183313,11.69240070452392,13.743937891918002,10.694429593196197,17.862236220195967,11.157587336300761,10.372609365290014,18.613089410616894,12.585744315673995,12.51856489041339,12.045529804080138,12.280249878043579,15.695681210525551,15.589760680352867,19.27678474411357,17.226601634898916,17.470186533542183,17.797908000611123,19.624043589045108,18.02152464501252,17.54634143639798,16.785734563902132,11.646494369815903,14.79507700306846,14.177321930510193,17.105522348974233,15.563917311974553,10.62834590696764,14.931207868865803,10.765601594117483,13.89768543210071,17.65714266836474,13.920067701671108,19.019528585687382,12.231033158519471,17.142796321197707,18.904955692463993,10.097293174780084,10.44672384913532,15.103174473411922,11.232345870034111,17.678837897239912,14.792418920433592,13.536655981133004,18.10611911497194,14.878368074528172,10.312640163873382,18.136541264047352,15.96429732667749,19.08711423559888,18.14601463440876,16.4811022036648,13.813254019503237,13.316834911241756,16.725802508630238,12.552451436586756,10.756885460934257,14.296478406486395,10.631969396460704,18.639012212011046,12.847298905865587,18.92696576384563,18.349551032008257,16.237280568745806,18.377546438795772,14.675179485756079,13.964051031298387,12.543037812310766,16.322044230665128,17.626196386731166,15.490144196314304,19.13110371461297,12.875819336376688,19.4672254018111,15.770097454798202,10.673011106291327,15.561363668221455,11.435195284656235,11.473482117745009,12.693437910501348,14.961070341583092,16.55449285587025,10.110316010583967,13.788329041662163,14.39264008828797,19.123166843589967,10.80595406978749,14.32008894972274,18.816775892160578,16.635669389410506,13.010521170961983,13.033175922144927,15.008020299828305,17.365295583652966,12.984305922893009,18.700819390770594,14.925046310799534,11.375044496975049,16.350472471423068,14.840817488965737,11.591460071250218,11.581078971700533,18.325191867375644,11.406501438573521,15.541369351077403,17.567139191820083,11.011488965932173,18.80726803340194,16.69948449832028,17.210573139745375,16.480158176022556,18.03128399284153,18.660394090520832,15.256294850250596,12.358094054492309,18.166265491474444,18.141837787305278,17.045570582129372,18.493558827792405,15.323354005671671,12.830175863669817,16.02857656090132,13.389178037943994,15.829460454268103,17.045529150960753,13.80507882618854,15.090897493796753,14.277594006422055,13.647500575691184,16.116913616056557,11.322292792596686,10.667391344764418,17.388784707270435,14.746646095701319,16.579004605923352,11.158921171157514,18.87392071609091,19.756272565807492,10.93145906342908,14.028356365788252,16.186398683988294,18.32381949305421,18.22221109616404,11.63471060282922,14.621451002547376,15.545105761165871,18.29826176091461,19.148652898216273,17.327629449543238,13.047763391050577,13.940233846081753,19.793471526716253,17.54943017049909,14.959399284088411,11.658818586079523,11.654567449282842,13.409097172055356,10.695978080465453,13.347377109147036,10.790688662815617,18.407665076220223,10.735552164263053,13.820264500603612,17.114708397664206,12.220210797772202,14.060768227982813,15.109335465054484,12.064574927423159,16.89199243451521,10.743367804557787,16.450754035889673,18.421808162899232,11.4210357911176,16.10542033189371,14.54006930047865,16.982574047731106,19.80495177224146,13.138043587001675,13.2180627320472,16.814768880330742,17.24728897088525,13.686091704261607,16.78889017698194,19.39036900542291,17.391938898196386,15.741646502697588,18.243632305393422,14.689651450424305,16.036298897370038,18.22107466155938,17.00693717789672,11.052697716098297,15.96449045490881,16.165763108845418,19.912891534926118,13.550363648855065,14.499745529346413,19.567830971119513,12.297397005469183,12.478629575496727,19.9510211788591,10.370768227145069,16.570366275990928,16.67791391090916,13.335134929895688,14.97089821155052,12.353033018014454,12.6053591616781,14.871239117000757,15.483711755289365,19.86385575344539,10.723342218516363,11.827794850351454,11.14546024743246,12.872272129951067,13.257059192570363,14.990746516695898,11.052331959905539,15.145110484366189,15.849656803886077,17.362340462259507,12.869597117156811,12.49185456084864,12.984366168263488,10.410927610783302,16.940784989517148,15.921943414435235,15.44709701032043,14.512400619933336,11.99005737956481,14.089225839593666,16.502759280164614,19.247122502517982,14.812400118445304,19.85654338930891,13.312751862772078,19.65438401009515,11.120921144737588,16.320463839618945,17.876843554234192,18.870485408525095,18.741006004141237,10.955718166595961,15.713303372193506,11.13884399774923,12.226355215422478,18.969346094312264,17.02893152699174,16.576206906814242,10.415666267998716,17.155672007017337,13.709804796071843,16.113955279831913,18.46602004442854,13.178706766915212,13.14334172922528,12.30579669625504,17.163437005716453,15.258026188578967,17.435640891764365,18.222294845236288,13.351443887961773,10.145529808557736,19.105631174053382,10.162639994070943,14.351097442487863,14.210304879913735,12.932362829886557,15.988418461683896,19.92006372019793,19.847054913488705,18.87516112736257,13.095375600793165,15.775207316917207,10.854884272008567,18.675096228103254,18.2784138860398,13.973395453426285,16.99252353285725,17.092597318949863,11.492405822238513,16.23153096218335,18.312116239144963,17.221873446649752,18.621537846774814,11.98907156277687,13.89198148430702,16.35612923286839,17.95780734475874,12.828324923933497,18.762098895708696,10.11837215257237,15.915259300229414,10.05230909269522,14.046542970136713,12.620405329630238,17.855288715541235,13.801432342986724,16.646077972062486,13.782283367347981,19.335252652585957,12.70527251198865,19.51301965950005,11.15189624881685,13.019772200350383,15.4210762785787,14.612301863240747,15.851977561284292,16.874805834474888,14.87929638292347,19.716800401179974,14.667138888554838,19.335185508088653,16.279674858303316,18.47646366264583,15.8912273942031,12.898714190606466,10.299101448868814,10.742084734824724,18.437036350710454,14.968720999798888,13.667397457271262,10.049278023586998,12.666511526014208,14.871777584538483,19.55206177028279,10.581115767557488,13.90981847017777,14.485722818613386,19.545440426888625,14.037370022020344,14.389996017101774,10.489286953045905,14.41314182448358,14.741002471244995,19.425268005088103,12.804729238540414,12.800042458765414,14.923177552624399,11.661351560290388,15.741622359345977,14.427558292515997,12.338214557582877,13.968039359499917,14.697206126068952,10.051858967662675,12.718103346839314,12.218411625499378,12.422474338641575,16.8740840208728,17.509103246781812,18.195225490682958,16.59151961987684,10.551804101359705,15.652053724018062,10.178510347958902,17.12877878136364,14.958526165121985,14.836668464295439,10.018566165328345,17.674385894868273,11.532803848666598,16.914842991039215,14.557996199543627,14.384346736092182,10.734357272411053,17.06937220296782,17.662408144892563,11.946911295077744,12.154367064577123,13.146472094297383,13.653643006676457,18.128731677692322,19.083858819260616,13.517890532012144,14.532780681928115,13.647355401712701,18.862445872544978,16.222055262474093,15.793364160099163,12.077487128346604,10.059965506712015,14.385621018599966,14.464973034235161,13.132375013853261,10.431690387181975,15.007275795016625,18.89867925859272,14.304438353660291,11.977164893877312,14.60805900767421,18.849143363942183,17.52481516585595,13.796198226793667,17.478641895017695,13.007688887973075,16.609506893511202,10.032661579484955,18.08248633366226,12.789092386987623,12.027103139225785,16.21239931238305,15.446518095589429,11.752789050354295,16.70109845408267,10.745271045129206,11.94563970688186,11.255807957432058,16.43942735996518,16.67628859561773,15.785199183271319,12.633056831521323,17.157781881183727,16.89164060228834,17.858763476760778,18.67622528569435,18.50917276510614,14.933228844085551,18.748373731148114,10.889987063374138,13.291522989968625,18.176381673630974,19.073875222971246,15.397069556263103,19.229480734073768,11.235672973688612,10.313476630620787,14.995030496528216,10.04575636578833,12.705883562594938,11.799813983305423,18.59088486044525,14.860515525100498,16.587526173800995,17.801806694295088,18.836181167223458,10.936947840172788,17.632788458673666,10.186321001311525,18.36114639654378,16.724645709251966,18.896826368319662,14.930515761506983,19.173780646323156,17.7862095988405,17.194547602825097,16.798151416544123,17.38602258667309,16.244143425332798,19.316657388621685,17.71103071010299,15.751951019265881,19.963240707435194,18.27599558993974,11.808575581518966,13.930110425624127,10.731593656528391,14.945882493350396,16.03217150043742,10.49059839405911,14.918287496197802,13.482946117756944,17.38943820782217,16.949733098014804,16.039699636948725,14.962244221965573,10.971218844176033,14.022335571393707,15.54872220964266,11.353920243188755,12.080649866515298,17.39903069561347,15.37013747185551,17.633208057291277,14.359195252662062,17.577075026990045,11.485609952866138,19.451429427913403,15.021626469680474,11.80436987873799,15.281855551833761,11.239375967605767,14.791882021256908,15.932092609921716,17.01819206546884,13.294320518237559,15.7999663025024,15.331867890826329,17.72009532088679,10.88920511867088,17.755214431258985,14.785733608781316,10.62905739463722,11.905946063905667,17.956503612143834,16.374605348526938,15.320402303047123,18.606363229847958,13.535080989265541,15.839931698863065,15.547998187749666,17.65526776503551,19.22860918582022,17.784307511372024,11.175091392578631,14.029389567491643,15.950907472278331,11.17319095550258,13.4337105573841,14.6191854562143,16.689471220523686,14.617610315671865,16.004163183205254,17.45108381913383,16.396840339503115,13.878795843847211,18.554477486984883,19.48820401703476,14.450378843683456,15.624842815780811,12.433691133037382,13.690694678323599,19.358770467362312,17.928231509142023,19.81319657792514,19.82160511752993,15.911690395968174,11.55394738351327,17.272116241548098,17.913668690313038,11.005047729210151,12.327852701686812,16.213997110303406,18.982079137616807,19.583859546384943,18.629112880592622,13.983413896968795,14.78169006989753,10.85234871754996,16.99635486393538,12.716053260513295,14.22851199300082,14.890517136098326,17.79116687021811,12.715348713683039,17.859737368241788,19.063758993622283,16.522097370609306,13.170308151330383,18.441564707172112,17.483651012565474,11.078237711845528,14.417014851062838,11.736145679586333,11.750013343738887,15.282958506338993,11.46340388938949,17.034662487591113,19.113334358831203,19.980380713212945,17.249775852984452,19.459209779262892,19.170175502692405,19.504451866693895,19.89852970145501,14.415190134317024,14.856940681000193,13.452920767116348,13.949291739100953,11.631069473718076,12.929989750747893,13.435241603369397,17.88440814539794,10.858799051273722,16.298130004117674,15.831857464146102,18.309565439316863,13.74246961386244,13.227256396838696,12.128691356333647,15.487184719977112,13.973086293949004,14.216187367588917,10.204511266310819,17.14093370019711,14.278207906478528,10.986663141275447,12.717710747146707,11.873047428335266,13.211316484514429,11.85267691602417,12.45186010611521,13.72893249366928,15.324469097505702,12.40172759145672,16.02036241530159,12.103001803729342,19.610691140639958,15.245341131358824,10.66249056393647,11.18149102044155,12.718038669663223,12.942997321850028,10.081777148856034,19.917371306706777,17.817808313297512,15.50783864858106,16.33467873158004,18.386779003480914,17.624601361116213,16.63833339977127,11.591625725090557,11.836593588384696,18.63420700438636,19.692154269304936,15.209732546775873,16.316771119903255,18.10100932170007,17.59358182986066,12.063582391010623,19.192843973614544,18.13383830678342,13.473472516126574,14.994921075102068,11.209774686457962,12.339076402627496,17.49631812327333,19.292540712468018,17.62760984909395,14.077215692887126,10.295167375948253,18.883871101072497,14.218326884307775,18.354828589061384,13.244588867076477,13.619688145481723,12.337832478167039,11.95879186036218,19.96185058040258,11.339004064476555,14.997004440106245,10.189673303368409,10.886363108220634,19.637091039662486,12.249598226982947,12.300525885592927,12.962504324058274,10.900892229422269,16.866166098331085,14.126811892794457,11.04838272738453,13.872958729055142,16.107203073859274,11.827120081582107,16.971125920395103,18.713659986329134,14.210326282620986,13.90255326055011,11.817669769194945,12.793783891943258,13.806290966746904,16.58674609527377,16.88154195011466,16.727716035844683,15.989816762329417,18.870491900166208,13.230205751955985,12.879883049233653]}
},{}],30:[function(require,module,exports){
module.exports={"expected":[0.33867479187806315,0.561288075906999,6.781562949398891e-8,1.4074675911451695e-6,0.4584680144424599,1.968841790343622e-14,9.094991593154788e-6,5.071762903276025e-6,2.9795548856840975e-11,7.12158434798048e-5,0.0007391424456188963,0.632884327657802,1.5889446599956715e-9,1.237832699196051e-11,0.2981674507594463,0.0025183088601291306,0.0016885595566738798,0.34537348959351255,0.006533684778678696,0.05384516646586155,0.000622038347488004,7.126099345097469e-14,0.23388271188801782,0.276695726961615,0.7074482568520809,0.3926586731442851,1.4631464757879977e-16,0.5563094083883973,0.2894920272157904,0.20315363871374068,1.0076557140572408e-6,2.508677686798812e-7,0.011518801055893986,0.07586264385521813,8.508904604904884e-26,0.19846515227291844,0.17692829133562737,0.019062691503591564,7.928410779612224e-6,8.237581416071764e-8,3.1795737650292625e-6,0.5278609593910426,3.7396823666541763e-10,0.058169442651010886,0.2534243087055836,0.16363113576398755,2.0061812254915527e-32,0.021817867482284165,0.008115177517258456,0.016838456373012498,0.017117632684856773,0.043483732036412516,5.066577756185493e-8,0.001124020231759464,4.100768047312813e-6,0.0029501984485037253,0.2996361067222406,4.5374735311187906e-11,0.5209032366096319,0.7594940139399479,0.6593285980876424,4.673180819652247e-5,0.3509302166133653,0.0029176591510171814,1.9887181585282208e-18,9.318280352519407e-11,1.5085667208128897e-6,0.06777436893623347,0.027571208954070094,0.006532748786405774,0.00042919077820406453,0.0002839415582494673,0.5991866715152692,0.002137439918680413,0.007857787769619849,0.25239134160859766,0.15483278505721293,2.6683992382748758e-12,0.00013647134524797326,0.0008176623527589601,0.3283129200383471,0.007450029258387342,2.961612881549314e-5,0.0029639911507950522,0.06137449597879019,6.093180737054649e-20,0.16018654832464357,2.3268060534990565e-5,0.016516263036443726,0.09201984313945984,6.7912666662052535e-6,8.52518111578523e-5,5.127869167790264e-9,0.313561087417152,0.17783080108612354,2.413286252955439e-9,0.7627140236306804,0.0016428015509283359,0.5258160551972129,0.08827252779240262,0.8748208332396413,0.04403814923821184,0.579322074170269,0.00014153694558623103,0.4880003665598768,1.3029293464258874e-5,0.011124287174413421,0.0023265521884685446,0.005613890265262457,0.26407121981316606,0.017650915361821364,2.697136642717839e-9,0.2766534637285961,2.356580221594247e-5,0.33570382649100183,0.04348648262399173,0.43704242712498936,1.3361020712301897e-9,0.0027846298346966515,4.7670123989815186e-8,4.23311164594846e-21,3.1582409655301075e-23,0.0005829768887293532,0.0023511237678468713,0.18794405939617256,0.4215855499288349,0.07700659094690422,0.0004993286540670242,0.01165213720221326,0.19727023616838738,5.512117040633899e-9,1.3934287592981064e-13,0.028533176995396148,0.05151214639007993,0.17129372699223064,0.8042860710050351,0.3192872685181461,2.2074412673755067e-7,0.08827186089981004,0.36568404491766354,1.2024109955611135e-6,0.00027424418463329833,0.06426026118826819,0.09144175223052352,4.63484571432232e-7,5.915577570248184e-5,8.213045562804424e-6,2.8848182843064277e-8,0.352150779992254,0.15309592423811758,0.5629347999267342,0.19893505878061504,0.000697927489071651,0.0036862922984247032,0.6162118563268356,5.223025268579318e-5,0.13182878040427953,8.798661984156244e-5,0.30609204330260115,3.560747530007415e-20,0.019670356250320372,0.3141511093338096,0.08268353375162023,0.5097551999025592,0.22515021173113245,0.004983484692170581,1.0705667271714437e-17,0.18546986684208885,0.0005891005302659613,3.8729679777798025e-5,2.410832568112433e-5,3.4179672999925306e-8,0.01605816516404736,0.03347887270027887,0.011152907862990906,1.1263233113809136e-8,0.001099151555721881,2.6016898685008767e-20,0.40876062164610827,4.0839443152869065e-18,0.5650799415037547,2.5992175475172357e-12,2.1914140975312826e-17,0.03253333418969844,0.6582633965990807,0.030580236493681745,0.0391975212414569,1.8948561264596422e-6,1.586034496289704e-14,0.28548176042627726,0.0017301015738600302,0.033004383857882194,5.700048179421389e-11,1.035966849628295e-17,0.011562167743704105,0.10364705023224674,0.16844076330194518,2.7184817606193234e-14,0.461789081804669,0.26906187856951663,4.922539850012885e-14,0.690735588320583,0.0005999765506261894,0.00023649229027461718,0.011649614609830754,0.06123542188038382,0.3470919515881241,0.6909689626053703,0.02493143844149613,0.06522262050249203,0.033955673883907724,6.714971045101688e-7,5.951160298226571e-11,0.5019049468183862,0.0001248808707971773,0.7347604019996556,0.016994763013108215,9.078141029184901e-5,0.04955718222498606,1.2005970218677515e-14,0.08482251079043801,0.005632463692584092,4.916688881071943e-10,1.19011516296844e-16,3.1035546942270836e-10,0.5739817145646677,0.08086487676903191,0.03846593008171627,0.511211448453192,0.0299648793964069,0.05106733637779142,0.26598327338760797,0.0006381330721348882,0.16591178219735733,0.0032149811757236366,6.84300356365735e-24,0.07626872308707527,0.04654271335009768,0.00026694510732549564,0.17074711577815144,0.3227298075957319,0.35290817863782115,0.006159138999026219,5.740641328382613e-18,0.16518102069051002,0.01233098136090798,0.26248387841841925,6.815383977248079e-28,0.481140847652198,1.3867876667157326e-8,7.776867643263186e-5,0.0003095377289592794,0.0028629174893095924,0.5160627703882529,4.730264992847505e-7,0.778776814164504,0.8036715009797166,0.0015712982647168587,0.8226469922008556,0.0806134389262566,1.894120936152706e-6,0.019724383867860067,8.90490163402966e-14,3.2069848753447585e-15,6.861020919103405e-5,3.4490761066399807e-7,0.00029394608632324603,0.15597002404265525,1.0828895946741998e-33,0.0864600868430979,4.5133211547889215e-8,0.00029334747904905174,0.08510925665867161,0.0038269497630960742,0.005648691378803795,0.004230120508508962,0.14489409494150762,0.0014713110488737005,4.555881087395556e-15,0.8308049301467664,0.0005369364376833273,3.754015264797166e-36,0.05949939634997852,0.02070284490252178,1.1168181510873795e-9,0.0021391731233440653,0.5178720030402592,0.8492868992947931,0.018308886205832174,0.04523687454428246,0.643288298651977,8.140162468403215e-8,0.019003760375588628,0.38701858364398367,2.442863196122222e-15,0.7117943665911637,2.1404093552693378e-7,6.789553172806913e-6,4.578610816484036e-10,0.23000351783106102,0.010104275756212025,0.11736693051801506,0.5127106849979085,0.003234298302752403,0.7669815216395833,2.402768050557937e-6,0.001738790075420761,0.328767125078431,1.0327280293069216,5.992382555373535e-12,0.31278619893587023,0.00011308688030202425,0.0007059169493616392,6.367588570451432e-7,1.917806790855025e-8,0.5251685488870855,0.1224187097727084,1.0199504922054e-18,0.038508214684353774,0.40351361177662576,0.5488830306295682,0.0034003049898718505,0.0011062130678801967,1.1458329884110345,9.035303983647833e-8,0.00228949030885906,0.5442251199702752,0.010023886039162924,0.013517316104312612,0.015998664591195883,0.3347085382812742,0.3132326526176202,0.06463043020066146,0.019668079020363882,0.32684571147162333,0.5216652979887175,0.25999799523131856,1.7852709350920697e-25,0.27637548118908173,3.22424257272618e-9,0.02615857987423843,0.026826222556750736,9.409692887158115e-7,6.150914143661239e-5,0.40785960850641073,0.03192901162445135,0.00024070505427171643,8.418727162315088e-5,8.216070303019253e-32,1.2984537732231138e-6,0.0013813365112470958,1.7217595577116203e-8,0.0001561332307546974,1.9666603226824525e-9,0.009080596920214448,0.10281685309183372,3.748400649723776e-6,3.7782174956698452e-6,1.8600875971140325e-5,0.7917282174125033,0.15963343696029933,0.21820822185210093,1.3891820527022419e-6,0.19733550012520965,0.3195883960024757,0.02670239654576905,0.04689850837773918,0.003141856108286858,0.01782041786332254,0.83124827441998,4.309657429574017e-9,3.558845133461975e-22,0.4266415198491017,0.029056262398832328,0.6862272498704978,4.3482485725644226e-18,7.971566709372718e-7,0.05299591091657898,4.645172405653345e-14,1.909687218331375e-5,1.2235211488683699e-9,0.42545750992359366,9.543418479565057e-24,8.153975286583503e-5,0.5142042918838582,1.2399399855168086e-5,2.862990573943932e-10,0.4398287689784507,6.488647321681062e-7,0.1731069413118278,0.009184150022343617,3.5578134009301916e-8,0.005021760256955341,0.030331232902345292,8.454484352400435e-13,2.39931559273891e-13,0.4430088524619625,3.1434590819868596e-7,0.0009260231480507872,0.49423419570470906,0.0014869947569422547,0.48117305913962066,3.6707644839043774e-5,1.731747933307771e-11,0.0009817633340799723,6.660191865073553e-9,7.067898594310413e-33,0.4450254644956536,0.31288850098515264,1.738242575525922e-6,0.37023528015094215,0.15286576433415366,0.0011597704671068097,0.8743663665558734,0.011151626551219873,6.38196075243012e-5,1.0654755199643893,0.3639034919500852,0.06377132859604341,2.3509921899412212e-5,0.05263658345438648,1.3556357914559385e-6,6.231470633722943e-15,1.3159752563241286e-6,0.1752261520953225,8.824224320735497e-8,1.072960845673547e-9,0.38041305049497237,0.06617262717158995,0.09360542895589245,0.12520906255401415,0.0443886639976276,0.2861710139713877,0.29832663938984877,0.035851060274736744,0.0006677661851324501,4.221289937029968e-6,0.0001645645893961519,2.617888459050307e-6,0.6401142756231708,0.001030324401573086,0.006259229741508554,0.004217509642969628,1.2218848581245391e-5,0.5479739068327935,7.660164736723528e-8,0.9087902067023939,0.002083501666698766,0.00023519193616381971,0.19795596207223157,8.296451809269812e-7,0.5628467138501522,0.1829752083694754,0.010657539427318173,0.325226138034856,0.03354245925018851,0.043722533185957146,8.646422468386693e-6,0.008938674185664564,0.015769956684362114,0.0012277315044843032,0.4623084079111718,0.029188413332182462,0.7789167135352548,4.093706158770345e-5,0.0010640103881505603,0.00021210648294481605,0.3876628675174141,0.0004430659965999878,7.088948440449117e-5,1.419058577889272e-7,0.048616078869171145,1.3996590698568843e-7,5.078785137253413e-5,0.060658515628215226,0.0021006000162992126,1.956770431026102e-6,0.014130804995383392,0.5360793438311815,0.02549605179104359,0.08650873157558658,6.682717318467158e-11,3.6191494250457095e-6,0.2636368737789496,3.1209430086114485e-9,0.003444271065742893,0.004104042979614524,0.043805800609306486,0.02787023898571895,2.0941195104601422e-7,0.0002388743802310792,1.5590853757142064e-7,0.46345504717333735,0.0015058194318682352,0.08576120866579236,0.5351596170900919,0.055706496639616083,0.0072361625399145575,0.16588151876703072,0.10500726490165735,0.06793668857104716,2.784116358916545e-6,0.4274750360012929,6.836482592458939e-5,0.002638904716580412,0.43245372433279466,7.119346684550097e-6,4.037777268914503e-18,3.435797292668106e-5,0.19343178421013707,0.6931163496058409,6.677780573073664e-6,0.00035425533747874004,0.31670331916671707,0.1516033746292972,0.4024885124131541,0.37219054386397404,6.929665626782824e-6,9.417786015450757e-13,0.00023361422155633859,0.0691545902197243,0.0430900753197143,0.022189912918931454,8.399030294139731e-12,3.099022399422591e-8,0.053467966202244706,0.007598385072149851,1.6794638847591006e-8,0.0056413086023268996,0.18078814742475602,0.685454456850651,3.644320191534193e-24,0.09523483897670812,2.824103811944753e-7,0.280030012774447,0.002358471651053137,5.92676610604802e-7,0.00017401798270832194,0.027653255872261553,0.003599128209146296,0.00036860802672668736,0.0010136006650512596,0.15066944964947487,0.04177241147915414,0.5698057700754557,2.704947912475644e-5,3.798522927543163e-5,0.3133262295616335,0.007681247222145032,2.388336263932984e-6,0.09106999411440068,0.013608487409159018,0.3151768731429496,0.0389745129773896,0.02011067673196076,0.5754913693740271,0.013619096257352041,3.38313494271623e-10,2.2202777961500963e-5,0.570822793436433,3.9448143283471804e-8,0.07166625694755094,1.1495992355170776e-8,0.009963374481102065,0.9500146773080378,0.30511778352563534,0.3629152503682819,0.34875604681435074,0.6505348918162281,0.1535422240537777,9.039602245777082e-5,0.00014979795408729096,0.006534480630652237,0.03971324793804913,0.0010637684247477726,1.1162055365932355e-21,0.6561484884065306,1.8499107545119533e-18,0.16625019614037684,0.41238101438506614,0.19713123575009733,0.671145347634665,0.24248468416278252,1.8547222989988583e-6,6.14482239229306e-8,5.722390822557641e-15,3.4338189635370674e-14,0.717511713033441,0.0022325510337396753,0.4367544713575326,0.010813897357443439,0.0035308433507868055,0.24612859300388265,0.07991237311273872,0.0160309189502273,0.2769306559583563,1.826304116374239e-7,4.52347257460189e-45,0.0001447372397274663,0.6752804509206373,0.1108723115312503,0.5125885776391997,7.304820323002127e-6,0.38765728065151095,0.5465103092147031,1.5017337119866987e-19,6.204321902526391e-30,0.04964024688950948,0.5943698993812291,2.364188675897469e-14,0.0016424965059327144,0.05838243523420283,9.734893294805654e-7,0.0010320401414499881,0.023632468053455286,3.21273130248077e-30,0.00039252736094773784,0.00016746762011774917,5.812279166801445e-21,2.9080939578895204e-10,0.3544854756340095,1.2599227922958878e-11,3.897902554490735e-6,0.15257715991662849,0.005612291274625043,8.853534455917993e-6,1.0667992210060947e-15,0.0009516719655175666,2.2243171280698917e-10,0.3436946168705542,0.7140848266311653,0.13638550249833828,0.38486104723097125,0.08104013597555111,1.376452336561014e-33,0.022160336576961343,0.5985269201406718,0.4097442249065636,8.75157613116545e-7,3.729754138209927e-10,0.5798646964641722,0.07852179882734205,0.027939711605777556,0.1448758508930287,7.614987916862719e-15,3.0035261323366124e-5,6.4045842174897e-6,0.026953471918987004,0.34840046548574083,0.003260594890587798,0.0005770419636429035,2.8831961414022736e-5,6.358175446480732e-8,0.23384042566934063,1.4541109486164294e-11,9.446741702673786e-16,0.001753667151241252,1.6417389324744535e-6,0.021592089581121906,0.012043207617090284,0.10199438973223356,0.5153004106012851,0.0041060364847282736,6.202259031760867e-20,0.00561586643663496,0.008277322290278263,1.92866448827053e-5,2.0642579765971957e-19,2.9600072717870775e-7,0.3980065107652322,0.14665884932281106,0.015561985344391597,0.4062263215878702,0.2744688163457344,0.024878667408163475,0.27116519660266614,4.057600596024133e-5,8.101984758924008e-6,0.3009740867403515,0.007689814251923087,0.0001269754029258491,0.039894542078535225,7.312256433437837e-19,1.4755076972674948e-10,0.01918061056471775,0.17791481716041074,5.750571999992617e-6,0.002932105208111307,0.020876876881220103,0.6736239769619751,0.8194742048769554,1.8142093676346536e-11,5.5306937001680426e-17,0.14082249914068495,0.17277886532292955,0.19840027944727906,7.505733252271537e-8,0.3516463568268925,0.02873255277797595,5.640860906419999e-13,0.46326095547693175,0.0070967681172244565,0.5014410198988376,5.2716476280673315e-6,3.0576403707646e-5,0.019225565185528332,2.0359152676325138e-5,0.33078807588780607,0.6285019721362912,2.982332094780096e-5,0.4303611820447487,2.3674453955582748e-21,0.0009563492432763099,0.00745944285975217,0.42519566375984763,0.044688883478412156,0.04379525071608642,0.7986911821698691,0.025083893493765604,4.756515439779247e-8,1.0473323436209428e-7,0.29042591467182166,0.6569973700928334,0.05854634334854057,0.04539759256193266,2.602086660914913e-8,5.1194111401773096e-23,1.1134712270041322e-11,6.438421511319079e-7,1.3990721597894092e-14,0.7134799884413642,9.546357549512802e-6,0.09022229763045855,4.599684328285517e-7,0.0031130728634040697,0.9251420904408485,0.0037393965487692356,0.0007822051194295559,0.28302575707802585,0.41050552901422593,0.653473899981571,0.2441568028062813,3.3131740581056055e-6,1.555576056575343e-7,0.06974669896834605,8.531041166218788e-8,0.22328530574152572,0.027020728062562595,0.12348703677689447,8.685013435418622e-11,1.771753959069792e-14,0.25759624716256274,0.3809537742377686,2.3047342037536815e-7,0.00024733023683256477,0.009557220729144177,2.1828828480320854e-5,2.8603431941321663e-5,4.4405195244040385e-27,3.812845506558875e-12,0.48922435471757264,2.288251501663616e-12,0.00721407979709143,1.1082694603062996e-15,6.218618262674363e-14,0.21699096313614646,0.42620504518466623,0.6603423413312266,1.741377333284736e-11,0.11453078695659855,0.027883824208452295,0.0016288596805168153,4.739197142229269e-16,0.0005036704553816034,0.5840295282025464,5.601786646493138e-6,1.8336232745193178e-28,0.022177461317802932,5.139130923864356e-6,0.03983408993499,6.054112819526182e-9,0.0020774122910388183,0.26905785034146357,6.717917803508119e-13,0.046641534127071074,0.30378439503036325,0.32499581831268737,0.5665270140637525,0.6152952152040797,0.17660508910970538,4.800916465968694e-6,3.934081551906404e-20,7.36118643019119e-10,0.0004882984133009322,0.1376428034945971,0.33454460121104657,2.1770066935296836e-15,6.146837776723832e-5,5.027060319693256e-7,0.037299167486678685,0.00294442300054869,5.258248681933792e-42,0.20007643721910878,7.135372422964313e-5,0.0006776307804064251,5.072241574076081e-21,0.26223971386131917,5.8612384760803215e-5,6.569784892084132e-12,3.754376261945728e-17,0.8582958570156642,0.5138728614804289,0.061988552060325386,0.10833265391286143,1.3291639925406765e-5,0.004528258179811367,2.6749328253899984e-15,6.614472219350166e-20,0.01426837048570181,8.560734231665002e-7,0.07282914976868197,0.01712868136441907,0.0012457159352987695,0.002380046758437949,0.31479855262977147,0.3746989387795903,0.2065000888557341,0.686462283004532,0.2621075091764255,0.009142179303324052,0.13394824872609473,0.008846826322445366,0.22893634529798654,1.0312432520277382e-10,0.3486142263908414,2.843638689932403e-7,0.003214325451341318,0.357248913947713,0.45860374125603875,0.1968631894594316,3.3795811763867312e-6,2.332032208201855e-11,0.6146205897545958,0.0029687284571336815,0.7161705098210334,1.5844387340654676e-20,0.21690829989522764,0.021433958706352254,0.013880537735419378,1.8209263505988724e-44,2.598815272164073e-7,0.004569501743651728,0.035174543026328484,0.5054476376546978,0.34480796799775776,0.0014740455743969347,0.147159309947233,0.6534025887513656,0.11285122924069735,0.017086022822624822,0.007488733634302495,0.06905036935821021,0.03173357701127407,0.30862221525720457,0.42874174857913183,0.00020459429158633892,0.29085584434595463,1.0982373820886107e-6,0.6049260064933896,0.013022409388274021,0.007187766122335549,0.3260438566893113,0.435717779676697,0.03276571810843764,0.41741881606508185,1.2176746535113124e-5,0.007029946206156095,0.0003869520598489385,0.0003187332713072171,0.36545595197576075,0.3113947313789056,0.5562859007189571,2.2150948434998696e-5,0.5661168432539374,5.010279469386894e-20,0.02478591317178242,0.7859608393159954,0.0097176642150187,0.01288778650112079,0.09368822681677168,4.159141106623924e-17,8.717888813580652e-20,0.00043695153258938675,2.7035203610621914e-6,0.3002723176340413,0.1568051159182379,0.1231119742058767,9.75887081423025e-10,0.004086345008307841,7.12014161879838e-9,0.017623963384831146,1.2939134651551943e-6,0.10387593369939777,3.901478012665488e-8,0.3042711374225243,5.101960774663449e-27,0.1909258653785084,0.0048456106855458364,0.04169584635042775,7.911554835575842e-6,0.5382560066781352,0.07662141861721716,5.038684488022797e-6,0.35898076472818685,0.0034134166078902684,0.0003798277377960172,0.005425220980907235,0.29902130901347745,0.18694906691507174,0.026960475364697714,2.707478505368763e-24,2.582876972545851e-7,3.2900467845507456e-7,0.2901158515395222,0.8365987819438637,0.17458202793179312,0.671859970534207,0.18458994416385666,0.7971498413631419,0.46553800982498406,0.26506504616724447,0.4186562544133938,0.8339514982106871,0.024819061210620524,1.6665376107439575e-37,0.0010473842987107089,4.343271343155688e-5,0.16599431819971838,0.587591609238018,0.06808391579736649,0.0050371021397539375,0.23989656005521198,9.250904607854799e-9,5.832756157080887e-7,6.114946192432949e-13,0.6955416939443291,0.0027681773355495575,0.005087682694067489,0.17758469809438823,0.0019130791431468527,0.4389398272540051,0.16949403857407833,0.02535427525249158,5.421947794983625e-16,7.612409353117949e-6,0.07649557094028747,0.2940968111644981,0.08944187677698655,2.535059710408976e-5,0.013082282481274576,0.02874975173121617,0.011975825531166816,2.79350517062131e-15,0.018659681417855224,0.36796514576177547,0.0208858852497985,0.0033054831738279582,0.11101871411128017,1.8593452200129479e-9,0.24789319761963566,5.476372894064719e-48,0.09517886544119031,0.0003063178679719618,6.739427570109627e-5,0.44555753745006976,1.0449919852021063e-8,0.36531116614757825,1.7907020388778065e-7,6.502033215804604e-11,3.198993579807527e-5,0.6867547332104303,0.3545450652170453,0.7773349506025425,0.11820902683233281,3.793276043629235e-6,0.001298780723388531,4.592679708736642e-18,8.367334210489828e-18,1.8130577892408694e-8,9.486971476275594e-5,0.10888596099447335,0.5146715743953993,0.4844275508770961,7.692958868870971e-7,4.934841747293825e-5,0.04049441689815284,7.532644135605586e-12,4.5999573459379224e-5,0.00953028847799145,0.01020911790359224],"alpha":[16.59248788454254,16.8727082243372,16.94812419099469,10.939513382554695,19.419038835950246,13.239692385424494,17.61853803128411,14.153957853874072,15.501699879012868,13.907444731159437,19.49666713567128,14.446711127623026,15.747556332451826,15.404602107417071,17.39747455670983,16.480131976681633,19.326188446026364,12.493553412334924,18.82080834662345,11.68391309838964,13.141993202890184,17.820206935993035,16.51162005089397,11.254960294529594,12.933464402737574,17.442924585967035,11.788852209551134,15.41462821363265,19.455856205434507,17.165680279977504,18.932820810815763,12.210298315062643,10.813109060948463,13.211072453523371,14.868854018504617,15.664469085151438,14.27541808114575,11.882607652005193,18.986080556307343,14.076914598928967,11.077136239752525,11.15842966802024,16.648073619836218,15.287165842773154,16.78243390005486,13.607090769446984,18.472486450074207,17.229491251545383,14.370776554013618,10.109043781192879,13.445066952071711,17.917898219920158,16.063659163671847,17.55385475297264,18.50158313349509,12.72415793558218,12.230972500569518,18.912993767780257,15.886545662103313,17.696189080324803,14.050699348316515,19.489929922196577,15.639946211867532,11.032538461247805,15.262262156868262,12.665560849326313,16.362824319222682,14.703367015227268,14.102238970301727,12.856037393411704,17.66629499955181,13.102109400233823,13.081506103672538,15.395777876811591,15.59497318181186,18.44541264179948,15.596368166202438,11.608142214224017,10.664741781166441,14.649776331672534,12.130519915505406,12.914155776611382,12.136320535709281,15.63807304828252,16.847687583880777,15.040461169672732,11.407677302784068,17.523600454470916,10.749664760402036,17.226053284889943,15.617816393773243,17.593762012191537,14.366528834891032,17.38571013037543,17.940864474955163,14.474253219538202,10.528383828846792,15.564905331304775,10.923159260896027,18.003815955706436,10.454922642084178,10.355097917800435,14.189541719147755,14.966815313413992,19.673140141121653,10.526320964627331,19.90174124304091,14.663977658460396,15.59930332587122,14.989080423263108,14.836565715695107,16.027935783827015,15.750337250873311,16.23495346855617,12.586743004654357,19.839302585079167,10.22378147328167,18.337846748224322,16.212418962809842,11.620068511995116,16.99439754413615,10.574329818614212,10.897606947954968,15.463045409521124,15.896526441441122,10.237911393930245,15.185508892237928,17.621129317581477,17.72766711144716,15.00345366638827,12.186444546266497,16.13326839206279,14.560777182071803,19.479433615827485,12.153327889735262,11.970125835942602,13.889030541139169,13.075692996607991,13.51151533741205,14.09962973838976,16.7501814550756,17.980693951166657,14.698585401415688,17.576618878310402,15.938843474800002,11.805934095953086,12.051318861138034,18.93349552946473,12.383890039832,19.616881078924077,17.03636590711966,18.899718082614626,17.527004471798733,15.980809826425649,10.634161550774495,10.793516245998418,18.06491465178194,10.385472234153275,17.34131228508641,16.77206551806816,12.13089608394518,14.16947569023052,10.759363995803746,12.062140119387578,15.3235414346787,17.50145672967657,19.923164132444263,11.852782802462196,15.514242569691847,11.568425625044224,12.172010717687517,16.47675933086877,13.31389732333956,16.2446634598982,14.286181103179942,11.905525359913351,19.195235721899202,18.15928826996266,16.37903965397762,17.28609797318058,16.124734418662513,18.06728529739261,17.27220301639594,13.697841074530546,10.26688657181339,11.111178341252065,10.177389343724615,15.006104299681585,15.931307057215276,14.401222237171114,13.176794581426385,18.992251530968055,19.89844701280957,13.024016894991101,10.319014295519715,16.88931885697673,17.21696977535901,18.001828197133307,13.563893930035624,11.20742460015109,17.60182587080065,17.82001735137652,13.787913608011566,16.263305386204696,13.042197265856997,17.19556114907949,14.117593620852107,15.367823863430448,12.760211574796074,13.566844755693701,15.691072737497269,17.47438836648999,19.561209418994945,11.784264348823175,17.326195759295974,12.262471423251746,15.766483338101596,18.54711093898077,17.770895285378685,12.652846219441026,11.205660141155873,14.541981813176236,16.651177893783057,12.83723970492428,19.7103726484543,15.712331882609192,16.93569793778895,19.681523437623934,13.030807693067004,11.072113159175029,18.62667036551987,16.399284390624864,11.31909011792365,12.207204104196308,13.47534458386886,12.091702873361163,12.411986025198578,18.143732463080717,17.656607063402767,16.14283134740231,16.13779298855162,12.095011204877633,15.31496519760211,13.996907878221585,19.86396335558016,12.564216445084988,18.257769028415147,19.987217964340083,16.38071728210462,14.557530723764657,19.378355208207942,13.664185986432614,19.499561639374573,17.948327161033234,17.510713597834318,11.925008104017842,18.79046954234159,19.001628520628522,12.68194978728137,17.632407190995778,12.308315348345516,16.07554734379669,18.975013338587498,19.816702199043153,13.175161339535684,19.506068948640355,10.439420509476866,16.478516915294552,15.057253503071086,15.152229381827865,15.762754004085068,15.782194991071227,12.43615570381586,13.620926633889532,12.496858505907547,13.802136692201687,15.414037880516267,11.290196834218296,16.88716388154714,14.377548144477412,16.866291696344263,18.90726112553142,17.63771363466465,15.70791302101064,14.511368057050912,10.641443845506451,14.342497494226954,19.442855896858468,11.680702032869458,13.462218761073919,16.393782385840602,11.884951984023985,13.638142876811516,16.633768343952156,16.232028590023432,14.01748498945235,15.995280460123462,17.783260710134464,17.766287679927174,19.41250440677914,10.294175937627807,13.915283172118686,17.348814904196125,18.50948680910698,14.560349915369294,15.902457007215364,18.994229720020854,12.421613427834885,11.762358556529664,16.083354985223295,17.553085199663457,10.78859259650831,12.20739362733996,17.870682442125435,19.405955784328924,17.97363638870216,14.59965220536904,18.12271941316648,18.21959189957622,18.359831861374577,10.670754650101724,15.7670062037793,15.221905659649188,10.3102867002268,17.590544012916816,18.2170503342965,16.98863107545588,15.687267423652562,13.655632021563832,15.912900591646938,14.67969308812519,16.42901428403684,12.59111456931402,18.45601050904998,18.10427725738936,19.58875593281089,12.044991299458728,16.09283780950934,10.964562032842142,18.540473259535553,10.398952207118068,18.310936810206925,13.735048765285887,11.991128424337639,16.58339815420625,19.881997139931084,14.145529049370488,12.413617272853902,19.004617753696188,10.383320640254613,14.146358827550745,17.377577744700332,18.1099690582611,17.225320877288596,19.954377583867235,12.329083492371565,15.858801977726056,15.372661697928482,11.302780058268404,15.029154524289556,14.587388789533923,14.555412812117723,13.629672273908465,10.896910184883275,14.955114383488246,14.318466178841298,12.975344468507577,18.12604866597494,14.00844216612562,14.577937549683714,13.263535710409911,18.655828891217052,18.937029334974387,12.898843430263753,13.30340623995369,16.247982181290126,11.102506549007602,15.31757887839589,13.912603163412879,15.639509836482619,15.426009594767827,19.970229170998255,18.836186488249936,19.9564563874789,15.88164092521348,19.927814594264063,11.692405725042116,12.66628012931471,11.441337868768052,12.763601430675093,13.880156518917932,17.27135094217034,10.53260444644814,11.865370211536622,18.36072574929836,16.238626227216468,14.486808966774568,10.428313011944923,17.00993332300502,12.581079196214947,16.3472996035063,11.055741452045641,19.46081379187631,19.9151343465629,18.931646447662274,10.001515119184226,15.14595774090356,19.19744508569682,17.39412436911149,11.670588866095892,16.191565471487657,17.31302421363759,14.847664711423434,11.31619284066513,19.11226846256372,19.038457391399795,13.601196173603952,14.138827022494384,18.370211166053593,16.95996747904842,13.189824385721018,19.956614730952715,12.903718289670632,19.458008230874896,13.776394476023558,16.8191640984315,16.847286956233038,17.07697122618879,11.876627259956148,19.945596208796722,16.10103348631583,19.600854550998825,19.021895054268082,10.844472578276307,10.65621898805391,15.21537047123723,16.707467905802833,18.486535099134734,13.944759351783231,13.705088399321069,17.365181571568844,13.150522288931022,13.185556349242415,10.848867168957966,19.49835266467312,13.140815775844885,17.86466237298961,16.903265231294707,13.42314568685354,17.65652079425807,10.247728204226277,19.314916883144583,17.562900608407965,18.11877653721153,19.15152854314955,13.646625770310344,17.332500632894153,14.012338165004763,11.896899678365191,12.168010852744196,16.6197033040872,10.537885716579044,13.067948169673574,12.88100008973574,11.940350888724844,13.363386020029575,14.735019518481547,12.092529821590173,16.28640728223534,11.593756417027004,15.025792207164999,19.546525081685473,15.754418614534764,15.436658374002707,10.223921267950987,13.674961276742373,15.08927750556282,11.669271387276797,11.519457750028279,19.80697862767667,17.763107046957266,12.478391333030476,10.425204763442686,13.283853272216831,12.534296332629701,18.240497668409457,14.138557942462512,13.84811712224536,15.298073049382586,19.442554068449923,11.313694252571512,10.552091886502645,14.493840888289151,16.786971620782737,15.137366609565884,18.046765115522614,15.383686776801845,11.530513167525413,14.881292404809725,16.28647902785309,14.921027099694605,18.1548147410242,10.98997774848145,17.743293205820766,10.037455097805186,18.49511487976704,11.701727385900316,12.695384827276698,15.90401807975116,18.656843716792363,15.44864979493534,19.669445021365853,18.19596902085572,18.08745323672937,17.70784749890738,13.201485800630754,17.094769376954083,11.926340471167956,16.65108100129531,18.471480205534412,17.14945660991551,11.632770644052817,18.90252622219808,12.66543971435685,12.966578751721444,11.950132779251225,12.263580301186431,12.252851820386432,16.06956875211354,15.536487830089891,11.816053542132172,15.150392890862243,11.067221262257858,15.325036401018048,14.664911052894416,12.802810655790182,19.67163088002659,11.02669514872974,15.755343844468685,14.912133167777144,14.388468872558079,17.924971704854787,11.524550324668681,18.226081378243062,13.296125945365135,13.075772346193816,19.26439622654538,17.59995632683181,15.397913161004231,15.07347348528658,18.701730365091834,11.834237716742562,10.565168320378742,15.34352128710161,17.597692909050316,11.96002913158985,19.28958397720213,12.582679239411117,16.022958679455765,13.237873396353972,12.0750740257827,16.064648343453676,12.476429867929513,18.663694396762708,10.611282106620276,11.438735523644159,18.843353119009695,12.192670189383119,15.603490720576886,17.945109909791213,12.225173526746826,10.551642753048787,13.632765170401122,13.112289059951298,12.792431102414763,16.40168597909704,15.560529658214836,19.0585437007661,10.611033922773016,17.2602588012291,15.723416011337221,11.894819333980982,12.332656775174751,18.735709508107355,18.446648611616745,16.878276616375892,14.31587964607129,10.050577274837927,10.958069513570543,19.275276187229018,16.100342067006974,15.067604985006122,19.440249764118622,10.743749751124575,11.009430941228091,12.609509693204284,12.335391542230159,19.048681302099467,18.15684864891664,10.898410504182026,14.126885814485082,12.535892178443719,15.893237290939862,14.414358235802005,13.612075480931358,17.806987579894912,13.083372947174677,13.063797537630421,19.126935858828684,17.88941060295552,17.278447871468796,11.716850292354717,14.059866809820518,15.398969152705304,10.43048858066657,13.603244447492775,15.183725655786569,16.59603370273517,12.733949341103223,14.552184833558815,16.740326492974766,15.128289428875965,14.872111283929383,18.2629681734453,10.079631337473934,14.596943645709812,18.638016454776373,18.428754864412824,18.498581844762285,13.760174602795539,16.222526276932737,14.8335459646104,12.424985614176673,14.122965590897017,18.49715387941413,10.173063534086811,18.569527208129117,11.358404517716158,19.169109777407236,13.629517927004217,15.931501758630223,17.30510303118138,11.971231971454497,13.822150395201398,16.593903258467705,13.30052173098945,12.401743058263019,18.02014883360865,19.035563683473434,19.261213487425906,12.313055102877396,11.456013564956127,16.692971673026975,17.315703248469063,12.457722038302393,12.86665696779159,15.820111594284079,14.916555150687605,18.293689285931976,12.314533547285066,17.224861840463287,11.749486415404098,15.168837312709027,15.934217223297363,19.856223563645788,12.47917183997922,11.705773323038395,16.0987832350541,19.35456317537931,15.419315687361479,12.818485512889088,11.963824497454212,12.120400446569592,13.860965136007517,16.63868065359799,15.230903668886421,12.99634937955194,16.810568112827696,13.559790198417872,16.798003746061923,18.27618210997727,15.713596212100551,18.863197585105226,19.94294277235622,18.702209206107447,15.147294550091688,18.278333257310678,14.850097044510926,13.519182119277641,15.338717451718493,15.428166029422606,17.14497741987867,18.40767572418215,17.433007988572278,17.090454698539872,13.225234864746827,14.24949416547776,17.908851332083735,14.072397054003083,19.33697177587621,10.714668104296985,12.527979761782992,16.10192142252108,14.387208968519607,14.134943639233517,18.663323939928702,15.786626563626507,17.374849389704426,13.925388540747894,14.488171511344541,15.694586698346026,14.419305521691744,16.40855209298372,17.85658313460275,18.66555911132332,10.676283601400483,10.281472532909365,17.205570179650984,13.652918508704703,19.48760952154876,14.670362011261126,19.30769256652659,16.044463439954242,11.266137234066143,19.78213905875116,14.518765324043525,15.643740946824256,19.07883922721532,12.234532960826002,13.93658800456468,19.423743191847706,19.768633406488618,19.930036939867044,11.800583773670928,18.62544104387886,13.05328396403616,19.293066567357556,11.948802197617594,12.45894918699602,11.159507119497237,10.237429899433796,16.459309098714343,10.184054222651087,16.872887520267028,15.184831216851922,14.075138062117405,11.936955307938153,19.885862866446377,15.329089297540893,19.463321050865783,19.14260165334411,17.68957454569741,15.230591754454089,13.42364986412663,15.368393888068027,11.416560328093714,10.125464062690737,11.91827285797477,18.77016580998169,17.869365320888093,14.936905692742757,19.65101621928554,13.490459905484052,16.741895354814602,19.710662120838286,15.967821791044878,15.672610221846188,11.941597216838382,15.24587801644933,16.163537656938487,13.102124860386024,12.73828032466101,16.600946194514623,14.228725122111305,12.99117909307861,17.572803518538297,18.8103060098372,14.922640941497377,16.00030474008829,17.40472517577318,19.698581181260757,10.873282182568524,13.95986682320454,10.601513161031528,18.09153831537291,18.511329662922222,16.35510538360954,11.157194440184078,15.330580534286904,14.042318242367429,16.514123266320876,18.36217407007358,11.249440076469748,15.608982084324996,14.071559343315062,18.346362908477385,19.62066038622554,14.328103079800911,13.011022869557522,16.40319538051639,18.77266274376908,15.732160307615551,15.351401669387899,10.689436914405785,11.591714452659836,17.835383373137763,15.217178152457853,17.347079614711316,19.54920054641331,11.933385569908987,11.48148545118804,10.96286669686474,19.566972990469097,16.914962153016617,11.643127659578703,17.814496120219232,15.639527729008355,19.234054533485118,15.054107449744873,19.387919818725422,17.88432263910603,19.985868817904738,14.973334156377526,16.184844309209574,18.341184088715167,19.62956541908926,13.18652490494247,11.770565784118027,10.719684172726948,18.076769541078644,17.13809986224023,11.711751473309116,10.32572239242883,15.714031937905546,10.36422402408588,10.810337096749478,11.734381999067246,17.798073173848756,12.70725594185902,17.55312454827543,16.50411847718476,19.171741864650855,13.998533069696792,19.249761737428045,12.861465668129117,16.029035502988545,19.901882003467954,19.01478943653184,13.22727033238722,19.59904543126161,14.17828743143838,11.944400681443142,13.805849692861775,14.689601683348886,10.122826680470231,11.604994560438724,16.961347972834837,19.635189455114226,14.647755002781196,14.122950557110546,14.59893294418902,15.761014864442995,17.088056309001836,19.659933146132584,18.334266973765764,14.829330852493447,12.698105638711521,15.84980158808859,12.173317546896525,15.997353515333995,14.63785490360095,17.4268509696227,19.08543824214474,12.501021561250507,18.77349836890241,17.081519276017094,17.715358954978022,10.658560244117911,19.241078827867934,17.777000884074866,14.146167933925241,10.779246383549827,19.71293743317048,10.56178074220031,19.918757684529247,15.45309597121211,15.54502371012234,15.009388155977417,15.380169928933984,16.084398539449502,17.885153938779876,16.855529076456897,10.188353078095053,18.563689393019914,14.397982927147837,13.554233636883101,12.320659216940191,12.435885824397232,11.424197602648913,18.83953805826838,14.571787467249603,13.53460462056335,13.105342744960069,11.280994454435216,17.754362802244934,17.72081931307377,11.670189517579072,10.033189506126108,17.582019548229216,11.161642387796354,15.51749466116631,16.055192730466615,13.709870794422782,16.88200044325569,11.325035263070669,15.195727101214906,16.647259626023175,10.457531843484354,10.79925863364605,10.97232205837593,19.000064844437855,14.324763906305014,15.016935141324794,17.111593373829663,13.926476313178934,11.727309128475781,11.868942096495763,13.016486941093483,14.12478228770463,15.95475949806129,11.009026153280184,15.213304080047719,15.256970622530456,19.121556088122354,18.134648680612067,19.686648878478792,13.971322423725836,10.296826227697133,15.597137468145004,17.37200348449468,18.863005965255297,14.968446754449932,17.06250903310898,12.289794947008051,18.337243965034823,18.037932568315252,11.580151858843855,14.989406293082073,13.314123114164257,16.013769296338722,14.235714249998834,15.842368721972209,17.97834307306841,11.907611364303081,11.67723649093052,15.443297370270852,13.491958045740073,13.900693890100479,17.1679716824012,12.096399698486948,15.197557737508099,10.375285276376099,17.653738416264666,12.14805587391661,16.34703611081929,18.9413703859453,15.53011152395278,17.157572917383263,12.700913666525748,17.860645395524873,18.54813146484246,15.541274543136957,12.657941468135094,14.93023399528412,19.063855685522405,13.607040987367792,10.432352550072483,15.91604813490134,16.216200099122272,19.079235769540766,17.47097732638238,19.558649084404585,16.917142579685034,17.622995964209014,19.49905333804407,14.343466448384321,12.850474954421003,18.830769154472897,16.810731776301452,10.527356340822084,12.43269428538682,13.516151191980882,16.388052421126833,10.123324842495304,13.243171810084869,10.552778562023018,15.144002025420647,18.547727332040544,18.254816521580686,19.572276731963115],"x":[3.7524905236537687,2.555811127651142,1.1977919724688746,2.1552187485744922,3.466570186383342,3.5166758286651287,0.7686211900532858,4.077435451690295,2.28962590045756,0.6474810608770221,1.4164044877703397,2.3592193159100248,0.4090393169157558,0.928290934516065,2.5697642749616154,4.286154286071287,2.453484260989879,3.617565759916207,4.79863142830294,4.412664775448057,3.609840329035997,1.3200802001434075,3.748945027035322,2.44867506158593,2.0071329659438786,2.9710609348803096,0.09239020430087397,2.031382802651266,3.4577606523042914,3.086286925499371,2.92288060140827,1.975440286372263,0.90100550776119,2.911271193893729,0.04049857673926405,1.8384935675959513,4.812764912737504,3.779644850328383,2.658751010148772,0.28020942140978944,2.3504611685428936,1.2686037901424074,2.301901608258279,3.6229953253423473,4.9127917518869815,2.6344010169469745,0.15469252858781313,3.7290442540130107,4.828717416275946,4.062731275139042,4.2853450619679485,3.1906176391471974,0.8102516264659698,4.015976925062969,1.8082598045430998,4.25070999600954,1.9155429359669451,3.7683803950052996,2.3988162825575445,2.0377401795121717,1.9286311855239735,4.9288968280023635,4.464836292924731,2.9681499975360213,0.7933755783011509,0.25417844496697484,0.7990957468080129,4.253509413989862,3.4200170184550527,4.96710897897997,3.1042228890512327,3.7819113347941027,1.2718024716726473,1.7163374247730845,0.6501248716568808,3.175584472837345,4.075595113476061,0.04077111792236909,2.1317920880835004,4.571711885609833,4.122673467933209,3.663387239467145,1.9586735710703629,3.3250467749924164,1.4500925215258287,0.10473182314922891,3.706709644308731,0.4822184469107227,4.983997735157012,3.7915476825245875,2.5552576475770525,3.040797961727,0.748834007552317,4.462332836006264,4.984512852674251,0.18810502544500896,1.3828816005604971,0.6415278097282595,2.4865858240486527,1.9736889970806137,1.4392520670175746,1.881280068425073,2.310201912709199,3.700082360876442,2.8453638630898457,4.238955800687762,2.6719176875485164,0.8404712638235412,3.4083580663053983,2.1125735340547447,4.889341181322946,1.1062114480701657,4.596530569065984,2.7684196912157057,2.687069738328076,3.60390555954218,2.832552373175443,0.7939439935248971,4.805225620022129,1.6389336859549897,0.11921532386684919,0.011946772080511092,2.964758360116023,1.6964247394967369,1.4923763938032586,2.85964238884569,2.4906065362622254,0.8703614911812241,4.947040530394894,1.1995082990223305,0.6860766696349696,0.5600957504168413,3.858124014035076,1.4912905855770775,2.6639536266603114,1.4202596997006445,3.7365262593238002,0.2414087386378272,4.017078999097335,4.036621472011495,2.2812510901677383,4.7358722893464575,2.7047513727391372,3.2678267024506082,1.7802467118186827,0.702625357702984,4.9066007060307015,0.5695766399296831,3.146683946724086,1.4626272574091914,2.78593637248938,1.2564335832215634,3.5308735626346643,4.66457517764727,2.089123552927311,3.9883676113852786,1.2916044981707375,2.207487115883567,2.221881564635196,3.6984170511514334,1.0117615842104544,2.8244058539949135,4.755378081560522,2.4204838349014226,3.447774388327206,2.484553442930797,2.4578563269269726,4.306202699978603,0.47789464031360085,2.4759081445926654,4.969588753293671,2.3653049861594697,1.4353218388451405,0.8732272500969285,2.743840563934996,4.522842644078953,4.3742105601754835,3.452443687765073,3.1956106126505657,0.25624069616803524,2.7783187184683076,1.0518082699897946,0.07620351280333004,2.43026843246795,1.9213518926994422,4.3279191478394,1.1423436278598664,4.709238596190738,0.3653857927179094,4.972718645057733,1.485246049354153,2.714173477575097,1.891420943211396,0.1293604704735718,4.019326596710399,4.26410890479815,1.1608817811639294,0.27503119161369494,2.1437893257921092,3.379394668372493,3.19876240823855,2.2289147383331533,4.4436919010789735,4.773583272030624,3.154561861351266,4.525520844496254,3.3657150198104544,2.0850712044275186,3.839441142970683,1.3073228377926827,2.3384938849906742,2.8310875439046512,0.5776703110764492,2.666600318353054,0.5976597771368553,1.7264266118743388,3.884126761358151,1.2788356693496428,3.7498965512883373,1.6793222718708467,2.2056276768018757,3.4899047257881897,0.2852988129146461,0.10116071000349502,0.2653086386998904,2.6861476771844384,3.392077352577446,1.6566796945222817,2.7981904437275897,2.848975465726543,4.294093676170691,2.086439499129983,4.738898417278463,4.21317473377253,4.366568088968499,1.4982470874983644,4.529799144421446,4.742233381484918,4.1495825935341015,2.9691834043936227,3.41355791267329,2.4599789605347833,1.9776829874526403,0.11830482457876212,3.942508309384003,3.378160988097376,4.513890151922656,1.2171904263451239,3.12791152773068,0.6925056692090636,2.0506643453564943,4.524942767925724,1.1850645690328176,3.1835107409299823,4.939597214669105,1.0696060518778427,2.1202593222358033,1.6406737609871858,1.5908369540798062,3.562608961291742,2.769466173046282,3.3798583311262353,0.4172982520934687,3.541556647420272,3.7918302859582944,1.0641611156340913,4.226919544006126,4.079127021001698,0.3047158525157623,1.0621541511594845,3.146574440197206,0.9579197111141757,4.722414765322038,0.5987214264449248,4.4823883956153034,3.010361951792919,2.877962060736964,1.0333665945034864,0.08538330629318303,1.6278489988985256,4.631026012431154,0.014580093580811582,3.110534209618443,1.2929408853997282,3.335151292499309,4.257734205599844,2.776369650206847,2.0021208253480993,0.5794528873700544,2.5284073627596593,2.336162417475088,4.941632490553424,1.7574484759078501,1.8769364486707718,4.73601593224584,2.024075151978386,4.383159376062946,1.9071796210033254,0.22169932510475276,4.661402411075355,3.474510942161979,2.8071980065955824,3.1969674097927046,2.3953296136193245,1.8323277291745388,1.0563925103779037,4.662470879359062,0.8372592974892978,1.307290680565134,0.5671174253810785,4.595710543994632,0.6633020968810455,3.7764116544853152,1.7532971091223615,0.5184785613205145,3.0943184853591124,1.620208629749721,0.10880249432675626,4.9351686054366155,1.4745202585701667,2.334137582756356,1.5647821720285138,0.9345231099378437,1.0242329806553474,4.758364820072645,1.465370085658887,2.5855868904903065,3.8152793934348117,0.5650381458428455,0.9295247021507147,3.3921756755466714,1.0683012217602084,2.3077538141640996,1.667438853096126,1.462032656850848,3.245965609390269,3.7497653974156977,0.15075898888701977,2.446163990169876,1.492351270495399,0.9544816767284225,4.739229639986035,4.645425937981852,3.704919513309133,2.449453840865937,3.8874305859570524,3.8500359447999175,3.8357209984865657,0.06774129847774812,3.3208012603223036,1.5862268082792441,2.147039393469632,4.608300488398371,0.9747198726628492,4.546067922166809,4.8626115108875325,4.511742050927905,0.6394030007879337,4.106931904531787,1.477371263858419,2.205608093673436,3.493475658087526,3.3899764362484985,4.695815550266436,2.279699397793479,4.872368400402656,1.6316180138953962,1.9045479512008578,3.8684693168736315,1.1193148608489312,1.8300652612523072,0.16083909276139785,3.997761849333444,3.7776800340703898,1.8823570614482643,0.6616708064520282,4.292717818359243,2.896953264792803,0.04654332671574779,0.47419396558766147,0.15864855983199755,3.7389609261883305,0.30852116065839263,3.7665642203083127,2.645283899620595,0.6066684090329866,0.43350015802915753,2.1812382182329015,0.44549299542434584,1.60592564807712,4.546860353136429,0.9187194839340107,1.1756983331656168,0.6786721857496703,3.546468478577254,0.23678731710332745,2.5451248404691773,1.0615812015442683,3.737862445030602,2.843119939897881,4.041107218577983,0.6480366919292357,2.2474636745569523,1.7516400611015615,4.454233930228596,4.210439854531539,0.052517830165670354,2.5102616934947433,2.4779148390583403,4.719153505854487,3.479513422309245,3.4735866665847515,4.014161700155919,0.8443425244156844,4.287492219987243,0.9193558032634996,1.3182551709135837,3.9726835619599465,1.8575319797949397,3.281900787498385,3.954736060591213,1.373595734607056,1.880231622331896,2.845145884232748,4.6616735435693055,0.8010855468894851,0.9164081874454055,2.501722812597457,4.537893495434616,4.513738626714726,1.6367600114638836,4.019555891306369,2.273093693070737,3.4056278559638384,2.3318625581227668,0.9842213635732122,4.200777447406836,4.201828432913466,1.9766747832339349,2.098471819684277,2.8256834224703633,3.0214067110659606,2.8123367188576487,4.508872050281632,3.1193123497615414,0.6672784308519752,1.7464271331224257,2.339469382960032,4.164590983289478,1.9316186032416283,4.4031965432756,2.9827075288127936,4.702408543060967,1.058905205015146,3.7670750458802282,4.197609013092562,3.434733379387511,4.154644546787938,0.6019495773257133,3.310647889626579,1.9247167806485521,1.7867322280406872,0.7470057442646805,1.371954260953735,1.8958610201044102,4.732827699077178,4.868167982194085,3.153077890192497,2.2826150180380944,3.4327596782226655,0.7493391914921554,2.7758528084442116,3.217887167017821,4.641086418305119,3.1531344179390155,3.0031908984685973,0.24479935557797927,2.7247221917749265,1.7111442160441903,3.285079018069128,1.2322644652201742,0.8843025740993371,0.13571076793354342,2.1078474317314475,0.3518344249033678,3.555209630050584,0.6311175745497,1.5933469870539796,2.742691103508342,1.7288343426601571,0.7321458418437865,0.07239207314899243,3.257931318838687,4.9709119197130045,2.721464190171793,3.035747596179801,1.993129458531564,2.931412218979964,2.5445638813761127,3.4924740681383337,2.830698686943088,4.810549785796846,2.3118672973564145,3.222556966963892,4.976820449457341,3.230127098239608,3.77458844314277,0.9121471927381775,4.619041096461154,3.910812635859161,2.1027198767951836,2.454458534633365,4.982706397074312,2.2843291626468742,2.80100124789908,2.8762752405686722,4.297988547837706,4.635567316964584,3.971920625942845,1.120358772703387,4.175636035755467,4.075908838889709,4.086685858746307,0.07889281810204651,0.680125898768491,3.0283483236477804,3.231944423878963,4.596702520222719,3.1721922684161163,4.123196447467054,1.8306240047515154,4.218578030329944,1.8123112962811794,4.520554081137424,1.0154279562467983,3.795554346312805,4.637521357775533,1.1097161080353057,4.812876035103172,2.3446854332425557,3.7274525996131134,4.891406200454377,3.5371859796349536,0.9007881568388032,1.6877960547971782,3.8485415824352143,4.231656971668359,3.00001773082493,0.5655289305253197,2.6579862962981817,3.7717034035921437,2.637833525840856,2.272972856624962,3.2276034910176046,1.535432941737206,2.2479834883501604,1.5937251614499504,0.5026472416447569,1.4598777870610191,1.75614999695073,1.7728132288823772,1.671953213281152,0.34913736645822424,1.4782155106350325,1.342120771744637,1.1027490354997027,2.2147661611031633,3.8666066999249393,2.203525998090625,4.3702550342056865,4.1833922487324084,3.7223067708798196,3.267885447964045,3.6440130706796303,1.776803338144478,0.603599099731138,2.1546709565956546,0.5811453343281225,2.6204186296034515,2.142617029774707,2.597190851366115,1.6498498295356656,2.8263966756558045,2.71278891127817,1.1505833824528822,0.5568729043333542,2.2054608951265853,1.7300468805397862,3.0703702498328553,3.8482216333782127,2.922852775065674,0.9672410613731375,4.5935504499271005,3.9198986042179076,2.490001954025992,3.2076550763210268,3.6384583121386216,4.581177665337657,4.771804405516872,0.7921146885257424,2.9103420040101815,1.488835338585981,0.5619443409934188,1.3503790603536237,1.7682958772283819,2.897789423510905,0.025576097438928524,2.1425449689499154,2.089180105649916,0.2179612843262091,0.6631836063873842,2.873181569391826,4.276326958653158,0.7809272580244175,1.6161450680463785,0.3440122707397053,0.6258622786759649,4.042599149383185,0.3953065716843063,1.2292223790093781,4.580760842645947,3.793751926913782,2.182261449767405,4.393988293519005,3.138227576313252,2.9480364154234193,0.8918786615795515,2.60930299577642,1.8547776979688058,2.6306558586764552,2.018302283176898,2.0559176794951686,1.8707638057287224,3.476909203335017,0.020415110738234432,2.522691075814041,2.2003082546986352,2.231590377844018,0.5032171795746831,0.26447094153741024,2.3877177248998827,3.448492443882082,1.6785865115118614,2.2887415983191817,1.2908860252955323,3.0493738053596573,4.771079602549822,3.6728203735694165,2.696910073898995,4.620573349947089,3.0828780152860147,0.7959997360139648,0.7020234540653036,3.0215684172831345,2.463847146899061,0.5666682410527724,4.044492223573818,2.583168473505749,1.2784990649142436,4.634067845636858,3.037176170275787,1.4035597851816428,0.8301223625108733,1.0084062411884664,4.289953849912614,2.8073731065165997,4.729933793972812,0.5538625974633271,0.49325569924334567,2.947901718011904,4.346720593918408,1.2320689521399664,0.9479718497488343,2.1603343218319324,4.34837381437834,4.858944859346938,4.787109097012548,4.54436893226398,1.5409406512780244,3.2161852116998855,4.145129660159114,3.891149455788112,1.3503099282053088,0.40765953253579346,2.458631636239664,3.296877664563408,2.1628733998709784,4.519560514898102,4.208553992227734,2.0698582794930487,1.8637909810416842,0.25874342129899586,0.17113606177291962,2.5642434833920094,4.5966678894902255,2.5737744827334708,4.92194101685699,2.748660792044626,0.9759166971630895,1.6475640851618456,1.6283300975867487,0.6597751993383649,2.206587206111662,2.4982029106168433,1.3516728089845753,4.826681680589981,1.2864448839562193,2.8858669532441183,2.3449464918917675,0.4365733135969596,3.1779636564814107,2.5122063966599395,4.018505301878539,4.628118009890892,4.028101660034595,2.19797521291715,4.875710638033871,1.5428267455233835,2.3923509458053385,1.1268546863606066,4.91376391754618,3.877459928400453,1.636458563045774,0.7849508290655882,3.239552485557473,1.9723825187989008,0.045167704061751524,2.7549251580392387,2.1851574725238576,1.5685823576157631,2.4149502258479973,0.6357095620270969,3.125585969835919,4.352825667871947,4.530485275918517,0.9975842529193191,2.3410681165501215,1.086896798706537,4.641439823687966,3.1947053509015855,1.0688643964136202,2.451781589186579,4.5864522096366676,0.8454983690325146,4.124638235170882,4.478927390298804,1.169234010124821,2.68207666083672,3.915089170960994,4.325199433190795,3.6930847038045034,3.057521640255997,2.023409209931306,0.462262589530823,4.056370044585517,3.0977279369808617,4.618694966921508,3.5075837191392036,0.060004231125935226,2.6770017302753812,2.80528081161124,4.105432913137506,4.342099160149678,0.267960435826875,1.011796026999836,1.5267969371345735,3.6447317515184996,2.062288307240363,1.6980475792610272,3.527998081815076,2.8270218477600495,3.1663965800100558,0.9844226663516986,3.581653712436945,2.2533768487919525,2.1517639449592285,3.0335503612661565,1.8444991133371458,1.9540138593826806,3.572807008155178,4.134322191468921,3.855964861590749,2.7175036715086263,2.552209411272269,3.979432504834252,2.592587623066376,4.779690116532272,2.2432326290761964,1.7392475272383567,2.5434984813653494,0.7394519016797974,0.648700753160244,4.957020112391303,4.127478862038503,2.4225165538293734,4.106318616775435,0.7798879694111316,0.42839020837457387,4.847263909945861,2.6980505662019407,1.9206884251743628,3.8218245202717616,3.3615795459867357,1.133223394263474,0.3414557176479571,3.2935561657097745,4.930221834888739,4.369999291810123,0.42659148479678,0.5517020111072546,1.548954488312293,1.938354189707876,1.7948485767544753,2.1914882815784456,4.381324484378095,4.284897534488548,0.16900015830203396,2.340832687123707,4.21945746367983,1.7221190856752655,3.689840330175571,2.3734584189442067,1.6540958856018873,3.4312347612675866,4.392917388362241,4.686080877237177,1.0292567245435413,1.9400643879349577,4.20723902303867,4.141985424088737,2.2565274315545034,2.973375142645179,3.3198370851567063,0.2951827027313325,3.2958060553103143,1.4765113594995438,3.1044446996829267,2.2900273804960882,2.1560244560728137,2.188652224199404,4.941964416070769,0.530368842822766,2.045163224688343,3.110471316024457,1.656989171952572,1.834050536151296,2.9336815664807414,3.2513643798808998,1.2621505278051592,0.010329799578630006,0.2995556206511052,4.5976420566995895,1.8990674750320635,3.006585489873408,2.554856639760612,1.0885061006697083,3.2183175773046493,1.9673729980023325,2.5612759043371733,1.6537047762121126,3.6633963411633044,3.2830489390380926,0.8181201946457817,3.932144035035714,1.388929701664775,2.9527749253067794,3.915668244952281,4.829783289460648,1.7454842618975819,2.840414206895,4.038278043247442,4.920401913652101,3.9747069429904314,1.4241256662489898,4.098002532202959,4.872549339230535,3.3141353798523534,4.444642045257915,0.850384159798584,3.210929361165044,1.369115225539177,2.1482213745741108,1.6025505047439925,1.70756352614579,3.6992109907052226,4.161501008667972,1.977311732213387,0.8057833584668728,0.9529906563612467,4.111622056700855,1.5051898553017395,0.1270427620740644,0.5994489719607066,4.987161724560172,4.882707686452235,1.35645931783955,3.569985614911281,2.1082658922273847,0.7477426867192627,0.5980179287195297,2.972690375601413,4.371760017266998,2.1736783343510524,4.254709001412854,3.3502745363206077,0.7400093464401813,3.8536856630285876,3.511281055572865,4.709428931547093,3.603847721738236,2.1520549166053717,1.5504840724377023,0.7351598864766418,2.497815225876386,3.6852123035734676,4.342465670664656,3.9908064734816815,4.256583077167441,4.517304555268382,4.769642583746496,0.48138668093040016,4.583542368312054,1.0232109903563624,4.163266463572322,1.5430270307694527,3.3173805812077384,1.8879262252060203,3.3355408084022367,1.8364071014152628,2.0433931443771702,2.6690166657548153,2.98654556881919,1.2748769788340586,2.226142885949509,0.07815711821698379,0.8103519813288862,4.807190977209266,4.7836966861505825,2.6535132480793577,3.933722953302178,4.89329499171442,3.0902758374566277,1.0378667608556924,4.796936010972398,3.15226834474843,2.2182930735912363,0.4920258958793744,3.8897302754072483,2.127875704167664,4.67592740793659,2.1287131936380534,3.038611153979325,3.7751985290383416,0.4096682596223522,1.4779941922371753,0.802999550151634,3.2840878613204048,1.6486688815394412,0.9867936776217134,3.419681930216416,3.2884515540709023,2.8097640763964318,1.0156605789287365,0.6554055522146629,2.2385791879862516,3.589346747756408,0.7331693891368429,2.4697270745291586,4.888523677630729,4.046421533612517,0.2390140536166785,3.97768671908852,1.9581721538388186,4.602888488666684,1.3600763915327285,1.1595654571713687,3.131287218849601,4.87548229981871,0.670063112302115,2.3583981323395733,2.281673819148863,1.9681317332321846,1.7378453109429515,4.075834975359629,1.460721426434064,1.692092156458379,0.4404306939182401,2.968142286991786,1.9176723771520743,3.616389935629835,3.417544628415375,2.181851724538555,1.5082647510984437,0.5783639292068976,3.780788218238137,3.2511426901357634,3.8323162678206457,1.7465945007037709,1.992790162234449,2.1130737174752836],"beta":[5.218438151605769,5.82120965472408,2.2647389812541263,0.6479316276270253,5.061482075975263,0.1418540553816361,5.251002325816976,9.827091789777143,0.5826252385593156,4.653880099391012,4.96217032524928,5.902252321553963,3.9824935484516466,1.2463689995197913,4.949675059474908,7.666050867571252,3.1696145862593283,3.007193671484092,1.8865697115135815,4.366977426478904,8.530555757161206,0.9624875706130753,5.711806794736685,3.18421090739599,6.603541058709657,7.130003477103395,1.718437765243217,9.244023412513858,4.382588917669786,7.640302687633394,1.4861834550282937,0.7628435474326811,3.9124675551021193,2.5288919861893544,2.1927104487189264,5.351219040297444,3.8809189513620512,5.902753623289798,1.8847184912861592,5.78014706180193,0.6718540919494442,6.070313428079606,0.8271002295791541,6.757743958083067,2.842283390936322,3.2740009510568924,0.7466051143115005,7.913044188337284,5.627220773967667,1.0440957885360502,5.716921847098422,9.121660717365206,2.8357178230969815,8.99880226083248,2.454780409541093,6.361680781645971,9.125178420492794,0.6177234180491342,7.830077036603697,9.515746371393845,6.25234752501119,9.035012187615063,3.552998413734436,1.1967191931852494,0.4806419647773086,2.730656379840428,3.8376695968737073,2.0622393882105805,2.0512911181566773,5.109457668656752,1.97984383678677,0.9749288471484197,7.410770501455208,3.172732145524979,8.83445431195478,4.300958273527382,5.28658838981168,8.023997182147458,1.028376211436972,7.0408415127284485,3.1116932396431785,1.4340172026862685,1.2073874108169225,9.568294723071789,6.058704692790437,2.370822228085565,2.057505211330124,8.581798250270179,4.090755551771387,2.877186996075052,1.3506045410734857,1.7497901684117911,1.9735004402868572,3.3790073856779923,4.648642448591442,6.798879168257194,9.182159018934525,7.653281298894495,4.445213014344819,5.274269601609141,7.676606697127609,2.409402978735047,5.408721732449968,9.769213893261295,8.046557710519384,7.648607402039882,3.635041248053774,5.6292787306206815,8.92709772186703,4.796242066933429,5.333762063853387,1.7124937177806832,4.022718840526243,1.4932993072910805,3.5478246885389075,3.212367498491464,3.8503556902769964,3.0528076780960944,6.667399210253214,0.6845961603054862,2.9023838879544472,1.5610935918964164,9.33870756720209,3.2590840051149517,6.423084843442872,3.941960401476998,9.875176288230449,6.394976998112458,6.267488606570439,7.2551267794783,1.4022082699384275,1.6807053507215208,6.512329713795941,6.987057448236296,2.8811796597213313,9.9856941163642,4.408542876012991,6.018134247415443,5.1449981880948625,3.617821781112589,1.4980791473738186,8.262359550334628,8.943820000544909,8.119055879438715,1.586422947176691,3.077310234383599,7.237929960326863,5.427551161318453,3.2251395065659327,8.16484278810129,6.564452413205637,9.2240184615374,1.8152664752657355,1.449826567860466,5.205452266819286,7.741955091199644,8.068969436678419,0.8987393348794348,5.565751050477294,0.12471800162866087,4.542546560504245,6.501837943252364,3.5024463021542473,5.683813547881162,5.919036234714222,2.9976435097366028,0.45080106911963513,3.6644254088134254,9.05494210330217,0.9158947225794867,6.850624431172001,1.0787679442088383,3.7439155029409776,8.403995421338726,2.245031182173962,9.901643091247882,8.77720238277847,0.17360698481935444,5.983712624908348,2.2732065788678013,5.5569151207246525,1.5379931186644202,7.839045963193727,2.7091859574137755,5.225815269028391,4.590863517458297,3.494777409504637,9.085344739739586,2.088445320368386,3.1650833804553735,2.7540367769753216,3.780782680499992,1.3490514991715896,1.5527715768196515,5.205110310131311,2.6003135314693404,8.621344259596784,4.087539723451032,7.9649890367907705,4.252570612171569,0.39589238997211673,8.801586652497717,7.086086618097928,7.709315831256323,8.050523995809842,5.801317861703714,3.463089457333217,8.131172294878969,1.6040308732646968,5.025521075021604,3.3743922796710235,1.2763674084026122,3.971170112471747,4.652873663866897,7.847401399233216,6.277989172198688,1.997318442800191,4.268097886237334,7.50202512859609,0.2300544262366655,2.6374116452500562,8.265225707000273,5.908930436089966,2.222865225606565,9.26095087449266,6.149748787124032,7.647936643708877,6.245986274394319,4.68982942171571,7.293256207759833,6.706935056684456,5.358414310511104,0.6830309398856249,3.9778574401684574,1.1786869600358707,0.03646092299344428,1.6371503738862048,5.935648029806817,9.383540948465875,3.637045991091259,5.812896323921073,3.680005722919455,3.0962271286822207,2.1699796171653496,6.810732431356108,7.236053969615193,3.2946127501730715,0.26342754280530567,4.783298568330259,2.3667524012790264,2.9342808314465296,7.1659477173819885,6.536704739476291,5.3530570976135605,9.92106807545651,8.234449978631757,9.159438604700231,4.436721432205593,7.13308281889133,7.500566422023873,0.692766539606009,8.400381159122253,3.435045505206713,0.4270824182210631,0.8483317584221939,3.763681940674777,6.501162643490148,2.83048103310233,0.1057858101883391,7.232260419877448,0.7675277166371774,4.651783533278873,3.994449712356556,7.124141008337572,5.655120791390356,9.506323498350895,7.885972463913076,2.867891062589314,9.049916233566208,9.949677465268412,7.830344328831529,4.9765170446307305,8.990886875886599,5.361427190391135,0.45324908643710415,0.7926275716848274,4.772864145649693,9.184499213888767,6.892211585955028,9.299265067737203,6.401566788642928,8.478416102918105,3.31800505713175,6.388182521284483,0.17871431768036183,7.389375151907691,0.6554272785281046,2.2534026986037747,8.7468777324226,5.171653368510201,6.167833053639795,2.99595319999191,5.255043190489468,3.2230467586300415,8.775794074806196,2.9017621880300126,1.726213844823239,8.483606365027743,9.294494797101791,2.114245668821788,3.34770949850707,2.8925944319003305,7.6894798303097955,2.0733765048793207,6.091041298005835,5.451881329707524,5.052196375135272,5.536439158200603,5.808072431306675,8.699765294780375,4.764449772551352,3.747888976515763,5.055682623400656,8.867647157702432,0.6923770438907684,4.769134691143561,7.485495232585366,7.625064799048671,8.655734838433794,7.1185059338841805,3.5212334611960627,9.596953049148949,2.8120946797703605,5.3113786248560295,8.314651437239263,6.416483114140923,4.042055493564096,0.992281451950543,3.0994547882707746,1.831401327768829,3.942689072104326,6.299584678996435,8.98105043442039,8.836151107565254,8.53473501999556,8.233377613050553,8.801849386497938,8.570884416378187,2.028209579246325,0.38694446234682767,2.8467537792875874,1.2627966333529406,8.767752217372253,2.234820259118835,7.661843124660075,1.6376440615149956,9.57372880629716,4.460500154182656,8.101374919290121,8.352660860434405,4.079076194407221,3.0149026795089884,0.6951890510691894,1.7853668564337477,8.853635660119977,5.005904485751945,3.734053458253177,3.838359518915293,6.574087161474749,9.940494267245848,0.6996252395742308,2.726013823788467,4.561602222712069,1.6885997448729118,8.028271133491817,0.7534331503786329,8.728635546265604,2.887394762666158,9.752486430691278,6.9203443937373565,8.940944971888376,4.800450215728556,1.254697059905996,1.7605683442175168,6.869402802349103,8.384356510485457,1.45034263383518,7.359620342183826,2.749208570321604,4.579012667168707,5.792221561422459,2.887715460961382,2.660667459706174,6.581033609853442,0.4783616858127204,3.9700490300099167,6.91236217947665,0.9283904446534508,9.591441003726633,4.459575992661571,8.368558548011073,9.766212394139844,2.568199956212185,1.357239724519821,1.7013796986677798,9.96481296017581,0.6411920579525932,6.119585540094645,5.1451043187374035,7.886792737395618,5.45324775818518,7.013043477016582,7.991815234400013,9.526494890794115,7.775666604998759,5.898615579291975,9.54372100204585,3.328305067675763,5.472860399020827,1.380099665793959,5.4809580389331565,3.3845193328010392,0.21087948432203518,1.6330159983422576,2.1732988550123933,3.298602729765354,2.1571202321050897,5.244166345219017,1.5080124859992505,6.313335129848223,5.670243874105447,2.8833440075088235,5.9620308520466425,3.9167817406062166,8.671054629889113,4.596218566347947,0.9339139241105943,9.767780347961786,1.2602633779073313,5.815597800421745,2.2702320993942138,1.7038005487609764,9.898298507726672,7.315451212897772,6.578387484732239,2.1957899076448095,9.441384866246702,2.7618225719504252,7.84248905384964,5.896901070998579,8.137750153563793,6.07227110795173,2.8026016861094294,7.325599927604866,4.173095197754724,1.6986837496812934,2.835159560156988,9.381417836798287,6.269078703076816,7.068800589735047,3.054867629782354,7.7743090651403035,6.951213088715191,7.546521145508538,1.2448478368191762,6.274565219192752,7.110777317477062,3.320527944489484,2.307074186836653,9.314942686671838,2.8363897573960117,4.02159015242213,0.8179715294706869,8.238280621909041,5.631845344609454,1.5971190512047118,9.857066916969648,8.5498155814319,8.618067366238513,3.271620249458449,7.803940427302704,0.8106087004240736,7.560646000946689,9.00380933329533,2.650023858188768,2.2203451290220833,7.27434807772436,4.12127671899325,2.768626380793977,2.299876352044943,3.166724243526844,9.892863206569691,4.467521385468569,6.846033385165469,8.821914575820776,6.337117451943975,4.032872345010721,8.273789417350967,8.630045912075914,6.9383109468973565,8.560238650811979,0.9301120740162472,5.917344838102765,1.6527602424652943,4.592383246523828,4.922497618993837,9.411508020425492,0.2142531438511952,8.580504415614953,6.32682808131192,6.680201679809709,2.1353397262059137,7.802386264671199,5.7346002237403155,4.1500483336219745,3.8045624404785716,3.7629508502956677,7.6889385516257835,0.3341319822544464,5.153488308792493,2.523929268565601,1.4796092568149954,7.709534906905143,6.540590135081987,1.932145374972114,2.0318989784433494,1.4862808011434625,9.758709314352568,9.847899895688636,5.054696588851819,7.244019342340691,0.04051553403285224,3.112563577451093,0.595911614338922,8.591582122533923,7.321935419710865,1.0013645695222961,2.009877576394654,5.4641421003204815,2.412025059816345,1.1876451556168788,7.4612668447128065,4.743726153032037,9.807133099885965,9.9925552929298,9.292289696801125,1.408937927913081,4.49504937387633,9.796812310735062,1.115740492846422,3.175378957087518,8.976677812579704,3.2674596834085667,8.017456987313583,5.370559703337814,4.816064651337772,5.663059658464055,1.5987408809131987,2.61034196798416,9.446134025972533,0.6900182431684732,5.13512931718491,2.9510172346250685,5.6159978794714105,7.548696538245203,6.073531383253947,6.310675759952645,3.362316276306878,7.866310057094184,5.5641286267048695,7.724455630230908,7.775102687721283,8.370640919104982,6.16591239235648,2.1187319072709165,0.5064756797950332,6.426861140523403,1.395193949132234,2.4830973955751223,6.078885530268893,4.044786142350114,5.937832185583261,3.0467298217691985,1.6296030214683555,2.793662396483463,1.5791524996922779,0.2943672007599796,6.0778003872629345,8.286089394054647,5.325338681112319,2.5017707500089625,5.40418485168034,5.194746719409624,4.401986033262841,8.935240329882317,5.090753989783283,0.43585375206379284,0.007578487238277809,8.497651535347853,8.912783699173945,7.476705765581746,6.0606953180563465,5.657626459357859,7.091291884466438,5.950899398039018,0.21157371254756807,0.8113815727062557,3.0129918659586474,7.545274644358768,4.952915257989289,8.791228048823465,7.020804600002213,0.5813837768919505,6.023710814802401,2.4967188922953043,0.08901326610063043,6.579510155755921,1.2959811757032713,0.2785504439432107,1.0363215875679943,3.6359040025810674,0.3211787383007647,1.35593595626051,2.96780412366898,7.135385995425027,1.0654180148410197,1.2388392202781917,2.6544571598853905,1.2572426191918895,6.747832710816651,7.163130167006844,4.291855591268603,4.701849962843876,6.366255283257727,4.410403942932819,8.06146937814705,9.937740143680173,6.5186527285646045,7.783394671491988,3.6499485645343532,5.8421025760650735,7.674263167278177,3.0243109230781706,9.295676173692593,0.6942440726898913,0.9686406355451149,7.656069588705341,8.19532039937757,5.416288732713596,7.818544328693768,9.697921511790138,2.3997980617791703,3.5847192483855506,4.1180353428557925,0.27743655948771817,0.5412787252966678,8.090868082427606,1.087452920005525,6.722996849112597,5.065667679221182,8.549236576533449,5.920794652373278,6.362068760022559,0.36022050602645184,8.374894595414474,9.08002051904126,0.4880977934876807,0.7088197431258481,7.535565022874713,4.290395981386168,2.025919658958697,3.635452799019012,7.779824795031445,4.360899703201486,2.0377733247503804,2.7000664711127143,7.236297216458841,9.568660055022232,5.658771648782848,9.824645578746498,9.944001265038448,2.2233300634813458,0.577783255167883,6.0845383769540256,3.810346150042998,6.438225832704541,2.0831584454864127,6.655589826560768,5.749967072054998,8.326884500483995,8.709104405894015,5.63042144747822,4.778119557699327,4.337363719261466,4.909354900092275,7.4514913974785895,0.4238736607734639,5.027487300482707,6.111958666588184,1.0994899347147569,4.704497887682932,6.114518951956107,8.96112224420734,1.1517562863864828,2.2764594873017496,6.449012210194227,2.8317699551182773,7.665560100395846,6.083536174739619,6.675313251227344,5.6260944249125,0.08237822517068061,8.651035294480105,6.990565299160885,4.69934704498576,2.2141868288865463,1.0978933683928083,9.227789859318937,2.637377653928843,3.1391372002361373,0.46485255726608665,6.1170310499952425,7.79591782132226,5.914116857513312,9.699491993319043,0.9413234092010359,3.8606124813042975,0.778756238363465,0.7641952293909915,0.345923596969806,7.721640628635442,7.7728820351436845,4.01464855566497,9.070252500560816,7.807468082420321,9.976761859032075,3.5407540332293386,2.816488101746617,2.4237410458590802,3.6321690366817228,6.672878366807959,4.646243711134934,7.3473660186432,3.288050852618869,5.695912845823439,0.4545400226427754,5.730417308898621,3.9645426965515207,5.648277008126657,0.6030323092917556,0.4106266135036951,7.639839975874228,5.472878203879459,3.550497845877081,8.787003110881457,7.567138300803404,0.37738888446233076,0.6886949537714315,3.8434023902922987,0.6366790267726308,5.9998033634550785,0.524391566241269,6.073854990744689,2.7578880680111673,1.618625787420127,6.483724674536875,4.46509686310505,5.964351483718097,0.7080500069280715,2.9429194212545617,8.438009917629568,9.063651473523871,0.7514919686152854,9.173879743141967,5.140901829424052,1.943583764100969,0.07984737422506161,3.678721503313611,1.7694001976460072,2.7206131079127283,0.8344486903175552,0.8905097967145537,6.948800438030984,0.11923479775119095,7.176741143746101,5.268798551881007,3.6431151025323993,4.5646066695442205,7.010904490068876,8.12372376414731,4.583580958806454,0.8947500370549077,9.493927652738057,8.422670463739275,8.913097418237834,3.8201609152531857,1.6999680685026664,7.080404651630454,8.526898465788982,3.1946938887819742,3.9870686124272248,0.00381279569697357,3.2192919012172783,1.6756471386301164,7.33732572335843,0.1549862736406915,2.6359013280738575,9.398367854007956,4.649788249423958,0.3144750696810372,7.116508341071947,7.017956624194932,6.088161539515284,4.594765596901318,7.820039194707197,7.829933771395576,3.591089980682811,0.3212879723048978,1.708118697086587,2.517641608958978,7.383842413265476,4.245614994532891,2.9738431306195667,9.612446459926359,4.834119736846998,4.124141894829356,7.090072800919054,5.71799439725101,2.130818602014364,2.1106615325946843,4.699334201058861,1.5236604075646776,4.198339769660828,4.428580273615632,3.609894529372961,0.7485710769893195,1.2854771829010425,5.769917771264915,7.403177194612958,5.270888087709304,8.95684742284148,3.8809024086628696,7.95309796395096,2.669293059794682,9.136113763332128,0.19293447624135096,9.199183382284788,9.9363624970191,4.075012430513403,3.1550603848235337,6.06507346017958,5.414082296050551,3.4228821950561072,4.924792080822886,5.109620664167971,2.8747141565417667,7.549105140557943,8.29944315524094,8.888357381022598,3.628818063032546,7.71037202418796,7.590769459287281,9.500138392335739,4.088542377149846,9.22315609587587,1.4553973479384452,2.6819633288976563,9.31512403103458,5.607836901145307,2.598150903516674,1.5687241565501475,3.3294491466921583,4.8710066864781565,3.7866599735123474,4.698048325026242,8.851744691829794,9.962951696061875,6.144117395185392,7.2801732772008565,6.718410890742346,6.571772719823487,5.6704209189082055,3.4654936962365945,7.737551382017678,0.23042804773657277,6.370012760491646,8.094460615218757,7.030949105314905,6.47151872982767,5.792677676882261,0.5523813140457934,3.1797916990697295,3.3033315409484043,0.9346431386641751,3.1302011258645335,5.5668024629416895,2.1656559733780956,0.45698179410891937,4.40247116157058,4.698486767134291,9.026089439488572,9.37684184150587,9.822676663567577,9.87365287798861,4.143981647178212,0.27948472076981146,2.15220044619737,6.374731540472003,5.888538542644744,9.57405039961494,8.721950166645803,5.526929176434276,3.1770047249527322,8.721240966371957,6.761915707772812,1.1348896962587518,7.934893190350774,2.537556421188405,3.1321266710168993,4.137881038762385,0.7963139543639941,9.74556209929698,2.2699655706763977,4.938969729119449,7.819460296688918,5.058132529815813,7.011222899676737,5.479869325103155,7.3094232492896545,5.995446991796269,5.666582838893399,4.287948765732297,9.500815894401416,4.407886730933743,0.6773690041624381,8.659644138496635,0.7281182578152201,2.86948712908893,5.728859810680353,6.758002997514351,7.050452950597368,3.486048775421793,2.2886311979846474,8.311072178769859,0.5223679501709544,8.96620968707757,6.215033561567475,7.578688022176657,9.502142078677602,6.962022604946741,5.111493365151956,7.4279557090044985,2.553273975318393,0.5138066969137789,1.2503931990250772,9.312763720582364,3.1762138627406244,4.459590498058546,4.292558799547481,6.906306168096775,8.017299002980675,7.69955533462795,0.9858507050498844,6.595809700526232,5.410201499361191,2.792154491479173,7.226253630795663,4.236559476619757,9.94342111588094,5.559950080470029,0.07275507141414783,2.466461485758653,1.6667303817331414,8.03307715521177,9.86184873924387,1.2200910115340413,3.84179825595633,9.81327311814532,2.172983020013781,2.3509899247060217,8.29484256715429,7.188494592135335,8.34914812130273,2.8973606917443373,3.2789984650380632,2.730061585291168,0.44522992683069695,0.31271051416761564,1.309533313414295,8.201331030628616,2.207133987823313,5.056025824556496,7.834795628811886,1.6290600322363358,9.285786126361252,1.5520823636398506,0.30751530409490746,3.039051688177934,4.140334024072647,4.355044369318854]}
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
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.5, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.5, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 2.0, 0.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 2.0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 2.0, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha < 0` , the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( -1.0, 0.5 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, 1.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, PINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NaN );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `alpha` equals `0`, the created function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 2.0 );

	y = pdf( -2.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to 0' );

	y = pdf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var pdf;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 170.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large shape parameter `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var pdf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 140.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large rate parameter `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var pdf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 120.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/pdf/test/test.factory.js")
},{"./../lib/factory.js":22,"./fixtures/julia/both_large.json":28,"./fixtures/julia/large_rate.json":29,"./fixtures/julia/large_shape.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-eps":121,"@stdlib/math/constants/float64-ninf":133,"@stdlib/math/constants/float64-pinf":135,"tape":194}],32:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var pdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pdf` functions', function test( t ) {
	t.equal( typeof pdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/pdf/test/test.js")
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
var pdf = require( './../lib' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `alpha < 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `alpha` equals `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = pdf( 0.0, 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to 0' );

	y = pdf( 1.0, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -1.5, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( PINF, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NINF, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NaN, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `alpha` and `beta`', function test( t ) {
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
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 170.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large shape parameter `alpha`', function test( t ) {
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
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 140.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large rate parameter `beta`', function test( t ) {
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
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 120.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/pdf/test/test.pdf.js")
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

},{"@stdlib/math/base/tools/evalpoly":92}],57:[function(require,module,exports){
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
