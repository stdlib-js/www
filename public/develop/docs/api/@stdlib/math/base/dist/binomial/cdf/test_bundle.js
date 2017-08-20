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
* @example
* var bool = isInfinite( Number.NEGATIVE_INFINITY );
* // returns true
* @example
* var bool = isInfinite( 5.0 );
* // returns false
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":77}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":184}],14:[function(require,module,exports){
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
* @example
* var bool = isNonNegativeInteger( 0.0 );
* // returns true
* @example
* var bool = isNonNegativeInteger( -10.0 );
* // returns false
*/
function isNonNegativeInteger( x ) {
	return (floor(x) === x && x >= 0);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/math/base/special/floor":77}],16:[function(require,module,exports){
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
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/math/constants/float64-pinf":186}],20:[function(require,module,exports){
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
* var y = cdf( 5.0, 10, 0.4 )
* // returns ~0.834
* @example
* var y = cdf( 0.0, 10, 0.4 )
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/special/betainc":46,"@stdlib/math/base/special/floor":77,"@stdlib/math/constants/float64-pinf":186}],21:[function(require,module,exports){
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

},{"./nan.js":23,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/special/betainc":46,"@stdlib/math/base/special/floor":77,"@stdlib/math/constants/float64-pinf":186}],22:[function(require,module,exports){
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
* y = cdf( 5.0, 10, 0.4 )
* // returns ~0.834
*
* y = cdf( 0.0, 10, 0.4 )
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

},{"./cdf.js":20,"./factory.js":21,"@stdlib/utils/define-read-only-property":192}],23:[function(require,module,exports){
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
module.exports={"expected":[0.8625911879550838,6.39387072320242e-14,1.0,1.0,1.0,0.00018872035761347596,2.7722699448605134e-21,1.0,2.988696028511476e-56,2.618576926934643e-12,2.9648348750748933e-44,1.0,1.0,1.0,0.00027179342991753716,1.0,1.0,1.0,3.276022033515207e-5,1.0,0.22888065024264087,8.513982171071155e-33,1.0,1.0393232758854281e-14,1.0,1.2771699511227144e-75,1.0,4.110376882225004e-46,1.0,1.0,2.1185605679503523e-34,5.906753632631604e-175,1.0,2.281454887083373e-120,1.0,4.428873054704971e-67,1.0,0.8627133183693534,1.0,1.0,9.51938961088053e-35,7.839781917078197e-146,2.455877947546716e-29,5.74678299925431e-22,5.823010032872975e-18,3.511264201276835e-20,0.5975929248832317,3.101413666591562e-41,0.0001702949850444755,2.135578815213751e-60,1.7651506402649974e-23,1.0,1.0,1.0,2.349102879834092e-33,1.0,1.0,1.0,1.0,1.0,1.7472792645262737e-11,7.931989588614293e-17,1.0,2.491622544765424e-40,0.006848639881502525,7.203415611222393e-43,3.575475717466361e-11,5.012223384450205e-8,1.2938714913159547e-20,4.70988242261858e-8,3.226496461761115e-26,1.0,1.0837220694340974e-7,7.599184059410255e-21,1.0,1.0543290368674766e-9,6.717093770229338e-16,5.0836943271263235e-14,1.0,0.7234300657386001,0.22754337232282118,1.0,0.30573582658385556,1.0,8.574396269774556e-34,1.2731044607400736e-7,1.5760924752848165e-38,2.110355143433055e-62,1.0,1.0,5.247778963909507e-104,1.0,0.9999998105783159,4.817283270522827e-96,1.0,1.0,1.0,0.1561443007722548,0.9597288386094918,4.940916501628587e-70,3.021140176293624e-17,0.5461208563863963,0.867016564620879,9.23429718231851e-39,5.4952415509463756e-27,1.0,1.0,0.9990642637496508,1.0,0.23483168782029565,1.0,1.0,1.0,2.8319022978604363e-33,8.835890646657305e-13,8.689998213970015e-52,1.0,3.422556840119423e-5,1.0,4.3089871755936687e-20,1.0,1.0,1.0,1.0,0.04007687170141599,1.0,1.0,0.4551942650780497,1.0,1.0,0.0011896160794477556,2.388597994576097e-7,1.0,1.2194291821175065e-6,9.536828010071985e-10,1.0,5.150399262641483e-74,1.2349507899509274e-37,1.0,2.1547229735745437e-12,1.3940401748539621e-31,1.0,2.0436463062265913e-23,1.0,4.533696311260642e-56,2.498093274219963e-80,0.00041304836192783477,6.173023874118483e-7,0.042149346118812436,4.153969549705029e-66,1.715855240862133e-13,1.0,4.862218719419419e-6,1.0,7.991450374559687e-88,1.0,1.0,0.4161570095932349,1.0,1.1757943395851286e-99,0.9999913163621601,1.0,7.219885966929091e-8,2.325275307296422e-47,0.9202181666983441,0.0036811412086481723,1.0772437061243162e-14,1.6278522136048175e-8,0.4100992788059088,1.0,1.0,1.0,1.0,0.5729553640985523,2.471078073677983e-19,1.0,2.1264834119288553e-13,5.948764920578487e-19,1.0,0.0005340481770988347,1.284267197111274e-11,1.0,2.537911979366694e-42,0.3374317496537121,1.1512823072441031e-18,1.0,1.0,1.0,1.0,1.698831073970328e-5,0.00021539956005380722,3.839418573247006e-11,1.0,1.2420118183467313e-37,6.080420681570137e-39,1.0,1.0,1.0,7.825587430553263e-71,9.05106678630922e-9,1.0,7.291594896164508e-26,1.0,1.0,1.0,1.0,2.574687657386939e-7,1.0,3.299362961210719e-182,1.0,0.02398870340520539,1.0,0.9930821050650563,3.494381031819277e-6,3.184600099388532e-26,1.0,1.0,1.5480794096452265e-13,1.0,1.0,1.0,1.0,0.9875620802221183,1.0,3.907312058833451e-33,1.0,2.1674245942963367e-11,2.357855389776803e-16,1.0,9.931082390504507e-73,2.345109055206935e-113,0.9996122793370985,0.0009333946826850079,0.679491818168523,1.3747162490613196e-83,1.0,1.0,2.9606587149090324e-45,1.0,1.0,1.0,1.0,1.0,1.0,1.0,9.16613775182594e-11,3.5168756889345854e-12,1.0,5.130434803468178e-48,0.9622327026030651,0.18841609475741017,1.0,5.703953588283616e-18,1.0,1.0,2.821178781273353e-6,7.948696007061517e-24,0.044736201721249265,1.0,1.0,1.357002008699546e-9,1.0,9.544457881791456e-66,1.0,1.8651685149882206e-13,1.0,2.1801169933751396e-17,8.018948370496363e-51,0.7328218220530307,1.281683307192718e-8,8.050142910835124e-19,1.0,1.887804833215261e-49,1.0,2.2636389172763166e-8,1.0,9.546721141703406e-13,1.0,0.3299975311282313,1.0,5.175609107189465e-42,1.0,0.35978764193925605,2.037907173573946e-6,1.0,1.0,7.627975172810082e-12,1.0,2.6331211485340495e-7,5.94283658666836e-76,0.6558458611701683,2.7147776501422522e-30,1.7243815451531677e-55,1.0,1.074962962911337e-39,1.737060181709585e-32,1.0,3.4694578031205035e-64,7.528006852659545e-25,1.0,4.515501950823332e-25,3.939894091150587e-12,0.00016710302339929028,1.0,0.004825384083357424,1.0,0.783983260942402,0.37157173368670343,1.0,1.8896193740070794e-10,9.180618854745683e-69,0.5482745150545757,2.0561541288691876e-12,1.0,7.068806092906247e-72,8.96590904873695e-5,9.797089722018956e-29,0.6555931204443584,1.848171164940537e-14,1.0,1.0,0.22883426050967898,0.007680156348955894,0.3195115749040761,1.0,1.0,1.9990299815468224e-50,0.27931054003942773,6.959689984231968e-149,0.9975921681028965,1.0,1.0,1.0,8.819392371308593e-56,1.0,0.9999976940545666,3.721836181113333e-15,1.253354668379455e-12,0.9993311326234702,1.0,1.8214797279808287e-6,0.0034002368995193605,1.0261340138680153e-21,0.002957817014945217,0.999765293419361,1.755464180619469e-55,1.0230116283805817e-168,1.0,0.02662858410413793,0.6033176986993869,4.1875496861723056e-16,1.0,1.1374125576526732e-29,1.0,1.0,6.697839639179497e-27,1.0,0.0026341292313566515,1.464041158974977e-10,1.0,1.0,7.628216207892267e-60,3.61934458037416e-66,7.361783805732524e-21,1.748349136346255e-31,3.3231370370874865e-10,1.2724655508527615e-70,1.0,1.0,1.0,2.0251403586143497e-18,1.0,1.0,1.672318132899568e-16,0.005410195127139137,0.866294810274412,1.5277505535178698e-34,1.0,2.2143578271510963e-8,1.0,0.0020061606286176127,1.1366581669629092e-22,0.9999597956224304,1.0,1.594290517344471e-6,9.039543713560229e-12,1.0,0.6754922742905032,1.0,1.0,1.0,0.7338106008100644,2.8844148945761863e-24,0.9702987731519614,0.00018231705622658525,2.0856471766528604e-11,4.067104261047301e-26,0.9222826864855517,1.0,9.843039619280752e-6,6.47168290812433e-38,6.097700479928635e-12,1.812990572247946e-27,2.6451043078370652e-9,4.8376767461501235e-8,2.020726256012401e-72,1.0,1.9222635538788917e-120,1.0,1.0,1.69290811277307e-42,0.051610767888083796,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8192483543424611,1.0,0.9533072980355712,1.0,0.00012536248586215114,6.242035057720597e-114,1.0,6.97975995909678e-99,0.9691347403682085,1.0,1.0,1.0,0.27920578998378,0.01730018180986015,1.8786483295941023e-12,1.0,4.569494143410857e-13,1.0,3.3756609669169104e-11,1.0,1.039523472218592e-30,1.3640256329771339e-11,3.205041371076331e-7,1.4024529485207067e-118,1.0,1.0,6.205796134716263e-5,6.368621208414504e-99,0.0017272157807928631,0.6317612572747762,1.8008482037325207e-45,1.0,0.375050893705175,1.0,6.123474930734448e-53,8.689215805281387e-5,1.0,1.8097155371621333e-27,1.0,3.4829215199874154e-21,1.0,1.3623710863621404e-5,0.4883316822692416,0.0005738418257270619,2.7418216789136695e-37,1.0,0.9999999024558572,1.0,7.360572259279993e-16,1.0,1.0,3.455213239383308e-15,0.999991992266152,1.0,1.0,0.0051820531472023,1.0,1.0,1.0,1.0,0.39449479705621554,1.0,1.8834155097766116e-41,1.0,1.0,0.5551225582676387,0.9999319402931572,2.623015724168824e-29,0.0001668891414513222,4.610133102963284e-6,0.19354247448563566,1.0,1.0,1.0,0.9326831925633957,1.0,0.7107841485114299,1.0,1.0,7.026320408509907e-17,1.0,1.0,1.0,6.565392871091345e-42,1.0,1.0,0.22410138928833073,1.0,1.0,4.9292789824159336e-26,1.0,0.001193243250865773,8.163229938574248e-14,1.1737899174143328e-6,1.0,0.0002282876052063581,1.5250587118069567e-84,1.0,1.6656952539297176e-7,1.0,0.9610176474077254,1.0,0.0025037308024362377,5.402531714342314e-27,1.0,0.3544667907230142,1.0,1.0,2.0498846972996353e-11,1.107855326201607e-275,0.73684030001495,0.2114528675740864,2.0792651833937225e-35,1.0,1.0,0.5778304296274208,2.3832645905803212e-18,0.21933752540200832,2.272949515575796e-51,1.0,1.0,1.0,2.3654620301079363e-42,6.973641894448796e-44,8.528423221213138e-15,6.556043881627144e-15,2.880049398066725e-30,1.3519200344654201e-27,0.312193413608633,1.0,8.206084987330628e-5,2.502157480911732e-31,1.1566143174300998e-12,3.9742909136551257e-10,2.5312094711715687e-11,1.0,1.0,1.3397980293458078e-17,1.0,3.659141725553874e-57,1.0,9.232864178853787e-32,1.0,1.0,0.005549311891183955,1.7873539487004944e-24,1.5954783069819623e-43,1.3082147036597698e-7,0.13092883592375767,7.307482236141556e-5,8.86750823629915e-36,1.0,1.0,1.0,1.0,8.956252218563385e-35,3.254145155058155e-29,1.0,1.0,4.347402039019192e-22,0.18462102151377924,0.9998063078447936,3.1856301101613387e-59,0.07628558021572836,1.1600083725947507e-23,0.0034534564653250677,1.9262958462456416e-37,9.890042010565795e-32,1.0,7.495029693320822e-11,0.9682075292041952,0.9030269760998908,1.0,6.829773402265608e-5,1.0077494377663989e-41,1.9389786597271378e-5,5.545038227972754e-35,2.8715860603300085e-19,2.4725455209958833e-5,1.0,1.731679984942898e-73,5.642168781951638e-41,1.0,1.7934744355757314e-5,1.0,0.0027918250377435457,1.1638530014317435e-49,1.0,7.853287873456536e-32,1.0,1.0,4.942431958142771e-6,1.7108412720578138e-32,0.006386191620406277,0.0007119515833317765,1.0,2.475468255541801e-59,1.0,0.9532807476809768,1.0,2.571693037374155e-6,6.17462668953212e-40,1.6454168376787226e-83,0.05901984244235399,0.0021226103675460735,2.802307080360345e-29,0.8414976820661354,1.0,2.022410946993372e-52,2.6085050683650268e-33,1.0,3.0623583233507276e-14,1.1559908180269919e-34,0.00011949455461679997,1.287816492733131e-49,2.058843335097855e-6,6.419377490966457e-20,0.841291066733617,0.02514363582652291,1.0,1.0,1.653310172180478e-6,1.0,0.017083587753589015,1.0,8.429791553881448e-44,1.0536721304994564e-30,3.6930829621359534e-10,1.0,1.0,1.0,1.0,5.8647775465671224e-89,1.0,0.002916985942574267,0.2816151367136299,1.7991699603468467e-23,1.0,0.16976685984380233,3.3881453298446145e-48,1.0,4.114883732947946e-23,1.0,0.004106282213412642,2.3333340187592123e-84,1.0,1.0,4.54882694635583e-6,5.444208113962716e-41,9.728391315342905e-69,1.0,0.0027525550595269154,1.88612095140163e-49,1.0,2.822087331009242e-19,1.0,1.0,2.3667085183615104e-69,4.115682069421052e-115,9.067313071995884e-17,1.0,1.0,1.0,1.0,1.0,4.351324263967518e-76,1.8810264350134044e-6,1.0,0.0012187717761687328,1.0,0.00023504382135348538,1.0,1.0413413760414025e-24,2.6633303013356123e-5,3.816303121601933e-21,1.0,8.022527728345598e-28,0.0001524632049889411,0.07899590891572542,0.26115388889382096,1.0,8.280566101847888e-25,1.958474340036198e-8,0.004006523678162362,9.58083623200492e-16,4.64115079433865e-20,4.181074209149021e-9,1.0,1.0,5.284388437888396e-64,1.0,0.00031039158369855876,0.3400762731769807,2.2567116647091454e-36,1.0,1.0,7.660498836713941e-195,6.333538963604078e-16,0.01837523472969165,0.0002910367373175681,1.0,4.577247160601746e-34,1.0,1.0,7.722037220194687e-10,1.0,2.6748863957639565e-29,4.0880087626621073e-19,1.0,2.3039321164547396e-29,1.4117276430101387e-11,3.7999180978297763e-60,2.9446388867518275e-27,5.649068814873658e-46,0.05156417437360745,0.001637532869734253,1.0,0.25336651547420036,4.334428944978834e-10,1.0,1.0,1.0,1.0,3.231820210402465e-12,1.874857142163631e-8,1.0,1.2660721726260504e-24,1.0,1.0989212756289785e-66,1.954372434680315e-5,1.0,2.3943097803003085e-44,2.0820759325108457e-18,1.8139243334331825e-8,1.1656573697836522e-48,3.68674795028444e-19,2.0914976610640992e-32,0.0011410730602941278,1.0,1.0,7.275936410892927e-9,5.774296147590498e-64,2.9081328919413763e-116,0.988265169429394,1.0,1.0,4.992089169914619e-13,8.850286503094089e-22,1.0,1.0,2.6206207769168856e-5,1.0,0.008744363485470964,1.765832906040474e-11,1.0,1.736110545942882e-70,9.070180493842191e-33,1.3517091508684913e-30,7.271686580761456e-20,0.0004184644616007694,0.8940776089414475,9.540571821528412e-17,0.0010313806928214577,1.0,7.743359297407652e-33,1.5435298723341008e-49,1.0,1.0,1.624963304963706e-10,0.00014998689474467056,1.0,0.0867260199015569,1.0,4.710978468479077e-82,7.781952412262282e-24,0.00017597891782074218,0.00031696075999853646,1.0,1.0,1.4832236578422277e-11,1.0,1.0,1.0,0.1382655844671432,1.2070165174764548e-24,4.003879368770034e-105,1.0,0.05643368666959807,2.2935221969560232e-10,1.7913389531941545e-20,1.319933530628015e-13,1.0,3.394641326300914e-68,2.007888943024371e-9,2.73084911466443e-54,1.0,1.6860070653446394e-11,3.2637713231117586e-14,0.0011144284055881967,6.781296411869625e-42,1.0,1.0,0.0007408197350927728,1.0,1.0,2.7942247174646877e-34,2.082564395267448e-44,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0002673206581944758,0.03334716887477871,4.656120703644677e-65,1.0,8.428877632674251e-23,1.0,0.9381461110226756,1.0,0.994992814749916,1.3825548169578052e-26,7.333463756247856e-13,7.470588179372423e-39,1.0,7.063730766657247e-21,9.836031935265003e-11,3.4838396970810893e-17,1.0,1.0,0.9998803962554087,1.0,3.534506698734222e-24,1.1450430906321506e-14,6.794770558532442e-8,2.257595075322431e-34,0.17164918762593917,1.0,1.0,3.497703672970573e-42,1.0,1.8862195814875243e-13,3.006332397718783e-54,1.2702593665407427e-12,1.0,0.9999685026435499,1.0,1.0,1.4921819927961983e-16,0.1504302641145566,3.7908444886561755e-19,0.998645571621445,5.0552838253920293e-17,4.446247970800476e-13,0.995185497809491,0.020577629802866208,0.03523460728792248,1.0,5.18930340026748e-29,4.3483253382254385e-21,1.0,1.0,1.0,7.044618404595719e-12,1.0,1.0,3.3692997298544598e-37,0.00024097780506846067,6.5500889246616065e-21,0.008089058909362451,9.937133326120505e-10,4.115639838513652e-12,1.2818133569326835e-5,1.0,1.182502328976005e-64,1.0,2.069759098986367e-13,3.905374569926607e-32,1.0,1.572828390027856e-12,1.0,8.545640801278104e-36,2.2999319516859323e-56,0.7302864893642333,0.2432049124200053,1.0913717409832936e-53,7.673829669314131e-34,1.0,5.382389568213047e-9,9.31528764987843e-5,3.140448228761099e-93,5.33736596274779e-29,5.75453151236085e-57,3.0068625492978766e-12,1.3739825118332094e-28,9.407439603768269e-6,1.6381924685751557e-5,1.0,1.0,1.0,1.0,1.0,0.3338386276110989,1.0,1.0,2.270938104161891e-30,1.0,4.343061185322576e-50,5.3997684857681605e-53,2.2732410877194015e-5,1.08103185260998e-10,1.0,6.638385736628778e-6,1.0495676817907921e-6,2.5124044155276566e-21,6.582146008142019e-6,9.42986450829331e-90,1.0,0.3448295950329247,3.26003395322396e-19,1.0,1.0,7.782544877173979e-6,1.0,0.9329776729770662,1.0,1.0,1.0,0.04630969648805174,0.2856298515339669,1.0,3.5844695398472284e-13,0.7404144057362841,1.0,6.854175726037985e-21,0.8027494078596231,1.305500537053638e-83,1.0,0.0010442370294185418,3.4787010456144903e-32,1.0,7.892140610518134e-39,0.018988873911271124,0.00018726511276668316,1.0,1.0,6.953745585275078e-95,0.9999086102592234,0.099042940064177,1.0130147765244943e-12,1.0,1.0,2.1970367819774377e-10,1.0,1.0,1.0,2.3540439997011724e-21,3.0664430271999198e-30,8.058846764347749e-118,1.0,1.0,1.0,1.1999475294978863e-122,1.0,0.5848673930359347,1.0,1.0,1.5754407204736846e-20,2.3361136269279944e-59,1.1955491219157927e-78,0.8979064321067054,1.0,1.0,1.0,1.2202920489653035e-27,1.0,2.131816312748764e-38],"x":[27.439439886755483,49.50145602404099,69.98119563966264,67.13060427687688,61.41326820062902,23.26806413632033,7.703893120178336,9.061457473330474,20.725435912653936,27.207848994693666,5.199496316629446,51.97792024827521,61.05349732171264,75.18129672278246,49.36096636008094,75.02615630145661,29.147809277636405,74.25545407593216,75.1688943756622,77.24450315673154,45.29188429249382,22.393755321956768,57.9243864497637,62.19208466619634,75.904109239493,0.7188930244624281,36.372671699980884,15.307322627859996,27.747004143523792,66.12205591516867,1.589294449960299,27.812180035111744,63.319344022235775,0.5977298721781032,71.73617324835683,0.8378494027604866,47.01192245595415,56.099628591619904,60.27773672325118,32.79416688668391,32.47101887747018,11.077782510339311,15.658724501551244,32.67322463140039,11.09645907270897,24.073624278487564,55.82479654180652,35.05443863303384,35.30514187358412,35.16332079183005,31.458676790021123,44.40838723806374,67.91752733438143,33.98437723962509,39.57733735037383,62.404930042129024,73.30642116429823,66.53317581005555,58.04861691113692,73.9754955734103,43.30090732943557,50.85903027717958,67.35023559551011,6.219115153168193,52.06250265349105,9.137379139003272,10.365485105668242,25.57359327640338,4.887534924799741,42.53698019485634,7.998811438407891,78.76404613564094,14.754631111124965,51.24127010883111,55.715873939082655,0.41669466806714794,9.651236036719446,73.49259807043984,64.78447627883925,45.296314094033704,16.304127135604407,78.85719497992795,63.37560371150069,27.7738121718167,20.192572034723852,20.690331367463255,2.950629954900865,54.77009897139604,79.39254087195066,51.76148017940618,12.669141675724802,67.6204978048919,53.477339667384314,12.157305565674044,75.84257433302083,71.82397332072144,58.77713713941185,74.93700647621672,42.852152776943484,11.347425654957295,46.64355756859214,58.47799305496128,32.3379681092462,20.079443577371006,4.036817191221012,55.54694297998191,79.90231595864566,78.51585787845008,25.441893114390428,76.97090336103733,56.623863915529626,34.36243933208463,46.04472849182635,5.7664723464259104,5.717943368761738,3.4318063373357433,59.452256529607425,5.985249606553555,63.79444405216789,8.212863151585843,29.473971797054208,53.3780014076993,9.823555986817976,30.65867057113671,69.83903622277374,59.807313601093824,74.1172469704599,56.36524081386254,26.18412227810289,75.28346088131642,25.11341730665187,29.558274982502937,50.67970214023241,40.7976965098011,11.859780592045688,39.44342858553563,1.7257404898675333,0.8821437984445346,43.17528764267241,16.901052369641647,27.5073296779523,76.93645753057511,7.207124951738386,51.370140684985145,19.16187949088039,5.09181945239181,40.71373801116172,61.7309448481806,67.56208261542342,7.078508736085034,5.482594563741845,62.469208345428996,5.31626132329686,37.68136017552802,0.13747518810687254,55.53371106015378,69.36528891151309,75.87161403188587,73.38987602786489,2.0154402775199998,49.401380592554105,27.693646845647937,25.149311055575918,6.187664045757533,73.15108609722532,53.34051170584972,38.18228182691353,63.1084235186513,10.771960969019485,77.90386609785307,17.452714385668653,62.35263415482882,76.53709079845936,18.909357666906992,25.84652193441041,79.95328616085878,55.297162224135405,10.870188172371904,66.8316394488719,59.92849465029792,61.77097872524417,53.01832915380986,14.235276327698028,6.358443693819016,56.1013188541984,69.03353678983561,39.242932700775754,61.8272255932404,13.41254119996563,45.131033928579214,24.177926075214522,40.379611040849106,32.849223572441026,8.404381205757776,53.12701806389127,58.08357891515776,55.202551494603824,59.841301573098384,32.32403563332534,46.01952220441078,42.03709286238164,34.432601035699655,24.76724378211779,50.13933282686571,70.97693861660723,69.25694716018855,50.4430570070859,58.65375249836468,11.658528583386545,74.9267885362007,25.866353569337726,56.840641077930854,30.125904995164543,29.6334995174945,12.0955002372048,34.004803388927186,77.73329645906033,36.88435879499296,57.45152655414776,34.80647594850172,15.652769099286132,37.43586525812727,78.80177438594039,32.13679849764168,23.81677056169929,74.24837649474023,26.514790346122812,7.64903869945023,4.070779589099782,1.7367742194363167,29.245203581307262,34.351419085828496,52.493050179698635,31.156156767565815,2.7663253434598545,53.39035037750893,37.75581211799462,18.934421354606297,77.86642168631283,59.04824775446477,55.02892627490507,77.64018379600017,62.042223559525254,16.970956726247817,70.23525376616762,8.157044077329925,43.821695925741494,31.9411927980714,23.344160499270288,75.71305483016889,78.75214019091183,64.12197557145335,13.691561504664644,75.90379948605018,26.11025438211536,62.79003373087466,34.55789903623007,42.44079260068909,45.72340253816133,42.53167345512715,10.47442635867716,51.74520698969987,9.12909864437827,42.11996364896025,20.29619516391124,44.70063847409803,45.75923347162554,7.216684112160756,48.799554739270974,23.46193863119865,53.698123286442566,56.94569289432163,61.20108315084163,46.410083653123735,56.08157553984141,41.41198303783254,1.2454753719513079,9.42493649541154,69.98937148574312,69.2983893515042,5.488801666541718,72.59289005230531,11.748518688162317,56.801071970571684,43.43809522097415,44.8787185200259,27.498854261002634,38.98193455396253,13.566822442901163,14.336894173817463,10.41815218252566,5.627562347909052,44.50207224888217,24.44504618492397,45.49964481486523,2.0156108831571373,32.6441066470357,31.257831397972176,18.317426413680415,68.7118649925973,18.322446283369054,33.18855172700991,6.327860848998572,39.10735949936934,12.719337570413547,71.56534800058458,55.24346085476532,65.08618692098929,71.4594107809875,23.397021324042182,4.333305077011875,72.83252299187811,20.32713631414982,52.10659622961023,14.66923793424197,60.799745617691855,22.016022000169233,73.64735438116807,5.410594923980732,15.052121260091713,33.03309842555677,64.41138899026595,1.782898562493056,19.92862344478322,62.860839537476764,49.396473911732635,13.510809698188773,69.40670651715139,12.035009160988217,67.85090506457553,72.03158154085243,53.1659412572364,64.49397296973828,18.858388089385585,77.61758034800633,64.4312606964702,20.18574326537493,42.499650817455276,72.98229387487099,20.720292869193013,19.836125757857506,7.845852389816308,30.432790850441904,42.42542633910843,55.022796294582946,24.732080750665002,9.900011597637537,71.00036578195854,60.786133725875935,28.990793965966404,27.199709061093706,43.378509139524084,78.5693174488206,42.4447829345486,72.75765105312965,1.122792634802341,19.572342466730266,69.67789618170913,43.49172865911559,71.96488114717182,44.85513909729395,7.775630211132594,2.5420812683143623,38.70607877575681,19.75770120669969,1.9799727078576979,20.224763229104177,54.823517003674155,47.4284746558892,79.94250098301826,13.330714246601207,57.44813710786494,68.04923562917563,14.678872941272303,69.39809472695914,57.77729955171026,8.466222020602938,71.97091918768331,49.93052477094592,68.82195873641209,62.09323973167827,12.735558232000592,70.06744307553292,36.0952621406411,41.806406103587165,58.9911225853524,38.4578004466435,63.530716748880906,56.118085058163615,52.174075240712284,43.128570324972664,37.53872488586738,28.399391011946395,43.203366083740384,67.79000296256116,39.94679678600954,27.41196659060881,72.52950843684005,67.29074220175903,57.802560831041134,31.221022366306244,23.124143195199096,2.3280205259843534,24.735331119476793,53.85681636397371,9.90569483261984,50.76437993291448,5.755373053555299,55.912607464373934,69.93171485879735,4.362895646319167,56.795003661508915,60.42501216629553,79.8905085765599,49.20536373131691,34.79898102362155,77.07990460358808,69.32295318204437,64.69315942792872,68.54035403276838,58.604031836508085,17.97525868122447,29.472913746624236,26.65667783002462,66.56662313733136,68.54448244490571,5.2623728036252615,45.2908689940176,9.122083581293037,73.8994481946709,35.39410184416221,74.42477677367094,74.4001583497782,61.011996704159245,34.04827694549867,2.9407121392311275,51.124753882582056,37.67196160468899,65.88520515346676,66.57108848235985,73.2763614772885,26.92381036994748,34.2041829306341,15.708369966297848,4.3551492560941085,45.389908565785234,53.76918654420962,25.46359913034273,4.851882303362842,21.880805912534598,76.17671992190748,8.337774680038521,49.567118226927285,54.14180073391389,48.01186831006183,46.24128259396761,23.642248641277384,57.468163654099996,19.60985587399259,15.936569829967464,29.04951561701486,34.445259061851985,38.225538804861955,61.640685003877955,32.609244413595974,1.0548532716561354,53.95649996848783,73.57920549815753,54.28980860499724,34.13291576451526,77.33857885706387,64.88838317000081,9.862425444380385,79.25607455784873,48.9330975890786,35.5138042032231,9.736211082610069,25.803149261027585,29.080867730167057,73.91644415035918,55.2745913863583,32.613378352050816,66.01842052873056,17.42562286476117,9.627347698947428,50.34689240584596,39.77994408662628,53.040379889759635,5.176024002001878,26.45790744255491,26.160705310584333,58.321502508692916,56.03783093451595,38.24439293739019,35.36703562117317,77.86379965176464,55.80409748955526,56.26547874341986,60.720674013717314,42.24087640299105,26.82225891791676,36.970029252956884,39.10277621927705,56.93367711376381,12.836561114413687,64.01489091775113,70.12240246151264,75.00063632256165,56.628633837111636,48.834611182538325,15.615910750502593,55.075583360604945,74.36796363766554,14.561321259274056,62.0671694361927,77.91295153488508,21.617355253777077,7.197481136398576,48.13780116381656,47.127961759175285,49.946790344867736,59.985843404323504,39.056790764906495,43.37116966896183,19.242020423193207,62.055949292542074,38.823490335283836,54.58851955777927,53.3632975109094,30.894601450064272,29.22610696391299,19.835226666917745,19.268126836750756,36.49373994653249,19.154141073330102,54.516663983208744,77.02594925155297,30.136597878451976,70.42357418169908,14.850045876453013,13.024182951070866,57.708699832389065,76.03578480013007,65.7207909804083,11.948019624370314,8.708241774630547,56.64515994877462,34.012178225443996,25.050301241206956,40.22241685992672,42.609863719938055,5.9126797977308065,14.309500117433771,30.702184760252997,28.726009281454115,15.04674548825438,65.9572752195762,65.65929851509054,38.20631712160478,29.46004725426885,7.304281071255012,12.50729446183934,34.878534777865475,72.40021367940756,26.696551536378426,57.338470231570696,17.46145252978799,8.37350960549827,44.975013805983664,39.98704783380976,54.660066821378365,20.50679072542218,75.08679561010172,70.25005312901656,46.561237904357284,68.65851779959478,17.260510681453596,1.9869763927673567,20.913583696463736,61.099271955163594,39.05512211082039,74.80983603654767,64.76773130196003,27.94438516603929,77.96089224714356,44.773828717694286,78.3669691033211,1.2265968801754035,20.622520878830937,78.68167924488037,48.87185463403814,76.15956776038239,56.158034277278276,55.01337764784495,46.53345253622344,44.45476166350359,67.11844524833758,20.239140047277786,51.66710387336609,30.692106896890383,71.50158798866586,1.223232398276064,33.04390016871963,33.19685577445996,11.754436071790728,70.39721636676936,24.63271718338774,24.991411397885894,71.24651664192083,7.631285126916243,15.655622160365485,75.89580944000602,69.54950133448352,33.68801179864691,66.64574293084672,23.09312372917196,78.62724926189982,7.512520294931022,67.729337220752,76.80370818096159,77.40042744946396,27.25041955120556,5.439019426536937,10.768951184074602,8.824226611530346,65.64186613544499,11.086552900078388,31.33856243260002,73.66425587823123,10.687384036310625,19.620215865076,78.41197185185868,0.6588411072922895,18.02793790761669,30.794444419727487,17.49056516825089,64.72436870922078,19.553783950608423,20.999573059994727,48.42966168426683,22.02826982599502,32.33122908358311,47.99509984670985,70.21985009576042,43.50160818089215,59.26753009742381,7.555951449704139,7.424862780442609,50.054992143246494,61.8009213019117,20.312296091972915,76.97218417315523,16.97961143314524,7.551649335981878,64.29016000534756,54.33595407880192,48.21304897351368,12.216117000020379,48.045492450713496,12.175541199289821,6.92311179829634,65.677292699043,24.390279060582234,57.42068890356002,44.9877865840275,3.133247437555635,60.92412086234546,58.783686905274344,9.617171228069203,2.796166354073222,32.85460950705642,37.649517559050295,10.68500628133295,8.69489070884164,53.218776125282226,12.227150361018797,72.48094636352408,73.34693558314251,0.5799668017479931,11.713434331833472,21.511459750175828,26.02121237453863,70.21464713370648,42.34525214251603,5.676746153585608,73.79717191440854,38.33607654891601,13.030011178367555,78.46566976293707,33.261500876161314,36.13672805090113,63.90738612427002,75.62436996127633,22.493181421993746,56.32158117733353,55.928533552423346,39.04429051018219,9.855206659541338,3.6993200116399905,71.52891348555394,36.36808809157037,60.062050412228004,23.39999045965712,55.298076306244326,62.797665255528884,11.089327776512228,45.90181711597482,24.24787535521231,74.57862455181997,72.41294191542855,31.553858102821106,54.53004689740041,54.94411160990072,51.46132453927906,17.498383364687946,75.50183317493742,42.57462808027167,3.950931428732023,35.278765708291466,70.18720817718435,39.237840692584456,47.876651118013584,3.08318181897997,8.314087472063427,54.539510960160875,1.4975763249417895,74.02948890868338,18.506058053514458,37.481749613271376,34.36653925170775,15.352575454039439,9.608838544486176,2.5958245873009034,59.79648196752812,16.28241341179903,65.61280932200083,79.99821021839516,77.31371001591123,42.226657320678385,11.0008588527446,73.2922232824388,70.58316989660541,72.22821936570675,74.33073281916323,56.19776184078745,4.7739518943715,4.36495555236716,24.67525811776852,35.33006338864831,2.075652269939301,26.189533209057796,53.7361740154263,14.163107924509415,14.334814556233049,26.345574147960527,0.46946986598644713,3.9166504120334444,4.59350659107427,18.845359325288964,77.83812128003065,25.31179975657672,36.83219178261959,9.43209255875363,0.8348234019979905,72.42910172536514,36.30815087165509,69.75564278807138,39.24153083282455,24.242110089317244,63.629920326849444,36.34282764080217,6.812229640668477,23.051228164081934,13.67194157942258,62.379160702788866,44.57394645462401,28.73793988855443,15.922495921851887,19.91968285593691,44.527081205449015,11.063483912061649,30.911401616974405,8.269155798973635,48.26796229896418,33.64482200288664,4.735118939639751,11.805066454998219,47.52110358501515,76.67991135735518,54.24517063541616,12.60878476099693,75.9728784636032,62.17654485712153,9.166749222706674,6.782241461605167,10.000161320211092,23.51162235470804,54.90568532371414,47.586137104840454,52.68762394279625,16.530293924591177,79.78495202589203,26.478929924510552,43.07171602563397,75.78485191883038,42.46078544720852,40.673694983189165,60.883754682653404,72.0449041175568,2.5359604727756313,6.236635409094475,24.1436721796736,36.54915898006962,13.954069644578535,2.1995347599305326,15.797439430922662,66.22343886109591,6.8204196608708045,35.98441561825634,53.56384492907233,0.6359778561853346,34.16452890634895,71.8073233805683,28.74689046214529,68.3581345532208,69.0213520154178,24.436364100753813,16.403052262245676,51.521058412101794,70.48795241125063,77.69662235806985,79.95116394695037,63.878112433458526,10.222803153457338,48.47421743151109,43.264994260782345,22.05005621751603,18.017864878887906,58.67004976743061,26.590031235582607,71.0758716707199,58.33004591439783,64.66210174742531,56.37255702017189,36.917591852669034,53.82776366288992,0.9189171264086049,14.99254082328207,55.41718125206341,27.835117625170014,26.465757219836092,24.244455259614437,19.257030703766596,61.293063624648184,44.5879840361005,9.3755162281394,8.931564517169956,12.520483763365355,19.49962444206811,16.013074986414875,48.31336240090046,30.50453557297315,15.355012336439362,71.60076230363447,40.66504355144165,2.862772169140797,14.140526470466721,47.07138843958514,36.40602027686423,33.81522979348894,58.14056319294746,32.31854878807346,29.10243545751337,16.3219070559804,52.75231348069306,33.581139097221815,36.24795878022084,69.29921997169882,29.469397973690707,71.43640929766511,16.16549219851633,40.916954430764164,37.91977732535802,79.37477476067954,14.008149384116848,67.05138259673575,47.35598348994397,62.67903667533048,75.16049939107666,21.888256373143697,54.803528925453264,40.495467428364655,53.24815554217446,5.3306463924334935,25.292532597526538,35.544819781099086,77.08431524493272,13.32179246872629,20.410093121940438,60.530443520908165,3.0281853466433795,77.99325725237102,2.5580360172061845,49.13423134180404,9.715223391959196,1.7362145209720303,21.766240614474714,7.254148345194835,4.877925677338446,22.37588654466908,63.77517803277583,3.8456147313721267,59.632674287922654,42.68175073015474,34.086323897492825,3.1478556843919314,11.753930438653963,36.72525774709044,79.8637547690405,43.28274165502732,77.91002906718623,28.63744408259654,72.20579791285105,56.60606397608136,22.15353765167878,34.926362990384504,74.63049854578152,27.61581743227925,1.3270812916301011,74.26391824804085,15.24445930162786,59.84410459216781,23.150869332723367,40.546834633531944,15.413833393145975,57.55128149562797,22.31438378673106,10.88904907519673,67.30571777560554,50.85134627489025,65.80485905966519,42.38574569961999,15.6438163644677,79.7142095855679,67.1616851745795,24.771690591859148,14.487030435650148,33.766273585892606,57.08691017295715,11.880226844318553,73.39779912302113,46.71640444081922,79.62690810250486,75.70260594562505,36.021460905715124,74.39230674519908,65.81865568025037,27.650764242782806,57.68467461924318,33.58885540344087,78.22405928827179,9.943989055174338,56.55690604198252,69.31882258254015,35.035821688127946,53.36589364727763,36.12458754541228,39.44015643959246,68.49451950399614,0.1971711347235683,72.10272074488971,11.810156288928049,77.57497985574231,63.02754575435092,34.84137040659307,47.132941646536715,46.85729931215563,49.80463948114645,40.44015097515589,38.79033900571578,21.11221704407768,7.807730964618518,50.80039688389155,40.41764737724737,77.75301648392033,25.756744173840556,34.2454129242533,70.32323957369705,56.8279440341979,18.93266532328994,41.96793181750215,18.310302270722723,26.544983896153198,48.85590450121646,79.90425221788783,59.59054101944753,18.12934031736651,68.84849851826618,69.92231604680326,12.567153920049545],"p":[0.7518709954177685,0.9667901674405794,0.8366133309332393,0.9852689473622663,0.7748989871966758,0.8516462062329011,0.7669854355863819,0.9250160235553694,0.9300552900281572,0.757230172359507,0.9643056364282618,0.7614574183167215,0.757313950947026,0.9986287898631538,0.7735051165986719,0.8274737731787755,0.8306078224720832,0.9835365093153914,0.900093830289033,0.7509268346355402,0.8084049702707616,0.8800534685224282,0.8259961638858384,0.9752703171772461,0.8179644606289995,0.8965915796796978,0.9111438724549044,0.9108817733689945,0.874224057965928,0.8694486684695695,0.7904988114927929,0.9996372170329246,0.837035580664911,0.969412288459448,0.9524240482518812,0.8448297520677578,0.8916432835728714,0.8029487513907407,0.7981075902525646,0.999533281305014,0.9427311532094333,0.9858504338589014,0.76680208907402,0.9851341591950681,0.872828563095569,0.8476272518610213,0.8028393427239775,0.915515331512551,0.8516182976572194,0.9563253631209312,0.8313485831882943,0.7524052488754746,0.965873775382839,0.8845872632638943,0.8974407702227971,0.8969936872738968,0.7851850770775499,0.8996571667238797,0.8092541335315637,0.7901816084922475,0.7666877163839416,0.9151197948940699,0.8529584262100689,0.9558533015488972,0.7535537973353449,0.7513945733273499,0.8404881983876634,0.9459797046723901,0.918215853223463,0.8841987917121695,0.8352382937767726,0.9336430559038851,0.886459295523947,0.8955073059353529,0.9959779869903844,0.7715537612797186,0.9009216727305324,0.9765759757502712,0.9664925794266332,0.9465688092323268,0.9498417377806121,0.8355292157112966,0.865438811356164,0.7894594271504387,0.8214109572920403,0.9848021449299733,0.7601659010936319,0.9899865257611716,0.7631564807610473,0.8793799250465635,0.9986344537318963,0.9876570979462774,0.7507718098817744,0.9844063480421572,0.8123827594363524,0.9962869839438899,0.8957588236064864,0.8642114206483857,0.8094716579693255,0.9327513316141343,0.8583596384353227,0.969705098149841,0.8349591416234137,0.8130014029881042,0.8185669132299709,0.9433660127153378,0.8669101111596512,0.8161289546127891,0.8671561443258087,0.9965299378322805,0.7887143108925243,0.9183910027887341,0.9531227800947981,0.8492053434154907,0.9926560182136271,0.8520075397838458,0.9849259256614835,0.9318703419434843,0.990860212723464,0.9408998698846016,0.8279819580166312,0.9892572116597877,0.7997513809453125,0.7785313867781856,0.8047158813203642,0.8627948436574963,0.8638216218352446,0.8343169327084445,0.8416167573335664,0.7550346362364806,0.8345190294036195,0.9532847400483953,0.8810153027667975,0.8201686494345651,0.796730536453004,0.9939133729973206,0.9491532644504348,0.8550648061453495,0.8299796778248255,0.8199017533743569,0.8534765710994623,0.8911766030082833,0.8803057807401562,0.8162960098332045,0.919747315205503,0.9206011066370231,0.7758555545540282,0.8370910812098675,0.8141776246307205,0.8502252368428903,0.9470426845002222,0.9113302430060972,0.7666046458612056,0.8588063137271669,0.9520991949794044,0.9790066755718991,0.8246592279147098,0.8739588297941028,0.935914687160377,0.9513198791420665,0.7920890946717021,0.9187594028850011,0.9352871148017778,0.8170806328199076,0.8288688435693252,0.9748009032210438,0.8054574227549769,0.8619884437252815,0.7692920448195725,0.8182502320184734,0.8703287517778107,0.893499137249266,0.8947093749812527,0.9060091775451711,0.927469232895993,0.9636997336169184,0.925343552918909,0.853890624295252,0.8967226787453869,0.7501624540956383,0.950419175180278,0.8659082740269921,0.9751962942554637,0.7721584558029244,0.9567373687887022,0.8598958598071373,0.94653747670221,0.8675370327055285,0.8984680935852756,0.8339999295356637,0.7570982931870127,0.9088196979952172,0.7957236176396998,0.934943350310112,0.9693793066958225,0.951602207871109,0.9519549411566088,0.776152749765731,0.9837798327820539,0.9497545781790286,0.8753680471033698,0.8682191269384141,0.8638715044383404,0.9643279946081715,0.998664336818518,0.8574247552233991,0.8377176131789065,0.9958130462961124,0.9998370623197879,0.9596005891268029,0.8375145842737564,0.9331836687817353,0.7577007551768711,0.9665995367243323,0.7716358337655729,0.8335189947607902,0.8501398825473196,0.802053997132528,0.8898860635245912,0.8690546129368126,0.8404195108742287,0.8922791586580339,0.922801964015076,0.818885551465639,0.9006410553415343,0.9040053867602957,0.7847044445612026,0.9140639577490125,0.9819373493833856,0.8963648277921489,0.9903825894172811,0.7989674983445378,0.7608502234688419,0.8195637976652134,0.8741776228488953,0.9939584819102731,0.8924219334183882,0.8551508782729541,0.8597580027916948,0.8904731381674847,0.9525100900632082,0.8619133979930891,0.7781102238814497,0.8985699727533958,0.7938531738594576,0.7662464471695649,0.7561258123917161,0.9966600334789881,0.8985039603126526,0.8999223943039817,0.9175072369918266,0.7607285099082319,0.9414831834772509,0.8868603044511743,0.8249557493999731,0.917388248369347,0.8039084110927794,0.9708426495044773,0.9961981212724786,0.9659983896930069,0.8340340554979573,0.9094884776744112,0.9618458498472338,0.816125186913274,0.861949662708329,0.7987522857185733,0.857524502119067,0.8795834013118026,0.8681534486121609,0.9030024408937544,0.9217797362535474,0.7733870946044277,0.9909589883458549,0.9116767341805334,0.8368195532114602,0.946068967111301,0.9021883297705019,0.7806435064012496,0.750404011162537,0.846327688759366,0.9996675906283978,0.8452911048440706,0.8481281151083921,0.7892926053760501,0.760435379813966,0.9482585015120194,0.8520610777874269,0.9410724623320558,0.900946638958984,0.9447324100571092,0.7537874968349391,0.9010793872682876,0.9982138947011905,0.8921656463354898,0.9509288275999288,0.8766827705523497,0.9968851494008486,0.9576510538322577,0.9293342184298242,0.7543729442555536,0.7878780472885224,0.8794624190753647,0.9975450302223668,0.8699724758605527,0.7833939586387662,0.8486067386194791,0.7518333276993117,0.8728710756390806,0.8139986793520888,0.9003458744726174,0.8441369554012323,0.889232488567154,0.8007947038932169,0.8221237153640266,0.9927678460066427,0.9070990204132332,0.8649469931049152,0.9856987680335875,0.9348053917131234,0.9953057678375197,0.9786894533573633,0.875959012114148,0.8714373532366222,0.9096688831646143,0.8697874258513931,0.8519647571711002,0.9079092215109057,0.8587277038117411,0.9872755940690555,0.7594732669524934,0.87280779756653,0.8658941477038323,0.7709701061325238,0.9084958507935446,0.8760829527599348,0.8189824595274751,0.8738498909836669,0.7883546575658048,0.8150587788417165,0.8970668360808061,0.8117738637313144,0.8066275534802754,0.8717487142650358,0.8983327179903721,0.8255761921333736,0.9621444193816067,0.9895416201757044,0.7750273529559901,0.7543058027819711,0.817912088713973,0.8005110230815229,0.9935651534687763,0.9958483030771227,0.9451181239366858,0.7698680097710975,0.796892249253911,0.9531799534727166,0.9690858687635546,0.7909599714801979,0.9217058155599954,0.9244973893993861,0.8604981519459283,0.9823115236454883,0.8919698898568518,0.768328955903159,0.9310044476613469,0.9467086359237835,0.9398878389847715,0.7921977865385338,0.89923553036235,0.8344912529231197,0.8242537633377842,0.8184690998756317,0.9546603418379704,0.8551710861308168,0.7534655314857587,0.7541962163206086,0.962721894331712,0.9315208923708814,0.9444003715836264,0.8256519109346243,0.763355906555877,0.7537412787351709,0.8134698642808478,0.8661644814395207,0.9168991399426436,0.7990591765619587,0.9169686552472278,0.783023630257988,0.7659225357621193,0.7700250833853992,0.8574388117175704,0.930296936971784,0.8559345946938111,0.8280217825915607,0.8484634356292811,0.8663192851818782,0.7704748490794362,0.8920105217973351,0.8974965054329058,0.9671075617080398,0.75123840514029,0.9101483810366651,0.956508689278325,0.7978563593533895,0.931769581632434,0.812774188096721,0.9872077298734069,0.9486497695866276,0.8839121415323437,0.7541756456496712,0.8358716244483468,0.8755903093007409,0.8211360822188534,0.997796615560014,0.9954179528681184,0.8971315115266438,0.885370227429247,0.9297477530871574,0.9694258577253472,0.9257753486262675,0.7913622441820497,0.8140763562229145,0.892715193226759,0.9338796427682217,0.9395649414758336,0.9839956354648447,0.9939964010516196,0.9402912162170314,0.8478559302701085,0.9055426313776886,0.8742328041894682,0.918833449083704,0.7587807409245034,0.8917420336768769,0.7982681371008604,0.9017816513672781,0.7676331011257218,0.9444042461550575,0.9117265403693243,0.8325331499495997,0.8251749564579169,0.7874774225153782,0.7573300425684806,0.9961911365703058,0.9176285514356202,0.8738777675443208,0.7595670940528827,0.9610253102639342,0.86936287552564,0.8762840722972932,0.7776661501967581,0.8034889632370911,0.903435212503434,0.9761406431967832,0.9758348758062371,0.8743168114572375,0.8737745511954578,0.8564985776290954,0.8870338115344516,0.8015308123676106,0.9467410098340577,0.9823128682444713,0.8656394713108918,0.7744286263496066,0.7750906758255001,0.8079376909644027,0.7733407367294187,0.8802504120915807,0.9201179706557041,0.8993276268285146,0.8596449728280857,0.8441853577536051,0.7746918132158084,0.885534087109549,0.9763593780824791,0.9126838279026219,0.9072001672296315,0.8228810165597503,0.8104663551599877,0.9984642499878508,0.8459817961433921,0.9607650483674153,0.9301267274480247,0.764859965583686,0.808038826700286,0.780014991312431,0.8372040058242907,0.8747316844007254,0.7618303242297833,0.8368271898602196,0.9271415082657074,0.9905136703718989,0.7636238259906358,0.8912036099046337,0.8697640275806046,0.766592829354904,0.8291612087498397,0.8854324575607575,0.8843847002336773,0.7610331759748421,0.8589988465836705,0.9864284878696405,0.9835988654327908,0.8115456063138385,0.8654820257887943,0.7849927116131088,0.9397661034400713,0.9226951509094055,0.9774316900289552,0.8133615698299338,0.8678040712366203,0.9563018602751614,0.8208948084527048,0.9041368248136985,0.8149646894091859,0.7853524059431809,0.9470463374894955,0.8245454901518277,0.8336346851693384,0.9360973142442968,0.8067255962406956,0.8969760844887047,0.8617941662776836,0.757485509376437,0.7995436175939914,0.7898261316215924,0.9149235909246647,0.7587722787034119,0.7632678736093408,0.999987207273854,0.9354293003202152,0.7842714160530497,0.9242298786339367,0.8900613632776101,0.942884244362173,0.7816919096881725,0.7827229342780728,0.7982519958176268,0.8836812334844473,0.777956455405802,0.7755090825269628,0.8133179183096333,0.9945526286680986,0.8866946677079588,0.8510663514403809,0.901156411015881,0.8512299592303332,0.8172122436241389,0.8658251530583203,0.8642960909586199,0.8633573467427957,0.8398487923299773,0.824931693415003,0.7946048505365266,0.8241809697280136,0.8563172006202091,0.7546488787959231,0.7919139116190125,0.9081011300434365,0.9211313653147161,0.7966322863548781,0.9105470601066354,0.9765398251245511,0.8629118538749758,0.8315712722133966,0.8253366011844331,0.8391488211104303,0.8276885205948555,0.8474384916392876,0.8082080686675286,0.9873490862048957,0.9761393149946959,0.9687767595416229,0.9974504486305775,0.7625388208540657,0.9278407149954545,0.8764013130279928,0.7993094133507732,0.9877688904985942,0.9463662349892095,0.9521181644529881,0.8449054537766125,0.9409185328857181,0.8369829906332428,0.881941258817664,0.9649998708076692,0.9305093494357453,0.8817521189830395,0.820706069265101,0.7779991584736923,0.9152480694196626,0.82205968597402,0.802350860477753,0.9037709005032987,0.9548357777831433,0.9480818796506083,0.9147721046471643,0.9060492339883395,0.8253996668078731,0.9421515174045971,0.9653302463721658,0.9717103740190205,0.7703645525009035,0.9487243689649387,0.9631608298371814,0.8294808118900812,0.9319790198698961,0.9434182915491416,0.8058607626897396,0.9135572211538718,0.8358208564483385,0.8817754356687854,0.8759707601550695,0.8852399053740863,0.7668063219814665,0.9138944430226716,0.8785690814389951,0.9349466205925119,0.9213505493538487,0.8792576981202564,0.7528207941024074,0.7932175756400881,0.9830229492572374,0.9596674285919504,0.8878254092449405,0.7526720999621165,0.8378411557990746,0.872562729397406,0.875516182369126,0.793872276303735,0.9302496735055752,0.7889901152493628,0.9776432952273351,0.7868279862950253,0.9267301408533319,0.8859583389498451,0.8693060533383663,0.768191061973312,0.7559781146634652,0.9601054921691611,0.8640571431810429,0.8506072176174073,0.8384623955676722,0.9228819261261425,0.9236032359976682,0.9303939799377896,0.7905546901850025,0.8472940230877819,0.9907287684253729,0.8414692830405137,0.8038677346389176,0.9978046997525427,0.9647975375010283,0.9981563382083914,0.8916166276103885,0.7751363335693653,0.9899005048062124,0.7779228505861546,0.8226182933408557,0.8710587420254416,0.7686894303061271,0.8557709704617562,0.8158949784572078,0.8677305091069769,0.9582194784790006,0.9953760053259603,0.9180815378399636,0.9520332765271808,0.9061432177462793,0.9833959541973929,0.9767074683874917,0.8236612075141498,0.8813444618119846,0.7763535832758529,0.7744112187045231,0.8982876573861577,0.9399539163359907,0.8171531098776715,0.9664580798529255,0.8795454908698672,0.9655220321965938,0.7628263876485067,0.8080931492721614,0.9342782737542841,0.8028684173415854,0.9875412656185572,0.7941716227977009,0.9194086630268479,0.798217914886721,0.954595552272105,0.9955761590352097,0.8319320943135229,0.9219756802279113,0.778944333924805,0.9874635022326761,0.8878373446676677,0.8308192458820907,0.7771847351575684,0.8178332016383986,0.7815068368901308,0.7560908857231905,0.9712989901965969,0.9268810299724697,0.7509318966251329,0.9710499229881762,0.9026012363382758,0.9824396513813268,0.7655352224550942,0.9470472121559186,0.977564975642811,0.9819518901114437,0.7604380507398018,0.7880406314844544,0.7826011767118648,0.947535518681691,0.9406343335421394,0.9989234114003607,0.9427427444825762,0.8196531111662422,0.8863776546435387,0.8538797861226226,0.8098694817152596,0.9396021010735083,0.901869614023303,0.8803002328248194,0.7902130778098184,0.7591095910581492,0.8779978067896999,0.771288741394245,0.814915714188115,0.8166435269708014,0.887703994858598,0.9778310692048753,0.9756671431613794,0.9531478627124641,0.9194984185917754,0.8004952561130663,0.9779362351503439,0.9001082123009398,0.7847770912501212,0.7894207613044293,0.9382138960125053,0.982430424364703,0.8555987427281382,0.7595915918131997,0.914914188928758,0.8866699367950543,0.76705937294581,0.8473674187487487,0.8654557510702192,0.8330388284430958,0.9089538474276431,0.9334456774460995,0.873090805604221,0.8027138348439946,0.9619679321832981,0.8659028342721974,0.7786220130457456,0.9486208946166961,0.8591144416342837,0.8247387395534134,0.9656502133488665,0.9811384954780443,0.8003295182730912,0.9432438839475609,0.9273879236574507,0.9554060088105621,0.8450751398755048,0.9940002827618055,0.879983316628167,0.797073351675081,0.8808350430472722,0.8242676519096472,0.8909756943024021,0.762507270706524,0.9594046801657774,0.8028774108605264,0.9308935654067568,0.899932974569837,0.9370926806766768,0.9301392963816865,0.7510686976952987,0.8147753750490542,0.7886813162414121,0.9174635658642702,0.9306460759756525,0.807675596012901,0.8198718197942931,0.9823988087368776,0.7981033909946293,0.8645055747178929,0.7796778232482062,0.8768155396892885,0.9558039497829369,0.7622113727634583,0.8264380296445804,0.7730908034990733,0.8426852123629845,0.8217381649161166,0.7885058406880254,0.8247867933620971,0.9637800635494735,0.9225553683642425,0.8362007481922551,0.9966913306584816,0.9959050432008976,0.990142133455777,0.9731465155626848,0.7588281294100274,0.8263343603418107,0.7681608164021013,0.8849397547459517,0.890510524321181,0.8677503320872453,0.9247007452604751,0.9404348073338662,0.8091457357517859,0.7906263611243028,0.9801699240028195,0.9333574214991698,0.8731180745560686,0.8595570610062786,0.9673511677365652,0.8555919290345955,0.8004168557888334,0.8845688443502232,0.8886730224950319,0.9386391070109392,0.7632716370092485,0.8498700503569523,0.7936578424097683,0.9213679766025815,0.8594175685201317,0.8234239818127416,0.9321095230839012,0.9320141693026682,0.9914543169715576,0.8536119022438431,0.9749819340559506,0.9407790580098644,0.9539260200059636,0.9513548225104587,0.7881460557308693,0.953061095467902,0.8806281222479068,0.7798878336201914,0.7510064330545304,0.9157016548759551,0.7517243857145086,0.9432853345899053,0.9406035168506284,0.8897201481400622,0.8042212789186665,0.9777971992327998,0.752402954168833,0.8699594396766007,0.9975133244495966,0.7931098195768653,0.796247491467495,0.863624482516953,0.916960291578748,0.8068045018405741,0.7760147514414754,0.8616102973114643,0.8742234660510412,0.8390519761581439,0.7951553244755469,0.7556692195256023,0.8944212864753893,0.9424007164333188,0.9052692203644732,0.8567985927521977,0.8037601560116571,0.8176669516590706,0.7698244430314878,0.8538104926132584,0.806094165448362,0.7727281377085184,0.9438698680991036,0.7503223668151928,0.9072095609327275,0.9520227949969169,0.9915685136627925,0.9415490486492276,0.9997306095357491,0.8874068635411254,0.821717893155109,0.7545623537839372,0.8567062280635354,0.7893474595015542,0.8433908754085577,0.8962581435433163,0.9268313145113174,0.9374414447727977,0.8315369890725357,0.9914604451187328,0.9101396709411869,0.9171021315697314,0.9084426996912636,0.8367330802877306,0.8551686505586373,0.9562235554466072,0.8416101353232339,0.8324250142384578,0.8325626473487997,0.8912997143376793,0.8268024839572279,0.7827309757887901,0.9217274342561685,0.8208187721144679,0.9132733144999551,0.7927738164416177,0.9939744443967597,0.8938768264318915,0.9280813914784857,0.7541216689077685,0.8533769332165461,0.9426772218953539,0.8523743236134866,0.927900872063531,0.7688394517834483,0.9235134035326742,0.8869578704938135,0.9397495242665233,0.7909102481587622,0.7727162930090731,0.9530904394722377,0.9292674135545278,0.9480408794209285,0.8948509856159605,0.9889947849479219,0.7935744404997053,0.8669241762750717,0.9263805057930516,0.8357056877283078,0.844513043733178,0.7715438310496046,0.9064397233792197,0.9964084295121611,0.8310814397409013,0.8833760628550564,0.8257128734042273,0.8514185061508569,0.8609092364259667,0.8785499583258143,0.830741527713581,0.7855338756087471,0.7595568510219808,0.7781679956952773,0.7844810974397737,0.7812059382075092,0.9001674597588702,0.7703973686652248,0.9881534647788739,0.8194542217612963,0.7790644206603122,0.9773484584430656,0.7913109148084045,0.9953240917749157,0.9344447794136945,0.7623876653288455,0.9860187683586995,0.9109315377690055,0.9566148173049012,0.80254721861558,0.9537778624528721,0.8729318604368835,0.8992642814000593,0.9679792098524527,0.8510385382175376,0.8786372657928364,0.9766274653958747,0.9128832812058412,0.8895601636239732,0.789278617555655,0.9722992232816017,0.9725747052468845,0.7944712157981377,0.9039286065615981,0.7593220687878857,0.9570837265754921,0.9265906796388466,0.8181985730849992,0.8776275792947912,0.989660957941888,0.9259783829591892,0.8499299488761047,0.8551620094440222,0.9663667696194711,0.9741755446788819,0.8883341812304206,0.969816180610662,0.7994142232469814,0.9660910849542028,0.9947056774111926,0.8063177630676549,0.9993543803858607,0.8203566664062347,0.7809436642867515],"n":[33.0,69.0,47.0,63.0,1.0,38.0,51.0,0.0,84.0,73.0,39.0,2.0,7.0,20.0,82.0,6.0,5.0,14.0,99.0,34.0,59.0,76.0,55.0,82.0,1.0,76.0,5.0,72.0,2.0,9.0,53.0,84.0,33.0,79.0,61.0,82.0,14.0,66.0,25.0,12.0,76.0,97.0,83.0,51.0,40.0,68.0,68.0,96.0,54.0,98.0,88.0,6.0,13.0,18.0,98.0,22.0,7.0,50.0,20.0,21.0,96.0,86.0,10.0,40.0,83.0,97.0,32.0,38.0,26.0,67.0,49.0,63.0,29.0,98.0,24.0,14.0,31.0,93.0,49.0,47.0,18.0,42.0,75.0,24.0,88.0,27.0,68.0,99.0,45.0,47.0,52.0,17.0,54.0,72.0,59.0,46.0,7.0,90.0,47.0,81.0,94.0,60.0,36.0,98.0,46.0,22.0,50.0,84.0,24.0,77.0,24.0,26.0,23.0,52.0,12.0,70.0,33.0,11.0,8.0,29.0,1.0,50.0,3.0,21.0,95.0,17.0,11.0,68.0,15.0,69.0,40.0,41.0,15.0,70.0,35.0,30.0,59.0,44.0,14.0,46.0,89.0,61.0,39.0,43.0,86.0,84.0,68.0,97.0,91.0,98.0,18.0,6.0,19.0,27.0,66.0,38.0,49.0,87.0,16.0,80.0,50.0,4.0,39.0,80.0,83.0,59.0,88.0,99.0,14.0,14.0,9.0,25.0,1.0,20.0,54.0,64.0,85.0,42.0,57.0,99.0,84.0,44.0,47.0,9.0,85.0,48.0,18.0,30.0,0.0,72.0,47.0,66.0,6.0,46.0,96.0,27.0,19.0,48.0,84.0,63.0,32.0,88.0,23.0,46.0,23.0,30.0,83.0,19.0,62.0,51.0,36.0,51.0,33.0,38.0,70.0,22.0,14.0,83.0,23.0,28.0,15.0,18.0,80.0,14.0,73.0,3.0,65.0,27.0,1.0,76.0,97.0,35.0,86.0,37.0,98.0,52.0,17.0,92.0,66.0,30.0,21.0,11.0,34.0,3.0,8.0,34.0,100.0,19.0,91.0,79.0,88.0,4.0,34.0,19.0,12.0,83.0,100.0,46.0,25.0,42.0,30.0,6.0,62.0,32.0,49.0,28.0,93.0,71.0,54.0,41.0,91.0,41.0,98.0,22.0,94.0,25.0,14.0,8.0,95.0,69.0,18.0,25.0,14.0,97.0,23.0,5.0,58.0,35.0,26.0,86.0,13.0,40.0,71.0,16.0,95.0,40.0,13.0,95.0,50.0,31.0,77.0,63.0,8.0,18.0,23.0,40.0,70.0,76.0,43.0,44.0,96.0,81.0,55.0,33.0,53.0,79.0,74.0,74.0,20.0,2.0,33.0,76.0,4.0,22.0,32.0,29.0,74.0,83.0,98.0,76.0,62.0,41.0,26.0,88.0,38.0,65.0,50.0,93.0,77.0,11.0,40.0,15.0,75.0,55.0,57.0,76.0,100.0,31.0,91.0,34.0,74.0,15.0,99.0,7.0,6.0,41.0,14.0,77.0,89.0,18.0,10.0,87.0,41.0,81.0,95.0,10.0,90.0,53.0,4.0,57.0,49.0,1.0,5.0,32.0,92.0,71.0,79.0,63.0,69.0,61.0,89.0,65.0,76.0,30.0,65.0,88.0,1.0,68.0,14.0,0.0,14.0,42.0,63.0,46.0,99.0,75.0,78.0,87.0,52.0,79.0,69.0,66.0,30.0,37.0,96.0,80.0,42.0,72.0,33.0,21.0,82.0,74.0,24.0,73.0,10.0,33.0,14.0,56.0,5.0,62.0,14.0,20.0,1.0,27.0,31.0,83.0,72.0,5.0,99.0,80.0,3.0,45.0,35.0,84.0,44.0,22.0,5.0,90.0,27.0,98.0,42.0,93.0,78.0,40.0,55.0,22.0,14.0,50.0,78.0,32.0,86.0,92.0,13.0,61.0,47.0,95.0,37.0,8.0,69.0,4.0,87.0,3.0,45.0,71.0,56.0,60.0,27.0,75.0,20.0,63.0,46.0,5.0,36.0,84.0,24.0,20.0,14.0,2.0,29.0,24.0,51.0,39.0,25.0,65.0,3.0,36.0,50.0,54.0,43.0,50.0,47.0,65.0,4.0,20.0,13.0,84.0,12.0,66.0,9.0,7.0,81.0,24.0,30.0,27.0,87.0,8.0,45.0,82.0,44.0,36.0,68.0,16.0,85.0,45.0,86.0,3.0,40.0,80.0,5.0,80.0,22.0,67.0,17.0,60.0,89.0,45.0,50.0,48.0,49.0,75.0,90.0,20.0,27.0,88.0,18.0,16.0,98.0,87.0,92.0,84.0,0.0,19.0,55.0,94.0,69.0,33.0,94.0,99.0,88.0,48.0,9.0,13.0,69.0,68.0,64.0,42.0,49.0,19.0,97.0,22.0,66.0,7.0,85.0,66.0,19.0,80.0,67.0,74.0,77.0,50.0,86.0,45.0,50.0,5.0,38.0,65.0,59.0,34.0,15.0,48.0,71.0,80.0,66.0,93.0,99.0,96.0,87.0,34.0,71.0,67.0,100.0,79.0,64.0,12.0,63.0,94.0,82.0,67.0,93.0,52.0,58.0,52.0,72.0,24.0,18.0,10.0,38.0,83.0,33.0,62.0,9.0,14.0,97.0,94.0,84.0,43.0,77.0,81.0,52.0,79.0,43.0,58.0,72.0,63.0,10.0,84.0,77.0,35.0,20.0,80.0,92.0,49.0,20.0,46.0,54.0,74.0,91.0,56.0,24.0,74.0,16.0,2.0,75.0,45.0,52.0,43.0,51.0,63.0,88.0,22.0,9.0,24.0,15.0,74.0,48.0,70.0,65.0,27.0,18.0,17.0,68.0,65.0,71.0,22.0,60.0,67.0,47.0,29.0,16.0,44.0,83.0,23.0,19.0,71.0,18.0,57.0,5.0,43.0,93.0,98.0,53.0,17.0,57.0,34.0,3.0,27.0,91.0,32.0,43.0,54.0,26.0,67.0,47.0,57.0,95.0,75.0,4.0,56.0,12.0,94.0,49.0,39.0,47.0,77.0,99.0,25.0,87.0,33.0,33.0,66.0,83.0,35.0,91.0,67.0,96.0,42.0,8.0,70.0,60.0,96.0,55.0,2.0,55.0,1.0,50.0,12.0,26.0,91.0,80.0,6.0,73.0,33.0,68.0,89.0,52.0,72.0,96.0,55.0,44.0,27.0,11.0,8.0,49.0,4.0,99.0,22.0,1.0,67.0,34.0,87.0,43.0,21.0,69.0,37.0,48.0,68.0,18.0,46.0,34.0,13.0,2.0,69.0,59.0,67.0,81.0,25.0,8.0,59.0,71.0,23.0,17.0,18.0,4.0,22.0,98.0,1.0,95.0,81.0,57.0,86.0,17.0,31.0,47.0,73.0,10.0,38.0,63.0,12.0,41.0,67.0,26.0,0.0,87.0,6.0,72.0,63.0,40.0,89.0,31.0,5.0,48.0,37.0,24.0,11.0,95.0,57.0,95.0,55.0,77.0,21.0,40.0,69.0,29.0,99.0,14.0,76.0,37.0,28.0,85.0,59.0,35.0,14.0,18.0,34.0,62.0,36.0,80.0,78.0,40.0,43.0,8.0,1.0,32.0,2.0,22.0,55.0,27.0,56.0,52.0,48.0,29.0,59.0,24.0,62.0,70.0,91.0,58.0,4.0,98.0,70.0,50.0,7.0,17.0,64.0,4.0,63.0,31.0,16.0,94.0,23.0,36.0,7.0,95.0,10.0,78.0,65.0,41.0,24.0,37.0,15.0,41.0,64.0,37.0,60.0,55.0,92.0,73.0,76.0,46.0,80.0,7.0,91.0,66.0,45.0,8.0,51.0,80.0,51.0,4.0,86.0,87.0,95.0,67.0,16.0,44.0,59.0,53.0,88.0,14.0,95.0,48.0,74.0,12.0,8.0,67.0,75.0,23.0,10.0,93.0,67.0,14.0,13.0,95.0,96.0,86.0,56.0,44.0,99.0,97.0,67.0,46.0,10.0,15.0,21.0,6.0,45.0,51.0,14.0,28.0,40.0,81.0,100.0,45.0,72.0,13.0,89.0,42.0,57.0,90.0,98.0,18.0,49.0,55.0,55.0,16.0,40.0,11.0,38.0,18.0,11.0,10.0,67.0,90.0,62.0,48.0,88.0,37.0,47.0,69.0,78.0,41.0,21.0,85.0,61.0,79.0,76.0,45.0,15.0,42.0,63.0,74.0,15.0,96.0,32.0,5.0,95.0,17.0,25.0,21.0,79.0,99.0,100.0,32.0,26.0,60.0,98.0,16.0,82.0,24.0,13.0,64.0,99.0,92.0,56.0,22.0,10.0,12.0,81.0,5.0,89.0]}
},{}],25:[function(require,module,exports){
module.exports={"expected":[0.9663186127424994,1.0,1.0,1.0,1.0,0.9999999999965916,1.0,1.0,1.0,1.0,1.0,0.9999999914294992,1.0,1.0,1.0,1.0,0.9999999998899118,0.9999999999902125,0.45288353127178904,0.6352089331810216,0.21094766254617012,0.6537584844009081,0.954537426377586,0.9750530152885555,0.9699709534505063,0.9999984099680135,0.9876129447722299,0.9650104634692123,0.9999999999998719,1.0,1.0,1.0,0.9943841706395963,0.0018704840265964312,1.0,1.0,1.0,0.00348009422226543,0.9999999921611427,1.0,0.9999999999999998,1.0,0.9999999999999999,1.0,0.9999996217282809,0.08203661131060112,0.9769347790089737,0.9999999999999772,0.9999999729452504,1.0,0.15750289346033167,1.0,0.9999994441628614,0.9020163618879817,0.9930287179000569,1.0,0.7068873660279761,1.0,1.0,1.0,0.9999999999998823,0.4657667617718233,0.029233586008906107,1.0,0.9942693976777,1.0,0.40717083715276525,0.9999942878769591,7.083321768239439e-5,1.0,0.5293999729732808,1.0,1.0,0.9938771810455089,1.0,0.9999968375651667,0.9999999608399558,1.0,0.9999999999999998,0.001466549893369228,1.0,1.0,1.0,1.0,0.14863685555901124,0.9055918675103818,1.0,0.9999999949048303,1.0,1.0,1.0,1.0,0.9015064999970153,0.9999999999999944,0.9999999999999996,0.9903649948885349,1.0,0.9997697769549819,1.0,0.9999999998832625,0.9999999999999934,0.9999999499281761,0.9999999999956146,0.9992257152115183,1.0,1.0,0.8495394237086842,1.0,1.0,1.0,1.0,0.9999999991903818,0.7559360585850088,0.9998867787848966,1.0,1.0,0.9999999999882027,1.0,1.0,0.9999999999999158,0.999999818226947,0.7445729173352025,1.0,0.7985671814195826,0.991778895230937,1.0,0.9999999514857583,1.0,1.0,0.9999999999999999,0.9999999999985217,1.0,1.0,0.9999999979054135,0.6114887562245357,1.3974940190574851e-5,0.007290169348448994,0.9999999999948186,0.7898753120574422,0.8434637789002424,1.0,0.9999979177087617,1.0,1.0,0.8089400846511583,1.0,0.9999999999450133,1.0,1.0,1.0,1.0,0.9999999995210466,0.9835248801376887,0.9857267433701444,1.0,1.0,1.0,1.0,0.999999918541554,1.0,0.6767559614643044,1.0,1.0,2.4192905216851155e-5,0.9625919316040976,0.9999999999114627,1.0,1.0,0.999999999996305,0.9999715184786615,0.15287924353966667,1.0,1.0,0.9993487607035114,1.0,0.5084963578086301,1.0,0.9999999961308922,0.9999999811299933,1.0,0.9752649268098407,0.9987938872288458,1.0,0.9999999999379354,0.986488083993538,0.9999999999999998,1.0,0.9999999987646561,0.999999999958304,1.0,0.9999999999999629,1.0,0.9999999997461599,0.9999999515874989,1.0,0.9999999999921241,0.15074716173784417,0.557958938661658,0.9999999999999785,1.0,0.9999944462769289,1.0,0.9981823342405677,1.0,1.0,1.0,1.0,1.0,1.0,0.9996563523692701,1.0,0.001087952734041716,0.0001556281189441662,0.9999974877538778,0.9109343096374611,1.0,0.24186324966845968,1.0,1.0,0.9999999992643176,0.041933828103339454,1.0,1.0,1.0,0.9923236035472358,0.9999999999486131,0.6603636458541187,3.114566230523242e-7,0.9999999999992306,0.9999999982754524,0.999999931085261,0.411363118516969,1.0,0.6245023723882084,1.0,0.9999715290503426,0.9865819497934973,0.35221924300932944,1.0,0.9934149260518098,0.8285710411657189,0.8949385849535918,0.9915518675984809,0.014560037248685006,0.9960547997922118,0.9940829846421799,0.9536113362538595,0.0002184660664348834,0.050889041661605516,1.0,0.9958872439132802,1.0,1.0,0.9999999999999754,0.9982416632472653,0.8962364604133161,0.8157057565667898,1.0,1.0,1.0,1.0,0.9473878968010347,0.9999998542997741,0.9693520022853441,0.9999999206787361,1.0,0.6032922652453641,1.0,1.0,0.9999999999999999,1.0,0.9936657567248203,0.9994710615881914,0.9999999833009956,0.9999999999997089,1.0,1.0,1.0,0.9999999999934481,1.0,1.0,0.5159097641927124,1.0,0.9999078380686242,1.0,1.0,0.3900065508262316,1.0,0.9999999999990019,0.9963855297204545,0.4575874453899366,0.9999999529692631,1.0,0.596172946239091,1.0,0.9999998836510986,0.7463857271759403,0.9998920183888849,0.9994124712987537,0.9942543206173664,1.0,0.9999958743982706,0.21789542343536747,0.7801223605906216,0.9999999999999967,0.9999999999915955,1.0,0.9999999859513933,1.0,0.999973238579394,0.9999999999999987,0.9996400679317679,0.9999999999668595,0.27438173672892846,1.0,0.9999999995249349,0.9999997870603149,0.43501368619193864,0.9999999999999992,0.9995598072999812,0.8198611550193935,1.0,0.9999956669139062,1.0,1.0,0.9999999738937653,1.0,0.9999998890266913,1.0,0.012572752676501054,1.0,0.9999999750519576,0.9982118618064798,1.0,0.9985379543677879,1.0,1.0,1.0,1.0,0.9999999999802718,0.08307768539411632,1.0,0.9999951656370305,0.9999971178435816,0.9999999924223333,0.9999999999999991,0.2673677401714379,0.2330201306901026,1.0,0.9999999999999996,1.0,1.0,0.999999988978794,1.0,0.4697185812511402,0.0007698481083728189,1.0,0.99999985007391,1.0,1.0,0.9999954785788212,1.0,0.03977358069868267,1.0,1.0,1.0,0.6270733943709768,1.0,1.0,6.952435992966244e-8,1.0,0.9987685069082572,0.002340143293660708,1.0,0.9953195479803575,1.0,0.9999999999999978,0.46662018823550633,1.0,0.9999999992823442,1.0,0.9998503303824235,1.0,1.0,0.9999983235568364,1.0,0.999999685929107,0.9997583731913708,0.9999999999999792,0.999999988572998,1.0,1.0,0.9999999999998435,0.7468466533441342,0.47353033554815627,1.0,1.0,1.0,0.9234127579697342,0.9996640108352319,0.9999999905995085,1.0,0.9999999999992688,0.061242372283365834,0.9253986082085879,0.2261161167510851,0.9999999999996352,1.0,0.49375246430468034,1.0,0.9999999999968878,1.0,0.9999999985143277,0.8045723787242104,1.0,0.32438800913955257,0.8425833253191364,1.0,0.011326283270797158,2.197279159838273e-6,0.3668142409796727,0.2936567428872775,1.0,0.999999999571437,1.0,0.9999999999999999,1.0,1.0,0.9999986398774128,0.6949999990857758,0.999994287930011,0.9999999999695541,1.0,1.0,0.9416028039393538,0.5645811757596131,0.989284951100835,1.0,0.9786396144176258,3.1204966962447754e-7,1.0,0.9281772114090212,0.9514342710494764,1.0,0.9999999999999563,0.0007048455044566458,0.9706168544595839,0.4133965771103901,1.0,0.565398146550111,6.2529117405981285e-9,0.999883451238087,1.0,1.0,0.9999999999999909,0.9784658185490653,0.9999337913763178,0.9539597933714871,1.0,0.7446139778444439,1.0,0.8545516418501022,1.0,1.0,0.9432959432939009,0.035331530619675894,1.0,0.9999928051672775,0.9994987890245142,0.9999979567480838,0.9235993359514068,1.0,0.35751786358345183,1.0,1.0,0.9999999999999787,0.9999999987743607,0.9993702997644816,0.24006246815512258,0.9999999999999791,0.9038600247488189,0.8180323303380126,0.9999999999992356,0.9999999999023395,1.0,0.9999999999998485,0.7641529290288038,1.0,1.3450201668907105e-6,0.9999990863749946,0.8489276129714265,0.9999999999416908,1.0,0.27797235151416755,0.9999999998663043,1.0,0.999582885258206,0.9679090942406325,0.78219659699303,0.9915539724381532,0.9999999997211642,0.9651085940127992,0.9999997707759082,1.0,0.6142058578716278,1.0,1.0,0.9999245671435834,0.9999999999787288,0.5160854402674122,0.999999591282086,0.9999999999999991,0.8672844687250708,0.9999998450429055,0.9999996879671275,1.0,0.9999348472448119,0.3345120165873628,0.9999959304770698,0.9999999999715248,0.2527277288086699,0.9999999996377127,1.0,1.0,1.0,0.8536922863588909,1.0,1.0,1.0,0.033665400119280306,1.0,1.0,0.9896386407066141,1.0,0.054997446911691526,1.0,1.0,0.9999946712532677,0.313781052501897,1.0,1.0,0.9997644540323067,0.8294517831468952,0.9999999999999998,0.6792238782989861,0.9974560486621937,0.9999945989674959,0.9901013892202447,0.9999065438046627,0.4780470833596653,1.0,1.0,0.9999999999846301,1.0,0.4270403223030327,0.9999998024251676,1.0,0.9999999999843785,0.8454297724905895,1.0,1.0,0.9975574870626671,0.9999999987030156,0.7051774392344147,0.3129586369700201,0.9981997654225716,1.0,0.9999999999999873,0.9999999981327479,0.9999980037983818,0.9998386868431286,0.15488478410716772,0.9999999997946505,0.9999999999977208,1.0,1.0,1.0,0.9379163239248918,0.9999999872598675,0.44132387773910836,0.9674560832902974,1.0,0.999720695816414,0.06136639745275359,0.03726620537756166,0.9660629188471876,1.0,0.9999855443858913,0.9444649082438128,0.9943990649958582,1.0,1.0,0.9998303156216415,1.0,0.999999999716987,0.9999999995482258,1.0,1.0,0.9999039442147972,1.0,0.667170874520554,0.9999999816312762,0.999999999917051,1.0,1.0,0.9999998105041265,1.0,0.9999971695777314,0.60479556411988,1.0,0.9999999999999996,0.9999999987649864,0.9825154951926469,0.031265947897320345,0.8330425753471224,1.0,0.9999950541618492,1.0,0.999999999912881,1.0,0.9974723588872383,0.9998095129423834,1.0,0.7521937840019712,0.999999999956716,1.0,0.9999334989683808,1.0,0.9999999999999987,1.0,0.018236203176672267,1.0,0.9999999999960522,0.99999999646991,0.9999999999999984,0.999999325916944,1.0,0.9999843773902438,1.0,0.9989626945761421,1.0,1.0,1.0,0.9999999993998457,1.0,0.9802359077577039,3.217318100497735e-5,0.9999829712826672,0.9999119297734481,0.9891517759422581,0.9999999999999685,0.9999999996417193,0.9917696186954368,0.9999998788973723,1.0,1.0,0.5793498405999078,0.9999996234820892,0.9532665107692937,0.9999999999810508,1.0,1.0,0.9999935486906462,0.9079372327970556,0.5101870072475652,0.9996308975802511,1.0,0.9854889531637039,0.6122398320511426,0.872981005632912,0.9999999999973472,1.0,0.9999995450759696,1.0,0.9999997378710568,0.9999999925868641,0.9999999999824247,0.002197640478240429,0.9999770859427999,0.9983145426536644,1.0,1.0,1.0,0.9195053188622597,1.0,0.9999989165603376,0.8692489273436328,0.9999999572492576,0.9999863853021297,0.9999942048376765,1.0,0.0860891120388906,0.8033814635021786,1.0,0.9999940334130246,0.046039464152021745,0.9999999999996649,1.0,1.0,0.966277722339751,1.0,0.9999999999999544,0.9999999999986076,1.0,0.9946022939416013,0.9999999999998904,1.0,0.9998392313675853,0.8076071915860918,0.9995237897258407,1.0,0.7419893845810241,0.9999988672328539,0.9999999956968706,0.9999997777556093,0.12553519603473162,1.0,1.0,1.0,1.0,0.9935832894847619,0.0002125578625091046,0.999999984991707,0.5787659684556655,0.4977853282123066,1.0,1.0,0.9985101665343421,1.0,0.9999860377910682,0.9999724912216973,0.9999999999998841,1.0,0.9999999997706723,1.0,0.9981518921756921,0.9999999861977483,1.0,0.033127431681830244,1.0,1.0,1.0,0.9999999354537309,0.0022506596188803137,0.9999999992892319,0.9999999900206923,1.0,0.007186207764703519,0.9597208616475692,0.9999999983619752,0.06767328736381381,0.03205609688636581,1.0,0.9999999999048093,0.999999866067572,0.8476694286077271,0.7433506802376656,1.0,1.0,0.8647862627695324,1.0,0.99999999999998,1.0,0.9667187240616009,0.9999993726788223,0.44146066370875287,1.0,1.0,1.0,0.9999840017798859,0.9999999984111415,1.0,1.0,0.9999998017160543,1.0,9.753094558467038e-5,0.20746679929241738,1.0,0.9999999999998467,0.9999999997830487,0.8246336550296769,0.9951252238487466,0.9999999999999856,0.9999994996645691,1.0,0.01834369677416899,0.9999999999999987,0.9999998530897112,1.0,0.999999999999631,0.670218802465061,0.9999949188932388,0.9808134491778826,1.0,1.0,0.06078953023575318,1.0,1.0,0.9999999999997758,1.0,0.9999998682026494,0.5786816171911497,0.997781125972715,0.005321813689265965,1.0,0.05886293250767759,1.0,1.0,0.9997919650160911,0.9999997792920334,1.0,0.9999216886828551,0.9999999999941518,0.990756128975793,1.0,0.9999999973786936,1.0,0.4381490391807531,0.99856378499829,0.9999069813191619,0.9999999999993798,0.9999999999999993,1.0,1.0,0.0009357870712656657,1.0,1.0,1.0,1.0,0.5886269521093184,0.999999999992137,0.0002716909506152572,0.8935493128769301,0.9829441633093663,0.2792448635366582,1.0,1.0,1.0,0.9999999995955102,0.9999999999999997,0.9999584800161276,1.0,0.9740571044118087,0.9996661744790671,0.9994454227854782,1.0,0.9999999999999962,0.9999997665582976,0.999993407782443,0.9999999529061137,0.9999999999999716,1.0,1.0,0.9999999999999951,0.9999996638258972,0.05096290111202402,1.0,0.8406188193439375,1.0,0.9999999998501445,1.0,0.00143711066774694,0.15188364578612606,1.0,1.0,0.5844775813825448,0.9930100228813548,1.0,0.996663566002075,0.9996195416195985,1.0,0.7001052417099762,0.0466558503723044,1.0,1.0,0.5250025448361443,1.0,0.9999999999999989,1.0,0.9999999999999469,0.970855012288645,1.0,1.0,0.034862034051483956,0.9987439868232384,1.0,0.9999999936011201,1.0,1.0,1.0,1.0,1.0,1.0,0.23780712655134603,0.9815838276651472,0.4897365372940413,1.0,0.9999404829447637,1.0,0.9999999999347826,1.0,0.9999999999990444,0.6242167478122866,1.0,0.9999999999996608,1.0,1.0,0.1154905591340394,0.24632603154369112,1.0,0.9999999999999996,0.9987720462923917,1.0,1.0,1.0,1.0,0.9207390385860786,1.0,1.0,0.9999999999972968,0.9999999999999973,0.1583851104953126,1.0,0.9999999993662186,0.9758020750348926,1.0,0.9212246335925539,0.9999990865282957,0.002103347933725771,0.999999995795102,0.9999999247745279,0.9999999996652709,0.005730349433142123,1.0,0.9978168253019114,0.9862900426804972,0.9507981335912636,0.999999999999998,0.9999999999999989,1.0,1.0,0.9961199294583749,1.0,1.0,1.0,0.9509342542544087,0.9999999862615857,0.6425020550460816,0.9932610171898185,0.999999999387915,0.9999657408146818,1.0,0.9966462520464963,1.0,0.010424509371505623,0.9997563139851471,0.9999422830520678,1.0,1.0,0.9954004993353529,0.9999999999999893,0.9999999751475448,1.0,1.0,1.0,1.0,1.0,1.0,0.9913188759073774,1.0,0.9564137233951511,1.6094550955663683e-5,0.9999998805362529,1.0,0.9763523106349251,1.0,0.9999999999999992,0.14877809598989158,0.9999999999999982,0.001569555910520524,0.6273458671099126,0.8179829719760663,0.999999999999064,0.9999990302715114,0.7916147625353249,0.9999888384031042,1.0,1.0,0.9999999999999942,0.9877669170504904,0.9939585801724329,0.9997076874662519,0.9999999999999998,0.00044619921106806113,1.0,1.0,0.999969196825635,0.8607195065983421,1.0,0.15098096492283258],"x":[2.0312248068748318,27.649053265956738,39.134427579015764,31.920084962994892,7.120406075316721,34.47348754286025,17.825708303785053,35.59476299558857,32.3918380539981,39.13953559762237,36.80091397155769,13.369290057937828,7.643121404427253,36.60678511144978,25.31917991881583,17.194965933582242,21.90517890109532,20.53209481459242,3.4152006627666864,8.094061343431695,7.803764379770177,4.5658091229329045,4.358463395819445,11.366201422645217,21.705324393651864,27.64396334823153,6.033262020766879,7.6002037419575785,33.22695728217377,38.89713287058494,38.483946186442225,34.52554656145114,21.101684379251058,2.0514093876369444,17.888353044781418,30.684461142938623,29.944996026032964,3.5565970612664266,32.62393655714884,18.07030447707347,13.650642228600827,18.20347767733591,15.74816227101043,22.00024662579544,36.386839046319714,1.7821186003177036,0.020263698575320177,20.198962958407627,20.744781005419703,33.752565479412965,7.400942612107899,23.1567181773468,30.89538481920429,22.90915387557743,5.688033369150993,39.59664335547246,8.747594815269473,32.829454036137136,34.88235227888464,28.865054752839463,17.258614091154154,7.595354665186926,0.694059992471523,27.05702751738859,25.918497544266927,29.592673843209283,16.94652957272167,25.964476773654603,1.8678711078116716,37.390219929796665,8.320607059733467,22.11421584845447,30.447109909470164,10.936295746293823,32.24380745611434,12.788312989730812,10.797221854953492,32.579171792395044,12.770635563524637,1.163707060287491,26.640915841287878,36.29173769955213,23.564269356725866,36.48630198381467,9.93119330203669,8.189758529904294,24.782755756903647,13.742842303687377,4.1279301848368455,15.273639722794625,27.15615570108951,23.984888286341466,5.765497520939462,23.323623211352302,31.521791187278172,8.752295750388335,31.35632408582909,13.849496384837474,30.643242579573588,9.975791878418487,25.02339934923315,25.000952527240095,14.581739194950387,6.479757427904129,34.97306705298162,36.52157955791792,2.664337564100565,34.07104909282445,26.866709411411456,39.66337382562949,32.58569938712756,21.229316929552056,5.753753999326028,7.608881522267614,26.93356235903274,34.8131648883496,38.03155444499198,29.34557205990444,35.885728380093234,35.98576831953747,14.995736490512215,16.372967257486533,21.19765724614321,1.901338518419875,18.08684989053564,37.79743709093026,26.76373778733387,26.269745427285347,14.01300429356124,29.60883080444897,10.188080569324107,33.35895675698778,21.064290595484945,29.93288289076802,10.34207884921054,1.1357459557113714,1.7064255170205112,14.315348505140495,3.87507137408722,16.358539335249567,30.39632562671594,32.40163319650751,37.18206532850842,19.733244313787548,0.4359438299819818,32.14516234328475,24.571784346550807,38.836369693331754,35.899659217577245,37.84444826675639,28.20669875785141,19.97330584500908,16.929806816582715,11.782982118390004,33.546132138151364,25.683974337701414,29.830200046540813,30.555930153161206,19.97321874388872,11.773995859973638,12.830030172005769,29.822369979459175,39.84026238788756,2.735923085816685,3.2014852959937024,6.550898534157952,35.721720188023866,39.1831338434998,32.68226981677714,9.90362669769409,2.6713776099771547,34.87336055889621,30.98927471560824,5.611089739098567,35.076126840159716,8.318024283811418,31.432591795811973,19.63059820829768,37.760547169318016,17.113588983343064,6.395177865364081,20.174570533275293,12.903869944600004,29.501500948450445,15.364659665510985,34.58642827091339,38.71587434563839,33.657825055017405,11.81878321588452,35.1364353017197,18.383109403707756,19.71696587269518,25.239671027017295,20.77797031292503,21.628239374495656,28.667530626975957,0.8124861008442785,1.5402620518917498,26.447197257327247,35.73558059385269,25.572544591457486,26.18166479739722,20.851633127358014,33.57377536682611,27.091945353454285,20.440873283805175,30.726357654500703,31.306241099028604,36.876092477258204,7.314013741085876,34.11076761501554,4.625844012083586,1.6455329152817022,18.814470332946218,9.661290934978792,30.86754871404728,9.867792226006422,19.208437166531276,17.047819293753328,16.758373766391603,9.742967033107872,26.543700641367955,36.28744290772978,39.586694194350315,14.269681332471826,15.901288954943285,12.941859542703789,0.39460753306949314,11.638246139837998,34.144888916268044,17.990844058169344,14.067039601509359,26.52857895442378,0.5954284391429532,32.58981873971099,23.4586890838602,7.439060022399415,5.843667625940041,27.856155518004044,2.88681103655402,1.6947397844659662,9.563789544042196,11.376274380541824,9.190577785107017,24.067502841892193,3.1274698764604025,7.799348293871411,4.232843386689336,1.5846319406328746,36.154351884120345,20.535517856026626,32.542327273749635,19.99129617243005,34.5412535165603,3.2420682148155233,12.70026125092878,16.65759632811051,25.947113190235783,31.754933983942088,26.693486050634174,34.46477947507514,13.69386743676019,15.312727898236265,12.465442212258955,18.917790393946436,30.431855273512873,12.170506855434091,22.483778521909592,25.11277531263822,29.557691450652122,22.4014467046584,17.541493588870996,14.804021735950217,32.378590299977894,25.8814001517327,31.283525190224097,20.497144750677556,30.976970977043,38.952808494134146,19.28186713359662,19.694550017159116,0.6127642251660337,31.16202761529003,19.57908660505506,38.506836240697886,32.55300041313329,4.087047079499309,37.32098287270009,13.75124888885475,5.983223032542133,15.555782243985394,13.51425318749496,19.830259959469714,9.6155367405553,36.794886093050884,27.551440636987614,3.797657972881785,26.966052267996847,14.384858153207087,12.007784949823224,13.69786889902974,10.330546786218449,1.0442234480178492,4.568595160329902,24.629252171426224,15.779169358911842,37.82198046830572,14.668320886820432,31.828092239838497,21.906067884941727,39.07019061421426,25.79982483945774,20.530467715115186,9.79508403032332,34.47483054537375,36.420754082987976,6.528208400164264,12.725598081097065,33.73450071761205,20.00371270399934,14.3351100239002,25.886229738441024,15.81531430380605,34.2203787174411,15.421462976102829,17.6117594432366,25.132764973969532,14.10713506586002,18.852362649418808,1.3172768926562917,19.097677078306347,28.179694152648906,13.857076068133685,33.07057158942725,20.724902555390237,22.28319048469921,23.7058866832788,29.00743751229694,19.750642088903803,17.581190135271967,5.951953600410684,31.125892567691125,21.962040815305663,14.513466506009873,9.125345657529733,24.21890118354871,1.0355387850385167,3.8673121631860408,38.064675116250854,38.673189825817964,22.1705257431951,20.54998677558241,6.043385753168611,38.34661678150229,16.80830405686864,6.503653713553588,38.12818939354918,22.60816940540714,31.355978179020873,26.86008711886709,20.69586381791965,25.854914878493727,1.8264453508278322,6.755746273696657,33.05615295234388,18.953586768589314,15.580899826314871,39.57157148787202,29.428178662459985,0.8704067296983897,30.01881112007057,7.0892977343692465,4.1911425384603085,22.63897468967499,17.59631315515992,22.67620328384922,27.944208522916057,6.199904851047906,4.367163677367882,11.4788481064664,22.55761636709292,18.41073286742016,27.140559107347624,29.260648001407723,7.789756978289102,37.089807569635084,12.014994456068742,4.187476683968425,30.726130752113214,13.864222981558028,24.632779175402355,19.353290187299123,39.82584298152027,1.6732213989294387,2.868198789705687,12.847641611562732,22.736976252657755,25.40578155915376,7.776810428638434,6.289524947413989,31.77728689254205,36.89340145568891,39.360904194992294,1.4257452014766514,17.00183521555708,0.1531945938059387,9.699363046589244,22.523475509185555,2.910287423274376,39.0948227727347,20.54437918195786,29.84546087581201,11.85630645059697,5.150891762797878,3.717161760581016,8.732620194879042,16.666588545980225,27.505136817866564,0.807747078815888,2.562178266099302,4.137623723972794,5.1388315546556385,36.95598977534334,12.925848872226062,38.60586941736095,34.46498253335821,25.887760262197197,31.338929137969327,30.932227143504598,7.104216656957885,17.276183292176952,17.784118225555588,36.131470353100134,25.897289817278928,19.444662110289535,8.130530108383134,25.1538548708443,21.43673974786757,18.74288420680046,0.13641730564377674,14.070630938768653,6.793231776138811,9.806747959118303,35.15919266952444,6.270317484849297,1.920128722098502,17.761861594802557,2.024237098707644,18.65037224866694,5.625278682041284,0.9319119212971572,28.673208841495956,17.39128189118791,39.958695661036494,22.506849471852732,1.2289077613766786,2.07488479580185,19.962334109746713,32.079278258453776,6.140023325830706,11.871704819382112,16.537343579363075,25.973080012501157,39.481562849252995,19.537159159050603,4.928366457762641,28.23068834303222,15.683618899285081,14.443932012026535,15.811906079304636,18.905989075050485,26.464766096035337,3.5537197238796026,12.611699881984428,22.02692114973849,16.604910707443405,19.723905333638434,13.713629652289256,7.936997003989941,38.72881837731423,1.5714209998903872,10.95897498962123,38.20000344293078,17.056963166917313,24.15533495534995,31.319149861259838,18.090334361685798,28.723045418159707,0.5703749014760007,22.529756078946363,19.276713187184118,23.660215883246842,24.357959191721584,6.6046708841642054,28.08673153996,36.84882543052666,21.127104885799042,15.245974955903803,7.745367894699635,13.236614177853783,26.786498779814877,13.879509097370093,32.51926144965874,26.382136045667302,10.890317866971868,30.134712106769523,27.83324083786234,23.127305358536212,10.808734955751476,14.676160144834602,19.37211557335811,22.37541080418488,13.516591093066115,14.023987250055763,29.1104782212739,33.210783320133565,20.32004458647746,5.461314197658451,10.053591384431462,26.48373828972547,9.669619288256417,24.324460626697714,21.97094722349871,34.32362645633156,31.441004896508993,14.365859598893307,39.76046326233815,19.294194696692706,37.408630095851166,3.4748392067795564,37.14770351986638,30.489803172713703,19.87089533273093,32.01689481437674,7.25133522751455,20.984056595471916,20.626747487965247,11.919508854341547,12.317805730187912,35.5578305770691,16.009970465829717,5.5520187359933715,12.066777901504224,38.85992856279902,7.449477459719773,20.90893416760555,9.710523962592292,6.996803438205381,13.133885476567961,12.510511355893437,35.326788705429315,29.433366613135128,27.711246934339194,39.04988116641965,10.033801905899988,32.35442764180831,21.374525809632434,27.38517596662735,3.7438197544819296,31.078651357676613,31.28083026450281,17.98674093345422,36.1011783640168,4.746756998908959,5.134384230842812,14.684767472336908,37.94832053622806,23.52617095629143,25.878292977824184,33.07019898366248,8.547354535413492,2.424299063322435,17.62308779978661,24.18707613278243,17.40925887287257,35.200451954098256,29.323787211295347,7.418704452977201,10.57938747481547,3.4888256518106076,17.9577144462084,37.2457506472741,9.263670672192719,4.510140508413141,7.671361753219097,6.521931521320328,27.857900867835674,27.07034367051466,1.6728667750932935,8.870058733905966,32.20431879333111,34.870568087323775,17.027710260706144,31.782550247653738,14.39786337884299,26.371565580033376,2.2841397536340047,30.467547534617985,3.9742596856109103,31.91902213050758,16.30200112514067,17.360739075067162,18.45899356933127,35.59849616603147,12.817192616494415,24.39443399937882,13.073529553313419,21.00503970508815,6.8834882685926235,33.23108358622182,35.18570385018974,19.685906259293464,3.1517850371590317,8.907693543889659,12.040803776984692,30.070090465402277,10.223694372555956,37.24209427582661,29.475837512077796,39.965534974456276,6.55232255246144,22.989476115019194,25.31433493749775,4.27077648514282,13.314417390950277,32.89738865651928,12.93791455797713,25.598429005074912,32.00534737115123,30.24819776236212,8.196831106100637,19.85379628743562,8.658949912771101,20.24843252555584,31.331547490449854,15.47797140776737,27.347141147615773,9.259890133535329,33.7004057763952,15.552664591985641,20.332942363546287,29.261700184158073,38.59572097531149,27.65606719161739,38.382218833490455,24.689411395556895,4.963253616522918,8.00407140058545,10.874489325267946,8.861520870307062,22.52839521892133,20.461877088886613,18.855255617316658,35.73852648421182,31.301171766372224,38.7287503893645,4.075603716669329,16.251547463008905,16.882818269851416,19.002948027091193,19.40786543091143,22.66055432999485,27.14162852883525,19.151267490425965,1.8305402198952159,14.3688770256444,33.39540161779376,26.627093168283096,1.0688890393083117,8.614068371313852,26.111538005835698,22.67926613576445,30.549163595840582,38.469109164618686,15.088757382695483,17.223077874544863,27.787396046936202,1.0335062577589404,4.458555001149076,10.749615096980625,32.730106713870406,23.008599103365288,27.280270165517784,3.780438047803889,28.62576186530753,20.93925068993144,4.454018917264948,13.80684073771075,17.3821863605448,21.46710162199925,38.25859663686827,5.804963494464266,11.852516291759834,34.34623463220808,33.69432361763592,1.521179583761496,18.432347641211557,33.04155410886661,31.366420934622383,4.9908419196831755,26.877641938539405,31.044397055968087,29.746835372914752,28.912811867056057,24.400866585119047,34.18323126917291,38.380557898859664,25.08531924495788,4.192601610900892,7.920149227723838,37.57514313358811,10.014396285545164,22.357662247599094,14.372811928820228,16.959087902484367,0.43833297360371226,19.500874046794845,23.341748878846857,22.70022985573945,39.32434738350989,12.224981654353968,4.046994265597625,8.984485882538431,3.9440654032038402,9.696237543389481,29.969531741520612,23.944237719225512,9.197533885269662,16.752108075359544,13.795610509184684,9.459915949445659,14.395781996330141,33.618319810120795,33.64022228309815,34.53216830324881,14.878551653162466,24.985813037635367,17.87233055113837,3.00557697421147,30.69389429504465,28.06005181151975,24.537092644026586,24.211417451354595,1.5717063901521566,30.48565730844551,28.423589119051982,35.442415519221655,1.573215761961544,1.4521441553753522,26.3776973427045,8.258615519178507,1.4913048659114736,38.4698279940459,27.70766901042501,14.328473092214873,21.18434977284202,7.126012897758187,12.62336222488388,25.138096836946424,8.523321666879937,16.078183449159535,18.958931685913214,12.051074997836393,14.846873234029445,12.977999929102957,10.461043973268831,35.56293073038116,22.611701685387526,36.71081837772081,21.102122930200046,16.82033118158148,32.080441630441776,24.96678500230127,21.60057689298455,35.64179941329125,1.0521089655323568,0.8657793071576769,36.16934792749275,16.355634562893915,8.92646678644784,2.7995484290829076,1.8614480009279433,25.786386756203648,13.062366460161785,24.59924019160657,0.057792315659908056,15.352301078930015,23.806581476954534,35.93955828194542,16.83091374705155,11.718245854831046,19.48394631107827,20.92368412940896,29.979818665399122,28.594056759805806,8.702383928120687,12.96463007218791,22.183770193217622,33.495184972551954,26.214144091744167,17.192421779893188,10.673468621391251,22.054887661041764,2.9797369741596924,35.90449500382569,0.23906740907664314,39.169328236698455,33.192762351803864,10.017435770482255,26.09514190275524,37.47408475125367,19.228415040359195,32.1176603008492,0.19023536520163198,31.680307289289562,20.10264590032639,35.21364686192718,2.3689098733292813,8.044875241996605,5.052426533109404,23.394155695466807,30.60032153629586,19.199163429161974,30.071587112107334,5.599799299976187,33.24127763767896,33.834941244442064,29.657255155629603,27.361884649424233,7.585974379372207,15.761768429730738,6.180065346044001,8.063697735434632,12.28802948712981,3.6477202074260084,8.008130989379891,35.767552966139846,30.742125030041496,12.881593091651036,21.670569671744424,16.734749742496298,13.969508811333684,3.0016939964126887,12.302956885992478,5.216747592058315,38.78347154004282,20.575167082851628,13.056435913771587,15.372669129349674,25.922452250129666,39.968917641301104,33.70021285597574,32.2239664001217,13.085093519989783,32.07734124125033,1.017052013919253,33.14232800563872,6.83699975273286,32.1123315571751,32.060645745832524,5.525008607513362,5.743032973926496,0.74719944239094,37.383733856537084,36.808182958549196,18.018546264180763,11.117718601497861,39.04341921244332,6.483795512001844,14.36768292705457,18.20306032732894,8.206109582487802,1.0917310256943757,36.41485269569823,39.74836756596382,7.218806086369529,36.166622877196055,22.43530263850851,26.78424229320384,9.808712196482476,9.878365348864762,37.00692329193663,14.163183172917027,2.267369942164672,20.62622412564748,37.346240650500334,20.463188643939432,37.940667214351734,12.35052427264507,39.1216753990477,22.096510342589575,29.71076782791726,26.02612645059672,6.801471660745841,5.638036701431766,4.878817547766108,33.21536721967029,9.892970287297693,26.862326277031634,39.895146536242756,37.43006749951747,26.411359182427407,15.462616832245786,20.233513225270254,20.208140072837857,32.80658010797911,19.84810069360268,3.119968298528395,3.8182028437487148,37.11627685719894,13.167802393833234,8.744701477898964,36.06481440747517,36.52256033489828,22.762338960989716,32.94677648848357,18.903857108360622,28.77637901601843,32.21412617873871,23.097737820670936,25.923482721959743,9.561091359596947,38.10499047730035,28.07526464083324,4.152225488877601,18.976779554271317,12.55633736302614,24.574161985641823,2.5784353001948634,9.368137883982488,12.384219342169107,35.10908353244475,7.733981212358785,36.06985929758515,16.861791926615794,19.74649919191699,17.419050467425976,33.646605445854256,23.01940968616367,26.56451444704586,23.900776689086342,27.93569535285444,23.93185833703327,29.638972324829016,29.119714671146433,4.399050508075986,29.175328463401105,4.586261633394342,12.097229941221315,18.71130384815613,25.637939672459975,25.61985576763685,9.225743659241292,23.02217375058192,1.897585223600613,12.848872505304874,18.367634671478044,28.464262509437646,27.00288059763369,18.344631550330163,30.100720052049237,21.921179311140946,21.690688617641804,25.871877928543014,32.993349635017395,19.816336908386845,31.511567263339188,16.8566349029779,23.247115855138595,28.62656235840432,21.87502935423609,2.159290330553425,16.17000512210548,39.54705800055023,4.548328778045478,22.19940148476823,22.059829803360866,2.673170153131057,39.92668377690755,0.010864232988074818,8.983854703037037,17.095744410220384,21.396223694122654,26.476204623439905,7.576553630024954,28.76893457283172,38.184645017796925,24.921743411133733,28.248768376117745,12.387671920848566,22.178992737800385,16.520171361390304,21.01614125685897,3.1067446381165187,34.07323052086495,20.449039117931083,20.182448272401004,10.536616449495959,15.968843159354478,2.317509798664892],"p":[0.1634863146631175,0.05266378704083379,0.05404932716253028,0.08688281239833034,0.003207267088958288,0.15509242032215265,0.013828772193780425,0.05225420798655076,0.07880910229342214,0.10162175922645122,0.1006140802978758,0.027714747995552937,0.07871485647034118,0.13212712499224621,0.14440567044260094,0.039672903306236185,0.05142471855564854,0.1534896009485785,0.07733392262976234,0.07784316342605457,0.11805961162093613,0.048446088574666174,0.07693210531400499,0.07247132450471798,0.16100955905180975,0.17945516435801886,0.04041447367938607,0.09652294810803733,0.11271977694136198,0.1343486720898405,0.1603174986616036,0.017869828296715663,0.17229593426076364,0.11225501026825442,0.01583523556286606,0.02438181298914213,0.04739784783129073,0.1130628813673257,0.19305423497918672,0.10895365329463341,0.04679598245821879,0.11029754705267575,0.009922618434157116,0.11094832129559871,0.19493287519617933,0.09712257529214532,0.007748287903800666,0.12760971382151062,0.06068869139416355,0.017236066054183485,0.16353914644462428,0.1125093085382122,0.13728485635779109,0.18471278131341512,0.017133017228691382,0.09652714043312045,0.1961774084496605,0.09157380448713247,0.04331976483551334,0.1695986227214192,0.03017020428055597,0.13081128047103996,0.16965810236915568,0.168305853922959,0.1700830958504781,0.04263347664889783,0.1749549333753312,0.13225036097576087,0.17146143125260732,0.13192643200516116,0.15591621009186574,0.021463905193917165,0.06175980857732686,0.05546514403379406,0.07577451230259143,0.08274518752641669,0.07533080291948631,0.022919359098387826,0.049752549594962496,0.1206726962415591,0.06076267212840323,0.04533149725922728,0.09820713013721925,0.14682892451102597,0.16341709617077205,0.12020971863253851,0.01604302539877116,0.025416628322425305,0.07532375632341966,0.028168416861347547,0.12717189099866594,0.19130906058132402,0.031681671383755064,0.1293284291595736,0.10222495742879754,0.11021621553087609,0.15301506643990673,0.10249263482285778,0.19760673349876143,0.015700898004683772,0.03834714594484892,0.1994601736827183,0.14682955617634794,0.09979948597574487,0.13638116253851007,0.06192618999565296,0.1544318388134762,0.08376451309804095,0.029670937691645128,0.040820163078132854,0.050591316818676235,0.059655850134310476,0.07021032499913452,0.1595967611132482,0.1617122505303714,0.0640944855616744,0.18781197335895441,0.015138562678351387,0.1559516821253352,0.14307677443615294,0.03589212279960106,0.15698618155446967,0.035329980885583014,0.06957841626394,0.11802844404931885,0.000502535703816731,0.08799560690531605,0.15041803658569455,0.05401313660278637,0.09526398724865955,0.017817504342694336,0.11085365236552902,0.026149880863669452,0.11448944716924161,0.13052455527776305,0.19362089410398853,0.18371506458006964,0.05069419650885361,0.030603371115403323,0.14421805770888718,0.10803899788988454,0.18004361953305523,0.125703842001437,0.017647100931721484,0.06823701870577002,0.11441611256214901,0.11395574241501567,0.09538855293626236,0.07148051513264067,0.15346765647083585,0.013002931125511586,0.061794512463213415,0.17608955304974444,0.059898764021024814,0.03965708573250222,0.006120686563535394,0.0403373332026955,0.021908938203306194,0.05952697223466239,0.09719901222038999,0.16700399457459747,0.062321092426201125,0.0718566724738738,0.18733365249656161,0.15446471357228006,0.0020609889637505318,0.1074181304478663,0.0383560609642772,0.10081538827969201,0.05659779797858233,0.0818278743979072,0.14451067394844128,0.16543292013334432,0.013574962883431407,0.011765925041691761,0.1677611227644268,0.09878578679586192,0.08779700788233824,0.16210670123811416,0.07408729522054594,0.11548346679250501,0.14038260528390403,0.005862243570772696,0.08125550359022365,0.0886352837072443,0.10884111594861615,0.07880705549052164,0.1674723993687966,0.04369791560297279,0.04392315173203163,0.029439706955233326,0.008461851276312205,0.17755799694962635,0.14794980298608099,0.025749204957633956,0.08857744773831447,0.07581188121002916,0.019928306158890588,0.04631133098271141,0.008172220264171104,0.14218030354331446,0.12163046450997889,0.11516720154642326,0.14742295548478987,0.023850409816358067,0.04711930238475821,0.17203579376924294,0.029245013966736667,0.011187070881565299,0.12740709228626385,0.054237844815808914,0.17576108583045996,0.19006703182166623,0.05892229712902402,0.12278094467731733,0.09802010601522598,0.16322949761342836,0.07647129618296118,0.004033729124788144,0.03346109297445348,0.17915239877819175,0.046743515539539704,0.16911703750642887,0.010861290368505472,0.08888501554472761,0.19295903303356476,0.1550500172214002,0.151798815907909,0.025112212556267145,0.14206151814569687,0.05005258401367905,0.15419516739472,0.012649274065598438,0.015570839559950223,0.14980670522000114,0.1233506079592647,0.04792981831613017,0.0683484987175567,0.13871875049728666,0.006650108725240767,0.15358362981511192,0.14106150648316326,0.14343087302688806,0.1728489985003029,0.15673991360598216,0.007600875881697178,0.08093711835519111,0.18317715746846042,0.06142560457495652,0.01844792992176303,0.12050030544431728,0.021818076320905135,0.01400311743632341,0.1397273214016031,0.03186647294944698,0.1375777556729179,0.16470749119732175,0.08429376256174584,0.10976458242097618,0.1800162023963807,0.045117297810360585,0.18705263482445889,0.05253040237277356,0.13100511006436313,0.08814544326262191,0.014831520406564503,0.136971713771139,0.0105707194073974,0.03697758971606526,0.17792733569414243,0.0934540394224141,0.12926549676158042,0.0854823295942464,0.14503323442552316,0.06303239602991213,0.040200070859038387,0.02093383105033153,0.08329840555738795,0.17173149466756807,0.1682931218742931,0.053096420967289594,0.15249272110449646,0.043906535383635516,0.1816500220602678,0.18559621182109526,0.059943440043168476,0.10456442663365961,0.16042235388770698,0.034808505796121915,0.0648364084264467,0.18808982215033782,0.03755477155133358,0.06038365072378307,0.10042464269351262,0.08577752401184613,0.11383184361429298,0.09536848264969305,0.15689683612445782,0.11083623192532017,0.07211026088218252,0.07008815281665633,0.0944510647359266,0.10299654715887217,0.1637104150093015,0.12991490074748532,0.018159003199654935,0.19864363978351457,0.10219301366003766,0.08502249595047738,0.1459021437090549,0.13780801512851465,0.15925996529836006,0.09080250486713344,0.12892273941183024,0.059235303674076256,0.14648115418649396,0.11140220861612359,0.1959950548650362,0.10544409262857135,0.19551669571860428,0.13845040719786997,0.002543177311845302,0.04696320539035553,0.11507099552534733,0.038033823281137295,0.19869757223181478,0.06847475341727215,0.0332038382937689,0.04117379939328978,0.09011846751633322,0.031032619525899908,0.12873726605805633,0.12285148878028829,0.19464035605929936,0.1853103346907351,0.01712480009205124,0.08484194845497967,0.09144543485384787,0.04226612881383103,0.09830965104083007,0.13106279120957817,0.03722811336244463,0.14488427617433505,0.03956934844661904,0.02513145494390976,0.07340632624824366,0.11918183096438613,0.15803680083335814,0.008650935659521864,0.1940567057597442,0.03656498100826209,0.17635792840192563,0.054600923514941835,0.10852466428692864,0.18557126058648407,0.1748659359092582,0.021430255475585903,0.155877314098134,0.017074442005113922,0.025255503905850452,0.07433263674163318,0.06265438446761494,0.06780041034723774,0.08773290822929401,0.15376301967987557,0.048585835361224565,0.14614071750495575,0.10992857869128617,0.09501402830368764,0.19268924118225025,0.016708968455972164,0.16615653755856666,0.13255415635603668,0.13158316034160808,0.15953693085619963,0.06507543171362236,0.05166989951695076,0.0900939295940868,0.049966526381583526,0.019024375677088746,0.0038972997635454477,0.13828275213426236,0.042616092634354355,0.027979157178557302,0.06147393656240174,0.03712560414579818,0.039252044112679844,0.015728195088679574,0.08426856036916086,0.08042142389700868,0.1406224820734666,0.18823637338782684,0.18781831780609515,0.04220239062645051,0.07862781930047952,0.10777756378885357,0.04809389378733369,0.02716359355100062,0.095853780006204,0.06458029846566693,0.1869237955976019,0.11027817469663988,0.19658366265256366,0.05782862688423829,0.1820557123369366,0.04539685696210412,0.010819016704989881,0.017255788086428938,0.036802483857550826,0.1429960433512248,0.03163331257082298,0.07896479020719066,0.015069261748802899,0.17302528649558405,0.1262119256608846,0.17654002258033633,0.1974459058785222,0.02797982765593723,0.1478753627787679,0.18736424966020082,0.056837124000950694,0.09278304121481025,0.020175023057803457,0.0835882402742994,0.04979649648471196,0.11803729344675076,0.019009396857758088,0.12991353704433367,0.17635880137317198,0.13904294736784847,0.0799840185911187,0.07596697536398107,0.07973502050689918,0.02033582301927761,0.17088762836283192,0.14363808433369626,0.1826450812364936,0.04359646001325795,0.12283276390601108,0.16333754136008333,0.025759660993636448,0.13931066165560604,0.09969587361444834,0.18957021508442085,0.0008228238534241151,0.1516608870518933,0.12981394250486322,0.06542640109706772,0.14871252529347787,0.0659949956621972,0.19517381928956642,0.1498235688208501,0.1610242454492793,0.09135612887185296,0.06487887382079359,0.015299743522682041,0.0074872657971094105,0.18005939793259054,0.04912692379475821,0.07154808006892943,0.06011206898553221,0.1690918556534979,0.01933099041592783,0.10218197104169664,0.17940634132602434,0.11847984936737013,0.08489598502676735,0.11088513562941689,0.06169534778834525,0.09802017735596516,0.16159576387359675,0.024108599829609646,0.05029134356386331,0.0852495612990384,0.04752609085931963,0.13349359329066918,0.11485793370070169,0.1311110822089103,0.13148834889331731,0.11914320429194368,0.03521012661829572,0.08676344303359818,0.1725212279939272,0.04452132210594937,0.010704740658507995,0.08393168735976611,0.16253311885332075,0.0035577228629244395,0.1904169862711529,0.15600063573853284,0.177310562832224,0.05120343931494445,0.10472039234635805,0.1797194335605104,0.08652250144370775,0.09343225430865405,0.19673769743438885,0.10144990092881044,0.059943184587144406,0.10108769401061135,0.10249082058988807,0.0950425076360923,0.19105926406165682,0.04490189563145411,0.1085068287324642,0.04847392817661329,0.04040266531805288,0.1385161287474468,0.01567012969428774,0.16081666887833662,0.09247007760115095,0.11555425183650568,0.1677409044134211,0.17080608558570695,0.13855768104388486,0.031109481416040065,0.09092517539390532,0.13252755426115806,0.051767734429955636,0.06879523054884044,0.1760670023183625,0.10631726395851837,0.1350361663488223,0.0034824403094781964,0.11692586518964454,0.17356565125591783,0.10457032931499,0.13512385921654144,0.021655590353998957,0.10202850498684742,0.09252910091680731,0.05909317363443681,0.1570279032228153,0.08011199904302516,0.14236755473569415,0.01971902631935545,0.0062779948548381094,0.027083414478670867,0.17376109643675416,0.13749366086567263,0.0034354099607049274,0.026289004834939123,0.10221168789387343,0.17218024792780473,0.12485290680798036,0.1710728710076205,0.09693827075342853,0.07728749547829145,0.05793781550180262,0.17759725617759253,0.013645386466587707,0.009649985001602569,0.13291479608225784,0.02866156925420329,0.19907366532914486,0.18375755853107895,0.1855077604705318,0.12131014010406892,0.0463571209922852,0.027023453626964233,0.030271493632630042,0.14021155854632977,0.15598333049167526,0.10367461741441551,0.10311176305381947,0.08809907228799352,0.16698617732205134,0.03738694740247115,0.07805189843615064,0.19435366757867112,0.10119582567108464,0.08010135404912783,0.06862728779788037,0.07335804720424753,0.18364318052042275,0.09635419381693958,0.17870403766669507,0.07127361191369289,0.012727119829147426,0.12189812190714155,0.19395950863058792,0.17617851640011992,0.048436062855320254,0.12515185338238052,0.18898465187285743,0.058457403447042734,0.08244002323171706,0.1411218437088175,0.011903633985579854,0.11617009387979618,0.09964145174633182,0.06671350411599168,0.18058828466995425,0.09639271437149688,0.04050379654109992,0.16989830447516227,0.01539807049866453,0.08672567661335369,0.008313057273737856,0.0284207604849958,0.16368625816083804,0.07141896547549105,0.04679639207567288,0.1916428574590548,0.17573852024613285,0.08780391527589773,0.07878946786608375,0.1005397061119925,0.07804594196653128,0.17709646951348845,0.15927152541266804,0.19417275914413487,0.037550093023602085,0.15074317546769123,0.18824350751080743,0.042680791668253226,0.03326191466973434,0.006566647754518718,0.09230089604512269,0.008784377099477414,0.08633096072266051,0.12178774870768244,0.031976536618983475,0.03545636462639217,0.014514684763828445,0.1529091603435286,0.17906305235090483,0.19827026911096862,0.11234174628267053,0.031159200579470928,0.16288908236072205,0.07612760009444496,0.0178595922969508,0.10222122503373572,0.0655096574003117,0.042673956510749594,0.1349885680180191,0.049775708798386775,0.10888215208634643,0.19885250355985892,0.028324648945417155,0.097714460568394,0.14119893358984786,0.18630998329560416,0.15835979298526906,0.17253617388360315,0.19035538117268735,0.0654019082506018,0.14494610554500925,0.057611059339711536,0.0838687633612215,0.10949538045519938,0.18173260937181765,0.15449557316335497,0.09751702237002542,0.12758439840590588,0.05515723930644794,0.19331258868040602,0.1371953203537337,0.03177742951524887,0.011147240982544028,0.00893050520238643,0.12559351064810023,0.1953029218376397,0.049395113363397684,0.08971327860055789,0.1376476352939755,0.1878055692437092,0.11023714432177778,0.12807531429821065,0.14072585296660858,0.017644419847272587,0.18534634150717424,0.1368910501582615,0.12407787503602541,0.057459864489731595,0.08620602531244437,0.17124436569497328,0.0542527173128248,0.11079881999431072,0.16488049586724418,0.05563108228008047,0.008136356637407083,0.04568454612817448,0.10709769314612952,0.14213747808991695,0.07526034517968086,0.034170588200567,0.09101381548700145,0.16743050742809748,0.10278016580341563,0.13388582020785528,0.10976948301803767,0.02366285686778591,0.16165600863881766,0.10773113945679952,0.1903319985025434,0.036313980396644976,0.1890937810036596,0.02418106135212992,0.10821939522533999,0.09037858535840942,0.09037478086235678,0.03198309073758159,0.15518926855312676,0.17634090346243264,0.08255780716677981,0.1992005304514018,0.04032736459497604,0.12391603960658584,0.013342841371173543,0.14906049466872437,0.08749425688430389,0.03746464399424903,0.1769182772932271,0.026253944092185313,0.0201725873112093,0.06736443081258102,0.06537058918447212,0.09399794469238612,0.17642290291635995,0.162323672115125,0.13511497265978487,0.07845992935626134,0.11762806393856656,0.12649305559930224,0.03178592633503761,0.11628456334979931,0.11242666845681129,0.15668969922334597,0.04140103401743609,0.017219680657219707,0.0019553880657583013,0.1997183359540578,0.17502541668407826,0.08469407142204188,0.14117710395593286,0.01260834923653067,0.14731259253314716,0.04879704435898944,0.12775772762155732,0.10984393573664547,0.09329572539912384,0.13487883828770683,0.1239623014709152,0.1164181071217279,0.06040574200573663,0.07013896780681761,0.1208420500574758,0.16557308186812417,0.19188576088476378,0.14992280797111263,0.12503823660504396,0.07446674613423436,0.15832241327934599,0.1981891179495154,0.11896508335501293,0.05814427229950905,0.11728799162014054,0.10065762054219092,0.10726624205611338,0.10400102663930721,0.09124811244116843,0.14254914032748878,0.0514988303959715,0.14377919443822204,0.003454265470442275,0.05467509915655682,0.004694587801869288,0.08947856291619237,0.04635656900183678,0.06427638553728254,0.18311993828523346,0.08462755232402396,0.04226759527133304,0.18246660852864777,0.031587970293085466,0.01130785102193297,0.02706237618228449,0.028108345214586494,0.017578250135261087,0.069819597186273,0.07259711674771104,0.06586879707184545,0.06449895373034953,0.1376477544034651,0.02302406037869864,0.14029597112157882,0.045205174259364524,0.062348434131600565,0.14291847775952582,0.142584608157274,0.13142472744294276,0.05580658168384933,0.10829069346217586,0.17970342986158194,0.003914831506083072,0.18885066571388662,0.12769761762345477,0.021884911233032735,0.11274757171868131,0.1791874154941048,0.13985379496512937,0.11542080928945753,0.17564992168928695,0.051102517666392004,0.00520604912013587,0.10076486909379652,0.17933938157181695,0.19681361297241554,0.007999486994494287,0.1016056472298462,0.16824681562155663,0.0011601840570523159,0.0555620582784746,0.09140591923866732,0.010977066509182933,0.05017926642864126,0.09526300689442438,0.126926877768266,0.03972169664759689,0.11284676516727546,0.007076059012156933,0.016678932014252013,0.19019276765846094,0.024668634789800237,0.1309233841439887,0.04329926666750788,0.13966327698019568,0.15357391475206095,0.13501747102733705,0.18922567257264797,0.120575779791045,0.17214768773683817,0.08916027532840105,0.11779693469502123,0.13582976342897055,0.007995990959983735,0.023132829894818976,0.03256321741426169,0.07873287384731165,0.1349532724163788,0.011481318746505976,0.0592781642478955,0.011892042795777736,0.0547560284453914,0.08086799104044134,0.18411506994072915,0.17070290150875672,0.1881651100731866,0.14831776449208914,0.02478130717854912,0.02115982324311636,0.06033017327695603,0.18785744154784326,0.12791691592099969,0.13708704995309537,0.1466992781820384,0.14643161480177197,0.176928777423214,0.010566636200934766,0.19054384519350498,0.18893291091956482,0.16539790245811292,0.07939396382408481,0.19337024305440587,0.0907217039928272,0.1208461017154066,0.07919044662932545,0.14083527410427044,0.0004930730752844781,0.16567341363854152,0.1464370469743351,0.025790446924267574,0.035019251550212974,0.07709733665649537,0.19542570732363918,0.04083003120289992,0.1457325041951458,0.008214570357333263,0.15974531108514226,0.015605100964678088,0.1383938562404865,0.17185316559830915,0.14082572143220942,0.060689227674254866,0.13216861252291215,0.02298862914737798,0.1327630031685406,0.06701672056330264,0.138750800597193,0.026413958994690658,0.040167615545104285,0.1512239574488181,0.09554887062971376,0.06531400746779496,0.018855575022200588,0.06785788520135375,0.12168264480733254,0.1635252060196903,0.09214708324997281,0.07607340936506884,0.18362643539811116,0.02611405357883232,0.19976679886961912,0.11451605780390245,0.015658199139673146,0.0788726826116235,0.08016004683523753,0.06898049180309478,0.0067706337928745254,0.08386238798019932,0.06698944292133713,0.002971117616042074,0.07800847847452462,0.1734947068787415,0.1685679224856338,0.048983332218597034,0.08134947750758417,0.14276495517083707,0.09294009988459676,0.14392513308481383,0.12201043925759354,0.1596657809968011,0.018124109243045885,0.027297025053681524,0.19737376636899776,0.09107456157854031,0.160729184206425,0.010050487441239798,0.02206601975555076,0.17252513510880862,0.19629282531413117,0.12391060542586821,0.14429188047736258,0.13152065716378347,0.1504664776195911,0.08494451562302655,0.10046743831029677,0.00099651757375252,0.0917182477489687,0.18292276529743312,0.11527614700471421,0.1473840635801015,0.10690949630950355,0.18013030072142733,0.1643941767589403,0.16410541596989142,0.08185063659855968,0.03495315401832393,0.12649151474847464,0.11998513556089163,0.07280010766283684,0.04177766420866043,0.07023802736459457,0.17480154314038787,0.07288998620616881,0.09553509127330356,0.01708828552728514,0.12329896619873787,0.14252933582602126,0.07870733979022249,0.07343663179723929,0.05435135268655436,0.09555226588868684,0.04813195330591929,0.089549781942458,0.17542939414879932,0.1802904550322619,0.0030087210731824412,0.16725353605037202,0.19949326892978983,0.062244513426326004,0.10968266947246491,0.022594908369272606,0.011553799777945885,0.09907558608461407,0.06824874725332859,0.18421979924973472,0.16419510396945602,0.19949962341096575,0.18972841138458266,0.11196169264313666,0.15555488164562853,0.11000865284515729,0.1321104616170727,0.1741736553780248,0.09076267073284341,0.05995391552004379,0.07280788694635087,0.16304691916649283,0.1756469397868189,0.029499371223765936,0.19616194898568196,0.035575338921650344,0.04896750324789694,0.15297525370242848,0.18041624182097615,0.012625011165070754,0.11966342460929194],"n":[5.0,32.0,14.0,6.0,2.0,67.0,1.0,53.0,39.0,27.0,72.0,71.0,7.0,56.0,13.0,21.0,82.0,29.0,50.0,99.0,84.0,80.0,26.0,88.0,91.0,64.0,62.0,40.0,75.0,66.0,20.0,71.0,74.0,89.0,23.0,47.0,85.0,97.0,64.0,0.0,17.0,10.0,78.0,10.0,85.0,41.0,3.0,27.0,85.0,98.0,64.0,12.0,90.0,95.0,98.0,41.0,37.0,6.0,20.0,9.0,60.0,60.0,19.0,12.0,93.0,59.0,100.0,79.0,65.0,10.0,54.0,33.0,72.0,83.0,0.0,36.0,20.0,48.0,14.0,69.0,4.0,71.0,7.0,58.0,79.0,46.0,78.0,74.0,4.0,24.0,18.0,10.0,100.0,33.0,62.0,34.0,4.0,48.0,11.0,35.0,100.0,46.0,16.0,17.0,19.0,16.0,9.0,49.0,46.0,97.0,58.0,79.0,60.0,12.0,9.0,25.0,71.0,43.0,6.0,68.0,81.0,91.0,8.0,12.0,90.0,23.0,97.0,22.0,6.0,56.0,29.0,52.0,4.0,81.0,75.0,65.0,35.0,31.0,77.0,91.0,19.0,82.0,8.0,8.0,3.0,54.0,52.0,59.0,54.0,56.0,88.0,62.0,57.0,98.0,66.0,33.0,33.0,24.0,84.0,9.0,67.0,42.0,62.0,76.0,9.0,64.0,60.0,7.0,86.0,37.0,56.0,4.0,3.0,77.0,54.0,51.0,17.0,51.0,94.0,1.0,26.0,75.0,22.0,96.0,99.0,69.0,46.0,71.0,23.0,47.0,66.0,84.0,42.0,41.0,60.0,78.0,24.0,75.0,96.0,9.0,74.0,33.0,93.0,8.0,20.0,33.0,34.0,44.0,55.0,16.0,100.0,78.0,54.0,95.0,51.0,29.0,72.0,8.0,62.0,78.0,86.0,0.0,36.0,23.0,85.0,17.0,73.0,91.0,27.0,86.0,80.0,100.0,79.0,30.0,35.0,81.0,66.0,96.0,30.0,57.0,5.0,46.0,40.0,100.0,93.0,94.0,50.0,85.0,75.0,90.0,95.0,21.0,56.0,64.0,17.0,65.0,82.0,32.0,24.0,21.0,67.0,48.0,64.0,57.0,54.0,0.0,86.0,78.0,9.0,37.0,0.0,75.0,68.0,83.0,75.0,25.0,21.0,5.0,75.0,8.0,32.0,4.0,73.0,47.0,44.0,60.0,50.0,5.0,32.0,24.0,85.0,61.0,20.0,89.0,54.0,85.0,27.0,83.0,54.0,82.0,5.0,24.0,27.0,20.0,35.0,90.0,31.0,28.0,18.0,61.0,76.0,83.0,44.0,89.0,54.0,88.0,7.0,67.0,69.0,52.0,84.0,85.0,90.0,60.0,15.0,25.0,46.0,84.0,37.0,68.0,14.0,76.0,49.0,22.0,59.0,71.0,37.0,11.0,15.0,30.0,71.0,87.0,56.0,91.0,34.0,50.0,21.0,32.0,6.0,56.0,46.0,3.0,8.0,30.0,91.0,99.0,81.0,48.0,61.0,30.0,94.0,13.0,72.0,3.0,27.0,5.0,99.0,5.0,27.0,77.0,82.0,15.0,98.0,17.0,60.0,12.0,87.0,76.0,4.0,57.0,30.0,57.0,84.0,4.0,16.0,9.0,58.0,36.0,76.0,29.0,12.0,2.0,67.0,23.0,35.0,11.0,45.0,1.0,47.0,22.0,63.0,40.0,67.0,76.0,70.0,32.0,29.0,38.0,73.0,37.0,97.0,19.0,75.0,23.0,0.0,56.0,67.0,30.0,28.0,89.0,95.0,75.0,22.0,20.0,5.0,64.0,43.0,20.0,75.0,46.0,69.0,37.0,18.0,31.0,82.0,57.0,91.0,30.0,95.0,84.0,3.0,27.0,56.0,15.0,54.0,59.0,87.0,46.0,3.0,80.0,87.0,96.0,3.0,3.0,50.0,15.0,11.0,76.0,73.0,72.0,3.0,77.0,15.0,61.0,78.0,79.0,30.0,43.0,92.0,44.0,84.0,93.0,87.0,10.0,31.0,18.0,39.0,42.0,73.0,87.0,15.0,93.0,71.0,61.0,22.0,86.0,98.0,98.0,64.0,52.0,89.0,95.0,1.0,45.0,88.0,0.0,55.0,96.0,96.0,69.0,69.0,87.0,72.0,10.0,90.0,81.0,21.0,77.0,40.0,90.0,62.0,31.0,61.0,22.0,83.0,39.0,92.0,50.0,40.0,89.0,66.0,59.0,6.0,25.0,32.0,65.0,60.0,17.0,69.0,79.0,58.0,35.0,75.0,75.0,88.0,85.0,43.0,89.0,82.0,42.0,54.0,34.0,95.0,60.0,52.0,66.0,20.0,32.0,75.0,72.0,32.0,76.0,54.0,20.0,56.0,74.0,17.0,58.0,45.0,72.0,31.0,64.0,86.0,35.0,66.0,74.0,3.0,88.0,88.0,80.0,22.0,57.0,44.0,66.0,17.0,30.0,29.0,60.0,85.0,32.0,60.0,20.0,55.0,68.0,69.0,53.0,44.0,87.0,32.0,30.0,47.0,0.0,42.0,16.0,47.0,47.0,2.0,20.0,29.0,68.0,92.0,54.0,65.0,0.0,7.0,91.0,12.0,75.0,77.0,1.0,56.0,27.0,27.0,98.0,52.0,14.0,61.0,1.0,87.0,16.0,23.0,86.0,64.0,95.0,88.0,29.0,24.0,2.0,63.0,65.0,96.0,24.0,17.0,49.0,92.0,86.0,23.0,39.0,7.0,37.0,39.0,17.0,16.0,47.0,1.0,96.0,93.0,25.0,22.0,64.0,43.0,42.0,60.0,96.0,60.0,47.0,77.0,26.0,81.0,95.0,8.0,28.0,93.0,76.0,33.0,63.0,2.0,95.0,12.0,46.0,46.0,47.0,69.0,44.0,32.0,62.0,77.0,45.0,8.0,37.0,2.0,42.0,55.0,36.0,27.0,49.0,36.0,66.0,65.0,50.0,84.0,69.0,83.0,87.0,98.0,43.0,20.0,91.0,1.0,74.0,14.0,78.0,77.0,94.0,96.0,56.0,60.0,65.0,76.0,17.0,71.0,59.0,87.0,60.0,27.0,78.0,3.0,11.0,23.0,95.0,36.0,97.0,9.0,42.0,82.0,24.0,51.0,30.0,2.0,27.0,49.0,61.0,14.0,59.0,29.0,77.0,54.0,69.0,54.0,47.0,9.0,32.0,82.0,58.0,77.0,80.0,96.0,97.0,3.0,50.0,69.0,33.0,68.0,93.0,23.0,89.0,51.0,3.0,6.0,59.0,6.0,25.0,6.0,64.0,48.0,77.0,3.0,47.0,9.0,92.0,61.0,14.0,8.0,76.0,12.0,59.0,49.0,85.0,58.0,17.0,82.0,2.0,60.0,44.0,18.0,27.0,44.0,56.0,36.0,31.0,72.0,49.0,100.0,17.0,13.0,75.0,31.0,9.0,69.0,39.0,41.0,56.0,89.0,76.0,7.0,54.0,15.0,16.0,20.0,52.0,45.0,78.0,58.0,8.0,53.0,53.0,49.0,58.0,30.0,8.0,98.0,55.0,76.0,25.0,81.0,0.0,38.0,2.0,37.0,46.0,19.0,98.0,47.0,41.0,54.0,1.0,7.0,61.0,56.0,70.0,73.0,13.0,97.0,73.0,85.0,9.0,34.0,19.0,30.0,48.0,77.0,1.0,79.0,17.0,74.0,35.0,25.0,31.0,35.0,61.0,5.0,78.0,9.0,18.0,12.0,92.0,60.0,77.0,26.0,42.0,84.0,44.0,31.0,1.0,28.0,97.0,21.0,67.0,25.0,31.0,33.0,24.0,12.0,37.0,75.0,26.0,41.0,93.0,6.0,39.0,15.0,40.0,54.0,56.0,23.0,72.0,8.0,34.0,25.0,86.0,18.0,72.0,79.0,66.0,23.0,31.0,78.0,80.0,63.0,46.0,80.0,33.0,60.0,16.0,21.0,24.0,81.0,2.0,17.0,37.0,47.0,89.0,74.0,56.0,90.0,45.0,44.0,95.0,60.0,74.0,88.0,73.0,81.0,24.0,57.0,91.0,80.0,84.0,37.0,2.0,22.0,93.0,11.0,3.0,32.0,12.0,64.0,24.0,74.0,94.0,90.0,10.0,51.0,8.0,91.0,27.0,96.0,29.0,22.0,82.0,50.0,73.0,30.0,39.0,64.0,26.0,43.0,1.0,82.0,86.0,91.0,73.0,61.0,46.0,72.0,34.0,34.0,68.0,62.0,36.0,39.0,76.0,36.0,67.0,52.0,96.0,48.0,33.0,85.0,89.0,83.0,41.0,74.0,66.0,89.0,16.0,55.0,43.0,24.0,38.0]}
},{}],26:[function(require,module,exports){
module.exports={"expected":[0.028673064580453617,1.0,7.553845424722302e-11,1.0,0.16934849432779672,8.427694449538367e-5,1.0,1.732309010605078e-5,1.0,0.03206347355160735,1.8792577191855995e-11,0.144967311868854,0.0001853930210744584,0.0938671888394264,5.311895354288793e-7,1.0,0.017112038956976033,2.9620542704043686e-18,1.0,3.692970532265481e-11,1.0,1.0,0.00034085223344512743,0.06418327038184587,0.9532410503507027,1.0,1.0,0.002578435035096071,4.14098124992935e-7,2.441865918543412e-19,1.209277102034475e-10,1.0,1.0,4.091107695626429e-7,1.0,1.0,0.0004710720732013247,1.0,1.0,0.6425261857770905,0.9649540291995973,0.3576759477938745,6.996134677290577e-13,6.954540359225575e-10,1.0,0.016478763142589406,1.0,5.1582305504681744e-8,1.0,0.08034093375693539,1.0,1.917832348465042e-9,1.0,5.902340491074697e-28,4.823057911947045e-12,1.0,1.0,1.0,0.06560502539863919,0.5939596673537904,1.0,1.0,3.4571817970833324e-5,1.9322104454782288e-7,0.0007687910584343557,1.0,1.6207193813961108e-8,1.4988396678605336e-5,1.0,1.0,1.0,1.0,0.00280726932287275,1.0,1.0,0.010442144314420811,6.883013701533212e-15,0.0010139645867020977,0.6674988677278488,0.0009410357124428311,4.69216192018577e-7,1.0,0.011999003314447667,0.026997288040795438,0.00023264042037627084,0.09833099985053514,0.3833376338027823,1.0,0.0011617272658272272,1.0,0.0439575931890216,1.4796259984122585e-24,2.5155391351392245e-19,0.08887999243832724,0.000336222163647988,1.0,0.44239434498752056,0.003510214853007322,3.3769515948664624e-7,1.0,1.0,2.851206025199155e-10,0.05245424433883683,1.5779309923535914e-5,1.0,0.0005827957282944731,1.2874136513227373e-14,1.0,0.13387128838509985,1.0,0.8771281481668218,0.0019180269700251435,1.0,2.0242680548074024e-8,1.0,0.11228937474576893,1.0,0.38202926861310427,1.0,0.018472965816772612,0.008874067217464657,2.3620964506758753e-5,1.0314092196285611e-13,1.0,2.57541313838054e-7,4.4235545015869245e-13,1.0,1.0,1.9479293509511278e-6,0.08010577216533359,1.0,3.0340665183046945e-7,1.1397489406013226e-9,1.0,0.20388145395723278,0.22939855608862747,2.1446524686376922e-12,9.662368625339769e-11,3.2850647784682237e-10,1.0,0.06181407720666402,8.049091387096981e-11,0.0033345463942737446,1.0,1.41193894392631e-7,0.00010146877974292558,0.00014202084399686472,0.002931610216905578,1.0,1.0,1.0,0.5406853698960088,0.0009152837937635866,0.2917722941472322,0.03273947348718962,1.0,2.5766981511882082e-11,0.9154218355911442,1.0,0.2414037258944541,0.8195859175259809,1.0,0.000175059910370535,1.0,1.434309213399209e-8,7.545544723055346e-38,0.04743088387202128,1.0,1.0,1.0,1.0,1.0,1.0,0.5416375126620838,1.0,4.34834941463707e-7,1.0,7.556236515386267e-5,0.23835033802524208,0.54565239190882,1.0,0.27625370105845737,0.09495221448600745,1.0,1.0,1.5951703370420343e-6,1.1091277901755865e-5,1.4175277520081407e-12,1.0,1.0,0.03527956790297769,1.0,0.030660652716528843,1.0,1.0,0.007352913509283207,1.452100663355287e-16,0.009526957909802559,3.370210805632196e-10,0.7908987620717887,1.472809098485518e-5,0.08050997344537376,1.1464742621206607e-9,1.0,0.023064715277108332,3.199092228424711e-25,8.163257247917978e-11,1.0,1.0,0.9630046957250968,5.246639983095794e-9,0.5323396851027548,0.05498594197195122,0.15167752630278664,0.7942806849670658,1.0,0.002225930545293432,1.2199976104288397e-10,8.76368295422356e-5,1.5768273236293618e-11,1.0,0.02550444368172233,1.0,1.1986171149712314e-29,1.0,1.0,4.767453090902985e-40,0.012804464144199532,0.36450598780078797,0.8797669069015033,1.3818608410086638e-10,0.02594415568848472,1.0995944435305197e-8,0.004730571996751098,0.41890022950259176,2.0887388949317346e-5,0.16452267986151328,0.0003000300991506757,1.0,1.0,0.030349608694925763,1.4477735738597127e-6,0.018473477343432423,0.14959384969926637,9.445510215521197e-8,1.0,1.0,1.1576767230094355e-10,1.2955382710113548e-6,1.0,1.0,1.0,0.043250346540701,1.0,0.6556594314896285,0.2083870595133023,1.4051812383019606e-11,1.1642403759949352e-13,6.506289309974827e-6,1.0,0.008158308731565613,0.0009507340805608592,2.1926369028671922e-8,5.7503079715732735e-5,0.0005029141198314192,4.6697877294567047e-7,1.0,4.430152478157326e-10,1.0,1.8019673077629628e-6,0.040061529019513584,1.0,1.0,3.2858442597280504e-5,1.0,0.04309987606746502,1.600523427334424e-16,1.0,0.02630490043848638,1.0,1.0,1.1217928810597342e-7,2.1259382568904774e-6,1.0,0.8289291909555997,1.5361582610446858e-18,1.0,1.0,6.236420026173051e-6,0.05395084820269442,1.0,1.0,7.881365347001316e-6,3.010343422738552e-6,1.490668032941066e-6,1.0,1.7328786086777622e-5,3.842536693966147e-7,0.8081110253243508,1.0,0.1456190469704137,1.0,0.0663574299755272,1.0,1.0,1.0,0.0009725478928823803,0.0008840670448065134,0.3894365546844256,8.157857723387527e-6,1.0,1.167858552380089e-10,0.00017251745967827165,1.0,8.412083344326328e-5,0.0009299223340598453,1.0,0.0030191532345028907,0.03179468961264873,0.5575117353224135,1.0,0.017694333555375856,1.3203878608596163e-5,1.2368579622537272e-19,1.0,0.5774654755058399,9.4819885084731e-17,1.0,0.007111337716950861,1.0,3.743752839558839e-7,3.864319864716433e-7,1.0,9.349683869849676e-5,1.0,1.5300622795142972e-11,1.0,5.351391790133509e-7,1.0,0.6496452473410628,0.04163300470123859,4.1191564394774025e-14,0.017373273692012952,9.587501978710492e-14,0.3663428492861558,1.0,1.0,0.1568300190617194,1.0,4.834943915020653e-7,1.261684076711604e-9,1.0,2.0407445078639955e-5,0.34023892257599747,0.0014992965773237884,1.0,0.00024195617956094824,0.19131047995079792,0.5809154675521557,1.0,1.0,0.21409695433240053,0.00012853776538840965,0.0006190923346084259,2.4621860184388247e-6,2.804796749117437e-10,2.0426977535270257e-6,0.003704032597905728,0.277892875120604,0.00033097613646919583,2.0585709845241372e-7,0.3997250503314915,0.02774023306432525,1.0,1.0,1.0,0.005256803026693862,1.0,0.2440143313084952,0.6924685703350439,5.58834963850331e-11,0.6635716307787751,4.3468221994277327e-10,0.000538688682292934,9.934161601431529e-18,4.897445993096161e-11,0.06279056696450365,0.005368602603434956,6.960254024083866e-12,0.07615596661030241,1.0,1.0,0.15291518568621495,7.267059060803722e-10,0.542963824177511,2.8692493490648305e-5,1.0,0.35982411294610944,1.0,2.8507066161577137e-11,0.67636270288877,4.7780408405995534e-14,0.23690998443772462,0.01199307768820407,1.0,1.0,1.0,0.03617722041143498,3.184935444505396e-6,0.5716146922623978,1.0,1.0,0.3191793714195996,0.015323051829639004,0.794046708325927,1.0,6.061245323348917e-22,2.2288353260097754e-9,1.0,3.0847577440487456e-6,7.159388505183089e-5,1.0,1.1476005838938956e-6,1.0,1.1502906017984426e-7,1.0,0.0001888733970440858,0.14429807289991986,0.5057801567070207,0.0005473376775406109,0.04152681721616625,1.0,1.0,2.946655796735756e-13,4.479654573046773e-8,0.015173881735265616,0.20698355872400848,0.017695564651528863,2.6350878127734166e-10,0.11406646908035369,1.0,1.0,1.0,1.0,1.0,3.194877267799237e-5,1.392345960294665e-8,1.0,3.5412192182985133e-25,1.0,0.0005460969944225901,0.18474255162907718,1.0,1.0,2.476277826935758e-6,1.0,1.0,1.6657436248254236e-28,0.013121121434781202,0.3861686695893373,0.06047591605255253,1.0,0.0672062335462017,0.008561501998887753,3.4752011529385416e-10,1.0,1.0,1.0,3.5060752796558213e-9,9.956217009879873e-6,0.5019927742614615,9.540415601513023e-12,1.0,1.0,1.0,1.0,6.551106354162784e-5,0.03259610564187342,3.4843553255056695e-13,0.0032770625392314983,1.0,0.024707416328640666,0.009264431819850531,2.931783071261882e-10,0.0002561531858022063,0.06291748012606492,0.003440069682340989,1.0,1.566531319177115e-7,0.00020016304585087635,1.0,2.598137745476505e-19,1.504875659297152e-12,2.6268543672282706e-11,0.06371530686530204,1.0,1.0,0.00031596949836418806,0.7501050315221314,1.0,1.1156436703584117e-7,1.0883339873289865e-7,1.0,2.7326438799931893e-6,1.0200165789681375e-5,1.0,5.4022327210711346e-14,7.04771320564474e-5,4.564689554924158e-13,1.0,0.4327897045431933,1.3549777450124691e-17,1.0,0.18884648410674532,1.0,0.9450516989283626,1.0,6.036385956344986e-7,1.0,0.18624623382888425,1.9327438418293302e-6,1.0,1.528888960625879e-11,2.8124900442278854e-13,1.0,0.2669079463099587,1.3620709964949466e-7,8.214213068520344e-5,1.0,1.0,0.6456734673977882,1.0,0.010626269369915502,6.3732378924606005e-12,0.0014928108321436602,3.7250942767240455e-19,1.0,1.5276703105967712e-6,5.909751533611973e-15,0.002748580512663658,9.909374334725823e-9,1.0,1.0,0.11148067595254135,1.0,1.0,0.23223226031021305,0.16275443129341527,1.0,1.0,0.05839915491001787,1.0,1.0,1.0,9.876982865545588e-7,0.0008458966053474432,0.0022831587147943587,1.0,0.0007867797485808648,1.0,3.775410247622951e-10,2.8049401656662904e-7,0.024143772118479154,0.37687116959955114,0.4760493464167365,0.0002324346435579545,1.0,0.007938679760275522,1.0,1.0,0.5122941399603237,0.21303493096985973,3.9713984155666336e-27,0.0026453920131473407,1.0,0.0022291741906527956,0.08718139559586983,1.0,1.0,6.753480003028046e-5,7.317387347105443e-10,0.025500424640809784,5.551850700448106e-5,1.0,0.015905033222295063,3.278199654999542e-11,1.0,3.5751393397772583e-10,0.16826284075125433,1.5811459472279336e-18,0.0003958795552638652,0.6869298474537466,1.0,7.837270948534204e-7,0.13972684915450043,1.1759291520555269e-15,1.0,1.0,1.1012727587387121e-5,1.0,1.0,0.0007301606956044521,1.7810973125212888e-15,1.0,3.276784805317537e-7,1.0,1.0,1.0076104267557956e-19,0.42417635477873755,1.448131556104654e-7,3.0131684272925166e-12,1.0,2.107231567647968e-10,4.560216093578323e-21,1.0,0.15635096346092017,2.370416420494237e-19,1.0,1.0,0.032315747740410725,3.158331582119342e-5,1.0,0.0022870405491118616,1.5061290789484e-5,0.0013528749048867454,1.0,1.2349747805197179e-14,0.00012349810241868545,1.0,1.0,2.442257619440581e-9,1.0,1.2278021182348363e-11,1.0,0.047694772628290964,1.0,1.636159857146488e-5,1.0,8.7996808323059e-11,2.025912704004999e-9,0.25628772989743437,1.0,9.233785107858473e-7,4.874508347167998e-22,0.6132774224358417,1.0,1.0,1.0,3.16516001001161e-7,1.0,1.0,0.8839162677407855,1.0,7.392974289154338e-6,1.0,0.041715800910774876,0.21368765659890637,0.47507842355013313,6.304736469419761e-13,1.0,4.645880238260082e-20,1.0,1.0,6.80005599190494e-14,1.0,0.30947099516191634,9.252935255955421e-9,7.428785193552766e-9,1.0,1.1959785220980173e-5,0.0001410046421390501,1.0,1.0,0.1579713956333991,7.039060125307797e-7,3.607388272426009e-8,1.0,0.0026181823378111685,0.0020452911349194574,0.37146673510563993,7.240162522628007e-6,0.032851874793359145,1.0,8.782682756236687e-5,2.2112105063277626e-12,0.0021047711936868227,1.0,1.0,6.697343261192396e-6,7.93812945901364e-5,0.0017053868638554062,1.0,1.0,1.0,1.0,1.386146154968731e-5,0.6063558884746285,0.37222036831184524,0.00014188623499687816,0.0014129216859556223,0.0007915970733991221,3.3774967308312465e-11,1.0,1.0,1.7056127977507621e-6,9.448436131849303e-7,1.0,0.21550490548967624,1.0,1.0,1.0,2.8291097997404823e-17,2.8758961071817942e-5,0.000561500803724481,1.0,9.537284425209293e-18,0.3401382096230978,0.22135553070162678,1.0,1.797713367667157e-6,0.30789833902020824,4.121868636152775e-31,1.0919142338406792e-9,1.0,0.8615587864978724,4.678752303137853e-6,1.0,3.709534938208069e-13,0.28921090177329156,3.2212716475589754e-6,0.15612999555033094,1.0,8.424028052094047e-10,0.003849630957170994,1.1688916509115884e-9,1.0,1.0,1.0,1.0,0.11299180958911227,1.0,0.0009838684633058324,1.0,1.0,2.971758376317113e-5,1.0,5.468770872038073e-11,0.0365261763764902,0.40916186686067557,1.384446641353596e-10,5.3884559672069714e-18,1.0,1.0,1.0,0.8740810750080953,1.0,1.0,1.0,1.0,2.818249806477671e-7,9.39701852430256e-38,0.05815897113287981,1.0,0.03042922051317258,1.0,4.14465839662086e-6,0.0072788698484099745,0.27304610317328076,0.001250737797729161,1.030990874510615e-10,0.00455794514042337,0.0009445408689864544,6.54824546550947e-15,0.003919226867964198,1.0,1.0,1.0,0.12611086151785195,1.0,0.8905680021895066,0.06369060780036873,1.4929471867894202e-5,9.492378451514082e-12,1.0809904300536122e-13,2.5407261731566323e-8,0.16862484983566003,1.0,1.0,1.0,8.820896190607055e-11,2.7050601419516534e-7,1.0,2.614317640655416e-12,0.06773424061508711,1.0,1.0,0.0010984516814931677,3.617498700701783e-11,3.2941038944600624e-6,0.00014852969112336335,9.376008822570647e-5,3.705479024135123e-7,0.6926442652774636,1.0,0.8216759760778412,1.0,1.0,1.0,1.0,0.03787230671405872,1.0,2.7128211769785873e-8,1.0,1.0,0.960935617322114,0.002132338946391573,0.00036163656829411254,0.09738577176171641,7.585354615535104e-33,0.1588106736011164,1.0,1.0,1.0,1.0,0.06477941525680875,2.5399369291292547e-6,0.0005202893913890169,1.0,1.0,0.00025777572661932023,8.048591709821824e-11,0.003903247536743627,1.24158366791901e-8,0.32533206806475057,0.14052224096588095,0.00022618828149472615,1.0,0.26343270536018565,1.0,0.017817551177298985,1.0,0.0017571335082528187,2.1422698066456277e-11,1.3941228093820264e-7,0.02634721284516259,1.5360920258032696e-9,1.0,0.9358462225848141,1.5425312983887886e-10,0.00013691047536764264,1.0,0.017354892059355774,1.0,0.00040414743940911976,1.0,1.0,0.31760953839032297,0.0024722535250867816,1.0,6.473312362773376e-5,1.0,1.0,4.5665503227545484e-17,8.294527896103968e-15,0.0002119975703067918,0.22044816317893434,1.0,0.4132979200006455,1.0,1.0,1.5101852017032986e-5,1.0,1.0,0.09508864700618813,1.5884767947448732e-19,0.44636122522595845,0.0014174062469265738,7.198791433362342e-13,1.0,0.05123589947652388,1.0,0.02614824842763776,2.8485909924984545e-15,8.349423280649997e-9,8.8542902071139e-8,0.00012503378262845654,1.0,0.011842979133269748,0.0002622800202301829,1.0,1.8108648468485771e-19,1.0,5.3814876570169574e-15,1.0,0.12826325877814085,0.11225241393672179,1.0,3.0102773374476767e-7,0.0640219633347848,1.0,1.0,0.06314475473269311,3.047245353946099e-5,0.03741957048249543,1.9652011593298255e-8,0.06882570417143118,1.0,1.0,0.011654371068236965,1.0,0.01654491005780822,0.07475606027069125,1.0,0.003876944006683305,5.774163442203712e-6,1.0,4.354591786243893e-7,1.0,1.0,9.692731062029825e-6,2.639792435782831e-8,2.9374494348530255e-10,1.0,1.0,2.230361299123231e-10,0.012388568697526251,0.32179108219789493,1.0,1.2583008937499688e-7,9.640711942008282e-5,4.8505901736929e-10,0.0015177758580895192,0.45032139288001694,0.38559205929944496,1.0,2.6463073016946632e-11,0.0005923200142666012,2.3980835573076475e-7,0.00011314766239358092,1.0,1.1820891924979329e-33,1.0,0.0010299502148288636,1.0,1.0,4.0681094464505036e-8,0.12814426845945778,0.6058900896142061,0.014543917785191048,2.3127453042556186e-11,1.0419297038038534e-9,0.0020615223856080074,0.060316379411200154,1.0,1.0,1.0,1.0,2.9999400358642186e-5,1.0,1.0,1.708451663946445e-12,1.5305165805407134e-5,3.1084033422307574e-5,8.963167726881297e-10,0.0021217976220931517,2.0722687757506645e-7,1.0,1.0,1.0,1.0,1.0,5.386854560297571e-9,2.0817770359828385e-5,1.0,1.0,1.0,3.928175901055062e-9,0.002031264806691687,0.004050965720822749,1.2668410175345137e-11,7.2399638312298465e-9,0.002832717379825174,0.1270891735685416,0.00025752677891103924,0.027118112374691656,0.0022502837127125596,1.0,0.7143792196565848,1.0,0.10594075012662064,1.248185633631798e-6,1.0,2.439824664427947e-11,9.136773331232614e-10,1.0,0.09268938247977572,0.965563408976102,1.0,1.0,1.0],"x":[8.79575568098699,5.179001571144257,0.6885196301989271,11.46015499966845,14.75766193432459,3.798246136542253,12.663957626100014,3.7028572864898424,12.099756329427104,13.132338930952892,5.433869838752274,12.955029883415305,8.084200101197354,5.066466458160805,7.198165648306998,1.463803741366707,3.542693658408206,5.591898142158439,11.696759634784396,1.3379062814411824,12.405694530283977,12.972962890638613,1.4457261632824625,2.7674885505875437,10.002293762904497,12.86274123701841,4.692098010058015,12.120677287079854,3.4199396163348252,0.22623756862032773,2.3266242572139118,11.073547354367637,9.35187828396231,1.777580758569789,7.067817091629824,13.109853360081171,9.105000951692805,2.3354342530657957,14.264817874566893,8.97310890780664,11.575895964530226,11.098335634722954,1.392229562342998,1.5542291089648552,8.50014570978913,10.624323684891,2.6288434036388852,0.3075804695421491,13.371024620058101,9.632353437018777,5.6193739379825995,5.746768098312823,13.696914046152061,0.8199291793735364,9.397783925790266,2.9025768853436054,13.232255891515132,10.59579443599203,11.721745860010035,9.467380202648691,8.72546897455248,4.492821675699195,11.637897309917054,2.2994089356519476,0.904703357134109,8.590157962026971,1.3076514132788608,0.8537271270939983,12.988688671074746,8.052586681708927,7.396296718056197,10.42642700328247,13.744276892265807,7.678501678875708,14.886447890940778,1.512766884752148,0.5217382090229894,13.215701196851619,14.22385861120887,7.077357924022653,10.2635594086353,11.83670037921717,13.429648737059162,3.1789394403266833,0.08291466546018644,8.364593929102991,14.547875910654607,13.939161529386237,4.615832035445257,9.51343226810297,3.455738934640442,2.0620558301120795,1.2190038861471597,12.616177051583033,3.937517131928825,8.976982263425802,10.309956453668667,6.137052769759379,1.3643450117724876,7.89231526047406,14.30956795077008,4.322398036737497,13.339304391309488,2.1817156288074524,2.188486165405795,1.6031692240989737,4.657119910296755,4.935858820629056,14.357349459466802,4.215238015000578,14.061606249192653,9.792849003615771,5.082059375409545,1.4579644962798721,11.768915443439669,9.807271115208863,4.492957359146876,4.310162453470311,12.433973542337899,11.258806442946893,8.467625278341647,7.8530358294928835,0.3463892592093709,5.615468430331525,5.8773573440065245,1.2207878484244983,10.798210712241529,14.251652037967165,1.1563230303948924,11.57946883127983,8.827780424912675,1.5272714014188238,3.310740941097192,2.145305882082913,11.568900323616125,12.991893426547584,2.461363019736167,4.344748966397116,4.856732842734664,14.722663998995477,3.119361376662284,3.2886431744371936,5.449920572959051,3.814785476968474,6.624114989431287,6.746589601368385,1.2255761264534992,11.100991505128091,11.983391677565827,4.166907819060536,4.277660995686564,13.120570146278407,13.516517064685232,11.831276835397988,12.781298823183443,10.985603068377392,4.443057822253945,14.093278189847684,6.624631855151107,10.425226227609853,10.633146451055438,5.6724482224163975,10.395109277682604,12.565100316384285,1.732505598634212,1.3097512057618044,13.371451943811344,14.375580629700618,13.326149843674987,3.567652494504967,3.9640267100583717,10.374600957699954,14.047241969479275,11.934948952832334,12.6855166738061,2.600786551901267,1.7340576424722076,3.8884559504769722,7.6150251202831845,8.643455210920628,14.342376945564471,2.310004407493982,11.92197698823906,2.9614212154033237,13.85289881721793,2.0523192659535985,5.751507423241961,1.234656951402412,11.97536377929189,12.454892562434264,2.983418826438722,8.177283756491185,8.244758795385739,8.917373972268317,13.894745426519552,6.131019760301227,8.44117074273615,1.7436907934527879,1.2800724817396958,5.364563679106533,1.0952882615471748,11.385249364474557,1.5355434140241864,4.242093821348343,11.276565975024841,3.3382656061919858,5.355105448946907,3.977269733047163,8.387070051210435,11.008428976491588,1.9675697090923983,7.373792218775335,11.806386187447423,12.672300067154184,8.143764714297854,10.020102476149912,8.127097237445046,5.308609467332746,9.675181681798895,1.8340285828747782,11.796964834019336,6.349423782755025,14.578912716719506,1.983279212987632,10.405163310899834,13.835728783902322,1.5712672510489512,11.810691117002243,8.673836643672319,13.344066433856055,12.890180472305042,13.711302407421549,4.152605962415128,5.367771565482936,8.501104527460637,4.257610676983808,7.941916211137823,8.830486031515504,5.097711077462137,14.675839672572708,5.282587184786815,2.194047988470972,3.6946354912314505,1.9270636168236466,6.301205722876983,11.288056102361649,5.628299006538385,2.3358934756627514,5.710138060528544,5.639285016264162,8.175758790058758,14.951923240570142,12.21604185459213,10.945530072114956,11.787527552784411,8.01985209535607,1.0451214733531078,0.6352859177450099,5.930341819209773,3.9406687449618394,5.610923478135193,5.417039149363148,1.4971712367455614,5.119017941100161,1.7228562667806568,6.43883652381275,14.711307819608331,2.817787529177973,6.729752803660331,5.855631705403051,3.6713781619257393,13.762112218425916,9.538139850050243,2.496044326790786,12.635360692119173,5.992876960503601,2.5750455244190142,8.248397661076595,10.641132854830897,7.801389358834277,14.894543322690183,3.9765002521323933,2.139097836557873,12.736566678606282,9.634357415772147,2.1990203590736512,10.495248902308735,14.103979038073142,3.93587720412694,4.097699088433071,14.202062282451983,10.227405487079263,1.215819884785253,4.296853491658138,2.8185461661626556,8.135271859035885,9.638752644103192,0.6212741227374574,14.195039699655931,10.133787524864804,0.5695914060988272,12.603197060093704,2.8505200366393035,11.111439961461501,7.138221716710611,7.419300582123411,1.2268199632969956,6.845300759548262,7.525920447114634,6.827809093036583,6.07944733098217,1.3974150603850843,0.4809506813869202,6.000362774732903,12.707621691326223,4.389421113817916,4.556442705066344,7.6602103215303705,11.966339759888374,13.266858056680114,8.60471547879914,4.150335765675043,5.924953469376792,0.9041520248678481,13.001961811959497,10.063871215948405,3.696933767084704,7.661964943701135,1.2682748483979678,14.028062313650933,1.451331796558768,6.057161190768518,11.71207022675452,3.310358234007836,5.403296371505382,2.3415126175391885,12.402497929382875,11.584208965623025,13.478493396879118,9.99635378142567,1.0258585319700364,1.3281267742508673,4.26916055687685,1.2860750757915218,2.451432422597992,12.691777039404208,14.144170338288065,9.904644100953021,6.856230714555958,5.339589775426015,0.06970198986306797,2.699209561059991,2.6455118929645915,13.551069400208549,5.586535922475462,11.950093887553564,6.749094893114712,4.864190601221793,13.850409022962083,10.655075111952673,7.0568274966121916,13.226532637033873,2.669481346233644,1.5086062345496443,6.845169151484905,2.907630117585999,7.089779814726821,2.314458481672972,6.748811450650203,10.024526277318786,1.4026385618465154,10.552393062165986,12.278291403057281,11.3013915545464,6.969703974972238,7.5754945645153295,8.382453203526337,9.884026146818227,9.663263762108429,11.043887095435812,2.2165385398640423,13.00824341183391,3.9854104475248384,5.455000730146379,1.9735516240263562,0.6080403159262837,5.851881435275486,0.25594006951437764,5.374050878207285,3.9464356552703106,14.702973797839714,7.71239751387898,12.402102370454973,1.4953379290418545,2.247940169915159,0.3657584299706429,6.114943654180109,13.378392605689974,11.890873699795542,4.848107433412525,3.7262372774950716,8.299432696622844,11.858132337953363,2.8046989998110474,8.32275844797573,11.391508702218934,10.442226984578651,3.934823855708297,9.047198850498733,11.632168613547563,14.632912314184615,6.619622412466514,14.9528200420337,7.474744209112112,5.011851132064821,9.376061265101589,4.759226461979631,0.7904010046746723,8.210130591312126,5.2895155271639815,11.008521018719318,13.07773926949588,9.946019574542397,3.095783640968728,7.067548389766435,9.989658410184411,7.569971479808481,7.569770617974719,9.272041801490237,7.435051899778898,1.5631508084497658,13.371544831108798,5.946635520915108,2.4704087502061234,1.719496084011567,1.4650346230291722,2.800661048324311,11.425666004852221,8.66332571773466,7.172795585402937,11.16270013232587,11.440944918821268,12.556497827952954,13.387064654794473,11.752780579955777,10.23693045051915,2.718709845482874,10.50364065910724,1.4814947988748162,11.540978519634912,9.936214153916659,0.8526528208664175,13.625829070395431,11.968230633191116,2.5408748030060546,12.838686511848767,12.390128838748687,3.231525006794959,4.949487460714394,8.808752176913902,2.9781794980817935,8.991792128317769,10.987583750389316,8.971747427239835,1.4477701197049642,14.49406965274709,6.717638693806622,5.9661065353351495,3.516666592021923,10.612741997511181,14.518131767431383,2.3402827849667354,13.228796434621964,7.100210531159902,7.843139422948538,8.33704968055429,2.706261196058387,5.876625659780757,0.9112095728727887,10.936266736184924,9.720622933426803,6.345447962771455,3.313797106761095,1.533684877202025,1.6047456526496684,9.19402852566174,5.551116125861718,8.549208157232286,5.138335139388705,8.395481042806857,10.25940056856888,0.3437401391306594,1.4511379772292154,1.332977768291036,4.17195645335493,7.055179127725132,12.494225435086145,10.586540515369945,4.848839508722951,4.003457029706409,6.933717946153241,0.3988549114739559,11.604147954268289,1.0640234044982655,4.597054654856894,10.653450382833677,0.7058099617474578,9.511607794699511,2.7319900454989687,9.241215682517813,9.079475692956612,4.185806331747277,12.464598155361708,13.514340164934811,12.319751018631397,12.273139595288022,5.280869961038635,7.5614411170518725,2.7116349455144673,4.983818724877814,5.562092367707706,13.764507091292387,3.098095435001047,1.606205719721041,8.004528568058504,11.724505587248395,10.852593770785017,5.8886672152968735,4.5516762390100745,14.963825524084871,13.239590218881013,11.51990232179248,12.14336248489538,1.4854239935990965,3.7328068247002086,2.1197633696680906,10.370825483765703,0.5209780535891939,2.4025142890159987,6.988045330297089,2.656188456376162,10.426773056711925,13.827213289432212,8.590980056137372,13.827892718204485,14.138795900661941,9.208881458477688,8.373890699144205,8.622390884520062,10.28121479042885,8.989702296073954,3.5095758490096465,10.669762208135815,12.79000957564971,2.407711958861097,6.643579507962128,0.37653571230554794,1.482912076722408,0.5264778557742356,8.926163131327739,6.180139595786333,7.071423850416948,11.796052984431062,4.62383500062109,12.488723634752766,4.328624532677883,14.134823365922838,4.651301586801219,9.30703419665446,7.251309921109973,10.92408711039073,13.895996624492579,0.12483400623262808,11.502198054436438,11.572191782551265,9.640464162762676,7.27940674102685,13.854604556954747,5.7434245126682715,0.5832802337526022,1.579319388405932,12.962963421643801,7.474682627486892,10.500821868536956,10.228283431041906,3.5602178905348723,10.397227817348792,3.2349454606623143,14.08710041014228,0.5678004166226558,9.817754135433365,12.86365534545735,1.5456848229437092,3.162572392345633,3.0918153918619162,9.417126878077593,9.857273258181227,7.76850920384592,7.7259294251884105,8.853947035888277,14.875525231583852,7.33118202461391,3.6526269282277957,11.72436146663181,7.671174186667921,13.842192844599577,9.55270307028471,0.7137654261961468,7.300663259262934,8.917702610602483,2.620673288101619,9.319938365624399,7.643273796069537,3.1909642839329413,7.59438771696078,1.7299706828111394,4.014106606038082,7.021771500564067,7.335294053716251,10.644852005811762,0.30000386460465656,6.676003749334037,10.871693855800533,0.956647184097621,7.940188029987638,7.781224559812115,4.6707276102489175,4.812267567915537,14.981609974370905,13.441819014532243,11.769628658131827,8.421656214616227,4.940199740524623,7.609429039225482,10.358118475025671,13.801611766509517,2.188183282816749,13.063768329365397,1.4904437759670164,0.1328213158043856,6.214393754106232,13.766476265635662,1.8709588990559123,0.6214085529603575,11.137684182387154,7.30060384674669,12.327044023341857,9.558068152907527,2.5258543148050236,9.767803827192289,4.330020112191725,13.417386770429065,6.970767053751064,0.3676147980080191,11.171450538716392,12.761596441061124,11.942458008935429,8.517362189590255,3.2650347931321755,10.733807962777023,2.262798541539267,10.68853518329001,9.181173246718755,4.575294080059163,10.403120155497755,4.545093819248156,2.5807112722716,4.977122311558223,10.28619076107596,0.6642642632159068,7.414020680048953,11.430043176900751,13.30758552994455,9.745127461440324,4.658452324164171,3.8965571037148603,6.988754371322315,8.32733647147252,5.215962998387191,11.203279716903255,7.325596649368505,5.837284388170833,5.965721894451126,6.489295439279016,6.236269523306769,5.521445010621518,14.138124707546991,11.210178001977155,5.294807258537349,3.9257093784928543,2.0838104921717804,8.183524766764197,14.035378300174402,7.254319898742089,6.468285040290917,2.239993694819212,10.457536893118109,1.2692289803082413,3.905319569951927,4.804458675664794,7.772204486831607,6.529299489610418,14.117698366963676,2.300507617765788,11.40295611816609,2.5794158411489674,11.382992723189627,4.323225998970768,14.402699280038258,11.778361391079224,7.224797804879054,0.784866937159161,4.2511567625824735,1.6337100256001713,5.982196197766061,6.085453557098638,4.127989365158534,10.001056295009032,3.6311534105271615,1.0370615240889491,12.26201665864581,0.3910101724672055,1.478938557467152,8.967177921868604,13.175428230908544,7.801832411775526,8.884556707540064,0.08926273130551832,10.0979084447902,1.7476134183486502,12.28371374456569,12.860900068176855,0.5544818805350238,4.632249006428456,8.83253671867601,6.370424051980841,1.4241044943641012,13.180097456267992,8.523754739033015,5.6234253369026685,7.043698188968637,8.077378609579997,4.86854676648722,11.353685350768039,2.6174528934848293,8.535944305782401,1.7624461891217291,11.050009184585065,14.774733899521292,1.0922893541478318,1.0617485907216673,9.718256836756531,9.638684650727463,14.302790966419156,14.001786430481483,6.20579271287257,7.173693658583802,10.890923815922763,6.309521571134093,2.962884539267445,2.323616670142111,12.463974352204723,8.572217762215365,13.427751315319824,13.256526129004696,5.622296722772613,7.28182531398547,14.285066121615934,8.173288432873164,1.1898396573391534,12.403295201035508,7.60297631958522,5.946831999582357,0.3574938403134964,11.17966133195835,13.839057792568928,9.639208517873216,12.26933526383571,12.131264002192227,10.894271643084906,10.554629694180155,7.945668852541953,2.154637827603713,4.7500550402274255,12.785262125738523,9.863855194397361,7.516281452864339,14.013706402971593,11.95494136224479,3.554113410938519,2.828071756372875,7.445000688546989,5.585449103126955,11.943476712530314,14.625707043331547,9.832395855567645,13.881568798024551,3.354997577259995,4.335293860288678,1.4152914035509134,3.4033052495393434,11.313333224938578,14.298883201160313,13.169614042087765,6.640255107630402,13.0760002739146,14.627645107115745,6.464501819137352,7.161253104372058,12.6692770557412,11.324325583064258,2.0615049653175497,5.726173443280124,7.1579196028661904,13.475437505484383,8.710624893968674,8.64566647777684,8.540892704013652,2.3264076993134264,4.241172052889654,3.2490869142181147,13.727370463805563,11.146306439677861,10.55066508847159,7.6072655121937425,11.962065822116113,4.608465822808691,8.872292064494408,13.892101400693484,4.471350289758553,0.16246241692100316,14.824161560888037,0.7131637545139435,5.923265144723021,5.452676590645292,7.4832267297131665,12.301780825606393,14.891680181988775,13.521704811704993,5.233517389037077,5.339000363058911,14.042486452789499,4.118195882228144,4.383955772247266,12.756335439535553,4.445523017972085,10.418196384206782,9.420430332784255,2.355148026948296,0.3179896211454658,13.087265129939507,2.942854158729802,13.969291278373392,1.4092284291742874,6.642634245641688,12.457636101756062,8.596474732183147,6.012279762928364,10.488413713281714,7.171403406241854,11.2136343926369,6.533162985483849,0.34711665062359565,6.742418798128563,7.870411476999353,6.412426973431734,6.743493227797794,9.038640560844104,9.921631419775725,9.47421826330457,4.118069558698694,7.301615769520522,8.797447327373536,10.086060841303011,8.642752096065253,5.410258777478552,10.542012142050886,1.8018885735800971,9.538879445978083,14.772803912856586,14.574527014033936,12.298189807154179,2.3868121478261273,0.6376268007131025,1.6633279870335393,6.939473713846028,6.300310781459989,4.191971071798047,6.315129339461105,4.05582535103842,1.1036424351472118,13.556148564660619,6.312105771806268,3.507723572642992,5.2922229878259275,12.6498435968921,13.669045415680669,1.9312261422304189,7.333402707499273,7.5747795818707795,7.911770816815271,0.8561378998514602,2.2356174989075206,12.129867558608566,7.761000579645346,7.523454798305877,8.673097916654529,3.316823433286654,7.200299166059435,13.2190234851872,13.09045307923102,8.115523026439298,9.259818517347224,9.23536535149468,9.219139718329064,14.007620748161525,4.040490442963742,11.038233641819941,14.696250718625269,6.777370192253435,7.502519172144871,0.7102040088778994,14.553697060055017,6.368770015467603,3.654716785258265,5.170629792814653,3.7436251510977794,14.068033896412013,3.4399070498051367,9.81680378857997,5.669226977488027,8.229312793374632,12.658688774808729,9.257590070257839,12.989477325977273,0.4717705903431302,7.198464545761851,5.066316641797267,3.1788137785448067,9.978119550132531,0.057222371393249594,6.607594788764679,4.514274117528902,8.309873108059936,14.663935305497308,4.003898318050652,11.016138742539196,12.461493445672925,0.17308441237911754,1.0664599984753431,3.67214071190455,7.444194742284472,12.818052540710456,10.970131891453986,11.401935989840068,12.126821863547399,8.868658659338736,7.394889279499987,8.037600346486432,11.253446782144444,1.5351990003561844,7.296797294009813,4.41477581401498,3.2342839136576638,5.942931051387452,0.281607611624084,4.12856379130498,8.145214212169368,3.3300398413976673,9.255135652120783,11.746868926913926,5.795919887630577,4.640250370326143,10.531363200886336,12.773221547098085,8.96875433544263,3.8700557978866845,10.016571383824111,4.537158030680728,2.635043169145704,0.10983823563052164,2.42560993819101,9.484159713015737,10.055841195843337,10.413528164724008,4.706578297996508,6.594711048241326,12.29148131788962,3.042891180639052,7.973547611684673,2.521884285609169,12.429612133101317,4.725899453528363,4.87078196653162,9.476536424866799,6.5674072634089695,14.831438453186257,8.907837367151114,3.398620473596118,5.624255968558409],"p":[0.7816600374474588,0.848527853899397,0.9794397677775598,0.9047275026757637,0.9534327776949831,0.9970884800612829,0.9277489968079723,0.8589346392562884,0.8172079646042585,0.8965959979587075,0.9613268054779975,0.8313629854142603,0.8832871289280315,0.7939349357609191,0.9732795345074655,0.9603992964980714,0.9567862208864486,0.9920387567804967,0.837455467984554,0.9621120205921769,0.9314104807585938,0.9890949954457737,0.8547592236825616,0.9781308010792089,0.7569699047399532,0.988323489438343,0.8509660550577711,0.9166558597999246,0.8888897063856677,0.9531670453288499,0.9488039808666752,0.8777528829387888,0.8211609659768448,0.9371265940673839,0.9779015260404593,0.8983583542878113,0.8274259071560972,0.7827810982370533,0.870645072447578,0.7938327959377024,0.7563448275802854,0.7533767793231703,0.8187753741083046,0.9036014020938536,0.9488567997189115,0.7709594253616667,0.8169840483449413,0.7529934921145824,0.9001834011016676,0.8260878588552025,0.9096041145518466,0.9058009658163535,0.8319358508200964,0.9919561603501267,0.9935924065933892,0.7549053460340089,0.9350009705940135,0.7538432752466411,0.8224975684706514,0.8262773388424306,0.9920145908920455,0.8513298486514598,0.9600031646633866,0.8821174242376411,0.8334854910855888,0.8493451104557922,0.8674412740339617,0.8429784730174965,0.8888946450526617,0.836780803293965,0.8774488947311081,0.9343069799535155,0.9637652963133223,0.9050681447685665,0.9824627863607722,0.7753730007551611,0.8862760570156749,0.9968497709127201,0.8062301834456409,0.8995774965343779,0.9409281747247229,0.8627439423758214,0.9693057794152471,0.9450651597643439,0.8764987670001774,0.8959737026378698,0.8700589511318209,0.7678363300006599,0.9667653884380194,0.9154462715993621,0.7831282532518062,0.9813736569213438,0.9520155996879033,0.7874743839791317,0.8660979323410969,0.9475314268260981,0.8775009363441878,0.8943655667671443,0.7900993292135106,0.9653809920023713,0.9451463422006373,0.8786215467758951,0.9458149563131714,0.8042216674892806,0.8046157837299168,0.8937619273687519,0.9915173332609,0.9356991060978712,0.959777138988303,0.9316971191016102,0.8695545400014764,0.7950868827677057,0.7935870159950633,0.864418558740488,0.9882546242241053,0.8084826289074719,0.9834604932601614,0.7847683822654725,0.8390689081578899,0.8078638768567716,0.7923124990535224,0.8359826917460158,0.8101004459103343,0.8651607530569765,0.8346521729663543,0.8571511436431409,0.888521609933973,0.919572679213283,0.9182150752407634,0.849432296813206,0.9961059222653081,0.7640071613906592,0.8323053586369993,0.952563305825221,0.7992929859065447,0.8036731315519849,0.9674176490611917,0.9739143392729388,0.9951623112869936,0.9809750135158668,0.7598604786846158,0.8947005394779238,0.7690101020112958,0.9262047034245371,0.9764012468881362,0.8193627676423259,0.8304722242686972,0.9088140956248494,0.7853931485401995,0.8097367635626673,0.990305141370999,0.8269573712608154,0.9555284748470665,0.8647703299536691,0.8281316318283805,0.9760462788017925,0.928248694576723,0.8481719069235043,0.8357917728058794,0.8180530673287592,0.855831409454614,0.9869507165265231,0.998362460443655,0.9056993815280346,0.9926707982608751,0.9904955650503332,0.947970106606165,0.967982284435627,0.9658202603444765,0.9351514374549894,0.7773997995820816,0.9042414057274535,0.7811091244044904,0.8646816710067904,0.8359999347283853,0.9706559361833026,0.7918699535324434,0.8971174303475228,0.8285090003380093,0.8245424089362612,0.9166313772894633,0.8978327685233154,0.7713221220168345,0.8362505042899692,0.8196014381077867,0.8794990981352161,0.7507623913872252,0.9483461512526867,0.832728736345203,0.8157044774442206,0.9189562100689039,0.908152112315861,0.8944368960713082,0.8930495287260496,0.7781938980864471,0.8357978929067102,0.9818010005145661,0.8614804995698151,0.762617373556244,0.7704174316133984,0.8452067886113268,0.8133471905686289,0.8986095950815969,0.8011041426553118,0.8920612272840925,0.9850681529614813,0.9669208662365619,0.8140594483468742,0.9707245727674896,0.7597643011837413,0.8572115164798518,0.9093714488415943,0.9704166745617967,0.8677498321723853,0.8388749577620961,0.9048908062239941,0.776772890009272,0.9110239246336358,0.8804334720946848,0.820952793147522,0.9834690244397563,0.8316840994507889,0.8526605749009049,0.9989912846664191,0.8136689791177538,0.8670516388484396,0.9944467687483188,0.8477476509095241,0.8741190081999147,0.7768459781079338,0.9955473486553138,0.8449565199206526,0.8598280412440513,0.8324918151245175,0.859877921604693,0.8729062000482721,0.8559784527495607,0.875038673631356,0.8686146676769337,0.9303495567410476,0.7564671058865136,0.9625718575199236,0.8311267377868343,0.7559643871330952,0.8970146020891574,0.7896580630653529,0.8874311336344797,0.839764453062841,0.7896816318338755,0.7861201406576257,0.9554739664306403,0.8324478116417977,0.8180815363134192,0.9735370455627612,0.914988599007765,0.7988907394088429,0.860310097782925,0.916406940362581,0.7611447332332714,0.8153095433132251,0.9005847515616432,0.8414122937848127,0.9615344906180732,0.8978882988463999,0.7892233780090211,0.8399900814816658,0.7707180191956361,0.8439969949661916,0.8129312531402209,0.8055623377658876,0.8591908928352235,0.7528538701839267,0.9244275745774347,0.8214892458810744,0.8145971300346925,0.9507927780369629,0.9356845098785143,0.9501818591579715,0.9785587043481984,0.8307287623126687,0.8899103690051517,0.8581509387062294,0.7864498511027702,0.8374655417802382,0.8381419746547124,0.9982897404093367,0.9257086735055462,0.9781962500404827,0.7648985145835344,0.9344747716308324,0.9528647111381983,0.7637945821674184,0.8964108637585201,0.8763802985804465,0.7935329071790662,0.8904521299499015,0.8821229974371829,0.878796025746008,0.8957840696541044,0.7634009982945711,0.8543809530295863,0.7837679914972053,0.7894329658118899,0.9435087210996201,0.905843309491874,0.841143062773261,0.9365633186923641,0.7679203813504609,0.7779362627144281,0.8634706928121765,0.816915552520812,0.9194804882595695,0.9443313078720206,0.7843851118541465,0.9387857351872044,0.9364030408215205,0.8996322120958171,0.8418656561623685,0.9161771175524656,0.8789270343149194,0.7930323674584756,0.7554360535549542,0.7697557349373406,0.9109624248634076,0.8293094973651252,0.9246715013230025,0.9720696639101066,0.8769661378211269,0.7970048534611021,0.854868596368797,0.8787805523932881,0.881962859793435,0.9195735277145424,0.9274319673293845,0.9731082571764158,0.9291922256784644,0.8571385743903357,0.9893801317233523,0.996971280858431,0.8092916272546948,0.8770498541793326,0.8454187358609175,0.8055781627359386,0.9181403081906537,0.8589174908378647,0.7795611931209274,0.9743682368930129,0.7880564808684369,0.7543712252441964,0.9105351637912471,0.8711468434035659,0.7774761330057285,0.9023327510428888,0.8263551563054463,0.9688875209785623,0.8162110207103181,0.8562613731571581,0.7761871698491394,0.7678881830367763,0.8174540469809678,0.9863101256014455,0.9421608785934195,0.9063606646727123,0.9455580714605858,0.8159291512839508,0.8686486380389417,0.8919909771112045,0.9253781438910458,0.8704912489043275,0.9353772910128069,0.9439847684217911,0.7721988066581291,0.8052355645185975,0.9767034124243121,0.8312434528261589,0.8030318755102179,0.8088242218739032,0.9987854198971946,0.7549729054042793,0.8248017005161616,0.8658954408253018,0.7957710662369311,0.8250642100527115,0.7910849922530583,0.9495339250614899,0.9068898630237775,0.8784456120916508,0.9267292513793195,0.9157952010905117,0.8197270662898453,0.975389796660565,0.7737191790585403,0.8673473241161904,0.8585240260639684,0.7702827857841444,0.8250308903122812,0.8643491958306937,0.9165483490885367,0.8549969972602924,0.8821527756035323,0.7542488234021676,0.9933351746190942,0.78866962487316,0.8181479955486751,0.9450825602745792,0.9957623995092781,0.9637953304896063,0.7951902406857387,0.9380176313879695,0.8575134151485329,0.7618770865891089,0.8091398001107888,0.8831276705972859,0.9782953336123357,0.7684721322198038,0.9802207028133891,0.9938762298783537,0.7590063662125199,0.9690470929053401,0.8652692140298747,0.9843340027979244,0.8682210026636672,0.9458908889604133,0.9813201277934263,0.9372458048535952,0.9453220764736483,0.9713596844796988,0.8077982600239327,0.7816303386203642,0.8523083754851271,0.7674583494618694,0.8322274269817811,0.9478333107826259,0.9231629123206581,0.8803651403099053,0.8371176329922508,0.7832857486275292,0.86821046015864,0.9498205850844457,0.8229950648649427,0.9153353272728186,0.8476199697694127,0.8531298514127099,0.8435538286616536,0.954439947497621,0.9576534205976146,0.934256616564404,0.9025978662031386,0.980492426180936,0.8490866544289928,0.8243387794284281,0.8152574483709228,0.8055018338386664,0.9990667101900998,0.7833277051629812,0.8399976178852012,0.763000338487916,0.9990523750195683,0.817946731459791,0.7989252315440438,0.7967125294308925,0.7920663402998234,0.7744744975749862,0.825468552322214,0.8238342299276333,0.9559385316318046,0.9518034780439547,0.8222956020805259,0.7995939209523784,0.9655329433731032,0.8969279724459288,0.9737968962615041,0.7994829271048323,0.8140914966243735,0.8748998699332922,0.8507531558162368,0.8805622694875443,0.9057810768518255,0.8899216969545208,0.8192943560429158,0.8649346052133744,0.7895811109679871,0.8051940689120043,0.804994804856604,0.9138741670046241,0.7985673362742505,0.7679377779077712,0.9803269133874113,0.8020167723232418,0.882016544373677,0.7694956433359286,0.9072142608453796,0.8108011865113303,0.9122323135699326,0.8584597504765248,0.759321305110068,0.9588803439780699,0.9137789641413859,0.7577945933439422,0.8376183591431386,0.876662109551991,0.8987834006978717,0.9035648313963938,0.9455851885434693,0.8039194993787779,0.7627784469917077,0.9872751307961787,0.9054984814163981,0.8587315873450155,0.7968616555445903,0.9448751134925861,0.9474073307195661,0.9422950020016347,0.7913185151665305,0.7708201676822435,0.7999694560145241,0.7970649742005065,0.9580559909410841,0.8906029864708749,0.866155039192878,0.8718575934863289,0.896502354058389,0.8753672531400589,0.8444280218668944,0.99035015152197,0.8231617326963734,0.9489435323366282,0.9472651617701986,0.9576610505109022,0.8805463921446715,0.8006706508361596,0.7945384593144066,0.8616292637173083,0.9399191517925016,0.956478457644113,0.957190025855764,0.8264654262706445,0.8926822382294974,0.9750428080649528,0.989889609350359,0.9370341103257925,0.7991743192891886,0.8703392783278177,0.9869526551165223,0.787200526419306,0.837892917869314,0.8594240986488795,0.8701670501362018,0.7794084000735712,0.9396710189420809,0.8709181431733943,0.8168166372715762,0.780645428078894,0.8165695896929499,0.8293368576170476,0.7980479969109402,0.8683223600098285,0.9122591855360218,0.7605743723645075,0.9215431862382034,0.9522586326669694,0.9869233855813564,0.8281876639775774,0.786873610884103,0.7813670869857503,0.7606452483841399,0.9014934250815868,0.7912869111635652,0.9682526730067652,0.8924197617089547,0.936808289269855,0.8582422406140309,0.9720104011591872,0.9106338933931976,0.8875454177266972,0.9001767928966229,0.78960309272952,0.8538637865096005,0.7555282447431673,0.7981999499051349,0.7716040013323463,0.8963401904688193,0.9399765330211016,0.87402529431572,0.7722045823635537,0.9838618357452702,0.9347972249798613,0.9502579318590523,0.9156602250437216,0.9572742051660972,0.9508227190201359,0.9145410521898544,0.9155739342680489,0.9531687269142761,0.7695692456795772,0.9961340513111676,0.9005161514727065,0.7872477376644593,0.8266299574516505,0.8696248579882522,0.9027210593802055,0.8750290748710254,0.9326616629119886,0.7782778331068487,0.8744284521258519,0.8607629905256405,0.9631372285742014,0.9812489062654495,0.7665751931717706,0.9082866114762277,0.8417992067200711,0.7814974050746195,0.9469408068218982,0.9777823446065794,0.8451554543087616,0.9185036943524396,0.9592771687519301,0.9817468607267642,0.7567703932395528,0.8737279718899106,0.7724559996182301,0.8419054596945461,0.8803111347523453,0.7504067855825771,0.8023080133991212,0.9851299069608157,0.9418583654174878,0.7769820304259305,0.9424223203328579,0.9291493517109852,0.9863662193758345,0.9862706284334156,0.9184389634471769,0.8652968552388495,0.8601185304530876,0.7716923219030134,0.8715573091750493,0.8940504174536503,0.8202371509920889,0.891839429390996,0.8773612254895073,0.9553028177275544,0.7695048533308015,0.953441854184305,0.7830789721790881,0.9462794201443567,0.8500775231086769,0.9293467580332803,0.7706256400866678,0.8687590679034011,0.9283414172387466,0.7744516961597401,0.9680909585416798,0.8604264260400143,0.9193533220005596,0.9148210571792452,0.7569932567948892,0.8446923705706684,0.9414078424329861,0.9516246892444921,0.9771541215895971,0.8919541288170063,0.8340916966978189,0.9666694631952731,0.928601806447485,0.9286164763934722,0.871911334624274,0.8832120320410011,0.790930623516638,0.8487760549867862,0.8025411296401199,0.9389330494054774,0.896044377047631,0.8333746397462372,0.8258419205948586,0.9160311778497825,0.8762394387375232,0.9187075124369517,0.8572335765262067,0.8452895956506226,0.9580517246835483,0.7999116840609166,0.8827165824519609,0.8222877032927572,0.9963311720747576,0.7507645998808947,0.8258967343124308,0.9752465245841793,0.7827355248654615,0.82727380424029,0.9429056936259986,0.9013071436264086,0.9475577879648491,0.9821877960400316,0.8290069803484439,0.7750562434926729,0.7692556739871059,0.7923254581850533,0.8850768248208103,0.8494106234212271,0.9027652710740541,0.9627192320007041,0.9983448452749073,0.9971322984376871,0.9764071413029205,0.802269210343886,0.9095554219149702,0.9526163835718363,0.9492377435973046,0.9572968751005859,0.865615798819809,0.8936915868683681,0.8383664688942687,0.7851642490808024,0.9393706291764407,0.9710533005673584,0.8018318153181223,0.8243342152291695,0.763192804705255,0.7858409308760954,0.7813300032483794,0.9748351452062549,0.9961528483554778,0.8823520406585706,0.7865997777672542,0.8818137827177062,0.9862296663740489,0.7783061446092903,0.7574369206963927,0.7726372248711072,0.8273450194287417,0.7747898060048652,0.9266010283102848,0.8622403626918891,0.9760609685741795,0.8452698234863536,0.8663624832620583,0.797006619091899,0.8530255450950412,0.9153785854845765,0.9790179818326492,0.798121380883148,0.8921415890341257,0.9668833231914609,0.8958072301033035,0.8518460544963247,0.8660693865751783,0.8452948152732551,0.820470616416981,0.9374436501855392,0.9852227185122084,0.8481078348350115,0.9070493677930281,0.9015089306457386,0.8709757575251951,0.9018380271445198,0.8609431369683198,0.8499559106930887,0.9384590357005127,0.7977649375629059,0.9934438766227935,0.7765591743640076,0.7764918230658309,0.868564651546436,0.894152840194315,0.8372370041872146,0.9235376038017572,0.8133874412419119,0.7921269601009058,0.798331276171425,0.8561543006582633,0.9562339490564177,0.9885266997680685,0.9960807731320358,0.7970096955366059,0.8387163454446586,0.8987363162534954,0.8385173594388109,0.805614268480549,0.8178044781634788,0.9271537940941703,0.9949636048123474,0.8648661674607651,0.9437621261448346,0.9892666883077408,0.7831632285330765,0.9541354959948141,0.7756580175329872,0.8998250216070203,0.9273412555486058,0.9040502975720248,0.8044807613082252,0.9216488906589834,0.7877945622200165,0.777019461010277,0.8708005230380262,0.9869388047553368,0.8845335407486754,0.8245170070152024,0.8291639887872282,0.893151633249305,0.9461550737532141,0.7504882667202439,0.8886440206051678,0.7816817622436971,0.9109768837456799,0.7897820943962627,0.8408887354989855,0.9835047989678143,0.8851077017029497,0.9210760209963287,0.8114926240234382,0.9733518959837999,0.7961553194491467,0.7932551971173875,0.9223786599924613,0.8975304794868739,0.7584412569929888,0.9947915011251327,0.9660036128607621,0.928820091687711,0.8626298688384904,0.8555888011689152,0.8205953627235651,0.991663337071778,0.9619382510640433,0.8030741709234808,0.8360404570049377,0.99513780029436,0.7888337017161782,0.9792212229702917,0.9195669131388184,0.8677021190894749,0.9365155898488153,0.8303339663652816,0.8433002588555514,0.9687998700941738,0.8538747728087006,0.9100805985559858,0.7820341697881006,0.85389954605991,0.951516096886905,0.8690460353331948,0.8490961879136444,0.8954684627959948,0.993406390962172,0.758731406360482,0.7598401243297287,0.7994562879633866,0.7729754728838574,0.8879973649919671,0.798724735429654,0.9884638878724374,0.849578120195629,0.9704196991603614,0.7921522391868434,0.819645622800464,0.7672979543899283,0.8476731812997162,0.7725539417350711,0.9918884504227217,0.8141458673587182,0.9047808576330021,0.9700127792714021,0.7938161982010163,0.7515789850302037,0.9731448022789593,0.8737359563856844,0.9717256136580488,0.914343986761077,0.8782812852757635,0.9700775369050327,0.7603480052363373,0.8713129186650155,0.9897399991798654,0.7915681657437708,0.8641506554774689,0.9368517457000793,0.8635399219488114,0.8893557002537276,0.9357202603982815,0.8356659028412949,0.8822301767292816,0.7608948337274524,0.7613964022231517,0.9883808638296989,0.9464897473197129,0.924739712101833,0.7986659364461346,0.9445698769228883,0.9114668646005162,0.8423731006592854,0.9710893981911766,0.7500706295871966,0.836881898897327,0.8814723178229421,0.9608140726243724,0.7641655880714451,0.7629484776538726,0.999427223141431,0.9600845233096029,0.9368552452673069,0.7555224052487295,0.9970706333631,0.9184362334131861,0.8504346398203084,0.7565221016031398,0.8630825070533603,0.9125951386805223,0.9508654938555704,0.8851246067078258,0.8152827103005158,0.9661181786737578,0.9468265685915105,0.9145280678653442,0.9759050475701878,0.8786253322647897,0.9892415000150765,0.8268681614057969,0.8842145734959239,0.9160950130525765,0.791483348165863,0.9288468721887413,0.8741576557810575,0.868022062427056,0.7561212764122445,0.77155792030359,0.9712565243198212,0.7670582633852963,0.8567545899026757,0.9460827714870015,0.9941002752826447,0.8374185181428369,0.8804081704612025,0.7971941238057196,0.933205945230994,0.9613373766170183,0.8973236845737464,0.785077799955907,0.8104000621684417,0.9955532117831255,0.8157331334733198,0.8197587924625354,0.8547976318236526,0.7985715773037223,0.9052625531296277,0.988637437596062,0.8593189101058545,0.8794018334086664,0.8165577360648371,0.8148388885267125,0.7908241582113037,0.8364911900997654,0.824407722267662,0.774571462423972,0.7729520506152594,0.7868131166499575,0.8094412296708668,0.7696828723963317,0.821744508340986,0.8094462949361414,0.910141301478406,0.7546614565404131,0.8913565991050423,0.7839079918216767,0.7531664499823822,0.9685121725576716,0.9965846116567618,0.7675055110235087,0.9283675541815928,0.9222483546613278,0.9741929407042085,0.7635495162834891,0.9795435829457201,0.9057053758792601,0.9225806056814359,0.8566820163847093,0.9348103806026038,0.774820916567073,0.8796347159873567,0.9312765110667847,0.8765312495976909,0.8012867566760542,0.938293242622313,0.8792879588935223,0.8776693394627106,0.8021745466042711,0.7671478697016879,0.8901205152528446,0.8274187770563932,0.9636797637274739,0.9489760052791538,0.8834103621581721,0.850143584829206,0.92174084954884,0.8745489763827131,0.7988550964268553,0.9723966353530562,0.9333456680882728,0.9840542184187112],"n":[15.0,1.0,6.0,5.0,16.0,5.0,9.0,11.0,2.0,18.0,15.0,17.0,16.0,9.0,13.0,1.0,5.0,15.0,2.0,9.0,4.0,1.0,6.0,3.0,11.0,8.0,3.0,18.0,12.0,14.0,11.0,2.0,3.0,7.0,6.0,12.0,19.0,1.0,8.0,10.0,12.0,16.0,19.0,11.0,7.0,19.0,1.0,12.0,1.0,14.0,3.0,17.0,5.0,13.0,16.0,2.0,7.0,4.0,17.0,11.0,8.0,2.0,17.0,11.0,4.0,6.0,11.0,6.0,4.0,0.0,1.0,6.0,17.0,1.0,8.0,5.0,15.0,15.0,17.0,13.0,19.0,5.0,16.0,5.0,4.0,11.0,17.0,8.0,7.0,8.0,7.0,17.0,16.0,19.0,9.0,3.0,12.0,11.0,12.0,7.0,8.0,18.0,16.0,11.0,0.0,5.0,12.0,2.0,16.0,1.0,15.0,19.0,4.0,11.0,0.0,14.0,4.0,6.0,6.0,19.0,16.0,18.0,18.0,2.0,18.0,17.0,6.0,10.0,7.0,16.0,3.0,13.0,18.0,2.0,16.0,17.0,11.0,12.0,9.0,0.0,7.0,16.0,13.0,0.0,12.0,16.0,7.0,17.0,4.0,1.0,2.0,16.0,18.0,14.0,19.0,6.0,16.0,15.0,5.0,14.0,11.0,4.0,12.0,10.0,5.0,20.0,16.0,4.0,9.0,1.0,3.0,2.0,6.0,13.0,9.0,7.0,1.0,9.0,10.0,10.0,8.0,3.0,18.0,2.0,12.0,10.0,19.0,11.0,3.0,9.0,4.0,1.0,12.0,5.0,10.0,12.0,20.0,4.0,18.0,6.0,8.0,17.0,11.0,3.0,16.0,18.0,14.0,1.0,8.0,12.0,12.0,8.0,13.0,16.0,9.0,1.0,18.0,18.0,18.0,17.0,9.0,11.0,7.0,11.0,9.0,8.0,19.0,18.0,10.0,15.0,18.0,20.0,17.0,11.0,10.0,12.0,10.0,16.0,4.0,2.0,11.0,7.0,7.0,3.0,17.0,6.0,3.0,17.0,19.0,0.0,4.0,7.0,19.0,6.0,12.0,12.0,15.0,12.0,19.0,1.0,9.0,12.0,7.0,12.0,7.0,19.0,7.0,16.0,6.0,18.0,6.0,12.0,8.0,10.0,7.0,7.0,17.0,4.0,12.0,1.0,12.0,14.0,13.0,7.0,10.0,9.0,1.0,11.0,15.0,6.0,12.0,7.0,7.0,13.0,13.0,3.0,19.0,7.0,15.0,5.0,1.0,6.0,5.0,2.0,6.0,2.0,4.0,16.0,10.0,16.0,5.0,11.0,3.0,1.0,19.0,8.0,4.0,14.0,15.0,15.0,7.0,10.0,18.0,18.0,9.0,11.0,15.0,6.0,5.0,13.0,9.0,17.0,9.0,8.0,1.0,13.0,3.0,16.0,9.0,11.0,3.0,19.0,9.0,14.0,3.0,11.0,11.0,14.0,1.0,14.0,10.0,1.0,8.0,17.0,8.0,7.0,14.0,7.0,17.0,4.0,4.0,15.0,7.0,4.0,19.0,15.0,17.0,5.0,8.0,16.0,7.0,14.0,20.0,0.0,5.0,1.0,16.0,7.0,14.0,13.0,16.0,16.0,19.0,14.0,15.0,10.0,8.0,2.0,19.0,6.0,14.0,1.0,16.0,13.0,3.0,6.0,5.0,15.0,7.0,19.0,4.0,16.0,16.0,6.0,1.0,5.0,2.0,7.0,17.0,13.0,8.0,6.0,17.0,9.0,6.0,6.0,15.0,14.0,8.0,15.0,15.0,4.0,17.0,2.0,16.0,1.0,11.0,11.0,12.0,15.0,4.0,6.0,3.0,15.0,10.0,4.0,4.0,17.0,19.0,11.0,11.0,8.0,1.0,8.0,4.0,16.0,10.0,7.0,16.0,2.0,19.0,1.0,2.0,5.0,13.0,8.0,10.0,13.0,9.0,11.0,5.0,6.0,17.0,15.0,15.0,7.0,1.0,3.0,19.0,16.0,16.0,10.0,7.0,3.0,3.0,4.0,8.0,8.0,13.0,19.0,5.0,12.0,8.0,16.0,5.0,15.0,13.0,3.0,20.0,16.0,1.0,18.0,19.0,12.0,7.0,4.0,8.0,17.0,5.0,1.0,18.0,7.0,11.0,6.0,15.0,10.0,7.0,17.0,19.0,5.0,10.0,20.0,10.0,19.0,7.0,13.0,2.0,14.0,2.0,6.0,15.0,3.0,18.0,18.0,6.0,15.0,19.0,10.0,4.0,0.0,16.0,10.0,19.0,11.0,6.0,17.0,8.0,6.0,12.0,8.0,10.0,8.0,10.0,9.0,2.0,7.0,12.0,11.0,0.0,8.0,12.0,1.0,4.0,3.0,12.0,15.0,3.0,0.0,5.0,5.0,16.0,12.0,18.0,6.0,16.0,14.0,6.0,10.0,1.0,5.0,11.0,17.0,17.0,17.0,6.0,15.0,12.0,5.0,0.0,6.0,17.0,17.0,13.0,4.0,19.0,10.0,7.0,12.0,17.0,13.0,14.0,13.0,0.0,9.0,6.0,17.0,7.0,4.0,19.0,5.0,13.0,14.0,18.0,1.0,19.0,12.0,5.0,11.0,10.0,19.0,19.0,3.0,18.0,17.0,4.0,2.0,20.0,1.0,1.0,15.0,7.0,3.0,17.0,8.0,16.0,1.0,18.0,14.0,12.0,11.0,18.0,8.0,17.0,7.0,15.0,12.0,9.0,7.0,16.0,9.0,8.0,7.0,12.0,16.0,14.0,4.0,3.0,6.0,15.0,1.0,2.0,15.0,1.0,6.0,9.0,16.0,17.0,10.0,15.0,5.0,15.0,10.0,4.0,15.0,3.0,5.0,13.0,16.0,6.0,6.0,18.0,3.0,9.0,13.0,16.0,12.0,2.0,13.0,11.0,14.0,13.0,10.0,5.0,16.0,12.0,14.0,2.0,1.0,18.0,11.0,5.0,1.0,1.0,4.0,2.0,12.0,13.0,2.0,9.0,10.0,13.0,16.0,9.0,2.0,17.0,13.0,10.0,5.0,7.0,2.0,4.0,17.0,13.0,7.0,1.0,20.0,6.0,14.0,2.0,11.0,17.0,19.0,5.0,6.0,15.0,17.0,2.0,19.0,15.0,11.0,17.0,4.0,8.0,9.0,16.0,4.0,1.0,8.0,7.0,7.0,2.0,18.0,1.0,11.0,8.0,5.0,14.0,17.0,18.0,10.0,11.0,2.0,8.0,10.0,15.0,5.0,7.0,1.0,2.0,14.0,20.0,20.0,0.0,19.0,5.0,16.0,11.0,19.0,18.0,17.0,20.0,11.0,14.0,1.0,8.0,9.0,3.0,17.0,11.0,11.0,13.0,10.0,17.0,17.0,18.0,14.0,6.0,2.0,11.0,14.0,10.0,6.0,19.0,18.0,5.0,1.0,16.0,17.0,15.0,7.0,9.0,20.0,18.0,13.0,7.0,10.0,0.0,5.0,0.0,17.0,5.0,15.0,1.0,7.0,14.0,13.0,15.0,14.0,17.0,5.0,3.0,3.0,3.0,1.0,8.0,18.0,12.0,5.0,9.0,13.0,6.0,20.0,9.0,6.0,8.0,16.0,4.0,18.0,8.0,11.0,5.0,19.0,20.0,16.0,17.0,9.0,5.0,10.0,19.0,6.0,6.0,6.0,2.0,6.0,5.0,8.0,11.0,15.0,10.0,20.0,10.0,1.0,16.0,18.0,18.0,10.0,6.0,11.0,7.0,3.0,12.0,2.0,7.0,14.0,20.0,7.0,18.0,12.0,8.0,19.0,5.0,19.0,20.0,13.0,14.0,9.0,2.0,7.0,16.0,1.0,20.0,11.0,18.0,2.0,8.0,16.0,3.0,13.0,13.0,0.0,1.0,1.0,12.0,13.0,18.0,11.0,1.0,2.0,11.0,7.0,19.0,13.0,6.0,13.0,18.0,14.0,14.0,8.0,10.0,15.0,18.0,14.0,1.0,6.0,17.0,12.0,5.0,9.0,18.0,19.0,15.0,10.0,15.0,11.0,2.0,9.0,11.0,15.0,12.0,7.0,14.0,2.0,11.0,5.0,2.0,14.0,12.0,14.0,2.0,17.0,19.0,16.0,18.0,6.0,8.0,11.0,4.0,19.0,7.0,5.0,19.0,15.0,16.0,15.0,13.0,11.0,3.0,5.0,0.0,1.0,3.0,12.0,16.0,4.0,6.0,2.0,16.0,15.0,11.0,16.0,7.0,6.0,14.0,16.0,15.0,9.0,1.0,15.0,1.0,11.0,7.0,6.0,19.0,19.0,8.0,9.0,15.0,2.0,3.0,5.0]}
},{}],27:[function(require,module,exports){
module.exports={"expected":[0.9997185751123034,1.0,0.999771126502934,0.9999275342991236,0.9999999999999999,0.9862387409942459,0.8243029860083851,1.0,0.9994344356226479,0.706091536850382,0.9761712041837761,1.0,1.0,1.0,1.0,0.9999999994294011,0.9997567777797784,0.9764649207159806,0.9999999330416093,1.0,0.9946025391884714,0.9999999987155131,1.0,0.9999366525216795,1.0,0.9999999999999993,0.999876598856396,0.9995786952330077,0.14829024875465852,1.0,0.4188715322216714,0.08044681745893573,1.0,0.9999991402370552,1.0,0.9999999999972597,0.999999998357721,0.9991637608582893,1.0,1.0,1.0,1.0,0.9996543924019494,1.0,0.9999644434218619,1.0,0.9999999999982618,0.39736806397186547,0.9999999999999207,0.9999967171302633,0.9999999362988156,0.9999924905823143,0.9999999999996421,1.0,1.0,1.0,1.0,1.0,0.916206079776603,1.0,0.9999524280237014,1.0,1.0,0.9487075639816009,1.0,1.0,1.0,0.9783765246721934,1.0,0.9776147725746174,0.993143017402595,1.0,0.9862934042234328,0.9991974140870918,0.9999999999997171,0.9999923233294206,0.4316667222810465,0.9999999999998859,1.0,0.9999987797554903,1.0,1.0,1.0,0.9999996283037406,0.8640787324350996,1.0,0.9999999971545788,0.228987010306755,1.0,0.9999922885661046,0.9724745012091733,0.9997783397521545,0.9999195730618377,1.0,1.0,0.9999999593244324,1.0,1.0,0.999999984917457,1.0,0.9893195209451461,0.9999999961986372,1.0,1.0,0.9901033614918686,0.9999999999795319,0.9999999996443908,0.99999999586936,1.0,0.8624744090346295,0.9573606319247162,0.8113433235594436,0.9876578228360859,1.0,1.0,0.9999999999999913,1.0,0.9999999999944077,1.0,0.9997603224529745,1.0,0.9999999998891125,1.0,1.0,0.9577247368987107,0.9999984254003659,0.9425110068230547,0.9986278598200147,0.9052745618307357,0.998807415634382,0.999999942965383,0.9675646679315781,0.9929315809094986,0.9999999999996994,1.0,0.9999937614239717,0.9413441409570755,0.8459456603228165,0.9999899514584053,0.9999999992496599,1.0,0.7006807506165816,0.9999999965591841,1.0,1.0,1.0,1.0,1.0,0.9999999997695059,0.999999999999978,0.9999999284962202,1.0,0.9976230986883821,1.0,1.0,1.0,1.0,0.9986701822758774,1.0,0.9999999538317367,0.9999999999558903,0.9997879349671512,0.39312187156712064,0.9999997330616683,0.9972230209909352,0.9999942402332864,1.0,0.9998925414219023,0.9999999998706,1.0,0.9999736746702956,1.0,0.9932617864028234,0.9999999943508777,1.0,1.0,0.9999804076217091,0.42949591334916626,0.9994946852117554,0.8744168289267437,0.458303762955516,0.999998308612432,0.9842332790507697,0.36774248247988855,1.0,0.9999607293323974,1.0,1.0,0.9980770485660868,0.9999999995997854,0.8576757444993031,0.9999993942480057,1.0,0.7530256758246623,0.9988258925362105,1.0,0.9999999946756266,1.0,1.0,0.999999465964212,0.9998589145134135,1.0,1.0,1.0,0.9831310936133864,1.0,0.2229246410463833,0.490074738045324,0.9996353339947233,1.0,1.0,0.9999999999984164,0.9999967548342594,0.9999999994414963,1.0,1.0,1.0,0.9996226441896283,0.9626626007633723,1.0,0.9999115323266502,0.9999999974018865,1.0,0.9966428110800098,0.9989277109382959,1.0,0.1303316064568189,1.0,0.040938655874696084,0.9999999053768416,0.45997674394791854,1.0,0.9999986874428886,0.998335009345334,1.0,0.9827661400174468,1.0,0.97147895244486,1.0,1.0,0.8656925638689652,1.0,0.5830869957887644,1.0,0.7266954444523315,0.24517193933835454,1.0,1.0,0.9999999944918605,0.9401327194163931,1.0,0.48078731750911985,0.9171421958581478,0.999720184364592,0.9999577136044198,0.9992977040097915,1.0,1.0,0.9141562159631054,1.0,1.0,1.0,0.9990900430836345,0.9999999999475631,0.9928427265061801,0.9989219861649761,0.4303045220426507,0.8335333766276186,0.05618974185535119,0.5660530811288195,1.0,0.17043947226829337,1.0,0.9999929817600328,0.9999892845628223,0.5983764624524464,0.9237824654015907,1.0,0.9999999999998943,1.0,0.9505537879372677,0.5744819353130467,0.9999286666073341,0.9992938557598746,0.9938303170883254,1.0,0.9999999919227553,0.9914834725643393,1.0,0.999980677329323,0.9999999555808833,0.9999991284837095,0.9999696578474049,1.0,0.9961895063925905,1.0,0.25485098131079753,0.053625182755119176,0.9999999999999997,0.9976064577979695,0.9611408758422405,1.0,1.0,0.35497094705562704,1.0,1.0,0.9921555458107927,1.0,0.9999789582174894,0.9999999999999889,0.8809231633424779,1.0,0.9990123164108812,0.7663930775715795,0.9999421270473775,0.9988314528632669,0.9999999908080817,0.9990618240227612,1.0,1.0,1.0,1.0,1.0,0.9753677945234872,0.2836516222497183,1.0,0.5366700091530927,0.9999999999977516,1.0,1.0,0.9999999943356848,0.912086756775617,0.9999857189714907,0.42853963709433407,0.9999999999999996,1.0,0.9987977525845373,1.0,0.9999999999998854,1.0,1.0,1.0,0.9981329627479987,1.0,0.857958834518356,1.0,0.9999960566491488,0.9999999879669627,1.0,1.0,1.0,0.9999532935125213,0.9999646647040417,1.0,0.9996441940241463,0.8476593990268343,1.0,1.0,1.0,0.9926060571583286,0.9999999997527365,0.9999593841608001,0.9999999940236652,0.9998855467574757,1.0,0.9999999929653561,0.9999999850027181,0.9924783558189126,0.9999999989649989,0.9842012614381574,0.596571949792815,0.5915694054016654,0.9999991919104371,1.0,0.6789846933159245,0.9999995150881593,1.0,0.9999999999545636,1.0,0.9938377880686631,1.0,0.8714129114280134,0.9999999491842646,0.999999999974198,0.9988672875919397,0.7778586886240992,1.0,1.0,0.9999999997823412,0.9999999548732807,0.9999829423732447,1.0,0.99998828745232,1.0,0.9997752844299551,1.0,1.0,0.9999999882481792,1.0,0.9911398157764071,1.0,0.9664755912056789,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.7702318285864393,0.7527876993660132,0.9999999992177184,1.0,0.7497587667168075,0.9107843408965866,1.0,0.9999998878249399,0.06948080859519588,0.9996744755230733,0.9999999900709149,0.9999999999291779,1.0,0.9999716222279585,0.9504921275931146,0.9659520015676186,1.0,1.0,0.7286475367228562,0.40918077904861777,0.8422822128971434,0.9999864302853377,0.06660095329518205,1.0,0.9999999999567579,1.0,0.9999994787181158,1.0,0.9999999993214654,0.9987941090153523,0.8366329937669226,1.0,1.0,0.9988079328008377,0.9999754068552609,1.0,1.0,0.9999999999803711,0.9995944104407728,0.5414818997658257,0.9999954345141862,1.0,0.5239186738080548,0.9999938585849437,1.0,0.9999988860543141,0.9909659905503212,1.0,1.0,0.9999999394133721,0.9999997473440643,1.0,0.9999999998527251,1.0,1.0,1.0,0.9939738960491135,1.0,0.8614982089097367,1.0,0.9999999999992288,0.9972118644174116,1.0,0.999222055946685,0.9999999989726491,1.0,0.9977537813659043,0.5841782088355674,0.5776330952982538,0.999999999986065,1.0,0.9900297717353003,0.9988101998317251,0.9999999699999351,1.0,1.0,0.8651548595594833,0.9914062233044332,1.0,0.9999999999852824,0.8030495929166371,1.0,0.999999999768447,0.9934708737422655,0.9977966392093589,1.0,1.0,0.9995579368985452,0.999999999999579,0.9999989454783204,0.9999905236942556,0.9999999999198369,0.9963351079966383,0.9999999990140281,0.9868825726386088,0.9999999983642045,0.9999999873021406,0.9999999974955209,0.7779125629553165,1.0,0.9999999739542209,0.9999999638752899,0.9999990207908742,0.9999999997412568,0.999999999828413,1.0,0.997661427066519,0.9999999999645436,0.9999999999929862,1.0,0.9999999903843362,0.9999999977607696,0.31096196027751183,1.0,0.9919530101833881,0.9999999857998567,0.7896913305955493,1.0,1.0,0.9999013186980533,0.9999999101682231,0.9970940081440705,0.9999999999999671,0.09056320527712833,0.999999777981944,1.0,1.0,1.0,0.4390004116707118,0.9785410042757567,0.9999998126263022,1.0,1.0,0.9999981151384284,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8944096094824492,0.8503097501025133,0.6554159268794575,0.9997680540199966,1.0,0.06531595870881488,1.0,1.0,1.0,0.9931495638329136,0.9118086441653038,0.02852107911420653,0.9974016660914713,0.9999999997872816,0.9999999999628071,0.9999999998394467,0.9999999999964698,0.9998929113331065,0.9996111919118991,0.9999999987663369,1.0,0.9999999999960016,0.9476996775229611,1.0,0.9327754452129559,0.9973232280861033,1.0,1.0,0.5993933647891835,0.9997108066998872,0.9999984844267897,0.9999903604718743,0.9947465588800546,0.9999991626778217,1.0,1.0,0.9999999133508279,1.0,0.9999998937423277,0.28057481417915126,1.0,1.0,1.0,1.0,0.8446086014367775,1.0,1.0,0.7298410703092465,1.0,0.9999999999999476,0.9999999705210526,1.0,0.9999999947496682,1.0,1.0,1.0,1.0,1.0,0.9999999999284652,0.99994488421113,0.754326458959154,0.8312785389094257,0.999974837739587,0.9950626991657073,0.991970725190634,0.9526471978283229,0.999123631874959,0.9999989478121828,1.0,0.8831958936024147,1.0,0.9999999999997997,0.9910592209201239,0.9819874052783673,0.9840139670574433,1.0,1.0,0.9852733498846773,1.0,1.0,1.0,1.0,1.0,0.8525424624501745,0.9999099475241402,1.0,0.9850971973274267,1.0,0.8256220013057278,0.6803263211477715,0.999999981869852,1.0,0.931762986098234,1.0,0.3579432083541563,0.9999999999996,0.9999997490925246,1.0,1.0,0.9999999999977889,1.0,0.9999999999999951,0.39425626165035615,1.0,0.8143872065221678,0.6090592220550425,1.0,0.9399948359882698,0.9999999908479162,0.9999999999917999,0.7422655010925816,0.9899664505233715,0.9999999576004484,0.9999813892290792,1.0,1.0,0.9263447371933642,0.9999999999997089,1.0,0.8628314220781561,1.0,0.9999589590456452,0.9999963201354749,1.0,1.0,0.9999998298917657,0.999994947205876,1.0,1.0,0.9999999995607762,1.0,1.0,1.0,0.7616394435952181,0.9998408699580423,0.8575359174788233,1.0,1.0,0.2570882412867441,0.6207062116441442,0.9708824454391213,0.848149332922852,1.0,1.0,1.0,0.9659178302249835,0.8040100996347763,0.9999999825657214,0.9999999999999396,1.0,0.9999997977950461,1.0,0.47635676311265257,0.044497065971531476,0.9999999821156963,1.0,1.0,1.0,0.9999999992446209,1.0,1.0,1.0,1.0,0.9999999361925088,1.0,0.9999993778773708,1.0,1.0,1.0,0.9999999999999998,0.8431931103503346,1.0,1.0,0.42372224107239803,0.9999995868680374,0.9998332942294259,0.9999999993944384,1.0,0.9997276845995159,0.993603010425421,0.999999999417756,0.9998822027423511,1.0,1.0,0.9999999999984455,1.0,0.7993442980352304,1.0,1.0,0.9997416135748667,0.9999954040051453,0.6691257492523943,1.0,1.0,0.7603295199747031,1.0,1.0,1.0,1.0,0.9999520060046121,1.0,1.0,0.9694979000731864,1.0,0.9999995383974694,0.9997820026059894,0.9992713097152357,1.0,1.0,0.7260624746204758,1.0,1.0,1.0,0.9999399001854916,0.914766693103833,1.0,0.9999321744650537,1.0,1.0,0.9995593872027531,0.9967122339388548,1.0,0.9999998352591981,0.9917763525564682,1.0,0.9961624967231115,1.0,1.0,0.9999999999994063,0.36926623898865474,0.9993433910998969,1.0,0.9999999999827004,0.9952157038835636,1.0,1.0,1.0,1.0,1.0,1.0,0.9999999999717143,1.0,0.9999999999909839,0.3128516536052198,0.3641840905444365,0.999966332661616,0.9999998111425106,0.9999962949955834,0.47610337622132715,0.9999731198259016,0.9999973917599834,0.9396614521430644,0.9999999928492604,0.20168774875515003,0.9999999966223267,1.0,1.0,1.0,0.9999940529301014,0.9999999999998644,1.0,1.0,0.9985198091399949,0.999999999983172,0.6378462805615466,1.0,0.9999999999749439,0.7667186279790447,0.9837602991460598,0.7721175128614036,0.5450029975542441,1.0,0.9989798662683006,1.0,1.0,1.0,0.9999999877348364,0.6634235974858248,0.4607750878538489,0.9998494193425731,1.0,1.0,0.8824322834370514,0.9996055988765817,0.9999999917059428,0.9985715905130189,0.999999999995105,0.8611643779092395,0.999999999995488,0.9974001859971915,1.0,1.0,1.0,0.8164265157315778,0.5670684335112747,1.0,0.9999999992867836,1.0,0.9999999872095073,1.0,0.9999998100514086,0.9997999202081165,0.9999999994572198,1.0,1.0,1.0,1.0,0.9999999999995772,1.0,0.08270562965869808,1.0,0.9999674498883454,1.0,0.9928845436751963,0.9999999999991813,1.0,1.0,0.8967147572306922,1.0,1.0,1.0,0.9999999991291899,1.0,1.0,1.0,1.0,0.9510062387744258,0.3027327291293985,1.0,1.0,1.0,1.0,0.9997986381604669,0.26667653395865865,0.9948362250346998,0.9230033492543214,1.0,0.9999999999946634,0.9992224138727618,0.993705187805993,1.0,0.9999999999999896,0.07583087301199336,0.9999996925766587,1.0,1.0,1.0,0.9914906085184287,0.929534042476023,0.9994829816825788,0.34487224950137596,0.9087893139162366,0.9999999999232643,0.9999988707690568,1.0,0.7775007570745365,0.9901565650930815,0.6155319733413094,0.9994868329230019,0.9999548877014097,1.0,1.0,1.0,1.0,0.2644269254903304,0.9999438367453837,1.0,0.9994269324654627,0.9999999742258496,1.0,1.0,0.9998194391275199,0.999999994882266,1.0,1.0,0.9844031975180004,1.0,0.9675523019130107,0.996853274082903,0.99999996119406,1.0,0.9999997909013407,1.0,0.3688251705988108,0.9999999999998535,0.6661386473435947,1.0,0.9873090080842786,0.9997673532318727,0.9999999999999997,0.9999999744065671,1.0,0.9999998781277866,1.0,0.997951407489964,0.9999999999971536,0.9997304884315418,0.14990456475698916,0.9999999998725586,1.0,0.9999999923400229,1.0,0.10616056248126814,1.0,1.0,1.0,0.9999605968462528,0.9998957490011168,0.999999999744096,1.0,1.0,1.0,0.9994923568496502,0.3993961321483967,1.0,0.9937782259757908,0.9999865955335592,0.9999994819777442,1.0,0.27145975384614884,1.0,0.9999992481895494,0.9975854675390026,0.9908774124879624,1.0,0.999988967538271,0.9999797453596034,1.0,0.9241802571138671,1.0,0.9999999999999982,1.0,0.999999400066397,0.9999999822655985,0.7053933089394684,0.6284967229501397,0.9044283357270808,1.0,0.9999997834175619,0.9962609005220961,0.46579027191049527,0.5715218776283523,1.0,0.045914277543906194,1.0,0.08901804619195484,0.9999999999968903],"x":[6.38319341410683,10.143338894297196,4.602896947282467,5.933791098738826,9.318015967607153,3.4286409627191325,2.01914198665993,8.388750700349183,5.853260271287784,1.3963095545576032,2.5285924306670946,4.484189145190959,11.652788199223313,13.115346001711556,14.262964195674243,11.734175707926365,6.606211553343399,5.654575278331792,8.51980329258191,7.779769974261286,7.33373042409884,10.19986595579934,8.263819319720811,6.28824255012378,13.746997994337013,4.0082155088369875,4.721466291312858,7.864647265117234,0.16795420036969655,9.221699979593614,0.592963922123898,0.5038537965441725,13.144194976844592,4.600270859979449,11.616995497525537,10.647708625951678,10.09762966412202,7.883617115437183,11.484617421716258,13.444142317295654,8.323621496419861,10.483682447091265,4.408043477303894,10.948288041921572,4.707259608478536,3.0346152175274446,13.800411712065616,2.0981278973857007,7.94606787815178,5.471513125107284,4.8949782072669095,5.367901038800467,8.39269191459726,14.053650476051104,14.754556591998288,11.813835448102136,11.129823780540608,13.763953934531086,3.8108298157470966,10.958269407443819,8.821282704775763,13.70124967950878,7.639106247465813,2.734855285579172,12.244500251011479,11.776490302527924,9.136098961827528,2.6496980520404456,10.500876540634968,7.080218290596885,2.3832946040360135,11.440957862730576,3.180072492061916,7.54546381931458,9.337827507167267,9.946402066563847,1.9917064221156378,10.63688803766288,10.190614408483205,10.458554658783433,10.817124920409421,4.64615212841985,8.799779002777605,6.476429017162778,2.884151915690926,7.825184378320599,5.038030244039491,0.7076194683113923,4.105139228624591,5.127108097341946,3.3094657219252266,5.096447722078703,6.719330543853564,14.435114763492209,11.22079374609802,6.671251931305402,11.669523967166146,9.33135721833948,6.114144996836703,11.975534885873776,2.096177009096649,12.420402082789874,12.720462473785826,12.753145938302726,4.7284714452912615,14.872049218108979,4.560729897274868,12.294643409973691,7.984954708664351,2.652692995153796,1.419288787064582,4.553234532517152,3.8437521803675545,13.034880340177892,14.57403422056293,8.318870588438639,14.239233844208833,12.833117958006074,12.030826673726413,5.505714649269901,10.22085697243661,14.219463179988892,8.642399081798896,2.105957975353032,2.0759537406598962,9.147984113305082,2.4459737422665864,8.920578723759364,1.8250329880972693,7.037009241390114,11.384237688707488,2.6568839609925012,4.418993882993854,11.089916190991797,6.721343449215244,6.933818023079644,1.4864711135016928,2.0515667605547847,3.119248518491302,9.313361438941493,13.661188889845356,1.4406596094964774,6.405273986908878,3.0081749730425367,12.704047821902101,3.174572987463067,13.874657998468422,7.302861007242498,7.164694396881855,12.943127186671182,9.862948716835291,13.231417595235017,3.068121693741892,8.067104088457368,7.7670693699636235,14.044025608286407,11.470777538902649,2.1438281145816616,5.400706024181137,5.5471508878784705,7.523665279678937,5.3276528971156845,1.0016122023533047,4.8571747406220735,3.598579379747658,6.630497266961051,9.024077690599912,9.314321013947334,12.182209826779342,14.859221985713233,3.5623865873577696,11.546400155601289,1.4707313676939782,13.953988071992823,14.924683877982748,5.829930914568399,2.079935815389814,0.05396795506713348,3.836498645560833,4.220541434356054,1.160774852954618,4.9681815463661225,2.842241136169692,2.9709535399318865,11.691148805327495,10.926804493640544,2.611666985701838,7.178817252139501,7.473248526676458,13.432702433600396,3.5468369856774453,5.510335627972367,10.411977037105233,0.02367124374926477,5.170883668805689,9.766586876753344,10.912627530413756,12.271054234511542,13.564383011604527,3.4379795340799024,2.209062027713262,2.5428566721926904,14.951406395664593,9.398887596391752,3.700295352508766,9.951416044108377,1.6793577700859852,1.1097516720130274,4.434225495142909,14.682823000621632,9.578817388093894,7.510042916595992,8.203177710913486,6.146149720617017,10.792250098851559,14.187732962974158,12.432997355274605,6.861409448099259,2.6364792071848564,11.959276144891849,5.176889840381872,11.967013388217406,12.201739496621274,8.585247326604433,8.30939092754038,14.628172952906267,1.8109630983699587,14.899538895618027,0.7311105277104635,11.748395673064138,2.228595910468588,6.858044019312652,9.114116946201698,1.9557174536767363,8.10344006571198,7.087328173524927,6.623921679229268,5.870085335266456,12.498960911476654,10.635872571037696,3.3243178919238714,2.7254193840332244,0.32912688679398894,4.498732345716564,0.2275758481308343,0.6924686980590511,10.318607894218053,13.67014264949733,12.175542524147229,2.832994493757183,13.359727618938082,3.0177253489053166,1.2002028563800349,8.629686701879809,7.5373624505279935,7.1822709367538735,6.775853006565265,6.609921321958706,4.17492742228323,8.594284377534088,11.935011184790545,13.96273768838368,3.9998782782398745,13.976952371835024,1.3801502315069025,5.056123956058434,0.4547091870914788,3.890358344015945,0.7506145918126694,1.9086491668376249,14.780216687358363,0.8845613426379784,6.775997559599322,9.234067259145686,7.721575588089227,3.8568241974036974,2.2798722047758657,14.069941986313811,10.097070765314912,14.71703094447706,3.86090649543545,0.2876302728032998,5.671707750377596,4.163973582120111,4.532706425419605,4.679436533542148,11.571671233161029,2.280331674016267,4.322807896980562,7.352359176196122,12.776477784486406,8.71328341247674,3.7025974324533006,11.713973765754385,7.493266315572552,12.776836174933234,1.3878712854491426,0.761782720262667,14.251389397609133,1.7210205421916414,3.0899981532256926,13.196397747371607,9.05580969102394,1.751113136565463,11.33570199430471,7.488920321310156,4.79358311712126,7.866896158837254,6.0827177427068415,11.775360851567592,1.9060382350718819,7.705621834812763,6.3762646471334445,0.8900745714700309,4.230100480382582,3.6269472471143605,7.190446017499674,3.6757219848850022,8.394500261262833,13.817153373679687,9.842968504515898,10.385121771471598,3.6126473926255698,1.4846452377279007,0.5485819023106131,11.588075922103657,0.46298536659601375,12.591083886783885,13.749657458208826,7.9901291913845025,7.405712203658372,0.008906922305667031,12.224181837138122,0.619598597826182,12.679879838166832,11.39061447241001,4.269066936304871,10.255683137182329,8.861121427986266,12.610287540348246,9.512583245591141,8.937766371774675,7.296278893212284,12.615710925688875,3.086453032494348,13.458603634924518,10.814708519558755,8.904882893732115,11.013665866204168,13.106342591961102,14.323171143004812,6.221748483063603,9.6897422875316,10.911092607311033,2.520708982995071,2.711785241368063,8.363610042834333,8.127245445024892,12.91480747781253,7.8568258691368715,10.35982122497385,2.252528398623598,8.263949570158474,9.838763959600387,13.731578197416136,5.709931729410206,8.526800143473688,5.411248388981173,11.406318795590975,3.3446262367044275,1.777281332526669,1.8400074584017667,7.440374257228898,5.958018906360607,2.5789375251273174,10.403018277298266,7.646470722679196,9.408319535314835,9.282661414775223,7.741789035502182,9.514063452905773,2.7992408123047587,7.640591443356975,9.792325834701618,6.978425537114007,0.9130254092105883,2.636193602056436,11.03622269560067,8.392278430216479,9.022776309080214,7.367393712180808,14.641703150645505,5.770842551434652,13.56248521657688,5.663426358531573,12.622921575501824,14.802575228766628,11.310131312855852,11.827407460012244,4.16029372379109,10.751868826801106,4.231570550704362,12.291679858160528,9.561111952455855,10.546052525681002,14.557363535960304,11.50035244275454,13.252983175909172,3.623040735515861,5.864586037575897,9.185471351897558,0.49950024032861196,4.413470945747133,9.735366399376282,9.049021406621549,0.7354660477257469,2.1994745268309766,10.515248102919386,7.278694521767438,0.08700767849585289,8.840545814718775,13.135203667433634,7.843835534130226,11.582419578551853,9.946134099109987,4.662509835419924,6.051600665100258,12.627469206259308,14.188215121736777,2.911811692692149,0.7922259534636655,2.312332114673288,8.234407914875586,0.2169298756211857,12.458653218573115,14.121554038966702,6.76187258926377,10.829859019930504,10.257140471000158,9.120615271955922,6.174288980273943,3.7437344667389016,12.320491570221384,12.785354976135777,3.2488431940326445,8.448314856070455,4.435689824174467,5.764394419012408,7.950144108016697,5.577697752709529,1.4321935280244547,9.085443658058086,8.02333120968966,0.4885396569913769,7.951777174693011,14.058140372216828,6.730471457296947,6.250898272656449,13.525338050582949,10.159445503458532,9.009661070297014,8.351109921492315,12.391743093205463,12.65187767231317,8.100155702119809,7.756702702135804,11.751450791102652,3.6812323003329905,9.93787190508996,0.44043019080861723,10.174708355093484,10.474737972484684,6.924457059046517,9.918192149926607,8.263717978043891,11.520084684128067,12.739297289653297,3.525985694756878,3.785349423499631,0.2037467477484678,6.029081877567758,14.119512485367157,5.621133696373213,4.686536630117266,10.979923106781204,7.5072730417655,10.146686842507322,1.911412965545043,3.2705404229749933,3.0615823483423044,11.262481757799991,0.5602564098302731,10.091164237693032,9.924168745271459,3.1209294621117856,3.8820922444724326,9.556915941096266,5.992047798848249,6.824219686965607,14.013862499400506,5.933921786297568,5.037982212342281,9.551389199478287,5.934088375889219,12.300690950716843,1.981170764924659,12.177413822430834,3.3045786410733022,12.439147269940092,2.752179535304763,11.095229113936597,9.954856832067744,10.130271460208371,6.222136062797324,9.1477719045,14.279306790082554,12.957087142712261,5.337251135827499,13.593548022517034,14.729701055522886,11.464482796596444,4.60262227205956,6.926768872990998,1.4185289239345378,13.949528319926426,2.3689915633283376,11.270167115284565,2.847251493465106,10.896692392191294,6.190955378981378,6.5937984011832125,7.316166779275414,2.317799853873902,13.26720158249209,0.7295031405090924,5.841770113003591,14.392274940640984,13.68718212898327,14.986778567063991,3.263558724078204,4.3551486511100945,11.233209432317366,8.820102975681573,7.061382936610054,8.19105260161639,10.41975513593492,10.730642174779836,9.56433283493119,2.428727819685672,10.739456216019143,9.205600556030367,4.093369106043249,2.897390743211421,0.9980024525040432,1.4223133116983522,3.9645485464624395,4.672435042311357,8.37339630768781,0.3008669571781575,9.858256600970519,14.318708874133314,12.704612083598851,4.436820214419645,2.943318905191543,0.632986151797772,5.098869498015093,10.96845470615155,10.242055825044854,7.207244221304022,7.229719355337901,7.427356278252518,5.918587105680003,11.088606228415433,10.577415371653244,10.895283064967991,1.2016363659035034,14.222098947505998,4.542748701055379,4.967750177903336,14.547375827346334,0.24392182643622085,1.6113650962532522,7.786039065101429,8.71123622623789,5.796357957033878,3.739927933871836,7.231574979965629,7.748074527414579,9.668415609245024,10.535262150681394,11.310517556048955,8.056448696266381,1.8829715427811378,5.484899643519912,13.035494483512792,6.679135188669819,13.182099196293034,2.955654066850072,8.287775562138345,10.492022777248337,3.99272076807243,12.541829100683042,10.858958180305343,5.9549226658838394,6.142399647325493,3.104861848857242,2.3303965229077948,13.750027617896777,12.769953102900729,12.837907792980163,13.156790875763425,11.33292483190019,7.094732653460828,3.640715842088391,2.4661099412989995,4.289749768851965,1.1554117828198884,5.535217430375251,0.27441639755505287,7.297594336626,4.508838124891276,13.446924919495338,5.866843084492722,7.173367367418119,9.45717471560558,2.023816423313428,6.67175380148476,3.9960231322742388,13.768383791644244,6.123363020938145,1.93336034220301,10.347868805276775,11.726152919460253,5.417342226525861,11.66018541176897,14.551303537295547,0.013233343667107267,7.68583157088573,3.203807229324651,5.176203805032503,11.596499729078326,1.6618543972242406,0.5993751171935879,7.757297506960569,14.568126226288605,1.7566638296628156,11.017190681272348,1.4399496947071,14.283426039629495,8.926451608652958,3.516910479601165,5.542650352318285,7.066105543491002,7.237515673619068,14.897151122158052,0.15005459694843903,6.02840330380732,2.0493600187798555,0.5117719450936009,13.803100382411788,2.128936657926106,9.440107824069782,9.182061071665316,1.0057770034975888,1.961103360591493,4.843734636688005,10.92733736091662,11.982737016324357,10.314455270060591,4.62093528734877,14.036798725681797,12.293996927237345,0.827886508050717,4.742489107235247,6.040957134549199,6.526459017209123,10.137256920562997,9.068280904074083,11.873967755328355,4.8594404808589085,10.73319334103839,12.000655940954859,11.674054089887836,11.670873984563398,14.305237396482832,4.17164694649382,1.0199070901765561,3.9966836027446107,3.147517648067507,2.5725903788580906,9.407947060650402,0.13561928274600232,0.398527187708394,1.6537090903099538,2.0894275669245155,12.882904118736615,5.337082299847609,6.098703099125645,2.5567519376004464,1.7170169644965216,13.139984745069363,8.062928067637358,11.712364719886864,6.532771261809601,14.92751547754508,0.07370525550879137,0.12675155206264277,10.920584668052673,13.971069878413562,10.004712311727136,12.079777645736407,13.595233491060108,4.681317649457358,7.163460167855085,7.586723903005616,9.677627424111648,5.442201456493887,14.814733369407898,10.081341581185912,13.12563166137787,9.348598403801304,10.959703031811202,10.868152673081525,0.9662403505839523,12.641553818852085,11.274879082141528,1.809401850929473,9.790859892917782,2.5987553090026028,7.616615397320206,9.505307529446883,1.2664367156491874,3.37154344530319,7.29043780246576,8.207191448859604,14.396139231575253,7.294524263065449,9.61103393255807,11.281416583563411,3.902115396580841,8.161324922199576,12.95540827689151,4.431023155172854,7.845248800046434,2.690178761264818,4.135814973520673,7.7804438125929725,2.2059879007858196,11.649863138951718,11.485005266960046,14.191384106675212,6.12034728852049,8.172582615233337,5.112540515791095,8.271748295834438,3.386986257772857,13.476015597053244,7.194239033117963,3.4797443000201103,6.275032370953962,14.983582179349044,8.504867921401315,0.8223973926527772,2.133233787687281,2.1145829909553315,10.724648957207963,8.746372906570954,1.1148452180677426,8.516313783210359,6.066576559285686,11.266676399799088,5.925262224608771,7.5953134099102435,7.787747460572392,9.671271731801864,2.5774758011200625,6.481957244917215,5.419423976899967,4.307222256642548,13.811308635837145,9.572341700973755,10.513073473544935,1.7959894829319623,8.838419767274313,13.408937435344502,12.855666886333559,5.101092926680471,10.677909117186978,13.055889132146083,13.266407955764217,12.364077406583917,13.64544144474783,8.17769807135589,9.569442455197896,11.243890512466868,10.332970985457443,0.9023322769666886,0.2836467996292713,3.360247242889205,11.979978349793356,7.30680954341663,1.2497812040436196,8.17105988738145,9.21466415158387,4.12962262766634,6.547558734783548,1.1600808185152789,8.630343195389905,10.914875008546543,12.004785120242106,12.40647875713966,6.022499665461579,9.905013620775971,13.621612073135903,4.349880782599179,7.848493956913897,14.539941824072855,2.7390462236405764,8.785729289477986,7.9422123860064335,1.5122830926861064,1.4295963592486927,1.7040313025599396,1.3373228679779925,6.256191411943636,3.8207925516890295,9.19212443133826,7.7889585907019745,9.467329435160634,14.891473956421727,2.0275374770249965,3.0995345395121623,6.982256363474496,14.145017443070142,13.468750774716165,2.7400164462520546,6.735065105431354,8.830826559274588,7.7440699908531,7.4527141249602815,2.6931699857891314,7.531829435666669,1.8337522878171986,8.906112118922325,14.45635374379971,9.7460321232283,3.952298423209525,0.40963279027187327,10.749729053610693,6.955045931758273,14.517867140510877,8.92372379494317,12.224240664081263,10.9665225359991,8.146687620095095,9.644045994379585,12.434483066490735,11.67400606774915,8.106371541857257,10.242519875759616,10.79415427672624,7.2667607422246006,0.21910425769361086,14.18371891011782,4.089355080070682,6.7035728110505435,5.46659550222777,12.492082424385414,10.787883884070617,6.400828263121269,1.281908248215815,14.293727120862078,14.456332150455147,14.096331111216681,5.81263879443526,8.661739202359346,9.561273646176085,7.616084883924536,13.043112117297278,4.584186771574908,1.51658902328482,14.356659504351361,10.463447755766827,2.1077653884631897,13.216816537188357,7.936799971894789,0.6481529866151647,3.881595628361242,1.8631104099008333,13.560365941556169,12.187010973378436,9.255951888883576,7.961757130974249,12.388983996105072,7.24162139664689,0.4415547531956354,6.453432197465529,9.695005780049081,14.755296772734358,11.92382401667625,6.180236341096469,4.544268902129952,3.510560264720387,0.4894948307228131,3.648034194327141,9.238480678160103,9.53649484019943,2.683228880045311,2.623226366028729,2.430503315576212,1.253171481366352,4.306477693095249,5.629396472668039,6.6317093767802024,14.540022786008844,13.853581084801236,7.07424960455664,1.5436808220089027,5.732902360226032,14.416257878466352,4.020126787181141,11.811043369341027,4.625425636021529,14.89441543817426,7.188299717000083,9.835626734712926,13.783511223359909,13.486909663268957,4.010984919006027,11.222338397284068,3.2376341258140853,4.642591693937285,7.610138996916298,10.90763156628563,12.377468576497586,10.737894820581865,0.8978854008008075,9.623012750299486,0.6555224719455921,13.964118202938907,1.5062397024682517,2.4616720441731363,13.402771412888956,5.145085089806547,12.571756769608866,12.021087570511597,12.887529038265678,5.285426082874986,14.424979244467085,2.0358416109628994,1.5869627973519962,2.8810999836809934,8.271247071794665,12.818978565606496,8.645576242658697,1.0640197407408847,8.41012409649011,10.221121343269576,10.087885479507818,4.082855998675912,7.491624785216734,5.5779480048342585,13.026580413334745,9.68644572533871,13.794937702642251,7.51697170434726,0.7097311957032071,2.744286686207121,4.764639071646654,9.722304633761787,8.559195606402152,10.396872746308976,0.45830703206814927,14.438399810201695,10.713465494173716,5.737969361773748,4.597996513565672,11.062814808226731,4.649196678118109,5.48708955527971,10.182550998772978,2.3676476547530534,11.117125662461401,11.31552505127826,12.121366484362948,5.807223088543325,9.507637222798714,2.5681512468855128,1.5664010876435985,1.8867183003690036,7.749795585800928,8.392425563795099,1.0334385920399558,1.0281442469134805,2.7331874944953913,8.926570216972992,0.3558824501579805,7.609288920181161,0.9850794351499859,4.143380150038941],"p":[0.1967129978600259,0.02995778874126147,0.18703337084700428,0.037896194601502266,0.020424028228367332,0.05357516947188987,0.07687162252029595,0.03874887427575198,0.09135698881248794,0.17930933298315163,0.04252344535612873,0.12015605761703685,0.09216014181224752,0.126925907076678,0.15997085334121133,0.1386183549526876,0.09616638201187895,0.17432313177741868,0.09012226375815287,0.12403729431529298,0.14778314906106962,0.15549008320994037,0.004249795711595272,0.15712503985073353,0.08933309648782109,0.0009392277471174993,0.1652965681330647,0.17140336160951739,0.11947672630588953,0.0019470179000127708,0.11689661522230779,0.13777984874026453,0.04102874304647335,0.012604443521371113,0.14438743770856566,0.08889776616297188,0.10907123203151095,0.18888565805383517,0.08403804090473073,0.037169026922700875,0.006574342387482135,0.01488398156861024,0.07144895671314387,0.057768630940540217,0.032142627365209675,0.15002171264234662,0.14454640210160755,0.1881091262266534,0.009462329653789459,0.12191082635142503,0.008790610095201323,0.06893316052788205,0.026671765697822772,0.04639073900707964,0.025126364273836767,0.03812788120662805,0.15463301702001148,0.09218174315362267,0.17690181494984578,0.03413582055657143,0.19368667958801958,0.1698214624627431,0.04226105304464607,0.09873509523405827,0.15511393005652752,0.19870022635806206,0.1643341594443883,0.044072370206399425,0.05977009133682061,0.19863703606863803,0.09249981709009575,0.14744986538234492,0.18861934497013932,0.17042689107557218,0.022923889536962696,0.14866217064204154,0.09322863852264685,0.05336969902155082,0.11650937378071934,0.1055415591236124,0.016843735476924283,0.1071788717692471,0.057641481920951865,0.06235369208634243,0.19282976186239462,0.11662601422720119,0.009210509568536463,0.07105384315057868,0.01572207523774596,0.08265940662287492,0.1124595685607833,0.14767799094747688,0.07461091021376208,0.07100506403411169,0.049123024889646864,0.05343188647177213,0.0629338740681872,0.1313696373446982,0.03909197283146964,0.07677423683113732,0.03664978419201801,0.1613108663164148,0.1993415850844248,0.06728581347080853,0.10167592970929516,0.12714837704015244,0.001991188726989579,0.11800733510996175,0.14565898596353707,0.13291498338093377,0.12449721758970617,0.17310260604172134,0.1117217971518242,0.16008098282974104,0.011839172508163243,0.01183713638814017,0.18642337202295722,0.0639216242037191,0.11650295357010317,0.18547573283381147,0.1694509805633914,0.1294402211209909,0.03289086645320114,0.1302096097888216,0.17778764392095892,0.1791383574027417,0.1359413105175291,0.16020321464245457,0.05283099707097741,0.18048358437680576,0.176168932488586,0.060630856692873804,0.1833060875742668,0.09046943059988295,0.13927671967875366,0.04089974145670814,0.14724161944423103,0.11572719351233074,0.010216778922931226,0.05638796796633501,0.051774199538057265,0.1362832155323624,0.03155989240896284,0.1716373815379736,0.01591313235471321,0.09300983039742583,0.11479247445775648,0.026495458806739605,0.016723367501737706,0.06280066572473246,0.1004626956816483,0.030685569633095478,0.046473003056256436,0.10267674053748857,0.03723101043736694,0.15268183982875028,0.09938134724382196,0.03482226321815154,0.10626616323022749,0.043580936975925424,0.038742616889181215,0.18161129778975013,0.1943467731789852,0.04844870669721098,0.06532755754468465,0.07203331554395619,0.1570550379173358,0.198829101626768,0.10932055402361276,0.11251440364015837,0.00990206496672088,0.18713148107551644,0.03429465913936016,0.13865206564726199,0.10791209097129345,0.17597832373084935,0.026958499706494624,0.08104149064897165,0.030652841338772288,0.17189560696104064,0.11777826083701233,0.03184296427639035,0.06302591784636472,0.1578612211049671,0.01020999301943979,0.17280991576178095,0.027885659090782867,0.07229417968205412,0.19357366007448282,0.1548470381878785,0.13811850337854362,0.09198474500844155,0.007279804148683855,0.016547209997961023,0.1154261279719814,0.03607658875487001,0.08571183969654955,0.12306269909851908,0.0049949776215154175,0.013812811918166147,0.03307069592137535,0.031039456514657227,0.10207514556227358,0.04301017530467042,0.07457690417748974,0.18974593703860365,0.19046322524639392,0.08400966940237803,0.04147130315671817,0.010111511951418973,0.05329337511558516,0.02090933868044216,0.1629502629084398,0.04765918128512157,0.009601923643248567,0.1763074010793076,0.16319749460096686,0.1757603391741309,0.054414058661843394,0.0016412808571945271,0.12582585410605326,0.1575483632580423,0.059707875735739525,0.1934617786110321,0.15493865027596754,0.1708636579933431,0.1667039473978867,0.13205258321703825,0.19188052696552008,0.1325171289936935,0.17288706938834286,0.0633826819443537,0.17577930253741292,0.004700463130927224,0.04096825537973836,0.18986147333920408,0.10385845665816579,0.16815110083975987,0.03577103211374939,0.13957803079139156,0.12643800941365205,0.03869083672263263,0.12615714626756686,0.05550481314906635,0.02105829858996429,0.09553707620084206,0.10560771407104053,0.10181983132251636,0.19190457367509,0.05060862573836431,0.024225795469280078,0.19417203490213555,0.08319952282291553,0.17522091753459673,0.11295783137289779,0.14124529273828576,0.12010276273095442,0.08336035139512084,0.16454362336477085,0.036893206572586344,0.014059840186089679,0.19756507354915734,0.05481643012762634,0.09775064058185534,0.03537088673111715,0.1432702014571345,0.11349278840351339,0.1698986577183133,0.18587744227766573,0.09683508876156521,0.16560166653178487,0.19842110759689638,0.1316594669777035,0.0997923727452193,0.11629612419090574,0.19993949937397684,0.0853137524679723,0.0867912169111762,0.06612615073189869,0.04210480801639696,0.13460380055277885,0.16869806335750204,0.04005832959200917,0.09512330748620364,0.10849041248463212,0.1763712231843957,0.09781346828550155,0.02896828781805425,0.19883680157122907,0.11233923457579209,0.13166792533310342,0.10691718468296654,0.038303847860414124,0.05569881775220811,0.1483724408722333,0.008883815552525,0.13430341415881833,0.1360901230341421,0.09322330167367375,0.006731461236591941,0.15625074110738835,0.0021955607121540324,0.1591267048647564,0.11812881883214064,0.17465483970231893,0.11155895497996263,0.1876393852295348,0.12722614369633925,0.08758515560321155,0.06872448152685999,0.08726352392661925,0.01861991026691743,0.1116483246786403,0.01758095834421569,0.026124300155809178,0.1848892066425931,0.04653346910397831,0.12002987075856293,0.013749405755823264,0.04548708252322107,0.15333101050508482,0.14883006126153814,0.07544356572820071,0.15694650514271663,0.18941689911849854,0.050762180808911816,0.04348148608215712,0.10452949003550632,0.022560433134425618,0.04774339156243173,0.0713543338560744,0.018235713031921685,0.19895372696311864,0.19090829375406454,0.032955995694457445,0.06896293734203565,0.18845502865404226,0.11891964312928471,0.01580418332918785,0.05596651139872995,0.08220527910371041,0.1334907855252192,0.15162695144862384,0.14720405592455582,0.1602671361827246,0.08235765905545973,0.12712048954189684,0.065247860942416,0.026625022201643714,0.16045585620227631,0.15462399867873053,0.1501283891048898,0.13699804896197043,0.018291136593353973,0.07086053266376613,0.13910578517129232,0.05208225281893402,0.02492350543335338,0.07476500658167003,0.16492169241279309,0.091529192914237,0.00576855072994027,0.0794425958846262,0.14611392363017722,0.12025636585303796,0.04377307125985644,0.07597026691210229,0.11795298905943677,0.070073586748796,0.16159431890413598,0.13603456764447253,0.1708712418377013,0.09451963519886064,0.17491410998197723,0.10488964796680672,0.10322547989583751,0.12415227042811,0.061486655907613354,0.07496135480236586,0.1959993663310364,0.1061383306845881,0.07929267657705781,0.09412670748845264,0.06915861234496883,0.18300372918284669,0.04900082228688212,0.03776631424406336,0.15560179135619592,0.04136113000318886,0.1079574371514942,0.08391345521754007,0.0174047705710318,0.030895882910072905,0.1175683488183656,0.12465129412789802,0.08965818767766778,0.14819814412898133,0.15381551603028787,0.04730627072768186,0.1928537749877345,0.13763173816207108,0.1492743133524775,0.07601074580147982,0.04368141809027857,0.14618144134459496,0.11630754973299595,0.07181099211440216,0.021069672673357822,0.16208865287650714,0.05503760264147833,0.01422389043739365,0.017253669788675687,0.19013190369303554,0.07118878617669591,0.13617438054979034,0.1341138835176952,0.09112486717965683,0.010367729535621395,0.06414223553430905,0.15352028725743608,0.15191357937626498,0.19605098329381604,0.033722771947976814,0.11729301530704556,0.14419409199636668,0.12343900905937066,0.195996650439802,0.04314010250259118,0.19405129841591698,0.16608072215103117,0.07802410649372914,0.1784567481728112,0.12058090938248336,0.15575688442614755,0.01459352143283641,0.1713387445899286,0.11933668758676196,0.1215303253002988,0.008065260837057631,0.04294070935594379,0.1487809505269173,0.15618281203272516,0.038775948933676176,0.09038149061630217,0.18581261037746677,0.15862574886641867,0.15481738820607022,0.005181817266138289,0.021327542273375234,0.07856565338594304,0.0896797843059911,0.11787060195040625,4.054612967125948e-5,0.19383991248667487,0.0794732952410934,0.09590908071741669,0.08649315058203695,0.17621756951689727,0.06115006422482652,0.021792950257013246,0.08086237804727121,0.10496087168640794,0.0866590929276414,0.12486983224600717,0.11110524073272582,0.05301784541441754,0.030198152582689586,0.06574929464598678,0.022185040917290035,0.01140236401601631,0.04632080825225349,0.04168399330258801,0.17092313105364948,0.13926042995644616,0.17019820938552163,0.07539908070083796,0.05848827446788923,0.15032525377265862,0.19160314578591936,0.16718087592941952,0.016930927829748078,0.1764622841996912,0.1455936321428113,0.1880480462812183,0.14294786825192976,0.02355362901314653,0.13017671751451415,0.16874741354689957,0.04965873324742818,0.1931947979801284,0.1251179776323423,0.10386965629065026,0.18087477496450252,0.0862726086222359,0.03857200405646064,0.036205710002338166,0.06055740680928561,0.19889488770296265,0.18012586426884014,0.1496063241821608,0.03327444727072817,0.04012280353614881,0.03201651831781325,0.09529510148363243,0.1155129092333167,0.01176023604396903,0.13366104572751514,0.002258664959875123,0.11334045347182693,0.10958261537985865,0.11170133137504142,0.17441094505979376,0.17062574336007208,0.08487778007290983,0.033739602542142456,0.1880644551935236,0.19879766436026053,0.16537130844392137,0.0949593386892354,0.13238297604594815,0.08290398844528145,0.017467842281069148,0.03514353664626731,0.14293231005131696,0.16211323352662443,0.0654935689826012,0.11215239554709928,0.08864339454478493,0.14394567737440758,0.15785631842741862,0.08338687787734873,0.131576626954993,0.06860635896004497,0.07818198447634206,0.12490968580921567,0.02098794008454723,0.07718494846153955,0.06452728151726417,0.038182786028564,0.1937801900352703,0.09324491459750127,0.17246239450722534,0.15140869592282985,0.13402897785157872,0.13243304069317455,0.1399723922009795,0.11060424183088013,0.11186795125696261,0.010414569843145883,0.007462562325406364,0.032162517064426945,0.12395135678394903,0.1975620028210986,0.05426768613817088,0.14169219199735647,0.19806426980797315,0.052533867345822174,0.025153545416333457,0.1567842564024433,0.16174850197616025,0.04587373976206632,0.1362906684423588,0.10137909597312347,0.1611650924807394,0.17931615161881231,0.12173651616756437,0.049177773840788454,0.11268343931091773,0.05966263341283345,0.02822109067697496,0.08749600313463697,0.1629952156039999,0.1479398182125498,0.07549497297796522,0.039862681650611936,0.020623690296543675,0.04060647479621054,0.17939984564575964,0.08169993487237477,0.012086033297815879,0.08101513040093825,0.0801837081694322,0.14738528611464852,0.08496927167412092,0.1458845485629551,0.0778267426984069,0.11091005094705474,0.1538733271821746,0.005395388217351549,0.087247812951632,0.07623261028877777,0.131867057745106,0.1836780565469387,0.12381233613647336,0.0836458192276512,0.09315245034846283,0.1246268463055663,0.06884316917655653,0.13746967542794772,0.06597471301186335,0.15653988570789337,0.009126861569767053,0.0366378362024689,0.020284046299375105,0.11273962433189647,0.0056990219520837385,0.10595426942395646,0.1635137717165802,0.19353568450918088,0.0693012769423385,0.01978476121437658,0.07829285314230927,0.1171202999342349,0.15033118102354892,0.18387820462087376,0.1202679561409465,0.07026592939891062,0.15193018584377593,0.023963526384222212,0.11857603839740256,0.06374096788459131,0.07234997982536764,0.17284020031757374,0.026868436083199266,0.02719272604808789,0.05842869219265428,0.1528381899389185,0.1380586453748022,0.0504121890211319,0.18773819437811629,0.014489284286465943,0.19209736363793556,0.005616159638007901,0.0802554729127078,0.1978803455375917,0.12547940408894384,0.07666773994938608,0.15470544119468055,0.15271316359598255,0.15821297852804495,0.03687083869409263,0.06344313152195835,0.062179880522884506,0.027363955293801645,0.13394335109562602,0.048807832605662904,0.15508227684903414,0.11152469462515541,0.14909773367205356,0.14529956012824577,0.07640894993440495,0.023619518797673367,0.026613249713552237,0.09964577756453186,0.0809146608920667,0.08887521666837905,0.09697089103257422,0.15222471504087226,0.15234360828009447,0.1100599572524784,0.05065652466126443,0.10542523775000096,0.07787213577427328,0.10937551250168026,0.05900392489018054,0.015105474372638428,0.13905605615358851,0.015979053965074066,0.1960411528487224,0.11603510128431882,0.10669236209763758,0.05979040707161842,0.03621205882127487,0.03848584007437231,0.1472593526300431,0.06050894309015029,0.13063296302910793,0.10682076790071014,0.19358850730538127,0.02144355647891101,0.12539734958056373,0.009865989845885626,0.13559215635430108,0.014370723746752035,0.06521625088964651,0.0946773700649179,0.09337779429338254,0.015785464130136973,0.10817272830287719,0.15204335175988137,0.17440746058987525,0.1561596725025186,0.051609175726931335,0.02736472872744096,0.15506348890152954,0.18672659463330918,0.03739946152868336,0.18147311908943162,0.0751305513151432,0.04302843463521771,0.18231980061864586,0.009015949253952105,0.006057831884633425,0.04382218907485935,0.15089205516531679,0.1378427847174725,0.1587844373028776,0.09614606813557094,0.06943933174026272,0.1006258003567563,0.09804814422878937,0.1622216384692614,0.1575512556601192,0.15853488180835434,0.16908844204345586,0.1758679068912814,0.03666399558928313,0.055282875131052345,0.13518624977195565,0.1378787106184911,0.1879355231090064,0.0098078890924584,0.025292430764316576,0.1568068896496654,0.04100538351698586,0.1199612629873311,0.1847098352889016,0.15592726467081755,0.011383170652221787,0.02925632939525871,0.014268079037748783,0.0024762697308120087,0.052268199252648584,0.0374947668327585,0.11605095393691821,0.15858489784558968,0.042388071836623055,0.03785148644530492,0.1253827714694066,0.13839253772729995,0.10511085486994945,0.1633894418917611,0.08974766685951092,0.056726159069197736,0.1351703242731845,0.002887722588058495,0.18629326066530047,0.142796468611824,0.13991336833897447,0.039620283051640295,0.1808680361537685,0.09469151017969635,0.11086699909163628,0.037294311319969166,0.08893298716212912,0.06814373323409138,0.15844575831028568,0.07701667958934602,0.12151022512544346,0.19471779434408298,0.004564871109577373,0.15475010100143463,0.14790700353748018,0.11266814469360967,0.10536543258575551,0.050304822023064015,0.12263249423141587,0.13046730946536736,0.07179214078620655,0.07264634329616726,0.09997443255826144,0.05677522472441843,0.1924138665307733,0.1777926933641293,0.07750679315584917,0.005481933023270713,0.1320002297533996,0.0326043536287274,0.16006613228732572,0.0927713632689887,0.07670104195935452,0.062046403639177954,0.14679476922204326,0.14508955880752988,0.01658353196086484,0.0699135532000502,0.10766155861417617,0.12245132953480678,0.06923840923307423,0.15878285803756742,0.18253344257940818,0.16536224948833095,0.012334251599470615,0.03097170736520325,0.19800982929019617,0.04299081447417894,0.13519676236411096,0.10616391096343328,0.023275385083004085,0.11949648776337757,0.05177895454857593,0.13120314842421685,0.09045554789621774,0.13232498993985264,0.19027682400612853,0.01709944534734156,0.15684237730774067,0.1144814949157461,0.1629127726050139,0.18967779043635993,0.09650291583861358,0.08166730282651553,0.026142225494827455,0.02062964230816755,0.04338444488806364,0.1707207321961989,0.1607646738687242,0.15244699771835643,0.08056644130720417,0.0473003252904205,0.1541410534776591,0.020040491533408436,0.18277974829318194,0.08908982396719485,0.1776988255821471,0.03696281612961303,0.15078586771103444,0.035292177830439767,0.03779790150759395,0.1797620816504961,0.12042266267148337,0.18898245506334682,0.09711175958602279,0.10501249872530707,0.10044160074436333,0.10258627784924293,0.13780748540592871,0.05593778136977954,0.18529870088128628,0.009583465545257887,0.08771317455210906,0.02384898163429927,0.013403196487764824,0.10550594667662097,0.09685145158694862,0.09366100762627445,0.1915923645373806,0.039709718308849375,0.05333071992610905,0.036841510531667114,0.0025353481410720583,0.13273561766436917,0.0065748968906218066,0.14911721561047844,0.16795245050510516,0.05454315156880472,0.0740453662432703,0.13891194963471226,0.14547487701109502,0.040636952834092056,0.044380206422417294,0.11219112025809218,0.14425190301787524,0.10812098974211413,0.07056426789460839,0.17363874442289304,0.1482953991018112,0.09665377374660902,0.011496503109886503,0.11120901643489073,0.042493985152723825,0.09357116926596701,0.1498166990088254,0.10749484219550967,0.022415156650585157,0.14660570130284434,0.13773616942284841,0.0008199436252267046,0.16020096914291068,0.18006092797184087,0.14503162421588076,0.14529632489408506,0.1972668049602692,0.07857207409149224,0.08879550934971535,0.10214592233555392,0.1977110691212531,0.04920295609128816,0.04249960606930006,0.17280869018961692,0.11178000324691127,0.1833254715125715,0.17109765455543596,0.045084954385383874,0.006005074127315169,0.1799613689009986,0.02774365791526954,0.011128194135092563,0.06130162666059289,0.17300747252479148,0.12538827306571926,0.15561805065511966,0.033760449427517436,0.1410830395460493,0.11796103611233147,0.09738672383647917,0.0872843929787619,0.05120925640744667,0.10968373799618099,0.030545648758162305,0.18600582599017046,0.08883927018403255,0.07152203159872501,0.03800043876080204,0.07846289669799376,0.03048022241116768,0.08533796442462323,0.15540609887784448,0.195693039078903,0.005851786141583793,0.12785975673894476,0.11816905497996869,0.09273999651879948,0.06464743208212301,0.1522976181882867,0.07644784556088871,0.0035585984023334127,0.02631584650887744,0.1233398340856239,0.17368706682094098,0.08435149876455804,0.1532405973242471,0.11847106046896934,0.010105004766372085,0.13875449924651045,0.1423047914850776,0.09493023871767009,0.052072481534573806,0.0780382020546361,0.11045399305545,0.014555674593305935,0.016410378059488594,0.055923927812357555,0.011493866507717733,0.02439045491842644,0.15545618130594657,0.14659488693609232,0.12818048589422473,0.16993665485463347,0.008618403125860619,0.17545650911454758,0.00031704276942119415,0.04612578754328483,0.11404409383482764,0.17318365821986048,0.1864565417293451,0.024741235039279986,0.1194377675443878,0.12681612428783193,0.0733861791886076,0.11686179505354657,0.004636364435563811,0.19140688739945844,0.06430513004273757,0.012842384482566827,0.1759651053712653,0.1676983205920411,0.11659417769911218,0.1534312062166639,0.17485402841885733,0.06902101048267113,0.07655583297040819,0.1348759538006862,0.0399047697612728,0.10058443158989504,0.14730763358242105,0.09972131551782844,0.027601864789729726,0.10198457394701786,0.1651026672962395,0.13374111970930175,0.1032065724443072,0.08335522085465717,0.05921357466862629,0.09911331285602767,0.05353286808558449,0.0524058674558916,0.1587509470388231,0.14166812622343924,0.1390086637451545,0.16787323400758203,0.1429044829877166,0.06114817640701911,0.0972935871205785,0.13918773929155656,0.0836329157666098,0.1856773455899827,0.1185332707144978,0.1195405249479217,0.002719524232968018],"n":[9.0,1.0,5.0,20.0,11.0,18.0,19.0,5.0,13.0,6.0,15.0,4.0,5.0,12.0,4.0,13.0,15.0,14.0,12.0,4.0,20.0,11.0,8.0,9.0,2.0,5.0,5.0,13.0,15.0,10.0,7.0,17.0,12.0,15.0,1.0,11.0,13.0,13.0,2.0,2.0,1.0,4.0,10.0,7.0,13.0,0.0,14.0,16.0,13.0,6.0,13.0,9.0,11.0,3.0,2.0,5.0,0.0,13.0,10.0,0.0,12.0,9.0,5.0,9.0,9.0,11.0,5.0,14.0,2.0,19.0,5.0,5.0,6.0,14.0,16.0,15.0,20.0,12.0,4.0,20.0,3.0,0.0,0.0,10.0,7.0,4.0,15.0,20.0,0.0,8.0,11.0,8.0,16.0,7.0,4.0,9.0,6.0,2.0,10.0,1.0,13.0,15.0,11.0,9.0,14.0,18.0,19.0,18.0,1.0,10.0,3.0,18.0,9.0,0.0,11.0,14.0,13.0,19.0,1.0,7.0,2.0,19.0,2.0,0.0,5.0,12.0,7.0,19.0,10.0,14.0,14.0,12.0,8.0,12.0,4.0,19.0,3.0,12.0,14.0,15.0,2.0,8.0,10.0,0.0,2.0,3.0,7.0,6.0,18.0,15.0,14.0,2.0,13.0,1.0,5.0,13.0,11.0,7.0,1.0,7.0,9.0,7.0,10.0,5.0,10.0,12.0,7.0,15.0,16.0,14.0,18.0,5.0,4.0,19.0,1.0,1.0,3.0,10.0,13.0,16.0,15.0,8.0,9.0,20.0,16.0,18.0,2.0,1.0,14.0,16.0,15.0,6.0,19.0,17.0,12.0,0.0,16.0,10.0,13.0,6.0,4.0,2.0,7.0,2.0,14.0,1.0,14.0,20.0,16.0,17.0,7.0,10.0,11.0,7.0,18.0,5.0,7.0,10.0,14.0,2.0,8.0,13.0,4.0,18.0,19.0,14.0,20.0,9.0,15.0,17.0,16.0,4.0,12.0,13.0,4.0,19.0,2.0,15.0,15.0,6.0,16.0,2.0,4.0,1.0,15.0,14.0,3.0,6.0,14.0,18.0,8.0,19.0,6.0,15.0,14.0,16.0,5.0,6.0,15.0,3.0,5.0,12.0,9.0,19.0,4.0,10.0,7.0,13.0,14.0,15.0,13.0,8.0,6.0,20.0,12.0,16.0,12.0,11.0,11.0,10.0,11.0,3.0,19.0,9.0,12.0,1.0,18.0,15.0,4.0,13.0,19.0,13.0,6.0,8.0,19.0,10.0,19.0,20.0,15.0,11.0,9.0,14.0,1.0,18.0,10.0,1.0,8.0,4.0,12.0,12.0,7.0,3.0,16.0,15.0,17.0,4.0,12.0,5.0,3.0,0.0,4.0,1.0,3.0,2.0,6.0,8.0,14.0,14.0,5.0,5.0,9.0,5.0,20.0,4.0,18.0,8.0,6.0,9.0,14.0,0.0,8.0,8.0,17.0,4.0,13.0,1.0,19.0,13.0,5.0,12.0,0.0,9.0,18.0,10.0,3.0,10.0,2.0,1.0,2.0,19.0,13.0,12.0,11.0,19.0,5.0,6.0,12.0,16.0,20.0,7.0,10.0,8.0,11.0,2.0,19.0,19.0,7.0,12.0,6.0,16.0,9.0,16.0,9.0,11.0,11.0,5.0,0.0,6.0,13.0,13.0,16.0,11.0,18.0,5.0,9.0,4.0,7.0,14.0,6.0,8.0,4.0,13.0,5.0,1.0,1.0,5.0,5.0,18.0,2.0,1.0,8.0,15.0,18.0,13.0,8.0,2.0,12.0,9.0,12.0,16.0,17.0,16.0,10.0,6.0,17.0,17.0,17.0,8.0,8.0,11.0,11.0,8.0,15.0,16.0,6.0,16.0,6.0,17.0,8.0,18.0,13.0,14.0,14.0,2.0,4.0,13.0,3.0,2.0,12.0,14.0,17.0,17.0,4.0,3.0,15.0,4.0,9.0,15.0,14.0,4.0,16.0,12.0,4.0,15.0,8.0,1.0,10.0,12.0,4.0,13.0,4.0,15.0,13.0,6.0,17.0,19.0,0.0,5.0,17.0,3.0,9.0,12.0,14.0,6.0,13.0,7.0,8.0,4.0,17.0,2.0,12.0,2.0,4.0,11.0,20.0,16.0,3.0,4.0,10.0,15.0,12.0,14.0,19.0,17.0,17.0,15.0,16.0,12.0,18.0,15.0,6.0,10.0,12.0,9.0,20.0,16.0,0.0,10.0,19.0,17.0,5.0,6.0,9.0,16.0,7.0,7.0,17.0,18.0,8.0,2.0,15.0,8.0,5.0,16.0,18.0,14.0,1.0,5.0,17.0,20.0,18.0,15.0,4.0,2.0,12.0,10.0,9.0,6.0,1.0,18.0,0.0,0.0,0.0,2.0,5.0,15.0,12.0,6.0,16.0,3.0,9.0,11.0,13.0,7.0,18.0,13.0,19.0,11.0,8.0,9.0,19.0,8.0,13.0,1.0,17.0,18.0,10.0,13.0,13.0,15.0,0.0,17.0,14.0,16.0,6.0,10.0,10.0,7.0,17.0,19.0,4.0,10.0,13.0,2.0,3.0,6.0,4.0,20.0,6.0,1.0,17.0,15.0,14.0,11.0,5.0,5.0,2.0,4.0,1.0,8.0,8.0,16.0,14.0,17.0,8.0,5.0,2.0,13.0,2.0,19.0,5.0,8.0,20.0,4.0,14.0,8.0,19.0,8.0,7.0,6.0,13.0,3.0,6.0,5.0,8.0,6.0,2.0,12.0,1.0,14.0,3.0,12.0,6.0,19.0,3.0,9.0,8.0,19.0,15.0,10.0,3.0,2.0,9.0,0.0,17.0,10.0,0.0,10.0,3.0,3.0,18.0,12.0,10.0,9.0,3.0,8.0,20.0,15.0,1.0,20.0,17.0,11.0,4.0,2.0,9.0,13.0,10.0,9.0,14.0,13.0,2.0,13.0,13.0,5.0,2.0,3.0,10.0,18.0,19.0,1.0,3.0,8.0,9.0,10.0,9.0,4.0,2.0,1.0,10.0,19.0,17.0,20.0,16.0,12.0,4.0,5.0,18.0,16.0,11.0,6.0,8.0,16.0,2.0,1.0,5.0,2.0,8.0,14.0,16.0,7.0,9.0,19.0,13.0,1.0,8.0,10.0,10.0,12.0,10.0,13.0,6.0,10.0,15.0,11.0,19.0,14.0,3.0,13.0,5.0,17.0,1.0,2.0,8.0,19.0,15.0,1.0,0.0,12.0,10.0,1.0,12.0,3.0,18.0,5.0,6.0,18.0,4.0,12.0,4.0,10.0,8.0,3.0,2.0,1.0,0.0,5.0,17.0,4.0,5.0,16.0,5.0,3.0,12.0,16.0,5.0,3.0,19.0,5.0,8.0,10.0,1.0,12.0,14.0,19.0,9.0,19.0,16.0,6.0,10.0,11.0,7.0,13.0,2.0,18.0,9.0,17.0,8.0,9.0,9.0,19.0,20.0,13.0,20.0,15.0,12.0,17.0,18.0,9.0,10.0,0.0,11.0,11.0,14.0,2.0,0.0,15.0,16.0,14.0,6.0,8.0,6.0,10.0,5.0,17.0,2.0,13.0,1.0,1.0,5.0,19.0,17.0,20.0,14.0,11.0,9.0,12.0,12.0,14.0,14.0,19.0,15.0,10.0,6.0,6.0,3.0,1.0,12.0,14.0,10.0,8.0,17.0,9.0,3.0,14.0,15.0,15.0,6.0,7.0,8.0,1.0,14.0,0.0,16.0,13.0,7.0,2.0,13.0,14.0,6.0,5.0,13.0,6.0,4.0,7.0,7.0,0.0,8.0,7.0,4.0,12.0,16.0,12.0,1.0,1.0,9.0,18.0,6.0,15.0,11.0,5.0,14.0,19.0,18.0,5.0,15.0,13.0,18.0,4.0,17.0,6.0,20.0,15.0,12.0,7.0,15.0,10.0,19.0,1.0,15.0,15.0,7.0,9.0,11.0,5.0,9.0,14.0,1.0,16.0,6.0,20.0,7.0,17.0,2.0,0.0,13.0,14.0,13.0,7.0,13.0,7.0,15.0,8.0,8.0,3.0,20.0,5.0,10.0,10.0,5.0,10.0,12.0,8.0,16.0,17.0,1.0,18.0,7.0,12.0,15.0,15.0,18.0,4.0,7.0,19.0,3.0,19.0,4.0,8.0,2.0,7.0,15.0,19.0,2.0,2.0,17.0,13.0,5.0,2.0,9.0,14.0,17.0,5.0,9.0,2.0,20.0,11.0,14.0,5.0,5.0,6.0,4.0,10.0,7.0,12.0,10.0,8.0,20.0,12.0,9.0,4.0,5.0,10.0,2.0,18.0,17.0,7.0,15.0,4.0,19.0,7.0]}
},{}],28:[function(require,module,exports){
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

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 10, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 10, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided an `x` greater than or equal to `n`, the function returns `1` (provided `n` and `p` are valid)', function test( t ) {
	var y = cdf( PINF, 20, 0.5 );
	t.equal( y, 1.0, 'returns 1' );

	y = cdf( 200, 20, 0.5 );
	t.equal( y, 1.0, 'returns 1' );

	y = cdf( 21, 20, 0.5 );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a negative number for `x` and a valid `n` and `p`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -10.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a `n` which is not a nonnegative integer, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 1.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, -2, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, -1, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, PINF, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside of `[0,1]`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 20, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 20, 1.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 20, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 20, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 250.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `n` and small `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 40.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 50.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/binomial/cdf/test/test.cdf.js")
},{"./../lib":22,"./fixtures/julia/high_high.json":24,"./fixtures/julia/high_small.json":25,"./fixtures/julia/small_high.json":26,"./fixtures/julia/small_small.json":27,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float64-eps":170,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186,"tape":250}],29:[function(require,module,exports){
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
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 20, 0.5 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 0.5 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 20, NaN );
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

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `1` when provided a `x` greater or equal to `n`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 20, 0.5 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	y = cdf( 200.0 );
	t.equal( y, 1.0, 'returns 1' );

	y = cdf( 20.0 );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `0` when provided a negative number for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 20, 0.5 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -10.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a `n` which is not a nonnegative integer, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 20.5, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -10, 0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, 0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, 0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside `[0,1]`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 20, 1.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 20, -0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 20, PINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 20, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( n[i], p[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 250.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `n` and small `p`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var n;
	var p;
	var i;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( n[i], p[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 40.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( n[i], p[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 50.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( n[i], p[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/binomial/cdf/test/test.factory.js")
},{"./../lib/factory.js":21,"./fixtures/julia/high_high.json":24,"./fixtures/julia/high_small.json":25,"./fixtures/julia/small_high.json":26,"./fixtures/julia/small_small.json":27,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float64-eps":170,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186,"tape":250}],30:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/binomial/cdf/test/test.js")
},{"./../lib":22,"tape":250}],31:[function(require,module,exports){
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
* @example
* var v = abs( 2.0 );
* // returns 2.0
* @example
* var v = abs( 0.0 );
* // returns 0.0
* @example
* var v = abs( -0.0 );
* // returns 0.0
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

},{}],32:[function(require,module,exports){
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

},{"./abs.js":31}],33:[function(require,module,exports){
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
* @example
* var v = asin( Math.PI/2.0 );
* // returns ~1.0
* @example
* var v = asin( -Math.PI/6.0 );
* // returns ~-0.5
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/base/tools/evalrational":140,"@stdlib/math/constants/float64-fourth-pi":173}],34:[function(require,module,exports){
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

},{"./asin.js":33}],35:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_52_0/boost/math/special_functions/beta.hpp}.
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
var gamma = require( '@stdlib/math/base/special/gamma' );
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
* @example
* var v = beta( 1, 1 );
* // returns 1
* @example
* var v = beta( -1, 2 );
* // returns NaN
* @example
* var v = beta( 5, 0.2 );
* // returns ~3.382
* @example
* var v = beta( 4, 1 );
* // returns 0.25
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
	}

	// Special cases:
	if ( c === a && b < EPSILON ) {
		return gamma( b );
	} else if ( c === b && a < EPSILON ) {
		return gamma( a );
	}

	// Shift to a and b > 1 if required:
	if ( a < 1.0 ) {
		prefix *= c / a;
		c += 1.0;
		a += 1.0;
	}
	if ( b < 1.0 ) {
		prefix *= c / b;
		c += 1.0;
		b += 1.0;
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
	res = lanczosSumExpGScaled( a ) * lanczosSumExpGScaled( b );
	res /= lanczosSumExpGScaled( c );
	ambh = a - 0.5 - b;
	if ( abs( b * ambh ) < ( cgh * 100 ) && a > 100 ) {
		// Special case where the base of the power term is close to 1
		// compute (1+x)^y instead:
		res *= exp( ambh * log1p( -b / cgh ) );
	} else {
		res *= pow( agh / cgh, a - 0.5 - b );
	}
	if ( cgh > 1e10 ) {
		// This avoids possible overflow, but appears to be marginally less accurate:
		res *= pow( (agh / cgh) * (bgh / cgh), b);
	} else {
		res *= pow((agh * bgh) / (cgh * cgh), b);
	}
	res *= sqrt( E / bgh);
	// If a and b were originally less than 1 we need to scale the result:
	res *= prefix;
	return res;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/gamma":79,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/base/tools/evalrational":140,"@stdlib/math/constants/float64-e":169,"@stdlib/math/constants/float64-eps":170}],36:[function(require,module,exports){
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

},{"./beta.js":35}],37:[function(require,module,exports){
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

var factorial = require( '@stdlib/math/base/special/factorial' );
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );
var full_igamma_prefix = require( './full_igamma_prefix.js' );
var regularised_gamma_prefix = require( './regularised_gamma_prefix.js' );
var tgamma_delta_ratio = require( './tgamma_delta_ratio.js');


// MAIN //

/**
* This is DiDonato and Morris's BGRAT routine, see Eq's 9 through 9.6.
*
* @private
*/
function beta_small_b_large_a_series( a, b, x, y, s0, mult, normalised ) {
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
	t = a + bm1 / 2.0;
	if ( y < 0.35 ) {
		lx = log1p( -y );
	} else {
		lx = ln( x );
	}
	u = -t * lx;
	// And from from 9.2:
	h = regularised_gamma_prefix( b, u );
	if ( h <= MIN_VALUE ) {
		return s0;
	}
	if ( normalised ) {
		prefix = h / tgamma_delta_ratio( a, b );
		prefix /= pow( t, b );
	} else {
		prefix = full_igamma_prefix( b, u ) / pow( t, b );
	}
	prefix *= mult;
	// now we need the quantity Pn, unfortunatately this is computed
	// recursively, and requires a full history of all the previous values
	// so no choice but to declare a big table and hope it's big enough...
	//
	p = new Array( 30 );
	p[ 0 ] = 1;  // see 9.3.
	// Now an initial value for J, see 9.6:

	// gammainc( u, b, regularized, upper )
	j = gammainc( u, b, true, true );
	j /= h;
	// Now we can start to pull things together and evaluate the sum in Eq 9:
	sum = s0 + prefix * j; // Value at N = 0
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
			mbn = m * b - n;
			p[ n ] += mbn * p[ n-m ] / factorial( tmp1 );
			tmp1 += 2;
		}
		p[ n ] /= n;
		p[ n ] += bm1 / factorial( tnp1 );
		// Now we want Jn from Jn-1 using Eq 9.6:
		j = ( b2n * (b2n + 1.0) * j + (u + b2n + 1.0) * lxp ) / t4;
		lxp *= lx2;
		b2n += 2.0;
		// Pull it together with Eq 9:
		r = prefix * p[ n ] * j;
		sum += r;
		if ( r > 1.0 ) {
			if ( abs( r ) < abs( EPSILON * sum ) ) {
				break;
			}
		} else {
			if ( abs( r / EPSILON ) < abs( sum ) ) {
				break;
			}
		}
	}
	return sum;
} // end FUNCTION beta_small_b_large_a_series()


// EXPORTS //

module.exports = beta_small_b_large_a_series;

},{"./full_igamma_prefix.js":40,"./regularised_gamma_prefix.js":49,"./tgamma_delta_ratio.js":51,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/factorial":75,"@stdlib/math/base/special/gammainc":88,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/pow":108,"@stdlib/math/constants/float64-eps":170,"@stdlib/math/constants/float64-smallest-normal":187}],38:[function(require,module,exports){
'use strict';

// MODULES //

var ibeta_imp = require( './ibeta_imp.js' );


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
*/
function betainc( x, a, b, regularized, upper ) {
	if ( regularized !== false ) {
		return upper ? ibeta_imp( a, b, x, true, true ) : ibeta_imp( a, b, x, false, true );
	}
	return upper ? ibeta_imp( a, b, x, true, false ) : ibeta_imp( a, b, x, false, false );
} // end FUNCTION betainc()


// EXPORTS //

module.exports = betainc;

},{"./ibeta_imp.js":43}],39:[function(require,module,exports){
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
*/
function binomialCCDF( n, k, x, y ) {
	var start_term;
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
		// First term underflows so we need to start at the mode of the
		// distribution and work outwards:
		start = floor( n * x );
		if ( start <= k + 1 ) {
			start = floor( k + 2 );
		}
		result = pow(x, start) * pow(y, n - start) * binomcoef( floor(n), floor(start) );
		if ( result === 0 ) {
			// OK, starting slightly above the mode didn't work,
			// we'll have to sum the terms the old fashioned way:
			for ( i = start - 1; i > k; --i ) {
				result += pow( x, i ) * pow( y, n - i ) * binomcoef( floor(n), floor(i) );
			}
		} else {
			term = result;
			start_term = result;
			for( i = start - 1; i > k; --i ) {
				term *= ((i + 1) * y) / ((n - i) * x);
				result += term;
			}
			term = start_term;
			for(  i = start + 1; i <= n; ++i ) {
				term *= (n - i + 1) * x / (i * y);
				result += term;
			}
		}
	}
	return result;
} // end FUNCTION binomialCCDF()


// EXPORTS

module.exports = binomialCCDF;

},{"@stdlib/math/base/special/binomcoef":55,"@stdlib/math/base/special/floor":77,"@stdlib/math/base/special/pow":108,"@stdlib/math/constants/float64-smallest-normal":187}],40:[function(require,module,exports){
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
function full_igamma_prefix( a, z ) {
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
} // end FUNCTION full_igamma_prefix()


// EXPORTS //

module.exports = full_igamma_prefix;

},{"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/pow":108,"@stdlib/math/constants/float64-max-ln":180,"@stdlib/math/constants/float64-min-ln":183}],41:[function(require,module,exports){
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

var ibeta_power_terms = require( './ibeta_power_terms.js' );


// MAIN //

/**
* Computes the difference between ibeta(a,b,x) and ibeta(a+k,b,x):
*
* @private
*/
function ibeta_a_step( a, b, x, y, k, normalised, pderiv ) {
	var prefix;
	var term;
	var sum;
	var i;

	prefix = ibeta_power_terms( a, b, x, y, normalised );
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
	for( i = 0; i < k-1; ++i ) {
		term *= (a+b+i) * x / (a+i+1.0);
		sum += term;
	}
	prefix *= sum;
	return prefix;
} // end FUNCTION ibeta_a_step()


// EXPORTS

module.exports = ibeta_a_step;

},{"./ibeta_power_terms.js":44}],42:[function(require,module,exports){
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
var ibeta_power_terms = require( './ibeta_power_terms.js' );


// MAIN //

/**
* Continued fraction for the incomplete beta:
*
* @private
*/
function ibeta_fraction2_t( a, b, x, y ) {
	var m = 0;
	return function next() {
		var denom;
		var aN;
		var bN;

		aN = (a + m - 1) * (a + b + m - 1) * m * (b - m) * x * x;
		denom = (a + 2 * m - 1);
		aN /= denom * denom;

		bN = m;
		bN += (m * (b - m) * x) / (a + 2*m - 1);
		bN += ( (a + m) * ( a * y - b * x + 1 + m *(2 - x) ) ) / (a + 2*m + 1);

		++m;
		return [ aN, bN ];
	};
} // end FUNCTION ibeta_fraction2_t()


/**
* Evaluate the incomplete beta via the continued fraction representation.
*
* @private
*/
function ibeta_fraction2( a, b, x, y, normalised, pderiv ) {
	var result;
	var fract;
	var f;

	result = ibeta_power_terms( a, b, x, y, normalised );
	if ( pderiv ) {
		pderiv.value = result;
	}
	if ( result === 0.0 ) {
		return result;
	}
	f = ibeta_fraction2_t( a, b, x, y );
	fract = continuedFraction( f, {
		'keep': true
	});
	return result / fract;
} // end FUNCTION ibeta_fraction2()


// EXPORTS

module.exports = ibeta_fraction2;

},{"./ibeta_power_terms.js":44,"@stdlib/math/base/tools/continued-fraction":134}],43:[function(require,module,exports){
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
var beta_small_b_large_a_series = require( './beta_small_b_large_a_series.js' );
var rising_factorial_ratio = require( './rising_factorial_ratio.js' );
var ibeta_power_terms = require( './ibeta_power_terms.js' );
var ibeta_fraction2 = require( './ibeta_fraction2.js');
var binomial_ccdf = require( './binomial_ccdf.js' );
var ibeta_a_step = require( './ibeta_a_step.js' );
var ibeta_series = require( './ibeta_series.js' );


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
function ibeta_imp( a, b, x, invert, normalised, pderiv ) {
	// jshint maxstatements: 400
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
	} else {
		if ( a <= 0 || b <= 0 ) {
			return NaN;
		}
	 }
	if ( x === 0 ) {
		if ( pderiv ) {
			pderiv.value = (a === 1) ? 1 : (a < 1) ? MAX_FLOAT64 / 2 : MIN_FLOAT64 * 2;
		}
		return invert ? (normalised ? 1.0 : beta(a, b) ) : 0.0;
	}
	if ( x === 1 ) {
		if ( pderiv ) {
			pderiv.value = (b === 1) ? 1 : (b < 1) ? MAX_FLOAT64 / 2 : MIN_FLOAT64 * 2;
		}
		return invert === 0 ? (normalised ? 1.0 : beta(a, b)) : 0.0;
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
			p = invert ? -expm1(a * log1p(-y)) : exp(a * log1p(-y));
		} else {
			p = invert ? -( pow( x, a ) - 1 ) : pow( x, a );
	 	}
		if( !normalised ) {
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
			if( (a >= min( 0.2, b ) ) || ( pow(x, a) <= 0.9 ) ) {
				if ( !invert ) {
					fract = ibeta_series(a, b, x, 0, normalised, pderiv, y );
				} else {
					fract = -(normalised ? 1 : beta( a, b ) );
					invert = false;
					fract = -ibeta_series(a, b, x, fract, normalised, pderiv, y );
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
					if ( !invert ) {
						fract = ibeta_series( a, b, x, 0, normalised, pderiv, y );
					} else {
						fract = -( normalised ? 1.0 : beta( a, b ) );
						invert = false;
						fract = -ibeta_series( a, b, x, fract, normalised, pderiv, y );
					}
				} else {
					// Sidestep on a, and then use the series representation:
					if ( !normalised ) {
						prefix = rising_factorial_ratio( a + b, a, 20 );
					} else {
						prefix = 1;
					}
					fract = ibeta_a_step( a, b, x, y, 20, normalised, pderiv );
					if ( !invert ) {
						fract = beta_small_b_large_a_series( a + 20, b, x, y, fract, prefix, normalised );
					} else {
						fract -= ( normalised ? 1 : beta( a, b ) );
						invert = false;
						fract = -beta_small_b_large_a_series( a + 20, b, x, y, fract, prefix, normalised );
					}
				}
			}
		} else {
			// One of a, b < 1 only:
			if ( b <= 1 || (x < 0.1) && ( pow(b * x, a) <= 0.7 ) ) {
				if ( !invert ) {
					fract = ibeta_series( a, b, x, 0, normalised, pderiv, y );
				} else {
					fract = -( normalised ? 1 : beta( a, b ) );
					invert = false;
					fract = -ibeta_series( a, b, x, fract, normalised, pderiv, y );
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
					if (!invert) {
						fract = ibeta_series(a, b, x, 0, normalised, pderiv, y );
					} else {
						fract = -(normalised ? 1 : beta( a, b ));
						invert = false;
						fract = -ibeta_series(a, b, x, fract, normalised, pderiv, y );
					}
				}
				else if ( a >= 15 ) {
					if(!invert) {
						fract = beta_small_b_large_a_series( a, b, x, y, 0, 1, normalised );
					} else {
						fract = -(normalised ? 1 : beta( a, b ));
						invert = false;
						fract = -beta_small_b_large_a_series( a, b, x, y, fract, 1, normalised );
					}
				}
				else {
					// Sidestep to improve errors:
					if ( !normalised ) {
						prefix = rising_factorial_ratio( a + b, a, 20 );
					} else {
						prefix = 1;
					}
					fract = ibeta_a_step( a, b, x, y, 20, normalised, pderiv );
					if ( !invert ) {
						fract = beta_small_b_large_a_series( a + 20, b, x, y, fract, prefix, normalised );
					} else {
						fract -= ( normalised ? 1 : beta( a, b ) );
						invert = false;
						fract = -beta_small_b_large_a_series( a + 20, b, x, y, fract, prefix, normalised );
					}
				}
			}
		}
	} else {
		// Both a,b >= 1:
		if ( a < b ) {
			lambda = a - (a + b) * x;
		} else {
			lambda = (a + b) * y - b;
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
				fract = binomial_ccdf( n, k, x, y );
				if ( !normalised ) {
					fract *= beta( a, b );
				}
			}
			else if ( b * x <= 0.7 ) {
				if( !invert ) {
					fract = ibeta_series( a, b, x, 0, normalised, pderiv, y );
				} else {
					fract = -( normalised ? 1 : beta( a, b ) );
					invert = false;
					fract = -ibeta_series( a, b, x, fract, normalised, pderiv, y );
				}
			}
			else if ( a > 15.0 ) {
				// Sidestep so we can use the series representation:
				n = floor( b );
				if ( n === b ) {
					--n;
				}
				bbar = b - n;
				if ( !normalised ) {
					prefix = rising_factorial_ratio( a + bbar, bbar, n );
				} else {
					prefix = 1;
				}
				fract = ibeta_a_step( bbar, a, y, x, n, normalised );
				fract = beta_small_b_large_a_series( a, bbar, x, y, fract, 1.0, normalised );
				fract /= prefix;
			}
			else if ( normalised ) {
				n = floor( b );
				bbar = b - n;
				if ( bbar <= 0 ) {
					--n;
					bbar += 1;
				}
				fract = ibeta_a_step( bbar, a, y, x, n, normalised );
				fract += ibeta_a_step( a, bbar, x, y, 20, normalised );
				if ( invert ) {
					fract -= 1;
				}
				fract = beta_small_b_large_a_series( a + 20.0, bbar, x, y, fract, 1, normalised );
				if ( invert ) {
					fract = -fract;
					invert = false;
				}
			}
			else {
				fract = ibeta_fraction2( a, b, x, y, normalised, pderiv );
			}
		} else {
			fract = ibeta_fraction2( a, b, x, y, normalised, pderiv );
		}
	}
	if ( pderiv ) {
		if ( pderiv.value < 0.0 ) {
			pderiv.value = ibeta_power_terms( a, b, x, y, true );
		}
		div = y * x;
		if( pderiv.value !== 0.0 ) {
			if( ( MAX_FLOAT64 * div < pderiv.value ) ) {
				// Overflow, return an arbitarily large value:
				pderiv.value = MAX_FLOAT64 / 2.0;
			} else {
				pderiv.value /= div;
			}
		}
	}
	return invert ? ( normalised ? 1.0 : beta( a, b ) ) - fract : fract;
} // end FUNCTION ibeta_imp()


// EXPORTS //

module.exports = ibeta_imp;

},{"./beta_small_b_large_a_series.js":37,"./binomial_ccdf.js":39,"./ibeta_a_step.js":41,"./ibeta_fraction2.js":42,"./ibeta_power_terms.js":44,"./ibeta_series.js":45,"./rising_factorial_ratio.js":50,"@stdlib/math/base/special/asin":34,"@stdlib/math/base/special/beta":36,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/expm1":72,"@stdlib/math/base/special/floor":77,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/max":104,"@stdlib/math/base/special/min":106,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/constants/float64-half-pi":175,"@stdlib/math/constants/float64-max":181,"@stdlib/math/constants/float64-pi":185,"@stdlib/math/constants/float64-smallest-normal":187,"@stdlib/math/constants/int32-max":190}],44:[function(require,module,exports){
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

var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var lower_gamma_series = require( './lower_gamma_series.js' );
var upper_gamma_fraction = require( './upper_gamma_fraction.js' );


// MAIN //

function ibeta_power_terms( a, b, x, y, normalised ) {
	var result;
	var lb1;
	var lb2;
	var la;
	var e1;
	var b1;
	var b2;
	var lb;
	var lc;
	var p1;
	var p2;
	var p3;
	var sa;
	var sb;
	var sc;
	var c;

	if ( !normalised ) {
		return pow( x, a ) * pow( y, b );
	}
	result = 0.0;
	c = a + b;
	// Integration limits for the gamma functions:
	la = a + 5.0;
	lb = b + 5.0;
	lc = a + b + 5.0;
	// Gamma function partials:
	sa = lower_gamma_series( a, la ) / a;
	sa += upper_gamma_fraction( a, la );
	sb = lower_gamma_series( b, lb ) / b;
	sb += upper_gamma_fraction( b, lb );
	sc = lower_gamma_series( c, lc ) / c;
	sc += upper_gamma_fraction( c, lc );
	// Gamma function powers combined with incomplete beta powers:
	b1 = (x * lc) / la;
	b2 = (y * lc) / lb;
	e1 = lc - la - lb;
	lb1 = a * ln( b1 );
	lb2 = b * ln( b2 );

	if (
		lb1 >= MAX_LN || lb1 <= MIN_LN  ||
		lb2 >= MAX_LN || lb2 <= MIN_LN ||
		e1 >= MAX_LN || e1 <= MIN_LN
	) {
		result = exp( lb1 + lb2 - e1 );
	} else {
		if( abs(b1 - 1) * a < 10 && a > 1 ) {
			p1 = exp( a * log1p( (x * b - y * la) / la ) );
		} else {
			p1 = pow( b1, a );
		}
		if( abs(b2 - 1) * b < 10 && b > 1 ) {
			p2 = exp( b * log1p( (y * a - x * lb) / lb ) );
		} else {
			p2 = pow( b2, b );
		}
		p3 = exp( e1 );
		result = p1 * p2 / p3;
	}
	// Combine with the remaining gamma function components:
	result /= sa * sb / sc;
	return result;
} // end FUNCTION ibeta_power_terms()


// EXPORTS //

module.exports = ibeta_power_terms;

},{"./lower_gamma_series.js":47,"./upper_gamma_fraction.js":52,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/pow":108,"@stdlib/math/constants/float64-max-ln":180,"@stdlib/math/constants/float64-min-ln":183}],45:[function(require,module,exports){
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

var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var lower_gamma_series = require( './lower_gamma_series.js' );
var upper_gamma_fraction = require( './upper_gamma_fraction.js' );


// MAIN //

/**
* Series approximation to the incomplete beta.
*
* @private
*/
function ibeta_series_t( a_, b_, x_, mult ) {
	var result = mult,
		x = x_,
		apn = a_,
		poch = 1 - b_,
		n = 1;
	return function next() {
		var r = result / apn;
		apn += 1;
		result *= poch * x / n;
		++n;
		poch += 1;
		return r;
	};
} // end FUNCTION ibeta_series_t()


/**
* Incomplete Beta series again without Lanczos support.
*
* @private
*/
function ibeta_series( a, b, x, s0, normalised, pderiv, y ) {
	var result;
	var lb1;
	var lb2;
	var lb;
	var lc;
	var sa;
	var sb;
	var sc;
	var b1;
	var b2;
	var e1;
	var la;
	var c;
	var p;
	var s;

	if ( normalised ) {
		c = a + b;
		// Figure out integration limits for the gamma function:
		la = a + 5;
		lb = b + 5;
		lc = a + b + 5;
		// Calculate the gamma parts:
		sa = lower_gamma_series( a, la ) / a;
		sa += upper_gamma_fraction( a, la );
		sb = lower_gamma_series( b, lb ) / b;
		sb += upper_gamma_fraction( b, lb );
		sc = lower_gamma_series( c, lc ) / c;
		sc += upper_gamma_fraction( c, lc );
		// And their combined power-terms:
		b1 = ( x * lc ) / la;
		b2 = lc / lb;
		e1 = lc - la - lb;
		lb1 = a * ln( b1 );
		lb2 = b * ln( b2 );

		if (
			lb1 >= MAX_LN || lb1 <= MIN_LN ||
			lb2 >= MAX_LN || lb2 <= MIN_LN ||
			e1 >= MAX_LN || e1 <= MIN_LN
		) {
			p = lb1 + lb2 - e1;
			result = exp( p );
		} else {
			result = pow( b1, a );
			if ( a * b < lb * 10 ) {
				result *= exp( b * log1p( a / lb ) );
			} else {
				result *= pow( b2, b );
			}
			result /= exp( e1 );
		}
		// Combine the results:
		result /= sa * sb / sc;

		if ( pderiv ) {
			pderiv.value = result * pow( y, b );
		}
	} else {
		// Non-normalised, just compute the power:
		result = pow( x, a );
	}
	if ( result < MIN_VALUE ) {
		// Safeguard: series can't cope with denorms...
		return s0;
	}
	s = ibeta_series_t( a, b, x, result );
	result = sumSeries( s, {
		'initialValue': s0
	});
	return result;
} // end FUNCTION ibeta_series()


// EXPORTS

module.exports = ibeta_series;

},{"./lower_gamma_series.js":47,"./upper_gamma_fraction.js":52,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/tools/sum-series":143,"@stdlib/math/constants/float64-max-ln":180,"@stdlib/math/constants/float64-min-ln":183,"@stdlib/math/constants/float64-smallest-normal":187}],46:[function(require,module,exports){
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

},{"./betainc.js":38}],47:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/gamma.hpp}.
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

var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var lower_incomplete_gamma_series = require( './lower_incomplete_gamma_series.js' );


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
function lower_gamma_series( a, z, initialValue ) {
	var result;
	var s;

	initialValue = initialValue || 0.0;
	s = lower_incomplete_gamma_series( a, z );
	result = sumSeries( s, {
		'initialValue': initialValue
	});
	return result;
} // end FUNCTION lower_gamma_series()


// EXPORTS //

module.exports = lower_gamma_series;

},{"./lower_incomplete_gamma_series.js":48,"@stdlib/math/base/tools/sum-series":143}],48:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/gamma.hpp}.
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

// MAIN //

/**
* Creates a function to evaluate a series expansion of the incomplete gamma function.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function lower_incomplete_gamma_series( a1, z1 ) {
	var result = 1.0;
	var a = a1;
	var z = z1;
	return function next() {
		var r = result;
		a += 1.0;
		result *= z/a;
		return r;
	};
} // end FUNCTION lower_incomplete_gamma_series()


// EXPORTS //

module.exports = lower_incomplete_gamma_series;

},{}],49:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/gamma.hpp}.
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
var E = require( '@stdlib/math/constants/float64-e' );


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
var lanczos_sum_expG_scaled = evalrational( NUM, DENOM );


// MAIN //

/**
* Computes (z^a)(e^-z)/tgamma(a).
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} (z^a)(e^-z)/tgamma(a)
*/
function regularised_gamma_prefix( a, z ) {
	var alz;
	var amz;
	var amza;
	var sq;
	var agh = a + G - 0.5;
	var prefix;
	var d = ( (z - a) - G + 0.5 ) / agh;

	if ( a < 1 ) {
		//
		// We have to treat a < 1 as a special case because our Lanczos
		// approximations are optimised against the factorials with a > 1,
		// and for high precision types especially (128-bit reals for example)
		// very small values of a can give rather eroneous results for gamma
		// unless we do this:
		//
		// TODO: is this still required?  Lanczos approx should be better now?
		//
		if ( z <= MIN_LN ) {
			// Oh dear, have to use logs, should be free of cancellation errors though:
			return exp( a * ln(z) - z - gammaln( a ) );
		}
		else {
			// direct calculation, no danger of overflow as gamma(a) < 1/a
			// for small a.
			return pow( z, a ) * exp( -z ) / gamma( a );
		}
	}
	else if ( abs(d*d*a) <= 100 && a > 150 ) {
		// special case for large a and a ~ z.
		prefix = a * ( log1p( d ) - d ) + z * (0.5 - G) / agh;
		prefix = exp( prefix );
	}
	else {
		//
		// general case.
		// direct computation is most accurate, but use various fallbacks
		// for different parts of the problem domain:
		//
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= MIN_LN ||
			max(alz, amz) >= MAX_LN
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2 > MIN_LN &&
				max(alz, amz)/2 < MAX_LN
			) {
				// compute square root of the result and then square it:
				sq = pow( z / agh, a / 2 ) * exp( amz / 2 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4 > MIN_LN  &&
				max(alz, amz)/4 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4 ) * exp( amz / 4 );
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
	prefix *= sqrt( agh / E ) / lanczos_sum_expG_scaled( a );
	return prefix;
} // end FUNCTION regularised_gamma_prefix()


// EXPORTS //

module.exports = regularised_gamma_prefix;

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/gamma":79,"@stdlib/math/base/special/gammaln":97,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/max":104,"@stdlib/math/base/special/min":106,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/base/tools/evalrational":140,"@stdlib/math/constants/float64-e":169,"@stdlib/math/constants/float64-max-ln":180,"@stdlib/math/constants/float64-min-ln":183}],50:[function(require,module,exports){
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
*	(a)(a+1)(a+2)...(a+k-1)
*	_______________________
*	(b)(b+1)(b+2)...(b+k-1)
* This function computes the delta in: beta(a,b,x) = prefix + delta * beta(a+k,b,x). It is only called with small k, for large k it is grossly inefficient.
*
* @param {number} a - input value
* @param {number} b - input value
* @param {number} k - input value
* @returns {number} ratio value
*/
function rising_factorial_ratio( a, b, k ) {
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
} // end FUNCTION rising_factorial_ratio()


// EXPORTS //

module.exports = rising_factorial_ratio;

},{}],51:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/gamma.hpp}.
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
var lanczos_sum = evalrational( NUM, DENOM );


/**
* Calculate the ratio of two gamma functions.
*
* @private
*/
function tgamma_delta_ratio_imp_lanczos( z, delta ) {
	var result;
	var ratio;
	var zgh;
	if ( z < EPSILON ) {
		//
		// We get spurious numeric overflow unless we're very careful, this
		// can occur either inside Lanczos::lanczos_sum(z) or in the
		// final combination of terms, to avoid this, split the product up
		// into 2 (or 3) parts:
		//
		// G(z) / G(L) = 1 / (z * G(L)) ; z < eps, L = z + delta = delta
		//    z * G(L) = z * G(lim) * (G(L)/G(lim)) ; lim = largest factorial
		//
		if ( MAX_FACTORIAL < delta ) {
			ratio = tgamma_delta_ratio_imp_lanczos( delta, MAX_FACTORIAL - delta );
			ratio *= z;
			ratio *= factorial( MAX_FACTORIAL - 1 );
			return 1.0 / ratio;
		} else {
			return 1.0 / ( z * gamma( z + delta ) );
		}
	}
	zgh = z + G - 0.5;
	if ( abs(delta) < 10 ) {
		result = exp( ( 0.5 - z ) * log1p( delta / zgh ));
	} else {
		result = pow( zgh / (zgh + delta), z - 0.5 );
	}
	// Split the calculation up to avoid spurious overflow:
	result *= lanczos_sum( z ) / lanczos_sum( z + delta );
	result *= pow( E / ( zgh + delta ), delta );
	return result;
} // end FUNCTION tgamma_delta_ratio_imp_lanczos()

function tgamma_delta_ratio_imp( z, delta ) {
	var result;

	if ( z <= 0.0 || z + delta <= 0.0 ) {
		// This isn't very sofisticated, or accurate, but it does work:
		return gamma( z ) / gamma( z + delta );
	}
	if ( floor(delta) === delta ) {
		if ( floor(z) === z ) {
			//
			// Both z and delta are integers, see if we can just use table lookup
			// of the factorials to get the result:
			//
			if( (z <= MAX_FACTORIAL ) && (z + delta <= MAX_FACTORIAL ) ) {
				return factorial( floor(z) - 1 ) / factorial( floor(z+delta) - 1 );
			}
		}
		if ( abs(delta) < 20 ) {
			// Delta is a small integer, we can use a finite product:
			if ( delta === 0 ) {
				return 1.0;
			}
			if ( delta < 0 ) {
				z -= 1.0;
			}
			result = z;
			while ( 0 !== ( delta -= 1 ) ) {
				z -= 1.0;
				result *= z;
			}
			return result;
		} else {
			result = 1.0 / z;
			while ( 0 !== ( delta -= 1 ) ) {
				z += 1;
				result /= z;
			}
			return result;
		}
	}
	return tgamma_delta_ratio_imp_lanczos( z, delta );
} // end FUNCTION tgamma_delta_ratio_imp()


// EXPORTS //

module.exports = tgamma_delta_ratio_imp;

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/factorial":75,"@stdlib/math/base/special/floor":77,"@stdlib/math/base/special/gamma":79,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/tools/evalrational":140,"@stdlib/math/constants/float64-e":169,"@stdlib/math/constants/float64-eps":170}],52:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/gamma.hpp}.
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

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var upper_incomplete_gamma_fract = require( './upper_incomplete_gamma_fract.js' );


// MAIN //

/**
* Evaluate the lower incomplete gamma integral via a series expansion and divide by gamma(z) to normalise.
*
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} function value
*/
function upper_gamma_fraction( a, z ) {
	var f = upper_incomplete_gamma_fract( a, z );
	return 1.0 / ( z - a + 1.0 + continuedFraction( f ) );
} // end FUNCTION upper_gamma_fraction()


// EXPORTS //

module.exports = upper_gamma_fraction;

},{"./upper_incomplete_gamma_fract.js":53,"@stdlib/math/base/tools/continued-fraction":134}],53:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/gamma.hpp}.
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

// MAIN //

/**
* Creates a function to evaluate a series expansion of the upper incomplete gamma fraction.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function upper_incomplete_gamma_fract( a1, z1 ) {
	var z = z1 - a1 + 1.0;
	var a = a1;
	var k = 0;
	return function next() {
		++k;
		z += 2.0;
		return [
			k * (a - k),
			z
		];
	};
} // end FUNCTION upper_incomplete_gamma_fract()


// EXPORTS //

module.exports = upper_incomplete_gamma_fract;

},{}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/round":118}],55:[function(require,module,exports){
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

},{"./binomcoef.js":54}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"./ceil.js":56}],58:[function(require,module,exports){
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
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
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

},{"@stdlib/math/base/utils/float64-from-words":147,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-to-words":163}],59:[function(require,module,exports){
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

},{"./copysign.js":58}],60:[function(require,module,exports){
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
* @example
* var v = cos( Math.PI/4.0 );
* // returns ~0.707
* @example
* var v = cos( -Math.PI/6.0 );
* // returns ~0.866
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
		return cosKernel(x,z);
	}
	// Case: cos(Inf or NaN) is NaN */
	else if ( ix >= 0x7ff00000 ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	else {
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
	}
} // end FUNCTION cos()


// EXPORTS //

module.exports = cos;

},{"./cos_kernel.js":61,"./rem_pio2.js":63,"./sin_kernel.js":65,"@stdlib/math/base/utils/float64-get-high-word":151}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"./cos.js":60}],63:[function(require,module,exports){
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

},{"./rem_pio2_kernel.js":64,"@stdlib/math/base/special/round":118,"@stdlib/math/base/utils/float64-from-words":147,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-get-low-word":153}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":77,"@stdlib/math/base/special/ldexp":98}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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
* @example
* var y = erfc( -1.0 );
* // returns ~-1.8427
* @example
* var y = erfc( 0.0 );
* // returns 1.0
* @example
* var y = erfc( Number.POSITIVE_INFINITY );
* // returns 0.0
* @example
* var y = erfc( Number.NEGATIVE_INFINITY );
* // returns 2.0
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/base/utils/float64-set-low-word":160,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],67:[function(require,module,exports){
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

},{"./erfc.js":66}],68:[function(require,module,exports){
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
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
* @example
* var v = exp( 0.0 );
* // returns 1.0
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

},{"./expmulti.js":69,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":130,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":98,"@stdlib/math/base/tools/evalpoly":137}],70:[function(require,module,exports){
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

},{"./exp.js":68}],71:[function(require,module,exports){
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
* @example
* var v = expm1( -9.0 );
* // returns ~-0.999
* @example
* var v = expm1( 0.0 );
* // returns 0.0
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-set-high-word":158,"@stdlib/math/constants/float64-exponent-bias":172,"@stdlib/math/constants/float64-half-ln-two":174,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],72:[function(require,module,exports){
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

},{"./expm1.js":71}],73:[function(require,module,exports){
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
* @example
* var v = factorial( -1.5 );
* // returns ~-3.545
* @example
* var v = factorial( -0.5 );
* // returns ~1.772
* @example
* var v = factorial( 0.5 );
* // returns ~0.886
* @example
* var v = factorial( -10.0 );
* // returns NaN
* @example
* var v = factorial( 171.0 );
* // returns Number.POSITIVE_INFINITY
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

},{"./factorials.json":74,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gamma":79,"@stdlib/math/constants/float64-pinf":186}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{"./factorial.js":73}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{"./floor.js":76}],78:[function(require,module,exports){
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
* arithmetic | domain | # trials | peak | rms
* ---------- | ------ | -------- | ---- | ---
* DEC | -34,34 | 10000 | 1.3e-16 | 2.5e-17
* IEEE | -170,-33 | 20000 | 2.3e-15 | 3.3e-16
* IEEE | -33, 33 | 20000 | 9.4e-16 | 2.2e-16
* IEEE | 33, 171.6 | 20000 | 2.3e-15 | 3.2e-16
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
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
* @example
* var v = gamma( 0.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = gamma( -0.0 );
* // returns Number.NEGATIVE_INFINITY
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

},{"./small_approximation.js":80,"./stirling_approximation.js":81,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/floor":77,"@stdlib/math/base/special/sin":120,"@stdlib/math/base/tools/evalrational":140,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pi":185,"@stdlib/math/constants/float64-pinf":186}],79:[function(require,module,exports){
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

},{"./gamma.js":78}],80:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":171}],81:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/constants/float64-sqrt-two-pi":189}],82:[function(require,module,exports){
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
function finite_gamma_q( a, x ) {
	var term;
	var sum;
	var e;
	var n;

	e = exp( -x );
	sum = e;
	if ( sum !== 0.0 ) {
		term = sum;
		for ( n = 1; n < a; ++n ){
			term /= n;
			term *= x;
			sum += term;
		}
	}
	return sum;
} // end FUNCTION finite_gamma_q()


// EXPORTS //

module.exports = finite_gamma_q;

},{"@stdlib/math/base/special/exp":70}],83:[function(require,module,exports){
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
function finite_half_gamma_q( a, x ) {
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
		for( n = 2; n < a; ++n ) {
			term /= n - half;
			term *= x;
			sum += term;
		}
		e += sum;
	}
	return e;
} // end FUNCTION finite_half_gamma_q()


// EXPORTS //

module.exports = finite_half_gamma_q;

},{"@stdlib/math/base/special/erfc":67,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/constants/float64-pi":185}],84:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/pow":108,"@stdlib/math/constants/float64-max-ln":180,"@stdlib/math/constants/float64-min-ln":183,"dup":40}],85:[function(require,module,exports){
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
var finite_gamma_q = require( './finite_gamma_q.js' );
var finite_half_gamma_q = require( './finite_half_gamma_q.js' );
var full_igamma_prefix = require( './full_igamma_prefix.js' );
var igamma_temme_large = require( './igamma_temme_large.js' );
var lower_gamma_series = require( './lower_gamma_series.js' );
var regularised_gamma_prefix = require( './regularised_gamma_prefix.js' );
var tgamma_small_upper_part = require( './tgamma_small_upper_part.js' );
var upper_gamma_fraction = require( './upper_gamma_fraction.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Computes the regularized incomplete gamma function. The upper tail is calculated via the modified Lentz's method for computing continued fractions, the lower tail using a power expansion.
*
* @param {NonNegativeNumber} x - function parameter
* @param {PositiveNumber} s - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete gamma function
* @returns {number} function value
*/
function gammainc( x, a, regularized, upper ) {
	var normalised;
	var invert;
	var initValue;
	var optimised_invert;
	var result;
	var sigma;
	var eval_method;
	var gam;
	var use_temme;
	var fa;
	var is_int;
	var is_half_int;
	var is_small_a;
	var res;
	var g;

	if ( x < 0.0 || a <= 0.0 ) {
		return NaN;
	}
	normalised = ( regularized !== undefined ) ? regularized : true;
	invert = upper ? true : false;
	result = 0.0;

	if ( a >= MAX_FACTORIAL && !normalised ) {
		//
		// When we're computing the non-normalized incomplete gamma
		// and a is large the result is rather hard to compute unless
		// we use logs.  There are really two options - if x is a long
		// way from a in value then we can reliably use methods 2 and 4
		// below in logarithmic form and go straight to the result.
		// Otherwise we let the regularized gamma take the strain
		// (the result is unlikely to unerflow in the central region anyway)
		// and combine with lgamma in the hopes that we get a finite result.
		//
		if ( invert && ( a * 4.0 < x ) ) {
			// This is method 4 below, done in logs:
			result = a * ln(x) - x;
			result += ln( upper_gamma_fraction( a, x ) );
		}
		else if ( !invert && ( a > 4.0 * x ) ) {
			// This is method 2 below, done in logs:
			result = a * ln(x) - x;
			initValue = 0;
			result += ln( lower_gamma_series( a, x, initValue ) / a );
		}
		else {
			result = gammainc( a, x, true, invert );
			if ( result === 0.0 ) {
				if ( invert ) {
					// Try http://functions.wolfram.com/06.06.06.0039.01
					result = 1 + 1 / (12 * a) + 1 / (288 * a * a);
					result = ln( result ) - a + (a - 0.5) * ln(a) + ln( SQRT_TWO_PI );
				} else {
					// This is method 2 below, done in logs, we're really outside the
					// range of this method, but since the result is almost certainly
					// infinite, we should probably be OK:
					result = a * ln( x ) - x;
					initValue = 0.0;
					result += ln( lower_gamma_series( a, x, initValue ) / a);
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

	is_small_a = (a < 30) && (a <= x + 1.0 ) && (x < MAX_LN );
	if ( is_small_a ) {
		fa = floor( a );
		is_int = ( fa === a );
		is_half_int = is_int ? false : ( abs( fa - a ) === 0.5 );
	} else {
		is_int = is_half_int = false;
	}
	if ( is_int && x > 0.6 )
	// Calculate Q via finite sum:
	{
		invert = !invert;
		eval_method = 0;
	}
	else if ( is_half_int && x > 0.2 )
	// Calculate Q via finite sum for half integer a:
	{
		invert = !invert;
		eval_method = 1;
	}
	else if ( x < SQRT_EPSILON && a > 1.0 )
	{
		eval_method = 6;
	}
	else if ( x < 0.5 )
	{
		// Changeover criterion chosen to give a changeover at Q ~ 0.33:
		if ( -0.4 / ln( x ) < a ) {
			eval_method = 2;
		} else {
			eval_method = 3;
		}
	}
	else if ( x < 1.1 )
	{
		// Changover here occurs when P ~ 0.75 or Q ~ 0.25:
		if ( x * 0.75 < a ) {
			eval_method = 2;
		} else {
			eval_method = 3;
		}
	}
	else
	{
		/* Begin by testing whether we're in the "bad" zone
		where the result will be near 0.5 and the usual
		series and continued fractions are slow to converge: */
		use_temme = false;
		if ( normalised && a > 20 ) {
			sigma = abs( (x-a)/a );
			if ( a > 200 ) {
				// This limit is chosen so that we use Temme's expansion
				// only if the result would be larger than about 10^-6.
				// Below that the regular series and continued fractions
				// converge OK, and if we use Temme's method we get increasing
				// errors from the dominant erfc term as it's (inexact) argument
				// increases in magnitude.
				if ( 20 / a > sigma * sigma ) {
					use_temme = true;
				}
			} else {
				if ( sigma < 0.4 ) {
					use_temme = true;
				}
			}
		}
		if ( use_temme ) {
			eval_method = 5;
		}
		// Regular case where the result will not be too close to 0.5.
		else
		{
			// Changeover here occurs at P ~ Q ~ 0.5
			// Note that series computation of P is about x2 faster than continued fraction
			// calculation of Q, so try and use the CF only when really necessary, especially
			// for small x.
			if ( x - ( 1.0 / (3.0 * x) ) < a ) {
				eval_method = 2;
			} else {
				eval_method = 4;
				invert = !invert;
			}
		}
	}

	switch( eval_method ) {
	case 0:
		result = finite_gamma_q( a, x );
		if (normalised === false ) {
			result *= gamma( a );
		}
	break;
	case 1:
		result = finite_half_gamma_q( a, x );
		if ( normalised === false ) {
			result *= gamma( a );
		}
	break;
	case 2:
		// Compute P:
		result = normalised ? regularised_gamma_prefix( a, x ) : full_igamma_prefix( a, x );
		if ( result !== 0.0 ) {
			initValue = 0.0;
			optimised_invert = false;
			if ( invert ) {
				initValue = normalised ? 1.0 : gamma(a);
				if ( normalised || result >= 1.0 || FLOAT64_MAX * result > initValue ) {
					initValue /= result;
					if ( normalised || a < 1.0 || ( FLOAT64_MAX / a > initValue ) ) {
						initValue *= -a;
						optimised_invert = true;
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
		result *= lower_gamma_series( a, x, initValue ) / a;
		if ( optimised_invert ) {
			invert = false;
			result = -result;
		}
	break;
	case 3:
		// Compute Q:
		invert = !invert;
		res = tgamma_small_upper_part( a, x, invert );
		result = res[ 0 ];
		g = res[ 1 ];
		invert = false;
		if ( normalised ) {
			result /= g;
		}
	break;
	case 4:
		// Compute Q:
		result = normalised ? regularised_gamma_prefix( a, x ) : full_igamma_prefix( a, x );
		if ( result !== 0 ) {
			result *= upper_gamma_fraction( a, x );
		}
	break;
	case 5:
		result = igamma_temme_large( a, x );
		if ( x >= a ) {
			invert = !invert;
		}
	break;
	case 6:
		// x is so small that P is necessarily very small too,
		// use http://functions.wolfram.com/GammaBetaErf/GammaRegularized/06/01/05/01/01/
		result = !normalised ? pow( x, a ) / a : pow(x, a) / gamma( a + 1.0 );
		result *= 1.0 - a * x / ( a + 1.0 );
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

},{"./finite_gamma_q.js":82,"./finite_half_gamma_q.js":83,"./full_igamma_prefix.js":84,"./igamma_temme_large.js":87,"./lower_gamma_series.js":89,"./regularised_gamma_prefix.js":91,"./tgamma_small_upper_part.js":93,"./upper_gamma_fraction.js":94,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/floor":77,"@stdlib/math/base/special/gamma":79,"@stdlib/math/base/special/gammaln":97,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/pow":108,"@stdlib/math/constants/float64-max":181,"@stdlib/math/constants/float64-max-ln":180,"@stdlib/math/constants/float64-pinf":186,"@stdlib/math/constants/float64-sqrt-eps":188,"@stdlib/math/constants/float64-sqrt-two-pi":189}],86:[function(require,module,exports){
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
* @example
* var v = gammap1m1( -3/2 );
* // returns ~-4.545
* @example
* var v = gammap1m1( 4.0 );
* // returns 23
* @example
* var v = gammap1m1( 1/2 );
* // returns ~-0.114
* @example
* var v = gammap1m1( NaN );
* // returns NaN
*/
function gammap1m1( x ) {
	var result;
	if ( x < 0.0 ) {
		if ( x < -0.5 ) {
			// Best method is simply to subtract 1 from gamma:
			result = gamma( 1.0 + x ) - 1.0;
		} else {
			// Use expm1 on gammaln:
			result = expm1( -log1p(x) + gammaln( x + 2.0 ) );
		}
	} else {
		if ( x < 2.0 ) {
			// Use expm1 on gammaln:
			result = expm1( gammaln( x + 1.0 ) );
		} else {
			// Best method is simply to subtract 1 from gamma:
			result = gamma( 1.0 + x ) - 1.0;
		}
	}
	return result;
} // end FUNCTION gammap1m1()


// EXPORTS //

module.exports = gammap1m1;

},{"@stdlib/math/base/special/expm1":72,"@stdlib/math/base/special/gamma":79,"@stdlib/math/base/special/gammaln":97,"@stdlib/math/base/special/log1p":102}],87:[function(require,module,exports){
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
function igamma_temme_large( a, x ) {
	var workspace;
	var result;
	var sigma = (x - a) / a;
	var phi = -ln( 1 + sigma ) + sigma;
	var y;
	var z;

	y = a * phi;
	z = sqrt( 2 * phi );
	if ( x < a ) {
		z = -z;
	}
	workspace = new Array( 10 );
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

	result = evalpoly( workspace, 1/a );
	result *= exp( -y ) / sqrt( 2.0 * PI * a );
	if ( x < a ) {
		result = -result;
	}
	result += erfc( sqrt(y) ) / 2.0;
	return result;
} // end FUNCTION igamma_temme_large()


// EXPORTS //

module.exports = igamma_temme_large;

},{"@stdlib/math/base/special/erfc":67,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/constants/float64-pi":185}],88:[function(require,module,exports){
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

},{"./gammainc.js":85}],89:[function(require,module,exports){
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
var lower_incomplete_gamma_series = require( './lower_incomplete_gamma_series' );


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
function lower_gamma_series( a, z, initialValue ) {
	var result;
	var s;

	initialValue = initialValue || 0.0;
	s = lower_incomplete_gamma_series( a, z );
	result = sumSeries( s, {
		'initialValue': initialValue
	});
	return result;

} // end FUNCTION lower_gamma_series()


// EXPORTS //

module.exports = lower_gamma_series;

},{"./lower_incomplete_gamma_series":90,"@stdlib/math/base/tools/sum-series":143}],90:[function(require,module,exports){
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
function lower_incomplete_gamma_series( a1, z1 ) {
	var result = 1.0;
	var a = a1;
	var z = z1;
	return function next() {
		var r = result;
		a += 1.0;
		result *= z/a;
		return r;
	};
} // end FUNCTION lower_incomplete_gamma_series()


// EXPORTS //

module.exports = lower_incomplete_gamma_series;

},{}],91:[function(require,module,exports){
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

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
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
var E = require( '@stdlib/math/constants/float64-e' );


// VARIABLES //

var LOG_MAX_VALUE = 709.0;
var LOG_MIN_VALUE = -708.0;
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
var lanczos_sum_expG_scaled = evalrational( NUM, DENOM );


// MAIN //

/**
* Computes (z^a)(e^-z)/tgamma(a).
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} (z^a)(e^-z)/tgamma(a)
*/
function regularised_gamma_prefix( a, z ) {
	var alz;
	var amz;
	var amza;
	var sq;
	var agh = a + G - 0.5;
	var prefix;
	var d = ( (z - a) - G + 0.5 ) / agh;

	if ( a < 1 ) {
		//
		// We have to treat a < 1 as a special case because our Lanczos
		// approximations are optimised against the factorials with a > 1,
		// and for high precision types especially (128-bit reals for example)
		// very small values of a can give rather eroneous results for gamma
		// unless we do this:
		//
		// TODO: is this still required?  Lanczos approx should be better now?
		//
		if ( z <= LOG_MIN_VALUE ) {
			// Oh dear, have to use logs, should be free of cancellation errors though:
			return exp( a * ln(z) - z - gammaln( a ) );
		}
		else {
			// direct calculation, no danger of overflow as gamma(a) < 1/a
			// for small a.
			return pow( z, a ) * exp( -z ) / gamma( a );
		}
	}
	else if ( abs(d*d*a) <= 100 && a > 150 ) {
		// special case for large a and a ~ z.
		prefix = a * ( log1p( d ) - d ) + z * (0.5 - G) / agh;
		prefix = exp( prefix );
	}
	else {
		//
		// general case.
		// direct computation is most accurate, but use various fallbacks
		// for different parts of the problem domain:
		//
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= LOG_MIN_VALUE ||
			max(alz, amz) >= LOG_MAX_VALUE
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2 > LOG_MIN_VALUE &&
				max(alz, amz)/2 < LOG_MAX_VALUE
			) {
				// compute square root of the result and then square it:
				sq = pow( z / agh, a / 2 ) * exp( amz / 2 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4 > LOG_MIN_VALUE  &&
				max(alz, amz)/4 < LOG_MAX_VALUE &&
				z > a
			) {
				// compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4 ) * exp( amz / 4 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > LOG_MIN_VALUE &&
				amza < LOG_MAX_VALUE
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
	prefix *= sqrt( agh / E ) / lanczos_sum_expG_scaled( a );
	return prefix;
} // end FUNCTION regularised_gamma_prefix()


// EXPORTS //

module.exports = regularised_gamma_prefix;

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/exp":70,"@stdlib/math/base/special/gamma":79,"@stdlib/math/base/special/gammaln":97,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/log1p":102,"@stdlib/math/base/special/max":104,"@stdlib/math/base/special/min":106,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/base/tools/evalrational":140,"@stdlib/math/constants/float64-e":169}],92:[function(require,module,exports){
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
function small_gamma2_series( a, x ) {
	var result;
	var apn;
	var n;
	var r;

	result = -x;
	x = -x;
	apn = a + 1.0;
	n = 1;
	return function next() {
		r = result / apn;
		result *= x;
		result /= ++n;
		apn += 1.0;
		return r;
	};
} // end FUNCTION small_gamma2_series()


// EXPORTS //

module.exports = small_gamma2_series;

},{}],93:[function(require,module,exports){
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
var small_gamma2_series = require( './small_gamma2_series.js' );
var tgamma1pm1 = require( './gammap1m1.js' );


// MAIN //

/**
* Compute the full upper fraction (Q) when a is very small.
*
* @param {number} a - function parameter
* @param {number} x - function parameter
* @param {boolean} invert - boolean indicating if the upper tail of the incomplete gamma function should be evaluated
* @returns {number} full upper fraction (Q)
*/
function tgamma_small_upper_part( a, x, invert ) {
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
	s = small_gamma2_series( a, x );
	p += 1.0;
	initialValue = invert ? pgam : 0.0;
	result = -p * sumSeries( s, {
		'initialValue': (initialValue - result) / p
	});
	if ( invert ) {
		result = -result;
	}
	return [ result, pgam ];
} // end FUNCTION tgamma_small_upper_part()


// EXPORTS //

module.exports = tgamma_small_upper_part;

},{"./gammap1m1.js":86,"./small_gamma2_series.js":92,"@stdlib/math/base/special/powm1":116,"@stdlib/math/base/tools/sum-series":143}],94:[function(require,module,exports){
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
var upper_incomplete_gamma_fract = require( './upper_incomplete_gamma_fract' );


// MAIN //

/**
* Evaluate the lower incomplete gamma integral via a series expansion and divide by gamma(z) to normalise.
*
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} function value
*/
function upper_gamma_fraction( a, z ) {
	var f = upper_incomplete_gamma_fract( a, z );
	return 1.0 / ( z - a + 1.0 + continuedFraction( f ) );
} // end FUNCTION upper_gamma_fraction()


// EXPORTS //

module.exports = upper_gamma_fraction;

},{"./upper_incomplete_gamma_fract":95,"@stdlib/math/base/tools/continued-fraction":134}],95:[function(require,module,exports){
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
function upper_incomplete_gamma_fract( a1, z1 ) {
	var z = z1 - a1 + 1.0;
	var a = a1;
	var k = 0;
	return function next() {
		++k;
		z += 2.0;
		return [
			k * (a - k),
			z
		];
	};
} // end FUNCTION upper_incomplete_gamma_fract()


// EXPORTS //

module.exports = upper_incomplete_gamma_fract;

},{}],96:[function(require,module,exports){
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
* @example
* var v = gammaln( 2.0 );
* // returns 0.0
* @example
* var v = gammaln( 4.0 );
* // returns ~1.792
* @example
* var v = gammaln( -0.5 );
* // returns ~1.266
* @example
* var v = gammaln( 0.5 );
* // returns ~0.572
* @example
* var v = gammaln( 0.0 );
* // returns Number.POSITIVE_INFINITY
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/sinpi":127,"@stdlib/math/base/special/trunc":130,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/constants/float64-pi":185,"@stdlib/math/constants/float64-pinf":186}],97:[function(require,module,exports){
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

},{"./gammaln.js":96}],98:[function(require,module,exports){
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

},{"./ldexp.js":99}],99:[function(require,module,exports){
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
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
* @example
* var x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":59,"@stdlib/math/base/utils/float64-exponent":145,"@stdlib/math/base/utils/float64-from-words":147,"@stdlib/math/base/utils/float64-normalize":155,"@stdlib/math/base/utils/float64-to-words":163,"@stdlib/math/constants/float64-exponent-bias":172,"@stdlib/math/constants/float64-max-base2-exponent":179,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":178,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":182,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],100:[function(require,module,exports){
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

},{"./ln.js":101}],101:[function(require,module,exports){
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
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
* @example
* var v = ln( 0.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var v = ln( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = ln( NaN );
* // returns NaN
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-set-high-word":158,"@stdlib/math/base/utils/float64-to-words":163,"@stdlib/math/constants/float64-exponent-bias":172,"@stdlib/math/constants/float64-ninf":184}],102:[function(require,module,exports){
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

},{"./log1p.js":103}],103:[function(require,module,exports){
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
	1.479819860511658591e-01, // 0x3FC2F112 0xDF3E5244
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
* @example
* var v = log1p( -1.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var v = log1p( 0.0 );
* // returns 0.0
* @example
* var v = log1p( -0.0 );
* // returns -0.0
* @example
* var v = log1p( -2.0 );
* // returns NaN
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
			if( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - x*x*0.5;
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
	if( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return k * LN2_HI + c;
		}
		R = hfsq * (1.0 - TWO_THIRDS*f); // avoid division
		return k*LN2_HI - ( (R - (k*LN2_LO + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - s*(hfsq+R) );
	}
	return k*LN2_HI - ( (hfsq - (s*(hfsq+R) + (k*LN2_LO + c))) - f );
} // end FUNCTION log1p()


// EXPORTS //

module.exports = log1p;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-set-high-word":158,"@stdlib/math/constants/float64-exponent-bias":172,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],104:[function(require,module,exports){
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

},{"./max.js":105}],105:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":18,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],106:[function(require,module,exports){
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

},{"./min.js":107}],107:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],108:[function(require,module,exports){
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

},{"./pow.js":111}],109:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-set-high-word":158,"@stdlib/math/base/utils/float64-set-low-word":160,"@stdlib/math/constants/float64-exponent-bias":172}],110:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/base/utils/float64-set-low-word":160}],111:[function(require,module,exports){
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
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
* @example
* var v = pow( Math.PI, 5.0 );
* // returns ~306.0197
* @example
* var v = pow( Math.PI, -0.2 );
* // returns ~0.7954
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
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

},{"./log2ax.js":109,"./logx.js":110,"./pow2.js":112,"./x_is_zero.js":113,"./y_is_huge.js":114,"./y_is_infinite.js":115,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/sqrt":129,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-get-low-word":153,"@stdlib/math/base/utils/float64-set-low-word":160,"@stdlib/math/base/utils/float64-to-words":163,"@stdlib/math/base/utils/uint32-to-int32":166,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],112:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":98,"@stdlib/math/base/tools/evalpoly":137,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-set-high-word":158,"@stdlib/math/base/utils/float64-set-low-word":160,"@stdlib/math/base/utils/uint32-to-int32":166,"@stdlib/math/constants/float64-exponent-bias":172,"@stdlib/math/constants/float64-ln-two":177}],113:[function(require,module,exports){
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
* @example
* var v = pow( -0.0, -9 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var v = pow( 0.0, -9 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = pow( -0.0, 9 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = pow( 0.0, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
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

},{"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/copysign":59,"@stdlib/math/constants/float64-ninf":184,"@stdlib/math/constants/float64-pinf":186}],114:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":151}],115:[function(require,module,exports){
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
* @example
* var v = pow( -1.0, Number.NEGATIVE_INFINITY );
* // returns NaN
* @example
* var v = pow( 1.0, Number.POSITIVE_INFINITY );
* // returns 1.0
* @example
* var v = pow( 1.0, Number.NEGATIVE_INFINITY );
* // returns 1.0
* @example
* var v = pow( 0.5, Number.POSITIVE_INFINITY );
* // returns 0.0
* @example
* var v = pow( 0.5, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = pow( 1.5, Number.NEGATIVE_INFINITY );
* // returns 0.0
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

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float64-pinf":186}],116:[function(require,module,exports){
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

},{"./powm1.js":117}],117:[function(require,module,exports){
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
* @example
* var y = powm1( 4.0, 0.5 );
* // returns 1.0
* @example
* var y = powm1( 0.0, 100.0 );
* // returns -1.0
* @example
* var y = powm1( 100.0, 0.0 );
* // returns 0.0
* @example
* var y = powm1( 0.0, 0.0 );
* // returns 0.0
* @example
* var y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
* @example
* var y = powm1( NaN, 3.0 );
* // returns NaN
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/expm1":72,"@stdlib/math/base/special/ln":100,"@stdlib/math/base/special/pow":108,"@stdlib/math/base/special/trunc":130}],118:[function(require,module,exports){
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

},{"./round.js":119}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{"./sin.js":126}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":77,"@stdlib/math/base/special/ldexp":98}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{"./kernel_rem_pio2.js":122,"./rem_pio2_medium.js":125,"@stdlib/math/base/utils/float64-from-words":147,"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/base/utils/float64-get-low-word":153}],125:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":118,"@stdlib/math/base/utils/float64-get-high-word":151}],126:[function(require,module,exports){
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
* | n   |  sin(x)  |  cos(x)  |  tan(x)  |
* | --- |----------|----------|----------|
* |  0  |     S    |     C    |    T     |
* |  1  |     C    |    -S    |   -1/T   |
* |  2  |    -S    |    -C    |    T     |
* |  3  |    -C    |     S    |   -1/T   |
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

},{"./kernel_cos.js":121,"./kernel_sin.js":123,"./rem_pio2.js":124,"@stdlib/math/base/utils/float64-get-high-word":151}],127:[function(require,module,exports){
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

},{"./sinpi.js":128}],128:[function(require,module,exports){
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
* @example
* var y = sinpi( 0.5 );
* // returns 1.0
* @example
* var y = sinpi( 0.9 );
* // returns ~0.309
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":32,"@stdlib/math/base/special/copysign":59,"@stdlib/math/base/special/cos":62,"@stdlib/math/base/special/sin":120,"@stdlib/math/constants/float64-pi":185}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{"./trunc.js":131}],131:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":57,"@stdlib/math/base/special/floor":77}],132:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float32-smallest-normal":168,"@stdlib/math/constants/float64-eps":170}],133:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float32-smallest-normal":168,"@stdlib/math/constants/float64-eps":170}],134:[function(require,module,exports){
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

},{"./basic.js":132,"./generators.js":133,"@stdlib/utils/detect-generator-support":194}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
'use strict';

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
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{}],137:[function(require,module,exports){
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

},{"./evalpoly.js":135,"./factory.js":136,"@stdlib/utils/define-read-only-property":192}],138:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":32}],139:[function(require,module,exports){
/* jshint evil:true */
'use strict';

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
	return ( new Function( f ) )();

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
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{}],140:[function(require,module,exports){
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

},{"./evalrational.js":138,"./factory.js":139,"@stdlib/utils/define-read-only-property":192}],141:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float64-eps":170}],142:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float64-eps":170}],143:[function(require,module,exports){
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

},{"./basic.js":141,"./generators.js":142,"@stdlib/utils/detect-generator-support":194}],144:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":151,"@stdlib/math/constants/float64-exponent-bias":172,"@stdlib/math/constants/float64-high-word-exponent-mask":176}],145:[function(require,module,exports){
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

},{"./exponent.js":144}],146:[function(require,module,exports){
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

},{"./indices.js":148}],147:[function(require,module,exports){
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

},{"./from_words.js":146}],148:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],149:[function(require,module,exports){
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

},{"./high.js":150}],150:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],151:[function(require,module,exports){
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

},{"./get_high_word.js":149}],152:[function(require,module,exports){
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

},{"./low.js":154}],153:[function(require,module,exports){
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

},{"./get_low_word.js":152}],154:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],155:[function(require,module,exports){
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

},{"./normalize.js":156}],156:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":32,"@stdlib/math/constants/float64-smallest-normal":187}],157:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":150}],158:[function(require,module,exports){
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

},{"./set_high_word.js":159}],159:[function(require,module,exports){
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

},{"./high.js":157}],160:[function(require,module,exports){
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

},{"./set_low_word.js":162}],161:[function(require,module,exports){
arguments[4][154][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":154}],162:[function(require,module,exports){
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

},{"./low.js":161}],163:[function(require,module,exports){
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

},{"./to_words.js":165}],164:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":148}],165:[function(require,module,exports){
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

},{"./indices.js":164}],166:[function(require,module,exports){
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

},{"./uint32_to_int32.js":167}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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


},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{"./define_read_only_property.js":191}],193:[function(require,module,exports){
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

},{"@stdlib/utils/eval":195}],194:[function(require,module,exports){
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

},{"./detect_generator_support.js":193}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){

},{}],198:[function(require,module,exports){
arguments[4][197][0].apply(exports,arguments)
},{"dup":197}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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

  if (value instanceof ArrayBuffer) {
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
  if (isArrayBufferView(string) || string instanceof ArrayBuffer) {
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

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":196,"ieee754":219}],201:[function(require,module,exports){
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
},{"../../is-buffer/index.js":221}],202:[function(require,module,exports){
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

},{"./lib/is_arguments.js":203,"./lib/keys.js":204}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],205:[function(require,module,exports){
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

},{"foreach":215,"object-keys":224}],206:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],207:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
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
	}
};

module.exports = ES5;

},{"./helpers/isFinite":208,"./helpers/isNaN":209,"./helpers/mod":210,"./helpers/sign":211,"es-to-primitive/es5":212,"is-callable":222}],208:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],209:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],210:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],211:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],212:[function(require,module,exports){
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

},{"./helpers/isPrimitive":213,"is-callable":222}],213:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){

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


},{}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":216}],218:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":217}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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

},{"./isArguments":225}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
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
},{"_process":199}],227:[function(require,module,exports){
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
},{"_process":199}],228:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":229}],229:[function(require,module,exports){
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
},{"./_stream_readable":231,"./_stream_writable":233,"core-util-is":201,"inherits":220,"process-nextick-args":227}],230:[function(require,module,exports){
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
},{"./_stream_transform":232,"core-util-is":201,"inherits":220}],231:[function(require,module,exports){
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
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Object.prototype.toString.call(obj) === '[object Uint8Array]' || Buffer.isBuffer(obj);
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
      if (typeof chunk !== 'string' && Object.getPrototypeOf(chunk) !== Buffer.prototype && !state.objectMode) {
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
}).call(this,require('_process'))
},{"./_stream_duplex":229,"./internal/streams/BufferList":234,"./internal/streams/destroy":235,"./internal/streams/stream":236,"_process":199,"core-util-is":201,"events":214,"inherits":220,"isarray":237,"process-nextick-args":227,"safe-buffer":244,"string_decoder/":238,"util":197}],232:[function(require,module,exports){
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
},{"./_stream_duplex":229,"core-util-is":201,"inherits":220}],233:[function(require,module,exports){
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
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Object.prototype.toString.call(obj) === '[object Uint8Array]' || Buffer.isBuffer(obj);
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

}).call(this,require('_process'))
},{"./_stream_duplex":229,"./internal/streams/destroy":235,"./internal/streams/stream":236,"_process":199,"core-util-is":201,"inherits":220,"process-nextick-args":227,"safe-buffer":244,"util-deprecate":256}],234:[function(require,module,exports){
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
},{"safe-buffer":244}],235:[function(require,module,exports){
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
},{"process-nextick-args":227}],236:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":214}],237:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],238:[function(require,module,exports){
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
},{"safe-buffer":244}],239:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":240}],240:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":229,"./lib/_stream_passthrough.js":230,"./lib/_stream_readable.js":231,"./lib/_stream_transform.js":232,"./lib/_stream_writable.js":233}],241:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":240}],242:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":233}],243:[function(require,module,exports){
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
},{"_process":199,"through":255}],244:[function(require,module,exports){
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

},{"buffer":200}],245:[function(require,module,exports){
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

},{"events":214,"inherits":220,"readable-stream/duplex.js":228,"readable-stream/passthrough.js":239,"readable-stream/readable.js":240,"readable-stream/transform.js":241,"readable-stream/writable.js":242}],246:[function(require,module,exports){
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

},{"es-abstract/es5":207,"function-bind":217}],247:[function(require,module,exports){
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

},{"./implementation":246,"./polyfill":248,"./shim":249,"define-properties":205,"function-bind":217}],248:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":246}],249:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":248,"define-properties":205}],250:[function(require,module,exports){
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
},{"./lib/default_stream":251,"./lib/results":253,"./lib/test":254,"_process":199,"defined":206,"through":255}],251:[function(require,module,exports){
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
},{"_process":199,"fs":198,"through":255}],252:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":199}],253:[function(require,module,exports){
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
},{"_process":199,"events":214,"function-bind":217,"has":218,"inherits":220,"object-inspect":223,"resumer":243,"through":255}],254:[function(require,module,exports){
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
},{"./next_tick":252,"deep-equal":202,"defined":206,"events":214,"has":218,"inherits":220,"path":226,"string.prototype.trim":247}],255:[function(require,module,exports){
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
},{"_process":199,"stream":245}],256:[function(require,module,exports){
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
},{}]},{},[28,29,30]);
