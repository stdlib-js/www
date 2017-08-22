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

},{"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":54}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":172}],14:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":174}],18:[function(require,module,exports){
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

},{"./nan.js":20,"@stdlib/math/base/assert/is-nan":10}],19:[function(require,module,exports){
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

},{"./factory.js":18,"./quantile.js":21,"@stdlib/utils/define-read-only-property":179}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10}],22:[function(require,module,exports){
'use strict';

// MODULES //

var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
var degenerate = require( '@stdlib/math/base/dist/degenerate/quantile' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a gamma distribution with shape parameter `alpha` and rate parameter `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 2.5, 0.5 );
* var y = quantile( 0.5 );
* // returns ~4.351
*
* y = quantile( 0.8 );
* // returns ~7.289
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	if ( alpha === 0.0 ) {
		return degenerate( 0.0 );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a gamma distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return ( 1.0 / beta ) * gammaincinv( p, alpha );
	} // end FUNCTION quantile()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/degenerate/quantile":19,"@stdlib/math/base/special/gammaincinv":81}],23:[function(require,module,exports){
'use strict';

/**
* Gamma distribution quantile function.
*
* @module @stdlib/math/base/dist/gamma/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/gamma/quantile' );
*
* var y = quantile( 0.8, 1.0, 1.0 );
* // returns ~1.609
*
* var myquantile = quantile.factory( 2.0, 2.0 );
* y = myquantile( 0.8 );
* // returns ~1.497
*
* y = myquantile( 0.4 );
* // returns ~0.688
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = require( './quantile.js' );

},{"./factory.js":22,"./quantile.js":25,"@stdlib/utils/define-read-only-property":179}],24:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid gamma distribution.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );


// MAIN //

/**
* Evaluates the quantile function for a gamma distribution with shape parameter `alpha` and rate parameter `beta` at a probability `p`.
*
* @param {Probability} p - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 2.0, 1.0 );
* // returns ~2.994
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns ~1.836
* @example
* var y = quantile( 1.1, 1.0, 1.0 );
* // returns NaN
* @example
* var y = quantile( -0.2, 1.0, 1.0 );
* // returns NaN
* @example
* var y = quantile( NaN, 1.0, 1.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, 1.0, NaN );
* // returns NaN
* @example
* // Non-positive shape parameter:
* var y = quantile( 0.5, -1.0, 1.0 );
* // returns NaN
* @example
* // Non-positive rate parameter:
* var y = quantile( 0.5, 1.0, -1.0 );
* // returns NaN
*/
function quantile( p, alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	if ( alpha === 0.0 ) {
		return 0.0;
	}
	return ( 1.0 / beta ) * gammaincinv( p, alpha );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gammaincinv":81}],26:[function(require,module,exports){
module.exports={"expected":[1.5179291128907453,0.5429740939738248,0.5691024938326366,0.5434457249226151,0.9309427199139091,1.047091074601971,0.8026591617242418,1.569938266849205,1.1926670327102233,0.6025929698166019,0.507528816788565,1.4851592962274591,1.2775881629784276,1.1871744702089742,0.7321955082573334,0.8978833999421916,0.8829815745640025,0.6325073870749542,0.9184181221367308,0.46915297707435594,1.46855766276739,0.625886739753435,0.33159926262698075,0.7552558791352006,1.2332767497189994,1.1247332665491012,0.6426855363212324,1.7012558811544358,0.5034717366356486,1.5459813658250887,1.682108733540755,1.0829282357004255,0.46731926882997143,0.7497603985796315,1.8527960079995633,1.3987415716167575,1.2434263803615158,0.8237905588917251,0.6915288530515794,0.48207197340060537,1.0325439142008828,1.0001939269569164,3.1231840263853967,0.7369401108822795,0.5024357764635546,2.069384392791784,0.6958119588044192,1.2087793072481292,1.5605506770247355,2.0606008137447223,0.6484601918165902,0.8199071826490423,1.7004966970384405,0.9467119915374432,0.6073947515648775,0.3531678920005541,2.3560309304753018,0.6619140670754615,0.496506764201484,0.87824524001884,0.9897241951073895,2.171302867299522,1.1073717958195288,0.7551469276373448,1.7407106942295256,0.41006126375344687,0.9872708073215897,1.008782614977285,0.7138815099140018,1.1803067167759884,1.2883417054077544,0.7150021339135689,1.083591836944265,1.4125563440399014,0.38225310686228253,0.2786937764740635,0.8090410354995212,0.5985739487078737,1.427907946735748,0.9527116903820879,2.1323980823472017,2.3395494552631995,0.640032123019732,1.219781338210935,0.3803887857796759,2.208773543539815,1.3312669812350122,1.6012463207012255,1.469965281942033,0.3380840245907176,1.2057645212872445,1.3428063559919607,0.4550864592042847,0.5566484389703183,0.49511004906104494,1.1070547641840303,0.37867276756980556,1.61300131783786,0.47044743461177524,1.365856346689684,0.5340540044068288,0.9369071312365359,1.614317398549259,0.7479031685247237,0.9920175587492644,2.3490422667240636,2.0282840962080915,1.0571149380476759,0.9123565628727812,0.8934978036847494,0.7085583171845656,1.5226554497223395,0.6709731831234262,0.8094845671796602,0.8808178229804151,0.643390091961838,1.1645730336411346,0.8475697149108415,1.355277276699991,1.320964297251347,1.0156143732637113,2.4554455844074745,0.9331265484955618,1.6667085076673624,1.2214674657038729,1.7695790294270926,0.7822743823276401,1.1170080214837657,0.5264077034356212,0.7811639262124198,0.7532491536939538,0.19830626115323402,0.8551726429759645,0.8057230567864924,1.3549965953231402,2.9836496393786516,1.0721609177734464,1.330386774547094,1.0503298671567605,0.6060047365745865,1.2676353482850804,1.8770524596088347,1.4671409431950309,1.8685788558178784,0.7561571649121206,0.36769798604379056,0.8043880833967254,0.4033191441427836,2.117678125218133,0.6285401476909626,1.0392130832218314,1.2491556967516246,0.3508005363484138,1.1648801213887046,1.4408075121746007,0.9710699782713413,0.6912618168462736,1.7458699150860861,0.4261217761392079,0.3595378111742396,0.8183706684010247,0.6089374166926743,2.433938240917156,0.517860548928897,0.36697111419138617,0.5678400966654756,1.2623988275164124,1.0615426832906334,2.1177087313621796,1.1682005939193492,0.7756377298826337,0.624707981518302,0.2884177686153105,2.3770476211086238,0.7270487446309096,1.0958234350485079,1.134600235287974,2.3441869992078646,0.561069715840895,0.44278692958972143,1.0262046006990235,0.9379190872007023,2.091471315675399,0.6359060136309984,0.7071926369035485,0.9954710276439247,1.5186441078249064,1.9378697034099188,0.7732828175961737,0.8419813054342683,0.41727440550647943,1.2798169127728127,0.8984214159855656,0.9211000490050456,1.9670239460584549,0.7799337930284308,0.482002979993621,1.2956459396111153,1.1472136613132626,1.0470178561903039,0.5841514767004146,0.9100520669809267,0.897172922396294,0.5147238525935892,0.5310651676930429,1.5266553187058816,1.7002594569018787,0.6841125651182008,0.6487282671743887,1.5694759860320104,1.9050831302854343,0.553285164719079,0.8485183022057303,1.2307895549505157,0.7371245778354133,1.5385516950486882,0.9247750534231488,0.73892627074738,1.205605121225361,0.9925981308842539,0.7296596591188107,1.821537822581225,2.7802954296746094,2.0366038838435325,0.7547341572670678,0.625204353547731,2.2474585638420845,3.4804501301090847,0.9352706894048562,1.783110987941428,1.0080245434955672,0.89782469696317,2.1208048500657974,0.8356135466878478,1.0702362989420382,0.8401354349684124,1.9519299773693235,0.7848189250534396,1.263720835727084,2.1512961467222693,0.780217433522003,0.48596636738371796,1.658528360655475,0.6129629112533843,1.4042268892407808,0.9758252203890068,0.5125903887303214,0.9100003451955917,0.747142328863045,1.2415734603282795,1.1292420066106041,0.6255712100355804,0.36245513813035685,0.7948407748283369,1.0982043370549328,0.5779720614413721,1.1834272072762249,0.603573530310357,1.0642248680140076,1.5909285830409745,2.459066969595459,0.7985638673426293,0.7898130777175426,0.7505944715912847,0.8364946120495156,1.1547519397453863,0.7111840610410041,2.397622337467409,1.7806507314980138,1.7156769294412004,1.2581823886150827,1.013277772382722,1.00197812506922,0.746713922278637,1.6417917588753603,0.2866530363135303,0.6407790250234835,0.7882349140860112,1.0248730451980117,0.7552139269786302,1.02825836693558,1.6689557712515666,0.9793106148778142,0.5215255941404427,2.404174987758922,0.8913997673425755,1.0755320789642528,0.569131930331252,0.9724682021497469,1.2495395679469754,0.8838599396474855,0.7306350424250763,0.930935418297907,1.1927674171955842,0.7054754244913028,1.036176442579026,0.5989100492581231,0.4763393474792551,1.1125555785626762,1.8278506504306553,1.1873599262148868,2.063328381986616,1.0449963254319332,1.3571225814361991,0.9064994633378991,1.3022180886469168,0.9467655212151594,1.2336718647076872,1.658204762311939,0.8504454957293766,0.8659374893043701,0.8086424440941717,0.5166035113707408,1.5000698001932824,0.7401732804907754,0.5961261322952147,0.9983772752273967,0.4594791222480525,2.3251677542528557,1.580639226350234,1.6635169925025604,2.41454490981658,0.8495915670371813,0.9506756586736782,0.7745609072489403,0.5666913715412463,0.486533632713503,1.173123638077121,0.901252269983346,1.2488500708991483,0.6788538768041321,0.42235838090146705,0.5720285489777355,1.0589082365803455,0.7093622995830865,0.4668713808737687,1.1998149604831243,0.41541882426716115,1.1757976174470495,0.8908697537769242,0.3900483367862993,1.0894592688823788,0.9305672720880399,0.9877788380773461,0.5334145803466668,1.5818260211599546,1.4714076792666115,1.7875184822526415,1.633214818235087,0.5375942922314271,0.871182345772763,0.7696251202305434,1.3179932519208515,1.5955726291364476,0.29152278005773646,0.4198107266194086,0.7295348108149502,2.470437516416715,1.2238190607368107,2.5659442955497918,0.8144023432131543,0.7828586860524968,0.4712271224972741,1.4970272066488974,2.7086183901087417,1.8558314780554528,0.9676237927572953,1.5175402402666613,0.6159547935598385,0.36519196151743877,1.076093522224978,1.9120865543596082,2.126356336743483,0.628030969550198,0.8825898925191051,0.33543781302181075,1.4441246524753257,1.4931659135853015,2.284067693365218,1.3509362316138243,1.9033696844167887,0.8243764535681684,0.5083660309303368,0.9350888778162227,0.6250238840747487,3.4423157187306,0.8562705407108473,0.6712193482504563,1.3600008188515365,0.9552511600760812,1.0690044537686942,0.7148307188576475,0.5782514136962643,0.80985547360347,2.101527871797581,1.1986512475358437,1.3210783003290207,1.2517669904909214,2.638540321719116,0.7545281794737974,0.6440823373280983,1.0072762118760517,0.35926975898352015,0.4790878364982962,1.0599407255554707,1.6121006225121646,1.9197738810673233,0.968459571178516,1.7956475145685085,1.316288083294332,2.3824679594058766,2.712641099399986,1.191203936868201,0.8060952122660741,0.4669916040885009,1.2726663524558794,1.5257714335112436,0.49205553622589415,0.8331115137681285,0.2632706657694861,0.46809235940438104,1.4257277941479511,0.8412704015612193,1.6190556486156071,1.1403139087990046,0.32465142271394015,1.6844522786027043,1.5363043989537417,0.9314783378804572,1.2535200959337998,0.37001078102755347,1.214919153127849,1.5601319305012098,0.6708704717776152,0.9944232811816827,0.8424345990940191,0.693361816517765,1.4389594178803222,1.5010898209109307,1.5961301884397396,0.9299140910273693,1.120010522745623,1.6674922332857611,0.9948221126949676,0.30930937602370967,1.4369115630041742,0.991324656841382,1.203116988785478,1.1514044871274467,1.284096272032748,0.4389405466211466,1.3367258112584903,1.1236030834908095,0.6372502099531585,0.8237423816377203,0.7671821935735822,1.1468413565389413,0.6345151792283326,0.8191172703804408,0.9319996683128141,1.5396117423126703,1.162146579339752,1.0711714317446837,0.8552279694445273,0.4630618941636559,1.5373727901071523,1.4665254837349941,1.2961396874170608,1.2438034473116089,0.22135168142810627,0.9809732784193367,0.5896642841936566,0.3827265854674075,0.5678619980795355,0.8465076083580572,2.3227993735576913,1.0758922658096772,0.5492525493092754,0.6133331356299422,0.8314400253620073,1.0852974651826481,0.5246824950245026,0.721577122950692,3.3641462498975403,0.5885321151873903,0.5338206116637894,0.786217215041871,1.2783423123419888,0.42845542144146165,1.6119554526317719,0.6619381485215743,1.0292925298099485,1.1658976815937456,0.9772674250767632,1.231463323241598,2.2951100373130804,1.454982121046666,1.2185896360898447,1.0900278281242117,1.4566045774086296,0.681035432642479,0.6838250009155941,1.8371004222379184,1.1176364884332468,1.0250526565921123,1.500545130198738,1.335598188740264,1.7759045104913949,0.5336061770874487,0.7574577312176264,1.2372717898477152,1.4000141843877627,1.0153356301068495,0.3592463132735513,1.2516347443855518,0.6469850316834387,0.9783351450086675,0.9155608825875476,0.667416029033531,1.576752543209485,1.0684806995025549,0.8883986499212604,1.0444105041749379,0.9930258726240924,0.5299133926752146,2.483081477718382,0.472081031294031,1.4402292163682981,1.1142195885253279,1.232659763763964,0.721443687006981,0.83771326831784,0.6181224305153171,1.3567521923908423,0.9578281463251412,0.3272430287394897,0.7758076339568271,1.9934612392115307,0.5454950845664851,1.2570354493031821,1.1309452340211834,0.8627108155057476,0.30119599161930916,0.9038045270867933,0.8349486556717729,1.1134196474598304,4.111553423734274,0.7247047548141037,1.267759901908907,0.6232035140212503,0.6199330722122083,2.034012349897445,1.7006843864682955,0.7950708696597395,0.7529917329272691,0.7624329067941971,1.0556903150283046,0.6542846472484791,1.094318970932821,1.0491189330049635,1.6379479569321296,0.8420760519109513,0.7167461704204909,0.7249153762340248,0.5180709047028794,0.8238444937128939,0.7234662321832158,0.7410445718384632,0.4345313319346761,1.5122247392009016,1.3345201599766081,0.6167321799863926,0.41101849240037985,1.7451354179583887,1.4930375467485706,0.9551868172523419,1.9384674135703737,1.514478641438978,0.5941356683359817,0.8139034927603399,0.5019627901212856,1.8031662942077913,1.736747890278767,1.0472692048178107,0.9867660028324609,0.5778092401509874,0.8810496979425998,0.7478245743669115,0.9668504698236717,1.0717936753337505,1.5927653976646081,0.7131385523926539,1.7183607373464866,0.5579505291148493,1.0155414969339747,0.5332015274765449,0.6260969718306306,2.9634041150066572,1.1540134245432843,0.6935612716205601,0.8717794483455278,1.0436973396966793,0.7681990705595912,1.2284534347930571,0.7213196883218347,1.7346165141709236,0.895513568308652,0.7357849970610003,0.4935283349276616,0.2825383026130022,1.460342607456208,0.625969776926849,1.3809744890145914,0.8785211613902998,0.33380948279379213,0.37948562851227696,1.740342274082035,1.8480582311921803,1.246298797884685,1.1941161200792896,0.562890240296472,1.3743134040996419,0.33383209850912693,0.6126750156341445,1.5671512205457883,0.6188797107769,0.5233077526994114,0.8018317633694564,1.5110210443482597,0.586101075597922,0.8995539036861697,0.936660978105739,1.3006101716123595,1.0208990891290393,0.4054394272568945,1.2759520731196399,1.839008840209926,0.4426680825031216,1.3017732455910147,0.5725930290256712,0.4053737996035964,3.2071210280803184,1.2411788791155212,1.6887588859957468,0.7778945580558911,0.579188383626116,0.4733599224048314,1.3971419083455472,1.3662612816663549,0.5918168312398813,1.1749171246992451,1.1992854064595704,0.8286063082394614,0.6608580788904148,2.5891362410464063,3.016000210186472,0.8702160526291023,0.689358498185877,1.4035068863401776,2.1819735869182204,0.9779013848461521,0.6339102324877721,1.1470287332762072,3.4664069739226084,1.2007224747312235,0.5741347250468588,0.8518392674611834,1.6539994731174186,0.6931330960983171,0.30433025841479866,1.3485883203162026,2.0283209876597894,1.0137831965987147,0.8313613291660035,1.7301426442863952,1.056423843213975,1.1911938314062187,0.3196291157456078,0.9121903609340548,2.2868751526582916,0.9363949344543183,0.9571361465526358,2.1855016245408687,0.9624006817726969,1.2641848283642303,0.46800953634758835,0.7760473178164528,0.6626117365528651,0.42770087092789927,2.619053024601145,1.1297721242533707,0.8453288569401303,0.7978212240108953,2.0422146931628924,1.799674000463664,0.3781707805110599,1.1557093864422558,1.1005317111940094,1.7857476626666198,1.6149104635214424,1.0888892036777909,0.35517582218233407,0.710897950320682,0.9825559049545002,0.9192791052293612,1.347676117123664,1.167867299226966,1.4524563566805935,0.9423179279643342,1.2138514196977594,1.2785226347874825,0.4242815277115602,0.37668313285446753,0.33338839320556357,1.3434546549199662,0.7348005163009665,2.358178229705307,1.308833406199637,1.4779066296651184,1.3997034974236777,0.573981039580535,0.843053496676006,1.4232867040867598,0.5181208153176751,0.8887926449696745,0.388325082740821,0.5608060422658055,1.8536587973134395,1.2139346318452326,0.5134364256670397,0.6066437186738626,1.0891088237220168,1.4327458555967068,1.2327537926145393,0.9224520268600429,1.2440854179940193,1.5847493719967654,1.44241283534548,1.4209650220251488,1.8392796850254507,0.8516877412892182,0.5856714315423023,0.8128719977249854,1.253931500359378,1.1858381971752225,0.37568833327649387,0.7640411957190916,2.43063889832245,1.6699767277050652,1.465610700589865,0.9497295693748319,0.9785497295706607,2.021668064852051,1.2039003172909677,2.8147833033074825,1.7619321330529607,1.0214508012403951,2.1575736597797373,0.7510697990474942,0.6407520705992283,0.4386126828171167,1.1243067043937733,0.923744480749432,0.5451027830530358,1.160825013023385,1.7756987459324785,2.0246103455810083,1.4506754052982187,0.8364100739604486,0.5510904697872333,0.7517830552113934,0.8575091215984157,0.8190240612819286,0.9292077003375196,0.8359678786851202,0.427992555027361,0.7466242588389461,1.932282360277603,0.7935749057641546,0.7293414569492059,1.4712261323115183,1.3378503622291067,1.3533861055781027,0.8977587800685263,0.7460466973224718,0.8134781523927885,1.4391874976283239,1.265319489811443,0.3720053924695677,1.2912994270936071,1.0210872537008058,0.6440260451202893,0.601925719909061,1.5290018424151848,0.49623069495340505,0.5584761528699163,0.9604422305572672,0.9280762753238156,1.312100562316514,1.490751134952785,0.8673207129982168,3.237777152253252,0.6344369448604548,0.8367129260276224,0.8006595447775914,1.3175430476457177,1.409435295645334,0.6244464879201517,1.456078370341248,1.92858586309727,1.2459728691797431,0.6581951271976771,1.3828401880188872,1.1456677268372408,1.548442167716186,0.564592470093674,0.6687558724397931,0.862146002341477,1.342533002428692,1.3083834138612167,0.9659739038744447,0.802186817252844,0.8748171534083922,0.7978000643011273,0.88885401232623,1.0969395169386733,0.895444132378043,1.372079215114593,0.5965482809055779,2.5374549641596156,0.8730025849236634,1.5990581566231319,1.3056242173806407,1.6895429578459613,0.9311866617011015,1.7577355055824788,1.1854318431267683,1.387943065771756,1.2789038670797614,1.306517382417104,0.7677629853204818,2.1186316526506914,0.6373303026625271,1.0731932632148948,0.821331753267475,0.44544825433758517,0.5341811896575527,1.0557561910316033,1.0185223343759977,0.6438679442372387,1.3721596917519139,0.4750019830055765,2.369849237301831,1.292599786841427,0.8170225753642242,0.41259784522972853,0.6770750190369422,0.8938744292504669,0.6445657951134862,3.3874274154905644,0.9088078060903375,0.6428168707169017,0.8465966194517501,0.7469226744707261,0.9699997663762622,0.38219481066107663,0.9483186169492851,1.3648429202408279,1.4819952815722162,0.6059875635767388,1.4068724345869488,2.5412053374691395,1.4996706254288223,1.5157795494496158,1.1851704769749727,1.4697796772208407,1.1442593073223353,0.49179894645518923,0.5109982612347174,0.6824151802774562,0.3953973536628715,2.484163760841825,1.743749080079043,0.7661652369433105,0.3523701596926748,0.8587347508670156,1.654567031719926,0.8989570774715984,0.3807055606511959,1.4389267560651322,1.1232877125516614,1.4908287813344296,0.7283251459568222,0.4464447230404502,2.070319758302646,0.5541715396646745,1.3623091866711194,0.8299179928940071,0.9014375514577674,1.0524279095834437,0.9632293176808564,1.9151811523017206,0.536648245234668,1.8364255729862957,1.1110265254919083,0.5628134811086455,0.39004578354549396,0.8681982572193595,0.9063914779900719,1.1390981587781623,0.8539423303317959,2.327161209681274,1.0000569641631925,2.2824984394263703,0.6743146930133967,2.8459900050449307,1.794044992097636,0.6989332233099013,1.1972277381712793,1.0447367104616867,1.1620237837730045,0.4571507912875571,0.6197241538210498,1.2835793179279829,1.5954059844985737,1.0961581751625615,0.32338017703570976,0.8231476243903076,0.3395867865035678,0.9415658927574458,0.6561108072473419,0.7461639621383226,0.49343249539987494,0.8820256597292004,1.435622936210449,0.6659078188990056,0.5553751142593347,1.3750751469225622,2.314304489958938,0.6377300284140389,1.0437331911354295,1.100548058536803,1.176170335952855,2.923060357325087,1.4517916142515448,0.6796817099336055,1.735713367027714,0.9283056332242963,0.5707153165288402,0.6704663919241641,1.6054264917507395,1.2012218343314973,1.100505047851578,1.7728160115679141,1.9161511769273991,0.475348282483636,0.7586415216480061,1.8105098716287433,0.4841797198932871,1.2240231874874519,1.749403387248346,0.6299795588661328,0.37228317027026614,0.7898907127850315,0.510162996481093,0.5418931412098408,0.5192565979966361,1.5724171540481893,0.6804704752598014,1.0670990472941724,0.587119783427756,1.0232041644814536,0.5576437328650579,0.3264405627018063,0.4931874427853318,1.0289165469783796,0.7995957408360661,1.2103824431292827,0.9138214156473374,1.0099051756966133,1.4133764291629798,1.3294858036572361,1.5953787282932723,1.39436002810314,0.7916600096743873,1.4032956607707452,0.7924384677284331,0.5129862293101026,0.8352497945726556,0.9424113701229189,1.5690416277390402,2.182711826915748,1.6219309071534387,0.3408841111212402,1.1554158107682686,1.3480368536862468,0.8116600850069877,0.755006319220673,0.9509025233795804,1.1234873298399932],"alpha":[25.95163929846659,12.078499621800066,18.739277545972108,14.852079501359349,24.140561810862312,14.724470157780548,11.174086057929244,27.4862240023492,25.89172256771135,20.536078117648703,12.578438037862046,29.805047572685694,17.924021088811962,19.79153077265662,16.34821817727396,17.465991971547897,10.958638376500097,21.90895884279973,15.933251284806445,12.429536099201854,27.873746059122343,10.465708032209925,10.782639244683093,17.28021088211711,29.24255442742932,27.58673073148675,17.159385655793443,25.16538733177457,24.31907576971113,19.286019064136013,22.22026974153291,27.01511365800203,13.178550784263962,19.743305843312147,19.553729796774725,16.478158920793085,20.804255964551256,20.27372577740708,15.410104955369736,14.636249590839014,21.508577389190123,12.033466152597159,29.996502055213767,11.583408909353095,12.960223296560782,18.165705293076716,13.920178171434117,25.898795393155744,18.94773685129701,19.267088454205847,18.20310753285287,15.442478425884257,28.125641307221848,17.837084314194666,17.722974894625594,10.58692069841296,23.998993376082712,25.256064798651785,11.982446982819397,26.294733475165145,19.03062466850967,26.719390346548675,20.78232276976133,20.704629488941304,26.661840929703125,14.031064017097773,20.10026702720951,29.063660151862845,27.976537413611435,29.838001289120633,25.843849174294743,11.277884029838688,29.118048061869565,21.76844949338408,15.264899687541389,10.684068834794548,11.763336224303401,11.43527893789512,19.194519233823616,29.047551022544948,24.591603110173953,29.263845771902346,17.609237349005276,29.574916955981365,10.325769940007845,26.048617902058826,25.299182996993466,23.3454660869393,28.94041058988941,12.472383505080327,29.823212523437242,24.390268892707347,14.437938743456499,17.449147570484257,14.938544379659543,28.190188246632367,12.775991335358334,23.61303146981126,13.4756004399827,17.467267377260455,20.69305298373746,18.395814284774772,23.941686936535937,14.470769065352984,27.61659418924446,26.78154005714009,20.2180554894121,21.435902947272872,18.112065895714366,15.943245417230457,15.250678646200871,19.500633965844848,18.2161555284474,27.019845776910056,21.256451820356453,19.23148789647573,28.375273211422254,22.780570280821216,20.76860043619229,17.662913460124162,14.620172444969363,20.249172775924407,17.491983294941832,23.435408738668478,18.549883334224422,28.358572352920515,12.208874188340921,28.36282312092427,12.377551214652108,21.55893733026715,28.20388226068692,11.696062469890837,23.956654556775785,17.084382179874417,26.981974706440273,29.340862155277563,16.715124002348634,28.93917207206396,25.58530985930056,22.71558065749616,28.392838436154012,28.570440044865034,28.640470059474204,25.065609576184677,19.49172768728478,10.87353518090842,23.048632829296643,10.541284893803798,19.545787563159244,22.019396343877673,24.692427089523964,21.733146474521774,11.713934751804107,21.632976105906423,27.48600748271897,21.43181273637021,10.258342615662368,23.15598306234319,15.926561448835459,11.129470089866595,27.557679249337276,16.627131075572763,22.29733426085265,11.32108601173532,12.6919100022939,19.794960291183376,20.52530094122593,23.228656956075522,23.205458352135725,24.65995263280601,18.167425690296174,17.807995255034037,14.629835892876613,19.597563750763904,14.267198775216979,14.873015222315917,15.775019263729542,27.567087875448294,24.13020468515092,17.17352465706163,21.61630960846608,26.855976908415915,28.361388608517125,21.256922995659252,14.364129388611978,21.248503411392875,13.45596312228865,21.619390913141427,22.82384817909221,15.76432879031688,10.49104774924501,20.410868765791967,22.873874530658036,28.680909711374916,19.117610628403394,25.57747557789177,18.022123612816525,16.029819197504985,24.218479129220004,18.964299061400503,15.224286802188134,15.627410195797014,29.377226389045642,13.74612834156492,14.070325801378,26.64572528510192,17.358818158113248,10.040787243849568,18.839094874830383,28.18445748288172,20.204750005950217,15.126611203186036,11.400578689459572,11.970288506067366,18.91385411891457,28.459902417022764,27.26983832591067,17.01850415618461,10.058072352912731,20.414814151945908,11.216508542148835,24.851588071240435,23.347325375558473,28.33682998213222,27.354515832686054,17.265656666830044,24.05912452302494,23.5410810559642,12.467951477031583,16.942454688063073,27.987009184974013,14.040280682126355,19.858536667176608,17.289971583123773,19.704204574573897,13.503359423953064,25.0846228318956,25.992748762605203,19.22622270097756,25.517764946342577,19.78923992131433,18.19304943422945,26.439435583801092,17.3846985172112,28.80919057011655,16.78119539094987,12.270918343346615,19.033485402624724,26.454857726330996,16.84914164295977,25.943386139792857,12.821803988777742,11.105979972904251,14.105749429817669,19.497919047231925,18.344878006513984,17.29955175558024,12.34470923822132,25.935266343584967,28.462823535854582,17.020640777668955,17.326747196798582,17.78373820056573,14.647455441309049,15.072550078520646,18.5348370691986,24.30770660352423,29.855139220441814,23.568635057692223,19.906061061000862,20.637844790723104,17.535112814848585,24.128855906689758,20.623841969002076,29.009813776580636,11.880436088314156,19.001186841892384,26.70374748164654,22.289701176471112,23.767868058718385,13.590711030058614,29.578433079164324,22.97285161903215,10.362163034538789,26.610279542019548,20.393425924047342,20.502507564444286,12.152724803118256,21.51335812628258,26.757945333002482,18.128716441727395,24.392023994069643,17.62146033803787,28.953772820511972,19.912001920163487,21.141054668887996,12.72601600330978,19.71194528277384,26.35037210943548,29.379094452247006,18.257241441040524,24.7671074324782,18.25944621907506,27.710374930220212,20.646051427653198,17.207923704968447,20.391392426300023,13.566380131732409,29.640542115239825,23.47326961881818,10.181089860678401,22.38287559631894,15.591190084289014,26.90968502623086,13.543580984400938,13.945913151781827,21.512603754014346,13.425708998050698,21.361818455626643,25.63727301343048,22.28669220014104,28.59532406157275,13.619350382817546,22.46145414836193,11.288382054175731,11.523898913532843,10.094167897757957,23.80427261196609,25.85515297957453,21.703919740440753,13.819240563282943,14.399980361239031,13.088742707523835,22.232929935500465,19.35313979139403,17.379860697869923,12.84847999641423,14.017536384329121,14.938340352893533,24.17503187304297,12.797863172173836,23.687911782845905,20.505531029016044,12.730084119763037,15.53222747687196,15.940942628761704,26.984930265302474,29.25068401957008,13.255653035522501,11.174208878660753,23.040658175596718,18.33502254642266,22.26136105711124,11.910475092539784,11.628735299800287,12.504016688679664,26.405345684286527,28.64156188018597,14.0908886424217,26.801453405637936,23.55786282594738,18.257653565402027,14.298918544253315,21.43472961593126,23.53691383887707,26.309770928364347,24.121614010383496,23.411168899077644,14.756572093342006,12.069902369533128,29.318475266405958,28.359284787855913,25.205893052590866,24.323502649842435,14.171470552722209,11.271188227259422,27.49398494931985,26.046926825700268,27.14833507848185,21.91595631733363,17.947183178323897,10.225150408594917,12.804929923617422,18.14320766509741,16.202796406215167,27.096497789266643,20.285756643668947,14.118631955731281,25.204564887966168,19.230278691950573,26.54805110269979,15.193095081155853,13.476257372225025,21.183001963729055,19.161674816125775,21.326340410883763,25.10604150650184,17.605702583852082,25.782153247033243,18.152589800306686,14.560487306359287,16.815666925282656,11.136148524776237,11.037596181151596,15.971673370392331,18.033940914488333,28.565630080032115,15.921092279607079,18.750064593196072,27.48083440482374,24.820725009319396,23.92048490182686,26.990668540774372,20.675681305440357,11.542246118546418,21.986900123739005,26.834426629678134,12.798134968606409,19.281787357052163,12.056752205507033,22.665987624343735,23.97255099432352,19.46084896220619,16.131032415662908,16.03908282468379,10.086324454303064,26.231099056153447,26.936424579271065,20.94114874544195,29.510964284083748,13.80911522656914,14.953968475791392,25.912317212364723,12.688491432425245,12.635258962262622,17.73880620819557,25.58256232591262,24.705842682951,29.847820612991253,21.5272123153067,12.379694720990745,27.054240878936334,18.57200944523656,19.818277893139758,10.179568680785493,29.822261271935844,21.538298881776342,25.69826975393749,29.38934676523488,15.613080483424909,10.148527780155279,27.987457810798745,19.847319589247952,11.591813061985206,15.22028522976138,13.057274185222134,27.519767587919368,12.091060295071149,20.093381339478547,29.35912562610288,16.55674904372168,27.122489100513288,20.719874261309638,20.34619911691574,11.123122045168245,26.946728055250624,15.452325571094967,26.723898952185724,26.844031017187454,12.957865712150024,25.824656306462913,21.58437115240108,12.051048116409993,15.82623663371978,22.28597238164219,26.11843658015426,14.461076779409442,12.835252587190471,17.512498109028236,17.79851889302986,23.959549606393256,16.60126235369021,26.30008134053941,29.137358237684676,17.908864151335614,13.17401059609971,20.993789753720307,29.560504389604375,11.738122985393463,20.83894309982332,12.26288870673005,27.719217718924316,28.36250376161945,21.49238832051271,23.440514544105817,27.114314160537354,21.771700054318494,19.959665380883468,22.869754392815107,21.07932380565338,14.52526433433874,14.465989760718077,20.33285287133324,12.800961604241895,24.19625165822785,27.121734075898157,19.662991875860545,27.430010509089186,11.169509272422214,18.816809990026346,19.800766813291087,19.884309387822423,29.164740106263242,10.112647889347137,23.80076562440898,21.283098460602055,29.346250710074408,29.030826637507822,15.97398596090331,23.552029272974377,18.501796197487963,20.325335334032776,14.894005382914246,20.005702711844467,10.325605785832416,26.172590308403652,16.00482488575625,19.65450972695281,17.978814941736236,27.562703786296893,18.86271298503981,16.372470517610516,18.90866429054576,26.399358657723873,13.407057572398383,10.673520116107834,18.92602559352069,26.234966527000694,10.605712599445036,15.057315194378443,15.80007951574823,27.955743555984323,14.68254602824456,17.53797554615359,16.73358815263999,21.30629814739235,25.965678100782057,19.19081387301174,27.819386953659194,11.925898933060486,15.399274642603178,23.27609312088159,22.79100467044906,14.999424840656275,18.514793887048103,24.95025361093039,19.440287396990907,15.76465973479555,20.93415836962277,16.588052036621864,27.722754655635132,17.8655402058845,10.732213561432683,22.793784728736455,17.558307256475004,21.34745534245448,10.77948924462957,15.791065907376689,12.935034280844203,15.931047159805889,27.755082744038315,21.622980658534836,16.539398655247414,19.683572888286058,27.65874109424919,22.29161490757487,22.956925378589847,28.567858244017586,14.619168298796819,19.637150648336394,19.025458720504453,19.729962197081015,23.19741572990642,10.37809408329843,27.9680847812227,15.392304977778553,19.58195665494928,18.79051379308187,12.948286466697173,22.647587338562364,26.872139850286963,21.271222136177926,29.195847582286977,18.5633293627992,21.380847112050443,17.113622402505616,18.537524722259278,29.632488585397926,27.629055091023375,12.0514362983677,24.6822158188491,11.096771250980911,24.33700562266445,24.754485745908635,10.335897633143443,25.272969620743805,21.23906586063565,18.62040936558688,13.336943185409904,14.118529800326879,29.378499685736262,18.48668191764937,23.475482329420498,16.618799190952362,10.025953102308236,11.849312743512144,27.489308745690867,29.592683803733976,16.564810184745,27.528234525677174,12.404963342801544,22.899008473608422,10.632884770809682,10.283316552668204,19.024898952017505,18.22295321417062,15.609064362247098,13.624120643160392,28.115124811472608,16.491238518983483,28.158286862661434,26.267950681567275,15.841428122076193,14.226729708902756,17.573520243066355,25.04231461923567,25.928931536167482,12.147335675263298,14.78635915136218,27.9444165486732,13.261911920673404,28.731138630940677,25.802953593038755,28.505186411808552,26.0396818376528,15.290675644681432,11.823977986443058,29.09474722714977,28.445176901456783,27.105126171476122,23.907420965235147,17.139720834610056,23.266974627412516,12.555822100475877,28.19689003583205,27.839088004484033,21.854859845711374,10.63252682829793,27.365885718018433,22.86048693122332,27.54676064725946,15.367210717320079,19.737831145973935,29.229714055783983,28.152792084921167,12.20206191311724,15.66843884777439,26.21871307793066,20.28094180147216,10.530561550511685,23.37715498204328,28.257221509354107,11.10255861040776,29.795811097150512,27.83603430250811,16.708132632396907,27.79055911639326,11.083490813121335,18.718107588952037,25.9276406613939,16.379429482495453,20.348074000432817,22.880242633200783,13.92743029049129,19.526912068145275,12.306083900637553,13.217224907109127,28.61240345075601,13.529904050404546,29.061185120302746,23.5625852480403,16.73568230543306,19.684793771283605,22.83125631813324,26.192072721241026,13.525589040623789,20.527579755849956,21.495357768528415,28.871221393017667,20.607506657067844,10.282147966853504,15.686971302772395,13.819053704202378,13.467331188003534,26.839355687858372,18.302163256979757,20.813036687505424,24.480082369785755,21.376393730037417,19.943030851454328,25.83064229409071,10.187753489997133,10.282191162655687,10.145817927958598,18.78020590055025,15.909983343733733,21.27501774714308,29.179091839021353,29.175524515264215,26.938085168436437,19.075131757790075,11.044159436606495,21.94279981850563,14.5977281980216,22.847794274317536,10.986633287589655,20.850976167540118,16.720581770372522,22.83612107865479,20.806640166279852,19.858554256965533,13.359249561820281,29.180047243212893,21.315130798489875,10.825948167196358,29.69801404107987,24.980064062316366,22.434735304845134,27.559194615713896,29.59522119519629,13.022236130753019,15.600890499188012,27.159952874860448,13.497536176900331,16.831713938731866,11.145440307905364,10.749770384659714,22.018828094784748,23.225603455627063,23.95871114980335,20.9145318112119,12.371599865554398,25.172869182680017,26.381142006127135,29.285359008472458,28.105748602363896,23.65545950051626,23.64694410718571,21.17225788009125,29.205047810725194,18.11630057809289,19.509525017456937,21.21382565246553,11.206689766780498,13.036808188918737,24.22991691558332,16.450367024179716,23.79624633612094,16.634764560604076,12.797129169473545,18.908307911736806,22.766532962900907,16.290535300312968,29.244699073371677,24.166652128183994,14.375636286933911,18.87777724002641,26.10921692411835,14.188698933111127,10.049495131955485,29.78184184567036,21.681358775387384,15.201452530516777,18.522963006037493,17.010857493297976,15.348817841001328,16.47704815030561,19.016110009258206,12.587830960333996,29.100282956630664,29.03424230548653,16.16628811138369,10.340321777930388,29.245386711246645,14.887675545135926,13.908844707249814,17.181730950370756,23.65669744971163,27.43536551626879,26.860619136314185,13.588802149278688,29.092957314805442,18.47261741473512,18.99391067932836,23.891387705991647,21.76234126729135,19.230972365919925,10.952822966973411,28.326413667368083,21.591822169415767,16.814420322579515,16.736827032261633,22.499034255947944,23.495001425572,23.509652996713303,27.54586393750761,28.33737277202088,19.035579035544664,24.770615850223066,27.426404092418927,16.86622299725949,18.5755335312887,16.285191822160385,17.212416677642565,14.356577479277068,21.819671415541762,12.234438447114279,27.205829387281902,19.68357106234899,27.597303962803636,19.79704076428639,16.269629005551522,24.031014341758613,28.654877131096402,22.177368207541505,11.54717369446776,13.74455372691262,24.260199606734428,28.83575065334827,26.67082311786349,15.99330761559135,28.57412221275057,18.215557830348487,17.34794906859324,28.785155787267218,11.133268274765854,13.315335702661883,29.191726413310093,27.264999231700223,11.287004338992702,22.078181672041968,20.99318249590858,25.145932747198604,29.06350584468036,10.601865755864441,15.668061615785858,20.20591210742309,15.374580347056902,14.849742140268543,29.817702696588263,25.22848993025024,14.521414533964819,18.619783545183974,22.53912291790758,10.056453813264401,10.85156953585512,29.228318620611347,24.84769746927315,21.06874748875187,15.634176926052028,23.64632229677224,24.098637100894493,25.17361334431678,14.007622174593601,29.500759779365392,26.68909077404217,16.736533069917655,11.590521150061148,11.069594292573552,14.084565230265538,17.605111021080297,26.980891615577875,29.70995059601311,20.65631564055267,10.50924763972839,14.328579793387819,21.283192073319736,15.68588406829857,14.317390301845814,28.97402999781939,23.248302096726405,20.031196638261836,24.14704987463537,15.781841360154743,27.111228481029947,15.162815380275969,18.427177405626125,12.904547706304236,28.351751961430388,25.404128515653394,23.33371980004861,24.4844655863781,10.811894942071639,20.253412373722664,28.27918970761811,11.302303413689017,14.18556630653085,22.334378282688196,24.69674338112196,27.429960095394055,16.412275914480247,26.27171238761649,22.076367364043122,28.53430227688576,22.025339161951205,28.69177133975837,26.948883801551546,19.123445871786274,19.913272656924473,24.873428747991035,12.87284391451224,11.589985929292382,11.207995941023384,23.86660037574677,29.733297907916672,22.229241703348876,11.612367448485967,17.291333257468967,11.600437520654726,23.018573166995523,18.01577082150756,25.566943221801374,14.224333476160854,19.679203966534125,16.700441934109556,22.104645577486703,22.314427518848706,27.381107373841168,28.640136702975067,10.021705007151391,29.664614782584824,15.224050097170721,13.352848211582312,29.484526964017657,23.692249021582334,17.568473795829213,19.066509312513954,20.943334231097587,18.224422866184486,19.168516520656325,23.29320967313221,17.808171135994577,17.3435759893737,18.03008938982945,26.655296161553057,11.823576043098218,23.147329543774763,27.049540607987375,10.688142300114642,19.621105938572207,29.9290173438976,10.852414531316988,10.895549438349704,24.025734368700547,16.348081235990428,11.733392246544852,18.002713348059793,24.032881811330302,16.113784860709764,15.323676695787714,13.71626266737579,19.18809265477264,20.025789241377257,12.03652797029906,14.648704671303449,13.00622292640275,22.1473586978654,28.912672794845182,22.83988967795318,20.22204826914229,15.935306644442067,25.55679702527444,21.735163650121557,23.32670714999565,16.423386920787856,22.421518767424544,19.022703867445074,10.407770634432092,28.130377919076647,22.69666121939762,26.425545850056146,28.110587022756704,17.115130486826835,10.87780359550695,22.219803240397006,24.029553633693492,25.4856761860565,17.3384968667157,20.05186763224539,21.641189070787842],"p":[0.601860514943092,0.7579433904015795,0.20973341101848542,0.5665796706745934,0.4739376292068971,0.7190399420975242,0.8394215851445046,0.8334395934654948,0.22561815827814313,0.3083990151521492,0.22781449356682737,0.29794987409379714,0.13161239211642317,0.773742060836482,0.31900349489385427,0.8627440357498344,0.611841548307116,0.16292169758939545,0.7884213870862966,0.5290914513160052,0.6854289812220284,0.9650422495225814,0.10872721646281258,0.5696484557810626,0.5585945248230904,0.788488521186381,0.6358971808547038,0.2562053598590086,0.015438539542993235,0.8372877835455099,0.22169154013685488,0.5952568580101065,0.6041052641053029,0.42914491790010656,0.9450975432639726,0.3867085278459359,0.319373037762793,0.3874276791718181,0.5160955929313993,0.3510606487711083,0.8911423795528892,0.4614214401854766,0.7466480033534153,0.38105211930995897,0.6615835382802149,0.7987331660260928,0.17258112734019138,0.7429712733930838,0.25818113285208844,0.7734787982337368,0.1991704467936557,0.4771712367045682,0.9160129647929642,0.7863319051100957,0.21293720660148407,0.17252934589217173,0.8938616781567952,0.008893546981214806,0.59726432369629,0.05997288927755573,0.2818358713592901,0.8759872610168631,0.33250504505606626,0.489910807192365,0.8469329847260842,0.09319726467257472,0.5478737697796063,0.3509515584626126,0.07389887755550917,0.6391000341155564,0.4544962341177623,0.820626214186623,0.18568064194781497,0.1341907720600264,0.07863142076932483,0.0995972788114381,0.7716035313922669,0.5303305212385454,0.8458238588028306,0.012723302438356177,0.5852342747181749,0.830459838958401,0.5622499790826858,0.6301271306653196,0.6019004176081961,0.2878414358539665,0.9730601743020406,0.9000638269562733,0.27264270935881485,0.26864432814487826,0.8292729667689132,0.753581771087412,0.3822338482395087,0.2043420036971102,0.23318145324276496,0.4965356785072441,0.36810401939048565,0.9407793404518692,0.6019258734484021,0.5249736904442761,0.060718803599727256,0.96720225057241,0.6702003506114793,0.055615527376020824,0.4490376996174865,0.3792785746082261,0.9653920390953925,0.7435479315195979,0.6851153169543625,0.981722932316174,0.16323314795372013,0.395520210860131,0.13496092428925333,0.10520990566006416,0.3828509369600914,0.03010735724789959,0.32831528901394,0.7267478147875546,0.06526468412957476,0.5821543729777394,0.9825419652849718,0.9922528570467171,0.17161695105875996,0.9053284862750299,0.4263612547290705,0.4043459717191833,0.5387595346531686,0.8100873137639981,0.4482194600019831,0.6488208941672031,0.032103690328878276,0.017789494284537577,0.3529913234115043,0.6379687538433338,0.7087839852607338,0.8523698826152812,0.1824935619202559,0.10350204828243537,0.1775636036890751,0.06771193226602801,0.48591664710616334,0.3464822493497661,0.5251605120910257,0.8156392330461439,0.35654241778223716,0.2435457050469736,0.5063196018647551,0.03138042573113364,0.9823466940626198,0.2250795580493481,0.7635198212352148,0.9369731782412685,0.20906309537650358,0.0829568988483198,0.08846955891414887,0.18948013174833522,0.7504851196963187,0.38611651683318327,0.14982514035407313,0.14692561001768278,0.19168727582382994,0.16671336931958392,0.9470118353937687,0.31867554733242187,0.12119663493816657,0.2807082075218743,0.4760274669944322,0.24782349157943218,0.36561006086226366,0.7446513308130214,0.48702208608506914,0.5765018930702077,0.0022118936104369435,0.9571226059981928,0.40615247772407237,0.45493948873857626,0.27774788945227136,0.4145763267636786,0.016277943864203115,0.07736318524964281,0.5428236265832571,0.352375740807759,0.6214639092793652,0.18433452684185947,0.8410412151509765,0.6960948884110698,0.8042454625930817,0.3681328144101561,0.4366223502755169,0.6681801469105377,0.45611859110884545,0.2855535426627023,0.4780378342527014,0.29778626216695625,0.6464377094310387,0.09488521965481267,0.05873354164539801,0.6774241303455792,0.8796846061037471,0.9712891793765586,0.3007552045919526,0.8245492836619417,0.16220217226878697,0.15859804401706334,0.0026188565962728116,0.93682654728877,0.5899842933010047,0.6842456432034427,0.21813524081815605,0.6829506697265777,0.4973611918577283,0.25936734171062636,0.9262592122331295,0.5803000243509364,0.24373246140835425,0.819541912269955,0.4553606109797401,0.8291117836771136,0.9553721440345644,0.9305322742811906,0.9838440883513173,0.8396951004267215,0.9539795355836775,0.8899675865698671,0.01204162646676199,0.36419562803519767,0.9695703411633734,0.9872932756359343,0.9275897834050864,0.6264933299853945,0.2574195803614119,0.27463292684682594,0.7526600851981122,0.9451311286741311,0.4958758666460512,0.9160886014252618,0.7806684027356288,0.15859323450649643,0.12148789637794222,0.6286914555423215,0.2974321873199235,0.07087582851060703,0.021921482655728797,0.6124451690229398,0.41183051928353165,0.8620872475498254,0.23584960002416144,0.49700417733098634,0.10163073677078494,0.5549055715894029,0.6479400901141597,0.9301023104581432,0.2914697772516037,0.45904777180461687,0.013383738805497813,0.39188307228553154,0.24199953991983336,0.023850442784025594,0.31784354903586487,0.9203860144060199,0.997119002741345,0.9067963082650885,0.8882936279662006,0.800838117816878,0.5136944746631826,0.07684829594858567,0.16303418733881347,0.16443289970610442,0.7982533243600254,0.8987042043719891,0.5143755242720227,0.20188065696269675,0.2451716886244888,0.6640201024928256,0.1458986009072043,0.09842061078838027,0.3295365018833183,0.2055305466342865,0.907222092822944,0.40131762854390174,0.5794922391228456,0.9480235358998597,0.3223638471507304,0.13758483493415663,0.9558130320180187,0.23395195610801234,0.6971109848879053,0.8833653418914722,0.5856454137673501,0.8492722354094677,0.3732677503419213,0.2584865681098676,0.6804675417753954,0.1785633279818455,0.5912834973412606,0.21388052300355898,0.47630633892936025,0.022704373552631774,0.8751644232075704,0.14192262254033716,0.22996673899032372,0.6163182884546234,0.9594614472928664,0.8041784138114674,0.7671206978580967,0.38456139317373195,0.5558041139228784,0.40439658198430695,0.7713570071082505,0.4494218100888907,0.9048236845516873,0.22070454981895637,0.2867990914378664,0.19779482488058542,0.7315885287909987,0.5032902329538045,0.15282002720550802,0.1317201783825903,0.7647181501152511,0.5136093372101069,0.6766255803053709,0.43156314653798944,0.7387098857540393,0.6774275002542514,0.8607070691978433,0.7175883496108142,0.8762055577036185,0.4093254640097659,0.24842741561157022,0.7867994693875235,0.0992060757575095,0.03287416850663516,0.1920431123845785,0.3231857827696818,0.2471186111502366,0.14825454975509,0.8723583971400977,0.32431008939983674,0.9781216806578474,0.255952053809938,0.2183246370853953,0.9330754924574565,0.3562819089863809,0.4847127137865974,0.44876274370199676,0.7816635427516643,0.42981078157656194,0.8795316932595851,0.8526107869255712,0.13902934459196037,0.24122174842056632,0.3751877637104184,0.31367942996453335,0.9293462951184903,0.13692200457205095,0.2295792259477416,0.16752834720287368,0.7370293631980751,0.8095545643154847,0.607515932862962,0.1334872123288111,0.056763311581512266,0.28521371302009135,0.7884002022188275,0.9179416510888856,0.34624047950719805,0.07739095680270536,0.2178940444371773,0.12277343347739733,0.20304088147090438,0.7058056026713071,0.9332810432287875,0.9157305700831793,0.10538341071554447,0.9238476128331099,0.369678635052215,0.6600407852183534,0.1804940753410973,0.9863007539448492,0.9484199504806277,0.8261793008860912,0.6884216596755077,0.7311705952564833,0.8870859565657954,0.36922291084952374,0.9255203359711237,0.09706927718983271,0.08616193266703354,0.28959433227514775,0.022827470438810726,0.2895618747547104,0.5361092968679189,0.7550016426712798,0.03917542348541825,0.9978564247238584,0.9910735629945502,0.36690531452046615,0.94739492424792,0.997312329782041,0.7436026280073111,0.4339338069309293,0.15536357622361252,0.3729950623226592,0.363836530575808,0.3762188368621968,0.694333539022947,0.7634169678910574,0.4520541272461165,0.6672568122065647,0.637463839334623,0.9370051749318524,0.9424485481733011,0.09444953884029239,0.4316542324195647,0.2830153504864501,0.8176094453602096,0.4965964862022907,0.3372206834661615,0.8291559527243073,0.01523596646171832,0.020519184421885273,0.5809338672977038,0.5132315653823318,0.6809010826300459,0.1877466602696123,0.4556872421972924,0.9992466536345264,0.32498840731903766,0.7728755779400749,0.02276623442864789,0.07707191677984548,0.5363297133737257,0.5444059050595964,0.26537028847295674,0.8605881171370979,0.40518634682435284,0.046794339419442554,0.8677267012309029,0.6844349750345797,0.6198589418800275,0.948445007587819,0.46631244502473335,0.6526842526651284,0.6317319758847286,0.2486809411460651,0.2087594194219471,0.48757842161185083,0.8041734275159413,0.1687019581376299,0.8876403595219562,0.3919268921882757,0.593072475630785,0.20094700106442875,0.9336077020483826,0.8405529929577324,0.7111247068872122,0.5857114515733051,0.6492458274331934,0.754212466931879,0.3068198870570449,0.966242682282906,0.4761843318658834,0.6350517061380889,0.8599570722347256,0.108042451944238,0.28503779042180777,0.859786193872456,0.08247354222095105,0.4436693798712894,0.016490689688732463,0.6239478270326002,0.16390494011470524,0.3681755488299163,0.4346689878120027,0.7483200919087063,0.5951741905886971,0.8584194504583071,0.5999173869075998,0.11907982853962729,0.7357316024595875,0.8146941171300124,0.2519736068359568,0.05534587254499934,0.916964365565871,0.44824633185065665,0.7942445748590434,0.311201009285641,0.8537330163385548,0.6097343330427911,0.8575449495772289,0.9270437438121719,0.5518856262714695,0.5548309672498644,0.36742780906774963,0.7288376595978419,0.7871599897633674,0.7135434391258693,0.20292300284509168,0.7212933441061673,0.8981720814918275,0.7958281587058103,0.6070445579475234,0.8845721709238008,0.7109878703340486,0.2629083633456193,0.5650483508749351,0.44858639365665787,0.9102736620620813,0.6250337970002868,0.219390934856035,0.5198569985912929,0.8841306680045782,0.13414878427779908,0.3613522829374427,0.2601562131322761,0.06815798968187337,0.09951923513551786,0.07246661450868297,0.3793326610915,0.6894053757334522,0.19914386222407887,0.5605790096264218,0.32463843098800127,0.633371326420952,0.8523069621242652,0.5084314800996157,0.30789201725753856,0.14957836329747254,0.4039076984473011,0.1962687178083129,0.49259837295503694,0.5733647626078986,0.48136171295461705,0.6713885721806936,0.9994188127848873,0.3071232995485027,0.843013675964114,0.9710916839401547,0.8936011336244871,0.6073923855587255,0.9940344377212313,0.143536956292323,0.04767715401080497,0.5146775721249846,0.8009992853356682,0.07118718510904753,0.9986769705582692,0.5462948851489386,0.3905618156045565,0.871822368885296,0.4290600974210237,0.9013785550103419,0.46115566619836423,0.8664367092674508,0.5203249458028711,0.35856870854289236,0.9115075055609423,0.7474349800469859,0.1342660258096855,0.6335670825053379,0.2249760959055096,0.34789117434490757,0.7533023079259609,0.18851095415169605,0.29152791279634793,0.6220542229641421,0.6163922254929284,0.058523525976920565,0.39584136463635744,0.8723637843477441,0.6850920019368936,0.1494764149533243,0.09188003453031413,0.9680669431635629,0.6795902320395941,0.37818282733276276,0.7529661537938606,0.24443079738812945,0.050890210934089186,0.6091946368913157,0.10524030634294745,0.7216772142266861,0.9644419937311313,0.7443644567550718,0.11107379042090515,0.6758607670196779,0.06998937901997349,0.23835325163606735,0.9257110329194636,0.18460447982639705,0.3328060829203683,0.5150745073112677,0.4444429274787518,0.20123138252797457,0.4701677776566784,0.3387694887265025,0.3571145313699038,0.5832375895395479,0.5187870711151179,0.592482001299534,0.08058684464363464,0.8097115791303884,0.10943056653474281,0.17494539625820948,0.27191705158777624,0.39286431049816883,0.5438184238133137,0.4912930311594983,0.1520748729199446,0.005746446388322557,0.37100642849388543,0.3436489214267835,0.3736771516651469,0.5069216592946957,0.29144738781121093,0.38737955516348443,0.4174692882789659,0.09600576267781924,0.3498360385579764,0.8327629823786618,0.2793761097363139,0.7452294942564646,0.19740336052135032,0.668529975349764,0.3361740614858246,0.15405361276435436,0.3685417546012095,0.2116722187047575,0.15262953438733118,0.15261244077194824,0.15534676897475141,0.44231268620691266,0.8316528197462791,0.5860767455655036,0.0755151066488966,0.8098417798705404,0.6274660577324882,0.27715470970462097,0.7389964222517347,0.004301782772942131,0.2630290081325364,0.8999703950299811,0.8476284244210182,0.9264713672108493,0.2548302179423232,0.38477378843371124,0.6664119331144807,0.9704718273195456,0.880638255156718,0.018140269226684103,0.5668608141835532,0.9464238347709637,0.1370426542706331,0.5680205193714971,0.5650431919794539,0.9052600758025313,0.3168841364217414,0.8296123105011428,0.09715586890788486,0.45472043021425956,0.22820654251762518,0.6254810495338394,0.758543886153306,0.8868210782369164,0.4433187726737551,0.29508893507880596,0.1680574116899909,0.7851384016571563,0.544674800344654,0.05416815148603216,0.9145233521120588,0.39261624314295784,0.7556583505107815,0.12211134125841627,0.31909195341191277,0.28694276166459565,0.3491905372915052,0.1193817322512587,0.008193397560350979,0.9296061501529194,0.46161367361584515,0.8044910041803377,0.46344820537753106,0.6044846457430666,0.3039703438915402,0.6837752100399301,0.26850644217542796,0.005288294639566038,0.3648145590921579,0.45232958684229563,0.3481832247095267,0.1237193588041492,0.5225376045561845,0.8621359202338499,0.18606147972962517,0.09320019068466312,0.6385930804200417,0.28134417663896705,0.021413128097808043,0.9764004750099,0.7015443645308255,0.054116511749635166,0.06117738841475462,0.4182493177361355,0.14638290514433683,0.9430534643326969,0.6002685419616944,0.7671916636289415,0.5777702547668078,0.15673119583632378,0.7236737085422176,0.798079812382575,0.3781808167047367,0.2790678297616993,0.4924005504834199,0.09935150680942773,0.7493021543671168,0.9266209481605341,0.8184325803415786,0.8788796650138695,0.3219569481635245,0.2904250356870599,0.7867933608054754,0.4231693180359175,0.5230427391543946,0.08957733306217452,0.08854049253724217,0.8979811046107249,0.0602020454950416,0.09159978272289293,0.30604937143069244,0.8472322642110526,0.40096149922077595,0.7958846175360426,0.49447221105502126,0.5660631472423443,0.779544244723311,0.5385935912828004,0.9680151478299055,0.5731318278196775,0.6595023467425607,0.5671860118104441,0.08983981680813513,0.5165417416547495,0.9179751021314781,0.22574679697293454,0.22064847053314196,0.8879298032528902,0.7988282111941891,0.8334368720657648,0.7377121406600431,0.44764798704856257,0.7037435030101622,0.6564730138784352,0.9375026174374677,0.6015029456527772,0.2039181532223966,0.5991008891353387,0.6257224183362846,0.005244188536511318,0.06706674981553351,0.6986500671593998,0.7437605691721381,0.9077364090419058,0.5763943333869073,0.6075262241282395,0.9728763014724928,0.33959605906502177,0.6969003427735261,0.8206534818568396,0.7192173336755496,0.39326830383686495,0.15394838020387724,0.2724601792765451,0.4823409236925338,0.21221287087774887,0.5653168033276601,0.736337934037697,0.359796450587045,0.32589486803896395,0.824849194369712,0.19676269117657297,0.8068155420479157,0.79336561834802,0.5238352661568526,0.9521342085939728,0.8481628009939621,0.4481411263404911,0.1730789817873568,0.495605194216032,0.382383066295914,0.400828869508818,0.9106026962202391,0.27337283238787125,0.12720534166402309,0.6348536385476655,0.8172376314302718,0.7383853544669023,0.044749559841422704,0.9042830904332444,0.5783961796205126,0.86432345044746,0.529115131742218,0.07254726164278846,0.4356530756372543,0.5342568376505803,0.21827111788217213,0.8861494508100214,0.5136662975156143,0.9281375388186814,0.5337072989124627,0.2478052248044098,0.2624472307984298,0.21439243744453895,0.6825723903651757,0.0015299149939451695,0.02283288588456389,0.8827213879345672,0.4811719249903108,0.42651703330992996,0.27693440542239167,0.5813983093336834,0.9668854980604351,0.8564239315994953,0.9289667013250169,0.6367441949704284,0.7328668525662527,0.8644111337110398,0.1805812644309699,0.932078046345397,0.13453464116776703,0.9020001925295098,0.851817583814287,0.12828293739984953,0.18996107845754917,0.9912239097078797,0.84428807884414,0.4212479036223933,0.6394821805239819,0.06484360367587372,0.8037329437253273,0.7952252741952353,0.532163419469794,0.6593520626346401,0.13104469821287656,0.1996826789036401,0.1526150303892284,0.08099274223721364,0.045133756629671895,0.5087095162753685,0.7387532697379497,0.022198380993412536,0.7572054628170088,0.9060148481967789,0.6165405244439459,0.16186941064341176,0.02624950502923107,0.25989242654053446,0.1937626570235813,0.8120016335982345,0.5194418709722399,0.27131266450174096,0.7964094549013705,0.3317392623668114,0.8602701908354324,0.3492398006952293,0.3813063484801029,0.5465960226861248,0.3406628580457711,0.6983500946937373,0.3572321870261852,0.8254191366267294,0.2579654853502882,0.9505482558072298,0.4606614464015246,0.8112734051652943,0.8004533065330925,0.3674885120252116,0.5469956302760244,0.6781945444328878,0.040026032780624776,0.48402204849927344,0.970899273468415,0.6285572471172483,0.38193742173122014,0.7831369867239186,0.3953553963454066,0.10343660673661792,0.14845578659976222,0.7233508333630749,0.45107620739638654,0.9085374122507608,0.013831205591318119,0.06777129484652922,0.9621500102574063,0.29969913970200457,0.30953202954728165,0.5462143415038101,0.38593198348982716,0.7510871582310392,0.5987012161535747,0.27161146812265513,0.8287617847618185,0.9551787406634205,0.6133250420209158,0.13860872220305898,0.2002314157597802,0.48782347741792687,0.553925910770946,0.5075247889129391,0.5903117250591186,0.3392302599884198,0.14635746156510732,0.926538490235606,0.2024552211934849,0.8724535820265982,0.5523898867311428,0.6334172978754617,0.17925940505983573,0.5847322662712533,0.9128666737053885,0.7032393520895028,0.8508969554134183,0.4982779207773904,0.6330893844111689,0.49367289777351697,0.06560928354623408,0.7186232251947753,0.08580991238813795,0.21617571445459505,0.5418353911968792,0.0479870891218408,0.1268325892974611,0.65633758257795,0.7388542580402409,0.2543153966302507,0.00930904809437516,0.8704439726607536,0.19912346746890464,0.8991941828843628,0.024070600107056084,0.5421617023560561,0.637214356253825,0.9717642125593291,0.32591608618603374,0.47374926909887716,0.7062765177466133,0.6679703008871349,0.3979292915740593,0.2987962353329787,0.897297828981555,0.9095013428132543,0.8045757010696379,0.7221534220844168,0.27923652925651976,0.44927567609882013,0.43505958532560673,0.10382212999819784,0.7664861737602431,0.843557509204353,0.23094240334977978,0.6884696926224851,0.2215538942228581,0.43489366116664163,0.18286224639151816,0.46140727046012064,0.10453624784659898,0.8419975897559155,0.29269885621353886,0.3452396784367666,0.12646712933153048,0.45950606866687815,0.008914042590864701,0.0030240394048315355,0.4299280508729628,0.28463986616266324,0.4124412617977513,0.28304402215795377,0.5307755718215745,0.788401823441927,0.515796598969734,0.24732510652955608,0.4004510209105163,0.28868111689747544,0.6663412051886746,0.5912394969399992,0.7241026655051324,0.2258943782387104,0.014974102771209141,0.8759260329261482,0.21409876020274465,0.42689065629821776,0.5031022287937303,0.20904624926089554,0.7885406829578891,0.44964966795491046,0.15092236595045128,0.29701581123676823,0.7679664936085397,0.9326703384974206],"beta":[17.752250397334024,26.34531466622654,26.64183229066857,27.909300326791026,25.233416737133307,15.950774606935546,17.98537703055836,20.706851823139854,18.396779579130822,29.937622985320292,19.355629328736143,17.970489530862533,10.420952521887594,19.339028970493647,19.40661295364106,24.563864659241823,13.112371481037059,27.40540061079029,20.661810911648082,26.330190016126874,20.531199029088405,27.20766064139175,20.999558691878278,23.40869244460906,24.089459151862314,28.13905904259022,28.46006521099348,12.763122663028375,29.62934883412228,15.237199910437301,10.997670093527292,25.805956296014806,29.560554891882354,24.855991318298987,14.625402149538287,10.737218212030761,14.816659606246523,22.691412470264844,22.030957589274117,26.777907194781978,26.495464707621718,11.372208544921069,10.702240082605833,13.934876480161638,28.191949686406225,10.437900519024481,14.954460873467838,23.99556083027526,10.2259133939903,10.863406555921964,22.421416889958845,18.159854267640945,20.99431177567187,22.21745458428235,23.51526257146766,21.31781135735646,12.842006067727784,22.504557202397937,25.19541618751223,21.441909629490436,16.48442278945565,15.090864135528111,16.75716657031351,26.827198738677826,18.34263545946756,22.8776441576232,20.568658232901903,26.497179789958043,29.028247009903637,26.67103913548994,19.35736629149377,19.945935797175576,22.38507444154167,11.835102365078235,26.479435323259267,24.261780392209648,17.46392545609578,18.976107449717997,16.550026120195923,19.265018920815965,11.880426254727364,14.693872775308403,28.022699206679253,25.474927243644032,28.473358480587475,10.405849480150785,26.939695024581912,18.55684664330502,17.34498251240182,29.935564637426427,28.991898225647166,20.536129645610476,28.593677672030484,25.020419129138716,24.240397078749414,25.12233617928691,29.830436091431004,19.614224341824716,29.97293496165915,12.735799173003318,26.50726046428289,28.86489770308706,15.989384662136018,11.99912087113237,26.835250826217475,10.600547208039588,14.352816013358627,22.939416285006118,21.79778609310341,28.39597406986811,16.158198900668445,11.843279021611583,20.301286581140403,25.61566259103238,22.243122803869014,18.45251115509756,22.116348321942866,29.99624930236273,10.587562039037689,13.783227205249084,23.4248238469744,13.332607777735458,14.502941904679854,17.993708504814382,14.276191665192597,15.125024312509563,15.614641145551772,29.48546953599005,22.037624242469068,29.48647961649406,25.510859452114726,28.654071093082806,25.538415350081202,22.63376950633425,21.83503121905412,11.734150488947686,12.116054372482274,16.82486985054687,19.89028155233064,26.484852543585205,21.988793327385054,13.954507940279012,19.524102006951054,15.772062914572299,23.271501357765377,22.97891401613219,28.334164447154386,13.31596376881247,14.145965087583336,29.21379215093472,27.01228098131487,23.4306933954258,25.287514827144815,13.337900799917799,14.379564510062956,17.832782913413403,17.65687540714225,12.297661318038227,27.82262479114015,21.454414121441626,28.02013029155539,20.859532654573634,12.50053644646301,18.3520417563477,23.709867611369294,29.9649653291322,15.782916325773083,18.64510247714517,10.044447010153563,23.723299589762966,22.817818915882523,29.28338484169179,21.0257471939125,11.6991252949351,17.975834396847556,12.88026462081184,11.673331499451724,11.144570689010788,26.457877151057797,26.34364487079648,21.227043424077966,26.25121180334721,14.199000046659478,26.862983491983748,25.601312112015563,23.454789356058843,10.845687196726278,10.203276815638826,28.119298350880022,20.429350125780054,23.517738230516553,13.790738091931898,24.80044289571328,27.812455295965233,10.400833426452408,24.647567265237257,24.698853550578725,13.576469608436792,26.221367189614938,26.80469104646803,22.20391657063859,21.13303968281928,26.814385266900178,19.589955186449405,10.965450045849995,22.88869839354495,10.575546477625505,16.484225493382816,23.679229743871325,19.39324303849613,10.415808632479697,22.508844987863164,19.560906251579215,10.02779771999978,21.368535370030074,21.611079327850533,28.504293239922855,28.24324433318562,13.281542482950561,27.65756234045362,26.764314765248884,16.3407718326534,11.53074509084611,17.184371108022493,22.441307656421024,24.866564652532833,15.151530449570991,10.25359800435377,19.175933663388108,10.070971490831568,24.178474890080768,12.934931706175377,10.70191379611822,29.213052881043584,18.058154985379243,22.399395942489946,14.756178286218349,26.66388152191095,11.291651858978042,12.488990046922424,22.054998308175055,25.428939064927512,10.325446750432995,29.78597169320969,19.44489940555688,21.791910180778906,18.78186114902485,20.515159702550804,26.974620581785164,13.759582159426191,24.422522988621495,29.486617130496995,25.039240630448138,16.85430885692408,10.054878312740332,29.196436636931256,12.041172347337357,10.6081683023489,21.877317453175138,22.79350478371507,12.450810646111456,28.83743515008609,29.16447269758384,23.643425344345808,17.779577429100396,11.069917064517881,27.40185720858248,10.232999311191389,15.440382541290312,15.012195821714304,16.267995767592424,13.790474927209688,20.551382940733575,29.805980615586897,14.253461958183266,26.892731910540512,26.26444577314672,28.38775595651867,28.0517674632498,29.45863952671644,13.616419956411146,23.32738617403493,20.952805296636406,13.361251924743964,14.97241829432193,19.056916233645058,20.989027585198713,28.8075546858208,22.819285263184955,25.683836603871157,18.633816901970704,28.773441998270787,20.74275148754098,20.10259192488192,29.22499686417217,16.794677646992234,20.348150731505346,24.904349787919436,29.061559786709843,12.939763722551284,12.616500667805246,12.564410316014666,25.213403107545048,23.655286204822485,26.228458764072087,12.056708762339046,21.856824259770953,10.031398296598631,20.211168393723703,26.498319322327685,16.787597211538326,23.04436974253163,25.491419509198273,14.958690493808966,21.049940961529032,22.88848589046083,16.841862266895156,20.590056860724726,10.540975622655825,16.117882542362274,14.52905241439153,11.330069669863917,18.539732221912168,25.6278840884208,19.281732919716553,23.33768442415611,28.41074077118618,19.077038215449292,24.683155744404104,20.22437242271728,13.710331899385078,19.549796167547925,17.30977925551918,18.722684241641787,22.833707819475364,28.057349749865217,14.147267650880524,29.05910824796714,20.162242108016386,23.331474515888132,25.441145640607328,28.783466822041028,19.950860251246784,12.415915766268594,27.56676010549881,11.936191414452889,17.500686669577878,19.96287155924881,10.443137046897938,14.248925341297006,22.4148774859956,21.683908309702996,14.97452252884409,10.852712812417241,27.49415066948832,23.283278144382635,29.416340616029572,12.878398392800147,14.105890641308285,10.871649967385943,22.451142961116183,15.381831527408014,25.372857000637126,16.695148714067475,11.281858276406247,12.940493972800775,18.100471236390796,12.875262949473619,16.980962689438886,24.982288744849278,29.732505694690353,19.20964338287903,15.227045117429094,29.263432776226445,22.498117250982396,29.44971430217327,20.335105004667327,14.305676465784662,17.469331850686885,22.2469262250558,11.479314968282498,13.969780742573782,29.06033991966906,25.03940694351032,23.326548826997918,10.147719214926813,17.177473235642626,13.89881767664098,16.331477684307664,12.036478533152998,21.964412924029837,21.281373972015025,27.328690727826597,17.064571761442494,16.206193360206377,28.178200973786595,17.501695671109537,19.889238305504875,15.981526789441055,27.465262970206958,21.133013823365626,12.617678775677126,27.214174589308723,20.058232235095712,13.611423518488355,12.358542330537436,16.78012877480694,15.611425036187608,11.323607821938065,22.046998016222147,13.78836767734487,11.826003946459856,17.162286652131428,24.28708017288034,20.132734498347986,20.54287465675809,17.340729715837288,22.445991485316284,28.074007927524576,22.03314636093705,29.96554507837413,17.2866604360787,22.910338210743525,10.956369028439976,10.924410086153626,28.99259201604305,27.038570472137927,15.83913314607397,25.969912647871386,15.696036862691516,24.077659091055263,12.324110940682775,16.759750539065475,15.333586027347534,16.58585717804066,19.498490691446037,25.589199681923084,21.05500651711595,21.45009029530864,14.177282223540125,20.01142718118801,23.470720006375835,11.973372473594765,21.116251219674524,25.45937618929564,17.612246443033342,21.247332155260604,24.871275071294523,21.011199022426613,15.98092189087254,20.469835651842587,21.627722043204404,14.282071711863939,26.787019683683134,23.14375088868927,19.30616669448562,24.703216698428648,20.677134494978873,28.046955074401353,28.318868207966595,16.06135052133498,22.78734342217295,20.523572249965696,29.507044965797938,15.614355305938531,15.476841519099551,13.437188519107263,15.347280082520873,20.73431933786302,29.347332838190106,27.644532294500564,28.93140348379982,27.714125326018213,26.162707468437763,29.811875337536712,11.63557468093233,17.239121235085882,24.429613391763482,20.788972617832844,24.331157392748835,26.024958180006422,26.15817338857543,25.876714699702973,10.963429107117925,28.949535298204573,29.986362864040306,23.538034409520023,27.604334734121707,28.87402433385902,15.962259225683223,26.692821019252833,27.275181982385547,24.672368617812126,20.098995345771165,21.241690839893053,13.556619924906265,16.60030933682645,13.27462070076097,23.3341110815765,18.590791785289266,25.74556842226546,22.195608136700955,14.065465925495264,13.00366508035452,20.389971884388032,18.4232488307456,14.052767353030484,19.534254547266762,22.33601135172608,20.274711360378852,15.912971097521167,18.084728614457738,22.94282206130869,24.26241653963008,16.373571057758976,22.966703859419454,23.14184902979084,23.578864121202137,21.665925820822025,16.286578407261988,13.85892692431077,23.27941289519433,12.34962126890586,21.370770779349847,25.79040238772336,10.44971622148493,29.173997372641036,10.495890011529529,14.939600017200632,18.669368140635008,25.574846856335114,20.04412486786714,29.728722157606967,20.929395047838753,29.795619036393237,26.918613747044876,29.99844009006391,18.450875678807954,27.11139317505594,12.564476484310688,24.356029172721662,25.969900726861862,29.66226397621631,19.20618765498748,24.025850890200836,13.43678707003141,10.697565446107816,26.72449556456307,20.55366432444886,25.49693004131232,23.20447211890103,14.590926968552216,12.936040757877446,24.310573978498265,24.436414404523244,29.990390355515885,24.271156935614634,27.810199993671972,14.607686657360443,16.8415153703518,14.425352482056715,18.94023289433654,17.806021903585886,25.56917143735229,29.05140187041825,27.275380221415773,15.801260792887106,13.62468360146008,26.904239418554823,13.572575566033835,22.496360476007993,27.331806913931214,27.82390037037876,16.43003217330335,19.983118428614976,21.502615509227304,13.428526845768207,16.321726934511,15.099253271253597,25.244798400295096,27.483957105497936,12.255766543789814,18.771412647444503,11.715062183731826,22.001637965615398,29.243456740029607,15.30840142319818,20.822727440156804,19.085518363788413,17.113998423597337,15.304962777314675,29.604381533946153,16.364319161826685,26.688994825451317,20.390479864320884,28.390621243646503,26.656521720335313,10.275755012118646,23.867195017086065,18.0763251774296,20.740588556060633,13.314132963365877,24.05599640722986,16.357015450988037,11.382435098348287,13.61036151590158,23.911727450202008,24.728850060006224,19.552933645195235,22.70123051571668,18.700621841601595,26.35190330458969,15.662526559238348,18.6184285268258,24.230740067355153,27.869167677050648,14.989211581115939,12.318128104109798,11.819202991816834,27.249035947087627,18.046895814029575,18.80380634853404,23.40379109729417,18.58565712301867,10.800408143063095,22.50038908735351,26.761451084828416,13.205545038189864,15.041659512857706,21.134305370499376,25.36813140510896,26.908539583684817,15.069287291003386,14.41828587591682,29.484425736198062,22.98352606469438,14.831356824427747,22.36998942550202,13.076122478303521,27.970498980003025,26.60963516074188,11.155731648421622,24.976988307928686,21.659020757888797,28.938089024103412,23.923247386685272,27.4817718123035,28.699041986195745,25.488424908745042,29.329909919915966,20.768288010591924,20.255920813852644,21.836134987576404,19.41655325589157,11.09900399210892,11.593523001078418,22.28177070450115,19.81449089291628,14.849046955755899,10.079465868595975,24.046764301217692,25.72545256768231,19.753531033516953,10.353802064868574,22.549543936921268,17.616706898672916,13.943626481571938,18.204237495123113,29.50848811694902,19.399003803630816,22.429223748323075,13.070233712802569,13.020285046375841,28.376979549528084,14.514923509541106,13.449382584089458,21.389593985296816,22.982793342768062,10.886504817390872,14.770247717068315,16.72909393523888,25.175869622375107,10.119165017489538,15.164215875661942,13.476675184957472,29.27832795464141,13.915558331953758,25.326715688402686,28.0208521999281,10.725989227946116,18.943555082859973,14.386472432578676,24.569218232140614,13.742602777916751,11.994995328459535,23.710745452098422,18.888116797122585,16.913566346213237,10.667675727083065,18.920794891898062,10.752805009637392,27.872973698513693,12.082651359626212,12.623440678022867,23.342213039039983,18.934737820585497,18.538382896621442,19.214526321328744,23.29964790720695,12.756821377878534,22.378745042578988,29.948139965483385,23.910325794716165,24.287868287133666,13.67099883595099,15.03576492829437,10.248356456267116,28.53611309365851,23.00647559308137,23.64414491397723,29.295672534810187,10.687483112647747,17.92785299636915,26.1477680633526,25.641904979972956,17.66503600743784,26.753422281024957,11.90723594553409,13.118826962483183,29.28246518304733,28.638697175926097,15.677989212465842,19.209420240520018,20.277403070070083,11.328281662826733,24.335339140969108,18.09087094593182,15.64071515213534,26.78275158569839,16.457650097836183,16.682756067582606,27.213923737449917,25.18363252089468,10.61976098633104,19.23088674796817,22.702716235199762,10.644310762392424,11.454733029166505,16.246928728911698,19.542676591330054,24.850617033406316,11.844119660727564,13.652583628087708,23.388027725824962,13.500664789122911,16.544081757164637,19.144532850703023,11.376730617605224,29.738423795244096,26.87878498397386,27.815789594516637,19.162423022255425,25.997413931870163,29.066317268126866,11.545847725146722,14.222414355388953,12.403482554123396,14.834045936207492,22.082332364166,29.005898996794002,28.18330036864745,24.696286113902236,14.933164413415625,27.74503662834156,28.253336362600983,26.319778310000885,25.798424990183282,15.068598305230093,15.834219710922275,11.492972263334718,23.658886571249287,13.19298755157277,13.638118392665746,24.395345712838438,22.68442269536104,27.55496300440474,14.33456098693922,14.325903029782573,24.8756132221165,22.232370889138203,26.569475292317136,23.069354903375505,24.707094105401552,16.870620805960034,21.435177127083836,26.65189025135243,21.693368784283354,28.59757808583574,14.636544443360865,22.692793410711324,16.128613036931885,10.829388048957615,29.0852974834861,15.611591125171556,28.45433188293792,16.56862519429987,11.153208082048614,24.08624053726873,19.350112447579093,14.892571925940889,13.505529108436317,20.969147045569972,13.963928554367428,17.07689647487921,16.491699966595192,25.7721049690309,28.000299985224725,28.205468407224096,18.029877078465553,19.980332590795435,14.748057547255495,23.85188296029085,27.937885993729434,27.113429428132015,22.78364156267688,21.101868084221046,15.827141044084376,24.03771349395454,26.17173336286763,14.109499731949171,17.174585775193783,13.54633993446198,22.323068590052205,13.442152445999472,19.328977927117165,12.019348650790729,14.72933530291957,16.54963921250615,23.809692477436755,14.783317495345223,25.12037316300532,15.504888261498975,28.59785334554307,17.48401226810771,27.866505473388713,18.565667934309843,18.042822704204433,20.82914945826211,18.731712171113784,17.127297786580794,18.11873356376589,27.006194745414174,12.003696273671673,28.137058088169766,13.766104426727948,28.58854426890439,18.380442619385104,14.19284165952163,17.803027008390945,10.200120969004178,27.662314224824765,18.70230438681819,26.056055235068246,27.072894968138716,13.905064711699978,24.376080508031105,28.79180673283637,18.389448948922617,12.769669091886335,28.74989383690894,15.348703163948617,11.262884968546917,14.50042688916723,13.658808676148047,24.163982926043353,21.19086412151178,17.52625076702958,20.66635801046994,21.778281415189348,22.767477199840293,27.798991518453427,10.644324542442426,23.433639411080343,28.501440937658344,26.256226148573155,19.944370065114395,11.943317315301872,12.160985683716063,27.43760264257289,22.189502361933243,19.881848978170286,17.578270467192787,20.088541207558826,23.093776607348037,17.890945540714057,23.28254121794455,11.792299118525754,15.64979526713477,29.41278308878114,27.191378546934782,25.144186337966143,11.116149701628917,25.812318973558614,15.505120231117559,26.547762293764787,13.791853250535691,28.10208287047965,25.17771233541822,27.624761042560053,23.874646131035394,19.92135762377899,10.264371850163387,17.204292302630822,16.04075005331582,26.762146219235863,12.246207513590889,15.217473672920514,29.052486051126138,13.19660891618744,24.518336575645222,15.468265632708276,28.745053945414035,23.667760500327613,18.318460944819428,19.607181061015787,19.908415927906606,21.495646486451086,23.630534077745395,21.468193333182487,20.341961064821305,27.629984123642828,23.824912349687303,20.404545358817,24.000460465014278,13.297686864132263,28.285789119888605,22.911151816890232,24.2482067927436,10.392689082166582,22.28821710907932,19.064781406916822,13.905449750906037,12.180453945740366,13.919040572447043,14.636255799240164,24.95990684171351,12.201324056991414,24.392124735620193,29.47483719365546,24.81920494081661,18.416578173376337,19.70496812016895,18.894913243512406,11.444939374527522,12.231207405294548,23.280219498292418,29.056810734547824,11.448844074840853,26.58141663159244,19.656481865577696,14.73398198993162,19.35354509420806,22.2128866627435,28.997888658501395,24.83401576230736,20.444163298237537,24.86259277971648,18.389825950438194,20.157050980351205,12.655832785883598,16.408110442142345,18.000685731046836,19.6783438962253,14.257687875505262,27.698069172135177,10.456703119545146,26.011915499838388,21.17017643542213,25.032587322088283,23.440965274913275,11.150556277930196,16.511350551623217,12.698356178559491,14.650261397099115,22.578565101441402,16.52534088615447,26.978042988366397,15.358911547584029,21.402406281783147,29.999277531834842,14.184763755633242,12.286958510695914,10.367149368333376,23.8702519978953,22.371613663154754,17.126443139905092,25.046623459314855,19.74209855015923,24.342251109608476,25.78562667372841]}
},{}],27:[function(require,module,exports){
module.exports={"expected":[0.24149528211790236,0.22727717277672915,0.42651137528559463,1.0301994225291198,0.06680893077205721,0.5106583581636012,0.48052915269840774,0.6294891009949177,0.454808499197066,0.3243287931246196,0.5543124165895517,0.06341948255649096,0.18899747519438273,0.32960383032222357,0.3229121027328959,0.3591688165562288,0.31325200153072424,0.005883224704183076,0.014990311684583544,0.09379960130006942,0.5058326376272808,0.26599284057626854,0.11719170091061375,0.012632128537894288,0.035501060459239224,0.5082390890836158,0.3479272483383437,0.695698825905204,0.1116470991848231,0.7717663683555374,0.4071286153348685,0.5785442404950514,0.5297767916516206,0.5955949720278715,0.1122396697786416,0.5534528862295994,0.5514817971582365,0.24057109870375895,0.16717151246217282,0.4874727455619871,0.013995683320603476,0.10755236777483045,0.00211660649853804,0.16884693723643507,0.6727968280554956,0.5740573781345711,0.45683070239636736,0.13252982602334198,0.2725169993984275,0.4656199155637496,0.8027460798283746,0.062297468639969225,0.6966082893197468,0.3220486718457953,0.0655043960551944,0.9977152180255106,0.22240063798644738,0.06945143283363903,0.07543951259010423,1.3796517439649618,0.08638818008110755,0.015002235400609248,0.32778978207000364,0.11282943214309567,0.6955971974697178,0.2905692367376937,0.10212411887747988,0.027281259976780988,0.5771245003447292,0.3152470564531003,0.7546452644408748,0.004791555881212846,0.6805461257015322,0.30352139235513453,0.8780152367655986,0.1302353955897789,0.1207883506090919,0.3520406630254597,0.7684297072976835,0.09973074084707816,0.3373841401422361,0.3590922719163791,0.43857330329789257,0.8650738059026173,0.44129319140681655,0.8353236901857958,0.07820303736701413,0.00685992968405451,1.3220704884825586e-6,0.055755358027357114,0.12501419908881098,0.1303272213711046,0.7229556335702322,0.16958501387144528,0.3794026451302464,0.027738155097998925,0.017462772507032074,0.13835990870741688,0.03498609421148035,0.6372398092353597,0.5075531524904423,0.3070194846451067,0.4948424287829974,0.4192392735809466,0.17960771383288376,0.03656330118076596,0.4597095281027608,0.30281137622196985,0.16331469376773808,0.5755274117101755,0.20360797332255562,0.5555091418179116,0.3596037555182805,0.2450811562138503,0.2539860676989408,0.39595723578197456,0.5033528026629611,0.3330731629639215,0.30512267651354325,0.37148570277432214,0.8142546995691378,0.8741753172920468,1.4630941160187696e-21,4.8849427014561935e-6,1.2640481074599146,0.08868286225961061,0.21170026461259234,0.16307573127053415,0.38102910045782334,0.05436449702269857,0.9858568222096326,0.026324397287573586,0.3394431516970628,0.4737080068825723,0.49288107936399406,0.44934132996333426,0.7420236468055709,0.8966872276813009,0.7919341257318299,0.30608868114941573,0.11219673413445058,0.30733735643657406,0.45324337343278337,1.1515401435050479e-11,0.23279869434365222,0.25179862026819716,0.055817656864820125,0.21922837201959658,0.1710229954516478,0.025790963739051268,0.8176986374328724,0.9464375123833291,0.1903205904225482,0.16932379088919547,0.2892482004899282,0.7852828080137686,0.05386303541343888,0.43151281343280007,0.30531916474515447,0.46149867628925867,0.40165469835670864,0.3617752606407814,0.0014939947996748047,0.3456480751754202,0.03689832807911554,0.2122734325289114,0.3998229868738306,0.18396881319206146,0.12389413318167344,0.343354625628942,0.922768556741077,0.690202718709091,0.40151172358390236,0.5386199711643354,0.3042705661968089,0.14688725899901225,0.42614805454528126,0.18459900640919005,0.08806631331952515,0.43590327168550635,0.06407695705898113,0.49330637889552664,0.4443813158744998,0.35878646021585964,0.44817471972029055,0.601968382309544,0.11355611504759781,0.12766135150206562,0.11791993359013167,0.6497171521011679,0.40192480564289096,0.89953060512667,0.3721576255508507,0.3343046654140121,0.13684973903771105,0.4437734925292442,0.6999879171277218,0.4244731449952735,0.9403836911014335,0.22104707680082747,0.10962041001450898,0.22473780664657575,0.63442458616907,0.4184925541498147,0.5282351455841174,0.05741491952059564,0.13561208732469568,0.6026854822387986,0.039899965720571265,0.3731206121877472,0.18676226455050762,0.39174135098599555,0.0001125608001623589,0.4582134399633737,0.2281559795648744,0.4725999794736126,0.05158655324663303,0.33137579251247823,0.4836562949366603,0.3700016439867123,0.3687237778169812,0.368930612586068,0.2479871003782788,0.11071423938830016,0.1901067311253259,0.3220539659940341,7.399435937473736e-9,0.5641627356605133,0.539742265830577,0.6399290375066823,0.17266269064448062,0.14395128727198234,0.27589607645364383,0.3224812792036054,3.0554947195595717e-7,0.37914583871901886,0.44888701135912434,0.5849877676114393,0.20037336447684137,0.0457381060125222,0.31172976613837006,0.21372906262213456,0.2576096747746021,0.3240147853919958,0.21171851400416583,0.02463812314934319,0.028357973169449144,0.2839619593193651,0.3746721193232593,0.10304837598854108,0.4131408362378444,0.15114698342053204,0.011555351962471379,0.18646453719752656,0.08846022962416661,0.47102263050893933,0.07088577210523966,0.36691087681520057,0.8145642900693622,0.22772945332317557,0.5100289857477966,0.7093987679872955,0.42711020164135877,0.23010504023283165,0.7492200651232288,0.07673849635819006,0.32144048357379956,0.0763432681021926,0.039259087948601494,0.26257084053025737,0.3968811623975169,0.2517245714307848,0.2033784850179218,0.06253948053944616,0.5654292484660606,0.35380995045839647,0.7515812140888922,0.04697755280162754,0.7852188561598933,0.5814920981032863,0.3682878169560251,0.8433561350173575,0.07915126016601305,0.3178509397514836,0.7939311532619121,0.002915294647425141,0.43597083506859946,0.704810704261498,0.544924783891941,0.08443158147382065,0.17414677826143865,0.6465517450256154,0.10907154860295717,0.5874443323835818,0.9627550628007147,1.040682818243034,1.0981310878667587,0.10130942000360157,0.03846113793119615,0.4588430990794265,0.12812257239982,0.8691372159126303,0.009137425086460807,0.026549517788239035,0.6162259708201854,0.4074743869081723,0.17475115192627405,0.2973573528653865,0.22193587665656497,0.20770633932449262,0.29725332077406064,0.06642589967856974,0.06778788308589508,0.7585679040943603,0.38519017332501426,0.26032988140679447,0.26602493063250093,0.5023435824343166,0.3423952142971321,8.12616378674918e-5,0.4892754068538694,0.3065017464494592,0.517851256274036,0.35770664684261505,0.3621046810565133,0.5321265376076882,0.1049271497244147,0.37090645508650855,0.41943612676360664,0.05768818699239418,0.7891745980045474,0.4357718590308453,0.5221250491563304,0.5239638938797984,0.34378706008089016,0.699686159998588,0.05509355840332692,0.4841079863878446,1.4315691761218305e-20,0.3139622191241692,0.37201831915256417,0.006151448681383312,0.5478465870180853,0.29690018780284794,0.3554030096053289,0.2548745065568318,0.4327701483267187,0.02699526374216645,0.8779271336482792,0.4399252035185442,0.2596658706644798,0.5069558439881752,0.006532463516205657,0.8411771920539195,0.015459181650574964,0.6042376008589572,0.20495152476513878,1.122717259541477,0.8323457248378998,0.4676942220464375,0.4818244681469779,0.11014257064125546,0.32776948192989025,0.05586978283585918,0.09577641192592375,0.5294907653770073,0.8790111100219616,0.8193725169278157,0.4385567816550807,0.33266232583578625,0.7950453426814268,0.3982502591426318,0.37346139641295545,0.17946698719991788,1.0796880288110429,0.020455396410019564,0.6096560217768405,0.5205745082144512,0.007554632349405289,0.1893901182279123,0.3289341037169069,0.47098181462790245,0.13343329467140252,0.23333487720593615,0.11221617801530112,0.021065148841283004,0.13312451891558252,0.37432520613979037,0.2011388453354061,0.8828192374572112,0.4886348568073523,0.48202486818339657,0.3893835265372797,0.2021492782576576,0.3320818561915693,0.03540613638038049,0.7336485072493508,0.5128472617067387,0.18292273688912009,0.24156416797987226,0.21669139207196422,0.006136148358382211,1.3223935799723345,0.006212098545096781,0.8830707723930378,0.17281009358894203,0.5358716623734339,0.49627028667594825,0.35148683233635536,0.45599791627941516,0.011430610982410825,0.25353133143943113,0.12722085655923157,0.5947736869471454,0.3977372352559169,0.2807997333260358,0.2178701380313607,0.17990850961205881,0.27954158243206295,0.41876967761083467,0.8478440395784415,0.0017498723329366082,0.3332483644926276,0.2767176147813093,0.30395206932693636,0.1948873867120518,0.6005632228477561,0.20649802413278304,0.14785414176268144,0.09935157035510381,0.10077937063304691,0.11771488345857292,0.07462071606534937,0.25656643364062753,0.3743467618237786,1.1983171748434134,0.702769743986799,0.20953598124209113,0.26704186628121507,0.5128671627850395,0.4421062124944364,0.5299116192089599,0.10635362307830021,0.10856018972466434,0.1021997890494444,0.3629218884449907,0.7257910619040564,0.6613935333664382,0.47401783175733325,0.297816937768718,0.21611040412600788,0.19701985586402285,0.06311797118822936,0.23398305266663913,0.894785924413632,0.14144112848114107,0.3008677081201097,0.5180361445144137,0.754840077068672,0.6016681722809346,0.37411245722916314,0.29935329041820474,0.3716988419971807,0.05397265877683167,1.1876196138692516,0.33736847903592776,0.06519408592024337,0.5684236197172851,0.669439306473749,0.29590244406984323,2.24013384372139e-5,0.14699155440795392,0.2433319045695208,0.9286049524689081,0.4920608224276081,0.4741330752595981,0.38433810271291463,0.351502781890086,0.5948736140583097,1.965191420346755e-8,0.6588873796338758,0.6343019400839932,0.24728770328761243,0.06544558219533955,0.012249664301071413,0.5026876681889677,0.7388848454108102,0.22421483305405152,0.4499816396904932,0.8566660105568792,0.0859975054677622,0.013588283971411083,0.29950707802826204,0.0015997820735804355,0.8874555175758253,0.13463923169786,0.3285342962598444,0.3948852113385405,0.190997021144109,0.0038409099117170885,0.6314638095180373,0.0034264653286660974,0.04833993768464298,0.1746164121761306,0.08214042816085747,0.00014334062410759264,0.06045875453804471,0.340415807531729,0.33909753478463445,0.23261016477445182,0.11561828138299003,3.503537972416313e-7,0.25421460844240995,0.8212776271609005,0.1118238539069268,0.7751093564385727,0.6437651864519437,0.02609530353359491,0.5141192709605032,0.11116189220614249,0.8228994436716853,1.1219462256941857,0.074585571019673,0.013050089237355622,0.040801411576398536,0.23042974953721826,0.2769740960837732,0.9837290358834615,0.4159080072985348,0.369753016807289,0.40800447266517964,0.36391089825442324,0.3396206771889842,0.2889238052852693,0.2147892042626774,0.08929441054747893,0.15633567848317056,0.69043047395663,0.20810373475578522,0.4857035831129101,0.9180364660622657,0.5213482014921444,0.14233797419750346,0.08983871914022105,0.46817849803028694,0.29769593429224844,0.5974587212088401,0.7541076301271259,0.3342683884456501,0.722558374516815,0.5273294444813363,0.43450447480262827,0.3343628701290974,0.41243195407654176,0.8294142662462257,0.03024985826497025,0.07599764536010081,0.8501908216776728,0.1363141546376975,0.035442500236046115,1.1337960984175988,0.18074689707611052,0.12951894042889148,0.0687331130505224,0.7639006056329002,0.17347652950875728,0.06890898928327487,0.5924521901326881,0.6115269923741291,0.17159986045467837,0.4232709364940429,0.33632155097282906,0.009907811028301131,1.0563108674939006,0.41191704717810007,0.19987574770311062,0.022622794510712384,0.019891782672112175,0.7972353931189947,0.16092884097631566,0.12341922242634264,0.22619804177584324,0.17548859339665882,0.05103100919183502,0.2341834235711704,0.3352886845669031,0.24200934044381728,0.24205180251523317,0.14901305112412846,0.013699554590353179,0.16573716641010877,0.705426636205037,0.2724366791758464,0.29356766119552496,0.5021627053295854,0.4103251983792328,0.8776302034153018,0.6200949505540999,0.5469465437737265,0.28698150600061006,0.6643882093655812,0.09377308550535712,0.34107004562841714,0.19089180259388944,0.2831534368364131,0.49447062373695283,0.03944812822228098,0.8470902105826178,0.03802224887588909,0.061775916720222035,0.1266891674500437,0.16130262031387932,0.23940548826984592,0.27221136040709204,0.45482368030883547,0.08277367240815427,0.7246083139461744,0.03939809408834982,0.5820016933983027,0.06277852521491831,0.05438132529933972,0.5377709493187869,0.04948287042758093,0.21891897756250675,0.4614618083344469,0.4895121294414648,0.3981089850099727,0.12566181669702156,0.4758059873577052,0.6270400697682287,0.438090912928224,0.7838009500508827,0.23577345680019224,0.9085853894302597,0.3466918967980045,0.5346419413289435,0.18606179653673985,0.6774595994254176,0.07945948306609565,0.27404249311285417,0.23991052241025324,0.2305857563898645,0.1414544024992524,0.28686094418702807,0.43910027471505614,0.7325444854084683,0.4129591268817027,0.6641422969956371,0.4303899449762258,0.32955168492134834,0.5412557819353255,0.8153138505830818,0.37080851697683587,0.33503876237323416,0.2436106534114125,0.3810302751498202,0.09971503719219979,0.6277781004498612,0.11444272474442875,0.6618132242255308,0.48810634356104166,0.11923606237858365,0.4864711909220105,0.25395871455720187,0.3163410936606897,0.30216972951406945,0.039215456832032355,0.14164273184890996,0.2686172610757131,0.4902134126077169,0.3766839185981861,0.49403452812951537,0.0007394533388555253,0.34053616624932864,0.0111571750031854,0.05944901731334453,0.3714307636723992,0.2311145469785373,0.11208610922668372,0.19776837913531198,0.18292783139238403,0.0907907948648557,0.4439897103590038,0.4546635632873189,0.6789360940081135,0.3797404628568182,0.33538399676768477,0.5038107320556552,0.6823131966255734,0.2842135228571496,0.04274294026550589,0.11108188982909113,0.17635953957735956,0.27083275844518184,0.3372705973862866,0.6515463616830272,0.420244642171461,0.13713339902180693,0.3303070920803493,0.00930447113144694,0.05977535653226164,0.0024503471984449353,0.8882139702880147,0.07246057867776419,0.10682368486081209,0.29149324156009315,0.16258967729695523,0.11468726741676584,0.22424585760925042,0.712029133604757,0.5864726293769928,0.3022350462449663,0.1768336960939879,0.19671431973812234,0.24100497857347833,0.16883694546184033,0.20052293790347128,0.35648791085297965,0.28393047641420427,0.00013080664044522278,0.8731885439971674,0.3252466336140002,0.5043276434815642,0.7868289138877345,0.6967420912864088,0.3874337359079904,0.5219696581536778,0.414242238199703,0.06721563615410636,0.23177323058502472,0.7621611042475955,0.08588049804756223,0.15849734186446102,0.10076464063830666,0.2092791562619567,0.11777691504323035,2.162397416542692e-6,0.24350269134763528,0.7403233389274919,0.6614606783648238,0.39354585446388896,0.22467505978337324,0.006532394878680563,0.3173722355016104,0.04545525257020476,0.17100977663770678,0.10846003166476745,0.16068791295857174,0.19476595653642498,0.3727056880494711,0.3126741192751519,0.16224631940679524,0.32483212759457614,0.09785203076173957,0.2658559859085955,0.3621998500908527,0.24337769047066082,0.19357491392177936,0.5619170896406371,0.4132384200503559,0.25066511883093545,0.26180999507306574,0.6839154564291491,0.30708979961204913,0.8095860280927196,0.012320943279309774,0.7251537858808479,0.283248623110053,0.26481018703521064,3.855613817425921e-6,0.5390488286799434,0.1669768533914456,0.10946227274045263,0.5338568830458794,0.036990280236668525,0.22293938812025338,0.4954643224904715,0.21517758795427044,1.389020910734536,0.41080736692634545,0.5016552379346546,0.2677212030889819,0.5599124941478573,0.7536984570938114,0.15218853098106166,0.2940341796267689,0.4210798250554159,0.5562452648553977,0.25525787913372366,0.1537584080519189,0.40795438636189507,0.10001624336625789,0.8580321546613109,0.2618196843531749,0.5157640955554896,0.2935895274563675,0.598551470188848,0.03073853834742913,0.9384722532826382,0.5126460070035603,0.10975405109525914,0.059802418732868366,0.6382310208923,0.3131180375066874,0.3923980604859232,1.0940978379647734e-8,0.2799698136867935,0.0002722034242150943,0.09640231402916503,1.036171934392915,0.20498850680848096,0.5702862854782924,0.36618376098269323,0.3157086138932982,0.010652011052271447,0.08669547579593465,0.29651555548250885,0.5630368374804254,0.027542947675572093,0.8196658887443208,0.31044706290930113,0.10268695369054877,0.10690099545062577,0.19077557356193045,0.9454162734319842,0.7130386322197217,0.44199972396172266,0.5959909910084259,0.525294886654193,0.455725988582221,0.5802037513837709,0.14696966926946975,0.06433558894749297,0.24803925276515337,0.41332994340655443,0.14886108703942125,0.4520513597819743,0.23094551524529233,0.01987375156560568,0.01679996324436345,0.339746344175752,0.6955137505820997,0.6818044098917043,0.40891051475442514,0.3994973010917884,0.44355983939022775,0.15064924181350758,0.039148482929859466,0.08246561926594316,0.012638253091793275,0.20616907671930268,0.14398520928503408,5.441965436354998e-6,0.3870036430099199,0.5380126357650516,0.04909493433796383,0.1911978422583435,0.6845528125114532,0.4364240834553246,0.09624147755085453,0.18150909964180784,0.28531513406491693,0.2774114229629836,0.19447092699008128,0.2405012802497811,0.8423479706745718,0.2860378380947503,0.39648602613468964,0.9158681300533844,0.49372041757949087,0.017223829733148052,0.22673142709646876,0.02189720697332868,0.47880300437937007,0.46201503923492093,0.11180806644339379,0.14991524829991315,0.7287667775366965,0.31816406463600727,0.0502111991540875,0.36577559407141746,0.9333417344717776,0.3427215226741287,0.562836813248671,0.31747333257926635,0.5988120580554053,0.044927502368667445,0.6031036344608267,0.5793000995902606,0.4970345896668207,0.7716670366303755,0.4907016500654207,0.004841530170969442,0.9645903557544679,0.1358104607535579,0.013176339211405689,0.20055592956925042,0.4167051879763866,0.7065010666668594,0.17005787546144052,0.25662412031325393,0.3867844632339863,0.7743548659086831,0.5653443099019675,0.5756260232926628,0.4857267431020525,0.24551793402774064,0.4229726033942268,0.14402404925677229,0.05687294419271283,0.5728532007046178,0.8646316895136905,0.12460845171778066,0.7731114953179083,0.37192503404230015,0.8692290372101157,0.12971292306892615,0.2408214562765194,0.6121669707116646,0.3309531316876093,0.33582786924893093,0.5088906030281762,0.041262816660293154,0.1601892581201728,0.26785784215764075,0.18941103086445277,0.15796981898845705,0.10266204272797123,0.010901836352408534,0.14735412050186036,0.10179494514126176,0.5333223902417871,0.3002973257172423,0.4427257576209711,0.7403821058972091,0.010653648234474709,0.6765214339785172,0.09225803415196317,0.35006701920775246,0.4326690904546196,0.005033292476284068,0.5094047016448048,0.49892091173966174,0.3202606227472898,0.6081734199210159,0.9239381391381979,0.5957104201086358,1.0337822662433698,0.17363171939322333,0.11881918616325476,0.5649607440464173,0.7873332963353773,0.32190122637582,0.11482181834566399,0.11587443030112295,0.007956475971130108,0.9532742364385165,0.20681282161277562,5.866497738300828e-6,0.11519928965117388,0.7251651451390984,0.0696852972878084,1.0056829895338713,0.1559447416440049,0.9099044759589299,0.09930187751662571,0.38773697233302423,0.09934324216479344,0.0007565498237540481,0.20729318100949945,1.4477840136879645,0.11445802977734676,0.2820812715686577,0.2795135796999984,0.1759516761617138,0.19717403465834815,0.21308611424882604,0.046786856244313745,0.25065632797110987,0.22477084495936975,0.4600835626983711,0.44071931498724237,0.0022159804556534613,0.6000671901284443,0.4028119014836015,0.3289947275277037,0.18746002722631194,0.364712358353745,0.8798523198946908,0.8734465315138277,0.520325033821563,0.12637947977573638,0.8465349090310433,0.2139411266745163,0.2608795517947297,0.03804871623084621,0.30689246067492826,0.8753540644674312,0.4541363056615757,0.04171287597675202],"alpha":[4.715230383658522,2.9559899455619165,4.023712330054989,7.044149957054405,1.2216047961389598,8.220394541347808,7.451073695079566,6.658893523734946,8.974261954466202,6.159500602746797,8.61788885727953,4.5507592481779096,1.6966974858148998,4.836603266218857,3.4848537172002003,8.737304190905261,4.281837969241778,0.19695919307294973,1.6600448992349937,1.5736470884386389,9.813123397655787,2.1675718283877,3.438844503926175,1.0413107099040686,2.681282735545374,9.1967074277213,9.906818357651934,3.760330020456517,1.6319443108661957,8.519878682641583,7.849369396752621,6.123454908711194,6.141832405393474,8.917428905654583,2.277589332982297,7.512878775520335,7.033271788298283,4.359625411128194,3.635398181744396,9.525606261975025,2.1901132607725526,0.9731403940776051,0.11352169735026729,4.8502984781647696,6.6124515850984045,9.251350457980847,3.292825709346545,4.768189278810118,2.469142022896458,5.19341471595377,9.46122317919382,1.5558269920852275,8.908445180951265,9.117675906142853,1.5269306415752815,6.932942350433537,5.159947604827641,2.0136130027572885,2.0004286558970796,8.98205574810335,2.3569568731383095,0.4135842095741493,3.0357480711648788,1.6212906166103758,8.157265495368867,5.8540836239480925,2.048788656125382,1.4207700286385871,9.821206443430714,8.666863273070906,9.56591369784055,0.37226318733751596,5.463366772115101,2.3418141485513355,9.94214137077613,5.783781206833034,4.417160515596368,7.819021843815319,6.6618988223818025,4.032275342185336,8.09628493090576,5.154126402437271,5.703518637546894,9.064620014366252,7.995950788654957,7.771833659793157,2.378776421315061,0.3918244509795987,0.03774999837931281,1.8963490955063644,0.7816112857499302,4.656424982628948,8.405016401284444,4.36489367876902,8.278157241398969,1.086815651041264,1.2850339225117446,2.163903549622741,0.17872002624631955,9.979936906241345,8.595210269268351,2.4289503704765902,7.661302907189107,3.240540112957435,1.6213361008238358,1.186035018998839,7.524663875967068,6.427479142228833,2.4643825077727066,9.015423922827818,3.9899491324913705,7.830465685703761,5.005730052024124,5.982145921330872,5.218632758509427,7.664930942628643,8.32224846125191,7.4575864063197965,9.258341530378374,3.1762232661269385,8.916433932017867,9.243033566567348,0.06191097858672556,0.2701537000139531,9.889614368757984,3.169829288421453,1.4110555880733378,5.417081916626392,4.8601193448838975,0.4312687604197807,9.792468257045941,1.568345087019769,9.511970556296134,9.50070586999921,5.519352686847934,5.4898545404082295,9.59817772759179,7.9951376786063655,9.940353463878326,4.847685495163931,3.5394229099177,6.5312337851818425,9.147080577566447,0.11993118846670203,3.3181259809656627,5.228192214566767,2.022992712630638,5.044679532772234,1.6343946774521356,1.0581826535208938,9.172182928786672,7.697728260446239,3.422619129476663,5.707485378847201,5.563038698046096,7.161064203047354,0.3210312336210097,8.880835191654025,1.9735392043705113,7.229024581346389,2.796009913240156,2.6568293598200077,0.38835173672968404,6.897268370568515,0.33585198750165635,2.253253316826891,6.2334686462364886,5.817544115779157,2.4865873216411605,4.4015932913351,6.552074813083591,9.906256333657408,5.4613433010158,8.898639648608615,4.5137243782785275,6.623917141529079,8.48694610156568,2.7149997579813823,0.7723737146020193,5.7816885379200595,1.664028567792284,9.864034804855226,2.8405086045867756,6.829385590995168,5.120860449100702,9.508307120780877,2.0271235058525194,3.8481444866145664,4.339297559382405,8.865327182647679,5.889193781162183,9.195731079713953,4.025536655955428,3.792723431709979,2.5192682696179003,7.907383352391555,7.9239675588108245,6.16140396157016,9.357855132601236,6.008995540560836,4.48660048229036,2.0763340113206175,8.436990749530793,3.4608055588818365,9.83392218969672,1.76525417489793,1.2132038173009296,7.6424051601619265,1.5104586341171888,6.304490431760716,1.3753746074233764,4.32412617910809,0.05511200520862847,7.303719425662782,1.9587632446495773,7.401855758703841,2.5774402043135325,8.870365657787385,6.957336336983191,5.840729200761096,8.23282923959318,5.08103821046856,4.830132775385834,0.9999292229989232,4.008919818174402,6.168001993556382,0.013437482860370054,8.451458399378154,6.562242690198621,7.039626037380133,4.78436443743401,1.8282882532557787,5.055359282159452,8.982816291613954,0.15817427099448889,3.443600105098583,7.203216576243518,8.409673991916087,2.8379852854281618,0.1927127006051732,9.45558533691946,2.5774295094525335,7.261426124481183,8.35464067294881,4.9876097085953,1.7596421587072753,1.015190766859675,4.690522352303201,5.672194112427795,1.375060196397646,9.80288917282596,3.08686348519152,0.910605059135523,4.159459853444767,1.2665385455343037,8.18901648480299,2.322792257259594,5.616311915507508,8.407461943882431,7.700011321525794,5.574581971866648,9.643879708367836,7.4994569430933495,5.718262094188549,9.623393239903017,1.5827004105278153,5.209121627727584,3.0350560255466585,1.6063684919047283,5.553416046248585,8.088487489638121,2.2348753945577315,3.7404978407273193,4.5540039465438475,6.100417299529097,5.826953358761449,8.472234430383722,0.8332117328124067,8.318995628534028,4.419518090581089,5.202730734345811,7.957415767673838,0.3816398381750541,6.230989820901145,9.600313125919852,0.7299997165631034,8.49481239122948,8.860939542498002,9.809834994934734,3.8391866714056078,5.967482598362173,9.204864156919268,0.6287940437400819,8.834503515235614,8.196992655920818,6.773128491901145,6.1592507880205964,2.85575062976289,0.6149338542612304,5.809385659892308,2.7047112106641413,7.2113876450785375,1.1075641189535324,2.071319065577386,6.903258857178274,6.834916941394013,3.6032883831261664,8.833062583405596,6.80850512404273,2.841799391782107,9.600737473565147,1.5744486790520718,2.876315360877495,8.805028275302798,3.4588668830028446,3.1680057994594857,2.702054264716265,4.081408188770843,5.808510540058814,0.14890590674290882,5.2188143031763605,9.613477066490146,7.52519064159475,8.71173422294991,6.880214101034201,5.250445192269712,1.4757002286605392,6.040084456866275,6.90741059686933,1.0722548526438214,9.886562521016915,6.663603502453299,6.365646774043087,9.27879412653001,5.447918022032967,7.281314946453348,0.9360918374484006,7.596119963749171,0.07001182496573888,6.454612032767373,4.917465413560292,0.2448994313615982,4.2811206127320816,3.4381361296711033,6.028252313346039,6.851216851979263,6.255148411940869,0.8868854847814944,8.810145600139744,8.732033580299179,5.768355272428208,8.572897564303446,0.2683249501342755,8.75281959679521,2.690712653968814,9.612477203794818,1.886748545798722,3.2065333504696603,9.110086700413131,6.492607812010878,8.570392924649672,0.6802148953035192,4.240962745297119,1.6871675799380137,4.790155033181622,4.579684646710462,6.728845501159386,9.28290973310033,5.9650006897238566,6.877157935778618,7.865820751663932,9.77910921275162,5.755307032325938,2.7415575146542315,8.027687009950133,1.0527645532222296,9.269069905710289,3.8834904825262417,0.3547451624040199,3.251507371070115,8.708644549610591,7.74580010936829,2.988913685935808,5.0727999005187785,2.5610758742580098,1.2456806701237366,4.409572046984085,4.001231935882146,4.538944219544485,9.685443638405498,9.261816614230334,7.008859784936414,6.968024398596873,4.4687239015139575,3.7287092742289007,1.2854363302669913,9.29118634943505,8.93188233777816,2.2882351355881925,1.5051698061064367,6.609245190389423,0.3876068397431931,8.538724583244768,0.2907999582850751,9.96694579106351,3.2905881326000563,5.581132557597355,6.445555866519152,8.741681579763272,8.772534602639414,2.8746534189937223,5.844354375942611,3.235808906975699,8.393355844342441,6.659485178089017,8.188190194553215,3.799033050388272,4.891665540259693,8.620967679242003,3.8563278183808913,9.830271329150902,0.03697654657280669,4.180788934528539,4.794458840237333,9.37076820842111,3.918215032150305,8.685854982050131,3.7549090292115217,0.8737511157026456,0.833579613790778,3.905093568250717,2.4269495930495855,3.5342895981960187,3.6051098901815593,3.143859160554354,8.361444312573417,2.915605835987465,2.7308603598199532,5.560442887744195,7.951858582604383,8.762666975500693,8.750294244637653,2.3390338300979874,4.02141700629662,2.7475505294874303,4.251007733499144,8.414030314642265,8.885305112407787,6.126056749432789,5.688569436120378,4.591410551165103,3.0593376500443448,0.9869685420976371,7.636365851621476,8.524840783214998,2.8767461172311015,7.190710622172154,6.43631870884848,4.933986133551517,3.9598634102965713,5.057294411951667,6.837243078101314,7.48545158824191,0.6577687883675565,9.986451496196231,6.190045176898426,0.8254873753838776,5.495678164859543,8.015994296032133,9.149330105367381,0.2884476810570158,1.2418430082540355,3.752955086367258,9.01680701560963,9.891986355528744,8.32981564212866,3.848066291557588,7.593600270394143,5.745319601559387,0.1779911309990867,8.789109118524506,7.896579763472564,5.8068094201234155,0.6706735336725345,0.46114424886149585,8.079897121819924,7.802260498434183,0.6410435867970699,7.344118180013699,6.808529141891169,2.068320324325741,1.9875631975549246,2.889490258712406,0.4456698980853391,8.840451554835163,3.993334044944903,7.58460418724149,4.933111650629667,4.5894868268449684,0.9767616648994837,9.22129975877091,0.6537859663912982,2.342531864349804,6.196174228671072,2.40210039208802,0.48299574385634036,3.7636270142080264,2.659593888383762,6.542047844608301,5.0935550330458135,1.9772759492132463,0.18973454236796083,3.5016510606968065,6.300783538640831,0.7343687695634737,9.71054391156176,7.4744106576110525,0.9443982976948373,6.939518420354016,5.203727582867696,8.449494059774509,7.83777869161325,0.39109827753301296,1.0657445622976547,0.5272499894515814,3.219563966873844,3.605205554266264,5.613541585234092,5.875682603634282,7.279542117766704,6.844549954760206,4.088312613618806,6.585928404778758,2.0784429654662984,3.8427442216869845,3.3701338680433213,2.172589431588152,9.651133239737334,5.2271852115236905,5.957934479824523,6.593463074052488,7.731694006005718,3.953632066325161,1.9622864523107864,6.577705048451595,5.596405548749308,6.520663501175763,8.786588271885137,6.374676432462771,8.67524983104814,5.892139508312509,7.5491344635926065,7.702988474778792,8.265525089833435,8.183862584105214,1.3258886848173335,1.4145835857590683,8.959612208320017,2.0247151450568124,1.2371382364023353,9.967525232447203,2.656353715944675,1.4249022517213183,1.6813649593493385,5.5400588060514515,2.0936724142352436,1.6965013212757984,8.316291015166017,8.153361962425013,3.9568305644595503,6.02478678446041,9.3754702633131,0.09395377191172782,8.275402843636435,6.111986266476301,4.893635231373034,0.9518021160394463,0.9869027713592415,5.916881675044678,6.109707323375934,0.9978344106886028,3.4116938607956437,2.0837996062892583,4.1845689245190965,3.3899334483382138,6.797407351302363,5.547896312751581,3.776969578414182,1.42466645366512,0.56280728073689,4.018752987253091,8.288595735121866,2.782215786947644,3.1003555686013207,9.218263011174894,4.44726993360131,5.224469933500952,8.62295675716701,5.786582577685946,3.0530038745084553,8.611852716164421,0.8201218060522608,5.4560953495379705,3.2867097459848327,9.158123227898338,5.994541374993016,0.13399610684711627,9.264163123675168,1.8551961272245876,2.450045264320868,3.0102328396919287,2.382733995208983,5.027897343833299,6.838543437244042,3.4832509163622927,0.47876191050833183,5.367882880565635,1.0936230494705779,7.282506262308783,2.631674552728549,1.8156875282685592,9.544796833656594,1.2296891290204393,2.373329581488961,9.206184431961502,9.347877022916023,3.441016695228809,3.2619757429396268,4.238729188104657,7.038708366229665,8.648944251817818,9.363513418651987,5.966270573524697,9.015745065260312,3.970512779523303,3.973154503009688,3.329447877210161,6.552558662946877,1.1206253252296783,5.202706095499869,0.6666062757457447,4.041224892151929,4.0233838814189316,6.693895637304275,7.370415260111331,3.1118080511424373,5.482752338042893,5.608707490612177,2.77380192549628,7.1763375546383905,6.369262502599939,4.67600839963211,5.821532939459512,3.6948103393191167,8.005512793694951,2.8117084254989178,3.4623053583502617,5.771507009255519,2.2636338907556786,8.162087951397758,7.7968107645666285,1.8669092616937455,9.643657963719352,6.522108415509001,6.5087822606746855,5.004986975063135,1.6341444044294007,1.8967326453270439,7.361268168290271,7.553927677941026,4.959325089894586,9.608732900103252,0.444292602866192,6.886895207790107,2.5956862872754938,2.1685899276043386,6.8727957328945415,4.622537124262857,6.51133322286511,2.4430009117810436,6.484276747944094,4.369151997203358,9.430269317502303,7.300239534926785,3.9293244017026074,8.438169477200251,4.319907439265935,9.49411372535797,5.211608261788909,2.3548025075623302,0.8164317449467062,2.2831301133446202,5.993181201391855,5.76057312699678,8.559834950190526,8.520217839548007,8.458160261342888,2.985273437660041,4.81287433319271,0.5006962109646618,3.401076375588017,0.5295156629222464,7.682797289934699,3.378152849394991,2.4211221437770303,9.226049372487743,2.86032197367295,5.014377103546018,5.234250653122707,7.986854383847726,8.85558534253475,7.791043059599785,3.7305738579698366,2.6673759130750274,2.6605273035231436,5.480068542893526,4.522097759930819,6.688222863959692,4.798626906796883,0.25954095678945244,9.242614666106672,5.287210289576068,6.1697581540910935,4.944443968176411,9.311099911458118,7.037341765590497,5.313328471757743,4.345756296260877,2.469956587133615,3.261646064846566,8.520592487925407,2.424862968458268,2.428218051732094,0.7954214973941243,3.28988858128886,1.9424892572343233,0.14229328338303926,5.475052400163099,7.233018812470007,9.68422154915003,9.609393238657404,5.241880833565206,0.44872280617656024,4.412822023803534,1.0417512218090375,2.6096945688216455,0.43388348378272656,3.887887433449566,1.9512013948141371,5.513369411592823,6.87897412941841,5.997703810750455,3.37938315229531,3.613056597119244,3.4233182462005596,6.14800440498112,4.995783551272299,4.119977890668148,5.95498052068397,3.8615378536050615,6.426997963144436,3.9344014292387963,7.154660003493398,5.9773149026010834,8.087105270116378,1.738297634739907,8.11325275120967,2.53345315376186,5.039713451384811,0.12704911140005715,5.8932510695789775,2.5827447827614414,2.801695727903455,9.67602734094838,1.3529697370658411,4.615385605346061,8.106036539948372,5.7960295396787505,9.527873210426893,7.345345266963983,9.57125205724668,2.5282646391574315,6.353293027725362,9.3212201699808,2.7947756156319215,5.698625979907046,3.985724371838628,9.465020139346358,3.0522569057639948,1.6051994494265798,6.2320547751338085,3.314280362833939,7.589159133956236,4.782164320594502,8.91862391124447,8.467966813748152,8.75603875598652,1.700311055345367,7.762960636018478,6.959717878677769,4.410016040024278,1.0166069541171585,6.614540137246625,2.162044636934941,6.39952061100775,0.14961229701531797,3.5065679266749172,0.4302803488826723,3.5299066677175017,7.659519838726412,8.089258154618229,6.986341900740793,5.62084945307088,4.954805178931276,0.27614554394306046,0.6780346583224794,2.3871340995980006,7.106526872949983,0.376670427016903,8.894413233399337,5.081535856346409,2.2842216775402435,3.065773699116976,2.8593930808342494,9.39148465824676,7.382658317383575,6.225673102127216,5.106639485646848,8.88206226716779,8.32380651605008,9.66898106186931,1.4451336579514296,1.587772171797892,4.898933951974598,6.879085730900476,0.8162967587000836,9.412129319935294,7.650649608388425,0.5650555570577609,0.3387905734057761,2.766877655707103,9.378099522832485,7.164528451382644,6.620528324250062,6.762398499152907,4.964576985404303,4.079289079138578,1.7465688817779657,1.7973677900157092,3.1455968261775613,4.241966873661072,2.674430751451502,0.012971334858942196,5.767348755191395,2.8369539715525516,1.4950971524812218,6.214790495407065,6.411090441419097,8.935550707006207,3.0534101915314515,4.160214775155408,6.998406170055564,6.94612359065639,3.9761893276994,4.223580237668272,6.202759327079576,4.123837897824735,7.7681424624694495,8.632184162842568,9.9991827351592,1.9383700871413034,3.9235222998847252,0.210231247276218,4.622069562813942,7.371758705379019,1.466730121435862,4.6537931882247685,6.803716886013717,4.186526464235039,1.6441457444690988,8.01197572864768,7.407017386181947,5.981046225124125,7.996258981497338,3.263033912192488,8.261122197134886,1.6018619155131897,4.265219140095442,8.780406090355088,8.068569850070816,5.024973375846821,3.2378664103060517,0.4883931091963878,9.851391652479657,1.7304697447499406,2.6005874116959693,6.542478985316502,8.91503555396925,9.08417907270624,4.425374742173789,4.862013813443637,7.435477030093018,6.257246960682499,7.609812666486482,5.170718246264993,7.805866618532193,3.212216231446068,5.383209837604717,4.129631308343873,2.313395813166279,8.357798323552982,9.291839496289088,5.8844989499025075,5.577539603975456,8.456193595794835,8.901587202718924,2.1137873507936122,1.389484829848655,9.230143379804305,5.49403380088473,8.983651199920528,7.066632429103454,1.2115355284217832,4.2188735576320635,6.277195280222143,6.17352516584035,1.3138352452719637,0.6354562098473004,0.2984497616819093,1.6389960589593122,2.483524131242565,9.376175186524293,2.239504427333052,5.064995335279512,9.761450549914176,0.07187107572466545,6.2623563433464335,2.8182945452246133,3.607123401601917,7.7881752387966845,0.5512865010959622,7.17945321861075,9.960367037907877,7.048592679039696,7.266405029769252,6.541135662078914,3.5075696217711627,9.333497853007014,5.338204629992047,2.026406423038114,8.832070791002247,9.254998718927222,8.13880746262778,1.4672836824131053,2.1209070807616204,0.28728366421911344,8.754402952976712,4.543707823398289,0.12901672915337503,2.416678108866228,8.784672602299135,3.521484753602986,8.767660104190053,2.7696076807061187,9.997637653361979,4.347382291890551,8.029336688153652,2.8715306834828236,0.6126194618001612,1.9783569445981475,9.423450653649308,1.640863359556255,6.354090699020329,7.311005529426932,3.4741569022557717,4.022858953018105,5.297496001234712,3.5463600017742314,2.3513712687274135,6.383065577501846,5.217291743307914,9.060407115260196,0.22344826361878178,9.51844693392325,5.199245305861524,5.650679730733675,8.042872634377751,7.913076102716882,9.985351745957285,9.097903771315984,8.587833123144941,4.770983400628712,8.886566255860497,2.0514948544809752,6.691267425008158,1.7153865934065626,4.353755618157768,6.928799456761354,7.579093633334959,0.45850605923090315],"p":[0.4371953467082095,0.572258301539891,0.850401918403833,0.9843402502283787,0.4753350295452805,0.4089289396942142,0.4567707086556976,0.598325157286564,0.19557264854938716,0.5158079079749576,0.7631899319075452,0.005108711611685246,0.8260579449793912,0.5623877525241403,0.6839645901037028,0.15297392157382728,0.5454297788345572,0.6374348358037734,0.06951237087404727,0.6645548836982385,0.3396956608710091,0.953376742531203,0.2404455024687593,0.14337274217125184,0.04070243560316866,0.6102416536241331,0.06745677416808826,0.9584760295381236,0.4785703113479005,0.49959070735275457,0.4486766449701163,0.7947440180995338,0.5363526449235125,0.6906664715584963,0.5372901915239034,0.49740216851322816,0.43600751566559404,0.3183661373994353,0.3175297961177721,0.4112077041492772,0.010496851100620264,0.8839527992182348,0.712291315478532,0.06142150743491537,0.7316189541830409,0.1875169048593508,0.9468647098694443,0.11069690002041299,0.7095076290542663,0.5433522648820341,0.7458286177515077,0.2869742706934626,0.7864037790105018,0.016860618582509757,0.5152692063494726,0.9492751788618898,0.0947348892183677,0.30180387601614167,0.3066940793755577,0.9589973893826707,0.3208966220939302,0.4993625758458671,0.782800033954552,0.6456417092768365,0.48351833499008046,0.20042595290032672,0.46134484142537757,0.1453869469012785,0.16859647888143314,0.17764168376674294,0.869997783978631,0.4376085415298727,0.959936581976707,0.8776479695520261,0.9451468719548091,0.028350916163417894,0.11036114085268256,0.4104577875912274,0.8118367915791,0.1263305034902753,0.3357567617544486,0.49309627764624686,0.5000668932526253,0.7936462410073482,0.42920377155506895,0.8598008546820484,0.22030660137113722,0.4953956694476014,0.6827808390669101,0.2627636072529247,0.9417774869496125,0.10246213297063944,0.48464972341319057,0.07335388693202294,0.16799230871338078,0.3371734402034299,0.1061788834819426,0.632417003515658,0.9180409344924643,0.7154487817484505,0.49477998821459157,0.864750687012632,0.7569632220100746,0.8233830613705495,0.9072843430526234,0.27950826480521695,0.25044109818919824,0.2541967437281807,0.6914102657898995,0.677240801972006,0.26539154322291436,0.49723798953728404,0.648278601400631,0.26325226133919966,0.3325726233133979,0.30466176890620233,0.7107089474900783,0.39892134487281883,0.12011304490959906,0.9667819331657947,0.9033494925489247,0.6373635926807142,0.06316183698809019,0.08933926191002217,0.824564123337711,0.17104923157065444,0.955189185865503,0.08127656050949028,0.648854772907937,0.8233302403373917,0.5705560439922013,0.12698615650617873,0.16386835440764091,0.4965126941337903,0.5741917831884347,0.6144745961638494,0.7223196625345478,0.8002675157394947,0.9511480905378584,0.5080763219972086,0.09979534889567199,0.29143620055900854,0.04128879336246816,0.07307593338952212,0.538342062082027,0.28682387635120943,0.20819730720843066,0.39060775535956127,0.6383891240116613,0.3371682425967424,0.8243494564342024,0.9337370323569585,0.543129239537101,0.1202216731732082,0.22548363977108044,0.6856070331518846,0.8134748785390034,0.4549975892123761,0.9203418015245155,0.22634209215092294,0.9897179631224415,0.9425127553138797,0.2497759386899625,0.5380820506306601,0.769897692309137,0.7849262888772812,0.4539700629813763,0.0256973801816458,0.28542435699700075,0.8291386069961693,0.8658091999145285,0.20736118780491775,0.7971515285149415,0.1999242421903551,0.682810154591935,0.043571731959544335,0.2752981449764791,0.676327772045916,0.7945566890120122,0.4228119846832139,0.2884198606580062,0.32466598437819694,0.9121543920838038,0.551756887317248,0.7273258379742675,0.4665295851590763,0.5567961262916306,0.09741337318383114,0.02762569341529364,0.4305098627413222,0.5427250366475469,0.9689452409863097,0.8907982701936235,0.4986751722899865,0.3128104581198834,0.379096525078338,0.4355795909886051,0.8122358850080271,0.7734281852287086,0.2086148331768496,0.04068414388293151,0.6457921420326231,0.7243936060839644,0.8302937912959167,0.561618410141463,0.3679187876008101,0.7551274650141153,0.6710361264736879,0.2960896885360127,0.26920865242851133,0.940493560895562,0.49356063060053357,0.7135244369873706,0.2630220229795617,0.8340318098633068,0.36062048678187053,0.08514675651264714,0.22839397347923662,0.649623253324912,0.7457582298798813,0.14941188441714282,0.81158780737815,0.3567303622977851,0.8410973827368775,0.23385013299477309,0.4648427639467472,0.8140536910683387,0.6989781395205954,0.3903348493495047,0.9432889674453615,0.05131786016844564,0.5424205424103477,0.3757088148452592,0.19511695577996946,0.1526412166100477,0.9213170038970531,0.7123240265546074,0.7941247179889228,0.6684381565209547,0.9116078956708575,0.11478467478413745,0.7362855284687531,0.20664493297452013,0.024073956658379858,0.3590581177529475,0.07277786739355108,0.31171829275523666,0.2240829083050988,0.5624257743060141,0.7397848515535719,0.2657279038185618,0.4447205380283754,0.2122481601374382,0.12070688989906553,0.5875730093460654,0.49675326787257035,0.1379818077849586,0.39902167823932455,0.6225471978861801,0.09836558625660774,0.5848640096724795,0.26018430999561604,0.5563604901904042,0.27655202272524115,0.7568782262910505,0.5016718796134878,0.5434144002786472,0.13205166557845294,0.25696014190099437,0.20205757989026596,0.04673364276008174,0.8903272064163879,0.36352100579299984,0.016191108683061506,0.7802482571261433,0.5189158234226847,0.7339407386991008,0.6752904714018517,0.7086199891970539,0.9095532296319988,0.8059704933329739,0.8233484340458206,0.916061248219223,0.5216058411056756,0.7411689849147338,0.10154379946074577,0.29555291932032257,0.796235906927883,0.3949532196781129,0.04786034058205879,0.029352180662655325,0.8123301857071596,0.9035919686772769,0.7903103888599281,0.9355456519869996,0.9396244065022237,0.9674618650455504,0.17721090048306953,0.6004080275564014,0.7445386737735513,0.4625511836147864,0.7830933946243579,0.11745394001331921,0.05228622213491074,0.7843375852453887,0.4393444503670145,0.42812106541753203,0.02368145119039844,0.17383455701551576,0.5596352053688791,0.009810501271086514,0.4124067894210106,0.13981794909581136,0.912430987011996,0.845650193670413,0.5134655932483243,0.8734874583609218,0.9374858160668855,0.39658721127048224,0.40663515243349235,0.9327913270216275,0.060310726904088785,0.33537966322134927,0.2931255569925697,0.42747661522427083,0.7995568278212859,0.6345556511754675,0.4343542120552073,0.14085550504100608,0.5763581816612111,0.5507453838805689,0.7196071749055024,0.36355128879237353,0.5907539676282967,0.554920426607072,0.7807633918335071,0.5964421164804568,0.633529680227485,0.05054110259951794,0.23467752354715476,0.7455632752540227,0.5962062682084335,0.8982389602380889,0.6596032408639962,0.3461922857232129,0.22619047469404974,0.8173046246803375,0.39793438496198896,0.8761181420809716,0.13025145439585817,0.4445759335333057,0.32561536323509843,0.5764626570028486,0.9545081298593088,0.004454482963393014,0.4934590648862951,0.8336971230940611,0.9997682413502824,0.6030352402828674,0.5540921364529197,0.5544366867121724,0.8869452553120307,0.5050177718625533,0.29629329809626004,0.0566820294693946,0.7661372938641466,0.9570333230883641,0.8246671140652291,0.6971653980566264,0.21372079686351175,0.645190331085542,0.2705994863176917,0.5981673209844329,0.7005087253547027,0.9699503597841832,0.19189290948434823,0.6915531143876346,0.9306127211872344,0.49619126856654305,0.6489840864722345,0.14217718596466833,0.5362296166017011,0.2384046518994809,0.29218431392564903,0.44408087305165544,0.2275736500181047,0.2076343168712098,0.9123357790841613,0.10661051922059595,0.7936602492019662,0.23164778883213644,0.3490333263895775,0.36744312153340375,0.3685062308276872,0.6306883235204903,0.3696413473134039,0.3475479343893626,0.3815612959659258,0.6970138611530021,0.9590715705502617,0.18367456699999152,0.3927092762322666,0.995426816117079,0.5542673674820568,0.959371738615244,0.486524845966116,0.6779691820282727,0.3572010614034491,0.1422079678811754,0.08500475712600952,0.0019999485587565147,0.1579172728863809,0.4025164489397395,0.7289062724291369,0.5971420910457932,0.007146215903941711,0.6237598259679418,0.1874679552265448,0.06647156500468321,0.8730949932295933,0.5957031469122012,0.8909140161336724,0.7897305047796639,0.4225317121856551,0.007699638653428709,0.32009538341074406,0.3127127439386512,0.23035669427457317,0.9241867646381183,0.8110887785018701,0.0546998081963066,0.5451911681274446,0.10018305745200662,0.7441276692701035,0.9317248480465623,0.9943233954846267,0.987639564910662,0.6354837670591422,0.2200775163969333,0.33056781314354344,0.14612352226767955,0.4197560725648948,0.32003495306082574,0.055406882516795264,0.2512126852209935,0.577458041337612,0.9297073196303824,0.5030693221142502,0.7541697788321802,0.5367987790144673,0.1272504988450014,0.41780716797495554,0.7022215892464079,0.12516456719777191,0.8517745383303026,0.3744021808777305,0.29058263440203236,0.4939001978670061,0.9866269647171155,0.8657155684531779,0.7636058031413444,0.2072665139795149,0.08800876439267236,0.6712622394793086,0.871816536257896,0.28388703977425633,0.6027718992157594,0.7539023136537337,0.5404084306814336,0.07919244202851794,0.11155880027361142,0.8850959708886743,0.30472006771671944,0.7495286543456015,0.4841504248796975,0.4690136594874632,0.6951954645382266,0.0610127824293385,0.7619659696467176,0.07807309045327604,0.4167089853897574,0.8804282569273585,0.1512794205227359,0.7789564968497797,0.47360079279040757,0.3566666350135912,0.6811182702185397,0.9870330162483181,0.35717540441664797,0.9844830078472511,0.45946912483228486,0.0293276622467582,0.9297896731439919,0.21789326635889839,0.7610332220936118,0.14054524179441374,0.18662733027720502,0.5918538399168065,0.18901116074054136,0.06324325268433117,0.7572821476033225,0.17803034039283627,0.14170822092524782,0.10189496676172993,0.2754221439130542,0.06478673775262389,0.018169121109632647,0.974441082893575,0.36497532069540717,0.22661719761314103,0.5169388424280534,0.11278226070504482,0.7260899543021306,0.9668168946143287,0.8400245248267368,0.4310120021006256,0.9469238363917603,0.39345787398649934,0.8673875321399129,0.03616625334348211,0.8741199006628286,0.9988177927210768,0.9031181030429705,0.16972781654699132,0.7325186321712982,0.4923195115551424,0.682802783580708,0.9820387491603586,0.7457868027059826,0.45279046739764084,0.664561051742244,0.6968758896834086,0.13396802699523325,0.8594131285114028,0.4223995483081133,0.09006188943060578,0.4716589442928021,0.5810078467758895,0.07086371097360322,0.9169593892998911,0.8700501564358829,0.7283172064444279,0.2857580486320159,0.38101721930336696,0.5447522119227564,0.3153221383345213,0.5303964717376777,0.7039836652666638,0.45185650672601274,0.473738181421262,0.6061812889646914,0.16522386596197225,0.37484521682249383,0.2621244685617863,0.8614126366805355,0.26914866688702666,0.5653242789229131,0.604766089476624,0.584115879402531,0.38057145115570123,0.9972054208605634,0.5048023941617998,0.6651418151176482,0.4836053351386944,0.9453309836737691,0.6702780594956321,0.39409923364933896,0.8655309631118704,0.28878929905646333,0.3411311386037277,0.4283349934456653,0.0905532800181219,0.8458390126272399,0.9034539779884114,0.4129542082744697,0.20130529247910767,0.28247713352959947,0.30236552049445664,0.8243712857219558,0.07740901656927912,0.790549826460236,0.6952371126074899,0.6332704450870634,0.010565595669763672,0.4196753172423002,0.25606419818057646,0.17394757811523665,0.7059292158474739,0.7206381590041382,0.4432715952803241,0.2367129985644172,0.4905407313967869,0.8682426587389067,0.7274392382128974,0.16103373377667074,0.4970383071830733,0.9491029066436307,0.8841668801054394,0.8600558567580776,0.8360998202200314,0.8539721068140609,0.8284566995376699,0.7014274019604783,0.26680499007326075,0.025789935698242283,0.7218325502306364,0.941749369085642,0.4851926213263906,0.12173093789134803,0.2243185172250497,0.18016126151416367,0.7294926643154915,0.4694308283534947,0.2631727539429367,0.9210921030704295,0.8202348199238276,0.9180278452099777,0.5015385853776027,0.3357675847355883,0.12088465657168057,0.22695449912490506,0.5948771632187051,0.39720391105578123,0.64050064280296,0.44443608468614393,0.09862715523726684,0.9207011592007974,0.12350546588951139,0.7870166991281808,0.5288998512270167,0.42459954434047753,0.49575816372671433,0.26393058611239373,0.5985233067146083,0.8741972307015315,0.8096203392642249,0.5993012089068563,0.6223540233164169,0.7225911584524556,0.5945364592080693,0.9907484223770384,0.42344900738512337,0.19763155694393686,0.11984133695249355,0.18007916255664758,0.9890584223676571,0.36208836224283036,0.9149991115577416,0.9872329538333406,0.18490926549542164,0.6147148557820714,0.9628153865320026,0.5573784664086143,0.7518725326218998,0.07017561635290437,0.8849997291077449,0.1147410647357856,0.7502210161330181,0.3512161289837905,0.7600643506136986,0.464606911772141,0.6304168224239093,0.38178048809933207,0.24269470971722606,0.407698552667902,0.46609208926275314,0.2452683708123895,0.5465200951293452,0.1969578888470982,0.4217235273280937,0.8107963777268146,0.36142846865456524,0.15840634687771882,0.47420752891871043,0.0026354927115415094,0.20391527972548684,0.24567345145579256,0.31566331125405833,0.014737668168961049,0.8104420063170252,0.03648294633036708,0.06388281612180124,0.35817031798692667,0.3804368734156607,0.9456505712511212,0.38359531978621986,0.43835460421588857,0.31194990436303605,0.9656796141722686,0.9263645488617782,0.49856136464683365,0.5473351099160912,0.020483734035517953,0.3737215151784046,0.030570624426647708,0.8885982117655167,0.15037478513802793,0.2738914101377796,0.7127411500296374,0.4451667357317355,0.03159512125862962,0.19710274823632923,0.8749968162421953,0.07489376435226247,0.4710789005078573,0.04997039910214651,0.4467466489273282,0.040223602361287636,0.06404966160422587,0.4629498127784826,0.5838233408199445,0.12005523516001904,0.43931309897048854,0.69582494895571,0.7651624098209826,0.15395970618081267,0.318552511871971,0.22072379180941137,0.5020130825780147,0.2335851637150288,0.718573533507108,0.6045669863317384,0.821414688986529,0.8978261780929846,0.8984220029207037,0.3193890484556703,0.9217705973817425,0.6864421198569137,0.20282347483925012,0.34889573791227657,0.9480524118553137,0.3865685453537562,0.5288234452685754,0.8705902241919379,0.5366419476695721,0.6818388282885242,0.24507915584988038,0.39834976716156745,0.9085611838460244,0.8270715334183891,0.22472184384557692,0.25976322207963753,0.42432061355352846,0.7467363795482642,0.39618091796626786,0.3950375905918704,0.9137885360544873,0.3172928457989417,0.8915190165840494,0.6403901611377476,0.41453799158859983,0.049893017877483015,0.8754758808646801,0.1795273100006316,0.5318478045043353,0.4933164760256268,0.4060317431157041,0.49905346006083784,0.939760163997583,0.709491390710631,0.2643416943829806,0.5754620517866242,0.9321335898331282,0.3173289649847213,0.7616338738897905,0.04489141654500939,0.9386775565729588,0.902223902689496,0.4668356707228061,0.2941166239319928,0.7106795753059578,0.4203832594631962,0.37291541445103693,0.5286389610359832,0.3217437011929707,0.2048817751152603,0.625494412559936,0.2612381562571682,0.9525582289800394,0.3052169323309657,0.38591873920496256,0.847745900907205,0.6134398149526219,0.3615440470853808,0.48674340801725346,0.4511747847523635,0.8777793024649552,0.5503650175418824,0.8541522833312174,0.7053995824076364,0.6643845883606683,0.10713475839926856,0.8392454177099264,0.264957038235063,0.1843142936063542,0.16639756727862154,0.7993967745768478,0.13406655137218304,0.974834495542342,0.3955618538760399,0.07807951690880821,0.5677243098387399,0.7901672420120027,0.8922313998002795,0.5455095776811476,0.10603179296890075,0.8161043225124285,0.10181146412889874,0.08972871106729996,0.9904025621797199,0.013917572824059699,0.7941632436298964,0.6580435972550223,0.743461572307136,0.6444705628933916,0.7554551403972285,0.9375672170132794,0.7436107044953879,0.7109684842068802,0.9451897530393631,0.6773921719664249,0.37378824900378316,0.3402899104788195,0.38886685026569223,0.6852363794543821,0.6473115234533355,0.4846675980373858,0.9194604162413922,0.6188149422297913,0.639762608828367,0.26101442586515144,0.7793637475425539,0.4072762760397788,0.3213065497923808,0.19501991470296187,0.8973882536295694,0.13946585614998352,0.12195759378856796,0.5577498564787018,0.6434411267591666,0.9574649521335126,0.36158126022647674,0.8022844592715128,0.5147964540326389,0.6847719220004485,0.6692648074759526,0.2529575727057216,0.14218781042772655,0.3874605996989404,0.00036730902242942953,0.16195585375298127,0.6015572541703076,0.8898552707459224,0.6586717479563351,0.9905131175148749,0.3615352892716417,0.12119235395019223,0.7245927290932668,0.418134060777847,0.16634080861317257,0.3059739760594531,0.30585707118102157,0.1778923040726188,0.3992206251585746,0.4458804812232078,0.9953357335315021,0.726516205973446,0.5229808217279581,0.8702529363133231,0.31783215446144175,0.04207771354386125,0.4701623956339873,0.8256684581142142,0.8937491130071511,0.49413233237278886,0.7910136968589514,0.08120692510708971,0.716080279865466,0.5668553576150994,0.32130722162657666,0.12118114327237617,0.831417717982563,0.6742148768893519,0.5793688699438855,0.848329328694138,0.49400571404288285,0.25571096109242664,0.8388086722317272,0.50547679143724,0.3402047061571998,0.9218834505085653,0.9876055701393385,0.29794819801938033,0.8465906284228195,0.6944037783580534,0.0027428847089694397,0.030418374928269598,0.34464059491720533,0.5052781114563956,0.3022061108181797,0.582170793212474,0.2498426912945948,0.9899929735370518,0.7441924284276675,0.9256670215596503,0.18224197550469,0.527916093607897,0.6772581522429595,0.2503423513114875,0.2038925720746081,0.6932165565881943,0.7676498016332598,0.02820006418358645,0.8811670553138469,0.1291601001199576,0.9905012496067624,0.6501637158321012,0.9188413259843307,0.3547571218920953,0.6901257664203746,0.15052491852712802,0.8421326881901035,0.45085838829498104,0.14248857017583183,0.24373461782844763,0.027944668061887112,0.7013007689006843,0.9109562981423704,0.614794593460126,0.7875315410295447,0.4433720755776269,0.16706407372412002,0.9576637301691582,0.922952681754299,0.764229247272449,0.8883984233459481,0.7777082351564581,0.15729981444115815,0.7441372599830174,0.4710001150227452,0.24106051163630937,0.40328663597387937,0.08085189199490328,0.06756998161346228,0.8892697657724677,0.9564862183421865,0.9737258310263692,0.957322794211493,0.12059929604301267,0.5176203738675891,0.640933051587901,0.35730342646751634,0.2560675501569336,0.765678592655803,0.4393773065115447,0.6087536652922423,0.7595701339952878,0.248009701908682,0.31050256255558817,0.34736696599065864,0.6146765159706811,0.01747233567738693,0.9272201031538894,0.5703486660419106,0.6268594458585859,0.060417910321014734,0.4690576093487173,0.12973812352207803,0.07771172625724199,0.8189176733223387,0.9963259644935178,0.5989988908290382,0.2605431442388726,0.21980641409678103,0.3194911482326297,0.21597522914164458,0.19826215182166318,0.025228882939005715,0.900923383924662,0.1560487718749668,0.6264823330109344,0.11906490164861938,0.49395935238589006,0.6743621338433177,0.7565623125320955,0.622206818025453,0.00837358043741121,0.14117190048610162,0.9777276939306876,0.9229373609349958,0.7310814291509091,0.13110656972263324,0.952064655185358,0.7369726144100079,0.16527431717656227,0.13027422328103322,0.6052865160630727,0.9434792404104162,0.3064145665505289,0.7676793514207969],"beta":[16.835470370754834,12.906626908516763,14.180580860475658,13.497327210276584,12.770923155658235,14.221821825473771,14.22566833037467,11.077396311889832,14.002412067650072,18.269491829348475,18.972936776990405,14.083444766960692,14.61505019861244,14.70608309604941,12.63017930876023,16.107679227399494,13.353905878293792,11.920026980430155,18.962784033824732,18.99402524138039,16.347549208584905,19.17255234197853,17.3905427636742,13.547990209490244,16.928179329787525,19.130314072400836,16.307030706984808,11.041509495465512,11.232691200931722,10.606886805129216,17.615470873550365,13.820532889295531,11.388939484088414,16.99749638138283,18.58667088842746,12.945879379995862,11.416748809187903,13.143570102529837,15.104062646691165,17.503720843452772,14.151672961814237,19.60279793215424,15.015258915483017,11.823486697811854,11.820533692691619,11.381887679412955,14.544555746216625,17.718852215567487,11.177017279172365,10.967843741597461,14.039901410023845,11.638078048144866,15.947777981529487,12.146130328459089,19.100317641259874,11.75486241237138,11.25464387376486,16.026648792836454,14.793104284684262,10.72824982170616,16.765594980078205,10.348960834389429,12.78956280782661,15.656911002827629,11.086637266678874,13.031408362215567,15.711104223871024,12.774646224102188,11.851832193382519,18.880198965639845,17.334621726172895,17.562203829717372,14.918592480590851,13.576875044761238,17.585233832930953,16.421660571641134,17.372833611493682,19.566224452313286,11.471563853925854,19.339351669649282,19.701540893308962,13.331414829815332,12.253958982083649,13.148647576479158,16.27852173532156,12.897785505026043,14.713646315800606,19.701058875317,17.840910297581253,16.478634322786693,19.31088231279775,16.958952113910858,11.018168726495565,10.563346113289017,14.609370657715758,17.109462950067734,12.280938323883596,16.850414125076753,18.532903965292697,18.080341810729216,16.208828063287008,13.371375217738848,18.94329801949088,11.402063564157029,18.951024559087767,12.281261005692404,12.057445809740077,15.236001025766708,18.040428847967757,17.56092372563948,12.75987045828412,13.466745630815085,15.41592362143777,17.480021341032366,15.74445526249052,15.256519399292348,19.191827963984238,19.4177559225233,19.243625350478542,19.166670839614746,15.924780179242493,11.438387107761498,16.990114312881566,18.339685081308943,10.071185390660428,17.36412069511963,18.290200071236757,15.728569710236748,14.142886946453576,14.468751281429208,10.160736800509513,14.595879053406051,19.248510587586225,19.301274262136676,11.413181252105089,13.01054789880885,15.059197526441896,11.40880511587575,19.796648622535983,14.903003941580682,12.84161295753416,16.066650720054515,10.207216147895936,17.971367617384296,13.571306626145665,14.945569104161544,15.456408497182414,18.890496700534097,10.262414535063048,17.584290500054806,14.552721696066824,12.909992776132146,17.278264952287437,18.3432036198896,12.796122743150185,10.400963827414195,10.035125753944708,19.059902374303228,13.53639606596106,11.087310716926497,19.976271625311977,15.457045983762383,14.06104038145801,19.713516828861007,12.119376929450926,15.186829437455858,14.07694559987327,11.456461404724994,11.6381637309032,18.317069932669998,10.177192334642488,10.539860717296696,18.034847934484425,11.772730297587321,17.181393151285324,19.957013017097687,15.42550064600858,17.114444513682688,14.086166880739375,11.498420304378072,12.621881241052535,16.62434386053075,11.887738060543407,19.050272467793157,13.904411049820721,14.827674374607906,16.69164747960557,12.748939147081744,11.053305895449254,12.366411249882068,14.467819738395866,17.358103982086625,17.66070639180083,10.346782950931491,11.38114591583002,15.24109126681558,10.223993270776006,19.387245052222852,12.191251343825778,17.947463274354465,14.16304552605553,10.182337077159548,15.6314434082939,12.244426856100443,18.90697110146779,18.88226230031445,12.524709672027567,14.220441962554629,17.82549202041306,12.33020271505235,18.735137939802705,10.118409554805542,11.422452945630667,11.864196639582023,13.955826152726958,13.05137584551711,15.21260818987271,19.77170991739779,15.841296533514068,19.469135059062452,14.478803981204537,18.795546673902532,15.206519832745782,16.613513268205168,12.976616300861748,17.476758650550423,17.210942447149726,17.18144178884735,10.31158254273458,18.227045960270107,10.717799660843383,11.392496602079321,14.768301543244986,19.758622249147265,14.317163704918203,16.594313116990232,18.805109071877517,18.176111565406735,16.265268053662464,14.256887603286295,19.148585746873085,15.558608683046069,19.41705710066056,11.294711121660301,18.54674954421263,13.57312802844445,13.538442815113898,10.467369091044667,15.245489280666584,17.896431745365494,18.5876290702977,16.794494787123845,16.767981378094966,10.642151998968554,13.325369388996668,16.635067324202467,11.8799507540008,12.872415116625202,11.04069900666737,19.356992598962997,11.271230835320921,10.560858641117871,17.68543261298747,17.96159178708556,15.446022378141803,16.54060624390666,15.938518889779099,16.707449552625704,17.703128203755277,13.522628069275271,10.043178250611755,16.34533680315564,13.831780194803816,19.500207883517444,13.833513419940715,15.852050849002921,13.371646989845159,19.486082482249955,12.273288647443287,12.729483057307684,19.068388624569053,12.420084198858481,15.356651547225946,18.98055289129075,14.32663545258796,13.532090336033738,15.433377852064435,15.854145153661648,15.936447652062927,14.859901754299475,13.026335439003681,18.21003664132967,15.124256378775552,18.847756652212944,13.40752004980149,10.763578861792825,10.433171939078507,13.238576337076367,12.56904081742019,15.598551620554183,17.477750699518378,10.509251337215716,17.858533169601944,14.837118608247055,14.268326969731353,15.030964869414337,16.948114956603977,13.330210566290273,19.742231347255647,13.283716386934742,13.010215566859635,15.502597166880982,17.763637111043202,17.192119444465646,13.69470546983586,11.133370545849594,17.19270788457423,14.987935615056493,14.284163428086234,18.417619578547395,18.317584590914805,17.39518218148292,11.81421718988694,19.30972488070263,16.832422441662985,13.18306795417174,14.862922491939642,14.359905087032143,10.009733398230477,16.246727239632328,12.612967202978203,18.14065909130828,10.001735015083685,18.416512562181232,15.810758212859344,13.133466828146709,15.174566788453363,16.981265162142673,12.631815760088047,14.369376218055015,16.512681276747266,14.17983429950354,12.822867737591679,13.092428805610218,13.533503157561091,18.804914478615505,19.405136830809823,15.42985518683545,14.00067165461458,12.631248422266859,19.724268458136695,13.838626098782372,14.443159151889418,17.00364131402698,15.630591205392939,15.27803896023503,15.039037503641575,11.903442027683191,11.501628993107381,13.908111958929055,17.92619298455478,14.626355444634617,12.01284750247269,15.120419689751998,19.947603440973012,11.1767096598047,13.37148668797106,14.684674010322873,15.835117601524058,14.21386903826598,10.817037068532816,19.32791286456958,16.125836171971805,18.487211633553848,13.086549004247797,11.67676757591156,17.24442760408734,13.626934889694006,14.329640579309249,19.125103646002835,17.200091625458526,16.273641607486862,12.551351531236223,15.669886609114442,18.138170720852557,18.97561636167163,19.970384209786875,18.411803689478326,10.727971596441776,13.68353765094967,14.1634084295319,11.886333011222291,14.912210743241662,17.305839557626168,12.192206854691337,19.432760617038,10.68765655956922,15.111285910999497,15.129491321506423,17.135375446090716,19.804404065459867,11.304175714953642,13.657693914661373,15.80524277515715,18.216639232034016,16.820219576281,11.89959225315534,10.596100795434342,16.173964322406952,11.112314642684066,18.803633342400364,13.77392123846668,19.747048673293115,16.66637500869087,17.512954286862843,10.12857583177816,18.761390584157333,16.287750437374285,16.788863449737114,14.581715693069906,12.104880273223106,14.910721462231296,16.935902600146346,14.700068988687775,11.783847846143317,14.276923309127717,11.700019402004337,10.878922981497256,15.861682486307863,14.210694417698054,13.423595300571488,19.2807793357441,19.293814744115885,17.936623228591245,16.222167821415916,14.563545702236658,11.376839321676645,14.207265176754067,13.73047415921298,12.631773199940898,12.984199259638329,14.808493319610905,13.453085075801356,13.14913518881291,15.002032887644607,11.902476710629532,17.92408505973677,12.96767325520856,16.042083505519752,18.71781857746062,10.800274351724058,12.221150571033784,18.925881641874064,19.799632509428278,12.902704960480227,14.696065242847746,18.34832939062066,11.714815396627628,14.679222669033184,10.217604842943581,17.255210993288927,15.531355870154274,11.111098234687294,12.621915053818125,11.462044095674484,13.604578670457625,11.138083158199848,12.10193883535741,11.903869949769152,17.83013176217879,15.412867496509268,17.42434169085609,10.569562696125018,11.647728405311106,19.182044632388074,16.412774622638818,11.861676350008917,10.9940300526611,12.167435625054255,19.60420102207327,11.933881981934668,17.763848140390383,13.81120752617856,15.588865317862545,13.899992830477252,13.476480016797987,11.94825868518066,15.516296666388595,13.53858753842685,15.859840275582203,18.806699665359996,19.143970666304483,18.915914017022683,15.8640472681941,12.105776094428698,14.722636882291075,15.586781444771026,12.959598381162765,14.140093012154303,15.73900632918831,17.62318573737157,18.43919536876604,17.940209134828706,18.975271770090213,16.346839635466907,18.82210564138676,14.484889224621655,19.533578676128595,15.908504196452736,14.26296720857759,14.790663256091054,18.69982642271315,17.145025092289547,14.147220982493312,12.53408992500097,11.42888459353131,19.1890255866626,17.451186337485346,19.232076526243496,17.256353918513426,14.367869530859391,17.045773810168555,15.18158251110017,16.523580801623098,16.05821742992707,12.414914922862774,15.19208604526212,11.832763581577785,17.4166478588212,17.964149492923163,18.761880040159124,13.305618648959436,11.449688443699493,12.344231121917433,14.72863257423353,14.302273127996813,11.234360501605645,14.420346143450848,11.22737894914665,19.688184192703396,10.355371714780311,17.594771648268,18.687240988566714,14.350077373850239,13.95080251296229,14.258004365852361,10.680839009043737,13.400735283561815,17.211984906339964,11.287774281906389,11.792958407233595,11.31960610420653,19.568054241134774,15.22507880899177,13.61432601285114,17.36849733881131,16.78343222162682,11.091818213923467,14.601760651768716,18.907084633288136,18.46527726901724,12.999894418060682,12.410701008712106,19.145026587206964,12.753029993027816,13.914805818895138,15.842338159892517,19.439920130309424,10.419420652632478,16.95565997079216,12.466714517689404,16.66764181872268,11.353279311848222,11.533860991776383,12.797932218711054,15.066912789759932,13.337220358300815,17.663736850520003,10.130901096781638,18.71204118544593,12.640733177612333,17.95690823095566,12.793165602858947,17.975510203130217,11.63616231263239,14.753784606233493,13.913093252876376,18.78179831148449,12.243357359995603,16.025613382089247,15.014331935804247,11.18653626336615,16.9742263663003,13.271403901177932,12.467760416998638,10.001340639418537,10.747791728952187,19.6996690790289,15.30249653572408,16.22709220418879,17.58355383773257,15.779865755914077,18.797010079827015,10.598389870119995,14.993808065815662,14.510599536494126,16.87073372538156,10.415528527301507,13.682423649041937,19.680866535255465,11.549838578193391,18.91513111338852,18.944691068291455,18.47547289584869,13.945546405655648,10.408807505692542,12.170651218931425,19.984662323351632,10.132898254027701,15.434749659131718,14.156402929664809,18.51998396553683,14.079079041601636,11.880939947324865,18.34731646077953,11.620484668394823,15.76575606940178,11.027268899444033,11.958662187200657,10.999425876811042,17.76664238711117,11.483213017336098,18.129023621803697,10.388131613892597,18.082874260368,10.416814913890153,18.57232778256994,10.37540770931493,18.137583568948354,19.76935786083734,16.0905265337585,14.555277142952308,16.282896428866092,13.422478731556314,11.139258165164383,11.5749443456809,10.648305678904762,13.654927354923831,17.92642183008381,14.4681677317151,12.528354102914431,11.243339743105148,15.736528984187238,14.21647427544097,17.619558154231296,12.756521576366017,14.777951109393268,11.410863816148195,12.782675450004637,15.065519352767831,14.806047439514558,16.686375952777855,17.322881325467137,18.197431981096745,17.76219630319346,14.87701192262547,17.546764904237875,12.173942589539191,18.665052323037155,13.682823305489196,17.99836805665701,16.68299765430008,16.40568143645366,18.773389967972587,15.807356344328536,15.99224987221361,13.30894382046603,14.628006784341421,19.947489543421852,18.449843019283193,14.878809015795792,18.878835863346193,18.130760114466348,13.636436044345029,11.087973062158534,19.213391577444547,11.007370520570483,15.406639885629767,14.729841060672488,16.92995114959522,12.036938861078923,19.16224172777483,11.889759698932403,17.421599788035778,11.77390621840692,18.688820404358204,13.163040108077698,13.161370683093864,17.474577104519255,18.79449775202018,14.532655849712041,15.549052834540742,12.287282333771067,16.42567960398157,18.678158107379716,16.667400410433533,14.329895865515223,16.21679955554407,10.135993966386433,10.39645050145247,15.611255130061314,15.56608939863928,17.707905538520357,16.2980866661293,14.961899405239796,18.835149212499395,16.487736434510804,12.95149345117692,15.779693272697576,19.18234235686959,12.307051001642256,17.120942690657838,16.545076932095284,10.020275735007733,19.143536202470038,14.372532824781954,16.913759640898512,12.224431610296557,17.24791306441068,10.031589603149078,18.034860871213503,19.976771646133944,13.93995451798591,16.853809398438475,14.921925963467231,19.4274141551351,14.798175687691481,18.834219031153417,14.858882760533362,18.94289803448472,18.212256716508932,16.144321924679268,18.788253200898403,17.542503571152135,11.84660170462899,11.172418241348085,12.180621484630077,17.073746928281572,19.07528220318973,16.20941448517153,19.233884508420687,16.08704635760289,16.960747724817047,19.44555222766867,12.178875429999952,15.952391710853345,17.153300999214096,19.564957290169097,18.027721943173646,11.291656231547725,18.659351263332177,15.191136365392296,16.78205987583343,14.971153163331739,12.231666279042038,19.399044702804197,17.78883940970768,16.581161523924855,17.11914488777598,10.538162046078183,12.932216040917389,11.817162019414207,18.327202548394812,17.917743631984,17.46365340781738,12.59663525435845,17.55624449046958,19.106064982059706,10.952607181536022,14.010643114093547,16.722668343973147,15.219297268374754,12.064988586245384,10.577559964111941,15.889382905489075,17.31483089285284,15.048118224368356,17.11581191788323,18.9391854498665,12.907047072639916,17.13180577858117,13.360917114213839,11.951969078084135,12.464406960657477,12.0655008476837,19.36790528515425,18.533472153823563,15.271888365630888,15.013893988408187,11.65213446851958,16.935037115919727,14.321975543320534,13.349630211006628,12.87747522350913,16.19312672483746,17.62916971802366,18.03739711095116,13.745507247220823,14.263216218082956,15.040074883946964,15.330179434649072,15.771997325602245,17.145917795006063,19.540687287437578,14.812811489333196,10.929952724201497,17.114038986790558,15.3062457537402,13.971593090938706,17.22280482895104,18.75232742400714,15.096053392028615,19.831763716435688,11.088693744298514,11.197423677404842,11.360060896790875,13.129634059762738,14.272343421391904,18.014609002628056,19.84529523755698,12.962754150344452,14.493089836251487,15.994174369403513,14.731766756233135,11.120870881696428,13.106887131058567,13.72756997679916,19.974712221393574,18.16476971913702,13.652377284627363,18.128582786565953,11.539768465954838,13.629470928780016,15.610821246708435,19.336676707850735,12.708904322060901,17.355016828242935,13.154587756930853,14.098459006317087,12.468220272055808,11.077311080517276,19.177952609439913,12.914342986812633,16.64669438711451,15.230415611949246,17.161056826093002,18.285874768668798,11.198108985816017,18.363723615692678,14.93099130035086,16.140000574388868,19.09060949148735,16.310812181081836,16.3810683778454,15.113477068727942,17.288263756070723,17.77221240048972,19.15620660389824,13.074750504395636,16.755844729111157,17.396241732600373,15.245834951017077,15.77001276020755,15.452740550541533,15.156296018297864,19.884239438998307,13.640163112871956,11.019768989730236,13.188415178630224,17.33475645934018,13.36841916536507,10.643820495122501,19.806446089390583,14.624823618496276,15.905960360620666,13.173076202055354,15.337011522312585,10.318913586718763,14.654327401452953,13.382985585051564,10.950524596819207,17.376725209483368,14.137370321858963,13.498337467463548,15.388114060600849,13.680891010686265,13.191186944432225,17.92369305149426,12.4446871823991,18.478325134327264,19.430578308194008,14.11852091937221,17.417196258103218,16.253880142864936,15.161990798102138,10.850246104658247,12.240069131342619,14.548443999815659,18.356385563423068,18.493667820909817,16.65107646180208,13.096510423146947,17.626686834353873,10.890921593322279,14.314402117396847,19.965109555303233,18.112731784245074,13.211974071240363,12.801933609014405,19.24488627912215,17.76140485352942,19.00963562597304,19.16372554191271,13.463023698636729,16.49348722249104,12.496847033344237,10.170263399280987,16.869202692760197,14.044262997181466,16.534831499152695,19.248763601676785,12.09509542346246,17.765386797138085,19.259221713995366,15.951474931843112,12.085507847087293,11.802127949526062,13.405013800406032,13.152850558358594,16.782607226810313,12.657052996628842,12.231147896306974,11.873875445646071,11.128290488208215,17.52391028393749,12.425199364965447,13.344730564565637,14.680102551440859,16.32390837606681,14.828668887236594,16.981269901255665,10.007087188586203,19.020530223156033,18.190473632476646,13.848983738722753,17.129291825874716,11.151981321725188,14.388655303547633,12.229694452905033,13.734675726910336,12.861858488424783,10.852447713809834,13.306000782523277,17.497918803690485,11.764386339617692,16.81384040035983,19.306748134988336,11.657380250648806,17.175814839743587,14.940020780092434,13.60552356164195,14.19856598419031,16.271908678184303,18.38931703502757,13.602681722308269,12.134977120180855,15.577360728389543,18.587511988682763,17.621253495736884,17.370060969021655,12.241089938892284,12.936153457852624,13.04302539777158,17.701073633403468,16.285058083405737,18.443485990083538,15.147640148633206,13.719289895983252,19.647072964310567,15.654693432528145,19.50612950402003,19.70555869593445,16.978341486712253,12.557273377388205,16.181165590426758,12.301469435870832,14.927866703836168,13.166687967569658,13.156898732398282,15.494775168465631]}
},{}],28:[function(require,module,exports){
module.exports={"expected":[1.5389310394967748,7.308210387806854,1.511165696265655,6.915193874988024,2.6342155787391963,3.1643799644441537,1.6065839493918768,13.0306270606483,13.918397778631267,1.3600220207160878,3.4957044006089006,5.162794496785312,2.435399513144752,20.194089026535966,1.5410397197325405,2.388272777328439,9.920951326295128,1.110908460223756,6.487562971975411,19.76902739119949,10.127955494469127,3.060199057898679,1.5169496231069521,3.3960353365868046,3.770802596333304,1.5913481092268464,1.2058337317774062,10.134044364694175,7.20236309104967,9.085540449084784,1.7044152850603937,4.227561990550416,17.446305229133205,2.6498922034673194,0.9072740866194937,1.7513350828969354,4.951017049824634,4.903857636421471,2.132234898326367,1.1322464020057303,1.5941919010734156,1.5657629053362894,10.374622461904275,3.3648543827234465,2.0316697388384823,1.4392270205464084,6.704247604290775,5.417280375624571,3.2999476057542716,35.44742132052277,4.503177780470365,1.7388270893255313,3.5909829792908914,1.908696441222849,12.117092859860005,0.9465684017610189,10.860969470471085,1.7215070161180643,3.7160275499684086,1.9097576120487658,5.331584956656739,4.86640379279178,1.8209316990724413,1.4727779108265853,0.5191030933109763,2.298506917184994,1.7557304650219354,6.014163992256439,68.57695892459722,2.800020501344111,1.6484242837236895,4.459966414650494,3.22099813378398,1.2560676210322532,13.354320084530219,1.3310097572452733,11.288724813356215,2.632626481568365,14.009243376679896,4.212834554605135,1.3838111854721418,2.463900962537209,12.8216206814861,1.3033567968951523,13.538378967795785,4.20270079457737,5.336864055542787,1.5099587041948586,26.588360576441435,50.40836763069783,2.448478719191296,14.381617491948345,3.433420504706411,13.571251978950029,1.397148859107429,2.1177347457149835,0.9898380506136287,1.8929147708800274,6.188027321212118,3.9796035458494607,3.310813976858468,1.6568207127807875,1.2870321574439127,2.6687773222184146,5.792389485321201,19.105157124042595,1.6233249922047255,3.7642303309917535,6.548273666648622,1.5132742747796422,5.167065780343736,0.9312885196397873,2.8965727724202153,1.6693094130539274,1.2110516423753417,2.929031269587859,49.36215359336135,2.092303518467775,4.414362901356173,52.21703860863423,1.9993094011398609,1.8650208700123618,3.2772824718433538,2.7933643199280045,1.6847036755022138,2.09476802708859,1.4796546331209663,5.687239391609955,4.658422590182259,1.4176853855818858,7.08367747236122,1.432666729029612,1.5786882554863433,2.4841277296740496,16.604004848913767,2.0515583972424296,3.938442111210513,5.7121933934813445,1.0368460611694486,2.565174236178776,1.8956771745617875,1.43952825544971,44.460363599329845,25.82754573103617,10.386941932668543,1.9185197888885988,9.741707610306358,2.330500364625094,1.4205646406374794,2.5478645672581273,5.936624855018755,9.488091457101138,14.169430192147665,2.397820390362459,1.9697459267017225,2.9767392692990415,2.860052252509395,5.02552247111031,1.9875508043692314,5.331958074022668,1.2935133238749819,1.3631249291721366,3.0301738371499796,2.6220969371998812,5.394425081334673,3.4718326835560336,1.6918996170380596,2.4290440677165073,2.021778688589967,3.2014809899370515,2.383649053795274,5.44142989395262,2.9056107468218886,30.088463625651343,2.3884153477083174,6.891591001196658,10.8177218763786,57.82991449580026,2.138326180313247,4.098913038331814,5.039283026838217,18.97707878562158,4.210824664231419,3.9957172932155576,1.9904250424966963,9.68368198092736,3.706742790868261,21.954006972989443,1.4805848417765592,2.530186815019579,0.9714975897838566,11.373754536874506,2.324993644374425,10.383849830667145,2.01430785013189,2.999559194767663,15.956246978420399,7.169424282607814,2.9135073819320274,5.7622637932900505,1.3336646468434137,7.199848266063194,2.053261931233625,1.6803724130950088,5.50135875537717,3.346741344022383,2.514082325300537,0.8855286676940438,3.431924151800315,1.6585028764754246,2.807672008212854,1.7427771194220516,3.0554850337886132,3.7814135436910687,92.93363234710823,2.484249664042398,11.226642890766554,5.063615825464262,1.3385484443519287,3.560925934349806,1.4951384521169369,2.4806664562077905,9.021800841962454,3.9020890346050137,16.487274241383766,2.514980825479381,1.578793579770474,441.01540895529826,1.8221086210446638,7.131597960914625,1.6581710933955844,2.956514285027948,84.00634345664622,3.773892535696442,1.0551220361673224,2.163470094349731,3.9627696906111534,2.4893179620437142,2.4879775303092826,2.959487641353809,1.690845496684837,3.636318839810571,5.509681532804941,1.1595617046738145,591.8598384455311,1.265036162342065,2.212105813914497,226.74289256525722,2.098818333212014,1.6622638650928625,2.5746054737455304,7.786021588356328,35.58386673519796,1.8535845731241933,11.612603267508439,3.7547956428504077,4.011023511210086,4.5235955486997055,2.099303923390387,0.6290750537164566,12.763273207340369,3.307615089939302,2.2029915613725537,14.406045474406374,1.5343819779527184,3.7175626910553374,5.981821794281138,1.8612583203471513,2.90684316935776,7.61936939109504,1.7073847070705632,1.1488593804620633,3.535162084207706,4.780636970755846,2.8666167099530986,3.303470879746915,11.807774503496244,2.2448671403961,2.9798814912881784,1.5827068121491255,3.7145215682353476,3.0824772523985846,33.03098627248732,5.217650142281871,1.9055229373829063,2.212305153251933,4.3054731642297295,1.260224426378685,3.491898093687546,2.588534347268779,2.44835891263246,1.856870443117637,1.4218060574435274,3.856271399920013,6.024617292967236,4.556592961887436,2.8907729440841483,13.0316978947552,4.078944710870772,2.1042585313934503,9.847093751330492,2.9356561706468827,2.3492833914739695,6.866227039619493,3.2044223468286197,26.813845508514376,6.301185826538835,7.3170536859079345,2.480836880328589,10.220332289838193,0.8401406034424576,6.255115518152223,1.897906756742886,1.5736931306522046,7.558273635548698,3.2580289016891766,2.0189488967420193,2.8286109378998026,109.74458872361795,8.726529573290463,3.8173362950236873,8.884338834008432,4.054966725991403,1.6435939135161246,7.983997281332118,2.6286619599464642,20.72617155096902,5.4606390762739885,11.962765725761242,4.748776455523427,1.3822553903078665,1.7221329932717622,3.8794102785937907,3.3325680346362634,4.250287911542165,3.5022963282825406,3.0454915766761026,4.8811907779737105,15.386315171322009,14646.98843307672,2.7551070168869094,2.8863753624490496,1.0590025072225806,1.651600309524075,1.85005650796998,1.4367921969107265,8894.063533755081,4.359924439552917,6.209026923900389,24.53358101428649,2.1737921170222223,55.79326338052574,32.98314144598689,2.3712476790307915,1.3694801933936431,5.664040202563994,3.015559380848983,1.121779794526801,2.7172173704295832,2.94792972550089,4.089907029798779,1.3648351219699926,19.31801869112346,2.2753328518912737,1.8679680174787663,7.990630493146055,5.415091239652136,2.407464030233934,3.015214268799266,1.3901152223725552,0.7143620183688001,6.648972848562921,2.4946375755949086,4.664905947390522,7.014599825419816,2.026299043167856,2.04843984439038,2.273439893584328,253.91107029043857,8.346793379810517,1.6076102301823503,2.6024087969420324,9.272764729482144,1.6279100457532392,52.63757761186793,5.193695037777397,1.012728299740006,2.1980564327524497,1.3873408877660933,1.1442285427189494,9.627228318347358,3.6430676573715752,4.642912651651085,2.3372001491464602,3.5681584798718338,1.5622859355221128,5.96101990246987,1.800551355456944,37.49687627704314,4.0875036292463305,17.13240921082922,33.305673199071634,11.70354591225009,2.6226772664454012,4.563983811798181,3.192456009058322,0.8938958821913593,12.706323829846582,1.2698139304767,1.4724238816989719,2.123745261283311,1.8555713378981191,4.166004074550762,1.9008139434412006,5.120491721005796,1.663619558914064,2.0742724877658905,2.3060868729844772,22.93920431384258,3.3769400560626157,4.219084673594418,7.347118997794934,2.045620252070053,6.635368516369252,3.770095937878124,2.578584253715388,2.4568655170869453,1.159436145810042,1.875678033117171,2.659187190794068,8.727959111224973,6.882128443005279,1.5575986850915557,2.797445195048177,1.2384137916890952,2.812756966836032,6.645199676308252,2.509998693613131,1.8143435243377843,1.5452767386783712,1.4543507484961873,2.225432209059773,2.4668513419236784,6.254699225323232,11.634146504273128,36.44985823320365,2.9301566649765083,1.5531439922070753,4.0603344786467055,26.463330902974576,1.5611123337613946,2.2933927494831488,5.509440125364548,1.7978656183707207,2.7353876985617154,1.4013866359299407,7.051612658796765,1.348714820088252,3.114867372778904,1.4426738467864415,5.334386563382234,2.862014185021288,1.0511781050620232,1.1780443733985744,1.596523641429087,0.7941235778226435,1.4386104374263267,2.507495219780042,9.781568195225327,5.735738044762341,2.827089231923764,8.046202119584796,1.3804895929231278,1.5959506769393752,2.3575332433168645,4.136535172986605,2.5526909846949457,2.1331072100426782,13.322679396497625,3.351896226048754,2.1461139024345326,1.260327968048501,4.72166383306173,8.515110379262753,2.8525107208293665,2.7612305113444022,4.485905310991633,3.697086469408667,14.331108152761157,2.1413664309911296,1.3407852057884702,1.8937489732290447,1.9457135990553565,4.370814988432802,4.663640948937668,9.538058631057934,8.807728770668415,2.869768156413306,1.4137413071159195,2.4664801823445544,2.0051650258288984,15.068947019585055,2.006930170102653,0.9287629577261858,1.2448237196510887,3.3690006833503823,5.396662879438003,24.177431288833247,2.2824182161434017,2.589962784279824,1.2794756340784794,3.0647108215812797,5.057362979186365,2.2619086534401482,1.3857697558719575,10.915954678877082,19.330125736621138,0.4398231091309642,3.693587738718101,6.086905698724721,2.0435202353714255,2.430565833106586,1.4845974027381903,1.1989092247912219,3.507069257308342,1.0916792954014147,5.702415936866835,2.023069747689508,5.322402248320978,2.180498200099776,1.3909798361077959,3.285963799667208,1.910083216865877,1.505640834481752,1.8456167070375005,9.580629184605167,64.98046392535873,1.8351762662953839,2.888415852362858,2.420115364634701,2.8226495253536785,1.411654686998811,2.3084183775700837,3.820583282590086,1.2836759847540749,0.8215524245193816,1.155066104932935,1.3159899389984122,1.014263881745713,3.7802456818746157,6.7165326794159705,1.5401088081485976,12.306184286928346,2.0178230668851724,2.3629075442769643,2.691852410917285,9.564160692052962,24.790248955512823,6.421524584697126,1.8468148857618967,4.7742199796568965,1.6585124286525619,34.298271891197004,1.8272765617910316,2.4284659857749893,0.9173958439471912,7.083578534741635,5.201156618985876,2.9294192134726385,1.773872116885518,3.9902238913363184,5.75333780711662,2.4674403784177845,1.6520871178923178,2.046078569339918,1.8259738949892388,3.12972890779831,3.37807768342581,9.176676820207582,2.518468766227585,2.3649064101594655,33.776787093146694,4.334848243348522,2.0608460153080075,58.35248507864945,1.8590863418985883,4.599776965108803,13.32590125816708,2.741555445675874,141.99373410518274,1.9169192445692185,57.81011161822442,1.1061969234156714,2.0818951880186725,2.3357514139103603,3.604462846428034,3.719742008709829,1.4805324829134272,3.3554855363025125,10.708381311695296,3.6233723045980333,0.9509395390295391,18.83273992263704,4.056044118547148,2.336340689280278,16.789687009362734,3.65038234610753,5.607053971223315,20.567085883754334,8.81727147369069,0.8964110879113703,3.608552286674695,1.6843641732906038,4.087215953359926,1.2589793938281875,1.361330904299478,2.387344081757086,4.698738731962349,2.381885181479655,2.507533719895527,2.433578135902141,70.23996537225048,4.7559337851884775,1.168902790458437,3.9566480039778225,13.861079080831752,1.2444738354721816,1.5622741323894913,1.7026421209798146,1.10167069012317,1.7436376982435915,1.459394725999557,2.0664603859731923,2.561226736122214,5.739236199734834,5.820408636427727,5.5252147845995285,1.7896399785681003,4.058967704614832,1.9083876651493865,0.8380257800319395,2.029773355148787,3.4715764075421545,27.197343103517348,1.2127798032783539,2.221217593775623,2.0504597296353255,2.5396111361719065,1.2801845847925124,1.2864758230467364,7.077518057685835,4.073613943052849,1.3059945756948241,11.877391066741925,5.315602541550536,2.1284214326966735,2.492946096160151,1.155364552940491,4.734014241196738,1.2163373583272767,1.5102628310999833,1.9545900843175539,1.5872547322849182,2.003119401733513,2.289710760602377,9.482999730619305,3.1890368126934483,15.851267119061669,27.433199702340204,5.304574955492354,1.8128001924578991,16.202258163617447,1.4402674714218024,4.663857306582204,8.974785727772547,2.1675565976466316,1.540778184411592,3.2325345518601925,1.1389807848041797,1.671376833966203,1.1168845472889388,1.724053239139225,1.1776758796801265,3.0239966364299318,4.15971440077299,2.562910684035757,2.7867356881810403,3.1875195503883793,14.82478579666019,2.702444885986957,1.9469339155345813,4.423997384611651,3.1539533317498933,3.1944610359402024,1.7513873473307355,2.1205776362393127,1.35912943555218,2.3058309634367493,552.1684916023429,2.3585556253585667,5.2297308095899355,3.5036471362880666,2.608899832094166,14.567729501010616,34.687742209689034,19.089995763380593,2.585922658168676,10.620639241473134,5.543088185890201,1.9885890215733821,1.8617496932448334,158.8839914741061,2.457485709032341,6.249780296190212,5.44782331481421,3.7907903736961663,5.710418544138227,3.272758950179686,1.0855046756087943,5.5021336935196095,3.057468296636124,3.351987329299603,0.9798816291620054,3.213734581241704,6.092207563820055,1.4713370467596374,2.2461109254116254,2.5722038642557252,1.3937799229938133,6.0622722778095905,2.366714127460313,2.958784262631431,11.888363748744117,3.541721000607292,0.7167660846715977,1.5974238045442186,1.030447125019908,5.04498982306154,3.3498136421367297,1.96495924621511,19.29933779735613,1.9784485248215784,1.5308864761665415,1.6116731391057268,2.8624460876296225,137.69368945312098,4.008522004083681,4.1701493860641765,2.445118715699647,18.15112018304674,10.53347442617742,3.1429366960575824,2.5850726712178798,18.581851524943207,1.9903117849065985,1.3707814834748409,3.595916810941977,1.0548959380549499,1.3457896070962343,6.195436154042926,1.7298936408235341,5.9482095395499055,10.952100165659694,2.913381064206635,15.990017619125723,2.2458058449015494,2.3283197859904226,3.528268025287924,2.0733031630947334,11.91001314747363,2.2533962793063615,69.48524139281767,5.965901114345783,2.2475927554342734,6.78225045989778,1.2020085076057203,3.1945951846068685,1.9988882486940114,3.6279915903768782,1.3646360895263048,2.1384775931476705,1.2668962625758036,5.3140944400994305,9.526618698971442,1.9949357597551727,7.474521938813257,0.6236426510242394,6.049581953286279,1.6866792082290198,3.7352426841474946,2.886853730742789,0.9658835115534286,1.4017591793962743,2.258766872807535,2.2704495550919064,2.476748491412067,11.2471170449048,3.6221592941741623,3.3794000239293953,7.07029207628736,27.547382721384135,54.30274913221354,3.180914256209733,2.3533222908443334,1.8755608781353947,2.656782061858268,2.6250760623368277,94.50293371097439,4.821416676546151,1.621001246701995,28.153959851723208,6.450450407108084,1.6315244908273592,2.7763311071156394,4.071024340723674,17.449259286309104,4.94183636775121,5.683163395613618,0.72070701544173,5.746901181417662,4.740144767237904,1.8695849888065776,3.206709687151757,4.382365347686655,15.250349101007798,1.5261895507203938,3.5121895588804413,7.310586442394861,2.7112488003723474,1.754090864218676,1.8474089642060367,1.3588739119654882,5.243475969972552,1.8722816572062102,3.7058029787209064,2.7964034837478167,2.412868023676147,0.8004675801430675,2.1808087235018423,1.94331216847749,65.9443357352607,13.047268156150832,1.596111491632514,3.2821648558928582,14.322169350736429,3.13517960213069,1.3452271077054467,3.0512770220976786,7.847397131587197,2.9337145571554837,26.557983578803544,1.7984630775808927,3.4457944169049552,2.6233681540696794,1.8254304148764193,2.219183661787684,2.3057958361557445,2.784218323568462,0.4854830438360822,4.683794227226359,3.716296013362085,11.599466743275835,9.361112959987961,3.185116184970326,8.383538580410011,10.976712580508412,39.88600423884447,10.478601217880398,1.8642813835968979,2.836112558100498,1.8134591800419626,1.730209961314456,12.540320437254897,10.731604433865899,1.1690503646941846,1.48603064574226,1.435140369564091,1.552030838272656,1.5546553228290503,1.6471234747403651,10.561106815813678,32.7707066584404,3.651648212610593,2.0577418747615326,12.535893854365636,1.43355944896465,5.026934236637468,2.2775976857097913,1.3479062828589417,2.1702688110959505,2.553729808943686,1.4479354359018919,1.641817384029057,1.0680989987974383,3.394886076805467,1.6009001981851152,1.6190717889225843,2.2263770369000357,1.8001208086556115,1.3400384842374362,1.475443076830182,13.232439930601776,1.1530295767582586,1.2460805135406114,6.270245760231244,1.974085292883663,1.7703479014134211,3.9766602967353544,2.9924428700250774,2.0548532931793466,4.013965546575083,2.3152112995755436,4.450568801166635,23.917966773127986,1.9055906202179755,1.781652575667923,3.070411743341197,4.714890236377572,3.29672632954468,94.21902662310767,726.7616769262663,2.8614513774806727,1.1505649854496935,1.6311055674273032,9.691951889019519,5.353234022668708,33.2675983390316,6.053097349838778,2.3171245288071147,11.696768013073058,2.464365036730267,7.173855872349656,1.8667965970534701,6.471632373527714,3.264471864726034,10.036906773418423,2.1770397845145073,1.3993804985598208,1.2768471790551181,3.4253025654012834,0.9511056124154095,5.287695896726266,6.26289886161018,69.54917472091908,2.22197331980849,1.4522181852351337,3.7318365741768353,3.044880375615,1.398327386295143,1.943560071629265,12.227700079012633,1.7092351397190206,20.784369832808416,8.106077621757521,1.8385010644916604,19.257177986862793,10.295471502463993,2.949078181241051,0.8808989174821978,1.9126901246497503,6.7403369617509075,148.22063071650896,2.1674523462901734,2.018372398269669,188.58356854468485,1.9177556388934192,7.041102219915177,3.0104453591308977,19.70445465569222,3.4342631781115482,5.8475474381330645,7.9619040136406385,2.7791279800224733,0.9003338916668334,2.4883493135802066,1.892045041395734,1.413891578312406,1.522633529860328,4.561519517525349,4.526692933592241,13.531263853543846,2.9983341767944673,9.588670558907449,1226.5624096689735,1.175829728918796,7.958836967680065,2.496288037497071,3.759080843726717,2.715009118295984,2.607800186250516,6.206987781400123,4.698569992633202,1.8064149101187765,4.42166513057306,1.6106887688684406,5.624697170991286,3.0440666196224786,1.395395657604088,1.377073735302476,1.7076270303229055],"alpha":[12.35564239039405,12.76979705280603,12.580801808957421,14.491932524926854,19.18879643776813,12.06222743676882,13.377127357447641,13.490374614839089,13.18706063063418,12.5971779714446,17.927583381893328,18.53902158639558,18.130512259270013,17.227328930831753,11.760540712058889,12.969285851709426,18.574285867729408,15.435655095823744,18.692810024352355,13.488354979697766,12.872411077892494,18.70686576397076,11.619343089638088,13.579086571400147,17.8463879753912,12.263316137411795,14.547467771960871,16.823601212156532,19.459247058648373,16.27941040839064,16.405397154337905,17.127486876663156,10.273506049269601,18.580306573514143,11.990582109372898,15.25683490209439,19.356849290712823,16.380399657401277,13.860488738555238,14.164882470871197,10.50720948060526,13.80409256504749,18.06592119609193,19.782000905930158,17.531060599830024,12.750268665579318,14.510236193963621,18.036879984432918,18.742766430340456,13.58569970799733,11.900842598582626,13.650288518828342,11.526897514673497,19.434999835275853,11.786720030416172,12.737314467249485,18.78827596203149,12.610278789085733,19.260379309447195,14.145591318483355,12.36910318409339,17.749911955507805,11.486003298406484,12.254600409639023,11.908252393652257,11.235162929370322,11.068403298877795,18.660450357530944,11.51700616642593,12.816256894772074,15.080846053816781,14.754249163490478,16.201504667543766,17.802524928691074,19.174736743063185,10.653094840605917,11.072345875180552,18.249336664913884,11.654384952279921,12.425873975428184,11.685143535831898,17.713349124569348,13.394172779083648,14.774436374465868,15.952993956091358,16.02853190390939,17.875211850106368,10.454846821867799,16.08729898962946,11.297264265312801,14.820809649910254,13.188650429255762,18.75840857288079,19.523803757036255,15.412495630262974,15.028404608357754,15.175340903336547,19.84330560866789,13.479552779962304,15.379106223262553,12.789765894568175,17.657836364207235,11.074754201026856,10.877023060982978,18.230016196977743,12.917734808387678,17.509634268530093,19.087009424088038,11.711538367940488,14.075234507958342,18.247633923919928,12.173856518219752,17.687697255517424,15.288347601850731,12.756687401645246,12.280168729776593,18.391751110064348,17.057047371791796,12.980191332866225,17.502800140634925,16.293390757130197,10.352238715830408,17.96200154423714,15.683820058764233,11.363830511223242,19.039706352826418,13.86260128299515,15.861819527577348,12.99418310998059,18.219318774663567,17.48292166020657,10.480327040578697,14.704772163297273,17.95524837594335,17.51922069372937,11.660839649501591,17.344908488581396,15.842487103201243,10.745024919138029,13.649018252429501,10.43641672028016,10.806219660353323,18.813092342901363,12.7860998337521,18.227404694652243,13.539521406626466,17.531134923410658,15.850100020400777,13.357875617774365,13.415189064251527,13.36196460634885,17.308769743091077,19.9213869736018,10.167914891085317,14.119417145151127,10.801985860873522,18.018722249504222,16.413316963038376,17.90348542274168,18.229107103993996,13.48226657515304,11.723679141497978,18.37451249072944,18.466812270859197,10.253923340221382,18.109911389555066,12.624563617515701,19.779681939888164,14.886880116516162,18.42987010315551,12.980740212466209,14.63270043512944,16.238418326799966,15.079668014020719,19.684776018644527,16.88765547745868,15.22197541270514,18.318579136733995,17.2265676213709,19.992916304267457,17.858155398632327,16.907874271889703,18.670685912031722,16.637524608167524,13.090757079968174,19.832071886696387,16.881968046429538,19.377229512332086,11.050878471467566,11.222730666788454,12.508710511295684,19.673599943465305,13.275436357730541,19.622297534368606,11.74075100989805,15.93648743644758,16.31594719336725,12.55214979723615,14.322065561653783,17.163704873486616,18.53036698612982,12.417493157595178,13.625458417038379,16.585457064203656,14.40583937452308,14.482079645512735,19.21734854691789,10.008271855676433,11.970575416273189,16.60876413516013,19.42235867706829,14.7791804022264,18.12588263906321,15.231487285998636,13.85108481434332,19.75765020026365,19.24031111467059,15.498934420022168,16.727719935463412,14.865077010443521,15.64874425443329,19.819727857501796,13.962354054549476,10.553340119861701,18.75534556095701,13.717809157712855,11.116569549675745,15.325260687825608,12.779382828988497,10.392013027276834,15.609812020708326,17.600978278293994,13.912141103799236,19.41336453813812,15.101097299751105,14.624950622249905,10.609935894656378,12.081047076998018,15.684208096702413,14.843767456208557,12.875726498235716,17.600487865908516,14.30705351766203,11.129842243999175,17.052771101025538,11.262666676226178,12.300141497923974,14.378824107250576,18.21584943473578,11.65821162266855,17.397671091028947,19.905619376422912,15.07541550009336,10.96354903783836,15.478119849848625,19.529894284194768,18.576630684107727,14.40017387105659,15.176133837445025,10.592303065187643,15.173381078910769,10.236010320831184,16.457850395857783,13.276578297521016,15.60496460911728,16.37756505510104,14.700659325539622,16.116848899556327,12.399270813251494,18.558233825207036,10.052338564941756,12.72706659050783,11.641676620828354,16.99547575952086,19.936881304721265,16.204966351650185,12.17389577852215,10.239938157599905,14.737072905096865,12.702612603810493,10.719027896313143,10.216408249572202,19.143667416009066,19.934593259749057,14.787728852858725,12.976020519385571,13.897375633173247,16.45451609094415,17.83131914620475,19.502434592435293,17.909170134953207,14.565904572402133,12.80634471311685,13.131907767991962,17.734090842992366,17.01099046257564,11.813816466237057,14.99854961611123,17.82007643348778,17.836890473120356,13.202246658600739,18.61958426454413,10.880756491618113,19.81860752293715,12.95601022143455,11.441909322648636,19.95102702513613,12.512396527114412,16.90872760903268,16.843456173926732,11.034033480567746,11.772467114972123,18.69026886214457,12.344812637667435,11.408881753126796,14.008714823105247,14.74771984646684,11.143374766890302,11.97347855481567,11.483934669864812,13.340776425276662,19.207536648537072,17.8403813934041,12.925559149555976,16.246920553822,12.923517323874467,13.966451200557922,16.561740820718192,14.643382048990489,16.73349319576873,12.488581438034899,11.310626204822427,19.38856807922619,10.239554993013616,18.728187612705625,11.478694809487786,16.89663519258574,14.885866726200927,11.271588072008,17.67524534488441,15.74083488465604,12.796174085770293,13.343018966514656,14.631914705398707,11.59699914096338,15.650874258840252,19.31006806817329,16.17723132961713,15.734049912401069,12.788304561501196,14.79543355963848,19.0778815198804,13.16657171136708,17.744515646866148,15.027034649890183,16.34251210843084,12.853110955125533,12.463328260067875,12.097358500438391,18.333988436487644,19.660649644357925,11.149764183851198,11.469722533814608,16.787816174247453,19.660948498537884,17.9841608422295,10.762054881735478,13.317959719253453,12.32229381831154,18.80115275364342,12.113698281664467,12.908085076268165,17.272365155868627,19.412542146339597,14.763853034630007,18.97967917753418,18.823665117002914,16.5652924533513,13.288783605395354,14.629283028281037,13.183643891306815,15.416227373940433,18.69439311260571,10.843922833098958,15.051098291860525,18.36074765561864,11.013029387554594,15.073568437669746,11.218577533788059,11.435662042422283,16.62456114578788,12.580118953675877,18.05961730370747,19.23599219446374,15.709172595308964,17.189850762646415,16.501259085252862,14.84524106959465,18.77282283403462,12.834410272922227,19.928148998450133,18.163009061435428,10.499566925964668,12.850701385023395,13.05834312081656,10.13006349670971,11.14736930967036,14.718905555628963,15.748507974601932,12.744990065926668,14.791231636866115,14.384383604100403,18.550551073055964,13.92340367655121,15.988880357728712,11.961057491127756,17.316513263024753,15.778195242726493,12.12000191471522,16.966796398008533,19.73716656502852,17.74626805842666,18.58216590812617,19.32150077745875,15.658483881605248,11.85439561146731,11.394646171642009,10.459218846339915,11.871887276068849,14.419629858834814,10.451290595955196,18.39381921094554,17.265152162736644,18.592122900255934,11.34488087668386,14.607032204339287,17.23430853116862,13.73436008646162,18.826614487126392,13.89338265488525,15.205607456638052,13.738660865210012,17.580607770497117,16.058421799947,17.71154309330969,12.042474168289301,18.343412316911706,13.206334020973898,13.146048428766349,13.877341316934086,15.141989444226416,19.151347109563478,16.193741121992353,15.059255075760573,11.253026199108225,12.135243688279697,15.284303598281152,19.651043693149088,11.18457680594829,12.440171525620883,18.966088873675993,19.027987735891713,12.415712741394557,15.593362910537333,19.22488137538115,11.371391434262893,13.898855659653318,19.033044343825516,15.751368344914216,14.044777019334822,12.330284330009782,15.87079377835984,14.178530152377247,10.466625819990744,16.63517517588983,12.660614551043238,12.940512405828134,16.471643034966217,12.435890866518001,11.354879715326263,15.706465948154468,11.536459580777096,18.864579611767542,17.820191624665416,12.244858748910872,16.883322052389495,19.185977298536695,18.47716622713748,19.39285295312818,19.441814435519078,14.078418077344706,15.276730716470198,19.063627475641056,13.091302849253017,19.198121747461,14.792935026386447,16.970611194549537,14.63609509897287,10.260335058100969,14.048792985358638,10.217010668701107,15.630934858109406,17.041825435056445,10.628286051245418,12.692260495486611,10.074437566004793,17.670841866228322,10.899857534923532,15.318051046727799,10.438648072042229,10.090615061398733,18.19910594801932,11.491884877784235,11.589063915704944,10.981153156274232,12.849689987441803,10.339727875316083,11.230040241535766,16.524142136207267,17.53337442000631,19.23277681358431,14.930104034579934,11.822093654351718,10.488006840249861,13.314968426216629,11.743035227001993,17.459349429697024,17.19011220840217,12.999192570835852,19.571644112356843,15.761284713507491,18.24025173792615,16.848741197876492,13.557336814290746,16.888641436832337,11.548619289816637,15.249460081462454,16.55790447367644,12.64191756598146,18.496408761545275,15.58385382111014,16.72467835017283,19.826742070667557,19.34347039607198,11.273664259564205,13.248524641378122,12.936912857322175,13.05965905597227,12.561662163877614,16.281499864156054,17.16789212885829,13.722856657718705,19.20900542445005,14.35266705925371,13.43911863568591,15.19527063381695,17.130027334663474,18.95322065386638,17.15346534306031,11.521140488922452,18.61550992905165,12.209157087281676,10.777151524039743,15.943778747603275,15.04539040530792,11.216789997064618,13.43362494228532,11.770848917228406,17.6569842809185,13.65145120947415,18.250052803822147,12.596225887644849,14.048199827689034,19.946016285576917,15.332107578967623,17.032486102508635,14.831437639921445,14.306776354230713,11.994858602953755,14.545357378797245,13.043905351319259,15.369254445582518,16.86629505476303,15.300431410590834,19.670445125048175,17.117864536922518,17.019022995893593,19.128586025243518,19.034720366678272,19.239565071171967,11.030527184101238,11.341091667413618,10.205624482133286,10.064352271844893,19.297369093741708,19.62863588937264,19.330934985793352,15.897472602519443,18.217189877698345,11.167998690505243,14.715432866468188,13.932800514891749,19.35266814175012,19.63502191035525,17.239935054893415,14.25766239325245,18.76601398597697,19.064840972687172,10.233610257746209,10.876874690705927,10.62423305402518,12.37256138547137,11.74880076826004,18.221753972465322,16.887524381817883,11.171031406057775,11.767034764964947,13.372125819337786,18.348449589175193,17.949384412447245,13.729437965418626,13.788129531457187,14.957367782056401,10.299099670976728,17.875559104942937,13.251241645358133,11.885959291131371,13.50553120017668,19.448241511096825,11.694685157740249,15.446144729386413,14.174408314386524,12.465229851633723,11.795161850948315,18.76288767966247,16.82070254216756,16.96506227919771,18.095757758967665,17.38465106496357,19.460767889298296,10.667799186798277,12.26698190769104,17.724779478744537,11.223153667321814,10.714569851133884,16.494516723216247,11.779757172565999,11.635049345941486,16.229933570597233,13.05859537192832,17.206413172870114,19.084702503732522,18.914280436035973,10.792324350334281,16.498959420337336,10.54125939386373,15.380255550888773,13.302654831912424,14.534208634490646,10.96361724706972,10.778386570335394,19.46008980068286,11.796885408265503,14.9437283167603,14.426836928505836,16.222018370715794,15.889392168366266,14.616258197185754,14.789413627306276,18.30452042615673,12.141277943384807,15.251644583376986,12.098263869246006,15.826586409721424,13.82974344879527,15.354219056825098,17.757967847473278,10.398980923352685,12.649608913005746,12.147697782691537,10.011342167228444,16.7833558206643,10.015319018521803,12.232565925416685,19.36590166785027,14.04088415597226,11.760565597979397,15.181350769013157,13.795145760320109,12.711405158611324,12.615585188043802,17.90313048635324,12.27707648085924,11.44203715936997,16.466366681817743,13.451339257589122,11.275355505143612,12.008097890432381,16.92907862117129,18.059078262484597,17.401199653153373,15.634454184852789,12.934033324345988,15.488751520368794,13.70946739161665,18.09850423080782,13.531269146809661,16.87711636842764,17.97410604236756,14.807703018795078,13.50947381894489,16.397377247467986,16.194449883266145,17.5484059571548,12.123908181157411,18.852154088765996,17.434150578111648,19.82402094520988,10.359580267824956,19.485805141030987,15.631843670691525,16.5221805046422,10.63319435074424,14.633195627959452,14.681097671120828,11.830657969786504,16.950873426121685,17.08822426730552,13.227909597642276,17.34593140992105,10.472573296864526,12.2795748680155,19.82045203265205,19.9267631569316,12.398716839671188,13.09246185630487,14.234288297976798,18.811880460170944,12.163662746634794,13.81617926705587,19.341675260563,15.549040598988007,13.525066306370825,14.840563884590313,13.01322035967081,18.02657293946198,11.243023396217637,16.21342413005637,15.868518788033514,13.57356135446905,19.36766625347272,11.033782409119247,19.032930968229206,16.956386647891605,13.072170881085835,18.07952425556249,15.59655300454531,11.433576294624213,12.308189101704306,10.733524368527627,14.229270701675006,17.163036556619097,17.111007578136075,16.29836466807528,17.875615609719294,10.754478680552602,19.76399860372,16.24469966325852,14.745877684239815,10.894240786145568,18.42544136369395,19.481152934655455,16.104015496758926,10.010381191360608,15.636312378513429,11.295816563342346,15.681725249534344,17.583677808986753,15.664094501336885,12.513567863927538,10.187487396701583,17.274906195434763,14.529515731453298,18.24896159644547,18.285500467136337,16.070552252790563,10.161450557723626,11.515001560458355,14.776213329393581,14.981178022401387,12.514413050655897,11.88549795492256,12.092204112941229,12.291411150327596,16.361609195644377,19.4195805950457,17.608307926595153,11.103782161761337,19.26100373231349,17.25404367987231,14.832382104212584,11.86155503308224,14.421762631443972,16.60286523793571,10.122756669954168,17.855673220219437,19.44663484478653,11.730224056368453,12.95750884785749,12.767208522457521,15.549365301597074,10.009681972222193,16.359251446947837,19.873686606901266,16.147405608665657,19.89587278653603,19.914663609959298,18.052686661183177,10.63476538831699,16.134848495422276,15.86486143579993,11.572881752743596,16.038246282117335,11.309329943386215,19.299224469711856,14.350756611730853,11.417038369232401,11.262988887275549,18.76443051969119,10.288151848960446,16.34245902721282,12.975299309756519,16.917117025685968,11.670302578392409,13.77988762840279,14.395349637455295,14.525458724758721,11.19852116290227,11.671271270233268,15.551503953756168,16.967944111677653,11.536837397792517,13.194357666388916,15.122272388108659,14.279379671654349,12.387957823980692,16.07154306656184,15.723980715887977,19.541413628977008,13.794930544013702,14.111790091249565,17.186527630285887,17.319380987770856,17.9842490988669,16.927490623754842,19.204537354066176,13.08403552302943,11.151941720611319,10.00912382096443,18.408305745735657,18.53398584402099,18.694723196584626,19.62046602320523,12.927190933478572,15.11123061947439,11.603047896848185,13.807247500744886,19.579604739534812,19.42587376177673,11.785507231742855,14.619596864364002,17.921302411803957,17.716958541516085,11.24995182421263,10.207559647618858,12.315719008517085,12.176719263250511,17.048624425211642,10.83439180317939,19.30518058303814,15.241265144083327,18.535002904748925,18.94776466180533,15.622014521378283,16.41411959213157,15.443259345092068,14.481888140297709,18.138669041343398,12.773397661950781,19.19791971759551,14.711489744812647,14.778675291821688,11.474086406033532,10.082452954689906,16.51029694235461,13.991335582361629,11.516535524148097,10.15220359560012,11.50193428285972,11.502030272853922,16.077498134929957,10.568453062916806,11.982443489399905,10.534970397073264,19.175302254367704,14.18124760870348,16.950384075109064,17.13375546844977,17.447679374471974,17.380128336633277,15.473893145045441,16.92426461585068,12.75026306234257,13.842324653831426,17.978500682313715,19.834850701168833,13.651130386508958,19.186084358428293,11.362543217713672,13.017523827907256,19.177281577454387,14.624127821653449,13.274766188529094,11.479107819876834,17.20157038174473,19.234730247150644,12.280895509996267,15.59856793138316,14.432372290897948,16.873241989437723,17.09677181431801,16.994791788679812,10.751190991886133,19.79713559263666,18.91121686805989,19.586410365467696,18.546528939319856,12.823939863871994,10.581147566191449,15.444183731844738,12.090615542243055,18.90593950146139,15.461333760983504,18.611104785217986,11.47290514071836,12.713480387491607,19.13883126443686,18.33817582321393,17.907101218611803,12.495094494944494,13.455977461060641,11.354680002040983,16.742687700091146,18.35456259508487,16.355436364119505,17.00917582930294,18.439191956324414,13.28772576297162,14.346579093997331,18.271974396206442,14.99226116197049,14.628008679254368,13.323525581740084,19.7209444444764,16.898597545114864,14.372820204632324,19.394678252787983,11.191475227710379,17.08056042547766,11.334168980653253,12.524530563829263,12.300529860942742,19.666626690275336,11.774965670538517,13.87142373928182,17.971292232520163,10.270629473916738,13.216402030700607,17.21256823501189,16.831320840861004,18.553988769134026,12.833241085429336,15.136529263627725,19.04750105121715,10.121779685923308,18.2073475094515,16.404829870298617,17.361915490755123,19.840838452219646,11.747862372976174,17.739953334148424,17.10471455713759,17.485559923771326,11.166931089444446,16.125317375541748,17.264094153793952,15.69021286274381,12.700313720572892,10.80159108358701,16.297350505712828],"p":[0.4349363889632749,0.7466288583414131,0.3083152729716676,0.2310607591739311,0.331261009556284,0.9137050553062616,0.08630238253003797,0.14734963269266954,0.2512779650701742,0.4160277966849144,0.7952115661865129,0.41967196954231256,0.6287367992020383,0.6645709334074414,0.39706107515990796,0.8699921931188939,0.3375020941343103,0.011172594513942258,0.6290041523350407,0.0772909951391092,0.3879400045295971,0.6007899900962299,0.7198929221401271,0.0945260321478798,0.8044612038718688,0.8026114896217584,0.06964212093528976,0.5080660158274215,0.8218504781426603,0.749295514699585,0.436673932957401,0.023669360355381253,0.8540352020808437,0.4111935275901315,0.08744248090583251,0.7119673575306884,0.1551928710341206,0.7125627590206851,0.874474827945102,0.1495014891500639,0.6839090379383215,0.26399199553258534,0.49742742982028076,0.901464445935221,0.3929600420038355,0.5749929518375154,0.2699284376777864,0.8283670653407722,0.846876421492126,0.5326028056129024,0.7034509211940438,0.19802811564246126,0.22304526392008994,0.32500919031102415,0.7478439603756348,0.10148639851734531,0.6533302000328784,0.5101558849730119,0.8119139538118385,0.7707749582624037,0.43877181147532696,0.6529724271226447,0.3107395279895184,0.09739602208574616,0.006058621782834894,0.8567806983148754,0.6922942824141614,0.5434050746673047,0.6834509573941474,0.7219988536034512,0.05797832818921611,0.7248089069183012,0.8212417237840963,0.0016677511246026011,0.8654787159655353,0.18569380232536914,0.13429757847947132,0.05793002379909429,0.7166212529767075,0.9672974284981757,0.616210108015701,0.7263699090569928,0.7612023237411953,0.2018858121284568,0.9149215792266352,0.24485974697734147,0.8344400326537686,0.6740598330774175,0.7991739825431452,0.11057320112030755,0.31527010153397317,0.601079838395399,0.941115303721004,0.5900726027278951,0.07987110063641745,0.13873751411678747,0.026885836587773326,0.14695319923905403,0.8014688091301183,0.9644159144313436,0.9331686401292925,0.17206889242368462,0.7218357969695937,0.618524683080889,0.771612212072672,0.7809045258811067,0.18417448067271858,0.2155577108275022,0.9513135703714803,0.19412550466359213,0.6269388752489586,0.1269082402145223,0.8834246390198073,0.10821124977152397,0.2686261183633427,0.45283655635406417,0.12260904208417611,0.7592877876407356,0.30933501459237855,0.8319788711080902,0.6102919793996333,0.6841189411193132,0.10874858448417113,0.48669670054283243,0.24143320795898715,0.6769464400608882,0.10911449377824489,0.9883150768420892,0.36644467507614387,0.020394157686179026,0.8026128120221594,0.40288041421523135,0.13921082784210514,0.8810251056390961,0.974498994510002,0.7351132752414844,0.716956033746827,0.22257328153518308,0.043956274545638996,0.2314081264600547,0.22043760459776185,0.6335586841613992,0.18926527287500106,0.6417255066201601,0.7853334645122871,0.0015111626463635286,0.07485986616547602,0.6846174927113584,0.4056662381755243,0.9591710322670497,0.533604052800785,0.5679151201045511,0.5398139480581554,0.10876339838977644,0.7170539819560362,0.8974675718704661,0.9781657708549027,0.9424437435437638,0.6850236507747134,0.943366921728992,0.3150115160845246,0.42073866871191545,0.9716725207121168,0.13255696545227358,0.6558446164869003,0.9729055511414966,0.7789761719477353,0.4889711482508514,0.03226301397527953,0.900908140079459,0.7082767042082974,0.37322248026648386,0.8313711678922344,0.40591542057549845,0.4063208692235638,0.848547608649233,0.4095226626379642,0.1494657611119612,0.837916833158215,0.40583234917555866,0.2595028952780971,0.32558936102720293,0.5272714630989914,0.7186399970253892,0.5195545865790399,0.7592014805486831,0.6181614760186094,0.24650408906221255,0.6979883587139484,0.9540450434273919,0.008049922269648402,0.9925891719555269,0.6208069959321254,0.973639583106582,0.6353563354902558,0.921435127216496,0.310643738084849,0.9539317300310977,0.9170298716183964,0.5385439282334195,0.04560430582551267,0.8119953005607217,0.3502993209742342,0.06650464457223815,0.5144032249877211,0.29007117811513394,0.7343291392984268,0.3703261053484159,0.48328454630658446,0.18551699364960372,0.7631353147767943,0.3583208358026466,0.7819825733214001,0.9944391344571257,0.23984766505450272,0.8440512307839214,0.29115325771388423,0.9590696665118219,0.1545699900370665,0.12102619786991364,0.1597295953736655,0.5163052261921635,0.7526579458045515,0.4742773435941181,0.851654119319454,0.5830355578217368,0.34669178950473367,0.9301651769008479,0.8135118283408667,0.335875533749314,0.016908084978741966,0.517623815636701,0.9908300075576624,0.6171435974230217,0.07324871548929401,0.806713054963651,0.35810202348111453,0.9680059890227772,0.9590036958060209,0.604791271761471,0.605151158676474,0.45502387232985164,0.12120825108116251,0.1612348885915762,0.7854839935234947,0.25143311186153605,0.7604101059822677,0.7538077462262585,0.4034521403140563,0.33743778030752813,0.6407541283708535,0.33217930744574464,0.5499766143967753,0.1138449432543196,0.39344566135883063,0.8775944680416985,0.01809214986149299,0.8556559469059313,0.390805586721078,0.04705672680928896,0.356541400483956,0.7921616820262931,0.08907027130091216,0.8751447647784796,0.28315349589914995,0.9396467162364146,0.7522282235480977,0.5502802953276407,0.9066762491533586,0.9362785481923941,0.20210722233055467,0.23066314005819644,0.9333249165537585,0.7991752972506485,0.6794527350592183,0.5055628739741824,0.6615247788171521,0.9837185882460917,0.9910397348797373,0.29338632647149665,0.4856685044474023,0.1645239119216877,0.8935143294164718,0.8420624008550779,0.7845478170720381,0.1269347058466357,0.3336884705797296,0.1478830714478674,0.6301505525633926,0.5678351289236185,0.5365387092045759,0.4383829936864856,0.43856053850549803,0.49395495974438774,0.5584432703516731,0.8447562663586039,0.8655174239757781,0.2090027260319849,0.9410745459329339,0.4444090834717058,0.9473909932656726,0.8768048661477181,0.6150474748859545,0.7704593986148343,0.7698057726949146,0.6538087679319415,0.9016676430379744,0.6488537785391437,0.2963724019912628,0.6798696822932926,0.08690885828494421,0.4310402015774868,0.47643256223949115,0.6381737792910855,0.8835164047345025,0.5587414275694977,0.22885431175217663,0.2539949181678811,0.26385071308682617,0.7415588495428851,0.04025369013360036,0.4275047435962398,0.8860846203653818,0.38184266546615886,0.9947730000185149,0.536438717760773,0.18824392426734704,0.7177009373565781,0.738614334875211,0.880880340016102,0.5893423890946765,0.3328743864650605,0.6493262627727756,0.5364891634783413,0.22973946126576816,0.2565962114984497,0.4016327512440241,0.8095637039424013,0.8221637848278764,0.5119916707966743,0.35869000376269033,0.6797870252524374,0.16204892851676744,0.4786256082373108,0.6171646226948715,0.1705269142556094,0.6683310821228858,0.9451471022434688,0.07339440173074996,0.6569326976175964,0.5731794041891569,0.9937242385021074,0.36990676281310364,0.9051022990216411,0.2234076786054917,0.2900761587300351,0.7125058092017724,0.026847515686120094,0.23825404976902043,0.32317876667381484,0.9890940403235995,0.38684389117704154,0.9739769194346128,0.006667669681160948,0.4107144204045048,0.7985538772727607,0.21159420390744765,0.6494052256467544,0.17713408465425573,0.0235662566533259,0.0037968553517835346,0.8395004739377565,0.5833769850765218,0.9965519914365006,0.8016583509608801,0.6247037223497984,0.6589276819093111,0.5268052686142051,0.8954201917440034,0.10528088106238798,0.22399820090458356,0.3682397345845434,0.3466670101374727,0.3672142117768207,0.02220283630935893,0.33666555767348116,0.17140857551547617,0.7130445020694576,0.2694504122010508,0.478762500655582,0.6844041905730165,0.597701170020678,0.24190572504255137,0.7126372094603106,0.9979989655143671,0.23658008102159234,0.7524303261014316,0.5828728083696446,0.8384418485449205,0.8840770215224789,0.9858754478516785,0.8212402365275588,0.20355726371770033,0.4815439957804275,0.25962211343819663,0.9864479012376368,0.1935017014197371,0.40683971842667543,0.010776079178022036,0.2641646775856432,0.6400859865021238,0.360672330473798,0.9465023870710634,0.20936600700705577,0.45762881459538596,0.694690003906435,0.04170047177546943,0.2640176419147866,0.7298975991721421,0.8456119030723059,0.758560136398984,0.3436968658653261,0.19329100151934164,0.20132516267023215,0.8491338498025414,0.9871910979964738,0.2114415437643642,0.48215792797901114,0.7872959267016801,0.3684618278585201,0.195481586859106,0.42604158875482767,0.3288697050990337,0.2430558106487044,0.5090048276662622,0.43339683278346497,0.7587773217898739,0.08952426691033555,0.14163304959794543,0.2572975510512667,0.3574234642869554,0.549401810529276,0.7076149724039189,0.4115394581287788,0.4750582724488295,0.9022818129194232,0.14033016797494802,0.49976568641271646,0.8814446413874422,0.4175615199064908,0.47637484638003524,0.6830792132018217,0.6497669384761287,0.7518592261246144,0.990365918425915,0.4816704946051187,0.2669211889893013,0.03012295486731076,0.6784695562901826,0.07910662570551352,0.8985073549640135,0.8009433577804761,0.2701805931804404,0.09474176329941364,0.17087130466164835,0.03135568156738855,0.20256015338824152,0.6832652741302836,0.27205044758972097,0.6642711773423604,0.9373046763175648,0.6738288546800753,0.48472377180669723,0.8150624150840107,0.19425485516728802,0.6027919961087913,0.38634726726346913,0.3797704928388175,0.5721787744599725,0.6501290210589676,0.3063133469997643,0.6054158492539814,0.2839394930219161,0.7221509324783022,0.9034060976486327,0.7694304529652236,0.8581082379127027,0.16249694332256737,0.6263566602380164,0.16976168486819754,0.32429067463062666,0.391966872468146,0.30820826246257127,0.4304201554105882,0.6642799008762728,0.7314964314540893,0.46655252990483853,0.38449924880769126,0.7460540186012203,0.7362207885224032,0.9744557936444573,0.9689753351142558,0.6065678148679712,0.1450958416491679,0.12410620782531434,0.08953242243256465,0.6324629145043072,0.5506213148741743,0.8623604918780614,0.48562487039079194,0.042509817986115195,0.46974354091132153,0.7564131766032471,0.3906821787379646,0.26977415367642754,0.3933051056329657,0.1272786525267422,5.4681015838831115e-5,0.5170956298498606,0.37481311152775176,0.47455829385807147,0.3949432000923676,0.6552236890968253,0.6544772115557893,0.3815775123899938,0.43780747802079745,0.08273069609574812,0.5111356551596999,0.9312523567797282,0.25268139460028594,0.2804363440670419,0.7860823793183402,0.2723571898165682,0.19586792343214543,0.21242856997226767,0.9854944255701494,0.3578561181775777,0.16854748096790306,0.3079972117219185,0.7996224548206734,0.8154795203148955,0.20706514139435872,0.3512365315136641,0.8171705849177613,0.6572110058224969,0.041177953186111615,0.13695397648342555,0.42650912455683465,0.1848773719232597,0.6831729305515706,0.09853177623140685,0.43563419563554207,0.7947030751699975,0.16876549624205195,0.3763336946532685,0.646828949600871,0.6428364489080252,0.4068730395735589,0.5876025281087625,0.2394388190504788,0.9693687756788183,0.8685629960535681,0.7519446437384671,0.5429620490457234,0.3158592345976665,0.2871147330578674,0.5632872660385246,0.5739544159873491,0.6247711468479666,0.7628928449224608,0.8799440770164377,0.6861639990957251,0.09564886197811462,0.08378617468538851,0.8823764087211505,0.4181596120922866,0.9265706997988086,0.5417495457493862,0.07800129322106275,0.3923795881414702,0.21755317723271705,0.8721709005843634,0.7298570851071016,0.2551020425632462,0.5716442759820086,0.46569617650548256,0.2540564794543645,0.9365771617440473,0.17986675806532793,0.8262231758418539,0.9650575711748726,0.8659718696813978,0.12917540797643312,0.9663058536350257,0.6756879906324176,0.6296288417840457,0.9979915733720779,0.061860189828967904,0.6269376890493035,0.1818499494131811,0.2686182710492042,0.0635283372610369,0.9345887411962488,0.06996019253209829,0.714184849552506,0.9366363539743192,0.046552601758424794,0.9829227277560246,0.6399263154824759,0.5003026529259325,0.152671056475427,0.38476805603354913,0.5076150734967211,0.2499575644971912,0.027448252677678253,0.6756361577613854,0.6174233524247281,0.18144430006978163,0.6293809503080579,0.6115306404817742,0.2799304372380851,0.8982514345668964,0.43388068986737793,0.30036694163305655,0.978754470005722,0.6835193589379633,0.5051901586363785,0.6918727685280608,0.13738036501855744,0.4361652598385011,0.32238407050097395,0.09364379019395619,0.7959015061843178,0.12013325293672805,0.2953371146668833,0.843680720317834,0.44374702366194296,0.19868905248794144,0.7746005717711111,0.22904669970786928,0.10582494895021832,0.8693825870237004,0.5167923649854547,0.18318329601241756,0.3476043286294188,0.5471177902287789,0.5912562896665401,0.4201154607290287,0.1384440088938066,0.44175797674143813,0.694317821108767,0.483619954451576,0.029711450743727275,0.8887689540024439,0.24748456754010162,0.26346268238757387,0.7839187498608491,0.008192451661779288,0.23603946260841568,0.5700109086242782,0.5328847140622919,0.5312246731242778,0.8580172513212514,0.6253259245161096,0.29870312844384905,0.5579624065732984,0.3224047219419015,0.5644135338521996,0.6244350929652551,0.4165595463171179,0.6029188648133015,0.4396348216621835,0.3875828880712753,0.5044121036755125,0.37863503094904694,0.5061443034818873,0.1902870799392109,0.1742856734562579,0.33024672775469455,0.47228467336651936,0.4346480593507578,0.5554848684957951,0.6530790280777647,0.5724748531285604,0.34963674614393137,0.03099116879145103,0.9357572776047427,0.7778033903080541,0.3520079153919766,0.1862810459098565,0.40013476272099746,0.9927609747271926,0.5185257305576463,0.3749832725151334,0.03225486312055481,0.45543426829456646,0.048534901790342255,0.352571893420474,0.8469089201557409,0.8445809384528231,0.8543449059725539,0.3819858239674987,0.6451156035798511,0.7802253975890581,0.798570245067852,0.47044682364738466,0.49886918144954695,0.5823740278358729,0.6539619855934693,0.2414932695049743,0.07274916240947493,0.984496305961823,0.7480163950159122,0.28920585563670587,0.4270395449034743,0.3858835683871069,0.012817203119044107,0.29360987385859794,0.13713391976055123,0.8027688359584573,0.2056827738417495,0.14318423661294966,0.2891200316902156,0.11372668912268358,0.09429240257621752,0.061548897154414695,0.45929712885535423,0.573756990293425,0.4612199051577943,0.5596519622595846,0.6015264377377576,0.3532780539767577,0.8698967880761519,0.824028346431882,0.035561855673344134,0.745186023335876,0.04682601358884786,0.2115047038311122,0.2371246129335045,0.8812580901937477,0.9299717418439306,0.38861176427257327,0.6330204111450637,0.4245101112088647,0.6812739010760933,0.4010130302151593,0.9511341914854656,0.40510526803068836,0.24923257007781907,0.8762874173371131,0.6773942050657455,0.9622315719725256,0.5044750614227833,0.676181775561012,0.45728990306276374,0.06706255723890386,0.42505015275300884,0.16729346081563423,0.5653011552660394,0.8175884840414651,0.6721424547167585,0.6074150536569096,0.15887553920128394,0.714657546657872,0.562692913414311,0.4442353580566587,0.5744486183809843,0.7449186087174926,0.8007657223738696,0.47884827546179887,0.026660976396565728,0.38888323214080134,0.5457265161715767,0.9833717185798996,0.3464169431430286,0.4132337978609628,0.364024580959905,0.4279729644410515,0.269664961632188,0.3922334728015813,0.6543437868057755,0.10368145955213048,0.04821663578068747,0.9391207975130156,0.19202628801246746,0.8393783889771385,0.01835028420186391,0.054532797698877644,0.5788118666532351,0.7227557901491797,0.03487924125756536,0.25982440465934187,0.46762821335029314,0.8012111252866836,0.13581345096053443,0.10120072779087863,0.8664348355109521,0.5019155558468336,0.9131456323513363,0.25812646796097605,0.22800467173267003,0.9798698841083804,0.2882969509784332,0.2654088042569511,0.40269302203174684,0.5387056340644998,0.1525784293817425,0.6645103777898167,0.6679803086921812,0.4722649761251403,0.41012305940278604,0.7302517523357754,0.09596042223350354,0.15528743197624517,0.6283053204187907,0.003189871002524214,0.992588347895047,0.570975699567263,0.1139462136038738,0.6225427094483469,0.11767173405997511,0.94892131357039,0.7890111211334812,0.8557299819608164,0.8005458888243282,0.4756503532003149,0.9182688465831683,0.5414131975964871,0.5860508294494462,0.8078707055608607,0.47934931221839094,0.5816005361779166,0.8239904641794678,0.4265526955772838,0.5567245825965847,0.7907145601163652,0.2111485486596787,0.14232018025303073,0.679656086517338,0.6520371816917057,0.3563734327778254,0.7366364737881177,0.5177958947391124,0.5865327054459268,0.07757808726000359,0.5180609754328398,0.23188376334115746,0.5901783335491408,0.08959839990177265,0.07680133519601218,0.8757163187340216,0.12812529611812007,0.4359915684718503,0.005574288288973328,0.22488407134401278,0.5969811481471936,0.9828428962104689,0.48648644524124185,0.007675815405388642,0.49267138081077855,0.7646317527482325,0.8356035533619683,0.7978349978233608,0.7122084108566309,0.7953484253923322,0.25791007365139973,0.9442702148762818,0.013262773808464745,0.3370381171589323,0.8735280515796742,0.7163843325295471,0.2514710563857159,0.11368191389079696,0.21342284879106654,0.03157894349023249,0.3955865054043306,0.2329839158244318,0.30114143931021986,0.37856331793883347,0.20945933479048473,0.8492517415237293,0.09839998246135262,0.7508999531951404,0.27731432987200577,0.9524209114610818,0.18465545022450214,0.6179749426371228,0.06694814760208367,0.24467507670446675,0.03082413141519491,0.778119235333282,0.37504474269263666,0.5528348942508783,0.2217738045421922,0.8750768564235467,0.12785472873666315,0.20467380471336405,0.8597458551482653,0.3263551654051524,0.6756141121604948,0.05046717537080858,0.43637776979933585,0.27819182674375864,0.6125985116336481,0.09200478031018,0.18856683328695145,0.2660431716720768,0.1236686280408652,0.6523962405990367,0.24114940419280528,0.16496725952672575,0.18921875425987578,0.9937276909593311,0.7089747235305224,0.36617147540306183,0.24569817605168498,0.6581502088944591,0.9734772953932997,0.42929470690907,0.269277215917618,0.8868786111999716,0.6154038539866578,0.15686886204832295,0.11070060039297247,0.5489502077800019,0.67379588911,0.8288327771759207,0.5060401328890205,0.1549742995507517,0.019360208732793982,0.7861404358130608,0.039192719580891655,0.3756968284962132,0.2990040885991687,0.7524199449829685,0.1548902930838716,0.014087298076118193,0.17950099538345832,0.3337290219374751,0.7892064330450885,0.2030340405894937,0.7594469491311746,0.6168581500787755,0.9793652930515602,0.30843783255400004,0.6547247713705453,0.4698654885007407,0.8207484763126216,0.07265243666041532,0.3309928245331353,0.09841951016143602,0.019199983947888466,0.24106968009426244,0.11700279285716086,0.5067369095690251,0.2207757001164643,0.9117598717989286,0.8954846947909902,0.02504919038610831,0.5348209080220152,0.863340265841809,0.7619757736481927,0.6386337735415977,0.5527561924040758,0.30510592685570326,0.6042983471775343,0.9566985721109005,0.2740063637525194,0.7164111209283672,0.9717763111731368,0.6142565608854746,0.3940055696210438,0.6855239190642353,0.21485891465029994,0.2661180721099994,0.5330949789507029,0.7876506990338805,0.24036875601058472,0.6673429351613114,0.8318077506536692,0.16768910534793924,0.4097965880865655,0.8591195555587199,0.6437101331373272,0.3953143975643081,0.5520954286429851,0.365369868372438,0.18198408156772583,0.48281738750519687,0.5225147637671517,0.5394390912235456,0.8280064826893958,0.02390597147859652,0.9784413285677911,0.3909152582060622,0.6242228274887247,0.9182703024222281,0.2081407693707451,0.4208472319674461,0.2744546935036707],"beta":[7.450698951370294,2.0419709113324314,7.003391484212411,1.673881037784899,6.4637858791073,5.381539074651796,5.432614448044932,0.7460566376336653,0.7618474323255398,8.484667829715972,6.087172392333087,3.361876651103868,7.891183949387219,0.9259980827682224,6.859897197476901,7.145558888341497,1.66435548158274,7.098684701929638,3.0528235403513504,0.43779680466999427,1.141543934010223,6.368709819005214,8.803512145082058,2.659763852232988,5.6610513075236035,9.495048840280578,7.757490041741062,1.635435607004041,3.254960150375432,2.0669945095902653,9.061022196201542,2.349701025359827,0.7815438807431119,6.5313267398647294,8.407907825370684,9.813178626111318,3.017990755128863,3.751581353118816,8.531408358864521,9.121851853541143,7.3865841829319905,7.211310857524305,1.7067227713790234,7.636987070095726,7.923879261489411,9.098887371626553,1.789586896915376,4.059337938466639,7.014964270486321,0.3823497918027674,2.9931158569831595,6.0169892555735345,2.46214682414172,9.006354116663829,1.1438544211750945,8.930688418767849,1.8598386564586011,7.184276865517454,6.199531228290256,8.770496711599503,2.1591947332389316,3.9266460262913783,5.266299219662498,5.429958101192156,9.654873649903221,6.439908111908583,7.0988719509177685,3.125648531977916,0.18744883803453405,5.241796201981439,5.772594430954465,3.7681916543822602,6.151935200698045,6.293090408014201,1.8007744326524167,5.797769516990179,0.666105532024952,4.583939114150482,0.9533873079783328,4.667367866288236,8.943552685750795,8.120603961266772,1.2318288448959192,8.825853712095554,1.6010913694966389,3.12205182104887,4.108667469870728,7.69782997303329,0.7264967443787929,0.1469220817206196,5.202312569115232,0.9592281332060759,7.563461756491067,1.4888116835385334,7.3489776055449685,5.158235411103775,8.697331022421235,8.051410675175903,2.659181302700604,5.818823861450557,5.591777914335614,8.260570558192947,9.93238318321142,4.328906474062801,3.6648281430096197,0.8130623659347092,8.451462329698547,4.131902211970388,2.7347142554555015,7.132859143888284,3.7388204500904987,8.960760430850442,7.870890395401078,6.397290684060342,8.57088352559635,3.941405817058321,0.27485951296082334,9.447247058105916,2.4836153024851537,0.4110595217122559,8.555234639729443,6.225693500634071,3.952431873605957,5.449236691071193,5.263989411804319,9.911026713891944,6.4208042714533375,4.613124304108338,2.4663041079824555,7.463938698826736,2.952466095220032,6.552611845585991,6.747897084744325,9.276254382356022,1.6007322372337307,6.615608876054901,4.947771943557471,2.2232388024879324,5.635918394293253,4.217906555389035,4.143729407659675,8.068948590383776,0.33635459092294706,0.5334234162270346,2.0645502646229996,2.6875047089648896,1.2219798376914381,7.502984803240691,8.577734438309543,8.012410251587493,2.246442403290223,1.8644492223455633,1.4139034716471621,2.697447461278941,8.136083173627547,5.076306710323609,9.636986900498448,4.624538914732588,9.894413104069944,4.7723283791369635,8.877891241740228,7.8730281923289125,9.034969890529908,5.263065980697565,2.0830212095019296,7.823255849732565,8.97339257154634,7.956161276630398,4.255587621678798,7.5364127826308085,6.165423560573844,2.4102036302365404,6.896715830003764,0.4604400783822804,7.674503351034776,3.0618107588213817,1.2965924606016022,0.24104172317353845,9.94702516541252,4.543733344520982,2.9700896873165883,0.780176586375203,4.424908064107078,4.692880814492861,6.498383891985428,2.3513696478032298,4.802368967098425,0.7384508977102922,8.445012821828692,6.8854826046109014,5.766915440021368,2.822628712040607,6.055760170664368,2.800375643419879,6.262896710567802,7.290521969756069,0.8832001457072725,2.660463714315544,6.802447063258185,2.9903188675337478,8.937925883429273,2.1420383067539173,5.8167729265781905,6.506581021097291,2.5829164367086954,3.6375439260588283,8.64460214508465,9.809299362352755,3.3499821765676163,7.7992569517958765,7.974168203393086,7.524658928284693,6.964234310612847,7.1228126862872525,0.11932455174911372,9.750504615075466,1.4803626900977385,4.537032286536311,9.429056089692047,2.9556990709532283,7.858827302432965,7.928587902539697,1.807171499920801,2.56724097407083,1.411093756925137,5.632705047884576,6.045624183921046,0.04863727884293567,8.70049808260277,1.2310486353399663,5.0798009384870895,5.9031617646958745,0.2880339325767345,5.408356109832029,9.36161388267976,8.234049004558372,2.3114427893902567,7.742141694999491,9.323375125210081,5.252907340918638,7.990244406072198,4.621105983024265,1.8251673585254369,6.789174548774781,0.03406298574066158,7.010347320555585,6.591058930004752,0.07397792327233477,8.03851752867422,6.001628490627535,7.2227606268113735,2.2756836528680946,0.428004387066081,3.8719781671693676,1.2159259271787004,6.590509103444109,2.6693743327412744,4.072650551162511,6.575267175799087,9.221336594683333,1.0555330316135225,3.8347661628674445,5.135571227691136,1.2167998499185906,8.566205216453092,6.207518475887419,2.8593066408022594,8.752829034303478,5.931522301737379,3.3492009841624104,4.307036822813764,8.691101644503476,4.843165199020576,4.2503034718881505,7.5833812876508215,4.821717258559135,1.1289916493765428,8.11448481577022,8.499259170402267,6.672418987191251,2.765506966192297,2.3140974601491826,0.7487927444810394,4.672137189347801,9.264947100837047,4.0757727123556675,2.7980114921332677,9.749909233177426,5.419332932486793,7.698142192456658,7.337029157430237,7.355405827299832,8.396108313559242,3.3052915671771688,2.991300905522438,4.644500169573041,5.408937657481467,0.9043428018860666,6.093616284203969,8.044260549896347,1.9878091995550307,8.07104444865404,4.905949650704642,3.3402298134666064,4.813871712781188,0.46536768912451176,4.10989953436882,1.853295985808694,5.843487331732417,1.8082051028479396,8.161964495043577,1.7369265839192383,9.540141486553217,8.437298672087506,2.0538779436362087,4.367524378272078,5.835722151177743,3.1054232938952753,0.08768357158991602,1.541667593855025,2.01471245435205,2.036574258129049,5.682299919369987,7.032817522844869,3.5572266861472213,4.914435091414784,0.5129012412715817,3.416803557196655,1.4095528629777387,4.557684820422532,9.37569123725196,5.58187040963322,5.355776753636736,3.0602555339472293,3.6250599575331077,2.600946182703283,5.11340584425005,3.7185098884689127,0.9279265425095273,0.0011926240275084155,5.093729329311358,4.913845875489513,9.232978142713462,8.536335128230327,6.644686678067229,8.278524033153332,0.0023538112761722907,5.293568036233543,1.6742909353415425,0.5679740604745631,6.980913361709121,0.5682459845624788,0.3542415932822429,9.894168366690382,8.743209793124333,2.454349399255076,4.843880395079234,5.886540394091028,3.494405664337108,5.470775851608918,7.633447256603734,7.255235624768829,0.979271101808723,3.6738416059670342,9.825996524260132,2.6778117832884885,1.4883611251963558,5.987774646144786,3.0078033252178615,8.062958149380252,6.774300375914322,2.469991299365397,7.143377833837428,7.162146787566989,2.550229301901721,9.895767308257453,9.912955500661663,7.259984078048927,0.0709193697247823,1.2075161097118037,6.422992575077582,5.30932969365926,1.8038088633696403,5.807082795412429,0.15773278462084983,3.1384034494241075,7.781933231905822,7.735424861092741,6.478811134318483,9.550561095317578,1.9012986442590307,3.604860487271857,3.21885027433527,9.17577183413629,8.282290362432905,9.016258606328403,3.1981845740600456,8.510465407765908,0.6136036217480756,4.210199542367327,1.8069705430412042,0.660450581083607,0.6626490315452882,4.711323913851042,2.3156087984600626,5.766259950768582,9.197257788416934,1.0634959245105602,6.358180914674461,7.013513125885438,7.469680827475733,6.876638375349824,6.235804764237541,5.697530750696775,2.9763301424740374,8.084161769891454,5.217030157895575,5.681200813751799,0.6108727835353389,6.25730634967552,5.370217929178511,2.149279909850228,7.235908765150079,2.347563779103927,5.2318482189503595,8.074773996414457,3.5058139761252494,8.613257739939648,7.707490735469003,4.838545340925064,0.8750435329918127,2.511126618521473,9.744255283449712,5.521953439533364,8.953580857705285,4.853571803985989,3.0023900848867657,3.6154691434837605,7.860575963868886,7.316267832763548,9.290243893919428,6.230509979291538,7.951267497790797,2.375463936397524,1.471552962281204,0.45830193075636183,4.71599340667124,8.287985745119297,4.313528532626949,0.4835130998010695,9.341773019893063,9.138670146022603,3.165602429390695,9.727920676248871,7.514790827736187,8.310880437695793,1.797895701004204,9.04763315708099,3.9963413403062753,5.439939009855732,4.625357240021321,7.8914212871060645,9.592451112799395,9.08359681186976,9.433938074696464,7.511358249726932,7.460636075148013,8.309557127588542,1.3456344511184737,2.6745928884164827,6.403518899183068,2.159974927517143,9.927549411702048,8.305731008428854,5.543983147246408,3.2066691372964384,4.549280315689548,7.005263937403814,0.9567684260698206,3.684631634271114,6.279757621370388,9.617851889204177,3.427713018210665,2.356410178699515,5.9505175835632755,7.144567202823224,5.325789053800571,3.8610944563199734,1.430456548522172,7.116182954589387,9.045924462967145,7.346047992721212,8.556886921742793,2.778629926553029,4.452716420959836,1.7752612053103967,1.8505330926662311,4.608066516489107,8.599688259598949,6.562587757437206,8.641499006823084,1.5784834240336676,8.887981331261924,7.831127261046349,7.021709322099337,1.8219974610505596,3.480626305174759,0.45440388323670033,8.590293136378861,3.8585271273550226,4.166770371293717,5.725959982281363,2.696847264094424,4.577562568969804,6.332934483942026,1.0614269511941243,0.35343099482811,5.837656621328624,4.430606327432461,2.6143720493775624,9.114083848820542,5.597663571808836,8.685757103294653,9.569361109390162,3.401614338445671,9.977360091182879,2.1075483529226946,8.389549235128884,3.51340827458549,7.552291835872684,9.532970197843797,6.5340480081770425,7.423607394047787,6.87840656870015,7.327208008222663,2.1059317265071553,0.20863553299337978,6.901840807867647,3.682694294972473,9.081655887345976,6.740825217317401,9.428553822293907,7.736248399535293,6.079379943106346,9.60757671793038,9.308378688542415,7.892827970475875,9.179198704591773,9.230388686603444,4.74195370571151,1.8000672381823213,8.316263252206731,1.8425989730148973,5.320589502540498,5.079184793935081,6.077869139153904,1.9176350486403893,0.7109335513789539,2.7632312314076435,4.868118403288479,5.755931270665489,9.740578022426359,0.37308739605953045,8.778725583882615,5.334224818923365,9.962789420175042,1.9320300566585225,2.322547090097853,6.376793197225918,9.075641927574472,5.852340332170338,2.4400260706207777,3.8246268119224713,8.551171998797129,9.808494185784662,8.692121086513174,6.624990232167038,4.253801719281711,0.8145244822161168,5.245416679112019,4.285288741952316,0.5884840639509004,4.416850935707113,6.098279000382545,0.3451764321556916,8.840919236099625,3.0722778581403842,1.9663149022102888,5.479248384305708,0.16398354763077494,9.260940078426547,0.2610961270825318,6.096414215323527,7.966723204372705,8.99765569577929,5.766276644302277,9.251742142292095,6.932978779301131,5.747933773007848,0.75845562947785,3.3595561164568233,9.181986718829647,1.4007981165662264,3.335978773141832,8.27684661204713,1.2158839244688613,3.3259963809690585,5.250143763265123,0.538215931175936,1.1962743863793435,8.202405940596778,3.063537179285871,6.816617318453606,3.7164679064397044,7.889327010436409,9.112554759068106,5.224641478332002,2.1348391568728053,8.166717077299168,7.509884775744116,4.676023853422455,0.26572158980611604,2.943488393267024,7.194661912124216,6.937397676399981,1.06116977482424,9.320012854100595,9.648342904850622,8.654931880969166,9.831684413347459,7.682249617990249,6.514208007028445,7.374811794439379,3.100814195316257,2.8262144180205295,3.5955831742325106,2.9073152693629467,8.066695541389299,5.014433905462601,8.420002816681302,8.153007952668535,8.000072757636707,5.060665607914081,0.3008763672834913,7.564914271387339,7.492372071061267,5.971780858997617,4.189935601849122,9.337829439276055,9.49291006051573,2.6909014255470742,4.559931116648384,8.88614394875207,1.2549935382750044,2.5548214049561446,3.911138328290884,7.34006502370846,5.318267188738799,2.4644689395420327,9.22130516957921,7.094945345634633,9.96219007843871,9.750128400313463,7.920101861182587,5.331564895151728,1.7375531526850208,4.33119962781438,0.9402909404986959,0.5721066043373368,3.2227166107805694,7.0205746266178775,0.8851654195973779,7.509799897977663,3.3315828138531534,1.381234355156078,6.958003819898389,9.100990013955668,2.2849707582574896,9.52018055100175,6.927948067917105,8.217974070701903,9.873652877442787,9.304370258889689,4.147081608799297,4.1829898502026825,3.0898852189468418,6.226342970739824,5.643484006927584,0.8175368187537146,3.5183100169919412,5.865800187743025,6.7550427764769765,3.838451524920372,3.1568428242591473,5.602572005809501,5.997926552089323,4.667063664514133,4.524941232123439,0.03823870862943002,9.470077206386385,4.168458729340472,4.041435109200258,5.353594165351732,1.260488018072159,0.4805150066973174,0.9144095135668229,5.100369682731609,1.6386902452691898,3.4917951437892003,6.02085676470661,4.611073236719148,0.16558689590888465,7.597136412952801,2.4026134263965226,2.0509815332670334,4.564043694897757,1.657509649977491,5.254121818890953,6.412719846751154,4.202022381872603,4.027155997352498,3.6626876290363564,8.800497318352775,3.179169432809612,1.6309453567761922,4.785950512435382,7.215249904307219,6.814201211788973,9.00456438008984,2.9096910382765873,4.639540343601172,3.6151002547805455,2.0929757727511378,6.7770155506926795,9.550059238605694,9.551582821629358,8.308826548727362,3.0229665894013524,2.8490039280986146,9.307790992092244,1.3564120882549258,7.147920360883251,9.447996659506458,8.56059510800577,5.041369720404665,0.12100895732365169,4.319627003547522,3.58382032047327,5.326272790802122,0.986062008024895,2.0043167827302244,5.598558288197175,7.25284617229801,0.9985438210581821,6.2111803689454455,8.878144731231544,4.043286432793522,7.770290469965564,9.327779784628792,2.1945561961913773,9.03110203698766,3.021446079207031,1.1886655653190292,6.293835093929441,1.1389366051107652,4.44295605914073,8.705730505222968,5.2947863933714645,8.611804305535454,0.8725243592723309,4.916663686669692,0.2582130700087193,2.720750781135759,7.9504741401179295,2.0366772331291583,8.53246779166285,4.391719001023335,8.259404410698863,3.5988556558916063,8.247014725366064,5.2150090997262115,9.69012882945348,1.661517646171593,2.6532823879447287,7.277684284674724,2.675838136297799,7.473850585886559,1.1001417679247916,9.018764211357473,4.557879160976135,2.393709375657036,9.84194727899708,8.193153658687937,6.694449043774096,5.297809262927917,5.674128142894448,1.9827096414149215,2.9783374825059483,7.53688013584126,2.0358914998290922,0.430134779095932,0.36724212759053687,3.8040924399189935,5.896312452942989,4.82134919060708,6.749799997939752,5.706733264763568,0.13639748446859334,2.951217797186676,7.521443047786138,0.509685026312432,1.815203173547233,6.9644467876423155,5.547158666913412,4.212901781293661,0.5647422319519735,6.558472896835155,3.2522181917611315,9.588839062057597,2.971019701492632,2.3882229694269275,9.430074382627678,5.956568575052101,3.393042441285541,1.5000311640173192,9.036793953398716,4.663969015550002,1.5426979617348868,7.147961697609491,7.38380348336727,8.554900844436489,9.852677846596789,3.9405883145482745,5.729971630395168,3.771631931822015,6.190955938701828,4.719126875989151,9.642878459794272,5.95228308252409,8.641235308303422,0.23021588725794073,1.0311930095059463,8.159150693724175,4.766822578561167,0.649265162832251,3.8957361897958975,9.674017433591374,5.342749591427811,1.7732080174485332,3.0310979965253693,0.696905767481093,7.017037472465049,4.739914282324791,3.442954753877754,7.509830398579924,8.99318155312286,9.476872294686816,3.846559559839009,8.178184104692832,3.842652374520743,5.771828371265295,1.9711307207616113,2.476237773561203,4.610045449914373,2.168036296016105,0.8411791907766486,0.5058883642696821,1.0586203370723535,9.28881739230957,5.556901999449273,9.129676008572483,8.629866202972845,1.0232844571754751,0.7925314207414047,4.396355351649444,7.464653760276418,6.630267412041643,9.457795314263029,6.133135622295585,9.51434916164261,1.8231293247284297,0.40414959605871825,5.939276804097466,6.365491414975866,1.8921691843060762,8.294478954936073,3.04500076233045,5.363450841500114,7.541235161383635,5.473382651762733,6.843487867202094,9.166091194692052,7.059667402525413,7.074603959077484,6.2592659710941545,6.175019028414852,5.345115078723994,6.104573832417843,5.4089211440615115,9.52114340036577,6.85262036538284,0.7356550912017945,8.46570471008713,8.941933517203767,2.177985170695378,5.482738373607646,8.02306781335751,3.1438636814036114,6.277563876817187,6.9657489357950775,2.9065530345518797,5.72898622711977,5.253593933728191,0.6535398594581632,8.527815341008417,9.330478777253447,4.83934965980267,6.051245717432279,3.1701931075114986,0.11275935069605669,0.03383328615147674,5.391725585784242,8.392284538125171,4.632604526872928,1.7931219318522773,3.9090290364320035,0.46683608936166854,2.5318704159013183,4.5877145533297625,0.8126509872660104,8.2046225573839,1.461064181869156,5.053025359127767,2.662931064730487,6.638624935950144,1.5084664894748556,4.772985889919916,6.810861260045145,7.0005802359143265,5.386137362239516,9.611404447693657,4.117642984217742,2.604690645233294,0.40876302811386545,4.301503744559872,9.525182649622161,4.952266937586616,7.284951222657094,8.698780294304084,5.507982914901084,0.7356517705627064,3.224061034843344,0.6605955749178394,1.6577409815444555,8.752192454818708,0.7131598722596499,2.377102936978144,6.1061652279225616,8.981740844163077,9.573885099925707,2.8567024681484754,0.11575319760842362,6.6022482428069225,9.897903629345464,0.0773166614232701,7.849490847662073,3.9114667950060333,2.9907469346708226,0.9742213491368545,5.409667633415074,2.2629787219533237,1.3896987014886242,7.748602069489179,9.976041714020571,4.570870241993323,9.508039059035099,8.957674252152666,6.910174706592578,4.103371847195218,4.575285837748295,1.0655860351132396,3.906873170752514,2.0161773116353543,0.016592757644566802,7.6417402725329,2.3161239705598025,5.902587957929484,3.6068986842833928,7.115672026011472,4.451125047743498,2.87152234137801,4.457807580257764,5.656597690069656,4.2746431122739,9.138946107050046,3.247476556101443,7.054377786406379,6.974073136052894,7.144718329534472,8.0184357098673]}
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
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0 );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN );
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

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a non-positive `beta`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 2.0, 0.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 2.0, -1.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 2.0, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `alpha`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( -1.0, 0.5 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, 1.0 );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, PINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NaN );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `alpha` equals `0`, the created function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 2.0 );

	y = quantile( 0.3 );
	t.equal( y, 0.0, 'returns 0 for p inside [0,1]' );

	y = quantile( 0.9 );
	t.equal( y, 0.0, 'returns 0 for p inside [0,1]' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var quantile;
	var alpha;
	var delta;
	var beta;
	var tol;
	var p;
	var y;
	var i;

	expected = bothLarge.expected;
	p = bothLarge.p;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], beta[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var quantile;
	var alpha;
	var delta;
	var beta;
	var tol;
	var p;
	var y;
	var i;

	expected = largeShape.expected;
	p = largeShape.p;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], beta[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large rate parameter `beta`', function test( t ) {
	var expected;
	var quantile;
	var alpha;
	var delta;
	var beta;
	var tol;
	var p;
	var y;
	var i;

	expected = largeRate.expected;
	p = largeRate.p;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], beta[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/quantile/test/test.factory.js")
},{"./../lib/factory.js":22,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_rate.json":27,"./fixtures/julia/large_shape.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":159,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174,"tape":240}],30:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/quantile/test/test.js")
},{"./../lib":23,"tape":240}],31:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var quantile = require( './../lib' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a valid `alpha` and `beta`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a negative `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a non-positive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha` equal to `0.0`, the function returns `0.0` for  a valid `p`', function test( t ) {
	var y = quantile( 0.2, 0.0, 2.0 );
	t.equal( y, 0.0, 'returns 0' );
	y = quantile( 0.9, 0.0, 2.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = quantile( 1.1, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( -0.1, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile for `x` given large parameters `alpha` and `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var tol;
	var p;
	var y;
	var i;

	expected = bothLarge.expected;
	p = bothLarge.p;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var tol;
	var p;
	var y;
	var i;

	expected = largeShape.expected;
	p = largeShape.p;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var beta;
	var tol;
	var p;
	var y;
	var i;

	expected = largeRate.expected;
	p = largeRate.p;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/gamma/quantile/test/test.quantile.js")
},{"./../lib":23,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_rate.json":27,"./fixtures/julia/large_shape.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":159,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174,"tape":240}],32:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":135,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-to-words":151}],37:[function(require,module,exports){
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

},{"./cos_kernel.js":39,"./rem_pio2.js":41,"./sin_kernel.js":43,"@stdlib/math/base/utils/float64-get-high-word":139}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{"./cos.js":38}],41:[function(require,module,exports){
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

},{"./rem_pio2_kernel.js":42,"@stdlib/math/base/special/round":106,"@stdlib/math/base/utils/float64-from-words":135,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-get-low-word":141}],42:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":54,"@stdlib/math/base/special/ldexp":86}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/base/utils/float64-set-low-word":148,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],45:[function(require,module,exports){
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

},{"./erfc.js":44}],46:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/sqrt":117,"@stdlib/math/base/tools/evalrational":128,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],47:[function(require,module,exports){
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

},{"./erfcinv.js":46}],48:[function(require,module,exports){
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

},{"./expmulti.js":49,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":118,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":86,"@stdlib/math/base/tools/evalpoly":125}],50:[function(require,module,exports){
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

},{"./exp.js":48}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-set-high-word":146,"@stdlib/math/constants/float64-exponent-bias":161,"@stdlib/math/constants/float64-half-ln-two":162,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],52:[function(require,module,exports){
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

},{"./expm1.js":51}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"./floor.js":53}],55:[function(require,module,exports){
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

},{"./small_approximation.js":57,"./stirling_approximation.js":58,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/floor":54,"@stdlib/math/base/special/sin":108,"@stdlib/math/base/tools/evalrational":128,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pi":173,"@stdlib/math/constants/float64-pinf":174}],56:[function(require,module,exports){
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

},{"./gamma.js":55}],57:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":160}],58:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/pow":96,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/constants/float64-sqrt-two-pi":177}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":50}],60:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":45,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/sqrt":117,"@stdlib/math/constants/float64-pi":173}],61:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/pow":96,"@stdlib/math/constants/float64-max-ln":168,"@stdlib/math/constants/float64-min-ln":171}],62:[function(require,module,exports){
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

},{"./finite_gamma_q.js":59,"./finite_half_gamma_q.js":60,"./full_igamma_prefix.js":61,"./igamma_temme_large.js":64,"./lower_gamma_series.js":66,"./regularised_gamma_prefix.js":68,"./tgamma_small_upper_part.js":70,"./upper_gamma_fraction.js":71,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/floor":54,"@stdlib/math/base/special/gamma":56,"@stdlib/math/base/special/gammaln":85,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/pow":96,"@stdlib/math/constants/float64-max":169,"@stdlib/math/constants/float64-max-ln":168,"@stdlib/math/constants/float64-pinf":174,"@stdlib/math/constants/float64-sqrt-eps":176,"@stdlib/math/constants/float64-sqrt-two-pi":177}],63:[function(require,module,exports){
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

},{"@stdlib/math/base/special/expm1":52,"@stdlib/math/base/special/gamma":56,"@stdlib/math/base/special/gammaln":85,"@stdlib/math/base/special/log1p":90}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":45,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/sqrt":117,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/constants/float64-pi":173}],65:[function(require,module,exports){
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

},{"./gammainc.js":62}],66:[function(require,module,exports){
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

},{"./lower_incomplete_gamma_series":67,"@stdlib/math/base/tools/sum-series":131}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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
var lanczosSumExpGScaled = evalrational( NUM, DENOM );


// MAIN //

/**
* Computes (z^a)(e^-z)/tgamma(a).
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} (z^a)(e^-z)/tgamma(a)
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
	if ( a < 1 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimised against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= LOG_MIN_VALUE ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - ( z - gammaln( a ) ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100 && a > 150 ) {
		// Special case for large a and a ~ z:
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * (0.5 - G) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
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
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2 ) * exp( amz / 2 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4 > LOG_MIN_VALUE &&
				max(alz, amz)/4 < LOG_MAX_VALUE &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
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
		else {
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczosSumExpGScaled( a );
	return prefix;
} // end FUNCTION regularisedGammaPrefix()


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/gamma":56,"@stdlib/math/base/special/gammaln":85,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/log1p":90,"@stdlib/math/base/special/max":92,"@stdlib/math/base/special/min":94,"@stdlib/math/base/special/pow":96,"@stdlib/math/base/special/sqrt":117,"@stdlib/math/base/tools/evalrational":128,"@stdlib/math/constants/float64-e":158}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{"./gammap1m1.js":63,"./small_gamma2_series.js":69,"@stdlib/math/base/special/powm1":104,"@stdlib/math/base/tools/sum-series":131}],71:[function(require,module,exports){
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

},{"./upper_incomplete_gamma_fract":72,"@stdlib/math/base/tools/continued-fraction":122}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Computes the sum of a Chebyshev polynomial.
*
* @private
* @param {PositiveInteger} n - degree of polynomial
* @param {number} t - input value
* @param {Array} ak - coefficients of the Chebyshev polynomial
* @returns {number} Chebyshev sum
*/
function chepolsum( n, t, ak ) {
	var tt;
	var u0;
	var u1;
	var u2;
	var k;

	u0 = 0.0;
	u1 = 0.0;
	tt = t + t;
	k = n;
	do {
		u2 = u1;
		u1 = u0;
		u0 = ( tt*u1 ) - u2 + ak[ k ];
		k -= 1;
	} while ( k >= 0 );
	return ( u0 - u2 ) / 2.0;
} // end FUNCTION chepolsum()


// EXPORTS //

module.exports = chepolsum;

},{}],74:[function(require,module,exports){
/* eslint-disable max-statements */
'use strict';

// MODULES //

var debug = require( 'debug' )( 'gammaincinv:compute' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var min = require( '@stdlib/math/base/special/min' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var higherNewton = require( './higher_newton.js' );
var lambdaeta = require( './lambdaeta.js' );
var gamstar = require( './gamstar.js' );
var eps1 = require( './eps1.js' );
var eps2 = require( './eps2.js' );
var eps3 = require( './eps3.js' );


// VARIABLES //

var ONEO6 = 0.166666666666666666666666666667;
var ONEO12 = 0.0833333333333333333333333333333;
var ONEO24 = 0.0416666666666666666666666666667;


// MAIN //

/**
* This routine computes xr in the equations P(a,xr)=p and Q(a,xr)=q with a as a given positive parameter; p and q satisfy p+q=1. The equation is inverted with min(p,q).
*
* @private
* @param {number} a - scale value of incomplete gamma function
* @param {Probability} p - probability value
* @param {Probability} q - probability value
* @returns {number} solution of the equations P(a,xr)=p and Q(a,xr)=q with a as a given positive parameter.
*/
function compute( a, p, q ) {
	var ap1inv;
	var invfp;
	var lgama;
	var pcase;
	var porq;
	var ainv;
	var logr;
	var ap22;
	var ap14;
	var ap13;
	var ap12;
	var vgam;
	var vmin;
	var xini;
	var ap1;
	var ap2;
	var ap3;
	var eta;
	var p6;
	var p5;
	var x0;
	var ck;
	var a2;
	var L2;
	var L3;
	var L4;
	var b2;
	var b3;
	var p3;
	var a4;
	var fp;
	var p4;
	var p2;
	var a3;
	var xr;
	var b;
	var L;
	var i;
	var k;
	var m;
	var r;
	var s;
	var y;

	ck = new Array( 5 );
	if ( p < 0.5) {
		pcase = true;
		porq = p;
		s = -1;
	} else {
		pcase = false;
		porq = q;
		s = 1;
	}
	k = 0;
	if ( abs( a - 1 ) < 1e-4 ) {
		m = 0;
		if ( pcase ) {
			if ( p < 1e-3 ) {
				p2 = p * p;
				p3 = p2 * p;
				p4 = p3 * p;
				p5 = p4 * p;
				p6 = p5 * p;
				x0 = p + ( p2*0.5 ) + ( p3*(1/3) ) + ( p4*0.25 );
				x0 += ( p5*0.2 ) + ( p6*(1/6) );
			} else {
				x0 = -ln( 1 - p );
			}
		} else {
			x0 = -ln( q );
		}
		if ( a === 1 ) {
			k = 2;
			xr = x0;
		} else {
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( q < 1e-30 && a < 0.5 ) {
		m = 0;
		x0 = -ln( q * gamma(a) ) + ( ( a-1.0 ) * ln( -ln( q * gamma(a) ) ));
		k = 1;
		lgama = gammaln( a );
	}
	if ( a > 1.0 && a < 500.0 && p < 1e-80 ) {
		m = 0;
		ainv = 1.0 / a;
		ap1inv = 1.0 / ( a + 1.0 );
		x0 = ( gammaln( a+1.0 )+ ln( p ) ) * ainv;
		x0 = exp( x0 );
		xini = x0;
		for ( i = 0; i < 10; i++ ) {
			x0 = xini * exp( x0 * ainv ) * pow( 1.0 - ( x0*ap1inv ), ainv );
		}
		k = 1;
		lgama = gammaln( a );
	}

	logr = (1.0/a) * ( ln(p) + gammaln( a + 1 ) );
	if ( ( logr < ln( 0.2 * ( 1.0+a ) ) ) && ( k === 0 ) ) {
		r = exp( logr );
		m = 0;
		a2 = a * a;
		a3 = a2 * a;
		a4 = a3 * a;
		ap1 = a + 1;
		ap12 = ap1 * ap1;
		ap13 = ap1 * ap12;
		ap14 = ap12 * ap12;
		ap2 = a + 2;
		ap22 = ap2 * ap2;
		ap3 = a + 3;
		ck[ 0 ] = 1.0;
		ck[ 1 ] = 1.0 / ap1;
		ck[ 2 ] = 0.5 * ( ( 3.0*a ) + 5.0 ) / ( ap12 * ap2 );
		ck[ 3 ] = (1/3) * ( 31.0 + (8.0*a2) + (33.0*a) ) / ( ap13 * ap2 * ap3 );
		ck[ 4 ] = ONEO24 * ( 2888.0 + (1179.0*a3) + (125.0*a4) + (3971.0*a2) +
			(5661.0*a) ) / ( ap14 * ap22 * ap3 * ( a+4.0 ) );
		x0 = r * evalpoly( ck, r );
		lgama = gammaln( a );
		k = 1;
	}
	if ( ( a < 10.0 ) && ( k === 0 ) ) {
		vgam = sqrt( a ) / ( gamstar(a) * SQRT_TWO_PI );
		vmin = min( 0.02, vgam );
		if ( q < vmin ) {
			m = 0;
			b = 1.0 - a;
			b2 = b * b;
			b3 = b2 * b;
			eta = sqrt( -2.0/a * ln( q / vgam ) );
			x0 = a * lambdaeta(eta);
			L = ln( x0 );
			if ( x0 > 5 ) {
				L2 = L * L;
				L3 = L2 * L;
				L4 = L3 * L;
				r = 1.0 / x0;
				ck[ 0 ] = L - 1.0;
				ck[ 1 ] = ( (3.0*b) - (2.0*b*L) + L2 - ( 2.0*L ) + 2.0 ) * 0.5;
				ck[ 2 ] =( (24*b*L) - (11*b2) - (24*b) - (6*L2) + (12*L) -
					12.0 - (9*b*L2) + (6*b2*L) + (2*L3) ) * ONEO6;
				ck[ 3 ] = ( (-12*b3*L) + (84*b*L2) - (114*b2*L) + (72+(36*L2)) +
					(((3*L4)-(72*L)+162) * (b-(168*b*L))) - ((12*L3)+(25*b3)) -
					( (22*b*L3)+(36*b2*L2)+(120*b2) ) ) * ONEO12;
				ck[ 4 ] = 0.0;
				x0 = x0 - L + ( b*r*evalpoly( ck, r ) );
			} else {
				r = 1.0 / x0;
				L2 = L * L;
				ck[ 0 ] = L - 1.0;
				if ( ( L - ( b*r*ck[ 0 ] ) ) < x0 ) {
					x0 = x0 - L + ( b * r * ck[ 0 ] );
				}
			}
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( ( abs( porq - 0.5 ) < 1e-5 ) && ( k === 0 ) ) {
		m = 0;
		ainv = 1.0 / a;
		x0 = a - (1/3) + ( ( 0.0197530864197530864197530864198 +
			( 0.00721144424848128551832255535959 * ainv ) ) * ainv );
		lgama = gammaln( a );
		k = 1;
	}
	if ( ( a < 1 ) && ( k === 0 ) ) {
		m = 0;
		if (pcase) {
			x0 = exp( (1/a) * ( ln(porq) + gammaln(a+1) ) );
		} else {
			x0 = exp( (1/a) * ( ln(1-porq) + gammaln(a+1) ) );
		}
		lgama = gammaln( a );
		k = 1;
	}
	if ( k === 0 ) {
		m = 1;
		ainv = 1 / a;
		r = erfcinv( 2 * porq );
		eta = s * r / sqrt( a * 0.5 );
		if ( r < MAX_FLOAT32 ) {
			eta += ( eps1(eta) + ( (eps2(eta)+(eps3(eta)*ainv))*ainv ) ) * ainv;
			x0 = a * lambdaeta(eta);
			y = eta;
			fp = -sqrt( a / (2*PI) ) * exp( -0.5*a*y*y ) / ( gamstar(a) );
			invfp = 1 / fp;
		} else {
			debug( 'Warning: Overflow problems in one or more steps of the computation.' );
			return NaN;
		}
	}
	if ( k < 2 ) {
		xr = higherNewton( x0, a, m, p, q, lgama, invfp, pcase );
	}
	return xr;
} // end FUNCTION compute()


// EXPORTS //

module.exports = compute;

},{"./eps1.js":75,"./eps2.js":76,"./eps3.js":77,"./gamstar.js":79,"./higher_newton.js":80,"./lambdaeta.js":82,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/erfcinv":47,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/gamma":56,"@stdlib/math/base/special/gammaln":85,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/min":94,"@stdlib/math/base/special/pow":96,"@stdlib/math/base/special/sqrt":117,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/constants/float32-max":156,"@stdlib/math/constants/float64-pi":173,"@stdlib/math/constants/float64-sqrt-two-pi":177,"debug":189}],75:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );
var lambdaeta = require( './lambdaeta.js' );


// VARIABLES //

var AK = [
	-3.333333333438e-1,
	-2.070740359969e-1,
	-5.041806657154e-2,
	-4.923635739372e-3,
	-4.293658292782e-5
];
var BK = [
	1.000000000000e+0,
	7.045554412463e-1,
	2.118190062224e-1,
	3.048648397436e-2,
	1.605037988091e-3
];


// FUNCTIONS //

var rateval = evalrational.factory( AK, BK );


// MAIN //

/**
* Evaluates the `eps1` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps1( eta ) {
	var la;
	if ( abs( eta ) < 1.0 ) {
		return rateval( eta );
	}
	la = lambdaeta( eta );
	return ln( eta / ( la - 1.0 ) ) / eta;
} // end FUNCTION eps1()


// EXPORTS //

module.exports = eps1;

},{"./lambdaeta.js":82,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/tools/evalrational":128}],76:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var AK1 = [
	-1.72847633523e-2,
	-1.59372646475e-2,
	-4.64910887221e-3,
	-6.06834887760e-4,
	-6.14830384279e-6
];
var BK1 = [
	1.00000000000e+0,
	7.64050615669e-1,
	2.97143406325e-1,
	5.79490176079e-2,
	5.74558524851e-3
];

var AK2 = [
	-1.72839517431e-2,
	-1.46362417966e-2,
	-3.57406772616e-3,
	-3.91032032692e-4,
	2.49634036069e-6
];
var BK2 = [
	1.00000000000e+0,
	6.90560400696e-1,
	2.49962384741e-1,
	4.43843438769e-2,
	4.24073217211e-3
];

var AK3 = [
	9.99944669480e-1,
	1.04649839762e+2,
	8.57204033806e+2,
	7.31901559577e+2,
	4.55174411671e+1
];
var BK3 = [
	1.00000000000e+0,
	1.04526456943e+2,
	8.23313447808e+2,
	3.11993802124e+3,
	3.97003311219e+3
];


// FUNCTIONS //

var rateval1 = evalrational.factory( AK1, BK1 );
var rateval2 = evalrational.factory( AK2, BK2 );
var rateval3 = evalrational.factory( AK3, BK3 );


// MAIN //

/**
* Evaluates the `eps2` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps2( eta ) {
	var lnmeta;
	var x;
	if ( eta < -5.0 ) {
		x = eta * eta;
		lnmeta = ln( -eta );
		return ( 12.0 - x - ( 6.0*( lnmeta*lnmeta ) ) ) / ( 12.0 * x * eta );
	}
	else if ( eta < -2.0 ) {
		return rateval1( eta );
	}
	else if ( eta < 2.0 ) {
		return rateval2( eta );
	}
	else if ( eta < 1000.0 ) {
		x = 1.0 / eta;
		return rateval3( eta ) / ( -12.0 * eta );
	}
	return -1.0 / ( 12.0 * eta );
} // end FUNCTION eps2()


// EXPORTS //

module.exports = eps2;

},{"@stdlib/math/base/special/ln":88,"@stdlib/math/base/tools/evalrational":128}],77:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var ak1 = [
	4.95346498136e-2,
	2.99521337141e-2,
	6.88296911516e-3,
	5.12634846317e-4,
	-2.01411722031e-5
];
var bk1 = [
	1.00000000000e+0,
	7.59803615283e-1,
	2.61547111595e-1,
	4.64854522477e-2,
	4.03751193496e-3
];

var ak2 = [
	4.52313583942e-3,
	1.20744920113e-3,
	-7.89724156582e-5,
	-5.04476066942e-5,
	-5.35770949796e-6
];
var bk2 = [
	1.00000000000e+0,
	9.12203410349e-1,
	4.05368773071e-1,
	9.01638932349e-2,
	9.48935714996e-3
];

var ak3 = [
	4.39937562904e-3,
	4.87225670639e-4,
	-1.28470657374e-4,
	5.29110969589e-6,
	1.57166771750e-7
];
var bk3 = [
	1.00000000000e+0,
	7.94435257415e-1,
	3.33094721709e-1,
	7.03527806143e-2,
	8.06110846078e-3
];

var ak4 = [
	-1.14811912320e-3,
	-1.12850923276e-1,
	1.51623048511e+0,
	-2.18472031183e-1,
	7.30002451555e-2
];
var bk4 = [
	1.00000000000e+0,
	1.42482206905e+1,
	6.97360396285e+1,
	2.18938950816e+2,
	2.77067027185e+2
];

var ak5 = [
	-1.45727889667e-4,
	-2.90806748131e-1,
	-1.33085045450e+1,
	1.99722374056e+2,
	-1.14311378756e+1
];
var bk5 = [
	1.00000000000e+0,
	1.39612587808e+2,
	2.18901116348e+3,
	7.11524019009e+3,
	4.55746081453e+4
];


// FUNCTIONS //

var rational1 = evalrational.factory( ak1, bk1 );
var rational2 = evalrational.factory( ak2, bk2 );
var rational3 = evalrational.factory( ak3, bk3 );
var rational4 = evalrational.factory( ak4, bk4 );
var rational5 = evalrational.factory( ak5, bk5 );


// MAIN //

/**
* Evaluates the `eps3` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps3( eta ) {
	var eta3;
	var x;
	var y;

	if ( eta < -8.0 ) {
		x = eta * eta;
		y = ln( -eta ) / eta;
		return ( -30.0 + ( eta*y*( (6.0*x*y*y) - 12.0+x ) ) ) /
			( 12.0 * eta * x * x );
	}
	else if ( eta < -4.0 ) {
		return rational1( eta ) / ( eta * eta );
	}
	else if ( eta < -2.0 ) {
		return rational2( eta );
	}
	else if ( eta < 2.0 ) {
		return rational3( eta );
	}
	else if ( eta < 10.0 ) {
		x = 1.0 / eta;
		return rational4( x ) / ( eta * eta );
	}
	else if ( eta < 100.0 ) {
		x = 1.0 / eta;
		return rational5( x ) / ( eta * eta );
	}
	eta3 = eta * eta * eta;
	return -ln( eta ) / ( 12.0 * eta3 );
} // end FUNCTION eps3()


// EXPORTS //

module.exports = eps3;

},{"@stdlib/math/base/special/ln":88,"@stdlib/math/base/tools/evalrational":128}],78:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var FLOAT32_SMALLEST = require( '@stdlib/math/constants/float32-smallest-normal' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var compute = require( './compute.js' );


// MAIN //

/*
* Translated from the Fortran module by
* ----------------------------------------------------------------------
* Authors:
*  Amparo Gil    (U. Cantabria, Santander, Spain)
*                 e-mail: amparo.gil@unican.es
*  Javier Segura (U. Cantabria, Santander, Spain)
*                 e-mail: javier.segura@unican.es
*  Nico M. Temme (CWI, Amsterdam, The Netherlands)
*                 e-mail: nico.temme@cwi.nl
* ---------------------------------------------------------------------
*/

/**
* Inverts the lower gamma function, i.e. computes xr such that P(a,xr) = p.
*
* #### Method
*
* The present code uses different methods of computation depending on the values of the input values: Taylor, asymptotic expansions and high-order Newton methods.
*
* #### Notes
*
* * The claimed accuracy obtained using this inversion routine is near 1e-12.
*
* #### References
*
* * A. Gil, J. Segura and N.M. Temme, GammaCHI: a package for the inversion and computation of the gamma and chi-square distribution functions (central and noncentral). Computer Physics Commun
* * A. Gil, J. Segura and N.M. Temme. Efficient and accurate algorithms for the computation and inversion of the incomplete gamma function ratios. SIAM J Sci Comput. (2012) 34(6), A2965-A2981
*
* @param {Probability} p - probability value
* @param {number} a - scale parameter
* @param {boolean} [upper=false] - boolean indicating if the function should invert the upper tail of the incomplete gamma function instead, i.e. compute xr such that Q(a,xr)=p.
* @returns {number} function value of the inverse
*/
function gammaincinv( p, a, upper ) {
	if ( isnan( p ) || isnan( a ) ) {
		return NaN;
	}
	if ( a < FLOAT32_SMALLEST ) {
		return NaN;
	}
	if ( p > 1.0 || p < 0.0 ) {
		return NaN;
	}
	if ( upper === true ) {
		// Case: Invert upper gamma function...
		if ( p === 0.0 ) {
			return PINF;
		} else if ( p === 1.0 ) {
			return 0.0;
		}
		return compute( a, 1.0 - p, p );
	}
	// Default: Invert lower gamma function
	if ( p === 0.0 ) {
		return 0.0;
	} else if ( p === 1.0 ) {
		return PINF;
	}
	return compute( a, p, 1.0 - p );
} // end FUNCTION gammaincinv()


// EXPORTS //

module.exports = gammaincinv;

},{"./compute.js":74,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float32-smallest-normal":157,"@stdlib/math/constants/float64-pinf":174}],79:[function(require,module,exports){
'use strict';

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var ln = require( '@stdlib/math/base/special/ln' );
var FLOAT32_MAX = require( '@stdlib/math/constants/float32-max' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var stirling = require( './stirling.js' );


// MAIN //

/**
* Computes the regulated gamma function.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamstar( x ) {
	if ( x >= 3.0 ) {
		return exp( stirling(x) );
	}
	else if ( x > 0.0 ) {
		return gamma(x) / ( exp( -x + ( ( x-0.5 ) * ln(x) ) ) * SQRT_TWO_PI );
	}
	// Case: x <= 0.0
	return FLOAT32_MAX;
} // end FUNCTION gamstar()


// EXPORTS //

module.exports = gamstar;

},{"./stirling.js":83,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/gamma":56,"@stdlib/math/base/special/ln":88,"@stdlib/math/constants/float32-max":156,"@stdlib/math/constants/float64-sqrt-two-pi":177}],80:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'gammaincinv:higher_newton' );
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );


// MAIN //

/**
* Implementation of the high order Newton-like method.
*
* @private
* @param {number} x0 - initial value
* @param {number} a - scale parameter
* @param {number} m - indicator
* @param {Probability} p - probability value
* @param {Probability} q - probability value
* @param {number} lgama - logarithm of scale parameter
* @param {number} invfp - one over `fp`
* @param {boolean} pcase - boolean indicating whether p < 0.5
* @returns {number} function value of the inverse
*/
function higherNewton( x0, a, m, p, q, lgama, invfp, pcase ) {
	var dlnr;
	var xini;
	var ck0;
	var ck1;
	var ck2;
	var a2;
	var x2;
	var px;
	var qx;
	var xr;
	var t;
	var n;
	var r;
	var x;

	x = x0;
	t = 1;
	n = 1;
	a2 = a * a;
	xini = x0;
	do {
		x = x0;
		x2 = x * x;
		if ( m === 0 ) {
			dlnr = ( ( 1.0-a ) * ln( x ) ) + x + lgama;
			if ( dlnr > ln( MAX_FLOAT32 ) ) {
				debug( 'Warning: overflow problems in one or more steps of the computation. The initial approximation to the root is returned.' );
				return xini;
			}
			r = exp( dlnr );
		} else {
			r = -invfp * x;
		}
		if ( pcase ) {
			// gammainc( x, s[, regularized = true ][, upper = false ] )
			px = gammainc( x, a, true, false );
			ck0 = -r * ( px - p );
		} else {
			// gammainc( x, s[, regularized = true ][, upper = true ] )
			qx = gammainc( x, a, true, true );
			ck0 = r * ( qx - q );
		}
		r = ck0;
		if ( ( p > 1e-120 ) || ( n > 1 ) ) {
			ck1 = 0.5 * ( x - a + 1.0 ) / x;
			ck2 = ( (2*x2) - (4*x*a) + (4*x) + (2*a2) - (3*a) + 1 ) / x2;
			ck2 /= 6.0;
			x0 = x + ( r * ( 1.0 + ( r * ( ck1 + (r*ck2) ) ) ) );
		} else {
			x0 = x + r;
		}
		t = abs( ( x/x0 ) - 1.0 );
		n += 1;
		x = x0;
		if ( x < 0 ) {
			x = xini;
			n = 100;
		}
	} while ( ( ( t > 2e-14 ) && ( n < 35 ) ) );
	if ( ( t > 2e-14 ) || ( n > 99 ) ) {
		debug( 'Warning: the number of iterations in the Newton method reached the upper limit N=35. The last value obtained for the root is given as output.' );
	}
	xr = x || 0;
	return xr;
} // end FUNCTION higherNewton()


// EXPORTS //

module.exports = higherNewton;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/gammainc":65,"@stdlib/math/base/special/ln":88,"@stdlib/math/constants/float32-max":156,"debug":189}],81:[function(require,module,exports){
'use strict';

/**
* Computes the inverse of the lower incomplete gamma function
*
* @module @stdlib/math/base/special/gammaincinv
*
* @example
* var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
*
* var val = gammaincinv( 0.5, 2.0 );
* // returns ~1.678
*
* val = gammaincinv( 0.1, 10.0 );
* // returns ~6.221
*
* val = gammaincinv( 0.75, 3.0 );
* // returns ~3.92
*
* val = gammaincinv( 0.75, 3.0, true );
* // returns ~1.727
*
* val = gammaincinv( 0.75, NaN );
* // returns NaN
*
* val = gammaincinv( NaN, 3.0 );
* // returns NaN
*/

// MODULES //

var gammaincinv = require( './gammaincinv.js' );


// EXPORTS //

module.exports = gammaincinv;

},{"./gammaincinv.js":78}],82:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );


// VARIABLES //

var ONEO12 = 0.0833333333333333333333333333333;
var ONEO120 = 0.00833333333333333333333333333333;

var AK1 = [
	0,
	1.0,
	1.0,
	1.5,
	2.66666666666666666666666666667,
	5.20833333333333333333333333333,
	10.8
];

var AK2 = [
	1.0,
	1.0,
	0.333333333333333333333333333333,
	0.0277777777777777777777777777778,
	-0.00370370370370370370370370370370,
	0.000231481481481481481481481481481,
	0.0000587889476778365667254556143445
];


// FUNCTIONS //

var polyval1 = evalpoly.factory( AK1 );
var polyval2 = evalpoly.factory( AK2 );


// MAIN //

/**
* Returns the positive number satisfying eta^2/2=lambda-1-ln(lambda) with sign(lambda-1)=sign(eta);
*
* @private
* @param {number} eta - eta value
* @returns {number} value satisfying equation
*/
function lambdaeta( eta ) {
	var L2;
	var L3;
	var L4;
	var L5;
	var ak;
	var la;
	var L;
	var q;
	var r;
	var s;

	ak = new Array( 6 );
	s = eta * eta * 0.5;
	if ( eta === 0.0 ) {
		la = 0.0;
	}
	else if ( eta < -1.0 ) {
		r = exp( -1.0 - s );
		la = polyval1( r );
	}
	else if ( eta < 1.0 ) {
		r = eta;
		la = polyval2( r );
	}
	else {
		r = 11.0 + s;
		L = ln( r );
		la = r + L;
		r = 1.0 / r;
		L2 = L * L;
		L3 = L2 * L;
		L4 = L3 * L;
		L5 = L4 * L;
		ak[ 0 ] = 1.0;
		ak[ 1 ] = ( 2.0-L ) * 0.5;
		ak[ 2 ] = ( ( -9.0*L ) + 6.0 + ( 2.0*L2 ) ) / 6.0;
		ak[ 4 ] = ( 60.0 + (350.0*L2) - (300.0*L) - (125.0*L3) + (12.0*L4) );
		ak[ 4 ] /= 60.0;
		ak[ 3 ] = -( (3*L3)+ (36*L) - (22*L2) - 12 ) * ONEO12;
		ak[ 5 ] = -(-120 - (274*L4) + (900*L) -
			(1700*L2) + (1125*L3) + (20*L5));
		ak[ 5 ] *= ONEO120;
		la += ( L * r * evalpoly( ak, r ) );
	}
	r = 1.0;
	if ( ( eta > -3.5 && eta < -0.03 ) || ( eta > 0.03 && eta < 40.0 ) ) {
		r = 1.0;
		q = la;
		do {
			la = q * ( s + ln(q) ) / ( q - 1.0 );
			r = abs( ( q/la ) - 1.0 );
			q = la;
		} while ( r > 1e-8 );
	}
	return la;
} // end FUNCTION lambdaeta()


// EXPORTS //

module.exports = lambdaeta;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/tools/evalpoly":125}],83:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
var SMALLEST_FLOAT32 = require( '@stdlib/math/constants/float32-smallest-normal' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );
var chepolsum = require( './chepolsum.js' );


// Polyomial coefficients:

var A = [
	1.996379051590076518221,
	-0.17971032528832887213e-2,
	0.131292857963846713e-4,
	-0.2340875228178749e-6,
	0.72291210671127e-8,
	-0.3280997607821e-9,
	0.198750709010e-10,
	-0.15092141830e-11,
	0.1375340084e-12,
	-0.145728923e-13,
	0.17532367e-14,
	-0.2351465e-15,
	0.346551e-16,
	-0.55471e-17,
	0.9548e-18,
	-0.1748e-18,
	0.332e-19,
	-0.58e-20
];

var C = [
	0.25721014990011306473e-1,
	0.82475966166999631057e-1,
	-0.25328157302663562668e-2,
	0.60992926669463371e-3,
	-0.33543297638406e-3,
	0.250505279903e-3
];
var C6 = 0.30865217988013567769;

var D = [
	0.0833333333333333333333333333333,
	-0.00277777777777777777777777777778,
	0.000793650793650793650793650793651,
	-0.000595238095238095238095238095238
];


// FUNCTIONS //

var polyval1 = evalpoly.factory( C );
var polyval2 = evalpoly.factory( D );


// MAIN //

/**
* Computes the stirling series corresponding with asymptotic series for log(gamma(x)), that is:  1/(12x)-1/(360x**3)...; x>= 3}
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function stirling( x ) {
	var z;
	if ( x < SMALLEST_FLOAT32 ) {
		return MAX_FLOAT32;
	}
	else if ( x < 1.0 ) {
		return gammaln( x+1.0 ) - ( (x+0.5) * ln(x) ) + x - LN_SQRT_TWO_PI;
	}
	else if ( x < 2.0 ) {
		return gammaln( x ) - ( (x-0.5) * ln(x) ) + x - LN_SQRT_TWO_PI;
	}
	else if ( x < 3.0 ) {
		return gammaln( x-1.0 ) - ( (x-0.5) * ln(x) ) + x -
			LN_SQRT_TWO_PI + ln( x-1.0 );
	}
	else if ( x < 12.0 ) {
		z = ( 18.0 / ( x * x ) ) - 1.0;
		return chepolsum( 17, z, A ) / ( 12.0 * x );
	}
	z = 1.0 / ( x * x );
	if ( x < 1000.0 ) {
		return polyval1( z ) / ( C6 + z ) / x;
	}
	return polyval2( z ) / x;
} // end FUNCTION stirling()


// EXPORTS //

module.exports = stirling;

},{"./chepolsum.js":73,"@stdlib/math/base/special/gammaln":85,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/constants/float32-max":156,"@stdlib/math/constants/float32-smallest-normal":157,"@stdlib/math/constants/float64-ln-sqrt-two-pi":164}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/sinpi":115,"@stdlib/math/base/special/trunc":118,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/constants/float64-pi":173,"@stdlib/math/constants/float64-pinf":174}],85:[function(require,module,exports){
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

},{"./gammaln.js":84}],86:[function(require,module,exports){
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

},{"./ldexp.js":87}],87:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":37,"@stdlib/math/base/utils/float64-exponent":133,"@stdlib/math/base/utils/float64-from-words":135,"@stdlib/math/base/utils/float64-normalize":143,"@stdlib/math/base/utils/float64-to-words":151,"@stdlib/math/constants/float64-exponent-bias":161,"@stdlib/math/constants/float64-max-base2-exponent":167,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":166,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":170,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],88:[function(require,module,exports){
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

},{"./ln.js":89}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-set-high-word":146,"@stdlib/math/base/utils/float64-to-words":151,"@stdlib/math/constants/float64-exponent-bias":161,"@stdlib/math/constants/float64-ninf":172}],90:[function(require,module,exports){
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

},{"./log1p.js":91}],91:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-set-high-word":146,"@stdlib/math/constants/float64-exponent-bias":161,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],92:[function(require,module,exports){
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

},{"./max.js":93}],93:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],94:[function(require,module,exports){
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

},{"./min.js":95}],95:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],96:[function(require,module,exports){
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

},{"./pow.js":99}],97:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-set-high-word":146,"@stdlib/math/base/utils/float64-set-low-word":148,"@stdlib/math/constants/float64-exponent-bias":161}],98:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/base/utils/float64-set-low-word":148}],99:[function(require,module,exports){
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

},{"./log2ax.js":97,"./logx.js":98,"./pow2.js":100,"./x_is_zero.js":101,"./y_is_huge.js":102,"./y_is_infinite.js":103,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/sqrt":117,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-get-low-word":141,"@stdlib/math/base/utils/float64-set-low-word":148,"@stdlib/math/base/utils/float64-to-words":151,"@stdlib/math/base/utils/uint32-to-int32":154,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],100:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":86,"@stdlib/math/base/tools/evalpoly":125,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-set-high-word":146,"@stdlib/math/base/utils/float64-set-low-word":148,"@stdlib/math/base/utils/uint32-to-int32":154,"@stdlib/math/constants/float64-exponent-bias":161,"@stdlib/math/constants/float64-ln-two":165}],101:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":37,"@stdlib/math/constants/float64-ninf":172,"@stdlib/math/constants/float64-pinf":174}],102:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":139}],103:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-pinf":174}],104:[function(require,module,exports){
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

},{"./powm1.js":105}],105:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/expm1":52,"@stdlib/math/base/special/ln":88,"@stdlib/math/base/special/pow":96,"@stdlib/math/base/special/trunc":118}],106:[function(require,module,exports){
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

},{"./round.js":107}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{"./sin.js":114}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":54,"@stdlib/math/base/special/ldexp":86}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{"./kernel_rem_pio2.js":110,"./rem_pio2_medium.js":113,"@stdlib/math/base/utils/float64-from-words":135,"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/base/utils/float64-get-low-word":141}],113:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":106,"@stdlib/math/base/utils/float64-get-high-word":139}],114:[function(require,module,exports){
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

},{"./kernel_cos.js":109,"./kernel_sin.js":111,"./rem_pio2.js":112,"@stdlib/math/base/utils/float64-get-high-word":139}],115:[function(require,module,exports){
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

},{"./sinpi.js":116}],116:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/copysign":37,"@stdlib/math/base/special/cos":40,"@stdlib/math/base/special/sin":108,"@stdlib/math/constants/float64-pi":173}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"./trunc.js":119}],119:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":35,"@stdlib/math/base/special/floor":54}],120:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float32-smallest-normal":157,"@stdlib/math/constants/float64-eps":159}],121:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float32-smallest-normal":157,"@stdlib/math/constants/float64-eps":159}],122:[function(require,module,exports){
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

},{"./basic.js":120,"./generators.js":121,"@stdlib/utils/detect-generator-support":181}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{"./evalpoly.js":123}],125:[function(require,module,exports){
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

},{"./evalpoly.js":123,"./factory.js":124,"@stdlib/utils/define-read-only-property":179}],126:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33}],127:[function(require,module,exports){
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

},{"./evalrational.js":126}],128:[function(require,module,exports){
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

},{"./evalrational.js":126,"./factory.js":127,"@stdlib/utils/define-read-only-property":179}],129:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":159}],130:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":159}],131:[function(require,module,exports){
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

},{"./basic.js":129,"./generators.js":130,"@stdlib/utils/detect-generator-support":181}],132:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":139,"@stdlib/math/constants/float64-exponent-bias":161,"@stdlib/math/constants/float64-high-word-exponent-mask":163}],133:[function(require,module,exports){
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

},{"./exponent.js":132}],134:[function(require,module,exports){
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

},{"./indices.js":136}],135:[function(require,module,exports){
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

},{"./from_words.js":134}],136:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],137:[function(require,module,exports){
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

},{"./high.js":138}],138:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],139:[function(require,module,exports){
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

},{"./get_high_word.js":137}],140:[function(require,module,exports){
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

},{"./low.js":142}],141:[function(require,module,exports){
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

},{"./get_low_word.js":140}],142:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],143:[function(require,module,exports){
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

},{"./normalize.js":144}],144:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-smallest-normal":175}],145:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":138}],146:[function(require,module,exports){
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

},{"./set_high_word.js":147}],147:[function(require,module,exports){
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

},{"./high.js":145}],148:[function(require,module,exports){
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

},{"./set_low_word.js":150}],149:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":142}],150:[function(require,module,exports){
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

},{"./low.js":149}],151:[function(require,module,exports){
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

},{"./to_words.js":153}],152:[function(require,module,exports){
arguments[4][136][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":136}],153:[function(require,module,exports){
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

},{"./indices.js":152}],154:[function(require,module,exports){
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

},{"./uint32_to_int32.js":155}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
'use strict';

/**
* Maximum single-precision floating-point number.
*
* @module @stdlib/math/constants/float32-max
* @type {number}
*
* @example
* var FLOAT32_MAX = require( '@stdlib/math/constants/float32-max' );
* // returns 3.4028234663852886e+38
*/


// MAIN //

/**
* The maximum single-precision floating-point number is given by
*
* ``` tex
* 2^{127} (2 - 2^{-23})
* ```
*
* @constant
* @type {number}
* @default 3.4028234663852886e+38
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_MAX = 3.4028234663852886e+38;


// EXPORTS //

module.exports = FLOAT32_MAX;

},{}],157:[function(require,module,exports){
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


},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the square root of `2π`.
*
* @module @stdlib/math/constants/float64-ln-sqrt-two-pi
* @type {number}
*
* @example
* var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
* // returns 0.9189385332046728
*/


// MAIN //

/**
* Natural logarithm of the square root of `2π`.
*
* ``` tex
* \ln \sqrt{2\pi}
* ```
*
* @constant
* @type {number}
* @default 0.9189385332046728
*/
var LN_SQRT_TWO_PI = 9.18938533204672741780329736405617639861397473637783412817151540482765695927260397694743298635954197622005646625e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN_SQRT_TWO_PI;

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{"./define_read_only_property.js":178}],180:[function(require,module,exports){
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

},{"@stdlib/utils/eval":182}],181:[function(require,module,exports){
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

},{"./detect_generator_support.js":180}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){

},{}],185:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"dup":184}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{"base64-js":183,"ieee754":208}],188:[function(require,module,exports){
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
},{"../../is-buffer/index.js":210}],189:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require('_process'))
},{"./debug":190,"_process":186}],190:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":212}],191:[function(require,module,exports){
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

},{"./lib/is_arguments.js":192,"./lib/keys.js":193}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],194:[function(require,module,exports){
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

},{"foreach":204,"object-keys":214}],195:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],196:[function(require,module,exports){
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

},{"./helpers/isFinite":197,"./helpers/isNaN":198,"./helpers/mod":199,"./helpers/sign":200,"es-to-primitive/es5":201,"has":207,"is-callable":211}],197:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],198:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],199:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],200:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],201:[function(require,module,exports){
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

},{"./helpers/isPrimitive":202,"is-callable":211}],202:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){

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


},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":205}],207:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":206}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{"./isArguments":215}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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
},{"_process":186}],217:[function(require,module,exports){
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
},{"_process":186}],218:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":219}],219:[function(require,module,exports){
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
},{"./_stream_readable":221,"./_stream_writable":223,"core-util-is":188,"inherits":209,"process-nextick-args":217}],220:[function(require,module,exports){
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
},{"./_stream_transform":222,"core-util-is":188,"inherits":209}],221:[function(require,module,exports){
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
},{"./_stream_duplex":219,"./internal/streams/BufferList":224,"./internal/streams/destroy":225,"./internal/streams/stream":226,"_process":186,"core-util-is":188,"events":203,"inherits":209,"isarray":227,"process-nextick-args":217,"safe-buffer":234,"string_decoder/":228,"util":184}],222:[function(require,module,exports){
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
},{"./_stream_duplex":219,"core-util-is":188,"inherits":209}],223:[function(require,module,exports){
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
},{"./_stream_duplex":219,"./internal/streams/destroy":225,"./internal/streams/stream":226,"_process":186,"core-util-is":188,"inherits":209,"process-nextick-args":217,"safe-buffer":234,"util-deprecate":246}],224:[function(require,module,exports){
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
},{"safe-buffer":234}],225:[function(require,module,exports){
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
},{"process-nextick-args":217}],226:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":203}],227:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],228:[function(require,module,exports){
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
},{"safe-buffer":234}],229:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":230}],230:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":219,"./lib/_stream_passthrough.js":220,"./lib/_stream_readable.js":221,"./lib/_stream_transform.js":222,"./lib/_stream_writable.js":223}],231:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":230}],232:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":223}],233:[function(require,module,exports){
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
},{"_process":186,"through":245}],234:[function(require,module,exports){
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

},{"buffer":187}],235:[function(require,module,exports){
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

},{"events":203,"inherits":209,"readable-stream/duplex.js":218,"readable-stream/passthrough.js":229,"readable-stream/readable.js":230,"readable-stream/transform.js":231,"readable-stream/writable.js":232}],236:[function(require,module,exports){
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

},{"es-abstract/es5":196,"function-bind":206}],237:[function(require,module,exports){
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

},{"./implementation":236,"./polyfill":238,"./shim":239,"define-properties":194,"function-bind":206}],238:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":236}],239:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":238,"define-properties":194}],240:[function(require,module,exports){
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
},{"./lib/default_stream":241,"./lib/results":243,"./lib/test":244,"_process":186,"defined":195,"through":245}],241:[function(require,module,exports){
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
},{"_process":186,"fs":185,"through":245}],242:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":186}],243:[function(require,module,exports){
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
},{"_process":186,"events":203,"function-bind":206,"has":207,"inherits":209,"object-inspect":213,"resumer":233,"through":245}],244:[function(require,module,exports){
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
},{"./next_tick":242,"deep-equal":191,"defined":195,"events":203,"has":207,"inherits":209,"path":216,"string.prototype.trim":237}],245:[function(require,module,exports){
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
},{"_process":186,"stream":235}],246:[function(require,module,exports){
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
