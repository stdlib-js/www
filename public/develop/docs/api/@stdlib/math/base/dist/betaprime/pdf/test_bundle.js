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

},{"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":52}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":130}],14:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":132}],18:[function(require,module,exports){
'use strict';

// MODULES //

var betaln = require( '@stdlib/math/base/special/betaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) for a beta prime distribution with first shape parameter `alpha` and second shape parameter `beta`
*
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.5, 0.5 );
*
* var y = logpdf( 0.8 );
* // returns ~-1.62
*
* y = logpdf( 0.3 );
* // returns ~-0.805
*/
function factory( alpha, beta ) {
	var betalnAB;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	betalnAB = betaln( alpha, beta );
	return pdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for a beta prime distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated natural logarithm of the PDF
	*
	* @example
	* var y = logpdf( 0.3 );
	* // returns <number>
	*/
	function pdf( x ) {
		var out;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			// Support of the BetaPrime distribution: (0,∞)
			return NINF;
		}
		out = ( alpha-1.0 ) * ln( x );
		out -= ( alpha+beta ) * log1p( x );
		out -= betalnAB;
		return out;
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":21,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betaln":37,"@stdlib/math/base/special/ln":61,"@stdlib/math/base/special/log1p":63,"@stdlib/math/constants/float64-ninf":130}],19:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the probability density function (logPDF) for a beta prime distribution.
*
* @module @stdlib/math/base/dist/betaprime/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dist/betaprime/logpdf' );
*
* var y = logpdf( 0.5, 1.0, 1.0 );
* // returns ~-0.811
*
* y = logpdf( 0.5, 2.0, 4.0 );
* // returns ~-0.13
*
* @example
* var factory = require( '@stdlib/math/base/dist/betaprime/logpdf' );
*
* var logpdf = factory( 0.5, 0.5 );
*
* var y = logpdf( 0.8 );
* // returns ~-0.228
*
* y = logpdf( 0.3 );
* // returns ~-0.364
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":18,"./logpdf.js":20,"@stdlib/utils/define-read-only-property":136}],20:[function(require,module,exports){
'use strict';

// MODULES //

var betaln = require( '@stdlib/math/base/special/betaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a beta prime distribution with first shape parameter `alpha` and second shape parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 0.5, 1.0, 1.0 );
* // returns ~-0.811
* @example
* var y = logpdf( 0.5, 2.0, 4.0 );
* // returns ~-0.13
* @example
* var y = logpdf( 0.2, 2.0, 2.0 );
* // returns ~-0.547
* @example
* var y = logpdf( 0.8, 4.0, 4.0 );
* // returns ~-0.43
* @example
* var y = logpdf( -0.5, 4.0, 2.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var y = logpdf( 0.5, -1.0, 0.5 );
* // returns NaN
* @example
* var y = logpdf( 0.5, 0.5, -1.0 );
* // returns NaN
* @example
* var y = logpdf( NaN, 1.0, 1.0 );
* // returns NaN
* @example
* var y = logpdf( 0.5, NaN, 1.0 );
* // returns NaN
* @example
* var y = logpdf( 0.5, 1.0, NaN );
* // returns NaN
*/
function logpdf( x, alpha, beta ) {
	var out;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		// Support of the BetaPrime distribution: (0,∞)
		return NINF;
	}
	out = ( alpha-1.0 ) * ln( x );
	out -= ( alpha+beta ) * log1p( x );
	out -= betaln( alpha, beta );
	return out;
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betaln":37,"@stdlib/math/base/special/ln":61,"@stdlib/math/base/special/log1p":63,"@stdlib/math/constants/float64-ninf":130}],21:[function(require,module,exports){
'use strict';

/**
* Evaluates the natural logarithm of the probability density function for an invalid beta prime distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = logpdf( 0.3 );
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

var logpdfFactory = require( '@stdlib/math/base/dist/betaprime/logpdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a beta prime distribution with first shape parameter `alpha` and second shape parameter `beta`.
*
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 0.5, 0.5 );
*
* var y = pdf( 0.8 );
* // returns ~0.198
*
* y = pdf( 0.3 );
* // returns ~0.447
*/
function factory( alpha, beta ) {
	var logpdf;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	logpdf = logpdfFactory( alpha, beta );
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a beta prime distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 0.3 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return exp( logpdf( x ) );
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/betaprime/logpdf":19,"@stdlib/math/base/special/exp":50}],23:[function(require,module,exports){
'use strict';

/**
* Evaluate the probability density function (PDF) for a beta prime distribution.
*
* @module @stdlib/math/base/dist/betaprime/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/betaprime/pdf' );
*
* var y = pdf( 0.5, 1.0, 1.0 );
* // returns ~0.444
*
* y = pdf( 0.5, 2.0, 4.0 );
* // returns ~0.878
*
* @example
* var factory = require( '@stdlib/math/base/dist/betaprime/pdf' ).factory;
*
* var pdf = factory( 0.5, 0.5 );
*
* var y = pdf( 0.8 );
* // returns ~0.198
*
* y = pdf( 0.3 );
* // returns ~0.447
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":22,"./pdf.js":25,"@stdlib/utils/define-read-only-property":136}],24:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function for an invalid beta prime distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = pdf( 0.3 );
* // returns NaN
*/
function pdf() {
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{}],25:[function(require,module,exports){
'use strict';

// MODULES //

var logpdf = require( '@stdlib/math/base/dist/betaprime/logpdf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a beta prime distribution with first shape parameter `alpha` and second shape parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 0.5, 1.0, 1.0 );
* // returns ~0.444
* @example
* var y = pdf( 0.5, 2.0, 4.0 );
* // returns ~0.878
* @example
* var y = pdf( 0.2, 2.0, 2.0 );
* // returns ~0.579
* @example
* var y = pdf( 0.8, 4.0, 4.0 );
* // returns ~0.65
* @example
* var y = pdf( -0.5, 4.0, 2.0 );
* // returns 0.0
* @example
* var y = pdf( 0.5, -1.0, 0.5 );
* // returns NaN
* @example
* var y = pdf( 0.5, 0.5, -1.0 );
* // returns NaN
* @example
* var y = pdf( NaN, 1.0, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.5, NaN, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.5, 1.0, NaN );
* // returns NaN
*/
function pdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	return exp( logpdf( x, alpha, beta ) );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/betaprime/logpdf":19,"@stdlib/math/base/special/exp":50}],26:[function(require,module,exports){
module.exports={"expected":[0.15626139802162328,2.0317480868571103,1.4843393255094628,0.0019205473994157519,1.5902217626721726,8.974073358579706e-35,0.006381527872797359,1.4120638740044722,1.0269826589026856e-14,0.006058479173691855,1.1224524389784183e-10,1.2195788429415022,1.9306053066767912,0.9417785168063215,0.5963883187973981,0.6237197348128786,1.460081876188768,8.800312242324297e-7,0.024895357918292168,6.896497071492255e-9,0.6638802148305206,8.991953460828744e-5,0.016785662040762955,1.485873475301187e-16,1.4646573513425074,2.7564520617794327e-24,1.9786903127539415e-10,0.08181566178479238,4.555432908596927e-6,2.6588849748930593e-8,2.5583325390741943e-16,0.2516249877937701,0.9203718947888775,0.03362190979634593,1.9244316751990167,0.47346772214467464,0.013878346109110394,0.013865450905509748,0.3159105957824131,1.1685662848779203e-14,1.5229340120616466,1.875506924273823,0.010185470433611387,2.607727115757888,0.00042605636089963913,0.010024657079019932,0.01998065358809816,0.05294452942738227,0.008833831893605528,0.00012098636642218583,1.8400729744214987e-17,1.493375417093845e-22,0.98556319532877,0.2957945971701067,3.812222307417346e-5,1.044132386160226,0.0009434287208497697,1.540603602021514e-6,0.08523363245498387,8.47969247471061e-7,0.040645003932193384,1.6178643470493936,0.004068208817093759,1.79123240131809e-7,1.4896350533399732e-14,2.6780518814023063e-11,0.5535258152938026,0.033181134486899834,1.5100619524446173,1.3259677806028958,0.051819853270718544,0.0005403961736294434,0.00030167523245065486,0.000630141258055163,0.4663390954701502,5.99549874156762e-24,0.31904236145471454,0.8617221031192942,1.1537395564344155,5.571663839022537e-7,0.4146745117121953,1.9513057565632004,0.42672211744657346,0.08198528985992012,7.020263339880665e-25,5.552056313951899e-7,1.1216568353879463e-26,1.1386795369394287,1.1117134230678794e-16,0.35255569712587964,1.5778101541114545e-7,0.004515046952728393,1.3755637989735874,0.02437599163111625,0.04121191601311386,0.6224600201578914,0.006054296442682482,2.605431307812718,9.921296346410575e-7,0.8906943424412339,1.0186079489396835,0.48632807123909455,0.38228296295894426,1.4534700906599909,0.01821415250939326,0.0012802638679598791,0.9457114110774947,0.24079555002747047,6.421069486217709e-6,4.294193327466706e-18,5.0873805774225416e-18,4.91822918978258e-13,0.007554835297741137,1.8744645247050476e-41,0.15063263619051184,8.919422387285467e-8,0.0001148236983135118,5.941924227052096e-9,1.4212162626019702,0.3768619475516296,2.166921797219366e-5,0.013551958916880663,0.0065552241779348085,5.591647001379925e-5,0.4742940474741525,2.3005704218501863,1.538631768154333,1.1136258976448297,0.09770715644564684,1.908000216156128,1.0511198587922774,0.0010963551755880816,0.08273894319482825,1.1158995866243038,0.01074015090329708,1.208850439449326e-5,1.1599357342291242e-8,0.0022110211131730227,2.669623205552805e-9,0.46626096102909026,1.3458086447217537,0.02954513353366337,0.060958261575807325,1.5348933410052807,1.3141976676809684,0.001847694340955395,9.853742809333011e-7,0.6317597543941447,0.0034764736486932947,0.0011744892877503755,1.6943750912455506,1.328023939846922,0.008007376947162248,1.013730346168463,1.331445503461977,0.9683422941809111,0.34320942849229535,1.5891454131727465,5.39696726397334e-6,0.019280143044874982,0.32202505345008725,1.9730878920811536e-16,1.3052916807061787e-14,1.6505047172807006e-15,0.07660694367167806,1.0209403804429643e-16,0.0020605131692998033,0.025693633486761475,0.00018858811061715853,0.37344700723371826,1.5958636111195152,0.8624206849668461,0.06162529617112756,1.676223894876604e-10,0.9195267152586862,2.383747985748867e-21,2.9397884831436086e-19,1.1284107006854596,0.5501194456947396,0.14853742015961618,1.2592583795540175,1.2580295001556645,6.1180144806677066e-37,1.707404983679992,0.441253957639198,1.056649782457674e-14,3.8122413142420253e-13,1.7848744591575623,1.1207673435678627,4.1851625891420095e-36,0.008721828882835894,1.7124285986954082e-6,0.0004359875261160988,0.0031108655767939563,1.4951456593979422,1.9729527232494484,0.6704582383580453,8.250276576844217e-41,1.484236133429447,0.0007936837575908053,0.0042469750989010515,1.7294506338981925,1.2510079395737677,0.2660078451331668,0.00012654812753999108,0.45913384818525094,3.7011046319067713e-7,0.38453354843608345,0.24477233701115758,0.06160729667032898,1.4746957018744693,0.0020397561033596795,2.2429384435433835,0.48027706278090826,0.7864615072163876,0.316274102727434,1.2607180216930484e-16,0.00016167023577679277,0.9183420569056147,1.3849940399656047,1.1816090560700838,1.1272084674437754e-19,0.9664663135107701,0.012880097156616295,1.4420588102949967,4.400249682325576e-24,1.6578788742191548,1.6208019170842412,1.8462855122586798e-10,1.1749196525501802,1.9018059032262338e-5,0.293918900887556,1.1712468548612063,2.7077702122743474,0.020238512330396523,1.1346012480915946,1.5061659785431154e-15,1.7507883586855144,1.1566216151993167,1.6366424369292911,0.5043071390144424,1.9668233107056738e-12,2.8376542006589632e-5,0.0066449939355805315,1.8067995915443968,2.652414619785591e-6,7.550009699356287e-12,0.2737667796657852,1.2489235303186007e-5,0.3762565494153799,0.0007556552090907063,0.1989306668167782,0.04458375119419537,1.3251997995346763,1.1704892526358401,0.7181738402346508,0.337443034413221,1.2742597433212177,1.2018000871502228,0.5456756995498544,0.3128296473476143,1.123274806539276,0.29236561739142786,0.0019892441454948838,2.060651098100603e-6,1.3116156154626606,1.278681225887442,6.3013362823182105e-9,0.6319326443708143,1.0620315765324877,1.8091896343017454e-6,0.5259485611617911,2.090068174802174e-11,1.2565274768736865,2.9488042882675676e-11,0.46237758601189793,0.26932525286132225,4.819001866073508e-16,1.0578284486955813e-29,0.7486636800294657,6.985299078832552e-8,0.0037327548829152613,0.0025995739805388554,1.2976067092776724,0.024809049498680423,0.07111867701881967,1.02924545953751e-6,3.7975301166525997e-29,0.02348321745318762,0.20424542702951137,0.004811328833010083,1.0785087801845612,1.0558183757262622,1.0025416686554838e-19,0.12789536009555139,0.006739955795084574,0.34967623159779443,0.48187707412008546,0.00010140190508273197,3.933535512697352e-5,8.616662197230534e-6,6.453739677366459e-6,9.8022981296152e-7,0.0006052963792320649,1.6208826450832479,1.1411899280255404,1.1172005843083534e-7,2.3058311628382956e-32,1.0061382737830913,2.4308226780128003e-6,1.332947012063249,1.551096872267577,0.15238080914507018,2.8743290306570844e-7,0.9531156565268979,1.2836419689094076,0.30519855191494155,2.4572231731158074e-13,1.1933262019577806,0.0011681322862682328,1.4822793287013436,0.6206357827441591,2.3078964331676137,0.006303151770136196,0.0005193171204551059,1.3589408362523834,1.074087199172274,0.26591454924277746,0.018172452757253425,0.4513561291152792,1.2224007950037472,4.381291801983856e-8,0.6420275728237514,1.4194720961383076,2.0146092413418673e-6,0.45269896670678056,0.27932696161596726,4.291395965760004e-8,0.00010131498535366537,0.08568940172068006,0.0008230117007932867,3.117129271546382e-9,1.383900246564056e-20,0.1828442160958884,0.00025046521812803946,0.006047658299263967,1.487352992962988,0.9337367119872937,0.7461907044766265,0.0007115093720447091,0.3372205911335353,0.00014374915978013753,1.9820737023137812e-5,0.07460926464818331,1.4155876293796346,0.06958938674496912,0.061742652525196826,0.9846491614139792,1.3976721092480748,1.028216693886562e-9,1.991996901521609,2.0457090574407766,2.5998842288006375e-8,1.0461916473516415,0.0420121208833325,0.9511092288973151,9.476431719068406e-10,5.4160607241353904e-14,1.3521121754833865,1.2611812714157755,0.4635278166336666,0.0005988538068503865,8.867307168646756e-7,8.297306401521082e-6,0.4690693693448165,0.00010486732394244719,0.4484575005675239,0.12320000624641245,3.836079661578614e-13,1.4879187088608594,1.6794594418418674,0.3427192587978092,0.5312017753783751,0.11154300857530636,0.010077617788307517,1.3353195170968575,0.823270168722138,0.30119956377021606,0.2617819687521264,0.7118514638477496,1.2375180887519635,9.312807904441383e-7,0.03042266877862627,0.0006402698346974578,0.575069185146198,1.5667001803679307e-9,1.0641813178471815,1.744323057553548,7.1430164577815615e-6,2.6864447031427693e-11,0.011878685677192406,2.43853270521443e-8,0.0009845674074268399,0.41333006732364136,0.0021584404715437344,3.187908779646894e-6,1.0091215544250134,0.629384640994328,1.580140296652725,1.0945175548360526,2.9141855222025377e-15,0.24992977527706203,3.946241418877089e-5,0.017879920458184817,7.490630304498852e-9,2.2437886193497317e-15,1.014392042288825,1.8045797284546492e-6,6.048582656689774e-7,0.01476300210563734,0.2812857824058531,0.001513534238689545,0.140825255960141,1.1154500461128787,0.026192844866105146,1.255769475916713,1.510934257048646e-17,1.322272287758171,0.6036963039129789,2.6863116028851977e-6,7.990764522480789e-11,8.111007321319038e-26,1.9397758960049847,0.08915294527654538,0.08023366790141928,2.329837494211885,3.0452384664780493e-12,0.01123451364249924,1.4352152782849164e-10,0.002607588127597335,0.07780508190672175,6.311035541327402e-5,1.814072454371394e-9,0.00029545094082309684,1.3049112551304665,0.02879969524446508,1.9482188472940396,2.800011518166961e-12,0.8064575669036214,0.1259151392139817,0.06098928236181485,0.41619060724060836,0.9115766067762432,1.1930729730921015,1.102704594396451,1.5336730273226356,0.5017772505409329,0.01299648798276503,0.42719600429088034,1.2694177563618059,8.270084098343258e-21,0.0039624398760555275,0.7480051210038536,0.6551910239168492,0.5913031048433508,0.00791661218835793,4.9285325470941566e-5,0.6308729850811265,1.0275096215649135,0.20754873886157552,6.801160715945365e-20,0.2017812148496215,0.08582096996540167,4.3221873022457925e-14,4.323969489199044e-11,0.5559706020554295,1.8626337811884722e-28,8.255916282799526e-5,0.19812739548919933,0.41411104837862356,2.7470199335043173,1.2195824803984863e-10,1.0891093047065754,1.4655020344709424,1.8021646484760478,9.56973722915274e-14,0.8620736084612317,2.010442095431005,0.8219905306146356,5.945583270002825e-40,0.09075585154817008,0.010020863263000244,0.23487729147396574,1.532115429018888,0.5380832870658474,0.023711073139672086,0.6970600073159819,1.356253636874941e-6,1.2171446019157681,1.6374376526898252e-14,2.4216910813124945e-14,1.2071261024873539,0.9538481772491694,0.6809951391274638,1.109711002635185,1.1552536824758176e-18,2.670548135823264e-8,2.8539659431119965e-5,0.06235283893650479,0.007698987781799342,0.36375491435135454,0.05534657911690023,1.8113315312766538,1.1908584251835443,5.068538245635135e-6,2.0633872614118567,0.3040471257062062,2.050363709022563e-5,0.4550066655604411,0.5642840394850477,6.7905707985805604e-9,3.7991896784039604e-8,0.4985793038550613,1.0106049091341376,0.21733547350158205,1.3747912937317195e-8,0.23588538698156622,1.135074430243914,2.4318939226185607,1.2393809086929061e-6,1.0339981954952562,6.928360725783775e-20,0.034830615023888685,0.6296254366336896,0.1404456890830716,0.0003525571635261495,1.1108995170144997,2.7433187555267593,0.6073024216502277,1.5873507439256884,2.305654825039366,1.589948263457067,5.392378830101743e-15,1.7049677808391221,0.0001066154902471024,0.05804740776422637,9.051130870796425e-10,0.8608343407624937,0.9995826287654982,1.7121982946491103,0.14912044984776807,0.04725281792761368,1.7084066488828613,0.009410891671038674,1.2336431541066142e-22,0.05044881579150905,0.013362634810678165,1.58311291165003,0.0010424920313823853,0.5008279626934568,0.6500313497084208,0.03137971399821246,1.4967473676131156,5.25936467060022e-11,1.0443004443584828e-6,9.66187290602948e-9,1.3742859948423098,2.1404957014272474,0.41815578345512455,0.022457501293400142,1.060327354513244,0.0007621930479761875,8.173819409025326e-5,0.6930058508403276,0.3316272512243853,3.39780074713025e-23,0.9246347226052637,1.162721640897558,2.2243190474236796,0.01184431842708862,4.94091264126707e-10,0.06419877806210947,0.1664483474454025,1.893165131029754,0.06485307123108723,0.04962198569365061,1.0824240907921523e-5,1.345661002983722,1.0641427518254667,0.0003628978015296615,1.3630662368668354e-6,0.10439843224130436,1.2063844859692896,1.240717118476585,1.6951589735692336,1.0017934231420675,0.8840339208735764,0.8603454986805283,2.404322215702631,1.3208280822004035e-8,2.082767938080467e-6,0.7359642768020667,1.4457215462436195,0.0012409039441872028,0.0012974998031737503,0.001257872703468134,1.8789208158021742,1.4397298016292501,1.4225277637631739e-18,1.706796161881795,4.4501346009903695e-8,0.06310715633433733,0.32751022905611893,0.25109559299947426,0.0001350233491636043,1.03554565946087,0.17233616900002963,1.7255158723086743,0.007692770502226428,1.3740815601934802e-9,0.8134763381680413,0.08670881022007118,0.2675540020940983,1.0793327954987597,0.013057448173931119,3.1165668954138056e-8,1.5911783969420605e-14,1.3499192915220455,0.21427174003107174,1.8310810896498795e-6,0.6992478714830698,0.001073217317297951,4.3804346127196374e-8,0.0013632394573506819,1.1598570239901804,2.5929349030623996,0.047573169033278344,0.3704774387453742,2.061198804144585,1.548864385052868e-8,0.680974162576854,1.3478265467160968,3.4195492394450055e-11,0.20689359326734194,0.7262255396628157,1.8262629934479828,1.3518471275728258e-8,1.2078403779796556,1.2839814600736184,1.134554298291837,0.037479965256792036,2.0286490713089367,0.007036940997059772,4.253444208653187e-5,0.6193426257789605,0.2106784749190564,0.001017170060918593,7.75273953104261e-9,1.1974519208270782,5.3393513563637426e-5,0.021449869187830498,2.2340997253202615e-16,2.044853356670621e-11,0.9382544662289677,1.3095590093852993,1.4023494844705346,1.9490058056859514,0.7602442279946925,0.000954855753592003,0.0015788210072941796,0.0584919075542556,0.5053383860137556,7.56343054687859e-7,0.02522375593970095,0.27421194959784156,0.9040668833748653,0.913540946111308,2.202349041921943,0.0012382881754143403,0.08598675821349372,0.3307658344935555,1.9511325742032144,0.7298293041606648,5.5145722529655546e-5,0.3908691446750544,0.05393224358873984,0.03679746959250281,0.30537188534851206,0.0032138322620373916,7.922754125268507e-23,0.32676382393694,2.647276998509709,0.003941532144215228,1.4499332077460085,1.2661319361026724,2.1359653633607636e-8,8.946727531318392e-8,0.811002488627369,0.21665627733263434,0.05449910325458994,0.0070001504125105415,0.7265165307462391,0.0002220861725213369,2.091678624038487,6.308183220450844e-6,6.974825086068448e-6,0.49590306561839936,1.1138236717622423,2.1620299587132758e-17,1.0117306548340932,0.7144543046519587,2.0178945419688277,0.00035825598864421665,0.01837470622346494,6.032112638829292e-6,0.903610062956556,0.39606444046032396,0.007120386574694497,3.052992579567524e-5,1.5623545020122493,0.1681543832967452,0.024918158885874963,0.00215210505216745,2.348342139966475e-9,2.366653508700119e-5,4.4899592658718933e-5,0.37942625204975905,2.970819744339308e-5,0.9127130219888926,0.39591205770605775,1.2156369150211813e-24,0.0005496534807245363,0.49828692465989105,0.22719397228758195,2.7983439554763287e-9,1.1959674817723216,0.1918677329825753,0.24765525828852433,0.8540988901642268,0.002461441926475721,0.00012919535610562304,0.35184613994298247,0.11946831203784224,5.278579546230304e-9,1.4830176411694573,1.5083628051942436e-28,1.6320095553956973,0.0929770334059282,1.1296956913579842e-7,0.25807210646431067,0.15586954254905652,1.0622409949228706,1.1723103844900737,2.2689782042748662e-12,1.257084203996081e-12,2.3681149160756545e-15,5.637123843502056e-6,1.3246855459675693e-35,1.3236458610949202,1.3675719054108277,0.022020243109358146,0.01190000144172181,1.2789470723413454,0.9880460476867776,1.3232592236551435,1.120780142352966,1.5807327392624368,0.09705167886217457,1.037937621544022,9.211259508068931e-7,7.108387782671225e-10,0.004352642359234448,0.4594534195123319,0.7544269904479216,9.101990410926056e-7,0.009155189408640926,0.658458391805012,1.5428400653127476,1.3655778821111244,1.7275924234880198,1.3349006716384335,1.5088531517002626,1.2877413825516073,1.265377760810475,2.3511839049473643e-8,0.047897667341620445,0.03926337448246614,2.675741360934207e-5,1.0317034168705828,0.566620025913599,1.1165839617824844,0.2315878128315848,0.0032461389282396206,0.00023053157150590626,6.090807120560874e-8,0.023945970263493842,1.63718329056717e-23,1.1893498341546584,0.9057055231297713,0.001986304943027452,0.10493411159498704,0.916406563665749,2.1575307609260572,9.477656206080132e-14,0.046812280771356386,1.8688916042753718,4.532039713836704e-6,0.002982992898613689,1.3393477300900832e-12,0.8614319241672601,0.4981035298002945,0.11708838601144311,9.621009096601115e-7,1.372341518411229,1.910609136583193e-23,0.0006720201307609401,0.0002716884420382246,1.438996533340439,0.3015229437443499,0.08978789852144206,0.17323614912721613,0.6342577462099177,0.19441672966335188,5.216027459563222e-13,0.30543066581088146,3.094225542746833e-7,0.00037096876688549755,0.4243206780169235,3.5101020379666163e-11,0.000943872928022898,2.3755334122200543e-13,0.05945280804388085,0.14553894133468084,1.7481935054889168e-6,0.17686936598356812,2.03610526667289,1.1315455092759144,1.0766226986409366e-7,1.1298162142228247e-8,3.1860056206211133e-6,1.1244862555157358,3.737962067938687e-9,1.8384096252478215,2.4209226082753132,1.441113918432454,0.8415014743213316,0.30276879786154715,6.267850927598499e-6,0.472912563052569,1.9527860845506797,0.07501217758223372,0.03805501519385596,1.3984053763596673,0.8613431648165824,3.09720588824529e-24,0.10230325545308534,1.5039952477515846,1.4108979589889818,0.001928404576140215,1.3328623889766011,0.012651959953556903,0.9012497790155239,1.091802649597289,0.06915383510029563,0.015839492305916903,0.45140815991444133,0.020457065352021297,0.16197007540658165,0.343017032253919,0.06977713092843536,0.0010083141225908723,0.629407541869887,0.02472577417912432,0.05314823521309071,3.425917753501657e-5,0.00010515934072001366,0.41754135591049213,1.4603914829165965,0.003915716244550695,2.8436537071951758e-5,1.1201475710905342,1.4859092018323692,6.542687539155049e-5,1.6291841667407903e-16,0.29055449002672007,4.0983139370477804e-10,0.002376203139459201,1.3724360308521866,1.4294639024261655,0.022372010550758235,0.0005668776622692043,1.2153083111061357e-52,1.3704361771760456,0.004535138238444268,0.0007364021059221409,2.8532482074977484e-12,1.7639003814510898,0.8687344224821845,0.019621036451410737,0.0005881765681513063,1.5457644122997773e-13,2.0847057921685655e-6,6.447210523278043e-5,1.753818016909954,1.1124849212235473,1.371287371837066,0.09166182117989366,1.239283828499323,1.8677341539372283,2.7202573378227437e-5,0.11810241682274988,1.1848925090665216e-12,1.6763385399116608,1.0331623685921572,0.0038299744275612857,7.456645378402612e-8,0.008458896325921943,0.029479818397371023,0.10774125068573784,5.503042621650386e-11,0.000302703676042661,1.333698200741385e-6,1.1319905129426429,0.3300372020270579,0.5884069641360927,0.4771779474389785,0.002623852455004942,0.024848211755873126,0.004567764261119113,1.6133677402400597,2.9358119610950612e-5,1.415598213521766e-38,0.6552909226660412,0.10471253662676565,1.0376125926707465,0.0005628161532733042,2.0179871304299244,0.9715796441974278,1.1696814138142106,1.1246711372847624,0.008287504061537481,0.5429883674901085,1.683746406466762,1.5244984636901793,0.3894734698817568,0.7741847501769263,0.03307495797925594,0.01142716473699922,0.13725129878419032,0.3024722589459017,0.5804257234631098,0.0019658967624376126,0.9347646437928235,1.3952650424730737,0.02469012352146857,0.0007927862808044977,0.02999323384877986,8.288867567078997e-12,0.006612471940261518,0.007322935564301377,2.0357512631574446,3.632690114937693e-9,0.4161234369310465,0.0019427621157396772,2.6589867171100907e-25,2.1188821231039538e-12,2.3364493018925714,2.0441753658177864,8.098694383678437e-20,5.349270242631379e-7,0.006056646371516282,1.012124495238365e-9,2.225127498130025,0.1471716487688905,0.1600105222135527,0.40353418428587406,1.8454378014271756e-16,0.7501344800963072,0.0001643746016439288,0.3184002606009152,0.007673519099624321,3.049977736091602e-18,2.461524586749367e-20,0.050177084537575564,0.09849465512892941,0.9494440996952299,2.7176428926233144e-7,3.738036109496977e-14,0.0004451996343153254,1.5736402120274817,0.3531801636669139,0.0910793832085472,3.071983736227945e-7,0.05848925053586011,5.1048420450609856e-26,2.482778857778972,1.0406600443761356,0.0001320133432161776,0.3587648566955116,2.5566548238651344e-5],"alpha":[10.378694716218156,12.496600982300974,25.640368169461315,18.963244577152096,17.67293098275999,19.042470783852593,11.986746749212308,25.480753580678503,21.01957005576896,20.220308141143665,28.923126248904975,17.32400281155848,18.68258136222557,10.66319864839723,14.933269259590487,16.136768592870236,24.61668698861125,27.96868166243094,26.411846983933863,13.230735074509216,18.087795756592055,27.850645841596435,14.014808491026432,26.51145689778722,22.32815082860999,22.049742044250333,16.631112125524975,15.88663159689839,12.487888858119902,28.890142768883287,20.44415368209332,21.52991461797229,10.545272376390402,28.578476256758126,14.376689598624868,28.770226340868522,17.255247336799226,14.614089671172326,19.58338176952458,19.11277769094226,18.182133447736057,12.403567777167002,16.383304910882707,12.396815725419813,16.33572313400062,25.33085936798894,26.455436194718025,27.04496527657382,29.038049345793006,29.309068588738853,26.90039764262673,25.570201411106304,17.30703061211129,18.24729304341169,21.804340921838588,17.602843705370983,27.202956710011854,28.378924488629135,12.414626349335641,24.93181514310531,24.67770297829346,28.39481745743459,22.114882845002906,22.30024843262917,16.809963852631086,16.956642805112757,10.234319823310454,15.242897567669157,23.347591813327462,13.478359200740151,19.84164391198048,10.336767011557946,15.869802927899066,27.652673085274788,13.219748692610604,28.391247060217843,11.879047166845055,26.82113622910315,15.615114059705078,26.70918630922001,11.319370933283604,20.395709835939773,11.047885842292073,20.48541554874959,23.95303270649391,26.90894721816848,20.134433409338843,24.052900370813642,26.616524118726517,15.887180324198159,20.067126774854586,29.443858042109767,23.322826546682265,27.375310278201233,11.428469234937753,16.231999755072387,17.726571580229063,12.414121315651725,24.994075360942254,27.301082645954608,16.489788901528726,14.582109829582466,10.09424720195145,16.612695759556907,18.4610197132251,20.615045561208177,12.736388487529599,11.517639360383484,24.398377709106583,28.454489287371956,17.477631152644935,19.573602952884134,19.596023781430283,22.438719092539348,15.846149182238634,23.720288847876525,28.961490217972916,20.429663962541124,19.312445695409775,10.688178265777344,15.160728186124363,18.976610995949525,14.131573468026355,16.50659643903741,24.385798616837153,15.958420421625682,15.158469429386514,25.846093967512196,14.186612790042123,17.04961294973711,21.966569815052924,28.85017788056949,16.653085287055582,19.68359815974345,12.080374951926824,25.804143672510108,16.746417275072666,18.07288684846211,29.07992711380337,16.310309555229637,13.015137307153474,21.82660079598479,18.563130015223265,15.395713411772967,21.190974963428562,20.477711429240564,23.798641304811245,13.472665134554358,13.357097581751077,26.95044071336982,19.504200387735192,20.31291259804486,12.926148405880076,27.818205834933313,20.782586483793402,14.030463690548505,12.282355255964204,10.142502984016053,16.844137143064707,18.165227969523716,28.194596594538773,24.2269736371356,24.328946378776966,20.670897192010123,21.75664373979952,15.627019325125765,25.82936150093463,28.576158096832792,24.443069455521428,18.130351331017284,23.79458114615952,19.8246285406483,17.02279643161638,20.85295087425056,16.06706640456732,27.99391735325625,29.664513572328715,18.356033667104455,11.672938923378325,20.480771102269088,15.80807383367167,10.573582598981307,29.990935513809816,17.605396030124755,27.122835038460202,22.922870202738924,25.596581561035663,18.57618460447513,21.594945573700986,29.570280176358207,13.15632554605818,29.178959280288876,25.57293205790149,20.102419513414873,23.570214659375107,12.038271395578143,21.33973103415775,25.93667898154459,13.543265312276676,19.207316885986007,21.380897530288255,16.37624371396705,10.573707684787736,16.099872152261607,15.230788265494017,17.434276415217692,29.831204317629613,19.404615413031596,15.184417837966802,28.135155954805317,18.480906442686425,29.487095604051376,11.26737652882964,15.903649347098959,20.495075230169412,23.9504981325927,21.77990447751933,22.17536787775304,25.0184763726355,21.821169232697414,14.598104076356302,25.221371704139624,20.52654298503105,25.721334492752458,18.02672129798003,24.676661943829885,19.034931977863128,17.151254955191717,29.55336112225829,23.143089057371547,27.416721696435058,17.713580492178504,23.293666823131353,10.124049336343099,19.664096989585893,12.953786439389638,24.869544413135237,15.841665270635232,11.174779207779588,12.138275737296551,20.672066565585205,12.549876631187953,22.19304244878238,19.9735131614001,12.361503896061187,26.838210924787088,21.67343688155823,14.160693296992841,23.76046606142211,27.05156925647583,20.15638419310802,10.634600080486013,11.903226404398456,10.153302103570097,19.711221760713432,29.697648745477384,24.400316109574852,11.030579167764692,19.715212448723783,10.194279971569586,21.118578403719997,13.86315264198197,10.173344767345768,27.773233242586066,22.891509020846016,18.9271749879265,11.597931991087599,29.989051639269675,22.772776257222436,13.101585933567979,27.523343180185094,18.348170826809525,19.139981707821047,12.75330547244874,17.488962330610548,22.97435581547429,17.707656526849917,28.851696075949555,27.421874216768273,20.32292781451708,25.55059867618741,16.068321177012468,28.38997817120265,20.907048697176336,21.392087132677958,11.486229429064338,10.781824111277531,26.770746019734442,24.485302817800818,18.33779233513483,29.43172846637662,14.13788747981533,18.14328789622396,24.413743238095137,27.16659715898569,29.95100087162389,21.454836606279137,25.771536877946577,27.024732304585015,29.71543459062098,24.735792600942098,26.25089634285862,27.79668292942636,21.598358970238962,26.845028327105126,14.72650298183769,11.481499739753183,26.81303091223488,12.172093572029329,24.617130782732083,19.024417823904365,17.543924170894897,24.186545652144606,25.15426597323402,16.854008514919375,22.070168402966498,20.320442443461914,27.631935371229805,11.483869341359885,29.664054353236185,19.365395788311794,11.035159685209223,10.04186034904945,26.018218561112676,26.281336865212968,13.216999538754415,29.909856980045554,26.69596322735114,23.68808931569186,18.55620367283136,21.00868881082444,15.42607867337789,16.828539109123955,10.314154433675014,23.571842553620797,28.99940604889729,26.522548754590947,23.11418298972521,27.27425766657079,22.54194638096576,25.325508712888585,20.654819827813917,21.095988552802233,19.35971874048071,22.861101115417224,11.851777672921067,20.134278607703916,17.732045321417537,23.88328947791144,20.310047187354638,21.14699190538117,27.64012359179443,11.813682451064818,14.269593157422186,22.79511127325039,25.912551184564943,21.679661995050168,18.60685554925389,10.858350525721878,22.16746830767196,11.703982013836542,11.553353234972024,22.88726442042492,21.07565416789713,25.528139524629903,21.920962171796322,15.869475424697566,29.84754466345975,13.407177459839827,20.009912331605562,19.47401668632932,22.920440206245228,19.858918847805484,16.846374850874458,28.143035942917667,19.039574351155903,27.85515991451007,20.75816331791725,29.935290720423694,23.608449529194132,23.65841409845899,24.236499177422544,15.472121079717303,19.961362385218226,21.916435879927022,20.41121509811147,13.26192681911419,15.954159063567563,19.568469475179256,12.959714481164069,15.788437196190422,16.254318654532295,22.615304947388374,27.130586933429058,12.11544326546142,17.03274171962481,18.55964627277327,20.898672621098427,26.73744375855129,27.338711155103695,27.99075731849513,29.98156574118775,28.43678238980865,18.53898709781259,14.381352622904831,16.279368274858882,15.673053950336207,19.10311216774759,10.919676132227561,16.91901301001939,13.671616138888538,15.269687565911777,21.058611721243118,14.218673780230255,17.422451664183548,24.681261096026116,16.501309712804996,18.933378808999283,18.02151191442945,11.77144402703496,25.125827284576477,26.34927725404248,17.566463754510785,13.524581902003238,13.665146032751817,19.004736170493718,13.846793068155815,26.159966449700633,25.22592205081128,28.891379844088178,25.64951446843413,18.4471224118515,18.496906839253278,26.121037747828556,19.53401392243351,13.858241083564312,21.329024353840698,25.948901958207845,12.3141250360593,19.9817085976616,22.768574225259208,18.065611782231727,14.976147742148855,13.052224194834054,21.035701870226127,15.666743975773247,13.298996927677575,21.309290209249458,19.583658121444564,15.727230358866473,18.186438463813946,16.906068779995156,10.922464760768031,15.68215479067264,17.58498570703031,14.368233448765434,13.05388756851626,23.857557299894864,13.459466947699074,20.064192040905876,27.25538661976254,29.98105248800559,13.632615693478748,10.815116497912474,14.419245533462096,25.000347025682043,26.81679824413598,11.944494570075017,18.48562453119575,20.738674347620094,26.862391676437156,15.598580579346262,21.911073028539082,20.39964699093491,10.50398210934491,21.63267033722438,24.979721394206962,18.285820615076034,27.038784936108748,17.861063422859505,11.54195707337382,24.121415325237145,25.71247803621466,21.06243030610928,10.80908106392597,29.952394151394618,11.710862997346387,11.08613917079472,21.25185476266337,29.067964841734053,28.028832742351263,29.576219147089503,13.868642192397633,14.350221678714036,12.082572383359217,22.25652879184939,13.591330105075855,24.745207488624942,16.56317309744277,15.030892229376303,29.64988807838898,22.515779761052535,15.9009541053996,24.664946672614878,24.279409946470953,27.65754492032816,28.67200331785126,24.967143895089805,23.944266419616,11.720479386114633,12.936436180038253,21.222844238486704,19.34888975556916,17.383266948868176,25.811497183827402,16.00697873253502,19.172235971421713,19.200180334404628,29.66351038445811,25.101379201211,18.534771461250372,29.86257343280361,13.339621150981472,17.05263614283463,12.228030043299976,19.595341878267767,29.105311198804984,12.730210076410273,14.601628102454027,16.300683810031288,10.33928650148015,20.14659392263514,24.781109465090378,23.524184910496867,15.759773787704754,19.710719830711,12.560257324292103,12.007585396098523,19.770571526367085,15.647850653346037,14.828379036751578,13.625048183053696,29.84016775188225,19.63614836571874,24.395504860783532,21.356397185454487,18.421643467423575,13.968405867068974,12.457075652400619,14.898169309078613,17.017300338987344,26.855557220218778,17.9228717665137,11.508319794684692,29.359874247516387,18.838961951093076,17.063584098123854,19.302480967199912,14.010677337100352,14.12381415736984,20.39439112461593,17.575788331689168,12.018463169522185,12.020636353968616,26.92851438220968,12.484244114003582,10.293565174969853,10.80672962032648,11.032306205505575,22.3582685090153,19.869318577851182,26.99190464712966,20.60047735916443,15.253214391902219,20.803305214259563,14.553407431245414,10.6092571047404,18.884921676232565,14.655841932575374,29.162715336307695,23.230886856365373,13.93054634741025,12.612048543853005,18.267979726419156,22.808314421023717,26.052607290385012,21.244582145561147,19.933758241614676,12.68394701557741,19.26164952291967,19.679527271783705,13.506771898421782,15.059174541935501,14.888660829176814,16.337050610863315,10.356517784393372,21.068657982949773,10.992018669983388,12.579150123769214,21.971556311554004,21.50863711859443,14.328004024976835,12.142073693386566,10.36445111951728,11.218733570333494,29.998018948441867,11.67039773788356,17.102704118957497,24.750308383766043,13.783588452163196,26.750972753582868,16.81326863344689,18.97182714636584,27.49485581627621,18.667762577783996,20.29459381153424,24.728463497761016,23.937038925277715,29.66667997915566,18.85544986089888,19.701352300313744,10.647384138747826,12.243068935884835,23.62115698262609,16.347905467550603,24.1572251643976,16.152771691102927,10.649477599983399,18.380677079940526,20.77121738254519,11.484719384732749,27.30590229693153,27.40129666182469,29.00916099824077,11.057788045428829,14.307780184458604,23.067105051620068,11.550361647187518,16.75273659059821,20.06670125611396,21.65678840689139,14.469116934180736,16.044638930967665,13.640118996749724,12.61295650930026,16.92005368361699,10.947547760319946,16.98574888494435,18.68440618365713,18.609491324331103,11.632231666499182,17.053969463418714,11.953511795405412,29.55478194128277,15.152667004483273,11.599279311589576,27.31945346574685,28.228563577585422,22.442686021824446,18.948048379931166,28.29869249995894,26.523176633005757,29.478714734900258,12.15695098328258,21.91905149277524,16.684505855199546,17.702649696026036,10.11192971196099,25.208311202794643,29.288343778074925,10.100523616326846,14.11781560412642,26.7826106184288,26.032271095695748,10.777046300527907,14.900492331202756,28.12704387088568,12.292992244634767,25.70041869840319,12.12030322488673,13.333879883980341,12.278539241752364,14.29803563391873,29.600245453906155,22.024873965715244,22.81385453694551,22.86599998072807,27.64256658364525,29.944343570125547,29.48040245088182,27.226738323296967,10.217339308510569,24.059893909721445,28.851143824826227,20.040711329503686,18.002534776319578,15.40890840552323,12.011126966522184,10.714684305711462,27.32157230352813,27.52330258236188,13.55009209343324,21.47549981787138,12.804771863522962,28.206909898212196,27.86446108663998,26.589811664425547,14.015688788789905,27.401594821274745,13.836341300389975,19.435484841610368,13.543401958734634,24.226390642237902,23.24424982919059,18.012200574577403,24.33629654443621,26.191289796466727,23.977253954768706,11.087122591447699,22.731422470200986,20.106585816901617,24.396534025900056,15.538362463592371,28.43948536326169,23.3014906566158,27.32797295224371,14.446402002889052,17.334734141993017,20.35949498501126,24.048727727507845,19.53467398947432,27.23600740887278,12.756056272266566,29.85799352619772,29.13023678664384,13.541338584383,22.378381564009274,12.815942894022054,13.19489353880221,10.42612828905721,19.966358512979237,16.56884497380462,15.848526284950498,22.379764918194137,18.433157306433635,25.95459399742819,28.658973602060303,10.92429048355319,22.23502394921956,13.001458980923006,12.717306258733704,22.63517926293844,13.248112344573947,28.702987731666127,28.632665105111922,23.52376972444568,12.691729089179766,26.39824741376396,13.918212396567773,23.59278903719259,26.250424564161868,29.44357220070166,21.59869776446968,13.470836327107868,23.90396687864673,25.997841576416874,20.2152137275999,12.263861384358838,17.83488677491843,24.17316796932059,18.90104197942007,23.180422069322184,14.94884618668863,22.345983500747415,28.058150930878174,27.267566979375406,14.131096484783576,22.8723696634375,13.59832617311441,17.93744644959595,11.267671257938554,28.103695288851117,28.33741273774671,19.736967821493486,28.36022390753058,14.569730480568301,20.543445704168775,27.80043841541834,15.612327986416577,22.277268210415816,21.33647766772086,15.929775651742904,27.55138794704182,12.009908958989492,28.233644604812586,25.80980673927585,23.674373907893674,16.155990333463308,18.283475058617427,25.238159311593208,16.248213418155974,20.297567155076468,17.991838977538215,20.51031776189989,11.40785584854019,11.09510701192253,20.659576336252677,22.380436477213415,25.740822639617097,19.96649885853939,14.023954286894664,18.183084917141784,28.295418246663793,28.680471554383434,29.60708103767574,15.610213712865932,15.78767736284063,28.84474605360525,22.173067160359544,15.828187733160913,29.78831030174338,17.730904584239696,16.218922890404915,26.175880602461955,11.74949624732458,21.17288240632392,27.229684479583455,21.5764450262609,17.815936208980293,22.278786100923192,17.962218511338822,14.059287296337777,28.35820176216894,22.382141593320263,20.922508776711876,14.351682799962715,28.59987168831747,14.861159763712406,21.080788697443165,22.75934014341415,14.191740276382966,10.090531327109904,14.023387466682857,11.845415795621733,10.644531907124094,13.248251793669503,26.45543610365032,14.441665308148742,26.696760228054664,11.893743521521131,21.31020828700459,24.97461974804572,22.555686874279278,18.227509636163116,29.582992726142226,21.727101076145885,10.53138831781595,22.63351926747674,28.732143147929495,12.729930737774811,18.800173097432765,11.713509451963603,14.632115220134171,22.970144040945748,22.109814820978094,14.609274958694765,22.399821940027834,14.126775130351138,14.996443916042509,12.205877218979747,29.00153728328524,24.20805569851902,17.844207015247598,29.806172389780322,26.078895610583682,28.7551644505441,17.295119473071765,11.588951765464085,13.205827064803852,29.900543466343215,18.281416083697074,12.128702950861578,28.58280636533149,22.808079468879896,29.9274105931984,24.038894412401568,25.288556617402655,17.057768109425545,21.603752952422475,15.112796428185703,14.604521653658074,29.989717604810714,16.73844792084466,23.97431498159311,27.146258833412933,20.78091090243818,22.284125214394525,13.662506469757837,13.910204166205515,23.8601599738655,19.506187453609982,29.523243089002904,22.62459323304941,18.491192899588995,10.914901079024997,12.998585972795663,25.52303141383296,14.191765319385201,17.562736192053666,11.82134193064623,11.889902747129257,28.55266038647907,15.93784733163423,22.917005888134128,16.986642215365897,27.985666602545255,29.467006394147717,27.40575252567524,14.824120117714102,25.385448547047492,21.028920730806252,29.048755452705002,16.085886883385044,20.67559745660183,14.674867199168524,25.354453577817146,25.328378541732587,29.43043898367021,29.40799732586222,17.66924594114616,24.745582708697683,29.854228835611675,15.482157746014948,17.355305371865132,19.92395913667763,15.729079870553635,15.593513838418351,25.511809275204524,14.402344947852574,16.66520311554531,27.279065766255634,15.308047286274093,22.89855775146107,12.918674467323426,28.748033631607907,14.909282592825512,14.60729654178532,19.330241933901608,21.315146070867527,12.24682624337106,10.898603058148728,26.324860038521606,11.802170494296611,11.189318736067726,29.064961237539645,16.600554782361414,27.564400443433207,25.023332858421192,10.237889488118093,25.470984231833494,11.475074082678471,29.669479337420462,10.600720535421267,19.442884472234148,20.22402187114188,20.092677145427274,14.088370134211026,17.55818047564507,28.921205448990452,29.134186912163983,16.123203881628193,29.733070270915594,16.492971684796775,12.679543497117791,25.752199814090506,14.099071169685704,21.0795257103298,10.194356655094317,28.58862709289649,13.664625998301961,23.51864109039262,25.10667704941547,28.510240274437887,16.774106433548486,12.655959465655728,14.45068004027361,29.782946538098418,16.947689809745636,27.172363232141393,21.402200826156733,18.79193807550212,24.005838824361238,29.132728006940486,28.97817333714316,21.80762293235017,10.778128450354693,13.40413201043936,25.76787771194082,19.585043163898355,28.26012892384699],"x":[0.9641731181892437,0.3086137898971768,0.9466337505599034,0.4050481415357876,0.7641542465385514,0.0023287997941874305,0.21351335637900126,0.9892797923618577,0.03965741527076516,0.4285364675379124,0.232293288300351,0.92575857741211,0.6582423985340953,0.9429727452179804,0.847671410509385,0.9790203843676442,0.7501141230605566,0.24932752099080546,0.8071987603327653,0.03954688956998931,0.8517600661294633,0.40280647036331274,0.18160639477481366,0.0929873524057887,0.9249461312378477,0.017271593374378558,0.062485518397350726,0.5283470600854603,0.06942454789545249,0.2562588431466759,0.03029469444709565,0.4905302838751646,0.3430977877050392,0.44352195266330274,0.3719510401593704,0.960240811070711,0.450278572962866,0.14219929909798523,0.8199946846495016,0.04465662662310699,0.7834306384273073,0.5676850925729462,0.2141095444353085,0.4449362732048374,0.17342578374921547,0.34885503731301415,0.5776405942564458,0.7197924109462945,0.7950295474944367,0.33514611048686405,0.0596773939799744,0.03173299339544422,0.6665972129794202,0.32163167163974715,0.19108288261511075,0.8762396473794167,0.3540762040149694,0.20597044311226576,0.15677086916853855,0.3455744029382466,0.42426306972554073,0.8912100039444366,0.24158330013169316,0.26272010754068975,0.024131408917338115,0.05817827270260301,0.32346141997785605,0.35118413839491525,0.765551637492806,0.68520150389153,0.6645175337631173,0.0749311783464004,0.134361844787811,0.3941412864617406,0.3582514045438765,0.04551317759328333,0.776580995523527,0.6233793296628052,0.7391287917763683,0.2576683760744114,0.4168809436862877,0.7037075572726321,0.2019805162406132,0.5649842921067698,0.0355118373609582,0.3986422632556168,0.009932312590875902,0.993076186546495,0.0885486835207232,0.4251092076686267,0.18470546505467,0.6247480132612828,0.6149787291533322,0.6847217859097667,0.10971865750260412,0.660813151276264,0.2633718745774287,0.44557044807171065,0.20053889876575925,0.7415456329533123,0.8933343264707059,0.3643127489997433,0.6402159722625251,0.42313405128186843,0.5445991974959485,0.4930628700942037,0.9975566184122815,0.9474302863192154,0.23096130892697353,0.060306690111506134,0.030224755093738453,0.06758517335727632,0.4999236668825595,0.004004841361896716,0.5666749173766776,0.15567237725150873,0.2962042867036221,0.083900816560732,0.8843513440372579,0.6612071741184813,0.17355313781108306,0.5774702129430789,0.23240286382980302,0.14894388615177223,0.8241594624174093,0.46225394837430844,0.7557016986881124,0.9678030139186664,0.991145301370919,0.637315974714306,0.5836878162671713,0.5001671389793874,0.22024890040087208,0.9490156390809057,0.1682908070995155,0.2795042162502359,0.08735418995331767,0.3111469110329872,0.2369850721085036,0.9422981921095441,0.2993478600364141,0.48041846149824696,0.29281379368259164,0.7549893598424875,0.7732201879217588,0.20278977425642997,0.2050144239233953,0.231310966736471,0.10787199025028316,0.6884232537766699,0.7610791616894381,0.9520145716669302,0.13568156315603308,0.8392246520134414,0.8062362272764894,0.977898035297444,0.40392666839078606,0.5748445799612407,0.12436583390522227,0.240668259445056,0.8664937937614461,0.09131861756208814,0.08247363606608071,0.05125626016382978,0.5988621463126347,0.019959073069585997,0.46067688997315703,0.8545036041243685,0.2618919067235541,0.4391239641113711,0.7341953270025756,0.9344655815859226,0.27360199161428755,0.10645402157620842,0.9905200483262104,0.050339812566082554,0.1167773262081715,0.9079571818202814,0.6794349981629635,0.43159755210709005,0.7462291100897189,0.6843782355838657,0.02092960334399452,0.5215454197082463,0.6116762392424175,0.06269013817197777,0.08545027884224865,0.7041071678328032,0.5057164693914156,0.019476677030069833,0.1829268655727696,0.4861844225442935,0.31387403842440076,0.29494966177293636,0.9255195978586599,0.5568678040373407,0.7911256774352702,0.00876051298166014,0.6124956162523247,0.19519840383231024,0.24095210445512527,0.6727824867661121,0.7672504145567436,0.37839147742326373,0.10918462420167008,0.8581201341878988,0.35065520377458737,0.6825483885844312,0.5227221804457003,0.9047063410494038,0.8424289527677702,0.35377551057104073,0.4831290597825926,0.327737645074089,0.9909939093798115,0.6697153885037295,0.054951632472922896,0.3367774543217217,0.8502978717110874,0.8890665244821268,0.9095911177287805,0.03742515195175233,0.5668390659242171,0.37364747156870415,0.7904468412284897,0.03682950662246043,0.7558226800316026,0.7596184418147711,0.15742833954376412,0.991616083295235,0.38978461490597915,0.4373747526249818,0.959233346553958,0.39309096680141864,0.6505224965867733,0.7659965336201762,0.11474127841252524,0.5346800080712835,0.7142143986321876,0.6559085976462582,0.40386149057426834,0.012460066681001303,0.20602364346850655,0.24963458021110108,0.6060028818100986,0.2156903983122762,0.06065102260325905,0.6317553216507461,0.2490304189557555,0.9190320696998906,0.22650890362769416,0.7195454778936268,0.9363956400051767,0.6930714789048913,0.9620070650305337,0.7799875087570303,0.8792107708032086,0.7427545540948983,0.8627086469801402,0.13726951334184312,0.607843574273504,0.45010841431693827,0.8918907697733309,0.3900342986402978,0.15681334572546302,0.9197733007596283,0.7890225120199907,0.28583477167133875,0.8748110888340566,0.5493083693623557,0.26349487104143754,0.5779565510295344,0.0713086008904591,0.7896012788120474,0.08020663115978266,0.9526304927323686,0.9183491717247076,0.12245414187324566,0.02429576167448988,0.6889124002342373,0.17405374833240073,0.23863238648374407,0.35784591322573456,0.7949741214923707,0.3359924326238861,0.961972095588651,0.038802247050611305,0.03519954774570566,0.46141253103064717,0.5146571503736137,0.44438294438650794,0.7469775115755797,0.9111691023068602,0.06272402627690576,0.5556881691036932,0.7952345305351545,0.7322878984089976,0.5613106561531391,0.42244925546710577,0.33808621134786687,0.354189807494075,0.24826735741089134,0.2307452600847364,0.34679025503208316,0.9023646872302253,0.8176488871504684,0.0483108806399668,0.013731154357258912,0.9279682118202592,0.2959698948192113,0.4895602152203846,0.7816114866679789,0.8669859072873243,0.27171048372736917,0.4086568250541811,0.9661057128659387,0.9198054845198445,0.17002113159394217,0.7228688550938447,0.5308492557368356,0.49279187612484376,0.8667551516789429,0.245934452823398,0.6154566567792936,0.5331739967316256,0.7742621254761681,0.8811435373422687,0.99933052852064,0.5262605590076248,0.6765076628358726,0.7162608974405824,0.10664202804795986,0.9892164491941156,0.6858049718932728,0.20013348320179047,0.7320495829490485,0.794345885697944,0.15781434305383413,0.2722623237788837,0.806006278022871,0.5296620401375738,0.08366103946909198,0.04127117684309867,0.34100901340385037,0.3775956041243471,0.17506496262567972,0.8622352276824363,0.8771545868660184,0.7160126297431364,0.34166473792960694,0.4070472653074635,0.39262862389234576,0.0801779416701367,0.47297270899680055,0.9567044734743255,0.7518479886043576,0.6580001414536143,0.8539880857082662,0.3637442134772133,0.1319627247702282,0.5028686169776575,0.4950070679195713,0.1395911617952692,0.5287172533313256,0.9949565737031081,0.6334909149109818,0.04907803209852313,0.12212093260621604,0.7994808990487561,0.9888890805354507,0.3789206045215727,0.3219878813324881,0.2037646464027505,0.1493327117632508,0.8111597798345282,0.23558716397231172,0.7820523800184165,0.4566402857835401,0.12192746545101008,0.9340363650896066,0.7119438018427542,0.8966847026722788,0.5913436760402064,0.32533264586837873,0.36036832065865587,0.9262980228123041,0.7044671622155865,0.4274162513280837,0.34517920361694987,0.8068001975365984,0.8776524237701311,0.07696576433076774,0.5027309336812424,0.49633102816679453,0.8126575463865846,0.10404180275909436,0.4556255047057469,0.7722157422739253,0.23749317996827735,0.21720332443286394,0.574734346498478,0.32176073926543003,0.5226389617481924,0.5635814019128684,0.22439678007426944,0.07835199779235391,0.9273288861924587,0.5836975801687319,0.5368862931886593,0.5091655658852059,0.020703945266717927,0.6580414990452446,0.16768439115502876,0.33224723701940206,0.09743036461357235,0.08286322999805429,0.47850608983776866,0.21413400371492264,0.1483818404666848,0.13268713849183866,0.9125050954488085,0.3105918092458704,0.5158227240675928,0.6086506390608442,0.15231287132099203,0.7522256357511778,0.009071068455073661,0.9769822968217834,0.7958475704039152,0.2196436326578759,0.10016535128397952,0.011557131350773853,0.572329025428717,0.8379704589451169,0.673104618780892,0.3713263828018343,0.06264917986250218,0.6897094818418947,0.02315639216071208,0.20591915413617756,0.45589853116238466,0.25018194664790916,0.03595863853576153,0.11942356174556634,0.6953560482687706,0.46227852060405317,0.3642728345931223,0.05674379125564277,0.9749948215217843,0.4622541262742319,0.24197129749852464,0.9678130682563093,0.4480761669101636,0.8270454627115844,0.4160430694204884,0.49416501897121345,0.5578931866006935,0.4882924156521975,0.9191472210521623,0.6908807357907207,0.06513792833929699,0.40551493912381,0.6129602425903093,0.7737859304186598,0.5916028993612907,0.4400127643852325,0.2935232272104089,0.8325487934659725,0.7992007695937127,0.523826693783451,0.08006247451573456,0.5965579637258172,0.8890600581569172,0.0577633854873536,0.011578552334678305,0.6027340232549934,0.019499700325614322,0.15445696822619248,0.49623103728074347,0.9448052362195194,0.40207429619943835,0.13961807199739873,0.7235468213796454,0.8066148300311544,0.5757413823496447,0.18482888542139575,0.43515856596181024,0.48011738862850084,0.5823325054575827,0.01591242714304797,0.7761887827635792,0.4012597045291788,0.8542733132470643,0.7292091252971042,0.3767167787294714,0.46978889800891155,0.9327057861600265,0.20340870134842137,0.5655340484889209,0.014644011172559424,0.1043474255417427,0.9154277321740885,0.5633097751355518,0.9790849642590018,0.6475493469161908,0.07485470726814158,0.22492409619237796,0.35116960777877226,0.6459849531436956,0.15956359177490032,0.32941978715965115,0.5249032356530217,0.7286673275022189,0.7537635098946558,0.40711433439856703,0.5639257456307061,0.3694946920156623,0.23987162367419645,0.6835149253168411,0.5777874482013192,0.11036012496607772,0.2635329782006255,0.48045428637084964,0.4944454189612981,0.47969090195980946,0.1321936650653821,0.7080928866005047,0.6121459082177712,0.38922218285549404,0.16936625693930574,0.3736890276413485,0.0299224094269972,0.5596998915445495,0.9783191640625419,0.3021015965172571,0.3455492737653798,0.4923007072696952,0.39413549521009883,0.9307688260504856,0.6994877344474053,0.5350278262905834,0.4534875097545137,0.11359146160672862,0.7567719792054721,0.214622264758765,0.6362394367090363,0.09410178652388135,0.2509022151379572,0.7141839935435155,0.5591197411046331,0.4567793784963772,0.42128036725490525,0.7285705985234394,0.09717971903631373,0.0703723954812463,0.6524018206464035,0.31252187132656783,0.4665294853795814,0.24117402936470556,0.4381405128525093,0.6471851802337638,0.4326478120956847,0.6795064616906941,0.02648611720745775,0.40592668071041915,0.025503614404345676,0.7022944418388726,0.49639154796400575,0.26186681889841346,0.5041871339449495,0.9427031881096448,0.631315520875944,0.1866529474341727,0.7540348863642576,0.6637805742452663,0.0027982784967486296,0.9107716949866971,0.8405456213097016,0.46377016274022576,0.6369421141300056,0.18482525553670226,0.26091282508792113,0.41179109633992517,0.6561697999884566,0.34503853078651314,0.5197554353642964,0.1590876759659956,0.8558908139323249,0.847814151357726,0.20774569772216145,0.11444026513264749,0.9317614142007526,0.9147841224305304,0.8967315175447033,0.7188358151208367,0.5694131171499457,0.5230665443606695,0.2753000832607466,0.3100144204219988,0.11830116125282752,0.2704755840294868,0.4944908932987331,0.721176328153706,0.07191480933945815,0.11674268333062288,0.3640461488299025,0.45214206343794006,0.7298467061427942,0.06610349270981875,0.646179202477527,0.25270628359764546,0.5941255019987255,0.40375798944948427,0.7837561389374799,0.28625773472173566,0.5657251813441977,0.7043461807116982,0.8061932250200099,0.907718723581814,0.060200651906058944,0.7808719368469925,0.9210397403104364,0.864936129802816,0.9884409559535199,0.21202583982060985,0.22281769868394607,0.030853882271467015,0.532470370988875,0.7970107726570916,0.19959696733254528,0.2611520755589878,0.34355888793346656,0.28057456957753435,0.42393870492775276,0.6797639860687601,0.45337421556079893,0.35955312417139496,0.8913511991195855,0.5305984699698916,0.09024280470586454,0.6782271314618107,0.7746175104602921,0.06823063989818068,0.9840590866851364,0.8018716965146611,0.6780164857803375,0.026345918902902943,0.6837236991157232,0.46172985446277415,0.82383447117309,0.9985643441760204,0.6296757163655713,0.14605580687881803,0.3846821669654563,0.4853444705458838,0.8839504694368072,0.40113885368399393,0.25597317124350605,0.8061252886287729,0.2975333867630745,0.69383801548403,0.117314206934519,0.14669881841021937,0.9173408509111471,0.6331019361863615,0.8381449566703356,0.6531710073738011,0.677523780935541,0.33838433383096556,0.7848724265720786,0.24751766035354006,0.9221731024763475,0.2600308948953556,0.7445839917553765,0.38304670412016795,0.29751098202951654,0.9919608107158562,0.49793268464504514,0.39680616516489686,0.9896419563114132,0.831412924728981,0.5550942968677772,0.2519894153239042,0.3525335905286717,0.8541283963130581,0.6024599219326516,0.3543369505043994,0.9387528267429681,0.795404488472462,0.04586374089262346,0.9526628766812693,0.3370768652610514,0.4051010938384827,0.8126267114366277,0.9944606074324727,0.1319625026417468,0.0717631142216355,0.7425124875948443,0.17791209786754325,0.9538646384557452,0.5803309943412329,0.8826141497003663,0.3756408091457806,0.530808132077448,0.25051839411433363,0.4769366240853634,0.632766223739887,0.8424826583228997,0.10631900337630729,0.7115482199667698,0.7325962147388421,0.36195695804068273,0.5344589565065816,0.7504481981237159,0.12303700785580007,0.8728967765206006,0.6279222013776184,0.4918242306247167,0.07823355305250823,0.8495281194662456,0.31330176381378894,0.4663677365607315,0.13803403940354353,0.1806956899269987,0.3921738118620952,0.36364111555883616,0.8729723603824553,0.15641915037198584,0.9511562376235667,0.6900399670121808,0.015084743326928107,0.42194504830949064,0.8848787446369957,0.8856079446479299,0.3343024160900572,0.6954687131226511,0.7565590802940483,0.34150115161834016,0.9020388786142979,0.15842092755906,0.2277059753351074,0.46254588239760874,0.5005028101996916,0.1157305768350978,0.7846539594764179,0.032032832422290936,0.919366133167957,0.1357623221853086,0.1888063880554156,0.5412539018842002,0.17420433565105475,0.7782381429882006,0.8239107941856414,0.14974065211188203,0.1744094163657266,0.05082313631432278,0.08156050634828405,0.009319852601933132,0.30488098201163294,0.956615686820081,0.5853089861536589,0.5058787672232314,0.5178328671880243,0.5255715979726812,0.9835597605125463,0.8524413710826333,0.5615157272554983,0.9032049589095503,0.4673202557951526,0.2672651291412287,0.10160513912184777,0.32994950452631566,0.2930097449852129,0.6094631391929803,0.3739807835388178,0.42995153788257023,0.9773592276550613,0.8827205714297217,0.7969770731192154,0.638443034408229,0.7508935109903676,0.9192509660118524,0.8890460319738052,0.9767147805487877,0.2803627262375916,0.4434276836470934,0.49713375519347425,0.3726578653053829,0.4099229684455796,0.5512929332735808,0.79697302420069,0.5016736785056317,0.430711174714143,0.0797362016413885,0.23190493455038874,0.770818834790721,0.023141741028715135,0.9489131746271737,0.8769122922442834,0.37697984014383956,0.31645932509643604,0.678692079904845,0.5489206032063036,0.061513935518704654,0.3201884965478128,0.5383621984796108,0.17859593155055875,0.47367253672122756,0.15430825399105896,0.9314161806323391,0.2578615176993795,0.29304648710374703,0.2530155654648043,0.7681978670385852,0.07595474712819628,0.1418234821785178,0.1795679715727525,0.9701517475652783,0.6538928560451529,0.4362667592699836,0.6457036148034287,0.4503436033910988,0.46672811335520725,0.16115126791030354,0.7297243787550962,0.12188625005360065,0.5151590958163677,0.8377920193243229,0.0482023750197238,0.30409025028967407,0.03387528202467993,0.3460459107577061,0.8842731616726798,0.18960890667827712,0.6394931709343674,0.550087631439254,0.798596527804601,0.07419886724799496,0.11001606200041625,0.20265546201197027,0.37673474145976327,0.01874621386159081,0.5723671261108771,0.45777506191704287,0.6837438354763608,0.8778210783704614,0.7746588626747448,0.10360703197287435,0.6578459474646845,0.544820930234625,0.4802663098933293,0.408834052414893,0.75395306185211,0.6440744353084251,0.04832999945648142,0.8336408787959277,0.5993801803247969,0.87871852203997,0.7786710081751933,0.685555956621416,0.2875402602939392,0.7168105079378153,0.9745422980607235,0.34021967580151946,0.4220569614234748,0.7914525264426968,0.3068749303020708,0.37294065735346926,0.22890917452306403,0.21257762675093717,0.4002803915725124,0.5965832497237704,0.4840941094551756,0.6394653221430691,0.3666177401199884,0.33456546340001037,0.4639943856449775,0.7060423218727558,0.19575337212311417,0.4506748433850545,0.989347201904484,0.6791162810470535,0.27853401949102774,0.07914813664085707,0.6014839179355003,0.1637594199442487,0.47606810120881726,0.8722492993172601,0.7911512519017831,0.19035655139907104,0.1615723602190231,0.006596797799102605,0.867827957033255,0.5923086081744453,0.5541895747970429,0.0539497671073077,0.6380157745043151,0.29378626434703703,0.2400500842589095,0.5469235847705454,0.038056713247331064,0.45156913542802357,0.35153286962491936,0.7388157361531966,0.3235683662531206,0.7780540395304263,0.4676520819184704,0.687656712406429,0.6843744741847109,0.11383120530344315,0.35060501191794113,0.12514460402132155,0.5689504303373267,0.9925838605809385,0.3404732637646066,0.1716917914164633,0.630661657272306,0.5211346397850989,0.3453557753236651,0.19465545665879946,0.23576160282045322,0.39302375161053815,0.7825476959017754,0.878842533833361,0.8081404947740576,0.6198998809672487,0.46166609232331624,0.9139188284948729,0.8803576877179089,0.6201392378537534,0.4639683093789362,0.01820453124907817,0.954663233416915,0.2727829780132498,0.6874286839755304,0.21948063878747015,0.5986809262977064,0.6081091663194529,0.872402658824381,0.634303158071454,0.552399671074576,0.6507788613052901,0.691984645947552,0.6607061536244836,0.9944016648095637,0.8158828876169752,0.4206801908231361,0.2161983771390561,0.7372478361093537,0.8348703992058595,0.8013851268588519,0.520830187658682,0.7727453341983761,0.6878666024948707,0.5316479013770306,0.19700345221130733,0.49935295796936274,0.09450786642318398,0.10614814692514463,0.46708415065410147,0.42558959750564385,0.2503961457156205,0.45629798887824635,0.3271302722430056,0.013058204630067793,0.09986141975750273,0.47761963261036966,0.621904703775956,0.06363123665868198,0.22504855910880872,0.15058381500405904,0.17519019762707777,0.43398682985656456,0.29962406752351245,0.5236660755916285,0.3797366423781854,0.039879363765846554,0.47808514731959395,0.3139656133509614,0.5635004493242752,0.3550884922248523,0.07826099967067135,0.08777369375893507,0.4062504217650327,0.9072355399482357,0.9720830619870466,0.2909922534855891,0.030245352294780092,0.34485486714504043,0.8567329027993924,0.48216091449815157,0.5169157664987856,0.3710229552028146,0.9332801639987636,0.01625187666206762,0.4272754607226852,0.9902239860988375,0.30191735449660095,0.594671416044376,0.5527838759493044],"beta":[22.053196639626165,27.45068322573048,25.862680678588802,11.63768155201176,25.583575209614644,26.241940477685052,11.921705995667722,24.856406456241903,28.98216110769376,14.187914939593282,13.491034644886565,21.324532794607652,26.312784751192243,13.298440137009834,11.137453708872439,24.043954747831187,26.808502123035318,22.0483832069402,12.866430119182661,19.089806963327348,14.069175428603904,17.41038677328904,21.72354844039125,15.513377589222657,24.580309716528483,23.6920604130743,16.365288428583646,11.416912383800518,17.349718543488727,17.63496560688894,28.455600592896108,22.61987320881287,16.587565104310205,28.53622697426372,27.452995907359828,19.51356787284113,11.487594045331573,29.179558747213857,13.09219351250983,17.933116006573936,21.22569404578143,24.78676871176725,22.497284793205047,28.74942294339406,19.440323900856583,27.196470500328545,18.128951188703923,16.733183024047605,13.20280228560736,24.551117395739794,26.783786670822778,26.050917672734144,18.02555040701716,27.769888427492212,24.582353168051355,25.85927047616122,24.042501441854917,29.897557545285665,25.894487260813786,10.882841534687193,24.70703745030944,29.414522967309207,29.694196580532388,10.466228556931574,24.282000658326965,15.923171039806707,14.581113707549239,13.97961158645372,25.648007606835456,15.918455905150172,11.585772349505309,18.29065575273063,23.40133951870888,21.055256657118143,17.920825731919624,20.23164915679722,27.510443504922137,29.322063260211856,16.272609219747313,18.455706254941518,12.519991224644462,28.991493813283423,22.77104968479595,15.455862599339554,11.321115730141713,10.180229317771037,21.23573567575179,29.34006643918577,16.610911194057472,18.468200791844627,12.850632778386775,16.54849428902522,28.480839837935875,16.229519114131385,28.432910065338135,14.824302515683051,19.412280952651287,28.73513755676374,22.925699945470512,26.106107383047792,23.68711613317568,20.214031831913704,28.838748608987487,26.777560301237816,10.848403397733062,10.152897593943777,11.561320479551927,22.681543508139494,21.244996559776705,29.38882044635286,10.64863825916178,15.204001442669597,11.603089004007035,14.302662566925104,11.936687496806965,23.181308969100876,27.671145542675486,27.632850477521526,21.265250395676052,29.239741926592163,11.625605248252429,10.150131130412362,14.954193792167718,18.95743197886039,18.43547274706346,28.62069086835666,19.987059744585487,21.87363205419945,29.02989107840885,24.629222740931365,25.990636947312055,17.993433481788653,29.27123489213909,17.539349483996748,16.866046242159424,19.863445285090492,16.065608782907702,14.762251279016168,16.860348391173332,10.494602225867125,26.07497158604188,17.369021948880167,24.952168403034484,19.716981612680836,22.097840637742152,29.12426109346981,20.00674549111528,28.560048773365345,27.660597816201328,10.83100063322393,24.414547017117165,20.718856413930936,22.892680530087116,24.98644115831254,21.40158825671369,17.491143355928415,13.690657652395938,15.242994426042248,19.285741141159384,25.540555164368083,19.38822383490695,11.50506685115614,18.624700277997338,17.214551370345887,15.702349809932521,14.614024642617363,17.502626265934644,13.641354395939608,24.426721175159756,21.483407649595684,27.265767318399483,28.5337271652889,23.476503200088487,16.39037858626649,20.67734767257761,23.340734736404837,10.618138121796292,24.880378985719286,28.413178056658772,22.09567689154194,17.09022054273794,12.837800132436797,15.7180508971223,25.85239236960991,26.82630341374456,21.780669495889025,26.034655740366457,29.282397573952625,29.01508267326228,18.1514201252746,17.58975563708453,10.237485268420645,23.150439584324253,19.760421341515098,26.760306896932494,22.764200758411505,17.790535200676942,14.133871512004465,17.707215532216168,24.901342253603524,28.27229959118292,27.74971750863532,15.083881498083699,19.843329732568908,24.544254095574573,12.073641044005544,15.098949135803768,15.858987199438026,13.407665526493066,14.208405914862201,21.321438503219674,29.409283807783744,22.774288858066,24.74200513744611,28.081980408126356,20.08741514875176,15.724835905911728,14.790693456066029,21.64547744832447,28.263080546869908,15.364868275815615,29.186392178097478,24.230963760855925,26.53059975023207,20.190044140419122,14.302732093389299,23.47885580897256,22.198866750568836,25.54684382465904,27.764295496910748,15.29363097597134,20.05000308248793,20.53381143281493,25.57210639745559,10.022839778749436,13.590165426388175,10.333448882908552,23.352383341403904,20.30906329973091,19.133561154737265,28.76946317820607,25.25142206379094,22.74112651280133,25.45598088684423,21.62435829858484,26.247009275360757,29.77155782705516,10.587664582269971,19.38767784492134,18.037295635200632,22.971924835323257,29.476391292094398,29.54140971135082,17.19558544183399,24.173038769744394,26.208340160796478,16.25942668739477,17.3212502069347,28.26942554235267,29.848290820505085,18.750001558072338,19.597241728627885,21.11312926963341,23.85692917078331,26.971408447736493,19.397096607028065,14.959341154727168,14.848561956404595,17.389277368351294,15.799532394311221,20.987525914305728,18.302908414597248,17.93429203618166,14.534984910588701,11.594907901600365,15.186347946432054,10.11151511714325,14.894745631477004,20.06441825467769,19.321789242768794,23.556647351285473,17.08459987504809,27.90063940680868,21.407224868009862,24.046238770927264,26.596887077418273,18.07214064113988,10.384850861909358,20.9713519254386,16.905823053641008,24.55399902916176,14.362618694386683,16.172000872251566,12.097634294622747,24.666479638649662,13.408927331173937,16.506298079530946,27.68617348898612,15.649393112112474,22.78683547849141,12.961979119142546,22.625477151663866,24.16956477141596,15.609047607526602,28.614230355510628,22.648525103566758,13.018060255787578,28.33599277463199,11.787810417310002,14.497111063133431,27.08736165062068,21.278732799348944,14.025555006286869,14.150473940986078,25.2095597407051,20.82667910349236,12.296053654270489,11.941954036242848,12.994010716798673,17.67882508270928,28.251798592296527,19.54036671239839,26.535980337735214,14.317752553861034,13.04316146632381,16.094169544765332,26.342333408620775,15.396599980283652,16.765133776080372,15.689021681187455,22.338201462514053,11.097816086381114,24.523170769797524,14.843715736043341,21.397102500024893,24.77183198638366,19.027199523416307,20.238259253008344,27.11732118583685,12.408955103810504,12.927445377877632,27.18613830190895,10.026367400699808,26.4892585686964,14.268193670714293,14.306610017579583,25.265300465494978,15.261731975323825,22.33916787769199,14.397204995418509,27.560875041290135,18.484751654101593,15.224801037200546,10.663698989570864,24.832022251048617,15.652481517834289,13.713169210273985,16.54751437723684,18.723838612726723,17.020807437477963,20.22089253075292,20.529463620392924,22.182594834173393,26.846966681842368,10.534427874415124,23.748263661933393,21.848872228907233,22.53300056219906,16.85903438854812,19.780973071372642,27.904337309567126,19.006387499145873,13.000082874444772,16.207123845929253,21.97994332114467,16.03102813680399,22.24725000580317,20.72011799623,25.564013980349195,25.9134379047729,28.169723247509197,15.903216679189107,14.70426778924133,27.030091111811476,20.902826095554722,20.537526156010916,27.839900730990546,17.92960134160941,27.99140985272155,23.942034245774394,20.67981722163279,25.96177887088546,17.528752916566535,15.45324411098521,23.562505578255863,10.981327476724307,26.393566338653436,28.87684114048855,24.976608927675898,11.308178156106884,18.701152194299425,13.873411185927731,16.469841557590023,18.011612262900314,13.775877667048384,28.59841087254285,21.266026262759887,19.79204658057298,26.235735238025377,22.03128700139519,10.092446415977703,11.02281112049039,26.70732506421933,11.952191460576183,15.067117207959942,17.19059902095124,22.033619004756268,11.604690441482507,14.78006490094607,21.43664764351822,15.711430078752521,27.555515156584303,14.900125826867807,15.584286850610315,26.353865274068315,19.95780266704824,18.115013187771176,23.875463264714053,20.765810169704494,29.816947820228947,29.97384056017061,11.912550356065719,27.086408784552276,14.697292878232219,12.040859699431126,28.414530297551572,25.623408910092138,13.432416161583554,18.176623116424825,28.399352715177976,22.15641358995146,12.57290205453383,27.674117159552097,17.50185045067196,23.30049529772666,10.676681816820626,25.844961165976326,28.674065340061926,27.216003857222987,13.895420714292399,29.274152611372454,10.340696480152051,14.172922749956541,23.366452737994976,26.948369442611956,21.140626608347098,12.394629236843802,17.66799055627239,23.967565039535856,22.150209441358996,15.446363199712568,27.4913401006644,13.620234788066083,21.769565445924037,13.91658771750603,20.17677929816888,22.68284887979466,22.04310654591911,17.369264449178537,19.624374721249907,12.00624632046793,11.820070363488053,10.80067203686542,17.937423976361032,18.13292163144839,21.6865512575079,20.317742585548054,23.520532511819198,29.011440607408467,29.950389985829865,26.85613083838488,16.94989427870606,26.226063947701327,22.743320346874988,19.373817304452263,12.696531960714434,15.394820962445582,19.716331200700495,23.740025704537132,13.323266333075692,17.525088916474694,29.63792732607189,29.578103453701047,18.728659440499975,15.807273827748034,17.814225361257748,20.97746983191132,22.58552630900004,20.614059414811564,28.211404769753017,26.11448295387239,29.972722778453406,18.40338975801384,17.721898213622143,27.009390220555606,18.237983229629677,20.655630631435677,15.008412886760043,16.13897400276378,16.005474574403813,17.78967123364627,16.541074559663677,28.035079652669882,17.989360936981114,11.149286300509186,25.296797511405046,26.151799054200474,13.420008886080982,27.086534412734462,26.85678291423377,15.224904949179345,18.83705118166556,14.349829573804929,22.253803828616114,10.509095478823882,15.004492631568747,23.14376431649979,14.7562876018999,29.566086658812356,10.278980453567552,15.773216583519316,14.970638565851475,18.228336194352657,16.51761336468979,21.431566274651644,12.337189122986704,16.506921606816825,27.142278920676617,14.11816988570438,19.989054589395966,28.13770907936668,21.440958520034048,21.70283825254712,28.369346513692726,29.13684898108712,13.762627415481585,15.32664946352475,29.623416534099217,24.27634836954355,21.443226764821365,16.19629705416156,28.576519427665076,26.927878729363798,26.263994519496855,14.272768514788687,10.87962381400775,16.719358152609956,29.837643428006885,10.85418642466876,16.66333211015411,19.72489588437204,13.989493897754803,20.158849769129286,12.531462802806086,10.563075839666993,26.70237925388385,14.348036548247425,22.769494829384577,18.04221291040428,16.506883064073673,26.40079352987716,11.531499476854563,24.124799760437487,12.97084900053687,17.175147450878015,29.25861521522073,14.508066989283076,18.15676559426768,26.1800593205966,17.743301797563035,11.34495844565703,18.15327007705625,11.914562301856524,25.503069307668373,28.789336032993354,22.138570890378347,25.877927374858128,20.3922214559161,18.658755424946385,21.593806445004986,26.939079563745118,29.53358656183339,17.771688682187584,17.21653530345563,22.49560421706802,11.91516369186604,26.08658062699601,20.346278984613445,29.197501782049,23.362268858627306,11.761816919603923,16.854404222776704,18.257002243669017,21.582144974349312,15.650418276604498,28.1156846043785,19.99762951655233,28.532244378750843,14.399715061278467,19.78816737846322,15.533208851584215,10.513884473361465,24.04292801803525,19.778948125139138,12.452367931556605,24.374491030486443,18.023960737520646,27.922602073066226,11.474110433353935,29.417265614713486,17.396003079232848,25.648980877057745,25.83980262977782,19.732022073138147,23.34612260503924,13.897107427156197,15.298849147814714,27.657410512284066,11.385076727151432,15.984111696551334,21.380142134084323,25.332470992104597,14.20242013714223,22.513356894396534,12.568342073077211,28.752265642230913,27.06127161476274,22.397304674939996,26.578483270733756,26.041209401348095,20.523779766704312,16.617627764084403,10.766068472800239,25.605142074890544,23.379922894174904,26.99156159911713,17.104956806753016,18.68407858009069,27.517394720706342,17.8963879247088,27.823317024221453,28.502989363685273,17.981921029891442,19.350835367499265,17.506204471582212,25.13837334472186,21.112547420128447,15.18699357536546,21.94190234224248,10.98291112060445,16.536806965981,11.018070235107075,24.317921247704536,16.78265574837445,25.85472087724094,21.688051444348858,25.928391079503285,23.13207762708884,22.241510173300846,11.01455461146215,11.062254036650504,24.017199024140766,18.799670759965842,13.792063803849825,11.375179850784555,28.047644649418643,21.79631608385124,22.960673874649796,19.615460684653712,26.263197779102416,27.92257664452491,20.78647763900786,29.42199629129631,22.08363519875121,15.245343207578784,15.859245749166613,26.327897268665453,17.44029522847324,12.256270792833917,26.897329351348,17.12573450901925,24.26922026329596,19.288648601585106,29.46831540481709,20.964352048477963,12.29664926165206,19.57977408093981,10.883326860618316,21.39253009963072,12.660476471580978,16.980035979253643,10.62540134918926,12.520210250741556,26.80063425441798,25.80481883629158,10.903069465902707,25.910543166386137,13.952089105465948,12.38811741654622,27.007993981238204,17.33894660793281,26.751458502542867,10.671143277549188,10.976884709816606,23.065855546031724,20.566495139668927,24.680313730230647,16.451577619216323,13.987948968219515,29.709935784727858,29.920685363109424,20.764872651031926,27.023336182401607,22.858315991079337,10.970047379792081,17.93848375703082,27.640333839078895,18.687108075498987,28.17889094689542,20.450998837830056,14.300915048932072,18.668057568473166,23.086007375665297,19.189364382230664,10.088348452886446,25.686270518237166,15.063002325044277,15.726132355386135,19.795935842328692,10.565038064724499,18.80024050421529,18.065103388383115,12.876434584461025,23.477181858470647,27.256651682217168,11.313609770608583,29.900394965725607,24.430966295408943,15.770743477321805,10.684568476272943,26.743912023903015,21.741824099021223,13.994942962981277,19.104663889198967,14.545320403501826,28.20436377463094,15.470334325900929,29.356441308538756,27.63945598521236,22.87044861174067,17.87057374656608,23.262999924613435,29.36829590046422,16.360939385300707,22.446048438468864,23.807024197265395,27.43990247171405,28.610109377224937,24.602152925539915,14.604990317568763,14.651601032516455,23.039548037929315,25.029408838491896,23.74013321199863,12.941632428008205,24.079322147122944,20.88309647457328,25.021563467057348,17.0592975074965,23.800889469841206,15.017742314955086,27.712428498798772,26.34302527430313,19.55670140917683,14.720657660792003,10.83993172233345,15.885530314485376,17.187053592660067,23.4733264199437,24.34865407997931,20.548397126363422,14.680173860848654,22.041966748623377,21.71792375110558,20.312705611944374,13.008851424340229,24.99390189702506,16.559525899939622,15.517889458323356,21.135537726441925,20.473869961987337,20.56415050284656,28.503158179117495,17.86052646670835,10.077747538274032,23.76346057299553,19.69964743227321,13.7896207759545,12.580158256818166,15.979546376783782,26.16941234848464,26.398111822857622,22.330134830947316,29.84459521049122,11.451542632672925,23.2848296325206,16.54860754447276,27.07481026991303,18.509483674756375,13.986249090447922,24.9498282390364,22.61524818109992,15.5650002273096,11.511484826299618,29.396131851030304,26.286579195628445,14.038030654329408,15.411518397139323,24.241854967515874,20.190390450184076,25.650871611496644,13.712723747967175,16.769241040166513,20.156045256755434,15.968280659620909,23.37631261820316,27.428385016632923,17.296801464438026,22.707410633125672,20.273246947279553,22.99916901339095,15.669672086640723,29.178284701749725,28.190469550734676,17.000548314225913,20.77615935972082,19.686587974923256,16.633276919020958,24.937172504227657,20.34777531332012,19.03542881259326,25.930707511631923,24.293148879823168,18.75430848006287,21.23040299557415,11.761562355332465,21.598928853150294,22.928706242495135,11.023171659965367,23.313768345867064,21.3204054244628,23.52416048458316,14.53562628185959,29.719782127772703,18.827941422276105,10.452018172439601,27.75790726457407,15.330566511024536,29.886898120455278,18.206558097421816,23.403746354069504,25.536860696233155,12.251830031578596,21.716498525271213,15.788768819263748,23.49806877000274,19.66752495287393,16.49156374686067,14.716509807065803,15.603413691309278,16.561564952657825,20.626863469104727,27.801315893300746,11.125230291679289,28.840534290863317,14.760839142083926,16.493745414654942,20.464214338073017,23.066119609838868,24.46003622279601,17.285596339426093,12.821319149168904,19.660418451059275,12.549439520341688,13.691971069159795,28.282523818668682,28.89424771380262,25.289525159211937,16.455288894419407,10.669533712184114,28.617451848196144,11.953638847038203,13.25410238184379,25.68654005935311,19.060374455911727,16.554583791147582,25.84350808287254,27.050347841704244,25.481633171634712,10.572866284691171,11.841259236687902,23.138862471245176,22.319029664753952,28.90713460251854,12.747694052260673,29.523415219428628,17.557737985576427,22.33536970789585,16.483394241910275,11.352863133163527,21.723800363173815,13.50183401261729,26.6927044250637,13.292696475937294,28.073662858339723,24.788434534932435,17.326344401158057,13.161777331412562,10.967882549654897,23.014297360262184,10.151639981588785,15.405339600606176,11.091714289482724,26.063524715016108,20.697173479553225,14.21559318106507,24.67660492374922,29.037859996700224,19.414885742309856,18.72501949992283,18.04501894318556,13.524712697849628,27.81120977182659,23.21575446091512,18.183610879633136,12.514625339987271,10.773990373202107,29.74061546880867,13.640991501475042,26.303122919335745,21.705983027717906,15.561392455228136,21.1331373392828,19.058926985995754,23.350975907783575,18.666883754506195,23.615102266004428,26.097931761037984,18.134903885136794,19.282592035542606,21.087044402838394,16.7799561329187,10.67947735697305,15.69312422125591,18.91456773544471,10.809240915815801,26.026458643947713,26.74550786898656,23.20219301529192,26.354517430001113,29.647166727393234,25.094991487742075,29.974960446129984,15.821547031844482,25.111183729372712,17.962105979985104,22.056092727075814,11.744717255835106,25.98754463974624,11.584069646743087,23.0907203945915,12.379226946739447,12.377395624340085,14.923491249746338,29.103280315649258,18.553557935294904,18.942552666247728,20.523417859737606,23.145844903723273,25.88504586001109,20.445841807491174,21.45169872715789,12.984045724721858,14.21541414604594,18.630193421282392,27.85046986627082,14.045686730605084,22.111645849608013,17.867073072931174,10.400442888446957]}
},{}],27:[function(require,module,exports){
module.exports={"expected":[1.286840055145411e-15,2.4022707019163746e-10,0.00020672757433707326,0.023434881601747396,7.731955017317401e-5,8.931888177160883e-5,4.005216243947575e-7,0.027111556594063838,0.020319104299327834,0.032620045998087786,0.008207593413688033,3.72899076357796e-15,0.02554797206149327,3.8734147449740133e-7,3.521932235733307e-5,1.580383674839497e-14,0.00035795178370047015,0.01574275102696111,0.006352854780264216,0.0004933438628409947,2.8701178437814086e-8,0.01068426052381217,5.614808447704879e-5,1.6713974615510583e-28,0.001016680387366912,1.1584794503057122e-9,0.0738027928161496,0.0004676061333164323,0.0010807035553435111,0.004394387968290769,0.0001272470367926107,2.340525449352487e-19,4.494532670830732e-12,0.0004029173776468096,5.260016163969861e-6,0.1950484020291925,0.00027798713480911124,0.0001528487601258929,3.504635774574361e-7,0.1921044064811778,0.0002721793832866612,0.07259913841350457,0.00040343451806720723,4.298545054224519e-6,0.004215483730700688,4.272692983846171e-7,4.457730866271712e-5,8.908940987273361e-6,0.0002699160831922838,4.262658413285987e-5,0.0785723764763938,0.03302020142442309,7.921113421777461e-7,0.027169387359564805,0.0008176406574284255,1.6658330302799226e-8,0.0018338852136476323,0.0005083819961365303,0.12742155993552756,0.14546552305309393,2.7514491930043878e-5,0.05431200879354989,0.0001731659369806212,5.005793349544875e-5,1.359603338313365e-13,0.058704824199004246,0.010750620010037307,0.008579034275992358,2.7330101516406812e-12,2.200852704382098e-5,2.9716097478716667e-6,1.83790551272323e-7,1.0611462176050968e-6,3.6595864851220626e-19,0.000309833948945026,0.05007130495477126,0.002430769130963763,0.0011029508313681504,5.55168547958202e-6,0.003255598482866436,1.6812011946752028e-6,8.522509186320648e-5,1.7207493386366124e-7,0.06727387199459703,0.003954991545570688,0.006677522885738979,0.2469270701790824,0.025495566700552523,3.253614163847813e-19,0.06217380873638981,2.6343303608120208e-8,0.01927950102692334,2.32769347096012e-7,7.863635439727383e-5,1.906338551247117e-7,0.0003485284671344999,1.4788832608978112e-5,1.380586516977623e-12,8.305808587549243e-15,0.07243018277835225,1.8429211820026429e-6,0.040663778224535,0.1899166171447194,0.004344201389084523,6.45641196026045e-8,5.235348289063892e-18,0.4146238764106502,0.03252167367905645,5.880947933880363e-6,0.00025525064212130204,0.05096198271441842,4.973396445111006e-5,0.00012713648937931574,0.017925809027781053,6.333323904331017e-11,6.850577891958006e-8,7.647281874864745e-9,1.2725260088375466e-11,0.008034487350350816,4.912132545305013e-10,0.0002136409310144884,0.00038945605634239147,6.503882134505163e-13,3.126533728180475e-10,7.090369186079662e-6,0.03970286116919191,3.5415917747435783e-8,0.0009103835866292579,3.2040965970382215e-7,3.615874141540317e-21,0.0018545416621563444,8.877577344522957e-13,0.7726682306418676,6.255936891263915e-5,0.24429277883115866,1.8415834302225502e-9,0.009170658446800525,0.7031151970207506,3.1097066314640293e-6,6.202769545056553e-9,1.2771311634819387e-5,0.0018476603947546464,8.205568703231003e-13,0.033054279290353414,1.2472633473881295e-37,2.194488665319869e-5,0.0001019760349133143,0.0004051223499174759,2.3843634645588773e-7,1.0798834994602248e-6,3.299422835787256e-8,1.430618598002662e-17,5.3201331637748434e-8,0.021516987286472763,2.1454468011354944e-29,0.014680660756662143,0.05607128323719916,0.0440114519249087,4.058758396461275e-6,5.87134884921406e-7,0.03579883882583755,4.0200465020742006e-14,8.204493595841271e-6,0.02051617291469258,4.005776987142427e-6,0.016377318385782887,6.802048522462234e-7,0.00448342979704545,0.0001437869562739259,0.13900750524888622,5.466266610909101e-8,5.897575908340888e-15,0.46922939387595897,0.0058583916872042945,0.009208404589585361,1.4694645737907903e-5,0.05243441458720245,0.11554041418213294,2.8971905451495605e-5,7.558451564633775e-14,2.7936402865796214e-13,7.813166762454041e-5,0.0018480238835490471,1.6321491496888146e-5,0.00013352476716820905,0.10382684797764004,0.0003654809382291874,0.00902193624883248,0.00019167919506554368,0.003473405798581257,0.0014044017728694507,1.0203779273203075e-14,0.014581533670685244,0.00025479788860527413,8.720305984642098e-5,0.023770551549594787,0.0058334502139024014,0.006918412091665738,1.163414559084382e-7,0.00025727337742128257,0.0013974071729846243,6.921378214259665e-25,6.150395004203254e-8,1.5139792715503052e-7,0.001030600995595618,4.891428731843337e-6,0.16527319700511708,0.0021300128133867288,7.455776245407705e-6,7.844543187127713e-6,0.008475070384310253,0.023072721528677155,0.004550850245979514,0.0004950284566014722,0.00033557158214184146,2.442644032369234e-13,0.14370205814305387,0.10913989851316909,0.035773169170112196,0.010069038568411084,0.0005680775314325581,3.986471913556571e-6,0.003366587385285195,8.645515614636787e-9,1.6011667523210803e-8,0.011029285758313084,5.130119488396424e-17,0.01642098721743017,0.5699405941414148,0.00021279586976753726,0.03921731215353384,1.1990549596243934e-45,6.247159896291696e-5,0.0011452441031479675,0.0021871312971706654,2.0020832679132563e-21,0.00020550746116931339,0.002562181260944509,0.049063668714159896,0.21235206700223422,6.754553137023012e-5,3.313962779114888e-15,0.002303363641977391,4.104448783320966e-8,5.058333967048777e-8,2.8381148347432024e-10,9.62922787910333e-7,0.0002467347540002504,0.00011930698729278209,0.1901720391296161,5.499472640243636e-5,0.010187207810979019,0.4510063179143109,0.04644677169126815,8.578279291065833e-6,0.0001262377800577722,0.09139825440091963,0.049551497187383664,0.0015630116264637034,0.023889156775795187,3.4145138629211344e-20,0.041462595754441056,1.2925715354659523e-15,0.0056506411868459845,0.26806196636769286,0.08452179919781524,8.067474790665837e-7,8.770247362691294e-7,5.2774367958183405e-21,0.26605079419271505,1.769554203491946e-5,0.2681789394673235,0.0007667928089426621,0.00014600514335359836,0.10936546568654334,4.379164035890945e-8,0.00032453469618172194,2.9558175739151195e-12,0.00781579121924862,0.3428691272037846,0.60417964407932,5.0548452218832715e-6,0.43316711302141925,0.002982992372313522,2.3953790184023102e-8,4.773608724135901e-6,0.0006732406445579128,0.005750441129904697,0.1339005078904687,2.184847541793508e-12,0.2014406018298145,0.23426270568754132,3.6228976423839426e-5,2.8837501190178323e-5,1.0726309266007065e-10,2.5779423759268993e-5,2.9423981936456086e-7,0.000946438632556128,8.407166312468067e-5,0.1705426078385185,0.00023538139930930722,0.04184181136313553,0.008346975106225035,0.5093834457983479,3.323061337058052e-11,0.00104298097303537,7.2324688088715935e-12,0.04974284475738652,1.9342617695762753e-13,0.05072289408353377,1.073923706839452e-21,0.027801641584168004,0.00043686112730683785,3.0061734233770113e-5,0.00010369467975352438,1.1851218759305146e-14,1.357980765832321e-7,2.847910650543683e-10,0.0012071638858273843,0.08995057790351557,1.1414923512850771e-7,6.004290556901441e-7,0.02188128524434394,4.042738840361592e-6,5.656565204087021e-5,0.5732991825034315,0.0026923889407886583,0.033305765240319654,1.8037412502411567e-13,0.10571863834730945,0.0010334549229481349,3.1411081907110415e-17,7.713350661866567e-6,4.414416571574282e-27,6.373196479545269e-13,2.287423592320158e-5,2.0461983032649452e-7,0.5405174390713606,0.06336739288867455,7.502270803448052e-25,0.0018777428512616828,3.2161837441570585e-16,0.35907394168370876,8.026939730405722e-10,1.6961233623339493e-25,5.267418533382811e-11,0.0003122364534142493,1.3892199547714214e-15,0.005258744957278301,4.147509986538232e-9,0.4054431735640811,1.1220304738013615e-7,2.9959312132221683e-5,7.063444569406937e-6,0.08492656448689793,0.00037060214529020797,0.1210507104531948,1.3464276252891058e-15,0.1649275958043301,0.004943504920825887,0.03668335008330243,3.0333379103511657e-9,0.14540596130213768,1.0544894230739872e-5,6.7118889204357734e-9,1.4771868172397228e-5,0.001095758498500446,1.852073823541005e-8,0.008195100191048594,0.028049739004417977,2.6923333028651785e-8,0.00022257131098143962,1.654160493632517e-16,3.326568467277087e-8,0.06305167679276866,2.6066884726537407e-10,3.041450414973081e-14,6.735326142107349e-20,0.0009152991036227797,1.0653902359119084e-8,7.183171182466266e-6,1.9675148113157986e-5,5.396489710975582e-5,2.520784252834768e-6,0.01848826486294203,2.3561929588768165e-8,0.3653935479907985,0.2696768241399174,0.00422799560756502,0.5421338159202057,0.08457882926226971,6.114692779515439e-7,0.024233399620958135,0.03339112127613313,0.0010727710231165232,9.88578595062755e-7,0.007220268225092839,0.013560678574892657,1.9004217414466625e-17,0.37461072639379905,1.2504677943856387e-7,2.3602013578741524e-8,0.004313141404343509,0.0007852244400759067,0.0001515241086548262,0.0003927954704883241,0.004225035432591771,1.965505153615075e-5,7.740381722726376e-5,0.003946870863459649,8.896769258004394e-8,2.051852787983649e-6,0.018584868819612976,0.0648596917886546,0.0013371397553932113,0.00021890095410135378,4.984953416324123e-10,0.002486411587511126,0.7397569242071043,0.0006906301851693189,1.9944739354068995e-7,0.003719204713341082,3.0163093309292436e-7,0.0043306584441804115,3.628017330687529e-13,0.049531801540690125,0.009388030992251824,4.072971420926768e-7,7.643510987815738e-13,0.039986170623021663,3.817663467582247e-12,3.3603004650826405e-6,0.1649039624210124,3.338268585307282e-26,0.12470269933188882,5.337981955556488e-9,0.6070002236563231,0.024421376690848866,0.0841074200865516,6.644500114063502e-6,8.709722832181857e-16,0.0002529036075445962,0.0013791080460586226,0.018337444260978813,0.0004739399419286354,9.424898601918498e-6,0.00355236001309483,0.009436805431812668,4.7774957769576245e-11,0.0008423264216153648,0.3275995138820645,1.7683974701971111e-6,1.5315779064968104e-10,1.1564897618849482e-11,0.0016810611470939063,0.0280047232101082,2.0095262870214237e-5,0.0017416194880978647,2.232087293777357e-5,3.0879550096802194e-11,0.0007136348445155793,0.00024563972298904447,4.002169807750406e-24,3.859965356853401e-27,0.004402917364511648,1.8866421511432117e-5,0.0910891337644428,2.62271631440787e-6,0.016699476271569924,0.5082667444584298,0.004508321385651039,0.10962563198782917,0.25837404805566694,6.642105661530333e-12,4.983616368488531e-21,6.259159739395974e-5,0.0001573299702276384,1.508459961725476e-5,8.281870648860505e-5,0.24311488786844399,2.657262809147173e-19,5.850578188685878e-24,1.9476679647216023e-20,3.683472600642124e-14,8.300599690673504e-11,1.687279378430831e-10,9.30086992317038e-7,2.402182650864978e-9,0.027624214859356604,5.2205107612826615e-6,2.238764806863871e-5,0.30567138215728495,0.00852150095157866,1.167852327408068e-5,1.0521942929815102e-9,0.15598359070303927,4.9932687239288856e-5,0.002808451018020879,0.0025437636617416546,3.867143569543534e-15,0.0016824770509162423,0.6461148023718921,4.700193567328626e-21,2.219558280621035e-22,0.013106847731443246,1.7008994643673476e-9,2.152562462408224e-6,0.0020530774614923655,2.204709895074523e-6,1.9726678297027454e-8,0.0022725044831820303,0.00026337957699707306,4.6668779913759606e-5,0.0071968412226687305,9.678093034471917e-6,5.455449503501399e-7,1.7008766412448833e-7,0.0149444440989637,0.00044885186668847555,0.002907808827259787,0.0016539428829382107,7.928466146545692e-5,5.238779438404523e-6,0.00011637760442872186,1.2616001709971331e-9,0.0031683633142083677,2.8577041489510775e-5,0.00015606073341461454,0.12493589933240835,0.15583843970390762,0.03112338808610094,0.0016118791551325217,0.10226656873134055,0.06622209887086754,3.74537197569863e-7,4.226974934318443e-6,7.831377505385738e-15,0.0005229595673835469,8.59211846745415e-10,0.3527852158530779,4.525616168838753e-15,0.0003786907127108949,0.00023523738068030652,1.0138987193530313e-5,1.5311111719232219e-6,4.7291174858863446e-6,2.167945236871795e-7,5.808964801909857e-5,0.024364238351169458,0.00035619547747843604,1.6052007615801204e-23,2.4536509551791986e-7,0.10611474968768031,7.982784938223117e-6,3.622342896363167e-9,8.400201603970894e-6,1.9501543777676875e-6,2.2741446504132913e-11,1.484422574526108e-6,0.005552121640932255,2.1231287324510098e-5,4.722411910062643e-12,1.879979356790566e-9,8.840311858556998e-7,5.459932516220556e-5,1.5259974817045534e-7,0.3883709331478812,0.00020418524241597224,3.526244887245936e-6,2.3810110926622815e-15,6.806251696193117e-12,0.20174640760926743,0.000686438328914302,5.175682321933208e-5,0.16970128648967975,0.23468765326595062,0.2330304466881501,0.3232635677598356,1.9208123247138067e-9,6.85733669530765e-5,5.075352148361486e-11,2.6226258707137748e-20,2.825097893910582e-7,0.0011421640970123487,8.766305517538816e-12,8.174044748673549e-7,0.0008906911220401675,0.006626469641035217,3.7197584610266647e-13,0.8487290596950958,1.4668053083051583e-12,0.6265999409351561,0.00033315444590762257,5.984994035150851e-13,0.06190945305145932,0.02132161474604261,0.0017187207822565726,1.520303451237127e-8,0.00113526371025769,0.01269415378136481,0.14939616183085735,7.81231926833006e-8,0.00023664879805246195,6.190469865907359e-6,0.00032482863177556485,0.03635211600800997,0.0012234399169746442,0.6307401372375738,1.2939269666115055e-8,0.0005892976112865185,0.0017963192054222044,0.5190788284105079,0.18480145866368686,0.09529603948336278,5.996282783219393e-7,4.158291416804729e-5,4.6939775028737584e-5,0.001458596023516106,2.0030680010581068e-5,0.544493170230304,1.9057605194953232e-7,6.621429190917099e-6,4.005628355062505e-7,9.74079603772746e-7,0.0016941407893946174,1.21362895834373e-7,1.5516392389024768e-5,0.006626090688521988,2.2937471296155118e-5,0.005662315442701104,3.396566736883483e-5,0.03346250262216136,1.1292201787177558e-8,0.1202728866340809,0.0004467200934633816,0.001903589080955774,5.73822863312829e-6,0.044466855517719506,0.163500216478242,0.08613017683429727,1.0343284678563904e-5,0.01972199712768003,0.030632350386254226,9.654862386789166e-6,4.030038498592616e-14,8.307939027998281e-8,0.04273537216957481,4.911154056942759e-6,0.001446758492932908,0.12203512571230957,0.7365843893091704,1.2386863665002797e-7,0.024055106033681575,0.00016634157554084418,0.5761559505869392,4.509908450739165e-6,0.06917024520751733,8.05874988469979e-11,8.776191257216424e-5,0.31987783291535826,0.000453272657854642,1.6238470100952232e-9,8.47163545349741e-5,0.0030728747702974983,0.002067827362972803,6.765820458649928e-5,0.022679161654748346,0.07556990744308578,0.15324410052733548,5.889587064875472e-6,0.0012160649784059175,0.043126730330692295,0.0029302693070067465,6.340423007193562e-6,0.18383427748376538,0.04652853128340533,0.0006700820830218349,3.3429540420215116e-7,5.43956342695987e-8,1.943150266086355e-8,0.023843347524831672,0.0013505521282731303,8.430311640787828e-12,0.0016540650956376728,0.03115082600852026,0.17929727998456763,0.12543245169986436,0.003501833653802742,3.156351340838718e-13,2.955954813886204e-10,0.0006799535263554662,0.003077150571244484,1.1456597669020874e-6,0.512514774190996,0.01733416344746381,0.04774942263759767,0.012014098219590402,0.01981362951593199,0.047207061894440926,0.00013248334481131218,0.8434048256814093,0.052874133540308024,0.010497017399423575,0.0011418837784284046,0.02166562306272074,0.02833097487887558,0.0029431241335877768,0.0003435951065508843,0.007550928419722265,6.9400867864225195e-6,0.002314727344749013,0.00023763218266853594,0.008575671533055988,0.12350513443867307,9.578351564250785e-9,3.965264177232421e-6,0.0005699440618502729,3.033093306957137e-6,0.17152737148506722,0.020623332140257543,2.8812748770512156e-25,0.0033640998671728988,1.8179778426828262e-5,0.0005013221083303445,1.3721062897842526e-22,4.301165650522968e-7,0.0005429608453971996,6.917063520064187e-10,0.00019605272283018874,0.009224333286842946,0.8657075791058759,7.246366245469149e-7,7.647716957334701e-6,2.211182882168458e-15,0.0014027588628045735,0.006568995987976574,7.69427482807084e-5,0.13548948395592078,6.709293986219979e-6,1.772306665086117e-8,0.003002127883181356,3.474864219913357e-13,2.8404656574751014e-5,0.0012554871412594451,4.996947189949177e-14,4.029265919294581e-7,1.0550265593997508e-9,0.1519326834155059,0.0053058265638744155,0.0009319981700448919,4.6932991083915345e-18,0.00016718387421313065,0.042651605003193156,0.06431966317945081,0.7885671332391595,6.34577637958665e-5,0.052808748096310414,9.162391351504193e-6,0.19308475968067107,1.0784800859496285e-13,1.518282121386483e-7,0.0026293561484915916,0.36364745498785805,5.287932765599617e-10,6.1826566460445476e-30,4.498186359547481e-8,0.18159970612248819,0.0019348719369455822,9.577537059374533e-8,0.22604720226344613,0.00023165451606045964,1.4033674428265665e-67,2.868265727626257e-7,1.37528649412346e-5,3.77628425122343e-8,0.4450366794080955,0.3581933415572012,0.0041624956421894305,0.00021564588858569454,3.683537444327509e-11,0.001933615237725587,0.0002907185278289798,4.411411187779461e-6,0.07488256455503622,2.641331498883363e-12,4.399352667705999e-6,6.0885971508441434e-5,0.0071389490161344075,6.112362818823286e-8,0.7043649888066512,0.005890138752377666,0.0005023164702256879,6.6260369067838605e-43,9.547325061352847e-8,6.532548397377069e-8,0.33697575794997986,4.603811019714101e-8,2.8042672382050747e-6,8.381831398858376e-8,0.013200016585948972,3.8935393304823e-10,0.0020588173880302764,3.3000810766727755e-32,0.027938891813565167,0.027190917351794526,0.14574528489919922,0.005480402644875559,0.3200126123260912,0.022944941318110673,5.78509475995569e-25,1.734952570284568e-8,6.905441766687961e-6,1.4350360402802086e-17,3.186233679449755e-5,0.03976467455090055,1.9574083537179398e-5,0.000955209032104327,0.004277297461222675,4.9196773943684016e-8,9.55927315168444e-7,9.73290973011601e-9,0.0013383723551078468,8.674771280786934e-6,0.004175508388297144,1.4645210387939904e-13,3.578844616896525e-12,3.233793929933894e-5,9.761989985476357e-13,4.990525559414943e-9,0.01763467482252352,1.363506098716914e-10,1.6064616360655936e-14,0.0776410719360309,3.128725941365327e-13,0.0274027222361106,0.0007935859616501207,0.004707859821420411,0.4212069055907677,1.2783930952660182e-5,1.574362427882201e-5,9.927938621272209e-15,0.1364418567121379,9.608798793768911e-14,0.01717917736615855,9.52742114059585e-11,3.7693907656488046e-17,1.4970579744945454e-7,3.577378763891511e-5,6.667191076810577e-11,0.00031584037863625404,6.088754626181882e-5,0.004925014904396943,0.01726753356378821,7.239810916385509e-7,0.015549691196274506,2.7406228576474644e-5,0.004646857992188489,0.5973612451755813,0.00019255177915727397,1.8031919997326216e-9,4.850784165673074e-11,7.764217854381173e-10,0.14214701516242154,5.576238946621353e-7,0.2233028151040921,1.3819316338596408e-5,0.3199747253348462,0.00023010334310928835,0.006730198868118649,3.145588206160074e-6,0.00043475672355183727,0.055428611067599845,0.008802195894837023,0.017214961290661284,0.06096546311848625,0.03931372402725461,0.036575953419073014,5.524834659847854e-18,0.5291961612378139,0.00895628913208998,0.05249829407142453,0.001611956273726632,0.0018896405323843067,2.1736927655463387e-6,0.007027089308032073,0.15901931035575256,0.005713032380942718,0.0001843230803565102,0.008557736142509407,2.9192643774258594e-6,0.6369326067640483,1.8665771982575877e-8,8.769256472710806e-7,0.012557435012162464,0.0013758024718701569,9.879844515309555e-8,0.007368952175529409,0.0013218447917185008,0.002175435795230428,4.8423024597364185e-5,3.8618241347590276e-7,3.723452891633547e-6,2.4377496654286647e-7,4.754455439185326e-19,0.00566137592244746,0.005562978876233815,7.425315793025399e-9,0.007619030622129231,0.00041546980189922944,0.008074685740562141,0.001334065138292665,0.002419224734114754,0.0032499535250828616,0.027266414020450488,4.0185950231452595e-10,5.996831880881374e-18,0.07575609908128887,0.019410210742947576,0.00019765238585314694,2.91566632585251e-16,2.1674093536635138e-7,0.5315716643699953,4.396953383504116e-6,8.55253685884453e-7,7.228424396378857e-8,0.00015649513732988275,2.98769750110947e-11,4.520283065450054e-11,1.3932257783969885e-14,0.009838961087432454,0.001306241986534323,0.38113649838044805,0.005286874789968013,0.08770582505405018,0.00022741209454678714,1.845311030300352e-6,2.403448437650603e-9,0.0012769845593980352,2.06297370425502e-10,2.5371117466769735e-15,1.0833819107609873e-5,0.048858559031253065,4.531001756343449e-12,0.016427770285048535,0.05071564234630951,0.0012136830150755006,3.4925413882928886e-6,0.13222344181797263,2.474592683159659e-15,8.926579118456886e-8,0.002102669712760525,4.416975294915412e-33,0.00024825650001101515,0.30601873073002206,2.650691913051122e-7,1.6973796433465154e-10,0.0005323870387862108,0.2954593883086582,0.48563828508945367,1.3942412894546444e-5,0.010542326622299779,5.4900668969116335e-5,1.1320000601218383e-20,0.2041369321495736,0.02045697250374039,0.029108639573130188,0.0010978238542845662,1.1600756046326933e-6,6.277972081454024e-6,0.012831350762851097,2.0287733709460858e-7,1.7574010009810402e-10,2.048884078006598e-8,2.95284842802757e-12,0.3560444755674995,8.692481609089603e-5,0.00036438032888023227,0.028657905705984664,5.384414204314653e-6,3.728389948705328e-15,0.08870986920521093,1.1405907610163187e-5,4.5508237963029566e-10,3.981971026551138e-5,0.010287100868812127,0.0005010655188131056,0.03249968066928759,0.004201893263443475,0.2914221664849464,1.164874861539527e-13,2.375082685199438e-8,2.5940620274636174e-6,0.2759687473132609,0.23898477875133725,0.011485630449101617,7.526252694269607e-9,4.1716763129773696e-8,1.4496062854009214e-9,0.7447393949057656,2.1030663087217768e-14],"alpha":[13.014981980282068,17.87043238569787,12.399777153125664,12.946660919313281,15.569446595085964,10.445209013500811,16.55297104574109,11.469569240517593,12.092391452084959,11.483936555207308,19.910892251326324,12.279118845900106,19.463111764834586,16.61994008048754,11.20141577880371,15.225016630527008,17.61322585634875,15.807803066831717,11.978602481371235,12.768482983659343,15.924844001073645,16.05091712417443,18.927289500588927,15.952398578685138,15.238365166222367,12.935591830368576,16.90543055776645,15.88286293542839,14.09013675335607,16.21270716873046,19.70406406608496,18.155612338295114,19.618496348822745,15.41144199468908,16.285234264558433,16.655896612091723,17.665920115733975,13.743002393655972,13.364396790840935,10.226442869816943,15.572881323593261,16.041929507961083,12.144888676541154,15.074800945466285,19.44266872025132,13.350171049898147,19.036913965381483,13.78643563356448,15.807219469780176,16.648418826600263,11.478234325714107,18.791757869123654,18.22383268759399,11.778621619282069,17.65975362555271,14.983174510995866,19.65543506585763,11.399072316160133,14.390496832435602,13.84321304093996,15.471243804719068,15.67277225025624,10.555837953913896,18.954371196872422,11.446830796040084,15.979909944433238,19.489579365348387,12.70682835224638,13.837887795013497,15.343612384161244,16.780752523795933,19.300049020487236,12.35399548192132,15.427563241494177,18.01967186022317,13.66728534577473,16.559862666773817,19.211995796112525,12.509214977670753,18.803839758350833,19.282883506811324,17.00042244862619,10.38761871084873,14.45066460562417,10.76796444039295,18.789376862136642,10.266972042076375,18.33110256382765,19.082824864675608,19.768066159574836,15.806696742552113,18.12797564887668,10.202178511620563,16.282754339203727,12.628133383284066,12.416395533869997,13.78577731897192,14.308170635136708,17.681875198265367,19.979933980400247,19.101655846175596,15.434662651948184,11.86569946205811,14.008859746434945,16.253646323619666,17.060561658294198,10.262888350830067,15.945003021898652,12.059883781351875,10.937273529294217,14.81456687943103,11.230293951239762,17.995054698399,19.090197562771372,17.096473119260484,16.328496346136422,11.735411372976435,15.46342490598553,13.332424828173313,19.6133465626878,17.312541821208164,13.556297183021291,14.22454651788954,16.589764890676115,17.376824794302028,13.152930243945242,12.55155882702645,19.141944345397153,17.820703597567217,16.10881412177471,13.184591024948187,18.766989882610147,11.738962735907934,14.308822210636471,13.253454376610703,16.036538164664805,19.249725591029847,11.404516552248126,17.14584592050248,15.208497626043446,15.917812954458556,11.730238477647614,19.684282360804133,19.311802704049732,19.260549048139552,12.012959931830707,10.227903344536042,16.322974175363925,17.59898316702347,18.17684570605473,16.745008205484346,18.00593402881018,19.897739545047394,13.60003735732359,18.770012270274403,14.40328451121376,10.376187154986404,10.031650775826408,15.170092831251452,16.95124240482767,18.37593189829695,15.054527267480669,14.982781222192772,10.242253631257874,18.025407702482305,16.277553373319975,15.804918978090047,13.790749254455285,11.823536185141352,11.166160735970657,19.063932300587517,10.632906834790898,12.397618844122821,16.425360008178853,18.93693010500467,13.960950083553762,10.168576002431175,10.46308357749238,18.14709049505098,17.485179475532952,17.928095794789932,10.494631722394539,18.249050042679713,18.76425653605733,12.30973100274942,11.056687040314015,16.090393095010235,11.944250077277301,17.952163875122686,10.785757810392681,14.424059225006335,19.562924666079095,12.571506701021267,16.125659085288284,11.988452079142316,18.82260807923914,12.046818118935406,18.087565666842483,16.425427517433235,15.233396478944643,13.074305328382106,19.270827081637858,12.69387563737327,14.273828890789527,11.604983983891499,11.778903516371624,12.3088125138681,13.662345298442528,19.938466932498322,12.27749038391795,14.16572547944381,12.268588461127589,17.951110667897773,19.216782720347073,19.019304730267493,15.84870738464327,17.203442575485667,14.427961681013564,16.19463422312613,10.441117012110134,13.656360787024473,12.607999396692794,11.137285463078964,16.375253412545742,13.38476569162066,14.354705859589744,16.808141278542983,15.433135805236605,14.235483536453406,13.283880415852256,18.566439580466948,19.217768466113966,19.860124879227744,19.784046699825367,16.84086897931063,15.574477212532589,12.907539819995513,17.697075439716286,16.373013976117196,10.33747839516556,18.363664422079488,16.939961598340123,13.958991049946539,14.400869892225028,17.96375858629452,14.879984384305882,18.518037405846968,17.27244052625564,13.281642932873366,17.13051045091788,18.585115172719355,14.344888776318625,13.60156036566233,13.224580873494705,17.863805335152758,15.627352438661774,13.252928117861746,18.09778788329311,17.703868308805077,16.006786912896118,14.62179062174829,17.736827777724066,16.88772669239917,13.67883507303495,11.84974672709105,14.503893178914227,10.745669465351327,16.594341102758108,19.105432297904898,12.072504868098681,15.379911224397077,17.072459781387426,10.327617953288472,14.652006354006176,15.66876947398936,13.085086770196694,14.885656781555284,14.141624465960884,17.46922197691425,10.180573508594621,13.960134105577088,19.263752621349134,10.444574925819145,16.763408424922023,15.600009261400407,16.002743833795904,15.52792182814079,18.39401232474159,13.292696937665971,16.20230341992251,15.683071535865542,10.784703146186835,19.040805006701184,10.38596222284614,17.412693760624517,19.434281715582422,16.38136035096834,17.791290560450893,13.11868797793598,10.916172112967145,15.244441004186962,11.186263330990753,16.089316336403407,12.013998208310854,16.869172434572647,18.851911247281876,19.95445832381544,10.830183557442242,17.875190403906885,12.186112784284326,17.292763062534558,13.158919801236152,19.48681872273351,13.320712538269655,13.622522394943724,16.857702495053402,15.222128080226952,14.018758224996756,16.63607289987409,10.243585620104827,15.375232854869747,19.86416950558003,14.062419115456638,17.39375124223512,12.059661405012047,10.907443895368868,17.635842837122315,15.352840533120919,12.242295861732263,16.290030051718674,15.758041082231886,19.079965385404186,19.10675219441051,16.316194005339106,10.088200814915432,18.188518943066946,14.747382903744981,10.048501936843437,10.649985845413415,19.320894152451906,12.417147757725512,16.287776823577875,15.065763561540326,10.777983266375802,17.955058465551755,17.532731096792304,11.954703583333671,19.96859781015843,11.82776068594813,18.047299598777105,15.958989492863292,10.346491948291476,16.12806464931368,12.54693416919866,12.880673744940843,10.051079518319453,12.946597916483459,16.948018650910097,12.187381942130319,11.241099334438813,10.651942419614432,17.913655397614274,14.054217628316115,17.235541059830883,17.81054282188169,19.238321614861476,10.428584478143028,13.345519017636553,14.149563111108353,15.52605561254702,15.456392837204076,19.080016200652636,17.62448194127571,12.929472795200326,15.11917739941035,16.749333646756547,16.46397554308607,17.800488046104398,12.869551374382539,13.830747783781439,10.186687279760122,18.874157042044846,15.296659803511387,17.828773389204105,10.007176602591974,18.749358052774145,11.131348737872145,10.878061296224308,13.858823938667328,10.858884388950854,15.788203027175756,11.038175897719258,15.039313026270118,19.7763623022566,19.53974688180397,14.742980575223934,19.021008501387897,15.633245974400715,14.8867068426397,13.705882425454984,19.85703638616695,10.895846194293545,13.853542658249754,15.664231282622351,13.902167137084675,15.441930704892439,19.009028902361663,19.688959190162457,14.101553474863714,14.147032900042142,18.31957287299488,10.104539335718592,14.42492399912432,17.48705453517207,15.63948850294608,13.634981010239255,17.61398294961002,18.836895774212124,10.252291643276362,13.13542254809457,13.089737131703343,11.870959108296724,18.842397498586877,14.901280058956932,12.1890623531152,10.072971933105837,19.19285419893015,16.188612276025513,14.031096117940328,16.628287077990176,14.581277310252078,11.672016866753157,13.192666365053201,19.23845710025294,12.355527107291074,19.809294518046578,10.86277374384644,17.65298322389701,13.42412620040302,16.424696382687685,17.28633959721508,10.000055360363884,12.982118662110299,14.845014012467923,14.278846278134322,11.900227380878876,11.895054393580498,12.035995559423549,11.30432517892652,13.497024238392417,13.589298549699993,18.245955507703226,18.204848160841593,14.43098299339006,16.738041346561214,17.24353401752537,13.326645565854252,12.502047807174305,10.05703838357845,19.49579769854473,13.16849204246349,18.084045748229904,19.490885884041614,17.655463558690442,18.155932952807817,15.118981283884365,13.878792388441505,15.926664402307335,17.667528731259914,12.335126905629334,12.611968428614698,12.670801116713054,13.095574344969865,19.526086708991485,15.244412943546205,19.1123777913976,19.324080952608686,16.226946469844236,15.503936850524349,10.734463815378783,13.182021589253077,14.318853495339871,17.281970715234493,18.839903134648942,10.295721653685746,13.767742476118736,11.076397739631334,17.353333565878025,18.19502707199985,17.28126222203342,13.603642202589015,13.864030776595149,16.418108300459416,13.187672711391674,19.771159328481563,12.156661496009102,17.64554039430563,12.424628410281397,19.435481304580016,15.878368249200022,14.770271714163034,10.473719636797167,12.561132529780322,13.588413074691452,16.983306607619483,18.18848688339714,15.658195384435405,17.979111204283832,19.708221139242813,17.554166419099033,18.900863259785723,19.934699068405603,18.51711660044061,11.417895626501489,18.53092173262081,15.82378921742823,13.196424233167736,12.914814737331765,11.588752439394627,12.16653153496333,17.748072569121774,17.92490081522144,19.116818320425494,19.76004499432009,14.740531882604838,11.688077454470855,11.015964070600404,18.79970489736491,16.33100859513326,16.861597243129165,10.801634863564146,12.007269933921128,15.011044464586238,14.088215910143067,14.983789698901838,17.840720564388377,18.130122005959446,13.632475693765356,16.018219522608014,12.776036775622813,18.80368575782791,19.40378861882597,10.006056121058045,10.634206109710938,18.820625795837707,12.291851132470782,12.627246649885798,13.932566584154856,14.827976269429804,17.062447392174075,17.83132776156254,18.379372221305957,11.555139271060957,18.816604344099826,13.571689072395571,11.337908447320611,15.039912647924215,15.099170461003393,10.390584505891685,11.975440952031635,18.19955152797047,13.462770117980178,13.177696462958002,18.530698389603614,13.960889075008458,11.942858600751114,12.948186419377844,15.079685211142316,18.658618448219478,17.574510167726253,17.354759002128166,11.042703282718477,19.64952627159638,19.600284693756368,17.61513115821615,17.680572886249962,11.80196831813386,15.51378141387308,18.359029006166224,15.533436549998402,19.113631787638425,19.534079654613173,16.633089919664123,12.528301637396925,18.46227181632725,14.178940449006864,10.164464174144506,16.245018628194217,12.52410796398851,10.876364524532056,18.10179862755677,10.570424048832646,15.848765033374546,17.08076352392902,17.170134815266938,11.212897756100606,16.857419772824613,18.96172610003581,18.741702555674134,15.061794533042905,16.55203224067653,10.968630506017389,14.257740165708253,16.2001173513124,12.559868484015599,13.103420370003803,18.663190229634154,10.410107067260181,12.730525579909383,17.498934935635653,15.727051776140005,11.582490190350077,15.920450850255596,10.841052669633589,17.73556307689514,14.243889676847644,18.78891704144062,17.54551581855832,10.879912905105698,14.243248729640412,14.227110249062196,18.068009905453312,18.088575242455192,16.517466585207742,15.943830459935533,18.292186625221028,13.202572563198425,12.480644965279936,13.969790168187455,17.232833700211426,13.085778239301693,11.95205357692053,17.488544556384817,15.597484225269211,13.40622722366832,19.473765954784255,12.650766179148984,10.728857562559623,15.513833381083941,11.944111581959906,15.121764126208543,12.16507113901892,15.856262560704044,12.724355806528862,17.594259882829775,18.05286084610171,17.041889898208332,13.826807750719311,15.063770106191342,12.004602900544608,10.86592517927792,15.718961620169242,17.421323206660865,13.416930516760058,10.251864652763231,19.102605753756862,13.848450680033599,14.982024898108893,13.35219623909191,12.217128635638472,14.316855587154045,11.052404537961351,12.09112331139259,18.176092911565505,19.973125783921645,13.474780780570084,11.980509241789468,12.72699392128516,13.84435510488564,13.994401976181312,12.88923171813131,12.340704481686739,17.848178495621465,17.038811482195477,15.824738909473574,12.404668410398287,16.14494183337669,15.115287641715927,17.7296006994112,17.501434392483404,14.708008648779895,15.887549962326666,18.79804516933926,11.409708018138652,14.09511183508592,19.363779830426644,19.31571479786783,17.26656317279332,19.698837887816133,18.522004253420192,19.20042097171831,11.186700881580622,17.244113427225507,13.522501705153507,19.131126460587655,17.088560370128576,16.102461864520734,11.450539369174662,10.453859870238993,15.053485693912926,11.080826292396084,18.303488588586973,10.826385976878875,10.38495173457913,12.779618696069539,13.416845519341754,17.016259868017062,15.758699535218263,16.592399136219882,17.047912239535336,16.146719034625875,10.485183071468779,14.775918560427439,11.39817072253048,16.106986792007262,15.576542676593718,11.244800296825986,18.803819008338017,12.274230985868105,16.851863231695106,11.201739975082255,17.252915940643373,16.426247537947027,14.510681961969754,19.381750960031162,11.735993580701074,16.035361287372005,18.055201476497924,12.241475128051288,14.104173949387073,10.024614274393633,14.131292182891153,16.613081025886174,13.571549987947131,10.880752311572792,11.172749616938072,11.14368814368332,12.746041793021377,14.720729978592162,12.02758244788207,12.698779908254568,16.119007532129693,17.395794596804052,18.25335037161672,18.06068419934782,12.523803002932883,16.96449680996242,15.351094508022234,11.840396318643716,14.777130713467583,13.315385599008403,13.717197710642806,13.159793956227347,16.477277883773144,11.63791574241662,11.684141475289474,12.651471053613783,11.581687605804413,13.045390289384102,13.609405279593565,12.439272073497868,16.240125372568073,12.713327780115812,18.52886524402819,18.795529058703764,17.931920659932096,10.5577755094611,16.219369296096197,12.2220225264649,10.814477099181513,19.683805798023116,19.65002478742746,16.49260919649704,14.934596495680294,11.519120143873824,11.933256437953847,14.950307951869002,10.72943227158608,17.206493922817025,19.522471672144775,14.452441105540977,17.79610865501358,18.949491588828813,14.54566296325523,16.69230245691523,14.441337871556186,17.151912268711545,13.833444451409013,13.906379354401848,10.082516631778237,17.51127844327179,18.30492279914929,18.759003740166882,12.54483510998674,18.735402724301128,10.885432567197926,17.886283384097133,19.304077305578673,18.605530574856427,10.575746558617782,16.94179900406909,11.345155042470989,17.77323177928584,13.413820315059404,13.262257206844698,14.727103777866057,18.780160958889567,12.436286891335042,11.72472129108116,17.182298066603106,11.351102940534531,14.34756965834876,19.754444265440956,19.623189368178195,17.0697646014629,18.44865306817685,15.307999100499266,15.309350026833764,17.14143293978073,19.78367240580046,11.060517960501413,11.017607669062755,15.004041306950542,16.14509529812116,15.846915461621851,13.610922077507597,17.352183107483178,16.166190311471336,16.899133550013794,16.309698658631717,15.542383032876515,19.395409101305468,13.572965583666914,13.866623246133283,14.481130649152131,18.260457058140325,17.628651146039914,14.140648086667634,16.817671062400755,10.001581548600477,13.790668089131813,15.099368725896376,14.304403615292527,16.190727761005764,14.672249575972971,12.708822982049846,16.02409013408498,12.540485592284101,16.077698842623036,11.932469938086372,10.067872608604043,18.004192132599314,19.83445075585387,17.294459131702887,16.766881660133567,11.201131780621145,19.163488509302027,11.954003246434015,16.454192873844676,18.438916894090838,18.361140930776294,12.954418651764044,15.056532326239873,16.17306551310147,11.507358785745863,17.344448685098932,10.336619906455187,10.54886697062125,14.753714250165906,15.02101167071462,14.124600172945968,11.230124282252929,12.61116983167942,11.405294368068933,12.27174044952329,12.34569188179675,13.302644382942617,10.085703616363444,13.781337088306158,12.51599297522141,10.501085006315513,15.93025624525956,11.176856567281437,12.60388200290305,13.25171023639002,16.86781492624352,19.25239422091302,12.244201636166885,10.74467794666944,14.115205775631072,13.85751595399569,17.626889739711856,15.419219291863293,18.966544297601764,11.334084092365567,12.628329683038665,19.625050995713014,11.888021709480398,18.05336717702468,11.18800536579457,12.27058213102473,19.512593058071907,16.089092189563253,19.112251219320385,14.204575189929747,19.529419951400747,15.02393519867276,16.55588455671555,14.506683947426602,17.408977638798348,13.480495420337714,16.458366836428358,16.483606601912953,14.625759617998499,17.27457345991885,14.310141774146922,14.16965585047788,10.118314913958459,10.84232182021478,13.536409787872932,17.67108574785182,10.450920087034461,15.37158218712134,11.774263116231607,14.247480061487511,17.732888822098985,15.733461614374633,18.79087491155774,19.07263976469782,15.421258281735636,13.55471664648989,10.072356153653253,16.00152161769406,16.685519698409223,19.35201684876989,19.47227248788456,18.8641721360593,16.069529977157107,17.9376355005546,19.977678455631736,16.44286146306306,10.187370140324516,18.288802624031945,15.532422790298519,13.816211591460528,13.60503566829231,19.150500818406474,11.184277444503767,12.912846081954415,18.957222921527226,15.809158335472661,14.97527552476437,11.512668849502727,11.540848829334829,18.19946260256431,17.988707157141892,12.652233172975151,16.69550838964975,12.446030318301478,17.466493474525567,11.198877554115166,16.642460907901572,18.675890259289893,11.605884474026551,15.17011735863445,13.601043509312174,11.894679567628543,15.40625220448958,17.52665095116985,14.62780580994288,19.51477026881977,15.578942223151902,17.632749979648544,14.352254596615415,12.787688992730633,11.823559853173684,12.969488672267211,12.971570875282264,19.416826140635784,17.039207644803135,12.035605639775852,17.182952520552682,19.26857842907475,14.581852441747118,12.5736015032799,19.343850138950103,19.161961029926346,10.379790839732191,10.586450590544555,19.03284468458622,14.602155033619828,19.702327036994962,15.295688245551581,17.193711017516762,15.593554727328902,16.306270561808276,12.816149358621008,19.51228116253492,13.04168363219621,12.09025810328317],"x":[0.04801581321946058,0.2241130427662088,0.8174607521445858,0.7504466245200538,0.3028675422125018,0.11605576654377203,0.17186442364906496,0.6306768929375024,0.4865107076428872,0.37547181793454487,0.627805015490926,0.03185005520023565,0.7715599007643914,0.21239262373908652,0.2945571224611603,0.03826778056294744,0.5934795983892514,0.6726058286063357,0.2975152356136257,0.6882426758168478,0.61857668330602,0.6715016520930908,0.756258811256457,0.005866721981981238,0.3941562264265883,0.142427577287763,0.8390402098429133,0.5358327446440698,0.6377732137437047,0.5996361924717555,0.7520803715044524,0.05022920287066901,0.39790101530409694,0.3209853839528396,0.5809163794528935,0.9061453103749362,0.7492657227425248,0.25952893999717164,0.1587942344976898,0.6427019293455691,0.37517590309420346,0.7071264612406194,0.4306710332237904,0.2224268103073781,0.9709184254448058,0.3664865993100217,0.3361351150185947,0.2750655496244725,0.615753361551256,0.3171738663702657,0.4672532902855133,0.7208938144664805,0.8603438148702272,0.7706704156771833,0.6694924721784283,0.19177470256786244,0.971865396790254,0.27269833730765103,0.7111705893706415,0.5940399548730955,0.4024572068381078,0.8223142626505258,0.1804428370164144,0.620957313607901,0.0463046270180123,0.9866046293047748,0.9920820684707887,0.5442356948192031,0.13294609395568813,0.20093023907915852,0.8968708795598876,0.5361969337765957,0.15894412653484968,0.035711232469691545,0.48403168842948396,0.9610888776481077,0.5278116319451887,0.4555403003760867,0.44696835558021797,0.9212423050417413,0.3248240557937021,0.37815618374450244,0.1263719706275379,0.9079138901760124,0.6568979230532774,0.8844821437424546,0.9588409182544197,0.8098898136304717,0.043194929410862226,0.9645474420662106,0.24886050289340966,0.6713448941524924,0.18655719173775398,0.3124826780448744,0.12219959811841075,0.8141427176662319,0.22049252133306996,0.07034930025117303,0.079457032086101,0.907807854226661,0.8626749030198211,0.7548244496649654,0.9766283601563146,0.685552444944693,0.4217934660434546,0.0452811611963877,0.7741188081074588,0.969224947913212,0.10469081839498595,0.7480217227743649,0.5617414084429082,0.6032684237371915,0.9880536431754112,0.7647393088484467,0.19382489556675653,0.6968110435243451,0.14567713708885077,0.08535774970929588,0.8748223007149201,0.26025355682322426,0.3445238153282111,0.24277382125498304,0.043168966371620376,0.11202738052926775,0.47173134785696935,0.6258847678299939,0.3588483204305444,0.6317807079740636,0.5274760849649525,0.034889649076725426,0.36821480260287,0.17048315110997891,0.9951451331166667,0.4018310377756351,0.7971227683872997,0.13928209834408256,0.9408600960420641,0.8525625064557256,0.40380751288162586,0.15738112609502797,0.2518071199971277,0.7743998666609353,0.3232952859463827,0.7520516524964738,0.0037965916978450753,0.12107325547770542,0.16486734862156016,0.9324075844937365,0.4014444527658878,0.45830827193160806,0.28233947868130804,0.038692065312341706,0.6592611892045983,0.8138583558160541,0.012070462236723811,0.4121098470736113,0.4444662321379391,0.47935662800928647,0.7081888511221486,0.23602014178268993,0.9941725886746884,0.048928228771189186,0.17992556707186957,0.2388206239277466,0.5756487707337359,0.4837533985614928,0.5700965612022117,0.6217795583912695,0.2242592962274914,0.402467808341864,0.8801597433498247,0.0256682049134771,0.7570793535415308,0.6758081205581254,0.6669489191181688,0.43460487438212736,0.7712457330662441,0.6973777686375844,0.45930677464726744,0.21047444308507424,0.17521761010421733,0.7874099532116656,0.4327121567965284,0.545601982396368,0.351305943507944,0.6932507716613137,0.7540555296928952,0.4160056733200024,0.5632601748174992,0.22365965877526306,0.4863855258266463,0.11910663028696966,0.46232090252808145,0.4647619060891004,0.6760217432508802,0.82323106960556,0.8517706686074247,0.7231807072476115,0.36230164152637023,0.8570111967306269,0.7185122326147011,0.05553685519404583,0.09366326765160271,0.16349060327852483,0.4251571341879157,0.2383192120317852,0.5788860138953815,0.6631272146428839,0.5641555110930738,0.6738339140530678,0.3636879150794896,0.3801505406175476,0.5639049386885839,0.5831500224200752,0.7451763433090108,0.14667830275934324,0.8041652325140094,0.7288524537239767,0.7622492664780245,0.3938601879838377,0.43291089661055415,0.2739811836969639,0.204373632736508,0.228614579963069,0.07864193334536251,0.9737812365606744,0.0398978621159094,0.5956360852575002,0.9928604036246498,0.2785221213800533,0.8960764162802228,0.0013035862978318935,0.8708064395840698,0.6021349521056765,0.41476456102798376,0.02101610201985027,0.35998390760772137,0.6989003067218094,0.9002991314983875,0.5880707148196895,0.45909033606695093,0.10394543934638412,0.692231560479049,0.3249344641599501,0.23814875418035064,0.12118388121945523,0.5245346178664148,0.6704267405766837,0.7533932754622987,0.8802911012695025,0.7426542974142905,0.9835320233254623,0.8006671018626192,0.7992258424408425,0.4160648718616342,0.2724696191760325,0.5234446064956404,0.8881197167819925,0.8147452469286685,0.6956278548471564,0.019927778641536165,0.6960535315750347,0.0756051726430027,0.5657157009949645,0.883202617169097,0.9112293996528282,0.11929837180486991,0.6791764196344698,0.06937269234484611,0.9295934096402612,0.42393546092211376,0.9999229098899494,0.5951281593560007,0.29238091990328563,0.851063386865824,0.08575769755580631,0.33457149455873725,0.044776343327078916,0.6092890848128723,0.742420460936474,0.9979778490931626,0.5120003202782537,0.9871133608084359,0.6741202472078238,0.3519287317416391,0.8067121081325641,0.41525469110831414,0.965976252350268,0.528748232677402,0.22114433390600952,0.8279773216045854,0.707730410871126,0.3229262866727036,0.13276246131327896,0.15376092391227858,0.35374104785091354,0.2850509863593409,0.9290024225390838,0.20305984094573248,0.6617655537303528,0.44584105800174045,0.47231494426082676,0.8034925280224783,0.7095677137636693,0.21503166305612909,0.9620578599104961,0.14321029506840421,0.9422651699353579,0.201776933498796,0.6921384561272632,0.03903115129343293,0.9082451088919494,0.7414212374738431,0.8840439876765374,0.4018130474822854,0.05538291496404124,0.5985506498159106,0.177246940756425,0.727085119888051,0.8260767608413326,0.1267797260059742,0.7116675721805299,0.40801976998144074,0.5819711202119775,0.5824857381662369,0.9155507111133954,0.8668724549960123,0.8218266073132154,0.027656526005712445,0.9318382891839219,0.8532021372187548,0.06894350932489313,0.982659822134432,0.008937009141503971,0.021467510651868693,0.3043929577086777,0.12380358587839546,0.8708407131496674,0.7754000873133939,0.020572401147514352,0.674125960650948,0.04278109545321973,0.9157275368414382,0.04497943900879453,0.03487651872657915,0.3097755728157423,0.20438647212109928,0.08137863429783954,0.4759112237221712,0.1951967339710503,0.973000079031894,0.08164414827590294,0.9734413223366956,0.24502681127738235,0.6298119818903083,0.5961916439796213,0.5116399692508011,0.07466330508483554,0.7377254344405151,0.8945005566440021,0.6448685036165314,0.16800557985610287,0.9650493865140752,0.423278278241084,0.2650158708467678,0.2995180513102229,0.30091053618143704,0.08014448217326087,0.8293291260741826,0.777008328260435,0.5648580978308688,0.6535755937644097,0.09060744181667513,0.20134292231108653,0.9663997904724753,0.11354771835622102,0.10206687268092396,0.0730370115788117,0.5871808586597549,0.17339763164573796,0.2683807528016229,0.6012741300685713,0.6762219969717083,0.6650387466866527,0.448282324515213,0.7843082309956257,0.7195787994354201,0.8475548212706447,0.34261426188629396,0.7791675923792531,0.9508476692858097,0.27871343576016194,0.656680628567696,0.8312976920572241,0.9495453134405161,0.23373733757468096,0.9434623756311735,0.5944626536511561,0.03158688400899945,0.7671775306286004,0.6294403449879498,0.10366702257054228,0.9015743064134245,0.8906888833489865,0.22027745586626768,0.9241333640787466,0.9104619791431032,0.83735153913351,0.2715327810832171,0.5655069247302213,0.20886860132682727,0.24847564711759462,0.5521817139245866,0.6948027832756312,0.4537040701985591,0.2996253168150762,0.41134614433842853,0.5148686729229086,0.7748801075335161,0.3889506792453581,0.24860180004691879,0.3792377364867805,0.41316578298023865,0.9336342351978824,0.06381164231931225,0.44341591753949006,0.6536534648999379,0.41352491550608494,0.06526516150821204,0.6636493936355097,0.05769666742805968,0.11164311237581659,0.6614738582665025,0.01806475630782689,0.9328074658183991,0.22226838124765802,0.6721807117213403,0.6249011950396248,0.7202383585416903,0.4194931480412345,0.10657456254917408,0.6098968274895964,0.5206843461095509,0.9555868645102541,0.32507314809234744,0.2345874583670431,0.3588381848125628,0.7565883985192539,0.046668261301178404,0.7300234446205127,0.670794861821989,0.35195990081440387,0.11456989289617647,0.057427042118537,0.38818055416987396,0.7665659095176232,0.5273722544980015,0.37625202432982907,0.5028439397735938,0.3376715322832371,0.38055035125301395,0.3854032363576876,0.02449501325216641,0.01965232570115516,0.49904317659928266,0.8294764655797762,0.5557382632405368,0.34084048501694975,0.7568863805049366,0.9915497400378603,0.27863700188093943,0.48245623332202614,0.6845708150337952,0.1499338829606236,0.025576694755475415,0.855173734772178,0.8826167405397372,0.6812765293223757,0.2422495381935812,0.4529431087486291,0.01443773214859112,0.019880232808809684,0.030962691864299785,0.11157456047276249,0.046975414441172036,0.11598434671832147,0.1458756907406602,0.18065233119153334,0.8114111495933518,0.568060753659247,0.691245668015388,0.9474588723006057,0.4884308865829099,0.16583758512345592,0.43761377148071867,0.5237896663138568,0.5525076623153344,0.804939713390219,0.4959415329476047,0.17161617782270078,0.7750924787389695,0.9517760894125247,0.005052631337810531,0.008054502681874132,0.8734951557232669,0.15237996288581912,0.40456878040458233,0.4661111114403207,0.5195399310749369,0.22893460787308317,0.6583923048207598,0.5115062252240761,0.3784541411867448,0.7030280925519228,0.80125160256028,0.41280478129165,0.3016972577881696,0.7224711182806478,0.8378447972738099,0.2825132612792325,0.976614327021686,0.9960088786833379,0.366461455850986,0.6158522497151828,0.14071627022666067,0.3152749846534655,0.1948894301630606,0.5292270273538335,0.9580003993305977,0.7704260502204476,0.6061382411861198,0.8900699027875782,0.6680384840033722,0.6949387793746242,0.5783801760055052,0.23922383401212022,0.09994731143757574,0.8158776360797502,0.17468332748226345,0.7946133707816319,0.11937572510389027,0.8813676204312331,0.2157721335361451,0.5297530443676357,0.2837283894907783,0.7509834844080094,0.23052546768780036,0.9660184942830006,0.6835525088419148,0.4619760216825355,0.019302222953066828,0.30424606971867263,0.41949270019294804,0.3462888997228504,0.37369259064785165,0.12043144539638684,0.21379060409678652,0.09586649254889501,0.2071946549638739,0.26675168989110576,0.46856256964573206,0.22496092506605492,0.06222610847949106,0.8409601903080817,0.3566538159559054,0.5279725506437289,0.6854867603777917,0.8648426542211916,0.8145468068750603,0.16984516676396577,0.2372716131564203,0.6674134891621193,0.5983694212216542,0.4999035215171477,0.9267373951758997,0.9547048127316959,0.701773573234822,0.9358037600481577,0.3082655560469256,0.3920656790338699,0.3652261462460682,0.08382113117212509,0.32463207785952486,0.2420250961907804,0.16892940125126832,0.20764082084566748,0.28143715539581704,0.8620480602879252,0.05817844100966152,0.9887531658936748,0.14310730819498163,0.6157745037143774,0.9841307199058547,0.0755381197129088,0.669916224249469,0.5444661666655186,0.8409897059944458,0.2675310384948797,0.9181845745284312,0.7942709237368573,0.7638177876511347,0.39368752310326505,0.4505489266760463,0.3571782694398633,0.329241201185718,0.576736940202573,0.7273917815760964,0.715837983134072,0.1286506865273218,0.8010043829615365,0.5006562485904036,0.8629987693734504,0.8879224379143902,0.5052993474853842,0.9512507664816066,0.3462082493458234,0.7478781797338687,0.4648616918987434,0.10263737788555272,0.9636469218807118,0.16724430186729666,0.7450945595512146,0.32666976179045615,0.4703962917371616,0.7623119279216983,0.25922867049258524,0.14398103777996085,0.8229060478141477,0.9531916850005047,0.7338071336421932,0.1828075984947366,0.870016773929071,0.15718934103137672,0.9133489906042511,0.21736581449107018,0.7120146061287387,0.6441068226564877,0.4849681699304864,0.815596617851652,0.8492805149565859,0.19032787889602432,0.7183879716147905,0.62026730156751,0.8183516319096118,0.13201651893717958,0.44849553349358473,0.7415343861881707,0.28488555800087356,0.3466965073523838,0.4664496967740641,0.8116545941290623,0.4320634645174595,0.6417139834888079,0.2300365299001188,0.6310914431758332,0.6174619928215341,0.789992463421747,0.2067604736413593,0.39419575391549433,0.6750091249569596,0.2705788745809041,0.0670401964270988,0.7442865920798922,0.5287201902182299,0.6759098409847779,0.42514222827740467,0.3161987778004194,0.5563744179372772,0.6791818355209733,0.720728323373552,0.6854175279466803,0.8013154156365885,0.5122362136505259,0.294043095150049,0.8830008038042398,0.8086880320499548,0.9767312183843826,0.13204890731208319,0.3526867361090382,0.375449055832189,0.892327811738088,0.40534603880088516,0.3423863537591696,0.2805503680507979,0.8333419087763962,0.9576236681042993,0.9866557604962494,0.7243313294886993,0.19816196179445011,0.1975641150468146,0.8284717271671522,0.5576956900061216,0.2368193939738168,0.9599466206514489,0.8342128138141454,0.8603814182125826,0.5611241981602646,0.46331703378141964,0.37951423442656673,0.5141938286979664,0.8836566627313973,0.902091222425289,0.6386217275018351,0.27127597376299084,0.9588552066591527,0.4184510636092824,0.6340062130818112,0.8885100256053959,0.5951864653810139,0.35701174069268693,0.5851575464532466,0.20957178162608603,0.5792302980359345,0.5397667405125117,0.1488459970289484,0.5190008019540286,0.17577985524957174,0.4533262247811305,0.4963415422277102,0.8249241796215911,0.003962519303583045,0.757391479984052,0.801087325731189,0.6551799308238959,0.0480667440727518,0.0798549372173083,0.518294982669206,0.22325035795596704,0.2900043784873634,0.9116119636902531,0.6984060576129572,0.29710384713138027,0.5840376522818387,0.033157524172823916,0.17461633787666386,0.2550901451990333,0.9910911952316126,0.5633700665645291,0.23588724136627226,0.1642155112341872,0.3171030235241967,0.16757273006299678,0.9527034116567978,0.4659618680036115,0.11102688264921756,0.09601710525033291,0.12626340528324742,0.7205149755689957,0.3342555507345586,0.6774154611491756,0.014133754147231281,0.9449669193944408,0.45413849221123237,0.7290323879306779,0.884847041902276,0.14805940232641457,0.6043628224273294,0.36333762573885653,0.6195261460422246,0.04574319239287794,0.14721721719134195,0.5030756556181304,0.8450834316286295,0.24513194942078909,0.012594835847444807,0.236521281465633,0.910163797439701,0.7714659536235375,0.28032067684843365,0.860141377785786,0.815985711745838,0.0001966938038409083,0.203360593595578,0.5327814910855817,0.1371022246096063,0.9969498395578049,0.889333346371872,0.5618807963999248,0.33641707906491014,0.40632168463350116,0.3253491343445891,0.9071953676908926,0.4837596681800167,0.6894372832889617,0.24958801782621642,0.6816922251927711,0.3750534714598037,0.7066052801197702,0.13110609149633423,0.9806879481230248,0.6479572704831209,0.5058987445626795,0.004394943562625819,0.08307112008795614,0.3757846052520948,0.9123536649227277,0.39448945516978506,0.5605820707413887,0.24962080470193015,0.25158931780325666,0.0997332139548075,0.3741187760310791,0.006640820865519315,0.9329016315812568,0.7903511167019701,0.8698255941937985,0.925436939893503,0.657260537051531,0.7506730736688305,0.03147710588314845,0.12488144810650481,0.2749988240834387,0.10026657641322445,0.38012140865174016,0.9460589491581195,0.9790311581412448,0.9934900111532514,0.7217285195628831,0.16184685985577363,0.2916749159977021,0.04430045141920025,0.27080896511991615,0.24030937270619068,0.6352555580066537,0.08575335610708712,0.040818947336142,0.29920197116525515,0.07108561501278299,0.30184686288206586,0.6617556279219641,0.14342910373720574,0.0715259089784448,0.8586382856308097,0.0773067641191505,0.7353952914291655,0.6548238157532054,0.7291465950575513,0.8247509087648872,0.6055423535403512,0.29140716644579423,0.11407878088819379,0.6703702328864145,0.07324819980142094,0.858834192406642,0.10365164361601464,0.04165443931349766,0.5639577414693915,0.6188957959144519,0.0808459505094874,0.6077093618055613,0.2493300020443583,0.4987634145951496,0.7496970257281665,0.3205258356985805,0.9614755001412607,0.6384492767125292,0.5975766429194695,0.7707999856277226,0.5253597430828394,0.22350716738184007,0.1651158671821491,0.21666522733983173,0.7188877577584079,0.34595644765615985,0.5399554925263299,0.32134445806455947,0.5707727209535498,0.3603756021171507,0.5867904949781177,0.3536679321653178,0.3868209431288734,0.3572976421390974,0.3184024276592703,0.9674363878747831,0.6520249654456038,0.823783692673633,0.8091316765991388,0.0033671456229300567,0.8898522363728181,0.3797320182405268,0.73117647834601,0.7177125467598675,0.7255906802678331,0.2029884999512339,0.9822349418692609,0.7971251532210204,0.5950498763981564,0.26689831695114385,0.9994999759773839,0.157165239294756,0.9483372530514604,0.4076415048455282,0.19974781451338952,0.8060391811835232,0.5436508281527745,0.08242257663508146,0.774284653217028,0.5343984580227703,0.45811353123840104,0.49584820028532484,0.10472574443471205,0.2986789297579193,0.2323214891552965,0.08654127144568302,0.9279790414440239,0.5712676045410592,0.09749013393090666,0.6478989496582412,0.5360027284327862,0.6784480359665437,0.530744152036009,0.7118067599066684,0.9525949529075899,0.8238195678219093,0.5382597044506361,0.02167146587549751,0.8078126338714711,0.44660247539491627,0.5780065349668815,0.016734080297341913,0.247073278071809,0.9538789076247169,0.5949855479351349,0.24829448105713192,0.38791106053607116,0.4206691326858232,0.07328171167231257,0.22554249143572824,0.0918351914692368,0.6614719952625814,0.3641848037776081,0.7573519028762077,0.8252707616231525,0.7613822942966619,0.8493451024827681,0.2943502178185413,0.31430339603113366,0.38264311058992084,0.11876923858643162,0.17107928555002583,0.3401835179125732,0.287844832817554,0.18829185168530072,0.6220485181606759,0.6021315564302567,0.2523474809648687,0.7265517540383732,0.8815358369228372,0.040809533362096584,0.35249909140908553,0.5938775336560291,0.004367236229475546,0.6022481228271008,0.6993740871160985,0.6726393600122167,0.14969805690481963,0.7904773119134121,0.8946719699595416,0.9266949713188923,0.34217516155811767,0.6531996266070528,0.3219316168387618,0.044983101733678144,0.7428863015408864,0.649035103588343,0.5552562543620012,0.35824508632497687,0.2240811038166879,0.9008741955861062,0.5284369579344377,0.5454128457257781,0.07666172662985105,0.19028671797329055,0.10515893799302178,0.9537602190265595,0.14698018337280105,0.204977894449905,0.6977397648786867,0.7843872431814733,0.13069060763001272,0.5205165902084234,0.6354598534159017,0.24406418511964212,0.558124549955413,0.7421741390736563,0.4303036073984723,0.9034131816761748,0.3966558855923559,0.9140318231277196,0.27279730237113564,0.3043692830704312,0.7329903471176769,0.8222461825960232,0.9647614924586483,0.880553248680527,0.33788041054912443,0.1291958478432067,0.22890210147117562,0.9970465776253774,0.02160021757842001],"beta":[1.0929267658644992,2.5856553309392627,0.7474521158617198,4.300550780202812,7.079616358915959,8.818075126393989,9.198244359535096,4.367467420291408,6.018729671769345,8.03819715031064,9.247935406969397,2.4930427123475374,8.467549325852124,6.784393890926963,2.401686377894927,8.631670724075384,4.6361672957226,6.379327975158495,8.22318847766092,1.6421951873457008,0.06631821364240675,6.086304261684104,2.5715324958560237,6.242312109710184,7.059119456970122,1.7620433909326128,7.672397725806814,4.428100057277025,3.0317617183722523,6.0280910686627305,3.4516350357515524,3.661711448795266,0.07238822912567056,8.172943631333593,1.4846580879912818,8.73885248246954,3.0629243434183673,7.103409931871674,5.109758532328293,6.11571588476812,6.3993907448448955,8.420739523886208,2.9772401110365654,6.60173954313986,4.537608068152734,0.8734595861907102,9.226902113914168,4.068704112884074,3.1470938809140914,7.194134516812314,7.756035742830926,9.038564376132625,0.3494474687393345,3.657558662630409,4.542796609967443,3.4242700456184583,3.903529069734182,5.1117055398025535,8.092694451975364,9.366199726299559,3.8035659512552633,6.530764365864403,5.860000107544843,3.623179844576394,1.2084663605645818,5.666885246886515,5.360689750020464,4.802021427324313,0.5783411768640279,9.954585465051249,0.3332848870357896,1.5981836224706747,4.640697548945156,2.306694404723242,6.42016464296101,4.3823360743172035,6.663916096399614,9.586181873527613,0.8720571484268502,4.326383697397549,6.586058147553063,6.527277408414913,2.293047632127343,5.480106201518016,2.11444286321659,5.270489209452682,4.87165255600484,7.276870811655918,7.22448330608227,8.0620757947217,2.7524173636655935,8.39493226949358,0.9194287306627857,7.5894882232270255,5.676473476458101,0.944910800166463,6.2216568113364445,4.012552492613837,4.903249407616648,8.9871185594081,0.6966799680062397,6.55077532872877,5.246652177424482,3.7409464873502585,0.9659817852685681,4.579732709049251,6.877994136167933,4.989925206827022,9.997982269854315,0.608611982910221,8.80019706960656,0.5454309937070279,1.5701986165568216,7.780265480156487,2.2563097870777504,0.07871818674102915,1.4771477364239494,5.801723815848585,2.839186065335375,3.247159730929574,8.827943094052825,8.655132741285843,8.030790263691504,7.4722786358424775,3.17266083174244,6.134187406058784,0.15337091008124304,5.99915648383023,1.3158381655011353,1.4715645061763039,6.229620315761815,2.4485081011091347,9.25358063476782,3.55101336578175,7.728814166835574,5.7571275448445185,5.42528594119418,9.045352058691844,3.4850066591059137,4.487987876401842,7.496597170542383,1.6011717275525927,0.17269566842030182,9.008066642936459,8.377951828480214,9.93899058311614,5.462010296798523,1.8309003279771185,2.3458421125158813,2.7121213668781308,2.8148189930105305,9.359748610331467,0.6285590486729853,4.186481937390507,5.495185746254934,9.345035602724888,6.377677121322969,5.235899351300848,0.5209663012726029,6.472909568065641,6.2270603284080455,6.153463362852742,9.527117314946793,9.57460314183415,2.1174401907989138,9.853930909459015,0.6720743003201668,4.151922226445263,5.790048303531757,9.77230609234236,0.07496850421397694,1.1569629913282675,9.061403306075482,5.609770765427227,8.031878575728923,2.0468725606642058,3.431696584404045,5.045952030838863,4.8524899462984745,0.1771711689336275,1.2364699306334392,0.21234032574462214,9.93075285476042,3.599092576315468,3.3182423994812105,5.345390327800477,2.5118141644835235,5.92655376341837,4.704311260041141,8.207170008815353,5.008620008609133,3.744561075478734,6.39088243947342,5.074986478017518,0.7120643763720924,7.359017713150275,2.1478268775905818,6.375491036321312,1.8787365327243188,1.5274715374322367,2.2208461269203617,0.11521631587281034,7.2188420881416615,5.405206648668955,3.3529484061952286,2.649604696730732,8.36770005677808,3.126254075717929,3.5234175324179207,0.22185867171177653,9.511110607203616,8.327274751210819,7.959219224708514,6.13192353121518,3.8717574177593006,0.7156564769376583,9.480143869154764,7.649989587101034,6.8147155308104495,4.921899785241745,4.338767567042121,2.5358846542360247,9.686079731616928,3.1364455301319683,9.282429589492061,3.125776377713061,7.048676698784475,7.098556120448225,9.43601806370551,6.263244987116472,7.226325711105086,8.976789604313126,2.308505478339722,7.114127213949752,9.167549799430187,3.7015553718329386,4.005936183825433,5.3207622011537286,6.2066964885222164,6.903182698060901,5.728845989485302,1.566914314395924,3.1478257145285493,0.9094137078018538,5.494305286615568,4.056510604558959,2.0999748384168537,3.3909751316556402,0.9542136581662652,9.243528711619168,2.509037143585624,3.015799015454226,9.546050063992684,4.94881739479043,4.479184061115353,8.835584755304557,8.966505935637185,7.359289592194854,3.895913294409945,6.814542241241462,3.735288844424145,8.94052883764321,3.1216538360537216,4.852031813000015,6.360175799145482,5.8215456093081075,4.109698973287332,0.5290843797880895,1.005092766213509,6.241479698913173,3.127902241590177,8.994026427216145,1.269575683936437,7.041465556815529,7.4128737729825644,8.677887128247852,6.914225699708871,8.892329503283676,7.539388607816251,6.544955912463544,9.456025041468934,3.546512974264735,6.148275639852983,5.145255110037872,0.9863662917860538,0.4821731508789462,6.419121152021228,4.376334199724871,9.688527361647834,0.24625361561878112,8.830388671348166,6.443005787883582,9.502543288760585,6.048372435296461,4.555047890409554,8.423247754693154,3.7632983950916343,2.88251868561918,7.950343012710643,6.308120373823223,4.626451001533205,6.359285723284113,4.6553311289720245,9.411854471997048,1.303169436561702,3.1982610075715012,6.585195986977228,3.0535495858519046,0.5554354226435421,5.150971113797667,1.819170586704788,3.72275242891422,4.34669001071809,0.31131126706333667,3.411927699246773,7.671857603054784,0.16361687799278712,1.1187072728840053,3.7942102135101075,3.860455114351553,9.701933734667644,1.1062290082417658,9.711491239038788,1.8032354372821269,0.891058387004009,7.599227423469175,3.9643971531039335,5.661941986062578,6.153538040627769,7.116145514466146,2.5056912231016004,4.9422920371697865,0.7893580456590832,5.276349816827663,3.3851394913843325,8.723622801416266,9.45940655113495,6.992295806305194,3.909456881804123,7.767615148413512,2.3349534220000834,6.5040833313284026,9.045242346585837,5.48081107612628,0.4265886667378216,0.44093043888599803,7.671927402563066,7.1156008468017,4.382906034856589,5.623588217002647,9.578634798087116,4.367022102108448,0.627853141620911,3.443851926031063,7.029432446167185,0.8609147623098612,9.408273328238344,3.3177094398526585,6.61874726920221,1.6067086376756046,4.044307932521596,6.791357655978157,6.10781126950995,4.049971026112454,3.158436865703056,9.684880477649969,4.178979804446534,9.120442538873885,3.4594359639088257,5.910400546919295,0.08348138796374638,4.449499740433458,1.796128512545172,1.7415686621834814,5.417979486685615,7.422741024103125,2.128684778650689,0.5535189748590441,2.6208007048981408,2.6737083406633766,1.226746103471248,3.172176378775049,1.5937637671843108,1.2473628661109992,4.499191642879832,0.07388931117240594,7.629034502252732,5.915850352275696,8.707577384592488,8.088036640391504,6.319599880912725,0.6977429860896556,6.5604163755661515,8.389695096667777,3.565711001404588,4.533887420749454,5.041685963087645,7.0194623823650515,4.430753118627029,9.40168574996379,1.009502795621402,2.698385494639306,2.485868604592285,2.134341469391521,9.02538927690143,1.564927098808524,4.736761213529926,1.8381830726314918,6.4035103402996185,4.827583642086681,7.799134801693926,0.9040729963714944,7.03807585615869,9.536018467278177,6.505019402545074,6.084276067096479,0.26056267064517247,8.884870914572113,8.770782519103744,4.767594148967557,1.7779778440554117,5.456603072364126,3.0240400542667722,2.782548683663546,1.1565524854012188,5.892276874779599,8.44899474873652,1.7106183210165038,3.7688886286957146,8.446295389226432,7.196304947953676,7.691173875413817,8.156677429174593,6.932695177423838,5.0406810663288315,6.459116995820691,9.283894560164672,9.077228403130846,6.537008766294774,3.24907134954332,1.2481184241366972,0.6749296838878949,3.5457266075554372,3.8942592211415406,6.928365895507023,3.2679907805035935,5.815379578103775,2.902213087186236,4.087489342390915,2.041298384903234,9.99152477639939,4.942443728607335,9.382279669547994,7.945242203025438,9.449549789048726,7.135152907596494,1.2091804518970073,5.315707817910447,0.3286152153681776,0.685316154408151,4.9752715065477275,8.543185929281664,7.124990768988441,1.6987617478298422,9.381850974876748,0.6090249022748861,9.055041098740572,3.609048795489511,6.8205384430531835,7.798363593517261,9.264670943216121,9.436127250328607,8.793065961335513,5.459087840168131,2.1707464284029254,2.1284058441016396,2.573539277166994,1.342885566052523,9.53598328092641,9.474918552254131,4.102898673763966,0.19639816140242683,5.176209204288087,4.2064075802710015,2.5496381613658703,2.7032374308207707,3.43961679464565,5.161569755938453,7.286199051435633,1.9818726775531226,0.6715461326681549,7.603877420405151,8.885519986465713,7.856837579997997,0.8212888129785445,8.891597345094981,3.630532956290655,2.003239962472614,9.90350725181182,0.011290226443438911,2.813067048020077,7.6499452993064825,8.87680758458541,5.333003880186573,5.111065473519112,7.8324181162827,2.3270086302989057,8.935803344854104,3.191473879903637,4.743356152979661,6.437637439146034,7.26308926773692,7.364007811551694,2.6411470070386445,1.3377322166159633,1.66645271624849,1.0665258858813997,3.998247953646934,0.766263832345544,7.850867827106036,3.0227718329587705,1.3173258277043765,6.200587322828648,4.759133785100942,3.7242498985760952,6.41363774316702,4.238319774534494,5.587036693830525,7.244817179620986,9.780064688606364,4.243372370764192,1.2846315098004601,8.69253222237849,6.896258429663127,0.32230631542216726,9.428561224792864,3.42644246087211,1.4882431194105261,3.3278518942416646,8.259347920355067,2.5307296332921236,3.1681713807054446,4.205113658861144,0.24270874706054268,7.497267759372219,0.09361476905957122,1.8091044923227728,0.4304394060129768,6.126946678522344,6.188429721377204,6.837568680815638,4.844953046849271,9.319460801820078,6.87159322136093,0.05473988756310444,7.32774953501643,6.196738030301012,4.571289479168805,1.4698741251752612,9.086101638742903,4.496369515477507,0.008401986981598775,9.207227439615814,0.46141341450019135,3.9042051915713394,0.024569683183155444,9.696417447399837,1.3468829040572938,0.9508861906746136,0.1394743620028982,0.6813167534270237,6.6808663108561595,6.53398790720294,5.680672550977661,8.903176321122492,9.428634595302988,7.299504401240428,8.921558770086156,1.9803375584983196,4.735200987481186,0.4473646591881608,0.8724559499704365,3.0663666596145744,8.598613299814657,3.38567532001804,4.6799725286350835,4.083686405334113,4.116801390769373,1.9296936390350061,9.488803106994027,3.350374165108674,9.658533603989252,1.4200767320202967,7.64697703202253,9.550273447317936,4.654748649825224,3.4014965113742712,4.544724812437351,3.4569803118054665,4.577842933520449,9.525831134707603,0.029951303337689694,3.830263921956578,4.09306679518701,4.645497396802234,6.527074746710126,4.907639747163963,8.654557971625803,3.392692117728451,3.156152519983695,6.087827671117894,7.995708616875328,8.279422294337682,6.868214471440424,0.13591989211530375,4.12223224185966,2.468643350996227,8.116992802877279,9.082986654504197,9.441420723919409,5.336548723531182,1.3000171786037562,4.3555197553113185,1.6939143764944697,3.4555313905005525,5.697431195651095,9.86024783982913,2.534739434368174,0.2655770372925481,5.503986775386023,7.907728108448573,3.4785047257088753,8.145097072905044,7.04644292615593,9.863628848510292,5.973197431536761,0.2717365306084196,5.835770602246826,8.382681503549211,4.690534363398653,9.33801202038788,3.8599437977748474,8.000509910510544,0.14465607277177162,1.7569134252684382,1.5533042883214776,7.893689332890674,3.4577471758580436,8.567157295141838,9.201560662154069,9.047195710719262,0.9018367023781315,8.601121692116156,7.942600162350075,8.905016937264307,2.302054045764268,5.954740934975868,0.7315464375888325,3.2021259931316792,8.637950339074754,8.758950956763691,3.7068200146740926,0.5641325647106843,8.292523528193236,6.825970032214634,2.7314679566682964,9.69404015707193,7.602108514366512,8.36223916488561,0.35354116266605784,2.218796549367845,4.316099227648181,8.268948031270686,6.517588529125811,8.244404156256007,4.401178013383729,1.8833927983530696,9.91499022461558,2.406909052026567,1.5121293926741997,4.433853107082395,7.788654519825302,0.2145638864090338,6.196196392582472,4.756732571801039,9.893021656268164,8.852787263897824,5.120733628466287,1.7606387823258962,4.211165400336867,3.8511536382679346,2.7308463195338195,7.406603915734145,8.763660452312003,7.015957226370293,6.917439715317919,7.740781070468959,5.713907526250344,7.297284577820788,3.1857077380191567,9.614704133916334,7.463283084602105,2.972379681200328,4.783848976866234,3.0907394867200355,9.132334425998598,5.738290796013614,1.7244740803733305,7.015025704129478,4.8732057971391995,5.481004317180059,5.011571561681675,5.974135604198012,7.42794065277524,6.546563769529243,1.4991409837023406,8.764781226277043,3.773310925872164,9.691013727354862,5.937947958967264,0.3618478731161545,4.7784335654740335,0.9860984685230689,2.6017700978976976,2.189247676922419,8.993368344154895,4.890689534491237,3.3132110801132297,4.713998731368168,3.1330749522666945,9.737526660515085,2.318480047036424,1.7597943568520402,4.401389218626123,9.490028927747376,8.550582905935158,0.1354474593856403,8.604108935746936,6.032406387817408,1.6065170650660043,7.532197882568379,0.5185846117502924,0.922964417209724,8.569290806753893,3.4917487630335464,8.667358338020417,7.777976490424989,9.112642620057915,6.783839984155707,3.003115871134292,6.932993633434932,0.7157395421535706,8.764638600599095,8.28608399686194,9.616654933770603,8.404147333576411,6.374233934007445,1.215899650213803,8.864347286978651,4.517216287237571,3.8131038474699896,6.903776553242917,7.914270319331333,2.888004077793127,4.351874702405918,5.436617079070071,4.693039933062235,3.635938664498406,0.649909397488031,5.463127753355148,3.375907539770462,1.713598159067966,6.804226864784047,1.6782072868037745,2.297244641994567,7.10544101401402,9.162292765054161,2.656453311134712,8.995904870963038,0.24260264614351268,8.888574369856144,2.253314890257405,3.6569727679097563,7.5060131604363445,0.1815318637829777,0.45941940170477036,6.41995543442742,3.9336535131576533,6.087393873184331,7.7561759374829675,6.685213090778019,6.738314140714714,0.23715186179339431,8.69076492366682,2.730009083803324,6.088053824593292,1.8248209006444593,2.6619091717909793,6.10567468248542,8.856069575958411,9.875899788052976,4.4235939434238265,5.025754991530917,3.739703450223164,4.393050122353559,7.154886856686227,4.772150533088091,9.029762841847171,3.565947198102364,0.47169034598870674,2.1483879565875097,4.415260363821345,2.1660638328790482,7.996845305467493,5.990434120602055,0.9613878552904787,1.7538318190631808,4.19419408540977,8.690278557310853,7.785908985412185,9.139872930941381,5.7265542364240325,6.445904906418997,5.499532348637281,3.3746599964184765,8.754030228899612,8.328157023642198,6.982136101059431,1.6583555976561715,7.019000789499293,3.159467721090883,9.93133999147657,5.470553203270285,1.9991635402176633,5.55919577716889,5.028789524534374,5.596367785181952,9.556165177738178,1.9380058703082526,1.218551302627564,0.04414588035289713,9.306715330540065,2.258071712766081,5.081994259197479,4.2817665065864,0.347144366288592,0.3859268166605423,0.7549703409814534,9.128374620833618,1.4480338778644342,2.5145081085937715,9.40246834868567,8.425506120428723,4.2627072032511215,4.618198750354927,0.3250358274702281,8.39246839733227,9.367800849792083,4.214542819342806,4.217423308287569,4.481246032802984,0.3430661787912537,8.755874978213395,2.7536689241239576,8.747849666505772,6.684766551257972,7.988923013989817,2.253094146169703,5.587912424646371,2.8416642177278306,5.256552350624723,9.082766744678096,8.928154835109774,2.291167486045702,5.805534580073333,4.087529991119434,4.639308819094749,7.794960514425662,9.49635415036788,7.219757049920661,3.8303117684586896,3.726573910853881,1.571519752914592,3.8172710970642765,2.303635714482415,9.519934788115595,8.78502754430065,5.240559984557862,1.5069329324832559,8.444486603977486,9.872727575799399,1.2090010497066883,6.609343054890036,6.781414961775427,2.3479911885316485,9.025835184687782,6.871661628194968,2.7058770450417624,9.280991188910747,0.8914440885405206,7.1491761528403375,8.539818897450475,4.93908912521825,1.2592298316561212,2.7199123701248284,9.428424975232819,9.375411016345769,6.309705039093458,3.441891830777266,6.613790996904041,3.7497735398215193,4.411988907805533,3.130178419516727,4.969148965913783,0.015592600247462673,5.7400240596017715,6.165660390195016,4.674667378353201,0.9554539676754525,9.89082533967737,5.977808947700527,6.891139642659927,1.0133285917143642,1.5580562394764974,0.545249181385139,6.796115911642955,8.859769752906582,2.4347543306688135,5.879454170299914,5.662888812305353,6.30660339345811,6.61953970806378,4.022249024077185,8.614429191892757,3.004332790823101,7.968264358287344,2.2701867108946217,8.501916043335292,8.692810286287527,1.0643485110728523,5.094578578714318,9.311513693452662,2.1632260568019945,6.8293508291344125,7.313590655414739,9.884055365573222,1.4763386013016966,4.691618788668189,1.945996637772054,3.474750416040613,5.046555576163887,0.6693953904486327,1.197803225016143,7.710430835595973,0.602947771675677,5.850702648548031,1.2574421274059633,9.854118453859105,8.041727613341454,6.205278385566039,3.1062592206275053,7.297731324943346,3.819445394355423,6.543203173822414,6.518750029242817,6.912443923627951,4.596508406929547,5.750460825453589,0.620521042856994,7.06714304928715,1.6464707719834548,9.757417868178598,6.661947267798989,1.8964051474584576,7.246847413157099,9.182277784058703,9.522823352817099,4.925945827436264,1.4439452006079168,0.6691033449356842,7.72299707062434,1.8296859032075985,3.420020222472544,1.855412514272019,3.332756867515161,9.395267463666006,7.247255802107528,3.9193598817293185,5.569961689338463,0.11787566490280899,1.0296085761476448,1.4977686740857021,9.329004211640813,9.067814879534502,4.202014873958129,1.0486838459177728,4.281902679999656,4.892920286696558,9.839063869785143,6.152556152568549]}
},{}],28:[function(require,module,exports){
module.exports={"expected":[0.8516126970054387,1.1127015390342456,0.00780701017156849,0.008004692451583972,0.5185973029828436,1.4614685393893443,0.0689707198423438,0.005552515129941109,0.015767555232855973,1.0690891133103062,0.21551929683700238,0.00796366857898411,0.5591605231451838,1.7736448552364747,5.39999345653957e-5,1.2732813256849014,8.176892218075294e-5,0.8428749791126826,2.428528360258661,1.207635010105132,0.0667074616848335,0.049716766272925296,0.5887589511107791,0.053781465536757625,1.5616252133580244,0.14950446716803162,0.6415746573153657,0.18509927836069714,0.30624423540283685,2.8406024211273735,1.6590218685446516,0.08579469077056157,0.06872079488012625,1.815015050175675,0.0007224238327815802,0.6212770061624429,0.5978976014065034,0.0015421931606944446,0.5323772036934117,1.756851841360103,0.0631985869744324,0.0013371053757006558,1.3744372156966171,0.006965767536036114,0.013622224374297748,0.21078835025550277,0.3126971871866917,0.27577462954459925,0.24937636049045112,1.7518498071973743,0.009918245521208954,2.396665963956391,3.547741620759987,1.439369594851093,3.387280936867617,0.013929509659771393,0.014210264118868856,2.679051458081241,0.4681929121809841,0.44866414119725123,1.745242873872416e-5,1.3385707755614584,0.0009476157418637453,0.053764149053713094,1.1674028263162337,0.4429481510067872,2.79452010478183,1.706395339798655,0.8340777212174022,1.3789447618171706,0.18696612335075943,0.674752141085829,5.849919398430338e-9,1.4941555280985248,0.020369056700021294,0.32020384854787903,1.8522747759584908,0.3130268564232684,0.12899628119081183,0.7445093150905944,0.45199667124116444,1.2677409260856383,0.014509519714853793,2.2633122817522744,0.00016102915190235499,0.45845590293766514,0.7660350066051513,1.0432358859973365,5.437394155098447,0.4854150427448541,0.8063434627548408,0.6654181882987433,0.00037081353203575644,1.335966796042924,0.5774259616065447,0.157172975040009,0.3906349371301555,0.787671837646187,8.852431578871336e-7,1.7635689455104706,0.9659198074756933,0.47662731812147496,0.00010311542309431763,0.19440452715118017,0.013794657065505315,5.8315789488909356e-9,1.8850357200230734,0.23966627861832884,1.1462031913087107,0.006258666485303989,0.5336877602833441,1.7595543595615093,0.45146472132733084,1.3824119548230844,0.27355382361033864,0.0395600042566385,2.970678300082777,0.07656016615817493,0.3485476919027184,0.4571907519810189,0.9020930198609997,0.04632998419489669,0.24123260081579503,1.0600630681050467,0.6824508710362877,0.5615458235200019,0.5139081909574242,0.008648523853977871,2.79744693427901,1.8341637410500669,0.31333724178717093,1.005667137877925,0.1683714035870178,0.9371987969849596,0.04640342364390825,0.0823467564989612,1.9960462408209205,0.39328319286395086,0.07084263180560352,3.026443134811124,1.5221025853880032,1.3946515302959708,0.0001647875255232638,0.5720425373773961,1.2818530560673056,3.4043107250916105,2.4161939024731707,1.5150928469823883,0.774877563327632,0.03758306099415641,0.01820019981220878,0.8237025951064625,1.8132116114257402,0.26241453569580964,0.023457948923287265,0.3111690539716982,1.4688163067990325,1.7665367648124835,0.3955313412310826,0.04446749201150778,0.26753010242956987,0.04798632504312261,0.002116954989360537,0.2365858766283523,0.009168657253711326,0.33342756406306284,8.555543021868577e-5,0.1514003483930828,0.6656280640236357,1.3206036621625095,0.04125143767743008,1.1484240899155962,0.9172380605915466,0.7179890686910976,0.004135180502787849,1.6448634389819135,0.011320171639701532,0.8139065182334995,0.798028868989445,1.1943197289506582,1.0637408555830477,1.941132336394716,2.1785914606912242,0.5176974980278997,2.6924952470727046,0.9361438536241461,1.9815637231731933,2.2709032771278705,0.5011996352280189,0.4413181352480241,0.0001303604585583367,4.602275687141186,1.60868154915102,0.7742850285926578,0.299088585157961,0.04631806711667917,0.0031770150045201807,0.7409126855626436,1.4735457664068445,2.3978602189016276,1.293519479241119,1.290364140734745,1.3918911455606444,0.2758516217326297,0.03329846456830365,0.006676831718356726,2.5955438757383336,0.04316390983954603,0.5501160379611317,1.0052980342092777,0.21819197086462438,0.5592574594168703,0.017616636992700736,1.1674570416115,1.8556109139547512,0.11595924969847457,0.20022212139060797,1.86751094869743,0.003955611278179433,0.000890304056686757,0.4255253932272047,0.05592698056117855,0.29051520900964245,1.654651351168519,5.9690669050068905,0.0007627685459651879,0.0008011160209150611,1.2214311162154188,0.2364678443198094,1.9238610270243974,1.5819842622896028,0.5111750552923072,0.35036923103312556,0.35071679259523303,2.167035399716741,0.002719417963873488,1.0062461301617733,0.004002497989093611,1.9711313709373088,0.15123309919030728,0.4265097048451288,0.03860530119485579,0.12179172522039648,0.04923008026933686,0.0008986335590214351,1.5259431329242046,2.188682702127231,1.2165172740508108,0.1545239216891307,16.687432970078717,0.7677132607477101,2.0279695261844606,0.057145575960288755,2.590778514696234,0.02447436080313007,0.13996948268799506,0.33372979096212807,1.322875405442282,1.837299639803603,0.8117075431573806,1.65660847001329,9.169703555431655,1.1451886989723827,0.043464908548195,0.09887908313282126,0.8078637023261797,0.43103785283853413,1.3404940122602518,0.0024153442705137623,0.0003827538755928714,0.015938099027928247,0.43351850111852297,2.6742076081319726e-9,1.3937903059379428,0.9976702690339152,5.689727940038189e-7,4.404540931758217,0.27106678751769736,3.5886101242313064e-5,2.9618185457524566,0.5368039890110526,0.05216840259459887,0.006852359006050678,1.9690283043938153,0.5185875503646572,0.0015884909542983464,3.287127332490387,1.6057887409517553,1.3816698677030843,0.00010560906664704511,1.9077920127010692,0.007059922246969168,1.7702057438825924,0.2787625943671199,1.300474794910361,1.0319320349522751,0.005034673393035859,3.256231095649756,0.0007202460076379986,1.9400436145885074,2.52090863861487,0.14453692344095134,2.3515525217770943,0.7848694058697974,0.8403292841024124,0.755196969816267,0.0019904079693827317,2.23355891475633,0.07737719748099328,4.3223853197084905,0.1918995332982597,2.2834405332781946,0.16013412311654418,1.5821398482432154,0.32272466368259517,1.3044420157837002,0.026253738978068798,3.880288317674681,0.003083539272924444,0.2136764187939313,1.7929401976320831,1.3084086507508155,0.5275269119719076,2.6986039717086863,0.17179878888357014,3.880934513011299,2.0395306436523217,0.07485661348326522,2.0591818267120514,0.025046719704203024,0.31760064119180886,0.5449005258210599,0.040545256768056356,0.3215866999528204,0.006021336887770186,2.562320340060522,0.16167393548519293,1.6004645868197656,2.127785897844862,1.151109127366979,1.5435053097130003,0.03338427450624642,0.0009749782913284599,0.3156991560857703,0.07515818590225218,1.694792190845886,0.021996320707931234,0.5956917989795383,5.574823405723389e-6,3.1719214117530217,0.02579066245388385,4.517979390815083,2.8533857896715817,3.2994346303456155,0.2511030552712137,0.20711735423471236,0.01975043483882908,0.09377707901464799,1.1899637068942612,2.559979483455395,0.22135013686185315,1.0829725047220435,0.038512737442540086,0.31884195993337927,2.296472125192785,0.6017670244010893,1.1547255618453527,0.2267944454929873,0.07019026909339499,0.1604421690430079,0.28061717362554456,1.127853060136763,0.2328441883958243,0.8571979923948458,1.2136140674904445,0.0812373747440695,1.012174484911474,0.07727070444584422,0.21408050568626016,0.07587279273778842,1.4235210404996415,0.23417515470677708,1.9247621359160236,1.9154014879134438,0.08027498090435792,1.2693440266671838,1.3218927421983682,0.0026173869908642073,1.4029232300239105,8.425648560061101e-6,0.5619810246917781,0.2560814745721075,1.2592931144134831,0.0031275616203230517,2.9672160988394865e-10,3.490003661542439,1.580004242094319,1.110911355383425,1.010122368798847,0.04871528340900029,0.045056958943080275,1.585890797748808,0.23597942052519005,0.629414330136343,0.14179087305189975,2.0919679808873837,7.230531376514604e-6,3.574887917125103,0.004551206845064577,1.4371987840292677,8.226779216308353,2.122047874339519,1.5710656548108115,0.03823005539876573,0.013045227446419142,0.7957339145409335,4.1401863427426004,0.038226642798855556,0.3946932758742592,0.1000729305908725,1.040699033275512,0.7272259883688263,0.26963075085901067,0.051342987853683936,0.03362575845604454,0.25956777516820645,0.7456181114989158,0.27583395309877806,0.39603032932244403,0.37017668177793916,0.2941437746697994,0.0441792840329496,0.4851323638104914,0.1740329522561251,3.3143843008614735,0.06748261229752016,0.5158900263404053,0.310042971973117,0.09579558277329747,0.00011241880427445497,4.321656574380462,0.02266065087956174,0.02614158631724034,3.1690660752476085,0.20827806896807324,0.35930109796907983,1.0540182067550927,0.0002989604075439608,3.8072977078932837e-6,1.077748770291635,3.4838375113055256e-5,1.890590354961073,2.804144836459505,0.27363957921589216,0.016064885040912354,0.041432900357600444,0.31701601038888205,0.023638530930153355,5.225969236218665,0.0034952569611218327,0.003200699862162432,0.9696600311585633,0.14802667473673453,0.6890870029776471,0.0013779240498968883,0.012861349122738683,1.6010894153229085,0.5958569343733608,1.8440841156919354,0.4557827387764093,0.053967330328838034,1.8579912548096547,2.12180575158589,0.014807407624080483,0.05687397722233868,0.3327174538474449,0.650436267734259,2.027644366960939,1.8313069316572697,0.9447954909202819,1.3412471788811702,1.1663980118559238,0.00025615303347633196,1.525562900816071,0.04711047771974964,0.6329776956163209,1.3254228378495367,0.018181761492470975,1.814068637132227,1.4376870892133553,0.01309231083805108,0.10265282949378546,0.0011570080551020847,1.61418871095489,0.6360744764254005,0.017673659747212425,0.44084285059966005,5.428830627076226,0.0003262380488259938,2.026552670986682,1.7286270723221746,0.06071759145899137,2.9181856671938267,0.20460652384991845,2.6721831717972266,1.0889572728827859,1.234131777948815,1.671673822386321,2.256977588995093,0.0660734211035144,0.07713675543823342,0.03230479682058895,1.6152638422144983,1.900606159772432,1.2553874038489208,0.5372410779240515,0.48063725802654633,2.105665988271372,0.023346380606494046,1.3205336790301334,1.1885070438671756,0.36997398967083683,0.0357856015491541,0.7246913219062456,3.5908404526036155,9.086767554734827e-6,0.02997491400703282,0.12719263859575033,3.210295788142399,1.9855442857399463,1.9612689849912421,4.285528338344125,0.0070524083129383,0.0005354084571699558,0.5775410317507779,0.284674833547454,0.7783770141531662,3.561304977412934,0.0028078763046944385,1.1129304922801273,1.6319199067473686,1.3786719888960857,1.2079750623590746,0.7597346612353516,3.3509542092658777,1.2618294419312215,2.632424628930674,0.41357849164719607,0.5368620754722688,0.8040350733779087,0.025314798869480775,2.4679646479498443,1.987208603336725,0.03576783175058144,0.17960757985877812,0.7374783613748255,0.09269648465812619,0.24459861862417018,2.7260739358786816,1.237576008707587,1.9845957142893151,0.003312395242621496,2.5296007348250376,0.2428831413267212,0.162671704707963,0.012469624496315066,0.0004563011461224006,0.03102937982751276,1.6282688010418458,1.609578909063607,0.0004963321610291855,0.0007176910762811929,2.015145995520867,0.011153472956894686,0.03416307550763533,1.9305418031203296,0.31279563415849787,0.0015201082535330934,4.3032504376917675,1.1230529598344081,1.2577858537045619,1.041440275786858,0.963702908004105,0.0009707715614517581,3.2154214182844054,0.004134706118374548,0.019663167688103944,1.7106650610204044,0.9047958474278005,0.06423035044984218,0.6972636115714677,0.48521534677281414,0.3679437075527343,0.0009331205428171319,1.1755513826476163,0.015331707013646466,0.1435451055450796,0.5326602714659088,1.3424719708785053,2.153482102752667,0.8720772923761209,7.507700550119562,0.06990077674301438,4.3848449039330666e-5,1.1172603076426186,1.5539446581574,1.3153300649281194,0.8995269404406496,0.012339487829448974,0.5035870323623628,0.03345793164674766,1.6922929141589382,0.37011171360277223,0.000343484236813895,2.304711026174485e-5,0.5695437892529315,0.009723066760986353,0.49452919747764823,0.9116051629407835,0.8903961156912094,0.5970011707206083,0.0005157106102244133,1.1930970456768146,0.17306473757713559,0.7997913106474992,0.636564211581317,1.5668897600029397,6.294544487193594,0.4742238184553534,1.268047511462986,0.003987552395643996,0.001476221574776968,0.32204729447706865,1.1469289667766676,1.3504113227747168e-5,0.33864274773069863,1.3098450761832894,0.10257575389590555,0.5567479084873335,0.9810453099666597,0.931914377023021,0.5807158080962282,1.579166176763408,0.2619201662796296,2.1573545505016485,1.0194157903772876,0.24817367195323017,0.31773193985260684,0.25843882819619723,0.7154602037261344,2.100946417063678,2.4474985826009306,1.555664716976931e-5,4.468192974165657e-6,6.02322495575094,6.211765593641847,1.278657525973701,0.7206654342007852,4.1034358269142,1.209214397558368e-5,1.5491117445309075,0.7687254213617079,2.7849594002818034,2.4635438543731554,0.00011921398896866885,1.8140925274670883,0.11888486022633828,2.1281695222227053,2.5016552254124393,0.262355314040176,0.01866049565324294,1.2075077050232974,1.1010296025643584,1.210008557525713,10.086835727401631,1.3631186118788767,4.39736036217852,0.0013628521264764139,0.3177739978557918,0.9096826056197184,0.18943667126524194,1.3533709850399525,1.4394134650339798,0.003996597153697505,0.966172880388,0.030235909416801585,1.506726021210321,2.937023258654902,0.3247839817834723,0.01501715725636417,0.07634742916032664,1.8214079263805956,0.3739514463203769,1.0417956213590855,0.008414544644601797,0.005341280437333168,0.0008120660374022041,1.5417890144435522,1.374237226704964,0.0007720266627042854,0.8450917707788868,1.9998064147938246,2.1102135050250372,0.04076370359572213,0.02996602129100427,0.3324293802178885,0.631055450016251,0.005677821051292714,2.5965536874898962,0.0012376713884998409,0.009097619116013632,0.09534225917770035,6.474289929991905,0.2938785856310031,0.2540402824036418,0.3180904153585334,0.6653489415334679,0.022232991252532065,2.993552334854236,1.7888181472887636,0.008057026627395264,0.0001915107097842379,0.09110193783973217,1.5997238060022345,2.482840642630454,0.11659850672130917,1.3975869146942066,0.0013254162017691108,0.3732788753641413,5.648740829235596e-6,1.8376155394179585,0.529690660320567,0.010354331357698757,0.0541208165085994,2.905260926009983,0.8279101465168998,1.889223235809716,0.030341281878633795,0.8309641892223036,0.010125564070749906,0.1846808844066049,3.43219141001945,0.8620812369085155,0.2404878435703856,0.9140187236991348,0.2850463748725219,0.0007261453308138337,1.4202638899439193,0.12145464645669092,0.4067620902157868,0.13634832301517022,0.005916726426857307,0.5729862103884237,0.712367514912983,1.850039240448329,2.186370572852572,0.08519399308216952,2.8905419184208863,0.2888029400854226,1.8657754839707887,0.014019379536297947,0.6731346083720655,0.6758206966961389,2.80525636440702,0.0005926738108212706,0.04988910071918952,0.658841769222076,0.11375263643144357,0.00030230861109223193,0.3084479628564471,0.12183157726440422,2.3299626328873018,0.002582336420923801,2.1809267454276364,0.001483695347607661,0.14701941677295755,0.16604576391575043,0.021274939208359312,2.743986097682346,2.684256196451125,0.1462925833748309,0.012764276217095959,0.10868959318994444,0.008946607654061682,1.9176762825671767,0.7039337976222929,0.012728073777336991,0.03104344649888913,0.6015795542181095,0.0728837848956933,0.19259002274581738,1.7117130735100439,0.7759563400216624,0.3980303535218095,0.4962022642030965,0.8970589961433418,2.2108654350434236,0.07782357302155925,3.476756519281238e-22,4.0079727064150665,0.0052990170113358884,0.9911409511657943,0.2262314593838432,3.603899508235335,0.07835639957675775,2.6870578818204844,0.7839455686444785,1.0206454804307183,2.965856068044559,0.5578248210894904,2.2127209970720623,1.755822904003769,0.10855141929208556,3.1615029355784925,1.0692963851326174,0.030523251194545777,1.3649648678057402,0.25003179150366556,0.3419716202554768,0.8519865647679313,1.7011445624932262,0.975761884692543,0.027040335923992374,0.19706455370234177,0.8457118691870807,1.0242442206336528,1.8113870216284043,0.027690673692917018,1.1737767924291909,0.0005634870299278841,3.655359576555372,0.2507684951224404,0.4267911157386885,0.006023642902431681,0.6462484074000785,0.7543410968425194,0.002012651024056278,1.5936396894048828,1.97443791294053,0.15813974894154115,0.032381475815651733,1.0771597104119328,0.006594727421725544,0.03227343150266794,0.018198767140243863,0.009739074890992216,0.41455782531775676,0.06091175859632355,0.0025186447987979887,1.7212702979521999,0.013616793871945266,9.777649851128273e-5,0.4474946524783961,3.913611314638128,0.6061257452417744,2.637039078464748,2.7610150542105285,0.05511509192833325,1.547804433493349,0.3900469703756886,0.45931517950379713,1.0356758409786082e-5,1.8136516562410754,0.9376443943663089,0.0002908549835275092,5.809631722324572,0.852611797043108,0.20697721473862005,2.1135986371877813,2.151261230505355,1.3355277492502144,1.9551251782681334,0.6728232751927019,0.7798384247549213,1.359276589225273,0.03439560132028228,0.5337089520185461,0.005666893036414934,0.00025577452757802674,0.5026046727533586,0.011024328873619661,1.3494674545168968,4.327349921837341,0.22376391703589246,1.1368368506895541e-5,0.005635134234763891,0.44703522189088396,0.9209471551057606,0.16606162103817904,1.4234690430396582,0.04255350372325902,2.0903279521818482e-5,1.4492543786641574,1.775568364500069,0.003426964027108027,1.1204798966548468,1.9068236633603879,0.058820604580028066,0.2603500378794792,0.0019744939138846567,0.5326820652097828,1.1116895056704499,8.375324817637309e-6,0.026302255669207686,0.8393677055571368,1.1762717447255693,0.8385442431189958,0.0022523725609130086,1.2440631663813924,0.014029444287614889,0.8945051816056667,0.4482233401945786,0.002991322262329893,0.18142051305584933,1.4580038889457616,0.5742690224400748,0.0004654634132637228,0.006015917825606326,0.3592065182470067,2.388090047544443,1.427111753643988,0.5011737262925933,1.2851901673028785,0.06224942539537584,0.1234420270996086,0.9456001959566294,0.4859161272674138,1.236966098293376,2.167989539563413,1.1000117623797319,0.5869329340437508,0.30142339084935243,0.11826386875351592,0.9033611874157124,1.9345706163905108,0.5416212140961395,0.11488420104559204,0.5886278457082813,0.18385653887009806,0.24953222919488305,0.30017707507334457,0.1760055358538668,0.8780093559910798,0.08158759171622013,2.1220843455375724,0.6902324487358491,0.0012758566071704026,0.03833814453483642,0.0014591584911968706,0.9519773466426968,0.0010306708894879072,0.20128603531995087,0.06428751659241545,0.060786730611044386,0.0051851542924413185,1.1239398774834453,1.1909428541406888,0.7858316248194233,0.14199385576004295,0.03882311170227113,3.7013253428327055,1.6579371465964312,0.03006010681884024,2.9323078853476554,1.1200829706142401,0.6310044384428124,1.0434089128267112,0.10247807194126834,8.605930574587548,0.2672520447833553,1.0147543033815345,4.028476846483419,1.0537040484186602,0.22775801023929915,0.08670345532764469,1.003183443991686,0.001993588217696746,0.0023781625203114845,1.43457847244945,0.06806184132283095,0.000246793529033957,1.1451602420735252,0.0016647175605432165,1.0356177020248343,0.04768304774901298,0.5891145518563082,0.43328927275302936,0.00891127394959663,3.7916470252156533,2.077919191056483,1.0670489408255726,1.9739211786952655,0.25578515682885783,1.9240715215004514,1.062676656999593,1.7982813519666199,0.33420221962839586,0.8652912636600391,0.2360816360234768,1.233387080270282],"alpha":[6.019377746658878,4.545365193724429,1.8475682462562615,1.652709262457157,7.147786989532885,4.090631727898517,0.6435934396617693,8.040274706930662,4.587428151154351,8.914256379958951,2.749577978455622,7.6469788617995,8.653422077985445,5.906624593594918,7.961241753397255,8.485479609513716,0.3139673798633824,5.43611016181202,6.9340736467257535,6.438232651388813,3.611884638221472,0.02532767497644306,4.215620404005229,5.664698345619097,6.468298751708296,5.7142050262980675,6.4810022730158785,5.293847734133079,9.417782624344458,5.489761739036094,6.792892709885143,3.0026706441766127,1.7706464950794176,4.974787994407961,1.155817551902385,9.381221652326143,8.463922382500431,1.034294679053822,6.127263183207726,1.2427580819703943,2.2582105216859105,0.9746177059889938,7.406120370879776,2.278017075155485,2.1987936420541376,0.7665474725639121,8.501537606441747,4.558516196332063,6.703364847228781,9.549642249926455,0.7268739372961264,3.8659239909332177,2.0615797976068095,6.681971072004127,2.9712611625601526,9.653927311787218,7.264786564402108,4.156357279338105,6.261915487578149,9.750002780767828,0.6374667775096943,9.386743288698048,0.9902130456469416,3.315564348517812,2.3796351707950714,4.476663043216986,2.061912829144217,6.578668577506123,0.6292392361454291,4.203523350743588,2.225579811066818,6.789352245163913,8.483928647584406,7.1332757885818125,3.492892440865747,6.799934505053988,4.499242346362116,3.3498852601994566,0.31684910075759243,7.3069224648117075,1.7147760630452824,7.108873544059691,1.177762634736379,3.7568491265525195,7.861690537281549,9.264166759892012,7.855091854558525,9.049777435573391,2.076365320320257,6.770986374443481,4.2306467850982425,5.328974477906625,0.5172458032100935,7.146411429793778,4.616274430982021,1.3395099337537575,1.599394380060728,9.300613212811378,0.26116133004144393,4.425678274995624,8.610036168281788,6.706626453811069,8.948655563003046,7.326292639704612,8.81910125917372,7.754896629347019,5.056090209627295,9.599961346365957,4.813842264946045,2.094598811042321,6.770488898572944,4.995461285288907,4.898096571275728,6.249824152342147,6.231062768172153,3.5608371817402418,2.918742898521216,4.799311078988476,5.007579596730787,6.661728921967103,2.404840418477965,5.243170286208811,4.7276510140004335,8.890498506738032,9.390982190776423,6.533312328815271,1.203220205787754,1.891300127739175,5.343114339637378,6.628993306801478,5.301493294640347,9.506584075734747,4.4662143629121775,7.939866943100462,3.2517754064131976,9.785669961319401,8.989741603318258,8.56143958122854,4.286324916878222,3.10545833582627,8.931947962752506,4.299095085944032,0.6417103651561717,7.331498401571479,3.0022566989011,5.000061057659253,3.5728349524132708,8.500876434714545,4.645075218350627,1.532403811655032,2.6633442751646297,3.1853419866599886,8.54165443818055,5.846673171854258,7.025727665030974,7.2080008017579615,9.25418891183847,7.551125536791165,9.763164812225506,6.94246109563273,4.220098956144813,7.348707368913141,9.956110399980375,0.8711170936071255,4.294604029631932,9.42713761347009,6.882837495042519,5.597995352371948,5.694409292423062,2.0831677049332065,3.9489737802856095,4.618353042141939,9.859526230231012,8.558891800901185,6.025447052102075,2.5663449175642894,2.944712249401742,9.899017021369719,7.032490427319901,1.5530677041561414,7.109625117393481,4.5325222761614885,0.3493909846449994,5.333878047312526,2.457723441345274,9.417840100604167,3.853037071278549,3.8804775025285076,4.864257434949235,2.9938821156001882,8.837494657333377,2.5694093838937615,6.170318719203777,8.818700900266567,5.324381880961768,2.9472562883315034,1.8731846304887134,5.642119373423444,8.556707391108487,7.755537904380107,9.173343807177412,6.998127032588137,7.257265002053684,5.317543097650772,2.163969927470022,1.0446960245475712,2.1333140137129836,4.364571954511884,2.625057260223471,9.990310251968681,0.9998155221434191,9.133200597774575,0.6677764462975877,7.764843847764141,5.449447565759204,9.933120933100447,8.509758676874736,6.230850277159778,1.6954878952763552,8.17494131540312,4.098396646381881,1.7791367920664403,2.8323886999781833,6.3008572678032015,1.3443944401556895,0.4002900451563507,0.11438928147505356,8.047052109826886,7.492096934558347,2.2554280221085854,4.742358068742895,2.351740870406336,8.090417948315583,6.910381373593237,2.3924774425269657,0.6037057249730227,8.68014805784485,1.512655476749547,7.101697123456345,4.653664508633577,4.072199620408476,5.418508693254045,1.5685288174247236,6.799884880522842,1.561095713300913,7.499923825768329,5.25663937794445,6.941073584553288,2.9593766952231304,0.806472949970023,0.8994848776358122,9.732728152737522,4.577181707875255,2.800749710487751,2.97951406617057,3.8035924517531594,4.591932601353179,9.013979019050558,7.542655728261673,5.767482755510088,2.5676522807195323,0.7822792336567264,8.687037093644562,2.139084774072195,4.845174857972003,6.00191779929113,7.155201950822551,6.392635828093414,2.988542210713827,8.138258213281805,0.44007850745025223,4.286032165363545,7.5261828411277705,3.2981927191126803,9.932591693560962,6.481793145588773,2.807313339317863,2.8597513083067083,0.039778075290006765,2.3298667997756284,4.699142483593095,4.254251106907314,2.7384902625757546,7.713379636427009,6.209527267038915,7.4351645979853735,1.5435724464147271,5.917029772533409,2.4831394903065496,0.38435322141979755,7.644343184230169,2.6485899775310418,7.7647911642392025,5.351910319526025,6.136231078593184,7.547596527255123,0.9375991456572885,1.2030185893099565,0.024020476019137593,7.410680483616061,4.10550016818828,0.7916229652246298,5.09103084918544,7.31846242605042,5.6125954767979,1.8515583237213118,0.16921235782933364,4.919717739923328,3.6016126276352467,2.6807850130100297,6.997158490002882,6.869411514017958,5.551208319170096,8.158727949935402,4.559087148648111,8.644930099785405,2.981329236384511,1.3688975115371171,2.7525909692805173,5.593262839439744,5.4352954269049985,8.142142870288767,6.3491924271122135,4.83182599802875,7.298163527020776,2.3067170250480973,2.6041849247450766,1.260438984433765,1.6558686596288563,4.702110462495281,0.7257637196692679,6.67375302228068,4.262725789540367,8.013593290099973,0.6195067123915909,3.316916498174134,4.754082990372892,9.244759050998844,4.794269438890826,7.742590732316654,4.182465114656253,0.9569756666800178,1.8512351320311882,3.741483853030556,7.0961871780514745,7.313566051561427,1.9667149872361889,7.57183967570877,0.1740710763763187,4.18297355900501,5.081151787939325,0.8025866464559117,2.986074358399655,1.2736330845366406,0.48919355057064573,3.439807827583148,3.8792159849117813,1.5929026724438944,9.009490048691369,3.038252304767368,4.585968523089976,9.703044700753573,2.2599844324146945,5.508678815470029,5.0507319385713245,8.348707742638979,6.978305425770106,9.155352015079028,2.1640443996624037,4.78654061281971,8.207484044389295,8.37803571316588,8.912672551257668,2.4477792704997303,8.817325689280057,6.090757475669086,9.274043514581836,2.327325740875259,6.226409885492227,9.054282604384046,7.7436726953253165,6.850021522056364,2.905128517553799,6.154637844085899,3.882077158856825,7.0757427235576404,3.8982307547895667,1.5517255767756888,8.475576824416882,9.371658767200966,1.490755280046978,6.4517241083923516,9.110380063038765,0.8845162984558397,8.675013869020136,2.68887394613325,7.719908338898092,2.55742246672769,8.089520539636563,6.205622855358999,1.0999244605687308,4.372583656793305,5.644312973619103,4.0214281861034085,3.031403215869981,3.182425013345127,0.18468297839981052,3.846172622738302,8.025611667237262,6.567828020929138,0.9898388484740073,5.454186087475501,7.328466202598005,5.779335059576692,1.4754285126572797,9.407995629893113,2.859661487599936,1.3235977473301408,6.66034781731657,5.0360001521762054,9.650669382814783,6.050909923977814,2.3184810738497807,2.2898057832426444,3.062491507578533,7.637840284451025,2.4785112029503087,3.042172275256989,8.24265189668385,3.29224162853359,5.203264036418971,1.5889186783378761,9.27232903584981,5.38360058410295,4.239240667555548,4.659590150969755,2.15924570982464,8.185872433655357,1.0448926987601892,1.5779162360996568,1.96466981287291,1.8859771113441859,1.496076390365264,1.6485552913439805,6.631837552432225,7.7055364613829225,9.444693344439198,1.084570031597134,7.867518605150183,9.693921070808283,0.10328186006800077,6.348803095295821,1.3371055820086664,8.835699577726803,1.3504576984978112,4.036230201198303,7.644147531667542,0.11760019767269814,1.2001007266778152,0.6103790961905231,0.9565649134043008,7.6142039658423215,6.290802690855974,3.939344907860989,0.06490229115445612,1.508310388366001,7.024483337106309,9.77707398088507,4.497598796530122,6.865107681729869,2.6752522412626223,9.009360515636706,4.129757350234307,9.684854954244269,3.8719852306172964,6.7164153284172805,0.29751237706018285,8.51171137365907,7.182826514778082,4.632253493966269,7.207870128428269,8.434674076302448,9.091812977176739,8.28643691189222,6.34691972590166,7.645290190166105,8.088308740777705,4.936775788956669,1.7384732618207233,7.350965392154938,8.39008496330978,2.399008591729943,3.1988382548182637,3.292980200329414,8.902064050239389,0.8394875655482603,3.1912016953150224,0.8025616345149067,0.41940849271577596,3.604253224523808,3.112670938734823,0.5085912971258089,2.717778052867954,3.636932966486761,1.8479009001802882,6.166310097755208,7.151519665197972,7.192598245354056,4.849538239052293,1.8248551265914381,2.938705971683442,0.3539360144609227,4.422001842363605,6.449909730091048,9.993806101869714,5.713787562048771,8.44772073596294,5.101487642227898,3.6483920870626907,4.883353779547632,3.2013412331041136,6.554999581463175,5.597902584265131,5.89299232694152,4.497555757756453,7.341180172986681,5.609342570050599,3.866421811416023,4.7690868572920175,8.334021740615558,4.8503524777076805,1.060158996794447,1.1175322845672286,1.4347420620735507,5.224734705730285,8.74803084592518,6.684821278663704,3.0922631465488903,1.023212673024747,6.017198123023412,2.01159230565479,6.30321945233,9.755247232648397,7.9300259529167345,5.34878190733245,3.0231098629400677,3.6383594158351706,6.273320687259101,0.7353194334059299,7.80511004767102,7.921554437936528,6.071477501153466,8.435568139906822,8.474813780967263,4.224745665303901,9.007720295643423,4.379333177896962,5.18612760040855,5.049726449749858,5.79032183412277,3.285371596224811,1.364262478678402,6.920026230122714,4.072163828675972,1.1112751196434334,0.5028040073269446,8.212392884564956,1.2148848070721074,9.658408820837309,9.024603695702478,7.802201349087463,1.64174372182617,3.4723856264120934,4.4237091887525315,1.5576455018675883,8.115796165151515,3.974128171334508,0.7973819565617601,3.506334803373299,6.628031462457091,7.017441891594984,9.195007358265869,3.4092238668100716,2.1337237046273483,3.2999073640507115,9.713833839990558,3.6547919586942745,5.856036968553129,9.234341269988901,5.826052721291042,8.659408809750635,5.668572762469106,4.415187114885466,0.08075068425250631,2.4387078224796954,4.235795407827842,2.5195106286644253,4.86868017981168,1.0042987873385667,4.125953206980386,7.959999154914998,1.2829025424884666,2.6317951496432546,0.5619691360417023,6.115135799606211,8.733542416303319,7.196645005963429,9.793646330671795,0.6951413406543216,0.4429648819489862,2.242417037194062,9.960691174422811,1.8841927263965186,1.8058878830806968,0.01696179941486964,9.532724947228186,8.56470187820829,1.9719784610071112,9.9080374520709,5.629595034933064,4.967933646955727,0.29162131318082096,8.385872066598584,7.020307651809967,7.091726133335447,7.521734481339704,9.835104775404362,1.6506073853190917,8.823260757301888,5.720796974283557,8.73262411068222,9.282694126750862,1.4330815715964862,8.013433658158673,0.1482292706184607,1.6248867930270539,8.223393078338821,1.400607175830082,2.6978308902507764,9.536299333510225,2.505692279829068,6.663703300900945,7.321637273808075,5.646686122363757,5.6615535307487015,8.894778539606797,4.53051357819132,2.3176364047922005,6.6642576541262315,5.65350097816628,8.80883063265708,6.7509358808962165,8.572825827186346,0.009016486205886132,1.7385486112554815,1.8082154596760969,7.151363865620866,5.463039266141145,2.469789792475534,0.7016472569706478,8.481630728159896,9.55224456170783,4.0353766136036135,6.522413849882273,0.6875185147784446,3.809023973816219,7.413234474760799,3.936086665578067,3.443033552315895,3.2159744332859463,4.875146815964701,3.576978959094874,8.188975678224573,7.243629449366804,0.7233130535386811,4.149241414757281,1.4155949151374148,2.0357111222373425,7.961939020709183,6.250294225041859,0.6578897941671169,4.963100877916034,4.456445607730027,9.330311987647574,7.3392277077276695,9.049845715246988,7.393928198180591,5.169905037530915,6.195549337665696,1.25423448145767,3.268624119027508,4.018011920694693,1.1143893615525569,5.119578294832429,0.07565078888460697,7.9227796936126875,1.7176591627653215,8.070704632912022,1.2079438206651116,0.7392333502356907,7.0989587793694735,5.952584797931914,2.942805174346539,5.030532864856207,3.2041742405890594,7.11623989392149,6.926134462742944,1.1137981928031526,4.021739643471259,1.5310875110954059,8.20879728684336,3.6532004516396643,1.319263427677746,4.7982847220799645,7.551488065618619,8.090937095971597,8.588937396869635,0.4108893158520255,4.010711389405708,4.291871380187411,2.676139610628445,6.785203520710715,1.3694479888110056,6.50491145657818,7.317694206811193,9.627453988222829,9.13953154499836,1.626916008556114,2.917200545527474,7.059916247272184,3.7965304369503894,3.396097699179501,2.936266444217246,2.942630080336819,6.23793145461883,2.883398340836796,9.834233850896785,4.617080652597913,8.30691613458248,0.795817730396291,2.2229033512707863,2.969531735466313,8.087146161320888,7.052159431770524,9.866251025006614,5.210479525540488,9.009762994565406,9.082845325917301,3.187495987240383,7.936643376459376,2.1992871872949027,2.4028150537909654,9.03421911435315,4.108235305261376,7.62770383580067,8.593140136088852,6.0389901304317135,3.350345282416811,7.0503504105993535,5.77810183195748,0.1825880077988029,4.544404528874875,0.8119655022962946,3.8785449064659394,0.05617437885937937,3.9699905979532346,9.421710077523892,3.862236792090612,0.6125987189723037,6.173118299100642,4.253152976581875,4.679999796334808,1.5281276135531563,5.378326843519758,9.31150229438301,4.580560154122654,0.11939844823502188,5.3719322069164726,5.371317210131668,2.958300931232616,1.7225602497874148,3.965863367353526,3.610739578456703,8.01824941202276,9.001982124041717,3.501526477347341,0.5984750035881614,6.728753205671191,2.507995440600619,3.8365153891883907,0.8415109623453576,9.204591671676853,6.421930694677565,7.829739885548563,1.212717618849506,6.261353279075266,9.471593860150172,1.191509551704375,9.876484188020813,1.1973289236346085,2.87668331971078,6.5515493255772945,0.3651387487143287,4.170880408251493,3.382471856506599,2.17557665960445,1.4677412658782618,4.232756204698966,0.7215967870148465,4.938287284041028,4.815358704791781,2.6242459375019256,2.5892828016052793,4.2747316770734916,9.97618073163486,1.331367416096314,7.141162285865306,5.3410004219419065,7.032348133332304,8.938910171239257,3.85603063586498,7.031301403317613,4.344026491344001,4.5307586061558585,5.38037636400847,9.468048207141011,7.412850088817673,2.6417675211409986,0.6809667772463057,1.4769563077236003,1.468666496296267,8.27403058461014,8.730732341391318,9.190953951989387,9.370288379483526,8.865100245422939,6.019426383787612,6.022892618953037,8.663203990446506,4.069762951571181,0.320817779036795,7.4213989022717675,0.6474115772793354,4.788321337409527,6.016538947870343,0.3591967597091883,7.2431333819582395,4.5906322538868505,0.408549724169629,4.120710058259515,3.009487855478945,5.881108133876665,7.46841069946226,3.1365505353528356,4.837325260437888,6.950841124137915,5.3695347929332655,4.803556231706089,4.5453351083269595,0.5119769998003054,5.107284550375743,0.17613365985634566,3.4643878498739444,8.851762359136114,8.956225229286707,1.1236315041452216,6.0821951808468055,4.429172881677861,8.992054015110922,3.711698630308804,6.7119892585022845,6.917631773112745,7.058146076616952,7.039910690851567,8.043322348540151,3.467079214507609,3.9540225179219335,3.291163841003808,1.8426736323479642,1.1699078342304148,4.17073186219993,8.148008208384198,2.1094628383649128,0.44971164704319166,0.20021037173269862,3.331106988656558,4.820208342457642,9.954177632741954,2.6527003614015476,7.633117394991666,4.991928053661585,0.13422145254370577,5.76903422593114,5.34128239817675,1.394401825687006,1.2144507037655439,2.7243739717119664,2.18251957016941,5.985262565914631,1.2847972016767129,5.956898995361126,7.300064749006447,0.2792099025159689,7.737790023041304,6.386249319481905,8.983865510914546,9.16919926604841,0.4307975571589373,9.10340683603146,4.720359616304181,8.397570287642361,6.508168537399124,1.3341889198534274,3.122788522773834,9.637966170140025,7.599454393392191,1.6300189878905025,1.4949391624249153,4.575288236607118,4.101706661059168,3.0979062589183926,9.337657605814758,8.754334275567036,0.6755361569570173,2.761736069547731,9.91641959697153,6.00952049318842,6.940724903648137,6.12015621015426,8.487894380004589,6.73659335303215,5.542671429770223,5.628750294286364,0.7736361120989188,9.382534812259784,1.9121416211963704,0.3688733741865313,3.1656057691249173,5.665594849851989,2.23262210179215,6.23231121448657,1.3312558866503976,9.206285379001859,6.101368213446494,3.6961959920103893,9.290180640066533,0.26486447321022677,2.2359057985750774,1.4583674199149899,4.260121904062901,1.1586065613875696,3.80738981239648,1.7288130213260477,2.069279329711855,3.850649596869582,8.597216308552593,4.876212313299224,8.71163517557942,5.742454240784043,0.7543273106314707,4.20485406390249,2.65367046360361,6.776609182140216,4.901170504054528,8.462838315967216,2.666239396537662,3.4946820767306996,2.5332177802946854,1.440227367036011,2.013571194064867,5.096163656620192,1.1383119414708487,8.775791116796938,8.581597214855986,4.765714880859346,5.01161509766373,0.9681848070967303,0.335961923443977,6.556585848073455,6.937177869808111,1.3937091221334152,5.882936645164141,0.2846044732834341,8.126097782161171,0.3229201327387088,8.832974945638231,7.228850306192944,2.0703315178919146,2.9476260734657456,5.252091250536219,9.276298602134931,4.985027179583168,7.59582292875185,6.325766157344748,6.14139092285372,6.7033862280867185,5.655943023136942,5.69935999052221,8.111350211761089,4.32744423210587],"x":[0.7189109093139956,0.45512960146062786,0.962216928506874,0.8185610529751597,0.85411673776042,0.3995137878766515,0.26335353870857015,0.05553476205819052,0.014048065542502153,0.7681868334151682,0.6032217000564135,0.05219384767569557,0.8098541796172407,0.34267222434777067,0.031898533623973435,0.6041941965105442,0.9888731759827942,0.6178867061173152,0.33012828924976456,0.6367676037516499,0.868203545147423,0.12588642361107993,0.7212654320929581,0.9774078995916735,0.31072105188217414,0.9827823854415518,0.6416109507347942,0.7448984510158083,0.9765569314644427,0.23054175753303174,0.4782038960776893,0.9664575205177646,0.47876634402810203,0.21720583932830473,0.9546062527587973,0.3545510351842722,0.7301767568166642,0.8114982571680847,0.5968295902140539,0.18798134621475682,0.6728750882507175,0.6389062163396566,0.5991265166693347,0.9802788639264381,0.9578712883487748,0.2787933676483103,0.17758700649603765,0.0653862808244412,0.17010070897075447,0.5565935570119425,0.5136873989111663,0.1452489185027812,0.029202625184570286,0.561659579235021,0.16856699945229758,0.16727021689114263,0.05249164840685827,0.2537707614722393,0.2025292940412151,0.3476843191586205,0.880632389788867,0.6824327913937878,0.8535459516510306,0.6148182816405399,0.32971951681650413,0.6553094151233083,0.0121799649647647,0.17846415683896044,0.15811036217132202,0.43116301468646934,0.6235073779277005,0.9098209433074502,0.012584603615191536,0.4937776021718401,0.7269963301128108,0.17559493039241758,0.37869713093596946,0.03541335360735465,0.25998064245747265,0.6901768302255586,0.28582825039453597,0.22158445005905691,0.7792164439263556,0.2740691535419315,0.04950355207427637,0.2353098760650003,0.668314463157067,0.4648349084920409,0.02865225312153563,0.9846849000060496,0.6216889524022573,0.4953910572299054,0.6429508078626884,0.3896148087469229,0.5977619403173595,0.5267268379755623,0.2872604714346014,0.7334268172717324,0.997505994318066,0.3393752088781876,0.7238344381488786,0.13466488386365283,0.04123195193306084,0.8398418337003157,0.12883201082334383,0.008395258717778686,0.3949144543501948,0.331653232007469,0.11347005095951657,0.7088328658156087,0.8525783811853098,0.3780546844731296,0.06562579840078553,0.45484179113830203,0.9122235646140622,0.6585717194999816,0.20137351756830735,0.7256852465315542,0.11107116976238474,0.8588650760220131,0.3803196982487276,0.8063535628567002,0.591174905068941,0.6374166468141209,0.9679334599609373,0.9265907959600821,0.22552042732082223,0.9094851625971245,0.25613950061252266,0.40094410560505733,0.6288682592012544,0.6250827664787835,0.9519691268771231,0.6499301658521761,0.9192188545465783,0.2793859410022148,0.3547178157989166,0.1941807310440069,0.6959914819107593,0.10221421662459251,0.5002296978260596,0.09652016741763836,0.7396356820834473,0.714548153157009,0.33078908523922657,0.2218453994495142,0.0664095865870975,0.555539135119991,0.6714065810571848,0.7623923140954418,0.9335192273299266,0.39836039529410017,0.495308076235323,0.706489481602558,0.10906532184511408,0.19417105848276628,0.6304235609329585,0.4953896086589449,0.9888301757783018,0.9958672865515441,0.537906622649905,0.07765463008547036,0.08294778368382394,0.2943664681720475,0.015731831104133454,0.2285331104066144,0.03273693844831804,0.7419347877834113,0.6814479755497398,0.21757455849209717,0.77553543696448,0.4777826974927242,0.9601092775138906,0.3739664899357793,0.041733368600693765,0.029229992349929512,0.8124669352189189,0.9009377735183002,0.7909465932607314,0.19755209569139187,0.6926789712088286,0.2537048843559879,0.06588650127167073,0.8255138420170955,0.2025176119920944,0.6962560813665759,0.3328068639640034,0.1638322484122996,0.0514886133704493,0.6325287844500993,0.057127465616566786,0.09540003392276164,0.4967371235628051,0.804491652061968,0.07033728703113296,0.9818731396072793,0.8646546465078175,0.0987564716723377,0.5814362279887157,0.3874591004446999,0.2541020360853541,0.6322756360057933,0.2845340796524902,0.9864435635704951,0.6530014435908165,0.8953577024358619,0.012524188521759516,0.8335979559261133,0.5154111114220181,0.6963440965789003,0.30755519300379164,0.24715499007563624,0.3685667753024584,0.6271484796092464,0.2312736079036637,0.16460413415890107,0.2244617025254707,0.41018825823034066,0.7193344273865463,0.04215391394195844,0.5476995659156219,0.6331212293937021,0.583228248332176,0.25712841376778783,0.03203733300033029,0.6123988733468786,0.5304354305343593,0.6166760110978189,0.7941092613295759,0.24876890275526975,0.4475324848561102,0.3214597315045393,0.28283538282485265,0.7803869037300171,0.2040732875884188,0.5870854823999441,0.7959107801869667,0.7395907066031371,0.2678157934483085,0.7503994429167338,0.7848301158825182,0.035004908571608206,0.5909684572166511,0.0826822428658176,0.799785483083246,0.47077540220744263,0.35375037987334723,0.6630294605378015,0.6557836427016015,0.00986731534257479,0.17145469379703004,0.43555227669331487,0.9631263623784778,0.19927879964318285,0.6791073546900603,0.7178119079804195,0.04595482762473635,0.5303547506867972,0.478427779068505,0.5945978328150372,0.2284349721669554,0.030223854379967552,0.607165404023631,0.6682705738257824,0.9070546924709768,0.6005970493617325,0.7074525580761337,0.589428388424696,0.9453200791755203,0.06782311318132983,0.31094666360388246,0.5430608052797563,0.007420953350888659,0.07501378423599836,0.8902057470252345,0.005461335720395422,0.07777358114811195,0.42871445157006516,0.9005121705109516,0.1775150037828519,0.496464306044361,0.9709128035888477,0.9864166572029567,0.4461519551518047,0.8138983464932978,0.06587843926793635,0.13192274390151804,0.48700950336047577,0.32722432604955,0.6431364830327224,0.4628662541074582,0.7295980373578852,0.35396843909941245,0.8569660831722656,0.2611991075349376,0.7331859786011292,0.8684060869938346,0.11875291367763396,0.3749890519720427,0.33160906220024766,0.19595311529247272,0.27421267968693286,0.21846395237911254,0.6289457618633063,0.7363886670740301,0.37309786633798603,0.3951775639998443,0.12148129071295122,0.8781968848843456,0.09060399110225825,0.14321851755655635,0.38258312445652276,0.10406808385168342,0.4117337774470491,0.719685562184996,0.3701092192310167,0.9468303362878634,0.10618681704647659,0.8896520280104483,0.7044885331622217,0.4191655867184385,0.49193594135522334,0.8460658825296212,0.27684406072710277,0.8158664064982557,0.1343803173532716,0.2459719860650158,0.5525270334839201,0.1868769804535848,0.02605154741863358,0.2839147379966027,0.15040781718040663,0.9723664504823977,0.8410328396646096,0.48460712014338814,0.24248207063261695,0.8130926597818973,0.5701555289483218,0.34600639967671176,0.7207486913531183,0.3772760153334882,0.40677934393336734,0.8456115260548844,0.4622623212994603,0.949146081981737,0.48376049753464123,0.9812881158545308,0.7562349699308082,0.9031651422219371,0.22363906961156887,0.9686281312106644,0.06617071784154338,0.21341583070452108,0.11033097281725324,0.17924507372914733,0.6204111385281703,0.8827645941323738,0.5799536606746021,0.5902969805973923,0.2257446545596411,0.7249634297674947,0.7898638842511101,0.8745456759377648,0.9340453546845175,0.1341104837610141,0.29941197944917874,0.5171770525396064,0.9308104532802814,0.634500567791159,0.9050590198170805,0.12790339501257897,0.7176705326533468,0.25832192904266504,0.009512505369301927,0.3052010279358084,0.10928824159664696,0.7692149673525037,0.842498550408592,0.7864044644123933,0.1690402621303735,0.6026981553409658,0.8456060664914231,0.2467068777328798,0.4191473763791811,0.9591854523192653,0.606124450846212,0.420935876835115,0.9088735399060408,0.6085650902540947,0.042004376046250735,0.2531503126158743,0.7043760197078626,0.36852238724934483,0.7660149640150538,0.006440511801228288,0.11294567957920698,0.34203350681988565,0.2796033260245232,0.4939089429855237,0.08017313856974706,0.392355567387243,0.36160833661484193,0.08205538332210205,0.5766779353827398,0.7571868482548063,0.10892476879216773,0.9715475153712676,0.1930527830118134,0.0768493560891732,0.5440274353937873,0.027168910089330867,0.36353338715425076,0.545961144171351,0.9309468630894886,0.9143626362570527,0.35443338614569875,0.13281864522573295,0.6311759307055973,0.8893844218102172,0.7675976249346621,0.8012499364044148,0.6366382611839869,0.4995705804793167,0.0012212767332284713,0.0076599766137497305,0.7788925630297288,0.38591261910619656,0.7182803141888492,0.8247419094776964,0.6561357515852757,0.7961967189639954,0.4360061328522722,0.29829613190188486,0.946118330205266,0.17554171263256846,0.9469024006758533,0.3420484548870921,0.9207393606772682,0.35530886226206215,0.9963989854865454,0.11571811172220992,0.839752330151452,0.7258712160359138,0.14269905326394916,0.9865559564838033,0.8598875220540851,0.846867910808768,0.8029502991529385,0.02058269224525322,0.49487355141306844,0.6631340742455625,0.40108714143472035,0.12639275754409107,0.8684722255659212,0.7016086450072931,0.8465514941530765,0.9359740847512787,0.2390334483770753,0.07436594953783437,0.8444549111116924,0.8348594760885688,0.5978973751014407,0.8151785762059369,0.4096507311368458,0.4948199657885499,0.8703821329876282,0.5112558852468276,0.869528793012807,0.37616114905428244,0.13305541703085066,0.7097128749870292,0.46725726037445914,0.28540095837805435,0.11844792498140366,0.7782060919782867,0.940155084152025,0.1281852798530807,0.46821927908522754,0.4276596370736496,0.10843728064152236,0.6208735798492271,0.6477401487476173,0.06627677051526559,0.4935986487672528,0.9200234026536436,0.6881016729133704,0.5465737413905829,0.9651374809861686,0.21356577292463874,0.5400171865435721,0.12093407158732727,0.6889618753462516,0.9560673505371331,0.2922191198878177,0.9592216832578404,0.5264110570442215,0.6495476154649646,0.05787732268409651,0.6721068278172435,0.31804706691860507,0.25498757908863734,0.40691670463822915,0.18139719051630987,0.6130974789913544,0.15200626242001225,0.6338833532575674,0.6631217165467225,0.5145841742178228,0.15343483869862884,0.7127338051786409,0.6517529260646533,0.3816449394998178,0.107502927191228,0.4065245755577753,0.580227963501259,0.5658311360601163,0.9973994941727693,0.14087651053444716,0.7413086716812491,0.3902812599695491,0.3352984963007639,0.6701602533307582,0.9978354192706484,0.12674674310538947,0.1386003046879143,0.020269611738538806,0.9017305677865199,0.941458735648721,0.2232848500651814,0.4732021995759399,0.3669771970582105,0.08293375783767298,0.7652689687104257,0.8942729342414795,0.7065245219488949,0.15673434340383063,0.12028782514484915,0.15491288659419222,0.7204489331660333,0.15377368391550905,0.2745955313305435,0.5564101225906499,0.7693058386382032,0.317046917575569,0.20779183692048409,0.3431396078081992,0.2420877011895386,0.7267508984255622,0.16753853291367715,0.9320211859232945,0.13072805643345764,0.33929969452044006,0.46978071771494,0.1321264786976324,0.882002827863761,0.9279039330323082,0.04053695147079783,0.7687201276695113,0.2844916578918575,0.6042318330488701,0.26980669172900074,0.8857799112442808,0.34345705212486144,0.9122623533146101,0.35951718843826175,0.4216510544643317,0.04052630467012741,0.3985139245349909,0.5910194577737033,0.4605426933539869,0.051237045716783,0.7694916026133869,0.2854193549403523,0.9756491364910653,0.5105900373806977,0.4617874500929866,0.5948167275529648,0.8721220312382887,0.12261400526457455,0.6898939739992835,0.5141083325773186,0.6871402286784871,0.38954183649780605,0.9202222666279272,0.1975748532966639,0.08261894229091338,0.9226368436188648,0.17866517986084185,0.9520565603447482,0.9507286912948243,0.9875992403323806,0.8169014636464171,0.7053924662011384,0.36736022856487227,0.3348956826105769,0.9987717234513331,0.42711272310271564,0.690164228043731,0.16061228647858572,0.28179661644830034,0.6478733375817141,0.044554230398232475,0.586123322413975,0.8038344621897242,0.6512846986476948,0.4121269238077967,0.5944469220373543,0.8533934697833145,0.6947460131331153,0.14979049652900178,0.5887607016760401,0.5856679261038151,0.4553339063972237,0.9314599181063086,0.6997285518577636,0.36994830125081557,0.07648064532912024,0.36544963833303323,0.7420083382629503,0.5513516107848431,0.8013120931219584,0.866509428447896,0.30567819388106265,0.9551344526710923,0.773325286632863,0.9639019368839017,0.5992500219382622,0.057732323900621996,0.2710032090011072,0.485492543590186,0.08662908589276475,0.08267573089148739,0.27643937169955546,0.5951032771527938,0.97200373536276,0.36696509386692355,0.5006301469319061,0.39793050482026615,0.405139491984849,0.876788204733417,0.30764836026678677,0.6779929942902163,0.5378012220139179,0.9796394588830053,0.2067782226405377,0.8508705813639768,0.5690130813963912,0.5440690073534744,0.1012377720267228,0.7783525988514879,0.46176937995896106,0.3325514983987825,0.04864427076133282,0.6830266388044155,0.06081126437514395,0.07410442637115411,0.3267821296732307,0.1261475694931018,0.13061739883699475,0.961022456902928,0.589168047844352,0.9504362382321008,0.21555025162528074,0.342996919446106,0.7365978350062021,0.09501637977574107,0.10125424118972393,0.16064630185506035,0.2569149931680508,0.5434363779731475,0.028378435928042567,0.4432071228673258,0.6313435637977949,0.4519014220165156,0.01928259777176744,0.4416704163138381,0.09520736234406635,0.7831271614239326,0.9318176650934575,0.7417072293482954,0.3279640373434538,0.4804933000379743,0.1610482626524763,0.08951943251555994,0.5732907542660279,0.12424743428185159,0.516418831129462,0.2673658661984375,0.9440636022763205,0.5466637935942233,0.6921565412456454,0.07839298303796083,0.26220184455204043,0.0864931595506635,0.36319757273672315,0.06361803749187311,0.8726172311548595,0.3341805851572479,0.1688744959434818,0.8595030153863963,0.7939134551118829,0.4052043464226449,0.2385858194094661,0.831728192248951,0.7540970698862288,0.8819953704646537,0.6047038749337279,0.855374896391951,0.25685741849757293,0.9076680740111491,0.12414733102092401,0.7886530472282036,0.04464458533486804,0.7644364886157717,0.21620613778340547,0.23560594993122352,0.7341426300111127,0.47149983170310716,0.22141405305211803,0.1876818509944067,0.697922710843236,0.024330956644850632,0.37669962225891584,0.32685396265062194,0.3602266154794149,0.26531855674265237,0.5214746688274046,0.9108167177840671,0.5105718164794402,0.015901750774512724,0.1402288264575815,0.5587144174405332,0.8705198629497237,0.9239752184225243,0.22856024340577585,0.30903865249594076,0.42583124925278293,0.8842467912455032,0.24079313419286286,0.4793124991496627,0.6200230907946072,0.13921038875055713,0.24537053182191393,0.10197712644051027,0.9034509267653439,0.11692740175792915,0.05346565792456248,0.5564913775036644,0.6483411688938685,0.8023110201245498,0.61936722959519,0.6973071800328037,0.7515799310732925,0.5891948973572794,0.44308096062055946,0.4407175614067165,0.8488603044821033,0.2175854762681959,0.2016709773592671,0.39624110369767584,0.24450808731405593,0.5557253271729359,0.18785336408829223,0.07706943208554518,0.4008562518804377,0.8759802089626605,0.9281998726865193,0.7990225595009084,0.6070226831817891,0.9655761856037408,0.7454135745732944,0.28315470271982424,0.7416707891617527,0.3489095199127574,0.1110444860878157,0.9882596371898185,0.1639162322152128,0.044675649619118296,0.15310206826477657,0.1547279084300992,0.42099263561662603,0.9068828778246629,0.9725670643225297,0.09865163319879011,0.36224521254605047,0.4421024186532705,0.6662356847966329,0.09072171759186665,0.007304163515761575,0.7548644637735076,0.39035113080635475,0.5372954669355752,0.6306086383354079,0.8437806597432889,0.29354412256362394,0.265152731077515,0.4147957774169959,0.5854500776117466,0.0005486021205309832,0.09691074709895098,0.8746375902940333,0.5530357026336097,0.22059544821496857,0.16932630321449293,0.6730785835340647,0.026896495824712208,0.3040313996936026,0.38814995477067504,0.0818014967443561,0.6058927901150781,0.3275760602429527,0.2551590453173578,0.5102548776604927,0.14488653088298142,0.8146999993234085,0.5521243550101882,0.23272564712098442,0.8040514310312916,0.8671394535341341,0.3859171356399058,0.09225584011664778,0.3221475621231922,0.7804582037913677,0.7265700456801523,0.7208312911909356,0.7386478629969424,0.36164012908562215,0.5982500803602135,0.12547649476345946,0.9040154557746822,0.1181045288863174,0.8294719828866379,0.948367581221939,0.13107609813922538,0.8422122552796458,0.3088894897094996,0.025845678714834452,0.3127790868509759,0.4620958301257245,0.9035789142982174,0.42991495983951467,0.6176307957363218,0.4353802903208037,0.9821715570975118,0.034286590105521375,0.33408580725060255,0.8395201098922052,0.7199629600926645,0.48479808135212377,0.38701585562859386,0.9868841113209326,0.010955385889285907,0.9583547331370224,0.12162041412688285,0.48086826223491475,0.33428739843082433,0.26405276274135336,0.9675807059383743,0.3695568140064396,0.17504050307148455,0.6609217899151956,0.7362262862316815,0.3449953195465638,0.7758729810842668,0.08030433974614382,0.06525600077804983,0.5575320581090728,0.9071772419943374,0.4203390490862917,0.28018650563249814,0.20911144176220198,0.4365472472714549,0.9566736476367488,0.27003592352243255,0.33621853274612623,0.9798910338849964,0.5181209744706026,0.9881354482723537,0.9519076495412853,0.22545308542873777,0.8466448831215523,0.4974865605460306,0.08388448095405399,0.21641005121781087,0.7718185231841339,0.8536589161460364,0.5683178148444159,0.9531441137850742,0.590670677629231,0.566102743359032,0.9048084943577652,0.644309602966562,0.1785045886813732,0.41161089747967083,0.9141507784677914,0.19611834389702576,0.06348743311143523,0.8341342794989397,0.7763869119519857,0.8812988164896816,0.6018836959026912,0.6141422595128703,0.7769137510520494,0.12706934806276649,0.25270035349990705,0.29726444727429135,0.7112071568757921,0.6735584640467107,0.41939914799996947,0.9150240737635975,0.843821799941489,0.17081142777649094,0.7808458423184583,0.6474576725024863,0.6530361933652977,0.7141328468034451,0.9291877294356672,0.8536517609982848,0.6951860091024953,0.12935028314086683,0.37662631561593973,0.9867131589285099,0.6330735261972313,0.326793285735572,0.5096279800924977,0.37333656468231924,0.7498987794380327,0.3270937112280523,0.204886781040148,0.6326185146163914,0.19521767627018982,0.6815288492599136,0.738701006857635,0.20886564888212478,0.3704768560946059,0.28008129007725224,0.3052149458300717,0.03949703889892864,0.8435384952355067,0.6033047598439514,0.9404311616638259,0.4740673403064779,0.8889021007869597,0.896557946234914,0.24352436301155334,0.737118933765365,0.7206477455516904,0.7486389703707317,0.743903761352305,0.3856337574182276,0.9612982721000909,0.865096609501171,0.4776443387994791,0.6051898233897322,0.8873525593654543,0.5796427907762276,0.43361784107280843,0.20789482548971305,0.833088800416302,0.4600172696264293,0.19079375649427877,0.25931162931250773,0.06590077308132991,0.2549270257823486,0.617105708067665,0.5115378469908747,0.43534200975094395,0.7201488030639471,0.011440207037600958,0.5124490306989797,0.4560277650863003,0.09399849235632463,0.4918562934683093,0.8888774835646223,0.8375550412320898,0.48930441432368066,0.7848606320750322,0.4212883852459961,0.5627399115426419,0.07405327249494742,0.8929942873084331,0.5241173814953486,0.54093504795627,0.704697980480933,0.28792865681618096,0.3876973694822894,0.7882671283974751,0.910341035866276,0.07296844096667376,0.36656767819945557,0.5894595092502992,0.36953578198003245,0.933948174033012,0.2807929331573522,0.29242132258779985,0.42613993452455534,0.7825121856892434,0.7304214952672883,0.9937518874537694,0.43652937846967776],"beta":[11.838470122210758,15.538457591982409,12.37250474844785,13.66729005136367,14.015903236882483,14.137157721680786,19.560467058973984,19.757422622031513,19.708302758931577,10.1374468899186,12.88664689882637,19.90367875673286,17.50972665882916,11.979749204778681,15.411595962105078,11.24173366817625,13.021090231342832,13.637746438799713,17.33621907103656,11.573311999186702,13.613309357650415,11.962054050291917,10.018872119134992,16.728919716363443,12.543678347490992,13.871592937562697,17.276010844751966,16.975765376885544,17.686895505684298,17.289004403150457,12.442293811434574,10.225288329374093,16.659271193641732,12.270162247948138,14.333338454038614,12.508094678959708,19.15706655546021,14.544986714706116,19.08029938776496,11.192939870213166,13.509697757994983,18.126683362132958,14.34977411044892,13.600226156000057,12.35510951101374,14.285966961817294,16.235782566583907,12.238808511091301,10.915449448237462,18.38536347347521,15.023269042909995,13.0550560332017,13.92032601933141,13.191770338124648,14.02555709422443,11.483932713862457,19.603360949882607,19.76211906035911,10.207300311759695,12.200468899797972,19.21217832520082,13.019700164108931,14.583810541343452,19.173334440687157,12.558173766088572,13.698458156808421,17.601694095795324,18.349274358728433,14.152249171755054,13.275824051312114,11.110716573666474,10.626542749938263,12.524928140788074,18.903684137990467,19.316407187584083,11.640810406038089,11.48683820488824,10.453720570339476,11.319143696627844,16.63789160641173,18.156918530724152,15.673965626828341,11.178875505791437,11.264093184904898,11.320218830708967,15.838951543426905,18.45558231559266,11.861933378480794,18.69181435499174,11.231906121517113,10.513498786999765,19.929499328650984,17.71788954400028,11.490542870705234,14.42265277518748,10.188545455449113,18.028845580780903,19.026268315354674,19.198325928604408,18.176057381022844,16.337594169780225,15.768130031496204,18.434999752404856,18.82405443633897,12.441986154430953,12.849245291736803,13.94765020928123,10.586300273992574,14.302718898880673,18.008091862096308,13.19448983311574,17.312758929915795,16.22746388215442,19.510941556723463,13.960987305278303,19.570071467714364,13.664214701670579,19.20299201660231,10.364545498607827,13.633983301162685,11.936570198853452,19.730802895699597,19.077849792763892,10.14331064930466,13.742427000222133,11.03713759472291,18.207829880562223,12.979006982110175,16.692544317403712,13.115836352770904,18.27409880796754,10.511040187228309,11.620947031097854,17.882541603291696,12.886830444476969,10.000441563566383,18.23509481236577,16.034897810060244,18.878367011811967,13.564730418970774,13.699925711104283,14.559265215134298,18.017077288707377,17.496849614889232,15.174181207065697,19.67565867943319,17.675192763651488,18.77752785990139,10.536908485415484,10.684127717897407,13.323244214176972,15.427217296898055,15.523529844087506,17.997081044346686,10.105210386124826,11.641176517588757,14.024794706640167,14.627138789354268,16.870834688707962,19.29422846507525,19.064501572790324,17.73691159268918,18.44428977084805,13.835769999140432,12.709973932383836,15.450121194496287,10.219248919254213,18.4906762728303,13.879075923950401,19.797311886743273,17.532884641758088,14.318341161347316,11.40117685028233,11.216527810269326,11.914059782690035,13.532856503997694,17.179732970565333,14.82849667397836,12.586591455775011,18.31628011075951,13.052320607581297,10.990909376761826,15.33867080858501,11.089500092084222,13.975935687094935,19.35513040528908,11.25580670240312,12.101089757669417,19.914234373035363,10.084914364548304,13.138285552701435,15.93670238151326,13.216794945729585,15.947561217677036,15.915063971305166,11.366882072755736,15.56657532489045,17.40857599015352,17.704879994486323,19.68148271100661,19.43091641309927,11.899412032218816,14.124118712488636,11.110362176065356,15.39186353876519,10.694545378405962,17.990912635533753,17.20832208926459,10.776825629277123,19.967085086549737,14.698938760302532,15.662598371318577,18.48957247730431,16.363207125749625,13.251308760034588,18.134542620912875,11.93196443722542,18.693180937157845,17.238381906561195,19.806966209046628,16.133757057016116,12.917121853669558,12.53562354287281,13.831320988006793,11.023183219941115,15.876647494147278,13.68952461842862,10.477592456377248,19.594563226052898,12.45829233753858,11.578665617147195,19.032116902738217,10.441123422504754,17.131357043784718,18.32622830968794,15.344925880774342,13.51910305189098,16.017937257952898,16.605154378795763,16.000233175924365,10.047786858819075,17.653030972766786,10.649723301521423,14.39059956340808,18.092962593322234,12.158909247247626,15.233372164585317,10.97087452804563,13.465750113781713,16.013629386708846,17.827656251095938,18.36050279746121,14.642105204261567,19.882192979423476,18.456169268668376,14.819615986996142,17.294535308791982,12.433203119410516,15.092309414823724,15.632500162376914,19.9199479042032,14.203621590674821,19.812993037758154,14.22137096371399,14.630958043790933,16.069735132716175,18.795597591678963,11.109782462787795,18.12020370146758,10.434483995076569,19.48260585149317,16.820278612578903,11.130014206045132,11.39127291335065,12.712368942001216,19.049769346230867,17.100429442496846,18.614455352461476,11.21578168653726,11.451226348619572,19.038049071077815,14.084299860036008,14.77810918833194,19.90651880671871,13.08752681484916,10.981556361979445,10.350893947638744,12.073427723688102,11.559687976126947,19.186719799266175,18.570155453807626,19.21095798546756,15.00979867126418,13.203929962109262,11.974854161332697,12.946040321361895,11.082428864385953,10.525566422424541,14.234989515020198,15.542500913659188,12.926377204315445,16.847392831730744,14.487377578859038,18.52910166847551,10.487577598340035,10.541123357464189,17.147229264216826,18.2715519183406,13.039219034778096,15.625825705346944,12.714845573058328,17.562226361240178,10.490944694101977,13.870539844260207,13.695585674159394,14.174368693301387,13.15388702002216,11.497190732287983,17.953805967820852,18.252208950582457,14.951814206374763,11.623319025287554,12.591428417675994,16.153312291471476,19.82310492160869,14.070989496757317,14.828469413945387,11.552867230543132,14.12931849629932,14.22529946063108,11.340923828482568,14.850942929109648,14.693091555435032,18.142583791704805,16.455254252710127,16.06126239511178,14.663988690138934,18.921317929612304,15.157115835287671,11.98922631299702,15.49945451154903,16.976581166296462,18.144916691650238,19.958296764625615,19.039016415397747,13.238146536677231,10.498611053704884,16.536866394792188,16.917256750064425,17.26307666159622,17.551586037837488,17.410126592728055,14.571654103083223,17.4005796221837,18.17975369794535,14.82240741484264,17.02740024672558,11.80521242173098,11.267755744793124,11.261215493523089,15.093657609800005,10.819086336948766,11.383155033292171,11.689592352973575,18.009321136785324,12.153904062543237,19.820981179516938,19.4360451308439,13.7212635148153,13.108599151380627,19.94154099878946,14.331638152725787,11.73203401935256,16.866787214733616,15.973289058136569,10.063782499286084,15.641832680279798,10.336984960123104,17.51660702119513,13.922670317911948,14.27872998151763,17.06325059149654,18.08868001928952,16.684667440290404,12.38758610805846,14.418864146625275,13.132877498525119,14.150563355988835,12.383047309850275,14.299847409583908,17.67651707505003,19.60065388841784,14.820345822747534,13.17641327272409,18.44965339229155,12.727243925150933,14.338861452624556,18.129306063979335,10.087345218339788,12.195227041199018,17.68972609107424,17.330010106088455,14.667058641939024,12.860401906357179,11.895331533315748,10.920898525154838,15.659985639275483,18.49872016998038,13.837155805287264,14.275722787289766,11.40639324543941,14.06975876195622,13.502707630608137,18.70344527615169,10.778789695019938,13.521828064982994,16.167675229811692,12.037778123895809,13.693914334031057,17.868281510067526,14.918501182983839,15.605382673625163,13.34890669252401,12.228763777088972,10.618768821776799,19.94543746344724,13.378816356480172,10.415590165851041,18.068476710365942,11.213787794353216,13.87510890590612,18.988509200468847,13.204607685508144,13.364011326605743,16.731631104282787,14.636394814893574,16.38062780947827,16.77633753189176,16.166149882155665,18.423854359908855,19.791303524923922,11.922442347191113,11.973251169199015,13.332372470961555,14.361445836987823,16.64275358406955,11.23590228033747,18.053309175469487,15.115208563213582,12.444853486176392,17.006915621344355,13.182152811026015,17.101286276660396,19.640315284606018,12.942996517990416,16.26087030937809,15.447622091800671,14.995979322175002,14.235848859283433,10.431504966805461,12.447651550598614,19.018038545741355,18.266951105016734,19.290025716006753,11.628713324716278,11.44885781743097,12.524979341601863,17.566004864291777,13.864284047902585,16.31904123723865,14.553949167974906,16.155372323553042,19.738401022088553,16.55007886565787,16.382316831360036,13.57420063293366,12.167905396952744,18.13034170910518,13.813933055168999,12.991824681159468,12.13215988752389,10.394547591138794,13.496312948319868,12.990898901608745,19.515848138206472,18.476090123780367,19.94853234889929,18.13666608242738,13.089458023724793,11.408907666641454,11.827927229058163,12.257005666717205,19.932974576706464,17.749809815897642,13.623341897277758,13.883408272151991,10.30041158164962,13.639943320108525,16.46033476983485,12.148235076041637,19.986621440630827,10.88719955541716,11.385184563868,15.689292350544424,19.16336741789071,12.650667649079317,11.084821705632786,14.515004163499638,15.828711322593005,11.111188087480382,15.719053720298833,12.0277466540584,15.001989347666523,19.65223769789775,12.757912472201392,19.13114024347908,13.745313746978328,17.058838796554802,19.049059692391413,19.38809829206098,16.64496552803719,19.342998501163677,17.287219109465696,15.285877494739225,19.714174429033115,13.883690343330388,19.577237589865447,11.366012726927469,17.856189940877893,17.84827686831267,12.142834351300067,10.425940308616138,12.64358152378607,16.84006205811966,12.899415551291419,18.524804639056335,19.598004786540358,14.602724979321808,14.912300854483417,15.64430508293696,10.232924462849883,13.334543021132108,13.403158271161292,11.720154216752643,19.66328574319087,14.532656144096908,12.982910234269045,16.446018472652206,18.813587726623396,10.36626706140829,11.083147607546556,17.990750184371514,17.207242416209397,13.445635474601655,11.956469125789797,13.446960523703703,11.830365774815332,15.13574120954029,17.478004439678713,10.270341583333382,17.35508287783609,13.354725364285866,18.545224773433354,10.221816111295471,14.230424253341074,15.45891687977759,18.70699505146056,19.61695306540812,15.767492162147256,14.659651946771724,13.045361945356111,19.532051778344172,16.392069438052218,17.943045737567612,16.695363640875556,15.947816335799448,15.569185696223165,12.555496526192185,18.768689462242765,10.753955087612807,19.284128000759754,10.104559518211847,15.790625229016143,17.77165471618035,15.416084623027231,19.424714765026806,15.794829024689891,15.980933566176782,10.077876502323,17.037967220046028,11.987744739017527,12.267472779457078,13.12350391635319,17.98949674646559,12.498913038262728,16.455193415601272,19.919745906611908,12.884943113809602,15.435435288180061,19.940775690985397,18.56736673998548,15.365056040240248,16.773227187728974,18.6054729983149,11.349301290777674,14.612067565452886,10.564171177065472,15.08351771679779,10.408411283051498,15.78355123419426,17.42400938001932,17.856852579383535,11.463890557600687,18.374216347200868,13.188063533268629,12.041363374588547,18.37885721191453,14.185359503158077,18.843959854005547,16.31011336794051,10.011060314176078,11.316447707102474,14.978827516950346,16.205340420078077,13.170518065569826,11.257035678771752,18.95322040827973,15.39305368189012,13.270134097633509,16.719055275443047,14.557644272494484,14.910530668952779,18.679021694208775,18.686418941241232,14.262879338182746,14.024209130594246,11.658742809980504,16.39707481982047,15.294538338051034,10.089380148603805,16.848619992030343,17.063810018035813,15.189427539771943,11.970824461922586,15.705271269271817,10.770212709077025,19.177341685245317,11.350181454031926,16.93317640669854,10.815669706970652,19.854050184135804,17.246222196725924,10.091775157482994,15.390906663676615,15.27776521432368,18.424446068022256,12.359988179397002,13.656282853833607,15.226618301596302,18.792520400095768,15.174459301763989,13.480191978055542,13.777301918633933,17.551918989236,19.01247981857995,13.83362993222832,17.128350784113934,11.919980664275624,13.231930021729942,15.476105389074746,13.519215147986973,11.51958163907868,17.84030703052632,10.34864999714382,10.021130928950601,12.527822651695875,12.76148258696222,19.444372207311996,16.063331515449768,11.058256429903377,10.959204808573705,13.531715868909703,11.313998583732445,16.332241219455174,19.466529655017055,15.680369772002397,18.094463487170742,18.49923479767717,12.69020898450407,16.297917701523602,15.788594631251005,16.764040164733917,15.968079082414999,18.369429282216572,10.729183075298678,16.640865708969855,17.509236280563663,15.015805750118684,16.863023888686055,13.632711415835574,12.152244841646135,15.238413901558035,18.081946644437235,18.989371116289885,16.78562021142663,15.405591727358916,19.902036379935282,11.764484225592113,13.591135451649093,15.471451085355742,10.235145267179213,14.132835489479124,12.56970890815737,13.642852570353948,10.832986939132992,11.86627120747909,18.651387185622077,11.132984868063707,15.183355116225618,11.112426391567533,19.807231977585065,15.310340792569122,17.721801652031424,12.475986043199745,18.975569115300857,11.031961539912698,13.069030391979457,15.641995353452266,13.945326390732728,14.177596045357939,11.241075646815288,12.382839142302073,16.26167362402801,11.715434129738082,19.485179725215183,19.962916443034718,17.77346853796622,17.70024796449801,15.697334653641006,16.616978856485034,11.217515179308176,13.43680943857932,15.111880187589353,18.231003024676525,13.529988187098345,10.029197723916742,19.352861569068455,12.938001994632895,15.163239293293387,17.948143217548598,12.152321756336484,19.595258523556176,19.85946806444226,11.98596239317483,14.51100933785012,19.4880356664518,18.72392548883144,13.842442179400038,10.67355108453691,18.10168603951886,19.65012535842511,14.767505240789458,15.31591760719829,19.45055207037894,16.557887142210163,15.083975279756016,14.921185691112278,13.939577310777533,19.93082868989932,12.502377617079263,15.821480038722841,12.99989648975223,16.985336063906246,17.903121935250116,11.012466089473044,11.748857668026314,10.387528141584436,12.103960273954433,19.4597848319884,10.680398415509977,15.897823165185766,17.805147609882596,10.861248846824605,12.214594048974908,17.71955537089397,15.583624720211004,10.18054204210454,11.67311091914592,17.994389261480215,16.089891307666157,10.165095669736088,15.462364750525548,16.322664005960824,16.795738428384496,12.946162829793384,10.473198888977613,19.401776895029773,10.378430892461415,16.141038990997508,12.009891727866238,17.463483087618116,18.055091275536775,11.927965093088629,17.859956445591784,16.531550672256245,13.387831263514165,11.351790852019505,19.085797092771035,17.541869537679826,15.251400978702955,17.175122222904093,16.1924228698145,17.660834670230244,17.0809904060993,10.94003581417963,14.559353293023864,15.649760368167245,14.626042520909245,15.445221737746557,12.235788633639935,13.914171821946704,10.959083799338096,19.607983448196148,15.338738441165427,10.301576750692249,10.081755741008553,14.46570094460233,19.281154468634014,17.640728603948517,16.75065800260056,13.593181697744114,19.95885625241882,15.721508578727509,11.465501292580802,17.100404466304436,13.708520957809597,15.943369301280905,11.783512681553514,16.819505894128305,11.693539143148737,10.046097429797703,16.74650952265289,18.340358658893308,16.182310206706333,19.537369176982686,18.620054472106517,15.607503087387911,19.516748086712944,16.747398915233518,10.184357586572654,14.074367604746588,17.714132504630356,13.235204252980727,15.85615046390011,19.575448335068543,19.474597383272297,16.60099215885915,15.126164364598518,17.779786492089116,15.930551198609752,15.009576867281634,19.012516779957508,10.619213206636077,15.326519972205656,10.760129346593022,16.0437571369485,17.664812444507557,11.545857628322963,18.054730868510905,17.45385365268403,15.485242450811498,15.153357594425058,10.187083631467942,11.414600429467532,14.142032064695469,13.241732521683025,15.600384198497865,16.520518346673,18.67504675824361,18.003036056070762,19.88146225434038,11.800554913127124,12.797870331223248,14.054561677435073,18.414517029828858,19.025797068799847,17.375724472053243,10.049227168704826,13.816317239872628,16.52895590716584,17.272474950545508,19.17903363151441,14.71336242497054,11.549490284740076,13.02072812576773,15.201019355001579,10.797628572719205,10.711863891414064,16.494657249223565,14.075723782041852,18.422959026142706,16.278293118902972,19.775416766001076,10.946948221596069,10.825970382949585,16.450569349440627,19.107151824429682,12.539864098875697,13.628750267715258,19.209395417602504,12.784546231078057,12.21873504478445,15.090003217308022,13.62189715945593,14.703793647434015,18.07112782283239,17.249483300295044,13.143644445201947,13.87224630333791,14.672663425667547,11.114078030591976,15.114044147875585,17.397871538435794,15.995086797455853,17.92772821395528,14.624281237646148,14.48589136330786,11.791005749994897,17.157103716726617,18.515557335604818,12.528137410751212,17.408716868288817,19.50758788302157,10.062116278510636,18.289745465823188,18.988002479013737,10.47317182919171,10.948655643693147,15.586533572233911,10.55052210537102,13.121509399809902,11.110744408197665,13.212942791636674,17.952080141542115,10.060150475764022,19.751367938197568,11.36800576480854,13.275425222795292,17.848526670041274,19.93529707088059,13.655660555881061,10.95012691657325,16.71375506582556,14.495573312233423,19.912710280646074,10.527640864056577,17.403459492461337,18.456327190693983,16.83226646260305,12.885259362414274,19.359188649397414,16.687061566886932,15.821787530933317,17.192787241848897,18.995456870609573,10.291668538839552,13.020187902472738,12.091934891182948,18.607091656341233,11.694518230063782,18.27357071712057,13.049174080928793,11.183965860312814,19.403156209751685,16.122351881812875,16.300143696060566,14.173642999427736,18.471162961813405,11.929049547594337,17.74133892617258,18.08661027703387,16.207512988988206,14.615853618565435,15.306966207166262,14.38192706073636,10.654374911964856,16.617834100678866,13.455287096420722,16.67397648054944,13.74520858812758,10.869867754888904,12.40786772618597,16.239486295443058,14.329002022749389,10.287578131258785,13.036167097079705,14.63765538159311,10.588327615358592,16.25918828793254,14.756576317188985]}
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
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

	pdf = factory( 1.0, 1.0 );
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

tape( 'if provided a valid `alpha` and `beta`, the function returns a function which returns `0` when provided a nonpositive number for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.5, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -100.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NINF );
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

tape( 'if provided `alpha <= 0` , the created function always returns `NaN`', function test( t ) {
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

tape( 'the created function evaluates the pdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
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
			tol = 290.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var pdf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var pdf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 250.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/betaprime/pdf/test/test.factory.js")
},{"./../lib/factory.js":22,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_alpha.json":27,"./fixtures/julia/large_beta.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":121,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132,"tape":191}],30:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/betaprime/pdf/test/test.js")
},{"./../lib":23,"tape":191}],31:[function(require,module,exports){
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
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

tape( 'if provided a nonpositive number for `x` and a valid `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y;

	y = pdf( NINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -100.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -0.5, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `alpha <= 0`, the function returns `NaN`', function test( t ) {
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

tape( 'the function evaluates the pdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
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
			tol = 290.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 250.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/betaprime/pdf/test/test.pdf.js")
},{"./../lib":23,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_alpha.json":27,"./fixtures/julia/large_beta.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":121,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132,"tape":191}],32:[function(require,module,exports){
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

/*
* The code is adapted from the Fortran routine from the FNLIB library of the [SLATEC Common Mathematical Library]{@link http://www.netlib.no/netlib/slatec/fnlib/albeta.f}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain software.
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var correction = require( './gamma_correction.js' );


// MAIN //

/**
* Evaluate the natural logarithm of the beta function.
*
* @param {NonNegativeNumber} a - first input value
* @param {NonNegativeNumber} b - second input value
* @returns {number} evaluated logartihm of beta function
*
* @example
* var v = betaln( 0.0, 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = betaln( 1.0, 1.0 );
* // returns 0.0
*
* @example
* var v = betaln( -1.0, 2.0 );
* // returns NaN
*
* @example
* var v = betaln( 5.0, 0.2 );
* // returns ~1.218
*
* @example
* var v = betaln( 4.0, 1.0 );
* // returns ~-1.386
*
* @example
* var v = betaln( NaN, 2.0 );
* // returns NaN
*/
function betaln( a, b ) {
	var corr;
	var p;
	var q;

	p = min( a, b );
	q = max( a, b );

	if ( p < 0.0 ) {
		return NaN;
	}
	else if ( p === 0.0 ) {
		return PINF;
	}
	else if ( q === PINF ) {
		return NINF;
	}

	// Case: p and q are big
	if ( p >= 10.0 ) {
		corr = correction( p ) + correction( q ) - correction( p + q );
		return ( -0.5 * ln( q ) ) + LN_SQRT_TWO_PI + corr +
			( (p-0.5) * ln( p/(p+q) ) ) + ( q * log1p( -p/(p+q) ) );
	}
	// Case: p is small, but q is big
	else if ( q >= 10.0 ) {
		corr = correction( q ) - correction( p + q );
		return gammaln( p ) + corr + p - (p * ln( p + q )) +
			( (q-0.5) * log1p( -p/(p+q) ) );
	}
	// Case: p and q are small
	return ln( gamma( p ) * ( gamma( q ) / gamma( p + q ) ) );
} // end FUNCTION betaln()


// EXPORTS //

module.exports = betaln;

},{"./gamma_correction.js":36,"@stdlib/math/base/special/gamma":54,"@stdlib/math/base/special/gammaln":58,"@stdlib/math/base/special/ln":61,"@stdlib/math/base/special/log1p":63,"@stdlib/math/base/special/max":65,"@stdlib/math/base/special/min":67,"@stdlib/math/constants/float64-ln-sqrt-two-pi":125,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],35:[function(require,module,exports){
'use strict';

/*
* The code is adapted from the Fortran routine `dcseval` from the FNLIB library of the [SLATEC Common Mathematical Library]{@link http://www.netlib.org/slatec/fnlib/}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain software.
*/

// MAIN //

/**
* Evaluate the n-term Chebyshev series `cs` at `x`.
*
* #### References
*
* * R. Broucke, Ten subroutines for the manipulation of Chebyshev series, Algorithm 446, Communications of the A.C.M. 16, (1973) pp. 254-256.
* * L. Fox and I. B. Parker, Chebyshev Polynomials in Numerical Analysis, Oxford University Press, 1968, page 56.
*
* @private
* @param {number} x - value at which the series is to be evaluated
* @param {NumericArray} cs - array of n terms of a Chebyshev series.
* @returns {number} series value
*/
function dcseval( x, cs ) {
	var twox;
	var b2;
	var b1;
	var b0;
	var i;
	var n;

	n = cs.length;
	if ( x < -1.1 || x > 1.1 ) {
		return NaN;
	}

	b1 = 0.0;
	b0 = 0.0;
	twox = 2.0 * x;
	for ( i = 1; i <= n; i++ ) {
		b2 = b1;
		b1 = b0;
		b0 = (twox * b1) - b2 + cs[ n - i ];
	}
	return ( b0 - b2 ) * 0.5;
} // end FUNCTION dcseval()


// EXPORTS //

module.exports = dcseval;

},{}],36:[function(require,module,exports){
'use strict';

/*
* The code is adapted from the Fortran routine from [netlib]{@link http://www.netlib.no/netlib/fn/d9lgmc.f}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain software.
*/

// MODULES //

var pow = require( '@stdlib/math/base/special/pow' );
var dceval = require( './dceval.js' );


// VARIABLES //

var ALGMCS = [
	+0.1666389480451863247205729650822e+0,
	-0.1384948176067563840732986059135e-4,
	+0.9810825646924729426157171547487e-8,
	-0.1809129475572494194263306266719e-10,
	+0.6221098041892605227126015543416e-13,
	-0.3399615005417721944303330599666e-15,
	+0.2683181998482698748957538846666e-17,
	-0.2868042435334643284144622399999e-19,
	+0.3962837061046434803679306666666e-21,
	-0.6831888753985766870111999999999e-23,
	+0.1429227355942498147573333333333e-24,
	-0.3547598158101070547199999999999e-26,
	+0.1025680058010470912000000000000e-27,
	-0.3401102254316748799999999999999e-29,
	+0.1276642195630062933333333333333e-30
];
var XBIG = 94906265.62425156;
var XMAX = 3.745194030963158e306;


// MAIN //

/**
* Compute the log gamma correction factor for x >= 10 so that
*
* ``` tex
* \log(\gamma(x)) = \log(\sqrt{2*\Pi}) + (x-0.5) \cdot \log(x) - x \operatorname{R9LGMC}(x).
* ```
*
* @private
* @param {number} x - input value
* @returns {number} correction value
*/
function gammaCorrection( x ) {
	if ( x < 10.0 ) {
		return NaN;
	}
	// Checking for underflow...
	if ( x >= XMAX ) {
		return 0.0;
	}
	if ( x < XBIG ) {
		return dceval( (2.0 * pow( 10.0 / x, 2.0 )) - 1.0, ALGMCS ) / x;
	}
	return 1.0 / (x * 12.0);
} // end FUNCTION gammaCorrection()


// EXPORTS //

module.exports = gammaCorrection;

},{"./dceval.js":35,"@stdlib/math/base/special/pow":69}],37:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the beta function.
*
* @module @stdlib/math/base/special/betaln
*
* @example
* var betaln = require( '@stdlib/math/base/special/betaln' );
*
* var v = betaln( 0.0, 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = betaln( 1.0, 1.0 );
* // returns 0.0
*
* v = betaln( -1.0, 2.0 );
* // returns NaN
*
* v = betaln( 5.0, 0.2 );
* // returns ~1.218
*
* v = betaln( 4.0, 1.0 );
* // returns ~-1.386
*
* v = betaln( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var betaln = require( './betaln.js' );


// EXPORTS //

module.exports = betaln;

},{"./betaln.js":34}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"./ceil.js":38}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":100,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-to-words":116}],41:[function(require,module,exports){
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

},{"./copysign.js":40}],42:[function(require,module,exports){
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

},{"./cos_kernel.js":43,"./rem_pio2.js":45,"./sin_kernel.js":47,"@stdlib/math/base/utils/float64-get-high-word":104}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"./cos.js":42}],45:[function(require,module,exports){
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

},{"./rem_pio2_kernel.js":46,"@stdlib/math/base/special/round":77,"@stdlib/math/base/utils/float64-from-words":100,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-get-low-word":106}],46:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":52,"@stdlib/math/base/special/ldexp":59}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./expmulti.js":49,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":89,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":59,"@stdlib/math/base/tools/evalpoly":93}],50:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"./floor.js":51}],53:[function(require,module,exports){
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

},{"./small_approximation.js":55,"./stirling_approximation.js":56,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/floor":52,"@stdlib/math/base/special/sin":79,"@stdlib/math/base/tools/evalrational":96,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pi":131,"@stdlib/math/constants/float64-pinf":132}],54:[function(require,module,exports){
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

},{"./gamma.js":53}],55:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":122}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/pow":69,"@stdlib/math/base/tools/evalpoly":93,"@stdlib/math/constants/float64-sqrt-two-pi":134}],57:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/ln":61,"@stdlib/math/base/special/sinpi":86,"@stdlib/math/base/special/trunc":89,"@stdlib/math/base/tools/evalpoly":93,"@stdlib/math/constants/float64-pi":131,"@stdlib/math/constants/float64-pinf":132}],58:[function(require,module,exports){
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

},{"./gammaln.js":57}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":41,"@stdlib/math/base/utils/float64-exponent":98,"@stdlib/math/base/utils/float64-from-words":100,"@stdlib/math/base/utils/float64-normalize":108,"@stdlib/math/base/utils/float64-to-words":116,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-max-base2-exponent":128,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":127,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":129,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],61:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":93,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-set-high-word":111,"@stdlib/math/base/utils/float64-to-words":116,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-ninf":130}],63:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":93,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-set-high-word":111,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],65:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],67:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":93,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-set-high-word":111,"@stdlib/math/base/utils/float64-set-low-word":113,"@stdlib/math/constants/float64-exponent-bias":123}],71:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":93,"@stdlib/math/base/utils/float64-set-low-word":113}],72:[function(require,module,exports){
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

},{"./log2ax.js":70,"./logx.js":71,"./pow2.js":73,"./x_is_zero.js":74,"./y_is_huge.js":75,"./y_is_infinite.js":76,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/sqrt":88,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-get-low-word":106,"@stdlib/math/base/utils/float64-set-low-word":113,"@stdlib/math/base/utils/float64-to-words":116,"@stdlib/math/base/utils/uint32-to-int32":119,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":59,"@stdlib/math/base/tools/evalpoly":93,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-set-high-word":111,"@stdlib/math/base/utils/float64-set-low-word":113,"@stdlib/math/base/utils/uint32-to-int32":119,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-ln-two":126}],74:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":41,"@stdlib/math/constants/float64-ninf":130,"@stdlib/math/constants/float64-pinf":132}],75:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":104}],76:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-pinf":132}],77:[function(require,module,exports){
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

},{"./round.js":78}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{"./sin.js":85}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":52,"@stdlib/math/base/special/ldexp":59}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{"./kernel_rem_pio2.js":81,"./rem_pio2_medium.js":84,"@stdlib/math/base/utils/float64-from-words":100,"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/base/utils/float64-get-low-word":106}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":77,"@stdlib/math/base/utils/float64-get-high-word":104}],85:[function(require,module,exports){
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

},{"./kernel_cos.js":80,"./kernel_sin.js":82,"./rem_pio2.js":83,"@stdlib/math/base/utils/float64-get-high-word":104}],86:[function(require,module,exports){
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

},{"./sinpi.js":87}],87:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/copysign":41,"@stdlib/math/base/special/cos":44,"@stdlib/math/base/special/sin":79,"@stdlib/math/constants/float64-pi":131}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"./trunc.js":90}],90:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":39,"@stdlib/math/base/special/floor":52}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./evalpoly.js":91}],93:[function(require,module,exports){
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

},{"./evalpoly.js":91,"./factory.js":92,"@stdlib/utils/define-read-only-property":136}],94:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":33}],95:[function(require,module,exports){
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

},{"./evalrational.js":94}],96:[function(require,module,exports){
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

},{"./evalrational.js":94,"./factory.js":95,"@stdlib/utils/define-read-only-property":136}],97:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":104,"@stdlib/math/constants/float64-exponent-bias":123,"@stdlib/math/constants/float64-high-word-exponent-mask":124}],98:[function(require,module,exports){
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

},{"./exponent.js":97}],99:[function(require,module,exports){
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

},{"./indices.js":101}],100:[function(require,module,exports){
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

},{"./from_words.js":99}],101:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],102:[function(require,module,exports){
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

},{"./high.js":103}],103:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],104:[function(require,module,exports){
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

},{"./get_high_word.js":102}],105:[function(require,module,exports){
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

},{"./low.js":107}],106:[function(require,module,exports){
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

},{"./get_low_word.js":105}],107:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],108:[function(require,module,exports){
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

},{"./normalize.js":109}],109:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-smallest-normal":133}],110:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":103}],111:[function(require,module,exports){
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

},{"./set_high_word.js":112}],112:[function(require,module,exports){
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

},{"./high.js":110}],113:[function(require,module,exports){
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

},{"./set_low_word.js":115}],114:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":107}],115:[function(require,module,exports){
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

},{"./low.js":114}],116:[function(require,module,exports){
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

},{"./to_words.js":118}],117:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":101}],118:[function(require,module,exports){
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

},{"./indices.js":117}],119:[function(require,module,exports){
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

},{"./uint32_to_int32.js":120}],120:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"./define_read_only_property.js":135}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){

},{}],139:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"dup":138}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{"base64-js":137,"ieee754":160}],142:[function(require,module,exports){
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
},{"../../is-buffer/index.js":162}],143:[function(require,module,exports){
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

},{"./lib/is_arguments.js":144,"./lib/keys.js":145}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],146:[function(require,module,exports){
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

},{"foreach":156,"object-keys":165}],147:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],148:[function(require,module,exports){
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

},{"./helpers/isFinite":149,"./helpers/isNaN":150,"./helpers/mod":151,"./helpers/sign":152,"es-to-primitive/es5":153,"has":159,"is-callable":163}],149:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],150:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],151:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],152:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],153:[function(require,module,exports){
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

},{"./helpers/isPrimitive":154,"is-callable":163}],154:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){

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


},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":157}],159:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":158}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{"./isArguments":166}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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
},{"_process":140}],168:[function(require,module,exports){
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
},{"_process":140}],169:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":170}],170:[function(require,module,exports){
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
},{"./_stream_readable":172,"./_stream_writable":174,"core-util-is":142,"inherits":161,"process-nextick-args":168}],171:[function(require,module,exports){
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
},{"./_stream_transform":173,"core-util-is":142,"inherits":161}],172:[function(require,module,exports){
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
},{"./_stream_duplex":170,"./internal/streams/BufferList":175,"./internal/streams/destroy":176,"./internal/streams/stream":177,"_process":140,"core-util-is":142,"events":155,"inherits":161,"isarray":178,"process-nextick-args":168,"safe-buffer":185,"string_decoder/":179,"util":138}],173:[function(require,module,exports){
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
},{"./_stream_duplex":170,"core-util-is":142,"inherits":161}],174:[function(require,module,exports){
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
},{"./_stream_duplex":170,"./internal/streams/destroy":176,"./internal/streams/stream":177,"_process":140,"core-util-is":142,"inherits":161,"process-nextick-args":168,"safe-buffer":185,"util-deprecate":197}],175:[function(require,module,exports){
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
},{"safe-buffer":185}],176:[function(require,module,exports){
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
},{"process-nextick-args":168}],177:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":155}],178:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],179:[function(require,module,exports){
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
},{"safe-buffer":185}],180:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":181}],181:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":170,"./lib/_stream_passthrough.js":171,"./lib/_stream_readable.js":172,"./lib/_stream_transform.js":173,"./lib/_stream_writable.js":174}],182:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":181}],183:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":174}],184:[function(require,module,exports){
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
},{"_process":140,"through":196}],185:[function(require,module,exports){
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

},{"buffer":141}],186:[function(require,module,exports){
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

},{"events":155,"inherits":161,"readable-stream/duplex.js":169,"readable-stream/passthrough.js":180,"readable-stream/readable.js":181,"readable-stream/transform.js":182,"readable-stream/writable.js":183}],187:[function(require,module,exports){
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

},{"es-abstract/es5":148,"function-bind":158}],188:[function(require,module,exports){
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

},{"./implementation":187,"./polyfill":189,"./shim":190,"define-properties":146,"function-bind":158}],189:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":187}],190:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":189,"define-properties":146}],191:[function(require,module,exports){
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
},{"./lib/default_stream":192,"./lib/results":194,"./lib/test":195,"_process":140,"defined":147,"through":196}],192:[function(require,module,exports){
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
},{"_process":140,"fs":139,"through":196}],193:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":140}],194:[function(require,module,exports){
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
},{"_process":140,"events":155,"function-bind":158,"has":159,"inherits":161,"object-inspect":164,"resumer":184,"through":196}],195:[function(require,module,exports){
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
},{"./next_tick":193,"deep-equal":143,"defined":147,"events":155,"has":159,"inherits":161,"path":167,"string.prototype.trim":188}],196:[function(require,module,exports){
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
},{"_process":140,"stream":186}],197:[function(require,module,exports){
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
