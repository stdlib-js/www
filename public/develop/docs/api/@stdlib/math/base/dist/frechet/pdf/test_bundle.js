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

},{"@stdlib/math/constants/float64-ninf":88,"@stdlib/math/constants/float64-pinf":89}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":38}],10:[function(require,module,exports){
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
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 3.0, 3.0, 5.0 );
*
* var y = logpdf( 10.0 );
* // returns ~-2.259
*
* y = logpdf( 7.0 );
* // returns ~-1.753
*/
function factory( alpha, s, m ) {
	if (
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return nan;
	}
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a Fréchet distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( -2.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= m ) {
			return NINF;
		}
		z = ( x - m ) / s;
		return ln( alpha/s ) - ( ( 1.0+alpha ) * ln( z ) ) - pow( z, -alpha );
	} // end FUNCTION logpdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":17,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":41,"@stdlib/math/base/special/pow":43,"@stdlib/math/constants/float64-ninf":88}],15:[function(require,module,exports){
'use strict';

/**
* Fréchet distribution logarithm of probability density function (logpdf).
*
* @module @stdlib/math/base/dist/frechet/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dist/frechet/logpdf' );
*
* var y = logpdf( 10.0, 2.0, 3.0, 5.0 );
* // returns ~-2.298
*
* y = logpdf( 0.0, 2.0, 3.0, 2.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var factory = require( '@stdlib/math/base/dist/frechet/logpdf' ).factory;
* var logpdf = factory( 3.0, 3.0, 5.0 );
* var y = logpdf( 10.0 );
* // returns ~-2.259
*
* y = logpdf( 7.0 );
* // returns ~-1.753
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":14,"./logpdf.js":16,"@stdlib/utils/define-read-only-property":92}],16:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 10.0, 2.0, 3.0, 2.0 );
* // returns ~-3.489
* @example
* var y = logpdf( -2.0, 1.0, 3.0, -3.0 );
* // returns ~-1.901
* @example
* var y = logpdf( 0.0, 2.0, 1.0, 1.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var y = logpdf( NaN, 2.0, 1.0, -1.0 );
* // returns NaN
* @example
* var y = logpdf( 0.0, NaN, 1.0, -1.0 );
* // returns NaN
* @example
* var y = logpdf( 0.0, 2.0, NaN, -1.0 );
* // returns NaN
* @example
* var y = logpdf( 0.0, 2.0, 1.0, NaN );
* // returns NaN
* @example
* var y = logpdf( 0.0, -1.0, 1.0, 0.0 );
* // returns NaN
* @example
* var y = logpdf( 0.0, 1.0, -1.0, 0.0 );
* // returns NaN
*/
function logpdf( x, alpha, s, m ) {
	var z;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return NaN;
	}
	if ( x <= m ) {
		return NINF;
	}
	z = ( x - m ) / s;
	return ln( alpha/s ) - ( ( 1.0+alpha ) * ln( z ) ) - pow( z, -alpha );
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":41,"@stdlib/math/base/special/pow":43,"@stdlib/math/constants/float64-ninf":88}],17:[function(require,module,exports){
'use strict';

