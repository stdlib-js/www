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

},{"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":84}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":199}],14:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":84}],16:[function(require,module,exports){
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

},{"./is_positive_zero.js":19}],19:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":201}],20:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a binomial distribution with number of trials `n` and success probability `p` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 3.0, 20, 0.2 );
* // returns ~0.411
* @example
* var y = cdf( 21.0, 20, 0.2 );
* // returns 1.0
* @example
* var y = cdf( 5.0, 10, 0.4 );
* // returns ~0.834
* @example
* var y = cdf( 0.0, 10, 0.4 );
* // returns ~0.06
* @example
* var y = cdf( NaN, 20, 0.5 );
* // returns NaN
* @example
* var y = cdf( 0.0, NaN, 0.5 );
* // returns NaN
* @example
* var y = cdf( 0.0, 20, NaN );
* // returns NaN
* @example
* var y = cdf( 2.0, 1.5, 0.5 );
* // returns NaN
* @example
* var y = cdf( 2.0, -2.0, 0.5 );
* // returns NaN
* @example
* var y = cdf( 2.0, 20, -1.0 );
* // returns NaN
* @example
* var y = cdf( 2.0, 20, 1.5 );
* // returns NaN
*/
function cdf( x, n, p ) {
	if (
		isnan( x ) ||
		isnan( n ) ||
		isnan( p ) ||
		p < 0.0 ||
		p > 1.0 ||
		!isNonNegativeInteger( n ) ||
		n === PINF
	) {
		return NaN;
	}
	if ( x < 0.0 ) {
		return 0.0;
	}
	if ( x >= n ) {
		return 1.0;
	}
	x = floor( x + 1.0e-7 );
	return betainc( p, x + 1.0, n - x, true, true );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/special/betainc":56,"@stdlib/math/base/special/floor":84,"@stdlib/math/constants/float64-pinf":201}],21:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a binomial distribution with number of trials `n` and success probability `p`.
*
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {Function} CDF
*
* @example
* var cdf = factory( 10, 0.5 );
* var y = cdf( 3.0 );
* // returns ~0.172
*
* y = cdf( 1.0 );
* // returns ~0.011
*/
function factory( n, p ) {
	if ( isnan( n ) ||
		isnan( p ) ||
		p < 0.0 ||
		p > 1.0 ||
		!isNonNegativeInteger( n ) ||
		n === PINF
	) {
		return nan;
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a binomial distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 ) {
			return 0.0;
		}
		if ( x >= n ) {
			return 1.0;
		}
		// Ensure left-continuity:
		x = floor( x + 1.0e-7 );
		return betainc( p, x + 1.0, n - x, true, true );
	} // end FUNCTION cdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":23,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/special/betainc":56,"@stdlib/math/base/special/floor":84,"@stdlib/math/constants/float64-pinf":201}],22:[function(require,module,exports){
'use strict';

/**
* Binomial distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dist/binomial/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dist/binomial/cdf' );
*
* var y = cdf( 3.0, 20, 0.2 );
* // returns ~0.411
*
* y = cdf( 21.0, 20, 0.2 );
* // returns 1.0
*
* y = cdf( 5.0, 10, 0.4 );
* // returns ~0.834
*
* y = cdf( 0.0, 10, 0.4 );
* // returns ~0.06
*
* @example
* var factory = require( '@stdlib/math/base/dist/binomial/cdf' ).factory;
*
* var cdf = factory( 10, 0.5 );
*
* var y = cdf( 3.0 );
* // returns ~0.172
*
* y = cdf( 1.0 );
* // returns ~0.011
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":20,"./factory.js":21,"@stdlib/utils/define-read-only-property":208}],23:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for an invalid binomial distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = cdf( 1.0 );
* // returns NaN
*/
function cdf() {
	return NaN;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var degenerate = require( '@stdlib/math/base/dist/degenerate/quantile' ).factory;
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var round = require( '@stdlib/math/base/special/round' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var cdf = require( '@stdlib/math/base/dist/binomial/cdf' );
var SQRT2 = require( '@stdlib/math/constants/float64-sqrt-two' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var searchLeft = require( './search_left.js' );
var searchRight = require( './search_right.js' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a binomial distribution with number of trials `n` and success probability `p`.
*
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10, 0.5 );
* var y = quantile( 0.1 );
* // returns 3
*
* y = quantile( 0.9 );
* // returns 7
*/
function factory( n, p ) {
	var sigmaInv;
	var sigma;
	var mu;

	if (
		isnan( n ) ||
		isnan( p ) ||
		!isNonNegativeInteger( n ) ||
		n === PINF ||
		p < 0.0 ||
		p > 1.0
	) {
		return nan;
	}
	if ( p === 0.0 || n === 0.0 ) {
		return degenerate( 0.0 );
	}
	if ( p === 1.0 ) {
		return degenerate( n );
	}
	mu = n * p;
	sigma = sqrt( n * p * ( 1.0-p ) );
	sigmaInv = 1.0 / sigma;
	return quantile;

	/**
	* Evaluates the quantile function for a binomial distribution.
	*
	* @private
	* @param {Probability} r - input value
	* @returns {NonNegativeInteger} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( r ) {
		var guess;
		var corr;
		var x2;
		var x;

		if ( isnan( r ) || r < 0.0 || r > 1.0 ) {
			return NaN;
		}
		if ( r === 0.0 ) {
			return 0;
		}
		if ( r === 1.0 ) {
			return n;
		}
		// Cornish-Fisher expansion:
		if ( r < 0.5 ) {
			x = -erfcinv( 2.0 * r ) * SQRT2;
		} else {
			x = erfcinv( 2.0 * ( 1.0-r ) ) * SQRT2;
		}
		x2 = x * x;

		// Skewness correction:
		corr = x + ( sigmaInv * ( x2-1.0 ) / 6.0 );
		guess = round( mu + (sigma * corr) );
		if ( cdf( guess, n, p ) >= r ) {
			return searchLeft( guess, r, n, p );
		}
		return searchRight( guess, r, n, p );
	} // end FUNCTION quantile()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":26,"./search_left.js":28,"./search_right.js":29,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/dist/binomial/cdf":22,"@stdlib/math/base/dist/degenerate/quantile":38,"@stdlib/math/base/special/erfcinv":74,"@stdlib/math/base/special/round":132,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/constants/float64-pinf":201,"@stdlib/math/constants/float64-sqrt-two":205}],25:[function(require,module,exports){
'use strict';

/**
* Binomial distribution quantile function.
*
* @module @stdlib/math/base/dist/binomial/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/binomial/quantile' );
*
* var y = quantile( 0.4, 20, 0.2 );
* // returns 2
*
* y = quantile( 0.8, 20, 0.2 );
* // returns 5
*
* y = quantile( 0.5, 10, 0.4 );
* // returns 4
*
* @example
* var factory = require( '@stdlib/math/base/dist/binomial/quantile' ).factory;
*
* var quantile = factory( 10, 0.5 );
*
* var y = quantile( 0.1 );
* // returns 3
*
* y = quantile( 0.9 );
* // returns 7
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = require( './quantile.js' );

},{"./factory.js":24,"./quantile.js":27,"@stdlib/utils/define-read-only-property":208}],26:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid binomial distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = quantile( 0.3 );
* // returns NaN
*/
function quantile() {
	return NaN;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{}],27:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var round = require( '@stdlib/math/base/special/round' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var cdf = require( '@stdlib/math/base/dist/binomial/cdf' );
var SQRT2 = require( '@stdlib/math/constants/float64-sqrt-two' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var searchLeft = require( './search_left.js' );
var searchRight = require( './search_right.js' );


// MAIN //

/**
* Evaluates the quantile function for a binomial distribution with number of trials `n` and success probability `p` at a probability `r`.
*
* @param {Probability} r - input value
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p  - success probability
* @returns {NonNegativeInteger} evaluated quantile function
*
* @example
* var y = quantile( 0.4, 20, 0.2 );
* // returns 2
* @example
* var y = quantile( 0.8, 20, 0.2 );
* // returns 5
* @example
* var y = quantile( 0.5, 10, 0.4 );
* // returns 4
* @example
* var y = quantile( 0.0, 10, 0.4 );
* // returns 0
* @example
* var y = quantile( 1.0, 10, 0.4 );
* // returns 10
* @example
* var y = quantile( NaN, 20, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.2, NaN, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.2, 20, NaN );
* // returns NaN
* @example
* var y = quantile( 0.5, 1.5, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.5, -2.0, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.5, 20, -1.0 );
* // returns NaN
* @example
* var y = quantile( 0.5, 20, 1.5 );
* // returns NaN
*/
function quantile( r, n, p ) {
	var sigmaInv;
	var guess;
	var sigma;
	var corr;
	var mu;
	var x2;
	var x;

	if (
		isnan( r ) ||
		isnan( n ) ||
		isnan( p ) ||
		r < 0.0 ||
		r > 1.0 ||
		p < 0.0 ||
		p > 1.0 ||
		!isNonNegativeInteger( n ) ||
		n === PINF
	) {
		return NaN;
	}
	if ( r === 1.0 || p === 1.0 ) {
		return n;
	}
	if ( r === 0.0 || p === 0.0 || n === 0 ) {
		return 0.0;
	}
	// Cornish-Fisher expansion:
	mu = n * p;
	sigma = sqrt( n * p * ( 1.0-p ) );
	sigmaInv = 1.0 / sigma;
	if ( r < 0.5 ) {
		x = -erfcinv( 2.0 * r ) * SQRT2;
	} else {
		x = erfcinv( 2.0 * ( 1.0-r ) ) * SQRT2;
	}
	x2 = x * x;

	// Skewness correction:
	corr = x + ( sigmaInv * ( x2-1.0 ) / 6.0 );
	guess = round( mu + (sigma * corr) );
	if ( cdf( guess, n, p ) >= r ) {
		return searchLeft( guess, r, n, p );
	}
	return searchRight( guess, r, n, p );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./search_left.js":28,"./search_right.js":29,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/dist/binomial/cdf":22,"@stdlib/math/base/special/erfcinv":74,"@stdlib/math/base/special/round":132,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/constants/float64-pinf":201,"@stdlib/math/constants/float64-sqrt-two":205}],28:[function(require,module,exports){
'use strict';

// MODULES //

var cdf = require( '@stdlib/math/base/dist/binomial/cdf' );


// MAIN //

/**
* Performs a search to the left.
*
* @private
* @param {NonNegativeInteger} x - starting guess
* @param {Probability} r - probability
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {NonNegativeInteger} `r` quantile of the specified distribution
*/
function searchLeft( x, r, n, p ) {
	while ( x !== 0 && cdf( x-1, n, p) >= r ) {
		x -=1;
	}
	return x;
} // end FUNCTION searchLeft()


// EXPORTS //

module.exports = searchLeft;

},{"@stdlib/math/base/dist/binomial/cdf":22}],29:[function(require,module,exports){
'use strict';

// MODULES //

var cdf = require( '@stdlib/math/base/dist/binomial/cdf' );


// MAIN //

/**
* Performs a search to the right.
*
* @private
* @param {NonNegativeInteger} x - starting guess
* @param {Probability} r - probability
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {NonNegativeInteger} `r` quantile of the specified distribution
*/
function searchRight( x, r, n, p ) {
	x += 1;
	while ( cdf( x, n, p ) < r ) {
		x += 1;
	}
	return x;
} // end FUNCTION searchRight()


// EXPORTS //

module.exports = searchRight;

},{"@stdlib/math/base/dist/binomial/cdf":22}],30:[function(require,module,exports){
module.exports={"expected":[53.0,43.0,17.0,2.0,50.0,74.0,13.0,22.0,44.0,55.0,29.0,70.0,66.0,46.0,59.0,11.0,28.0,22.0,55.0,36.0,36.0,79.0,10.0,27.0,31.0,89.0,77.0,15.0,19.0,78.0,20.0,5.0,55.0,14.0,25.0,50.0,52.0,41.0,8.0,38.0,48.0,25.0,42.0,57.0,61.0,65.0,81.0,17.0,88.0,60.0,30.0,18.0,73.0,56.0,31.0,27.0,55.0,14.0,44.0,60.0,36.0,38.0,0.0,83.0,50.0,60.0,84.0,38.0,10.0,35.0,27.0,15.0,28.0,33.0,20.0,76.0,15.0,22.0,14.0,49.0,64.0,42.0,67.0,36.0,63.0,70.0,0.0,58.0,30.0,13.0,9.0,43.0,60.0,73.0,51.0,11.0,29.0,85.0,99.0,40.0,33.0,24.0,9.0,81.0,28.0,42.0,47.0,53.0,35.0,26.0,30.0,35.0,68.0,93.0,3.0,23.0,52.0,43.0,47.0,64.0,73.0,51.0,26.0,30.0,38.0,71.0,10.0,73.0,72.0,27.0,41.0,39.0,78.0,57.0,27.0,55.0,54.0,9.0,74.0,25.0,81.0,49.0,36.0,48.0,54.0,51.0,20.0,52.0,45.0,74.0,55.0,37.0,53.0,59.0,24.0,64.0,97.0,0.0,37.0,83.0,26.0,54.0,45.0,22.0,32.0,80.0,86.0,50.0,43.0,80.0,15.0,22.0,53.0,41.0,61.0,7.0,74.0,44.0,2.0,39.0,82.0,13.0,59.0,82.0,70.0,42.0,57.0,16.0,7.0,1.0,20.0,6.0,68.0,62.0,7.0,73.0,53.0,69.0,60.0,24.0,60.0,55.0,42.0,62.0,16.0,67.0,60.0,20.0,45.0,82.0,51.0,71.0,41.0,53.0,7.0,21.0,56.0,19.0,96.0,1.0,21.0,43.0,3.0,20.0,66.0,9.0,44.0,94.0,5.0,56.0,23.0,19.0,64.0,40.0,28.0,74.0,76.0,12.0,75.0,6.0,30.0,14.0,64.0,54.0,50.0,72.0,63.0,41.0,40.0,83.0,65.0,58.0,45.0,6.0,76.0,14.0,66.0,14.0,23.0,25.0,80.0,33.0,74.0,25.0,71.0,92.0,56.0,56.0,10.0,40.0,61.0,44.0,44.0,44.0,72.0,63.0,6.0,94.0,81.0,34.0,93.0,54.0,13.0,68.0,23.0,89.0,1.0,27.0,20.0,83.0,55.0,57.0,37.0,64.0,20.0,30.0,44.0,37.0,30.0,16.0,69.0,50.0,14.0,9.0,18.0,43.0,54.0,23.0,80.0,55.0,55.0,42.0,46.0,47.0,81.0,43.0,12.0,29.0,88.0,56.0,31.0,13.0,11.0,53.0,10.0,56.0,37.0,6.0,65.0,14.0,53.0,73.0,18.0,7.0,71.0,21.0,30.0,13.0,16.0,63.0,22.0,62.0,22.0,79.0,73.0,48.0,12.0,72.0,63.0,1.0,40.0,94.0,18.0,44.0,46.0,21.0,69.0,64.0,75.0,3.0,24.0,50.0,40.0,13.0,31.0,74.0,29.0,77.0,16.0,68.0,75.0,59.0,25.0,19.0,28.0,21.0,32.0,44.0,60.0,66.0,69.0,13.0,12.0,44.0,1.0,16.0,89.0,70.0,37.0,10.0,77.0,11.0,45.0,41.0,11.0,0.0,32.0,66.0,85.0,13.0,45.0,61.0,52.0,75.0,75.0,23.0,71.0,3.0,2.0,29.0,50.0,53.0,14.0,53.0,61.0,1.0,94.0,26.0,31.0,26.0,1.0,70.0,3.0,34.0,63.0,43.0,69.0,44.0,62.0,20.0,73.0,15.0,36.0,50.0,64.0,40.0,43.0,38.0,80.0,11.0,12.0,62.0,13.0,9.0,35.0,44.0,5.0,38.0,84.0,24.0,64.0,6.0,58.0,45.0,57.0,5.0,51.0,4.0,80.0,77.0,36.0,8.0,88.0,61.0,89.0,63.0,50.0,67.0,66.0,10.0,71.0,1.0,65.0,26.0,45.0,18.0,24.0,24.0,33.0,11.0,72.0,35.0,82.0,16.0,82.0,59.0,74.0,16.0,74.0,23.0,27.0,27.0,75.0,32.0,73.0,59.0,67.0,69.0,76.0,19.0,63.0,33.0,14.0,47.0,18.0,85.0,8.0,12.0,31.0,6.0,59.0,50.0,40.0,54.0,80.0,19.0,62.0,61.0,47.0,60.0,74.0,5.0,27.0,31.0,31.0,61.0,81.0,60.0,63.0,21.0,72.0,55.0,17.0,54.0,60.0,57.0,46.0,50.0,16.0,24.0,66.0,9.0,84.0,71.0,3.0,26.0,8.0,13.0,47.0,70.0,62.0,42.0,21.0,83.0,63.0,50.0,14.0,56.0,85.0,90.0,36.0,34.0,91.0,26.0,19.0,86.0,31.0,92.0,67.0,8.0,80.0,6.0,22.0,42.0,52.0,2.0,76.0,19.0,85.0,6.0,92.0,12.0,36.0,67.0,45.0,40.0,34.0,65.0,69.0,46.0,13.0,74.0,11.0,23.0,12.0,70.0,25.0,46.0,20.0,52.0,81.0,10.0,35.0,82.0,74.0,53.0,36.0,88.0,68.0,6.0,37.0,72.0,72.0,5.0,54.0,73.0,17.0,30.0,92.0,80.0,20.0,44.0,85.0,41.0,50.0,12.0,18.0,80.0,72.0,36.0,37.0,7.0,74.0,44.0,61.0,27.0,9.0,18.0,47.0,77.0,84.0,76.0,91.0,74.0,4.0,12.0,22.0,25.0,0.0,11.0,79.0,67.0,77.0,84.0,55.0,34.0,30.0,19.0,45.0,32.0,52.0,8.0,76.0,85.0,75.0,75.0,77.0,22.0,4.0,76.0,31.0,43.0,39.0,78.0,19.0,0.0,45.0,14.0,52.0,2.0,10.0,32.0,25.0,47.0,3.0,69.0,37.0,4.0,24.0,38.0,25.0,81.0,37.0,62.0,40.0,49.0,12.0,86.0,67.0,16.0,67.0,70.0,5.0,49.0,11.0,30.0,12.0,79.0,37.0,94.0,75.0,42.0,33.0,75.0,54.0,11.0,73.0,43.0,4.0,89.0,71.0,24.0,49.0,86.0,98.0,89.0,14.0,16.0,76.0,12.0,8.0,65.0,62.0,38.0,27.0,67.0,19.0,47.0,53.0,67.0,78.0,74.0,58.0,28.0,19.0,6.0,8.0,26.0,28.0,50.0,37.0,63.0,36.0,43.0,76.0,48.0,39.0,17.0,64.0,56.0,35.0,80.0,18.0,5.0,48.0,89.0,54.0,54.0,33.0,71.0,7.0,23.0,24.0,49.0,13.0,55.0,8.0,57.0,61.0,36.0,65.0,57.0,28.0,27.0,43.0,51.0,41.0,24.0,9.0,11.0,45.0,83.0,11.0,55.0,38.0,45.0,26.0,23.0,12.0,26.0,5.0,61.0,36.0,45.0,61.0,76.0,52.0,59.0,26.0,11.0,93.0,65.0,18.0,67.0,59.0,76.0,55.0,55.0,55.0,63.0,29.0,18.0,84.0,55.0,66.0,74.0,7.0,40.0,67.0,41.0,63.0,55.0,20.0,4.0,59.0,58.0,89.0,18.0,21.0,2.0,30.0,74.0,86.0,70.0,17.0,68.0,14.0,46.0,38.0,42.0,81.0,72.0,38.0,13.0,7.0,56.0,14.0,68.0,11.0,78.0,95.0,58.0,62.0,0.0,31.0,43.0,1.0,15.0,42.0,12.0,2.0,48.0,25.0,9.0,8.0,93.0,21.0,73.0,79.0,7.0,37.0,61.0,19.0,61.0,30.0,36.0,20.0,74.0,70.0,53.0,26.0,56.0,78.0,23.0,12.0,42.0,77.0,16.0,69.0,89.0,27.0,40.0,83.0,63.0,62.0,58.0,29.0,20.0,65.0,65.0,78.0,32.0,55.0,42.0,29.0,70.0,35.0,6.0,70.0,2.0,65.0,11.0,18.0,22.0,9.0,45.0,9.0,66.0,31.0,47.0,36.0,26.0,76.0,58.0,41.0,68.0,20.0,12.0,5.0,63.0,71.0,82.0,32.0,51.0,42.0,30.0,74.0,11.0,75.0,6.0,2.0,34.0,19.0,60.0,11.0,27.0,62.0,1.0,45.0,41.0,59.0,9.0,25.0,22.0,63.0,16.0,9.0,49.0,91.0,76.0,80.0,62.0,65.0,28.0,13.0,52.0,21.0,95.0,71.0,39.0,70.0,9.0,48.0,87.0,18.0,72.0,35.0,63.0,89.0,21.0,52.0,47.0,2.0,41.0,36.0,36.0,93.0,40.0,6.0,2.0],"r":[0.7502727152677233,0.42677736051254556,0.4056728412604358,0.06671567020913138,0.8814688909288475,0.38620641915945786,0.09316125953382204,0.07351926044697943,0.16466706967211797,0.9913579388204796,0.7516550242015927,0.012504236072065522,0.023688094941793247,0.27470973569742463,0.7714930225621526,0.43203772268475826,0.7760505744554651,0.32191058197787403,0.08412623402128516,0.43479306061705136,0.3497058502696655,0.19690445434448267,0.65384518316261,0.783274980738667,0.7095609989276705,0.2964059903272622,0.03731090644416435,0.9331034986833076,0.021649709629495195,0.7230454763497165,0.8096572614255477,0.9496098076325692,0.6137240505318697,0.4555411191677712,0.10270664046433198,0.015318023090231891,0.28426986886174466,0.2548724139568541,0.029385776010757425,0.7357305594740218,0.7320825824004571,0.8249187174071371,0.28371630472328935,0.7577283711888141,0.9466987907264965,0.6571958685104844,0.8780977736172693,0.38362784918132875,0.08812026990492705,0.13005301278427073,0.08051847770949316,0.41387142653708775,0.14780616053950646,0.25170574965148096,0.871360767189542,0.3935017407612329,0.5316778268153359,0.6881538610615783,0.9302925336549559,0.470042488793986,0.08953989494198256,0.6783735665179755,0.4164594532703152,0.7161538476090334,0.7668753687191403,0.8049611252345428,0.21841437649012674,0.07054694618483803,0.07357704778642571,0.5393133959012615,0.8648031993000345,0.6443561012334249,0.13765411036066055,0.03597520740531368,0.8083518225287749,0.5730425138968165,0.1302004305117983,0.14519089341734337,0.7903451309202942,0.7672470283492145,0.728446238224145,0.9586685939390842,0.5159626875812962,0.5821963343614187,0.8152175414633289,0.3714354397158999,0.27075853970135655,0.8744430718723155,0.676788578719234,0.25911654273016516,0.4575221219162515,0.7066609322026407,0.13018004917054116,0.5419306757229276,0.3850794293955706,0.673071527731778,0.9959158580949488,0.8580803709578972,0.7776054894616453,0.8342428798845452,0.319918370452946,0.20116925578824407,0.5201684492896697,0.08267084517819168,0.05798290386773841,0.3659187752889683,0.4886809383212165,0.13588920380911107,0.44791026803289324,0.022606976492132835,0.7952547996863251,0.4324564594656126,0.20277088058652204,0.9534493981101546,0.5067170153589318,0.40337997362205136,0.23593098351615494,0.009789652674892402,0.8015656939278646,0.006774657250952387,0.9956518590619017,0.38567495497316884,0.24121488552854875,0.3791728822121252,0.28599177789522834,0.14670031292547003,0.7639541399985776,0.34575834320175836,0.22875728730715594,0.5576909760269131,0.9989615258390492,0.8675791140292097,0.253723516847596,0.680400340743402,0.4254294037339068,0.9909840435773714,0.38619224216321113,0.6562373708007894,0.8085825594672162,0.45115185915479006,0.5730754771308297,0.41844301625281743,0.2510078141823566,0.19798966363671044,0.912780429240672,0.9204052161447873,0.23427592436538425,0.14429771606843245,0.6025733158980306,0.395768923638828,0.04620509222944835,0.48162674687060414,0.1921823278976975,0.9163363476067266,0.40303782614864914,0.8621791736909479,0.74250870018656,0.5695422297225285,0.2737856619991865,0.39342174903950333,0.024713462015287346,0.1272209864956706,0.37213930185232735,0.4034773833218115,0.9241676292751071,0.779988994238425,0.8911170948905349,0.7525667958512587,0.3082900592822395,0.6734868957087032,0.21280459640486504,0.29479372649470936,0.7625839253933462,0.8993749862569327,0.15885791376073755,0.1469903905308414,0.8416730275761342,0.18824993222997888,0.45233099803943055,0.04464158961361431,0.8793681321989881,0.34604133926026837,0.342916247274174,0.44937712920018824,0.13438232168581044,0.5424046750043039,0.03511578625426126,0.3118200543909444,0.8265959798732951,0.3966954137188028,0.6675671265364986,0.9478867466770344,0.9809792714930503,0.7649019145408047,0.5605634470035361,0.5907090462478195,0.20162437962374802,0.11815592439134237,0.06564382504718846,0.050112512394532516,0.3828844026307723,0.5953437110385151,0.16155269650200488,0.41110388597579495,0.0036191750970260284,0.9349464941985814,0.6873969542482012,0.16142579340038088,0.4714827354095439,0.8082696368702378,0.37608769415387533,0.20988346660451906,0.6805754835084799,0.02269532540621233,0.3470719867436385,0.9487329521995671,0.8163510877609064,0.6905419612259334,0.12115321424424241,0.143169897396058,0.04858464141083729,0.49493264795581693,0.7284170588395342,0.29044492968321145,0.397251024526839,0.7790786697169201,0.5760188989819821,0.46958029315178473,0.24358008890021332,0.4377212034295681,0.21949771777057192,0.11706501453388318,0.2305908332931017,0.5029934508333531,0.6926540141438284,0.5994746649329821,0.6290826897066812,0.41833753379535876,0.7774414215210546,0.2890362789256862,0.15261033302519045,0.3492064526250378,0.616396551355584,0.33171191822196255,0.16831272164278466,0.02232558863535239,0.3344639854956546,0.05442066918493693,0.08938659920661607,0.9672368215109224,0.6842575336314749,0.3706619198609671,0.26367358811280295,0.004966292832044639,0.7115440337051093,0.45247234704385275,0.6075742206990895,0.571964847040783,0.8365221874999289,0.7884788692233649,0.931514391571344,0.927567934609173,0.17430383254770065,0.609921802364257,0.680713328402796,0.7694271266582415,0.8681651142587574,0.2571980087598118,0.16339163072884277,0.2907469548266941,0.3137200680050294,0.07043220532678873,0.3741223170994956,0.42988787849251286,0.9977199985278395,0.6758152548490957,0.2339611743975396,0.03799651099058221,0.5479162383689657,0.4113998363422049,0.3901847262908429,0.5222424073707699,0.593329846099347,0.3558151581873028,0.13114358649281366,0.26464319869326247,0.12920306911679935,0.5254666913640269,0.9379808628019499,0.2954332335359058,0.48451746067036194,0.9793997081701873,0.9275672192549891,0.9436498818093386,0.16843611135800485,0.5231705628421253,0.22012181241429318,0.14030132633390857,0.08013489244803473,0.5605462862680364,0.596227652262213,0.22973193393291313,0.5492755850845521,0.09327550142621455,0.2970033703794259,0.08405326061600604,0.3253635712267131,0.3790723487802672,0.25917795061827276,0.23548198682123522,0.06244921226673439,0.366053202005697,0.17897275285242897,0.04491913614467813,0.9265237367519856,0.5977863020942655,0.9200863641271184,0.3322964550514478,0.810420341211211,0.8463985218459791,0.0345590520752741,0.26970138114873343,0.21582490749752004,0.23891470455214492,0.04587555935168863,0.42899066128476204,0.03663960441063274,0.4564109735267232,0.7949425851500378,0.6378257275084027,0.8960901301969495,0.7676457187310537,0.6628019617932452,0.8531439196959039,0.06008843664363628,0.19685521822132457,0.5594605337928766,0.5402426427495648,0.46251470731700284,0.765711552691037,0.6355667135746739,0.289917438903039,0.49976284363508827,0.9545485108371676,0.9310279199211575,0.512248338826635,0.1559880815324426,0.45634709621902547,0.5114108585237116,0.4857934095375358,0.07579466617321962,0.30320217821952933,0.525364740426608,0.5663648180140322,0.23859372510742216,0.046126921269173504,0.10015811313550826,0.8454217862389932,0.6051473005349484,0.36763515054583173,0.600276926161269,0.1547229705471942,0.9559731953254507,0.6790576005912758,0.5209335734784857,0.6406835800573294,0.48032748698265526,0.8017130322955439,0.3448218709383686,0.6780101552724722,0.09173090511185222,0.23125119733000998,0.1751112018321308,0.17320961830934722,0.2214931726416811,0.1528116184346222,0.7805519296792485,0.23315196636834146,0.5115317946258391,0.7128725237787619,0.43859097118797385,0.760897458488478,0.7088086985851298,0.20583888250431537,0.3498041200033799,0.3540177679339753,0.6964717155037634,0.38648360009038596,0.5961467764542476,0.0593071053651657,0.8289291726115564,0.9355133701280234,0.5701190019996012,0.6080409467299193,0.7453099637483054,0.884736186528039,0.4186679968019478,0.3782507826625765,0.4140854258181781,0.02983307569238236,0.14991805835084016,0.7882529331392161,0.5326332476554934,0.5283680848011583,0.2382228721067985,0.8554410823477576,0.5201113759439406,0.8459945850247628,0.9162960833258993,0.724952308473843,0.6389715738524191,0.15300733245951714,0.23829355937071117,0.5818342843989346,0.5808781327770685,0.4102736276060428,0.5900732517975693,0.4893383021667954,0.5338493770891741,0.15636960516483578,0.7061231369259509,0.11141740751865736,0.4652338534463498,0.8116132358641992,0.15342224524497317,0.016464917506993304,0.7053315415663184,0.9020723381728419,0.5495522927039844,0.18951378964352816,0.46135369683134386,0.1303834752905828,0.8280967210574177,0.6332322396534269,0.32479060644034474,0.13638888377474379,0.5945803098397484,0.42559044498217213,0.45714103447764365,0.1732346024205027,0.02746587526573485,0.6776632847223503,0.47583881749093426,0.10484176284185143,0.44224231706024253,0.8883083279692412,0.8631174267787389,0.29184084385216136,0.9724162672079912,0.644063775399361,0.6000950442086774,0.8797347582864417,0.0689902052398359,0.4825944871906074,0.20654646877087957,0.8295692764825422,0.7100874136505493,0.7852333548274908,0.6218152733782827,0.528322184447843,0.08611724352579264,0.016442700428434653,0.14695279116553128,0.8635005013024883,0.9651885905178816,0.9779764634244392,0.29496480989724105,0.7146979503769173,0.10411113578326936,0.021944896145990267,0.5036749447069648,0.6731279358394056,0.556324144930815,0.9951841905007346,0.38137997173209315,0.986184848162315,0.05312350027601065,0.4514397954891556,0.3229005542401038,0.0026907897689338878,0.46797138823520346,0.22035432921741904,0.052987201269376394,0.6388676145655099,0.9689238448606874,0.5780202741355196,0.5323664297462183,0.26239582914973436,0.27158358988953535,0.8078254201018855,0.4030575818877271,0.29625939048758165,0.7965309192005001,0.06771173625769422,0.3439975933952215,0.2412998775926376,0.164440389842754,0.9712996604388664,0.4083915645076357,0.40434080643054116,0.9619703777455975,0.47436786925539587,0.20159775925633117,0.922419082648102,0.4175602845354194,0.9078170978935594,0.7339513400843574,0.13590439089130535,0.8805030622575083,0.5412300836369717,0.744603487655616,0.3031257559829965,0.7201662894307024,0.35897721041675545,0.5760704158263474,0.28901597566607107,0.777529189685324,0.5045263840120464,0.03568641805650552,0.5837354812116982,0.1301829783046431,0.15624425892394278,0.541301226893208,0.05279367029788151,0.49001591543074485,0.3565024126985685,0.790016210737138,0.47698784418163553,0.5923110260167106,0.27772688889406205,0.5292102478396792,0.5531029503717395,0.4017550096334219,0.6911024261166061,0.7412774744686219,0.6965999854711562,0.33969925362516595,0.6719043957419242,0.009114410594994515,0.09375482925403134,0.12162447072230909,0.9388118202975431,0.4063428830248439,0.599287180902871,0.2988991721367562,0.4103846888092215,0.06785339721105177,0.8290469363206623,0.9558209491983807,0.9244866655631689,0.6653912100381241,0.9264257558316142,0.6849515383414206,0.6323378348896922,0.6246994244460744,0.9014549291036795,0.08564125817022727,0.9120936965171382,0.35892986719133835,0.2872771195101391,0.2963404163474641,0.3900021844484003,0.43913178012201337,0.18187365221575513,0.9953507525005003,0.061407168466706574,0.7437592740255194,0.9571402601764714,0.09366359520597234,0.7597579029953865,0.7278010836584805,0.26205843544899254,0.5561123608232157,0.9735002932084145,0.7282483269460656,0.9352464116826802,0.2695642471245978,0.16575438329338632,0.5258762230324452,0.0008307560599687402,0.8267771203118042,0.7382632869035186,0.32134308901049846,0.20271250945395236,0.07364646900569971,0.10401188855752075,0.5323711894305401,0.7358480991466889,0.7420940438457273,0.7848304375624211,0.890644957896122,0.5571585439156783,0.45971920277455736,0.8849104370959857,0.13160183065038322,0.9029459011237999,0.8469002176843594,0.7836573236392963,0.9531294698859307,0.3381553289810266,0.21838837807308842,0.5574829428225105,0.6928270526251017,0.6815444673029354,0.9179065852760167,0.40204467942286515,0.1111222607614688,0.2680225406963228,0.09553921685262456,0.49231593238918037,0.9388554865208185,0.7030697562677442,0.8442011087173982,0.3959202442190122,0.912636595063435,0.41648746559295247,0.1591668174535974,0.4104563395603822,0.5984152131938061,0.5598724477661139,0.44422106485794965,0.9164937113374387,0.551476869169411,0.8419231880665399,0.5932342731565667,0.20240405648141113,0.5808517522918781,0.5400031757380028,0.11055781866133296,0.9748433122442226,0.905580436499458,0.11802003567877795,0.179101245174474,0.9734333958478698,0.6771986232590275,0.3314179979756702,0.9685330431014849,0.6957274442661181,0.18938117319779346,0.7659775412618093,0.4792712655753042,0.6193972906205598,0.5307898388688299,0.8413316575688188,0.25313600241708856,0.5812330517369442,0.5980291948865968,0.026774438073195794,0.2867435917334169,0.37127103264548733,0.8463305963145389,0.1119499098374348,0.5259167748476969,0.6608756940913627,0.3080366194287718,0.2142039630124335,0.7114803812970076,0.5116510895014563,0.09402497544761745,0.9352189015199632,0.37989321362602024,0.2758270438851027,0.34452672965622666,0.5184372936675103,0.5118537822986537,0.3482225157353511,0.6001509733054808,0.5183506445824138,0.3785392326356285,0.18277328235857437,0.05089283387141119,0.7270190025666918,0.6348323828904057,0.34070670178910123,0.3956284134408783,0.17805673315966297,0.9147997776033188,0.579303091997792,0.3625850001560016,0.6535025828656122,0.6160730175917963,0.7944932922265899,0.1875156047794755,0.7143646241869102,0.5999744042360184,0.1488266982195805,0.8886647553933411,0.12961516987224653,0.48605181988819446,0.18647994752190078,0.6007413107157056,0.9420639829528474,0.41365768517998314,0.7579560162145067,0.2216939846605579,0.007447995288363707,0.6379218568799612,0.3414318693245615,0.32967912259662646,0.9006919781718126,0.8020831346497714,0.3319942275923413,0.06189842595932782,0.33849335394204183,0.6471307603775327,0.22385764328663282,0.7045602130127451,0.02610135583051032,0.32939751918480176,0.3857719421491961,0.7682730259464907,0.5644803207439018,0.548832309730864,0.4800909248838663,0.08283666282432933,0.013254946743891827,0.7055230391047433,0.2066839786039456,0.3731087002605764,0.6682946523155933,0.6536289801476651,0.07613341549822628,0.2727749076712085,0.08826704216265413,0.3887277137063645,0.24842738374675322,0.9801705586169192,0.7672109994479639,0.3878018571403181,0.6655818746460762,0.9435373493617163,0.969876965023518,0.1809163061470087,0.8491046888849432,0.7510023707427407,0.4401317619351097,0.054962166323804906,0.7707789638931879,0.9863488770111148,0.6188778382209816,0.7906580028875554,0.32165079806134966,0.5506171702108491,0.8794202903109773,0.04365076277706481,0.7411438201045712,0.6373154482516439,0.18350053502129193,0.4977325907634409,0.392610989919971,0.8158628272467576,0.9274131497061899,0.781389718195892,0.4280752930228495,0.14743344638424016,0.6796672421055154,0.671919791716435,0.1383845287443506,0.22396996569388583,0.6043472027911034,0.444232703247057,0.4295274178852735,0.6705363073092752,0.06340615966325114,0.008293523515942258,0.8740985590315253,0.4982766354458281,0.18873128729983235,0.1846883862089974,0.5446283047783231,0.7140400603462227,0.41592464342287383,0.7061710034727442,0.463713336183474,0.08240157805574655,0.21063876267040116,0.9355691460590023,0.00831185975687676,0.2667299157939731,0.646759710217051,0.1483261290160962,0.09897975771179124,0.998797794674984,0.17877789131690425,0.9939407515382814,0.37857767567798417,0.16146534137298652,0.3332299743852025,0.2929668606620084,0.5268229289092876,0.9581085020316031,0.9997771239902695,0.5328759645482544,0.601217442341067,0.4770313112269664,0.14727287405327694,0.2421447802797949,0.7312160692279062,0.4794011995710601,0.7511660403444416,0.6848776568069335,0.42624367598039514,0.6548012407055614,0.6946776266709367,0.5445730900777863,0.729716261299455,0.34742688161775304,0.20931944428209315,0.1108295326857407,0.8499274895846045,0.6573079335125276,0.5379489904527506,0.5721789356094833,0.776372993282245,0.9844020973466812,0.14413585994747113,0.24200642264754735,0.6352213779529001,0.9271708978819855,0.3865301763094262,0.6179701648915998,0.08298495469783251,0.9845621670953888,0.10038822661557045,0.9456578757121537,0.08356852207595722,0.4903140602034055,0.5118547215150997,0.47568573376891354,0.7268433951786952,0.0046174404468470875,0.6114734588384765,0.830464248921204,0.46696575814093544,0.5424454761170903,0.1112770982435245,0.7329544724461268,0.16425476771118364,0.07361671784001889,0.04964229170875112,0.5113621636044625,0.2505092191649525,0.7054433506386151,0.8223969290675992,0.09234233669543945,0.48874464147596064,0.04793058118483895,0.4051320829059897,0.0177040325707003,0.23626907993610335,0.8901506129394336,0.8013676157798857,0.8892642722972197,0.14749181991805282,0.8712467637630774,0.8330464538008142,0.09370599045200123,0.07709362949619858,0.6011655612580018,0.991825818296499,0.8890768629069359,0.8847264869915521,0.6448182628261392,0.5766641660093788,0.809339196154196,0.6794951187088336,0.14735640253628035,0.7225182366000564,0.9497773996643804,0.27986865699681984,0.237598183752586,0.6084916103279683,0.7675151964109608,0.8934542238794161,0.5556653375985148,0.41833244857651875,0.211418350916049,0.32193496623255813,0.4599831657152216,0.8167305476293885,0.44353963598260693,0.7232796256457792,0.2629814096300922,0.42313444219597196,0.1470273984470396,0.7069991499627735,0.24282574352120267,0.9032802395356236,0.20061834050374916,0.11100568398984056,0.29745442578340553,0.5899051947777032,0.20308185523777778,0.5920136774405753,0.06337294061909748,0.5864805809655975,0.19835554529624067,0.8402389464621374,0.4054458237946543,0.7928334135014707,0.30093126436805173,0.9365748046384423,0.5113244118871894,0.06161665597420618,0.3941912285218121,0.14643474009915036,0.13269055731390367,0.6448329374717192,0.7521030599199385,0.2839173772061052,0.46510010322095496,0.9792504245752425,0.6365770350235083,0.8848245271823922,0.7736575376242889,0.618658877527295,0.04048932741918221,0.15989988397138877,0.4936739014136238,0.5655658837659292,0.010421269726464066,0.40303204518879476,0.7317639183707392,0.8154020147773327,0.3776081803700484,0.924159810207287,0.7773477265267004,0.3480379600148302,0.6168186664419275,0.6141357138476533,0.34529705851693504,0.9650893390590152,0.39445146329249403,0.8156131290525366,0.1046424706123934,0.5124085906647935,0.6966125315740173,0.7101655403613985,0.11823738977082687,0.6053440691424687,0.8309863241946589,0.8981335807431723,0.42763528691513497,0.09125722099601608,0.13361851850704265,0.5993062232723743,0.0764847216284561,0.26617961522111466,0.7015149020866005,0.012666562257383607,0.9417943742598907,0.5905650679740995,0.9848169289255446,0.3991376022301203,0.01659423339583932,0.9186110017799312,0.05933135867639372,0.8472599556758622,0.7854062425246535,0.11720567299066209,0.7357311060020053,0.28902083830985936,0.8036519157979927,0.043053227777412495,0.620363515334601,0.5368387384295568,0.52781243255969,0.8689246816303289,0.5467087422587946,0.43346031684893127,0.1887943637802043,0.16426029178858848,0.44039047795493724,0.7195202681900636,0.11058700641416341,0.23889717909824681,0.4969640750601425,0.912302432653932,0.2626035198546688,0.07733083405631702,0.4814709381643423,0.9182347576376402,0.041521276780949856,0.04468134666901369,0.17303238824330158,0.41000961432907146,0.5058418918425713,0.47097103410727437,0.708818680420342,0.5922564826328496,0.8450013926190694,0.1342711999523285,0.8144296656215417,0.5303956503505225,0.4991860935408696,0.31708279770656245,0.9419055604742943,0.09125143202100938,0.5809338337133632,0.040211103033647166],"p":[0.9154786412421654,0.8481946368799651,0.9280966288168286,0.7683313113202053,0.807209076521135,0.7682786416894095,0.9538046313790476,0.8909665131543474,0.961260675481338,0.7772268129150177,0.7653024984815189,0.9180060873493436,0.824955762386842,0.7913997126224944,0.8957268618247549,0.774530488337259,0.9956649324558329,0.7821780577195966,0.8235997180277896,0.9247419843270885,0.9567816813011383,0.8317837499664815,0.880016802613559,0.7842567280847217,0.8599792599448763,0.9601986972223593,0.8969761340282887,0.8944161752703068,0.977241208407915,0.8494495707129408,0.8799406682735256,0.8082689599080111,0.7584347719705162,0.9668087293562686,0.7972476588389003,0.9656246882693571,0.8897479110409132,0.7804728529264289,0.8552930444671211,0.8099306672652986,0.8520913844499116,0.8423795495391664,0.9401121837013064,0.8365140179892683,0.9823416176649746,0.7860874916512217,0.8123642973522303,0.7999930492475937,0.9368060437808978,0.753489495181904,0.7948168719749267,0.858462385467385,0.8150902787666903,0.9690933209996312,0.8512235035234712,0.7610900858099883,0.7727851962492194,0.9336284106839006,0.9335039819532533,0.9082756369167009,0.9525887898245796,0.9988912339277973,0.9760266102509305,0.8470671874835022,0.9646234358506802,0.9372230854221371,0.9494570085416334,0.7716286613853329,0.8471306120606523,0.9821627808764715,0.9208626458865933,0.9121717615694755,0.7646922342473477,0.9559478076696472,0.8604774920171834,0.8982605697741464,0.7710994617848883,0.8914975426800577,0.9374351556950286,0.7999474929838066,0.7509090766332558,0.8041738248534884,0.8658035701377582,0.9654881733165135,0.9809127715362144,0.9908046138328916,0.874509143474635,0.9684244256169743,0.7689161557762254,0.9088000554451552,0.9480399031784935,0.8373611843098816,0.8703821757731206,0.9313538849623413,0.9746028912170281,0.8790222524133724,0.8224844609121609,0.9610434269542216,0.9978794285215915,0.8008324424481907,0.7719878275298184,0.8210703514767231,0.9444499890573856,0.929083602421862,0.8986570411680459,0.8006803666427311,0.7818591799219561,0.9328868491489435,0.9690498717083309,0.8264730974266985,0.8964162836836924,0.877881432676286,0.9834228784445014,0.9414356787281639,0.8374191534242239,0.8791452896447685,0.8955468502532197,0.8772590735853507,0.9144630229632027,0.9267222714989929,0.8205828492013678,0.8036182048761469,0.8456193673292197,0.770330941420964,0.8863994426815337,0.8912122977514021,0.7750767477867387,0.8925056615188409,0.8435937190185536,0.9026325996441228,0.9533712926812936,0.8359245189047642,0.9382573458041807,0.9262762740706598,0.9927592101408517,0.9010098053441743,0.9185798263912911,0.9455795341255833,0.8258839986944682,0.9275687008194841,0.8153520709109109,0.8648701021053906,0.7547858212820469,0.8344236923734474,0.8699660382837627,0.9688918284842005,0.8943838404907329,0.8888784015596392,0.9758982455053933,0.7807715508463484,0.9465519063315777,0.7536352457297686,0.8713727888220149,0.9459264969376269,0.9172072039641739,0.8227941818689306,0.9671015682723176,0.8736977696065971,0.8622096538521502,0.9784625201368167,0.7765402699616231,0.8684439426434547,0.8717328370540258,0.9374435171807207,0.9926375778666492,0.8209065965625479,0.8214408988447282,0.8058638141709833,0.8000122830831868,0.9771068388793969,0.803572661319053,0.9132561985506715,0.9865505665162506,0.9448223429645816,0.9111011406232072,0.8184253991960075,0.8069329486669736,0.7525576331077516,0.9619648533504437,0.8693128960132804,0.9705240344974454,0.7790443861205288,0.8996453072712718,0.8613864028026854,0.9979653105244868,0.8312662612507576,0.9302309124195995,0.8825176555587014,0.9517831895098179,0.9178722740655342,0.7727953837331127,0.9060024367231178,0.9532397296580319,0.9044954655464255,0.8580087345418896,0.7950985209636139,0.8312923828956562,0.9598923329290838,0.9256503503250206,0.9039657373952936,0.9873606626945088,0.7820391184314903,0.8923592811722063,0.9152173201328788,0.8035137723231868,0.9288791144088271,0.7869445651200848,0.7856197380507355,0.8334343280830834,0.9773049065348078,0.970000879010875,0.8802578743124436,0.815895190649307,0.789215928262935,0.916069352592934,0.7871620425609629,0.9260683713221467,0.7528492380460985,0.9881194870423056,0.8616676707025548,0.9519920484171507,0.793964438220699,0.9107402466532477,0.791756661115461,0.8197988448743604,0.9914290599033422,0.8962292607747506,0.9859377226845674,0.8460353269277882,0.7583408623567693,0.9098625278213893,0.9642660543533184,0.7763871324797708,0.9590647948207327,0.9876751502850558,0.7663341096230483,0.9377537350790401,0.7976337046582129,0.8793572337417561,0.7792461918672162,0.7637726114444685,0.9229397548928835,0.9514670763999857,0.8179598091249654,0.778123504038704,0.8265926421784529,0.9853021259059145,0.8667126205173343,0.8914948595505985,0.9403289586119663,0.9581748980523893,0.7926343775930982,0.7705491145842538,0.8807529148858759,0.7580562895539642,0.8618702672791566,0.797864541993818,0.7508475474224461,0.8754907750453638,0.9876004383016369,0.9199598932387479,0.7615660643185806,0.8523767376930549,0.943142907039016,0.837453970752748,0.9380434565914277,0.8459894847189124,0.9167664548959793,0.7908703035512842,0.9605905196511255,0.7525616817111165,0.9572052511556868,0.9333287069212709,0.9200382188869654,0.7860590807984702,0.9346280988147806,0.8274003116340728,0.9871322438810772,0.8602415795143032,0.9624722889981352,0.9938907140362854,0.9279331710443981,0.9796593118960852,0.9224906946781324,0.9580327372563625,0.9913014374585891,0.8856388845893255,0.8131193494253459,0.866457526572122,0.9917159603059962,0.805088295203837,0.7756311482439857,0.924011280814504,0.7867956729781675,0.9803526830242884,0.9321975565381884,0.8353771935245715,0.9034659077099598,0.8617822602218697,0.7974490908012272,0.8566902273014276,0.9721737845647004,0.9758770404328319,0.9750323072701705,0.8321885877646326,0.949606623268224,0.8430614913808787,0.9708143805740737,0.9105053853779312,0.7727982591867659,0.9543024910440011,0.8404899196482007,0.8638218844669261,0.9767983984810731,0.8644356046732553,0.9586259202801308,0.8689646876049298,0.8680647379241357,0.9306302842540846,0.753719574625888,0.8205097921873472,0.9004906834623219,0.8905135701688608,0.7754116935726716,0.7851822038488494,0.8380022231943705,0.7713345683629271,0.9588900050275941,0.8235795923977693,0.8110607266842162,0.8869192520615674,0.839257286303114,0.7831538998007191,0.9424788893882006,0.9059841948207422,0.8065109847661527,0.78990573540818,0.9298097477630566,0.8685973803326246,0.8422356125642355,0.7931898844558591,0.8330135301261908,0.9554056959927665,0.9862239261032246,0.8476426520272637,0.8930671726448574,0.8385283571507477,0.8548892395720172,0.832133124833744,0.8053585227156719,0.8740082331068249,0.989361758977277,0.9804929358978629,0.94130292885455,0.7602236895084853,0.77560573133228,0.9964596218923458,0.846895124263169,0.866437403243316,0.9849992546837134,0.994641955058583,0.8442753860883669,0.8546124348437751,0.7846180273560383,0.8932288805365265,0.858848984862262,0.9227206108410991,0.9482951742280543,0.769187773041152,0.9168270358405229,0.8856653583396628,0.8762669744572864,0.901629489094653,0.8465806349216433,0.9397719487608867,0.9050186029244289,0.9872521754239674,0.8226864301546389,0.9978972163426563,0.9206422548539932,0.8361977274989213,0.764850108569822,0.8541554265544391,0.8531880661353352,0.9534012591444945,0.937311220921083,0.9295529001662726,0.9120002805815693,0.8735251173982217,0.9274123200346118,0.9841426590302506,0.9171679633901216,0.8146753911656341,0.8464159942830238,0.9253100827927236,0.8933378180452607,0.7896662508437777,0.7870924106146235,0.9549487750809609,0.7971589401007504,0.7756000839770618,0.7806410188265842,0.9503841087101537,0.8321132863495093,0.8054206233544932,0.8294931726922419,0.9496229051994595,0.9595659221263364,0.9838588881377747,0.8184883140730713,0.9131002812006612,0.9599064830209593,0.762697369119429,0.8784414963684275,0.9905254263621266,0.8710925244809382,0.9603975984719547,0.9244939937563462,0.9973848407122505,0.7818913293257166,0.7741664279602489,0.8332515726045631,0.874057260059779,0.8859607394441663,0.7993993400089565,0.8391531115500661,0.9398871148082582,0.7895621180955421,0.8635421896979494,0.8733834145927193,0.8503937091604133,0.9752969438048154,0.8740151561696721,0.904659053126382,0.8149510085514553,0.8389366749486358,0.8338729430723373,0.9710804518242357,0.8768240038446318,0.9404821656860951,0.9226997598338182,0.8022767969945903,0.8995842984886651,0.7699221694377775,0.9684330935609471,0.8815974098756041,0.9776739464260394,0.949448555005868,0.9659156214043056,0.9449174847029231,0.9686269873235844,0.835995501014702,0.9678252534611798,0.7982824097678369,0.8226412401875567,0.7589124022108955,0.7615725305143068,0.7639509124936252,0.9215233671733487,0.9139689480084741,0.9201594685427031,0.8309938847962945,0.9876324098533472,0.8652423558232032,0.9018790705381425,0.7970559966077717,0.9404219271619998,0.9380264450500487,0.754517728535729,0.7728132450741426,0.773512094389257,0.8204409552502251,0.831874737959168,0.8152677408625327,0.8243377981688218,0.8566233316459028,0.8469060033082563,0.9744865092753503,0.9988953295134109,0.7757532469372102,0.8063860265688848,0.8212396238212853,0.9080261343148271,0.8398449016414895,0.9136373368416576,0.9336538596265086,0.7553216822436744,0.8973985336445762,0.8961860877930348,0.924812186288712,0.7707732226915363,0.8775054031830811,0.8121767399877626,0.87252300324474,0.8583132034488434,0.8639352507105207,0.8641952384866451,0.9504656721535275,0.959380334512866,0.8417629191852978,0.934696060884231,0.8991059126415397,0.9286594693400879,0.7969751497816338,0.7785643148001796,0.8481539322214735,0.7988954619199693,0.7510451113848748,0.9836696356556516,0.8161502870978805,0.9350519413644109,0.8055826334100074,0.755314362901873,0.9881690293362121,0.9358463463754596,0.8402189918788121,0.8730179549422918,0.7546397755875373,0.9687301100577475,0.7578477987987249,0.9082858261923102,0.9050022954111379,0.8919428582377147,0.7539113677410276,0.967814412760103,0.8254746473019403,0.8070480037624945,0.7574254650792841,0.8238007628605079,0.8421354556979321,0.9706281706301074,0.8471001387871315,0.9849567499875667,0.9695345255610284,0.8077483142412158,0.9186493855923661,0.8238103172860827,0.941653064671395,0.8398461028026813,0.8485026424417037,0.9874342501538163,0.9263229883794941,0.8466852977085447,0.9202978478882695,0.7524577987133352,0.8702857155123341,0.7854554489716801,0.8746474372977218,0.8407096207662552,0.8808508195383202,0.7938454404958685,0.9369170840027761,0.7954915636987128,0.923127414752191,0.8382428505498238,0.9025376827246531,0.7781466981125748,0.9313249353764534,0.9890172715661529,0.9685597026487585,0.9932401516670699,0.9893212759722065,0.958043305759575,0.8088160723784513,0.7805949063092762,0.9620126232172901,0.8949210458317012,0.8992943397172775,0.9799904709411007,0.7501073008957886,0.9232526213874515,0.8412234791512083,0.8449492885480898,0.8764483933214429,0.9163165113670538,0.8087822442850253,0.9385008741093412,0.9731314934497283,0.9464942131724803,0.8016436581065025,0.8967687946178104,0.7810543415999154,0.9439283092501665,0.9095395842428754,0.8121575007900013,0.8277944903162865,0.7691892853445265,0.912376032594902,0.8724755412166182,0.9781413991412362,0.9575977464370381,0.9608044878470718,0.8131974949883665,0.813088341946292,0.9533009522787013,0.8451745604840657,0.9193922080952113,0.9372627170674617,0.9825111558919899,0.8756729626237583,0.9647936722943413,0.8894288219448803,0.9003285689763962,0.8984459121883936,0.7776297462630474,0.9458158232242375,0.892796367148263,0.9745391922827986,0.7541890824073518,0.9299818781875375,0.8309341758085405,0.8003184704048787,0.7896505810535301,0.8305366532695359,0.9957055120572946,0.8597399802998786,0.9718064871458659,0.9245597612846125,0.9521728964382509,0.8137785404806555,0.7891524924033828,0.7571225338444323,0.920638047296654,0.8788218710963813,0.9821685194456775,0.9904119272470673,0.7981090474521806,0.9709447037789806,0.8543900370361793,0.860114117010491,0.9293168916232004,0.9232601967537601,0.9458139712773591,0.8452953085478527,0.8108502875191261,0.8724794898536252,0.7620232048993569,0.8222284149080568,0.8454377080238626,0.8276834487888445,0.9433833843946731,0.8055403967551037,0.94736395963071,0.7983653045633821,0.8545621468249822,0.8962068846738895,0.9721888619086485,0.8317739991779087,0.9351085683669229,0.8526748293039106,0.8233836567029386,0.9354397187600318,0.933807501553318,0.8931220808862113,0.8451218285417406,0.8546773273854056,0.9189316049611446,0.7801959600315138,0.9268996239244514,0.8800842547435601,0.946989674413276,0.8509941541009506,0.9008379068433493,0.9040461621110403,0.8173177022775834,0.8016039186765724,0.9011170518132099,0.7890033377989008,0.9240112099014604,0.9968879557890807,0.8591201057885165,0.8048167147256325,0.8161608757693024,0.9579170758529681,0.9813425702544543,0.7957013494967196,0.9295459176934588,0.7930909004303535,0.7952578169907887,0.9879998825381597,0.9339176375329723,0.7892390679329149,0.8965202899667096,0.8165337733002498,0.9958937580468743,0.8898871860136878,0.9980036575691893,0.982693732304472,0.8423780507376443,0.7987600466996434,0.9258765172282295,0.8985855991029055,0.9100771777888511,0.9485763983187379,0.8599747255299732,0.962828960678697,0.7882506393992345,0.9291011120940633,0.9176834934242604,0.8545277755858371,0.7539244661249046,0.7817667155768193,0.7905609397164646,0.844992560365161,0.7506670509668258,0.7565023142162874,0.9553897775890857,0.9917651980102162,0.8477312333292333,0.9915586256452645,0.8528027776210819,0.8806218534600705,0.9683284362488234,0.8428853733036697,0.8213715821648774,0.8172745522128353,0.8018091540836174,0.8737008658082066,0.9937094448051991,0.9842467736846053,0.8082441746642965,0.8518813021529097,0.9141954859567338,0.9847289710169371,0.9892564182019623,0.9882164865022147,0.9390910098375346,0.9173019959406656,0.9225303400147397,0.7897954706706878,0.9232830490601565,0.9013490797200485,0.939010228985245,0.7619004825344192,0.7818027904968399,0.7788602022681412,0.8426523205291029,0.7895463415849032,0.9896282228581257,0.9446173143562561,0.8510188845081823,0.9283858939398636,0.9655101873366778,0.8795769569938015,0.8649787707292783,0.94721266344795,0.821903296652826,0.7545057329654529,0.9761725485494996,0.8694647861767963,0.7584769809253382,0.8663921666015104,0.8651369342162408,0.8142326856483845,0.9800873599944432,0.8843217242222778,0.9094877661546916,0.8368089781620625,0.9367998203861505,0.861481488763815,0.9277741012042431,0.8915878602778413,0.7585870688169972,0.7656277025798944,0.8653963798263911,0.9200106380213793,0.7751566601342861,0.882239900575932,0.7552474144608645,0.9011864124566491,0.9033420050158885,0.9505315522705897,0.9260525075578817,0.7718946980963246,0.8475774677386041,0.9454744746049641,0.7515792748715799,0.7881903197465977,0.9724623630555046,0.8852211577771437,0.9091833678355623,0.7656379071424777,0.8684943732619579,0.9564398063269042,0.831030598631392,0.8431919797798619,0.8311671080153773,0.879191290605833,0.843395269659294,0.9748416352536723,0.7617497991551492,0.8565093126443322,0.8649739997048689,0.7789773833226309,0.9318568844068003,0.9695442890950119,0.8636559021057859,0.9050615360902718,0.9005083191225063,0.8625312267228036,0.9494532687093749,0.9825118397353658,0.9344341381377987,0.8990230388615141,0.7596951294493952,0.7868806499127611,0.8261261434177158,0.8536949229469963,0.9303597350398709,0.9218830171752359,0.9152705547988906,0.781117038861542,0.7815215366987287,0.954474217701688,0.8656268025014844,0.8906826336113973,0.937319546687651,0.8427768325871073,0.7773039018531265,0.844202094869114,0.9483883408827739,0.9095489421294325,0.9840290676571428,0.762938878972871,0.7894047286196917,0.8616909525058678,0.911280938976531,0.7519154797000205,0.9398090466610851,0.8772360966229331,0.795544870344744,0.8127582425355898,0.8656358810752716,0.8204268251245123,0.8037139350966,0.816069905389642,0.9279551410103252,0.7506817770316194,0.7592843703640719,0.8186495224951522,0.7981866691624742,0.8717303366395803,0.8399331302893636,0.7872052028015974,0.8132957356779038,0.7709538718449238,0.8569699135790332,0.7673239382526539,0.9489703333708002,0.9642053065005641,0.869654306540677,0.896970865821975,0.9437074041862286,0.9776718342942299,0.8546053668429017,0.8778046584822206,0.9546686401726404,0.9269118008434005,0.8416273368363938,0.7900252167659663,0.9560258054822754,0.8297840902490843,0.9532657953240237,0.7831633850260205,0.8641881701717353,0.7604107352996287,0.8649098070112617,0.9093403689552157,0.7774663445070976,0.8602187101569068,0.9320085786301742,0.7707051597075938,0.8357691176080846,0.9431232227122008,0.939031221106352,0.9615768325421417,0.9410165494692038,0.9262137136533029,0.8305698107550497,0.9511228457538332,0.770109848589901,0.7643884616785703,0.8697131729363635,0.9000215747658581,0.7674453751183783,0.8148601305350156,0.7822410887770075,0.9245835737122001,0.7946416530340199,0.955041901258428,0.9588515747082507,0.785102518398747,0.930955531722163,0.7603233718436815,0.7972210856833493,0.8506814102365668,0.8384402745804301,0.8589694311735792,0.8917446145409103,0.891825718262726,0.7929881363687024,0.777481233505581,0.9000954207343932,0.7584688862282353,0.8650463816392143,0.788939621154293,0.979066854781542,0.9818521889332985,0.9038757091657512,0.7847488454856115,0.8307049763503902,0.9008994596264116,0.9310296302269054,0.7893509004851011,0.9776883758858759,0.8677963209393175,0.8476585519812674,0.9892595921055234,0.8169514972876503,0.8626486815341128,0.8409944544145755,0.8320882723875211,0.8093294716427875,0.8823570988449552,0.7903413573434528,0.7763020233791968,0.8517395741758322,0.826995834750655,0.9598757129002333,0.8318765117437575,0.9661215405714499,0.7957966050802732,0.8423224101061818,0.819610346246054,0.9393142912279189,0.8196064584729299,0.9316332255499433,0.8247718397296023,0.7868000840250473,0.8691736807157255,0.7632578321722294,0.9960350677161864,0.8234995180075959,0.9816252648050559,0.887547372280916,0.786052400536367,0.813319994632014,0.8191551245941244,0.7561723626107024,0.812935790602046,0.7905702337034138,0.9992479286887171,0.996519793284739,0.9840424908968712,0.8139932381399311,0.8046764288075916,0.7635228803376509,0.8430346255852047,0.9713880607410743,0.7653261497947476,0.885238867860607,0.7735172817018054,0.8153960345260564,0.7833994142471452,0.7879759102115163,0.7988883959312454,0.8927788609627629,0.8634140528207139,0.9587122006476636,0.9574978626074943,0.8566599047107737,0.9800489127358389,0.9417322610434703,0.8025989121937253,0.8675251168284361,0.8419611752509145,0.9924883209315829,0.9308798439569862,0.9424263811177126,0.7819877286107544,0.9576677646272702,0.7765059902958662,0.9602079926638483,0.9875082450028778,0.8353255080270359,0.9905292903888017,0.764764700276598,0.7934603021144352,0.9337806891781624,0.9147792799773382,0.8605497270148749,0.9872787487971302,0.8943700376586308,0.7679627569100743,0.8613908838205737,0.7946722748226898,0.9920146126830758,0.7676177525522734,0.93314076802144,0.8751693369404756],"n":[56.0,51.0,18.0,5.0,58.0,98.0,15.0,28.0,47.0,61.0,36.0,83.0,89.0,61.0,64.0,14.0,28.0,29.0,72.0,39.0,38.0,99.0,11.0,32.0,35.0,94.0,92.0,15.0,21.0,89.0,21.0,5.0,71.0,14.0,35.0,55.0,60.0,55.0,13.0,45.0,54.0,28.0,46.0,65.0,61.0,81.0,94.0,22.0,97.0,86.0,42.0,21.0,95.0,59.0,34.0,36.0,71.0,14.0,45.0,66.0,40.0,38.0,0.0,96.0,51.0,62.0,90.0,56.0,14.0,35.0,28.0,16.0,40.0,37.0,22.0,84.0,22.0,26.0,14.0,59.0,82.0,47.0,77.0,37.0,63.0,71.0,0.0,58.0,37.0,15.0,9.0,49.0,73.0,78.0,53.0,12.0,30.0,86.0,99.0,47.0,45.0,31.0,9.0,91.0,34.0,54.0,60.0,59.0,36.0,38.0,32.0,40.0,70.0,95.0,4.0,26.0,60.0,56.0,50.0,76.0,79.0,64.0,32.0,40.0,44.0,83.0,12.0,83.0,88.0,29.0,41.0,43.0,85.0,60.0,27.0,56.0,59.0,9.0,86.0,27.0,98.0,57.0,51.0,61.0,58.0,51.0,23.0,61.0,46.0,96.0,62.0,49.0,64.0,60.0,26.0,73.0,99.0,0.0,45.0,85.0,40.0,66.0,52.0,24.0,32.0,94.0,99.0,60.0,56.0,81.0,20.0,25.0,53.0,42.0,70.0,10.0,87.0,62.0,2.0,50.0,83.0,17.0,66.0,95.0,70.0,50.0,66.0,19.0,7.0,1.0,24.0,6.0,68.0,67.0,8.0,91.0,67.0,74.0,69.0,30.0,61.0,69.0,50.0,68.0,28.0,69.0,74.0,28.0,54.0,83.0,53.0,83.0,49.0,76.0,8.0,23.0,58.0,24.0,98.0,2.0,24.0,54.0,3.0,26.0,81.0,9.0,48.0,95.0,7.0,74.0,27.0,21.0,86.0,42.0,28.0,95.0,80.0,15.0,83.0,9.0,43.0,16.0,67.0,67.0,69.0,96.0,64.0,52.0,48.0,84.0,67.0,75.0,61.0,10.0,97.0,16.0,81.0,18.0,24.0,25.0,83.0,38.0,90.0,26.0,83.0,96.0,63.0,62.0,14.0,42.0,84.0,48.0,48.0,48.0,80.0,66.0,8.0,97.0,94.0,35.0,94.0,58.0,13.0,75.0,25.0,90.0,2.0,33.0,21.0,84.0,68.0,65.0,38.0,75.0,21.0,32.0,55.0,43.0,38.0,19.0,80.0,52.0,14.0,10.0,23.0,48.0,65.0,24.0,90.0,75.0,60.0,51.0,56.0,50.0,89.0,44.0,12.0,34.0,92.0,70.0,44.0,15.0,13.0,71.0,17.0,67.0,56.0,6.0,75.0,16.0,57.0,84.0,22.0,7.0,83.0,28.0,37.0,14.0,18.0,72.0,27.0,77.0,23.0,79.0,81.0,53.0,16.0,85.0,75.0,1.0,50.0,95.0,18.0,46.0,64.0,32.0,70.0,72.0,85.0,3.0,24.0,63.0,42.0,16.0,35.0,85.0,31.0,79.0,22.0,73.0,89.0,69.0,29.0,24.0,31.0,25.0,32.0,56.0,60.0,70.0,83.0,16.0,13.0,54.0,1.0,17.0,94.0,77.0,42.0,13.0,77.0,11.0,54.0,47.0,11.0,0.0,41.0,85.0,89.0,21.0,63.0,75.0,54.0,90.0,97.0,25.0,74.0,3.0,2.0,34.0,54.0,57.0,20.0,60.0,61.0,1.0,97.0,28.0,31.0,37.0,1.0,89.0,3.0,36.0,84.0,59.0,72.0,51.0,71.0,24.0,86.0,16.0,39.0,54.0,80.0,51.0,51.0,39.0,91.0,13.0,15.0,75.0,14.0,14.0,36.0,47.0,5.0,41.0,84.0,25.0,66.0,6.0,62.0,57.0,72.0,5.0,65.0,4.0,86.0,84.0,42.0,14.0,90.0,67.0,93.0,71.0,54.0,70.0,94.0,18.0,92.0,1.0,77.0,26.0,55.0,18.0,32.0,25.0,33.0,22.0,89.0,45.0,95.0,18.0,85.0,63.0,98.0,19.0,84.0,24.0,36.0,32.0,88.0,40.0,87.0,71.0,81.0,69.0,80.0,23.0,64.0,37.0,16.0,54.0,24.0,95.0,9.0,19.0,31.0,7.0,62.0,64.0,51.0,55.0,85.0,24.0,68.0,81.0,51.0,78.0,85.0,6.0,30.0,48.0,32.0,75.0,96.0,79.0,76.0,26.0,74.0,64.0,17.0,55.0,72.0,61.0,57.0,52.0,24.0,32.0,68.0,9.0,100.0,76.0,5.0,30.0,13.0,13.0,51.0,75.0,76.0,43.0,25.0,89.0,74.0,52.0,21.0,58.0,86.0,94.0,36.0,34.0,95.0,35.0,19.0,92.0,33.0,97.0,70.0,9.0,85.0,8.0,26.0,44.0,55.0,2.0,82.0,20.0,90.0,14.0,99.0,14.0,39.0,76.0,61.0,52.0,44.0,70.0,77.0,46.0,13.0,77.0,14.0,26.0,13.0,78.0,26.0,48.0,20.0,60.0,85.0,11.0,38.0,90.0,88.0,56.0,43.0,91.0,98.0,6.0,40.0,87.0,86.0,6.0,54.0,86.0,18.0,33.0,96.0,98.0,26.0,52.0,92.0,44.0,51.0,12.0,22.0,82.0,89.0,38.0,38.0,9.0,80.0,47.0,73.0,32.0,9.0,21.0,58.0,90.0,89.0,93.0,96.0,88.0,5.0,13.0,22.0,35.0,0.0,13.0,92.0,74.0,82.0,93.0,67.0,42.0,32.0,24.0,51.0,33.0,55.0,10.0,85.0,94.0,91.0,95.0,85.0,28.0,4.0,77.0,41.0,51.0,47.0,82.0,19.0,0.0,46.0,17.0,67.0,2.0,10.0,38.0,29.0,56.0,3.0,81.0,37.0,4.0,29.0,51.0,27.0,86.0,41.0,64.0,49.0,55.0,14.0,93.0,74.0,17.0,84.0,92.0,9.0,59.0,14.0,42.0,12.0,82.0,45.0,95.0,85.0,47.0,34.0,89.0,71.0,18.0,89.0,51.0,4.0,90.0,86.0,32.0,55.0,89.0,99.0,91.0,14.0,17.0,83.0,14.0,8.0,67.0,68.0,46.0,33.0,87.0,26.0,56.0,53.0,70.0,88.0,81.0,60.0,30.0,26.0,6.0,9.0,37.0,28.0,58.0,45.0,68.0,40.0,53.0,79.0,53.0,42.0,23.0,70.0,64.0,38.0,90.0,23.0,9.0,63.0,94.0,70.0,64.0,47.0,78.0,7.0,24.0,25.0,64.0,18.0,60.0,8.0,84.0,63.0,40.0,74.0,81.0,28.0,29.0,45.0,61.0,53.0,28.0,11.0,11.0,52.0,86.0,13.0,69.0,41.0,48.0,32.0,24.0,13.0,29.0,5.0,62.0,38.0,49.0,79.0,94.0,64.0,72.0,30.0,11.0,100.0,82.0,23.0,69.0,62.0,89.0,60.0,64.0,65.0,75.0,30.0,22.0,84.0,79.0,76.0,91.0,7.0,53.0,71.0,45.0,93.0,67.0,21.0,5.0,73.0,76.0,94.0,27.0,33.0,4.0,37.0,87.0,100.0,84.0,24.0,88.0,20.0,61.0,44.0,44.0,89.0,78.0,39.0,14.0,7.0,61.0,16.0,77.0,13.0,88.0,97.0,66.0,64.0,0.0,34.0,55.0,1.0,16.0,48.0,15.0,2.0,61.0,28.0,9.0,8.0,97.0,23.0,80.0,96.0,7.0,49.0,77.0,23.0,68.0,43.0,42.0,27.0,77.0,92.0,58.0,28.0,70.0,86.0,29.0,18.0,49.0,95.0,17.0,78.0,97.0,36.0,46.0,92.0,91.0,72.0,78.0,31.0,20.0,70.0,85.0,94.0,32.0,58.0,49.0,29.0,80.0,47.0,6.0,86.0,2.0,87.0,14.0,21.0,23.0,12.0,52.0,10.0,81.0,32.0,56.0,38.0,28.0,91.0,67.0,46.0,83.0,21.0,13.0,8.0,72.0,88.0,82.0,39.0,53.0,50.0,37.0,98.0,14.0,96.0,12.0,2.0,34.0,19.0,61.0,18.0,30.0,89.0,1.0,45.0,59.0,65.0,13.0,28.0,34.0,78.0,20.0,10.0,54.0,94.0,80.0,97.0,64.0,69.0,33.0,17.0,64.0,21.0,99.0,77.0,56.0,73.0,10.0,53.0,90.0,23.0,73.0,46.0,80.0,94.0,22.0,57.0,48.0,2.0,53.0,42.0,47.0,93.0,58.0,6.0,4.0]}
},{}],31:[function(require,module,exports){
module.exports={"expected":[1.0,0.0,3.0,0.0,7.0,1.0,26.0,8.0,7.0,5.0,0.0,13.0,3.0,11.0,0.0,0.0,6.0,1.0,12.0,1.0,20.0,1.0,10.0,2.0,2.0,0.0,0.0,3.0,4.0,8.0,0.0,4.0,3.0,0.0,3.0,5.0,1.0,10.0,1.0,7.0,16.0,3.0,10.0,3.0,0.0,2.0,6.0,1.0,10.0,12.0,1.0,1.0,2.0,7.0,0.0,18.0,4.0,8.0,10.0,0.0,1.0,6.0,0.0,17.0,18.0,12.0,5.0,0.0,2.0,1.0,0.0,3.0,4.0,5.0,0.0,9.0,14.0,3.0,1.0,3.0,15.0,0.0,7.0,5.0,3.0,2.0,0.0,0.0,12.0,2.0,2.0,12.0,5.0,1.0,16.0,9.0,6.0,1.0,4.0,4.0,4.0,17.0,2.0,0.0,0.0,15.0,2.0,1.0,2.0,14.0,7.0,10.0,1.0,10.0,0.0,0.0,4.0,1.0,0.0,3.0,0.0,8.0,0.0,2.0,2.0,12.0,9.0,0.0,1.0,17.0,0.0,0.0,10.0,5.0,0.0,0.0,3.0,14.0,0.0,6.0,7.0,0.0,14.0,3.0,1.0,0.0,4.0,0.0,12.0,4.0,0.0,4.0,17.0,1.0,0.0,0.0,0.0,1.0,6.0,20.0,2.0,0.0,0.0,2.0,4.0,1.0,5.0,0.0,9.0,3.0,2.0,14.0,14.0,4.0,9.0,0.0,1.0,17.0,4.0,1.0,0.0,19.0,3.0,11.0,0.0,11.0,4.0,8.0,1.0,4.0,3.0,8.0,10.0,3.0,5.0,7.0,2.0,21.0,11.0,3.0,11.0,12.0,0.0,3.0,0.0,8.0,1.0,2.0,1.0,1.0,4.0,2.0,8.0,0.0,5.0,1.0,4.0,1.0,2.0,17.0,4.0,9.0,4.0,2.0,1.0,4.0,8.0,1.0,3.0,2.0,2.0,6.0,2.0,4.0,6.0,2.0,12.0,0.0,6.0,0.0,1.0,26.0,11.0,1.0,1.0,8.0,7.0,2.0,0.0,7.0,6.0,0.0,9.0,0.0,17.0,1.0,0.0,2.0,1.0,6.0,6.0,1.0,0.0,0.0,7.0,9.0,3.0,1.0,13.0,0.0,4.0,4.0,4.0,0.0,1.0,5.0,4.0,10.0,0.0,8.0,9.0,0.0,3.0,1.0,2.0,1.0,0.0,0.0,0.0,3.0,2.0,4.0,8.0,8.0,1.0,5.0,6.0,1.0,5.0,1.0,1.0,7.0,11.0,2.0,4.0,3.0,7.0,4.0,1.0,0.0,5.0,3.0,2.0,10.0,5.0,5.0,0.0,0.0,1.0,0.0,0.0,7.0,0.0,6.0,2.0,8.0,2.0,14.0,10.0,6.0,5.0,0.0,4.0,2.0,2.0,1.0,9.0,2.0,1.0,0.0,17.0,5.0,3.0,10.0,0.0,2.0,1.0,6.0,2.0,8.0,0.0,2.0,5.0,3.0,11.0,4.0,2.0,13.0,2.0,1.0,1.0,3.0,5.0,1.0,8.0,4.0,11.0,2.0,8.0,13.0,0.0,0.0,2.0,1.0,21.0,6.0,2.0,3.0,5.0,1.0,6.0,0.0,17.0,4.0,1.0,0.0,19.0,3.0,17.0,13.0,9.0,4.0,0.0,9.0,2.0,11.0,4.0,1.0,0.0,2.0,7.0,5.0,17.0,2.0,16.0,0.0,3.0,11.0,1.0,2.0,0.0,8.0,6.0,9.0,10.0,1.0,7.0,1.0,3.0,8.0,0.0,8.0,0.0,2.0,2.0,4.0,11.0,6.0,1.0,7.0,7.0,0.0,4.0,3.0,7.0,0.0,3.0,9.0,5.0,0.0,4.0,8.0,1.0,1.0,14.0,2.0,2.0,1.0,9.0,2.0,5.0,20.0,8.0,5.0,8.0,4.0,4.0,1.0,16.0,2.0,8.0,1.0,5.0,5.0,0.0,6.0,2.0,2.0,0.0,1.0,2.0,3.0,0.0,4.0,3.0,0.0,5.0,12.0,9.0,6.0,0.0,2.0,0.0,6.0,0.0,1.0,1.0,2.0,1.0,2.0,8.0,9.0,1.0,0.0,0.0,3.0,4.0,3.0,2.0,4.0,2.0,1.0,0.0,7.0,12.0,1.0,0.0,0.0,3.0,0.0,0.0,0.0,0.0,11.0,0.0,5.0,2.0,1.0,5.0,3.0,8.0,4.0,16.0,5.0,10.0,3.0,10.0,6.0,2.0,16.0,1.0,6.0,7.0,10.0,12.0,2.0,1.0,10.0,3.0,2.0,6.0,5.0,6.0,9.0,1.0,8.0,6.0,0.0,6.0,0.0,0.0,8.0,1.0,1.0,0.0,13.0,8.0,0.0,1.0,5.0,1.0,8.0,3.0,1.0,19.0,8.0,0.0,11.0,9.0,15.0,0.0,1.0,8.0,6.0,1.0,11.0,6.0,2.0,0.0,7.0,6.0,0.0,4.0,2.0,2.0,2.0,11.0,5.0,1.0,3.0,2.0,0.0,1.0,0.0,0.0,1.0,8.0,2.0,3.0,0.0,0.0,12.0,0.0,10.0,8.0,9.0,1.0,0.0,5.0,0.0,2.0,1.0,15.0,3.0,2.0,12.0,20.0,7.0,15.0,0.0,8.0,8.0,6.0,12.0,1.0,0.0,11.0,2.0,3.0,8.0,3.0,3.0,7.0,0.0,0.0,7.0,9.0,6.0,2.0,3.0,16.0,10.0,17.0,4.0,2.0,10.0,12.0,14.0,7.0,4.0,8.0,8.0,0.0,5.0,5.0,2.0,2.0,1.0,1.0,4.0,2.0,2.0,15.0,6.0,1.0,1.0,10.0,10.0,5.0,7.0,15.0,3.0,4.0,3.0,8.0,11.0,0.0,9.0,0.0,2.0,8.0,14.0,11.0,6.0,1.0,10.0,17.0,0.0,2.0,3.0,12.0,12.0,1.0,10.0,22.0,4.0,0.0,11.0,3.0,15.0,18.0,9.0,10.0,3.0,7.0,10.0,0.0,0.0,4.0,0.0,1.0,11.0,7.0,6.0,0.0,4.0,6.0,0.0,0.0,3.0,5.0,2.0,3.0,6.0,2.0,4.0,0.0,9.0,0.0,0.0,3.0,11.0,3.0,1.0,5.0,7.0,3.0,1.0,0.0,4.0,3.0,2.0,5.0,2.0,6.0,5.0,7.0,10.0,8.0,6.0,3.0,0.0,0.0,3.0,4.0,5.0,0.0,11.0,0.0,4.0,2.0,14.0,7.0,24.0,0.0,1.0,7.0,7.0,5.0,5.0,8.0,0.0,4.0,0.0,17.0,1.0,2.0,0.0,2.0,3.0,15.0,0.0,4.0,1.0,1.0,0.0,3.0,2.0,8.0,0.0,0.0,9.0,0.0,15.0,16.0,0.0,3.0,2.0,1.0,16.0,17.0,1.0,0.0,5.0,8.0,20.0,4.0,2.0,4.0,6.0,3.0,0.0,6.0,0.0,2.0,9.0,1.0,0.0,3.0,1.0,10.0,4.0,11.0,2.0,11.0,1.0,2.0,2.0,2.0,9.0,0.0,9.0,7.0,0.0,0.0,1.0,6.0,0.0,1.0,2.0,5.0,1.0,20.0,2.0,2.0,0.0,2.0,10.0,15.0,0.0,16.0,7.0,13.0,2.0,1.0,1.0,3.0,11.0,6.0,16.0,1.0,1.0,12.0,11.0,15.0,0.0,3.0,0.0,1.0,0.0,7.0,6.0,0.0,2.0,18.0,6.0,3.0,5.0,17.0,13.0,2.0,15.0,0.0,7.0,9.0,16.0,16.0,0.0,1.0,18.0,0.0,0.0,13.0,9.0,7.0,1.0,15.0,0.0,1.0,5.0,0.0,2.0,2.0,1.0,3.0,3.0,8.0,1.0,1.0,4.0,22.0,12.0,11.0,6.0,4.0,1.0,12.0,7.0,5.0,0.0,23.0,0.0,11.0,9.0,0.0,7.0,11.0,8.0,17.0,1.0,1.0,4.0,8.0,0.0,11.0,1.0,2.0,4.0,11.0,3.0,5.0,12.0,6.0,5.0,1.0,6.0,0.0,0.0,3.0,2.0,2.0,7.0,1.0,0.0,14.0,4.0,1.0,7.0,5.0,4.0,6.0,4.0,1.0,3.0,2.0,0.0,1.0,0.0,0.0,1.0,1.0,16.0,9.0,7.0,1.0,3.0,15.0,8.0,7.0,16.0,10.0,0.0,8.0,11.0,5.0,7.0,7.0,17.0,7.0,3.0,10.0,3.0,10.0,11.0,8.0,6.0,16.0,4.0,6.0,20.0],"r":[0.3479267522002667,0.44784977576708496,0.33972774929144345,0.21048045826561523,0.2336471301720804,0.5423516894389433,0.9673468571316568,0.6475395527006189,0.515440687859094,0.7143481262441309,0.7975575982537235,0.9164583872206564,0.5719827959875512,0.8858429604799474,0.5574144351371113,0.02585463413671607,0.36359121752449575,0.13593888588635394,0.9016283497032866,0.04852257866915499,0.8531617748389513,0.07337282486319818,0.6048897117282981,0.9798333495010849,0.02277563569020269,0.5393098547409494,0.03147358220539931,0.19267102220963905,0.3748771864171281,0.9010291694445935,0.016349460278265227,0.6168020733503028,0.006707653337531427,0.43534582314735193,0.28554709628804953,0.6299024263373789,0.31483779461362316,0.9796101963674071,0.43855099845765655,0.5369396646680868,0.3422246042771515,0.06597268274703327,0.9319030134740642,0.3482843043472341,0.008313485045767788,0.8092358489977536,0.24559854365301037,0.26097632488125466,0.38046511026259333,0.8238057982059701,0.473025899909431,0.17251010312353765,0.7403800742847118,0.9093786654137115,0.09371356985581936,0.7920228327132277,0.5857913916227284,0.7134739437751776,0.6981998220837591,0.3961659039977763,0.5791310008828319,0.964907115621706,0.24258032070935687,0.2815502572828277,0.9099643114775178,0.3713558174167175,0.17987964721961625,0.816882324583027,0.9262442465768652,0.5215366755158755,0.00890189456666457,0.7888999522993272,0.4283165654395984,0.48492752294270414,0.5950123068473285,0.9712911435898031,0.7184747049898113,0.8166302335547608,0.18656572360129298,0.7598327817367596,0.30273796688341803,0.12089134958912107,0.6288780497768827,0.14740330898543674,0.9111418137090237,0.08144692938201792,0.19789736355231047,0.15261361020506792,0.7590886396506604,0.3937056882910501,0.7239582282131132,0.9241694094092163,0.3359826944561637,0.7560005830071259,0.7954232356230957,0.8750834448508236,0.4418995898966678,0.14549647644327557,0.26298406222113546,0.8849903304239373,0.1310545190660568,0.9722850036335702,0.20905847240689868,0.08820778157769893,0.34939027560926483,0.5098054084117338,0.7693365119868458,0.8298436231394997,0.5506233818692685,0.8412960188607252,0.5226024742678856,0.24161874938933114,0.3807242778251989,0.34587520529669247,0.593039072924056,0.3460538110503051,0.42374335578725253,0.5768251043808574,0.5107047400339231,0.4248022977938162,0.1827245180977186,0.26242290170813387,0.2975136813459698,0.36791892854052044,0.0048875523266995735,0.838035487120101,0.6703974318000538,0.33964561690121764,0.48805700712367406,0.397798516322847,0.005883882775696847,0.39425005456494144,0.39128588861389235,0.19031694941366517,0.6445000005889792,0.8352290507515929,0.39316045123414023,0.5916919292184233,0.7771281049664207,0.9874277013294055,0.7228820940702436,0.2591309627799665,0.8653377662646602,0.9464939503027145,0.24351728018607433,0.4480800893215411,0.9531557105531958,0.008476254987249021,0.14212809704937923,0.9355690409410646,0.4502813930689151,0.029513531239068413,0.9539812151725202,0.6579006342339195,0.01538443477498097,0.038074593754089614,0.6684022595323393,0.516299720994807,0.2847150249583079,0.7213347408564739,0.10960887734293734,0.4930996454899541,0.2997131046640944,0.8893257523012634,0.9248420252380922,0.011327491768531317,0.5347754780380511,0.023500384909415084,0.8782273438648183,0.210694847538758,0.3572768796513408,0.6058430136400126,0.5537434401891164,0.37122213120077974,0.8578477740192021,0.024786151993583472,0.13885746007756206,0.8713840959208605,0.2569597037064808,0.2465565610130045,0.4285087639913847,0.6582806148552165,0.1482688269274437,0.15870868974300034,0.0635789719098383,0.5014813298389065,0.9488463991028979,0.2310945464835883,0.23179673857942573,0.916960243068585,0.7056769970605916,0.21022668653628918,0.7786979589680336,0.11567680749921938,0.030436131793357912,0.5786929399935636,0.2621913438321932,0.8015535238683327,0.9636510455754339,0.6342710709343404,0.6703895382709033,0.710036334249051,0.6361253988648341,0.4607745190644217,0.06561364698171945,0.6992613455979919,0.9335998645405175,0.03830613500831337,0.15274214284616594,0.1597296120987013,0.5615496131346733,0.32875747087084006,0.8729451794151224,0.6683426686414957,0.03956178875807437,0.2795927111463119,0.1753763520985958,0.34564106288913554,0.3060671050865795,0.8627990864945154,0.8382270928874571,0.23123892713469374,0.6825517425417698,0.3881897953784592,0.3747807626782631,0.505063136149863,0.35394350440509204,0.37840157680040476,0.3479625628434404,0.3536705817230248,0.32194846287938894,0.2782056411906988,0.4944041935662358,0.699948495452742,0.40714026932336367,0.11764378170536194,0.8985197819976032,0.3477950280045021,0.726672447644457,0.42516954777323246,0.099833180392501,0.9665022834571835,0.5584564259186893,0.5753641658004207,0.502231295019796,0.7807529189355573,0.9938143822891226,0.23141288334566323,0.3542467917131684,0.48377854637519757,0.8149060040261571,0.06905970905786751,0.1795726440024492,0.19858617662039668,0.800042674434734,0.1158270589879542,0.002371655811921336,0.18030135568206096,0.14716769481917402,0.8774380633562018,0.6784223447707294,0.06515039299659886,0.47444050186890596,0.03431033874589429,0.33841654928856424,0.6679022721689789,0.44860438585870543,0.521597753919528,0.6447851253297441,0.2257896344742425,0.3561318207759283,0.6305443642530868,0.9584708883946187,0.05777977928637257,0.7360493162025645,0.4754748185251487,0.8774641294464371,0.7455972725677096,0.05291440320786189,0.942790515230735,0.6931325888060151,0.3437623583844134,0.5555224565753587,0.6484015842676423,0.6518805373514955,0.5078947692435805,0.44229418906805407,0.5106647690866191,0.002859512961524091,0.9363642487025372,0.5034774319379287,0.8612057608362469,0.6658316064010572,0.763012808382971,0.8236506766368512,0.8034572335693024,0.12811649536235192,0.27033378387448237,0.9449054132160555,0.8295110196623332,0.7305536911916912,0.6483227796495612,0.8901061062535771,0.6228163082617493,0.6069430362220489,0.22746902300081828,0.734931522012497,0.39405911037581376,0.8274091480426895,0.22196723000540342,0.7502192422574245,0.6152346121747017,0.1515256207242719,0.5267656847911333,0.18552722828927037,0.08912970431418565,0.11635678168898678,0.3026880823214584,0.9106562363964301,0.46861685533230424,0.1999190449838082,0.25134205156704614,0.2365949688492468,0.4481663224877219,0.9056622369299352,0.08577669994788972,0.3714954106854753,0.6827798717575633,0.6986008521708065,0.42505901931890655,0.333880477347142,0.611700580256316,0.8528118682442469,0.3330029704968962,0.7929268904814375,0.15206914605139277,0.5674618344704492,0.21147502438464483,0.3488557202318838,0.16595794676666253,0.8252179213752306,0.5763358168732595,0.43849840405088014,0.4099918415189929,0.9242719377999757,0.38189203220220014,0.9007693732275903,0.10306301755523961,0.7183778097093008,0.8327076568664735,0.1425393848191825,0.885069251100675,0.5360281799439748,0.3098011791805366,0.6884241200409331,0.24958091906741342,0.9659864272472951,0.39339358624107756,0.021434160442106,0.7981947504305176,0.9400425176214051,0.8459107204958114,0.07172096209320311,0.31693526016714046,0.1952628645864547,0.4927011454308625,0.9139771105403771,0.9248554163376852,0.7227009657157222,0.8520174583196445,0.08288982043772286,0.5758918987311328,0.6244363316760682,0.7522049725629163,0.9851972740403661,0.06508088033429793,0.67701096980547,0.5362939290014137,0.3985485018567847,0.3120930632255958,0.7104701618944915,0.5422155353806091,0.6626172906012275,0.8728200225052001,0.5368989846554335,0.23888937551068223,0.9080166593091201,0.3135707863274042,0.9116069328865359,0.6564266356737576,0.7006329787158521,0.6017384550498461,0.280028626210836,0.04082049207562122,0.7931358626851601,0.9728563478987682,0.22141240261570938,0.4216574274777394,0.35904771177124206,0.34560895831431804,0.21995998146836815,0.347847303496748,0.8886684303490233,0.8901876611505841,0.6883906582803612,0.16658155959183407,0.596359839740852,0.32368254092459514,0.49524990460455687,0.5903489228760177,0.013361274557375902,0.6233875263963802,0.637036104050501,0.982348421487441,0.8716823752866447,0.5488158378491919,0.1771230449342025,0.6391013728334649,0.9142290549094187,0.5129975350757405,0.015452908295385592,0.5525175868737975,0.1251723519156367,0.28852186570352756,0.23119804382382614,0.5717381481370636,0.9027569770649202,0.7685338101365198,0.1698160049963211,0.353429811273164,0.4598483545805325,0.3775415734172354,0.09480653266326033,0.6772169982456957,0.1382894293941832,0.09653653229643089,0.08117419258201886,0.3832911488382549,0.8093020480440221,0.02381289187908764,0.9079904219631434,0.5339215305887626,0.5667748679949236,0.22776494802660308,0.972631894013152,0.5586889304097025,0.8586583747514169,0.5886158197699876,0.9085805961861091,0.9452551073351778,0.00818891457026294,0.9336137379345173,0.6017822975360017,0.5741347160382919,0.2570613234008472,0.6597575409135137,0.1621776687251344,0.06737274525335035,0.4750345327602079,0.4152823044398417,0.6712797424937718,0.3121470989470547,0.7789924912222665,0.7288075990594598,0.28572870775815806,0.8944976659286097,0.24708050120191039,0.22937115395660412,0.255936269507663,0.42778338890859113,0.16825940035746423,0.4105177322172282,0.8733956630118653,0.7052092686842959,0.13926587936255075,0.367839739911884,0.8104293783233798,0.9675439540630464,0.3056870229058526,0.9386486642368304,0.16338899185599698,0.5386429964063568,0.4673795774445,0.851112151188826,0.2915449628987521,0.5541290995335846,0.9564701172310144,0.04443914105976288,0.46546900244957734,0.11760172829840188,0.38129701752524925,0.06008631198568248,0.8732755050853058,0.6203461547539715,0.36083590215798966,0.4668321261718176,0.8655381973375382,0.8348280686762615,0.8972665985725292,0.5812272401746117,0.36186516407476965,0.33504858632059786,0.4231662441920656,0.8792472211073512,0.3972379813644502,0.5745619272180067,0.45103119189133123,0.36133866410817395,0.757668857879018,0.09366522325310167,0.2503075758383555,0.202030572286237,0.08429819370488123,0.7732821262528096,0.5716291008113772,0.31435860764369217,0.7573715727447909,0.8731348054136598,0.8987460747182938,0.4202890383589599,0.11046662585771783,0.4143140672585699,0.9369723791012647,0.9951183799561714,0.822735073468873,0.5706008372151259,0.4907137194609801,0.5640677411276773,0.5250114312958929,0.9900266948214105,0.09199617188657117,0.9517446852580056,0.5949071697299386,0.38289165596750885,0.3918978854297934,0.5273364075197695,0.6488010630284411,0.17345172920739094,0.04486462936039115,0.8771366896589652,0.2696175828634535,0.39661119250023,0.46625504163749043,0.6736891029943246,0.40988065918458316,0.3304265881878976,0.10846616489233218,0.041121312207663685,0.41350477767553695,0.1585551694228995,0.44686504717573405,0.926716729236952,0.2619053217838976,0.22132193989848536,0.16358287058432674,0.9553739569548061,0.19268981266370022,0.20018398294595263,0.6205931216696055,0.238379223366169,0.5691905199199787,0.7138203782638464,0.6347612193138787,0.038318129157883574,0.9180142896005288,0.21583799308895757,0.1374753752581579,0.10781644792780387,0.4951889725109355,0.6564542333333061,0.0715006136244194,0.8403788896064737,0.45852592375483425,0.5356105404708378,0.1301476836863138,0.8183919225101202,0.22852191631004226,0.05894437865889457,0.11578612290569512,0.7355053554547277,0.1394489339576046,0.5668336578027147,0.21178812987864792,0.7223667138074037,0.5434589828777043,0.6615812265757806,0.03342953147770489,0.20482906768209785,0.4751358635062697,0.7038194475692146,0.4145519235996755,0.14136287693930427,0.4743353331095794,0.04985876476053708,0.3014668175099855,0.9406173325954825,0.8209174311770058,0.6061509896575186,0.07310410909689513,0.7470171137125314,0.09376821531062163,0.2011978298281174,0.14250099505670355,0.42844597700584575,0.9130187566992738,0.2712919833480254,0.6257454150721853,0.3460866716757045,0.8351063539547265,0.613181743694118,0.8296648222314909,0.2532620184233958,0.9141595655091541,0.3918582237636856,0.346883254200552,0.5253931141877759,0.7925792564960688,0.4629139123959023,0.9750984804936607,0.7925414748390351,0.2838334666962987,0.6349066413661006,0.6678989191364366,0.8645479388959911,0.06884189813927533,0.09117055964434306,0.7484848696376498,0.066025242065199,0.8046680163397084,0.41822598176363024,0.6498473429259812,0.3198071239865914,0.9674411421479419,0.018226928747952842,0.4223376705155626,0.9834279133448744,0.5401195517936759,0.8410336123377475,0.21292614296007906,0.15401463362070644,0.4681805699613806,0.42684240761138104,0.8927439948848408,0.2580376279800516,0.6460693019811854,0.9076983495132107,0.7462276337054161,0.7527061971180995,0.8233309302970895,0.8802234764426178,0.6032343475914186,0.7262931657336729,0.5102361044546531,0.907489724351936,0.6507607206158033,0.6458380596940467,0.20323544273883432,0.4453517708513346,0.25240577969672473,0.7814340322313993,0.003563503816432334,0.10329392848518304,0.31365896165365603,0.3398571709765883,0.39869146444227566,0.25203368572300966,0.415907801272946,0.13862613377058386,0.7234080792598447,0.687404228933661,0.7363682311759308,0.16101729123657194,0.6273164847811448,0.5111408281016105,0.7781550607867012,0.6316746228638179,0.7299253735529334,0.3044118432948435,0.7003531523865323,0.26841624653204477,0.4769111448141632,0.5270183387490384,0.7039940872825372,0.7269915505527649,0.5337967867371576,0.9922058039540878,0.9714645497024463,0.33303988186456635,0.15997671557155657,0.068823191249624,0.8847669947617507,0.33096473753604005,0.8235796004047482,0.4863899311600739,0.9413819035163786,0.01836163849173711,0.1976678940690304,0.9115920100131214,0.18304560287441207,0.8784991572154741,0.745331847880107,0.7301941517995507,0.9370109162442026,0.2836162529896751,0.43198364980887716,0.3300094774758171,0.24094985432005056,0.5723015147058736,0.616602905489938,0.5943456775575744,0.3116363476475843,0.33585097596437086,0.5421021907397285,0.9469141506978656,0.007735075308195505,0.20037206788161077,0.925175386849171,0.021549277234591546,0.30044829943221907,0.21100496548024505,0.3967146173465239,0.5793524726884698,0.39785902991955546,0.47449397298339147,0.6931629781914652,0.3855350619754865,0.09996419663909473,0.9589425120421569,0.727973144104811,0.07066567754462039,0.07656325480525439,0.43033935600077,0.2678148953565944,0.6437219553848896,0.2605353460710276,0.1632580800673833,0.4881167707480427,0.2901370712708262,0.24499230736960387,0.044302664204786346,0.24855838018149545,0.7393105823319797,0.18885107510898602,0.6123621614929169,0.09036109242355939,0.3706004288737963,0.7522229408338919,0.7849185489244352,0.6743644234285675,0.697654478372864,0.7669950542208424,0.155691091507836,0.033361620951235293,0.9465812227426271,0.4968532164476074,0.9820690539736645,0.6560055740372539,0.5511090412837825,0.053061816485440394,0.2991536776890946,0.5617745090086461,0.3861442931134098,0.5072479151195453,0.9942089055356966,0.16576911499682856,0.27825539649985864,0.08101178493798922,0.9476362558485865,0.3579726040886837,0.2166659892279552,0.7606572963837843,0.30056945296899396,0.7232498656165367,0.07939855497098014,0.9763061716380053,0.06506548708384985,0.3990544272548413,0.33666715895437793,0.11451733064585867,0.9644577272872901,0.3032029686650779,0.14787229447148786,0.6709406443044705,0.5168528712899505,0.45749752586405146,0.2582879397650293,0.36907399390001694,0.08864141505893564,0.9544887188267459,0.016964909982631227,0.39804782888134027,0.2174263177909257,0.13717826002615707,0.8112678899978756,0.5223761444282398,0.05465500896601161,0.7820873091131579,0.12786733817485008,0.8478574152929994,0.8712502239308133,0.872901373395093,0.5328181185249392,0.20883401205843688,0.2743719143488683,0.8325746677643528,0.7022711658044662,0.2607008352514957,0.4134010549611591,0.9873724307176286,0.8636783578379503,0.7618458012584934,0.3132308804395081,0.3960591677595462,0.011957071608448944,0.20616633747836133,0.3920310545299617,0.2562189145395448,0.11242831547881571,0.026476422314970716,0.7243055422040254,0.4607572428613027,0.9735818735064634,0.6037081914825599,0.4559941645409844,0.467396054362188,0.8345013290823642,0.2589736077327336,0.4136072059844307,0.5243601818010826,0.1472851543815552,0.419114674397818,0.7105986609032118,0.09518908410848392,0.4886935098072549,0.012162143066455577,0.11833614850993279,0.5087458970914225,0.5020247790180312,0.5066266003871058,0.7059566195347489,0.5786265271878843,0.16927952125145218,0.9540937816104258,0.03431925486400189,0.3176231882226179,0.12077984363181771,0.2830743265813507,0.3691118875498063,0.7981354236499119,0.18806734957705995,0.9400740698042247,0.08842280987566009,0.8177897960507015,0.7866384042879895,0.8432646120413028,0.31866804804692483,0.11924332678969884,0.5909003437490936,0.28565711918044445,0.46344815024065,0.9148059662282841,0.005218262387625572,0.3216310475148305,0.42039934789894806,0.8899718657067088,0.03870364688748085,0.6472709922056425,0.21236665959820256,0.199783701907438,0.13590765190303844,0.7735471794630806,0.5834825176219045,0.6466096484275554,0.04902816985265401,0.5746896354884465,0.17027017782010367,0.24289827684133547,0.5976529981409886,0.7987854197983819,0.7394159607121,0.13337848573336708,0.5750681379327283,0.11308152534958316,0.7905204155992356,0.742447865728797,0.687900004604159,0.466706065516608,0.10064812435625448,0.23388253371337409,0.5840920242826826,0.04705110227439824,0.020375941298805822,0.7707481430440548,0.9420522479261866,0.8017666880193977,0.7305981659271015,0.6561660598708641,0.5630638789466929,0.12914992307271356,0.5712084252102194,0.22389027165379471,0.18256955863688185,0.02186655604393617,0.7108056372529932,0.8245317683448989,0.7589585512459627,0.805120052271356,0.19034623820229135,0.45608839870164153,0.019651909716846605,0.9234828674068833,0.8203955326352903,0.9016071634220664,0.5781286578782525,0.8224121823656749,0.05226014212707608,0.6606484234245125,0.8970546087941558,0.41710404253660416,0.29785403591372495,0.958855619461596,0.34729353575449173,0.4201122169313207,0.024973768686136655,0.6070517540833185,0.43600059572345784,0.8017080506863756,0.8070302775308951,0.7177980218336011,0.9232481372257553,0.07970240483993929,0.30421355487900925,0.9286341003520129,0.5764039020969329,0.9537652705547284,0.5173345179892068,0.8132616204468914,0.23971818054540894,0.3957614591563332,0.1046216427296276,0.43237616587503,0.6792701977456888,0.5742081905040719,0.11940076579695713,0.06667809347944442,0.2415487051806,0.10664707067047963,0.3142488777866477,0.20086268404227647,0.09512808815562224,0.8500480163142006,0.5433952811136789,0.6411461369804545,0.01950573066206318,0.9044835000409002,0.11149634469262137,0.4673416416523959,0.45950481858493464,0.4799602493004971,0.8706246389632464,0.29725606937192217,0.8624830459128083,0.31084947697044685,0.09973466132447051,0.4078683046059519,0.5000219764641785,0.514718924598037,0.25512513393167313,0.13983787210024845,0.26405613753539403,0.3384318435678182,0.9906844658909666,0.7909639590583095,0.9257660934353282,0.43532233347923954,0.2639118938103475,0.30274315097183346,0.3924767390768622,0.9679339010882964,0.7359114100268123,0.25223876295438785,0.22722747143580513,0.9204605799314998,0.13832723496284838,0.4055564663161717,0.16398860928810755,0.33411735758303207,0.7429821914247761,0.2173964833315558,0.39943924097071193,0.49620181979630473,0.4561128675755233,0.10016466852440509,0.8769925762752477,0.6262922741036103,0.10591196982386286,0.6004604980008426,0.6702290903295647,0.46416352120959425,0.8077771255923563],"p":[0.03013676869422013,0.008843973037274333,0.08211929210315119,0.02094077448698353,0.09319553607474035,0.013986717479310684,0.19790547948724013,0.09511737239929152,0.19663085268806496,0.19487052886127387,0.020828835716833985,0.1051666441456367,0.1673034727773721,0.1355774603174189,0.07138062476068181,0.05922770956471464,0.18385986787828512,0.16078465375477974,0.17647546203215314,0.04343538706862926,0.17877791192603862,0.031759424291182815,0.12656143273584583,0.12755024152041303,0.09540157006026631,0.021259677778146503,0.17270030683490198,0.1259842473995239,0.050935907822283216,0.12754062241149558,0.10367487865958425,0.14493509143931402,0.12972677271299218,0.008801233128784558,0.13744145002522865,0.06588952696949422,0.13274385600860242,0.11744559387067413,0.08220618187389994,0.19944405150331457,0.18514820891896977,0.17263643067334222,0.14313309533514837,0.09808343951811782,0.04622843113325157,0.050177335595373324,0.17062213249891156,0.053154489448849686,0.11831094044997857,0.1676912177158587,0.05522792285325706,0.05625569931263885,0.12291685977964706,0.05324757890241623,0.017704828912289108,0.15729996417241093,0.040810394354260864,0.10932156964598155,0.11466099452429357,0.05133019519717488,0.1894056070808801,0.0486815206619208,0.04019979208050204,0.19674638819117407,0.1840469590787499,0.1859345757934189,0.1348164256495048,0.02231019245211692,0.007872348702656807,0.05865022566855767,0.07411612751898566,0.019402316981522772,0.10958981758604498,0.06415356061857995,0.012999891946145105,0.05852986375438918,0.15857557991438687,0.09292523373526174,0.09607694254028445,0.026868256256837197,0.19059634244162058,0.062373428362987364,0.0606206654322286,0.19654642548905638,0.147014069768839,0.058108718039805135,0.05896700017042518,0.07336256617249184,0.1345640361195577,0.04925033470043538,0.029243048219011095,0.09597022185575317,0.14665154893826232,0.04316580198869629,0.1550439682815999,0.08476818999428981,0.0854864411232331,0.02829750533148281,0.19383256320902983,0.028015257629065583,0.18678660096231112,0.12042339313784295,0.1517105951204962,0.016382341589536154,0.03129793307078406,0.1682373751513649,0.015665484684873745,0.018461462089602598,0.024506662270394487,0.18663284002703065,0.12730275439769595,0.17814598816101715,0.022929560544172434,0.11880054900603994,0.0069827770798730265,0.009661550343323146,0.17999628107258125,0.06309360398294399,0.00043413896038710934,0.048098353970010436,0.0037421301401353805,0.12838926352065597,0.08147530020244052,0.14320141336857556,0.11342331993135608,0.14493772791951667,0.11429730819094833,0.0206160275516714,0.027438082251172835,0.19498085058947306,0.09186670046482082,0.03576349203707352,0.16274488967983702,0.07704896611047114,0.019055618109038355,0.0050650755906580525,0.08070241696580012,0.16843971492075172,0.05430315568203579,0.03965685335930918,0.11329413504741344,0.0010657073085284187,0.1435757701311686,0.08630694479520806,0.030242714942562855,0.002686193083693933,0.05076858763101347,0.14756890265977854,0.19823827219524293,0.03139658406019841,0.008113161256085055,0.08888961286909303,0.18978251616517317,0.09844511573036306,0.034014711765523446,0.1553813769503948,0.0017940602564478604,0.03346929900450895,0.14266204480414985,0.17986161776805668,0.05542650722281244,0.019823242591167568,0.04437134885037959,0.02526545056483416,0.1005199699337342,0.06526935936764859,0.05180419597499913,0.113759578417609,0.19201026898945464,0.09056044539451596,0.07525171104846118,0.14129330421249464,0.19401093997048827,0.1632560450273957,0.07088725969380692,0.09129933611694369,0.09055724272756108,0.14262405006475137,0.07911983328191621,0.12321195798667467,0.08001811551342342,0.18042641682004312,0.1821414401318028,0.1538108036029005,0.1007928130107516,0.17680763098286698,0.15107872570122646,0.1070845672101286,0.0869461132516868,0.08728710809741172,0.04769346594735629,0.17645061704779275,0.09473631637159974,0.16365981715801708,0.11604851291572348,0.15156187697297901,0.10192559925223876,0.19068279045881403,0.07999541531594967,0.06077619818687277,0.10765349828973943,0.15575692505843353,0.006095296129786387,0.07358162831342004,0.165304576471605,0.16156147352946162,0.08309696174651765,0.16249720899252096,0.03790200134687854,0.12826141879829814,0.03615545619080316,0.09792865464797057,0.09568050875325956,0.06547355388275715,0.19927594379703387,0.03562332409960263,0.09172848972214803,0.04265393781510203,0.046949950640975624,0.1647118590932619,0.08505059607182863,0.16923314634530937,0.1316044827063044,0.1814118214989211,0.10479342959173749,0.07920540314307521,0.19318602867910062,0.19125023986705286,0.06123717985591753,0.09013480729445722,0.08606150197478435,0.0877319261145567,0.09284245512713873,0.09243578272410131,0.11450404981094171,0.06729732823151245,0.1690895197941764,0.011843569173592128,0.09768164628205063,0.004417098866094405,0.08727856844077292,0.19553562160735027,0.11413982000547396,0.029450374974562533,0.09618653136294096,0.06909955059982212,0.03885836928981981,0.1173613172794767,0.023240531260107257,0.10011317356667684,0.1482171396428393,0.18912438448702518,0.1676030783890549,0.010607399178029909,0.17901110588190364,0.12756135450885334,0.009220662123344603,0.12659227171359974,0.05778658218067641,0.04064480611741433,0.1027170214267089,0.06157099143291953,0.13600494818497966,0.17215897905039196,0.18934305711434984,0.08984363174249328,0.18826390743276208,0.09283846420040974,0.18552232666151836,0.01444090543885448,0.06633452322313418,0.10146107122705361,0.04643634259761327,0.0998454578428774,0.07739999033287691,0.05191121319103997,0.040534275005692025,0.12504794535503688,0.014794245748445123,0.07249120627581829,0.15522559669724043,0.15023492737282418,0.124610629648299,0.038214091270950594,0.05894413351785697,0.1154206016251108,0.024998240532567363,0.0031199905221207303,0.10724362476067228,0.07495113340515362,0.0683995564044814,0.14763309337468683,0.10476651177961226,0.1934490473274938,0.019721335509719398,0.03616220744504419,0.13423087356471167,0.07999436622253393,0.04026691800330773,0.10489740616522708,0.02885538397180536,0.1394464673147422,0.11695657277859005,0.19409002994287514,0.06879278922502281,0.10415957357534729,0.06848421756353114,0.0669151839162153,0.006263888733431289,0.04493053910496103,0.17351151055793418,0.0354602550079385,0.1623143979594088,0.18944740029585494,0.16219852937594645,0.1966019208508504,0.060454374754684494,0.0045266096447669655,0.00900739461013087,0.10891390697184096,0.03415726093522049,0.11683091523613683,0.007625639319713828,0.07002669637785593,0.06848764683929494,0.19940217469119825,0.07786099727053411,0.15783107707419713,0.19447392299025684,0.12548720548874598,0.07789844396940247,0.0008039901076648981,0.1832382210430098,0.09326604339176195,0.017120159930054425,0.07399920906617218,0.12224646072748238,0.0781461429058131,0.01871279866211739,0.12201649228878364,0.18726804582694162,0.14893953548587727,0.09526385517766173,0.13039584556745853,0.05993038930409598,0.03288935550303989,0.0020594972396462464,0.1404759954996044,0.02504289548598875,0.05877278380871856,0.013382818303136946,0.03495021993650212,0.12176496996283076,0.1071661288990101,0.11415019735994991,0.12889599453688838,0.023430207921422898,0.18773088547783834,0.07773067482681727,0.03008435783428336,0.003948432358313392,0.1539623825163642,0.13341107784736456,0.050315920857977675,0.10613040932236678,0.06796425884258768,0.15419084029718075,0.11105351916460529,0.14398942342246063,0.16275479825256467,0.03317851462478973,0.19624362150834732,0.05508287471325506,0.016684700886725246,0.16084098023026505,0.13157598492865588,0.04681852530414976,0.04712463256302049,0.11420569059241648,0.10861180286346324,0.13811292089695557,0.016768014417423285,0.16673477112027518,0.07500549832875639,0.02961368176347312,0.0748434054484302,0.1896900644177392,0.04634598089006059,0.17409822950783213,0.1490016222907566,0.09235430584205387,0.08566286191386929,0.027334632041960516,0.18396204672659802,0.06905926422762453,0.13590264659581927,0.06932689675317075,0.03206289853063633,0.006166542701981781,0.06838273797881107,0.13319580430863223,0.05992191572552361,0.18559422490904065,0.010441884192149687,0.17689532074949668,0.10328608163533787,0.12101445452108704,0.18953706769566595,0.04224984854299092,0.025091425611052154,0.010387857840543725,0.08011967082987553,0.07914226483295406,0.07696867134083739,0.10254823589128335,0.14492478269818046,0.18458084191669127,0.03036877216077474,0.013972899202620903,0.1595024994529645,0.12465951205734234,0.10287857210603596,0.038931192273973236,0.13610712062228503,0.037684059767707195,0.18298191943627182,0.13937514730943015,0.14572662041648196,0.07239637326919146,0.09524316389330348,0.11445774807055012,0.0055785006326424915,0.12666624739585772,0.060956075100367095,0.1963724445340326,0.0018433150404884024,0.113238036196169,0.10200582945374369,0.09769450722134138,0.09812898513961921,0.053092855250694626,0.14145022618900424,0.047348768676408165,0.08720481895417911,0.1706237271718584,0.04737916240987605,0.01450941311522227,0.016106183572791012,0.10847732505133001,0.15629964214693845,0.18260451329777727,0.186318955266221,0.09164774926866306,0.053382716405786956,0.10631083723770224,0.16155504106400886,0.13997165238481224,0.10975045646690247,0.17605483180286702,0.18900444894399385,0.07736403126659078,0.051959079383106135,0.10152237228750396,0.0474864585754808,0.1580163173590549,0.16536711486090191,0.09624715070394246,0.05664567167036512,0.16055944129337343,0.018346933303628844,0.08391079741851382,0.0815067833629299,0.0024127648310477315,0.054318139446400786,0.06175450120943715,0.09197930969248587,0.13950638030840384,0.117461639931568,0.1143733662823256,0.040913944527110724,0.02360754782915575,0.025210826375978802,0.0032093133385993513,0.07562320545695611,0.1448589198705466,0.02104257598466828,0.06906007539051218,0.08378809881702193,0.013869756174457138,0.06139066117706356,0.19664365931332484,0.18520175878838316,0.032743392465622634,0.11127581634495205,0.00613827259848625,0.05464356286717562,0.039879849994755606,0.017460431140515677,0.07645833629506466,0.14287614961115644,0.06203207753475466,0.1524636136507807,0.12738418480345057,0.08265675676488958,0.19384925477386436,0.029186489335717127,0.04090275083858517,0.1788461923899219,0.09519954064590799,0.025609798415221353,0.008509079071586045,0.0007128354588481934,0.10340381807165527,0.0983695845541691,0.024595659449688778,0.13594395211723645,0.06278245192515479,0.005139331696126304,0.10383886803782737,0.05654755234645448,0.14501567156496928,0.19249040495986836,0.11152216428334434,0.1904618928803309,0.13576364938497817,0.10268170101579077,0.18281754233953165,0.15672108087481887,0.07888900384459192,0.11338692721275896,0.16233990750577318,0.049148243773168336,0.17227907999843786,0.12375251548019746,0.16216455786580508,0.029896558505948037,0.01419909055507862,0.13684924017305172,0.10605140609345512,0.013085062898651502,0.16811077398695404,0.13666748820019245,0.09422223220742275,0.1274287697020932,0.021179925398627432,0.183133540391619,0.1472777703450778,0.030355484138865886,0.11515909175038491,0.15462447520018766,0.016227275162267185,0.09873660406163572,0.12149346818993378,0.03637946381102282,0.0020258868417442955,0.1657789488414153,0.13155497406231742,0.034015292519732655,0.09008497537684189,0.12907314250878296,0.09705269087055007,0.1941209342987055,0.10044445105232187,0.08846751151943218,0.19876397882349603,0.17216517365562184,0.09180016410692785,0.19340845135350415,0.19874306255552665,0.13923719274522353,0.060920761591068254,0.03249307691803449,0.09076993611695117,0.13475277566016927,0.06767785634953997,0.10414103724344899,0.11057701848403832,0.10440545716607055,0.14511990039174116,0.053101466054196904,0.1847277933818103,0.006968304255949631,0.168255665780254,0.02064783638554446,0.1187345834980448,0.016531587567217534,0.182358102203483,0.1657925653628396,0.022507054789243953,0.11610485426494642,0.1852370950378655,0.04723177143267008,0.02188287782019112,0.002039480161063878,0.06128150950734379,0.007809497471843275,0.12040852446824815,0.06952650657767818,0.19801298865058553,0.13043488872232145,0.03094912593344881,0.1956503769751181,0.03742786934267155,0.1377391507092483,0.07290963535229569,0.14009840850254435,0.1506590492689397,0.008287623334518202,0.07789678602035846,0.00744617714637168,0.13716786124637284,0.027235225898046257,0.13250417515108448,0.04230441179606817,0.14008151123633233,0.12091225160094853,0.17351647517733992,0.08527931585445514,0.1292930492239513,2.0764621976576694e-5,0.14807373508315444,0.12412803034133618,0.10359943133603933,0.11816300952233699,0.11346806667757586,0.016198052964771836,0.16025758507109955,0.17076708245223293,0.038935380118759126,0.14951432014925695,0.09508505694047797,0.06734809620271394,0.1639714193311128,0.02248318679373216,0.00031300640709610585,0.17778639276191313,0.1563999273730673,0.10452238102477113,0.04987212456641772,0.056128631000729096,0.17723584808731552,0.1519452059619774,0.12647474725724014,0.19635201216625375,0.06479313047898808,0.07446439163258915,0.16937118268265647,0.12088089645150771,0.1989585110847336,0.04513420466990273,0.08528522297117025,0.07746108683882263,0.011548417277530155,0.08657914599010699,0.06747353664386778,0.040352584641934364,0.04625760726381692,0.07647967280381472,0.034461671584019936,0.0428085689876224,0.1996260289375664,0.13623366197667106,0.17430114876653058,0.08910332361343448,0.03691378765205573,0.015079681365956877,0.14735051223879755,0.18033968370451384,0.111791630151482,0.14494249550960908,0.14586056972789962,0.08645477174264733,0.04797666921604389,0.14758084311029607,0.08550693285664407,0.11127646922034203,0.003835598237599092,0.1299724042487814,0.007304701115815071,0.18957000940982335,0.16206019136873062,0.17939591602763333,0.16859803908465146,0.04557696188988354,0.10805787075843831,0.08480720234685908,0.16123708045128807,0.06644332897833163,0.09614931701642915,0.1221849526714176,0.13411780756355932,0.17977890407562588,0.007947533075870084,0.12134498084506343,0.18524014320049684,0.13928515134635946,0.06316147207458589,0.1414529008617905,0.17449922619257263,0.12150849358081715,0.173686975154885,0.08709541812249384,0.09335919542543891,0.1898163450752322,0.10095018429466092,0.16157281844393043,0.024219136518969855,0.004203631209069592,0.05291936462470481,0.01606119198185132,0.06553826774779084,0.18968963540667416,0.1225142245167636,0.04543546364418312,0.028585228753215255,0.18360510556438514,0.10210419014362558,0.010129525920805182,0.035330822911207836,0.07365890294741528,0.19487543424954576,0.03137294543286533,0.07496762532648509,0.09395538606123442,0.05873084975377614,0.1408494437817682,0.10305444953306418,0.10967986983300043,0.00826854781295685,0.044782087047440244,0.0928980271442331,0.1799755566389042,0.08376622537015987,0.011987993816513588,0.16069838608255946,0.10812466731715947,0.1765621541757848,0.028638939502242167,0.03570953947146465,0.12115962639922091,0.10339049255798871,0.03688863843455779,0.09136974599170129,0.09497450209514646,0.1507018299855418,0.07907948438641128,0.1404863332382551,0.15251150118924503,0.187831071339265,0.05968903013142222,0.09006025575806015,0.05095708688764078,0.019178752246905573,0.0177662698781659,0.11789641989241671,0.0368365810553502,0.010116851268830685,0.1399563537258052,0.17009602759905348,0.08017214579103604,0.18346179667860515,0.17615605889938607,0.0979853433563882,0.16424582713229927,0.005191798104322221,0.06392004132701805,0.1728846596481907,0.19709409657224086,0.1205880667492504,0.1366625597790801,0.06759066156668601,0.046460021806225264,0.10128107404018519,0.00270651053339388,0.16812011297679202,0.07734687352514441,0.05687957132415833,0.010969071044934699,0.06549566364611561,0.14498740409898356,0.18214367994833816,0.007949212850695187,0.12423634695184194,0.11260021236057849,0.0834902128159659,0.03475119294853015,0.0379594903183961,0.1569098897706005,0.11968447008840993,0.013790427970030628,0.08718737235865107,0.11748436407620583,0.13958417390731245,0.18616701371822564,0.17556559333432864,0.024634052557205077,0.06114040200374924,0.06181462460313103,0.1361541975769252,0.14241253307554821,0.1777669246448158,0.04146512148363923,0.021462379195473204,0.11465131116792966,0.18670028701653388,0.1810475378621373,0.06205058720358565,0.12147280699532317,0.033071234317352614,0.04505685801559998,0.02227983691265494,0.010457301656657637,0.10622526288124892,0.047882471078366434,0.03684149115707749,0.1765511298282485,0.05579299307451553,0.11458405907287546,0.19068175323966075,0.04425705270321028,0.1419986366646621,0.030763636099283342,0.18046257979689126,0.11807065258703205,0.13567788530768704,0.03515288171633473,0.0410879212810352,0.04309777450875707,0.03826258896374979,0.13389299308678862,0.1526840619473112,0.14544228818347676,0.16179843220349588,0.07282544894776861,0.0089392251154651,0.05968591430120532,0.116412257674462,0.0012811742374732038,0.12820309270897842,0.04711305680264908,0.16730152063617704,0.1207429539761821,0.1444334431796075,0.1836021090777492,0.07342464277330958,0.06281935381969084,0.03975993964289329,0.12279568419727038,0.15818195755803113,0.0736470165940768,0.1164349987459925,0.1314783040142733,0.1606642456335918,0.01389730368740505,0.0328484849639497,0.06523502226049849,0.0849431949353095,0.1496310114792375,0.1058967392437896,0.17562903397995522,0.005414448456238886,0.07583843418939967,0.14907022909233927,0.16558196624068477,0.17199392355762672,0.024713052059310847,0.07887985768029218,0.007553780249144815,0.037530230090638474,0.054744107080659625,0.11720664748145504,0.12693442556361054,0.08508427710921294,0.09396515398068993,0.1903929905854389,0.11220238753458625,0.12905494102074752,0.06606680239640648,0.17838772475350695,0.11467008501424468,0.09042061604319906,0.16515237846415132,0.030446629900935076,0.06946322606198839,0.1667989787826385,0.1508535672168917,0.19748499639831976,0.028657699285166684,0.14615225400766013,0.19045842678074926,0.02779907628422831,0.12649244605581678,0.19805848604155402,0.12605666992263026,0.10396204792652962,0.022409977326137077,0.14370650932377133,0.015001339496723488,0.16961853268925686,0.07119753034327662,0.018157108105754105,0.1620898231384604,0.07306743783352627,0.04943091955150436,0.10968524256086326,0.08690009045042504,0.13213258666312264,0.02856288850020361,0.06671116516220188,0.11180398871402795,0.17667480637249777,0.14877823686540972,0.0830432242207062,0.06657891384131313,0.10441529160675499,0.11328884980779669,0.11840767544571143,0.04806979619106766,0.10255017667915577,0.004685898765412722,0.17213588551041137,0.047991343500634324,0.12775305943894286,0.17726369772599196,0.0040808757751984006,0.07551661500473683,0.08961915251622164,0.06763008894807335,0.1604387476840322,0.0390124320734508,0.14341384167045554,0.1075612686765079,0.10398534656060772,0.019515308943294674,0.15781640845641884,0.013738012247145371,0.12612444619677987,0.15026956577595893,0.15533994316820363,0.16949684445884594,0.13520010457716677,0.16855870220895272,0.12692900462238135,0.17425125362297122,0.09238083311800512,0.08496998624338015,0.01727886327894104,0.07672313036866947,0.14898192340524666,0.14002637764068995,0.10758535052808554,0.07797842734786312,0.011642627774740344,0.060177936120215936,0.17088753866353656,0.13343748640880002,0.020794662900027253,0.09038104669980195,0.06519248164573765,0.15141396272517046,0.1251378460322303,0.10531783190648675,0.1410746496127304,0.14281432223494958,0.11105293653856019,0.06732445328817009,0.11625130509279091,0.13345573543696898,0.14153315390331228,0.15377607445040997,0.03208212172687879,0.11874936967389634,0.14544014975964395,0.0865173644396584,0.05653951518162224,0.07138191445179771,0.18154987810109,0.10814382786523105,0.15727530850124422,0.19311103663602558,0.157117597011686,0.028926127664414204,0.054620542894351365,0.17230322896205694,0.14841373249531134,0.15472953010431936,0.0977634541622253,0.17482824646390435,0.13443207290759404,0.14423010079353235,0.12201501901503287,0.14492979776315043,0.18805277887682503,0.15684012193108687,0.09249102935640333,0.11510012977899815,0.17977533037092097,0.13564768963781157,0.08115975707958718,0.17780274858075784],"n":[55.0,5.0,54.0,60.0,100.0,91.0,96.0,79.0,38.0,22.0,4.0,87.0,15.0,55.0,5.0,35.0,36.0,12.0,49.0,75.0,92.0,86.0,74.0,5.0,68.0,10.0,6.0,42.0,95.0,40.0,24.0,28.0,69.0,4.0,30.0,62.0,15.0,43.0,12.0,36.0,95.0,35.0,44.0,41.0,74.0,18.0,43.0,42.0,90.0,58.0,27.0,50.0,11.0,73.0,66.0,97.0,83.0,64.0,74.0,6.0,3.0,54.0,14.0,99.0,71.0,72.0,52.0,6.0,73.0,16.0,43.0,98.0,45.0,80.0,31.0,76.0,77.0,17.0,21.0,69.0,87.0,10.0,98.0,36.0,9.0,75.0,17.0,7.0,74.0,52.0,36.0,84.0,39.0,10.0,85.0,74.0,78.0,81.0,27.0,83.0,36.0,89.0,21.0,70.0,0.0,91.0,62.0,17.0,85.0,61.0,52.0,72.0,60.0,100.0,68.0,92.0,22.0,19.0,55.0,76.0,2.0,79.0,9.0,21.0,70.0,64.0,68.0,41.0,29.0,92.0,52.0,13.0,70.0,98.0,7.0,9.0,42.0,77.0,4.0,63.0,48.0,72.0,74.0,16.0,72.0,84.0,36.0,10.0,78.0,63.0,90.0,96.0,61.0,12.0,45.0,16.0,22.0,30.0,49.0,98.0,71.0,2.0,1.0,40.0,20.0,78.0,88.0,27.0,32.0,47.0,39.0,93.0,69.0,28.0,93.0,30.0,22.0,95.0,64.0,13.0,6.0,99.0,28.0,96.0,20.0,64.0,11.0,95.0,29.0,24.0,56.0,62.0,81.0,31.0,89.0,43.0,26.0,93.0,79.0,39.0,94.0,66.0,55.0,47.0,11.0,41.0,5.0,37.0,71.0,15.0,95.0,32.0,55.0,0.0,48.0,37.0,71.0,37.0,67.0,80.0,27.0,65.0,24.0,15.0,9.0,58.0,49.0,7.0,69.0,27.0,38.0,91.0,28.0,31.0,59.0,64.0,51.0,39.0,50.0,91.0,39.0,96.0,96.0,44.0,14.0,94.0,58.0,31.0,42.0,77.0,30.0,2.0,74.0,26.0,78.0,16.0,95.0,27.0,38.0,95.0,54.0,54.0,3.0,2.0,44.0,90.0,20.0,16.0,65.0,74.0,80.0,35.0,40.0,5.0,6.0,95.0,57.0,66.0,92.0,61.0,53.0,4.0,24.0,21.0,21.0,11.0,19.0,17.0,51.0,19.0,27.0,14.0,68.0,31.0,38.0,90.0,72.0,26.0,61.0,4.0,34.0,46.0,67.0,7.0,53.0,49.0,86.0,65.0,61.0,24.0,24.0,76.0,24.0,54.0,47.0,40.0,20.0,33.0,20.0,3.0,2.0,79.0,44.0,88.0,15.0,63.0,40.0,78.0,47.0,55.0,83.0,41.0,13.0,36.0,86.0,41.0,74.0,39.0,92.0,2.0,75.0,30.0,33.0,81.0,1.0,90.0,96.0,72.0,73.0,99.0,97.0,30.0,44.0,35.0,88.0,47.0,21.0,74.0,75.0,20.0,35.0,11.0,63.0,28.0,96.0,57.0,48.0,9.0,46.0,61.0,3.0,2.0,24.0,35.0,84.0,81.0,36.0,70.0,50.0,13.0,39.0,29.0,93.0,28.0,33.0,6.0,74.0,93.0,71.0,78.0,88.0,43.0,8.0,82.0,14.0,46.0,86.0,57.0,76.0,40.0,72.0,98.0,70.0,57.0,84.0,8.0,24.0,66.0,19.0,61.0,74.0,86.0,62.0,54.0,73.0,7.0,54.0,22.0,84.0,51.0,31.0,72.0,47.0,21.0,99.0,22.0,53.0,33.0,27.0,80.0,64.0,56.0,55.0,46.0,51.0,36.0,58.0,99.0,34.0,25.0,38.0,58.0,23.0,23.0,49.0,36.0,51.0,42.0,52.0,5.0,63.0,81.0,78.0,82.0,96.0,20.0,44.0,26.0,94.0,10.0,95.0,45.0,33.0,76.0,5.0,22.0,31.0,58.0,3.0,92.0,45.0,43.0,56.0,58.0,89.0,0.0,27.0,62.0,95.0,79.0,27.0,79.0,12.0,55.0,4.0,60.0,1.0,66.0,64.0,60.0,46.0,74.0,9.0,3.0,39.0,69.0,64.0,98.0,8.0,24.0,42.0,10.0,5.0,60.0,66.0,31.0,14.0,0.0,19.0,84.0,38.0,71.0,10.0,94.0,10.0,49.0,17.0,95.0,29.0,71.0,82.0,24.0,96.0,9.0,55.0,31.0,53.0,37.0,30.0,80.0,15.0,67.0,38.0,87.0,80.0,68.0,76.0,99.0,65.0,82.0,48.0,41.0,72.0,61.0,50.0,48.0,62.0,69.0,56.0,10.0,14.0,52.0,16.0,42.0,28.0,51.0,78.0,33.0,7.0,56.0,6.0,34.0,24.0,54.0,73.0,61.0,10.0,78.0,44.0,97.0,21.0,18.0,89.0,45.0,44.0,82.0,74.0,54.0,5.0,99.0,47.0,66.0,36.0,69.0,17.0,74.0,95.0,39.0,72.0,19.0,12.0,15.0,70.0,88.0,3.0,49.0,47.0,25.0,29.0,2.0,60.0,77.0,30.0,77.0,69.0,75.0,7.0,81.0,43.0,63.0,10.0,50.0,78.0,89.0,20.0,97.0,97.0,84.0,73.0,11.0,66.0,58.0,51.0,78.0,27.0,13.0,57.0,31.0,55.0,60.0,31.0,55.0,24.0,24.0,92.0,19.0,54.0,43.0,71.0,92.0,95.0,73.0,99.0,28.0,28.0,86.0,62.0,99.0,27.0,43.0,84.0,91.0,36.0,35.0,62.0,42.0,75.0,12.0,55.0,60.0,44.0,35.0,99.0,76.0,33.0,93.0,71.0,78.0,38.0,39.0,92.0,56.0,65.0,20.0,78.0,87.0,42.0,80.0,2.0,13.0,50.0,77.0,56.0,96.0,6.0,51.0,68.0,6.0,46.0,49.0,64.0,75.0,78.0,86.0,89.0,70.0,2.0,54.0,26.0,95.0,89.0,83.0,69.0,21.0,72.0,73.0,16.0,78.0,61.0,5.0,31.0,64.0,60.0,64.0,40.0,29.0,36.0,60.0,31.0,69.0,30.0,66.0,51.0,69.0,29.0,35.0,12.0,46.0,4.0,25.0,62.0,63.0,48.0,65.0,41.0,90.0,17.0,73.0,2.0,68.0,38.0,35.0,76.0,18.0,67.0,73.0,40.0,52.0,37.0,90.0,24.0,34.0,31.0,76.0,33.0,51.0,20.0,75.0,13.0,71.0,9.0,84.0,76.0,90.0,73.0,34.0,61.0,21.0,48.0,51.0,97.0,8.0,34.0,29.0,65.0,45.0,43.0,41.0,62.0,7.0,92.0,74.0,25.0,11.0,21.0,21.0,87.0,30.0,35.0,76.0,8.0,96.0,3.0,68.0,88.0,3.0,32.0,71.0,2.0,85.0,72.0,37.0,56.0,58.0,33.0,99.0,98.0,22.0,31.0,91.0,91.0,93.0,64.0,44.0,93.0,56.0,38.0,14.0,42.0,20.0,73.0,44.0,56.0,17.0,81.0,20.0,70.0,62.0,54.0,90.0,2.0,51.0,67.0,1.0,47.0,54.0,52.0,96.0,12.0,27.0,26.0,20.0,95.0,34.0,40.0,26.0,72.0,87.0,78.0,10.0,92.0,88.0,62.0,79.0,9.0,24.0,68.0,67.0,72.0,95.0,74.0,70.0,90.0,68.0,64.0,57.0,37.0,27.0,78.0,7.0,48.0,45.0,3.0,60.0,90.0,76.0,32.0,64.0,79.0,94.0,41.0,85.0,53.0,82.0,42.0,95.0,84.0,23.0,17.0,93.0,28.0,16.0,56.0,42.0,47.0,38.0,96.0,9.0,18.0,71.0,25.0,26.0,93.0,14.0,20.0,22.0,46.0,71.0,26.0,91.0,96.0,62.0,88.0,83.0,27.0,33.0,92.0,98.0,54.0,84.0,95.0,16.0,90.0,92.0,21.0,99.0,95.0,90.0,95.0,4.0,25.0,49.0,43.0,25.0,42.0,91.0,10.0,37.0,74.0,31.0,38.0,65.0,42.0,43.0,35.0,94.0,49.0,13.0,28.0,30.0,10.0,82.0,94.0,30.0,58.0,52.0,63.0,87.0,81.0,17.0,59.0,26.0,8.0,38.0,24.0,5.0,12.0,9.0,9.0,13.0,57.0,73.0,46.0,45.0,25.0,59.0,94.0,79.0,22.0,74.0,80.0,16.0,95.0,88.0,36.0,64.0,84.0,87.0,72.0,27.0,84.0,24.0,74.0,50.0,79.0,86.0,83.0,27.0,73.0,95.0]}
},{}],32:[function(require,module,exports){
module.exports={"expected":[10.0,17.0,8.0,13.0,5.0,4.0,6.0,1.0,13.0,2.0,11.0,13.0,4.0,8.0,18.0,18.0,10.0,7.0,8.0,4.0,12.0,2.0,1.0,6.0,11.0,14.0,8.0,7.0,0.0,0.0,11.0,10.0,8.0,4.0,2.0,14.0,12.0,11.0,13.0,6.0,15.0,12.0,14.0,3.0,10.0,4.0,1.0,1.0,12.0,7.0,12.0,11.0,3.0,6.0,9.0,12.0,7.0,13.0,8.0,16.0,13.0,11.0,7.0,1.0,9.0,4.0,15.0,13.0,0.0,16.0,13.0,16.0,9.0,2.0,8.0,12.0,8.0,5.0,3.0,15.0,6.0,1.0,7.0,1.0,16.0,10.0,2.0,7.0,16.0,3.0,9.0,10.0,10.0,15.0,8.0,15.0,9.0,7.0,4.0,10.0,12.0,0.0,12.0,10.0,18.0,11.0,9.0,4.0,12.0,9.0,7.0,10.0,0.0,17.0,15.0,18.0,15.0,6.0,15.0,3.0,4.0,2.0,9.0,9.0,12.0,14.0,11.0,13.0,16.0,17.0,9.0,7.0,16.0,0.0,17.0,8.0,7.0,9.0,14.0,8.0,4.0,1.0,6.0,16.0,19.0,16.0,3.0,3.0,0.0,11.0,2.0,10.0,6.0,5.0,4.0,4.0,7.0,5.0,17.0,16.0,1.0,6.0,10.0,17.0,3.0,7.0,18.0,2.0,4.0,11.0,16.0,14.0,6.0,19.0,16.0,1.0,16.0,6.0,6.0,8.0,3.0,9.0,1.0,1.0,1.0,15.0,7.0,1.0,4.0,16.0,13.0,18.0,2.0,16.0,6.0,10.0,14.0,1.0,3.0,11.0,5.0,9.0,15.0,11.0,2.0,5.0,8.0,12.0,14.0,9.0,10.0,3.0,16.0,11.0,9.0,14.0,19.0,19.0,7.0,4.0,5.0,14.0,0.0,16.0,6.0,1.0,9.0,15.0,10.0,17.0,7.0,6.0,9.0,11.0,1.0,8.0,16.0,18.0,12.0,18.0,18.0,3.0,13.0,12.0,1.0,4.0,9.0,5.0,17.0,17.0,12.0,12.0,20.0,1.0,15.0,9.0,5.0,7.0,4.0,8.0,3.0,11.0,8.0,10.0,12.0,4.0,3.0,7.0,0.0,2.0,15.0,9.0,11.0,19.0,6.0,14.0,20.0,13.0,0.0,13.0,8.0,20.0,8.0,3.0,3.0,8.0,4.0,15.0,9.0,14.0,12.0,9.0,14.0,7.0,8.0,20.0,4.0,9.0,14.0,13.0,8.0,15.0,15.0,5.0,5.0,10.0,18.0,15.0,11.0,6.0,7.0,2.0,14.0,7.0,10.0,4.0,11.0,7.0,10.0,4.0,9.0,13.0,3.0,4.0,1.0,0.0,18.0,2.0,6.0,10.0,6.0,0.0,8.0,6.0,0.0,13.0,4.0,6.0,1.0,9.0,2.0,4.0,17.0,3.0,10.0,5.0,14.0,1.0,17.0,7.0,17.0,3.0,12.0,10.0,11.0,16.0,4.0,7.0,7.0,6.0,9.0,5.0,11.0,13.0,3.0,7.0,15.0,16.0,12.0,16.0,3.0,6.0,13.0,11.0,1.0,3.0,2.0,5.0,1.0,7.0,1.0,13.0,14.0,4.0,2.0,16.0,9.0,4.0,1.0,10.0,12.0,16.0,3.0,3.0,6.0,13.0,18.0,1.0,4.0,6.0,3.0,18.0,11.0,10.0,11.0,0.0,3.0,9.0,10.0,16.0,2.0,8.0,11.0,14.0,0.0,18.0,1.0,16.0,5.0,12.0,15.0,8.0,7.0,0.0,1.0,10.0,17.0,3.0,5.0,0.0,4.0,16.0,7.0,8.0,2.0,8.0,12.0,13.0,2.0,10.0,3.0,19.0,5.0,2.0,11.0,11.0,12.0,15.0,2.0,8.0,16.0,4.0,11.0,12.0,12.0,16.0,12.0,2.0,7.0,15.0,3.0,1.0,17.0,6.0,14.0,4.0,15.0,4.0,3.0,5.0,3.0,1.0,16.0,9.0,1.0,9.0,7.0,0.0,13.0,12.0,7.0,13.0,17.0,5.0,11.0,11.0,16.0,17.0,7.0,3.0,16.0,1.0,8.0,12.0,13.0,15.0,10.0,12.0,7.0,15.0,2.0,2.0,7.0,17.0,18.0,8.0,1.0,11.0,9.0,11.0,2.0,4.0,9.0,7.0,11.0,3.0,4.0,13.0,18.0,15.0,15.0,14.0,17.0,5.0,12.0,15.0,7.0,2.0,12.0,10.0,11.0,6.0,1.0,3.0,10.0,9.0,11.0,11.0,17.0,20.0,17.0,13.0,14.0,1.0,7.0,4.0,16.0,1.0,15.0,15.0,3.0,3.0,17.0,4.0,5.0,5.0,10.0,9.0,4.0,8.0,2.0,4.0,1.0,0.0,2.0,15.0,3.0,15.0,2.0,2.0,2.0,2.0,15.0,3.0,8.0,5.0,12.0,9.0,7.0,7.0,8.0,11.0,14.0,16.0,18.0,12.0,0.0,20.0,7.0,17.0,1.0,11.0,3.0,6.0,15.0,7.0,6.0,5.0,13.0,11.0,8.0,16.0,16.0,7.0,13.0,6.0,0.0,5.0,14.0,4.0,12.0,16.0,3.0,8.0,15.0,5.0,3.0,9.0,12.0,12.0,15.0,8.0,10.0,7.0,10.0,5.0,4.0,8.0,5.0,6.0,10.0,0.0,9.0,3.0,16.0,6.0,3.0,7.0,2.0,15.0,13.0,2.0,15.0,3.0,8.0,18.0,8.0,11.0,6.0,8.0,10.0,7.0,8.0,11.0,5.0,10.0,5.0,10.0,15.0,6.0,8.0,1.0,13.0,0.0,1.0,9.0,0.0,14.0,6.0,13.0,0.0,6.0,1.0,7.0,4.0,12.0,2.0,7.0,17.0,3.0,1.0,10.0,3.0,8.0,9.0,4.0,13.0,4.0,9.0,16.0,7.0,10.0,6.0,4.0,2.0,1.0,13.0,7.0,17.0,2.0,1.0,3.0,15.0,10.0,5.0,10.0,4.0,4.0,8.0,10.0,17.0,13.0,17.0,1.0,12.0,7.0,0.0,9.0,11.0,6.0,13.0,14.0,18.0,8.0,14.0,8.0,15.0,6.0,14.0,14.0,14.0,5.0,17.0,8.0,10.0,1.0,7.0,15.0,0.0,4.0,11.0,9.0,2.0,6.0,2.0,10.0,2.0,10.0,5.0,9.0,14.0,10.0,1.0,0.0,2.0,15.0,7.0,9.0,3.0,8.0,8.0,16.0,10.0,6.0,7.0,5.0,16.0,15.0,16.0,7.0,5.0,14.0,7.0,13.0,17.0,3.0,9.0,4.0,8.0,4.0,6.0,1.0,9.0,14.0,11.0,2.0,8.0,12.0,12.0,2.0,8.0,17.0,16.0,11.0,10.0,3.0,6.0,6.0,1.0,13.0,19.0,5.0,13.0,8.0,2.0,8.0,11.0,7.0,1.0,11.0,12.0,14.0,17.0,17.0,17.0,14.0,3.0,5.0,9.0,13.0,4.0,10.0,16.0,16.0,7.0,5.0,19.0,3.0,8.0,2.0,6.0,10.0,4.0,9.0,7.0,8.0,2.0,7.0,2.0,13.0,14.0,14.0,17.0,3.0,17.0,11.0,10.0,10.0,4.0,11.0,18.0,9.0,8.0,6.0,12.0,3.0,3.0,1.0,13.0,1.0,4.0,1.0,1.0,17.0,18.0,9.0,0.0,2.0,1.0,16.0,13.0,12.0,11.0,18.0,14.0,16.0,7.0,3.0,4.0,11.0,1.0,15.0,1.0,11.0,10.0,7.0,16.0,9.0,11.0,12.0,9.0,9.0,10.0,7.0,14.0,16.0,13.0,5.0,5.0,9.0,6.0,14.0,19.0,5.0,7.0,11.0,2.0,1.0,13.0,10.0,4.0,10.0,15.0,3.0,8.0,4.0,15.0,13.0,0.0,10.0,18.0,10.0,12.0,10.0,17.0,5.0,15.0,13.0,3.0,1.0,6.0,14.0,6.0,11.0,18.0,9.0,3.0,1.0,1.0,16.0,12.0,2.0,8.0,9.0,14.0,13.0,10.0,9.0,0.0,18.0,12.0,17.0,9.0,5.0,11.0,14.0,0.0,9.0,19.0,13.0,7.0,14.0,12.0,3.0,15.0,10.0,1.0,2.0,8.0,9.0,11.0,11.0,16.0,18.0,6.0,13.0,13.0,11.0,2.0,4.0,15.0,6.0,10.0,7.0,3.0,1.0,7.0,9.0,3.0,12.0,16.0,0.0,3.0,18.0,5.0,10.0,1.0,1.0,10.0,0.0],"r":[0.5760542567936422,0.44496698938531365,0.9940492030907719,0.6855044919802782,0.3220736745047852,0.8823798232573561,0.5793874533210561,0.5454375698694274,0.32718416243385184,0.6621921728107822,0.7242377742583068,0.963742553490587,0.8033451888645349,0.8582024679455629,0.5798508287157718,0.9281355446963371,0.5519560152587952,0.9155939135332254,0.023461034114197643,0.4235720589494043,0.5857461025096551,0.31675654656345564,0.9908506017638647,0.2213835445761816,0.3981998976837229,0.5082461400507736,0.21632534118100577,0.5851123996069383,0.12284344520501267,0.23119844023443115,0.1749257797913646,0.540157978229487,0.52881188912521,0.7624985254102634,0.8710598191488206,0.5172634939319591,0.20824198559949303,0.33917921259193373,0.6021970558036074,0.614361715862862,0.8003736191531337,0.5774632271544304,0.27212324117792885,0.6613397837523545,0.3068850656029196,0.6192723365134816,0.7410339203513767,0.24968394899644353,0.959402636284975,0.6067263310257316,0.8614267675611413,0.3729677214156384,0.7547617937559057,0.2894068261375895,0.9436213436911345,0.3660917698765609,0.9921857083533152,0.9765134327896461,0.5182090004935938,0.24735076035587467,0.01994900788958187,0.9828679883622817,0.6092551963583581,0.7051207290821919,0.8522303963168338,0.21482309523835696,0.21323920680982122,0.2622036955176519,0.9519807120965933,0.3862257652732568,0.29868822846032006,0.5208920975774769,0.779609457019039,0.3093117543288808,0.8087230884610863,0.3564316842123143,0.5238501542391587,0.41494469456569805,0.16097330858869152,0.6062704344378815,0.14902629788213928,0.8593402670476749,0.2098536171675187,0.6717157370770424,0.08669303697150599,0.25739945720684165,0.3099849801222303,0.16670553442087566,0.6446231299700604,0.24562650597533264,0.1846162147224899,0.9202243019882466,0.32592357171124053,0.20146630533341514,0.7263049403881217,0.8409367129412713,0.8061596047581534,0.08253749185078885,0.07868994587070799,0.14480263922439418,0.44102500099257047,0.23908120529406207,0.5544214602205084,0.9155973330745657,0.39560703918641194,0.4195867549068075,0.6986051101791724,0.4704860679056144,0.9289720523788487,0.06638693457306166,0.6805683098382396,0.7879197568724163,0.20935590664511983,0.9576777567333983,0.5968694139070589,0.8828639289124924,0.5629075636607768,0.0022094215715229293,0.5383308319849514,0.5012720091006633,0.5345218757936487,0.013205874412754781,0.9331055043875518,0.7502504702799231,0.4377708002444245,0.43546271226820443,0.9426757313730914,0.38752368960006933,0.21141254631974715,0.9116463603150478,0.7401079265258406,0.5179007823568833,0.7808891147929045,0.3925750555735723,0.8276768573527133,0.6139518496539487,0.8246173584090257,0.39097569848400204,0.13881951118470592,0.18177183706703381,0.003624311182327755,0.988600220666279,0.29929890090782263,0.9464316733242715,0.556581221006103,0.18714356611463234,0.4476332173396036,0.055752896743122005,0.7852355560815645,0.4309988797552633,0.27418090837387576,0.17899732200914187,0.9528437160475347,0.5876011060669311,0.13165021207530025,0.39564827779853795,0.8138172909962855,0.34321179774890576,0.08132073622024127,0.8305005581613663,0.6043728191953373,0.32645260244188057,0.804715775267782,0.34289205744737483,0.2812257137749572,0.81622505416283,0.6094921042031523,0.4108876216355781,0.37807687068610796,0.8139530167759779,0.7160570350993758,0.7591480089039979,0.735271555591726,0.6232315925115113,0.3419055953877168,0.17288542128864393,0.30583185045555084,0.03613260847277133,0.6415625290892744,0.6564509794165934,0.4475538028366213,0.5789707595109408,0.1425215886568194,0.13309799538352585,0.43690090543157867,0.23643416514796667,0.36147178771301003,0.9918961086961153,0.3093157339272701,0.8527834701185792,0.8554243985042638,0.04205644018577481,0.5752985983586685,0.9922844102949404,0.9818363176223694,0.31983723657374763,0.8219222483517243,0.7199843934341295,0.08373385439375469,0.05576500879639834,0.8428343725840679,0.478691637419977,0.8556527676832588,0.9244533872821759,0.5910714977131546,0.690578589268932,0.3573564376050362,0.041861251147371936,0.6149558580887386,0.6364138717141339,0.2573783062055066,0.38233528867815214,0.5097778145966343,0.7918865682945053,0.5020649918834961,0.6988942052999578,0.9467325929447057,0.886580019560723,0.1520635889502684,0.42058716896949755,0.9322279246755205,0.9727163691354053,0.8548680345998538,0.14366439034174872,0.31754768756344043,0.908346226656839,0.5217525157116047,0.48936078415635165,0.2487605226332037,0.7526625733384673,0.7091303497949741,0.2587012447298964,0.369865351230686,0.5653350278913698,0.7501435522309285,0.5393495319152366,0.34301247757265774,0.41586345570597816,0.6082974943774817,0.06233894576552368,0.21736412834103302,0.08308406994720507,0.7396291632950085,0.9259697694506075,0.9378273742484928,0.7687279173525854,0.16393850741587257,0.09628357760153783,0.766827602710759,0.8227886583047488,0.6462686086628047,0.736801014568315,0.9327749382142649,0.4424128348417833,0.9082082954659949,0.3746939817501398,0.40731102961048093,0.15122855966468962,0.6131697612342171,0.3665069378334389,0.9612119526559264,0.5477188520436915,0.3632514651164742,0.9615550299757389,0.9798238318414652,0.41925608017097127,0.7756678907824717,0.5614230818597816,0.23011881360006492,0.4987991719250464,0.1358225351275899,0.18630238085676054,0.8951196543157938,0.8394826440694125,0.806029994696954,0.4608746213831745,0.611582459127803,0.8391779621294522,0.01666593320023857,0.19043256864356084,0.5098322943519755,0.9728072175278368,0.2812805193381982,0.4103086840345318,0.42423190860978455,0.18375270013272726,0.9902816905846936,0.2928338962516164,0.463091036008205,0.1763577472984581,0.7186461638421247,0.8195904113481489,0.9845177363763271,0.32009960951599203,0.6372546221956068,0.9932795985034892,0.30396703108977063,0.4228841577142848,0.7027903200726049,0.859659178710257,0.2852680005989827,0.7399141479534252,0.638078436830841,0.9861339347686175,0.9875944149256111,0.7473494948572941,0.9752000508424794,0.675529854229542,0.7232341161122073,0.825919781978321,0.6139178240876788,0.5658052472042183,0.2259024302923054,0.5256844165704035,0.9559021703657875,0.10117684431475804,0.4582284947253148,0.033826675728648725,0.4593788808330699,0.7615598420878542,0.17950193189886177,0.24305451418366752,0.6471666123016884,0.7034077898759186,0.6897845053494123,0.13115959700207847,0.06885821878090348,0.30927680001875046,0.6076435444807848,0.6940029654781061,0.4450804270352915,0.8545961472083301,0.6627216809204977,0.28479933766102894,0.661295339501693,0.10782825785865024,0.15552414231442024,0.717426304884339,0.3885040970274327,0.7476475795231741,0.29901766035556565,0.07227165823507398,0.1561652203654047,0.7554567186454473,0.451355981178893,0.22524550297792323,0.7698617115836137,0.8641970002871835,0.8406461256006326,0.4237972840034707,0.6074875603347398,0.5226983051846532,0.35999086882548426,0.8401962560464009,0.5049394423964519,0.29907783636120544,0.6833786061415965,0.021132779922689027,0.12430987634733448,0.9652136590875193,0.8675652497548265,0.28346570588220077,0.25876942010205783,0.47640106693010864,0.07604303559435599,0.881800601186419,0.8896911505255516,0.8731890427824596,0.2695056219339871,0.34707052888899215,0.9984585226002813,0.2466028891503833,0.28200142235034775,0.12458846711194194,0.4987060443093976,0.1660762408925356,0.7183671598822583,0.19224215668119382,0.3377680489275938,0.5421798287193236,0.28650624079853393,0.29943883041131825,0.1124480123223246,0.9740648578118698,0.8869563061493322,0.28836393980210784,0.7813863771648915,0.002776457679773081,0.6965710913304985,0.7449834538420592,0.45167928355868203,0.9439192537412642,0.34508021049860327,0.7184541369923878,0.5553573754042764,0.019915957252695238,0.6809985899985465,0.9997388030755598,0.44553793730079305,0.950246808290119,0.030779605617424988,0.13462507928495815,0.07715512573157723,0.8157104704325144,0.692299156040374,0.492806142252473,0.9327617245315238,0.27187426006110904,0.9139605971525109,0.666553149675229,0.9382203096316539,0.7705735953664616,0.08316870813120958,0.2680366339547391,0.0944648781256554,0.18116007671125156,0.44738338217498597,0.3430630865764781,0.672350424654673,0.5867119323271346,0.31628443844859255,0.20611455548933932,0.7610599075186877,0.04510598973825708,0.3262254298036753,0.6697679088889403,0.31730573742238666,0.6788155875471542,0.8475085823344406,0.16415244745746826,0.000787082524004612,0.15358685076989587,0.17705993536835773,0.2959444544525518,0.11555535480286783,0.9640545461197751,0.803443677218078,0.6430134706427111,0.49131469748761813,0.5529816306038227,0.2094242978231946,0.8685672694531208,0.254858926965875,0.6838223453995975,0.9814195787681177,0.8756240631139334,0.5073289321687171,0.6944930165678005,0.14898257653977032,0.13385576243855368,0.2216186559690616,0.8383508322206439,0.4909563360708922,0.6344208538384242,0.29692062160762167,0.8927225486914927,0.02374167654229975,0.1802447167665906,0.97550551768389,0.40264202813593486,0.19555054392637738,0.10724671691467424,0.6719915912791936,0.7627086710958015,0.9097924554710874,0.9708813616590071,0.8200211599420919,0.9662387221335014,0.6882516305283368,0.6415645103391039,0.31210565503641097,0.6701966749421424,0.26325981121804953,0.5130545478716353,0.5063656053620937,0.8287650904167976,0.13904555565590315,0.35286769717932565,0.668324404081666,0.8582782672032978,0.004796288289856454,0.9964764003672655,0.9361685007509055,0.7270478339902755,0.7188416261277684,0.37453342520313493,0.8234820317880516,0.9472286748980345,0.005307277275461431,0.3680397980085133,0.4740846157964347,0.07495781019176806,0.8427764188896689,0.4611336475580379,0.32062745518912816,0.9914600597069894,0.2628704069128547,0.22475184301698903,0.5672523153374438,0.8634323422863941,0.9315191943421581,0.793476895083796,0.5092212672468266,0.9086144194781394,0.4758696010923851,0.3911537031642147,0.2787861631828552,0.06550707306574988,0.32528752791527116,0.7823006468189067,0.5629242559757985,0.9190739390024112,0.701157678573447,0.8464728573241174,0.08759493440444421,0.8754300302873474,0.306518707570004,0.6278965128294736,0.09172329391461376,0.930070603491582,0.7082029484388193,0.194872753815321,0.645143385425567,0.7092281623375407,0.2255503980158866,0.25556897927443534,0.2336440299925282,0.49035655075290396,0.8882748432979279,0.7362458670580252,0.4528696709276012,0.7870300333518296,0.5558264839619032,0.4150176255950011,0.4221939880895542,0.8139517287666165,0.9387018569447596,0.0704010497888965,0.606111597305127,0.7436304011567734,0.1834938109634554,0.9467243146158744,0.9194264127192209,0.09584655588945368,0.5319971968763313,0.972078417196738,0.6714412349911691,0.10317857209457126,0.8422236642107528,0.6108548967536691,0.7965034107819744,0.837934402655409,0.8894559276297793,0.0863765936635561,0.6327046427141187,0.30493476104556083,0.19956884354204374,0.8373546448880123,0.9283264801214461,0.3547634542499343,0.6145126839102457,0.38798397033666054,0.656377002602309,0.4290473888181767,0.7069641246546585,0.5400673743630668,0.7096233220963126,0.8493619990104297,0.39794677878519336,0.6912719585683855,0.13546077491912367,0.1754620727872349,0.7611646479674576,0.1397551923969078,0.11512277953586159,0.5104760526679546,0.47929829606292484,0.14163614303721883,0.3420572835757538,0.05227785734736523,0.7707938603489408,0.38414765742010304,0.22025804051638853,0.6635929394145257,0.9025993761772355,0.4426053173419271,0.7726832864828272,0.5435222801335964,0.21014401129748017,0.1883595125017834,0.9972053431216739,0.11665573825715048,0.8788546061915119,0.376991547409842,0.42373928695443985,0.9142227012768263,0.1481718766251927,0.5895148077775725,0.5448768650919411,0.8853667126985165,0.13466151078180544,0.7739550831856155,0.16356064060642317,0.5193590645102313,0.28736273281236335,0.3979532691218759,0.545712620798555,0.46191192952150173,0.5279547328450023,0.37257600033267124,0.13344621065817885,0.3738883489648246,0.1856762234215037,0.8705252531306682,0.6462386126747988,0.6202598341659451,0.2813975552674597,0.781754350955455,0.810467905950468,0.8204542691789645,0.6846075196030621,0.057174353265404765,0.09962516048853876,0.4786057062846305,0.7286442486816012,0.48438444377508394,0.2887825405968505,0.5750749829283714,0.4398670971445293,0.9228361579048114,0.5195547057610999,0.04663238793050617,0.9490328128436736,0.5926371098861052,0.8208485434127875,0.9853093475496371,0.25464729558240684,0.5033002791253376,0.6340388067959817,0.44298535730854516,0.5657161956709389,0.1349753954478239,0.9447867673800898,0.385203735499839,0.1552108466367934,0.6183962327857437,0.6651454716785656,0.38004663762796986,0.09839509019575732,0.6775587619880343,0.1811685738931752,0.08643061568389632,0.23012765887884368,0.7598428642149408,0.39134534358930906,0.5173463960170308,0.6760502686377132,0.0785048014120715,0.8846590796264768,0.08814662788511773,0.9341849171728862,0.9262140786011053,0.7195564072650609,0.14641786357931252,0.6216477569597585,0.8856801088066508,0.8759239941361463,0.4031251411767316,0.9833468690147664,0.5544349215764732,0.6009806635411157,0.6118380696979955,0.2715809852857558,0.9833529391771294,0.3862872233683523,0.5834376704791355,0.11942273209564536,0.9023696367213123,0.9754265878162331,0.6129912143012557,0.213296399762809,0.7318693383000916,0.16411800184947212,0.004873387419363162,0.33805578200403086,0.3217673494606452,0.8263733716218162,0.3689863594856333,0.8347412486668135,0.5753980337992755,0.7594998897207372,0.37160252924277226,0.01552183916733374,0.4775289441432242,0.5684599660081431,0.5983454905213499,0.43233046004357245,0.6300321374661575,0.7343790073659615,0.28439946158008755,0.5035245743252696,0.31190815579933706,0.8523152772137266,0.0626578583865498,0.3307416656866351,0.5280579005333388,0.5571462764030677,0.5017408610209837,0.13364405866189855,0.40138490339987465,0.3939050373093236,0.6395148848426413,0.8557258611637644,0.3731884256801421,0.7166828729279457,0.01822666388875338,0.9852692122544597,0.3957923138258521,0.5866899815242208,0.23267580875000937,0.74939652792157,0.772491146112751,0.857492967901099,0.9646188251285721,0.2137357755673679,0.017185890340169818,0.8639035516304481,0.4285511316000541,0.5404456545140697,0.13155218046758943,0.29876166714317587,0.7769779879869605,0.8803901302816646,0.019864706428072143,0.20299431825243408,0.13405896534433714,0.6605621779225281,0.7394694170992719,0.005322414642253248,0.5701993818782678,0.4275648331042239,0.1769722492752348,0.42254510504752374,0.12410430191228428,0.8447174390090104,0.8853980993947155,0.401551698679381,0.9669871262088958,0.5149408625952341,0.9045464030598185,0.8729593866343315,0.32316423363529445,0.6190133993156317,0.022298066951856654,0.5035464595814212,0.7328887905209862,0.41544538301855827,0.300548244077923,0.47250989099196294,0.4911429339308806,0.997439933265962,0.5122306336672287,0.676807052565767,0.29578616030317595,0.636967912438231,0.03307429406916129,0.9132146454931593,0.40361994230341813,0.38925777790982385,0.7247280403193561,0.7687023580716719,0.8846285766753708,0.36149559532249076,0.21054111729811087,0.35985551749376565,0.6565678671444455,0.5078433736286345,0.5851864180669002,0.08220399744820184,0.9986802716073189,0.7471070814463003,0.04934972340078936,0.08086800432521812,0.20512195541573464,0.8711371176427543,0.42396091784174317,0.40906170977453193,0.3561047303502889,0.25795570243379995,0.2805274361118888,0.2684982110674483,0.37779622512792055,0.5196534868709868,0.6887481113944898,0.13741441239959173,0.13450838208975258,0.869803914975829,0.7242505702149924,0.2648677910554402,0.6324354781130019,0.7820693810390669,0.10665721881423806,0.6944077144763174,0.11750014011869903,0.3841349541001411,0.982760348871609,0.5996642993142776,0.45712294614261517,0.07226445872819443,0.25993129529526215,0.8428472317308817,0.953017076548434,0.7353335633699607,0.08959158649238219,0.1274550028577217,0.19862073034546057,0.500873741252762,0.1973640079966834,0.09978353096167569,0.6724432130100821,0.7709371327514365,0.8719419038996681,0.603175826835737,0.5505523601051612,0.8572775014806653,0.9570358263038792,0.7525294606722444,0.4802601484615414,0.30043351466737245,0.13036295197082337,0.4469086702847198,0.1342207010105072,0.28394257331870865,0.44389696217872276,0.4158447125581015,0.00028086925181880495,0.3709188561074539,0.13380042087408506,0.359054334674507,0.35617339655151814,0.5637494980345592,0.4285105886440066,0.46861574647088644,0.6010197739824426,0.3078614900657173,0.39948517323411403,0.9042119010935252,0.5165180585133027,0.7366319410244531,0.7950761867685301,0.6320913028244841,0.12098192814978037,0.2241647920186589,0.9663827923681187,0.5202384966991893,0.14589339180093885,0.5205434977464491,0.9681350335197352,0.6965125799543432,0.5555488779033833,0.42504948162304834,0.5105814486415605,0.9807635790912288,0.6875198845911674,0.6017581746711007,0.553331676610934,0.016543587553252692,0.8711622107307215,0.32340705605176523,0.8174915385843826,0.800787374677451,0.01356538807596075,0.28400178974554957,0.8281625225738709,0.45806935728188125,0.38911161361903557,0.5994900065269124,0.7368488811974514,0.45594990219261033,0.7766202171815855,0.2995908113759922,0.10459754728916426,0.05926379619740918,0.8239612079822947,0.5146568418726809,0.3085131003908641,0.32553606952008884,0.17092428219162392,0.3825998703998261,0.41404569407400516,0.7920873494593343,0.7420731771844451,0.9384065743540877,0.2985768122217014,0.6339735131746445,0.4961062264017011,0.5674802400845134,0.06973359546739966,0.45360362955916544,0.804491903915989,0.5640375887858105,0.9309454762635814,0.9228431178388183,0.12403874264577364,0.15120137640367037,0.8619940824905827,0.05184538961322116,0.41968608108281313,0.04969357909340588,0.808517478161084,0.4790332505399859,0.5811000320555519,0.4872959512138353,0.2029355016645491,0.33239096489574793,0.9810277034385178,0.29427695523978215,0.05175331134276462,0.049153703222859946,0.4400567092822314,0.6520384974425728,0.44483627052331176,0.019474300618519402,0.37679094750047737,0.4956379608093118,0.6055334075876426,0.21147873131104578,0.7237885895111882,0.20818984551259323,0.7125525682778504,0.5925426932703417,0.9367579441685134,0.40226269801924985,0.5646438729989434,0.9976662890850558,0.3444903117503364,0.5583268406006792,0.04259806359471896,0.3990261889758566,0.9897918862592194,0.9908388590049293,0.19980311210645807,0.10422020488480799,0.659074293003751,0.47317737002064364,0.6667629381479119,0.8306841479865483,0.5808226446822993,0.07016859748105775,0.22536418217398668,0.35654711330513056,0.9998093045048309,0.531810290476985,0.4806187825608823,0.04142982875875156,0.12190489216820377,0.6829899034823144,0.6345372230355231,0.6365897115656385,0.24143523482467621,0.3199031493223614,0.5344721974506468,0.4246200684149879,0.18086949145076714,0.4650898201475617,0.7416292789982113,0.1450739539405972,0.38801357905982536,0.40904049001217824,0.4500053162949973,0.8093380637632985,0.9572917494674178,0.6912417640915409,0.6953001009996669,0.4205020075075856,0.24199533316022315,0.771132750456835,0.6319033364589466,0.36769086087134606,0.11585647775359975,0.08842392830013446,0.9155335139894731,0.3540396478604393,0.393446684045889,0.9312038880856406,0.5024770961656013,0.0866892457671502,0.5140590709863153,0.3369041674725961,0.13519532830649839,0.15399654546603103,0.12330346824310601,0.791042201753122,0.8686723842353641,0.9447632124044663,0.24171465846501494,0.8596769661317416,0.2783297731109837,0.381574911727949,0.7787724945850905],"p":[0.8648990981056208,0.917374587325167,0.7519478607104262,0.8297159312529352,0.9702996196170335,0.9046893085242194,0.9525918415478875,0.9525978976086595,0.8936975581110862,0.8407414099556161,0.8943122022850576,0.9413265484069662,0.7856289085253625,0.7578233829456962,0.8867944611977538,0.9829319364888089,0.9012687563670618,0.9428865998569174,0.8620400531143608,0.9899535217137307,0.7816317400563222,0.9523793402969256,0.8472965660246072,0.8105113568633386,0.7678583577743265,0.7657839414197853,0.9595392268968859,0.7955326841705455,0.9408299315553773,0.9673067526179244,0.8529035663809748,0.7861830131284133,0.9717187077830867,0.7517608030279737,0.9531985183327906,0.9438804432993886,0.9319909281592504,0.8556746377788319,0.8307428118004659,0.8040014888007664,0.776858847607815,0.8008073186769744,0.8914404996160419,0.7633108942336779,0.9323147240549936,0.9749072979403437,0.950929288503932,0.7589856510976452,0.8242020468731965,0.9500886885861539,0.7942724204242977,0.9950551973114741,0.866266106990734,0.771069308370894,0.7678898366761953,0.8447933945018501,0.9934983732944785,0.8090929282785098,0.9477175855433106,0.895857003175509,0.9960021210720222,0.9488564891782875,0.7581036565649555,0.8728062255563342,0.969878860409516,0.941229411840314,0.9956806663735498,0.8424849108177421,0.8304874778816447,0.8874194868502936,0.8629380612009074,0.8939311125594438,0.8854226102760947,0.8916612788519738,0.9896296167865298,0.7593400139194588,0.8100598988217356,0.8257667377979985,0.8311427458744327,0.8071048864529078,0.8290314854124265,0.996120475717286,0.8329636746953756,0.9970384370066787,0.9381506597104955,0.9182240407438154,0.77945766067216,0.84537557884298,0.9447134760964757,0.7732250280806447,0.8712375006652089,0.8501517121481486,0.956609795929906,0.9089387363447732,0.950628047026753,0.8882829073578984,0.9608488604515365,0.8534480457215212,0.8650921008791428,0.8441023508264396,0.7854865359470917,0.754756210261214,0.922986326885149,0.8858432121834519,0.9454533242169395,0.8381437511079218,0.7656950981297375,0.9508776145403062,0.9843344078400407,0.9254579492948714,0.758346816320719,0.9253528174660436,0.9588913385544217,0.7801836387865579,0.8623422591630507,0.8814210067428243,0.8864003365632773,0.7898693405696278,0.9570084179018605,0.7732300279924484,0.8738748141214328,0.8012074915289668,0.9545681143646985,0.7531107737375404,0.902236719846063,0.7941201355679066,0.9517099373874949,0.761335578915958,0.8771277855612953,0.8725738224437735,0.8675240120080703,0.9739270709649629,0.8516057188106289,0.8544295819533205,0.871814605079652,0.8118211436728067,0.9176186701510274,0.9258857011669825,0.8878641349096429,0.9903797766063617,0.8854608552825933,0.7739183692881693,0.8976200640503617,0.8996127670969485,0.9882322390672582,0.8900765416731464,0.8352023828222503,0.8062206702756775,0.9584476606946104,0.894534443313318,0.8766454606680681,0.9317221834354763,0.9373545289421383,0.7504474418543836,0.8276864726624537,0.9829863513955373,0.758500814160868,0.9921506427872779,0.993426609539681,0.8569628062637143,0.8361813967977973,0.7870552062697762,0.837636475881542,0.9300656501004063,0.9584544690547929,0.8040390784943372,0.9578451683581928,0.9600918218932488,0.7840874302120519,0.767025975450726,0.8336152925850099,0.8948222009984513,0.7718028064573363,0.9671608373041624,0.9087754835643089,0.8244920570211005,0.9600975287937997,0.7572932165490174,0.994194587271368,0.9390430202919604,0.8217676722945955,0.8124706753911273,0.8821891626160006,0.9176305856880627,0.7616354720267157,0.9624995276631946,0.7536574134562504,0.9459945383229849,0.8072198079035107,0.9364570058198143,0.8419930545539738,0.9878788707594353,0.8743840420523841,0.9280555891249487,0.9326379689451811,0.8684069021170442,0.9709722892455472,0.8702466252707333,0.8969173645097784,0.760441542004944,0.7895461584830856,0.8879785542150139,0.9872451127063494,0.934849641572616,0.7976979974481606,0.8902974864832526,0.8401463365172406,0.9104611901180758,0.7598095390889201,0.9775471944325838,0.8297843371313959,0.8330007911111235,0.7983976406793039,0.8175339732485583,0.7582792145449702,0.9311759468268483,0.9967264753954048,0.960717569800654,0.7912107600810696,0.9074982874900988,0.853503498194718,0.9210460724174565,0.8256882502621994,0.9502945680024661,0.8725144925280909,0.7753761858803045,0.9955232200753883,0.901881404674439,0.9752224681952315,0.8369793124415629,0.9452079213900892,0.9216457150745073,0.79964726497803,0.830245227077312,0.8732726418316451,0.7836251765095401,0.9949426458305297,0.9864268086788257,0.7543473044132406,0.9958852501302997,0.9864513916979144,0.9015421470725927,0.9053997267644027,0.8093765920214078,0.9380925390842925,0.9955751335685046,0.8914316341955146,0.8068206173998489,0.8072095066569216,0.9536308071885444,0.7562379117829217,0.995902310493257,0.9982375345341921,0.9751114597623884,0.8932578461127898,0.7551412991713724,0.9897647727494849,0.9820957547753468,0.8442860827585152,0.9097611438891822,0.9387284805180254,0.868058175259254,0.7878854572658497,0.9242878184166604,0.8351202127031878,0.8445729143344429,0.9342635568648607,0.9753431258968694,0.7576699801523592,0.8410603234426453,0.888499430173192,0.8523912392023824,0.9556848286906914,0.9796321396298184,0.7862150926309095,0.833293717364334,0.9555008846732289,0.7676301517303181,0.8156749905794773,0.9409819948333191,0.9230364856672697,0.9425095041211502,0.8871337401589593,0.8678227732430711,0.7537783843104859,0.7796023647829653,0.9995583696587109,0.8136801662880842,0.8924433766110413,0.8308060129249024,0.9342235952168796,0.9744843146378374,0.760048202766967,0.8642281746583287,0.7680572140264574,0.8125886634446489,0.8085550135213007,0.8896164079606004,0.8405216087504916,0.9642137949517573,0.7802801017906189,0.7966097138484747,0.8923475448744123,0.9893944301349107,0.7612058569174558,0.7681713824739251,0.8716345654660314,0.9594139473583304,0.8767797663011094,0.7607619068655811,0.860487959922904,0.9078168126604294,0.8655755273849526,0.8212772160111979,0.9439404762664079,0.9720293088613096,0.8501251811916137,0.8827687899349034,0.8104245160812323,0.7506013813618235,0.7762256805333358,0.9675660137560809,0.8219250567423424,0.9032963392706816,0.9584356845625615,0.785269137567188,0.9900946369223569,0.9288506157758672,0.7769554062062042,0.78746368554122,0.9293123531850738,0.97658690809164,0.8571010123044431,0.7677639604292195,0.8567766573072795,0.971569630525084,0.9658483564783403,0.921644054226874,0.915055263098375,0.891654879608107,0.9639786414115283,0.7954569197867662,0.9514820562306006,0.9658639548979617,0.7691043289727523,0.7936686886195904,0.8302900344664487,0.8928718815914034,0.9101806723238499,0.7945978952524257,0.9296299255653676,0.9380580818253945,0.821087263307571,0.8954350990649059,0.7583092844982506,0.8891492548436011,0.838463414028029,0.8533361775350317,0.8994609929741866,0.9486401346943976,0.9980651791621558,0.7739488771654666,0.9919013256077412,0.8530079425722603,0.8911059443329155,0.7559433218083953,0.8103369210452849,0.7567739301360054,0.8631437029981547,0.8802807844718057,0.8392075967762974,0.916037979439014,0.8964187098174814,0.9485672965990719,0.8869391495758776,0.9438047262133393,0.7581734555652317,0.9440398247708903,0.7965222020569933,0.958778911041658,0.7796135378227145,0.7580386943843681,0.8742641073882744,0.9886700114057893,0.7954251828332372,0.9397557624900446,0.8085472211654832,0.7786811156421675,0.7642047801841115,0.9341341414916923,0.9398524642137875,0.8728943745843234,0.8330659463357409,0.8002773070463266,0.9984375516265228,0.8815869627461483,0.9363828324723948,0.7756289241071034,0.9773330926085178,0.8072163791942022,0.9271543780974444,0.9409817272785883,0.7893797044437713,0.9051367000759216,0.906280309216879,0.8635319261371908,0.8061093393951901,0.9852001649929123,0.9117682491061969,0.8477938895730178,0.9529457833086932,0.9046868390587013,0.782087411299915,0.8836346381042165,0.9995462164831668,0.9983291827432197,0.7585056559618331,0.9874141329255395,0.8061801361728498,0.7639844560041793,0.8772034021964732,0.8300873842813246,0.8245620160087579,0.952248973599747,0.7681078467642202,0.8622529747116772,0.9158564399479778,0.95567626393608,0.9937234515044172,0.7746431328831893,0.8840646435791523,0.9502503049489428,0.9011767030089688,0.9446478306042003,0.9410023624754476,0.7948961905226678,0.9704348156843132,0.7883492331093113,0.9016723553066686,0.9082217508361639,0.8393537526673791,0.8651177029250502,0.9855850392565044,0.9397063578953007,0.9609652850324706,0.8400173174871868,0.7705109202238386,0.8445993960063864,0.8703607441174552,0.9049713584745813,0.9487310528477663,0.7723960434974836,0.779812340487141,0.7901051303034707,0.8712765635067016,0.801246432783985,0.8088903057453387,0.9069622937778086,0.8161167254842212,0.9186074384200724,0.8331464988731597,0.8968902322558312,0.7827754890718839,0.9480388292021876,0.9691408242082957,0.8502884207195045,0.858942551478565,0.8436621974366101,0.9924051921530564,0.7622633876355918,0.9168184353452156,0.8407568495415592,0.9443024986359331,0.8455857444242195,0.9754044025892938,0.9584510689004162,0.8810988013831134,0.9550449380864343,0.9917755648285203,0.8601386967549847,0.786533793774023,0.764146089099206,0.7650517340014262,0.7911546321483207,0.8239600535980365,0.8021819050180763,0.8709348713757876,0.7929236282963306,0.9370034160573633,0.8703117224567816,0.9176040841844695,0.7741536739406443,0.8995869137008048,0.7759709175823433,0.9095482861791622,0.7660292870058996,0.7978881279251197,0.7669283503818219,0.9767906471172436,0.9598693923987072,0.9112941631505393,0.9536656671399482,0.9107584688840853,0.950643495411135,0.9325723859648185,0.854499124687323,0.9548666602243826,0.8929208464929055,0.7600799828656408,0.9164396130681315,0.7768931920851276,0.8525504653763828,0.9132825012393984,0.7644961511342951,0.9949668280406994,0.8788936355784049,0.7716097654226459,0.9654845826753355,0.957067054711634,0.9593162859418503,0.7573471736984292,0.8152421289535905,0.8793124141860704,0.8138648968513504,0.998162779974231,0.8979064423526547,0.7508921732787944,0.7614716490821651,0.9989849798975969,0.7832231243801533,0.7582803747766491,0.8860964206140509,0.7773247968601837,0.8159457620728783,0.8884697835941148,0.9504653847722275,0.7881649671765998,0.9320271981411179,0.9215884742857768,0.9519681058348839,0.9426882699754189,0.8539182062582636,0.9795955730422354,0.923506747616492,0.9513205657176971,0.9124547081592458,0.9665564648255465,0.9379749528105452,0.9234619405512903,0.8275838311166595,0.7528771280560531,0.9845501288211401,0.7602095219763229,0.9208121701526621,0.8284240145825225,0.982613657890701,0.966665009876693,0.9218971310511699,0.9645517512178408,0.9477795602149337,0.7543791855227238,0.9683616756029801,0.9013726558866796,0.7897597883706682,0.7593540150066518,0.9749573811660022,0.9233394467552494,0.8847717011028978,0.791725652779043,0.8325181131586605,0.7757803880927787,0.8607661020503596,0.8302667845496967,0.786827678623994,0.934128495103017,0.9095047541099812,0.8233590719173457,0.8501570728212144,0.7617841288812579,0.7729731214588018,0.8108852583954409,0.762933478574414,0.9813072047917717,0.8587125983925663,0.9699005479803707,0.7669517267867325,0.9082428600287049,0.9965985255138309,0.9429964959054159,0.920921109605879,0.9679155870055977,0.9846243278325362,0.8545348482323454,0.9166841114430448,0.8519717585122127,0.9025218438342394,0.7502271464205066,0.9305390753418519,0.7940044562604398,0.9437327946667378,0.8719579823161083,0.8378640732766589,0.9687562729900687,0.9099289588357606,0.8017557543001861,0.9494187057062082,0.8480173771239179,0.9813931708855634,0.7549294833275384,0.9814176101698686,0.7900450795347017,0.9411953404865698,0.8351625719259224,0.7607305043732597,0.7710522089271061,0.8606663365469869,0.8798296066945407,0.9862915348271961,0.9730864865366998,0.9877511586987251,0.8998408965853295,0.8514420492523518,0.9097284928481665,0.9192176106832626,0.9414731280228752,0.9073080798547732,0.7898982002708821,0.9492874573253085,0.8760905863547291,0.9416690896328057,0.8679018062597101,0.838956935403112,0.8617052854709912,0.9936343050888427,0.9191927177793071,0.9115895791100028,0.9248607613338657,0.8710002668091377,0.9200910342327215,0.9706299010700836,0.932089957538805,0.8946566906210391,0.9431292293947509,0.8126450154619955,0.9595799908429294,0.9212112031283437,0.7714239588329618,0.9165193362066857,0.9380648637754205,0.907132565964759,0.8331297925042174,0.9879725886517772,0.7891981214141093,0.8826225144268538,0.8237508825091838,0.7781409356537572,0.8755499659607523,0.8280438025340038,0.7759464502025111,0.9937113614033359,0.8597504949976744,0.9630915471247894,0.919949913450655,0.867430648139848,0.7909459359133684,0.9257632308878387,0.9329222447487941,0.820486018083467,0.8279409951766401,0.9578824814609277,0.8991037336722777,0.929981826767922,0.9101829116250109,0.7534910287971763,0.8132490006882891,0.9225548181479595,0.9346176001109789,0.8468993901894495,0.7682182847865866,0.90717519578894,0.7957462153430342,0.9608164068829227,0.9367361242726425,0.8267407366352155,0.7620472795139204,0.7900777552986318,0.9276549398426237,0.75148397270109,0.9916872898437468,0.9604963931584248,0.8252614236031437,0.8394769826095767,0.9863319495900077,0.7625027535014317,0.8837392492144953,0.9957306358198981,0.7977562242980457,0.7722920002002612,0.8078644856604071,0.862971348008827,0.9013088279202233,0.7518396444752922,0.886031232972848,0.920015668337245,0.8392164148592149,0.8567935699818722,0.9339339112259897,0.9648067717882297,0.7760891010540185,0.8696680077197916,0.9892347454550603,0.8000255023131426,0.9770868074175532,0.842430265038751,0.793912540346684,0.7711434941425623,0.9311056802345299,0.9114834644761105,0.9077329396423874,0.7990393184456701,0.9999572737455785,0.7936352688771411,0.8337661068918201,0.817839218093243,0.9683884912143034,0.8565289458985332,0.9046394242608126,0.7682110765204548,0.9781136831231019,0.8590254373461452,0.8220852788163165,0.9874795064491366,0.8870956489856513,0.9321611153623062,0.8870349336892092,0.8378214572186677,0.754388109723332,0.7946660812811598,0.8790140381184122,0.8357989357294286,0.7535142639437324,0.79721709835306,0.8911523728223167,0.7920070925756681,0.8333876445773227,0.7566417220535119,0.753946790261574,0.9987050760290455,0.8357419196384027,0.8083767172060699,0.9200224522430914,0.8224814088127683,0.9627895524522788,0.9639172413749687,0.9099565267492455,0.859988690682449,0.8145448365508334,0.9334233545116415,0.9078092960592774,0.9863037960188374,0.8305237218528166,0.7936367705553382,0.9616400218395087,0.9611407351047873,0.9214330788941577,0.9549556507495609,0.9628087961179519,0.8754739251768657,0.9210092802145387,0.8706295585875441,0.9641173445378274,0.9382964298311318,0.8813695092595002,0.8351330180112488,0.9034468557428035,0.9853595420011643,0.9829763625247219,0.7699867692298563,0.7958435296880577,0.9178554699979367,0.9398319401539394,0.8077402023907991,0.9638234894269931,0.9610687811302353,0.8262025616889173,0.8253459245950194,0.78517467878015,0.9160337854421765,0.856497220032934,0.7830098316348317,0.8282651482027078,0.937934713593473,0.9619571517065859,0.9693043371513631,0.8980415772050792,0.7644577584843104,0.9808185559529468,0.9904701071965094,0.8232064851837728,0.8116348015662376,0.9416911281081477,0.8185086518496218,0.9268304202702999,0.8854996156648407,0.7903032872477678,0.8486327638586724,0.9310558356667701,0.9954439565147852,0.7556525779079417,0.8202493163556611,0.7530450601814238,0.7562198576695305,0.8367970810532017,0.9821584633598102,0.9861309529648143,0.9702539390803296,0.7576587043223169,0.8736907036175305,0.9667510586418642,0.844153620971688,0.8252256847565435,0.8519910795373834,0.8163208029329295,0.9411548238877768,0.9886678117958875,0.9557369155309534,0.9897653522646309,0.7786985383368099,0.793866934152869,0.8261644020938506,0.8039297986728697,0.9369758449219944,0.7953920218230921,0.7783291995898975,0.9310669334774955,0.8126382718439675,0.9301312047114494,0.8715068278434894,0.9418307719971823,0.89765071160471,0.9860375808039851,0.7896811155483303,0.9640162554355733,0.8227347910392098,0.979001963886113,0.7794323368920745,0.7575867424759447,0.9367414371823681,0.9812501767074904,0.9471811186434813,0.971808999489097,0.8902928793622737,0.9028200370247276,0.7903688742722972,0.9277946076114065,0.955330944795441,0.7536515596011318,0.8551887341153953,0.7945527637302674,0.9930011206904137,0.8567248313878919,0.9298212892587578,0.7577735690124308,0.7933897482330919,0.9784880860338578,0.8232260075666535,0.7827785926796189,0.9734857631755762,0.7991375985797209,0.87433626773162,0.9544265875433463,0.9926137916827265,0.9316523060977886,0.8917477112185446,0.8300104910087645,0.9461480623191643,0.9580595232085467,0.8216550653456849,0.8128570773378847,0.7560707954418294,0.7703832307104439,0.9839227100635374,0.7651619198290309,0.916147983265845,0.8573799255697132,0.9077358487996788,0.9469332003824598,0.9843351622742837,0.7840915850708595,0.9981399301404235,0.7539362706660222,0.9298601364046898,0.8710293119426349,0.7886793351221111,0.7550616168778777,0.8583286263432782,0.9684869354138959,0.8634696441042384,0.8772646543898821,0.9810882346003436,0.8151754442774054,0.7936178237022204,0.9994535511624434,0.7979978489923375,0.9037452061320113,0.8476693195800151,0.8853725084523618,0.8115321549632064,0.9476909854441342,0.7696879445932656,0.9623251267969357,0.9445498108632276,0.8085095719646785,0.8997474539355236,0.8441621840227009,0.842533045735187,0.8715774455348746,0.8325963961797884,0.8862722442252785,0.9558521195060999,0.941145200614026,0.9190696928648598,0.9144527383045649,0.9555990895176387,0.9047677503016455,0.8044106677808867,0.9927599092628845,0.7917007738655885,0.9408126397313885,0.9093512879592287,0.9654274347638317,0.9040257828971613,0.7640048866443607,0.781703203412619,0.8550269180812721,0.8811774640568004,0.7673371463247209,0.8212753662052862,0.8457619537700996,0.9184141780591701,0.8272134231316703,0.8515525860642867,0.9256063698158292,0.7542399478485409,0.7869008251709673,0.9551939508822377,0.8287015062876102,0.7614336233285584,0.9872324620338324,0.9990820803609683,0.90370105701235,0.8812311374440125,0.9340057378963955,0.8594079295317036,0.8385500021538959,0.9680530201836571,0.8161953792951202,0.9004901764425552,0.9066009228867614,0.8839877045418914,0.8119158307576457,0.8906799984628635,0.9423596070311957,0.8138011708036559,0.8331055140709982,0.8006719093418175,0.8837731339009063,0.7937861756011708,0.8514182006211456,0.8638800801148112,0.9290520366151757,0.8265030063794788,0.8651859657741267,0.8282867064119506,0.9210160024773572,0.7588140135762206,0.8489326080628018,0.913110660181828,0.874658315254105,0.8857848735918188,0.8628878580114208,0.9405481264643032,0.8530497079787933,0.8785771765947934,0.9366279090230402,0.9875063716722199,0.8187276222726891,0.773156753101859,0.8044533824264957,0.9315238482955728,0.917684656328294,0.7614766165761778,0.8769288050060503,0.9715232085436931,0.8994073535016271,0.9950144262377998,0.94074631464602,0.8215689978335947,0.8691209966911393,0.8100504764043871],"n":[11.0,18.0,8.0,15.0,5.0,4.0,6.0,1.0,15.0,2.0,12.0,13.0,4.0,9.0,20.0,18.0,11.0,7.0,13.0,4.0,15.0,2.0,1.0,8.0,15.0,18.0,9.0,8.0,0.0,0.0,14.0,12.0,8.0,4.0,2.0,15.0,14.0,13.0,15.0,7.0,18.0,14.0,17.0,3.0,11.0,4.0,1.0,2.0,12.0,7.0,13.0,11.0,3.0,8.0,9.0,15.0,7.0,13.0,8.0,19.0,14.0,11.0,9.0,1.0,9.0,5.0,15.0,16.0,0.0,18.0,16.0,18.0,9.0,2.0,8.0,16.0,10.0,6.0,5.0,18.0,8.0,1.0,10.0,1.0,19.0,11.0,3.0,10.0,16.0,5.0,12.0,10.0,11.0,18.0,8.0,15.0,9.0,10.0,6.0,14.0,15.0,1.0,13.0,10.0,19.0,13.0,11.0,4.0,12.0,11.0,8.0,10.0,0.0,18.0,17.0,19.0,16.0,13.0,15.0,4.0,4.0,6.0,9.0,11.0,13.0,18.0,11.0,18.0,19.0,17.0,10.0,7.0,17.0,0.0,18.0,9.0,7.0,10.0,17.0,8.0,8.0,1.0,7.0,16.0,19.0,19.0,4.0,5.0,0.0,12.0,2.0,12.0,6.0,6.0,6.0,4.0,8.0,5.0,18.0,17.0,1.0,8.0,11.0,19.0,3.0,7.0,18.0,2.0,5.0,13.0,18.0,15.0,7.0,19.0,18.0,2.0,17.0,11.0,6.0,8.0,4.0,11.0,2.0,1.0,1.0,16.0,10.0,1.0,5.0,16.0,14.0,19.0,2.0,16.0,6.0,12.0,14.0,1.0,4.0,18.0,5.0,10.0,15.0,11.0,2.0,5.0,10.0,15.0,18.0,9.0,13.0,4.0,20.0,12.0,12.0,14.0,19.0,19.0,11.0,4.0,5.0,14.0,0.0,18.0,7.0,1.0,9.0,16.0,10.0,19.0,7.0,7.0,12.0,13.0,1.0,10.0,16.0,18.0,15.0,19.0,19.0,4.0,13.0,12.0,1.0,4.0,11.0,8.0,20.0,17.0,15.0,12.0,20.0,1.0,15.0,13.0,5.0,7.0,4.0,9.0,3.0,12.0,10.0,10.0,12.0,5.0,3.0,7.0,1.0,2.0,18.0,12.0,11.0,19.0,6.0,17.0,20.0,15.0,2.0,15.0,9.0,20.0,10.0,3.0,4.0,12.0,4.0,20.0,10.0,18.0,12.0,9.0,14.0,8.0,10.0,20.0,6.0,10.0,16.0,13.0,11.0,17.0,16.0,5.0,5.0,12.0,18.0,15.0,12.0,6.0,8.0,2.0,17.0,8.0,10.0,5.0,13.0,10.0,12.0,5.0,14.0,14.0,3.0,4.0,1.0,0.0,19.0,2.0,7.0,12.0,6.0,0.0,9.0,8.0,0.0,14.0,5.0,6.0,1.0,9.0,2.0,7.0,19.0,3.0,13.0,7.0,16.0,1.0,17.0,9.0,18.0,3.0,15.0,10.0,15.0,19.0,4.0,12.0,9.0,6.0,9.0,7.0,11.0,15.0,4.0,8.0,16.0,18.0,15.0,19.0,3.0,7.0,15.0,13.0,1.0,3.0,2.0,6.0,1.0,7.0,1.0,18.0,18.0,4.0,2.0,18.0,10.0,10.0,1.0,10.0,13.0,16.0,4.0,3.0,6.0,18.0,19.0,1.0,4.0,6.0,4.0,20.0,17.0,10.0,11.0,0.0,3.0,9.0,10.0,18.0,2.0,8.0,17.0,17.0,0.0,18.0,1.0,16.0,5.0,15.0,18.0,11.0,7.0,0.0,1.0,11.0,19.0,3.0,5.0,0.0,9.0,18.0,9.0,9.0,2.0,8.0,12.0,16.0,2.0,11.0,4.0,20.0,5.0,2.0,11.0,11.0,15.0,17.0,3.0,10.0,18.0,4.0,14.0,15.0,14.0,17.0,20.0,2.0,7.0,16.0,5.0,2.0,20.0,6.0,14.0,4.0,16.0,4.0,3.0,6.0,3.0,1.0,17.0,10.0,1.0,9.0,9.0,0.0,13.0,12.0,14.0,13.0,19.0,5.0,12.0,14.0,17.0,18.0,10.0,3.0,17.0,2.0,8.0,16.0,15.0,15.0,14.0,18.0,7.0,15.0,2.0,2.0,7.0,17.0,19.0,9.0,1.0,15.0,12.0,11.0,2.0,4.0,9.0,8.0,11.0,3.0,6.0,13.0,20.0,15.0,18.0,19.0,19.0,5.0,12.0,17.0,10.0,2.0,12.0,12.0,14.0,6.0,1.0,4.0,11.0,9.0,12.0,13.0,18.0,20.0,19.0,13.0,14.0,2.0,7.0,4.0,16.0,2.0,15.0,18.0,3.0,3.0,19.0,5.0,5.0,5.0,11.0,9.0,4.0,9.0,2.0,4.0,1.0,0.0,2.0,15.0,3.0,16.0,3.0,2.0,3.0,3.0,17.0,5.0,9.0,5.0,14.0,12.0,10.0,12.0,9.0,15.0,15.0,18.0,18.0,16.0,0.0,20.0,8.0,19.0,1.0,12.0,3.0,7.0,18.0,7.0,10.0,5.0,16.0,11.0,10.0,18.0,17.0,7.0,17.0,6.0,0.0,5.0,18.0,4.0,18.0,17.0,5.0,9.0,18.0,5.0,4.0,9.0,12.0,12.0,16.0,12.0,12.0,8.0,10.0,5.0,5.0,8.0,6.0,6.0,11.0,0.0,9.0,3.0,16.0,6.0,3.0,8.0,2.0,15.0,14.0,3.0,15.0,4.0,9.0,19.0,10.0,12.0,7.0,8.0,14.0,8.0,12.0,12.0,6.0,13.0,5.0,14.0,17.0,6.0,8.0,1.0,13.0,0.0,1.0,9.0,0.0,18.0,6.0,13.0,0.0,6.0,1.0,7.0,5.0,13.0,3.0,7.0,18.0,3.0,2.0,10.0,4.0,15.0,13.0,5.0,13.0,6.0,9.0,16.0,7.0,12.0,7.0,5.0,2.0,1.0,16.0,9.0,20.0,3.0,1.0,4.0,16.0,13.0,6.0,11.0,4.0,4.0,13.0,12.0,17.0,15.0,17.0,1.0,14.0,13.0,0.0,10.0,12.0,9.0,13.0,16.0,20.0,8.0,15.0,13.0,15.0,8.0,14.0,18.0,18.0,5.0,18.0,11.0,12.0,2.0,8.0,18.0,2.0,5.0,15.0,13.0,2.0,10.0,2.0,11.0,3.0,10.0,6.0,9.0,14.0,13.0,1.0,1.0,2.0,16.0,9.0,10.0,3.0,8.0,8.0,20.0,10.0,6.0,7.0,7.0,16.0,17.0,18.0,7.0,5.0,14.0,8.0,17.0,19.0,3.0,9.0,5.0,13.0,4.0,6.0,3.0,10.0,15.0,12.0,2.0,10.0,13.0,15.0,3.0,11.0,18.0,16.0,11.0,12.0,6.0,6.0,6.0,2.0,15.0,19.0,8.0,13.0,11.0,3.0,8.0,11.0,7.0,2.0,14.0,14.0,15.0,19.0,18.0,18.0,15.0,4.0,7.0,10.0,14.0,4.0,10.0,19.0,17.0,7.0,5.0,19.0,4.0,11.0,4.0,7.0,12.0,6.0,12.0,7.0,18.0,2.0,9.0,2.0,15.0,14.0,18.0,17.0,3.0,17.0,15.0,11.0,10.0,4.0,11.0,18.0,12.0,10.0,6.0,13.0,3.0,4.0,1.0,15.0,1.0,5.0,1.0,1.0,20.0,18.0,10.0,0.0,2.0,2.0,17.0,13.0,13.0,12.0,19.0,17.0,17.0,7.0,3.0,5.0,13.0,2.0,16.0,3.0,11.0,12.0,8.0,17.0,9.0,14.0,12.0,10.0,9.0,10.0,9.0,17.0,19.0,13.0,7.0,6.0,9.0,7.0,15.0,19.0,8.0,9.0,11.0,4.0,1.0,15.0,11.0,4.0,10.0,19.0,4.0,10.0,4.0,18.0,19.0,0.0,10.0,19.0,11.0,16.0,10.0,19.0,6.0,15.0,15.0,4.0,1.0,6.0,14.0,8.0,13.0,18.0,10.0,4.0,3.0,1.0,16.0,12.0,3.0,10.0,11.0,18.0,13.0,11.0,11.0,0.0,18.0,14.0,17.0,9.0,6.0,16.0,15.0,0.0,10.0,20.0,16.0,9.0,15.0,13.0,5.0,18.0,11.0,2.0,2.0,10.0,11.0,11.0,11.0,17.0,20.0,6.0,19.0,14.0,12.0,2.0,5.0,20.0,6.0,12.0,8.0,3.0,1.0,11.0,12.0,4.0,14.0,19.0,1.0,3.0,18.0,5.0,10.0,1.0,1.0,12.0,0.0]}
},{}],33:[function(require,module,exports){
module.exports={"expected":[2.0,0.0,0.0,2.0,0.0,1.0,0.0,1.0,1.0,0.0,4.0,0.0,2.0,2.0,4.0,0.0,0.0,1.0,6.0,1.0,0.0,0.0,2.0,1.0,2.0,0.0,0.0,0.0,4.0,0.0,2.0,0.0,1.0,0.0,1.0,0.0,3.0,0.0,1.0,0.0,0.0,0.0,3.0,0.0,0.0,0.0,4.0,0.0,0.0,0.0,0.0,1.0,5.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0,2.0,1.0,0.0,0.0,0.0,1.0,0.0,3.0,0.0,1.0,0.0,2.0,1.0,4.0,3.0,0.0,0.0,1.0,1.0,0.0,1.0,3.0,1.0,2.0,0.0,2.0,1.0,0.0,3.0,0.0,2.0,1.0,4.0,0.0,0.0,3.0,0.0,3.0,0.0,2.0,2.0,0.0,1.0,0.0,1.0,0.0,0.0,0.0,1.0,2.0,3.0,2.0,0.0,0.0,0.0,2.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0,0.0,1.0,0.0,1.0,1.0,0.0,0.0,2.0,1.0,1.0,1.0,2.0,0.0,0.0,3.0,2.0,4.0,0.0,0.0,0.0,2.0,2.0,1.0,0.0,2.0,0.0,1.0,1.0,0.0,1.0,2.0,0.0,0.0,3.0,0.0,0.0,0.0,0.0,0.0,3.0,0.0,1.0,0.0,3.0,2.0,3.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0,0.0,0.0,2.0,0.0,0.0,0.0,0.0,0.0,0.0,2.0,1.0,2.0,1.0,0.0,0.0,1.0,0.0,3.0,1.0,4.0,0.0,0.0,0.0,4.0,5.0,3.0,0.0,0.0,2.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,3.0,0.0,1.0,0.0,2.0,3.0,1.0,1.0,0.0,0.0,0.0,2.0,0.0,4.0,1.0,0.0,0.0,1.0,0.0,2.0,1.0,2.0,1.0,0.0,0.0,0.0,0.0,6.0,1.0,2.0,1.0,1.0,1.0,1.0,0.0,4.0,0.0,0.0,1.0,1.0,3.0,0.0,0.0,0.0,1.0,2.0,0.0,0.0,3.0,2.0,3.0,3.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,0.0,1.0,2.0,3.0,2.0,1.0,1.0,0.0,0.0,2.0,0.0,2.0,2.0,0.0,7.0,3.0,1.0,0.0,1.0,1.0,0.0,1.0,0.0,0.0,0.0,1.0,0.0,1.0,0.0,4.0,0.0,3.0,4.0,1.0,3.0,2.0,0.0,3.0,0.0,6.0,1.0,0.0,0.0,3.0,0.0,1.0,0.0,0.0,1.0,4.0,0.0,0.0,1.0,2.0,0.0,1.0,2.0,0.0,2.0,0.0,0.0,1.0,0.0,1.0,0.0,0.0,1.0,2.0,0.0,2.0,0.0,3.0,1.0,0.0,2.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,1.0,3.0,3.0,4.0,0.0,1.0,0.0,2.0,0.0,1.0,1.0,0.0,1.0,2.0,2.0,0.0,0.0,0.0,0.0,2.0,1.0,4.0,2.0,1.0,1.0,0.0,0.0,2.0,1.0,1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,3.0,1.0,1.0,1.0,3.0,0.0,1.0,2.0,0.0,0.0,1.0,0.0,1.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,3.0,2.0,3.0,1.0,0.0,0.0,0.0,1.0,0.0,1.0,3.0,1.0,0.0,2.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,3.0,3.0,1.0,2.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,2.0,2.0,0.0,0.0,1.0,1.0,2.0,2.0,0.0,0.0,0.0,0.0,4.0,0.0,1.0,0.0,1.0,0.0,3.0,0.0,4.0,0.0,1.0,4.0,3.0,2.0,2.0,0.0,1.0,1.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,3.0,0.0,1.0,2.0,1.0,0.0,1.0,2.0,2.0,1.0,3.0,0.0,2.0,1.0,0.0,0.0,0.0,0.0,2.0,2.0,1.0,1.0,1.0,0.0,1.0,2.0,3.0,0.0,1.0,0.0,2.0,5.0,0.0,0.0,1.0,5.0,0.0,1.0,1.0,1.0,4.0,1.0,0.0,0.0,1.0,0.0,1.0,0.0,0.0,1.0,1.0,0.0,5.0,0.0,1.0,0.0,0.0,0.0,4.0,2.0,5.0,2.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,2.0,0.0,2.0,0.0,1.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,3.0,2.0,4.0,0.0,0.0,1.0,0.0,0.0,2.0,0.0,1.0,1.0,0.0,3.0,0.0,0.0,0.0,0.0,1.0,2.0,1.0,3.0,0.0,0.0,1.0,3.0,1.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,3.0,2.0,0.0,0.0,1.0,0.0,1.0,2.0,3.0,0.0,0.0,3.0,1.0,5.0,0.0,1.0,1.0,0.0,1.0,1.0,4.0,2.0,2.0,0.0,2.0,1.0,3.0,1.0,4.0,1.0,0.0,1.0,4.0,1.0,1.0,3.0,4.0,1.0,0.0,0.0,0.0,7.0,1.0,0.0,4.0,0.0,1.0,2.0,2.0,0.0,0.0,1.0,0.0,0.0,3.0,3.0,3.0,1.0,0.0,0.0,1.0,0.0,3.0,1.0,4.0,1.0,0.0,0.0,1.0,0.0,2.0,1.0,0.0,0.0,1.0,0.0,0.0,2.0,0.0,5.0,1.0,2.0,0.0,3.0,3.0,4.0,4.0,2.0,2.0,0.0,0.0,1.0,0.0,1.0,1.0,2.0,0.0,0.0,1.0,2.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0,3.0,0.0,0.0,1.0,0.0,2.0,6.0,3.0,1.0,0.0,1.0,0.0,1.0,0.0,0.0,0.0,0.0,3.0,0.0,3.0,1.0,4.0,1.0,2.0,0.0,1.0,2.0,0.0,0.0,0.0,0.0,0.0,2.0,2.0,0.0,0.0,0.0,0.0,2.0,3.0,0.0,1.0,1.0,0.0,0.0,0.0,2.0,0.0,0.0,1.0,5.0,2.0,3.0,2.0,0.0,4.0,1.0,0.0,0.0,1.0,2.0,1.0,2.0,3.0,2.0,1.0,0.0,0.0,0.0,0.0,1.0,2.0,0.0,2.0,2.0,1.0,0.0,0.0,0.0,3.0,0.0,2.0,0.0,0.0,2.0,0.0,0.0,0.0,0.0,1.0,0.0,1.0,0.0,0.0,2.0,2.0,1.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,3.0,3.0,3.0,2.0,2.0,1.0,0.0,1.0,1.0,3.0,1.0,0.0,0.0,0.0,0.0,3.0,2.0,1.0,2.0,2.0,2.0,1.0,2.0,0.0,5.0,1.0,0.0,1.0,0.0,2.0,1.0,2.0,0.0,0.0,2.0,0.0,0.0,0.0,4.0,0.0,3.0,4.0,1.0,1.0,1.0,1.0,0.0,4.0,2.0,0.0,0.0,0.0,0.0,2.0,0.0,0.0,1.0,0.0,0.0,0.0,3.0,0.0,2.0,0.0,1.0,0.0,0.0,0.0,2.0,0.0,0.0,0.0,3.0,1.0,0.0,1.0,0.0,3.0,1.0,0.0,1.0,0.0,1.0,3.0,1.0,0.0,1.0,2.0,1.0,2.0,0.0,2.0,0.0,0.0,0.0,0.0,0.0,0.0,3.0,0.0,0.0,0.0,1.0,4.0,1.0,0.0,1.0,1.0,3.0,1.0,2.0,1.0,1.0,1.0,0.0,0.0,0.0,1.0,0.0,0.0,2.0,0.0,0.0,5.0,0.0,0.0,2.0,0.0,0.0,0.0,3.0,0.0,3.0,2.0,0.0,1.0,1.0,0.0,1.0,1.0,4.0,0.0,2.0,0.0,2.0,3.0,0.0,0.0,2.0,0.0,0.0,0.0,1.0,0.0,0.0,3.0,1.0,0.0,2.0],"r":[0.3794672571771611,0.34849789820557864,0.5006461901921091,0.7640279410615958,0.2969489238317504,0.5870365330530869,0.14299055210537603,0.4838690404131263,0.7474667663370214,0.5365191998041154,0.8987589115591077,0.4270289679427208,0.7662080512574294,0.7096036069154248,0.9939509970272329,0.04195002999695774,0.7639120837814144,0.6630840413077794,0.8910527279939,0.7522006713159719,0.20630232005288707,0.6139405739499337,0.49924245356669505,0.12319918942565478,0.383978178722999,0.7830485505931664,0.05166472328917604,0.43180899035752707,0.9361576710279778,0.05246693393037605,0.8491901634693477,0.21134131081609064,0.2679926161041324,0.6776538943635309,0.5641059628922931,0.12187070814445078,0.81739122948656,0.13539848204273253,0.5286646548247069,0.5125605428812827,0.13436242910499852,0.580362698273402,0.4436622961690164,0.3279544781333288,0.8804194528754459,0.5108968830161971,0.9991884853501933,0.45547678817656956,0.03837474555016929,0.6186968844761274,0.5559523296350686,0.7749998827510673,0.9952328317426036,0.004112306948403255,0.6593038348467806,0.7125158364170165,0.007720360841452445,0.22669157999728484,0.16165623672822083,0.27368276788671664,0.14856244391726836,0.19692122598457495,0.6817217747262756,0.7663710417379022,0.5651233829303581,0.5051497342295128,0.43778181236067004,0.07895714520066921,0.7325393531324766,0.9281316849442742,0.2604368277657292,0.7941964722894581,0.36497504546812665,0.7169198248861168,0.7440103450748721,0.6914528309033441,0.3592822690782178,0.9394098724200401,0.5950282313770294,0.6693054981589572,0.11874233384975774,0.5018612280373875,0.36928805049513724,0.42930264301773025,0.6915513474967254,0.8964282986320455,0.4038243514512361,0.961782688550386,0.014596405954949487,0.35385210566318404,0.5414454365553503,0.8384197327822307,0.7038034596025233,0.3938204737165516,0.9977849686584739,0.7942203213992354,0.7233923706983822,0.40178707431343264,0.1944277142147499,0.4859441889318228,0.01410579713286042,0.6641624512778654,0.025454296806664667,0.9029090575898628,0.930809581116655,0.16642410017223996,0.9060882586810928,0.5241646027958387,0.6385033248103122,0.6616900113260398,0.5841338883328135,0.7073427930290259,0.1614101473246654,0.5181026294334525,0.8574934716172882,0.5805466768295902,0.3467354901692974,0.5330462129786648,0.38276099871316704,0.7994863083705839,0.6629055457323352,0.02423766084065715,0.11973201871547334,0.789447504597502,0.27777058153516254,0.9788844931284697,0.4725583952951016,0.05916560511263702,0.6410144378177731,0.7477945467631328,0.383403636151636,0.7115969374268329,0.4411387269621345,0.9042269679705914,0.5289189862509784,0.659791018884714,0.1822012400228965,0.3501245578524075,0.7057990532996228,0.5468091053556301,0.8976183294982569,0.8510044979824898,0.5150777109703835,0.03468742049947249,0.35246980686720875,0.7994280080559315,0.8399661433776164,0.4898277581241326,0.3143564689453129,0.2819998210007093,0.6165217500383731,0.8866378966540915,0.9199478675816393,0.5423354697740197,0.9584461683423409,0.08591264736511262,0.10259874859912288,0.3939287412154082,0.2686700008871925,0.89187550948408,0.8439936837830881,0.9299975674761192,0.5132391538882912,0.7318160408480621,0.26229288535030815,0.13755167514437616,0.3136614929389765,0.32421907184085774,0.23629318789374998,0.919114650301073,0.17184228579770489,0.28167522302209713,0.8091985790943172,0.9590270891653143,0.2327945581537343,0.9719513781864388,0.47070975426338957,0.1730492258216334,0.41191536781988614,0.18482373171179534,0.35420117743476753,0.5574900688547195,0.5268992516370963,0.3750750896160657,0.2910746941353328,0.22326680498921614,0.8128242027724244,0.5112116117323051,0.12429827119418091,0.013388122255448831,0.5758456381959409,0.07902729418882948,0.2771971709170664,0.1362301366354952,0.8918818672835691,0.7188597816606936,0.15154183163466883,0.009440478341496306,0.8002292445022885,0.35337944658522646,0.8707387810956946,0.1764419928845138,0.9810968676067957,0.2255357874072259,0.5580021764353629,0.4630603975551848,0.9653800715000385,0.9758447010715774,0.7548926357744941,0.26621098803442633,0.0741606734864253,0.37055167445660997,0.5495802767331281,0.14825773234344197,0.4721825767767944,0.3066732714771747,0.06272909801089965,0.20868136849439556,0.6881191972785321,0.911327174995668,0.08815508620394419,0.7920637128571739,0.2783780416663302,0.851844054819423,0.9650687159754334,0.042047523701196576,0.45962947219657124,0.35356310184948825,0.012418956317759466,0.3373199628145196,0.6582770240120923,0.4238982465520069,0.9805036763802439,0.296737837526603,0.6411388609090891,0.8264477463442246,0.416863753198484,0.7278397918389232,0.23309234112637478,0.8719391561461789,0.35632241313582336,0.7812613230374164,0.026863937632551682,0.1349419672234573,0.3256285213886785,0.40987669474932464,0.9388182195245949,0.19518815594727745,0.4244378105319142,0.6976149171738681,0.4588914041809016,0.4578066910717975,0.1528671222704978,0.41522043243342077,0.9223437133486281,0.7514103221543829,0.24385173034202423,0.8476040296040597,0.9234622443890697,0.4322363046247837,0.3744965283855455,0.6390949656449694,0.6537757939946749,0.5221650672406264,0.9772245894138123,0.3929983549326821,0.1675411432722369,0.464804912136598,0.6708596016575059,0.9006788536119472,0.5520945613142823,0.061889241253457294,0.6293385041571091,0.27167454837915117,0.7373840809071346,0.11385954562365153,0.48270648969144037,0.8401894984138305,0.6042241413271952,0.0674237998720062,0.9319636841714201,0.6470354621756862,0.8300223686075621,0.8158704463402073,0.26431856844364554,0.7873146733530851,0.17052384316388403,0.23038630541198812,0.19314261408793998,0.5993892026816039,0.7191516716054311,0.916237377986548,0.3058717923567791,0.9444409100327686,0.8058113159014315,0.04823973600952347,0.3559737623912531,0.796205743720384,0.5119141266105958,0.8634500800059528,0.9440956525490753,0.30791485154488485,0.4802321569152499,0.46368074048056585,0.3905528806091132,0.27288702560047207,0.8863695900430206,0.41402212292146645,0.887068714005526,0.47191654256513726,0.8261557510586273,0.7475917674625281,0.17219513753798,0.9778839875277741,0.8691166324967925,0.6286119503606653,0.40973976196584183,0.3631001086683203,0.897746851041674,0.8892120611472747,0.2374449149191642,0.6701809060681037,0.5609899450278517,0.8162342875223727,0.9353882301008694,0.309771747590855,0.3275318771664397,0.568732001764271,0.9268551971825285,0.015882445775498022,0.01273907321006762,0.9239969245966706,0.49523712080675475,0.17037825461711043,0.5015624205246652,0.4671790969230798,0.18773598842670935,0.6423606159706807,0.16500020184848752,0.02025657249392676,0.6630423265267724,0.14459494147881058,0.6908221115913376,0.04262321692212523,0.006193128873889231,0.3676874189503121,0.4963835234673388,0.35446287068683646,0.5805886512591081,0.11757720366358315,0.7658610121638862,0.42018375375826444,0.5036812099782944,0.8482034516769288,0.08239137129977636,0.1542696453236172,0.5257453485018135,0.718910717645499,0.982404866237697,0.057962336887007915,0.4145935389165354,0.054950717166814655,0.471797807867125,0.8094718146252733,0.10156503569412023,0.9491558493743928,0.8600040195096765,0.8455362553028127,0.5733112383434291,0.38529512600287186,0.8449203225740245,0.056610865999223714,0.8595010578304003,0.8820086710427637,0.6664370089933929,0.8679410623716408,0.3723837777833745,0.6791857210503789,0.8843832107340464,0.3479181372579685,0.4331525882754679,0.3927615939503366,0.5943300188248217,0.514799333679876,0.589379202030591,0.7310880842350351,0.9601850330065829,0.4499945734590618,0.44396124805436754,0.46737062888502967,0.50990167200089,0.33110621011723684,0.9464194148245746,0.5765839013472429,0.6037557455757669,0.0715486104459837,0.9526989470332514,0.17383196797852607,0.30637754162974784,0.25931438631484616,0.8844339710770652,0.3093308530371994,0.49717022709506087,0.8531421699868997,0.6606767108688585,0.7320546596878543,0.8338138765320409,0.9059477843644896,0.6280867754518564,0.6692082670964818,0.34576307674846873,0.7159106483210573,0.028779496426595497,0.925402059792825,0.3348191620630978,0.289163343727564,0.2624248073038764,0.5967524672892337,0.47077034224376346,0.579890564446716,0.2874239004426602,0.27661592525617396,0.16595789017856988,0.7071894387111928,0.302342534830341,0.860381227610244,0.915018798222841,0.09804810723052992,0.0008363116946421556,0.9194968623358559,0.31241246138619405,0.39276136899890357,0.7675076882143552,0.5204740940664554,0.9663547603255112,0.18386945411930022,0.26028779615067044,0.4393677013017039,0.947439263507001,0.5600324712032954,0.3004376685703052,0.9446936128032852,0.023290964469772968,0.3333123065110386,0.6224602993782851,0.7074207773547854,0.4513536549426074,0.695360516986081,0.23753404539871514,0.2270561253891492,0.06927505260479139,0.32893125265211043,0.4929742723238557,0.3377729532907723,0.31677832422126473,0.8456943003056359,0.5624887980931914,0.6436870214631081,0.3348067654500473,0.7915689548068146,0.7616197489495362,0.7390128389539194,0.8865971826558767,0.7407899826164772,0.06961903110524359,0.4622169168793029,0.07195990637268856,0.4612809290296902,0.8143384110055898,0.09411222676837716,0.45647494193985527,0.49081204858624394,0.7686370044588726,0.7053155184305764,0.8773708454291635,0.7996366562503503,0.7882958459468405,0.1806138202768779,0.36212519909671625,0.7590070671538645,0.6556014393514169,0.56651972609786,0.7796325494385317,0.2608526990551412,0.7539687390079683,0.43354798030495734,0.25057414051091054,0.09733752121926909,0.3388783762879384,0.7250927987207061,0.31024270955387867,0.15065897046912702,0.702801992572607,0.13157765670643773,0.03676240300160716,0.23192934711832347,0.32587253832032514,0.7503974284002555,0.06546049609756244,0.7344012031846792,0.9884495688093158,0.1431535969520703,0.9319913121750982,0.902544355011087,0.28563028563241555,0.15666078814633577,0.8397872977307255,0.7512814345490106,0.6447521328282815,0.3473852851609043,0.5762274129868279,0.9573589548788684,0.8024489515253366,0.7032209585223372,0.43928284371337667,0.08948150797744447,0.42592099637649405,0.24372742263683755,0.779725194228607,0.5702268267799777,0.6059023488209965,0.9989169868381331,0.16492214128403915,0.12060194502915045,0.5771385166508385,0.5905922457395976,0.7006319937779966,0.7248071266397778,0.6927270492736037,0.845879184776982,0.7624306238546499,0.8179834234552441,0.3690006735287976,0.04768223100567481,0.44746634151363307,0.9773015846176043,0.09036680720607482,0.8116001256118819,0.6111676130229085,0.9011695262251693,0.811916527433644,0.3384023097209541,0.6649287997560491,0.046874178419334056,0.19627538967058134,0.6467554494403327,0.09876561793254401,0.17186802003794566,0.019137601100933432,0.9690085815025957,0.31181338219013943,0.5886255068567596,0.8794822453490507,0.5093516394975197,0.5453746196524192,0.20984142490129165,0.3166985803107021,0.13663919008536562,0.8064983452537644,0.7887126321912494,0.8299706357358807,0.8356742131148316,0.6308702999906257,0.356232309633157,0.794546969966053,0.6576549054482388,0.6936260813354518,0.18417595200690973,0.27925210362840835,0.4598571479911133,0.7244383953132454,0.14905461297471034,0.2780799365347524,0.5378349023352269,0.4820863198523371,0.2158994399574592,0.8311297220860026,0.8649764542116891,0.44232402460449993,0.113250525636448,0.2375001624029136,0.44140234731122474,0.8565249155773358,0.8876812104273473,0.7234551084591982,0.6715988167645095,0.45223736126433445,0.8803209627504436,0.15609002284696327,0.2467440658633464,0.32715834637349417,0.0840887222906479,0.7653305472573719,0.6121109595106569,0.4211312347544103,0.6969885272496343,0.8794103034479464,0.5926848913140101,0.6219875051567121,0.15485103516109344,0.08582557443126082,0.6169041049084718,0.13095236409570576,0.41007633163874857,0.7648315004749302,0.9485108287094299,0.9405091643585288,0.005666473998785504,0.3912193767105805,0.49331631735017756,0.8540678931677144,0.8832444407784701,0.7420997586923759,0.12791870791835636,0.5763477821435303,0.7991724580341177,0.5207542042676132,0.35694144331181876,0.16122471968365382,0.1378577160523553,0.3734633132153691,0.2911517261972487,0.813821709546865,0.2700836895464245,0.2327988256047211,0.023231731713301507,0.7309956906680297,0.6073063206810545,0.2443585719977437,0.28084700270844554,0.7586950886862451,0.1284585547387327,0.5585740636674881,0.813356722341545,0.6536638260191332,0.9712875343388445,0.08614865274979677,0.6234503668806239,0.8468099129991522,0.5294826540429343,0.3542085734568323,0.794092033694983,0.7730192224609758,0.9408318190451739,0.5884968594794904,0.04464292979136264,0.47899409855391095,0.6414239036843727,0.8945534906179335,0.5837918936061137,0.5914338621579445,0.7755836936733866,0.09396758104616354,0.8687891350937664,0.9654703761364916,0.5862988818603982,0.9404810740299248,0.42903436276207585,0.9408650418101769,0.6967811564637301,0.00839187256668561,0.04019706862209782,0.15345980209243204,0.9946600202699265,0.8556034195433986,0.02121424760653534,0.6386505759180852,0.3328138174124624,0.5068928639462562,0.32376864336501976,0.309901172202492,0.22677508849279882,0.2110985158449996,0.14286834992968767,0.541192241114304,0.23633752979963152,0.9018280432949519,0.8582768228197069,0.4740366177488071,0.7841107497066244,0.8113822610945522,0.04163985716185703,0.6368512011242335,0.24609039027457635,0.9347935568778623,0.13254693903418846,0.8040707669378764,0.1601086367614677,0.002871424281468693,0.07508899844915828,0.8240326576054671,0.015382659736353554,0.9001853918250393,0.27148796238311346,0.35609877545409496,0.09960127982131439,0.24851925663036356,0.35571644112423173,0.25985168334552555,0.8309549515824719,0.05410312077971402,0.9887969534885623,0.8793058678327192,0.7069852873023583,0.2661057144922534,0.7813379623452212,0.8519037052611551,0.7575873604343242,0.8191439065429564,0.7579147678590032,0.9018836533039909,0.07584977622519262,0.45167111599635557,0.9808215113444261,0.052336530359971434,0.6348340704135096,0.6443029802273115,0.4863324334116863,0.7998201664020885,0.7173272376119315,0.35905072333654675,0.5633402168145973,0.9969138885040154,0.35602756939851266,0.07339227510941138,0.054077741583709926,0.056417863197753215,0.5325224033202325,0.277324702837195,0.29201930146551414,0.49239768960014474,0.0036899702124317812,0.28013714018314206,0.5959790602696196,0.8179083122295687,0.559077186349815,0.5990267518783585,0.4452073412505462,0.16051287608189568,0.3739937292084592,0.9739048432429682,0.7451530490385889,0.5130198875418388,0.25970819963563496,0.6558145652192608,0.341667372521677,0.5651337523488114,0.3305443229777345,0.2690554361510955,0.30757747659059365,0.09250316284716464,0.8289347422389937,0.7145770078350853,0.6876800524467932,0.805287484325272,0.7316111829710052,0.8940976368419467,0.8687948546256581,0.5371231106102516,0.6306784625018111,0.8624095189792036,0.3734109732976434,0.022345502475537682,0.11303681795015263,0.10873668706263273,0.5827027387076984,0.889584850117868,0.6682293312924135,0.2782409213230814,0.6969515156470851,0.1092544073821784,0.6973548095785609,0.641029463000407,0.7480766408969661,0.4853307650740466,0.8094948258167189,0.930171811113391,0.08422328571552606,0.7244261404364389,0.06998969004296485,0.5817110850657519,0.05021322428760433,0.3713932217185123,0.940504171692083,0.8630636499996898,0.4753486120835062,0.5862304252906585,0.2481760920589724,0.13668881070628314,0.5393495029744004,0.42672124234568654,0.0019344210815268603,0.8852890736416157,0.508759187707994,0.7217594179080891,0.2105959904304231,0.7828421233791123,0.6911802122842283,0.9592162947360414,0.8175657882671972,0.6855976747515622,0.30902857049545873,0.8044356075716301,0.463030299343977,0.5453682960244823,0.6985056347683016,0.2538719671623555,0.6073086717478791,0.8693151245207067,0.8058641476934172,0.7729773362104098,0.5948361631004908,0.013892977985058286,0.9725132143234188,0.11949090992760447,0.6886871776883978,0.9769723717111114,0.27652837611819536,0.237924313277182,0.03385875477154365,0.4714978309194584,0.029475040587448653,0.4808228145848441,0.7695434209942991,0.8928172313554641,0.5710129614275912,0.49823553410968935,0.740076768678152,0.7784731582878379,0.9902708882064968,0.4280026595746911,0.6494210694930824,0.7589698781920342,0.18950546545697722,0.07670753655133522,0.08257293693914503,0.23273465200417154,0.1673643484600209,0.00999523474756403,0.00468804283756441,0.11594964527939866,0.5558963206650256,0.9666781644426552,0.9970192647678675,0.6421566787823285,0.9661105767073699,0.7671914007930787,0.0008904082462282137,0.22328273308034619,0.355017206416365,0.3509177281889406,0.34622101552857987,0.22857324950156244,0.5460407472936923,0.16458469532888076,0.19525852983597702,0.6807556139307527,0.957040411069612,0.1366631566579608,0.28038263068016667,0.8424107740263347,0.9283054418046288,0.6100869747482367,0.8797373202160335,0.4846203071163493,0.91188832483085,0.2513291295923876,0.18061135598465472,0.19095265679676499,0.22420315096054333,0.6782923132596448,0.8419068188755634,0.8441900809032676,0.010157847140830789,0.46483304628384303,0.6042613083512436,0.7882986174799633,0.42921968053599513,0.07676748711324333,0.7360224269894782,0.6220950226637163,0.9185079071902631,0.8313022578922236,0.7632108931692181,0.5829285513361415,0.4680643795251296,0.47843226437622977,0.04789346632657532,0.8078184819645,0.9318757419805606,0.7037247054453377,0.7518964249257272,0.6791573044269201,0.09703778024041654,0.3474601865834983,0.12297806585776039,0.44987131840217387,0.5482246372160493,0.17798609853483716,0.2192218479544954,0.3950022136255953,0.696070548833414,0.31622299399269704,0.8640533335537419,0.0697808707294838,0.0298050856761245,0.39905406400175836,0.39438731389330584,0.26626216758644183,0.8030443570657799,0.04795430119215571,0.7998365456507921,0.15149140072800393,0.8176844356084125,0.19911706904361326,0.5861196882544117,0.5403918929328784,0.5533794806382948,0.7070470568255061,0.3893251661428503,0.6106041310705019,0.20846361340502528,0.085485176722367,0.23905265616273796,0.6209801497632743,0.46755323372577107,0.3319012572814515,0.9450996559958289,0.3562987135615798,0.574790603697825,0.43220794288313824,0.04157936871515999,0.8734664890959953,0.8510709803188146,0.21613091024287723,0.3911088606250912,0.2803892525675513,0.004579092752967195,0.04376523907943741,0.7400040019883849,0.28180397752431596,0.5102507555716158,0.5557562570477341,0.6398687735285551,0.9586033891524031,0.6854413740850656,0.06947304383367436,0.7475743758292901,0.9775582424849221,0.9176811548885697,0.8124749640984981,0.8788323562101208,0.9949926763775803,0.7798283600494957,0.647923024190233,0.5121704136563099,0.6298272378949055,0.21756213055313123,0.6844830221049836,0.458370757599291,0.17188885159729872,0.8016413732573993,0.5329377250414067,0.7109192304184535,0.980332507076741,0.08482331069059179,0.004186094072588853,0.8670564326100367,0.40847901035273537,0.09296509980084022,0.025632322357221238,0.6050531899505149,0.22545473242521408,0.6750637166120785,0.41179295677810424,0.11995670851586104,0.6434101293329908,0.9455160148549264,0.23097631358498805,0.7452635861513213,0.7805017388825091,0.6095074390643229,0.26393196097903004,0.9741120146654758,0.49716321320545,0.5348512395950187,0.9090858658923446,0.11999914942123047,0.06952006266825483,0.9164139125003647,0.17118509524815462,0.34470115551868674,0.24204056553862507,0.489726243200157,0.16189081238626346,0.5530617217628873,0.7617998724178716,0.16343035181434473,0.04938409199279992,0.8666476602646478],"p":[0.1927345984565371,0.024550208954996402,0.058107990716072914,0.07169345648056384,0.02922797585701771,0.15109126341828452,0.09975733519082107,0.10013436170108864,0.07940953794697632,0.03897322391969556,0.1623302005639387,0.03463462308203975,0.13085747145715598,0.12972551281514605,0.09607332756280772,0.10409588384748832,0.004598644447161027,0.14002967218091894,0.19137828973831472,0.19721812385296117,0.10961343851840324,0.08670758620894459,0.1312097464381822,0.19118566689907912,0.17728694948529486,0.010681234160687093,0.0067681352181811595,0.0686729555486747,0.11370508493161378,0.18394193692152663,0.10748238117252225,0.03817178489903577,0.14530165562257302,0.009531116394808015,0.0715327318001755,0.19165779082270734,0.18999962698694497,0.11520066741655195,0.1499018460017327,0.07508037774824881,0.02157157837338999,0.09445116339241558,0.17131767003811907,0.004208767432339266,0.0030489555738733467,0.004750727000735422,0.052134987287510315,0.09930637726427416,0.1358933113111713,0.027950357953670447,0.0922286799816729,0.05547137296148002,0.17696752741877436,0.08761871490355758,0.002213041958722517,0.15171031256745776,0.16088879303369819,0.04635913791653801,0.0998782295207492,0.10293133562613549,0.11131072916165885,0.171879606488201,0.19766564465548697,0.10066575908278926,0.16560991506166955,0.10400220937769414,0.053677652063114506,0.17982666414401394,0.0036908560217453704,0.014912396636323067,0.0036356482320895724,0.18038415381657735,0.06895389277101081,0.07907942083450498,0.0031601116819837127,0.12038591802204937,0.07788137220687884,0.19005411397709027,0.17942726328901204,0.11594445397257576,0.05858928832534987,0.12201791497326729,0.08688587345023265,0.1947684775545423,0.04571954840603523,0.06617069110152318,0.18586715139751983,0.054250953186491695,0.19169203438080304,0.1688632864464412,0.18833185219122042,0.06779504968119797,0.15503101585311688,0.046426103391709855,0.017404179111892005,0.036907862451589724,0.1960072188278836,0.017794135178696237,0.153616839505004,0.1845791629331143,0.08466398859953875,0.16059574135622562,0.13284804788234794,0.059648152686058165,0.04971102135289614,0.116090191835709,0.13516758470519022,0.022640831439700283,0.08377302657825424,0.03479172502309833,0.01212072902391066,0.19774360182552353,0.12643683972758288,0.09178182285569295,0.1464684216469018,0.16872962933829402,0.028869546684585946,0.024031258897075514,0.16088838809605976,0.1825976839082522,0.06721298015609137,0.09038991015520287,0.10263831840173676,0.02903793298236823,0.07429811040892353,0.012752137767298999,0.08984864735298026,0.04436476409366566,0.0008669550056113362,0.10974697328545685,0.10036126027726144,0.07446060866567042,0.05697883956659569,0.14536513588575792,0.1438501214962729,0.010303687895191073,0.10260854602601213,0.15567826921066477,0.027734492177715533,0.10456269198472534,0.011352768157547377,0.12007803743761941,0.03152943167244802,0.17675786162821328,0.1739390850406445,0.1903672016815956,0.125071136830556,0.021605156106555515,0.01645028744153141,0.18571688732680847,0.1454548298278779,0.06036194127345649,0.07229755430099219,0.04902336288734106,0.06865682474997925,0.16917521098752158,0.14847118456452854,0.12325043517150439,0.05151515126605939,0.05019021028351456,0.19362354516684344,0.010380829418976402,0.025010241777855314,0.1398426157467106,0.07685032879659692,0.13014111548555105,0.061248107791196965,0.08102525070183608,0.0878479976383117,0.09842597848673501,0.06495067696634478,0.11703214442478585,0.014438924971626445,0.04424935234113847,0.1814169240030825,0.0953541378288695,0.07077587811171818,0.07850021098865359,0.04927787717278598,0.153150056119694,0.07080181924880971,0.04836257293530948,0.16948672193283826,0.06853747294263979,0.06860343048737816,0.19921407747937284,0.01611620536023293,0.05424234777303014,0.09025312605787286,0.05762275306528162,0.008436291250021632,0.16913661638578814,0.13411615108252933,0.15615519185536592,0.1706878939775244,0.07410785048347375,0.019871024451420905,0.04818007043662287,0.06839172531392915,0.17230173533281554,0.15313875462251653,0.1629691150014547,0.16569187783012038,0.08286147216707392,0.008018320352197428,0.007826351816610356,0.16634828028105975,0.09987314558837378,0.09392939000894779,0.0018144022210536015,0.09262868902975044,0.13608953191301604,0.16767488040469264,0.03335365724332271,0.0055302631574401856,0.026731431167161725,0.011072069390974626,0.058563475724407565,0.009722126261726062,0.10352223680716861,0.031339727207741676,0.050277698414551125,0.07977233370526107,0.12283076765548176,0.06892760316889412,0.1896785807935697,0.11288946522629449,0.05654447581426836,0.014980089848935618,0.038270933029680966,0.09612320305347871,0.011370291808590949,0.13459206210013042,0.10149912014806631,0.04252679091916134,0.10057311581774715,0.15220263881012006,0.01656788702962375,0.18049357933678573,0.0807928149858289,0.15062277894175763,0.044109368544476,0.08390948314294114,0.16288200144952858,0.1886592069029113,0.040439963420766833,0.15303678224272144,0.10918155962611463,0.16377017418987397,0.06238153423301438,0.14382893567015972,0.05105885772552465,0.12466984469660658,0.1407754886825796,0.10223427795597893,0.02869476391268022,0.031648306732525944,0.06390366484329064,0.03901658337630307,0.18139251874027174,0.17727412804216316,0.1580405272864298,0.04253385123997591,0.036864663867009595,0.043601084283684526,0.034851556270956374,0.06628212009702353,0.1569630561421066,0.10522810133002324,0.13381901567951365,0.16176175466515397,0.07227849218639575,0.07657329681317125,0.05192808484745979,0.020218675524533047,0.1810709674989547,0.0021027365553643487,0.009396315070259221,0.034268097197530344,0.021604967684576027,0.19777956186289952,0.12792056819024397,0.10865105479258785,0.11275016371342864,0.09861968169229055,0.06582558761334734,0.12613476861950268,0.021456470689083098,0.15555433312010153,0.0367554454750517,0.10148127150676066,0.12122502573127272,0.16379309592352312,0.19584839269441667,0.1352124476530049,0.17986900461735453,0.026542528646489982,0.05796531083591519,0.07817629245523872,0.01325931679951582,0.03196895478808472,0.036778717918963366,0.03984122634167342,0.03057304693748697,0.1722986272366608,0.014036395337837116,0.057415450824459806,0.04017805431692523,0.1589375474767258,0.02416454770538126,0.13662835924324496,0.14988395769287655,0.15576767496999555,0.08355966776126388,0.18373243586198895,0.05184582734003662,0.16952728929210026,0.19324809363640486,0.19324373402566164,0.04745656919806876,0.10801375657107207,0.0020735870066939557,0.19531089966555656,0.010386831758281723,0.03363757976793935,0.09708800389034185,0.1870062780657046,0.11896814322606773,0.08687639888553385,0.1681706817210772,0.05042490345779149,0.05859199197982506,0.1536586470333201,0.06660152879724746,0.15441552444291912,0.14441424091723265,0.09298926204852404,0.10599595073957167,0.1574154034052266,0.044603867295422366,0.06065370155582528,0.08656855804080457,0.052135276658914265,0.15376914053542518,0.19900699532217964,0.07861203164972204,0.19811133109548493,0.05912747668358542,0.1196231518216267,0.14821621116489686,0.13246751491184194,0.07841802192170647,0.10975198669020605,0.12236983524740888,0.011280786187844116,0.06014712112484211,0.004312041733772443,0.014001964751719909,0.018966148679295625,0.09275491727634728,0.1376926333301797,0.0006415264849819913,0.11773593693910295,0.09694543668754507,0.033717616580222654,0.0059878851270388726,0.12816544058908774,0.12458321345739685,0.18041716374144842,0.027512563676169145,0.18463155083219762,0.06755970169349582,0.05968220855109144,0.014492424273880245,0.06802488802374547,0.09910860868743346,0.0007752065990092483,0.18832870169087657,0.12304591093885825,0.1557900470483828,0.007645023453621703,0.08887592366415956,0.010848380031104866,0.015661655460252756,0.11495588015024959,0.06443061325457854,0.08920005262548956,0.18623930317379056,0.13606330902035585,0.12597977132191632,0.1686274583314329,0.021880449417447736,0.04654894994195518,0.09148448852441625,0.06974290987932115,0.00031301028921988384,0.0036966172699141268,0.10147651023393625,0.13237330338043676,0.16815043944236346,0.0794365427051277,0.16605180672630926,0.03634506782578502,0.07928153130492094,0.10160002334290447,0.06935032656206323,0.19430209274210544,0.15795272214352601,0.06916694634705371,0.04910895154920008,0.14610133117614144,0.006990791481145653,0.06049765801367451,0.021631260273635135,0.16116257613528728,0.13775333502044548,0.13279201227910314,0.06981267634337143,0.05650566968476994,0.001632665733549521,0.028053125265179182,0.154698517762471,0.04930412723550788,0.17624193045206984,0.19911420344821376,0.10911120096321146,0.12903149615602524,0.05618140116372947,0.11673117363153206,0.0020299402356449116,0.09745301416420445,0.09476500743734567,0.1380357365391872,0.15476465196949546,0.032528357961255104,0.1496264308539251,0.17772250935598488,0.007327897022455777,0.0008612051684151024,0.1168574801533108,0.10779263491952706,0.002322511524246851,0.06072130344434652,0.08577751933371768,0.10981600002403856,0.15144702849530553,0.16323324505177822,0.09954745915723642,0.03792142055285939,0.16555924163850977,0.07723341876461315,0.13322588566224366,0.0030252357659743545,0.16080706095940941,0.04080676080997461,0.03313360558302549,0.11858709184683663,0.10590429635341461,0.11128077866710454,0.006632496144057143,0.1639455865390314,0.07321108610937758,0.10512563447679485,0.19224721664499245,0.14409861603697074,0.01036912909966552,0.017835511152689245,0.1676261026009388,0.13074585266520167,0.025866446803162503,0.07338189866416607,0.03645101338971828,0.13867781390230038,0.08617638405165846,0.12796385386741635,0.03168042756406475,0.15346791631898676,0.005497921679326102,0.11219416429958665,0.17347101957279443,0.11817487528426285,0.19258135905194715,0.19978470153793504,0.1349445293565601,0.1434615547788854,0.10443710439237713,0.08543696409521516,0.06891237653620799,0.10211158781818344,0.025207373720280837,0.14296266911920094,0.0156065064534189,0.07076911896404874,0.1901678377327614,0.11717095822658741,0.08655952399008467,0.023312982680206054,0.021962181108929536,0.19036587149127324,0.017268703863631264,0.07503657948545205,0.1259324158996262,0.12434564544056843,0.19012792954483754,0.19947784688854553,0.06709091853880858,0.1802170003280634,0.11627473985646289,0.1659687189472864,0.1574322892604562,0.16650394275449193,0.0022439747371889585,0.0835938438675754,0.16474022568134916,0.03365407044222004,0.05198687455629743,0.011711404024946815,0.16799521044926236,0.18479077526205412,0.11297935067505077,0.08310913640894238,0.007721578810445307,0.16098954413663416,0.0757370029969851,0.17382273537569357,0.1452825809469924,0.11390964820283421,0.03020111392238376,0.04828571125458279,0.0034802613191434076,0.06123020330960469,0.1987262182491786,0.06261371852617606,0.1707272517597847,0.10775472823741246,0.09660565212130297,0.04080258955752014,0.19160131994284735,0.08452766241641917,0.1573953198764913,0.14403909633577264,0.07826761360459998,0.0011342007019941925,0.007399451857464357,0.12582601982032146,0.15868038683217933,0.11877796904698351,0.04335464185055753,0.06919061326397728,0.07537043149216452,0.12757631399382216,0.0688713867506988,0.19961162375585034,0.09323514288845175,0.15882098596658945,0.0353375021011682,0.003152863355729352,0.16629639092896376,0.18380610975475245,0.06278439395781255,0.18019625349673754,0.07964931791117112,0.14054002550594125,0.13713589365636136,0.1789612303718347,0.0592940548366669,0.03264667713379175,0.008924170894892525,0.03675818588946429,0.14569794342489667,0.15461961781918312,0.08476781487120144,0.1722052512592498,0.10942011911695655,0.04332724989432442,0.17926144065746247,0.011546858588996445,0.011054793999515412,0.16144976975060016,0.15083597554924044,0.17515887460906776,0.026293021298473954,0.015566848575688264,0.036141959358504706,0.008529438327822802,0.17114192519272575,0.12149414643332795,0.1515456226588993,0.03610523888469488,0.07049181627356119,0.12682147371574973,0.1973763024950276,0.07136319719243782,0.1837270520295253,0.028682944049618443,0.11130468128200688,0.16311329612258052,0.05590085807318817,0.15049412892154734,0.00853250298346544,0.07883611660426171,0.0018522796420633815,0.009750988723866883,0.19899315218146507,0.13040097580580207,0.10427940665242269,0.17269480750883803,0.016302286407682054,0.1519235999426225,0.1698453468094956,0.1361725984538522,0.055755349241591826,0.15869150309502666,0.17428118919163482,0.046045703937652595,0.0977289265850096,0.1963029286491219,0.013706992044439216,0.04751764517370116,0.08445823246797471,0.11227869531715129,0.055758935034057266,0.19606541403120215,0.18165004577157962,0.10185305411780723,0.18216712667138202,0.10271463599557543,0.09140817654982746,0.15382428775107365,0.19905048502041858,0.15053526239164766,0.06247902724830512,0.025463383915562778,0.149918082158157,0.11197806058677773,0.19961598850778095,0.0635957607491684,0.06732925607917206,0.07980527242725884,0.035985404122320874,0.09348702555329146,0.15351328151277752,0.1962729120696064,0.1478983367673751,0.17706017455043957,0.18200750648961722,0.13457980848611414,0.1259946401823389,0.12728694641795726,0.18840644569257847,0.18959478013769238,0.14586973890040716,0.005244032804332344,0.01040038162966308,0.08563649014090419,0.06839249403191548,0.027606589914642446,0.18516843249018644,0.19892783461087069,0.05508092797417428,0.19934094097301658,0.04706630337089038,0.02010250611106601,0.1984850967539059,0.032896462792974424,0.02428098023470029,0.16194292821592496,0.047275186533071084,0.1114743851262836,0.15413336455330484,0.19524674340666315,0.00586680567125355,0.0391151435308331,0.15157739239095475,0.14692306095885566,0.03744070879897401,0.10877778848422054,0.1412695269472395,0.1995484658032488,0.04150833451416931,0.012082610744945523,0.11103439796825315,0.06599532612673752,0.044125477147768204,0.14810694124304594,0.11428332503451344,0.16641711590325753,0.1838874911990656,0.10722933188598854,0.07024788932503383,0.031979382978696916,0.05863717607881274,0.07337254711814656,0.15026621832722098,0.06939354922715686,0.10296887471146757,0.13627211256752045,0.04389148618144145,0.14160112787456117,0.0842671491800985,0.023509580347220595,0.13125123708829625,0.025241098186538437,0.17231415483226642,0.15071723721636565,0.177189612821944,0.13661683111826559,0.14179682702868096,0.16374725149536384,0.1121518558955212,0.09812911502698621,0.07835773984330269,0.030780126527892283,0.010428296744150734,0.15940555651397512,0.06603208627386695,0.10723985494954867,0.19232280167746532,0.157601088789834,0.0565184925436657,0.1695295790328195,0.0830211796092466,0.14507261627532247,0.07127971688578603,0.1212550834568761,0.17775679350639512,0.1611085906349531,0.17562399740179943,0.0969904306357782,0.02513388985554914,0.012523806674659977,0.10871945016996243,0.10323870996906558,0.09230285483443441,0.11622811766542385,0.05383292489891272,0.06608925356686117,0.19891812345640114,0.10963468422353989,0.14630806445291383,0.16619572133659896,0.1136961879774649,0.1378537427955667,0.10868921361757532,0.1740371819590681,0.07372669137301782,0.16212287632810063,0.11481583466864015,0.08665963333553313,0.034558938707936006,0.08570481944419828,0.1412027355993952,0.030242339271119967,0.18808543363534583,0.11200115633627156,0.16235711767380626,0.006391018494308654,0.03978379866408508,0.007560552338592874,0.11254580690314087,0.10273136199740801,0.007360008993947798,0.10145476938944001,0.10493222915173472,0.1448431119971803,0.08081366587790734,0.15241254186602815,0.1188931708331622,0.08369115643067554,0.04509243896074695,0.11747712995106081,0.14345970539764083,0.14788514897532554,0.09252625915134241,0.0022783918993747767,0.012384915681982368,0.03131485010882167,0.0655852943313736,0.04277713168207869,0.12719161952913366,0.1157610177373985,0.013634873842607843,0.07519601823678489,0.058386212197529465,0.1997744073180341,0.15195887183234122,0.13755354573926826,0.1889218085079194,0.0578169979421916,0.18433460699204254,0.08738883266133586,0.038270819328915455,0.12086406747953969,0.07265769007912125,0.18173999329001714,0.1458234111192807,0.11592183969145053,0.16165535936958425,0.06457449072887052,0.03353555638400398,0.05711724042739568,0.08842195914647624,0.11163119199996357,0.14995887255701668,0.16803100591291265,0.15901855735123452,0.1824107800000413,0.19230982361810006,0.13938945641195968,0.15705390568946137,0.023804162361928328,0.013718269492905933,0.17861723135413266,0.13081643848675908,0.044634019664010975,0.1074766136220557,0.17711097888513916,0.021569943517844428,0.18678132839743658,0.0661986972247187,0.0024315160084825483,0.11936750295481913,0.0505283942439891,0.14525858799881128,0.10530856588066749,0.15331450414390316,0.02550692111862416,0.0005357728757573899,0.14062885777606154,0.11082929883029102,0.06319029022454994,0.041520927279394826,0.1334481222100304,0.03324546007341165,0.13075908193344352,0.04422736312243041,0.09288372338529549,0.014098408420318754,0.013080087059736423,0.00031158841154450557,0.12647763901196682,0.14189685696110704,0.09931217566436748,0.0671796250730258,0.11881546176189794,0.029352002942459876,0.056884201372855214,0.08125691459671601,0.1581769692671915,0.08093242280773083,0.1926251826228428,0.09530888567951715,0.04934271769594703,0.037450911451911754,0.10479826993171676,0.07808378612772038,0.1122945720944443,0.06744226578945223,0.11564580614809881,0.1672351984895659,0.11798666662265128,0.0937359833689067,0.055455839630964836,0.09181730542604326,0.04724972906644834,0.1853830579570154,0.12332689366369115,0.08162803883267591,0.09980806858334135,0.14268393933234022,0.0750053278609951,0.10593997876336943,0.17089023980402512,0.07209414984858205,0.009274619405667872,0.1617844669481562,0.04977023391639693,0.047793076439998576,0.10780978065653804,0.1743677850381202,0.07819901010286562,0.18437837017956313,0.19196466795880995,0.09527204350901011,0.06867575598545327,0.05386479384329826,0.19061987398118588,0.15925960566983718,0.1360435350439051,0.16587772422228692,0.036877671650290676,0.04747658767923775,0.05941514998508168,0.04920840655383496,0.18848627800276863,0.04875301407135435,0.008143798379169453,0.08999693498761281,0.1006834691092816,0.12777615444277268,0.023520447928219168,0.14423763889320673,0.14097158362010057,0.07293929916418955,0.057193306053047316,0.17982308424252322,0.024716708159523385,0.015189438017242596,0.1461390705435138,0.1154812572276181,0.12822314576621172,0.03192705278613608,0.13147261555073383,0.11783868132589213,0.1467241911972202,0.04427212545023443,0.11828353372704373,0.020549438737473214,0.16805245575181652,0.093317536392663,0.1543155738198877,0.14392447227160862,0.040013746522563357,0.18590072941414723,0.17086560922937402,0.18637466024739846,0.05759288416409847,0.019782645336754626,0.1410811035958981,0.09277018142344731,0.1998131751813948,0.13738446129745294,0.07149415145419487,0.16957122717307024,0.04630771970512431,0.04676851572279222,0.12796883910094908,0.10575809105643286,0.12382808295615266,0.14125876056068742,0.023280368736488956,0.10502142358325527,0.12332469956466503,0.047178973989688844,0.07437706704630753,0.025765190666280403,0.07644608920767051,0.08599095986842112,0.026328687887840464,0.17949991053732892,0.1637049989584076,0.07534846095334871,0.036762605856731634,0.14153434768677695,0.04362511343251847,0.02069627996857766,0.11270420030578006,0.02293476060304176,0.06891313387755403,0.19939032502873838,0.16125809470691643,0.1895196491960578,0.004572463621323353,0.02425827030964709,0.13377918788166757,0.0042403207144668725,0.17139107920885827,0.19565555708252624,0.08218222296218532,0.028992286944448067,0.02620859531041844,0.11547387620548313,0.09787398993793128,0.15041817552164793,0.19339133173469475,0.11090449679502067,0.1010713853864055,0.05662349069579649,0.050647814153441974,0.19131216695170378,0.0590162558548589,0.18308656613618882,0.08658561061410582,0.08029150640415024,0.043627481387770485,0.13563176248525438,0.1699073682090289,0.14520986014395781,0.11328805514803904,0.16027007888538308,0.07057984332437006,0.025592116631454956,0.1232666948816838,0.13329111100758606,0.1795274609726136,0.09145362481582167,0.10755085783456449,0.12473769247827696,0.013333645276331874,0.07952111665495054],"n":[15.0,1.0,4.0,17.0,12.0,4.0,16.0,13.0,9.0,11.0,12.0,17.0,12.0,9.0,12.0,4.0,15.0,8.0,18.0,3.0,13.0,4.0,16.0,17.0,12.0,4.0,1.0,7.0,14.0,10.0,7.0,5.0,10.0,20.0,9.0,4.0,11.0,13.0,4.0,6.0,8.0,4.0,18.0,15.0,4.0,6.0,14.0,2.0,5.0,7.0,5.0,11.0,10.0,13.0,16.0,3.0,2.0,6.0,7.0,18.0,4.0,2.0,1.0,5.0,9.0,10.0,10.0,10.0,13.0,8.0,18.0,11.0,8.0,10.0,15.0,14.0,14.0,12.0,17.0,2.0,0.0,11.0,13.0,2.0,16.0,19.0,10.0,7.0,16.0,19.0,6.0,0.0,15.0,11.0,14.0,14.0,16.0,3.0,2.0,15.0,3.0,14.0,10.0,11.0,15.0,4.0,4.0,4.0,12.0,11.0,7.0,1.0,19.0,18.0,13.0,12.0,10.0,13.0,5.0,5.0,4.0,17.0,0.0,7.0,12.0,12.0,1.0,14.0,6.0,6.0,5.0,8.0,10.0,3.0,6.0,20.0,8.0,17.0,19.0,8.0,15.0,10.0,2.0,5.0,19.0,7.0,18.0,8.0,5.0,0.0,10.0,10.0,5.0,2.0,8.0,6.0,16.0,12.0,20.0,9.0,6.0,5.0,11.0,13.0,3.0,10.0,8.0,6.0,7.0,15.0,12.0,14.0,7.0,18.0,16.0,9.0,4.0,1.0,20.0,7.0,6.0,9.0,8.0,7.0,17.0,17.0,10.0,11.0,2.0,10.0,7.0,9.0,19.0,19.0,4.0,14.0,8.0,2.0,5.0,2.0,13.0,15.0,8.0,4.0,17.0,3.0,11.0,19.0,19.0,6.0,6.0,16.0,1.0,16.0,12.0,3.0,17.0,14.0,11.0,12.0,3.0,11.0,8.0,7.0,12.0,16.0,15.0,3.0,8.0,12.0,14.0,9.0,11.0,12.0,4.0,0.0,6.0,2.0,15.0,4.0,17.0,17.0,13.0,7.0,2.0,13.0,20.0,20.0,16.0,8.0,8.0,18.0,19.0,4.0,17.0,1.0,12.0,8.0,7.0,16.0,3.0,2.0,2.0,18.0,8.0,14.0,19.0,18.0,13.0,9.0,17.0,18.0,1.0,13.0,16.0,17.0,17.0,4.0,5.0,5.0,1.0,11.0,20.0,9.0,18.0,11.0,5.0,10.0,20.0,2.0,15.0,5.0,3.0,19.0,14.0,19.0,10.0,14.0,17.0,2.0,11.0,7.0,3.0,9.0,8.0,6.0,6.0,4.0,16.0,9.0,12.0,18.0,14.0,8.0,6.0,1.0,18.0,2.0,19.0,10.0,1.0,1.0,16.0,16.0,10.0,3.0,4.0,8.0,19.0,3.0,1.0,7.0,12.0,17.0,7.0,19.0,9.0,19.0,4.0,7.0,16.0,11.0,14.0,6.0,5.0,16.0,10.0,15.0,16.0,12.0,18.0,16.0,0.0,7.0,1.0,5.0,15.0,12.0,3.0,14.0,2.0,1.0,1.0,6.0,20.0,17.0,11.0,15.0,20.0,5.0,1.0,14.0,16.0,2.0,10.0,6.0,1.0,6.0,7.0,20.0,16.0,10.0,17.0,3.0,16.0,12.0,17.0,10.0,8.0,7.0,1.0,10.0,16.0,6.0,7.0,11.0,7.0,13.0,10.0,3.0,1.0,3.0,5.0,17.0,8.0,12.0,3.0,8.0,4.0,8.0,20.0,4.0,1.0,5.0,6.0,15.0,1.0,7.0,16.0,1.0,8.0,2.0,17.0,11.0,17.0,17.0,3.0,20.0,6.0,2.0,17.0,5.0,2.0,17.0,2.0,4.0,14.0,7.0,16.0,9.0,10.0,0.0,19.0,2.0,20.0,15.0,7.0,15.0,13.0,9.0,0.0,10.0,13.0,8.0,14.0,18.0,19.0,16.0,0.0,2.0,2.0,6.0,10.0,6.0,9.0,5.0,0.0,1.0,19.0,11.0,20.0,1.0,5.0,2.0,13.0,6.0,19.0,6.0,12.0,16.0,19.0,11.0,8.0,0.0,6.0,11.0,2.0,19.0,15.0,9.0,5.0,14.0,8.0,3.0,19.0,13.0,18.0,19.0,1.0,9.0,7.0,2.0,2.0,4.0,7.0,12.0,3.0,9.0,12.0,12.0,17.0,2.0,14.0,4.0,1.0,0.0,19.0,4.0,8.0,16.0,16.0,2.0,11.0,18.0,4.0,13.0,19.0,8.0,11.0,8.0,19.0,18.0,2.0,10.0,14.0,20.0,2.0,4.0,12.0,2.0,20.0,16.0,6.0,20.0,16.0,2.0,19.0,6.0,0.0,1.0,9.0,7.0,14.0,6.0,4.0,4.0,6.0,8.0,16.0,18.0,20.0,12.0,0.0,6.0,1.0,1.0,2.0,11.0,5.0,4.0,0.0,12.0,9.0,14.0,9.0,18.0,2.0,20.0,11.0,2.0,1.0,4.0,5.0,12.0,1.0,13.0,17.0,17.0,16.0,16.0,17.0,3.0,1.0,10.0,11.0,6.0,2.0,1.0,16.0,3.0,5.0,19.0,20.0,5.0,8.0,2.0,9.0,6.0,4.0,8.0,13.0,4.0,3.0,5.0,5.0,0.0,2.0,12.0,16.0,18.0,11.0,4.0,9.0,17.0,12.0,17.0,5.0,4.0,14.0,16.0,12.0,16.0,6.0,14.0,9.0,12.0,0.0,15.0,3.0,15.0,15.0,4.0,15.0,5.0,11.0,1.0,17.0,4.0,11.0,3.0,18.0,4.0,12.0,17.0,19.0,11.0,6.0,19.0,10.0,9.0,6.0,2.0,16.0,15.0,18.0,14.0,19.0,6.0,14.0,16.0,12.0,12.0,2.0,13.0,3.0,6.0,12.0,10.0,15.0,19.0,11.0,4.0,8.0,3.0,7.0,20.0,15.0,13.0,14.0,6.0,11.0,4.0,10.0,16.0,4.0,1.0,13.0,19.0,3.0,12.0,7.0,14.0,19.0,7.0,7.0,10.0,15.0,19.0,15.0,9.0,10.0,3.0,7.0,13.0,0.0,13.0,6.0,12.0,0.0,1.0,7.0,20.0,0.0,8.0,1.0,9.0,4.0,3.0,6.0,15.0,16.0,19.0,12.0,11.0,16.0,2.0,2.0,6.0,15.0,20.0,18.0,16.0,7.0,8.0,3.0,9.0,8.0,8.0,5.0,15.0,3.0,11.0,6.0,12.0,2.0,18.0,18.0,18.0,13.0,9.0,12.0,0.0,20.0,17.0,4.0,6.0,7.0,17.0,4.0,7.0,11.0,1.0,13.0,19.0,5.0,17.0,11.0,9.0,5.0,3.0,14.0,16.0,12.0,7.0,17.0,15.0,19.0,19.0,18.0,19.0,15.0,13.0,0.0,20.0,7.0,14.0,9.0,17.0,9.0,19.0,1.0,8.0,0.0,3.0,4.0,12.0,6.0,8.0,8.0,4.0,6.0,17.0,13.0,7.0,14.0,16.0,0.0,17.0,17.0,7.0,6.0,10.0,13.0,6.0,1.0,7.0,8.0,10.0,9.0,4.0,17.0,9.0,5.0,3.0,5.0,15.0,2.0,6.0,9.0,11.0,12.0,18.0,8.0,8.0,14.0,15.0,9.0,13.0,12.0,16.0,19.0,17.0,14.0,13.0,1.0,8.0,18.0,11.0,18.0,17.0,10.0,6.0,16.0,12.0,12.0,14.0,12.0,15.0,18.0,1.0,20.0,5.0,8.0,4.0,15.0,10.0,3.0,0.0,17.0,16.0,3.0,9.0,15.0,7.0,9.0,16.0,6.0,8.0,18.0,6.0,4.0,2.0,1.0,2.0,13.0,1.0,2.0,7.0,12.0,9.0,8.0,16.0,1.0,12.0,3.0,19.0,10.0,9.0,4.0,11.0,11.0,0.0,2.0,13.0,12.0,7.0,11.0,5.0,13.0,11.0,0.0,11.0,1.0,8.0,14.0,4.0,13.0,9.0,17.0,14.0,12.0,10.0,10.0,0.0,1.0,14.0,1.0,20.0,13.0,14.0,17.0,3.0,3.0,14.0,19.0,19.0,8.0,4.0,9.0,9.0,2.0,12.0,3.0,6.0,13.0,2.0,1.0,15.0,13.0,2.0,0.0,6.0,9.0,12.0,16.0,16.0,15.0,4.0,8.0,13.0,3.0,20.0,7.0,16.0,13.0,2.0,9.0,2.0,5.0,2.0,11.0,18.0,11.0,7.0,1.0,16.0,9.0,7.0,8.0,5.0,0.0,15.0,2.0,12.0,6.0,3.0,18.0,14.0,3.0,11.0]}
},{}],34:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 20, 0.5 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 0.5 );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 20, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 20, 0.5 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside of `[0,1]`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 20, -1.0 );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 20, NINF );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 20, PINF );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 20, 1.5 );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a `n` which is not a nonnegative integer, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 20.5, 0.5 );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( -1.0, 0.5 );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, 0.5 );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, 0.5 );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` or `n` equals `0`, the created function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0, 0.5 );

	y = quantile( 0.3 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 0.9 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	quantile = factory( 8, 0.0 );

	y = quantile( 0.3 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 0.9 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	t.end();
});

tape( 'if `p` equals `1.0`, the created function evaluates a degenerate distribution centered at `n`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 8, 1.0 );

	y = quantile( 0.3 );
	t.equal( y, 8, 'returns 8 for r inside [0,1]' );

	y = quantile( 0.9 );
	t.equal( y, 8, 'returns 8 for r inside [0,1]' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	t.end();
});

tape( 'given valid parameters, the created function evaluates the 0% and 100% as 0 and n, respectively', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 8, 0.5 );

	y = quantile( 0.0 );
	t.equal( y, 0, 'returns 0' );

	y = quantile( 1.0 );
	t.equal( y, 8, 'returns 8' );

	t.end();
});

tape( 'the created function evaluates the quantile for `r` given large `n` and `p`', function test( t ) {
	var expected;
	var quantile;
	var r;
	var n;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	r = highHigh.r;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < r.length; i++ ) {
		quantile = factory( n[i], p[i] );
		y = quantile( r[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `r` given large `n` and small `p`', function test( t ) {
	var expected;
	var quantile;
	var r;
	var n;
	var p;
	var y;
	var i;

	expected = highSmall.expected;
	r = highSmall.r;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < r.length; i++ ) {
		quantile = factory( n[i], p[i] );
		y = quantile( r[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `r` given small `n` and large `p`', function test( t ) {
	var expected;
	var quantile;
	var r;
	var n;
	var p;
	var y;
	var i;

	expected = smallHigh.expected;
	r = smallHigh.r;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < r.length; i++ ) {
		quantile = factory( n[i], p[i] );
		y = quantile( r[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `r` given small `n` and `p`', function test( t ) {
	var expected;
	var quantile;
	var r;
	var n;
	var p;
	var y;
	var i;

	expected = smallSmall.expected;
	r = smallSmall.r;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < r.length; i++ ) {
		quantile = factory( n[i], p[i] );
		y = quantile( r[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/binomial/quantile/test/test.factory.js")
},{"./../lib/factory.js":24,"./fixtures/julia/high_high.json":30,"./fixtures/julia/high_small.json":31,"./fixtures/julia/small_high.json":32,"./fixtures/julia/small_small.json":33,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201,"tape":266}],35:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/binomial/quantile/test/test.js")
},{"./../lib":25,"tape":266}],36:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var quantile = require( './../lib' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 20, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, 20, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `r` and a valid `n` and `p`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 20, 0.5 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 20, 0.5 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a `n` which is not a nonnegative integer, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, 10.5, 0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 1.5, 0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, PINF, 0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NINF, 0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, -2.0, 0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, -0.5, 0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside `[0,1]`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, 20, 1.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 20, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 20, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 20, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` equals `1.0`, the function evaluates a degenerate distribution centered at `n`', function test( t ) {
	var y;

	y = quantile( 0.3, 8, 1.0 );
	t.equal( y, 8, 'returns 8 for r inside [0,1]' );

	y = quantile( 0.9, 8, 1.0 );
	t.equal( y, 8, 'returns 8 for r inside [0,1]' );

	y = quantile( 1.1, 8, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	y = quantile( -0.1, 8, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	t.end();
});

