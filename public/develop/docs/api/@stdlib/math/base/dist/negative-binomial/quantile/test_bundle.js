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

},{"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":73}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":191}],14:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":193}],18:[function(require,module,exports){
'use strict';

// MODULES //

var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 5.0, 20.0, 0.8 );
* // returns ~0.617
* @example
* var y = cdf( 21.0, 20.0, 0.5 );
* // returns ~0.622
* @example
* var y = cdf( 5.0, 10.0, 0.4 );
* // returns ~0.034
* @example
* var y = cdf( 0.0, 10.0, 0.9 );
* // returns ~0.349
* @example
* var y = cdf( 21.0, 15.5, 0.5 );
* // returns ~0.859
* @example
* var y = cdf( 5.0, 7.4, 0.4 );
* // returns ~0.131
* @example
* var y = cdf( 2.0, 0.0, 0.5 );
* // returns NaN
* @example
* var y = cdf( 2.0, -2.0, 0.5 );
* // returns NaN
* @example
* var y = cdf( NaN, 20.0, 0.5 );
* // returns NaN
* @example
* var y = cdf( 0.0, NaN, 0.5 );
* // returns NaN
* @example
* var y = cdf( 0.0, 20.0, NaN );
* // returns NaN
* @example
* var y = cdf( 2.0, 20, -1.0 );
* // returns NaN
* @example
* var y = cdf( 2.0, 20, 1.5 );
* // returns NaN
*/
function cdf( x, r, p ) {
	var xint;
	if (
		isnan( x ) ||
		isnan( r ) ||
		isnan( p )
	) {
		return NaN;
	}
	if (
		r <= 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	if ( x < 0.0 ) {
		return 0.0;
	}
	if ( x === PINF ) {
		return 1.0;
	}
	// Ensure left-continuity:
	xint = floor( x + 1e-7 );
	return betainc( p, r, xint + 1.0 );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betainc":49,"@stdlib/math/base/special/floor":73,"@stdlib/math/constants/float64-pinf":193}],19:[function(require,module,exports){
'use strict';

// MODULES //

var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p`.
*
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {Function} CDF
*/
function factory( r, p ) {
	if ( isnan( r ) || isnan( p ) ) {
		return nan;
	}
	if ( r <= 0.0 || p < 0.0 || p > 1.0 ) {
		return nan;
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a negative binomial distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*/
	function cdf( x ) {
		var xint;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 ) {
			return 0.0;
		}
		if ( x === PINF ) {
			return 1.0;
		}
		// Ensure left-continuity:
		xint = floor( x + 1e-7 );
		return betainc( p, r, xint + 1.0 );
	} // end FUNCTION cdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":21,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betainc":49,"@stdlib/math/base/special/floor":73,"@stdlib/math/constants/float64-pinf":193}],20:[function(require,module,exports){
'use strict';

/**
* Negative binomial distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dist/negative-binomial/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dist/negative-binomial/cdf' );
*
* var y = cdf( 5.0, 20.0, 0.8 );
* // returns ~0.617
*
* y = cdf( 21.0, 20.0, 0.5 );
* // returns ~0.622
*
* y = cdf( 5.0, 10.0, 0.4 );
* // returns ~0.034
*
* y = cdf( 0.0, 10.0, 0.9 );
* // returns ~0.349
*
* var y = cdf( 21.0, 15.5, 0.5 );
* // returns ~0.859
*
* y = cdf( 5.0, 7.4, 0.4 );
* // returns ~0.131
*
* var mycdf = cdf.factory( 10, 0.5 );
* y = mycdf( 3.0 );
* // returns ~0.046
*
* y = mycdf( 11.0 );
* // returns ~0.668
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":18,"./factory.js":19,"@stdlib/utils/define-read-only-property":200}],21:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for an invalid negative binomial distribution.
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

},{}],22:[function(require,module,exports){
'use strict';

// MODULES //

var cdf = require( '@stdlib/math/base/dist/negative-binomial/cdf' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var round = require( '@stdlib/math/base/special/round' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var SQRT2 = require( '@stdlib/math/constants/float64-sqrt-two' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var search = require( './search.js' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p`.
*
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0, 0.5 );
* var y = quantile( 0.1 );
* // returns 5
*
* y = quantile( 0.9 );
* // returns 16
*/
function factory( r, p ) {
	var sigmaInv;
	var sigma;
	var mu;
	var q;
	if ( isnan( r ) || isnan( p ) ) {
		return nan;
	}
	if ( r <= 0.0 || p < 0.0 || p > 1.0 ) {
		return nan;
	}
	q = 1.0 - p;
	mu = ( r * q ) / p;
	sigma = sqrt( r * q ) / p;
	sigmaInv = ( (2.0/p) - 1.0 ) / sigma;
	return quantile;

	/**
	* Evaluates the quantile function for a negative binomial distribution.
	*
	* @private
	* @param {Probability} k - input value
	* @returns {NonNegativeInteger} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( k ) {
		var guess;
		var corr;
		var x2;
		var x;

		if ( isnan( k ) || k < 0.0 || k > 1.0 ) {
			return NaN;
		}
		if ( k === 0.0 ) {
			return 0.0;
		}
		if ( k === 1.0 ) {
			return PINF;
		}

		// Cornish-Fisher expansion:
		if ( k < 0.5 ) {
			x = -erfcinv( 2.0 * k ) * SQRT2;
		} else {
			x = erfcinv( 2.0 * (1.0-k) ) * SQRT2;
		}
		x2 = x * x;

		// Skewness correction:
		corr = x + (sigmaInv * ( x2 - 1.0 ) / 6.0);
		guess = round( mu + (sigma * corr) );
		return cdf( guess, r, p ) >= k ?
			search.left( guess, k, r, p ) :
			search.right( guess, k, r, p );
	} // end FUNCTION quantile()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":24,"./search.js":26,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/negative-binomial/cdf":20,"@stdlib/math/base/special/erfcinv":63,"@stdlib/math/base/special/round":129,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/constants/float64-pinf":193,"@stdlib/math/constants/float64-sqrt-two":197}],23:[function(require,module,exports){
'use strict';

/**
* Negative binomial distribution quantile function.
*
* @module @stdlib/math/base/dist/negative-binomial/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/negative-binomial/quantile' );
*
* var y = quantile( 0.9, 20.0, 0.2 );
* // returns 106
*
* y = quantile( 0.9, 20.0, 0.8 );
* // returns 8
*
* var myquantile = quantile.factory( 10.0, 0.5 );
* y = myquantile( 0.1 );
* // returns 5
*
* y = myquantile( 0.9 );
* // returns 16
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = require( './quantile.js' );

},{"./factory.js":22,"./quantile.js":25,"@stdlib/utils/define-read-only-property":200}],24:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid negative binomial distribution.
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

},{}],25:[function(require,module,exports){
'use strict';

// MODULES //

var cdf = require( '@stdlib/math/base/dist/negative-binomial/cdf' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var round = require( '@stdlib/math/base/special/round' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var SQRT2 = require( '@stdlib/math/constants/float64-sqrt-two' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var search = require( './search.js' );


// MAIN //

/**
* Evaluates the quantile function for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p` at a probability `k`.
*
* @param {Probability} k - input value
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {NonNegativeInteger} evaluated quantile function
*
* @example
* var y = quantile( 0.9, 20.0, 0.2 );
* // returns 106
* @example
* var y = quantile( 0.9, 20.0, 0.8 );
* // returns 8
* @example
* var y = quantile( 0.5, 10.0, 0.4 );
* // returns 14
* @example
* var y = quantile( 0.0, 10.0, 0.9 );
* // returns 0
* @example
* var y = quantile( 1.1, 20.0, 0.5 );
* // returns NaN
* @example
* var y = quantile( -0.1, 20.0, 0.5 );
* // returns NaN
* @example
* var y = quantile( 21.0, 15.5, 0.5 );
* // returns 12
* @example
* var y = quantile( 5.0, 7.4, 0.4 );
* // returns 10
* @example
* var y = quantile( 0.5, 0.0, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.5, -2.0, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.3, 20.0, -1.0 );
* // returns NaN
* @example
* var y = quantile( 0.3, 20.0, 1.5 );
* // returns NaN
* @example
* var y = quantile( NaN, 20.0, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.3, NaN, 0.5 );
* // returns NaN
* @example
* var y = quantile( 0.3, 20.0, NaN );
* // returns NaN
*/
function quantile( k, r, p ) {
	var sigmaInv;
	var guess;
	var sigma;
	var corr;
	var mu;
	var x2;
	var x;
	var q;

	if (
		isnan( r ) ||
		isnan( p ) ||
		r <= 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	if ( isnan( k ) || k < 0.0 || k > 1.0 ) {
		return NaN;
	}
	if ( k === 0.0 ) {
		return 0.0;
	}
	if ( k === 1.0 ) {
		return PINF;
	}
	q = 1.0 - p;
	mu = ( r * q ) / p;
	sigma = sqrt( r * q ) / p;
	sigmaInv = 1.0 / sigma;

	// Cornish-Fisher expansion:
	if ( k < 0.5 ) {
		x = -erfcinv( 2.0 * k ) * SQRT2;
	} else {
		x = erfcinv( 2.0 * (1.0-k) ) * SQRT2;
	}
	x2 = x * x;

	// Skewness correction:
	corr = x + (sigmaInv * ( x2 - 1.0 ) / 6.0);
	guess = round( mu + (sigma * corr) );
	return cdf( guess, r, p ) >= k ?
		search.left( guess, k, r, p ) :
		search.right( guess, k, r, p );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./search.js":26,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/negative-binomial/cdf":20,"@stdlib/math/base/special/erfcinv":63,"@stdlib/math/base/special/round":129,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/constants/float64-pinf":193,"@stdlib/math/constants/float64-sqrt-two":197}],26:[function(require,module,exports){
'use strict';

// MODULES //

var cdf = require( '@stdlib/math/base/dist/negative-binomial/cdf' );


// MAIN //

/**
* Performs a search to the left.
*
* @param {NonNegativeInteger} x - starting guess
* @param {Probability} k - probability
* @param {PositiveNumber} r - number of failures until experiment is stopped
* @param {Probability} p - success probability
* @returns {NonNegativeInteger} `k` quantile of the specified distribution
*/
function searchLeft( x, k, r, p ) {
	while ( true ) {
		if ( x === 0 || cdf( x - 1.0, r, p ) < k ) {
			return x;
		}
		x -= 1;
	}
} // end FUNCTION searchLeft()

/**
* Performs a search to the right.
*
* @param {NonNegativeInteger} x - starting guess
* @param {Probability} k - probability
* @param {PositiveNumber} r - number of failures until experiment is stopped
* @param {Probability} p - success probability
* @returns {NonNegativeInteger} `k` quantile of the specified distribution
*/
function searchRight( x, k, r, p ) {
	while ( true ) {
		x += 1;
		if ( cdf( x, r, p ) >= k ) {
			return x;
		}
	}
} // end FUNCTION searchRight()


// EXPORTS //

module.exports = {
	'left': searchLeft,
	'right': searchRight
};

},{"@stdlib/math/base/dist/negative-binomial/cdf":20}],27:[function(require,module,exports){
module.exports={"expected":[9.0,13.0,3.0,3.0,12.0,5.0,14.0,6.0,0.0,0.0,3.0,3.0,14.0,8.0,8.0,0.0,11.0,19.0,0.0,2.0,8.0,0.0,1.0,20.0,15.0,0.0,8.0,3.0,3.0,5.0,3.0,9.0,25.0,3.0,0.0,30.0,6.0,13.0,1.0,5.0,7.0,4.0,14.0,1.0,5.0,0.0,15.0,1.0,3.0,1.0,0.0,19.0,0.0,10.0,11.0,3.0,2.0,11.0,2.0,2.0,5.0,12.0,5.0,1.0,0.0,10.0,2.0,18.0,0.0,6.0,0.0,6.0,8.0,3.0,6.0,8.0,1.0,1.0,7.0,1.0,9.0,5.0,17.0,23.0,1.0,1.0,0.0,4.0,4.0,9.0,2.0,3.0,3.0,3.0,1.0,28.0,0.0,4.0,2.0,18.0,17.0,11.0,13.0,15.0,8.0,4.0,1.0,9.0,3.0,12.0,3.0,8.0,12.0,0.0,17.0,30.0,3.0,22.0,4.0,0.0,12.0,1.0,14.0,0.0,16.0,22.0,7.0,23.0,0.0,15.0,11.0,1.0,5.0,0.0,6.0,0.0,9.0,1.0,2.0,2.0,15.0,3.0,4.0,9.0,2.0,1.0,7.0,19.0,21.0,2.0,5.0,1.0,2.0,5.0,1.0,2.0,2.0,0.0,5.0,2.0,2.0,1.0,8.0,25.0,6.0,23.0,11.0,7.0,3.0,12.0,6.0,1.0,22.0,11.0,1.0,5.0,13.0,21.0,3.0,11.0,22.0,6.0,0.0,0.0,4.0,10.0,3.0,1.0,28.0,0.0,36.0,16.0,0.0,26.0,13.0,2.0,6.0,2.0,4.0,28.0,0.0,15.0,28.0,0.0,28.0,1.0,0.0,18.0,10.0,1.0,0.0,11.0,3.0,1.0,1.0,1.0,1.0,5.0,1.0,0.0,3.0,23.0,3.0,22.0,17.0,10.0,10.0,5.0,2.0,2.0,14.0,0.0,2.0,11.0,19.0,8.0,0.0,7.0,4.0,9.0,12.0,5.0,10.0,7.0,3.0,19.0,2.0,3.0,2.0,8.0,3.0,16.0,24.0,20.0,1.0,10.0,1.0,2.0,1.0,10.0,0.0,3.0,1.0,4.0,1.0,2.0,1.0,35.0,6.0,1.0,14.0,14.0,15.0,6.0,11.0,34.0,3.0,15.0,8.0,11.0,20.0,6.0,8.0,7.0,3.0,6.0,13.0,7.0,17.0,23.0,11.0,0.0,18.0,5.0,17.0,18.0,11.0,1.0,9.0,12.0,15.0,25.0,0.0,1.0,1.0,14.0,9.0,11.0,0.0,9.0,0.0,3.0,2.0,1.0,18.0,9.0,5.0,6.0,15.0,10.0,15.0,14.0,0.0,23.0,4.0,2.0,2.0,2.0,14.0,15.0,3.0,19.0,1.0,6.0,0.0,8.0,4.0,3.0,7.0,2.0,2.0,11.0,0.0,13.0,13.0,31.0,14.0,3.0,3.0,0.0,18.0,8.0,2.0,26.0,2.0,1.0,28.0,1.0,4.0,7.0,11.0,1.0,14.0,6.0,11.0,6.0,0.0,1.0,2.0,1.0,6.0,4.0,13.0,44.0,1.0,2.0,19.0,21.0,4.0,9.0,0.0,0.0,6.0,0.0,15.0,11.0,0.0,0.0,9.0,32.0,2.0,15.0,0.0,12.0,8.0,9.0,1.0,0.0,0.0,2.0,1.0,6.0,29.0,0.0,0.0,0.0,2.0,13.0,18.0,29.0,13.0,15.0,13.0,5.0,0.0,6.0,9.0,18.0,0.0,5.0,17.0,13.0,8.0,2.0,6.0,3.0,2.0,19.0,31.0,2.0,2.0,7.0,2.0,1.0,8.0,5.0,17.0,3.0,16.0,9.0,12.0,1.0,2.0,1.0,10.0,0.0,16.0,2.0,5.0,0.0,1.0,8.0,2.0,4.0,1.0,5.0,0.0,23.0,0.0,18.0,5.0,17.0,5.0,19.0,4.0,20.0,0.0,3.0,25.0,9.0,0.0,0.0,7.0,9.0,1.0,20.0,9.0,12.0,1.0,1.0,5.0,6.0,2.0,2.0,3.0,9.0,0.0,3.0,11.0,7.0,5.0,4.0,6.0,11.0,10.0,8.0,4.0,1.0,2.0,14.0,1.0,28.0,1.0,1.0,10.0,1.0,15.0,13.0,20.0,8.0,9.0,0.0,17.0,0.0,1.0,9.0,4.0,9.0,4.0,15.0,1.0,28.0,17.0,8.0,3.0,0.0,2.0,2.0,12.0,34.0,2.0,0.0,1.0,4.0,1.0,15.0,13.0,15.0,10.0,7.0,9.0,12.0,9.0,4.0,1.0,1.0,14.0,13.0,3.0,7.0,2.0,18.0,3.0,13.0,0.0,3.0,1.0,0.0,0.0,0.0,15.0,11.0,8.0,0.0,9.0,8.0,26.0,14.0,3.0,0.0,5.0,19.0,10.0,8.0,14.0,15.0,8.0,8.0,4.0,1.0,21.0,1.0,1.0,1.0,14.0,1.0,19.0,5.0,0.0,13.0,6.0,4.0,6.0,1.0,13.0,6.0,9.0,3.0,0.0,6.0,3.0,3.0,1.0,3.0,10.0,14.0,1.0,3.0,1.0,1.0,0.0,14.0,14.0,5.0,12.0,1.0,5.0,13.0,13.0,0.0,27.0,17.0,16.0,10.0,1.0,9.0,0.0,22.0,16.0,11.0,3.0,7.0,1.0,42.0,2.0,3.0,6.0,1.0,0.0,4.0,5.0,0.0,4.0,3.0,11.0,5.0,18.0,0.0,1.0,9.0,3.0,18.0,4.0,1.0,0.0,1.0,4.0,0.0,18.0,3.0,5.0,3.0,3.0,13.0,1.0,1.0,5.0,0.0,6.0,2.0,1.0,0.0,4.0,10.0,2.0,7.0,31.0,1.0,0.0,2.0,6.0,4.0,3.0,5.0,1.0,5.0,8.0,0.0,23.0,13.0,0.0,8.0,0.0,21.0,4.0,18.0,10.0,0.0,2.0,1.0,1.0,3.0,16.0,6.0,1.0,2.0,20.0,2.0,0.0,8.0,2.0,10.0,3.0,18.0,0.0,6.0,3.0,7.0,0.0,19.0,0.0,9.0,4.0,4.0,37.0,4.0,0.0,0.0,6.0,1.0,11.0,1.0,8.0,0.0,3.0,1.0,0.0,1.0,0.0,12.0,16.0,9.0,3.0,9.0,12.0,1.0,7.0,0.0,3.0,3.0,8.0,3.0,0.0,2.0,0.0,4.0,1.0,7.0,16.0,17.0,6.0,15.0,4.0,4.0,15.0,26.0,8.0,1.0,6.0,2.0,16.0,8.0,17.0,16.0,11.0,20.0,11.0,1.0,24.0,3.0,7.0,0.0,0.0,9.0,2.0,1.0,3.0,1.0,22.0,1.0,5.0,1.0,10.0,1.0,3.0,13.0,6.0,3.0,4.0,0.0,16.0,0.0,18.0,17.0,5.0,31.0,6.0,1.0,5.0,3.0,4.0,4.0,5.0,8.0,16.0,18.0,2.0,2.0,1.0,15.0,4.0,13.0,5.0,1.0,18.0,0.0,19.0,1.0,5.0,3.0,4.0,3.0,18.0,29.0,18.0,3.0,2.0,10.0,0.0,26.0,23.0,6.0,1.0,3.0,5.0,6.0,6.0,10.0,22.0,11.0,0.0,0.0,18.0,14.0,19.0,11.0,14.0,23.0,0.0,2.0,12.0,2.0,19.0,9.0,1.0,24.0,0.0,3.0,13.0,1.0,15.0,7.0,10.0,0.0,7.0,8.0,1.0,0.0,5.0,18.0,16.0,8.0,1.0,2.0,3.0,9.0,4.0,28.0,4.0,11.0,1.0,17.0,10.0,6.0,4.0,0.0,1.0,22.0,6.0,9.0,6.0,7.0,20.0,13.0,22.0,1.0,1.0,5.0,2.0,25.0,1.0,0.0,0.0,7.0,8.0,14.0,9.0,0.0,22.0,2.0,7.0,6.0,12.0,29.0,23.0,20.0,3.0,0.0,8.0,7.0,3.0,14.0,19.0,2.0,3.0,0.0,7.0,3.0,15.0,0.0,13.0,5.0,1.0,0.0,4.0,7.0,9.0,24.0,1.0,2.0,22.0,15.0,2.0,2.0,11.0,36.0,5.0,7.0,1.0,0.0,1.0,19.0,17.0,0.0,2.0,9.0,2.0,5.0,16.0,1.0,2.0,15.0,0.0,17.0,4.0,15.0,1.0,0.0,5.0,11.0,7.0,4.0,1.0,0.0,0.0,22.0,15.0,16.0,4.0,13.0,11.0,2.0,4.0,0.0,4.0,5.0,0.0,1.0,17.0,8.0],"k":[0.9204479170692044,0.9094291833760932,0.6667800737813583,0.22670280863051406,0.22266153373468,0.5792382189477847,0.7086999084500072,0.6942085771584963,0.08338860932448111,0.02387600679864721,0.3876136501182077,0.4820641953287128,0.5906421029198647,0.708785138206707,0.3734337795926126,0.31755192639244134,0.3446279782638124,0.9620641010406987,0.19127588836535492,0.7712210094304168,0.9355645892195965,0.08034560508848587,0.7725760372988761,0.9724984967531971,0.8989731142508497,0.47565381585522815,0.7656004090144273,0.6356848798316701,0.5085340140266927,0.7692529564224111,0.2154102697331557,0.9454643533258211,0.5868702636593377,0.3270155075291463,0.045154939406182315,0.7887706970315569,0.11621323382447635,0.6147380291679423,0.1390166911955193,0.38736872413384593,0.15087065306499503,0.4278624550976222,0.8412232722918391,0.361069058987588,0.6963082827756704,0.008346774012508495,0.5454247626500164,0.1687050214231529,0.4364975785052674,0.9532458008893634,0.7685960499263162,0.4904477347423086,0.11448949878677839,0.7376241673929838,0.6802129060922959,0.1750401144556395,0.5057120629275496,0.36293327024263533,0.9560528945431574,0.18412716246446958,0.3892289114567684,0.6399224198663851,0.3848855483213711,0.20284895654393753,0.4727150444203596,0.4643384199258096,0.7264269236967973,0.14309837666824543,0.10395411724648262,0.8287504042001288,0.32474175906027325,0.8525763318591537,0.35836149402646056,0.9617363431019041,0.15745992449360435,0.7249234960000059,0.5849973933241783,0.3946155503417643,0.4348181615715421,0.3467562834076048,0.20910128849120357,0.40879838299482985,0.6871805712922607,0.7476284623934528,0.1000253684140957,0.9025442858454646,0.015859707779419363,0.5183102509488022,0.5562304377732368,0.7310639653935864,0.24437014383643452,0.9989036789368486,0.5051607645387644,0.9022502358252875,0.11227257177949324,0.5351913970214004,0.2694819186026962,0.935808633901331,0.4319783736344187,0.5569019121730587,0.043500489384489915,0.55824300499249,0.9585383968242738,0.34952718308976327,0.3468944715487716,0.43147086986198535,0.512484022846617,0.044049948071893885,0.23540041683155066,0.19272992918348808,0.055955070641660054,0.05822535672239604,0.9773803683326283,0.3419195614253756,0.566913256135192,0.7809880070395117,0.12304922724284051,0.39945992095633787,0.4155708297171661,0.3790036022958694,0.0781833066799571,0.06633456496902657,0.6491251197488952,0.003254628357811651,0.30835545628543026,0.40972841307514507,0.44490273643580425,0.7517331901838538,0.47747858521069264,0.8456612051750092,0.3947124210360968,0.6526097499411492,0.6627507850109655,0.040199877785340954,0.8745857103377543,0.3589359861673391,0.03330625482755045,0.8007354914305846,0.5108326579617766,0.593008287756027,0.6787268684757295,0.27741887233764984,0.3683343799296943,0.3822161039075709,0.17112797769575483,0.9161843083249461,0.2089509294298013,0.12593910531343067,0.9771152605150426,0.8605792131463585,0.19783336096416027,0.5090900021377176,0.14375982684286037,0.06221267445899992,0.769266319412538,0.8777710392285405,0.745586585202715,0.1756304866154459,0.17462548714141457,0.24305964391988621,0.6218829620593096,0.6286962192778289,0.7742991314885102,0.5420539780965661,0.12786485211118714,0.2907081846366917,0.9067688677360775,0.3413474511123691,0.8992760320850228,0.7235632224628052,0.19832284407157386,0.4535085675233306,0.1913777182266636,0.20738057963547019,0.5737088821149037,0.13321589878745876,0.9820890155972819,0.4144881244762959,0.6404078769147479,0.28277545094016676,0.37234218855638623,0.8105166195652913,0.1852503910407104,0.10082941953640345,0.3540451607112627,0.9798950139762423,0.19323010584062295,0.45582980856458843,0.9820523218316317,0.5672983748963893,0.9960472901028625,0.9070723477965559,0.619693023903283,0.6937055309722235,0.6461503037884444,0.2761224759871357,0.6848277301480366,0.3126449560324507,0.26238538827494273,0.9015235394164172,0.32140236765804686,0.9194343278428361,0.6524799658650973,0.8302944925655005,0.4953430821844387,0.09687776812515403,0.09581099509930713,0.37299752279663845,0.9893031661144771,0.25511607179987617,0.007739827420305767,0.7941657288148798,0.4023211843909178,0.4853784513707877,0.8162271951191544,0.06277641333232054,0.26937287734676385,0.3736627051626904,0.37442931812208924,0.7858088625912893,0.06634958613456599,0.6202269609677544,0.8966814139074946,0.22864402967030073,0.11669965484117073,0.09636401773913184,0.12203564243897391,0.5484896196047344,0.45565994994152637,0.3451233481109126,0.8782100758754066,0.024228282156509406,0.9238778000078749,0.8235900989162814,0.9782223560960803,0.17385803522468435,0.1400819345114146,0.9145577350220824,0.7259589488816809,0.6711210907995826,0.9480972648679655,0.2882638284128545,0.33746374635354237,0.3634853358434018,0.6025040961743833,0.34018896134153653,0.20197234926842844,0.21314224722386665,0.7474654007688863,0.2913790311515556,0.10888371911528827,0.9550686670515651,0.4614019504384834,0.7395393974881745,0.7926604828695376,0.5505517470373404,0.18421212013305865,0.2129825654240154,0.9182918329122132,0.22082428740103377,0.4936093900396128,0.9603794410243123,0.613733327298045,0.38512743170972175,0.3680118993640149,0.5715617187479121,0.2027260156502595,0.8072363363228567,0.46690694346820405,0.513118363416492,0.3159081863853408,0.49848597276656825,0.7708767327741892,0.1455297308952499,0.4163089611222033,0.9348922411719345,0.5482399099506303,0.46037622686094215,0.8104588503243646,0.5147678029888139,0.5032384158516281,0.9008299192793965,0.37239153335446074,0.910519348239458,0.4515880716000322,0.5311711553607463,0.08039584071985573,0.4462373122631895,0.8564780863552708,0.9698471330494198,0.5245594247799312,0.5495635422558616,0.776020152907035,0.07583827213326089,0.4064626931156954,0.11476570073969561,0.3034367591937195,0.15090920146732012,0.34379605720675555,0.116685593018381,0.6502195008022595,0.9915667312641399,0.25390670579174546,0.7808050375126072,0.8854838203185658,0.32330754856795907,0.747058016653811,0.6805098167377412,0.12827386448637945,0.6845962377915962,0.0781344638412016,0.0028434768654208575,0.7876740661245949,0.49947550728755097,0.6025126475539728,0.9165426570702035,0.876354449527804,0.6461050179861716,0.005287635600309981,0.41060455083757597,0.4059311995229413,0.518156758200075,0.47349697018746695,0.7062200354379051,0.49717915079202735,0.18538000980245273,0.8653553935991622,0.40103922277842297,0.8129257637305556,0.8556538407410237,0.4887358594077431,0.6106825573392096,0.21547705443817744,0.7393548048440051,0.1150090579672538,0.5587472816071022,0.0006998267010074333,0.9834483287003339,0.74325981308618,0.129341737558627,0.21506634423739324,0.8124601283561741,0.04151383131656505,0.5385200486479285,0.5767205199876295,0.8781728114225398,0.10359263420006037,0.8241676757187766,0.8917597998077997,0.5501781190552448,0.09365298703138802,0.5651905493860614,0.12663004522136756,0.7527039580141539,0.5610982166080156,0.06593118533959563,0.947977289189726,0.4515532969431437,0.5333661276771198,0.49068344983666345,0.946118139026116,0.32587189538327666,0.3819098843547326,0.845552353067353,0.702234983691429,0.13265309720805396,0.47090725755437,0.4308558990385205,0.9921406695082877,0.869010355015047,0.905518510491236,0.4870790816663826,0.5098959102673357,0.9994842795519154,0.7190741853496712,0.4819895795635454,0.6540392985611783,0.04076962579544019,0.05289517941998456,0.7241885420297878,0.2569319922214335,0.7382925898208819,0.5540363690142167,0.17188750051689783,0.28983319755815984,0.6665647189966966,0.6972974258726028,0.7991654134079962,0.011150113053733923,0.9024000886636034,0.11518081774904432,0.112269631712556,0.27033358669878593,0.4274313529310365,0.7414931749413212,0.8278904043402258,0.030841381921777655,0.06702854159412452,0.03244788563661061,0.5823418098524322,0.5512395563791075,0.33182304406346064,0.632380059303816,0.19498245821785876,0.4508346039672284,0.3978783854297132,0.6313456570553602,0.14170113358178527,0.23826086653274103,0.9548990671523374,0.21354247366850476,0.8701786244326928,0.885818284793499,0.3337683515745933,0.3088429376041266,0.9279776737130625,0.3065307193641087,0.4558961606862173,0.6613738755799885,0.33112151461527883,0.367216561193366,0.5102535458768822,0.3759363893488754,0.9684734601411638,0.690235988068304,0.4817823304526141,0.525692556706582,0.8320264969480631,0.7885348660837026,0.8282931953457979,0.36694075540412263,0.8889632111827677,0.4081678099860444,0.681890815102119,0.10246852539856266,0.5465150488267618,0.7795350851589229,0.564237768328834,0.653944658970512,0.2259526594657142,0.27604581380134796,0.8773323008958471,0.9346455444560913,0.9803361990370887,0.0078425860037461,0.05356324729801187,0.34292913477238685,0.9253503068836331,0.26494850171754214,0.8458249492131831,0.6697323874330732,0.9149361265645699,0.10193366280332983,0.8718268113270651,0.39527118648388226,0.4765816954149731,0.1060512481706013,0.31693259217587744,0.06566083239134657,0.3622991671065081,0.19628141539147026,0.4987112858186644,0.43641611965396865,0.73196526335533,0.590050428968687,0.9585226033658105,0.8906383528708992,0.3461666690845946,0.48906357495602104,0.5599191093206966,0.22684516309021352,0.5881263251809206,0.16829368337253814,0.9748946877027924,0.5360566723824058,0.9212721775336774,0.9432393744026701,0.7663563517314982,0.6908880693813908,0.8923762950154945,0.5782979588132506,0.7899234180415096,0.7258377083508241,0.4607496373290314,0.5287613733008796,0.11814520481886981,0.16929409396704176,0.3143005093441986,0.37426452881850825,0.04079065617610955,0.11041145706540245,0.3602209740830722,0.5056368931746626,0.545020100857474,0.8525204581988572,0.5386215926000062,0.4632013363353984,0.7472826585953452,0.41041406142656855,0.12967214313844133,0.6987404699024644,0.48558789369276334,0.09112269924422023,0.4739300757393874,0.35049220206534093,0.12264421280821036,0.3935255578436643,0.8795627561166148,0.9312055415192713,0.47892511133836146,0.3388773336743305,0.3033272686338555,0.9230887420870513,0.24051066688004985,0.5996402098498399,0.07784014115726223,0.7154894517933554,0.19509005405998003,0.39956315911028106,0.5854093016316879,0.0434821115981503,0.7398166630315473,0.4159498051153985,0.038133071919404404,0.7866358391162853,0.3271522330428569,0.32863943385688943,0.3063727841621615,0.5771147999810553,0.8345729840674652,0.8061742348345411,0.09443322216338701,0.5693498474453558,0.8190457586479474,0.02734238366199282,0.9583597433305899,0.42903519832221226,0.9201165170640511,0.04096856488477019,0.9170067035144498,0.310427803370106,0.6299641035923644,0.6667751405587765,0.7330746299405801,0.03795641510114489,0.14435975184540317,0.2680268341677632,0.613541587513531,0.5949131586450194,0.7556351077687395,0.5972537260960011,0.04405893060685262,0.4072980505691788,0.14765198182083417,0.31447074201207026,0.24464125102221423,0.4709182276332551,0.06641801393665192,0.23230029965682597,0.49012998010672715,0.8133180781167111,0.9588571300464859,0.42777052708790886,0.20296686131257924,0.8193050304966765,0.8703298829121708,0.34638689002530043,0.7181473160725993,0.20972182519392368,0.4223441900224727,0.838173519766837,0.22497943741815196,0.9425678712206305,0.42324886114350835,0.5095323924328807,0.5317371234687267,0.7724950750594595,0.6910341422612958,0.7649426940611757,0.8380520671623497,0.8994393814747139,0.7674594330413826,0.8396609079325703,0.18795435170327401,0.6984046168335718,0.9471400461677686,0.9604282933205346,0.6338374882244346,0.14679548014945887,0.62736221867238,0.5494894467124589,0.5834244196414811,0.16815872183985436,0.730544508175702,0.4556401837103141,0.8911507607161937,0.6237763282544071,0.6279528631269198,0.04229982391908216,0.4804515465503232,0.8004087846034973,0.42605748577859326,0.6900475625276514,0.5304357896691518,0.30010304648879593,0.44866578197710827,0.3481272645294555,0.8800603270015834,0.4040743596152039,0.49527221367421204,0.25147490833008246,0.4917752446141963,0.9416107993115763,0.3737372488477393,0.894006107489721,0.7689788586056971,0.31867682001373465,0.9296191376202356,0.6317944030080123,0.6388147248836609,0.9256244842817931,0.9886842819493535,0.38480168642273394,0.8078281471204518,0.5288729949557212,0.46439163871490385,0.8924935968343932,0.7692909227247411,0.7102683455736996,0.915568063972656,0.8464420554652059,0.6193411596284268,0.7624410364854108,0.9990908000999785,0.05745077364197182,0.6472784376283096,0.4835079470759105,0.9394183074748093,0.45855038664499737,0.9366819867229119,0.731446643574136,0.015176428283124155,0.3366423588444265,0.6446906297520307,0.12328139722005749,0.5066398146536057,0.5603618973473541,0.13046135341589582,0.03011392452825179,0.7948048932789591,0.6667492360730833,0.8761841025439401,0.04760660294886354,0.3051930831873424,0.26945260988847664,0.5466047703884287,0.4604889370647911,0.0071697978244700256,0.8129341399498227,0.5026245291921034,0.5521436411650604,0.5542294851485032,0.12306267428046325,0.31180683021630795,0.5874436896895274,0.47724710758609823,0.13327401516538973,0.11247909153714497,0.9449162129521274,0.4499171860973461,0.12453790500632422,0.4281896297948138,0.15364426735343661,0.58246700237083,0.4786707895717992,0.4455233351841634,0.8816041439379068,0.028062742113050154,0.026041668988084687,0.4415270662479802,0.18979062189240548,0.2518731950837496,0.6213306857064218,0.4792480845674756,0.28856156232451635,0.3829952523503344,0.9978476941750574,0.17215455189977735,0.7497585132444053,0.6961417814502018,0.4670920422456246,0.9145936632328324,0.45801635836813004,0.7805079931817502,0.43832745584997257,0.915891973592114,0.4711221211120056,0.176192569981781,0.7334640178005059,0.04448752730939276,0.0707572531434073,0.6544135440336192,0.4012644266320524,0.2677512356935572,0.24159546902865348,0.2559324127034368,0.03174303277627,0.7119076137102609,0.08050193174775644,0.7102783440757001,0.3322988646773499,0.6588309086534643,0.8526893342999111,0.8562893741616251,0.6311455436141813,0.697802437154696,0.39780637524024587,0.15805824452136585,0.658890432238608,0.3080970809627064,0.09487409862365848,0.4732686668784567,0.6135870990596266,0.9372394145701559,0.855074287510821,0.23817951944668558,0.48649578099670987,0.30414320039986165,0.8794728446526017,0.17652092397673114,0.6483748828956633,0.3447319189068072,0.4512211640057655,0.00020110058815370202,0.8733828980135003,0.44001783109303405,0.27475122482780434,0.1346251958025948,0.04000595220529224,0.9209441163566092,0.9720070480201164,0.4386048694328475,0.4694119833469015,0.09107917063732018,0.40589398958048806,0.10039861215614598,0.7210624445952349,0.27223874071658827,0.9030473618586929,0.43659526184654274,0.1828698630165051,0.656161995526513,0.5276308915372798,0.3573669571098481,0.1609035938494945,0.6712048405614306,0.46491832121718146,0.26422717552950536,0.10317995204005914,0.9395871428535392,0.1985402597170225,0.20683897847652855,0.10293385041520309,0.88012643352233,0.11561334754669339,0.7484761383702783,0.31817344244515255,0.5052367932236892,0.30991146405391445,0.6104605428881111,0.13001062896086024,0.43505952187872343,0.8110232558536854,0.9708585514880732,0.7169030727320436,0.45875014581296414,0.3952568059386399,0.8434968006971864,0.6881242401654124,0.9586833831887633,0.6348420744378331,0.6339138605355497,0.1580098797053755,0.09133431922627722,0.22406121922316946,0.8239248259789669,0.8386700017520574,0.01259711425241239,0.6306421290948176,0.3433303423397591,0.7601690136863626,0.23729938226722158,0.9638903603470554,0.6742517880598922,0.33191229300219627,0.4015715585750048,0.11216483778507569,0.6533968097993847,0.20899225485419515,0.5135591590629134,0.3423104161277435,0.10251178992499699,0.13204011703467478,0.8942004393180321,0.4445639256492355,0.6896427459544519,0.8793906882917804,0.8550276908000551,0.992008745806205,0.2635336838579676,0.5837231892206809,0.8296101716949489,0.22156512119437854,0.8536986551375056,0.7656143617837494,0.621743421316179,0.36342951883000807,0.3946563315011684,0.29474657799671733,0.3733567374089728,0.2810908186587433,0.9639866445172358,0.6455438771475277,0.8492697916117116,0.5765036020843377,0.2298243059397973,0.41014088081193956,0.2261055025619414,0.8418917560042702,0.3631875328725265,0.8260922553016765,0.49502394958444285,0.8240978605986007,0.3620145918284077,0.17142862647707124,0.8769895696435537,0.9233981672846305,0.6720286677327365,0.2922891310191389,0.6960730272388638,0.07238991065025946,0.7639089367835743,0.8251674895026955,0.35270004372496544,0.4872554531433462,0.2951320180866277,0.6024827768048922,0.7786816438362618,0.886139011492086,0.15159733813682497,0.12338061638935494,0.7045352072278124,0.8118487692744385,0.49832526820069045,0.988863939576428,0.7565528989156676,0.40641104843431397,0.9013071896231202,0.05552453849003003,0.3501859878770881,0.9339186289713268,0.7349344924047838,0.8298244305848379,0.7312349482145906,0.033460458765091516,0.6263336578754193,0.17924187023893534,0.8909865509983423,0.9287386514882534,0.6539478562546466,0.39403245194037106,0.7390916969923036,0.24832941682925225,0.24215204088747755,0.7502028307569668,0.6122820625656351,0.4710895013739982,0.11459495150898547,0.8992132633610497,0.9214580548513649,0.3421147517669112,0.3065719355024581,0.5516799047510355,0.028578291568511327,0.8488533730508163,0.3111960601956838,0.7530557356445229,0.9262203977885874,0.35652314372195937,0.9951362627591156,0.5531535298102674,0.21359418920134665,0.42757614869803273,0.9934056801067195,0.09826027390220693,0.10973501693683163,0.8925451167926366,0.39663965504774756,0.7184738671456732,0.44206033342514006,0.5477137748536602,0.45230507373844553,0.5883782739587022,0.8942684210655665,0.19280081088344247,0.18909080162715353,0.7313299399502249,0.36321795019784453,0.6836095896636554,0.590046041810917,0.06234785124324116,0.002423059848905895,0.037523332873556914,0.3696618631257196,0.03678353284342051,0.6214183070812445,0.560930159889254,0.14439263605284536,0.754864939671571,0.9940417180645975,0.4736403188248435,0.7212636865329034,0.7660324979334014,0.8933234549866726,0.8867621258534548,0.8112027444899688,0.15623237757915165,0.13637952762834216,0.05753978212319999,0.23036042707220328,0.8410813685000422,0.47385031656089494,0.4901167884537345,0.4725059078936036,0.3971114848194004,0.5349025698485861,0.9597091764134,0.7462247659760604,0.6484352570822747,0.595906263712954,0.3984224733362065,0.42710571907501915,0.6771575631353663,0.27413506090413686,0.9709059058059364,0.3794663235744127,0.32743716948916246,0.37752908697981336,0.5647260069511981,0.3999760876030396,0.3869856111385346,0.12666885161087005,0.041611401820030425,0.8350414194765001,0.6278538691678499,0.8441286919561297,0.18381046778614096,0.02706626391277167,0.19254652219668955,0.8042810289859057,0.04874424190768112,0.6643396955169139,0.2983990518174646,0.06122718461886567,0.14962851775758135,0.8113730865429749,0.569887959634775,0.6148299065461194,0.9677923182404649,0.5251966871453817,0.9692232148613429,0.6865978425297039,0.5267306776412233,0.4802652760892867,0.042083841256721044,0.8877288128977456,0.8723947534022711,0.022775492717895807,0.24347935636240825,0.4388568102289945,0.7799037873579482,0.565797229595951,0.45652193408349473,0.03717347549966599,0.14996705519743814,0.41270692768192685,0.1458791488931368,0.7111850068545456,0.48820707256733265,0.1027536694897433,0.31034009979230204,0.6121343625805749,0.08703511564949151,0.6641034452317083,0.4206568415286198,0.867566112230584,0.02850333432835983,0.49052361758108676,0.39397825971291467,0.289218092816121],"r":[63.0,38.0,79.0,22.0,51.0,22.0,62.0,33.0,100.0,7.0,30.0,36.0,42.0,37.0,48.0,4.0,43.0,64.0,72.0,49.0,41.0,53.0,7.0,65.0,80.0,46.0,25.0,13.0,31.0,63.0,20.0,45.0,84.0,76.0,13.0,77.0,46.0,53.0,69.0,32.0,46.0,82.0,62.0,51.0,75.0,10.0,45.0,61.0,75.0,15.0,2.0,68.0,39.0,53.0,43.0,28.0,61.0,49.0,4.0,81.0,63.0,54.0,53.0,51.0,48.0,36.0,10.0,78.0,39.0,53.0,22.0,53.0,40.0,8.0,57.0,50.0,5.0,11.0,61.0,10.0,92.0,48.0,56.0,62.0,90.0,29.0,15.0,73.0,16.0,22.0,28.0,1.0,16.0,31.0,46.0,94.0,36.0,34.0,12.0,55.0,97.0,76.0,37.0,94.0,33.0,93.0,85.0,62.0,43.0,82.0,46.0,69.0,43.0,1.0,75.0,98.0,85.0,75.0,25.0,3.0,91.0,79.0,56.0,80.0,78.0,73.0,93.0,78.0,4.0,54.0,90.0,24.0,89.0,36.0,85.0,11.0,73.0,2.0,12.0,7.0,77.0,57.0,32.0,41.0,35.0,27.0,74.0,95.0,40.0,38.0,24.0,29.0,21.0,93.0,11.0,38.0,10.0,10.0,78.0,70.0,50.0,3.0,54.0,85.0,75.0,88.0,43.0,69.0,32.0,73.0,51.0,32.0,92.0,48.0,2.0,31.0,86.0,74.0,62.0,100.0,90.0,69.0,36.0,38.0,28.0,17.0,67.0,66.0,58.0,2.0,85.0,51.0,13.0,98.0,95.0,68.0,33.0,59.0,23.0,88.0,22.0,62.0,95.0,2.0,95.0,71.0,54.0,73.0,12.0,12.0,6.0,58.0,45.0,10.0,25.0,77.0,10.0,39.0,49.0,5.0,85.0,75.0,13.0,93.0,91.0,57.0,48.0,62.0,54.0,17.0,51.0,19.0,9.0,50.0,41.0,91.0,21.0,78.0,12.0,25.0,41.0,80.0,84.0,40.0,17.0,78.0,17.0,45.0,13.0,56.0,41.0,37.0,99.0,92.0,33.0,98.0,46.0,20.0,5.0,67.0,1.0,53.0,68.0,60.0,7.0,32.0,56.0,98.0,26.0,7.0,57.0,56.0,87.0,61.0,51.0,78.0,63.0,84.0,99.0,74.0,74.0,88.0,28.0,46.0,83.0,50.0,84.0,34.0,83.0,83.0,89.0,4.0,86.0,46.0,58.0,97.0,72.0,50.0,67.0,87.0,100.0,46.0,44.0,9.0,1.0,73.0,23.0,56.0,23.0,46.0,47.0,75.0,23.0,7.0,97.0,62.0,12.0,62.0,94.0,80.0,69.0,69.0,28.0,80.0,32.0,36.0,33.0,9.0,71.0,72.0,16.0,75.0,25.0,17.0,54.0,64.0,80.0,62.0,34.0,78.0,34.0,88.0,11.0,73.0,93.0,78.0,87.0,89.0,15.0,12.0,100.0,83.0,27.0,90.0,9.0,23.0,81.0,16.0,83.0,28.0,31.0,13.0,96.0,59.0,58.0,82.0,13.0,18.0,15.0,76.0,10.0,88.0,91.0,98.0,10.0,55.0,84.0,96.0,64.0,44.0,14.0,9.0,20.0,33.0,55.0,37.0,72.0,85.0,68.0,86.0,39.0,68.0,11.0,69.0,23.0,21.0,95.0,55.0,92.0,8.0,95.0,38.0,89.0,8.0,34.0,4.0,21.0,62.0,81.0,61.0,68.0,44.0,96.0,86.0,16.0,48.0,85.0,90.0,15.0,85.0,70.0,93.0,81.0,1.0,27.0,41.0,25.0,94.0,80.0,41.0,22.0,24.0,56.0,32.0,47.0,99.0,96.0,35.0,57.0,81.0,89.0,2.0,60.0,8.0,77.0,5.0,71.0,42.0,50.0,21.0,17.0,49.0,39.0,64.0,23.0,75.0,42.0,84.0,1.0,73.0,34.0,71.0,60.0,83.0,35.0,97.0,4.0,99.0,95.0,31.0,44.0,18.0,90.0,47.0,18.0,52.0,19.0,38.0,27.0,71.0,43.0,60.0,57.0,16.0,51.0,79.0,13.0,44.0,74.0,50.0,61.0,51.0,29.0,71.0,84.0,63.0,62.0,84.0,12.0,69.0,3.0,95.0,31.0,21.0,89.0,19.0,78.0,45.0,92.0,86.0,38.0,93.0,40.0,22.0,13.0,57.0,37.0,71.0,78.0,52.0,67.0,89.0,59.0,96.0,8.0,70.0,12.0,56.0,70.0,91.0,68.0,7.0,11.0,18.0,82.0,47.0,71.0,68.0,83.0,89.0,34.0,45.0,86.0,71.0,52.0,15.0,85.0,37.0,55.0,76.0,7.0,84.0,20.0,84.0,19.0,79.0,51.0,24.0,27.0,27.0,99.0,57.0,38.0,93.0,63.0,73.0,96.0,81.0,33.0,8.0,35.0,78.0,41.0,50.0,46.0,47.0,100.0,60.0,72.0,4.0,79.0,9.0,55.0,34.0,79.0,5.0,65.0,60.0,8.0,44.0,77.0,71.0,86.0,73.0,84.0,32.0,31.0,62.0,28.0,82.0,65.0,18.0,8.0,14.0,77.0,71.0,48.0,20.0,13.0,86.0,8.0,67.0,63.0,57.0,26.0,30.0,35.0,97.0,42.0,2.0,63.0,75.0,78.0,46.0,16.0,40.0,29.0,67.0,80.0,37.0,21.0,23.0,8.0,76.0,37.0,13.0,51.0,1.0,3.0,18.0,68.0,51.0,48.0,75.0,99.0,50.0,88.0,37.0,33.0,31.0,72.0,52.0,40.0,68.0,1.0,57.0,73.0,78.0,70.0,68.0,66.0,28.0,33.0,64.0,31.0,48.0,52.0,37.0,75.0,88.0,54.0,19.0,73.0,89.0,23.0,70.0,81.0,25.0,3.0,16.0,58.0,72.0,24.0,62.0,13.0,58.0,85.0,52.0,75.0,45.0,6.0,29.0,72.0,68.0,58.0,93.0,48.0,7.0,18.0,93.0,34.0,29.0,61.0,31.0,69.0,90.0,95.0,77.0,7.0,74.0,92.0,32.0,61.0,55.0,10.0,28.0,16.0,53.0,2.0,96.0,66.0,70.0,67.0,58.0,97.0,26.0,72.0,3.0,50.0,9.0,34.0,18.0,44.0,22.0,15.0,7.0,14.0,12.0,7.0,29.0,34.0,58.0,43.0,98.0,68.0,13.0,26.0,8.0,100.0,29.0,39.0,40.0,66.0,50.0,9.0,74.0,29.0,98.0,99.0,43.0,76.0,61.0,26.0,33.0,97.0,96.0,97.0,87.0,58.0,30.0,95.0,29.0,97.0,57.0,50.0,64.0,46.0,3.0,72.0,62.0,90.0,66.0,47.0,85.0,46.0,7.0,50.0,43.0,87.0,10.0,34.0,45.0,20.0,3.0,40.0,43.0,40.0,39.0,99.0,9.0,75.0,48.0,99.0,77.0,90.0,87.0,36.0,2.0,86.0,23.0,46.0,36.0,25.0,78.0,73.0,90.0,68.0,44.0,34.0,93.0,24.0,50.0,12.0,46.0,88.0,7.0,77.0,6.0,37.0,19.0,61.0,88.0,88.0,100.0,75.0,33.0,77.0,67.0,51.0,69.0,100.0,28.0,7.0,79.0,72.0,49.0,23.0,99.0,84.0,81.0,39.0,68.0,66.0,92.0,99.0,87.0,53.0,60.0,27.0,19.0,86.0,9.0,75.0,25.0,87.0,77.0,12.0,30.0,44.0,38.0,53.0,31.0,96.0,10.0,24.0,42.0,10.0,39.0,40.0,53.0,55.0,50.0,61.0,75.0,18.0,53.0,64.0,82.0,28.0,22.0,38.0,84.0,40.0,58.0,31.0,24.0,17.0,96.0,19.0,80.0,26.0,78.0,83.0,58.0,84.0,43.0,14.0,42.0,9.0,98.0,35.0,10.0,21.0,62.0,73.0,48.0,33.0,14.0,66.0,80.0,27.0,64.0,38.0,98.0,75.0,54.0,77.0,5.0,54.0,49.0,67.0,52.0,84.0,39.0,89.0,6.0,43.0,38.0,71.0,25.0,99.0,68.0,23.0,9.0,89.0,41.0,44.0,88.0,18.0,38.0,88.0,92.0,26.0,9.0,31.0,95.0,54.0,53.0,60.0,18.0,95.0,98.0,61.0,2.0,60.0,73.0,46.0,89.0,31.0,81.0,24.0,73.0,2.0,57.0,54.0,33.0,3.0,33.0,29.0,45.0,57.0,14.0,77.0,11.0,6.0,100.0,63.0,69.0,16.0,85.0,46.0,33.0,57.0,11.0,23.0,10.0,10.0,4.0,74.0,50.0],"p":[0.9245730487164776,0.8206514948153831,0.965018599758024,0.8159459710967174,0.7663139503300862,0.8142785051452557,0.8357202855967825,0.8710713000500364,0.9933523581019192,0.8709125910751567,0.8884491081956414,0.917896198637415,0.7642854997830173,0.8406426350962517,0.8376552710099401,0.8216712690233654,0.7679845856047096,0.8407449564653858,0.9970460335589242,0.9812104666983382,0.8975487324846416,0.9926652126976798,0.9544631199570288,0.8402027331959829,0.8865085993638322,0.9998555913828036,0.8053656283483375,0.8237334702308463,0.8957340724736643,0.9407819275106344,0.8170911764042414,0.8952003765576968,0.7784507903218627,0.9506198473246377,0.8066155431365578,0.7539658295221958,0.8167939157789883,0.8131629624763805,0.957250243862551,0.8477578805542378,0.8082043959819923,0.9460487420101593,0.8528445570907701,0.972716555512605,0.9451791348283889,0.8449156415483042,0.7522056844133738,0.9697913582896511,0.9530153048470345,0.9941937147092396,0.9171108605860601,0.774590979606933,0.95279956496987,0.8717763572651644,0.8114547732735016,0.8429613950955027,0.966709006814114,0.8013709438187153,0.9046601631083747,0.9558159404735396,0.9108447209436042,0.8299781330407062,0.9000722814191904,0.9462455707052375,0.9949016476485741,0.7711321427552382,0.8992889192966468,0.765663683205989,0.947905612170134,0.9325647357953241,0.9731327905839062,0.9318768933938367,0.8176733540834866,0.9108181459623215,0.8542577228967942,0.8840740382111776,0.802491114020442,0.8694498988523617,0.8930896902297427,0.8736286253956183,0.8821173991675854,0.9011123265462095,0.7832135432212348,0.7594789467393008,0.9587487799406342,0.9935707791708897,0.9116998699476482,0.9416443210476266,0.8136648652853642,0.7572579758914671,0.8994065528297783,0.8741737136189174,0.8502824520074252,0.9522834581550437,0.9383085067517174,0.7726369409262079,0.9835045009939678,0.9503713074220457,0.8118926727307153,0.7601199391056033,0.7829428717936028,0.8798168257091833,0.8367695890291157,0.8510869525051191,0.7770783789889871,0.9523075217384935,0.9894857635043437,0.7922018229471637,0.8923587464404784,0.8417735773221526,0.8560342071597311,0.8266188005898492,0.8750695678068106,0.9892720455682718,0.8237511295121644,0.7950180664324298,0.9390699932151186,0.760902512318534,0.8397984086597857,0.8858107867997184,0.8341601167771859,0.9508111746957393,0.8105303803680416,0.9673817893802444,0.8049928208714154,0.7538722491842009,0.9201489518519315,0.7998093248115618,0.99932844628585,0.8288722876300836,0.8766487255989261,0.9652711526588789,0.957083896946036,0.9591905490718318,0.9564414120640865,0.9995689655000951,0.8181394364112878,0.7691369077037888,0.8674141901999726,0.7520469060260442,0.8493698736351881,0.932899939147828,0.8720004471337159,0.8029817457128219,0.8855903102763936,0.9857247536316239,0.8831162708164446,0.7915155460400745,0.7674232105236833,0.9780362636049016,0.7511401457294611,0.9476795204913931,0.815371056460112,0.9075046313457241,0.9316954223055083,0.973752237326307,0.8988847463203159,0.8673710969374699,0.9120370827430695,0.9525744500056172,0.9640623512270765,0.8144230906946778,0.9028274964323003,0.775648047850068,0.8910656398009201,0.7683577637024992,0.8551834892469288,0.8867200956268311,0.9629902057188569,0.8765811882942252,0.846140186182513,0.949695298956525,0.7748600813299245,0.7610685119196475,0.7509484467334915,0.7769893336038804,0.9280350574210768,0.7684783582195636,0.9560597714668888,0.8833951728732699,0.7922787118038741,0.9441382676923851,0.9862571476696118,0.9672418873701418,0.8596376083582492,0.7885444877179915,0.9278563069344008,0.9794836682599615,0.773392188922783,0.815173218653744,0.8025506842864403,0.8236120789479195,0.9754736831568728,0.8046927892733571,0.8911079574273308,0.952530865279217,0.8591183881467708,0.9469242576602204,0.7963904191543367,0.804020061629682,0.9586252361101912,0.8648686545181234,0.7858995127819435,0.9232622759068234,0.7724999649959781,0.9498917866352171,0.9960083014943228,0.7859603376816008,0.751247357137995,0.8255178791434395,0.7581072740431591,0.8768956847465641,0.9281544471465081,0.8681094068212392,0.9871582729588576,0.9481150227468271,0.8221005397584122,0.8690176155743782,0.9682530034019619,0.9742875932927118,0.9230730224544174,0.7790037894990629,0.9014419080972935,0.7760276905863563,0.7958952338203078,0.7824781977892361,0.756545072178935,0.9320041217221156,0.958099398645974,0.829999536346999,0.8352013089285961,0.9555616896311098,0.9215401866042834,0.857581822085842,0.7908193986786436,0.8851018212325064,0.9786019772341679,0.9539543146947917,0.8146472772663776,0.7599352003667197,0.8578672977814807,0.9234365366192087,0.8741307173565049,0.8216542202470507,0.8528692056554139,0.7875422068010194,0.8149216999784383,0.9129573074669025,0.8858101379679362,0.8445074025505852,0.8750628478760887,0.7880692492787446,0.7976458923326786,0.84280799442397,0.9777586150956834,0.9068002724657951,0.9459173716975116,0.8524123707718525,0.945081426287913,0.8353223668445089,0.9233802337755168,0.9786767670324878,0.9874185694953135,0.9229842166476527,0.7727362615809927,0.9405518796403898,0.9695782861558404,0.7682571495197343,0.8079650566556125,0.8573417829362578,0.7813920117622539,0.8011874791181812,0.872287247475851,0.8737748155646698,0.8100360151653431,0.759621013646087,0.9608962889589301,0.8406856946190837,0.9447352370326608,0.866153882775668,0.7831649437643358,0.9608801055060037,0.7511164087898097,0.9234192646031043,0.9660998551193034,0.8893308494807562,0.8112084543685344,0.8075380825467292,0.8624891565276307,0.8519404063271303,0.8927897982088397,0.9611771940626117,0.8503822418973542,0.830181920101484,0.7608512621384547,0.7971745160673984,0.849954878039564,0.9492646049413147,0.8652195015843656,0.8304977590468472,0.8830555113222043,0.7665352400037193,0.9824379329604825,0.946718792121475,0.830768822946308,0.8133597718324017,0.7625956753579317,0.8557549170873756,0.9557953591610149,0.8517430941021169,0.9985577295599215,0.8646164586469229,0.9531176003989588,0.8333235399874019,0.8485660376102737,0.9221758210284398,0.8245116768107306,0.9261110325654924,0.7582779985165617,0.8823219035433656,0.8059498074250215,0.8337509256555623,0.9761108653050417,0.7940374332205103,0.8909269395501658,0.9105763581149038,0.9662180297927364,0.7675838402517228,0.8623275595275732,0.8627647002991868,0.8354981184227268,0.8036211190684133,0.9213321762891964,0.783370491107688,0.9873342202088264,0.8936400545247629,0.8410282386335557,0.9902231022444707,0.8694286216746652,0.9449934838248457,0.9013403847743375,0.9091516216339117,0.9350560568823133,0.8508080747364711,0.8845819015235844,0.7641574579492849,0.807856295952939,0.9821082140336188,0.9036415301834977,0.9973012460435238,0.802332346314911,0.9104211995324587,0.856122498009328,0.7983322661942951,0.7916683617032456,0.8567101188212138,0.8028046022056273,0.9025073376088683,0.9492256498812135,0.791023007134826,0.8256099351265938,0.8650512663773142,0.8645946099634202,0.9386499647949451,0.8555169907876168,0.8908276697639234,0.988312249197854,0.9261803600481195,0.9762986522958528,0.9977722021113338,0.7646464830870189,0.9515905700874425,0.8755810316248638,0.8058300102160716,0.9228055231415142,0.9689232231527171,0.8263352304835948,0.7537276675170198,0.8792586593737353,0.8492963519774455,0.995153896555165,0.9673787032806477,0.771913711036758,0.9623859713575602,0.7552431891854406,0.7854328596755287,0.9991693946338667,0.9988744996773283,0.7807918395286975,0.7804416551049782,0.885039690485892,0.7637862427657376,0.9264743484461484,0.8438100684485152,0.7938108570123336,0.7779970092760031,0.95770222482869,0.968834155935502,0.9728151893808981,0.7982352832349892,0.9875811241133821,0.8309353519247311,0.7658704372926203,0.9095989279111351,0.977017507165394,0.8113869111177776,0.9334805175668099,0.7745957536390722,0.787033201965257,0.7566551092813627,0.8004795356824493,0.8073206760728131,0.911268486044891,0.9341007256903331,0.971091979708398,0.9393889495241304,0.8905924661761468,0.8280749048981351,0.9911829526048521,0.9344985161378998,0.7845753173101679,0.872536898326025,0.8974425351876179,0.7733675745136729,0.8329021727754058,0.9230825125708908,0.9231867165235805,0.864321143078032,0.7516780870407724,0.9763621780558749,0.8975957163188673,0.8404961323937674,0.9638450456801091,0.9684051843079369,0.7782620189122362,0.9545706387071127,0.8751429249455684,0.9258238297104557,0.7989349812813697,0.8740642336115707,0.8596923448050191,0.8599024537495463,0.9899127242186476,0.9853002241131519,0.7874042704879182,0.8939731138094407,0.7931096387526924,0.9881000711211165,0.8882655610620858,0.9986510202647912,0.9488567225999559,0.9110330519427356,0.9002040830020877,0.9636921275664561,0.9298374082260346,0.9351477665816479,0.9558146809217705,0.7607749070492149,0.9841013949090174,0.789208816972027,0.8193063361178761,0.8061271805855512,0.9197221493658461,0.8342242960014565,0.911752250071366,0.8831356140503331,0.9986682516362129,0.9635514538217791,0.7896829171560731,0.7714836667077466,0.9710701160804805,0.9756779178189392,0.9020494901140615,0.9145639367728915,0.9515643351530401,0.7870585636934078,0.8093818362984946,0.7978660550834183,0.9665529159528428,0.9970344397913347,0.9007191093570851,0.9348446289792526,0.9729297314342485,0.8714321772726248,0.9436787947907355,0.857566725522401,0.9070426194289042,0.9209359923901845,0.8597310551039712,0.7902801994703645,0.8692068134231639,0.9153875254575318,0.8267652292792602,0.867594603263963,0.9257055060266691,0.8934486476670923,0.9271951878430587,0.9943302439946473,0.8374226539044858,0.7822599203487158,0.7595556311834204,0.7691532631801685,0.8807258266198825,0.943856688109608,0.8893681320133661,0.8484015493436594,0.8252749281382656,0.8333663212175888,0.8670670652379597,0.9076707815859906,0.7760126036514587,0.9898696608877655,0.7848118478479322,0.9491517333468,0.9525006467130717,0.79550921590066,0.9212502451470662,0.8494324765491431,0.9475706631397917,0.7796263115593768,0.9500030010654856,0.7851078544795613,0.7586893235540997,0.8647644789304618,0.8089044467989368,0.9947574624040181,0.8168424277552337,0.9392580185148933,0.8584841400334,0.7649119774937555,0.9855088302233362,0.9472620186966209,0.9368760653164142,0.8767483705817312,0.941841016822151,0.8372005585227862,0.8319685662303814,0.874406946588449,0.8223849468760324,0.9589131226318433,0.7505434005988905,0.7974023672855248,0.9180746038350716,0.9554061894570531,0.907935276633352,0.8676501130441698,0.8317793431153393,0.7601534541921035,0.9495104826482339,0.934211169312834,0.8227946781260589,0.7535283169571219,0.8340905538587451,0.8282493233939144,0.9753684948000693,0.9482215211415934,0.9707139098129266,0.9272584243145295,0.9837609656114317,0.9812967597759713,0.8910239261589095,0.9030545117357199,0.8053380298896204,0.9860073155462658,0.9024347712671241,0.935786629378414,0.7730351681273113,0.8671168736157605,0.8670314921000364,0.9435803811702508,0.9134808629305153,0.7662781336537086,0.8784797746334954,0.8506622972410411,0.7656908817089356,0.7592964406410359,0.9418739886475704,0.8931866251666003,0.9643550433169068,0.9485523626030175,0.8395630237962873,0.9486671948809586,0.9958665773608155,0.9233029827197099,0.8619856100569436,0.9445172728273858,0.8408247071304239,0.9315725789677376,0.9273297109919023,0.7835974032143193,0.9293988562928202,0.9512980752589316,0.9102976426691258,0.991162200895604,0.8603152494994197,0.9099433021935195,0.7993100054390292,0.9573607443492052,0.9387473202983065,0.9328092283431458,0.9763620108847277,0.8310285254672094,0.932383875662617,0.8313391813874957,0.8657491512099518,0.8322862853343619,0.9611220485006409,0.9433400884164285,0.8682777339981982,0.9913565315032796,0.9442079943181579,0.8289303256998637,0.8738636901058255,0.9059192580767864,0.764541493002186,0.9783598863518987,0.8511764169487366,0.9181397698724502,0.7723759155883987,0.8892448258996865,0.7625135672482278,0.8936716264709191,0.812193450346543,0.8600323588708175,0.9466100067701461,0.7993532617406154,0.999017462487395,0.7794519507493562,0.8523507348674861,0.8412583894016014,0.9371708294042131,0.7798694672475392,0.9154982389388364,0.7711330599216792,0.879436940663753,0.8427929852025778,0.8934104954011588,0.9369473438454727,0.9118664273500505,0.9005249291425025,0.9437879679988082,0.9397616838989438,0.9100515174259282,0.9684617683081977,0.8597847886979073,0.8995489789929697,0.8324795523988047,0.9979583155220494,0.8717010729909831,0.8146439754524968,0.9701084865822297,0.7945695718180108,0.8083279846628075,0.9741490649681288,0.8632944190559277,0.9795683695025315,0.9419417655660509,0.9782511936030189,0.828806808655792,0.9600891227364499,0.9277504040570184,0.8962362471398659,0.8365825122506656,0.8072049849953369,0.9777311266609858,0.9727289713624963,0.860777612603222,0.9677227920745384,0.9658324531210836,0.9711524961360689,0.9425465267243844,0.9654087602152612,0.9113308732396989,0.8992634474306486,0.9120069212793587,0.9040325274646712,0.7712519544513874,0.8249095295990057,0.8841905809488486,0.8617159952698247,0.8749929484883494,0.9322978312879414,0.9137017246740964,0.9237990253379961,0.8443817869769681,0.9119701596348537,0.970029146471931,0.9968993334790703,0.7898476938536648,0.8036674028383433,0.902521807444794,0.8669827931595293,0.9943949303078714,0.7929566158761833,0.9253963626669504,0.8827554531911752,0.8143590711877204,0.9841231548618332,0.9400167420726165,0.9607706234486437,0.902679886587739,0.9143845116017794,0.7744240520769632,0.7949894322057307,0.9658626920234564,0.9583989331910634,0.7522082916763267,0.9776875430153462,0.7862807180829028,0.9162027611540502,0.9708782335591638,0.7904691020225616,0.9744487358879745,0.7993607763167456,0.964165085641901,0.8524481644328477,0.7918852123156387,0.8338386396927956,0.9981815163602472,0.811720335733414,0.9753756462671819,0.877533414047992,0.9472877106409061,0.9686089588058566,0.7626041661953296,0.8225218130999192,0.9961070986736421,0.7612075878219149,0.9373236570934361,0.8057272640208383,0.7756375467529452,0.935851245202109,0.8297178733577532,0.8749044207119179,0.8932220683544229,0.7988699436173414,0.9253315939238507,0.832105188086558,0.8783770492220506,0.7917154388442087,0.7938917081636081,0.8601018951029549,0.9311977175734472,0.8722118767117537,0.8353998456104937,0.8115443483228013,0.8151804039912252,0.9310159373273987,0.9865186069126335,0.8960059769899498,0.7757936194357999,0.9493134567966797,0.9945156448494921,0.9443536568652934,0.8883433166544148,0.9589865394151549,0.951250563495351,0.9181175502187005,0.8187608341256876,0.7950060371941092,0.8954202193631408,0.7633202849648779,0.7752692816795852,0.9423793584974791,0.8240264353605533,0.8121452773673208,0.9089767778910443,0.9869958516258553,0.8831463442410171,0.9372950487241166,0.8144773853525304,0.7709736379736316,0.8742143592421197,0.8613301073170359,0.8482454452773566,0.7509375397712277,0.7919463624183806,0.9328324716480774,0.7719313685156979,0.9832678451664493,0.9317422897621458,0.9941139279741369,0.9763651473836856,0.8552513503972057,0.9334090677006813,0.9120168963194863,0.9605832023410232,0.8892436530219818,0.8063982031919003,0.8735714755126195,0.9074522892384925,0.9618208339638368,0.8089602796503953,0.7524403766971928,0.9010127681743245,0.7543768991168286,0.7884498766335541,0.9301035641885878,0.9398003339710246,0.9731646829562124,0.8049118058862571,0.9734837633744778,0.8054796728556728,0.8643279579429705,0.9422864123172152,0.7559014473330714,0.9022896816363138,0.8200426311130402,0.9840178058412342,0.8236247807802497,0.9256431535398542,0.937238599007109,0.7670075861431422,0.9378374319152694,0.8424957875178875,0.8391123340044125,0.9662759159522181,0.943749857047116,0.9616206008095866,0.8493150311218494,0.8048799703624456,0.876346923016587,0.7532321227620515,0.992188887520095,0.8382416156394604,0.9208130298614148,0.7944171800701243,0.760534526971751,0.9228747522167078,0.8311927162120376,0.9550864282206046,0.9612298187161524,0.8611922738393218,0.7594495252378044,0.7590322127268556,0.9641761873983278,0.9913826785013824,0.8858838393592083,0.9910144047398255,0.7505739042301258,0.759104888800487,0.8635555643638956,0.9047340360087016,0.9586814305667979,0.9290582676109065,0.8574392176029944,0.8069950072046601,0.9229343935940035,0.8332810091578289,0.8392692798546122,0.9996511459198951,0.9973025029777648,0.8235099324839823,0.8700302909778287,0.9046397111811109,0.9108170186826949,0.7711678110499169,0.7822126805280933,0.9584052340700444,0.8554618032228147,0.9217553119192097,0.8363457441028018,0.8308382005704044,0.7727043731136032,0.9525206106604283,0.7734049476559242,0.9142119253814298,0.9495616196268553,0.8443008265797,0.9821854971054673,0.7663943256749871,0.8528458705631906,0.8825969843688366,0.9624145794344818,0.8065519395895735,0.8573198200756518,0.8469055042353348,0.9666736650970772,0.9387801914364096,0.8138013457153439,0.7503265463696955,0.832269268722376,0.9893839437801373,0.9299871741805851,0.9257148718116301,0.8239484805558481,0.9586734051911172,0.8020464688895387,0.8553375082385704,0.8365648402415562,0.9780403356667358,0.8014355638970836,0.7819786306822178,0.9707737348061717,0.8050857703392961,0.965879665506824,0.9850220248827626,0.8036741603429092,0.806613941143087,0.8966910905194319,0.8225367456671977,0.9099064338895448,0.8141027993291379,0.8711663279117502,0.753232426786109,0.9548883713288714,0.9446700273340954,0.8751607376461545,0.8265148060840353,0.8059698717888724,0.891671105667357,0.7728731129496126,0.9861810808648249,0.8880293429968193,0.8251661240222622,0.7883830588394773,0.7985396088036247,0.9173388215319849,0.7823211695814856,0.9971343808157069,0.7746298996328909,0.9348454331183229,0.7992438234133938,0.8116819122923044,0.812519920544831,0.770966691314407,0.9303729561458738,0.9826319510652028,0.7921301193943701,0.8394132905993856,0.9798572966439267,0.7815057559848004,0.8130900523321172,0.9551194506018704,0.9566593538295058,0.9604045388315463,0.9246282592340331,0.946928175698541,0.8400849426879675,0.9810203264075432,0.8741076998519327,0.9266822799453072,0.9528478639544027,0.9376936909277371,0.9837849731418278,0.8299424494646808,0.8054673928451601,0.7681311975803091,0.9641206519238428,0.9377038439873824,0.7855955159692143,0.8129279165646869,0.7912990569909779,0.88316296911927,0.7574968614738916,0.7604702026043708,0.8743232781190999,0.785273047457562,0.9550794370163314,0.9958873515117292,0.9648106237381978,0.8481141253252101,0.7567264932660793,0.8561600830143259,0.9261168501863977,0.9161155789525878,0.9661872001069531,0.9467715140758637,0.7740825347869,0.9835601899566793,0.9868219323506668,0.849504277400047,0.7931165850393389,0.763799065370929,0.8579506776501893,0.7622791025918347,0.8822575635671952,0.895009926406755,0.8019847852083221,0.7938613956944096,0.9186274596744781,0.7824375045678051,0.9832835275970284,0.8585325744230912,0.9831255745330554,0.8115010457801599,0.7572390152064363,0.8365829594904851,0.7832448651368084,0.8208624362697734,0.7777465753666293,0.9582007743737155,0.8743435710968748,0.9775984071478017,0.8374715220220103,0.7893432097143874,0.8437537579727024,0.7510442891022888,0.7989523641231226,0.8264992756354064]}
},{}],28:[function(require,module,exports){
module.exports={"expected":[632.0,963.0,2458.0,471.0,223.0,101.0,2165.0,0.0,2286.0,188.0,284.0,6408.0,1764.0,15791.0,646.0,2997.0,345.0,393.0,850.0,880.0,29.0,1702.0,238.0,777.0,341.0,1997.0,1720.0,107.0,1430.0,149.0,311.0,472.0,194.0,392.0,7648.0,368.0,358.0,470.0,27.0,316.0,402.0,11.0,17.0,379.0,177.0,159.0,7852.0,393.0,588.0,1177.0,601.0,233.0,738.0,310.0,84.0,237.0,1700.0,194.0,160.0,1371.0,288.0,299.0,590.0,1653.0,156.0,542.0,1061.0,179.0,263501.0,756.0,89.0,2112.0,2648.0,257.0,269.0,592.0,354.0,52.0,453.0,337.0,76.0,68.0,2715.0,12.0,1275.0,125.0,1046.0,1715.0,26.0,296.0,303.0,5993.0,390.0,270.0,299.0,39.0,1862.0,439.0,726.0,230.0,52.0,137.0,116.0,166.0,280.0,776.0,1614.0,1719.0,1150.0,180.0,492.0,391.0,334.0,306.0,395.0,606.0,19.0,1889.0,3017.0,332.0,662.0,1159.0,1280.0,557.0,312.0,233.0,520.0,22.0,544.0,242.0,866.0,222.0,190.0,569.0,350.0,13.0,149.0,1195.0,235.0,405.0,436.0,318.0,141.0,900.0,946.0,81.0,9518.0,744.0,3238.0,510.0,28.0,2543.0,92.0,1364.0,476.0,145.0,1857.0,7599.0,2766.0,560.0,202.0,604.0,340.0,547.0,1849.0,1101.0,289.0,130.0,142.0,1505.0,468.0,603.0,933.0,116.0,548.0,19163.0,737.0,13293.0,492.0,1839.0,268.0,44.0,423.0,362.0,250.0,1110.0,194.0,1463.0,223.0,654.0,454.0,533.0,353.0,1320.0,342.0,282.0,7358.0,26298.0,857.0,448.0,443.0,79.0,124.0,96.0,204.0,2286.0,608.0,564.0,570.0,340.0,124.0,820.0,905.0,120.0,359.0,101.0,307.0,483.0,291.0,393.0,308.0,383.0,357.0,956.0,1235.0,582.0,1211.0,768.0,1.0,6884.0,211.0,2175.0,439.0,1791.0,371.0,80.0,390.0,332.0,51.0,12131.0,206.0,992.0,244.0,188.0,5.0,3381.0,459.0,483.0,164.0,426.0,153.0,159.0,82.0,1241.0,155.0,182.0,2731.0,104.0,86.0,642.0,269.0,1463.0,188.0,529.0,3498.0,407.0,231.0,883.0,0.0,580.0,82232.0,853.0,2815.0,219.0,384.0,359.0,775.0,641.0,213.0,1083.0,931.0,393.0,250.0,128.0,6548.0,1374.0,381.0,746.0,525.0,148.0,529.0,401.0,787.0,217.0,1432.0,543.0,1505.0,600.0,347.0,361.0,1974.0,2900.0,80.0,586.0,340.0,13.0,228.0,2561.0,937.0,311.0,127.0,1044.0,134.0,10.0,436.0,246.0,1893.0,114.0,206.0,1278.0,12.0,3570.0,1716.0,307.0,268.0,97.0,377.0,234.0,285.0,1161.0,100.0,718.0,415.0,365.0,285.0,5153.0,432.0,424.0,124.0,7656.0,362.0,2008.0,5022.0,670.0,551.0,98.0,952.0,12551.0,378.0,349.0,557.0,553.0,147.0,303.0,2311.0,367.0,445.0,75.0,16.0,319.0,188.0,3767.0,829.0,123.0,857.0,669.0,324.0,364.0,877.0,2482.0,342.0,1432.0,389.0,804.0,336.0,61.0,308.0,217.0,95.0,358.0,865.0,689.0,605.0,2129.0,465.0,262.0,752.0,1139.0,111.0,540.0,2617.0,252.0,193.0,163.0,19.0,189.0,6301.0,387.0,248.0,188.0,512.0,3483.0,1904.0,841.0,234.0,468.0,243.0,93.0,163.0,2488.0,505.0,328.0,16.0,2042.0,206.0,239.0,233.0,334.0,150.0,4777.0,13.0,1273.0,201.0,335.0,224.0,696.0,1.0,291.0,313.0,339.0,1686.0,910.0,269.0,197.0,3439.0,417.0,608.0,401.0,1631.0,1267.0,7183.0,1518.0,547.0,707.0,281.0,1310.0,399.0,49.0,393.0,1278.0,153.0,521.0,767.0,381.0,694.0,179.0,140.0,70.0,88.0,395.0,296.0,690.0,515.0,970.0,59.0,100.0,1793.0,2047.0,805.0,9421.0,503.0,58.0,436.0,122.0,1247.0,93.0,418.0,1825.0,228.0,1694.0,188.0,3139.0,45.0,698.0,354.0,730.0,124.0,240.0,143.0,498.0,154.0,187.0,17597.0,375.0,96.0,255.0,3436.0,19385.0,1476.0,499.0,1240.0,166.0,270.0,1853.0,333.0,20.0,459.0,3206.0,1024.0,257.0,40.0,237.0,8439.0,528.0,17332.0,259.0,453.0,1849.0,481.0,75.0,1362.0,424.0,12.0,2883.0,1838.0,255.0,103.0,37.0,155.0,250.0,507.0,655.0,52.0,402.0,258.0,648.0,4534.0,855.0,65.0,845.0,95.0,383.0,339.0,332.0,358.0,1001.0,529.0,34.0,6.0,321.0,202.0,879.0,280.0,1639.0,1062.0,5965.0,365.0,1156.0,5569.0,318.0,283.0,1116.0,1351.0,114.0,1774.0,1321.0,1409.0,596.0,394.0,516.0,986.0,391.0,790.0,1925.0,90.0,6613.0,267.0,2272.0,111.0,667.0,7456.0,189.0,13.0,97.0,635.0,934.0,724.0,992.0,422.0,681.0,344.0,61.0,397.0,838.0,511.0,10172.0,702.0,464.0,3230.0,966.0,8586.0,164.0,387.0,593.0,82.0,464.0,1731.0,260.0,212.0,864.0,123.0,239.0,162.0,519.0,20286.0,1050.0,2012.0,203.0,368.0,2795.0,75.0,253.0,78385.0,616.0,149.0,404.0,70.0,1141.0,536.0,1991.0,53.0,2336.0,296.0,1042.0,1177.0,142.0,711.0,978.0,877.0,313.0,570.0,721.0,3739.0,299.0,778.0,78.0,6.0,287.0,153.0,114.0,330.0,548.0,235.0,197.0,143.0,190.0,1966.0,1554.0,246.0,235.0,763.0,1500.0,106.0,242.0,290.0,1106.0,169.0,97.0,356.0,1308.0,5.0,35.0,465.0,127.0,327.0,842.0,410.0,147.0,404.0,2473.0,1247.0,1022.0,365.0,644.0,202.0,516.0,699.0,708.0,183.0,1075.0,40.0,460.0,348.0,665.0,60.0,721.0,391.0,62.0,55.0,547.0,245.0,310.0,1031.0,570.0,3193.0,185.0,1876.0,277.0,617.0,1298.0,291.0,1153.0,570.0,224.0,136.0,251.0,7.0,20.0,224.0,376.0,495.0,567.0,1434.0,233.0,2117.0,270.0,261.0,200.0,1572.0,323.0,4353.0,464.0,453.0,1550.0,982.0,434.0,78.0,710.0,104.0,461.0,934.0,140.0,163.0,694.0,129.0,986.0,272.0,9.0,598.0,13.0,1822.0,298.0,13.0,3621.0,121.0,811.0,48.0,283.0,118.0,3998.0,349.0,2.0,2714.0,210.0,246.0,251.0,247.0,567.0,92.0,1048.0,223.0,104.0,515.0,175.0,173.0,493.0,2741.0,4554.0,237.0,179.0,62.0,891.0,37.0,234.0,531.0,165.0,682.0,1051.0,674.0,201.0,248.0,32328.0,1103.0,4.0,1083.0,4303.0,94044.0,244.0,497.0,690.0,961.0,40.0,419.0,527.0,493.0,569.0,7108.0,250.0,255.0,315.0,1849.0,389.0,599.0,481.0,456.0,5820.0,639.0,544.0,1315.0,1010.0,278.0,73.0,1176.0,372.0,161.0,2096.0,1419.0,469.0,443.0,241.0,17.0,634.0,238.0,422.0,237.0,326.0,821.0,640.0,173.0,303.0,1487.0,51.0,2288.0,1525.0,2029.0,585.0,235.0,1074.0,85.0,307.0,430.0,1279.0,449.0,130.0,221.0,64.0,773.0,306.0,462.0,333.0,139.0,425.0,539.0,1776.0,53.0,849.0,1137.0,666.0,72.0,284.0,437.0,291.0,985.0,9831.0,441.0,265.0,172.0,327.0,1405.0,3970.0,1977.0,169.0,399.0,564.0,118.0,514.0,276.0,141.0,411.0,106.0,1449.0,837.0,6142.0,181.0,1477.0,30.0,519.0,368.0,378.0,666.0,1532.0,432.0,245.0,403.0,365.0,338.0,442.0,268.0,522.0,2437.0,69.0,741.0,741.0,283.0,781.0,44.0,22.0,777.0,335.0,44.0,423.0,671.0,184.0,5487.0,1018.0,376.0,85.0,665.0,270.0,5013.0,276.0,604.0,349.0,12449.0,1800.0,70.0,489.0,1229.0,864.0,415.0,620.0,963.0,38.0,837.0,552.0,204.0,97.0,13.0,521.0,467.0,441.0,413.0,7017.0,303.0,28.0,343.0,7203.0,651.0,344.0,26.0,671.0,660.0,219.0,435.0,1159.0,1538.0,594.0,18.0,1679.0,58.0,571.0,479.0,291.0,263.0,13721.0,843.0,28.0,705.0,6.0,137.0,1500.0,132.0,701.0,434.0,3904.0,292.0,9919.0,261.0,331.0,95.0,379.0,2642.0,571.0,5448.0,2820.0,61.0,113.0,236.0,141.0,832.0],"k":[0.8952189188457687,0.13011885367636955,0.5623130837404944,0.5494359890098157,0.705557376339192,0.8259212073547844,0.23624761282964113,0.127152221819826,0.2668595035719117,0.727797128228663,0.5202060186676247,0.7432835078320197,0.32804631339482704,0.2143184208740836,0.9348820576455656,0.8747472004775347,0.5536716469191876,0.027493227485712257,0.8080560463464237,0.9157610709778203,0.868771648372707,0.9158277215760247,0.8211001813710406,0.137596793952258,0.927550008712841,0.2412953713611905,0.9135231038593872,0.10716669265769907,0.041172604448565187,0.6473218360861912,0.690306860861168,0.5181650160737576,0.5338704268959864,0.9079940256644263,0.26273726211756676,0.978932339585801,0.7093248313776717,0.489365640153153,0.5623982464173356,0.5058851269216098,0.8953500366362279,0.33263653354967504,0.4380268418533526,0.7712778093533541,0.39114771121085856,0.060029221990640425,0.938838662421299,0.3835476079326434,0.6733107633491244,0.5102773918282986,0.7266117073241747,0.47726648541922856,0.8523403937215637,0.18072244375704494,0.540251739676207,0.7553548495381333,0.22261876798794455,0.09836567480827729,0.012849104992138205,0.7339184448586771,0.6695576965329639,0.343373295177384,0.9616478094303433,0.6080308190145656,0.23347852778605338,0.11820279513993315,0.03616543974188735,0.9811928134725567,0.6660552588805055,0.4634759175824743,0.6792770838743984,0.8595714268552386,0.6673249919106976,0.8445735865275783,0.7955444447719184,0.7081685903555726,0.6195085227407602,0.8641809043225226,0.17257452598636003,0.41300031834885287,0.7087195518137881,0.20715219686428954,0.6362310712235444,0.019271413375416158,0.24204329876029718,0.1771122744963407,0.09892647523026965,0.5134134764465768,0.02351811175036822,0.9797699773796897,0.3752191940396321,0.9235112828241672,0.17028675184591746,0.10603160209611029,0.889573567015493,0.6675538730295341,0.5728445001595308,0.7604028050503178,0.43387072242988256,0.30175906421183707,0.6238753325722635,0.018001459975729217,0.0456723798358063,0.5148717695908238,0.32956226203659345,0.26154152655176355,0.44723241063104213,0.3068888352577799,0.5150345412284458,0.8468772801592375,0.9308129013600754,0.39256321635016,0.002113540793445612,0.09183433729499635,0.48513082987186773,0.22856027549533087,0.9660938278439217,0.04249647109447796,0.8035364745836358,0.7827197128949996,0.4174407179480184,0.8948922785749267,0.8699613464281162,0.16209453170891708,0.6542546331208341,0.10096985310508266,0.45287175116101475,0.6418112279779413,0.9283793400119029,0.6635360564956425,0.5892242864611132,0.6597656182170111,0.4042300266559822,0.06166096734098048,0.13930400785392383,0.5290969765681321,0.9992254859620797,0.329293793444847,0.05316651933776595,0.3394627117494755,0.5632656304501278,0.051438908871503264,0.9182048558761524,0.7644565812719526,0.6322796189277615,0.14490219348176714,0.060820900064407546,0.13628127600433548,0.4643628745332875,0.9636964575625806,0.25872349036993225,0.4808589040745148,0.9974696727113159,0.21494039394916586,0.8738923395428608,0.18830065733324997,0.08239489905710218,0.995793647228224,0.15862923404092366,0.5672542511883285,0.17083637875253932,0.9735255386647645,0.7785283618548084,0.8863749935174363,0.04892636825979446,0.195742428425278,0.6872076163873098,0.5605801914870385,0.34161045824959846,0.6305504225946661,0.21950888548929437,0.6429585769847266,0.10200388125476101,0.8446457948407426,0.36550630453864064,0.9491988729898362,0.5925650913943181,0.8743646238355927,0.7001963253616794,0.7468765953420318,0.14750141991263632,0.7256574135408815,0.5716448739725959,0.21109123719180856,0.6381713705730989,0.6919461938912124,0.12092758730649877,0.2962860703471284,0.8395364444417281,0.9385216943613544,0.38725897491385375,0.7485996528363774,0.5790538795630469,0.3170198311897221,0.31400706263592837,0.7449337185588163,0.49614938491175997,0.6831236798679419,0.9036900752413373,0.5688062360738066,0.8501662127575338,0.2642236818498096,0.7789664325873684,0.7070650044726141,0.012588915468574546,0.5538020714784175,0.5850755045603511,0.03165882594023395,0.4005442846901113,0.6697314999468469,0.20667242574392453,0.35037005592205817,0.07496647213020835,0.22309184801661708,0.33986913173521827,0.40450992224822113,0.7225410128561354,0.024751752433219032,0.5604458491794739,0.4906685464407321,0.4116629658440243,0.6233242844719427,0.5266547245132942,0.9710957612417068,0.9877787000783629,0.0009134250187969872,0.22537049620700889,0.9575661226673537,0.05657878308657516,0.4696094464265481,0.8349286609165705,0.414622359769677,0.9017925131523492,0.03650730405760494,0.18156648599865655,0.23557978868187068,0.08414531930940616,0.9193082586109638,0.09008024326639519,0.8667855402196867,0.17643830206742495,0.99692760009974,0.3471983517033643,0.9539642546656621,0.36366497224808647,0.9121446848284349,0.28679254995825043,0.575634090689247,0.47276265847984034,0.48698894652959757,0.0891025919976145,0.5823727331400017,0.3941263112065607,0.16149525816153698,0.0624496335230329,0.41059561610842765,0.614232939025567,0.5145942397229899,0.04501275113725067,0.6516620952633285,0.7542481665577292,0.8123188844130984,0.8855799598062988,0.39928536981792107,0.15612412338618653,0.38852969152400174,0.24534639282568294,0.9698103619784599,0.02402525884034734,0.9902497100146967,0.02536880811665232,0.2904635132014446,0.9788782892210779,0.8902474302589614,0.23943619701795749,0.5221530729472021,0.1628740614855002,0.6740445932211552,0.23239122288894976,0.04176609971139689,0.9665781255987203,0.8511349877570547,0.024543758622828094,0.0929280462739921,0.5972551599761566,0.25212058713872554,0.2481790244361377,0.7761351220808232,0.6346939279523172,0.2756883554109908,0.9808920764444333,0.6768692516505215,0.04351189275595879,0.25526635294239797,0.8294199322865714,0.6848995723294946,0.5987069092709263,0.22756404448902945,0.6661765815784326,0.08535700506334831,0.4300947373420776,0.03041979464842237,0.014916847504394815,0.2949179118823442,0.47329958650379256,0.34389049708814,0.026423690210348738,0.8387183597937888,0.17716870601273005,0.1830905726028964,0.0665469726467014,0.8066567447545483,0.8512027436419352,0.07648612827643664,0.8810835482511314,0.2248433306335469,0.9966928105648074,0.49910321742407326,0.11646524580276485,0.8222740282353822,0.22100092635230295,0.04687378889750726,0.996852590734383,0.7391142628241405,0.291506891555424,0.2913597702682855,0.7422378236649616,0.5556482704211434,0.9262441994286703,0.8015754210535198,0.6255505240851738,0.8387322550401171,0.9392247226574015,0.8359763550158075,0.6474954414223089,0.6543481137480909,0.5832892861353314,0.2587401944646299,0.6823818043919136,0.7668698788296076,0.7610506307887566,0.8840793685919126,0.8001861774979988,0.9472551835637348,0.750908088802325,0.6510424037614728,0.6995253694682138,0.8681421355747558,0.3478085310462864,0.6999461323677261,0.6950123697670483,0.41969711977075397,0.12028108007291771,0.5649880695394995,0.46942343244866125,0.28047969749678114,0.8340175315291707,0.8074634657716031,0.8796238314750009,0.5671198324996118,0.6095295431542891,0.8517776625740996,0.10748229291862588,0.3937443879120779,0.9007132314166755,0.43859105069526705,0.023624829557788996,0.9740160745552642,0.2623933716166116,0.3609443733000859,0.6056855551519593,0.2537520328499756,0.700034062388482,0.24261129343716958,0.4090232107399514,0.19144070499707921,0.8271986222785062,0.1624370914039146,0.48655335593728166,0.26040809202888027,0.39003529212414545,0.6119083658530107,0.4269086253990426,0.792876030919053,0.9172755852962635,0.9463966677716185,0.3212799347249349,0.5864315980401287,0.9342621023571764,0.5699360788219454,0.8547192129148344,0.3045519967988033,0.5299977663606961,0.09718200177786263,0.28388672751192123,0.26467273990725615,0.29886703009437143,0.9179356971545021,0.942171360020865,0.34557701813516983,0.40397626073167947,0.9722321290078078,0.2194778711079839,0.6797898630375079,0.14148344112624245,0.7028494952918005,0.18973482312857248,0.1591814504274056,0.6302812851495629,0.5237021859003446,0.8506759239230437,0.9919628929844828,0.02207516634096307,0.1217668559188465,0.2826977319964328,0.6839893590302635,0.35944691927460926,0.301740791565289,0.2847374846690989,0.9438330888309556,0.7806584474995029,0.5235710439612544,0.0068296971533681194,0.7533435555583823,0.5413067953975033,0.39504522376437623,0.2629430823707535,0.870829769589686,0.5602251964367502,0.027737634041833603,0.8053945947142156,0.9251697087872559,0.15418844056118797,0.032649604215696515,0.6057042708836426,0.08442136756278606,0.8860972011330885,0.04292560825832625,0.8698106790223725,0.595404331593417,0.3671567659603918,0.44211313927216067,0.19978223295580277,0.7345120525297142,0.6507793421231918,0.7168140571151596,0.11801446010566052,0.792474966673659,0.2273816873240806,0.47511087750764935,0.2574544401766554,0.6493181338114122,0.6258206403646458,0.7302834809232757,0.9437558712003891,0.30727636352078513,0.057031141849999134,0.4520710231686589,0.4575247029496705,0.7911950293316314,0.14223677983162508,0.0031498062445594055,0.9402873086731967,0.28157771707781687,0.0029044111901281866,0.49023483708202265,0.1877236718949169,0.20812915325794568,0.475080985654988,0.608901225889549,0.6205755370196107,0.19214788213897616,0.32433630414369974,0.6563534324664557,0.021075980394015925,0.15956131777815186,0.17063935683942932,0.8010412629158463,0.9471917147219153,0.8174438124933112,0.5504824873950953,0.5381336468351599,0.0007588423558171353,0.7684078871461615,0.27142875921627563,0.22850209508228003,0.017896707499909015,0.40870501775427526,0.5829700162303111,0.8878148195111759,0.14552621395037835,0.960016322749321,0.22743713903269036,0.681198226087874,0.3824114590816654,0.5656777419877752,0.4787480876527117,0.33929865858341146,0.4871305387117688,0.6423879893586031,0.6621546760079289,0.037965029998985766,0.5253311625357358,0.4881280528826448,0.9895742272290484,0.38475048020121116,0.3912386965465835,0.2943256999811097,0.5761543804488678,0.56919355577041,0.6525336286848868,0.11140848080347854,0.7991070509135718,0.7260302195590296,0.4261852114228255,0.7747053392012846,0.04733231130854554,0.9775593959783027,0.8506169283324707,0.2181873685783342,0.31517470742841414,0.034736578991081624,0.46183827399878896,0.47346105177128717,0.5344777486891064,0.02600368320180646,0.3547583746778309,0.6413633766726679,0.6492333305486715,0.32238524443654115,0.6653743916761841,0.7266370736247023,0.13461269071383364,0.965579636698646,0.5576268329581664,0.31387946394041744,0.42005799009543576,0.637599635765878,0.3220032342217447,0.24879287347344814,0.2241322866664519,0.2956954500819464,0.0807034493273251,0.532070474325745,0.5260643202164621,0.7283750563549554,0.32236448889607505,0.9495247161346507,0.2883582774728488,0.3558468958573471,0.9571776292234557,0.20623163689771995,0.7544146669487224,0.8068330946555353,0.5282943010785477,0.019528217995579356,0.1983471724334107,0.4001010736564514,0.6659109796482228,0.7075037542027429,0.5647159732823492,0.5040840887712736,0.23017307387394537,0.2568232634197394,0.4737037764653369,0.8039988769109281,0.43973237106138985,0.6975724682847562,0.6075669403569646,0.29976559192805174,0.021892177762985687,0.8580357580928855,0.9241838930855906,0.8007897133914825,0.004987074228307575,0.5375799124557175,0.8601927046480642,0.9929980247816124,0.7973096440655771,0.5088281507503305,0.7857915542408556,0.04765831126222975,0.48550121182780503,0.9838051299583837,0.9334594296947796,0.7434317933192902,0.620134650107478,0.018428919517875064,0.942691944604888,0.4586621814686134,0.2890812033602257,0.131264192832119,0.7516244231445937,0.8600383577608213,0.9463651252212915,0.9183554263797991,0.7164098725962575,0.6703534532752384,0.10511395092866982,0.3248648812715238,0.322895235357616,0.23672310180098455,0.4025226522511316,0.8285843232005452,0.4917203887560342,0.20965353103539996,0.3979863134854078,0.40272935782431096,0.5419388833240131,0.12410120945955772,0.9044279470784953,0.4569578109832617,0.18607719355632613,0.9621396474142929,0.5941206107425501,0.011465990615653343,0.6840452696853712,0.8445335951343111,0.20753501927361584,0.1493909940883169,0.2562398882003849,0.9863534139539358,0.9667548731348161,0.2751177570425687,0.008372754191843468,0.4033813409686442,0.950716676515236,0.8811551359571943,0.5248690503200115,0.3924227119011048,0.6549808946094757,0.6559097468161843,0.18447121622851026,0.21940837338507513,0.9226396173192015,0.5470299137799566,0.8820407176211404,0.12508632437180234,0.08941917710603975,0.3079719184063807,0.2358908417249348,0.6902035064288374,0.09183056504519826,0.22658013097297403,0.3395041292858043,0.34819894858128797,0.7707700447164725,0.28222896093851,0.24154620531528903,0.78108586301936,0.08907681387334954,0.35138344199158755,0.20056894252733248,0.15404830873903586,0.004509139582770105,0.8867776065551376,0.15565948227576998,0.6091841407590939,0.3723265791770991,0.6925433719451024,0.3349357236515147,0.18029008775368438,0.8302639188603367,0.4801438394051123,0.39522944698179585,0.7979616601950192,0.7102846632925155,0.410276266365595,0.1009708705147867,0.22898396474745653,0.27167225071993184,0.3951625302759514,0.32541990102865204,0.8053706110888885,0.5165337089635664,0.22856390137787796,0.13885227482443163,0.8126875716771071,0.5492575909222606,0.0502005397789107,0.6477913296117115,0.7063227604720566,0.5579433467220818,0.3529773860511176,0.8018328614694397,0.6473515773097718,0.06214894471000232,0.10774707257694782,0.05119317211428509,0.2416483143876551,0.5226258454797452,0.5595017132779714,0.840050608770168,0.16530868240753271,0.11067211659461007,0.3527574686325443,0.5045196002958248,0.3632834931500133,0.8451935827514294,0.9829737762838284,0.26337667998746395,0.2197801219081339,0.487207024888096,0.3397852091227034,0.2547092118132679,0.5858099743923961,0.33679119137198654,0.4846204332862303,0.6830576620857347,0.8587065009034713,0.8464635291054785,0.9707812949919383,0.1644145332453133,0.35412142383574885,0.4660681936300277,0.6986905488829427,0.7963079833111306,0.9702632081006475,0.9615526485001467,0.20205510431017304,0.3156278581290153,0.049378657542827664,0.2838541425919292,0.15821563420170448,0.4619098705820488,0.09721199464548325,0.003853661481781012,0.24893804874957848,0.45563246275487623,0.8055298072612156,0.28778302811066814,0.6675714101322399,0.3582035604389273,0.44909753838266697,0.5104545788858712,0.6224587380673374,0.33157241433245144,0.6147582755344148,0.05594011735176596,0.41508931787167613,0.1587959058976265,0.25344683356011677,0.15319446711219697,0.6305965369039821,0.6833831802719601,0.016053649099492695,0.4040730257185212,0.13523493737215864,0.7348451005136318,0.047098791802137496,0.47335701694490284,0.3081583417468303,0.06373810176528094,0.8074384203107665,0.9381574742725061,0.7706459594992863,0.16641414635223195,0.9560150465491228,0.10085957096177056,0.23074798212509795,0.5410285460269089,0.21673175264697986,0.7089396372551424,0.14502574491484355,0.5973011635842307,0.11822892414374597,0.6682846669577918,0.6797469018248261,0.49618143598965037,0.05203916300024369,0.08078801088034915,0.29048382876049716,0.1415000822763406,0.23506111744314317,0.4448823590489299,0.5820111321366475,0.6043061368213984,0.5758419219858428,0.950658041049183,0.6361013299975826,0.061443711083853714,0.3825782084585625,0.7813935967432453,0.7203577248046868,0.2359267822287141,0.48228893482501434,0.052371914570233935,0.7988885541475941,0.4578294654880619,0.9602776573735063,0.5887060339017671,0.10935946708403765,0.6428888283816656,0.1930568581510934,0.3884101730054814,0.4802454494478994,0.5791195401210805,0.6894726684671402,0.6500496944755099,0.49961750213412315,0.237502405534042,0.09702730457621,0.8075007262431315,0.7232764383229213,0.868913730517628,0.10821682729420412,0.8360786974908223,0.4663713873454354,0.8294668781559802,0.93121821436096,0.5774171113425464,0.9788300483003991,0.008849521373761826,0.36859905498579537,0.479737831286017,0.9624768900143859,0.18965526926980103,0.3911570158501916,0.9810830647755131,0.21108209360201635,0.3793853900480697,0.1576308712760719,0.9603624073593118,0.7054572761962963,0.1370271989324967,0.16351011271052607,0.1855864567725738,0.5316665261418425,0.15904140517961962,0.04850267145668097,0.8258980387188406,0.30364771201001717,0.222927074757723,0.43997585069535017,0.27338920606804096,0.5164161032912358,0.9519010800265848,0.9535986329090111,0.23140587485691855,0.9864192229656756,0.974971203586116,0.06267349814159306,0.30675019560883743,0.8267137044488841,0.8883711424796388,0.4587907727761027,0.1292944961748519,0.4642215087580124,0.5966802700895775,0.514363772020191,0.9521891389248911,0.831098119672006,0.887062672527994,0.7829511649482053,0.8196052330529526,0.8834592894998143,0.8318357502850697,0.06913524518400949,0.6302763653669106,0.2943655343526459,0.8772260316890566,0.33835155595180066,0.5401321733748277,0.4314885008264595,0.09475956955873133,0.0967663291130545,0.40247629428783616,0.7683386692758079,0.05521421670010662,0.3109285184283077,0.936966688597759,0.6061345854234561,0.827077932727736,0.5136388352807415,0.7512408213023076,0.4932083406387051,0.9739355702789891,0.904081675349482,0.6084861307548359,0.030942845391283225,0.3193102449970431,0.3291045275721429,0.20984688815986852,0.7705744485128487,0.13445422828024634,0.5092201845288131,0.08307772771007338,0.9200018531981897,0.3001379164354596,0.5836069060548805,0.39087672166015563,0.45343351156798395,0.8342180507016739,0.4427037750527454,0.09131543095229744,0.3989980550324883,0.9718623988355652,0.2816007868152519,0.9647268582781634,0.1821664827529963,0.4328518689605483,0.8219650138923307,0.46846294441390635,0.8389125860013442,0.8926895543949227,0.5688308903220978,0.409060123104521,0.48325253443712346,0.22139249793257143,0.4381887950616661,0.3831016234377813,0.7148167148817421,0.2679795588615028,0.10605037054957567,0.031206518722161514,0.7232658277484398,0.5748138608323745,0.09456018445266912,0.005397742910595582,0.8807220506990465,0.9377826598974079,0.36702958479126635,0.08287564407057335,0.5980751234021575,0.3191013331182426,0.791503786586631,0.12536001029330124,0.00926611006184408,0.8027732947204904,0.8066575207511277,0.9609460632385365,0.8098964567290698,0.40594618384405523,0.26001899240458903,0.16680767318482737,0.8865680766695618,0.3416685358716647,0.9922663790022883,0.05338717303584306,0.1646505885305649,0.6094162677320072,0.388608878030531,0.1903102579809317,0.3182850681257816,0.9354486754996505,0.5712918181802926,0.0846638674137894,0.48633866247465285,0.9877802596714698,0.3472999294222039,0.5392402301461399,0.29636879769406654,0.6787758395849335,0.1818063827027303,0.06072873560366632,0.720736258213198,0.7977065825349932,0.2169651832325208,0.36662554838740236,0.6841340233421631,0.34071187392625113,0.21740052162266976,0.29916484565307466,0.6300733534404315,0.6607721646195996,0.6671581374324831,0.7683641176689213,0.11284998402243729,0.9408813622300085,0.15341126335364486,0.5085697250014243,0.22940080633205384,0.4637679257185596,0.1145861604168934,0.5861503166135551,0.01355200916307231,0.25869717729559993,0.7979046034041417,0.3313297887833415,0.7229748428840717,0.45633551472928824,0.11664279821843615,0.8252449972267186,0.5433875565844664,0.441524863554295,0.3838727525754242,0.6095437611379066,0.9413591400503307,0.6535341703667803,0.022230077914872304,0.21677101723449343,0.9401481524243733,0.5469168428280853,0.7982114959777036,0.4794928427826124,0.013509028017262947,0.5056682175944867,0.014117087342235601,0.44616534714345946,0.6079770526217902],"r":[39.0,80.0,40.0,83.0,27.0,9.0,97.0,1.0,84.0,32.0,54.0,71.0,46.0,88.0,73.0,49.0,17.0,50.0,16.0,62.0,3.0,94.0,12.0,92.0,16.0,95.0,85.0,24.0,34.0,21.0,58.0,28.0,38.0,29.0,89.0,63.0,77.0,17.0,3.0,33.0,32.0,2.0,5.0,61.0,37.0,30.0,37.0,91.0,100.0,39.0,93.0,52.0,62.0,59.0,3.0,25.0,46.0,55.0,54.0,56.0,39.0,48.0,71.0,68.0,16.0,100.0,82.0,26.0,64.0,78.0,11.0,65.0,61.0,43.0,13.0,88.0,65.0,4.0,44.0,50.0,10.0,18.0,96.0,7.0,64.0,17.0,34.0,90.0,13.0,31.0,73.0,68.0,15.0,79.0,49.0,3.0,47.0,50.0,65.0,32.0,8.0,39.0,28.0,26.0,37.0,90.0,53.0,53.0,22.0,19.0,90.0,70.0,82.0,67.0,89.0,84.0,1.0,93.0,38.0,75.0,97.0,74.0,72.0,66.0,65.0,21.0,23.0,2.0,88.0,54.0,68.0,37.0,23.0,26.0,43.0,1.0,2.0,27.0,43.0,74.0,76.0,64.0,14.0,88.0,98.0,22.0,89.0,27.0,93.0,87.0,9.0,64.0,2.0,92.0,42.0,12.0,60.0,62.0,44.0,42.0,43.0,71.0,47.0,31.0,23.0,57.0,31.0,31.0,34.0,73.0,19.0,59.0,98.0,7.0,93.0,78.0,76.0,100.0,100.0,42.0,58.0,8.0,66.0,48.0,59.0,51.0,8.0,83.0,21.0,72.0,50.0,98.0,53.0,82.0,80.0,28.0,44.0,81.0,54.0,93.0,70.0,23.0,21.0,15.0,55.0,66.0,33.0,80.0,58.0,73.0,23.0,97.0,90.0,22.0,57.0,8.0,65.0,30.0,61.0,72.0,55.0,35.0,50.0,72.0,53.0,84.0,85.0,25.0,1.0,91.0,43.0,79.0,45.0,87.0,20.0,24.0,77.0,43.0,10.0,45.0,48.0,42.0,33.0,33.0,2.0,81.0,74.0,13.0,39.0,92.0,47.0,15.0,20.0,87.0,14.0,35.0,86.0,14.0,27.0,48.0,35.0,73.0,31.0,90.0,48.0,90.0,62.0,92.0,1.0,23.0,97.0,32.0,20.0,40.0,29.0,66.0,79.0,24.0,51.0,75.0,95.0,85.0,27.0,39.0,100.0,80.0,58.0,21.0,64.0,25.0,21.0,41.0,92.0,27.0,46.0,100.0,68.0,29.0,52.0,87.0,89.0,75.0,15.0,72.0,72.0,4.0,54.0,86.0,83.0,74.0,32.0,67.0,6.0,4.0,87.0,23.0,46.0,12.0,32.0,99.0,2.0,89.0,97.0,57.0,62.0,4.0,74.0,8.0,22.0,87.0,19.0,94.0,18.0,33.0,30.0,18.0,71.0,92.0,23.0,82.0,57.0,60.0,57.0,67.0,17.0,6.0,86.0,54.0,75.0,73.0,62.0,43.0,36.0,19.0,17.0,67.0,8.0,13.0,1.0,49.0,32.0,57.0,57.0,10.0,92.0,82.0,89.0,33.0,19.0,29.0,50.0,53.0,91.0,86.0,76.0,8.0,28.0,40.0,13.0,23.0,78.0,79.0,70.0,45.0,11.0,29.0,70.0,77.0,16.0,94.0,95.0,20.0,43.0,25.0,4.0,46.0,39.0,27.0,45.0,32.0,100.0,47.0,93.0,89.0,65.0,22.0,55.0,20.0,33.0,75.0,86.0,49.0,7.0,16.0,56.0,47.0,13.0,50.0,23.0,59.0,2.0,77.0,50.0,73.0,4.0,83.0,1.0,59.0,26.0,90.0,99.0,84.0,52.0,62.0,88.0,17.0,75.0,62.0,76.0,87.0,19.0,68.0,78.0,60.0,35.0,79.0,56.0,8.0,48.0,93.0,42.0,93.0,59.0,34.0,78.0,33.0,21.0,13.0,11.0,88.0,59.0,70.0,44.0,64.0,20.0,24.0,73.0,83.0,72.0,25.0,24.0,16.0,29.0,15.0,43.0,25.0,72.0,24.0,34.0,97.0,10.0,90.0,16.0,90.0,15.0,78.0,37.0,62.0,32.0,65.0,37.0,20.0,52.0,18.0,4.0,42.0,79.0,31.0,57.0,85.0,78.0,51.0,23.0,95.0,43.0,5.0,44.0,68.0,5.0,54.0,2.0,45.0,82.0,87.0,45.0,51.0,74.0,59.0,97.0,22.0,70.0,84.0,2.0,36.0,94.0,40.0,15.0,8.0,21.0,28.0,84.0,59.0,15.0,33.0,18.0,14.0,97.0,59.0,6.0,50.0,28.0,50.0,15.0,71.0,27.0,79.0,28.0,4.0,2.0,77.0,32.0,70.0,21.0,98.0,85.0,28.0,32.0,65.0,23.0,64.0,59.0,100.0,67.0,31.0,56.0,63.0,56.0,53.0,51.0,96.0,32.0,82.0,29.0,57.0,21.0,34.0,34.0,78.0,6.0,98.0,95.0,50.0,3.0,9.0,47.0,93.0,99.0,98.0,65.0,49.0,90.0,19.0,89.0,30.0,84.0,72.0,97.0,71.0,92.0,95.0,29.0,12.0,43.0,86.0,12.0,12.0,39.0,47.0,39.0,90.0,15.0,55.0,23.0,84.0,100.0,48.0,78.0,28.0,32.0,42.0,12.0,32.0,93.0,82.0,54.0,43.0,3.0,74.0,29.0,79.0,5.0,81.0,75.0,98.0,94.0,22.0,57.0,62.0,95.0,23.0,59.0,48.0,66.0,81.0,68.0,13.0,1.0,67.0,34.0,2.0,35.0,77.0,19.0,45.0,52.0,26.0,45.0,36.0,47.0,54.0,73.0,49.0,16.0,35.0,74.0,72.0,23.0,13.0,89.0,45.0,2.0,8.0,96.0,15.0,59.0,72.0,83.0,30.0,33.0,97.0,71.0,65.0,64.0,30.0,10.0,82.0,95.0,50.0,51.0,79.0,3.0,80.0,28.0,69.0,14.0,55.0,80.0,6.0,8.0,41.0,64.0,57.0,48.0,17.0,56.0,17.0,75.0,26.0,97.0,49.0,32.0,89.0,80.0,28.0,31.0,38.0,1.0,1.0,33.0,68.0,28.0,34.0,82.0,53.0,34.0,72.0,78.0,53.0,41.0,35.0,73.0,48.0,85.0,49.0,88.0,45.0,18.0,55.0,18.0,95.0,58.0,12.0,48.0,56.0,20.0,43.0,25.0,2.0,17.0,4.0,68.0,63.0,5.0,77.0,2.0,10.0,14.0,30.0,30.0,97.0,16.0,1.0,94.0,52.0,11.0,63.0,34.0,66.0,5.0,72.0,42.0,22.0,34.0,47.0,21.0,27.0,73.0,84.0,7.0,36.0,20.0,58.0,6.0,33.0,46.0,30.0,30.0,98.0,48.0,37.0,23.0,62.0,55.0,2.0,38.0,72.0,45.0,42.0,67.0,49.0,28.0,14.0,73.0,14.0,93.0,31.0,62.0,26.0,16.0,48.0,28.0,17.0,57.0,98.0,65.0,65.0,83.0,89.0,47.0,92.0,48.0,13.0,64.0,69.0,15.0,83.0,77.0,72.0,51.0,61.0,1.0,23.0,44.0,96.0,58.0,8.0,92.0,12.0,24.0,36.0,29.0,17.0,52.0,32.0,47.0,82.0,55.0,84.0,11.0,55.0,70.0,72.0,17.0,18.0,40.0,10.0,27.0,84.0,39.0,88.0,24.0,79.0,45.0,31.0,15.0,56.0,11.0,46.0,20.0,69.0,61.0,48.0,80.0,63.0,79.0,55.0,7.0,53.0,90.0,73.0,72.0,38.0,95.0,72.0,21.0,29.0,55.0,4.0,83.0,17.0,19.0,71.0,90.0,39.0,55.0,7.0,79.0,64.0,12.0,88.0,48.0,47.0,48.0,76.0,71.0,40.0,78.0,50.0,25.0,78.0,14.0,88.0,95.0,54.0,59.0,3.0,5.0,5.0,99.0,2.0,85.0,53.0,49.0,99.0,60.0,73.0,27.0,67.0,14.0,43.0,49.0,80.0,84.0,49.0,37.0,1.0,42.0,53.0,83.0,27.0,56.0,18.0,12.0,95.0,34.0,40.0,27.0,1.0,60.0,80.0,52.0,52.0,71.0,45.0,9.0,68.0,93.0,35.0,65.0,3.0,98.0,46.0,20.0,92.0,33.0,85.0,43.0,8.0,38.0,7.0,64.0,82.0,65.0,63.0,90.0,82.0,9.0,98.0,2.0,27.0,92.0,39.0,78.0,90.0,68.0,35.0,45.0,42.0,41.0,34.0,80.0,99.0,51.0,37.0,79.0,25.0,5.0,65.0,20.0,93.0],"p":[0.06966326952778844,0.06747398358084133,0.016277194159228927,0.1512369061425083,0.11750313453348707,0.10560269803149228,0.03976116661938152,0.17750347812828934,0.03299470517330416,0.15871173560082552,0.15983097005414423,0.011771867949823234,0.023623203656939,0.005068683591247103,0.11888477066981512,0.018729318936708508,0.04758636771759126,0.08558397800797209,0.0223206051483142,0.07712060902080867,0.14896555070020662,0.05968402858365418,0.05993417402070405,0.09453952598632442,0.06152979764418958,0.04214032959242631,0.054014131588515826,0.1422330626920438,0.01684553624629528,0.1310943186747057,0.16603678468036756,0.055776565042479964,0.1648300864286228,0.08569003865957758,0.010709590584180485,0.18198160243278863,0.1864411289499162,0.03405159783840235,0.09884748106761304,0.09374422781174868,0.08976698763863458,0.09544747446388398,0.19940927914745227,0.15045432496193423,0.16446673765283717,0.11915621604673961,0.005931817820549057,0.18199438011887414,0.15110249538099502,0.031929158124636994,0.1413923948941816,0.1803789458490416,0.08735438874505626,0.1420888806632748,0.03256138357677352,0.10717674286093289,0.02334548803888379,0.18716383847812046,0.18892921889659117,0.0422940343187832,0.12620093325008774,0.13008217985859724,0.1293912269271417,0.040616604037487264,0.07610607285460157,0.13894071316339957,0.05859966166949944,0.17833736096661212,0.00025477604707222493,0.09224007101261705,0.12176149270584623,0.03379188714100319,0.02364884505474776,0.16349721832101924,0.05591708136042009,0.13607868946724128,0.15985101105130492,0.10765236578277221,0.0763382415622313,0.12459606003279995,0.13179877410853785,0.17177599492962148,0.03523350114583401,0.1563966873971374,0.04360712043843123,0.09429327675257922,0.024835636467227043,0.04985747826294049,0.1896590338896718,0.1301595241037614,0.18691107042320826,0.013203096163376627,0.028062992449319514,0.1987212062184802,0.1635331970689122,0.08229131627328008,0.02510097709917121,0.11165073818005733,0.08013301590728648,0.11090818345483805,0.14328931869406386,0.15964428044680778,0.141426473594513,0.13458954910211526,0.10797407013399796,0.09708010506874976,0.03103621267106691,0.02773182227323865,0.018636054106167598,0.11664776154714694,0.177173176501534,0.146791134193733,0.14498954594254304,0.15327494374955855,0.18278087211477795,0.11231651445936937,0.16164054932795074,0.03903576846637069,0.014111711367869173,0.19861985037536434,0.12481663157970041,0.06858315579500425,0.06017228225142053,0.09374937507213184,0.17949857635676414,0.06132321562833969,0.0407814270442676,0.08915357021845477,0.15958490623195606,0.19129028119653912,0.07435798625671967,0.15056572979670513,0.10132991999011903,0.03152767427559398,0.0924756242877038,0.05569102189736679,0.061530227800261766,0.020035673980128357,0.12078235968040936,0.14717165408538785,0.15020040098538182,0.13707111625192572,0.12303825012101113,0.09541303246760582,0.09665074164620102,0.16988466130404728,0.007800666639673626,0.027875390151875925,0.027567584741376952,0.1723463669722697,0.19029262724139145,0.02428065578990628,0.08395956895236584,0.05805634624116301,0.09485948589432557,0.0572231207841035,0.025930654093455054,0.011043501745074957,0.013322215623042278,0.07100471645791688,0.15185544161358686,0.1290395592657637,0.1336567329124823,0.06512834223633993,0.008394657884801583,0.043702640979656995,0.10409366705333883,0.19493182624927563,0.17943727822156685,0.04783074470900366,0.03201720474720853,0.09276820958880388,0.08360837199035794,0.0776427115158672,0.13992090453573006,0.004831369819045106,0.09551352155017989,0.008325830017648795,0.17658591895995462,0.02448461575549046,0.15570523873377093,0.17967859859015742,0.13704053152471338,0.10404239266053393,0.19765920498801975,0.04673653821927251,0.024375266523315543,0.05048249432185084,0.10355165922976678,0.11665978654843237,0.09483406007415685,0.16455621493713363,0.13325605943455293,0.05533159908392365,0.179937714051901,0.1001884677147305,0.005890681510323859,0.003222789775809698,0.06962178848339332,0.17420808362883441,0.15197247593597663,0.1980641873984455,0.1657604077494025,0.15063006976724883,0.15813246917709756,0.02838065934710046,0.052872160699568044,0.10092996261675236,0.08893659811892758,0.18452456770912795,0.13147854929893277,0.10161705079899984,0.07765098778881524,0.130654212893502,0.12944217225765584,0.0645599387557501,0.18558277486078678,0.03981442385826366,0.1756985767097283,0.15362254976098028,0.14645474442928502,0.0872044090475581,0.12330369829214992,0.0858280477629616,0.054523572339833404,0.08937603422122478,0.0602900925708096,0.04293424465174267,0.039977857973291814,0.012895909473568735,0.19148114512559694,0.03407874345905069,0.11025701359923223,0.037982318545970985,0.040903165780560795,0.19866369073994156,0.14154760067433272,0.13812143156502446,0.10319965473686117,0.004310898067170932,0.16586045510907238,0.059305935531877865,0.1104253383094037,0.19095699356974605,0.19653806034757687,0.026941014987948098,0.13006700865825382,0.026908572435948352,0.18841190888558113,0.17641642601737484,0.19537511752717013,0.08868040826414299,0.18350383317362529,0.05878913796212651,0.05277425008541403,0.15452174074575373,0.031357789044274796,0.1173746253289218,0.17414300527967588,0.07288326353843165,0.12724201467656618,0.05225395425217712,0.16968053908473332,0.141308116035324,0.011581670013556967,0.17576461453802647,0.19447955509791945,0.11260668556185888,0.1920974333399578,0.05854278398605631,0.0009561933005309609,0.03244481687659744,0.01059367851942663,0.1817659338352463,0.0609657896133236,0.15568412085030647,0.08272694581308287,0.03892618327177266,0.1748583720677893,0.05275593394837084,0.10970313033441266,0.19584675315310918,0.0652854092542524,0.19016695859682375,0.015361399536151855,0.05089533408623503,0.12068983200334654,0.0316060630571819,0.11264941545263114,0.12754380593014192,0.05681633639859007,0.09846015765843658,0.08750597111371566,0.09668662147173915,0.035377583966447725,0.16206889613160125,0.04431314089174361,0.03964060698530095,0.13704063223832694,0.16884196052794032,0.042194923299363696,0.020090646782544398,0.08618515713652108,0.10246355040925792,0.17279943541574663,0.18198310410753304,0.14800939822063489,0.035883724523340856,0.07335513598262855,0.17378919502504836,0.15455812972404767,0.06635902125210302,0.06041552768364991,0.12879560018100503,0.1855401973103895,0.07207406990641006,0.03414074098178093,0.09288092918903486,0.10814731919433762,0.0782703455634707,0.0640132120886591,0.02021324746583746,0.06897157378283972,0.16825698172566358,0.17537541633559448,0.027263156688476144,0.1749561030372796,0.033342576973211725,0.09360910948811063,0.07569612283736885,0.16769374938658488,0.12672497527939283,0.05730075790048592,0.09620766224774857,0.10050368519052998,0.00374856963982495,0.14380750882644194,0.16688081122811954,0.16924812440947765,0.011423007116532614,0.14735888492620255,0.03346666491763024,0.012443450637880327,0.10860015048407196,0.03441755156684776,0.06367533726621302,0.08705793679320412,0.004938453800602672,0.15807979451527607,0.18201568729958673,0.10593537478551168,0.06946593942559294,0.16241729481899034,0.06011997197422656,0.007027825971331537,0.14395103750353688,0.02346784020883752,0.17805129512074483,0.12013226253382753,0.13516524105851643,0.15083633524255863,0.016953738901628546,0.05427032914638352,0.0670766157464668,0.1094025269899257,0.10700755723165455,0.17675220332928054,0.11170105289530513,0.01794130531388598,0.010681218304422436,0.13115264864587944,0.032382388142439565,0.1985370562857329,0.08955326579080275,0.1791813976636053,0.08163841433841248,0.09736358870358663,0.13289074449240568,0.11610914411522369,0.05209668954255489,0.0798642743998078,0.1055455080331928,0.10102092086411406,0.023124433198868168,0.03311402177011087,0.1291592339731482,0.0803177672214393,0.06456871676235716,0.17138400827175465,0.15031405938947345,0.038761813352861156,0.06461135766213393,0.18249058293377518,0.10157420328614025,0.11932569841144854,0.1786164042348676,0.005597441739931464,0.08251412897096717,0.1873674854749001,0.13473161994419383,0.15924381275316174,0.01724169894435055,0.042856441470134767,0.09988213957659675,0.19128865599267703,0.04933287754888896,0.16425805997993004,0.14090645641308938,0.17546433236149683,0.02933420832373228,0.16048650529862415,0.17427214770080762,0.12902051574449006,0.0055943950950713365,0.19842077235878652,0.1736946191594304,0.04659945812530611,0.12053863713820907,0.1167545307224704,0.014800554287666268,0.1875302136789294,0.05715692125136212,0.14087389275285542,0.19128504417538938,0.016967376869628747,0.10322967320527608,0.15972343709704195,0.19110715311363055,0.07784514637049705,0.17315344805275648,0.060058759877540085,0.0974492564053596,0.14071668520493144,0.19177368999836714,0.025569611994666674,0.027072535305058487,0.12421103083338392,0.10780118312179782,0.05016599442993202,0.06564495250402351,0.0023942777314802212,0.04194747138126194,0.11342015491609217,0.08402245428925181,0.11664956244325136,0.06026468720830889,0.10508001408157477,0.17372270236828427,0.09733299556665403,0.06719700098771035,0.1948874263431423,0.15644304025013422,0.07396343255445807,0.08961067549145377,0.11860321450635763,0.14191777668571248,0.09091117630825077,0.14794391219393416,0.10456522663746003,0.1962018395135849,0.14478839942319785,0.06575971497991309,0.09705526655810269,0.05735450427173268,0.13309365458633837,0.19090850368575374,0.03510905123966275,0.03550674651602379,0.08114126481774592,0.002759086707167935,0.047766287172697514,0.17359100291776822,0.05678424835269076,0.11797788466366971,0.02394891487442994,0.1730110882971658,0.13146516017180265,0.0151388696479847,0.16449601270819816,0.05893693860073257,0.05073966313543239,0.028045175513706156,0.11218501595728957,0.12224581409657996,0.03392251931857842,0.08860749737357021,0.16405437771951892,0.1989686243946709,0.18680614610796176,0.13179645235835732,0.16304489573499878,0.13483881187127267,0.002634215645964533,0.050092281260199246,0.03132056392869416,0.14374033980649623,0.022251203928252306,0.0014644173785502536,0.03680376746395608,0.15037058304486173,0.061702893847900425,0.18574037791057318,0.07845861315522518,0.048461304387722004,0.15508498014539593,0.16636563432145995,0.083446200456685,0.019352122483323787,0.004950078324389873,0.1766800446839592,0.05313860869855241,0.13343129385613062,0.010496149509404874,0.1495192602641723,0.002499756502012618,0.17978560397773502,0.11595592627103835,0.03934498215211262,0.1839070218762059,0.19123979678358916,0.045964709865238,0.13624397436041252,0.1151254286725843,0.012084942624269646,0.04890859032565969,0.09909443108338195,0.1132065822409155,0.19407791610001449,0.1269738982399516,0.09156030458162707,0.14792689190940153,0.08855028147671114,0.16647555178321524,0.10022575386150567,0.0662633009095956,0.018085288458493755,0.020455350818962173,0.0670876073745359,0.06643174560701892,0.050462168428106004,0.1979853413273711,0.1067463256559424,0.028295769076336796,0.17712857618271546,0.07005935394221226,0.07774987550898751,0.045552327835187305,0.19297513306100697,0.14544200386356795,0.18532346728420046,0.1768137479240854,0.06665604467322624,0.07908007677477197,0.06116422742072252,0.07437390185466596,0.003038135995283531,0.06885528783262483,0.0513592915486607,0.004428733046616795,0.17742579501662964,0.17491998593153169,0.0820657546013479,0.04299985444923631,0.19044998716912986,0.030153449867662198,0.05022756857077004,0.03724063988503414,0.08688583380502722,0.11799123967600096,0.14878560972824229,0.021371348952789318,0.1917274351195998,0.0450153235474597,0.03186616695550981,0.10435107434594869,0.0051478393524509785,0.13248481272970522,0.04292330965656102,0.06680147878502592,0.12795232569544865,0.013577924942362651,0.16634219417160662,0.16851569125245672,0.14999982285413177,0.08392832667125974,0.09619256418714697,0.12339439640378168,0.07263195156650233,0.1583104620223134,0.06575654825924837,0.19623222250912042,0.18397808483404945,0.19473309764546395,0.0412764498410982,0.16471698780597116,0.00820656714183734,0.12771241520923282,0.1386607545041758,0.02418397024531256,0.08530069227859555,0.0030507378351879223,0.05363644706384161,0.09581037337711913,0.13859630335575807,0.12398183447748018,0.01923038008920184,0.02096383420495549,0.1469696176463804,0.1562678203579537,0.08349393643340464,0.14395813915502004,0.18380300641872274,0.10204521196564587,0.165083657963223,0.005006252669065559,0.030852638852567837,0.03917456248710516,0.1423086371671156,0.0686665786422278,0.012464445753354127,0.11210526374174475,0.15658290363684904,0.0014201942894386923,0.10982130902380285,0.19511841149087272,0.09220115017490085,0.08495834856640068,0.0690566744375185,0.05135950804490999,0.03687047477991965,0.09499263386077912,0.03485728468821954,0.18314497306058175,0.07940620967775401,0.08457481937149258,0.13515375882091393,0.0854459489316922,0.05126383355045086,0.08517099226893476,0.06092182587801216,0.08516422148543655,0.06640283103543841,0.014600630170427432,0.1970502595022139,0.07621231606662825,0.1254945955500972,0.19429437235592287,0.17671561822703707,0.16071020148834975,0.02459367955846288,0.0758087902267921,0.11784122767801182,0.06047676646260745,0.16002142070570133,0.1890565263512051,0.14717338656136994,0.01904973526382552,0.023477780909858262,0.15242056303895601,0.1974227806309774,0.08280405198316286,0.027537867361084923,0.15932653970607094,0.12430180788089391,0.19675702824037283,0.06681769046474738,0.13175034806616767,0.10891427652632851,0.17573355546312844,0.029537715263291367,0.15311161794562383,0.16311622645502585,0.16344737124765407,0.1267424579464604,0.15269584085766594,0.07200464005185836,0.15014104022694208,0.19313798487730693,0.07629237751113985,0.03176631177911911,0.05599647498995278,0.06345883754039083,0.15092731760239322,0.04110133134258934,0.0588560710141977,0.14194505140671235,0.10229027016780456,0.054992434920352246,0.174841699527531,0.0631110426763362,0.06421022238695243,0.14992641739139012,0.08764868298874356,0.08342239635464939,0.1347216631723503,0.06708690420407458,0.16952219099753638,0.07252588941185496,0.16809580597651688,0.09346947093281309,0.1921119277497605,0.14046339782664116,0.04397804056426535,0.02568575289468962,0.01567500012982448,0.08664964521989577,0.03646495639785124,0.08422700355574922,0.1415557845291152,0.04187593854011698,0.11586052500145826,0.0860332843819161,0.11036794531895217,0.10247705370484642,0.1808729103571004,0.14100758029205118,0.19460684873360168,0.15544345190519893,0.16680787948378636,0.13873765853226092,0.048315017452232614,0.04187852637251051,0.05061428670428687,0.1623212231144079,0.015397662173459016,0.18189472143983887,0.17257933907190087,0.19146407443189403,0.02478622359721108,0.11076954266113877,0.015371033014580072,0.0988622956637014,0.15185021344666755,0.029890311014536763,0.08218936009486498,0.09749127634667293,0.1671252256876541,0.07423634684420928,0.09943981063001028,0.16698150823604097,0.05103710346397921,0.06341720346472944,0.19711703978577153,0.07746364268003725,0.14596090312949667,0.029502989534518333,0.07937517296394879,0.06075994229144062,0.03144037846094623,0.0877424237306347,0.0355280111565917,0.16392735798457078,0.1294624819256843,0.022834445812408257,0.035969587945601234,0.014784910629347526,0.17399301335237405,0.1255204729559749,0.16044064976133848,0.021902357744529335,0.04409809654129933,0.09700421891071592,0.035254070745235344,0.17250320703549238,0.04471600423623015,0.17405904619068885,0.12867144346329012,0.10956663579519509,0.04795692201164817,0.0527809373098453,0.12772496303488926,0.15443498063037464,0.05092203320933822,0.19070145769580696,0.10377076115552963,0.053276324325624506,0.02662603131094117,0.01841661349839079,0.04809669215740198,0.17468246009129912,0.17295284383214715,0.05846804817108171,0.17574039592692264,0.1346864225376245,0.07130151759637329,0.15085430873587824,0.030633051889526322,0.0920922079223494,0.06506822171663029,0.1978389526591865,0.0876550179665196,0.0016214343867036352,0.049550932485160626,0.15074912226251205,0.03210231341563659,0.016288189976150093,0.0004890450828860526,0.156041436910324,0.12347773015460178,0.0658482187191753,0.024404236283470084,0.18387280404375803,0.16215291289147205,0.02945990931699867,0.1757043231942023,0.04077327416005332,0.009711015470257368,0.0917006813457027,0.07225354030073361,0.15929991136967103,0.015290163965272274,0.06419979234454641,0.0627672919704461,0.1636579136650776,0.12354574362019127,0.01358469605092254,0.10440413504237128,0.13628597243293356,0.04550224231786762,0.07664942391677868,0.14014570585706196,0.11258582290050062,0.0631177937774516,0.16538411465310504,0.06261385448628576,0.034062566803450746,0.046325805039315604,0.1337242246020814,0.08956539766603498,0.16450464643964646,0.09347148287790015,0.030975019084222802,0.13907789303759768,0.18219246491798113,0.18176508901490737,0.023311098925839824,0.11781666300822424,0.028035433636337138,0.10386442499437565,0.14585500779350233,0.026595278717950466,0.17292935217875174,0.020581798380950467,0.023896173384867804,0.026674677158425822,0.12111063462413951,0.16376751148208527,0.0715954894681087,0.11949825249654525,0.15160740357538352,0.16647808924183655,0.059117097867961425,0.04714293270670598,0.1414327171510091,0.17315499077914556,0.18297234706864965,0.03979913635998753,0.18494481381350833,0.08117101815672467,0.1975361433318883,0.17957116488615976,0.14952572995899313,0.07761611621405069,0.01645267562106656,0.15586347100867767,0.051664174074584325,0.008614212012024548,0.07113892643941178,0.15151261452632414,0.18417722356825852,0.14553001466013238,0.14561360763601702,0.08263008918025037,0.0063611327451400974,0.1622822166781751,0.17083222633434705,0.07115572823827612,0.162884585084527,0.061691782465904545,0.014347349725210946,0.0331024461220169,0.17019836590696374,0.1778144087994501,0.12227436129342154,0.11784512158653776,0.05298786208357096,0.13837745324349085,0.04786912375937185,0.1588548374948654,0.14176270267824953,0.011927058488856801,0.07679117490593233,0.01590167963867142,0.17195387577814045,0.029733388558008,0.16670271490288213,0.159488260974786,0.13762198140261686,0.04818234020318899,0.10592385308860944,0.02945745970810272,0.11042296601520407,0.16098902702337736,0.1748442283165631,0.18486665964700577,0.10787868674036138,0.14576297479247954,0.1553841030310625,0.03862271026247788,0.030352377295817815,0.15285640085360358,0.11187702678508678,0.10656471219889548,0.1353466533857804,0.054652485202348715,0.07987317637764409,0.18833088854592195,0.0030590461064472054,0.17898320308451973,0.07773825228481078,0.19323245614615392,0.06957319828645528,0.17378632225625582,0.01810525106353289,0.05215614057550791,0.1763309392081247,0.19369799250152583,0.0681576313465461,0.05981127249911209,0.00960165504126951,0.18664354815241746,0.12762996778960198,0.18865105031443022,0.0035466263208210336,0.016972498673925564,0.030358078206547703,0.07378133947008468,0.05593762479438072,0.07330021608701238,0.04994453763532958,0.0853706393487968,0.016841157280219666,0.18627531388730134,0.09700370224942967,0.07316103904942498,0.16676996672394118,0.16722495163063555,0.04787706124814206,0.13338288922763408,0.13987568412914256,0.10623464128890313,0.10361953006002467,0.010527157493660066,0.1126326485191414,0.13988690967803233,0.1757302276046002,0.01382534384259082,0.04428754739940608,0.15192474735872055,0.12000053905819415,0.12218354353556077,0.05768771323802886,0.07320720198382134,0.17943250941908226,0.029418702922130804,0.05460175456094496,0.07448610839576597,0.19921302515014483,0.027924835473846568,0.06905774295322674,0.10051938486688733,0.13478613390479094,0.1798692026326783,0.1670254346833173,0.006642570027287232,0.06914080424826033,0.19067858363059692,0.13141627967777367,0.1540374099477715,0.18027049630939712,0.056938651909559074,0.18936217423915044,0.11004353893735255,0.1731179804254095,0.01673793495221476,0.100994383725245,0.00467132373246808,0.1707199566113979,0.11580094028073962,0.18883278265691425,0.16019597240598107,0.041813620455512096,0.08277354400283894,0.007645920100942005,0.026985059835816384,0.189746029728744,0.03981370567928542,0.16615694445046067,0.11846769247900157,0.10293012367164636]}
},{}],29:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,3.0,1.0,0.0,0.0,3.0,0.0,5.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,3.0,0.0,2.0,2.0,0.0,0.0,2.0,1.0,1.0,2.0,1.0,2.0,0.0,0.0,0.0,1.0,6.0,0.0,2.0,0.0,1.0,7.0,5.0,0.0,11.0,5.0,0.0,3.0,1.0,0.0,1.0,2.0,0.0,0.0,4.0,2.0,2.0,1.0,0.0,2.0,1.0,0.0,0.0,3.0,0.0,1.0,1.0,3.0,2.0,4.0,3.0,5.0,0.0,1.0,0.0,1.0,3.0,4.0,1.0,0.0,0.0,2.0,0.0,4.0,2.0,5.0,0.0,5.0,2.0,1.0,6.0,0.0,1.0,2.0,2.0,2.0,0.0,1.0,1.0,0.0,1.0,3.0,0.0,1.0,1.0,1.0,0.0,4.0,2.0,3.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,0.0,3.0,0.0,2.0,0.0,1.0,4.0,4.0,2.0,1.0,0.0,3.0,0.0,1.0,0.0,2.0,1.0,2.0,1.0,0.0,0.0,0.0,4.0,2.0,0.0,0.0,3.0,0.0,1.0,2.0,0.0,0.0,3.0,4.0,1.0,0.0,4.0,5.0,3.0,0.0,5.0,0.0,2.0,0.0,0.0,1.0,2.0,0.0,0.0,3.0,1.0,1.0,0.0,1.0,0.0,4.0,5.0,1.0,0.0,0.0,0.0,6.0,0.0,0.0,0.0,3.0,1.0,0.0,8.0,6.0,4.0,0.0,3.0,0.0,1.0,0.0,5.0,1.0,1.0,3.0,2.0,0.0,0.0,2.0,0.0,3.0,2.0,0.0,7.0,4.0,2.0,2.0,0.0,1.0,0.0,2.0,8.0,0.0,0.0,0.0,4.0,1.0,5.0,3.0,2.0,1.0,0.0,0.0,9.0,0.0,0.0,1.0,2.0,4.0,1.0,0.0,0.0,0.0,0.0,0.0,6.0,0.0,1.0,0.0,1.0,0.0,3.0,3.0,2.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,2.0,0.0,1.0,3.0,0.0,0.0,13.0,1.0,1.0,0.0,1.0,0.0,1.0,3.0,1.0,0.0,1.0,5.0,0.0,1.0,1.0,1.0,0.0,2.0,3.0,1.0,5.0,0.0,4.0,2.0,0.0,2.0,0.0,3.0,2.0,0.0,3.0,1.0,3.0,2.0,0.0,1.0,2.0,6.0,2.0,1.0,0.0,0.0,0.0,0.0,1.0,2.0,0.0,0.0,2.0,2.0,2.0,8.0,1.0,1.0,0.0,4.0,6.0,0.0,0.0,0.0,8.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0,0.0,0.0,3.0,5.0,0.0,1.0,1.0,3.0,3.0,2.0,0.0,2.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,3.0,5.0,2.0,1.0,0.0,1.0,1.0,2.0,0.0,0.0,3.0,2.0,2.0,5.0,1.0,2.0,0.0,4.0,1.0,0.0,0.0,0.0,0.0,0.0,4.0,0.0,1.0,0.0,4.0,1.0,4.0,2.0,1.0,2.0,0.0,7.0,5.0,2.0,0.0,0.0,4.0,0.0,0.0,3.0,0.0,1.0,0.0,1.0,4.0,0.0,0.0,1.0,0.0,0.0,1.0,5.0,4.0,1.0,3.0,0.0,0.0,4.0,5.0,3.0,4.0,2.0,2.0,0.0,3.0,0.0,1.0,0.0,0.0,0.0,4.0,0.0,0.0,2.0,5.0,0.0,4.0,1.0,1.0,0.0,0.0,1.0,8.0,2.0,9.0,0.0,0.0,1.0,0.0,1.0,1.0,11.0,1.0,0.0,0.0,1.0,1.0,3.0,0.0,0.0,1.0,1.0,0.0,1.0,0.0,0.0,6.0,4.0,0.0,0.0,3.0,0.0,1.0,1.0,0.0,2.0,0.0,0.0,0.0,0.0,8.0,1.0,0.0,7.0,0.0,2.0,1.0,0.0,1.0,5.0,2.0,0.0,0.0,3.0,2.0,3.0,1.0,1.0,3.0,0.0,0.0,2.0,0.0,1.0,0.0,0.0,0.0,2.0,1.0,1.0,3.0,0.0,5.0,0.0,4.0,2.0,6.0,5.0,0.0,0.0,0.0,2.0,2.0,0.0,10.0,0.0,4.0,0.0,1.0,2.0,4.0,0.0,1.0,2.0,1.0,0.0,1.0,3.0,2.0,4.0,3.0,0.0,3.0,2.0,4.0,0.0,1.0,0.0,3.0,1.0,4.0,1.0,0.0,2.0,0.0,0.0,1.0,0.0,2.0,2.0,5.0,1.0,0.0,2.0,0.0,1.0,0.0,0.0,2.0,2.0,0.0,0.0,3.0,2.0,7.0,4.0,0.0,5.0,1.0,3.0,6.0,2.0,2.0,1.0,0.0,3.0,3.0,0.0,0.0,0.0,3.0,0.0,1.0,0.0,1.0,2.0,0.0,4.0,1.0,0.0,2.0,0.0,4.0,0.0,0.0,3.0,1.0,0.0,4.0,0.0,3.0,0.0,2.0,5.0,0.0,0.0,1.0,3.0,2.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,1.0,0.0,4.0,1.0,3.0,0.0,2.0,0.0,0.0,0.0,0.0,1.0,3.0,0.0,1.0,1.0,4.0,0.0,3.0,3.0,1.0,2.0,1.0,12.0,1.0,0.0,1.0,0.0,0.0,0.0,4.0,0.0,0.0,0.0,1.0,0.0,1.0,3.0,0.0,0.0,1.0,2.0,0.0,0.0,2.0,1.0,2.0,1.0,0.0,0.0,8.0,0.0,4.0,6.0,3.0,1.0,0.0,2.0,2.0,0.0,5.0,1.0,0.0,4.0,0.0,4.0,1.0,2.0,6.0,0.0,3.0,2.0,1.0,5.0,4.0,0.0,1.0,1.0,0.0,0.0,7.0,9.0,1.0,0.0,2.0,1.0,0.0,0.0,0.0,1.0,0.0,0.0,2.0,0.0,1.0,0.0,0.0,2.0,0.0,2.0,3.0,0.0,2.0,3.0,0.0,0.0,2.0,4.0,0.0,1.0,4.0,0.0,8.0,0.0,0.0,3.0,0.0,4.0,2.0,0.0,2.0,1.0,0.0,0.0,2.0,0.0,0.0,0.0,1.0,5.0,2.0,1.0,5.0,0.0,5.0,4.0,0.0,1.0,1.0,2.0,1.0,2.0,0.0,1.0,4.0,0.0,0.0,0.0,0.0,5.0,5.0,1.0,0.0,0.0,0.0,0.0,1.0,1.0,0.0,1.0,5.0,4.0,1.0,3.0,0.0,0.0,0.0,0.0,0.0,5.0,2.0,4.0,0.0,4.0,0.0,0.0,6.0,1.0,1.0,1.0,1.0,3.0,0.0,0.0,1.0,0.0,1.0,2.0,0.0,0.0,2.0,6.0,0.0,2.0,6.0,3.0,1.0,1.0,1.0,2.0,5.0,1.0,4.0,1.0,1.0,4.0,7.0,4.0,1.0,0.0,3.0,1.0,7.0,0.0,0.0,1.0,0.0,2.0,0.0,1.0,2.0,6.0,1.0,5.0,1.0,0.0,2.0,2.0,0.0,0.0,3.0,1.0,0.0,5.0,0.0,3.0,0.0,1.0,0.0,5.0,0.0,5.0,1.0,1.0,3.0,0.0,0.0,0.0,0.0,6.0,0.0,1.0,2.0,0.0,0.0,0.0,3.0,5.0,1.0,0.0,0.0,2.0,0.0,0.0,2.0,2.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,4.0,0.0,0.0,0.0,2.0,1.0,0.0,0.0,2.0,3.0,2.0,5.0,0.0,0.0,0.0,11.0,1.0,1.0,0.0,0.0,3.0,1.0,0.0,0.0,0.0,1.0,3.0,1.0,4.0,0.0,0.0,0.0,0.0,1.0,2.0,0.0,0.0,2.0,1.0,1.0,0.0,0.0,2.0,2.0,0.0,2.0,0.0,0.0,1.0,0.0,3.0,2.0,1.0,2.0,4.0,2.0,3.0,0.0,3.0,0.0,2.0,0.0,1.0,0.0,7.0,0.0,6.0,0.0,0.0,1.0,3.0,0.0,0.0,8.0,2.0,1.0,2.0,4.0,2.0,1.0,1.0,2.0,2.0,2.0,3.0,2.0,0.0,0.0,0.0,0.0,0.0,5.0,2.0,3.0,1.0,2.0,5.0,6.0,1.0,3.0,3.0,0.0,0.0,0.0,4.0,8.0,6.0,0.0,0.0],"k":[0.5233269314718676,0.2864638636527015,0.8528028301204702,0.7435521441215964,0.012377861603361628,0.08082284290885289,0.3397825696602994,0.13232182837123618,0.9686414129427439,0.5243928756552301,0.3048391574664,0.1861787261798722,0.32745273142857245,0.05288558431029422,0.10396028294435533,0.32026097151504973,0.5492789274709933,0.8287833796156443,0.24649771876150095,0.4541163020343806,0.59212903789748,0.1269934395605563,0.2136412374314638,0.530690605174394,0.7880356493092711,0.7227129594278305,0.8781823118969254,0.7249910793647969,0.847685466533769,0.5774482241689183,0.3718171757635975,0.15496227058790346,0.9272872411618867,0.8382212716865118,0.06846135423167143,0.1750128318483477,0.43292303134762533,0.30100441049790727,0.7007366142698579,0.7932570577568245,0.5006011412065186,0.9949530759360412,0.41481904218277377,0.23931385558529117,0.81428698541905,0.2264586459906177,0.35071267820003005,0.8858486513614345,0.5271184591698841,0.5306401328608825,0.07659227081678166,0.8670480837346379,0.7837674703352371,0.3010049149915477,0.12776432151749506,0.45835028215590357,0.8189147046050964,0.490906714335704,0.677693520129292,0.21116969219561632,0.9965527501897229,0.3640081734775784,0.11885046350969075,0.6836130440277697,0.864139684760491,0.27020710348933874,0.5012326989702516,0.6664887066710874,0.8132785884065983,0.5440477442146241,0.7629857035047063,0.05322326970465574,0.41556205457623374,0.49502573863295307,0.6035408098641528,0.23266511924716782,0.17968091178542678,0.251173736430522,0.87013481195229,0.6311293599061469,0.9217099663962454,0.4859190686012962,0.6241805759308074,0.08555338327143436,0.5576328640023931,0.7774851467222816,0.40926140040167813,0.8645513388836774,0.06293673261653732,0.9464913365385319,0.5438485526162471,0.8208070097982207,0.7256181452157136,0.18872169347927836,0.422914238820437,0.6067584181440251,0.5419474331933072,0.6321761892820181,0.9042817744487488,0.4174101634940792,0.12979225389395888,0.38474128324781964,0.2226618616182352,0.07079655984613553,0.5748924327574105,0.3715951706940994,0.5485315151126391,0.04911818329369266,0.24650501045579465,0.15580559141540085,0.451847388794423,0.3167699401973125,0.8576058271074494,0.25273012746028556,0.06674748832443367,0.7658250640327984,0.20595495730386437,0.0958431235745214,0.07789920093669767,0.1260647446622134,0.4588847537251619,0.6941376820165082,0.7806590228919785,0.585106386880931,0.4434268155782184,0.6871954150586033,0.08817282888714817,0.8938461339737858,0.09379873891427315,0.6929917843560021,0.25355694423027764,0.9011569090914835,0.42585296812189677,0.6062660393062678,0.041655068128780615,0.48777159738838005,0.7207076205818006,0.7791085615029008,0.46511552359030905,0.5443843952390275,0.5754027445388485,0.6785280447928552,0.26764725793141886,0.8831119025770016,0.04854307569334515,0.33931949366920144,0.8514759872472011,0.8676184163890084,0.939642235787933,0.15696390123210913,0.972133795459269,0.614039664305807,0.24221454308564172,0.558359700888879,0.6902555060243027,0.05115886499240885,0.8776031327122786,0.08219891962116055,0.004809667824401842,0.6160726247576898,0.6776638677166957,0.40213450795083117,0.7642932239042071,0.24520378738227766,0.7840826999659436,0.596825717871126,0.13908912851298028,0.4403159921991002,0.2210695584074036,0.9048065922310544,0.9406187009573896,0.5460061015390849,0.03242248232497391,0.15925611230593306,0.26751267051501504,0.7401514436835996,0.27273063223642846,0.5017773823680176,0.05979665762057551,0.4813215236745152,0.31921183059245717,0.5491139045776927,0.9960806792667822,0.6338969369486065,0.6329228780314935,0.1775615869065954,0.8704705555351566,0.15185379172797542,0.4415820665204975,0.3854249237886527,0.6323577346489655,0.8035276186754983,0.5396029496523935,0.8680877413605734,0.6213597855173041,0.6197029615966054,0.03477949396060387,0.755859755561004,0.6506880217024003,0.6665636575360452,0.26780524051140353,0.09701921412829972,0.9817089659497742,0.7314514960506553,0.32712244030398585,0.7546098608043481,0.6058605727182065,0.905230255387611,0.09150498302918497,0.37548733858892525,0.983486805980895,0.7326090507998331,0.28042501474144976,0.15127401124619033,0.7451774074042834,0.6386531735888259,0.7748605268756756,0.7685706904724838,0.42911630931823086,0.6058390957892279,0.37364996007053275,0.6911058230911693,0.9402120853357834,0.061636734994417575,0.2039106097396839,0.563917233519011,0.500269413695605,0.6846872806719251,0.1856864140032135,0.056808259123599436,0.12372030695772152,0.0761463404446896,0.6208960333452556,0.24983622876161315,0.6744074247590062,0.21866848125907956,0.03271427444834618,0.489542032340873,0.11383236821474707,0.43808050507316443,0.9889343800695372,0.7590064947996789,0.5402669510968483,0.2689669389369742,0.34773568096194074,0.41013461162182785,0.3038393545677929,0.024363885042879563,0.4243161991398037,0.5921446056686124,0.9509262658447721,0.19531518777538737,0.8934395195840483,0.9199415091179195,0.15318887539045223,0.5384402574288201,0.9759110085610527,0.3617559160954458,0.8572713106070016,0.16392983584317156,0.03665281943436338,0.08350212954356917,0.7907242673969435,0.8306039485647214,0.6720827771203981,0.4724300697692714,0.35428334997262523,0.7398164018756175,0.6079570031033739,0.025402760733697294,0.7388083691873872,0.7472759479424116,0.3015704829234078,0.11309997872870348,0.594306479948624,0.8914616183270074,0.8141572336448917,0.38827070525475227,0.5844195947680528,0.9540502527355199,0.19902073949532695,0.4011608448000359,0.27552466789304364,0.9364527685555766,0.15949103487767013,0.2595681682087252,0.5442307094921315,0.09681157890186509,0.784300837143431,0.31776824764645717,0.6286746718458842,0.6663960881487436,0.46972528851982176,0.7974406726140313,0.342336159316454,0.27790380319408237,0.0026612222663076057,0.04441766811146364,0.16436170878857093,0.17815467273350394,0.8206925170594863,0.5301106713986907,0.2048375284425472,0.1443738722996979,0.7946502285870423,0.8133790437985813,0.4857909282017283,0.9939315253778997,0.6556045122731284,0.4228538390558254,0.14104929785278086,0.5365280704916964,0.9689797309380985,0.4737097434375632,0.1720259941665061,0.6399226287717663,0.9821632990422029,0.3512953633847664,0.5164849421306623,0.5112086099545456,0.7041932168493616,0.7558676317544677,0.12376494825868223,0.7753803902736167,0.05330584024883489,0.16585561914827252,0.6996523403301476,0.4041687685390898,0.18577209766331815,0.542608043757429,0.555451707683903,0.29014371113744764,0.4623999155495977,0.9063441816483537,0.1420456037604243,0.7937545675597224,0.31051206091623595,0.44820646231518824,0.2183363476665532,0.1610887846017024,0.41034924924647953,0.2947876067544606,0.49802819942087106,0.5869351489973031,0.2727433303879214,0.0024224876688263564,0.41113411958694157,0.8909360235204031,0.19542150354636445,0.9702745771264885,0.036028156362612807,0.5934779226441806,0.35665793832577086,0.9494054366936437,0.5193373697741419,0.4035568269175973,0.5536908982286353,0.2896271135427002,0.6495685428926696,0.9862103617301772,0.7069012296628685,0.9812137066463862,0.3845392457468533,0.48493844348539294,0.1963981100741079,0.5125538022034402,0.188885517186258,0.0023138633609895987,0.7234219178786436,0.5220753664236657,0.747605645843402,0.11713794020136747,0.2830663404911651,0.00395575487448574,0.4347587324271782,0.3297973362735196,0.5601816915820426,0.7901112836868269,0.7104291691904359,0.5010996334726225,0.07809896481749212,0.9410771088393879,0.9940859135448197,0.22646337957346008,0.32373478667623856,0.47054745356397,0.5569097858729988,0.4007865384848899,0.4271714673633724,0.43246782240078874,0.1327770388435905,0.41973453660192006,0.7896283115859275,0.7043208523283666,0.6351824305044249,0.17249144768811542,0.7715846986573318,0.5247023542776463,0.6919297823029726,0.3965642332613437,0.21380093350428764,0.9776512807205404,0.5805872175970643,0.16672316262409725,0.6784168169117488,0.470701107052383,0.36927650452766025,0.9877034233089952,0.8655151076840877,0.7405658181983945,0.5503896663768382,0.5397870668046809,0.8492500988379408,0.27060996151270644,0.5990941154020537,0.09628046994010875,0.4053122904333537,0.47859097302998665,0.1558879320014661,0.18068196399329617,0.4453807709536395,0.8205081140984212,0.4192259891780117,0.43583523929982126,0.4674323161338514,0.32912801531770786,0.9944844406605193,0.5615582454379999,0.8588883332348274,0.8898551825855876,0.4803852409383882,0.9814970755554862,0.898325809258,0.701929729482528,0.8575358719752928,0.04852346358352655,0.30123752314261854,0.7202177842439323,0.18886763346293,0.9841901908326833,0.6805187193677349,0.9972766721618671,0.3785946619747611,0.027135739927735214,0.13623424570261844,0.330009892847859,0.5057022858887443,0.589473893651794,0.09824721621997656,0.021593816044870984,0.551349402323632,0.8207186214048656,0.5405966661696375,0.4695984422957067,0.3410981825533177,0.7185687120951276,0.8668166673489921,0.248873134435188,0.2052342778508991,0.4926121326320707,0.9582953812628148,0.08366445445512927,0.26677784874644606,0.27854427363219414,0.3937751440843944,0.6423819886268427,0.10259534909077117,0.3948106614852327,0.1657886821034722,0.4345728998760572,0.9478974841039651,0.6968435842192371,0.4056517940130857,0.9609006791019625,0.42951727685783414,0.41923333711053967,0.6890357321184482,0.5704932519333217,0.15892331904151358,0.8537202280582792,0.7631936982381986,0.620421649302928,0.093378439475027,0.2792594608753598,0.9311242385397049,0.5795753360659817,0.8316171192470452,0.5297303047671791,0.7740333265903325,0.7497384208008406,0.04124149029252533,0.98797881689157,0.18388235593691493,0.4621931054731747,0.6089196565678403,0.20811860589409914,0.1612184173772262,0.4451498549760484,0.2590426691861525,0.7736683390400576,0.9940954279381138,0.5315309979364886,0.8971364799141492,0.307844470447316,0.7379050437953734,0.8868499527226592,0.5753151826381684,0.8410501923966904,0.3754322581011913,0.7716382075130219,0.03097400972679787,0.09763184044400242,0.253333056887475,0.016139668728638368,0.9938989073763447,0.294371503160602,0.8294208792669349,0.15840049350640784,0.4059353397265304,0.3491589926392962,0.7881359244834216,0.14800113367659784,0.29704956741398103,0.8584567894638215,0.8277674870582352,0.3764810587522347,0.612196961374867,0.5726961317557846,0.34160434999944034,0.6869979050394204,0.3044511575153739,0.5876535149519977,0.5881105726691622,0.5265801869637714,0.9166764614999248,0.23239487613919918,0.7960115500647968,0.14860940217783236,0.37822385964467364,0.6667551451988225,0.516040114193439,0.8395315243772661,0.09315978592325402,0.6265992954301056,0.08512596822798568,0.824641612542619,0.8092028663852175,0.5192853950072145,0.3361568303766129,0.8106756786853038,0.6606409734784102,0.8957744288573748,0.7625357882644868,0.6307695907318303,0.12150110050485452,0.6519361653941376,0.23944919488695726,0.13424213057086787,0.9482684762026423,0.894282295548634,0.20500008717836526,0.5609126958336061,0.7365649690170952,0.8064942196297773,0.8330336652360903,0.8785290911584189,0.06977053971794245,0.9104727890994093,0.5738899820023688,0.8876310177903295,0.8763496714634322,0.8540917589025538,0.5140189528366783,0.3905763809259877,0.7383927377520607,0.7926178641156811,0.7529221924518876,0.4121409207557385,0.004517132440728044,0.1796010899646432,0.9714710808663005,0.12321921889176068,0.5167100018830535,0.04291580945689755,0.5047930517254711,0.5400444555846537,0.2149623104807159,0.9316123075444804,0.41970349456627587,0.13455602018529111,0.34909069190345154,0.22243000906251642,0.8725349441670833,0.6732959831608949,0.8189129669353796,0.6015597281264335,0.2126667126978543,0.11410582709220263,0.31720064429551664,0.32389232270422386,0.3892085164050245,0.10458757794004558,0.2965286889754364,0.7835697149874934,0.07169015937159506,0.3302619850949673,0.2057409612330412,0.8361307122534216,0.8128844083660074,0.6536937936385678,0.030991307761291553,0.5570078727616985,0.2045275313470334,0.5800200434677796,0.09422774716348492,0.769618103818599,0.7490162902170918,0.7758213244839345,0.4058288139265156,0.473840623550976,0.5922828927640866,0.7342893207289465,0.8726593139287842,0.6136320393081891,0.4954676330471266,0.19497405529221123,0.14529380708821948,0.43340341992339715,0.2610783475466578,0.6694226413513709,0.5905713521606519,0.0968530003745145,0.33749242821016745,0.9795199126891407,0.6336902776503093,0.6362494343455387,0.35798068903523594,0.9781504617250782,0.5180397318909011,0.4402451699483667,0.5420042849854239,0.9798245145506213,0.3390835397078922,0.07504589189039512,0.7000396086840319,0.04614773791441684,0.1701162603850559,0.24763732396353166,0.24802656571432036,0.3316936710574159,0.11499487395058039,0.5200815257773879,0.6892357714055826,0.4292174285683583,0.2589228012502347,0.7200228837629785,0.02961752905917603,0.6981881726243295,0.6040057509812313,0.756778803094577,0.008089916986496082,0.537067541981471,0.20854081149696357,0.827445337142336,0.6432104252468127,0.8077096014204956,0.38760026929303204,0.3235982409327496,0.8373250400188004,0.023672828558902514,0.920992571938289,0.6972331023074112,0.6976721221361035,0.3336809609012481,0.6573197000137578,0.38238639950976494,0.593205634641047,0.23655057037536253,0.8183234430600839,0.7395365440741339,0.29786625993349114,0.8971201540059524,0.04138762865077128,0.9744581906080445,0.20191224495275395,0.43294567098902226,0.8607291243209054,0.6026418306464636,0.7304324071852439,0.3417953359333683,0.2706729969742079,0.4980414659036678,0.5934151973479211,0.2935886011120601,0.35183178971644935,0.8599170454016061,0.5112871433281607,0.13092337132396192,0.7540178531371691,0.9442544668890085,0.14469559853171976,0.6163495469198388,0.27589918536631686,0.058287929880135314,0.23178523281118224,0.05039311976792438,0.28659352920909553,0.3774531907790277,0.21216474634576477,0.024267909733745263,0.9761439940447432,0.30955835932573805,0.10256306356113964,0.03636799858659212,0.345900094928528,0.604357001747603,0.24169417731635123,0.8886392458484644,0.895872134240228,0.031918426290930446,0.9130107919660664,0.3233494652755635,0.2120834065176751,0.2384633516262964,0.7313990856974768,0.6002916803386884,0.8177257505625959,0.827915466502656,0.7282692459460749,0.16548935484285,0.9673181375433784,0.30325128187650763,0.23930108894925128,0.7111438435433213,0.24152968486548754,0.9818189433176419,0.2890685072056842,0.6569160035222923,0.5740292367298303,0.37126946276923034,0.21159820614622094,0.3677468342522452,0.10981823335387997,0.13037243072166183,0.05304819365949087,0.0062523155051763535,0.10432795623828861,0.8448112266366459,0.23474680079901855,0.5894956352619665,0.4750938022111415,0.23882900059140177,0.9935572433850908,0.9550288734845469,0.6973166809387692,0.6424520337954034,0.4096320440098049,0.6526265291587277,0.05399793979725098,0.5105073081317102,0.26586102542379897,0.8561797184599405,0.5281942132687045,0.6471703132953637,0.38220076158919736,0.400563515933112,0.23607886239638232,0.9725765992580349,0.870045800619653,0.13364205227691084,0.44495380903986526,0.6740487678533267,0.7187863602205926,0.03764920980477493,0.5919201781715786,0.6952608879736737,0.46946051653058407,0.7879648511508484,0.3465016289516305,0.923220896274545,0.6593000841378078,0.20431222596728116,0.5317265008622705,0.0645169039006952,0.02197914596395556,0.5766733258007015,0.8979809046871896,0.9221379906742926,0.19412741903931297,0.9726239570455453,0.5066544017710548,0.7235523055961337,0.9066557423528423,0.0043460507476758,0.6358760759977513,0.4354751881304506,0.6717878120040375,0.5419104744708605,0.5555307477342126,0.5448777919764685,0.219935510669228,0.36420360394073015,0.6265048432218223,0.5995458900577593,0.7091111442815803,0.9192613080037688,0.09004539267350631,0.597305560537279,0.8098004076237642,0.7064973204575662,0.495650982099624,0.5044743498513236,0.7605405935488279,0.9760274921625458,0.5031577078745211,0.5571955281393906,0.8282726771179107,0.63142396261691,0.9679337827441863,0.6755062576872293,0.7832809486873236,0.8685763912447269,0.10962772162077017,0.9712735261687488,0.8600340530191477,0.5828619546599014,0.7686552858113394,0.40483939908055633,0.7751187106004434,0.7493097212643882,0.9148562114133818,0.5471091568360122,0.5211605400170107,0.3941970958791563,0.18679626548051487,0.896141097203563,0.1053834407780061,0.06351878275285405,0.5510538839134427,0.9457311979972851,0.2643089265165377,0.9995287991448263,0.6474710235996803,0.03683601660650604,0.6065283943400652,0.549490937100114,0.2438613477171332,0.09405572471354517,0.530270886706866,0.836299336450063,0.4662041700907036,0.8478910603856811,0.2310781813279239,0.4211754992614929,0.191788845201595,0.33381566711007293,0.359726063517545,0.7522156337730272,0.05488897896628475,0.3555717690507434,0.23551150994855918,0.2693171303064592,0.6362600438600754,0.1529622526705643,0.6460831178477506,0.07867297767290005,0.35003781588358884,0.9917111432415604,0.08316693340199488,0.5240504178263112,0.08600514328839726,0.4578809341404426,0.43318811108031974,0.3238631100645588,0.952432808880493,0.9360536026987087,0.1830410021875537,0.3641324587502661,0.24104545014470946,0.6342943419834848,0.4600367095765061,0.32630167343165084,0.35595745308266835,0.9220657409756146,0.19924977910544994,0.30470973859610395,0.6581123797462223,0.46770790092933745,0.016284625539295217,0.1610578934264575,0.09914586743707754,0.9591238298353071,0.6503816303369683,0.18436310812501633,0.7451293454180867,0.8626183685755258,0.12026023454748258,0.696107183842585,0.24332163424830977,0.7664325755002388,0.4374847506493458,0.4299071921096236,0.7500342901590606,0.6068120166366808,0.030675828243812653,0.3600019043924976,0.9417903016291576,0.1787883599764548,0.7845513703065039,0.22285290245580058,0.35910010208838616,0.7050823706822771,0.674413694964406,0.2742696856120519,0.21491311697349968,0.568880176196815,0.037040888426233876,0.6709080817582547,0.981471937301188,0.8162534027475834,0.4471566210988114,0.11723644868602423,0.6363721709485646,0.07148657949693504,0.38242840802665623,0.6967970189682324,0.4812061104977976,0.37637121980385424,0.6155425688458664,0.29697519104916004,0.46830969747330076,0.16475406265606418,0.11930250147892951,0.9311364978553562,0.44204373601018476,0.4412714804142812,0.21074407099611436,0.4270990810655664,0.45765603901753593,0.8523449099476346,0.26090575979571895,0.6490088830792611,0.7809091319498402,0.4076361133923152,0.5303986234828078,0.7235299299981093,0.32815353430991934,0.5954366229837893,0.06734264309379467,0.7454545942946997,0.29655667943788555,0.45321082975396854,0.019155920605854915,0.9716623066772998,0.30320487125083706,0.9600485801239027,0.7625903151303317,0.7909861714436359,0.1494852200506529,0.10686365514253104,0.7090485021506807,0.9904197636260381,0.1378013475039115,0.16384566630808584,0.8314124046236482,0.3740532781192156,0.5248177094293096,0.15897831135930018,0.7336540400211686,0.13788110432523104,0.39522321601966004,0.8593905360691236,0.679855750478654,0.7877144424689408,0.5536785819304266,0.524643374765714,0.8633368966399826,0.368130005959288,0.6261220377563315,0.3567914183255283,0.10715498554192981,0.17454956101288532,0.8619599493686461,0.6459342320180606,0.643904992079879,0.8180586328248691,0.8408704384072567,0.4580003583805117,0.9294345089071352,0.5591998894634322,0.49848523025777625,0.5174801735980727,0.38378823245585036,0.8510564873787174,0.5455442282238427,0.7140618629632252,0.9887603765496054,0.8640946904151197,0.1748944009394846,0.5259563118536146],"r":[15.0,1.0,17.0,11.0,16.0,5.0,17.0,6.0,15.0,15.0,15.0,4.0,1.0,16.0,18.0,8.0,14.0,8.0,9.0,11.0,20.0,9.0,4.0,15.0,8.0,8.0,20.0,2.0,12.0,2.0,7.0,1.0,1.0,12.0,7.0,20.0,4.0,16.0,18.0,14.0,1.0,19.0,18.0,11.0,7.0,11.0,19.0,1.0,9.0,17.0,18.0,9.0,15.0,15.0,20.0,2.0,8.0,9.0,13.0,8.0,2.0,1.0,8.0,15.0,7.0,11.0,14.0,15.0,17.0,5.0,11.0,1.0,12.0,10.0,16.0,19.0,9.0,12.0,13.0,2.0,17.0,17.0,19.0,19.0,18.0,8.0,7.0,15.0,5.0,2.0,13.0,4.0,7.0,6.0,5.0,6.0,6.0,11.0,6.0,5.0,9.0,9.0,17.0,3.0,15.0,9.0,12.0,12.0,11.0,9.0,1.0,4.0,14.0,10.0,9.0,18.0,14.0,18.0,11.0,14.0,13.0,14.0,5.0,6.0,18.0,9.0,10.0,11.0,16.0,11.0,11.0,18.0,16.0,4.0,8.0,4.0,18.0,16.0,4.0,2.0,16.0,20.0,10.0,15.0,18.0,1.0,12.0,7.0,15.0,13.0,16.0,16.0,20.0,1.0,12.0,5.0,10.0,8.0,6.0,4.0,17.0,14.0,1.0,20.0,12.0,3.0,1.0,18.0,2.0,8.0,11.0,17.0,20.0,10.0,1.0,20.0,1.0,1.0,5.0,11.0,12.0,18.0,10.0,20.0,14.0,4.0,8.0,2.0,7.0,11.0,20.0,2.0,3.0,6.0,20.0,2.0,13.0,9.0,1.0,17.0,16.0,9.0,18.0,11.0,16.0,17.0,1.0,1.0,1.0,17.0,14.0,4.0,1.0,5.0,18.0,9.0,17.0,18.0,20.0,2.0,8.0,7.0,17.0,10.0,3.0,15.0,12.0,14.0,11.0,7.0,14.0,11.0,7.0,3.0,20.0,10.0,16.0,1.0,19.0,1.0,9.0,19.0,12.0,1.0,16.0,14.0,2.0,16.0,9.0,10.0,2.0,6.0,5.0,12.0,7.0,3.0,20.0,18.0,1.0,16.0,19.0,5.0,5.0,13.0,13.0,2.0,6.0,17.0,12.0,15.0,10.0,3.0,12.0,16.0,16.0,16.0,13.0,10.0,18.0,16.0,9.0,13.0,7.0,7.0,20.0,13.0,14.0,11.0,10.0,12.0,10.0,3.0,17.0,19.0,15.0,13.0,6.0,12.0,11.0,18.0,3.0,12.0,3.0,19.0,4.0,3.0,17.0,19.0,4.0,5.0,1.0,18.0,20.0,7.0,14.0,7.0,17.0,6.0,15.0,5.0,17.0,20.0,7.0,2.0,8.0,7.0,14.0,18.0,7.0,6.0,16.0,18.0,13.0,11.0,6.0,10.0,6.0,13.0,10.0,15.0,5.0,10.0,1.0,2.0,13.0,15.0,19.0,12.0,14.0,1.0,2.0,5.0,9.0,5.0,6.0,2.0,16.0,18.0,16.0,5.0,13.0,12.0,13.0,17.0,20.0,3.0,5.0,9.0,1.0,1.0,13.0,4.0,19.0,20.0,17.0,9.0,13.0,9.0,2.0,8.0,13.0,11.0,17.0,12.0,20.0,5.0,14.0,2.0,11.0,13.0,1.0,9.0,12.0,4.0,18.0,10.0,5.0,6.0,12.0,11.0,16.0,9.0,20.0,18.0,9.0,4.0,12.0,5.0,14.0,8.0,19.0,20.0,9.0,8.0,18.0,10.0,13.0,4.0,9.0,1.0,14.0,3.0,2.0,14.0,18.0,5.0,2.0,11.0,16.0,1.0,11.0,5.0,14.0,11.0,18.0,8.0,5.0,19.0,18.0,1.0,4.0,19.0,7.0,3.0,19.0,13.0,7.0,15.0,12.0,1.0,18.0,4.0,1.0,10.0,20.0,12.0,14.0,17.0,4.0,2.0,19.0,4.0,14.0,17.0,5.0,15.0,8.0,5.0,16.0,8.0,15.0,10.0,7.0,15.0,11.0,8.0,10.0,2.0,16.0,18.0,17.0,1.0,1.0,16.0,5.0,17.0,4.0,14.0,12.0,7.0,5.0,5.0,3.0,18.0,1.0,11.0,3.0,17.0,8.0,12.0,4.0,18.0,18.0,1.0,17.0,20.0,20.0,15.0,5.0,11.0,10.0,20.0,16.0,8.0,20.0,9.0,18.0,4.0,6.0,8.0,13.0,17.0,14.0,4.0,9.0,11.0,18.0,9.0,13.0,18.0,14.0,5.0,14.0,7.0,17.0,5.0,12.0,1.0,20.0,16.0,14.0,5.0,17.0,17.0,6.0,17.0,10.0,8.0,17.0,15.0,18.0,1.0,9.0,10.0,20.0,13.0,9.0,2.0,4.0,20.0,9.0,1.0,13.0,6.0,20.0,13.0,6.0,7.0,6.0,5.0,16.0,4.0,13.0,12.0,1.0,11.0,13.0,16.0,8.0,1.0,14.0,20.0,17.0,16.0,20.0,14.0,20.0,8.0,20.0,10.0,10.0,9.0,14.0,7.0,1.0,11.0,19.0,7.0,19.0,7.0,12.0,2.0,20.0,13.0,11.0,9.0,8.0,15.0,8.0,5.0,13.0,12.0,14.0,1.0,10.0,1.0,3.0,6.0,19.0,8.0,16.0,3.0,18.0,3.0,9.0,3.0,7.0,8.0,12.0,2.0,9.0,20.0,15.0,12.0,19.0,9.0,14.0,20.0,6.0,9.0,6.0,19.0,9.0,8.0,7.0,7.0,9.0,8.0,18.0,1.0,5.0,3.0,3.0,1.0,14.0,10.0,13.0,1.0,13.0,16.0,10.0,2.0,11.0,11.0,13.0,2.0,6.0,11.0,17.0,7.0,7.0,20.0,7.0,16.0,7.0,11.0,10.0,16.0,20.0,17.0,15.0,13.0,3.0,15.0,19.0,17.0,17.0,3.0,18.0,17.0,15.0,17.0,19.0,5.0,5.0,2.0,2.0,3.0,20.0,20.0,14.0,1.0,15.0,18.0,1.0,8.0,20.0,20.0,2.0,10.0,6.0,6.0,9.0,1.0,5.0,6.0,18.0,5.0,18.0,1.0,3.0,13.0,19.0,10.0,20.0,13.0,13.0,4.0,11.0,2.0,16.0,9.0,8.0,18.0,1.0,15.0,11.0,1.0,19.0,5.0,7.0,4.0,18.0,11.0,8.0,7.0,12.0,18.0,11.0,12.0,19.0,2.0,5.0,4.0,4.0,15.0,4.0,9.0,17.0,7.0,19.0,4.0,16.0,1.0,14.0,2.0,6.0,13.0,18.0,20.0,6.0,10.0,18.0,4.0,17.0,9.0,3.0,3.0,20.0,6.0,7.0,18.0,17.0,8.0,8.0,15.0,1.0,20.0,17.0,14.0,1.0,13.0,1.0,13.0,17.0,7.0,6.0,15.0,16.0,11.0,8.0,9.0,13.0,3.0,10.0,2.0,2.0,6.0,12.0,18.0,20.0,11.0,17.0,15.0,8.0,12.0,15.0,12.0,19.0,15.0,12.0,19.0,15.0,15.0,14.0,16.0,15.0,2.0,13.0,8.0,13.0,2.0,6.0,19.0,13.0,2.0,1.0,17.0,9.0,19.0,20.0,8.0,6.0,13.0,11.0,8.0,1.0,7.0,15.0,3.0,11.0,14.0,7.0,18.0,15.0,5.0,14.0,18.0,16.0,20.0,11.0,9.0,11.0,9.0,2.0,19.0,17.0,14.0,8.0,14.0,20.0,1.0,14.0,4.0,5.0,16.0,14.0,3.0,9.0,11.0,7.0,7.0,14.0,6.0,1.0,12.0,7.0,20.0,6.0,9.0,5.0,18.0,7.0,8.0,1.0,3.0,13.0,1.0,10.0,12.0,19.0,19.0,16.0,11.0,14.0,2.0,18.0,16.0,12.0,3.0,14.0,10.0,5.0,9.0,3.0,2.0,14.0,8.0,4.0,16.0,1.0,9.0,19.0,16.0,11.0,6.0,2.0,5.0,8.0,11.0,10.0,6.0,16.0,14.0,18.0,2.0,14.0,5.0,19.0,6.0,3.0,8.0,19.0,8.0,16.0,9.0,16.0,12.0,17.0,17.0,7.0,10.0,19.0,20.0,4.0,17.0,4.0,19.0,15.0,20.0,15.0,10.0,6.0,4.0,16.0,20.0,6.0,15.0,11.0,13.0,9.0,6.0,10.0,9.0,20.0,11.0,11.0,3.0,1.0,15.0,8.0,2.0,16.0,6.0,7.0,6.0,16.0,19.0,13.0,10.0,14.0,12.0,13.0,5.0,18.0,17.0,18.0,18.0,6.0,3.0],"p":[0.9967312646096956,0.892363442974864,0.9022907310587542,0.921412431346476,0.9880310885850971,0.8821769379401867,0.8082228742224221,0.7675800161704258,0.8961502659807639,0.9973193265374016,0.9530228084755806,0.7972814062553658,0.8085171633406745,0.851232468371641,0.8294265867248833,0.9389658311352996,0.9681276680033554,0.8470400094367443,0.9382285285961955,0.8096626024917571,0.8963030473151077,0.9942824566856372,0.8956173291057243,0.8811435367136553,0.9147704971161146,0.8898078655861997,0.960100458855828,0.7888587573713961,0.907303922307663,0.9700455005705249,0.8998056316933797,0.8867175839830304,0.8316178203286739,0.7655184621530361,0.8302048607976524,0.8484105517491554,0.9394877698948865,0.8771369886657261,0.77072635015158,0.7953037735897706,0.9421475394482595,0.8325988720763962,0.7527270851425962,0.9895924172977371,0.7674498838347588,0.7923619064755232,0.9582621323838274,0.8725112313982961,0.8218470748007232,0.9683838401176199,0.9323505991747898,0.810364074308717,0.927364053242846,0.8300855369517701,0.8764717906714119,0.9671435776029907,0.8528609264009152,0.8977963899367205,0.9902488740083726,0.9858772942742916,0.8712773905131109,0.9698539943536758,0.7621910228386966,0.9686854702904446,0.7989838039051491,0.7643134697469457,0.7792092590082402,0.8666369439589376,0.8508159096114283,0.9057994892260111,0.9668930652211913,0.7539575944070216,0.8911718156855631,0.7568645717785707,0.8013536923418823,0.9090109901829568,0.8286626129640815,0.9695547127311486,0.917490939774829,0.9586947446888223,0.9081912346019839,0.8707653575127371,0.8180970994277714,0.9198745759440335,0.7820296993921565,0.9000496119315987,0.7911044528149027,0.81960692940591,0.9576387130407802,0.8638854357305747,0.8475782067287237,0.8255669982230651,0.8628805022573653,0.8390245471199482,0.8175914305045472,0.8195467059253143,0.9918131783615523,0.9310867658836006,0.8195375264096245,0.8758487240068147,0.7680505301743221,0.839620707240037,0.8627264342437463,0.9493693586504817,0.7788885925596233,0.767869171855627,0.8021426373770479,0.7759795637830398,0.8404787443176382,0.7775788397927674,0.8478784274867786,0.9127229910334206,0.980650049781258,0.8245598083968909,0.7990576287566211,0.9021941663730257,0.9215380311040674,0.7680438764847839,0.8047998964808605,0.8182200971577719,0.7540221046724991,0.8012480224990596,0.8376343611130808,0.8493134459373173,0.9955865832100906,0.7957257406561171,0.8783145079455901,0.9700715408761476,0.8988889338048189,0.8541867970951217,0.8428664719659147,0.9567510252428062,0.8975675613790324,0.9277120308474942,0.8926306787618212,0.9656325495134652,0.8597964386695328,0.932139375104121,0.9270441509006391,0.8101773378000776,0.8603330886424415,0.9843752572511991,0.803395090543135,0.9577241886045647,0.974090941756868,0.8103926845562089,0.8911901403681524,0.7576697999380606,0.9823460857032393,0.9626058983024206,0.9307663493940845,0.776122538255146,0.8083796809489934,0.9017141493551079,0.7592310260718478,0.9402413147413649,0.9436397317831258,0.9384011516144957,0.9501599112189552,0.8749838142927403,0.9333771490866198,0.9789034856788625,0.7753214115798182,0.7992516776852363,0.9736127913404964,0.8111052679865882,0.8942195552360489,0.9036029935138684,0.7632546176555028,0.8268053583225516,0.843317922555135,0.9589527919883989,0.9719378986242488,0.9926586550046274,0.8109181129571388,0.8138161674584496,0.8684996101519917,0.8775811630650632,0.8836872521075276,0.7682242345168633,0.8870625324577144,0.998558107730546,0.8265059949413819,0.782283388387005,0.7864181748252168,0.9648760638833056,0.8465455501997661,0.9702207761675757,0.8883440333478931,0.9188353488757509,0.8105191623797443,0.7729418650676716,0.8000451336749884,0.7798473096179553,0.9154548729286422,0.9283806269737306,0.8548025387755251,0.8766744158125838,0.7552367712944558,0.8873258352716571,0.8138183490823322,0.84023104900967,0.8610881227727625,0.8008085717949078,0.8169352931307021,0.9163940449948491,0.8435186478446104,0.8315154233774269,0.9870754913060352,0.8731977114658263,0.8190231144335198,0.9314185671618254,0.7609053594567161,0.7766681447114276,0.8469527700457948,0.9065512067121315,0.8363293650865727,0.8897082376811891,0.8808414395334414,0.7678714158289851,0.9548675268871302,0.9942205094812918,0.7742181365846613,0.9181324626743868,0.9019562989157681,0.946475053600306,0.8481071563094962,0.7957167215117531,0.7699329558290643,0.8283670257910655,0.9931990166871021,0.8521182758165587,0.9468806068838824,0.933938549069347,0.7957851275740306,0.8757329480190112,0.7789927855623981,0.7505391996201489,0.8734293985002254,0.7904606760626669,0.9539986747123888,0.8927390008555369,0.8759738429369192,0.7684168310194925,0.9496870901268258,0.9264428768035682,0.8509293682711216,0.9081089380205831,0.9827156614019059,0.9503922683290698,0.8624249504449251,0.9041483693328356,0.9276734986386581,0.8973081300003016,0.9123130985486241,0.8177489570193178,0.7562735246042123,0.9014608738353669,0.7816615537117778,0.9504373941457673,0.8377077051513306,0.7581718440194245,0.9351152855174352,0.8677587772504716,0.9458830179157638,0.8175705528371817,0.8234983156038049,0.8273290658684446,0.9816452563668987,0.7814814206947134,0.9179050964765342,0.9065284366368285,0.9874721000113739,0.7863654169176137,0.8501023169557929,0.9778509573684853,0.8028149813360541,0.9581063494807756,0.8238347869851103,0.9588429463388803,0.8831086811574882,0.8418774657489737,0.9804972800581119,0.8739135466240517,0.832399949819572,0.9993783971887035,0.838409269768951,0.7858126181724491,0.8181071185606792,0.8253646469730888,0.9570946245447763,0.7755028296012936,0.861370559217973,0.8246264351716456,0.8340194431423784,0.9040230457056355,0.757784148009392,0.921417609260099,0.9305238649088284,0.9841980903688894,0.8023674673364278,0.8781804669831292,0.9210836240926852,0.9311378694990897,0.8003690529704635,0.786871427997357,0.8808782430868376,0.8870470461098564,0.8713090689294731,0.8088267418930701,0.9778693287773718,0.8109579633233693,0.8862129798367558,0.96547823995347,0.925949286153297,0.9937849484110954,0.8415276088225152,0.9082776969727803,0.9803831520529256,0.7691611149143631,0.9630859472545599,0.9696864054602741,0.8926941730410822,0.8006204677145041,0.8138686926120384,0.8392727245429602,0.8417337696730385,0.7588504388943371,0.9929881975118332,0.8310562301597688,0.933005339037404,0.8035477929593904,0.7823554326081114,0.9196509394905553,0.9308212648718426,0.9041302538758478,0.9931443084652416,0.9403442496923555,0.8649782364733236,0.8819026419483198,0.9671344421721086,0.94429997211062,0.9073741173996255,0.8047188880385122,0.827187301368812,0.9685405537384172,0.8544191355427662,0.8200943411044262,0.7980385506067031,0.9152546848413494,0.9014594408954175,0.8261053300707444,0.8909399022481933,0.9346549534557709,0.9373536738673742,0.7570845149684701,0.8552186353339605,0.8631544257233443,0.9087158035513903,0.7920807738579385,0.9303180604192507,0.9731416430701874,0.9753778201948755,0.7834670922969136,0.912230194424541,0.9645403995590364,0.784385065619197,0.830443877287163,0.9829889311406006,0.9715684623019629,0.7983144037922838,0.9257047922801124,0.9271843041134528,0.8748829824208235,0.7881250455724836,0.8124165645288306,0.7772880328795632,0.9070542247133739,0.776213090507458,0.78458297480624,0.9146329331690013,0.7764633173193616,0.9356242807016855,0.7833536070464441,0.9882856313018717,0.9875294647509372,0.7636097115408259,0.9171750278033697,0.9746564582807883,0.7992547867675266,0.7589946930225984,0.8692285523329828,0.9809899442164041,0.873097842919,0.8359279357626233,0.8724207006937331,0.9869268752434601,0.8597095049119703,0.99483709493928,0.9311110564017921,0.8894727839667724,0.832440819174832,0.8537321269638233,0.842658225417403,0.7801966073525999,0.9014034102279127,0.9920968849747573,0.8388654690846653,0.8210869852209071,0.7847269694443249,0.8238576180632262,0.9226138322091748,0.9266326082559808,0.8615740515448476,0.8622654610107937,0.9806877853507054,0.9324449152072767,0.9092755707126798,0.9141916828670726,0.8613879630355312,0.7631759606655959,0.9711374315801145,0.8271969832417305,0.8634435631074953,0.7677812003842353,0.9396657576407916,0.766843296893522,0.9099253627917547,0.9828578781425168,0.9428285293595633,0.9442525506755561,0.9882767586762988,0.7613804453688182,0.9072536431563001,0.7558730728819713,0.7516381365579379,0.8783496495432701,0.9714822168478663,0.9976991273640573,0.9100884744809862,0.8554232967195805,0.843798585118014,0.8139825733736253,0.8537517239976478,0.9253479445343158,0.8627892476712089,0.8988303990358367,0.8298132741737114,0.8473129842414233,0.7911158270218692,0.9651053528602651,0.872315206560974,0.889962929692495,0.8956381838017948,0.9734331106917335,0.9773037520725507,0.7898360347731314,0.753268984965481,0.9838910340059807,0.91451562070479,0.944320731411164,0.8990675372420271,0.896657400130942,0.8933096952536039,0.87092744207164,0.9043945972728138,0.7633416485631963,0.9529745829701939,0.9371489791466592,0.9931220699301904,0.778395024487372,0.9256318724651487,0.9710121818497307,0.8381769458092936,0.9817192925020504,0.758133598395196,0.9634049601187886,0.7810082072763747,0.838737058814416,0.8670149340026594,0.9306490076181204,0.8998738886359965,0.822231659524801,0.7856423208563809,0.8917020435073868,0.8663363610446098,0.8512927786420124,0.9366474318326894,0.8772396082548874,0.9938401674400547,0.7972016920797447,0.966485891561758,0.9977721990179063,0.922397603546827,0.8975368251162162,0.9991179755818725,0.9950438510136841,0.8695592142500452,0.7950272376953502,0.9640183025778143,0.8899255121057836,0.9718200952433371,0.8811604415685494,0.8678761985784056,0.8627964409000186,0.9469305507503256,0.7775312025853123,0.8441164670281387,0.9318809603255994,0.983007887998383,0.9951492781914997,0.7990490917322159,0.819634400954294,0.9769672684009633,0.8484577614121365,0.9811491701130298,0.8842461573239957,0.7847378879590243,0.7839676988825652,0.7544588452229324,0.8394495512179911,0.9478473562168339,0.8592365656190633,0.8201712460368443,0.9729773102373825,0.9621985147186916,0.948847800646152,0.7661367538975894,0.8219023588853703,0.8451355548688482,0.7602249336028254,0.952873997394404,0.838130192155859,0.7761969865017837,0.8877806149022986,0.7665055343381431,0.9705734586266065,0.9899299755404294,0.8239993108797283,0.9634972232380233,0.7782090887651496,0.8833017507339067,0.9384692899391657,0.9168632493429213,0.8497148262900351,0.9892389737999709,0.9526121380185809,0.9623565801705605,0.8659309456805145,0.9121959094211285,0.7947815843080305,0.859231795082359,0.9891608510771801,0.8567096286123929,0.997444558461414,0.9377450230471576,0.857976429749931,0.8078949799951551,0.905968350587929,0.9507467770560374,0.9997933166413535,0.9408960641214574,0.8517796653246829,0.8504374654023759,0.8167667032521606,0.8582094923376993,0.9213860757210528,0.7615296420326256,0.8101555825751291,0.8107238657252995,0.818916552762216,0.7776847648387095,0.8575364410139352,0.9037678437690706,0.9152520214828218,0.8712919474570369,0.8629129760419001,0.9875022837490857,0.8708568069750005,0.8125064582413062,0.9551947945270488,0.9928132640821048,0.9510155355045904,0.896612916500562,0.9611639881345433,0.883615423811148,0.9831570984705374,0.8060553998283441,0.9552320084150503,0.8195287027260767,0.7641473709903772,0.9135483211392049,0.8488420213854673,0.9836030308996091,0.8899129693765262,0.7796127577159386,0.8827868678851272,0.9783490889854008,0.7686532033321404,0.9588857833202133,0.7720449792995603,0.8698138852897375,0.8418267856916218,0.7819411590880427,0.8310631391481305,0.9822913506069694,0.8193269698668326,0.9003025773964131,0.8729364980706743,0.8074335451159143,0.9098161885725763,0.953589726503099,0.9359760013726517,0.9332910340463443,0.8262961525339261,0.9603535827691944,0.8077265310885045,0.9631911586336055,0.9289135521619569,0.9398819796868707,0.7962883279983035,0.8956892086096401,0.9210465553377789,0.9075605355845301,0.7985867344950498,0.9813875491363698,0.8289322725905215,0.9557208125981944,0.9444048302982875,0.7673604831217544,0.7822207654632123,0.936797646572938,0.9294407776646303,0.9837175284217816,0.8389625206613429,0.9562132277279053,0.7592596753533976,0.967148844936389,0.7816305650852011,0.7888397846845667,0.8275654548876779,0.7732865839343357,0.8600069757055717,0.9318551723956567,0.911678692169386,0.8503503653115745,0.8330413443584518,0.9804422130235537,0.7501521169935774,0.7691995304781509,0.8917108588347828,0.8671545821935047,0.8155518462009392,0.8430643112459639,0.9014405187854158,0.8447933312369418,0.7894889333419031,0.8593215095047089,0.9383640535939842,0.9128402618151596,0.9885832261605384,0.8607445452898763,0.7570324053811914,0.9488673830707122,0.8645590007682136,0.8562222492598544,0.976291080421426,0.9176425294917104,0.7693365557764019,0.8839216708074152,0.7896967378501802,0.812902678849688,0.7628296734665801,0.9199299917231906,0.9992362905331837,0.7769508459695205,0.8462557778481878,0.9236321296791092,0.8684350857033227,0.9768798354325021,0.9383417334715043,0.8623776791364297,0.7622336267206176,0.9258438601035037,0.9078269469463294,0.8856277091665865,0.8193530572416605,0.8880340060116868,0.8755432503756178,0.8639391301512501,0.912127781722037,0.759220563379605,0.8295986214160542,0.941983460724654,0.7571112376713902,0.9072568788820197,0.7681012512497433,0.8856390416856597,0.7831217815783986,0.7972847275969102,0.797036467732197,0.9145611763197242,0.8070412724889378,0.8426497747291367,0.8389051405815798,0.9296714447037602,0.9798197383818115,0.9272453277137328,0.8930749500468714,0.8763332634669541,0.9446236211880643,0.8383793920077238,0.7513398205130558,0.862842083575463,0.9134099587627005,0.7629647339475494,0.9457495901193715,0.8998862226363653,0.9182287434242284,0.8700407897748601,0.8238071024651934,0.7645469305830113,0.9946402379329424,0.9384477285848333,0.9423817681485462,0.7937081179009774,0.9946946521831721,0.8635003556619385,0.7639270939123,0.9311904255989685,0.8195508858640348,0.9426537481485566,0.9780115189030081,0.8876607964261561,0.9395950609116168,0.9382925065679235,0.7589849852505004,0.9022913932865904,0.8879534482967788,0.7696646660256208,0.9802921854135217,0.8271194213922815,0.7673143936332449,0.9933868427656651,0.9384881429559642,0.8434665938382577,0.7845978191152653,0.8456655026635908,0.7661251286678021,0.9160437656807521,0.7836536853270234,0.7781661399181261,0.8171992847199991,0.7720144963276725,0.9229018755498697,0.9571511478859985,0.750779225266685,0.8669008033132226,0.7984653193584316,0.7564300621190516,0.9603392339303056,0.8628746415056667,0.8001644465659085,0.7762101576197167,0.9983897314156467,0.9467661729972334,0.8739690649887202,0.8722478874190764,0.8725654347418266,0.8833915579904392,0.958589501070517,0.9711695557630973,0.9891592880411622,0.9549944240938332,0.9258869176348568,0.9094010053170828,0.8862948050287701,0.8734064357716418,0.7594364076210544,0.7886191153640711,0.8656669150673347,0.778576523450943,0.9829454461011553,0.9573520227652367,0.9727948847644575,0.9840823856175197,0.9478931743563916,0.8807378885516142,0.8396408369966131,0.9213757176991544,0.8896771606326208,0.8197906348469153,0.9238751452415215,0.8968780154408498,0.7739552021487521,0.7975562610674869,0.9221985637714212,0.9405029636296531,0.9343125493885762,0.8078617858088277,0.8450910872156929,0.8939929346412872,0.9306305834274597,0.8490212530198294,0.9476807352874835,0.7875871700737709,0.9686637841749548,0.934678042968651,0.8996398008466648,0.7908064812699636,0.9906371909270145,0.803426394093832,0.7803391661539791,0.9598364208704209,0.8641332982930368,0.893374715058209,0.9667038599258182,0.8878640306380499,0.9112793456301318,0.9447510053121724,0.8333148443544982,0.9832121670607064,0.8506697876174057,0.909498731012617,0.7726421522476626,0.8151646904265875,0.9819874303207599,0.7782765683170714,0.8740152525761212,0.9131047941640971,0.7769639280988725,0.8932269415577523,0.9300156162456066,0.934329094284783,0.9916853842237842,0.77530017208882,0.9446096961396471,0.8377331435255979,0.8450954734418119,0.8789115712587563,0.9299391297230684,0.9118572035118384,0.8599076488296618,0.7941141548345788,0.8585695522040346,0.7758436806286313,0.9316713678738391,0.8236886647439763,0.8375492192105296,0.8117660302155236,0.9884678201390076,0.8104681475981914,0.9875290002402162,0.8282766932498787,0.9411321253031901,0.7851544692523191,0.9695426903174011,0.834880615961439,0.9606237906009069,0.7758900153274563,0.8584938795918904,0.8219841543715416,0.8153019538387036,0.9606876046622157,0.8964226110054521,0.892207146579784,0.9470342192943371,0.8996635629585833,0.7957860977439635,0.9130619240020397,0.7768277203612088,0.9512632559631653,0.9965046879929967,0.8314086421402782,0.8222510419676923,0.8772979658695115,0.8245381523913209,0.8291719678934882,0.8648110606722211,0.8626514672413127,0.9010113454494197,0.9779413232927425,0.8274299711546078,0.9285865301134864,0.9220274205345971,0.9774318526588222,0.8971533883116192,0.9701174242013897,0.892843572061223,0.8911065467923669,0.8618126611003621,0.933640422107465,0.9935744556101582,0.8882727790197986,0.8687559889795962,0.8250252416707917,0.7632268494249406,0.9259886250836127,0.9076975230332156,0.8865018473151338,0.8614617446574062,0.9023033917320552,0.7962815809856848,0.9717527732218516,0.8937927146181477,0.9203912119613402,0.7527750256502111,0.8734893631468199,0.9548685212998798,0.8454694089894637,0.9934154167066687,0.7976052499804042,0.8248810207962339,0.9239554366970611,0.7535033952563683,0.7998908030190801,0.7576020534736168,0.776856929624028,0.9915911403721094,0.8678079527947951,0.9819701477913514,0.8535610017299884,0.9845429163873924,0.848512878548307,0.8373367319102117,0.8179762803576673,0.879864029439488,0.8991283136354369,0.8467960601176603,0.8469979053377905,0.8730886401039406,0.837614865911124,0.9418465647636187,0.9544515334029308,0.876497249025614,0.8597221891717237,0.7883340077844753,0.9342870505500012,0.9982486571063798,0.9577561823360994,0.7560838741342173,0.7682827440373846,0.9339440692953582,0.8292679561238527,0.8890103945927775,0.7680560377651606,0.8169999425839043,0.8152091615430543,0.8798806130989072,0.8711330404073774,0.9575239916823955,0.7714459326209022,0.9255426377846162,0.9915056662136142,0.8099161449206833,0.848072151957566,0.9361111121054762,0.8233578657555334,0.9761713753967046,0.9672642996866463,0.951434213360089,0.9479139975740409,0.9595601880001885,0.8003378212243683,0.7535841955745091,0.8953763694756398,0.8817335131707045,0.7980355110881738,0.7969300581532972,0.7544726028245322,0.8099265867292011,0.9578218285760499,0.8880766207298239,0.8758933295133559,0.8909256627063207,0.7954387929727734,0.9203395134914361,0.849507025627523,0.9746611983097488,0.9372898622091403,0.8457611084855179,0.9150951277444395,0.8411120993698855,0.8134661225203702,0.7650252880516908,0.9198316386389702,0.9348318298057867,0.7727978181848143,0.8183682813851758,0.8765983164124646,0.8045072199010439,0.7851784533178691,0.9564583296592872,0.9723293059857181,0.9683860272464249,0.8519974683943856,0.8609723312298422,0.824411887145752,0.7643302809018238,0.903777952273263]}
},{}],30:[function(require,module,exports){
module.exports={"expected":[5.0,134.0,273.0,412.0,171.0,101.0,8.0,1.0,500.0,99.0,194.0,66.0,229.0,273.0,73.0,8.0,782.0,111.0,34.0,10593.0,37.0,106.0,23.0,213.0,26.0,97.0,131.0,96.0,14.0,31.0,506.0,135.0,302.0,295.0,416.0,160.0,73.0,222.0,131.0,16.0,345.0,35.0,79.0,50.0,0.0,35.0,94.0,110.0,88.0,1108.0,40.0,121.0,104.0,91.0,16.0,210.0,70.0,16.0,1693.0,51.0,157.0,26.0,20.0,259.0,23.0,313.0,95.0,29.0,396.0,16.0,4850.0,178.0,9161.0,111.0,142.0,337.0,125.0,306.0,72.0,77.0,138.0,93.0,125.0,197.0,193.0,223.0,27.0,101.0,214.0,103.0,34.0,115.0,93.0,97.0,153.0,197.0,10.0,74.0,289.0,28.0,84.0,115.0,106.0,135.0,50.0,1994.0,4611.0,143.0,664.0,101.0,268.0,88.0,62.0,43.0,32.0,47.0,61.0,25.0,185.0,24.0,45.0,1311.0,97.0,483.0,10.0,34.0,287.0,114.0,206.0,124.0,76.0,55.0,47.0,63.0,5.0,1074.0,102.0,41.0,118.0,25.0,113.0,227.0,38.0,60.0,65.0,801.0,430.0,2.0,54.0,33.0,902.0,44.0,83.0,32.0,11.0,1880.0,137.0,21.0,87.0,102.0,1253.0,49.0,195.0,37.0,89.0,151.0,248.0,584.0,186.0,284.0,71.0,66.0,7.0,85.0,70.0,105.0,113.0,52.0,421.0,25.0,120.0,136.0,85.0,89.0,47.0,3.0,694.0,1073.0,86.0,725.0,7.0,65.0,344.0,2.0,152.0,71.0,106.0,96.0,16.0,106.0,369.0,218.0,188.0,77.0,188.0,100.0,185.0,34.0,378.0,95.0,157.0,59.0,56.0,13.0,142.0,290.0,4.0,104.0,216.0,144.0,90.0,34.0,79.0,74.0,28.0,59.0,58.0,825.0,205.0,2492.0,437.0,114.0,49.0,2.0,67.0,46.0,49.0,116.0,58.0,102.0,65.0,61.0,102.0,55.0,81.0,77.0,986.0,322.0,44.0,13.0,255.0,80.0,792.0,128.0,330.0,92.0,4.0,88.0,292.0,61.0,8.0,88.0,133.0,4.0,63.0,56.0,41.0,12.0,26.0,0.0,37.0,140.0,4.0,43.0,80.0,21.0,84.0,209.0,1349.0,10.0,192.0,1713.0,55.0,5.0,79.0,411.0,134.0,89.0,203.0,86.0,53.0,89.0,44.0,17.0,30.0,656.0,79.0,70.0,49.0,108.0,11.0,88.0,0.0,67.0,84.0,39.0,63.0,43.0,493.0,1984.0,149.0,3.0,77.0,74.0,25.0,1.0,55.0,81.0,1011.0,9.0,34.0,115.0,21.0,278.0,113.0,64.0,9.0,24.0,192.0,122.0,6554.0,17.0,1037.0,28.0,115.0,4.0,135.0,824.0,53.0,450.0,256.0,113.0,46.0,88.0,58.0,95.0,12.0,280.0,135.0,121.0,32.0,38.0,235.0,73.0,4720.0,43.0,68.0,84.0,4.0,64.0,298.0,38.0,112.0,41.0,1.0,47.0,3.0,22.0,38.0,72.0,262.0,95.0,465.0,23.0,877.0,366.0,53.0,178.0,1517.0,48.0,57.0,750.0,263.0,58.0,201.0,5.0,46.0,594.0,171.0,136.0,68.0,71.0,100.0,45.0,151.0,19.0,13.0,58.0,202.0,59.0,84.0,116.0,17.0,593.0,257.0,42.0,196.0,286.0,28.0,107.0,167.0,97.0,409.0,1139.0,66.0,0.0,67.0,42.0,7.0,5.0,9.0,36.0,69.0,232.0,313.0,2.0,45.0,76.0,182.0,52.0,89.0,137.0,40.0,1639.0,9.0,35.0,23.0,1455.0,101.0,117.0,1774.0,88.0,81.0,398.0,18.0,125.0,141.0,30.0,103.0,15.0,351.0,67.0,270.0,74.0,34.0,257.0,105.0,682.0,218.0,123.0,14.0,73.0,497.0,63.0,41.0,46.0,113.0,57.0,129.0,99.0,127.0,45.0,85.0,72.0,117.0,378.0,131.0,1390.0,107.0,88.0,12.0,34.0,43.0,513.0,158.0,31.0,183.0,96.0,131.0,59.0,234.0,399.0,1578.0,7.0,23.0,1022.0,26.0,86.0,1366.0,209.0,19.0,6.0,15.0,98.0,95.0,41.0,28.0,115.0,31.0,579.0,189.0,210.0,17.0,4507.0,238.0,52.0,138.0,351.0,110.0,56.0,17.0,232.0,796.0,511.0,82.0,2.0,100.0,134.0,367.0,23.0,168.0,178.0,64.0,699.0,268.0,31.0,140.0,148.0,43.0,18.0,37.0,121.0,29.0,76.0,65.0,83.0,44.0,156.0,437.0,246.0,183.0,54.0,121.0,19.0,207.0,63.0,217.0,55.0,25.0,42.0,85.0,168.0,402.0,226.0,9.0,57.0,274.0,105.0,114.0,68.0,1357.0,25.0,9.0,177.0,35.0,73.0,154.0,58.0,54.0,6.0,87.0,68.0,243.0,6.0,67.0,210.0,226.0,909.0,34.0,10.0,1049.0,78.0,710.0,3.0,127.0,39.0,129.0,98.0,159.0,2.0,181.0,58.0,155.0,84.0,65.0,49.0,109.0,143.0,186.0,72.0,151.0,92.0,459.0,92.0,265.0,363.0,10.0,81.0,79.0,63.0,94.0,468.0,65.0,42.0,40.0,175.0,51.0,129.0,10.0,11.0,90.0,119.0,1434.0,102.0,85.0,165.0,248.0,84.0,2.0,166.0,136.0,206.0,14.0,59.0,158.0,126.0,70.0,66.0,796.0,197.0,0.0,49.0,4113.0,65.0,16.0,22.0,138.0,131.0,164.0,646.0,133.0,7427.0,15.0,121.0,43.0,289.0,627.0,673940.0,3111.0,49.0,54.0,38.0,420.0,99.0,112.0,62.0,63.0,99.0,19164.0,51.0,51.0,78.0,16.0,71.0,77.0,425.0,315.0,20.0,207.0,97.0,18.0,35.0,114.0,410.0,441.0,158.0,128.0,348.0,62.0,161.0,26.0,155.0,132.0,141.0,274.0,100.0,171.0,158.0,131.0,14.0,392.0,73.0,94.0,38.0,228.0,50.0,41.0,157.0,59.0,266.0,37.0,545.0,7.0,5412.0,71.0,76.0,166.0,863.0,7.0,27.0,64.0,207.0,1430.0,108.0,4.0,18.0,33.0,11.0,109.0,237.0,43.0,286.0,36.0,115.0,360.0,1158.0,320.0,174.0,145.0,82.0,98.0,56.0,875.0,121.0,55.0,5.0,1.0,276.0,15.0,635.0,167.0,200.0,9164.0,78.0,8668.0,65.0,71.0,69.0,15.0,71.0,107.0,68.0,220.0,25.0,58.0,94.0,95.0,1557.0,33.0,119.0,145.0,17.0,81.0,59.0,389.0,55.0,30.0,96.0,6.0,49.0,2424.0,337.0,57.0,182.0,1231.0,215.0,30.0,0.0,58.0,119.0,22.0,82.0,9.0,69.0,51.0,120.0,462.0,28.0,98.0,1.0,479.0,383.0,43.0,16.0,36.0,9.0,80.0,0.0,3.0,24.0,71.0,330.0,28.0,348.0,55.0,24.0,28.0,6.0,36.0,151.0,338.0,0.0,107.0,250.0,16.0,45.0,42.0,46.0,94.0,99.0,57.0,276.0,55.0,18.0,252.0,17.0,45.0,142.0,80.0,113.0,153.0,164.0,12.0,90.0,376.0,31.0,207.0,3320.0,30.0,90.0,63.0,148.0,48.0,185.0,5.0,301.0,2802.0,1368.0,51.0,1125.0,482.0,175.0,56.0,23.0,4565.0,1489.0,65.0,89.0,17.0,1625.0,305.0,820.0,323.0,45.0,57.0,70.0,38.0,218.0,176.0,58.0,27.0,173.0,134.0,115.0,214.0,53.0,32.0,511.0,6.0,598.0,326.0,76.0,148.0,151.0,102.0,3.0,108.0,4156.0,2050.0,12.0,88.0,200.0,24.0,67.0,163.0,75.0,231.0,1094.0,319.0,69.0,2763.0,83.0,252.0,80.0,19.0,100.0,40.0,68.0,7.0,523.0,15.0,124.0,246.0,187.0,271.0,37.0,114.0,92.0,84.0,150.0,297.0,16.0,117.0,30.0,52.0,65.0,8.0,120.0,1226.0,45.0,89.0,1206.0,8.0,388.0,10.0,3561.0,138.0,54.0,45.0,58.0,108.0,33.0,62.0,1538.0,26.0,61.0,38.0,23.0,52.0,367.0,3328.0,318.0,152.0,34.0,20.0,54.0,133.0,59.0,25.0,15.0,86.0,5.0,137.0,27.0,34.0,133.0,258.0,6.0,161.0,1761.0,83.0,736.0,683.0,1.0,42.0,132.0,110.0,1925.0,18.0,327.0],"k":[0.14880621964522156,0.9473645143971525,0.9213281550295098,0.6930152419756617,0.5418546157397972,0.06155548175287984,0.39812016672053807,0.22263432011376771,0.5421456834481244,0.3915450330798069,0.5135430474813301,0.12819540311013333,0.04078132675522994,0.924960564340259,0.2425113161171577,0.37261120533340564,0.9657927104386514,0.6764801664001308,0.6016686985568056,0.9151688947491248,0.731968146212912,0.7108575541479196,0.03284471747034523,0.5752191829083646,0.2988778372964842,0.2984521389114714,0.3037112834589748,0.03374464879887484,0.0829580248049262,0.7841138580388898,0.5851120395357259,0.6866856819632237,0.9064914254635879,0.832142110309646,0.9785921713707837,0.5612723219290816,0.4460874671403474,0.05720529880147285,0.6688286452438679,0.19380485167491313,0.9052156557669784,0.24811290528943086,0.16962617792175694,0.08752650818868957,0.028399142064522875,0.2842805746069941,0.6669975125755592,0.7726557106413627,0.059095649751454316,0.8757519832828562,0.1510230063439324,0.13708545754743917,0.7243991263783609,0.08561818504703989,0.4529679767133399,0.44093463061946436,0.8990551876727346,0.13456096598848433,0.11710131808543922,0.4530030085417296,0.4995400516837827,0.2518214945566617,0.19285528410760233,0.8793374753911432,0.09545449516793059,0.4072719194902734,0.711689883009865,0.7742623420503185,0.8043219546014448,0.01314825798021202,0.8825556649145181,0.4878691233369632,0.28812567852982807,0.30080394084028383,0.8164809432037794,0.2546969622696078,0.20557214884520048,0.1748891075203538,0.3174682866398997,0.2437603846989913,0.5567923697949466,0.2790981459672388,0.78687440796088,0.0932061922668348,0.7835823136945117,0.016412299503647976,0.36636196098588725,0.3051194850972956,0.43753379203771026,0.2499463847935388,0.0323845541495591,0.9618729747822328,0.6869732131050108,0.7452011323119196,0.9137863140683313,0.8996805312986211,0.18233544790965217,0.29924861498290767,0.6666031349716823,0.3499939336617499,0.4651524378266858,0.44829848513473736,0.8328688590317874,0.24201906844325727,0.4211989904623319,0.5006589842624061,0.4497188227601041,0.4489228257277893,0.24939559366092046,0.7792460100525513,0.9890327087516397,0.5156331432092975,0.6131376642776052,0.15427361625329206,0.36462404128512005,0.273639604329738,0.3160954736732349,0.9301226552860267,0.5509015327065234,0.33853493323280337,0.660355566883156,0.3813835860817292,0.4639538202269664,0.9391563944898209,0.08128141737227157,0.8821268792292318,0.2813878813750321,0.8137927464135917,0.1949637728179121,0.8036730820268903,0.9323436252202943,0.6962165428844549,0.2283420339466029,0.49590054658469973,0.01063283146804439,0.7840213797024931,0.6542744791883655,0.08401554496050467,0.18347029158696437,0.41873771037156593,0.5947362565713104,0.7555607734972982,0.3200590203441005,0.7153532086312178,0.17796437341128657,0.552758537629209,0.3616315769651606,0.0061676191694368665,0.24015306438320416,0.3415690186244895,0.06704565366146809,0.9905289401680135,0.1229331246240668,0.008541809664323718,0.6991133972021333,0.7624681888179481,0.9584501054138599,0.9487155359588206,0.7322517732768865,0.6763262293364098,0.13925074568651574,0.47575182826765006,0.3719299128917126,0.6550469851540379,0.30313194067635774,0.7187165678297853,0.14464545284970587,0.79896394080579,0.6980324210675226,0.16171246853589527,0.3375609793850811,0.2960158991255062,0.6304619170902424,0.30339693777236,0.19363827666805267,0.7699180007110804,0.18592090994459642,0.8624624722639593,0.8503669630478452,0.5205484262819304,0.7686896604104299,0.9625330489358632,0.7748876060929291,0.4763755768826683,0.0333970924220055,0.19832536878331197,0.8157705624914324,0.5356804553796177,0.5313541088068263,0.3141106688899318,0.4699174044933936,0.2774774835702545,0.4792347639958914,0.01720944413426695,0.5484362179715154,0.6401497130628968,0.09758686868256583,0.46701067160946863,0.27190990282582517,0.7047309167565787,0.7987963587204236,0.32644299168811,0.6907262023385132,0.6089039333339885,0.6189605905182851,0.4552391392887989,0.9453935376736458,0.1750282786707944,0.4907657100111371,0.6288891962216887,0.3427745408188503,0.008947689142574378,0.5666949652327995,0.3384334315445243,0.416692339843189,0.7945276529361003,0.6502992321303411,0.3708911997785609,0.5703752349537505,0.4364269891739485,0.4685384871305358,0.21909556903864935,0.8170937069865345,0.4119290444421537,0.28934918468268034,0.04469966327447761,0.07517012090497421,0.22657048009003455,0.3364320897841009,0.5613357068666078,0.44632763838365164,0.5930769772370954,0.08376876288734514,0.22144629849752162,0.9112846528395957,0.4612997701904984,0.5709702401611281,0.9007595943279176,0.10653332909815028,0.2364846575744557,0.4823078717972087,0.5684787462612977,0.12399695622317553,0.544784259867916,0.9610942852986177,0.1300794507275631,0.4097096759371617,0.7638186570281227,0.3537575666926105,0.0028138591589146333,0.18584561175654768,0.7529373586688937,0.35214671213667614,0.9303141997075393,0.5421696840013155,0.9386516736637507,0.4174509564536055,0.9079655152978354,0.08410856169056125,0.4018808505465168,0.4346090898123578,0.4292972919981677,0.45036988240156384,0.4878285184678859,0.270626670486559,0.09484306967180478,0.030408800918703127,0.41168896613800743,0.48428415447935613,0.09537409338492475,0.40281533660922864,0.24637224087282616,0.2298282673493428,0.20541681975080195,0.20423851106956104,0.7132603189961062,0.03573157814140848,0.9311770485091682,0.9807549804338598,0.25150545050127926,0.15144005934832983,0.016784890559563337,0.4141335138565254,0.26690448922221055,0.9040753019695396,0.932900164951104,0.7613115869743394,0.629605108307896,0.7539156211824589,0.9643866742979839,0.1367036551118408,0.700362221610771,0.40609829070541514,0.2951655684931511,0.343758820761795,0.41075625991603504,0.5174876984745809,0.48940427874162795,0.7904415682724286,0.20687195098946165,0.24978564331710218,0.894419130632216,0.18257313272083575,0.16238315401062042,0.49767527410188483,0.33485441990679976,0.7743107546152046,0.3692210452022129,0.48663461295321975,0.5314350282936231,0.5033457609205001,0.050842638277495356,0.5608934501691432,0.5010717518362995,0.7317838470353157,0.19258562217682673,0.012140769240146732,0.48133667822555815,0.17047817129114873,0.2825306752068044,0.9483153362343293,0.4589828307724373,0.06602488346549529,0.10586766155167981,0.4472757456102918,0.9667016471938104,0.7256452812047953,0.08801243973554151,0.2517159769332704,0.7629304482850785,0.10544907724647112,0.3934125158566322,0.005893714185030596,0.22562465777951157,0.7642848989078059,0.2510801099897966,0.4570453947457296,0.8275441555771572,0.5187767914740102,0.5443178852159367,0.8474288889844352,0.8583517916247096,0.01776013196148285,0.6686076054914514,0.8061468070534161,0.4428216094964308,0.8554910629866908,0.8289172720981446,0.7427376007342277,0.8153087786672535,0.08016384224734874,0.2842963371170002,0.30805148086622647,0.5445173253546842,0.741138079895862,0.21860364254033238,0.11411629586352956,0.6362997107862782,0.011197246889143253,0.21495327144279286,0.7062677058894855,0.8272825417557472,0.16911592526691832,0.8617185269648981,0.07310552586259855,0.3229028382153156,0.005509665699862332,0.4777565355410123,0.5442449944694379,0.6580635610670464,0.3656292556332983,0.9942059952790718,0.36122025055284235,0.44664458480430813,0.8798228859085075,0.45994342812740685,0.5253155110016205,0.10277420358297107,0.5567407666475752,0.38231741273607933,0.11071258299723175,0.8393589407043431,0.336940697214241,0.7436735174140268,0.969418165177776,0.6432557404500625,0.5731967054271574,0.04371541230535714,0.8699891165204217,0.37206307374654357,0.6523800660842358,0.21704390253636974,0.10139441713339314,0.43040070942255104,0.5713527960532145,0.3608651709229973,0.7930638573622504,0.44401152750520634,0.6493583330382628,0.04191496147999496,0.6280123376982443,0.7900963049907086,0.12909904447681164,0.12776145533249306,0.906141236085213,0.17206193457454622,0.6673705703457495,0.17372330045929774,0.7422100125296975,0.6396074579383626,0.23820882080072114,0.871386537573011,0.3827344759922875,0.9461625993366063,0.33148165270816454,0.13457940536936386,0.4255929322183467,0.7933823223015608,0.6651692119975399,0.18828032494624103,0.53937513508833,0.16664882379587476,0.9044843482980232,0.38706049787835894,0.7920868609159768,0.11332512451760723,0.496639897802047,0.1926573350211851,0.8524297648378814,0.5713610555042488,0.9603007738014191,0.8497575701336151,0.11604581234856459,0.9555658640106404,0.1735307014693901,0.030558324863428687,0.10762762593888642,0.840241814839775,0.8102471737409034,0.7148835675645457,0.6490144678116729,0.3104304051420441,0.10915259596844606,0.30765409489210094,0.021878394429466708,0.7832385618570392,0.34728649138465406,0.06086652498147105,0.9555913900916273,0.6417070814987251,0.0880452997719825,0.38021952259844194,0.6429395492436565,0.9077653945606055,0.5827002757921915,0.695842067348331,0.8237467307955657,0.4114930151719707,0.6795916873966112,0.07840145780935881,0.5852992918078903,0.3325043904626581,0.28114772914121144,0.1990194804133807,0.3567670629845785,0.6934570529228201,0.8312406148213958,0.12815514823325813,0.42616639576253856,0.7486986233629258,0.7640622547742884,0.6094123985415274,0.3408249189635024,0.7282073993615708,0.46402229368684744,0.6111725773705652,0.11777484593544019,0.9795033879816144,0.5074609967282329,0.8064739891378443,0.39018096101553845,0.3153542325459926,0.15100508674907887,0.8781080363974121,0.9367052360672059,0.6003442407481716,0.2848815163066807,0.8652268544534929,0.11837406189355315,0.84376200251075,0.36140203747372435,0.10060876193471668,0.9785162669448442,0.6738043469875066,0.8614752805072494,0.37258119329776473,0.1990059511605886,0.28862795947342956,0.6436948564278084,0.8939039435228617,0.45786962374934537,0.34470426931051934,0.004715984280960983,0.9421240024223725,0.1903057769665235,0.036293336522725816,0.21016785361873236,0.48603313689911887,0.7291548952257136,0.27889348004396486,0.8816077010042442,0.6172014856689425,0.06758856247834677,0.6536150368679516,0.41053366302644223,0.43398067748549707,0.5132278636192145,0.517811448185804,0.329326247742175,0.5420747549145271,0.30135463124744755,0.9192523633512979,0.5440969934553639,0.8615877546439177,0.8067422218532436,0.11873778239142485,0.9917829904852269,0.7342624296068874,0.9146667250488698,0.7590285969812747,0.5798417939120721,0.4400829776729238,0.5979482729874666,0.9824076583751884,0.9316343132098306,0.5064609396559634,0.6974670649677182,0.10598890606283673,0.1315131927620916,0.5061004543635161,0.48059603311019483,0.6663027170486726,0.666202925284872,0.3907396712531861,0.002186479265703145,0.2683645263409451,0.6527424768598158,0.6967232593877917,0.7931886095013687,0.03353999689643139,0.8998689682212704,0.7026073217558582,0.9703055927711288,0.08021925285501119,0.16499605483644042,0.10387864502817323,0.8382539024611688,0.16519161721723763,0.09480064261709975,0.7316517512333143,0.8273076112510191,0.8374679786744812,0.24913720343595314,0.7061226512400898,0.8544274064283488,0.3049056487776336,0.7724886273086609,0.5913269823996918,0.6060596376525493,0.6939578675495748,0.9892042835090453,0.5953745308920144,0.23656504480101392,0.6692691144195706,0.8003963004377799,0.37363833511519573,0.6049267989780593,0.3824220646095362,0.44747536630334395,0.4571020927934908,0.5408724069495812,0.21301879750033526,0.15752301488453102,0.7186445548489859,0.569656909035841,0.0648969450483452,0.6095565898303827,0.393407136007641,0.7086950422057099,0.6674562041968946,0.5921498478215772,0.5853196643466274,0.8695312680883638,0.24179714132827024,0.7227316820344847,0.3718413104102136,0.01889317076609731,0.8416003999619255,0.8933747378557675,0.15397466227882384,0.8952888238286103,0.7452929922402103,0.4181312526003256,0.8194805459026975,0.5703329740680021,0.5619636208832535,0.8983804556101398,0.822426482266112,0.5375906282534424,0.12374171729405492,0.9570041409104859,0.8452092141911385,0.39453616598736807,0.493597512975521,0.689403943453625,0.9579031242680447,0.4959066190788284,0.7829064225592823,0.8956340506738554,0.8821901404541339,0.4868001590181139,0.25969998314025466,0.15216237508585784,0.6517036564396279,0.07382760734032412,0.4718772623856451,0.1258308067106586,0.7154722949559364,0.4315423666208942,0.5019607396397503,0.8073136209531215,0.7456603696413071,0.5696273019670746,0.1897826300914427,0.10030856087358253,0.7816828286843969,0.3322496336642422,0.5542157503402856,0.04306515959112067,0.5139475159441016,0.7744288614528043,0.4047057455405936,0.5478206257032707,0.34297229506189386,0.6903552407770865,0.9107289154452503,0.15146092909275088,0.2026594937854902,0.5900119148359928,0.06301364208189075,0.034380180878237576,0.5683901019812785,0.31279118182330956,0.4685575104223909,0.34258860166716576,0.8372254578965841,0.3847050722608585,0.5148181709841444,0.4164502503152754,0.8563391304450767,0.7184088654141252,0.6758199126472786,0.32771044962678597,0.16210127650786954,0.40357140629949395,0.517313345906679,0.9752504001991802,0.9631776680518955,0.460279299637969,0.8311889081075758,0.9423304822130802,0.8699012447017074,0.536871280407109,0.471979355331146,0.18683403254280995,0.733546056076829,0.19728103693910648,0.5744752911966284,0.6175348103449738,0.47221444390185807,0.12805641459598882,0.3940502123085594,0.7734871313392104,0.5462515951157669,0.5371273372804966,0.7205825666096657,0.8901650792677145,0.3212778096847517,0.5201270388339267,0.5850357677226157,0.2937745069239981,0.35206982718390734,0.9062327373006234,0.76621072745754,0.2269625786358942,0.22005363154598823,0.831197470732427,0.34475945103790173,0.6607801658915649,0.9444944758848222,0.01311634879355994,0.7173748891962521,0.17334123839740956,0.6396066609934115,0.7714657092449204,0.22764997168114443,0.7065663331406242,0.8456735137456988,0.9644308790387548,0.6042117750371674,0.5314244862828916,0.3316970658355476,0.3122901510454481,0.09207062803629329,0.922905835928117,0.5477720801504686,0.6569441442795536,0.5651142699226062,0.7912320362457066,0.7225641523324164,0.5859603959768105,0.9041189099520883,0.1809024182201706,0.8576810470478318,0.6760826580873995,0.28994486185738233,0.7160157926358031,0.5363702679479421,0.6303771107120795,0.498573226097361,0.3633521479332622,0.7056879046663267,0.14599359538393664,0.795195721873647,0.5195520279828456,0.8576163961475423,0.5034520002402925,0.07142221464139742,0.5432609631608503,0.9276937229908355,0.5760302976569249,0.5385369205676533,0.9339529787328256,0.8474154263043183,0.28206737191166287,0.4802060947956761,0.7376175028492553,0.9213709765774329,0.1253767809518067,0.8352049628393707,0.6702015755784818,0.541177819050856,0.5908775994790021,0.8638238933640026,0.24530584516157705,0.02170926970815712,0.3006913660779764,0.8783134348710175,0.4035641921563722,0.8253975765106889,0.9166164605428717,0.31933389048065486,0.7721931806189715,0.647032701106304,0.9952601438558197,0.6635659123610065,0.6154601862854028,0.5528435633391451,0.19716318290637713,0.10351357077383971,0.19663467429516102,0.12280676262069745,0.8346260908548522,0.20347538688219946,0.7497295988205985,0.8914321290672387,0.4857190989220703,0.7737992659107222,0.5165078550306623,0.6270949674644313,0.4308812524264207,0.6370019383860386,0.4344207371148121,0.468144488601004,0.3199418223307071,0.4941329070375633,0.2331884452807107,0.9013565738116227,0.32229958228302147,0.5018501742667894,0.44451924514675967,0.06190967561983407,0.6889518365332286,0.7974024263206667,0.510075276041557,0.8097223380635297,0.5012837015235014,0.01166211818602303,0.5272890788035318,0.6595184807235488,0.43521087942597325,0.789604862781444,0.15029737816521282,0.2794520346688305,0.6124134118994486,0.9017857283471609,0.7817108984686705,0.4149003443933914,0.7928972625450743,0.02660041307392036,0.3048142963376228,0.3224187388023452,0.7706844323764968,0.08889329363632825,0.11262948823400287,0.617204580138186,0.7939077863012165,0.005673974668597204,0.2176725737148506,0.584681392566822,0.13090931812213258,0.2961238041065757,0.3630340246837156,0.43722685336936395,0.15786672282191172,0.3800609340818988,0.9064278874151437,0.03939134338290162,0.4397496375529517,0.22430553722643198,0.3160779906307847,0.003495747922726,0.41958152017427786,0.6995354005077417,0.38129947762791927,0.021005442594159263,0.7181158436809298,0.5255867770609683,0.6825010086453189,0.7588215810479397,0.6506559810861547,0.4885608433894577,0.9653995626205165,0.3941873806520295,0.7045966753668054,0.00991951265557689,0.2543449357867036,0.09812596971240817,0.385532440370179,0.1852117783382965,0.9167885882459086,0.43232703127477023,0.16072952662433249,0.6702217120655178,0.714173513007085,0.038383201890790364,0.4827952397996238,0.8979692274946827,0.09855608461569743,0.29497728886064056,0.719881965911511,0.8304924849339212,0.33494425315933163,0.6818234685929188,0.38448655831067646,0.9519105074803229,0.7875753673504815,0.1290654635743218,0.18982286875342802,0.7095910003261661,0.8158676963082254,0.903385844946073,0.11854998508115777,0.48909187227569073,0.933083911688251,0.8454577955496487,0.11752138151171176,0.28338171287708325,0.7557395429245706,0.14267077778509174,0.6211385948387294,0.6940312117811123,0.7910229931304282,0.01761064297893955,0.8799314891732886,0.1895820293661583,0.2570143064510815,0.6826161824885317,0.5455343640433483,0.16990444806871352,0.003588160586529554,0.04827345842672881,0.8986573782266865,0.4041468843085836,0.4558355463472623,0.1333625419580191,0.4696838372191807,0.3228559052213469,0.47499144472636545,0.9139977522551523,0.8493418115295401,0.101470048581767,0.5852264784796768,0.8815980264356849,0.7727086759155413,0.20276733751686926,0.44408647317718986,0.8188219235516185,0.9879730277283338,0.12446709561342995,0.8581976618691713,0.3536124975662116,0.027198711291037236,0.38801419498843526,0.3207309403893215,0.7053404545593649,0.014723925716753072,0.9562431607813511,0.34168130409448394,0.3820707952122384,0.5040939164000309,0.5307096979287407,0.7884023070025405,0.3418013974599452,0.9709219435201988,0.8827768419892275,0.11760580422473454,0.20866196342732635,0.10585312927463075,0.6401817178751026,0.008627838897445894,0.18305497201183663,0.28427001875275915,0.20067721085392098,0.9303270950736786,0.5014255953433966,0.12208603216554237,0.25796048303909824,0.7635710830090952,0.7951437036927793,0.48993896190910724,0.7154205558475437,0.45223079671402777,0.7361234651251722,0.29642348507129324,0.3952199725147716,0.501337655196737,0.36573437317836954,0.8700597061208819,0.30726058426344127,0.3082576303196938,0.3587951930701976,0.0038702207173098024,0.12266065359125355,0.2857120771258894,0.26330783159984095,0.5043134470469413,0.1956926271129944,0.590311244314905,0.45539141586760623,0.6030341157068122,0.1436972561631582,0.24237194792179384,0.7381927473157897,0.5311751468660963,0.1255953796146616,0.07822538776247567,0.20300493876395964,0.2438483717718567,0.9987187627429719,0.9584132986331857,0.25783697411147566,0.559494970594828,0.5043487162591345,0.33308196801287937,0.9352506710790915,0.5847479448592339,0.9037823365395705,0.08625906931709415,0.13088626601657682,0.40468378144228967,0.1953346217398073,0.23549052511375557,0.3755080751307196,0.41614648445977154,0.4290780114336594,0.9929409928368602,0.08999993093630887,0.042848767741941574,0.893786584075051,0.6562987640598053,0.7820877469193666,0.28957963673267906,0.18905878960144906,0.807858027094065,0.20490544425099344,0.9242025489455699,0.2912622163624148,0.1267608825740536,0.6027367060195283],"r":[2.0,18.0,12.0,12.0,15.0,17.0,1.0,1.0,15.0,6.0,18.0,9.0,4.0,7.0,7.0,2.0,12.0,18.0,6.0,11.0,6.0,17.0,2.0,11.0,5.0,7.0,16.0,12.0,7.0,5.0,16.0,6.0,7.0,20.0,19.0,10.0,3.0,14.0,6.0,2.0,18.0,8.0,13.0,6.0,1.0,10.0,2.0,8.0,15.0,15.0,13.0,10.0,14.0,10.0,2.0,20.0,8.0,6.0,11.0,9.0,14.0,3.0,7.0,7.0,9.0,17.0,15.0,4.0,14.0,8.0,5.0,4.0,7.0,15.0,20.0,17.0,13.0,16.0,16.0,18.0,13.0,11.0,6.0,20.0,13.0,16.0,2.0,13.0,16.0,10.0,13.0,18.0,14.0,1.0,17.0,14.0,2.0,20.0,19.0,4.0,3.0,10.0,19.0,14.0,6.0,17.0,10.0,16.0,16.0,16.0,17.0,15.0,11.0,14.0,7.0,6.0,14.0,1.0,18.0,7.0,4.0,15.0,11.0,9.0,3.0,5.0,17.0,9.0,17.0,9.0,6.0,4.0,13.0,8.0,4.0,15.0,13.0,9.0,20.0,4.0,13.0,13.0,8.0,7.0,19.0,19.0,18.0,3.0,9.0,7.0,14.0,4.0,14.0,17.0,1.0,17.0,18.0,2.0,16.0,18.0,15.0,8.0,10.0,6.0,11.0,13.0,12.0,17.0,19.0,4.0,18.0,7.0,1.0,18.0,17.0,19.0,9.0,5.0,11.0,6.0,19.0,19.0,15.0,12.0,19.0,2.0,20.0,8.0,13.0,11.0,2.0,19.0,16.0,3.0,15.0,9.0,16.0,17.0,4.0,19.0,6.0,20.0,9.0,18.0,20.0,20.0,12.0,5.0,13.0,17.0,19.0,9.0,10.0,4.0,14.0,14.0,1.0,3.0,20.0,12.0,2.0,11.0,9.0,8.0,5.0,15.0,7.0,20.0,9.0,17.0,5.0,17.0,17.0,1.0,6.0,10.0,8.0,20.0,17.0,16.0,11.0,6.0,19.0,6.0,10.0,8.0,20.0,13.0,5.0,11.0,7.0,14.0,8.0,2.0,19.0,10.0,1.0,13.0,15.0,10.0,2.0,6.0,16.0,1.0,15.0,12.0,10.0,2.0,3.0,1.0,5.0,11.0,2.0,8.0,3.0,3.0,19.0,8.0,20.0,4.0,15.0,15.0,13.0,2.0,6.0,20.0,9.0,15.0,18.0,4.0,9.0,19.0,2.0,4.0,3.0,5.0,16.0,18.0,3.0,12.0,4.0,12.0,1.0,9.0,18.0,4.0,6.0,4.0,20.0,7.0,17.0,2.0,5.0,3.0,5.0,1.0,14.0,18.0,7.0,2.0,3.0,12.0,2.0,12.0,12.0,8.0,1.0,7.0,15.0,13.0,11.0,5.0,12.0,3.0,15.0,2.0,20.0,3.0,5.0,15.0,19.0,15.0,9.0,4.0,10.0,11.0,1.0,9.0,8.0,12.0,13.0,4.0,17.0,13.0,20.0,7.0,13.0,17.0,4.0,13.0,19.0,6.0,20.0,3.0,2.0,10.0,5.0,2.0,9.0,15.0,17.0,4.0,3.0,5.0,11.0,7.0,5.0,12.0,7.0,11.0,11.0,19.0,12.0,4.0,11.0,1.0,10.0,16.0,19.0,7.0,14.0,16.0,20.0,11.0,9.0,3.0,2.0,14.0,20.0,20.0,14.0,8.0,7.0,15.0,16.0,13.0,15.0,18.0,4.0,12.0,18.0,14.0,8.0,18.0,16.0,1.0,11.0,6.0,1.0,1.0,1.0,8.0,1.0,12.0,7.0,2.0,11.0,16.0,5.0,2.0,6.0,20.0,8.0,18.0,3.0,9.0,9.0,14.0,16.0,14.0,19.0,20.0,6.0,17.0,6.0,18.0,13.0,3.0,13.0,3.0,18.0,12.0,3.0,13.0,7.0,18.0,11.0,11.0,16.0,20.0,3.0,12.0,20.0,20.0,7.0,3.0,14.0,19.0,11.0,13.0,18.0,5.0,4.0,9.0,20.0,16.0,15.0,14.0,18.0,6.0,2.0,10.0,13.0,8.0,16.0,1.0,13.0,7.0,18.0,3.0,9.0,5.0,18.0,1.0,2.0,19.0,9.0,19.0,4.0,4.0,4.0,2.0,11.0,8.0,8.0,11.0,8.0,9.0,4.0,16.0,15.0,9.0,7.0,11.0,11.0,10.0,17.0,15.0,20.0,12.0,5.0,19.0,13.0,16.0,6.0,1.0,11.0,1.0,19.0,1.0,15.0,19.0,13.0,9.0,9.0,6.0,16.0,6.0,8.0,3.0,6.0,18.0,4.0,20.0,20.0,17.0,1.0,12.0,7.0,14.0,19.0,7.0,11.0,6.0,13.0,6.0,17.0,18.0,10.0,5.0,15.0,19.0,13.0,12.0,1.0,14.0,17.0,17.0,9.0,11.0,14.0,2.0,4.0,19.0,3.0,19.0,18.0,15.0,8.0,2.0,20.0,11.0,18.0,1.0,13.0,18.0,5.0,8.0,4.0,2.0,15.0,12.0,15.0,1.0,19.0,10.0,9.0,13.0,17.0,1.0,20.0,12.0,14.0,12.0,11.0,5.0,14.0,20.0,18.0,14.0,13.0,16.0,20.0,12.0,11.0,3.0,2.0,13.0,5.0,10.0,11.0,20.0,16.0,8.0,5.0,16.0,12.0,5.0,3.0,3.0,6.0,20.0,14.0,9.0,12.0,9.0,20.0,12.0,2.0,10.0,13.0,15.0,1.0,5.0,11.0,15.0,8.0,17.0,18.0,19.0,1.0,11.0,17.0,16.0,3.0,2.0,4.0,11.0,15.0,10.0,3.0,6.0,4.0,14.0,9.0,8.0,2.0,20.0,14.0,8.0,7.0,4.0,4.0,20.0,10.0,9.0,20.0,8.0,10.0,8.0,17.0,16.0,2.0,15.0,19.0,12.0,18.0,6.0,20.0,16.0,6.0,6.0,15.0,11.0,15.0,10.0,16.0,17.0,14.0,14.0,8.0,12.0,20.0,19.0,10.0,18.0,17.0,5.0,11.0,1.0,20.0,6.0,19.0,14.0,15.0,7.0,8.0,14.0,6.0,16.0,8.0,16.0,3.0,18.0,14.0,19.0,5.0,15.0,1.0,7.0,17.0,14.0,18.0,19.0,1.0,2.0,8.0,6.0,2.0,19.0,8.0,13.0,2.0,2.0,20.0,13.0,17.0,17.0,13.0,2.0,12.0,10.0,20.0,18.0,15.0,4.0,1.0,13.0,4.0,14.0,16.0,15.0,16.0,2.0,15.0,13.0,15.0,10.0,5.0,15.0,4.0,11.0,12.0,9.0,12.0,14.0,19.0,9.0,5.0,17.0,13.0,3.0,16.0,8.0,16.0,2.0,3.0,12.0,2.0,9.0,4.0,15.0,6.0,15.0,16.0,17.0,5.0,1.0,11.0,16.0,6.0,11.0,2.0,8.0,6.0,9.0,20.0,1.0,5.0,2.0,8.0,19.0,8.0,6.0,13.0,2.0,13.0,2.0,1.0,4.0,20.0,3.0,3.0,9.0,18.0,3.0,3.0,2.0,3.0,19.0,18.0,1.0,13.0,8.0,5.0,10.0,2.0,8.0,16.0,8.0,5.0,18.0,5.0,3.0,19.0,9.0,6.0,11.0,18.0,15.0,19.0,16.0,5.0,16.0,6.0,12.0,11.0,2.0,8.0,18.0,12.0,16.0,7.0,12.0,1.0,17.0,5.0,11.0,10.0,18.0,14.0,20.0,19.0,4.0,10.0,17.0,20.0,20.0,3.0,19.0,19.0,16.0,6.0,8.0,7.0,16.0,3.0,16.0,20.0,6.0,10.0,16.0,10.0,11.0,4.0,4.0,5.0,12.0,1.0,18.0,16.0,16.0,14.0,13.0,20.0,2.0,15.0,15.0,12.0,4.0,8.0,19.0,12.0,2.0,17.0,14.0,20.0,11.0,13.0,19.0,12.0,18.0,14.0,6.0,1.0,10.0,12.0,10.0,2.0,12.0,8.0,17.0,13.0,18.0,6.0,5.0,20.0,14.0,14.0,14.0,12.0,2.0,16.0,4.0,15.0,17.0,2.0,13.0,20.0,9.0,16.0,8.0,4.0,13.0,2.0,16.0,14.0,4.0,10.0,2.0,8.0,5.0,18.0,9.0,6.0,14.0,6.0,5.0,12.0,9.0,17.0,19.0,13.0,1.0,6.0,6.0,4.0,7.0,8.0,4.0,14.0,3.0,17.0,2.0,4.0,12.0,10.0,3.0,15.0,13.0,5.0,18.0,5.0,1.0,2.0,17.0,8.0,15.0,3.0,19.0],"p":[0.1016056091130133,0.16303110503679497,0.05979894807844524,0.031712011796935884,0.08085405752727898,0.09685926312653717,0.05673844837850575,0.16793480518060744,0.02926331063688723,0.04836374880224162,0.08420410089905346,0.07854875651735345,0.0055098685647207105,0.03933377999394727,0.06359210182153277,0.13325685227294012,0.023852926729325086,0.15183050909124401,0.15813963014186327,0.0014887153673220689,0.1657312716427824,0.15329492235856748,0.011609687209452125,0.050407179079557635,0.1199884855328826,0.052142498714041134,0.09429824084504893,0.06190853365918012,0.1978877784856942,0.17682281703670655,0.03166883580939528,0.048745828472590486,0.034275225414611435,0.07647825429745697,0.06556547335373923,0.05954933636682705,0.03244789095020537,0.037006503591253286,0.04915076307750961,0.04677170727182714,0.06486524847337823,0.1403096353804339,0.10568817559722482,0.0561864825117687,0.18038665772693238,0.18263030220174029,0.023735201331003753,0.08367456959273634,0.0950353328354586,0.01735435476862457,0.1834083978837928,0.05144717068843736,0.13444690742828236,0.060740098250075564,0.0850801548197575,0.08301510485699244,0.14656947087274103,0.1701270835591908,0.0042594046831685,0.13920750082801625,0.08010045661608994,0.060996883885859624,0.1789515081409741,0.0379868972085736,0.17666069833257467,0.04777627811745169,0.15268562510412914,0.15692262459679485,0.041542564176343125,0.1396426110271922,0.0015876349410450354,0.01989189670504592,0.0005818565455541158,0.1025646648784968,0.14600681960639506,0.04004575610852044,0.07305076568649364,0.03830332092871061,0.1590594138680399,0.1590356363881764,0.0872002182283353,0.08645979767037151,0.058937515902914676,0.06725343182207469,0.0754525000547969,0.03687383661575288,0.044466137412855745,0.09725673855750201,0.06558676110550397,0.06903788618376919,0.16274353889175128,0.19133497793616183,0.14376521019135238,0.013937763168978101,0.13228712561887576,0.08894760819959724,0.06995095356625583,0.1890834721912289,0.06671640695685173,0.09549105931873535,0.029274624226546742,0.07464735840438212,0.18212797110442747,0.0763399879365288,0.09392706771716659,0.008293038681839837,0.0020087293672203634,0.09592238023783094,0.019368101007506768,0.15943324925576918,0.09594397853455404,0.14437982891237544,0.15954676402984613,0.18628495415723317,0.1531247390432081,0.08388673137185165,0.1610780208574612,0.09807219646601198,0.0898093739986618,0.1889366804897304,0.09211399937401361,0.010216527516614083,0.09676126806437849,0.028408697924663964,0.08324754658349268,0.19046861528518827,0.04765269934231236,0.09291568368781,0.06062874224581663,0.08529423699413995,0.11837718462153371,0.07923427237137562,0.1757507768586807,0.1083287647591042,0.10963186508815222,0.016397697470238625,0.12264027097097041,0.10842411791058743,0.11756612332251454,0.11427831463400216,0.10763419249000426,0.06351694002569715,0.14274935638872707,0.12254616644916526,0.1838633790966549,0.023454023969630013,0.036255850382107456,0.08959386560078829,0.10996092351414127,0.14451436430777212,0.00970532675519702,0.19786484704994836,0.10345526674671249,0.19821441047818555,0.09526055815479416,0.010406390418058686,0.16363963900607703,0.1927015605384902,0.1756063894274964,0.16300609736062854,0.008612391042874768,0.13310453520784468,0.04254581522369958,0.15407304946865433,0.09151805756991754,0.08994624024485987,0.032593037999472996,0.03374019843115446,0.10204632943808899,0.007321332741467668,0.18134132090175,0.07500510379839397,0.12149300690487155,0.15326871677280232,0.1564992122372845,0.17570627208309306,0.05209600313776317,0.12703185383334703,0.03326379012435741,0.19048981693714642,0.15614965031971453,0.1721182929447402,0.17553330611833795,0.11431900504537028,0.19121283451369844,0.18587691775322637,0.033425195540146425,0.007323228292089645,0.13094564349507753,0.012479540513128697,0.1849430590423805,0.1962026282201026,0.043004158165180995,0.15287475041314438,0.09047839990570893,0.12163090049997992,0.09299942678406295,0.14544103025502927,0.13409757527211266,0.16706154888364996,0.020992221935181334,0.0749606276800353,0.05175755823309554,0.1964877347016717,0.10085220690511401,0.16082971756117834,0.08982152475447291,0.07834288473099336,0.03220283513677975,0.1598015386182325,0.097214836477754,0.05282974879585148,0.15509299919769615,0.17513642158428386,0.0827957822123136,0.05548832500631731,0.19571298667471543,0.020468347404659193,0.08660025960306741,0.07155553863933668,0.01722721067810462,0.190307007315805,0.12953766936214808,0.08639953541937646,0.11027075705770564,0.12909419224119936,0.056973413752156615,0.019591268804603736,0.03519197329107673,0.006896347536006831,0.009927521240362936,0.13409292058144717,0.18359336403523502,0.09012866600011407,0.12768961087192054,0.16899401046727647,0.1437091056370161,0.18662239103174955,0.16685049062638235,0.11183095115822078,0.13973910012491536,0.09020337261464056,0.11939806910499091,0.09696103090373304,0.17134307547358177,0.05946934754944744,0.018572069246120117,0.04581725715901657,0.08060084461439376,0.19693089309598505,0.01776658528000503,0.1721461756118354,0.008341695731806143,0.033110021122639215,0.05478819397973949,0.14647969470279318,0.11500572947214921,0.17386445317352495,0.03291618519138528,0.12740661708109122,0.14929123159924207,0.05619650667370446,0.10188040421166962,0.144129514557019,0.16334432630634224,0.11808817717663521,0.10316642917178527,0.10123375438942382,0.09067597246373037,0.1039417366231144,0.0999199651636673,0.057282263282479075,0.18176960671532832,0.11215334366028262,0.018929917598614,0.15348850222201552,0.12034506112623702,0.05708431685467144,0.02205140083015951,0.1929971766443674,0.05412164364496937,0.004623325955250968,0.17658580938743387,0.16751498763052408,0.10775536073757688,0.06224732539361404,0.07599912927752382,0.1532149363005451,0.09306499541555345,0.08985046581634237,0.09635003813583043,0.19314530995229862,0.030557013380372755,0.13574206549080978,0.06476108260873806,0.0063580021679733095,0.1676342394907708,0.19936872659621496,0.07952021080133483,0.07660178175787952,0.17891377104941092,0.1613866452916966,0.19877933589749286,0.08158489997472258,0.173070165087626,0.06959342671728051,0.11013649711181106,0.06599181714731364,0.038062046294046505,0.003453280157193861,0.10049520002609738,0.09482867031083703,0.06132433536590361,0.034982071829951965,0.1998505954772719,0.12601904701532735,0.10575879686371437,0.1762851316027151,0.004436987966889738,0.10165670662012967,0.1622443192472527,0.08903987417160862,0.0187657437835163,0.027486860217551624,0.09001880145810684,0.1844462334322856,0.12265433594295927,0.1293414105124378,0.05969366155093998,0.11287545403906987,0.0010811848489945765,0.19199471358023845,0.004832475724649932,0.05414586710403189,0.13416277158285905,0.1807187797887771,0.12393885823991764,0.005446713274499127,0.08199520033950738,0.032455294667795176,0.08451307484130816,0.147681697955224,0.0743911340344786,0.049281530663064066,0.18273050651693323,0.09693393627335314,0.14134992033161428,0.04048701300826192,0.0669439199363485,0.11183402575180788,0.1937870692541845,0.06464755092673591,0.0586171387961429,0.15222058248757092,0.0047824993250633165,0.09964092771536764,0.11209026543974217,0.17780286194002515,0.1367386840273428,0.13419922793999128,0.06640551140294,0.18381326260736053,0.12074192699349502,0.10715045441545779,0.19082822392682589,0.1481439443786949,0.18065915064419366,0.06814750755650589,0.19179569645680777,0.18621863113849188,0.05510820522431947,0.10522410106148793,0.004577948402651133,0.16109971544948143,0.016811613524237944,0.017219409210991233,0.08348247709384707,0.04177194561618083,0.004623112703840348,0.16760409238223084,0.10908354770511185,0.030195404450779728,0.03758627312804248,0.08056109980973424,0.08343131277737861,0.18039000875074518,0.18391297505957974,0.016231258509901016,0.12460988498811748,0.04128115423021766,0.18344439392302314,0.1501589853948025,0.12392613303382279,0.18223291425685018,0.057686524439242784,0.0993983685104515,0.18502130225789104,0.18503794579779004,0.0961281076087302,0.17233647474156233,0.15189739104547473,0.08070243998784998,0.18426240250848822,0.01773712164641461,0.07782499006656268,0.18178366731431553,0.0772642975175904,0.04646452931067833,0.15342398842793326,0.10788457384599184,0.08086837183853408,0.16122755265967903,0.016511502868486128,0.021808573174287638,0.17319080616538685,0.13530950098298863,0.13041824975773292,0.1597903126508737,0.12909038391562172,0.03592171095185211,0.07461483343557887,0.1258843192618051,0.03337838846633905,0.04410538008531049,0.027958656137978544,0.16094646659253087,0.19012754205323346,0.13812197964891687,0.03880117764349125,0.03526402897780354,0.11231112699359334,0.15441177472745574,0.10443288851299824,0.015535712774471168,0.12745714002938757,0.10293804462607055,0.18424232531881818,0.01202133455884229,0.16323725148305926,0.11999054400594034,0.011357384030382578,0.16491146266344076,0.03781123406188991,0.03556753452544124,0.09694960342595844,0.14648382040948596,0.07382059836119041,0.02815476019578358,0.16471606951005746,0.1770511791643255,0.03434355854825064,0.1359184175371159,0.01214454517219994,0.1998573694398061,0.17469629878688592,0.07212510842764584,0.11889367050830937,0.014372074762885045,0.07489192100193556,0.10058051506516869,0.17432907675927956,0.1216430489654024,0.03339313140348912,0.19948370026126272,0.12123528970161553,0.0720088150918377,0.1355392764663932,0.19415948796532936,0.07204636501118654,0.1346291448427245,0.1428197579055329,0.10616555089461462,0.03330298232403579,0.12901388476155629,0.14094792397982636,0.042644215368847105,0.07365125444360232,0.016090023989714465,0.1417142282489381,0.08376246190951707,0.09647200518065731,0.19159650961256577,0.17252146915174515,0.021711983030460624,0.12678216749216858,0.028425285553894453,0.055187048821871046,0.09496249425957665,0.08984976474920954,0.07409350803431329,0.03168329550869999,0.006051895537813091,0.017224825423567625,0.1383848404873573,0.13602357073047422,0.016631167251263835,0.18944962035995513,0.15859388750001735,0.0032253318679521304,0.030749483176556014,0.15536897842215547,0.16758678545762257,0.19023007759525284,0.11831773485330098,0.05419209779157761,0.11921682862867344,0.16414472605507535,0.06939649200861608,0.1377584150046076,0.02269586656405691,0.09552262579130232,0.043592811153898084,0.15635855518722735,0.0026574544034719152,0.040119153230969755,0.14779707079383667,0.10825947002302283,0.04051548146078013,0.13846641240948085,0.1767044456238697,0.1704223498599868,0.09974060037925186,0.01615062135772414,0.03845374302787228,0.08982470397513054,0.05280587793140082,0.17614381407675786,0.00979165417630541,0.06482279841766583,0.059725615371476116,0.08453479460139075,0.09159606037531738,0.1761177711149674,0.023046906232440812,0.049405538217838975,0.1540145935910736,0.11372142714433792,0.020986290139840325,0.1001376051978534,0.12900901515834798,0.13003946773179093,0.1396037453664711,0.13876098278829516,0.19381588858601118,0.12117636693233531,0.14545101401552243,0.02365576906081759,0.07984985138461097,0.020224840295037662,0.031036092913458904,0.12064311501573251,0.1312398591290873,0.1329668828862721,0.12584125082300188,0.04364584433231849,0.0468509324803001,0.08899992074887604,0.1954977657132771,0.1851872505922596,0.12975573516278027,0.18287824356362756,0.12272076694624229,0.025195597111618097,0.05712416112353189,0.1767773964090402,0.16882994727778305,0.06813912636560047,0.1436684808900339,0.07675596696762117,0.15554009361570206,0.017426581990620128,0.0736999493262998,0.19746719275695235,0.10464617581617315,0.11073501804884983,0.1899166615969854,0.1093775166995318,0.18832738352527434,0.11825604758388569,0.19835825016604514,0.18722623169175878,0.10629532776582035,0.053238471127617974,0.17351475418042375,0.16648660946247085,0.05360720267379979,0.02290171066219067,0.007578484796188567,0.12551754263458312,0.19604105850685147,0.014636707425580965,0.13752758484663308,0.026661997259257886,0.07208455311675369,0.14517520321606853,0.17995814705625324,0.02891661680398494,0.1462210549749858,0.1242714250916218,0.06179901800174328,0.12635008799286768,0.19840146801999026,0.07672941778408911,0.15457551743769332,0.14764516866384822,0.09212809701972531,0.1511835275974824,0.1454526881062912,0.08865705058516511,0.11726304871194207,0.11808938825430447,0.18176965742328266,0.03870931033271279,0.11190580175584929,0.04474803420881362,0.017770793066672754,0.14239109503234607,0.16493981446816255,0.09306408505477762,0.18445338909736406,0.10116144341514031,0.03483367855832986,0.1520190571294835,0.17394456664406033,0.050594564129206265,0.08066826685488074,0.13446872386402117,0.04462296680222804,0.19347951206091257,0.19024969544217654,0.08193791309654803,0.16143926138324305,0.009892069795810744,0.05771837608888646,0.08280234428566731,0.06378300306328014,0.06680888791464312,0.12678799187529508,0.10619771324710313,0.05559975395097188,0.10324741953907611,0.06245286544411508,0.05252982421755679,0.06061306596599656,0.0727900209454747,0.1421451739360706,0.06721806267822186,0.16724509718095534,0.02287751231116828,0.06035239625916131,0.17187603241232408,0.1855643157031086,0.00357420226754841,0.18996118440340287,0.11263651714617517,0.13338781032814864,0.022276138505177557,0.07617651005959028,0.07767903022872327,0.020312647678646913,0.027272160732497098,0.0009175388572566057,0.15695484788131947,0.07777199899615744,0.15444428192802362,0.026260640014555303,0.008845516995450177,4.256723899160875e-5,0.004257138167749153,0.18266057919805045,0.18241655172892246,0.14636096907542667,0.00907571658556301,0.16300996611362156,0.059238837274738915,0.14785931662035176,0.19948482689854036,0.07652226860242739,0.0005541529484998531,0.128074244769776,0.18932065624291444,0.15679783338648656,0.15366785377083902,0.17478433753359257,0.19950455307824655,0.031433214431576005,0.06949305632649723,0.18227785748741432,0.08776216046127688,0.14538629809660347,0.19005728357251012,0.12043943973863432,0.15408682836525667,0.03133602993826825,0.026350622079637898,0.04489366143756044,0.13576095861260026,0.04149083668938785,0.19830520918912575,0.11452452261312068,0.09837415668111237,0.0819993590957338,0.10512476043376494,0.12589144675875114,0.042716771495305665,0.12696753085401635,0.10040586503485094,0.043859064866901366,0.12190951427279165,0.061517549238379626,0.048544294534987875,0.05988350873976809,0.1485961806505201,0.1897293042927408,0.08477777858923591,0.1230873383629294,0.18040898484242188,0.08357457466750176,0.1189390836177978,0.06392639483937215,0.18498978028847596,0.037966315054102265,0.1645382825596675,0.004150746159585372,0.1789310440971543,0.1751386155129421,0.03511038560106763,0.01710922330496305,0.1288052924450255,0.19423291677388016,0.19096145299036704,0.07107476454691959,0.009412427082934728,0.1737078747212654,0.15261650628757897,0.16321928904847582,0.18986089251302177,0.19325835639234273,0.016429348311198088,0.09907605411921697,0.16016373714659626,0.043454920226503546,0.11275135373300023,0.028551222759904515,0.045494596781501695,0.010666650790873033,0.057380953674539464,0.11915147279420042,0.05781413851056812,0.03827049356415238,0.11957441861865337,0.15140124148098685,0.02312932467072808,0.16045131564554957,0.1791497314376411,0.14500641553168733,0.19023002575709455,0.059389254818670925,0.17594556500925895,0.026783163386104425,0.11709328542212738,0.06053417598006816,0.0020480685090167317,0.027623253029732144,0.0031004028455704716,0.1800873324537247,0.1821797812611426,0.12780149414799577,0.1653903499774294,0.12412875424560937,0.020656348733858555,0.09474516014264825,0.06562163148071264,0.19671884526127995,0.19931576105238583,0.17038234512619563,0.16309473893662105,0.0070623972354231235,0.126323001964592,0.13239733844909624,0.07657517035220424,0.1618045108883536,0.1559675270823047,0.11221215608606704,0.0343642588567711,0.02924616786560108,0.050748659998719074,0.15128672773277052,0.15882835750535165,0.1499986610373532,0.001405753654595321,0.02733670873378462,0.10832101409474913,0.0912425046976526,0.012642747688639001,0.08758813105176749,0.13537456381379856,0.1224166975052734,0.1586185328999136,0.12752918577791408,0.19055210953979548,0.14335796648105778,0.06486955609779232,0.08076601860238397,0.11175540868345549,0.09967595880128632,0.04820330529362318,0.018490223273702488,0.06432135257283443,0.13287094065885383,0.013042076241901679,0.04173697415579883,0.1900662992974687,0.14767617068404348,0.18705828773353095,0.19581528311209026,0.16780051784099423,0.17634354522311826,0.0679107652661524,0.14755571851581714,0.16996160723742593,0.005718826777609332,0.06985484580875885,0.023049393935418827,0.195701204088358,0.08158017754709351,0.16706091901235776,0.04505537125588371,0.06239009420619249,0.0928841017724344,0.04437396790773743,0.1974811287115047,0.10011859142057396,0.03560365726762678,0.19713847862409142,0.08873239776620845,0.056654877746246696,0.1451401802859445,0.15891646714334332,0.09099521926793158,0.08976054713369744,0.05976669883151678,0.15474943407129269,0.11039093244290817,0.0774494270982637,0.1524131930205712,0.08437569952085262,0.04618973568828624,0.16871249675526245,0.09091519188086666,0.1444801207722517,0.08342295737310473,0.17987806982922097,0.1639199210043518,0.018584709240572563,0.16445740789290758,0.04845834831704701,0.0011628137988441533,0.12969116747119433,0.14492020048679885,0.1805247198715453,0.11876149955662015,0.10428277702399763,0.06759946659646676,0.08194657224251377,0.07586878991303513,0.002351402986895801,0.00537033095830557,0.12135505323746987,0.01755664431613524,0.034688777930781935,0.13157309991697083,0.1946923166350148,0.13265882013331481,0.003296904009454549,0.014034117524591983,0.18111651435717846,0.1607646486542588,0.19605753486706579,0.008787477834536973,0.061784935320477796,0.021225261126595063,0.023671461089076386,0.06349995225041005,0.15405627158009616,0.14845035616789534,0.04293338020115134,0.07491947814523514,0.10300392066286093,0.05873093610633227,0.10502434119131276,0.05367076739651795,0.09700452784931834,0.07885909025256672,0.01593465632752018,0.03475840598829825,0.12182408332241779,0.019486985334670505,0.09375633646936793,0.0388304524976439,0.058379502228091434,0.12421385093658653,0.08912781932572558,0.10431633751685188,0.18662701576644403,0.1763094392956023,0.11504233168055862,0.004417117065091958,0.010227807533240485,0.12903286815821735,0.11309094305803034,0.07838361332211799,0.1926170194219747,0.019465440390220315,0.0831228354029264,0.17531266186405026,0.046727248371288166,0.01555755103850558,0.034079099738268635,0.19889434978645015,0.00421807088427042,0.17857158740203938,0.06290567426993694,0.055549091567849686,0.16462758353228654,0.12343315218642013,0.16081808871065287,0.09671981909634596,0.06325711971504609,0.024157628111308727,0.14082444861270865,0.09548159155993466,0.04167351813111484,0.07068319138233599,0.03563304017749158,0.11311840672391638,0.11363339045835255,0.108856865721675,0.16535585049342374,0.1024890845298018,0.03747755328220994,0.13964311220268702,0.11423127582974867,0.14459036787659585,0.19473793815299092,0.19201706924347342,0.1776011784124515,0.08677311037594082,0.020097839949047902,0.13599598287846604,0.13275254362540775,0.00553290161094302,0.060351726709031085,0.022523213769468066,0.09044507049888094,0.003719049910655148,0.09043376960471372,0.039912679416871114,0.18750953139517243,0.025945843570486505,0.07250737278714396,0.07416078810619035,0.1889381482957287,0.006900057608118937,0.18075821138397916,0.1345508436274214,0.06893285971435562,0.1143909411575495,0.15131616596352615,0.054324213857190135,0.007393456425845768,0.047686066554814846,0.07976421776463756,0.020396046472393972,0.18450431429796246,0.1613147803715912,0.029879986627824186,0.1555030760797565,0.14643342803162854,0.10883443465219007,0.12821745206637117,0.1987026224671674,0.091155037720275,0.04527193091079371,0.08795321682673385,0.07650213659060112,0.0711105237110671,0.13697144108924603,0.052180408575972816,0.009923737658921761,0.06297810333079883,0.02796960360652112,0.005205052343097316,0.15468233246672122,0.06866472306388575,0.09210966163193537,0.10241029313709467,0.006532918550089795,0.06134091398322244,0.057265496639585314]}
},{}],31:[function(require,module,exports){
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
	var quantile = factory( 20.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 20.0, 0.5 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 0.5 );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 20.0, NaN );
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

tape( 'if provided a valid `r` and `p`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
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

tape( 'if provided a `r` which is not a positive integer, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( -10.5, 0.5 );

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

	t.end();
});

tape( 'if provided a valid `r` and `p`, the function returns a function which accurately computes the 0% and 100% quantiles', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 20, 0.5 );
	y = quantile( 1.0 );
	t.equal( y, PINF, 'returns +Infinity' );

	y = quantile( 0.0 );
	t.equal( y, 0.0, 'returns 0.0' );

	t.end();
});

