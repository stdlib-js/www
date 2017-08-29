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

},{"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":40}],10:[function(require,module,exports){
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

},{"./is_odd.js":13}],13:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":4}],14:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (logCDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 5.0 );
*
* var y = logcdf( 3.0 );
* // returns Number.NEGATIVE_INFINITY
*
* y = logcdf( 6.0 );
* // returns 0.0
*
* y = logcdf( NaN )
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return nan;
	}
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (logCDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of cumulative distribution function
	*
	* @example
	* var y = logcdf( 10.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x < mu ) ? NINF : 0.0;
	} // end FUNCTION logcdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":17,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":94}],15:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dist/degenerate/logcdf
*
* @example
* var logcdf = require( '@stdlib/math/base/dist/degenerate/logcdf' );
*
* var y = logcdf( 2.0, 5.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var factory = require( '@stdlib/math/base/dist/degenerate/logcdf' ).factory;
*
* var logcdf = factory( 5.0 );
*
* var y = logcdf( 3.0 );
* // returns Number.NEGATIVE_INFINITY
*
* y = logcdf( 6.0 );
* // returns 0.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":14,"./logcdf.js":16,"@stdlib/utils/define-read-only-property":98}],16:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (logCDF) for a degenerate distribution with mean `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {number} natural logarithm of cumulative distribution function
*
* @example
* var y = logcdf( 2.0, 3.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var y = logcdf( 4.0, 3.0 );
* // returns 0.0
* @example
* var y = logcdf( 3.0, 3.0 );
* // returns 0.0
* @example
* var y = logcdf( NaN, 0.0 );
* // returns NaN
* @example
* var y = logcdf( 0.0, NaN );
* // returns NaN
*/
function logcdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x < mu ) ? NINF : 0.0;
} // end FUNCTION logcdf()


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-ninf":94}],17:[function(require,module,exports){
'use strict';

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a degenerate distribution with an invalid constant value.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = logcdf( 3.14 );
* // returns NaN
*/
function logcdf() {
	return NaN;
} // end FUNCTION logcdf()


// EXPORTS //

