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

},{"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],8:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":44}],10:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":125}],14:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":127}],18:[function(require,module,exports){
'use strict';

// MODULES //

var betaln = require( '@stdlib/math/base/special/betaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) for a beta distribution with first shape parameter `alpha` and second shape parameter `beta`
*
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.5, 0.5 );
*
* var y = logpdf( 0.8 );
* // returns ~-0.228
*
* y = logpdf( 0.3 );
* // returns ~-0.364
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
	* Evaluates the natural logarithm of the probability density function (PDF) for a beta distribution.
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
		if ( x < 0.0 || x > 1.0 ) {
			// Support of the Beta distribution: [0,1]
			return NINF;
		}
		if ( x === 0.0 ) {
			if ( alpha < 1.0 ) {
				return PINF;
			}
			if ( alpha > 1.0 ) {
				return NINF;
			}
			return ln( beta );
		}
		if ( x === 1.0 ) {
			if ( beta < 1.0 ) {
				return PINF;
			}
			if ( beta > 1.0 ) {
				return NINF;
			}
			return ln( alpha );
		}
		out = -betalnAB;
		out += ( ( alpha-1.0 )*ln(x) ) + ( ( beta-1.0 )*log1p(-x) );
		return out;
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":21,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betaln":33,"@stdlib/math/base/special/ln":57,"@stdlib/math/base/special/log1p":59,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],19:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the probability density function (logPDF) for a beta distribution.
*
* @module @stdlib/math/base/dist/beta/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dist/beta/logpdf' );
*
* var y = logpdf( 0.5, 1.0, 1.0 );
* // returns 0.0
*
* y = logpdf( 0.5, 2.0, 4.0 );
* // returns ~0.223
*
* @example
* var factory = require( '@stdlib/math/base/dist/beta/logpdf' );
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

},{"./factory.js":18,"./logpdf.js":20,"@stdlib/utils/define-read-only-property":131}],20:[function(require,module,exports){
'use strict';

// MODULES //

var betaln = require( '@stdlib/math/base/special/betaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a beta distribution with first shape parameter `alpha` and second shape parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 0.5, 1.0, 1.0 );
* // returns 0.0
*
* @example
* var y = logpdf( 0.5, 2.0, 4.0 );
* // returns ~0.223
*
* @example
* var y = logpdf( 0.2, 2.0, 2.0 );
* // returns ~-0.041
*
* @example
* var y = logpdf( 0.8, 4.0, 4.0 );
* // returns ~-0.557
*
* @example
* var y = logpdf( -0.5, 4.0, 2.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var y = logpdf( 1.5, 4.0, 2.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var y = logpdf( 0.5, -1.0, 0.5 );
* // returns NaN
*
* @example
* var y = logpdf( 0.5, 0.5, -1.0 );
* // returns NaN
*
* @example
* var y = logpdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.5, NaN, 1.0 );
* // returns NaN
*
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
	if ( x < 0.0 || x > 1.0 ) {
		// Support of the Beta distribution: [0,1]
		return NINF;
	}
	if ( x === 0.0 ) {
		if ( alpha < 1.0 ) {
			return PINF;
		}
		if ( alpha > 1.0 ) {
			return NINF;
		}
		return ln( beta );
	}
	if ( x === 1.0 ) {
		if ( beta < 1.0 ) {
			return PINF;
		}
		if ( beta > 1.0 ) {
			return NINF;
		}
		return ln( alpha );
	}
	out = ( alpha-1.0 ) * ln( x );
	out += ( beta-1.0 ) * log1p( -x );
	out -= betaln( alpha, beta );
	return out;
} // end FUNCTION logpdf()


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betaln":33,"@stdlib/math/base/special/ln":57,"@stdlib/math/base/special/log1p":59,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],21:[function(require,module,exports){
'use strict';

/**
* Evaluates the natural logarithm of the probability density function for an invalid beta distribution.
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
module.exports={"expected":[1.5408169079524143,-0.6913229772089324,-22.26901678164853,-49.636907534664566,-1.4580801714752272,-40.573549146547435,-5.426371767147872,-41.28706014715052,-1.9364153563614703,-2.323704903740628,-12.637701443639198,-25.225074311856734,-1.1047250808564235,-10.78160777371527,-15.726218977773907,-3.314827104267984,-0.46584320002084656,-0.5033234091627912,0.8798952783689322,-6.1000438937584125,-14.144456328778068,1.3272431655085242,0.9739080823225246,-11.97555729243982,0.866100445129224,1.4703478529792555,-0.9613849989470045,-44.08637432838005,-35.511502698171824,-5.874573055332989,-0.9824009751947922,-14.424368429490036,-30.837052616557152,-5.174916500995364,-16.444421138456775,-5.049062047548107,-0.4594431810385191,-20.305694045445616,-11.942853979509517,-58.0327302756172,-1.6978607238378385,1.2537174069653458,-9.570843847787295,-53.76254035879178,-47.17673522586745,-19.120894810907263,-18.467760440634276,-26.396328009490308,-8.81544765124443,-4.381477224853442,-5.571598994845296,-0.43582018801809363,-2.157597406111205,-41.22994691831205,-26.50515275289159,-46.10638670592703,-0.37387112309448245,1.7004168163265394,-6.343542883428253,-9.546946181540617,-3.538542628452598,-22.77342744022922,-14.228712742200045,1.5745349491442087,-37.17748204441884,-6.784794480393988,0.14226589580238214,-0.46741926750193663,1.382285485186367,-2.732447621530142,-4.017585817940878,-1.8176352463242171,-7.190358062196739,-8.385997424982499,-2.154995999222965,-8.223600662969805,0.10839119318566892,-12.546704606666275,-0.48615323171021707,1.3658381638435122,-9.22431426180983,-0.061874744873913645,1.7181147703576547,-1.0163283536949717,-21.085289377079977,-32.30829055435488,-1.3937441329915559,-17.800113878423787,-4.201287286948649,-17.157037717348928,-26.57114605656871,1.5921154966706266,-2.6102032827546733,-0.540780280953443,-84.81487109606994,-16.324068027404355,-2.2483570216870565,-7.3243450576730185,-0.018958449907434005,-4.963254582542362,-10.595168574287568,-0.1152764807347344,-12.413667888177567,-0.9285130582917156,1.6941470645926673,-1.907845840115821,0.251880113939011,0.1444066186754882,0.06965462864300953,-8.033466527458627,0.4665471361609428,-1.0187591487206658,-7.561880908292048,-11.772697833786191,-1.7120464297287552,-19.559635383877378,-0.34756573305704297,-0.9528957428650755,-4.422945220829071,-17.503010739277112,1.5942665508551581,-104.53803585515516,-78.39116017512121,0.7061967251717509,-0.05905669552875503,-19.900990858195186,1.3636017671960516,-10.907071411904324,1.7270646550710216,-55.416093280201764,-10.70439069688381,-11.375655967501835,-7.170877712716387,-21.072609755238677,-2.579431967434159,-17.146503979881615,-5.028807250406382,-58.656752573960986,-1.245132087697168,-8.914731392438558,-4.106123393228835,-25.670832563603557,1.7118886825357795,-0.2710973771046774,-2.7553648692163093,-4.664956285770193,0.37570036601517476,-13.323024444690688,-1.9391989444056295,-8.581777234372964,-57.918847949561275,-1.03776027951334,0.4783639624343059,-5.954768471669782,-4.716657923436285,1.3212684974996387,-6.843667298566986,1.3127261948878655,-3.666930928454231,-27.332310344557865,-13.24265442960494,-1.5384660546947493,-5.8191360399026895,-13.803423520182012,-16.239222722583794,0.5102379369881973,-0.2397759990880548,-4.699600625142567,0.14020060405820445,-29.42232768938361,-7.864700121591505,-8.023841571164294,0.6439314416752402,-15.407693021820684,-1.2438493636387231,1.3594562421996752,0.9520649906070155,-12.024559856313378,1.2450082021873978,-34.879654109632575,-2.9810041981177484,-26.4460403763623,1.6078060253791326,-9.513761466219258,-17.39712998968027,-9.118481041102944,1.6666188309280145,1.7295676078955893,-0.6879790970557336,0.6275358763946484,1.551767066745756,-42.66833719476794,1.4933822681346989,-4.5718729200310255,-115.64661221816243,-17.036334973999335,-3.5292763158964475,-22.483249891161304,-14.210464704103916,-5.504983047622779,0.6349450260232898,-1.2743477096177096,-13.586823216554542,-17.94878842792708,-9.173190631007122,0.8951979089616264,-33.010202333653375,0.0005324002799036442,-9.86719051492241,-8.042256518734707,-0.6120474200090884,-14.916040766358329,-47.93963017213263,0.836272670514834,-13.388170498328304,-2.9157979470872126,-11.89705716110269,1.6036975068557515,-10.421845096767573,-14.996726747190806,0.1435244790503436,-2.09719126628438,-3.6355673863588063,-14.853691240879618,1.4407762480309163,-3.899982552331621,0.7572182578035522,-3.8348680813681715,-6.382303374950865,-16.845887242622656,1.5627940089031802,-10.974049870570267,-4.401095186916848,0.2990309914491407,-0.6854088203397817,-29.990830684239683,-9.308537027803041,-30.45877098895499,-43.7383367474457,-6.241408796622192,-17.63290314986186,-22.248886418279124,-13.290919317133262,-0.43801969043535127,1.283606091008509,-9.118513007368596,0.819447796880179,-7.5151411534395045,-5.308052544181847,-3.450045844165016,-5.954294630170559,-2.204295731204983,-0.2501289187198119,0.9943911427944228,0.15387797674837644,1.5773637947380799,1.4710510210458785,0.17136872860798347,1.5681182507849534,1.4442818890464642,-3.445705785514552,-0.16048117343673685,-20.455077600809386,-41.97890373024255,-7.237111475575802,-1.2491706398757065,-9.432519232563617,1.482790136966114,-29.196799348864943,-2.142927829787081,-14.806199663366412,-15.359463807680784,-8.584127068590627,-3.6762629633222526,-2.666701838630153,-8.620795732093635,1.2438003243623572,-29.669849866745786,-1.1984850132357159,-3.8723755395670496,-37.80833651446987,-47.83567535721391,1.6357162206434563,-6.129320058035306,-69.47239809440805,-27.555841154413894,-4.2126807586064245,-9.09657401353628,1.315307274058373,-18.728318322907324,0.50960666238355,-9.212060084348453,-1.0962335713054099,-5.884098845963408,-1.2129683337596942,-41.38728418852249,-2.6608911157592874,-5.440646488241898,-41.627690216282176,0.7114287986693988,-19.175528540112687,-4.5521987512864595,1.515877024400659,-0.567844074399237,-27.595792565720707,1.379740750069586,-22.686700156786188,1.7049385106250106,-6.295611423109431,-16.52093322312151,-2.503542643782393,-7.080026892798838,-20.36740835128471,-38.354086343357466,-1.2889451908439113,0.7137849033232366,-60.03575678258284,-5.030787400952136,-26.894490326653983,-95.53874692996739,1.3572284795414706,-9.064719422747043,1.7067524060561743,-26.83466282591043,1.448025190698503,-0.07345653449205036,-5.746310249971376,-56.87751166150053,-1.7503244281197818,-4.1508292316257,-3.802928969277937,-8.679880655649638,0.5502635930149471,-5.48795043115844,-14.216473549785867,1.20900096936851,-0.1439095455435453,-11.136609725708876,1.030105489487719,1.3797657310223153,-12.550039386855747,-8.397853533748954,-22.625168393507153,-18.634401889806778,0.0653117498435587,0.7773638590064964,-10.723412922218849,-4.365038783252702,0.8746998458967425,-54.639154891552366,0.3783084758659485,-1.5606526064707391,-2.004114169063133,-2.5120516380641065,-2.4394718258226913,-0.15952883163116205,-2.7510415297268387,1.1538096784416982,-4.493430685560311,1.6892655982875882,-23.357373635908992,-0.21183239123518405,1.5652818532730293,-8.277635051866527,-0.1450245436143205,-4.5321548671049205,-37.7791532006603,-2.098655599967059,-42.714695351520774,1.61847621962773,-12.098880296614077,-3.2341963829078115,1.5265757628274077,-14.103111578053856,-49.76349676516392,-9.760842882079423,-18.676996146849184,1.4921926778340437,-32.85678715598533,0.5069392505818264,1.399894920674968,-1.628496298030711,0.39967288395643497,1.59098217751065,-3.483081169034412,-4.452873588724891,-1.286255434041248,-19.329468349837537,-32.21633344536214,-15.812111212299543,-0.7718262377159144,-35.81998469402368,-36.70710968782532,-10.14853502423562,-4.259764571157662,0.22398474996556672,0.9034944619562744,-2.775978498729633,-23.55575071408454,-2.6722884007755767,-13.662375669817013,0.9462752119724898,-14.94639608193896,-21.93106407691644,-1.5796632311729466,-5.221303822250551,-3.9450829117135577,-31.431127019196794,-14.923131203242319,-27.48666391285296,1.4761510714776112,-9.474900416922662,1.432140891985171,-17.593103365722694,-5.624379367533216,1.1478219101279112,-20.505776234533606,-11.682729498402422,-21.273937829512178,-34.12764540984202,-4.469496976636235,-23.41777312332988,-1.225762079302148,-0.20408036128871654,-17.3410404206384,-59.55637341032643,0.3988221707895949,-8.850169379463741,-3.4521189523393248,-12.37526567510549,-8.319148497083471,1.5611794452669097,-1.152694031820646,-24.253295335369685,-50.884416172048326,-2.735144393826914,1.089528419286112,-5.843506342481383,-2.0703723615657985,1.1996272423359526,-9.765443352131074,-4.385615788515246,1.411900430947672,-2.935032241466267,-10.728197690865294,-2.198907121255788,-3.407206728610292,0.8925818249509101,0.5428265212812722,-9.353523092875719,1.5625633762391198,-44.90709785212834,-3.7361853213485494,-4.531868221918073,-6.536767025630386,1.3402004327733654,1.0980807698181518,0.6489581940148184,1.5015984784202643,-9.302602817765358,1.699452845335264,1.5749280127366418,-1.1267230870392853,-0.14749704538601183,-0.21455395665330235,-0.954495892628092,-1.8212509533496917,1.658652700158373,0.24166364492814907,-21.303818271772883,1.598680807101768,1.6422678259029388,-3.683227737459216,-6.387191048382739,0.9947943458253321,1.4460308931404513,-35.296545300531385,-15.710498496206341,1.2378027761841501,-0.6137136787205675,-10.748145639894004,-16.684132264530387,-33.78421529893501,-2.4934501740122137,-0.5665439098654548,-41.934899423059996,1.4582265903021092,-67.64386788555812,1.7380058281194986,-25.53241647016063,-13.861833443526077,0.9456825107743185,-0.3212469670903264,-23.056093695391834,-8.839272418985942,1.643345122215087,-2.4083726419292293,-3.829418953951446,-10.88365088701592,-0.6141215345423685,1.4774170677659417,-14.630528058671143,-3.3068328288120714,-18.95703925258735,-28.480432888732707,1.4036384380676292,-7.503962532656965,-0.8331344885252787,-0.8562477715023515,-3.090011038975179,-8.659020810962208,-43.070628189655565,-14.997843522806049,-25.051933467222483,-7.675171842447729,-23.09546475761657,1.6531853044888996,0.8858479285907022,-36.55774110579347,1.6374984194049351,1.3500987375015123,0.540896399805681,-21.49511881132539,-99.69729118373111,0.8352214841708507,1.6040385973204478,1.5336181212046978,-202.71411610468948,1.402685091083974,-26.60847655351027,-5.7257922122360325,-9.21982249098939,-1.5603726497489023,-31.97900592910276,-4.40759339393962,-31.64098349339135,-8.666904957942071,-19.61524126996216,-16.854705030046215,-9.507288677934303,-7.663959893544503,-7.18383015055786,-24.940084451059775,-17.327222209608653,-11.610168354424124,1.4652009901456955,1.0486373794772104,-37.03281944402204,1.2434214127489374,-5.111908223956283,0.4960555844048544,-0.9533841046461071,-4.887972184795304,1.6554710711176654,-9.47971401566706,1.2266895591922777,1.0766272529939518,-23.896406544436342,-11.12330139782458,-0.7193186640536875,0.5916713744192048,1.593860963906414,-20.06613966315009,-27.302042666774142,-10.75909349095942,-5.751533027913661,-21.178730821215694,-19.708712683317856,-13.500800145692237,1.7083866367608231,-5.833608545667383,-47.92604655658884,-4.799088381017347,1.7713124081556209,1.6716302463766435,-0.16971380801197267,-30.412958251433487,-14.207526344411768,1.225737334210872,-3.1081163560407066,-33.841625001724545,-29.37104094274188,-6.898191548962059,1.733032730771876,1.3796588645190422,-3.8998800179576327,-7.03268819910628,-6.851773801859734,-18.33353682066472,-3.787452786544973,-0.9924735118123573,-8.335548264169201,-0.6772668220231126,1.0356916056116616,-1.8903410811309684,-13.05210073039353,-11.186759904626397,-1.2773149854016528,-5.218610498085996,-19.588430192636586,-2.7894371240547557,-9.489874524242625,-8.218609463884622,-19.409821424775487,0.9297280511352013,-16.9774101862899,-32.100302226769124,-8.494272910334985,-56.08067593236716,-10.002826066966183,1.4190613520476407,-2.514501444818963,-2.599022652459743,-25.624467019123195,1.3437328373681963,-38.42748528828811,-29.871445813363852,-41.69427305001854,-8.127162995617674,-23.022150303579338,-1.4940271531313516,-4.6546470911759705,-21.29817959234682,-28.23995545510297,1.4426061830268755,-10.81892254214173,-32.90205782218901,-0.4448310883662012,-3.7747764872666782,-0.5170807660122119,-69.06000189324412,-49.88040369353327,-11.469442255339008,-2.417519229621685,0.33244605466652866,-4.872514458683897,1.7576525702644528,-6.460771527981766,1.384488637510928,0.062166288037001305,-46.14254977634846,-41.62159668288438,1.4738600095594632,-5.957538251647611,-4.0523477500061205,-7.806112410109133,-17.954396311292722,-22.906016416693653,-0.49164367781253704,-27.204550613811136,-0.749350327979807,-1.8623287180275385,1.1838962606535186,1.3257014879506208,-7.504408354071229,-2.2830298655182544,-12.786792577985848,-34.40395621541027,-7.966058079169824,1.4426431473170105,-18.21823236027203,-0.36191967309673023,-2.104774562969708,-10.145825407932582,-12.110837544882932,1.5667101528805567,-0.8784195807200343,-6.60604586588002,-0.15184472726828346,0.2232368045366644,-3.4674794568649854,-11.596918790839377,-32.68804915742395,-60.38706736714695,0.4293801333416525,1.359483000572399,1.051047408401304,-8.15795015959793,1.2050551659821376,-30.496841105900465,-20.22600994427438,-17.369908413195272,1.2043999715701719,-1.7083329909787355,1.5663897714256114,-5.069348306213334,-16.804639971516735,-29.28689205648206,-12.660664907127817,-0.4598184228295352,-1.8574243712357008,0.7271384833268288,-1.8348551044686139,1.6581593810180064,-4.83666809879878,1.5864884168651212,-9.574122311679915,-21.10351799149673,-3.837993594353563,0.5007634454886332,-23.27968025877042,1.303749234770522,0.9397449887482616,-21.841663246199797,-17.665437790007633,-23.389882281554115,0.9934671493355789,-1.5621573493887948,-15.204637456154321,-26.55373762318719,1.045797034673019,1.7807836778108816,-33.9241902564461,1.3712935839982974,-0.7899954529698454,-1.1390047061766175,-4.414273651726203,0.0585492380385384,-8.736720529873052,-22.42568543956976,-7.924989276787431,-21.912622978165327,-14.81707602737377,-8.890765079771942,-15.306765010411103,-15.879002876620754,-26.51557302795067,-12.085000214081761,-7.810894728526476,-8.191775039389285,-3.128297490144401,-6.459505225330411,0.8629800744399638,-0.5205396859752036,-8.022537448906153,-13.405899802543914,1.718595284872542,-1.6075964139396453,1.3017031657305003,-14.912032800505887,-49.54908368491246,0.7648499208023303,-5.077889767246411,-10.996609746761097,1.3563268724841855,-5.835834133976171,-24.80768242291311,-0.1533401178751328,-4.211452042771322,-1.7752315280519757,-8.681313610279599,1.2381361204314705,-5.3797905487524975,-32.17202563643148,1.3862182627554538,-12.322261596972067,-1.715066252102769,-8.938243850274175,-2.8627219905516026,0.2463977080010964,-9.128665814728134,-14.76754333000477,-2.987682597596229,-19.679844100949968,-21.163497616705097,-1.88696894383724,0.22243305036381944,-4.225428369269177,0.660483912298008,-32.213109866746684,-1.529608473394069,-1.2104438489189726,-18.96015464827543,-9.370508559857315,-0.9955437200127633,-30.15701274565915,-1.0484027839479761,-2.0485925258372424,-22.739133515445214,-57.72500906381588,0.3203372183677904,-7.665893087411236,1.3351404524723787,-40.11133419049923,-1.3057191911657,-18.63471053692968,0.3785119599712994,-22.31795414725347,-20.595336632390076,-0.4714841360351798,-19.365971600233017,-1.0893664921768593,1.374415529146361,-3.200645149138797,-8.559378631968574,-0.25071917422087875,-34.95774636325335,-20.586092718478902,0.5692628531320696,1.517907582685036,0.2726450907586653,-7.0200834191385475,-6.305301444632943,0.7113417915276856,-10.401223714926026,1.5962293227023245,-5.156284253821121,0.7026745869360997,-0.5495512469646875,-95.81354756829619,-7.941478297142247,1.5221083605763641,1.595980028961002,-13.093981977499054,-5.774933905743253,-12.278295480579425,-5.002518738227833,-1.0316408841545717,-0.8293848712982372,1.7046496161281137,-15.858443282328576,-32.60195267852845,0.4199137266335762,-17.849981498940007,-0.8318997824691721,-2.4285765639812498,-14.898170719748883,1.5753232207646497,1.7019961086663717,1.5418691241633278,0.42500163358797494,-1.1539363624309464,-1.2390187800712087,-2.6828139475497106,-4.197942713426627,0.24510675128885273,-9.433042900357517,-65.61923388010104,-3.1529688389120487,-1.6014609181374646,-12.177871231703216,-13.855181684263936,-0.02561909243593785,-5.7172861632214165,1.6877885359595712,0.73000376313678,-28.028320339670046,-42.62769970819983,1.486013080272421,-8.976951484260859,0.049930228863156234,-7.313465525480577,-35.55249577775554,-0.9991776812607829,-0.7265182228955851,1.5871665493783955,0.8651230857839969,-13.708744085703994,-11.419383726674681,-19.16976853862695,-32.56441527775984,-29.83676700838911,-51.019295301172775,0.10527656940938224,1.675392932318562,0.2585130766876116,-11.9790686813202,-6.005158866699416,-1.8292309100275075,-21.86360027416665,1.3140852426588112,-5.708613119891093,0.024959199538689525,-1.1967714707369148,0.6370975282272147,-6.694665266519165,-13.119689193397615,-18.85270877665332,1.3080473883254287,1.2192318482238562,1.364669436323347,-19.173065613009086,-15.565823807610366,0.10509768870321734,-11.174808856406006,1.0108560418244372,-0.5965102613704429,-32.01587935855018,1.4091560999513941,-68.43790373170579,1.657784892209416,-27.599412943394942,-13.671780019777554,-25.276622903156632,1.4005138334762441,1.7396210145771458,0.8974450017637912,0.9696852211446112,-15.22350778179275,1.5886768189883207,-49.49024980078005,-4.374473751450678,-12.902194813986439,-20.107517283469658,1.2015771130736246,1.5324715020666302,-11.227739519038197,-14.537956647909276,1.7609140470693032,-5.653301040232813,-0.05270000572369149,-36.609189912737016,0.37529078406251726,-49.91097037730969,-21.75354708617063,-123.69330768867351,-14.192108831037965,1.1376100794046171,-16.308949480110748,1.6160287585558262,-0.65139454398378,1.6661049582083614,-4.106242350496375,1.6404740990416782,-57.02713460591021,1.3751973913808597,-29.931901035783483,-3.427640504344265,-54.78879293696559,-5.138569536269818,-7.6882125099457985,-11.58834462243642,-19.74748028209437,-2.3704727219374297,-0.17798102307516306,-27.640347421865183,-10.353128045662832,-7.212167957384009,-2.0733396240114392,-5.463498851751629,-1.6589985018228544,-5.405974512968928,-6.351721241989303,-9.472614033499452,0.6300269123458833,-3.780952840927985,-7.259108183760947,0.9128899209274688,-9.609305596686843,-39.6153048405482,-1.9065218186562674,-8.443474715860615,-7.915359378427624,-28.168828219372617,-15.62897702687087,-4.73348044986056,-34.43303292640566,-17.63185893105917,-15.85288352555869,-11.796855634763318,-0.015870948835436938,-95.8222981221827,-8.823415775078525,-5.144164228725472,0.9927824498663247,-0.10767887839986923,-91.49575964506772,0.924375490228897,1.36293227056357,0.7976543667268108,-14.2054603873124,-15.536575068005916,-3.7723483086107295,-0.747984943906844,-0.7442916402286599,-8.93762698281742,0.19917676624839586,-0.5499618953976033,-5.115835144917403,1.0595036249555552,-2.186525236607075,-23.62894807878126,1.2000944488998675,-8.626982155720427,-3.238980219438996,1.6735550441847789,-20.515018312821145,0.38980076844168066,-1.8558474768208968,-14.824617256215681,1.3431668247051651,-4.013885658317376,-11.327105214404984,0.6934833140686631,-21.152330778131745,-1.9155959171416614,-4.635263679866739,-0.38983426645191654,1.319360782665087,0.5204700926648917],"alpha":[10.99542405920487,16.594529372949886,17.29757516015574,27.88653610943583,18.551079615411243,28.557985227663323,17.59200243282701,14.870969231166464,25.261446229087596,17.662161273564383,11.010724624793351,16.356441345408655,22.036397026265043,23.515806432924595,23.01407270493101,10.900675067660416,11.77201752374096,11.659371669923173,28.06106301672736,16.328088989380444,26.3779151845295,12.43188470129667,14.924681754663798,19.587549563390667,17.467439878719176,21.44531449509927,22.378925459155447,18.300273523014198,29.070823207216257,17.591278453339868,23.318067716830356,29.78734295339693,24.741343967461226,26.30504217111718,21.53428191784804,14.8982403439568,23.454881304727607,22.45818416959154,23.40177583611294,28.19746666908076,11.117127059088979,14.687790584029967,10.549398039496376,25.89867354324116,29.24365145532288,11.662308145264495,24.105292534233662,21.092250434063907,20.70458720505931,27.945042941821768,29.69822595061261,24.954356946132986,24.55097903388102,27.11069821789444,26.222715508753012,27.907750735086946,13.366545156343452,27.784248775929278,15.264118161513398,17.618368207405513,27.023152369780252,17.36996795623263,25.333326071121178,22.83980911460406,26.224394036150606,15.408551851121164,15.396467396680645,16.072150342332996,19.574151095420163,23.087704185396326,21.474187100021595,21.89483097765139,14.387825257843051,23.72685642926653,13.625572020392056,19.560058209018525,13.696519830073965,29.407637165236334,28.071800612774492,11.400377287802481,25.744867868361666,18.97711080161059,12.349067043998986,17.81404441456509,26.46345634598346,17.461898875600895,11.398486341695895,18.49467944167625,10.623370517106014,11.879590365127006,15.451945817450667,24.178770458373084,12.697026392441764,23.51541421461836,25.627103721830853,19.38749041579026,19.54984602718377,22.574026058482634,11.408385273785777,22.352907679561348,15.229239196459506,14.450052314500184,12.77316641083722,16.29520703797981,27.209212211918082,22.28092552024382,11.315733740638084,25.163058620796043,22.961009553625633,29.38650741126444,18.56217666420862,29.946643937770247,17.186157152852157,28.911170817951547,13.656986568818503,16.669705311481952,27.08859431741104,29.203039180112143,21.178551732826033,26.35497943437938,22.634234128076432,29.530125558941837,18.01271167646792,18.035650303259235,18.67971868457159,27.041529785803565,23.896039945539073,21.675921916981146,28.564073391682058,14.392850352305118,14.237016158005806,18.10722102052157,13.423988026958323,25.795357619685625,10.53423523045324,14.75863185515141,27.49297480238536,24.646937093216867,17.2487792433258,11.912263488923273,20.93828940328099,18.462587042960195,25.484910120246877,21.327068718141938,23.803192204870186,29.941798738554017,26.566247159678746,23.117934027853355,22.659254648663747,28.78662811330569,26.00006300881576,27.589408547897932,24.049653670267276,13.387112904456338,25.590645584044665,10.38585675182231,12.270002959874597,17.918781885190786,15.424373351793523,21.94931426679679,21.8823277792935,20.971551646197906,25.166555363197205,29.473742099429447,14.70733740370397,12.95364978125015,13.52390621769441,15.463412501774712,19.107099948294003,20.36130136845965,21.321523384055254,18.935292430588643,12.658516020169568,14.774976865085993,28.027471940057392,22.880833899476976,14.806577857813368,12.132853808988656,13.085357288978106,15.768666708897655,28.947257239745806,22.247132938192728,24.238390728971773,12.51411051616489,15.82388117408322,18.668807708894278,26.663360295386408,28.92503094333621,25.77279672323289,14.900055474245843,12.6668259466787,27.07848580369081,13.677761969929776,26.919907217294814,27.01315548463922,20.581401945792955,23.460699159538464,13.637358021996215,26.581882616883384,19.794044810473533,22.386303056840976,20.165180428096843,10.328650124811514,27.3745780463487,17.608678258065922,21.454006749120236,24.538050817647246,23.892957348648643,23.675062156684497,15.702128646676616,25.222958888822834,14.827394308771131,23.72195939426351,13.65134557532311,28.387225540749036,15.5398476006373,21.58206382649281,21.105843700249803,16.701182029223528,26.735565269901084,13.18429370613769,28.766740532446732,27.972730793024702,20.50102947097003,20.000023832736694,21.323791954697203,17.3790462009283,25.825442556962855,28.76444251026424,21.37074883402628,16.91411071631095,11.615307984998587,26.977188151754163,24.448133120489484,18.282804345907234,23.530757625877577,11.20797232912707,11.846569836647362,17.13648113838444,17.305825873782204,18.377436484553495,10.102082468568131,24.826679433036823,22.787500493153576,10.044687675213154,23.58781600120547,16.931143841253004,29.433581507550866,15.632884843377557,19.787836135351412,14.175472256641513,24.90590948764919,21.18372852698723,27.840233278549015,14.001391675369987,22.604842213453505,20.40307892561596,10.732375606540764,27.513240039665575,25.08378424224823,10.927400508700202,25.887950033735283,19.35353592425423,25.287180972499847,12.000513858197369,22.379592138269317,16.931736235010888,22.571001793652137,19.9295519608868,22.202854682379037,27.737941211502903,10.015210499620007,20.99834167403546,13.281741164014228,15.877088186676449,22.327175552438124,13.040991205475168,26.117977217008004,20.74911950817316,10.019661794906977,21.045817536665872,18.89839204913457,10.940828474244082,23.248680008615867,13.265905046770015,15.886657457058977,23.390756787658482,16.030843328112102,12.312156205433409,25.325089537161134,18.408711639586993,20.454895745470452,16.038976182985685,18.47195749413102,11.931478635939614,29.641768131611627,13.289218253129654,14.56956977895452,18.443962408290503,28.803365098283344,22.275576382992917,10.7650178344604,28.20039410169563,27.99770930026698,28.219751308672333,17.98795378492241,18.149873399910945,27.81131547188015,14.385548331310428,26.074275594889457,21.93100901814965,12.258377412229823,26.06269652586905,20.820666292328355,23.44396316744146,13.053093382217344,19.018033217394347,18.84939758698854,21.666846121701244,26.776500423543162,16.953339011759002,22.396970430932356,28.817618292492575,16.33586553164701,18.172868225962407,25.046094933025312,22.188145073746913,18.223138189063977,13.984550977645753,16.86533071292481,27.75683426874407,10.507123292783138,27.810300439219287,22.7936672982933,12.828580323522583,14.01284272196158,15.265407185335382,26.15669742002283,20.19790224971498,10.168088834626786,22.433736227364214,27.336459419426205,18.15982168312729,19.533970279980387,11.894382205992095,29.08853100790004,28.96053591359616,18.004253284455363,19.177724599375907,25.99553502600437,20.92639278068105,25.759959786008956,17.852694138506763,10.712301912734272,18.136729442069353,27.660870171552425,13.388618755530576,24.69014163634542,27.063303005118957,22.96018418961523,13.47497400550981,29.767087289670258,26.817547929771987,15.775307889451643,16.64040525244453,24.696211529423543,19.191452718974887,22.417977576906573,22.943635897074213,28.304417015767367,29.25058132078106,11.501339461001571,26.47644128875845,14.555931306832246,14.875940775267553,24.673121233464354,13.326353021560582,21.432455104798382,20.915462276803233,21.428251330681714,24.974363125198245,18.283266627132434,16.776206753004953,29.394769365947244,20.11745029776927,15.342300874803328,27.939561509346113,29.547963468426758,14.270380790364353,16.7512661104548,26.563763413218243,26.1060053126929,18.008371149100363,27.87651720280344,15.669936821634586,24.958464923413423,10.381751755827061,23.48916326885934,20.453730021858195,29.008108291063365,14.584532556309746,12.90087735501456,24.547898318413893,25.55093957342531,25.134330062491955,17.000667500610728,20.046428131617,22.123320587589195,21.95504229385973,17.13147471738244,27.469455628628904,13.358012671164165,29.011195390032483,24.9649066475923,22.6096570404887,18.36833355111048,20.670088310941438,19.996904570943737,14.346722982349878,25.21629031453289,27.251249029864944,16.725176659888493,29.961814736894002,26.493212058568854,15.67253192816597,26.009432645416073,17.69852807589688,22.690507791207825,29.854592951855558,28.384778484582277,18.792103576561505,25.982454826902902,14.035148260204494,12.279156491977199,21.742535735678658,15.34658202078127,25.343621490537434,18.003588836011897,23.22805437284964,25.943074252712638,20.601588619114715,16.8400064032774,23.355714496485547,20.74980877710402,15.28038181843602,21.602440474657808,27.5468421748403,16.769764100412182,28.287921972394262,13.836321295709508,21.843199710400203,28.093465953345014,22.68651986290869,27.731334146058128,28.540970999999317,15.916247198891163,24.78815960614113,24.723629650118543,21.557003066509523,19.3739139833823,19.815029201986395,13.6092514938393,28.852529707296934,21.123883629538458,16.671953480662452,11.366409108324724,29.795671029781428,14.677123476483022,13.97679716058172,29.887634125980043,26.24286113529799,16.819198978900033,13.328637507199307,16.073459823845596,11.881551903454906,11.638780122890275,27.9163556960697,19.796905344682113,18.77098143185774,16.97409945488486,12.84210806634032,17.346908769361736,19.444710546262783,17.831256815991466,11.614875981882204,24.93656884245776,19.294607702659988,17.261748468677407,28.68167420778795,25.86257981810551,22.183330118449234,21.15748618630286,17.34084452575663,27.241216365320003,11.925549666719695,23.8133281883208,26.11829031865829,27.08315650479291,25.94786573000445,13.872230601181993,18.57007492132645,15.120742142409425,13.417730301031355,24.53044836740289,26.01694990023791,23.822263163672986,21.99172011607153,12.572265800736368,18.70144831094583,26.914304604485405,18.702796474807283,28.27095279519061,24.669403702222596,13.392019907786645,21.94617007555241,22.05808638232416,13.350908812271992,20.82835357350193,15.157655346803715,23.74073095256987,16.55373034000796,16.790593711030567,19.566260183188355,28.95059723942277,13.419738682428367,20.881759359519748,12.298702159754452,25.469040915119933,19.16655692183128,14.932615076752533,28.666747747002688,20.180441047627113,16.467431218118094,18.484218652285502,26.57115740382778,14.46629153523213,15.382323810994748,29.329608817645404,10.175455278514093,15.196488577369438,19.226807852601468,23.87921893357335,29.82742209573567,18.20035303615564,27.90243888743401,17.50722606093133,14.316835877026781,25.08260515685912,14.42471322082016,11.152034295927198,11.61453196512715,18.404925789242984,15.661018039106596,29.164675814525438,20.323718045655287,29.118225524834727,14.18904763460521,13.704480482256125,21.27948883435035,26.30087063069069,19.4718904722531,25.86111758865726,29.597513106257086,16.151425895767066,14.169499829095042,20.650885951431693,19.04114325442724,15.430006301834421,18.963002732443183,28.97517825413847,12.43975734059051,18.83884715449957,28.35183795276807,27.764109555337285,28.75233803611375,11.622217638755888,21.021016153830146,24.144100717789097,17.769421771015907,22.575741477056773,26.188151220114293,22.820921595929804,26.696320367152424,10.29356450518538,13.710257492480125,25.987929421587307,29.000662139481143,17.43372450137513,21.071436065563862,12.35466961152531,25.014384719909877,10.657389996566486,17.875485059105817,29.269500682363518,18.52507049011023,19.150148286457124,29.50466067062797,23.80647597879747,21.594518189814064,23.14719078585634,17.466714533309254,20.78370439735044,25.312638092670298,14.727634015638177,14.659931062851843,17.3200549340307,18.46919125583987,26.850941906631927,12.800919021864878,24.694578503587813,11.963123806062047,13.845497339176314,29.322904913564734,11.145851903702578,12.752610343727051,28.695523727583222,26.309460503093902,10.555621333287526,24.768946171603577,27.876501900413295,21.07400064911099,19.216117586325133,14.261909059292318,17.414327337940797,13.373721020163881,24.974593507685384,17.101068545448335,24.64320831464232,23.023340488664466,13.836297130083167,28.07278368906234,29.066289150711796,26.00649496210759,20.48563792497336,23.68490716842259,20.295061359235227,28.59343852693218,25.937767299088396,15.1263830473619,15.01447147110988,26.163303584485313,12.098725654322013,20.44903188520459,23.734955394599503,22.21561491752313,17.79056532131015,28.907604070433578,19.54116528175742,18.03027906335885,15.765484696033777,12.319996923415832,21.19407680358742,18.949757912316073,15.412791798597194,14.962277250807068,25.464043117265952,12.16807711636934,16.702798913438702,15.10826574580507,19.53213488010348,12.76329622374696,10.60577697975102,10.781838370104797,26.19721947718128,17.77962374335462,20.026292260470434,21.704968134560815,20.399738329307336,25.63015208788112,25.062147499268313,17.97212167820316,29.72212649852483,25.064687837415075,13.718406775033172,27.34070356172173,10.496173634962055,27.96367541854652,17.880115470833285,26.619551086684822,17.987555837852625,27.506883792159154,27.26428643798141,28.845055375511436,11.346733991892739,20.893365218904503,18.297138120834763,19.85187068397975,21.071429940053466,10.35289139195443,17.807877816053697,17.835974308743594,23.534245036996747,15.033178554937653,24.501677312784466,18.456218949945495,11.754738849364003,16.541268445496343,16.173888548107243,14.610237468603007,27.700416916865976,28.693800889459943,14.637557383979987,20.890043416922325,25.969984013473173,11.58443754972816,28.3544501635942,25.300003409897425,18.531437513580563,21.541037401842917,18.324293487115956,21.545330397571018,29.716296801879615,21.93019300000472,19.74963137359061,19.08729866946016,14.094530614329631,17.311391697575118,16.179222420176693,17.977772601033628,22.34578024961763,27.30539325828614,15.889411729833816,11.394899076399142,11.830850063371955,17.815320854875264,12.66428151846156,19.150320649552267,16.917019235660796,13.50340628713164,22.26937601421782,23.42346052066383,24.754595785608338,28.99438103049355,21.059994007123557,25.175445747208034,10.654651197690148,29.112548539900047,11.188370938426129,27.813181094238665,13.416206980365185,19.546984347511195,22.457695290904873,21.594641672189706,18.23994009170461,27.81104688705247,28.056474894550764,22.211847213488323,29.398669310831615,27.737214127488205,17.26506064745283,27.170851858849883,29.267543494312037,17.146161703548508,25.29400351770059,23.654677560759666,20.294772840301096,15.305755813812652,23.82929401851345,28.346197670399533,11.848676001123838,27.272277555708552,17.80373166495395,14.829318531165585,28.40176726221571,25.855568032323394,19.460246142037146,24.493226553267252,23.92536992810051,23.26822025326831,11.278582399030528,25.38778913622081,11.219860981851305,26.430661693838758,13.75178435137757,10.03770572585815,22.33860870037578,25.83571285794937,13.081577511755809,10.485241193937572,14.462839851328436,18.522980827078502,19.318180666049795,13.403594267061774,17.254023264345353,28.36260535593336,22.721567349595055,20.779677656372748,13.107559929993165,17.521231256152166,14.853186709185815,23.67126341170126,28.238824915731282,27.53913644819236,21.560292223926872,16.187278087146964,15.146612688996948,18.756357613491534,17.819660993542158,15.110306420430888,26.61546144665359,24.708943107710056,16.266855627784512,13.729372904223563,14.811157561805404,21.804502237726172,22.321866390159624,25.944390480653038,24.00512017139493,24.416706476720332,10.373022820905696,15.15012518869909,17.10286702132333,17.417649484571307,23.41234935991482,22.268962923595325,25.73480212487063,28.958552457474475,25.355605830296252,28.86713997887016,14.654955650691894,26.22134428509065,13.489681558096756,21.652260388309106,12.17618215616261,15.742720733475512,19.2993907392902,11.608812519614492,16.31065977893749,17.059838678359437,19.371665698584263,22.88142397035871,26.28789136149949,26.48282484921009,27.784947620805514,26.806851141919132,10.890742172585007,26.412118712837213,23.893900522756567,17.143878811174865,19.52001253672701,16.865336808414277,17.41926290290501,15.752914715912487,23.71022697592568,18.912030318287464,22.872283056392654,23.908040443831283,28.823799850753097,20.25730025290386,13.865392640041243,26.623808679999485,19.900424538747963,26.665901346024768,24.082419794510294,12.331315892615597,17.161363956624168,14.582051000684388,29.210769557234762,14.972290573053865,23.53764060829024,29.90055623430067,16.658133299139624,29.415494830610974,17.290914887253685,15.178624901581497,25.348242422569683,11.61708249668659,27.6118481952316,10.269965647941412,23.667480054599935,20.44260660353169,21.06671118445492,24.43871786435531,24.342524461139856,18.924568584328526,13.390808964469493,14.814238854494914,15.506674390943012,11.138110648778792,14.41571536069478,22.194429861978957,29.729436809335247,18.10841606394913,20.915123143822832,29.996461842628715,25.261620790594822,25.02991795697207,20.248422448371592,20.491427291671283,28.743836597782362,12.68571547065157,25.91066963933654,29.230963477407247,15.602671356574934,24.614178318977338,29.245557994501006,15.46070598937074,28.482032732968648,12.655525789320432,15.186346979107611,29.78189548794408,16.26378979457069,10.44784202636734,20.818675487448132,22.978233208684784,24.95886462469131,11.663345269971938,26.6368596316194,26.72517001401827,28.848872728160284,28.644072924086082,20.828169896248507,21.169516058591707,22.77942875770869,27.85795447486543,27.75039944141178,19.27913835241518,11.127802821293947,25.616016332693242,26.688421520377382,16.010771050243445,25.527545305506578,18.2555080172383,24.355651295677625,13.247793554861072,24.898674912202495,23.050848039373264,17.447164509886605,20.601236625719217,25.640093501089112,19.994729379430535,16.968198036921343,18.72013803378229,11.46290650237443,12.024176684220489,25.63447990135298,26.092403773692116,17.612202432183338,10.500703190567148,11.948851135589592,23.985980365299785,16.38260396382444,13.732419250279131,29.981276400066474,23.963869795082623,19.91908950630193,29.896221846368793,23.564278656279466,20.40967325359408,26.257454066480147,28.240468249163907,28.280417412411815,23.507263374302777,22.27254814924688,11.150382736516917,16.01987640996977,20.875595859979224,27.0192671291109,17.451150645710616,10.14607300588283,11.27076976374951,24.98044508931811,19.751382986256747,21.433872226974824,20.13099585101063,29.34810075578263,19.55131041578836,23.215451864639473,16.888764996247527,19.704122048732376,21.434732349874707,21.741470453662608,22.052000101984515,19.917435884528956,12.423876793213218,25.077951801529302,23.25797387247139,24.202721782056198,29.571711101094866,17.078321448845184,16.934422844113858,16.622649318401542,21.529944503487744,22.456489108836628,26.537739015759144,25.84385214338994,17.51775602275864,13.175562396660707,24.334624832327265,14.116780883796718,21.360543549667852,14.148426684374984,13.449415572013912,14.366881507645965,27.431597999405902,22.378684809124707,10.697042659464682,26.12674240698432,12.401154972101285,15.84153254167241],"x":[0.34811226038930565,0.5381054764206938,0.8605437567559,0.03985024600179443,0.21993448194970444,0.07984922971816943,0.6683056777740901,0.987515853672631,0.8418808870898387,0.7027756326402543,0.7724782170380828,0.040359394030954565,0.6467669812504466,0.21602579423173052,0.19444197737232516,0.5060016323376006,0.27352879645133776,0.5141479319564188,0.6368231573411247,0.7334687413944028,0.973649429160883,0.5550442882820692,0.47993440323413195,0.1295328642184823,0.4985927532175991,0.5006405528873634,0.3318997600656117,0.9287613333519775,0.12667232010344653,0.1767954220230774,0.5087491267056923,0.9355397764208826,0.07055914678935138,0.7658002110721678,0.18509568139101074,0.8498106880865941,0.6847995988396205,0.13406450729356356,0.16851234045001995,0.9703656586784963,0.6004498844415147,0.33243996492293326,0.6310241484004313,0.9597305938726408,0.04924483034573601,0.8830760084946325,0.1618265705769335,0.09396522693260456,0.22931652883531473,0.3785048416148389,0.7454534342106423,0.8166239013709893,0.33717353940916817,0.05431155148024591,0.10893162700895864,0.07770788019060637,0.486368812788766,0.5068290636603723,0.10881000048778255,0.11503107961322945,0.40966902245196324,0.039852136770287316,0.8074073294930095,0.6995035888335506,0.9241985970336069,0.6922716790825492,0.4269225564309669,0.5631003769666025,0.5858044668944551,0.25038793209836485,0.21235780284268158,0.2693000524516842,0.17521586617081053,0.846436757453717,0.7202362256705812,0.7561506795656339,0.22792137918330924,0.9297345998972559,0.47368621681189294,0.3131381096786674,0.22907731592561564,0.7388164315571542,0.29198304702128386,0.5474437248746289,0.15861620471229299,0.030993519673872427,0.5373426732176805,0.9245367506560971,0.09716106602572716,0.027233446206380796,0.8861052931728506,0.4251402936549378,0.6049796036300426,0.6767185040456856,0.00795099516150688,0.1431727387427526,0.2291082494997172,0.883130084736168,0.15883673964826062,0.2655573963163709,0.7142406900177058,0.31078278033992635,0.831967976193535,0.6158008499016983,0.7108824939859146,0.7904768896688696,0.25922052452419386,0.751540346733995,0.36928074759922414,0.2712642000804373,0.7377177236977075,0.4917601300236978,0.14053881864656392,0.8974753796612667,0.516032396939238,0.821464416360403,0.7564798654512692,0.7324728804318752,0.22147716272765905,0.9485179215660946,0.6626561250107001,0.0061508371157783515,0.0024431835206333297,0.6786053332933548,0.7387498266911849,0.12422703132681989,0.7410142981381687,0.1349853070156548,0.7342567059363436,0.9556121680127387,0.7584731418773738,0.8118713967500288,0.7340010083676971,0.16069390966938024,0.1803759387592423,0.04293200993932955,0.7767181110619705,0.9977311437827061,0.6557204826332335,0.8331896416437197,0.2345594636113919,0.9105813247055565,0.4985336478179099,0.2929556186625297,0.3780650914035222,0.4211637281070211,0.709067634469853,0.7916101404158484,0.3590029588671819,0.8100336322693904,0.027517986642002334,0.5044676079646524,0.5844386194853555,0.7602580875817113,0.27206263461840074,0.4252042916003502,0.1306686839078055,0.4098061694695847,0.6712119964802161,0.09557258006952773,0.1610102358687846,0.24662101167090134,0.2898094067359487,0.19880098728388962,0.07175220048284348,0.29293486074263164,0.47907115612965656,0.762249266715352,0.7611025182227311,0.9134356868241478,0.22947138801706313,0.7642296917743923,0.5802037045421677,0.0704792734551205,0.34077137011774594,0.4454154094820775,0.307266291231312,0.07599152056729719,0.502524910899679,0.9022772081256929,0.6906592593881078,0.8756245168743748,0.6534877664802652,0.6849765967001176,0.07016069332481156,0.7141604415909211,0.43878053318249366,0.589010282495245,0.49052321621310546,0.5350539023453964,0.2876759454930644,0.06417362075662547,0.3869807711911011,0.3141599938201207,0.002898446925889253,0.15628771648677442,0.8936248664960464,0.8710539799535055,0.1735623274571978,0.6839976990114383,0.605164867442386,0.42789428574490107,0.8344689366878284,0.9137192550037798,0.7101337387557785,0.6181062626710998,0.0806349318337598,0.4051915602404581,0.7720399068646622,0.14798377043210453,0.6209416126910476,0.8696855890351503,0.04301462805095446,0.35623481162646575,0.2415096704012294,0.8396021139981809,0.22799371686102665,0.5121616114073131,0.7797225809252761,0.8439161826794774,0.6817710837360926,0.42406093760345587,0.28525436460745457,0.8303180881909515,0.37230089886481177,0.2953354987191268,0.6014625729180181,0.9197205419589858,0.3206564416082709,0.130105944204711,0.39926524259195606,0.08591345766713876,0.7632322033418522,0.351058600928593,0.3445329108568229,0.10596039397465828,0.8166392657640691,0.8536701670990143,0.010570142067556798,0.22178903037798392,0.07153508212067083,0.010331657583241949,0.9231950051345503,0.38384052826123183,0.3728797847717069,0.279856677179962,0.6476199784567158,0.37260745272621665,0.7248901300564037,0.31828595693735595,0.7994017869570909,0.40170462745971913,0.3800825610722507,0.40998081665766506,0.2187405121507855,0.5002079858379345,0.4611520149399515,0.2969135308767554,0.6771915475215311,0.5197437177783879,0.6839159744794006,0.7015117756761367,0.09953074746479751,0.04742787159594575,0.7120691347403418,0.2930312207658512,0.6988794340000275,0.648553675019063,0.07847674928189163,0.7437845408228281,0.2689787606916574,0.7822333962074599,0.19160491097981058,0.5721804531248953,0.8451522944545795,0.22797139705427139,0.25825229153103346,0.10922666041924467,0.32697985401473306,0.07935628950539808,0.03773631179732839,0.0121874809390774,0.29407990191745315,0.19867611099838012,0.972839957212503,0.9137106410363747,0.3882519761281904,0.8217433298945314,0.5485843387411791,0.1472412995033403,0.28125811917023325,0.2453713276797167,0.32422710902027974,0.20485750147381965,0.7000212286305001,0.9456725500734164,0.1401672421605391,0.6353444281628029,0.02955842637455408,0.593515085341213,0.09163841685659335,0.12843631281469658,0.6766558510814473,0.34587373300950497,0.12078962464916398,0.4927643307372829,0.05818470065326542,0.6047232885857845,0.7463631326084903,0.17260544198548988,0.707469389639646,0.12678677966378005,0.10722805956239667,0.030964607931387667,0.6326223284329109,0.39793286908073533,0.007969373144914194,0.17979478073377253,0.9406375461332015,0.010588481652834325,0.47331045665185023,0.18551873482408476,0.5950945273671104,0.04777354086433516,0.5654439159871794,0.6301668099976121,0.8526301450742237,0.9685949999107601,0.1870524690311417,0.18559275867220548,0.2858646662027904,0.05108111891274625,0.6305551088786965,0.7949969432449997,0.8016243999219719,0.2650410221853523,0.5256190890804835,0.8782062772199328,0.5283547986654635,0.3970164906136433,0.8877077250874941,0.9224375028783811,0.9293433529575807,0.9633516640583535,0.5603154787121194,0.6575468227128616,0.2962438178855391,0.7735639885087875,0.5021398745030135,0.04393178287133859,0.38517864218404374,0.8042138544927533,0.7004154847794188,0.5915942453550411,0.6428782165512859,0.36237721107939436,0.12481155222719176,0.6366694797652115,0.3973683964388659,0.45870864248558707,0.887958135502348,0.3973501513624802,0.5355992755201753,0.8687733424447801,0.2855055594112439,0.8761021022005642,0.0430494451198189,0.28991287863071236,0.9513836224639909,0.6195257641036949,0.264717427269886,0.18880080430274493,0.6595990795129427,0.09927847467609374,0.9747481420770598,0.8732401363840634,0.048662486652662595,0.45098745315244515,0.06150137000969824,0.4118196475172491,0.527692521224383,0.6232475311647085,0.2482949879264833,0.6604952659733969,0.6481567679402,0.6455774670348129,0.3279055625298868,0.14824267603535102,0.9107818764458238,0.07801531718530463,0.3380013412860181,0.08073621526109487,0.9416861011521898,0.3286460178943367,0.18154205185092875,0.8003680062542948,0.36621519383172974,0.6597425841436191,0.8519645044239958,0.5189504417289896,0.8909006491805735,0.30432128564076977,0.8400477537454549,0.1242671375468225,0.4356859147240111,0.16077312697415436,0.18961296816008844,0.965339684969871,0.165571003014088,0.8694210211764182,0.5246156680753262,0.1124676678838481,0.7894286399063404,0.1187772325752885,0.8482211337347958,0.47461733931304484,0.1309758882724339,0.8565313054172905,0.8050276091735316,0.06412451359548843,0.28721574330652144,0.8773934948491178,0.5350609183466273,0.7658539552812944,0.07283200801710832,0.03384108413839937,0.7566133588818742,0.19661256975232022,0.4967045132719521,0.23908204907170094,0.19828466412130163,0.5774763786074044,0.19022006404073255,0.9070261973043292,0.9562969989299721,0.31099663969919855,0.6003915702644542,0.784955203899248,0.2610228414697684,0.6823087653270516,0.8239321424856338,0.8840711153069649,0.5454617126758663,0.6674423724915937,0.15903691132922937,0.2711537651390079,0.3093796043405608,0.515112156800799,0.4350962595922947,0.6733308797140369,0.3817070079412732,0.04885918670499856,0.31828557786657474,0.37063273718043077,0.2530141975172162,0.4846440575153277,0.6334508036214461,0.5728851569911544,0.550704360023526,0.7903817056476099,0.42179867564038087,0.2791985972033242,0.3549158230947209,0.4790510726342545,0.4032532586434505,0.5095850827302828,0.8093673814498146,0.3550223193786124,0.37445249459492835,0.19287952854849277,0.7291858891658958,0.39776758228218845,0.5896485334114157,0.7768253295374323,0.3744648160845947,0.25173709925552235,0.11383162410097336,0.09660519558583291,0.7104833065390139,0.6583534207439958,0.06502461674911553,0.9233237284643241,0.03639880507279991,0.20678416943997657,0.5965076501313542,0.06819158160288841,0.5610078967483145,0.0027456516085937466,0.5274039472972787,0.09110903049887287,0.7924052181617256,0.5032433343526546,0.5586839227229017,0.1282243810309367,0.7658525448073188,0.48946832618148717,0.6775541578308633,0.29093783926383643,0.24586310388824972,0.5838546768127824,0.44799121423355626,0.934448569215194,0.11675757742570636,0.8545864449507288,0.07971886354119229,0.7460318563809356,0.7496700361132675,0.5903562822948498,0.2400258842206111,0.40280300301364336,0.14800144087031453,0.056917904868561964,0.9276445537036808,0.01719382731212482,0.9445212566790044,0.09213373732240582,0.3058424730062683,0.5707764282917447,0.932072850487458,0.5504662473323685,0.46885064229762996,0.43463602289358283,0.9313684652546654,0.008620221947532647,0.6645407430857944,0.5108700354711031,0.3364302393062313,0.9999522710054791,0.46029903566332897,0.91297530468755,0.4283022194474564,0.13219109895684333,0.5901977280078885,0.05231438614397277,0.37761678863980297,0.8887334438792698,0.817581584382127,0.22446667389587338,0.946028919897971,0.8687567123247362,0.26969394029812466,0.18840752181548348,0.19223768780674977,0.12828434278219647,0.3003708626230046,0.4982760322566342,0.4937923681736198,0.08621189688029274,0.5572850374102782,0.15813873745957086,0.3315957227004971,0.3084609071417048,0.19338773931663966,0.6454490534811854,0.9165537435831748,0.5991665706415381,0.4438453804601512,0.8358335214705688,0.1472588482250312,0.3922583261990593,0.7810349821657079,0.5407216853315615,0.13483679699659756,0.05222605453528595,0.6894251236475908,0.2565020805603462,0.08349989260919322,0.04101429335192397,0.1501139196337169,0.602040330369793,0.12864620926689074,0.9806560321780147,0.8219520580394011,0.4784445587480546,0.4596456619202165,0.6826017025532476,0.07620617976344568,0.17921132858374667,0.3288209224888301,0.24033980151882406,0.06774649965841428,0.0895201707553408,0.34722633844267703,0.2609158728156986,0.545695476819323,0.3199306759732863,0.40769332841112416,0.7289746765536862,0.8744979152579044,0.5986909044390474,0.3847839257337644,0.04439501601512186,0.26998937182026994,0.496255586284295,0.37035462983504375,0.8538462905251523,0.21737276325621324,0.7783175982766195,0.2416980247439493,0.13273551252666715,0.6508151398583415,0.7812874123171045,0.31874536115853425,0.05972735234942905,0.5923693303255086,0.11379913451488677,0.04715656779160593,0.2865834800699911,0.9867679191360024,0.7921247983784969,0.4435369372769815,0.13405905713544475,0.6984815132694175,0.9208442500143168,0.5486292296980357,0.10429333025607646,0.10430537940559947,0.9503257396978408,0.18413430918606144,0.11339704782005944,0.8387652604340472,0.879626116815797,0.8036847240114209,0.02860501235721724,0.34379766489584407,0.2890988700535728,0.9073951637877764,0.705540846672359,0.37823648046493474,0.2960756378934488,0.020222274553498343,0.0746245930578251,0.9448371907313886,0.8576171501889229,0.5853517446663408,0.29693339218296466,0.5407009330984327,0.8090528442890028,0.4751287338383807,0.6795034004572238,0.9470680731945207,0.9038238455181244,0.370063316788799,0.7567879199219298,0.6697179470144852,0.13191919039755895,0.23408638300854046,0.0834261645882981,0.6179579362882845,0.8572502072422012,0.21509361412569072,0.41395263786306935,0.3469514806163849,0.4142227586567022,0.6753456544936238,0.6607411318688885,0.7223959600843908,0.019389758128744994,0.7281190965113433,0.4167530848918737,0.8844273623408772,0.6818065587388924,0.5092020819355629,0.8934682313024713,0.7766401733105812,0.5488266443009515,0.8146562440188991,0.1772693451510039,0.7468910937412772,0.45971393229846247,0.2999901691962876,0.2558251723367939,0.057649856997551874,0.9754602640620584,0.5954484659231956,0.4013739331751458,0.6498642619706878,0.7917858428204929,0.639304301332434,0.8844460241723473,0.20880593540646797,0.9286983809255143,0.5459654673899192,0.26484251002013637,0.5522983900489811,0.19908650609479528,0.10720594656661153,0.061451053604238304,0.697582469901574,0.23311747722665288,0.5983372541538681,0.7551743379479858,0.3042208544790215,0.48733932333516483,0.8070388210591282,0.3294073576956147,0.7878634951370433,0.9582488329541736,0.12662178506369814,0.4048377593086261,0.9014456342283899,0.3851797370177421,0.547926377024206,0.13887495846603914,0.7667374743735655,0.1282511486640212,0.628755629054847,0.6627941276480911,0.8607394369266026,0.06495572869878341,0.5774531374387837,0.5223336437350221,0.9589944233566647,0.5902107676953301,0.39159772864317155,0.3436358682991556,0.8491413856429482,0.5996043193201817,0.18039054674292698,0.11410784887651748,0.8986599960801911,0.06125522289595842,0.8603819980593785,0.08726993330297694,0.08796802255595204,0.058695653778170875,0.916282396990652,0.14604641045834454,0.8917757902837018,0.7554451750813438,0.2491962626511952,0.8373953157902498,0.6027427200651878,0.6349691619608688,0.8241516648220477,0.6951406147519579,0.5583672150253689,0.4780036690482672,0.5665952911749268,0.07987946267441015,0.01605628975044593,0.7495239039870136,0.3078851914036074,0.7606439279655703,0.753850578262979,0.3367090208549577,0.981833706767453,0.6284412494779035,0.7565271619676035,0.6403833295630788,0.2799449154862905,0.7795073517392714,0.1820494496833407,0.09991715782344701,0.5552036739979269,0.19827170688249574,0.2238801128703407,0.2105950821775704,0.8934735332850505,0.5860069275139297,0.34013021702188895,0.9096195962833162,0.8018779489329275,0.9218720641886755,0.893854350783299,0.3716205425164212,0.46431928363816977,0.2755305418886931,0.6449813334788754,0.009819610733822648,0.35520742210676226,0.272262528502218,0.9241577399027652,0.07340079668200028,0.18241467587702087,0.054993519595602613,0.41640945234436355,0.14778088219003482,0.9634552240518748,0.9568773348992408,0.29913864562375747,0.7883199671047687,0.3955225380658729,0.019057658188041948,0.3542609534158092,0.16348128730888112,0.5479578033939341,0.019743743403138447,0.0617262577201958,0.530788482227939,0.13699819465070306,0.4711090519105814,0.6295449872371475,0.6687513516581209,0.12389892020272719,0.6704564517597169,0.046870897456698035,0.8534687904643297,0.6608635204099786,0.646007894602719,0.3763266891012891,0.1887683727948839,0.19769550699582328,0.32500515952710884,0.23976153160492908,0.5316260164280411,0.9054019279734209,0.8114958414467011,0.6977771846054261,0.9901134049265188,0.8654020785475041,0.4925359251066128,0.36399953752341463,0.1350473590555663,0.3319590899237892,0.8107586797133277,0.31781714332694055,0.7861625130017669,0.7834717017871433,0.30901940981406595,0.8433501762696565,0.8792539078938113,0.6794348689922443,0.7897894386592481,0.26684240945687354,0.23410899025075604,0.7206607805151077,0.3889874044927022,0.37628282761960263,0.46721070169816703,0.36250883185577276,0.6803148318277941,0.5106859858950723,0.8236482805063985,0.28367635325042984,0.4029403563437106,0.22597564289913552,0.011598154121737148,0.7843905999884471,0.8568995615711108,0.12644365212887854,0.0868542828942851,0.6114706535675298,0.34269865213988715,0.41952363534069925,0.5526028704041865,0.9431285205770044,0.07029050716190399,0.45952242493622864,0.6698405491183548,0.6664038068137859,0.8387201960119366,0.934958941492287,0.33095208058589876,0.3168289482401092,0.43242318012161496,0.4857371576240834,0.8394904902323579,0.09848775534399601,0.9157544223892111,0.12363342391307985,0.03661631665934828,0.041695972464108166,0.6883368042866072,0.3459206041015557,0.8297969791294999,0.07697702242124249,0.2831291885912828,0.4925311167807247,0.11368251556230913,0.5642258758994132,0.28902953691859246,0.35209302702441514,0.302357780034177,0.46787472075216785,0.7728485589750291,0.91037723312243,0.874762999417336,0.42050532353817105,0.3783382038894243,0.5891880257552697,0.9666017137323539,0.09833596885094509,0.47172219334098275,0.20897576423457687,0.6724746835756445,0.5357327985095814,0.9590714658170199,0.6650750150812259,0.03119443815178058,0.28792489264494003,0.11876333575340414,0.8785034243175138,0.02923621506043128,0.4376646432185942,0.7455824064446352,0.28280790916460985,0.5994509546966529,0.7825068874263736,0.40614933263594644,0.04704020779038576,0.15818949724128917,0.037206418744545555,0.9098674707827064,0.6627451501976758,0.7397034489165386,0.807613864688975,0.1773116330725324,0.48865737505899354,0.8916786154069523,0.618199693292274,0.97623992379482,0.48844477106753037,0.022349452040077544,0.17306902077553277,0.9998299832012154,0.176953831688474,0.5086502291678945,0.15449033754022556,0.463536796479046,0.5943120713981374,0.5446000408517935,0.2345222922770449,0.6097317869290915,0.9499377007277039,0.6319795658429983,0.05486916933856456,0.7307640496380818,0.02222355422695288,0.2853175185382182,0.2603466908484018,0.8533116644495653,0.11502861169115142,0.5778024190326208,0.452770977547315,0.11058965353800931,0.802494858331025,0.6756409186994503,0.46990352306056526,0.09478546852003045,0.3053195332180203,0.810333224584185,0.6389398741145869,0.87626187700576,0.5002814519418244,0.21968499566196664,0.28196077549272647,0.4978024582052736,0.8436604798237268,0.07361947074162911,0.3860789738546724,0.25209585543305524,0.28838958179541296,0.10677946989922815,0.8582747156727286,0.8342831435184059,0.9085077829027768,0.21216473593556917,0.8795025913152776,0.803665678630143,0.2824519543885924,0.006040229197986635,0.2597114581234119,0.3295319044388121,0.4749320940039854,0.6433976520341,0.9911000834987855,0.47141619330093465,0.4590548141279527,0.7059920850580697,0.8416795228909877,0.168568730551093,0.8889300926100627,0.5767832573617859,0.256759419984939,0.2591769078828656,0.6655161352848211,0.4966672099995906,0.2672139595418135,0.28431220182456607,0.8120144151871898,0.9269158588702513,0.44267541245253206,0.8461636199966052,0.29603109894651025,0.5862198614937761,0.8376127363965002,0.5775646043583966,0.32771222081224116,0.8993223943092463,0.6348781013129432,0.842279063242376,0.06805860307738532,0.30372784627856464,0.1473737162747093,0.8024664972724345,0.5992046661314381,0.5012149873087925,0.35722293383668213,0.6705480416695608],"beta":[21.47879223279274,27.510152214586263,25.963814209206827,26.476899460234865,28.942305863350608,17.064824319372992,27.359059998401865,15.143839791401831,13.396511947106085,19.323366441569704,22.045194938641156,19.409769674828578,24.437059352924088,16.749970013750684,12.101830537281476,29.85558228061845,13.637428218357858,22.19956990970292,23.53173046689415,21.89455926941276,10.937126622292812,10.800093057294834,11.309993144740393,21.856829527633646,25.69510095206482,25.98637816888391,22.160435811873263,29.320886480540935,11.15251512972284,20.91198995390574,10.184314993616614,16.745233647789327,23.518200849481353,24.274616020913,10.316203780697052,12.408791210906873,20.717605047881264,14.304972505216128,22.15669589701163,28.552509388831943,18.778668466430076,21.637720265733563,29.425429532613748,29.446890081877672,26.76790088080749,18.75285762865164,14.828259028226789,12.474822887756392,14.075431679501861,15.784935226142501,28.895438357393996,12.60547657641753,20.860117615928743,24.6172040027556,19.59191325633297,11.141449183817995,26.7604471395979,24.801267961431343,28.31224182802671,25.440057767157704,14.035044489402946,29.425184429584125,29.80364764930296,11.220501985593451,29.804509178531223,25.37820279195739,11.098477856628218,23.86765829110447,11.72265848362934,28.360962748659162,27.899984447956328,26.34072636435622,12.086844222178579,19.453568405434098,15.06877270510313,24.992445059504295,23.86719380350556,16.22157065977823,16.691084735405475,19.36974917484944,20.97457900116502,13.480935919913769,28.60268104998056,29.200103979915625,16.04249880467197,19.043292085050403,22.760783036091524,16.900536362991332,21.142441127828544,23.453796268100362,24.874201317266944,27.75388443558058,22.278599363314747,21.608821106542656,23.61918965594395,12.196722210834544,26.64289284176236,15.031732789483506,27.83048181546487,19.28690570657332,28.31278455852776,16.115718542248125,18.71466609407414,21.312019763414675,11.539958230319813,15.497528949766366,16.54978662589198,15.485646867845112,22.726037467983673,22.405479696209575,12.023871855132935,15.355629310122776,22.715939923620137,19.17015952149006,28.85420670081131,27.772303854177753,17.245056768040246,21.575698215156617,24.622456938671256,15.983941379390405,11.969937408853323,28.858935249558286,16.406170827663182,13.96023621557124,13.312857378129465,27.04271691038011,11.515715042995911,28.13123416291805,10.620069774763618,27.28253360830405,23.767040477912147,22.5263565381119,20.98616184897317,14.627244975270393,13.006691405389162,26.955546736089623,23.68846050486087,14.970665753992387,20.074964208615206,15.288931104785615,23.015851112053394,22.805211109645178,27.824387034589076,27.930292069409226,15.002200059152667,13.632952530405076,18.529078438572476,29.395765454314432,17.165436827199628,25.436379024586433,20.809673320043515,12.92602398455099,26.81656056672104,17.752535015789547,23.797359233127256,12.691367871866767,13.51431190220052,20.00481535140784,22.163160724137594,12.858074614928178,18.323795794378203,29.126037916271454,18.6620061959654,24.238557554758337,15.404677161721224,17.786450534234216,27.190065058916847,17.477053384077553,11.95965348605803,25.234982843181648,16.485514893341865,23.629034993082236,14.853096559337473,17.437959756620952,27.556110683484118,22.392817055796034,21.902750484437156,13.370733586545796,16.424164564268654,27.682220162639375,29.76003336357237,29.448406985072065,14.277148689388731,26.924066555639918,17.502151995398883,29.41081975465639,29.716118591965447,21.33072031107254,13.382895805645978,20.450778379556557,25.532591642365375,17.412758184587425,25.354157582971798,20.621122433889102,25.082659636825262,11.598273690619845,11.238128392124533,23.00464769138148,23.363794373846474,27.973992210287317,22.679077753089167,11.588499392941255,17.939092482014875,20.99301416267263,28.983145355415033,19.660343373697344,16.13082669238338,20.115636662570843,28.07942182409073,16.699712271746485,28.20421154815093,18.742505467532112,13.072056941691645,15.846045983263588,16.55578631336177,11.087892723284982,11.259536191016725,19.163939334577357,23.47636619668085,26.964833181586943,12.033613742100506,17.217322581561273,28.199115421381524,25.220959511068894,26.705470836853312,16.93927129833986,17.814662775653822,10.270568030240796,18.568511345332936,17.561665765750295,22.49191226994002,11.586177450541136,23.76449828697769,27.63762263058501,16.67833888494506,11.014775235921249,16.21260486662952,28.786734400652406,27.460061890007218,13.921316620924271,25.34833981507166,20.844260207501335,16.271578579652832,19.330292218054677,21.478475544245402,12.520696972954122,14.384095691555823,12.773936928047384,20.939646946274276,13.984808798173898,15.842637342407041,15.37542148574845,18.52437310806042,28.426712029943406,26.042026188391443,20.18401508448312,20.033778991692408,12.703978615150309,11.495210736133021,28.807448195254754,16.933678964471547,20.22110082649084,14.57858176104471,22.15285598355667,21.40795348114336,25.806860350194817,29.826071505384782,10.757009630930433,10.610691360195172,19.049815413065303,11.225947258663712,22.925291439814714,19.725722300171622,27.999467760945915,10.682000081068356,16.91013366975598,25.91579276346711,15.429549998128005,19.783535106011815,24.795219823735202,19.91222035303172,26.985484653976528,29.23184461581642,28.405404467845557,27.332652672761984,22.374769997183957,11.377809972505094,18.464969865506745,11.37368805546014,19.285213780871146,28.334811260503887,11.669629096615477,14.275908919952451,18.5315210249215,13.202749108526985,28.67874967450235,25.856840370153257,27.31656895244328,11.626510554104783,12.785851207293577,26.834548059467515,14.79866595067914,16.839994871211907,29.29541541837171,19.17772542611158,22.984627946329287,21.07575759189492,18.170277637253175,19.78468908339291,18.969897287872275,22.3233941203236,13.57628724548341,29.55335461372437,24.014640555194887,27.423541394976844,12.289666747366814,19.90504742718096,25.3539706966159,20.511486602352242,10.154158261199928,15.548181985588517,22.475596207240315,18.859233805414817,13.23976498404865,16.337803530934497,25.425521547714013,15.806064373366976,26.011963036998488,22.61193038223634,22.21249980566743,27.32568868339837,22.556529308055254,25.34664657920645,20.25475136758533,22.58047541189628,26.77915499732564,24.96574650251418,19.790099471618944,12.83600084865785,14.43882227516037,18.606950165453956,13.780949972226097,18.799022055302625,13.108241538281424,17.340185362087897,22.884207999805465,14.702180829351693,17.84311098439034,12.84055544125128,12.128911666878256,20.15018117808794,15.56249106537793,19.032626762399175,20.65572566166114,24.48907676040024,28.329802535589973,29.5735654007245,10.28937504506921,13.360958578706752,29.865915293411284,21.763765668977353,26.301993413511457,27.699278894721576,14.362805361203721,21.628740609549943,13.75371714881604,11.034453803727263,23.538605854536584,26.076385084543077,15.645273888764958,16.569306483640382,12.7118822117406,11.79531963390894,12.08657209582405,21.10510992191722,18.61893875697262,14.424419979024737,21.85193356349408,13.837368582752196,19.01610547163626,28.19249300097734,24.421749363804427,29.200049673661532,13.216548520830461,27.999176359471146,25.501713902844052,29.056656977790425,26.660480588555927,24.43122158142694,20.756363113486806,27.662719146204196,16.49354046625149,23.669973731896707,11.544948762120244,19.887023436200394,12.285055242005892,26.833876103136816,28.338202482907985,29.586132161145976,10.009808238659206,16.074872424180096,19.11089689818866,26.327404998160272,20.383426296592745,14.46562966233962,24.034436844463162,29.391213844768764,18.528975109752626,15.232428905193425,28.309845606811525,20.52629720725292,14.160757189010491,11.02853697535917,27.782230355310094,16.175746546196915,15.083451083040691,11.398634193861415,19.837462512118623,29.265895822590558,23.236192111032157,24.698897410981967,24.563823775781223,12.09494168457756,15.991120085018355,16.274360125648812,13.519550477456264,10.869819773121003,21.552771428281368,10.544111008953925,18.294489130558294,15.364119025607273,16.724819081023607,24.49450031496439,19.760408538734858,27.94145411144467,10.710133067356708,23.49903409004153,18.864301292902248,29.061421864274468,16.929333136950998,21.298183306804745,10.65085085078772,24.33718195589828,25.67015096619774,10.191568155472561,24.3806403535202,24.734222353760803,10.703493739478933,23.825797045556723,29.126455462927314,29.293530786838637,26.440666848215034,16.813648089809696,15.987846456786844,27.06663331325837,21.115660032734862,10.26035423566836,11.674749025529483,15.542028202131984,23.078149239870967,26.629418262125,28.27224813798072,27.15238767522335,12.15229364155261,12.44126177557943,23.617643166555894,17.226617482449086,28.700257317031056,12.692512332958747,15.462606115947771,11.798142765419852,24.343124775552187,26.520242407933292,18.918625281926698,13.573509578292224,25.73745849892349,11.983241610514405,24.2641161727957,10.719801183130194,18.159362823594677,21.939165801119888,16.04278425364308,20.737050294677108,25.850409120165523,16.79286470543563,11.73833685701668,17.86789287230298,24.093212873286255,28.04196164646499,26.188237997920595,29.27651737907421,14.465112480957018,25.231998582455034,21.34330160347755,19.50018373567655,28.088366036874408,27.84664446534466,25.524376707703635,16.35220226891831,20.22173630806758,27.619718775075658,13.222106998333047,29.71772243334042,27.88922625607581,26.744518737474515,11.02965678045296,26.31828904106427,18.945475012833608,28.379189904060258,15.281256198246833,22.467670284847188,24.03419204625655,16.768092964699015,26.798070053065967,10.201763117462924,19.404331903024424,26.849672867200056,22.920548367380302,24.01422541932901,21.136959503796376,23.51530030199139,13.23966953905436,18.42982460760346,19.907387862942425,10.78549691495744,21.84634907512055,21.291420960609777,24.917449044135843,18.43231074245044,21.55662201476553,10.734725875059468,28.882563042583662,25.19947603462927,11.670600332267473,14.560676647406176,26.98562980601656,18.01211087643456,12.46315387177193,11.759553711832126,15.071142469323027,10.333627319922897,29.208460083170493,11.748019350646377,10.987577281316243,12.160072767924435,20.66392994513432,10.672250140765541,11.55433777367952,14.662671505180525,11.096623882604248,13.187066080241912,19.132076758961073,16.79272005691778,18.389904991133864,13.254791893648136,26.122010831128403,12.891729513182973,27.587907968427206,23.584724982244815,21.387805016169192,10.165737307567873,25.627854990260456,29.45670397899379,10.578694256151824,29.835423177273817,16.274239823909635,16.875714503352715,25.681609618195907,14.124361576305237,20.863045755027425,16.35158078399848,19.917354440738755,19.689585100020324,28.78651199320705,29.466546503901437,11.58900689962226,12.28316793129041,17.902648718979943,26.24851586487909,27.909212197577528,24.742859076911593,13.88750369678088,13.197052869872117,29.23533700576118,11.390013116827301,20.28394193911328,10.619471637621709,24.076516134553838,23.536703229362388,24.778093303393867,19.91676051292115,28.40209545409853,23.385743775767658,21.34761045482856,12.172993010692927,20.791145423688246,25.416855623590536,15.980720778956385,20.515476921701882,16.7869324046738,23.948033060899085,24.953185298342937,12.318104249573842,14.169053012038034,14.924818853094624,11.913804887724107,13.48535731468544,16.51342804645198,18.893665698462762,26.752943292352732,15.97625180294819,29.710842490637035,28.39854559133629,18.53441660605313,11.376210270860629,12.506429560441799,16.819997739485736,21.509353685852478,29.756491541785262,27.33144140449341,11.539156981813345,11.90960079946838,29.36216490305992,28.850174754377083,20.797831374637433,11.123700317803124,26.55805355053456,19.869185237736325,12.403294620873409,14.994149219604092,24.966178035127985,11.060934972022194,13.146894741603091,11.410411199288024,26.99014434109322,13.677265986291452,24.37191159641089,21.751519135801466,14.462036034973625,13.704524002479776,29.45372600151575,28.99384565442165,27.825747118713448,24.69995881478381,28.84872973901559,25.764078509352068,12.625033727097694,15.772572973926572,21.595465117479034,28.803046968054105,18.76188747730282,12.034764809315085,25.723090704840107,17.32734846083797,27.463667671507007,28.759925415721565,27.266173151958423,24.36766822508713,23.764173338588385,22.26189158139812,18.64499858102117,11.25789476684723,26.133789541845406,17.52022380020616,26.22428612144129,17.660407837326222,12.211609246207132,25.29427366695431,16.739098653186034,17.54769915651665,13.182146434401378,18.991973488161435,28.88265552794558,23.90196706674478,29.00821993073376,18.38698595555288,21.506169455598144,20.857585343566633,20.56567369368456,28.7192193050509,11.479024573297325,18.71173426736838,17.985701153372776,10.317877972179392,16.16403548680362,20.82806575163697,19.328986630525222,18.8522519491174,27.373204485959167,29.360698309372346,26.72616453857282,12.935666599273894,12.580326407880701,29.117534969028863,16.41328866658451,26.58184678200653,21.82771012525788,14.035595777812864,29.21148470915691,26.225676308716096,26.44969923386018,18.143714440514124,24.748760068772725,17.9829220735689,27.643416526816154,23.215970474152776,10.306689966713893,21.341162307854642,22.90977074876325,13.329769266818424,22.186465118717386,28.84786513573591,20.66512928432158,11.515022439707781,13.916344708107427,10.712797969142432,12.830645574028274,19.447665231220128,15.46276221889364,15.340397504130436,15.6284212689051,13.66262132444497,17.626422010020608,15.759739463340953,21.81615733920058,13.20804395432766,22.812431976991448,12.83115124373673,11.686532107382677,26.825421593247135,27.935588968542888,18.750585640802612,27.70319421249087,23.02896938911626,21.735346448149357,28.781058048381986,21.795300175750874,28.271888508282572,16.469874243591697,11.7278327303103,19.646438820898663,12.606641230906423,13.945837202143409,26.86572321776193,12.771595917012139,17.12016985930907,12.877276949282948,29.473634215023825,24.52865159962226,22.430815675279053,17.32772193334199,12.431121517513063,20.279728324151698,13.370426760815292,23.957682106448992,11.923845008201045,20.621492188512036,21.168005956288027,11.84489792051119,15.175486877296516,11.355083923516869,16.390111014019332,12.731794106319828,21.27911482522563,25.088157578537952,13.020451035638182,16.742117228838215,22.017742101582026,20.113829861089147,11.053303529431684,21.69156981067987,10.844811264969785,19.988207933606237,26.092198293388478,16.214126748307635,25.07878458688662,17.8083469168816,25.923513252049055,12.542593441156825,27.886196028988937,25.27818806301722,21.442800251785137,16.52478362653998,17.994209248355745,26.041660351013526,12.198797037988278,27.452548056814543,27.5693805185821,20.90067297326312,25.156265333929717,17.264195150485993,15.469142258363968,21.01085640397457,26.750145830275184,21.352077735550097,15.08230198865987,11.227131894904193,25.832873421054607,13.20236872667165,17.869875964645914,24.927880301176522,14.307283842533426,10.3166884706479,18.99901930759009,12.307896124875164,18.35891384990306,12.454394396658856,10.291240860180233,20.58298346420239,26.496268987349758,14.05764405877357,19.40146269811151,26.199882263365822,27.820693599486077,11.74453223636084,27.714790689727554,21.774554665760117,15.732698793010282,17.093666359420446,29.472245556569145,27.52866428837564,28.151472450784638,17.352687708528144,26.216413131633814,19.510621143273873,24.79514825548518,29.155228953707947,22.83891550000169,29.776676579030333,19.71623144376914,24.88276096372301,24.8250565258761,11.472370218445548,16.602796592713535,25.221079789766666,28.019307368685745,22.126068438395535,28.94050747777056,15.098305302008859,10.18941437696335,15.610636668219936,23.871019759680166,18.502574015933963,12.454597643300303,26.718298951150846,11.991625155710995,21.31644303780822,19.153249913703053,28.86274528288734,28.954651082163494,22.98374124131123,17.42373911884568,27.170353055174576,24.40556176840744,11.059056630033517,21.215488805248974,22.782290368480176,27.480801473476525,17.785809995358747,20.28443006692497,15.899847424937953,15.649102906949057,28.334915306738925,14.746936782778999,26.86203423035353,10.750346375427906,11.68265538855838,22.340501891570774,25.97056838391785,19.03398626308436,12.683390496479312,13.84332138195723,26.262185380765757,27.7566368643075,13.550605027750496,17.798630839724417,14.289148333514344,21.275841178738734,13.136114422128307,17.664328096002002,19.69836263868944,14.721216548069332,19.13758392598291,13.106150937239454,27.942090096122957,18.05680502210063,10.603885731774394,19.44089266212915,12.954187841204847,14.872671554804393,27.35277866677926,15.18045574040264,22.863895358774315,24.4975506798769,25.044575379300408,10.92808598194356,25.168207783610814,13.192054102147868,24.93501729359398,23.73102234824668,27.07054926288071,25.046333411655567,18.276468674628784,20.612392870336386,16.21792387811769,11.12165645489656,18.74920655230867,22.159578389703878,27.30337371948572,14.760625128602648,29.59786330152898,17.856294908587333,13.178294843672766,25.051488761541894,15.064020832996272,18.912876601121184,10.451476137623747,14.127324104175338,22.015972495144396,26.623766768033015,21.87121947087032,23.497290270156526,18.351346552886287,15.947477898210982,28.61898206026092,18.71452539219098,28.201436484400666,19.08928736206361,10.600795052536998,21.18234893489172,11.920295283300275,18.643820698225824,11.189694759561807,22.258328307744655,27.00462969464811,16.48126131986921,26.810082277321765,29.538975932244924,29.29158616250975,22.91823812116519,25.26108751151298,15.782623059718635,27.61622269241321,19.914816325032255,15.342294117171766,24.20859946436565,23.07309870751469,16.37756433528734,19.372164787247122,15.108597478405791,20.633820474388116,22.84622223285826,13.34835403471645,10.389062389253013,18.199344351711986,13.465677494050778,28.888330636123882,13.197659112497163,19.726479465305665,18.44919382406088,13.743229908568427,15.140735027973955,10.18538469723326,12.028271967055524,15.618171665550902,27.696940741949852,27.125520705367506,17.99306320410878,16.333811255581526,13.279291797247312,24.00063791263552,13.639929857305958,11.382596759613532,27.850671390162205,15.076418192358986,16.611473773840274,20.171386318960153,12.295174905208173,29.711956256000395,29.041511036539784,12.210909656144713,19.06588170505046,20.225892491109004,19.16773414274197,25.57948596996485,19.400764629150213,27.32178356036424,16.580434776398334,22.44613921539881,15.93436297220741,15.893252781949268,11.500351926860791,21.86772596223358,20.03795957829526,19.855105840633158,14.78422081210233,24.270385798391047,13.683453000832294,28.976625991900576,13.432761810865452]}
},{}],23:[function(require,module,exports){
module.exports={"expected":[-37.21009262591954,-17.978506636971012,-0.7069942734822412,-35.026213253596744,-13.496737250972874,2.3225718058789075,-26.625246153354112,-5.0462539176213586,-1.5507278271117975,0.23189517821034178,1.3296950871027347,1.2315315254295336,-46.53151767395913,-1.092243908300396,-9.671898139385364,-44.36384032347435,-2.343984139848104,-8.303958787935212,-31.137458229231882,-4.573189736540292,-0.8343790040222214,-7.041349744172738,-20.524653098017406,-30.524056754278604,-1.2326976416016677,-4.3343278697173275,0.9341844384162576,-57.07502493657183,-22.87552067636398,-27.303094731788907,-0.23164515875247593,1.371411600065633,-16.955288779042217,-2.7167077534055286,0.3805894109598178,-15.090653870785388,-2.6729517191572074,-2.4986558584016163,-2.6089223032070805,1.308591926710169,-24.623591753515306,-21.02658971423802,-9.0612276470307,1.351212018829298,-5.914323143617724,-15.363722188500144,1.3533627884747983,0.8622481730385725,1.1440966148260618,-3.426149598353062,1.0818758751246258,-26.666209151929497,-0.5152438282880243,0.8611056638055885,-3.8490556800896583,-9.582595865982283,1.2049316810891517,-8.090496244613565,-2.6928040307969394,-20.409558633145913,-9.182538537194299,-18.184101863086205,-14.863227407070971,-7.935929236424791,-0.030387256869619073,-0.3952689353996153,1.015292537378266,0.2633374244703579,1.3838873739688793,-57.808104879250216,1.8965465616326558,-11.180904006758368,1.2911555270834243,-25.22122246067761,-21.613808477448103,-14.86825240067917,-26.91334488636875,1.5016171970819019,-0.018074032183700073,-0.19778713401919124,1.4962380403318916,-15.869534752183181,-20.512688557613856,-9.623738312144589,-2.4591226678953073,1.3083659892547648,1.2716995562163582,-1.6536476458231144,-25.944637540001157,-1.8938176663733381,-6.1063693919027715,-15.937012108415239,-0.019508000217095756,1.4776588989256305,1.5750379615251076,-51.96372629627283,-20.236443608603345,1.2610205193825244,0.5437117109271292,-26.531803679419728,-0.40704764450951636,-3.996827958527601,-1.8446265795430965,-1.6007636589844374,1.7800744949457652,-40.70192146588317,-0.4391101818856087,1.2315233209377217,0.11748690071437284,-5.82706430253098,-1.1972585044643704,0.5556390587895637,0.9958002619061324,-21.03585793785642,-10.140217156721334,-8.895791037021123,1.2692438387785472,1.399621758496911,-15.094318188986446,0.7115033366530263,-2.729579686600061,-0.8399986592881876,-6.894586991862591,-2.403380596477221,-18.023820924206703,0.726622798708318,-3.8089598598889642,-2.2099785043147313,-0.5871011552757643,-2.971089131734333,-6.3519063834768215,-1.5041321148659157,-29.689805389152692,-3.5249536032303856,-3.2388813738928808,-35.72894745565614,-1.74001429182769,-31.902071996836813,-9.029813666864305,-37.23961099410789,1.369535028819473,-43.57714103104307,-13.060895229282647,-12.148771847972714,-8.247507655191997,-0.3624075704823668,0.8149702986379466,-7.512081857894836,1.1434643319588313,1.0686780513369443,1.194805517865353,0.5204715452945972,-48.11394268957608,1.3397991070903332,-20.933468926089674,-17.218845999168444,0.5393706971071861,1.620793809712052,-10.41075172167534,-0.920392997035401,0.8844614575667602,1.249995851689714,1.3241921207616965,-13.49888638424541,-6.039681202671009,-15.388685339387326,-6.463829269752905,1.0314223266254352,-3.975451283236225,-49.2538838014353,1.4523923962468794,-37.206101548172725,-4.852648296499987,1.2570280952719668,-0.23185259917825807,1.6874697460199422,1.1319414741842735,0.7614993548705473,0.22294919025112936,-1.4434713738714624,-0.7631092229232763,-4.322033832730965,-28.236776804892877,-2.575928764015118,1.2840474637582737,-11.709901969666445,1.145090781983653,-2.4447408137309785,-3.152529832005145,-0.7913220851621192,1.2549912191561523,-11.591827631813478,-12.774448412711212,-2.7459751533904027,-8.752428240036776,-7.807226669956263,0.9225109248400085,-8.487376068080128,-0.6092205169887972,-13.167507895665553,-1.1795523098948681,0.7289098182596478,-0.643250673449951,-3.8542008348927257,-10.839832542319458,-25.516231445937947,1.5135343066120934,-0.36975920339021373,-7.806112974684199,0.7012732480278792,-0.8316782815003796,-4.29616957236491,-0.6293670733655303,-0.6994173403061126,-14.020832302155881,-0.679855297150135,-4.985921348753142,-4.56186535042361,-4.896658128555128,1.124748782292941,-21.176206033038174,-16.555161286717862,-4.336961367015334,-9.845776541475834,-3.719757888140302,-9.09729666727563,-0.6918088422028998,0.11735403219259988,1.2738137491443626,-2.513166626209419,-3.430598323781132,-13.600970032475646,-4.086856679372646,1.2122121325952453,-2.5406844673339526,1.5404492118086506,-2.064171317198504,1.3462857328889133,-7.098603058798086,1.208470630711429,-3.6447043984816627,-40.347938988584716,-8.477417809327777,0.036049062424814426,-15.264881850237662,-0.713646513751379,-0.3073340655341332,1.4712054748223136,1.1234344387322106,-38.58694367700763,-8.271491044356338,0.24060112395291222,-3.2538088832589223,-3.3205686069361096,0.47387617109182,-8.3081664699778,-2.2140548458796294,-16.266776535057264,-6.428143663433221,-2.002099955257948,-37.267128592798095,-26.29518109211987,-9.188234579148023,-14.426169246890561,-27.684757409751626,-9.124631161279279,1.6219159599216324,-70.70343508146966,-2.431779591416037,-1.7510538073128838,-3.3417347176792997,-21.14897509955637,-88.4993784959002,0.3312815849595516,-0.7977202788002842,-38.56277983377694,-1.685049020879298,-4.8304174932900334,-50.797324486724044,0.33733440421170036,-27.681138739112974,0.26709023739048066,-20.749798745060758,-22.915098467851607,1.4269352810357305,1.1684197369790823,-11.971053324987679,-0.04895242236502817,1.1351758606007274,-16.59821958007643,-32.77487282201618,-30.10917043904142,-7.510298413724321,-5.760629596285403,0.48420592024182074,1.2281376884384145,2.86798751712946,-0.3237141918515123,-4.027249142796131,-17.973092234596965,1.5331225369136015,-28.089277860901237,-0.33072369795193124,-9.271291395620967,-44.88110265167847,-30.96571113979123,-12.789852511044025,-3.020265093283021,-2.228703220229517,-30.34207297995694,-22.314716856704155,-9.700803744634621,-0.7135389676639283,2.02575280469131,1.2633111077541792,0.9445214172456435,0.7415267747394898,-6.579271410126009,-3.5762062187991264,1.1532709910805772,-20.99893492237149,1.2190498678445167,-4.264691607725416,-14.7537694491972,1.024173045850456,-13.240886994046917,-14.820837830690353,-1.26986191551208,1.331012549421182,-35.763202292038336,1.4809063491043417,-11.66063826830256,-0.6784537355367704,-0.06366316561966556,-13.705439009040965,0.46348084722561245,-18.66503114191237,1.4950216693569138,-20.817196161430033,0.911132894567035,-14.102520176073055,-15.861234461129202,-58.5950640482554,-2.8979874845805984,-0.7499726967679843,-8.348619131361188,-15.059233363802567,-1.2371699341964923,-12.965139287972749,0.2459762214876413,-0.36323867786744435,-34.54061265391479,-1.4141431709369665,-16.083575295466105,-2.475970738231593,-1.2318696552646058,-0.8591362698112772,-6.878016074905997,1.2639650158096851,-3.1591742164757344,-1.4437170887263755,1.0715895564859537,0.2541407040005521,-2.5502854489897095,-77.84992634330813,0.5871483685547987,-1.2728501586373207,-10.747446333931212,-15.515509436777254,-33.231127127838874,1.5118287657016554,-10.962280757051353,-63.76295676118751,-22.490698141927304,0.775673679305704,-9.097584502758705,-1.8501498742150986,1.5736122643370551,-58.81032815235848,1.2197522123752615,-11.535712475370481,1.6327896294789421,-7.753295672801478,-9.853016873126272,-4.402735183519109,1.3094557734498382,-0.8818534576217458,-31.28840865547543,-0.5191004914452089,1.0885539211026367,-2.545528856154834,0.647894526070155,-3.5235362060980657,-4.16306492067428,-8.348385710037892,-5.430614451818846,-1.17009919331616,-1.122284070107487,-9.123210372382548,-9.994817551999905,0.32817901196594335,-11.551880826922762,-3.678294269122923,1.6036929400982833,-8.723532221918688,-20.90899081615952,0.4332403624865284,-2.6820285121306733,-16.21404906366224,-2.836097578257439,-11.662863096611366,-15.49799819016744,-18.228092801139113,-7.02688880962261,-11.888564748018464,1.268838277818914,0.8209520446491134,-17.199160834149367,1.302437838954772,1.055642165174838,-19.28083016944918,1.157115235248272,-15.85328302823866,0.417297732154688,-43.085360993649694,-5.351873520678046,-3.1507499415265436,0.35913092107765676,-25.220977413903363,1.733553827022478,1.1948386583260937,0.48190233978062524,-7.008623795907426,-3.8054308575608737,-12.298035220581882,-20.880728782028985,1.2880987327907578,-23.401955310640325,-44.015770773387395,-10.212735679941865,-2.341856341331512,1.4605172522335126,-8.675977474389914,-19.054329847696508,-10.892996537402619,-2.97920294959129,-1.0262626225873954,1.6945423564269935,-1.3255398977548092,-1.4095371232848515,-1.6404266683116902,-1.0570055030489676,-7.406390964593138,-1.55837557188479,-34.197502753403434,0.3905436116122054,1.0553877181012163,-22.638370453178215,-6.56572344748304,1.4807264628842869,-3.4183801799380156,-1.1135061221203242,-18.359518558864437,-10.844597398987991,-2.656468228468169,-15.221966235665118,0.3335591123467987,1.0100023488820031,1.2770467790072426,-13.025413117094715,-42.87437011719523,-6.420620665393008,-12.454832447642373,-0.33919418793701706,-29.850179330589718,1.2536298017518963,-9.975215714120717,-6.927075794147742,-2.25776263777615,-18.704685259115934,0.8105080142384016,-6.214698885186362,-15.770082617013049,-17.327716991028872,1.233530226748135,1.542931090491316,-0.1877374716304856,0.5054169227714875,-4.815835344952733,-20.622739564727304,-24.58117786143004,-8.779187286171217,-9.465126934256627,-0.5781264712016951,-0.4487410122460407,-25.56649234973782,-18.049624629317098,-28.68542716510331,-0.6269819245153188,-46.64503462289966,1.4004622664513113,-1.7705009156659761,1.440446326240743,-17.78422639301714,1.0805812516285784,-6.616507613658113,-11.59864807240243,-1.9015574576519816,0.9853909002901808,-2.4096706403941335,-6.524263110071191,0.8656414132416739,-9.377370665449412,1.2369379455853038,-4.156969177499043,-10.31105663469946,0.3500237221840061,-7.843129421521677,-2.283292682970485,0.0026619883695899738,-10.717257541040622,1.8163308656282517,0.6489686239633916,-21.91171747105399,-0.3532380700893061,-6.668456791861589,-5.1990295098527,-1.7397765273717107,-10.15706183897853,0.13751725786101288,1.3857876060827916,-3.1941375532698575,-12.585248379827249,1.3691355291669798,1.3206752598540699,-20.376445249134708,-7.7824952514640655,-12.8328837051565,-2.787927636733416,-16.077253171659297,-15.288148093280162,-26.854783881942595,0.196766130767835,-0.02165493950467523,-1.6077381478278863,1.0167018952006988,0.9180969558690468,-10.045477511609326,-6.042538171976112,-3.2233432279147323,-2.0616347612278485,0.4744543435552142,-60.673346559747394,-10.726215004376675,1.144248228458617,-7.597570263971515,-26.71671392181735,-9.415663957376506,-2.796809305195848,-20.202479330424076,-20.231191629603497,-5.2677188335772165,-0.3284754760930775,0.9297019918390188,1.1208079399779922,-2.9346336583617023,-1.7774650344106235,1.3940110326479085,-5.201521157509263,1.391891847336242,-4.213859757652916,-15.377126427041567,-16.295292609525003,1.4328218121029783,0.29629505949094925,1.2822842370647771,-12.800201822747862,-22.0077674248582,-2.090120999187887,1.4159701757862586,1.3296005380102456,0.9357224408600766,0.07786355914970322,0.8529252114374475,1.1664204125574111,-4.278312904949512,-1.1193835845859517,0.9827367072120896,1.642431435313438,-16.538171461451693,1.833433125587264,1.2989247533041723,1.4671531838154377,-5.793412068613683,-9.81202072011703,-35.64593129572437,-8.65749990276728,-26.017451749062367,1.1070788479978364,1.3565841232167344,1.9486357784721116,-3.753212243433165,-25.29471560652574,-14.131940670290593,-10.013652180266229,-2.197718524906368,1.1750535429029423,1.8261246484178235,-9.970965535846847,-1.7395640687558727,-11.714439620507601,-11.057240329696608,-13.277816344061044,-22.311696653151436,1.4184036760489327,-18.6796430724534,-4.084596577121877,-8.680992246959788,-20.392298415230023,0.6100158699227602,1.3199957354509086,1.2744368960321644,-2.301396941862214,-3.764724214767969,-1.1436477322013952,-23.081502604957706,-25.664588875014353,-1.801754545204644,1.3492643349053022,1.2006843802326679,-23.231079608792232,-2.4028536877071156,-3.5816654150151597,-0.45843391079558593,0.9421576279469761,-23.146971130414208,-9.702064510477879,-30.370439463565358,0.9779380687120014,-4.4310811341645895,-24.204932331972174,-0.8115898695373653,-36.85940982710711,-28.07394243229698,-42.5982291268391,0.36370723201507005,-65.48393975697276,-15.838404460528254,-9.589663033096484,-6.040558101768631,-2.3898432385886417,1.441129814357345,1.4831784899427491,-0.45358110987469846,-1.3558645367009445,0.5428758057442575,1.549291304947575,1.609134899133726,-13.501122237006477,-5.353557658391026,0.8578746899323044,-9.22495146682554,-4.930447130468499,-41.295777849379036,0.4934920051019147,0.7127053753850512,-7.8190287321121,-50.55163351071553,1.2497901359022645,-21.561734780201476,-1.3206765170422177,-4.144455794983735,-19.23207798750161,-1.2052392335153232,-5.092333282232417,-1.464980490634189,-29.613472486102424,-4.345560105671576,-5.257386977524006,-2.9432754347496495,-0.15977839190558418,-1.0781331394047848,-1.3428054298180814,-0.0013179955259259302,-23.479064868685228,-1.0195127182797408,-5.040253317692555,-16.065187300017143,-1.1242431981239767,1.1923790842636783,-51.575096026560736,-0.6014619313586942,-5.047948152093209,-12.64612819724625,-13.20943516501826,0.9806677288009431,-7.1474172685266915,-12.124578632797926,1.6994287122256777,-3.091226991811077,-14.444913419458798,-1.0129559744456844,-0.7268191166777864,0.5400048010371803,-4.474349233242133,1.3739530210793114,-12.327293244141885,-5.23444569152009,-26.020577916977746,0.07544679555888045,-30.25548281765322,1.183506933224972,-0.5501378364885632,-0.8150819577457322,-12.812657180331513,-24.527867720140513,-40.8070971072185,1.338811980579134,-25.175938328536514,1.2188983283646948,-13.857588223215183,-11.112920956932886,-27.2049968340776,-22.435514848040423,-10.199286464860531,0.534372831298946,-5.901933544138651,1.0025751254540571,-10.272862130444489,0.5177851658551642,-0.32461897376587645,1.4426212721525449,1.0345552735661456,-2.8862427166589786,1.623097117073855,1.717480225087035,-16.9340945562498,0.8270544888909224,-7.393132363629158,0.3777545630956056,-8.746326478015677,-19.237344525653267,-11.561741076992307,-66.75341007334367,-0.5994768157495556,0.18275556755994016,-5.737805480512144,-23.466343002498117,1.4169203938724841,-4.116613503936839,-15.53027872208871,-0.2696223536857607,-2.047266278507672,-10.328644107468525,0.06902172666495376,-5.681361909768356,1.274444337451738,0.9809711708179649,-12.763542717181455,-0.03155020858035851,0.2715492903594958,-0.9950328750254709,-0.2383056651579687,-2.9919564746213636,-0.050926659186259826,-36.632843099367726,0.07340017247344566,-1.9490937855408954,-77.56072171698675,0.4288900970928604,-13.503358050381934,-5.3019142736781415,1.3004419468465434,-7.9582450365832536,-54.38899383832682,-4.062836083253837,0.09787728969432408,-11.452759874848871,-11.847238560428472,-6.0875710144317505,0.8236544632241625,1.5096983351574464,-12.503618028319615,-1.6173603616195256,-0.19111618928378515,-21.2139516266499,-25.82781586249519,-14.948139876367188,-18.022364102850855,0.47302810126895034,0.5752050475148023,-19.17018176307109,-6.188998523836071,-1.2355788036133628,1.0970281383883167,-6.962344588500624,1.172744891820984,-60.33114616994499,-22.47174315037775,-7.597547550544472,0.8064618007002857,-0.5564238973833913,-67.17526251854919,-13.790963732662066,-0.6429181338683172,-7.363290400885459,-3.7200391827652224,-2.1059733273306334,-2.293077882736025,0.8205718164150171,0.537909377672741,-2.650887282761772,-23.1900507560991,-8.925183376206487,-2.0727857065186006,1.5158298779759316,1.1103220029772198,-3.7028174913762637,-7.994697743731882,-4.376016005592701,-13.737600511967116,-0.433596302170443,1.355414480552672,-4.828142055177055,-0.5476801160163518,-8.508674722924308,-6.293305427343964,-12.504327476662223,-0.06499245850646185,-9.358842154823575,0.5363779794376042,-1.5720412040862888,-29.719516179879115,-27.181312779414874,1.5033438704318005,-3.527762732581911,1.8697741123892888,0.8277287410987912,0.34985375846856037,1.9842833566406506,-4.245993213148097,0.7668737011711468,1.0435120213363134,1.2163474171267112,0.1081803406511832,-24.290255729566468,-2.2917246370073143,-39.9101981218806,0.19587656964246136,1.3095715746004137,-3.6718124249863395,-2.4034323801354325,-2.4994078906472508,-0.5725221061598202,1.5642974127033702,1.462608545725501,-2.049697164483131,-14.856580179611942,-2.2509464027622004,-0.5887054928172386,-1.6152732893689867,0.5943167619198317,-0.20887913655305423,-12.9181684957128,-0.4078111267203264,-28.603600757011012,1.2807259997791127,-0.8861831714719344,0.6527503117323148,0.6916245534817427,-5.51828954090044,-32.14942142744846,-5.212766376607242,-5.0446126063579975,-8.767583813008045,-0.6864560691888215,-29.73034325288161,0.3400221076746437,0.8021269797310717,-1.7795215601612178,-15.797651579282576,-14.395838976755234,-0.9954863048488001,-21.824942019921348,-1.4831108718102493,-41.52956930732923,-4.332611344766065,0.04780042296409803,-3.6874665717554063,2.632615025651756,-18.766197093558272,-25.603385724765634,-7.942139262466491,-1.981289115484588,0.37797913574580333,-25.19790247986764,-19.948477806338207,-30.672599292566524,-31.904963694696935,-4.6193428464788395,-0.8447563325299514,0.9628251669933494,-2.8640430629201865,-0.9044664600287913,0.15877418128784448,-0.18588925239612886,-17.15534890240251,-3.224411781211791,1.122174954109775,-1.0719670153221919,0.027017718892942355,0.7163385365944714,-0.15703003324168385,0.45991591569914014,-3.867961349711041,1.0219233408036628,-1.4389343662410923,-4.331738802639572,0.8804315564449527,-1.0950989110461347,-4.314350700912427,1.0893441294463877,-1.5529776052669055,0.8859015283168739,-1.2544739546630943,1.1382947033286244,-29.882304476283597,-1.7237991997291746,0.6254620773382635,-3.3891117361032754,-3.0820508821903965,-4.921188440506797,0.27621712646762714,-14.668566785871825,-20.565242186477274,-0.841475697333856,0.16353623320476185,-0.19759470246896838,1.2661950898016023,-10.74774078833802,1.3453884943865784,-0.8740323219011588,-1.5750999075143302,-7.406315681022875,0.8243502823196813,-64.65743156515057,-6.761409118752836,-3.5646310242731443,1.1093435464626942,-1.517502365544602,0.7215680462032523,-4.2234798820823105,-1.4436393049850356,-17.675894009411955,-17.541342500484607,0.2434897956491171,-16.914456890125333,1.4275233690100582,-8.894756817917683,-21.879604682366526,-8.356552897731188,-1.9532164997627686,1.213487617903269,0.07760772210017697,0.9177961171939866,0.8881191218414126,-2.3753240868846683,-3.233851388578236,-3.104393228859416,-19.73329542314785,1.3989907219369506,-1.8894744753188037,1.0475425809074994,1.243052118105445,0.7289025547616483,0.9667032846985388,0.6898093712490851,-2.0313428084585192,-7.8212140903366265,2.5661602603692537,-1.556659892889947,-1.6999813964898642,1.5135923917995189,-5.803803448915076,-3.188238826551885,-7.516336583697909,2.3822098393590068,1.3753304107236988,0.9814639679598827,-1.7696731058292539,-35.27781022104526,-17.183149284262868,1.135297202030535,-5.077698566025122,-15.495094495957822,-19.886201783085973,-52.79741323690924,0.8845814532504108,-9.256226246612327,1.2690796042909476],"alpha":[16.245899863289182,13.614267224512933,16.247323366944652,18.764329403055495,18.22364998191995,19.56245877736947,18.9482125986124,12.68402611512792,16.85998260632485,10.26430972495705,15.82433757136776,11.221171614701369,17.61506531347456,14.85577825352171,17.221417460118953,13.369851446961025,17.675122508694013,10.938641157373752,17.1908912278001,14.277311023180788,10.76338098401056,14.714458734150735,17.220110131769108,15.889751724240288,16.52728020137459,18.252922772072715,15.919176168968189,14.562888122263303,13.72765087962449,13.921579217953354,17.168567248746434,15.171817686564735,15.882787048833645,17.89389565225074,19.356906905187962,13.1127437747885,18.5892405910815,15.962281160670365,18.108591047302276,13.583493494430721,14.858924679321904,10.152672941171277,17.02924672023048,19.990723999402515,11.320745985086628,18.751038891365333,13.751426225278905,15.891182938764693,10.377751654789636,11.532053774858062,10.542490518405991,11.862559131724531,12.009742529388962,15.38927746040059,18.84112808820813,16.11832902155879,10.556117317445839,10.844041917266889,19.734519649739823,14.849227696921002,12.786805730174105,16.415663848738944,11.71448405873635,10.91604384665281,12.228280150536882,13.929781170440666,10.326129769768535,11.773922226531461,16.440869659338325,19.793517224217055,18.740016518667453,12.611036818624173,13.397808614702928,18.206399925960977,19.543137360457056,12.653994083299185,19.687354534327902,18.768298710966327,11.129786064483671,11.702260425187802,10.444101542136766,15.426349340688288,14.396787918942916,11.709076651704697,17.73684918427002,15.611984977916588,10.712271916285365,15.366751979784613,14.410556162515116,19.613650595193093,19.504123077107785,12.48920417103141,16.502989681213037,10.763735590746236,18.22333009293677,11.908896114199134,15.910805108815104,11.745780196942569,15.319654369845889,13.922744935845078,14.407758536331167,11.74698431125767,16.708767823888877,13.906121317278581,17.6927523661077,11.025640175763389,12.756464428427936,12.7568374612678,11.067045409396242,13.22881679234252,17.570299114362605,10.69339926791625,17.963727409179732,12.313544023550612,16.267934065818885,15.50357213473658,14.067098250512696,12.653818456429203,19.75062161524033,10.521672481723893,12.63186633741562,11.4822614247688,16.782692377676234,13.140498522547208,13.400865228331364,12.35619507584669,13.805805479616001,10.58210899807452,17.42886033971196,15.619947560790926,15.009889470737575,11.789266300276404,10.822437675647434,18.046160932277584,12.72565819759928,15.046046016448765,12.35267683674156,17.435898917303447,15.084809914240829,17.576404217230035,18.852060746992805,13.4918907666243,14.015843419149228,19.946749947613682,15.843156820432927,16.570944695786213,11.39200958470884,17.499037422962303,14.307102764480126,18.87673705984188,10.296701087836986,10.531957763870455,16.083807207771027,14.590450477409835,17.03653049776002,17.578309965682017,11.07652502720706,18.671584239894976,18.188561148836673,17.091132531785846,15.648605184360267,16.699646927908937,13.623256291535897,12.467310292452083,11.817566916954718,15.09177764790584,14.984546307578757,13.65394289819264,16.72088767542427,15.204467305416522,10.59362351480228,13.44638130649651,19.937016893200735,12.303139564700478,12.17172576655484,17.488239148964915,17.735368023270567,14.289748445851336,13.158173631970707,14.071589595825243,13.265774162582913,19.606115778499046,15.612723842483886,10.215467635939286,12.996554406961614,12.159508850304086,18.672962525680134,17.73435516498859,13.221522347369568,11.48789028469238,12.473783930382833,13.043159854040685,11.123802228156954,11.17512856283174,16.077765732104826,15.358151452208041,15.018930607282678,12.253478106983525,17.686485808355982,16.93556727540844,12.019457320512918,19.597788924447254,15.122207261560238,17.81841888970014,19.90987994984053,17.547825226074274,15.51394804544191,17.1448168842439,11.863299822324509,12.09907155450329,14.027611035754155,11.224432375521456,10.517676833180767,14.11468364632139,16.221805902314216,12.594279118515765,15.419880400266404,16.65862778445802,13.784640614268064,12.525482576838549,17.808805154727146,16.431199921399028,13.585282549399707,17.198515900839325,12.776597749079624,19.402123906317648,10.215975758557365,16.91126345357985,16.424433923208788,14.693919687971169,18.517275363410008,14.10997668571099,16.69290493744595,12.640025909250788,12.606064552092286,18.303517515654953,14.955881415227847,16.715004110614046,17.482587775303298,11.2546698229528,16.48316361953172,16.33821936156046,16.051122170143746,12.054491183584261,17.2750708186818,12.911767382438047,16.024022624968254,17.51043572202505,17.2856683685515,12.792925489640414,12.096011690705058,17.634521402357766,18.777359735069854,19.81094867450978,14.448179171770594,15.626982148698655,14.430906313043387,12.417946690432462,12.812235210766262,10.626937101022573,14.45477484123331,15.95259667897172,18.2962945945635,14.636662320323492,18.862504211692304,19.491378305890912,17.780592410605053,15.937692836644555,17.688685162887488,10.210580982077449,15.65280635747865,19.794595497967226,18.458225032959508,19.42346243141569,12.206762510242088,13.108252298691095,11.271270611644153,14.118272448304198,15.860922728250717,12.82371493287764,15.845698379906835,19.654972927548332,16.261789849782602,11.780219366965364,11.198370427586186,12.506245059780108,12.07248640673459,16.29862441878865,11.039987989336124,15.341332688159714,15.904025400795454,15.381367511893302,11.204459180412139,19.174607697867977,19.25546423346355,19.78902622584691,17.242406485625892,12.006527898428743,14.078326733643747,16.540571138356377,19.929177495611803,13.580153856062127,11.801099617106718,18.30647355763399,19.422935170690007,12.613124787709113,19.756855027537256,10.59985826286322,15.841446739921441,19.32569987068051,11.83232463895511,19.402387668956866,12.833026681546196,15.868345666401066,15.602069944286196,11.320199710451057,14.819709549450417,19.130185387931355,14.783467935853668,12.808170399889702,19.55200586315486,15.722511288062995,13.09434762316831,13.36917631410023,18.945693412034956,15.820868220980245,12.401950090304565,11.670229114605489,10.745174570135097,15.111955390213826,12.659633977878066,19.294725470186904,15.19063471361781,12.796729720286637,19.224301013031077,15.358505359487086,14.547875153424531,13.484218271838323,16.20761249114271,17.048674952564966,14.693639805734973,11.57859870810914,15.991659527764092,19.952920818795718,18.874316173508742,19.677134463648414,13.898655294629442,14.123477552540946,12.237791216015559,15.028597399589065,11.567749744046532,13.171978221961464,13.549292220403483,15.345805929466083,10.480046214785597,11.556487007860598,15.305155396306532,18.421828478706257,13.534274887988932,12.736208762962992,12.472812527072474,18.516869195131413,10.10317689881002,17.829504643645958,18.941828065219457,12.805131485738354,18.20239702762792,14.10498133167824,16.425493516168427,16.3459071954319,15.87244105345711,10.5537426215303,19.53495754145207,18.21183986744145,10.115837704689948,17.076397858285105,11.306632337549383,16.618797226214376,15.322557812382456,11.022988920615367,17.06746512278998,19.82205046903541,16.80547663681994,12.99374901302485,11.29371172779318,12.97731710529681,16.359326291070097,12.915308930470477,15.747957713567391,11.389439628600154,18.034317573713913,11.06997614552618,10.113948721540746,17.250524101693273,10.977126869803747,17.79299052244306,13.094510007077675,14.028887120758263,14.192512791711628,17.53415511505743,15.448060100515363,12.708473607422109,19.611301153344446,10.592973036264288,13.697410388920513,19.673923158508618,19.726223908887086,14.860036878623742,16.952911872694234,16.17641325461567,18.447755570463393,13.333658963331146,17.953445823922234,13.173374127564056,19.541940221308487,12.001850004472844,17.771115740607254,17.121541487574287,12.007702078448759,11.86408223467349,17.883805503281735,11.306744454302127,15.640075093175028,19.947959058463077,14.935159205080144,19.39536324444711,16.245878162525088,16.398383417741613,10.501424775434995,18.840884868013596,12.323012611961959,12.024244619637795,12.242994045207862,17.783266576780143,18.354801419332283,11.502486517526084,15.468906357411772,14.033555062576271,19.41893318642438,13.423725302956955,11.679408292872132,14.632416842663185,15.23609196340752,12.833692676874302,14.335959214399407,17.444924024853403,14.530118498602258,14.121220673002426,17.43275949961125,19.406295941751818,19.715243477704583,14.038809777400687,15.243119338595182,13.306677909152098,19.95369222140659,18.970876100614277,10.176960690742494,15.449372887384587,15.693895873812506,19.54788858652416,12.707416221391245,17.156597684517774,18.53984262877686,10.524234350611113,11.123702911383159,13.983857687923846,15.047544305213375,10.813596480573601,13.828064034979642,13.61098952499316,16.27703477818251,16.387098199254964,13.58957239483933,18.82482290108815,12.835337211560061,10.859895948515138,15.311601670765086,18.55040678782557,10.018386830698248,13.171538543111271,19.481810302848416,17.964910662043323,15.114204831681965,12.42049360822506,10.779745069056531,12.063691722756802,10.27322822852083,16.929601885286907,11.398157747509739,19.95490411182014,12.886852001192029,14.824125653248018,11.233276197816984,18.6222941591474,18.27448139250319,17.175311289023075,18.415878384190528,14.508482828365516,10.83940457698314,14.684866016980466,14.561755871699205,15.631101646083838,12.651190150199147,15.160693025905974,15.367486370930532,17.494808896293236,11.767420643051068,14.503631588517884,17.515128814313726,17.297465334815808,18.27377799458742,12.033416429862003,14.26343623324094,12.0317512247194,10.497885282863848,17.163277044804175,11.001469181276542,18.768971449551906,16.76287089055837,11.444883988101607,10.145694528671871,10.084734961081924,14.17178700339109,16.136795447917784,19.95502926952566,15.887682349862075,14.917647250950921,13.81484254092981,15.05920065793909,14.74317624981756,19.89524113634443,14.320332592277047,10.377505076610298,15.850416901477477,10.418244689981222,11.442268370326227,13.852182489091467,16.629314448898295,10.360923344508997,16.27008299901675,17.904997795485045,19.71819634875489,15.820474793668335,17.87396805312729,16.872006141644974,10.588374392628781,13.66145324594643,15.471661333639792,14.711230071177152,11.712364335290102,10.573387692847348,15.089715598354774,11.641798486207882,14.212173620180053,14.376364937926795,15.696189752046019,15.425854261779142,13.735337000928594,13.501339053839592,13.440337513613956,14.586235080591507,14.458205897300662,12.027758169088994,11.623476089320175,12.709476349579266,15.063496597320068,11.275378157982063,16.03035882845822,15.748750254322893,18.202425058076038,10.401063082384434,16.103407324540708,14.721017015809233,19.431924714933842,12.06011251546167,14.03194042483854,15.798344761556965,19.69948104285414,11.141899096233539,18.23129024615733,16.687870905893288,12.513837873673834,13.759866126859793,14.02769036893778,16.97409848000055,13.143378271421858,12.29610848676308,13.87284992568146,18.708131599899396,13.417075445829374,17.711546952487065,19.662167797107674,18.95249961462892,10.19185160465268,17.45536746209093,17.171845169360026,16.36721053788998,14.416907336600397,14.667027163191397,15.952720601006012,12.04970890314482,12.909932827196345,16.515184243233545,12.07506168328436,10.564959114947051,15.957442751131204,11.987238431518193,18.90286745550686,12.204797065536159,15.637696201711439,18.6246058956541,11.302001972884012,16.201255196214312,12.695024784626199,17.24576988594343,13.685267939796201,10.142651157182696,18.12926489910863,19.166840492113913,13.912059612597368,15.393090989580088,11.441635700223616,19.727741202762754,15.749239823242442,19.670953059749166,19.205237992889977,19.571238694525277,11.366723077979898,13.976046970149607,15.378978156401942,13.40867858238921,13.686878409034588,16.278363637037213,18.827544866451213,13.36492889006778,16.327707065246745,17.278739453689838,16.18122947074407,18.626252676553364,15.404297682086801,19.065680431635865,16.858733545651283,17.152026179540265,17.45238759851885,19.427251011620648,15.516088727287924,18.376852247575002,19.009520048429543,18.852000312271258,14.799802000055651,10.576194667518484,17.028019073481047,18.496159357891088,19.163839059107907,12.861402329953648,12.126701722110084,11.559028459988665,18.591730459702923,16.68699234966816,10.509866521981655,18.588153823647918,16.978036302942957,12.996941310886243,19.76360977503934,11.646063264157824,12.868865453463997,18.632398358196472,13.888582585585423,13.674674089561663,13.674878654440741,17.249295385040675,18.466267504898042,14.509229432112692,16.118340758539215,13.88799777000929,14.434827178341145,16.2555594534732,10.630988806704735,16.03705675269988,12.001630381826738,10.561316390111513,13.042981164518793,15.239306930293504,12.415167353629265,17.10113674100546,14.591273327809366,13.480252792594548,18.720851086585313,17.022583116123382,11.797711126786902,17.78227421620602,12.346962921539701,16.462426514003802,11.523389260185295,16.81577275559204,16.177478844310755,19.31777915434418,10.067171171188685,13.523588948560102,17.600857036203138,15.351552802601914,11.374679605038953,11.187097676822454,10.087845787321363,11.263800258692795,14.690261781608918,17.334807403620957,18.008858290377148,18.483308339836192,14.895280598480197,12.475122007451676,10.103896497603513,11.025293346204139,17.000344440895304,18.023218554671864,14.896418234869449,12.963820198261791,18.922320354951133,14.387412471460808,17.12518308166665,15.302312076409276,11.958205808488367,19.475478832778457,19.92478836760464,15.274671561523032,15.157852595889977,14.217627033817893,11.51755360150606,17.436902077032066,14.238431351934175,15.955358993508552,12.785946472940095,14.618803271033205,11.423293181870404,11.309400017245757,19.87702242594898,13.07024360689757,12.122209040852724,13.619164167374329,19.906124703606707,10.981111739371814,11.298370216694618,15.479276603760571,18.977211386838043,12.605201639286543,15.629325172352711,17.983234146661285,12.066352635029212,14.075339509490806,16.176415717346604,13.676565974670842,17.16739486438747,18.02651749013856,17.07677785294149,12.890499117273993,18.419271860704313,11.734278651254414,16.84687590850597,15.807917019821083,11.825637185029102,12.693525718537352,13.929397422926899,10.143252369527664,17.552485497614526,19.303668938221954,16.763290713169155,11.81360103062832,19.96826805121113,18.507326374573296,14.485057971375726,11.778822305150776,11.136798094465764,13.68337975875207,16.754805874297197,12.968157196050427,10.82746763615647,18.134485794149825,10.614586882600491,17.85185048990649,12.981854296075072,13.191069845018855,17.4623118924223,15.846566331148274,19.444844975194563,12.413571961382225,16.846148248379293,17.984133095416603,11.320878129958537,16.297615178299694,10.794501734579821,10.245194357020853,16.11275252124256,15.047203428624687,10.04625789106523,15.21338010548977,18.96458010446903,16.194062192690353,14.164193484414993,13.842241608246963,13.987385406872736,16.612914744507858,12.605846860123293,19.268120924737016,18.031875657521667,10.365821887991732,10.074822224905446,13.156664505945294,16.71646858336795,13.612492994315348,12.665678384813717,19.115421321113537,14.84066991472827,16.55409029855735,14.52803045138359,19.94687105332091,14.818427557760938,12.854801983643627,11.509982150300138,11.15136985800666,19.860434869510442,15.840888004567987,15.183549011794085,15.284890226374571,14.589033964417231,14.545565721956413,18.103509942016213,10.04649853455954,14.97388084593683,18.402682049945525,17.24189696559282,14.221482266782544,18.256690859225913,16.095721759627743,12.089155890674457,16.137622936606775,14.938891376096617,19.74266858347622,14.8984147981777,18.086945628280617,19.688053574344337,17.03761157853688,16.914065874976345,18.27353004800751,10.367635048696593,16.200211664260134,13.809947778840588,10.411941076860895,14.898666377829082,10.911410358547064,17.08608815421591,10.325593065433269,12.859999396897205,13.587639400489511,16.879499155278722,14.072538076461726,15.926608515855289,19.21860128397435,12.223584794056858,10.430877775609515,13.703128789132853,10.663936787643678,12.631195373060969,10.950390833594444,16.10019835121699,11.677323980453542,15.711791440940665,11.433202323325798,15.853100241916586,18.49697313022226,10.851214806311757,14.624916117909441,15.249514325067203,12.722680357611553,12.07836923276583,16.956579820413495,11.237851299224257,16.46208869667362,14.971686569008165,18.64131157831839,12.920576343649742,18.877990424478387,15.756443875974465,12.216896085353728,17.415611985202695,15.131269906511207,18.409732031936088,16.85288891758112,17.556662455384107,10.117178717317266,11.33073426492279,19.17574850524327,15.321052417667378,14.924613448887438,19.331256685297856,11.656006310291339,16.962248673398896,12.534999182492745,18.666367234456285,19.780729533636688,11.851036370075763,10.13182106050822,17.028904719271914,11.110417810113855,11.25588052693728,19.80032310154275,11.636612716769218,11.546890809262184,14.22700488014544,10.408541246961196,15.253558992471243,19.995430272415803,18.653503195442518,17.280616313662737,13.81655264776997,12.054229518859849,14.713035077789625,11.039696361998796,15.180679806913044,12.42821325866428,15.788415258312112,18.466459376698587,11.333361303521137,15.794469179077895,14.010537838534171,11.583770771929832,10.451219750368036,17.50104358128148,13.570331095692216,16.166221150227923,17.255173272556817,17.059464198321983,15.603580781267642,17.028519288299492,15.293948805312017,10.276762356184028,12.070335507577175,12.156353049511521,15.668617140398203,19.36921609919719,18.114757050617282,13.753979651874173,15.89563296590799,13.76221581769788,14.600566993567252,14.060334055241118,18.36658351830551,11.67449228719629,17.532528151423108,11.036650890053233,16.59865059196685,16.294602135922883,12.94469900875577,14.3125930119285,19.07727285329704,15.341686157353738,11.501379986320327,19.563572096916182,17.67508862884014,11.075577960966868,16.61667424181968,12.776960562496809,19.295557108921646,10.00344973340287,11.523198683294067,11.874954174244037,11.775211530325207,18.51997232048749,19.053552795187546,12.133147477751656,14.148165270498236,17.203599649590675,11.54246123024382,14.053601367476025,17.27565843272064,17.42169401247614,15.727223927347861,17.978155978900837,15.338171597134378,16.51455630710913,19.3775968863719,12.269882418338911,13.604713299273916,19.688343346941707,17.145068699457646,13.272002699874395,13.071020191833538,10.340394780846376,14.297159652614484,16.17436508750263,11.82540152891189,10.544180539856399,11.211375544447545,17.54892726168643,15.389137451955959,15.249427492398473,12.165688128983348,19.41732888269046,16.332942221240067,12.843087478298925,10.993384804689923],"x":[0.04712737142783996,0.9817672247950036,0.8365696409352905,0.08543160192638122,0.18167109471299847,0.9646326029204595,0.2037815611603253,0.24455712447320344,0.4645175934043626,0.7321147469924472,0.630598355212467,0.7398008243733472,0.044989387495291355,0.45544519454660226,0.46359743188979863,0.014692773804764636,0.5310738274602933,0.21127173734734694,0.073919564624497,0.3274033093329276,0.5610593740916738,0.22533050843991442,0.123999962360541,0.08359608083185455,0.8550149064060091,0.4634062466371611,0.7573427321092581,0.004459372409611584,0.0833577823195546,0.05700456852576252,0.8502504935537065,0.9159950647358479,0.22692122843973705,0.9118355775999831,0.8636493682902271,0.1565722249245478,0.9136519896964492,0.4292096990083212,0.5351928450819894,0.7221520580105143,0.06888156565235426,0.03968107777077079,0.668073246212852,0.7373611706705656,0.3008247633483774,0.18000741530222397,0.5961561978624397,0.8368228212373949,0.7125858219410102,0.9012270415021055,0.6756593077309869,0.05267457470016601,0.7573234528833985,0.5712553309822117,0.35441878851036734,0.24065043444646195,0.5925867745030675,0.9131841236577627,0.935999403411258,0.12920583988633338,0.9848497960891383,0.20870504234551657,0.07440600299380984,0.18439269109020118,0.6368612777508667,0.5080982001387708,0.5868467156938679,0.6169346328456611,0.809166756054148,0.03696571986342567,0.9282238628400103,0.14692125387489652,0.5880715250803761,0.1908504824507935,0.27596114286897055,0.2780449113166066,0.2034893309922441,0.8129988085325293,0.7393362347970744,0.7614079454415699,0.8914976672422106,0.19596688677583485,0.14792917649049664,0.9884199515390248,0.410579240707571,0.846510029398946,0.8023527046705223,0.6100651217359523,0.09375724414579167,0.712557671532412,0.3736951244413851,0.33834617826567603,0.7994404975471525,0.893208120337281,0.9144904038622228,0.010700201187059166,0.2465858802231473,0.5957341566748384,0.6632628520721555,0.10075906803118184,0.7506345626095678,0.2867890199272414,0.5070258732197677,0.9611325391240513,0.9413224411847987,0.0050801413386503125,0.5410571463325631,0.7542960633894458,0.6038978487540938,0.7702693753221024,0.7648563147718881,0.7784660969768851,0.8600587223371725,0.13194785207623472,0.2715835001240403,0.33754094366899157,0.5538406454447728,0.8528662544395018,0.27752592921213437,0.7659621089247961,0.987576045893874,0.4739321474525868,0.571322756683726,0.44662101497057316,0.08901407327600763,0.7478014774533392,0.4641865150988296,0.40522764416627255,0.6286433191691501,0.8905614554473849,0.3144036604973639,0.6934922981422063,0.030577582041246387,0.3566321860983972,0.4020816116024071,0.0688307512163513,0.9718758474411402,0.11320033201812696,0.44516826099013573,0.09149139802140716,0.7320200510028152,0.015501493798195654,0.25480304095816586,0.353809417159787,0.5093238992626568,0.4813435344666155,0.4917720213696277,0.5906505327074945,0.7750834010758589,0.6106839804564648,0.5702804315189842,0.7630556335138203,0.03357036117627632,0.6358051948160095,0.1956554326663411,0.2321857647286123,0.762451516075987,0.9328421193649441,0.9662389226734891,0.860966762103859,0.788049298718535,0.59147535313519,0.7858697450930299,0.15786941793043474,0.1914065570299428,0.11294358885402844,0.33070957501913867,0.5431544362222971,0.42793221495760614,0.011655734632963766,0.8904345489419645,0.017929931534158783,0.9664468529682364,0.683646274285018,0.7998416425647457,0.8796296230220342,0.5858383708431849,0.6636009984723321,0.7393634262964777,0.9499535892238677,0.7343122506646587,0.3951972925235472,0.11448808427955459,0.5803988425087065,0.6246107245989421,0.11663921276152456,0.7608527305022679,0.47020815417229755,0.35887791026484117,0.4271829103007081,0.6311504016917182,0.23306284106890907,0.21528256847631888,0.923629831873841,0.49031976362294305,0.5486837228528398,0.7140385291727067,0.2279532053954243,0.8736131565797847,0.33475398943055934,0.48655833521228153,0.6530710218678628,0.506261411057898,0.5318525617119907,0.4450009263018688,0.13767033131309026,0.9041755538071312,0.6674498093449432,0.2727418604722329,0.8500388571154183,0.8359885773004732,0.26074387325928305,0.7412005702379549,0.8207265149631588,0.46832890917667735,0.41352812343384415,0.5954188121861088,0.8594386795747282,0.3551807840974086,0.49170600177475965,0.13869889985300565,0.2259253963598089,0.5056403791102753,0.5141956995691137,0.3631452808713531,0.257477413308862,0.7718957451833965,0.6571395136303995,0.7905544664384898,0.9169980384731629,0.48476349222049353,0.19820781215772532,0.47309721936636207,0.7619206071544344,0.561387406743239,0.8120270504543967,0.7634312412841109,0.7059700714738175,0.38927012865874167,0.6480685260970958,0.4525271262550219,0.058030401062659775,0.393853799105498,0.8508594281956234,0.335673116394019,0.6146045563167959,0.5391234948987194,0.719686376969888,0.738980588760459,0.03517516808561916,0.24951176615631487,0.5470658351846269,0.3881461840870728,0.4593712089286852,0.9305141561629111,0.24528503691913217,0.6141215010369774,0.08121382054555326,0.2953975405065985,0.3642714635289057,0.03538378989914448,0.06724032268586733,0.24431275653823725,0.20273225380369908,0.155494859740811,0.3299727621828126,0.9279466527724063,0.0030782437153153985,0.5765200194666777,0.2660556159974643,0.4902367729221493,0.21722053850570355,0.003559182870923383,0.5990113665219297,0.4911703628169912,0.016459547054544554,0.4687206763428138,0.9085025328304994,0.02550748892701149,0.8234255436830731,0.07188367513633254,0.5295076930382341,0.20091891157954733,0.05011531878103992,0.8569537489659984,0.6670859049712001,0.1387910495119853,0.8116923367557802,0.565326956398496,0.13517247180713055,0.06466723618730152,0.07826427103203404,0.1600216206401348,0.9851673695725585,0.8360622795415062,0.6253992556029093,0.9887492091297281,0.8260036524555512,0.26123299216330587,0.14791939945143207,0.7049042887092924,0.0705414570360674,0.564427882836416,0.994482727954046,0.06301048448167701,0.020153764137063934,0.37912021858166356,0.6887954015365321,0.3814381091911516,0.10355686822843069,0.9854353664620239,0.5728154021641161,0.3697891490039913,0.9789712465982359,0.6176100349626696,0.5186922561808327,0.7383987492121229,0.5749036748191976,0.6467048210920812,0.6705242497636192,0.1363557318502331,0.9834485091175447,0.2642957576686249,0.09528916411747446,0.7699069905076754,0.19640348203114533,0.18125854673871156,0.5968987291464032,0.8295388076015029,0.04783619845633735,0.8614615573137734,0.4498553906630811,0.5100367956524785,0.7532544809447852,0.18821446238575024,0.5270591037895713,0.15906160271723357,0.9625389370963353,0.24709151427761777,0.6601812272086627,0.3172309730886762,0.07369382121678347,0.017235466718623638,0.6791691513827425,0.8479191221065208,0.358824692205862,0.19454378354580149,0.4912349105446181,0.19741329971828625,0.8349693418498054,0.4725535791475852,0.049198791749546,0.583053650355364,0.10974328680756185,0.963415927607763,0.39998765622235344,0.8178157848298453,0.29927121260368605,0.7458448984396804,0.3429879001288032,0.3907478502326338,0.896077866602198,0.4685337007441994,0.3967790784539207,0.011050423820441191,0.8716600699999366,0.5488588810982444,0.16613601908067865,0.22010665301689647,0.05619361390065092,0.8435381343839241,0.1036127883306035,0.012667121877900644,0.14637576164485555,0.9044286636537864,0.2197127112149444,0.8433674686667163,0.8822104459331692,0.009086802406846894,0.6673557890982116,0.2868787631075316,0.844682002713147,0.28888289338113116,0.3274885143849038,0.8629080008117043,0.7791784851198873,0.4233176831197385,0.04811119375018236,0.5612697450042172,0.6445984161592457,0.6890455352752825,0.6254948170605237,0.5508273050919985,0.49620599262210674,0.4441183480822064,0.36585880977200724,0.4355407666769697,0.5553389687031225,0.20264052963652368,0.2251279111284954,0.5746290778125434,0.28001837192668444,0.9657319745465252,0.9146110883753058,0.2213755033238589,0.34138034191236755,0.8609444981672789,0.9504141746477541,0.21393658869082488,0.5806924808362766,0.2582009984560518,0.10618800239945769,0.21486585412831483,0.26144440703489114,0.2263347250645249,0.6566093500451688,0.763608102587179,0.35308703807684205,0.5706598101707836,0.48851187423357434,0.1839620001252602,0.6308918527906759,0.1134188452686018,0.8947869990729134,0.021956129738737395,0.48665306036246103,0.4173852705541272,0.55837647006532,0.039539357779961204,0.9324320239293136,0.9096319882740758,0.7304332960804598,0.38903514129178807,0.3748648613313239,0.21740530065219055,0.042536673956407256,0.7604117405306574,0.15791146296732506,0.06031601227014205,0.9561422065770229,0.9518218441435509,0.817824232765521,0.6133203399196689,0.11661022500806428,0.1912489118544849,0.9696306347380876,0.49894290013155307,0.908273572392504,0.4351288578184227,0.5577239107867451,0.909316330168257,0.5861888197156178,0.45590741092393006,0.3298963251741338,0.06776869358517246,0.8874873266440675,0.5240499390256395,0.1294643818711867,0.3175883550203873,0.9166324535692034,0.9326462547010248,0.6709339801851875,0.13998546195558226,0.07979629893940388,0.31943725040891713,0.17674710247676306,0.516142143811559,0.6156159137444042,0.6672318449674344,0.12155757576713433,0.06765495077809436,0.36712563522008224,0.3560163922979789,0.6136973547255486,0.02563115274421568,0.7477619207979695,0.17288784237135757,0.2837053801970342,0.3321873635614585,0.07873563756049484,0.6150291469179232,0.33070804908949114,0.24818731290724627,0.10567137163308105,0.7419854601089606,0.9080339550233465,0.81681170876605,0.7114709877538414,0.9292503750110257,0.9905522847328219,0.11492032567866528,0.5262343028316483,0.19104841703688602,0.500057469491606,0.47904595527474414,0.0978093952447765,0.13854541498590867,0.11777020914197678,0.45483558806373736,0.012304287092746335,0.8122666744960934,0.9774546657579695,0.8363424053333328,0.1732875246995318,0.6903893119054663,0.395729673650141,0.13559479510467987,0.473602506299001,0.5927715158963325,0.4969207537740765,0.5052355388955461,0.7304417912202736,0.3368154489534956,0.8699137936664691,0.5312433127067988,0.559566808220171,0.702237881787338,0.36297675552294084,0.42804603187072865,0.7255068885959446,0.21171927660293388,0.9629644456621846,0.7489514803362225,0.10354252828239408,0.5390612822623955,0.5081767808609248,0.2631256880459718,0.8604019534444991,0.29508720333327787,0.5807902308162272,0.742482256981045,0.5185398433702617,0.12926649139755875,0.6660006743579603,0.8669934569305313,0.07256203967332153,0.24112634786896114,0.1776427554583131,0.6304854735125551,0.12812563744393302,0.16248688444490855,0.12683922537540182,0.7843150059887152,0.5915815379359497,0.42296110580922397,0.4863191147672834,0.5647414161006412,0.37815809245668963,0.4105584615995064,0.3467460680786387,0.5001523052647443,0.8468215343203154,0.0010195103854542253,0.3167865136483934,0.5507369112414162,0.27988845734307266,0.07210145181684768,0.21009586328123064,0.6021000390388533,0.19013407352512335,0.14408621339707395,0.27620332100540157,0.45746970426371947,0.7526350041593375,0.529671082564743,0.5587423007895673,0.34002810753388246,0.7212194846736326,0.44481620192775595,0.7563895514515355,0.9757679101547287,0.3250883691723423,0.34344838999279825,0.8791035057999004,0.7709826101085215,0.5658573295487537,0.31825933962699327,0.11916983002348691,0.49933967507000565,0.7359055866311852,0.8255413044656852,0.46496394775517547,0.450765924839011,0.7254900801853603,0.7394109276470953,0.40075703274116803,0.7911747004782741,0.6444266671240226,0.8554666881870552,0.10840635782295305,0.9153919192962301,0.9877269421711827,0.6742134041554988,0.6059249211837574,0.3971906404330332,0.07223364128178722,0.48652873376563144,0.995552869508191,0.797734266322262,0.6720079965525085,0.9592424805823905,0.4204521081784307,0.06731432903446288,0.13914051878237843,0.14620634122497922,0.9520774392967022,0.5081773450652798,0.9027463741912669,0.9448108558877031,0.9098598890216731,0.21510630835014433,0.22792627373619756,0.20933658873233196,0.05201222253627402,0.6997182155833082,0.14357437865615674,0.8760064641429601,0.31025382263317036,0.20068796141405154,0.896637896005714,0.8170157860380851,0.5617950457990424,0.5377066144109635,0.9695309121857081,0.7359912218961566,0.2837647672213872,0.14724942891522885,0.41084408888384893,0.6690506618551368,0.6534522148878275,0.04467636125643848,0.33819820164310954,0.3559682481595168,0.7893185522255828,0.6835509632270191,0.15189786509294723,0.9778541599026307,0.07939598825988226,0.8532109506145449,0.5149281992898553,0.11224067351165301,0.6609733395991753,0.07283494046930428,0.18587891671058765,0.03711730091758336,0.7883995104938355,0.012039751254234954,0.293361949660065,0.35664272756737603,0.9100129749691743,0.36542527294005267,0.7844150240690102,0.6770829170372563,0.8047745383059126,0.5460985833895224,0.6817949665656082,0.9364570962525527,0.8749317650975177,0.16938415191655842,0.3069746519541803,0.650919936310236,0.3623787807311041,0.2838030661802904,0.04893105187289937,0.6826948172080729,0.7094771938817472,0.32518351117425515,0.009248084699669423,0.743591148504853,0.12972036217987082,0.5315536161343821,0.7869123482960838,0.16893175373519065,0.6910426382576207,0.34356054220317644,0.40729699772592576,0.08983686471621688,0.9265580971557876,0.7286896318735587,0.9883871270072151,0.5398022256105284,0.9924541307038635,0.38048025740635927,0.525702752687047,0.09055937186307905,0.49782893126681316,0.9946387282509792,0.16449288102853687,0.6386501132530864,0.6541561004004852,0.027012425980793342,0.3796930489839403,0.32853581519797204,0.9941216437747482,0.27141707163416995,0.603739288776588,0.3308654839357348,0.9789509732943473,0.909913228085822,0.7598592420386854,0.1358672370249765,0.3192378486984031,0.7481439683958149,0.4894812242498714,0.4976452303185679,0.7890223901548086,0.22361104185453073,0.4439192084570791,0.30864282531574516,0.6673134548463058,0.020455636207399763,0.6298279967205893,0.6806133343219409,0.44444334481926506,0.2139871644494098,0.1679662604062675,0.013425359323230746,0.7892237672503419,0.06827263697684804,0.6153629164234073,0.16875013540944184,0.319718443348481,0.13923345331419945,0.17245245764657002,0.40999722742494016,0.5625542797620238,0.22994043326443636,0.5690699580433702,0.9724841417640049,0.7340416084056742,0.9628548843647786,0.8862852207385641,0.7702397825872211,0.47559845335591455,0.9133020948350972,0.8607347945413115,0.08058346590777599,0.4508734030228374,0.20229640705533214,0.6499439930800079,0.29448096455568074,0.9897475598620653,0.24901853962757037,0.020671918793240263,0.7681174254940824,0.5952148403466426,0.3208389399518543,0.05142486159138904,0.7949949871426545,0.656270654894588,0.21628597176684083,0.6773143999668125,0.5418119663433341,0.37588492655578576,0.4669384034037727,0.3239811859840238,0.7147077815757075,0.6353349359678828,0.37360459070346064,0.7069966733909769,0.5337522451379135,0.5375415463085507,0.8827574308763431,0.37326457639621125,0.8325221945224437,0.09657366896278874,0.9853221627161617,0.5845609319443676,0.008426466101104202,0.5984793584110002,0.992032284366507,0.32904420125599065,0.7474218130121348,0.2621281907824746,0.005682737646291791,0.19108810743656024,0.5405527452593946,0.2247620926943965,0.3294410305079911,0.2934946524451574,0.6394993769678137,0.8037705226945924,0.3694548909277897,0.5514519443215717,0.6627805393027018,0.15222046644148213,0.22786068542874793,0.11938600010465894,0.2970773246482359,0.3798617350991518,0.4360789870313997,0.2278339368802218,0.9374917322137917,0.49634420775550203,0.5436335253912581,0.3830319395333064,0.566318538866645,0.003951837336238162,0.07605072872122753,0.2719414076719828,0.577412713420812,0.7558748544763845,0.01949868572721969,0.2895155820573305,0.469087653395424,0.15219354880515112,0.7310880316506754,0.4880366078670988,0.3237393074140096,0.7636373022220491,0.8344288455779512,0.46387746057245005,0.07730065806074027,0.18001108459402992,0.7997987384918783,0.8784412243256454,0.8183980239239246,0.9445021419199506,0.16278074612521687,0.4040523051394296,0.29879121881807125,0.9368090774351074,0.7784039126820961,0.2546388688441201,0.47240260879242846,0.3055117276819306,0.20663207617737234,0.19313688496426318,0.834814356752076,0.21652404015468862,0.47457136120896704,0.4728148933630183,0.059674528874956945,0.99861243757093,0.8024647120429902,0.9458814329508747,0.9142586430871984,0.5668113135566211,0.6466697703872435,0.9519474693694601,0.36973050672009466,0.6864535914709766,0.6529683080685411,0.5957107598032572,0.8132894265383463,0.05129456214420314,0.30571649304088466,0.018602470604041077,0.6017464244358355,0.8838187984628856,0.9145550370825744,0.3233374214995499,0.7386134468816319,0.5778663890493334,0.9562448910030548,0.785643370769556,0.9250636693930534,0.09232705258738161,0.2568235835184587,0.8624321203821816,0.32074981015946613,0.7253524392681563,0.8536948348308628,0.15207170897212952,0.7705335457599358,0.08892710133776904,0.9693086534989586,0.5445587859588463,0.5698094253291224,0.7425813561610846,0.32074449925876003,0.09121998474500703,0.22613515979088183,0.8824359884664643,0.26155476668372346,0.6505630928915973,0.08218266793304552,0.461649655281422,0.8370231134306507,0.42290047865429137,0.9874854966077657,0.39465998386569257,0.4289794983969253,0.2289400723545283,0.5947791896098866,0.0497940640010921,0.36743339101694605,0.5900270982171456,0.49564250979658286,0.9864258489017024,0.9842845245482263,0.14927976445356195,0.2436676683489576,0.6140387507065963,0.5229720754335716,0.10256438392493883,0.06285681884961081,0.06709307346520377,0.08362400560242245,0.8836009570102459,0.4706298987587636,0.7722065485306764,0.24732320910700967,0.80021703716024,0.7161305505563775,0.5177188328784326,0.12939489622975953,0.8965119903468479,0.4956083613912883,0.40911674549138066,0.9133398711536536,0.8259438358013549,0.8598030019176368,0.7490290512382527,0.2786857988173126,0.7014596535439086,0.5560467418312736,0.3417157929331376,0.730773660196715,0.40598882742674003,0.4517087323619924,0.6184556709403761,0.7825533473478208,0.7610507612905983,0.42013344086504456,0.7020764818284837,0.12038511686825859,0.4480075291009942,0.8197847300159866,0.4842932751667952,0.4721444087092692,0.6942034689358227,0.9217689488880525,0.20314584743402908,0.03322105863290292,0.4476802110735396,0.4323459815791688,0.4844967993284901,0.7681189468315899,0.3853681556183446,0.6455769895055652,0.7394860841809006,0.4963785520398267,0.22586500401593623,0.9088857697417412,0.009349010375311106,0.9130365246912642,0.9908766816876722,0.6675130614332636,0.4539937428116936,0.7779717709157303,0.5174925821625196,0.8378906560825177,0.4439993087391729,0.3413964604132287,0.6603238527969901,0.39071157721479066,0.6430204151971106,0.1620078376466858,0.14706621064072944,0.4053746634978652,0.8252075140146424,0.7505744869167652,0.4519732447672147,0.6638661251218239,0.7366083888978616,0.41373377776079523,0.4369676183290687,0.2940092520138655,0.07960916187876155,0.6653496215236503,0.27662042580485613,0.6360543064789399,0.8119400337304585,0.7330566520793211,0.6015430619440096,0.6176828419992033,0.5455282583594618,0.6053447737574025,0.9777132592173414,0.3048138464147676,0.8280546262556574,0.730939581441912,0.9422409105748735,0.7162113726365205,0.35280141751059535,0.9838250257323593,0.6035444557049408,0.7771221711332732,0.4212714134550737,0.017180331198014764,0.22958494529552653,0.683746076715479,0.46210260759141586,0.9931083754941641,0.2201587083045211,0.039154937282866786,0.6125084373652807,0.20729561580537692,0.5488343968830618],"beta":[3.8845093903394456,9.269842178507872,8.848885476998207,3.299441755634669,9.255556550437058,1.1216733816173274,0.7162980432088384,7.59543474136022,7.07953883483456,7.992891269594704,8.212051343933737,3.855178406238182,1.7088763098718251,6.82905310987203,0.9831079447141988,3.3232801286418234,4.4713887913418615,3.6572371795724123,4.84278000200848,6.153093393624518,2.729009347371889,8.692819995380319,6.741289308586538,2.413316108714594,8.846928552139065,4.58862542138021,8.515373789359625,9.804420418206902,3.9463573106887173,4.502080170444243,7.959293791056843,0.8893964752006167,1.902034019373089,8.074967210888175,7.185866247461465,3.2900600875112085,8.108453844554388,6.359862955260523,4.273646588419815,4.9572598256482925,6.415958688530776,4.486688773303942,0.023479090666291835,9.697699685061448,3.280134873144409,8.204093073752322,9.399015334537165,6.167149597663415,5.609643142697649,7.4024459497729715,4.239564127101221,2.1619614185615488,9.647993696472168,7.7230538349416005,9.957304303273784,6.5651838978763895,8.50498932858227,9.716557455589921,7.162185993050889,3.3544692219395333,5.862614583344188,2.253995127088073,8.42113611761254,5.059034014693349,3.01810203745984,5.878868842157139,5.677698671693583,3.6520433089709936,5.5954715462887705,1.3578818591033648,2.391199556064645,6.4129869354637385,8.561577828966227,1.1170679452764065,0.7928103217758453,0.32951926671816567,0.9585657324040331,5.852800855513431,8.827706421018169,8.770360638436955,1.63271597704564,3.2218145338844395,1.9309317899156109,5.48216765442614,8.400110783248484,4.74450418132661,2.6845109638189912,2.666901751791164,2.2263642395658145,1.7654263103078804,6.7071251131668275,0.01925382376004814,9.376490040887514,2.127846175463204,3.342967490236599,0.06869596980307646,0.43390541363810486,7.772016247883659,4.361449719086686,1.1630745235447937,1.4888402230744302,6.009976277847335,5.24544179908077,4.28782062254887,2.4211760116684466,7.470731524781917,4.414009652108208,3.61293707196781,3.394085786709904,0.01604606557312316,1.201513442917026,1.5304711010814187,5.837025179257161,0.7998968694518971,4.753494016744792,2.978055111862312,9.678667412712025,3.3274133759732605,3.680988639900351,6.12323606039234,3.3572450160796063,4.6257827762341,0.693565835033485,4.2408010114291255,6.601725201749158,7.55529735094796,2.904601978793826,3.827105288211634,4.059443819234145,8.72624029882707,5.373760350952519,0.9883490543810569,1.8783020526827165,9.604966617105362,4.171665902068034,0.7548318090830453,3.710355421807723,1.3360935437087607,0.8785271336932765,0.867159684505574,9.16413043291329,3.6834167667487394,1.8455416096075883,2.988392333096206,0.6659953902958349,8.411766396471329,7.779401064029374,0.46933043205580116,3.0771775562374115,8.679660607175801,9.197106222894963,6.653615850749874,1.092756603263263,9.86102256128847,1.878468670494493,2.7039804422380076,6.917583077236767,2.9842651731627057,8.974490368325032,8.40265861309219,2.4911203207196064,9.340457588269507,3.3839253431961303,3.598965117674491,8.161452721977497,9.507221907481169,4.679308707385892,8.419124923554406,5.149828752966532,7.309672093430071,1.4017640568625045,6.985350720977226,6.573932457628255,5.463396378052037,0.8553670064728314,3.227429781200062,9.396189791307117,4.510320482702992,9.519675795000973,4.665117872329652,1.25966887565373,7.892390407768152,1.222682081264126,1.0557941349427802,9.290328281114832,7.694978660300309,4.120505832367298,6.155891503495809,5.857313250207468,5.859307729093526,8.818844269861799,2.542426429361022,1.1355944289956033,5.955767996214201,0.7347915438429986,0.410215300815715,9.623619320606169,4.203355323094371,7.679736075234425,1.5366335235861217,4.184696279488611,6.415970933771826,6.1647116755184195,3.133233978113239,1.5583191290153664,2.7602178919364473,1.290867002148357,3.4057621340315736,2.986553929937852,4.885454957688733,8.208168859270364,6.096833377645529,9.519402933222473,8.629204522931389,0.0402376308913488,7.321257440399924,0.9028107563055854,0.015399631783405976,4.497893217730866,9.984284028970674,5.634563851478578,2.4799192304858964,1.7943222274745385,0.4353850732875375,4.726945698583149,9.620539012746685,8.4236165120839,4.236098256541185,6.532578705156197,6.908911888827809,4.989379260808599,3.379770335153607,3.8021628297273913,3.3515307962904006,1.8879578032145727,4.086577237551541,0.568470199130966,6.09466068166141,3.966384226736819,5.8039763162671125,4.638569338690182,1.1623881149471282,2.232014921614316,5.867145406645409,0.8891570381269354,2.76833849843388,6.256430409015374,6.985493091813197,4.370234389709394,0.540767567629532,3.4932682832816497,7.961244094557511,9.04684928056907,6.649051188974351,3.8361027210685195,7.089416536363736,1.9159862702230623,7.413972757897955,4.159204314558873,5.082863957726412,3.1338823394650506,7.446780773160411,9.179511533301575,3.142447697446369,1.9194363923825408,5.684161185567602,0.9984526487594092,8.49597732638761,3.334024644794209,8.57545587107275,3.5869100172683543,2.8115340475556327,3.8743406974001227,7.201925660042601,4.706784080852917,5.659906639320324,3.5487096143833052,8.868413730160468,1.3063148579192574,6.441456788898476,5.3467846155116465,9.84528437635359,1.3234695002578367,4.720304303770235,2.32031585455726,5.2670615690164135,5.424133663337221,1.2242437864216638,7.12212273576773,6.303565807320921,3.205126711948638,2.4936498566827403,7.383455609592405,5.279432309972845,8.040055919796153,9.175538170785764,0.42959589943039056,7.062872111390859,9.929790812942812,5.726306256164168,8.559420266133198,2.0237791579862496,3.6960767615886136,5.067095958521513,2.0513123248481824,8.958449939899404,1.9369161609512942,0.33089762453316185,8.509671279078667,4.709705505895574,9.725686919901467,0.3311477546751185,9.120096998288965,1.5164239100496002,8.089947952730078,7.487982680726453,9.186583123099483,1.1978279797331193,0.8888431161931454,8.597837213047843,8.407444979091753,2.0034560159393022,8.15490611207371,9.165858156202443,9.212476708160724,5.438151676587668,1.8722632279622853,2.1222832099719735,2.992202288452994,2.7895765103608494,2.2303719599529015,0.9979402376979474,6.0333882682494,9.410198878952329,9.801083692067948,7.972839474687672,2.484399755039872,2.0183498921605336,0.3926452258644697,5.838956022996786,0.6697967826708773,7.079303202750036,0.8595370234220279,1.709760333469843,0.6343653481837963,5.314087376365011,2.4773259556090976,5.123614016100841,2.2082411786739664,1.0446260302857757,5.477867990851792,0.8595438031235147,2.774597232923459,9.638072792818242,4.165608773047678,5.950453587397691,9.45942468230118,8.581664066512158,6.2600736619147845,5.978287262189874,6.622050687608847,4.7820155306686285,5.894264307015296,8.950946933372038,1.011854081646626,4.786869006664027,5.504565132683492,7.658311906393738,3.262468687720592,4.8829132835909945,2.827859191372779,6.727471056480425,8.620808205448409,4.582672913454113,3.179166069128956,9.589420596141844,8.058648660779639,3.5238168628256195,3.456554111209129,6.466413998265481,3.7636436781322513,4.791030814700132,6.615384828926951,1.3841120377916738,9.686074007404883,3.4398083240287547,9.561574502226387,1.8761400286546204,5.160680320151476,8.663490886947427,1.4452580289117578,4.003951243166162,0.8242182978336521,3.4447346478610785,0.2511598623250766,6.503121354323311,6.132306976216515,3.762097880934381,7.011666721669867,8.70632956323077,6.206989474930447,1.3091178970153328,5.9636814138734495,1.3292501029950765,5.788648356014363,0.17083520774786365,7.308191319201454,5.558992474115982,3.5235328937175003,2.448427082740714,6.0089164818369305,6.914754909607222,3.1066260375782773,5.112502194062348,8.93944263144684,7.145893677457799,3.2096432779096085,0.22669136550782953,9.687827937665501,9.269550214981471,3.909829609694302,8.564660549639582,9.970746432388793,6.109314799219982,4.505285556843899,3.630358230338253,6.1189346364713515,7.224690871365249,2.373574145888848,2.801614532053822,2.9914961077606295,8.541644402397955,1.4729214027955129,8.079997389529003,7.795743591461588,7.491242757982668,4.049572746335517,0.46223698127055624,2.7568496514476304,8.841870751689916,4.744884781528209,4.14761366157464,0.060560473184347874,2.678228159396021,6.099677938599628,5.0736867118312245,5.442338473937234,2.164325565447389,9.007574928892211,5.58799811858619,7.683283302696058,3.247244554619799,1.4329632950374949,9.653519790210478,8.527432576960317,0.7448573251288715,7.280370293020233,2.719850809549289,5.603606783967134,3.7202000794666867,6.404777300709233,2.5667955240688567,8.961142467299437,9.817057282875336,5.9795420403443345,3.1476070789446764,7.81772775203911,5.205774899895825,8.639893514815835,8.380435311554212,0.11490554712286549,4.519857376817051,0.409631550105265,5.26488644732882,7.952961515332255,4.186095029892538,9.868046896017209,9.593673700843548,5.101429047190297,6.877782592763468,7.891037272238313,7.306741972341628,1.4289878315099225,3.9610269207907556,3.883606154913084,2.2383572360868986,6.400250227296496,3.644463228850392,7.111420085147029,9.310104303592668,0.5902961042177646,0.2762327697466338,3.7910009873107575,8.535271850727625,9.453097257506434,5.615900830203362,9.245670915795047,0.3748716726745305,4.995906232166753,7.110303306362193,3.130055922303232,3.8185742937072487,2.896923975630794,2.868902767271797,5.049650847027831,4.1642253073870545,5.539546723123139,4.920737032941349,8.425841866777276,5.145237220023331,2.0589628466587673,7.463050671078248,2.043786689759979,3.4262187462987415,0.7914922147578651,0.12722950952991807,9.14170588237532,4.991960647057095,7.246215842275157,9.450354531476234,1.4851548219354238,0.4466968334208232,8.71385987393008,6.1793431345267695,8.202774374064354,1.2594334107202898,9.077257119657142,8.263029889194215,3.043837595235235,5.3406932845841615,9.24895875286715,2.6165743419947285,3.193080275184086,7.418715204496724,2.716218600676179,3.1890626415526335,5.931848676579323,8.10699489421076,0.6493548504041291,8.991539885291305,8.727848996906108,5.088247924868128,9.262606798150495,6.067648181029406,8.601571439400967,8.31061060964154,7.288980372744374,1.5051996667849332,2.759764407228169,4.9294505455316955,2.3568595809483406,6.328414445560407,7.496112315116752,1.7373757364805997,9.107006720461548,6.163216554787178,5.305141762654005,5.739355115300695,1.4735062586292624,0.41816212715075185,2.391005024001136,7.734207566930924,6.237625048689299,2.5877307932400972,8.804064909719017,2.3977536228744856,6.733938869709899,7.534528586246669,3.120194282208588,7.8211441075643044,4.386036398213258,0.6453758785198271,0.09818170873015619,1.8830028547431854,7.709174604824747,9.372655605226527,1.520863476781873,9.921611982241823,2.5770306709819946,8.345312038317505,2.722680078069768,9.951728393760117,8.597644218223326,3.350324997010383,4.423702766964592,3.4837792415874747,9.4958380321317,5.448082424639593,3.164870273227489,5.860582586269727,1.8118178219832148,2.043320324902338,8.654083663651415,0.09988386352204337,2.0565990249061583,2.5161340030130264,0.8662062931468584,8.58226797065939,6.173677458261835,9.524510681678395,0.6582891611738839,3.3787101549429255,9.623960140632322,3.6612702298687494,4.597540558705974,5.357949716944333,9.441536745300239,2.6825125046298792,9.250634002039357,6.807740336390942,8.88954492576379,1.7433582985910467,5.093179207258352,6.947651640852213,8.887705604508147,2.3889104157099883,8.421569902056588,5.882516645804072,3.495139464483441,4.434740078977475,5.268480484465268,9.982833484576679,5.224751890297881,5.264460742646289,1.92698327871905,0.2731349912767733,3.9968759567210155,4.706034018798753,7.145184862927653,6.549878497686558,9.79882205023587,8.137331892424559,7.975360721865021,1.496178812315312,9.585861401011403,2.1143074770755277,7.367122601581739,3.2221388955889108,6.273788852436306,2.197226275644719,7.80545134629846,2.965535690413841,1.9129995571089675,0.2550031055175239,9.596381645497491,8.634925546704796,4.683333509768907,2.3016792566442756,3.918556313481001,9.830998955792268,4.5206049359387634,6.116093173839516,9.845004426338038,1.3160534043813787,3.2137084793671455,3.117093641998019,1.965553463170564,4.028879983157214,8.193238555695189,2.985914415668147,6.478249063399244,2.9517823728605785,6.265729503694127,7.264451539268104,2.8998049556715877,9.131327338154861,6.4337601585792425,4.457875784354397,6.48512868354776,1.6317913009951601,5.498700247200321,0.1650181376878357,1.8021802343174853,1.950441560622025,4.733011719077831,7.579881907412965,2.7394862549533427,6.738530853577043,0.12875852614443017,3.3265791967606106,3.8605356580920414,2.4755077598029285,9.61249706443195,5.333499361122136,8.211273569100205,5.515714096025888,3.5305304434995177,8.909394333717028,3.1161107538632504,7.978497049969395,3.4978376251275956,8.497220990324603,7.465814933159159,5.474993136074476,3.0615090346586116,7.451694473060442,7.412519930225725,7.032116401003485,1.9084874283322328,0.4712339297310608,8.332016379375808,9.107871412588826,9.856855470390215,6.114244392472901,1.117680603336575,5.2760475309605415,6.252148190615456,4.211530726898209,0.002892118480259942,3.3838093685652915,9.049139190014861,6.014638423238782,1.597536836174842,9.270268130414024,7.158633567128496,0.37620727740990123,5.374316514929028,7.376941521654665,5.190381034168756,8.470459947561487,6.0477724338596754,0.6414518134886449,3.603628530872085,4.568315776518482,0.9308461623676423,6.916381689644028,9.270645060206563,6.513894581136508,8.175736538556732,9.630392514775231,3.687889955436794,1.4550144587297753,7.1455423060597045,2.3966303003358824,1.703462558148745,3.7857029218924154,8.212540794824319,9.69515571464482,8.290158858165572,5.8393147963775816,1.4444993637568349,8.000689777897128,3.928591299075319,1.0103990287486009,9.72330411673113,5.425717026687309,8.379197321513569,4.6634233818241055,3.799677556028076,0.7970286846222585,1.4711731969401298,3.3318649737137584,4.66732089877643,2.0702954902178328,7.3934279640655465,8.68887181564141,5.1327983862244775,6.72112976956895,0.7029791644631733,1.924969764659088,5.839062801800782,4.251060259615153,4.7844909416939485,9.144495909041883,9.12798874186971,0.368164294315112,2.2657096604873606,4.411883924954044,2.070902120705964,5.375954844768502,6.102042958428624,2.9807723896286853,6.072448195006954,7.7433698920937015,3.1622911701709544,9.636813078853002,8.131996586171992,1.2076797636199643,2.74086342750385,4.668793140717538,4.864031002204767,5.398185329779743,0.8413441730904903,5.521815792637252,2.4752762737817346,3.5579074782033326,0.20456866792852413,3.2657022032625305,0.40430951331153375,9.869813889264913,7.769510090967766,1.1333592746395715,8.385169190105433,2.965483826314257,9.553619372286828,5.159822663749809,9.608071143024828,6.3803407479463425,5.241902803889705,4.929487714661105,7.926708447110538,1.0944180774475498,1.5635958192741772,2.922091993497733,4.371676267781717,6.232287207905383,0.20805914723837082,5.466364556827001,8.906044543606221,7.0068540763418135,7.956704817514129,4.488777459434972,9.763703676420711,9.356194814399618,0.6437403672812159,3.2884763608315337,4.945909874027709,5.801070902183161,6.527761432335797,7.615491997511386,1.5330653482991874,4.589315367164164,5.921011964592395,9.738813901319546,7.0349841238864546,6.23302084098182,4.654958249822199,5.301797109075174,8.74168464123035,9.73281183965886,9.34409380765667,7.617451540893592,6.324171855685147,7.0073771653631685,4.303290633353494,6.310752389269744,2.729431687543593,7.5135821268656855,5.273969938379119,2.1546965344357516,7.137033968379383,4.729665944702837,6.874662753855385,7.6203775401959035,1.3094685730893163,7.911716987466557,6.2622331939719995,8.856735567164332,3.4998729632068315,4.324485439908439,6.697461834600984,7.946831841605713,0.47584926911460546,5.128119285893568,2.0945520717815236,4.42037230635957,7.149048271859004,7.046549098490624,8.375001740719911,6.864745911714849,7.0802081941442445,8.78327330343176,5.731372557061196,9.587988240539671,8.815122793581684,2.707316403579356,1.8991535556317518,5.098436343586048,8.651281095186425,6.944120198707906,5.659846919833069,0.7805467222892815,8.452285524419134,9.631209769038076,7.114111260409142,1.8584489888259847,3.6519351996102567,9.807157422484696,1.8195894810398539,5.478149360153557,8.383086425217686,0.18699621088039464,5.990037770236006,0.8554752133266952,3.0195771720378906,4.3940845639517345,6.980483052947141,6.11116406611115,1.1873242864335531,0.4648288942042944,9.956819172863181,0.6850918367910874,6.799069470277635,3.4606083016271327,5.797665769633125,5.044878832890856,6.797493214596333,9.172816188170964,6.95956130764356,9.165826891696094,3.919543038248816,8.437085595780445,8.705783884766605,8.359114218357862,3.6682478815585395,4.7779161319681425,1.794343996628187,8.254125809533484,8.572486984246675,8.888967321459415,5.88653840004736,7.764184295096941,7.521957505198726,2.2634518553646377,6.830352094663645,4.433525101325744,2.3098508718789024,6.656176466874653,2.9913762425571977,9.427218882753172,5.065064823856855,5.6771785542957005,0.6809535194186966,2.742906071078035,5.378989692079843,5.935698790971844,1.756893272516895,5.28316092633867,7.27791458784532,4.42819129112999,4.978329911670354,0.2728182469620233,0.3134591349188365,3.5427833861911173,6.761145937361461,5.62565645966507,8.226225952542913,8.05859876163106,4.383707231902414,2.103935047462615,8.087242989200332,1.500733061482551,4.372389919128636,8.052998697292873,0.5648242241878387,8.36600876097073,9.183439553108322,3.7596203865946176,7.5040596965959905,7.340076198566406,2.5229474071798808,1.5104710205873895,9.006985730249244,0.025737810021091434,0.06527973260508135,2.8249053049838224,0.3703492451415724,9.175420626500978,5.4919360231635554,3.2537367672860107,0.900845053085173,0.43680747089413385,3.702107270761321,6.904173663018618,9.271203531295413,7.06390653559593,8.989247453770146,7.143931273076789,7.343678948132515,7.7459059981708345,7.9588432629942885,9.561206166772374,5.952889741470049,2.890624813225715,3.6600091918081135,7.28140468364119,6.853518070728075,3.505592507234252,0.2280139803504122,0.8562578691626488,9.707629108947454,9.423434230287139,7.019952564911316,8.314757209776232,0.38068512927451836,2.1577770177237654,0.7993183073735555,9.951739664415062,7.821986857686376,4.799322036944358,1.4297151739499747,0.0734271097778394,6.010994514697785,2.6971543318426794,6.797596882560311,0.03561867301202115,2.3785416219875133,6.914888014022253,5.020338208865594,9.193911323898512]}
},{}],24:[function(require,module,exports){
module.exports={"expected":[-1.4559953202331708,1.2243501626707558,-17.751251058152512,-16.384072273417555,1.34164874500673,-0.7135769405847436,-18.941617583558443,-3.5281534679080364,-18.382723938810624,1.4778222142733588,-4.47207483728816,-15.83744251122157,-33.51509469118752,-30.77659502450295,-2.3069860578344454,-0.3626476644780734,-6.789208009962055,1.3224506809425298,-14.062388233402368,-11.854075617391095,-14.89358561957917,-5.891268313365286,-9.590845015785114,-67.9046292780678,-1.0031224729364867,-2.509438171517132,-76.60553730527239,-2.882515827713157,0.5751725108279522,-7.346395570954306,-13.109075560776663,-14.556587370928664,0.35097317025140917,-7.433476904103992,0.596811769407136,-9.896387077574172,-4.853972181335778,0.7208802794379507,-4.186009028289339,-1.3103168160863143,-8.164075870709521,-5.387415581002421,-19.774759976869348,-5.91263871342071,-0.8872228533920214,0.453016800086143,-26.23785288019227,-1.8084795731317156,-0.17193785834651987,-1.2938072189662395,-20.932185382911012,-18.48594707594735,-5.252609356092556,-68.60475024151447,1.2810053595525608,1.3611575842305366,0.271228263535491,-46.94592031086591,-7.4841477341050515,-0.8751414326123617,1.126292271108271,1.6160536522814029,-8.146879382722716,1.8892523855840282,-23.931437684607147,0.31217233738824257,1.7748732058419163,-1.4110855363104977,-1.525644220757663,-9.501995781673239,-39.09104005980135,-3.006324568468557,-17.977584627569048,0.16183542317285626,-1.0134730194515176,1.3699869046133775,-7.973221819544356,1.2706420801454061,-28.474403588754672,1.0909241869941497,0.2702698406609667,-33.74359361309172,1.3153540062000677,0.7947033982309097,1.5477557251186806,-3.9532248489520425,-5.351535899922922,-10.308549666284291,-4.064042949486343,0.569710356155376,0.915582632728051,1.044865420757274,-5.883148209323421,0.6373268068504854,-11.963497671193846,1.1628072011165025,-33.414541356121134,0.9973131331869107,1.237586600289231,-3.1773372991691087,-13.357180461438498,-12.246786781166891,1.063907094026061,-6.879946027247615,-2.46879265249138,0.6717532395666521,-12.32169643822454,-14.386156708503728,0.7384892029663552,0.5143033733484761,-2.9616594130734804,-7.227167573151577,1.157600573686143,1.0747822420669912,1.613862393253713,-9.372020718541789,-12.80605427241656,-29.321708969263888,-3.0790673059583824,1.1467734824216986,-0.5371123219059561,-0.9639507764757975,-26.872669351734224,-0.28338818092372886,-88.21263998692565,-0.12806489981837954,-1.6207744406029576,-15.660161819208941,-8.654618354922613,1.3856337711765327,-2.640021123729247,-3.9655450466643747,1.4458774772364462,-9.42685783917938,-2.6499019436001587,-26.584026732942814,-8.655941049529623,2.035655315045046,-7.508666099888288,-0.3037022847725823,2.1559025774354095,-1.2937234020827724,1.0406922085703814,-1.1415371882855374,-3.009466851913395,-32.94180986215053,-11.548069365124128,-7.116472381716466,-4.622464340873842,-39.79886662413723,-34.59182148839999,-7.331268112457984,-6.981831168524797,0.41584202799325354,-4.287984822582601,-5.698083596643228,0.6680936757278095,-5.460064464806425,-46.250820015687715,-0.6212435595995505,-75.56713831122178,-0.24202250463957498,1.2547497891002954,-10.42099218494159,1.431388369837562,-1.1898604517675286,-14.073148725969043,-49.08152346662899,1.3558075755052772,-2.057884338752172,-0.905236350203777,1.2676007318137272,-0.40194618007253746,-69.9331866085572,0.24601820428514287,-11.289968480941143,-9.686693339189485,-4.477978386113556,-6.515930328499856,0.3508045060900127,0.14710975803960524,-0.8889577452378239,-44.67056770862173,-9.459913717748023,0.8426039926066982,0.9577303165300326,-15.287136861672426,-7.691575303996734,-25.350265614952594,-0.05144268605813762,1.7094793928471341,-22.88904213122679,-16.582450955871067,-0.6083317864795825,-1.9914344778353192,-8.991634517195337,-36.87547860137031,0.9155759989254664,1.3431516654982805,1.5614521635555232,-9.390344360376647,-32.432965287845676,-10.73488413811897,-4.786552584669188,1.5496112958889658,-6.77338145650417,-5.675741577392561,-16.810369231331002,-49.21376178231858,-6.238054471074928,-5.704625993963598,-10.502152276970303,-3.150279791800635,-15.54536265862485,-6.5227807079929665,-11.364386452117452,-4.294025506043253,1.4099725104997396,-16.24293591332868,0.6005512092658676,-4.347358555640329,-5.8264627228525265,0.48190563598717295,-6.737465584327705,-15.824802909304509,-4.460622623688933,-30.436128966252447,-15.712204393040468,-5.451938643559064,-1.7976583429357227,0.31587594407870795,1.3384935433072789,-2.765254855009531,-6.406431311578126,0.43464277644555427,-0.9747482550622211,1.560524177940112,-44.82327210961,-19.138272394669404,-11.293812604083813,-10.778092950362161,1.4927148775806125,-37.22207448977191,-3.6087648396648584,-59.86309278683314,-15.479232490936116,-2.650018262677604,-0.1255142725765035,-8.736337740605807,-4.638025594546342,2.368842922554343,0.8789795234693623,-20.61006853739277,-0.9135572212851633,-2.695640656674259,-0.5851315187461612,1.2432099410153064,1.4313185754922066,-13.466982221433465,-24.403669993636445,-25.110156165779085,-3.896122413171656,-42.63287262339387,0.7138445685817039,1.2346972733703927,-1.1772981709919685,0.316538640664632,-1.0009953845474597,-15.615437424211695,1.2865026607244645,-4.239738187793101,0.754812920912967,-36.43616013525375,-16.50018286540001,-1.3653150647736174,-6.024260072064735,-2.7098803797799196,0.5658751705886687,-37.2509460829596,0.578728519908613,0.3438164713433429,-29.8560513636518,-1.7202644159046323,-3.147020168590084,-3.407764066845978,1.1151592310448426,-15.197225918303626,-7.376287004805107,-9.638967482209152,0.3059712076633416,1.5061287438955608,0.6801646251848612,-9.015463198988309,-13.167258758177525,-10.334207892149745,-1.0966058867677693,-0.43440469440030327,-47.560675750682634,-3.422029404146407,-0.09713177769288395,1.4358638254711764,1.039212764245796,-30.8670553632912,1.5472895646822225,-3.6009970228775883,-20.451432923522738,-19.64960822473205,-3.196753682589637,0.2558095679358461,-1.578797358460987,-2.5521534997011206,-13.516890184826092,-18.097180421555255,-2.4372819330190345,-0.37958938338397985,-5.580475209818967,-15.698997963901743,0.022473287551689314,-16.560594721529576,-7.734152113357535,-8.949460416521891,1.637205977953919,-4.716592354164617,0.5728166500326872,-0.38676610382432264,-51.772817967079206,1.1692016953019608,0.9290030852756206,-35.13328049455658,-11.09657763446571,-0.165575647916111,-0.3133376884584296,-35.55147272054279,1.432808500737663,-0.45992213560866757,0.5082102737501084,1.252615182056214,-4.012400782816861,-2.686833049503989,-25.068714259259842,-7.0286887104850475,-0.012670318947653136,0.7657280416871828,0.25025524723548687,1.6040597809626325,-6.886098468542507,0.4137582561546469,-4.078777513414417,0.8928524885524798,-0.46475064518194475,-3.1233397468488056,-18.853469080498005,-4.881973968477348,1.5447027870093715,0.3474967036708745,-9.844668798837214,-29.322642270327997,1.4462271019244897,1.6462109810500851,0.5770848300028519,-10.837019757690594,-4.217389167272818,-0.5679575547810582,-13.093825194939024,1.4291881063517085,-0.10527878756137365,1.1288293746160147,-0.9020671396882305,-0.4105987837904954,-19.791646833337893,-10.910110451806265,-5.696400676555717,0.9492530509195602,-2.9525933190302958,-6.6411656036239375,-1.3036906316552432,-22.778361790802858,1.1888677794759044,-13.169954502472581,-0.13858939849481366,1.0399019715735909,-0.5097651700603025,-13.793718015577381,0.5024776665245669,-14.168291361782972,1.4901330913123432,-6.808509306498245,-68.77446707042992,1.1068912756362335,1.3904095834328274,-8.117564534334953,-2.1969101296418105,-15.132908770721906,-35.73538432291463,0.4742888435714856,-2.1772163510842555,-12.229170338190285,-24.723025596868112,0.2690263265369883,1.9997184001019077,-2.480521573190434,1.1496025247819475,1.9249296521875017,0.7021436113009099,-2.132601697257874,-1.9946084176563175,-4.198099926127462,-52.51257599665682,-11.885325800144035,-20.07421125736784,1.7549893414816298,-0.9767993474421108,-3.1106952194822717,0.8506543210978976,1.490970411672746,1.8306384539193594,0.25018998314730245,-12.585108928113417,-5.927254076346948,1.443440099186865,-5.367137778227141,-33.75225551954399,-7.608591448044708,1.3119184027886261,-8.44132594668445,-0.6429545725273353,1.489670776604234,-18.65958680702039,1.3131435854848978,-0.8866029684012986,-103.38118349621168,-0.4457394246203745,0.5042250309832972,-11.155137185851942,0.7840749041009523,0.729675537358784,1.1324675019673218,1.4007884468934781,-1.579658363882971,-0.38684879358949065,-0.8197996012059434,-9.537510102049529,-6.898273916625843,-5.933384231464933,1.329661927491726,-5.5648007035608575,-5.596311903338495,1.2448000160529846,-25.678952503444656,-5.694709575877225,1.1190036454517045,-1.4466341223656238,0.6983657208155636,-33.459644538895596,-0.9364741082539618,-12.19512890880639,-15.549297083646652,-7.384681415737484,0.8813413673602781,-3.2453043985043197,-1.1559466172980204,-13.6437545286699,-5.827950479310374,-39.98713216613312,-0.7667341589607832,1.0669081433189782,1.2030339763555737,-3.969941475484114,-21.636746894815715,0.9517817348203703,1.438717883985921,-9.317350884495246,-2.815425479542978,-1.613950157032693,-10.857127002995034,1.0741428646839979,-41.35690984623152,0.6016163106859791,-14.55123985344736,-2.394184286071673,-9.301700604608623,-6.48058045217244,-14.118271929157569,-52.50837973083812,1.3885699880725395,-0.8870989998180123,-2.8065091950138825,0.5824830923608117,0.7525531415875717,-1.0415590650279594,-8.110961789700083,1.496847177182894,-0.1355114787523335,-23.545575550705532,-2.7794974794032195,-4.46844454099606,1.1865810666291001,-19.835893266731354,1.0647080955121293,-9.73703320301911,-7.63126548976783,-4.721673011024741,-0.4123959673587736,-15.247754695461786,-9.669567243985071,1.4552121018821573,0.9971920241356496,-1.1707236857977477,1.4381051596171694,-31.76305190921363,0.7300772949027015,-21.950781404518775,-1.049402616306704,0.30282011164462297,1.270725772735325,0.20013859077693263,-1.787483157264647,-26.624063064265357,-7.655943467604462,-6.968170529042811,0.9217052988348469,-23.512722910618805,-9.670808303577095,-1.4121884199297186,-2.1589617967615697,0.919386672692768,1.2368216592613859,-1.4032877694243546,-1.581460329975609,1.654789829165567,0.9669802869129303,0.5685826194681556,-9.63351575781765,-21.166809348905357,-11.257811862845234,1.2419207519773652,-1.0153836629486013,0.3085214034948418,-2.611004839043082,-0.407133953145959,-12.167516803864146,-0.19934549958686043,-5.604338482727049,-16.22445992050981,-18.934408837313587,-2.213233655690385,1.271666644330408,-2.0823063297431923,-9.553356511675993,-4.767696196324874,-0.44319830276934313,-10.617606935108839,-13.755604247167888,0.8655743882562945,0.8079073691008594,-13.420202177985262,-5.246357236588143,-9.305219607667564,-42.74366189391043,-3.8742489027514933,-1.1344386136643085,-0.40715893165889705,-16.40970533344549,-11.267907721692382,-31.55785432256922,-7.161973852960685,-3.346285407645947,-6.238520432772605,-3.65172448803506,1.0250975231894042,-8.904606114755712,-10.717044085657875,-7.944529468487898,-3.4660128485757564,-10.703832476530836,-5.650057340903491,3.118567726689338,-10.042660687415513,-2.443124677460326,1.112753314431236,-2.596192343520203,1.1766067877272741,0.7213137239304137,-4.647396293198474,-53.33926050747928,-13.397232054981679,1.1323499279910123,-1.7505126145630339,0.5821659395417713,-0.7307781957469439,-4.288416154941116,1.3189701898500097,-7.596314065590127,-1.9550286312360137,-1.1815968743280014,0.9103418012532574,-4.4036974635333745,-0.8930304325821514,-1.622850091089287,1.3341799538179897,3.1980566229117278,1.3267550297220123,1.4753097327366447,-2.6147116770602845,1.128616497466778,-19.860598230114466,-4.850312217628293,-7.1145126271630685,-38.48771625716329,0.0022825236911931945,0.8707770808695825,-10.616744965959448,-9.989461492355884,-22.83286834341407,-10.308654955283082,1.2558767326847864,0.2965505086426261,-4.957145986128744,1.3070291766720958,-0.5493881506336891,-16.545650250391493,-0.14130163623784942,-29.573370119595424,-3.8862916662604032,1.2343330532082062,0.8744754558690655,-20.273744617674303,1.3767400740788969,-1.9457476952192794,-32.25936105908265,-57.96805861164387,-0.5873887488960468,-14.54221685343656,1.0409032379912888,1.3526468963515492,-8.309299004408755,-3.685191454123161,1.511333934842646,-2.708251545439798,-9.583808943226707,-3.938066031416657,-18.590547446416206,-0.5329924112258149,0.03566860026742935,-22.28050772766299,0.8031208373918854,-8.192414831704193,-8.883326911944074,-1.5249572268226625,-20.9270668417504,2.6779713302685497,0.6776346188036619,-8.965177453569467,0.4899902849695983,-0.710927236390059,1.4476143459103583,1.5075895937842392,1.6060868345082975,-0.9124259374237336,-17.881734503360203,1.1214272422144882,-0.33259966685870745,1.428413235419212,-22.816742818552402,-4.051382942277915,-0.5423701992355512,2.177597207419243,-4.77684475431566,1.3804591668835013,-6.608223122597018,-2.760641162961436,-0.3985339142661575,-2.893415585159782,-27.31810254786415,-0.40848702670962567,-11.164367570158227,-22.771956966844876,1.3137238279099184,-15.01654195987689,-6.398746207026023,-4.5870765974534695,-0.391962144900182,-3.4635756273947336,-14.26729592134207,-0.2725460038296377,0.3092754805336475,-13.181686885320591,-5.0887092843049135,-3.552603969750217,-46.47497592816374,-0.703289711304762,-3.0279808909107806,-0.2929011790597005,-31.351609521336982,-8.390746319285222,-23.91420951104809,-5.800129483478576,-18.398291223391066,1.3784690551206578,1.079598303169821,-1.9010460649060965,-0.4804283312374569,1.6621927534993386,-4.626315665703112,0.4873005530298955,-15.521179102283355,-88.26891868752767,-13.871900342794483,-8.44053801160709,-0.6826457512949871,-2.0747392014084447,1.2282667531302915,-4.2371564959714885,-5.729654841192861,1.2488848012824039,1.444901097768293,-41.44719293893638,-12.558726664678074,-2.246953730634364,-2.550940279344858,-13.111978696534138,1.09426198106042,-0.05980758801581754,-10.812537286334084,-1.8914981671640603,-0.2264728378353138,-28.180745951558634,1.1145595897284937,-9.365303604554178,-4.554931937236301,-6.783744556878901,-0.981331070240389,-59.71446690821061,-31.618000127151035,-1.9129340651924625,2.927750750227772,-12.110024783015017,-7.787707198797565,0.3810500078500927,-8.608096908835607,1.157930577965933,-6.165257240248794,1.9487468905838174,-14.319343068669344,-6.568774553165564,-13.520767620255953,-1.4929337895207042,-1.5601137802632046,-3.3794045818234464,1.0230046960534884,1.0092254943327312,-5.25565445723964,-2.090408607734868,-10.363352509664358,0.5903545691434844,-2.3930098177663033,-1.373114057619079,-0.01879044571749766,-0.5140552240522389,1.1042327663663336,0.7968440439528361,-22.347263764954246,-0.6150206078739533,-0.1386809639173836,1.6340355444223886,-7.426326766626892,1.189867310387551,-11.94398502236326,-31.625586338563018,0.8907224796788269,-0.5431504325365797,-6.217545750068945,-3.5085015724431816,-2.212988547282509,-35.013049905789636,1.2521422887197882,-24.55194516248622,-45.22824677317282,-3.385689120942266,-25.84327820035488,0.7597391794961745,0.7321206618939069,-1.3281207602096536,0.8515595382781269,1.2680093014538212,0.6349338213422269,0.08282236480973859,1.6750762999433286,-31.504900271365027,-12.67989719162773,-0.6499659859604003,-54.72311843640832,-0.1353180612496514,-10.698748931184912,-1.6538788014183456,-9.801128081417666,-3.7877448752012595,-9.458208422522024,0.9193122237559925,-12.298845697856878,-5.096546406591206,-17.595666750834766,-23.7266264247284,-8.868140343464756,-11.750744694485693,-1.9592916381907286,-1.399960781795913,-2.0613681085136677,1.2916245816168814,-9.718100903075877,-15.592043314369796,0.8393180707645609,-2.330184384743684,-7.234213307834448,-4.785505619143724,-5.26571729945554,-0.6547022524302348,-6.131055516735145,1.25038363391443,-4.517762207234494,-0.5630761603531536,-24.854092556126467,-22.28020887433768,-0.6108782493194842,0.14764088759817273,-4.422944324626068,1.9738516384463436,-15.090175109164766,-3.636360708258071,1.8055364505338916,1.2683201132360975,-34.286061288661585,1.2610459719702627,0.44548138879368393,-1.5126701036026833,1.3838128326842656,0.23458321319599795,0.9328874425482225,-12.060699518165853,-5.804938241176153,-8.524516095233938,1.3708989488947783,-10.618472062242104,0.9845909988544497,-7.0739984648925,-36.00683643297669,-7.837669445974891,-3.3564629466464435,-0.5983018753452676,0.754510818073844,-10.461380759402566,-5.692647833227442,-18.746179302236904,-8.110226713327034,-43.644391038196446,1.522420636125723,-1.2292897936644867,-7.930931772011874,0.5940441497986457,0.3930378151482561,-17.790385395301826,-0.7379459744828356,-16.461850804596295,-5.359741566945537,1.2858743112023436,0.7269301162812467,-3.432866458011357,-13.537035694128264,-5.196567682759284,0.25912912807663135,-1.0199669784317038,1.7742329005437043,-3.5926618072343404,-1.368543697020364,1.2945298081951564,-7.681717830816373,1.169643250104727,-4.030000249725184,-8.968162102024325,-20.94270099297973,0.8337722561747887,0.02971191197651546,1.2177832014469487,-8.645232064147304,0.9332412444064335,0.6991557521436933,-6.185678120243695,-71.77337035608626,-0.608502840855115,-0.843720725008446,-0.7549917282197427,-5.907093350724711,-8.22079177920498,-2.2824363817963382,-7.303107006232337,-41.63075588600512,-12.05310861544292,1.2875844271880479,-37.690590774632625,-3.4792107521320172,-0.41598219139713954,-60.323051552717985,1.0385450939930605,-4.756446364136096,-2.4986513730941406,-3.0607013007368176,-17.931336273820413,1.3117266580174545,-0.8070244708960259,-12.89239735795785,-22.618951350351512,-6.616703044069181,0.562785362684497,-11.035588526166265,-0.21961398446927483,1.2332077567768698,-18.5271342614211,0.786909745839766,-20.386388734833666,0.7720833654146864,-53.36873936977566,-11.357701694042776,-1.0388412426042857,-23.175174154519723,1.8472936872131882,0.8788719285773167,0.4291083404412892,-31.359858537796764,-5.186619103993409,-26.959049092375682,1.3181450069347398,-4.179449194225716,-23.775499093549932,-0.2055399202684267,-4.931518893255864,-15.332404188006613,0.10267660298258541,0.5525352024553065,-32.93814298967921,1.3109619356823352,-9.401886243158888,-11.88716961829761,-12.751664308170716,1.2938855010019388,-49.51697353754641,-1.0583573752534132,-5.577616207575098,-39.805896438443966,-55.75864942522459,-65.49831668607153,1.2734819581867438,1.7735256913447444,-9.046313563229178,-2.5443437021942255,0.44254170534604453,-4.14296709106977,-12.921933843077106,-4.007950326194383,-39.50058899953192,-5.001613217504284,-15.973937859721048,0.9506253848642907,-3.57212197124641,-11.425846937046769,-10.952051161605587,1.5844877228518428,-9.297804486736279,-0.09472662720492497,0.534299878061558,1.3390344139115684,-5.104545343987003,-0.6525186414507869,-14.589011275196347,-0.06616219416709468,-7.162831687697618,-55.01460537721334,-5.267696883500225,0.07717205287013984,-15.904800757411913,-38.395386699662666,0.045955034105896075,-0.7167073022186337,-8.863977563499596,-5.407569801235701,-11.591810062385854,-7.40351047007291,-11.427191261371341,-15.836859497232812,1.2177421929102195,1.0860489256229584,-13.414407700397842,-25.198762815616398,-27.607406769692368,-1.677033158359512,1.5008315626773006,-43.66604432572583,1.588621069594292,-17.334300272746706,-5.455889030584517,-10.461341012950633],"alpha":[9.687227465054375,8.366378663556887,0.8638791265279844,2.0801470435435876,7.791970837665765,0.9706664646898,0.8286429161818032,7.0321795232429345,3.0738372315210105,8.786532244161048,3.789532942830849,0.7194095339892126,1.573777856932479,4.432322453886504,6.416115844814185,7.54183502401796,0.057529103629463396,9.921032025475585,0.5530401285698949,0.4583984666518415,0.5943304256334292,0.2620029968857951,9.534052791418308,8.891200424312995,5.913454664398898,7.252997041421432,7.588233673799798,4.176311704182116,1.29942255321982,7.420845165706624,7.303059591755911,1.7611981654917908,6.810267029000827,7.737194210595479,2.664553516549981,5.3516176837061575,9.03552489328175,8.332275556724323,1.536500202658524,4.340732055068608,4.488643255925413,1.432180335867721,0.31171831268644423,1.6906970882508587,2.913770067851147,5.136871361199908,3.2358920474159514,4.121603109362311,7.20537803774196,6.769157076360182,1.1629536075241442,2.208110562701786,2.361321369799856,5.270242444983923,6.5633817972410835,6.537032172640272,6.077185467191166,3.719780361361007,1.1157289427295036,7.497852403503917,9.414476796192723,3.3869232865540666,7.63790178397471,2.5977099980579266,6.748863276570449,8.568150276613789,1.6959622904817429,2.6158368519093878,2.9532033812221004,2.484203836325747,7.492337811742034,5.888608966283108,9.521369008749067,8.97232711286817,6.779951171028193,9.560694196476279,1.4244822190528095,4.455213288533015,5.436997219927752,4.630737295622829,0.15184783462763196,1.3901710218749708,3.491161075868763,8.320512280712219,2.5360702530530155,1.3344999685771852,9.688320451516512,0.5246604291012003,6.03603565746152,4.222339274350093,8.097674758922235,6.855742149894775,8.302577339425874,3.562334437387089,4.649447288778948,8.251082893250754,9.62725816110645,4.708804736182874,6.495554564274952,9.164155069174862,6.152751677768964,5.131464139623951,1.8102002894034341,1.1901992415007245,9.012324291420805,4.883676255784605,9.10768871715913,0.027921437277096395,7.191229347251147,9.926996655599645,9.76444824826219,3.852553780967447,4.931189473613184,1.5064517909969455,2.515693598043769,6.232540357513607,9.628201722145825,0.0010485962471196153,2.632609557776935,9.48006852499049,2.9996345936121993,4.741543938150661,2.4798968095528795,4.655386035003309,6.341800501712019,9.588932509592263,7.050263802687276,0.47958638517018093,8.87939035771015,8.454001360137113,8.703763724481878,7.584830279984334,3.52079160273419,8.837660130208146,9.311438543414264,7.052638854842723,8.857530469931177,1.230082443449767,7.424652144638719,7.887110698694551,1.2077432039194047,0.7942960302559099,9.937330738852587,4.618995492665432,8.345638045058676,4.14323649849478,9.483861149217148,8.057894285228986,8.979117303829735,5.340533713043367,1.8181224354192982,8.37582728073147,6.13761632068975,7.556714463460514,9.446133247310415,8.211538665498171,6.626325304070595,4.86284517605339,7.464709022983433,6.081949945525327,5.015505661650412,7.836501466353827,7.971655974231244,3.484192885837334,5.177465236606862,7.664441375123281,9.744549343669838,4.942377371573723,5.368004530656469,5.3662231980286235,7.702169188891499,3.4080260217745906,6.327602304678965,1.5725273580275712,7.150451702400931,0.6051875718442834,9.889462291415587,0.21456287721832945,2.118490761419569,5.939881715542801,7.663888763931245,7.286979893496548,0.31912363650859144,3.954134031145009,4.995070826198987,7.393563652615769,5.779439983512531,6.731222120564791,0.9186425857002933,8.812663108029497,2.0797024159055844,9.333720549425495,3.600822188289623,3.8098980932844606,1.6115341286637985,6.847888237190793,6.440722629137936,3.5968765611966247,7.436646336313284,4.764199622325201,8.659450312412345,6.902437358929474,7.833613043415493,8.60592501700675,1.3567411544181818,7.322151298605835,4.723126308720847,0.48080699654240444,8.800888717955166,9.922374634076709,7.746472504578059,4.541818011768461,9.58445193662138,4.839881095126999,6.395738430125737,3.585454803454615,8.38268302199192,1.2271375484389457,6.689593765386805,5.460200007208973,2.9177964798660594,0.5927035727065921,8.370555662669222,0.12266732917222134,0.3182876256201417,8.295680235239685,4.796375223654743,3.0557705866247176,0.015891197432122972,8.747993366355857,0.3879640285940522,0.9518461889195007,2.1156696787936657,4.690377744543031,6.762513490278719,6.685278462750568,2.8386952710252378,5.162113556296393,3.0768873136555186,4.185872912067543,8.884724323723654,5.178621595726898,9.446604895797844,6.063615882017126,9.901132765231681,9.882977742086984,7.781177124335712,3.012994879048967,1.0356573901712585,9.38183252652922,1.326027628794777,7.737322051186821,7.938717039590102,0.5367459077182479,3.5709486274286095,1.1498230313745883,7.234826962603124,5.49290849475941,5.035026164232312,3.46694547582981,9.388964117982148,7.4881974351866765,1.9405114562977843,4.186439056887017,3.6003532579548003,4.903242291485821,6.608234400013542,7.83029426997585,1.633322648138491,7.797450038778962,9.541847552406413,3.4674926554407826,3.7203669187443644,3.2159503644006127,0.30554554858555516,9.754069435252626,2.726768117103755,5.733766097554023,8.82333786679168,4.09222852187328,8.05546833047703,2.3164845910800103,0.8614557649848109,2.8976660955248024,6.914543882318229,7.490669706010264,4.142804998361614,6.864297584782532,0.48812183778466967,7.066573006787467,4.567257466858239,2.820923281666319,9.580649061652887,5.074561117165082,2.6616825659615095,8.519639628433207,1.100265743950739,2.769061008462421,1.0040551115371588,9.755569145928757,7.314325078482355,5.854199899163901,0.1358228099896075,4.452479170693824,5.204511172727006,3.0834050111230593,9.02925549556315,0.29286302634636385,4.379051698294123,0.9811553381187887,7.7558604988225515,5.25356764892792,7.941552226082065,7.859852565581229,6.034124234928333,9.23519076455907,9.077451375080717,8.265954087768426,9.592659102963232,6.642224800380121,2.6070833844335795,2.5756587878190085,6.6664709528110215,9.88503450844187,7.301036029315446,3.215398787289494,7.829937839663666,9.686609439389418,9.705786631422491,0.8430896437166036,9.05324024579566,2.9099563078480295,0.44311884360299425,7.481802161455342,5.293549888221689,3.163183681204489,4.207897935967093,6.771407158910538,9.665468704320222,0.04264478876407907,0.6255476448190511,4.148333056580597,8.143143026129083,0.8113292696932484,2.871354962608068,9.522372370872759,3.7613026657305637,6.451121102502697,6.065386492159625,7.922277938443005,9.192743817134987,6.68752318643989,6.907618470055812,5.023490467950977,2.7771967005410914,7.571902133107471,7.670231618015881,5.0761726307358295,1.3894617710549406,9.495500715214177,2.6703796471735552,0.11307822837283155,8.977254155570211,4.116726794606748,6.615009713835647,6.999113496641907,4.195481290516129,9.45371655640043,8.43892921399382,6.591838474262824,6.0500936488465396,0.6610404616202104,9.372106472203019,6.954439080360433,7.095184563109987,5.186127154118479,6.511374117999134,6.54769865817144,6.4452841536399985,5.507829804157874,9.272926239433483,8.232008297254993,6.124936768361479,1.795290504765923,2.172449303552808,5.895348790286745,3.479947708817992,2.6730218197001143,5.398452671091198,2.5375825442567357,0.3311147031361217,7.780647229942423,9.469238727264722,4.9455686739973315,9.606295340206026,3.823637425968598,7.947189451845745,2.5090388772018724,1.267560133536516,2.0970677691806605,0.3988901708393455,6.195945215906078,1.37452715512568,6.586958095537662,8.621084126837337,6.476904806516746,3.6055611775705265,2.9827675772997964,1.1445022762412749,2.5103043211736575,2.7544546204195375,9.065615972681652,3.102120816327729,8.164940144960184,5.062296019700032,1.3411598145658221,4.990969946853299,0.28228945209092915,9.395591141489705,6.534758020317577,5.35095350923414,8.66138434470824,1.5542681468966557,6.8055277982048,1.895343759909034,8.591699849371944,3.114161398526629,5.936161368276887,7.846711656193417,9.678639644744901,8.858197097960943,4.482491154679378,8.97124295072282,4.107020268864177,9.086998304663712,7.970594928436061,3.491396477936668,1.516523154018059,9.411235015963227,1.8644954068871278,6.1863490673739925,0.6615270082315905,3.9388413960981628,1.5611182862274742,5.4184994911483475,4.9671320763351146,6.804317302252246,5.9373985373328235,8.948588091458562,0.43769816445003995,3.8974029638856766,9.61269547524589,5.417737901171971,9.522101064172809,1.476819052199474,0.1458801647587915,6.386228840962804,7.207455089565691,9.40681354440854,8.429117894116638,8.856487388683977,0.3526273122163359,8.235662123828256,1.5590577611803158,2.1224190206551974,8.438688424560134,3.655397468374555,2.2462403622651728,4.947317896474599,1.404461654729794,7.9429768268018375,4.0169178441515925,2.205338602981417,5.6971610873801275,7.838593426216043,0.9158187768807258,2.1990412523113245,5.397978342518835,3.598539243324632,3.3678721584763527,3.2318695904134387,9.266430616292688,6.509431616803392,1.0748736119744229,9.545417846903666,3.558104757099898,6.224538647978171,3.486574777663125,7.264889113919589,2.3705169962526984,0.3463363952306353,1.6304632799795127,8.17933381574983,3.6754220614280353,3.408784711826267,3.139814746591434,6.294780755531928,4.04251979010909,7.794282092913393,4.066465883303079,8.191334594838885,3.8786612600045745,3.4030134960188185,6.614707844168281,3.035399972931432,6.990928359317019,8.79748274182365,6.6062078623950775,3.844754603222671,1.2608891845426484,1.3490358534152458,7.411639282596432,2.9996895625761066,5.4013897738317045,4.1568989479262575,7.958046999532897,4.780386185263181,5.740291405381637,9.902845851159025,7.446530959940514,8.60024463014196,9.190086030229494,5.448828324366588,5.819437457605403,3.975884566441348,6.475036273927159,6.556722466643839,9.88886652213086,8.981365077723284,1.7000094214928119,8.98395403692745,6.8446580628976506,1.46500346799453,8.300472291751204,6.64124698931543,1.5055645433267029,7.495486547530826,5.563581572653327,3.985688070262583,3.7688004431208277,8.634992370843403,4.16668187117311,1.0824753009933108,1.6609495808645391,1.431482633203065,9.245894726784833,8.393434669048123,7.478082564475901,7.4071722607930335,7.373565499944192,0.8069198809559031,1.0402369213469953,6.780632509508924,4.167686492452214,9.186431042948149,7.646545095451842,9.985931839004131,2.2024472779964865,3.1514319288543824,6.872132804197692,3.6898881635406977,9.771003394664405,7.379271209866145,1.1393970965941813,4.387493139240761,0.9982007866471276,5.676588447081747,4.0984608773144515,3.9392451548151763,2.0694241217859743,8.810986039615116,1.5582447781802844,3.5864024215718104,1.1229633837602582,2.5701459631707335,3.559407837683759,0.9325938621844121,1.693263362181856,8.127941022013554,8.005557554272873,2.100868997629959,7.466227665427107,7.175058146709132,9.556879118493589,1.7130499404095079,3.278899814348577,6.938525070846766,6.10290888569023,5.852302494958472,7.162916959345937,5.555872933750486,9.600671044740379,7.832369097078162,9.617986112169143,6.528806823962743,5.97220861957932,2.938504445021388,2.538959257206823,4.247340576498386,1.6522288414136521,0.7490334839462043,2.404708278083716,5.083239697395419,2.21474522211633,6.725003953881341,1.5837511516199498,5.555930061066638,1.7218540140316874,0.869237873507509,3.620535913047511,9.38479825169841,3.7967117451172316,0.02089645792531236,6.69758969541951,3.0790249832665673,7.275287855174208,4.069571211435299,3.520694215619513,7.342993720453594,4.764212932607297,4.607407882031042,3.0592305276101794,0.6343807419797054,8.620173753393276,7.421504062687161,7.757779983501242,0.5754847800772533,5.603377298881533,8.052730409456785,2.5431692925449068,1.6363161959589578,6.087754247571928,4.012451997097902,9.724845832023094,6.297466983307434,7.788008160516851,1.3531545960824842,8.742045068480735,3.5570203082534246,9.132859254247467,4.087073231636569,7.4878410916834826,9.235517680870602,3.697874928735425,9.763965294310193,2.720259135816434,4.047892640723085,1.017736527993529,4.425485265171394,0.15715686458200206,0.06325544415894724,1.0086147163978554,6.581160148415237,4.131165660486548,8.797438488518317,1.715082925837239,5.730704081744033,2.102666805876161,8.95656914645153,7.336100722944776,9.507948087348517,4.030482971795113,6.1679955019702914,6.258649600371989,9.738795346399797,7.870165334072736,1.6630312919227985,2.868144309965468,7.407293693126363,4.958386026578583,9.821458970189576,8.34457633188908,7.949675877509619,2.1740794036885602,9.129697106562332,0.856980855537679,2.4817837767845985,3.326256460734298,2.7248940081415918,7.818115996287897,3.389910705030008,6.982124362260818,3.4548065086374624,0.12110853311128045,8.146641135614843,6.9590171513413,0.7568914524084791,0.8419259888489106,9.08590793062698,2.271925938719579,7.439871264271522,9.714609268692037,5.152302574251446,8.443247306258165,7.761783062434109,5.279716577881786,2.674958096032134,5.016818737456004,3.35800078585643,7.509370153579765,3.6170228271853966,1.7306790471679157,1.8214963004675089,1.897583490084671,8.815340154288691,4.264530365247074,8.88865760993658,2.0847986857175416,9.291326609283775,7.815054478848529,5.681834749565051,6.183023776627785,0.9964431490056702,6.4002288810697205,5.403279890535271,6.428999336488694,1.183680652555017,9.604752014460164,0.16878595711158795,0.28800061113685604,3.508335999078922,0.6589119740707439,7.640316206922899,4.680164029303899,3.1540436022663476,2.0647079982708116,2.7873665749073706,2.463273145696381,5.937647261058405,8.301993571263848,4.879589048737023,2.0249355189431006,2.543930137645962,5.7512146023104505,4.1181229773894295,0.5387600136200033,4.872670216175841,7.93005485762502,5.053253251964422,0.11866211065170384,0.8816255560293307,7.349192406303904,1.3396841758269806,7.505052560683363,2.3457419166249993,8.542604006941833,2.982056695404578,0.964181232015684,0.18756427551263943,5.291125988901673,5.282624029579052,3.2121942245935164,0.5082787746838657,1.645995466318535,9.269822632238737,7.7806281838729685,5.541973465893813,1.5958954364011868,3.951587137615926,1.8649680267400615,6.708962905228278,7.729148704610973,3.920313920100913,7.576683609722372,2.204746754278848,2.773987495048764,3.608492794841305,2.4582420221641343,2.567458703793448,3.8569726009979677,3.979311232763618,0.1930736938601174,3.4504573679707717,9.875022877696281,0.979997802465733,5.507558561408221,1.9796614741056473,3.2496173872315848,8.527185326674907,9.813770483595876,8.349494817091287,9.435571214263067,9.114484421239403,9.85607660553687,8.497817358346255,3.988403209521656,4.486187961595527,2.117194157747302,4.106179449700129,9.703426222720273,1.908431173265046,8.167604321604777,9.540079736316567,9.770885237036834,5.775252711457497,9.05227621253257,9.231875433325884,0.8561255041033489,6.664467210644888,6.829317090877797,1.9599619274974711,1.033770359833015,4.7931515908056515,0.21135206429105713,1.9532798869238999,8.150576984924081,6.506838558815831,2.958992290677105,3.229691883656922,7.153646123110353,2.3927845705312456,2.6911998894677547,1.2043559766620082,5.960431286849374,7.068087946183961,3.248728248764905,3.3170945058082024,5.639561525539034,8.329550526642269,4.05474938039305,9.787857984240997,5.096308905239136,5.814811056256057,5.135548016926467,9.333491694500298,2.7349328468235368,1.8799063161358376,3.5165526646345824,9.532163442304597,2.4473868084480332,8.854459018469555,3.1827474873419526,1.7577664379359614,4.735402223538334,7.909338929086949,9.867853933057123,8.619157043996031,7.479276416941829,0.9726341519906723,4.102514656010294,5.298621348141395,5.888371897044795,1.6410083155830546,7.991284191534711,4.9331802247795675,0.5864286709897559,4.27193036381289,2.397955025686236,7.272542153059249,1.4693080768237454,4.538338612951018,4.6879038221643405,2.579995242294024,7.177502170265512,1.1867456747299632,6.971991648753855,5.460388326003054,5.72073479529617,8.341235879937027,8.182192012007516,6.252678104698268,9.452922376725335,0.14247553677946057,3.1841211036446104,8.59535753002355,8.015572253479043,8.208861890823304,8.545276998500098,9.858132528510374,0.3784944730058526,3.89206067573741,0.9982871539994664,2.321317398637417,1.878157436749679,6.017382959462092,6.30064555975713,9.844525731019258,8.069292714143428,5.661281280207556,9.370474239633442,6.194999269986394,0.9473420128364562,5.703796567572519,3.2735850871184735,1.6764539881077667,3.693934736527218,8.602738049596292,4.276563311935419,3.273771680143489,6.556773707737227,9.410430287150678,3.2470098511051293,0.6306654399793588,6.058490632989216,8.217561275742103,2.2912544457492445,3.5747945867756648,7.355796302613413,3.333555606139089,4.829144763110962,1.5359561379842468,3.443832562043949,2.5875371547091675,2.645065212383775,3.971602114978663,1.7507306923229304,4.541650324384465,8.954478801184893,7.85225669885337,1.9497711795357753,2.864699907580579,0.6845227396166864,8.276086174101538,8.159836783712723,6.063561385823575,1.8892757562254792,0.9347618617980769,3.921186166594839,3.8473207964805978,6.114088976958952,8.959260212441112,0.7075154105399939,5.284696167759629,1.8455865261903037,1.831681648390342,0.5293680123099365,9.404070447994537,3.517450835809628,1.4646922137178842,0.45961655135115187,3.7691291774339875,9.388365606665655,6.109920856567768,9.43975062504043,0.5093308691465936,1.2132844589133862,6.632674125024596,1.7124990957953745,1.529755280469105,8.582839796790804,8.981983987335278,8.806282526993122,1.2797853498702394,8.387999112034494,1.4257160892847565,0.8393773122541948,1.7620025788838078,8.812451400127909,6.009350756815042,0.21170438538616665,4.436741984457544,2.651185687359592,2.8751780436717644,6.837276057538812,3.8964524643827936,9.947437903260132,8.21343494898901,2.544685229327861,2.4589001468581606,6.306249130694701,9.256866162016399,4.491997825833214,4.343546960294223,6.327289509063614,0.7979936746387417,2.467768259170413,5.0470500110367915,9.67472807955724,5.527321350098953,8.669066856427666,0.7732067717565272,9.900420717992285,2.8009560260390165,2.1381873958714848,5.722865671163899,0.23988129663405466,9.785800377891933,8.139375678729362,3.1499130413368226,0.01643698879960631,3.5892803668910034,8.770741490049723,7.229387097689823,9.119668967319189,8.828975273579758,2.548829644588253,6.234310237144982,3.866896999396452,7.317688811276746,6.4586197542359125,9.61122733691412,0.7792262173593567,1.9066159813437045,5.510524059863009,6.932783724846452,1.1099574368328202,1.5655565178289366,6.794940061185589,2.8171526324628537,8.275546599433302],"x":[0.5526429467460041,0.45632514021467396,0.6936294729263588,0.6995848548860302,0.34230754436075084,0.20066666542148015,0.7519382590569421,0.05358840804885423,0.7826581775895127,0.3213929116766012,0.633913624350174,0.6603383561365053,0.9772206196030473,0.9199216527665186,0.5326218289715952,0.15070991979790227,0.2533473297892681,0.44637009814354767,0.6632967998306336,0.6263860126630718,0.8132851992389005,0.3203339029490093,0.8665238509831514,0.9899231009101841,0.5239767955598527,0.668131797995152,0.9928949048444669,0.514832703935767,0.17462653693915642,0.053685316390036375,0.8711771836280116,0.6609761843678756,0.4544950761291171,0.8584590410324446,0.24370688247575711,0.7234021301456484,0.6374732892566901,0.5158340923165206,0.37616684921425825,0.5430587674771794,0.005433465761802259,0.4980023770958464,0.7139436336483043,0.44900812252768163,0.4022347828446573,0.3803099391182887,0.9019614948662371,0.033363705579821046,0.12510154596588463,0.5117625914993948,0.7391294956037504,0.9232240850612266,0.4645035863495637,0.9991897330353257,0.2097597333291843,0.3056050003301076,0.4048091683793782,0.9642696517532872,0.5351620660272769,0.5083511800012475,0.391493245278451,0.1503224299250865,0.7171351175374641,0.07803232059965204,0.9213838321918155,0.4735955474011202,0.08779997990636668,0.33378677668903056,0.40738805685575596,0.6253115544211998,0.9679958521546883,0.6408457735152444,0.8527683441372835,0.23292177562004546,0.13455616633301304,0.3240544797790579,0.5388582740724337,0.2322184043700546,8.766754373734642e-5,0.19252606759064594,0.062065202802381814,0.8689506098772593,0.221274716200353,0.22972505853210223,0.10382992263912683,0.3985317257407217,0.7339580046085588,0.6867319864480621,0.03900874816533029,0.06564394269982032,0.46109686291242014,0.3931910741520206,0.7803799625491614,0.2528901568474562,0.002336992633968471,0.23955859023810122,0.9498979990473311,0.20130343652458493,0.3661564803326276,0.724191157732545,0.8310216795757233,0.7343250504023155,0.17328294460182825,0.4511391771773432,0.6677786744438161,0.34277055667149625,0.8457078933626763,0.5558016328113526,0.23811119528572866,0.5329724940700202,0.15820650787222568,0.69138584067975,0.2727014457985022,0.14943370634496467,0.03962338020410905,0.7489039403704971,0.045861855567051135,0.7042036692089952,0.5366242624714106,0.3200865269182571,0.3813787606765766,0.4916090045074286,0.852170964066431,0.4458631779678237,0.9972691340342807,0.5301056111640488,0.6567508766535108,0.7934522956851426,0.7893432481384084,0.23732366403724825,0.7289081362802492,0.6326677987220855,0.13529724799682175,0.8233434257540961,0.640150052115388,0.9276078729989827,0.8076862154087328,0.05185989287741877,0.05193652330002685,0.1693066401334944,0.04594356001216782,0.2599908942069413,0.36530605776484304,0.06412071636445482,0.1251352314955556,0.9789692086647357,0.8020220392358688,0.05757873538337521,0.8053343980919274,0.9365182608743075,0.9007851782878435,0.06350595032252881,0.8037472659752212,0.5261465126033618,0.1470745853524189,0.7425519491497845,0.5003176595461922,0.5579827425115214,0.9833047135526649,0.5208385035790855,0.9902050489642764,0.6085083755779674,0.34783372034642834,0.8400982912759865,0.1543649966920344,0.5612933928023467,0.8555329856997569,0.9881228383616643,0.15696050641794224,0.5939439051387734,0.19691351624031062,0.13767545238782364,0.5957977070082578,0.9850048226898653,0.4794514830824992,0.6135252765782704,0.054061232409178483,0.24683412307524333,0.5691400621478897,0.191571084031253,0.4593976630588794,0.5575286006092357,0.9169169158799495,0.7618544937630303,0.3387384959615791,0.3715780272267637,0.9146713893938714,0.8300572640631798,0.878604981628837,0.5606870114685005,0.10394465898450234,0.010772687523957103,6.461026924364788e-5,0.052280859488756715,0.4477415478948805,0.8707433468939989,0.9359031873062158,0.2776264196818179,0.33780317444247787,0.20095338082902692,0.8201730784539119,0.9749684661168079,0.7565122257271883,0.10984649191874007,0.0019929779543221837,0.03104380625963299,0.6640166081443188,0.7749481209321618,0.9750167335390221,0.8119299771817159,0.8275445043028871,0.8065085851501146,0.14868055326938912,0.7520190970232057,0.6270407665544375,0.700606378365441,0.09903843254560418,0.0918535261105311,0.9218932160063171,0.4561973875805192,0.0015030377143652185,0.36470794488257763,0.4859485828419643,0.3014251863166355,0.7023570092302067,0.06595868066054011,0.9602698934010596,0.7977213853359952,0.23705072865270505,0.13438413134076366,0.08849193496926588,0.09042391505135283,0.43625568830884887,0.5735377251945839,0.16061510664225787,0.45773650271573296,0.14851602222308435,0.9882840079806499,0.7996950757472461,0.8179318332836951,0.771125453762928,0.19477306671384143,0.975348604882659,0.5727333679911526,0.9852872112283304,0.844533608408581,0.1148951140368617,0.36155081698395986,0.5313149452671793,0.11508294332941782,0.009865712573023266,0.48223413378408075,0.9041198701739919,0.14336178517383913,0.4553342109798586,0.29298190296140714,0.23151605775740092,0.19496989628889239,0.8462982109875152,0.8518487064717206,0.9637375288278871,0.585734541580397,0.9901860470735122,0.06707121406366978,0.23549396777676868,0.4061090423139495,0.38188292175703564,0.5830123172637605,0.7962899246271495,0.24807609749508153,0.7654548621842487,0.3322566482193363,0.9153865944918644,0.7914709446121089,0.16693880201607758,0.8685482350746074,0.5201965143600986,0.4821947640150628,0.9798244353052052,0.09661796584070959,0.19171626853463408,0.977778831298179,0.21330552037697648,0.4637858553113552,0.5876914124704955,0.34561479060632117,0.7315516460726745,0.6660729825285956,0.6196596402573644,0.4249176216329418,0.15063189806352018,0.2551244997116382,0.8421963932082444,0.7369855210629561,0.7829178668374117,0.6760172459979612,0.20703114082257423,0.9724400025351978,0.2896627467034367,0.24213815430891583,0.3000586112997399,0.1286208206572017,0.8115393754171549,0.13200126128956224,0.5289754071055497,0.8493759213882297,0.010239517683747534,0.28113168209870953,0.06327691339880559,0.33025906003801664,0.649235140761822,0.8388097708865225,0.8590343937585945,0.6223950742614852,0.5624095458096252,0.6736683857829358,0.8308455034850442,0.621304623569402,0.030239402754477895,0.8305122252772794,0.6285231300787208,0.07046896573474104,0.040081636028711065,0.33578835242039173,0.18815979364215574,0.972442326489207,0.4471268525624057,0.5647721805938011,0.9458385185749614,0.5952807800490243,0.6175608224043638,0.39192752012148735,0.9171252757793491,0.270754615524021,0.3854614534101892,0.07018018912023849,0.2573186602064492,0.587872287842002,0.6961520743358782,0.7128550302659065,0.4375568617046601,0.09996185132089419,0.2952209826624379,0.14170823621134954,0.1421939697791368,0.06876421994720783,0.08893638075632326,0.6529616079375096,0.44687076952377747,0.5745355115653012,0.7426504857232312,0.8555057316021046,0.6192677417317858,0.16474996256619567,0.27285594268767066,0.7486717294814804,0.9102188856123505,0.2387635977162763,0.08629557059346382,0.49287625157182324,0.6578812754033387,0.2133627761926169,0.6661396546419982,0.8666304615194207,0.2854874040947639,0.5078340980319158,0.3122589695445859,0.2336761442601305,0.14022769298037985,0.8896807436531604,0.7457875736201409,0.4640830548374153,0.4873334284601567,0.06807938009637371,0.7017058712245536,0.5677834078551165,0.941407251397449,0.3934026912800199,0.8496393871632444,0.38162594762610014,0.44595093402474606,0.662545848386003,0.811039627431851,0.002631731291288908,0.657120378298804,0.2354081345373893,0.591439077918166,0.9840215320267878,0.1762465264842361,0.07214227666451767,0.5278964424401076,0.6411828463405866,0.8248587554189202,0.9661019546772409,0.5627279926414308,0.5651109020286058,0.7826172395040918,0.9571612551317292,0.16516096485905907,0.05242817201535521,0.294640151310118,0.3803254215122791,0.05279373331665904,0.2263010407365753,0.722826801795504,0.506768574764201,0.4763510444864232,0.9971611294253557,0.585673162082313,0.8860752591193368,0.10932079861935429,0.5342799098992441,0.46376398413897957,0.46612257168079285,0.21418595467888935,0.07223705126443924,0.43268645327278654,0.6190435138724277,0.09384691048124294,0.2742498418956314,0.027151804634884202,0.9829977630903126,0.469163305881793,0.32068902027009205,0.5678404863835298,0.13928184581092196,0.1061205288182856,0.9234559674927598,0.23350321432545762,0.6723918953049908,0.9985757581292203,0.05184500114653501,0.602040595554902,0.7997296826744078,0.3251608920197082,0.2695838905879626,0.153174646071931,0.11240274411828488,0.14944548502148125,0.22963825103484914,0.0996077674000393,0.5018474002982636,0.7282448347572406,0.48031805627968516,0.27249000674351387,0.5660977784728138,0.05403965422868029,0.2581075441844045,0.940777645123485,0.37348042859376607,0.19024541180682553,0.22270444261233657,0.1818944592258629,0.9339394414806128,0.28431825980978753,0.6161322352434428,0.9210825954332731,0.03422741755042136,0.2525057734288867,0.5821474569385228,0.171931821563871,0.5710984663123821,0.8225963471472175,0.9265798985123026,0.25932645795460485,0.3975674130724751,0.23935161577833952,0.5498738907090646,0.8983493855984537,0.14782106580031984,0.24739937892210717,0.6318053830056058,0.437881170208426,0.558368297223601,0.8664918098347711,0.10944288178928652,0.9508437659202249,0.4018345881480774,0.9084511464492768,0.504624129505651,0.7885442642581746,0.7208860795135588,0.8852721256710971,0.9566630931722402,0.36312909869637133,0.3951936041826032,0.06403851003241945,0.34391065360783624,0.47998881161552864,0.34911987004149814,0.49987494523755993,0.11471119648216033,0.21769632775119097,0.874736561938906,0.5803324859607804,0.6527709246448128,0.3716741433416495,0.8240632162450308,0.1945374490387819,0.6988053166917392,0.05698962974057986,0.5382742925090334,0.3740653436565353,0.8712765638077147,0.6006893592830067,0.2222489612277596,0.47998695607397845,0.46466290228396323,0.17381322253035436,0.9269994243612218,0.16700988162182462,0.9577349977109324,0.45874249754369134,0.4842001202022377,0.09524788838954268,0.5259030266947045,0.4794423446462297,0.8764325638111097,0.8766191188924568,0.6841345729747454,0.5200716826672902,0.9513247746284834,0.7182100173570687,0.10601151090275152,0.03002624893857475,0.27067468390654703,0.2175330766057635,0.20306404710090797,0.14315890915171559,0.09875299045105645,0.5248280154940934,0.5251490443857483,0.6557923816172229,0.9352762516820077,0.8137956826207893,0.13680877945584102,0.5479493966672102,0.42234379463839833,0.5906439234200995,0.48549277176884287,0.9054868801089673,0.44105907085716467,0.5746618764047284,0.7679140451959123,0.8230297397573791,0.17975705053722058,0.42162588535747747,0.7152689520523952,0.8310665540675151,0.606864836819837,0.2106392707437219,0.560811101069264,0.8642152171765018,0.3470192267217862,0.33796475386601865,0.015479260355485636,0.696133475499817,0.596526779134241,0.9726331744320493,0.050689499818034944,0.4469737848685351,0.540842010257458,0.8221069993443351,0.6039183711989078,0.9856505590913163,0.5028664806514958,0.6847639433167119,0.00696273276077064,0.5525449923677925,0.2033439246740083,0.7836026174231003,0.622163403663305,0.7860366632382447,0.3327666815848427,0.5991187142890952,0.6704762303361964,0.0009108932810291126,0.771448938741031,0.5965619024086002,0.3173154539766929,0.4136526057611394,0.3559055093916541,0.5106804356563606,0.11659147935621861,0.99204168667686,0.8731795100440567,0.3085316849089528,0.06526049654032051,0.488322787876571,0.110921836612758,0.601670171053611,0.4148375608388797,0.7092034366883722,0.6337773275265528,0.6563134361966139,0.33998860000456266,0.5341196155316228,0.3057397467154681,0.4140885790803368,0.13817246365522662,0.003710340921696309,0.03477156753767807,0.22750847859108703,0.3865595071103569,0.22949096262232582,0.7334331343781231,0.6225509865732972,0.4839550287398906,0.9074022289348662,0.4201688129580641,0.5575065114757018,0.8337347654704785,0.4569915601216701,0.8911936194568606,0.8373003151132146,0.3456972769037552,0.2938371810031317,0.5820978296745309,0.312635964278972,0.08367635610585777,0.8302708192349659,0.2866976545147515,0.8352348499076188,0.6512397618087471,0.3882225730325579,0.42447507921889094,0.7961475110614327,0.23769693781318568,0.711187493238792,0.960368478959382,0.9962010729594615,0.4868671756889533,0.7580968806905877,0.36052510883918476,0.21733124530961345,0.8502640206201717,0.361745529509776,0.2803385092371402,0.6247644444649412,0.8448100946753709,0.6618707528894558,0.00680921098812548,0.5526325516394821,0.43525389695164174,0.932740194102246,0.036822486325490233,0.6942874571484952,0.4947714360496167,0.600396526440466,0.6548376433123748,0.0035481072404912606,0.1438840077778274,0.844775577716349,0.12045070823232873,0.5959577334274508,0.12485989831120858,0.21139202876130536,0.11781285024402899,0.5142416387012312,0.848540646860882,0.36019658475277705,0.4979632347690317,0.22351704462841782,0.0014294846525346738,0.09734973029302973,0.1224543614357021,0.03131777679267511,0.669081986810989,0.3295528453311922,0.6170800261460236,0.6287651563744259,0.16300549985244794,0.5668328926437463,0.8541866427925549,0.15044976424816703,0.5869330514388105,0.8615876665650424,0.21447080299793408,0.7757866254573027,0.671492940552675,0.6121930516036431,0.15104015265662163,0.4985958738581533,0.6121699100561233,0.1883616833779045,0.4536845544728467,0.5718358168528668,0.5037652187091604,0.09960804356611774,0.9840912694391128,0.5960879377548385,0.1655116123453908,0.07449934326889585,0.9259188427438458,0.8433826472445973,0.9230114748667735,0.5509778024281622,0.7923212119051877,0.1972337119103329,0.32235305508716205,0.019041107099317278,0.2796336464564033,0.0722103542757897,0.5305874270678324,0.49537752060097295,0.7492683844217889,0.998570447256306,0.6666642280074977,0.7906770758098147,0.5131183415993945,0.5200881764980991,0.2243396614112163,0.375937771624123,0.6228169521253542,0.3106348059226316,0.27458772266273335,0.956837543777288,0.8792303481167956,0.16534632410922212,0.19944524623553406,0.7485951378731441,0.09484854203441229,0.20076830625878483,0.7741197470759997,0.5326710246502384,0.30100496675303035,0.8705081187542068,0.20910633418745728,0.8219398447581974,0.659326687718855,0.016583083314087643,0.4125011566990211,0.976805685078983,0.9900313542735182,0.5230452845213154,0.008470257054971952,0.8925631802635772,0.7458498143354486,0.3293966563972457,0.502988334203941,0.10434810286149365,0.6432382171682804,0.028438382598379608,0.8426082178675225,0.5851355830003615,0.024154741352449216,0.49767987806730773,0.23189550605667542,0.26934235871558543,0.31330488581776006,0.40067347728620883,0.6253820592178636,0.25179583001122174,0.6917186068479073,0.22089800870542065,0.5501124291245947,0.43583783807257226,0.19258851310753222,0.3948763745461126,0.16259025473886002,0.167654534118721,0.8747166329391352,0.06378788193291585,0.5183734397072004,0.06341469074213046,0.7384681972307148,0.25544473385287714,0.8479326865333376,0.8879937321568563,0.3373456980741345,0.3497098608072764,0.44574124871472054,0.6536730656594518,0.5801298792541456,0.8834818062598724,0.2848999260664884,0.8765430632066962,0.9791424129055395,0.1037325397667006,0.9097266535126651,0.2719628931551983,0.5532682175881478,0.7301110089093608,0.32349036831051703,0.4251696020389244,0.1133424062610624,0.0627022342068102,0.06520966166469466,0.937002635090679,0.8164172667148637,0.36903521972412623,0.9934204167045477,0.543827764511303,0.8388664700240334,0.5457647650558495,0.04416792964719041,0.11173296461709259,0.47035504238635273,0.3768040887953892,0.86527256038757,0.6099592672573293,0.756382112615219,0.9226786520700536,0.48704706096785233,0.7774703472152098,0.675654656807336,0.49891765158237944,0.01093913886159914,0.19918244761944193,0.8270149863379539,0.821049788179393,0.2523140456119819,0.27825375262192376,0.6825433223050474,0.6214737253126734,0.5897988039934454,0.027707688408662223,0.6908569113960346,0.25072226061250236,0.7219035308562671,0.69620990884639,0.9315598312266242,0.9366878336429887,0.5706940539418828,0.2798574907475402,0.5671949718072571,0.03862023063261755,0.7288138299235496,0.14915797907154094,0.08736329719853297,0.3611772368249797,0.9131677820567232,0.01617875053150586,0.07338772569516139,0.7127719686169525,0.3995231638115413,0.46281292973574817,0.24110047262069556,0.6350233850848219,0.5737475637364788,0.6571670223404207,0.2795643355014561,0.7678785289535737,0.31661677639868313,0.6669762882831267,0.8726767783516463,0.7655434000846619,0.5835378704681198,0.5085173109799235,0.19491163801661937,0.7233844910029574,0.6289183493966088,0.8938735079514779,0.7826834386388772,0.9792582926771831,0.26403833287907497,0.6049665745802337,0.7617105230553016,0.4352737124518571,0.5099566162257951,0.8486179360096897,0.15465365068813175,0.7939008285491638,0.599882574555334,0.39409422959309315,0.18007823543403378,0.08826910878304517,0.7962044742064369,0.08297232052218573,0.0944229679027051,0.5235832979435773,0.06048625459127299,0.47325312802115604,0.27726766966936234,0.30707773745048783,0.7081835968934431,0.40113644174769325,0.7522954669455788,0.7828616205317827,0.010341764165306966,0.4377810501354198,0.17986709268112944,0.19560693477281066,0.7866819810578083,0.1637968458083474,0.2865312202946775,0.7873379517203258,0.995925383009763,0.41761690420989117,0.116172402290877,0.5819209615818082,0.0024982608505577097,0.5393002770273276,0.07874572476836028,0.6929632896720479,0.968715177495405,0.7771371961418787,0.3460645416604162,0.9153441296233416,0.032898471286611164,0.2379083676228846,0.9989188682655741,0.029390091039231292,0.49952618221734824,0.5179410469482228,0.3863972811735883,0.9095645176035903,0.3438554207807576,0.1425757935931502,0.6451169735808837,0.9488634630930952,0.4895405494578897,0.5063280763770774,0.7564237763577182,0.1171427293746441,0.15428764637207415,0.8829529836731893,0.3452246017917806,0.7965300655521712,0.3334386274774819,0.9935329023071102,0.6437657994713988,0.41095466010129167,0.7898106829211615,0.07502820136121047,0.08163237156353653,0.230598336154622,0.9722144367422707,0.6084401089368507,0.7899128408786154,0.19548683551368384,0.11237080718642845,0.919829376220948,0.19840335921936947,0.4011178435244511,0.7687742013352374,0.5531833901798517,0.23544774434023896,0.8817641354313817,0.3532815281417945,0.7586188139760752,0.9022535173645598,0.6153731398888707,0.3973723116030703,0.993223121835906,0.19151605355471668,0.457889855619769,0.9625975959520197,0.9809289180355547,0.9838142385503141,0.2674220151364788,0.0942807575208322,0.6820787299993909,0.5821622067376921,0.33334051820680455,0.13637136120407178,0.7897402891367831,0.0015996668534934422,0.9746652316299604,0.03540516457768206,0.025258311925498544,0.3079332248592892,0.015959640796239682,0.8069462654456572,0.6962024487302401,0.11371308502519795,0.6588350865589157,0.4910230167658194,0.19465889075474552,0.3807704520890989,0.3381027608201821,0.6393911414161972,0.7163300823241616,0.2404070369260276,0.6663252170972422,0.9931007931394098,0.09340368762703877,0.17382652556355738,0.832847427100359,0.8474526699101745,0.35826024485283536,0.6403630489120098,0.026791871056235594,0.6541445164388602,0.04621303619092698,0.5576569168477885,0.8877083115165054,0.8021276569570803,0.4065661810129866,0.2850489665104068,0.033899804609077266,0.7910178119939588,0.920915908558614,0.09135629236115883,0.2677147131783493,0.9798936616827141,0.008447365341001545,0.00716573504052187,0.637217648997594,0.8018474889389517],"beta":[19.43993295106914,10.428983397246455,18.07885189292957,19.45388927502942,17.34596106881781,16.449494776661247,16.184041820674228,19.16230459157753,18.16044548930825,17.98939709792686,12.598039430335255,17.454483153559124,10.893452981428089,17.309293751033916,17.71054524716935,15.245142233996738,19.579278660811646,13.06792777640438,15.019779099060786,13.843152458995835,10.50852061370849,17.13780867467455,12.636328599730088,19.59351826640692,14.178614485597675,12.687197849387852,19.721857976950474,15.735725950223049,13.577490257328297,10.497955128139507,13.469573427220736,19.073603754782972,14.833731912366147,10.554987897997918,15.806981212341695,16.99333505677517,19.914277916393235,12.384279606673443,18.57063343336284,11.461964287331716,14.654133600996431,14.08381207935806,16.840092224912492,18.481535902466867,13.099743294594093,15.099596132153932,15.735243998045146,13.543961632712971,18.13510411480884,17.037251448714322,19.154888504127538,10.168232316929105,18.621270409464675,12.09463460018595,16.541791633249332,16.566565339254424,16.78071829234238,17.92769499270601,14.665651632221493,17.29735872410349,11.11008670651046,17.11884164785989,17.996307732978387,19.58773219814838,15.536381080505386,17.044064755892627,18.58960195101863,18.142320642056312,14.92959843337918,16.96157247616241,16.603255379602828,13.043805163748342,19.196728996107947,13.748574493009656,12.279906276379641,16.34027718285515,16.274960848344744,11.4652154415502,19.94983421267967,11.422391217776447,10.79354136668658,19.68119203123201,12.423280778622772,15.617486285403977,13.07232362526319,15.639544962107315,15.753851758760769,10.641431290686667,16.446176650365594,18.13279089518679,13.709995637566841,14.348720061778495,13.0054858186368,19.334672184636254,14.064238187564918,17.18579611317476,17.971832946893006,10.6019112732189,11.616673700410713,13.03495219949037,15.04756493574642,18.406777308067817,12.967950297289175,18.110197996706667,14.393031476054981,15.687269139032505,15.517281597540496,15.133585050592234,12.499342376397095,14.708703172879108,12.48778280515902,13.796971080738684,10.008806825064315,13.656383012489126,19.30531511142391,16.1308638201768,11.195294367177219,19.730586869780034,11.876153106444736,14.347658517068822,13.24199267622885,13.479729582300743,18.635799344364848,13.39204118897616,18.294282064161973,16.84282335316452,11.451857939929681,11.347927186717675,15.618716744533604,19.80295098059107,11.743254684442253,17.024844780529882,14.165578736019045,14.422855131037371,16.392294394336503,16.35583502056273,14.624863733071887,16.113301056367252,10.579113590560416,14.585366779513365,18.539434467361765,12.290065534073985,12.101079685501295,12.162216183849285,12.221443667771402,11.77791587388944,17.861653613889725,12.68706289817796,11.140734375374354,19.985745001754896,18.26649014789885,12.119367289207009,11.430170829239001,12.15948530124854,10.007217485807494,14.489330069592574,10.711656810425227,19.539365688419256,15.813499323469154,13.568913051137617,19.98379591431617,11.221832544228045,18.91334310435771,10.473678358107213,18.18252350784914,15.462591068195934,16.50671006290665,14.481639001528714,17.78514805950745,12.61796862545234,10.099204809610791,11.88308588137248,10.331294806429149,18.779808398200753,14.516455350111308,14.355095671150027,15.750996719238195,17.718303240629396,14.796586556363518,10.695971052979278,17.055730089314153,14.373747759783775,18.93933236797225,13.223346251273664,15.046833170114162,18.255051433918275,11.386003282295112,11.352928494804678,14.154996655437008,13.902388703718271,16.108546961718105,12.82699265282109,14.033131493708602,11.81152576002882,10.05871206253099,10.604592421650063,19.533767261601824,14.254247860412697,16.49680741829528,19.435176982078655,14.44495719775475,13.214615119281401,18.554485505053716,10.748646436284373,14.884485102731675,19.96329364639392,14.302476740825067,12.764896281466154,18.977789783384267,12.947433488648432,10.485989430834014,12.797565690236114,12.577023413906055,19.95802000416531,19.624209972472336,17.265043224920262,12.582055754225319,19.7971854578782,11.865183458513481,10.87512769928767,19.221409843587065,17.575576916804348,15.182710970220763,18.01094364430542,14.092502491682769,18.647872966347762,13.562297823058977,15.4274225202422,11.250001992372747,15.693321032827054,16.27259570616214,14.895002432613623,14.000565311951728,19.83686607945831,15.500901369606584,19.35640888911903,16.354657784792185,13.479739049912268,17.74888584328554,12.567281286271722,18.63678937543145,16.79593034725266,15.445178884059644,17.520996769673122,19.624836741022925,18.32572934587163,12.688867417629533,12.720539035728786,16.343836751777282,12.582010945182077,19.43244247085711,12.173435791390176,15.923831244950888,19.777490719904705,17.106572969232708,10.02642687343642,16.294799032197616,16.55347333711631,13.459816904723557,18.36277929728064,13.050933152465447,19.450985854785287,11.255987019375961,18.612228360700335,14.408697844421248,19.53112880145524,19.611871941871623,14.161085773513582,13.485861978292267,16.78869409138783,12.813716950650214,10.959211048800931,19.653737531048158,16.501453806441255,13.726529082710892,10.065145918762957,12.01469017170567,10.451822616321298,14.437419880350786,12.94448018987222,15.73538389493715,10.244986004082401,19.268538386632077,15.861926953276292,17.616010144570353,10.637051635758858,19.97510797315946,19.118625245324296,11.84522527323378,17.45217131472458,17.429476050524183,14.798804217735535,13.544145110359118,19.03631231804337,11.626803111634674,11.19745527135277,15.388563705095343,16.28387536621109,19.75651045867221,13.61553073199727,18.729470841826462,19.678553320702754,18.682501773902054,18.806329761076856,18.480821186530118,15.815880936106188,18.31331183466344,12.200431710956378,17.62676485832432,10.780293181510515,14.097147999940747,14.040063667476602,17.770755589945807,15.275310860266567,11.093358781037047,19.00221458221767,18.902192974280965,10.50595112613458,10.519022532621449,11.308079902875,16.406679252414726,15.867911590272268,17.841690226300855,11.078315499766997,11.34678091835597,17.777110063133183,11.415984727790558,10.856353865382724,19.212601304824435,15.800800631447217,11.964491148743367,11.586122028104455,15.500989700199003,16.85923777652757,19.475506886126645,10.782995589075863,10.917571731290073,18.48209744478749,14.013214836488627,18.940354246212117,16.136667981941926,10.116170597017382,11.39396241292326,15.301509092738003,16.96457264760742,16.432841308795663,11.36891596483149,14.819374712574188,10.669739516036984,13.3212640341103,12.196762366598858,17.60165220393926,18.333751201962052,18.506657353480747,15.43426993986145,17.908318951776216,19.593802137964225,16.730522385935807,18.958703611476672,16.11515446373332,17.277427482302357,16.745533586709442,10.93472881412023,11.567887134546845,17.919791487746046,14.093140360512166,10.072725668725365,11.131106538105449,19.164834192114093,15.756033389972464,17.56288347941129,12.73351529958285,14.130290037080515,16.574213864395837,16.533480717897813,11.865374781520092,13.2578005540379,11.019556914591185,14.134197201959093,18.971449383809613,15.905589983148092,10.273210956680428,16.440895963633462,17.699188758355966,19.820311893841186,17.048179724311485,17.148855107413937,19.464826802922094,14.342851362051503,12.921533130031372,12.15211681412249,13.874878366610977,19.18244487455344,14.711309889067024,12.957399987732295,11.530485220991249,18.42523018186775,10.673258053654006,17.59435139308912,19.264916878068316,10.584143321281532,12.054432698201884,13.301635443622404,11.762689747397355,11.202444596922538,18.624149844316804,19.324992945332596,11.104896599971372,18.255716641181195,13.055579262614769,17.840260805090324,18.445775895311776,16.34514913394181,13.979854443912497,16.357324311850707,18.59017244966888,12.700473382341986,13.958998239599584,12.93572376520558,19.337909305073403,12.545528947953116,12.773743658403118,19.912280057594796,12.9300566900722,16.95947380161079,18.78825317736139,14.561699393770915,12.526928363727825,18.07751693882227,11.954796554914893,19.451795965853705,17.081339187677273,10.46537901121009,13.166665119358639,11.450872717906929,12.184277546520526,10.414946634973427,17.05543818917439,16.412885898272595,19.00828986804452,15.04790693062242,17.272106538757605,12.147414887856083,16.31419336729882,12.961828620962489,19.4294969159623,11.625616958683544,12.680143494330904,15.587137467284018,15.398266817133743,10.053195994143438,10.705581476051865,11.561342186489437,19.920835283191096,14.135812814084343,12.61032496873969,11.438212523400606,15.54065048503988,16.638859509432493,19.77927924147145,13.858947693699939,17.638776661543453,11.085010020202496,18.077204863457162,19.529179244596854,17.61320438039801,14.909974657500308,12.023243029951322,15.050091674868906,14.659443140578697,18.776613002535726,19.32681920079084,14.335135713769843,13.704189033051152,12.588273614823562,13.2745378026916,16.758020541961294,13.551125644493585,10.088804661705632,13.453300137073047,11.287055315182894,17.44772854848639,12.82034968905563,18.744740615549034,19.4895950479321,15.44292542766245,14.426575287277556,11.603331303893867,12.257246464630242,14.685278652344806,13.275596480163905,12.080737994976491,12.099301253467814,16.592636597715853,11.34165945928629,10.955375290516887,12.359823662720334,17.913404060468665,19.017794815689783,16.412844677077214,12.25912906506158,17.408262891525915,14.476054555336768,14.348455533162689,19.61835939105338,18.625812666316897,13.252756777867047,19.33651909833486,13.818568108323195,14.457928753935414,13.55243908104977,11.852870292054384,11.291440270674201,10.939009879680393,18.271908453677398,13.58331006328672,16.35432996902206,19.860138705641127,10.939190132708898,18.26388286058925,11.426609315044695,13.723317269388504,17.149783243848667,10.832441293393565,12.149496458039193,10.663696756455307,15.648329308939159,12.737572468451964,15.96412925530197,17.89202142957953,11.460605595608065,10.512194977097307,13.567729245185367,13.86900054424103,14.797558439328323,12.933656360375283,15.474459429437742,14.287475732773453,11.658662503929191,10.200669841821586,11.644709582619292,12.211093993211213,10.538651657975414,15.175781683923077,14.157946632997485,11.201870932997371,12.351579599454624,10.482116103824133,13.183065586769159,19.516477073554046,11.972371016193206,17.523813576277362,13.940210378952841,11.502901082428767,11.134244779917717,15.350829818233237,17.9694062285409,17.48311855241502,15.06368147478934,17.968023713740447,13.7695581086391,17.358857122217426,18.72692111567595,16.62462482692586,10.459162398180553,15.127618833721193,11.613850731239504,13.711091848375876,14.930194202441388,11.498883366447535,16.110694198485806,16.360577762884127,10.67167820854353,17.299686452458175,19.99187862534702,12.407541047195686,18.219145607290002,10.479825467037987,16.951930202121893,12.249023780826501,14.668860385724543,17.650113254370908,10.868309359343403,12.855430637165671,12.971006215803847,10.804357355829456,11.338534786372762,17.414452738450915,10.330505580302741,17.584153854053422,16.39093646118669,15.557567639152774,18.021258710494585,15.764104199866534,10.150694481870737,17.454553250379142,14.991731597565146,17.985278055785475,18.611815561811103,10.230769583894617,15.606430093769356,16.251104589828802,19.167677339208502,16.68967049584104,14.432896033327955,19.55024653507333,16.225545106320208,18.782364796695102,18.200681946505213,11.063899317484582,11.123781553968495,11.113422658019834,12.384080914219313,17.344357516170042,10.139742394314165,11.847669056505449,19.620168485380137,14.948225694348094,13.457042153640968,12.270211316115914,15.948018299656937,18.48237173781087,18.262479587810063,17.108051910862123,13.598297134515553,15.65562258709104,14.496183160098152,14.434321534279102,10.904030023714776,12.937742412527388,12.161340747900674,15.175984235638289,17.741698191162087,12.067033780311554,16.227593042445655,11.584328486026871,17.283127792981862,19.500329307735935,10.036052527265,13.57834302698214,11.313925281699218,14.272046935226605,16.325993713935283,10.478605086841487,15.204789784864086,14.588137242765672,14.979316245471983,18.34511681474201,10.065991072954985,19.774170662039012,18.741524825970956,13.427126008231278,11.571949599697465,10.622657544652796,14.024289371049063,13.259911155788393,17.556651659148773,17.827686624158048,19.39450085317777,17.931347080663198,12.36636786329611,10.051879354654961,16.598937652555307,12.3157993676849,18.223798205588114,19.270181850203244,19.3494176417508,10.414586829818491,15.206095489942888,18.139859530312403,17.782235996259548,16.0918029421493,19.34495465306438,18.370513558501546,19.939877893576057,16.300859568761116,15.78549923155368,13.387471518156492,15.543189496927566,18.678059512954633,12.931343006721079,13.463290867331496,16.15777084949805,14.69087638025859,13.682120204410499,15.358966471317789,19.095303328591342,11.143121290203617,16.86647373838099,13.643606855350882,12.394810066866153,11.538802874071214,16.811308862754473,19.36916342683045,11.946257561832896,14.576703352903266,15.886281331197367,19.921758670360457,15.765424478648153,11.183003553070845,14.882999290072101,13.930911206267794,11.923820776694,12.922697494056854,15.326159257467467,19.37808915588443,17.009105735077227,18.813898579388088,15.65225875596231,16.960399119620536,16.596515106436367,14.404223287668355,15.825406140565573,18.719587904561386,11.386555875983513,18.444694853475994,15.239220942837036,13.911622565246018,14.772510162488526,16.075570622954093,16.382961477661233,10.146231605983196,12.371259746169997,14.614119057293573,10.873699105331362,12.996721356981642,18.456139016647153,12.442185691237366,12.424159582582337,17.334390218465337,10.517471500123259,10.110293119960192,18.78075741096132,10.03491338983293,13.179792544189205,11.788612107766996,10.35842852852266,16.323186053886914,19.28969167665763,11.622049643332222,12.088407118119726,19.443746510236835,12.17212076838328,16.052199175282038,14.72776550185463,14.040278956259982,10.883613165415083,17.481923002647946,11.53228837512151,16.585150376196573,10.026866894014368,13.043261233538301,13.101560457898039,13.352585584220158,17.26607776571481,19.055930441537896,19.637873562317267,19.177185130275156,15.26853185527488,14.893242881954524,16.696296079899188,19.030772935243487,10.609979976959945,14.577609145432701,13.98088820986528,10.857870388170063,12.441896918850347,10.196680990950869,18.690285253792524,10.788800935559657,18.625088126205547,10.760020684627609,10.143310761602013,19.704393918621292,18.615718235741163,11.526433332880085,15.289485973990537,14.753159144965277,14.669662984092586,19.104873514335715,12.841710105008907,12.079550976315986,10.102370530102192,12.888948588587898,11.385238955744654,11.33513499164243,17.404088017422477,13.83427060919522,15.866514795489305,18.024331886861603,10.40198175247172,14.842718982013876,16.00499245100496,15.132105962119738,14.492695586841364,15.20257697883897,14.65101767238581,19.91827100773196,16.243284327523966,12.990953065688895,11.006582460667945,15.472561678792758,14.22748906164474,13.759451610030183,11.946877993949878,12.377852775917288,17.614303997601557,11.91588716280789,16.840188321241943,13.333299852453509,13.463169815770314,12.824530658083367,18.383439140794934,16.92496768552283,18.27514688496027,14.556939193485332,14.067664614692408,14.827229856939317,17.306366042072238,10.039176970763412,10.48511341090916,14.211853479191383,13.102255407358502,10.118503903690234,11.468359350842816,13.178464325852495,17.718736250457415,19.14265861817473,11.314580880539399,17.227895579131214,19.81670874988816,18.464598621302507,12.500275301926864,18.89737041928138,10.072861681639285,16.06074226056416,18.200508009147832,13.962605809834361,15.612997528597445,17.770355053133216,18.962229530119348,14.176965452950883,10.948384838509543,11.419190434220582,16.175401501816104,19.130810236102594,12.008199295959269,10.280822795626793,16.086897905626515,10.825620202663348,16.560512244032914,15.84762570782609,12.060692905578922,14.14488456423241,13.070517098678735,19.254079252557688,10.741372396342516,13.668123553498827,17.839055038874505,13.962406554932826,17.053717795870412,18.931743416145242,10.56556728760646,14.145973846231508,12.050666344928644,18.799260937197523,16.099993116274113,19.165974987239952,18.641362207451927,14.763245684677466,10.703422531672427,11.022482338836062,14.688690392822014,19.071328356140167,12.376338575150152,16.530638025545386,19.476921027986656,12.052685301733757,13.605632745900575,17.839199679983526,11.852125371130008,13.602052206618243,14.813821391905925,10.884278617709732,15.225530886556202,15.855955052820981,13.199849937009112,15.872525989592429,12.474160059372274,14.143286520007493,15.564033647546811,12.692746888455428,13.556907546350017,12.581621024145992,19.01845357765445,14.769592927169338,14.271947808178584,16.573816519985414,19.879015293863223,12.631688413075084,15.851367825975478,10.922636170333863,17.140030800668768,16.565476677466997,14.364578383997754,15.997478712899644,12.260663204151038,14.131436100930816,15.37270701490893,18.61232713477058,10.748235247082789,13.38733176042033,13.543642098538506,19.149366198241463,14.747427402134397,14.342497439448827,10.650685621982714,11.482269924304447,19.76479802203091,19.651806408826246,14.673394475716574,13.669951938944209,19.70235022934446,19.294725297933994,15.562919846885446,15.333965064015779,15.94541749845633,11.920045763572551,10.055638116397077,18.800199777813837,11.633542059156436,14.048655930928149,15.238536296723122,16.093594436273463,12.936540060234051,13.665830851836695,10.864797627371253,10.874807529084274,18.554516838182334,19.25749360934183,18.16349492208535,11.750042089219122,18.21010918120797,12.164162190743667,11.64430428483538,18.098369110098375,17.58118682437801,18.202483936416865,18.457222174454138,16.675042677163553,13.58403037097042,17.38558342912345,14.648477950858172,16.168374397501744,14.623218444270236,12.566081336408958,18.796696612711294,10.994908766699611,13.439699914193824,16.54087352244216,12.410649281466835,14.86521163104035,17.25505418780693,15.028296892643379,11.770531695678386,13.422509302399483,19.433489902960048,19.38654408322081,10.359550580661384,15.794311566629355,19.04353517871388,13.06480944985423,18.253417896418405,17.688869762899778,17.374250008303985,11.90652262641806,15.85548603987376,16.40927004016538,13.975531749460615,19.35232213073501,14.053280783433399,12.063480571763636,15.4933438937706,19.819397562863486,10.08067166997491,17.684293199258196,10.983145027149746,16.2296863744371,11.897616655522654,11.152965915037099,14.569172881141153,18.467519278953496,13.865498979871747,10.540922849458383,18.25886601465693,12.918563310484469,15.240733418269972,10.479993151687934,12.19259294009644,16.05642206238506]}
},{}],25:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
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
	var logpdf = factory( 1.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0, 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `alpha` and `beta`, the function returns a function which returns `-Infinity` when provided a number outside [0,1] for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.5, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -100.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 100.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 1.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha <= 0` , the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0, 0.5 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, 1.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, PINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NaN );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha = 1` , the created function returns `ln(beta)` for `x` equal to zero', function test( t ) {
	var logpdf = factory( 1.0, 2.0 );
	var y = logpdf( 0.0 );
	t.equal( y, ln(2.0), 'returns ln(2)' );
	t.end();
});

tape( 'if provided `alpha > 1` , the created function returns `-Infinity` for `x` equal to zero', function test( t ) {
	var logpdf = factory( 1.5, 2.0 );
	var y = logpdf( 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `alpha < 1` , the created function returns `+Infinity` for `x` equal to zero', function test( t ) {
	var logpdf = factory( 0.5, 2.0 );
	var y = logpdf( 0.0 );
	t.equal( y, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'if provided `beta = 1` , the created function returns `ln(alpha)` for `x` equal to one', function test( t ) {
	var logpdf = factory( 3.0, 1.0 );
	var y = logpdf( 1.0 );
	t.equal( y, ln(3.0), 'returns ln(3)' );
	t.end();
});

tape( 'if provided `beta > 1` , the created function returns `-Infinity` for `x` equal to one', function test( t ) {
	var logpdf = factory( 1.5, 2.0 );
	var y = logpdf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `beta < 1` , the created function returns `+Infinity` for `x` equal to one', function test( t ) {
	var logpdf = factory( 1.5, 0.5 );
	var y = logpdf( 1.0 );
	t.equal( y, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var alpha;
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
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 45000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large `alpha`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large `beta`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/beta/logpdf/test/test.factory.js")
},{"./../lib/factory.js":18,"./fixtures/julia/both_large.json":22,"./fixtures/julia/large_alpha.json":23,"./fixtures/julia/large_beta.json":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/ln":57,"@stdlib/math/constants/float64-eps":116,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127,"tape":186}],26:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/beta/logpdf/test/test.js")
},{"./../lib":19,"tape":186}],27:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var logpdf = require( './../lib' );


// FIXTURES //

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside [0,1] for `x` and a valid `alpha` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 100.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -100.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 1.5, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -0.5, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `alpha <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha = 1` , the created function returns `ln(beta)` for `x` equal to zero', function test( t ) {
	var y = logpdf( 0.0, 1.0, 2.0 );
	t.equal( y, ln(2.0), 'returns ln(2)' );
	t.end();
});

tape( 'if provided `alpha > 1` , the created function returns `-Infinity` for `x` equal to zero', function test( t ) {
	var y = logpdf( 0.0, 1.5, 2.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `alpha < 1` , the created function returns `+Infinity` for `x` equal to zero', function test( t ) {
	var y = logpdf( 0.0, 0.5, 2.0 );
	t.equal( y, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'if provided `beta = 1` , the created function returns `ln(alpha)` for `x` equal to one', function test( t ) {
	var y = logpdf( 1.0, 3.0, 1.0 );
	t.equal( y, ln(3.0), 'returns ln(3)' );
	t.end();
});

tape( 'if provided `beta > 1` , the created function returns `-Infinity` for `x` equal to one', function test( t ) {
	var y = logpdf( 1.0, 1.5, 2.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `beta < 1` , the created function returns `+Infinity` for `x` equal to one', function test( t ) {
	var y = logpdf( 1.0, 1.5, 0.5 );
	t.equal( y, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
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
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 45000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large `alpha`', function test( t ) {
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
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large `beta`', function test( t ) {
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
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/beta/logpdf/test/test.logpdf.js")
},{"./../lib":19,"./fixtures/julia/both_large.json":22,"./fixtures/julia/large_alpha.json":23,"./fixtures/julia/large_beta.json":24,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/ln":57,"@stdlib/math/constants/float64-eps":116,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127,"tape":186}],28:[function(require,module,exports){
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

},{"./gamma_correction.js":32,"@stdlib/math/base/special/gamma":46,"@stdlib/math/base/special/gammaln":50,"@stdlib/math/base/special/ln":57,"@stdlib/math/base/special/log1p":59,"@stdlib/math/base/special/max":61,"@stdlib/math/base/special/min":63,"@stdlib/math/constants/float64-ln-sqrt-two-pi":120,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{"./dceval.js":31,"@stdlib/math/base/special/pow":65}],33:[function(require,module,exports){
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

},{"./betaln.js":30}],34:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":95,"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/base/utils/float64-to-words":111}],37:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":51,"@stdlib/math/base/special/kernel-sin":53,"@stdlib/math/base/special/rempio2":73,"@stdlib/math/base/utils/float64-get-high-word":99}],39:[function(require,module,exports){
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

},{"./expmulti.js":41,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":84,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],41:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":55,"@stdlib/math/base/tools/evalpoly":88}],42:[function(require,module,exports){
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

},{"./exp.js":40}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"./floor.js":43}],45:[function(require,module,exports){
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

},{"./small_approximation.js":47,"./stirling_approximation.js":48,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/floor":44,"@stdlib/math/base/special/sin":79,"@stdlib/math/base/tools/evalrational":91,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pi":126,"@stdlib/math/constants/float64-pinf":127}],46:[function(require,module,exports){
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

},{"./gamma.js":45}],47:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":117}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":42,"@stdlib/math/base/special/pow":65,"@stdlib/math/base/tools/evalpoly":88,"@stdlib/math/constants/float64-sqrt-two-pi":129}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/ln":57,"@stdlib/math/base/special/sinpi":81,"@stdlib/math/base/special/trunc":84,"@stdlib/math/base/tools/evalpoly":88,"@stdlib/math/constants/float64-pi":126,"@stdlib/math/constants/float64-pinf":127}],50:[function(require,module,exports){
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

},{"./gammaln.js":49}],51:[function(require,module,exports){
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

},{"./kernel_cos.js":52}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":88}],53:[function(require,module,exports){
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

},{"./kernel_sin.js":54}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{"./ldexp.js":56}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":37,"@stdlib/math/base/utils/float64-exponent":93,"@stdlib/math/base/utils/float64-from-words":95,"@stdlib/math/base/utils/float64-normalize":103,"@stdlib/math/base/utils/float64-to-words":111,"@stdlib/math/constants/float64-exponent-bias":118,"@stdlib/math/constants/float64-max-base2-exponent":123,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":122,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":124,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],57:[function(require,module,exports){
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

},{"./ln.js":58}],58:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":88,"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/base/utils/float64-set-high-word":106,"@stdlib/math/base/utils/float64-to-words":111,"@stdlib/math/constants/float64-exponent-bias":118,"@stdlib/math/constants/float64-ninf":125}],59:[function(require,module,exports){
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

},{"./log1p.js":60}],60:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":88,"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/base/utils/float64-set-high-word":106,"@stdlib/math/constants/float64-exponent-bias":118,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],61:[function(require,module,exports){
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

},{"./max.js":62}],62:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],63:[function(require,module,exports){
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

},{"./min.js":64}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],65:[function(require,module,exports){
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

},{"./pow.js":68}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":88,"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/base/utils/float64-set-high-word":106,"@stdlib/math/base/utils/float64-set-low-word":108,"@stdlib/math/constants/float64-exponent-bias":118}],67:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":88,"@stdlib/math/base/utils/float64-set-low-word":108}],68:[function(require,module,exports){
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

},{"./log2ax.js":66,"./logx.js":67,"./pow2.js":69,"./x_is_zero.js":70,"./y_is_huge.js":71,"./y_is_infinite.js":72,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/sqrt":83,"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/base/utils/float64-get-low-word":101,"@stdlib/math/base/utils/float64-set-low-word":108,"@stdlib/math/base/utils/float64-to-words":111,"@stdlib/math/base/utils/uint32-to-int32":114,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":55,"@stdlib/math/base/tools/evalpoly":88,"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/base/utils/float64-set-high-word":106,"@stdlib/math/base/utils/float64-set-low-word":108,"@stdlib/math/base/utils/uint32-to-int32":114,"@stdlib/math/constants/float64-exponent-bias":118,"@stdlib/math/constants/float64-ln-two":121}],70:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":37,"@stdlib/math/constants/float64-ninf":125,"@stdlib/math/constants/float64-pinf":127}],71:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":99}],72:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-pinf":127}],73:[function(require,module,exports){
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

},{"./rempio2.js":75}],74:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":44,"@stdlib/math/base/special/ldexp":55}],75:[function(require,module,exports){
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

},{"./kernel_rempio2.js":74,"./rempio2_medium.js":76,"@stdlib/math/base/utils/float64-from-words":95,"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/base/utils/float64-get-low-word":101}],76:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":77,"@stdlib/math/base/utils/float64-get-high-word":99}],77:[function(require,module,exports){
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

},{"./sin.js":80}],80:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":51,"@stdlib/math/base/special/kernel-sin":53,"@stdlib/math/base/special/rempio2":73,"@stdlib/math/base/utils/float64-get-high-word":99}],81:[function(require,module,exports){
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

},{"./sinpi.js":82}],82:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/base/special/copysign":37,"@stdlib/math/base/special/cos":39,"@stdlib/math/base/special/sin":79,"@stdlib/math/constants/float64-pi":126}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{"./trunc.js":85}],85:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":35,"@stdlib/math/base/special/floor":44}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{"./evalpoly.js":86}],88:[function(require,module,exports){
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

},{"./evalpoly.js":86,"./factory.js":87,"@stdlib/utils/define-read-only-property":131}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":29}],90:[function(require,module,exports){
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

},{"./evalrational.js":89}],91:[function(require,module,exports){
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

},{"./evalrational.js":89,"./factory.js":90,"@stdlib/utils/define-read-only-property":131}],92:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":99,"@stdlib/math/constants/float64-exponent-bias":118,"@stdlib/math/constants/float64-high-word-exponent-mask":119}],93:[function(require,module,exports){
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

},{"./exponent.js":92}],94:[function(require,module,exports){
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

},{"./indices.js":96}],95:[function(require,module,exports){
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

},{"./from_words.js":94}],96:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],97:[function(require,module,exports){
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

},{"./high.js":98}],98:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],99:[function(require,module,exports){
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

},{"./get_high_word.js":97}],100:[function(require,module,exports){
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

},{"./low.js":102}],101:[function(require,module,exports){
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

},{"./get_low_word.js":100}],102:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],103:[function(require,module,exports){
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

},{"./normalize.js":104}],104:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":29,"@stdlib/math/constants/float64-smallest-normal":128}],105:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":98}],106:[function(require,module,exports){
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

},{"./set_high_word.js":107}],107:[function(require,module,exports){
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

},{"./high.js":105}],108:[function(require,module,exports){
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

},{"./set_low_word.js":110}],109:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":102}],110:[function(require,module,exports){
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

},{"./low.js":109}],111:[function(require,module,exports){
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

},{"./to_words.js":113}],112:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":96}],113:[function(require,module,exports){
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

},{"./indices.js":112}],114:[function(require,module,exports){
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

},{"./uint32_to_int32.js":115}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{"./define_read_only_property.js":130}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){

},{}],134:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"dup":133}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"base64-js":132,"ieee754":155}],137:[function(require,module,exports){
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
},{"../../is-buffer/index.js":157}],138:[function(require,module,exports){
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

},{"./lib/is_arguments.js":139,"./lib/keys.js":140}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],141:[function(require,module,exports){
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

},{"foreach":151,"object-keys":160}],142:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],143:[function(require,module,exports){
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

},{"./helpers/isFinite":144,"./helpers/isNaN":145,"./helpers/mod":146,"./helpers/sign":147,"es-to-primitive/es5":148,"has":154,"is-callable":158}],144:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],145:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],146:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],147:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],148:[function(require,module,exports){
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

},{"./helpers/isPrimitive":149,"is-callable":158}],149:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){

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


},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":152}],154:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":153}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{"./isArguments":161}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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
},{"_process":135}],163:[function(require,module,exports){
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
},{"_process":135}],164:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":165}],165:[function(require,module,exports){
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
},{"./_stream_readable":167,"./_stream_writable":169,"core-util-is":137,"inherits":156,"process-nextick-args":163}],166:[function(require,module,exports){
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
},{"./_stream_transform":168,"core-util-is":137,"inherits":156}],167:[function(require,module,exports){
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
},{"./_stream_duplex":165,"./internal/streams/BufferList":170,"./internal/streams/destroy":171,"./internal/streams/stream":172,"_process":135,"core-util-is":137,"events":150,"inherits":156,"isarray":173,"process-nextick-args":163,"safe-buffer":180,"string_decoder/":174,"util":133}],168:[function(require,module,exports){
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
},{"./_stream_duplex":165,"core-util-is":137,"inherits":156}],169:[function(require,module,exports){
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
},{"./_stream_duplex":165,"./internal/streams/destroy":171,"./internal/streams/stream":172,"_process":135,"core-util-is":137,"inherits":156,"process-nextick-args":163,"safe-buffer":180,"util-deprecate":192}],170:[function(require,module,exports){
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
},{"safe-buffer":180}],171:[function(require,module,exports){
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
},{"process-nextick-args":163}],172:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":150}],173:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],174:[function(require,module,exports){
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
},{"safe-buffer":180}],175:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":176}],176:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":165,"./lib/_stream_passthrough.js":166,"./lib/_stream_readable.js":167,"./lib/_stream_transform.js":168,"./lib/_stream_writable.js":169}],177:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":176}],178:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":169}],179:[function(require,module,exports){
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
},{"_process":135,"through":191}],180:[function(require,module,exports){
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

},{"buffer":136}],181:[function(require,module,exports){
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

},{"events":150,"inherits":156,"readable-stream/duplex.js":164,"readable-stream/passthrough.js":175,"readable-stream/readable.js":176,"readable-stream/transform.js":177,"readable-stream/writable.js":178}],182:[function(require,module,exports){
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

},{"es-abstract/es5":143,"function-bind":153}],183:[function(require,module,exports){
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

},{"./implementation":182,"./polyfill":184,"./shim":185,"define-properties":141,"function-bind":153}],184:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":182}],185:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":184,"define-properties":141}],186:[function(require,module,exports){
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
},{"./lib/default_stream":187,"./lib/results":189,"./lib/test":190,"_process":135,"defined":142,"through":191}],187:[function(require,module,exports){
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
},{"_process":135,"fs":134,"through":191}],188:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":135}],189:[function(require,module,exports){
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
},{"_process":135,"events":150,"function-bind":153,"has":154,"inherits":156,"object-inspect":159,"resumer":179,"through":191}],190:[function(require,module,exports){
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
},{"./next_tick":188,"deep-equal":138,"defined":142,"events":150,"has":154,"inherits":156,"path":162,"string.prototype.trim":183}],191:[function(require,module,exports){
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
},{"_process":135,"stream":181}],192:[function(require,module,exports){
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