tape( 'the created function evaluates the quantile for `k` given large `r` and `p`', function test( t ) {
	var expected;
	var quantile;
	var k;
	var r;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	k = highHigh.k;
	r = highHigh.r;
	p = highHigh.p;
	for ( i = 0; i < k.length; i++ ) {
		quantile = factory( r[i], p[i] );
		y = quantile( k[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `k` given large `r` and small `p`', function test( t ) {
	var expected;
	var quantile;
	var k;
	var r;
	var p;
	var y;
	var i;

	expected = highSmall.expected;
	k = highSmall.k;
	r = highSmall.r;
	p = highSmall.p;
	for ( i = 0; i < k.length; i++ ) {
		quantile = factory( r[i], p[i] );
		y = quantile( k[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `k` given small `r` and large `p`', function test( t ) {
	var expected;
	var quantile;
	var k;
	var r;
	var p;
	var y;
	var i;

	expected = smallHigh.expected;
	k = smallHigh.k;
	r = smallHigh.r;
	p = smallHigh.p;
	for ( i = 0; i < k.length; i++ ) {
		quantile = factory( r[i], p[i] );
		y = quantile( k[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `k` given small `r` and `p`', function test( t ) {
	var expected;
	var quantile;
	var k;
	var r;
	var p;
	var y;
	var i;

	expected = smallSmall.expected;
	k = smallSmall.k;
	r = smallSmall.r;
	p = smallSmall.p;
	for ( i = 0; i < k.length; i++ ) {
		quantile = factory( r[i], p[i] );
		y = quantile( k[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/negative-binomial/quantile/test/test.factory.js")
},{"./../lib/factory.js":22,"./fixtures/julia/high_high.json":27,"./fixtures/julia/high_small.json":28,"./fixtures/julia/small_high.json":29,"./fixtures/julia/small_small.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193,"tape":258}],32:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/negative-binomial/quantile/test/test.js")
},{"./../lib":23,"tape":258}],33:[function(require,module,exports){
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

tape( 'if provided a number outside `[0,1]` for `k` and a valid `r` and `p`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 20, 0.5 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 20, 0.5 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a `r` which is not a positive number, the function returns `NaN`', function test( t ) {
	var y;

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

tape( 'if provided a valid `r` and `p`, the function accurately computes the 0% and 100% quantiles', function test( t ) {
	var y;

	y = quantile( 1.0, 20, 0.5 );
	t.equal( y, PINF, 'returns +Infinity' );

	y = quantile( 0.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0.0' );

	t.end();
});

tape( 'the function evaluates the quantile for `x` given large parameters `r` and `p`', function test( t ) {
	var expected;
	var r;
	var k;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	k = highHigh.k;
	r = highHigh.r;
	p = highHigh.p;
	for ( i = 0; i < k.length; i++ ) {
		y = quantile( k[i], r[i], p[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given large parameter `r` and small `p`', function test( t ) {
	var expected;
	var r;
	var k;
	var p;
	var y;
	var i;

	expected = highSmall.expected;
	k = highSmall.k;
	r = highSmall.r;
	p = highSmall.p;
	for ( i = 0; i < k.length; i++ ) {
		y = quantile( k[i], r[i], p[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given small `r` and large `p`', function test( t ) {
	var expected;
	var r;
	var k;
	var p;
	var y;
	var i;

	expected = smallHigh.expected;
	k = smallHigh.k;
	r = smallHigh.r;
	p = smallHigh.p;
	for ( i = 0; i < k.length; i++ ) {
		y = quantile( k[i], r[i], p[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given small `r` and `p`', function test( t ) {
	var expected;
	var r;
	var k;
	var p;
	var y;
	var i;

	expected = smallSmall.expected;
	k = smallSmall.k;
	r = smallSmall.r;
	p = smallSmall.p;
	for ( i = 0; i < k.length; i++ ) {
		y = quantile( k[i], r[i], p[i] );
		t.equal( y, expected[i], 'k: '+k[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/negative-binomial/quantile/test/test.quantile.js")
},{"./../lib":23,"./fixtures/julia/high_high.json":27,"./fixtures/julia/high_small.json":28,"./fixtures/julia/small_high.json":29,"./fixtures/julia/small_small.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193,"tape":258}],34:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/base/tools/evalrational":146,"@stdlib/math/constants/float64-fourth-pi":179}],37:[function(require,module,exports){
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

},{"./asin.js":36}],38:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/base/tools/evalrational":146,"@stdlib/math/constants/float64-e":175,"@stdlib/math/constants/float64-eps":176}],39:[function(require,module,exports){
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

},{"./beta.js":38}],40:[function(require,module,exports){
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

},{"./full_igamma_prefix.js":43,"./regularised_gamma_prefix.js":50,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/factorial":71,"@stdlib/math/base/special/gamma-delta-ratio":76,"@stdlib/math/base/special/gammainc":91,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/pow":115,"@stdlib/math/constants/float64-eps":176,"@stdlib/math/constants/float64-smallest-normal":194}],41:[function(require,module,exports){
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

},{"./ibeta_imp.js":46}],42:[function(require,module,exports){
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

},{"@stdlib/math/base/special/binomcoef":53,"@stdlib/math/base/special/floor":73,"@stdlib/math/base/special/pow":115,"@stdlib/math/constants/float64-smallest-normal":194}],43:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/pow":115,"@stdlib/math/constants/float64-max-ln":187,"@stdlib/math/constants/float64-min-ln":190}],44:[function(require,module,exports){
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

},{"./ibeta_power_terms.js":47}],45:[function(require,module,exports){
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

},{"./ibeta_power_terms.js":47,"@stdlib/math/base/tools/continued-fraction":140}],46:[function(require,module,exports){
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

},{"./beta_small_b_large_a_series.js":40,"./binomial_ccdf.js":42,"./ibeta_a_step.js":44,"./ibeta_fraction2.js":45,"./ibeta_power_terms.js":47,"./ibeta_series.js":48,"./rising_factorial_ratio.js":51,"@stdlib/math/base/special/asin":37,"@stdlib/math/base/special/beta":39,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/expm1":68,"@stdlib/math/base/special/floor":73,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/max":111,"@stdlib/math/base/special/min":113,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/constants/float64-half-pi":182,"@stdlib/math/constants/float64-max":188,"@stdlib/math/constants/float64-pi":192,"@stdlib/math/constants/float64-smallest-normal":194,"@stdlib/math/constants/int32-max":198}],47:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/expm1":68,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":78,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/max":111,"@stdlib/math/base/special/min":113,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/constants/float64-e":175,"@stdlib/math/constants/float64-gamma-lanczos-g":180,"@stdlib/math/constants/float64-max-ln":187,"@stdlib/math/constants/float64-min-ln":190}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":78,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/base/tools/sum-series":149,"@stdlib/math/constants/float64-e":175,"@stdlib/math/constants/float64-gamma-lanczos-g":180,"@stdlib/math/constants/float64-max-ln":187,"@stdlib/math/constants/float64-min-ln":190,"@stdlib/math/constants/float64-smallest-normal":194}],49:[function(require,module,exports){
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

},{"./betainc.js":41}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/gamma":82,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":78,"@stdlib/math/base/special/gammaln":100,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/max":111,"@stdlib/math/base/special/min":113,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/constants/float64-e":175,"@stdlib/math/constants/float64-gamma-lanczos-g":180,"@stdlib/math/constants/float64-max-ln":187,"@stdlib/math/constants/float64-min-ln":190}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/round":129}],53:[function(require,module,exports){
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

},{"./binomcoef.js":52}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{"./ceil.js":54}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":153,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-to-words":169}],57:[function(require,module,exports){
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

},{"./copysign.js":56}],58:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":101,"@stdlib/math/base/special/kernel-sin":103,"@stdlib/math/base/special/rempio2":125,"@stdlib/math/base/utils/float64-get-high-word":157}],59:[function(require,module,exports){
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

},{"./cos.js":58}],60:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/base/utils/float64-set-low-word":166,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],61:[function(require,module,exports){
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

},{"./erfc.js":60}],62:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/base/tools/evalrational":146,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],63:[function(require,module,exports){
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

},{"./erfcinv.js":62}],64:[function(require,module,exports){
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

},{"./expmulti.js":65,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":136,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],65:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":105,"@stdlib/math/base/tools/evalpoly":143}],66:[function(require,module,exports){
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

},{"./exp.js":64}],67:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-set-high-word":164,"@stdlib/math/constants/float64-exponent-bias":178,"@stdlib/math/constants/float64-half-ln-two":181,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],68:[function(require,module,exports){
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

},{"./expm1.js":67}],69:[function(require,module,exports){
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

},{"./factorials.json":70,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gamma":82,"@stdlib/math/constants/float64-pinf":193}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"./factorial.js":69}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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

},{"./floor.js":72}],74:[function(require,module,exports){
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

},{"./gamma_delta_ratio_lanczos.js":75,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/factorial":71,"@stdlib/math/base/special/floor":73,"@stdlib/math/base/special/gamma":82}],75:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/gamma":82,"@stdlib/math/base/special/gamma-lanczos-sum":80,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/pow":115,"@stdlib/math/constants/float64-e":175,"@stdlib/math/constants/float64-eps":176,"@stdlib/math/constants/float64-gamma-lanczos-g":180}],76:[function(require,module,exports){
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

},{"./gamma_delta_ratio.js":74}],77:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":146}],78:[function(require,module,exports){
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

},{"./gamma_lanczos_sum_expg_scaled.js":77}],79:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":146}],80:[function(require,module,exports){
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

},{"./gamma_lanczos_sum.js":79}],81:[function(require,module,exports){
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

},{"./small_approximation.js":83,"./stirling_approximation.js":84,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/floor":73,"@stdlib/math/base/special/sin":131,"@stdlib/math/base/tools/evalrational":146,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pi":192,"@stdlib/math/constants/float64-pinf":193}],82:[function(require,module,exports){
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

},{"./gamma.js":81}],83:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":177}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/constants/float64-sqrt-two-pi":196}],85:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":66}],86:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":61,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/constants/float64-pi":192}],87:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/pow":115,"@stdlib/math/constants/float64-max-ln":187,"@stdlib/math/constants/float64-min-ln":190}],88:[function(require,module,exports){
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

},{"./finite_gamma_q.js":85,"./finite_half_gamma_q.js":86,"./full_igamma_prefix.js":87,"./igamma_temme_large.js":90,"./lower_gamma_series.js":92,"./regularised_gamma_prefix.js":94,"./tgamma_small_upper_part.js":96,"./upper_gamma_fraction.js":97,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/floor":73,"@stdlib/math/base/special/gamma":82,"@stdlib/math/base/special/gammaln":100,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/pow":115,"@stdlib/math/constants/float64-max":188,"@stdlib/math/constants/float64-max-ln":187,"@stdlib/math/constants/float64-pinf":193,"@stdlib/math/constants/float64-sqrt-eps":195,"@stdlib/math/constants/float64-sqrt-two-pi":196}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/special/expm1":68,"@stdlib/math/base/special/gamma":82,"@stdlib/math/base/special/gammaln":100,"@stdlib/math/base/special/log1p":109}],90:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":61,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/constants/float64-pi":192}],91:[function(require,module,exports){
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

},{"./gammainc.js":88}],92:[function(require,module,exports){
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

},{"./lower_incomplete_gamma_series":93,"@stdlib/math/base/tools/sum-series":149}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/gamma":82,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":78,"@stdlib/math/base/special/gammaln":100,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/max":111,"@stdlib/math/base/special/min":113,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/constants/float64-e":175,"@stdlib/math/constants/float64-gamma-lanczos-g":180,"@stdlib/math/constants/float64-max-ln":187,"@stdlib/math/constants/float64-min-ln":190,"dup":50}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{"./gammap1m1.js":89,"./small_gamma2_series.js":95,"@stdlib/math/base/special/powm1":123,"@stdlib/math/base/tools/sum-series":149}],97:[function(require,module,exports){
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

},{"./upper_incomplete_gamma_fract":98,"@stdlib/math/base/tools/continued-fraction":140}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/sinpi":133,"@stdlib/math/base/special/trunc":136,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/constants/float64-pi":192,"@stdlib/math/constants/float64-pinf":193}],100:[function(require,module,exports){
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

},{"./gammaln.js":99}],101:[function(require,module,exports){
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

},{"./kernel_cos.js":102}],102:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":143}],103:[function(require,module,exports){
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

},{"./kernel_sin.js":104}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"./ldexp.js":106}],106:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":57,"@stdlib/math/base/utils/float64-exponent":151,"@stdlib/math/base/utils/float64-from-words":153,"@stdlib/math/base/utils/float64-normalize":161,"@stdlib/math/base/utils/float64-to-words":169,"@stdlib/math/constants/float64-exponent-bias":178,"@stdlib/math/constants/float64-max-base2-exponent":186,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":185,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":189,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],107:[function(require,module,exports){
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

},{"./ln.js":108}],108:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-set-high-word":164,"@stdlib/math/base/utils/float64-to-words":169,"@stdlib/math/constants/float64-exponent-bias":178,"@stdlib/math/constants/float64-ninf":191}],109:[function(require,module,exports){
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

},{"./log1p.js":110}],110:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-set-high-word":164,"@stdlib/math/constants/float64-exponent-bias":178,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],111:[function(require,module,exports){
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

},{"./max.js":112}],112:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],113:[function(require,module,exports){
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

},{"./min.js":114}],114:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],115:[function(require,module,exports){
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

},{"./pow.js":118}],116:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-set-high-word":164,"@stdlib/math/base/utils/float64-set-low-word":166,"@stdlib/math/constants/float64-exponent-bias":178}],117:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/base/utils/float64-set-low-word":166}],118:[function(require,module,exports){
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

},{"./log2ax.js":116,"./logx.js":117,"./pow2.js":119,"./x_is_zero.js":120,"./y_is_huge.js":121,"./y_is_infinite.js":122,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/sqrt":135,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-get-low-word":159,"@stdlib/math/base/utils/float64-set-low-word":166,"@stdlib/math/base/utils/float64-to-words":169,"@stdlib/math/base/utils/uint32-to-int32":172,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],119:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":105,"@stdlib/math/base/tools/evalpoly":143,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-set-high-word":164,"@stdlib/math/base/utils/float64-set-low-word":166,"@stdlib/math/base/utils/uint32-to-int32":172,"@stdlib/math/constants/float64-exponent-bias":178,"@stdlib/math/constants/float64-ln-two":184}],120:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":57,"@stdlib/math/constants/float64-ninf":191,"@stdlib/math/constants/float64-pinf":193}],121:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":157}],122:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-pinf":193}],123:[function(require,module,exports){
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

},{"./powm1.js":124}],124:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/expm1":68,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/trunc":136}],125:[function(require,module,exports){
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

},{"./rempio2.js":127}],126:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":73,"@stdlib/math/base/special/ldexp":105}],127:[function(require,module,exports){
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

},{"./kernel_rempio2.js":126,"./rempio2_medium.js":128,"@stdlib/math/base/utils/float64-from-words":153,"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/base/utils/float64-get-low-word":159}],128:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":129,"@stdlib/math/base/utils/float64-get-high-word":157}],129:[function(require,module,exports){
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

},{"./round.js":130}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{"./sin.js":132}],132:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":101,"@stdlib/math/base/special/kernel-sin":103,"@stdlib/math/base/special/rempio2":125,"@stdlib/math/base/utils/float64-get-high-word":157}],133:[function(require,module,exports){
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

},{"./sinpi.js":134}],134:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/base/special/copysign":57,"@stdlib/math/base/special/cos":59,"@stdlib/math/base/special/sin":131,"@stdlib/math/constants/float64-pi":192}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"./trunc.js":137}],137:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":55,"@stdlib/math/base/special/floor":73}],138:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float32-smallest-normal":174,"@stdlib/math/constants/float64-eps":176}],139:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float32-smallest-normal":174,"@stdlib/math/constants/float64-eps":176}],140:[function(require,module,exports){
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

},{"./basic.js":138,"./generators.js":139,"@stdlib/utils/detect-generator-support":202}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{"./evalpoly.js":141}],143:[function(require,module,exports){
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

},{"./evalpoly.js":141,"./factory.js":142,"@stdlib/utils/define-read-only-property":200}],144:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35}],145:[function(require,module,exports){
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

},{"./evalrational.js":144}],146:[function(require,module,exports){
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

},{"./evalrational.js":144,"./factory.js":145,"@stdlib/utils/define-read-only-property":200}],147:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-eps":176}],148:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-eps":176}],149:[function(require,module,exports){
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

},{"./basic.js":147,"./generators.js":148,"@stdlib/utils/detect-generator-support":202}],150:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":157,"@stdlib/math/constants/float64-exponent-bias":178,"@stdlib/math/constants/float64-high-word-exponent-mask":183}],151:[function(require,module,exports){
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

},{"./exponent.js":150}],152:[function(require,module,exports){
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

},{"./indices.js":154}],153:[function(require,module,exports){
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

},{"./from_words.js":152}],154:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],155:[function(require,module,exports){
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

},{"./high.js":156}],156:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],157:[function(require,module,exports){
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

},{"./get_high_word.js":155}],158:[function(require,module,exports){
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

},{"./low.js":160}],159:[function(require,module,exports){
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

},{"./get_low_word.js":158}],160:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],161:[function(require,module,exports){
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

},{"./normalize.js":162}],162:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":35,"@stdlib/math/constants/float64-smallest-normal":194}],163:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":156}],164:[function(require,module,exports){
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

},{"./set_high_word.js":165}],165:[function(require,module,exports){
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

},{"./high.js":163}],166:[function(require,module,exports){
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

},{"./set_low_word.js":168}],167:[function(require,module,exports){
arguments[4][160][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":160}],168:[function(require,module,exports){
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

},{"./low.js":167}],169:[function(require,module,exports){
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

},{"./to_words.js":171}],170:[function(require,module,exports){
arguments[4][154][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":154}],171:[function(require,module,exports){
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

},{"./indices.js":170}],172:[function(require,module,exports){
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

},{"./uint32_to_int32.js":173}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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


},{}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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

},{"./define_read_only_property.js":199}],201:[function(require,module,exports){
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

},{"@stdlib/utils/eval":203}],202:[function(require,module,exports){
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

},{"./detect_generator_support.js":201}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){

},{}],206:[function(require,module,exports){
arguments[4][205][0].apply(exports,arguments)
},{"dup":205}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
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

},{"base64-js":204,"ieee754":227}],209:[function(require,module,exports){
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
},{"../../is-buffer/index.js":229}],210:[function(require,module,exports){
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

},{"./lib/is_arguments.js":211,"./lib/keys.js":212}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],213:[function(require,module,exports){
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

},{"foreach":223,"object-keys":232}],214:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],215:[function(require,module,exports){
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

},{"./helpers/isFinite":216,"./helpers/isNaN":217,"./helpers/mod":218,"./helpers/sign":219,"es-to-primitive/es5":220,"has":226,"is-callable":230}],216:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],217:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],218:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],219:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],220:[function(require,module,exports){
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

},{"./helpers/isPrimitive":221,"is-callable":230}],221:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){

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


},{}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":224}],226:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":225}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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

},{"./isArguments":233}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
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
},{"_process":207}],235:[function(require,module,exports){
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
},{"_process":207}],236:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":237}],237:[function(require,module,exports){
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
},{"./_stream_readable":239,"./_stream_writable":241,"core-util-is":209,"inherits":228,"process-nextick-args":235}],238:[function(require,module,exports){
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
},{"./_stream_transform":240,"core-util-is":209,"inherits":228}],239:[function(require,module,exports){
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
},{"./_stream_duplex":237,"./internal/streams/BufferList":242,"./internal/streams/destroy":243,"./internal/streams/stream":244,"_process":207,"core-util-is":209,"events":222,"inherits":228,"isarray":245,"process-nextick-args":235,"safe-buffer":252,"string_decoder/":246,"util":205}],240:[function(require,module,exports){
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
},{"./_stream_duplex":237,"core-util-is":209,"inherits":228}],241:[function(require,module,exports){
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
},{"./_stream_duplex":237,"./internal/streams/destroy":243,"./internal/streams/stream":244,"_process":207,"core-util-is":209,"inherits":228,"process-nextick-args":235,"safe-buffer":252,"util-deprecate":264}],242:[function(require,module,exports){
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
},{"safe-buffer":252}],243:[function(require,module,exports){
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
},{"process-nextick-args":235}],244:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":222}],245:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],246:[function(require,module,exports){
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
},{"safe-buffer":252}],247:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":248}],248:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":237,"./lib/_stream_passthrough.js":238,"./lib/_stream_readable.js":239,"./lib/_stream_transform.js":240,"./lib/_stream_writable.js":241}],249:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":248}],250:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":241}],251:[function(require,module,exports){
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
},{"_process":207,"through":263}],252:[function(require,module,exports){
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

},{"buffer":208}],253:[function(require,module,exports){
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

},{"events":222,"inherits":228,"readable-stream/duplex.js":236,"readable-stream/passthrough.js":247,"readable-stream/readable.js":248,"readable-stream/transform.js":249,"readable-stream/writable.js":250}],254:[function(require,module,exports){
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

},{"es-abstract/es5":215,"function-bind":225}],255:[function(require,module,exports){
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

},{"./implementation":254,"./polyfill":256,"./shim":257,"define-properties":213,"function-bind":225}],256:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":254}],257:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":256,"define-properties":213}],258:[function(require,module,exports){
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
},{"./lib/default_stream":259,"./lib/results":261,"./lib/test":262,"_process":207,"defined":214,"through":263}],259:[function(require,module,exports){
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
},{"_process":207,"fs":206,"through":263}],260:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":207}],261:[function(require,module,exports){
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
},{"_process":207,"events":222,"function-bind":225,"has":226,"inherits":228,"object-inspect":231,"resumer":251,"through":263}],262:[function(require,module,exports){
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
},{"./next_tick":260,"deep-equal":210,"defined":214,"events":222,"has":226,"inherits":228,"path":234,"string.prototype.trim":255}],263:[function(require,module,exports){
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
},{"_process":207,"stream":253}],264:[function(require,module,exports){
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