module.exports = logcdf;

},{}],18:[function(require,module,exports){
'use strict';

// MODULES //

var degenerate = require( '@stdlib/math/base/dist/degenerate/logcdf' ).factory;
var expm1 = require( '@stdlib/math/base/special/expm1' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var LNHALF = require( '@stdlib/math/constants/float64-ln-half' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma`.
*
* @param {NonNegativeNumber} sigma - scale parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 2.0 );
* var y = logcdf( 3.0 );
* // returns ~-0.393
*
* y = logcdf( 1.0 );
* // returns ~-2.137
*/
function factory( sigma ) {
	var s2;
	if ( isnan( sigma ) || sigma < 0.0 ) {
		return nan;
	}
	if ( sigma === 0.0 ) {
		return degenerate( 0.0 );
	}
	s2 = pow( sigma, 2.0 );
	return logcdf;

	/**
	* Evaluates the logarithm of the cumulative distribution function (CDF) for a Rayleigh distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*
	* @example
	* var y = logcdf( 2 );
	* // returns <number>
	*/
	function logcdf( x ) {
		var p;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 ) {
			return NINF;
		}
		p = -pow( x, 2.0 ) / ( 2.0 * s2 );
		return p < LNHALF ? log1p( -exp( p ) ) : ln( -expm1( p ) );
	} // end FUNCTION logcdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":21,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/degenerate/logcdf":15,"@stdlib/math/base/special/exp":36,"@stdlib/math/base/special/expm1":38,"@stdlib/math/base/special/ln":43,"@stdlib/math/base/special/log1p":45,"@stdlib/math/base/special/pow":47,"@stdlib/math/constants/float64-ln-half":89,"@stdlib/math/constants/float64-ninf":94}],19:[function(require,module,exports){
'use strict';

/**
* Rayleigh distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dist/rayleigh/logcdf
*
* @example
* var logcdf = require( '@stdlib/math/base/dist/rayleigh/logcdf' );
*
* var y = logcdf( 2.0, 5.0 );
* // returns ~-2.564
*
* var mylogcdf = logcdf.factory( 0.5 );
* y = mylogcdf( 1.0 );
* // returns ~-0.145
*
* y = mylogcdf( 0.5 );
* // returns ~-0.934
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":18,"./logcdf.js":20,"@stdlib/utils/define-read-only-property":98}],20:[function(require,module,exports){
'use strict';

// MODULES //

var expm1 = require( '@stdlib/math/base/special/expm1' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var LNHALF = require( '@stdlib/math/constants/float64-ln-half' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} sigma - scale parameter
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 2.0, 3.0 );
* // returns ~-1.614
* @example
* var y = logcdf( 1.0, 2.0 );
* // returns ~-2.137
* @example
* var y = logcdf( -1.0, 4.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var y = logcdf( NaN, 1.0 );
* // returns NaN
* @example
* var y = logcdf( 0.0, NaN );
* // returns NaN
* @example
* // Negative scale parameter:
* var y = logcdf( 2.0, -1.0 );
* // returns NaN
*/
function logcdf( x, sigma ) {
	var s2;
	var p;
	if (
		isnan( x ) ||
		isnan( sigma ) ||
		sigma < 0.0
	) {
		return NaN;
	}
	if ( sigma === 0.0 ) {
		return x < 0.0 ? NINF : 0.0;
	}
	if ( x < 0.0 ) {
		return NINF;
	}
	s2 = pow( sigma, 2.0 );
	p = -pow( x, 2.0 ) / ( 2.0 * s2 );
	return p < LNHALF ? log1p( -exp( p ) ) : ln( -expm1( p ) );
} // end FUNCTION logcdf()


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":36,"@stdlib/math/base/special/expm1":38,"@stdlib/math/base/special/ln":43,"@stdlib/math/base/special/log1p":45,"@stdlib/math/base/special/pow":47,"@stdlib/math/constants/float64-ln-half":89,"@stdlib/math/constants/float64-ninf":94}],21:[function(require,module,exports){
'use strict';

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for an invalid Rayleigh distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = logcdf( 2.1 );
* // returns NaN
*/
function logcdf() {
	return NaN;
} // end FUNCTION logcdf()


// EXPORTS //

module.exports = logcdf;

},{}],22:[function(require,module,exports){
module.exports={"sigma":[36.541371727214965,0.20367024808776168,37.95762801452136,41.93755488105706,23.262913922258686,31.255333997892308,26.89143739158162,13.147933573896397,21.560630381706936,44.03705663724556,0.17363344158328742,32.21646436576001,37.18096248319897,20.84010860177464,7.597854376880364,36.158218860102,1.1319650407353832,47.4019975968794,19.633985319838366,37.8787007246876,14.79225438713716,18.935199318033426,17.643798420421653,35.881778957007036,34.76969102245525,3.865929324184736,22.157915436017063,13.919391806980597,26.956642957711395,6.866267327017872,7.802601794849395,43.75899413162993,9.35645699238904,11.905158689362338,12.374980452228101,8.023288657713168,16.1450503063838,24.244775192529445,3.247493252165623,14.594437504291935,0.7298060363239323,40.81566809581235,1.8510787163080633,10.651834661813686,29.788784853318994,3.999118349740116,11.46206094689327,38.28818160147678,3.270456294828328,10.464032024030923,45.9602863644094,17.388428539271317,5.298742174484705,19.24638938392308,3.004226441715585,8.723179362772404,48.89474807189224,26.688787749737507,3.06289892927033,3.244340388666622,29.90259116525974,22.526208715547615,33.09060692990906,21.54010881386277,3.346618603496254,29.64514278580539,44.609335541320974,42.784281327349305,14.821847987698533,13.014696113269885,6.035163985620651,44.227339234203576,4.64840307994574,38.65965624921856,32.031115276452596,33.06767884525279,21.26319866384323,28.96559836206395,38.2874221855693,2.2148774070806176,26.773607484368934,42.3028316235259,8.408745669723727,42.593012534802696,11.359761512553824,46.835981545148364,9.80885381947071,39.572999435235445,30.939013450260244,20.006055851945447,21.919202250518733,10.13392439558688,7.802268721848216,20.94796749535619,3.3876269763802314,43.856137796978715,39.380238181664886,36.853623151016215,10.868826449873847,35.598610297969024,23.904723482268274,49.05140109919871,12.001431798440954,24.117385254336266,43.31347249023041,35.676540958505555,27.328986226405018,26.60997084414396,16.737598528182374,9.234144129282384,33.72637169488486,12.487195169456399,25.79366484251032,45.5829690268012,23.0322016479938,20.136815848370492,37.84454917738136,18.319792660914736,4.638296415221232,43.49892559802442,16.368650847577182,10.21310367756728,2.411776045867875,21.04229336764556,46.613363664998296,49.49985683310138,30.660056877053343,41.83282395445834,6.719522137223743,44.38669888282721,0.39847809304895954,35.33775981939375,1.3790078389307014,9.768448823476927,36.86215694367543,46.566027098238216,9.161754212003858,11.628094762242736,21.00028138256178,42.78316679871204,18.82982425111678,20.277790734212097,45.3124309926185,14.065900633642004,45.28034688151875,18.19063702211964,4.789301107029342,15.960911183031856,19.179150491266526,2.2943024996195938,34.48186547878448,28.39374508660474,30.869293432467295,7.397650883735752,7.300863434873062,11.264126719061384,14.249010057774337,37.21137471018551,18.899276671515764,24.66016449670232,33.126029858785586,2.325376794466616,42.69007235937866,20.643107996693843,47.24989862158808,46.42179756057169,19.53446508296365,33.193312354529844,19.00362640912401,44.62538671719707,23.038725642847258,13.416601655249316,26.54433635074106,29.15692665910983,27.632765140070592,31.816691668319685,40.817031769086974,38.94662514782154,43.51005793894724,6.046900205349259,39.028475639179035,10.356942163515882,12.780619678474315,26.244077458346638,10.946501137195131,19.09925442743524,39.91049018329406,20.07087806494896,32.13363197302353,7.036440547894562,24.277558779628862,34.10326103709343,20.92784078270158,14.242089736453167,17.486281802577906,6.510589120008115,10.21574301830671,0.8695390287537408,13.159710028765481,34.782620783033124,27.387936518384503,15.84339606495785,27.264234600307823,31.90198109846375,36.495282436313936,32.97003937183513,9.940823210564576,26.000327487248477,30.88553047200575,17.080987236828417,19.585981626547778,47.2411787181338,0.4982059892760238,12.351951927700577,28.380086435298402,32.01691146898866,8.171782321100718,28.687011230300907,17.16811777582462,14.535210592026903,39.51136927582358,1.4084495529695817,28.658467978634572,30.166199844370244,15.975985159963491,10.668856368285217,9.295813356220538,7.83029188284069,12.222641960531345,8.065642845156418,39.99784746199455,16.85833508611527,39.858243820892135,38.80219082544284,42.97205343458222,39.66063990503304,48.38886072962371,10.038102566528806,23.062286155652313,11.578931619117006,24.048313806092004,7.138620297488774,48.487817019431354,3.971486710161809,1.6295112883728313,47.52413970903453,2.9234688352961835,44.42858507878522,47.79300866905096,22.03894060211865,17.27197530055603,9.05978942906126,14.605765212609024,37.27625862512261,34.47906443785283,19.54725647575196,32.563997489295126,47.026693850374265,23.88993152715142,43.20464618286882,9.8307115668274,25.454258506527484,36.17035499490224,42.000636996274935,6.616631783790949,38.02508908290976,39.32216233165826,44.90883135023942,21.295544075980377,29.00267042822764,13.230232542924336,23.021006963062984,28.14561048052253,41.26648875994792,29.561934220787155,24.370991285735155,23.18706973162856,32.253358842954825,47.921686200354785,15.873337523718856,48.458622869930814,13.48844211098994,48.01255222139543,48.06891450124064,48.21173910403819,6.518016211347311,22.57897608180062,15.264118600680032,23.477490097487664,13.095052485579128,10.81605688941998,2.1200419369049706,16.310542945250983,21.18530781029677,37.41595359181164,19.333146343244234,45.7376605137813,15.426658459288179,0.42752728340178514,44.29298737701887,30.47443017231054,22.29054329518633,17.280931035291857,18.04432332867544,19.681813241210133,38.777425970301216,19.353952307556177,4.708389633760213,24.016462283699582,44.82712565156564,24.042781191484032,22.35386258345412,17.113421084652604,44.418924921381354,20.600264132223224,19.082448765813808,46.11714403477125,5.92298868104929,21.11823432564982,23.115269651234847,39.534568889705724,2.4867369129590866,49.6229127824681,37.496409173114145,19.24876876852134,11.318227401999525,43.753227519528394,4.350851099214436,41.18907256031898,26.569282904797443,38.08577983903376,39.98089220783045,9.786841559474146,6.541113965601442,14.486512048140954,36.080318612544374,38.624608626975196,39.63018215384053,42.424783915309206,3.4888531744491247,29.866329083756693,44.656033953248134,35.67841239854484,6.229352129692112,40.67790927873506,14.62303678048632,15.41912946774886,35.23439572773314,32.26019812724801,12.108511588586223,19.807694252772112,0.0015788418359696799,38.10001797080712,44.83219073267588,12.575693992578085,42.27331116267333,23.80099314997689,27.286049179449513,45.86287778195256,32.45687158305021,15.454411681096513,12.377681633033866,10.872154789627352,40.02280720918586,47.25595728520161,1.1767410127540678,26.62518125781138,43.805185735359466,41.79708351103078,42.526211730936616,8.973991311181639,43.17389611107747,49.928938352255244,25.20217818270256,12.448611894502392,29.659398486597677,1.0092448542474597,12.973242053309475,1.6914846657928306,27.79165877948817,17.261940402473954,14.32157384173821,5.750358574695258,0.15819288970139178,5.352521618328265,29.84789324696915,28.712309699809424,18.724192316999655,32.27308337084159,46.6187873471086,37.86464667496683,43.42988557525006,9.737818092695294,36.39707553663493,45.189534360276205,17.39824910165292,18.46001806067169,0.12035578341400566,34.69936757603028,1.933142157342993,2.71456034085068,14.827866110986642,10.044204391401323,40.097063499950934,4.504953927720578,3.2958931002654013,38.48701015005223,9.455448155025415,17.010307957473657,42.834872144039025,25.46958060500375,38.75673472590713,21.082834522117277,37.5477161334825,29.04885899894929,3.049939647109312,41.7067485353108,9.949582911046607,20.74130793421556,49.862880500027174,45.28863486500785,0.9211699123450989,22.80487662579467,5.798139844233519,47.10216805142543,32.50022917083557,16.797125377112543,24.989267467958154,2.0907549333837983,26.693856555296936,36.58047183813865,5.44299696696161,40.64459629904555,44.87093009703411,0.1243768506414944,45.68389577003353,27.974477540511387,39.920230144072036,15.32676814873053,34.33863932843813,1.501314762635686,4.260087520839095,43.59402268153046,20.743844409795187,43.85946309417101,20.213983465686823,9.47891382062187,7.334536760794929,27.419896816355983,26.90247036552241,43.753608026241984,43.454574722842445,20.24753378044295,0.04695394262550501,16.154207507709685,8.73276594648733,44.51053089660119,27.62723862076869,44.702661998321794,20.962638509070075,41.4420988540535,12.090148854354798,49.84306827815745,9.918918218320261,34.11264900389759,26.384960990816055,2.0835172756798803,30.70474535994221,19.223689262842246,38.26332509683549,25.88801891882484,46.08452336685206,49.884886665670535,31.549350228516193,2.539901889739593,1.8124952438242525,15.34698104856579,5.5244658073805635,44.19622172697015,37.144082750071604,30.602111204352,22.47583107520591,41.274596404934485,5.030241048321027,35.15361185105929,44.39460064051887,35.1675946785867,13.419026581600967,41.06308105902264,31.164004475191266,8.106348429354727,13.895255174074139,20.406766136842535,9.433541846527326,21.322660379036805,19.984967436138522,24.145278458542705,10.185714485776987,0.37987195061960355,23.92967419697609,49.1411090889455,49.01013913662574,20.851161714412324,4.675448732856102,38.88967263723318,45.20163917429644,22.102523000440765,2.769122973699012,34.56734245971855,8.920074757167985,30.515272804342054,4.059298458702965,30.284411094218054,34.76829918343155,46.61547519582766,21.648320199340574,4.407090354802412,19.002197601664726,40.24584510665225,12.238217242205774,23.90292665623801,1.1609202212132352,15.433654380582063,29.571898923399274,0.10750221346218503,4.7141399952047465,15.353225031950647,13.917241174127925,47.815505114194764,29.154777473652903,13.922104681629776,40.45457351703173,14.153133229618774,0.40920571736169364,21.0215076438913,41.83168714611503,34.41007785458756,41.23942023970645,21.294020445902383,44.12380751759248,20.693749957023655,49.32612161939276,46.6418776246322,14.153990832254026,7.226310913221356,26.39167695538367,40.200418615906784,46.97172196375716,27.420552771465424,27.98200513382636,7.453024426106126,18.803374540348205,49.646213895015045,25.39530447255367,47.86859748586853,38.80208467193715,33.456074432104074,14.148568488364754,48.14486386704543,38.804135795838526,11.199958350873152,1.9424720110395755,13.09947519047322,31.332277504717943,27.216237424566557,41.75516510758575,43.34224673630529,27.79793291560374,15.065315957322456,38.12854974648129,36.14489427556268,34.54309761714322,48.001804290649694,49.31724820020927,39.58716982344227,18.797290691720402,31.801982582403955,8.964613626605933,38.8818681054413,24.415363958477453,24.977538174276514,20.639203774589266,29.126623279513574,9.25658257322638,32.789829951778785,45.60224756784662,38.48552149547392,10.645777598732476,2.160803589714777,36.18062134235384,20.459179178332597,8.61117773832617,13.076504369951458,19.84666245344162,7.873769568299538,26.30008688821224,11.182174417174517,2.8953541190563703,30.485053167948706,26.935845850435534,28.134230382105397,46.501231057146356,18.714623428709743,22.070972667701295,14.024024374973044,0.21710781916337574,45.4851365232568,33.299739663657846,11.070095673847547,20.417837501939072,48.76487427610354,16.586353352608597,43.84383623115647,15.814091767349636,2.03709331153481,29.100206997340884,12.132792273362847,48.21792995292018,11.00694058828532,43.40433833437757,45.42581695972081,25.899828387440525,31.67058336860974,1.5594585070124012,8.546050668801431,11.66976312836957,17.86292871574885,39.51737771394268,15.557189273419192,17.77539787335527,26.50723000955545,0.6208662699553669,1.7690952606385202,38.36594507054399,22.228208438560635,30.53774849107501,10.582706189690516,33.83837511071637,6.915041035648494,33.653174089486484,9.071859033626172,44.265148414698494,40.363543033349,39.27844296154436,33.85605001610782,40.81566884146811,4.477870649234605,11.484912558573335,26.85971974008401,19.609384984754197,5.3781971603334755,37.18355571553496,26.752783174639415,46.32530260404535,36.15308329291101,39.55656127651815,7.686014670377228,12.76770577822428,21.99257999429949,37.051496973881385,39.890862011013716,17.742966582998456,11.656789353002395,3.702563996193009,22.596694108071212,48.92249594372673,11.021208564549056,39.02289262192345,25.671784729378068,39.02163917510316,4.807000754610391,43.683779590654396,25.370361993765258,31.206213715431407,2.264883335263801,5.76685599546064,27.171304358897263,25.133931402873245,26.477390633816512,13.715216859379787,22.35781277341651,1.9474642610781578,42.486200416100885,35.11601075601666,7.906644256455064,36.03914932008443,48.94037199418565,14.289468197387656,4.062517749548733,14.985102294361518,49.56616477463407,24.780127228224202,43.91914846018925,16.3674752345049,41.8570899661434,40.726750926343215,11.056086254261244,19.992116680325424,30.28127337887655,21.916636924048728,21.141775226564462,17.95271836602036,42.842599697226504,48.43818929391992,34.300452142008595,10.715596326823496,48.68237369259199,19.721656257624332,3.1689809577853945,0.7920643504187308,39.805417467265116,18.14465433827921,24.76733893237215,2.3934746906507987,40.890145303797496,43.29584153377161,43.52474732167618,8.026562327202003,3.512885913066577,24.778917529654354,15.833413947551056,11.33355686176789,8.836743719434025,14.056213931222828,25.445429161626233,18.419558302667628,1.3033316679587736,5.6616355981220945,38.35255361815365,6.1377851021404695,26.11070643620872,44.95567692452907,0.28512348745460825,17.566965711958627,42.87322267321577,41.67133804265987,12.821045186085412,26.981859433929458,27.24766583720224,36.30144520320117,39.16045146668651,27.131240904980515,41.252687060242145,43.51799588466133,18.636926861651627,3.7438393457227326,36.62608263503097,37.761496664153036,41.69311682942756,41.983855727146526,13.066172151080869,44.337286981433856,0.9020180001435896,49.13265951187478,10.924376802012814,36.16603926458002,0.3510812384517892,20.503737797316923,34.45805285823088,35.3126840130084,34.717295294494036,26.12767830143611,30.852734820111337,17.4903942586058,33.5645079346698,21.556232854081813,44.886412407631525,6.550510481612626,23.195479379979844,44.37517177164717,35.33848424427693,49.75734993696997,21.236089422474958,33.59424824932176,26.074899865054935,1.5702123414734759,18.171366080711103,44.79818809950644,2.469022287736633,13.162994905098891,24.77002672614068,48.25502076470778,35.00170578392412,38.20721101107453,38.332353703157864,26.549489020400728,45.22662513402768,10.11611918648827,26.88218203411662,34.78476113371762,32.6355614795659,17.56326433683316,35.90712026455345,21.366124376794748,11.746076010464757,38.68933634645477,39.126656558631076,28.03173509568505,0.2744940298194276,46.21649752680844,2.5110018200163675,26.144417654347397,44.63443566338486,19.240177275224212,30.373461631912345,9.037028864864382,8.632939925435545,49.57330403750112,30.036810860956642,20.765554314383174,13.023174902381662,46.18373875047003,18.52021842244764,21.871543160873884,5.05849192996406,28.359389562807213,23.593950556503486,42.627004656902514,2.097960132708687,27.200266584535584,31.058633755804856,17.536371725482702,13.73589870615497,15.802168823493423,19.525887113876294,21.205881652348502,12.422971899081103,28.30175513010207,38.89707405420907,16.841957253855323,21.94871978306906,15.242285673816125,44.48949322230593,38.87370517939254,33.07913300115975,9.93341253447364,35.26124645683543,45.52695566998592,14.558891790061601,40.987287029507094,43.45150400176212,4.796191985318687,15.722393863369465,10.148501849662395,49.32759853970021,18.70470809334226,7.28609326374986,49.41774348093168,17.524149155198742,17.076917666297543,37.393194285960206,48.211261490765686,46.66219704630519,26.08476105487987,13.880975410845654,45.65163218026327,33.7395646011167,32.9997389018324,18.44905179298798,36.02404552663471,29.354256201368777,13.158790216206096,37.07133312880725,44.19156429001969,29.57718521194358,4.249384631040021,10.384873849544418,35.05148858223611,6.6547912442742945,9.84615884462462,24.736558668340948,0.7674449148386664,37.854161425273055,23.65914456771453,16.32112215672502,39.06692494094825,7.694996683061827,22.589624364205328,37.425078305406736,9.48470966829692,14.39998417946301,17.426072744754826,40.85292566559835,35.97487632726659,33.32690219783922,45.66089391272761,45.89462370165985,48.71566261084885,34.91811461391231,16.65055129956683,26.574345940334045,8.093052677855184,4.210703293762164,22.88809892795124,7.29356497110153,49.59983198459186,31.743101961877407,5.10479646398162,34.11814038097315,27.78439661206965,19.442677347429893,47.79937173057994,38.896973065872395,44.05694315204822,12.375525418531607,17.540527403085136,0.4940742358848449,23.79744414422882,19.06860540706625,44.650650146959116,43.65097129175381,36.95642301592562,30.425185331139957,19.4040152778839,47.053939977561946,15.368752645395256,13.770921813944504,11.058722462496684,32.264373870667065,24.458465973185874,5.029638368233169,43.91796649221654,42.910532131781885,4.399038073868522,30.287174577976582,9.882242792247087,38.074774836876124,40.114504601826276,41.58259483160014,19.934084402333884,35.91432866967128,7.76770209625165,9.750829804994442,19.29391845590439,41.525791631950405,32.301874492520156,32.001198845520896,13.287272084679703,31.183709246474034,9.537912091756528,20.1253396111967,24.489155887575052,18.71620438209697,40.92970076124474,24.869459546008798,35.37995300748331,16.7482228143365,44.27540823629265,14.97046751976191,15.741675189007609,32.381881528218514,30.852461671905473,18.74180157092784,15.604856252442456,12.090262783977968,23.8398740889464,37.960466491402144,19.757473409098402,31.58340148765194,0.31505353906972067,2.4890094817304975,23.11047704794951,43.642019380429076,34.77298395439359,31.178728682433277,25.32288179336216,43.59433653352163,11.05853089498673,33.02638995769731,32.379261061179,40.043593792540356,32.88245344870624,2.120693566317078,43.37743285776615,10.1979172370113,4.3654183716056005,7.455019480045766,48.10801915641185,13.036072914196629,3.936044861109611,35.51474109923664,25.526107735683347,6.861174678409821,40.702923770487544,19.29864047759102,5.64754883710502,23.476314823215606,20.868609099676526,29.00498142195903,34.88437839578186,21.92657477614072,16.852313224288572,29.741416114157282,45.55838669158053,47.622064846165266,46.124934502878325,1.5467533897509766,2.7806485496409517,18.08108024333197,23.780875489319076],"expected":[-2.0695283350418654,-9.411221761855392e-11,-3.3300769498533223,-3.7229900136632037,-4.025249217148682,-6.060316487753872,-2.5536211578912082,-0.614341156506084,-3.9926819469384442,-3.4887079156267435,-2.6590465079687717e-12,-3.5732274969106115,-2.1812800578347993,-3.510943431899959,-0.1377997776818271,-2.7314328559116783,-1.29535253404902e-26,-2.9938333450354824,-0.9359076017308229,-3.1682887991622293,-4.194706491679384,-2.0914498945857964,-2.0396221315091303,-2.156214558312157,-3.4764687737322766,-0.004450522655032233,-2.055524750158713,-2.845718582643416,-2.1083165600079474,-0.11986743542527999,-3.3518996281223843,-3.098195338117653,-0.7816251995682957,-2.356924341799063,-6.307660240448939,-1.6489181299694327,-2.5771034392485856,-3.3096190703292914,-5.816178870936832e-5,-3.381416067342881,-1.162019287028864e-16,-2.308436370349432,-2.713195458518529e-13,-2.484263590799253,-1.614599649539362,-0.2701137550617233,-7.130719511389355,-2.9244484681593157,-0.009100711259842803,-3.60697171779135,-3.4584390620636007,-3.3296663033664875,-0.012460110442003444,-1.0610161558913629,-0.0006474320666944894,-0.549049443101316,-3.3347367971672237,-6.030894221239256,-0.23049533126139315,-0.0021530507979061414,-8.011710410321758,-2.0543943471495214,-2.3248852441540295,-1.4080927237515983,-0.0445399486317602,-5.535109138153434,-3.259200894423033,-3.930471635129755,-3.8215438855328863,-0.8539693437957118,-0.3296922381648605,-2.7675684139221604,-0.05023475413175696,-2.858803151989357,-3.4041243087802666,-2.1602691825547033,-2.8609618693556853,-2.3561184946807767,-7.9022110522969315,-1.5118845348745607e-5,-3.0505347914103584,-3.790009235782798,-2.0636646506158947,-2.4162420243753,-0.6837645691896863,-5.50206764091833,-2.1549152140902255,-2.4762997989929283,-2.516190222054898,-1.4584594632928454,-1.504304190761778,-0.1544494207925989,-0.4463507865285662,-3.894243608309404,-3.091086547741524e-7,-2.5022374363525595,-5.265308418980616,-2.025316224757377,-0.5581166739822134,-2.544282527186275,-6.8255297834463144,-3.1168188504185435,-2.8824783346000733,-5.526398914383353,-9.513086812289894,-3.15656505594991,-1.6568654138637473,-3.8928617107843646,-1.8078462566490163,-0.10685091472988437,-4.558998077937786,-0.6284509938488367,-3.821037613471647,-5.252891304654883,-2.329583304994485,-1.3697128697344185,-14.691059691331807,-4.5934081320724935,-1.619927785266471,-3.6669376138477756,-0.9980713310438702,-0.3637153041200015,-0.1624066595232747,-1.9746375277256298,-4.431511352778043,-2.571759849976223,-3.5335394987408155,-10.41544788886083,-0.13454809631113784,-2.6936018987726364,-7.364971703555341e-104,-7.66049504776762,-0.025996242361439006,-0.5775046265494423,-2.90361492072453,-4.134172168474318,-0.12386541067756521,-0.7686963370931933,-1.042441885472884,-4.336846440164058,-4.417715518823416,-4.725818899813425,-4.134494024445384,-0.8609614467307874,-3.042160039842864,-1.3507428029805875,-0.0005350398035805544,-2.6641675577240957,-3.448472377600192,-4.260911627350492e-5,-11.843640675946833,-4.0564044783886235,-3.6111422108573232,-1.0721649922018712,-3.3556013239051516,-2.7785552113873857,-4.5319194742438675,-7.824321303070734,-4.510224776538558,-3.972337253008732,-4.362120250788644,-0.022235300842015814,-5.581752144542271,-3.2914378677407714,-4.853124878364355,-3.43109968931079,-3.7441902632716015,-3.380071222064532,-1.0041879469703536,-4.62730436042583,-1.5120550918384112,-0.9478180113564378,-6.563140669562542,-8.400777025558778,-4.774515371536721,-1.8852643572126369,-2.4575659667743386,-2.455643009370876,-4.768593413049361,-0.007872158432703998,-4.183823583392908,-0.5369512086213154,-1.8938305682140861,-2.0317650655625585,-2.1182750494646365,-5.000562457295394,-3.3927701592597166,-3.201283300833468,-3.868748737540072,-0.18720756877341294,-4.345307440657582,-4.473908416056869,-1.438797464806354,-3.599270073192222,-7.7932023340554855,-0.6392544452464131,-0.17009981574154878,-4.733506655721741e-68,-3.4099337568114936,-2.365900068474168,-1.5456045174777884,-0.9377171394383513,-2.1712935233991275,-6.652065364626039,-3.1321419159084596,-2.6340127875807524,-0.4157402501512858,-1.4949736787450745,-3.669727803983658,-3.169357718544399,-2.5273076168431747,-5.772656564690217,-1.7633538114487077e-60,-2.1875371871693905,-4.410290521584322,-6.595705833846221,-5.757344263148964,-2.5297639638619085,-2.8638317079194744,-0.8362042816368803,-3.7682079477131767,-1.3923501083596584e-41,-3.7150627262715505,-3.6089179100849362,-1.1573540651079774,-1.1114997551693413,-2.377991057158411,-0.214124191322249,-3.72101028088685,-4.155092974780099,-7.82179803680866,-1.9856502997579024,-5.782148030392582,-2.681010345553659,-3.3258575708024196,-4.897511375965648,-4.326452971646574,-0.19946808836570756,-4.2864502638096535,-1.207594490767221,-2.5371535395213742,-0.05379460155057435,-3.3624493521700147,-0.019459823144352042,-3.0158852380473568e-24,-5.74675931163361,-7.079289238542606e-7,-5.386825271704107,-2.7895359046602213,-1.8311597472392012,-2.369826377076185,-2.9091831953802805,-0.9035610182503336,-2.6676718845255416,-1.883959773029142,-4.665540028436954,-6.3593502572994405,-4.3201210238864505,-1.4586074223406569,-8.99155871806288,-0.6317354250559502,-2.0157878036841166,-5.406263085886237,-2.499368025535507,-0.7117606434455199,-4.7044487480205435,-2.8264970770205515,-4.921918717780138,-2.13037774644443,-2.296385920107242,-4.332513963989773,-3.8074207817394723,-1.9372926880177803,-2.7292698763999774,-5.618892949913475,-1.4567085742364303,-2.6571762860521604,-3.9886369900743097,-3.6522831434508007,-1.0480300137715912,-4.285507281426885,-3.8681572301920837,-2.845397328867916,-4.18838248720092,-3.7150514971584445,-4.3322710387471135,-1.3541559812862296,-3.373494373250519,-2.297383988772817,-1.4709870267283678,-2.373583503784566,-1.7391976176254642e-10,-1.4688802260265494,-7.2108309466571665,-2.365305158330928,-0.9310643339905956,-4.79591890883643,-3.1638733455963894,-1.8677107315758197e-43,-4.218594829359199,-2.418382572609882,-1.7064887031460032,-8.7191521746063,-3.0273941083035747,-1.6220316078473276,-2.192169191769118,-2.1491507972300257,-5.393369179185246,-2.13934464097035,-2.915940950913201,-2.2375655684988236,-1.8605042318707263,-0.7567336267887818,-4.399649689307414,-1.4327361313688038,-1.2162257943125108,-2.6834793536816424,-0.14882337265302684,-3.602380972796453,-2.0858076899877878,-4.100914182125139,-4.0490096216507955e-7,-2.658452184263585,-5.4958595353351285,-1.603586682128854,-0.75090958290639,-10.07264236324357,-0.00017092662635436097,-2.8509927529952908,-1.7910805096854832,-2.7398106785353624,-3.1640140594488066,-0.9659854415632935,-0.009832924089008542,-4.007536116897628,-2.0483260638499834,-5.755240205002892,-4.417349754419973,-4.759406938154007,-0.09798660268035159,-3.2309573605845854,-4.753311049342879,-2.2096558859379805,-1.0290908489628392,-2.342446946154406,-2.0515159255835367,-1.3518384159246741,-3.928831143066458,-7.4895860830029335,-4.254039602651195,-3.248110951144073,-0.0,-2.385872505429128,-4.600645699355018,-0.42461008011015,-9.682279907223933,-4.799615381289152,-2.708944575561635,-3.6991668876753763,-2.3514463968764403,-0.5688247361926727,-0.7444428602580943,-1.0765863579335537,-2.2149994096452823,-6.889025793286474,-7.063256159275785e-58,-2.2337769610702756,-3.0718722259554396,-7.216737993658101,-7.137109289131033,-0.13957239894792503,-3.3004991471617395,-3.283759839515149,-2.0377165313227033,-4.262462184390678,-5.1259502222138975,-1.1988782879746538e-11,-1.8224737952345575,-1.2770038091605363e-11,-1.5995229357179144,-3.816235448917867,-0.6081212686137428,-0.1415976828803485,-0.0,-0.6803832642731258,-1.9149128555936257,-3.101069582528773,-2.4266473736281156,-1.80505776321474,-7.256958057156061,-4.238010490087209,-4.951081542688263,-0.9161796419798067,-4.3687108988225996,-5.12910441400459,-0.8979754403411723,-2.082770529168819,-0.0,-2.140594687523216,-3.0631376808902733,-0.003980464929085396,-2.474147136922534,-0.8349923231743185,-4.399476570535453,-0.20509427721073803,-1.7718323017900326e-5,-4.866107429933404,-0.17873013957316625,-4.69803506445811,-5.531428960565795,-1.3909670182903862,-2.088202740980712,-3.165296725524411,-5.166848620333438,-2.63393187118978,-0.8275301006685483,-10.407406858091631,-0.266361247204592,-3.255455792804997,-4.990628911557523,-5.565928153325677,-6.285356148833747e-76,-2.5333298560086503,-1.9172662770851658,-3.409594116662867,-3.355654047039297,-1.3184382595722053,-2.4758333132991126,-8.22383985511151e-18,-1.6480873527409232,-2.502299120616772,-0.04250481833417025,-4.342808095197388,-2.5355484088612905,-0.0,-2.469254704918252,-5.240406019745731,-6.257127371261336,-0.7418198717306385,-2.0309252845253227,-1.306269033831383e-10,-0.024699039200438408,-5.878592146481575,-7.584302699484362,-3.271157537214741,-6.201645635654953,-0.8487861193280426,-0.13609574835900418,-2.6601131679066925,-3.8090831890875316,-5.447044532844144,-3.1149804472164693,-0.9967039257764062,-0.0,-6.30394416203201,-0.34112825867556934,-2.411233877809473,-2.1129359604185227,-3.3216283484126192,-5.754658237130033,-4.719356989290897,-0.46291359667084697,-2.9100737443341997,-0.3718352629806881,-3.3390698417197435,-5.399687378254482,-0.20883559590452253,-2.4373813182816737,-2.671789348328131,-6.884961293425385,-5.36271296423859,-6.112009167245161,-2.999695009256525,-1.8438049835839931,-7.851612006808422e-7,-5.612056616640092e-8,-0.7418342376040286,-2.0609076210687998,-2.4132169596902395,-2.082408538178927,-2.068446934388892,-2.666378631108389,-3.432177145792963,-1.166711630086827,-4.710047775731135,-4.096578945847699,-5.303050502683293,-4.133815349247856,-7.885076713491002,-1.9324739037664351,-0.06542242488481831,-0.6584954480835278,-2.2485323845597374,-3.0177313221182596,-2.474368390935021,-1.3670077586258185,-1.2694053940771644,-1.3161988546251973,-2.523525416568624e-10,-2.417766715504864,-4.219746550914184,-8.814360359521837,-2.702949061763543,-0.31546440901536493,-2.994271213247286,-7.634503358562624,-1.4953803395812089,-1.4125761972034086e-5,-2.815576176233356,-1.2405151813302786,-2.0747844247889056,-1.2948789405504046,-3.7930873474257605,-1.889263583217191,-3.064142651216047,-1.8780933717178134,-0.5321575285308245,-2.206847646273915,-5.908304335289606,-3.067917213313738,-1.2495450183277323,-4.200937966852709e-54,-2.289849889951307,-3.98871478376935,-0.0,-0.07712968351731703,-0.6326586089813993,-1.1932275781364277,-7.833434802442826,-2.9496658919600636,-2.137136586759577,-2.693982486689817,-2.8943502260099008,-6.067692266240109e-267,-1.1681573681521842,-2.6233282411458907,-2.029523647007549,-3.1661138583665354,-1.067584297694594,-3.5750748985339613,-1.783370453373724,-3.0606912919912377,-3.31060145537245,-1.7828865840238073,-2.171737151183159,-2.966434291248002,-3.262801915678957,-3.237295846305263,-2.145642906644026,-1.5400167261078792,-0.9404990176862961,-2.6416316834889635,-4.977478954337448,-5.1334848726756785,-3.703632895955721,-11.197891713802106,-1.917253591523198,-0.563035071908223,-2.6494162949427076,-5.0295608924770265,-2.354399550782861,-2.6634146774326707e-13,-3.122353511795592,-3.9025531309133465,-7.260944769209566,-2.641341978946659,-2.348771230724533,-2.446218026188685,-5.198099088195235,-3.786589977643666,-4.001220705506133,-1.8817356579867965,-5.0222543754341125,-3.8928797163156568,-3.591564614196289,-2.5996860876152166,-4.246357882103435,-0.7221897686156264,-4.801683410001611,-1.3673662852218067,-4.023756818827802,-1.1493421142888671,-4.820922523068991,-0.7225973305797467,-3.632458442551924,-2.6175114608256806,-4.576424829043086,-1.7421904291621366,-0.0017716797091594533,-3.774337943080392,-2.50607830947205,-0.8378948271531808,-3.046350076075475,-6.179214271928078,-0.21587474695320685,-4.637653959060961,-3.785315372148502,-0.935829613217561,-3.697276254754508,-2.209002311482031,-2.489418146650859,-3.7504807854452,-4.895267452894708,-9.335236962156323,-0.8287542333644446,-0.0,-6.037562753969186,-4.243428795439307,-2.813948312220353,-1.6072171123552503,-6.691975281404664,-6.5169803213020465,-5.755832862592559,-3.6521230087419996,-2.062906030348772e-9,-2.129877327672081,-1.6769496182304424,-3.0283500540565607,-0.3232020355416757,-4.095496805865132,-7.295567564958969,-1.9860285496576586,-3.579637756189774,-4.933827955955041e-14,-2.848412371460932,-0.37487720505738287,-5.1730577550351295,-3.2172636230853753,-2.7590430832571116,-1.1428347776892198,-2.9357975398844895,-7.624784215598669e-195,-0.4224576000881194,-3.72987943402424,-1.323230622361695,-1.7002720454425675,-0.55104540294144,-3.4789580169859518,-0.021354112635615666,-2.42136058730815,-0.1364792999660798,-3.7622819895128137,-7.404560013856846,-3.0776608441110342,-3.6317547489686928,-5.025025944970956,-0.00020483969852959466,-1.0083320090733963,-2.4569756422180298,-1.2738401285417855,-0.60131807369095,-3.4580554409779536,-1.704353173515831,-2.446750448693326,-4.458012846789589,-5.5163066599678565,-3.531148565677512,-1.5532496022019209,-2.9041759892989845,-3.501690579941985,-6.224959944273531,-1.0747734144205545,-0.9512678984813528,-0.029495419744083866,-2.8558873157678,-6.349757073988754,-0.8440449721391962,-3.6054607942892116,-2.235395330698034,-4.2505360507323,-0.0007479011210816336,-3.5450228692321137,-2.812506140939051,-1.9959064349122813,-0.03596964550778414,-4.047461102373276,-9.732338825497607,-2.2817362411308317,-5.923484400780273,-1.1495927141082876,-2.667036355298773,-6.747670317678114e-10,-8.278621825642245,-4.316604155008886,-0.3915247650275331,-2.90578295397958,-2.5916657307206354,-1.8302685216757528,-0.0012353577861836306,-4.63316820106259,-4.148169463043154,-4.12621873879454,-2.7665381091114187,-2.995207054097918,-3.493060889521772,-2.6694912732584704,-0.23515715071828894,-1.9372847741170847,-3.086983771702026,-1.4911646033699182,-1.2735077815394698,-0.9130080779764361,-3.2692319751609396,-4.619593208353859,-1.8568636021715508,-0.21632948614213615,-5.258299687864623,-3.8103506021211277,-0.0015539469658825413,-6.913417429754885e-14,-2.684045898316929,-1.2545980498971223,-4.407670088511241,-6.908125258409353e-13,-6.712072973860794,-2.4374477265076657,-3.5396227957743926,-3.5208447255040975,-0.013031182922294228,-3.099807704716574,-2.8455163490858784,-0.3352640720567874,-4.616512048233906,-0.7513967856233842,-1.5355374136769886,-1.9722455145279154,-2.8096892976313713e-47,-0.17694051090937832,-2.11237579370361,-0.11525774486405602,-1.5814228427627495,-2.408703518463193,-0.0,-3.1144147118711203,-4.336817873994935,-2.989744826434701,-1.1850083004969816,-7.405346162801435,-5.528521179141487,-5.933698235591647,-3.211949499087151,-5.723559053991611,-3.3537021271026903,-3.823010125268393,-4.108334467179333,-4.96736072019812,-4.8403255212003415,-2.225114390500875,-3.25355924446587,-2.601732212081641,-1.6651299464834972,-3.8397888021851023,-4.99334506436149e-8,-2.9853024349564183,-1.1966892043573176,-6.025289889278663,-1.2862131042093421e-166,-2.0680921008561612,-2.734857999345713,-5.148886557077265,-4.922890819262988,-2.9348416450222157,-2.023147262954266,-5.887616418309176,-2.879923778372963,-1.98499079402547,-2.3675406325526374,-0.38549166775696486,-2.363634455359172,-3.153682102514454,-5.706559919450797,-2.641088941659279,-2.0246222726682475,-3.0854962718481085,-5.5710868458027125,-4.5426595187133097e-7,-1.6015539160408445,-3.8937777416694193,-5.848853067281523e-11,-0.8952141721321555,-2.528679879862961,-2.612920243628128,-4.8806609626111666,-4.287472162132917,-8.055980093756512,-2.3516172527800223,-3.776345395810398,-2.385332833068696,-9.156584542893867,-2.294785222749848,-1.788741546092973,-1.1961266802685007,-4.172746545795256,-1.139374077460698,-1.4415801639692296,-4.4750003980003,-2.775507248505371,-1.712071000298185,-0.0,-3.288417048152532,-2.0311082411731955e-13,-1.3882166902389534,-3.3613122403601667,-2.1875025170151625,-6.269037023907225,-6.277863774001602,-1.4361082618354868,-3.6824028350930456,-3.778053504346546,-3.710313141502597,-3.181782621080386,-4.10911897896618,-4.84538639630368,-1.7507282730616371,-0.4118423364113521,-2.237028624586134,-1.5228591637932432,-5.573986274239559,-0.0001402442394451816,-1.7265981558657417,-2.1719939459440583,-1.151765736548708,-0.6204854621397246,-1.9542014962565994,-1.515846986750867,-2.4842594006606324,-0.4582120427225713,-2.137323136869886,-3.8681372587437517,-2.677221772984414,-5.202991316768879,-1.0547653234429513,-4.538641468816508,-3.7546421153568215,-6.400787299912373,-1.0843883887094647,-9.860947338336599,-3.2919329748019215,-4.17086505624454,-5.854757556591027,-9.900140604878672,-0.0016896254680473222,-0.8561742503254988,-3.309599191337514,-6.516445409577854,-2.5795970034067794,-1.0105593960696402,-2.6334136520353097,-1.2098907665214966,-4.698327508651831,-5.427219411989988,-6.663929651164165,-4.837804095947006,-5.103095850702644,-1.212436388755743,-10.677491395827657,-1.9476747845009792,-4.877773149272295,-1.891292405627215,-4.66725890888462,-5.616689091942502,-0.6107610909784662,-6.091613025228772,-2.745370134997656,-2.219218509285115,-0.0003812903306156453,-0.5769152368719245,-2.9888427220423175,-1.0856936925433853,-0.34472805583006205,-1.3414216424375014,-2.7707137149673704e-109,-2.8077910247236764,-4.291815295080701,-5.399845359320823,-2.5979337524296584,-0.08671435202604727,-2.2652824474409607,-4.905407185370769,-0.46025743252437595,-0.6388290186961195,-1.5132058585648607,-2.7043362990879403,-2.741764119732869,-2.3861586801692476,-3.339499292072353,-4.118054623823057,-2.860295239853658,-2.499957284290624,-3.596084923706528,-1.7885537330025723,-3.263719694211681,-0.04525843043336801,-1.9900425980168368,-0.9208204588740116,-9.088070475751008,-2.3481682543700915,-6.349663980308482,-4.4138062350309,-3.7288531419742124,-4.683148952124134,-3.24861224358303,-5.60997035346759,-4.70189580881777,-0.48792120984624887,-1.6309303158778485,-0.0,-7.736363741470128,-3.735015311965083,-2.5912499715964152,-3.7295681624664643,-2.1996845167776495,-1.9340197243271982,-5.42716999340174,-10.07119880227592,-1.5998799670621118,-1.1492504157595018,-2.203566755088476,-3.733062377109914,-2.171460847601156,-0.004505831874525361,-3.8510288912624357,-2.999416270251561,-0.0019304797640079937,-1.761880739313895,-0.19470987349133964,-2.7095816533501296,-2.524214368206599,-5.420054424724416,-1.3377398432965524,-2.039378636117284,-4.519125532673361,-1.0241375217836883,-4.299097637893018,-5.947261544480136,-6.209659108800693,-5.6458811213912465,-3.293199595140014,-1.9589696786839412,-2.800177813467121,-1.447329953897584,-4.950657577693362,-1.944697450026329,-3.754016253384325,-3.3682613767809504,-5.4753354211604215,-0.9398206221600546,-3.817400350890977,-0.5685885783547805,-2.315529574642451,-2.5987972830097457,-5.069852211471087,-2.3986598534089247,-2.950407498746209,-1.497400372691182,-1.4184085197792315,-3.7987323691630324,-1.0499778636971508,-4.340780432730678,-4.3676603191106165e-93,-4.782971164722032e-5,-3.0463774814987827,-3.729351819818484,-2.914935078045309,-1.8345194835784397,-3.9838233614632537,-7.964955128632808,-0.8156713533573603,-2.6227320222138086,-2.504606222016242,-2.8358134294904094,-2.500971192645201,-9.466005430478666e-9,-3.723393957824154,-1.0328020162391587,-0.08735094189254428,-0.5446370637251481,-3.6900553510181724,-0.46281773622613526,-2.0396056668050117e-5,-2.6932811599968587,-1.3873709653947275,-0.09687132868023918,-7.461826178949565,-1.9927344848130857,-1.3006001390110722,-3.444157301628628,-5.474537029674713,-1.6569527314421502,-3.1893399849379067,-6.0459198320001635,-2.0314186931686073,-2.114626255175217,-2.7622800376836802,-3.997880094873288,-4.166581138025306,-1.2018523489361876e-14,-1.2242191869445493e-6,-1.7062728684959523,-4.578291022631273],"x":[18.984332589440807,1.3839549441309895,10.248071683827341,9.275369243892154,4.416324212560672,2.136543592489204,10.823096499822586,16.408062634386038,4.160977402210837,10.968035309121005,1.2677156651386756,7.687050942551559,18.199243343531414,5.132244640123802,15.384716509902914,13.26995975571057,12.359527046271296,15.197251636294236,19.59385741023294,11.106452556332762,2.5782650642150973,9.722727020467392,9.314574066498412,17.798924366244652,8.71386829579805,12.724673542894905,11.598362044129459,4.815715802808649,13.717388820561709,14.339501789659273,2.0833266042754772,13.29880035471441,10.350332009813439,5.31085197095631,0.7474230801481863,5.242988298544193,6.419013096235657,6.614338855911197,14.342241383936987,3.838680801717622,6.251776160303835,18.678462923806226,14.081704424016447,4.445016026220694,19.84287594848821,6.788921867728095,0.45861530793307903,12.720623555151427,10.031241316057633,2.4544262436238906,11.62440389242441,4.695634016016066,15.703323715945006,17.740261955565618,11.51275107353488,11.450728986169679,13.169667431800098,1.851454341734886,5.445692425525448,11.370888493666506,0.7700856192717564,11.798286768787584,15.012573576915571,16.134110362897836,8.37799226428627,2.6361127398222983,12.486879632567728,8.520353142340195,3.1187367947806033,13.707400502211119,9.618153746042225,15.930943743415536,11.416652866011203,13.285293362530112,8.32818554646559,16.367664956503813,7.2989249522566,12.926933226854214,1.04152084857418,10.435611142813578,8.337775380042597,9.044218926891308,4.382331239535118,18.418105410224573,13.46616871615186,4.234278015446922,4.868983536341562,16.582692626406054,12.69746706926869,14.557473542700293,15.537905127784137,19.982698892398187,11.152267397517544,4.248758458101181,18.548347052033,18.13021897495302,4.008745071357929,19.60587765191739,14.16538101007989,14.39737188833849,1.1142219083072202,14.765854603082254,4.074293569903253,2.1539509820755853,0.5265085985242157,10.523607915025455,17.779810404030187,5.400919874097343,10.018400633984905,19.758783612239355,4.893874195475956,15.418731004936074,5.428759263242129,4.6691313656939615,10.423450194262923,15.421985297065493,0.034545803669789876,2.612720130857813,3.0804587444076192,9.897663914670023,15.69683293557675,15.741010646229832,4.698640413707804,11.503881813482488,7.211623940300074,19.735147175548796,7.464476690455877,0.3238542956503254,13.679974794573688,16.611887388886966,8.68411883588748,1.0848003204026035,3.732387695057451,12.539684667922216,12.378753490130592,8.36778913494829,18.997569338281473,12.978818288654042,19.58279487533119,6.941948361100132,2.933477397394295,2.705845588218625,8.141200418960652,14.745589457046968,14.161739682417164,14.086158411050139,18.590185283749374,6.0652421116299315,4.87547274948255,10.292939424700545,0.1307051306289786,5.306325293143925,7.225359483520348,6.77162523354923,1.945690946579277,4.034445335078591,2.095942697538251,1.0524569827053565,2.810455381737884,4.808277105559253,5.307058555290576,6.425089029630451,3.708423615226004,5.6841619565845525,5.914571320428439,11.905397785709537,4.274348211309995,8.736598440431536,18.153107218074837,6.256867202837837,16.259750260286296,13.286452465848498,1.4108223050470547,0.6181239728868926,3.5982086389120083,18.256558966488722,17.272344526528837,16.497439789254422,5.682547537446725,18.8297724480282,6.84000027212317,13.727064671939475,7.299525134261837,13.913407740141261,5.540807802258789,2.2202725159739556,10.436942838193826,5.786666022153635,6.6019797138197545,13.230309199798516,3.922510257475187,5.164853283986672,15.400850313122984,3.353670119385912,0.5023251046586452,7.974398637229458,19.678048200552908,15.310857442171972,3.411470720870078,15.443384292320438,18.965410787771813,15.792492249354888,13.416231627655657,1.6217925196306515,10.900354260833943,12.726355755849355,14.598960546914327,18.52897922673638,7.0177106293580405,5.005599387954134,7.991676928791609,3.7295595037580798,8.26445166708969,6.02594464928405,4.437847463417306,1.6741853187949562,0.6501055223191443,11.690193252821931,5.884520940747158,15.492345725027405,8.54108257008897,19.319389474398264,6.363906207952419,7.068757104963783,13.87869945459447,9.5315723650062,4.101183186189621,14.208696455150257,2.7060037304485673,1.4341717016213762,1.132695797309049,9.161948905780598,3.1317762748089573,14.616899956323222,11.626857800370093,4.855195048335119,7.892702990230642,18.56467104392662,3.838207234552651,9.758323476079426,9.762210370187425,17.33776416739254,12.877116066436937,11.161386186453335,16.959157633161066,3.800874086002066,15.558196031382145,4.255406671073785,17.02113710239773,13.024414229296063,7.652903845567729,3.0336851232613338,14.886463965207,14.13948950221191,19.798274232792274,2.688548196646443,1.9165730149516635,7.695006493983971,17.382116431963624,0.6816584090198496,12.108775492269203,13.610998856833024,3.430843356353974,17.389178558359703,7.6871130339573,5.128779469544149,13.73980612061914,5.430740701128101,10.709861440808503,13.357087898579278,2.1514088314637947,4.878675390248772,15.700819907386334,15.16163279133571,2.520666073683824,17.751418651102156,8.843228011189467,6.23728299237857,10.98525897983646,14.75023824402697,8.068695426845975,2.772081357303402,16.61373472449117,8.405068717106303,10.70597109573097,1.0600442789940123,17.449577476629692,4.031036823108822,10.806792971440991,9.460638154398907,4.782952420184485,14.212956913108403,11.797892228069301,0.8143628286918103,16.617770663297208,19.354332259258253,5.892080579137895,4.533482191705853,5.9971714998463765,7.627843262399798,13.163002980255749,14.10779400178864,0.31243526085323214,5.686357542275218,13.056024053235248,18.871245375323248,9.636560840811587,0.4494969380820546,12.020683719872194,14.958363991761917,11.422367953103546,13.000728244524558,19.260976818730988,6.9831534663226424,15.212670095673971,15.998998089798025,17.350254143851306,11.782085850070874,4.965000177668393,11.90493578036361,7.224371045158473,13.492523722828956,18.91297434365544,3.400480299118147,12.901320491708844,12.790496957735984,0.40205288090625846,18.122077380886207,14.211583228961345,16.050019955629587,13.916942410535388,11.748469837773818,9.579281760135686,19.89817481315675,2.774867167645998,18.958932879521583,3.076017291384101,6.175078131407283,5.566426037453129,7.598202861796559,8.481380273958923,5.877144782368542,17.202762458120276,5.857754454230082,18.284974482865014,7.67076053311365,11.932381235051315,7.022632927099175,1.0786977366093886,2.0483514901270183,5.575942848391691,0.6032380885052646,16.73978347297939,6.37063453169922,18.322471501953267,0.4721800883732552,3.060439497424716,10.131102322313112,10.266610683287398,14.520666807315736,19.9732916352976,14.051311429896938,9.924826970606722,19.242875223546108,2.1337782922554505,19.090426469159087,12.67462209313264,13.493435694138448,1.6019389873543055,1.696111716498807,18.118337196969975,11.833340822771593,13.802033796903066,13.31843016490124,2.0969719238135776,3.2377102502452537,7.157396248958694,7.703316132416238,11.980660503554436,18.669613622418005,3.6419299054984666,17.957220528960317,11.571599112143698,10.357288899101897,6.360616194185789,16.853443858179666,8.713136490884285,8.052705426206423,19.346790939223236,1.751153209739531,6.457338181218466,5.175597576929669,9.843385074551009,5.811799824376718,4.925230295357856,17.797734904342715,9.522819147161453,9.571335769184977,17.356115455043494,0.5981407783277559,9.026348858688763,6.2204720231770105,10.714349616361037,6.304257405709204,8.270193921560928,15.417538393124893,4.78637190909768,17.98978276725018,2.3017335559133834,3.816002351076526,19.26717326225342,19.935134882787892,6.191176729000243,4.015616405562468,11.213260565227268,3.2698492332171236,0.3241790359854102,16.961795005410643,5.816928424097618,5.8254786485235766,3.9654671396120023,17.1425857056619,9.275915817059905,3.2697134533803407,12.21268713019204,8.66112690789922,13.255136340563848,10.474070299628542,18.5452424428696,17.45174709805632,15.121956562392649,13.725237482030174,6.575188014789615,18.230220765065816,15.162081735081303,19.214030079677823,2.883459008484648,2.4728533599128966,17.43124561388086,18.21298297804544,10.128852544631627,11.609524100010944,3.2638192590519166,0.6615292408632056,12.202362372012221,1.287409860305373,10.018104737595358,14.893527214439356,10.441654264256037,5.696455391517392,4.0661824928370205,13.093358811572923,19.433379916080277,8.286747396958813,0.9774967321069417,13.759119905182429,19.29787449313902,14.024015175483097,12.121184319039298,1.6699258947078732,5.547963386777122,17.03603513222928,16.68238985339293,15.169575491427661,9.16790062848667,2.5109363211413527,3.8064089966843007,13.1311522293217,7.276309795678642,1.7312447955162558,2.509721317928788,3.069764097004839,15.945251823389604,18.516527458103237,13.467410186213836,10.473576660056509,17.454057622949236,2.8834045367493255,19.141693733372833,19.164925214757318,15.907916125947024,8.531165251553015,10.579543740444773,4.345144677367707,4.728162499749482,8.130223681614549,3.5128233126239206,2.4117965275808073,1.1266388987799214,17.429997960900273,19.043615762340835,16.77869053531449,9.63885568085316,2.987581936125552,8.944083669035958,15.329772660154163,19.612508369841073,8.048433338613417,2.525516835906174,10.339423911883895,8.457846256100705,0.8448955714630202,7.765944360498165,7.5600675208431145,12.465368771114708,1.4057572929529627,15.747586446140067,13.086863103657658,12.146606261700654,7.370958085821582,15.809059553029151,3.2479981954860504,6.464644875927932,19.906895270192084,14.416047485936687,12.470427287123126,5.863658350523968,9.175784719736892,2.9686525456953827,3.7774153134427424,19.645888612193616,18.201236381843803,7.1324727018571465,5.71850706452544,15.425000063243033,10.75110048104774,18.89796199320461,11.830729400319878,1.346226148859433,9.56149022644825,6.976472159716702,15.137290753475732,4.7754977949476185,14.32789560379069,18.142571975172658,16.23675388614022,18.264613211542525,12.105296602531235,19.547580468161676,10.5183579686405,12.553717650989622,15.281315837079251,12.718238496459806,8.588699961990333,3.555097168948955,8.581097006115357,11.232108870402659,13.29586977112946,13.678537181606467,19.438086190518465,7.415713118473954,7.229413065056538,5.83855926940434,2.7617735833985035,10.691397825413116,0.20313289336835627,18.86683171920911,18.36871028697297,18.435844074557856,4.445800192264691,5.002901001752114,14.781688011256273,3.932164402715599,6.3283300145537025,1.020293802454706,16.056198929217405,19.417903278961077,11.833165235328051,1.5861412018600962,8.165879397650922,6.945594050459172,19.859039873875005,5.519774218488398,10.00963453443147,9.358318026015242,7.386245547520032,5.400674684843922,10.337908428251605,4.994418326096097,18.72427277044772,4.745407104221533,18.017297257270556,3.7053829363290225,10.671515665321788,7.592414087931041,17.753832371727533,5.5357512779966855,6.606169276257576,7.692407914320434,7.796866999750236,8.440928890769875,9.167783077724474,4.080995374826895,1.2782868340430298,14.255886735819555,3.6683749371099372,2.39639781000887,2.889582627556595,6.830751487961209,12.991933590422114,11.708860207653533,10.142626390111129,2.2935972074667887,0.29324127811308554,15.02277050892689,11.142627136966103,3.1448784892223047,5.663374989671417,3.893184371994707,13.657061646429721,2.4300372384042346,0.9021571582079702,3.490634118517235,3.625414749547269,12.88343560965929,14.638852224263994,7.805724081456904,15.187605449911544,17.657342003503356,7.953209944833541,1.6737055986911065,14.072833866896254,7.532272780202516,12.207697013423768,2.952590859508004,17.79588498392261,1.9044484077681556,11.3007576389669,5.628526629123893,15.578921732212851,8.755374409039591,18.563230531750833,2.5824788860140746,8.455895423372342,17.491755104147412,19.394143925703872,13.869729687821458,8.469749427473214,19.20631699512249,14.513350320231272,18.40959837892228,9.597425868610912,1.4082850918868361,12.06324353673625,7.842091079468112,4.686912432991135,18.455548374670254,10.942149130674483,11.369606982487689,15.886366482139266,6.778531898689724,9.406401921413238,16.951998802657325,19.714496025789586,5.519238088792298,3.5507494525225347,1.8735038204238474,8.803204392247217,7.383240533626281,9.167549912794408,2.5111382914653246,16.215190244876307,11.518054697221105,9.849421184417437,7.7769683050701,2.89321833985015,11.685209205266617,9.160159493208537,12.210302387718608,6.612801621954021,18.23952913911322,10.573431007159177,8.929010176647573,16.866125215175156,5.856386399186402,1.0826035839430803,0.29599297467217234,11.665183471111437,1.93826314731107,11.971074923770178,8.483475675346334,12.656016792922617,0.9574378037105324,5.756235307227748,11.87097722610186,12.088889539053223,19.31108320803172,8.448799689228487,14.867940564775264,2.094860365728519,8.844288239917852,4.470809987198181,15.828353867533078,5.243774572688289,10.40206522925532,15.433753478479396,19.546314875413525,11.15250165508272,9.255742307931886,15.65267220218403,17.13118783474096,18.18496167025252,11.931162434323896,6.817820906848535,19.98832642427264,19.390008213995486,4.9731062301872075,4.173280756467781,11.397528935880906,6.1661817689385945,14.971252647310713,14.868415453268176,3.878024257591637,17.9114148996683,2.017240282521886,18.51520057866495,10.563844257675253,1.9667726106719474,10.357854318067785,7.524352647742418,5.4784841695155295,17.961379875381688,1.2457254697356834,15.879225166307208,17.720862266757038,10.083025037470165,19.082878769063065,10.799064343598982,19.47417214227249,12.926297300114742,17.719599254459006,19.5167451393593,16.745043922599365,5.294659048705332,6.956660744409429,13.388037682953481,10.953015139585176,0.9410277152870039,2.430933822502528,2.643873098411018,11.229102936613238,2.195254659033443,11.004535052780522,9.150046865658297,3.392911774143177,0.4425288237339231,4.614272032964668,18.058594123739105,11.704206801905048,16.479685246842767,8.46163580983057,9.243573129860296,5.230549492833125,15.821213512746315,9.267230685318356,2.515958902712847,9.703791729694355,10.660496772085168,12.623621951303017,3.8107557214983423,4.196249810102595,8.63424832212377,16.43257957110987,1.3035761984343575,11.409604031080258,11.719265105718804,19.912266492748966,9.890174782971958,10.310995428158694,13.108766534266923,2.8837697556882835,19.135808034541583,11.30166735040059,10.276204152707269,2.2772223345757325,8.486291949532676,12.193089572966528,9.08830323912554,16.949146714540685,13.489694710017845,10.099696501411701,18.83146854760501,4.321246645781742,6.355474122767948,0.9655640289042777,11.876734530938675,9.736374687261424,4.445919809951593,0.39053854409318856,16.033543922980197,19.739860795982796,14.904093517237168,6.328184371303847,18.76551111730455,8.630168281040703,5.856186176068738,14.035976270712336,17.68669825812321,12.153788035229738,12.745502527526028,19.19726978821963,19.80919295268722,11.860618991658844,9.386563217735585,1.8702988293023548,0.5540179885558505,6.362822415387854,11.191809467713615,6.460731295078586,4.622304358992735,3.792307747032053,8.404571581172156,2.3273168397671506,13.508533720734102,7.454983463424609,13.47695419052561,16.549852776262068,3.717378635020059,8.837466352615749,17.024815510760693,15.277697393667236,15.286077021684843,17.062454844075884,8.734910868005908,13.750910369877921,8.849244578276094,17.575728436190545,14.180814569728,7.994024893800904,6.356882946792237,2.3051942100449763,14.104366176427924,6.522057312823413,8.461112765462527,1.9069363533888994,9.024150251430365,0.36019760023123126,12.5328659653699,2.568257812456669,3.1054982608416504,0.43524825726070304,17.13804039781154,16.534843622648406,2.7686917840603797,2.6837218342338387,7.427050549116494,6.931987468631586,19.08106343201669,14.748408809292531,2.3104073765103506,3.5097803036071396,2.4363977087703326,5.886099626879746,2.880316772341689,11.664472097295908,0.31001736020264126,18.715995292925115,4.079996861176949,10.551530644265373,4.950504714148676,2.505722563786259,16.46621739503238,2.4947213252313993,16.10171154854058,14.188881860317192,16.861159927325943,13.337088064126377,11.266447098909786,6.0407584753336785,15.458261043305175,19.259552915132847,17.15930873471741,13.355083555011934,3.926919665884334,1.553083746966557,15.3650265173665,17.16581040000545,10.575827710791526,4.563401856258396,13.395197527760331,17.643196894662125,12.29054693789501,15.204609223663175,13.13232546373949,14.640447891883257,12.268851311444138,8.314418383191331,16.728154190525643,14.452413491677675,3.9271417765273053,16.075346137074874,2.260163537131792,10.514810216002676,12.409528739883303,7.350358848418805,0.7456895274339503,14.225842952735874,0.301905668285789,5.325690249114814,6.126892475684569,2.6506133069523097,13.452268882373687,3.331496297801233,5.949973642984645,17.073400529679972,11.577860481437408,19.783729391472722,0.7033357462816925,4.191831090369296,17.622237287958264,9.622236650888777,17.913458586503914,17.002547223535704,1.8213345627211197,0.4326956703406326,10.32220576807342,12.022200172286022,5.349338145929394,7.099656362778632,12.03449379965054,16.536170273471203,9.104281394341527,13.717924021523373,15.554132493668629,18.591783772190173,18.392765019881267,14.132212871761984,16.394361108832246,3.917042236263004,15.553832469654672,18.9624916282968,1.1499544073802292,9.197790709635022,3.1906647610378602,3.0039001557427136,2.049041658518047,2.692016945681792,3.655420101957354,17.192977801710207,3.3782533905357637,14.737948973441629,2.9190263948152095,10.39896769499451,8.911434988301474,6.585182425930731,3.2417077632716085,16.67169440230655,9.335740142843063,19.351412825662916,7.17697927300152,12.730082367757603,3.4640519644736623,8.17940636382955,5.115760236473124,8.604163022100689,17.75078402009314,8.080109557610701,18.337214669996584,5.114550371751565,6.49753431411316,11.102147175222203,7.21235759534383,9.621316769524974,11.609400271563079,18.39199700208743,4.908951622545135,1.14925067295236,11.9515030916578,12.822992888559206,13.369114324128585,13.924849922666617,13.602663037957186,12.891151382980865,9.591867066615185,9.56724450951544,9.724559106138507,9.820414399105832,10.818995080611176,18.37042817158004,18.293235178930168,13.293732304829401,19.35018586371268,14.976913012269332,1.380028448291979,10.448228778661829,4.50361652961516,5.980942595762149,1.9128629106166173,18.869269141079194,10.119090503388858,1.5096917573412227,8.935986017495527,15.083593670081195,16.455290694070612,9.166484606605781,8.154241952768032,12.384140166152022,14.509128866412514,11.444971644438588,3.4174305076054257]}
},{}],23:[function(require,module,exports){
module.exports={"sigma":[5.213812197650225,11.971432634923737,19.407438400270458,13.193926536463682,7.688481674605452,2.997009937949908,18.703658898729103,8.284278097615395,6.340047312987833,15.026979287826867,15.271291534141715,4.182305451292763,1.7623576881532799,13.62531325143876,2.8673316995300535,12.325022506681398,15.460251232103328,18.3067989237581,0.810520932666261,8.179509573152583,17.25608050164666,11.82256652202264,13.947951877345837,17.750654789159434,15.894888086440929,2.1449671154779804,8.223761586716174,18.343016698576623,15.099647213398576,18.45682703924863,18.941761309026894,17.00782208325782,9.010556316365186,14.41735480196896,0.9706477417568804,9.749915439041263,8.784651674656882,19.178888919635494,16.37675676737385,18.250613259333377,6.332882671428228,0.8365399575303778,1.406895701874178,5.622752270864049,0.2721961442406018,7.734815082696209,5.832590290822162,18.124631532353803,14.05259175474506,16.68942951756199,1.3705819286192655,12.552908787635353,3.5596730846481694,11.482625336946466,6.26191195066184,12.566074304201269,0.0860369479021994,11.49065657952876,16.93037505908763,11.674055037353304,8.718902243839356,2.474201202840498,18.21134382111985,18.16284949641899,15.468505615237987,9.876379070143813,12.378919926473127,12.56119973645613,14.608029419939017,15.82648467803991,16.32064595174051,4.0146794018672916,5.846177371505288,1.8751650055265578,8.193159047618472,8.668529438891678,4.456519527583058,3.4527366256904335,0.7181011601347942,1.9732886569822217,10.654122646899156,18.792027366521246,14.32065479282529,6.5838834027804305,7.927904623790685,16.008338951620715,12.94823792369077,16.35528711907462,13.864799625007764,7.116460178272441,12.850294998208982,13.730438324061334,4.029792289339613,12.554672473322261,16.52960796388097,11.954683841087643,12.441976069404621,17.451256961588967,0.9981323899970862,1.3901334120198738,7.459213396044411,7.8908057151566835,18.41328652611281,7.194274136999725,10.410831182001656,11.35951429755723,12.573918007678735,0.39521523912905643,3.904896842954102,7.8583981687968585,2.305564874674042,1.2501814059534855,5.0356670916002955,12.237381041090764,17.512016920911297,5.357874693103941,3.865169787774594,3.5858313237350936,12.857256545971204,15.077546019816182,6.287171635628455,14.34065994681372,9.263330053199898,17.640816159941362,13.081394952031546,13.9266165209186,19.420417201310308,19.733676418184913,19.456898505934817,11.986760237727871,4.958034076130993,15.438005489062189,5.706070159494616,2.9172451491976625,0.6086681444196795,3.3375880926951185,14.242637112465054,1.6011985101275927,1.079780553164147,19.58050796836075,17.67882210585872,14.001821089291129,6.50016113344019,1.1843666240404893,12.267649244330965,3.2709189248034276,18.632958812335648,0.9904930451633343,7.7828247237017045,1.0546836562829043,11.543814877718512,18.215338720292955,18.175071655000462,7.336375514446933,7.884772742189465,12.46038721111551,2.9247687892925978,15.675681491282795,1.3082364953586323,0.4825803978253296,8.269986605047187,8.039452764600451,15.563281733687791,2.9998654982451445,3.3346099804665963,10.202491607846458,11.522125173444739,10.68785694969732,2.1006086945314717,14.291525412605953,13.800692562001409,14.645789069918784,14.483022800357027,16.81513197039488,13.227572295498899,18.643780347737223,16.423608657946765,7.427363063250287,15.991596786932618,9.383074817715503,16.030696877206925,11.395932259077114,13.80574743681024,5.688647732620202,5.944827557922987,2.992000368030814,2.2185464220642226,4.561734819192735,19.754401877660257,19.479916715799757,19.276299970315915,6.374433355228413,6.938697104750138,10.692858484924521,16.358205458014936,14.965179974475094,11.702437372769104,18.189020369253086,13.338540076080495,10.573867269631743,9.842599040004343,4.461006881288663,8.569838300063308,15.19836945042182,17.407977040033195,5.387553733978181,2.661927758062048,6.66524627286055,11.997860870181146,5.994654680105693,0.2412735151584089,13.864239398877803,18.627221727046678,14.791753195726315,13.263287513108502,10.417425185731881,8.343804466702931,16.295429956831402,8.116158846118715,4.215412830593341,7.106623344827772,17.899244047420066,18.582293246406238,2.5261485543937923,16.655273987842406,8.578080793292076,7.745431060481356,0.02359169482712531,11.049425343383117,11.651161300638186,9.03080369362204,0.8104378255196032,0.35257207213829744,5.7823142380783255,2.1804725051998375,14.303830347946294,19.859381734051,9.029910704313773,7.284723386871872,4.279207310122932,7.81567846329684,16.29376923527756,10.68941984239756,13.915378344415764,11.176655671868264,19.766763957046635,8.49559401238507,0.29311665882570725,9.555976292787323,13.978320657838651,5.863582594069459,9.390881381509061,16.091850765469403,19.984930484740016,8.198914922387832,8.84796552522098,19.197673882981988,2.8693230234451006,11.337635255239569,7.778183041418565,10.710833553907651,9.196786175658577,13.579363797781344,2.2743604493261937,10.259722081295948,11.034154984616071,15.022658087474493,3.8602798306729857,16.485978278391393,4.697535456249433,17.910348999872852,0.9115879795578596,13.218779256767172,16.976829603749152,7.189426248952495,6.1014469829243945,3.496230429963836,4.068963496516775,8.24535583343016,1.4226345224277237,4.10088826161052,1.9130505215238536,12.295702982421236,8.025659884695218,18.05795076197015,6.6297292320013534,9.976248621614591,15.295355677647976,18.34334366869353,5.051439232578825,18.145971357519354,16.866212285871537,7.773890015655662,0.563548309911992,15.807289361744195,8.777619882482949,7.969659216525731,0.7109922709862149,13.27772851738612,19.842395297567474,0.5101286951868778,12.297059469744172,19.752640401687028,4.911997109941413,1.0561506293242928,14.756081475099148,5.934763459050556,3.7834801190816103,17.92947489875054,11.252242854138949,1.0803646983546722,18.34882521861115,7.277326034705505,4.56544593519896,6.302951039864957,17.056439998222185,1.076092188445319,0.02636966572597821,16.910134731845226,8.609665651094026,7.750693317739543,3.229236851949149,16.841360592021445,0.6311098836107742,16.39012567154324,5.242500467009115,0.10570002555895908,17.16244357890346,8.835452264669023,7.022354869829068,3.254695438724702,9.912523958696525,13.046094929592877,5.748103689618818,4.088271461864088,11.977959987288052,16.36976084363102,11.78963050984807,9.959997577004556,15.666459165923818,11.534075488669707,11.21172905294788,13.14247453769367,2.541642707411147,16.259172647618083,17.763524158685314,12.68832393339958,7.365302485221101,4.911530582789716,7.17416166595493,12.204670096809922,15.547822837291655,14.885542738304052,13.49032296798109,1.230298922419859,14.414337743836999,5.115933555889454,19.62408356721015,9.000266431037684,12.44590785788147,13.089087517405812,2.69004293261085,4.045002098008852,8.63482660591957,7.200152956558599,11.562100717093777,9.57007019478115,10.924648093760347,19.403905952042855,0.05851748462144091,11.8750730473272,12.339385474063121,12.67619814310413,18.523595578019858,17.345866374548756,8.442001003803878,13.324798263637652,9.004019032906223,13.77795660200448,18.139970709914802,6.324720662104268,18.590172472437697,19.873101247044424,18.045398274851607,4.925337083765031,16.65030533481115,1.7414111191539394,8.245551417348779,7.169729400485703,15.185816890192122,0.9420647015950934,15.640661329762091,10.3211161548654,12.469188956010102,15.777129462993953,14.13450477076057,17.232703610718136,3.9883887745367064,14.753132198768885,11.84758188454726,6.663737674502679,4.894798942034169,13.813847504998979,18.445320565305806,5.589956705736325,9.927737256015856,5.517965245468726,17.49674395779141,7.225330647630637,13.303836271354559,5.212015257757003,10.278888168788205,4.559597529526664,12.73918466803568,4.786164225377396,13.319230489036125,1.9413965510590492,15.549370831974251,0.020242709677948945,19.799620797042667,7.319824446890744,11.865353345053812,13.366744593113836,6.850579457404087,1.059961680570618,11.984748555506236,11.248906620209883,10.923716317267175,4.504339827272776,19.007970672707106,18.871037157620805,15.889059670754504,13.83787295541476,5.044552211847235,2.5531997688914965,13.988846519530664,13.510638139801504,18.4912656293462,17.984025810231937,7.149499649618392,18.430716144096504,16.977812195316755,19.179643855906065,7.2582483595323755,19.10300356561948,17.870009837297257,4.515112115106916,15.743511432757437,19.68276106250218,8.13225883614638,18.135886854863653,11.683051275196652,6.009994428890337,16.141061930079744,3.5378306903248102,16.77107572918636,2.4243313584667314,10.375240923126361,4.979148623581415,9.519755227881305,2.1970177274902136,1.576213195973386,11.476801432416895,7.917325405390772,9.214018211153942,14.298187729810184,1.2331800818436944,7.781730376038656,19.47636321532199,5.721153838323483,1.9790465858611928,15.496991403525575,17.092761652735334,16.410958867421943,1.3434991064616897,18.667839948422078,7.301043914038168,0.5725071523596048,12.141780860074443,16.025366100161648,15.615476294156627,14.83435765875555,7.714765683747067,17.039830293733516,5.878964161347011,8.962979412348444,13.409005792773595,5.105545856622986,12.453579539988233,9.585408691770878,13.375512686718087,6.876093716659923,15.283492893906052,7.872872133208895,0.7083664002647483,11.72386065355655,14.563013001682084,13.218967258531782,12.320586605302548,19.776722865971482,10.124936451060327,14.582507334810359,9.093277166671076,12.706341932597404,11.620112878148344,8.316071973174086,2.649456630709963,1.1153244943268659,12.473070443102166,12.156316543468995,14.361384072039112,15.216699923910944,11.734367542031215,3.7474644533806956,11.438547661102717,0.9179757086444473,12.71760159086444,6.316521367142731,5.006325417377768,11.62147304275658,2.4556905178107513,7.704272982991194,15.669538903288625,3.72740063070534,11.13405631802182,16.751986197671012,14.809051522202648,10.737845497901958,10.993956952253585,3.6952253498001397,16.052312991017025,19.19663752700351,13.160773038466456,7.465428578119124,3.953004238170008,7.354449603659883,12.035624899987374,9.354153269067575,17.206346890659255,6.5529488930422675,13.753160683476203,3.0387903851598974,2.6103500899797627,6.077569782354431,10.883837055925882,11.10374788521941,10.979142405445979,18.30031199829687,5.026597280319018,17.051379438579556,14.625465126189265,12.62658665148528,16.890764882282635,13.06361386796921,18.63411843064199,6.235545039890873,13.755483137391927,8.567571823930361,8.407593450194142,15.387641607149929,1.613706311988432,9.47566594259027,5.6154184240759975,2.599088358255419,5.932216852900494,7.817490184576612,10.242426410636929,11.64523010461778,2.3418422923292814,16.863477994871015,8.81848998125525,16.564388147511547,15.534718097344262,7.527512423141616,10.539337276845103,10.046097055738432,6.864248619010276,16.440850399552218,8.462998533780484,12.287368939913401,16.007398644463493,6.8208505936732555,15.445198166133508,1.7929975461820913,12.61210957190061,9.932151502491466,0.2934723095257086,11.293307052689725,5.220088835094101,3.9147805940002556,9.498714414576806,0.388444091693545,15.177496551305714,12.9282506354089,0.7071914732705986,18.89333496502813,10.445378802728085,3.5975878165431885,14.12536634572156,1.1149195665447076,4.11680651448179,2.8396332241411315,9.464378445786966,19.13237349461084,10.626369739848345,7.49433347764942,10.438449707176396,8.97219605614473,17.709611502792008,19.597694784844055,17.449992506333103,18.91310329224138,9.091433221156745,8.754217327473594,12.728655073424804,1.5976928583379024,14.60795304072148,19.22426130485548,12.050553373969034,12.033328374472259,19.860812248433298,16.196644571739355,1.8442140814629582,11.148038729032187,0.35252687424560225,6.337485533291347,13.750032916725852,6.205905542586643,3.4083437314439546,2.9781519383758637,15.724909969491545,5.308055331880337,0.3248169170572224,2.478385027315131,14.020022606240659,13.59553601889321,6.079348488885499,16.582962550091022,16.106131730836886,4.121613445558974,11.855237409406971,14.956004474527639,19.587432838536326,0.43418445098585945,13.928830856605234,1.8174083833501076,14.297152387003873,10.019570962183604,5.774229422331554,16.138313845026598,9.587555890421683,19.017693617785607,7.306363333829138,14.760118941417542,2.8386444836140656,0.2775553115254592,2.496090986240649,4.004444802657066,7.808963554342729,16.555156809837417,14.854616017337312,5.459929509192909,14.362897017307272,8.966398403026798,8.461935936531555,12.99825534043238,6.49559455457783,3.532389888778966,19.47522162633012,16.669648522583927,14.740536252526582,9.774418289789772,7.8625665221740215,4.727196579563562,17.801581632113397,5.5348706932488945,4.0600724040638925,17.723188175231517,12.899144046426812,11.828003389953764,1.9498406522374,11.688401697630528,18.824881167337768,13.40988250635676,7.650492589944338,0.9023711076086949,0.6715188820371987,6.7836014291954605,13.850616992818793,16.125200606037456,2.312595902386936,15.777254257968675,1.504643133263519,0.4305642224859252,7.149500051190438,11.95050101927555,4.475878103449538,8.849722657669128,1.380539110364034,1.0877242747295046,18.646014333112014,9.776745848478976,7.850206478396946,6.789375196121443,17.063946649676538,17.82639582387211,0.6662884945119263,2.3108254896141744,8.795333615948087,1.8917023821244605,16.568083448067252,3.0706902339703657,15.076724686608554,15.553711435743178,9.352136785574366,12.66857562933465,8.456572599934042,17.505336918223332,16.3347270505632,18.827218766154683,6.354813783877766,15.088214735761575,18.952200670560167,11.351591164622334,12.623330616395947,17.24854518486131,8.300864722359877,11.928593921844165,9.110098314003473,9.362632462424298,9.535464405251496,1.7521416610703167,15.908424471567898,3.5610735017790374,6.750243874915776,0.8676432953274205,19.425551937315326,16.83721830793743,3.335247050636805,17.95832665863553,4.745237751351676,9.548081139674608,11.278652051080797,7.7635197457592,17.231227409343298,19.413241127436088,16.660718756355195,7.079860479195319,2.9697935951758225,10.658636021669356,1.360729739152875,11.739365669007181,18.95473322040271,1.7795571351453532,6.495847724018744,7.072559751405416,10.205683685855593,19.233160103460662,18.235468797776647,3.0781993474512115,14.896607686101566,0.3964278178358205,3.380939434696071,4.011755666872228,6.995414742617623,1.0216142838447295,16.839028355570157,7.615774303894667,1.1446960629641545,10.94976559770149,10.458142687700306,13.247791782423866,11.858464698852664,17.919761720706372,11.212481266850226,5.452859751815851,11.219437573250094,1.5883070110457798,4.319356886741859,5.055913610489107,15.501206252711533,3.9835325286530576,9.00473634430869,12.85651712226619,3.070373933005226,7.729906583236494,6.099345618877061,9.170426549485974,13.286477735942617,17.20625283652752,17.030907066037727,7.714866204763546,4.269919961077093,5.670356055758896,4.5915410943865576,1.5306541215936864,0.12564032378340695,14.173010696956965,1.7325357529183316,18.076508755454675,15.508188654596285,15.409851073534139,9.507023743043561,2.280688238241093,3.735304748356305,2.5952652226128325,9.133793524388508,11.844350602468158,10.982562695278425,17.206334795182258,10.771747951176774,19.2610036391244,11.817921525964547,3.489857897380273,11.453712219335479,6.764522024264532,8.869237995560892,8.191004540944341,7.54089986067779,8.132639226520904,2.2703091904690442,11.302194075251254,18.930380110864327,7.05216820576231,14.205426656470284,10.180485203470791,18.712114106974198,15.334752112898173,7.53085442371352,0.39697621292989815,9.630760410911732,3.681292525141955,17.303061377908634,12.834561819678072,11.476955268649753,2.3095173755487552,0.21975820979657446,2.3627107970774786,11.269806521065684,4.379236358661576,4.364944150240837,18.86209378106726,7.224319217891266,8.235763436974345,3.7647182918708166,16.291305872723477,4.714133463754084,15.977000906592092,0.31783848036119,6.802007590547432,12.903648352308492,16.971290839460377,4.9455651830344305,5.50476842498389,6.323249390887176,14.652798604459427,0.9239503064026167,14.06557041960848,12.682660240060951,1.7100661595901867,15.610884632641646,17.788570844623433,4.935673935929064,12.264746169839471,18.858901167904317,14.202418766843774,19.95065083256449,2.2593756764455675,18.393938728999274,7.63656941518037,19.087007478853415,18.676906568133248,9.801181991000107,1.064953091273555,3.995911780879835,5.529496122731503,6.897658921959673,12.26734107554794,5.782965463031355,0.01930804825021948,14.814548990518851,17.255727582176725,4.053461227537287,6.934675040208291,13.05958919362765,15.990057181763447,7.208437636481855,2.7335794408982483,4.649136323489991,10.85736175668317,1.838912753822477,14.917833954073707,8.880446323682953,12.093525028779307,10.320196398145765,3.8911576834295003,11.792752555714742,0.4031300967312257,3.3989167104793294,9.451464640510526,10.38680429762028,6.7334170805019244,0.2007956387076293,16.02640080433644,16.196597303966563,12.11857108220582,4.592273755483145,5.311196439067927,4.698511181552898,8.798683293721492,14.22007064597489,0.17992097225184356,7.308328119323306,19.128082547925338,17.985673791225317,7.718147236755306,4.015592752637263,9.497599955231388,13.981863676030613,17.078993136663264,14.699204796918913,3.7535138768644094,15.48762739738121,4.02856281310954,2.680348854045236,19.44704756755921,10.975850000128574,18.184792657997267,5.679243395001561,1.9938454600216682,1.1679929405432565,16.76450955122307,0.830633774168037,4.354138121631159,19.27174402155954,4.048061690517639,8.83968252400332,12.35987461270434,0.0013770307391025582,4.828034818281823,18.429597105113782,16.465101575242823,7.078262907068402,9.999903681497795,16.797994447385104,13.561321083763197,13.098809482517195,2.9701212979625646,19.035026553508054,13.631987385053739,6.192491798421429,17.809458759570145,6.776504717132394,18.48934423727838,11.939655763038793,14.318876354053218,4.908081400237254,3.372750552496142,14.22523530595338,7.687589669404251,5.881558620413201,9.284863514966343,5.785032339504981,5.229656179665909,7.272116241518183,15.17869583024099,12.360072080982016,8.461862404243842,0.068872251845713,3.8245114304863836,9.716401534000244,3.032674060435947,11.238210945469334,5.753370494685361,15.336183439705046,7.251016154402192,12.493106236339466,10.370898363323908,5.1643109217496574,6.986513058247414,7.172560641234735,2.2024169218182443,5.012816195293861,14.882340886910562,18.639955096598623,15.283364851178668,9.27228906421702,4.868911117558046,16.011017115510843,9.280456475865941,6.406458335256979,18.841537637106622,8.462146342825449,7.622446317671221,13.482511463489452,7.162935657718852,16.712000601572562,0.8241476308483664,0.7059868829477756,17.861812629711494],"expected":[-0.01802917870814106,-0.9372146444742733,-1.472537007252284,-1.2458779599353984,-1.0838791397919239,-0.26193409957930097,-1.7680785707037734,-0.11968815385954812,-0.14934310582058136,-12.582257761375299,-5.650103384827204,-0.0197808642993447,-2.7049368315875938e-25,-2.9554970025399476,-4.3251533849428474e-7,-1.5318551130875862,-4.147242839485693,-1.3523425764294346,-5.0980001008040393e-110,-1.6642819265157718,-2.5591602690637516,-3.9175235134921147,-10.690075201118908,-2.540076722606242,-8.114880713345356,-0.3564856928962775,-0.10518105333317862,-1.1479464873893102,-1.713453243083355,-1.8833950885450261,-2.6280421681109196,-1.103548847566095,-5.889317435156914,-1.203313905229806,-6.468690744096554,-1.5228435855142162,-1.2520712010119714,-3.140194240998328,-0.8287695612640126,-0.8050836027914647,-0.010916065314290837,-5.987390710658698e-6,-1.951539135106704e-9,-1.436918360422573,-1.9999009695990888,-0.2512073825529571,-0.07518786689792221,-6.1872571571058925,-5.4135801885733725,-0.7567124684485657,-0.00263310838430466,-1.0311213122141631,-0.06909696747616932,-2.6523648222354628,-1.3207819275685229,-2.832732080348648,-0.0,-0.3334971511682924,-0.8141174641718343,-0.5901993734411588,-1.1089041926403156,-4.4501139433697645,-6.1959680865297075,-1.4529638497647108,-0.6291430998697389,-0.3312848003626065,-0.4231879791473753,-6.817668498968164,-0.7081797355348515,-1.0722275947726927,-0.9421619524682902,-0.8330427158259874,-7.222560201259401,-0.00233764559347268,-0.6554246320775933,-0.0945428832695713,-0.13069589439373258,-0.004422363532433604,-1.4480090888022246e-18,-0.06762598489324481,-2.331519945145919,-2.0985900530835577,-2.0976357892556163,-2.6026323220822465,-5.795055949735216,-0.6387547773001937,-2.120723537764439,-1.122664187930341,-2.7362546289642387,-0.03165602112684848,-0.6182800659198527,-1.9884944112690415,-0.02716856661731317,-0.5961171526584204,-1.4654850324253412,-0.286822345679669,-0.3726742733490256,-3.242564699231872,-5.059329221418309e-7,-8.490699687597021e-24,-0.09246231492991175,-0.48569738397580964,-1.2969105793684523,-3.3288114095066077,-0.24802241068671918,-0.3983147917646043,-0.5804478169581797,-2.5893443268965723e-30,-2.746984268345397,-6.083145537551323,-0.0014163817436082045,-3.99905664593728e-20,-2.4237860928637853,-0.7811011311522734,-0.7482396459515168,-0.026358140362762524,-0.002668176907047262,-0.12033010596297665,-0.6363887562942026,-7.9145171117184425,-2.868480459354423,-1.942417671969962,-1.5441363173810507,-1.502477612304699,-2.9242091062614697,-4.786378679654626,-1.0997471715200695,-1.2071601300548505,-5.909267436864498,-1.5857478939842422,-4.101482187323028,-1.2214968891636742,-9.963448882011996,-9.738598595449206e-11,-1.9513970807972377e-70,-0.0020297584775660943,-0.8516047935654367,-0.3065238786153489,-2.3503086587290706e-74,-1.062470261733341,-2.6355509273003297,-0.7406177142361302,-1.898166408572891,-0.029595034103816968,-2.4120638643990615,-0.721435532573258,-1.3673594490768803,-4.307845561463862e-66,-3.2715722863020855,-0.43770136429727735,-0.2899405887998701,-1.7201812282006907,-0.9828398098247402,-0.6970190132131892,-6.156739243800729,-0.6046660519005601,-0.008281215862268352,-0.6575404974394399,-1.0871237749028511e-7,-1.5132657318137135e-211,-0.30762855067879025,-0.25967370636693476,-1.0070358530857275,-0.00030297918655459115,-8.877820575747634e-8,-1.8048420632765432,-0.7891892049906578,-0.290215252168072,-2.351733507489257e-17,-1.0315494266895537,-1.2311589193008823,-0.6021144021901781,-3.6538759019455957,-3.771351512095769,-1.3618998572375307,-1.216046942628954,-1.0036401174163418,-0.8764795534829913,-3.8783390022481186,-2.3481926556506636,-1.0892748931889833,-0.7669071335064918,-0.6794215630660083,-0.007339584836999058,-0.08469573504053714,-0.06830885154496653,-3.326879440738233e-17,-1.4429735308911347,-3.116858764411292,-1.4818314942970097,-7.994896882262521,-3.2680519104751893,-4.561528394481784,-0.5905706310515914,-0.9223934112555201,-3.0174017916405433,-0.32340093492531896,-0.9118792583947362,-2.255751435668226,-1.6870860237328607,-2.9446267058345774,-1.4611367544258995,-0.18681229996757687,-6.8761129446409575,-1.5277594449657421,-0.0435684542316203,-3.4537964457497403,-0.661400082046409,-2.1550159377080806,-0.4137824437818755,-0.0,-6.042800342403864,-2.087884446051096,-4.5044525208567645,-3.235449481704388,-0.5682206874150867,-0.09266314668558606,-2.6062763135944844,-5.249445426880595,-1.1061243243285732,-0.04566301054824362,-1.190545641772876,-3.3191527893541584,-3.8001700506733975e-11,-0.915482690062154,-0.40223925229243784,-2.741033265083562,-0.0,-0.22320867851408385,-0.7763596531611233,-1.560762790283571,-4.777642195789916e-8,-8.8323443059308025e-162,-2.120003911388055,-1.3767390505683588e-7,-3.1984910223547116,-1.0041575424828006,-0.6531312705173,-0.2809432048027763,-1.5095051711736913,-0.32237091848299315,-3.0216528682358375,-0.32452473905820967,-3.907031386177036,-0.5280234155380039,-1.3405711995653369,-2.3698036729671,-0.022770875232947036,-0.24005161786456627,-2.086324222318441,-0.027519691690521365,-2.364291091565583,-1.6724469413776752,-1.7904423963736664,-2.3744114099551066,-2.431078885953812,-1.1839713755666146,-6.001424791951414e-6,-6.729548849847244,-0.058187812539949736,-0.36508262027530275,-4.021779274760172,-0.42113923407219667,-1.8004728393272984,-0.8278701026917119,-2.73045764345881,-0.7290959862574917,-4.520241514868391e-6,-0.7130607305745421,-0.04697557248879815,-1.2946836318425583,-0.0001147274966923531,-0.7626963204802637,-4.123798074968258,-0.8168974844103575,-1.7894588061091972,-1.0801976891519711,-2.5843683632785255,-0.20563099836288976,-2.0768751029505339e-32,-0.010826914105877918,-1.2102543666619514e-9,-0.7986885576599431,-1.7384233129113715,-2.7660353620088856,-2.417971472547113,-1.301112773254128,-2.21687307659503,-3.276470514367722,-0.0008251502843065749,-4.539167355913354,-1.3687378156903969,-5.141624859453225,-1.9128322461829304e-129,-0.7184488282769268,-0.341037512102845,-1.225087965732168,-3.2973081750089365e-39,-2.180496445163984,-1.828436536189944,-4.7957764878071076e-8,-1.264900303387562,-6.913635109368584,-1.0857900741477349,-1.4992495939013266e-55,-0.8041710271885187,-3.4054491328800256,-0.056845614600228765,-1.9865320809876894,-1.0343135184628975,-1.2865839281320258e-71,-2.1981806418594134,-0.19167845471007564,-0.003701667623798331,-1.0043108262295157,-1.3175282040476164,-0.0031420165445671245,-0.0,-3.2634748466784105,-0.17570510167644557,-0.07099374546836743,-0.4851712568944683,-2.8875610573735515,-5.327924367008002e-138,-2.2796713113610902,-0.009301228679057324,-1.3889639074442844e-8,-1.6748274231809455,-2.4135060673770683,-0.304502658187687,-7.133921984740398e-5,-6.278755026962894,-0.4474303163497281,-0.02147699902098158,-0.02197458656335585,-3.15995837554853,-1.8850305198787893,-1.2073137535980092,-4.7418916110073255,-0.6029625732690442,-0.8309868496589368,-0.3412778929685365,-0.9597101532274808,-0.0004925765617513216,-3.3756206545328165,-2.0900124060717133,-1.4453838773027907,-0.026143562872161377,-0.08684609192480779,-1.374945263646524,-0.3165509637446916,-0.6716775971058726,-5.53477067911652,-2.871601396247274,-2.0847016990321196e-41,-2.2103912422400835,-5.743737960268615,-1.0063908331673876,-2.4791474341636475,-0.40813241359385166,-4.2752109393785345,-0.5875326751360115,-1.1623634786696817,-0.20249563942160068,-0.02242850985098673,-2.011160330735788,-0.8514209993233552,-2.3591605568089933,-2.9401095536736346,-0.0,-4.0053979788516525,-0.6765772367278134,-0.6103246569460486,-3.47834339820053,-2.665153349667841,-6.278489112701975,-0.4890967906942894,-2.499829702095681,-0.6811468037374024,-9.11341866319835,-0.0205213881847792,-2.9850958297301076,-1.4968946646531496,-4.147899798661901,-2.281365166810019,-2.566626083526204,-0.020746453151827375,-0.07814662949456735,-6.433972397762485,-1.1660856832206492,-0.00017055105983536676,-0.6716547437684655,-1.3336892417422521,-3.6797228229780847,-1.171362769050207,-1.2021306470819455,-2.307122615880157,-0.028010570591044195,-2.517768089043911,-0.45693749104044573,-1.8573380293103432,-0.0014110290683221308,-0.617563567886575,-1.8288506007871246,-0.4864920812507993,-0.2904833210029297,-2.2088298613425366,-1.0607983942139307,-0.07327080582203749,-0.8835217415215209,-0.0011110211046728824,-2.1589107280153836,-0.23706727660877494,-1.4410541607766973,-0.00043973842918869946,-0.4967788839746907,-5.945352059735982e-9,-1.7540194606664148,-0.0,-8.077412931217916,-1.7674669824125595,-2.8313865430692107,-2.3230496586552283,-0.9252238268933204,-2.1979219868646834e-19,-1.2856515860000526,-1.1938666253368124,-1.6912884314524759,-0.6122376274416548,-1.7461050269566152,-4.932499959389451,-1.0936788429818292,-2.5013794918768895,-0.009496743565971565,-2.834367038833968,-1.9960776098268351,-2.756654675584885,-1.6817955068561163,-1.5628386250510597,-0.13567066578317352,-2.813961367291105,-1.3002727973289923,-0.9065564970725122,-0.7136100266090941,-1.3449351119825816,-1.195444071057283,-0.7730120575413266,-4.106604222527002,-2.6342014745916376,-0.8689999031661041,-9.133982207925873,-0.8365042630149563,-0.02408793720094735,-0.8687278023002221,-0.0010869742889170616,-1.4236532529086499,-8.506708152341915e-7,-2.2833752722829814,-0.00044634412076809024,-0.3492515833500993,-6.932573043579223e-12,-6.661761868555873e-28,-2.698525285404522,-0.7065627163353941,-0.1462881579345078,-1.3738745369408552,-1.0209533692158458e-7,-0.6259461184644136,-1.9944765375472355,-0.48740839935188757,-2.935608404428846e-14,-0.8499804483994338,-2.305339359771252,-0.8326095725408874,-1.191545592919499e-22,-3.921690243831252,-0.9077034200895365,-0.08254258978056762,-2.613173160039721,-1.8419797778459759,-1.8966351720943782,-2.696527459415856,-1.1599711024924546,-1.729452370528602,-2.479948856474775,-1.6168156748713658,-4.553697971223051,-1.1005466933950612,-1.9574772679222328,-2.0088265428638636,-0.6762739728133831,-1.5871476506060602,-7.688812644646369,-0.3559533459447331,-7.602981450054766e-59,-2.5968674301475216,-0.5447269553572088,-0.5331627182665675,-4.839095728755896,-5.603170776917318,-0.5925289288769925,-0.6957602680905411,-0.21866625741621087,-0.5977946628957291,-2.7886995438127693,-1.2155292042073338,-0.00010675673727621593,-4.919948058447549e-16,-1.3557214926363976,-5.099223149740682,-0.83572681389363,-1.2890473999052972,-3.58014022442166,-0.009905305657362385,-2.517415951739367,-2.4085100812168277e-52,-2.823716177891526,-0.013154351656471839,-0.3947946681144903,-1.73065025524761,-0.0004497922197157083,-0.08663334800506876,-9.806943279157668,-0.005907563481616107,-0.5657612355336077,-2.0090586331069433,-0.5301914988341682,-1.161459525355684,-3.614221240817494,-7.399847216141505e-5,-3.195398097273208,-1.5481415182720029,-0.3814835826640275,-0.09855422321157807,-1.002776397558701e-5,-0.5830583461896568,-0.8494832519908995,-0.4092866679783734,-0.849484747865576,-0.2907162822560707,-2.440414722342861,-0.002073006275122959,-0.11546599008612668,-0.010516680972877885,-0.2708887771800692,-1.7441872017192908,-1.9951921299325315,-1.6516254642316075,-0.0013085760940389232,-1.9514463968583557,-2.393270051993712,-0.715090122588711,-3.007437409765057,-4.047290588732585,-2.2380923719302497,-0.18571863046918585,-0.5974774134769905,-0.1065654698502543,-2.4882353354025866,-2.659040360275056,-4.286382217064753e-19,-0.38613805603196966,-1.8100615933902056,-2.415727543321783,-0.25501739917919236,-1.181456541473879,-0.24604297539040842,-0.3363606130105317,-1.3088485707962657e-6,-1.364480415041192,-0.1078489059082062,-2.4956636011923163,-2.080414277361596,-4.490031803097567,-4.138624552857777,-1.1622130185063553,-0.039754763325361396,-1.0239535572071923,-0.30134541120504527,-0.8557019922400821,-2.173407637518362,-1.375214770134805,-0.6503029282252555,-1.1027191802059638e-10,-2.8191255781322297,-2.9555157661508065,-0.002688446486498603,-0.9807633364683379,-0.22620333719274904,-4.3397567133834725e-6,-0.4436778943002027,-1.1859353335652195e-193,-1.9636178359079857,-0.5023496918214163,-9.66492653676327e-67,-2.587549123788329,-0.18201439490467144,-0.0006362260367406141,-0.47839209022104406,-4.771313466256382e-7,-4.8706882759754236e-5,-4.223005584682652e-11,-0.3715527544125158,-1.6900616337415555,-11.277918410372681,-0.22952043597375446,-1.187165965542024,-0.12860692427207238,-10.318039228685306,-1.2320070759114226,-2.845436085183683,-4.3298486428221015,-0.485321041327104,-0.6907410348635048,-1.9807747090522336,-9.9939577843131e-9,-0.6322354186180137,-3.196475778700637,-0.5545872745731824,-0.33040254193157925,-2.3666845865604103,-0.6978351907835512,-3.6827483568532515,-1.4972592475251523,-1.0682321265160174e-164,-0.5816123023413075,-1.910819532254197,-0.6753682473127745,-5.546276765614327,-2.444126988237432,-1.1577884493075126,-0.23616754473991963,-1.9160052118500177e-153,-5.646988558629422e-5,-4.50152311695957,-3.5935004406724995,-1.7962614250054143,-6.499269527777482,-2.037434655926346,-0.0005302559636933815,-0.9162328006163101,-3.4111246191106246,-0.9226875229999657,-3.295512826456186e-83,-4.467149540420812,-9.103547959433563e-12,-0.7357139899617685,-1.3589035438937782,-0.28793528652961464,-1.0677595784734981,-1.9923931660947571,-2.078551816762812,-0.8347641024264972,-1.6851843272595588,-0.2138092185612694,-0.0,-0.1031454372165534,-0.04631809761328643,-0.07954272105554909,-5.003210114358252,-1.7596625957140852,-0.0016547310957830623,-0.9415612356028087,-0.9967227970013743,-0.13349905316738211,-0.9978781814000233,-0.15606008546511901,-0.013889945527982662,-1.8173800165572436,-0.7700300814443899,-0.7291025954059706,-4.011300318919293,-0.15123163619004798,-0.006564278942911186,-0.7653945266905,-0.4569192275525012,-0.0015818884243696825,-6.369674668768185,-0.4490237161097659,-5.382709299194154,-6.5276037411212815e-6,-4.78637590056687,-1.0150117991018885,-0.553530437168511,-1.9915976334166916,-1.241795915446185e-78,-2.4221290517726122e-20,-0.024711207659304405,-2.494245311412768,-4.4879732853887715,-0.0004168760167889284,-1.0914738065629057,-12.25329225741341,-3.826295554474467e-257,-4.917741692351453,-2.6759753363121415,-0.052756846203175736,-0.7366957349252045,-4.7028190596850406e-7,-9.24104423127157e-5,-2.451173601145686,-0.3520015310307557,-0.31793727137604644,-0.4237924616227547,-2.4640496130194776,-1.7486169374200178,-5.605562086093106e-166,-1.4105429951154578,-0.13434829900822354,-1.748662087182534e-5,-0.768291178713753,-0.02114031159598893,-1.7564908782311774,-0.9427989172632643,-0.6016104595888727,-1.309376766930414,-1.57485737262837,-1.1250915076451196,-1.2626599472978413,-1.0587051872655542,-0.7072427237784962,-2.0727165304426536,-5.079103136778782,-0.8047348942378876,-1.5986565531568586,-8.251094057508855,-1.2026492586604005,-0.30499324334377986,-2.9003870083136207,-0.13926527709492392,-0.7432399178973088,-6.952011537769005,-1.8402558029736686,-3.858132674947324e-5,-0.4067132451794526,-0.0006623001900819269,-2.6225261776277247,-4.4349169874940815,-2.4156868128853344e-5,-2.8854844051700588,-0.03637606964570677,-1.297844835390064,-0.5011266918766158,-0.6212030387681664,-3.649485471303935,-2.0097283537286383,-1.4995419076433476,-0.6545576440496844,-0.10437410584719015,-3.9204013100704374,-0.24219359870654614,-0.9149401469081133,-8.586337478966529,-2.304154539182778e-10,-1.929226080434899,-1.3447193788868539,-4.554430756345906,-4.800045939829593,-2.161102458308445,-7.575685562958609e-6,-1.3899002886107754,-1.989565418088709e-224,-2.5276709902522238e-5,-0.16308687115547044,-0.3711243153588304,-1.0657911673200287e-60,-0.8314659326156456,-0.036477139808592574,-3.2463227637828654e-50,-0.4405908769621607,-3.958099118204464,-0.4659247505313566,-3.6113201681684703,-1.1688830049384087,-2.387873084536788,-0.4072901121232903,-1.628318218723342,-3.908660239953099e-5,-6.616149769750954e-5,-2.0294681924007842,-1.4367254133880447,-1.8037434063979764e-5,-6.957334358711743,-3.8072476895956617,-3.624052184244572,-0.21201994248486788,-2.809283435819051,-0.3339440314504137,-0.9258870875967877,-1.2305899372925968,-1.1658477577692061,-0.1603197396862337,-3.110289175027123,-2.303923402885717,-0.12002588585279111,-0.27802676478657806,-0.0,-4.099005002345941,-1.6207859685065098e-18,-1.9796233752944754,-1.4456174335656709,-1.4326733509881304,-0.4869121434441649,-0.00014248867485129298,-1.135964774145932e-5,-6.297449837144179e-6,-0.5238039729238557,-1.7329131596277245,-1.6019349911260077,-1.5331223462273087,-0.4355777608392097,-3.436854241676006,-0.6731908169123525,-0.47100616884372043,-2.4249622275377405,-0.3151145810574761,-0.12828767753335008,-0.6905281324762289,-0.05228837552338616,-5.655859330033691,-1.5363207024371808e-14,-0.6079580951483166,-1.9729140155761529,-0.14305853071015115,-6.609807351813571,-0.30192676970591503,-6.9358422571401475,-1.7582075575256342,-0.9608099848497476,-1.2258605227584958e-238,-0.25342345267353206,-2.6783333294263607e-6,-2.5249412842844987,-0.405908957557125,-0.6433028760513367,-0.01995604975273995,-0.0,-1.7683434413919176e-13,-0.8545974278565037,-6.814289785267497,-0.12861221176559903,-1.9448569676573204,-0.45367915004229653,-7.064219078972413,-2.7901137665385913e-6,-2.773165979264793,-2.179637001816147,-1.8261911388174694,-2.9240135765424994e-83,-0.30734708524547305,-1.0686988361833745,-3.49999634215242,-0.0018986551626989413,-0.005730244668954135,-0.06295147589278322,-1.1554913520923975,-1.4612432006555203e-5,-0.49441177653498114,-2.425316865587286,-2.347945061880666e-28,-2.439847871555179,-5.423608368829532,-0.0014273859489974373,-0.8613672303101023,-1.8499014418010415,-1.4072741936080926,-2.272018693931546,-3.0789758374962206e-7,-5.193241444753099,-0.3449174054217642,-10.724460431207431,-1.9548295693137876,-0.7654884620232314,-6.747575874381552e-52,-0.2873163757567083,-0.03397714769237668,-6.28786647882063,-2.857232926781322,-1.3426732668661272,-0.0,-4.870845685901113,-1.1007925905338705,-0.42860073398263787,-7.456764124031463,-0.6080239950835883,-3.160479169997023,-0.16963043628299337,-0.0002973080019689346,-0.19271938562125446,-4.869235256178111,-6.824565327685027e-7,-0.7863600203744165,-0.1519060589928709,-0.35689541846922623,-0.441331764111616,-0.02060806017009345,-1.496996543654491,-9.811878952681973e-41,-0.4219557787990759,-0.20644957092434704,-7.342239651781739,-0.04268535029348791,-3.2893873657462966e-18,-1.3351242112240083,-1.008076003514483,-1.2488005472120747,-0.00028349309867712556,-0.6300115112326468,-0.0004410506410728948,-7.658077017133061,-0.5033262428083236,-0.0,-0.2553225348954095,-2.7910833082543354,-2.4756438723385834,-1.6783103243746,-0.4297029821449117,-0.32022648470254944,-1.9107039990561563,-2.4357700220146827,-2.3530400987529987,-2.1225621208407532,-6.295672991342477,-0.0014582886459920006,-1.1586924610168076e-5,-2.634995210079308,-5.165404218702093,-1.1673741707431788,-0.11446696374231763,-9.376005276747147e-12,-0.0001371605712574272,-2.4982944088507533,-6.70565513661478e-52,-0.23947680781284042,-3.458932295124059,-0.00040789305036414004,-0.6114904769574371,-3.8604404330852478,-0.0,-0.00703901660556339,-2.3829041494135956,-1.9995137480023246,-0.024898959800918167,-3.822691297282622,-5.9605621702885685,-0.642420739901019,-0.635048463107174,-7.424740779554656e-10,-1.909613096070752,-2.2072405262200303,-0.0059941227089409695,-10.788018472305467,-6.066178679883112,-4.310722262043158,-1.6723124011127515,-0.8747065515852255,-0.28735655519204767,-0.005156088289317625,-1.5509659637024922,-0.31258241740599113,-0.2834760449900453,-0.7978038997352291,-1.2697164154421994,-0.002647263847209648,-0.08347532816027715,-1.9432886283477542,-0.38690843729298535,-0.7809579125814623,-0.0,-0.2833610567544006,-0.6886099092743213,-1.3331569682679616e-6,-3.886848716324951,-0.3045412452837646,-2.6363197749004734,-0.5308535464296436,-0.40775149725691023,-1.400649009551935,-2.6290743474100617,-0.23180751678879624,-0.03900968805993378,-5.026276236052599e-18,-0.26197693958236123,-4.437736126454769,-2.190051322736674,-5.406020519825745,-2.886321167973655,-0.006073991135500775,-3.6107983040215363,-4.088464567825088,-2.3162312533382967,-2.495180936800649,-0.1853286870756382,-0.13735641265701332,-2.693633778814369,-0.06330381580737401,-2.0888686418698215,-8.306316767764419e-24,-1.6030575433051513,-0.9145538480399316],"x":[14.79246794240424,11.936853311609973,14.00866905754112,10.867816833897868,6.986912871077542,5.134906298656516,11.442169730768867,17.30646129959994,12.60139649300363,0.03937173020881701,1.2819433553769999,11.729729370197752,18.74564605008835,4.455142303346773,15.522648213174799,8.601375759302329,2.7599228580456536,14.162895435638054,18.183708339408675,5.299539144321477,6.925114627397644,2.3698726944671344,0.09412556039822384,7.194759928441128,0.38875947623654206,3.329075381921003,17.6541070593197,16.02641602866171,9.519880689353819,10.601375430688602,7.334172650719251,15.269310416564434,0.6709938571451524,12.181725719199425,0.05408624524247063,6.839087403775594,7.209294236886712,5.704786157872888,17.542875386122493,19.86700922057849,19.047080878669416,4.102605148223777,8.910137720970628,4.14226546303341,0.14679876912758072,13.41695992177661,13.364458386641918,1.1626840724710208,1.328042866770014,18.784056072301784,4.724396703506035,11.789037268693203,8.282027524832207,4.390257323559892,4.934683123817747,4.376701029359786,18.14469229143556,18.242586345838507,18.316821852271875,14.839579134829904,7.801918168251385,0.37922250169847516,1.163164228016349,13.257918587238478,19.0900363361475,15.714622802465495,18.05864989992766,0.5877966112333066,17.01490267570008,14.486606378631052,16.221485026847077,4.288166653158161,0.2234123827852308,6.5280414311066215,9.915744747770638,19.013943780329903,9.132099896834545,11.371294778334025,6.508733763296721,4.608704626195532,4.816714819211123,9.612469323961669,7.329014744408862,2.5831257234969707,0.6189046779154106,19.614875483651243,6.545476056971724,14.512083618806933,5.075667576352165,18.743770381247693,15.988951173008129,7.45061528095964,10.841936001788532,15.886634702211042,11.979576461798871,19.924394857755097,19.01309328804988,4.926513803297796,5.374525763262281,14.328907052003457,16.43340752901394,10.906499196718098,14.715541840570495,1.9436137058819059,18.126124493106538,16.94867059864835,16.104240742844173,4.61323520098901,1.4216079496410794,0.5310784132041935,8.35133892523768,11.816118293405303,2.168935973576507,13.54217143230521,19.8270072526855,14.474451428264246,13.308418487829519,7.482416413265325,15.781694581830422,0.4076334223671374,2.149829991790968,7.977685980258533,6.419931567173833,12.518069822316251,4.346614810876046,1.8026883115230774,17.476177584039142,16.635197800634323,1.434506475052837,8.11486487539173,0.9057496344522642,12.902656480586202,0.055376025614846114,19.808218640984173,10.90560791770991,11.753669084697563,15.0244324984514,2.6132518708040164,19.88302352878836,18.03189523775591,6.818536523640826,15.937841151128431,3.7037731062439416,3.1491280586846937,5.316417597029188,3.774014247312807,14.28977222375714,17.18499314716276,2.164841128428545,1.5189635907006505,19.17489335665944,11.441588189243927,17.59886158687017,8.613856413001365,0.5135887778864401,15.66468339547197,9.060085154785957,18.941888725867194,7.408491464582996,15.036560676943868,13.481531524842891,13.809890310793488,14.839948069976753,12.075714731255282,19.00266912308698,6.116824723930603,12.679849744442325,17.747849240588145,18.382137039586244,13.418245125681455,11.467806845963695,18.447933656221664,3.317317045802053,3.6291129046726844,10.176597013409246,15.632887313373427,15.694006604695252,7.706404525111248,3.2696530976196625,4.205021796429245,14.519364308893046,12.735493733497547,16.417394274836752,17.841218281236017,13.321558799804798,6.975502116592858,19.326051102671986,3.3489541156007707,5.946510482114267,13.986590189100049,0.5006168786229459,1.7762733963852906,1.0055617812068895,13.588440828123893,16.46870429910884,4.740240431969722,18.769256607614654,18.437915857631268,6.276269343188923,6.764603403583598,3.236308620153183,3.2410966305290545,16.12224783637842,0.6907090607004918,12.176873780360179,13.53365305410911,0.6748522439048754,8.03119471220243,5.955258107403898,8.819203937758147,13.848880560156411,0.9560744925628883,9.582834329213226,2.2060307855440042,3.757859472652516,13.469844716180322,18.374407361787213,6.381264814137153,0.832787608229606,3.7785251947688403,17.721619885455397,15.24034380218061,5.044969622746693,17.49926035835426,16.843492356659965,12.752784276864286,2.8284729662184294,18.56557976360053,19.82241928857322,12.935730271585797,6.200312729337716,4.705669399857841,9.601882908689191,2.9241452972776827,12.256652221879554,4.1298428528198805,18.9709281271136,10.946928774164233,12.21918837031168,3.024458428477299,12.548541183384078,5.149835819316859,17.124914611327185,2.8042050704233334,14.92019650891233,15.39778415724892,3.764290908580783,0.80739001441128,16.795303126445745,7.197193060703242,15.74801920530148,4.173051369430172,10.378748676184202,12.076759045298733,3.624053679337078,3.796418316020058,16.410833411739777,14.070521546595112,0.5544524812163543,18.645043572355323,16.486512932123155,1.7490138740770167,19.846158742348333,1.3668431613352094,10.996951734465409,4.051545477104739,17.23938835541476,19.15177176936005,19.135419931478918,11.66185933788042,14.332397018486521,3.883195353413167,14.815912761487189,3.066685338220374,7.763504233233314,3.6890533737775932,3.1844543125468805,1.6116521975040765,15.12624525259878,17.184089323772316,12.345143320348875,12.259186964934168,13.443303711632284,4.9906294118995564,6.5097318366358525,2.8642356368157396,7.953121745307494,7.346673088836568,5.089590692504236,19.035760886212167,2.6594544887494953,12.924481188809164,0.8419770389431269,13.72063402839287,18.27735480374205,13.83103431881246,6.646526769342711,9.464891486451714,6.501854763810764,11.743776556421093,2.9616426454625744,10.015247249279128,0.8809907492343827,4.45850481123621,16.7816462860561,16.072984842381853,1.5420169596912991,9.105075782537618,9.739449819219313,10.54635222188848,19.520342630930006,8.901112959612774,13.60001542270374,15.280025946787642,6.020389800912551,13.466957378825576,3.653792095362527,2.6848834284330536,4.72311786239219,16.451062845554894,17.945660042369784,4.465347278904659,5.702435726215804,15.867959572947775,7.6152978072224675,16.042832270486386,0.635820976984367,11.054614490336935,3.826116483138007,11.485216974760766,14.222758378768777,0.6074195025005924,18.630098448135012,15.953430774980419,11.313268525543553,3.527050613873386,9.394235344738107,9.937567861871187,1.3183660280576381,19.720812553863762,12.336889939851412,17.6622912723535,12.915683484852241,9.919642341894534,4.289173602359093,9.128113171362457,9.302139052960111,19.919557136903254,10.953322368525678,5.477733497696553,19.712524343254813,18.59363397660905,1.3238803876545857,4.605462780088283,16.839494925159457,6.947331746225083,0.4097804585487763,18.71965893842546,3.765868728905817,18.403949806687592,2.1907514012876073,3.426501873580894,3.5033152620812835,15.90579504401969,19.871941265679762,6.197930654282717,10.096624090388735,4.867723786349942,6.394951344856525,4.156423902226716,2.2771059421501016,14.704036708522947,15.867580466292942,4.637905849462038,6.5881652209606845,0.517377666827854,18.364992267271496,3.726961633275483,16.363820041694247,0.26928354990260583,17.65612526723626,5.986858380179787,14.14697248169575,3.220349954655668,2.286399859740591,6.6560876803099145,4.854594011144617,18.759262741775864,0.4065115603269698,13.122553861717714,3.92436635960419,18.70497164019566,8.07228180412356,2.8189027618559903,13.590015229105283,11.951231226305502,7.891660691933482,10.685824576619375,6.049749746152235,16.780064865022602,3.8822383880547218,17.735311486197038,17.19714970835508,10.914444180052755,7.721179709242856,16.480865505745598,2.661716807222012,16.12972325105244,16.6339752333638,13.739504977502609,19.225246132979947,5.091467595925754,8.042500205498824,9.362659228052728,18.818270602729406,18.24042112593083,11.948867928903052,9.586374037239999,8.866278156460158,0.493421026075489,4.479489523944902,4.1355108315075695,6.070100921483701,6.88416263359537,9.825290702238071,9.641784882874704,9.558759656591246,6.972146875651437,5.630186881361636,11.76984846007616,2.2699538092973093,14.351981491399016,5.7231680881756075,15.402912072012489,0.8885176286569951,7.559901301920617,4.894129516832613,11.864524371750328,12.332918721711309,14.528069746826437,6.481759056922414,13.541501380936234,19.50991530659533,8.421411739186295,14.84286307960026,15.17062801369681,5.024537427862024,2.8686576424732646,7.596754234523657,8.479749670755027,0.2664688695857187,12.44985911393889,16.432832446096192,16.833810993883162,13.070741128288365,12.449809080822224,12.817924350236556,4.811201783420516,19.558161069834096,14.879540857189326,15.749656854023248,17.63331035533251,4.284298024331212,9.23249253004865,18.40235509039376,10.92397506663076,6.9971117803384475,9.626674586906688,10.53456106507809,7.89634475494879,15.62300955295068,16.36541812126851,7.834936888674653,17.53402238299531,13.499541699117472,3.7341640596229864,7.421192346529302,1.2892038138193662,4.7376940091491315,9.414768337351722,8.905053346917784,5.5434082176059585,6.691349615503248,10.648537787507042,2.4588314352678386,5.963010108397158,1.9509078521217615,4.592150047815098,6.871753121448951,5.144766153483613,15.94224194643349,4.651357216116532,0.4625757833064137,12.225323579742824,11.58883880423522,4.613552613516205,19.182322798622828,17.57370727127079,1.5531457717704678,1.6996405592021668,12.847374131570195,17.137280518163323,16.405997238207828,16.057915245049386,4.140206894167893,6.975224466392591,11.330887638347757,9.364484370327727,9.630701996229138,1.3449276147535416,15.311994195841425,12.217394417620625,2.790095037618725,11.390853641033871,4.691414813763539,14.15323364202607,4.450113963865054,18.604429056146113,7.493788367693384,7.257694103639607,9.641173391328245,17.18959331527048,0.16444721339107904,11.944529770736931,14.424188141704155,8.990153432374775,19.734720729099827,9.304987951285746,2.5692654250836533,16.11686260267806,4.6419946020165215,13.274117632983057,19.94517522580527,16.239738239127597,18.96631324650834,9.400311386489975,12.714313294706505,13.81765622240325,18.176593882708495,10.875710293573029,5.872325924083999,10.683232038078415,5.495337864068408,18.353951529575777,18.460448720853442,6.88277868878489,5.936215705838799,11.940697809857038,18.317061052607976,9.439473154473049,6.40100589159962,14.63459425597092,5.377580995979723,2.4526243946557758,8.850324546937376,11.748485297850255,17.38801201855669,18.34263042979667,3.5012214943732456,5.8629632374150065,14.841479642873061,14.298051073709184,3.3570715426270814,1.1242030230604305,10.244799132809934,6.692814127425728,17.874424768961596,18.435117097211325,12.189447014936734,12.95440984119153,18.833057199340338,6.871294184336749,8.02387386361707,1.1308172430258123,1.889644864466038,8.701567281576086,17.486562932549603,15.510169287845347,13.887520052340268,12.926390583830955,7.8681025388316295,5.207152938979673,18.763335669901085,12.141670972706006,4.423659697091842,3.247537951931636,1.0098292779958618,10.949770395095278,9.330071835977222,19.454288924026663,13.608755578237863,11.578350000404928,8.347061397978397,17.623637192213735,12.330495201887398,7.4709821237012575,19.78177538395963,13.802997673857256,19.643941190238614,6.015499782800733,18.346103369663957,19.627551798321257,14.478304465737274,12.219697412114039,0.05344811924029802,13.340458408615174,8.90596458993599,18.451377476079664,0.1439440997374941,16.27663155895418,6.038082618117282,3.0796465754635127,12.569940354482515,10.325220845519052,6.935804121775497,9.697689044354991,17.986314413751742,5.556197809405701,15.749313715000293,19.16362132180066,8.814509532808742,19.00579513998259,0.4162821445317144,7.9342564482748745,9.687217212709779,8.109516265743423,7.7811270987060865,7.401686184939451,0.3013866613959104,1.26914303192466,13.656981092918507,9.372813378844578,8.61402310051008,10.962102504004196,2.0940174592401384,3.2108010701353784,3.6620048789260906,0.9100015399237815,8.512789521569308,16.008015355481852,11.983343482227937,3.8747878696745275,19.71596920514974,8.462075636205695,2.1166687236655735,12.959117586302762,16.330309430050217,7.72198452875029,9.612089364804932,14.813107177850164,5.191629488772755,9.832664810306152,7.795039086365936,9.452716437442422,5.153014297758736,12.89055783758708,5.379924148835342,9.963413038744907,17.707481428604133,1.921968616886467,9.129643490180563,19.541581243763705,14.281177602794116,8.60575615205538,17.2576529076812,12.466296891960575,12.776785449824182,10.339139237396559,11.59635502975747,18.58879713302108,16.915557765522323,1.868720593018165,15.581399634334376,14.992582423857508,19.915024190022624,7.839316919190984,14.582304698274783,1.0377330656086015,18.39478158862675,1.1352352223172524,9.528108938814093,1.5129715455658843,17.859668982546996,17.54051280086636,4.144491372324395,17.092017820193163,6.38240139038925,18.48535384268653,5.749815238081224,2.424909879330155,9.124021826790791,14.2704117837369,0.004647082866648944,14.795661153035322,0.8663898341358678,4.513550508128046,10.905583655035569,10.101222648613497,7.452337262396753,4.6884113128946225,7.9167736771440556,15.240207233448174,12.661297774396992,9.899158090660194,7.196423712577125,11.02294142946009,18.38051622874879,1.7284237010683245,17.912023762477762,8.854332503538167,18.497837233035366,8.539749194655766,9.282342441550524,15.45284522804268,11.784545475020845,10.05049574375025,5.760146702355509,15.509449349057078,13.321382212739113,17.378904062908198,7.40682137548998,7.825412384248089,2.1180640803303463,12.359904240582434,8.484101942084447,0.3940882597128281,7.016491839967145,19.49943432205458,3.0643639076231333,18.912514552472768,10.833936654827085,0.07666162206869664,9.354864090569887,16.05468546049517,9.99455924428204,3.319826563833157,7.543069177107218,2.600453018976694,15.379036373835877,6.087139018322221,12.249658326482496,7.626443614953069,15.390445603083048,9.638473535818166,3.955578362125718,10.414596057877645,11.84233926482879,8.57385924049602,6.385410995399261,2.133455882694304,2.3854890911506166,11.876235653330575,0.3662296030731804,11.855413671911137,3.6395142390312296,5.496007738585171,1.4843021448464633,2.4725522830765145,9.022096341039028,14.94786439154895,11.275914944996552,12.723926786105908,15.556466012669867,7.807803603428494,10.705718523634179,16.97795006792488,18.005267176832103,19.65180472628751,17.28087193625694,15.73004381929949,2.0538543468328774,18.619294877226615,2.775377470128575,15.458819332535061,4.9211922679538045,8.06939324650462,7.416356322163877,7.156112027065573,18.949570463083884,2.6837212209733563,11.420959922058188,18.618973346708167,0.3929374312413447,2.724827104769054,0.713973645884316,14.064235643192408,2.150214871707754,14.552467732592662,13.345853015096246,14.302546240633331,14.719078349125777,15.077281471581996,1.2896668279594792,2.6011045661911636,9.586233088298322,2.5757162097551456,15.881872677044937,2.592407132274759,15.681816594254126,9.855947698832136,11.367931858326198,11.380118183529206,13.127052545959565,9.59859247107682,17.82444908814562,12.701095925019356,12.23474056813492,7.387648713735491,7.3677872350706375,11.999330682564286,15.542538301893343,4.925276004238586,14.117445139136166,4.883708149039516,4.930243638898872,10.941987231441468,18.24968622013624,9.662421607226758,18.40044919889541,0.6807262353478905,18.107562805784234,14.173104452292623,10.358917413551554,14.15775450586262,0.7375885921540215,16.695615312181495,0.825361970722458,9.4322855687117,7.395670428343801,13.139991911868773,16.662777755776613,18.648075693637807,7.068892678516763,19.017037252016028,14.015114099732076,6.47009911277125,17.72829165562493,18.106309507564042,11.86465906874076,0.20527139000879213,8.976453256960992,10.479121960844093,10.260788115049305,0.34067170183219364,19.04026854959921,5.851280507213379,2.3094769557153416,9.46764330580912,6.196490937416517,11.091729542427089,11.837143684923266,4.202773571584215,17.509757473549456,17.69226200994527,14.954723289878586,12.74363102558642,4.359957944534996,19.300381737677945,5.458229403572545,19.28949202188138,6.667515367062142,1.6726854721832218,17.867717907896417,12.85392395884064,11.031670112231225,10.643014025614761,9.307152092887247,12.372428172343511,1.9413153891606427,11.987015286681864,0.126610066482451,10.320467646655898,10.964083985398778,16.348000626974777,6.6562637490740295,14.41705722246645,0.4207516429299707,4.219051701141248,4.499249564799062,19.68705956763454,1.838009800672733,15.518200386797032,5.884887059473511,0.23571546414233868,16.376081507203498,4.707206764211085,13.894718130833944,11.016623980093803,8.676172189695905,1.348139232247747,9.799030091902612,16.448722655326826,17.580075341559812,18.762187615413527,14.816020076164772,10.856761364085997,8.394365439565998,5.471958950759643,4.9638732321908074,17.320430459944895,0.37386963595265943,16.968120889861964,1.801704934675974,12.523946202952644,15.433665241451537,9.964702594070104,18.561496200101093,6.550405170018179,18.47007559457238,0.2704292529097785,19.36903415795511,12.887068992172765,12.616867875125685,6.806890226535112,7.539311179528103,4.9617770726914046,5.824217764816524,15.282408317018184,7.912815559471373,7.310145142646456,6.5706719097927335,1.8955827578324458,0.9410490540731908,14.560031637518055,12.779187738149025,7.502686447800442,1.174684948831164,15.701799680060535,11.978106287305996,14.208962344457326,4.9262244958159584,6.944763545387809,12.751322745978367,7.657959052891408,4.873041934474656,15.993388657945061,11.055396026233076,2.5500683147349346,6.902492310219119,15.206093600028971,8.109932720535408,8.88168500517521,19.26888016167514,2.10290789850081,1.2070716657017,16.57130113162125,16.09428180899428,19.25822305176755,10.778948264157048,6.581245284952542,19.815918414559913,0.11444043870274534,0.4618691088737359,3.03977021164632,7.701286506975813,14.874290997632333,8.175371458645913,10.949918158765733,9.820808659766648,12.467699035210202,9.838283511219323,10.157599971897069,4.698148140814258,18.018502448323453,16.3409209469259,8.439908199873646,18.637019579976762,9.36501951713315,10.15539130931202,6.398192911230995,11.477740739319792,15.774547591750574,2.2879145592585415,9.40938358894163,5.912645264509493,9.657642720448859,18.480130555747962,7.801543949622851,1.99852877864501,12.401852722716251,18.324135540688033,19.657567894783238,8.588255492454318,2.295271630842466,9.081439735508292,1.4498393764598472,3.141574019855504,15.560380009825447,3.748240103643141,1.7065484073930914,2.919766941320221,7.817878877753461,15.95224784080441,15.44582396220778,5.045796820957711,16.92422873751574,8.59302045556197,8.49672033796821,0.47332198053666286,18.074622728959557]}
},{}],24:[function(require,module,exports){
module.exports={"sigma":[4.70682924532225,2.130470804936956,2.5167913301432887,2.779140211923253,0.5996669966970891,0.7448147240352021,3.845339484856577,4.634591582217784,4.776489589947421,1.4905842499945587,3.3012575912492084,3.3177311922762343,1.452891397897459,2.4130080430998313,4.908469134598472,3.266613191423091,0.5195334665343143,4.380824508572641,0.6239308474214922,1.5153548476255452,0.6449918831046153,2.26763663055924,4.645133870657309,2.688509237174821,0.5251143662543545,4.340401429048847,1.540599984137253,3.550552107034747,0.8883602286199554,4.270934517100068,2.7706129575046754,0.6280536201694253,3.8129208571376436,3.66080648603044,2.850614939003501,4.452562280686663,2.0630908303506423,1.3392218992667626,2.0728576962936396,0.3788630722184916,1.8729942326938842,4.793572239655854,3.605004386754298,1.4958336458351207,3.2265777179524804,1.4345342102066028,2.572633434567541,0.15596677065774056,4.635490054338796,1.1153741044202137,4.852506941157514,2.7100090917540163,1.502118365607007,2.9151815789481414,1.6839050114030651,2.9671582169132837,0.3725901126973563,1.154555139917356,3.2755413424028204,1.0563776868475439,4.840785329200708,0.022492910473427274,1.2892397444090398,1.6112352991695544,4.901156285373878,1.3109726560784274,0.22096539585025332,4.233688770022002,4.881999917605353,3.7242098542464497,3.2923735170069888,3.449449351641084,2.805777473654021,2.6719559830068764,2.311938428412815,4.004868493258041,4.0333098145586685,1.22879288938184,4.668416876038828,3.198478448412587,3.1042499978962965,3.9449801201669366,3.593845152372949,1.320391907243691,2.0916331107368924,3.0191319420620943,4.113476558669683,3.269329231679933,0.34789767134506544,4.299302009417245,1.0026520016350338,3.175765644167533,3.291705683535765,3.371262015794889,2.014120583208868,4.528186726270352,3.338250782216133,1.173204323161554,0.962443769295066,1.115470864423137,2.8937279633705426,4.585975113182222,2.5931854845623215,3.9789569301490357,3.0853946225341513,1.6753761378931453,1.3995174257945253,1.2810937120348864,4.4588438080270105,3.448266669820641,3.801866685981662,0.6323355432145694,2.353420325611817,4.320916196099796,0.7132568666148187,2.8717258706022806,1.3076689189651103,0.6802417535789784,3.0124021282318267,0.5043858964846626,0.7289503856047908,1.3202147624321214,2.4143356977941943,2.4310211016555607,2.0558840761356456,4.686585825529787,2.4181200153510494,3.4395358710101984,1.1996137692495001,4.60340117019702,1.219126972332789,4.0708375896387405,1.4438453725475675,1.1839313709976695,0.10255486985173978,4.879780023505677,4.410711843589235,1.3128976439503393,1.4861300750407869,2.9595397325356143,2.7305352035927264,3.6627349278179535,2.385739849686269,1.8655442455571591,1.687032944521536,4.7320616920763445,3.868081932517039,1.0380583508735453,1.6542278576420943,3.7132134477591947,1.1067344005457491,2.4045052482592446,4.414691281433426,4.136654099194052,1.8710785610817926,1.5591572263907594,0.5488520722662171,2.5319852117869877,4.4398955773458315,3.9177562788510487,2.4882925380360756,3.174527902310201,2.5845123117894033,2.7032870458496685,1.8979277227605473,1.918978325558045,4.706420090433894,4.15332150337484,1.9107579565542443,1.232420739995812,1.6202090012042203,4.291348013023026,0.3977349461438551,3.4463058563537086,0.6880019235707935,2.7098628543089487,2.1812303043499903,1.8584653267085338,3.090410298692605,3.849144505204279,3.454461457358925,3.791849119101106,3.486327118388448,0.8994771781347555,2.52912219478731,3.983673399075973,3.4256094566261974,2.886211103579611,0.563591449518388,1.1804068942422596,1.2108197147466249,0.9007265889128535,2.4204671071995785,4.962770871831292,2.879484073319084,2.2983494665926028,3.7362580596208126,1.2274642004107905,3.2674540983518563,3.5642415119683477,1.2205594076109127,0.4974780854295069,4.733111495657792,1.9914645608073178,2.859008573248809,2.576801190411598,1.0560608344013633,1.1033596016612746,0.91055422481919,0.15891098464068998,2.8150703558441537,1.0960240127830156,4.437192140249216,1.316659007346268,4.282313006171079,0.5826836751727194,1.392949767751076,0.5128437147249054,1.631900025695392,2.2463127037507213,0.401463760746571,3.6120281374010945,4.374775711628857,2.360284463161657,4.010440543241161,4.910887407617026,0.1434276433031556,4.139312001496208,3.498409865862322,3.065906561424491,0.5626295555495009,1.6479291407799057,3.806720101918095,2.10319813379503,3.887951479356425,1.6575402867118172,2.721591373468005,3.956120647393372,4.884924862398411,2.1183506560139245,2.989665025627305,3.5389012103871655,1.4107392992118195,2.9714128647339866,2.1216457505977635,4.809335748616358,2.8451381518663768,3.9708458602666417,3.8727006438577893,2.8482971251513947,3.0128990766716157,2.285289859976649,3.0884604643220968,1.096801333728914,1.7677718607807502,1.533898926492,4.963797198945247,2.708206329390096,2.6214282928202604,4.945718318553673,0.029539356283622142,2.845217199089951,2.63910262954158,1.7263886746940982,3.6337840144569036,3.783466322257997,2.100783970098843,1.9857593103026827,3.21513030255168,0.5452904463536701,3.491062414816317,0.2566536669548636,1.1086777836129869,0.023564507942053226,0.11150012240409679,3.3095449736872773,0.9146490306840627,0.6031854082171884,2.0415482657222315,4.774872205349288,0.6599307041385982,2.6314395864617657,1.4064446620536009,4.417228206385139,3.1795732144387614,2.656802457358567,3.4732434307763804,0.6496311652160536,4.417788225973275,2.6736059798154708,3.3543940193822976,3.911880071378185,0.5500189439373959,3.1414707025103237,2.1984182947913276,1.8251058067551273,3.3943873766892816,1.2112536912196148,1.3858333581980642,4.229393553116073,2.61610687603779,1.5309891481930749,4.0201928782812155,2.8122913641060543,1.9578378746361513,1.1511667680366289,3.536241301823889,1.7639763983994872,2.5773896253456687,1.2354054320508812,2.9946559890747517,4.666174975115065,1.5484610477451455,4.492004444038554,2.6289157634481852,4.953275290378587,2.9239916308812965,2.43492471174231,2.584560773068738,2.075868897249581,3.536076678711475,2.2236273465252365,1.9760537998669525,0.7209098541505632,0.8881802422211582,2.999515031131681,1.5585024539677517,0.48112076009054316,4.98252015820138,0.4792048525186121,1.6072098090989395,3.388498220048236,3.0743317708449878,3.591696105763763,4.178169849793171,4.253665872596001,1.0273047968279703,2.038370687810349,4.714328326314704,0.7562800868405262,1.8949756686441999,3.3072754177807884,4.685925131362083,4.48050657185306,0.5753580951459181,4.590642558064922,1.2288679362261157,2.7690684210494765,4.163005219759558,0.5130272233838451,1.1778641726923522,0.22287858145340844,0.8303892662123757,3.9844421702386947,0.8111188774261069,0.49856005132074,3.1007751075751,1.5396669602030066,0.3429702986280647,1.7043659791176913,2.3711024226244293,2.885342843195052,0.3609402883935131,0.2929264727717029,1.776425686425297,1.9825609214132922,4.714736944760663,0.1794719352823948,1.929427236109329,4.60736936058483,2.509225275103887,3.3209210876874726,4.00080148942623,4.546675141872843,0.30509959675392495,1.3818593416382041,2.913089872358511,1.7784203611192917,3.5162082934401138,1.4170861425824632,2.088758727665674,2.1255563695902877,0.06418994022417635,0.20643784505177454,3.682007902583757,0.7511495813004632,4.626390278878735,4.095657643743992,3.3093631338098115,2.421275397242546,0.30233511835303317,1.2381206297785263,2.8958357114678135,1.5349156169803801,1.0473537328119642,1.956708771181267,2.9199309739382073,4.33017065678558,2.3202992499296418,2.841244441792621,2.3837943428298516,2.4334024541261625,3.165708221428669,3.0324924318095423,0.6619028590186393,2.111132445845998,4.039530461192093,2.9567491283362957,1.474988361952102,1.0675768325505985,2.7557369349785734,4.217745573412911,4.92087021533429,1.7963463467035845,1.710659411817833,3.836071728662309,2.574938725429361,4.155340935654008,1.0904846163403425,0.464144629110963,0.23274510131854442,4.87779237631698,2.0544856805341105,4.562159219224464,3.719917710856564,1.1307475066509043,2.2490514219446323,0.3759099903208696,1.0432146568648715,2.600204849219261,0.8376137742663481,4.481304257877111,3.261440237114651,4.427287046079056,4.16658758558608,3.5747234168021924,0.428564462008757,4.691045233334909,1.1522864363510632,3.1402136267830736,4.798208230883828,3.4108131091884983,2.481165492925964,1.215081815762168,2.1269503452364944,3.0048928334820446,4.71091344093575,0.18994076441880114,3.5970379404573727,2.519679553300298,2.617371417784695,0.21970866874454598,1.3413740523885187,0.7063101724043397,1.3427078186257813,1.9156168090318781,1.0069779940702273,3.35301559383117,0.29959261595071895,3.7030617042837353,0.29086157661765255,2.394629866354434,0.48396482679387676,1.8226338804828512,3.8420080911999244,3.5419602371805636,4.081013188909697,3.208362231105176,1.0097035275164123,1.7408250128904068,0.17081015195887006,0.3790805978239753,0.49746379699666554,0.11708176284962235,2.0299095337124884,1.1457070681678405,0.4670496261806034,0.6076230419078432,4.583705179732675,3.816216456448821,2.6214644724152683,4.911978846509129,0.6698762747920151,3.9527714382349313,0.753473477083948,0.7765627051852486,4.891047578262625,2.5271804202972428,4.173046873211686,4.493458145455776,4.223900086722776,0.4373273511410125,4.742132060953253,2.9048420306514977,2.9172298341833303,0.37274272123497654,2.9909147637749953,2.5714428014722146,3.499553908301589,3.858856904404094,0.6258473301413969,4.292792812840828,1.6896569995032529,2.68898628261664,3.9071250567119096,3.4950011416210724,1.6528618867843003,0.3742217663867131,4.865060358396695,3.0414050154689365,3.9625069833676796,1.8314503748624977,1.1378209991755095,0.5396758266184876,4.849671868262298,1.6793688941476825,3.6793299634254515,3.8195029828148352,3.9156797865300232,3.6374310436114166,1.1835261165424604,1.3428992541017937,4.959472147030636,2.564840847232696,3.0013594171601774,4.476698743088397,0.3802039129019008,1.0925451397514774,0.0854408813050811,0.9247009450901267,2.395976059091114,3.709610683445951,0.6786381364018423,4.370004359053197,3.9906931501381204,0.9385614650495033,1.7027995759978842,0.5126422506095574,4.471786633966674,1.0685389883118923,0.34994399794326503,4.082149400845413,2.421940653335317,4.771800586829162,4.16338344873726,0.5373172344722799,0.9346986419079784,0.2628992669223107,0.9796656259664849,4.018092030423719,0.8212833388189122,3.744905068719447,1.0525525182455187,4.346488414926139,4.322451448989167,1.4889649416102602,1.2553219616563316,1.0248884762543042,0.1114557291007845,0.3369742347777738,0.8502960976337748,0.5664486509820876,2.6721892323914185,2.7188389446301,4.999120295758091,2.3258666173471787,0.8403795526395463,4.583275638617131,2.418500000212642,3.683332352245421,1.3301370288053282,1.2152021395508006,0.4455699171837013,2.3679089466005223,0.7420504960712948,3.251730532078665,2.7856459272907874,3.7409138157623243,2.7259510931222444,2.8442108710672196,1.3581066135890096,2.926868373490409,1.7868880903248263,1.055347781204733,4.1051841277866,1.1401567406089597,4.447275012156009,0.6332195662249862,1.3167256654525694,3.582854483426856,0.8028614104671472,2.289962122097294,1.2996446297576913,2.575441374248113,4.8550505344811405,2.832402629559131,1.8388940634368311,0.047302086201271853,1.8389928240316278,3.3392160989675936,2.595016664440556,1.116668391817488,2.2270241887184117,2.033049542852736,0.4120341498994451,1.3245407601217718,2.3944267071127023,2.0741575260431278,4.332299677822526,4.483882001510225,0.45674918111954677,4.454137191007769,4.3832296983775985,2.0306989485746705,3.7325161767404067,1.5656379337902915,3.062207158791285,1.5415602590599276,0.3430407838296723,3.0060029672436817,4.18145824364864,3.2466179740087098,2.780876180161973,4.164147347478949,4.582524439649776,1.2109279914479032,4.433866319201868,2.889118250996842,4.223208829227321,1.814054836307628,1.3812973735371803,3.949985406144253,0.6925814360124538,2.3463936129510765,1.9818963748584462,0.18760460726820027,4.8719079401882315,0.9196330333602154,4.617880553899965,1.3533466210308598,4.372624685066066,2.342142212577615,1.0907580344853685,2.6501221167259703,2.9158923247447777,3.910602903645748,1.9880501556945818,2.863645704763702,0.2766728640095806,2.4417459227292717,1.0265172364200237,2.5969157441850688,4.49721348722545,2.7563071029091546,4.591002191284893,2.625851110446499,0.29047165947009845,1.2917239017495907,4.485068492838629,4.213451766675846,0.8347365880014013,4.777409150213745,4.699941134537084,0.5364477928479205,0.5706576775214223,3.2870493492246364,2.252311361832424,4.440607397508641,1.6507256279865412,3.0803824203159804,2.832902628149502,4.0087824596077715,2.1328849334387225,2.213884561978529,0.8227798676831566,4.395267547545273,4.6556758829908365,1.0690594337408776,4.071724760957821,4.74113308796666,3.3479317536909248,3.4729599573698247,3.697437005535379,4.194593458667587,1.2833077191580178,4.088608180271127,3.0431078022412628,0.34187971047,4.2890460320235775,2.2008822089718763,2.0644441351105303,0.9127560047116579,0.8160514713702027,1.8112176080145215,0.7728760453440942,2.732383319022893,1.775186509661304,0.6796436066098988,1.3168579281994586,3.982209216593283,2.7596142153583783,3.210020466319561,0.9758403737480281,3.8373899813733203,0.11599941007482073,3.766765181620869,1.2641760733026364,0.444569860536711,4.1742971698788125,4.191397883942473,0.4847084836172244,0.49860542890605264,1.3734265942216972,3.1385089360929364,3.1586027182548326,2.525616160731663,2.32109174272996,0.934180438079345,1.248803932364294,3.6911137816182005,1.62891830736285,0.7741588254183129,3.1620964492564485,0.7809981930117949,1.9487067403446012,0.23955967010634627,3.8075760353197308,4.926822581535043,0.6145022549622381,3.9069560696919736,1.6076025996188381,0.6465702366226767,2.7999866580632684,1.4544218217482652,2.5440690771762853,4.611949891163558,4.3259985650683985,4.163104114279096,1.0306642072750716,0.45520564534300423,0.7853253327792653,2.6255815277106223,2.8552050439894403,3.971706399821242,2.773973275564149,2.722929844233646,1.6528685169067414,4.7816620556597424,1.0874326669085332,4.941291509365052,0.6201896125182316,3.3440437378343093,4.248334382200029,1.4272116057633966,3.6390468536560983,3.083151525976995,4.6959217585386535,2.229617414676286,1.7874299123876658,2.973201170438038,1.9461470067511966,4.873518612083727,0.33153507934207793,3.029906945186205,4.313662396162879,4.680246919475108,2.334862180120385,1.4067527204197583,4.032933486681138,2.896949257987622,0.14472013677490958,2.4242285204300638,3.225516365515345,1.1819839885899597,0.13646066055546413,3.0369341200046893,3.750446109565637,0.3571557160211203,2.88640603230205,2.3770885566670796,1.666572083867085,3.7912329326135765,4.792175952568528,4.938659583123108,1.61623988252533,3.9964976201397495,3.741858730409473,0.9809795370564312,3.1955076043868234,4.25604251797809,1.6754702399088506,3.9729066369943498,4.063544405352059,0.28502754096223604,3.392723948798638,3.3393638426882744,1.7948355456557918,3.050249855726015,4.863855898369723,3.6210308727321405,4.8588520459614415,3.117259301485552,2.21705053230715,2.453888182260602,2.1097461663594763,0.19134856015917023,1.6487260887941357,3.6532385483104637,0.8292500138927639,2.0544877537671757,0.04189094990361797,0.9190314957659651,2.9025979947024982,1.1573739836764319,0.6162004434682433,2.92226676040626,4.512035087960466,1.3173279834340468,2.8409910369130467,3.2391165265478126,2.8188806456525772,0.6762108822090651,1.928254850568959,3.0961718828902427,4.915496813679642,3.8718084071581393,4.6699155108585435,1.7003171964870667,2.0481639625837467,3.1528464482671117,4.17903971936598,3.78142644960716,2.976562552954809,2.8325073821620936,2.7675928043676,0.8674312354705527,2.5335161483243143,0.737566147032559,2.278922572051508,3.261121046838654,4.465209278224952,0.7771966206923098,1.2267110296605321,4.162202865546199,2.2782678592184755,4.942807873794334,3.4313835160843897,2.2599146361772116,3.6564388025539616,4.654742267399843,3.828791265024012,4.936435758000707,4.980318454481582,3.463324944688939,2.1558794992240604,1.7091564101059353,4.820546763149616,4.841103445431577,2.4841828081036055,1.131665031454463,1.1313657106930985,1.1929466003722844,3.1860874816036135,2.8626071563878375,1.1495257412196336,3.678439181288317,2.3088934760626323,3.183723283580424,4.216036224563627,3.3228551007904183,0.7017411726229594,0.9638972118818345,2.9961288432141533,1.811214897098753,2.9555454289868677,1.1596867113955611,1.1350551515794671,1.817042635035081,0.7315050830502756,2.9944094762615645,3.325265061834769,3.3935680015320155,2.2825991715292213,2.489753037225395,2.272201338246187,1.5088423159736997,2.2025600228379325,4.229606113088918,0.8602828275716023,0.6354725207425682,3.727843780312712,3.0125305679929806,2.9689170408012977,1.149035298142811,1.4366926138209857,1.7006526472858474,2.53259852709781,4.12632152546578,3.1086325277942892,4.660163666351158,2.4041909076946597,0.7109476428778039,3.758230331634227,0.7160134068443691,0.9844715502806078,2.60239221401748,3.2104415812683795,0.8976241698412646,4.219431775653373,4.222597902333814,1.6859941181210736,1.406047208145731,0.3245007468577399,3.7960990921823146,0.04201537578463865,2.393820812669838,0.2251310568440723,2.363484623188449,3.269713047897066,3.89828565689191,4.217282627230301,2.6272424355289905,4.421864061167735,2.307361082772746,0.6481752211224268,0.8871552571549479,3.9229491912532835,3.798523409332396,0.47452893239400384,0.6672060882583353,0.7882090666035901,1.073774739727823,0.655113364686104,0.20524896351382882,3.5691101337271727,3.734908332686382,1.5991939376207365,1.6489234689461074,2.1352659506298766,3.2818126409344437,0.47808606099352,3.4736627557555555,1.288169086172013,2.0266302380638446,0.33295209502176903,1.2930547656405356,1.5305172087675467,1.060666746173805,1.2169060420682842,0.6249799358641805,4.822195104149973,3.60914111148229,3.89828418853671,0.24718478692596912,0.7258418528138355,3.8936115580520267,0.4922197068481482,4.52698097692193,3.7088143696155806,2.435247446386797,1.4343542875798077,3.3049456727490014,2.1752298229331712,2.911493466731452,0.29553494726816676,3.179163544524777,4.676893322114374,3.9711560423225345,4.456988351793645,2.1268379696835282,1.1171864356228378,2.274615032222327,2.3774600408148414,1.137362367370438,4.529709860137178,0.9573707491812566,1.812715965302114,3.3922516806194936,4.444366360138207,2.870521870735031,0.13665462284715546,1.616608598321323,3.8511086763587343,4.9240615620591885,3.6948020370137193,0.7461661216529891,2.668234295754246,1.7921649599555933,2.508707950566179,1.6517398999052535,0.7616524445732176,3.629399357329881,4.850363739214279,3.0376279766847425,4.210965383191056,1.452642401315718,3.7882854019698597,3.0379579837335466,3.7861325180279093,4.7051484419403895],"expected":[-0.021502086325316177,-3.5514214345577027e-12,-5.380699288767306e-6,-0.5979558164589662,-0.05502883877197824,-4.627741138901155e-12,-0.6774776890335674,-0.1768612687155729,-1.4353669859282385,-0.49745243099678305,-2.593999594504331,-0.15527341723705132,-0.0011013047134463777,-4.93578267738807e-7,-0.0012289665026357828,-0.22679543165995325,-1.2654607281697393e-76,-0.01796459332308654,-3.9897799185218056e-157,-8.570395467217335e-32,-8.126623216785918e-140,-3.182554535783913e-10,-0.0010801679395517371,-8.21182837998842e-5,-1.585887668205818e-208,-0.06812234042224909,-2.773274591827798e-13,-2.03078471548452,-0.00021859350056220917,-0.0040358241584881405,-2.4717828069659638e-9,-4.686879788628679e-25,-0.3554838900297962,-0.1088294275765798,-2.660521324360845,-0.04385452432337995,-2.85395868492809e-10,-6.318426189781143e-5,-1.3940480691147006e-10,-0.0,-2.708915325052892e-18,-0.06995186842649928,-0.10878001186235507,-1.1213614485292658,-0.13134976026319461,-0.08553914323051556,-9.821712905577087e-6,-0.0,-2.2935698058390246,-0.0012691624430541493,-0.06438388803910286,-1.3047456048898627e-8,-0.48994123702663894,-0.03065547099563669,-0.34165683914090456,-3.1469679003277895e-8,-0.0,-1.5942279801093393e-59,-0.30345914896141324,-2.6509460278420923e-27,-0.0005553909352973054,-0.0,-0.31542339966840116,-0.7894366136381359,-1.2216967796076004,-2.7568849848274224e-28,-2.2083298398642798e-13,-0.006499307431964252,-1.2700399566971021,-0.3981395521948072,-4.434782100180341e-6,-1.236904412709546e-5,-3.397249513919375e-5,-1.423558549592693e-9,-1.9626657589946208,-0.00015727227816045622,-0.01969615393966108,-1.1722888545751568e-51,-0.3886181420365563,-0.022695681042416434,-3.0629379238943657,-0.0001168552190250085,-0.12562566940512887,-3.619528482079865e-26,-0.22599732046940565,-6.246397399684504e-6,-0.00013780733207266268,-1.93939310756146,-5.312407487922745e-103,-0.02101716489579793,-0.06608985293522633,-9.029821422745039,-0.2933463550268067,-0.3207831365577632,-3.6666234147814327e-9,-0.0003834495452404255,-0.06754915003543985,-0.0653637892177236,-4.429607060523463e-15,-5.8090444916169e-20,-0.040029411239404886,-1.9693283689872143,-1.529540687587701e-7,-0.10517001470491451,-0.00713989777281387,-9.084387966395338e-31,-0.00029086561126259676,-0.003237265346287414,-4.242419001707228,-6.319071118464425e-7,-0.8937797783345487,-2.767546147689762e-93,-1.51917256797518e-15,-0.00015860458137380526,-7.346788651712337e-65,-8.250690614551891e-11,-0.7514031860891003,-9.491000643199135e-30,-5.5622860035345205e-8,-3.58395e-319,-0.5065640969749737,-0.6518118935522084,-1.4771785498701698e-10,-0.3043841089462441,-9.039312757747164e-13,-0.6233003906493914,-6.6444154920250466e-9,-0.7870031874448776,-4.2088160897754993e-7,-0.0005836825146705267,-7.150430310811763e-54,-0.0003183262201508731,-0.1872934107640852,-5.732185740844888e-57,-0.0,-0.3140919776082344,-1.8525758604961933,-5.3214569513406205e-49,-6.385024189551849,-0.07054561273373272,-2.4032857354761665,-0.6032960421204161,-2.3005811173290605e-6,-1.916455804598089e-11,-2.4328356662683322e-8,-0.0033648476294531847,-0.08023534999416433,-3.4628855750779812,-0.0003749746715220569,-0.060559372233103884,-1.0131671727556233,-3.18163165922082e-12,-0.00017768306074087884,-0.07027882228284439,-1.880873977910402e-6,-2.0616959275767626e-11,-2.620543862944113,-0.00041054006821475024,-0.0032703062860852494,-0.007750355254421601,-0.04988838818693265,-0.0004904430446436409,-4.544285795785555,-8.875659515954109e-6,-2.61263645328285e-12,-6.442217064428237e-20,-0.08581652186770436,-2.6590439015121436,-0.5194881103186847,-0.12466430982371472,-0.05149063106094243,-5.208124847545592,-2.705185187539638e-157,-0.0004779302395336722,-3.653022898113315e-48,-0.006205867263422772,-4.516012429384038e-12,-0.08868834725204687,-4.706855503955164e-9,-0.03470835502277113,-0.002201959630935509,-0.01870213055103507,-1.065903614141535,-1.1544344990750803e-74,-0.014364380359213513,-0.08639975179119765,-0.0057072666799120545,-0.7039593177217192,-1.3083760233160915e-87,-1.1960495706717122e-37,-3.065143853733166e-17,-5.6923315190643554e-65,-0.00021584049678269755,-0.05859131410498745,-0.0002042691031554968,-0.016059917492075353,-0.1940995044522544,-1.645695845643641,-0.0037332971248914006,-0.8698178007197035,-8.743660541907895e-23,-5.838794798677255e-18,-0.0018364324020443063,-1.9776870627367797,-7.960654345405891e-9,-2.1291466071970545e-8,-5.192351152685026e-61,-0.07947575623258696,-1.0269773416560424e-69,-0.0,-6.135150153187018e-8,-1.4811294751784215e-5,-2.864274596016141,-4.0087036967887336e-28,-0.0977423319707698,-0.5174139118425892,-4.580578007103823e-7,-1.9896905500929352e-68,-0.0006320653025966947,-2.6611361606406666e-6,-1.0873883944148245e-99,-5.111052467617566,-0.09263137110203767,-0.0025405100049718105,-1.398291860227796e-5,-0.12601686229496492,-0.0,-1.3264363820872946e-5,-0.07198708383795302,-1.393700690073511e-5,-9.788578038438514e-228,-0.0005147780343335676,-0.000202319702280562,-6.369390049999333e-13,-0.005834392673683219,-1.3132749647066242e-21,-0.7944577743183934,-0.9027550191757774,-0.002842949249457553,-4.707670518197197e-20,-1.9584145277468061,-2.412988950205067,-7.478964082324029e-18,-2.053971542566736,-0.014025850839923392,-1.0512980076924552,-0.023863831389268342,-4.856248230486893,-0.002377684732061923,-0.0038376627351160678,-1.0960209731493442,-5.974312507204269e-5,-1.9664044977585993,-3.288324694171757e-43,-4.278852191434905e-5,-7.2547589162143e-5,-0.07056511067722845,-0.006944210363770938,-2.0237788852841256e-10,-1.6379490110507735,-0.0,-0.037683644231564846,-6.442195408605142e-10,-8.278023900201767e-14,-0.00011446144482371207,-0.07209783160555235,-1.1030951562954923e-7,-0.18201001171685022,-1.297450337430187e-6,-3.8717042734699293e-109,-0.11415283819754453,-0.0,-0.18656285130233258,-0.0,-0.0,-4.294106076783674e-7,-1.0872858888806894e-102,-2.7501061165070613e-8,-4.176724403421183e-17,-0.0006802115813130345,-0.006662585545062339,-3.8113285168868964e-6,-0.11999770395802435,-0.0001557320039502496,-2.7892306855245998e-8,-0.0001579545497025369,-0.010749132929483861,-3.602999607167706e-23,-7.808959352200109,-0.06568617192659218,-0.02343632152803715,-0.47319668833519274,-2.664470671794778e-30,-0.014390275267125007,-0.30683810023886476,-3.9090454925379997e-10,-0.46605728526463763,-8.038260789715054e-36,-0.003521011176377665,-4.041474926451525e-5,-1.3405357314563306e-10,-0.006482681024125391,-0.015720452275397402,-3.3626587889267695e-8,-1.5634225574171705e-22,-1.6376198815956454e-59,-0.002215331497667791,-0.11423111027774466,-0.2781626803231841,-0.9548558549135302,-3.830480056597503e-8,-0.0020184530298954636,-1.9926659028653876e-13,-6.211237720242024,-3.3247728201390765,-1.5328111415862848,-1.8390712261269464e-9,-0.37844548083147755,-0.0019210030511209262,-9.874814884111675e-8,-0.7897133423149548,-5.222280395654471e-9,-0.689983433201111,-6.319587936495097e-115,-3.735966572234118e-13,-9.532282789624253e-9,-0.4028881251856719,-1.2927786971605258e-176,-0.04864081770124008,-2.995288443557812e-224,-2.9848335706328682e-5,-2.9029674382681418e-5,-2.9803781066376255e-6,-0.00017252899419832314,-0.01610790237122929,-0.16487307906461277,-4.683269054073087e-8,-5.4924838813363494e-18,-0.0004142282932155098,-4.777711887520389e-113,-4.633708049962741e-9,-1.4546314907162121e-8,-0.0004183849101883376,-0.11048692387981791,-1.144645776618111e-47,-0.00015290950407551859,-1.2783772177892063e-5,-7.2809216372651e-9,-0.0035036457298701527,-8.030337512535978e-14,-1.336108604143085e-8,-0.0,-6.301574900798473e-7,-0.657041921993316,-2.5640384259222516e-5,-4.5968611560568973e-290,-1.4472510703808394e-7,-4.8266490686271513e-20,-4.642077940404e-312,-1.0779944686928884,-0.00012279782464993366,-2.119569256255377,-4.554544995494233e-147,-3.707916310874318e-28,-0.08421760338009977,-0.472814729936185,-0.00013681340617323587,-0.0,-1.9296534586770278e-13,-0.0032662748574466675,-0.35689870981417465,-0.08721795898283802,-0.0027238476749768766,-0.013231668875212828,-0.0,-0.12544132107663128,-0.001277843098575267,-1.9734852229622197e-5,-0.0006775771510890764,-5.35317332350699e-41,-1.5008404102337926e-12,-7.89312783625312e-13,-0.0,-0.0,-0.09628971327566976,-7.668027489784366e-35,-0.006186764353040147,-0.11197183452681912,-4.250880571452509,-4.4433615534147523e-5,-0.0,-9.87690161475011e-19,-0.0005013429758499932,-2.161384783962834e-9,-1.5090911147054025e-15,-1.0405392536926392,-0.9887733237955245,-2.4923574545606785e-5,-3.090014988476516,-2.5712470458040332e-6,-1.2758437047438958e-12,-0.0016043769416076215,-0.00028162352159041826,-0.00022811386428576335,-1.6944572070799635e-24,-0.0012445854549412096,-1.9164651467499192,-2.427204762697987,-0.0007342729564458024,-6.996062864055675e-19,-0.02451273674459956,-0.005044405208596145,-0.0004415498123389893,-0.003431131356300811,-2.658596486976617e-12,-0.032699283748661004,-4.5772002044520343e-10,-0.033740344594341595,-4.992565770104108e-10,-0.9275275992643843,-0.0,-0.5277966330199902,-1.756662640395323e-12,-0.6344015366793195,-0.20014186984601978,-1.4268357795675988,-7.857787470877824e-7,-4.339505591541518e-140,-1.7207274290220802e-9,-1.045844409168259e-5,-3.1668895161492492e-81,-0.07261796390935617,-0.0015728012253612138,-0.15384444776534445,-1.4833163003613212,-0.008431462637632054,-0.0,-0.6385564116177488,-3.010708858134578e-38,-0.04643158550563548,-0.004696010125501562,-6.452903685968875e-5,-0.12619497503951438,-2.966968662046412e-39,-0.0005593774697903927,-6.04933417348115e-10,-0.06147198177338328,-9.515550412150174e-45,-0.0038345104895095364,-1.888225848192706,-1.5068495403575746,-1.2523786621641186,-0.0007689041875434806,-1.5578172760536051e-41,-9.202803324317027e-9,-1.1941054725690472e-6,-1.8103018237473745e-13,-3.1704315823636736e-7,-1.1032489058000586e-60,-3.485929266355941,-3.48124235764424e-170,-6.814430918329957e-14,-1.5273994354727294e-231,-3.8328134219103634e-22,-3.5915835823432326e-6,-0.41770456866390593,-7.293216427448685e-6,-0.18450555297165608,-1.1184240786699398e-74,-2.059147233610242e-7,-1.5123060803907597e-116,-0.0,-5.128492256672343e-26,-0.0,-0.010148844210832344,-2.6867750577263463e-34,-1.3018813280041805e-12,-1.1171002742259707e-49,-0.0009971242260197442,-0.07958312627511417,-9.017179613246539e-7,-0.06242262497652466,-3.876912727170419e-32,-0.047594017127426155,-5.2752089011565315e-33,-2.1503144045555065e-105,-0.24432914001522535,-0.00032163077508792504,-0.7467855449295351,-0.035860672887794084,-7.416688290681714e-5,-6.797164243361041e-110,-1.1743286918287823,-0.025000381117027033,-0.0009040194080923931,-1.3549224183565305e-118,-5.2696758991426e-6,-4.530506906116648e-12,-2.1716885825952485e-7,-4.566546794490346e-6,-2.6246896948572634e-55,-0.29167197880275764,-0.0008787123250309924,-0.00024625628609736296,-0.036306797584309596,-1.2526873380348862e-7,-6.485154188714387e-17,-2.5112311476878693e-12,-1.671128555706396,-0.10160108924331113,-0.00017800611114112156,-0.0019593830811996268,-5.071293166365983e-63,-8.629386059912833e-296,-0.012546423069794194,-3.566538818331164e-14,-0.018626601011985554,-1.2321893328949183,-1.459004619950258,-0.026950187571919405,-5.2076896151483326e-17,-1.972519185984091e-20,-0.013653079119578183,-0.30800856602561616,-6.90268721992915,-0.017358671943621895,-8.908549087883677e-220,-9.078287968013216e-8,-0.0,-1.5747248340964174e-27,-1.5058026329030916e-6,-0.00018009289522768788,-3.1491383591191087e-122,-1.4769803629111877,-1.3103437180443127,-0.02983606062068772,-1.2157812718344216e-12,-1.2799572690669274e-8,-0.967016554124411,-1.2717231211359628e-35,-5.902765448191648e-157,-0.04462222390573506,-5.252772923397282e-5,-0.03478293982312899,-0.4339995607493109,-9.790332707668893e-18,-1.7852301598201875e-10,-9.401503366949136e-26,-3.6278593932334513e-42,-1.7737498868967978,-5.652508198985972e-85,-0.0031595323082215005,-3.3394179448198217e-14,-5.020909112347376e-5,-0.0072948708651132356,-2.095485830179718,-9.026584218851121e-45,-8.612294882641786e-7,-1.662740317418781e-162,-1.3089796554929537e-64,-6.077863268508705e-100,-1.2897262011562702e-43,-0.00019283585144398276,-0.017132725362090956,-1.704602437833433,-2.450154742132427e-8,-0.023898950897965943,-0.0007043986734889254,-12.612171096957608,-1.5151757851949742e-5,-8.74134956765703e-5,-5.283478893364022e-9,-4.838939367051531e-245,-0.030891611653399556,-0.0003003389986965649,-0.0006087680221627755,-0.011799105415963799,-3.789705959642818,-0.0019813561442840783,-0.2539004064213102,-0.005729991290680603,-0.00025431277039129164,-7.544753278652491e-8,-1.7312436579729184e-64,-2.1962900006841646,-2.487334309609127e-28,-0.37317905132482415,-4.0232483399555955e-107,-1.733672133698866e-23,-1.856067238889708e-7,-5.5531474880848224e-80,-8.705876988877675e-8,-4.058003448536447e-38,-6.52985756243823e-12,-0.0009592751399697604,-3.3800902404904326e-7,-1.1370043687551754e-11,-0.0,-1.0017604926930369e-22,-0.009799891418109516,-7.838197834923818e-5,-1.4040087538040163e-7,-6.262906838482794e-6,-2.152321669839977e-13,-3.725693122746406e-43,-5.1903129555029935e-15,-0.0018816277900786643,-0.07008979893120236,-0.0010129797841477216,-5.359338109832143,-1.9082728935316985e-39,-9.665519470870657e-5,-0.041084462570760864,-4.018579546880346e-6,-1.7600269738128251,-2.558873089308465e-11,-0.0003195488320951332,-8.713511947033636e-9,-0.0,-1.4526125986459453,-1.7763370295612357,-0.4292596247183019,-0.06833704253136073,-1.865490688302567,-0.012370985281765568,-8.401623181717452e-33,-0.0956376537647607,-0.029843442961758747,-6.709189823401864,-7.948449359739383e-15,-4.457127425480942e-37,-3.312787970750897,-7.145219127464903e-91,-3.1507889015423016,-2.0733901626904803e-15,-9.509442560460314e-107,-0.0028453064583437815,-1.0900271110327088e-21,-0.006146889390563684,-0.3337595463987873,-1.0069623714587754,-1.2224695955634493,-0.000801387587453357,-1.077428415896766,-1.273899433030168e-10,-2.822565972624443e-6,-4.427997611142119,-1.7541695956224967,-0.0,-0.6703687441940768,-3.5844787934660055e-62,-0.09089351585742259,-0.44278578533385193,-4.968205909263075e-7,-0.03474932974038853,-0.00046297270638348043,-0.0,-3.5259478375649216e-6,-0.10099177978322608,-0.001741970582350126,-3.4510437330239124e-76,-0.00209372408269263,-7.23079016262486,-3.194459733005665e-49,-4.411448642135045e-171,-4.806380957792917e-7,-0.00023340492239040808,-0.6920425085687292,-2.5739706182453742e-20,-0.7647061337506229,-0.17855332937330626,-0.00019853493638199976,-0.49364143255351944,-1.0204569546804295e-6,-2.5718976520798397e-37,-0.03850540218048647,-0.028774288462748467,-0.0016431609294385568,-3.548734902409056e-5,-0.0005713959653570262,-0.09483511815673437,-0.00019989833300091997,-0.8202485162427839,-1.5968323152632606,-1.3892458467138355e-14,-0.6552257654706147,-0.003821516438736067,-2.302687215644982e-44,-1.619372330976829,-2.5581639718536387e-14,-0.30371818621787844,-1.343025982525463e-64,-1.2438085826281775e-25,-3.7791221666110356e-15,-6.646497212900902e-36,-1.0873532222316538e-7,-2.2646878943473698e-13,-1.096105436461941e-187,-5.66338248493778e-31,-0.5072247579988004,-0.8091189440631171,-0.00022972810720447152,-7.649613808107649e-61,-0.22407570351893447,-1.463331653176287e-308,-0.011220613709865898,-7.070661101134323e-30,-5.436989196922163e-304,-0.018627926050634142,-0.20490070574613053,-6.929295271015537e-10,-6.91e-321,-4.009924660337747e-18,-0.022365296673484972,-1.9728474645304945,-1.0118577935577242,-0.0022924979944882284,-1.4401628524862724e-54,-4.076491946485692e-5,-7.545590237091494e-6,-2.352035981018705e-28,-4.905363842746609e-64,-0.00011627832799460627,-3.423901512877998e-119,-0.000896875219130637,-0.0,-4.036285937727146,-0.3435752449995323,-1.7732947913221276e-130,-0.00041816010854797936,-1.4605513835207305e-13,-1.4437468016073835e-76,-3.511789427755451e-7,-4.2032211558367954e-29,-1.3463388647413363,-0.0639188908868333,-0.00047223678756111475,-0.003175214238063698,-0.7397730293817723,-0.0,-0.0053250418251214295,-0.060251966299987476,-2.4310018561853153,-0.12632603734387152,-0.0001375592612939501,-0.03216904551039921,-5.501401978538812e-8,-0.22776521614361722,-0.00022264524269853398,-0.7899782501944576,-3.81539077048075e-226,-0.5341234778564052,-0.010406473462016558,-7.210194560265299e-37,-0.13297575213031598,-0.11616286869395419,-5.125515537232159,-4.545682213497825e-12,-0.011750783685925392,-1.7872856720839305e-6,-1.1827740503851495e-16,-1.6842407656364466,-2.694455554151791e-227,-0.20560014381756628,-4.038716892469853,-0.23967204288162275,-0.0001574720281778975,-2.0814737426763816,-2.2268748216751124,-0.00013597643134097281,-2.41684609735e-313,-6.989413267709032e-8,-7.935132926381583e-9,-0.5364368236584415,-0.0,-0.6669747321783122,-0.4723507343993913,-0.0,-0.040045679791142666,-2.0008450858082223e-6,-1.3988526139274546,-1.1890737799367488e-6,-0.3161541036751299,-0.024866708778557737,-1.694501739864937,-0.00027431865854035713,-0.0004512750384756882,-2.70555187249367,-0.5239446766342647,-0.0031036043588513512,-4.4462741541673145e-14,-1.3816684170928664,-5.587293750988718,-4.579066864003823e-5,-0.002979203710164101,-1.850776503382948e-7,-2.444558355019488e-9,-1.3340347597108382e-5,-5.136681080760495,-0.053340558386141254,-0.03689832484934046,-0.6303977823398513,-0.06491132708712699,-2.3703130066448814e-7,-0.048097976205236224,-1.1400891419871299e-40,-0.07004889871396627,-0.009911060504186203,-3.2158370355986923e-7,-4.439160896497962e-6,-0.0,-3.687428689440726e-25,-0.027814670476891203,-1.9284705114800588e-52,-0.10688598469385982,-2.2363751061120274e-9,-0.8553964777732285,-4.5779448132661883e-32,-0.6503952802322399,-0.11971483041470146,-3.732789407075243e-10,-1.5464190854766914e-16,-1.1801587303809041e-18,-0.0023167025916083776,-5.036982082240604,-0.8396568039088299,-0.09620472889183751,-6.732552410772089e-21,-1.4271778599193696e-13,-0.10389958555136719,-7.627718615257346,-0.00019703028563841703,-0.09950675893377031,-0.021382022841331824,-1.1651126323730288,-4.247698125215506e-77,-3.3128449974026583e-8,-1.213709566403554,-0.0004937671029401691,-0.10091949997736976,-0.426557563373495,-4.86258298554987e-5,-0.011756052185570067,-0.00026546337483109505,-1.494413760369861e-9,-0.07186991592111325,-7.064927552245624e-5,-9.156664558495436e-9,-3.118794250555813e-6,-0.19796467481834423,-1.2266376530309465e-5,-0.0006320232648310517,-2.5873974164528932,-10.249097187197652,-7.57005855225188e-19,-1.7237015447836116e-27,-2.0526567882469555,-3.337651803174625,-2.5103561325080087e-10,-0.8648254874060304,-3.215803094611276e-28,-0.059022928422311896,-2.3189323312203562,-0.4764077172868672,-8.661861813858475e-8,-0.13969034325154744,-0.8460331444272672,-0.0051246128542435975,-5.920402579431804,-0.04131339150942801,-1.4595268137435874e-132,-0.36496476400992056,-8.686643758197292e-6,-3.0064460689338013,-0.46894234523665385,-1.0978182585096328e-22,-6.813876893767524e-55,-3.178557827935062e-7,-1.968881974414133e-7,-7.281723828857064e-10,-1.0550241516548498e-5,-1.2769946447933525e-5,-4.830641390890351e-10,-1.0051049456531937e-9,-0.0025088918254819142,-0.0193131825097023,-0.042654287553103146,-0.0002624331320259008,-8.141826562871112e-32,-1.27909945076884e-140,-5.910296727842254,-2.6398389708385387e-6,-0.32376082404718187,-1.1388554955330003e-62,-1.4544999336394768e-13,-6.450519128887453e-20,-5.602069157908194e-8,-0.00016496805814192745,-9.921319908897193e-6,-3.0358997096102334,-0.06848705730992521,-2.960593014173731e-165,-0.0069160301310838244,-3.361421973865591e-40,-2.421213259474697e-63,-0.9205811282959917,-1.1457509542901283,-1.9622608833039992e-66,-3.835736286903273,-0.06310183752376369,-2.8482119225380844e-16,-3.265195793782907e-9,-0.0,-0.0002872237828109757,-0.0,-0.001024270327789142,-1.6032741836758475e-25,-0.005744639447852601,-5.946942334885604e-6,-0.01343995575744597,-0.9754120276919425,-1.5301409784174563e-6,-3.9256071020232133,-0.08420367989862593,-3.350082507199182e-59,-1.0064011328564704e-63,-0.04998444433963639,-0.9292547956740753,-8.561045253319747e-32,-1.3795352826308336e-8,-3.377229301901913e-8,-5.309442014885551e-20,-0.10403691783149172,-0.0,-0.0034850390623484833,-3.6294622516179476e-5,-0.01980183689626394,-1.365649094578714e-20,-3.623905111051272,-4.927122639104404e-6,-1.2108016730121683e-77,-0.006016627488898394,-9.51671812840536e-32,-0.43073660870908015,-1.2962979077371963e-128,-5.443294901861522e-18,-2.192983975277027e-11,-0.0002490861360274223,-0.0022814538570091005,-1.7091968138136217e-61,-0.16332907186734047,-0.49344931386114793,-0.0004411893180880576,-9.275019956145666e-68,-4.90050913291829e-6,-0.002281291478643531,-3.01126359446606e-221,-0.0033352678847464053,-1.79623481028143e-5,-0.8227948447635669,-6.673022084143598e-41,-6.882595722267199e-8,-4.289730199237901e-17,-0.000718150004564732,-0.404188215417575,-1.2633809658825e-7,-0.0005153249474283441,-0.09964296191762607,-0.16193355485889577,-1.3358947956774586e-11,-0.005877811841283821,-3.5135601171797626e-6,-0.5021452519440563,-8.096182607527893e-40,-0.1124824535848947,-2.7797966531140886e-21,-3.114045327080842e-12,-0.00018033786328752657,-0.029708194830384064,-0.004267138550752603,-0.0,-2.3304576906743057e-29,-0.1366433759143989,-0.03390555231901823,-0.004196952536639108,-1.0751059909291043e-19,-1.1798917122403465,-3.3922926613871184e-20,-0.02338811446063958,-3.27571835223989e-12,-2.5808319872117466e-127,-6.275925819089344e-6,-0.0009036429633512902,-0.0015577705363817318,-1.6845180938656706e-5,-1.5380339309706484e-14,-3.3731275766495383e-6,-2.1024124327941522e-7,-0.0015763753262511948,-2.210625585011677],"x":[13.061492862877033,15.470115092063725,12.397692073285466,3.5117655947839888,1.4509676628686474,5.381146152296279,4.579236273910117,8.84106451723753,3.5219637195869558,2.040186735756384,1.3010433481256811,6.533825064539469,5.362649625288394,13.004114135737499,17.970891760416716,5.834288782348289,9.71294266650844,12.434631164453766,16.744660897331606,18.12536819439094,16.32394734953788,14.996663611909181,17.169634826354176,11.661680173439933,16.244233708839253,10.12406031718887,11.71536439937694,1.8833310454434526,3.647344867140796,14.183826874944181,17.44312707251148,6.647873267935864,5.923559904193358,7.803436066254901,1.085300812572343,11.173579765059571,13.67788576946265,5.889375629937881,13.964859110282436,19.427798551992417,16.84653589376992,11.128358068307058,7.6852144127433375,1.3283166199810914,6.604399806254251,3.208515215431418,12.354491803895007,9.958507727346637,2.13803404527801,4.07379840226803,11.431565250984281,16.329765837400135,2.0688468559312367,7.713101891258742,2.6517284285484433,17.440349907673355,17.01911025397834,18.998388544387637,5.36310019523055,11.686696461187381,18.74342576260041,9.54401978055676,2.08475213320078,1.7728282092131176,4.095760426230468,14.769057577452305,1.6869190582487947,13.44062173266305,3.9640165606937527,5.557505445864286,16.346914207230377,16.398727082639823,12.728446735088262,17.054576622814114,1.2721342052816675,16.760851330744867,11.317964387034309,18.81882422382368,7.028044955362764,8.814007328373151,0.9605959269892894,16.787856537954568,7.429102988220837,14.292090425449405,3.739408999182774,14.78049879479177,17.344753671193487,1.8217000225254099,7.5502005816108175,11.965515904289052,2.3512576357436688,0.049155898835824274,5.447731159507376,5.421546209964476,12.553642029371467,17.960976279883244,7.798205643323115,2.7565512202106612,7.8249064408933,10.498742297223682,7.364055843423891,2.514356046094961,14.527916721017537,8.541887798413468,9.703676106889603,19.70595340071239,5.647809626840115,4.338595373142837,0.7587131438211747,18.424540089902518,3.8999053754570845,13.05500956751863,19.441192245168022,18.07483782263631,12.257802989725931,19.569137419330648,1.477259546831986,7.864207144075177,17.41193008450683,19.31538771874017,0.9902555655157741,1.6020522139356963,16.244628425539407,3.9764839950927833,15.3110296277175,5.809254620157369,14.839255689489379,3.7908280382287485,6.50029391537684,17.765127149447824,19.072416243788197,16.336787078375814,2.7144787325246167,19.053664423361365,10.627669011610195,7.901652879159142,2.5763227494444196,19.57538069263923,0.08635046625513176,6.860212132734009,1.188788155552678,4.609448959775682,12.156673104428396,13.106150966523025,9.989635128386052,15.97174859944737,8.756983038541449,0.2619561578097862,6.570779443556902,8.840658130387862,1.051212685363292,17.496349666856222,18.346851467989417,9.595287111731498,9.607865413903927,10.937442293629855,0.21334238466678812,9.999413430828973,15.023003699367257,12.219241631316496,6.118171977025071,12.393225699409385,0.3778100597703338,13.038815358006023,13.8615424464746,18.040198604146394,10.519970497177301,1.582485944880716,2.5684398144863962,2.551923702715344,3.9633837634911417,0.44954612454327414,10.679915633007159,13.47702546726708,10.168869962092963,8.642178299225382,15.766355034003091,4.1278378615273015,19.137723919773556,10.004931125597718,12.08519368873259,10.709479333591405,3.20374149023424,16.59761765015629,7.373748743629438,8.892892766564696,11.014138657872955,3.371931407934019,11.273410215596975,15.392127907093718,10.558993859355965,15.492963978407479,9.945191722932067,11.882331608800737,11.86974499117671,6.613057115626351,6.9596064473193575,0.8035547673379284,10.927501413246947,3.7145229028745153,12.301777002175989,4.43185730015454,16.80201059560912,1.0869505192364048,17.460447613116642,15.316242484809596,17.59604645698517,2.502354369348696,16.229936308725087,17.77264690747267,16.223524844444334,5.1688027432315575,1.5205391679100977,14.78930039290152,9.330910764901631,0.7845653293372168,7.526124658941837,9.055368102337397,6.263960130625761,11.381851114826818,8.570515939625372,0.39725694793484756,9.634614151187137,8.160347172701684,18.96194736599895,10.144724770154387,12.117079011390043,19.61740112049343,8.079806422858162,14.498185463855195,18.191444700681213,6.412978079399507,15.700828560608109,15.761951819970763,12.47408607638385,16.25433784049975,2.984241549842359,4.034282238014617,16.729472625583135,19.985043417508944,1.6488306690528942,1.5329061513512565,12.52851470586917,1.556654567790119,6.202944686429985,4.459938024117065,7.788925660884578,0.4962774410033166,13.463210464340811,9.502228263618955,2.7175056576645407,10.0788725582421,1.695986220515504,15.341171683893965,7.9291069483793075,6.697117274160824,11.505509122885709,8.541218305498223,17.514941039018215,3.251718613993937,17.821975858669816,7.3065175151466555,17.169581274163978,13.399843001383775,15.481224723320036,8.735733947881723,11.891244782887078,3.7607142701878837,16.740371901219227,12.183991998490837,7.367300715675005,16.31412525061755,2.0864471702699827,3.0235457083194284,18.094833686079383,17.921027102158853,19.81983436375107,3.559207041862229,17.73080126760633,18.236570023957974,2.0899239793448476,13.14536936940479,2.936528212498226,18.49700987583506,18.75404623079654,11.116286394827078,10.463978011452998,6.60440043339082,0.1259128372774665,6.276463193760491,9.204940694502927,5.46412786499936,6.4188670564765005,9.157146379890492,3.5867708255141206,12.013177969580555,4.770150103263258,15.398541086986981,4.658860547168477,19.024126222039975,17.639926444563567,4.861637034839892,11.59690490840283,16.498325345089434,19.619449222577963,18.9407535848065,12.365180261968685,3.7220349402210617,4.336466485697792,1.2178839264699137,17.501549826245014,16.439819760930842,11.842261764472028,0.2847213957465655,0.7116932413243315,3.4549170311273247,18.545579212756472,3.700677949371305,9.142091001629886,11.790750125252245,3.8899747943123275,13.732706159008995,2.33194605236283,16.532386371112718,6.719199427603764,18.229838110122486,2.3156076767721423,13.69290615760411,12.300900945082866,15.374666480999934,7.336836694992459,15.488963254105172,15.508449400822983,14.952012621119195,12.017579283656836,8.256678800353026,5.9683994012837704,18.173112376838137,18.607329577898163,17.200281832039728,11.739648314231834,19.868952553893937,18.48336767929933,9.520613590437845,8.45938440200098,19.243216594596056,5.833523043205955,16.95158841792885,14.001199140158235,3.984009992242208,7.092839348958,15.797814952105043,4.437309403234839,4.816414449520461,3.7296221077109326,18.19879822364382,17.402189595200717,14.521524555136587,12.986500381242866,1.554500721181129,10.062547839660976,1.459470660922011,9.370052752228002,3.2923140540977203,3.985029738713952,2.7701443057723285,19.888100550323635,14.960755434487677,14.763905040376386,15.591351291296345,3.89286044929833,7.399973608098187,13.751437907507661,13.382604716915022,16.42209647329128,2.8574647946658827,10.634350631302896,8.278020192911955,13.432952006532496,19.298226363523668,15.413000299007704,15.868559908513964,9.049842286986408,10.462258219462974,8.046939359473138,9.415079099343222,14.758743101478093,8.678487837085829,0.560723888756951,10.839926636492931,14.123882889389069,11.274231264293935,11.288910136618743,9.696128096256743,8.65284948964165,1.8268101951435645,2.8166886879771225,19.93732918899004,0.7081207300719194,14.415568716641785,17.642466094936818,8.730335777079503,12.800646175465475,12.418994881974875,6.925331159913495,7.721999014863488,2.278979714200471,1.2712366051845558,5.603789962032462,9.761619140820486,7.5174501018234,13.721612711079603,19.342764060336197,6.05269048371428,12.489740455841968,10.057104972089949,16.886872768857533,10.84517511916884,7.137119924167101,0.46572186037248553,12.43929236910974,6.512765557258198,15.116214091958966,5.608155473670555,6.87356098100103,0.8378609591247743,11.924890141915236,9.523131193609448,6.627577890423266,12.452840129514474,16.127345336478566,10.333526579569043,11.719134321028735,8.738144671543399,2.9890798939796737,11.052774023539307,17.440320550447687,5.748745537639026,15.14685302250793,7.810111280861518,15.714976749886453,14.983083181513308,5.123905523986285,16.185079331008527,8.231581275828859,19.578394288263638,11.18730825507515,2.7044176897975714,12.000993140321983,1.443478335220596,1.8526989089963575,0.1802752137073904,5.079870003192606,9.682515703782663,8.168202238966327,10.004624479509925,7.713755444458048,18.34331105296204,4.978231367893642,0.9236009037419812,8.125321888989028,18.64651049339657,15.778642685667394,18.100740855147166,19.238388266223815,5.192503598392815,19.849478902566723,6.055073738625145,18.63330516721343,9.659870410230877,3.944836219801462,19.203315409520016,5.368572539778618,7.037500737374014,6.1539850940223095,14.245479674412312,3.455359946561356,9.123088504021366,17.041441266750084,8.65277052255681,13.831282051619361,11.633981093639747,8.056786833735226,9.792588723194427,9.18633984381664,17.0492505539306,8.552811627938365,10.135390675722107,4.729518636190719,11.62406607397623,18.42049550854484,9.805652692188476,4.077426262748882,7.903453666811502,10.922376301591834,8.684206232490986,14.745873675495575,18.585746509415323,19.385501297321834,19.13678342139782,9.92228460705098,7.117288086100233,6.3390257556322505,10.961873391407856,10.088933456505984,19.70437171425173,14.271087682426081,2.7351616736199524,3.140114536995542,6.575446586052012,16.465903644652236,6.467953183497732,19.271830536489315,19.893625368706754,14.361230908713187,13.215810706320719,10.396908142497958,3.171897457844741,2.848368531495109,9.797067674883632,10.248790895726177,12.792465675788645,14.545057151376618,4.17948225849996,0.1345992654486361,12.760287509690471,12.07567022696308,6.22171510355122,9.416574319138373,10.273399780720084,12.406522859575047,15.404604738795221,16.052862074313726,3.146362115310848,3.164180784387085,2.492731071623937,12.613512248626954,3.090671964200622,4.374055486416539,13.54561090934359,9.386466631311636,10.21639164246631,10.751995761843883,12.399281756709875,6.015694827103779,4.755493467274894,6.262662757300794,2.8223762060343383,13.533571359356745,2.4504611833855927,16.176890017897666,12.709427259261744,8.291868821841337,19.340007349369138,13.56482649572854,0.7628972275375068,17.87819605534741,5.416398444780088,3.0421914984540255,5.779794766572297,18.175418947643358,7.960839960407737,11.052510400993537,7.762100925354347,3.167273657788181,13.7696527314798,2.3001992470778987,17.46284345162802,0.006242568192114106,17.352679936666647,5.750410085330668,7.502568074940443,14.945621921095489,6.258340470215802,2.9886766843401213,12.513356776613671,8.306294793395988,0.7999188751628505,9.618370206620902,4.918229924784159,4.364957569969192,11.908486750493301,10.233684031759198,18.084153686836043,1.9934456187921912,12.855101259178724,6.7928121121908935,14.016469657158414,13.48075225879116,19.948255198975104,15.338328114967101,13.057476659952307,17.054342947722105,18.483932510711043,18.10069655088931,15.462009638188974,13.054862883466338,3.5300240646111325,18.510011010543664,10.161624596502325,11.283970205506906,6.273006157870089,10.901445714135924,15.527776831273524,5.7595213539094825,10.74299441182018,8.48354451593757,4.813491998460808,16.088373226808827,0.43542707014586846,6.099085224849823,19.152177657584648,11.110596201005638,10.12281899559127,2.293543597781631,10.934581455619679,12.286100407267174,9.39173139058354,18.39788730405769,2.1946646574945827,2.546468890275788,4.710745941212546,6.4828149780023026,2.415247965167855,13.591771444434432,14.71732241422763,9.703233391001493,7.672961504068487,0.20864500158381816,14.617680330830144,17.871782921014354,1.0758772119584892,14.111295345591932,0.6941683821630296,16.29730907815537,4.14537687728239,16.68371599184322,9.035654001099399,14.740924263229381,2.148010563041085,4.169592431767746,1.9563584470853046,4.118840562756634,2.417944871237121,19.683361033413544,19.769144406558393,0.308118345295294,1.7653260482890198,14.78449910469056,2.9228761301801454,17.267695871041326,5.7404987409861175,6.4481518190883325,14.850862507932167,11.931164733147694,10.289902032592376,17.065850055446678,6.4729064568635675,9.708463232044737,15.019769644396138,15.560967304301645,16.782049815198864,0.17887098893617726,8.016808045475404,15.983669207183834,17.730669290166347,9.211293969846652,5.232584876612965,15.67863549263119,3.4477412676578068,5.391180559691331,16.55257756965133,2.9285585329964903,11.62880058905408,10.68036753469087,11.25076485437794,12.42747316797987,3.8283539158016655,18.432237059338497,18.322763558577048,7.339012099383773,14.33436747949016,3.9836140394678887,2.8220602348498103,10.25160156557114,4.94895073380432,10.155975640022072,4.846491099670072,2.84939435314552,17.412553713141385,3.3792289930012176,15.654258876866244,8.739484494551748,14.7609867272425,9.837043727910695,15.473276702325748,13.546468902011162,19.94245401272972,15.541837838371602,5.406768096393293,2.9957720356298445,13.140499375481202,16.236707406659164,6.876786937094743,4.367544908000682,11.294779332178821,14.647169605377485,16.61398245600313,11.795463202183889,7.696509983624065,3.148001019784159,19.145365930256833,12.293166853324085,8.665248209533454,1.728485060953897,2.400899033599573,8.093430409889027,14.709995600583618,5.614817198241182,17.927227808253797,18.373895432729746,13.218639718551008,13.459973053985124,18.241845710566725,7.300263396401885,16.912540250587462,0.7188317037877745,7.743808811201736,15.02111069357159,15.411300326234985,12.359692120035604,12.083400509772257,15.265433846384372,16.626162035852378,1.9751002407396134,10.878590809870271,16.930375726707567,14.122642547787748,1.1738706970533652,18.571019996898347,2.541834021292537,6.256595835768164,1.225139271430331,8.200178778694198,11.69783216092637,7.155445182950939,9.556861696796268,8.530039990212078,4.459811067449979,5.4348373766948255,19.9821433563659,4.442247415091121,12.8444874673642,18.412706059045835,7.42818462388942,6.482367381395329,0.5127328772025752,16.11408637744638,5.332239262206864,15.296716000390527,16.667359921398358,3.1227472016905677,10.70910262562335,5.558638955592392,0.8133775665466336,8.229592388662038,9.770968035823886,0.7261935373413975,1.9268629786932578,12.224368638774688,5.4910819983781956,13.9161208286278,19.700468397646116,1.5672442058419644,14.805228409437419,3.64437934939561,5.242392868134966,15.39854959525481,7.344971027491081,12.177535795181278,1.2549869682785086,19.803403871819683,7.743306108536765,13.446643191603345,1.0297414016464135,16.18592123993025,14.687602679827595,0.3648704895178012,4.279903368845566,14.466466381433234,13.138106663013218,3.0216498805283143,0.35201554779447974,1.2741370702678978,11.572708660621576,18.594284635241678,11.303019097778062,14.452342699868819,0.5281037436110037,8.806790801277975,12.51657934294605,3.843466321503457,5.215503112567945,13.55429466342148,5.217916905339086,2.5951873382336466,3.826594677785211,11.103748414795525,4.534414316696509,10.20029786230269,6.605797266252815,9.748641304219543,7.784231853304013,17.860924227776405,1.3184269352052658,18.44430031041689,4.747658337848115,15.825651928048078,3.451093793106512,6.766425440514472,18.574132768045914,5.770057928355987,17.520799430425708,10.78674337918569,0.5610771372907575,4.117191351432723,10.207784830969779,16.387976563118748,15.753006042571865,6.7853334310385405,0.13040862197971848,15.620771611246656,6.462460133029153,7.865885470644205,2.392977261007996,16.26763966151305,14.869332722924824,0.6193192284366056,8.892876518713212,7.060108698167937,6.494437420430685,3.463783197696255,3.659326235076037,16.890716063229647,14.524393358500767,11.419099924362657,15.002500064940442,13.749787130553974,18.411950771656144,8.625770269748475,18.208835048759067,18.948327612477232,1.96952025422517,0.029137273110109163,19.69414884388124,18.974765262729427,2.5271532424338528,1.3020041528677595,16.51764002210713,1.1833004512460787,12.730182628004938,2.8527120438403486,1.4500061770340533,3.9876561091044405,6.555674068228465,7.4252725589810575,2.4447363451124815,10.34221275622674,0.30910924695775055,8.415623921037456,17.290854647152372,1.483833916394941,14.464649908303615,0.5769370683638675,4.143250029220078,11.662037818833614,17.926917392988436,9.939627880793092,4.065040274284519,19.424687561348712,15.919212604280894,16.110280957007845,14.950892732163652,16.02680694134198,7.864028307741919,4.244439910439679,5.551044534668446,17.176206452786346,10.293650422273828,16.129383127173934,0.27470261415599495,15.268980177974129,4.7600303678782385,19.40681173792965,11.046464841315737,15.987499192443897,14.635503092929124,17.22198398560284,14.921973367226894,1.4621817103361767,5.602495925730797,19.569565809811337,11.85764179937614,9.653764220147373,16.717393232302264,2.623065613379212,2.808737085837114,15.61435336781122,0.881483890929533,9.982475799790397,14.265277849994135,8.789751175828965,19.582205527730345,15.331158471423766,8.04680861321447,8.882518414690201,2.4056931981524077,7.594372294840279,16.040024740187924,11.453579468403237,4.1029981774130375,13.595897841353946,0.8827660655890135,5.176232342551592,10.636535056947682,15.110651717440158,9.642688205394707,3.807156582397613,5.675949270687624,4.014223021745615,4.623452595962516,10.116555488267188,1.4095071122351488,17.671152121408944,12.009425064966873,16.888939236740566,4.484514577124559,15.771170220972,0.4965640312427855,16.224743910718104,8.997873563598958,11.11163330248706,15.396684168457613,2.93673774624561,8.080129014768014,11.529546164418454,10.72305585030358,4.3209215685999025,4.244920943981101,10.454988475630467,9.381720392569832,4.956324007897326,15.324032740379074,4.342980594325945,3.589238261663117,13.582124869886222,15.685814097277184,15.291374423006623,17.33825437467918,2.6192108824831806,19.51016230881215,18.98068304476213,18.885135049458537,11.078369334300433,0.4385824201968713,17.91892560929284,18.199029961006815,8.61945741409443,8.689283945245556,15.050691687945271,3.5818008324281525,11.39983069925977,3.24147164586968,15.260335601738394,9.58902697255397,9.31477059014532,13.195550913345233,14.085622937787337,11.810897831778483,9.48484421243565,19.29246184809135,18.56341214588303,7.8129583575532635,12.842423370783225,12.226941649610854,6.9738952704519885,2.286524597948416,16.96986150015864,6.886116421020261,12.012245671506086,18.389772806087926,17.76463464792734,18.16074641485868,10.92303178580671,19.74350479703069,11.585801956847517,19.016794163645862,16.846297600846874,13.602089054372165,2.26747607684171]}
},{}],25:[function(require,module,exports){
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

var smallScale = require( './fixtures/julia/small_scale.json' );
var mediumScale = require( './fixtures/julia/medium_scale.json' );
var largeScale = require( './fixtures/julia/large_scale.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logcdf = factory( 0.0, 1.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.5 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `sigma`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `sigma`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a negative `sigma`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0 );

	y = logcdf( 0.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to 0.0' );

	y = logcdf( 1.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x greater than 0.0' );

	y = logcdf( -0.2, 0.0 );
	t.equal( y, NINF, 'returns NINF for x smaller than 0.0' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given small scale parameter `sigma`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = smallScale.expected;
	x = smallScale.x;
	sigma = smallScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( sigma[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given medium scale parameter `sigma`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = mediumScale.expected;
	x = mediumScale.x;
	sigma = mediumScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( sigma[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large scale parameter `sigma`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = largeScale.expected;
	x = largeScale.x;
	sigma = largeScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( sigma[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/rayleigh/logcdf/test/test.factory.js")
},{"./../lib/factory.js":18,"./fixtures/julia/large_scale.json":22,"./fixtures/julia/medium_scale.json":23,"./fixtures/julia/small_scale.json":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-eps":85,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95,"tape":153}],26:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logcdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logcdf` functions', function test( t ) {
	t.equal( typeof logcdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/rayleigh/logcdf/test/test.js")
},{"./../lib":19,"tape":153}],27:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var logcdf = require( './../lib' );


// FIXTURES //

var smallScale = require( './fixtures/julia/small_scale.json' );
var mediumScale = require( './fixtures/julia/medium_scale.json' );
var largeScale = require( './fixtures/julia/large_scale.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `sigma`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `sigma`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a negative `sigma`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `sigma` equals `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = logcdf( 0.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to 0.0' );

	y = logcdf( 3.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x greater than 0.0' );

	y = logcdf( -0.2, 0.0 );
	t.equal( y, NINF, 'returns -Infinity for x smaller than 0.0' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given small scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = smallScale.expected;
	x = smallScale.x;
	sigma = smallScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given medium scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = mediumScale.expected;
	x = mediumScale.x;
	sigma = mediumScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = largeScale.expected;
	x = largeScale.x;
	sigma = largeScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/rayleigh/logcdf/test/test.logcdf.js")
},{"./../lib":19,"./fixtures/julia/large_scale.json":22,"./fixtures/julia/medium_scale.json":23,"./fixtures/julia/small_scale.json":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-eps":85,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95,"tape":153}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./abs.js":28}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"./ceil.js":30}],32:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":64,"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/base/utils/float64-to-words":80}],33:[function(require,module,exports){
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

},{"./copysign.js":32}],34:[function(require,module,exports){
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

},{"./expmulti.js":35,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":56,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95}],35:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":41,"@stdlib/math/base/tools/evalpoly":60}],36:[function(require,module,exports){
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

},{"./exp.js":34}],37:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":60,"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/base/utils/float64-set-high-word":75,"@stdlib/math/constants/float64-exponent-bias":86,"@stdlib/math/constants/float64-half-ln-two":87,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95}],38:[function(require,module,exports){
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

},{"./expm1.js":37}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{"./floor.js":39}],41:[function(require,module,exports){
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

},{"./ldexp.js":42}],42:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":33,"@stdlib/math/base/utils/float64-exponent":62,"@stdlib/math/base/utils/float64-from-words":64,"@stdlib/math/base/utils/float64-normalize":72,"@stdlib/math/base/utils/float64-to-words":80,"@stdlib/math/constants/float64-exponent-bias":86,"@stdlib/math/constants/float64-max-base2-exponent":92,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":91,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":93,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95}],43:[function(require,module,exports){
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

},{"./ln.js":44}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":60,"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/base/utils/float64-set-high-word":75,"@stdlib/math/base/utils/float64-to-words":80,"@stdlib/math/constants/float64-exponent-bias":86,"@stdlib/math/constants/float64-ninf":94}],45:[function(require,module,exports){
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

},{"./log1p.js":46}],46:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":60,"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/base/utils/float64-set-high-word":75,"@stdlib/math/constants/float64-exponent-bias":86,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95}],47:[function(require,module,exports){
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

},{"./pow.js":50}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":60,"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/base/utils/float64-set-high-word":75,"@stdlib/math/base/utils/float64-set-low-word":77,"@stdlib/math/constants/float64-exponent-bias":86}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":60,"@stdlib/math/base/utils/float64-set-low-word":77}],50:[function(require,module,exports){
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

},{"./log2ax.js":48,"./logx.js":49,"./pow2.js":51,"./x_is_zero.js":52,"./y_is_huge.js":53,"./y_is_infinite.js":54,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":12,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/sqrt":55,"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/base/utils/float64-get-low-word":70,"@stdlib/math/base/utils/float64-set-low-word":77,"@stdlib/math/base/utils/float64-to-words":80,"@stdlib/math/base/utils/uint32-to-int32":83,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":41,"@stdlib/math/base/tools/evalpoly":60,"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/base/utils/float64-set-high-word":75,"@stdlib/math/base/utils/float64-set-low-word":77,"@stdlib/math/base/utils/uint32-to-int32":83,"@stdlib/math/constants/float64-exponent-bias":86,"@stdlib/math/constants/float64-ln-two":90}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":12,"@stdlib/math/base/special/copysign":33,"@stdlib/math/constants/float64-ninf":94,"@stdlib/math/constants/float64-pinf":95}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":68}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-pinf":95}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{"./trunc.js":57}],57:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":31,"@stdlib/math/base/special/floor":40}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"./evalpoly.js":58}],60:[function(require,module,exports){
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

},{"./evalpoly.js":58,"./factory.js":59,"@stdlib/utils/define-read-only-property":98}],61:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":68,"@stdlib/math/constants/float64-exponent-bias":86,"@stdlib/math/constants/float64-high-word-exponent-mask":88}],62:[function(require,module,exports){
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

},{"./exponent.js":61}],63:[function(require,module,exports){
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

},{"./indices.js":65}],64:[function(require,module,exports){
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

},{"./from_words.js":63}],65:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],66:[function(require,module,exports){
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

},{"./high.js":67}],67:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],68:[function(require,module,exports){
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

},{"./get_high_word.js":66}],69:[function(require,module,exports){
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

},{"./low.js":71}],70:[function(require,module,exports){
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

},{"./get_low_word.js":69}],71:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],72:[function(require,module,exports){
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

},{"./normalize.js":73}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-smallest-normal":96}],74:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":67}],75:[function(require,module,exports){
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

},{"./set_high_word.js":76}],76:[function(require,module,exports){
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

},{"./high.js":74}],77:[function(require,module,exports){
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

},{"./set_low_word.js":79}],78:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":71}],79:[function(require,module,exports){
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

},{"./low.js":78}],80:[function(require,module,exports){
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

},{"./to_words.js":82}],81:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":65}],82:[function(require,module,exports){
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

},{"./indices.js":81}],83:[function(require,module,exports){
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

},{"./uint32_to_int32.js":84}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of `1/2`.
*
* @module @stdlib/math/constants/float64-ln-half
* @type {number}
*
* @example
* var LN_HALF = require( '@stdlib/math/constants/float64-ln-half' );
* // returns -0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `1/2`.
*
* ``` tex
* \ln (1/2)
* ```
*
* @constant
* @type {number}
* @default -0.6931471805599453
*/
var LN_HALF = -0.69314718055994530941723212145817656807550013436025525412;


// EXPORTS //

module.exports = LN_HALF;

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./define_read_only_property.js":97}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){

},{}],101:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"dup":100}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{"base64-js":99,"ieee754":122}],104:[function(require,module,exports){
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
},{"../../is-buffer/index.js":124}],105:[function(require,module,exports){
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

},{"./lib/is_arguments.js":106,"./lib/keys.js":107}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],108:[function(require,module,exports){
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

},{"foreach":118,"object-keys":127}],109:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],110:[function(require,module,exports){
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

},{"./helpers/isFinite":111,"./helpers/isNaN":112,"./helpers/mod":113,"./helpers/sign":114,"es-to-primitive/es5":115,"has":121,"is-callable":125}],111:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],112:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],113:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],114:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],115:[function(require,module,exports){
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

},{"./helpers/isPrimitive":116,"is-callable":125}],116:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){

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


},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":119}],121:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":120}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{"./isArguments":128}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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
},{"_process":102}],130:[function(require,module,exports){
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
},{"_process":102}],131:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":132}],132:[function(require,module,exports){
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
},{"./_stream_readable":134,"./_stream_writable":136,"core-util-is":104,"inherits":123,"process-nextick-args":130}],133:[function(require,module,exports){
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
},{"./_stream_transform":135,"core-util-is":104,"inherits":123}],134:[function(require,module,exports){
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
},{"./_stream_duplex":132,"./internal/streams/BufferList":137,"./internal/streams/destroy":138,"./internal/streams/stream":139,"_process":102,"core-util-is":104,"events":117,"inherits":123,"isarray":140,"process-nextick-args":130,"safe-buffer":147,"string_decoder/":141,"util":100}],135:[function(require,module,exports){
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
},{"./_stream_duplex":132,"core-util-is":104,"inherits":123}],136:[function(require,module,exports){
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
},{"./_stream_duplex":132,"./internal/streams/destroy":138,"./internal/streams/stream":139,"_process":102,"core-util-is":104,"inherits":123,"process-nextick-args":130,"safe-buffer":147,"util-deprecate":159}],137:[function(require,module,exports){
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
},{"safe-buffer":147}],138:[function(require,module,exports){
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
},{"process-nextick-args":130}],139:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":117}],140:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],141:[function(require,module,exports){
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
},{"safe-buffer":147}],142:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":143}],143:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":132,"./lib/_stream_passthrough.js":133,"./lib/_stream_readable.js":134,"./lib/_stream_transform.js":135,"./lib/_stream_writable.js":136}],144:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":143}],145:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":136}],146:[function(require,module,exports){
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
},{"_process":102,"through":158}],147:[function(require,module,exports){
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

},{"buffer":103}],148:[function(require,module,exports){
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

},{"events":117,"inherits":123,"readable-stream/duplex.js":131,"readable-stream/passthrough.js":142,"readable-stream/readable.js":143,"readable-stream/transform.js":144,"readable-stream/writable.js":145}],149:[function(require,module,exports){
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

},{"es-abstract/es5":110,"function-bind":120}],150:[function(require,module,exports){
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

},{"./implementation":149,"./polyfill":151,"./shim":152,"define-properties":108,"function-bind":120}],151:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":149}],152:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":151,"define-properties":108}],153:[function(require,module,exports){
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
},{"./lib/default_stream":154,"./lib/results":156,"./lib/test":157,"_process":102,"defined":109,"through":158}],154:[function(require,module,exports){
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
},{"_process":102,"fs":101,"through":158}],155:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":102}],156:[function(require,module,exports){
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
},{"_process":102,"events":117,"function-bind":120,"has":121,"inherits":123,"object-inspect":126,"resumer":146,"through":158}],157:[function(require,module,exports){
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
},{"./next_tick":155,"deep-equal":105,"defined":109,"events":117,"has":121,"inherits":123,"path":129,"string.prototype.trim":150}],158:[function(require,module,exports){
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
},{"_process":102,"stream":148}],159:[function(require,module,exports){
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
},{}]},{},[25,26,27]);