tape( 'given valid parameters, the function returns 0 as the 0% quantile', function test( t ) {
	var y = quantile( 0.0, 8, 0.5 );
	t.equal( y, 0, 'returns 0' );
	t.end();
});

tape( 'given valid parameters, the function returns n as the 100% quantile', function test( t ) {
	var y = quantile( 1.0, 8, 0.5 );
	t.equal( y, 8, 'returns 8' );
	t.end();
});

tape( 'if `p` or `n` equals `0`, the function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var y;

	y = quantile( 0.3, 8, 0.0 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 0.9, 8, 0.0 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 1.1, 8, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	y = quantile( -0.1, 8, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	y = quantile( 0.3, 0, 0.5 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 0.9, 0, 0.5 );
	t.equal( y, 0, 'returns 0 for r inside [0,1]' );

	y = quantile( 1.1, 0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	y = quantile( -0.1, 0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN for r outside [0,1]' );

	t.end();
});

tape( 'the function evaluates the quantile for `r` given large `n` and `p`', function test( t ) {
	var expected;
	var n;
	var r;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	r = highHigh.r;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < r.length; i++ ) {
		y = quantile( r[i], n[i], p[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the quantile for `r` given large `n` and small `p`', function test( t ) {
	var expected;
	var n;
	var r;
	var p;
	var y;
	var i;

	expected = highSmall.expected;
	r = highSmall.r;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < r.length; i++ ) {
		y = quantile( r[i], n[i], p[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the quantile for `r` given small `n` and large `p`', function test( t ) {
	var expected;
	var n;
	var r;
	var p;
	var y;
	var i;

	expected = smallHigh.expected;
	r = smallHigh.r;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < r.length; i++ ) {
		y = quantile( r[i], n[i], p[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the quantile for `r` given small `n` and `p`', function test( t ) {
	var expected;
	var n;
	var r;
	var p;
	var y;
	var i;

	expected = smallSmall.expected;
	r = smallSmall.r;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < r.length; i++ ) {
		y = quantile( r[i], n[i], p[i] );
		t.equal( y, expected[i], 'r: '+r[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/binomial/quantile/test/test.quantile.js")
},{"./../lib":25,"./fixtures/julia/high_high.json":30,"./fixtures/julia/high_small.json":31,"./fixtures/julia/small_high.json":32,"./fixtures/julia/small_small.json":33,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201,"tape":266}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the quantile function
*
* @example
* var quantile = factory( 5.0 );
*
* var y = quantile( 0.3 );
* // returns 5.0
*
* y = quantile( 0.1 );
* // returns 5.0
*
* y = quantile( 1.1 );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return nan;
	}
	return quantile;

	/**
	* Evaluates the quantile function of a degenerate distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.5 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return mu;
	} // end FUNCTION quantile()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":39,"@stdlib/math/base/assert/is-nan":10}],38:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution quantile function.
*
* @module @stdlib/math/base/dist/degenerate/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/degenerate/quantile' );
*
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var factory = require( '@stdlib/math/base/dist/degenerate/quantile' ).factory;
*
* var quantile = factory( 10.0 );
*
* var y = quantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":37,"./quantile.js":40,"@stdlib/utils/define-read-only-property":208}],39:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid degenerate distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = quantile( 0.3 );
* // returns NaN
*/
function quantile() {
	return NaN;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{}],40:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the quantile function for a degenerate distribution centered at `mu`.
*
* @param {Probability} p - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
* @example
* var y = quantile( 0.9, 4.0 );
* // returns 4.0
* @example
* var y = quantile( 1.1, 0.0 );
* // returns NaN
* @example
* var y = quantile( -0.2, 0.0 );
* // returns NaN
* @example
* var y = quantile( NaN, 0.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, NaN );
* // returns NaN
*/
function quantile( p, mu ) {
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return mu;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":10}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"./abs.js":41}],43:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/base/tools/evalrational":154,"@stdlib/math/constants/float64-fourth-pi":187}],44:[function(require,module,exports){
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

},{"./asin.js":43}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/base/tools/evalrational":154,"@stdlib/math/constants/float64-e":183,"@stdlib/math/constants/float64-eps":184}],46:[function(require,module,exports){
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

},{"./beta.js":45}],47:[function(require,module,exports){
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

},{"./full_igamma_prefix.js":50,"./regularised_gamma_prefix.js":57,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/factorial":82,"@stdlib/math/base/special/gamma-delta-ratio":87,"@stdlib/math/base/special/gammainc":102,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/pow":122,"@stdlib/math/constants/float64-eps":184,"@stdlib/math/constants/float64-smallest-normal":202}],48:[function(require,module,exports){
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

},{"./ibeta_imp.js":53}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/special/binomcoef":60,"@stdlib/math/base/special/floor":84,"@stdlib/math/base/special/pow":122,"@stdlib/math/constants/float64-smallest-normal":202}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/pow":122,"@stdlib/math/constants/float64-max-ln":195,"@stdlib/math/constants/float64-min-ln":198}],51:[function(require,module,exports){
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

},{"./ibeta_power_terms.js":54}],52:[function(require,module,exports){
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

},{"./ibeta_power_terms.js":54,"@stdlib/math/base/tools/continued-fraction":148}],53:[function(require,module,exports){
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

},{"./beta_small_b_large_a_series.js":47,"./binomial_ccdf.js":49,"./ibeta_a_step.js":51,"./ibeta_fraction2.js":52,"./ibeta_power_terms.js":54,"./ibeta_series.js":55,"./rising_factorial_ratio.js":58,"@stdlib/math/base/special/asin":44,"@stdlib/math/base/special/beta":46,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/expm1":79,"@stdlib/math/base/special/floor":84,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/max":118,"@stdlib/math/base/special/min":120,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/constants/float64-half-pi":190,"@stdlib/math/constants/float64-max":196,"@stdlib/math/constants/float64-pi":200,"@stdlib/math/constants/float64-smallest-normal":202,"@stdlib/math/constants/int32-max":206}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/expm1":79,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":89,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/max":118,"@stdlib/math/base/special/min":120,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/constants/float64-e":183,"@stdlib/math/constants/float64-gamma-lanczos-g":188,"@stdlib/math/constants/float64-max-ln":195,"@stdlib/math/constants/float64-min-ln":198}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":89,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/base/tools/sum-series":157,"@stdlib/math/constants/float64-e":183,"@stdlib/math/constants/float64-gamma-lanczos-g":188,"@stdlib/math/constants/float64-max-ln":195,"@stdlib/math/constants/float64-min-ln":198,"@stdlib/math/constants/float64-smallest-normal":202}],56:[function(require,module,exports){
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

},{"./betainc.js":48}],57:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/gamma":93,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":89,"@stdlib/math/base/special/gammaln":111,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/max":118,"@stdlib/math/base/special/min":120,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/constants/float64-e":183,"@stdlib/math/constants/float64-gamma-lanczos-g":188,"@stdlib/math/constants/float64-max-ln":195,"@stdlib/math/constants/float64-min-ln":198}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/round":132}],60:[function(require,module,exports){
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

},{"./binomcoef.js":59}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"./ceil.js":61}],63:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":161,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-to-words":177}],64:[function(require,module,exports){
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

},{"./copysign.js":63}],65:[function(require,module,exports){
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

},{"./cos_kernel.js":66,"./rem_pio2.js":68,"./sin_kernel.js":70,"@stdlib/math/base/utils/float64-get-high-word":165}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"./cos.js":65}],68:[function(require,module,exports){
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

},{"./rem_pio2_kernel.js":69,"@stdlib/math/base/special/round":132,"@stdlib/math/base/utils/float64-from-words":161,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-get-low-word":167}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":84,"@stdlib/math/base/special/ldexp":112}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/base/utils/float64-set-low-word":174,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],72:[function(require,module,exports){
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

},{"./erfc.js":71}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/base/tools/evalrational":154,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],74:[function(require,module,exports){
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

},{"./erfcinv.js":73}],75:[function(require,module,exports){
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

},{"./expmulti.js":76,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":144,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],76:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":112,"@stdlib/math/base/tools/evalpoly":151}],77:[function(require,module,exports){
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

},{"./exp.js":75}],78:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-set-high-word":172,"@stdlib/math/constants/float64-exponent-bias":186,"@stdlib/math/constants/float64-half-ln-two":189,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],79:[function(require,module,exports){
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

},{"./expm1.js":78}],80:[function(require,module,exports){
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

},{"./factorials.json":81,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gamma":93,"@stdlib/math/constants/float64-pinf":201}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{"./factorial.js":80}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{"./floor.js":83}],85:[function(require,module,exports){
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

},{"./gamma_delta_ratio_lanczos.js":86,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/factorial":82,"@stdlib/math/base/special/floor":84,"@stdlib/math/base/special/gamma":93}],86:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/gamma":93,"@stdlib/math/base/special/gamma-lanczos-sum":91,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/pow":122,"@stdlib/math/constants/float64-e":183,"@stdlib/math/constants/float64-eps":184,"@stdlib/math/constants/float64-gamma-lanczos-g":188}],87:[function(require,module,exports){
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

},{"./gamma_delta_ratio.js":85}],88:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":154}],89:[function(require,module,exports){
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

},{"./gamma_lanczos_sum_expg_scaled.js":88}],90:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":154}],91:[function(require,module,exports){
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

},{"./gamma_lanczos_sum.js":90}],92:[function(require,module,exports){
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

},{"./small_approximation.js":94,"./stirling_approximation.js":95,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/floor":84,"@stdlib/math/base/special/sin":134,"@stdlib/math/base/tools/evalrational":154,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pi":200,"@stdlib/math/constants/float64-pinf":201}],93:[function(require,module,exports){
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

},{"./gamma.js":92}],94:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":185}],95:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/constants/float64-sqrt-two-pi":204}],96:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":77}],97:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":72,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/constants/float64-pi":200}],98:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/pow":122,"@stdlib/math/constants/float64-max-ln":195,"@stdlib/math/constants/float64-min-ln":198}],99:[function(require,module,exports){
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

},{"./finite_gamma_q.js":96,"./finite_half_gamma_q.js":97,"./full_igamma_prefix.js":98,"./igamma_temme_large.js":101,"./lower_gamma_series.js":103,"./regularised_gamma_prefix.js":105,"./tgamma_small_upper_part.js":107,"./upper_gamma_fraction.js":108,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/floor":84,"@stdlib/math/base/special/gamma":93,"@stdlib/math/base/special/gammaln":111,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/pow":122,"@stdlib/math/constants/float64-max":196,"@stdlib/math/constants/float64-max-ln":195,"@stdlib/math/constants/float64-pinf":201,"@stdlib/math/constants/float64-sqrt-eps":203,"@stdlib/math/constants/float64-sqrt-two-pi":204}],100:[function(require,module,exports){
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

},{"@stdlib/math/base/special/expm1":79,"@stdlib/math/base/special/gamma":93,"@stdlib/math/base/special/gammaln":111,"@stdlib/math/base/special/log1p":116}],101:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":72,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/constants/float64-pi":200}],102:[function(require,module,exports){
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

},{"./gammainc.js":99}],103:[function(require,module,exports){
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

},{"./lower_incomplete_gamma_series":104,"@stdlib/math/base/tools/sum-series":157}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/exp":77,"@stdlib/math/base/special/gamma":93,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":89,"@stdlib/math/base/special/gammaln":111,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/log1p":116,"@stdlib/math/base/special/max":118,"@stdlib/math/base/special/min":120,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/constants/float64-e":183,"@stdlib/math/constants/float64-gamma-lanczos-g":188,"@stdlib/math/constants/float64-max-ln":195,"@stdlib/math/constants/float64-min-ln":198,"dup":57}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"./gammap1m1.js":100,"./small_gamma2_series.js":106,"@stdlib/math/base/special/powm1":130,"@stdlib/math/base/tools/sum-series":157}],108:[function(require,module,exports){
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

},{"./upper_incomplete_gamma_fract":109,"@stdlib/math/base/tools/continued-fraction":148}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/sinpi":141,"@stdlib/math/base/special/trunc":144,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/constants/float64-pi":200,"@stdlib/math/constants/float64-pinf":201}],111:[function(require,module,exports){
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

},{"./gammaln.js":110}],112:[function(require,module,exports){
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

},{"./ldexp.js":113}],113:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":64,"@stdlib/math/base/utils/float64-exponent":159,"@stdlib/math/base/utils/float64-from-words":161,"@stdlib/math/base/utils/float64-normalize":169,"@stdlib/math/base/utils/float64-to-words":177,"@stdlib/math/constants/float64-exponent-bias":186,"@stdlib/math/constants/float64-max-base2-exponent":194,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":193,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":197,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],114:[function(require,module,exports){
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

},{"./ln.js":115}],115:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-set-high-word":172,"@stdlib/math/base/utils/float64-to-words":177,"@stdlib/math/constants/float64-exponent-bias":186,"@stdlib/math/constants/float64-ninf":199}],116:[function(require,module,exports){
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

},{"./log1p.js":117}],117:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-set-high-word":172,"@stdlib/math/constants/float64-exponent-bias":186,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],118:[function(require,module,exports){
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

},{"./max.js":119}],119:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":18,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],120:[function(require,module,exports){
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

},{"./min.js":121}],121:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],122:[function(require,module,exports){
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

},{"./pow.js":125}],123:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-set-high-word":172,"@stdlib/math/base/utils/float64-set-low-word":174,"@stdlib/math/constants/float64-exponent-bias":186}],124:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/base/utils/float64-set-low-word":174}],125:[function(require,module,exports){
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

},{"./log2ax.js":123,"./logx.js":124,"./pow2.js":126,"./x_is_zero.js":127,"./y_is_huge.js":128,"./y_is_infinite.js":129,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/sqrt":143,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-get-low-word":167,"@stdlib/math/base/utils/float64-set-low-word":174,"@stdlib/math/base/utils/float64-to-words":177,"@stdlib/math/base/utils/uint32-to-int32":180,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],126:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":112,"@stdlib/math/base/tools/evalpoly":151,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-set-high-word":172,"@stdlib/math/base/utils/float64-set-low-word":174,"@stdlib/math/base/utils/uint32-to-int32":180,"@stdlib/math/constants/float64-exponent-bias":186,"@stdlib/math/constants/float64-ln-two":192}],127:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/copysign":64,"@stdlib/math/constants/float64-ninf":199,"@stdlib/math/constants/float64-pinf":201}],128:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":165}],129:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/constants/float64-pinf":201}],130:[function(require,module,exports){
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

},{"./powm1.js":131}],131:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/expm1":79,"@stdlib/math/base/special/ln":114,"@stdlib/math/base/special/pow":122,"@stdlib/math/base/special/trunc":144}],132:[function(require,module,exports){
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

},{"./round.js":133}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"./sin.js":140}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":84,"@stdlib/math/base/special/ldexp":112}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{"./kernel_rem_pio2.js":136,"./rem_pio2_medium.js":139,"@stdlib/math/base/utils/float64-from-words":161,"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/base/utils/float64-get-low-word":167}],139:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":132,"@stdlib/math/base/utils/float64-get-high-word":165}],140:[function(require,module,exports){
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

},{"./kernel_cos.js":135,"./kernel_sin.js":137,"./rem_pio2.js":138,"@stdlib/math/base/utils/float64-get-high-word":165}],141:[function(require,module,exports){
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

},{"./sinpi.js":142}],142:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":42,"@stdlib/math/base/special/copysign":64,"@stdlib/math/base/special/cos":67,"@stdlib/math/base/special/sin":134,"@stdlib/math/constants/float64-pi":200}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"./trunc.js":145}],145:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":84}],146:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/constants/float32-smallest-normal":182,"@stdlib/math/constants/float64-eps":184}],147:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/constants/float32-smallest-normal":182,"@stdlib/math/constants/float64-eps":184}],148:[function(require,module,exports){
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

},{"./basic.js":146,"./generators.js":147,"@stdlib/utils/detect-generator-support":210}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"./evalpoly.js":149}],151:[function(require,module,exports){
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

},{"./evalpoly.js":149,"./factory.js":150,"@stdlib/utils/define-read-only-property":208}],152:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42}],153:[function(require,module,exports){
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

},{"./evalrational.js":152}],154:[function(require,module,exports){
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

},{"./evalrational.js":152,"./factory.js":153,"@stdlib/utils/define-read-only-property":208}],155:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/constants/float64-eps":184}],156:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":42,"@stdlib/math/constants/float64-eps":184}],157:[function(require,module,exports){
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

},{"./basic.js":155,"./generators.js":156,"@stdlib/utils/detect-generator-support":210}],158:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":165,"@stdlib/math/constants/float64-exponent-bias":186,"@stdlib/math/constants/float64-high-word-exponent-mask":191}],159:[function(require,module,exports){
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

},{"./exponent.js":158}],160:[function(require,module,exports){
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

},{"./indices.js":162}],161:[function(require,module,exports){
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

},{"./from_words.js":160}],162:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],163:[function(require,module,exports){
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

},{"./high.js":164}],164:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],165:[function(require,module,exports){
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

},{"./get_high_word.js":163}],166:[function(require,module,exports){
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

},{"./low.js":168}],167:[function(require,module,exports){
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

},{"./get_low_word.js":166}],168:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],169:[function(require,module,exports){
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

},{"./normalize.js":170}],170:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":42,"@stdlib/math/constants/float64-smallest-normal":202}],171:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":164}],172:[function(require,module,exports){
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

},{"./set_high_word.js":173}],173:[function(require,module,exports){
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

},{"./high.js":171}],174:[function(require,module,exports){
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

},{"./set_low_word.js":176}],175:[function(require,module,exports){
arguments[4][168][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":168}],176:[function(require,module,exports){
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

},{"./low.js":175}],177:[function(require,module,exports){
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

},{"./to_words.js":179}],178:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":162}],179:[function(require,module,exports){
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

},{"./indices.js":178}],180:[function(require,module,exports){
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

},{"./uint32_to_int32.js":181}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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


},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
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

},{}],202:[function(require,module,exports){
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

},{}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
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

},{"./define_read_only_property.js":207}],209:[function(require,module,exports){
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

},{"@stdlib/utils/eval":211}],210:[function(require,module,exports){
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

},{"./detect_generator_support.js":209}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){

},{}],214:[function(require,module,exports){
arguments[4][213][0].apply(exports,arguments)
},{"dup":213}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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

},{"base64-js":212,"ieee754":235}],217:[function(require,module,exports){
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
},{"../../is-buffer/index.js":237}],218:[function(require,module,exports){
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

},{"./lib/is_arguments.js":219,"./lib/keys.js":220}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],221:[function(require,module,exports){
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

},{"foreach":231,"object-keys":240}],222:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],223:[function(require,module,exports){
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

},{"./helpers/isFinite":224,"./helpers/isNaN":225,"./helpers/mod":226,"./helpers/sign":227,"es-to-primitive/es5":228,"has":234,"is-callable":238}],224:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],225:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],226:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],227:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],228:[function(require,module,exports){
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

},{"./helpers/isPrimitive":229,"is-callable":238}],229:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){

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


},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":232}],234:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":233}],235:[function(require,module,exports){
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

},{}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{"./isArguments":241}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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
},{"_process":215}],243:[function(require,module,exports){
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
},{"_process":215}],244:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":245}],245:[function(require,module,exports){
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
},{"./_stream_readable":247,"./_stream_writable":249,"core-util-is":217,"inherits":236,"process-nextick-args":243}],246:[function(require,module,exports){
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
},{"./_stream_transform":248,"core-util-is":217,"inherits":236}],247:[function(require,module,exports){
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
},{"./_stream_duplex":245,"./internal/streams/BufferList":250,"./internal/streams/destroy":251,"./internal/streams/stream":252,"_process":215,"core-util-is":217,"events":230,"inherits":236,"isarray":253,"process-nextick-args":243,"safe-buffer":260,"string_decoder/":254,"util":213}],248:[function(require,module,exports){
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
},{"./_stream_duplex":245,"core-util-is":217,"inherits":236}],249:[function(require,module,exports){
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
},{"./_stream_duplex":245,"./internal/streams/destroy":251,"./internal/streams/stream":252,"_process":215,"core-util-is":217,"inherits":236,"process-nextick-args":243,"safe-buffer":260,"util-deprecate":272}],250:[function(require,module,exports){
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
},{"safe-buffer":260}],251:[function(require,module,exports){
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
},{"process-nextick-args":243}],252:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":230}],253:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],254:[function(require,module,exports){
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
},{"safe-buffer":260}],255:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":256}],256:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":245,"./lib/_stream_passthrough.js":246,"./lib/_stream_readable.js":247,"./lib/_stream_transform.js":248,"./lib/_stream_writable.js":249}],257:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":256}],258:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":249}],259:[function(require,module,exports){
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
},{"_process":215,"through":271}],260:[function(require,module,exports){
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

},{"buffer":216}],261:[function(require,module,exports){
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

},{"events":230,"inherits":236,"readable-stream/duplex.js":244,"readable-stream/passthrough.js":255,"readable-stream/readable.js":256,"readable-stream/transform.js":257,"readable-stream/writable.js":258}],262:[function(require,module,exports){
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

},{"es-abstract/es5":223,"function-bind":233}],263:[function(require,module,exports){
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

},{"./implementation":262,"./polyfill":264,"./shim":265,"define-properties":221,"function-bind":233}],264:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":262}],265:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":264,"define-properties":221}],266:[function(require,module,exports){
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
},{"./lib/default_stream":267,"./lib/results":269,"./lib/test":270,"_process":215,"defined":222,"through":271}],267:[function(require,module,exports){
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
},{"_process":215,"fs":214,"through":271}],268:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":215}],269:[function(require,module,exports){
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
},{"_process":215,"events":230,"function-bind":233,"has":234,"inherits":236,"object-inspect":239,"resumer":259,"through":271}],270:[function(require,module,exports){
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
},{"./next_tick":268,"deep-equal":218,"defined":222,"events":230,"has":234,"inherits":236,"path":242,"string.prototype.trim":263}],271:[function(require,module,exports){
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
},{"_process":215,"stream":261}],272:[function(require,module,exports){
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
},{}]},{},[34,35,36]);
