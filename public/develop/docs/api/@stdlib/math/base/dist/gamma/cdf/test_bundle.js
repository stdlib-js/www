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

},{"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":48}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":159}],14:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":161}],18:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a degenerate distribution with mean value `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 3.0 );
* // returns 0.0
* @example
* var y = cdf( 4.0, 3.0 );
* // returns 1.0
* @example
* var y = cdf( 3.0, 3.0 );
* // returns 1.0
* @example
* var y = cdf( NaN, 0.0 );
* // returns NaN
* @example
* var y = cdf( 0.0, NaN );
* // returns NaN
*/
function cdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return (x < mu) ? 0.0 : 1.0;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":10}],19:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - constant value of distribution
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*
* y = cdf( NaN )
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return nan;
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated cumulative distribution function
	*
	* @example
	* var y = cdf( 10.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return (x < mu) ? 0.0 : 1.0;
	} // end FUNCTION cdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":21,"@stdlib/math/base/assert/is-nan":10}],20:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dist/degenerate/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dist/degenerate/cdf' );
*
* var y = cdf( 2.0, 5.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/math/base/dist/degenerate/cdf' ).factory;
*
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":18,"./factory.js":19,"@stdlib/utils/define-read-only-property":166}],21:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for a degenerate distribution with an invalid constant value.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = cdf( 3.14 );
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

var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns ~0.865
* @example
* var y = cdf( 2.0, 3.0, 1.0 );
* // returns ~0.323
* @example
* var y = cdf( -1.0, 2.0, 2.0 );
* // returns 0.0
* @example
* var y = cdf( +Infinity, 4.0, 2.0 );
* // returns 1.0
* @example
* var y = cdf( -Infinity, 4.0, 2.0 );
* // returns 0.0
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
* @example
* var y = cdf( 2.0, -1.0, 1.0 );
* // returns NaN
* @example
* var y = cdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function cdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( alpha === 0.0 ) {
		return x <= 0 ? 0.0 : 1.0;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	if ( x === PINF ) {
		return 1.0;
	}
	return gammainc( x * beta, alpha );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gammainc":61,"@stdlib/math/constants/float64-pinf":161}],23:[function(require,module,exports){
'use strict';

// MODULES //

var degenerate = require( '@stdlib/math/base/dist/degenerate/cdf' ).factory;
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 0.5, 0.1 );
* var y = cdf( 12.0 );
* // returns ~0.879
* y = cdf( 8.0 );
* // returns ~0.794
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
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a gamma distribution.
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
		if ( x <= 0.0 ) {
			return 0.0;
		}
		if ( x === PINF ) {
			return 1.0;
		}
		return gammainc( x * beta, alpha );
	} // end FUNCTION cdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":25,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/degenerate/cdf":20,"@stdlib/math/base/special/gammainc":61,"@stdlib/math/constants/float64-pinf":161}],24:[function(require,module,exports){
'use strict';

/**
* Gamma distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dist/gamma/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dist/gamma/cdf' );
*
* var y = cdf( 2.0, 8.0, 3.0 );
* // returns ~0.256
*
* y = cdf( 0.0, 1.0, 1.0 );
* // returns 0.0
*
* var mycdf = cdf.factory( 2.0, 0.5 );
* y = mycdf( 6.0 );
* // returns ~0.801
*
* y = mycdf( 2.0 );
* // returns ~0.264
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":22,"./factory.js":23,"@stdlib/utils/define-read-only-property":166}],25:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for an invalid gamma distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = cdf( 2.1 );
* // returns NaN
*/
function cdf() {
	return NaN;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{}],26:[function(require,module,exports){
module.exports={"expected":[0.9999989246701543,0.995644157994041,1.370315884770053e-9,0.8036604127809511,0.999999999999995,0.999999999996979,0.687347498180948,0.9280029666317515,1.7481059919864017e-5,0.13484769994564283,1.0,0.017270718529702963,0.6421206339186496,0.9999999999999992,1.0,1.0,9.692400185669416e-11,0.9910860793481173,0.9999999995062949,0.9952572287215812,0.9999999999999726,1.0,0.9999129139003338,0.1932841813264114,1.0,1.581644551025801e-22,1.0,0.9999996597125574,0.9999999999999998,1.0,1.8114380418873871e-7,0.9999999964657765,1.0,0.9999999999944053,0.9999478256351452,0.9998603965291327,0.9953774545733892,0.999999999993264,1.0,0.930972018619988,0.9999584871949324,0.9886221362814585,1.0,1.0,0.0002881594363189828,0.999805154871375,0.017354072393146836,1.402816751295961e-7,1.0,0.9999849803841713,1.0,0.9999999928497604,0.9999999999217394,0.9999975061966248,1.0,0.9179301754318578,1.0,0.999999982239311,0.9946040643259765,0.025438514460167157,0.9999999999999997,1.4756143978344524e-39,1.0,0.9999999999999994,1.0,0.9999994119979018,1.0,1.0,0.9999999740994926,1.0,0.9718437685303675,0.0007781804738579752,0.999999257277098,1.0,0.9998580191850512,9.54748651655218e-7,0.9999999999957985,0.9806816120392284,1.0,0.01393594572095799,0.9999576520319174,1.0,1.0,0.9998559665314587,0.9984611768579998,0.9998276894007818,0.9999958839817203,0.9999675216072205,1.0,1.0,0.9999565590364391,0.9996841949445625,0.9999999999999274,1.0,0.00017560329813736625,0.9955555153770366,0.9996201893267808,0.8415084355399995,0.5427506985125942,0.0048868545415812065,0.9994944570219492,0.9999999975050751,0.9999999991346437,0.9974970774277824,1.0,0.9999999493076831,1.0,1.0,0.9996040561856366,0.999985546099987,1.0,0.9955886849253212,1.0,1.0,0.9877889805916009,1.0,0.9922440406069138,0.9981069968703855,0.9964219315104507,0.7962905358203913,0.9603107625305454,0.9999999999657452,0.23319857627895924,3.2987768100507123e-16,0.997254851167607,1.0,0.9988636084898961,0.8882405538973486,0.6004226584437805,0.9999999991105769,1.2951025363485367e-13,0.9999999980500042,1.0,0.3739198389180219,0.990249428373448,0.9999999999672986,0.06591446664086621,9.197939702986324e-14,0.9999999995143021,0.9999999995179001,1.0,0.9819444409002714,0.050542509317323916,0.0008382799032846816,0.9999959796155536,0.99879215938208,0.9988070972984603,1.0,0.5508934038610631,1.0,0.8225741367829905,0.9985884252631514,0.9996106948659529,0.9991750732181803,0.9999978389869977,0.004832339962334285,0.31270743745439955,0.9987868568613645,0.9999999999999998,1.0,0.9999999999999777,0.9999999999942452,0.9999999999999997,0.14224450166323702,0.9714696781390612,7.39042981868069e-6,0.9999999999990438,8.86523906835917e-5,0.9999323066162318,0.4997626367919258,1.0,0.999999999996754,0.9999999999094753,0.9842857838224579,0.9997694089093196,0.818371495607892,0.9997306411262414,0.7856790936429625,0.9630149143846879,1.0,0.9999999999418421,0.9781066995959273,1.0,1.0,1.0,6.394738934074488e-5,0.9999999999931412,0.08897493656456122,0.9999893873312533,0.9991724066398636,1.0,0.9999999999847156,8.251064203271048e-7,1.0,0.9999999999999837,0.48430179865191536,0.9999999999999999,0.9999942527519167,5.867860221092838e-10,0.0033396855894819934,0.9999085379982261,1.0,0.999999998433932,0.7279073303336395,0.999996843402591,0.9999999999605609,1.0,0.8601606055941247,1.0,0.4238025188737343,1.0,0.9999997289537663,0.1043421286128056,1.0,1.0,0.9996411580414036,0.14747918806181473,1.0,1.0,0.9999999999999538,0.9342135593368943,0.9999992856812919,0.9999999980444892,0.9999999959510426,0.1394479706480307,1.0,1.0,9.351782356625682e-13,0.9999999999746594,1.0,0.9999999999939614,0.9999776490947856,0.09253139001976338,0.9971091201770317,2.6742933394477648e-5,0.9988021742124595,0.00011889060659974573,0.9999999999963085,0.9950454056045424,1.0,1.0,0.9999999999999999,0.9950810796060856,0.9999999999999989,0.9999988526417035,0.999999083141738,1.0,0.9999829848654893,3.668001123156238e-10,0.8669042072608565,0.0015649525052738292,0.9818666850151273,1.0,0.4989934690497475,0.9999034354587046,0.9999969221256997,0.9996992096674139,0.9999359014236995,0.999999999998222,1.0,0.9999998365269334,1.0,0.9802258785284743,2.1831042633864553e-5,0.14732146821250544,1.0,0.39918168047681724,1.4561937506802523e-7,3.448775250487029e-14,0.9987936772616389,1.0,0.9999993660885814,0.559434527335306,0.9999994433758158,0.1420030404262428,1.0,0.0006815968971971829,0.999986854541969,0.9999999183920711,0.03518149571751347,0.8215402875938571,0.9646908092097973,0.9887079237664735,0.9999999999999987,0.8376977010742147,0.9999999999999392,4.432524845457427e-5,2.0036012836175003e-8,0.999999948863368,1.0,0.9996694153842507,0.9999999322217272,0.999987743918199,0.9967786219250165,0.8063234741491005,1.6396354352859806e-6,1.0,0.9999979178941627,0.9159530119387537,1.0,1.0,0.9995293419933934,4.6751902940469136e-11,0.48519146345521,0.9999451186697835,0.9813799056487323,0.6365718175139664,0.9971946801035219,0.9998438219997988,0.638015059704039,1.0,0.9999999999999963,3.302774125301897e-12,0.9998560425012626,1.0,0.9999999989600908,2.700813494755553e-10,1.2288774991520826e-8,0.00857854776041395,1.0,0.9999879228647143,1.0,0.999999999697271,0.0028563981648381683,0.9451187530750242,0.9362823739126321,0.870115878902598,0.9963076974854009,1.0,0.9999999828238793,0.9983535010772242,1.0,0.9999999959712661,0.9999993894448328,0.9999999999999999,0.2655875870523712,3.9784221472992395e-13,1.0,2.393382593650403e-26,0.993486729162055,1.0,0.9999999927622264,0.9999999969995697,0.5049798579392877,0.019498615185096314,0.9999999996430425,0.997183723950162,0.9984917674995816,0.9931163525109928,0.9999999998866375,0.9463913865968687,0.9999953373683454,1.0,0.9999999999999502,0.9999999905946843,0.9704025406017952,0.9999999994503969,0.008865230754836353,3.7898778615084715e-5,0.9999999999987377,2.4445015189331872e-14,0.9999999999999999,0.9999999999341331,0.9999999999999989,0.9999623807857845,0.9999999999999999,0.9999999999999954,0.9418287609042936,0.9999932430375634,0.6573379448468462,0.9993885085639141,1.0,0.9999999999999931,1.0,0.9999992880516472,1.0,0.9999999999999906,0.9881053734751045,8.924220891190068e-7,0.9999999999955216,0.1643433934545504,0.9994942943056511,0.00011101624770780806,0.7938597235227142,0.9999953829373742,0.9471324900591632,0.9999999246905471,0.937802217925372,0.999074437684298,1.4371946160917721e-6,0.9995934402265987,0.9999999998024512,0.996269775555073,0.9509247228872392,1.0,1.0,0.3470155979965266,0.9999999998770224,0.8316481185527005,3.480662899081416e-14,1.0,0.999999999993736,0.999999790567408,0.9999999999999982,0.9999999999997625,1.0,1.0,8.184099923217521e-5,0.9973081770206951,0.9999999999999383,0.8512628262439175,0.9685805967105496,1.0,0.15713382932453854,0.9999998657858336,0.999994501039065,1.0,0.999999999922041,0.9999999999806956,7.187772686572565e-5,0.9999999999999988,5.624231124751254e-6,0.9999999995599892,0.9999750475123266,0.2445263621542465,0.21670319627054652,3.1566873882650754e-5,6.706951504501609e-7,0.9999999999999991,1.0,0.9999999949494864,0.9999999709652287,0.8918293651178423,1.0,1.0,0.9972863045255072,0.4131647497328807,1.0,0.999999999996021,0.9998991898459162,0.9999999854861275,0.9986395820445941,0.9445149484587574,2.7111344766911695e-14,1.0,1.0,0.9999999822296732,0.9994140825612985,0.15498336160420803,1.0,1.0,0.9999999999906464,0.9872327516368802,0.2705134449044432,0.999999997274605,0.9999999999704843,0.9427041024977986,0.999969958666095,0.9999999999750504,3.684662243933498e-6,0.9630512412454013,0.16709662406886638,0.020085386305263946,0.9507255193752964,0.9999999057989806,0.9998478870939718,0.9987154010735683,0.991841552727298,0.9999596602097921,0.999999999999184,0.9999991067052145,0.9999998370875787,1.0,0.9999999999981641,0.9994951165576584,0.0005939807697533281,1.0,0.9999999884502168,8.663943384097592e-24,0.9083100225223197,0.9999999999742142,1.0,0.9999999999994035,1.7274671613866734e-16,0.9999999999999999,0.9999999999999996,0.9999999999905385,0.9999699819544562,0.9999999999993421,1.0,0.9999999999999954,0.9999905645317124,0.999967781053359,0.9999999985689412,0.48295732357873344,0.337320056068156,0.9828465402924498,0.003718770386963449,1.0,0.9999915130128987,0.9999999996611744,0.9999999999999997,0.0019471901491099522,1.6179468410493927e-9,0.37852830830228107,0.9965199961936878,0.9999999999999984,0.9999515512891864,7.897083529221891e-8,3.136415971072714e-5,1.0,0.9999961331496098,0.9999999999841885,0.9999999999973351,0.9337843382683064,0.9999998966344464,0.9999999999999951,1.0,0.9999999909362322,0.999999998468585,1.0,0.9999592178793982,0.719269040717933,0.8760539675231674,0.9999999999999986,0.9846145512969622,0.000433311987234554,0.999999999997139,5.2554910900960656e-9,0.2458657798096322,0.9809176136290074,0.9999999960532336,1.0,0.008214641260732111,1.7661541125168877e-8,0.7700773873196041,0.9999995868759495,1.0,0.9999957183657999,0.9999999897949953,2.994682567857544e-10,0.9999991697540799,2.4305848749784276e-5,0.9999999999999797,0.9999040107049325,0.998040515061798,0.9999999999999998,0.9992157922000195,0.9999999938260391,0.005333225952059813,1.0,0.9999999998298631,0.999823538128031,1.5443972782913024e-5,1.0,0.9999999999999568,0.01899794969995792,0.9984253167322298,0.9981105205669123,0.999880855320345,0.8716532140592774,0.8368942834346728,0.9999858075848725,0.0014271719022729075,0.5418070404189541,1.3292784124528915e-9,0.9998158811971125,0.0567761020854949,1.0,0.07944353138930439,0.9999998841177081,0.9709883708593772,1.0,1.0,0.9999999999584215,0.9999999997716621,0.9984824883563271,0.407618386964708,0.9999982817872745,0.33946299054510565,0.024943112298927532,1.761811941963114e-5,0.7446511778898373,0.043963044875184085,0.9999999999999994,0.689519053597515,0.9999995916519834,1.0,5.467045701117829e-10,0.9998411261183286,1.0,0.9999999978664094,0.999945383681959,0.9730997634464291,1.0,0.9999999998081543,1.2696041957801237e-8,0.9999999980456099,1.7690610082396496e-21,0.9999999998413446,0.9999998787018318,1.0,0.9999999999994514,1.0,0.9999999999999991,0.9999999999457684,1.0,0.9999988780190495,1.0,0.9999999999999977,0.9999308414061904,3.6461184330940085e-14,1.0,1.0,0.2584434227200562,0.9014888653772326,8.988558313377669e-10,0.3052075935032761,0.9999999999991318,1.2285097841983854e-5,0.9997145958399047,0.03136314847040795,0.9912026061296529,1.0,0.0001403213021269002,0.9999999999993645,0.9996890773896265,0.9999999999588118,4.011340251922235e-29,0.7614229610617286,1.0,0.9999999999987418,1.0,0.5155994702067404,1.0,0.860324083276467,0.9676666344089642,0.0020803369270880013,0.9999918145018959,0.9999999999999731,0.09023831319977006,0.9999999999996604,1.0,1.0,1.0,0.9999999534488376,1.0,0.999961684482811,1.967153640191354e-11,0.9999897405888386,0.9984753231360783,0.9999999999895379,0.9999999999112102,0.0050974603164250214,1.0,0.9999982576724457,1.0,0.9999999999946391,1.0,1.0,1.0,0.997357986962973,0.9999999999978081,1.0,1.0,0.9999999999983625,0.999999969315434,0.9999999999980008,0.6919628182635629,0.9999938074195601,0.9999999994973926,0.046833202266309756,0.9999999945625507,0.9945971872601299,0.9914583556201809,1.0,3.672987646840227e-5,3.9688197114571253e-19,3.52617846153836e-24,2.9109737078718305e-8,0.003425459060958103,1.0,0.9999999999957118,0.9606774934982475,0.001175603237816362,0.9006564669371012,3.170438520188559e-20,0.3088931132040675,0.5189922270202134,0.03332987539893612,0.99931906605169,1.0,0.9999991746769915,1.0,0.997041992317868,0.26013068315456583,5.339327273830108e-5,0.3597353571298925,1.0,0.2732507191332371,0.9999999999999964,0.9803777625087747,0.9990640877759647,0.999998577980596,0.00021819414163437543,0.9999470471099557,0.9999999999075188,0.9999999999879834,0.9620113822120848,0.9998906929506441,1.0,0.998204294567134,1.528210066960213e-23,7.083130563782216e-9,1.0,0.7484983640242044,1.0,0.11391734593615144,0.9999999999786388,0.9343411504968036,0.9999999999999881,0.9999999789948775,0.9999999986839428,0.9999029393827519,0.9949483397530114,0.9999368662673359,0.9999998289513821,0.9999928371021845,0.9796231036318874,4.588869164813742e-16,0.8478095020530535,0.9999572970958513,1.1448488779696232e-6,0.9999838855013868,0.7293120068529974,4.412892784094448e-7,0.5829449906591144,0.20761347010374753,0.9999999991644145,0.9895156383243741,8.47324415453507e-6,0.9999999999968051,0.027450042078710112,0.9999999668348656,1.0,0.9999995954720908,0.999971191593111,0.9999999999997501,0.9999999999978374,0.999999999985596,0.9999999999577985,1.0,0.000507924715171798,1.0,0.056457734539980126,0.9999999999998045,0.9999999990255695,0.9946830936693792,0.31962334237873846,1.5359653592299375e-11,0.9999999999999994,0.9999999998841315,1.0,0.9979390024563184,1.0,0.9999999999996472,0.9999999999997412,0.21493513920148757,0.4516381126862229,9.444261381865482e-7,9.032730453878456e-9,0.0011772354354458174,0.9999999999953224,6.103713620847061e-30,1.0,1.0,0.9999995595059529,3.3971765096812824e-8,0.999999849681148,1.0,1.0,0.9999999999999687,0.999999998924209,0.9999999850681663,0.00010779843364594938,0.9929717087324474,0.9999999999996134,1.0,0.9999999996392267,0.9910985208096036,0.9999987907280875,0.0945919848592917,0.9989543029481396,0.9838995120700035,0.9999935628078376,1.4129105508120928e-5,0.9999978923773832,0.16777986506260442,1.0,0.9999998476155795,0.999999867383296,0.9999922338924052,0.9999999999999956,0.9999999999999987,0.041571993948740955,0.7486561024015921,0.9999987123995117,0.9999999999999142,0.0007616117727923294,1.0,0.9999999999999991,0.027520858243078327,1.6820984382613184e-41,5.168145185099073e-26,0.9821111702230114,0.03560876644775695,0.9999999999999919,1.0,1.0,0.9999999999999653,1.0,3.0614028976754973e-27,1.0,0.9999999999999999,0.00014804806094224446,0.9999999999929169,0.9999999999999998,0.894340625206807,0.9999999999562447,0.9847290377055865,9.281457350656576e-8,1.0,0.9999944222657572,0.9999999999999987,1.0,0.999999951144839,0.9997571970266486,0.9999938777336553,0.9999999928141043,0.00039871058313541364,0.9999846988743462,0.0014868455637582457,0.6930166351619031,0.9999999990968969,1.0,1.0,1.0,0.9999999999999999,0.9999995853548852,0.09059603872135626,0.7162737636678389,0.0033210889209060912,0.8980768965331699,1.0,0.07906314617571181,0.9999997647762421,1.0,1.0,0.00030336617796573103,1.0,0.9999999999999991,0.7787677798345233,0.9927396320750611,0.9999996908100353,1.0,0.9999999201446942,1.0,0.9578411296559788,1.0,0.9978897553287222,9.793168516784273e-10,0.9824105748199693,0.9996058401984838,0.9914093953812615,1.0,0.024378665361420998,1.74910500238616e-7,0.0001888420889501031,0.34038437149978457,0.9999993502401636,1.0,0.731608292474222,0.9999754980865475,0.9999999999999996,0.9998967656712687,0.0028566323062971122,0.9999999999999167,1.0,0.9868345944147914,0.9999959525497131,1.0,0.9753431505839235,0.9617325187393615,0.9999999999999999,1.0,0.9999900934190875,4.483225067503019e-8,0.5656236434038437,0.9999999984718021,1.0,0.9999999999999858,0.9889154567588411,1.0,0.9999999999999999,0.9953523341762172,1.1308786710566216e-12,0.7058845964418765,7.140189204195243e-11,0.9794132949606348,0.9903095741836767,0.9194141154218826,0.9605365677962212,0.2022555025979821,1.0,0.9999706117728078,0.9999999999985812,1.0,0.02212082353034416,1.0,8.481903980892603e-20,0.00147553785010227,0.9963651820528333,0.9999999999999041,0.8578877448426413,1.0,1.0,0.9999985373563507,0.9922403834418007,0.9999999999999911,0.9973956168990019,0.9999999999074164,6.0922426997398515e-12,0.999999903763249,0.9381140537543886,0.9999999999999994,0.997395896256902,0.9999999999999892,0.9999999999999998,0.9999960738404242,0.9999994036921864,0.999955166247113,0.0009681972735507558,0.9998677697349249,0.5655161197178755,0.9999998219902343,0.9999985728000906,0.999998751237429,1.0,1.2019565395333156e-9,0.9999996654405724,0.7670378114022338,0.001033109914730008,0.9999817019260794,0.9711126563758836,0.03744077192950745,1.0,0.9999820186551482,0.9999952660956121,0.8994797890791866,3.1183263097336956e-5,1.0,0.9999880401970667,0.9999999862675651,0.09941286439291602,0.0007853714511087325,0.567325784833747,0.9999999998745941,0.9971782362660924,0.9999999999999997,1.0,0.999999999969487,0.9419712849759867,0.9999999968103551,1.0,1.0834542985086286e-5,0.38882272467918405,0.9999999999999047,0.9634432165762234,0.9999999972561898,1.0,0.999999999840963,1.0,0.9373723685564173,1.9814982071848478e-18,1.0,1.0,0.9999999992381132,0.400590453326924,0.9999999999999806,0.006020652012399629,0.9999984594993473,0.10738538860062537,1.0,0.94320937826142,0.999799129629241,0.9999999999019674,1.0,0.9999999999935908,0.28757705153198104,0.999995529221726],"alpha":[15.69588740411907,29.83788552878746,25.642668139676058,26.88941843429727,17.70324437436347,18.815200199146087,22.754746805512234,14.268437120531598,24.25948276066617,29.858107905531426,13.09845738435313,23.60138469753581,20.603854623115332,16.253184216977616,26.422784809471484,15.125341706560377,20.328145416626498,13.238148059451586,14.48585523971551,22.199219440347452,18.47520260991682,19.657597167009378,17.884650729530463,16.78595051336098,18.55772575773534,27.282121672559793,28.383373823360813,12.878729329263553,28.556968856666177,12.540191586740228,26.392439053822837,26.443393393980635,12.2356336337918,23.427014505623383,23.157196306665885,27.606041097182327,26.850010668069796,10.879325526817357,28.628680543877465,26.313395207597466,28.04829178729434,21.831851391703573,11.407267965548877,11.4268305808426,15.5886907842536,11.183586395768241,18.919929979934373,23.704889760729415,21.816309769439766,17.498163753498357,15.572710058061801,15.821361616974151,26.22120814649762,18.398484741214137,14.861209392374231,16.488490876706408,10.09308020013702,27.030290287558962,25.698246076536563,23.738119863132184,20.266840812743947,27.415114974389624,17.666694669986857,10.610162141180801,16.67014274847383,23.80489842162383,19.94962672416635,21.17726714986539,10.470787260675309,21.623794300884434,22.279965486115337,25.662867170493982,27.937137105888972,15.101376074450133,23.758106745700196,28.70214258453396,22.032587444965415,24.42360229662571,25.375338716667898,18.17647212408189,28.817734992547877,13.56898362277195,14.860735885423786,21.221949520016686,13.60784899475183,10.798327336031432,20.9327438710502,15.934518980738428,14.952269272122951,17.292521472868533,28.186670348464325,12.854860031523492,14.929773617891865,14.432249043800525,12.512971567047915,24.931276022548197,19.495532096594324,26.1295475306547,27.32745466583614,25.026899775613455,27.038753312560715,12.318841864629388,22.540756879962007,13.8732872133044,27.367889498045624,15.535867194976362,27.386114209483807,16.784057661179368,22.544636315418316,29.80711907436609,11.548478930713646,22.25225694032226,10.14376543782773,17.082667123485425,16.40074984715994,20.931628086919964,23.585412175369566,10.528431362434304,22.825892022958698,14.641030430650442,24.88612462049952,23.318845869997304,13.622493242479612,28.42716050289486,15.836818031246537,27.78880792026608,19.35235983704526,12.014959681690751,19.97436502754029,16.212745970291458,17.954273725262077,22.69364641103786,12.443714430315428,19.20879084336303,17.742132665329784,27.664910568645528,26.327269432934802,24.29330157580193,23.770725276947214,25.46054412419808,17.516171933671394,20.000976784692043,28.712989401316136,29.234351388550603,29.534323350491487,19.27326743553657,10.147550127206198,11.629361318361688,13.879210783918786,19.402785103258687,28.309306391235122,23.915081833196695,11.679586497241967,27.286545250357147,26.465709350475866,12.605219233204576,18.387197677883805,13.23427488214854,18.134089515499703,12.713763938125805,16.353957177444997,14.125894655727059,12.828976384654869,26.724682158349026,21.670133444669105,24.765466761732284,24.306064023886876,24.22989163997398,11.790081365374409,24.703286455361248,17.789854299939172,23.09171893091287,20.757232387870125,14.816565440416166,24.523716723013326,19.56496997988466,26.20098103435697,27.41769551333615,28.581186877257633,10.309556169233778,16.109680828684322,26.20483722942413,14.079054982325964,23.71286868904256,19.161691197212424,11.053667678141306,29.03669348994304,29.54036482815492,15.565333790641006,29.25737563810591,19.01983373351461,10.386617612122674,20.08608914694829,29.658228127035827,29.838501025638358,19.57990873710544,22.027782698044437,19.058854401709745,26.882416396404555,22.191645836654338,20.32380161962201,29.46550743663716,20.814848662607982,19.94792209648314,13.743573271322695,14.402137227588439,27.091067429359693,15.556969454364946,12.13628468370198,12.151066348647724,23.972017230141113,27.73508809240014,19.900808939474434,27.512345304526203,27.830128472010372,27.8722155399352,16.00999027282821,24.439503639971093,22.88681886228879,17.355844285341377,21.627604304277565,15.217356663848909,16.061171740754734,20.640181538837457,25.664680442113305,26.222198453485372,21.149575766616337,16.832889195787722,21.440133246527154,28.11132929088297,16.608543743066644,20.199738562962995,25.117852641254565,28.196616972926822,28.86611625730282,20.059792760987246,28.124056158295822,24.511252689768284,15.927348654096644,28.343926098188614,14.002593233811837,24.445049391881952,29.638783846381962,20.883660827049706,22.130013977789385,25.45232676510463,14.08703595343642,29.400527980947007,12.527685116547701,19.598100973684097,28.496795234727678,27.30774065808104,10.336085124217664,13.209089888775267,13.845094807087591,26.16978956345635,23.100362892297625,28.6315588640827,16.12249398651266,12.588346703448593,19.634891604052655,15.743470782514258,22.15426486961907,27.747116073171494,17.232543720546207,21.15024971303908,28.746413778330414,11.261849950585576,22.561492047394577,29.465184080565344,14.911399691277992,27.990936043595394,13.076705960155355,28.705679448028157,27.350256694077736,21.53747913276878,26.523386339445384,19.760574727133115,11.434414431232138,27.471866147799595,23.132416268416293,24.785134613048136,16.502076353797698,29.64521103282209,15.42186946690451,21.237934337899134,27.317102604960088,27.453624764255203,22.36515628750912,13.548521322695466,17.500127785606722,16.868207002651555,16.679411229274127,19.263038278019945,21.153657303424097,16.049288856676192,14.7099938490505,28.93508472535528,22.884299747780116,25.50438034225838,19.094935059909485,12.690534327822505,29.656491384486312,14.140380863684348,16.001267556907163,17.747975568195784,20.699171698532922,16.29870716013808,20.716152655235938,17.0769714109915,24.985564473555115,13.78489396720127,14.235623436292432,12.404207108054859,10.622989144357131,21.47519168320791,27.64601291877453,25.165969560666476,28.98505990692621,20.144704240760593,25.004935076678535,29.88287416095114,15.87456722637189,27.643074848531228,29.65363055657072,29.3005034445242,10.709872647995944,22.55060909281459,19.513970067564994,20.42892830083767,24.81366483586708,10.673871422867558,28.314757366694035,16.53063818929644,27.22594561270189,14.727167884191502,22.601270893740917,10.180197606090665,22.582586323016965,24.52551480401427,24.979629768115778,28.418489926417863,14.257689874252936,25.910543491364173,23.959660226515492,28.478097344348882,22.407789687872167,16.3689651576148,25.430411563208423,18.203333638023867,25.570755393889893,28.40051771843577,14.604331971652726,22.50081267824871,13.641448789513273,15.68290443320957,11.66768112069069,24.652893320203255,24.42089252150594,13.422405645502584,16.748748253678013,12.18952792611708,24.617587931537543,15.61578114218625,24.497156958347162,11.69348758486148,11.113817272639608,13.906312257773227,23.58912749583823,21.061518275978965,20.71250809377581,16.02547325450456,27.49121203063517,23.33001492313852,15.103966140421221,17.671694694923353,10.58729665794048,14.88790969689183,28.088930075018908,10.478826169029638,14.579378361939096,10.209198282176635,28.185138287635702,29.642473615084203,15.536989168211704,15.082252067982264,26.094244621109276,13.996401919383663,15.440589103813744,19.6819208808463,18.92400070849808,15.242088167126893,18.690872836040164,17.16443676502025,10.08733641635185,17.669326432979872,28.740358231155433,19.15703038901619,29.77302069972336,25.807829135344157,10.218239805741742,17.609925743224906,10.859839407669662,15.56644924154893,10.588585936879884,18.431192114790356,23.832719884568192,19.476175152184897,19.690033634874368,10.342918311084507,13.593909438544468,25.331781576750934,22.165129000540915,16.95742114935635,23.363487283106778,27.32457957714572,23.943343643703088,18.99056551625804,28.468616506285343,28.624032947332303,14.38867824536073,24.580874815193425,26.82771722311869,22.37711103539663,27.517358626288363,25.861657260821822,13.82060424874155,21.107944680545657,25.602596838144827,16.275761475937387,10.655809721212016,15.692591229140088,24.500785625056473,21.136387680134924,23.883892546339926,15.389914752780292,23.105273642902176,25.838754478861546,28.408918695132662,19.936886204024766,12.98328241730859,26.99919441734633,21.834519670883576,27.688618428175616,27.85142899997674,21.53140883062737,11.805313929221729,28.4171614606494,17.463984216618236,14.343508604831525,23.330460505420024,14.633516006178692,27.4320768042178,29.321401176560414,10.708499833671947,14.731209527898574,29.636395134520875,17.071789975374507,12.827666590633093,14.585448506105795,27.091906730136678,25.41056682134846,15.901929275180118,23.64827969297221,28.065395537264276,28.53510540970486,16.783187596637422,10.841064185821171,25.81743955095736,14.376555750824442,21.278207592624526,26.08668771882077,19.07775870936588,20.06122725273258,26.002030966820364,27.04972850518036,13.003888875762343,13.088328187863887,19.117283709413115,19.479837464337237,27.1713406864095,11.006222893797602,10.531853917774106,24.020889819221978,14.258393386450226,12.37931539112019,16.97614597909942,29.636974518609822,15.347772059946951,26.01507262740984,27.235847769546453,28.779827504284526,26.1472186519233,19.463082254110855,23.77800800160057,17.76292284935188,20.884325434271908,10.196448616595779,17.52974675023527,28.459351258747382,22.250443787850777,29.317003887881743,24.04980282049117,28.025679276092042,22.40654368475014,19.117756395376748,20.182539262291286,21.179049943256324,16.096520683109116,27.81472024690524,17.810095166729994,13.84200536806425,21.964587360457607,21.223688244568976,28.254961836434727,29.627476970005937,10.146286146703375,19.42427533624681,12.250603778112236,26.315501302332432,21.506355240967785,14.339092528017847,28.242625268910118,27.24540555398354,11.492150740158781,18.908588552096756,24.133606031574473,14.549304509090057,27.07987368859274,10.216428361846589,29.949876604880817,26.963903127754662,29.33807156312237,11.589348350545032,28.536770119587604,23.270193688789607,14.395712416446166,20.254616226055866,25.39614892663316,23.490386956534067,17.403177682770988,10.882036826234716,12.797750354900401,28.85649075689287,19.595055944248315,12.46564349084506,27.87884506133759,19.0696038954512,19.89989731104387,24.565218990666374,20.80210433963603,28.650872107734532,15.736885190081162,29.002129755943926,25.06993050970721,22.137539822584177,13.509368984490653,11.102320728558851,26.692382418930492,25.025659528100444,14.489852374116303,11.744544357014973,19.379369486185816,28.208976310871037,16.80295251524528,26.57097058353845,21.117775661952905,13.977124513583457,26.83211478588167,19.395674978983696,21.217643765188612,23.306278976707485,27.197156606685816,12.141735266534788,12.991970728871408,15.720268918275476,27.120872104037556,26.300820170416735,12.15385924199063,20.963269172750962,29.320755428298064,13.491898371796278,10.89799163851076,17.661543858318886,21.119442998683514,15.278785052750997,19.834819585059922,21.947054484078137,25.998535920687154,26.83192381908322,24.051325488479524,28.008643930619883,28.868235018485876,10.142001280242322,11.986514041863746,19.94313408379126,26.91907913718618,13.913150551874018,27.500451156655338,11.343379983193893,10.292479222012174,12.886666977360104,28.705690843763854,19.24325693709428,28.88629265868341,25.74431741345121,14.774186122608324,22.895855479138774,21.238714767905634,12.1621998924318,25.74648448737546,29.60743002938567,28.347895660899717,27.158733513869887,29.575770203094827,29.293916120731286,18.876928129198234,23.069389411855973,12.56984218898098,10.938243157374373,19.632000945026565,17.36374073325745,29.339707125135735,25.105432195508683,26.598812706895494,23.21518007784444,18.51493796673074,26.97629679584152,25.378599639157407,26.288790401537696,29.798138860943975,17.78403031184684,12.060876462702495,25.84670369573228,22.929531779879433,27.570224051280814,23.279938666193924,21.69589608284427,14.125874644255333,17.014594402801023,16.4033384226843,16.450743099272902,15.304377048842884,27.917374243693622,26.38083175869596,26.100917418521735,20.685430292205957,14.695594890184758,19.490474850137982,16.514802170253603,22.369835183456168,16.257111088910776,25.482852868483818,26.18068616342287,13.822362783540658,23.118386646088158,15.379218473737883,11.362647664341736,10.173968524543282,16.512203687988446,16.182387623731,24.07310392904145,20.73034450411637,25.321747155866163,13.887325401096424,11.343067129679643,27.674448032542635,22.87554144965229,21.27110317309986,24.402326792254257,28.386985620488087,24.347280825869827,18.314368957936548,23.013485320189105,15.116229007235006,10.754479033088323,17.471233130484848,26.552791668969284,29.070073927362536,17.949681617288228,19.219431015293537,11.994671857573902,20.105369728880728,24.07769376367318,27.502433030826836,20.335016209057404,21.020976441573566,10.287348612544879,21.378508949042022,14.904573594965726,18.912583417241535,10.293488146965334,16.207772232091997,25.600269860291185,27.453347182539645,15.569148324865623,23.488864214896314,15.205622146632386,11.471219869047413,29.323876457811842,10.87553748727653,17.341256420964744,21.723857670759052,21.65678643131649,21.7000989777539,28.841445181865527,10.706171823781293,13.634880658471689,28.067287366546168,18.81367635582758,21.13927155271881,29.8194244280938,25.254359817219342,16.865062336258244,23.59726104741227,24.17302959297819,12.886162092637061,17.587966549305133,16.94107196292157,28.93436678107054,19.612868772164585,27.977241473165968,28.23999383108059,27.275345363150244,10.89941378814169,20.176833283425903,15.008117757271272,14.663887744362718,25.900166554537538,26.164564032477205,13.003495235284044,13.60218573266005,24.104851539139016,25.721628826223274,14.921607732213133,10.371790851967209,20.350803328010883,16.727268915788123,12.744129770179962,18.172761249377242,15.666277439994275,27.631460576887616,23.968978120296605,14.395202853390119,23.034194272632433,15.139322078407185,20.325610066699163,14.5188654006045,15.009222924992653,28.091715417094516,13.24710922451079,28.44606703353659,18.204525944669516,20.148430157469367,15.910231629590164,23.777936850540605,15.926245870075824,19.46798864643003,13.471553290104872,20.865005646347893,19.905871066549913,19.60585231242034,22.36935089103806,19.78205038047646,17.81931509816222,10.508138554001203,14.411139838048005,10.457650189184712,24.05938266143293,16.2854299804261,10.218009745572477,19.69302768585226,17.645659162642616,22.796963492484448,14.586849683809273,18.695217514997392,22.558366057530822,15.452132342267419,20.57684801310113,16.123183942193613,19.418233299866937,23.751570038283383,24.228796064646883,24.293821974758178,28.139837206222996,29.037329240411992,15.11537574128984,16.533509741692924,11.447074140259335,14.218612598926503,29.68227005905575,12.907101253596185,23.264645597541154,11.861662437289308,13.540422654356806,26.31024797938504,27.87741025329433,28.745642875114736,24.398086921746195,10.263013846221583,11.185907942000618,11.484462544221685,15.118346729729701,12.434281975621285,19.75845965628572,18.679405762188345,23.370964355405945,13.408029977307635,24.81641235745503,20.865767777349674,21.888950608103567,26.54341189124129,26.445715668926866,13.965503248034313,29.871636531203215,19.288906529994314,15.169414555646682,18.627974275566558,27.072284288497578,25.018232141020135,23.133727141734816,24.230736274684965,14.817067146384417,17.85831834355917,19.876109539745585,24.081482894466046,21.125086786318946,15.684819842928635,18.72298900687509,16.05360214780264,23.02865992263257,13.58277888921451,25.345503976926093,18.94470878589268,19.533134420746656,11.329360358332941,10.86503597261743,13.42587510204325,24.041052458036916,24.88919883670284,22.49041734895615,20.735704937187286,26.150206854424436,10.952759557763878,13.79461733784665,15.867462959332443,20.75581107647169,15.787259752383807,21.604793967179322,12.947405783779322,25.647405343937617,21.292651322020525,11.149434668988327,14.372416315830288,22.776166582936263,10.351564728936381,17.552435995194138,11.85026508084933,26.403385418253464,13.620877856940297,18.321427357511496,13.106551231178978,21.440049619067896,22.590188689748008,29.17430628436069,16.947577109111037,10.283438860303642,12.558110120106814,15.01286289551238,22.655466714937464,12.841029113997653,21.03052353876144,14.535663181458753,13.986909342884264,15.662913921232242,11.936855449515352,27.948635109594292,17.982436720624797,18.576539883574785,14.725185632250142,29.40662779027128,24.833692849327697,20.113530361350147,10.059547915712113,16.351303618823255,19.449428761622336,27.852099860477356,28.832784545080095,21.6136482372738,22.109312080028964,16.931345694993315,21.590067005427514,26.353455727320508,19.028656298100653,14.4858064958906,22.815544796882072,18.822191212549455,26.395127645705134,28.34686262627882,15.6043831521849,18.90624589607367,28.594832546555764,14.576796132668406,16.38860326941529,25.738215607549773,19.719804872938752,21.152202499287334,14.360538953917189,22.260308213738544,28.984437402694766,23.51729708612227,18.982943977759238,27.422572520431764,22.82704944861255,28.875851693322122,16.776786223901,12.777032548817244,25.630182609027283,12.302809808747659,29.79490910228141,22.049285844266354,16.21239157998335,29.201384610781886,25.659394232388657,13.357218638343102,11.19102435191306,21.46341055280567,29.813787268928934,29.12708030989935,25.53784798958308,13.302876182409754,27.75907720275675,19.207716699803026,18.12175167626345,27.576653505979785,28.32219653027119,10.413671620172359,27.551825260775814,10.330886645019003,26.507340639321008,28.90601815164969,18.876048011801217,25.49203573687088,12.134722180573888,20.53318196129078,23.89504192479127,19.13768391339181,24.44885239209723,21.125319162950923,20.559809419384024,18.026501367746125,10.269103757568736,17.585860950266433,17.500291634605595,17.23148788710757,12.858067900271394,24.166609572712655,23.0003580851011,27.546721498566153,17.06301323788381,11.658409762975968,11.204781022395714,26.781229642921254,25.58831196144583,22.81499954103243,14.292235793344519,28.250853393779558,29.54922635687325,29.108659675985564,15.855544985513887,23.16706308903903,29.012657033396813,27.824512393312396,16.910669545639628,20.049606055574483,27.034604230215336,29.29078028069747,16.58462370648865,12.037647762753153,11.661227495210692,22.166792701432527,21.662372179504153,17.294813429571242,11.632899054704122,21.806237082030634,10.828410355130424,28.218043244283805,24.344836100573456,23.564560580911117,20.056191917386617,18.86648281429382,26.614264854629713,13.947214119695651,25.643385407668383,20.373605266219755,12.715782864693303,13.080821905034949,15.929407744269405,26.11512183912673,19.794596130753597],"x":[2.08205239643486,3.903440442391364,0.21917391331439884,2.1767521097495024,2.7820566140420544,4.321117211444041,1.3854003429973871,1.9696211309707956,0.5082632453630165,1.965552967439237,3.5447360311110865,0.7944583062402788,1.5133162853229987,3.728687819635476,4.573541344990653,4.525729334825397,0.3118940369765799,1.2938149815169009,2.5574150868416834,1.3866061708720534,3.0995209395873715,4.263756458122189,2.5702412074765646,1.1036021930350426,3.8474134955799633,0.06507325589983681,4.950401805326501,3.2675393357088045,4.461855639598845,4.4291535190898585,0.6191899222397967,3.9835965063276255,4.150529302053654,2.50439540682824,1.671242958522352,3.831689248049057,2.2815586603683946,2.461761612214687,4.436643152265086,1.2658600048143864,3.5487417034470035,2.2545104753147993,4.6765529435703455,4.345549385587969,0.22610841820304595,1.0201218851191274,0.9615312291009415,0.38210765700080307,4.104242563021132,2.176117401090809,3.3820800226214063,2.4462545022657167,4.197210509902255,3.2296521355156482,3.104316664834741,1.0087795673059152,3.8891401136819983,2.3609388837267686,2.1520381985421233,0.8077403707335618,3.531053443965877,0.017740475427256985,3.498595686799347,3.1191715607401713,3.798664171617637,4.079252516142526,3.9894079489406553,4.079046545683496,1.7200081993341465,3.6626243455990593,1.9113613167677612,0.8687324859425849,4.210287334739698,4.880391724196097,2.1054347901944928,0.35258351691386247,3.178138009161379,1.8685024757004798,4.944222527048043,0.41868642594592,3.5963341239551694,4.979526261417173,3.6925922244578793,2.1601545129359243,1.1564960792158052,1.6333829209811157,2.844736449673402,2.0673794148585953,4.002703289822546,3.390625966799493,2.5467171576259586,2.1754736656081466,3.5551735757376166,2.9834698587196,0.1208814447537665,1.3805017983934176,2.2554822752415085,1.3170982220343175,1.41068664412334,1.0012697119473735,4.464546119397107,3.795534614014037,3.393641094023611,1.271279921059486,3.645506748366736,3.4302862870600093,4.381936464581372,3.4162493161333165,1.9978205502080448,2.487672041955089,3.693047470399261,3.468326569677579,4.562616721634347,3.438063934062435,1.0506195535360885,4.542860271272846,1.3184635177190884,0.8202148451308555,3.23304927626326,1.1291483388956558,3.2824653425179595,2.851718405907111,0.5852112077492555,0.36700639870588025,2.5980330931816384,3.3843032969462605,3.138609807746102,0.8787124558413495,1.100509736297991,2.798358876791349,0.08744503457375319,3.9795561640975743,4.042867344219091,1.7020530051854754,2.8390112769729736,3.248099433362699,1.8830795655655597,0.1366394036353058,2.8489071542852127,4.167079907959378,4.973181506819805,1.1168540788589698,1.3315664646759762,0.573578877504114,3.341006970665209,1.3512338541609614,1.8241280928117354,2.524791460182334,1.1549300260849549,4.470171458214684,2.6138336129205095,2.7085519891425482,0.9108790514612808,3.0105828885922947,2.645480737509752,0.32716448137889986,0.9280398226423281,2.2896583745434986,2.7063083002169086,4.72361205879284,4.3998307022588925,2.921332744019405,2.4612209666602536,1.8838888411930355,1.4239683491805644,0.4978450209316998,3.249534155231093,0.42991413808475265,2.455118320499973,2.2001796098162876,4.20270812481907,4.791077469975172,2.822914035348314,1.9002563201244493,2.6327532710400425,1.354054040463043,2.6134265815596014,1.3098653596830712,2.352937352107156,4.347224155915934,4.410001369328165,2.48016210375108,4.493010033734407,3.424991884723423,3.916592910924007,0.25204084536647575,3.1329516946703606,1.9148835925815921,2.2841609974066768,4.156756772143076,4.080192166123555,4.3893467124054855,0.18249732746090652,4.595971354155168,4.117590097299242,1.2824729543326008,2.8580305647859805,2.0264739435398127,0.28616276954651076,1.0051774517508827,1.8549159981382068,3.9401639995738433,3.6004981842779724,1.2897537510258306,3.5417472343462633,2.504569174970076,4.208759625194395,1.8784159750246299,3.006725250358021,0.6004234954768528,4.325772072483121,4.924367130414613,1.0230561610955669,4.801322870407149,4.4855357664248,2.0607324392477433,0.9462594210574427,3.5302580450380905,4.0940596001488485,3.3675507554853166,2.5283779587675426,2.036212078495198,2.0371250532430265,2.9284091104810663,1.5303206296238203,4.249873154959651,4.348189707597538,0.14582790354433883,2.246246432823924,4.983040637472627,3.7070271179769634,2.608095573683391,0.7275705324306003,2.296009455617576,0.9879917612071343,1.8803548754954025,0.5390570195576816,3.088886895388102,0.989032486835284,4.0037391364369155,4.204535058251865,3.449317917007515,2.4503921193462097,3.9697916054769635,4.805838158705143,4.845403229426097,4.139705046702634,2.701676830502673,0.0570991510424157,0.9077827805237737,1.211647767472046,2.8133895973638214,4.787018659986043,0.5199577912636966,2.39328417965327,4.585877934139732,2.450589277931594,2.7826225136680605,2.5385023657113184,2.5871872244077054,4.110722548219864,4.334617113162331,1.80659439591895,0.5302070981571438,0.5566477788167157,3.285832606318093,1.278921819579274,0.05782147802242954,0.0992696734734333,3.5382188638332224,4.977354423423694,4.578288223997163,1.11423833826089,4.917345781985659,0.8589673742321102,4.268239147109085,0.4780405084836681,1.6995710525150687,3.8583478953091435,0.9689539554868254,2.6280222409872858,1.38677498004522,1.138972700164479,4.226413164601145,1.377860303759495,4.058846131727579,0.8564957602776957,0.6975966106611187,4.135461145449258,4.295012392625185,2.7667507335376462,1.8346113070204773,2.705279453534547,1.1467255308676316,1.5926972323951982,0.3640189981924147,3.728907417949502,3.1632999089370006,1.3263749818081427,4.482213413338495,2.8768230309195197,2.0586125930233177,0.31530870534814515,0.5574711544800326,3.0976941470844235,1.3894307736838352,0.7920035905203804,2.3478611555202944,3.180768851117044,1.6538018877868976,3.8473547823679146,3.088561048983439,0.07865235913614543,2.019061600731964,3.4475008316396183,4.405753673822429,0.39970483363878206,0.5292154425810125,0.6616907151419749,3.748776552964237,2.0705221449867137,4.777055272978084,1.9277274672849865,1.0130255643600528,2.800969913609989,1.3000552056335346,0.7086097662256374,1.2990549906725157,3.7056445296186147,3.3067831492251964,1.9445920772595393,3.315920520468445,4.4854383807243465,4.389643646514814,3.3643597355278287,0.6060062477132278,0.15691842913053478,3.7940733960865614,0.044021509574986295,3.4012738826495426,3.8940929795768153,4.4777212571298985,3.5484521815952963,1.0961420647592601,1.2705493293448311,2.6993034411213,2.892766538267683,1.560133478907183,1.4089907599567575,2.971538893270247,1.599938909409796,3.9149792673455783,3.937384443575497,3.5673127637104916,3.9779301457872296,1.954926169400787,3.4513588082809243,1.0056659919527366,0.6791113090147527,4.521957076626585,0.07077984329315168,3.1845067369769042,2.8854457930429978,3.5044608608393437,2.0516228090247313,2.210788556451676,3.191944777997726,0.7661186719106838,3.18955517354616,1.4661211088220405,2.836361425709729,4.726419992721834,3.294402131140802,4.509926094373226,3.280803531210256,3.806556932287064,3.022293139880582,2.171147093962894,0.5069109799843863,3.2789456262203687,0.7099323960999915,1.201264366054603,0.7572444087137931,1.6438525468897536,3.466706797002237,1.594889853307122,2.1327227477934874,0.8266336611604297,1.5237620823057019,0.22152274362517987,1.9585335481631139,4.884224036591863,2.4993337302173577,2.0935075893895205,4.114853864533277,4.747169122355308,2.2863526655206066,3.939648980637327,3.275460779000067,0.13637005273675729,3.8633016707831835,2.8598192580718163,1.5436868473919652,2.453125865409551,3.8173232630777587,4.656773133065796,4.200865495536055,0.4129584315156387,1.3029189818304576,2.9798316080077223,0.6520613184892865,3.1558459107722547,4.255650504550799,0.6947360353798127,2.268493193599407,2.45924884782141,3.213651880971391,3.7639987676775544,4.135751870872403,1.1017241392882615,3.0454267639487242,0.3935887770040547,3.291167761834466,2.5483885147412044,1.1133143440756843,1.3312292510513424,0.14377984654230902,0.434571767476184,4.87450804819054,3.590452334462774,1.517159544192741,4.4658881436986615,2.861265043445073,4.653436687850619,4.953450323292525,0.9762730656468632,1.0487668731120858,4.897084092941424,3.5397440270425404,1.6152792629427137,2.2724747507058938,4.347465908170473,1.6034084845769025,0.35201649449477457,3.693226472138613,4.349474698246256,1.5141536679766554,2.3199176932622754,0.6612216331559062,4.770782017674085,4.725158115117678,2.0744441750711906,1.8919284471084175,0.9399223143822655,1.6753635157394153,2.297128501429336,1.684420998272319,1.7554492999713367,2.529245188913727,0.12919589652485852,2.0376813231265034,1.2240230471048696,0.7916963516511044,3.0255256139930067,3.0846502569105705,3.555946023293087,2.317977476865546,1.4426715452832117,4.574678117943646,3.4326442478745967,2.323535235661579,3.1910389929447645,3.907975855086261,4.487398025167304,3.133104101336235,0.44401000021639936,2.9606702305945873,2.3150906133227833,0.01927834330592737,0.8779003106782202,4.7265753256326235,4.909153441986822,3.4350835567864912,0.09082101877362914,2.7136428319038064,3.2311781978891005,2.1297627245293773,4.649756356447559,4.873145483111937,4.402677351226474,4.811329099180076,2.7267265861935543,1.814366409496747,3.159032085684794,1.5004391873573375,0.8838873408560111,1.1411893863234757,0.19292367280533518,4.75202748644365,4.784169562808178,4.424795367645604,3.7215650293248137,0.7318925040307234,0.5885778455818202,1.1771095858039482,2.9883262672599207,4.238217272413393,2.4893496395949297,0.1308942902676835,0.565348250394061,4.389152690065431,2.0485438201014916,2.405983011223748,3.248221710697866,1.2374393615222168,3.887862361347567,4.543579142847821,3.475056757702877,2.499214155556162,2.704453711083489,3.8145859281374337,1.9688204472220494,2.500934741057421,1.3659057098246552,3.6643362064900966,1.4395366104746687,0.3752623886489359,1.9337076070762216,0.24963409884688037,0.4656327053779541,2.0531333398921636,4.966325588013834,4.524612692408443,0.47172807417151796,0.6751973710607972,1.1726099014696734,1.5123572271903307,4.068160287356405,2.021851097274271,4.632902000611714,0.12298008159353446,1.7281827088819879,0.17009406858563558,3.213601590465631,1.8947659399627503,0.9934907583935992,4.652449419187211,2.1566151569391936,4.223852833500143,0.7020511557195508,4.625368400643406,3.744744797610382,1.5421788793515034,1.033504997600404,4.1849220785812635,4.326261263952321,0.6562414438986164,2.109679353822548,3.588498465702595,2.3072332305435364,1.7793579841617613,1.199026381353061,2.2171772816085964,1.2499854642490094,1.0500103970047325,0.21069940017266697,1.5286927898463465,0.5084107462002607,4.527594037734314,0.5135533034167461,3.2142709178478457,2.1249219993946977,4.49304481675754,2.9406076621744304,3.303449509715155,2.0706147119064475,3.411471596281308,0.8748700014806221,1.5788276289567083,0.6516933255804358,1.1281880624049379,0.11337280561488083,0.938813862294976,0.9083423470701368,3.1352909947561036,0.6663586580190461,4.641658838889827,4.594353862478685,0.22733492478777206,3.2645148520232095,3.907379547317791,2.6849118156796226,2.4773505631647996,1.0504256596436168,3.6700988255298106,3.827156081364124,0.4943038840992542,2.1711981966442773,0.16050051088844497,4.014685435224276,3.4386169534720934,3.5222568843754343,3.5779497547483508,4.633454229872004,4.741537025663275,3.373214111178463,4.888682412048051,2.5588257329677155,3.238669990409858,3.9316272553421716,3.4029375275502485,0.29599395945893003,4.5639884310478775,4.27814929287403,2.119790088552076,2.6392940157969558,0.1346939834853189,0.8402109539179137,4.103621004472302,0.11131709671454049,1.3939450927688413,0.5724751696749109,1.7581748929657948,4.581604763649519,0.4512533172040101,4.371066565428112,2.085548210839312,3.417274893200075,0.03699286159716264,2.6185202707887845,4.192633732867325,3.7632699546605797,3.365899016565854,1.7032578431577194,4.569556726682854,2.814537354634136,1.531817613680193,0.6985961925047668,1.3999849061296343,3.0190708193587703,0.38367579349666725,3.3347171590484237,4.206197738865239,4.575464201621196,4.255184113532056,3.932753622744658,2.8838415614153288,1.461995786895599,0.11606236699562067,2.325788303326859,1.515974567754238,4.3854843951857205,2.9257961119311995,0.5873551387304643,3.925322472273143,2.6508876763409264,4.9086080522115765,2.7551476998797653,4.944641530725668,4.742959460692844,3.687027527898957,3.585218596541261,4.836440658201232,4.430019510555093,4.547203292671894,2.368281014825283,4.065315186429341,4.5267382442865935,1.1548975845381526,3.9265770671238576,4.1841987463225925,0.6260383252567625,1.9240407589732489,2.7860628725459744,1.0043858755747115,3.577993424620355,0.3851213988597413,0.13534714778629664,0.1215771683841993,0.33243159871625183,0.5864746900009599,4.012786618225716,2.705524071686143,2.9501573445500373,1.099246484204911,1.188887106317682,0.08082501472930326,0.5210119930979795,1.1008873466184932,0.5501094185283517,2.1597919161642096,4.058883681829014,1.6490693390418876,4.897212570737488,3.1927308170805846,1.0355538262050457,0.37198223128291685,0.6652199789780766,3.7024606544328877,1.22494602697643,2.6676614197372137,1.7873837530191206,1.4637519393046805,2.0603460232440627,0.5360281804198641,2.776669238123892,2.9782270543902256,2.537885942573922,2.4405716587495907,1.3991011760303973,3.981786751094539,2.9189406446488277,0.10604572704213,0.1298024507734985,3.252351290347849,0.9360001843493138,4.430667826147717,0.7696004490735309,3.5710032361924684,1.9745833361472631,3.5379638530416124,2.9062362510838002,4.8711396468351795,1.9670288689521798,2.113317496677225,2.3043685767000035,2.724700905587729,2.040478211247283,2.3897237282663597,0.2630003966105765,0.5747263466326713,1.4403376282754121,0.37954418645957055,4.0385973446125325,1.4433664961782222,0.04627874950427491,1.2940411158323584,1.1635165953050286,4.610504434562836,2.785919049015525,0.14487107677031097,4.744918695665295,0.5563996243782376,3.6924451894609414,4.460085391245803,2.100509452299828,2.1475845800263715,2.2793617209299946,2.927180542985263,2.7548954118861957,3.2459425246119245,4.337042317039749,0.2920694627522058,4.1209744374411095,0.4333593601733188,2.94009471738375,4.616463796344079,2.083102510117026,0.9929174079713043,0.1346020671541026,3.2569932451801087,4.491657741465769,3.3130152373244526,2.6471839915121698,4.954229754984535,2.914983510072929,4.075978870258945,0.37690672668373115,0.8856662672152504,0.1277214939544391,0.03305131687207696,0.3955112744308853,4.984765098045649,0.018156375735616237,4.361728165053985,4.61351449536965,2.362520804386803,0.09526425761813839,4.033609723647959,3.9981920605481824,3.4667729148040527,4.749879706034699,3.188695199222681,3.0603476520807416,0.7820557401023209,4.145615909570535,2.1732593295007376,4.924710131926173,2.8528971719708798,1.4669492588723154,4.283721398749256,0.680811468587742,1.8595190816355667,1.2023509134718446,3.224358953408154,0.93809086276751,2.8010123273788023,1.0272870848165327,4.725688911847296,2.2897211646437734,3.262475017977542,2.813832718988629,3.2663662686020647,3.486211305030235,0.46900033243423733,1.4542395066358937,4.160511852012795,2.4157280595089095,0.4934019794861755,4.001681251686737,3.1144464174177644,0.8246942965664084,0.021101503010337863,0.008410405140574229,4.164362147319148,1.0076863641868061,2.632792675129533,2.762087436339261,4.629869771659216,3.5819637242334967,4.336542240888914,0.07662045493840419,4.99524292110753,3.8593977347433226,0.25325573087978004,4.4983700251004075,3.442854349562249,0.8487086116842513,2.536467400404503,1.5286387035766813,0.23411091206100632,4.103289453085948,2.6773999931843697,2.6680320492691676,4.856726993924517,3.62902359012148,1.2286838233698316,1.4097942383946693,4.952933740249197,0.39558640688616475,2.8168417000368673,0.3406835183145773,1.5791959727723837,2.1179647833961557,4.024107460219293,3.7169657736587935,3.8834005377854472,2.6508314279802403,4.019970282581107,0.6713027260155724,2.2085155718860996,0.43245217161505534,0.7713936601311333,3.0084889515332924,0.6340130154037082,1.5752696374014818,4.135428286367099,3.0737854561706843,0.5097220618835663,3.452699541034426,3.2683181854520083,0.9126355766212169,1.9455415609534354,1.9733118589717968,4.943583505845521,1.846550373886623,3.3842005120829057,1.5081310518241553,3.4764849247679552,3.4876975615168093,0.08377968978422468,1.4020990375398112,2.114886519248965,1.2107677791676197,2.6986173967894356,0.3471459743193628,0.34964314011534214,0.33971964257907716,1.3990199219738575,3.661153410666038,4.2367602476403405,1.2294261500877568,1.7126850025175266,2.632563478132827,1.2832015140842135,0.49141849565626283,4.168492790812204,3.5135625640913917,1.3716682593869278,3.800288866096797,3.451469499325932,1.2973896361156423,3.5267606027725074,2.7664681581298267,4.1648304540457195,3.4593184731744033,0.18513609721645508,1.2099747984613707,3.9518068878229617,3.0642781287030996,3.195518159811619,1.940456942860952,4.373267467194463,3.305693016338088,1.539945593689398,0.20152492536677502,2.003302527463242,0.09683004078531843,2.5284292735510183,2.6027414305729124,1.340267454993429,1.0580546360264265,1.1690030535205564,4.954428861082989,4.266352046327305,2.311168644759274,3.213266142683957,1.5437134468503844,2.607050601667469,0.1966858371653324,0.4200783674194164,1.0925156266045077,4.185737774821812,1.8619047304036895,2.973380615579715,3.0360790036112038,2.8547034756133884,2.5490550708067907,4.655950089642134,1.5440616486172942,3.8794500423674716,0.39267081881001253,3.846497597105106,1.4909029444093913,4.6920877670045735,2.1579980496760145,4.4729407383804665,3.2980754639010943,1.1106382909291734,4.728110502007587,3.528867527876176,0.352294011737716,2.9567899778310816,0.9990835345449733,2.568928421466902,1.982609093596458,3.22348721885227,3.4948507196921383,0.18597447874763473,4.297354358730528,1.9373402051483402,0.2698896132287165,3.3601818706450293,1.8799451779637533,0.6415066145680415,2.63304881673038,3.238054265043967,3.2529252425501234,1.3076243666460619,0.18719180961247917,4.550332220611334,1.0608663734302437,4.886868202838551,0.7373359918757538,0.8868577538310229,0.8229244360722721,3.4203934254991406,3.5678851692531834,4.447639742994727,4.574868576019114,4.061025424347662,2.8810080786382244,2.3408383738615965,4.290215594894876,0.3541016399689556,0.8424550786702278,3.0834546530711715,2.076862472241091,3.211813471836198,3.5031208174549535,4.212753961852089,4.021218209013195,2.386831789206786,0.008974964754200343,4.662812435341358,2.4474139914936597,3.754240781953566,1.1868286639613546,3.1552032042239397,0.3884246413670467,1.6033468688035413,0.8850156162366607,2.9099533613908255,1.5486292319109884,1.6695580336797344,3.3128469959420928,4.461439709471198,2.787535168371995,1.9052696430442462,3.8696082788982924],"beta":[20.183649125833043,11.81493191852046,26.682352390771094,14.334989898741522,25.865697004527505,15.152551136515306,17.909567048218804,10.211312995810431,17.627134332715066,12.175812778167163,21.539994507982236,18.27016429647548,14.506646806857507,19.199841541154807,22.12278338828289,21.725157334302068,10.064282376714928,18.056061623238495,19.902934756696908,26.192393596490305,22.959340033107118,29.63405732016676,14.884640898821644,11.954025522862167,21.45181117902052,28.759889883810747,27.853257791886378,11.969878275947243,21.411015386244415,20.72695311368934,12.787269725843293,17.00322911571824,26.71036768884693,28.968686853169014,27.91884411376337,13.274130011319771,18.518922252070436,20.192170703400095,28.898221272099853,27.081747399047543,15.178175543819673,15.009655462006064,28.816419924704824,24.723282514973516,24.110920936008135,26.48594003631809,11.353040956081927,16.906092253952952,23.360063239772927,18.681382373221446,24.788022056040017,20.247990866592467,17.455159235015216,13.908689617872486,25.802998874237083,22.206046820787606,26.063649954035483,27.97547060354453,18.79203854781919,18.811584156860285,22.73594837424487,24.307580354270677,23.212460387679272,19.44096138065578,24.990056893842354,13.588318186173538,24.014266492215572,26.0437202618846,22.339552358380796,24.299416460490676,16.80983033050719,14.46580754221558,14.513535732626387,20.615744319831627,21.66155558981454,28.21013602058311,22.21311073597279,19.106917228927372,29.51138520373071,24.132012502576682,15.25892782260204,15.891465233754488,26.24829070936441,19.478978904286546,23.45967633959419,16.296235355500176,16.84138525537659,17.922797284248425,20.155926944080793,26.918666657666023,21.1897901983558,13.217060413797164,17.79538034167327,27.611628031286312,29.513160432386442,28.926543108689074,16.79247827349262,23.69815588485434,19.533721784098226,13.97098997328348,10.628635990107123,11.818001535677176,18.77374772786727,20.93999376011758,28.898191061800024,13.486568740344733,22.127203037116516,29.024390960572944,21.002674287157742,23.44350165719861,18.629578681926688,10.537644746953823,24.147724510266837,26.916667588475292,25.540145752763166,21.531650087313096,28.014695001038568,27.30227236428202,11.675500808363353,15.64823052498122,10.446510176528033,24.458416395077784,18.479427592788717,10.10193989057683,11.209590142723753,29.37368763496695,11.33546443426583,18.59625975001716,18.891025897493087,18.981364297373528,17.923934692852256,15.764951198548971,16.74477899396119,10.2910905625596,10.22734742149748,23.676769551619735,10.119913917678446,23.996572530713735,23.36491656708776,16.626444559343238,27.822825432498888,27.278392545558795,15.414519445785984,26.395482840470322,18.063341409596564,26.162210608727946,12.3857281457907,29.51855643608298,12.141561180102368,24.06591653025705,12.684326686643752,15.20301025527328,29.280605312742285,15.521006988625231,21.584232815388464,16.2116554867957,17.307816500308093,11.802662926462633,28.309747221943194,14.569386702350467,15.337406779772342,19.21250400746661,26.753871143714786,11.292656351465094,22.023544102555988,17.635833848110266,23.560080217158234,23.118266067482658,12.050591647422554,11.075382542411557,25.130619711791088,15.186938717362239,22.696667688145414,12.769668183021059,17.3595145583278,17.35077413884218,18.231489986242092,23.98064050072673,16.501807062403444,17.017148043879594,12.85062733259393,15.124956300382708,18.83154685994887,28.69634251970737,27.0352565735107,10.05551037487586,26.00585049631713,11.763495803529143,16.7624142404677,11.853827587797268,28.47100755025238,10.871675370716233,29.245564159945374,25.611998008730012,22.275630806487783,14.87414562609462,29.71332159549369,21.991288850462137,21.475492484520334,11.455581710786511,22.453634432119223,27.048600883566056,16.67082305308794,17.384516384275408,10.53025828712586,21.608011851048193,26.631204850209738,10.55831842680156,24.1166336105,18.607717620006014,29.344986590260895,12.703611941951012,14.200788817840477,22.935490853446048,22.69837957303423,23.910373318565572,12.57063617173876,28.260464101291625,25.92584959690712,20.31500812878519,11.478318249168936,20.563880200192322,25.408178604804288,19.91892710916178,13.246540551811306,27.930036129496408,22.374597066400423,10.230862672129124,29.845593569343194,21.041962886050992,16.34963090678193,16.85460495095477,25.79269453255222,19.624526382232897,12.176951622270096,19.370398155660673,23.461911334450583,24.269383413961428,28.397609243888034,28.051951159946125,21.910009744260442,25.873052085040747,18.59707290250809,20.12051666291043,10.78232519449275,11.787828095398467,23.60769104504845,21.262873227343274,18.330902462198388,27.053865242051298,12.595166029688144,13.985267574405885,17.175613229855827,24.748665682457695,13.436017956853675,12.222108149612612,17.649737320451273,19.336025934230538,24.167546267889083,29.010864167055338,12.435063919569904,20.85154438145508,18.202795496743384,21.118413671047485,23.276210974893267,29.864931297942704,21.170182907259246,23.955292873814663,26.393161342636663,13.761944311569856,28.407714525809915,13.42452291957493,11.922997957962611,12.75609986370462,25.414326657353826,27.720860929596448,27.27917798436256,26.02141059564067,10.007494064565808,19.38093317933239,10.456723662888866,24.879740871994976,23.82054699751194,22.484384535964644,13.962754402388097,18.498019317962353,13.314727257430201,10.868949969552313,13.82886759239005,24.49806464150976,12.777389392565727,26.18000150892508,14.694840933307184,29.08862854737486,15.704814237122413,10.12461835867851,22.67584820740865,19.19050544006597,22.41954383947276,24.323789802532417,28.22428099774477,13.529923881288223,21.018209672084435,24.52369287422144,11.715220154069703,19.86137189076741,27.75486735695491,12.650998020722227,12.960091297409694,11.022694885968104,27.08351345125058,20.981569359385063,13.02335947576244,14.53597516202131,29.272119277741684,14.005863097099791,15.648545839946353,11.926760651463425,26.786491454299398,25.387427334499698,25.084093025341645,22.751662890703535,28.019193678366427,15.108002291690138,13.868256685077501,29.19524100565485,20.368429053328455,28.73237180187468,23.494590751194874,16.880940526869832,21.605758803370307,25.84379231095225,15.69772316335297,10.070306146479396,27.946743387663076,20.053480478443568,18.957674849812946,26.9285336648481,15.917755828395608,11.326977707817898,29.919814536763663,15.548342292934198,13.540674112928727,23.392130887069857,11.782890850111611,27.604548858777346,13.04439361004544,19.861510689512954,28.050551586149165,19.99366013107188,21.380768302260442,14.937056739778797,28.65263102540931,21.748604590448775,11.41552249720251,12.255782445363558,13.225068528501218,14.35067118974047,14.006680072213902,12.549216325707508,16.44356496016934,20.53712664600957,24.57933351911151,19.92650464373132,23.951464360784716,29.608289280422305,18.50808243020932,26.361720100749007,15.972432997140995,15.432972440375936,13.618833245792118,23.799359701797442,27.012625462673945,22.11376365663145,12.708780632316383,23.291552646165663,18.89808106843674,11.487995675752384,18.873401142775105,15.071173134429788,15.322732461125796,20.019414594559276,16.684177329293316,20.665475111493734,11.407140866818022,13.700709293326248,29.196047598000995,24.369209058571343,20.086255665025025,24.10488932070015,18.870285641478944,10.949277559863217,12.924528865147998,11.724804434116113,22.28432819847674,21.424645511577513,11.53114636227571,15.46572178777029,10.67327577075034,26.448594320437508,18.06606557760924,21.802303478285815,23.534484104464013,28.212513335079233,13.94379588129302,18.47450965807402,25.86374589130167,17.007826462042903,26.317234067736376,18.238711671180752,26.711753381873162,11.241652030920285,27.51807745022419,18.508981412683895,25.209367651155063,23.037364073325413,28.24302249858099,16.282349224599777,19.100358606052627,11.425518220488179,22.1061564570503,21.67616505993823,21.752897079858876,18.401952820052664,21.32279448679438,16.358530199446292,24.975600754648376,13.25539970592593,18.164945802103492,27.08503356478142,26.955925391060212,10.596681201261976,10.749943489966626,21.559491462370566,18.318960983171323,29.234363336846336,20.731973316749777,25.494766656618136,22.961360699986564,25.337657455795895,19.216790351885944,10.409966987498578,18.555628598758034,11.889324667014094,26.35102064572112,22.26914343202261,27.289287923283524,21.096234249690923,20.07208450183476,26.5145680256412,24.91334968754444,27.20436121060653,21.36979725471731,27.47466055957972,24.94526930178061,23.986916970600383,22.96681309108852,22.14497567963546,20.481305718551084,25.343337973773636,18.20111742579746,16.7911504447154,11.144782518696715,10.648163704620037,21.020851430907733,14.6046880607061,13.742870082420202,14.072050304635422,11.114573104633777,17.22207280967467,21.927164100285662,19.108602755077825,24.89927439818493,15.230943967538643,14.70994972809423,29.906250089405468,26.471188297050897,19.076845051364614,26.373233347633096,29.119821442900506,16.178433771772397,23.893464094160663,15.135682288698495,26.215986873793224,26.082791261055558,19.947721094627266,28.48429080308138,12.187584913592403,12.562367158143113,29.081044890657264,18.528282676462617,21.162050332839367,28.510077680401388,18.338443788775997,15.488437023536923,17.806638047259217,27.760232318557783,19.03932380646544,22.215548512421922,12.0090374377794,14.606313534932172,25.908324571999962,16.808029188226715,11.851615796142067,17.546550450243693,11.044943831016095,18.418418488584226,17.676739694009704,22.43312529614693,20.306163780414508,24.457769681021233,18.134446625396837,28.511777397888256,21.50377207163738,29.606320174372517,17.231224312315405,12.536230872650687,25.090571780530233,17.211119086684725,25.457480217633403,29.7319029955067,17.41357845291752,12.43052226763156,24.418689782952583,16.71943526572179,20.483074095307387,29.40403167281174,29.902046093102474,27.741160907669205,16.93112496912326,20.63347735602044,13.765750083876194,25.754758931304828,10.63268008679513,11.956158033582675,22.73339905095716,27.33895314245145,21.613514310543614,26.882306925736657,13.26701694481692,19.209189975440385,19.954073963008064,17.81784467347158,27.93117409916128,21.391095704826224,25.26368672316064,20.38922313090554,16.653548219463758,13.377029742303712,19.58196322947192,23.300915357667517,20.27926773083733,22.007098869300616,11.3653049767471,29.40796179405688,17.83052340859173,10.69666085049799,11.15351171361902,12.29709237333748,20.665537470123425,10.59693495422325,12.551539820194764,19.635531943674245,11.964082145184625,16.094942743963255,29.667002380349764,27.131194843814207,16.94144285463089,28.42105697603246,26.410654899612872,16.837870992948467,15.662728970502231,22.93418597656828,25.995669451065012,15.57476350014484,26.140662044825124,13.24058555087463,28.343468521590218,22.548112819707047,28.86314428542303,17.44401121785295,28.64896351044734,13.682374132757914,12.298413933777832,25.888775695498772,25.41748974782266,10.771554564166642,29.375242085153364,25.251408291924783,15.181601667955999,23.0294934909079,26.428756783855935,21.97649566406313,16.306765027094244,25.317645758993805,16.10270485396033,14.473914421185787,22.120001885664074,13.113326576641438,11.615503980821869,10.4873966523858,26.549244113791886,23.673972334446113,23.79782606343106,19.871227418075247,21.654139741807413,28.47966357346789,20.711840811927352,29.854198946758743,15.784787960037189,14.61066622097034,16.58769187221042,24.40429542983849,25.056706607415894,12.208724397379642,13.815163893195308,22.614627129817837,24.275064420066137,13.543392397959186,18.53243471132794,27.689449400636185,18.289001890274044,24.868485123188727,23.77963391056916,26.098980223763853,17.222653719705157,17.685945183891782,22.078394433136374,21.87245270782558,11.359208185723254,28.9788254852241,17.225238653843206,23.993579394982167,15.095776799806329,28.835662673740856,11.822147015304449,21.515959307389924,15.33849504319194,26.044536049773072,22.68297054368768,29.428356377838906,19.230370815995702,25.849433870845505,24.520110293214444,22.646882472271585,16.03624817305185,29.829169881778483,23.887509480490454,22.39256063421944,17.108220777837598,25.7210178666855,13.508467393406658,24.568255977913914,25.366317634104632,29.352616300370432,19.83816251153904,23.25648285158048,18.489875329183377,15.27778170714802,28.833457915588557,27.382288577039763,11.162532592577312,14.322062430423799,28.108996176815673,28.688433387328377,22.116708076302412,16.266438303488915,16.14475607481988,20.187560983338116,13.311931645072942,17.64588164794832,26.702821548461397,28.114072021393394,13.301446548380351,25.80703595387041,28.716271085339457,14.303328487197916,17.56588672916637,16.01662664444659,10.321479675657116,16.112019209967347,27.2705099842546,24.85745573163807,11.309238680113541,12.962923817331191,22.126376570631642,13.334630624566186,16.25224740950236,19.31629408777316,15.735268862463831,16.654896119023952,19.066854040494498,26.218503351118244,25.48886823417313,13.802168925801865,12.425831598017684,24.620102082875796,20.34459871585874,22.45425357652508,21.11723338739064,22.077831516011347,15.087797985391184,26.74059846034684,24.63426220982658,16.715158288176227,19.61641056075873,15.478400637677773,21.378581346995475,15.630544089382767,28.010287190193523,29.303954271904338,16.52187068797697,12.736567210556885,21.005564332637952,29.756728876193893,29.121822287423456,26.55742411116725,16.53603478514334,16.66255143793117,18.96054532709011,21.014082743231477,23.125908629927018,14.79844136594599,26.00010821577293,10.050441652032926,18.27197820200114,16.013936240341117,18.381685627110276,15.625503702678532,11.716423592666692,29.020574453110257,22.973831965622477,19.78698931656411,12.980626997064576,11.808283920601381,27.51832115884514,16.204165861227956,11.447130652106967,10.209797810376742,10.562240447967483,27.781663127968596,16.931039804905666,27.855668180548857,12.17458026947229,19.74303690676791,20.275388013892446,20.348498559390862,26.71935409563423,20.16993235147957,28.615003512047068,15.99092351884348,28.794352999812155,25.120673670733122,29.28737697677367,23.396695589266198,26.497060961230815,11.371332159866277,15.632667665237246,11.5986102142138,22.2855068390305,24.220325345682877,13.753505066344193,26.49725210114149,13.206213200881788,23.055043043482634,18.038897878564253,14.880725205869872,20.75813172511721,26.12783297255482,28.430102363841566,24.470273317524857,22.45590830245423,12.600192722448531,27.51181350574319,21.96851042015862,21.466901889500406,22.872073341214584,26.495422825243505,13.06966278773678,21.693044340080068,27.398922127519647,16.929657418452283,20.72809992909614,20.298943651254614,16.087745033670743,10.59681238989382,28.285272731252785,19.22726220275361,16.045416986646423,16.81004179566731,14.648947324113708,12.462059053381225,22.025520517410392,16.954791477339267,11.135384269784275,10.714643844780213,21.125724280870983,22.962474273844357,25.05322494273855,15.593876891245593,11.500278506770645,11.48841846952898,20.564776527710737,18.172870857218197,27.21719222177379,14.691688408915095,12.852354814538192,24.884662528924647,24.25309115482939,26.6800849848438,26.32123519872483,21.322245041366187,14.753735616240142,11.16286024215492,10.19402416612916,12.064293610703128,25.26004152536941,28.821254514933898,20.813304904516894,23.02111895329659,24.097293760366057,10.733451686165969,16.306429366930782,20.01287254445068,29.99227083191348,16.295956046516523,23.97546326431394,24.478031770640087,24.29904761719851,16.946964359551497,25.569272709177902,27.008135086628684,20.09772166036833,28.466751321625914,26.055901598463173,10.779572616725277,21.315581848984635,25.392481654411363,12.694263623520952,28.994464940401762,17.013931895764024,28.6638132739525,18.02392017421592,20.61915008006625,26.1784443434317,22.895278323711047,24.70838214392235,27.71457173304093,13.106536044288077,12.590377326725477,12.813386868916584,25.13877364772288,20.145207844803004,29.40815899017427,25.885239720065858,22.396861138763708,29.88581276819916,25.557173339146026,24.047796064863416,26.70553794912305,23.071286483985013,17.21774770751137,17.677926805209466,27.699763774570766,23.128070759427178,25.949627605423174,24.790189652786466,12.782651353052126,22.049885987883844,11.089720054758745,14.524817888103222,22.679319853447364,14.576916327322875,20.173096306971043,29.419879655987337,17.663504238411708,24.939731621699437,19.461998210379512,11.826543864687821,11.258449230628681,29.152913370196046,22.517407173394318,25.50066619201063,22.653050848969222,27.855557018454387,19.223999605577298,20.6395994042757,29.226622481008675,24.21856123335936,13.071089085325633,28.703092304719767,24.387154928904287,10.241570445010218,28.683267996790732,24.433485227020796,14.210295137320221,21.00908110090408,22.243734647170875,18.22284105376713,24.784162904442052,22.790005690703858,21.753947611962676,24.446736790251023,22.515908597098445,26.52359829267344,11.246133425694126,11.673420753767193,13.674667269508074,13.017002739150554,16.535773681690678,22.825488987597517,25.790376826690352,19.66118667007613,27.051680943779466,13.048299775583661,27.190417208984698,27.592795060134982,10.682215828886772,28.424423572262526,15.37176976575616,25.35839737615167,26.617280315293364,21.043282642641547,16.70260429043664,24.8814439551238,27.544501406883718,17.661732762912216,17.50750122208471,19.63171403952685,27.154164133399036,13.142192531256335,13.535248025061296,13.326218983456428,16.8236912968205,19.776432070213854,21.06690506993204,12.651137256438787,28.477146898768552,28.26280834548324,12.56361549685046,15.55299689384312,23.28121734466919,16.271789994723378,12.388927560222935,20.39182800749102,27.273327453826003,14.628242799431943,28.974292921042704,21.191669600923074,11.968112098011856,10.806539790712364,11.54086156077829,12.040550743144184,13.967745714439532,16.53058006701314,27.61401543708764,15.449987207763606,15.588915470610075,26.33214260700467,27.88624463590484,27.378002528104087,29.451792672436497,13.523090347161816,26.233876662227928,11.993371506666954,17.744310725909614,22.155980325045785,13.12157960193539,21.60858611304771,20.50502646765724,17.154533885969713,13.165502851700058,29.917860502086096,27.838111116531003,17.920832258750647,29.996557373688955,28.617281204812297,11.830976836323224,13.768366386505985,28.358911600660868,15.572383402561844,23.31393340285581,10.08526696016454,17.471208620639867,25.775695954679733,27.54103822926874,19.42224045243652,19.211542230745337,25.592109084152675,27.23814694513301,28.942114031655084,23.08481235550714,26.107837902707445,22.030661650856654,24.126137035356546,15.039948675287143,27.72902399607821,21.273836212348858,12.094534723638692,11.907825358315325]}
},{}],27:[function(require,module,exports){
module.exports={"expected":[0.9999999999980631,1.0,0.9879117648811343,0.9959826063984222,0.989279499781543,1.0,0.9999999999999895,1.0,0.9999999999436401,0.9999999993768709,1.0,0.9999999999999998,0.9999997138353978,1.0,0.9947429037416827,0.999999999999958,1.0,0.9999865597471902,0.999999999637036,0.9999998194392707,0.9999929305863101,1.0,1.3170051047104659e-9,0.9999999962436581,0.9999998974379743,1.003371078857501e-7,0.9999999999998944,1.0,0.98632989292737,0.9999999997287355,1.0,1.0,0.9999999817773382,0.9999999999999908,1.0,0.9999944414401161,1.0,0.9892714042983759,0.9999999950573509,0.9999915139392211,0.9979976535818545,1.0,0.9999999923954298,0.998107675545183,0.9999994223422419,0.9999999999889528,1.0,1.0,1.0,0.9999329287187101,0.3908484223565284,0.9999980274288796,1.0,0.9999999906971935,1.0,1.0,0.99999999999701,0.9999973567206031,1.0,0.9999999999999997,9.343844134334476e-11,0.9999999936539239,0.9998713775230872,0.9965594877147541,0.9999999996801412,0.9742700490839457,1.0,0.9999999999902188,1.0,0.9999999999993386,0.9999994157875144,0.5854821100599059,0.9999919579479111,0.9997668064540611,1.0,1.0,1.0,0.9997224962310941,0.9999999999875666,0.9848630769549771,1.0,0.2633702518135172,0.9988174204801571,0.9999847578916886,1.0,0.999999999988711,0.9999999999917574,0.999999999993653,1.0,1.0,0.9999999999346719,1.0,1.0,1.0,0.9999999999929132,0.9999999999707219,0.9999999999999646,0.9999560656888613,0.9999999999678478,0.9999999999999964,0.984446638251977,0.9999985839670557,0.017873999297566653,1.0,1.0,0.9999999998107675,0.9999999998666022,0.9985918885791666,0.9886419865280268,1.0,1.0,1.0,0.9984336265181525,0.9989125387165464,0.008956162400790396,0.9999999382681822,1.0,0.9999999959498604,0.9019460364134663,1.0,0.9999999999999999,0.9999996974319068,0.9999999999999999,0.32755249771630324,0.9999999999999972,0.9996403503965924,0.9535219074095043,1.0,0.999999999992383,0.27280894749872703,0.9999999999891191,0.9519289926353383,0.9999999999999999,0.9999999999974033,0.5801847562002065,0.06721917387841844,1.0,0.9999999999420044,0.999999916053941,0.9999712746024781,0.9999995275892383,0.9999999999999135,1.0,0.8807424340644748,1.0,0.9999481392247564,0.5150853465630043,0.9999999999995135,1.0,0.08436615781640117,0.9999609079503182,1.0,0.2394598081914638,0.999999999999999,1.0,0.9999999999999997,1.0,0.9999677656753194,1.0,1.0,0.9999984149301698,1.0,0.9999999956201401,0.9999999999958278,0.9999998500600226,1.0,1.0,0.007895426462753158,1.0,0.9998312852391487,0.9999999837219005,1.0,1.0,0.9999961024921707,0.9999999999998954,0.41082637677630796,0.9999999999799553,0.9996719256772226,0.17016539564995847,0.9999999998655521,1.0,0.999999581438305,0.9999999999192374,2.986120825689746e-9,1.0,0.9999999999999938,1.0,0.9999999999997148,0.9999999883460912,0.9999999999811642,0.9999999999892587,0.9975412816407474,1.0,1.0,0.8620840740992329,0.9999999999947832,0.9806345869579997,0.9999999658495685,0.9980401485363621,0.9884599710422577,1.0,0.9999999999989607,0.8955591349169877,0.9999999999999615,1.3847803738470165e-24,0.9998433470777045,4.073492127613766e-6,0.964371498430065,0.9999999999995643,0.999999999999959,0.9997478157623276,0.9999300371573755,0.9999999999559968,0.9999999999998511,1.0,1.0,1.0,1.0,1.0,0.9845515789956772,0.9798876205078269,1.0,0.9999763531306561,0.9999997059955001,1.0,1.0,0.9999999998925331,0.996735016141306,1.0,0.9999999999999999,1.0,0.9999999999998955,0.9991411248819749,1.0,1.0,0.4016054126023475,0.9739663499668098,1.0,0.9999999913926643,1.0,0.006450279312312009,0.9999999937559927,1.0,1.0,0.650988790163387,0.9999999999999987,1.0,0.999996992531137,0.9999999999999879,0.9999999999999987,0.9999999874577458,0.9999999999999107,1.0,0.999950026955198,1.0,0.9999999981222324,0.9999958125706484,0.9999937364866436,1.0,0.9999999246898351,0.9999999999999586,0.9740148897346117,1.0,0.9999999999999862,0.9998958461159502,0.9386028875863531,1.0,0.9999999999950187,0.9999999999991567,0.999999999999996,0.9999999999999998,0.9999941825674127,1.0,1.0,1.0,0.9999844087008565,0.9761437265470921,1.0,0.0007945233942107915,0.9999999596992243,0.9999999999874788,0.002182861790042232,1.0,0.6668370500759195,1.0,0.9875325090411995,0.9999993499490029,0.8522453211379555,0.9999999999999993,1.0,0.9999999555615825,0.9999999999999999,1.0,1.0,1.0,0.035204772929672376,1.0,1.0,0.9999890210460267,0.9999999999998548,0.02501533219599739,0.9999987615126742,0.9999921256602453,0.9999999999997481,0.9999999999999372,0.9237319105727386,1.0,0.9999999999539245,0.9999999999702359,0.9999219597704538,1.0,0.5696214829018083,0.0987387121414475,1.0,0.531740336572389,1.0,1.0,0.9467058048443743,1.0,1.0,0.9999347289268332,0.9997593004013997,0.9999999999995335,0.9999999542420356,1.0,0.9999254663705468,0.9999999999999994,1.0,0.9999925306477349,1.0,0.9999986881299568,1.0,0.9982487417878171,1.0,0.9999917177475941,0.7710955653538669,0.999999999954434,1.0,0.9843362637983356,0.9999989091020006,1.0,1.0,1.0,1.0,0.9983909125346078,0.9999999999956156,1.0,0.23535365412909445,0.9996008961034458,1.0,0.9110719998817168,0.9999999999248445,0.9999902296990738,0.9999999998789688,1.0,0.9999999999962031,1.0,0.9999997239099324,0.9992643631245233,0.9999999997132072,1.0,0.20853123205469906,0.9663196126429549,0.999999999998889,0.9999999999999999,0.999999999994189,0.9492995641351435,1.0,0.004127546297262471,0.9999999776435129,0.9999999996112643,0.9999999999999926,1.0,1.0,0.9999816493923211,0.2243984609513941,1.0,1.0,0.9999997727427321,1.0,4.915410793981503e-7,0.9999952270859427,0.08910244415536785,1.0,1.0,1.0,0.9999999999987398,0.9944393568128918,0.022402211440769645,1.0,0.9999999852420755,0.9509372329264264,0.9999999999985331,0.9994797679069976,0.998182276630839,0.9996071028772883,0.9994474620073537,1.0,0.9999999936759476,0.9999999997942158,1.0,1.0,1.0,0.999999999999999,0.9889131447658727,1.0,1.0,0.9271751620721342,1.0,0.9993517160008699,1.0,0.9999915984584922,0.9999999999999997,4.3028457426772494e-5,0.9870298613289559,0.23528171202616527,0.9999958776146689,0.9999999946457052,0.9999927923419148,1.0,1.0,0.9989744898958233,1.0,0.9999999751703026,0.9999999999814019,0.994208884083674,0.999999999999563,1.0,1.0,0.9993599278951891,0.9999999999999861,1.0,0.9999999998386424,0.9999999998975034,0.9999999999999981,1.0,0.9523462818617027,0.9999978579621641,1.0,0.9999866148149311,1.0,0.999999999999981,1.0,0.9896784083050216,0.9999999963331365,0.9999996120190183,1.0,0.9965275689213315,1.0,1.0,0.9999999999982216,1.0,0.9999999999999998,1.0,0.9999999999999977,0.9999983199300897,1.0,1.0,0.9932633042334184,0.9999999999999916,0.9995804073408595,0.9999999999999998,0.9999999999975643,0.05247594498932871,1.0,1.0,0.9999999999999952,0.9999572468588163,1.0,0.8440240626578385,0.9999999999876156,0.9999716916862849,0.9999977866494051,1.0,1.0,0.9999949415896535,0.99685361872446,0.9996482247075101,0.9999999999397112,1.0,0.999999999621615,0.8789769153593389,0.995866997940013,1.0,1.0,0.9999993117887803,0.9945881731003012,1.0,0.9929754484666731,0.9999999995952102,1.0,1.0,0.9999999999995518,1.0,0.9999736937340801,1.0,0.9999999999967227,1.0,0.999998639325188,1.0,0.9999999999999861,0.9998969336436716,0.4321618217626926,1.0,1.0,1.0,0.9987160622499097,0.9999999996795719,1.0,1.0,0.0016173523205050124,0.9999999950194932,1.0,1.0,0.0014792371833336768,1.0,1.0,0.5997623860531383,0.9999999999999992,0.592833186560095,0.9999999999999878,0.9999999993817053,1.0,0.9999999999994578,0.8131288374221715,1.0,0.9999999999861235,0.46468151969997085,0.9999868320287273,0.9994439813539073,0.9991178855692853,0.9999999999999563,0.9999999999999987,0.011044884481255955,1.0,0.9999474031482991,0.9999999452686399,0.9999999999115606,0.9999998356926952,0.9999999993681904,1.0,0.9977305067612284,0.007911385968807498,1.0,0.9999999999999793,0.999999973398345,1.0,1.0,0.9999999999999707,0.9999999991396875,0.9999999990630751,0.15374070988899596,1.0,8.028645002348039e-5,1.0,0.9985397792179829,1.0,0.10154250923469109,0.9999999999710165,0.9999999961211267,0.999998867086739,0.9999999999999986,0.9847008231174447,0.9999999998217682,0.9999999999934069,0.9999999999052298,0.9996688564026925,1.0,0.9999999940623284,0.002314485521763296,0.9999999997878555,0.9999999999999797,0.9999999999998709,4.789763211235495e-10,1.0,0.9999999983463999,0.9999977694132913,1.0,0.9999983270280401,0.9999999999999297,0.0027766445350982274,0.0016283691002625395,0.9999998516339106,7.808826856139891e-5,0.9999999999999396,1.0,0.15527684563043748,1.0,0.9999999999999771,1.0,1.0,1.0,0.9928685995328913,0.9999999999999954,1.0,0.9998417637878476,0.99999993659,0.7058169082547527,0.9999999999978479,1.0,1.0,0.9999999980023222,0.4414046675170904,1.0,0.9999999998552227,1.0,0.9999367467213329,0.9997842836906503,1.0,4.906222191645161e-6,0.9961325695002049,0.9999999999468266,0.9999999999999837,0.9999999999985029,1.0,0.9999999994060623,0.9999999999991662,0.9999999852524524,0.9999999999997301,0.9999445593364832,1.0,0.9999999999996418,0.9852049170044501,0.9999997734416226,0.9955194179643421,1.0,0.9999977905182962,0.9999754298486994,0.7742430894146273,0.9997589334718094,0.9977226559724975,0.999963885029569,0.999999999876615,1.0,0.9999999889798358,0.0018735956386779576,0.9968977111443834,0.9998678424337029,1.0,1.0,0.9983072317881257,1.0,1.0,1.0,0.9999999999999941,0.9949487660036721,0.9999999986884232,1.0,1.0,0.2761879358716127,0.9975055276103444,1.0,1.0,1.0,1.0,0.9999999988469159,0.9999999958200668,0.06351322554729036,1.0,1.0,1.0,0.14123739477443872,0.9999999985901431,1.0,0.9999999903589778,0.9999999999341918,1.0,0.9474737292116026,0.9999818442620078,0.9999999999997882,0.9910518057395756,0.9999198206806397,1.0,1.0,0.9999999999999959,1.0,0.9999999605882381,1.0,0.9999999999989809,0.9999999990670186,0.999999999999978,1.0,0.9999999926296248,0.9996234854752061,0.9999999999999564,0.8372555736089922,1.0,1.0,0.9995104327375345,0.006170139427002262,0.9999984022200985,0.9999999999999729,0.9999998905741703,0.9999999999998386,0.9966630072850828,0.9122570296916384,1.0,0.9999999999810497,0.9999999999999999,1.0,1.0,0.9999965379051382,0.9999999999372642,0.048072889126232095,1.0,0.9999998506040744,0.9999999999999692,1.0,1.0,1.0,0.9999998445917809,1.0,1.0,1.0,1.0,0.9092561896974337,0.9999999999999941,0.9999999999999798,0.9999999257464633,1.0,0.0064387525751441015,1.0,0.9999993112622513,0.9999999983863607,0.9999999999664753,0.9999999990940404,1.0,1.0,0.018593331862630083,1.0,0.9999999138913271,0.010717304568320988,1.0,0.09866844087451933,1.0,0.9849042591603743,0.988948811469312,0.9999999999999379,0.9902862937752916,1.0,1.0,0.9997016068651018,0.9999785417887362,0.9991270661207112,0.9997400855900671,0.9861544620261768,1.0,0.9978153731807107,1.0,0.9930303929021395,0.8000047180462698,0.999999998849321,0.9999653952723915,0.9941680839416059,0.8210909533448901,1.0,0.9999999992743575,1.0,0.9999994442572272,0.9999999934728412,1.0,0.9999999996413518,0.9999999999999997,1.0,0.999999980270007,1.0,0.00017154270270900278,1.0,0.9999215486061643,0.15410602572435605,0.9394603824988064,1.0,0.870479013506775,0.9999999999955955,0.9640279739206662,1.0,1.865848913926007e-13,0.6351145673735521,0.9998332014621502,1.0,0.05419702482816558,0.9999999999999988,0.9980121728875869,0.9999433396866324,0.9998690189516157,0.9999999983639892,1.0,1.0,1.0,0.999988699035327,1.0,0.47368802289516054,0.9999994118865717,1.0,1.0,0.999999999999835,0.9999999999999946,1.0,1.0,0.8724926246196224,0.9999992521779827,0.9999999999999977,0.9999999999999999,0.9998756681261108,0.9999993942782303,0.9999999997678574,0.9217361493467843,0.9999999999990884,0.07388469383317024,1.0,0.9996843371081634,0.17971753947848468,0.01816308217853417,0.9999999999995716,1.0,0.028819488224378437,1.0,1.0,0.6217587288022405,1.0,1.0,0.999999999999962,0.9999955717117396,0.9999209749441725,0.9980486090385288,0.9999999827080297,0.9999999999999984,0.999934117602613,0.9999928092168868,0.9999998274494031,0.18950345456056633,0.9672011775622188,0.9999999999988706,0.99999999996417,1.0,0.9945067567591336,0.9999999999388778,1.0,1.0,1.0,0.9999999999999938,0.9999234194467833,1.0,0.9996992811018791,1.0,0.9963341419548709,0.45203894347213414,1.0,0.986180072034947,1.0,0.007358984325349179,1.0,1.0,0.9999999999259465,0.9999999998034772,0.999973816637366,0.9999999096649843,0.999999999678233,0.8955244396230417,0.9999999999999992,0.9999999999997836,0.9999988040978985,1.0,1.0,0.9999999993510892,0.9999999999974243,0.9999999999999998,1.0,0.9999999993020445,0.9999999999856833,0.9999999999686802,0.9999999998479252,1.0,0.9999984093140095,0.9999999999984074,0.9542020168648156,0.29232947471376136,1.0,1.0,0.9999996292040938,1.0,1.0,0.9999999587840287,1.0,0.9999999977407599,0.9931117010050585,0.8858783122764001,1.0,0.9500107010855663,0.9972233380757439,0.9999962500514679,0.9694473505308765,1.0,1.0,1.0,0.33299535287088633,0.9966521683826535,0.9999999520296815,1.0,1.0,0.9614951274741443,0.9997013403663492,1.0,0.9996628808355325,0.9999999020311435,1.0,1.0,1.0,0.9999999999999994,1.0,0.99764966295665,1.0,1.0,0.9999999999999998,1.0,1.0,1.0,0.9997274049972604,1.0,1.0,0.999999984895725,0.9999999922178423,0.9899676248185015,0.963851756853929,0.9998220402230112,0.1062948168984767,0.9999998461293168,0.9999899631940695,1.0,0.9999999999997526,0.9999999999999994,0.952441641543432,0.9999999998806097,0.9999999999999786,0.9999999994411078,0.9999866406337206,0.8570079342380041,0.9999999763121401,1.0,0.9999999999992467,1.0,1.0,0.9999999999999997,1.2538611052051632e-5,1.0,0.9997669720714794,1.0,0.9999999999989,1.0,1.0,0.9999999999998762,1.0,0.9999992755861133,0.5941424334463835,0.9997684085817591,1.0,1.0,0.9999999999999999,1.0,0.999999820177141,1.0,1.0,0.999999999915086,0.9999999999999953,0.4066681655100418,1.0,0.9993861265133811,0.9999999782667583,1.0,0.987714980140724,0.999998253375254,0.9999999758405442,0.009976033681091975,0.9999999984766405,0.9999999630551026,0.9998639252329222,1.0,0.5999679369842036,0.9999999999838183,0.9999986271520152,1.0,0.9999999999999992,0.9996955069573579,0.9999999999999971,0.9995929017011734,1.0,0.005304063928802616,0.999953132453559,1.0,0.9999999793721405,0.999359886528463,1.0,0.9999999999999993,1.0,0.9772072449458047,1.0,1.0,0.9980158444958118,1.0,0.20357122880595696],"alpha":[5.7246348921179795,0.35614549366488557,9.791391908076964,9.18950791141385,5.675073329621103,1.8693648448259492,5.893609262522144,9.085956012193243,6.526090664938278,7.441949959519462,4.266544475246306,8.028434457271672,8.723768082860335,4.4590350306606545,9.747824763620107,1.7166260454586002,2.6346368711008705,7.5146015070542855,2.9742459551118583,9.000286299224683,0.41001926066252414,2.865299019988168,7.568490263843772,2.5331270266136308,4.069567888476293,3.961803892345792,0.05900257434275913,4.470620859890097,4.640899462079469,0.5678169114599707,4.28785330641942,2.615551415211277,1.1802262388883844,2.319232674763083,4.791730955157664,1.4713345427024094,0.7034974399411342,9.526393025270464,7.474693566962374,7.281393216626215,8.705804221276134,3.2292584312519,2.4712446908563512,8.806189047148989,9.611812043953334,7.61566322217158,2.1683676218092818,4.230588729009812,2.5750889009618283,7.3703395080094865,5.454930355498641,5.89106669910424,9.943385694639062,5.476668021982598,9.511513767173057,6.3664164606830775,8.11501228474792,1.9983327018752362,3.4390478954291415,3.2166120186318925,8.934270916441413,7.060049663720451,0.01405453266406731,8.784369780344326,6.6159512060177095,7.926306178169494,2.0621251464440826,5.717236116649427,2.0335930447264694,0.7096812556896004,1.6197161702556673,9.917226620832928,5.2247638268645265,9.718776091025248,6.565719369548946,1.1860693083158735,0.3545634958334998,4.947634076532785,3.9145184445069248,8.685215821674868,6.270375199180187,7.510125058838701,4.969198492362872,4.4512709182501276,8.798673783215943,2.5561583027881984,5.841526913020014,2.1924545092817005,1.4953583288864203,2.1955435610057994,9.628721504084742,5.598590411207994,6.904100549029451,3.431547357755378,6.3865618788254945,5.388567718422186,3.4518850364119746,6.13937689237932,2.095454036078128,4.466896457435201,0.2702700974188166,4.19829644694479,4.656235885796772,8.952442773411828,3.4788565511735636,9.849384509347821,5.848184878332199,2.7249483088703896,4.756548429574277,7.033686014249108,2.292025194444125,5.802902798654895,0.6331059016564455,6.908624678604891,4.86437334250237,8.306368147359995,4.103001395914347,1.4923880989279126,3.1785017590376485,3.4749237760335427,5.383108751553259,1.3533755290478888,8.453761525426263,1.0894130561663062,0.10516719558296694,3.2523014827942087,3.6925708625221576,5.942258870873863,1.0647987767528755,7.224296498126142,4.669663483621993,4.6135877041155515,6.060078701113634,2.4612620085860337,5.280089626714806,8.65708406517162,6.090408906746982,5.509961730234865,3.31276978252395,0.05564269860616422,6.708850977763765,9.788619048815947,7.149314797046909,2.520131741238536,2.541137487663645,4.370217689721141,7.086298879400131,2.357170348695665,4.2529866634443625,7.341021540153436,2.816906620599433,4.0151688612125325,9.252203429891445,7.489098599841684,0.13778532857724235,8.680990001284336,3.2636601772261,9.059562802653216,0.8282988658580615,8.304416668072076,7.394742832353909,2.356728103400494,7.176349676211549,1.19646506172973,2.811972157568561,7.143724853072817,3.9160388506582122,9.54162012758982,3.1052814922804783,5.740150136496684,0.03745952682509879,2.544791745968362,5.04177023094901,5.749798737831949,0.9157691341066787,8.608410193087758,9.112253872389955,7.789478080418625,3.539156019759633,1.8471592642290724,6.926605909657971,9.463937776210651,5.105616260066725,8.019501805693015,4.6256424443741455,1.8385663321830803,6.7489135212283085,6.691491302304799,1.403584317387765,2.238075765163414,8.367473725746796,2.1702954393413942,1.459845455537776,4.817750607469362,2.3111146751502942,7.658441566335066,8.546520001529192,9.71812360543617,8.865052417356804,3.4894910051028094,0.39154348729991684,0.5714806625367497,2.8508107919759107,8.546726186941292,7.789546395519988,9.405251139398326,7.337133074407671,6.3466400818158935,0.16310872026531475,0.7106712843825025,1.3576528790579134,2.9179052279173834,0.733786572300712,8.092134100230686,0.890096929467159,0.9306093728167242,9.731306732887873,1.7219819081241927,6.566895849816651,9.666301863063158,4.039870358258037,4.3522768648871235,8.529164858171196,7.105596605268111,6.668440547067687,3.852718987057848,2.185432978723656,8.494580205094381,4.836388797301463,2.646623976828182,0.3996788542646734,1.9015866104800883,7.779159932938942,5.992145330844563,0.6344708953290246,9.93311083628936,9.340194846376315,5.420859442395249,4.574907145106122,4.1349060965805196,4.281100725703125,6.8183415061128,3.285597954421895,1.1855591563368706,3.243412322187069,8.978490291289631,7.240218292299579,0.3417523939163747,2.804133206781292,3.635444919926747,1.993288987849462,4.05712603919836,0.4906929401813165,6.138638432650461,3.938308680339062,2.5759111992062533,8.812475540651041,0.7438892341554704,2.928235677682647,9.86103661077992,1.8919617789310372,5.836676639328855,8.54026475223139,5.402305593840289,6.503727712238101,3.6213165169694728,2.1911045522758843,0.38168063752230363,7.512974775124888,2.549240077577166,2.503047152521678,4.322980383197461,7.216059690665317,1.7277370765948996,4.739802100629101,8.776126780936393,8.926290407844707,3.7635764296412866,6.478949686225368,0.5478907495070984,5.333878767437921,9.339775046353045,1.5185167228755048,5.489962518785094,0.6880061460149145,1.4246064794686708,7.3542907967719895,5.396877387268755,3.933473737818798,0.7377584135892423,3.6613399288352833,4.409916681833394,1.0359373153013363,1.444847397300466,0.9410609013823446,9.167382361869997,8.33542329327572,9.955985867655228,8.202959071611653,6.031166867384301,9.058213260269811,8.115597989011034,7.398006176400889,4.047399310087365,5.84730949665283,4.221415658492393,0.3808961160270852,3.176313780589075,7.039111968817444,1.1249277937784785,1.099404562177455,8.943489358788263,6.7331290019107115,1.5755146451452773,9.887447752198549,2.127041809064314,1.9572997100711542,6.961806633058267,7.23030722103119,0.8263932677048613,5.5124619090015265,1.6663275558938717,9.084406111192715,8.329822645306601,0.03455959676892828,4.292467096878996,4.857582653888201,9.184695802860144,1.2621292780579174,1.4793075097211705,8.951353375657675,8.923860228153352,7.559613464721846,6.8261628206648535,3.3951727260660403,6.685915001016203,6.878712395154823,5.034550639956987,6.803895843731125,8.744883336758583,0.23892913898068358,6.267103830715883,0.8550521725022264,4.846140383514605,9.31057136556532,1.7545435812804655,5.900711838983048,7.020539855209343,1.5309608397800711,8.020460851481136,8.204205285444885,3.5217574474121816,1.8324946782776963,9.315277517212879,3.5616432081633542,1.174750338950321,6.710392862203318,8.629347191477354,8.530414867300086,2.3502654185810257,4.162050926641125,4.333639037368324,6.482213300077852,9.98827703727998,5.518364583638176,5.174642784009425,1.8287158670047687,4.922144097068379,6.99677726397788,8.281152245189071,3.8986234035532163,2.2884562981858836,7.02770769662725,5.494195774307404,2.15426052284613,9.791462390729233,9.110506490068833,0.48924412724583366,7.923526628887609,0.2032666089561097,8.950464578147756,6.210874931113075,4.26242692690979,0.34933173978412224,4.448713597200831,2.053311414064851,3.2112129327745365,2.1464551157203093,5.606016474682787,0.7275516474503863,7.238281025915397,3.808895563810344,7.387321510389335,8.721553302923335,5.837231088587056,4.590315799721559,6.170843462739761,0.15554132933973897,8.868597895597564,5.742922395897494,7.996089200117973,8.623326512002755,4.741203804719129,1.2153637662713979,1.6093285058791795,2.1316725456664787,0.11817936077365143,9.81189174803344,7.361928986520756,6.313053142366689,2.333692734663242,9.99961415603661,8.537089163403122,3.2672036375700797,4.518196163581363,8.292753300675228,3.7400861673237062,9.786330123811961,0.0070445429347443245,1.1243372003656393,5.993707485667754,7.0778108264103246,1.0166300642208137,4.881259121964141,1.4972439059004028,6.975456502675956,9.300777666294193,6.3172831058493735,0.4337062554824245,1.646183325598154,1.3419483946862476,1.4026294925568816,1.68634389302732,8.096495312054126,3.6615221215460125,9.1102334422274,4.692372586044322,0.6894828080332527,5.057187331139734,5.361795830167699,3.8704265724101172,2.3011305829710715,8.862583258643983,8.37925800343857,1.645371631822592,2.3421469887375923,4.96315783095514,6.705108480439083,5.232639226539925,3.4350296033784944,3.1217139161202545,4.610435805005952,0.3626040982132994,6.25276578573045,9.32474984496034,4.050388269537706,7.481361352846692,0.5694640387528382,2.5581879282150366,7.671340010138435,0.47679432291724666,6.593510869004067,2.260502648811895,5.5454543945311086,0.8201751696788873,2.969132309275897,0.24865559417389438,7.350709570934393,9.14564999771718,2.0552606603365797,5.425777126502458,4.090178627019152,6.0758115841853915,6.146409526325048,0.8561773120847826,6.818809899458477,4.940367623479355,5.8488330618935125,7.814416436453686,8.873469605029673,5.849096595369772,8.883800277559143,2.9026604806597778,6.911825099901918,6.186416742107898,4.999222510368733,2.3082652577055662,9.715062928355295,3.4359195050541524,7.488360821742901,7.975681175123006,5.241980620707678,0.1560041467527995,3.448420382599049,9.38907732123241,3.0135359932694272,1.7552884816516356,6.876484743382538,2.8427248642341185,2.0288366408393754,4.2828874484661945,6.539474963355962,6.29179533996834,3.7406449150673993,2.0007845631959142,6.103967976783144,4.047157214563688,7.880547032249119,6.270373711319253,0.1539963826537294,9.902175261839401,0.9149994232629055,1.922123821187518,7.004618839331764,6.615413778050301,4.022597169827941,3.026950640408017,8.509447009919098,8.032391623463909,7.383990038340058,1.3396934278222616,2.2239026094920544,7.156732624503153,5.684017771998759,6.490206153346916,7.643513135371753,7.76009482734092,6.147589138966265,1.3383280590714652,9.793937901652681,4.039510930966223,6.395530470486619,9.151157278846787,5.265232404985419,1.576053375260944,4.147447401885214,6.841495483362959,9.348675862259048,5.378277185735061,8.81159972456601,0.4859448393437549,3.9624922029401555,5.351430020882666,4.621048978391058,7.721783631507053,3.351216755948816,5.53833231083618,5.550466273833699,3.2765154989089917,0.6361775912652412,4.924707948947344,9.923660906589621,0.39842495024011493,6.2182281887991175,5.830408894896959,6.189118824104094,4.9340885324574675,9.340284599560167,8.775984257728599,3.560404310150924,1.9211609655451922,4.9494342714439155,6.6856264833783685,4.042637784199825,6.7774435764719225,9.075988897624159,8.984989321715934,2.243045552367926,2.570189926492503,3.6814239610312316,4.71520265634032,1.502452560677976,0.1158164006482787,7.67759590789574,8.058725671161746,8.544932095632555,6.534910107039334,4.310752752736469,5.751275620612677,5.572499078310285,7.167285275884751,8.528479730281067,6.578484927067361,3.9829930016602777,2.242358526645627,6.529344907925845,6.76124426425816,2.1343204577424757,1.7445763863060382,3.33390046527696,2.045038796210823,1.673997475162976,0.5359176273436961,3.6782370251567476,1.6090549147939726,0.8538017319050928,3.8355524074245606,5.488748707970976,2.229854097945172,0.9275872414563202,4.979928690907447,2.7607958209842387,6.650200726153852,3.4972305836030304,9.302411687107233,3.7686759295726002,5.902059359285355,4.214083908360566,0.35704365903992175,5.951369321185753,6.072921933706345,7.456554309486785,5.904760542852678,8.28493650478081,7.765520318740591,6.296426001538,1.250308993410656,4.535472727009275,1.3520501700696475,6.267823508939509,7.169904746817064,0.9763445351542832,6.971527443838131,2.8881531059625765,8.647638306070839,3.730526375604386,6.927538375099975,6.3253374320857,6.999926187451047,4.627986113174525,6.680724951916249,5.436911340284183,8.424581134924512,4.315068055619305,0.15730293298960252,3.9840114826621598,3.8625428121767147,6.045665899212476,0.6899371222550599,5.556857368192343,7.618830950005757,1.9979549078269265,1.495451850855316,8.387734579299552,2.5282196373901678,9.016231263888248,3.0953731512042926,7.078016316308751,5.6464739191886775,7.076029543269861,8.378768166269007,3.8732024378161456,8.178878615548225,1.9833862306535965,1.5843372619674656,8.088664765475134,7.669552859291214,4.019608855638319,0.21021170797070443,0.46512362837196175,5.170964429344771,4.738812373029184,2.68044728659959,2.2699058181555265,3.424199108910424,8.027646890021208,1.2312428880213178,3.9466791884585373,9.69572123788516,2.528016974615561,4.438705318995595,4.422046711975687,0.006359390733454706,1.6992483226669663,0.34871335490364475,5.151762405819351,7.469016687875145,1.3662855397997675,3.146778885167061,8.264030587748763,3.0238976601900514,4.760943809877327,6.945820698261169,5.851136264090133,0.774322372144487,2.0613184031567178,1.9020207149222212,3.349927509251971,9.506430776218185,5.304042244291169,4.858998803160999,0.1971800412196667,0.5040517507745568,4.259156340106374,6.224018619082054,5.749636914035738,1.6612325076395207,5.388005762568168,3.7387001733384784,8.095787549977915,0.23329437181344392,8.63462882788049,3.6838480864862544,5.286601730806588,0.4117525494811769,5.359203562328652,6.124231790675532,4.18859372049921,5.019614816024398,0.6171316693402296,3.5478108082927795,0.5298614152745063,1.116368296328596,4.02261905373831,7.929192876459639,4.141318407160455,0.7706715700855749,2.0066563143575222,4.179343138617398,1.788768502485778,5.230891409508023,0.4912929377656394,5.363675041705012,9.203817937489951,1.876373805950342,7.253684874802784,3.575878229006655,8.984567100359477,3.337855485700565,0.38416322062724273,4.7657497466774394,7.754223752109897,8.2411737597519,7.975902769768237,7.08830432077445,9.740846886293731,5.167774664847813,7.78097739781638,5.793085896017955,8.439611231734856,0.021549819685011684,8.312362624784512,3.0945410379047433,9.554586782356338,9.702235886280022,9.808207995057769,2.7343766847578355,8.56040718705475,9.388057792954516,9.246902001799185,3.154793461042147,9.539902810553775,1.4735948460299997,6.303754128399279,6.012360662008714,4.702312605675414,6.896496304582882,3.6408498581459225,6.426671786505325,4.5964711797201545,4.554432628150775,5.517923090359216,6.415620425101611,2.4987581076400933,4.5654585167335675,4.063547700936647,8.834440657199865,0.6185452209583175,0.3492496636468956,5.34703616247562,7.415570389641772,4.084806601972395,9.036352622519138,6.183607079874623,3.1618175403152216,1.1372407821450992,9.150324011954083,3.6501626505508544,1.6998026803656874,0.5898721279303754,8.01396237185198,9.655142093689555,6.880683160710907,8.670445082550152,8.432152566925149,8.695945416933705,1.206585330965566,2.620965599393399,0.9494792064994817,3.3996320870327734,1.4568676500965694,7.3466780390584185,9.484364369246796,4.453571934866369,6.120966873994,0.9702250553350211,4.843321091281201,7.618380142043808,0.5101863689444253,5.248195085696401,7.712905726146085,4.0929045773649175,1.8409809705360836,7.996119267230844,1.7525887652831007,5.536051835816458,1.3608144012235934,8.191266153878274,5.931234245272041,7.4042126545122695,3.9371981596932537,9.152478715914567,9.21836333845824,2.4089331888888976,0.21283333107200875,3.164420555541856,5.731030613314432,2.3878346605762824,9.387795909718875,3.979898879432293,3.989880936976713,1.1161640860596078,7.617600771458011,1.8376467741593294,0.2213383094112431,2.7757534119763005,1.0821533331762967,7.266083188092649,7.980477048160768,6.651485265701789,6.269948023799099,2.7941201714981823,6.806074606643142,8.820763542213824,6.433079535146797,5.508345257393796,6.697618328711339,1.9057395294391344,8.730564788573794,8.562848204542018,2.821382873923528,7.550481340472295,0.8221619584657858,1.8383173365322225,1.9980279409908897,4.774251773791558,9.922651438710071,0.7076307105656698,0.09839323905069808,3.472171517036793,2.7445595072518114,0.26631091416878805,9.416516766371593,2.1681238160956418,7.750069703900384,7.317362675065673,9.228072252715542,1.9391237812183526,3.5213548875295997,2.6679255998914053,2.028166414563477,7.82277727297198,9.491590949765484,9.364957027426152,8.6861020681552,0.22085813872105398,4.514107553664344,0.30108469212002387,3.7075048937165356,4.674610616349684,0.6039095331895705,6.230608689864143,5.306748995937573,2.03755543160395,3.5976357068936116,7.054282909857374,9.458890838679562,2.8167432604711173,9.347448987762444,1.8397936863853381,6.10231841259588,2.777519295254096,4.032719708441066,3.793828297393118,1.1954509761424958,7.166784535196853,7.492431776377016,6.234961159996435,2.1783413177096644,3.183004757475283,3.976098600342315,8.357514742775184,4.229546901780539,2.3622357416541107,7.616019429429672,8.67441194307573,9.701728372186642,6.774469569643269,9.411779968900545,1.7222591853234048,5.315776634051373,9.377144552026573,6.100898787487954,2.3690326079495394,8.893023590984154,2.308557780852949,5.076906371221721,1.673160423948441,5.366006256629694,5.045674002734508,1.5057346366828783,2.878937435457396,2.7985264185399727,3.0112987685485293,5.854910716717687,4.849391635432667,5.8122552262060845,7.674236285957359,0.3898433331844764,8.229855810487363,1.0125840481555448,0.8534128974370248,3.3637681610159986,3.0713639966290707,3.9022557923997447,2.1070367509279575,0.5906466735200322,5.277472515417543,5.248978395820362,8.014521606960251,3.4564436330704074,6.180266757329829,4.0835676762831525,5.330882121475979,4.656987145280338,0.9076551187905824,3.5482766081005446,4.286520488289232,3.769383205635317,4.711409041024302,9.879764558180922,4.339417622367751,7.627286237872289,6.503217775116008,2.4462445316056125,8.734100466152832,9.547570921289875,5.987604666673175,1.5943729516091532,5.080874833042812,2.6810746338294345,2.570085325532636,4.083270254235238,5.54651934875269,3.528110350699989,2.667820474706606,0.46577010622726345,7.072516321181633,3.1274016447925646,8.184370357001496,6.282935983252697,0.5663213561152447,2.698087963877802,4.086446429630137,9.712697287481394,6.48023641760584,2.563800696943188,6.770192043225462,5.229442697008453,9.924103707255966,4.436367964484964,9.678922879713612,5.4676521396593625,9.150905934547865,5.713221170518839,1.9027784174225126,1.377248126018149,8.686000338541987,4.876832637974616,4.118469794221207,4.7437067027439594,7.366551059324036,3.899667853139648,1.056589922005231,3.5049141202629763,1.2002019843236167,5.813197124852061,6.815191945591681,1.2063044453806238,6.128498645653946,6.287130077284202,0.230879313491279,5.428728982373647,6.008608362875285,9.344245539820326,7.750098446470606,9.91189628593369,5.249130697274014,0.7583209674967684,6.934918717209875],"x":[2.343104487334834,3.165698038466478,1.0790580318489063,1.5110674646700095,0.8842602546170442,4.844969706302229,3.615761876124328,4.3032878883247525,3.06214915283698,3.5777697591665367,4.817233366214491,3.241010186717006,1.6289822841179447,4.020567710491994,1.6528716490041462,3.144794535463671,3.45654029426266,1.9946464224330418,2.4400020337045247,3.2130904404797187,0.586949964134792,3.376638904644258,0.016942342032421065,1.2676203441657286,2.10012870459508,0.00245882856588997,2.0570411625527987,3.799590943893821,0.8110518973434633,1.0151641274967238,4.5734717871897566,2.9197753435885976,1.1753215937520411,2.231756696657643,3.75314796055192,0.8817421303901118,4.791206964437852,0.9954972622575531,1.9059856671174846,1.4323019978061247,1.3070853532318094,4.40406628990578,2.0926494131302453,1.5698139085011864,1.772606183199913,3.5173690146482475,3.98279689327938,3.440880406687966,3.004938759380952,1.7208026483362948,0.36678491735957275,2.330680274284168,4.65031862446005,1.721631371738609,4.802920827673417,3.619182543640841,3.6313360643619044,1.1887147135641662,3.7863645757581943,3.7305596112307713,0.016161058019681374,3.2046404032008513,0.23620504054222557,1.0705297293018512,1.8873856121242738,0.7913304270019716,4.080015004052995,3.180956134969083,3.2650845806476223,1.97730753226933,1.3734423263435358,0.7905457844816721,1.5515175275506354,1.5765719204578132,4.697230898421804,3.1971454181390935,3.2007594201208454,0.9945494889860784,2.2287441593103354,1.3314949318047231,3.301099201079797,0.5566889832084532,1.318259815909657,1.2874453449618728,3.745421791331436,2.047532040533145,2.653746263543261,2.7032371844600798,2.7982775745259403,4.451602844311507,2.736108969829777,4.530910276616868,3.244353560385255,2.399031583590868,3.446217730135641,2.191657339145232,2.821924414258179,1.506487398841574,2.642904914565405,2.7890183670203896,0.14666981349605757,1.5795966238187964,0.09708823926718901,4.450344185887749,4.845893624635815,3.2547118363827643,3.458120628145597,0.9281430077195174,0.8154591742336115,4.896618115205219,4.430512405771894,3.3962414227615154,0.35067340845973627,1.5701484570836188,0.10182000453785367,1.6909542894404583,4.416288132575583,1.600879589075579,0.40354049763073885,2.574831620402247,4.400546310328004,0.9339663845125556,4.780186474170561,0.042905685566496654,1.6036439415152892,0.9548433838725567,0.5503571583258593,3.4338030326947635,2.5185472451051605,0.27305670817287964,2.6398976426577225,0.4392393466263522,2.752550232335537,2.3942291441204064,0.5014427272418964,0.2834290306277021,3.5657490555585527,2.702577592456652,1.453227684281001,0.3063889880828341,2.52311872296341,2.6753959896315305,4.2743436469444,0.23931803273963825,4.895053147170392,0.9092401894142621,0.4135425777074253,2.5178006372500628,4.475360419524085,0.3878923091408115,1.1901207886460263,3.386170141829,0.4358726783628042,4.945114844649442,3.2576491865141777,4.0048832074439344,4.447928921381918,1.7742521834061098,4.463487638694433,4.755324172353097,2.069202118832192,4.144460827362951,2.0304174824709786,1.7144082169810815,1.7493380461437713,4.531043496625966,4.40546275255631,0.3083897714801376,3.703806054245674,1.231221949550807,0.9725356500465887,4.025523149209867,4.09529875356272,1.8756306977960768,2.8727717010705023,0.5449253475181082,4.4009280608401316,1.9613277605940382,0.16363662966953352,2.084429339490339,4.441223812066772,1.833597338964661,1.8012562938498955,0.03135550363156714,4.827021350772479,2.8385026656793277,3.428488474953053,3.2004095703020075,1.4290400779417312,1.5892024762166779,2.7219708695835965,0.6246630463069092,3.284422563274881,3.420740940374877,0.2174675346064192,4.267965551121613,0.8975611762094116,2.4507279685180148,1.7070178213351683,0.7152841512610264,2.6216539486407573,2.180918235418332,0.2700552155257696,4.071039300514273,0.00024849962994122343,1.396152904437833,0.052995586768425085,0.5837958284555456,1.2071062356433049,1.7092940933222012,0.7783395822463168,1.1761257671463576,1.3494544339191028,3.136410498288046,4.154020606926688,2.2337535083946602,4.769329471945525,3.5155050035341118,4.416560432456932,0.9690511271152125,0.7637576362575049,4.4016375379712045,1.5953543018634653,2.636108357064746,4.698449187733368,4.716121915158961,1.5346561565260086,1.1329800933097411,4.509349731792957,2.4371994383595363,3.0057295588095814,2.1736838861863115,1.4755523010624694,4.133370304986994,3.5222882843016,0.4443286973575733,1.5589192162018406,4.4992551277639246,1.9945951010312912,3.411292295315931,0.047393831443508505,2.1227842471360714,3.2474308177311775,2.4915030891029453,0.24748434173208267,3.5054548205856695,4.913229251420688,0.9748228037664863,3.5295182429132432,3.873259945098091,1.5510419969177303,2.826409694031211,2.978619469763876,2.02278783548715,4.698521604514423,1.4188311327635639,1.6283533131227113,0.7312474830244942,3.739098422703373,3.271221081809408,3.369327417890131,0.8687286389112447,4.537511376193299,2.3112863866638964,1.9811224869859467,0.4482333930474902,4.48292659040948,1.280567673577151,4.203773968697191,2.0523524329411815,3.1332268757858515,1.1159799553374694,4.159194823250273,4.1915679847418,3.6544941046575694,1.9719437163750697,1.2929536579035306,4.886676160117375,0.10866739898599653,0.7998548500207014,2.078497051658177,0.21215454616190343,2.6835490841021894,0.414624960251363,2.8518769997537374,0.47797559384853416,2.065445411833442,0.6063554315912634,2.4049352752809305,4.865891557002335,2.0308990833196274,3.2160134145472288,3.100785721681567,2.781941058952108,3.2253834109427726,0.3326331630188084,4.69450250178729,3.9614866677940697,2.38888797623391,3.5899435456472695,0.3991397407751729,2.3055109969092813,1.8751562958905843,2.0915310353735195,4.150507426038404,0.5020488338225226,3.8632826183566813,2.620347893441217,2.777609938598512,0.8073752246285093,4.47507225157084,0.47770794454007115,0.19801963415899126,4.649691342603134,0.6249696717152364,4.216712056475737,3.6147324949111272,0.6493963458817942,4.7153868305012345,3.7530066050446473,1.301972472005355,0.6294154316500611,3.58210373471889,2.058093598540003,4.112011490219687,1.0211645314179219,2.6735314745182324,3.4529415710251476,1.1673737892812497,2.660134860908465,2.3245171496330452,3.9854976132811037,0.9394109855843624,4.736824457082397,1.100502009851464,0.43431862177672476,2.967839138760273,4.878077461715822,1.1511972325188724,2.0522545406778434,2.396776472748007,4.044412843740054,2.7694652764730754,3.805378481370816,1.724723335251952,1.4615373673355825,3.662887383444869,0.3865156621236987,0.9125689911544388,4.500377371870271,1.0253579886800246,2.589372998093485,1.0119503395876428,2.48709828028057,3.877990118822874,1.960930109355331,3.8217129207243605,2.355139175485068,1.8824020412015618,1.6232575904895952,2.9810438931557215,0.23711309055892582,0.9031651205736657,2.6457383495741063,3.47343803841481,3.739656019161599,0.329066863577514,4.013976217462869,0.1750585284448014,3.3902480950064007,2.1312537385659533,3.4398326903239305,3.950205374979271,3.889304596221963,1.1575419480217386,0.43549858979663014,4.083879797667825,3.8635799930436487,1.9216901702042721,3.364027419519322,0.06666711456151608,1.3240997942085253,0.16428227708109366,4.296344115986811,4.167617447582478,2.423263377838664,3.3455146494573897,0.4042012828152419,0.13900623742191254,3.381210657889614,1.886267565960601,0.6221025732650776,3.892235030720413,1.4508446248521123,0.9284480194286682,0.9454300367673596,1.472174078146583,2.856215832124901,2.4959186960442983,2.6099676087595625,4.381735417099765,4.629974036774684,3.592473931393024,3.4768085580658314,0.39437534119243667,4.72374299725567,3.322916661848294,0.8556039337009302,4.17172381971684,0.9068384041225486,4.538000157636778,1.9466246183727465,3.006026577902693,0.007049093252260441,0.9557754041654398,0.49774444585947486,1.385806564059604,2.132507389117322,0.27074865853042196,2.5846106287835546,3.7211692848319355,1.694105299627141,3.7614605379301413,2.7162438143172407,2.4208002567944154,1.3555853308464494,3.1069880465998745,3.3832145956322046,3.8861941023073854,0.811765129252251,1.7920544840254893,4.801658891748549,2.180355614305113,3.2218762725650607,2.8298690399038673,4.120828156547684,0.8050292174572238,0.6656169171115212,3.6336924799811197,1.4106924055735304,4.338360322731889,2.2805335278076946,3.8255283208346125,1.2085289380743391,1.6323463810234928,1.1833618915244748,3.0281806629828067,1.4304571715723657,3.956252763959369,4.419863002519824,1.7557786146586285,4.11691006699809,2.0629876729880294,3.757039040834763,2.868184448813247,1.6098552860996551,4.079796924135214,4.2977739654773215,0.46158428205598123,4.237535755643643,0.32020356243270376,3.1969860999685973,2.1017709001734297,0.22409382292949975,4.439300021079962,4.344245807573964,1.4599242526117684,1.7644985684734227,4.211898150182512,0.19161921518828673,1.8756155509701633,0.9549584440020775,2.0181298953081708,3.6684277413654476,3.2948202800371673,2.23729590865426,0.9284392936188213,1.5532426920361464,2.1444452529520563,4.229344720457517,1.9003507596391833,0.9712950548876897,0.653038429715378,4.656262603509812,4.121154593779553,2.166575097874323,0.477649449853339,4.7236142298985815,0.7268269831580887,2.361274709362137,4.651879539695717,4.713929244039823,1.2772577594553325,4.609528677778344,2.7130463570626095,4.1111503329968375,2.0368486624661983,3.6283052825451136,1.4079861204620114,4.625791561799857,2.7188567421202636,1.545814944082412,0.48338543519548915,4.430312813802742,3.9568559779497816,3.788358891618712,0.9836693504722249,3.278635062161115,4.4202129987467975,2.9000867496003293,0.1865903299081917,1.6185030887606944,4.49656857584833,4.8222182729356975,0.08018924269182048,3.1673104599934465,4.996241815524519,0.7789650691103522,2.8962229490710225,0.7465008561270026,1.8415573197471014,2.084275180586308,4.34011429296179,3.269147782876333,0.8122206296827417,3.0593328931293606,3.072874047430142,0.3100453843549644,0.6625641629382251,2.095583849459622,0.8957399986934722,2.3280862140941383,2.9162582100290613,0.1430977914790721,3.8218805471706774,1.4796419327301435,2.088818525209927,3.5199089020212435,2.0886511629908613,3.968392413907197,2.648297748492464,0.6432399990139526,0.07888801301433768,4.182561931310017,3.785391157648176,1.3328048935091452,4.082132433061728,4.806777502058582,3.4982904080585575,1.1945906448642785,3.0443931394267754,0.5208365649498314,4.231315158943639,0.03808999356029297,4.443359806572591,0.9399470318498171,4.756476134913626,0.4902434170109049,2.732697973294891,1.7036065093681318,1.5332480588568365,4.53048640776853,0.6725090470648099,2.0272759852590525,4.026077926618673,2.5803621048820133,1.428305993152843,4.378232889408008,1.2197812679448516,0.028491340462413195,1.7661951945795762,2.5532456364499687,1.2429846540189793,0.011446395150338518,4.008908233095875,3.326211109866406,1.5920441567417698,3.921519055984415,1.6957095330402294,4.044792719988014,0.17266723770821724,0.15211744578066844,2.510406623075576,0.01366104339802554,1.8638214079151905,3.1082916153199855,0.2322256093860553,4.794786966387802,3.1944317678182266,3.7775915621733325,4.317527035960003,4.41751063651616,0.33188582034953673,3.28464669900315,3.1541201654312365,0.7983799152908788,1.6366865823161336,0.38559996463555457,1.7773544614664805,2.6574586290863076,4.719081416754019,1.8588706732764804,0.4851846664526671,4.047198017420302,2.8883677939099197,4.558309328625062,1.5341385344161163,1.3971101829365762,2.5343058464959025,0.031395069189603664,1.222568643488583,3.0709776238672983,3.1299204500180555,3.0028538291679774,4.333198983774871,2.0701506060232933,2.3583273743576125,2.087827610124593,2.2840363569646116,1.3938444092190294,3.9444094007770856,2.595769617824092,0.8600548340480829,1.8099053546701893,1.3022306443899434,4.853115307642782,2.3738752734693467,1.1210662183469766,0.5395683196169709,1.557026411500938,1.1132873851370029,1.861600254916912,3.699904981213505,4.131867259758565,1.3928977165608802,0.028844797123557253,0.7673306442555128,1.3044889256117786,3.255450238223798,4.009357958184431,0.9232419064593389,4.708453466372468,3.7155622008555858,3.4451014428898894,2.9406588603674733,1.2007000881250518,1.724387967869938,4.548975974641436,3.330983765230886,0.2816993669503487,1.1369114106839662,3.9610316488877784,4.627774239239889,3.966870167342055,3.9593918671693284,2.9151632232270517,2.4254943701383533,0.12104837006536195,4.3245434464067065,2.4965120786246153,4.7007182936782925,0.1806826683612861,2.03643419871156,3.9016413178751783,1.3040175497442563,3.0427431074956157,3.0496253194852585,0.7079041963653754,1.5785702323221673,2.4938266957025124,0.7133553609275334,0.9303223321211962,3.769601644232572,2.3885923548242474,2.676124045778133,4.112308711510206,2.4823862862004242,3.7831792750385818,2.3741273645669416,2.253011716429757,2.611771295002141,4.813233107531754,2.3438338169521913,1.629718651572839,1.7849872413081913,0.31826690633686927,4.481318851170622,3.6334051272056964,2.027240917570449,0.09264959774391013,1.3140925913480694,1.7556041538971467,0.7380224275091185,3.136185586795599,1.1320219358297268,0.72021699797987,2.7541597110478886,2.125802114449815,4.110038853440667,4.647374907217587,4.686440743079757,1.9815120357760163,1.8929736827582655,0.20624849023086478,4.852858204786786,1.5416248981238634,4.434356243209225,3.72728803630493,3.984769563959969,3.975973001109674,1.1927573073878106,4.3359045918971075,4.192937395045061,4.316154143868505,4.5307459823528315,0.5770441923261427,2.3739184964463176,2.819836019985593,2.3972930888486497,2.6801893863989887,0.11318051279552988,3.1223038583042975,1.489542290410647,2.343397558362821,2.1625428211484476,2.1623618044887074,4.741640586127441,4.988320155705699,0.04038343909613884,1.9004964858898399,1.5317668619845648,0.1692584734895164,4.425345559073088,0.3729032202747462,3.8435506748427417,1.761145607322231,0.73790019362172,3.5090025860598537,0.8992463979973109,4.492533441532768,2.7031061676791426,2.1677369145250394,0.8101976874309902,1.9458311173546528,1.9614534481788315,0.9538353382925813,3.9076956621476775,1.4557657602970475,4.017767300957031,1.2206810951581337,0.2837460166268635,3.741522900903864,1.0693117425636223,1.2944836228653867,0.5338285270848864,4.634351329119573,1.9086826503229526,4.282843737984141,2.1407326788400782,2.4949580185058617,3.8108818585961792,3.0639504096535894,3.1916813618715745,3.053443676018307,2.5960321611923476,4.05861606602368,0.12748471173193443,3.571574965795482,0.49110524546531753,0.1914013983979268,1.1524066024328539,3.981954302082844,0.744508402366244,2.274303323203818,0.4143261733786585,4.858760068654277,0.009074857880626563,0.37762777643932766,0.6574151924561944,2.311310665431403,0.32149250183181155,4.598733873315167,1.649439468394669,2.4208310517954534,1.2841902592371968,2.710589181399674,2.654942911294109,4.069210426384875,4.403660742885074,1.3517861702361866,3.4828685161501927,0.6747417185038074,1.7665018976600688,4.045154961163682,4.490696511531772,1.8079947977018274,2.574562905526875,4.661387327122518,3.8280578412187296,0.4185126837943254,1.703008323594838,2.471996134335259,3.4769505340084637,1.8598858732109802,1.5639927146635335,2.0077824817579915,0.22198367009216846,4.478249559013343,0.16791541177122893,4.722681097014501,1.245739401304926,0.4419460747097359,0.29448860411960265,1.6835221319863802,3.7379527655925457,0.056620873365876845,3.2164991444046045,4.064988528554746,0.6469635816301134,4.947975121435785,4.616631196814042,2.309558273448349,1.6859702742447424,0.8571099620578759,0.2525840333115992,1.71966692257434,2.8449696647339726,1.5703639778409695,1.8207007044448464,2.548774331028593,0.2896513419435498,0.36339420867365635,3.7706274114647242,4.179556269498991,4.116862856272855,1.2468041560454979,2.449090606840303,3.26417414573297,4.70485789477339,4.690559610880376,2.164669736652556,1.436619302008696,3.8056549960628905,0.587399472767195,3.0501961629069774,1.1855060021850838,0.6216740670327914,3.7616851780141225,0.10575065849801835,4.443486823244546,0.015884242308508156,2.4836336475033183,4.876914899992196,2.3590683582393224,2.4239237771764657,1.2140512616218568,3.0748991183666274,2.057783310396818,0.3896295064546751,2.6830497999912604,3.217951791891116,1.9629082818522392,4.274053270324668,3.77658324648611,2.7165162973323485,1.1565203756114817,4.225716790703179,4.986977113355163,2.364757606175425,3.305069320981866,1.281363178892202,3.1562906834231397,4.817900644343226,1.3346784299057268,3.430300253918265,1.0518215889654992,0.5185962695311919,3.9438057218754063,3.8641145307250166,1.4432543528940456,3.8141419169599566,3.8132419591639986,1.900468742495397,4.838180477142364,1.507808290317424,0.9479757266070787,0.5766851838902332,4.3082974547550545,0.32863221819198096,0.6492048274584816,1.6835249000220942,0.907335532676089,4.775366272244568,4.346807658145558,3.77860940436036,0.5026152333583911,1.635697701042066,2.1194510389251056,4.671176964396354,3.331692832447132,0.7850870355517892,1.1984298503447244,4.27965658932791,0.7501649706702285,2.9552776423179017,3.5070397305837298,4.988639697548595,3.9150856717078444,3.03741985685381,4.7385866946026365,0.53438107399011,4.223947994726332,4.4105260671107125,2.865529470677206,3.2231473500099037,2.526615869884401,4.508771747663971,1.8002699111392795,2.242369869239699,4.814626988766609,0.9320329730942833,1.7577699410197722,0.5350898758757339,0.6377664824141482,1.2921502763079395,0.038382627321632556,1.2713873182220858,1.1927051669007016,2.9499080471297923,2.8261080643553074,3.4370275289603844,0.8385879803759422,1.8638392947585936,3.8808762816343445,1.6856791706673702,0.6870912838223464,0.31095576155614535,2.4331398708931875,3.8715131068984454,3.869288491938442,4.851925381909988,3.108468518636492,3.6117166776794276,0.038217303552220416,3.540903730533367,2.0284308976702228,4.064720290060358,3.48781111829103,2.871914558236094,4.228293222302922,2.160077092095718,2.1673577313436274,2.1744650854729306,0.49237468295799003,1.1283887244803392,4.117434651243608,3.4149221761980586,3.481453587754287,4.167399548018251,1.6141443267893674,4.174386851198544,2.8906665448000632,2.332331238990484,3.6274897940252213,0.5480032617395769,4.768388529758663,0.6554076064757497,1.9394574662444963,4.555690380969789,1.554228268458795,1.4139839156140677,3.426624704908142,0.10562999764580971,2.5916591537302347,2.5105854764949473,0.7660033210006867,4.537725838630722,0.7297196174545373,2.240638240135545,1.6320722903620466,3.9776077412692414,2.8827148035024197,1.0832757880526034,2.066949466684358,1.136801426011349,3.3266763995389437,0.08103451312814314,1.5831531063980386,3.7140413104918677,2.182017327977821,1.6042213363470559,2.9663167790116285,4.054055732494661,2.871266671537347,0.8261744589519104,4.635098186506847,4.455833622194556,1.42587264034158,4.827785264379863,0.3082262023748583],"beta":[17.165836684947408,13.712537355188058,16.826866821431498,12.714985303012114,14.158862113172306,10.206910964731371,12.851441378244392,19.246481533225328,12.464233341075664,10.415874990251371,17.870636374714977,17.164565130584513,19.709571941001375,18.74651405142943,11.832014938567422,10.630614717011301,17.399407889680646,12.473069899599558,11.350562082523354,10.335849981549467,16.51573292874814,15.500706860028021,14.669358444841054,18.955943823859187,11.481427001031692,15.423288213266034,11.69184952618231,13.303151527732798,13.074940120937203,19.95514538093346,12.67837672078824,18.862590151815823,15.684698302542998,16.55487876853978,17.897750825621813,15.288879153851965,15.68381517945081,18.088986017638373,18.271921456776507,17.507185568068508,15.017683768900662,10.76354418136954,11.04487238717238,12.656286001394143,18.48779571018082,12.062183449402468,15.144722817363078,15.918256692408734,16.779057703138303,13.053575809923295,12.34170362120304,10.453480253174662,18.850573862699044,17.394126105339133,13.947128877130481,16.319403855043547,12.401817054122494,13.167191604571581,19.565274619790763,11.522876828350643,19.864225693348725,10.512448749121132,13.984906411217825,17.636275256779133,19.248901805841314,18.03529400491744,17.65259723842911,12.062576650768918,18.32691893216597,13.568923650966635,11.814515306014425,12.988704916141405,13.759809748852287,15.530334473876941,19.491769600630686,18.823492844537913,16.387600914605088,16.473037750275097,15.152255701082169,12.199875423917845,16.76981018605381,10.096191991299975,11.013175489710605,14.809652362953841,18.747081979990043,14.76824037269277,14.63969555190905,11.01514556354191,15.572252669216674,13.300920753498493,16.236011824945436,18.17753647317744,19.53820271453388,19.335184556638282,11.681468905137354,16.595067049823804,13.771040822233429,13.866973872339987,10.51813899979573,15.794639428107027,14.75656389212093,13.527289247393114,13.449762187438452,17.21287976521155,17.677466799121305,13.377248706555253,10.317300154909221,11.095067253291642,13.54829214348404,16.577911289334544,16.563426427157445,16.48537636649248,15.49030965365972,11.333651512066519,11.591139820649072,19.69479556747167,16.612363749807045,13.096888800264301,13.872447964512048,19.097919198163122,11.355464743586781,17.270528343360116,12.185611199743489,10.739403790471055,17.63506881730954,13.544262337639596,13.480733842994116,15.29700646144007,10.262997264838155,19.89472083674794,13.5551550952769,19.761109611526862,18.930141659408157,13.15938274723651,10.793141186041595,16.69270561741317,16.97188298149167,13.273394384022591,15.556722529924809,18.943230440125056,10.981720744481713,19.730141511318486,14.45950024686098,18.40827782650527,13.699768679596326,19.162286168950004,16.574527113814895,13.085227848738088,13.710470866584114,10.261880873175187,12.280185086410684,14.879428388557299,16.004959997424564,10.692830019137338,15.011462114269474,14.24419631842822,19.43493188877774,14.828258357511256,17.076685008746697,19.089661192430693,13.271410624997966,11.367186286188435,16.928856070235092,15.71449302062419,11.872823459529878,17.794426811253,15.143108706322232,11.998126791459892,18.77311035893488,14.96424061536869,12.535599724793904,14.359540267781654,17.347501011619606,12.39541989351848,10.284976574775895,14.034754235670892,10.186847322093742,10.671637526884767,11.024439604469787,12.264711899460504,12.965823219989263,17.964230195020285,19.191914369227863,10.801781853700959,14.944285203032804,12.611419768758356,16.870831088514702,13.94438035224685,13.721310513581065,18.10916611210024,16.18242019730864,13.721921672794908,14.422606762498491,16.485181146293478,18.007226234762385,10.169288403779777,17.400706192157784,14.970720764623206,11.657824243689852,12.626347504194808,16.759184905663933,11.802837195656924,18.70903851170959,12.547820485625978,12.82928051012793,17.61003271393301,13.27023981051694,19.80372604193297,19.906151114120686,17.309810035452706,11.861352885773584,12.046097515459584,16.882526720607956,15.465987926675304,18.426131624881727,19.008904978058737,19.03288258859704,15.224835889047865,14.343468530409814,18.102598381567514,11.96324252775283,11.904034812108929,16.20699701152979,11.023437898159248,19.47692348044223,10.211051446719623,17.46762279645358,16.36431299996282,19.553415418278938,17.30660934426228,11.781172043823178,15.232422727883181,13.222028777326504,19.147208932381957,10.31838328660129,19.923136934202834,10.352383534961834,14.10627823168694,14.069720154398695,17.614375262123566,17.648999090843304,15.648126653929534,15.523553181074634,18.779230211106096,14.642077066876462,15.96625847109527,19.33287554969371,10.433015392968787,10.805511070678445,11.062965620881071,13.71970059503637,13.975759072724577,19.121364076209453,10.24384418658382,12.89037232955021,17.536744429826335,17.629934906665433,15.22407678450951,18.08585888713686,10.979786461960137,10.09991569300465,13.094814420281239,15.044365579744486,19.45673767413707,10.290723214899156,15.414242018109654,11.81225378921497,18.125407411774752,10.756347846722843,18.76903339545315,13.18356498344559,17.888274216167254,13.374958551358777,19.80955308451606,15.777188345182779,13.61549317090476,12.182555010024213,10.512012113402577,11.463553623426229,19.107083346599453,17.899389952401716,13.839956865593667,14.826433203903415,14.946688612843563,14.811676367963727,11.053018279080076,13.811341331176447,12.839940302015009,18.456361069191246,13.855869741124403,11.881359869262845,14.92529229674547,16.707703819806916,15.152886804695356,18.443034342060194,13.536347632606226,14.805655897754356,19.439250144012874,11.029624716631448,12.217980999230235,10.409750498839394,12.618892713310302,13.535663068820032,18.3368307161298,10.68886020728139,14.761674057507147,12.293202401549642,11.618539637691834,14.409912424516358,12.157053765705015,16.304475454400254,19.124303873926323,18.594476287401335,12.604271722427248,15.686818728091412,18.727566583104995,17.041512993480854,17.980010390008513,12.941019364286728,16.85533524064695,14.789282210817355,15.940632674306032,13.76116341787407,16.387342386582944,16.88559992298704,16.482260486508494,17.624091205569812,18.11835109142496,10.784141415324557,16.14238811481917,13.125067455489702,17.121188136608787,19.273311041970622,13.954459871659807,16.01415858626482,19.355729757840578,13.201654913410412,17.901070645847707,11.783085944775502,14.807282428654418,16.986621471867974,15.468465319314648,16.87930960804931,18.74348962910514,12.103199857493864,19.703475331317737,16.196506049041723,12.938131529079904,10.055398311976756,19.09349646164709,11.963289151399099,11.899912673107062,13.679500059806621,17.30585326660213,14.895319629258593,13.746777718162203,17.93780274933578,13.57917067223976,11.106934968758562,16.171344062829334,19.231029919967455,10.976610290325961,13.111695258281213,18.94679725857717,14.653001271791988,10.07911969702147,13.51394411202578,18.660269866533163,11.215617519039768,10.18714187239081,14.054992459918976,10.776883989887246,18.684837821147173,16.933520738755423,12.056564668132994,16.81772529557876,16.386672445481842,12.32964574217428,16.093861111145976,16.21408375023279,13.357899517621286,18.024036845245234,11.231164269532556,11.831723609483394,19.1619977624318,19.281169944092035,10.279528925840278,18.777914006262662,13.78776862513567,19.78204445528454,17.504874026928782,12.069044652352643,11.380949182079087,14.974358496015231,16.537215411467905,16.18508560585389,11.926283052191424,19.176813866052278,14.92402004248854,13.3892901402621,17.467876020777474,14.074295588774303,16.39585754939791,10.196997174589812,14.64850264701271,11.977431047135237,17.782842954068585,17.154831653507586,18.19529117770943,19.37542644075703,11.316226723575529,15.291664668133249,18.781052825036568,12.846304311375953,10.97784581622026,12.259658876668347,13.826182921109176,18.383008533012653,18.88319864756275,18.713004991761494,15.982274148146995,10.712541702383483,19.79665354446946,10.13256046572474,10.936965392503259,11.357290229418116,16.03702551220909,17.393154403807124,11.822310771064373,11.016629333390767,18.54296476012001,19.65597407940838,11.4104281438008,12.657754199015264,15.050410176748926,16.307994758732466,10.935774773551357,18.005688942583845,15.221208916593788,14.871267232833896,12.412432449104964,15.847612454865622,17.079279126569958,13.637386931033559,13.19587549130128,15.69664429208608,17.519844696278966,11.024295200739285,18.711624399814827,13.878704429027636,19.23814099468712,16.15607017422752,15.989361979117852,16.975587538998518,19.539858670702326,12.955811697931763,17.21567800870759,18.464791822169136,17.599841486176366,12.008459617055163,19.16097247335754,16.375399231064556,14.738870917254195,10.474556813109876,18.386508533490115,13.002218104881301,19.94791240353335,13.058466578421887,17.907595929887208,17.73360034016585,19.95616521146202,18.441311459934703,12.176827838337603,17.934477054498828,14.986651668067797,11.13570155185958,14.156131970249668,11.352255637590016,19.04160456507619,19.563843546708313,18.142235260986936,12.799671271155972,14.29514323923006,19.980434230796504,16.12393684920729,11.019929784347969,16.59417986386786,13.334206764006847,13.197544782745162,16.041753191470995,18.675220180026766,16.289401532439765,18.7384619493791,12.885347334537041,10.004003940655291,14.149467396498345,14.285967657826358,15.690530033573346,13.084597058486935,16.915640425347956,15.487811807352735,13.23749733269266,11.494286250237773,14.97615635580541,12.112477541752702,19.088642715990947,13.04026816243907,11.8846036966426,14.581704123010963,12.994263925174545,16.663994702678004,11.621080781907288,14.330271075663203,15.509281648662652,18.18428748066393,15.167465303728084,14.741747126042073,11.451348504283112,18.822796233620416,10.305578379884144,18.111261988302385,12.03572166478996,14.47927369825675,12.712738922734378,10.62253853486071,18.494568861681394,13.819392482396253,18.086006637508802,18.450368236827927,11.104838018011714,14.838494565793702,19.789654753718544,19.323144544512523,10.087627598193677,11.231744954396794,11.473685910597805,14.66315052911195,12.356530991334782,12.618785889563913,10.081312604681038,17.865870627322668,18.575025183463676,17.407182495092123,13.671525434565277,13.201837760454138,17.984422429554208,16.529043865813662,17.506342662122584,11.026213678926142,16.266486814195652,10.30640675623707,13.011913191471402,12.633356743094105,19.6633175036378,17.733539087463967,17.264503328315765,16.904498507429842,11.665149016592668,15.991147063476895,15.612069220486081,10.663990363170166,10.218269530056164,19.97724308382006,15.373418930794152,10.235740395540136,16.611772372337825,15.971802644060347,19.003309962986595,19.379575794006957,15.473969395074402,18.443282464472844,13.092162409243372,19.878571463076568,19.954528943794596,18.255294943314492,11.512426432838065,15.974453336307908,13.460762252374131,14.328413124385744,10.774067983057636,11.046361714390372,15.739872523966822,11.507246080502512,15.69018216624759,18.650213342233382,19.880075968951076,18.0851226605439,13.849183130338984,10.688931910386328,16.147817180676437,11.485811485777177,11.679564581969146,11.237260621128812,12.689477007160619,18.428416153668895,10.424286020630351,14.743719410065324,16.80720362200447,17.44962189233009,19.567622225512412,19.20744828959591,13.613415193435896,12.28037315228037,18.770462258238485,14.81636097794453,12.600076068515392,13.032513176576252,11.00408331801064,15.589032183538677,12.872643844475428,11.974741743276098,13.100704532748267,14.699930478208742,15.390365165444786,13.696247257607876,16.86867990763608,12.195229635330646,13.105008933479475,13.25198567242672,14.932461787006934,18.738619989992902,11.00393577688825,16.156666431696074,11.32812130152626,14.015866788604072,17.454408383453494,11.026268064191392,19.604969102751525,16.306383928836475,10.27048117407097,14.69452181866947,10.674806842630765,11.143104883537253,12.56524004316859,10.232396049338828,17.488606482584224,14.820877828961734,14.778474916177093,12.80767394644091,13.748723143726544,19.76462965406748,13.594060716436932,12.517825432171435,17.919509870510726,12.946245441073241,15.478048457838971,15.439991441156916,16.13974508767703,16.36775040344795,18.898412070969915,16.53300089117908,19.04725881214791,13.553645976248646,15.04136176511772,19.40068767168757,12.977319185160109,14.603119989813377,12.349006640686959,13.152866075169898,16.50724553175697,15.123535349051298,14.015090670423323,12.505281788706409,10.969124390681449,19.374157836459,13.531196711758323,13.10914609170724,10.741362821860863,17.847652608026173,13.764142623796625,15.269922769571181,18.259184503922967,13.696029887843885,19.6782648350435,11.195077854462665,14.598653761826682,12.996694115104665,19.250233419773483,14.506243281770708,17.061816355168638,14.609230079622487,15.845379856020775,14.197483005395776,10.765765685794326,16.701804372088773,10.527115107461222,16.575878055590845,13.185868994367489,11.359658947258502,13.744225261321477,17.18783857761666,15.392893106476457,19.129644364542536,12.557891330341697,13.330062026021068,12.765923526939325,17.943133301305565,17.340142638834163,11.105229660251656,19.979249621208588,18.52027291785589,14.460779854993797,16.599092967491146,10.315120628560086,15.957451090967425,17.144296291794088,10.334456485385669,19.163515893938577,18.83758023339343,15.751729958236616,18.835817242793905,16.046916595256057,17.99369223745629,11.79084683107767,13.542992733669937,12.175004425695231,13.39150196597128,12.461508388314645,10.313448312265708,19.609502407725586,11.063484885218884,16.416625430046142,16.523088303591127,16.90192390532051,12.526416705182319,16.84689095591269,16.959278200155605,16.044291454781483,17.135733758601695,18.86300947788636,16.863847559825096,16.529433669715342,13.332858601813095,12.396446801401332,15.571832224637363,10.041885040474707,15.874285913404371,13.917640470622743,14.284207993761695,15.91761220693641,11.294834490395047,10.104775073128282,19.615286045575406,11.411823137272062,12.386293882298347,18.80208713607785,19.406268571982608,13.2408905748483,18.343038915590807,15.048123568786355,15.763857621391127,10.87271160296866,10.840470365202377,11.109689867880645,15.27243293246935,12.371163116585276,18.836747827172488,14.640861112150565,12.595585386890678,11.393756139065694,15.53327404497658,11.033656841988243,16.135630959665313,18.931669302395907,10.437018128044002,11.873656078712928,14.453578744799241,13.858969601617783,14.57373437275314,16.08190995536921,10.438646966258734,13.513194439949785,16.737146680381322,17.739208294248037,16.870316603290085,10.791136864871705,19.151523696538483,10.558398187291884,15.976482558359127,15.46361046931171,12.629971760600982,12.502527145927635,10.227681479897058,10.273075476193254,18.133650129826886,14.241323161314753,17.86428511919443,12.810648359625485,10.03569773543056,12.780227634356,15.413751664799488,10.142377322212898,18.41062828311192,12.196366501847342,14.367728430374346,16.21316673899959,17.31781937573982,13.189291684816899,16.627700203600188,18.818810847778636,17.035916318416916,17.599122923283304,11.37378964056839,12.177760623313226,10.586246872922016,17.106564438152063,14.298485080229838,10.405771295098386,16.96661298142422,15.870410908903729,11.550670344563816,14.435456935475433,13.679616948266473,19.740904742334152,19.986102721014355,12.873895102969996,16.738269903035654,18.8179781106133,15.486539685869449,14.780165838894936,11.223827940816449,13.57955004697519,15.735530410377121,13.56824610862576,14.45350782810441,13.38799586331688,12.107606107943269,14.206889758977086,14.571360554118698,11.31721514495868,13.99828926441403,18.005526503679516,11.486120507825436,10.415844544662676,17.189771937732374,10.631451050675253,15.697863159527275,19.365928957931875,14.362103314746557,15.183184927776805,17.96580383948647,15.720796648436613,10.120478427785525,17.353180485212416,17.242461982467816,10.68218256229831,14.837454925390524,11.136178243495952,12.783388458705883,14.49021246161983,19.57925305772332,19.989230325383154,17.88638684157454,11.506627884156853,16.207530917608892,19.475633646495112,11.228656767576314,12.1194673630565,15.322980485327104,15.15856352660812,10.18298096043913,14.574044908465646,19.371995059068134,18.848905212858924,14.623674301007858,19.712046051751138,11.176310121144372,10.041373498976112,12.19711946167584,10.738428966250428,17.59361143630433,11.522532373760086,19.90003477442239,12.206976689763065,10.255226399756294,11.478016602559478,14.614793516659802,18.033542968125968,17.98579003651142,11.992451048894084,14.688879964785219,13.018267225479823,13.188578475293014,15.964900070779391,13.65731785257141,16.2513603619183,18.854517248825495,19.29394011989144,15.307831575440884,15.90658644292509,11.741125492614014,16.023315181258294,16.97490111416861,11.75528493844478,18.01513542226545,14.249307633741381,12.381606215758506,14.464744551290368,17.923333642763268,12.29075130167061,12.753131558304055,19.675510474110894,16.38607752849343,14.96663637496158,11.439209387549948,15.091074248154651,19.924536460743056,12.210074718104815,15.929054270927352,16.247270104412372,13.545739465324848,14.50039584550666,13.237724131276739,15.05560025683369,18.506173739645753,19.90156783686257,19.742109353339465,11.67045119296996,17.813130291218776,13.25003675066631,19.368943347222235,10.317221524400855,16.837305164197286,10.732446207035153,11.628833459865033,15.870607729112038,11.13943438570844,17.754650119109776,17.589407470802048,16.894563942974553,12.568094822798903,12.92817549468295,17.012365316547168,11.415713552614013,18.597171651482633,15.913463839175348,17.72971920851954,10.794426805019127,13.771842466080207,10.03826751662844,17.870188160401526,15.801750598384626,15.078995951034589,15.946792055805371,16.865753634484395,11.307730294659823,17.833917802030232,11.890819874761698,16.844485389870915,16.23356394435342,16.360799306271975,19.959408621329672,10.071978581828589,11.733182902960715,12.400060960698628,12.909206802067796,16.543518645281544,15.630246145727963,16.48442021300763,19.646740704958077,14.878289562998589,15.347227741417683,12.22124093707177,11.79154679962851,15.837163544920017,15.98566233567329,16.702904335031796,16.299819428258665,15.350150826701476,11.779901258065685,15.288399328357965,10.816876290678943,14.290643825579231,15.271107485561862,11.47972019850689,14.618894003631384,18.93752437085515,12.47891578957466,15.995075123647641,13.011365957624058,15.76024834318152,18.360374481901054,13.259449694925497,16.300050600257713,11.670908935334525,16.871994471101903,18.09595675543858,13.89234667569756,19.48434574228632,13.919365632999334,10.937088726532991,11.94984588485827,11.930421577294041,19.687327873956022,19.84212602037995,15.48554224303019,18.47769113021972,10.015113507395055,16.25887844528711,15.264693841458431]}
},{}],28:[function(require,module,exports){
module.exports={"expected":[1.11047251358686e-6,0.5481339112555464,0.1452935330269454,2.3796497983307425e-27,6.685439724060392e-9,1.9886515717416277e-5,0.030860166723077762,9.728481315421444e-13,0.8063740169563913,9.061669503574306e-18,5.630587902701278e-5,0.9999998692699558,0.9962055280014478,0.9990295242810977,0.9490191562250141,0.999999882169159,4.6413215407636336e-20,0.9853669533231566,0.6742277233725145,0.9074733262835626,3.865131714131541e-9,3.9539012716079113e-11,0.22847054840492598,0.8277944888880824,2.114654283671273e-9,0.5583987931027437,0.055939977990084384,9.402104723249854e-12,0.9372272790577328,4.778182194434623e-14,0.009014067181826577,0.1392567716757847,0.5766865367549088,1.3758933630228491e-5,0.0371574686030488,1.8646811123511954e-7,0.006578058015176499,6.854574873406652e-15,0.9999789615761966,0.9359954517931315,0.9969086165712292,0.7283890488259755,0.12903042540938128,0.011121239762296358,0.00043426845668479043,0.04721492081908292,0.00014990329298124043,0.04363348332541014,0.9859860224338992,0.9029095855806072,0.1496051590418589,9.737204125962132e-5,0.8754646559888665,2.096472851362526e-8,0.9731836807777811,0.05116624822375709,0.9999964372840108,0.021334906450350046,6.238304940591083e-5,6.421516146126033e-9,0.025646756563746032,0.08936230128193906,2.8366529196788678e-18,0.0007781910886044207,0.014226153082296716,0.995983054417735,0.8744534634963851,5.0920839991416565e-17,0.0004916525772424941,0.9953268714158019,6.568253070238567e-18,0.002095963854449059,0.578670147186962,0.019166886601087688,0.9949038449183875,0.9988859860643915,4.64879676948287e-28,0.9970642301294763,5.001419822110614e-16,0.004162114960764278,0.8059567130212237,2.3810026577415614e-7,3.603259117542707e-7,0.0016373391971800995,0.014796981024424581,5.194991944274819e-11,1.6878800789847396e-24,0.0004184867259404134,0.1180362756767575,5.703384368702156e-14,0.9991338065229262,1.784428579272898e-9,0.7522538079337833,1.4675835771135935e-15,2.3362545805873508e-14,0.4964910669965811,0.00012043484037708581,1.3413023178562574e-6,1.605980893104404e-6,0.014293927852415574,0.009502302539759554,0.00033385947540281167,0.952443257887414,0.20105483047509964,0.009002800965128054,0.0035340946096586866,2.4764874067038835e-22,3.0713618228490663e-7,0.9991345234321358,0.09449157994388906,0.9851206994707881,1.5425779319101606e-6,0.23077250008853656,0.00024813918171230523,0.9799787523299694,0.34704537828264687,6.727683885787844e-11,0.0030360614104447885,1.1201062716981858e-17,0.002086002234702332,6.655031483586988e-7,0.9999367446790273,0.007551292822078046,0.9329000789133742,3.455960418167581e-14,2.1708576574402016e-8,0.1739574874542699,0.8932324698212261,0.013132311003499753,2.361521182358954e-6,0.778442673416537,0.579781120504869,0.9904984713580973,0.8366922449608862,0.9999217308890597,0.8107233109719088,0.972479168477259,0.9176539177675064,3.719990047287152e-53,0.9179626281709132,2.0258152432217357e-20,1.4254674470126777e-5,0.013735637250802677,0.3893185093078335,0.04951521940175398,4.727310937054607e-7,0.9821833042922801,4.0724884541061347e-19,2.6224233509147338e-8,0.005444737162225735,0.9999999010808093,4.478142167745298e-5,0.9999963518794227,0.9036903793181876,3.698762175972069e-12,0.7974404259876257,0.9995128692264907,0.9999998662841868,0.0002472070551706408,1.2949118828319164e-10,1.0609166004046479e-13,0.14701814848838168,0.018368379487884688,0.06086287424703266,2.6041057910995013e-5,0.07928143751042536,0.0027915293776375693,0.44419569360723987,0.013621555866649164,0.014799693818890547,0.16850429720585203,4.30349003630365e-14,0.5758801322167394,0.17305800810191319,0.1886377170055895,0.05712927450923759,1.2985579207661927e-5,7.551363808672713e-20,0.000816306046971076,2.1545090204986325e-26,0.7728966831027294,6.10341351417878e-6,0.8716626876734119,0.05300067989809368,3.509791598139582e-16,0.04203126040701583,0.006609098234311774,3.447959560599893e-11,0.999995526436563,0.03464259666706331,8.394449645317184e-10,0.7631107639161874,0.0007610204326654538,0.194420620108339,0.9999999991611822,0.05625360222914298,0.15942339203780068,0.7125848050908413,6.942821574050461e-15,0.3062813270870572,0.8587325303691659,0.999414130430167,3.43424546174031e-5,0.06380445404484511,0.22467744041771726,0.0001574084728676378,0.7523240123250794,0.15004570234267953,6.7995627873265085e-15,1.929862189910022e-5,0.9058635572575476,0.008750180408479377,0.5101256268515135,0.9996859875432574,0.006148121888846729,4.363676307207385e-12,0.01451279509751592,1.4385055687697763e-17,0.9541846973063658,0.9753347193163698,0.41452218521372675,2.678664902854268e-7,0.9999984552559399,0.9101852554492508,0.9573630423451728,0.4178847593093536,0.998813419146628,0.0012496530602381783,1.8763169674870331e-6,0.897487450037691,1.8466986053791146e-18,0.00033618840227598863,0.9999415925462216,0.999925005071137,2.3767105211793147e-5,0.9996319812305955,0.7130102209353645,0.9999593770039964,0.9997278422517386,0.9562161472741466,6.291696602934572e-5,0.9999986117336528,1.2405095002704855e-7,0.9999999895806281,8.903380875818171e-14,3.4342249647663696e-10,0.33878827595120736,0.11130658862826043,0.40483609577979546,0.0006708300522178355,0.06594277134570074,3.5881628894018853e-7,0.255082465857113,0.9998897400031078,0.37165392527694263,0.0945473770403704,0.6538217007401079,0.0013706439210839816,0.8143405927945142,0.7275427678366455,0.06840935960011071,0.01977735067561442,0.000719377689410007,8.09900735390284e-9,4.93371106634295e-7,8.691296330562039e-30,0.9999965009333577,0.03511222050714995,0.9999999812690479,0.8170451385038869,0.1021150802649176,5.807202455929116e-18,1.8496815140532985e-12,6.430218617453757e-7,4.502853804257687e-28,0.004000778146818586,0.7038761324416245,2.3125954226294367e-32,0.00021839602139032244,6.185126971902582e-8,1.2170769016863159e-12,0.6248296601736989,0.4641517332034729,0.999118302514263,0.5838136035437199,1.7042469670778324e-12,0.6550321913916852,6.930637109261958e-6,0.013190418414531333,2.1014702669423665e-8,0.6116588924976807,0.9999999935093622,1.2800403063873891e-8,7.940976983295654e-13,0.12680347654296473,1.5949150423202604e-9,0.9959207289544404,0.018909440420592682,0.0003740564055935978,0.26045112328218334,0.9999584865107564,0.051775203739706344,0.7570590722351375,0.8331073065522174,0.998868854344412,0.9999477134418442,0.9979612519056341,0.854607926631878,0.22440665076959587,1.3841391651210992e-10,0.0003832699230633902,0.9314189241440495,0.72312107369856,0.6200735375870272,0.018580343391334846,0.9957341550142559,1.1316754068835031e-17,0.5336958002988131,0.9847801747459523,2.9851066552956286e-17,0.990666474764511,9.087793851049706e-11,0.6301681264482518,0.9363689780957064,6.596605798157655e-20,0.999094405127922,0.822625576539681,4.264083563715217e-8,1.0392863787476501e-26,0.982358376607501,0.6504327458316035,0.012721941475928015,0.9999924902610884,0.00033171315184135457,0.9204721962873021,0.9928309001381861,0.125702880971048,2.9393382522774147e-13,0.007742765709292587,0.9394041011328145,0.026231458962792047,0.9985609333078891,0.8999410581598054,0.0007262764895953621,0.0004947038617404887,0.24938437224897148,0.036002763166086034,8.883075226072288e-11,0.9999946790109493,5.9866385188709215e-24,0.999829616470344,2.7671020029452588e-9,0.34264047615602783,0.9999919590110421,0.9999973309306535,0.053122604413467056,0.9999409715243173,0.31110448023645265,0.20635575658451194,4.621120537671566e-28,0.04457373202074622,0.0671990195933006,3.048977636808619e-17,0.9999940046097792,0.023777323732715676,0.015571232979815164,3.4479077973502014e-9,8.838068938951286e-11,0.9999990591519297,0.3156120688852217,0.03234808749053846,7.847507604105983e-14,8.988510639022629e-18,0.003458900260693886,2.1795144494174876e-6,9.950367389480434e-20,1.6566751061337175e-8,0.2332492756856455,0.4460611512218341,0.9972638257291763,0.9687639325141861,0.9017713670137851,0.8612013231865872,0.940061297572614,5.0574410764884395e-8,0.25306314040428696,0.03557986643596988,0.8816386539208771,0.12070044558280628,0.0023145752185082264,0.4503607379026775,3.920945132112881e-25,0.02665130179223982,0.9946545074131057,0.10161883649040361,5.2037061214708586e-8,0.02373595773915244,6.44544398434692e-7,1.277852601910668e-14,0.9991011023458147,0.0026955307719607065,0.9993768709906465,0.009802566393998501,0.07253176233709079,4.522033684151805e-9,3.933176912808239e-8,0.7280301544366032,0.00665405096282786,1.1614330721268713e-8,0.01618419385919013,2.492509737207778e-7,0.12521565224409112,0.00020748355517624157,0.9513334551911723,3.7314884793508895e-17,0.0012432393253515586,6.457672879133081e-11,7.978380697249214e-32,1.7000372751845718e-15,0.7538716779903065,0.6138715643031654,0.021873194245685595,0.29147311923257163,0.00042716176188645595,0.9999173396440383,6.488436732808318e-11,0.9969166844857356,0.7585097724547324,0.1603093246436095,0.010811122686737663,3.530507827943421e-8,0.00012860773438973634,9.591512210396128e-10,2.1553295107478766e-5,0.3513318495620944,0.03437589399229506,0.9942325904623425,0.13024911536125144,0.4339388368264335,0.10166082409353153,0.9999835044022088,0.9997236661083843,0.9989768482405423,0.42623759712586085,0.9999999503454795,7.241193830771472e-6,1.6636557923575283e-9,6.035903026248886e-8,1.5449056863347966e-9,3.1630068873663737e-25,0.004497380039865006,0.07983003451366463,3.044100001964634e-10,1.9348104351399096e-10,0.8356814091770728,7.251405134707315e-15,7.881378993480252e-6,2.1105875210395427e-15,0.0011465842919481288,7.253482859801968e-6,0.0060347947031690555,0.012549185709637454,0.5790528116331051,6.87283978013575e-10,0.6141029527243348,0.003917436737370243,7.37697941243256e-10,0.005018726001793819,0.00030533547339351986,0.9986117786418925,0.903203632152856,6.128884552393174e-14,0.5923879239318794,0.4097966332507801,0.00227779750835739,2.033003054086962e-6,0.8701547248251568,0.0007977035551826287,0.00027960674663940255,0.28084155398363203,0.6796271336102233,0.22144970215709434,0.0003389116293469731,1.9592153684400587e-15,0.03168423126851712,0.5977690723766709,0.7193509265406726,0.3880400686776531,0.3658770642428269,0.8282169947752667,0.39601513235808894,0.9606491521512674,1.7338017007203905e-13,0.5488663776666955,0.9997202867516295,0.9999998758652271,0.9994912213159192,0.8097750317747103,0.5074742895920297,0.9949640251054331,0.00013205014704759547,1.662514381744881e-9,0.051588139494009186,4.515445195450878e-6,0.005641032580287843,0.0006159826695223274,5.601544399566661e-17,0.914399557825467,0.010018823412300048,0.17132917408194454,0.28106207504166514,0.241811265547467,4.0069528991144186e-9,0.5638845907960773,1.6776957813290376e-12,0.8825772344479242,0.7980178718942511,4.2509280781677583e-20,8.604654661684572e-10,0.5042954894817648,0.03301373164267971,0.7190530924256981,0.20995132808452519,6.567223367210355e-7,0.9133032154214026,0.7511230910431232,0.17301009805758552,5.914316040649096e-14,0.008796646757158784,9.620065510021316e-6,0.0005373075448599021,0.0070422664174323866,0.00027524340226658646,0.8706578795813775,9.809853456763488e-11,0.17002559925958863,0.7280060068525128,0.9990496615428571,2.0380405214579086e-42,0.9993758069110041,0.00011702963078853253,0.004741935459039999,1.2714754378193619e-5,3.871727979914986e-11,0.017782708301119807,0.999846582158722,0.048045708901522224,3.2694358151290577e-13,0.9911310313382472,0.3758565921563255,0.04076763079990501,0.03583621310547398,0.03317364341631939,0.9589217738035196,0.003307155573899791,0.00781546351611369,1.2202955243045448e-22,0.7281334820004745,0.34512470821390195,0.9997656437319543,1.8377196514596102e-11,0.71827648281013,0.2341576412387842,2.680894465748907e-21,0.29642633510686656,0.3097607264579734,0.19722621268307483,0.00895477034962358,3.883436818776858e-9,0.0022517592094636117,1.2539545579621936e-21,1.3095993597307355e-8,0.9999998497844482,0.9203680084046946,1.1819443620418519e-17,0.8601623809694376,0.9343646371030707,8.324516017739902e-10,5.342297176674999e-9,0.999991775684493,0.018542430395092898,1.142736864630662e-9,0.9999995016588447,0.9881550097091342,0.9969764966261611,0.0004888018418519606,0.9873393380275424,0.9999990896709445,2.8896351777700083e-8,0.005909538350426495,2.6356782243825685e-13,5.6059162160042355e-14,0.9717884514266213,0.1109899799359676,0.000493497965520504,7.634059007874457e-5,4.939476912229205e-44,0.09720150411084735,8.802302711174321e-5,0.9964705965984337,1.3561002890156793e-15,0.6018738394789953,0.30613105571521154,8.663496865335899e-5,0.007662760626025801,5.5997935244655376e-9,2.0672643745726314e-6,0.02886243108684276,0.9995751324131497,0.011555297136866021,0.97207816973764,0.999225063785917,0.9575231325206214,0.028044977463728495,0.9981844565755399,1.4077503708279374e-8,0.04684704696470151,0.9049105954560128,0.999198509411316,6.038600638524872e-10,0.27692058199152336,0.19185136865117833,1.941900324775329e-15,0.06461711901860825,0.708444633222788,0.015558100073771132,0.9999991587849494,0.0001251627514417755,7.115416118534373e-15,0.8033445743334362,0.020869052254983773,0.986888721423687,0.34481068841230417,0.9966664658429383,0.0006369599876602946,0.9998225420265595,1.9499768085064574e-16,0.191305030180932,0.7521030026342255,0.9972947827601716,0.002865819977697242,2.3727725462969074e-5,9.54230549491823e-9,0.9505104609729979,3.237807104854196e-6,0.09211988018879996,0.0011002203784448814,0.15142918354432253,0.9870793654192244,2.6868137472082647e-9,0.5917368686590083,0.018747602977787728,0.7507647268141325,0.002775718315917815,0.403789981935727,1.9624318891502043e-7,8.528918324263369e-13,0.8811114104421505,3.0460127701027006e-10,0.15229379690796158,6.561463626443464e-13,0.8095042993901533,0.7386149776102253,0.7434801981258232,0.9987861696842839,0.9999029414729906,0.4513230422008071,7.501597479941115e-7,0.00017916050809654974,0.19473523365626066,3.865675608946951e-5,0.021721689496854074,0.9934482323985739,0.9980305972387111,0.9432292688586774,0.5749887874037207,5.272840082450978e-15,0.6336072846131833,2.5658270123889288e-11,0.7394651478490072,0.0028577683417708192,0.00017152342365584207,0.99650268216882,0.5693154997036999,0.002289535819284851,0.0002880841513424138,0.8805599875277539,0.9925925645102935,0.9999661934815699,0.9478728542437025,0.005547572323211825,0.9640641014171257,0.9065189155171894,5.863731510282162e-20,5.198776675751907e-6,3.6077185385179017e-29,4.25856351198106e-11,0.00046235419597996495,0.01977200891438128,0.9965697714904141,2.580956850168783e-17,0.39471402733198563,0.9996749436480564,1.4147611581749827e-9,9.297503269273702e-41,0.9689635750010297,0.03090504747872827,7.235902746867488e-7,0.99635085319172,0.9684736924906309,0.16948194951020326,2.2912480572951188e-7,0.9322526499327756,3.5020552029818355e-5,1.648495013341804e-10,0.9707658622322258,0.11631275098275051,5.124052942004896e-7,3.225385752524136e-14,6.6786071157111e-8,0.00038173016534854035,0.9082219097454388,3.924976213753945e-14,0.9570774660271101,0.0012374389856782565,1.4364772416759222e-9,0.8877801886658658,0.9999997926566503,0.0032777432417978743,0.014246300671878879,0.21831209144217864,0.9999974689762177,0.042182647457717444,1.5855056383488474e-5,0.9061496317165811,0.014453652260433268,0.9849015377302528,1.3670047219855953e-5,0.9668258905467577,0.9937981394049088,0.9997950756593668,0.7846066357216362,5.899684747584746e-12,0.0003503813128023028,1.5866650871596244e-18,0.9100147238529076,0.027654244255021266,0.0021746475065055164,0.9999999996771477,8.476419814474209e-7,4.790706884898937e-6,9.592413674330302e-22,4.323584349972694e-8,0.6219385309227343,0.0032411330450015955,0.9999624358685564,0.3872569275430319,0.2738693148277526,0.0008683949014037938,0.9825333920715447,0.982188170433778,0.9999283942854398,0.6297586545247461,0.9995397891726886,0.007504730015756114,0.0002528170143966024,0.362941926939027,0.9999999567037774,0.0025624452839197987,0.12436367769775462,0.39931342500395967,0.9957331047926411,2.163844436646781e-10,0.0032128833942123166,0.05190287487936151,0.02215061756979007,1.054509416356105e-5,0.00015520903328881995,0.9999909423126834,0.03473459827219724,1.1687852721292346e-11,0.9597128184716458,3.643268227267951e-5,0.8471873697428701,0.012323858073606727,7.447276600824625e-10,0.9998308134468511,0.6475166617359227,2.3127338030169595e-16,0.0006211668391158618,0.95893052444618,0.998779240191154,0.875238915578578,0.17571591356512897,0.7671997739615377,0.9157630386681501,0.034138359414020984,1.3061122813104317e-12,0.97809714024612,0.000642384717361384,0.9997789488456645,1.1525712503933877e-23,4.0607356844290475e-7,0.9894538083144392,0.0015821647140723978,0.9999904298640937,5.68499526775018e-6,9.729422021606572e-23,0.9804493971767554,0.3031919777984335,0.9960979492670918,0.819150144774405,0.9999141960542006,0.9612582688852349,0.8595123659738543,0.974241631167996,0.007850721826934564,0.6570369982915725,0.9277173600994324,1.4889543736926777e-9,0.01991497847112036,0.19088775168757827,0.5152142291932229,0.02364363373627828,0.9928999966670244,1.2748563572460717e-11,0.40273547009195726,1.4971367221532022e-10,0.00044976672653259086,0.9988221747362015,0.7774310445416559,0.3088829451658627,0.7770114391398822,2.966869017768131e-17,0.22639678418807926,0.8397678649841553,0.9725519516286911,0.22173828983748106,7.077308440201647e-11,0.6423901983244801,9.867421588873347e-35,0.9850782089802435,2.5289299663867735e-8,0.33101797112164866,0.001562486201104639,0.2491487804233967,0.09789571333794336,1.764250217411278e-5,1.1677033078863748e-7,6.984777387861252e-5,6.20301990669251e-8,0.17688123464421082,7.212046410806832e-5,0.944703648240059,0.0031704891231126627,0.9995732635450384,0.989293575924875,0.9965428937104881,0.486459660910586,0.9824257088739581,0.9903983364475981,0.9999943479210146,0.010321534881522158,0.9708071232302358,0.0010789238421394251,0.21618352916945802,4.782113116119802e-5,2.642108972861124e-5,0.9607410156497409,0.041106846663118285,0.19754272397436784,0.0013591921650957387,0.35252479351613597,0.9840564580688611,0.9549407449618601,5.108857897300759e-35,0.2564563785884723,0.9690850888003781,0.0001552075617892535,0.6323235584004252,5.2511324892737516e-5,0.000204886911147412,0.8422929981388309,0.7005818310798129,3.752539703727363e-20,2.3541520921380335e-5,0.00021584952950166116,0.9934291977038414,4.954690606897994e-25,0.9708806047876305,1.702516838877204e-14,0.12253578023600487,0.9981747167034615,1.9570225201544894e-12,0.924927039749655,2.477114592671244e-14,2.1704449853636563e-17,8.326924592710207e-7,2.7920251678312565e-14,2.0375669885976786e-7,1.460843270689062e-10,0.9958046579451467,0.935496473925763,0.004668207336268883,2.227235600713586e-10,3.332531938497277e-25,0.12597639379438413,0.9527148386300334,0.0034425523025054215,0.12184141268667793,0.48013972539803973,0.4111154540340415,0.0002464360395745577,1.1525456768867016e-14,1.3463246391447084e-6,1.809877077251366e-6,0.8754323713921079,4.3645323712251843e-10,0.8856632965249956,0.9998903816022928,2.0048771272326e-9,0.019666863147373533,0.001182606373687753,4.2747941377131305e-19,1.5263757999006996e-24,0.03553815597253379,0.002954904549946023,3.5066469416657197e-19,0.008037136920209402,0.9996212868849729,0.1467392308683896,0.0005643401296359095,1.0042548956839743e-9,0.9997166281403115,0.9999999892914515,0.9999805081752358,0.6976699395565686,9.412284329430368e-20,6.742766556583399e-12,0.9661352742605922,0.003819889338083034,5.4310355762429945e-8,0.5005783323123225,0.9999337257674803,9.536017382903711e-5,0.9997880188413826,1.2786435274560644e-11,0.0071423004623304516,8.145674544108579e-17,3.671268922385246e-8,0.017641529626751362,9.558785265744625e-9,1.150654518089256e-27,0.8572927540205677,0.0026146787408535374,1.0551971916452497e-24,0.06522724924824949,3.4785022336209368e-12,0.06755135175611549,0.4368036488489733,0.00030933063165616007,5.7117021904758585e-8,0.9389939508414756,0.984348014947043,0.9999996503871089,4.437165595948127e-8,0.99800786969458,0.7754178717528108,0.026295626825821622,0.6424848884983179,4.032935017844957e-6,7.438665924988585e-10,0.6304393925682672,2.3968252363562208e-27,0.010581380398198512,0.9899128535276912,6.081507012717333e-22,0.4082307277841979,0.9991041643657271,0.002581677000932435,0.10484912137744468,0.12617728009979365,0.04217134708161557,1.9266262280668828e-10,0.9137094880550497,0.1734243249939349,0.9936124714479295,0.024943536009998237,4.850075328509096e-10,0.8187171485739402,0.25373241098439947,0.001107974057282362,4.283305819261194e-10,2.7708328943338817e-6,0.027454346924580972,1.1661319298096389e-10,0.9932520875578291,0.01881867244230418,0.07459943208210691,4.403504964491705e-7],"alpha":[18.4086731407646,12.987034210539852,17.618266715018468,17.274671432094834,14.10155379973374,11.647368794239824,19.775487400963748,19.149389792284477,17.936325814019575,13.051542875795386,17.752640360469208,10.561831598634434,11.161960994048492,14.451413223355704,13.004241968362408,10.454315200455577,13.457764403254597,17.87389283762063,11.300496989520518,18.51457183693693,17.616040558403363,16.615810526135057,19.053301358785312,17.473523029914336,17.673845962282556,14.370393042719558,16.240650766618437,17.962199799488655,16.124283303254458,17.830164641031484,17.391536971936958,16.945304466135127,18.20240958372942,18.110944192156122,15.550719612566041,11.768408058843566,10.204589721205666,13.58073849419962,13.645650253817534,14.218751219454395,16.0005952382334,14.489812785120776,18.240203296308984,12.07978856193635,17.480187868866807,11.30871341735289,19.357793368411492,16.15153063290624,13.300642939659344,14.311715210852176,12.989993413267023,13.766412995668464,16.113801173978267,17.09546838926392,13.56758889875967,12.671652134497828,11.315809797962238,16.433530786249957,16.88649757365951,13.46647967849444,13.155734201581534,11.46434292267855,15.3722426167665,14.848367722195366,15.91594304005489,14.951498293780052,14.0021429051515,12.382335118312755,16.067422879019276,16.256809653717895,13.857962060966425,12.630510506817135,15.21060710360252,18.324946823884577,16.997915427099798,12.643333742252686,19.076640185829408,16.785702180119394,14.225851184744336,14.645517386419302,14.575808918838359,15.753162501727374,14.440882692872046,15.515091685865611,14.739783705317848,15.422096399633325,19.466192017485312,19.463553674164434,16.733393820001922,15.571545123153346,12.597593320483487,16.391117640002513,13.49741442496482,10.495080533299813,13.56416346106554,11.983542486647421,10.08345914188411,15.54424804719497,19.334812621977115,17.421966865858202,19.24944680944838,15.955619264807737,11.374943082287029,12.318085009688398,19.38484427798283,13.7817459761438,18.482078769323227,13.891401334350142,15.370438053292432,11.416958804571337,15.7492218865275,15.229895590966871,18.943841754172905,19.681681187407506,14.257608719748056,16.67044745469358,18.098705959879567,16.644263074002442,18.750173563192572,12.742033006693227,11.696546922983984,17.01247914283748,19.64431186965773,16.470091765020506,13.820548186750813,17.46801965568086,12.622362705884711,18.455931484941324,19.367759179181967,19.96123955593982,14.479407592719891,10.979406780211987,13.809559003099483,15.370189137725095,12.15424306164402,10.683309703438661,12.4622335588397,14.170052079991367,19.321689528039155,18.792389113851534,11.980774163661136,19.201293972463315,13.974350217957722,15.146664816143407,18.922499155446438,10.084247918866609,10.93149518116088,15.382705073571152,15.76939543547301,18.295101782049294,11.857193096550445,17.997073697818877,14.080628726223532,14.206168048959855,17.488119346140575,15.73858407006349,19.419798487130414,10.509809510004061,19.995341087701014,18.010636177224434,13.384663923723569,17.681236617363695,14.083561228864244,15.991139980332196,12.625544561720714,15.855697455584659,17.300845355268706,17.957955986384007,14.550578722335217,11.534945317935666,17.507725728238675,16.21144289547682,14.47435055414006,15.105735047646965,15.172592849407975,14.559852958548285,14.466590533515895,14.416084224527541,16.429657564220857,16.931101639508295,15.186978276381438,18.6935015297098,14.865245036654988,15.166127766971814,16.863518835512274,10.764463993515434,11.892521788999495,17.120426913770313,10.443083194984766,17.61246013379854,12.361288962747265,14.095850554362602,14.193870033910772,14.468744208998242,10.159430305236013,12.261188373041477,10.048602133245382,17.11251221093625,19.46300232286861,16.73038901610119,17.151501358288737,16.831942509679468,15.020350201873068,18.644589817205098,17.065117681426194,11.784640896943719,10.958907212238572,17.28129777160399,13.50102277623228,18.900295243982796,17.51602578067737,19.344069748784953,13.033210987467507,13.56218461534822,17.05658018185674,16.90613536162029,10.738297664049428,19.04315997711138,10.495218864119435,13.495688790265447,11.47891478574306,13.269157994725504,10.890498213910593,10.485175998104372,18.259895274139453,16.29494387665683,12.289308558964837,16.19840087572248,19.224826252794657,12.94309630077364,12.2138766139722,15.263445534516649,12.810079376662928,10.014024103823091,11.761397161935962,10.14284789289001,12.416222761903274,11.716046484993077,14.459265626184504,16.003085104084338,14.974303481119481,11.982569793980218,16.96487494580092,14.16082161619602,14.9593795908653,13.07018609841422,17.147018071426047,10.055312654446041,12.63298473561224,18.80063688912587,17.30554806989081,18.976278371190443,13.561916337330107,11.904714419604435,14.72239698238642,12.421894644082624,15.34335012258245,15.288165235857317,12.386303147739818,16.5871010351104,19.719290983602267,14.783728899618556,18.506824005412348,17.94521279143428,19.994105054190396,16.447940337844955,11.530503820023243,14.353640260499315,13.291575788911041,11.526391336492331,15.090509261753894,12.746165238257243,10.939895616578731,19.209707170014134,12.215244201920296,16.365278894765204,12.09021441370024,18.122300300328376,12.360785140023703,17.203992450613544,19.138116684572793,19.481930862785603,11.635505797623097,10.320083198128376,15.839630406858959,18.515888565056073,17.763781414649202,17.539827246731576,10.910201630499285,17.575053813975845,11.734419384420923,12.866001798066636,15.587672788208959,16.925077535080217,19.912299842653994,16.761778278691605,10.897928306774167,13.810693202042938,17.167506914748145,12.671522423761568,10.417085407819396,11.169285163115191,17.623680890453315,12.073158574587906,10.138386984915746,10.994437732505029,18.964895199519866,19.780634660063022,12.886670316841588,12.867932189980444,15.116723218920502,19.01908926851302,11.444190330325814,15.015589972344008,17.201962283728157,15.134885142494362,15.588942922904156,12.450573583186923,16.03124409325322,14.15114077087849,14.041183821887797,10.141448821108856,16.738597554404905,13.04064763036908,15.640988770654925,10.952466431496015,11.936881801038018,16.795377662028407,18.926811127012726,12.989137696861402,18.181071140097426,19.860379461361152,11.55439230212226,16.339510377397882,13.340662799362423,18.481522283051895,14.75312196364503,17.641504473324584,13.94795141787488,18.40743265504682,13.340067226114684,13.21190851839068,10.648535292503299,18.40945516873373,19.82044965139561,15.979493840513527,12.61192105004213,13.621166579556832,14.70343467964323,16.84012316538039,10.624556672534613,14.231172362299798,19.96681050020691,13.199612540656808,12.657649515509169,12.509755247683394,12.134162770743506,14.371592577507428,19.34105556088295,18.179452504029292,17.167139781732278,14.461403793556771,18.876966595963786,18.33692448193029,15.666325357599346,12.716743364051554,11.00978719755263,10.075097967203025,13.098362756449228,12.364812813476851,13.517413091060517,13.453208445357635,16.701063899365515,18.469296978685307,15.768010619440076,13.845816201961128,11.566361620124583,13.30570539833867,19.793868013241852,17.404393951565176,12.647650074150272,13.860128885707612,14.263239849277987,13.82873430948848,13.513467970774023,10.033221006278437,11.358396733536708,13.513562648869048,16.464451986711985,16.977875918885104,16.991222121308617,16.572341242442967,11.859699129940838,13.011518254468053,18.63057766875692,12.288032147705083,19.003012516142523,16.30047562302107,15.658706716257164,14.66910161510162,11.184450253209091,14.206986697075575,18.840389680048307,19.915910082598227,17.648858896808285,18.557035690054462,12.688771554944898,15.373297960994424,13.707358152657745,17.98975285775938,10.96494984693311,19.567454952219,19.055915635095662,16.858241300533656,10.0909128101915,17.20043012268868,12.461125714073656,17.45059499774886,16.4903618679422,19.67833868520506,11.236945056563204,16.91426848839877,10.867230668289437,18.219472427441012,14.359140315458692,11.422568608852393,12.965462042787578,14.841209435363442,11.799555157115474,19.153915719191385,13.802199721450792,18.22980636306299,18.041859481634926,17.34664771895541,10.659638187114256,17.204930297743022,10.838680855317913,17.327147748865762,12.966003042263008,18.639966011833096,11.816439122538123,14.568912585836088,19.989563492263965,13.544871187309253,12.189480844259977,11.60021000272099,18.07852163617941,18.608680155385166,15.02922731636099,10.685685923545803,14.963708623139855,13.283826074191708,19.281957230972942,17.377475272199195,17.949791109264666,15.039861651186344,14.713761432798776,13.927211582896781,16.47627981909036,18.903874183661507,19.357038940224747,15.560330433211382,11.890286085633146,18.931861474916392,16.82974706553754,16.08993535821265,17.412268049900447,12.391688538242258,16.431971798487496,10.181155651826177,11.965855628935307,18.207547327535835,18.79251055571338,13.439319256464227,13.250359777665889,19.374231943930603,17.56602587021834,19.428883664212584,18.885861876775774,19.01382021745614,16.639439736821245,12.993931892837331,16.11318377521364,14.817665960309457,10.379036950955063,16.540272074833357,19.688249623777885,14.064349696418006,13.993100625546655,15.204787542968665,14.11711053621419,16.096436584533457,10.110330953284537,11.579573538311116,17.1489751966325,10.501022960665477,12.44227631439404,13.674657477465924,16.374585843092934,15.49214817428026,14.373434054821118,13.527284606745827,18.738531207367572,16.706232307485752,19.50300216402194,11.082894948092456,11.045014272799898,11.22455916846879,16.42536156044697,10.555995521586132,11.445148106247657,19.61454905355518,14.437979232881453,17.392897701606135,16.576767280496174,15.328426997521216,11.939866152722056,19.159861164447214,18.580182569463716,14.6495303457733,10.187907293559995,10.982211836435734,17.957687350151613,10.750129345052876,11.723750880175373,11.969300728136528,15.502884620187682,18.589841835062572,17.319638441029994,13.345513588095457,19.129779431499475,11.698106916435794,16.394131565998855,18.403947532117623,16.039990770615685,15.083217965306146,11.753154064589923,11.744346007698397,14.89139984501996,15.745812080789603,16.804696822212776,10.661158126750454,13.572470970249526,19.87706072953503,12.161677044805408,17.14947640878403,19.27770791413323,17.805709097768453,10.309810781835916,17.12205860391214,14.483185801442984,19.0370311317607,13.782234617870092,14.154997725732816,14.930757478806392,10.882719606040311,19.980273400756168,17.930079933115984,13.446112580611661,17.480462346805844,19.405455710920464,14.316019547011798,14.49417206587688,17.45894540932532,15.896747513749862,14.989382332964087,10.836579418228261,13.81082497357215,16.678198342436744,11.413335112143951,18.42224543033697,18.49737122434778,13.679114731227342,15.07578035264942,12.713363152748787,11.292844793293211,10.783989719435992,17.73074884934302,15.462177567996205,10.655269643302532,18.163388775231,15.17990076170783,12.806314516388579,13.877618053128716,10.445747331730313,16.181099297778474,12.264510223895426,16.1787447092418,18.64402250383037,13.136243988220688,10.440406244408521,19.72334103172603,10.605641656140502,11.929494998123317,16.70069499088438,17.987435581554006,19.457085839093573,14.667699701639872,17.844521938134154,13.796748167550811,17.32634490355992,12.282330969537531,17.348957675087348,16.325379122266114,17.386637188585187,19.33100647210523,10.807130249337195,11.226426308470792,19.19642729080696,16.511099203061704,14.90441201156936,12.629782462589374,11.963015764619731,14.99492784487124,12.433457219834674,10.841726999322583,12.340714441294214,10.01766046086403,17.864940764539753,15.70160622068817,19.339436118861325,12.589331237048253,15.166925167409142,17.705885389421795,15.375387012155343,13.302562753577906,15.842668485913551,16.991049332775326,17.541480480921237,19.676957537328725,17.964403741664796,11.27430267380075,16.782875536205772,13.235895651802618,14.593224144435787,10.144119673694256,17.791617809031735,11.41410999527388,13.37804956559473,12.186324012787201,15.533277321381311,12.26562596771058,18.90927645969571,10.683238363978928,19.09987883230265,10.881941064927616,10.751705285807125,19.735993413023316,13.313472906331734,14.98854604008635,19.21754633270966,13.251206924154172,13.026497089973654,11.465053194940783,10.501277120940495,14.314803896241129,18.31088296501165,14.100532654177574,14.235832327557782,19.628910544805667,14.349007375612711,16.57860348986269,12.083481406800033,13.896531645550956,12.650645862081216,15.463328217785264,10.638382474914374,10.271993522678882,17.5546475764558,15.9916342060559,13.099454479804272,13.368480316999342,14.388251481710688,19.333349733457375,18.93021364793788,11.397181638247742,14.628854553045498,13.414465044686715,18.11351650749514,18.053969117161824,10.449752104725851,15.125793514223119,19.112728784921757,12.236146718183578,19.976279781472368,18.608857062459947,12.625030973173786,13.881299013580254,13.691954183113658,14.654862418154666,11.025629724120789,11.169944409118308,17.059447621755165,18.38216461160274,15.53395173664467,15.56989939470067,10.368294322696855,10.110597445345258,17.2166439186951,16.618853582234014,16.23752308263665,17.624485236262153,16.862130726593147,16.752935941682964,16.739389300811872,18.011393547890826,13.188901974158933,15.154599337146728,10.82791117017729,11.492317536502433,10.412356806568052,17.462688824690673,14.839469658630067,12.53691088491109,14.780884073294594,10.950677632290986,13.192961867234729,10.567379715794958,11.424089535330639,16.9463716611509,10.55521566832451,17.388280844210858,18.766305783224126,15.555122592326668,13.487337744419126,19.929226627515575,13.789813722539112,15.156723466132568,13.73901837255115,12.003999197982507,11.79421756742331,10.883419119619553,16.166180879574892,10.088528966442393,14.56198595817935,14.654388760698131,16.223688665156047,16.316320010968035,16.09570215275005,19.066717516324985,14.516524738421875,17.64947126158425,13.932850070202985,16.902912067293265,16.48403680027578,11.494087985301107,18.765668239418627,16.64521773287589,12.929300583225782,18.721138107972678,15.285802008766167,18.50289255173516,18.08774034426992,12.479445979300941,11.535925675789871,14.660419212345825,17.99087365425687,14.486695100396489,17.068681333025893,11.7372211372209,15.951241500728617,14.31296371607752,14.454203720323004,15.067271212497266,19.743385719062683,15.567458963729093,16.683107511709707,11.751943002715437,16.136995386212938,18.54656890695923,15.532846619998484,18.099769254452298,19.406820706662344,13.028262331816755,19.387528121928433,14.611005841603701,13.131792856191268,12.502662551314945,12.738356240631116,17.104500115087667,18.884013635339713,13.272163681004383,15.518669157576493,16.922118903579804,19.041983773976185,15.115456000818554,11.705168895958899,17.059557391381443,16.088848705400682,17.206965640550468,11.052931669945497,10.135627993181068,11.441712848202883,12.335881169686608,13.937986980134742,18.272467507785862,16.265743676614697,18.47817805825164,13.194465141772614,14.567223096526865,18.18938492414116,17.527940402060548,18.627092278296615,17.73309070891,15.1059873296674,16.36043723380062,11.218590969208197,19.00627227749933,10.747868598888637,14.51141731240536,19.918029619493986,10.369682351467127,13.034269960118664,19.989894981313753,13.124024325406182,13.6941930885412,11.113557819658915,13.084529258253394,19.698890888761937,13.67093020517412,10.667866683991331,13.992469250378312,15.138021205401294,17.454454227255237,12.754896694171764,17.89736505453817,15.96785771831855,11.974108810220594,15.866230905818536,10.344028886452453,13.921013679306395,19.857001179105996,10.430946503752702,15.027166535394025,17.69064980091679,10.62029615991936,18.977210627690454,16.811414675134028,15.337654260803827,10.807686431074558,19.474701792515145,17.59966290290959,16.942484359135012,19.570226446484696,13.683382178876526,13.190701210417394,17.72589356118167,15.237959597602266,19.263021578922213,14.060981093064697,17.07430197535418,10.227687925375786,16.578833205475313,12.4972033141517,18.397521972026524,16.711395489408552,15.243034515851917,16.790275561252756,16.199739184252923,19.600941572573394,12.186887495581873,14.342678520150077,19.132214110403385,18.898896127703793,14.612511960728886,16.662194722103898,10.143065062822188,17.247158003982058,18.505212819965422,13.512399342556712,17.45942818266076,11.417354279476333,14.089201030158344,10.568858625399836,13.851405068241455,10.80163488798745,18.803146720493825,18.397744766223735,10.288442959453434,17.897438657149742,17.70423329303559,12.969058450868719,16.217131026413803,12.457904206289967,13.894024372486706,16.603097739819074,14.043184252202927,10.813105636504845,14.723246645813449,17.99466164857703,15.760109929025429,12.674330713662425,18.233160091550502,16.608037637559878,14.994867246684127,17.31699078373144,19.24183388389845,19.009766980974483,13.398859762425834,12.503502539712198,17.80285624135171,16.247639197072427,10.325319080423023,12.06309319199171,10.968348592698256,17.131128968503347,13.68671394178824,17.290517106947213,18.283383010424817,12.126438383878948,19.723319147024572,17.76578959812717,17.54633083231117,13.309741176082774,10.92908761874818,15.526753680978107,11.202209165617795,15.399822005901601,17.816446805152033,13.69815948491273,14.408868671633678,17.363943377833966,15.456866773932882,17.374561958202115,19.565405969375256,18.289444986675683,14.193654149357783,17.39127804905305,11.677977433331382,17.447836299344438,12.301552219063545,13.358080916138395,15.834296238457089,17.68979111095527,11.739356355463567,12.604166254783795,13.932242075242833,15.148379963350202,13.537819478241715,12.00275860946622,18.7402424459409,13.610426173770332,14.695142209168683,12.536298297955605,12.577134108941074,12.930406230959267,10.569478257125763,17.184030301124693,13.187284258928035,18.06368839614518,13.607482105717601,10.712389729195452,19.41889933101941,17.038449069965267,19.042867293227665,16.212092926990834,13.813567732758107,19.204128470990284,14.345821331889674,18.930819673666456,12.65115565384033,12.607737553546972,11.04992544244297,13.639565946886478,14.187422670260672,18.61839649551684,11.715142877016584,11.749406562524758,13.286693531599713,17.18663114198578,14.825024424104472,12.418089904054435,19.107507946976757,19.88651045021893,12.180405693395516,12.147510523698184,18.118920024731352,14.494751550249953,11.450253404432612,18.096793659924725,17.472146632877987,15.63961352532748,18.55731030823992,17.45125373731433,16.26865217277537,12.57510991874053,12.310113299416344,15.522888367875584,13.291145197467536,14.692347210274022,14.64378626030771,16.428987107736212,17.358819434955564,14.62603533523784,18.355954970550552,16.56341114445184,14.949569248356047,16.897396694190796,10.863471328150304,17.51393149158207],"x":[1.3191648900267894,2.711087305458183,1.5463397705778592,0.29511414814317183,0.18485701587748427,0.5200944688091902,3.557792705361973,0.3607595994706281,2.6347997511381482,2.520177464436071,1.8401332648580315,4.479424514414542,2.664292829605295,3.22972464615797,4.290453769904548,4.864233585267046,0.5065100672439771,4.709424185011599,2.25410960951422,4.366565306986331,0.6119468698265518,1.8073246389908193,1.9188426353679444,2.3378607945263905,0.5653871713308478,2.663079258026756,1.2782201627430678,1.868298654065198,2.3125394734781324,0.23094530662906898,1.125438985235162,1.7386199595737928,4.548010346803034,3.4059882400504526,1.124976086698446,0.2080345587536303,2.9044741005821226,0.05822398349429436,3.952346038560509,2.0513826721482884,4.232496507933831,2.829944684106427,1.6475110474342336,3.3285827856826735,2.8113563412527465,3.8032619490092214,3.0206643036777248,2.1567609533191066,4.653151605358692,3.410255407901958,2.443460076259585,0.5931665957549193,3.762208805046461,0.45439520224926255,2.9390247982054296,1.2495407817437054,4.7542876471602575,4.203017813928338,3.9268397779145925,0.20659498367393336,2.7601300281529975,2.908014079959984,1.6010719084461689,1.0000636209921343,1.1435322079496324,4.988578483493518,1.8928074601701361,0.15767894194794518,2.9385084816341775,4.570413397382872,0.0693285448463643,0.48304825727002343,4.813223508030273,4.094885058932234,3.6662330147553535,4.473865534020054,2.7058154827948733,3.1748087547475654,0.5559488242567223,1.1203822332567193,4.276545284558507,2.558634133129971,1.9196279193255072,4.728633322385354,3.6767264103507857,0.6517501031663397,0.05224658265460036,1.0320629404762027,3.3634589408275684,0.15472433235365513,3.750888772614509,0.45899062126357637,2.30665073144987,0.10266068797061045,4.870424139013592,3.4802244388563652,0.9055012428442444,2.4443825274894495,4.027434809158428,1.010382409843017,3.2585294891719907,4.578675447048081,2.0962254210418854,1.2615988092791064,1.8518557420789794,4.0076859403367155,0.44952001198981906,3.384884442058244,4.737635085377294,4.497399839361806,2.595217983077843,2.1281228041871714,1.5856994717215822,1.2531887208161951,4.381328620888356,2.5124726595501166,0.8408015515964617,1.0814042454287565,0.20178643242616423,1.0661413584033697,0.1815370192039878,4.247038501933568,2.1183436582684845,2.4103299335373354,0.8399098896913093,0.6671645477877952,3.34691051678774,2.7004027499390535,4.900019902688994,1.5753863150430159,3.3884910542288615,4.0381156248379115,2.4579133912248063,3.0913663110149114,3.7001998223770203,2.56519715931809,2.0848921726072476,4.212921847130444,0.0030429292241462846,2.60401944829584,0.021319722658360574,3.8321829859325343,2.751986715262933,2.449186500407764,1.4539021254580209,0.25616439547496817,2.097910307262243,0.11831494178441426,0.3655679982976412,1.4424259223517566,4.452408205729375,0.6641929952055592,4.752198825185231,2.926629364000526,1.173152364643597,2.5188533599270126,4.286433507254115,4.509068665807944,2.8637979960040205,1.5127706333263757,0.1579661068221494,4.084864671465055,4.5135616567188155,3.075616912912672,0.5439838510036965,1.499349788781904,1.1831219320177866,2.427208610997551,4.503658232683775,1.9572294542018198,3.2427238843830364,0.5937876762519334,4.109999649754574,2.959262561739715,2.569862634092752,1.8349597601207635,4.614092811055088,0.3890124954682417,1.3943782654350523,0.03303817595536773,4.67482723094893,1.1780100784398329,3.8439818755799617,3.5979425864096726,0.6070366987567766,3.6444110324210452,0.733851197450125,0.4080647660935921,3.5516415938254475,1.1802548750850006,3.384222502150319,2.0647656249153146,2.7286246339056373,1.216744464921512,4.352478195272628,2.2791266055580053,1.4043863083665364,3.9202098276623456,0.27420700735246717,3.287256722060424,2.1774763171646736,3.63458234272803,0.8347735539830992,1.4654561510691588,1.8186999136685134,0.5016327040779567,2.1240293213286843,3.292521387401519,2.1032703444272127,1.916479796178373,3.42054640144813,4.776035314524687,1.4882535706797884,3.857947077243211,1.1238519431389193,0.9280368549101414,2.0442871038546597,0.13105196021455878,2.193880050248879,3.367133549334289,4.356549800746581,3.351817656769441,3.837306429853715,1.962689084071907,4.036428866125222,1.6867094020773798,2.9073150449547533,1.2228928098283975,3.0215314530319626,1.7962034794673454,0.033254269809948056,3.4402764696429813,4.874336969317005,4.517918248667382,0.7038310381465818,3.015324191663915,3.6865151125951936,3.163998649122851,4.156389284079486,3.4385291447108592,1.114843491653501,3.6619119039957893,1.0257348397834953,4.809580870783004,4.276461189663663,1.7691878187600751,3.3674581658120206,1.0542536586980533,1.9229746885982035,2.2113497051800888,1.2306347753852698,1.5431709677604688,2.162951655545251,3.8840575262337085,2.140982705854122,1.3494991297173342,4.543111673586516,2.215939137453594,3.128927086575588,2.3737336834340517,3.5573431253820798,3.783356050682679,1.5634421299932855,1.1427652757755402,1.881984608797842,2.2267767971431907,4.23313096569876,1.0362036420229037,4.726010296033865,1.955054925273595,2.5959527887414033,0.0482119625897548,0.14313313153194618,4.316395566228847,3.667743463121772,2.1955092269704157,1.3755242712444915,0.022640324509034526,3.435060045434999,2.843936091631104,1.1800299821275817,2.113593905735307,2.295989948717253,4.590921882594076,2.120812579727953,0.6692318191732594,2.244916556646662,0.8748943683225108,1.1152346868230667,2.4552190982555677,4.569470839147224,4.659020813620573,1.5259473035285642,0.24981475555579835,3.850603546255784,1.1682648977842136,3.816278491839109,1.0813449055684077,1.082468264473485,1.4037208453832117,4.544566023891847,1.3404941054504937,4.989685173394176,3.40947022787725,3.3743212752195317,2.961975243266667,3.8193151261725355,3.282858120963602,1.7959840452967124,0.3472325011917088,1.6782790910018452,3.3895288800532986,2.4033934284243017,1.672688105449326,4.148560956152764,2.9993630111023006,0.19633009821081182,3.649386749534702,3.234335007963136,0.7970875920857567,4.13782641719642,0.10813385818040588,3.9747964865600824,1.9520092210807682,0.1222579809968749,2.7029958515466266,3.3965930616819318,1.7840570084394747,1.1383644084382072,4.937465194831894,2.819850674554062,1.9768463042184337,4.211144421376135,2.5834910367634856,3.2705807387649766,4.526625184669203,1.475437405598351,0.23323794978063694,1.7839076979723112,3.375804054421059,4.56990521044192,3.4590927927305124,1.6222793558399462,0.9660884196265007,2.4953729757212106,2.282883456048068,1.4666880377501679,0.7908078022829024,4.70929337883679,0.5622858868901437,3.5148176184576743,0.2712295921817409,3.5148507323674028,3.5596125663066247,4.5718563910988035,0.7854879085608535,3.1592738987821347,2.6061755558017063,1.968728442562243,0.5566467555060073,4.50716743798738,3.7461944001499847,0.3649274990312579,4.4993203099865395,1.3656537237124755,1.063413833675908,0.12330329509775861,1.5461046916649668,4.645963758271677,1.7595556958832081,3.0430924996361353,0.4705861221898222,0.07256549023912928,1.7465569025811856,3.30562774935528,2.144484855161526,0.2284688732487561,3.7546867152838903,4.550996888403237,3.712359414989476,2.434298313672232,4.565768471678387,2.128687010007233,2.244131228983912,0.8918269422788239,2.757933577513594,3.5641838804999484,3.0054180331049074,1.7317413949867366,4.738064478916975,1.7206742727417645,1.4000180864693768,1.6721638800605798,3.3881797696346547,2.7400979329447317,0.3691188296072978,1.5899437215920653,0.5517988628217652,0.4475157362186488,4.574758834962871,3.506080122046474,4.4838764352537765,2.507971438121781,2.410460101651325,0.3464935204872621,0.6919067873829177,2.626423261392341,1.103929711180911,2.8710642484675497,2.873941946691425,1.0295905382440784,4.670615391951376,1.2249977446699944,4.046126391328617,0.018844011125352944,2.079034166625646,1.659576158080226,0.18206540986649866,1.3043274021362206,2.960584683680799,3.8284910939851824,4.341320677080538,3.987873208173501,1.5722962907751337,4.800875904629182,0.14505457848612457,2.971915702121364,4.6775407344380815,2.8580161465735787,1.1482199413623029,0.20190114963415495,2.348713798366735,4.260118041897336,2.2235729085132316,1.5144841591149782,1.6758286063239936,2.630613460689384,1.4407509802847762,1.9308611351750105,3.698012422561577,4.474750735564291,4.067461293601889,4.339140775894271,2.061542162567147,4.683426990208115,1.7163903931163171,2.331050156645784,1.385071786673806,0.25330838788663046,0.25137009195436044,1.0877644028917943,2.398855573347415,0.5136741078237328,0.34227050475511556,4.8593350210258235,0.21577828804533405,0.5603731600093842,2.7782262098947816,2.1748153973026865,0.594761652132566,3.916644017492392,3.431566621714529,1.7710998620736362,1.1848893374289382,1.919325822447726,0.8253618500060267,0.2757494124738502,0.7965921834368017,0.7163859234381975,3.494602339825569,4.881323719026163,0.3801339129083592,3.038106802818723,1.5854180694575204,4.880183494191974,0.7381544108077975,4.1990375544004515,1.562562772074756,0.8519280243357186,2.399836708507086,3.0780633490436116,2.0342566469723646,0.8676335378897804,1.5784138428289307,3.0241574247057246,3.92914812983318,3.34381926338831,1.6466380119743462,2.269450701875275,2.263979452508341,1.7618238781053441,3.4401566938213235,0.12594511738036718,1.8920716264758786,4.239149138143583,3.6457037670240755,4.139702499109292,1.9198462711647735,4.355417928556108,4.534952309483641,2.9949927964036025,0.19633653083112157,4.259541049913657,4.338042641879967,3.0593385113768456,0.39517940487698966,0.24744627973010913,1.769146996054577,1.0649039458664156,3.404569801672083,2.602182686560285,3.617112348773116,1.8697755275425554,2.5381385433154025,1.9648727084601325,4.900202314621314,2.013297203379152,3.957029127693338,1.866984326159512,4.710978686718623,0.6433712486948018,2.523192401464507,3.963652666316543,1.0542122543853094,4.936684253376624,1.7389297019100236,2.2217189190162756,1.0334485542902927,2.9130442326644577,2.029772301848498,4.791894584010157,2.1604748929785913,3.277536055223357,2.6514443441530133,4.434476976474556,1.850802263533774,1.4748526398113793,3.602175529643572,0.016234098532760255,4.071394431158555,0.7716363603821874,2.042395900955606,2.0727902476183457,0.2855637456560911,0.9150156007465604,3.6424856317790812,3.577346901636572,0.18352416409068817,4.219722307503754,4.49514027804881,1.161469736474674,3.0292394573110104,1.166003072848636,4.983974601175695,1.1074225963935425,0.8635926427795937,4.362362280398213,4.260678472662413,1.7371866943548953,4.441817422042245,0.4112936471070494,2.1653950218226967,1.2077764837756422,0.21108016570912658,2.9854891499898786,4.711068509713051,1.3161338933613942,1.8341603915834248,1.0428648956699371,1.7888756762651126,4.640965228891904,1.3091896031631667,4.95403335022602,3.4050420263819206,0.043812537825720366,2.435097364160245,2.8759175515103594,4.223031160673353,0.5269280322192549,4.405886690452558,3.0182545331046717,0.9006518752896187,4.811250653667027,3.206468885254493,3.9222203386560417,3.079423219743899,3.4452857517281865,4.806922174470477,1.922483684405194,1.0006484988694542,0.26908056224420496,1.1406423286558143,2.647560401817761,2.4345466977153096,0.913764018325055,0.8172886890430597,0.10331209410106235,1.5002714609253032,2.3768543493124583,2.642995361943724,0.22932603561448328,1.5157238026314568,3.1219925132343107,0.8613328938591014,1.1164384407843186,1.1232383718556216,0.4619102625834415,0.5924501150013184,3.9400886359198917,3.5684577886686752,2.4064715125354184,3.324332887425708,3.7989461132316027,2.400612594170375,3.804271405711118,0.45289283446142914,0.7829528290482923,3.069706279957096,3.4681399031176943,0.4937525128365239,1.7276440931912962,3.0015004184360006,0.2876363388999892,1.8196892352304672,2.7420300242550546,1.2553442783984914,4.665433027363431,1.875757638983383,3.9307370516994347,3.6687815966436146,2.5333365041832545,4.40532403230856,1.7904282037459973,3.476550195670174,0.5579444626116348,3.2729345831910206,1.540342036454383,4.669598990342844,3.370620719864459,4.448601277381644,1.1372966842981858,0.9015973472417194,3.917570863944163,2.0573339680391936,0.6995972511963378,2.349170328956778,1.1559259440043923,2.631803847790816,2.389043301267301,0.7843532386119845,2.1640534340926267,0.7636111767129117,2.9426054086048206,0.9181602737840433,4.026793812451935,1.0054774489734464,0.3093944620835154,3.5827943804672993,2.3497542363422195,4.825819361548255,4.884195660067585,4.824941213922718,2.7820833311383506,1.8646394135816813,2.878677300068011,3.7207145109671402,4.2080750833623926,2.3140915003346993,0.7566485687793878,4.5254928413370745,4.5624955708376795,0.8162756883615663,3.57710396042887,4.9657588956176655,4.9586848631253915,3.3835101072065896,0.7362891504712554,2.649923892690542,0.2314261270300011,2.8695302562721037,0.7765840982884775,1.5232849026956685,3.943463088831922,2.537466466499346,2.3890304921881054,1.0766728972454553,4.744467104716095,3.7852366724662447,4.7131308997879575,3.010398312380025,0.6235431036226413,2.195971634881758,4.231814797137786,0.13646407221192924,1.4490337521791408,0.43054229126169297,0.08694443990013179,0.7783939710819576,1.897486541295328,3.7555085683637177,0.13546588770492973,4.67242614593928,3.502498206733028,3.486588749552605,1.420183095751203,3.1745666759766555,0.8613094496525753,1.4488349276553547,3.211051214194077,4.172760689957263,2.3620558550794013,3.8487702273723667,2.280040811314563,3.218193574066656,0.9564213534639121,2.8547894287046063,1.3531220994103843,0.14715067515377211,0.14971962741419542,3.9850477127642847,0.7150119239998332,2.9559787081800315,0.745544161326881,4.930982182308545,1.1301929355034268,0.8522878879345175,3.0018869343574117,4.522903559875394,0.8407758605233473,2.582282869740824,2.374334576236085,4.290800558699538,1.3427156723293598,0.20232227935811697,2.9578130800966598,3.1324104805710085,4.512668203754848,0.6843361636382206,4.888476974815569,3.3768569653270997,4.733670258327971,2.725972287872178,1.4401618485198986,1.4263910478001296,0.48107130365675266,2.6380878794385456,1.8411205785706408,1.5138076013825363,4.922604405381134,4.340878354434339,2.0811899656378516,0.08052475228927047,1.006059147608016,1.38560303604211,0.5213627890238814,3.7014839090628957,3.31557054748181,1.6504210802093233,4.844979800882364,3.940014166395136,3.6307434469912057,3.7723115924636774,4.927766872051734,3.1357517138342814,2.660468471917291,1.01845108337682,1.7252833179854365,4.793630722479618,1.784115148148595,2.1634763792842406,3.3359679839300114,4.04122083726344,1.5048960542829704,2.4274023496761163,3.1905427937773165,4.946935145940143,0.3108303110024324,2.621777082839807,4.637264188629576,1.4459756981297667,4.786509727953727,2.668289513007256,1.5322235252968996,3.926413485089814,1.0985081147829423,0.4485438860034541,4.376378888248383,3.294809212611425,0.3649232589632534,1.176132914554513,3.1395588331189526,4.367648277119173,1.6098707058433026,3.4561982195372387,3.188441198480115,2.5604402144282865,2.437052016723155,2.2265308460966082,2.214052129354993,0.5584426295883549,3.840698279063177,0.7217819983061613,1.0744686239245316,4.548284384931035,0.6389419741047586,4.547927896965122,4.320246934485804,0.20540665922077705,1.9027577704658827,2.1996407682786465,4.131727065004064,2.6516416784193098,3.411505730037272,3.0509858061543915,2.8148985571064222,2.5091986127598833,1.1593907616984367,2.571153066305408,3.3487412378293104,1.3369577249651365,0.5594545379449467,4.091950772333204,2.1432992117615077,1.039865164875431,4.393066536256061,0.9115469373112728,2.2400300948654515,4.579048221355385,1.861828790924901,4.072005532462778,2.377215847925158,4.4401480146893,1.7865755394658156,0.08740681292098929,2.336653818233636,2.451446882311484,3.8032720269508413,1.6817314625279167,2.323239953165471,1.679022479803578,0.04961810510603182,3.01180527418607,2.8653321445438094,2.3052571808888036,2.9190558705593785,1.3333987907975553,2.1562678912858146,1.3934378668404934,2.376882788793784,1.4422052388028206,0.6436191155608784,3.720512486871276,0.8051456613135455,4.372448939775678,3.4808678977027974,3.533137739574148,2.915013018923763,3.6756064963105963,4.073639728972659,3.561321028271087,3.2649103725459847,4.553535077740377,1.2170724034853775,4.5729615334088844,0.6773848074561772,2.7452647792732456,2.6229451824430186,1.6948990058437563,3.1601595132424496,3.745100238221848,1.7407012908680741,0.9137479438380003,1.622992589030502,2.5780980132643205,3.0277891725616324,0.022878829827274183,1.8473812244931032,4.824431363991404,1.604888325175735,3.031478672851838,2.6376130036959333,0.7141105688805915,2.398875599230398,1.6950680236670879,1.4522074438540988,0.7843961971819058,1.4817194723879301,3.5795288928370383,0.053979040584277715,3.758210482922083,1.5382936259457092,4.794760164595474,4.869579229848037,0.16102830018714487,4.9527502390865195,0.29714156919780854,0.15802971972030622,0.7632752001876753,0.1708639813949886,0.26221685476133905,2.3987077591883974,3.51634013044251,2.4607039843174814,1.404608703035155,4.734932661380089,2.2189384745537044,1.9705205133494008,4.318592260122855,2.426097036975933,3.580358904890699,2.07827443737731,3.663124886206833,2.001846571179872,0.0954900443081641,2.665601501103364,3.0252051081177633,4.638533713486066,0.9870000402244061,4.0747413204041285,4.676012990297962,0.21271192703820385,3.8812813787407396,0.9999735629278261,0.804149839640792,1.3833594157003037,4.3821279882918995,2.2329638340820877,2.766519717846787,1.3810360709275626,4.600652388106009,1.1559353616288126,2.8057616219758383,0.7663938311094665,4.168371107269785,4.7428759124317565,3.967849230681023,1.6686901994075587,0.5657666093301728,0.25944270310635176,3.977698951688015,1.1005307838258693,0.26850794987205995,4.00693575522096,3.542985236241228,0.7015728871455673,4.844608087453021,0.11232677432671312,2.94635907497937,0.5879234424939317,0.9569199552084262,4.039074092829966,1.138112415204301,0.3330578396200401,3.430572555166449,2.0991192916389023,0.047728031543951,1.17959505362063,0.231405897596918,3.746861662846628,2.054046655247398,1.3605895943419388,0.774446931991285,3.372877037209033,3.6400891082344575,4.860076575436333,0.8376437693156169,3.0612731934283657,1.5236974842161233,3.8853284778376684,4.003269459183876,0.849013419747936,3.687985454186821,3.3686653359289656,0.4823585887324955,1.3680442139346227,2.497742028488419,1.1240176158903303,2.8333053898443916,3.2941892160929074,3.913458248878828,1.830017427177546,4.224332115763811,3.5991667288641773,1.386461791675877,4.259318423954222,0.9800987403627559,4.55297196304797,4.365166626187649,0.19024073588494228,1.9333954528639197,2.409525939214477,3.9366884845930272,0.9474273843124192,1.1030419676041958,3.930846188511723,1.1546996068255788,2.778209927989679,3.3486123347186303,3.748645568472304,2.1044507720925854],"beta":[3.5176090531009185,4.828120928956682,8.57687881408273,0.7178130045388942,9.757098610068482,4.749640297827846,3.4670887998285904,5.7901419825507805,8.152054499550609,0.11390071181156314,3.1835402234279253,8.13509733611981,8.298476118441261,9.021070817135206,4.522463689245839,7.480887457838506,0.4283604774057137,6.009884983018898,5.558500290953187,5.593492889420211,4.70229557496147,1.0218167461727479,8.176099211633874,9.13336114081294,4.924153898642018,5.480506223826749,8.128619607568886,1.0929814582648545,9.804836744189188,6.268525077894718,8.0611453975791,7.238761210179698,4.111483643303031,1.5925430043830802,8.254338102589331,7.576897345227838,1.3764346133256011,9.513703758253204,8.668705881379662,9.916672974750163,6.878559314032342,5.853643935202508,8.221628644190975,1.671213983048332,2.4171384901500303,1.6664812557222186,2.4144843391228243,4.620882072852204,4.845032892575,5.688968672108463,3.815184679237258,6.70308219783565,5.52998225296951,6.6661227765832765,7.326244755909331,5.974241513229519,6.976999809404301,2.2097304534311846,1.3833415857534659,7.786863560587962,2.5582998443861737,2.4887143858818805,0.3049301672178739,5.556840104177629,7.404793015100443,5.451816452673077,9.696804406088066,1.6989536576483544,2.04871364605707,6.266229461666175,5.094290498901204,9.935135552046246,3.252700255649521,2.5852119935786755,8.030112247107342,5.885446861423896,0.11019375328018333,9.533287542012879,0.9597113164512794,5.81794727378756,4.1499245920965855,1.1935024156167517,1.3726020564741526,1.3581539533528653,2.0831832760566393,2.390817097995419,9.54982303787051,7.745722817191643,3.587449213639178,6.427507494671076,7.116805002851918,5.059061867262898,6.845597227140294,1.8026174569638376,0.12444543997294222,3.3394345774269496,2.524481564052703,1.394260098603326,1.293723553775492,9.47548857947634,3.2141344300758923,1.2536975410388895,8.366794753952497,7.388225113341395,5.677700231304099,1.4576697146308848,1.1985188045457473,0.7072283924175027,6.465224435530111,1.6179663100777297,9.854499699304476,1.5560212316842414,9.849062097162012,6.218089996288474,5.257677409257004,5.89153211108663,2.7980075752758937,7.026731940767661,5.1018812694420195,4.5617407616775,9.696960941520151,8.83892941736082,4.964583401992355,9.50619345937575,0.7901881668625688,4.763178553672917,2.776789554634622,8.864684645690843,2.2291491735496427,3.5957456029204127,5.083517663237429,2.8024773801714797,9.76067027548661,6.19852752669658,8.08715029898407,5.239719564281846,9.628392816462037,4.666105022027363,5.120598948676642,9.635468016953103,5.679106792920077,1.5693356417221138,2.56008612027514,5.6185612363596515,8.503851077715556,4.677294642985366,9.039293203410693,3.63293154972957,7.078165009974342,6.397885927444658,8.77908908488626,8.859272555831723,7.915523014580619,6.593938025567779,1.5347963618085636,7.504582641325794,8.702336382746523,8.054475367023834,2.7874051761999996,1.6024342780555467,4.132279482423895,3.266679068187879,1.6393852488093286,3.3539573460553296,5.466470020644754,7.082559164753189,6.736666705254796,7.022068641242534,1.653135786864306,2.769389809205558,4.16431130116181,1.8498700009791191,3.6187070416999,3.8686557259548504,4.5527357482223785,4.949132183271043,0.7805177610558034,0.7666611841098114,4.692038355001058,6.679646495863524,3.834037825333292,4.579429568074049,5.0175858723404225,2.6285078013627627,1.4969728013223138,1.594859974322107,6.8961356391088575,4.829871395493579,8.839595958243542,9.147869957803627,0.32058064825537747,8.03461786762687,1.8907105662077583,9.160017387418966,9.710824918882768,3.1873056093751884,4.941616012872574,4.892675216338118,5.996990638255415,4.3913404747797475,9.925154997996952,9.183610832514262,5.04179157314661,8.56448064374765,7.604920162796203,6.308267577097637,6.121158601246377,3.9603757181534904,0.25802687814811653,3.1244040513577698,6.788350806233208,2.1888496319418005,8.595253777341796,7.724683467594997,7.5394180187722775,1.7973548154691188,2.3818768072532737,8.354779529257035,7.526458842605404,6.421077356610912,2.397231070039172,0.638846902852015,8.765786968566502,7.6612654040360155,6.495884498624676,8.982146393633059,8.84525347605339,5.456508840789969,1.7252688131075167,9.827188329182377,5.787911528232104,1.5537421928748074,6.439188385576886,5.896729145524684,3.646552212076375,8.106011106122605,3.8358431574382434,9.55988699699829,7.542416851301981,6.812862189961654,3.9665622425297364,9.727107020697032,3.2988150175873754,9.599276768597324,0.2128011394970919,0.6599223245346542,4.5048268514433865,6.079331806331432,5.9686851993401735,3.5701683984464183,9.35077738586896,2.9430567062430857,5.077189831368248,7.468585327971066,6.158853950105561,5.994025989850018,3.6525565767505186,2.7820105379058457,4.929090474607094,7.9263654925954015,3.8120507813804694,2.1100002224235936,4.9612647345294425,2.7534996046549276,2.718246824426882,0.053907796166816624,7.9258863986561305,8.009286928699513,9.279969699907598,7.411702766895944,4.010544992591929,5.230393008524552,2.994532274178794,1.1201921612250287,0.008470579269501677,3.475951334110219,9.950658634526757,6.071771571487689,1.0406569404989763,1.1647960055978257,1.7907867894135587,9.734091494962826,4.793068098456972,5.082789141187143,7.711456333424027,2.9649261782423886,8.52946476619487,5.559122667719452,4.4045737177921085,1.3080929072287795,2.710429718033045,9.563120074007918,1.5664550427774193,5.996607746203805,3.8850266777235976,2.0756945113447345,5.663370363630824,6.687479447492608,6.021725573882993,7.284042506915307,6.195354164753271,4.725575267489235,4.078108560410585,4.506053674798489,6.7169835969663065,9.700206555410125,8.875301613129745,7.456646378596741,5.603898671666691,2.9865895852799884,3.1753608670657774,7.628953598454624,5.492191121677365,9.49608521291989,2.339154565900996,9.110683293586703,2.8654079503946783,3.4019308404571613,8.003086483653759,0.5351776009445031,5.880218696222177,4.5296014074654645,4.474983898087053,9.699372362327786,3.3174338283234683,8.962777262537266,4.428353143206419,1.7200520415689513,0.29923922905907396,4.389285890912844,6.925622803021552,5.693090913437047,7.7150158394541,2.3071179309073964,5.735206580336714,6.7710333183672216,7.116681674151478,6.740599879823059,3.6629246615435584,7.546842641136459,1.5797431939885431,7.716798682062127,9.236628706625527,7.971899653320871,3.3388972429235753,5.749962921303913,4.78420862841209,1.4780003779672435,8.074622217276367,0.5378650589687672,7.501675314598721,6.3360002841292085,5.091400807543758,9.840849601140052,7.828365783173366,9.403149868985956,9.600034149268577,4.710735398668129,7.955601666653534,0.434766112040319,2.39578326966722,2.4646099707708657,3.0465435228186477,9.648558436421897,6.4707540531667345,5.902023061091402,7.315796290964838,0.3092554665620173,8.18422176111974,5.937660216522273,2.4893016696117765,1.3772734663796782,9.657284202386675,5.11893304507169,1.102399161275811,0.12052413443584209,5.239941574758249,2.8044918007644393,4.146394414231535,8.412865037496331,8.232841291874724,4.126394920297347,8.633053165134807,8.92578605990521,2.164445159954904,2.82138096235772,1.7057791450895587,5.9713584374039375,6.86031714742704,1.6062449952010915,9.38929722670242,0.17105823749360427,3.6842556978092222,7.09392012285808,4.886223954990756,4.194795570763972,7.15334610765283,6.401029499658972,2.0414823340602606,6.465499751948727,1.163759087028844,6.594079306515146,4.070000052083258,5.737788830689466,8.426762800390314,5.41611006716705,5.562598934651126,6.684320177882965,0.6142965613129681,3.526337598706202,1.3319535502253133,3.1326861774416215,5.962140643759623,5.98077290611426,5.759016779645432,3.5128852474793293,0.5349623255891878,0.6709155281430634,0.7184172366833486,7.6069977431449605,3.104828065316807,2.229235503418918,2.220991013032536,4.602415628699821,6.910613619731949,4.737194402351729,8.407983970110159,3.7076011544782284,2.9504513185070302,9.18298448172936,9.736602894365696,2.7868625816004,0.649583496952646,2.3444060634469865,6.043461538300907,6.246521698983962,7.952806990455461,8.867110587947929,6.242505524808251,3.6229039041631084,7.096715651522634,7.740107980361275,8.444471869002054,6.087654550869197,8.670415482804659,1.2834983589802973,1.2359023363479826,2.799517208976785,7.399373351606105,0.09730385135772845,6.239307847243065,3.5588714542507094,5.8136319647141566,6.683380773307855,4.534554151942314,3.5942029202146353,6.348057753116612,0.19861378225036752,3.1222000212229184,9.36749186134148,2.573805716669617,2.3564626321960125,6.915749443686472,2.5443169883347827,9.222924580866605,9.001758221671752,9.104239078602774,6.519531601069697,8.332253435594236,6.409077681433624,3.4082971095243586,4.09354697791382,6.412235976712619,7.7586881473210685,1.070614977713198,7.201378268643035,5.319662941345706,5.387590088919813,8.663671293875348,6.787023976392195,5.932861478558822,4.97971150338725,6.730962286813873,0.4273376042106869,1.7406585612402692,4.383564204900203,6.585752116349395,7.717129056549988,5.47956110964795,8.31414487307132,7.282910003848803,6.917677466027317,2.0305784783066017,6.164589548419346,8.293216248306646,9.984923534272031,6.6092622368431435,8.751084407995428,3.700567255845757,6.05887782659847,1.4745688471262786,7.409102390115896,2.8828674832745516,0.992607209117915,3.307257513711339,8.424280890880185,0.6818976114047204,9.066971417849265,7.9681818181579995,2.200054461496017,3.5723955668868412,4.526221403266472,0.9797749016103041,6.986441759550372,0.7571532577824658,4.095642784384495,7.292049289461526,0.20489171283335939,1.5713038257681111,3.047833902317447,8.028656855013992,5.014369481194683,3.6475245285445967,1.373121298303721,3.3650110725666615,8.108731903970055,5.309641036303631,1.5891259006885394,3.088450485652905,1.4797173830329813,1.659425092644995,2.3047476529863253,1.7973813540120265,8.787545924342508,0.4059101943560739,6.154203109721599,9.21548964614984,7.024684867709099,0.6239941923076153,7.796683690382789,7.36822793032633,1.9994551871618804,1.5367874091550848,9.908890770476491,6.563189748246403,9.942532993709538,3.5231714822120974,8.838558851394925,4.602950037183,3.454568063211114,7.386736635007242,3.950336479962633,6.691078841518953,4.2767791668944,5.901875938274623,5.244147595957029,0.15726391891100144,4.756306893120006,6.750298174289837,8.091416632154466,6.229464658357184,7.505641244650434,9.613117480577868,2.3730610720484635,4.539618896853288,2.7257486986903245,6.069299720097183,3.576546853312721,2.4458279060159005,2.301966306654455,0.12559886922438146,2.644416329239989,8.399832470891154,6.113505850712131,6.029864587062597,6.131227772163967,5.599486379372795,0.6244012669337629,4.172626062525733,7.0100067299795965,3.4537153187185177,2.0840222679554343,7.991624540995421,7.371841167030661,5.478733639485121,1.975838139726025,6.207612801341389,8.954052509074753,1.9280707845526912,5.7836874439568176,1.1180073928163226,1.6782575305000513,6.662222065137877,3.2569225925332668,7.0051244202166245,7.509039112592926,0.46736382775498964,6.649105029206945,2.578186764714452,9.791812930981417,4.678962077939972,8.486682548939502,4.809110311048976,6.1274611792633955,7.981236652143164,3.19916686294216,3.5848122190568654,9.759673006865668,9.454650015691175,2.4344920413878346,9.60859271807003,8.100657120258624,4.8746106580584865,3.5498459686644623,6.620788330758415,2.197058996815149,9.078226000078942,4.671936497383706,9.869009331769416,3.935478360273945,9.576760228368762,3.1523357069882096,2.5273873224906462,6.485583451807586,6.298094114279165,5.325929504437572,9.136853364210602,3.1046688821317003,0.31324387781014096,6.361816325334182,4.111583833220964,4.541179346132953,8.314385299145481,7.253700169050548,9.491659820361377,7.809433433744397,0.6711899209914685,1.8055149949366034,4.6453934113647595,5.426257291677789,5.999949221176111,3.089921615521245,0.9062769611713928,8.062427837859056,7.652786492782084,2.9005784702236626,2.9407872933332713,5.782312020471947,9.512274142842259,2.475622969740374,9.200346356290726,8.934290908265101,5.184507364874049,4.641918123900462,2.3380729582635595,2.445380626539808,5.9795174785018235,5.195917315314631,0.6157921584625026,3.13668201381464,0.19020435112498513,4.1516638267748185,5.059287526287872,8.641466490581282,9.099176361447903,9.285524020219311,2.3574426952735017,0.5697642040329209,8.369748188877857,2.7625656189854197,0.726878950730141,8.63553953984788,7.126258228252757,6.938911716265035,5.297804670193558,3.4594253611516357,0.9427405369310238,5.416763335950847,9.588251237593134,7.164111574952921,4.742978483973205,3.2420132975768468,8.365487089583663,4.932390451022064,4.024916317084502,6.715969886019164,3.5593708461915274,6.492890132171469,7.1278177764110655,7.097799785292107,7.057127092833344,8.138618908704306,5.36648544782842,5.261944616412775,2.6247487738378883,0.2311392957609404,5.601672433546407,3.5016239345765543,5.157892405515547,7.918008220705353,5.034449796354769,3.4686865123987243,9.845193075958957,0.688954079692703,0.02027055029475422,8.414066423289734,8.453239705488249,2.127302652616583,6.760480020293227,4.446462902394391,3.1114242249157154,0.973724395434179,9.187095810801404,0.9395207722112153,1.5898180335859613,6.309852329417611,6.688199119584972,9.199402582771814,2.2950604498593385,0.8102134487398427,4.02276137915109,7.82930540877266,2.205931380915258,4.649960818217664,4.433810526550834,4.134635873459624,6.1325564898646405,9.639149562230001,6.854966645101406,2.2108214263579673,3.804252246948334,7.675464148100392,7.396645502022807,8.851535875401906,6.688566649380068,2.4184408016969017,5.794074442471118,6.589613382302719,4.951084559716461,9.392024104141123,6.741194583931072,7.630423902765222,0.6990111737025373,4.432828781195108,1.2500881775783834,6.159047748732302,6.187429584192898,4.852520036100674,9.885447473562607,1.0821846828271653,1.760629328016221,7.244033038970934,3.558792934381403,9.569868665215036,8.424136681457995,9.429185674269885,4.971659515361475,7.280634845960292,1.4403047906258482,5.091868757567603,7.006481215693849,8.838287861617175,3.125404524673552,9.988559282934485,3.9775485560540824,5.275570156915479,8.680481951545163,8.3501364428936,3.9993367733520357,6.347011770578577,4.26547750367579,7.732856929251901,1.9720261486259627,2.1844580883037334,4.017105978609397,1.6121879006498352,9.445466634858153,1.3408412471153253,7.357427910102954,7.194929719474638,0.4884222454683784,7.595521086917443,2.9259592390537525,5.3769165746204965,9.65633681760539,4.01177878801553,6.405853921920479,5.560698483002604,2.0891767301600095,5.82353056540539,5.556657508889553,5.160284080665994,9.560937015858693,2.6229062894245736,5.1661635726801265,9.534219435013291,3.9925376778810273,0.8725300683653581,9.705368006470144,9.464241998665388,9.645936089966076,0.512133418724936,4.115154742901752,6.343658913932972,9.615090885286762,8.721900114863598,0.46335423090354544,2.7598677666071936,9.744968548388584,5.605652389473956,8.182665782896075,4.9792690665195805,9.123135486730476,9.355808288667012,6.05206166793836,8.679677001148745,4.035453388332188,5.541717924657257,7.9150469991579575,1.1074054934055333,9.059684045366577,2.6109394062854174,6.976632586861593,9.79057381331282,5.27045229546143,2.262931600646967,6.555175636900956,0.18609552507399707,3.1425957848695307,5.624616858449998,6.9809724416569585,3.9198983009405253,7.1151801101897805,6.044512445681409,6.171317722965643,5.630709561371083,7.412432913436662,8.066634119213754,0.6761729117836213,6.967558937550584,2.952467392106375,9.26808550806431,1.0509704727056346,7.542143341636692,1.802721900851525,7.939080523636757,5.81980586306587,2.922594757982393,1.8242974025193726,2.7712161120352086,5.0682210351916135,1.9529353923375181,6.621752241136565,4.252798089408127,2.532793872512704,9.561825917487095,8.789230768996104,8.147998248681525,3.8621599876554225,8.433834950642359,6.682370019846095,8.206259680021343,8.608512392128526,6.110733008935987,8.274340464754841,4.868166680611652,0.7875444145538713,3.09544350411725,8.457018700045555,2.0950155957248717,7.956517442203992,4.228729659695658,7.642348371818411,7.251240584581254,6.8460783211913245,0.14135213035946448,8.554655208440563,5.636312314884382,1.5280259592224343,6.273475640836475,2.1984027882878387,5.409370009952463,8.429580142196047,8.287046192813243,0.16808345972640248,6.20134846745195,3.0062343572273464,5.769731785731422,2.6397776144219143,7.143186029919699,0.6174523647196639,1.815415622828307,6.805713765525148,9.379976490778883,4.2142987713948665,4.312830581148351,7.314553562485948,6.324104589175259,3.4543094573569144,6.974221979309833,0.9911336913138613,8.202435383895528,6.329349019540196,3.515821295204997,0.14433438214922711,0.12316973467905168,4.872665265160778,5.740664058829978,3.630888054266721,2.3011563842077276,9.225364012327507,4.508094679281951,3.2490549361582066,5.64208048380616,0.6086794193018719,1.1517120099591516,3.258500684156911,1.834474695858943,5.645323533468365,6.78595476685151,8.118310515535542,2.5485168669204605,6.175933033686601,0.8270231928191563,0.36573490008639187,2.5932066444407265,2.6791374977074867,0.23835068792400493,3.6623647512627144,7.61473439562973,7.5273551662169735,1.6131144146974519,2.6833013956046403,8.611595157390319,8.82984754553192,8.25478257825498,9.34618533546896,0.6498037179953409,3.6092197686116467,4.790062076638608,8.373195630653203,7.352056707603179,3.585949858500279,8.684672849910104,4.809409316375907,6.092674917025422,4.096516338576997,2.9530079884692384,0.6029487242486131,3.6902285277969504,1.7377295403762538,0.8140710825362163,1.0118895409441575,6.253489665756884,4.331461463966367,4.849978321105157,7.352947804383609,9.793113313293588,2.4414751951111313,8.725184314839558,2.8423527852640262,2.14348037075877,4.919458601401958,6.252324992667091,8.486870834388343,4.539914164211889,7.842699586847948,9.295004559745731,1.8486683963340167,4.595145519772745,4.011308264777849,0.2946936013106449,6.012235992669135,0.8000364853486341,4.08733085763232,8.67603745518105,0.46875944048738516,4.6973052833419615,7.581157627899524,2.1569443873038585,6.811428416617751,2.6660289292189487,3.2852045865011847,1.6659643263753665,5.1670413197264375,9.434505367848038,4.997078505365842,2.012283052385655,6.602908707989698,9.354106515121888,4.960848514986158,1.7115908569302518,2.537975476938368,2.9122097217370135,2.814660134115319,1.7072379934986026,9.42202038247708,2.8343386350217004,1.741393342619162,1.877288849334835]}
},{}],29:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var cdf = require( './../lib' );


// FIXTURES //

var largeShape = require( './fixtures/julia/large_shape.json' );
var largeRate = require( './fixtures/julia/large_rate.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `alpha` and `beta`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a non-positive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1/0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided an `alpha` equal to `0` and `beta` is positive, the function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var y;

	y = cdf( PINF, 0.0, 2.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than 0' );

	y = cdf( 2.5, 0.0, 2.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than 0' );

	y = cdf( 0.0, 0.0, 2.0 );
	t.equal( y, 0.0, 'returns 1 for x equal to 0' );

	y = cdf( -2.0, 0.0, 2.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than 0' );

	y = cdf( NINF, 0.0, 2.0 );
	t.equal( y, 0.0, 'returns  0 for x smaller than 0' );

	y = cdf( NaN, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
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
		y = cdf( x[i], alpha[i], beta[i] );
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

tape( 'the function evaluates the cdf for `x` given large shape parameter `alpha`', function test( t ) {
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
		y = cdf( x[i], alpha[i], beta[i] );
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

tape( 'the function evaluates the cdf for `x` given large rate parameter `beta`', function test( t ) {
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
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/cdf/test/test.cdf.js")
},{"./../lib":24,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_rate.json":27,"./fixtures/julia/large_shape.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":146,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161,"tape":224}],30:[function(require,module,exports){
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

var largeShape = require( './fixtures/julia/large_shape.json' );
var largeRate = require( './fixtures/julia/large_rate.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a non-positive `beta`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `alpha`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( -1.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, 1.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, PINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NaN );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `alpha` equals `0` and `beta` is positive, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 2.0 );

	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1 for x greater than one' );

	y = cdf( 3.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than 0' );

	y = cdf( 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 0' );

	y = cdf( -0.5 );
	t.equal( y, 0.0, 'returns 0 for x smaller than one' );

	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0 for x smaller than one' );

	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
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

tape( 'the created function evaluates the cdf for `x` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
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

tape( 'the created function evaluates the cdf for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/cdf/test/test.factory.js")
},{"./../lib/factory.js":23,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_rate.json":27,"./fixtures/julia/large_shape.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":146,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161,"tape":224}],31:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/cdf/test/test.js")
},{"./../lib":24,"tape":224}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"./abs.js":32}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"./ceil.js":34}],36:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":123,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-to-words":139}],37:[function(require,module,exports){
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

},{"./copysign.js":36}],38:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":71,"@stdlib/math/base/special/kernel-sin":73,"@stdlib/math/base/special/rempio2":95,"@stdlib/math/base/utils/float64-get-high-word":127}],39:[function(require,module,exports){
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

},{"./cos.js":38}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":44,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/base/utils/float64-set-low-word":136,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],41:[function(require,module,exports){
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

},{"./erfc.js":40}],42:[function(require,module,exports){
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

},{"./expmulti.js":43,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":106,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],43:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":75,"@stdlib/math/base/tools/evalpoly":113}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-set-high-word":134,"@stdlib/math/constants/float64-exponent-bias":148,"@stdlib/math/constants/float64-half-ln-two":150,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],46:[function(require,module,exports){
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

},{"./expm1.js":45}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./floor.js":47}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":116}],50:[function(require,module,exports){
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

},{"./gamma_lanczos_sum_expg_scaled.js":49}],51:[function(require,module,exports){
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

},{"./small_approximation.js":53,"./stirling_approximation.js":54,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/floor":48,"@stdlib/math/base/special/sin":101,"@stdlib/math/base/tools/evalrational":116,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pi":160,"@stdlib/math/constants/float64-pinf":161}],52:[function(require,module,exports){
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

},{"./gamma.js":51}],53:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":147}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/pow":85,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/constants/float64-sqrt-two-pi":164}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":44}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":41,"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/sqrt":105,"@stdlib/math/constants/float64-pi":160}],57:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/pow":85,"@stdlib/math/constants/float64-max-ln":155,"@stdlib/math/constants/float64-min-ln":158}],58:[function(require,module,exports){
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

},{"./finite_gamma_q.js":55,"./finite_half_gamma_q.js":56,"./full_igamma_prefix.js":57,"./igamma_temme_large.js":60,"./lower_gamma_series.js":62,"./regularised_gamma_prefix.js":64,"./tgamma_small_upper_part.js":66,"./upper_gamma_fraction.js":67,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/floor":48,"@stdlib/math/base/special/gamma":52,"@stdlib/math/base/special/gammaln":70,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/pow":85,"@stdlib/math/constants/float64-max":156,"@stdlib/math/constants/float64-max-ln":155,"@stdlib/math/constants/float64-pinf":161,"@stdlib/math/constants/float64-sqrt-eps":163,"@stdlib/math/constants/float64-sqrt-two-pi":164}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/special/expm1":46,"@stdlib/math/base/special/gamma":52,"@stdlib/math/base/special/gammaln":70,"@stdlib/math/base/special/log1p":79}],60:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":41,"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/sqrt":105,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/constants/float64-pi":160}],61:[function(require,module,exports){
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

},{"./gammainc.js":58}],62:[function(require,module,exports){
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

},{"./lower_incomplete_gamma_series":63,"@stdlib/math/base/tools/sum-series":119}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":44,"@stdlib/math/base/special/gamma":52,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":50,"@stdlib/math/base/special/gammaln":70,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/log1p":79,"@stdlib/math/base/special/max":81,"@stdlib/math/base/special/min":83,"@stdlib/math/base/special/pow":85,"@stdlib/math/base/special/sqrt":105,"@stdlib/math/constants/float64-e":145,"@stdlib/math/constants/float64-gamma-lanczos-g":149,"@stdlib/math/constants/float64-max-ln":155,"@stdlib/math/constants/float64-min-ln":158}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{"./gammap1m1.js":59,"./small_gamma2_series.js":65,"@stdlib/math/base/special/powm1":93,"@stdlib/math/base/tools/sum-series":119}],67:[function(require,module,exports){
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

},{"./upper_incomplete_gamma_fract":68,"@stdlib/math/base/tools/continued-fraction":110}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/sinpi":103,"@stdlib/math/base/special/trunc":106,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/constants/float64-pi":160,"@stdlib/math/constants/float64-pinf":161}],70:[function(require,module,exports){
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

},{"./gammaln.js":69}],71:[function(require,module,exports){
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

},{"./kernel_cos.js":72}],72:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":113}],73:[function(require,module,exports){
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

},{"./kernel_sin.js":74}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{"./ldexp.js":76}],76:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":37,"@stdlib/math/base/utils/float64-exponent":121,"@stdlib/math/base/utils/float64-from-words":123,"@stdlib/math/base/utils/float64-normalize":131,"@stdlib/math/base/utils/float64-to-words":139,"@stdlib/math/constants/float64-exponent-bias":148,"@stdlib/math/constants/float64-max-base2-exponent":154,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":153,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":157,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],77:[function(require,module,exports){
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

},{"./ln.js":78}],78:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-set-high-word":134,"@stdlib/math/base/utils/float64-to-words":139,"@stdlib/math/constants/float64-exponent-bias":148,"@stdlib/math/constants/float64-ninf":159}],79:[function(require,module,exports){
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

},{"./log1p.js":80}],80:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-set-high-word":134,"@stdlib/math/constants/float64-exponent-bias":148,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],81:[function(require,module,exports){
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

},{"./max.js":82}],82:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],83:[function(require,module,exports){
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

},{"./min.js":84}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],85:[function(require,module,exports){
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

},{"./pow.js":88}],86:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-set-high-word":134,"@stdlib/math/base/utils/float64-set-low-word":136,"@stdlib/math/constants/float64-exponent-bias":148}],87:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/base/utils/float64-set-low-word":136}],88:[function(require,module,exports){
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

},{"./log2ax.js":86,"./logx.js":87,"./pow2.js":89,"./x_is_zero.js":90,"./y_is_huge.js":91,"./y_is_infinite.js":92,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/sqrt":105,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-get-low-word":129,"@stdlib/math/base/utils/float64-set-low-word":136,"@stdlib/math/base/utils/float64-to-words":139,"@stdlib/math/base/utils/uint32-to-int32":142,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":75,"@stdlib/math/base/tools/evalpoly":113,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-set-high-word":134,"@stdlib/math/base/utils/float64-set-low-word":136,"@stdlib/math/base/utils/uint32-to-int32":142,"@stdlib/math/constants/float64-exponent-bias":148,"@stdlib/math/constants/float64-ln-two":152}],90:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":37,"@stdlib/math/constants/float64-ninf":159,"@stdlib/math/constants/float64-pinf":161}],91:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":127}],92:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-pinf":161}],93:[function(require,module,exports){
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

},{"./powm1.js":94}],94:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/expm1":46,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/pow":85,"@stdlib/math/base/special/trunc":106}],95:[function(require,module,exports){
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

},{"./rempio2.js":97}],96:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":48,"@stdlib/math/base/special/ldexp":75}],97:[function(require,module,exports){
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

},{"./kernel_rempio2.js":96,"./rempio2_medium.js":98,"@stdlib/math/base/utils/float64-from-words":123,"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/base/utils/float64-get-low-word":129}],98:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":99,"@stdlib/math/base/utils/float64-get-high-word":127}],99:[function(require,module,exports){
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

},{"./round.js":100}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"./sin.js":102}],102:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":71,"@stdlib/math/base/special/kernel-sin":73,"@stdlib/math/base/special/rempio2":95,"@stdlib/math/base/utils/float64-get-high-word":127}],103:[function(require,module,exports){
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

},{"./sinpi.js":104}],104:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/copysign":37,"@stdlib/math/base/special/cos":39,"@stdlib/math/base/special/sin":101,"@stdlib/math/constants/float64-pi":160}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{"./trunc.js":107}],107:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":35,"@stdlib/math/base/special/floor":48}],108:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float32-smallest-normal":144,"@stdlib/math/constants/float64-eps":146}],109:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float32-smallest-normal":144,"@stdlib/math/constants/float64-eps":146}],110:[function(require,module,exports){
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

},{"./basic.js":108,"./generators.js":109,"@stdlib/utils/detect-generator-support":168}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{"./evalpoly.js":111}],113:[function(require,module,exports){
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

},{"./evalpoly.js":111,"./factory.js":112,"@stdlib/utils/define-read-only-property":166}],114:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33}],115:[function(require,module,exports){
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

},{"./evalrational.js":114}],116:[function(require,module,exports){
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

},{"./evalrational.js":114,"./factory.js":115,"@stdlib/utils/define-read-only-property":166}],117:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":146}],118:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":146}],119:[function(require,module,exports){
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

},{"./basic.js":117,"./generators.js":118,"@stdlib/utils/detect-generator-support":168}],120:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":127,"@stdlib/math/constants/float64-exponent-bias":148,"@stdlib/math/constants/float64-high-word-exponent-mask":151}],121:[function(require,module,exports){
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

},{"./exponent.js":120}],122:[function(require,module,exports){
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

},{"./indices.js":124}],123:[function(require,module,exports){
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

},{"./from_words.js":122}],124:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],125:[function(require,module,exports){
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

},{"./high.js":126}],126:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],127:[function(require,module,exports){
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

},{"./get_high_word.js":125}],128:[function(require,module,exports){
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

},{"./low.js":130}],129:[function(require,module,exports){
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

},{"./get_low_word.js":128}],130:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],131:[function(require,module,exports){
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

},{"./normalize.js":132}],132:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-smallest-normal":162}],133:[function(require,module,exports){
arguments[4][126][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":126}],134:[function(require,module,exports){
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

},{"./set_high_word.js":135}],135:[function(require,module,exports){
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

},{"./high.js":133}],136:[function(require,module,exports){
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

},{"./set_low_word.js":138}],137:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":130}],138:[function(require,module,exports){
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

},{"./low.js":137}],139:[function(require,module,exports){
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

},{"./to_words.js":141}],140:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":124}],141:[function(require,module,exports){
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

},{"./indices.js":140}],142:[function(require,module,exports){
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

},{"./uint32_to_int32.js":143}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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


},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{"./define_read_only_property.js":165}],167:[function(require,module,exports){
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

},{"@stdlib/utils/eval":169}],168:[function(require,module,exports){
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

},{"./detect_generator_support.js":167}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){

},{}],172:[function(require,module,exports){
arguments[4][171][0].apply(exports,arguments)
},{"dup":171}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{"base64-js":170,"ieee754":193}],175:[function(require,module,exports){
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
},{"../../is-buffer/index.js":195}],176:[function(require,module,exports){
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

},{"./lib/is_arguments.js":177,"./lib/keys.js":178}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],179:[function(require,module,exports){
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

},{"foreach":189,"object-keys":198}],180:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],181:[function(require,module,exports){
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

},{"./helpers/isFinite":182,"./helpers/isNaN":183,"./helpers/mod":184,"./helpers/sign":185,"es-to-primitive/es5":186,"has":192,"is-callable":196}],182:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],183:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],184:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],185:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],186:[function(require,module,exports){
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

},{"./helpers/isPrimitive":187,"is-callable":196}],187:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){

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


},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":190}],192:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":191}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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

},{"./isArguments":199}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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
},{"_process":173}],201:[function(require,module,exports){
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
},{"_process":173}],202:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":203}],203:[function(require,module,exports){
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
},{"./_stream_readable":205,"./_stream_writable":207,"core-util-is":175,"inherits":194,"process-nextick-args":201}],204:[function(require,module,exports){
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
},{"./_stream_transform":206,"core-util-is":175,"inherits":194}],205:[function(require,module,exports){
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
},{"./_stream_duplex":203,"./internal/streams/BufferList":208,"./internal/streams/destroy":209,"./internal/streams/stream":210,"_process":173,"core-util-is":175,"events":188,"inherits":194,"isarray":211,"process-nextick-args":201,"safe-buffer":218,"string_decoder/":212,"util":171}],206:[function(require,module,exports){
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
},{"./_stream_duplex":203,"core-util-is":175,"inherits":194}],207:[function(require,module,exports){
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
},{"./_stream_duplex":203,"./internal/streams/destroy":209,"./internal/streams/stream":210,"_process":173,"core-util-is":175,"inherits":194,"process-nextick-args":201,"safe-buffer":218,"util-deprecate":230}],208:[function(require,module,exports){
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
},{"safe-buffer":218}],209:[function(require,module,exports){
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
},{"process-nextick-args":201}],210:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":188}],211:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],212:[function(require,module,exports){
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
},{"safe-buffer":218}],213:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":214}],214:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":203,"./lib/_stream_passthrough.js":204,"./lib/_stream_readable.js":205,"./lib/_stream_transform.js":206,"./lib/_stream_writable.js":207}],215:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":214}],216:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":207}],217:[function(require,module,exports){
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
},{"_process":173,"through":229}],218:[function(require,module,exports){
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

},{"buffer":174}],219:[function(require,module,exports){
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

},{"events":188,"inherits":194,"readable-stream/duplex.js":202,"readable-stream/passthrough.js":213,"readable-stream/readable.js":214,"readable-stream/transform.js":215,"readable-stream/writable.js":216}],220:[function(require,module,exports){
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

},{"es-abstract/es5":181,"function-bind":191}],221:[function(require,module,exports){
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

},{"./implementation":220,"./polyfill":222,"./shim":223,"define-properties":179,"function-bind":191}],222:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":220}],223:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":222,"define-properties":179}],224:[function(require,module,exports){
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
},{"./lib/default_stream":225,"./lib/results":227,"./lib/test":228,"_process":173,"defined":180,"through":229}],225:[function(require,module,exports){
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
},{"_process":173,"fs":172,"through":229}],226:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":173}],227:[function(require,module,exports){
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
},{"_process":173,"events":188,"function-bind":191,"has":192,"inherits":194,"object-inspect":197,"resumer":217,"through":229}],228:[function(require,module,exports){
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
},{"./next_tick":226,"deep-equal":176,"defined":180,"events":188,"has":192,"inherits":194,"path":200,"string.prototype.trim":221}],229:[function(require,module,exports){
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
},{"_process":173,"stream":219}],230:[function(require,module,exports){
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
},{}]},{},[29,30,31]);