/**
* Evaluates the logarithm of the probability density function (PDF) for an invalid Fréchet distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = logpdf( 2.1 );
* // returns NaN
*/
function logpdf() {
	return NaN;
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{}],18:[function(require,module,exports){
'use strict';

// MODULES //

var ldfrechet = require( '@stdlib/math/base/dist/frechet/logpdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 3.0, 3.0, 5.0 );
*
* var y = pdf( 10.0 );
* // returns ~0.806
*
* y = pdf( 7.0 );
* // returns ~0.034
*/
function factory( alpha, s, m ) {
	var logpdf;
	if (
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return nan;
	}
	logpdf = ldfrechet( alpha, s, m );
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a Fréchet distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated PDF
	*
	* @example
	* var y = pdf( -2.0 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return exp( logpdf( x, alpha, s, m ) );
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":20,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/frechet/logpdf":15,"@stdlib/math/base/special/exp":36}],19:[function(require,module,exports){
'use strict';

/**
* Fréchet distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/frechet/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/frechet/pdf' );
*
* var y = pdf( 10.0, 2.0, 3.0, 5.0 );
* // returns ~0.698
*
* y = pdf( 0.0, 2.0, 3.0, 2.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/math/base/dist/frechet/pdf' ).factory;
* var pdf = factory( 3.0, 3.0, 5.0 );
* var y = pdf( 10.0 );
* // returns ~0.806
*
* y = pdf( 7.0 );
* // returns ~0.034
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":18,"./pdf.js":21,"@stdlib/utils/define-read-only-property":92}],20:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid Fréchet distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = pdf( 2.1 );
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

var logpdf = require( '@stdlib/math/base/dist/frechet/logpdf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 10.0, 2.0, 3.0, 2.0 );
* // returns ~0.965
* @example
* var y = pdf( -2.0, 1.0, 3.0, -1.0 );
* // returns ~0.143
* @example
* var y = pdf( 0.0, 2.0, 1.0, 1.0 );
* // returns ~0.368
* @example
* var y = pdf( NaN, 2.0, 1.0, -1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, NaN, 1.0, -1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, 2.0, NaN, -1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, 2.0, 1.0, NaN );
* // returns NaN
* @example
* var y = pdf( 0.0, -1.0, 1.0, 0.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, 1.0, -1.0, 0.0 );
* // returns NaN
*/
function pdf( x, alpha, s, m ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return NaN;
	}
	return exp( logpdf( x, alpha, s, m ) );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/frechet/logpdf":15,"@stdlib/math/base/special/exp":36}],22:[function(require,module,exports){
module.exports={"expected":[4.1327989097964e-7,0.010335367723901433,0.04507376698764659,0.018869449038877016,0.013286042894620698,0.04020491774665217,0.06206067064992802,0.00805762345798445,0.1201924584656328,0.02975051239341736,0.0006671696400911073,0.0021362554714672135,0.007488788378754776,0.001376706437530074,0.02246576570618079,0.1190183481831591,0.0012139773165530936,0.017614983388005954,0.004342696893283911,0.03777455120549834,0.028759993708154897,1.2686453884950007e-5,8.845168659680995e-9,0.011749003204616864,6.999104356825568e-5,1.9777378629796626e-7,0.03669173690969897,0.0017754334121767776,0.00019959059447468967,0.001657453391836421,1.5731632308911355e-11,0.009629275672469977,0.0005665027101568801,2.6666716213135574e-12,0.03197719898225658,0.10386119736027581,0.016773151198882296,0.08432316109270505,0.004501800999656201,0.02689925043526046,0.00013328904723485115,0.045569112002394364,0.005217265376137712,3.9788804726094675e-16,0.004309092991337445,4.244388488986112e-26,0.2056403599230565,0.0001188602650998504,0.002093567277839571,0.135050582866183,0.02685510944322706,0.14330148409630997,3.374658477558713e-17,0.021318814074332188,2.4647251846265572e-5,9.076140308670787e-6,5.1988676138834995e-5,2.843679583385051e-7,0.032599884174846376,0.004216489167982792,0.08558083690539277,0.00038088607907346727,0.02618159984896371,0.0012645250725807939,0.0010756145245682637,0.0051152210814675156,0.009976679656150941,0.0003593495295397645,0.05179794334511456,0.19480064595614177,0.08106803515712678,0.05428829129502168,0.009648209030199972,0.06861873290749479,0.12959797789937846,0.0052877936320503355,1.0188939000288164e-5,0.07630368788971334,0.0019641632362645133,1.6144546041543104e-5,0.010363735945464391,0.02967116510406293,0.1751172455636405,0.0017713039863285224,0.017680001541743078,1.8438129841938767e-5,0.00035429466809956494,6.100564038928104e-5,0.08243748794559044,0.03994279566167534,0.01303939405272436,0.005896107467792516,0.025551140550077518,0.0020205422785995026,0.0021922394679427483,0.017341467949979397,1.8139467994901057e-7,0.008193968657346559,7.580364079003094e-8,0.13740248298410856,0.006709686314052571,7.605419374618597e-9,0.0729438423444554,0.006512429183446066,0.15063459447430458,0.03783124099905305,3.884637188851763e-6,0.08393027513848819,5.652069416434871e-5,0.023031248321152532,0.014916896709576646,0.12503177362318993,0.0001967669208703348,0.25389103989388007,0.024931660353651304,6.768689050544769e-7,0.026143047529712787,2.073446046816249e-5,0.013444721363144814,0.0016882708481122126,0.01448996161109936,1.0196521814876788e-9,0.009554762115179425,0.0031584433040703157,3.2498854070663265e-5,3.3035287325644444e-6,0.0003260618068991665,0.050624415921834295,0.314676109864766,0.039680553566775904,0.01746729920726929,0.023890574916204797,1.2524941398021261e-14,4.151724325582984e-6,0.13719071635059088,0.1643847925334938,0.24897417613907802,0.02420009276332915,0.23333414810521738,0.0036136721705477765,0.0009113678220902889,0.09402433064276736,0.0015041221498484705,0.40649169102031496,0.0073164258983599365,0.16379272344592805,0.008137179636044777,4.304764300478676e-7,0.2072208901073126,0.013114161317482302,0.1103377605510038,0.06833897739398517,0.09026023673552296,6.99004101978823e-6,4.051113656288147e-8,0.053643672006440914,0.007765987504697553,0.023614744297685425,5.7622897133073266e-5,6.792688338305335e-9,0.05449358028298988,0.0008545983603685421,1.558156787733753e-5,0.27367648789810484,0.013537519890120305,0.04396116050940085,0.00023213122493876423,0.05276442223993222,3.2307835335270384e-5,0.0021832556629965707,0.11830738524237518,0.024099948113797325,0.032347900668785845,3.276432948650661e-8,0.012485937161436558,0.22871962241345276,3.0473395750294642e-12,0.0037992859443792453,0.08436991341713215,0.0004581694455510247,0.0005321355622479457,0.00524815845345459,0.01769750261194558,0.061791782934960966,0.03550649285569518,0.0031389042276096677,0.023325137287939186,4.786483731231255e-6,0.008960591488165805,0.00021048208275820468,0.025611956338577567,0.05560221700177689,0.1089298391373206,0.001010712771780708,0.03573495421876858,0.09519738967019234,0.013570543599821863,0.0017260066780264709,4.456333733723644e-5,0.1226696398435147,0.00498184262613044,1.4807481411133765e-6,0.025568623886901204,0.018498875498753228,0.01328102044745702,0.010073540124469687,0.00469504321320547,6.66951516988176e-5,0.008691952864603057,0.00021082238765839285,0.00023298640231726524,0.0006035467584743199,0.21448889931886536,0.0003554894733091576,0.07230412628772244,0.05135575469694989,0.009375584051375684,0.15838415204939682,0.008783999074800443,0.13909558382712164,0.020226603079710217,0.004507030930206466,0.0008454442021555441,0.2103225231562476,1.5301548572808227e-5,0.018788925248431163,0.014264849047380901,0.12297428439351957,0.0027240001377593927,0.002991531662160923,0.005977816650454003,1.5301542587521683e-11,0.03209893244532679,0.025981906832474335,0.07441612339562616,0.00916822631451435,0.013027675381632929,0.002258167396081998,9.968059265107095e-5,4.226236260468619e-7,0.04249448981616229,0.006492933821055703,0.03305122465724065,0.03791810332799614,7.590003462423034e-6,0.10590414257577777,0.012441401230778389,0.002524564593805073,1.3321843412738665e-6,0.20370392490818928,0.01251076123057933,1.2037192894533876e-7,0.019678962097486163,0.0009348014066436947,0.00023739260400034687,0.15904140143558637,0.020388963648474027,0.08706161289184149,0.018301363449120537,0.16747456604153407,0.08528506682479403,0.027999250082896117,0.007954084389836736,0.07615171097967244,0.12218394427218666,0.021394787693291534,0.06951059275863719,0.009344458975467616,0.003646664626558665,0.08643102331285189,0.0026356115512551704,5.4524940052566106e-5,0.01345832401655829,7.01950804628253e-5,0.07404667219219024,0.0015156668174375095,0.16995242711992214,0.000894741735192231,0.18111306978236152,0.016408878245688156,0.22880523579449094,0.04059341230836019,0.0005533500348178416,9.822144616158782e-21,0.022173835643099805,0.05685677519650846,0.1220957107427784,0.12440674864565154,0.01995559689926355,1.2714103658181447e-6,0.028664311792495314,0.0002273333051197813,0.005862198727995498,0.0031948336152396208,0.06831396225999423,0.04339815460132878,0.1608820736131945,0.16535724520705294,0.007141180320374562,6.382670415791159e-7,0.00015074783193752547,0.02116088193615692,0.022206434144808218,0.008056530328569879,0.013583710232133828,0.003090799488131836,0.024091116447457307,3.176906866609381e-8,0.027823207975873048,0.0003164173463321701,0.1664817490773223,0.10503743453983078,0.0013537144980102756,0.0016718801339632061,0.016484459632533026,0.018563267223766597,0.09907859833586338,0.02233978185190224,0.00020174222512508698,0.39691146331426375,0.0172360670159877,0.1855262508135052,0.00621504733834108,0.06743480446397136,0.012625942160191823,0.019958606664209122,0.09930080583852707,0.0910318021410173,0.00024486463482189624,8.162377374859827e-11,0.0028400442076174396,0.059877593180377595,0.0003301599861947344,8.111996659930671e-6,0.21337103826150336,0.037025922330515174,0.008763130103521016,0.380755022822519,0.013432983289847964,0.03811414131571749,0.027187970835461366,0.04912878437192347,0.0004892221967013947,0.017826339497017667,0.11481381188542085,0.02652346710546488,0.04746182602196215,2.24121917570071e-14,3.019913837949597e-6,0.11426403590877977,0.1204772801773367,0.0001767163929570149,0.020079663563264,0.0022053669743629578,0.017578876275267212,0.0008283706198023988,1.6350798650667258e-5,0.0003440040671783981,0.06115952765708653,0.027090666745249667,0.08978304835703722,1.3581482209894638e-6,0.15548122377791376,0.030396905622034023,0.00025946983217073496,0.026793352895246255,0.0010563639396014588,0.08428650151453172,0.026104458437198517,3.3008172949802645e-5,0.01600209874063366,0.30141520949525163,0.0028476432744631614,6.018407286506012e-6,6.4574312733064375e-6,0.25157481789566694,0.015669092397327923,0.003119787694208096,0.11527737480781021,0.04775648373492079,0.0007314121692256052,0.07461690077473623,0.018752609245178638,0.04367474051370976,0.10062943393838625,0.013816217888213314,2.3212945192546827e-6,0.0010655457450253019,0.01472307232810254,0.2176288614319325,0.03828168784625513,0.022117801384962346,0.01109793322923086,0.01213644606189436,0.0007101442944990517,0.1355886719369943,0.002914816641699865,0.04730114475619254,0.015748249100863296,2.333699586245249e-6,0.16214339724731397,0.05601455389688688,0.0022831285827158957,0.0001244228514413839,0.001019778243591143,0.002952064720146035,2.885298191998984e-5,0.04657968962377892,0.00861592738740746,0.05716156807278243,0.3531637866072286,0.0011046040026575015,3.7005622441352087e-11,0.004508481483907348,0.004868616273377627,0.0045565320998075115,0.01078562885891023,0.07652388400118193,0.00014720587414742052,0.27190056540734686,0.004808724398196356,0.0014710932807265632,0.00034668120347765855,0.02451015510975621,0.04917999580921446,0.0036034881081719924,0.0022398517223689044,0.042361820755522105,0.05682652034814103,0.11295468814241476,0.0001851116456385751,0.009402872625292465,0.04934061448216,0.0238378990823213,0.006062873150846601,0.02336887919688465,0.07657147527367432,0.08864025420543097,0.017656163085834828,0.07558009929834703,0.028827868821551573,0.00011188379000070655,0.09232099841751225,0.0018482564978284266,0.0032794251657968267,0.05906414402708058,0.10731285165813757,0.05011685147793378,7.7348984726215235e-25,0.02211481071329475,6.412633964749591e-5,0.06920939875264842,0.006672749251394298,0.2790729425445847,0.0006124018745017313,0.0016846918586382433,0.019509809009147307,4.143319171081884e-5,0.0028967378669173386,0.03932998314769161,1.490887863482186e-10,0.018546001526812163,0.08296540829619604,0.27083042448024147,0.004359748244959164,0.0018440025069308026,1.2294639592063564e-6,8.69818786249368e-5,1.3202076212142098e-7,2.189572054102809e-6,0.06977289392459513,0.0024181760688830388,0.004808171340770009,2.3087320620526606e-8,6.6824367075652395e-6,0.005056759252295523,7.629231580471394e-10,0.11290462766191332,0.07107546052136915,0.017989946723675602,0.1365848751311667,0.056464663270088256,0.012947098335137812,0.01692687304522271,0.004740048590331272,0.0020002956009277776,0.0022047601770677954,0.051027552404695954,0.21300905014521254,0.022242648165696016,0.024905208448362793,0.076642052307113,0.04582801796442869,0.0001893133206355104,0.028989629577224126,0.020618826365071244,0.2722118647998559,2.5854804832194996e-5,0.07855715778546193,0.1647394373059557,5.713363748903651e-6,1.1187628206458081e-10,0.001050411538513681,0.0074122922994703366,0.00013667341315458105,0.024649128650709572,0.11627234974642238,0.03143058980581336,0.0015077975289638724,1.4897045194523532e-5,0.0025934102694280675,0.24458929943473925,0.2190367055628989,0.0070536046754390725,4.821780628409499e-6,0.006406215776511543,0.0002827749595520515,0.01691825685049127,0.12745743916986918,0.011316395893655934,0.00021566677412343223,0.002536896816072207,0.04986963870220387,4.617894788033621e-5,0.0345633467787733,0.24355662800071085,0.0024394708535392016,2.4979874566893448e-8,0.007670871488751845,0.11688607567882146,0.05199250203146155,1.8822009301813036e-7,0.006033566552144166,0.0378547230556723,0.004572286530771891,0.015344443378531728,0.00014444767420080979,2.625666595983258e-16,0.019901877011573175,0.015110144105813725,0.034083306310594495,0.031212089368486656,1.9427683661965786e-6,0.01385379770562209,0.037350916444385686,0.010077195645616273,0.04189443464928599,0.13223967240689674,0.023427404021978234,0.021499453603734005,0.00015077969988093362,0.15714881769992747,0.19784246181479703,1.1790197136237323e-11,0.002028658403183996,0.00012128097264025537,9.767570914289263e-9,0.010122566710881764,0.011057661197469877,0.1221114751124121,0.021282665706221744,0.03661310336979718,0.03814171555411443,0.19032878903190348,0.002477392185917202,0.14047508149719345,9.160933683570897e-8,0.10225246060827115,0.007768151536115636,1.8471161557323505e-5,0.06286395590527483,0.007020237349887878,0.21957794842010808,0.017912308845017162,0.12263324340098192,0.00021736483216918802,0.015819849948210032,0.14841989797797225,0.002147532116741487,0.009212672051161431,0.003056627914228528,0.008786938834067887,0.2611465326231523,0.014936262988366445,0.0010171246662606065,3.558490880601445e-6,0.1633678569053152,0.028037700932807996,0.28856521784886613,0.07544926326723773,8.343142151157771e-11,8.470253438631737e-5,0.19487433956563022,7.263152927686954e-6,0.00045390154805122126,0.009136873226950592,0.0010477856796039656,0.16308079047628798,1.1773505441609218e-5,0.030525169565164042,2.2672516526602576e-9,0.07828809439302219,0.0026065777712942165,0.0027851329083906523,0.05409421369709384,0.002865810233747909,0.14621791732162187,0.0023684752504835142,0.008347789715351477,0.0006439640043110287,0.2582793811850718,0.0029829463751463847,0.011465292479281507,1.3801059278711562e-9,2.5930488578877425e-8,4.9549644957964784e-5,0.0006909098595258712,0.02477036126846654,0.0021329424301742496,0.13054511157065024,9.79475108846716e-24,0.42865015772091497,0.14428903457877168,0.06226632951994742,7.11566309099671e-5,0.06170881986538854,0.029946477724707956,2.599539139860178e-7,0.016887423340385437,0.04695811434742819,0.0021081872165097304,0.03480824321970551,0.1586590799593855,8.633122767229378e-7,0.004768700810354963,0.0038403043131483637,0.02449291765668682,8.992952520116648e-6,0.03714430505017282,0.0024324651519602755,0.08374769754039989,0.0356882890031497,0.06630577994626664,0.05139725803933881,0.011521556849207035,0.04069177182959624,0.15601718357916197,2.9006241187950833e-5,0.010595943786090202,0.07199154327961539,0.000795299379293642,0.0036797549513044076,0.0034161177345665063,0.002249485106431312,0.020026624670625385,0.011792799065334331,0.00017615350840868052,0.1095560919431174,0.036976202244884813,0.11227834393713862,0.005614558535185978,0.004263446609807662,0.10371140584967704,8.567104512871957e-5,2.251545866330425e-5,0.07676070433568362,3.036938927786597e-12,0.00038098561783215113,0.0012349463810280158,0.00913198628725403,0.05887207853486893,1.1610601879092041e-23,0.013090799540974155,0.1589988097549247,0.019069616529838268,0.3340231563899393,0.016871922127352647,0.06615433985800141,0.01666104660183733,0.32152720659341427,0.09653054895469765,1.5644211590196506e-8,0.008761057101806849,0.044743421220343346,0.0009403679590798647,0.012798082836434039,8.915868578870042e-5,0.00422020876191625,0.0008858854905305447,0.0035844785098958845,0.0484504783605413,0.049305025643815385,0.031113899469970112,0.013302930820186147,0.00044960468410803404,0.0024134831763630966,0.051864607729500356,7.16394945351731e-10,9.800537714996933e-8,0.02408281015047381,0.0015663857294225636,0.00671186666723266,0.20238251961844805,0.029216040297889448,0.21999112788488948,0.13107472362238132,2.8329957407685164e-6,0.06582369210223055,5.672099232607779e-13,7.474116398868481e-13,0.010433266457699304,0.0011558817454612282,0.010327886761027357,0.0052593829376067144,0.03687134649975626,0.014517113309245735,0.025264540487630546,1.4852337879893488e-7,0.12484999298093133,0.06850399570848256,0.004236763262642042,6.116043433354021e-5,0.0862680444285,0.005221560070854311,0.002907755672762145,0.0012466922004907267,0.030169164919488713,0.000484840650330985,0.0025976394948115083,0.022974644762351965,0.09149310119648496,0.0034614302330048304,0.002888343160354657,0.07527313818148879,0.008445520290314758,0.3297845850323521,0.0002443055914038295,0.010713813472366487,0.01699104753540662,0.0012992788369567561,0.0026597921720345977,0.017256434960223846,0.014546790395216435,0.0038197107261640213,0.009725417234346532,0.20810395647412191,0.01807052076519948,0.030782621163705177,0.0721862822091554,0.04364352936300159,2.606381083083899e-6,5.114992363444058e-10,0.015375663662667757,0.1597489815964919,0.0043123056275043824,0.08915840175763311,0.1760030830215856,0.09455846110305843,0.0006532083197890748,6.736253692607803e-6,0.05062222271156152,0.005238098802132834,0.018452956427495427,0.09546483789310181,0.1080564770735758,0.0017188669713332893,0.0013587315033714532,0.061179050575466465,5.425376113929955e-21,4.982343139891375e-6,0.012015968027759156,0.004099010701177148,0.02630188440250588,0.032458300258350455,0.10562332871006036,0.0002896743051578831,0.21775330223165615,1.4264232465420024e-5,0.00763268353007464,8.810960047217315e-45,0.024944850804682922,0.0005531993102149294,9.063491351993626e-5,1.2769375337526666e-5,0.011987723911929468,2.125987292381242e-8,0.014285247288011662,0.009905710946845798,0.0460559957087496,0.1600215985088901,0.005663802953949717,0.19008020687947144,3.3909063959391677e-15,0.13862982496743717,0.048564819138609244,0.01525114665803142,0.0001586977748764014,2.2793856232880705e-12,0.00021492226191326342,0.3972533203010844,0.0002070730409690992,0.0017715100664198826,0.00825532980172206,0.085783242495172,0.00047793741113176286,0.08790880109682912,0.03265921712812216,0.0009111670713672201,9.020826228850777e-9,3.976940388465717e-11,0.18341845723526984,0.012392871452475796,0.02372575988762066,0.001233963247817359,8.775956520691033e-9,0.012138188249503886,0.07331953557640888,0.00555605768907134,0.32352753575086945,0.05094943768702567,0.06584419068712294,0.0010179997566571518,5.8314405437739323e-8,0.3116490477690249,0.256286434037704,0.05594514296158278,5.60282438047312e-5,0.04755148754694011,0.1253469985293983,8.244954285018792e-5,0.02148460453555002,0.012417683712196603,2.5971187397482287e-6,0.00016305745317881512,0.33372762503872916,0.024000979790893533,2.64753292459082e-5,0.035150150002132334,0.023854370036233058,0.009631594882992476,0.09578861049910466,0.005200915003511884,0.0004243865378781074,0.1459084856126684,1.8384461878430283e-5,0.0004832624338342102,0.03741463689173902,0.0033377360520797537,0.003965946654234394,0.016985395244633827,0.0322847678769116,0.05034526368536787,0.12802559908190345,0.0036805212383602846,0.13127561991885506,0.010048337314229916,0.06445388691815186,0.012469153196842556,0.3085493334182595,0.04403271836166758,3.680497768291083e-5,0.0598531328504894,0.08757039043975387,0.0005489370532630207,1.3017454735057827e-5,3.1672884234352836e-6,2.696979686492117e-6,0.0006615625615746304,1.2866666234242097e-5,0.00904811441858462,0.02424780869018446,0.002942918149555639,0.027639902097134343,0.044646112903782516,0.11807254762217667,0.01456559010836629,0.005695398698473773,3.5478362973410413e-240,0.0019044361038990185,0.010440825263996204,7.640619875470722e-5,2.5630932672034003e-20,0.0020288019224939924,0.05503749596620435,0.018643918221971218,0.05463391057644448,1.9867315885687556e-5,3.1989018507650044e-7,0.05159830787135613,0.22392170658453303,0.03878294001937949,0.002608018583277642,0.007539473337998267,0.016395923126030193,0.0889980090030274,0.00016680737969808056,0.0011640821362929334,0.0008601804948926892,2.8869820495893565e-13,0.15066307617994226,0.031565301552425554,0.07713593842669798,0.033102957771456026,0.23304551881219226,1.4574321659494177e-8,2.6325210408585564e-5,0.03202292518257188,4.447401146217621e-5,0.00032603528039666803,0.007072514204153952,2.890063677372244e-6,0.0021275891866237473,0.017424828047666124,0.043953399078299725,0.031417543212515026,0.1889727030857989,0.026944488579578655,0.01921143514619396,0.33494318043972704,6.984175373750122e-6,0.027206258490868284,0.00013126660050449902,0.03566310247764111,1.2839636622489574e-14,1.6304411747126983e-5,0.024821811124102325,0.05787595919483016,0.3243764336488954,0.09909721659835716,0.2894734959085349,0.007314872866924942,0.006590079665179984,0.029904802900871663,0.0017285444039060946,5.911131752013598e-5,0.25513228052988235,0.006989774897477222,0.014108308655800903,0.027128469949640254,0.0005878023724603528,4.3406620255775185e-6,0.038368690872522634,0.08484608222424352,0.013233281602192311,8.759030701856294e-5,0.001070972416122882,0.25581771158616917,0.0005017029452746899,1.835305915302952e-5,2.059447325366466e-5,0.008819679851823664,0.003976816743133379,0.02036802909350929,0.033237120480384436,0.08749986807444038,0.00015510196312160292,0.012241497367613065,0.0390844381383831,0.050350955090307264,0.004664628121490565,0.11916843481618164,0.022413458797919047,0.006033383348009184,2.398311731176555e-7,0.0890209994844404,0.0030433962425752475,0.015280281865311262,0.0008875401237042917,0.003048542660118147,0.0007550638314298891,0.00025975633031573796,0.006122322024965806,0.07786341467067981,6.25033656278464e-6,0.04123531607283563,7.821254209096921e-15,0.010138416891412629,0.04198119803931785,0.008890870188281242,0.04242723030904767,6.770356901325055e-5,0.011927426607965875,0.0005475227571136923,0.02301786599828525,0.00791311446523382,0.019300003653904746,2.1011426443423423e-5,0.0002950786948064817,0.07465040792360657,3.266772653087332e-6,0.008967682903633697,8.785934626784968e-5,0.013468485215273895,2.5648405653930855e-5,0.0049591250731939995,0.010131616777288206,0.3096027659488745,0.01921846796231681,0.05917649598414688,0.04504358938084137],"alpha":[5.294910051611845,0.27224312492012626,3.9608005125738566,9.779780369893906,6.229433884584088,3.353841476099213,5.627405751324554,3.9068275166509325,6.181931624902674,0.917837684652012,9.754650735403397,1.8550751460968606,4.493981353928289,8.333793142219177,8.425952433133538,3.3339481663064685,4.987360270455989,0.6864853542892013,4.220595070464306,3.5256116856876996,0.42721034586667983,9.653451911690267,7.981197237024327,1.2295763235542223,5.527956445804794,6.370074541175903,5.563084111913459,9.357023348267395,9.561735870279408,6.068386213661984,8.256836653956812,3.8479459838139207,6.831311912216682,8.58992905340786,0.7025948687832106,3.189522406967018,8.359640409076679,1.2065582290202603,5.748310137703929,2.476316973120114,4.352213560891003,2.6525496363058343,6.383133855716059,9.104946996736963,9.884804353773024,7.60782961448363,3.5825385439930724,7.008801780423138,1.502112600324197,3.069858350133372,0.8356263937671593,3.363185552024104,8.23753492552813,5.8895435673852115,8.166242334553992,8.435591775073242,7.430971315000345,5.9127146468853,3.9048779566668257,3.6427185793226746,2.9458294382897465,3.4454009838878696,5.0389619037413125,8.113792204657358,2.307465001215827,1.622253352399472,0.9804878052146182,3.9156686230117077,7.970935121442535,5.877513070290337,8.004728518981725,2.100301728868732,1.55117424693626,5.149520378938542,2.902099389658941,0.2203393553552857,6.474726780191327,2.3865677237268423,5.544740696537184,4.6821625420247255,5.203464772012092,2.8104138379073906,4.5373959326253495,6.879495422490085,0.5294044441345536,6.163168055544219,4.601085877925897,4.706159389335838,3.1043628912270727,2.096957503074015,0.3503757884462644,0.20920383973927148,5.789704423830515,2.9318263344557716,7.738132557958166,7.559336035573336,9.12378525141466,0.2031803948825317,8.160486048491894,3.264965028221991,5.298336838571991,5.705212197077216,6.08273241397014,7.421480580345232,6.932961597904123,1.6340475321327497,6.291699326108475,2.803050210812479,8.97063680040909,1.5099197098021122,0.4629266539247312,2.791460895455675,6.474327836782498,9.613624510331489,6.7729946723868455,9.096060923374342,3.537045372250256,5.742220668227871,0.5156596797798141,4.92321735013876,1.7312016349812276,7.956768223846744,0.38905557221346143,8.363536216271367,9.840670418838846,7.843061729839507,9.177709279079005,4.854669310074868,6.1179339849249725,1.0914905079276016,0.6226094931384707,0.5905467134318987,6.411684227914025,9.245810316517993,3.9966504328921704,3.713742847114585,4.403303720631877,2.2198798553400323,5.234471448020452,8.038153001299237,2.6591831019196466,4.702891248169941,5.115468441291218,8.359229617734849,2.8783687675427383,8.418149362617742,4.778120801090953,5.515779284094792,6.1751059954199565,3.6576290715899584,9.021370863743412,2.887273348099586,2.2232343138206456,6.037075108217667,6.921757204914356,6.063191176048585,8.05966081741676,9.26038519882611,7.577710327868521,6.873258219056806,2.0173796462603577,3.9920134559724096,3.1321909645252566,5.082087393468164,5.021465743665092,1.0103990542953567,4.354660615623491,6.351475282018615,2.237738261514328,7.951163558305822,4.979409572267572,2.25275998638623,1.824594619794262,7.979019445044415,3.679210566754487,8.972206753903812,4.900514847078936,9.756265884212642,4.422832291488077,6.315551286607701,5.249065449519701,7.832395884028918,9.703428219774546,4.353324541439456,1.821472776644295,4.1457261829395335,1.1280031062853624,7.2938876191933915,0.12688548710755088,3.881247141527595,0.9063284257946624,0.9368149094602041,2.346895546686585,6.990363366495176,4.723998334048208,4.477790635223446,8.370962884269492,8.861144004188095,4.388359731399962,3.2464384068276653,4.645674748864463,5.0834374298976375,6.559350160262856,7.491245046003456,5.041030404717144,3.586807691909295,0.12058355164755508,6.973424847919107,3.9702073721110054,5.3775096677411565,7.471284588450125,0.022027397311457086,5.158671995959294,3.5013027321274293,5.679411274944139,1.9198830754577423,0.3800816337959967,2.521079063387268,3.1787187539258466,5.712976197892415,0.40823727967434387,0.15063957141294937,8.4118926176431,5.9093892328204545,9.916505485678147,5.177190521797206,0.48973907686971074,8.469460676742454,0.08789922770525482,4.378003005369262,1.2882715855736038,8.149576917959271,1.538192871537698,7.616469564956969,5.824163338192396,0.13110449067083918,7.742448810871602,4.850686324731878,6.907136379170378,9.900753497304782,1.4902595647098393,3.2230936540083666,1.506442138119486,3.6331349797690016,7.301881981245875,2.796356943115328,0.2594646699931036,7.037310995600004,8.039338165029026,3.452677395124406,0.30112128072219857,8.124153853936493,0.8419593927743962,1.7125725353555166,8.14435829447402,9.756033673875704,0.3424817072147768,2.932324729799447,4.937548450668661,7.753357760630464,2.9862195659492463,1.0079803090729245,0.49263996043256375,2.524384741516421,2.813119289072934,9.566110038803526,1.5343400850758204,9.809788366670078,7.478871793871886,1.448400748552796,4.109975517325914,5.88107250962506,6.787354371168672,7.600537215854826,2.5280904854831143,0.044645982899258474,2.9355432492320266,9.22825102061185,7.19984751304483,1.2730930037948873,4.558157384200032,4.087672074722537,0.010120888805418282,9.986325849971502,0.46938725384155333,1.3155788623147147,3.0429219704483046,4.005364287711939,5.206303240407895,5.4633251364168185,2.584871998517624,5.3130820833304,3.901762049531652,0.05846587344026988,1.6614510218139178,4.1096064114130515,8.955730878278708,2.6148634281976424,0.31918517072615726,4.392390219807827,5.874914154595148,3.8839905701367017,5.467298383772803,3.8551912539115074,2.1191337444598313,5.303639173853973,0.7796132620064222,8.121883953554669,0.8878877411603225,6.459100755831932,4.241626345868088,3.350374145908821,7.329506236728656,7.043855591903652,2.9312912711682637,7.980648228605764,8.070819328168117,9.266330099263012,4.0140803323388035,9.152818638928107,2.2568090594388224,4.354228941264653,8.115947176720784,2.242740683565676,0.35162106442550467,3.3385977406970935,3.177142174670271,6.801000844074738,2.6558639191430955,7.278218358371906,3.312455057600696,5.194297588091938,4.211189157024529,5.060846008001986,3.718217609693244,1.591311955398056,0.3466163310573944,9.03842742776959,2.5681955569724524,0.9367487242942762,1.877154722311829,0.9798338390302841,6.277415975968155,9.798907070243551,9.234047694269021,1.332507497445492,1.4541304895482043,6.259818135978847,8.82816949410984,6.342460758647723,7.825849392277138,6.156149254168366,1.2413086017900676,0.060324362471926296,0.34124901238182126,7.8146558187876325,6.444313705642763,8.191845058999403,1.5880297735439175,4.167737512096348,3.3189948717290996,4.346009275391001,9.012193820211365,0.8000341740528794,8.214557783641679,3.2474553756534896,9.159522666995748,1.7975763693525582,0.5965097321108126,7.402292073839045,6.723027892792093,6.8271971658203885,0.08490447977678173,5.4846211097315045,6.872448061097476,8.201348765533085,4.141193022386069,1.1123701903530359,3.9155064186370447,1.1010258164300524,5.250899784622504,1.1766509816162496,9.231712571522086,3.8355062989092303,6.5804060649093055,0.7608330776759487,8.263895805574732,4.6423005387040694,1.0188568849878554,7.513436502197514,2.713601778374588,6.938140915853479,0.6722674458775768,0.42623338274211386,5.822906568649595,3.8244810669426577,7.236221711348943,1.1530627951200545,0.7678249935079884,8.36519027787803,6.77078434607817,1.0556809517040233,5.900937354935376,5.401135873243474,4.416648471965519,0.09897417591643087,8.643019994266346,5.861711537438761,3.9820910132250176,1.971322786473797,9.199433091292947,8.343611976630816,9.737269430394207,6.810622451512922,0.16688316393534963,3.823980765026349,0.1965704126963197,2.6300436747680456,6.63970418226953,6.394815296130993,6.241568032918023,7.379743106886327,7.918011787058594,0.939070949869103,1.809395887819485,3.3419649873940283,8.891680434823348,1.3926185018573434,7.473982685684155,5.422944881767142,4.213714149756149,8.824734625617623,1.6694168022781941,0.7416377138685681,4.53365287635023,7.437141952657019,7.4255192534587895,6.099661008808672,8.401589493354429,2.198893697859108,2.7345101483894996,7.6397528319063674,2.268599252166965,0.02861192418316616,1.743113280404065,1.6430318618982032,5.881389424861856,0.7776303059371092,7.347962221298068,1.394709036094559,4.6873200083378075,5.0036448805181095,6.975453226475327,5.4482250669463745,4.264505062040098,7.048272199023633,7.995008908090753,9.633833668242344,0.10976150528841933,7.909607318606,3.9294161431564345,5.6602933943950084,2.3368072722165367,9.403763408662654,0.6248925896409685,9.101428519948453,9.707020437084655,2.773251660995224,9.843585463170824,8.464652313581318,1.4927504336516728,7.767790514197024,5.8147026337748375,5.882363752670592,9.144283447938978,9.622758756169459,6.9153371690593035,3.862168284929395,3.9731875504415703,3.0188251639213792,6.909887509221635,1.0650036719694556,0.38760143237452027,2.073065244478387,2.291248769524077,1.3314608576541165,2.1193153009749133,1.7953035017471297,3.9417083916366003,4.524707557610286,0.638735584252168,9.72923584371129,2.069056185198299,6.5298862193537826,2.105530402339737,6.823568643820675,8.45669240389701,2.1318727470289023,2.543322881881953,8.57526143500975,6.550316584010565,8.961358751776851,6.537864635604256,5.459394702897864,5.0635281229432705,0.6456344027314875,8.498271101351209,2.7531434390928777,6.293947450996482,8.02839094106287,9.423610349440937,6.835037141486355,6.742802741191422,2.1901787979120546,4.434452303470396,6.715286624180463,1.9933802123453637,7.096935127969157,3.0327139813373694,1.477246957160263,9.571639487951845,5.7623627899098455,1.5274975547835101,6.968341837999672,3.334644915077274,5.297179810889605,0.8548769214532648,7.639544756187815,0.22994535872520094,2.54708693555175,1.5564595540884008,9.671563607153992,1.7245312857943529,1.1547501435747454,2.0288223542444817,1.411695173730405,9.781345407292399,8.310409144721289,8.268144169025131,0.8023933751152224,2.4363249065504644,4.999514954733497,7.6485757044104385,4.351485627176368,0.623405893090121,3.470216638972372,0.5804767979493408,9.082709588114671,7.215500558003183,0.6515275837270562,1.755219481758128,7.090692860799972,4.208805398478379,4.448543385683501,6.2662715369376265,6.469486197026191,9.814230289817118,8.23505325516479,0.4586524984733664,2.8192823426152924,1.620808473970743,0.6426260457831812,2.0060914937448904,9.148136740396648,8.67866140661772,9.302647629636262,6.67507551552859,6.71708721365031,5.209538424155813,9.859288473615162,2.164365538042481,0.5467259935139146,7.689723555907182,0.7827946759086468,6.017322770236175,5.65615738883764,2.6578977327013398,4.059240499753162,7.920862162728741,6.532184205189968,7.186537812792093,7.886521619380813,7.82628012265233,8.460027954148865,6.159013692543061,9.49595482229822,3.6123196077361874,0.6638351349399074,5.571137029855835,1.8292956399688665,7.840810385748855,4.1126857065352596,4.784950788759453,7.0298585194824925,8.824170191122619,0.42518669205463766,9.782550007118987,2.7654878225821333,9.00066179904625,0.5048369379890194,7.721928688879864,1.450261304750382,2.761239788614138,5.42915559519574,2.6151356829839667,5.568320145815953,7.078046848885549,6.103215251985244,2.222802906486121,0.7143349104028718,8.625614789136618,9.761226263243959,2.328687126109139,6.973087786333256,9.104614835030787,6.316777017000776,4.919904585066444,8.416376024334909,2.925243759230609,4.0761764234875875,8.648379491105194,9.500904399873903,4.460850078830458,1.9232314286784735,6.979497422959562,1.99188197501172,3.5644662711796538,5.744923353833253,1.0470414673718387,6.4576076573035674,8.957421410219641,0.6369519144065361,6.361430410356126,8.654500390852341,5.943096169938693,3.3759442132931383,2.5892776916820037,4.9490651953727705,2.0250922076997213,9.433212334916748,1.3271881586630507,2.064951431933,2.803221497644437,1.4447876099387824,4.39541853894376,5.785565995714503,3.886846844235976,6.029590914632397,0.666472290677711,4.382693803303692,5.534908865158887,4.056926012447137,7.401081278117687,7.697352880609321,2.6196365421371404,8.764870858719956,4.542344914897423,2.738164564591141,0.9530754915114814,3.0722737547943213,4.058271720308624,3.7368263520920375,2.462913394209809,8.467453166302018,3.0997072118622038,1.8738203898524253,7.575634522597956,2.810284874286033,9.311572453347711,5.878885323675728,6.604974055263268,8.9777148984279,5.654574805477051,4.323500332254627,2.8386311022866506,9.92559165966037,0.7141612494391802,2.367722255468623,3.7522259821935666,6.117896673871865,6.523902613146464,6.3087682608633795,5.429968530171243,3.6276413760569604,1.5513717551490513,2.580638855259243,4.509306156667505,5.91237686208853,0.035436446774033126,0.09652316603501188,6.210107377128842,1.3925491148987912,2.7447885264673233,1.7747859659919518,8.288532234615255,6.116923154072582,4.41332648092756,7.219591377314904,8.134150815735426,1.3432615918196489,2.5734264051861677,0.228806984111114,4.665109897732851,2.6009158649819875,4.876581190715599,2.6539417819131916,9.399471446463608,2.416889986576365,8.78702727087584,8.729902691467704,0.5074049746673936,7.746661340870757,0.5269464801399337,3.4608592368211744,7.665331746540036,0.49403254543526565,0.4342973532212868,9.909571489815344,3.25934276538697,1.850225827217189,0.9057062514183523,6.2971122408885165,2.59836313212507,9.711253085967224,6.497228070780851,6.242748579939946,3.718884422093729,6.6246019438588455,5.3425030412377446,0.7365591403882465,1.8734683311840006,2.898871964390022,8.658085455562405,2.8952037501283856,1.919275576950774,7.5578895905892685,6.350248827227427,7.360922395773537,7.564165019415046,4.833046316157237,5.695729443658544,1.8314998380737468,1.7076458379668558,4.547215401475244,7.761064087958212,7.935522212617771,1.5996610181325166,4.454082242051413,8.59388131893561,1.1671101707738618,5.898854777507941,8.583383908227024,2.2510492041504238,9.509475402207565,3.3678448236217684,6.833961356890031,4.904630895981312,2.1113881266093637,8.047974154379176,9.490511279189558,9.196762664133617,0.28608288692882233,5.055005875147788,2.765166787911526,3.7638229554627634,8.870109060651952,6.858328948182932,3.130275735058947,9.525725735643444,4.876694008645357,0.800243072857989,1.8072906559693491,6.171246647595092,6.892084161873413,2.818467191728349,7.223051690831124,3.4098633882438834,7.587341628722378,0.3218656866200975,8.77677012141907,1.287461925720168,6.759479090970961,8.23541306013144,9.258148555674461,2.5316254303873986,7.167837360936964,0.48012067775373257,9.696206777698235,6.1646126705074344,4.484563027593,9.248120435320061,3.443328911940351,8.887217513989336,9.317544523403619,0.9537452576016658,5.285023516493304,7.104624100710895,9.432503971350998,8.280170475709017,8.19027666612965,5.177807603842275,2.7564906202883743,2.8508107920371573,5.910671159244796,7.620552143667945,4.280176220246985,6.473022771148392,8.693019334913345,6.192945985048932,2.9165249890674283,4.295290095267639,2.1606315395730435,7.758056415664303,2.082631939839894,9.165382400431294,4.013289745419584,7.778040303691962,1.4958637967214483,8.18731473794335,0.7979938377479234,3.638225352479487,7.575940427628747,8.006873354392274,4.968302394118577,6.2590567058687245,5.3939274149149385,5.006270552847337,6.542984428856231,2.6054062684925205,9.450569860100922,1.081245622107485,5.723385449534149,7.465092840203285,2.410446462489959,6.39957454017374,3.2867412805595952,8.114288945869056,1.392252972848247,3.1323174360609762,1.6391786328539926,4.781991834523993,1.2648979907017943,8.605716086963351,2.9638698087218085,9.208559944671915,6.279501684370226,0.8715851272881681,8.896033953684574,2.594148611940692,3.94492796278469,8.928321304361761,3.863320514844497,2.6816349641705606,7.907029406730115,2.416571374620582,8.16964841780149,1.7054684027793687,4.991147357486627,4.895162357302736,1.845146992585025,6.883139813381652,5.494892716508241,9.064054662125962,4.306306147821739,8.571589981514972,4.92023160778581,8.240047137273674,7.614919745289976,7.557404887025041,8.238622249620962,1.069602341197331,3.664221090913511,0.6518055666647493,2.5874821549877325,8.561646545461643,0.36412180116064397,1.4852237648990263,9.465369063809131,9.32524867283573,8.209643268507044,2.7770835972691543,7.6493287079155365,8.107897949464327,1.6216495271847453,5.08750679427004,9.958093799494527,7.205117102504772,7.296951129891309,1.0991912793623837,5.342764782275607,4.937454379968176,3.5304674934795033,4.138462870606099,1.5780228282193254,7.877948698676269,4.220365450909469,8.878340317796399,6.968594278560271,5.189982804251105,3.773170499927365,2.5096446407778084,3.7022478151559524,2.042863576303331,3.8824170362950317,9.601120792597346,6.877897731647817,0.9251886536957854,9.177377586606143,9.788586006076251,4.728385119866334,7.803643626571601,9.101849250136691,0.3091294141530776,5.20168730957506,1.1299040336566701,7.69822169792856,0.3988576118201803,4.27747169317191,8.837801419151603,5.694983484407605,6.341748749949165,7.498856126381814,8.237704390065927,9.311417439026041,7.992338019450886,3.82734735910639,8.091533259197181,7.101906462601737,2.570459499201281,6.449133281619906,3.85193282660101,4.446462636804216,2.1440165469127015,7.665677922298364,3.065886246808842,6.955302601963482,0.2732104304515204,2.3997391560682435,1.0216070036785863,5.6776739243028445,9.576076423814888,0.9760831058029762,2.5296016309369884,9.904432442558466,7.764368508702056,6.480796449786608,5.7880207475828165,5.2410784529854375,6.137217061760067,4.741313253340385,0.9143811667346413,8.143503303484326,3.3545684754283545,8.082397572130787,6.422587697968709,3.515084313740988,4.090015150388235,1.0269418995719826,1.3067704792080903,3.482484485635271,2.1856697777673606,2.6366111996637653,6.83183001479895,7.160638671394088,6.393733286639942,6.335073300170042,4.6333202680505226,7.800258036924335,8.493820428695454,3.3789397852855863,3.663621753935953,9.048057074336093,2.027879909397199,8.862063609913722,0.768303879742156,8.405744481422325,1.097375712013433,0.7464939657674741,4.41130167929998,3.0281505107838003,9.531658281035497,2.308972059514882,6.817740199525797,0.9586337009927748,5.729822892588816,0.8331515866676376,6.429430728055305,8.643520509262363,8.215663878236409,4.460154202106321,6.80701763323484,2.707905877640937,0.9585891291735127,8.51900519377688,4.681707613257677,0.4565643739973124,8.249156694872429,0.7453444737883319,6.614085901291582,1.6099810616254606],"x":[8.291973082796716,9.667702064498602,7.832051707886494,10.014505422376489,10.4245330621376,14.12885096678319,7.484539453473236,12.753575310658906,10.017291752964452,9.354538575963762,14.830371676035716,9.677269520936346,13.977597404169988,8.373354152869773,12.289491360270208,5.1703968723068305,14.713954831515792,13.154507546965766,10.89094342949042,14.226003360215305,5.415734581967319,7.992219646681827,5.947585778943241,10.270415493985617,9.342970531480784,5.20565642492417,7.820539275487475,11.07841048745585,7.232004506512293,8.994338174138353,9.741655461817933,7.152372831862872,6.347095695874536,5.424275866134048,6.023496582644965,5.635865236193444,14.517127119928436,5.192692713871454,10.282498099272203,12.605662963639974,5.498021547198073,11.919804281166256,10.449234913831766,5.547347040851969,5.786326947493976,14.900010430546477,5.416293961714695,12.573735922196992,13.664123622680705,7.964080627773839,10.034386656894352,7.747912443559429,6.828269775786302,10.172093216486955,8.209540977140097,11.140644103783472,5.772278447264394,10.896359068756885,10.85665243602824,8.914597467262226,11.235468024065094,11.756808643791816,9.091476533788382,14.26144723372543,10.928648975483561,9.66974097232341,13.973159356200103,8.285604468526383,8.822860263320113,6.395847060704279,5.508043712686675,10.323914546704946,13.347848079695734,11.494742223724028,7.396650506549365,14.774162574376046,6.620378988224573,6.820289499821303,10.560868651827287,12.143394019623301,5.083802029928144,14.631416680513327,9.50655151869169,13.252252869678935,10.214033790874522,14.635249183213519,9.761967002942649,5.528434915304419,11.895551770444525,7.30917024960344,9.878800951187884,8.978010393730798,10.32040239752533,11.280800882905845,14.545013783648555,9.928943627960074,6.688361859424427,9.042144076042238,10.557235712370465,8.001154218000337,8.479525957736545,14.049418533384788,8.330087363141352,6.088632997261804,6.797501855927692,11.945965373465445,13.264850089788528,6.374615061363995,6.669990703324076,7.243557816389917,10.145011106264421,7.980215050956383,6.432250703008025,5.0270230359751285,11.300587154094048,6.530421865767531,6.776175827989849,7.718237720725181,12.383173025845299,11.287837698798919,9.645990962418555,13.404500121734229,7.774558823020721,13.21045315146736,12.959895680847161,6.4283935269188985,10.624768733342208,13.565327461762948,7.019914587703195,9.708689531229338,12.857095494870354,9.093336677176701,14.55341097102102,12.512654776546162,10.484257303215944,6.922355267289168,6.239617416100181,10.722406362845948,7.237914194860897,6.508156154363385,14.1813163794892,7.833033377501342,13.774216562922684,7.517765679484844,11.424657497788086,8.770848033652127,11.573616371070884,12.066318338736346,10.196971392340803,10.405143075430026,8.933393368984344,8.295362365320365,9.051130594614369,7.512409977003305,14.132467422943256,12.460548425705591,14.535556150846965,12.43867061034597,10.149353575591864,5.918168117901481,12.100587126137459,6.0120303052724955,11.784108513526274,6.8174247034814295,10.338333629664419,8.385045700322785,12.906594659753292,9.607324446751788,14.48499809456898,14.715649583247119,10.582715208149748,10.331817779519127,11.432657304224778,11.863039623556528,5.543336259062263,5.661423449850231,13.935465446327036,7.608362591428279,6.623240062178953,6.189585349285618,6.736077896855046,5.928264298066816,9.237752309838374,8.936226678237379,13.910676040257531,6.674331281943536,13.188297412407932,14.52632329222227,5.197509341752626,7.996873257755568,12.552348286587318,6.1953702458409925,7.6154423137829035,14.602880121832463,13.837239948890037,10.943703812762548,11.023213323816165,6.688032780437856,12.027303102802232,7.3455315578749065,13.885358690830017,12.56394230485993,14.008898804847355,9.422166968404213,14.551342647754375,14.365621476380937,9.222184979134923,9.210476292456073,7.790377943201918,11.370996745647586,11.09381520013881,13.42521483253325,7.780795324883661,5.178195869355797,6.243226645831235,5.067652093009658,13.898132870318051,5.770799807594416,11.092201967802435,6.001533667369518,7.370803889578001,12.143522058109022,14.239549599662753,9.163397301015667,6.90956925079462,6.993204971199665,11.964545454283702,9.623598000992812,11.864181164294248,13.96663031211287,10.406987934088974,6.833557505463781,11.684608300890067,11.165266851979602,5.316184918454024,5.260087558596933,10.299994961761385,12.02873445378868,12.316702263218035,12.894544652112653,11.209138191062078,7.356606462075512,14.612228603553781,7.609054691731465,11.549328867478287,6.01422706253639,6.838104013936713,14.456687560967826,14.955910548723015,5.669837215247724,8.850969040746854,12.176980270222941,12.125661573600787,13.145651406170275,10.862095615767082,5.395215319845235,6.132014206964298,8.907010576530993,11.401752620896348,10.381253309680227,6.453327345045068,8.762900792195484,13.824965005020056,6.47338051116189,6.637141769844874,11.31398994274644,6.513091954690669,13.079067412607026,12.989421638835623,5.957039851853652,9.750666599261006,9.61954920109858,9.995330598099288,9.25064115595838,11.361395072763614,10.820410718166356,6.324019892989221,5.218316226181539,7.745903156990304,12.937298024336268,6.8367502673552565,11.988255876329667,6.728534568000462,6.392437908540427,7.758289658047628,8.392245017717052,8.641918232971868,6.3946811616084815,9.435945541838137,8.403414903090951,14.027638998612291,14.746146269697608,9.178156485993762,6.728799943833845,8.891903340411726,7.251852736120867,6.9126197205599045,5.648313104358462,14.773789252918228,12.170612444871693,7.175010816014142,14.458815686748876,14.520057254429243,5.740899217403226,11.744717400647676,5.890719727363612,10.02897186848548,14.206599868231107,9.346602627640683,6.601259824813404,6.424783203965687,10.994184416874887,5.839930919291443,9.336324243671573,6.312778099864964,13.423442499299906,5.063258607015659,11.600051926559926,14.144484949816615,8.309060328001483,12.998905379034166,8.586612114395919,13.87554307486959,9.763990007425376,9.491699124330864,14.378271570934885,10.669756667328832,7.590495354162334,13.17462375738154,5.837596593238512,11.743404967987015,8.615572410147488,9.8233554140873,14.349548876115858,5.4472306025175365,9.710166199057113,14.418729903642264,6.494215364376115,10.50615337655001,8.680975706584825,12.909075747144778,7.327170841968556,5.129186800274281,10.272586685836718,9.192757563451774,7.735290834538581,9.194425226657783,14.770966694548608,13.847993417660708,11.474692249425619,9.948823160125391,12.25157407840863,8.294848055921344,10.050504168105858,7.1300911959159485,6.829617417946412,14.565544085556901,11.006292195312612,5.485714432502542,14.482561231420885,11.252362533851734,14.289985625839392,11.221411433828965,6.928994789093834,7.237779744993658,11.119149738715864,8.898638029310714,7.835193872176096,8.382962842940927,14.070007802494992,9.555546275296546,8.16136792109537,10.961919914429162,11.847346413675544,8.850103582741607,9.819606306173856,6.677753940467282,10.25446870206231,11.13804867101106,7.681851390207431,5.483309876929338,5.664961425013502,9.041497543577359,11.102153268178958,9.472297446318574,14.792829722455895,9.720481619421372,5.651523965869217,13.53500095852002,7.323350642277098,12.033540983779092,10.649250021037922,10.666404777855787,9.920320169673841,5.724130445326095,9.32749211260493,10.240185700423115,8.881920217750697,12.880939936616913,7.862329786731726,5.4569101268869025,6.930839747172928,14.432473005252646,7.824248959602937,10.788180762227817,12.252275005889038,6.369299946005689,13.936500609812985,13.24251870958145,9.326332186470914,9.376592591277216,14.335130385745314,5.794081001506592,7.171054609445015,12.240839123154242,7.556592744609074,6.698206357561746,10.637232241079584,12.921341318128563,8.648524779519423,8.29093456479004,6.236907318348591,11.732407400034543,11.52666571498991,6.29071719289656,14.019945153001498,5.105408137756164,9.820767218708022,5.04067485488517,9.661608139310902,13.776184160324437,11.655616810103858,11.856196304552636,7.018444840837537,14.372242161417564,14.348254455111494,8.830311424833583,6.637195756205019,13.086257610163035,7.986860986314854,7.721381441698423,14.896370165516412,8.563060599855547,5.693501850349543,8.975790321420071,5.186924180147365,11.345789750716648,5.591149108397049,11.831560294612405,10.96131564183311,10.020230042393512,9.615611203447497,13.97335586686754,6.68074961926483,12.595919040619645,10.841004527402605,13.922427942284683,7.734676112080454,13.56752108995645,11.24914626454955,10.072777586127318,13.413487440762609,9.052710563729072,7.6520699219573585,8.762059470024257,12.242249687981301,12.561244020748967,11.509293003746201,12.12424931420334,7.092933089818503,5.992020532663814,10.075038838347105,10.475430312516869,7.755091680803103,12.666089505007836,13.944347663741087,8.475505170726576,5.234976365698632,7.652203122101606,13.850668920531543,7.165743191285269,6.894304287299276,10.6840705377551,10.357031468391018,14.651388726048701,14.782777326171212,14.487753028532914,12.111412457735806,6.804634054269318,7.800208929268992,6.721469666235973,8.784195916224727,5.619050873140261,7.5938855583773845,10.574120707449264,12.880157425752813,7.328689173791519,13.251528149733254,9.611148539129355,11.346379402636193,14.732570207992474,12.36156781899597,7.3537533479232575,12.903993677344964,6.954485101380183,9.501396823424006,9.448983220171057,13.65902115838946,11.433525279589325,10.270781705749869,13.227461847761095,6.000938381922277,7.783690321373637,14.239245756479926,13.146915054506337,14.210100670276862,8.439223944493708,5.755957117793978,8.722727010441742,11.4782343557431,9.83251466328774,6.752170911609674,9.989185254035757,12.040771082120504,9.452427830034523,7.440537771203564,13.798502696244284,5.088275600538241,9.660305906667961,5.623478034681058,6.336530726617151,14.391149986283185,12.874445162178818,11.015229659913846,12.237751902568528,7.647454165184229,9.079776910696577,5.150624762309022,9.680169860126025,7.727587141819237,8.236138137589279,12.170107349006315,9.506608315140037,13.199730581212009,6.122098225828381,8.070116440409727,5.090561797212693,5.664776365116795,6.305744718190523,6.921191310070435,12.467613689388788,10.580812549964755,6.511992257847612,11.118603173957382,10.046431519639519,11.23465957826378,13.3082451895762,10.511578326829925,13.37401936332636,8.390631384155851,7.701650867750736,6.449668732546003,13.193051139991798,9.676595738151196,12.852062414203589,5.964709756401005,14.604780313641303,8.984077195812876,11.318509674744654,8.831801641992616,5.82365470918671,8.727702296209463,8.949630274672344,14.217325793828863,7.574940435466355,13.542228590744932,12.296948786045053,8.057349071198423,14.873993045729732,12.30438009205556,11.171030406326478,6.6640531639746525,8.752504391586214,13.888101860588883,14.397455608871288,13.895555393776561,6.171333965236125,8.688072183710798,5.725213441301804,8.613916030061395,7.507763327408501,12.063354881836323,6.941353863421091,10.778822669493733,14.28817546956359,10.056817976181986,14.715042351886664,5.37120835986296,10.98763764047952,6.036560187894504,9.98513861683519,6.767399457943741,10.153221349126767,10.409549653416114,10.172892654128333,14.660223865508158,6.520524443930642,12.713478152243232,11.731448615316092,13.48491139750333,5.870602838394561,10.427156813140403,12.629243074762577,7.687539648677896,6.828997257740859,6.511425009584064,5.625344267680765,5.428916266427746,8.997539756564239,8.659779649036821,5.803420871658094,6.466384922865835,10.109339755294718,11.135801294427441,11.906410377713343,9.039253805133944,9.26916551680108,9.33211940234335,10.141455257520684,5.612912601232649,10.164638622604933,6.731063503346302,10.219383714127193,14.896437531241542,13.18634382763592,13.31279177495692,7.0984274786937185,10.924806862700954,10.672643423457131,6.7562480131682445,5.771359824427352,14.916267111512372,9.967189237993955,9.300928620661429,8.631734269717883,7.229334752231424,8.14251480437747,13.938806230842566,12.248137849565023,13.213903800056059,14.670885250082264,13.348684189143018,10.068579594953315,5.364428339505693,11.477815408051411,10.898603964044344,6.5263799412996875,5.94462814985341,8.963883946289869,9.940410034200145,14.100750554441259,5.25773324037762,8.435448940267579,9.817776482654416,9.617419676019646,8.83082751852191,5.279859468264904,5.499474485579436,12.354921904699168,11.662088467154014,7.787664065713629,12.244580569918744,12.52572940734392,9.270749459342671,9.639420581554797,9.984657973027824,13.62940524807943,8.020392519192885,5.746590120265553,5.196578465463313,10.574096418650015,11.952388625894928,13.30220300732152,8.871443619410627,11.480148540869292,9.287366629165426,14.598548448694931,10.870289950353005,14.710037152169848,9.720983804365954,5.224560179219642,9.887544255985912,13.760373698090799,8.413389839834002,13.66002346379947,11.218988959449078,5.297828080480782,14.11626082751394,6.6279966009942015,12.110087155606664,12.661309397196415,11.073276222725642,6.278367070220623,10.382486321279478,8.154398792034154,7.24833365398005,13.998661247142827,5.353271743614578,13.049799873722954,11.956311572090446,8.508683043635237,7.7678784160734065,12.993136809820564,13.277454380277241,13.314411717674917,12.16628144605149,6.317538124989895,9.577210054665986,9.598583330569092,9.188687294685023,14.238257044471625,9.072266256818507,9.200829913744231,14.706890812360818,7.346150500372843,14.35390651002933,7.436043266007388,14.474077551192849,13.198331033868785,11.010426613892966,7.40138680386657,11.20465154224856,7.91696990005041,7.9866621311937696,5.662348125797687,8.430344177996634,9.143730950293996,14.25144852311955,5.899099886500842,8.507784377786402,14.039347860132814,6.968041566475893,10.501531804231925,10.830765022061906,10.864011249638086,9.504973512712802,13.817592031835169,6.049613506230598,6.811009100722629,7.935567451857828,8.714510958391967,10.922944407888902,11.557077255964908,10.042462841013723,6.057237911701683,7.0555680144056065,10.089016026080117,6.2336030022134,10.6166361304381,9.478187065289047,13.133847214663463,13.021068523036664,9.897627884736227,7.321531655997688,11.161795408273656,14.24324283235311,14.489913346514562,9.69134083328423,5.256993268676102,12.461704179183045,12.848715137643218,10.999204236127301,9.271714426581992,6.177015123338818,9.800741433018738,11.544534664650378,5.508361823706764,10.141588398246089,13.062099414726372,5.232520605792324,12.421754233345585,6.767698562886977,6.832981175553703,6.17947456605433,7.037311535084562,8.289297899208062,12.230047282220784,13.465974888432351,12.973555360295277,8.82156213082531,14.496628833380944,5.8806778906914055,10.465706679473083,9.884555512959249,6.717700345039028,10.963417661363142,5.675604412588127,10.500366989456364,11.739462938830663,7.57700079735528,10.838576720368247,11.287243369911831,14.732817194515302,7.1849452943051,12.36257577494487,9.815429526623685,10.167555291622259,8.37388535934364,11.878334033142783,5.465157447385045,8.559075547401312,7.252602999705687,6.486265899063772,13.831966160288884,5.6683968001248335,12.42748304596737,8.188243422527776,14.014833346064046,8.529457779469599,5.746183475318798,6.749410078770848,9.679675991649855,12.444315635420605,5.846714921458041,8.982793075740162,7.914037590413039,5.667136251795258,13.526298688965515,6.887067319746436,13.543857934396117,11.572862476337791,13.710932863021952,10.73478803652252,14.367312687379192,6.925752321778116,5.019622454545947,11.612803120356753,11.585736525736422,9.271455544397211,6.376003729839694,11.329970343539761,10.378173410742091,6.952811771629186,6.401451238239934,6.966364966602723,14.769350369154717,8.527879359251187,10.547644917021737,13.493491396968494,14.342707873259977,12.492533030331924,13.00955293382575,5.5258971975792415,14.86698842286372,6.039681789809022,6.092129704731743,9.623458825559368,10.7579478493155,5.818943532383152,12.716100969477868,14.969302279379384,13.67439139844616,7.754904620284451,13.13679838836148,9.574123788751203,13.896847346094209,14.46474698488387,5.8517018161782826,5.462487272813112,11.464044029593722,9.50775255441962,14.134464516937651,8.621685950387281,10.587588167735081,10.673815228464347,9.031031670223939,13.04498735274641,5.097443627630483,13.029884683743669,12.809896142210338,9.443786016298546,7.277681714224582,13.758484316307186,10.613675485613,11.563857077262318,6.312780692730422,7.153333046711596,8.406679406900155,7.78681923200661,7.743021231993879,11.942714250944187,11.263311420410108,14.432819561032746,8.404464329487446,12.375806891378234,12.533050095942729,5.718780440930007,12.794566452373097,8.964192115219094,9.139692817719586,14.394788246827726,10.267345192474476,14.907928208597932,6.102536362740619,12.619443601770406,11.980842071125224,9.826265598088389,10.865149200305629,10.310125093133156,12.122043783994789,8.554799600062582,14.12758470484102,6.5258205878611975,14.201294454311945,11.556364975429979,5.137745258380255,5.265832403840543,9.093918521937148,8.935407281191189,10.252790009349322,5.241797765754184,13.633774733340601,13.275357947736815,10.596851877836848,7.474550104246713,13.88728011018518,12.0568752604192,7.968782318519367,9.540640569923733,6.86636760549403,13.408805798188006,14.31090840017106,14.442813030099797,12.908415232293386,7.671912950084543,5.461979854737735,14.23847423365186,10.604561566918825,13.083367461880805,8.32169937528564,6.725245292145257,8.945760528162403,5.098851592956231,14.540850696729423,10.55326470886457,10.557965800404377,8.001576108098746,11.937259308625492,7.766567747989395,14.617958329554675,11.108823592009045,8.881572548743616,13.27699273127116,6.212140484826126,8.445206887626,12.756885064915283,11.656853396788174,9.252607868581435,8.433973633517384,13.942400384422804,6.729322349021112,9.42716600780512,5.724792677353864,12.781189541002547,10.935206249707068,7.105388273973759,9.462854631897613,8.987629593024113,8.425386680465099,10.908986899513753,10.002211468759793,12.725036540574344,9.552985798238014,7.656831112433333,6.836361827549728,12.932381859559353,13.424637735724453,6.453795611605136,8.326483887540839,10.183138779554726,7.1271988039099305,13.71072805383093,10.54748860992067,12.988074030170013,13.241349480420464,14.286707478254222,9.564456306515261,11.977819000209562,10.491013337597757,6.492461043847532,11.560542020877218,11.518844737743628,13.589444665254566,10.323700276696673,9.258854339567922,14.738877803054,6.455336002896379,13.64796937411134,5.99498821354854,10.771665263177358],"s":[0.5620924899413304,7.500636005161693,4.360782480150962,6.702721502633664,5.67923347492179,8.855154972594097,9.506041807474883,5.060804700402926,8.005520861252474,4.3942878664134355,7.316187479580519,0.8622393207636203,6.0870978172400125,3.801004155882217,8.224160638774734,3.340188641492561,4.760104618130974,6.872561550293856,3.7677456469890758,8.78841710631232,3.929043855785339,2.437403895724759,8.756960217903117,1.6995410229598318,1.8201134186091994,0.4470111938921195,4.635009320913063,5.733791987065748,9.312230475619224,3.3427444196014644,0.4885771867680755,2.5261015716906554,2.102097365753899,8.075779302297676,1.7243590312221357,3.5612173014063275,9.544141493099543,5.932065818228969,4.450629192124818,6.02652418888967,9.557649814534022,7.251661898498352,4.9614939212959115,0.10691440703766819,7.1474547673730875,0.0075257315167420735,6.278262755420969,3.7643257551312947,0.9908006541061876,7.15343781146069,5.126747630114741,6.6688345571122865,0.0668065628134884,5.844731705965742,2.240262245319531,2.907457070561177,8.122344964819472,0.9441866938781351,6.023027623600208,2.547095833973556,9.37768904540098,1.709110284508093,5.009806420877867,6.718809821599758,1.1113149234831,1.1466600400291083,2.2687606749403066,1.3239580495797676,6.211052196967312,5.152432627472814,3.8691315512688873,6.648680436888432,2.845143842527942,8.275529435829437,8.580528122806149,4.0622391743064235,1.1256356935231793,9.838186620921913,3.8572781443044835,1.4102260839640168,2.1072849721201314,8.042957855843522,9.352769421684696,5.806411197556065,4.658364989091162,2.8720226597522336,2.0447830109026865,0.7276341828136546,9.780273906311814,3.086720167898107,8.914379305201795,0.07184853785235923,6.103336914616701,2.157948672322527,7.156951377064469,6.038960889481366,9.223243127988736,4.637659417139832,1.4612332575344578,6.965853476177067,3.6109619349270927,0.6211505144100449,5.809638799416801,3.010683309104072,7.971118049141861,7.041648395519273,2.061686281531918,3.8510734557900372,2.168996373512553,1.8296642315435374,3.2374575256114513,8.667827778077562,1.7199533487864094,4.140918956483455,7.112124124364632,8.939347351752353,2.950152707326732,1.242498735315991,4.193191089625101,3.655865266617353,2.3722066809634867,1.0608853443419775,0.20617630556725164,7.0135153334249,4.663100606226845,9.122226188825556,4.501486499273295,9.384884614826575,6.794420362704643,7.359988362480195,9.24644838657006,9.197801477799015,0.11225953795827026,3.3844279622600504,9.929741215806047,8.026102058111258,5.823467383080523,4.329996362680982,6.5035399345074385,3.1506569393693873,1.9167748536769724,9.843648536275877,4.695762588329089,7.6174328109199045,3.3757742804393387,9.910481963268385,5.109711358456233,0.9751194908008287,9.547666371557625,4.279355456327365,7.085734182369858,5.152308863551389,8.857994083687046,1.0902639902391598,1.3396956772609014,8.841789598610376,8.574352304751145,8.59952067629277,2.9089221544379273,9.28202496581654,9.309204810608772,1.1353074937704055,0.5250407444205085,6.7311772980876805,5.0967387322331525,7.357956578261384,2.4247546949713006,6.541749382459203,0.32856989893821575,7.361563203732522,8.622628342555284,4.108930892805958,5.508782382102515,1.4379656252984452,1.8924804402472373,4.650711587690866,0.07704899014705946,4.1906190611152905,4.288378572466478,8.914251395465651,1.680253604078481,2.9282385933344557,6.075309906582365,5.752040300013757,8.499250833215319,1.8664502786342796,6.003254217457172,2.977151217696532,8.786533246445767,1.0877697041833656,9.189302636161452,5.996927209345218,8.5439775358566,6.0511552882185216,8.798086061654173,8.488537932098168,6.830473692085903,3.1605800057840883,1.5433613127819323,5.640392535859942,5.632216863445656,1.0706877435871975,9.072428308052071,5.721501026563834,7.680137574115067,5.9390483622926045,1.3864835421329813,2.4142611486661503,2.806115097093278,2.7083736663599756,3.8182374279488185,7.440776497574186,8.518912944770602,9.94822931522245,4.058845966362064,9.202659974276752,4.8439615372184575,6.164040634994759,3.742758060153877,7.287934024463296,9.856335046016056,4.140198805080977,6.537931026564534,9.89467684753901,9.022437084082105,3.4568427727812856,5.877741209140028,7.778036348468227,8.074379892670208,4.837082641837656,1.0299606731590205,0.31489521678721877,5.837917448989193,7.307921115967799,3.392431316864426,5.867498975533676,6.114437556776824,4.1351910116604795,3.5282628966334895,3.0074663158496295,7.587210081536306,2.000734972972822,9.97758690430805,3.8804741288858757,2.4472112234678556,8.12823517754462,0.9167401365892314,6.849693139911355,3.0026964062233485,6.378347532684147,9.714941601549372,1.800767654535158,4.574518292225838,0.7389431935675739,4.038773553855948,4.247240571908075,4.235477403111842,6.466089864755579,6.061352397002531,8.90280573508442,3.959624962702526,3.0313631218532033,1.2155584790172114,9.425622094025801,8.290396622957683,7.724510657950856,9.61789360040184,8.37509221525881,6.6072159305859035,4.930826200670078,2.8409368176539718,1.9704312750049424,5.625956313233631,2.6971386118117535,9.381908028835378,3.1706475179175952,6.534584630713722,2.2929885760689506,6.3901694266461195,3.720326291967977,6.265832602822137,7.364507740190747,4.463403524442324,9.46616641632215,6.43323529528274,7.356345835217648,9.616943482618511,4.554066963560441,5.0235128035888765,0.7577745705183792,7.343172197772034,3.6850405266865693,3.0724885644270583,3.8824175920039994,9.496255969780552,3.9601769924495867,7.890685398885921,6.175799420166896,3.071986503926689,0.5966053557590345,1.6599479724736277,7.6839897227026555,8.751974548467498,1.8284373018615097,3.6017263151083045,8.65976127323794,4.36343471410058,1.8163708813173662,3.9686415749369552,9.482659320764233,7.684539043928035,9.803510733979726,2.2995901086562975,3.921657095740103,2.0468952959491493,8.729159099907196,3.618382194643368,7.909938261867566,2.324739748928033,8.489895126889772,4.9062920716228176,8.792351590535967,7.936767231134169,6.969691530930879,2.8906065619126986,7.092213593718406,9.178289265667583,9.146730442041623,1.0523540928166386,0.23280594662107523,2.9392884214138904,5.642484243797026,1.7906816098306,1.7391692686659743,6.266931991192868,4.624766353589271,9.67485627259469,5.890184286870202,3.4727409105449447,6.305246023672797,5.994823339603641,7.7224742592343,1.4748050268135127,6.85698744285917,7.371578168876072,2.1831151587814857,5.627345376996164,0.11180822292929715,3.4535212612120536,9.340370514499766,8.01431017770062,3.3664922077129034,1.8663584775042263,4.402671525493076,8.398549512600574,2.707637750189249,2.9891165860099167,4.310540600650439,9.647798159144124,8.423690356439426,9.15203345316491,0.8394447926383886,9.613405346612486,2.1225886956169626,2.6085136395330477,5.49778367904338,4.1983056612508545,8.062749921551031,7.3849252601069555,3.8069323915101028,5.462050496860922,8.40043699291959,7.253057836798034,1.52320897478893,1.6134309219687215,9.008973600624852,2.7644145175049095,0.4334702987894401,9.749980031557934,4.964610956969777,8.405142528866918,4.674171108779202,5.8759135957404744,6.726686156766945,7.24935507042747,4.454438767062396,2.0626519553821687,1.3501999841821455,3.4924581583506953,6.184723702069894,6.761951936342254,6.573030326167279,1.1159864442000744,1.4262446159024678,8.429096908284745,8.184095360683258,4.797564272928117,7.852601509566373,3.783073581856018,1.6560440491960216,6.478886986212737,6.758850092658795,5.997107590751627,1.585781284864114,2.777718252077932,3.7372570474226396,1.8344109972315437,9.781825148830112,5.466945602281048,5.902044713452965,9.15892844156312,6.7653999257806685,8.154398295921272,3.271283256151283,2.670768240702195,2.2101906775604263,5.347042645273728,8.303047402314496,3.7820815080862746,8.687511781181929,3.6934377388373107,2.519642385098786,4.508120802592577,5.4175979808457875,2.6635888576590716,4.01783478076209,2.4153933943780093,5.844334416979001,6.224398525550921,7.543692864142795,2.373942838026293,7.098735999433172,9.73570996930347,1.424808096155139,6.037335317586896,9.518749479538915,6.482108679425109,4.603780931295853,8.56093828746686,5.361279135049413,3.1874753951830903,4.94149714876322,7.3443006425525965,2.5768858113656345,0.8720067668062126,2.1546644827532146,9.090636595617529,7.201663592024799,0.006603952987860318,3.6486755341482358,1.5022764224199014,6.627653191978739,7.542106692872812,6.200891902822279,2.8660989270266968,4.658662810259068,9.160213399947185,2.652299651570693,1.4968091501708902,7.871377475374606,0.040403896807572615,7.7861735788048225,7.096540672709297,8.39087836625177,0.11108163888104539,6.334430693805535,3.1746678714979937,0.6603562766635718,2.477317971341264,1.4898218095456395,3.409418647335918,4.798683727337753,4.635980459832667,0.40904279584401904,3.566004591358418,8.37256440984018,0.41926913352229755,3.3769474109659914,4.830517150757494,6.246075422617556,8.43229213619572,6.185607216227975,5.506264579553131,3.2898721452537205,3.2292852233181124,0.8616161627942187,2.0160639792998847,9.757374471194375,6.855258867156781,3.8275622847036606,1.5097758108233084,6.726837888655246,9.959068714023005,2.0912137727415225,4.5971005672144045,8.051734334947529,6.421800826663628,0.22012244112488144,7.199082488646475,9.828485599349886,2.639878108299203,0.9935715703575587,2.6230173156745806,6.171771815487219,1.2774118753971209,7.2740349888008415,7.559894879083986,7.446838857201388,4.479694504720166,2.652774378463576,7.291900490586292,4.9961240620255705,8.708592793485863,3.5633137660005088,1.062397460825204,7.50472310613294,0.28892741221870244,3.151505035959936,8.963275203023946,2.3637385836463154,4.081930600927615,9.66173827505687,7.039737560340022,3.1086122350623846,4.866633551253328,7.9613730188619165,0.32917260631172285,0.48789735224860964,0.8358948576410752,7.515618698194595,2.797356155747446,3.0239149603068505,2.1923247231345977,9.269082462186152,2.114207996161399,1.4005409411954162,3.64890798876347,8.029627647178799,6.161352234763891,0.867881843123639,3.5805341064167417,7.388874403395985,1.7523591870646427,6.436027521139492,5.4054402062303915,2.755072890299415,4.657584253246001,4.3469790801377295,3.689285032527161,1.1583187599474254,0.253416930293513,9.02724971824969,5.547966395205575,0.04773511243294504,4.029261271466904,3.0359054999021695,2.096109887020068,6.2088121506091305,3.931665220103482,7.926875418350798,2.008929140313993,6.940405089361796,7.9201398391591145,8.35687614501851,6.737952844871186,4.654313101329166,1.448963657014235,6.842644718448538,5.187312565767124,2.8913187096724213,9.38705644766793,0.201113553297958,7.864051140730601,7.128470165876591,5.7273172205624405,3.5578465381182878,4.73708207331123,6.698848017692707,7.41922593499047,6.632924459525141,5.310224432510444,8.501340488004862,9.462547187788836,8.986061650837744,5.400521727489201,3.859154768086659,7.411517194158883,7.79475841483846,6.367019506990312,9.890892493508456,0.3869854317218069,1.6032317101338456,7.947399433985691,2.12799372384749,6.307860514507839,0.5397595021368939,7.609576242764331,4.320637241052836,3.183413047558048,7.697912671347941,0.7840357571764756,6.2274729875070145,1.8929506131844365,3.974627417186325,6.2336436968133935,6.103638181594508,5.022906046492055,5.329031872118366,2.939920335470003,0.02859209617299241,4.922273837726783,5.78804040151369,3.9421435818958606,0.41807161257456205,9.53021110694712,1.3622415500231821,8.86700865018856,6.705383376661054,1.6174148273067734,7.014547134659392,9.270230750251429,5.964312572661507,8.980706574825039,9.995149284438828,3.2714564126844214,5.9231901096199095,4.638221815294916,0.7251169521836021,2.1775644396422478,3.4429508217330063,5.183001983038913,6.5780234746077575,8.734813174760532,3.159923651952996,6.1447662738726905,3.8655386747851828,2.571903007396421,1.225449025257428,5.401608400180273,8.475920899104349,5.171761487341053,9.278046932918704,6.6889931491734895,6.585988204344448,3.664744876198114,4.36023808161168,7.106002926750435,2.8317113981922315,1.5305206132825733,9.96333221677624,4.820842750177892,4.510660805894711,4.875799015847992,2.3186516025675674,4.704109197793014,6.743596820902713,1.0540888964463657,7.986736124279807,6.175413882801406,9.42691420616651,5.371104735639798,1.339346109272308,9.350173447345153,3.3058110317760048,0.43890155004733256,9.709971582819762,8.282491697973386,0.4241824256456006,6.205387605430801,5.913338640875454,5.259197624769573,0.035341198106684235,6.7324151069522635,8.418135026568471,3.7662278351708856,9.534232713067299,6.181243241631799,4.847649228428496,2.1769424882852473,4.4964744711866045,8.191084280682423,0.7659020812708572,6.583179960286463,4.988131880557489,0.4690547349415386,2.871171410411706,2.395382921476299,4.785258970374928,6.74401594845272,1.2135477488037227,3.142212608353687,7.788160684637355,7.489281747111365,1.8416770117615444,5.725804818970821,4.628561336503392,2.8670069684935617,0.838270689559284,9.537527673815676,4.821463423190591,1.9171355531520184,1.026869691336354,7.274256518914564,4.783579476717554,8.136857401680746,6.614248030953704,3.7520653743172905,8.475824089710821,0.5514123944881466,0.5060271979114939,0.4206654129316556,3.2462245839965553,1.948078939650446,4.324122059066491,9.386518194498867,7.3479695488143815,6.996711590176128,1.9529557571572131,9.500658055180388,7.309432574824866,0.7740708772463045,2.05960072289203,7.086295052541162,8.941947834526555,3.048599288090297,5.621783417703432,3.5557547964286673,5.147322486179283,5.136040135222233,6.438212325443164,8.156519797487496,2.54166509195074,3.9894289885706358,5.099015909035936,0.8381112725733564,8.443527260861401,2.613808193954865,8.44212310115153,3.3366702864699915,2.419011101229913,5.814578726122026,1.6369500858639285,2.706658947394349,3.8608031177717206,6.256460462336422,8.344307756668425,4.8680014051263765,8.574426670695978,4.917015007648344,4.224852167334441,1.0528233657646613,0.9291316078884537,3.8867295242343447,8.512325108622152,1.4343659295819244,8.54139353417436,9.71693786401218,4.17288140421727,4.418105024083907,2.7023701779133513,9.954711772426384,0.27717759689662946,5.169725211932823,9.628357362660232,9.578522360662554,7.33227258613452,6.174490372599582,6.1515488017034725,7.946367521859794,1.2353821875745585,2.2382687501962417,1.4472886943563412,5.529381586770259,3.7133635342869775,9.603475753768384,3.9881032728494947,5.988732766910236,2.4213256251192905,1.734408916497443,8.907590869383563,5.339079552866739,2.232005791876195,2.157132152465251,1.7514217865741943,1.8612432575542415,0.7193280804680224,8.920954076438907,8.667274777307297,9.041698896810427,9.88602775584768,8.70641872851066,6.724520895849575,0.250964479851854,8.199333604414447,9.7845376211346,5.739174093418303,1.6051283227486501,0.6192704407147498,4.415928526189394,7.61841071922553,2.4293845110345136,1.8949523552367253,4.949197155514991,8.889271973435092,4.830363545350858,7.177819894746779,6.4800605792989385,3.7269210321167634,0.6628433902423447,0.0018410896374199126,8.785174244065665,1.6986394734504695,8.108775679523042,1.382882135285024,0.7106476906216974,5.540532880122482,9.76367589745708,2.0160342962064814,8.946846803430756,6.296710027469016,3.9361544685315697,4.0273128752947995,1.642053198510669,5.938537212345176,8.955654903087968,5.062182872114949,9.334868949697183,9.649148170972126,5.695148872787435,5.20189427173632,3.9777026856297337,7.458884744353198,2.012378371773391,0.808782218183699,6.714490357903802,8.137863571140882,3.3116130516619235,6.6974675684724065,4.075728937388778,0.8804192207806016,8.8638445427568,0.8881046873589771,2.7514024363967193,5.205330749442247,2.0681958846070225,5.0182517961961315,7.59678675748674,5.6659834489606204,3.0472692530247025,7.200116736640442,8.877620137495335,8.674552448067328,3.8874947636686485,7.9331588434167895,7.255283613247567,7.704948777508536,8.786469956779946,5.241427212054699,5.726370730741717,8.73989347423966,3.802163389164417,9.987950230549718,9.02900064812118,2.978524248370189,2.6106150497111535,1.3087947578322412,3.2666930894806834,2.1615435765212876,7.76301172466516,6.75140241701389,2.962208531312227,4.176884903939763,7.243718214330164,5.998621510833022,8.71024630476456,5.259893845783193,1.7989508363724682,9.943839565544035,6.901409186091643,7.7736292816819645,0.48322681477865226,0.019860709135191,6.838575935543664,9.310713398271526,6.266626886999931,4.519833725702602,1.5903855700866099,1.1039583982600054,8.615149433693647,8.442821457366785,7.552728650610396,2.9079174896844373,6.030679943678363,1.9052808261121967,9.844650983627158,2.0652933653157457,2.54304994489581,5.071096753794267,0.03820631530461416,9.444708446678746,7.976129034702457,7.309677602563305,8.780076896846536,6.247362955103477,1.9824747353645233,2.8034158884431437,6.212589401374544,3.713890745264903,4.564340847498023,5.211363078232356,1.6885584641851148,7.544403962971423,6.826198301789111,9.700675005684271,6.981461879053135,4.001260744379403,2.6700996828940293,4.348934765887373,8.504763431466763,1.4136525254775312,2.891887577863992,4.48325022343075,9.455272641167928,0.34620698092369784,1.86599604502939,7.59895761773921,9.011383992697972,8.130508428325431,9.470651872975427,7.467666571139779,5.205921351535336,6.04543217718827,7.728888817263253,6.02855766512617,0.43221479353361847,4.499743793892968,8.415006168868914,3.430311033083684,9.211743560700947,2.401553677463375,1.7852435022996205,6.470053988716026,7.652799729918676,9.787010182473155,3.2958997265377765,3.9636085706644963,7.604436377748966,3.2783199279131336,1.3650856429105063,1.9038803422691686,1.1022194394993945,4.555945565413005,6.434238641997762,7.643419445075226,6.155506410926279,1.5182693790477186,5.177421477838424,6.835131695907187,5.5660888019721355,4.469951780010641,6.955111543008332,3.741481949219072,7.653776002824378,1.6489171621150955,8.382884424169648,9.811572535335046,4.50881748859119,3.7183147566816044,4.2572271215282935,1.8398200922416796,1.3822302016819887,7.530994515799958,9.194228133996106,1.9482851339002982,7.50527100308207,0.285570413308609,2.2829346175481113,5.146810157096342,3.309255078635287,5.660394600061613,9.2825787593607,4.5026169799910765,3.737668659765898,6.692775102633397,6.607593035274595,7.857665753478589,1.9053267394258788,4.857188880681198,7.983075862091997,0.4159042105306976,6.2660056869072855,0.6248187299799834,3.114513435966657,3.0529992941704953,3.455241077086826,4.6418419052596676,5.665178958943287,8.961892945092284,3.885268976280094,6.949250288736149]}
},{}],23:[function(require,module,exports){
module.exports={"expected":[0.05516838539341731,0.01756398015026437,0.029399859292782334,0.03283062570852646,0.06455782763030858,0.012638925237601517,0.004387497783296571,0.10530175045862475,0.025169791500901734,0.018371658708612376,0.03133513332779989,0.043459802841319825,0.035486561532770855,0.03729060739375786,0.029343047350977848,0.016461147093414084,0.012082038483580537,0.05020014751376911,0.028062131770948264,0.0021974227059298026,0.027009558120088113,0.054519571848279366,0.036774200386687085,0.05903193335511733,0.03240262101611,0.007929972944016778,0.030163049975729116,0.010794405918700383,0.016039754600975963,0.01691041890586603,0.017326359006880267,0.05453142070210892,0.023605959624547736,0.002330995299427174,0.05277898011443247,0.004939942640023551,0.021889000353336574,0.021816925153459014,0.01749469350102691,0.05830972569064816,0.03393338171944986,0.024046248614578103,0.033968245959547526,0.06934197335286207,0.003113670828483437,0.03526181746812558,0.011697732766592243,0.05081349565243931,0.010909994978695416,0.01103169261587122,0.0290953333441812,0.027000277910508172,0.03044076571929005,0.024946349744189657,0.040040542964086434,0.017693560861547438,0.05872193267629904,0.024016782043589136,0.0241049309168984,0.058437256650227906,0.01825641250755939,0.036497782947248765,0.02512649914991303,0.08467329312948083,0.0711492815195931,0.036354375253144514,0.021622472659634587,0.02862784394218524,0.020944305764029936,0.03192177828215377,0.0024729791441636013,0.012276909356055216,0.05580207145359194,0.0026908837358439095,0.004515631931382673,0.015275743470005638,0.006745549226192797,0.056554729001628556,0.040640217914108726,0.00317013877159052,0.015707438391610234,0.028545946542574818,0.007647435584671772,0.04329588315365017,0.05926128627796459,0.021614787129152782,0.0010381933140423685,0.013988694527668669,0.03886307814993871,0.013058577569182217,0.028886336775081557,0.021167736744171366,0.05517021975345888,0.014519285702825466,0.021023839349823235,0.015057672360623482,0.042491017829243166,0.011906263355471325,0.017438645967443548,0.05053211438787914,0.011715460115523494,0.028299217343164824,0.13491765657987784,0.06061882366515352,0.04017153206003381,0.019725600732226452,0.026139426688106718,0.06330647554837897,0.007865787731032298,0.043282929290537106,0.02194985441540882,0.018236816096905167,0.021601184362406448,0.016090610689398425,0.03578405676064382,0.004682292723410019,0.038994459617757396,0.011674425696029016,0.017749010637430177,0.043898579437309564,0.05879041608169041,0.03815333414223487,0.02426954851724748,0.02485076339758837,0.013166280700303148,0.023960753567891728,0.02598942967934216,0.019446588097917362,0.018461708418790735,0.0073560625562918225,0.0053432421869414135,0.016539951344334197,0.025837456430533,0.050682333966283064,0.04647595237347428,0.030390606853267346,0.014554668729199992,0.03157111852412462,0.0013784116943710305,0.007329371820852924,0.02237494447516222,0.029822786181458043,0.04495794015053993,0.02971854395631087,0.009905208089223357,0.023770514869844495,0.0949567736366369,0.013038952629733841,0.04729451573007039,0.032426450061315004,0.05268080257326518,0.043560804080783035,0.041458538903064446,0.015574482384578255,0.049281068742754466,0.037041368159870504,0.05489219672167801,0.03493152930901226,0.004156336292300082,0.028454143989097014,0.020399664271339088,0.0025149303845013364,0.052435472788022686,0.009061446315521476,0.0065620575175137285,0.03201974972179639,0.013510838075108248,0.013607146367038012,0.07039326771562636,0.011513683810435984,0.03887096578090361,0.12827356770951748,0.03495709239618867,0.009961549402318994,0.015983834198006322,0.03852969943687677,0.01703779001650417,0.02155136418466527,0.044135690370752406,0.01644025095749311,0.0008009829578447889,0.030998143914003233,0.01885560807113798,2.8748084236573995e-5,0.05756552600038933,0.00784579380192469,0.042552920816277526,0.019973446040837277,0.020127204859027366,0.022650750465686674,0.029026476600680137,0.025365882078648934,0.029381789505457882,0.032544996943406554,0.027387496897312978,0.009663558187594653,0.006641907185633973,0.03630052988893307,0.03319113019828305,0.03700184253428038,0.007146914836289466,0.03004613328084743,0.024041867860908575,0.031535243937353775,0.027279402017971816,0.03545962526463371,0.0028322729890963017,0.04392407513338352,0.021607892009965872,0.032550018920148076,0.024314618383194778,0.0331934407633324,0.015200162256794674,0.001896892886283782,0.0020571434355986344,0.001828426038123112,0.027624091447011043,0.020489977016973127,0.060539626155162514,0.02244526720201661,0.006398527740812175,0.004654901693262543,0.04795987683070954,0.011778734130481439,0.04652957898148899,0.0006993022138778864,0.026119212882821173,0.0431500702763268,0.016560231949667516,0.017608098813174322,0.007756152603801235,0.017274190249455354,0.0367236633240601,0.03226747839299881,0.046684306040038745,0.031240170804853692,0.023299313995269046,0.022584563124587523,0.024708329468979016,0.026312788444700447,0.019229835557848404,0.025158022571311077,0.056149573886797824,0.024346337430750632,0.0013155852956125424,0.0021038567794942837,0.014638061948915176,0.03773482126126401,0.0207922382696849,0.03962518587343454,0.03686460435493696,0.04934572165130129,0.03690940935994461,0.029485607226780813,0.03941798768946915,0.02856983233619602,0.07308505344768165,0.043676165122081646,0.00023982769783303012,0.044283727973715374,0.07944352778291547,0.042348532591842285,0.008100685601400471,0.04528338647420961,0.06619355100936355,0.008770091739378094,0.06875453459078164,0.016575182058924064,0.012950396006311845,0.00026140211176879744,0.019918682659521292,0.019545346220099027,0.01951360822260931,0.01957527984837071,0.0228328460669416,0.047977120312774624,0.023634084435371364,0.04285095045843763,0.009946293379576053,0.014712907694152805,0.0002938824286132447,0.03205158739957055,0.005165916814087294,0.028972489434707666,0.023708679310575787,0.04003435093751087,0.0029759683016216142,0.005096085485509182,0.027392127820927738,0.09094322776858359,0.00822383965243088,0.038320185759232725,0.03332940370757949,0.04978830802537572,0.0016669390518903458,0.053040233893187766,0.044728648186524014,0.0011195028054955002,0.017189226313047614,0.031164640452625493,0.031160714787053713,0.004303520253365366,0.025133435312110437,0.0024058709140597663,0.04246757073275039,0.02972163007427596,0.03851478926795044,0.030185048573239896,0.04336625905310018,0.02704239136527373,0.011762661823607568,0.006187404657824356,0.020121620744316858,0.04899019698475701,0.004237085636863673,0.010757018649938645,0.028223007016708743,0.04071184897507238,0.08675937604303866,0.016779585007506488,0.04154489480065436,0.00043649487748481473,0.006754944048949212,0.009668862797176965,0.027808975974065276,0.05889039730204047,0.02814876428321781,0.018563233560176213,0.02789841006312921,0.043651400753235356,0.014752694583742025,0.04328659685954847,0.03284934713887323,4.38630536213884e-5,0.033464267082257415,0.03272704969650502,0.02923008409808262,0.003767638810986908,0.0014463235140612422,0.007724398788662843,0.026600098254231146,0.039716730327390586,0.010343762953169284,0.04440848037519038,0.030836464120783644,0.010688466940431416,0.009779820580636357,0.047572385504317194,0.031299507311585074,0.045737145495911596,0.0022012656150767816,0.03999283287960399,0.02481457787719047,0.05150362471832054,0.05588830021666312,0.020571657103914873,0.016526806353164974,0.008644687013043332,0.02819413331505293,0.0290244090830415,0.0005133732923912331,0.014383449501694854,0.01674994015385745,0.010261149805135743,0.041746781117371685,0.024619093263325537,0.032838135301507164,0.0018651428541698642,0.02583236683606254,0.019085651060716607,0.02390014636923727,0.08116939698709846,0.024489733972970863,0.040039559069342416,0.0003571750314851707,0.016232091048817586,0.05285804348805648,0.032723188159645235,0.07730344338428533,0.00016815130072027882,0.057975023944830645,0.058142842894696754,0.027080586736036145,0.044682647730803327,0.036027531712939605,0.0023440637031597322,0.04095007257936727,0.05124823276978215,0.03951844051932669,0.01650858298453793,0.02467588197113413,0.004559250184960963,0.04497252769760741,0.029948095004357644,0.051153470181839154,0.05901183949422761,0.05560264215524646,0.04369627237244195,0.0410169630033245,0.04859999068027626,0.03378733173253899,0.021313173246956328,0.02630759611454685,0.023158445934655526,0.028251726124710132,0.0063772698340903025,0.01259799921897159,0.0317419920553993,0.01286123875614753,0.030231954537543685,0.01056704720028287,0.03870733762286233,0.07135426002901636,0.06970001718276532,0.01983803028100024,0.005027660855153816,0.027210398773591202,0.027259495443327352,0.03264755238704363,0.011722167548231095,5.38216586190407e-5,0.009001678410886386,0.04825268255636883,0.033139415585493,0.014010668287306667,0.07907282409393578,0.03197730985242998,0.011401645751101159,0.019627551989787335,0.008021777699494987,0.012188388182944529,0.03796158834279886,0.04385108107568114,0.08121809240711236,0.01448764416351258,0.018062384784074226,0.04122938175617169,0.017559053016804615,0.0388505206418982,0.01398210111077597,0.023660464553873176,0.02271999824254657,0.018386750513500288,0.02328052503388168,0.03094363870297127,0.026797804842037642,0.006408710456717961,0.03451956136761585,0.0013528724296131447,0.03578547872728227,0.020841432187530047,0.056119793710997595,0.03527812547796366,0.013350076233373098,0.03042455546252939,0.014120377684247351,0.016434478274570195,0.020905081802149554,0.018989119652005698,0.046176413649996265,0.03612650058234869,0.02859770759579744,0.0455320724458299,0.016718713789203112,0.0063552566279758485,0.0002933066412147848,0.0007684614231199733,0.02761919158777607,0.05480734062541477,0.007231364025143652,0.0337555601686802,0.016298165382019482,0.009224673051261147,0.01220510298103094,0.13200246878421457,0.031211993235080327,0.013850290579099556,0.0002686133691532891,0.002368587038586139,0.0179332199420699,0.009661688359435764,0.046011966032688416,0.0035935299685435225,0.004486731397892325,0.029859550170192168,0.0009788154426711756,0.030220368819165247,0.02908768220597685,0.029816127771846165,0.03667218475476934,0.06575407783296001,0.03511864069386332,0.006265431525237527,0.038036186217844895,0.012559233899507026,0.011847260964403104,0.03604106206252296,0.03308433584094476,0.007636074101472527,0.0499845671417271,0.007177759857296386,0.014982351509618342,0.03383734200148861,0.05247939634879411,0.03360111275247097,0.024882237457639816,0.04668002968698328,0.011446101590813227,0.00155163967123376,0.008776095703013846,0.03424550907241209,0.01776215067525374,0.014611455368855157,0.013271825899980114,0.010276076068529507,0.006397310506087049,0.08698244167177058,0.09485036322506961,0.008067533746658868,0.02753417663553097,0.015250525681283385,0.002491307720432112,0.010865562732652318,0.002246515598415642,0.026094453325301786,0.07020921775483371,0.07971669472738828,0.029531037905600816,0.012035170791209221,0.08127180888643344,0.0004287504209685855,0.09401264713976923,0.02554992121103847,0.0015962974466101022,0.03400626953277822,0.001958380291177052,0.02001519789484304,0.03076125457894183,0.03494089556185798,0.03757993053911865,0.04917249930049246,0.011673138757973852,0.10759536720429855,0.03981658479388299,0.06737912622570241,0.00966894391924882,0.03292831551852349,0.01123433375894636,0.055706041788863736,0.0041998366205566375,0.00784604285569706,0.057988620122759016,0.09020354487340887,0.020283769832580522,0.019026065451303843,0.012026866098784925,0.018876835988170138,0.04531051774145786,0.00272006051462513,0.05324620963024363,0.056480394974837755,0.0016514922724078208,0.040993763529802815,0.03620616027065901,0.0275473301659122,0.0007733066815469841,0.04595612716609819,0.13015677172950263,0.01600996259102994,0.014362438076442993,0.005174605068316749,0.02732215954225986,0.019320121287784722,0.022688065825911752,0.07341228113168871,0.030035598028429124,0.007570811096292421,0.014234488126028216,0.01717190741986449,0.059015156137699386,0.06374401526412746,0.03620648865157046,0.011185362046792647,0.02268157268046874,0.004129998746710658,0.03489210316685539,0.03114197625876783,0.007785645642397343,0.003270134800357916,0.03196057974463961,0.013135012099964725,0.0377224555600202,0.036937191392303476,0.010527132264871276,0.012936003040700136,0.0005348685424647488,0.025954639152711012,0.018749613237800375,0.03623168542647629,0.04680237327476873,0.03043787454722498,0.031023321808436876,0.013762691246998695,0.08658475605287651,0.05011392449188822,0.009746806784228394,0.041021035349151524,0.022991637662034388,0.04667781712072318,0.02500848055291683,0.00812276394662578,0.04496565408809097,0.014773791903756982,0.0016584562193096264,0.04268023475094681,0.07011221506677713,0.04314361451756622,0.04328543924982364,0.016624156332558333,0.03999573065143694,0.03225580539245131,0.05259825816556673,0.035422947102949354,0.00825121984283993,0.01490218544980002,0.00477009808228388,0.005743997481898793,0.04204880005116299,0.028533353912401686,0.033677755178368435,0.036181976920159516,0.024577695317021933,0.05866647577910978,0.03288001881105768,0.02593638663766824,0.01851123829739122,0.017563194563968886,0.019340565839397254,0.033526482660522564,0.014522566328771861,0.009985779370389783,0.020614631757168003,0.02804837060271584,0.009387557513537731,0.0491744115017436,0.008253118793844232,0.04224932561902414,0.011151536270458525,0.02903707101366646,0.017032026153195247,0.012147040820115775,0.009709330156672713,0.02466569771588318,0.008531720920144481,0.04970963680615948,0.020115473348292383,0.03067136231005554,0.031650736707565345,0.03745376145696399,0.001441388845916839,0.010152507241224854,0.01483304244763831,0.03441723114242919,0.0057308867326129834,0.01544810610000334,0.030795524142953487,0.05353947662935396,0.02296136375743598,0.005851270800018575,0.03185808638436328,0.032210247542121456,0.013554017373581287,0.006330852484532015,0.008250894272756503,0.013791897412735496,0.01976875934787898,0.02203431305517109,0.029834717439257846,0.04714813535292578,0.021216757881071222,0.008807475613374903,0.022942457128886096,0.011301930173153774,0.0576660907873893,0.010554749318028162,0.028310556991317844,0.01227361869942497,0.00297389826054537,0.028602833136195917,0.040438763677697616,0.022739568768167365,0.04205576096098443,0.018668618365455875,0.024063759420402543,0.015994457803322232,0.03065211933230327,0.032053615169640885,0.009100730717265085,0.026998673538136078,0.05073387661653742,0.017616204619890215,0.025940688879029235,0.01559873880748206,0.08363176075491095,0.013865636808069126,0.027386773186895204,0.02564506018418595,0.00043749494308046314,0.02113574384801654,0.05954512867755357,0.02202376356194368,0.019006327228821663,0.02273291079906134,0.02167130460120365,0.0027005943399011707,0.011801589854462408,0.009418956496152143,0.04365204719604661,0.033529826909225714,0.024010611210019576,0.07112954032038532,0.02346464193290603,0.01254992229673651,0.03851382434743275,0.0424067279299329,0.01757292657740417,0.004497791980336447,0.05104653075269676,0.04141813427859044,0.010460682628279568,0.04488874567524606,0.016947804685515263,0.013536166429110395,0.017840160892796844,0.00853393260987624,0.003291710167884999,0.03717328656127261,0.05075153847030943,0.0019312158169428881,0.004152323065698327,0.0555611137238479,0.01659842638354694,0.02539837955684284,0.03887361161920237,0.02909198102301955,0.044994959166259035,0.00015431917286442404,0.09635351232025367,0.024155067135417672,0.006178914646831591,0.01041642290983479,0.01454489494162483,0.05093832266254248,0.04111304566619653,0.03471517003081245,0.027355201788949766,0.005024771606862403,0.03773247341391172,0.03079117585666256,0.03362738280002767,0.029412406530572022,0.04036275528330126,0.02258842374180172,0.04213908291311593,0.05193294338109833,0.025521729634979083,0.031683747666424046,0.005466076157758859,0.05001176530731803,0.0364527620750419,0.03242201436112594,0.006431894261485258,0.0032748978972026044,0.05134830931929886,0.010895564720874181,0.04430647350764049,0.04192518205354166,0.004210249697595116,0.01951919228089233,0.09904965097216507,0.024628421475354798,0.03189720062756013,0.026793531812801412,0.04071974786336431,0.015234965036035233,0.06184970271647327,0.0018028391339534194,0.0013949662968849221,0.03308931606528335,0.013666461582608497,0.04100908569591161,0.008548230538540551,0.020513482043934494,0.006050274025532222,0.059791717328849386,0.042442443056065156,0.02399152928812901,0.017747988401883182,0.006866673400360102,0.04258970531714684,0.009000923921214854,0.004690389927436748,0.048690473012259074,0.026167446646121306,0.03670011580180595,0.056295341389131726,0.06662267095357298,0.009846157922647028,0.09241947011031304,0.04891916237270481,0.05420958625979753,0.006822138377498621,0.014781861970930815,0.03884508503309284,0.011333574617642757,0.08010918827035785,0.015983139410652155,0.037929953295757705,0.06408119122062149,0.032191877724489754,0.010847117037095334,0.034042643936539656,0.020343285865496694,0.034474071171984186,0.022447018653975456,0.014535016620156925,0.06212791759408477,0.015304498127919548,0.04078068301187817,0.022316243235159187,0.010611656971933444,0.022760591328335675,0.05016650518578443,0.014562853227744265,0.0019459690808922938,0.021357041066024096,0.12559308313141193,0.006849011431702449,0.005437104586661351,0.004417730631032914,0.050812648606355176,0.026497313774859997,0.021653064722144035,0.02118210790206325,0.004826143925674029,0.022917337024374797,0.04688262067279238,0.022846198368261805,0.002893734964612574,0.02861175731513342,0.04662806073712274,0.012855424373691958,0.027397138712781852,0.0240220964942857,0.040469024693373476,0.029614260929878313,0.008058336798378694,0.029920098684462867,0.02996503696745425,0.064650646221415,0.0051492028081789095,0.01183492920042105,0.028546327393469084,0.010707887456512044,0.05534545406895708,0.009813359212184495,0.0019323410791248373,0.016152749817225056,0.037101045427443455,0.033562739549395086,0.038805678493891736,0.010526501740023939,0.049108770307306954,0.01778673673458815,0.008389847582851963,0.03141436817529023,0.036555554680767266,0.011474317473738938,0.032265078768298414,0.025780758776533526,0.037279995825470806,0.02073230917146471,0.06270863082626638,0.0048461458634187484,0.0036192789184835827,0.036382303338106145,0.0006022949498262018,0.028149765142997406,0.03533319265320208,0.026771272462998652,0.043969992964899327,0.00875316662982015,0.0612340834127092,0.012203737222976997,0.011143799914319286,0.028353786286214683,0.037366820599732085,0.03313537730499642,0.003925737357703262,0.019868464587648384,0.03064904876127913,0.03916442775110502,0.026030174627888918,0.03755127593196001,0.02586950658022141,0.04187347331116227,0.02524642710964714,0.041131418252083385,0.03674473087511929,0.04080815280775029,0.04621923399001077,0.03455490348827713,0.03694627459508028,0.029967756112913347,0.02908733028685289,0.03522810141835453,0.04607297190625469,0.0015075817571393929,0.0040393740905371135,0.0017068854168814727,0.006492084214608609,0.06432520878774711,0.020561815927535643,0.013641323172086765,0.04800813432569057,0.030834180569821693,0.008060055886659947,0.0791902913747298,0.025989613511011415,0.04528699327768638,0.01503707187372031,0.04198152981341235,0.015326333076479752,0.006365495548556354,0.016686240966141432,0.051936384358017784,0.007533603528019817,0.03469945118086788,0.009747840061969198,0.0387778547128176,0.03578741976088822,0.015796790549671126,0.02485495038361327,0.021562476914602606,0.03630117212970755,0.013755756529126906,0.03659422894616521,0.022764349295130458,0.031953770558274724,0.0449650961826035,0.027959958989784154,0.021113554323498228,0.014283389125853009,0.023673424690911337,0.03142988983032457,0.040231628200472144,0.0013349023375674209,0.024433988683065566,0.01935838086920559,0.029772082456700856,0.036124868236609306,0.02469361365424482,0.052438448042400894,0.023010744781384,0.08183398984039543,0.010510091033935541,0.035578851337907696,0.07602054923440096,0.031078405738549968,0.07550218090953806,0.0258192909953924,0.03849333531685228,0.005666132022657431,0.04606679872312448,0.030804565724818118,0.003920111314918217,0.012156502642445695,0.029818605169552384,0.01537526898797278,0.03606533698761981,0.050016140139109294,0.01309853888106503,0.040611895155708705,0.03354890858768243,0.02511770575585369,0.03882656980650355,0.02502141045378454,0.049384520615120414,0.0325621716486869,0.0041979248715169485,0.01646209086358517,0.003169245781266773,0.028564311941873605,0.02752983345665107,0.0102182392191228,0.04459254699419092,0.06189946194502525,0.04521740774704813,0.05508833916958547,0.012354611345806695],"alpha":[1.230913851377267,0.5749514540588181,1.2193649293704643,1.633217918439049,1.325907460651076,0.9332587123847365,0.1281873299160976,1.9900666128510545,1.0053900386880765,0.5246113986356273,1.2348033055418726,1.743255727542616,1.016934731443726,1.033472313555968,1.0911441347389408,0.8728405571126268,0.5085996845143357,1.9473070392180922,0.8877274017706096,0.06441862116302666,0.6989487268448933,1.4711012392844034,1.9189364889554459,1.9460543300980233,1.1071181807161259,0.6325292265591789,0.9957081560742158,0.4008314364276018,0.8314135980112378,0.7461638849571237,0.5613364887457353,1.5895423330116718,0.8042871970144487,1.5594444610069016,1.3812449807102065,0.08956271520930947,0.6641758412275545,1.1536198255852352,0.4076086847459419,1.7368761231336851,1.4160138563025382,0.66061652906903,1.7907856672058742,1.8618393704610021,0.09052566315393706,1.8043930293193116,0.29052753398730724,1.3864096959835028,0.4049970239046776,0.2332242947814298,1.3430779487839883,0.6840329478648783,1.429441478974549,0.8568102780769764,0.8048736271388672,0.6811460418068411,1.957220876982174,0.8258577369331248,1.1056954043181535,1.3174998060719596,1.872343329770199,1.760697730722307,1.0627991560259198,1.1798803754369236,1.1885316700002795,1.2168118475405896,0.6603344646784768,0.45855285081595776,0.6309496568515582,1.778815028332192,0.09967113658862203,1.8247369840202774,1.799428653017491,1.3942830322270185,0.18010427731167944,0.8410587542815651,0.2504157729651766,0.9936236340504263,1.661877049327729,0.12724540476059643,1.602392239847879,0.6700666796251897,0.3223465894900306,1.2566011744942172,1.8591936912424583,0.6389413828046542,0.03104228637085571,0.49221501077131613,1.1367912890635083,0.383964060503426,1.0027492814175276,1.8854548217811713,0.9253328642219496,1.7830117607067675,1.350004480874618,0.27374984401695457,1.0149709001866425,0.4276864171952792,0.281042367990318,1.9758743976862467,0.3368138825992859,0.8825661424220961,1.9475985401131113,1.6603921132510662,1.1684073918915865,0.5906100911598893,0.5979234044198245,1.9616243131892777,1.2657830427897157,1.3174587766448642,0.5297750647851416,1.9524150086504033,0.9415997172931578,0.932952088103423,1.4160152405109598,0.16331863760638532,1.7812163271634724,1.797259123008335,0.4450985526624369,1.1136450665946946,0.8903473958330697,1.0565460366281743,0.9211929337243121,1.9052258459504228,0.2743392839651979,0.6547394714049424,1.9024057976369666,0.6272164554237842,0.6561904554653726,0.10586782772450265,1.5689742329382406,0.26309078540951303,1.326284296979193,1.1373295751001167,1.9107947111519454,1.6295011691169417,0.613347116178498,0.9727628465704341,0.03671356587449015,0.41133979231997175,0.7092940739755211,1.1225262812347543,1.0787401620353685,1.217032047108924,0.3166508459951425,1.169577712789048,1.6067473760924735,1.956884764236428,1.8168998041040512,0.9409694801426087,1.5930439032754697,1.7884568022013023,0.6798316981984338,0.6966006269750262,1.251148350729788,1.454168349414533,1.4820301359137034,0.7577514161052683,0.05902737341875497,0.43414790980043216,0.7334492075875567,1.8993029827570425,1.882950646009593,1.1630505034081304,0.171082290068588,1.8203436351407762,1.0247524019539007,1.3173531796154396,1.4953796026190296,0.29863302936507097,0.9866900484317229,1.9066089651917162,1.8397672517290515,1.8710006666909034,1.2339072162839582,1.557096742118934,1.4550773020043608,0.6305465067301799,1.621852845878975,1.625849137001222,0.0322403491923966,0.6873135605892471,0.6824625744543686,1.7923890178144029,1.3740908012133422,0.3211699234101175,1.4835076540128256,1.775180655649475,0.6088379723022106,1.3183048100886428,0.8738710791241835,1.015949435014016,1.0105798481570205,1.5601355814831712,1.720544216782617,0.2107898223055824,0.16710421537755638,1.331039523217589,0.9863267430105229,0.8689811254585509,1.6664684934612777,1.5955691696899952,0.927692249998727,1.8186015661669375,0.6934504801120247,1.4077411036484944,1.2976615364366575,1.3560970881940908,0.6571276617478516,1.3009600368252263,0.82645651571376,0.9184606386300742,0.5652338905372192,0.07249904013666608,0.05689316844576364,1.1030482086473992,0.471873515897935,0.7858064762570001,1.7139566082859226,0.4957098299663194,0.19794450682244147,0.28639347089561795,1.5328725452476757,0.31037854824680444,1.685917511073166,0.01745954118033044,0.7389469417712031,1.8246448104936999,0.6265522641386889,0.41019072744834606,0.1985342517955071,0.32453231536519933,1.384015480263257,0.6070369298783875,1.6937526337827196,0.8210097188799423,0.7690116664610884,1.9355364777974802,0.660168851698236,0.8539203012466152,0.5432103551832084,0.4981313423028597,1.5780076181059952,0.5087212634905196,0.04181600003420405,1.9919013829941883,0.30627505383424625,0.857382594953715,1.5089637716714503,1.0235625464740794,1.4139989878282258,1.699496720966291,1.6232971639301539,1.5244070167252173,1.2799905452493632,0.8618468154769103,1.9946757375309399,1.8769590911913756,0.009432659687346412,1.4536045481674122,1.9631405285722554,1.7498178394612722,0.3410729313505163,1.4173165881658552,1.9053659694896634,0.3492953434929742,1.273975107174198,0.7731969135352568,0.9085467352384482,1.819494454978153,0.6249701103225127,0.9340421184559391,1.6317782971940806,0.7102205780540318,0.5877420800469246,1.1639209373725716,0.6645312690666638,0.8979301946626594,1.293417297949317,0.6606978604360174,0.7204333610060178,0.6484953587816116,0.1361103035775657,1.08016740957599,0.8756301117287975,1.406012845341209,0.059666014038315396,0.15309441332475737,0.7385098165246164,1.40324588665122,0.23144694691796897,1.8897803550107035,1.3291401431960224,1.4461771847068494,1.0325599817557776,1.697507645268359,1.6033693630625527,1.1885923595003134,0.5150594961541857,0.6744668123047095,1.2757944076878376,0.1646015658209059,1.8440611792138637,1.4347179873236482,1.2777189090419725,1.1486885492756524,1.0993591180370834,0.733900566540465,0.7364619029721244,0.7909021574080359,0.6614317744972329,0.19782890947577592,0.4498766301028212,0.9474685620791843,0.11513945701288808,0.17899263407625243,0.992352113006084,1.4425556875407484,1.8442247646303582,1.47798264225501,1.6009796259803757,1.5869091474538544,0.25570313760541685,1.503079296486563,1.2982218432220467,1.2481328898215458,0.6096388633621741,0.4373451212766697,0.7612721547428971,0.670800820185371,0.6583767778909162,0.8769559248726,1.2597963261421459,1.85033634016184,0.9980704968905343,1.8556140900392437,1.0226121838797253,0.09290070714789067,0.04744345513195247,0.28087270806614173,1.0543856310710233,1.0034190617392316,0.3832476523113555,1.1045031583227898,0.5673190591244466,1.463390184734716,0.3967292765721564,1.454907364015579,1.7298492680206716,1.0961237802608466,0.07621725597707707,1.3006907752943992,0.7467684586094028,1.1447592767947068,1.6491052584114239,0.397419223469063,0.5768308097872481,0.31062505522764194,0.4988252130165143,0.7758188275736093,0.016595848366933286,0.5136299489578326,0.4491014412772447,0.2755822772315817,1.9306038630804805,0.5351123634879125,0.939266855089306,0.04537111137323846,1.6714249428945598,1.6254032570848467,0.8589156278933023,1.9385538812346041,1.443917711186769,1.0636182849384133,1.260305235762614,0.4054419411997099,1.418009224213134,0.8997623744578993,1.0970625821459143,0.00448728653689523,1.8327083835254339,1.6243201153476026,1.0684274245220293,1.0926819734302042,1.4010672488028124,0.07411117011552681,0.9139885699887289,1.958116714915782,1.7460368913517743,1.2978260661619765,0.5724124992229624,0.11044235461315921,1.118664450430228,1.0334894444036098,1.090567415045958,1.270809774307836,1.7321883179770117,1.7846271088154175,1.3546435546249898,1.114394087629992,0.7345824993847909,1.344102621375927,0.44790605103952164,0.38682645421978323,0.7678062780602692,0.12448552727212991,0.2545326938548098,0.8870191466437749,0.3949889526266217,0.8167087232824315,0.2901898180649387,1.5571448910092531,1.6798171581887424,1.9304147948259307,0.7486327060899924,0.1992127809965436,0.4448394185556048,0.989055360447002,0.9188578516513992,0.34491220517623633,1.825920104496046,0.21195073775064754,1.8826982540106147,1.274313867012701,1.423919511691751,1.6661415305638987,1.1242605237401797,0.37693300327617774,0.6910450512040152,0.17900994261053693,0.4064791015061129,1.8248155391024037,1.6971534655473426,1.6327302654082319,0.3763052001557252,0.62822162670227,1.98143801049501,0.427341897347306,0.817701891985839,0.4300147279533588,1.2492026297526695,1.946709184342311,0.3800953005784211,1.872056333881115,1.1029622181441492,1.12454775670754,0.2548736562140057,1.015498461584265,1.9250665808891894,1.7068400485765598,1.3105659792927593,1.519886201652219,1.4368871721898953,1.4053751457650487,1.027568085486028,0.5756730542389019,0.4298477888657657,1.4033025639933983,0.49601269824110217,0.9263335539381155,1.0698616160976187,1.7814250960974634,1.6509925630321765,0.38232620191231126,0.2352621592302273,1.8377591916383311,0.01734693196088566,1.083699803318734,1.7274281227402408,1.3678148808931323,1.8756448962827323,0.6042386756377729,0.15590221077011623,0.20499146556907055,1.8863707270683405,1.1777034784718015,0.481887396609574,1.0257011415800248,0.08948610307343063,0.5710425173066769,0.24496852685131465,1.1181343201135672,0.05026496286429216,1.294546593513755,0.6307204871115308,1.8360042467366364,1.4436467010135408,0.45474563804211554,1.158373734382912,0.7874513573104229,1.4733354885594516,1.51036802258706,0.22259460234695183,1.1647387823828836,1.9210520208983226,1.2490863976524542,1.9561124113089958,1.7160415072307011,1.966071744647076,0.9117898545959267,0.18730977744302146,0.9339545708112409,1.1776799748498856,1.2212913608868559,0.6406325190967679,1.0365615814565388,1.7969572512726604,0.23670967264137,0.03147684034644893,0.24295052908801607,1.4062794431693058,1.8452871153891581,1.7401779018498171,1.0899135132809281,0.22792401123649197,1.9165289252988456,1.7444840553973355,1.5283351378150125,0.17132874581280122,1.5077783393981425,0.6965879545124429,0.06419510967378361,0.43593459264322876,0.05163787905513484,1.6034945097546487,1.2692133775490135,1.189738182663926,1.0399132080384739,0.48876439503433033,1.7839697154529772,1.9360461024420235,1.716969995366803,1.0169506671482238,0.052844888343985374,0.955141795509439,1.9305934433091054,0.7975320881338077,1.1739850141511345,1.1285625633380159,1.4761909846281842,1.613172004897169,0.4110289126662354,1.656556117683237,1.7438612291357312,1.9173817818809185,1.5064124072317804,0.6803104478092505,0.4189775354669907,1.9455971750481909,0.17308780002931057,0.8881240221943081,1.224010672316667,1.6338715535085964,1.9666347914917446,1.1937286631949826,0.4301504829196139,0.6671227220840872,1.5976251509851322,0.04465989096627254,1.9207698813950658,1.8230010497301272,1.4883033300121276,1.4801887247918954,1.5320342379195027,0.6626363450710051,1.6872759181802204,1.7852622695071796,1.8708446287454197,1.2995214802572335,1.993284451641118,1.7186726327713013,0.799726339859391,1.7766126238993967,1.0734893992843069,1.602230224208105,0.9454558751082978,1.1847447122550196,0.4744428438686006,0.24739722421170773,1.946919015913188,1.1318870732112316,1.3287847965614628,0.616327022508321,0.9181055126588618,0.16879572133681187,1.582082033724784,1.0839274312280187,0.16459787872368636,0.0860045284178872,1.042392260342071,0.4548417247767631,1.3038866010689079,1.6155233294397502,1.732101584831105,0.28200605374074295,1.098609564408254,1.3990439340365608,1.4547258328406207,1.4335229278644928,0.7973736740890618,0.8762983713114334,1.241307403765374,0.529654749675478,1.6831537812602222,1.9254042989132754,0.4268783950223769,1.5918555109886507,0.8395957032809878,1.9300095326298825,0.9941472134898302,0.2724653308864453,1.1033774814487463,1.3005095927961734,0.8132666709655547,0.8111345023366634,1.7743236881183133,0.7522587809067849,1.7356245928324352,0.4510575302935962,1.7268539159630816,1.0922590518848434,1.4941618156860499,1.4134189626593403,1.8654827386404156,0.5195979814004414,0.8952426154153907,0.19060404539799825,1.6734215219787125,0.9292996553409214,0.5153964485413685,0.8909177400149693,0.6673091957503856,1.2993633495376242,0.7830125367730565,1.2254144054930944,0.44636344854730625,1.1711501460839506,0.678042319865996,1.5261591649706463,0.3385157012294724,0.31307968820455434,1.6201125251064643,0.8182367263692232,0.2724113055836983,1.367191056915389,0.3252414651222173,1.9346139693687645,0.2801712831666965,1.2030494616782583,0.48452677828752666,0.31327710757454463,1.2018768283106742,0.5282093110881152,0.15357183684478803,1.8937059361490047,0.4945033616692287,1.4577014390185434,0.569457467187096,1.3517365728322273,0.03802840233000815,0.20865015050570568,0.45907493272610767,1.6187902737545103,0.09586804400430982,0.35121410913547013,0.8031129390836411,1.8210675345658531,0.9165523454913527,1.7798514306515756,1.7516852162061198,1.175024573582283,0.9211976823760808,0.4707808512937768,0.1357193257091014,1.4967084919011704,0.39641532117375444,0.3308791890835421,1.1827261836842018,1.907918825080983,0.6705675924248045,0.22810418484992834,0.7168525370243453,0.5896778728988772,1.4427645341553412,0.9400003669159873,0.7604420046292613,0.4317128752736954,0.1163385842603426,0.6335625880735236,1.3748604968495273,0.8948895560109338,1.549692527583011,1.872138103180983,1.33959996736413,0.3423032911949919,1.0178403813818329,1.1060883606735379,0.372057273690535,1.2612044452106526,1.9918910107530974,0.9044694543331655,1.5366790229184222,0.4539128319947636,1.924181141219651,1.8122100911238208,1.9406739056659723,1.1699721213067171,1.8326559565091922,1.31548994757209,1.9478095598414993,0.6417889253164679,1.848742566422517,1.130467662768496,0.8325220983883197,0.0930020367486355,0.2129113776848408,0.2983937916199242,1.7506153016902282,0.9670488225171154,0.5651327385248002,1.414937051036444,0.9378082861679475,1.2350478585984574,1.2723639948264984,1.3764593692740328,0.7606269468705924,0.18431085941313974,1.993428188830538,1.8733046415752508,0.19497855008988374,0.7650117901574216,0.4620894075537145,0.9989638658312465,0.6434278595200906,0.2448899012858501,0.07980981391399489,1.2895704267716375,1.6357836907012602,0.031745685730851125,0.08055452525043272,1.4285103919871442,1.5631328897427887,0.9932335068828575,1.5958588168256207,1.2564593022395547,0.8363592901289905,1.8102790322774833,1.720322281522832,1.8930472255214608,0.1983930917735819,0.14264027395769086,0.651889117090672,1.4062923832335064,1.5309240436642524,1.1743829305679356,0.6011250881180716,0.19848874486427848,1.2169215461462919,0.5936074587886826,1.4640577996499142,0.7349235342822857,1.8724854535805497,1.3824042337887983,1.4478545308966573,1.2177103695763223,0.6386295622431795,0.9788140060626991,0.12416537058399912,1.997766604014454,0.6988841918361541,1.2111639308804598,0.11047661701940292,0.06631905434830676,1.952195184809686,0.4822245366744662,0.9499969410675408,0.7988033666211511,0.8261771233380855,0.6969118377133197,1.7760320413513253,0.6058848707344384,1.4122614899464447,0.8291260590316423,1.5822675725490476,1.686735909303509,1.6026969300773324,1.292421398353393,0.04179457998008651,1.0416220574877997,0.562059199815049,1.4352845379547667,0.6040577842211863,0.8811290958702904,1.7332680850798785,1.9792851374023894,1.905347068555633,0.7531367794890911,0.6429956630196028,0.27590122352573276,0.9948733055195049,0.3449969683913432,0.12916804010875804,0.8016327711862559,0.8549294437229484,1.5027863172742166,1.5510943270105861,1.8095451306034724,0.23981968700519296,1.65384725851984,1.4336662870799888,0.9904537886604627,0.16368034095056094,0.3708234600557838,0.5815549698544298,0.272470866145595,1.8325041520629983,0.6470188450688914,1.614379073338235,1.229694713905411,0.9876719377307839,0.36244305372420493,0.8714305240328701,0.3993208722967809,1.1023678824722132,0.8450542546909849,0.47094081884860906,1.6165131885305497,0.71898040227906,1.568924911713213,0.4603567095272938,0.18205043183981306,0.7483179859710667,1.277258532742744,0.843898945187155,0.8095445944753741,1.3120480312966856,1.7485351353460175,1.0687944084385186,0.09729074293278028,0.1200779427299783,1.3877585536429913,0.6881434633421932,0.7956664703107941,0.529167317352675,1.8766039429584902,1.3579727572004483,1.0413464527767409,0.8620475864361055,0.09813838859860269,1.0116909561663983,1.8266413979907359,1.7599456568197285,1.9574514925460305,1.9204824911381237,1.5078561379603435,0.7474432744334272,0.16571067523429006,0.9298684404796855,1.5747947034281387,1.4980592519249565,0.2010397648155955,0.48436889579079745,1.0338402340134132,1.069596685340073,0.873615651837043,1.4731396296351913,0.06093202871843628,0.5616855870796496,1.126069526174013,0.9375889410302998,1.4319860765709453,0.31619156465932985,1.8781253469357515,1.200902383426369,0.33824356999071625,0.6668947401592353,1.4025523120679764,1.9726460889556932,1.015705279605407,1.0586631477666715,1.1741510487478144,1.39632161382166,0.9245960281808618,0.08525250366163739,1.7882596581883292,1.5453911388999826,1.2409991442976631,0.5575505243552183,1.4964562962955266,0.7978453742381308,1.973509348912065,0.19213659544158945,1.789171027298889,0.5813312298895106,1.37815071709031,1.5075205517287675,1.6424191805456365,0.6112388443091841,0.1448087948765857,1.769442261098427,1.0189075551928943,0.9068324219957677,1.397464924163328,1.4168996167629189,0.7600823024337084,1.2297768135198512,0.8313151025746444,0.8063845598449806,1.7135635319215274,1.2259651593876852,1.9291031117609547,1.0880421939345681,1.2309921566422508,1.8236717985865534,0.6388279750045571,0.7437166889422713,0.977340291162963,1.6314972945100914,0.11192440541326709,0.06654028393736633,0.19411556801650942,1.915039392009664,0.7735404760090976,0.749403268694977,1.9866371287886193,0.9230618453159525,1.6191362306860388,1.2585052964418102,0.9473170633295647,1.715271695817198,1.1754166508220183,1.7361430480777496,0.39112282611233296,0.10506714266551453,0.772607753525326,1.9992751670985744,1.4507399636361256,1.0194621335316199,0.3391476104149116,0.8556376089048174,1.3814169626460302,1.591477336230641,1.2815041267824405,0.3992479873719046,1.2015619895569545,1.4463107892471871,1.8339834497562668,1.948952667023752,0.8784917424266983,0.7153140437116692,0.7966456994841136,0.6948950868296304,1.8892081733895658,0.3759609019126864,0.9216410774778732,1.9047267108475747,0.04713109677988214,0.9066579966133448,1.4901103796537796,0.7983263959731262,1.192963438481128,1.3696630620551855,1.7951377349178852,1.5089063479304272,1.9126639369984257,0.2609144852115719,1.1698782779722903,1.761594418353988,0.5276596167210186,1.7643189395517846,0.5166312591315858,1.6358769090729162,0.4992852271682535,1.3980650469336662,1.3860642056401646,0.059081573741624815,0.5401950752166758,0.9845867187499429,0.35007279032145444,1.3745246018584094,1.5065601291964068,0.9606426989641217,1.8303484501129366,1.0972035514138372,0.8500440149968358,1.202353165132124,0.7377615123591927,1.0154485048842368,1.2077020910986977,0.12712224503589953,0.46619255878651833,1.0042937459799481,1.2553542646119413,0.6651915974933615,0.3949575516891115,1.5424464799332096,1.9426213360540854,1.848690541278466,1.8503496033370714,0.5687643244033778],"x":[8.205102181616052,11.53535934049922,9.819075842814588,8.100510482573636,7.489637235641227,12.403530208015072,10.744038494290622,6.867269927429227,14.305742835991467,10.367812448535798,5.73437597167797,10.87963140697153,6.143789375553032,8.689855554908782,10.530053316128729,12.842581835635603,14.55012467374998,8.925904058431993,10.607676498518078,10.777786322899077,9.337548083939382,9.548535619301902,14.00129393196545,8.575409591663728,10.845950317386638,14.996410356384722,11.293019622533507,13.614155307856606,14.944789924280817,14.873657945021536,11.918097775825302,10.513503119437836,11.093057335573786,12.867372466782502,7.528381283054499,6.646593630504169,9.32219787819762,11.046741246297366,8.542858928633507,9.595921685463464,14.555349617507265,9.387064392282012,12.105498630141769,9.322501042050465,10.685042147420358,8.087562640196706,9.07271425928224,9.878988501889117,13.655976454881124,7.659706991759965,12.615012154544388,9.253791664619795,14.154089262691162,12.635045480890415,6.884053689803125,12.078481149338758,12.221803535249558,12.630791729052966,10.176583460712544,7.279102181240695,13.99875617255912,13.030092610686292,6.270071873282723,5.037883924263877,5.280829385531427,12.30423896029876,8.25874298329408,5.870092418412465,11.08169589694044,14.596270284382948,14.826620141390045,11.867163250027888,10.712804083647661,10.211277466896941,14.66482494856802,7.692681788165235,13.542906793860038,5.054810287590503,11.357252194840257,14.592034107828614,10.01328957603025,5.428138055699289,14.670556593286655,9.71654971082721,5.244397288485851,9.865078960964276,10.998185240934646,12.943354360750972,9.695380329760885,10.424444142948719,10.514542504635955,7.018884264892524,5.874676640226866,5.209033355454258,11.52107881339468,6.666635010387727,7.428298316112601,13.148677094074406,5.534234029023359,13.641187177508382,10.35249426442271,6.503485383920731,5.068497564969549,10.074212500116392,6.765442699327098,10.32340045268161,7.976044948673637,9.728355445081629,13.596798044911505,5.749251056537473,8.55571648332189,13.034039713335925,13.983307403989096,14.66132625365166,11.634891070642627,12.831655630651298,10.989999816264637,5.116338937493447,9.225056603241132,7.165768426323906,5.036227211967272,8.668906597611002,12.971053069032033,8.471906203581316,7.608586422201364,10.034620701914832,12.11363745185082,8.558532811521502,13.037864147452305,5.293900120224684,6.017056247558996,5.6667629126157415,11.474833134491984,7.750995839591182,11.7531218935715,14.932717963502428,10.88924107401475,9.012222311806504,9.797842710190928,10.332933661900789,10.818064854658914,10.97606278850748,8.180542690085193,14.712114232834422,11.724406273438529,8.096582067534676,5.606876261559748,5.066189636973846,14.023019246947808,9.992715289757603,11.029180028652357,14.644238836678987,5.716590261240104,6.586192976054686,9.086270233292826,12.68518951143712,7.527018655841584,5.2456751728043205,5.209257136926833,5.159104531565484,12.890144094287317,14.884656149969697,10.476146063555117,14.534716895391051,9.536382692116547,13.388916453772378,6.864420256646606,6.719747235833422,7.681110815563585,9.460032640991171,9.305127684748665,5.370638161724399,13.151141572470266,6.521131407040364,13.994174903727961,14.482411972129716,14.95062089251455,9.995282942311139,13.5013026924591,5.35656789909827,14.807264964031111,7.0641169426958665,12.908145519337813,14.20026703654312,7.991063895832465,14.5635176280364,11.62397740629633,8.573248817732742,10.922711769496608,6.814700402555623,6.180304555276228,14.729427302632976,11.572034197847618,9.965151341637108,7.820336695193362,7.934408971760187,9.220799439257634,13.478653803545129,8.921159195885426,8.48944753412807,6.919283903210474,6.630547907803239,13.644125888268634,13.8043530785221,5.064466272589945,12.525911249048377,13.2809615252968,11.324546578201641,8.451557630379234,11.351559991524276,10.967651915980479,8.263044794327122,13.348349949404723,13.982524417697972,10.171998319393474,14.016688093593343,6.143115151289448,13.770930788784952,8.002527803719026,8.015477637467022,11.369704999541252,13.274387760866432,10.007939721309603,9.661299835698644,5.458376797619408,9.184614902005134,7.875420398946678,13.619998486046258,13.913171523480766,8.251554427707891,9.412321930192327,6.887727568107891,11.364226133133652,6.917632504985372,12.725501414799865,9.65991982059119,12.104154999057375,8.76001852967091,9.715453839094515,6.3067542994129955,9.24778580650161,6.534463146827349,6.251199621261955,7.672919027581271,11.685692620403485,13.453673994746222,7.68903307104293,5.037540088349203,12.515170728005439,8.456951536961197,14.058159518189353,12.589785979830715,10.439642779294307,6.659373210917949,9.822063087279231,7.692718527226838,8.29697483489192,9.998226717988867,14.469058400368509,11.786230816044277,8.797938716382935,12.873478130955867,12.146227242161583,11.145651136113004,10.55017524756912,14.63202892550414,6.286640906954166,13.250644702861054,13.171415334675178,12.951707470615077,10.86276044578626,5.095918021796488,9.28823842757504,8.3226931791404,9.4111306370319,5.923041397143026,10.328676838300225,7.570094691212253,10.666695354278277,14.826541455641804,12.45747337814813,7.422513689627543,9.684507121599992,13.603567354203971,12.796484470256841,8.976898200194219,7.373452672271236,11.048734661597951,9.877458778059498,5.6737384365027,10.353246369036883,8.987350894779524,11.76328686422506,9.007751383077556,14.052481975690817,11.227173222094182,12.414461347256989,11.8978016409198,10.81607441724525,5.6615173901833105,12.181627032370992,13.987701254424564,9.61466906802752,11.358240612387732,10.207115060644888,14.194765082667974,10.198359995397333,6.804353217490222,5.852721118328102,7.866233307819892,14.799081799297626,10.904483882032498,7.513968342386965,6.2550154056993605,9.857544585496296,6.120614076323183,12.907759398816745,13.023938406690807,6.306633982051464,11.366811172199867,14.15456003371643,12.276965586906382,13.513290787085669,11.789053324534532,14.279328457251584,7.795716021920378,5.443123554846199,8.45313816061035,7.565046505851319,5.187657451707408,13.612780812528113,6.4008254337342985,11.875242963645238,13.233048748129475,10.357859913532687,11.40628683325457,12.535686579469473,9.055603377409644,12.063694078503202,13.335509186756514,13.01016596507334,9.294248491603636,13.491371347178507,8.680880657812565,6.621072386093536,8.520405540233698,12.903432281967204,11.115395911255758,13.841401665076706,8.000232055929402,12.73728397272545,11.771525030688965,10.440339517156442,8.034820452114413,9.873097701576356,7.043976271758785,12.811250726346797,13.152386486701799,5.606600724098114,9.712443530443451,11.892368314683086,13.082426977180376,9.77946737933452,8.879270528071775,5.763284405347684,6.567820889635758,9.242073559748974,8.945471295432126,5.61545853683576,8.046442500423833,12.951357754099506,8.457790455008174,6.384475523897137,9.152395166642018,10.745922413912323,9.184606503226817,7.834508478714666,7.849693536722009,5.165941534535385,9.817182624327467,11.489431313754956,10.189996762115483,14.439518074724791,8.201598641589346,13.748187580223636,11.473216551777663,5.302967339993829,13.440271846461222,11.521017961619817,7.649061038288723,8.526311655392044,8.892941111166193,9.018648272624297,7.012135496314819,7.712231169268526,7.882812782916666,9.903911250190852,13.219060601763829,12.013335284550003,8.427796742605212,7.997129661128051,14.88549175807594,6.003312587345528,5.806891714917652,5.932370997359284,7.180729625863291,7.431413569569278,10.167827254989296,11.170719496235211,9.242155517316153,9.52323668790034,14.494370753600679,5.866768553991113,6.788914144769043,13.159060853260186,14.569811842504553,5.191632070238271,13.186728564828732,8.743797413544371,10.82429865655364,5.306662044965551,8.606141344490009,12.455156434087623,13.346940447743192,6.021233250613999,7.1140131287811315,9.985145314622308,11.429031017403704,12.025309247806486,8.106209225109435,12.23767663958914,7.270485661236828,8.602256868950885,7.027761170438039,9.105148643523794,12.512560709720312,6.8320232746009975,8.91003533830512,5.053226662018025,11.312599458301989,13.328814138338725,11.837297757819165,7.53926605370588,10.259629899423071,9.4771663846902,14.561282805798289,14.606049410512005,9.026258035496728,14.113912032338954,10.771762552189028,14.032758857312151,9.85555864099892,10.0353438695067,14.319499387790716,11.468289535405688,12.675671831196556,9.265518302699897,5.154829625547734,8.868892459148467,6.511221298167669,6.861658210796766,11.501004735648115,12.365029474332715,8.36383284657774,13.614731445431037,5.506694685352036,8.304304346934169,14.362521483174094,5.729115061301258,13.425321720567364,11.270224091001591,12.42738576821189,5.8763006202333905,6.124055811893145,5.040754503997363,13.83236655498876,12.627716187118676,11.603400171667719,13.817557105241319,11.403992802785176,9.312502260852217,7.199425479483885,5.122750125985633,8.111495304799586,7.764246857397401,11.073954889339387,9.702728561123745,5.725362405766137,12.045627829511893,7.07010599980725,7.743717452352865,14.082991640577331,13.056946246291854,11.068806018836788,5.400509641074116,13.878047480445709,6.522773279559342,12.881202493508424,14.883652817997922,5.236644899417213,9.533279360764803,14.107028963251732,12.794724182782547,7.754744717786739,6.305839635997246,10.43612210889022,12.99828280935137,7.388426565131622,7.462231526889376,10.116378115708589,14.745484140376238,7.36678519646804,8.13310725795092,14.996667114174398,8.06614552212313,11.262978357082204,7.377416809966433,5.881519999224647,7.81204643833509,9.886283723154481,11.026725075346333,9.471804107490565,14.759570753998467,8.455691965280664,8.234308873750567,6.590326738467798,5.147672825835594,12.874758482269046,14.939251400906867,5.730187706681851,5.423424385606492,6.706565827094515,13.495918466033348,12.17821084703342,7.897795122255829,13.38588179144856,14.583107784672094,5.028143087655714,11.749145985117131,10.880623444644256,9.410107509429242,12.850968264649733,5.662744060578659,6.688041417308915,10.392150007633,13.299596988523842,7.327096513806732,13.636077451212605,12.771181072117418,14.84181810000949,13.015697054200734,6.636193557549812,5.719797085847247,9.00037757650626,13.267310193413358,12.257085059084034,12.967564191840307,12.970232707494162,6.036417701947254,6.757144658055141,11.873832439379978,7.852601092066207,13.140219188336317,14.396064232748937,7.2649066573794085,14.456449188064012,10.12180429267731,5.286648141746523,6.121017569280789,11.96316504053673,11.990031921884011,7.849923623552719,7.770860040320029,6.563839429046334,6.998468158530969,10.922673839977154,5.063451927249652,12.2542430951243,5.208365483701851,7.113023624331884,6.393078233829133,12.878046517268569,10.619992035803488,14.888450657460057,14.05553229257223,14.735220917420706,11.913026319283286,7.719235902698609,9.674998487688837,8.600878991271742,9.812924679803185,11.644930275491905,12.291061631847459,8.377152433824467,7.487955418185623,12.645795820092813,8.90818565901948,8.252222773212392,14.392580430356105,6.146085330078859,9.811212217802964,10.2249034613371,12.958400195248782,7.135954967586615,12.779921368217877,13.701933060898153,10.3495530791213,13.277608878573613,12.278233103693836,14.494241617945464,12.325498368848635,8.905458116250903,12.641437341270503,13.085684577097181,6.973755021482042,6.890816584423622,5.058111627940914,8.913376405339399,9.808994009457336,10.359821905982374,12.416405929489313,6.407460965083516,13.31492086446248,7.014917784962684,12.769900390436923,13.11679461274739,12.183249510776594,13.797236640234384,11.831843094992502,5.296766763273924,7.661597745650202,9.760376666216748,8.087761750998165,7.949223214006535,7.200247543207761,8.73390510729116,13.848886945995915,12.504977818180652,14.892527534055029,8.562155517476079,11.263949901156757,8.362750883080157,8.923267393308816,8.960210472364416,10.142742330570684,14.43657683584531,14.58294255653919,9.133717746732625,6.246412241055914,10.433363568472567,8.533550940956204,14.431023131905821,7.479413865923239,6.527973925139623,13.9659556299018,8.483403732763598,10.06090971723114,6.3504554472866666,12.072377204283375,9.673702171687397,7.559823343901291,11.377299487933577,6.243206522231968,6.153996995849338,8.160452935128964,5.994356894035353,12.268944149387263,14.469289679131972,6.4014069585203455,12.887471365793663,7.210603678911625,12.241243630074521,10.258365846901576,6.036020959853612,6.1558445317877535,6.983581639067296,5.234495949504858,13.882908606680752,13.030992468695992,11.277434298196399,9.526656622388906,11.423436819470227,11.943242684777802,8.984984447977496,13.678314063250658,8.818044502653802,10.279439531357506,14.383604553897795,7.702977204127086,7.156163388397532,13.65926107566893,13.30270822709368,14.91747839511935,12.342562270332413,7.37253956573255,8.346484037491685,11.618522400933333,14.72145509089618,8.28724161584228,12.441869327487769,12.435326361280332,14.1179056382724,9.51269983429441,7.077197190225666,9.06610471368764,7.723956641966241,7.36229586907182,5.242942169795373,5.560751261617234,11.456282916649403,10.005243937039712,9.226300549465662,5.052172277964564,13.716942344204814,12.664648576289055,6.618782933717635,11.537274800156403,13.607302521920053,10.497555940087938,7.462103922984791,7.317967604235724,14.327905899754391,13.785108846555401,11.996210092143818,8.103429684862364,11.626300516219432,14.727320113704433,11.280778862581357,10.136526165847208,6.738318791461775,5.214266192238391,9.847360857579,8.178007321459695,12.782084913661865,8.46680126470913,8.858291645634198,12.556417342606053,10.725083607641272,6.045635286139717,7.129413311584263,7.653384790561097,8.110197936482948,13.812827785943679,9.486528730254912,13.480800218852941,6.03379533980223,12.019912175529768,6.565039072512604,14.490985036215891,11.771376746519643,5.02767630440607,14.657895681497624,6.747994275903746,12.920864981602783,9.903384546971118,6.555310418346472,14.317792857816976,10.579359522662076,5.8847680540171154,11.422701862750449,7.7804929458701615,7.4362918188984235,6.0476410908966365,6.5123793173729405,7.258671830600811,8.924954135572964,8.451632217461684,8.220258205583002,8.562742628001697,5.8253942440472795,13.742489248305086,6.295674454195044,7.443571545209533,13.92855511553079,11.871868799372505,7.886560971619767,5.708642478303238,14.3257589598355,12.962592638270966,6.309951295831788,8.105333502401734,14.549978609310381,11.354725263272769,12.25317081190822,6.249045615863917,8.245794313522683,14.51860886750125,11.005048275630362,7.345251557103232,14.933225172108873,11.074287174361281,13.404681922524889,11.101432620366383,6.8038198460594,12.097082107928541,14.828584356412339,10.698350872544665,11.99154992257219,11.97621577429709,7.720130091289241,14.013670364657516,10.116108948044984,5.587961157896473,10.516705201182662,14.624331263190737,5.975350819641396,8.019727328411179,8.85453311956175,5.369486289570647,10.354369401798646,6.717975217815784,7.940151077828497,9.035447590581375,5.506884928515639,8.637390036119045,6.415397524500648,14.892130122697303,7.337335865639513,6.613305524419129,5.332530537678711,12.288870030711967,6.307941999498958,6.905674446468542,11.21170415122959,13.693895327174882,11.916086496928175,9.48040504638933,12.330883910957624,13.891281923569661,7.23241726618018,6.228845473427418,10.6329184110934,5.2789684800979835,13.63317567074628,12.801865817385515,13.996174635231416,5.086246092004229,12.074897871541797,6.5709232913299465,9.96390202946948,10.015269560071014,9.19057826418533,13.2469331524537,9.021209222435742,7.111990428161812,7.2377925659880855,8.143914826220604,13.769647712800765,12.469752610426818,6.072689193916904,12.673723016336996,5.077590862227503,9.190061162798122,6.9449565307093675,10.413634834162265,9.254214566095023,7.4811119780724855,5.940370629794507,14.796525839154853,8.136374681683542,14.363044901452914,14.029704549464629,8.324862104775777,11.969549694638408,5.766319537954079,12.265793072238962,11.59773123659219,12.662994210460209,8.944138433435917,10.018125714161437,13.230172310706433,11.011083168312988,13.556718435477839,13.471587502527312,14.831356306594508,5.149819302508083,13.910250170664265,8.638725295889554,11.550770461312363,11.346891152950505,11.585752575898557,14.841239347250234,5.421517522763044,6.44820909921396,8.149485103326082,14.295456852142278,14.611524929815396,6.338599386800281,7.806447347162154,8.133730994142727,12.436813092210755,7.99590909959484,8.920156240605914,9.620989932957425,7.4641879240770965,6.670689067533166,10.928426871181522,6.741189380906036,13.569244283824784,9.894931045376005,12.165586933722723,7.017237791026256,7.143431318927467,5.335431970797135,10.627257703015992,10.480867400065026,12.113031420109008,6.8590046405540095,9.4014111595569,10.917007963627336,10.256076314782119,10.865541757416107,11.934843820410224,9.84408371136906,7.2771824401386365,7.429187481327966,6.7393147576177626,11.996904512947438,10.17933305972644,14.185330233122668,10.99613554733531,8.009641785817232,13.586351346213835,14.773379489882954,14.44799889694579,10.15380822593788,11.943066242975078,5.443526908091972,9.399781443466612,12.279319176587025,10.653114220174572,14.787924069496805,9.295664495697677,6.025527226051846,13.80880909524585,9.098692659991876,6.615530514353529,10.721586214424288,12.569391482485173,8.116121068465015,14.18237295242735,6.902807849313419,12.783525140240554,5.3519931017184685,10.680999968701608,10.695370867284847,6.555700361916976,7.447630679625183,9.55851615529035,5.647767806752626,9.10176294803556,11.198659958870987,12.51147286890518,5.795612227885314,8.539390995279494,13.591027166853946,12.987474588333882,5.01772672899679,14.998160050523865,9.174093419611918,11.792748022667359,13.122917931721538,12.590700341616479,14.63539793032728,8.40242518862529,9.132327182853356,12.093720328098978,8.4935416871118,5.908252496824112,7.3773611988864225,7.172910162112265,13.909415246533685,12.8983930571165,11.16166940568608,14.696582628716543,5.5439636612666,11.491821165152905,11.024123059823097,8.313090295613232,9.207769380063803,10.396599776879414,8.366544571468506,12.504192595581712,11.291841798653653,11.542539000230153,10.2841295103282,10.408946773444939,7.516971777822046,11.376750094628665,11.140033071590663,9.841288330344566,13.057551643395405,12.956452177325463,7.554210287555971,13.228025837064962,11.817668144323994,10.87871010741087,10.316597236893376,7.461793700764536,12.362230600796044],"s":[8.025946203803137,18.761638235823305,19.115189166926093,15.444464399186263,6.7623937119329325,2.288194082704762,13.318466896725973,6.332834011711945,11.257438288891928,7.546493689902989,1.384929917257427,6.503547755234864,14.6884645089641,14.326559993548194,19.031008066437867,3.736782781944914,6.958411133666842,13.701753622739567,6.291451757573214,18.64232162760039,6.980388297044238,7.828427557989319,8.69082550918086,12.487565117790048,17.008082536319584,1.557341355241424,16.186244977330773,11.04995635310158,5.780586705168749,8.143857311621101,12.092859217165275,11.86659309190257,19.572275961433945,1.0341889387384118,11.862895878466926,16.658761841044367,3.4157570906469603,3.6083019488002854,6.976920690020352,6.937034363187893,11.407392060142193,5.041724684265669,19.309187707247865,11.0819010173579,17.388951314341025,3.234814595785638,5.982579916147035,8.652465377469166,13.886924194973522,15.858767516827449,6.530849591199788,10.980816952579016,8.64174495157239,12.555359841007618,4.168208169566419,4.8421968491487855,11.722313968319678,13.498138285685567,3.41762248356396,10.406397744562454,5.264137393725865,19.33910184485576,17.690588089107106,5.872318547149464,8.07276959667034,12.694512181973817,2.107157388172447,7.084282890383347,10.883566150285148,8.533858598671502,13.746387614292539,3.1151430511370837,13.529333020200012,0.6197590114026408,12.20850484745192,0.9013012710203805,7.9851604796016895,9.50970698984619,16.962798550268545,4.211786388944563,2.5185179224376597,18.753330168088056,4.915762131998549,13.411185208199754,2.2376569594250917,4.680078511143906,18.75688399173654,13.287311439704844,14.083126318928327,4.965769839061767,18.469333645402678,14.451034668823649,8.104667030493005,12.4225827296189,3.811186081985185,8.899837019549501,3.9480027154426445,16.55033735463912,19.193716305543774,11.458818173313684,18.744593537713175,18.143609371868354,4.296561384822168,9.94596904818437,13.721135420423597,18.34906234359455,4.470117250807544,12.64768585645458,2.07684034186002,11.997843878155985,13.99086001059735,4.762275446176498,7.606425557267391,4.960329981912848,17.803987851996872,12.81502995302247,17.213724544608805,12.551308175525095,9.035379585275498,12.82842834056562,2.918625385675977,14.168862842110874,19.192355152304657,2.847246230823073,11.760557096817843,10.98189118980713,5.234635386076882,1.9320169937508513,11.593182151910565,4.596234405955104,18.066759352526983,14.277999393799913,4.658320636303515,10.408159086616298,7.71142244344881,8.854543113989406,2.215294851939129,16.849064080994008,7.413899180468091,0.2970349293685892,18.074857424382728,5.533767013822168,11.487616170083772,12.218285075907511,14.966274438447925,19.841076188398695,7.304259645416162,0.9128660159367286,13.07275822959847,14.384383444571803,10.138577739566115,12.66740268756621,3.4317995561063253,0.5417163962740457,7.475654111266019,17.51974049756507,11.770985885268646,14.979636618209762,1.4004608026375687,1.8689845985788311,17.37008105810402,1.9031186177656512,6.967517619132897,2.495351065174858,17.631339808787803,7.238301569523085,0.7258772534720537,19.509341101532705,8.665289668064826,14.540390896920407,10.12184844088984,4.846574875836356,7.514693244678741,15.351400858128956,4.216944496958357,16.68618747955385,5.24194571082123,17.736421883855357,13.084832261205307,0.9233444073026931,12.393821652517222,14.46067810341872,8.819519212871905,0.1318659902784658,10.73017936190325,6.275237604200763,15.355376507628748,17.715467070851187,14.850783183938074,17.070638334947965,17.630686206352518,14.36203889951888,17.103974385254197,4.3377283043211845,15.56343093154367,15.905886525211681,15.375837811678474,13.08302118616095,4.3289615367033685,6.796525805239555,18.51833377885752,1.970168326522046,18.22989565176203,7.558803443466289,19.522935781714807,17.961201907212434,0.8875085086250634,11.973774123745379,2.299615554910379,18.60105592618119,19.412293901606432,15.591967308730027,19.480017014158577,3.186494413937422,14.6668455693038,0.4729119163162432,9.500177694052399,10.29694718464716,11.67787492815508,11.072257068752297,14.174460836683167,0.17125405362265145,14.038103611729387,12.541190003818201,10.446265375650743,14.173333281378317,2.4847464663436813,9.998673501163884,13.302264718738979,4.084970997852331,8.078565913708125,8.859539664899891,17.164884706289275,6.580187673406921,10.500148510555869,10.15240858931926,10.905098317950044,16.84894197658304,12.171316942763287,19.219890451697005,3.516561296514613,2.3698810798243297,2.9170420896477767,6.806238353721921,4.9678157418664615,1.6014858439450297,6.606495841626643,13.773165140881884,4.497905057713765,13.08750645479467,13.214211072863673,13.43652087639759,5.275763627730097,14.336097543155418,15.29280259919004,18.35549389410342,5.875727923058407,5.453801143198631,15.406549882601258,10.070886269678162,9.969489322477685,8.942211897693063,1.2027889949824777,13.245814703235478,10.077584720099226,16.96430116018749,8.45189906264578,4.608015300548005,2.716231839045342,0.409432493108155,18.398856772716165,19.41118812692209,2.609679147868764,1.6291832298453768,11.33426300956231,11.648081643353546,11.197920076165948,9.299015558154661,1.65380628446119,6.913141414455923,0.008209713845750422,6.605278849252674,7.131307148054633,15.277188828679446,18.597017157027462,15.275343642866197,4.859039386745407,12.838605758928239,11.149439252304933,5.797034497519995,10.586660862795325,15.181226456447888,18.45347823372185,13.019181594229693,0.36738776407157836,13.344327738596027,9.86310169751265,0.2745090685801843,15.600189272511415,16.61499417055246,19.31099140295323,7.135912804110016,18.045678768250166,0.7281486674251969,13.712607463336429,13.500450386350158,8.110262955983352,16.69197816986597,3.4726180186210165,19.047605763969617,3.5353126404911617,1.330911677851776,18.164990859806057,10.250414913750108,2.2067825965236842,5.604256409830075,13.771730543531401,12.651588595555516,4.231129473222008,3.1479457649746534,14.652322467636964,0.3408785783400248,4.9717955991795515,2.2389756538565253,8.484220989482289,7.904926544324997,19.009212741939585,13.838760774871389,18.20646608458528,9.248478002042342,4.835255857119201,11.388814403505414,18.15563682427385,0.16916027909458897,7.22323222573543,5.53310065900066,9.926618406101294,16.857960141020236,7.101963515394325,10.043793847073026,19.793665539630055,9.300452192319803,19.431388659862673,6.364293526432059,4.515091589822773,1.3368914390897935,2.898089240649111,12.337099188108738,7.648214768775619,5.183479948891971,11.67494470720368,10.203311301832155,6.419352649094487,6.787188770043513,12.629409835920423,9.783154714411758,14.369653648273456,18.073599165279518,15.298720526586731,7.886690617126182,15.06760068642655,15.581646902228542,7.259305958391851,1.4432230880767127,10.639440280712943,18.986629367324387,15.236750599723475,16.515053115408172,12.426037953358833,2.0102232260244524,16.27630018001396,9.690778500510104,15.100390921389284,12.617317585888127,0.10856156781585469,8.520313718650936,4.564706769995124,15.929217916565403,5.879419797867764,4.812938539357745,12.480889482880105,11.024596883190831,15.854332002790713,11.84150383852192,16.663757051286673,1.1573784663347464,12.856753190610819,11.44281932499332,17.492525721712965,1.381048519664163,9.168760645097604,15.843012959288053,10.459850472079477,17.12568114586962,6.484072171664672,7.27736899030758,13.185655895781917,9.699048441942564,10.721361002421247,8.109486653808794,8.176648945704045,6.487595422178916,3.031014805489849,13.229697102618525,18.508832123431688,6.63426880120745,7.996689645670427,11.969879920026605,16.204592959081413,14.332424546471355,2.711432914548104,12.655627701578286,9.277014910758655,3.9217919895590114,19.9177281124513,16.972237083283886,15.883719850016188,11.217595348518618,4.33996099673378,10.995725745459438,19.90455218769803,14.571425696917375,9.131109907808854,10.049754002338368,16.716336253105478,5.446497818244929,17.68315663074287,4.231012001407093,6.626671227736476,19.264625858070374,14.547908054675286,2.8522272861840303,4.23207504650684,5.715973564853507,19.962306166884815,17.31671200665133,12.041012736412146,7.051183959086869,13.458130762905576,10.904204425478778,5.921023485581185,4.655073110219612,10.581089515307136,19.19920454925657,18.051506943104705,19.414559796956034,18.288926211990862,4.6685241448040715,1.291643996734928,17.710756321167906,5.624873857133554,8.922691787781996,4.82775753190007,3.8793418987481987,16.523572883204935,4.155686013161759,17.073881965577897,13.688001203915556,18.90522032206804,10.721535829414531,14.89491645965253,19.969813419180397,9.608169350284882,6.273540364611914,12.339129269169185,18.49001897434131,10.237346232803457,13.075644320045603,10.17521964284696,2.0526524340000485,5.542286689163514,5.759654644245247,0.5996412455452882,3.1486765427827246,5.836771978745947,12.869781952769044,17.60025486775394,0.04089257297827942,4.035091307897822,7.477500672627895,11.709150673421922,12.237017522948697,0.7557393084445385,0.5255807853643502,8.278303469691588,0.6787796738870799,18.390606972180954,7.033411285437228,19.083239655396675,3.6947312789748654,6.001097543406884,9.950353846123846,10.681287965223332,9.373941989939096,12.405460671060053,3.0949483631760444,2.369504114280807,7.0299619692670845,3.6024364805041875,10.455559919271803,5.007667636654922,3.996379368399836,13.20626868470237,5.232792731493294,12.30801848835885,3.8797241071520183,16.124978388909877,19.73615798698255,11.290478364524667,16.128631908250117,17.147933514618042,1.8300798495062631,18.280606923988493,3.890559595190415,15.443021843339167,2.07515772306218,7.432411013525324,5.410026623957593,7.29186539562324,19.141766882855585,2.33099566620389,17.58850915935114,14.828642089372167,9.947137575573288,16.877619887867343,7.311076352007748,6.84362579579088,14.299850838824124,14.620887727274713,8.618290617773221,16.786118198331348,6.47396203380155,19.579254435145288,10.629296531950052,15.654306657380733,1.45414485458919,12.809821082087037,13.489866959811181,10.251139343713373,6.072032082543215,13.918036186319211,17.356362060215123,5.592896351832146,2.529144967589829,9.743524605345346,2.7632244492738423,10.722063067339874,17.673620097411366,13.49995512061344,4.316286084316547,1.3209511956641151,10.088728184991215,7.796579072249061,17.45728639507785,4.563287408441425,4.817230530161538,14.425560380137213,12.869408434317261,13.144158128513034,11.221445412457069,11.846613045775172,0.3262764119444794,14.479214959601112,18.340175031672334,17.137773308627956,0.7421341288423333,15.233896093078725,5.227338529710228,17.655402998072326,3.6682030259676157,1.7741194980969244,18.890369576821527,16.494107352709065,18.88692629424808,9.455361487122351,15.37845859080635,19.86545746968172,13.177830066914193,10.83391580829348,3.7489984671619236,7.633142933180723,16.048521618546093,1.0958923920913666,15.192850755417195,1.385852689848588,19.705782989486337,8.194734893809411,16.01153389596694,8.93046242932099,3.478184404729947,1.61408738325993,15.730089664582412,7.32667416859377,19.902272986410754,1.8464901726032146,0.12364303202549554,18.814282904324134,19.49015499190584,12.928381358369197,4.755095351980159,6.086555846212844,18.67369714710498,5.515150069393866,6.8600368094566155,9.933901669348062,3.1410647445092543,16.14360901719469,15.86040401566883,16.670679582667507,12.633461244284918,14.699974851306902,10.298220277016261,3.240270210072209,0.15716911060814187,6.379913245579116,10.14988007279836,11.508035064215147,14.633337431558285,14.65582017268433,5.505469365822009,11.516423269959892,2.9034279782660466,17.813252717006666,16.805006914307818,10.617329327747989,0.7304302250645378,8.72629624974493,16.76244302314904,9.930341621659494,2.57931326853988,13.856564130239004,6.989371543369689,8.86556198555851,13.43251782615515,17.502927326362805,5.813951369655079,4.568225346146835,8.53169841488798,10.54490627768696,10.059019253718283,5.475128794155397,18.090163995193937,17.514189952216608,0.804976830044426,9.207046362862833,19.062065185413623,10.751056846486179,15.60716833722962,15.507065774488616,8.856818142364551,1.7372589942991912,2.696671420468717,3.9253559115398273,19.037765901613035,13.35665532263992,16.788287024229977,18.592846832674994,10.285089880488112,16.3093784484145,1.1038068223302444,8.061919111518648,10.459439543203564,12.744399008503379,6.081551496551181,15.00619263412811,16.962305427906934,13.633751301084,17.3635639893347,16.818362283646955,6.7737750120550855,16.057951345173073,2.4327491156448655,0.2154816607655663,10.124465216901356,16.405547028443817,15.410213421606462,1.8326462214207506,10.492635333759615,16.716632483886936,7.6789817994794785,10.15842081870932,13.307701487040129,1.666359577549139,7.672432206825488,2.2688651890852807,15.770757486031135,1.7487057369008507,19.05987241760847,12.71753092277152,13.762649107659385,19.591469456618814,11.687194048257163,5.927733554370969,5.0115646463398145,2.388863768445013,17.650706959542624,16.580043683310635,8.277866819083219,18.406000917450882,9.202157992980972,3.7778839755031646,6.8922294931611106,2.967669295565303,5.010911812913261,19.67694590562985,14.635437697913751,18.197907453460655,17.24626495494323,15.133293202465845,13.350706665246047,5.397749526186932,18.586192290728356,15.51535333402359,10.102140257576897,16.708749000483664,9.325563253705438,18.375508013883067,10.637613537000146,8.991729329363407,18.076304455384886,7.334260593737438,11.136732221997319,3.2088118348454264,10.530123919346014,14.159442178771231,3.4991336290215846,4.366169204903292,7.604223440094677,15.994582681591961,17.067160519114182,10.721114305488385,14.72671325453398,1.025358279452142,8.192625092387784,0.4013988967131432,1.9771892859928286,10.871465099263919,13.83839536726487,12.543310586548234,12.496150619545983,11.544576331909573,1.795047820274993,18.169762052328213,15.970964250499552,8.141009999022861,10.480735362102491,0.2684023315072892,6.446692054460903,6.721115964825137,17.77640875130855,7.7835854256508386,6.52411000437271,11.8024956785457,10.196125381616469,16.614573837335527,17.334101355733715,5.856814612655579,15.23130232711762,14.978349011006342,5.961329923609786,15.93438776091415,13.114259688897413,15.256224678884038,12.700462620164403,11.264947659427001,5.944530956063967,16.970650793548316,1.8224304888549359,4.568558356462344,12.995288246780712,13.78503333229415,13.526396929864433,13.751075903352334,13.284941501432069,1.7779308320690745,8.039647014192024,11.78473775724305,0.6635248669277871,16.264856349017904,7.4035344741549824,16.63317098314891,10.097923249313517,12.369190939510455,8.32450621476788,14.925939431185125,5.700691462036547,0.7219786651608473,2.877938250700649,16.19787765188159,19.761500868980406,7.269471404159997,1.275662702160183,3.6655612335021104,0.7974380945053783,12.809310597418264,18.591093788809662,6.139304858038401,5.5291002250007715,0.8584174524504062,4.6628149029612675,19.226675054784454,15.333791336723227,8.93472788296756,18.348954359435904,17.086854285245128,10.526210234826667,5.312401355732619,16.568221750102005,7.611757943608284,8.408551491590618,6.501896086254306,0.3784775888960823,15.450623238456505,5.658150185534416,3.7722727122110644,9.178327224254659,14.799446717704306,2.8185031816772543,4.837582682860786,14.948668129144828,13.105572512644322,15.427494019788845,14.088555643596505,14.648854644030912,16.288289641679352,11.327335156679839,8.683833469868114,3.283430472233917,12.231058479390171,3.5538187460003767,14.823735558929897,19.874921844563033,10.758580202236057,3.6109622381198747,0.18063673454701057,5.745182901270045,5.433866360962694,1.1918984146966372,12.106343365748323,19.897713622649576,9.447848660626143,13.530104247331867,10.195524121767043,12.838283677047908,18.064658213814965,17.415777753657625,8.80075001649756,11.846232591088617,17.315574706127816,16.722761363453948,16.370265151144846,12.496567420078417,16.70274143115753,13.861362991131273,16.132289012163497,10.305637557354949,18.026480074482706,16.71328843133984,8.721197730266939,6.56452155211082,14.514789440149439,6.131972271834116,18.6761226384774,1.872499744911873,5.021607439243341,2.3804532173118087,16.308462877286477,16.22701245440957,4.5990193659528344,7.7999616909566605,11.221060568610257,8.40328786718334,15.574570397134707,4.364749097971621,14.797736819236222,16.899717617860475,15.659026796500125,18.50376465905759,12.39033435297153,5.011071469128461,11.471315489897137,6.211911452011187,5.605708792395738,17.278046237505386,0.8285613591122454,18.449502901525587,0.2724651045019977,15.135679762188555,15.066628226948989,19.188658223520143,17.45651216221131,16.3320077083274,12.16025937046469,0.9646943648197359,1.019869295985525,14.59773615356002,17.483207856987303,8.112064444354377,14.57933750298379,19.857123224647125,13.43290908842134,3.262611215534066,16.313809836790675,11.806770672173691,13.441914678640266,12.706270361206148,12.247768921977897,9.963144350901159,16.158285270305136,9.574121119957134,15.380659913394513,14.818854479779002,14.297106975392335,17.57944406696027,3.3528667302628623,4.873484133105017,11.203999484383127,0.7649319812887212,16.19563327323796,1.4538532212732047,12.53548001556859,4.978533074314129,17.28538676984362,4.378434785481233,16.860811517539315,15.287365076441377,2.172785018182699,3.951114099654971,3.3410610514362338,16.0931774324319,2.2396738658605475,12.81878010010875,6.430957348321118,19.17060349200163,5.395321637932047,13.6681473026381,19.9940712025785,9.4416183951755,7.039084477535527,7.955590408032434,14.704616689991266,16.7236892869648,5.670394486465478,0.7490804766994597,6.703927739254882,2.383112969361232,12.352446268597062,14.711557015406633,13.732199659418978,8.071110622785284,16.79805665082716,6.093253666609715,3.796319010834144,4.107154184377193,16.62260147365427,8.940943731583793,9.771946549478798,0.6576578872710614,5.91955612319889,14.369450703927518,9.529847759069469,5.823618317915935,12.437894333889474,6.616381840499264,7.479208923879805,9.435077596485876,12.310376619209196,8.910429049232778,10.751076591806692,9.830300497666183,10.96515923274524,18.285444395972753,0.38962945331267207,10.978190709266272,10.020573416629714,6.9479883980035195,1.8889558490179414,6.802782400346481,5.809469177057007,16.42908719744224,8.08056820248694,0.999667035482017,7.823875181957831,15.341059842021782,7.075711770475799,14.592418321431646,15.090944311717642,6.717044539800687,17.908628811510763,10.690983216969471,19.53088876573044,0.5693015748657038,7.139063017301113,16.532273548319367,4.733724632557963,9.053783104073506,12.867451156190409,15.552899791788404,11.882446417758018,2.4794198859002714]}
},{}],24:[function(require,module,exports){
module.exports={"expected":[9.450431961078807e-5,3.0309758239057797e-6,5.390952702541858e-28,1.6134368314922607e-8,0.0020169287173025284,0.00020517293853560713,0.008358964516891451,8.098025413965066e-15,0.0009548252179809146,2.8837374608353096e-24,0.002031365467207382,7.165428290620906e-8,0.00011753503790998765,6.882757339554982e-29,7.162132824458199e-29,2.6517415993553112e-8,6.794570097772838e-9,3.7569632774304126e-10,4.102639745642546e-9,1.606307951960912e-5,2.0703085838545365e-41,0.009161121930085541,0.002005711603102997,1.222563996392278e-19,1.1216023199210261e-7,5.497210461266377e-6,6.838301460880331e-26,1.6213424211417013e-6,4.384834594959659e-17,1.4365239721532138e-13,1.6800914124556372e-6,5.406563002727477e-28,1.0567181966994078e-7,0.007724235395135482,0.0014545251389089682,2.201131815270222e-5,0.002515504003971849,2.5472209920929256e-11,3.5391934165696137e-16,1.4786447105090504e-8,0.0017717888016785934,0.0011240445885549114,1.300762183955665e-14,0.010328610370030133,5.051342822210882e-14,0.0075178394453632984,3.600842919270792e-18,2.549895802673812e-23,1.722206999507269e-49,1.0218712162942448e-12,2.1363315287278908e-10,5.404469459009902e-19,3.177496582154522e-42,5.953494458937849e-16,3.4347975588108985e-15,5.125306576965956e-6,0.00017963302806031,1.552680063717882e-14,1.1926004977801227e-8,1.8994783383607542e-10,8.984313549493626e-10,6.549707427281877e-39,3.239834574021605e-19,3.8927296994975856e-5,4.975498806500745e-14,4.0690393576461744e-15,4.833523761392164e-17,4.819735272527667e-16,4.5142377486639015e-11,0.007358020070457372,3.455361682484735e-17,1.325279754681461e-10,3.99332045391067e-12,1.7444460888830736e-9,1.712371406206762e-11,2.0034771088167798e-19,1.325548791548094e-10,1.64183559374197e-7,1.3909446959317547e-17,5.372327000640432e-16,6.972388381863139e-6,4.1490287408503144e-8,2.137480778790696e-6,2.1689217193564457e-18,8.229221780016493e-12,1.133312777534772e-11,3.9760094481133994e-8,0.0019004412736860277,4.440997981015952e-12,0.0002137774246283187,1.1661903579359107e-12,4.285047284485506e-5,2.551888339366938e-11,3.4959490836165825e-8,0.0060774819694249665,5.741471732747764e-16,6.293648616700978e-10,4.229693484408831e-6,2.1108603561574234e-12,0.00010417068884404688,1.4490096896611488e-10,3.1394399746020614e-7,9.580206947478554e-7,1.6022200263630926e-6,3.8866211912196295e-18,5.574943533851439e-9,8.55317012189126e-5,0.009830487367112513,7.771087361781503e-7,1.7730367697627437e-6,7.067225080424581e-10,2.6126914546289282e-17,9.559772940021442e-8,5.494316003765181e-19,0.0181975659034582,1.4451525836223069e-10,5.541851375917444e-9,9.197002261052016e-19,1.1627711330099257e-5,9.77541975904032e-12,0.0006764662501167293,7.93680679937067e-12,1.9681817742597308e-13,3.114019464147415e-8,1.6055347590928352e-5,8.952871981538958e-8,5.831780551843305e-11,1.0362285374467653e-11,6.60076804629772e-5,3.100499433590449e-36,1.3075181397426565e-15,1.0175150605680717e-6,5.289493821415624e-12,3.567655359135317e-14,9.4695182555718e-10,0.0015617404536093285,0.005316172021138415,2.0696131046207253e-12,2.678728655202671e-15,9.641746333031347e-13,8.556781636532509e-5,5.384180326408691e-20,1.1109234910104926e-16,8.902264603203379e-9,1.2290962068693732e-10,6.000943163504969e-28,0.000416942853864142,7.224815400595805e-34,3.219395201576284e-19,1.7384400664051642e-13,8.188971306469759e-11,9.023320344803606e-9,0.00023445932348404975,0.007090557368823267,4.3404795874702085e-18,1.4870756102816189e-16,1.5077849127253686e-14,2.2109602356074575e-8,1.8062952835567967e-20,9.726056571454845e-5,1.190799451882187e-5,1.1880189925058663e-16,9.429053245273073e-5,4.6060246638007396e-12,8.255194092803714e-15,0.006804659018232758,1.4155950343543994e-11,6.979113675167596e-17,2.840819359235645e-23,1.508972551172399e-6,9.696336682194194e-7,2.2272264195227835e-6,1.5451119249241012e-20,9.492753850215748e-21,1.6269289936572228e-13,2.912977508254199e-19,0.00501380771853221,1.4359257430495756e-8,1.7612034129234197e-7,6.683130039238015e-15,7.558328269057637e-15,1.3946307830523216e-21,0.000269804857022861,2.247934626950523e-22,7.80880521221432e-42,7.301663049400643e-34,5.774647549955131e-7,3.100718424341494e-14,4.9352524266797645e-12,1.645458864020362e-17,1.1331297165133929e-13,8.147329650729237e-23,1.85368053674015e-11,0.010725781666706968,3.016864241220059e-8,4.061551954154672e-12,4.643219210151352e-9,3.637359969408771e-8,6.656457575536684e-15,0.002480504808569199,6.342238073415675e-7,9.15050899606738e-15,3.6655554511599095e-7,2.1966943077189062e-10,0.000953918973796665,0.0001349629825942771,1.572052074487674e-24,0.035683241796248905,0.014288833327772428,1.2137379378771564e-5,5.845696587492273e-15,1.4378054563951665e-18,0.0008216851471547676,1.1806841067315586e-5,1.6842512136388935e-13,0.007235004702847515,3.4416943364029086e-14,4.898828233736322e-25,0.0046102232489899754,1.5671171798960662e-6,1.0664155317912203e-12,7.53140024740654e-7,1.7118956055961295e-11,3.094018423719735e-16,7.650741491642785e-18,1.298184156698125e-6,1.3174535900679212e-17,4.626264803994235e-31,1.5096402733061828e-13,8.420250191194483e-9,0.013951065278084372,5.3135959167976895e-5,0.014765423235356068,4.9535670237317185e-14,1.779081592146686e-13,1.4065655482606471e-5,0.0012044724507998144,6.705531108975912e-15,6.35684295502279e-11,0.0032589224364819526,3.323059531813372e-20,0.004338400325731568,8.860597744819943e-15,4.9673321058821e-10,1.4578542332715057e-18,3.9481292344916776e-16,3.6750050611685726e-5,4.9933896294045885e-18,8.860407441733963e-11,2.5151538880139993e-45,1.4024393303920584e-7,3.898685923937351e-12,4.29612071997634e-13,1.3569101446479416e-5,1.4123809246905323e-12,3.529876894195285e-13,2.8166825004587955e-11,2.3913896365596753e-26,9.322805825699622e-15,3.142715220230848e-18,1.3887570872169792e-5,3.6150909133994614e-7,0.009996809948593487,3.4313537949690898e-18,0.0008426088231037104,2.261302077839056e-13,1.92278393160164e-11,5.999766460003009e-7,3.2446141356014446e-13,5.938558175894338e-18,6.415425297917139e-9,1.3995333261630715e-5,0.005705471868547354,8.350436442021113e-9,9.80758415230111e-7,9.155513274565387e-9,0.03665237955697208,1.5255102764250278e-12,3.7329642611146783e-7,0.00872763221078593,1.3998181973492628e-13,0.000422417743423498,1.795358595070247e-22,1.1393507462950616e-9,4.585183610477852e-17,2.157831110477744e-11,3.8241395115169707e-11,1.8711873696661537e-6,4.082188554443937e-21,5.046365329903964e-12,3.2959520829115314e-25,1.2686076504286902e-22,1.6238974095454633e-13,1.0381776428198691e-8,2.4762730014100474e-10,1.6844597118079389e-15,0.00772109255875393,7.120219753199284e-5,0.00011624289405617449,1.8519955170002435e-20,2.1627601574824812e-14,0.009501993320758148,0.025233743739618324,2.483812747194417e-26,3.830094350885682e-12,0.00026797796594842815,2.1886199310751936e-8,1.3678480820571768e-14,1.2815078249077288e-12,1.8730164374008978e-11,1.5537134227339936e-7,0.01705647411407488,3.8659854759633525e-36,0.0015652148210790451,6.466828179450602e-54,3.75629194929515e-8,0.005839525276671088,2.3868890071241256e-9,7.704572452888398e-17,1.0267800853446035e-15,1.3969620154206483e-6,1.0979313922907788e-6,4.952421134247446e-26,2.6356446367229764e-19,3.972650865638552e-14,3.039902495617829e-30,3.055391353672595e-16,0.0037368974113776493,1.2155300016991083e-12,2.527519725606869e-15,8.054084024032826e-12,1.845216808606836e-20,5.2428292185461115e-19,2.9738705473329117e-11,1.95088299802707e-10,1.9547339204627207e-19,5.8649479166351364e-12,4.721265674113601e-16,9.363872025049251e-29,1.0967819436933313e-10,7.835864255441128e-19,8.677749459802531e-31,0.0025814352269065287,2.8299628209491135e-5,0.022555673578381178,1.2572973393857848e-13,3.5322525450963584e-11,1.5730004280230286e-11,9.522589940369075e-16,4.845856091771163e-18,3.950686962892333e-14,0.0008367818977163552,7.679333146530894e-31,1.349399391056573e-14,8.359013751953952e-9,0.0015886909251160077,1.973347720648823e-13,6.972277806487275e-10,4.9175538496135116e-5,0.0004479940547539568,2.5244246304027017e-17,1.0503781709221134e-9,4.1005035992967025e-9,9.032228670051549e-32,2.3867247434118014e-14,1.1353661310515655e-21,8.544129740593571e-7,9.82399643175367e-13,3.9745930201924236e-32,3.9322445906465086e-5,1.7556456260967544e-13,5.5356459646288424e-14,1.1751823739587588e-10,0.003606632282122914,1.9676443965908207e-12,3.467298446657064e-18,1.6664561887206088e-15,3.332550387070823e-11,7.0227761976499714e-6,4.1831872344198586e-5,3.074615213374847e-11,0.0006507805975751255,2.0053154014091598e-25,0.0013801739860475892,5.067663859955819e-13,1.6889736287079313e-13,3.015242237516218e-17,1.244167440351593e-16,2.274497336448495e-24,7.083119312011595e-20,0.01359444528278251,0.010567935429784698,0.007881269630688534,2.702334651925088e-15,1.7089382544198795e-10,1.7247572014510832e-15,2.5861810127406735e-8,0.019898923991676608,7.558563639571794e-11,1.6682702891107363e-11,0.005400562771969209,5.7395460631002595e-12,1.8090293315299918e-26,0.007002453995096177,4.453580157941565e-26,9.873695126429808e-5,0.0013164087258455608,7.563047566299797e-8,1.6460608583394132e-24,1.0406472253029833e-9,6.872403387671722e-14,0.015458310796564118,7.408107671202663e-42,1.5886041301948762e-11,1.112251227608555e-8,5.520770972235709e-10,1.0929244800826094e-6,6.590877661813426e-12,0.00019127004682915492,2.4697529057183304e-12,0.014128904399114838,0.0006356082686444621,8.70942854325063e-9,2.1425094584390578e-16,2.553117805226592e-14,2.3966024557517422e-8,2.573360485995368e-13,0.021629721300197982,8.142573463968066e-17,0.0003639004910976098,4.386940902266639e-6,2.850596134010859e-16,4.0235263504845e-20,2.0269750015788843e-13,3.418850183993571e-7,3.0598319370207786e-6,3.686814879807103e-7,5.789901518542355e-15,1.8046438347564664e-9,3.144605096046905e-8,0.00022786063029364223,1.5062019468631378e-12,2.0254970000486907e-35,0.00017459155645961077,8.25758939288906e-12,3.356852273314876e-8,3.1699398360114947e-11,2.213993691032455e-11,0.000112903140816279,7.029586732527513e-6,6.654906395989741e-16,5.012317127244858e-32,4.798721104527412e-12,9.52945490402651e-15,1.9287955929440105e-15,4.668842915208362e-15,4.0979734065306494e-5,4.723844477670413e-13,1.7817961128333774e-19,2.6187248477363792e-23,0.0015964015727617962,7.562904013521167e-11,2.0387033605449363e-8,5.698731109672402e-7,3.041358735568706e-10,1.0949465427123381e-10,5.8633602163289106e-39,2.2098799021403275e-20,1.1215386073119768e-6,5.501026071258347e-19,0.0068533987168821215,6.561315665299227e-16,1.0292459030507274e-22,8.86272573053156e-13,2.748222952407261e-13,6.4344267117354175e-6,2.2124945820389988e-14,4.515897381595587e-20,3.1722935701604566e-10,2.533392068020739e-15,5.646184282572059e-16,1.8941604166839615e-5,1.9060393716531563e-8,2.8074251559264545e-21,1.1595482941444182e-7,1.2487310602844121e-17,0.011164610909118649,6.615114405121537e-16,0.015743891180137224,9.718038208280383e-7,1.606064909047201e-18,0.0005783597310456384,0.0003071946146848354,2.8670205031546177e-13,7.588816330182275e-13,1.0752421210966093e-22,6.854060688399916e-8,1.0572586519772976e-11,4.1836107338102517e-14,0.000319247138737269,2.7248568226952458e-14,0.016316532752565772,6.944277185838839e-13,7.079155596319133e-11,0.03927680758482596,0.023920463603983186,3.858576922831139e-11,2.166064914016314e-27,1.862926066892089e-5,8.235210395480751e-13,4.448701974433943e-9,2.697242859063472e-9,1.273973541451745e-6,6.693759428434489e-25,0.00020192688232378094,3.0162479349445527e-6,2.6374704838222806e-12,4.83640849614939e-26,1.0777407789521572e-13,0.0038920051994234023,0.0009717418524280227,2.93451973479067e-7,2.172440262761275e-12,2.087392057623897e-6,2.644599887256899e-12,4.4555896025498923e-11,7.822240609059119e-21,1.1875600451516397e-11,8.834619087871368e-6,3.3191341587578943e-14,1.8119489049030467e-27,0.0077913168843316075,8.837528732434216e-13,0.013639706985775733,1.3066051609229072e-7,1.1832729283886107e-8,1.47889477824141e-11,7.136818118000127e-49,1.006064573627811e-10,4.57866566216667e-18,3.063974969195892e-14,2.2449560535059617e-13,2.897858281565806e-16,7.03534292509674e-16,0.001891560135703284,5.833106314550605e-11,1.0978631640334075e-10,0.00038120611065037676,2.5259960349149306e-11,8.805285097595693e-14,1.7298740232219618e-10,2.82448512727888e-21,0.0001003501486094231,4.895646261355374e-13,2.0397632071366244e-19,1.1190657589821e-7,1.2557905777837495e-11,2.5883234178680973e-26,1.0675119379781505e-9,2.417556156914447e-7,5.821045573991177e-16,4.996623409405742e-11,4.75518254198318e-19,1.874753137695719e-19,3.6110110594510856e-32,6.503138513882415e-20,1.1670529427882633e-15,0.024976821708121093,0.03369825923610052,4.916400471638137e-12,3.0471596240469704e-6,5.2407070373023845e-6,2.67032427182164e-14,9.965948078910394e-23,0.037613589253712804,3.6942392299102563e-10,1.6440705912291002e-19,4.473623165753841e-9,1.0077241599259267e-12,2.7041569132517727e-7,5.9103471931348865e-5,0.0012875889185659907,6.258553605014869e-10,5.021776770110399e-5,1.3623825944524395e-26,4.616484935809038e-22,1.5067783967038247e-26,3.8102832370672376e-12,0.001991892424666007,6.314610168795899e-26,3.581247794119324e-23,1.2993020781299323e-8,0.0034797268894148047,1.1847466466067197e-17,8.821430751101304e-12,0.014947054188996188,2.1981502922497524e-6,1.700163775340832e-16,1.264518153825595e-20,7.003144533902272e-36,6.195583008001917e-8,2.5348021576408728e-11,1.0420094368124457e-6,1.4893226591219935e-5,8.320264165689387e-12,2.151817298554021e-14,3.5421742166907937e-8,1.666217540016401e-12,9.329544255859886e-21,6.481188180444378e-26,2.3894562860398834e-15,0.01345704475571359,3.251256007214335e-5,2.616194242784115e-14,0.0005631431201377562,1.9161387305358027e-13,5.707466639581331e-17,2.9838697979799457e-5,5.378288445135613e-23,0.004773368009284155,2.6687983065423313e-13,3.0613151913250294e-23,7.494219975154556e-7,2.2525729921592358e-5,2.3762304291128277e-14,1.5099220104601088e-9,0.013743626736588134,0.007272107056103393,4.483368620680892e-16,0.0005070824517105451,1.4486319588076023e-13,2.9644220290775697e-7,3.015443381897204e-10,1.322455072072003e-24,6.581250626265655e-16,1.1152885198435198e-6,4.19461641452864e-24,2.3609552442190415e-18,2.17418515977679e-26,4.640953767422333e-18,4.652898567440768e-6,1.4744073104274636e-23,5.727216708232793e-26,1.477172757286006e-10,1.066936847746751e-12,1.944843745792123e-31,0.017584800083372334,1.328342940780712e-5,3.657594781266859e-17,0.0001732533914651234,5.302814684333637e-12,0.005912529678191466,7.844718749072752e-11,3.3936827983975705e-28,1.7147161274654144e-5,8.145842256300852e-27,3.0007783664836206e-19,4.3916623554993154e-15,0.0001315304796971418,0.002547729177913338,0.0007057692446760626,0.003202365674879052,1.351863653955406e-12,1.080689570153254e-18,1.0238481271488937e-12,2.9720812730367262e-19,0.0013728067873963442,0.0009179978845583943,7.72045405697367e-6,1.3110874830412313e-9,0.01143608660066565,6.46495453618068e-31,1.5074507240989091e-12,0.00017957633923154946,9.67192975426526e-14,9.331937111417277e-21,4.089667692388463e-6,3.768585262333552e-7,5.718771881144319e-12,2.0054515650438908e-12,1.247645860527268e-8,0.0005125113599250224,7.790151615027853e-9,1.497444502325435e-9,5.2997456198107515e-8,1.9584350919497305e-5,5.178410073724202e-11,0.001682572736614919,0.00010283532986831559,0.0057874069109684805,2.572495651347116e-15,1.7335635684569861e-9,2.2753699792590522e-12,2.728135686166495e-5,9.200410159568996e-20,0.000103172362752804,2.02636751534498e-24,3.515870464935386e-8,1.211990417742458e-18,0.00011522736666605208,1.6657135181756988e-7,7.045006144811585e-16,3.5432958447563274e-5,2.5053841345635473e-5,7.859180826966787e-13,0.0035398233164841437,0.019493325172763244,1.197006376258419e-16,1.671961180896441e-8,4.581948912802495e-14,0.00342017354459634,2.235979106141525e-13,2.779720413826928e-25,8.13932211107839e-5,6.238246726674896e-22,0.00012023322378664568,1.3117095691999471e-8,1.628454662155195e-20,6.427332458130132e-5,1.1578068358422047e-28,2.449016941853602e-12,0.00011856740912871439,0.0021784150054545114,3.658194475900843e-17,1.1874073740179693e-18,1.2738320717048875e-12,1.4552417951008221e-8,7.103681564638277e-8,0.0006962084684761223,6.9623584970128874e-12,7.114145197885808e-19,1.6950569148424516e-17,0.0003386718396130695,0.00011425875937828828,1.8166804461508148e-17,1.3837898982882454e-8,1.3780746640340892e-16,1.779430032151174e-12,1.8195853977846196e-9,0.0032865527484790135,0.0004269242694220695,9.008929660340837e-40,0.005163832869352017,1.030810407030792e-7,2.087922090656916e-6,4.473518940294044e-15,3.450983120784433e-11,1.3417793133921253e-6,1.2318033778919683e-10,0.00300162866612066,7.931152940748372e-10,7.35123141621555e-12,0.0039641694678366046,5.056786376105738e-7,7.777308066702825e-5,1.0500147393309423e-7,1.0131931090534969e-19,3.917460859935662e-11,3.5482819385833766e-12,1.2935716682658618e-28,3.1290953531438544e-12,2.896328416649718e-7,0.0005633065600681218,0.00025877647504192507,7.400043643380133e-9,4.9044576328791745e-5,2.136118464860719e-9,0.00010868570338276797,1.9425608283726236e-9,0.0002746525273874393,8.964945248563601e-17,9.844556825804695e-8,4.297708349950774e-11,1.0317911986770448e-12,7.451801374992911e-14,1.9634433496291832e-16,5.620232060268702e-6,1.9935851167972325e-22,7.342213443162568e-12,0.0009490312522373075,1.2023283672957276e-6,0.0002893089620969702,1.1578072658841609e-6,1.0732132283499411e-21,0.0002984804747554572,3.644150564835262e-5,1.172807841860646e-9,1.7175575294982415e-16,1.8815691388401931e-10,2.35844798800819e-24,8.385802495523412e-16,9.370025834011713e-10,0.00012732788914837146,1.7532866724254248e-11,9.092066702646906e-13,5.331215875199716e-5,0.0042792138394098555,7.75263004027121e-28,1.7287193913235648e-12,2.431126163915065e-19,0.0007298688384308808,3.2717147128529976e-19,3.653998120899895e-8,3.7356765289510034e-14,1.135554074390193e-5,3.6663097289658654e-6,1.38591025921126e-17,1.1632422014065741e-11,0.003015612110377475,8.090589671738497e-7,2.363975308787348e-33,1.189816763664777e-17,1.5643452352239196e-5,6.9971361101727605e-12,4.309771753484159e-8,1.0826573489769414e-28,0.0055664300361477174,2.8281635921034317e-20,3.1387008015523838e-15,0.010368850428799306,3.027778256480648e-6,1.302755076082186e-8,0.012174640618731143,7.574453028114637e-5,7.37290456352184e-10,7.664607406596795e-17,0.0001458721808831389,1.1659119041082462e-9,9.001234360347737e-10,2.1613246062130818e-13,3.706885514961926e-36,7.896754666652483e-22,4.215320546608248e-15,3.522824561974228e-14,4.0261329407605274e-26,0.00012915883882262433,1.7258021957536367e-13,1.7870496068468377e-17,1.1082654980205529e-17,1.3310892882857889e-11,5.143515558706369e-9,7.86087340937573e-9,2.893660520611122e-17,5.557328128177973e-15,2.660057685058109e-6,6.529775997740062e-20,3.5340543987673276e-18,2.2533194790273226e-11,7.777662631697349e-7,3.4636059692006776e-17,5.355091014456704e-25,0.0026106282338270326,1.0186837579733074e-19,0.0030242998014246483,2.112368330343733e-17,2.431399832983032e-9,0.007185685190966401,6.330237358880779e-23,1.205185795669349e-10,7.495933479021056e-11,0.011375833353518102,0.0007161325854525701,0.005647332867631098,2.7165403746743417e-13,0.013322787692324357,5.231554644385192e-33,4.792166378810285e-13,0.021035772517875882,7.250791067451518e-10,3.6467125113068975e-10,0.022100171923115794,1.1501667578636418e-20,1.2553867987922118e-8,1.6725185476620047e-14,1.0830083569406589e-11,3.357946634023104e-5,2.4814751203090853e-9,1.3632271698821636e-14,6.1156413715740135e-27,1.6507785668808115e-9,7.05074386620555e-14,2.048344497319425e-13,1.5556524610928097e-20,8.140296218063295e-10,5.487854777141311e-8,2.13930151437355e-28,5.402079201802657e-19,5.91448596765041e-26,3.2379847596584624e-5,7.33982430745437e-12,3.7866564364927675e-9,0.008161026116975953,4.8025684910843926e-11,4.626929619282305e-19,1.0190890267378687e-10,4.185462258990848e-14,5.344675752000862e-9,1.303255909671571e-14,1.3151692549604718e-16,3.434762946401299e-6,2.3533531682023706e-8,1.406502464140705e-6,2.6250730998554924e-9,0.0054882852987635546,0.015067040431071616,1.8049602119498966e-7,0.015655652279869738,7.142823867142309e-13,8.229450439629318e-10,0.00021120245436228894,1.598070029954094e-14,1.5203867324751068e-23,0.00016686996080922452,2.457231855620212e-12,4.1277623595865115e-11,0.005096168449234042,1.0088288552877002e-11,4.221699916618386e-14,1.0972691651182004e-25,1.5951412328815354e-13,7.179366799645178e-5,0.004593768366088196,1.3111371503555026e-9,1.7117325045713582e-7,2.9449561126190513e-6,1.1482341693739128e-9,1.320463663461585e-11,0.0005056631554603751,0.00033321792761915284,0.0003298161687994467,1.0390455860983638e-12,5.871064927587439e-32,0.0017467615422985562,1.2462334831304065e-8,0.0030720891541769066,3.561761027134398e-5,1.1989585110184117e-11,3.4168796008579016e-10,5.120384712488527e-9,1.763966737902981e-12,1.5558945826120478e-14,5.819941335802796e-12,1.269914635458991e-16,0.008944188015778384,1.476399506978271e-11,1.0363188047357878e-10,5.358701423058474e-7,4.9641858772580366e-24,4.326757928249347e-15,0.00022172468214587914,0.013309443655903922,0.0028652199695533877,2.1457843995438766e-60,7.247385887425587e-6,1.4638018083476428e-15,1.2442143685242004e-14,1.821685328375695e-27,1.212016356566725e-13,1.1814787509788745e-22,7.587418139110104e-35,0.0026188919937126815,4.202720000789954e-9,2.1134340471755454e-7,7.639682337153264e-9,3.114040725249125e-12,1.9755567895033866e-26,2.3091060513029013e-43,4.295368249220656e-9,5.90919756595384e-7,0.010246817630945928,0.0011865086731184425,0.0004093161165221315,3.4677879175887405e-26,2.2657309941049863e-12,6.602258756397549e-15,7.867083442388086e-12,0.00022343719286120855,1.4848102856050057e-26,1.7621955838501372e-12,0.0002436967345762581,5.0684913397607594e-9,2.43029668397803e-10,2.586961041746708e-21,1.2789514572457025e-8,0.006503968039739347,7.34724166844297e-25,1.0011734680598006e-8,2.055313646134013e-14,1.2698183714075387e-12,0.0004358423750767807,6.857136348519562e-10,1.5561500037694619e-30,1.5534503706131386e-16,5.204696288699347e-15,1.52712918381038e-14,6.628275293469806e-13,8.05914609189138e-15,0.00036490596619806264,5.049055107731515e-12,0.0005957926444354904],"alpha":[5.539325326767215,5.985743433988149,17.303985420557343,7.565300528493104,2.8431644594649663,4.922753139203908,0.6038206057318973,16.856472069395537,1.4116752475570715,14.774090205322516,2.1073945843792874,5.291290103080568,2.6250158231349685,19.00793019122883,16.560132835364048,4.4034506042823995,4.472997794845779,8.952101956947448,3.726373351672021,7.533566482737153,18.400164140451565,2.1430926841054365,2.9276382843221516,11.647884637597997,9.150156903513995,5.585963874501334,19.863307429135837,5.1063746776602414,12.970010979364716,12.142425449246321,12.080477039725452,16.89164133051814,16.579673166791558,0.1988980529340445,0.049374957480781134,4.078285033649411,2.564410516342135,12.380476398424275,18.824921255275395,8.09615994825009,1.714237416776978,1.9112062353836778,19.359202897346727,1.9692708846567575,14.08437899488288,3.131839580824556,15.61998601249552,13.372461802456685,17.178482977005757,7.274512371062358,11.515582133163633,15.535347881876923,19.453940260707103,14.467640639236272,8.63573176086081,8.192505941601818,2.7136995550196508,13.119965455691695,5.094301476040388,12.444866019462456,6.592316233089455,13.584016535658163,16.463069875389028,5.188363189837379,10.268204494067522,11.450511929065467,14.775863103480237,16.82031119000858,11.35564048828774,0.4414079706932972,12.735255083382274,10.851483188217621,13.253957913017791,13.613940505856728,17.991536621530283,18.009079241173993,14.304185322917288,7.002438096151806,13.498573342091028,16.13102002536484,6.4027596269659215,14.174291959572463,7.204055719046214,17.9786947223942,15.543843329235884,18.82957462604725,7.828414215575723,3.541801022714983,9.660377484612459,4.930112710285881,15.440741330679174,4.39276232873596,12.517758254596165,6.057494405987693,2.4461537931236244,11.951866253152762,7.640207571292068,4.803630147526081,8.841580757320298,3.1929189966864646,13.7489245874516,8.172365333751287,3.8552962051991058,2.4302044628515285,15.46941162099464,9.87862415482664,5.777994694264579,0.4356316288212758,4.511664267967044,4.617411885790377,11.865464172285964,11.167922620866712,3.916383261501708,18.665163903719986,0.3072796050218596,8.681742943680186,13.753903278448686,13.488381321147562,8.762638242898708,6.7282947114621106,2.247586558667627,11.802439341335194,10.401823615483528,11.15097961060978,3.9188131126241954,11.585358456615777,8.378000017469889,7.97745387067581,7.321915648079567,14.326701518182045,17.894541428107033,4.831529057634394,7.820174652501581,7.040812311584337,11.274543093038108,1.9569684894090722,1.10141345033274,15.313357217544784,15.293778445179607,9.291623797790267,2.8471863536103426,17.76298422544958,15.017930829978617,9.577427716441047,12.729174197816695,19.19449435067977,2.7338386235168866,16.740132493806406,19.07188860876582,12.681023882023052,16.714383141540374,4.95665070772521,4.662554699121917,0.8168378528893294,16.881527876842153,17.54127901922083,11.09987263956269,14.184132226925477,7.39514373832495,5.976967350087907,6.237449236120258,13.737529631781914,5.69137059161676,12.801268759903625,15.44655999405689,3.0837272272114413,12.653602175279834,18.801636290790825,16.2900251665274,7.672658405268469,6.2455563333003505,5.74180750511633,10.35503344899739,18.95993709363365,17.870800970107123,13.208491600509507,0.22650551124045126,3.3486249151213743,3.3792218658709405,13.963769149687986,14.680408833379364,13.617245999731233,2.813496679642973,12.374992089778969,18.631254895292244,19.640082955350216,7.3940569430904635,17.212846396814907,11.426674279456691,14.772670252936075,15.795581077171779,13.920249491460721,10.528626338241045,0.5533913401142021,9.885080771441173,5.433228118560245,7.222123980835318,9.681908787279818,18.530734169875824,1.1662664100301745,6.268881449851418,12.950968847655187,4.221370295306568,5.42450726872171,2.851104631968875,3.102222297770898,17.894080674603536,1.1738476666741349,0.7583351368574576,9.202975145904912,14.402201182740875,14.382038332376169,2.857371382257674,2.5606505974019322,10.342315322022753,1.107272137202524,17.521880575838598,19.021555552860384,1.1801647623793565,4.439948956857673,15.987921979404614,7.244755946661927,9.328097221944102,7.844324918695591,15.282813543991818,7.233879406390709,12.718742562520159,13.628964892998399,8.549128808805282,6.877754160193148,0.8928576568028879,5.132575279694471,0.5832522265444551,11.87609476937288,13.510144485131065,5.149090502068319,2.7553510776932955,15.650813007935248,13.828222939663046,1.0098508377237936,12.494007939179275,1.7617256423585026,13.148957532812027,3.2235032391069085,18.86567714080647,16.224361634810485,6.188031112809003,17.39793151451066,15.741946844848837,19.755540486610826,8.174505718182568,15.3063513888742,11.999165061953194,3.8563981730791275,14.371767634932153,17.461615727500064,12.113052095073478,14.61270888091985,15.671386576813813,15.481584637951693,3.1841984606212215,6.875339945780969,2.266552758446534,18.578121252058708,3.422752112342047,18.733622359895,13.549687991092082,8.553606558737222,12.475345519091485,17.939598221093284,9.792643461366213,7.865208569260265,1.6665282378702084,5.512418851707137,5.418710022379245,5.359862788194416,1.0846542739198917,11.328812915714646,6.536792253342751,0.9536129760471201,17.443344478056765,7.423733182210817,19.31475906199207,9.618785333048457,5.971596428082959,18.727792866345858,18.018448372755525,5.498961196209433,17.70393248938001,11.568411714127812,19.42161978095013,17.953652545718995,17.150336546408518,3.1213718205115226,10.800007002128314,12.340066902603176,0.21500795957482666,2.65627433879426,4.403395539873398,18.834922507717916,14.090390619191439,0.4379632640597153,1.6888583265258905,13.767644237322525,16.49245860348644,4.414053781392955,10.481558536830038,13.032469846233417,5.90584088698912,8.347390079871655,10.3080683893096,0.6197562397619905,16.226680575099188,2.4538079707701277,19.383776977088687,8.1252699372906,0.19644479049704344,7.934031792040224,14.753329371046657,18.58193178421358,5.19117735651347,5.93485237286032,13.363185758635083,15.20750820890945,13.53645985174236,19.676127768480292,18.889261760456634,1.6923415083003368,12.971348750561704,18.49344904277335,15.265650298407426,19.609409570937725,15.27398409747866,10.832380995672741,12.663458781287789,9.698165304035168,15.934818430526718,17.64836079018279,19.93700624455638,11.210542538471424,17.462875050047035,13.361966088375246,3.4126631891147152,5.213288875730977,0.5450165211206182,15.92754853133085,11.702145717032423,11.791344442014523,18.069336217366182,9.777560202775334,18.364732884871103,4.844997315151036,14.437864416318789,10.509683422465645,7.990211175197808,3.2062385631667967,11.526462941521478,6.035868051406141,2.181503324818932,2.099950710523002,19.32596082008752,4.420123056496239,19.878353153750442,9.566813831356104,17.836060302797815,19.800211679781835,6.566590494408393,12.679063718344597,19.313737696642438,3.6512843820207053,14.9085157227112,15.515566032531067,4.589292250129091,3.188569236366856,18.401730555739235,14.686932553884402,15.984283253843454,9.076484382860253,6.6061322270567535,3.356312123753944,16.25473954994777,3.2865140989923836,15.066448007486146,1.3839517243154864,17.07287903328632,17.09946791273472,16.40925775969023,16.073004299885252,15.490576613160183,13.514734264955637,1.0529265753515116,0.43998632449458785,0.39167760711291244,16.658375073939542,6.272995078874728,12.13788593129669,9.40971494673538,0.38824812335864767,11.66088885258338,9.27420964113117,3.531644420124911,13.907445409626886,18.03117463289218,1.1345783316906166,13.422429891934184,4.085190513801549,2.7890365610912626,8.215088540424883,15.707469403008446,8.24110831236062,9.20406609334663,0.5275884224447891,16.63267343704979,7.688034586194603,5.680327442671516,9.417719151504777,10.83198956305341,11.832297085581214,7.410003754656698,8.149797928322107,0.9198578237847332,5.144836501745509,5.102741839645821,15.728765689742538,15.713135242799222,5.187122129766846,9.227602822506293,1.8429534840988948,16.230232999089218,4.462849152866819,11.023074726418077,18.475489652331582,12.567969921447983,4.250687027745741,9.458476697655458,9.880614985688183,6.13516097332151,14.384866612728073,7.13089499133893,4.920706752382569,5.8133967488645455,12.20396095795332,15.346634450171305,3.7433255191044745,10.926000040768002,13.73946529623363,15.349565831187185,10.36468146520582,4.063446928765648,4.837114401796563,11.451637238780105,19.64902926087568,11.878556682328263,13.956310602902304,18.823108274926952,12.459489513057903,6.512657685078986,5.7624261329659054,12.444276348537713,18.630979193674236,1.04553501022004,15.172973923237345,6.822101992393796,5.860074615610018,12.434378642584587,6.977295504741119,15.750404245073435,19.568201843651885,3.693357284664245,19.609771698951267,0.2660909292560065,19.37920791757644,15.869876757731225,11.87626011107957,12.560707684182848,8.368612341722145,18.293543671475582,19.75485489574787,10.682512816059567,15.663986592279212,11.146431116141354,1.945510844790448,9.338044552723908,13.440711095846773,13.959191920965438,17.486015696711185,0.4113274206534623,16.707230780966743,2.2603888864297383,9.33763572833309,17.521830613346886,2.737991962943358,6.005962053339431,18.843785399523988,18.767875957040413,14.240118265625185,6.014749951426923,16.09927523927814,9.818542238285355,2.9518735306769806,11.456209539922945,2.171906215180579,14.787133986517432,13.37964454485478,1.639973745234946,0.8013992136214743,7.645869068779048,18.357234181770785,5.339173926969432,7.463859984794867,5.812694825928855,11.924205195107614,7.782635532960835,17.964252252903485,3.3552046952416115,7.671552515816327,16.88639857043846,10.262434117168514,15.031975211234538,0.06796975633357683,5.772902098037882,9.97944032919543,16.96289479360957,4.031375528104779,7.008128160939431,9.6524113033606,17.060902299804436,13.409464443287602,3.8252535963658962,14.90910451250507,19.725381394865444,1.2104278256893153,6.212289827300386,0.5305373989858664,10.627913990679968,8.97969266024627,16.554958358817725,19.692328067566788,14.625411580208642,16.17697506900413,17.31041620567463,16.22262079408452,14.851365283216197,11.355589085085533,2.779942459892677,10.437059362318495,14.106452364223339,6.894646756239875,11.307524765938393,8.60189203555732,11.617920801550031,19.413894836453377,6.5930525824436925,8.004945235420355,16.773703902555837,7.902247715195516,15.80152985541078,18.7859773360466,10.461638019320286,9.536863821812327,13.980013376254297,10.816971963781024,13.36551559434163,13.866437327533134,14.199896965348024,19.04848386048464,18.521896887955386,1.4725172254200025,1.410917274257395,14.531884407993353,6.705126311265004,3.144111157276366,13.717506890417708,13.056071694809388,1.8827761232084361,16.031429590558822,14.039348110102065,6.444350470027662,14.577584322020819,2.8995464281250305,5.537075624673893,3.7430273341577047,7.497878813165402,5.970144718046835,19.863575558830874,12.702263050703442,18.17551453895235,8.724069453993195,1.802126516984064,13.463954338537313,15.386697952088454,3.4646089802879665,1.2726374603015866,17.442298876863642,11.75910344014417,0.3968004476104925,5.2695516473402515,17.197231757051664,17.120975214230292,19.468464403748005,8.141398241837008,13.664125493155188,6.046819805471153,4.611709009327214,6.581728885082998,14.10629877306234,7.4330747245916795,14.01508266075988,11.53052456961571,17.355813939792174,10.987611722430604,2.1731948257664824,2.1163107657274427,15.874602150523325,3.413446186769722,9.681824860326689,14.512174887044136,4.659709490476547,13.653607002937047,5.161458423178882,7.999921710188529,12.296125797934675,2.644364844417293,4.637352379118629,16.577266594337953,10.495272768847371,0.6366195017624765,0.6390888408829243,10.387421032955725,2.5874407449794834,19.572389610243878,4.83292690968443,5.598776177659142,14.018887223191099,11.228198816235185,6.294977405015318,17.188053095115286,19.6570729135671,18.154870111981367,17.608109360958753,5.834453258452856,19.768961143445086,14.369946955231718,9.805969566168704,10.969468086858134,16.00474606736864,0.3873943549905068,5.003645843410847,11.185722438607332,3.062211797297323,7.337747513188244,0.2791220154755214,14.914731577325524,18.903837309455213,5.095141491858204,16.90351884318953,19.084039620247324,15.93097463159566,3.2739978939953973,3.0921157973029922,2.825736779972434,0.22547288390663667,11.593451024391598,12.201195058496538,8.758085187853602,5.759215846021393,3.8709159274431393,2.3739561656823005,3.9422986004200977,7.474091035495953,0.9960636723466898,17.43816745384935,13.522139326271198,4.715081994558856,9.886329242452918,19.51950081398227,6.183989178072187,4.596826698039811,13.417321029088196,16.72627833492814,6.5073459266897515,3.8151141655348964,16.63403491158686,5.333692805063812,5.744859758760512,8.785388224859556,11.685158889585754,0.054553249314253094,3.7821953529432184,0.6333271268492169,15.173935949304923,5.8092899685969,13.997552432449814,6.092806675704288,12.078173783812677,2.3167286868273473,19.027699375362186,6.272488812071053,12.464920755727613,4.883617114477996,9.52417275646921,5.512438778375466,3.819972636925222,4.786882037347802,18.21382081165674,0.32233274389140476,2.4102238757992245,11.113428683865543,8.740047140532784,14.198684456878464,1.517297048831976,8.770485266758122,18.572214597500412,1.820091942072648,16.258747530763635,2.187836717480418,7.191933977503675,9.538748089646845,3.2523634023074255,12.534806733801478,6.476706926435392,4.637564520933486,4.983956591023211,10.828425093113086,14.778250349522647,16.496018937888902,9.735870317324228,6.071621672248155,2.3733547439628655,15.85222659585698,14.707164105740533,9.667800606419616,5.110379531299243,3.5475526309341765,17.650862558018016,5.556628198243496,13.736324627412358,12.374236369463883,11.853768101876337,0.7687864901206565,3.5046136426904884,9.845215757512209,1.2148302208922823,7.337732713085741,7.7075886020705076,16.57248745502866,10.876437791308057,7.473132301226451,8.56535131285069,1.4224142106101079,10.93022383562018,18.582070050077935,0.8754791913920767,7.426104870343173,2.20319502328155,8.205263122664984,13.01759445105905,7.711535593845249,13.245782759108927,9.552971807068404,9.649580115243946,6.34068434403821,3.79923485225631,3.7965272284215734,6.352568420020632,2.7121825047324855,9.063017350050856,0.8660149770438075,6.568441765759618,6.920261164022343,9.139512690342645,8.939893080325213,4.59841541264542,14.64371270999286,14.90632392067338,19.348987044582614,6.653573650350797,15.16578737329436,12.780513104070712,2.539368566762268,2.4186430288804894,2.132969879072464,7.176306842769566,15.197879907871803,3.2027325732908807,6.0276890500797675,4.527527702371357,15.739621283231223,9.80810609319748,17.57939540701372,13.662768118572384,13.810318505579877,5.673704489264688,11.86499918588889,12.864165990610328,9.689262704789536,1.4964205389578522,17.103607058704675,6.804532642656658,12.218628734888068,2.555851359383361,11.403597350505175,14.229226658922208,17.977322989353862,3.2899344032829925,8.62831908141494,16.52475965384302,5.919330869190422,2.3299674182994012,3.6828797362825583,19.5296774516442,15.714330914207482,3.209349859258186,8.389188811529555,7.0684812821373155,17.462834512558114,0.21889837332474293,16.19625283786781,9.591730115067985,0.433511975346601,6.885718475208837,4.788048488092098,1.2860845813720356,4.25365098588276,10.872312479045569,16.194213679113624,3.776743897338206,7.331778060488672,10.807073544130578,11.149734244789432,15.836039511130213,19.77755096875324,19.461832344231375,9.759803519123258,16.69052169415685,3.7828500951468502,4.979167740475172,16.543096232550987,18.629548188037532,9.737836845733327,6.34591862938616,6.825625861949098,18.284069176745497,14.070994711596757,7.074701161410304,12.76971279811474,18.678380549497792,17.747718593559295,8.47202483847795,15.395873161776006,19.893563622791135,1.6741633552513369,18.60232315655438,0.09595537463092718,16.86543979568767,10.653961244562883,2.120986814815269,15.431666612535619,6.120263506377892,12.573699104837734,1.5766006921441234,3.0136534884089183,0.2056395290583346,11.097498237707537,2.4055881654833877,16.832117541347657,15.020375208003177,0.8098039400497425,8.21331804911717,6.779770687744273,1.51146693611651,17.3690277182854,7.253472958716056,6.086156307364612,8.937341722923136,1.9099310312635787,4.986191336278454,17.590434688116574,16.312287801042267,16.602284764701874,12.83898320357527,11.318611188334966,17.106323200515583,9.956417709955222,5.729739452501708,9.803652887139584,14.320276264739263,13.075737279608127,4.238696422095685,9.591372985400568,10.503154975864613,2.2327418213291716,11.87506701554016,14.69647966180657,9.295266351584646,18.461925153287343,10.958486351701113,11.906186923775245,16.067110895370075,2.1719464157179402,7.826903595383197,6.081470146857377,9.614114740746924,2.54603016583812,0.2998800277287561,11.561366572286165,0.3277798505838936,9.341432960655567,9.467728244749939,4.084022972996171,6.677859762640086,18.385805770442317,6.226396940077672,13.205651827394341,9.879160783917902,1.2278488191019443,9.867542447353808,16.127934565756593,19.909319880253967,14.130234723881681,3.3871636236564084,0.14217562532012895,12.406568957432413,10.967379030884006,9.007175792379485,9.56042421355265,11.885297992165547,1.7553375772039148,1.4113014025715698,2.6453360011994453,10.981155369219753,15.603982764336827,3.425432172831009,7.807384159990036,1.6116003602659301,3.034095699239292,8.435391445144607,10.981442030217124,8.90951757048617,12.995111758219808,15.937334277539454,6.276342191014517,11.83430276843672,0.42141643396813144,13.935079543529207,15.022861553214426,8.753420059155852,18.014961293452192,15.051342837878735,5.702443815842275,0.7343843027623009,1.8514130809150142,19.01272425698179,4.900940815574684,16.97505364289769,15.158496714403222,19.756559408435344,18.079023497971672,18.57349455892448,18.314716175654446,2.0531168880547312,10.618201539427389,3.5711850953474222,12.24561210274433,5.743362266822443,19.43174302927914,19.8134396684882,4.880891529340721,7.201382110109202,1.2242398679523303,2.173824181801023,2.789869402714693,18.412720082125663,12.303082685898815,14.716994458086546,14.040669219411747,4.84639039428254,18.509348895679715,9.335359787148079,2.4793026015638064,6.804712449141612,7.3033271198836,12.607058207963666,7.580233618192991,1.4273711302147918,19.708857334905005,11.87584998126722,15.204728398079501,13.273339602807486,2.8734209209020856,8.701415494552895,16.26935279009027,13.48434202933516,18.335970600246956,16.63676789610013,17.779007775148294,19.324246937697772,3.343958052420515,11.627491819165655,2.003228852807668],"x":[8.161357665163623,9.01538920415041,10.682905868558827,11.807182158915715,9.826166849078335,8.11551475455426,14.163609103480868,12.703283442423604,6.490841905768723,12.778963722678398,11.71522806940285,13.870224615187832,12.543787145640229,12.388181165020418,6.7827272482982455,10.75294900197443,13.055752349811504,6.854182552174355,11.784952600071119,5.019857088646875,13.812239174027985,8.662768066851715,9.852315619656116,12.873735147916857,7.662961491506857,13.540970879265029,10.471848603582771,13.006721600372513,8.492420465004606,12.36936328446369,6.103949504546011,12.011253088510758,5.262840014787682,8.413479500800651,12.435932566246567,11.791783934229436,10.295577214733996,9.067320971458138,10.775595256130446,12.702233893178192,7.56842349285872,9.360256194118978,8.989387738876315,5.955075290473157,12.046671409794916,6.958481445670559,14.394092272736588,10.981578409776082,8.341091533896432,8.966294957350145,13.314663293334966,14.384523147697116,7.6720928302306195,11.721308886447463,10.725168988518154,7.475173586428625,12.11888258381592,11.575325029778824,10.807068161951815,5.5337975146074525,10.33222796878709,7.573092236022292,12.610772186301391,6.798999744943832,12.24534453221647,14.19543467509505,7.524915855879755,13.642724711057376,5.048416287292423,13.383329356899747,8.448258565541785,12.645898816499045,8.569999353082078,7.533984559839702,8.14722362525022,12.012644419499228,7.501549877267575,12.172803260121503,8.570809255641766,12.768511619149534,10.295700938267117,6.05729609275895,8.859712180737658,12.258435324347198,9.312025292146002,7.927283754649171,10.690646032655966,7.197614619990289,11.787588560540105,9.050373640088196,11.059978336230145,14.695357398061768,12.728415262494938,9.384871841760614,6.373478319556196,5.931442110807752,9.017454815019363,13.650000315584911,13.088485463065604,14.76682028427186,5.069705960596025,6.016373379943865,14.958021573379863,11.919501088991971,6.7122977289209,8.364234467876985,7.846488348578569,12.152616057193477,10.374990101568644,6.791809504685336,10.589042658363361,11.656402481261964,13.887467881717225,10.511484169329625,5.679416091484708,12.428914811269529,6.646334171594999,8.838909355422,5.267134553755717,8.039738459690058,5.586327642893711,13.543913472370994,12.217520770602588,8.593452679041068,14.124169000198336,7.586979051271763,11.941341184440859,7.934548361426678,6.809293401184318,14.676077178670532,11.957951861433887,10.960843890914722,11.088228062773577,10.21483503564051,12.18427182670802,7.081265953012535,12.15245087645741,9.45878916676726,13.192348897738244,5.203535964968569,10.688042019171633,13.405834608440845,7.2574188862342215,7.091547147685182,10.900625472708388,14.546182833403973,5.913957470570976,12.777786369664794,13.942800425495275,10.391023650932736,6.441453809252109,10.2274555455365,6.162076122998719,10.780589360286028,14.061846482936947,9.723990410480816,7.635967331348066,5.839665440029991,12.233368588699227,8.449175812360828,8.859543252881789,14.037428255688912,6.429886704166279,13.473521308605429,10.234204862905163,6.249325609290355,14.131538317826584,11.062711562250087,7.490224464176604,6.456375171983453,5.3304252126219325,13.933700893427934,13.24934210350558,10.34634660221201,7.819398355250677,13.577884210139343,13.673156606263175,9.820407227176425,12.567194640085555,10.22090183411417,13.002685781538748,8.83724100435115,13.55472408595187,9.552460844093478,5.871492424144062,13.761779962877718,12.071355482124746,7.000435885728757,14.764786258269869,6.600724846528118,11.703086896253787,12.880358998640062,12.259573204812284,10.748120771465938,5.13046986200111,5.265610990263707,8.982439822532207,10.403787698735458,9.401481372836106,6.230778186721901,12.541291748083758,14.304346728893098,11.833696717179654,11.380254415873585,8.299265459314654,7.247643975719513,8.725852620726265,6.262870234529821,6.668061712706448,5.9961046702798,10.586110543056485,10.077981012597386,11.566739335308139,14.968650715836333,13.472481484413937,13.772909088542967,11.297574015208822,9.45303547444087,12.553882730214509,12.488262133526838,10.607910248937461,6.5618522053245165,13.570081018783057,5.765949639839151,5.191695648310109,11.393584380068498,9.931189286803557,14.430778396826538,10.007151115729329,6.576504808162456,10.292296234942784,11.327793092566921,10.08323966311837,8.113670132187192,11.198536402751023,8.029111640418831,12.869192880053985,14.55520974330639,8.999795735136196,7.099012986561251,7.1627246215564355,7.021552347797996,10.48866970936823,6.414595304699102,8.87203966562379,12.87342005021311,9.249158952277005,14.55660486123344,7.301070012530005,14.229242809656624,7.98216540700349,8.042900128146877,9.964258763486608,6.225813527937067,11.029396095624378,8.243615610758326,9.81671975478225,11.266878407214975,8.169554042678149,13.711910300727686,9.684733171393061,5.915037485025483,6.410469782749186,5.178335963761775,10.86788434384102,6.4333493285129,10.514387207257169,5.7332947110905685,7.84525569410651,14.819141774969202,9.943676664796296,6.308453309786959,9.259741126201234,10.0092046503508,10.904456663459506,10.236608745031832,5.8521413027408435,10.532547456277806,11.567964279708194,12.639495126484917,10.104629464798343,5.650180962173954,11.783105889442755,9.028079171510228,11.700288968568039,6.932329277071576,6.777694424600549,11.028786584987296,14.88926775773888,5.776479047277108,14.148683111520747,13.545341597869902,10.767245385800486,8.561104966410213,11.110132957995745,7.387151335018267,9.672110091673247,5.627112477588483,11.762918318884783,14.709982238693955,12.81270269023706,11.75387766551154,5.00706491901719,14.905083802743818,10.078809455572731,8.502914907616844,7.647222053955218,12.076510332845094,9.984727056237501,6.493986728123322,6.90585941364164,9.147359103130473,14.713139575261964,12.961543229091486,9.820627519097746,8.420652878019686,11.509223006078859,9.324734435815358,8.120990960396048,9.658295531636831,8.831475928885625,11.795614228361377,11.157205489476187,7.437903114659681,10.835060235390888,7.660376315086355,12.248093932450821,10.907656403289309,12.934595986755461,6.074870888431834,5.556143943509079,14.19977152452785,11.443342348297636,14.4132106946637,10.345925515255797,12.162598283111667,8.366244398667336,11.103164093095119,9.389426130374376,13.017008244858312,5.618408685973833,6.9030826791805815,8.00601347759671,10.457421010556132,6.323343739686971,11.289369102070072,13.145913790242528,10.655630330653644,11.45008289415539,14.836341396564068,10.047784539913549,7.63309422683442,13.62103109180003,10.038064513756012,9.834019464819146,6.865624823719929,12.079523180982989,11.350805986785026,12.185429728785184,10.026127182754959,9.487265229660908,11.932736600570276,5.378281274361392,13.456540542626419,10.16660160601148,13.960747221490859,7.313101719827295,5.6781488431309395,12.604496732319557,14.48167516060732,9.175637443494429,9.582454445610292,7.464974626784153,8.478313085776147,8.413238603281105,5.899761916221983,11.916677650830232,12.618591442242959,9.405901253585458,14.015993933618505,5.979212332207647,10.327089238948401,12.7319153933704,14.246651075584877,9.48424485576757,10.915532762419506,11.893447025913602,9.788251344760202,11.546957411581694,13.484977047960466,10.402685192350056,11.582920419458912,12.06999904940808,9.194696381741313,10.521913266687584,7.026938366373161,12.41320236679502,6.306935188300247,10.257997525134602,14.728788608349163,7.072056177407968,10.315034388511535,14.307812240253694,13.668970936844962,9.428369398427677,12.323185587193443,11.212699785939185,5.29278863367356,9.14303841646067,14.892380265938645,10.95229738266278,9.198333065589182,7.02915276249122,14.2871541019571,7.759666104163987,14.096377849095107,6.910768827693817,13.376536025980856,6.403536212264362,10.250101824416502,7.730413599299489,5.825281739145365,10.955275909693277,12.36994603744457,6.1335759002303,11.152238576167825,14.322962821202296,6.003075455713343,11.222816301453008,6.763551410951418,6.113632657133595,7.475493677411542,13.283785265512222,10.18869757118422,5.807308782038463,6.259642938149197,6.845962052252263,11.887720418887643,6.0935416694517315,10.6411901546125,7.345332617605214,9.481150674780563,13.472948852841885,10.204649862715696,12.362312514299237,6.739951579396228,8.602308188067465,10.81365313845695,13.234152390247987,13.815967269252695,10.185813188914313,10.03958162003036,13.825326682655595,13.07895907614149,10.111434602652336,5.525708618760805,7.046664583581106,8.31625476012978,11.365056449812403,7.318811045834814,10.014965232806567,7.451537211245034,5.824176271225658,14.020430377028152,5.785844182926329,14.813941888085957,8.562321401607093,13.55866227887703,9.131353037148504,14.239963358774057,12.604378792714053,10.847246771116051,14.850623629972098,14.276127184467288,10.873718943872968,6.462984663962357,11.363653105299026,9.82218312024518,11.428178535669243,14.610232532115795,9.456474177187907,11.058707724611281,10.243420749638366,12.803769570225922,5.849755079481824,8.674076173748793,9.184044624049946,14.728883168375845,6.468496542312449,5.543211156095662,13.188991190785002,13.118119213911774,6.996751062335214,8.633607416054282,8.531279884371912,9.21590204628263,14.090738056576091,7.7749689157725115,11.839400067371656,14.511039324337862,10.683803157777135,5.912365407261535,10.882911045205343,9.383384769977805,5.212547678815582,7.261543692662791,10.254874352166144,14.431925794894816,7.873749710800057,12.608468977860891,6.912623562699616,9.2443452941123,8.866499049258154,9.789879087179113,14.278665340644475,5.160532541359164,9.207904415350608,12.67556258261301,7.8195514573468135,6.306711105515214,5.463423873567179,5.723903833416641,5.0187486830330545,14.774766269895352,8.956706362232794,7.566455760580513,7.502452263722185,11.11232022278079,11.768650884428835,13.736156626686824,13.823718079037771,10.578551761058057,12.881267983844555,5.633659022706492,6.738560467899237,11.831399099903097,9.131462992152157,12.474908877738144,6.751594060140855,10.133869571925306,11.540163283116378,7.618472287971834,10.483864017568935,6.9714978842082465,7.95297957639709,14.865595252502677,9.831351903349418,5.028474392899975,9.86266599693206,11.338058281549468,8.334470615717265,5.430173150010464,5.275031607147829,7.453380957891779,11.129701251647328,11.68755081514391,6.921791452371739,7.1312203558273985,13.521020157147133,9.681033930945855,11.088127217961652,14.426919367030429,10.46005577855562,14.432789833630546,14.888883459565893,11.66605466927699,5.6731160903243065,6.5757705954269134,5.029965636294699,10.80308307830329,11.811863152907891,8.879621171556558,9.338092285269546,14.485702471572193,5.013540881984011,6.520978195806322,11.099246941599649,11.144588327111137,7.052616265001202,12.56800525403449,8.287840732437889,7.146843096016888,5.237213340031513,8.218124773259818,7.598052843885796,10.750553033761669,10.409193117435064,12.81500990188393,5.700382498148917,14.351261388975052,8.037153065755811,5.610722546306873,12.617298659436464,9.676826838151474,5.654736008087888,8.44610617822382,11.947150378624622,14.461238682742374,14.634682760537004,14.398323190343989,11.437437558737889,11.18154700758992,9.671114689611887,14.471408181581698,14.951540168707062,9.316214156705783,5.210563522026847,10.533408752454907,14.701907367151554,6.89426539620629,13.739761326900515,7.149315427900054,9.696458797973431,11.87931723383487,8.98450802822877,5.998335981534129,5.7478394766409435,13.065688600745652,14.46780593824556,5.4707631414983044,13.050925317062864,14.047238307432755,11.560410792445099,14.720170029552476,11.110416626887405,7.2237624654526105,10.701057530133868,10.400282441847924,14.730424159474968,8.763192616905185,8.587969917936523,10.243791672618535,12.427249395537283,6.0429518781111895,11.82629771851952,11.500212950623535,9.205433769689353,10.821878360538719,13.469795430107794,11.42383127926325,7.787642431122128,12.148353988295444,6.299285474970797,8.005067562154565,9.139415347691159,12.37128981494549,7.198404048786804,13.139264076854317,13.392720882202472,10.357499973947498,5.884522093024844,13.277642587420752,8.139753856628829,9.526241105172858,8.794941544653271,8.402542416199202,14.262602184884557,12.122400177083144,5.239254021348563,6.487402679552137,8.608817723251308,13.495805030124984,7.592869702655585,13.301579612590569,12.214116521008522,6.644025620770928,6.543470917601642,10.734142137412846,9.916712678231896,11.24641892961764,11.597733716148085,13.042473737741943,12.856105814571773,5.380856736653286,8.134332365724248,8.255467198597334,13.157013146122871,11.54651317767842,11.871009104985257,5.925964331047469,8.940769551245038,7.236275771871834,6.462199953373366,6.397958757042992,6.502820685567087,6.5735110229285105,12.14013975850147,11.865651326863256,8.780172648264163,14.213901682722376,9.625787504878843,11.586063990145444,9.489276376670803,5.058206712745459,12.455790086483582,5.1880851848894345,12.771969264864145,12.225867070093841,10.967323240585127,9.99660995637441,5.674195713579373,6.0712609208881645,10.485010688425229,11.674805490962965,9.079651197573211,13.398060677452461,6.4514125566229685,6.542132549609738,11.638370588837397,13.193999992915321,9.183973664920515,6.989639184950985,8.786525832994636,10.895562203567193,13.487363104217792,14.396530946124756,14.728685934702748,11.477707936846869,5.636880252000367,9.434899639040623,5.309273326881858,11.392085704167688,5.720730558547196,10.043419096855168,13.631465028920664,5.1713819635714,6.310695453473976,11.0802631586785,9.666881774393497,10.206175148086123,12.351228934398646,14.133078055807616,5.10737336586277,13.083568080597836,11.022131253672915,7.621993004606713,9.231198314827214,9.964095874653838,9.751581192466448,10.470601110235906,10.938855765941355,10.306232394830449,11.396645000376287,6.458414225136697,8.903051824395515,10.007666386913304,11.50860461792135,11.134100743971496,11.089859451952673,13.630254864419237,5.660939383926948,5.333945136062792,8.83448598817383,5.077543703125265,12.316072405295916,13.079204524219563,12.1592021625369,12.339703908691927,12.43265354044929,14.80407055968162,10.133595039165083,13.324841476075111,8.514691053494069,8.367485808391809,13.241077259749163,13.298305542853882,9.329239453508508,13.524164107772243,14.201944006246741,5.229575157398932,8.249121885321411,7.735243178226239,11.977398030094452,12.216985124208925,12.507377737998562,11.767518289794731,7.2825147135124695,12.770228614031375,11.654392041272693,12.029278536770892,7.93038683995182,12.18829918599215,8.076672844884277,12.053774037421682,11.242057444717318,9.241932963397787,12.120274724996094,13.480851628356568,5.360580144796623,10.910154675615571,12.5042178045334,8.11409308525915,7.1421945602808545,14.971607625884984,12.940719500165063,5.042977207888768,12.444940686114146,12.243225500810839,12.632371684724246,14.9644602810766,13.508352195949893,8.524797143587495,6.776116591381724,5.726037030583373,6.038994744409392,7.038899732185431,14.281986392417824,10.96743047469486,9.733002787776302,9.764391025411046,11.597875118287114,13.623435435347062,11.24867573720812,8.194000914996275,5.493002002221603,6.746572407887925,13.103437096056517,10.716547909895045,13.569161408228975,9.302889283285475,7.460745996085123,5.642672184096032,6.725044562452389,6.09049604397323,13.412440936026893,13.805660337536976,14.146973783598549,9.547708215354584,10.049514632662184,12.738419767164363,12.40109156486896,11.988317644531097,7.7860630872001035,5.922894180687026,10.091658761035083,10.436708414422833,14.360245895976004,14.005577420712392,9.590065132879495,5.2013034861889444,13.353194246267394,13.351290851114753,12.851727833494639,13.375336857607707,6.210669778057152,14.891874680836006,13.07438027824081,7.523212314437931,9.111573876547494,10.695684094219198,13.762999659840549,12.139741252373046,8.327712511976442,11.305157730525476,9.551997014000017,10.75326319671025,7.538250202869734,12.958979013079265,13.85509347468494,9.71681835908475,7.138475794065833,5.5249437128819405,9.864830935838002,11.42081186216939,5.138313085199031,11.308546386672147,13.294603801870071,8.242144435132499,7.80466846544468,14.217555162328093,6.704664584496831,11.670373537311345,12.588546127142495,8.89320262842146,8.902587490206525,14.77048183959825,12.678595978965394,10.79018602012453,13.174666561895629,6.223630077844771,9.866479776793394,12.957116561963424,5.6555390254824704,9.357478330506456,14.385706114170569,13.31132485828604,10.45889522414949,5.353848052047909,8.532743800416293,10.683648080214464,6.572600725330577,6.378625167066958,10.057602692933088,9.15818371041472,13.684952958970818,5.711661442481337,7.830901321440025,8.665874147936943,13.819175261822982,14.765061485112838,11.937188457865087,10.355200740690512,11.396334236847965,8.282131062980856,5.36180428540316,6.165539161013709,6.650042746010865,7.133351769969154,10.37747408973999,8.537375119086848,14.421806943576204,8.867216578293773,6.606838867199656,8.688877776462832,13.765025645153434,12.405553973845,8.761844082617262,12.14605894375562,5.566060652796347,9.71188027833606,7.173156066506103,11.020374766605809,9.183242260383375,6.04012068745587,7.388034589904063,8.75923454513911,11.84781215845,14.445881023280196,7.610112386585226,8.81963041031955,12.401856763115758,6.561264122645262,8.410202007215775,12.803227716265912,14.177055972210294,8.315857133786313,13.390668433850264,9.86298381810286,10.858677010391993,6.752564594092831,5.621235742479249,13.535592918478557,10.808417121760934,10.981873568713276,5.250597200883764,8.854387811189483,5.057131354538051,9.274002643073842,8.55598217460788,5.540665976676857,10.776238491827446,12.383609488454772,6.903001702692326,7.870136027319765,6.079911703793086,13.237691858135559,8.058311943678198,6.567395053826002,5.772528350279636,13.269489856129074,12.140263875204255,10.981103631495605,14.281770303939652,6.551380851883806,14.200398345812781,13.232316429263467,11.42494282969581,10.323235358385707,13.27140195585308,10.27317736161455,7.468913319899187,10.958545250576059,5.9335961842816936,10.621007502246387,5.16782224358246,9.125486513652918,8.823330134037246,13.251884080756682,13.795222150602552,14.695361184074562,5.529444823705978,7.2155988229262435,6.579635486719808,5.370385114536804,9.369810998952703,9.786568744447102,9.002935230645257,7.714841761518798,8.905990164709525,13.866510721063365,13.639729798105725,9.209375001373761,12.814054260198315,10.339994345851904,10.61549465955866,8.395759620981133,10.694662405528586,13.03597750439861,13.806690259333648,11.59428972648018],"s":[1.642917824806681,1.1555080479995525,0.2758948459960995,1.1686953314912287,1.7174757421717732,1.6006596914295677,1.448237655730746,1.8224308939207199,0.13920312372110022,0.3227737068800698,1.4031910091158841,0.7428366918608882,0.7248192588095823,0.39959619624270903,0.12836128322975426,0.25061358191578487,0.2476123273263675,0.5890574628986762,0.09011993700916898,1.0987884820700247,0.0836429592563337,1.8946347682960818,1.7909848561822268,0.308837847453332,1.3074063261324116,1.814984481619704,0.5484219421450338,1.1475882414482435,0.4504340445789534,1.084773291480944,1.918902790165831,0.28614531363504003,1.8638170658620345,0.5858345801821381,1.8994033760645697,1.103216267431542,1.7224413399695964,1.2326991844092925,1.5804897935293312,1.4484311449390925,0.4488353213074072,0.617228472262596,1.656721421009526,1.0412808698694316,1.3551317117717492,1.8941352879148412,1.0943677700982515,0.22116426094655228,0.011595663701738701,0.20739236496960434,1.9500437408779407,0.9547581369020359,0.05382763261624346,1.023983133072706,0.232481485260716,1.671158773552575,0.8766351303090727,1.0159565011197986,0.3487040345668895,0.8581959423776073,0.46937051158267584,0.011211366064964867,0.9345909520620448,1.0119280545063836,0.6307398896819301,0.800833320834553,0.5655266918905384,1.6552786438911955,0.5769188970016117,0.8858228471560237,0.4170402599755838,1.5769295770324532,1.1446523492940894,1.6398861405433194,1.9654928310103648,1.0754937471608894,1.462227808230312,1.4150879351400483,0.4673393001122106,1.4230935446078705,1.7358054231890234,1.7195873774009756,1.4887461466844374,1.2493992468590238,1.7442465454065297,1.98550009531392,1.2616705140095914,1.5007938983089986,0.8039125082837084,1.8441588573650725,1.8261169762203333,1.959788241906785,1.8159525679613804,0.5927520174460441,1.178223296746164,0.2968284315882128,0.5757124417354049,1.2908676066250018,0.6540802243603334,1.3503382891166642,0.9075157672908682,0.9274922755500548,0.5840796862761679,0.09456970437417889,0.4763835681498487,1.2011389869746436,1.6355217391193357,1.6184811891012285,0.5520600345305566,0.41948480919724407,1.776160198038081,0.3831417153228722,0.3094824505207612,1.0715348664429305,1.2899006073450625,0.9527063084343053,1.582439731615413,0.39410578771865756,1.3589923032278222,0.19071431811284079,0.3259012852709504,1.5714299456873535,0.7450582244832691,1.7817035231227605,1.1711935298934448,1.8023669326418643,0.7479418829328282,0.33287406424594534,1.8107404544797037,0.048848543513881904,1.7224106981637046,0.7467839039221023,0.41905140366747995,0.1325049096834725,1.9428109822700477,0.5043431717945901,0.9794977121749482,1.5818697947163542,1.4565131666890525,0.24889067653939856,0.6339414475377132,1.0855152610394057,0.5989643877256317,0.9920744613832668,1.793087317650011,0.5473526544290594,0.45527063842015236,0.13173601771463206,1.4709922421705275,1.008375143683053,1.5161073537793497,0.2819913680250603,1.0894337327056989,0.6734936706117622,1.3027227673056432,1.1774115106686542,0.41977780040387414,1.5830644291490805,0.02801253256129721,1.9086332037932352,1.5219315900003156,0.9743707682234897,1.2888932078507147,1.7604660606756544,1.2210641176114785,1.5649298948380772,1.9796651648768715,1.4870080115313407,0.29492379539938796,1.100297112384736,0.5661314312056609,1.6854737850903194,0.1657111995185887,0.8807746792757549,1.4370448668588378,0.5375574440168052,0.6298354017900119,0.061595964792585,0.1859087076929895,0.9652861314123862,1.4076983252428308,0.2517525503080611,1.2778624294454106,0.16660119141063312,0.034313351033123496,0.27772711346610723,1.8485498807685197,1.0905143066140344,1.5469222422307345,0.45685203121807527,1.7397096873895341,0.3316513401855259,1.189709349829979,1.0357716508225692,0.8328300348235222,0.041912504763361724,0.6496360835896882,1.786713160980542,1.5568722019481243,0.15471097714751414,1.4378949160626626,1.1880202925251484,0.4514171231452444,0.21626842623174314,1.053918736688574,0.5390275073062156,0.39186026657157536,1.8744298711510603,0.5239082556625316,1.6729801978352667,1.0646100552084135,0.564987209723594,1.572063017680537,0.3549796431935883,0.8043959890229244,1.7121330661051828,1.8781965083231662,0.4803829708536749,1.019152140024219,0.7766637795548843,1.8435988376287975,0.924509396006945,0.9904451325624066,0.05843454775836898,0.36699305068171517,1.8628178422518262,0.458519300449725,0.08616958090392535,0.32255974515557595,0.43766226602256175,1.6547397106443462,1.9422341467950233,1.8274626780918442,0.5956083786955855,1.2572107132479702,0.9996965372073365,1.9674891145519835,1.8004971555577614,1.597187196851113,0.17270168291688526,0.18911013753575068,0.7087874464265189,0.8801073248013296,0.010318430014499391,0.9665409268143872,1.4258993306119474,1.8951747661492018,1.4593041672107603,1.5981102333372994,0.07733967054824564,1.1547910159661687,1.3860304413911186,0.9142613400594626,0.3854461617112066,1.621870758350238,1.5287250184125245,1.298515550843934,0.19530568598365194,0.9973661743836524,1.0072643728661421,0.40958632502672065,0.6691137636709992,1.346544793682071,0.5549671525818844,1.9269334186367653,1.2842073544307828,1.6702555478947745,1.0249319869908669,0.7540118455995417,1.606782296671251,1.450775939362138,1.4811344369356503,1.1904391441906776,0.3818771201171498,0.9656515521236773,0.3654759629057569,1.6618125407653208,0.9477279791816366,1.3116890627882896,1.5119371541640478,1.794863462893542,1.9124395677518948,0.8595687776999439,1.054277643742779,0.024046561657925736,1.7713561357260796,1.6957417522993072,1.137267075434679,1.0398120009362564,0.5741837600703699,0.7639725383814584,0.8041782202862127,1.8818769736192889,0.03274531112000467,1.4367962264527239,0.45000546860095136,1.818524217354581,0.20494785372646662,1.8789234314249357,1.3009631887417399,1.3642741375955891,1.20448554718415,1.131639113306326,0.20703882873388046,1.9870007190853536,1.5307808449055544,1.379270528713516,1.0365760922237799,0.10575581944415724,0.32682966524098456,1.4515337440181741,1.7697667102596593,0.09609645902928898,1.842496010692142,0.01709595254057028,1.0313568646970435,1.4509933629181493,0.7793723536459924,0.6307500870287326,1.455420468569435,0.7288659468848993,1.3117303471156698,0.1406186859796903,0.42591143408151266,1.0906931213638167,0.23082273844010892,1.8061150395382533,1.2241933804301794,1.5598286157582089,0.929117526323811,0.975644005856958,1.3765164301358377,0.7136876493394944,1.57918320996186,1.7421376992784872,0.1465707672849521,1.5853147937445762,1.464323556891351,0.3551248880555895,1.705533706817023,0.48371254671999697,0.03696485278755457,1.7960291097947678,1.6032091761226237,1.0938618985960562,1.7113228701552328,1.6980218681303798,1.28128407033471,1.6463875124382157,0.2624186279656109,1.8112063030521428,1.9426536221689217,0.11133859681827607,0.47866404529734874,0.9841217507805351,1.1676344948051924,0.9584888856853624,0.3832076477877129,0.2840919533169002,0.5372935246432511,1.2656564498620413,0.13899673892164177,1.9061563611925556,0.00793290021579951,1.6972428475674621,1.2006983990681306,0.8853206839281094,0.6020605307767752,0.2918144487395611,1.3127870718340007,1.2385334081419819,1.2988717495643414,0.056932088758149035,1.9800890782265506,1.863604026527971,0.35896547443846494,1.3919709470737418,0.9171703311370276,1.6463523549376848,1.0642540030760355,1.268255747464711,1.5702120221817144,0.2889224667085246,0.6657469280973052,1.7453788383387807,1.904139833278716,1.1481516021759668,0.9721858560195606,0.3372408245988354,0.5162071273641868,1.7943511801215108,1.6650137662439572,0.7790113634959588,1.1844404840537108,0.3168597100459012,0.4082372536133394,1.99681891261213,1.5077206435968753,1.3749799901499453,1.0658825811147827,1.9688436056845218,1.5698506211192558,0.5276342582142384,1.6775899480176224,0.11865402715518458,1.6890195171351299,1.7153771351346871,0.6816899954961193,0.270378917671517,1.300649188597356,0.4145662066802056,1.6463554829632896,0.022467376993551724,0.6099635442581364,0.32617921448257237,1.5299107918988208,1.867046433714843,1.534211913892563,1.977297319569249,0.39691493895329755,0.8838878202098872,1.427250425739468,0.3350472487227649,1.2289374947342542,0.7882161803203336,0.4388843917052285,0.6492248351450924,1.48304956011869,1.1192243196426808,1.2592143864373457,1.892424304297089,1.0256102253665147,0.38194078397137776,0.012920957637548636,1.1427340010028955,1.6534598195609096,0.6231482616131294,1.2011534349299495,0.3541087972518717,0.3718744711183102,1.8070317967185758,0.998080666366044,0.07330292703597507,1.3221800948240405,1.2095564862321941,1.8287683153870615,1.7149104105155204,1.0180191182598803,1.8902486420879572,1.4767015032549082,0.47670872711358436,0.247697623103313,1.5607783115171756,1.2880197228909842,1.6171060347553383,0.36631635414205643,1.5120434602042527,0.06435732559155216,0.3513644403103693,0.4271667363729632,0.18647653159394695,1.530489851353647,0.4244762955191641,1.3991326604461953,0.9338417738503115,0.6165387338887545,0.030791343098769186,1.3170625689537725,0.28570829235161543,1.6416351221567438,1.6225814047691087,1.7331893816697082,0.6087553917335446,1.4012211684195606,1.0749105019999168,1.5020042020671922,1.9850428412471897,0.9944444676727566,1.4843791475163015,1.7017206804182692,0.3993277987251056,0.10097322729699876,1.5418331737615478,0.37731695242418395,1.7507430796051673,0.8997515872346575,0.7446793318305827,1.804418372682599,1.6760506709180847,1.1901897481895265,1.2520569610188579,1.5285646764570102,1.8668685030611494,1.7889402413010806,1.8492479863115427,0.256182053662529,1.045493633825854,1.5463407405302765,0.5236467652101617,1.6290423146962993,0.6950814459203949,1.4400023217789104,1.605147366033847,1.5930400322933687,1.600377428716318,1.546379509163211,0.4630412256921437,0.5024679291850203,1.1013204482720194,0.3251802727912958,0.26048122819939623,1.7297199758856858,1.5761344070789747,0.42698352666204586,1.7419804893740642,0.9346276367466588,1.8317878514016637,0.04416662376974001,1.0271637452491689,0.33822340587804467,1.6276584087674508,1.1992482618816425,0.9590754100279804,0.795049512600746,0.20669086811195303,0.6245296012101478,0.4739874254651566,1.6786889937953307,0.7536156125924554,1.703733132629063,0.5985349704338332,1.220882273064337,0.16620544264573,0.20415772591690207,1.4528925639904635,1.5981381468763627,1.9531879091659015,0.043755518011332484,1.3270616528871004,0.8343934810122526,1.867968710552018,1.2076266822232071,0.9206803706547357,0.30923118038149733,1.21901318874693,1.6082201884161442,1.8857166002553973,1.533569599957239,1.1259778213748537,0.35543769943241843,1.1700635487869029,0.4444692275984998,1.262030683181123,0.21411985912709408,0.8348219681853046,1.6202854642908195,1.3417046027725452,0.29426968549229215,1.92346800243764,1.9625039464305973,0.8869286678733386,1.6535073210545659,0.43718554431336765,0.6457625969307452,0.09121025352505985,1.1180984456408773,0.8314728246217569,1.615767618129074,1.235151560027668,1.7640503365764308,1.9334106783817022,0.2583939576178995,0.9302194138181923,0.3014690508137776,1.5675562055668815,1.590634809993969,0.5012621215820912,0.6142872663032062,1.0087099668336816,0.11317831299120362,1.5361466442668807,1.4364227004251422,0.29568684323734606,1.651649209629019,0.3610138086617134,0.2218456424131925,0.3831764210892459,0.6575805565817503,0.3438037169054584,0.19378062508146598,0.2679054937955154,0.03413547004740192,0.9209176344206407,1.0014801258390467,0.6099522595303766,1.8999081902183668,1.1776636428212246,1.7332056547787702,0.9981563348647868,0.2217462839703881,1.5528176056846665,1.8478369621863941,1.0712811704474836,1.6654140800681465,0.351075241603406,0.9718408105594607,0.4940297044722941,1.4904586473068608,0.27503317775648073,0.23125669744246524,0.6547416798615897,1.7399580704378845,0.15078157862000996,1.6265168643992731,1.3331485541066765,0.2773343049544068,0.4097156825161532,1.742195930713284,0.33979846823470927,1.9663450553037802,0.37195045844614993,0.20955728461033374,0.09747534362635157,1.879075550217335,1.6345267671307018,1.0065330320745454,1.7631555633039921,0.45589016560383344,0.5072543029528842,0.7486478280351743,1.8181713647722595,0.5336050096117999,0.285586122990487,0.11268392909246705,0.5281438472617448,1.4343913611922403,0.38741495158963435,1.331663880689785,0.5113012832975743,1.1554262135642368,0.9976344012493858,0.8296787378881825,0.10417899725914648,0.7795957902983677,0.728302767661932,0.14674115393830123,1.8332603799129776,1.6894392257615758,0.4617588790040217,0.9117161674233412,0.1659610015189652,0.6682914777684443,1.64221881858405,0.3236447909297353,1.136062572546722,0.2306968728232235,1.5030807402374529,1.49594966295933,0.39470448443396844,1.1968602928679957,0.9800857961957559,0.02630072619267665,0.6930716828189145,0.4513085224189006,0.5424527368452123,0.004133214887517056,1.3661792850252548,1.0670847982808445,0.632694863326178,0.7697254535247331,1.7910451369525258,0.23817649092244197,1.7109418417806905,0.8884171930977889,0.38489365345966053,0.7437732896303335,1.999159297504042,0.564961583472313,1.708441442178065,1.1128871609173006,0.5727485339466956,1.1750563568355719,1.987162478066371,0.14667133193218485,0.35974224368133534,1.8516552355619553,1.604716363286312,1.7699204704460882,0.967964746559633,0.7188958824917902,1.0207421646526296,0.4049795366373772,1.3595272839892694,0.8742409993946971,0.33143334021083604,0.13978626823599294,0.7111473657075758,0.8813106018208954,0.39654022652651655,1.8076663705952205,1.0437187443086486,0.011019758632884624,0.9338747932588047,1.5379689748006622,1.8918453978632472,0.06042581712289907,1.9385382440066175,0.23032420644161622,1.5500181751402575,1.508975183488647,0.7231355614738293,0.2459335874192008,0.40190674449643327,0.16502028046630413,0.6617868261981701,0.5504252787249744,1.304603647188903,0.09857585865088447,0.34323378980204744,0.0544742254146362,0.08298013711105767,1.968889882592828,1.7202768156140178,0.30264856898137316,0.8302531287132306,0.9162021543072405,0.9457330006957219,0.813227565674048,0.8175236762564948,1.9632324853641365,0.7122079874139557,0.2707608281739584,1.0693574854209325,1.4632867640781244,1.2084905821436673,0.31076763090162807,0.6281106017727454,1.0997757028729547,1.7563139694157113,0.1957209339500534,1.654624593468641,0.0011199529859906576,0.9834163693385731,0.7085881086272257,1.6622273154875948,1.3220901401337204,1.2629247758831155,1.923244162157499,0.7963414403476845,1.1483243568828012,0.7836672324156213,1.2552141438869593,0.23449339681896886,0.6848310715933486,0.3670330055742954,1.9531312691044058,0.42024588900514903,0.5864673080668887,1.690682083515445,0.01866262503663041,0.6542289957971308,1.3943930545335803,1.4700167220309521,1.1701196403828233,0.7802203642007264,0.6159001416075958,1.0340872658131852,0.008572825283205354,0.7534368553388369,1.5356509640576417,0.14312143813505696,1.2522024942676238,0.08210209820836667,1.8325441856673312,1.6269400366794073,1.7690905882892851,1.199749892842231,0.4681651349511893,1.5565809140104165,1.4344500739534425,0.04622524639301773,0.60554400835428,1.2222734645349265,0.4951618513766056,1.3201030270145213,1.820640454954642,0.16047916118115468,1.3299181536480633,0.5139080405371401,0.4808482230942417,0.9789711907808751,1.7329383609382907,1.530908152420376,1.8933750772903246,1.500104701203652,1.7076418663599475,1.3727823154714978,0.31212525223598586,0.2584503553539026,0.45586792920650243,1.537740126992889,0.19888595763484584,1.9304758298441582,0.9622654965085662,0.22810677975614357,1.6116296438706823,1.3513661299794149,0.17303261663494407,1.4972004343425125,0.28214977437209976,0.24109382851406114,1.1306515949694145,0.5289697800062672,0.3824549126505845,0.48115999369618656,0.15995618711105752,1.458972015501395,0.6486409052187656,0.43271515427575835,0.5809887784553571,1.1921891755358383,0.13168738542973912,0.8330345166508866,0.7121643616393256,1.9766503654255043,1.3824126357508155,1.93594029472081,0.5985516368426351,1.4528075399567069,0.9427086405758272,0.07069523583543758,1.001774769192675,1.3559404463832485,0.2354449471956217,0.2946740603370901,1.2796395829127412,0.048558608830615135,1.3475716330960683,1.1381758431135065,0.37263592821089064,0.7419000896893388,0.956851573145912,1.5705581708570864,1.293163269774349,0.9933630058013314,0.4740094534145034,1.492105451201287,1.8008732552263669,1.7467356741750737,0.8908099683533313,0.8139837894329678,1.1485200996131248,0.7600055491066899,0.7227303826402363,0.9478347483806329,1.6725511890717417,1.3541537294966282,0.4668182398016829,0.37924007076130506,1.4905800515251624,1.1260428434778063,0.6113341118379298,0.12459820119614573,0.8442965227441106,1.1844628457380462,0.13344463484416957,1.9950910518869618,1.7460858527908543,0.5982408569235762,0.6429313631289819,1.5505461629098711,0.8112703418897795,1.1058152020042105,0.05158472913033396,0.5277288642381919,0.19594538198689948,0.28742981454844196,1.7089361319482301,0.32141776265145916,1.7353820254765018,0.9138868774529625,0.992333214622819,0.36849770847871177,1.1364175645696668,0.9131229623442669,0.020671931198512183,0.5424025651027189,0.05883377922959587,0.8781294853301636,0.7459940830913836,0.99202890266668,1.1974781899873363,1.3412069348521287,0.5015049160755729,1.2005551168804218,1.010471212185673,1.3354830352322584,0.5754759633819151,1.4060165622396488,0.10882304966811596,1.3356591627361913,1.2328872597869722,1.4856620720204852,1.7162179351530202,0.25925820515476117,1.5243091074253758,1.080231129121242,0.34714687515558973,1.1501750222653104,1.2878389180231387,0.13902761152085708,0.4892082142253207,1.6498029096295235,1.111890215673716,1.265402304262416,1.1577755724045642,0.6652514750743732,1.7681689270964127,0.2911239775573926,1.175216238468233,0.5352063280846404,1.6878955902110508,1.723953100189331,1.3818250663689602,1.7575887361298275,1.0078328793547997,1.4393525283445765,0.6375042737136312,0.08641261771604025,0.6716607038687288,1.0163238442854152,0.06185586480160499,1.7145401896283436,1.3255845404354374,1.5345484887643526,0.3963915260915827,0.7176406275681639,1.3419202357872875,1.302797513993188,0.8000814599240371,0.7162085753242247,0.24807792665584483,0.48663291290626587,0.7431370123029803,0.8176295135577942,1.8503536181116331,0.9126089737135086,0.45463230175689295,0.915480953833705,1.2605961883608443,1.6408953734807326,1.4783005586389124,0.0047594213167125865,0.7748437922937499,0.765116231925099,1.587143255844914,0.34125591667808797,1.1984538296335665,0.35764858809843725,0.1787456375354246,1.6067052637538284,1.7911920267034316,0.28458667445685704,1.3530257351636972,0.16492137638876958,0.6169472583968529,0.07832229454697748,0.2323972488222843,1.971902621172077,1.4956708136044616,0.5953468729097016,1.0929610865428385,0.23113796929657493,1.1870862908995274,0.5234693735654985,1.4324168754584528,1.7621758887987489,0.5236208034320158,0.7921692042593182,1.0515487600184588,0.3238997175718743,0.3476328174765979,0.14548222505117137,0.4666375419797557,1.0611300891735773,0.563229077045936,1.8649313724928338,0.9284522187711479,1.0974229109395397,1.6240818532198134,1.2708525001688642,0.1308839271297968,0.858360313484384,1.667088253517488,1.5267018784026356,1.66239228277886,1.934386442498599,1.8363751272556978,1.4960534047456875,0.6851460506784095]}
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

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var pdf = factory( 1.0, 1.0, 1.0, 0.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0, 1.0, 0.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0, 0.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN, 0.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN, 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN, NaN );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `s`, the function returns a function which returns `0` when provided `x <= m`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0, 1.0, 2.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 2.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0, -1.0, 1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, 0.0, 1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NINF, 1.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF, 1.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NINF, NaN );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var pdf;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], s[i], 0.0 );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. m: 0. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var pdf;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeScale.expected;
	x = largeScale.x;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], s[i], 0.0 );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large `alpha` and `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var pdf;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], s[i], 0.0 );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/frechet/pdf/test/test.factory.js")
},{"./../lib/factory.js":18,"./fixtures/julia/both_large.json":22,"./fixtures/julia/large_scale.json":23,"./fixtures/julia/large_shape.json":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-eps":81,"@stdlib/math/constants/float64-ninf":88,"@stdlib/math/constants/float64-pinf":89,"tape":147}],26:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/frechet/pdf/test/test.js")
},{"./../lib":19,"tape":147}],27:[function(require,module,exports){
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

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 1.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `x <= m` and a valid `alpha` and `s`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 1.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.0, 1.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 1.0, 1.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 2.0, 1.0, 1.0, 3.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, PINF, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 1.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NaN, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeScale.expected;
	x = largeScale.x;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `alpha` and `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. m: 0. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/frechet/pdf/test/test.pdf.js")
},{"./../lib":19,"./fixtures/julia/both_large.json":22,"./fixtures/julia/large_scale.json":23,"./fixtures/julia/large_shape.json":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-eps":81,"@stdlib/math/constants/float64-ninf":88,"@stdlib/math/constants/float64-pinf":89,"tape":147}],28:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":60,"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/base/utils/float64-to-words":76}],33:[function(require,module,exports){
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

},{"./expmulti.js":35,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":52,"@stdlib/math/constants/float64-ninf":88,"@stdlib/math/constants/float64-pinf":89}],35:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":39,"@stdlib/math/base/tools/evalpoly":56}],36:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./floor.js":37}],39:[function(require,module,exports){
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

},{"./ldexp.js":40}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":33,"@stdlib/math/base/utils/float64-exponent":58,"@stdlib/math/base/utils/float64-from-words":60,"@stdlib/math/base/utils/float64-normalize":68,"@stdlib/math/base/utils/float64-to-words":76,"@stdlib/math/constants/float64-exponent-bias":82,"@stdlib/math/constants/float64-max-base2-exponent":86,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":85,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":87,"@stdlib/math/constants/float64-ninf":88,"@stdlib/math/constants/float64-pinf":89}],41:[function(require,module,exports){
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

},{"./ln.js":42}],42:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":56,"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/base/utils/float64-set-high-word":71,"@stdlib/math/base/utils/float64-to-words":76,"@stdlib/math/constants/float64-exponent-bias":82,"@stdlib/math/constants/float64-ninf":88}],43:[function(require,module,exports){
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

},{"./pow.js":46}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":56,"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/base/utils/float64-set-high-word":71,"@stdlib/math/base/utils/float64-set-low-word":73,"@stdlib/math/constants/float64-exponent-bias":82}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":56,"@stdlib/math/base/utils/float64-set-low-word":73}],46:[function(require,module,exports){
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

},{"./log2ax.js":44,"./logx.js":45,"./pow2.js":47,"./x_is_zero.js":48,"./y_is_huge.js":49,"./y_is_infinite.js":50,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":12,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/sqrt":51,"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/base/utils/float64-get-low-word":66,"@stdlib/math/base/utils/float64-set-low-word":73,"@stdlib/math/base/utils/float64-to-words":76,"@stdlib/math/base/utils/uint32-to-int32":79,"@stdlib/math/constants/float64-ninf":88,"@stdlib/math/constants/float64-pinf":89}],47:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":39,"@stdlib/math/base/tools/evalpoly":56,"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/base/utils/float64-set-high-word":71,"@stdlib/math/base/utils/float64-set-low-word":73,"@stdlib/math/base/utils/uint32-to-int32":79,"@stdlib/math/constants/float64-exponent-bias":82,"@stdlib/math/constants/float64-ln-two":84}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":12,"@stdlib/math/base/special/copysign":33,"@stdlib/math/constants/float64-ninf":88,"@stdlib/math/constants/float64-pinf":89}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":64}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-pinf":89}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"./trunc.js":53}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":31,"@stdlib/math/base/special/floor":38}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{"./evalpoly.js":54}],56:[function(require,module,exports){
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

},{"./evalpoly.js":54,"./factory.js":55,"@stdlib/utils/define-read-only-property":92}],57:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":64,"@stdlib/math/constants/float64-exponent-bias":82,"@stdlib/math/constants/float64-high-word-exponent-mask":83}],58:[function(require,module,exports){
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

},{"./exponent.js":57}],59:[function(require,module,exports){
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

},{"./indices.js":61}],60:[function(require,module,exports){
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

},{"./from_words.js":59}],61:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],62:[function(require,module,exports){
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

},{"./high.js":63}],63:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],64:[function(require,module,exports){
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

},{"./get_high_word.js":62}],65:[function(require,module,exports){
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

},{"./low.js":67}],66:[function(require,module,exports){
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

},{"./get_low_word.js":65}],67:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],68:[function(require,module,exports){
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

},{"./normalize.js":69}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-smallest-normal":90}],70:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":63}],71:[function(require,module,exports){
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

},{"./set_high_word.js":72}],72:[function(require,module,exports){
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

},{"./high.js":70}],73:[function(require,module,exports){
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

},{"./set_low_word.js":75}],74:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":67}],75:[function(require,module,exports){
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

},{"./low.js":74}],76:[function(require,module,exports){
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

},{"./to_words.js":78}],77:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":61}],78:[function(require,module,exports){
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

},{"./indices.js":77}],79:[function(require,module,exports){
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

},{"./uint32_to_int32.js":80}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./define_read_only_property.js":91}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){

},{}],95:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"dup":94}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{"base64-js":93,"ieee754":116}],98:[function(require,module,exports){
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
},{"../../is-buffer/index.js":118}],99:[function(require,module,exports){
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

},{"./lib/is_arguments.js":100,"./lib/keys.js":101}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],102:[function(require,module,exports){
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

},{"foreach":112,"object-keys":121}],103:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],104:[function(require,module,exports){
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

},{"./helpers/isFinite":105,"./helpers/isNaN":106,"./helpers/mod":107,"./helpers/sign":108,"es-to-primitive/es5":109,"has":115,"is-callable":119}],105:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],106:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],107:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],108:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],109:[function(require,module,exports){
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

},{"./helpers/isPrimitive":110,"is-callable":119}],110:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){

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


},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":113}],115:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":114}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{"./isArguments":122}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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
},{"_process":96}],124:[function(require,module,exports){
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
},{"_process":96}],125:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":126}],126:[function(require,module,exports){
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
},{"./_stream_readable":128,"./_stream_writable":130,"core-util-is":98,"inherits":117,"process-nextick-args":124}],127:[function(require,module,exports){
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
},{"./_stream_transform":129,"core-util-is":98,"inherits":117}],128:[function(require,module,exports){
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
},{"./_stream_duplex":126,"./internal/streams/BufferList":131,"./internal/streams/destroy":132,"./internal/streams/stream":133,"_process":96,"core-util-is":98,"events":111,"inherits":117,"isarray":134,"process-nextick-args":124,"safe-buffer":141,"string_decoder/":135,"util":94}],129:[function(require,module,exports){
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
},{"./_stream_duplex":126,"core-util-is":98,"inherits":117}],130:[function(require,module,exports){
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
},{"./_stream_duplex":126,"./internal/streams/destroy":132,"./internal/streams/stream":133,"_process":96,"core-util-is":98,"inherits":117,"process-nextick-args":124,"safe-buffer":141,"util-deprecate":153}],131:[function(require,module,exports){
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
},{"safe-buffer":141}],132:[function(require,module,exports){
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
},{"process-nextick-args":124}],133:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":111}],134:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],135:[function(require,module,exports){
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
},{"safe-buffer":141}],136:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":137}],137:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":126,"./lib/_stream_passthrough.js":127,"./lib/_stream_readable.js":128,"./lib/_stream_transform.js":129,"./lib/_stream_writable.js":130}],138:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":137}],139:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":130}],140:[function(require,module,exports){
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
},{"_process":96,"through":152}],141:[function(require,module,exports){
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

},{"buffer":97}],142:[function(require,module,exports){
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

},{"events":111,"inherits":117,"readable-stream/duplex.js":125,"readable-stream/passthrough.js":136,"readable-stream/readable.js":137,"readable-stream/transform.js":138,"readable-stream/writable.js":139}],143:[function(require,module,exports){
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

},{"es-abstract/es5":104,"function-bind":114}],144:[function(require,module,exports){
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

},{"./implementation":143,"./polyfill":145,"./shim":146,"define-properties":102,"function-bind":114}],145:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":143}],146:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":145,"define-properties":102}],147:[function(require,module,exports){
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
},{"./lib/default_stream":148,"./lib/results":150,"./lib/test":151,"_process":96,"defined":103,"through":152}],148:[function(require,module,exports){
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
},{"_process":96,"fs":95,"through":152}],149:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":96}],150:[function(require,module,exports){
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
},{"_process":96,"events":111,"function-bind":114,"has":115,"inherits":117,"object-inspect":120,"resumer":140,"through":152}],151:[function(require,module,exports){
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
},{"./next_tick":149,"deep-equal":99,"defined":103,"events":111,"has":115,"inherits":117,"path":123,"string.prototype.trim":144}],152:[function(require,module,exports){
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
},{"_process":96,"stream":142}],153:[function(require,module,exports){
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
