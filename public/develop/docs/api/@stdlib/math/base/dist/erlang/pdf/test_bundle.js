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

},{"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],8:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":139}],14:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":52}],16:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":141}],20:[function(require,module,exports){
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

},{"./nan.js":22,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-pinf":141}],21:[function(require,module,exports){
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

},{"./factory.js":20,"./pdf.js":23,"@stdlib/utils/define-read-only-property":145}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-pinf":141}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var factoryGamma = require( '@stdlib/math/base/dist/gamma/pdf' ).factory;
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for an Erlang distribution with shape parameter `k` and rate parameter `lambda`.
*
* @param {NonNegativeInteger} k - shape parameter
* @param {PositiveNumber} lambda - rate parameter
* @returns {Function} PDF
*
* @example
* var myPDF = factory( 6.0, 7.0 );
* var y = myPDF( 7.0 );
* // returns ~0.155
*/
function factory( k, lambda ) {
	if ( !isNonNegativeInteger( k ) ) {
		return nan;
	}
	return factoryGamma( k, lambda );
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":26,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/dist/gamma/pdf":36}],25:[function(require,module,exports){
'use strict';

/**
* Erlang distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/erlang/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/erlang/pdf' );
*
* var y = pdf( 2.0, , 1.0 );
* // returns ~0.037
*
* var myPDF = pdf.factory( 6.0, 7.0 );
* y = myPDF( 7.0 );
* // returns ~0.155
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":24,"./pdf.js":27,"@stdlib/utils/define-read-only-property":145}],26:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid Erlang distribution.
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

},{}],27:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var gammaPDF = require( '@stdlib/math/base/dist/gamma/pdf' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for an Erlang distribution with shape parameter `k` and rate parameter `lambda` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeInteger} k - shape parameter
* @param {PositiveNumber} lambda - rate parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 0.1, 1, 1.0 );
* // returns ~0.904
* @example
* var y = pdf( 0.5, 2, 2.5 );
* // returns 0.895
* @example
* var y = pdf( -1.0, 4, 2.0 );
* // returns 0.0
* @example
* var y = pdf( NaN, 1, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, 1, NaN );
* // returns NaN
* @example
* var y = pdf( 2.0, -2, 0.5 );
* // returns NaN
* @example
* var y = pdf( 2.0, 0.5, 0.5 );
* // returns NaN
* @example
* var y = pdf( 2.0, 0.0, 2.0 );
* // returns 0.0
* @example
* var y = pdf( 0.0, 0.0, 2.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var y = pdf( 2.0, 1, 0.0 );
* // returns NaN
* @example
* var y = pdf( 2.0, 1, -1.0 );
* // returns NaN
*/
function pdf( x, k, lambda ) {
	if ( !isNonNegativeInteger( k ) ) {
		return NaN;
	}
	return gammaPDF( x, k, lambda );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/dist/gamma/pdf":36}],28:[function(require,module,exports){
module.exports={"expected":[3.0377725361024004e-27,2.5189137572337852e-8,0.04628811972109534,1.48731287464855,0.0005926981281134729,0.00031047261788554373,6.5869820863091636e-15,8.159846650150269e-8,6.2005357830463175e-6,1.5089545512888467,0.0332253918505264,3.2330447715263193e-13,5.833518024641912e-7,0.00015913814370198057,0.08607856539029184,0.14908987063410908,0.05165578415375939,0.0072203495119179785,2.5415715147603206e-6,1.315514094887027,1.4269021276304317e-8,0.0005589080619352154,0.00010960420534408978,0.0002204327079903778,0.0059298289339037675,0.00040521355055151694,0.0005927354118951272,1.20281779546203,0.00014773999714675498,0.0001842633302079394,0.48651061410915253,0.00040233981721799167,0.3085750126414375,3.615726759709805e-8,0.0007057878636150153,6.697630976137097e-17,0.0027843980850445105,0.9647584177959561,3.316460914567211e-22,1.1134958973010947e-5,0.22439864099687215,0.9940348336178992,7.415193529369394e-5,0.0016028137472164023,1.0696893208782095e-10,1.0603759424980918e-15,0.020402545892801733,1.3041841831598731e-15,0.02735389638573566,0.0022760884691826696,0.2328272890764748,0.7431016513481671,4.0656182770862736e-7,1.3334663223691356,1.4992619146762847,0.004805775068069726,0.09721307440409249,1.2716466091643278e-27,5.117071683218152e-8,1.3060646624878404e-22,1.305794007963e-17,2.0004111997482155e-21,2.7241019260767442e-11,4.300073079316347e-6,1.158445169230584,2.4595109534862144e-6,7.058137800933503e-14,4.366601541264104e-5,0.9849422167452987,0.0002063129413930828,1.7089937360741936,0.22346159417731049,9.412798510067941e-8,5.615734881011617e-12,0.4895724315879094,2.980037899953409e-23,1.0662922001514225e-6,2.433335847361574,4.153953734567265e-23,1.0106761268484225e-18,2.311139260993165e-20,4.30474955312571e-28,0.18510181553437902,0.0011854796477606888,2.6423114724517336e-24,0.010348582500518122,0.000775375085893404,0.06874531489521844,3.98738153965871e-6,0.1393646054713499,1.0212791680176896e-11,6.088760575780503e-26,2.1702296062520462e-29,0.005371159114216134,1.1975356799844935e-5,1.8426752957829734e-8,6.49567883908292e-9,1.9960091006749703e-20,4.551049143851405e-9,0.002107849043120642,0.8420354144958143,5.4799006060144616e-5,1.2357372638270214e-7,5.9256097314424216e-5,0.0005743615511956425,1.0924989157541131e-26,1.2277658580676374,7.372647374999032e-13,0.00016966046940489164,3.660912989633258e-16,1.3946695968347457e-5,1.7543352856770173e-15,6.252919963566948e-9,0.0002370705520437763,0.4144484413125289,0.0001857740596466861,1.6162523845959006e-19,4.377571970644163e-11,5.739291025480409e-35,1.626908266642807,0.07042753098435635,8.810912198980342e-28,1.3093873635202038,0.0009284083573242055,6.5456860906937065e-9,1.3912362073447863e-20,0.0008067587688646875,4.126115426597678e-9,0.5816331141837316,0.00024788539424581,1.1092706629997085e-15,0.0013457248262058923,2.737097585569287e-8,1.3580687735660509e-24,2.210968468723012e-7,1.1973172247151795,3.517974088848576e-30,0.1606518659282969,0.002695457169386641,2.885668044958628e-6,1.9715101039434387e-15,3.8236516071608507e-19,0.46881565086114224,2.039982330447527e-7,9.560832976130798e-7,0.8266449452530793,2.366013925221941e-22,1.267229222719345,0.10823055279383659,0.5578911299830625,0.18975097785265224,0.05794219014237105,0.0005446472596584588,1.7943834709157312e-38,3.346848159746114e-20,0.0006481861851912755,3.1274546131194554e-5,3.255937369552244e-33,9.810390637050921e-12,8.424467198963435e-18,0.05603616757825526,0.5479243761327004,1.997369555085627e-7,0.00014877142714174807,5.396902283683815e-12,0.02290849970786229,0.006066662140126123,1.0179079125143714e-29,1.3256906263491124e-39,1.4705751092496067,5.223136466176679e-38,0.03467489890329191,1.1774708728282716e-18,0.8077481265843647,0.0010768116418123864,0.15855984223501907,0.3620554852588788,2.908877828000169e-10,1.0154308753209362,1.3945940395804517,2.63786471979507e-16,1.1349531526993882e-6,0.0015715818073917752,0.01627733890275558,0.013850521722328679,7.782845666863051e-7,0.71228193632979,3.177670971248423e-10,0.0011736099722635326,8.910502062011519e-15,0.005891134588923173,0.21983790201241937,1.3906287722835075e-11,0.00025910539549570664,0.52690361850085,0.0005117987697523779,6.268374763131061e-23,1.5032868438376692,5.348427373026278e-10,3.0499738507101547e-29,2.250424155122463e-9,9.412945908975527e-7,9.644857137067112e-23,3.125370102128181,1.1273827405859064e-17,3.3854139544224824e-23,0.11718747587319772,1.1594040018779184e-17,0.01052320686351632,0.2946905330405498,8.483420774710748e-15,1.8454912006486065e-7,0.008660457550165033,1.2103629191238175e-7,0.0002022307619894466,3.60912118209749e-33,0.29881951079640773,2.041748353485138e-26,0.0004346974878027101,3.048577030567551e-8,2.2411594035570304e-8,1.42402351084961e-31,0.17752473907647603,0.009790876247294134,1.4503137803720627e-10,6.285551804570692e-7,2.0241255780086336,1.3786022037721667e-8,0.0001144102455246752,0.004085049315024437,3.994834069408481e-9,6.806713828055759e-5,9.242405420523767e-7,8.155714697765298e-6,0.00013927867838682225,5.2848055006848895e-5,1.6946644641747828,7.861371163170926e-15,8.20902710721948e-8,8.870371200017758e-25,0.04098320949639119,0.0016218375407821295,3.482430956200187e-9,4.3285543737373745e-12,1.5808666849551063e-23,8.665828869588246e-5,0.021478182399814014,8.51311744928955e-20,9.295114145075334e-10,6.916969479303692e-19,7.233761773345384e-6,1.195845889217655e-22,6.333527434925248e-6,4.0356844545293605e-14,3.792693082356322e-24,0.02391893533673103,0.014125412552898883,0.0022386265787272108,7.234177282340348e-5,8.681006253876615e-7,3.664742937358723e-10,1.8110584987089126e-8,9.493212995639747e-10,0.000231193499699409,0.12552509431278544,2.425056476279322e-13,1.5508435514041692e-8,1.3552337742110585,0.04918293172340313,2.3816326323335977e-16,0.7995047614464703,3.992964163763138e-15,0.6011878275284215,3.3320330855504794e-19,0.0011098052932043577,8.39392069970922e-10,4.285468982942992e-19,3.215919329546772e-5,7.823929343633995e-18,2.866133987528293e-32,2.993230808162566e-12,0.24444359059553683,0.0992780919209657,0.17634565937463476,0.00448635521257172,1.3037450480943384,0.5146981844700584,2.9353114528565304e-16,1.0302676711452588e-7,1.537104195330265e-14,0.005610498664147052,0.009591721881337832,0.006783822809705988,2.9155769872484147e-25,0.000191729932756946,1.2302194331192513e-18,1.228413753016573e-15,2.1059468581571337,0.31203800961029704,0.14008408876756823,1.5323439009594199e-7,5.0746539483357305e-15,0.5831064427443876,2.469295213624508e-11,0.004965691041883472,9.235604695423824e-5,0.0648067873141544,0.2979153080337833,2.1400548582047526e-11,2.5214743689431665e-12,7.617730288497923e-8,0.09518336724066322,6.118039450002419e-20,0.7926727636271675,0.0028450208178040456,7.04008385362081e-11,8.595667915749826e-6,9.34907768650524e-8,0.7949144256270941,0.0047771648203024444,0.8954141386898901,1.2919811536353087e-28,7.664489290310768e-14,0.0086333788118118,1.6087775532622316e-22,1.5494606403283095e-18,0.003290757281584073,0.6556716038458378,7.277426157063021e-10,6.7340366278901056e-12,4.978849750408478e-7,1.4373633340047371,3.940273533984211e-12,1.3504147279673289e-8,8.343922513036692e-11,0.0003253894621484436,8.478116356064916e-21,8.46339193764509e-31,9.07099621817942e-25,2.3752474256611484,1.268015685638784e-13,0.00013631351085564435,0.05175231413617385,0.022827142018974202,0.15665612844406174,2.6973069656455426e-9,5.106871548879516e-6,3.897901901261644e-5,3.0649047872922583e-46,0.014230827214948344,2.236525288877491e-15,0.8344728156993405,4.377650487823292e-21,2.2716930756204317,9.425030622819337e-17,1.392298092528711e-8,0.49499017764807146,5.221816240663636e-12,0.19436076449152295,0.0002292712662619059,0.08208321843561082,0.0785408361004151,1.2235178502956865,0.6461699140614672,6.498232020925091e-24,1.178353648327588e-10,0.001799937364114421,0.09108930968758853,0.32368058687811624,5.533568946344701e-25,3.983659787482285e-9,8.413314903007832e-6,1.3044035835903575e-11,4.696265703156018e-21,4.160235316334476e-5,1.0361268778564885,2.8884126249441174e-18,3.1102006087338915e-24,1.6289731429564507e-12,0.9354560049756424,1.1860216247654487,1.1247255399058713,0.003816277734601567,0.8877501640220542,1.838284027921234e-52,1.1127875552718337e-5,4.961521548152697e-10,0.0001534873888667078,5.086617740718195e-7,1.5117568400342872e-13,0.8163393632884343,8.73264146840456e-20,0.45184384130578903,7.473638913920112e-7,0.003702855516657351,3.24973697766082e-8,0.3112917001480825,4.3186455286357524e-7,0.6673509146811825,0.001697761311490828,0.4182342285795248,0.11100052262069977,1.0155673002500344e-13,7.504972892421622e-9,1.3367839793170356e-31,1.030843932731274,3.161107467971521e-36,3.6243532406230963e-6,0.22056840251572257,1.5254471394649125e-13,5.948769574868714e-10,0.3177452217932012,6.089711682676878e-5,0.9676765910656493,2.400470233443042,0.43486501363380775,7.697384688378497e-25,2.3772040686246754e-10,1.3549566398134213e-5,1.2512904765504502,2.792100550065921e-20,2.1939690561493763e-21,0.0004746718872413825,9.567055356984197e-13,0.0032422306530824423,0.7187134959765501,0.0020195622774828977,3.0132828087620376,2.0831693417147325e-9,8.033736472302178e-9,1.0916649141935082,0.00239392114869483,3.2063413131855164e-11,7.101041070892871e-21,2.1939547192537026,0.2486476017452034,6.527736334659782e-17,0.05256104582413767,0.03830050634351665,0.24579585218788383,1.100239059073882e-6,9.740913440750532e-5,1.1586252134844558e-18,2.4684803454460382e-5,8.620301361369438e-9,0.000184283286368943,0.010665788089985225,1.258856402633548e-10,3.533950078334607e-7,2.0680290936161576,1.031649335882735,1.5716409269708296e-5,0.6894996987955399,2.3879482858001385e-11,9.24475032066632e-17,1.4294758536131341e-5,5.79519704183817e-29,0.3888437991197653,8.249718629175971e-9,2.4897650026528007e-9,2.205671012624936e-22,1.4339914068356266e-7,0.028518945075458327,1.9473599714350203,2.2797188684602308e-9,0.009569841817222818,1.1363609868001632,1.5533073895783704,5.155735271943307e-20,1.2196544817237045e-15,2.444080601061025e-9,4.572799513665734e-15,0.6649218602128693,9.131265187438924e-16,8.574897238135193e-6,0.058952085277632835,1.9738764740548466e-10,4.8229843823325515e-17,1.3646842482197479,2.4735756594015386e-16,0.004578767868782596,3.723265689915738e-22,0.013915525287013354,4.1595274965872e-15,0.010535363736257946,2.8164707271155644e-20,1.5580527019184893e-12,1.0777597528948371e-33,7.046397508385258e-6,0.3274939348326661,0.0001797076776268452,7.758403616759134e-18,0.07277567685056574,1.4594375940385715e-9,2.115153837059442e-7,2.880989568703273e-19,0.36059891891126644,1.0019710778042792,1.8362799671595829,9.676731144481707e-17,0.22971008655295494,1.3172115909121958,1.801200059481783,4.533519602458313e-42,5.271431360585185e-10,0.003976405773807748,6.573068748928563e-7,4.6222859138194365e-31,7.043897520834371e-7,0.8494694421572132,0.023928250101104102,2.689333905594097e-5,1.0788912351451943e-7,2.2112670101745583e-13,0.0002716031010130251,0.0014399712893963096,3.674564860254423e-8,0.06266794282418141,0.3712599056448568,7.80724005833638e-12,1.420535576755036e-5,0.21896650943245435,1.9316396323539957e-8,1.7130530331040302e-22,0.000403573105055539,0.05867600100752816,0.02418089596518957,0.00018205915147717115,3.326647183148853e-7,0.0006349793953263262,4.938001175419825e-26,0.00020675670381504454,0.0001361100924364374,0.10698108488925465,0.019065477041704696,0.02090742553811683,6.046040056545506e-20,9.911116534690999e-11,9.152634817045485e-5,6.341191338405924e-19,1.5402766925978384e-9,7.614048004737941e-5,6.045200917802126e-16,2.0223532108191408e-20,1.0202472326959775,8.347983576947424e-17,1.4857328416957556,0.26403430847992726,0.00014901564837733756,1.4209955816862974e-12,1.7480670737127292e-17,1.5161894697271968e-28,0.0008349444988486779,0.06581679251727372,0.004743127884805172,0.08645120616338417,2.5355131198326394e-7,0.0006208470859068161,0.0038151863103592634,1.1859035292354991,5.157888342316188e-18,6.692851312310994e-22,7.93743162208543e-12,0.06246607752399859,0.7930593221411933,0.005400055536395463,8.756250528188814e-14,0.0005442552799226718,5.64128679379725e-8,9.664834161742937e-9,0.021010582587208684,2.256504486557325e-22,4.156717171941633e-12,7.81619301293039e-9,6.090405307227041e-18,6.365455075048912e-8,6.870361024519534e-8,0.1341001814080659,0.0014332888548119799,4.785373464761163e-22,0.04870779260264322,0.7459321262142724,0.003491532733277053,1.901371482870307e-18,8.147916442288821e-21,4.6698231708403173e-26,5.162958588750801e-31,0.00021310162821416975,7.11661097982333e-13,2.359334806591761,9.69848562783205e-20,2.3421274906150315e-11,1.1230237389192257,1.4024632405508592,7.274974153626037e-5,4.20074785792172e-23,0.6428697062892813,0.820024259895519,1.366907848211736e-6,1.8677149774955457,0.15724581129938578,1.2324737129400854e-14,0.011765760041998304,2.0167276971514814e-13,4.910485764248147e-32,1.0074681453674828e-5,2.3627024190970526e-14,7.671356100041693e-8,5.730925227525185e-18,1.0090698724266641e-11,0.4170737369122134,0.18212936357335474,0.0565740315100607,0.1873065303994917,2.3817510023344126e-14,1.3545814959961735e-20,0.49403993564641846,0.0009676213957473375,3.1303615623165047e-6,0.0005365962218753759,1.009707612673228e-6,8.206546604862875e-11,0.0002649848762301259,1.494394688318278e-20,0.25180497532814583,2.1502562104864713e-23,1.5958127009946277,6.638468173935292e-16,0.02796793862647238,3.3343451373640526e-10,0.5383507404017666,9.639628718308026e-7,1.417307688537431e-9,0.012670429193156342,1.1799766694338876,0.03587959466865848,0.010573445933802984,0.8288907970545277,1.6167497746471349,0.8187988909346251,1.8313686293429297,3.5860899253756183e-28,1.2201070378762398e-40,0.23738200074532723,1.4805385276566067e-7,1.145445701513585,1.2088575035862886e-26,4.3979616440584443e-16,0.0626626229146275,3.08951348736192e-9,0.01178509681702465,2.7598694914832787e-10,9.041570621079672e-10,2.119824396082014e-9,7.541440123223727e-5,2.5345042732230798e-11,0.1463208791903268,1.1479078902097613,4.9965484672036536e-9,0.011347861696725274,1.754628108317742e-5,3.023800350235856e-34,0.00019668522373809458,6.042212774175326e-8,8.766640164847087e-5,0.000506911127431075,2.2414438344044458e-12,3.3130036658258564e-16,5.940130556657122e-7,0.00010129478015875105,1.3736558767921812e-10,1.095583377253213,0.8600605429386641,8.090192566200977e-5,2.019424648553973e-11,0.07446113277146668,3.332538453990346e-25,1.9630088371289707e-9,0.041192616425641655,6.690231798876676e-11,2.907992086610596e-7,3.105446554613663e-14,7.189501458824151e-17,0.04772026203879222,2.0472235850362842e-18,0.01759192807072739,0.00014680256599118808,0.0009429209420460954,4.943537536527188e-16,2.1312681295855167e-9,1.4025419846016927e-9,7.407510026071084e-7,4.83657778021813e-7,1.3539215825224726e-14,1.6062209187601558e-9,2.894826914471248e-8,1.3537229826527128e-8,1.4958751202733718,1.7047099559195445e-29,4.405790917630001e-5,1.5226796360794386e-6,0.005039148562814861,1.5530444405836128,1.735063754069441e-7,6.146127868252601e-12,2.2871827261426644e-7,7.872531702316276e-23,7.008800577686301e-17,0.001270204216108635,8.499024425389986e-24,1.1425275534902792e-25,3.0136873863157514e-10,6.450110836539114e-16,8.45241248683207e-6,0.42624711705411644,1.3027581227509446e-11,3.0195195580139045e-6,2.8101157563102654e-14,4.9526464270372377e-20,0.0018250869258418963,0.0012787130533445182,1.7479579883316985,2.3249563682231393,1.15974059300776e-5,0.8223739571612275,8.17672617498885e-8,2.1996981203293893,1.1560811960836674,0.003433018941924124,2.1261041151076506e-24,3.945654807446189e-6,1.1044048507401032e-24,7.0370665980683185e-25,0.04349908269214319,5.093701431180326e-13,2.0266239906883748e-25,0.00029077747045901233,1.542909989674639e-10,8.19683261695457e-7,0.033323740313697184,1.6480539146905528e-7,0.0001555193405130511,7.420460410536542e-23,0.40817625185548756,1.1480110569589728e-25,8.153338494676649e-7,6.73674449137619e-7,6.930455021031025e-5,1.1953484162058793e-24,1.1494610184698444,1.1358789628960117e-5,1.580443267751276e-15,7.810015881411182e-17,2.0914694964938043,5.654799475107192e-6,2.971436147042041e-7,1.752635825126449e-15,1.7846404687806657e-5,2.2162715661482383e-22,1.177630864999814,0.047859519195824776,1.5064264843796263e-10,1.2442514949109758,3.5028759360011177e-10,6.346017816692079e-9,0.0013071448193008217,1.8009853805569251e-6,0.8816999142090512,1.3413785090925383,1.3313868856900904e-14,2.782729385972089e-10,4.595014976817645e-40,6.352677734109691e-19,2.805607262114885e-8,1.1115668852449194,7.20239721139001e-8,0.7633225754966549,1.1491690215113623e-15,1.0611726580556245e-15,2.076244885878753e-8,0.003541881857780236,3.858142321825855e-5,0.8030923564686011,8.315325846217263e-20,0.0060237146675633894,2.5228540197937868,2.4555756702441234e-5,2.8416154507401217e-7,0.007388912211346961,0.0024781850657745875,9.21969190839079e-9,6.261203326774978e-7,0.000781604468604893,0.7854381798201975,1.8651422914194504e-15,4.467807474980566e-10,1.568660936978484,0.002371475657067976,7.787564734882003e-9,1.8022899241390197e-20,5.100344568416141e-22,4.44146519169522e-18,3.6527480834216065e-12,9.750704830901778e-9,1.1439882078952266,5.1666412620772336e-26,0.2773433084235063,2.280152633553292,0.0025679164350316096,0.006458332340780845,0.08690410940072694,1.922659111192378e-10,0.6686572406717497,1.1215424763730862e-11,0.64238365506663,2.764044121979348e-15,1.10170180531712,0.0004106960904983652,5.865291849009044e-7,3.157379989068473e-36,0.016617615231861452,5.3967757420877795e-12,0.04623780340259668,0.1231034051091843,8.469922393498676e-9,0.7074551397187575,0.026094208540937743,2.6698545951689955e-22,1.5762902943789102e-6,0.6288092555948975,5.641668357650891e-23,9.134002208906592e-33,0.001556966817972135,0.005343392036950206,0.00543426898683158,1.495106966448273e-13,0.30814627979715437,6.791102933271153e-36,1.2457167571440455e-11,0.02849998702430278,7.592584211966889e-8,3.8434881664655425e-5,1.7270867885311273e-22,2.6717591670539953,2.272563289812519e-27,0.00519035558143594,0.0003350386654116378,0.002534835386676639,0.06046497605202662,6.275236201715148e-26,0.04901985477515726,1.2203057875757057e-12,2.7611543221597878e-11,1.1285962565416577e-13,9.283194164772762e-15,6.79936660549644e-15,5.034568698438172e-8,0.020315185503728402,6.035912746888062e-19,0.985640482175217,7.534373831021448e-27,0.7630904471925694,6.167163687219913e-7,0.15502366846796126,7.760748424711442e-11,1.3449670614637066,8.054314482999614e-14,1.0430712885438014,1.0460999684573931e-5,0.9916153104099743,0.5904723870731624,1.1672191858950816,0.016083265243781716,1.7505157857366904e-10,3.6409680002570297e-7,6.605091414108801e-8,8.902934398118813e-37,0.26412115551361653,1.0167967123388878e-25,0.11852315816665322,1.945647788250594e-33,0.002114508029393946,2.519729679716895e-13,2.305355021532211e-10,1.6014259258865887e-6,2.305742563749209e-5,1.3662124524830398e-5,0.7642135978254124,1.496887828437636,0.07474395470297962,1.8124282166311534e-10,0.025389327348947725,3.4930459194971993e-7,4.1015812328046245e-10,0.009945044265605824,0.9068140180850448,0.35086374531556236,1.2461866415676166e-14,3.031922793492195e-21,1.5492060074723994e-10,4.3895201648750815e-6,0.049162045025435815,1.5630128435540844,0.4520810069435783,7.889434509501048e-5,0.608527751701882,1.2774713346867383e-20,6.635632588254511e-6,3.537086014562574e-9,2.4723579615348915e-9,0.0038795114508639907,4.808312100130466e-17,3.359585916471412e-14,2.6689450235275714e-10,2.2605391816237612e-5,4.572083486744742e-12,3.3460196589313745e-7,0.007688149917079271,2.269817305425952e-6,3.318353681737194e-12,7.188785164635261e-8,3.0155246193189775e-5,0.8038203337222424,0.06560641839441797,0.011439031433651308,8.663449561569606e-9,0.3899081878828069,1.0083441221676746e-33,2.79260377838303e-6,0.5376329487307787,0.013174111442078003,3.7137948980185205e-5,4.092663883896885e-6,5.47801636197895e-7,2.1121943893153675e-7,0.004054600610702652,9.45616525996844e-10,0.37365418174984627,0.0370533563461182,1.9970798064465273e-9,1.0213320848665454e-8,9.56792628315064e-9,9.211187947305465e-17,1.0547076292183764e-20,4.31913104578585e-22,0.0018867561325164649,1.2679103616224993e-13,0.06957698438510719,1.4929422374810157e-8,0.006346544074291135,2.3083438303537096e-10,0.0983209092925081,1.281665177336786e-9,0.05816294848363766,0.01515096137602889,6.2216005795541695e-25,0.6839162479231634,4.526826731268238e-28,3.4251671188397044e-22,1.1361346725066468e-9,2.1930290238570867e-15,0.1744417016781808,2.3600287214796035e-10,0.0011496249419350477,3.4546696017188774e-17,1.951096989814731e-31,9.61108428428818e-13,1.4952858630467858e-47,0.006467013546381711,0.16402783769893897,4.2561355998749497e-5,1.7790451879704012e-5,0.04292127438533908,0.00963630804376777,0.5177442389538358,0.13266787501530375,3.527193250534011e-9,6.263959429259902e-9,1.6684023597899585e-7,1.2869552309815566e-11,2.967533764091824e-5,0.036675248661586904,0.01729319446042431,3.0571311657602623e-14,1.287974467774624,6.725463823017198e-14,5.272881048602202e-13,4.447224417588759e-5,1.769912527172112e-30,9.35431328646715e-15,0.7963238531591196,3.0654507427589084e-6,3.481276348095632e-5,0.00025073739007172347,0.24377626832225097,0.05459214758411432,0.0011406529034337573,1.2423255988963878e-19,0.7024538216105327,5.267490407831528e-7],"k":[12.0,16.0,22.0,25.0,29.0,29.0,24.0,22.0,19.0,15.0,13.0,27.0,16.0,20.0,25.0,19.0,22.0,22.0,10.0,20.0,11.0,19.0,15.0,13.0,25.0,16.0,27.0,28.0,28.0,16.0,27.0,18.0,17.0,20.0,27.0,15.0,27.0,23.0,21.0,18.0,30.0,23.0,22.0,25.0,20.0,23.0,23.0,24.0,15.0,23.0,16.0,26.0,20.0,24.0,12.0,23.0,29.0,22.0,12.0,17.0,28.0,23.0,25.0,13.0,25.0,22.0,13.0,17.0,30.0,10.0,22.0,27.0,21.0,17.0,14.0,26.0,13.0,16.0,16.0,17.0,11.0,26.0,16.0,23.0,10.0,26.0,12.0,25.0,26.0,22.0,14.0,11.0,18.0,29.0,11.0,13.0,17.0,16.0,19.0,22.0,20.0,21.0,14.0,26.0,16.0,19.0,21.0,12.0,13.0,13.0,29.0,19.0,12.0,29.0,15.0,27.0,11.0,27.0,25.0,24.0,15.0,27.0,18.0,19.0,18.0,14.0,30.0,23.0,30.0,16.0,21.0,15.0,27.0,14.0,12.0,15.0,10.0,28.0,16.0,13.0,11.0,18.0,10.0,24.0,23.0,19.0,28.0,18.0,23.0,22.0,25.0,27.0,22.0,19.0,14.0,19.0,16.0,11.0,24.0,13.0,18.0,22.0,14.0,12.0,21.0,22.0,14.0,22.0,12.0,12.0,16.0,20.0,14.0,27.0,18.0,16.0,30.0,22.0,13.0,14.0,22.0,26.0,27.0,28.0,30.0,30.0,30.0,15.0,27.0,12.0,28.0,20.0,23.0,29.0,11.0,27.0,11.0,24.0,25.0,16.0,26.0,23.0,14.0,14.0,28.0,26.0,30.0,24.0,21.0,12.0,23.0,22.0,20.0,16.0,19.0,16.0,23.0,19.0,14.0,12.0,21.0,12.0,25.0,29.0,25.0,22.0,12.0,27.0,21.0,17.0,28.0,16.0,24.0,23.0,30.0,28.0,14.0,20.0,13.0,23.0,13.0,15.0,10.0,28.0,18.0,24.0,20.0,15.0,26.0,30.0,10.0,26.0,19.0,22.0,17.0,19.0,15.0,18.0,13.0,20.0,24.0,19.0,14.0,11.0,24.0,27.0,13.0,28.0,24.0,29.0,29.0,20.0,21.0,20.0,22.0,26.0,15.0,17.0,14.0,20.0,29.0,11.0,26.0,23.0,24.0,15.0,11.0,11.0,24.0,24.0,23.0,29.0,30.0,20.0,30.0,27.0,26.0,11.0,16.0,26.0,15.0,11.0,23.0,22.0,26.0,25.0,21.0,25.0,11.0,22.0,29.0,30.0,28.0,23.0,30.0,17.0,22.0,22.0,20.0,25.0,27.0,22.0,26.0,13.0,13.0,12.0,12.0,29.0,29.0,11.0,27.0,26.0,16.0,14.0,25.0,17.0,13.0,19.0,17.0,10.0,26.0,28.0,19.0,28.0,12.0,24.0,29.0,26.0,10.0,10.0,18.0,14.0,10.0,26.0,26.0,18.0,19.0,18.0,23.0,22.0,14.0,16.0,14.0,24.0,18.0,23.0,26.0,23.0,27.0,15.0,19.0,29.0,30.0,22.0,19.0,18.0,10.0,28.0,17.0,11.0,18.0,10.0,29.0,11.0,27.0,19.0,14.0,25.0,15.0,18.0,17.0,12.0,24.0,18.0,28.0,23.0,23.0,25.0,27.0,24.0,22.0,18.0,18.0,22.0,22.0,18.0,14.0,24.0,12.0,11.0,24.0,30.0,28.0,25.0,12.0,30.0,14.0,26.0,23.0,26.0,22.0,14.0,16.0,14.0,24.0,24.0,15.0,11.0,29.0,29.0,17.0,24.0,27.0,12.0,11.0,16.0,25.0,20.0,21.0,14.0,11.0,16.0,23.0,16.0,18.0,13.0,14.0,27.0,26.0,11.0,19.0,28.0,13.0,27.0,28.0,24.0,23.0,17.0,29.0,28.0,29.0,11.0,22.0,22.0,27.0,13.0,22.0,19.0,11.0,14.0,14.0,14.0,29.0,18.0,13.0,17.0,14.0,10.0,11.0,21.0,12.0,15.0,21.0,27.0,27.0,27.0,20.0,29.0,22.0,13.0,15.0,28.0,25.0,18.0,25.0,12.0,22.0,27.0,15.0,20.0,26.0,13.0,30.0,11.0,26.0,21.0,30.0,18.0,20.0,23.0,27.0,15.0,21.0,12.0,27.0,15.0,12.0,11.0,29.0,29.0,27.0,15.0,21.0,27.0,15.0,27.0,22.0,22.0,25.0,30.0,11.0,15.0,25.0,22.0,12.0,22.0,21.0,25.0,22.0,20.0,21.0,26.0,28.0,12.0,16.0,15.0,23.0,24.0,11.0,12.0,12.0,14.0,20.0,27.0,28.0,27.0,28.0,13.0,16.0,18.0,23.0,13.0,20.0,27.0,30.0,21.0,11.0,12.0,18.0,14.0,16.0,25.0,18.0,27.0,18.0,18.0,15.0,28.0,28.0,17.0,28.0,27.0,27.0,27.0,10.0,11.0,15.0,29.0,22.0,20.0,16.0,11.0,30.0,20.0,29.0,21.0,28.0,23.0,17.0,21.0,22.0,18.0,11.0,14.0,16.0,21.0,26.0,26.0,24.0,19.0,23.0,13.0,26.0,16.0,11.0,25.0,27.0,26.0,15.0,20.0,24.0,28.0,15.0,15.0,24.0,29.0,14.0,19.0,30.0,21.0,30.0,13.0,22.0,19.0,14.0,17.0,19.0,26.0,18.0,20.0,25.0,29.0,14.0,19.0,21.0,22.0,19.0,29.0,26.0,27.0,29.0,10.0,22.0,24.0,16.0,25.0,24.0,22.0,25.0,30.0,15.0,16.0,24.0,21.0,26.0,22.0,22.0,25.0,17.0,21.0,13.0,24.0,21.0,25.0,29.0,30.0,29.0,13.0,21.0,13.0,16.0,26.0,12.0,14.0,26.0,15.0,28.0,15.0,21.0,20.0,17.0,30.0,17.0,28.0,23.0,14.0,17.0,17.0,21.0,25.0,22.0,15.0,22.0,17.0,26.0,15.0,28.0,16.0,11.0,26.0,11.0,15.0,18.0,28.0,24.0,17.0,26.0,20.0,14.0,27.0,28.0,24.0,22.0,22.0,24.0,30.0,12.0,27.0,13.0,17.0,21.0,20.0,27.0,26.0,24.0,18.0,14.0,15.0,10.0,18.0,11.0,13.0,15.0,28.0,12.0,24.0,21.0,13.0,17.0,12.0,21.0,29.0,22.0,16.0,12.0,21.0,18.0,26.0,27.0,14.0,11.0,14.0,29.0,28.0,22.0,25.0,25.0,21.0,16.0,13.0,29.0,18.0,28.0,14.0,23.0,30.0,30.0,28.0,11.0,25.0,30.0,18.0,18.0,28.0,18.0,10.0,20.0,13.0,29.0,22.0,15.0,27.0,25.0,15.0,13.0,24.0,18.0,26.0,29.0,14.0,23.0,10.0,16.0,29.0,29.0,14.0,23.0,11.0,17.0,27.0,18.0,15.0,18.0,24.0,23.0,13.0,29.0,12.0,11.0,12.0,21.0,17.0,28.0,12.0,18.0,21.0,12.0,29.0,20.0,12.0,16.0,17.0,24.0,27.0,15.0,18.0,17.0,18.0,23.0,23.0,28.0,20.0,26.0,19.0,13.0,25.0,19.0,17.0,19.0,13.0,21.0,21.0,13.0,12.0,14.0,11.0,26.0,13.0,19.0,20.0,16.0,26.0,19.0,25.0,21.0,26.0,29.0,13.0,17.0,16.0,24.0,29.0,16.0,15.0,28.0,28.0,18.0,25.0,12.0,24.0,19.0,20.0,15.0,11.0,11.0,20.0,21.0,17.0,15.0,12.0,12.0,15.0,17.0,28.0,26.0,14.0,24.0,16.0,13.0,28.0,16.0,19.0,23.0,11.0,24.0,25.0,20.0,15.0,18.0,21.0,23.0,15.0,21.0,13.0,16.0,16.0,16.0,23.0,14.0,29.0,14.0,26.0,22.0,28.0,21.0,21.0,15.0,18.0,12.0,21.0,23.0,20.0,30.0,19.0,29.0,17.0,10.0,19.0,24.0,19.0,14.0,12.0,25.0,12.0,22.0,22.0,28.0,24.0,27.0,26.0,25.0,20.0,28.0,11.0,18.0,20.0,18.0,17.0,16.0,18.0,20.0,26.0,14.0,13.0,29.0,12.0,17.0,11.0,26.0,11.0,20.0,28.0,21.0,27.0,19.0,16.0,25.0,17.0,22.0,27.0,26.0,16.0,21.0,14.0,13.0,14.0,16.0,29.0,15.0,24.0,29.0,13.0,23.0,25.0,20.0,29.0,16.0,16.0,15.0,21.0],"x":[3.7157455370152617,3.7655708616018044,0.8625640109386445,1.3316237125083796,0.9624903491603376,2.9924533663415884,3.051284959478824,2.5087883608459247,0.3930374400816772,1.0004720081892893,0.24814469542851603,3.9961110673210856,4.213849428631228,0.5423494625598912,3.4139808361062416,2.5708686829271645,3.328577662113573,1.41112485907124,2.767277461495845,0.9339420105877017,2.9972522196087015,1.9257837059488059,0.1392977293392761,1.3040656949810436,0.3665714413727317,3.2579414478747113,1.7966351307408968,1.7410210711742335,4.588877629684632,1.7664371723249939,0.8910574139312122,1.3952569769655754,0.9226225233984431,2.5989116680728297,4.717103013061394,2.9730729107019016,1.832445076007495,0.8401156705048896,4.346156099851804,2.966035501747842,2.6142643264433376,1.4138568131170515,3.3875352782350907,2.8554765725042652,2.846562568231384,2.9954428426570745,1.4508051161636404,4.2792254326944175,0.9694686716289147,3.626647286214827,1.7250630292015479,2.218288275335276,0.1836301418691777,1.1975235390950467,0.8511254192485496,1.648406948049711,3.555397843274731,4.321852941683746,1.9119508634224203,3.713485718984957,4.418274898030463,3.5208813786757345,3.5360359664758665,3.4308483066079587,1.707843649982288,2.4702504358417867,3.220450508718118,0.13824048738599548,2.161605115039389,1.5021223275766038,0.724435782665237,0.8845671802946453,2.335146101279336,3.960577440047659,0.42240461399594253,4.649261297526223,1.449140670938247,0.609627408362271,3.5105536026375517,4.5652488250016106,2.586012741876579,4.921741818278202,1.480598181153271,2.146200577470967,3.9951029011278405,2.1015229628298018,1.1502412177795551,1.3979492454519793,2.695257066682718,1.9759964664291696,2.5585677019662945,4.607427549412275,4.805240652247531,0.8559869239871298,2.2250556700639343,4.046927087136836,3.3351990604382706,3.549337576018383,3.3986717915733333,2.3920617447993475,1.994199043263989,1.6409590914422423,2.51459291793935,2.608339557199475,1.598123038800624,4.134389283870814,0.5757089363575707,4.127699882465001,2.207209151248369,4.306714948388873,4.773011848986521,4.2990030106199235,2.2810827646414733,0.4511347467694482,1.5950968980510427,2.4011161805342662,4.013506237141393,3.085046499930061,4.92179370361221,0.9361291744107514,0.32743841635807125,4.413898826120704,0.8111328521143557,0.5265657881172991,3.537106593339008,4.810160614375634,3.5285912958857004,2.7835269443928965,1.873225069778277,3.2567076630636738,2.986369035811649,0.3281314587402695,4.1510773798351615,3.430341253434391,2.1405191413368927,1.1779966916785023,3.848347867547608,0.670875496997253,1.250118219937062,3.2174812509177118,3.4275703580616312,2.9693658890697474,0.6794037992171831,2.407525010025322,3.6154248187499407,1.526074570704048,0.07271656559803441,0.7973433003392771,1.5765467100318142,0.877145193563873,2.813016402029611,3.6734623186884963,1.5847582486809353,4.989537213380756,3.1521274700618584,0.48417548584634207,3.4479532087720752,4.322482305502396,2.8833759854807917,3.7585946667571326,1.4241999439456954,1.6967926224681618,2.3808102411969365,1.3094200726231842,0.13937577750149588,1.5800622695820354,2.3894564683170803,4.506058156218958,4.868495228872264,0.6823320307294212,4.536459308129892,2.441704392550675,3.7724435674159573,1.8227364083517206,2.97660766644936,1.4359066376941287,2.8452851296398443,2.742114113179902,0.5913072596806979,1.052061540326793,4.486027338648623,2.090320425254868,0.6436927473107834,2.0851471968105995,0.6858548268216225,3.141600660813987,1.4658845373557705,4.831222913583036,2.1979577992722232,2.465979526403764,4.12644903600105,1.435387098172033,2.948922959908492,2.6473367707963757,1.021439163657627,2.1851948485391204,3.887975945056975,1.2953303992199094,2.867961828137532,4.116349847031023,2.9626703817894895,3.0324136745605457,3.0622001947529496,0.467476002891416,3.9704298420116633,4.055873708859607,3.388047795305643,3.7418490371613435,2.370061131138054,0.8154006198629904,4.4308105750717175,2.3644289160920016,0.39040755104340796,1.7595662733434725,3.120737020505567,4.694996879214949,0.6732949090309204,4.045575082491849,2.093617108738722,3.2302839434055155,3.80463238385821,4.154932331524336,1.9736424997692115,1.0567277332449276,0.2786410513554549,2.037838373079434,0.6375429245683517,3.326297772646889,4.401034745035217,1.217693991374874,4.001454702982327,3.5545130858291984,2.9857910541469845,3.9468299126376927,2.306400876040059,4.100343818848326,0.8693304298078486,3.7268163016285474,1.6759513042425855,4.7674377813317665,0.42473732842401524,2.0100218040727666,2.5096216441715313,4.250933267082095,4.606577310894767,3.677648275126888,2.6254396379744174,3.8957340721722886,3.652851175995453,4.252973536917967,1.6827351866395457,4.9867466987355495,4.117181609335278,2.8624975301025026,4.800520619333116,1.6481303674813863,1.3821641105410387,1.6125105412599017,1.7826977994411253,4.655102658130769,3.243433909782083,2.5150600275389734,2.0315719960374476,1.9915862798134643,0.6854226701622912,4.624850075571853,2.6207659243492643,1.1805497878041138,0.41221583797603323,3.8484682347645416,2.529765402411346,0.11168058769778777,1.0309093700068483,4.052323077436236,1.9537462636109415,4.086435806102813,3.982354567345121,0.1999617346665783,2.6541216602914686,4.541246187597261,3.281430001239464,1.2262245348313805,2.3297618623211145,1.9469037973549175,3.694692418738396,0.8170611164088737,0.30962875313848337,3.2358426200934587,3.669314708859912,2.9384572390540153,3.2574122165727717,2.5243823907146687,4.1307019810937495,3.7914820360558643,4.929969101656084,4.43835601081449,3.7572495618731594,0.6138861911647375,1.7698427701243746,1.5803897489780827,2.6311755040153773,3.2603331147448564,1.6682281359618034,4.664564280083933,2.1173718665508714,3.355778043501446,2.2866110468879097,1.7483065895328842,3.1339285256126406,4.221024874372863,4.568258931468447,1.6108378119462985,4.593719868232698,0.7314404648187622,4.503788919482453,0.05970984218902964,4.431280186233574,0.2547508459256187,1.6263419804016321,2.161976565439505,1.7408119270286093,4.78592378749155,3.436748158406966,1.9376738402128957,3.2401569784312167,4.521375923418614,1.544748773115624,2.9254027480650038,0.33449366732865915,3.1745670109040502,3.4320427113602303,1.3434581296814796,2.350514039660092,3.1124230068845673,4.564572508042054,1.4345053100319316,3.924439718814651,4.4268197045153554,4.276176221211556,0.47495116774335044,3.16684605877233,3.4470742047579437,0.8171482402605434,2.835904399574034,0.7764349788935332,4.0353399517172095,4.2549485108912455,3.2656881178151096,4.990941046402696,1.365226315088972,4.231482744264423,1.1438454925421837,4.581829764138893,0.886510290357917,4.325526120308823,4.166488143352629,1.5458915276199303,2.249758849543756,0.45378219546321596,4.501862527832511,1.13072594322991,2.1846835170118406,0.6331346582213149,1.1427674781632324,0.017692472555047578,3.605577354173486,2.1149745632950436,1.9404624645532187,1.0699808378924713,4.882646041922024,3.551684017111784,0.8529007818097656,4.492374409021594,4.7177381775706495,0.3512416858297429,1.6106252908732566,3.884888804633891,4.162757795901958,3.6404221990523156,0.651917235168612,1.3800416487155753,1.063683473077387,0.47468365419395475,0.5927831062336286,0.005936813974614097,2.252730924892287,2.7707226825651032,1.9785878354667163,0.16595740567113326,2.7007730537292174,0.43924817749987466,4.937035254194021,0.8837309362191925,3.402008644104301,1.8587238079139268,4.34694509998777,0.5703933489575108,4.400870704435588,1.9202759663822244,1.8328232075037454,0.7579205287271429,1.4470802054441612,2.8618511313723713,3.621734096674519,4.9458191057407,1.3598514692734542,4.780117188560341,3.399674157081285,1.3111499543859928,1.9598718410939142,0.23746623745797946,1.8229256220373524,4.216073735727751,1.7578023995803937,0.3264514292051368,2.60353914479049,4.29840237681264,3.50045304218892,2.159422447071726,1.0438671620389917,3.443195561827376,4.243205500572417,2.5151903387393593,0.05021476846191142,1.5526443834292802,1.324007376941334,2.0547932008135836,0.43385416389770337,2.6632676930334043,3.9217865734827138,1.2652149686343483,2.5877556232370083,0.21109870864046032,2.8419459981037276,0.4974744617991689,1.323273479738989,0.16487178117589818,1.1477226456069878,0.6956782925288063,1.6447729049833693,1.8105261700792763,3.2640749934290367,3.608816426566607,1.6044902757723611,2.3901188418300787,1.779002491778392,0.2514543070568098,3.778775244646834,3.186870420883735,0.6334127383056942,0.9514642570243614,2.055617120624488,1.402822163581292,3.9143608752367376,4.770322461882104,2.0549373560778674,4.840754768502081,0.6870292959384727,3.4070420134032053,3.950329149765903,0.06087737827651596,1.6565945982259023,1.8728883123294238,0.7462477881681029,2.6224117413694747,2.098545541495882,1.3943246577398793,0.8471682937327918,4.435534122154796,3.8874255609091324,2.970744125506682,4.946352001205737,1.4990328770224381,4.596928077072164,2.2893556715140564,1.254916081436972,3.2692157994900386,2.2105443868657337,0.6325089017689345,3.087613308392585,1.5871190774226251,3.56402818852016,0.6120174225025321,3.7346669534511436,2.0056707529071005,4.961963453250603,3.8511847101217445,0.02291869424277171,2.6959997108099367,1.1404466341019626,3.4565600677607033,4.171853083365442,3.626998370462111,2.6624499987972716,4.830352329733971,4.30352473094476,1.2151240423010923,1.7079404063160886,0.7080377761613843,3.5153684339895284,3.2318966593227705,1.0786650422892174,0.8826877557067403,4.522887156354011,0.30939620188791594,0.5131415271453921,4.4104547682948345,4.116578879951184,1.8903381452851054,1.6217364978365922,3.0364779124965633,1.6205038049265208,2.3964099313937783,3.5963482393566215,1.8219839962150497,1.8700928703321174,3.975164287795878,1.7350478924930235,2.468800871713709,3.6535724829325633,3.332819834646532,1.3649128399649746,4.565711774102976,4.478802094270961,3.1358252151246893,2.241053830716988,0.7011343770352796,2.965050791706764,4.9543158573777095,3.213952412573473,4.727360600300986,1.7776736889195022,0.2958291388137524,2.217349534079711,2.006327323811096,1.3287322391793643,0.06047264595633095,3.086572402489731,2.561704757078264,3.287843675858543,4.449571572711781,0.3812928635497548,4.972397692518817,3.1113986072169486,0.3960105964596239,3.2578225607542644,1.2809545866753236,0.6527121503278366,2.4887613381364226,4.888511530000947,2.9435237336518427,3.9565508017919946,0.49980209916859475,1.5307162480993697,0.5381366191129533,0.9087820704437843,0.6192850711478781,0.24999419405696943,1.6562111805207325,1.0921445949837227,4.466248235773987,4.6281047888531015,4.972965055860003,2.0648758541358427,1.3284504548731646,1.9132582334897141,2.352246893606791,1.3671130535537168,1.9464816289251374,4.839928113335882,1.2879853754026382,4.5186836364477845,3.0996521505326315,3.058753449756134,4.052200188411659,3.5360791109708356,2.1336122006960254,0.7861621883030534,2.585027892563633,3.73424155790141,2.6053378963384146,1.7153441260217483,1.8585175456596348,3.5906253630906795,4.177963896641113,3.486688508127055,4.449623926808348,3.408778714493792,3.257992033155844,0.738712593188876,3.2313678698810455,2.12849889094651,0.7969811806757587,1.2359798563872526,2.203430889807114,4.774716212892708,1.9595574355482026,0.7116707084751628,2.145479098444482,0.8720457970053908,1.5967074551133653,3.1907847207961404,1.2213595250063247,3.4274892486010664,4.161102426501689,4.416713373359105,4.982296694790175,0.4102945351934928,4.467941842818387,2.2951489523412105,1.3682498950944022,1.4722724498121542,1.1806470472089459,2.2681695383431,3.9173320335031225,3.818288893979449,0.8723944433870134,3.1352669448355375,1.9588662820911873,2.1650400430757655,2.1705899021156014,4.590609538584497,1.318297672651565,3.4351327419477817,2.140002020864028,0.10928316537296645,0.4570137080354031,2.9535720025931713,1.2626439392115996,0.2089842815916798,1.495632745697455,3.7469721240232126,2.922752564644917,3.338690659858674,0.8780352424230242,2.28837976562259,0.7567346581009549,2.1783490937710095,0.754453912482943,2.045747472611492,1.0803498748572127,4.998969192658251,4.803857310395659,2.431287287737388,2.27776599489812,1.618378882432272,4.594505227165909,4.406193533454746,1.6572382638604644,2.572764141445435,1.7016881137257656,1.8225379044571521,3.3341455184908018,3.226933596976367,0.1831636811856563,4.310764460619757,0.8648787418721104,1.177272154248864,2.3680079198023076,4.3126029800762815,2.4029978140573984,4.425847283089538,2.1987183505790817,2.1694474559781263,0.44174001187913703,1.818465647943206,2.800749724105256,3.513705291941366,4.315102486919359,0.4334429787385441,3.7351712044917873,1.6420106204482188,1.2038372903701522,4.699342217719246,3.3558416439860217,2.4052270174904433,4.653310067338095,1.8469668382972049,1.429074345779593,2.2900997756699084,0.07546985763192793,0.2534415768445031,3.3611070699055015,1.6515242903267169,3.8198883113924174,2.068414145994418,1.9456679781759867,1.9230807750943624,3.124992655776074,2.641534431420096,3.445819811543338,3.153409882010333,0.23641546972220318,3.961503436953749,2.3147778786875817,3.1336456630105216,2.1538891217508827,1.0942277803391953,4.389825077119728,4.622258526783433,4.910804222839708,2.3328807480700786,1.1326188691963168,1.7349435990591144,4.651278404992613,2.392935220663518,4.716118423498498,3.810727780057146,1.1092272812044757,3.9599247028269047,4.340637210068831,3.411047296947045,4.581566156587694,4.41394865765421,1.8872062351170082,4.26085800296487,3.0628236699638647,0.06335124196243824,2.77851970274365,2.5796146390884456,2.022386086305883,1.1010890289192377,0.6515277963154176,3.057141444006395,1.712591568793177,2.4304664742761073,0.39792431816951135,1.782374852319143,0.2823393137660546,3.4369598122707803,0.18855807268966407,3.7196474532020716,4.534070254001076,0.4904890320628963,4.48941673897925,4.639642765097307,0.12588805700627814,1.9483673377899413,0.036249727408824706,2.941541525963547,1.936209180880305,1.2436954367705944,4.959363091051276,0.8427524641891548,3.634099396445235,4.255589723438425,3.3156667899696535,1.3115464844427283,4.452401687101143,0.7329334098905882,1.9381673716915182,4.0960745112652885,4.530180121650491,0.7177825054330034,2.7893109022032956,0.16369524322097262,0.03511450887197953,1.9535335986796565,4.143975600445789,0.9777056318696453,1.9163413147056385,2.9859469587518808,1.4525321783745115,4.39426986292871,0.36206870224186893,1.683143384434146,2.136038629578918,1.749829534429086,1.1790519740500272,4.2361425309677205,0.4564203138897538,4.9579241817096475,4.902871163654906,3.5086649138703088,1.6950140517371637,4.820553361819321,1.5302760748550814,4.040636372939897,4.059114737906082,0.3658323201694347,3.4853255810729475,3.716138683232556,1.3515312595017381,4.874066323547918,2.960736294755557,0.381662048653868,0.2012246726484601,2.773568260020368,1.1179099929709113,1.8664134052720294,0.0551884723773477,3.7423364970403106,3.034913339530836,0.37164080650225917,3.8985910256335843,3.3677901146502274,1.0642116946531999,0.6617920484717787,0.613451463925524,4.100565592852478,3.661732881749602,3.9927726449742487,3.8776690415105977,3.434479365411136,1.5429778827629503,4.619445636630136,1.2871869096235133,0.5637783498300231,1.9046827524959176,4.031559638495921,0.9036464614729911,1.9184089707488405,1.1788465503048495,3.716205853675858,0.7786989328769589,4.581275148823643,1.7919334190912561,1.1847454763572651,3.6448564349420454,4.344600249711315,1.6239627806535561,2.6136844534608406,3.2023547929257825,0.32536206999018047,3.132481216081864,1.1022010974834096,0.16475368961988535,0.08711273750359738,2.000875303896877,0.461229406074003,3.1743437281537745,4.59987075298651,3.818360342878359,4.151573802483233,2.006073077795577,3.9174539541844977,1.5655430256969871,4.5578946984511335,0.14682196633927114,1.0585216054748736,3.1489541156773426,2.101183413366728,4.052150382685257,0.6408532961990432,3.73660359353724,1.578006177153275,3.3742890683281135,0.3324611356978924,2.52424477993224,4.170881444280027,0.8552817844819705,3.2735826247566435,2.1490310831110335,4.230292676674564,2.561645808746934,3.2686558308769254,0.19232801353682105,0.4095347617074063,3.34080111565519,0.8754564526598607,4.557478039674516,1.8374352702753194,2.7436083746529305,0.4996550446316794,2.7584426829414763,1.1368429425482929,3.9546307462693675,1.056180467592387,1.9154061992148474,1.04061714004976,0.7894374794652959,0.7834754825196344,0.5619231213820131,0.06302077478813839,0.6063958391556878,2.6423917901883573,4.890630944254428,1.9800945519721136,3.4403578770075063,1.2702577153134742,4.978899124142446,3.4281816151573477,3.312257509865856,2.253591056256248,1.5313489709027128,2.01547172784175,4.2882730830321325,0.9575164524831126,0.6834754333539483,0.2273315401603604,3.3944518386944065,2.1905953138231506,4.219156265363731,2.830719232462874,0.6418468112437459,1.108379481783125,2.4750006283168844,4.428713454431742,4.265455303068636,2.8163623860328526,1.7037437472751127,1.5821557230632277,0.7421919827243828,0.9059657481133099,2.0563145897063317,1.877893855612699,4.578827213021988,3.566965108826224,3.596163486706796,4.947286558466758,2.820057009355328,3.837505645084488,3.2118160979251806,4.988193790657796,3.974802483943111,2.861027641130679,3.6017880310213646,0.41401323546212176,2.825353174875623,4.7312186476098805,2.654088169251969,0.49685945747036997,1.9463638936126881,1.567520688263283,0.6403828598812233,4.5162656809886865,1.9734143718002883,4.8057595590774,3.2084236136812794,1.4476299716237606,2.2221684722862522,2.7610360439444337,2.2293389597462676,4.137027880529026,4.836051348489651,0.5649922825842812,2.2288750750849298,0.4711774748556774,3.0431335342028354,0.1192959370838309,4.0627285640305155,1.9220038994021904,3.3475803030338414,4.662117869980373,4.363537046933884,2.5950826534704516,0.30633234869483994,1.3425722503527049,3.591724530510063,1.2043713299245273,4.014500290503565,1.299196960463087,4.630439304386689,0.1451422092071053,2.6426110368260236,4.0114694777987125,1.2711275576196646,3.9781550991090087,4.350982661782035,3.6342745654923814,3.5553147718618394,2.263796584290718,4.215574683964772,1.7166080121328242,4.1011272436319555,3.6423149901910223,3.1000650719592615,4.986241366272896,3.5520148939962572,0.48317422924520126,3.6703317907528668,3.314796008574331,0.5587863085809763,3.0764004231045083,0.932678285227021,0.4513695734237988,3.100665402731196,2.1477469907492672,2.0059865900120597,4.466125965849414,4.549686590318207,1.0497277934537252,0.42782807991893046,4.5374171913967585,0.9782299445468712,4.716783534054407,2.7437988467247654,3.564011999763592,4.539051901505004,3.104523558120561,1.9869017233091213,3.2525060301861872,0.41592544134163134,0.3998582137589002,0.6941427033693848,1.6678903674693824,1.504566259609379,4.179111501553807,1.699701580561166,3.943412307884684],"lambda":[26.14821372190423,13.613679876845396,13.24130742072386,18.44879941192395,12.735333128705628,18.593262555466055,28.563809487622606,23.976991777148235,10.982988034281433,14.277454354348977,18.4283868264567,21.65952462791083,11.016241774451094,11.180107182049802,10.571505555554385,10.738187620719035,10.180762803282208,28.909000060689337,12.453196292211812,25.794936572804517,14.45226550946539,21.286759290555878,22.6907113185879,26.084599990183506,29.389228386939998,11.086908096955073,29.250040904927506,15.779032271096005,11.960710091186261,21.83540045974535,21.12876343894646,29.1601868057597,11.280482853335169,22.345960575476987,10.630973782848073,25.530242516397138,26.856021257500412,20.57378971432353,23.694008554534097,15.358154445188434,15.212218206172832,13.760719509290315,14.210730969136636,16.351244487490014,23.369811675444776,29.32851172259246,27.396652861207798,20.778962545468485,29.80222027171965,11.757440237397754,13.667813607874773,10.302992202903972,20.73149771016412,22.731193894137323,12.602499969883887,25.921570021744557,11.401417345823797,27.88211327677509,23.04761208809221,25.851702789158963,23.189758879330242,29.811941736195706,21.722874343282523,11.263662985462194,14.35171640459612,22.124599362381442,19.55701279157236,26.99258005630595,13.339852235880624,19.255551618980327,24.88123497845735,19.50026535822481,25.014860918220577,16.350773401556772,18.520744608474015,24.928172572175722,28.965544492556496,28.736258810588303,27.14426045455206,18.556095180504144,29.749080502042258,26.40612167510544,16.690081934573243,21.02055232655491,21.14266294909592,21.183538176009918,26.56288262474748,28.187579216028467,22.18937060099718,16.44227706643891,23.009178008290576,19.762602064245026,24.260951060643148,16.328032334872027,15.425309510173504,11.434297421328544,16.534314645048784,24.73546116567085,17.386746005361324,17.67922853704416,10.801609285028949,29.54920150121552,18.312155850473477,21.058554736564897,23.007207402889502,26.97778756763995,26.593435375439967,13.972271112771937,15.216640619970212,16.061432428077545,12.757362944377405,18.419940556389133,20.465765008469575,24.666870044486394,12.919225627055496,22.61903650022099,18.472753644455825,25.82299489046089,29.92236824945795,22.14024478883244,19.493791239141387,29.730406480947597,27.601799843822814,12.060593147587051,16.053244750931377,17.370693205998258,15.47709681344594,23.80626708164087,19.70880329947959,11.359675204741642,28.15126268037457,12.966924868061174,16.641808816606847,27.668540554707715,19.564698470138172,11.420885064754911,25.904868267728393,25.33974050433273,27.521260149077634,12.22653043778303,18.415068377873904,29.80795133370281,23.81506304079799,25.733001241584432,15.80942611550158,14.863363209976557,22.492824519843513,28.391186130964826,22.329353983005138,17.321216093289827,12.089447453813587,10.791864229576547,28.911296275850273,28.70730914709805,26.334173796237152,12.668675236635574,11.725224646187563,25.4333969777832,26.671175699537386,19.674322996215082,21.487579281015478,16.505126993913244,19.08360743382545,25.201153983862422,15.837014639883883,23.997810482698494,11.99333749575941,28.034892161846848,26.440619183519548,13.868882633446766,29.738412784851334,13.57659551914741,20.80448887848789,17.28603788574427,12.582738991250292,17.569058381457992,13.078830602567368,25.01271149991438,14.90122327433411,13.848656008858931,19.465192022981697,29.86885027388768,17.776297132532136,22.09453306019585,22.406912693209424,21.78684444414958,25.338439193191586,11.444950022361716,23.065348517041045,25.87990689666934,11.368016720116687,20.55487027170724,25.309769084572785,21.255060897551456,15.706617245313797,24.00281471703866,21.427570072601686,18.603191975752193,25.332669356053273,27.163665269708094,24.310730446925078,18.954384847170655,29.398006935516104,28.561131186288485,25.89335013346874,28.578107137924754,12.181880336758283,25.518148711095492,15.790498906882217,24.131704600851783,19.06671812151672,24.933270584227003,20.59687889338702,28.462214396612758,13.451517160795014,26.014623281980555,21.194344451713945,27.39007986968813,16.09227260189218,13.638713138514511,15.739131641823366,26.07052457908575,17.991075673290524,13.980323944564477,14.489750772105392,28.078525496314484,20.793837921794992,21.213046369798228,10.308997136765674,28.858435598118888,18.456220969014442,10.993187179265993,19.79109625973669,13.513079048624306,25.679959426481428,13.941920720098778,15.593859121454088,21.273241696879435,27.100385632639515,23.98615291766889,11.792087226906078,16.40171139111663,17.323554253317994,19.839322647785064,21.803875147377028,13.76883772572521,13.008114519420385,21.506170337389882,20.00530065583397,25.90462325730612,20.018029251100558,22.862878829218193,11.542241120027725,28.338712613250255,20.82511923929725,20.406264324029205,21.35917629305812,23.084733020129097,19.8007788564759,11.206799858992,22.005778982685776,22.858085619375544,26.15395612388772,15.05709183667523,20.058216647066665,18.759382377818934,17.97751047231694,27.193876594524873,29.283000539798472,26.088981542317114,10.756869424640328,11.669163858408925,27.611435888056697,22.7793401436886,22.52682928080041,17.8788019810592,20.535984399387228,18.75014823862974,28.861429497426844,28.39924256704357,26.498192707428615,14.45527139401387,16.361748720880986,16.979696946043177,11.49131472627011,14.59435160336621,17.81382448066557,20.237713376854927,17.000214715519846,29.279361916686966,12.546850929007856,19.110204004561094,11.907418605870607,28.958081052533295,11.56133440623966,23.397370743146226,24.697946951651808,16.980723252599276,12.733904633779897,10.56149281778512,18.0214215191419,19.026437137942366,17.395999346790493,15.309041014487752,21.829109411368638,15.53895841807238,14.43221847159779,10.114825796240105,16.50535342467233,17.724826591166327,15.393157470186445,11.847614338810537,23.879029725781105,22.382987504102488,11.353399075173932,23.683622385500232,11.625951233800627,16.915271328298104,14.622548935134358,20.767094072663145,17.86098238309624,25.735590454434742,25.345774571686526,13.88368236199601,26.877894948909113,16.273273245418174,17.859259584059437,10.803908763898677,17.776652647095315,16.749813204087424,18.802491925418042,18.190845814312134,27.25530732117397,15.70654410274663,16.37861736863432,27.52940612754271,20.940028831908414,27.729807637371472,23.813557530091032,18.169503408835435,27.31585222193841,16.138161592676212,11.57423719928229,15.647413066989575,27.459376726769122,16.850136581328545,14.805420750201428,16.932203101652746,28.00893131106318,16.1810660019459,18.189135106636872,15.574519672357816,16.552366125621955,28.660784232524858,22.22726925174601,13.30368308387782,16.25428384086583,29.99144153034177,28.789767711087816,10.100752632793686,21.88565018480333,11.892629014347422,16.040473443881027,15.582942377714964,15.190265982143899,19.753085045359246,22.919498284620445,18.08911900591889,17.13270858896028,20.035143444040532,16.674661502854946,11.286988227825855,19.12087563099123,21.519240727964597,13.917260230217616,10.816497645804164,17.63098764539242,29.511882831918797,18.27875170643263,23.981957793216544,13.796218832526117,10.31892612387264,27.720018361328655,27.18444418288183,16.398796847156515,21.124213500119346,19.34247262595045,26.37453857925351,12.53158669615042,26.6598791406494,24.563545820803828,15.57510123643885,18.446185138131447,14.602269973141734,26.848596036963567,14.345234837198637,24.666346643337583,13.922582823505504,16.874280464057193,25.15862384886333,18.88099897011108,19.9212137018575,25.317528858242998,17.4753122964592,26.57581213355087,15.219880766037512,26.202257363360953,16.629083818980046,14.638056096188535,29.84469354722925,16.557089207204214,21.844235427634096,13.480152978925357,12.69227297348169,26.639093253002343,14.100636151598458,22.174234238489454,21.494878494131143,24.775802534022606,29.773697034465293,28.939266753362844,20.24853977435479,14.432556709964794,11.629522078507772,29.04450942416438,14.051300621559179,15.827591111681269,24.639607023979305,28.96629268242656,18.953201262030174,11.62566065840231,17.25421664418139,20.787754036575137,28.328280918764726,26.41790578795421,18.274546927486,12.33586490993002,29.613990659995917,14.854885269455043,12.725266184523356,21.015885119290214,11.829046339573832,26.792523601478223,26.2167490475223,23.828402256428447,19.001018428803874,18.035856875128182,20.575046875181666,19.989233762811317,17.0006385175542,25.255342888966435,29.5731679569835,11.727448047580147,20.49396533863905,20.88856189448407,26.768857884782648,26.080582947968217,15.004308222043443,21.871604528379077,18.892474209086902,29.54502762551911,24.74771137130777,19.742089572622508,25.264776360061102,28.14810884052113,12.649814048539687,17.774799213245775,18.829020970022064,16.990741669079465,17.97758307541862,17.275942193542996,13.732468537480047,24.13626851763018,16.973495800175165,16.691246248374362,23.444877662975934,16.705206757540868,29.788659045925385,22.646500792895495,27.85921710734896,16.98033498034242,25.379299052070607,15.247194083747416,24.869438190288868,22.897089680249152,21.91863320332953,18.707280017692728,29.741147241139373,19.555518021071777,17.390975256407856,10.387908477247422,24.74989969395589,10.045922664721004,22.298523778360146,12.90049865220205,17.57658405682796,12.305622962111853,14.012720450613383,18.178872625989406,24.227968034038675,10.493248128883778,11.692897719191118,29.2953771528935,29.25588256202781,15.141266971010904,16.17445475482966,15.450071367327563,29.465632153765263,28.54024394408766,11.930379909355512,14.083515337354594,24.863840769348467,24.269459747312588,16.50607129116272,29.695167637664973,17.81563389678949,10.94641885833715,11.61313762036761,14.822622989962762,23.35927676776855,17.586162432411413,16.953391753443185,13.104123013058464,25.813737962092116,11.0556291760081,18.338670234564365,15.070895452127232,15.754307211489632,12.415824127333206,17.220207794618,19.305437418196437,20.70112535873605,28.154975914518054,14.857992964328183,11.85994692465961,29.006166839349135,13.739290329289467,24.328040921774704,18.84141258917859,27.907105103157473,14.316238253233111,22.83041849623018,19.49993394818161,25.44485661861382,25.912716498949703,23.179445602518456,18.172726458970164,22.61892050257726,12.186011088148758,11.584026612297617,24.184378673506217,26.621095946122495,13.625758046377152,27.347359924258157,23.789494669720767,17.38219468008277,12.095017984514964,11.922023711731814,20.052464617011164,13.822274848927659,21.145697380128603,18.363737150570493,13.959205072889205,19.930538565210846,17.96983229455516,20.57747182312797,25.061262831933497,22.566666965276024,27.98932822690306,10.069443448200083,23.506582624561098,24.64700204193001,21.727445173829757,23.411863533420394,20.883283563710595,15.102451739689018,22.912853172709873,21.580516305228986,19.841511734756295,25.282863571195083,16.30470505659929,18.895615818938225,26.190716402123453,28.83725524729899,18.006481935390603,26.292358679088306,25.645389360642795,16.472428692437703,23.622862529718518,25.90422687329702,26.605413799392252,24.47875042395211,29.202844000161146,15.391073677437666,26.863144499242757,22.084616327138438,11.724719997068181,23.027450811910132,22.284593846967464,21.683710830032293,20.525691726153063,23.53677628777534,19.796061327752227,18.550142749907582,28.662670828668414,11.256857417626719,17.713114539252118,14.729272513955767,21.52858868484753,29.787053376379454,11.936979956709962,14.097709027229728,12.577246584769647,10.317442796621318,15.296639457239433,27.832952615874568,21.56544507684083,15.616197653362507,22.130440766104044,19.54972998765431,27.402332266514037,17.372776886457657,27.979712288289456,25.04949569745306,15.295478504091463,15.438915774041405,21.882898521414344,27.40873998806634,13.378630124528797,13.491664008553501,15.324718476548075,10.87191117699357,22.62979590444898,10.024750344691778,19.834384992803564,12.748346211049665,10.627641121815273,13.098908881236536,28.667627299005566,10.546093992722557,23.59792714685944,27.247129905442144,28.44051058967583,10.781639658497987,25.35066330349799,13.290074078583661,24.221855681304604,22.547257362542577,24.429959784374237,28.516414903823232,28.62480973885688,25.864912277066754,19.980132427224348,21.293230867571573,19.363247813183513,17.775502990678223,16.52274568187987,22.06748898034466,29.35016340530353,11.06565715989289,16.789274491102553,28.255529937610675,22.764917787179183,27.296035679529478,20.03878521330169,25.12599231149538,26.979633858515744,26.435508791421253,11.128314587496266,14.486059395944967,14.195530831407774,13.459260851609308,21.807795401641844,11.01248074581688,25.03956324993925,18.27843018292036,27.40790195383935,27.29375681347048,24.76749642047094,23.84887268617299,28.83437876598098,11.81855179851338,20.624714036671463,15.20996871534988,26.574184830494744,13.646167024793359,29.10199139609218,17.69557923766179,27.22722057240706,23.58172855119119,16.627634211960284,21.73103005131077,11.830451652659747,23.444074822325586,29.368349692030623,15.254589969890574,25.40290709119434,15.549609619863581,28.151828395098676,11.454657922665463,11.058277361719334,13.089217261522702,18.046968894415443,29.555717119626724,17.265489372630167,19.62841029289287,25.122462873991523,20.358528491919223,25.412819353210164,29.727284597021626,20.827914011233183,16.37106148743456,17.129892743727932,13.71193061399608,16.48854678493723,14.906402686758629,19.61304969485408,22.156615327751297,29.76005220347176,19.14625454577309,25.749569585058786,22.48928644329656,29.338640121062895,16.892527979058862,16.445040046855794,29.95711845011623,22.63578860425657,14.926974791001108,12.745345152745635,29.406848596680465,25.587899231801213,29.085100854619167,27.06267031041252,27.493432073844527,17.93593914769517,22.78437685263516,23.736212891077532,29.519347551775613,18.77241555490788,10.231825903932847,20.965128195462974,27.863490316530623,18.54825062642089,22.661609027889394,25.598871133214296,13.794939724651298,16.504964583135152,27.334197362264835,22.785704660661988,21.495772041733137,26.275340892525534,23.836980846314052,19.63066250656981,24.205944491080423,13.20432705210655,24.99635110886322,24.141144440150114,29.533565331287704,27.842804759622105,17.220820190641668,10.707966574898379,18.45226597990106,22.20559402787691,17.65163974729979,10.44852138993357,28.65971188924677,28.12315928791118,13.57275965701939,13.865740855178643,15.281009293707841,12.666643997809413,29.25844872404192,21.71115657596318,13.591163055970789,13.14055376609228,14.906266036907034,15.874260431452981,23.845059708878978,15.684159234800067,14.266375726361634,14.696869980492643,11.592696905805685,10.587334629760203,22.404623185630946,11.480779579336694,20.65355078631535,24.737566299240253,15.483838464282446,13.009318494975282,22.75445732364814,25.640078242835003,17.0979890719924,15.842919867752844,24.223034322629463,17.258416056904228,21.08760770497146,17.459325641159857,16.847207448472087,11.054714151906527,20.347575664444268,29.12839280104916,17.020291809705384,16.375015533819383,21.613269931951,16.70591383398534,21.29851188712015,25.582128931104794,20.750355925167923,18.466819483318307,11.264427761280796,10.43632110799749,29.83596667696366,20.144566993984657,20.542096757575926,20.57339175718556,14.536365690674149,17.42889661845773,26.622978255306403,10.412040284616824,27.677256714547234,22.93418440975512,25.012571419673563,13.122166926960332,15.305157145322088,18.063129437783438,24.99241834022374,22.601751200277768,21.068576372087534,26.273404355236227,14.919851888907516,29.941437311134447,26.836357089436834,11.716703960062564,11.033354954360174,15.295310798628625,18.256919970754918,15.511526576351846,29.429095791722673,19.610471042969124,11.15151999317396,22.042114861220945,22.440430085169165,28.084841996952985,28.645473580232135,26.73480271627058,28.781571417739904,12.121683878431973,16.705987322983717,11.999457255947522,23.003346662086788,12.619120371474871,22.731220698755777,25.991645908244774,14.183471152977273,26.491771095942273,18.868173349500022,29.63479353072316,11.178120837841604,26.881241349472926,17.2429240864335,23.090211557720515,16.6695454552462,18.934625104521192,28.6739646946992,24.933444447846828,26.407970359602125,23.270225099603277,10.006876980621442,23.375498451511984,19.224412058466935,21.078248630825943,28.755447841469998,11.262674791489662,16.998176205616037,12.559720292835204,26.46684971526618,27.889478742154385,17.213651041129395,27.099232385399997,29.01276503192698,26.063657788618336,11.29108381458539,19.71680010572907,21.790953166579364,24.65597849212355,23.867443354553068,11.482565086754452,12.835776638010511,17.22473506898303,19.477899508045095,14.98159785827534,12.463715630723776,11.583469467232081,27.557179956100946,19.16336422303663,15.849553754668628,12.434900435189927,15.982635892576841,19.528748041750706,28.236846086427313,26.239783600565573,20.237049477849006,24.987045688224537,18.618287594704938,25.242459603150813,16.314678718517165,21.030169149151195,11.566605729726405,16.032608883877085,12.700717937800201,14.901550609074077,19.80406257387973,24.71545311955989,10.375406131499192,10.246848842979247,22.230902744613434,13.188437665622077,23.71826222830473,14.722978121244065,18.22929978634906,17.612879802593923,16.868769792783663,12.790301148214667,10.799042498907308,14.385824061379772,13.5233427974224,10.148558309196893,26.69248358610339,11.739512353776465,19.03426753697932,17.898461588481723,16.926774161542642,29.635777724264717,12.445479812804416,14.158245632452573,10.749328586349867,20.329295088275657,23.637476236439262,12.377392364312211,20.12265608322101,12.037086658732674,24.11112302670277,28.28844475628317,17.043681743286022,23.984017880741693,16.31968232810221,12.455276879220092,28.43702989220407,19.574775765472083,10.348785260112145,18.288546431910476,24.69737452426912,16.2916305908394,24.27411831578382,12.19199214489219,27.121554013310607,10.660066984785722,27.893979539660375,21.25717168842836,16.311784367306128,22.79554557038134,16.05487044861905,12.816687311355107,17.940793884837298,25.118560602953703,29.683095869624324,21.762342059374657,29.264903398069478,12.49597036746307,10.120904405470093,12.531589443332344,18.000048551611577,18.31335809471635,14.657216462410215,28.779162473445265,17.318577259469066,22.45461086775235,25.995664037602072,29.59903323509705,18.125795137824895,12.129199643553385,28.11936888579742,21.551196670435885,14.46435882795976,15.226946040642385,13.690901795677517,24.244938797607585,16.6142007255325,24.82227060012319,27.910195086112246,16.808374822827446,12.062121083883405,16.388698231771386,22.01892700214128,17.00210561616192,26.81020990030394,23.692564519169622,20.423274912343,10.543976036003784,13.907434382609685]}
},{}],29:[function(require,module,exports){
module.exports={"expected":[0.025934107087103375,7.061335668606973e-12,3.1029058043146156e-10,1.2092200242091099e-15,6.625256501664989e-7,0.0002956978681334437,1.0682274738631632e-6,2.067893342844541e-7,4.445989439554077e-23,0.002370960897405837,3.0598752769012727e-9,1.1236335540994951e-26,8.796806589220114e-25,4.920894371776884e-19,7.487884685526077e-13,2.2940532932718022e-14,6.245171357924179e-7,1.2161266738062515e-19,9.315804414225326e-17,0.04036393015956126,8.563200958818326e-14,0.007561337246432231,1.4569168541754618e-20,1.6131212754450384e-9,1.557413915163744e-14,1.3244462466837985e-32,4.985925903582138e-38,3.268727583267156e-9,3.9033904705407107e-19,1.2064888632679075e-19,0.0036204677143641373,0.7736185494839384,0.8698601308071154,0.0021597640705393398,3.009839339778764e-6,0.0,3.314231805869665e-7,4.837079221634635e-14,0.0007805142291355617,4.5855999428371686e-20,0.0,0.4570916633578034,4.520830947481841e-7,3.404510260290116e-18,6.880593513065457e-19,0.0027155770420387235,0.2583327451337767,2.3351222199252183e-7,4.1639481400207096e-9,0.2515287966003192,2.5238741084292277e-22,2.4446143939855855e-21,4.6469379998702476e-30,3.3308778564379287,3.697677809297239e-6,3.308338491981072e-31,5.509364714743896e-10,8.062116101666672e-28,4.4863060149074815e-7,0.36365428297520175,2.0191886837536878e-11,1.4706510264883295e-9,0.00012391468015989445,0.0,7.877193386457402e-11,1.577969052979747e-15,8.219572223817812e-31,0.04665871925625407,2.1068563091098365e-8,8.534853561244434e-34,1.4023470137178017e-11,3.9099649971272526e-15,0.15657967443190635,7.481160929877875e-14,1.663854927043272e-19,1.990882444970551e-17,2.3649440737583294e-21,4.469514241836411,1.2053414950612693e-6,5.658414971054043e-16,0.0012466870021673444,2.5393359209436113e-15,2.830221329391398e-22,3.686940549155175e-5,7.693252996919712e-21,2.775593627888021,0.4785256889813933,4.455847571951663e-6,0.0,0.6178973508658656,0.0,9.527485699482529e-8,9.968937556893173e-15,5.147085938512239e-7,5.816903933904986e-12,4.402993629613774e-21,3.251257270325587e-12,4.656464014746898e-16,1.9520667792501404e-12,7.341427072142309e-10,1.6620078322906384,8.676899056005793e-32,3.1381500052454946e-30,1.5947177788653894e-12,7.87946510123113e-26,1.0661486902182975,2.1073063714165946e-6,3.734950996058071e-20,0.1256499157255397,0.0,3.6219069732269826e-21,7.917769404713848e-15,1.1294630087350105e-7,0.9758980269952441,3.441601591954453e-8,1.457924911758684,0.008452943954046733,0.0005808507306792646,1.81718188869998e-24,2.2456581315159608e-18,3.8013693001203816e-13,1.0870938221158898e-24,1.8160600293436017e-10,5.6297325998791e-6,4.187306706438003e-21,8.343859562786134e-10,2.3601394947788502e-7,1.0810284239864364e-11,0.0001847400199236719,6.921078754510834e-12,1.2137485886516692,1.1752566998869582e-31,0.6919111584350993,2.0629890140290715e-10,6.6315304728411904e-21,2.158521322419417e-23,1.7543474303785862,6.156764121128784e-7,2.0952747573133183e-28,1.897802140496272e-8,3.014157653983261e-14,3.646534712380861e-23,1.8536154773288918e-16,8.100345106083629e-34,5.5690801012557364e-18,2.3132970736344267e-21,3.6439633723540663e-19,1.5010164628157134e-20,1.636730993256528e-8,1.988746065863978e-6,3.198169924115387e-27,3.812395760015338e-33,6.920538345461998e-23,0.9795915134790724,8.152001893577903e-9,0.0018672436452790802,0.0026666639644447538,4.4728969276553366e-17,7.154305398425495e-5,2.8924671673166386e-28,7.698806206131981e-12,5.694909675785955e-22,0.0,0.00022402468789494358,3.220150787615484,4.3643004549546615e-10,1.169407742986009e-25,1.6126616701153256,0.9726524713247501,3.157869201694172e-10,2.7023484611526205e-28,6.482040688731663e-27,1.2643860380146259e-14,4.736212513660437e-11,0.0032607805302385597,0.0,2.4647402839140704,7.143593711153766e-22,0.6876056504387045,2.2060340600015164e-10,1.5588845680286675e-8,3.961430167687667e-6,0.0012264535076621328,1.2215403467094044e-6,1.2952904047576227e-6,1.9685791800706447e-17,0.00023063459929517142,3.0702796335239495e-8,1.7235165506326098e-25,2.582704615610178e-20,0.0024777066353438874,3.073525731689871e-11,1.9204840193617216,0.0,8.17085460271428e-20,2.7174404401040712e-12,6.463007972501868e-25,4.540257428817509e-23,0.08787927990361562,2.9810572354227492e-27,5.217913228010384e-16,0.0,0.4744237366179636,1.443345903552878e-10,1.6638788225148026e-20,5.7881790210281e-17,0.009907195735897607,0.0006081662595818183,3.113836193906951e-20,7.270593819776535e-25,7.681998284544958e-26,2.227658668031751e-29,4.4178765792403694e-29,1.0019059408789175e-32,8.807407983051937e-7,0.5101132222251832,4.449663520413509e-17,1.7585823226187515e-16,6.1309823842465675e-25,0.0,6.963807750328259e-19,2.089437760621292e-24,3.1924034511041756e-20,1.3186414556560373e-29,3.8593332359692326e-11,1.519804583446755e-24,1.6561556314944978e-32,3.675295462896534e-15,2.2562350884676547,2.1596320846297517e-8,2.422330363503221e-10,2.9969058611630515e-30,3.3683492655449404e-10,0.0,0.0,2.525351186289381e-12,0.0,4.3318723980375455e-8,1.3169892396604013e-17,3.483688363136014e-7,8.133522704145414e-10,7.960871755655153e-24,6.993877526268414e-39,3.8848242541708506,4.322615125342706e-29,4.2839617216694663e-7,2.0988342636069813e-19,1.3122548828855742e-19,3.187051884291733e-17,3.2520271268201282e-21,0.11852196570676145,1.9095982418033504e-6,4.5902976082598955e-25,3.920493035694004e-12,0.0071097838813826185,7.313304964435971e-17,0.036188602770048234,9.764514711747106e-6,9.51039911363637e-33,1.987607362733063e-9,0.0,9.521068600579715e-21,0.017519885368503584,1.7712414886867915e-10,2.63077548678318e-19,4.942012914541098e-16,6.2806969824804e-22,0.0,1.2277382404730308,0.049351059098693494,1.2305062952528494e-21,6.299642831568338e-8,1.2030398410980024e-5,2.3972538686389676e-6,5.707139483270742e-11,1.1356280660107803e-6,0.44518823183088047,7.738910583252946e-6,1.678419631480705e-14,5.6433136715477497e-11,0.00015112982190106894,2.2324762415032353,6.248804568731039e-19,2.2647123439617613e-5,7.034394413796005e-7,0.008404996342209177,2.548383792538424e-16,3.479729185855636e-26,2.18138502570809e-14,1.5069925167656563e-20,8.93169433010401e-5,6.753355755847897e-11,2.6010074197467832e-17,0.006808794246375414,0.015524038084229991,0.0033316158667353875,4.1412769933766576e-9,1.119601975139083e-8,7.559367078116308e-19,5.705891562981909e-5,6.308428195608465e-16,3.4745555597840907e-13,1.224923848252707e-7,0.03534583284644874,1.5716220023986023,5.269817459933271e-10,8.776349883342532e-5,2.4917418160720985,0.0,7.983289286433462e-17,0.0,7.429653625350899e-21,4.844101807957975e-19,0.0,1.6546208374858904,2.5657057033006536,2.0961234404767697e-8,7.380805049924101e-5,1.586968922122161e-22,8.266436093541284e-8,8.753116738037351e-12,1.2195647243802856e-26,0.0009201426383921881,1.941522501643083e-18,0.0017229490501849104,0.2826356265309425,1.4475584701790264e-8,0.00042981147795449293,4.273669894669834e-11,3.6663040047219445e-21,8.816503329461674e-6,1.3725122594149416e-29,0.0,2.5681627347542333e-19,1.2226010043758012e-17,0.08793256146206718,1.0728413588300978e-5,2.6511071137451614e-10,1.980781459477031,6.139023508546898e-16,2.4076499032827612e-26,0.03175900928202348,2.9241740567587254e-17,7.825911475337365e-16,1.6039206414441578e-35,0.0,1.2675988300118015e-16,7.675796191110378e-10,0.011656350565833648,0.04393637095826663,0.0007543226464135699,6.287772723570363e-17,1.9181057998947197,7.828845040406147e-5,0.500714400929577,3.2534268859025615e-8,7.852436082012828e-14,4.4195656158118494e-17,4.4584794470743056e-29,4.969537180316826e-13,0.576529339408264,1.6372370679898766e-26,1.109400258602265e-17,6.62640054798711e-28,1.273911772901177e-31,1.5394437533434218e-10,0.0,0.014735834662354244,3.651645006533158e-10,3.979509819465405e-5,2.3150105660709385e-39,1.8641743339725036e-7,3.8776807355949855e-9,0.30976906874411647,7.932372134994561e-19,8.0975523067396e-8,3.644907155727798e-6,1.509933405494981e-5,3.332920899680684e-11,1.7495584863919794e-24,4.895307064530056e-6,3.3314821367600426e-17,7.800161548153639e-17,0.0,7.848249382076479e-13,0.0,1.31481293158009e-7,1.7768750203840627e-16,3.473645690701424e-24,5.978152432118037e-20,5.86469985697935e-27,1.256151310841047e-9,2.8387278621116633e-14,3.15990223377492,0.5506367812355931,2.559354160651854e-7,0.0,0.0,5.452649363710757e-8,0.735683928499445,2.920756285692865e-17,8.908220845831972e-9,2.8786357228217068e-5,0.0,9.77897963999814e-24,2.008858384232894e-13,1.1403121947388402e-8,0.8041113899317307,6.3228879698209676e-18,7.890872953169221e-19,0.00016441317026375166,8.094143352969598e-14,1.1946759024497826e-17,1.9601453694496767e-25,0.6304908816648266,4.369560491675336e-14,2.528855416867935e-15,4.061103417329315e-26,1.2280287451650833,0.0,8.766184395217386e-6,2.06094101030511e-14,3.1828692699606605e-24,4.49803697902969e-18,0.0,2.8497929710839587e-15,8.095600935923713e-12,0.19377633121480378,0.0,5.168269705274811e-8,6.378265923343303e-7,2.1442114696166927e-14,6.898930183147639e-16,7.421270366594725e-27,1.2861954190047618e-8,0.8410721878405065,0.0,3.87979586939733e-26,5.2496412892431745e-6,2.0357300568858174e-9,5.191457217987486e-5,1.5177524239995746,3.5945569819392475e-25,1.9286382027036664e-5,0.011120309105875983,9.199136222552447e-6,0.03996628208048075,0.05090194569635317,0.0035582371517462667,1.5024147056174275e-13,1.0630358538531204e-11,2.900515205483572,0.001782477472742686,2.784322734488345e-25,3.325899955416512e-18,0.014743784707387247,4.452568315510329e-10,3.812157344760258e-8,2.692850538286592e-16,4.22428678599369e-8,4.84515313336584e-18,0.8589285808370297,4.8787613763089076e-12,1.8210832944695702e-9,3.594796323334635e-19,5.990430006227017e-15,1.1790006338900355e-13,1.2585375848582571e-8,2.7458267557906166e-15,0.11129067538888811,8.793272879045761e-20,7.035874125781961e-8,3.5374903254582617e-13,1.1503876783496371e-23,4.019959412310817e-9,0.2135787316643654,5.627818650278859e-10,1.7911725928589506,8.37412325294626e-26,6.300975723077678e-14,4.1850599651289084e-14,4.178206015400285e-14,0.7254666705624967,3.601734775251844e-11,8.899207338710126e-5,5.91705884182975e-23,1.8527755619613951e-6,6.0315060748401814e-5,8.552137060447623e-20,6.5729840278871e-13,0.0,0.9368677434941055,1.0663510752757912e-18,6.851926629729184e-9,3.021959996412366e-21,5.911002586660302e-11,7.752989154909977e-11,1.8047366736756313e-19,0.7356141693689415,0.5850352002743184,1.3296341197109391,1.0983858593244598e-20,8.588916617837184e-13,2.016926216113928e-5,4.377403975514684e-7,2.218560307738519e-6,4.873357389583869e-15,2.1347432805206065e-9,0.629682369846433,1.060344711928012e-5,1.4596327148140569,1.1039712241122808e-33,2.0348684587799295e-24,3.6567962036992736e-5,1.968129317359621e-9,2.3884628897344937,5.482569507970855e-7,1.4742186361851515e-22,2.498500033804883e-15,2.015614026195503e-9,1.717459981434517e-19,2.8694648935712715e-22,1.403058803386767e-14,1.2609136757294746e-15,4.197202636395356e-21,1.6341426221841952e-7,1.069821544838273,1.009752012565744e-10,2.433804454209833e-6,4.464732289228429e-31,3.031357764921817e-19,1.302879665161438e-8,1.1362364986465995e-21,1.4185258882957595e-8,0.002863210975877246,2.360997580857925e-6,2.3243316163319887e-24,2.647546947690367e-22,3.034449029280262e-10,7.078287252558459e-13,7.542506278309269e-22,2.2584985876263057e-9,0.2704060035961501,2.204112125085614e-13,0.0679692288024833,6.03032514525842e-5,6.57545747290141e-17,3.8834746492905136e-11,1.0941757813983998e-9,0.10281112581319854,5.8248644465667975e-19,0.0007140194240811833,6.996123976704096e-18,0.0,6.820850317723948e-17,0.019521566929573037,7.473795690245466e-27,4.6276372760920024e-37,9.813215159187102e-16,2.0467895492760592e-22,4.060305850138818e-14,3.586057555990448e-20,1.0816952069824828e-22,0.7782227430623013,0.0006672236127762452,5.1822725654577775e-18,0.0,2.2042016414136394e-12,0.0,0.0597917859654829,5.62147909111712e-16,7.543445965609208e-30,0.0006397336247930208,7.490099882339087e-11,7.234452945611764e-11,4.723605381466527e-12,0.019985991463165566,3.336189267616111e-10,6.262515646674777e-21,0.0013279638119669838,2.456538161146371e-10,4.055629198236098e-11,2.084237625863362e-7,0.21581820392866893,3.131232006536626e-18,0.03016368039513528,0.0,1.6164072386405171e-19,0.0008766030771369317,1.3059232741656905e-24,1.5987171552303275e-8,3.3728205560963434e-6,1.3203619063883222e-11,1.1821576098277523e-21,0.01647916123267309,3.0897748608780034e-30,1.0122074481756012e-8,0.27404276226242885,3.7124028891484793e-17,0.0006683396445847534,0.43149877228986605,2.7328704565699574e-22,0.3308036595818555,0.1906504219920159,3.7860375645666464e-10,0.15766839212951622,3.1446751356295684,1.738935470638184,0.05836029298087272,0.02332482582110687,5.682808555065785e-7,4.148009874779846e-12,8.992968342488712e-6,0.9423729932210128,0.9445800344664383,2.442223035663072e-21,1.5118008451980127,7.443497317643061e-20,2.2121359432249965e-16,0.0,5.957308635801262e-25,0.0,1.3985736872404267e-7,0.06672534499437797,0.0002448171525466843,1.8307923313413756e-9,6.595320099243075e-19,4.246753221962003e-5,3.9255204040314773e-16,9.05729934001338e-7,2.275272215898106e-11,1.2397736054179302e-18,1.2879271326373626e-21,1.2781692702364138e-23,5.2298359754625426e-8,4.296068808344774e-14,4.2669499752542827e-16,5.430894413311065e-15,0.0009250000494463791,9.869774448577611e-8,1.6757824740489462e-26,6.635831534534133e-19,0.0,5.976926657200979e-13,8.68450756347902e-18,12.170325374006145,0.016420557887876913,1.8913131869806158e-29,6.351350049644758e-17,5.21181253153178e-30,0.06439086847174769,5.845459997241584e-10,1.681299612709274e-25,0.00023243300655459073,5.502944208077951e-18,0.33442684869834943,8.90349614995585e-6,0.0,4.354047338733913e-9,1.3156499551831358e-25,1.2650965317454379e-14,0.4213104388888041,0.0,1.6005345954764797e-17,2.534873572952016e-29,9.876298849026344e-19,4.985571693588184e-5,5.3635334271649564e-20,3.5553824165899885e-8,3.7223621767510644,1.720113224614432e-13,0.0025273490461055754,4.77157946720329e-20,4.4700645918550264e-18,4.31143557258771e-5,0.19472613060990365,4.523890421953402e-23,1.081315160902888,2.209022951720521e-19,0.013226441865591014,1.3725079983153786e-16,9.103129879711581e-12,6.953164887085386e-14,11.994496060361621,3.0996690039684913,0.0,8.648295015900331e-21,3.275719083584893e-32,2.5630805604980994e-9,7.011742745551441e-11,0.028764478261819215,1.6517035267401115e-29,0.0008587900839112445,1.7669580342008537e-9,1.1048976298917155,0.0,3.574594698507961e-7,2.0498808904259067e-14,0.21648543654836894,1.9554773509218857e-17,0.0,1.135517469419596,6.22668566322117e-16,0.014545646643079634,1.067630270408044e-19,7.573518922443951e-12,1.8026048651243484e-9,1.1082377943443623e-28,4.75017358324981e-7,1.972770324894992e-24,0.055550075546220226,0.0,2.8838072634104272e-36,1.5022324744862738,1.0158064995599956e-18,0.009781103709067483,1.5838016484618047e-19,7.0374459688724935e-6,0.08607346395062948,1.8876304006740436e-23,3.062422382020834e-27,5.461708972140829e-10,0.0,2.387449255498942e-10,5.756215835135601e-26,9.205704900151466e-11,0.02987117132723753,1.2280937424937654e-17,0.0,3.914540490823769e-10,1.1715184275077745e-30,0.0827468295591913,1.7718698725032417e-9,1.0551975750132212e-8,3.350287369641409e-25,5.043609112338943e-36,1.4085097896865855e-10,1.8692677335020402e-14,0.0,9.919535007019254e-13,1.502944049659447e-13,4.17675459830013e-19,0.0,2.6991013063059564e-16,2.2343222192389582,2.4927270469133157e-10,3.010513820884572e-12,5.15719567414042e-22,0.025195304268338693,0.0,3.866595461251168,0.0,7.063901222706602e-29,1.2178100710878806e-19,1.6015688856512422e-12,1.0581201486289655e-14,0.004543745491253596,0.0,2.945646037983785e-13,1.7410799023733692e-12,0.0403247920378557,0.13678526740525832,1.7000150575914898e-25,1.8216555087490383,3.521957283924083e-16,6.714615389517303e-13,0.668756351151892,0.0,1.716243663456336e-36,1.308919111110425,2.943370003444631e-7,3.621458749274205e-14,0.000999591305541382,1.3111749264022654e-9,5.0034379345283835e-17,0.00017068080160407824,1.6624448414047754e-12,0.004062583090710064,9.413736808887745e-17,2.0840263656823084e-10,0.0006784880975989199,1.0916900584691915e-21,9.576606180712908e-6,8.93665708719694e-15,1.486642848420121e-13,1.4021120841729914e-8,3.9334572579479394e-20,2.9726305909338747e-12,2.080043988553404e-9,0.9247093579166699,9.731212450182028e-5,0.012707680473072663,0.005415435768137562,8.366360881339625e-18,2.652606389395968e-20,1.4318359624301864e-20,4.5700016790121125e-26,9.774245746210037e-29,4.741005880891589e-10,0.0016046369559184353,3.982479054391614e-15,4.311201534790668e-12,2.815824634922637e-35,2.206355315599609,1.2944073260921892e-40,6.320652681770156e-20,3.4946294471907586e-16,2.8477991437632063e-16,3.753884424811201e-15,3.7791581642132086e-7,2.5820423970596713,1.327161690650872e-9,6.462227410008031e-24,3.1058631963080504e-21,1.1707028897875243e-7,0.26310890046349916,1.3772059890944901e-19,7.729247340512065e-5,2.004421807280143e-11,0.8136515196748538,1.2014406333270795e-19,2.8424491034339866e-18,2.490915665943636e-16,4.43625641186028e-8,1.4030512137644585e-9,1.3031767474592094e-15,0.00011314628390000671,8.686032321363246e-5,0.0,1.741261288704944e-6,5.268040654066881e-17,6.888802030811204e-26,8.080662702555226e-22,8.418062025812733e-16,4.099016341568085e-8,9.621828896924826e-16,4.403190561929361e-12,4.9491816840061616e-23,0.23314391141931898,0.01664971490823296,0.0037657307366303046,7.120035106612359e-23,1.1849607560766432e-6,0.3124076495871281,0.009553258272722102,1.138034823863336e-18,0.9527498150893067,1.2429587367845686e-9,7.390713623965268e-16,0.13113445589875725,7.275512168699025e-10,1.53167270146805e-10,1.1494003667869525e-12,0.03780645878699778,0.3086451169564219,9.464429091219296e-23,0.003094954585372279,2.9370700030879933e-7,4.8668717849016884e-12,3.7656200200493695e-23,0.6226157547818948,7.443718500510287e-9,0.4279678210941929,9.659704110934341e-13,7.789048951194387e-16,0.18367601043199056,8.230351731320435e-10,4.833236477638904e-8,8.339914401939595e-23,0.021901088941435682,5.008404305552715e-14,0.07885140901851602,0.0,7.015518354880853e-22,9.778268001937029e-11,0.022975139481577894,6.943723269498691e-7,1.7046125674204455,0.0,2.6982495211282975e-7,1.072489219893245,3.600286608505027e-9,1.1567984441915355e-34,4.690337980898603e-14,0.0,3.2866064537664835e-19,1.684153924308171e-14,1.8018304162791805e-14,5.335285929988811e-21,3.1596787077597555e-29,1.749929059667478e-9,1.7037695727348085e-20,3.156723619799937e-5,8.019395090805523e-16,1.778978313078752,1.5935187638409292e-7,0.44825779465879295,4.014038131700076e-13,2.7289607046982382e-14,0.15312930083131596,0.0,3.988426719380182e-12,4.757885063982477e-17,0.3819112252181082,3.3709346064251114e-28,3.8125290228140263,0.0002626722508758243,0.16673639249538083,0.0032516168614169457,0.026991410880218537,1.5551860462506864e-14,0.006054969564880519,3.482785182890885e-21,1.3940124155767694e-19,2.1381962423177744e-30,1.4023271757802623e-18,0.10452125484032662,0.00972015962915723,0.048761353001168094,2.242208105882384e-6,4.0312253778759755e-16,4.876899609507045e-9,3.0088557084877757e-10,8.679766301951115e-11,2.137711891499085e-15,2.0799805613397264e-22,8.079388351254953e-9,3.0413739016485475,6.359555762491362e-11,1.3132557883859597e-16,5.33561152290344e-11,8.539943889140525e-27,0.005687017433651779,2.9554506129044216e-21,5.596470915283195e-27,6.081630441212011e-12,2.1918110695141305e-6,2.424863589983223e-16,4.442349360135556e-14,2.918421128301546e-14,1.3794003221015482e-12,1.0673066627368263e-13,7.601399021817287e-8,4.613984839823185e-28,1.248399809843696e-34,6.5610218642982484e-21,1.296516109545727e-25,1.3875592346056762e-25,3.637220266055576e-25,1.5729509147026578e-20,4.1002197634212273e-10,3.4000313035685236e-5,8.083002863821527e-14,3.9044260235156077e-20,8.132686336253392e-16,0.0,2.901319936923834e-5,2.2593253522189408e-13,7.275101914731949e-25,0.31693307490502215,1.878058250902818e-8,2.442945693241269e-7,1.302961017712119,4.452876748552531e-11,3.9964917596829276e-17,6.829367994492391e-15,0.013269183282587329,0.003923940459943697,8.11125347265503e-6,0.16769362284238223,1.0276855358810897e-5,6.736219297267704e-25,2.49356443763177e-23,6.489679409972144e-7,9.35409765762346e-25,2.2556851126203308e-13,1.2523462059904477e-33,1.8154391808165242e-9,1.042141337779534e-12,1.846939984475381e-10,9.924442159273885e-25,3.2240873106007867e-31,0.21309949689058733,1.5779668993998593e-6,5.388937850065574e-24,1.8388953754660706e-13,0.0,1.0471548744258892,9.910262552427301e-14,3.711333426662149e-6,1.0105352289943362e-5,3.2493939008855413e-12,8.453363573575879e-10,7.41213587902677e-15,1.8805736764985737e-17,1.4770980885605152e-9,0.00048015743462353144,8.682319170793037e-17,4.103717928670516e-15,2.0715188105674337e-9],"k":[5.0,9.0,1.0,8.0,8.0,6.0,9.0,1.0,7.0,1.0,4.0,4.0,1.0,2.0,9.0,1.0,4.0,1.0,6.0,2.0,1.0,5.0,4.0,8.0,3.0,4.0,2.0,8.0,1.0,4.0,9.0,3.0,4.0,8.0,4.0,0.0,6.0,8.0,3.0,4.0,0.0,2.0,7.0,6.0,5.0,1.0,4.0,1.0,8.0,7.0,5.0,7.0,3.0,5.0,2.0,1.0,5.0,7.0,2.0,6.0,4.0,6.0,5.0,0.0,2.0,6.0,8.0,2.0,5.0,1.0,5.0,8.0,3.0,6.0,10.0,8.0,3.0,3.0,7.0,3.0,3.0,2.0,4.0,3.0,2.0,5.0,8.0,3.0,0.0,7.0,0.0,2.0,8.0,2.0,10.0,6.0,10.0,2.0,6.0,10.0,6.0,6.0,7.0,9.0,6.0,1.0,5.0,8.0,3.0,0.0,2.0,1.0,9.0,8.0,2.0,3.0,7.0,8.0,4.0,1.0,6.0,4.0,3.0,2.0,9.0,5.0,4.0,3.0,8.0,3.0,1.0,2.0,4.0,5.0,3.0,1.0,5.0,7.0,1.0,2.0,5.0,3.0,9.0,1.0,5.0,4.0,7.0,2.0,5.0,7.0,9.0,3.0,8.0,10.0,9.0,7.0,9.0,5.0,3.0,2.0,4.0,2.0,0.0,10.0,3.0,7.0,4.0,6.0,9.0,4.0,2.0,5.0,3.0,8.0,5.0,0.0,10.0,3.0,9.0,4.0,9.0,9.0,9.0,2.0,7.0,2.0,7.0,3.0,4.0,3.0,9.0,1.0,5.0,0.0,8.0,6.0,4.0,2.0,10.0,2.0,6.0,0.0,5.0,7.0,2.0,4.0,5.0,10.0,5.0,1.0,5.0,7.0,1.0,1.0,6.0,4.0,2.0,9.0,8.0,0.0,8.0,5.0,7.0,4.0,3.0,2.0,1.0,1.0,7.0,9.0,4.0,1.0,7.0,0.0,0.0,3.0,0.0,3.0,10.0,4.0,9.0,5.0,1.0,2.0,5.0,9.0,1.0,3.0,1.0,5.0,4.0,3.0,2.0,2.0,5.0,6.0,7.0,9.0,6.0,7.0,0.0,3.0,5.0,2.0,4.0,5.0,7.0,0.0,4.0,5.0,8.0,2.0,6.0,7.0,1.0,9.0,8.0,6.0,6.0,3.0,7.0,2.0,5.0,6.0,10.0,9.0,10.0,6.0,6.0,3.0,6.0,8.0,8.0,4.0,3.0,4.0,10.0,4.0,1.0,2.0,4.0,2.0,1.0,4.0,10.0,9.0,6.0,6.0,0.0,4.0,0.0,7.0,1.0,0.0,8.0,9.0,9.0,8.0,8.0,10.0,3.0,7.0,7.0,8.0,6.0,3.0,5.0,2.0,8.0,3.0,3.0,3.0,0.0,1.0,6.0,10.0,2.0,8.0,5.0,8.0,2.0,6.0,7.0,3.0,1.0,0.0,3.0,4.0,9.0,8.0,9.0,8.0,5.0,10.0,4.0,7.0,4.0,5.0,6.0,5.0,1.0,1.0,5.0,1.0,2.0,3.0,0.0,7.0,5.0,4.0,1.0,9.0,3.0,5.0,4.0,10.0,3.0,2.0,3.0,5.0,6.0,3.0,3.0,0.0,1.0,0.0,8.0,1.0,3.0,7.0,2.0,9.0,6.0,3.0,6.0,6.0,0.0,0.0,2.0,6.0,1.0,2.0,9.0,0.0,6.0,7.0,8.0,3.0,4.0,3.0,8.0,4.0,7.0,8.0,4.0,8.0,2.0,3.0,4.0,0.0,3.0,8.0,1.0,5.0,0.0,4.0,9.0,10.0,0.0,8.0,7.0,3.0,7.0,3.0,2.0,3.0,0.0,1.0,5.0,7.0,8.0,8.0,6.0,4.0,10.0,4.0,1.0,9.0,1.0,3.0,6.0,6.0,6.0,5.0,1.0,4.0,3.0,6.0,4.0,4.0,9.0,3.0,8.0,8.0,1.0,7.0,4.0,9.0,1.0,8.0,9.0,4.0,9.0,1.0,10.0,7.0,4.0,3.0,1.0,4.0,2.0,10.0,9.0,1.0,4.0,7.0,1.0,6.0,8.0,6.0,0.0,9.0,3.0,8.0,8.0,5.0,3.0,3.0,7.0,8.0,4.0,9.0,9.0,9.0,5.0,3.0,5.0,6.0,4.0,2.0,9.0,5.0,1.0,8.0,5.0,7.0,2.0,5.0,9.0,7.0,6.0,4.0,9.0,3.0,2.0,8.0,5.0,8.0,5.0,1.0,9.0,5.0,7.0,7.0,10.0,4.0,5.0,8.0,5.0,10.0,3.0,5.0,9.0,2.0,1.0,2.0,7.0,5.0,1.0,4.0,1.0,1.0,9.0,0.0,4.0,5.0,9.0,1.0,3.0,4.0,2.0,3.0,9.0,6.0,2.0,9.0,0.0,8.0,0.0,10.0,2.0,3.0,5.0,1.0,5.0,4.0,6.0,6.0,7.0,1.0,8.0,2.0,1.0,5.0,6.0,4.0,0.0,2.0,9.0,1.0,5.0,8.0,8.0,2.0,8.0,3.0,8.0,9.0,8.0,5.0,3.0,3.0,9.0,6.0,6.0,10.0,2.0,3.0,7.0,4.0,6.0,1.0,5.0,5.0,7.0,6.0,8.0,7.0,4.0,0.0,5.0,0.0,10.0,5.0,4.0,4.0,6.0,5.0,6.0,3.0,1.0,6.0,4.0,2.0,5.0,8.0,4.0,9.0,3.0,3.0,7.0,4.0,0.0,4.0,8.0,1.0,10.0,1.0,10.0,3.0,1.0,6.0,6.0,9.0,7.0,2.0,6.0,0.0,4.0,9.0,9.0,1.0,0.0,8.0,6.0,1.0,7.0,8.0,7.0,3.0,2.0,10.0,10.0,5.0,8.0,4.0,7.0,5.0,1.0,10.0,3.0,7.0,1.0,1.0,5.0,0.0,1.0,3.0,6.0,9.0,9.0,5.0,3.0,4.0,5.0,0.0,7.0,9.0,9.0,3.0,0.0,4.0,5.0,7.0,2.0,4.0,9.0,4.0,9.0,1.0,9.0,0.0,1.0,8.0,10.0,1.0,5.0,4.0,6.0,5.0,4.0,7.0,0.0,9.0,8.0,6.0,8.0,2.0,0.0,3.0,2.0,3.0,1.0,9.0,4.0,3.0,9.0,7.0,0.0,3.0,5.0,9.0,0.0,5.0,9.0,4.0,1.0,6.0,7.0,0.0,2.0,0.0,1.0,5.0,9.0,7.0,3.0,0.0,4.0,7.0,4.0,10.0,2.0,7.0,2.0,10.0,1.0,0.0,3.0,10.0,8.0,4.0,4.0,5.0,4.0,4.0,8.0,9.0,4.0,9.0,9.0,1.0,1.0,3.0,5.0,1.0,2.0,3.0,2.0,10.0,3.0,7.0,6.0,5.0,6.0,9.0,1.0,7.0,5.0,9.0,9.0,5.0,2.0,2.0,1.0,2.0,2.0,4.0,5.0,1.0,7.0,8.0,1.0,8.0,8.0,10.0,6.0,6.0,5.0,8.0,7.0,1.0,5.0,9.0,10.0,9.0,4.0,4.0,0.0,8.0,7.0,8.0,2.0,1.0,7.0,9.0,6.0,6.0,5.0,9.0,7.0,4.0,7.0,5.0,2.0,9.0,7.0,9.0,1.0,5.0,6.0,4.0,1.0,7.0,5.0,4.0,7.0,10.0,6.0,2.0,8.0,4.0,8.0,5.0,9.0,10.0,7.0,1.0,7.0,6.0,9.0,9.0,0.0,2.0,1.0,4.0,6.0,10.0,0.0,6.0,9.0,5.0,5.0,1.0,0.0,1.0,9.0,8.0,3.0,2.0,1.0,3.0,3.0,4.0,10.0,3.0,8.0,8.0,4.0,10.0,0.0,4.0,3.0,8.0,4.0,2.0,6.0,9.0,1.0,7.0,3.0,2.0,7.0,4.0,2.0,5.0,10.0,7.0,3.0,10.0,8.0,7.0,1.0,3.0,8.0,7.0,8.0,6.0,5.0,1.0,6.0,2.0,10.0,2.0,1.0,9.0,4.0,5.0,4.0,7.0,1.0,1.0,3.0,3.0,3.0,7.0,5.0,7.0,1.0,2.0,2.0,9.0,10.0,3.0,6.0,0.0,4.0,9.0,1.0,6.0,7.0,5.0,9.0,8.0,4.0,10.0,10.0,4.0,4.0,7.0,4.0,6.0,6.0,6.0,3.0,8.0,1.0,10.0,9.0,2.0,5.0,4.0,4.0,3.0,1.0,4.0,0.0,1.0,2.0,6.0,5.0,5.0,4.0,8.0,5.0,6.0,9.0,4.0,9.0,1.0],"x":[0.815943587017095,4.7929181001795005,1.7947941929962952,3.35711111736697,1.8144866421672134,1.9501929119061423,1.7788751098032918,1.0157381824678935,3.6972327463209584,0.5766409912595127,2.2145385191378173,4.431550192006956,3.2485187242988065,2.52624865381632,2.9026068001908802,3.0476463927596664,1.686727536915964,3.720052024996879,3.010469253983815,0.49834528574878023,2.6275403599757965,1.0218390024008328,3.7187968438032315,2.2404048096246343,3.1893682435634307,4.431915541622022,4.807827506906516,3.6219844521873936,2.7083685667955315,3.251882852865319,1.346279905980976,0.3590822846796937,0.45259555287721187,0.05394780622391182,2.161340612095114,0.38701055939215245,1.8093467331819835,3.450005331921484,1.0717864412193678,4.199172499261593,0.7628981544107605,0.3025369136519396,3.016317239634916,4.028053943901801,3.607708050338505,0.4536252611669045,0.5502547179527062,1.4093605662918385,2.0440231644453877,0.8932546114157569,4.707801032180727,3.5567374648850105,4.249530698598775,0.19024744292785556,0.9681178865702611,4.065871627164832,3.439757704692865,4.4651535670317255,1.8174355024382427,0.9553050891223547,2.0877508094745236,2.4053401611363014,1.9344190094288682,0.1007706950120657,2.274574433230537,4.3923083803016185,4.904195797355092,0.7205948015540375,2.9076973705660834,4.641216263161204,2.665015536871691,4.787767027477823,0.4522263632251766,4.205018510202544,4.569671301595427,4.679983425769038,3.2044559222339353,0.1405633887745239,1.5805189395794317,4.177657174879336,1.194068695549787,3.0663662786814294,3.3084991816856424,1.0818839070210873,4.717869463987946,0.3142130089796802,1.1470607649695352,1.870345054226461,1.1449977046108772,0.7296069538375094,2.333589587448545,1.1137462569981615,3.681470707978246,1.293334522338856,3.47461905986973,3.590153210051877,4.784247207883333,2.895590325334253,4.273167971497585,3.383540789624786,0.2979741453919982,4.655264627928063,4.949706144000105,2.8661113149138617,4.300729383069944,0.1868050738628091,1.5952656685184419,3.509861831511736,0.5503547805156817,3.963223332464766,2.855936169955906,2.0311753530708088,2.488224275095805,0.7088013693908513,1.944855615779899,0.3536282275041469,1.3035459734287491,1.7836492287291905,3.8016810283182743,2.328342532104517,4.195994569887023,4.60909964348677,1.953673390064108,0.904702564580141,4.88695724165547,2.106063536021395,1.9701634423564507,1.7785070020765192,1.3062611151377745,2.16095051097124,0.21025989169579984,4.487446494807255,0.4385004919368529,2.104696767147506,4.1912172059367405,4.264263755828312,0.3893433456727402,2.152480192727034,3.3779393612142163,1.3666210727728267,3.749458293082486,3.3230920447660828,3.3759630051313083,4.868515299077506,3.315153540019674,4.233051467072318,4.195268048857663,4.2869892601148765,2.4518709867685673,1.5678234129174018,4.57259179174263,4.503071653522558,4.806971564634725,0.6253964648650778,3.5628803555658384,1.7187699444109328,1.5998913467646947,3.744645928477123,1.0711510803352886,3.611961066707191,2.802875265857858,3.5356927368104896,1.9907569851673201,2.344241279411076,0.09158178076790424,2.3169320984647426,4.304318452101937,0.5329564807957765,0.91377112525728,2.126667396647587,4.981352977811838,4.674536877659036,3.2450282223749127,3.8070079022743153,0.9532768640815004,3.090090027438622,0.47278830923140225,4.266659204134897,1.0612123047926514,3.30642831429238,2.896035128531873,1.6428606616194152,0.08907358352835737,1.3746541774777365,2.0871393417576956,3.3880861536667553,1.9543009774250952,2.2535827109853015,4.969249325482611,3.7460967121738262,2.0348816096691538,2.3108017443704156,0.4564630578104589,2.0995326825965686,4.153618076500059,3.8801009096591788,4.684232965001422,2.9294443207737606,1.216436030748912,3.537396576969698,3.0929349552846785,2.267471891879025,0.5352111569516838,3.586994161097581,2.8413659079773113,3.3490812918899913,1.1086204453708215,2.2460457098071176,4.267600703802873,3.5269668085196004,4.65220915770308,4.469973658662917,4.486225026021318,4.049297948141954,2.5543375716609074,0.5082588391408327,2.638968148490053,4.3245164748472735,4.147850977554147,2.6927003264900162,4.272372068670761,3.870883681305697,4.792404059302374,4.505776591524574,1.791691284613075,3.4974490749516054,3.902191640770334,3.1133022179826564,0.4516379679071414,2.7324583919920045,2.204687507370412,4.786786257105296,2.1718524992119272,3.9642224313650853,4.287351763261694,2.7055951684606825,2.4471139384052476,1.3809688089077787,0.002485443742015203,1.8460088068534108,2.3856461506467608,4.515317193581623,4.967850308472651,0.13776358061322713,4.747926556330561,3.0064526068282946,2.618281285949211,3.926348414280778,3.0268989577498076,4.55316285620694,0.8297215797381285,1.4857467905600519,3.4813992221612358,1.704828851123379,1.4399270735619007,4.900352550404974,0.14544531227314805,1.9420477551118798,4.749572424154166,2.604366531557709,3.4716366075247596,3.6952976773556845,0.8477690756790479,2.5556395962667002,3.459058482255503,3.779461067180583,4.099873533147224,3.1855659037858364,0.5053864624322024,1.0805810448656827,4.6623842395442905,1.7014115482747638,1.9640827194159483,2.730654167563047,2.4651754935788617,1.8121206783330246,1.0110844760480286,1.3715998957123365,3.7710949262140447,2.895741624542664,1.2279678024538965,0.20610136963225667,3.5551438672881277,1.8460895806755284,3.580307773506164,1.6618410851015963,3.4234880277423,4.171005286975747,2.987647032031667,4.636095031513471,1.1640450723340956,2.7954415684510647,4.487374041897495,1.13961028153296,0.7183409195706913,1.1300188660994182,3.4135005830891174,1.6415806947273048,3.453276298936727,0.8402808352120639,4.359357614414147,1.815440714667691,1.8159856185079393,0.8678608651315456,0.6983405309150092,3.6972248833993726,1.4098642950637152,0.28060283188739543,1.0239332520371525,3.1004678482826895,2.4425722511920034,3.84371215809579,3.5938481641025444,1.3049211389128912,0.6610843810036726,0.36703873793929254,3.3823650399697036,2.6071888129033436,4.986968057628433,2.0122930322730603,2.1590141392922235,4.32649725538134,1.3774301532551558,3.9658475487341605,0.03752531073287768,0.554741562255957,2.381378589800044,0.6824134734830378,3.2172219705869844,2.9666288355534642,1.4806283380865348,4.2610956095899155,2.1819847619973243,4.08656897826331,4.252422533048698,1.0463875951618784,1.0379582987346037,3.767752756924838,0.3830749510312914,4.4187864569144715,3.5435730877567453,0.8601410545277488,3.7393118372242515,3.528953532805131,4.616335844973386,0.989280296829137,3.0710062349090483,2.5655155786064867,1.6541976252040258,1.1249357808309213,2.342030149878098,3.813918695560512,0.39114033318575325,0.07864227250342637,0.47211073542585136,2.1905923351990575,4.119139020164453,2.7100960605433677,4.762603475911716,2.8696117680072297,0.2703291762826221,4.688613131706982,3.9709046325084585,4.775517254493723,4.587966867139178,2.3275531901961513,3.569528959755565,1.1348012930783302,2.0477526381787934,1.6526849636328578,4.720203982268716,2.741441391777033,2.069688182766419,0.5374587653368479,4.788025634108271,2.9922906284192488,1.0863824814750511,1.459547198061435,1.8740843312841349,3.703738245607134,1.4655637948087041,4.655113412499626,2.6852207947865283,0.6351504841193545,2.0868253994595767,4.1969334643886915,2.75541652221178,3.251938999290258,3.380243127860083,3.3773177185116476,4.097846415467141,2.784849835771648,3.9319672866355706,0.20195084274953645,0.830098822208335,2.8706124098362484,3.9998041054778466,0.8568338023613742,1.9224195383127185,0.5826114700928864,2.062365582906014,2.119796701190962,2.0685993064318566,1.0443804972969084,4.281568855227312,4.428364061704272,2.1468728020959293,0.02644708235575499,4.7771283127288875,2.923530591325888,1.6502266648357278,2.5947972885456725,3.736676082469214,4.623060547710245,0.4506315040084208,3.315619563940142,3.1418190595320636,4.581179060629811,0.3911170860068858,0.2069971134117432,1.0321509402048545,3.2818845356940587,4.449865624253051,3.5958229261151473,2.4975106884707343,3.0052010493514283,4.734792581563921,1.0246336190740257,2.845377551955882,2.6780972544373096,2.1708192412883545,2.8519412115071385,3.541425163966246,3.9963067406287465,1.6044057506564613,0.36319930552481394,0.09047841122757139,4.64253526032012,1.878257239247202,2.1633740181815444,0.03631533882516802,0.5305033502508583,3.823489360024628,1.347204454450558,1.7700104452362975,1.1699897474295229,0.32677935887390097,0.9518435406271353,0.4505858691292919,3.2540929261100713,2.4703957876657743,0.33217414157544534,1.1591130338172884,3.731248670688788,2.4974072261781477,1.0473026294970744,1.9587788603352907,2.425341670473702,3.2339596297210473,2.680768223643776,4.994388450509174,0.031866316560286156,4.397684154320956,2.7397798572254874,4.197570455127767,4.377689873966481,3.5186137543431273,2.322196244128051,3.4788805451067404,1.1386315569369987,4.175239554462253,1.676134169008372,4.530968607364002,3.527061338282711,3.0109601494154257,0.9998630459698521,3.212955954876483,0.30154366516357944,3.29877507301111,3.6633783416156804,1.9642921070594321,4.859839466584352,0.7140244819375174,1.5745510939775909,1.335202350747955,4.554915904462693,0.8219272486419527,1.7733012647600899,4.0330137101246555,2.9495340992301236,2.5002731643952747,0.30185144264846975,3.687502307439694,2.0193641105827718,3.976583304121577,2.7095559058276084,2.689391280339896,4.431945763861357,0.6651632856025036,0.6661949513454735,0.07595126440105626,4.686901739824632,3.574210975961243,2.0045629975066337,1.519877840801831,1.1573898637344848,3.6157882100379615,3.0147251800388353,0.6080820034348711,1.6470841168438277,0.6887382875345993,4.76481442868481,4.2241657086930084,2.141650769800032,2.9603004517029397,0.4324208267799279,1.706427126920671,3.832266911288885,3.95274841095985,2.2576700713669506,3.5892213991293143,3.565083352981082,3.016083906224943,3.9082027222206683,3.5091257153468747,2.1688357345487086,0.6005825056482739,2.810584462212403,1.3435548200664682,3.8122557926231107,4.3953182211291235,1.602115487941791,4.2160515428655945,1.9396512884946726,1.7025367155057136,1.9529259327647697,3.783628862518124,4.421487964610071,2.6681503728521117,4.4108588534213835,4.388845881441618,1.7151438325506863,0.24052128724226018,2.8216962752200834,0.4231957164596989,1.0522997598120443,3.7067276378317784,2.796095922055375,1.5805123986774827,0.6770865067985543,3.00021226000873,0.7681507557013878,4.199780017229914,2.124428791434365,4.296728042339986,1.0658971570912656,4.610965884385396,4.523616934346588,3.830470025118281,3.6176166398971246,3.371221834245459,4.834211843749392,4.1472166354170215,0.6893416339221037,0.6806962308068754,4.440504830917698,3.1889169350259294,4.476140649515794,4.217054486935897,0.2973039108371145,2.96681983878282,4.36283281219025,1.7628160441121044,2.444117072675783,3.233067748991454,2.254125101880835,0.04320016002866689,3.652925710363919,4.436993352375179,0.5209277103359067,3.8899766329838803,1.7341076113553167,1.5716130429321962,0.6731441903835444,3.7279002617679424,1.1053027178693897,4.2863063248845465,2.8684270257810516,0.11728593741351379,4.036607582466876,2.255242590142478,2.906086702954486,3.7277961980256293,4.51476195831507,1.0862424767232182,4.274985850992975,3.00477999120261,0.20663785881673835,4.208552324821948,1.556282400857758,0.4069299753802069,4.099654193577383,1.2928887224052321,0.12443096577193447,2.927483831686285,1.6318171001479442,0.04511009454223003,0.25619495485209476,1.446098447119042,0.9515922279883571,1.6022089520493898,1.6444697117215445,1.520076205167098,0.10851440621593378,0.820651486527163,4.725112173555935,0.39251430290497935,4.475786470447684,3.6734894794841555,1.8320234752033537,3.6822542337832997,3.9600024283225634,0.047764359120706645,0.820428009180928,1.1401278164091078,2.2226142219287137,3.2915983060270526,1.1885078681527816,3.46654165032101,1.944339121191102,2.0570096372598745,4.4018845081885525,4.180984778350345,4.740928398231779,2.2095327230803252,3.6019800618807576,3.1329758721954892,3.2250923607087367,0.984463272512186,2.2980305290338396,4.186749221165411,4.55082242758113,4.445443661656553,2.673592701253714,4.638472172824077,0.009766478933528333,1.6737330366735748,4.418248806394434,4.431631015570866,4.85083391678757,0.3193884584521456,2.9424749636032987,3.9160297753166198,2.070602642542876,3.4031132982952137,0.35497354074178755,1.5287798074094605,3.0501630913364854,1.9269597401928518,4.495613683188012,4.193627812688975,0.2335045586856488,2.530811251417815,4.50737189276782,4.476330915935423,2.3607215207616328,2.0699807982284124,3.6672571956046984,0.008588714194284197,0.0987983940941628,2.399774829607848,1.6400976320502325,4.650414920409732,3.8074636447237777,1.6600944367806625,0.029359977454652686,4.572311205566784,0.4776770362030336,4.019144089350327,2.0504681485301335,3.9829760756443813,3.386670183829973,2.1493359059927277,0.01441949571943435,0.27579206654266275,4.059057130239603,4.262130152999509,4.5968903282372775,2.6797145812391454,4.539275249847602,1.6895168840639263,4.669890427284054,1.07273979373256,2.1931139513884523,0.5923645374397113,0.8463257154650727,1.810737920472535,4.588326824327736,1.222410548249252,4.609643719863677,2.682090763700724,0.36808112677087945,3.0343910126353424,1.463321118096953,3.328318870103769,3.4128250939864846,2.876769490840654,4.31339336604159,2.1152963252169386,2.901911890817239,1.1765671986711024,3.9177207561252936,4.79231205249055,0.662585556525942,4.868222392988793,0.6714539876696146,3.543036959282971,1.849827579353206,1.0953769983550754,3.913186835882395,4.907836716147505,2.839827440697266,4.345519421475727,3.002474208838576,4.7652083014219935,3.5443842478643672,1.0598763983183934,2.3871643200401085,3.2352957050135602,2.44504666456245,4.08806376156258,0.7157410602215963,1.8263346406154823,2.60027764934875,3.557878738268989,4.703044827367339,3.355337811715695,4.008064788245761,4.21421626552517,2.46561547789258,2.559298293876769,3.7634393775677855,2.108981928311019,3.3750573064289946,0.387603327104572,2.4021621496000902,2.6873731231684586,4.5173315371187375,1.4853070221243092,2.7795421452824853,0.0937849233132726,2.5785782501770305,4.383762480439584,3.9631713300415394,3.5624060011882817,4.6926036219162786,0.8125109252485307,4.8573368428314865,2.37913740772165,3.1016146323096647,0.6977038976763916,1.5338229794188318,4.961218961900426,0.2910894449585688,2.67578079353206,3.9771338312503266,0.2128107361514331,1.3370006748127938,4.946067398315516,0.8998813970982689,2.2813153838245324,3.6576190263473194,1.0032206574017632,1.9624700940133089,3.0458511406078994,1.5770222583605198,4.03055930490048,1.519142677115921,4.334699784366826,2.589143548989732,2.4042405908292173,4.7902932954663555,0.8677223968210446,2.6202512865492733,2.386710724382932,1.8606779717775501,3.802192662491304,2.5909267302276584,2.2259413886728083,0.7072837053218162,1.2424555293808481,1.2723836886656892,1.0677128086261811,2.826260181891608,3.7298359644987498,3.8174500717698487,4.349344342742214,4.968623318757555,3.406659676454571,1.2351614337843464,3.5421622889788686,3.751290634217389,4.695609669966011,0.1866829571648898,4.81643648453861,3.534662170170555,3.2507826553721086,4.186299147751946,2.9571465325175375,1.079561133074416,0.24503653245299128,2.070277894352693,3.484128226086866,4.126569043315893,2.140787396426397,1.303750534257242,3.7271301040609073,1.7111930253132546,3.1444969812772525,0.24483960437582164,4.716152255985877,4.109021349491017,3.468124896267213,3.4729897773580265,4.094226601780921,3.432540630327976,1.4947657388431346,1.0041633330117028,4.615977478167147,1.9669067299767784,2.9786188311644146,4.23436851793753,3.1192415183812408,2.8580863610941187,2.237039167316175,4.375757898033855,3.2774202982262732,3.622442384706912,0.6536489065084128,1.1850936799650136,1.1385781104802828,3.981695758877449,1.7313679503165214,0.754736597944069,0.5914668533710832,3.6987073082352726,0.6012244971237657,2.474346121295512,3.051349508406873,1.0101149292146805,2.701157637505587,1.8739716952623942,2.0306929481794267,1.1843713858390748,0.6910039892326558,4.7614367876929995,1.2256775770955408,3.2295162122665957,3.3594199269016247,4.8306742805525555,0.3001618398293038,2.027525014650199,0.17221627641544335,3.0837406010979898,4.167968616740293,1.0789493564751718,3.495994071407411,1.6878068772941779,4.907693735400232,0.965676762636376,3.495076556156068,1.5785341651001428,2.6114250096039604,3.3860337172293073,1.5352607085794479,0.6480246221683827,1.7626470884482714,0.7217073995204082,1.3848577096801196,1.563367526029218,0.5332481492889307,2.7530014692755698,4.9620742253675765,2.0177021997489577,0.8722436255847177,3.0873868753705214,4.931276840397941,4.182422366229908,3.4227512640542255,4.7008250535881215,1.8473560588198923,3.2820249984186436,1.3110048841659372,2.5081825776660827,0.4450447052793671,1.703726102288794,1.1090109010297355,2.8302793617832123,2.5261982351433443,1.3674152492437508,0.23092016923492387,2.8483094191928493,3.138203419216099,0.9436221351103491,4.558579746329906,0.11566920222914279,1.4244011482286212,0.8932948871716606,0.4512377813443069,1.5064542051926144,2.6300830550100294,0.6996607834234148,4.720653313375609,3.4815553683675526,4.767915876613882,3.918647011944568,1.0821465787049211,1.6176850731215053,0.8614989824921016,1.9091106319507256,4.1786104756834135,3.18650013472231,1.4624901334556495,1.6493916880977078,3.9469220540006447,3.805558533887737,3.090913389139771,0.31063321273527067,1.985046734601914,1.99692241400369,2.9352574045782465,3.450476772011921,1.8011410455258836,3.2020186216937763,4.798696730585426,2.795819154276651,2.112374097345299,3.405079033214803,3.0963992072019666,3.0842077142861224,1.6392252114512174,1.6711556048360898,2.0249544193545965,4.500323234568119,4.641257758151768,3.534163109631945,4.2198009450681795,4.389817980603511,4.403676442710066,4.187536441723512,2.5817180392563275,2.8169156900868666,3.999953904132992,3.4323389694924678,3.903051770531716,3.2602550447914327,1.846225443053211,2.7887932524761316,4.623100473587951,0.8056567259235536,2.6804810187395836,2.3171189978139903,0.45439986365060636,3.491641859983151,2.59273835846198,3.3064410523694745,0.12457419897081823,1.0115569845693517,2.1064223234012736,1.2385035305914316,1.9803611837534563,3.835178057044767,4.877629567652633,2.7678251028364196,4.058880908060361,3.557446510989476,4.389503620053139,4.203406169610378,2.5974503171995114,2.297175317090483,4.253999426593955,4.564436413898381,0.4783902557399977,1.2535037123502568,2.9693809058123986,3.514576652730365,3.7973000292124928,0.15800787915874248,2.2411772393506157,2.0496910707872296,1.5841952320783037,2.4546615237030114,2.7588347225403065,4.810991813608628,3.1401187610219186,3.5316901976553163,1.5611630375332097,2.705358672784992,3.4707640967087503,1.89956755889223],"lambda":[16.91465497350598,10.103394548357173,13.654827453534784,16.963972217039228,18.243897581835398,10.723538801849276,19.346768700632246,17.998593747823584,19.92804111341426,15.201590127990507,13.870793292256456,16.623626091540036,17.939638402385718,19.40152040109526,17.8362776875613,11.094570206797062,14.713708211907296,12.384199723807587,18.294423708510095,16.22716183809305,12.409781688631696,15.008328731081335,15.83083492533576,18.09026741521438,12.882579870643031,19.863179919250193,19.42562322687678,10.779793838119161,16.689777076520528,17.4497843743786,17.009145731840835,16.501947252735683,15.067880480246643,19.823678328186016,10.469365096988675,11.68508903044887,16.54366542322328,15.245694183210684,13.429346049301984,13.695547649945528,15.270421175491231,17.591886009744925,10.262023631147581,14.51064222059592,15.973979468446524,19.58317180803693,16.185304611428116,12.634422201311416,19.30446408506727,14.230245754942395,14.00826959542691,19.478336984039483,18.470348800949736,17.90487708799637,18.965276783575995,17.97216505124683,10.067416174828335,19.135901924763928,11.011305460900878,10.687660279850917,17.476012706131232,15.053201308179588,10.43311500047962,18.89557561121972,12.833322636574412,11.71596603535372,19.50235736153036,10.260799325611353,10.497092184504043,17.01664443859258,14.698530471550736,11.522476329460662,18.365350158353948,11.204627551708056,15.676067426543556,13.10156885238518,18.039624686531553,17.129342745531133,19.310457126621635,10.618990940740735,11.440057563208988,12.998113010631752,19.106666630184957,16.75667731581244,11.168493407561417,16.702108493270945,10.339609920669787,10.686432888382498,14.177921939247788,15.086773650445362,17.77640162035017,19.990893608797307,14.77088847718935,15.647550706388294,14.72839492107791,18.366532513959463,10.764660254383521,14.401541640317186,10.141472978338903,13.329380028544698,12.077391215066374,19.837774136634714,18.457441312730115,17.748882850527956,18.060102921685992,13.648216166197418,16.0770541811494,19.60283298207731,15.158090148064499,15.168494184518554,18.90647830361193,17.39173423179156,14.858592104235111,15.655068680879829,11.708060162786554,12.566978242553574,14.010297374757299,13.26280605708666,18.00294859572257,18.71145167256181,10.78404972711924,14.923205722127202,16.076105375866614,19.85666904719099,15.018258121869515,16.48463973651499,13.089951838261014,19.462623489742406,19.759046123724225,16.14534623129929,10.05674374875585,17.480339611782156,16.9096659756787,17.268384771415647,13.465208658348908,12.837480492478319,17.34535156713872,14.397539683594871,19.75046554686044,17.420818391875695,12.201512478750221,18.705714551137724,18.20809737842187,16.223102517097054,16.719643435107763,14.34072742761616,15.136131787601544,12.152154779293948,12.654594603431498,19.057762540010167,19.531971230823505,19.054857521440788,15.711658876572447,10.683343617561505,11.208667092584786,11.754558525175511,14.44962095551736,14.153242967536542,16.19087707232963,19.557589112615357,13.285191099816549,15.751973963017836,15.476993722608757,11.99189354473302,14.07034746105053,17.240691775020743,16.546135697853337,13.60278040754854,12.557024514173555,15.686017105101428,14.128769735673721,16.540754112827464,12.725141932825037,11.616899724403938,17.477515833767754,12.395641288200828,18.729045392780918,13.77364324596898,11.57968011211908,10.060722132755032,13.59256901706585,19.9246584063893,15.419677314740126,13.972846595150925,14.405047552718264,13.238493725398142,11.823181466148442,11.319982088445258,14.218758474170507,14.713287904638664,11.225863609106877,11.533155859785737,10.758284651986251,19.18206124151657,16.305234014750667,11.098710988259818,14.79801547108095,19.973091005819015,15.406790280959692,19.29690333133229,17.170241799349807,17.8441069295652,17.548157444872345,11.362005621362318,18.447717847208153,14.941078030434165,13.358723233665158,11.845301460820343,14.253184813306255,16.55457941368627,16.052357894430926,19.987794074187853,15.159275498301461,18.92208215804286,11.066467081205488,15.243658284256867,16.77206110238433,14.161433956344124,19.517246934037512,17.140750301918363,15.274378447608507,18.42737115289609,13.788651853155955,17.925333240769135,18.53567430685161,17.681614145713326,19.514516346382912,11.459194379421152,14.268786921411603,14.279042639381785,15.248945772016542,14.764010997600177,18.572891801603262,17.057489058197827,19.838470878388264,13.211673508507392,15.813624033180895,18.59226755576192,16.36202769176499,13.762124587974963,18.18680480051487,15.441827959317243,18.2696781541292,13.020160221780026,17.40724433053816,11.621913890883347,17.51952742694897,13.586915470981161,13.406658876514243,13.8834790121171,11.517612839609123,14.30149304668536,18.11976133313526,19.184615363947017,10.358658873691091,11.182775734500312,10.301966580596718,16.08879200669893,19.936762142895425,14.573461346589344,17.21653821276113,15.204893278179926,16.927252860301508,11.03210824088103,16.142823416356823,13.316407953008936,17.22773120268395,14.405973933688397,10.915215911543681,11.384697736104508,15.514024652245752,13.079581321841493,12.848202370360447,10.585615488510145,10.522679221940992,18.932237938013806,12.304756686855331,19.158811314424582,12.979794484768757,11.141661904969343,19.841489218781867,14.159201986881802,16.244343651825027,13.261936196860509,10.026056881674199,12.707101913815684,18.508044482751423,18.842000136239733,16.37232365434648,11.963007837656335,19.987065376706283,15.800554110028608,13.606163085374632,11.818525073395083,15.30677541443426,12.815629707753553,12.553001188889292,18.011244957612156,12.821876466911883,18.346599004694806,10.815494607017088,19.39735108724859,10.033764964758568,13.183613685313745,16.7638536140991,11.733689807289542,16.335544253906736,15.129935395803964,16.09119454412955,16.05344480607006,16.460928339019716,17.67953465461767,12.435674007810846,17.425684054769917,12.992269420579245,19.381806351485153,11.464793903385381,10.025208505144587,14.95004483826123,19.676161052720225,16.04123606874694,19.072154105464513,15.681767166783974,16.181362244083694,12.84909023086832,12.61038841345546,13.105234813917184,19.506571387167156,13.849313161583598,19.35733294942764,13.141754973596694,18.155214250214165,17.910097719957527,11.062954860202478,13.39526484630052,18.21491255489434,16.456664550662698,11.180196357991072,10.154440873780937,12.994205258038058,18.655165674004905,17.557024215254742,15.691960134225214,12.523727372304368,17.981221026052285,10.027929950189112,15.07458031367616,12.525143263143338,12.422654794908688,15.358432855242498,10.475937329525365,15.791214608363642,16.25343388817394,15.575910396326929,16.810209774607152,15.843167269793605,10.174472870964548,19.692667027084184,17.980133259227614,14.946762776310536,10.860227256952513,13.21403149027246,13.717646013851219,13.65196710598465,17.074369046685995,13.489083792545804,14.307363841061505,15.49037741749812,17.440350414494933,11.965590335022402,19.47597741519091,13.196829538806096,13.498352292154852,19.075466171347852,11.340427051151627,13.063534282872949,19.200995962937185,11.171801773872312,17.78040075050157,19.323331463381958,18.275850778368245,10.156040560262696,17.487039016682715,18.850243767368312,14.642947383546023,16.3382056480603,12.583749035341045,11.914195143223324,19.11427352806342,19.474167818387514,16.450599858070802,15.31212418949453,12.284157519164648,17.791614901500612,11.454710805673166,10.338892207170542,15.47648882247773,17.873678692696952,11.58863220378114,16.615158268637703,19.910808769840905,11.394422612911619,14.31899463670656,19.927759194990198,16.918152740435364,10.909808930189417,17.759665263440656,15.074566030364778,10.896931472833293,17.703648891850914,15.537508820185336,16.33544373255269,15.974931430920945,17.758533403580635,16.767440189869703,15.913894448647369,12.679194987029334,15.050892873598059,16.134123470390293,14.031997288665448,19.2709713966313,16.35064562047429,12.730327400914083,15.455045172341183,16.422031655321504,15.275447622107903,10.195121241313041,16.934755135670994,12.849094781106412,13.411656814150705,14.249821442618316,14.328115548526032,15.568496494138957,17.73373575126906,14.994398381115094,15.775772690316751,12.038075259618513,13.158433777256871,12.93841948644327,17.635720399656677,16.58983506385905,19.812593224651135,19.917152269737095,15.536842482519885,12.467160199241679,18.81592652513098,18.836997683636458,19.806131704148033,19.054763472275475,11.866392295057825,17.002011359798693,18.23555038790334,16.468976264878748,19.707774272550516,17.255053963722663,11.90995391283783,15.525667353874983,13.29716122190298,14.96728343630201,10.24022745989583,13.066908382074704,13.795896353907406,10.643872626712946,14.646154198287798,10.681937112635431,11.971151035041965,11.83274635248917,17.19368686649635,10.308388487112921,13.553416547610729,16.78759971878781,16.349641923845667,11.50748436787292,15.757212884222513,14.298426609039737,12.82545792699583,10.031534313981075,14.245328041991453,18.386732663805887,11.542042823660344,19.025351054693697,11.692333602124648,18.81140210675335,17.074456384673795,14.252699291847899,16.055625472964955,19.683761257903488,13.098539031241874,16.78829166542832,15.265047098482354,12.844717068666792,15.993391302265836,13.882262907572013,19.237767023238874,17.9803661971651,13.839261902220706,11.896594157944323,11.931743348058585,16.20384111243285,19.264145032143535,15.630017599477561,15.434717788205747,14.36774712341082,15.052762197766075,18.186697018174367,18.459237499901466,13.228065315325683,11.771987719349017,11.324865398142759,10.06055655326471,10.721414019905076,19.6976997648378,13.530857406418882,12.803063602339154,11.253081234661567,15.345301992903318,11.638049437839907,17.418454657967377,14.729630134686303,16.881370815230163,17.244835103650253,17.70504099647912,18.731772733198447,11.14939710176452,15.282629839712328,16.000292124003295,11.619432398571455,15.53807827890478,19.114624145966154,19.10519462966146,15.610029037371255,19.85176066469994,16.589476585320238,18.5049360985859,14.398820875871106,11.800325384484173,18.828526293424392,16.76284813241935,13.350472452779552,12.125669893357642,13.370353867718869,19.70223027255092,14.812021675107887,12.485299648760149,12.279498826203747,14.343538014311365,15.584097505903491,13.571167441309626,14.75789938677574,14.973516122987157,14.894947158543207,12.744504192273444,15.485575480378095,16.40896875704533,11.541215110981426,12.972877342516881,19.16256130620173,19.147459502280622,11.451554382682316,17.54331203535379,10.925538612296322,11.273897267540814,18.74282023487987,13.13645965436728,18.797163148606124,14.709935070408173,12.676272524879892,10.66621352064778,19.80768970326227,11.322924340313016,13.98048567157832,17.868931402559976,10.259080066341156,10.5012771525346,11.463078638418382,16.870015940817257,18.068032700964373,10.260544718056554,15.32243501092838,18.29578027082259,10.842968139036932,17.411296359569178,11.333216208056442,15.620936474901763,15.727127173122597,10.235272298223023,16.754658122352716,17.44538903723314,11.617843951674134,14.282832569185926,13.81450033384769,10.424977514054088,12.287322370707454,12.111975795327684,17.57607210238475,18.458163836867378,12.597536888343743,16.810756212926123,14.427811195445345,11.692292600533277,16.698287067056043,14.591857198122444,10.820368916130807,12.363804136178679,12.841729545061522,10.248983703893515,10.605705338254243,18.954738632029134,10.175749134001439,12.540551877418952,18.35573822607863,17.68415765187697,15.715945498693074,15.406818343914416,11.26042069968639,14.02818649278226,13.314698617313653,14.569435794944166,13.19699614575092,18.039778339984586,19.752129285148598,10.113833249252338,12.149367861124748,14.94085756257707,15.735338101747555,14.083829089098119,18.38004479014784,18.69677766256788,15.375174591635046,11.213339125905495,13.166699215733997,13.511363407711244,14.67238094257503,12.513122347196418,13.469613994184211,14.627165715543416,15.30053390797333,17.842610702511426,14.511548536482437,10.51339961705505,19.634374295486285,11.985904392375575,17.238260689480708,15.013510324441244,13.426480504393368,13.946181290281654,12.815197894864385,15.59087896152677,14.600203748773193,16.127828599755556,17.559793125043026,12.598356006841907,19.65039856498442,12.81923669354505,17.82960413664025,15.673016518401248,16.977839267306543,19.821021254176607,15.813326281519123,18.948723389399213,13.407849998500442,15.416503960791687,14.848497503652585,13.668547401941769,19.28050429646202,18.804884522130287,12.165660109110393,18.636241553237173,13.243629073741621,14.947601158679966,14.861449375911722,15.113323267518759,15.7111861625461,14.581258956090025,16.593437172802574,16.55155449977424,16.058537495014846,16.05189096323377,11.291105960932477,10.472794856029953,11.531820140925145,13.031650475688934,15.367178409566701,14.86091823564795,16.34475450601643,16.496307349992676,11.41012214131953,18.176231511798914,13.214462077546095,10.057360757187606,11.154979289138733,17.921093102870195,13.303686900468756,14.29880988593136,11.669233182800268,19.56657873493677,17.623848264887442,12.105728575131815,12.467402228932265,10.381853198960304,18.47100850870455,18.128355957032127,16.581935429441153,11.736639656666837,15.118122058820084,10.85155481572523,14.649144201316913,18.215866741941845,16.675952006279026,19.838727553105173,15.529246267295003,13.94179447106273,17.67541971181846,10.140525131521487,14.266554613856846,10.375637993219367,16.724507345161978,11.774985358042635,11.8063095619022,17.619534479992794,15.268326557902785,13.883269243371402,14.000539411653483,14.867428778066788,17.506411407724684,11.01569958116678,17.06874208395611,19.149561183831167,17.46875643374096,12.395753648932871,18.634080170221125,11.990928687175618,12.412818326597506,15.386270808350037,19.760676556705125,19.693426847736404,13.45917718791111,12.772297092978473,18.69286468334424,14.951774166588354,17.337316689893218,18.180372165726396,16.06294196511041,15.148004097672134,17.61174682497481,13.941291153418893,10.755610226934458,15.06238773777955,10.908381329390956,17.375262242314935,10.511562102561708,13.048891574384932,15.410279481099751,14.99307611503494,14.20407562273435,11.010599829347218,15.361194030717725,19.0477554992156,17.25598932275453,14.894023596514582,16.588774934779874,11.22757608822009,12.848057595311301,14.964431748908025,15.725171253671924,13.496333786904906,14.435475982508565,11.360900263844051,18.94047528546422,12.378165008814637,14.846045947937709,11.727804841779058,16.218403601718236,17.463543291886467,16.514374972139713,11.405684792090241,11.960582804908466,14.816278330248911,11.357031616590758,17.378131400404122,10.257171142755425,10.568121594146781,16.552189664995055,15.990033124361798,18.629122728741642,11.007423776275369,13.470863734975433,13.745925267374071,11.537725638794559,19.859802702328654,13.513268653579013,13.859297418459969,16.44527874221182,19.51559367587164,17.136919810547834,18.93215578091594,14.022425428725962,17.63551383259719,10.220050655127128,19.716385046185287,16.317860479997297,10.69773424259787,18.514956500389236,17.329678245294144,19.687865411286552,14.372263919902908,12.883327633291673,11.480577964594545,16.348726776059458,16.28321810481875,19.086011616206516,19.74164108279959,16.12350133104233,17.30926945119994,16.419889735359696,12.260007726790395,16.661139635751553,13.406266498746302,12.266510930423786,15.638648218221958,13.70066315647444,10.402454448486658,14.758464281408639,10.873423258597143,10.751615374715808,17.234455787484805,12.431271583481031,19.34012154327865,19.339644115751398,16.12334792214975,19.561685565407828,19.685027279236515,17.780339998114542,13.043436120321665,15.372936913620299,13.535805557622568,13.028304144747434,19.558320870765694,15.946765954909722,17.305371500808384,17.352803146556468,16.196380507703985,17.572427649382735,12.651988219685048,16.443071528078345,18.19151528260536,17.146982580240078,17.299564136458898,12.239100393335837,10.582875642305432,13.664980086425803,18.31560479232915,14.867312035870677,13.41133100337522,14.120164514059969,13.440232205811277,16.27399752646574,11.531290381062618,12.667051453776509,12.0450767980623,12.563758552551258,14.695075477970201,17.877268443190285,13.638150334835167,14.284131875969681,16.086345702430453,11.062140332917965,11.423609479672695,14.807328497603105,16.074045034020084,15.679995552995663,10.739837205625363,14.10106877391108,16.397554096452325,16.852358781771382,19.330953390919113,16.473786521762747,13.067817714203468,13.3520721896504,19.42752105467393,10.962993471057082,11.872962999331094,19.38588591512046,16.603184134080802,11.907557498300816,14.654466115569997,11.293930470409816,12.799723428244459,16.617958517741684,15.454310789592043,12.272145694710746,16.97032516632625,13.794485821867637,18.934140337616867,16.339767321175245,14.06016899055657,10.962014919821524,17.781471140036807,17.265248540313493,12.597353295965831,19.40429433947738,13.325347928289693,15.078059922640552,13.818015009830415,16.966103597854314,10.595881573286839,15.105432922232815,18.544211380892193,19.24946575134889,10.65791057821005,15.701704774648228,14.416149430972274,14.52558894756422,16.232908823238244,15.81431650786034,14.484243500256976,17.20644852541283,10.929550007408604,10.565710656239647,18.415982813052562,13.873464754980073,11.486312669276433,16.925311667945167,19.649193350230735,14.213024964470877,18.90381811016824,12.32728718279997,17.784722022001564,19.0286283089212,19.807948017498425,13.596565627052923,19.476130162010172,12.901051576896762,16.89186994782763,13.1333187447742,17.622242651266816,10.907237857061379,15.046438278637346,13.840019557378437,16.529229920158464,18.437843257000253,19.655145788064186,12.149486482792673,16.364093580649218,19.243573696053076,19.29373660187015,17.589084939878735,18.18722127677216,13.367520591531827,12.434969091930137,10.566048166691797,10.271544579913513,14.064601292808756,15.957859237369483,13.410825363136357,14.140741495809197,10.850368332137803,19.100022763970824,12.569804023656799,13.55759257455234,13.109855413925654,12.014332051582548,13.008911434902977,12.717921103379881,19.562051023762944,17.98776565079598,19.372420098518674,14.244132678330882,10.18221310974705,10.403522779551382,10.721659499141929,19.677742178675068,14.612153213620784,10.315996704476134,16.209975663969594,14.262927515034656,17.916839151945116,10.384820751892601,19.829396741655163,12.303721118183264,16.932080714671017,18.54636618502215,19.846463021381062,17.2857564115034,19.03561976971512,11.706696763396875,18.269845544480283,18.00149422239838,16.205936956438656,13.030707706300548,14.953628974498066,16.677100568173095,11.577416068693484,11.310000031732311,17.244165508810717,10.120324857019478,16.57011317151086,18.419052849792863,16.650255276788645,11.826550035370044]}
},{}],30:[function(require,module,exports){
module.exports={"expected":[7.241904812740109e-7,0.44739298375424924,1.2529189286907973e-11,2.6591129109697648e-5,0.10092114226026155,5.176066398357045e-10,0.1292762839408998,0.25950399583684086,1.421651620769328e-18,0.11850951638106878,0.0011267546434257849,2.4080715080228847e-7,5.961156520113628e-6,0.23900281184245423,0.6706869945822,1.1754040890407295e-9,0.038799489379895476,3.922752534803648e-5,0.08915158935574398,3.542103084347204e-8,5.087959389676917e-8,1.7780157690988115e-5,0.01155075894794146,6.08180165367829e-11,2.539507579765823e-13,0.00035018233907243077,9.639134634319636e-13,0.4596059962618929,0.02166152764319047,0.7595540823222849,0.015453975213194523,3.4797992457302664e-20,3.7768855618769284e-34,4.9478920987505916e-12,0.19331912442051064,0.00017941274795124447,0.2971624134287272,0.16170616435772864,3.830381081847862e-5,0.00012662785181740554,0.6287452888786722,0.056640881618707284,6.545259529611546e-5,0.06928498895896892,0.14619414437281048,4.748183100692202e-10,9.19813181176662e-5,1.8911767320588148e-14,0.9064696595622965,0.2350665947573053,0.4826285693153556,0.462251687092804,0.3867220203597416,0.0001531316412247668,0.1432945417207143,1.640685902672606e-8,0.9395365662323715,0.28792118157001745,5.656043790106682e-11,0.019875900468078432,4.6636082416441934e-7,0.1481899086371655,0.30103587566754286,0.47489002585616213,0.05744717775004139,0.036539608831979924,3.5512878860260857e-6,0.27453841637270937,0.371712617640035,0.02634905816270542,0.0018304148296501399,0.6309637848615901,0.006481830230240691,0.004694518292652296,0.16485201909628508,0.01969982872841032,0.00038892410140019647,0.002158280853321593,2.9502459744339607e-5,4.060571505418278e-5,0.0003970560994736916,0.0008659686532425206,0.45750460326956716,8.152308868730405e-5,2.0833500489580287e-20,0.19782046344218032,0.03074616955477867,1.4834607558417544e-8,0.005242157110139787,0.394312251388123,0.476466940000003,0.2812416942739378,0.1332161672726527,0.056930202049222056,5.552538666417843e-18,0.6817718642867313,0.3598234642330364,0.07900977092558491,5.1894696721839084e-5,0.3576350635626563,0.6450451368825413,1.8012326381829253e-6,0.013362360682894883,0.2921863628985741,0.4370335920629392,0.12716320079684826,0.0005762246310813614,0.00757734261885219,2.0912391581179782e-23,0.09095897434120938,0.12792563832551732,0.7027859586775052,7.2178465017966e-5,0.6721232051729525,2.158134538425494e-17,0.34257943128940044,8.712976174611945e-8,0.00021619035946339007,0.00024657209541045614,2.7883391828800673e-13,4.55411271931657e-5,8.096552036513994e-12,9.247542066589477e-10,0.33450569951021475,7.927169682025594e-9,1.6768137428909185e-7,1.7744225180121452e-7,0.6634410049025353,1.5728398128925297e-11,2.885361861800637e-8,0.00017838301964355997,0.3590293668957154,0.00044433177856968405,0.0020625199801308563,2.1460627299794017e-7,0.1266160897360119,1.871090454613103e-12,1.5236744365150737e-22,2.6387986726433256e-20,0.5513420248850796,1.1532824731173445e-53,3.3294022337303874e-7,0.31270050286706963,0.7130463188467437,3.6138801075024896e-5,0.3080132327605431,2.2053875468773683e-7,0.004620624390211766,0.24753061688620107,0.5248076230679739,0.0018769785156529607,0.0013133843490415467,0.268504069924152,5.1912365401373834e-12,0.2944886780859949,0.5510062985811474,0.05437231486877264,0.007605745127879631,0.12312883614140062,6.458112400843408e-13,0.007729089109725211,5.2673393298413685e-8,1.644322637848133e-9,0.1322343333483368,0.8056786245228158,0.6070548563924508,0.0031795647803834395,0.004478379410314823,0.2758972105556278,4.900334813916505e-12,0.023445772830064878,3.132093137130939e-5,0.15851079458732895,1.4500688367936986e-7,0.22258247769947156,0.042014275512700205,0.03525933888233624,4.0732200427092765e-9,0.9025446877253718,0.1628438269255372,3.01880040711036e-7,1.4279941786783162e-8,1.1225200822948894e-14,0.0002506298375394056,0.4927965510238094,0.8549381805613578,0.008451979164122617,0.005538348195201048,6.323555113665121e-5,0.04005548569815966,0.003386765843496971,0.014801786264764808,0.39671815239585195,0.2837784880874993,0.7764441772716808,0.012713185683826421,2.725256172462053e-15,0.019551804269015226,0.17978735077578997,0.3538359546288504,0.1707254597084517,0.00051567836239792,2.1339612594520004e-12,0.09320256738769056,0.33817788459076314,0.9944399798659207,0.0018080465933386339,3.2490811102096824e-8,8.573517156994406e-5,0.4974944289027635,0.3876878428157827,0.026420989560198338,0.10442363819773468,7.34883653272664e-5,3.2124568928271155e-8,1.7181775981312864e-13,0.0012377879213901909,0.0009512886879854037,0.0018437492975968593,0.01917217039719888,6.0417557392497496e-27,0.14894203877744946,1.0394238583041738e-17,0.795516585494129,0.011255508093532266,0.2039552927793748,4.79569027491349e-15,0.0022746561470821493,9.549446250413645e-31,1.9498893258797922e-6,5.137198463963194e-9,0.45124775138150847,0.0017240606743260465,0.15429618428604985,1.6597502785669843e-7,0.15710560806580887,0.0008728952941229041,0.0007828993602534547,3.529285911531869e-17,2.4844925316861096e-28,0.003063904670312971,3.0538056047224562e-21,8.457486186552975e-7,0.006162539981106635,0.5535666077214618,6.784756765779249e-5,0.026600710567566296,0.0035691346997506054,0.06447979613551265,4.2800467014362886e-8,5.2678190545946075e-6,0.3414408750771451,0.761345107864225,8.08002334025568e-9,0.08412752804711914,0.00996975547789017,0.07413289739243482,2.6761365917168603e-28,0.36179950324383386,0.07635543727765447,0.6580623156008707,0.7285059608054016,0.0002880399745742917,0.8706034533910048,0.01679451458916,1.6092349303429724e-19,3.0989167907732244e-21,0.08201323595098842,0.001439369111715111,0.00016960732979767737,0.7460798344158835,0.004137447306511708,0.1421675317686759,2.9385423342078094e-9,5.292646615453507e-8,0.38040948491842724,3.49297687809004e-7,0.0005114306969473948,0.1635093862986983,0.0008725777007444691,0.12660493564804534,0.24340963532937065,0.0048310403070917765,0.9547932071252159,0.5143894411337567,0.8383328699355378,5.0980457840222524e-5,0.0057424454988797965,3.914810467957542e-6,0.000513944924349014,5.450455117494719e-6,0.07594873422807785,0.3424823483223277,2.4390908470447115e-9,0.28122460864028936,3.6388611934192313e-10,0.003574046072534737,0.06842338211421856,0.11076692552370099,0.03372517101575464,0.040866125921493066,5.375587708808677e-7,0.02331746820438298,0.16760149249571166,0.041875172250247915,0.002569455306186222,0.8947783431067748,0.00800203062694857,0.0023937279944890658,0.04266748002801358,2.0191021170003984e-7,0.2865305903717869,0.07500423034584763,0.3206763542923864,0.0010150488194060657,0.06135382449132481,7.705380344446877e-12,0.19641236532750814,1.232514123112023e-7,0.11120029661952797,2.2880196996903173e-5,0.00018109344788272186,0.11421812410508543,0.0029912489661814445,0.6882088182366438,0.027965500105049654,7.313466621371361e-14,0.000869065767005054,0.012164454544013955,0.20830549277417965,0.6376026868069667,0.6657199677387199,0.2320525142029452,0.8177216840962375,1.958564992828192e-22,0.008460848687607108,0.1046133423771373,3.290298072602774e-5,7.246687294253871e-14,2.1833038132356497e-11,0.615768550324351,0.0037679696037952316,1.2695002333064169e-17,1.316455009618603e-17,0.00027056191947378406,0.009245595643423485,0.16227838229420619,1.629767088118407e-5,0.0016121374083301696,0.5470645913890506,0.4169128293355106,0.05551253387395058,1.763185817818879e-6,0.004500837545628161,0.0003832670173419934,0.49502315193808316,0.18620393554046394,2.1003877364199757e-5,0.43632945223728636,0.4938913550916288,2.567633980078663e-6,0.0032413474816069096,0.10750653281859718,0.29549526877425414,0.004790353003349847,0.0013676859123183994,0.5131432718806053,0.4096295641340186,0.3825715564088086,9.605188407714616e-6,0.2536872467932535,1.6723426296557683e-9,0.07381086575198471,7.943540213058492e-8,0.13132699684777313,0.5634975097295813,4.074296526368665e-11,6.887563882134241e-11,0.4197412980887885,4.18103534114895e-16,0.13462291299567936,0.7990913564748527,0.640500094439347,4.634998239858735e-9,0.003424891466666049,0.00650811064076259,0.8243951400130496,0.33966633459495255,0.01750345304629754,6.128594209728188e-8,1.7047333905409752e-16,0.2442090627559507,0.3223622013715524,5.038436264606201e-5,9.307191010421784e-7,0.057418881462577676,0.37462153297231765,3.934303689829971e-35,1.2487972917006638e-16,0.7300662425659273,1.1097168800620439e-12,0.0002942973338526149,0.11833251068090454,1.2838782851903551e-7,1.0422557458240615e-5,0.7887949513081262,3.908893108698297e-10,6.322835157788309e-7,7.356806209423236e-7,0.27860032226023085,0.81461574652461,0.007901323977236108,2.8121365172570554e-6,0.28868676677321964,0.37226660005230117,1.042164338563998,0.19144817095833128,0.0024788653581032626,0.31906085060119754,2.3912088122715414e-5,6.492118692306671e-19,0.27185614917983014,2.703766962722923e-5,0.5955100891667716,0.03697867631694367,0.022905109901576244,2.2220136170047503e-9,5.968801983875481e-5,2.420124940770366e-7,0.5432498980844181,3.2295089589845576e-17,0.48523365794347595,2.954412932729134e-6,0.0013970437771253564,2.2255597515818928e-36,0.24826990726178855,0.28277809330866893,4.7007222687690186e-5,0.004602668009021457,0.016731548211056817,0.48692750295443155,0.07339445719142407,4.008388411790666e-25,0.24669103632652,0.19740113653860789,0.1938592523624039,0.3651094445285091,0.23866589441480962,0.797139698442811,0.2766448976549654,0.5655305505288557,0.0007733288233457043,1.0292581974566352e-6,0.01876488524864875,0.3634199973974971,0.38320817700481874,0.3469795922494324,0.44562392458568695,0.11602674377541629,5.7080683377917e-7,0.4439981611222266,1.0264195998723006e-5,6.39200187314716e-7,0.054336933507239074,0.5036219367909911,0.020599540334037596,2.564806172371182e-27,0.00546838759431658,0.015511649398934138,0.47981912442570057,0.009604473424688833,0.027357252330661937,0.5205504259997438,0.0044623008476861285,0.0525310574006273,0.06028519871559346,0.14570859025567012,0.7212183401613833,0.010732217916459511,7.511587646389173e-9,0.7372594937681737,3.6661689480665216e-5,7.839921115054301e-6,0.33263524114787785,0.41602644258424254,0.5752756766519083,0.06151437018979031,0.0002469526744092135,1.0767658504836632e-8,0.026145029492945678,0.0009797324500161466,0.6093529329868161,0.3395197607302448,0.013235872352294467,1.5089316542345237e-31,7.839052207198636e-6,9.640583632207634e-6,0.6481932118160811,0.0007367519054972217,0.3280244768438283,0.5128664259701441,3.290139297213556e-24,9.117476598275467e-8,0.15340057745010116,1.7729312799377481e-6,1.2784596366595903e-7,2.0050995283858648e-17,4.5317227957496936e-27,0.059327705726468685,3.962151180283411e-11,1.3425807211163674e-5,0.03481918363170629,0.3164333220355741,9.974816336446973e-5,0.31996576361999063,0.0011503310270987927,0.00013744257764350612,0.3924244786285622,2.7412173192282153e-15,0.0038774344355146156,2.032447300962906e-5,1.7678931885188603e-5,1.5585827014039376e-20,0.3501624899462393,9.41792011119518e-36,0.10083608796041292,2.6765010119087207e-5,0.32249936672587465,3.63153164237486e-7,0.005492875441907839,0.7361264172602648,0.3652846313336706,0.5641954382960654,0.062351702879684806,1.0346875542736617e-8,0.011280588687993105,0.8265603467849231,0.29303295055550144,0.053774431226955945,1.88353714843187e-5,0.4854431121748532,7.467368337111875e-5,0.5941951682815384,0.15489850739943656,0.01589878093262666,0.13871657712950428,0.2145434311124966,1.6708713364933702e-38,0.3461050594967995,0.10292010741225807,0.0007150444762660183,2.005087401439754e-6,0.841309558066043,0.13562963127818045,0.00011234199368013796,0.15308373860564048,0.08821717075722492,0.07412875740453256,1.582727419521114e-7,0.19220568457837015,4.767862725968399e-6,5.952883612523886e-35,0.01642230198171432,0.06573616262977844,0.008695846205730962,0.03594328972870136,0.13294715895516052,0.9977141322686872,0.3213833939384829,0.00025654641847584655,0.203428683382249,0.7819449982615584,0.40722877737758134,0.6632104474160972,0.000596939384240613,0.0007748542655034485,0.35033127147472026,2.934897928157274e-6,6.059527366910494e-6,0.02342284698982574,4.068914674309438e-11,1.3398837844191075e-5,0.003552874694957421,0.00013968122814311319,1.879659999253954e-6,0.00015229516343369729,0.008070574068550896,2.902884724588206e-7,0.1337121187875064,2.938909777782877e-6,7.31249768568545e-21,0.39371327440269194,7.1473358697933425e-12,0.0007178292103298043,4.752109819580106e-13,0.3876826566702369,0.000556412032007427,0.05702494113969232,0.5479754783213042,4.322778258179785e-24,8.895539044816204e-30,0.5845252241190526,0.4111672223736529,0.08372001831976036,0.34747944458984975,5.008945065949557e-19,0.024309335154880853,0.15859094403653615,0.0007366724702471317,0.7651515257459687,0.005025462590155672,0.4353050723316506,1.1544682498189018e-6,1.1216176843217718,0.6265307863478589,0.022291134164676162,0.019489563698000787,0.5251146977929797,0.008625223045654433,3.799454082137968e-5,0.1905714231665045,0.11940179017367895,0.13508328707521508,1.1596624127229814e-7,3.2672976148529705e-5,0.139747153199634,2.585847416230352e-13,0.0016300044469635183,0.08027414109647645,3.0060088079146072e-5,3.890027767162303e-6,0.11197654352792667,1.6133777703234273e-5,0.6742401418823206,0.30442703918400266,4.801321482679782e-7,0.008357528002885495,1.0939830349028286e-7,0.38628460299714446,0.0002968434179327834,3.108368850945321e-5,0.3923955843944366,0.16939440365449407,0.02135480338468793,1.102006077247105e-29,0.0005309623603677913,0.17550323385852515,0.40750478867935347,0.005780650325601374,0.00010793220860088647,0.045648894594275936,0.4240578231217532,0.028032485919764254,8.850077463626574e-9,5.440971122654921e-11,0.08051699830004425,0.4911610599045708,1.3777446254958704e-7,0.8541737321749057,0.0015130527472614007,0.2028935493566984,0.023046577365785068,0.4195619728906266,0.5179213459288664,2.3680939169944495e-32,5.5957755268582665e-6,0.26501188994951924,2.692173627550757e-17,0.2001346948470999,0.009292520846420599,0.798296672281966,0.0001658747815069992,0.09602964580927927,0.002471497409596334,0.052284368252007316,3.404583180342706e-5,0.443146017357063,7.675215836351864e-5,0.11849773033030686,0.030118658317435723,0.3678130445796474,0.03129338958022517,0.17023494165974704,0.010447255759530219,3.3186117316930585e-13,0.02814227364163828,0.001390581208647814,0.0026989206413507018,0.5310997727443812,0.3639131223566467,0.6442885193681723,0.02100116641108906,0.9324319752648893,5.3080243266102466e-5,0.0019036545985461834,0.5256236084189843,1.577189958786277e-6,3.87132296515144e-8,0.3057630829938831,3.172671879121104e-16,0.16098781141072904,0.02551747979871323,1.2162028041312522e-5,0.01975751689518715,0.00032192598044074945,0.18338933257750709,0.3209747487438184,6.067371144999399e-10,0.001094352933100656,0.2552651086840449,0.4755253471059141,0.003937791525004733,0.004503628274905919,0.43325766961074114,0.5133278543333178,0.00035595021933745543,4.679007962614235e-9,1.9681339160021157e-5,7.339924688564878e-7,2.574121336557985e-5,0.0008339616061075048,0.01910352782235458,0.18093839557892746,1.2129646080704768e-8,1.9008512395701012e-6,0.1774514052551012,0.3096116584141949,0.15151015507447899,2.1290568227916978e-14,0.00025803904481079104,0.00017319664606464053,0.5598879067878628,0.04703520734567963,6.391124720176629e-6,0.01698026298494824,3.665423137983293e-5,0.3873997236700619,6.806278232943533e-11,1.0219130317316614e-23,0.3284181421203812,0.4234774449920378,0.6181855817809285,0.051945098647908784,0.45055593837663355,0.00023045966810324295,1.3035529228848897e-8,0.0013375114869270796,0.005625361478495543,0.06793719636166967,0.000963174090499244,1.602366707652683e-7,0.003927776393836107,0.6191011936230904,0.0020450177341509767,0.12213199233908828,2.903204994319012e-5,0.9607549354252891,0.0004759470536317968,0.2017777013717604,0.00019690542225086574,0.06570427206443732,0.024036724890642867,0.1950351454776573,0.005083672730036416,0.01711078643660621,0.02081626987954807,8.24859913227536e-25,0.7789479766712244,0.041525041797002,3.886934341620708e-12,0.22287651066631045,0.7392190622883754,0.0008993241769281026,1.894492573441928e-25,4.408312660513981e-8,0.05942213636364527,0.00022990167537441088,0.3617706156110602,2.0805852581127017e-5,1.5562608425288653e-19,0.5880580152780435,8.12836236053524e-9,0.4280712277067702,0.004767076709133655,0.002036173149520107,0.017913158237119673,2.4039955529894185e-6,0.4648891073482705,0.004085028474132341,0.011638804561752378,5.454010799415588e-33,0.00034880457304285007,7.231267631375864e-34,0.0002741033206835364,0.5079581105911903,0.002464715506719,0.652390556991573,0.00652814874049816,0.0014638918036431376,1.6724884621447283e-12,0.00048054180778300175,0.25917539711487464,0.0003938962083896244,0.01024829473150674,0.003783737682103563,2.4315660063980134e-9,1.06397807056325e-5,0.007117522998477384,0.5443354091178408,0.42432905303820445,0.06298795989417179,0.0413856654215492,0.3830014038477428,0.00616196699017449,1.1010259271027345,4.2665588168988865e-22,0.06938560138623243,0.2084922529290096,0.31868478622730206,0.1356218479850045,2.1610288881335053e-17,0.1772490385864248,0.011161355019420066,0.45738403560768365,3.005819903207214e-9,5.960122355145466e-24,8.420561037714276e-9,0.5852868386406603,0.2367808307571125,0.20946888948854467,0.011087642323553323,9.577938719213839e-17,0.006021905664125338,0.19719375427356917,0.0245549881083802,3.770418346323486e-6,0.00028778395788778234,0.17087109998318492,5.541371911506458e-5,0.0017383982346491607,0.6592293542142331,7.42149240096807e-6,4.83584797892296e-12,5.5764925190780045e-6,0.23251281279371716,0.0023446413456557806,0.20317962887307725,8.067757612859236e-5,0.5098323759366482,3.646899766783129e-17,0.12111854425238897,0.5464390584709014,0.02667140629809998,0.003165513735512494,0.00014156153124991085,0.0003020915874006383,3.460751194225525e-8,1.2422952734724535e-23,0.00016886345025598313,2.6139521687696476e-12,0.0030898401560117143,2.1272263280393056e-9,4.2503378943946495e-8,7.140834778806866e-8,0.020897366408293826,0.0003844582269071574,0.03750031826084513,0.3079536705787474,7.45314074702256e-12,0.020278284045600337,0.5377282430403707,0.7080154533306535,3.313449723180285e-6,0.012458502221119473,2.3197547381655545e-19,0.5814348557944753,0.5651316182772548,0.006344406342678834,0.0008412233304996097,0.005103963007162508,0.5895307480853966,2.90633533381341e-7,6.221382502541909e-9,2.2187532329250358e-5,0.3382306358188723,0.001053546261280973,0.30543571177554235,0.0004525838234567007,0.34190196478698454,0.24619019398988937,0.8059283501324254,0.2607070250471119,0.089847241578214,0.3632817607725115,0.2594998071520218,0.39364023939357873,0.0009038552934064368,3.938043454776178e-10,0.567352596058869,0.2019710936244788,0.31718224093582226,2.451893505987767e-6,7.145476473700259e-5,0.34643794110190795,0.002488269397592499,0.630171212145999,2.729478259746667e-8,0.4181775320960781,5.6302489509581814e-14,5.527673608171078e-10,0.42479563537485737,0.21805300474423378,0.4216515483837565,9.635815612472093e-5,0.8028931051808958,3.615773641199251e-5,4.755501368379464e-5,1.1718416150556366e-5,0.4304215095028553,0.0004205696742268933,1.4066558425724999e-8,0.5510493470577883,0.31173867401244154,0.21492219838191076,0.6965345673478752,0.14245551823256788,0.024171904832926177,2.8238942906193177e-5,1.5784567503884313e-5,0.026404249224337973,6.159595929891898e-7,0.08993895570604153,9.900341248949278e-14,1.9308605972364904e-6,0.1619266262297582,0.7297780985809986,0.16896439554108938,1.0116460646659908e-18,1.3981770835961985e-6,1.6166494821427468e-9,0.00039698703235007874,0.08097664301244871,0.1064731626201921,0.3099493735265942,0.14530151512532827,1.6959512302501153e-14,0.0007911045201368356,0.02791907401407517,0.001161547359171653,1.7517297991334733e-18,0.06695065465404641,1.1955951321633268e-5,1.469704132369061e-6,0.3046125366156381,1.7070771400264804e-6,6.335571221123293e-6,0.008621106641932063,0.45148116311344044,0.08108145211974128,0.0021568535847924183,0.08540861370278646,5.728940629460573e-19,3.895499366378574e-5,0.5159590903776545,0.11896864383954929,3.1461783245805092e-12,0.20703256680712429,0.6735741911892639,0.027939395737106146,0.0011897261443258663,0.04684618348760141,2.4890484842921752e-11,0.0001248749549464696,0.19486457961443113,0.7389110797826182,0.032368282730319525,0.04070898565117487,0.16517480309487415,0.04142464367123872,6.3643496597731905e-12,0.5351626095567912,0.06420504695236377,0.09650097433876961,1.193688919814407e-9,0.044526902341192574,0.330701780391805,0.6004773839371692,1.2484748300941334e-12,0.8715218721787384,0.00021718320042340554,7.799413106058103e-7,3.0970410867787687e-15,5.542340714210066e-8,0.36020141820343143,0.5696154532939658,1.8658029643408344e-6,0.4505327086997434,0.0002402705445312061,0.01627465784946722,0.37974393895825287],"k":[12.0,19.0,17.0,13.0,15.0,11.0,17.0,19.0,15.0,17.0,19.0,17.0,20.0,15.0,12.0,11.0,16.0,11.0,11.0,15.0,19.0,10.0,12.0,12.0,12.0,18.0,16.0,18.0,12.0,12.0,16.0,15.0,18.0,16.0,11.0,12.0,12.0,12.0,14.0,15.0,18.0,20.0,17.0,16.0,13.0,15.0,12.0,20.0,13.0,14.0,15.0,20.0,16.0,19.0,14.0,14.0,14.0,18.0,18.0,17.0,12.0,13.0,14.0,19.0,13.0,15.0,17.0,14.0,16.0,12.0,11.0,16.0,15.0,18.0,13.0,18.0,17.0,13.0,11.0,16.0,19.0,14.0,11.0,10.0,11.0,17.0,13.0,19.0,15.0,11.0,13.0,17.0,11.0,18.0,14.0,16.0,12.0,16.0,11.0,17.0,17.0,13.0,14.0,16.0,14.0,12.0,15.0,10.0,19.0,11.0,12.0,18.0,15.0,18.0,11.0,18.0,12.0,14.0,13.0,16.0,12.0,20.0,13.0,12.0,11.0,12.0,18.0,11.0,14.0,13.0,14.0,17.0,10.0,15.0,12.0,13.0,17.0,19.0,17.0,19.0,14.0,13.0,11.0,20.0,16.0,15.0,16.0,15.0,16.0,19.0,13.0,13.0,13.0,17.0,11.0,18.0,16.0,12.0,10.0,14.0,20.0,15.0,14.0,12.0,12.0,13.0,14.0,13.0,10.0,19.0,18.0,12.0,13.0,12.0,14.0,15.0,12.0,15.0,17.0,16.0,20.0,19.0,14.0,11.0,10.0,10.0,15.0,12.0,14.0,16.0,19.0,18.0,13.0,11.0,18.0,11.0,19.0,10.0,12.0,18.0,19.0,12.0,10.0,13.0,10.0,11.0,19.0,13.0,10.0,19.0,17.0,14.0,14.0,15.0,20.0,19.0,18.0,18.0,15.0,17.0,11.0,13.0,16.0,12.0,12.0,16.0,16.0,12.0,16.0,12.0,15.0,17.0,12.0,12.0,16.0,18.0,17.0,20.0,19.0,16.0,18.0,19.0,18.0,11.0,11.0,14.0,13.0,16.0,14.0,17.0,12.0,18.0,14.0,16.0,13.0,17.0,14.0,14.0,18.0,11.0,17.0,19.0,14.0,16.0,12.0,15.0,18.0,16.0,20.0,15.0,16.0,13.0,17.0,20.0,13.0,14.0,18.0,14.0,12.0,11.0,19.0,15.0,10.0,17.0,11.0,12.0,10.0,16.0,11.0,11.0,14.0,11.0,12.0,16.0,12.0,13.0,11.0,13.0,13.0,11.0,16.0,19.0,20.0,17.0,11.0,10.0,12.0,11.0,11.0,16.0,18.0,11.0,12.0,10.0,16.0,20.0,15.0,18.0,20.0,19.0,16.0,11.0,14.0,17.0,17.0,17.0,18.0,18.0,13.0,19.0,12.0,20.0,18.0,13.0,15.0,11.0,13.0,13.0,19.0,16.0,15.0,13.0,13.0,19.0,19.0,10.0,12.0,17.0,16.0,15.0,12.0,18.0,14.0,13.0,13.0,13.0,15.0,16.0,20.0,18.0,11.0,15.0,16.0,19.0,19.0,10.0,18.0,10.0,16.0,12.0,20.0,17.0,18.0,13.0,12.0,14.0,16.0,11.0,19.0,18.0,17.0,10.0,16.0,15.0,19.0,17.0,15.0,13.0,12.0,20.0,11.0,17.0,14.0,13.0,16.0,15.0,12.0,19.0,19.0,16.0,17.0,12.0,11.0,16.0,17.0,10.0,17.0,11.0,17.0,16.0,11.0,19.0,15.0,15.0,17.0,10.0,17.0,14.0,13.0,16.0,18.0,11.0,19.0,16.0,17.0,19.0,17.0,14.0,16.0,15.0,15.0,13.0,19.0,18.0,14.0,12.0,12.0,16.0,20.0,10.0,17.0,16.0,16.0,13.0,11.0,14.0,17.0,10.0,13.0,15.0,10.0,18.0,11.0,17.0,18.0,20.0,10.0,18.0,14.0,11.0,14.0,10.0,12.0,19.0,12.0,15.0,17.0,16.0,12.0,13.0,15.0,15.0,12.0,15.0,11.0,16.0,14.0,19.0,15.0,11.0,11.0,15.0,14.0,12.0,11.0,18.0,19.0,19.0,19.0,13.0,18.0,17.0,17.0,14.0,16.0,18.0,10.0,12.0,13.0,15.0,11.0,18.0,17.0,12.0,12.0,17.0,16.0,15.0,19.0,16.0,17.0,11.0,12.0,12.0,10.0,18.0,14.0,11.0,19.0,11.0,14.0,11.0,19.0,15.0,15.0,11.0,15.0,11.0,19.0,13.0,11.0,15.0,19.0,13.0,15.0,12.0,16.0,14.0,11.0,18.0,13.0,15.0,17.0,19.0,17.0,11.0,13.0,18.0,11.0,17.0,17.0,12.0,12.0,15.0,18.0,17.0,17.0,18.0,10.0,16.0,12.0,18.0,12.0,10.0,10.0,17.0,14.0,16.0,12.0,16.0,11.0,12.0,13.0,17.0,12.0,10.0,19.0,12.0,17.0,11.0,14.0,18.0,19.0,17.0,14.0,15.0,12.0,11.0,10.0,17.0,17.0,15.0,19.0,11.0,14.0,14.0,11.0,10.0,10.0,15.0,16.0,11.0,16.0,15.0,20.0,20.0,17.0,15.0,15.0,10.0,19.0,11.0,14.0,10.0,11.0,19.0,18.0,14.0,17.0,13.0,18.0,15.0,12.0,11.0,18.0,14.0,19.0,12.0,12.0,13.0,10.0,11.0,16.0,10.0,10.0,11.0,18.0,16.0,18.0,18.0,19.0,18.0,13.0,15.0,20.0,13.0,16.0,18.0,12.0,19.0,12.0,12.0,15.0,13.0,13.0,15.0,19.0,20.0,10.0,13.0,15.0,19.0,19.0,17.0,19.0,16.0,11.0,19.0,18.0,10.0,14.0,17.0,10.0,20.0,12.0,12.0,12.0,18.0,19.0,12.0,16.0,18.0,12.0,14.0,19.0,19.0,17.0,12.0,17.0,16.0,13.0,12.0,16.0,11.0,18.0,19.0,13.0,11.0,12.0,12.0,11.0,17.0,15.0,18.0,10.0,11.0,19.0,14.0,10.0,20.0,15.0,12.0,11.0,17.0,14.0,16.0,18.0,12.0,15.0,17.0,17.0,13.0,11.0,13.0,16.0,16.0,13.0,15.0,13.0,19.0,18.0,14.0,13.0,10.0,15.0,18.0,15.0,17.0,11.0,16.0,11.0,20.0,13.0,19.0,12.0,11.0,15.0,19.0,17.0,12.0,16.0,15.0,14.0,19.0,12.0,18.0,15.0,15.0,16.0,19.0,16.0,19.0,16.0,12.0,18.0,11.0,10.0,16.0,11.0,17.0,18.0,18.0,14.0,13.0,12.0,11.0,12.0,12.0,18.0,14.0,16.0,16.0,19.0,10.0,11.0,12.0,14.0,18.0,10.0,10.0,14.0,14.0,20.0,11.0,19.0,16.0,17.0,17.0,17.0,15.0,13.0,15.0,14.0,12.0,17.0,12.0,10.0,15.0,15.0,20.0,17.0,17.0,19.0,17.0,11.0,16.0,13.0,18.0,11.0,13.0,17.0,18.0,15.0,11.0,16.0,16.0,19.0,11.0,12.0,12.0,11.0,13.0,19.0,19.0,17.0,16.0,13.0,18.0,16.0,19.0,14.0,20.0,18.0,12.0,14.0,15.0,10.0,19.0,20.0,14.0,19.0,17.0,17.0,12.0,17.0,10.0,20.0,18.0,12.0,19.0,19.0,16.0,10.0,19.0,12.0,13.0,12.0,11.0,16.0,16.0,17.0,10.0,11.0,15.0,17.0,14.0,15.0,19.0,18.0,12.0,17.0,19.0,19.0,11.0,16.0,13.0,16.0,17.0,12.0,11.0,11.0,12.0,17.0,15.0,19.0,18.0,11.0,17.0,12.0,13.0,18.0,15.0,13.0,15.0,11.0,16.0,20.0,14.0,17.0,17.0,17.0,20.0,19.0,20.0,16.0,13.0,15.0,17.0,16.0,17.0,11.0,16.0,14.0,14.0,17.0,19.0,12.0,18.0,18.0,19.0,10.0,16.0,15.0,13.0,15.0,18.0,19.0,19.0,14.0,17.0,18.0,13.0,19.0,15.0,19.0,19.0,13.0,12.0,12.0,18.0,15.0,20.0,12.0,18.0,14.0,10.0,11.0,19.0,14.0,11.0,12.0,16.0,14.0,15.0,15.0,19.0,10.0,18.0,13.0,17.0,13.0,15.0,14.0,17.0,14.0,11.0,16.0,19.0,13.0,19.0,14.0,16.0,15.0,11.0,14.0,12.0,19.0,19.0,18.0,15.0,18.0,16.0,14.0,11.0,15.0,12.0,13.0,12.0,10.0,19.0],"x":[0.797031287206379,2.9437714308612595,0.5649815623258858,3.751051783277436,3.515709738931422,1.4665400091984981,2.5957747388108663,2.3464572081695136,0.11088758717211933,4.068909590685394,4.93342276054236,4.386352033280394,4.136116463697862,2.4146996272584254,1.7424822957213593,0.17137753817836,2.0897262141725506,0.27805224944051576,0.7689724850534252,0.5858151866128614,1.2695053475431783,2.3639477984869317,1.1099609918591302,0.5193176670033905,0.034787680406931365,2.8669114475710247,1.3858869891020131,2.363397659600878,3.1088245053028,1.37207188561552,3.5748595450326826,0.2072176286199967,0.33101396364229263,1.628604062398088,3.4642935378951445,0.7395033688846764,2.239002456580889,0.5728948837082615,4.412673705187533,3.82961149116945,1.3525555861798655,1.9400409805581131,2.907712380392163,2.426858364135658,2.5818501844957797,0.3233807965726321,3.750507766915736,0.20614003165816186,1.3752025039308424,2.2503296046472974,2.543781731969043,3.673404831976544,3.8908738305276938,0.8717785811734291,2.284571587673092,1.0343594113729193,1.536731432681352,3.881086160210101,1.1823869947463683,4.415174134929355,4.156596563405939,3.8104313566924777,4.736485424977456,3.642307002504964,2.559846342799376,2.8704078023381308,0.5474306280481234,2.4888525443320497,2.790868618425896,3.1962399488801028,1.1315936320714237,2.5083946079415345,3.954821758432442,2.2831408071500823,4.289617024043125,0.8898483848746097,0.9459290634683637,4.4382612753959085,3.9429335686910427,3.2124186490864695,4.946289447630718,3.386535131049073,1.5416370778273403,3.4254909509694187,0.11369623822512609,2.106389238732941,2.8028252216980967,4.100044359071548,3.4327298056203404,3.314427675555981,2.0568071602536744,4.46143821355173,1.7179402034166857,4.410559568822189,4.676452854801585,2.1929237723413655,2.8164185954140333,1.1696163282041827,2.3622189807155216,2.3445273864871385,2.1822972838216623,0.16947816429736084,4.9904348306814335,4.458850842076484,3.3284677445685573,2.113544947647065,4.117470685632383,4.430538617472271,0.06737334820150709,2.7428970737937175,4.510454341419293,1.8117407422012521,0.7231518813465498,2.243100343698241,0.8102164792302902,4.823145527203842,0.1981901973955369,2.5035116313325476,3.57968310779035,4.058056731449585,2.7445540243044517,0.4953164740146976,0.08523060307481956,3.4907527444167243,4.58722084601694,4.82156023688955,1.9804257685854987,1.755854179934374,2.6089077815296244,4.78432752670103,1.2867528987106136,2.8571833565063187,3.6413989389131993,2.8720172822493186,1.3118975704274283,2.1607251246455164,1.2828157803801288,1.3566887815536433,3.007992909648957,3.0482835019111376,0.011534258339936931,2.1358123628407455,3.5586722883612043,2.4706612874175082,3.2252677079988503,4.093546250205918,1.7394928568789403,4.439095522074518,1.8648743301947535,2.6204379078759423,4.377516111253019,1.2579729817650542,3.388816448112814,2.8895342860243334,4.1085615390909025,2.9311564434503423,4.701712763067576,1.9477444905143682,1.1428337524124732,0.37067086523189574,3.609375884525546,0.606673254143365,0.3723618911759763,4.224039038853017,1.7033539110485107,1.834564606678315,4.565169381560778,1.81276448205831,4.524415291658449,1.2071565603745926,3.1463857582137553,1.0332410584271623,3.238439852124092,4.2799941940068456,2.749198695328341,0.6647839783296627,1.8023240110906424,1.350344086663513,1.8132586318329114,4.945989175858552,0.6813132735066918,0.8680105222924195,0.12210473221201945,3.126281946852205,2.2099531823207164,0.9840947223323093,2.1506801226326666,4.320923978926342,3.2251600935604463,3.3305917842045063,4.939027975842078,0.9815651048017504,2.661415072098338,4.490187795856505,2.168375117902883,2.411050615036406,0.9971180764716403,4.877272678893016,2.6877468269480707,3.4513707735328403,3.0800485587484685,4.6619879482898945,0.0420201261518538,4.970441284664654,2.1838352902238767,1.2722271983988431,3.9109678374925263,4.799768559957443,0.28921165922761394,3.2516342862254746,4.1927065889547634,1.037827934440918,3.4077694438239767,3.873404773832305,1.2495982164351926,2.944335259097649,4.206822033887234,1.1299907364258255,4.730448826705501,1.8578017608498099,0.0041064121786227314,2.3419252271189874,0.13358671415638845,0.8908490366168631,4.711850743803456,4.884477047586625,2.4474356828906374,0.34464005828955147,4.300415198762801,4.109636442459764,0.4987435330928369,3.1755595673332273,4.037566724402108,3.480515694700709,0.5648877395022078,2.899450806378616,2.8629066348293675,4.38216339310269,0.09568926015572354,1.583818172618614,4.022775934398741,0.05165273890406885,2.2806390349418115,4.536961281848784,2.2366233381305056,1.380185587597793,1.8018710987382458,3.1848743466301555,4.738372621168574,1.237716334198874,0.2999391771164728,4.6910390977253,1.9101181999926609,0.3242047559617245,2.236566872019803,4.6186272794963665,3.0670940221550103,1.5416628459496795,4.6538231672479204,3.9116841708388073,1.7537382096952747,2.1800094774370002,1.818423152467138,1.7003547036031086,2.6472767488598894,0.9296461102341302,0.6723413115282095,3.9583943712547534,1.5255573947773415,0.8976195704608736,1.997024116198397,4.853317951811235,3.686562231297593,3.1687387546177725,4.760413100520212,3.729338021965826,1.3490555284331884,1.604876605834057,3.158392572857686,1.6861851010520001,1.211230435344971,2.27959488438085,4.329522272625232,1.533652718207339,2.5528437405038282,1.4964751618214367,4.785976283400892,3.595091413158525,4.868045907217743,2.8908530768540452,1.3467281777758977,1.8170859999734579,3.5189474017018307,0.22100335364874213,4.870450116000518,2.935601833034461,0.7609694577355663,1.603759402261623,2.968550197903058,2.9783326796112286,1.8376328441511136,4.983369973454106,4.600740439512184,2.8300104043259857,0.5794562961737071,2.921936883995697,1.4238721757248973,0.8314170438174873,3.4365800689589587,4.517545984127854,0.4836098249777898,1.9815210788308923,2.4130868511380554,0.5103000940392388,1.417147448894982,3.0632827948735653,4.4384020308540055,4.7989954446261756,0.5289696090776352,4.104532721645383,0.7348040932949318,3.276776824609724,3.036186980113549,2.0831110838705547,1.982025959692938,3.4723156715019643,1.421143087952088,0.9383991842427153,3.0735497953934687,3.124724603108856,0.9102332457795259,2.509920116880874,1.2426740357798771,1.585190846668162,0.04732793436890481,0.35766065186601304,0.6225253086372085,4.450208876370606,0.9621636404580269,0.3041615499035444,2.340550656999958,1.5200905765564021,3.177447315961266,1.4567803387037226,0.6355687003257438,3.477309584854705,2.685308476574427,1.2301024879038636,4.733250455162406,2.5442168070210314,3.269185816407175,2.5694355584976023,0.9985481342159885,1.550961615051969,1.3708951112184575,2.0535564219048705,2.8569291181284093,1.2964595298945492,4.031197885543307,3.358256889485556,3.6857656176771414,1.915437486456042,3.0436887851361574,2.922810468729309,4.593477690946583,4.506181920789622,2.1974879816267423,3.0091878467697186,4.080219230200383,2.168363627146724,2.7320015938919715,3.6106039658272735,4.703982473497712,4.443622979583348,2.0349741473001393,2.5760211808216074,0.19280473964544131,1.1685172014157696,2.0181229024649094,0.09862569899099949,1.1636544745255983,1.2739223164429414,1.7709338598379276,0.15018613543809844,2.628794091575556,2.0837750858906245,1.5744869049779997,4.2046992285158975,2.4247468553215024,1.3148417610752328,0.19148772977251705,4.605313738533834,4.602996498203254,4.866354708741888,3.4033775266354294,3.8932107033409102,2.6431575389146533,0.16621342794051808,1.8422942974040468,1.876878324170197,0.11518966613250137,4.902841374983548,3.290614532173719,4.9035897357020435,4.438868473225023,1.5800481215677908,3.5387774151742226,1.0025000198521705,2.6136132924920066,1.2589632402340034,1.3757343207142358,4.062864341124279,0.41444260163182256,4.0444862874282315,1.6421440182451152,0.8264385139316122,2.8659008197762836,1.3567180747308583,2.960629945953559,1.1351897697559243,2.0729278462314946,2.2809451547146677,4.728425987742744,1.7874907349717217,4.490093338257077,3.9427827757749356,1.6075383245469954,4.649506489096742,4.977729635576097,2.2075549952895424,0.14116038197546255,1.9775354902430886,1.3065872420437885,2.7415767528086112,0.0019324449397872812,3.919454145833657,4.085757094507515,4.866583923474709,4.5224422171281535,2.2475192092644534,2.3823335049401315,2.002807422140621,0.04219636471258448,2.889980393828134,3.5571628286523795,1.5294585336464084,4.114563492919659,4.483984990464453,1.1202228172317896,4.834246195267989,2.0846432645053548,4.063173176280942,0.4774171747263378,2.1697772796341717,4.3174091719468315,3.5297140793367943,3.143883516978768,3.7621304888057896,1.7607998328076002,4.87605794637394,2.2657009581135767,0.19940737650314788,4.508745883220823,1.7316029226966168,2.5672403700975064,0.7097254197728531,4.484206769988045,3.9533854750195263,2.0094810262875895,2.9371928135805625,0.5814479447556808,2.5782656940061077,1.723654000470095,3.664905245339253,4.557073108403971,3.011971902637045,4.884414841821184,2.295535877177186,0.9673275154465566,4.6939141527583494,1.7629149452209991,4.538785427918091,0.7906498238944715,4.113600454446202,3.1330386349050086,2.875954727509752,4.159674694851773,4.143132827368107,0.42765489248006383,3.2639457111793204,1.8384994711383917,1.8104368697700945,1.4870889058057546,2.0223966751117484,0.25699195363171223,0.5278073558292395,3.385312237679056,2.115725015558562,4.225361726880675,3.24222214743068,2.5187830639799245,1.6022765233294134,0.3319827829780142,4.07179103277673,0.3012185772291387,0.2907555556955277,0.6356106171732046,0.029739756165914066,3.507408341724698,1.5050185166953534,4.243080973789412,4.133421748790056,3.120267203800857,3.251743289235783,1.823335793505415,4.88725746678435,0.829235947990451,1.4718706497932554,0.618875936205675,0.2734573695186504,0.3474227101779759,0.26665483179558747,0.09844511168532244,2.4809441627394193,0.05943087028947858,3.2597183096212956,3.722413405280578,3.5548742652011267,4.904232274036965,0.5242635305773602,1.4204053526743532,4.195708869149531,2.9741203942945726,3.212440915672979,2.8910239737031853,3.3505833229265534,1.7463163798678671,2.234679497243831,2.220557603797606,2.342879168372792,2.147056771894068,4.736131937817019,1.550235744321139,4.958064106576971,0.876069356571797,1.7255742365201043,2.6740460042354144,0.624327657131799,3.357065486095372,3.2327109583201485,1.5856018451314025,4.291848250079902,1.5826181031221764,4.483179954187139,4.232659522293255,1.2311096263440313,3.4703350299815705,3.3063445285627937,4.528607178927045,1.3383497171830938,3.049652962304097,0.014683855506535393,3.5890119482546656,2.0022371466933784,3.678285267444479,3.2890018347682934,4.760535684501097,1.4392419653754596,3.50224207301725,1.1365815343201235,2.6867934528757322,1.1745611230659259,2.9896719135548064,2.094608132656899,1.152582681969675,2.46557437073195,4.568545064565438,3.4050569863444933,0.650930515094823,3.5995160546046137,2.886511648340624,1.4918662406809091,1.3838316762537817,0.5915089730265999,3.1047909128537663,4.9844837259105725,2.12719973451033,4.910422858614899,1.8233751951057153,1.7910765602619705,4.4201411553491985,2.0669332310486324,2.0710930984091878,1.3737469199508368,4.863168546348085,2.285429066410656,3.5909277014267604,0.4022645948385162,2.282681144345027,1.596113572036847,0.01609763611223114,2.112068927306703,3.0896115993767825,3.6190848837892053,3.5705228474652175,0.9473130735066815,4.480875801675046,4.597894754855531,4.177410818103413,1.5781180961675256,2.4932115976860683,1.614219121976438,0.31760930161831347,1.1109215472905554,2.091462538398204,4.036410021512175,3.8017784044756118,2.7093730550280815,3.1383957837573884,4.852792944605367,1.757751548866472,1.2382965144364366,3.8630237252637434,0.35382860736635546,0.6085414813749601,3.085638194281616,4.40452803306246,3.874921672629512,3.4746536928363603,4.322410499494119,4.1084547653379975,2.6765191968469026,4.451013982066377,1.801655209716737,3.610657138229029,3.924117638136402,4.287354060522807,1.6248458479184158,4.189040636882238,0.8170449757181508,1.5882275222657083,3.9910268826342667,4.721006465703622,3.1861277269829125,0.11011316655760162,1.1067805914352502,4.916751575177591,4.098102363804079,3.4295579796842213,0.8181346186611971,4.972238955163082,2.774954837720861,1.9519272852545733,0.5790966493839877,3.210453547463399,3.248717139397803,2.9281073583028294,0.38238270304108535,1.2943458186599588,4.225637010688786,1.3045008678810588,3.00284451656601,2.7830088426384894,3.1166450575930216,4.619199483949549,2.1710952366405323,4.475966227230992,0.9305098552366875,4.381338745066178,2.884773755645961,1.8461613053751647,4.400137515334498,0.7912929181105732,2.935439308185571,3.3270770764823796,1.1600797157185694,3.0456011445239026,0.5313423207792045,1.3665348889369788,2.8687983730201005,3.401568371050864,2.0538951636183036,2.775498727168355,1.2553911919828942,0.26836352237077477,2.9697400745976346,0.6486117257809321,1.1411180677720145,1.2568528949918678,2.6006840835212497,2.1579602847987367,4.115417756720026,1.6622164672864548,3.285151534220756,4.368397975972496,3.205144081065016,4.887679475056931,0.1412221734287311,1.8828086457429682,0.0379843281184733,1.7418607217466742,1.1647771252452677,3.513452181505797,0.9531704686207676,4.342392773870555,2.030320534368771,3.804705124658929,1.3666847426974915,2.6462184947703635,1.578373443660318,3.135654635446723,3.043931479703975,3.4607983854205715,2.685009232294673,1.5649783638875125,0.8287529477016675,0.4696124517486999,3.6198862439110546,4.4775733887972375,1.6018987052392897,4.148337197938385,2.0842019633740403,4.509103522641568,3.3274361666257124,1.6163096901869556,2.0558566684926793,2.967917110456799,4.1404958273648145,2.9350011851193427,2.8116899154411854,1.2550706197836548,2.367562899756784,3.0126249938855643,4.289164207295317,2.381628177330739,4.107475694372252,3.062885766784069,0.2808752668894432,0.30867175632741994,3.719878905344732,2.74010330190954,2.741211996942796,3.437497379208636,3.7338764351331823,1.4962542105335241,4.747219340733841,1.5892004657405057,4.284609519159035,2.450666757930511,0.5349733881142771,4.198806119391872,1.6049862654932967,1.7826340274115082,1.3297783374889172,2.666991438545858,1.5300022432626992,1.596900184155775,4.412033031003651,2.238559725384879,1.659655624309616,3.198827011148616,1.3182308955594602,4.397691799167035,4.51232716591636,2.448676939191634,0.9309800789168343,0.0012734228532729208,1.9074630511096902,0.8539151929484856,0.1327507882890111,3.6879662396891955,2.1181646216493846,1.7683862489319058,3.802930714404561,0.5027584511414462,3.07701621738792,0.2731300003617876,2.804936631240027,3.569682614627262,0.039035883469745736,2.668202255001606,0.1882018888865511,4.028405316188088,0.53457799481887,0.3180515653356164,4.445301688438857,2.719955456948693,2.9124888917378424,4.759426968956616,3.705475970865365,0.0018302204420539425,4.216602690104563,0.10020729872730727,3.17953743314783,2.619522662225391,3.523804091714473,2.4117804139573886,1.8745810084558534,4.717765308713117,1.824074055549617,3.4750770119602126,2.7974973701246917,0.43980593908190757,1.0274452462058004,2.7764064663374866,4.918944767570064,2.6879589037213627,0.5950629344266622,2.3366325688622758,2.4996631224185006,0.9627744931845938,3.7334210467023787,2.7690927014186384,4.9797018748432995,1.0408844271094742,0.7137991839513003,2.4626582916390016,4.327341188463519,0.8787009196425666,3.404975084190144,2.7737549310028564,3.530807461781774,2.9015417877498284,2.719131433536617,2.923445629009931,0.0198929272786863,1.4759247096978723,2.2407290595892606,4.477431833278537,2.0198063364732235,2.537252696472284,0.3237762086740381,1.8464427025672636,3.280738311573491,1.0819971625682068,4.712644987941426,0.661178826259734,4.533530189004704,4.7192804837053455,4.405776026951983,2.129253267308165,1.063268862997181,0.6370990238670982,0.7212154634454115,1.5155948436914124,1.698625831040077,3.2673247988605283,1.5080996182638595,2.828928782632776,0.9353776785671319,4.561101407425143,2.9912500751160023,1.24107461729423,1.601853199011275,3.323927439979617,4.748432329810056,2.1877867953364216,1.658621532322344,1.8444544895944148,0.35377269401993927,4.81222665227973,2.5071671202155077,4.486454242081699,1.1342245455091216,2.6282791936025705,3.7333827953582133,2.2242006030191286,3.3443832509278626,0.518483672300003,1.7859427344998713,2.4469863653409996,1.5194839680842764,0.3210250683266791,3.6203978447211336,0.22035614959082017,2.399827310476409,2.5656655145103757,4.139742910206831,3.7632185297538956,2.867252241070013,2.7467064869434346,4.944232499841229,2.419030429941509,4.394820854231991,2.4249482245387757,0.4662125127215977,2.5742170010617595,4.733193839543034,2.321855083176926,4.221560704851125,1.583847465661623,4.93769605370716,3.964653941405827,2.336990158144877,4.530554941183109,2.4350403687758804,2.9446864262595076,4.178094740052979,2.2374036316125876,1.8091475815762625,4.61772926497288,0.9529544530962719,4.729731689554354,4.076747946368629,3.231757314474175,2.428347941356571,0.5428392239897573,1.8721560480984478,0.5395854171064629,1.433825618039235,3.720487226563863,3.7556433278261414,3.523285751758337,1.0195718106813756,1.9771954962724403,4.46028708563783,4.100589808161333,1.2029932682828526,2.9915213022276568,4.602306484918102,3.5600183759194204,2.2805871391927224,4.118555505194388,4.86019238228666,2.301750511164883,4.176841372600619,0.49706262247027233,2.548162887898365,4.809791406532282,1.0902979218122888,1.4761526678286652,2.4985051328018573,0.509465570170059,4.606890262615238,3.0364348014106977,1.8289329844233526,4.141888377137313,1.38637164238967,1.1475420155092109,3.243918835694728,4.971964331512991,1.23078314413126,3.19973194490635,2.588225369837016,3.2906417744951364,0.6992217957722557,3.079329609857685,2.354198236216795,4.169808384854069,0.2529108423480675,1.5699733163886775,4.636903950117612,0.7098125603002203,4.460014299983767,3.1130286113164596,4.745925524105873,3.040625625784281,3.1228514939066674,2.972745716212887,2.74756978958284,0.6861974698954243,1.6265088276421868,0.730516533361828,1.9745902456885733,2.8962806869413784,3.8361288942993346,3.1383037356889476,2.0869896475243666,0.49097926576107565,1.2678418280300707,2.8863085665357966,2.277386853727376,4.088035449518833,3.5661894720878573,1.4313458456878492,4.325968200411009,2.707271977507112,2.937871175694738,3.3703407829772134,3.44744136158004,2.699555276942578,2.8297250171303445,4.007900617607732,0.07287611309587105,2.7573322105682605,3.785199931508252,2.8795507243893894,3.6398134194570417,1.9330326559223676,0.8030414040345846,1.0274593716187619,2.4165909494688407,0.41729605591429353,3.6268932060193873,2.6563516833050627,4.672548032092275,1.6223489537594182,0.9272764820920254,3.750392220145419,1.8653761966173743],"lambda":[1.8415592533487568,7.612280668268316,2.588235835562527,9.518437895587194,6.440279753174149,0.42210886185321206,9.797690494964254,5.700092862138062,2.753140591739194,2.7873598228259677,1.5774896640127767,0.7476514028519388,1.3421576285053294,8.734677833848945,8.076140300839256,3.180276628731473,3.8845297520489352,5.821057356681159,6.21154233873477,3.187622868707234,2.6762411349422055,0.6473795182789033,3.845122776840171,1.1608324155392125,8.542947297796026,2.155178278613845,0.8008276558964011,9.424067416437952,7.2772120243861815,7.003875335743242,8.032739822944757,1.194815803490048,0.2553197415277708,0.7693332123354968,4.419432951214343,3.408987849322702,7.442834085442049,9.851974261872282,8.270043806078355,9.486571403798564,9.969213958825707,5.781809852124757,1.6835095679966705,3.687835551305294,7.670006298276604,4.007942399938075,8.557137036723843,7.102828370572509,8.14760216687793,4.128472054091721,6.976321409909179,5.819202881945178,3.784818665955245,6.590346230283403,9.432556015887554,1.5075469196240632,9.69162230438026,3.716524096357119,1.6498196653621933,6.571195198431161,9.595007758322438,2.279232552647117,2.738283895745175,5.268816963440985,8.701480565301956,9.004312823469425,6.264533398179335,3.954524391603602,4.5105378568034205,1.7397554898397716,2.5988542772177703,6.503151716656454,1.634016299267822,3.3488884876776126,2.1396878359185534,9.018493217176065,5.467980322029433,6.300202256922709,8.145820510886841,1.3290887864613299,8.058350849510767,9.343730312933584,4.997516653267833,8.49020994094277,0.46519980801168037,5.2504660563097865,8.388510653380628,0.8254642018403802,1.8072342493994809,3.2221167949541685,4.91740617796925,3.1756913425047983,3.4379053029757145,2.4802287038139914,0.07167835391296284,6.682569330618023,3.3732543643617796,7.057558511124194,0.8926406624614991,5.402418863734728,6.797838084466125,9.843726106382329,1.3270840507214543,3.0535349400576495,3.9859954493911287,3.2082895636124986,8.147374038445616,4.7559500880692624,5.713494525715095,2.190415272774404,3.8034426969925783,8.284182353910758,4.856488743044527,7.165839701129473,0.147594292705564,3.9081662095607106,5.342869379973347,1.538974194831213,0.9953178924659056,0.27046339519316787,0.9127710874649786,4.325705209390678,9.7187913486861,4.033010239890813,9.490349963675897,8.52945215071797,1.7186625090651209,7.235366222314424,0.3727165814784028,9.492282938946444,2.7550425597827943,4.661695790372193,0.6608743244002935,1.9132551597100544,1.0454284223664123,9.580957511283895,1.0635070788416212,0.3712346388247223,0.15622332695375496,6.588152599275774,0.052227693579847134,0.8419834038613749,3.658780738209093,8.33308384751285,1.3111750066116645,4.29191028166771,1.5444556647435959,6.627786136007736,5.634751546846768,8.4388952345534,1.0442103712061002,3.029469276553569,2.9118775804898633,0.5311893391115441,2.3638191228585637,6.5712329857122365,5.29748126873881,2.2327740796454876,4.163764343287024,1.7763787736843395,9.917546950489964,3.181162640322488,3.219107342802874,1.8783118593968262,7.06382320098756,5.78708566654329,6.276868147545029,2.5179943412468964,2.2575752413428307,1.5968436536669084,2.9756159132808335,2.1081233589304627,5.824973360270313,0.3453110636751866,7.124760897085247,9.819352183733406,2.955584624908878,1.2507640332675907,9.332519410231194,2.3819727297472526,5.951330684317586,3.525214513624939,3.6738963256929624,9.32123645926949,3.8125526062558235,7.561310558877487,2.887865155655154,5.721733221061243,1.086854253314058,7.993832754542081,7.1947835926005865,8.02447195045171,6.016061557794449,2.6355194690606076,8.373009880635667,9.43640881233639,1.2442303192714088,0.9079244984588097,6.594377175352168,4.290343795351075,8.61870717504221,6.197009287062811,4.321856498935082,1.6721576544957162,6.230982977226347,9.377381872612744,9.546215509486728,9.426123297329376,4.973560614941794,5.363010282779051,4.171921597422523,5.689419956923116,2.520962210824871,9.611591431346522,2.932492968443716,0.5674965351637828,8.678385182382517,5.4996749485836744,6.578033873234094,4.299691647159443,2.414250868574095,3.350195902644375,3.3701390769412143,9.479905609705956,1.100619190796115,4.1310533302699115,0.33106302676753074,8.8690509832607,0.01947092906251946,9.204953195180888,3.1982020051624094,6.051299719771411,6.693954122117587,4.996512905407215,4.282912257071219,8.884503489474053,2.1383650116540442,9.179189616499738,8.93387572675864,0.0704348921497644,1.9266261015141861,9.609203552577865,1.6799369786765572,5.053833135044923,5.444513560398332,2.3602325473183927,3.1734440198264524,2.0351994663649653,4.5890806749460715,2.1411737555387966,5.388169236943881,4.131885298965649,7.72961285559667,5.765513359939714,9.689336280611816,6.607407701436648,2.5905707260154065,0.036082095744633946,3.836445344155952,4.53379647397286,7.858583958980856,7.910932130130231,2.111950255516588,8.557532104741556,8.873085090338048,0.3272248639004127,0.6968701819873124,2.4984260050874463,5.086269358590871,4.300718233789496,8.746558045954577,5.46975192982657,6.511162054583275,1.0583885091919054,0.3445726852420239,4.062806321150907,2.5743580330109817,2.5020981165784595,2.464920203411818,1.6721518951859293,9.036968292898806,4.443488867406263,0.7969579485113409,9.863754477124793,4.306239035681568,9.040258956000187,6.119650093754895,8.579536654925409,7.151491048342933,9.720823197925192,1.9226436166960492,2.9578254491360623,3.936873775065921,7.568519799130849,2.419270408693668,0.3501530087142557,3.998299180542255,4.018415348351512,6.803640783305555,6.823631380672608,4.374880904958715,0.8718306008408305,7.073819621449258,8.600773731106772,7.039677753124074,8.13751356289584,7.523926411999531,4.105700182789713,7.32837663614522,5.683608045064581,6.45241835033829,3.6562236870681164,8.44727107561932,9.60105635507623,3.7300664521006355,3.902812506511042,0.26184895208569925,4.785899343257151,7.136961287883827,3.104346093124777,4.903589799447278,9.028770363657234,7.042930698162911,3.2032192796507886,9.895270352146285,8.284668170466102,0.9250897289411153,6.470060711225958,8.231287854642858,4.3321701870776845,8.79977547183508,7.360211248450321,8.979977265795123,9.247590672875052,3.336454963139406,8.62208223213711,9.587311139931066,7.886697937171798,1.5498744370539752,4.065665274667209,7.019277054811328,2.8824544693982235,0.08189047439426833,0.6459128454768881,9.214729084630651,6.083336112767579,6.717409805425161,3.3247214028393013,1.3140229563255956,5.244370533497933,3.796611123406095,3.94680844741383,2.2918803677074218,2.891074380623093,2.4613224076843054,4.989575739557202,7.479783987922692,2.8901356759383368,4.805638706611921,5.586445852649964,9.721290384564735,2.8829833745904954,3.253475884223742,8.421502526498001,7.606476587607187,0.6404470226567183,6.580679969686621,3.1452954019229806,3.744201264295226,0.9606674526910886,9.802107255189847,0.6321477537035447,2.439108370203409,9.922296493641792,3.3285503755218637,5.745028632902194,6.487270374585563,0.4273245685118998,7.062675331677399,8.39694517777566,8.214565901835122,9.553573413009309,7.307117556367948,9.642053689438947,3.0925667948947377,3.4594878583144406,8.16857835120063,3.0594449800393186,9.726497330572638,2.9090441993409732,0.6613870151862744,4.522282362130257,3.045271907826852,7.042823022998461,0.9275917591823135,2.2147346775266996,5.682877073867639,0.5775997795905252,0.5863896899954768,7.420267218798267,9.832230626698825,6.068848910103926,2.007284996282188,0.5687282038645503,9.77989169082715,6.505402047765614,0.5839582192947357,1.2003648918802123,1.3110642526444805,7.9566060078901035,9.430883898807561,8.393116665826248,6.171375959479583,4.464360954279583,7.216377710383131,9.087706278676709,4.050983926379191,3.4241420015922563,5.594391873472371,3.2998691643574762,0.3276112918851104,3.253537901920389,9.478722750041586,7.096591999281658,6.104030988233944,8.026746625451926,1.3702119142296865,7.674541031986724,0.5886186127268234,8.105971214605997,2.7207636236926103,5.077779065128379,3.4094442075992437,2.5334003652619885,4.7130916306596005,2.385991362491515,2.4672135917692795,8.048810069374229,8.060300270783943,1.6829243775223879,8.670012873318797,4.38523843861621,3.3504951239924075,3.182742925929478,2.162966024424413,5.435225306634839,3.730360877466634,1.858853073808393,8.756602319932183,2.69963392517105,5.339077898250995,9.2273017226679,2.4560121784921995,3.7368923511365026,4.550952234279457,6.654113182861212,3.7368505105923644,4.673608699614762,4.434286540367478,7.706656062145544,7.751703761666149,5.4239255633396315,8.719398732600991,5.962784430053285,5.156042278003503,8.538714486287802,0.04080523983473139,7.777704710364272,2.3922071958958013,4.223617121284839,9.392052818723101,2.8392692202645753,5.269675751102909,8.152956831136901,4.016378568308183,8.57698798693969,3.89774279502062,7.721828380467466,6.032335891835386,9.283428015042972,5.973752725768151,8.399080024939174,3.2267941570056835,2.9826707339354686,3.6416749554069927,6.543995103337316,6.934013199355711,9.917143258030862,6.726583545841871,7.210117138842516,3.533449305539136,7.509535694245031,7.689405899333551,2.910964148442885,0.24313334671961062,7.663774986887139,9.532199494518478,5.735073547765824,7.100195147675013,5.72819091980344,4.133038554454316,0.20819920731558694,7.678524065981184,2.0044279053573355,4.836999848735932,8.892982708599853,0.8170901680108744,2.512813196613426,3.2447110513621835,0.9543143291240663,1.046217311553732,4.722426434521825,4.818475431286595,9.899909950011468,3.6115236279609375,7.439126301031978,4.001100764349086,4.944885364361329,1.9522402437807962,9.908686472954056,7.427552246021165,5.554336397940696,5.702600499503938,7.8698712029260065,0.34605228806695143,5.362291397789787,0.998583333356049,2.633293556965821,0.8616603827538394,7.728430095724894,9.429205612520562,3.641381380200197,6.7621981466907695,6.696985312551149,0.6641942636676257,7.1089309664484475,8.199059706800462,8.657182923709353,8.980521673211868,2.055230823634857,7.489011303131139,7.783735283011639,8.355820332827994,5.064958915143607,8.251059874933794,3.453151720153962,6.917670077328024,0.0801856468338924,2.8118915773924247,3.298013179143444,3.5954009973538748,0.44432307605442256,7.056340794039753,2.3031534181865254,9.682518892343996,7.963069345920076,3.0325440364858203,8.366433128397608,8.30781023701299,7.121154500437008,0.658834576905154,4.3636742609429335,6.382092220067415,9.13429512882219,5.753588574380815,8.598354079132477,4.089522128769067,9.918090081435409,4.087566237987015,4.026774676237146,5.952855297469874,7.796125823584676,3.700630194956771,7.040111675543772,2.6136588595198695,0.997713074906037,4.548659630577115,0.568410420741472,5.552371570020808,5.750952166332748,0.36528369492783375,3.041376643771223,5.562841205950977,7.731543358560673,0.8174050875512573,7.1342987353645775,2.0844190045491406,7.844416118580759,2.914998905277668,2.0620030432119862,0.10069319548801303,5.344324073753935,0.9822729465997382,1.955257953299545,0.16059923973647638,7.942072119885452,7.689347036414407,8.699785261042903,4.4084038846104185,0.09698406847656438,4.213140356606422,5.77954468570822,4.361706873408728,6.383084351808497,4.605919459617374,0.957802121676472,2.034489491854332,2.339020999172867,7.917198267550285,6.885474571537142,3.362604863796048,9.377305661954736,6.312441665862383,8.747413959324273,5.156672059417302,7.8428553177934806,8.096784926332543,4.776989457246881,2.469876164796261,7.15675266540817,6.4917967419563976,6.542890313584762,4.525608412915734,2.582832245039577,7.453113368283953,6.719364164366404,0.3975908700163555,7.019932165979579,1.9655110085380167,8.163722495731404,8.10446961667244,2.330740822631454,9.233233743974354,5.987672936666679,3.239443894453067,0.34300136457271924,7.573199009317011,1.561111866463254,4.591011387502135,6.729013366449019,3.35976602876483,4.115887548434321,3.660609226729381,8.42746921740819,2.097157785224082,3.08441319034096,4.236963612282489,4.531030289562478,7.314767621739153,6.808273728812894,3.9865885989821415,3.668440955215697,3.6301811629660152,2.025012013487475,0.2754874665552398,2.7214678509564827,5.623789417511508,9.744282915208188,6.573835962480548,6.793996625208225,6.790505506315023,3.3211915726349095,5.529668709116471,5.236649552408261,0.034792963182674885,1.6168441419024582,2.807058388072239,1.026299708594618,5.316500801218453,7.4514987813484375,7.822211818567246,8.79520182891746,5.3760537471256935,2.9242155368730294,6.155583291038262,1.916189219873663,4.151840551224861,9.008252398107341,8.064533508881196,7.698492505212606,5.5624934800940125,4.486840416263647,6.410849239489231,4.305757912483738,5.635031714350259,3.429994743277631,8.61407152359185,3.13543388623051,9.594354802803409,4.717596937953141,5.640322945332081,5.366359005169487,9.108535030781955,9.588478768238245,1.7082859010449392,6.25150319024563,8.105266745748871,5.3078852757516914,4.245607247359038,4.46737374778126,3.532139667504106,6.722782067004736,0.9823666855953683,8.480252628754016,6.118289758130196,8.440781486400999,4.096749645468655,0.8981175142542241,9.592446250031587,8.395806884253203,5.092800993758413,8.553070605848044,6.943108070909261,7.6867112049304875,6.551896308503105,5.528086336669751,5.180133976359198,0.6525612769852418,9.89349346168,2.7011198135028303,8.63908048284001,2.675215527264696,3.229155825147605,0.420297194332242,1.9485456108825616,4.904766956116095,5.623301992404681,2.5106017526121316,0.15846731146572868,2.3308693492668953,4.342420221298127,5.194045170481401,7.423200788937516,7.582312084588199,2.865482202614864,1.288825497916748,5.863603515506357,5.551105751363135,0.09365347191229834,3.5691542376000696,4.6469436151729955,6.805554138172473,6.342139609549711,4.813857886527582,1.8661429921281236,9.020208147094014,3.1137494720834558,8.108058618406906,3.9327629928261865,5.453703319007883,0.6675410385085456,3.446180938072878,9.581156975985037,5.498326220188659,7.0756708307404566,3.1487217054130134,9.260835608938429,7.653349959346684,4.675669646454768,3.7075147280762155,7.95434683920581,6.9639116427853835,4.742967439985937,5.497225009619293,3.5887234817070546,4.242842571895233,5.668294773024138,7.648104371847531,5.050897933954008,9.31848607590436,6.3916686436746994,7.75425776331935,2.428528429659964,0.01708692095056863,2.154837092657935,6.16209367767957,8.536227765121707,3.3888424350785673,1.4036403557125054,4.674722293430655,5.770395952430976,9.561866100667146,4.620500371628522,4.7820433592449785,8.031969524188924,5.008295608109528,0.9423692202006495,7.194063695035329,4.641208320634953,5.556550071663516,8.660121261841848,7.7935782488025795,1.4106870632392376,9.11124935568342,6.111849615049964,9.249059743462919,6.579005269752405,3.8055686154197277,7.312688145256114,0.5356758918557225,8.945222064472514,7.242230443359294,7.847403117754219,4.05019913305116,2.530222719880084,9.538810588835533,0.5441394055015869,8.917038496946045,5.453600739929958,6.318739401597783,8.816191726811795,7.3916398171756414,8.540062264719342,6.3090405002557315,8.991407552145445,0.36818587169828554,8.896771237184193,3.157895660627208,6.999800034903176,5.638140414057034,0.25364109549476765,3.5885049283082116,9.813188771245805,4.4610061348587475,0.6969137175537155,8.036072003041113,2.073570094379902,4.984605881407194,2.161948345656808,3.6832623877689064,9.032285030656926,0.7872362982952419,4.489884059063074,4.121560541782898,7.149577495055654,9.197886147769559,4.6006355976587905,2.915180123162344,0.9606199947875016,8.43710128475147,7.178326883843999,4.830585302363064,2.532801383443961,2.4534192581313152,5.658103193954558,3.1040908301159265,4.283178137822552,3.783114025051262,8.140474856374366,0.36558791683116043,5.78172512955919,5.756698369698863,6.384395659665025,2.3716785692058173,1.5889550999485191,5.58639727717718,1.7415930804217172,0.21727282600888742,1.4972365260843201,4.8906780084908785,7.436744201416301,0.7841498107252654,8.784514855147895,3.0392687262117635,1.983321530462876,8.395805976569457,9.964274208551874,2.6453631570967517,2.299309435572654,4.12300736410284,8.120963463964666,7.791811545037937,3.9526108495624945,7.6685602424694865,2.0765392767243207,5.303899363830123,5.3472193747410195,2.1759258322408592,9.958966497359622,8.95017082887497,5.9713009997734945,0.8423874273726817,1.280449713377081,7.369173118089691,8.67948820001496,7.187070807152622,4.550770613032373,7.762122183027424,3.7602220177313517,3.180547232113351,6.458441815748728,2.187793397243627,6.369094549461083,8.396746303349945,5.098127760395252,5.692712983019456,9.214043441032103,0.5003877122456246,5.998462590637475,4.376334358982157,3.4318594022656757,2.8391997768111255,0.6816831051084216,4.083354956284899,1.0831289271670141,7.045247501258592,6.353509912267297,9.971276145526426,1.91778419604407,1.3886199495896845,4.869063909003364,3.9774500787617972,6.106500631558025,6.002773457225031,8.096740577893298,7.834437628051283,9.232696384242708,3.308549655134614,6.260939285348172,1.2995097653782284,0.2618317623948818,5.884073973245513,3.9117258076654204,2.2827048662327765,7.756492194272974,3.189129667847015,8.514684171166149,1.961557380490484,9.181797746688833,8.33830047016556,0.669300630472025,3.736798923185729,1.4352727203129945,8.552968224547152,7.123405500973221,8.342326471592852,3.312681900946326,0.5875086315752265,1.9785673249682123,0.6969023732448898,7.718667655292459,5.160370530099168,8.744150906387238,4.252588604212981,8.167255117908327,1.9282826563633004,9.882435243181506,9.631813205779862,6.6366475903278666,2.5185535322424335,4.918135567921178,1.2670566146488027,2.1878683597325344,3.4435565096676823,0.8086137104514868,6.824409569429464,1.356669714127614,7.023112318781013,7.532882430743886,9.376210569241554,7.669798405897545,0.2697855800040583,3.998213073957111,9.515943290054363,7.847520388785256,0.5239816426066635,4.4831131194587615,7.458700611870888,9.904234725632515,4.612334787257528,2.3062647754008814,0.5293270003414818,8.48093482189862,3.4093268807531407,7.784545862886983,4.526746611923274,3.1200839900927813,9.130728476687842,6.645818652216082,0.603980345553039,4.872100517752164,9.128845916850526,5.584900518372066,6.902793179379277,8.73704309414463,3.5792008294860733,6.521619545159374,0.5214878011768631,9.29159269806485,4.866374535225193,3.5065405366179547,0.3255098391653144,3.831083581870325,2.941027981398241,5.395039294215957,8.069573167490976,5.707181747913115,2.8726570098564874,1.0924175587501206,7.372448446347635]}
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
	var pdf = factory( 0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0, 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1, NaN );
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

tape( 'if provided a valid `k` and `lambda`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 2, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `k` and `lambda`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 2, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `lambda <= 0`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0, NINF );
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

tape( 'if provided `k` is not a nonnegative integer, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( -1.0, 0.5 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.5, 0.5 );
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

tape( 'the created function evaluates the pdf for `x` given large `k` and `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var pdf;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	k = bothLarge.k;
	lambda = bothLarge.lambda;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( k[i], lambda[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 180.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large shape parameter `k`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var pdf;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	k = largeShape.k;
	lambda = largeShape.lambda;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( k[i], lambda[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 90.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large rate parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var pdf;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeRate.expected;
	x = largeRate.x;
	k = largeRate.k;
	lambda = largeRate.lambda;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( k[i], lambda[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/erlang/pdf/test/test.factory.js")
},{"./../lib/factory.js":24,"./fixtures/julia/both_large.json":28,"./fixtures/julia/large_rate.json":29,"./fixtures/julia/large_shape.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":41,"@stdlib/math/constants/float64-eps":127,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141,"tape":200}],32:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/erlang/pdf/test/test.js")
},{"./../lib":25,"tape":200}],33:[function(require,module,exports){
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

tape( 'if provided `+infinity` for `x` and a finite `k` and `lambda`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `k` and `lambda`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `k <= 0`, the function returns `NaN`', function test( t ) {
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

tape( 'if provided `lambda <= 0`, the function returns `NaN`', function test( t ) {
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

tape( 'the function evaluates the pdf for `x` given large `k` and `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	k = bothLarge.k;
	lambda = bothLarge.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 180.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large shape parameter `k`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	k = largeShape.k;
	lambda = largeShape.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 90.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large rate parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeRate.expected;
	x = largeRate.x;
	k = largeRate.k;
	lambda = largeRate.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/erlang/pdf/test/test.pdf.js")
},{"./../lib":25,"./fixtures/julia/both_large.json":28,"./fixtures/julia/large_rate.json":29,"./fixtures/julia/large_shape.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":41,"@stdlib/math/constants/float64-eps":127,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141,"tape":200}],34:[function(require,module,exports){
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

},{"./gamma_p_derivative.js":35,"./nan.js":37,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/degenerate/pdf":21,"@stdlib/math/constants/float64-pinf":141}],35:[function(require,module,exports){
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

},{"./regularised_gamma_prefix.js":39,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/gammaln":60,"@stdlib/math/base/special/ln":67,"@stdlib/math/constants/float64-max":136,"@stdlib/math/constants/float64-pinf":141}],36:[function(require,module,exports){
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

},{"./factory.js":34,"./pdf.js":38,"@stdlib/utils/define-read-only-property":145}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./gamma_p_derivative.js":35,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/constants/float64-pinf":141}],39:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":41,"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/gamma":56,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":54,"@stdlib/math/base/special/gammaln":60,"@stdlib/math/base/special/ln":67,"@stdlib/math/base/special/log1p":69,"@stdlib/math/base/special/max":71,"@stdlib/math/base/special/min":73,"@stdlib/math/base/special/pow":75,"@stdlib/math/base/special/sqrt":93,"@stdlib/math/constants/float64-e":126,"@stdlib/math/constants/float64-gamma-lanczos-g":130,"@stdlib/math/constants/float64-max-ln":135,"@stdlib/math/constants/float64-min-ln":138}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"./abs.js":40}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"./ceil.js":42}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":105,"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/base/utils/float64-to-words":121}],45:[function(require,module,exports){
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

},{"./copysign.js":44}],46:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":61,"@stdlib/math/base/special/kernel-sin":63,"@stdlib/math/base/special/rempio2":83,"@stdlib/math/base/utils/float64-get-high-word":109}],47:[function(require,module,exports){
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

},{"./cos.js":46}],48:[function(require,module,exports){
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

},{"./expmulti.js":49,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":94,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":65,"@stdlib/math/base/tools/evalpoly":98}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalrational":101}],54:[function(require,module,exports){
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

},{"./gamma_lanczos_sum_expg_scaled.js":53}],55:[function(require,module,exports){
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

},{"./small_approximation.js":57,"./stirling_approximation.js":58,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":41,"@stdlib/math/base/special/floor":52,"@stdlib/math/base/special/sin":89,"@stdlib/math/base/tools/evalrational":101,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pi":140,"@stdlib/math/constants/float64-pinf":141}],56:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":128}],58:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":50,"@stdlib/math/base/special/pow":75,"@stdlib/math/base/tools/evalpoly":98,"@stdlib/math/constants/float64-sqrt-two-pi":143}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":41,"@stdlib/math/base/special/ln":67,"@stdlib/math/base/special/sinpi":91,"@stdlib/math/base/special/trunc":94,"@stdlib/math/base/tools/evalpoly":98,"@stdlib/math/constants/float64-pi":140,"@stdlib/math/constants/float64-pinf":141}],60:[function(require,module,exports){
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

},{"./gammaln.js":59}],61:[function(require,module,exports){
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

},{"./kernel_cos.js":62}],62:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":98}],63:[function(require,module,exports){
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

},{"./kernel_sin.js":64}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{"./ldexp.js":66}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":45,"@stdlib/math/base/utils/float64-exponent":103,"@stdlib/math/base/utils/float64-from-words":105,"@stdlib/math/base/utils/float64-normalize":113,"@stdlib/math/base/utils/float64-to-words":121,"@stdlib/math/constants/float64-exponent-bias":129,"@stdlib/math/constants/float64-max-base2-exponent":134,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":133,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":137,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],67:[function(require,module,exports){
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

},{"./ln.js":68}],68:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":98,"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/base/utils/float64-set-high-word":116,"@stdlib/math/base/utils/float64-to-words":121,"@stdlib/math/constants/float64-exponent-bias":129,"@stdlib/math/constants/float64-ninf":139}],69:[function(require,module,exports){
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

},{"./log1p.js":70}],70:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":98,"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/base/utils/float64-set-high-word":116,"@stdlib/math/constants/float64-exponent-bias":129,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],71:[function(require,module,exports){
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

},{"./max.js":72}],72:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":18,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],73:[function(require,module,exports){
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

},{"./min.js":74}],74:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],75:[function(require,module,exports){
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

},{"./pow.js":78}],76:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":98,"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/base/utils/float64-set-high-word":116,"@stdlib/math/base/utils/float64-set-low-word":118,"@stdlib/math/constants/float64-exponent-bias":129}],77:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":98,"@stdlib/math/base/utils/float64-set-low-word":118}],78:[function(require,module,exports){
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

},{"./log2ax.js":76,"./logx.js":77,"./pow2.js":79,"./x_is_zero.js":80,"./y_is_huge.js":81,"./y_is_infinite.js":82,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/abs":41,"@stdlib/math/base/special/sqrt":93,"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/base/utils/float64-get-low-word":111,"@stdlib/math/base/utils/float64-set-low-word":118,"@stdlib/math/base/utils/float64-to-words":121,"@stdlib/math/base/utils/uint32-to-int32":124,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],79:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":65,"@stdlib/math/base/tools/evalpoly":98,"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/base/utils/float64-set-high-word":116,"@stdlib/math/base/utils/float64-set-low-word":118,"@stdlib/math/base/utils/uint32-to-int32":124,"@stdlib/math/constants/float64-exponent-bias":129,"@stdlib/math/constants/float64-ln-two":132}],80:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/copysign":45,"@stdlib/math/constants/float64-ninf":139,"@stdlib/math/constants/float64-pinf":141}],81:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":109}],82:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":41,"@stdlib/math/constants/float64-pinf":141}],83:[function(require,module,exports){
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

},{"./rempio2.js":85}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":52,"@stdlib/math/base/special/ldexp":65}],85:[function(require,module,exports){
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

},{"./kernel_rempio2.js":84,"./rempio2_medium.js":86,"@stdlib/math/base/utils/float64-from-words":105,"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/base/utils/float64-get-low-word":111}],86:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":87,"@stdlib/math/base/utils/float64-get-high-word":109}],87:[function(require,module,exports){
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

},{"./round.js":88}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"./sin.js":90}],90:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":61,"@stdlib/math/base/special/kernel-sin":63,"@stdlib/math/base/special/rempio2":83,"@stdlib/math/base/utils/float64-get-high-word":109}],91:[function(require,module,exports){
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

},{"./sinpi.js":92}],92:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":41,"@stdlib/math/base/special/copysign":45,"@stdlib/math/base/special/cos":47,"@stdlib/math/base/special/sin":89,"@stdlib/math/constants/float64-pi":140}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{"./trunc.js":95}],95:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":43,"@stdlib/math/base/special/floor":52}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{"./evalpoly.js":96}],98:[function(require,module,exports){
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

},{"./evalpoly.js":96,"./factory.js":97,"@stdlib/utils/define-read-only-property":145}],99:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":41}],100:[function(require,module,exports){
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

},{"./evalrational.js":99}],101:[function(require,module,exports){
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

},{"./evalrational.js":99,"./factory.js":100,"@stdlib/utils/define-read-only-property":145}],102:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":109,"@stdlib/math/constants/float64-exponent-bias":129,"@stdlib/math/constants/float64-high-word-exponent-mask":131}],103:[function(require,module,exports){
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

},{"./exponent.js":102}],104:[function(require,module,exports){
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

},{"./indices.js":106}],105:[function(require,module,exports){
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

},{"./from_words.js":104}],106:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],107:[function(require,module,exports){
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

},{"./high.js":108}],108:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],109:[function(require,module,exports){
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

},{"./get_high_word.js":107}],110:[function(require,module,exports){
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

},{"./low.js":112}],111:[function(require,module,exports){
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

},{"./get_low_word.js":110}],112:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],113:[function(require,module,exports){
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

},{"./normalize.js":114}],114:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":41,"@stdlib/math/constants/float64-smallest-normal":142}],115:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":108}],116:[function(require,module,exports){
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

},{"./set_high_word.js":117}],117:[function(require,module,exports){
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

},{"./high.js":115}],118:[function(require,module,exports){
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

},{"./set_low_word.js":120}],119:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":112}],120:[function(require,module,exports){
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

},{"./low.js":119}],121:[function(require,module,exports){
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

},{"./to_words.js":123}],122:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":106}],123:[function(require,module,exports){
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

},{"./indices.js":122}],124:[function(require,module,exports){
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

},{"./uint32_to_int32.js":125}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{"./define_read_only_property.js":144}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){

},{}],148:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"dup":147}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"base64-js":146,"ieee754":169}],151:[function(require,module,exports){
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
},{"../../is-buffer/index.js":171}],152:[function(require,module,exports){
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

},{"./lib/is_arguments.js":153,"./lib/keys.js":154}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],155:[function(require,module,exports){
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

},{"foreach":165,"object-keys":174}],156:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],157:[function(require,module,exports){
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

},{"./helpers/isFinite":158,"./helpers/isNaN":159,"./helpers/mod":160,"./helpers/sign":161,"es-to-primitive/es5":162,"has":168,"is-callable":172}],158:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],159:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],160:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],161:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],162:[function(require,module,exports){
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

},{"./helpers/isPrimitive":163,"is-callable":172}],163:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){

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


},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":166}],168:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":167}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{"./isArguments":175}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
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
},{"_process":149}],177:[function(require,module,exports){
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
},{"_process":149}],178:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":179}],179:[function(require,module,exports){
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
},{"./_stream_readable":181,"./_stream_writable":183,"core-util-is":151,"inherits":170,"process-nextick-args":177}],180:[function(require,module,exports){
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
},{"./_stream_transform":182,"core-util-is":151,"inherits":170}],181:[function(require,module,exports){
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
},{"./_stream_duplex":179,"./internal/streams/BufferList":184,"./internal/streams/destroy":185,"./internal/streams/stream":186,"_process":149,"core-util-is":151,"events":164,"inherits":170,"isarray":187,"process-nextick-args":177,"safe-buffer":194,"string_decoder/":188,"util":147}],182:[function(require,module,exports){
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
},{"./_stream_duplex":179,"core-util-is":151,"inherits":170}],183:[function(require,module,exports){
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
},{"./_stream_duplex":179,"./internal/streams/destroy":185,"./internal/streams/stream":186,"_process":149,"core-util-is":151,"inherits":170,"process-nextick-args":177,"safe-buffer":194,"util-deprecate":206}],184:[function(require,module,exports){
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
},{"safe-buffer":194}],185:[function(require,module,exports){
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
},{"process-nextick-args":177}],186:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":164}],187:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],188:[function(require,module,exports){
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
},{"safe-buffer":194}],189:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":190}],190:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":179,"./lib/_stream_passthrough.js":180,"./lib/_stream_readable.js":181,"./lib/_stream_transform.js":182,"./lib/_stream_writable.js":183}],191:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":190}],192:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":183}],193:[function(require,module,exports){
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
},{"_process":149,"through":205}],194:[function(require,module,exports){
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

},{"buffer":150}],195:[function(require,module,exports){
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

},{"events":164,"inherits":170,"readable-stream/duplex.js":178,"readable-stream/passthrough.js":189,"readable-stream/readable.js":190,"readable-stream/transform.js":191,"readable-stream/writable.js":192}],196:[function(require,module,exports){
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

},{"es-abstract/es5":157,"function-bind":167}],197:[function(require,module,exports){
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

},{"./implementation":196,"./polyfill":198,"./shim":199,"define-properties":155,"function-bind":167}],198:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":196}],199:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":198,"define-properties":155}],200:[function(require,module,exports){
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
},{"./lib/default_stream":201,"./lib/results":203,"./lib/test":204,"_process":149,"defined":156,"through":205}],201:[function(require,module,exports){
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
},{"_process":149,"fs":148,"through":205}],202:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":149}],203:[function(require,module,exports){
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
},{"_process":149,"events":164,"function-bind":167,"has":168,"inherits":170,"object-inspect":173,"resumer":193,"through":205}],204:[function(require,module,exports){
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
},{"./next_tick":202,"deep-equal":152,"defined":156,"events":164,"has":168,"inherits":170,"path":176,"string.prototype.trim":197}],205:[function(require,module,exports){
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
},{"_process":149,"stream":195}],206:[function(require,module,exports){
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
