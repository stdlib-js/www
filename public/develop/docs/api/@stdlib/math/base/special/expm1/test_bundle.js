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

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
} // end FUNCTION hasOwnProp()


// EXPORTS //

module.exports = hasOwnProp;

},{}],2:[function(require,module,exports){
'use strict';

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = require( './has_own_property.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./has_own_property.js":1}],3:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],4:[function(require,module,exports){
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

},{"./is_little_endian.js":5}],5:[function(require,module,exports){
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

},{"./ctors.js":3}],6:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* bool = isNumber( NaN );
* // returns true
*
* @example
* bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./object.js":8,"./primitive.js":9}],7:[function(require,module,exports){
'use strict';

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* // Use interface to check for number primitives...
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* // Use interface to check for number objects...
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./generic.js":6,"./object.js":8,"./primitive.js":9,"@stdlib/utils/define-read-only-property":102}],8:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":11,"@stdlib/utils/detect-tostringtag-support":106,"@stdlib/utils/native-class":107}],9:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],10:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],11:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./tostring.js":10}],12:[function(require,module,exports){
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

},{"./is_even.js":13}],13:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":16}],14:[function(require,module,exports){
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

},{"./is_infinite.js":15}],15:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":96}],16:[function(require,module,exports){
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

},{"./is_integer.js":17}],17:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":46}],18:[function(require,module,exports){
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

},{"./is_nan.js":19}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./is_negative_zero.js":21}],21:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":95}],22:[function(require,module,exports){
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

},{"./is_odd.js":23}],23:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":12}],24:[function(require,module,exports){
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

},{"./is_positive_zero.js":25}],25:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":96}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./abs.js":26}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./ceil.js":28}],30:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":66,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-to-words":82}],31:[function(require,module,exports){
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

},{"./copysign.js":30}],32:[function(require,module,exports){
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

},{"./expmulti.js":33,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/trunc":58,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":96}],33:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":47,"@stdlib/math/base/tools/evalpoly":62}],34:[function(require,module,exports){
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

},{"./exp.js":32}],35:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/tools/evalpoly":62,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-set-high-word":77,"@stdlib/math/constants/float64-exponent-bias":88,"@stdlib/math/constants/float64-half-ln-two":89,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":96}],36:[function(require,module,exports){
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

},{"./expm1.js":35}],37:[function(require,module,exports){
module.exports={
  "x": [
    1,
    2.4204008016032064,
    3.8408016032064127,
    5.2612024048096195,
    6.6816032064128255,
    8.102004008016031,
    9.522404809619239,
    10.942805611222445,
    12.363206412825651,
    13.783607214428857,
    15.204008016032063,
    16.62440881763527,
    18.044809619238478,
    19.465210420841682,
    20.88561122244489,
    22.306012024048094,
    23.726412825651302,
    25.14681362725451,
    26.567214428857714,
    27.98761523046092,
    29.408016032064126,
    30.828416833667333,
    32.24881763527054,
    33.66921843687375,
    35.089619238476956,
    36.51002004008016,
    37.930420841683365,
    39.35082164328657,
    40.77122244488978,
    42.19162324649299,
    43.61202404809619,
    45.032424849699396,
    46.452825651302604,
    47.87322645290581,
    49.29362725450902,
    50.71402805611222,
    52.13442885771543,
    53.554829659318635,
    54.97523046092184,
    56.39563126252505,
    57.81603206412825,
    59.23643286573146,
    60.656833667334666,
    62.077234468937874,
    63.49763527054108,
    64.91803607214429,
    66.3384368737475,
    67.7588376753507,
    69.17923847695391,
    70.5996392785571,
    72.02004008016031,
    73.44044088176352,
    74.86084168336673,
    76.28124248496994,
    77.70164328657314,
    79.12204408817635,
    80.54244488977956,
    81.96284569138277,
    83.38324649298598,
    84.80364729458917,
    86.22404809619238,
    87.64444889779558,
    89.06484969939879,
    90.485250501002,
    91.90565130260521,
    93.32605210420842,
    94.74645290581162,
    96.16685370741483,
    97.58725450901804,
    99.00765531062125,
    100.42805611222444,
    101.84845691382765,
    103.26885771543085,
    104.68925851703406,
    106.10965931863727,
    107.53006012024048,
    108.95046092184369,
    110.3708617234469,
    111.7912625250501,
    113.21166332665331,
    114.6320641282565,
    116.05246492985971,
    117.47286573146292,
    118.89326653306613,
    120.31366733466933,
    121.73406813627254,
    123.15446893787575,
    124.57486973947896,
    125.99527054108216,
    127.41567134268537,
    128.83607214428858,
    130.25647294589177,
    131.676873747495,
    133.0972745490982,
    134.5176753507014,
    135.9380761523046,
    137.35847695390783,
    138.77887775551102,
    140.1992785571142,
    141.61967935871743,
    143.04008016032063,
    144.46048096192385,
    145.88088176352704,
    147.30128256513026,
    148.72168336673346,
    150.14208416833668,
    151.56248496993987,
    152.98288577154307,
    154.4032865731463,
    155.82368737474948,
    157.2440881763527,
    158.6644889779559,
    160.08488977955912,
    161.5052905811623,
    162.92569138276554,
    164.34609218436873,
    165.76649298597195,
    167.18689378757514,
    168.60729458917834,
    170.02769539078156,
    171.44809619238475,
    172.86849699398797,
    174.28889779559117,
    175.7092985971944,
    177.12969939879758,
    178.5501002004008,
    179.970501002004,
    181.39090180360722,
    182.81130260521041,
    184.2317034068136,
    185.65210420841683,
    187.07250501002002,
    188.49290581162325,
    189.91330661322644,
    191.33370741482966,
    192.75410821643285,
    194.17450901803608,
    195.59490981963927,
    197.0153106212425,
    198.43571142284569,
    199.85611222444888,
    201.2765130260521,
    202.6969138276553,
    204.11731462925852,
    205.5377154308617,
    206.95811623246493,
    208.37851703406812,
    209.79891783567135,
    211.21931863727454,
    212.63971943887776,
    214.06012024048096,
    215.48052104208415,
    216.90092184368737,
    218.32132264529056,
    219.7417234468938,
    221.16212424849698,
    222.5825250501002,
    224.0029258517034,
    225.42332665330662,
    226.8437274549098,
    228.264128256513,
    229.68452905811623,
    231.10492985971942,
    232.52533066132264,
    233.94573146292583,
    235.36613226452906,
    236.78653306613225,
    238.20693386773547,
    239.62733466933867,
    241.0477354709419,
    242.46813627254508,
    243.88853707414827,
    245.3089378757515,
    246.7293386773547,
    248.1497394789579,
    249.5701402805611,
    250.99054108216433,
    252.41094188376752,
    253.83134268537074,
    255.25174348697394,
    256.67214428857716,
    258.09254509018035,
    259.51294589178354,
    260.93334669338674,
    262.35374749499,
    263.7741482965932,
    265.1945490981964,
    266.61494989979957,
    268.0353507014028,
    269.455751503006,
    270.8761523046092,
    272.2965531062124,
    273.71695390781565,
    275.13735470941884,
    276.55775551102204,
    277.97815631262523,
    279.3985571142284,
    280.8189579158317,
    282.23935871743487,
    283.65975951903806,
    285.08016032064126,
    286.5005611222445,
    287.9209619238477,
    289.3413627254509,
    290.7617635270541,
    292.1821643286573,
    293.60256513026053,
    295.0229659318637,
    296.4433667334669,
    297.8637675350701,
    299.28416833667336,
    300.70456913827655,
    302.12496993987975,
    303.54537074148294,
    304.96577154308613,
    306.3861723446894,
    307.8065731462926,
    309.2269739478958,
    310.64737474949897,
    312.0677755511022,
    313.4881763527054,
    314.9085771543086,
    316.3289779559118,
    317.74937875751505,
    319.16977955911824,
    320.59018036072143,
    322.0105811623246,
    323.4309819639278,
    324.85138276553107,
    326.27178356713426,
    327.69218436873746,
    329.11258517034065,
    330.5329859719439,
    331.9533867735471,
    333.3737875751503,
    334.7941883767535,
    336.2145891783567,
    337.6349899799599,
    339.0553907815631,
    340.4757915831663,
    341.8961923847695,
    343.31659318637276,
    344.73699398797595,
    346.15739478957914,
    347.57779559118234,
    348.9981963927856,
    350.4185971943888,
    351.838997995992,
    353.25939879759517,
    354.67979959919836,
    356.1002004008016,
    357.5206012024048,
    358.941002004008,
    360.3614028056112,
    361.78180360721444,
    363.20220440881764,
    364.62260521042083,
    366.043006012024,
    367.4634068136272,
    368.88380761523047,
    370.30420841683366,
    371.72460921843685,
    373.14501002004005,
    374.5654108216433,
    375.9858116232465,
    377.4062124248497,
    378.8266132264529,
    380.24701402805607,
    381.6674148296593,
    383.0878156312625,
    384.5082164328657,
    385.9286172344689,
    387.34901803607215,
    388.76941883767535,
    390.18981963927854,
    391.61022044088173,
    393.030621242485,
    394.4510220440882,
    395.87142284569137,
    397.29182364729456,
    398.71222444889776,
    400.132625250501,
    401.5530260521042,
    402.9734268537074,
    404.3938276553106,
    405.81422845691384,
    407.23462925851703,
    408.6550300601202,
    410.0754308617234,
    411.4958316633266,
    412.91623246492986,
    414.33663326653306,
    415.75703406813625,
    417.17743486973944,
    418.5978356713427,
    420.0182364729459,
    421.4386372745491,
    422.8590380761523,
    424.2794388777555,
    425.6998396793587,
    427.1202404809619,
    428.5406412825651,
    429.9610420841683,
    431.38144288577155,
    432.80184368737474,
    434.22224448897794,
    435.64264529058113,
    437.0630460921844,
    438.4834468937876,
    439.90384769539077,
    441.32424849699396,
    442.74464929859715,
    444.1650501002004,
    445.5854509018036,
    447.0058517034068,
    448.42625250501,
    449.84665330661323,
    451.2670541082164,
    452.6874549098196,
    454.1078557114228,
    455.528256513026,
    456.94865731462926,
    458.36905811623245,
    459.78945891783565,
    461.20985971943884,
    462.6302605210421,
    464.0506613226453,
    465.4710621242485,
    466.89146292585167,
    468.3118637274549,
    469.7322645290581,
    471.1526653306613,
    472.5730661322645,
    473.9934669338677,
    475.41386773547094,
    476.83426853707414,
    478.25466933867733,
    479.6750701402805,
    481.0954709418838,
    482.51587174348697,
    483.93627254509016,
    485.35667334669336,
    486.77707414829655,
    488.1974749498998,
    489.617875751503,
    491.0382765531062,
    492.4586773547094,
    493.87907815631263,
    495.2994789579158,
    496.719879759519,
    498.1402805611222,
    499.56068136272546,
    500.98108216432865,
    502.40148296593185,
    503.82188376753504,
    505.24228456913823,
    506.6626853707415,
    508.0830861723447,
    509.5034869739479,
    510.92388777555107,
    512.3442885771543,
    513.7646893787575,
    515.1850901803607,
    516.605490981964,
    518.0258917835671,
    519.4462925851703,
    520.8666933867735,
    522.2870941883767,
    523.70749498998,
    525.1278957915831,
    526.5482965931864,
    527.9686973947896,
    529.3890981963928,
    530.809498997996,
    532.2298997995991,
    533.6503006012024,
    535.0707014028056,
    536.4911022044088,
    537.911503006012,
    539.3319038076152,
    540.7523046092184,
    542.1727054108217,
    543.5931062124248,
    545.013507014028,
    546.4339078156313,
    547.8543086172344,
    549.2747094188377,
    550.6951102204408,
    552.1155110220441,
    553.5359118236473,
    554.9563126252505,
    556.3767134268537,
    557.7971142284568,
    559.2175150300601,
    560.6379158316633,
    562.0583166332665,
    563.4787174348697,
    564.8991182364729,
    566.3195190380761,
    567.7399198396794,
    569.1603206412825,
    570.5807214428858,
    572.001122244489,
    573.4215230460921,
    574.8419238476954,
    576.2623246492985,
    577.6827254509018,
    579.103126252505,
    580.5235270541082,
    581.9439278557114,
    583.3643286573146,
    584.7847294589178,
    586.2051302605211,
    587.6255310621242,
    589.0459318637274,
    590.4663326653307,
    591.8867334669338,
    593.3071342685371,
    594.7275350701402,
    596.1479358717435,
    597.5683366733467,
    598.9887374749499,
    600.4091382765531,
    601.8295390781562,
    603.2499398797595,
    604.6703406813627,
    606.0907414829659,
    607.5111422845691,
    608.9315430861723,
    610.3519438877755,
    611.7723446893788,
    613.1927454909819,
    614.6131462925852,
    616.0335470941884,
    617.4539478957915,
    618.8743486973948,
    620.2947494989979,
    621.7151503006012,
    623.1355511022044,
    624.5559519038076,
    625.9763527054108,
    627.396753507014,
    628.8171543086172,
    630.2375551102205,
    631.6579559118236,
    633.0783567134268,
    634.4987575150301,
    635.9191583166332,
    637.3395591182365,
    638.7599599198396,
    640.1803607214429,
    641.6007615230461,
    643.0211623246493,
    644.4415631262525,
    645.8619639278556,
    647.2823647294589,
    648.7027655310621,
    650.1231663326653,
    651.5435671342685,
    652.9639679358717,
    654.3843687374749,
    655.8047695390782,
    657.2251703406813,
    658.6455711422846,
    660.0659719438878,
    661.4863727454909,
    662.9067735470942,
    664.3271743486973,
    665.7475751503006,
    667.1679759519038,
    668.588376753507,
    670.0087775551102,
    671.4291783567134,
    672.8495791583166,
    674.2699799599199,
    675.690380761523,
    677.1107815631262,
    678.5311823647295,
    679.9515831663326,
    681.3719839679359,
    682.792384769539,
    684.2127855711423,
    685.6331863727455,
    687.0535871743486,
    688.4739879759519,
    689.894388777555,
    691.3147895791583,
    692.7351903807615,
    694.1555911823647,
    695.5759919839679,
    696.9963927855712,
    698.4167935871743,
    699.8371943887776,
    701.2575951903807,
    702.677995991984,
    704.0983967935872,
    705.5187975951903,
    706.9391983967936,
    708.3595991983967,
    709.78
  ],
  "expected": [
    1.718281828459045,
    10.250367576723619,
    45.56278436115847,
    191.7130711666175,
    796.5967998479409,
    3300.076835507744,
    13661.427276542905,
    56544.766241794394,
    234029.42630362822,
    968599.1990256151,
    4008821.1021965314,
    16591627.479145551,
    68669081.48164964,
    284206151.20492357,
    1176266435.5395207,
    4868306750.9655485,
    20148845443.368958,
    83391617131.00539,
    345139468515.5171,
    1428455962656.499,
    5912063450818.461,
    24468723685039.89,
    101270638205327.1,
    419136784350723.9,
    1734714494833935.2,
    7179599813097942,
    29714776483245410,
    122982891029443100,
    508998999016127360,
    2106634336132119600,
    8718893818551835000,
    36085574091019810000,
    149350213981016700000,
    618127519875771500000,
    2.5582931597027186e+21,
    1.058820984430046e+22,
    4.382225988516872e+22,
    1.8137064618878867e+23,
    7.506530102540855e+23,
    3.1067868679091214e+24,
    1.2858304050956104e+25,
    5.321767797290421e+25,
    2.2025620467554167e+26,
    9.115917406763669e+26,
    3.7728766955442185e+27,
    1.561510259978784e+28,
    6.462745774063245e+28,
    2.674787608551468e+29,
    1.1070354615484629e+30,
    4.581775050877723e+30,
    1.8962954075095692e+31,
    7.848347491117041e+31,
    3.2482575287264316e+32,
    1.3443819842164269e+33,
    5.564099839689508e+33,
    2.302857922041954e+34,
    9.531019862877439e+34,
    3.944678425754367e+35,
    1.6326151982138667e+36,
    6.757033394754191e+36,
    2.7965867491479174e+37,
    1.15744543331419e+38,
    4.790410780241506e+38,
    1.982645123731268e+39,
    8.20572987783983e+39,
    3.3961701981922554e+40,
    1.405599768307942e+41,
    5.817466715063308e+41,
    2.4077208707575064e+42,
    9.965024426303397e+42,
    4.124303320325503e+43,
    1.7069579712368204e+44,
    7.0647216978671766e+44,
    2.923932135959475e+45,
    1.2101508737814223e+46,
    5.00854694711778e+46,
    2.0729268610199584e+47,
    8.579386030534915e+47,
    3.550818219641419e+48,
    1.4696051656917165e+49,
    6.082370905615799e+49,
    2.517358859178282e+50,
    1.041879182348514e+51,
    4.312107614905338e+51,
    1.784686017107185e+52,
    7.386420896937261e+52,
    3.057076322878744e+53,
    1.2652563094232786e+54,
    5.236616163471927e+54,
    2.1673196679046666e+55,
    8.970056991482943e+55,
    3.7125082940921358e+56,
    1.5365251131391878e+57,
    6.359337774583124e+57,
    2.6319893235339244e+58,
    1.089322197490993e+59,
    4.5084637666895345e+59,
    1.8659534876245714e+60,
    7.722768992185774e+60,
    3.196283364093561e+61,
    1.3228710264308272e+62,
    5.475070740689732e+62,
    2.2660107460690104e+63,
    9.378517547069194e+63,
    3.881561088501722e+64,
    1.6064923276151912e+65,
    6.648916608143848e+65,
    2.7518396012309132e+66,
    1.1389255779847937e+67,
    4.713761193086024e+67,
    1.9509215540456557e+68,
    8.074433035815332e+68,
    3.34182933776445e+69,
    1.3831092874516817e+70,
    5.724383586610284e+70,
    2.3691958216134126e+71,
    9.805577764355282e+71,
    4.058311871719352e+72,
    1.679645569484822e+73,
    6.951681704774534e+73,
    2.877147381713276e+74,
    1.19078769823629e+75,
    4.928407044016177e+75,
    2.0397587267221852e+76,
    8.442110454920321e+76,
    3.494002893548295e+77,
    1.4460905581978358e+78,
    5.9850491434061615e+78,
    2.4770795332227916e+79,
    1.0252084597619892e+80,
    4.243111179398078e+80,
    1.7561299177059287e+81,
    7.268233514209755e+81,
    3.0081611778523622e+82,
    1.2450114122292662e+83,
    5.152827009381552e+83,
    2.1326411892940434e+84,
    8.826530434638553e+84,
    3.653105825054059e+85,
    1.511939744372501e+86,
    6.257584368170764e+86,
    2.5898758380101757e+87,
    1.0718923568056442e+88,
    4.436325509184031e+88,
    1.836097057552296e+89,
    7.599199828265907e+89,
    3.14514081880283e+90,
    1.3017042575069769e+91,
    5.387466163301116e+91,
    2.229753148100133e+92,
    9.228455364285559e+92,
    3.819453668365731e+93,
    1.5807874393855548e+94,
    6.5425297581585615e+94,
    2.7078084358406555e+95,
    1.1207020519954524e+96,
    4.638338047561805e+96,
    1.9197055814390663e+97,
    7.945237025890366e+97,
    3.2883579653008947e+98,
    1.3609786684426915e+99,
    5.632789846790925e+99,
    2.3312871974999696e+100,
    9.64868234934018e+100,
    3.9933763278201715e+101,
    1.6527701833489734e+102,
    6.840450422708903e+102,
    2.8311112129773885e+103,
    1.1717343456853763e+104,
    4.849549429797485e+104,
    2.0071213034463124e+105,
    8.307031374904975e+105,
    3.4380966484272797e+106,
    1.4229521992219242e+107,
    5.889284590637636e+107,
    2.43744470183089e+108,
    1.0088044792279931e+109,
    4.175218730279283e+109,
    1.728030733865889e+110,
    7.151937203982738e+110,
    2.960028705929463e+111,
    1.2250904461307334e+112,
    5.070378534486295e+112,
    2.0985175881647453e+113,
    8.685300393027163e+113,
    3.5946538329032804e+114,
    1.4877477569779932e+115,
    6.157459080295827e+115,
    2.5484361947574767e+116,
    1.0547414045401302e+117,
    4.365341509196216e+117,
    1.8067183491502403e+118,
    7.477607848732535e+118,
    3.094816586421549e+119,
    1.2808761702064107e+120,
    5.301263314281489e+120,
    2.194075694516039e+121,
    9.080794270862923e+121,
    3.7583400060370794e+122,
    1.5554938455440333e+123,
    6.437845164723752e+123,
    2.664481796806061e+124,
    1.102770113890288e+125,
    4.564121719830667e+125,
    1.8889890840388242e+126,
    7.818108233428582e+126,
    3.2357421684471216e+127,
    1.3392021532649873e+128,
    5.5426616644498794e+128,
    2.293985135228762e+129,
    9.49429735970204e+129,
    3.929479793488324e+130,
    1.626324820304303e+131,
    6.730998911155702e+131,
    2.7858116519123116e+132,
    1.152985858765848e+133,
    4.77195358703234e+133,
    1.9750060994820342e+134,
    8.174113645177003e+134,
    3.383084938410868e+135,
    1.4001840685509555e+136,
    5.795052330979361e+136,
    2.398444052684005e+137,
    9.926629727057919e+137,
    4.1084126030721614e+138,
    1.7003811546504447e+139,
    7.037501707906226e+139,
    2.912666383847592e+140,
    1.2054882280263505e+141,
    4.989249287075467e+141,
    2.064939986128088e+142,
    8.546330120959079e+142,
    3.5371371094116607e+143,
    1.4639428566061907e+144,
    6.058935860037286e+144,
    2.507659611875217e+145,
    1.037864878304136e+146,
    4.29549329787954e+146,
    1.777809718571095e+147,
    7.357961417390785e+147,
    3.0452975734279273e+148,
    1.2603813454100924e+149,
    5.216439765094965e+149,
    2.1589691026417283e+150,
    8.935495847859701e+150,
    3.6982042007653557e+151,
    1.5306049651216276e+152,
    6.334835590663539e+152,
    2.6218484112619218e+153,
    1.0851250980795602e+154,
    4.4910929000487153e+154,
    1.858764069927355e+155,
    7.693013581650533e+155,
    3.1839682574546728e+156,
    1.3177740760343873e+157,
    5.453975589745356e+157,
    2.2572799294286607e+158,
    9.34238262705418e+158,
    3.8666056439165346e+159,
    1.600302599710825e+160,
    6.623298692666887e+160,
    2.7412369123320723e+161,
    1.1345373594356486e+162,
    4.695599326583704e+162,
    1.943404758991781e+163,
    8.04332268277187e+163,
    3.3289534503741576e+164,
    1.3777802422989425e+165,
    5.702327846777442e+165,
    2.360067438467184e+166,
    9.767797404459628e+166,
    4.0426754159421394e+167,
    1.6731739861027573e+168,
    6.924897251782972e+168,
    2.866061888724958e+169,
    1.186199657747516e+170,
    4.909418158678964e+170,
    2.031899646854864e+171,
    8.409583460700478e+171,
    3.480540689691775e+172,
    1.4405188496210068e+173,
    5.961989073304901e+173,
    2.467535479980481e+174,
    1.021258387108607e+175,
    4.226762701900131e+175,
    1.7493636442738154e+176,
    7.240229404246069e+176,
    2.9965708958053733e+177,
    1.24021445070812e+178,
    5.132973446075762e+178,
    2.124424238330468e+179,
    8.792522291063338e+179,
    3.639030606222063e+180,
    1.5061143224488098e+181,
    6.233474234613634e+181,
    2.579897186716414e+182,
    1.0677624136261173e+183,
    4.419232587341066e+183,
    1.829022675062687e+184,
    7.56992052302472e+184,
    3.13302276162032e+185,
    1.2966888615243872e+186,
    5.366708548047167e+186,
    2.221162030020452e+187,
    9.19289862573125e+187,
    3.804737520305683e+188,
    1.5746967510228949e+189,
    6.517321745451126e+189,
    2.6973753966366145e+190,
    1.1163840477046916e+191,
    4.620466782352772e+191,
    1.912309059836422e+192,
    7.914624458073772e+192,
    3.275688100211914e+193,
    1.3557348913660763e+194,
    5.61108701267523e+194,
    2.3223048742287642e+195,
    9.611506498978832e+195,
    3.977990065175745e+196,
    1.6464021493735848e+197,
    6.814094537820837e+197,
    2.8202030948531373e+198,
    1.1672197167317731e+199,
    4.83086437857536e+199,
    1.999387973802639e+200,
    8.27502483306257e+200,
    3.424849848304512e+201,
    1.417469641488718e+202,
    5.8665934961698495e+202,
    2.4280533594467295e+203,
    1.0049176102229003e+204,
    4.159131838709745e+204,
    1.7213727250667005e+205,
    7.124381177401641e+205,
    2.94862387568915e+206,
    1.2203702390127545e+207,
    5.050842640687662e+207,
    2.0904321135876285e+208,
    8.651836401150944e+208,
    3.580803826430428e+209,
    1.4820155454711416e+210,
    6.133734724048276e+210,
    2.538617208163974e+211,
    1.0506775430505058e+212,
    4.3485220848596736e+212,
    1.7997571612324202e+213,
    7.448797030800652e+213,
    3.0828924257800186e+214,
    1.2759410237158366e+215,
    5.280837833934805e+215,
    2.1856220397321425e+216,
    9.045806462501829e+216,
    3.7438593256070665e+217,
    1.5495006120281744e+218,
    6.413040496083203e+218,
    2.6542156927947887e+219,
    1.098521200385559e+220,
    4.546536406111743e+220,
    1.881710911436609e+221,
    7.787985485961968e+221,
    3.223275029172885e+222,
    1.3340422799215032e+223,
    5.521306089338086e+223,
    2.285146534782661e+224,
    9.457716346341211e+224,
    3.914339720728995e+225,
    1.6200586788799666e+226,
    6.705064737012158e+226,
    2.7750780705428357e+227,
    1.1485434667165553e+228,
    4.753567508388664e+228,
    1.9673965079795185e+229,
    8.142619228146005e+229,
    3.370050095426459e+230,
    1.3947892351916505e+231,
    5.7727243083030416e+231,
    2.3892029776881604e+232,
    9.888382960507845e+232,
    4.092583111891438e+233,
    1.693829678181972e+234,
    7.010386595092013e+234,
    2.9014440380685065e+235,
    1.2008435471926823e+236,
    4.970025979871819e+236,
    2.056983884232622e+237,
    8.513401574012234e+237,
    3.523508711758374e+238,
    1.4583023640907255e+239,
    6.03559110841976e+239,
    2.497997735246718e+240,
    1.0338660411557898e+241,
    4.2789429949170774e+241,
    1.7709599140406306e+242,
    7.3296115906772755e+242,
    3.0335642068608733e+243,
    1.2555251643690519e+244,
    5.1963411052878653e+244,
    2.150650711654253e+245,
    8.901067866450695e+245,
    3.683955220335115e+246,
    1.52470762711356e+247,
    6.310427812331159e+247,
    2.611746571375728e+248,
    1.0809441698648068e+249,
    4.4737889624159736e+249,
    1.851602352666924e+250,
    7.663372817100043e+250,
    3.1717006002547473e+251,
    1.3126967639115783e+252,
    5.432961717274708e+252,
    2.248582752151694e+253,
    9.306386932928591e+253,
    3.8517078218494313e+254,
    1.5941367204926469e+255,
    6.597779481630374e+255,
    2.7306750750192985e+256,
    1.1301660484548675e+257,
    4.67750743676894e+257,
    1.935916925741906e+258,
    8.012332196233238e+258,
    3.316127173080694e+259,
    1.3724717296685076e+260,
    5.680357086515276e+260,
    2.3509742264865416e+261,
    9.730162610244126e+261,
    4.027099206582254e+262,
    1.6667273373807144e+263,
    6.898215997837701e+263,
    2.85501910754039e+264,
    1.1816292947302155e+265,
    4.890502436488067e+265,
    2.02407084759638e+266,
    8.377181791227169e+266,
    3.467130354977677e+267,
    1.4349686085355104e+268,
    5.939017852404429e+268,
    2.4580281994581106e+269,
    1.0173235338711578e+270,
    4.2104772142006423e+270,
    1.7426234409265148e+271,
    7.212333192600912e+271,
    2.9850252704870226e+272,
    1.2354359716198683e+273,
    5.113196377474231e+273,
    2.1162389468336704e+274,
    8.75864517902288e+274,
    3.625009618445992e+275,
    1.500311345560233e+276,
    6.209456996094723e+276,
    2.5699569826253344e+277,
    1.0636483828939156e+278,
    4.402205523600305e+278,
    1.82197554978539e+279,
    7.540754029360379e+279,
    3.120951394655444e+280,
    1.2916927895908392e+281,
    5.346030910760675e+281,
    2.2126040130531707e+282,
    9.157478885364257e+282,
    3.790078072766626e+283,
    1.5686295297525698e+284,
    6.492210857850787e+284,
    2.6869825553672495e+285,
    1.1120826804505292e+286,
    4.602664374160782e+286,
    1.90494103663085e+287,
    7.884129838822498e+287,
    3.2630670514265275e+288,
    1.3505113182784484e+289,
    5.58946779840408e+289,
    2.3133571593622953e+290,
    9.574473885154872e+290,
    3.96266308496749e+291,
    1.6400586510881533e+292,
    6.787840200729959e+292,
    2.8093370051168965e+293,
    1.1627224823989419e+294,
    4.812251319843716e+294,
    1.9916844402591755e+295,
    8.243141610691653e+295,
    3.41165408738476e+296,
    1.4120082077534325e+297,
    5.843989829260225e+297,
    2.41869820139578e+298,
    1.0010457171135074e+299,
    4.143106929061658e+299,
    1.7147403692147576e+300,
    7.096931322698682e+300,
    2.9372629876417136e+301,
    1.2156682185970775e+302,
    5.031382017629737e+302,
    2.082377791906015e+303,
    8.618501344222467e+303,
    3.5670071832819695e+304,
    1.4763054198646752e+305,
    6.110101776460395e+305,
    2.528836053594003e+306,
    1.0466293393990357e+307,
    4.3317674648536384e+307,
    1.7928227943945155e+308
  ]
}

},{}],38:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],39:[function(require,module,exports){
module.exports={"expected":[-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-0.9999999999999999,-0.9999999999999999,-0.9999999999999997,-0.9999999999999994,-0.9999999999999988,-0.9999999999999976,-0.999999999999995,-0.9999999999999898,-0.9999999999999792,-0.9999999999999579,-0.9999999999999144,-0.999999999999826,-0.9999999999996462,-0.9999999999992808,-0.9999999999985378,-0.9999999999970275,-0.9999999999939571,-0.999999999987715,-0.9999999999750252,-0.9999999999492274,-0.9999999998967816,-0.9999999997901619,-0.9999999995734089,-0.9999999991327603,-0.9999999982369423,-0.9999999964157863,-0.9999999927134615,-0.9999999851868087,-0.999999969885476,-0.9999999387785837,-0.9999998755397289,-0.9999997469780998,-0.999999485618331,-0.9999989542861658,-0.999997874112767,-0.9999956781708538,-0.9999912139238244,-0.9999821383187651,-0.9999636880388739,-0.9999261794842557,-0.9998499263500022,-0.9996949073005448,-0.9993797608356809,-0.9987390828373078,-0.9974366144825484,-0.9947887573383086,-0.9894057878168747,-0.9784624629733415,-0.9562151962640939,-0.9109875453345073,-0.8190418499220337,-0.6321205588285577],"x":[-709.78,-709.0705105105105,-708.361021021021,-707.6515315315315,-706.9420420420421,-706.2325525525525,-705.5230630630631,-704.8135735735735,-704.1040840840841,-703.3945945945947,-702.6851051051051,-701.9756156156157,-701.2661261261261,-700.5566366366367,-699.8471471471471,-699.1376576576577,-698.4281681681682,-697.7186786786787,-697.0091891891892,-696.2996996996997,-695.5902102102102,-694.8807207207208,-694.1712312312312,-693.4617417417418,-692.7522522522522,-692.0427627627628,-691.3332732732732,-690.6237837837838,-689.9142942942943,-689.2048048048048,-688.4953153153153,-687.7858258258258,-687.0763363363363,-686.3668468468469,-685.6573573573573,-684.9478678678679,-684.2383783783783,-683.5288888888889,-682.8193993993993,-682.1099099099099,-681.4004204204205,-680.6909309309309,-679.9814414414415,-679.2719519519519,-678.5624624624625,-677.852972972973,-677.1434834834835,-676.433993993994,-675.7245045045045,-675.015015015015,-674.3055255255256,-673.596036036036,-672.8865465465466,-672.177057057057,-671.4675675675676,-670.758078078078,-670.0485885885886,-669.3390990990991,-668.6296096096096,-667.9201201201201,-667.2106306306306,-666.5011411411411,-665.7916516516517,-665.0821621621621,-664.3726726726727,-663.6631831831832,-662.9536936936937,-662.2442042042042,-661.5347147147147,-660.8252252252253,-660.1157357357357,-659.4062462462463,-658.6967567567567,-657.9872672672673,-657.2777777777778,-656.5682882882883,-655.8587987987988,-655.1493093093093,-654.4398198198198,-653.7303303303303,-653.0208408408408,-652.3113513513514,-651.6018618618618,-650.8923723723724,-650.1828828828828,-649.4733933933934,-648.763903903904,-648.0544144144144,-647.344924924925,-646.6354354354354,-645.925945945946,-645.2164564564565,-644.506966966967,-643.7974774774775,-643.087987987988,-642.3784984984985,-641.669009009009,-640.9595195195195,-640.2500300300301,-639.5405405405405,-638.8310510510511,-638.1215615615615,-637.4120720720721,-636.7025825825826,-635.9930930930931,-635.2836036036036,-634.5741141141141,-633.8646246246246,-633.1551351351351,-632.4456456456456,-631.7361561561562,-631.0266666666666,-630.3171771771772,-629.6076876876876,-628.8981981981982,-628.1887087087088,-627.4792192192192,-626.7697297297298,-626.0602402402402,-625.3507507507508,-624.6412612612612,-623.9317717717718,-623.2222822822823,-622.5127927927928,-621.8033033033033,-621.0938138138138,-620.3843243243243,-619.6748348348349,-618.9653453453453,-618.2558558558559,-617.5463663663663,-616.8368768768769,-616.1273873873874,-615.4178978978979,-614.7084084084084,-613.9989189189189,-613.2894294294294,-612.5799399399399,-611.8704504504504,-611.160960960961,-610.4514714714715,-609.741981981982,-609.0324924924925,-608.323003003003,-607.6135135135136,-606.904024024024,-606.1945345345346,-605.485045045045,-604.7755555555556,-604.066066066066,-603.3565765765766,-602.6470870870871,-601.9375975975976,-601.2281081081081,-600.5186186186186,-599.8091291291291,-599.0996396396397,-598.3901501501501,-597.6806606606607,-596.9711711711711,-596.2616816816817,-595.5521921921921,-594.8427027027027,-594.1332132132133,-593.4237237237237,-592.7142342342343,-592.0047447447447,-591.2952552552553,-590.5857657657658,-589.8762762762763,-589.1667867867868,-588.4572972972973,-587.7478078078078,-587.0383183183184,-586.3288288288288,-585.6193393393394,-584.9098498498498,-584.2003603603604,-583.4908708708708,-582.7813813813814,-582.0718918918919,-581.3624024024024,-580.6529129129129,-579.9434234234234,-579.2339339339339,-578.5244444444445,-577.8149549549549,-577.1054654654655,-576.395975975976,-575.6864864864865,-574.976996996997,-574.2675075075075,-573.5580180180181,-572.8485285285285,-572.1390390390391,-571.4295495495495,-570.7200600600601,-570.0105705705706,-569.3010810810811,-568.5915915915916,-567.8821021021021,-567.1726126126126,-566.4631231231231,-565.7536336336336,-565.0441441441442,-564.3346546546546,-563.6251651651652,-562.9156756756756,-562.2061861861862,-561.4966966966967,-560.7872072072072,-560.0777177177177,-559.3682282282282,-558.6587387387387,-557.9492492492493,-557.2397597597597,-556.5302702702703,-555.8207807807808,-555.1112912912913,-554.4018018018018,-553.6923123123123,-552.9828228228229,-552.2733333333333,-551.5638438438439,-550.8543543543543,-550.1448648648649,-549.4353753753754,-548.7258858858859,-548.0163963963964,-547.3069069069069,-546.5974174174174,-545.8879279279279,-545.1784384384384,-544.468948948949,-543.7594594594594,-543.04996996997,-542.3404804804804,-541.630990990991,-540.9215015015016,-540.212012012012,-539.5025225225226,-538.793033033033,-538.0835435435436,-537.374054054054,-536.6645645645646,-535.9550750750751,-535.2455855855856,-534.5360960960961,-533.8266066066066,-533.1171171171171,-532.4076276276277,-531.6981381381381,-530.9886486486487,-530.2791591591591,-529.5696696696697,-528.8601801801802,-528.1506906906907,-527.4412012012012,-526.7317117117117,-526.0222222222222,-525.3127327327327,-524.6032432432432,-523.8937537537538,-523.1842642642642,-522.4747747747748,-521.7652852852852,-521.0557957957958,-520.3463063063064,-519.6368168168168,-518.9273273273274,-518.2178378378378,-517.5083483483484,-516.7988588588588,-516.0893693693694,-515.3798798798799,-514.6703903903904,-513.9609009009009,-513.2514114114114,-512.5419219219219,-511.8324324324324,-511.1229429429429,-510.4134534534534,-509.703963963964,-508.9944744744745,-508.284984984985,-507.5754954954955,-506.866006006006,-506.1565165165165,-505.44702702702705,-504.73753753753755,-504.02804804804805,-503.31855855855855,-502.60906906906905,-501.89957957957955,-501.1900900900901,-500.4806006006006,-499.7711111111111,-499.0616216216216,-498.3521321321321,-497.64264264264267,-496.93315315315317,-496.2236636636637,-495.5141741741742,-494.8046846846847,-494.0951951951952,-493.38570570570573,-492.67621621621623,-491.96672672672673,-491.25723723723723,-490.54774774774774,-489.83825825825824,-489.1287687687688,-488.4192792792793,-487.7097897897898,-487.0003003003003,-486.2908108108108,-485.5813213213213,-484.87183183183186,-484.16234234234236,-483.45285285285286,-482.74336336336336,-482.03387387387386,-481.32438438438436,-480.6148948948949,-479.9054054054054,-479.1959159159159,-478.4864264264264,-477.7769369369369,-477.0674474474474,-476.357957957958,-475.6484684684685,-474.938978978979,-474.2294894894895,-473.52,-472.8105105105105,-472.10102102102104,-471.39153153153154,-470.68204204204204,-469.97255255255254,-469.26306306306304,-468.5535735735736,-467.8440840840841,-467.1345945945946,-466.4251051051051,-465.7156156156156,-465.0061261261261,-464.29663663663666,-463.58714714714716,-462.87765765765766,-462.16816816816817,-461.45867867867867,-460.74918918918917,-460.0396996996997,-459.3302102102102,-458.6207207207207,-457.9112312312312,-457.2017417417417,-456.49225225225223,-455.7827627627628,-455.0732732732733,-454.3637837837838,-453.6542942942943,-452.9448048048048,-452.2353153153153,-451.52582582582585,-450.81633633633635,-450.10684684684685,-449.39735735735735,-448.68786786786785,-447.97837837837835,-447.2688888888889,-446.5593993993994,-445.8499099099099,-445.1404204204204,-444.4309309309309,-443.7214414414414,-443.01195195195197,-442.3024624624625,-441.592972972973,-440.8834834834835,-440.173993993994,-439.46450450450453,-438.75501501501503,-438.04552552552553,-437.33603603603603,-436.62654654654654,-435.91705705705704,-435.2075675675676,-434.4980780780781,-433.7885885885886,-433.0790990990991,-432.3696096096096,-431.6601201201201,-430.95063063063066,-430.24114114114116,-429.53165165165166,-428.82216216216216,-428.11267267267266,-427.40318318318316,-426.6936936936937,-425.9842042042042,-425.2747147147147,-424.5652252252252,-423.8557357357357,-423.1462462462462,-422.4367567567568,-421.7272672672673,-421.0177777777778,-420.3082882882883,-419.5987987987988,-418.8893093093093,-418.17981981981984,-417.47033033033034,-416.76084084084084,-416.05135135135134,-415.34186186186184,-414.63237237237234,-413.9228828828829,-413.2133933933934,-412.5039039039039,-411.7944144144144,-411.0849249249249,-410.37543543543546,-409.66594594594596,-408.95645645645646,-408.24696696696697,-407.53747747747747,-406.82798798798797,-406.1184984984985,-405.409009009009,-404.6995195195195,-403.99003003003,-403.2805405405405,-402.57105105105103,-401.8615615615616,-401.1520720720721,-400.4425825825826,-399.7330930930931,-399.0236036036036,-398.3141141141141,-397.60462462462465,-396.89513513513515,-396.18564564564565,-395.47615615615615,-394.76666666666665,-394.05717717717715,-393.3476876876877,-392.6381981981982,-391.9287087087087,-391.2192192192192,-390.5097297297297,-389.8002402402402,-389.0907507507508,-388.3812612612613,-387.6717717717718,-386.9622822822823,-386.2527927927928,-385.5433033033033,-384.83381381381383,-384.12432432432433,-383.41483483483483,-382.70534534534534,-381.99585585585584,-381.2863663663664,-380.5768768768769,-379.8673873873874,-379.1578978978979,-378.4484084084084,-377.7389189189189,-377.02942942942946,-376.31993993993996,-375.61045045045046,-374.90096096096096,-374.19147147147146,-373.48198198198196,-372.7724924924925,-372.063003003003,-371.3535135135135,-370.644024024024,-369.9345345345345,-369.225045045045,-368.5155555555556,-367.8060660660661,-367.0965765765766,-366.3870870870871,-365.6775975975976,-364.9681081081081,-364.25861861861864,-363.54912912912914,-362.83963963963964,-362.13015015015014,-361.42066066066064,-360.71117117117115,-360.0016816816817,-359.2921921921922,-358.5827027027027,-357.8732132132132,-357.1637237237237,-356.4542342342342,-355.74474474474476,-355.03525525525527,-354.32576576576577,-353.61627627627627,-352.90678678678677,-352.1972972972973,-351.4878078078078,-350.7783183183183,-350.0688288288288,-349.35933933933933,-348.64984984984983,-347.9403603603604,-347.2308708708709,-346.5213813813814,-345.8118918918919,-345.1024024024024,-344.3929129129129,-343.68342342342345,-342.97393393393395,-342.26444444444445,-341.55495495495495,-340.84546546546545,-340.13597597597595,-339.4264864864865,-338.716996996997,-338.0075075075075,-337.298018018018,-336.5885285285285,-335.879039039039,-335.1695495495496,-334.4600600600601,-333.7505705705706,-333.0410810810811,-332.3315915915916,-331.6221021021021,-330.91261261261263,-330.20312312312313,-329.49363363363364,-328.78414414414414,-328.07465465465464,-327.36516516516514,-326.6556756756757,-325.9461861861862,-325.2366966966967,-324.5272072072072,-323.8177177177177,-323.10822822822826,-322.39873873873876,-321.68924924924926,-320.97975975975976,-320.27027027027026,-319.56078078078076,-318.8512912912913,-318.1418018018018,-317.4323123123123,-316.7228228228228,-316.0133333333333,-315.3038438438438,-314.5943543543544,-313.8848648648649,-313.1753753753754,-312.4658858858859,-311.7563963963964,-311.0469069069069,-310.33741741741744,-309.62792792792794,-308.91843843843844,-308.20894894894894,-307.49945945945944,-306.78996996996995,-306.0804804804805,-305.370990990991,-304.6615015015015,-303.952012012012,-303.2425225225225,-302.533033033033,-301.82354354354356,-301.11405405405407,-300.40456456456457,-299.69507507507507,-298.98558558558557,-298.27609609609607,-297.5666066066066,-296.8571171171171,-296.1476276276276,-295.43813813813813,-294.72864864864863,-294.0191591591592,-293.3096696696697,-292.6001801801802,-291.8906906906907,-291.1812012012012,-290.4717117117117,-289.76222222222225,-289.05273273273275,-288.34324324324325,-287.63375375375375,-286.92426426426425,-286.21477477477475,-285.5052852852853,-284.7957957957958,-284.0863063063063,-283.3768168168168,-282.6673273273273,-281.9578378378378,-281.2483483483484,-280.5388588588589,-279.8293693693694,-279.1198798798799,-278.4103903903904,-277.7009009009009,-276.99141141141143,-276.28192192192193,-275.57243243243244,-274.86294294294294,-274.15345345345344,-273.44396396396394,-272.7344744744745,-272.024984984985,-271.3154954954955,-270.606006006006,-269.8965165165165,-269.187027027027,-268.47753753753756,-267.76804804804806,-267.05855855855856,-266.34906906906906,-265.63957957957956,-264.9300900900901,-264.2206006006006,-263.5111111111111,-262.8016216216216,-262.0921321321321,-261.3826426426426,-260.6731531531532,-259.9636636636637,-259.2541741741742,-258.5446846846847,-257.8351951951952,-257.1257057057057,-256.41621621621624,-255.7067267267267,-254.99723723723724,-254.28774774774774,-253.57825825825824,-252.86876876876877,-252.15927927927927,-251.44978978978978,-250.7403003003003,-250.0308108108108,-249.32132132132134,-248.61183183183184,-247.90234234234234,-247.19285285285287,-246.48336336336337,-245.77387387387387,-245.0643843843844,-244.3548948948949,-243.6454054054054,-242.93591591591593,-242.22642642642643,-241.51693693693693,-240.80744744744746,-240.09795795795796,-239.38846846846846,-238.678978978979,-237.9694894894895,-237.26,-236.55051051051052,-235.84102102102102,-235.13153153153152,-234.42204204204205,-233.71255255255255,-233.00306306306305,-232.29357357357358,-231.58408408408408,-230.87459459459458,-230.1651051051051,-229.4556156156156,-228.74612612612611,-228.03663663663664,-227.32714714714714,-226.61765765765765,-225.90816816816817,-225.19867867867868,-224.48918918918918,-223.7796996996997,-223.0702102102102,-222.3607207207207,-221.65123123123124,-220.94174174174174,-220.23225225225227,-219.52276276276277,-218.81327327327327,-218.1037837837838,-217.3942942942943,-216.6848048048048,-215.97531531531533,-215.26582582582583,-214.55633633633633,-213.84684684684686,-213.13735735735736,-212.42786786786786,-211.7183783783784,-211.0088888888889,-210.2993993993994,-209.58990990990992,-208.88042042042042,-208.17093093093092,-207.46144144144145,-206.75195195195195,-206.04246246246245,-205.33297297297298,-204.62348348348348,-203.91399399399398,-203.2045045045045,-202.495015015015,-201.78552552552551,-201.07603603603604,-200.36654654654654,-199.65705705705705,-198.94756756756757,-198.23807807807808,-197.52858858858858,-196.8190990990991,-196.1096096096096,-195.4001201201201,-194.69063063063064,-193.98114114114114,-193.27165165165164,-192.56216216216217,-191.85267267267267,-191.1431831831832,-190.4336936936937,-189.7242042042042,-189.01471471471473,-188.30522522522523,-187.59573573573573,-186.88624624624626,-186.17675675675676,-185.46726726726726,-184.7577777777778,-184.0482882882883,-183.3387987987988,-182.62930930930932,-181.91981981981982,-181.21033033033032,-180.50084084084085,-179.79135135135135,-179.08186186186185,-178.37237237237238,-177.66288288288288,-176.95339339339338,-176.2439039039039,-175.5344144144144,-174.82492492492491,-174.11543543543544,-173.40594594594594,-172.69645645645645,-171.98696696696697,-171.27747747747748,-170.56798798798798,-169.8584984984985,-169.149009009009,-168.4395195195195,-167.73003003003004,-167.02054054054054,-166.31105105105104,-165.60156156156157,-164.89207207207207,-164.18258258258257,-163.4730930930931,-162.7636036036036,-162.05411411411413,-161.34462462462463,-160.63513513513513,-159.92564564564566,-159.21615615615616,-158.50666666666666,-157.7971771771772,-157.0876876876877,-156.3781981981982,-155.66870870870872,-154.95921921921922,-154.24972972972972,-153.54024024024025,-152.83075075075075,-152.12126126126125,-151.41177177177178,-150.70228228228228,-149.99279279279278,-149.2833033033033,-148.5738138138138,-147.86432432432431,-147.15483483483484,-146.44534534534534,-145.73585585585585,-145.02636636636637,-144.31687687687688,-143.60738738738738,-142.8978978978979,-142.1884084084084,-141.4789189189189,-140.76942942942944,-140.05993993993994,-139.35045045045044,-138.64096096096097,-137.93147147147147,-137.22198198198197,-136.5124924924925,-135.803003003003,-135.0935135135135,-134.38402402402403,-133.67453453453453,-132.96504504504506,-132.25555555555556,-131.54606606606606,-130.8365765765766,-130.1270870870871,-129.4175975975976,-128.70810810810812,-127.99861861861862,-127.28912912912912,-126.57963963963964,-125.87015015015015,-125.16066066066067,-124.45117117117117,-123.74168168168168,-123.0321921921922,-122.3227027027027,-121.61321321321321,-120.90372372372373,-120.19423423423423,-119.48474474474475,-118.77525525525526,-118.06576576576576,-117.35627627627628,-116.64678678678679,-115.93729729729729,-115.2278078078078,-114.51831831831832,-113.80882882882882,-113.09933933933934,-112.38984984984985,-111.68036036036035,-110.97087087087087,-110.26138138138138,-109.5518918918919,-108.8424024024024,-108.13291291291291,-107.42342342342343,-106.71393393393393,-106.00444444444445,-105.29495495495496,-104.58546546546546,-103.87597597597598,-103.16648648648649,-102.45699699699699,-101.7475075075075,-101.03801801801802,-100.32852852852852,-99.61903903903904,-98.90954954954955,-98.20006006006005,-97.49057057057057,-96.78108108108108,-96.0715915915916,-95.3621021021021,-94.65261261261261,-93.94312312312313,-93.23363363363363,-92.52414414414415,-91.81465465465466,-91.10516516516516,-90.39567567567568,-89.68618618618619,-88.97669669669669,-88.2672072072072,-87.55771771771772,-86.84822822822822,-86.13873873873874,-85.42924924924925,-84.71975975975975,-84.01027027027027,-83.30078078078078,-82.59129129129128,-81.8818018018018,-81.17231231231231,-80.46282282282283,-79.75333333333333,-79.04384384384385,-78.33435435435436,-77.62486486486486,-76.91537537537538,-76.20588588588589,-75.49639639639639,-74.7869069069069,-74.07741741741742,-73.36792792792792,-72.65843843843844,-71.94894894894895,-71.23945945945945,-70.52996996996997,-69.82048048048048,-69.11099099099098,-68.4015015015015,-67.69201201201201,-66.98252252252253,-66.27303303303303,-65.56354354354355,-64.85405405405406,-64.14456456456456,-63.435075075075076,-62.725585585585584,-62.0160960960961,-61.30660660660661,-60.597117117117115,-59.88762762762763,-59.17813813813814,-58.468648648648646,-57.75915915915916,-57.04966966966967,-56.34018018018018,-55.63069069069069,-54.9212012012012,-54.211711711711715,-53.50222222222222,-52.79273273273273,-52.083243243243246,-51.37375375375375,-50.66426426426426,-49.954774774774776,-49.245285285285284,-48.5357957957958,-47.82630630630631,-47.116816816816815,-46.40732732732733,-45.69783783783784,-44.988348348348346,-44.27885885885886,-43.56936936936937,-42.85987987987988,-42.15039039039039,-41.4409009009009,-40.731411411411415,-40.02192192192192,-39.31243243243243,-38.602942942942946,-37.89345345345345,-37.18396396396396,-36.474474474474476,-35.764984984984984,-35.05549549549549,-34.34600600600601,-33.636516516516515,-32.92702702702703,-32.21753753753754,-31.50804804804805,-30.798558558558558,-30.08906906906907,-29.37957957957958,-28.67009009009009,-27.9606006006006,-27.25111111111111,-26.541621621621623,-25.83213213213213,-25.122642642642642,-24.413153153153154,-23.703663663663665,-22.994174174174173,-22.284684684684684,-21.575195195195196,-20.865705705705707,-20.156216216216215,-19.446726726726727,-18.737237237237238,-18.027747747747746,-17.318258258258258,-16.60876876876877,-15.899279279279279,-15.18978978978979,-14.4803003003003,-13.770810810810811,-13.061321321321321,-12.351831831831833,-11.642342342342342,-10.932852852852854,-10.223363363363363,-9.513873873873873,-8.804384384384385,-8.094894894894894,-7.385405405405406,-6.675915915915916,-5.966426426426427,-5.2569369369369365,-4.547447447447447,-3.837957957957958,-3.1284684684684683,-2.418978978978979,-1.7094894894894894,-1.0]}
},{}],40:[function(require,module,exports){
module.exports={"expected":[1.718281828459045,4.526139605036564,10.234382915941184,21.838974134305474,45.430564403080524,93.3911621472732,190.89281039456188,389.1090933033613,792.0735099718115,1611.2812900695583,3276.692326907691,6662.394939853256,13545.369730911094,27538.1350119472,55984.77126354929,113815.45003064431,231382.5105815943,470390.8366338771,956283.5658950494,1.9440807202804782e6,3.952226056588822e6,8.034691443164972e6,1.6334152309494097e7,3.320656741881039e7,6.7507396858952e7,1.3723937610785338e8,2.79001222959248e8,5.671964160282148e8,1.1530837415166144e9,2.3441652252587843e9,4.765578079224924e9,9.688196967507166e9,1.969565054139165e10,4.004033480525908e10,8.140012475987735e10,1.654826400205472e11,3.364184542574713e11,6.839229562131511e11,1.390383328011468e12,2.8265841660226807e12,5.746313183311399e12,1.168198548538473e13,2.3748929187686773e13,4.828046039497157e13,9.81519140306735e13,1.9953824278129853e14,4.056518991550718e14,8.246713060837882e14,1.6765181292001182e15,3.408282811347275e15,6.928879276520302e15,1.4086086949343948e16,2.86363548311272e16,5.821636775090438e16,1.1835114818540298e17,2.4060233947841443e17,4.891332838765486e17,9.943850500976485e17,2.0215382196466348e18,4.10969249094277e18,8.354812293909443e18,1.698494196835819e19,3.4529591272660636e19,7.019704133686012e19,1.4270729628793422e20,2.9011724747889538e20,5.8979477205502604e20,1.1990251395472278e21,2.437561934055444e21,4.955449211515154e21,1.0074196082907584e22,2.0480368657807375e22,4.163562997064869e22,8.46432850900819e22,1.7207583302790374e23,3.498221067475627e23,7.111719537598167e23,1.4457792634000888e24,2.939201507352518e24,5.975258962081781e24,1.2147421527453798e25,2.4695138855410728e25,5.0204060319280825e25,1.020625025556297e26,2.0748828604042807e26,4.218139646392603e26,8.575280280161115e26,1.743314305542441e27,3.544076308432735e27,7.204941094133833e27,1.464730769098349e28,2.97772903055404e28,6.053583611725806e28,1.2306651870649697e29,2.5018846683144406e29,5.0862143167265915e29,1.0340035415422764e30,2.102080756616804e30,4.273431695164021e30,8.687686424866277e30,1.7661659481352722e31,3.5905326272184534e31,7.2993846137344085e31,1.4839306941627655e32,3.0167615786884446e32,6.1329349533978755e32,1.2467969430637725e33,2.534679772482983e33,5.152885227041958e33,1.0475574252544317e34,2.1296351672005585e34,4.32944852094939e34,8.801566007284992e34,1.7893171337121245e35,3.637597902857043e35,7.395066114087081e35,1.503382294914111e36,3.056305771703304e36,6.213326445141211e36,1.2631401566989335e37,2.5679047601193956e37,5.220430070307349e37,1.0612889754409135e38,2.1575507654029278e38,4.386199624241668e38,8.916938341474034e38,1.8127717887303275e39,3.6852801176522753e39,7.492001822841556e39,1.5230888703575218e40,3.0963683163215003e40,6.294771721409309e40,1.2796975997909523e41,2.6015652662048933e41,5.288860302175652e41,1.0752005209822831e42,2.1858322857289538e42,4.4436946300677905e42,9.033822994662357e42,1.83653389111583e43,3.733587358541237e43,7.590208180361837e43,1.5430537627420194e44,3.1369560071787094e44,6.3772845953779945e44,1.2964720804937949e45,2.6356669995849262e45,5.358187528462056e45,1.0892944212864251e46,2.2144845247443276e46,4.501943289621154e46,9.15223979056915e46,1.8606074709378684e47,3.78252781846593e47,7.689701842515174e47,1.5632803581273612e48,3.17807572797578e48,6.460879061288674e48,1.313466443771158e49,2.6702157439374034e49,5.428423507112857e49,1.1035730666887203e50,2.24351234188889e50,4.5609554819151595e50,9.272208812766088e50,1.8849966110924724e51,3.832109797762591e51,7.790499683496476e51,1.5837720869583161e52,3.219734452646256e52,6.54556929682142e52,1.330683571878978e53,2.705217358753646e53,5.499580150199315e53,1.1180388788574473e54,2.2729206603008283e54,4.6207412154590904e54,9.393750408083512e54,1.9097054479949248e55,3.882341705569751e55,7.892618798690413e55,1.6045324246464722e56,3.261939246538981e56,6.631369665499698e56,1.348126384854262e57,2.74067778033201e57,5.571669525938102e57,1.1326943112044998e58,2.3027144676515153e58,4.681310629955237e58,9.516885190061268e58,1.9347381722813283e59,3.933232061254162e59,7.996076507570235e59,1.6255648921596907e60,3.3046972676166096e60,6.718294719125951e60,1.365797841010349e61,2.7766030227848744e61,5.644703860737691e61,1.1475418493015033e62,2.3328988169915814e62,4.742673998018997e62,9.641634042444913e62,1.9600990295192038e63,3.984789495856024e63,8.10089035663641e63,1.6468730566191503e64,3.3480157676696593e64,6.806359200250649e64,1.3837009374385438e65,2.8129991790586834e65,5.7186955412728235e65,1.162584011301288e66,2.3634788276079526e66,4.804841726920517e66,9.768018122726928e66,1.985792320927844e67,4.03702275355231e67,8.207078122390827e67,1.6684605319045866e68,3.391902093546041e68,6.895578044671195e68,1.4018387105166406e69,2.8498724219670017e69,5.793657116584114e69,1.1778233483651491e70,2.394459685891821e70,4.867824360350101e70,9.896058865736563e70,2.0118224041073873e71,4.0899406931400593e71,8.314657814353527e71,1.6903309792668612e72,3.4363636883973177e72,6.9859663839665905e72,1.4202142364236007e73,2.887229005237616e73,5.869601300207659e73,1.1932624450952784e74,2.42584664621842e74,4.931632580206846e74,1.002577798727311e75,2.0381936937783186e75,4.143552289539186e75,8.42364767811528e75,1.712488107949287e76,3.4814080929413676e76,7.077539548062208e76,1.438830631661591e77,2.925075264573424e77,5.946540972329955e77,1.2089039199733817e78,2.457645031838381e78,4.99627720840933e78,1.0157197487791164e79,2.064910662529813e79,4.197866635313822e79,8.534066198433931e79,1.7349356758163888e80,3.5270429467406087e80,7.170313067831331e80,1.4576910535842666e81,2.963417618726397e81,6.024489181973714e81,1.22475042580454e82,2.489860235780077e82,5.0617692087321384e82,1.0290339656129946e83,2.0919778415784573e83,4.2528929422153574e83,8.645932102367514e83,1.7576774899913759e84,3.573275989498466e84,7.2643026777276e84,1.4767987009323769e85,3.0022625705868714e85,6.1034591492096444e85,1.2408046501672253e86,2.522497721764841e86,5.128119688664192e86,1.0425227073294325e87,2.1193998215369277e87,4.308640542743812e87,8.75926436245232e87,1.780717407501989e88,3.620115062371228e88,7.359524318455214e88,1.4961568143764023e89,3.041616708285768e89,6.183464267399944e89,1.257069315869224e90,2.5555630251330543e90,5.19533990129373e90,1.0561882616285486e91,2.1471812531921466e91,4.365118891731594e91,8.874082199918935e91,1.8040593359343038e92,3.667568109298722e92,7.455994139671046e92,1.515768677065881e93,3.081486706312625e93,6.26451810546862e93,1.2735471814091809e94,2.589061753783512e94,5.263441247215839e94,1.0700329461978809e95,2.175326848294537e95,4.422337567946199e95,8.990405087952898e95,1.8277072340958613e96,3.7156431783507973e96,7.553728502724248e96,1.5356376151865715e97,3.1218793266469087e97,6.346634410203303e97,1.2902410414447245e98,2.622999589123952e98,5.3324352764664166e98,1.084059109105707e99,2.203841380356653e99,4.480306275715133e99,9.108252754998148e99,1.8516651126866795e100,3.764348423093105e100,7.652743983431797e100,1.5557669985242334e101,3.1628014199055456e101,6.429827108587249e101,1.3071537272661575e102,2.657382287035208e102,5.402333690481535e102,1.098269129199036e103,2.232729685463264e103,4.539034846572159e103,9.227645188101187e103,1.8759370349798817e104,3.813692103969224e104,7.753057374888264e104,1.5761602410364925e105,3.2042599265041777e105,6.514110310160114e105,1.3242881072769356e106,2.6922156788468976e106,5.47314834408095e106,1.1126654165073082e107,2.2619966630911242e107,4.5985332409238474e107,9.348602636302962e107,1.9005271175104675e108,3.863682589701943e108,7.854685690315661e108,1.5968208014314984e109,3.246261877834521e109,6.599498309412389e109,1.3416470874798563e110,2.7275056723266345e110,5.5448912474799075e110,1.1272504126508899e111,2.2916472769401742e111,4.658811549739753e111,9.471145614071031e111,1.9254395307736332e112,3.9143283587129365e112,7.957646165947374e112,1.617752183754927e113,3.288814397457082e113,6.686005588208288e113,1.359233611970218e114,2.763258252682228e114,5.617574568325011e114,1.1420265912554561e115,2.3216865557751957e115,4.719879996263479e115,9.59529490478094e115,1.9506784999322564e116,3.965638000560055e116,8.061956263951853e116,1.6389579379836778e117,3.33192470230914e117,6.77364681824337e117,1.3770506634348756e118,2.7994794835763174e118,5.691210633758149e118,1.1569964583711044e119,2.3521195942792175e119,4.781748937746276e119,9.721071564239238e119,1.9762483055331612e120,4.01762021739433e120,8.167633675395823e120,1.660441660628777e121,3.3756001039285545e121,6.862436863531553e121,1.3951012636582593e122,2.8361755081549135e122,5.765811932508329e122,1.1721625528979636e123,2.382951553916794e123,4.8444288672040274e123,9.84849692425562e123,2.0021532842332052e124,4.0702838254366636e124,8.27469632324196e124,1.6822069953445675e125,3.419848009694084e125,6.95239078292682e125,1.4133884740347517e126,2.873352550089855e126,5.841391117007843e126,1.1875274470162422e127,2.414187663809912e127,4.907930415196749e127,9.977592596259984e127,2.028397829535178e128,4.123637756471705e128,8.383162365390457e128,1.7042576335470887e129,3.464675924081397e129,7.043523832676614e129,1.4319153960882236e130,2.911016914633378e130,5.917961005539413e130,1.203093746622763e131,2.445833221624588e131,4.972264351631255e131,1.010838047497001e132,2.0549863925322652e132,4.177691059363594e132,8.493050197758171e132,1.7265973150399536e133,3.5100914499366185e133,7.135851469010914e133,1.4506851719975754e134,2.949174989688138e134,5.99553458440986e134,1.2188640917727925e135,2.477893594469907e135,5.037441587588865e135,1.0240882742101137e136,2.0819234826634065e136,4.232452901590427e136,8.604378457398081e136,1.7492298286490129e137,3.5561022897646037e137,7.229389350761227e137,1.4697009851299708e138,2.987833246890437e138,6.074125010152243e138,1.2348411571280708e139,2.5103742198074616e139,5.10347317717425e139,1.0375121870130836e140,2.1092136684779894e140,4.287932570798826e140,8.71716602566211e140,1.7721590128643576e141,3.602716247036072e141,7.324153342017929e141,1.4889660605805753e142,3.02699824270765e142,6.153745611758598e142,1.2510276524100243e143,2.5432806063741e143,5.170370319391335e143,1.0511120626108816e144,2.1368615784105536e144,4.3441394763801005e144,8.83143203140049e144,1.7953887564917197e145,3.649941227510883e145,7.420159514820007e145,1.5084836657198705e146,3.0666766195508886e146,6.234409892938482e146,1.2674263228596097e147,2.576618335116071e147,5.238144360042081e147,1.0648902075520698e148,2.164871901566265e148,4.401083151064634e148,8.947195854207969e148,1.818922999311917e149,3.6977852405786503e149,7.517424151882569e149,1.5282571107472992e150,3.1068751069005364e150,6.316131534410581e150,1.2840399497028416e151,2.610393060135414e151,5.306806793651927e151,1.0788489586196393e152,2.193249388515464e152,4.458773252539607e152,9.06447712771012e152,1.84276573274894e153,3.746256400617978e153,7.615963749355889e153,1.5482897492530123e154,3.147600522448253e154,6.398924396222265e154,1.3008713506224158e155,2.644610509649484e155,5.376369265417497e155,1.0929906832275646e156,2.2219988520998485e156,4.5172195650864526e156,9.183295742892697e156,1.8669210005473165e157,3.7953629283714105e157,7.71579501962484e157,1.5685849787865557e158,3.1888597732529095e158,6.482802520101712e158,1.3179233802358847e159,2.6792764869615816e159,5.44684357318281e159,1.1073177798222621e160,2.2511251682484865e160,4.5764320012412964e160,9.303671851477243e160,1.891392899457311e161,3.8451131523405107e161,7.816934894142907e161,1.5891462414330084e162,3.230659856912751e162,6.5677801318372256e162,1.3351989305793623e163,2.7143968714457814e163,5.5182416694399125e163,1.1218326782893032e164,2.2806332768052872e164,4.636420603474603e164,9.425625869335721e164,1.9161855799301493e165,3.895515510198172e165,7.91940052630332e165,1.6099770243971216e166,3.273007862751117e166,6.653871643691381e166,1.3527009315983085e167,2.7499776195437783e167,5.590575663355707e167,1.1365378403657788e168,2.31052818236604e168,4.697195545895404e168,9.549178479955125e168,1.9413032468217243e169,3.946578550219425e169,8.023209294350087e169,1.6310808605942129e170,3.3159109730195114e170,6.741091656844995e170,1.370432351644298e171,2.786024765775726e171,5.663857822826948e171,1.151435760057432e172,2.340814955127704e172,4.758767135976575e172,9.67435063794436e172,1.9667501601061847e173,3.9983109327321337e173,8.128378804322657e173,1.6524613292497084e174,3.359376464115538e174,6.829454963873107e174,1.388396197978767e175,2.8225444237627626e175,5.738100576558985e175,1.1665289640618956e176,2.3714987317481904e176,4.821145816302722e176,9.801163572590342e176,1.992530635597769e177,4.050721431584448e177,8.234926893043718e177,1.674122056506094e178,3.4034117078167914e178,6.918976551255361e178,1.4065955172825814e179,2.8595427872645075e179,5.813316516174944e179,1.1818200121970919e180,2.402584716217406e180,4.88434216634234e180,9.929638791455218e180,2.0186490456832094e181,4.103818935633747e181,8.342871631143399e181,1.6960667160378143e182,3.4480241725318854e182,7.009671601915408e182,1.4250333961730644e183,2.8970261312293706e183,5.889518398350624e183,1.197311497835647e184,2.434078180740401e184,4.948366904240469e184,1.0059798084026256e185,2.0451098200631826e185,4.157612450253738e185,8.452231326125965e185,1.7182990296747147e186,3.493221424565946e186,7.101555497797475e186,1.443712961727413e187,2.935000812858621e187,5.966719146979375e187,1.2130060483443286e188,2.4659844666307196e188,5.013230888637577e188,1.01916635254108e189,2.0719174465034718e189,4.2121110988627123e189,8.56302452547195e189,1.740822768032692e190,3.5390111294046312e190,7.194643822474773e190,1.462637382012968e191,2.97347327268524e191,6.044931855362001e191,1.2289063255299147e192,2.4983089852168365e192,5.078945120510643e192,1.0325257480079645e193,2.099076471596565e193,4.267324124469481e193,8.675270019785699e193,1.7636417511535762e194,3.585401053013807e194,7.28895236379207e194,1.4818098666248542e195,3.0124500356652437e195,6.124169788428722e195,1.2450150260905728e196,2.5310572187596405e196,5.145520745040073e196,1.046060260566241e197,2.1265915015320573e197,4.3232608912419286e197,8.788986845981806e197,1.7867598491528128e198,3.63239906315747e198,7.384497116544967e198,1.5012336672298316e199,3.051937712284981e199,6.2044463849885845e199,1.2613348820731488e200,2.5642347213828038e200,5.2129690534982155e200,1.0597721856786773e201,2.1544672028783325e201,4.379930886094945e201,8.904194290513277e201,1.8101809828762463e202,3.6800131307309177e202,7.481294285190162e202,1.5209120781181115e203,3.0919429996821137e203,6.285775260008332e203,1.2778686613368105e204,2.597847120013909e204,5.28130148516551e204,1.0736638488973937e205,2.182708303373773e205,4.437343720299169e205,9.020911892644546e205,1.8339091245644888e206,3.728251331113418e206,7.579360286595374e206,1.5408484367619003e207,3.132472682781276e207,6.368170206922942e207,1.2946191680220515e208,2.6319001153393474e208,5.3505296292703145e208,1.0877376062581575e209,2.2113195927290856e209,4.495509131112067e209,9.139159447762329e209,1.8579482985270195e210,3.7771218455376025e210,7.678711752822814e210,1.5610461243817867e211,3.173533635445512e211,6.451645199972873e211,1.3115892430265582e212,2.66639948277102e212,5.420665226954133e212,1.1019958446802146e213,2.2403059234388968e213,4.5544369834278736e213,9.258957010734941e213,1.8823025818246093e214,3.8266329624767894e214,7.77936553395173e214,1.581508566519676e215,3.21513282164103e215,6.536214396575515e215,1.3287817644869588e216,2.7013510734256957e216,5.4917201732641563e216,1.1164409823707446e217,2.2696722116052337e217,4.61413727145169e217,9.380324899312588e217,1.9069761049606857e218,3.876793079051584e218,7.881338700933595e218,1.6022392336201122e219,3.2572772966189957e219,6.621892139725574e219,1.3461996482668792e220,2.7367608151179786e220,5.56370651916883e220,1.1310754692352356e221,2.2994234377711743e221,4.674620120393989e221,9.503283697575388e221,1.9319730525823e222,3.9276107024527366e222,7.984648548488625e222,1.6232416416187814e223,3.299974208111748e223,6.708692960429533e223,1.3638458484517823e224,2.7726347133645956e224,5.6366364736029274e224,1.1459017872928626e225,2.3295646477655507e225,4.735895788188915e225,9.627854259421822e225,1.9572976641892008e226,3.9790944513846064e226,8.089312598040814e226,1.644519352538723e227,3.3432307975459984e227,6.796631580165971e227,1.3817233578494463e228,2.8089788524043332e228,5.7105224055375696e228,1.1609224510977665e229,2.360100953558593e229,4.797974667232731e229,9.754057712104942e229,1.982954234853173e230,4.031253057527815e230,8.195348600684575e230,1.666075975094919e231,3.387054401268909e231,6.885722913387253e231,1.3998352084982448e232,2.8457993962280395e232,5.785376846079627e232,1.1761400081648057e233,2.3910375341293196e233,4.860867286146062e233,9.881915459819952e233,2.0089471159469417e234,4.084095367017649e234,8.30277454020221e234,1.6879151653053035e235,3.431452451794797e235,6.975982070046793e235,1.4181844721804396e236,2.883102589626424e236,5.861212490593431e236,1.1915570394024665e237,2.4223796363437775e237,4.9245843115617444e237,1.0011449187331718e238,2.0352807158809237e238,4.1376303419477996e238,8.411608636106561e238,1.7100406271120468e239,3.476432479064578e239,7.0674243581593165e239,1.4367742609443464e240,2.9208947592466093e240,5.93804220085815e240,1.207176159550201e241,2.4541325758439465e241,4.9891365499325606e241,1.0142680863649048e242,2.061959500852605e242,4.191867061886642e242,8.521869346737586e242,1.7324561130091922e243,3.5220021117216505e243,7.160065286402646e243,1.4556077276308583e244,2.959182314667405e244,6.015879007247236e244,1.2230000176214733e245,2.4863017379511993e245,5.054534949362305e245,1.027563274575745e246,2.08898799560217e246,4.2468147254203966e246,8.633575372390155e246,1.755165424678485e247,3.568169078408484e247,7.253920566741593e247,1.4746880664093015e248,2.9979717494854137e248,6.094736110936308e248,1.239031297353991e249,2.5188925785774396e249,5.1207906014659684e249,1.0410327382390596e250,2.1163707841815245e250,4.3024826517118425e250,8.746745658482649e250,1.7781724136355142e251,3.6149412090742156e251,7.349006117098361e251,1.49401851331869e252,3.0372696424153212e252,6.174626886146859e252,1.255272717663765e253,2.551910625152383e253,5.187914743249224e253,1.0546787617851016e254,2.1441125107310678e254,4.3588802820793664e254,8.861399398776967e254,1.8014809818813485e255,3.6623264363054237e255,7.445338064049854e255,1.5136023468160453e256,3.0770826584080275e256,6.255564882409024e256,1.271727033107215e257,2.5853614775601904e257,5.255918759012445e257,1.0685036595892776e258,2.1722178802666036e258,4.416017181601132e258,8.977556038625909e258,1.8250950825657157e259,3.7103327966703164e259,7.542932745560185e259,1.5334428883336117e260,3.1174175497782846e260,6.337563826864452e260,1.2883970343479316e261,2.6192508090883164e261,5.324814182285606e261,1.0825097763637138e262,2.200691659478766e262,4.4739030407358974e262,9.095235278278092e262,1.8490187206568717e263,3.758968432080457e263,7.641806713757516e263,1.5535435028408049e264,3.158281157352315e264,6.420637626592389e264,1.3052855486295308e265,2.6535843673917588e265,5.3946126977796324e265,1.0966994875557626e266,2.229538677540741e266,4.5325476769649754e266,9.214457076216174e266,1.8732559536202045e267,3.8082415911745856e267,7.741976737734506e267,1.5739075994161213e268,3.1996804116269987e268,6.504800370966105e268,1.3223954402561795e269,2.688367975465496e269,5.465326143372324e269,1.1110751997505245e270,2.258763826926529e270,4.591961036460845e270,9.335241652538658e270,1.897810892107638e271,3.8581606307141965e271,7.84345980639836e271,1.5945386318248098e272,3.2416223339441866e272,6.590066334047568e272,1.3397296110772037e273,2.723607532634162e273,5.536966512114298e273,1.1256393510786237e274,2.288372064242482e274,4.652153195769923e274,9.457609492395469e274,1.9226877006541878e275,3.908734017003849e275,7.946273131349635e275,1.6154400991040821e276,3.284114037684063e276,6.676449977002456e276,1.3572910009802857e277,2.7593090155516903e277,5.60954595426111e277,1.1403944116305984e278,2.318368411065906e278,4.7131343635251814e278,9.581581349459197e278,1.9478905983836035e279,3.959970327325792e279,8.050434149798583e279,1.6366155461578195e280,3.327162729468656e280,6.7639659505579644e280,1.3750825883896315e281,2.795478479214012e281,5.6830767793383383e281,1.1553428838748138e282,2.348757954798527e282,4.774914882175999e282,9.70717824944162e282,1.9734238597254636e283,4.011878251393313e283,8.155960527527913e283,1.6580685643563303e284,3.3707757103866656e284,6.852629097485392e284,1.3931073907706383e285,2.832122057988173e285,5.757571458224227e285,1.1704873030827786e286,2.3795458495285536e286,4.837505229740609e286,9.83442149366729e286,1.9992918151383613e287,4.0644665928271963e287,8.262870161886266e287,1.679802792146737e288,3.4149603772306433e288,6.94245445511512e288,1.4113684651427516e289,2.8692459666502044e289,5.833042625269221e289,1.1858302377587515e290,2.4107373169039982e290,4.900916021586968e290,9.963332662677489e290,2.0254988518459067e291,4.117744270647519e291,8.371181184820777e291,1.7018219156695166e292,3.4597242237503184e292,7.033457257892398e292,1.4298689085966795e293,2.906856501441382e293,5.909503080436877e293,1.2013742900749513e294,2.442337647020157e294,4.9651580122287575e294,1.0093933619898035e295,2.052049414580146e295,4.17172032078489e295,8.480911965958825e295,1.724129669383083e296,3.5050748419258515e296,7.125652939954838e296,1.4486118588207703e297,2.94496004113513e297,5.986965791472706e297,1.2171220963138285e298,2.474352199314639e298,5.030242097153217e298,1.0226246515344071e299,2.0789480063346853e299,4.226403897616227e299,8.592081115715967e299,1.7467298366983097e300,3.5510199232543085e300,7.219057137755598e300,1.4676004946327002e301,2.9835630481178506e301,6.065443896108204e301,1.2330763273140956e302,2.5067864034782503e302,5.096179314667393e302,1.036029378937319e303,2.106199189130029e303,4.2818042755135755e303,8.704707488458952e303,1.7696262506196317e304,3.5975672600529185e304,7.313685692712992e304,1.4868380365180948e305,3.0226720694872875e305,6.144950704283608e305,1.2492396889246612e306,2.539645760375062e306,5.162980847768492e306,1.0496098176499464e307,2.1338075847854238e307,4.3379308504203717e307,8.818810185700627e307,1.7928227943945155e308],"x":[1.0,1.7094894894894894,2.418978978978979,3.1284684684684683,3.837957957957958,4.547447447447447,5.2569369369369365,5.966426426426427,6.675915915915916,7.385405405405406,8.094894894894894,8.804384384384385,9.513873873873873,10.223363363363363,10.932852852852854,11.642342342342342,12.351831831831833,13.061321321321321,13.770810810810811,14.4803003003003,15.18978978978979,15.899279279279279,16.60876876876877,17.318258258258258,18.027747747747746,18.737237237237238,19.446726726726727,20.156216216216215,20.865705705705707,21.575195195195196,22.284684684684684,22.994174174174173,23.703663663663665,24.413153153153154,25.122642642642642,25.83213213213213,26.541621621621623,27.25111111111111,27.9606006006006,28.67009009009009,29.37957957957958,30.08906906906907,30.798558558558558,31.50804804804805,32.21753753753754,32.92702702702703,33.636516516516515,34.34600600600601,35.05549549549549,35.764984984984984,36.474474474474476,37.18396396396396,37.89345345345345,38.602942942942946,39.31243243243243,40.02192192192192,40.731411411411415,41.4409009009009,42.15039039039039,42.85987987987988,43.56936936936937,44.27885885885886,44.988348348348346,45.69783783783784,46.40732732732733,47.116816816816815,47.82630630630631,48.5357957957958,49.245285285285284,49.954774774774776,50.66426426426426,51.37375375375375,52.083243243243246,52.79273273273273,53.50222222222222,54.211711711711715,54.9212012012012,55.63069069069069,56.34018018018018,57.04966966966967,57.75915915915916,58.468648648648646,59.17813813813814,59.88762762762763,60.597117117117115,61.30660660660661,62.0160960960961,62.725585585585584,63.435075075075076,64.14456456456456,64.85405405405406,65.56354354354355,66.27303303303303,66.98252252252253,67.69201201201201,68.4015015015015,69.11099099099098,69.82048048048048,70.52996996996997,71.23945945945945,71.94894894894895,72.65843843843844,73.36792792792792,74.07741741741742,74.7869069069069,75.49639639639639,76.20588588588589,76.91537537537538,77.62486486486486,78.33435435435436,79.04384384384385,79.75333333333333,80.46282282282283,81.17231231231231,81.8818018018018,82.59129129129128,83.30078078078078,84.01027027027027,84.71975975975975,85.42924924924925,86.13873873873874,86.84822822822822,87.55771771771772,88.2672072072072,88.97669669669669,89.68618618618619,90.39567567567568,91.10516516516516,91.81465465465466,92.52414414414415,93.23363363363363,93.94312312312313,94.65261261261261,95.3621021021021,96.0715915915916,96.78108108108108,97.49057057057057,98.20006006006005,98.90954954954955,99.61903903903904,100.32852852852852,101.03801801801802,101.7475075075075,102.45699699699699,103.16648648648649,103.87597597597598,104.58546546546546,105.29495495495496,106.00444444444445,106.71393393393393,107.42342342342343,108.13291291291291,108.8424024024024,109.5518918918919,110.26138138138138,110.97087087087087,111.68036036036035,112.38984984984985,113.09933933933934,113.80882882882882,114.51831831831832,115.2278078078078,115.93729729729729,116.64678678678679,117.35627627627628,118.06576576576576,118.77525525525526,119.48474474474475,120.19423423423423,120.90372372372373,121.61321321321321,122.3227027027027,123.0321921921922,123.74168168168168,124.45117117117117,125.16066066066067,125.87015015015015,126.57963963963964,127.28912912912912,127.99861861861862,128.70810810810812,129.4175975975976,130.1270870870871,130.8365765765766,131.54606606606606,132.25555555555556,132.96504504504506,133.67453453453453,134.38402402402403,135.0935135135135,135.803003003003,136.5124924924925,137.22198198198197,137.93147147147147,138.64096096096097,139.35045045045044,140.05993993993994,140.76942942942944,141.4789189189189,142.1884084084084,142.8978978978979,143.60738738738738,144.31687687687688,145.02636636636637,145.73585585585585,146.44534534534534,147.15483483483484,147.86432432432431,148.5738138138138,149.2833033033033,149.99279279279278,150.70228228228228,151.41177177177178,152.12126126126125,152.83075075075075,153.54024024024025,154.24972972972972,154.95921921921922,155.66870870870872,156.3781981981982,157.0876876876877,157.7971771771772,158.50666666666666,159.21615615615616,159.92564564564566,160.63513513513513,161.34462462462463,162.05411411411413,162.7636036036036,163.4730930930931,164.18258258258257,164.89207207207207,165.60156156156157,166.31105105105104,167.02054054054054,167.73003003003004,168.4395195195195,169.149009009009,169.8584984984985,170.56798798798798,171.27747747747748,171.98696696696697,172.69645645645645,173.40594594594594,174.11543543543544,174.82492492492491,175.5344144144144,176.2439039039039,176.95339339339338,177.66288288288288,178.37237237237238,179.08186186186185,179.79135135135135,180.50084084084085,181.21033033033032,181.91981981981982,182.62930930930932,183.3387987987988,184.0482882882883,184.7577777777778,185.46726726726726,186.17675675675676,186.88624624624626,187.59573573573573,188.30522522522523,189.01471471471473,189.7242042042042,190.4336936936937,191.1431831831832,191.85267267267267,192.56216216216217,193.27165165165164,193.98114114114114,194.69063063063064,195.4001201201201,196.1096096096096,196.8190990990991,197.52858858858858,198.23807807807808,198.94756756756757,199.65705705705705,200.36654654654654,201.07603603603604,201.78552552552551,202.495015015015,203.2045045045045,203.91399399399398,204.62348348348348,205.33297297297298,206.04246246246245,206.75195195195195,207.46144144144145,208.17093093093092,208.88042042042042,209.58990990990992,210.2993993993994,211.0088888888889,211.7183783783784,212.42786786786786,213.13735735735736,213.84684684684686,214.55633633633633,215.26582582582583,215.97531531531533,216.6848048048048,217.3942942942943,218.1037837837838,218.81327327327327,219.52276276276277,220.23225225225227,220.94174174174174,221.65123123123124,222.3607207207207,223.0702102102102,223.7796996996997,224.48918918918918,225.19867867867868,225.90816816816817,226.61765765765765,227.32714714714714,228.03663663663664,228.74612612612611,229.4556156156156,230.1651051051051,230.87459459459458,231.58408408408408,232.29357357357358,233.00306306306305,233.71255255255255,234.42204204204205,235.13153153153152,235.84102102102102,236.55051051051052,237.26,237.9694894894895,238.678978978979,239.38846846846846,240.09795795795796,240.80744744744746,241.51693693693693,242.22642642642643,242.93591591591593,243.6454054054054,244.3548948948949,245.0643843843844,245.77387387387387,246.48336336336337,247.19285285285287,247.90234234234234,248.61183183183184,249.32132132132134,250.0308108108108,250.7403003003003,251.44978978978978,252.15927927927927,252.86876876876877,253.57825825825824,254.28774774774774,254.99723723723724,255.7067267267267,256.41621621621624,257.1257057057057,257.8351951951952,258.5446846846847,259.2541741741742,259.9636636636637,260.6731531531532,261.3826426426426,262.0921321321321,262.8016216216216,263.5111111111111,264.2206006006006,264.9300900900901,265.63957957957956,266.34906906906906,267.05855855855856,267.76804804804806,268.47753753753756,269.187027027027,269.8965165165165,270.606006006006,271.3154954954955,272.024984984985,272.7344744744745,273.44396396396394,274.15345345345344,274.86294294294294,275.57243243243244,276.28192192192193,276.99141141141143,277.7009009009009,278.4103903903904,279.1198798798799,279.8293693693694,280.5388588588589,281.2483483483484,281.9578378378378,282.6673273273273,283.3768168168168,284.0863063063063,284.7957957957958,285.5052852852853,286.21477477477475,286.92426426426425,287.63375375375375,288.34324324324325,289.05273273273275,289.76222222222225,290.4717117117117,291.1812012012012,291.8906906906907,292.6001801801802,293.3096696696697,294.0191591591592,294.72864864864863,295.43813813813813,296.1476276276276,296.8571171171171,297.5666066066066,298.27609609609607,298.98558558558557,299.69507507507507,300.40456456456457,301.11405405405407,301.82354354354356,302.533033033033,303.2425225225225,303.952012012012,304.6615015015015,305.370990990991,306.0804804804805,306.78996996996995,307.49945945945944,308.20894894894894,308.91843843843844,309.62792792792794,310.33741741741744,311.0469069069069,311.7563963963964,312.4658858858859,313.1753753753754,313.8848648648649,314.5943543543544,315.3038438438438,316.0133333333333,316.7228228228228,317.4323123123123,318.1418018018018,318.8512912912913,319.56078078078076,320.27027027027026,320.97975975975976,321.68924924924926,322.39873873873876,323.10822822822826,323.8177177177177,324.5272072072072,325.2366966966967,325.9461861861862,326.6556756756757,327.36516516516514,328.07465465465464,328.78414414414414,329.49363363363364,330.20312312312313,330.91261261261263,331.6221021021021,332.3315915915916,333.0410810810811,333.7505705705706,334.4600600600601,335.1695495495496,335.879039039039,336.5885285285285,337.298018018018,338.0075075075075,338.716996996997,339.4264864864865,340.13597597597595,340.84546546546545,341.55495495495495,342.26444444444445,342.97393393393395,343.68342342342345,344.3929129129129,345.1024024024024,345.8118918918919,346.5213813813814,347.2308708708709,347.9403603603604,348.64984984984983,349.35933933933933,350.0688288288288,350.7783183183183,351.4878078078078,352.1972972972973,352.90678678678677,353.61627627627627,354.32576576576577,355.03525525525527,355.74474474474476,356.4542342342342,357.1637237237237,357.8732132132132,358.5827027027027,359.2921921921922,360.0016816816817,360.71117117117115,361.42066066066064,362.13015015015014,362.83963963963964,363.54912912912914,364.25861861861864,364.9681081081081,365.6775975975976,366.3870870870871,367.0965765765766,367.8060660660661,368.5155555555556,369.225045045045,369.9345345345345,370.644024024024,371.3535135135135,372.063003003003,372.7724924924925,373.48198198198196,374.19147147147146,374.90096096096096,375.61045045045046,376.31993993993996,377.02942942942946,377.7389189189189,378.4484084084084,379.1578978978979,379.8673873873874,380.5768768768769,381.2863663663664,381.99585585585584,382.70534534534534,383.41483483483483,384.12432432432433,384.83381381381383,385.5433033033033,386.2527927927928,386.9622822822823,387.6717717717718,388.3812612612613,389.0907507507508,389.8002402402402,390.5097297297297,391.2192192192192,391.9287087087087,392.6381981981982,393.3476876876877,394.05717717717715,394.76666666666665,395.47615615615615,396.18564564564565,396.89513513513515,397.60462462462465,398.3141141141141,399.0236036036036,399.7330930930931,400.4425825825826,401.1520720720721,401.8615615615616,402.57105105105103,403.2805405405405,403.99003003003,404.6995195195195,405.409009009009,406.1184984984985,406.82798798798797,407.53747747747747,408.24696696696697,408.95645645645646,409.66594594594596,410.37543543543546,411.0849249249249,411.7944144144144,412.5039039039039,413.2133933933934,413.9228828828829,414.63237237237234,415.34186186186184,416.05135135135134,416.76084084084084,417.47033033033034,418.17981981981984,418.8893093093093,419.5987987987988,420.3082882882883,421.0177777777778,421.7272672672673,422.4367567567568,423.1462462462462,423.8557357357357,424.5652252252252,425.2747147147147,425.9842042042042,426.6936936936937,427.40318318318316,428.11267267267266,428.82216216216216,429.53165165165166,430.24114114114116,430.95063063063066,431.6601201201201,432.3696096096096,433.0790990990991,433.7885885885886,434.4980780780781,435.2075675675676,435.91705705705704,436.62654654654654,437.33603603603603,438.04552552552553,438.75501501501503,439.46450450450453,440.173993993994,440.8834834834835,441.592972972973,442.3024624624625,443.01195195195197,443.7214414414414,444.4309309309309,445.1404204204204,445.8499099099099,446.5593993993994,447.2688888888889,447.97837837837835,448.68786786786785,449.39735735735735,450.10684684684685,450.81633633633635,451.52582582582585,452.2353153153153,452.9448048048048,453.6542942942943,454.3637837837838,455.0732732732733,455.7827627627628,456.49225225225223,457.2017417417417,457.9112312312312,458.6207207207207,459.3302102102102,460.0396996996997,460.74918918918917,461.45867867867867,462.16816816816817,462.87765765765766,463.58714714714716,464.29663663663666,465.0061261261261,465.7156156156156,466.4251051051051,467.1345945945946,467.8440840840841,468.5535735735736,469.26306306306304,469.97255255255254,470.68204204204204,471.39153153153154,472.10102102102104,472.8105105105105,473.52,474.2294894894895,474.938978978979,475.6484684684685,476.357957957958,477.0674474474474,477.7769369369369,478.4864264264264,479.1959159159159,479.9054054054054,480.6148948948949,481.32438438438436,482.03387387387386,482.74336336336336,483.45285285285286,484.16234234234236,484.87183183183186,485.5813213213213,486.2908108108108,487.0003003003003,487.7097897897898,488.4192792792793,489.1287687687688,489.83825825825824,490.54774774774774,491.25723723723723,491.96672672672673,492.67621621621623,493.38570570570573,494.0951951951952,494.8046846846847,495.5141741741742,496.2236636636637,496.93315315315317,497.64264264264267,498.3521321321321,499.0616216216216,499.7711111111111,500.4806006006006,501.1900900900901,501.89957957957955,502.60906906906905,503.31855855855855,504.02804804804805,504.73753753753755,505.44702702702705,506.1565165165165,506.866006006006,507.5754954954955,508.284984984985,508.9944744744745,509.703963963964,510.4134534534534,511.1229429429429,511.8324324324324,512.5419219219219,513.2514114114114,513.9609009009009,514.6703903903904,515.3798798798799,516.0893693693694,516.7988588588588,517.5083483483484,518.2178378378378,518.9273273273274,519.6368168168168,520.3463063063064,521.0557957957958,521.7652852852852,522.4747747747748,523.1842642642642,523.8937537537538,524.6032432432432,525.3127327327327,526.0222222222222,526.7317117117117,527.4412012012012,528.1506906906907,528.8601801801802,529.5696696696697,530.2791591591591,530.9886486486487,531.6981381381381,532.4076276276277,533.1171171171171,533.8266066066066,534.5360960960961,535.2455855855856,535.9550750750751,536.6645645645646,537.374054054054,538.0835435435436,538.793033033033,539.5025225225226,540.212012012012,540.9215015015016,541.630990990991,542.3404804804804,543.04996996997,543.7594594594594,544.468948948949,545.1784384384384,545.8879279279279,546.5974174174174,547.3069069069069,548.0163963963964,548.7258858858859,549.4353753753754,550.1448648648649,550.8543543543543,551.5638438438439,552.2733333333333,552.9828228228229,553.6923123123123,554.4018018018018,555.1112912912913,555.8207807807808,556.5302702702703,557.2397597597597,557.9492492492493,558.6587387387387,559.3682282282282,560.0777177177177,560.7872072072072,561.4966966966967,562.2061861861862,562.9156756756756,563.6251651651652,564.3346546546546,565.0441441441442,565.7536336336336,566.4631231231231,567.1726126126126,567.8821021021021,568.5915915915916,569.3010810810811,570.0105705705706,570.7200600600601,571.4295495495495,572.1390390390391,572.8485285285285,573.5580180180181,574.2675075075075,574.976996996997,575.6864864864865,576.395975975976,577.1054654654655,577.8149549549549,578.5244444444445,579.2339339339339,579.9434234234234,580.6529129129129,581.3624024024024,582.0718918918919,582.7813813813814,583.4908708708708,584.2003603603604,584.9098498498498,585.6193393393394,586.3288288288288,587.0383183183184,587.7478078078078,588.4572972972973,589.1667867867868,589.8762762762763,590.5857657657658,591.2952552552553,592.0047447447447,592.7142342342343,593.4237237237237,594.1332132132133,594.8427027027027,595.5521921921921,596.2616816816817,596.9711711711711,597.6806606606607,598.3901501501501,599.0996396396397,599.8091291291291,600.5186186186186,601.2281081081081,601.9375975975976,602.6470870870871,603.3565765765766,604.066066066066,604.7755555555556,605.485045045045,606.1945345345346,606.904024024024,607.6135135135136,608.323003003003,609.0324924924925,609.741981981982,610.4514714714715,611.160960960961,611.8704504504504,612.5799399399399,613.2894294294294,613.9989189189189,614.7084084084084,615.4178978978979,616.1273873873874,616.8368768768769,617.5463663663663,618.2558558558559,618.9653453453453,619.6748348348349,620.3843243243243,621.0938138138138,621.8033033033033,622.5127927927928,623.2222822822823,623.9317717717718,624.6412612612612,625.3507507507508,626.0602402402402,626.7697297297298,627.4792192192192,628.1887087087088,628.8981981981982,629.6076876876876,630.3171771771772,631.0266666666666,631.7361561561562,632.4456456456456,633.1551351351351,633.8646246246246,634.5741141141141,635.2836036036036,635.9930930930931,636.7025825825826,637.4120720720721,638.1215615615615,638.8310510510511,639.5405405405405,640.2500300300301,640.9595195195195,641.669009009009,642.3784984984985,643.087987987988,643.7974774774775,644.506966966967,645.2164564564565,645.925945945946,646.6354354354354,647.344924924925,648.0544144144144,648.763903903904,649.4733933933934,650.1828828828828,650.8923723723724,651.6018618618618,652.3113513513514,653.0208408408408,653.7303303303303,654.4398198198198,655.1493093093093,655.8587987987988,656.5682882882883,657.2777777777778,657.9872672672673,658.6967567567567,659.4062462462463,660.1157357357357,660.8252252252253,661.5347147147147,662.2442042042042,662.9536936936937,663.6631831831832,664.3726726726727,665.0821621621621,665.7916516516517,666.5011411411411,667.2106306306306,667.9201201201201,668.6296096096096,669.3390990990991,670.0485885885886,670.758078078078,671.4675675675676,672.177057057057,672.8865465465466,673.596036036036,674.3055255255256,675.015015015015,675.7245045045045,676.433993993994,677.1434834834835,677.852972972973,678.5624624624625,679.2719519519519,679.9814414414415,680.6909309309309,681.4004204204205,682.1099099099099,682.8193993993993,683.5288888888889,684.2383783783783,684.9478678678679,685.6573573573573,686.3668468468469,687.0763363363363,687.7858258258258,688.4953153153153,689.2048048048048,689.9142942942943,690.6237837837838,691.3332732732732,692.0427627627628,692.7522522522522,693.4617417417418,694.1712312312312,694.8807207207208,695.5902102102102,696.2996996996997,697.0091891891892,697.7186786786787,698.4281681681682,699.1376576576577,699.8471471471471,700.5566366366367,701.2661261261261,701.9756156156157,702.6851051051051,703.3945945945947,704.1040840840841,704.8135735735735,705.5230630630631,706.2325525525525,706.9420420420421,707.6515315315315,708.361021021021,709.0705105105105,709.78]}
},{}],41:[function(require,module,exports){
module.exports={"expected":[-0.6321205588285577,-0.6317521267700319,-0.631383325726,-0.6310141553269224,-0.6306446152028891,-0.6302747049836198,-0.6299044242984633,-0.6295337727763972,-0.6291627500460275,-0.6287913557355884,-0.6284195894729416,-0.628047450885576,-0.6276749396006078,-0.6273020552447796,-0.6269287974444597,-0.6265551658256432,-0.6261811600139496,-0.6258067796346242,-0.6254320243125365,-0.6250568936721808,-0.6246813873376746,-0.6243055049327598,-0.623929246080801,-0.6235526104047855,-0.6231755975273232,-0.6227982070706463,-0.622420438656608,-0.6220422919066836,-0.6216637664419685,-0.6212848618831792,-0.6209055778506523,-0.6205259139643439,-0.6201458698438294,-0.6197654451083038,-0.6193846393765801,-0.6190034522670897,-0.6186218833978823,-0.6182399323866243,-0.6178575988506,-0.6174748824067098,-0.6170917826714706,-0.6167082992610153,-0.6163244317910923,-0.6159401798770654,-0.6155555431339129,-0.6151705211762276,-0.6147851136182163,-0.6143993200736994,-0.6140131401561105,-0.6136265734784964,-0.6132396196535158,-0.61285227829344,-0.6124645490101516,-0.6120764314151448,-0.6116879251195244,-0.6112990297340061,-0.6109097448689154,-0.6105200701341875,-0.6101300051393674,-0.6097395494936086,-0.6093487028056735,-0.6089574646839324,-0.6085658347363635,-0.6081738125705524,-0.6077813977936916,-0.6073885900125804,-0.6069953888336241,-0.6066017938628339,-0.6062078047058266,-0.6058134209678235,-0.6054186422536513,-0.6050234681677402,-0.6046278983141247,-0.6042319322964425,-0.6038355697179345,-0.6034388101814441,-0.603041653289417,-0.6026440986439008,-0.6022461458465447,-0.6018477944985985,-0.6014490442009129,-0.6010498945539392,-0.6006503451577279,-0.6002503956119294,-0.599850045515793,-0.5994492944681667,-0.5990481420674968,-0.598646587911827,-0.5982446315987993,-0.5978422727256518,-0.5974395108892199,-0.5970363456859349,-0.596632776711824,-0.5962288035625101,-0.5958244258332105,-0.5954196431187377,-0.595014455013498,-0.5946088611114918,-0.5942028610063128,-0.5937964542911475,-0.5933896405587751,-0.5929824194015672,-0.5925747904114866,-0.5921667531800883,-0.5917583072985172,-0.5913494523575096,-0.5909401879473913,-0.5905305136580785,-0.590120429079076,-0.5897099337994779,-0.5892990274079666,-0.5888877094928125,-0.5884759796418741,-0.5880638374425966,-0.5876512824820124,-0.5872383143467399,-0.586824932622984,-0.5864111368965348,-0.5859969267527677,-0.585582301776643,-0.585167261552705,-0.5847518056650822,-0.5843359336974867,-0.5839196452332132,-0.5835029398551395,-0.5830858171457255,-0.582668276687013,-0.5822503180606252,-0.5818319408477662,-0.5814131446292208,-0.5809939289853538,-0.5805742934961099,-0.580154237741013,-0.5797337612991661,-0.5793128637492503,-0.5788915446695251,-0.5784698036378273,-0.5780476402315712,-0.5776250540277479,-0.5772020446029245,-0.5767786115332443,-0.5763547543944261,-0.5759304727617637,-0.5755057662101256,-0.5750806343139546,-0.5746550766472671,-0.5742290927836532,-0.5738026822962755,-0.5733758447578696,-0.5729485797407429,-0.5725208868167744,-0.5720927655574146,-0.5716642155336846,-0.5712352363161761,-0.5708058274750505,-0.5703759885800388,-0.5699457192004411,-0.5695150189051262,-0.569083887262531,-0.5686523238406604,-0.5682203282070863,-0.567787899928948,-0.5673550385729509,-0.5669217437053665,-0.5664880148920322,-0.5660538516983501,-0.5656192536892876,-0.5651842204293761,-0.5647487514827109,-0.5643128464129508,-0.5638765047833174,-0.5634397261565953,-0.5630025100951308,-0.5625648561608322,-0.5621267639151688,-0.5616882329191707,-0.5612492627334288,-0.5608098529180934,-0.5603700030328744,-0.5599297126370412,-0.5594889812894212,-0.5590478085484002,-0.558606193971922,-0.5581641371174872,-0.5577216375421535,-0.5572786948025351,-0.5568353084548019,-0.5563914780546795,-0.5559472031574483,-0.5555024833179435,-0.5550573180905546,-0.5546117070292246,-0.5541656496874497,-0.5537191456182794,-0.553272194374315,-0.5528247955077099,-0.5523769485701693,-0.5519286531129489,-0.5514799086868556,-0.5510307148422458,-0.550581071129026,-0.5501309770966518,-0.5496804322941278,-0.5492294362700063,-0.5487779885723881,-0.5483260887489213,-0.5478737363468008,-0.5474209309127682,-0.5469676719931109,-0.5465139591336621,-0.5460597918798,-0.5456051697764479,-0.5451500923680729,-0.544694559198686,-0.5442385698118416,-0.5437821237506368,-0.5433252205577115,-0.542867859775247,-0.5424100409449666,-0.5419517636081344,-0.5414930273055549,-0.5410338315775731,-0.5405741759640734,-0.5401140600044795,-0.5396534832377536,-0.5391924452023966,-0.538730945436447,-0.5382689834774803,-0.5378065588626094,-0.5373436711284835,-0.5368803198112874,-0.5364165044467418,-0.5359522245701024,-0.5354874797161591,-0.5350222694192361,-0.5345565932131915,-0.5340904506314161,-0.5336238412068337,-0.5331567644719002,-0.5326892199586032,-0.5322212071984617,-0.5317527257225254,-0.5312837750613746,-0.5308143547451191,-0.5303444643033983,-0.5298741032653806,-0.5294032711597629,-0.5289319675147698,-0.5284601918581537,-0.5279879437171937,-0.5275152226186961,-0.5270420280889926,-0.5265683596539409,-0.5260942168389238,-0.5256195991688486,-0.5251445061681471,-0.5246689373607746,-0.5241928922702097,-0.5237163704194536,-0.5232393713310302,-0.5227618945269847,-0.522283939528884,-0.5218055058578157,-0.5213265930343877,-0.5208472005787279,-0.5203673280104837,-0.5198869748488212,-0.5194061406124251,-0.5189248248194979,-0.5184430269877598,-0.5179607466344478,-0.5174779832763157,-0.5169947364296328,-0.5165110056101846,-0.516026790333271,-0.515542090113707,-0.5150569044658215,-0.514571232903457,-0.5140850749399689,-0.5135984300882256,-0.5131112978606074,-0.5126236777690063,-0.5121355693248254,-0.5116469720389786,-0.51115788542189,-0.5106683089834931,-0.510178242233231,-0.5096876846800552,-0.5091966358324256,-0.5087050951983095,-0.5082130622851819,-0.5077205366000243,-0.5072275176493243,-0.5067340049390754,-0.5062399979747765,-0.5057454962614311,-0.5052504993035467,-0.504755006605135,-0.5042590176697107,-0.5037625320002915,-0.5032655490993972,-0.5027680684690493,-0.5022700896107707,-0.5017716120255851,-0.5012726352140163,-0.5007731586760882,-0.5002731819113235,-0.4997727044187442,-0.4992717256968701,-0.49877024524371916,-0.4982682625568063,-0.4977657771331433,-0.49726278846923827,-0.496759296061095,-0.49625529940421254,-0.4957507979935847,-0.49524579132369945,-0.4947402788885386,-0.4942342601815771,-0.4937277346957827,-0.4932207019236153,-0.4927131613570264,-0.49220511248745885,-0.4916965548058461,-0.49118748780261184,-0.4906779109676693,-0.4901678237904209,-0.4896572257597578,-0.489146116364059,-0.48863449509119156,-0.4881223614285093,-0.4876097148628526,-0.48709655488054815,-0.486582880967408,-0.48606869260872926,-0.4855539892892937,-0.485038770493367,-0.48452303570469835,-0.48400678440651973,-0.4834900160815459,-0.4829727302119734,-0.48245492627948017,-0.48193660376522507,-0.4814177621498473,-0.480898400913466,-0.4803785195356796,-0.47985811749556534,-0.47933719427167876,-0.4788157493420533,-0.4782937821841994,-0.47777129227510434,-0.4772482790912317,-0.47672474210852056,-0.47620068080238537,-0.47567609464771504,-0.4751509831188726,-0.4746253456896947,-0.4740991818334909,-0.4735724910230436,-0.4730452727306068,-0.4725175264279063,-0.4719892515861385,-0.47146044767597045,-0.4709311141675391,-0.4704012505304505,-0.4698708562337797,-0.46933993074607,-0.46880847353533234,-0.4682764840690451,-0.4677439618141531,-0.4672109062370674,-0.46667731680366464,-0.4661431929792866,-0.46560853422873955,-0.4650733400162938,-0.4645376098056831,-0.46400134306010404,-0.4634645392422157,-0.46292719781413905,-0.4623893182374564,-0.46185089997321055,-0.4613119424819049,-0.46077244522350225,-0.46023240765742485,-0.45969182924255325,-0.4591507094372263,-0.4586090476992402,-0.45806684348584825,-0.45752409625376017,-0.45698080545914155,-0.45643697055761334,-0.45589259100425134,-0.45534766625358536,-0.45480219575959935,-0.4542561789757301,-0.45370961535486715,-0.45316250434935196,-0.45261484541097763,-0.45206663799098834,-0.45151788154007844,-0.4509685755083923,-0.45041871934552363,-0.44986831250051473,-0.44931735442185644,-0.4487658445574869,-0.4482137823547916,-0.4476611672606024,-0.44710799872119744,-0.44655427618230004,-0.4459999990890785,-0.4454451668861455,-0.44488977901755733,-0.44433383492681383,-0.44377733405685726,-0.4432202758500719,-0.44266265974828384,-0.4421044851927599,-0.44154575162420756,-0.44098645848277407,-0.4404266052080459,-0.43986619123904835,-0.4393052160142449,-0.43874367897153665,-0.4381815795482618,-0.43761891718119494,-0.43705569130654665,-0.4364919013599628,-0.43592754677652423,-0.4353626269907459,-0.4347971414365764,-0.4342310895473974,-0.4336644707560232,-0.4330972844947001,-0.4325295301951056,-0.43196120728834825,-0.4313923152049667,-0.4308228533749292,-0.4302528212276334,-0.42968221819190533,-0.4291110436959989,-0.42853929716759553,-0.42796697803380335,-0.42739408572115706,-0.4268206196556166,-0.4262465792625672,-0.4256719639668187,-0.4250967731926047,-0.42452100636358236,-0.42394466290283156,-0.4233677422328543,-0.4227902437755743,-0.4222121669523362,-0.4216335111839055,-0.4210542758904672,-0.42047446049162573,-0.4198940644064043,-0.41931308705324416,-0.41873152785000434,-0.41814938621396064,-0.4175666615618054,-0.41698335330964664,-0.41639946087300767,-0.4158149836668266,-0.4152299211054554,-0.41464427260265957,-0.4140580375716175,-0.4134712154249198,-0.41288380557456905,-0.41229580743197863,-0.41170722040797264,-0.41111804391278495,-0.41052827735605907,-0.40993792014684705,-0.409346971693609,-0.4087554314042129,-0.40816329868593343,-0.4075705729454519,-0.4069772535888553,-0.4063833400216357,-0.40578883164868984,-0.4051937278743185,-0.40459802810222606,-0.40400173173551934,-0.4034048381767076,-0.4028073468277016,-0.4022092570898131,-0.4016105683637545,-0.40101128004963776,-0.4004113915469742,-0.3998109022546736,-0.3992098115710438,-0.3986081188937902,-0.39800582362001485,-0.397402925146216,-0.39679942286828757,-0.39619531618151826,-0.39559060448059147,-0.3949852871595842,-0.3943793636119665,-0.39377283323060125,-0.393165695407743,-0.39255794953503786,-0.39194959500352256,-0.39134063120362406,-0.39073105752515863,-0.39012087335733164,-0.3895100780887366,-0.3888986711073549,-0.38828665180055466,-0.38767401955509084,-0.3870607737571039,-0.3864469137921197,-0.3858324390450487,-0.38521734890018533,-0.3846016427412073,-0.3839853199511751,-0.3833683799125314,-0.3827508220071005,-0.38213264561608734,-0.3815138501200773,-0.3808944348990354,-0.38027439933230567,-0.37965374279861064,-0.3790324646760504,-0.3784105643421024,-0.3777880411736207,-0.377164894546835,-0.3765411238373505,-0.37591672842014706,-0.3752917076695786,-0.37466606095937227,-0.3740397876626282,-0.37341288715181864,-0.37278535879878727,-0.3721572019747488,-0.37152841605028813,-0.37089900039535983,-0.3702689543792875,-0.369638277370763,-0.3690069687378461,-0.3683750278479636,-0.36774245406790873,-0.3671092467638406,-0.3664754053012836,-0.3658409290451266,-0.36520581735962243,-0.3645700696083872,-0.3639336851543997,-0.36329666336000077,-0.3626590035868927,-0.3620207051961382,-0.3613817675481605,-0.360742190002742,-0.36010197191902404,-0.3594611126555062,-0.35881961157004544,-0.3581774680198557,-0.35753468136150723,-0.3568912509509258,-0.356247176143392,-0.35560245629354104,-0.35495709075536164,-0.3543110788821955,-0.3536644200267366,-0.35301711354103105,-0.35236915877647546,-0.3517205550838174,-0.3510713018131538,-0.35042139831393093,-0.34977084393494356,-0.34911963802433404,-0.34846777992959216,-0.34781526899755405,-0.3471621045744017,-0.3465082860056624,-0.34585381263620796,-0.345198683810254,-0.3445428988713593,-0.3438864571624255,-0.3432293580256959,-0.34257160080275517,-0.3419131848345285,-0.34125410946128104,-0.34059437402261733,-0.33993397785748036,-0.3392729203041511,-0.3386112007002479,-0.3379488183827256,-0.3372857726878752,-0.3366220629513228,-0.3359576885080291,-0.33529264869228903,-0.3346269428377304,-0.3339605702773142,-0.33329353034333287,-0.33262582236741034,-0.3319574456805012,-0.3312883996128899,-0.33061868349419027,-0.3299482966533447,-0.32927723841862344,-0.3286055081176241,-0.3279331050772709,-0.32726002862381387,-0.32658627808282825,-0.32591185277921403,-0.32523675203719493,-0.3245609751803179,-0.32388452153145253,-0.32320739041279006,-0.32252958114584307,-0.32185109305144455,-0.3211719254497474,-0.3204920776602236,-0.3198115490016634,-0.3191303387921752,-0.3184484463491842,-0.3177658709894319,-0.3170826120289759,-0.3163986687831885,-0.31571404056675656,-0.3150287266936803,-0.3143427264772733,-0.31365603923016117,-0.31296866426428105,-0.3122806008908813,-0.3115918484205201,-0.3109024061630654,-0.3102122734276941,-0.30952144952289085,-0.30882993375644807,-0.3081377254354648,-0.3074448238663462,-0.30675122835480273,-0.3060569382058495,-0.30536195272380573,-0.3046662712122938,-0.3039698929742386,-0.30327281731186706,-0.30257504352670717,-0.30187657091958753,-0.3011773987906364,-0.30047752643928105,-0.29977695316424735,-0.2990756782635586,-0.2983737010345353,-0.297671020773794,-0.29696763677724697,-0.29626354834010127,-0.2955587547568581,-0.2948532553213121,-0.29414704932655067,-0.2934401360649532,-0.2927325148281905,-0.2920241849072238,-0.2913151455923044,-0.2906053961729727,-0.2898949359380576,-0.28918376417567576,-0.2884718801732308,-0.28775928321741284,-0.28704597259419745,-0.2863319475888453,-0.285617207485901,-0.28490175156919284,-0.2841855791218318,-0.2834686894262108,-0.2827510817640042,-0.2820327554161669,-0.2813137096629337,-0.28059394378381847,-0.27987345705761363,-0.27915224876238925,-0.2784303181754924,-0.2777076645735464,-0.27698428723245005,-0.2762601854273771,-0.2755353584327753,-0.2748098055223657,-0.27408352596914215,-0.27335651904537017,-0.27262878402258667,-0.2719003201715989,-0.2711711267624837,-0.27044120306458724,-0.2697105483465236,-0.26897916187617443,-0.2682470429206884,-0.26751419074647986,-0.26678060461922887,-0.26604628380387974,-0.26531122756464076,-0.26457543516498333,-0.26383890586764114,-0.2631016389346097,-0.2623636336271451,-0.2616248892057638,-0.2608854049302417,-0.2601451800596131,-0.25940421385217055,-0.2586625055654636,-0.2579200544562981,-0.257176859780736,-0.25643292079409374,-0.2556882367509422,-0.25494280690510573,-0.2541966305096613,-0.2534497068169378,-0.25270203507851546,-0.25195361454522486,-0.2512044444671463,-0.250454524093609,-0.24970385267319062,-0.24895242945371585,-0.24820025368225646,-0.2474473246051299,-0.24669364146789896,-0.24593920351537085,-0.24518400999159634,-0.24442806013986923,-0.2436713532027254,-0.24291388842194223,-0.24215566503853758,-0.24139668229276934,-0.24063693942413444,-0.23987643567136815,-0.23911517027244344,-0.23835314246456996,-0.2375903514841935,-0.23682679656699518,-0.23606247694789054,-0.23529739186102908,-0.23453154053979308,-0.23376492221679718,-0.23299753612388746,-0.23222938149214067,-0.23146045755186356,-0.2306907635325919,-0.22992029866308988,-0.22914906217134942,-0.22837705328458907,-0.22760427122925364,-0.22683071523101306,-0.22605638451476184,-0.22528127830461822,-0.2245053958239234,-0.22372873629524068,-0.22295129894035493,-0.22217308298027139,-0.22139408763521534,-0.220614312124631,-0.21983375566718094,-0.21905241748074517,-0.21827029678242038,-0.21748739278851925,-0.21670370471456957,-0.21591923177531344,-0.21513397318470656,-0.2143479281559174,-0.2135610959013264,-0.21277347563252524,-0.211985066560316,-0.2111958678947103,-0.21040587884492865,-0.2096150986193996,-0.2088235264257589,-0.20803116147084882,-0.20723800296071718,-0.20644405010061673,-0.2056493020950042,-0.20485375814753973,-0.20405741746108572,-0.20326027923770643,-0.20246234267866686,-0.2016636069844321,-0.20086407135466655,-0.20006373498823302,-0.199262597083192,-0.19846065683680086,-0.19765791344551298,-0.19685436610497697,-0.19605001401003597,-0.1952448563547267,-0.19443889233227865,-0.1936321211351134,-0.19282454195484375,-0.1920161539822728,-0.1912069564073934,-0.19039694841938704,-0.18958612920662318,-0.1887744979566585,-0.18796205385623596,-0.1871487960912841,-0.18633472384691607,-0.18551983630742905,-0.18470413265630312,-0.18388761207620077,-0.1830702737489658,-0.18225211685562276,-0.18143314057637586,-0.18061334409060834,-0.17979272657688158,-0.17897128721293434,-0.17814902517568182,-0.17732593964121496,-0.17650202978479942,-0.17567729478087504,-0.1748517338030548,-0.17402534602412403,-0.17319813061603964,-0.17237008674992926,-0.17154121359609031,-0.1707115103239894,-0.16988097610226127,-0.16904961009870806,-0.16821741148029845,-0.1673843794131669,-0.16655051306261265,-0.16571581159309906,-0.16488027416825268,-0.1640438999508625,-0.16320668810287886,-0.162368637785413,-0.16152974815873583,-0.1606900183822774,-0.15984944761462586,-0.15900803501352676,-0.15816577973588203,-0.15732268093774926,-0.15647873777434088,-0.15563394940002323,-0.1547883149683158,-0.1539418336318902,-0.15309450454256954,-0.15224632685132747,-0.1513972997082873,-0.15054742226272128,-0.1496966936630495,-0.1488451130568393,-0.14799267959080434,-0.14713939241080357,-0.14628525066184064,-0.14543025348806293,-0.14457440003276056,-0.14371768943836571,-0.1428601208464518,-0.1420016933977324,-0.1411424062320606,-0.1402822584884279,-0.13942124930496372,-0.13855937781893415,-0.13769664316674132,-0.13683304448392244,-0.13596858090514896,-0.13510325156422567,-0.13423705559408994,-0.13336999212681072,-0.13250206029358774,-0.13163325922475066,-0.13076358804975804,-0.12989304589719675,-0.12902163189478086,-0.1281493451693508,-0.12727618484687264,-0.12640215005243702,-0.12552723991025833,-0.12465145354367396,-0.12377479007514325,-0.12289724862624672,-0.1220188283176851,-0.12113952826927851,-0.12025934759996562,-0.11937828542780268,-0.11849634086996268,-0.11761351304273442,-0.11672980106152171,-0.11584520404084242,-0.1149597210943276,-0.1140733513347206,-0.11318609387387618,-0.11229794782275965,-0.1114089122914459,-0.11051898638911857,-0.10962816922406919,-0.10873645990369618,-0.10784385753450408,-0.10695036122210254,-0.1060559700712055,-0.10516068318563027,-0.10426449966829661,-0.10336741862122588,-0.10246943914554012,-0.10157056034146107,-0.10067078130830945,-0.09977010114450387,-0.09886851894756,-0.09796603381408976,-0.09706264483980018,-0.09615835111949275,-0.09525315174706239,-0.09434704581549652,-0.09344003241687418,-0.09253211064236519,-0.09162327958222907,-0.09071353832581434,-0.08980288596155743,-0.08889132157698186,-0.08797884425869731,-0.08706545309239867,-0.0861511471628652,-0.08523592555395952,-0.08431978734862675,-0.0834027316288936,-0.08248475747586737,-0.08156586396973513,-0.0806460501897628,-0.07972531521429407,-0.07880365812074967,-0.07788107798562638,-0.07695757388449602,-0.07603314489200465,-0.07510779008187154,-0.07418150852688833,-0.07325429929891805,-0.07232616146889416,-0.07139709410681971,-0.07046709628176637,-0.06953616706187338,-0.06860430551434682,-0.06767151070545854,-0.06673778170054527,-0.06580311756400765,-0.06486751735930935,-0.06393098014897604,-0.06299350499459458,-0.06205509095681194,-0.061115737095334376,-0.06017544246892642,-0.059234206135409945,-0.05829202715166324,-0.05734890457362006,-0.05640483745626866,-0.05545982485365088,-0.054513865818861175,-0.05356695940404567,-0.05261910466040121,-0.05167030063817441,-0.05072054638666073,-0.04976984095420346,-0.04881818338819283,-0.04786557273506501,-0.0469120080403012,-0.04595748834842662,-0.045002012703009596,-0.044045580146660566,-0.043088189721031185,-0.04212984046681327,-0.04117053142373791,-0.040210261630574486,-0.0392490301251297,-0.038286835944246624,-0.0373236781238037,-0.036359555698713825,-0.03539446770292336,-0.03442841316941114,-0.033461391130187555,-0.032493400616293515,-0.03152444065779956,-0.030554510283804803,-0.029583608522436022,-0.028611734400846654,-0.027638886945215824,-0.026665065180747384,-0.025690268131668914,-0.024714494821230764,-0.02373774427170506,-0.02276001550438474,-0.021781307539582555,-0.02080161939663011,-0.019820950093876855,-0.018839298648689124,-0.01785666407744913,-0.016873045395554013,-0.015888441617414803,-0.014902851756455483,-0.013916274825111962,-0.012928709834831114,-0.011940155796069768,-0.010950611718293722,-0.00996007660997676,-0.00896854947859964,-0.007976029330649118,-0.006982515171616939,-0.00598800600599885,-0.004992500837293596,-0.003995998668001923,-0.0029984984996255805,-0.001999999332666322,-0.001000500166624897,-5.551115123125783e-17],"x":[-1.0,-0.998998998998999,-0.997997997997998,-0.996996996996997,-0.995995995995996,-0.994994994994995,-0.993993993993994,-0.992992992992993,-0.991991991991992,-0.990990990990991,-0.98998998998999,-0.988988988988989,-0.987987987987988,-0.986986986986987,-0.985985985985986,-0.984984984984985,-0.983983983983984,-0.982982982982983,-0.9819819819819819,-0.980980980980981,-0.97997997997998,-0.978978978978979,-0.977977977977978,-0.9769769769769769,-0.975975975975976,-0.974974974974975,-0.973973973973974,-0.972972972972973,-0.9719719719719719,-0.970970970970971,-0.96996996996997,-0.968968968968969,-0.9679679679679679,-0.9669669669669669,-0.965965965965966,-0.964964964964965,-0.963963963963964,-0.9629629629629629,-0.9619619619619619,-0.960960960960961,-0.95995995995996,-0.958958958958959,-0.9579579579579579,-0.9569569569569569,-0.955955955955956,-0.954954954954955,-0.953953953953954,-0.9529529529529529,-0.9519519519519519,-0.950950950950951,-0.94994994994995,-0.948948948948949,-0.9479479479479479,-0.9469469469469469,-0.9459459459459459,-0.944944944944945,-0.943943943943944,-0.9429429429429429,-0.9419419419419419,-0.9409409409409409,-0.93993993993994,-0.938938938938939,-0.9379379379379379,-0.9369369369369369,-0.9359359359359359,-0.934934934934935,-0.933933933933934,-0.9329329329329329,-0.9319319319319319,-0.9309309309309309,-0.92992992992993,-0.928928928928929,-0.9279279279279279,-0.9269269269269269,-0.9259259259259259,-0.924924924924925,-0.923923923923924,-0.9229229229229229,-0.9219219219219219,-0.9209209209209209,-0.91991991991992,-0.918918918918919,-0.9179179179179179,-0.9169169169169169,-0.9159159159159159,-0.914914914914915,-0.913913913913914,-0.9129129129129129,-0.9119119119119119,-0.9109109109109109,-0.9099099099099099,-0.908908908908909,-0.9079079079079079,-0.9069069069069069,-0.9059059059059059,-0.9049049049049049,-0.9039039039039038,-0.9029029029029029,-0.9019019019019019,-0.9009009009009009,-0.8998998998998999,-0.8988988988988988,-0.8978978978978979,-0.8968968968968969,-0.8958958958958959,-0.8948948948948949,-0.8938938938938938,-0.8928928928928929,-0.8918918918918919,-0.8908908908908909,-0.8898898898898899,-0.8888888888888888,-0.8878878878878879,-0.8868868868868869,-0.8858858858858859,-0.8848848848848849,-0.8838838838838838,-0.8828828828828829,-0.8818818818818819,-0.8808808808808809,-0.8798798798798799,-0.8788788788788788,-0.8778778778778779,-0.8768768768768769,-0.8758758758758759,-0.8748748748748749,-0.8738738738738738,-0.8728728728728729,-0.8718718718718719,-0.8708708708708709,-0.8698698698698699,-0.8688688688688688,-0.8678678678678678,-0.8668668668668669,-0.8658658658658659,-0.8648648648648649,-0.8638638638638638,-0.8628628628628628,-0.8618618618618619,-0.8608608608608609,-0.8598598598598599,-0.8588588588588588,-0.8578578578578578,-0.8568568568568569,-0.8558558558558559,-0.8548548548548549,-0.8538538538538538,-0.8528528528528528,-0.8518518518518519,-0.8508508508508509,-0.8498498498498499,-0.8488488488488488,-0.8478478478478478,-0.8468468468468469,-0.8458458458458459,-0.8448448448448449,-0.8438438438438438,-0.8428428428428428,-0.8418418418418419,-0.8408408408408409,-0.8398398398398398,-0.8388388388388388,-0.8378378378378378,-0.8368368368368369,-0.8358358358358359,-0.8348348348348348,-0.8338338338338338,-0.8328328328328328,-0.8318318318318318,-0.8308308308308309,-0.8298298298298298,-0.8288288288288288,-0.8278278278278278,-0.8268268268268268,-0.8258258258258259,-0.8248248248248248,-0.8238238238238238,-0.8228228228228228,-0.8218218218218218,-0.8208208208208209,-0.8198198198198198,-0.8188188188188188,-0.8178178178178178,-0.8168168168168168,-0.8158158158158159,-0.8148148148148148,-0.8138138138138138,-0.8128128128128128,-0.8118118118118118,-0.8108108108108109,-0.8098098098098098,-0.8088088088088088,-0.8078078078078078,-0.8068068068068068,-0.8058058058058059,-0.8048048048048048,-0.8038038038038038,-0.8028028028028028,-0.8018018018018018,-0.8008008008008008,-0.7997997997997998,-0.7987987987987988,-0.7977977977977978,-0.7967967967967968,-0.7957957957957958,-0.7947947947947948,-0.7937937937937938,-0.7927927927927928,-0.7917917917917918,-0.7907907907907908,-0.7897897897897898,-0.7887887887887888,-0.7877877877877878,-0.7867867867867868,-0.7857857857857858,-0.7847847847847848,-0.7837837837837838,-0.7827827827827828,-0.7817817817817818,-0.7807807807807807,-0.7797797797797797,-0.7787787787787788,-0.7777777777777778,-0.7767767767767768,-0.7757757757757757,-0.7747747747747747,-0.7737737737737738,-0.7727727727727728,-0.7717717717717718,-0.7707707707707707,-0.7697697697697697,-0.7687687687687688,-0.7677677677677678,-0.7667667667667668,-0.7657657657657657,-0.7647647647647647,-0.7637637637637638,-0.7627627627627628,-0.7617617617617618,-0.7607607607607607,-0.7597597597597597,-0.7587587587587588,-0.7577577577577578,-0.7567567567567568,-0.7557557557557557,-0.7547547547547547,-0.7537537537537538,-0.7527527527527528,-0.7517517517517518,-0.7507507507507507,-0.7497497497497497,-0.7487487487487487,-0.7477477477477478,-0.7467467467467468,-0.7457457457457457,-0.7447447447447447,-0.7437437437437437,-0.7427427427427428,-0.7417417417417418,-0.7407407407407407,-0.7397397397397397,-0.7387387387387387,-0.7377377377377378,-0.7367367367367368,-0.7357357357357357,-0.7347347347347347,-0.7337337337337337,-0.7327327327327328,-0.7317317317317318,-0.7307307307307307,-0.7297297297297297,-0.7287287287287287,-0.7277277277277278,-0.7267267267267268,-0.7257257257257257,-0.7247247247247247,-0.7237237237237237,-0.7227227227227228,-0.7217217217217218,-0.7207207207207207,-0.7197197197197197,-0.7187187187187187,-0.7177177177177178,-0.7167167167167167,-0.7157157157157157,-0.7147147147147147,-0.7137137137137137,-0.7127127127127127,-0.7117117117117117,-0.7107107107107107,-0.7097097097097097,-0.7087087087087087,-0.7077077077077077,-0.7067067067067067,-0.7057057057057057,-0.7047047047047047,-0.7037037037037037,-0.7027027027027027,-0.7017017017017017,-0.7007007007007007,-0.6996996996996997,-0.6986986986986987,-0.6976976976976977,-0.6966966966966966,-0.6956956956956957,-0.6946946946946947,-0.6936936936936937,-0.6926926926926927,-0.6916916916916916,-0.6906906906906907,-0.6896896896896897,-0.6886886886886887,-0.6876876876876877,-0.6866866866866866,-0.6856856856856857,-0.6846846846846847,-0.6836836836836837,-0.6826826826826827,-0.6816816816816816,-0.6806806806806807,-0.6796796796796797,-0.6786786786786787,-0.6776776776776777,-0.6766766766766766,-0.6756756756756757,-0.6746746746746747,-0.6736736736736737,-0.6726726726726727,-0.6716716716716716,-0.6706706706706707,-0.6696696696696697,-0.6686686686686687,-0.6676676676676677,-0.6666666666666666,-0.6656656656656657,-0.6646646646646647,-0.6636636636636637,-0.6626626626626627,-0.6616616616616616,-0.6606606606606606,-0.6596596596596597,-0.6586586586586587,-0.6576576576576577,-0.6566566566566566,-0.6556556556556556,-0.6546546546546547,-0.6536536536536537,-0.6526526526526526,-0.6516516516516516,-0.6506506506506506,-0.6496496496496497,-0.6486486486486487,-0.6476476476476476,-0.6466466466466466,-0.6456456456456456,-0.6446446446446447,-0.6436436436436437,-0.6426426426426426,-0.6416416416416416,-0.6406406406406406,-0.6396396396396397,-0.6386386386386387,-0.6376376376376376,-0.6366366366366366,-0.6356356356356356,-0.6346346346346347,-0.6336336336336337,-0.6326326326326326,-0.6316316316316316,-0.6306306306306306,-0.6296296296296297,-0.6286286286286287,-0.6276276276276276,-0.6266266266266266,-0.6256256256256256,-0.6246246246246246,-0.6236236236236237,-0.6226226226226226,-0.6216216216216216,-0.6206206206206206,-0.6196196196196196,-0.6186186186186187,-0.6176176176176176,-0.6166166166166166,-0.6156156156156156,-0.6146146146146146,-0.6136136136136137,-0.6126126126126126,-0.6116116116116116,-0.6106106106106106,-0.6096096096096096,-0.6086086086086087,-0.6076076076076076,-0.6066066066066066,-0.6056056056056056,-0.6046046046046046,-0.6036036036036037,-0.6026026026026026,-0.6016016016016016,-0.6006006006006006,-0.5995995995995996,-0.5985985985985987,-0.5975975975975976,-0.5965965965965966,-0.5955955955955956,-0.5945945945945946,-0.5935935935935935,-0.5925925925925926,-0.5915915915915916,-0.5905905905905906,-0.5895895895895896,-0.5885885885885885,-0.5875875875875876,-0.5865865865865866,-0.5855855855855856,-0.5845845845845846,-0.5835835835835835,-0.5825825825825826,-0.5815815815815816,-0.5805805805805806,-0.5795795795795796,-0.5785785785785785,-0.5775775775775776,-0.5765765765765766,-0.5755755755755756,-0.5745745745745746,-0.5735735735735735,-0.5725725725725725,-0.5715715715715716,-0.5705705705705706,-0.5695695695695696,-0.5685685685685685,-0.5675675675675675,-0.5665665665665666,-0.5655655655655656,-0.5645645645645646,-0.5635635635635635,-0.5625625625625625,-0.5615615615615616,-0.5605605605605606,-0.5595595595595596,-0.5585585585585585,-0.5575575575575575,-0.5565565565565566,-0.5555555555555556,-0.5545545545545546,-0.5535535535535535,-0.5525525525525525,-0.5515515515515516,-0.5505505505505506,-0.5495495495495496,-0.5485485485485485,-0.5475475475475475,-0.5465465465465466,-0.5455455455455456,-0.5445445445445446,-0.5435435435435435,-0.5425425425425425,-0.5415415415415415,-0.5405405405405406,-0.5395395395395396,-0.5385385385385385,-0.5375375375375375,-0.5365365365365365,-0.5355355355355356,-0.5345345345345346,-0.5335335335335335,-0.5325325325325325,-0.5315315315315315,-0.5305305305305306,-0.5295295295295295,-0.5285285285285285,-0.5275275275275275,-0.5265265265265265,-0.5255255255255256,-0.5245245245245245,-0.5235235235235235,-0.5225225225225225,-0.5215215215215215,-0.5205205205205206,-0.5195195195195195,-0.5185185185185185,-0.5175175175175175,-0.5165165165165165,-0.5155155155155156,-0.5145145145145145,-0.5135135135135135,-0.5125125125125125,-0.5115115115115115,-0.5105105105105106,-0.5095095095095095,-0.5085085085085085,-0.5075075075075075,-0.5065065065065065,-0.5055055055055055,-0.5045045045045045,-0.5035035035035035,-0.5025025025025025,-0.5015015015015015,-0.5005005005005005,-0.4994994994994995,-0.4984984984984985,-0.4974974974974975,-0.4964964964964965,-0.4954954954954955,-0.4944944944944945,-0.4934934934934935,-0.4924924924924925,-0.4914914914914915,-0.4904904904904905,-0.4894894894894895,-0.48848848848848847,-0.4874874874874875,-0.48648648648648657,-0.48548548548548554,-0.48448448448448456,-0.4834834834834835,-0.48248248248248254,-0.48148148148148157,-0.48048048048048053,-0.47947947947947955,-0.4784784784784785,-0.47747747747747754,-0.4764764764764765,-0.47547547547547553,-0.47447447447447455,-0.4734734734734735,-0.47247247247247254,-0.4714714714714715,-0.4704704704704705,-0.46946946946946955,-0.4684684684684685,-0.46746746746746753,-0.4664664664664665,-0.4654654654654655,-0.46446446446446454,-0.4634634634634635,-0.46246246246246253,-0.4614614614614615,-0.4604604604604605,-0.45945945945945954,-0.4584584584584585,-0.45745745745745753,-0.4564564564564565,-0.4554554554554555,-0.45445445445445454,-0.4534534534534535,-0.4524524524524525,-0.4514514514514515,-0.4504504504504505,-0.44944944944944953,-0.4484484484484485,-0.4474474474474475,-0.4464464464464465,-0.4454454454454455,-0.4444444444444445,-0.4434434434434435,-0.4424424424424425,-0.4414414414414415,-0.4404404404404405,-0.43943943943943947,-0.4384384384384385,-0.4374374374374375,-0.4364364364364365,-0.4354354354354355,-0.43443443443443447,-0.4334334334334335,-0.4324324324324325,-0.4314314314314315,-0.4304304304304305,-0.42942942942942947,-0.4284284284284285,-0.4274274274274275,-0.4264264264264265,-0.4254254254254255,-0.42442442442442446,-0.4234234234234235,-0.4224224224224225,-0.42142142142142147,-0.4204204204204205,-0.41941941941941946,-0.4184184184184185,-0.41741741741741745,-0.41641641641641647,-0.4154154154154155,-0.41441441441441446,-0.4134134134134135,-0.41241241241241244,-0.41141141141141147,-0.4104104104104105,-0.40940940940940945,-0.4084084084084085,-0.40740740740740744,-0.40640640640640646,-0.4054054054054055,-0.40440440440440445,-0.40340340340340347,-0.40240240240240244,-0.40140140140140146,-0.4004004004004005,-0.39939939939939945,-0.39839839839839847,-0.39739739739739743,-0.39639639639639646,-0.3953953953953955,-0.39439439439439444,-0.39339339339339346,-0.39239239239239243,-0.39139139139139145,-0.3903903903903905,-0.38938938938938944,-0.38838838838838846,-0.3873873873873874,-0.38638638638638645,-0.3853853853853854,-0.38438438438438444,-0.38338338338338346,-0.3823823823823824,-0.38138138138138145,-0.3803803803803804,-0.37937937937937943,-0.37837837837837845,-0.3773773773773774,-0.37637637637637644,-0.3753753753753754,-0.37437437437437443,-0.37337337337337345,-0.3723723723723724,-0.37137137137137144,-0.3703703703703704,-0.3693693693693694,-0.36836836836836845,-0.3673673673673674,-0.36636636636636644,-0.3653653653653654,-0.3643643643643644,-0.36336336336336345,-0.3623623623623624,-0.36136136136136143,-0.3603603603603604,-0.3593593593593594,-0.35835835835835844,-0.3573573573573574,-0.35635635635635643,-0.3553553553553554,-0.3543543543543544,-0.3533533533533534,-0.3523523523523524,-0.3513513513513514,-0.3503503503503504,-0.3493493493493494,-0.3483483483483484,-0.3473473473473474,-0.3463463463463464,-0.3453453453453454,-0.3443443443443444,-0.3433433433433434,-0.3423423423423424,-0.3413413413413414,-0.3403403403403404,-0.3393393393393394,-0.3383383383383384,-0.3373373373373374,-0.3363363363363364,-0.3353353353353354,-0.3343343343343344,-0.33333333333333337,-0.3323323323323324,-0.3313313313313314,-0.3303303303303304,-0.3293293293293294,-0.32832832832832837,-0.3273273273273274,-0.3263263263263264,-0.3253253253253254,-0.3243243243243244,-0.32332332332332336,-0.3223223223223224,-0.32132132132132135,-0.3203203203203204,-0.3193193193193194,-0.31831831831831836,-0.3173173173173174,-0.31631631631631635,-0.31531531531531537,-0.3143143143143144,-0.31331331331331336,-0.3123123123123124,-0.31131131131131135,-0.31031031031031037,-0.3093093093093094,-0.30830830830830835,-0.3073073073073074,-0.30630630630630634,-0.30530530530530536,-0.3043043043043044,-0.30330330330330335,-0.3023023023023024,-0.30130130130130134,-0.30030030030030036,-0.2992992992992994,-0.29829829829829835,-0.29729729729729737,-0.29629629629629634,-0.29529529529529536,-0.2942942942942944,-0.29329329329329334,-0.29229229229229237,-0.29129129129129133,-0.29029029029029035,-0.2892892892892893,-0.28828828828828834,-0.28728728728728736,-0.28628628628628633,-0.28528528528528535,-0.2842842842842843,-0.28328328328328334,-0.28228228228228236,-0.2812812812812813,-0.28028028028028035,-0.2792792792792793,-0.27827827827827833,-0.27727727727727736,-0.2762762762762763,-0.27527527527527534,-0.2742742742742743,-0.27327327327327333,-0.27227227227227235,-0.2712712712712713,-0.27027027027027034,-0.2692692692692693,-0.26826826826826833,-0.26726726726726735,-0.2662662662662663,-0.26526526526526534,-0.2642642642642643,-0.2632632632632633,-0.26226226226226235,-0.2612612612612613,-0.26026026026026033,-0.2592592592592593,-0.2582582582582583,-0.2572572572572573,-0.2562562562562563,-0.2552552552552553,-0.2542542542542543,-0.25325325325325326,-0.2522522522522523,-0.2512512512512513,-0.2502502502502503,-0.24924924924924927,-0.2482482482482483,-0.24724724724724728,-0.24624624624624628,-0.24524524524524527,-0.24424424424424426,-0.24324324324324328,-0.24224224224224228,-0.24124124124124127,-0.24024024024024027,-0.23923923923923926,-0.23823823823823825,-0.23723723723723728,-0.23623623623623627,-0.23523523523523526,-0.23423423423423426,-0.23323323323323325,-0.23223223223223227,-0.2312312312312313,-0.2302302302302303,-0.22922922922922928,-0.22822822822822827,-0.2272272272272273,-0.2262262262262263,-0.22522522522522528,-0.22422422422422428,-0.22322322322322327,-0.22222222222222227,-0.2212212212212213,-0.22022022022022028,-0.21921921921921927,-0.21821821821821827,-0.21721721721721726,-0.21621621621621628,-0.21521521521521528,-0.21421421421421427,-0.21321321321321327,-0.21221221221221226,-0.21121121121121128,-0.21021021021021027,-0.20920920920920927,-0.20820820820820826,-0.20720720720720726,-0.20620620620620625,-0.20520520520520527,-0.20420420420420426,-0.20320320320320326,-0.20220220220220225,-0.20120120120120125,-0.20020020020020027,-0.19919919919919926,-0.19819819819819826,-0.19719719719719725,-0.19619619619619624,-0.19519519519519526,-0.19419419419419426,-0.19319319319319325,-0.19219219219219225,-0.19119119119119124,-0.19019019019019023,-0.18918918918918926,-0.18818818818818825,-0.18718718718718724,-0.18618618618618624,-0.18518518518518523,-0.18418418418418425,-0.18318318318318325,-0.18218218218218224,-0.18118118118118123,-0.18018018018018023,-0.17917917917917925,-0.17817817817817824,-0.17717717717717724,-0.17617617617617623,-0.17517517517517522,-0.17417417417417422,-0.17317317317317324,-0.17217217217217223,-0.17117117117117123,-0.17017017017017022,-0.16916916916916921,-0.16816816816816824,-0.16716716716716723,-0.16616616616616622,-0.16516516516516522,-0.1641641641641642,-0.16316316316316323,-0.16216216216216223,-0.16116116116116122,-0.16016016016016021,-0.1591591591591592,-0.1581581581581582,-0.15715715715715722,-0.15615615615615622,-0.1551551551551552,-0.1541541541541542,-0.1531531531531532,-0.15215215215215222,-0.15115115115115121,-0.1501501501501502,-0.1491491491491492,-0.1481481481481482,-0.14714714714714722,-0.1461461461461462,-0.1451451451451452,-0.1441441441441442,-0.1431431431431432,-0.14214214214214219,-0.1411411411411412,-0.1401401401401402,-0.1391391391391392,-0.1381381381381382,-0.13713713713713718,-0.1361361361361362,-0.1351351351351352,-0.1341341341341342,-0.13313313313313319,-0.13213213213213218,-0.1311311311311312,-0.1301301301301302,-0.1291291291291292,-0.12812812812812818,-0.12712712712712718,-0.12612612612612617,-0.12512512512512516,-0.12412412412412417,-0.12312312312312317,-0.12212212212212216,-0.12112112112112117,-0.12012012012012016,-0.11911911911911917,-0.11811811811811816,-0.11711711711711716,-0.11611611611611616,-0.11511511511511516,-0.11411411411411415,-0.11311311311311316,-0.11211211211211215,-0.11111111111111116,-0.11011011011011015,-0.10910910910910915,-0.10810810810810816,-0.10710710710710715,-0.10610610610610614,-0.10510510510510515,-0.10410410410410414,-0.10310310310310317,-0.10210210210210216,-0.10110110110110115,-0.10010010010010016,-0.09909909909909916,-0.09809809809809815,-0.09709709709709716,-0.09609609609609615,-0.09509509509509516,-0.09409409409409415,-0.09309309309309315,-0.09209209209209215,-0.09109109109109115,-0.09009009009009014,-0.08908908908908915,-0.08808808808808814,-0.08708708708708715,-0.08608608608608614,-0.08508508508508514,-0.08408408408408415,-0.08308308308308314,-0.08208208208208213,-0.08108108108108114,-0.08008008008008013,-0.07907907907907914,-0.07807807807807814,-0.07707707707707713,-0.07607607607607614,-0.07507507507507513,-0.07407407407407413,-0.07307307307307313,-0.07207207207207213,-0.07107107107107113,-0.07007007007007013,-0.06906906906906912,-0.06806806806806813,-0.06706706706706712,-0.06606606606606612,-0.06506506506506513,-0.06406406406406412,-0.06306306306306311,-0.062062062062062114,-0.061061061061061114,-0.06006006006006011,-0.05905905905905911,-0.05805805805805811,-0.0570570570570571,-0.056056056056056104,-0.055055055055055105,-0.054054054054054106,-0.0530530530530531,-0.0520520520520521,-0.0510510510510511,-0.0500500500500501,-0.049049049049049095,-0.048048048048048096,-0.0470470470470471,-0.0460460460460461,-0.04504504504504509,-0.04404404404404409,-0.04304304304304309,-0.042042042042042094,-0.04104104104104109,-0.04004004004004009,-0.039039039039039096,-0.0380380380380381,-0.03703703703703709,-0.03603603603603609,-0.03503503503503509,-0.03403403403403409,-0.033033033033033087,-0.03203203203203209,-0.031031031031031085,-0.030030030030030082,-0.029029029029029083,-0.02802802802802808,-0.02702702702702708,-0.026026026026026078,-0.02502502502502508,-0.024024024024024076,-0.023023023023023077,-0.022022022022022074,-0.021021021021021075,-0.020020020020020072,-0.019019019019019073,-0.01801801801801807,-0.01701701701701707,-0.016016016016016068,-0.01501501501501507,-0.01401401401401407,-0.013013013013013068,-0.012012012012012067,-0.011011011011011066,-0.010010010010010065,-0.009009009009009064,-0.008008008008008063,-0.0070070070070070625,-0.0060060060060060615,-0.0050050050050050605,-0.0040040040040040595,-0.003003003003003058,-0.0020020020020020575,-0.0010010010010010565,-5.551115123125783e-17]}
},{}],42:[function(require,module,exports){
module.exports={"expected":[5.551115123125783e-17,0.0010015021697125696,0.0020040073460210225,0.003007516533438696,0.004012030737484895,0.0050175509646859535,0.0060240782225762434,0.0070316135196991855,0.008040157865608258,0.00904971227086801,0.010060277747055072,0.011071855306759172,0.01208444596358415,0.013098050732148966,0.014112670628088731,0.015128306668055714,0.01614495986972036,0.01716263125177232,0.01818132183392146,0.019201032636898888,0.020221764682457975,0.02124351899337539,0.022266296593452094,0.023290098507514415,0.024314925761415022,0.025340779382033995,0.026367660397279818,0.027395569836090452,0.02842450872843432,0.029454478105311377,0.030485478998754107,0.0315175124418286,0.03255057946863555,0.0335846811143113,0.034619818415028904,0.03565599240799912,0.036693204131471494,0.03773145462473538,0.038770744928120986,0.03981107608300038,0.0408524491317886,0.041894865117944664,0.042938325085972624,0.04398283008142256,0.04502838115089171,0.04607497934202548,0.0471226257035185,0.048171321285115636,0.04922106713761311,0.05027186431285951,0.05132371386375685,0.05237661684426162,0.05343057430938586,0.0544855873151982,0.055541656918824955,0.0565987841784511,0.05765697015332142,0.058716215903741535,0.05977652249107896,0.06083789097776416,0.06190032242729163,0.062963817904221,0.06402837847417796,0.06509400520385554,0.066160699161015,0.06722846141448696,0.06829729303417252,0.06936719509104425,0.07043816865714732,0.07151021480560053,0.07258333461059747,0.07365752914740747,0.07473279949237677,0.0758091467229296,0.07688657191756917,0.07796507615587889,0.07904466051852332,0.08012532608724932,0.08120707394488715,0.08228990517535147,0.08337382086364253,0.08445882209584721,0.08554490995914006,0.08663208554178453,0.08772034993313386,0.08880970422363234,0.08990014950481635,0.09099168686931543,0.09208431741085335,0.09317804222424934,0.09427286240541899,0.09536877905137556,0.09646579326023086,0.09756390613119652,0.09866311876458506,0.09976343226181092,0.10086484772539159,0.10196736625894881,0.10307098896720952,0.10417571695600712,0.10528155133228244,0.10638849320408492,0.10749654368057378,0.10860570387201898,0.10971597488980246,0.11082735784641924,0.11193985385547844,0.11305346403170452,0.11416818949093831,0.11528403135013814,0.11640099072738103,0.1175190687418637,0.11863826651390377,0.11975858516494091,0.1208800258175378,0.12200258959538149,0.12312627762328432,0.12425109102718518,0.12537703093415056,0.12650409847237576,0.12763229477118587,0.1287616209610371,0.1298920781735178,0.13102366754134956,0.13215639019838843,0.133290247279626,0.1344252399211906,0.1355613692603483,0.13669863643550426,0.1378370425862037,0.13897658885313305,0.1401172763781212,0.1412591063041406,0.14240207977530836,0.14354619793688744,0.14469146193528773,0.14583787291806732,0.1469854320339335,0.14813414043274414,0.14928399926550856,0.15043500968438883,0.15158717284270098,0.15274048989491604,0.15389496199666128,0.15505059030472126,0.15620737597703918,0.1573653201727178,0.1585244240520208,0.15968468877637382,0.16084611550836575,0.16200870541174972,0.16317245965144442,0.16433737939353518,0.16550346580527517,0.1666707200550866,0.16783914331256183,0.1690087367484646,0.17017950153473108,0.17135143884447118,0.1725245498519698,0.17369883573268774,0.1748742976632631,0.17605093682151232,0.17722875438643151,0.17840775153819743,0.179587929458169,0.18076928932888806,0.18195183233408085,0.18313555965865913,0.18432047248872127,0.18550657201155368,0.1866938594156317,0.18788233589062098,0.1890720026273786,0.1902628608179543,0.19145491165559173,0.19264815633472943,0.1938425960510023,0.1950382320012426,0.19623506538348126,0.19743309739694898,0.1986323292420776,0.1998327621205011,0.20103439723505698,0.20223723578978725,0.20344127898993986,0.2046465280419699,0.20585298415354059,0.20706064853352468,0.2082695223920056,0.20947960694027867,0.2106909033908524,0.21190341295744955,0.21311713685500844,0.21433207629968418,0.2155482325088498,0.21676560670109762,0.21798420009624034,0.21920401391531227,0.22042504938057067,0.22164730771549684,0.22287079014479733,0.2240954978944054,0.22532143219148199,0.22654859426441698,0.22777698534283064,0.22900660665757455,0.23023745944073315,0.23146954492562466,0.23270286434680254,0.2339374189400567,0.23517320994241464,0.23641023859214272,0.23764850612874752,0.23888801379297692,0.2401287628268214,0.2413707544735154,0.24261398997753825,0.24385847058461588,0.24510419754172166,0.24635117209707785,0.24759939550015683,0.24884886900168224,0.25009959385363045,0.2513515713092316,0.25260480262297097,0.2538592890505902,0.25511503184908857,0.25637203227672417,0.2576302915930154,0.25888981105874204,0.26015059193594636,0.2614126354879347,0.2626759429792786,0.2639405156758161,0.26520635484465305,0.26647346175416403,0.2677418376739941,0.26901148387505996,0.2702824016295509,0.27155459221093053,0.2728280568939377,0.27410279695458795,0.27537881367017475,0.2766561083192708,0.2779346821817293,0.27921453653868517,0.28049567267255643,0.2817780918670455,0.28306179540714027,0.2843467845791158,0.2856330606705351,0.2869206249702507,0.2882094787684062,0.28949962335643703,0.29079106002707195,0.2920837900743346,0.2933778147935444,0.29467313548131824,0.29596975343557125,0.2972676699555188,0.2985668863416771,0.29986740389586514,0.30116922392120543,0.3024723477221256,0.3037767766043599,0.30508251187494995,0.3063895548422466,0.30769790681591086,0.30900756910691546,0.3103185430275462,0.3116308298914028,0.3129444310134009,0.31425934770977276,0.315575581298069,0.3168931330971599,0.3182120044272362,0.31953219660981114,0.3208537109677214,0.32217654882512836,0.3235007115075198,0.32482620034171056,0.32615301665584484,0.3274811617793964,0.32881063704317093,0.33014144377930676,0.3314735833212763,0.33280705700388746,0.334141866163285,0.3354780121369518,0.3368154962637103,0.33815431988372374,0.3394944843384975,0.3408359909708804,0.3421788411250664,0.3435230361465954,0.3448685773823549,0.3462154661805816,0.34756370389086194,0.3489132918641345,0.3502642314526905,0.3516165240101755,0.352970170891591,0.35432517345329523,0.35568153305300504,0.3570392510497968,0.35839832880410816,0.35975876767773934,0.3611205690338542,0.362483734236982,0.3638482646530183,0.36521416164922693,0.3665814265942409,0.3679500608580638,0.3693200658120716,0.37069144282901323,0.3720641932830128,0.37343831854957066,0.37481382000556435,0.37619069902925073,0.37756895700026666,0.378948595299631,0.38032961530974563,0.3817120184143968,0.3830958059987567,0.3844809794493847,0.38586754015422897,0.38725548950262756,0.38864482888531,0.39003555969439874,0.3914276833234102,0.3928212011672567,0.39421611462224726,0.39561242508608957,0.3970101339578911,0.39840924263816024,0.39980975252880846,0.40121166503315076,0.4026149815559079,0.4040197035032075,0.405425832282585,0.4068333693029861,0.40824231597476696,0.40965267370969666,0.411064443920958,0.412477628023149,0.4138922274322846,0.41530824356579765,0.4167256778425408,0.4181445316827876,0.4195648065082338,0.42098650374199936,0.42240962480862915,0.42383417113409494,0.4252601441457966,0.4266875452725633,0.4281163759446557,0.4295466375937662,0.43097833165302163,0.4324114595569837,0.43384602274165107,0.4352820226444605,0.43671946070428824,0.43815833836145185,0.43959865705771095,0.44104041823626944,0.44248362334177654,0.44392827382032807,0.4453743711194684,0.4468219166881914,0.4482709119769422,0.4497213584376187,0.4511732575235725,0.4526266106896112,0.4540814193919989,0.4555376850884586,0.4569954092381731,0.4584545933017863,0.4599152387414052,0.46137734702060107,0.46284091960441087,0.46430595795933904,0.4657724635533582,0.4672404378559118,0.46870988233791444,0.470180798471754,0.47165318773129317,0.4731270515918704,0.4746023915303019,0.4760792090248827,0.47755750555538873,0.47903728260307743,0.4805185416506901,0.4820012841824529,0.48348551168407833,0.48497122564276707,0.4864584275472089,0.48794711888758485,0.48943730115556827,0.4909289758443263,0.4924221444485217,0.49391680846431385,0.49541296938936086,0.49691062872282055,0.4984097879653522,0.499910448619118,0.5014126121877844,0.5029162801765242,0.5044214540920173,0.5059281354424525,0.5074363257375293,0.5089460264884589,0.510457239207966,0.5119699654102909,0.5134842066111894,0.5149999643279362,0.516517240079325,0.5180360353856708,0.5195563517688114,0.5210781907521083,0.5226015538604489,0.5241264426202478,0.5256528585594482,0.5271808032075236,0.5287102780954792,0.5302412847558536,0.5317738247227203,0.533307899531689,0.5348435107199072,0.5363806598260624,0.5379193483903826,0.5394595779546384,0.5410013500621447,0.5425446662577619,0.5440895280878975,0.5456359371005078,0.5471838948450997,0.5487334028727313,0.5502844627360145,0.5518370759891162,0.5533912441877598,0.5549469688892261,0.5565042516523566,0.5580630940375533,0.5596234976067808,0.5611854639235686,0.5627489945530117,0.5643140910617725,0.5658807550180829,0.5674489879917446,0.5690187915541319,0.570590167278193,0.5721631167384513,0.5737376415110069,0.5753137431735384,0.5768914233053046,0.5784706834871459,0.580051525301486,0.5816339503323329,0.5832179601652818,0.5848035563875151,0.5863907405878053,0.5879795143565159,0.5895698792856029,0.5911618369686171,0.5927553890007049,0.5943505369786104,0.5959472825006769,0.597545627166848,0.5991455725786704,0.600747120339294,0.6023502720534749,0.6039550293275759,0.6055613937695687,0.6071693669890357,0.6087789505971707,0.6103901462067816,0.6120029554322913,0.6136173798897397,0.6152334211967851,0.6168510809727059,0.6184703608384021,0.6200912624163971,0.6217137873308394,0.623337937207504,0.6249637136737939,0.6265911183587424,0.6282201528930136,0.6298508189089056,0.6314831180403506,0.6331170519229173,0.6347526221938127,0.6363898304918829,0.6380286784576161,0.6396691677331428,0.6413112999622381,0.642955076790324,0.6446004998644697,0.6462475708333942,0.647896291347468,0.6495466630587137,0.6511986876208089,0.6528523666890875,0.6545077019205412,0.6561646949738206,0.6578233475092383,0.6594836611887688,0.6611456376760518,0.6628092786363928,0.6644745857367652,0.6661415606458121,0.667810205033847,0.669480520572857,0.6711525089365035,0.6728261718001238,0.6745015108407337,0.6761785277370276,0.6778572241693817,0.6795376018198551,0.6812196623721913,0.6829034075118207,0.6845888389258603,0.6862759583031179,0.6879647673340925,0.6896552677109759,0.6913474611276548,0.6930413492797118,0.6947369338644285,0.6964342165807855,0.6981331991294657,0.6998338832128548,0.7015362705350434,0.7032403628018287,0.7049461617207167,0.7066536690009231,0.7083628863533753,0.7100738154907145,0.711786458127297,0.7135008159791959,0.7152168907642034,0.7169346842018313,0.718654198013314,0.7203754339216099,0.7220983936514024,0.7238230789291029,0.7255494914828509,0.7272776330425172,0.7290075053397052,0.730739110107752,0.7324724490817314,0.7342075239984538,0.73594433659647,0.7376828886160716,0.7394231817992928,0.7411652178899132,0.7429089986334578,0.7446545257772006,0.7464018010701652,0.7481508262631269,0.7499016031086142,0.7516541333609108,0.7534084187760577,0.755164461111854,0.7569222621278598,0.7586818235853973,0.7604431472475519,0.7622062348791758,0.7639710882468882,0.7657377091190776,0.7675060992659037,0.7692762604592986,0.7710481944729694,0.7728219030823994,0.7745973880648502,0.7763746511993636,0.778153694266762,0.7799345190496525,0.7817171273324268,0.7835015209012641,0.7852877015441325,0.78707567105079,0.7888654312127877,0.790656983823471,0.7924503306779811,0.7942454735732571,0.7960424143080376,0.7978411546828628,0.799641696500076,0.8014440415638259,0.8032481916800679,0.8050541486565657,0.8068619143028937,0.808671490430439,0.8104828788524021,0.8122960813838003,0.8141110998414677,0.8159279360440584,0.8177465918120481,0.8195670689677355,0.8213893693352441,0.8232134947405246,0.8250394470113563,0.8268672279773491,0.8286968394699452,0.8305282833224208,0.8323615613698883,0.834196675449298,0.8360336273994399,0.8378724190609457,0.83971305227629,0.8415555288897931,0.8433998507476222,0.8452460196977937,0.8470940375901745,0.8489439062764841,0.8507956276102967,0.8526492034470429,0.8545046356440111,0.8563619260603508,0.8582210765570718,0.8600820889970492,0.8619449652450231,0.8638097071676012,0.8656763166332611,0.8675447955123504,0.8694151456770913,0.8712873690015803,0.873161467361791,0.8750374426355758,0.8769152967026675,0.8787950314446819,0.8806766487451188,0.8825601504893645,0.8844455385646942,0.8863328148602717,0.8882219812671541,0.890113039678292,0.8920059919885317,0.8939008400946175,0.8957975858951925,0.8976962312908023,0.8995967781838953,0.9014992284788252,0.9034035840818536,0.9053098469011501,0.9072180188467962,0.9091281018307861,0.9110400977670287,0.9129540085713501,0.9148698361614945,0.9167875824571273,0.918707249379836,0.9206288388531331,0.9225523528024571,0.9244777931551746,0.9264051618405831,0.9283344607899117,0.9302656919363244,0.9321988572149202,0.934133958562737,0.9360709979187521,0.9380099772238852,0.9399508984209995,0.9418937634549039,0.9438385742723552,0.9457853328220598,0.9477340410546757,0.9496847009228151,0.9516373143810446,0.9535918833858891,0.9555484098958328,0.9575068958713212,0.9594673432747638,0.9614297540705342,0.9633941302249744,0.9653604737063955,0.9673287864850797,0.9692990705332826,0.9712713278252344,0.9732455603371434,0.9752217700471966,0.9771999589355622,0.9791801289843919,0.9811622821778215,0.9831464205019752,0.9851325459449655,0.9871206604968963,0.9891107661498646,0.9911028648979622,0.9930969587372783,0.9950930496659011,0.9970911396839197,0.999091230793427,1.0010933249985199,1.003097424305303,1.0051035307218903,1.0071116462584064,1.0091217729269897,1.0111339127417927,1.013148067718986,1.015164239876759,1.0171824312353226,1.0192026438169108,1.0212248796457828,1.023249140748225,1.0252754291525532,1.0273037468891149,1.0293340959902908,1.0313664784904966,1.033400896426186,1.0354373518358522,1.0374758467600296,1.0395163832412968,1.0415589633242772,1.0436035890556423,1.045650262484114,1.0476989856604646,1.049749760637522,1.0518025894701681,1.0538574742153441,1.0559144169320511,1.057973419681352,1.0600344845263734,1.062097613532309,1.0641628087664206,1.06623007229804,1.068299406198572,1.070370812541495,1.0724442934023646,1.0745198508588154,1.0765974869905621,1.0786772038794028,1.08075900360922,1.0828428882659835,1.084928859937752,1.0870169207146758,1.0891070726889986,1.0911993179550583,1.0932936586092916,1.0953900967502341,1.0974886344785235,1.0995892738969013,1.1016920171102143,1.1037968662254176,1.1059038233515766,1.108012890599869,1.110124070083587,1.1122373639181382,1.11435277422105,1.11647030311197,1.1185899527126688,1.1207117251470418,1.1228356225411114,1.1249616470230293,1.1270898007230785,1.129220085773676,1.131352504309374,1.133487058466862,1.13562375038497,1.1377625822046702,1.1399035560690782,1.1420466741234572,1.1441919385152173,1.1463393513939204,1.1484889149112807,1.1506406312211674,1.1527945024796076,1.154950530844786,1.15710871847705,1.1592690675389106,1.1614315801950439,1.1635962586122945,1.1657631049596766,1.167932121408377,1.1701033101317568,1.1722766733053542,1.1744522131068855,1.1766299317162483,1.1788098313155233,1.1809919140889766,1.183176182223062,1.1853626379064233,1.1875512833298953,1.1897421206865075,1.1919351521714858,1.194130379982255,1.1963278063184393,1.198527433381867,1.2007292633765714,1.2029332985087928,1.2051395409869816,1.2073479930217987,1.2095586568261207,1.211771534615039,1.2139866286058643,1.2162039410181278,1.2184234740735829,1.2206452299962085,1.2228692110122115,1.2250954193500274,1.227323857240324,1.2295545269160026,1.2317874306122012,1.2340225705662964,1.2362599490179051,1.238499568208888,1.2407414303833497,1.2429855377876433,1.2452318926703714,1.2474804972823885,1.2497313538768036,1.2519844647089813,1.2542398320365462,1.2564974581193833,1.2587573452196406,1.2610194956017322,1.2632839115323395,1.2655505952804145,1.2678195491171813,1.2700907753161386,1.2723642761530622,1.2746400539060068,1.2769181108553085,1.2791984492835877,1.2814810714757505,1.283765979718992,1.286053176302796,1.2883426635189414,1.2906344436615012,1.2929285190268465,1.2952248919136478,1.2975235646228773,1.2998245394578127,1.3021278187240377,1.3044334047294455,1.3067412997842403,1.3090515062009396,1.3113640262943775,1.3136788623817068,1.3159960167824,1.3183154918182534,1.3206372898133873,1.322961413094251,1.3252878639896235,1.3276166448306155,1.3299477579506722,1.3322812056855766,1.3346169903734504,1.3369551143547571,1.3392955799723043,1.3416383895712454,1.343983545499083,1.346331050105671,1.3486809057432154,1.3510331147662797,1.353387679531784,1.3557446023990098,1.358103885729601,1.3604655318875665,1.3628295432392838,1.3651959221534988,1.3675646710013307,1.3699357921562731,1.372309287994197,1.3746851608933524,1.3770634132343713,1.3794440474002696,1.3818270657764504,1.3842124707507055,1.386600264713218,1.3889904500565649,1.391383029175719,1.393778004468052,1.3961753783333368,1.3985751531737496,1.4009773313938716,1.403381915400693,1.4057889076036145,1.4081983104144498,1.4106101262474282,1.4130243575191959,1.4154410066488203,1.4178600760577917,1.420281568170025,1.4227054854118626,1.4251318302120768,1.427560605001873,1.4299918122148911,1.4324254542872077,1.4348615336573407,1.4373000527662478,1.4397410140573337,1.4421844199764486,1.4446302729718932,1.4470785754944195,1.4495293299972343,1.4519825389360008,1.4544382047688424,1.4568963299563435,1.459356916961554,1.4618199682499882,1.4642854862896322,1.4667534735509422,1.4692239325068492,1.4716968656327611,1.474172275406564,1.476650164308626,1.4791305348218,1.4816133894314247,1.484098730625328,1.4865865608938291,1.4890768827297425,1.4915696986283775,1.4940650110875437,1.496562822607552,1.499063135691217,1.5015659528438603,1.5040712765733124,1.5065791093899157,1.5090894538065256,1.5116023123385154,1.5141176875037774,1.516635581822725,1.5191559978182965,1.5216789380159557,1.524204404943697,1.5267324011320458,1.5292629291140625,1.5317959914253438,1.5343315906040256,1.5368697291907867,1.5394104097288492,1.541953634763983,1.544499406844508,1.547047728521295,1.5495986023477704,1.5521520308799175,1.55470801667628,1.5572665622979633,1.559827670308638,1.562391343274542,1.564957583764484,1.5675263943498448,1.5700977776045804,1.5726717361052247,1.575248272430892,1.57782738916328,1.5804090888866713,1.5829933741879374,1.5855802476565395,1.5881697118845333,1.5907617694665699,1.5933564229998989,1.5959536750843712,1.5985535283224415,1.6011559853191706,1.6037610486822282,1.6063687210218964,1.6089790049510708,1.6115919030852637,1.6142074180426071,1.6168255524438553,1.619446308912387,1.6220696900742082,1.624695698557955,1.6273243369948958,1.6299556080189346,1.6325895142666131,1.6352260583771139,1.6378652429922615,1.6405070707565272,1.643151544317031,1.645798666323544,1.6484484394284893,1.6511008662869486,1.6537559495566616,1.6564136918980301,1.6590740959741201,1.6617371644506647,1.6644028999960665,1.6670713052814006,1.6697423829804179,1.6724161357695464,1.6750925663278944,1.6777716773372535,1.6804534714821013,1.683137951449604,1.685825119929619,1.688514979614697,1.6912075332000855,1.6939027833837321,1.6966007328662855,1.6993013843510996,1.7020047405442351,1.7047108041544636,1.707419577893269,1.7101310644748513,1.7128452666161285,1.7155621870367388,1.718281828459045],"x":[5.551115123125783e-17,0.0010010010010010565,0.0020020020020020575,0.003003003003003058,0.0040040040040040595,0.0050050050050050605,0.0060060060060060615,0.0070070070070070625,0.008008008008008063,0.009009009009009064,0.010010010010010065,0.011011011011011066,0.012012012012012067,0.013013013013013068,0.01401401401401407,0.01501501501501507,0.016016016016016068,0.01701701701701707,0.01801801801801807,0.019019019019019073,0.020020020020020072,0.021021021021021075,0.022022022022022074,0.023023023023023077,0.024024024024024076,0.02502502502502508,0.026026026026026078,0.02702702702702708,0.02802802802802808,0.029029029029029083,0.030030030030030082,0.031031031031031085,0.03203203203203209,0.033033033033033087,0.03403403403403409,0.03503503503503509,0.03603603603603609,0.03703703703703709,0.0380380380380381,0.039039039039039096,0.04004004004004009,0.04104104104104109,0.042042042042042094,0.04304304304304309,0.04404404404404409,0.04504504504504509,0.0460460460460461,0.0470470470470471,0.048048048048048096,0.049049049049049095,0.0500500500500501,0.0510510510510511,0.0520520520520521,0.0530530530530531,0.054054054054054106,0.055055055055055105,0.056056056056056104,0.0570570570570571,0.05805805805805811,0.05905905905905911,0.06006006006006011,0.061061061061061114,0.062062062062062114,0.06306306306306311,0.06406406406406412,0.06506506506506513,0.06606606606606612,0.06706706706706712,0.06806806806806813,0.06906906906906912,0.07007007007007013,0.07107107107107113,0.07207207207207213,0.07307307307307313,0.07407407407407413,0.07507507507507513,0.07607607607607614,0.07707707707707713,0.07807807807807814,0.07907907907907914,0.08008008008008013,0.08108108108108114,0.08208208208208213,0.08308308308308314,0.08408408408408415,0.08508508508508514,0.08608608608608614,0.08708708708708715,0.08808808808808814,0.08908908908908915,0.09009009009009014,0.09109109109109115,0.09209209209209215,0.09309309309309315,0.09409409409409415,0.09509509509509516,0.09609609609609615,0.09709709709709716,0.09809809809809815,0.09909909909909916,0.10010010010010016,0.10110110110110115,0.10210210210210216,0.10310310310310317,0.10410410410410414,0.10510510510510515,0.10610610610610614,0.10710710710710715,0.10810810810810816,0.10910910910910915,0.11011011011011015,0.11111111111111116,0.11211211211211215,0.11311311311311316,0.11411411411411415,0.11511511511511516,0.11611611611611616,0.11711711711711716,0.11811811811811816,0.11911911911911917,0.12012012012012016,0.12112112112112117,0.12212212212212216,0.12312312312312317,0.12412412412412417,0.12512512512512516,0.12612612612612617,0.12712712712712718,0.12812812812812818,0.1291291291291292,0.1301301301301302,0.1311311311311312,0.13213213213213218,0.13313313313313319,0.1341341341341342,0.1351351351351352,0.1361361361361362,0.13713713713713718,0.1381381381381382,0.1391391391391392,0.1401401401401402,0.1411411411411412,0.14214214214214219,0.1431431431431432,0.1441441441441442,0.1451451451451452,0.1461461461461462,0.14714714714714722,0.1481481481481482,0.1491491491491492,0.1501501501501502,0.15115115115115121,0.15215215215215222,0.1531531531531532,0.1541541541541542,0.1551551551551552,0.15615615615615622,0.15715715715715722,0.1581581581581582,0.1591591591591592,0.16016016016016021,0.16116116116116122,0.16216216216216223,0.16316316316316323,0.1641641641641642,0.16516516516516522,0.16616616616616622,0.16716716716716723,0.16816816816816824,0.16916916916916921,0.17017017017017022,0.17117117117117123,0.17217217217217223,0.17317317317317324,0.17417417417417422,0.17517517517517522,0.17617617617617623,0.17717717717717724,0.17817817817817824,0.17917917917917925,0.18018018018018023,0.18118118118118123,0.18218218218218224,0.18318318318318325,0.18418418418418425,0.18518518518518523,0.18618618618618624,0.18718718718718724,0.18818818818818825,0.18918918918918926,0.19019019019019023,0.19119119119119124,0.19219219219219225,0.19319319319319325,0.19419419419419426,0.19519519519519526,0.19619619619619624,0.19719719719719725,0.19819819819819826,0.19919919919919926,0.20020020020020027,0.20120120120120125,0.20220220220220225,0.20320320320320326,0.20420420420420426,0.20520520520520527,0.20620620620620625,0.20720720720720726,0.20820820820820826,0.20920920920920927,0.21021021021021027,0.21121121121121128,0.21221221221221226,0.21321321321321327,0.21421421421421427,0.21521521521521528,0.21621621621621628,0.21721721721721726,0.21821821821821827,0.21921921921921927,0.22022022022022028,0.2212212212212213,0.22222222222222227,0.22322322322322327,0.22422422422422428,0.22522522522522528,0.2262262262262263,0.2272272272272273,0.22822822822822827,0.22922922922922928,0.2302302302302303,0.2312312312312313,0.23223223223223227,0.23323323323323325,0.23423423423423426,0.23523523523523526,0.23623623623623627,0.23723723723723728,0.23823823823823825,0.23923923923923926,0.24024024024024027,0.24124124124124127,0.24224224224224228,0.24324324324324328,0.24424424424424426,0.24524524524524527,0.24624624624624628,0.24724724724724728,0.2482482482482483,0.24924924924924927,0.2502502502502503,0.2512512512512513,0.2522522522522523,0.25325325325325326,0.2542542542542543,0.2552552552552553,0.2562562562562563,0.2572572572572573,0.2582582582582583,0.2592592592592593,0.26026026026026033,0.2612612612612613,0.26226226226226235,0.2632632632632633,0.2642642642642643,0.26526526526526534,0.2662662662662663,0.26726726726726735,0.26826826826826833,0.2692692692692693,0.27027027027027034,0.2712712712712713,0.27227227227227235,0.27327327327327333,0.2742742742742743,0.27527527527527534,0.2762762762762763,0.27727727727727736,0.27827827827827833,0.2792792792792793,0.28028028028028035,0.2812812812812813,0.28228228228228236,0.28328328328328334,0.2842842842842843,0.28528528528528535,0.28628628628628633,0.28728728728728736,0.28828828828828834,0.2892892892892893,0.29029029029029035,0.29129129129129133,0.29229229229229237,0.29329329329329334,0.2942942942942944,0.29529529529529536,0.29629629629629634,0.29729729729729737,0.29829829829829835,0.2992992992992994,0.30030030030030036,0.30130130130130134,0.3023023023023024,0.30330330330330335,0.3043043043043044,0.30530530530530536,0.30630630630630634,0.3073073073073074,0.30830830830830835,0.3093093093093094,0.31031031031031037,0.31131131131131135,0.3123123123123124,0.31331331331331336,0.3143143143143144,0.31531531531531537,0.31631631631631635,0.3173173173173174,0.31831831831831836,0.3193193193193194,0.3203203203203204,0.32132132132132135,0.3223223223223224,0.32332332332332336,0.3243243243243244,0.3253253253253254,0.3263263263263264,0.3273273273273274,0.32832832832832837,0.3293293293293294,0.3303303303303304,0.3313313313313314,0.3323323323323324,0.33333333333333337,0.3343343343343344,0.3353353353353354,0.3363363363363364,0.3373373373373374,0.3383383383383384,0.3393393393393394,0.3403403403403404,0.3413413413413414,0.3423423423423424,0.3433433433433434,0.3443443443443444,0.3453453453453454,0.3463463463463464,0.3473473473473474,0.3483483483483484,0.3493493493493494,0.3503503503503504,0.3513513513513514,0.3523523523523524,0.3533533533533534,0.3543543543543544,0.3553553553553554,0.35635635635635643,0.3573573573573574,0.35835835835835844,0.3593593593593594,0.3603603603603604,0.36136136136136143,0.3623623623623624,0.36336336336336345,0.3643643643643644,0.3653653653653654,0.36636636636636644,0.3673673673673674,0.36836836836836845,0.3693693693693694,0.3703703703703704,0.37137137137137144,0.3723723723723724,0.37337337337337345,0.37437437437437443,0.3753753753753754,0.37637637637637644,0.3773773773773774,0.37837837837837845,0.37937937937937943,0.3803803803803804,0.38138138138138145,0.3823823823823824,0.38338338338338346,0.38438438438438444,0.3853853853853854,0.38638638638638645,0.3873873873873874,0.38838838838838846,0.38938938938938944,0.3903903903903905,0.39139139139139145,0.39239239239239243,0.39339339339339346,0.39439439439439444,0.3953953953953955,0.39639639639639646,0.39739739739739743,0.39839839839839847,0.39939939939939945,0.4004004004004005,0.40140140140140146,0.40240240240240244,0.40340340340340347,0.40440440440440445,0.4054054054054055,0.40640640640640646,0.40740740740740744,0.4084084084084085,0.40940940940940945,0.4104104104104105,0.41141141141141147,0.41241241241241244,0.4134134134134135,0.41441441441441446,0.4154154154154155,0.41641641641641647,0.41741741741741745,0.4184184184184185,0.41941941941941946,0.4204204204204205,0.42142142142142147,0.4224224224224225,0.4234234234234235,0.42442442442442446,0.4254254254254255,0.4264264264264265,0.4274274274274275,0.4284284284284285,0.42942942942942947,0.4304304304304305,0.4314314314314315,0.4324324324324325,0.4334334334334335,0.43443443443443447,0.4354354354354355,0.4364364364364365,0.4374374374374375,0.4384384384384385,0.43943943943943947,0.4404404404404405,0.4414414414414415,0.4424424424424425,0.4434434434434435,0.4444444444444445,0.4454454454454455,0.4464464464464465,0.4474474474474475,0.4484484484484485,0.44944944944944953,0.4504504504504505,0.4514514514514515,0.4524524524524525,0.4534534534534535,0.45445445445445454,0.4554554554554555,0.4564564564564565,0.45745745745745753,0.4584584584584585,0.45945945945945954,0.4604604604604605,0.4614614614614615,0.46246246246246253,0.4634634634634635,0.46446446446446454,0.4654654654654655,0.4664664664664665,0.46746746746746753,0.4684684684684685,0.46946946946946955,0.4704704704704705,0.4714714714714715,0.47247247247247254,0.4734734734734735,0.47447447447447455,0.47547547547547553,0.4764764764764765,0.47747747747747754,0.4784784784784785,0.47947947947947955,0.48048048048048053,0.48148148148148157,0.48248248248248254,0.4834834834834835,0.48448448448448456,0.48548548548548554,0.48648648648648657,0.4874874874874875,0.48848848848848847,0.4894894894894895,0.4904904904904905,0.4914914914914915,0.4924924924924925,0.4934934934934935,0.4944944944944945,0.4954954954954955,0.4964964964964965,0.4974974974974975,0.4984984984984985,0.4994994994994995,0.5005005005005005,0.5015015015015015,0.5025025025025025,0.5035035035035035,0.5045045045045045,0.5055055055055055,0.5065065065065065,0.5075075075075075,0.5085085085085085,0.5095095095095095,0.5105105105105106,0.5115115115115115,0.5125125125125125,0.5135135135135135,0.5145145145145145,0.5155155155155156,0.5165165165165165,0.5175175175175175,0.5185185185185185,0.5195195195195195,0.5205205205205206,0.5215215215215215,0.5225225225225225,0.5235235235235235,0.5245245245245245,0.5255255255255256,0.5265265265265265,0.5275275275275275,0.5285285285285285,0.5295295295295295,0.5305305305305306,0.5315315315315315,0.5325325325325325,0.5335335335335335,0.5345345345345346,0.5355355355355356,0.5365365365365365,0.5375375375375375,0.5385385385385385,0.5395395395395396,0.5405405405405406,0.5415415415415415,0.5425425425425425,0.5435435435435435,0.5445445445445446,0.5455455455455456,0.5465465465465466,0.5475475475475475,0.5485485485485485,0.5495495495495496,0.5505505505505506,0.5515515515515516,0.5525525525525525,0.5535535535535535,0.5545545545545546,0.5555555555555556,0.5565565565565566,0.5575575575575575,0.5585585585585585,0.5595595595595596,0.5605605605605606,0.5615615615615616,0.5625625625625625,0.5635635635635635,0.5645645645645646,0.5655655655655656,0.5665665665665666,0.5675675675675675,0.5685685685685685,0.5695695695695696,0.5705705705705706,0.5715715715715716,0.5725725725725725,0.5735735735735735,0.5745745745745746,0.5755755755755756,0.5765765765765766,0.5775775775775776,0.5785785785785785,0.5795795795795796,0.5805805805805806,0.5815815815815816,0.5825825825825826,0.5835835835835835,0.5845845845845846,0.5855855855855856,0.5865865865865866,0.5875875875875876,0.5885885885885885,0.5895895895895896,0.5905905905905906,0.5915915915915916,0.5925925925925926,0.5935935935935935,0.5945945945945946,0.5955955955955956,0.5965965965965966,0.5975975975975976,0.5985985985985987,0.5995995995995996,0.6006006006006006,0.6016016016016016,0.6026026026026026,0.6036036036036037,0.6046046046046046,0.6056056056056056,0.6066066066066066,0.6076076076076076,0.6086086086086087,0.6096096096096096,0.6106106106106106,0.6116116116116116,0.6126126126126126,0.6136136136136137,0.6146146146146146,0.6156156156156156,0.6166166166166166,0.6176176176176176,0.6186186186186187,0.6196196196196196,0.6206206206206206,0.6216216216216216,0.6226226226226226,0.6236236236236237,0.6246246246246246,0.6256256256256256,0.6266266266266266,0.6276276276276276,0.6286286286286287,0.6296296296296297,0.6306306306306306,0.6316316316316316,0.6326326326326326,0.6336336336336337,0.6346346346346347,0.6356356356356356,0.6366366366366366,0.6376376376376376,0.6386386386386387,0.6396396396396397,0.6406406406406406,0.6416416416416416,0.6426426426426426,0.6436436436436437,0.6446446446446447,0.6456456456456456,0.6466466466466466,0.6476476476476476,0.6486486486486487,0.6496496496496497,0.6506506506506506,0.6516516516516516,0.6526526526526526,0.6536536536536537,0.6546546546546547,0.6556556556556556,0.6566566566566566,0.6576576576576577,0.6586586586586587,0.6596596596596597,0.6606606606606606,0.6616616616616616,0.6626626626626627,0.6636636636636637,0.6646646646646647,0.6656656656656657,0.6666666666666666,0.6676676676676677,0.6686686686686687,0.6696696696696697,0.6706706706706707,0.6716716716716716,0.6726726726726727,0.6736736736736737,0.6746746746746747,0.6756756756756757,0.6766766766766766,0.6776776776776777,0.6786786786786787,0.6796796796796797,0.6806806806806807,0.6816816816816816,0.6826826826826827,0.6836836836836837,0.6846846846846847,0.6856856856856857,0.6866866866866866,0.6876876876876877,0.6886886886886887,0.6896896896896897,0.6906906906906907,0.6916916916916916,0.6926926926926927,0.6936936936936937,0.6946946946946947,0.6956956956956957,0.6966966966966966,0.6976976976976977,0.6986986986986987,0.6996996996996997,0.7007007007007007,0.7017017017017017,0.7027027027027027,0.7037037037037037,0.7047047047047047,0.7057057057057057,0.7067067067067067,0.7077077077077077,0.7087087087087087,0.7097097097097097,0.7107107107107107,0.7117117117117117,0.7127127127127127,0.7137137137137137,0.7147147147147147,0.7157157157157157,0.7167167167167167,0.7177177177177178,0.7187187187187187,0.7197197197197197,0.7207207207207207,0.7217217217217218,0.7227227227227228,0.7237237237237237,0.7247247247247247,0.7257257257257257,0.7267267267267268,0.7277277277277278,0.7287287287287287,0.7297297297297297,0.7307307307307307,0.7317317317317318,0.7327327327327328,0.7337337337337337,0.7347347347347347,0.7357357357357357,0.7367367367367368,0.7377377377377378,0.7387387387387387,0.7397397397397397,0.7407407407407407,0.7417417417417418,0.7427427427427428,0.7437437437437437,0.7447447447447447,0.7457457457457457,0.7467467467467468,0.7477477477477478,0.7487487487487487,0.7497497497497497,0.7507507507507507,0.7517517517517518,0.7527527527527528,0.7537537537537538,0.7547547547547547,0.7557557557557557,0.7567567567567568,0.7577577577577578,0.7587587587587588,0.7597597597597597,0.7607607607607607,0.7617617617617618,0.7627627627627628,0.7637637637637638,0.7647647647647647,0.7657657657657657,0.7667667667667668,0.7677677677677678,0.7687687687687688,0.7697697697697697,0.7707707707707707,0.7717717717717718,0.7727727727727728,0.7737737737737738,0.7747747747747747,0.7757757757757757,0.7767767767767768,0.7777777777777778,0.7787787787787788,0.7797797797797797,0.7807807807807807,0.7817817817817818,0.7827827827827828,0.7837837837837838,0.7847847847847848,0.7857857857857858,0.7867867867867868,0.7877877877877878,0.7887887887887888,0.7897897897897898,0.7907907907907908,0.7917917917917918,0.7927927927927928,0.7937937937937938,0.7947947947947948,0.7957957957957958,0.7967967967967968,0.7977977977977978,0.7987987987987988,0.7997997997997998,0.8008008008008008,0.8018018018018018,0.8028028028028028,0.8038038038038038,0.8048048048048048,0.8058058058058059,0.8068068068068068,0.8078078078078078,0.8088088088088088,0.8098098098098098,0.8108108108108109,0.8118118118118118,0.8128128128128128,0.8138138138138138,0.8148148148148148,0.8158158158158159,0.8168168168168168,0.8178178178178178,0.8188188188188188,0.8198198198198198,0.8208208208208209,0.8218218218218218,0.8228228228228228,0.8238238238238238,0.8248248248248248,0.8258258258258259,0.8268268268268268,0.8278278278278278,0.8288288288288288,0.8298298298298298,0.8308308308308309,0.8318318318318318,0.8328328328328328,0.8338338338338338,0.8348348348348348,0.8358358358358359,0.8368368368368369,0.8378378378378378,0.8388388388388388,0.8398398398398398,0.8408408408408409,0.8418418418418419,0.8428428428428428,0.8438438438438438,0.8448448448448449,0.8458458458458459,0.8468468468468469,0.8478478478478478,0.8488488488488488,0.8498498498498499,0.8508508508508509,0.8518518518518519,0.8528528528528528,0.8538538538538538,0.8548548548548549,0.8558558558558559,0.8568568568568569,0.8578578578578578,0.8588588588588588,0.8598598598598599,0.8608608608608609,0.8618618618618619,0.8628628628628628,0.8638638638638638,0.8648648648648649,0.8658658658658659,0.8668668668668669,0.8678678678678678,0.8688688688688688,0.8698698698698699,0.8708708708708709,0.8718718718718719,0.8728728728728729,0.8738738738738738,0.8748748748748749,0.8758758758758759,0.8768768768768769,0.8778778778778779,0.8788788788788788,0.8798798798798799,0.8808808808808809,0.8818818818818819,0.8828828828828829,0.8838838838838838,0.8848848848848849,0.8858858858858859,0.8868868868868869,0.8878878878878879,0.8888888888888888,0.8898898898898899,0.8908908908908909,0.8918918918918919,0.8928928928928929,0.8938938938938938,0.8948948948948949,0.8958958958958959,0.8968968968968969,0.8978978978978979,0.8988988988988988,0.8998998998998999,0.9009009009009009,0.9019019019019019,0.9029029029029029,0.9039039039039038,0.9049049049049049,0.9059059059059059,0.9069069069069069,0.9079079079079079,0.908908908908909,0.9099099099099099,0.9109109109109109,0.9119119119119119,0.9129129129129129,0.913913913913914,0.914914914914915,0.9159159159159159,0.9169169169169169,0.9179179179179179,0.918918918918919,0.91991991991992,0.9209209209209209,0.9219219219219219,0.9229229229229229,0.923923923923924,0.924924924924925,0.9259259259259259,0.9269269269269269,0.9279279279279279,0.928928928928929,0.92992992992993,0.9309309309309309,0.9319319319319319,0.9329329329329329,0.933933933933934,0.934934934934935,0.9359359359359359,0.9369369369369369,0.9379379379379379,0.938938938938939,0.93993993993994,0.9409409409409409,0.9419419419419419,0.9429429429429429,0.943943943943944,0.944944944944945,0.9459459459459459,0.9469469469469469,0.9479479479479479,0.948948948948949,0.94994994994995,0.950950950950951,0.9519519519519519,0.9529529529529529,0.953953953953954,0.954954954954955,0.955955955955956,0.9569569569569569,0.9579579579579579,0.958958958958959,0.95995995995996,0.960960960960961,0.9619619619619619,0.9629629629629629,0.963963963963964,0.964964964964965,0.965965965965966,0.9669669669669669,0.9679679679679679,0.968968968968969,0.96996996996997,0.970970970970971,0.9719719719719719,0.972972972972973,0.973973973973974,0.974974974974975,0.975975975975976,0.9769769769769769,0.977977977977978,0.978978978978979,0.97997997997998,0.980980980980981,0.9819819819819819,0.982982982982983,0.983983983983984,0.984984984984985,0.985985985985986,0.986986986986987,0.987987987987988,0.988988988988989,0.98998998998999,0.990990990990991,0.991991991991992,0.992992992992993,0.993993993993994,0.994994994994995,0.995995995995996,0.996996996996997,0.997997997997998,0.998998998998999,1.0]}
},{}],43:[function(require,module,exports){
module.exports={"expected":[-5.551115123125783e-17,-5.5400017795359415e-17,-5.5288884359461e-17,-5.5177750923562586e-17,-5.506661748766417e-17,-5.4955484051765757e-17,-5.4844350615867345e-17,-5.473321717996893e-17,-5.4622083744070516e-17,-5.45109503081721e-17,-5.4399816872273687e-17,-5.4288683436375275e-17,-5.417755000047686e-17,-5.4066416564578446e-17,-5.395528312868003e-17,-5.3844149692781617e-17,-5.37330162568832e-17,-5.362188282098479e-17,-5.3510749385086376e-17,-5.339961594918796e-17,-5.3288482513289546e-17,-5.317734907739113e-17,-5.306621564149272e-17,-5.2955082205594306e-17,-5.284394876969589e-17,-5.2732815333797476e-17,-5.262168189789906e-17,-5.251054846200065e-17,-5.2399415026102235e-17,-5.228828159020382e-17,-5.2177148154305406e-17,-5.206601471840699e-17,-5.1954881282508577e-17,-5.1843747846610165e-17,-5.173261441071175e-17,-5.1621480974813336e-17,-5.151034753891492e-17,-5.1399214103016507e-17,-5.1288080667118095e-17,-5.117694723121968e-17,-5.1065813795321266e-17,-5.095468035942285e-17,-5.0843546923524437e-17,-5.0732413487626025e-17,-5.062128005172761e-17,-5.0510146615829196e-17,-5.039901317993078e-17,-5.0287879744032366e-17,-5.017674630813395e-17,-5.006561287223554e-17,-4.9954479436337126e-17,-4.984334600043871e-17,-4.9732212564540296e-17,-4.962107912864188e-17,-4.950994569274347e-17,-4.9398812256845055e-17,-4.928767882094664e-17,-4.9176545385048226e-17,-4.906541194914981e-17,-4.8954278513251397e-17,-4.8843145077352985e-17,-4.873201164145457e-17,-4.8620878205556156e-17,-4.850974476965774e-17,-4.8398611333759327e-17,-4.8287477897860915e-17,-4.81763444619625e-17,-4.8065211026064086e-17,-4.795407759016567e-17,-4.7842944154267257e-17,-4.7731810718368845e-17,-4.762067728247043e-17,-4.7509543846572016e-17,-4.73984104106736e-17,-4.7287276974775186e-17,-4.7176143538876775e-17,-4.706501010297836e-17,-4.6953876667079946e-17,-4.684274323118153e-17,-4.6731609795283116e-17,-4.66204763593847e-17,-4.650934292348629e-17,-4.6398209487587875e-17,-4.628707605168946e-17,-4.6175942615791046e-17,-4.606480917989263e-17,-4.5953675743994217e-17,-4.5842542308095805e-17,-4.573140887219739e-17,-4.5620275436298976e-17,-4.550914200040056e-17,-4.5398008564502147e-17,-4.5286875128603735e-17,-4.517574169270532e-17,-4.5064608256806906e-17,-4.495347482090849e-17,-4.4842341385010077e-17,-4.4731207949111665e-17,-4.462007451321325e-17,-4.4508941077314836e-17,-4.439780764141642e-17,-4.4286674205518006e-17,-4.4175540769619595e-17,-4.406440733372118e-17,-4.3953273897822766e-17,-4.384214046192435e-17,-4.3731007026025936e-17,-4.3619873590127525e-17,-4.350874015422911e-17,-4.3397606718330695e-17,-4.328647328243228e-17,-4.3175339846533866e-17,-4.306420641063545e-17,-4.2953072974737037e-17,-4.2841939538838625e-17,-4.273080610294021e-17,-4.2619672667041796e-17,-4.250853923114338e-17,-4.2397405795244967e-17,-4.2286272359346555e-17,-4.217513892344814e-17,-4.2064005487549726e-17,-4.195287205165131e-17,-4.1841738615752897e-17,-4.1730605179854485e-17,-4.161947174395607e-17,-4.1508338308057656e-17,-4.139720487215924e-17,-4.1286071436260826e-17,-4.1174938000362415e-17,-4.1063804564464e-17,-4.0952671128565586e-17,-4.084153769266717e-17,-4.0730404256768756e-17,-4.0619270820870345e-17,-4.050813738497193e-17,-4.0397003949073515e-17,-4.02858705131751e-17,-4.0174737077276686e-17,-4.0063603641378275e-17,-3.9952470205479857e-17,-3.9841336769581445e-17,-3.973020333368303e-17,-3.9619069897784616e-17,-3.95079364618862e-17,-3.9396803025987787e-17,-3.9285669590089375e-17,-3.917453615419096e-17,-3.9063402718292546e-17,-3.895226928239413e-17,-3.8841135846495717e-17,-3.8730002410597305e-17,-3.861886897469889e-17,-3.8507735538800476e-17,-3.839660210290206e-17,-3.8285468667003646e-17,-3.8174335231105235e-17,-3.806320179520682e-17,-3.7952068359308406e-17,-3.784093492340999e-17,-3.7729801487511576e-17,-3.7618668051613165e-17,-3.750753461571475e-17,-3.7396401179816335e-17,-3.728526774391792e-17,-3.7174134308019506e-17,-3.7063000872121095e-17,-3.6951867436222677e-17,-3.6840734000324265e-17,-3.672960056442585e-17,-3.6618467128527436e-17,-3.6507333692629024e-17,-3.6396200256730607e-17,-3.6285066820832195e-17,-3.617393338493378e-17,-3.6062799949035366e-17,-3.595166651313695e-17,-3.5840533077238537e-17,-3.5729399641340125e-17,-3.561826620544171e-17,-3.5507132769543296e-17,-3.539599933364488e-17,-3.5284865897746466e-17,-3.5173732461848055e-17,-3.506259902594964e-17,-3.4951465590051226e-17,-3.484033215415281e-17,-3.4729198718254396e-17,-3.4618065282355985e-17,-3.450693184645757e-17,-3.4395798410559155e-17,-3.428466497466074e-17,-3.4173531538762326e-17,-3.4062398102863915e-17,-3.3951264666965497e-17,-3.3840131231067085e-17,-3.372899779516867e-17,-3.3617864359270256e-17,-3.3506730923371844e-17,-3.3395597487473427e-17,-3.3284464051575015e-17,-3.31733306156766e-17,-3.3062197179778186e-17,-3.295106374387977e-17,-3.2839930307981357e-17,-3.2728796872082945e-17,-3.261766343618453e-17,-3.2506530000286116e-17,-3.23953965643877e-17,-3.2284263128489286e-17,-3.2173129692590875e-17,-3.206199625669246e-17,-3.1950862820794046e-17,-3.183972938489563e-17,-3.1728595948997216e-17,-3.1617462513098805e-17,-3.150632907720039e-17,-3.1395195641301975e-17,-3.128406220540356e-17,-3.1172928769505146e-17,-3.1061795333606735e-17,-3.0950661897708317e-17,-3.0839528461809905e-17,-3.072839502591149e-17,-3.0617261590013076e-17,-3.0506128154114664e-17,-3.0394994718216247e-17,-3.0283861282317835e-17,-3.017272784641942e-17,-3.0061594410521006e-17,-2.9950460974622594e-17,-2.9839327538724177e-17,-2.9728194102825765e-17,-2.961706066692735e-17,-2.9505927231028936e-17,-2.939479379513052e-17,-2.9283660359232106e-17,-2.9172526923333695e-17,-2.906139348743528e-17,-2.8950260051536866e-17,-2.883912661563845e-17,-2.8727993179740036e-17,-2.8616859743841625e-17,-2.850572630794321e-17,-2.8394592872044795e-17,-2.828345943614638e-17,-2.8172326000247966e-17,-2.8061192564349555e-17,-2.7950059128451137e-17,-2.7838925692552725e-17,-2.772779225665431e-17,-2.7616658820755896e-17,-2.750552538485748e-17,-2.7394391948959067e-17,-2.7283258513060655e-17,-2.717212507716224e-17,-2.7060991641263826e-17,-2.694985820536541e-17,-2.6838724769466997e-17,-2.6727591333568582e-17,-2.661645789767017e-17,-2.6505324461771756e-17,-2.639419102587334e-17,-2.6283057589974926e-17,-2.6171924154076512e-17,-2.60607907181781e-17,-2.5949657282279686e-17,-2.583852384638127e-17,-2.5727390410482856e-17,-2.5616256974584442e-17,-2.550512353868603e-17,-2.5393990102787615e-17,-2.52828566668892e-17,-2.5171723230990786e-17,-2.506058979509237e-17,-2.4949456359193957e-17,-2.4838322923295545e-17,-2.472718948739713e-17,-2.4616056051498716e-17,-2.45049226156003e-17,-2.4393789179701887e-17,-2.4282655743803475e-17,-2.417152230790506e-17,-2.4060388872006646e-17,-2.394925543610823e-17,-2.3838122000209817e-17,-2.3726988564311405e-17,-2.361585512841299e-17,-2.3504721692514576e-17,-2.339358825661616e-17,-2.3282454820717746e-17,-2.3171321384819332e-17,-2.306018794892092e-17,-2.2949054513022506e-17,-2.283792107712409e-17,-2.2726787641225676e-17,-2.2615654205327262e-17,-2.250452076942885e-17,-2.2393387333530435e-17,-2.228225389763202e-17,-2.2171120461733606e-17,-2.205998702583519e-17,-2.194885358993678e-17,-2.1837720154038365e-17,-2.172658671813995e-17,-2.1615453282241536e-17,-2.150431984634312e-17,-2.1393186410444707e-17,-2.1282052974546295e-17,-2.117091953864788e-17,-2.1059786102749466e-17,-2.094865266685105e-17,-2.0837519230952637e-17,-2.0726385795054225e-17,-2.061525235915581e-17,-2.0504118923257396e-17,-2.039298548735898e-17,-2.0281852051460566e-17,-2.0170718615562155e-17,-2.005958517966374e-17,-1.9948451743765326e-17,-1.983731830786691e-17,-1.9726184871968496e-17,-1.9615051436070082e-17,-1.950391800017167e-17,-1.9392784564273255e-17,-1.928165112837484e-17,-1.9170517692476426e-17,-1.905938425657801e-17,-1.89482508206796e-17,-1.8837117384781185e-17,-1.872598394888277e-17,-1.8614850512984356e-17,-1.850371707708594e-17,-1.839258364118753e-17,-1.8281450205289115e-17,-1.81703167693907e-17,-1.8059183333492286e-17,-1.794804989759387e-17,-1.7836916461695457e-17,-1.7725783025797045e-17,-1.761464958989863e-17,-1.7503516154000216e-17,-1.73923827181018e-17,-1.7281249282203386e-17,-1.7170115846304975e-17,-1.705898241040656e-17,-1.6947848974508146e-17,-1.683671553860973e-17,-1.6725582102711316e-17,-1.6614448666812905e-17,-1.650331523091449e-17,-1.6392181795016075e-17,-1.628104835911766e-17,-1.6169914923219246e-17,-1.605878148732083e-17,-1.594764805142242e-17,-1.5836514615524005e-17,-1.572538117962559e-17,-1.5614247743727176e-17,-1.550311430782876e-17,-1.539198087193035e-17,-1.5280847436031935e-17,-1.516971400013352e-17,-1.5058580564235106e-17,-1.494744712833669e-17,-1.483631369243828e-17,-1.4725180256539865e-17,-1.461404682064145e-17,-1.4502913384743036e-17,-1.439177994884462e-17,-1.4280646512946206e-17,-1.4169513077047795e-17,-1.405837964114938e-17,-1.3947246205250966e-17,-1.3836112769352551e-17,-1.3724979333454138e-17,-1.3613845897555723e-17,-1.350271246165731e-17,-1.3391579025758895e-17,-1.328044558986048e-17,-1.3169312153962068e-17,-1.3058178718063653e-17,-1.2947045282165238e-17,-1.2835911846266825e-17,-1.272477841036841e-17,-1.2613644974469997e-17,-1.2502511538571583e-17,-1.2391378102673168e-17,-1.2280244666774755e-17,-1.216911123087634e-17,-1.2057977794977926e-17,-1.1946844359079513e-17,-1.1835710923181098e-17,-1.1724577487282685e-17,-1.161344405138427e-17,-1.1502310615485856e-17,-1.1391177179587443e-17,-1.1280043743689028e-17,-1.1168910307790613e-17,-1.10577768718922e-17,-1.0946643435993786e-17,-1.0835510000095371e-17,-1.0724376564196958e-17,-1.0613243128298543e-17,-1.050210969240013e-17,-1.0390976256501715e-17,-1.02798428206033e-17,-1.0168709384704888e-17,-1.0057575948806473e-17,-9.946442512908058e-18,-9.835309077009645e-18,-9.72417564111123e-18,-9.613042205212817e-18,-9.501908769314403e-18,-9.390775333415988e-18,-9.279641897517575e-18,-9.16850846161916e-18,-9.057375025720746e-18,-8.946241589822333e-18,-8.835108153923918e-18,-8.723974718025505e-18,-8.61284128212709e-18,-8.501707846228676e-18,-8.390574410330263e-18,-8.279440974431848e-18,-8.168307538533433e-18,-8.05717410263502e-18,-7.946040666736606e-18,-7.834907230838192e-18,-7.723773794939778e-18,-7.612640359041363e-18,-7.50150692314295e-18,-7.390373487244535e-18,-7.27924005134612e-18,-7.168106615447708e-18,-7.056973179549293e-18,-6.94583974365088e-18,-6.834706307752465e-18,-6.723572871854051e-18,-6.612439435955637e-18,-6.501306000057223e-18,-6.390172564158809e-18,-6.279039128260395e-18,-6.1679056923619804e-18,-6.0567722564635666e-18,-5.945638820565153e-18,-5.834505384666739e-18,-5.723371948768324e-18,-5.61223851286991e-18,-5.5011050769714964e-18,-5.3899716410730825e-18,-5.278838205174668e-18,-5.167704769276254e-18,-5.05657133337784e-18,-4.945437897479426e-18,-4.834304461581012e-18,-4.723171025682598e-18,-4.612037589784184e-18,-4.50090415388577e-18,-4.389770717987355e-18,-4.2786372820889415e-18,-4.1675038461905276e-18,-4.056370410292114e-18,-3.945236974393699e-18,-3.834103538495285e-18,-3.722970102596871e-18,-3.6118366666984575e-18,-3.500703230800043e-18,-3.389569794901629e-18,-3.278436359003215e-18,-3.167302923104801e-18,-3.056169487206387e-18,-2.9450360513079727e-18,-2.833902615409559e-18,-2.7227691795111445e-18,-2.6116357436127307e-18,-2.5005023077143164e-18,-2.3893688718159025e-18,-2.2782354359174883e-18,-2.1671020000190744e-18,-2.05596856412066e-18,-1.9448351282222463e-18,-1.833701692323832e-18,-1.7225682564254181e-18,-1.611434820527004e-18,-1.50030138462859e-18,-1.389167948730176e-18,-1.2780345128317619e-18,-1.1669010769333478e-18,-1.0557676410349337e-18,-9.446342051365197e-19,-8.335007692381055e-19,-7.223673333396914e-19,-6.112338974412774e-19,-5.001004615428633e-19,-3.8896702564444924e-19,-2.7783358974603517e-19,-1.667001538476211e-19,-5.556671794920703e-20,5.556671794920703e-20,1.667001538476211e-19,2.7783358974603517e-19,3.8896702564444924e-19,5.001004615428633e-19,6.112338974412774e-19,7.223673333396914e-19,8.335007692381055e-19,9.446342051365197e-19,1.0557676410349337e-18,1.1669010769333478e-18,1.2780345128317619e-18,1.389167948730176e-18,1.50030138462859e-18,1.611434820527004e-18,1.7225682564254181e-18,1.833701692323832e-18,1.9448351282222463e-18,2.05596856412066e-18,2.1671020000190744e-18,2.2782354359174883e-18,2.3893688718159025e-18,2.5005023077143164e-18,2.6116357436127307e-18,2.7227691795111445e-18,2.833902615409559e-18,2.9450360513079727e-18,3.056169487206387e-18,3.167302923104801e-18,3.278436359003215e-18,3.389569794901629e-18,3.500703230800043e-18,3.6118366666984575e-18,3.722970102596871e-18,3.834103538495285e-18,3.945236974393699e-18,4.056370410292114e-18,4.1675038461905276e-18,4.2786372820889415e-18,4.389770717987355e-18,4.50090415388577e-18,4.612037589784184e-18,4.723171025682598e-18,4.834304461581012e-18,4.945437897479426e-18,5.05657133337784e-18,5.167704769276254e-18,5.278838205174668e-18,5.3899716410730825e-18,5.5011050769714964e-18,5.61223851286991e-18,5.723371948768324e-18,5.834505384666739e-18,5.945638820565153e-18,6.0567722564635666e-18,6.1679056923619804e-18,6.279039128260395e-18,6.390172564158809e-18,6.501306000057223e-18,6.612439435955637e-18,6.723572871854051e-18,6.834706307752465e-18,6.94583974365088e-18,7.056973179549293e-18,7.168106615447708e-18,7.27924005134612e-18,7.390373487244535e-18,7.50150692314295e-18,7.612640359041363e-18,7.723773794939778e-18,7.834907230838192e-18,7.946040666736606e-18,8.05717410263502e-18,8.168307538533433e-18,8.279440974431848e-18,8.390574410330263e-18,8.501707846228676e-18,8.61284128212709e-18,8.723974718025505e-18,8.835108153923918e-18,8.946241589822333e-18,9.057375025720746e-18,9.16850846161916e-18,9.279641897517575e-18,9.390775333415988e-18,9.501908769314403e-18,9.613042205212817e-18,9.72417564111123e-18,9.835309077009645e-18,9.946442512908058e-18,1.0057575948806473e-17,1.0168709384704888e-17,1.02798428206033e-17,1.0390976256501715e-17,1.050210969240013e-17,1.0613243128298543e-17,1.0724376564196958e-17,1.0835510000095371e-17,1.0946643435993786e-17,1.10577768718922e-17,1.1168910307790613e-17,1.1280043743689028e-17,1.1391177179587443e-17,1.1502310615485856e-17,1.161344405138427e-17,1.1724577487282685e-17,1.1835710923181098e-17,1.1946844359079513e-17,1.2057977794977926e-17,1.216911123087634e-17,1.2280244666774755e-17,1.2391378102673168e-17,1.2502511538571583e-17,1.2613644974469997e-17,1.272477841036841e-17,1.2835911846266825e-17,1.2947045282165238e-17,1.3058178718063653e-17,1.3169312153962068e-17,1.328044558986048e-17,1.3391579025758895e-17,1.350271246165731e-17,1.3613845897555723e-17,1.3724979333454138e-17,1.3836112769352551e-17,1.3947246205250966e-17,1.405837964114938e-17,1.4169513077047795e-17,1.4280646512946206e-17,1.439177994884462e-17,1.4502913384743036e-17,1.461404682064145e-17,1.4725180256539865e-17,1.483631369243828e-17,1.494744712833669e-17,1.5058580564235106e-17,1.516971400013352e-17,1.5280847436031935e-17,1.539198087193035e-17,1.550311430782876e-17,1.5614247743727176e-17,1.572538117962559e-17,1.5836514615524005e-17,1.594764805142242e-17,1.605878148732083e-17,1.6169914923219246e-17,1.628104835911766e-17,1.6392181795016075e-17,1.650331523091449e-17,1.6614448666812905e-17,1.6725582102711316e-17,1.683671553860973e-17,1.6947848974508146e-17,1.705898241040656e-17,1.7170115846304975e-17,1.7281249282203386e-17,1.73923827181018e-17,1.7503516154000216e-17,1.761464958989863e-17,1.7725783025797045e-17,1.7836916461695457e-17,1.794804989759387e-17,1.8059183333492286e-17,1.81703167693907e-17,1.8281450205289115e-17,1.839258364118753e-17,1.850371707708594e-17,1.8614850512984356e-17,1.872598394888277e-17,1.8837117384781185e-17,1.89482508206796e-17,1.905938425657801e-17,1.9170517692476426e-17,1.928165112837484e-17,1.9392784564273255e-17,1.950391800017167e-17,1.9615051436070082e-17,1.9726184871968496e-17,1.983731830786691e-17,1.9948451743765326e-17,2.005958517966374e-17,2.0170718615562155e-17,2.0281852051460566e-17,2.039298548735898e-17,2.0504118923257396e-17,2.061525235915581e-17,2.0726385795054225e-17,2.0837519230952637e-17,2.094865266685105e-17,2.1059786102749466e-17,2.117091953864788e-17,2.1282052974546295e-17,2.1393186410444707e-17,2.150431984634312e-17,2.1615453282241536e-17,2.172658671813995e-17,2.1837720154038365e-17,2.194885358993678e-17,2.205998702583519e-17,2.2171120461733606e-17,2.228225389763202e-17,2.2393387333530435e-17,2.250452076942885e-17,2.2615654205327262e-17,2.2726787641225676e-17,2.283792107712409e-17,2.2949054513022506e-17,2.306018794892092e-17,2.3171321384819332e-17,2.3282454820717746e-17,2.339358825661616e-17,2.3504721692514576e-17,2.361585512841299e-17,2.3726988564311405e-17,2.3838122000209817e-17,2.394925543610823e-17,2.4060388872006646e-17,2.417152230790506e-17,2.4282655743803475e-17,2.4393789179701887e-17,2.45049226156003e-17,2.4616056051498716e-17,2.472718948739713e-17,2.4838322923295545e-17,2.4949456359193957e-17,2.506058979509237e-17,2.5171723230990786e-17,2.52828566668892e-17,2.5393990102787615e-17,2.550512353868603e-17,2.5616256974584442e-17,2.5727390410482856e-17,2.583852384638127e-17,2.5949657282279686e-17,2.60607907181781e-17,2.6171924154076512e-17,2.6283057589974926e-17,2.639419102587334e-17,2.6505324461771756e-17,2.661645789767017e-17,2.6727591333568582e-17,2.6838724769466997e-17,2.694985820536541e-17,2.7060991641263826e-17,2.717212507716224e-17,2.7283258513060655e-17,2.7394391948959067e-17,2.750552538485748e-17,2.7616658820755896e-17,2.772779225665431e-17,2.7838925692552725e-17,2.7950059128451137e-17,2.8061192564349555e-17,2.8172326000247966e-17,2.828345943614638e-17,2.8394592872044795e-17,2.850572630794321e-17,2.8616859743841625e-17,2.8727993179740036e-17,2.883912661563845e-17,2.8950260051536866e-17,2.906139348743528e-17,2.9172526923333695e-17,2.9283660359232106e-17,2.939479379513052e-17,2.9505927231028936e-17,2.961706066692735e-17,2.9728194102825765e-17,2.9839327538724177e-17,2.9950460974622594e-17,3.0061594410521006e-17,3.017272784641942e-17,3.0283861282317835e-17,3.0394994718216247e-17,3.0506128154114664e-17,3.0617261590013076e-17,3.072839502591149e-17,3.0839528461809905e-17,3.0950661897708317e-17,3.1061795333606735e-17,3.1172928769505146e-17,3.128406220540356e-17,3.1395195641301975e-17,3.150632907720039e-17,3.1617462513098805e-17,3.1728595948997216e-17,3.183972938489563e-17,3.1950862820794046e-17,3.206199625669246e-17,3.2173129692590875e-17,3.2284263128489286e-17,3.23953965643877e-17,3.2506530000286116e-17,3.261766343618453e-17,3.2728796872082945e-17,3.2839930307981357e-17,3.295106374387977e-17,3.3062197179778186e-17,3.31733306156766e-17,3.3284464051575015e-17,3.3395597487473427e-17,3.3506730923371844e-17,3.3617864359270256e-17,3.372899779516867e-17,3.3840131231067085e-17,3.3951264666965497e-17,3.4062398102863915e-17,3.4173531538762326e-17,3.428466497466074e-17,3.4395798410559155e-17,3.450693184645757e-17,3.4618065282355985e-17,3.4729198718254396e-17,3.484033215415281e-17,3.4951465590051226e-17,3.506259902594964e-17,3.5173732461848055e-17,3.5284865897746466e-17,3.539599933364488e-17,3.5507132769543296e-17,3.561826620544171e-17,3.5729399641340125e-17,3.5840533077238537e-17,3.595166651313695e-17,3.6062799949035366e-17,3.617393338493378e-17,3.6285066820832195e-17,3.6396200256730607e-17,3.6507333692629024e-17,3.6618467128527436e-17,3.672960056442585e-17,3.6840734000324265e-17,3.6951867436222677e-17,3.7063000872121095e-17,3.7174134308019506e-17,3.728526774391792e-17,3.7396401179816335e-17,3.750753461571475e-17,3.7618668051613165e-17,3.7729801487511576e-17,3.784093492340999e-17,3.7952068359308406e-17,3.806320179520682e-17,3.8174335231105235e-17,3.8285468667003646e-17,3.839660210290206e-17,3.8507735538800476e-17,3.861886897469889e-17,3.8730002410597305e-17,3.8841135846495717e-17,3.895226928239413e-17,3.9063402718292546e-17,3.917453615419096e-17,3.9285669590089375e-17,3.9396803025987787e-17,3.95079364618862e-17,3.9619069897784616e-17,3.973020333368303e-17,3.9841336769581445e-17,3.9952470205479857e-17,4.0063603641378275e-17,4.0174737077276686e-17,4.02858705131751e-17,4.0397003949073515e-17,4.050813738497193e-17,4.0619270820870345e-17,4.0730404256768756e-17,4.084153769266717e-17,4.0952671128565586e-17,4.1063804564464e-17,4.1174938000362415e-17,4.1286071436260826e-17,4.139720487215924e-17,4.1508338308057656e-17,4.161947174395607e-17,4.1730605179854485e-17,4.1841738615752897e-17,4.195287205165131e-17,4.2064005487549726e-17,4.217513892344814e-17,4.2286272359346555e-17,4.2397405795244967e-17,4.250853923114338e-17,4.2619672667041796e-17,4.273080610294021e-17,4.2841939538838625e-17,4.2953072974737037e-17,4.306420641063545e-17,4.3175339846533866e-17,4.328647328243228e-17,4.3397606718330695e-17,4.350874015422911e-17,4.3619873590127525e-17,4.3731007026025936e-17,4.384214046192435e-17,4.3953273897822766e-17,4.406440733372118e-17,4.4175540769619595e-17,4.4286674205518006e-17,4.439780764141642e-17,4.4508941077314836e-17,4.462007451321325e-17,4.4731207949111665e-17,4.4842341385010077e-17,4.495347482090849e-17,4.5064608256806906e-17,4.517574169270532e-17,4.5286875128603735e-17,4.5398008564502147e-17,4.550914200040056e-17,4.5620275436298976e-17,4.573140887219739e-17,4.5842542308095805e-17,4.5953675743994217e-17,4.606480917989263e-17,4.6175942615791046e-17,4.628707605168946e-17,4.6398209487587875e-17,4.650934292348629e-17,4.66204763593847e-17,4.6731609795283116e-17,4.684274323118153e-17,4.6953876667079946e-17,4.706501010297836e-17,4.7176143538876775e-17,4.7287276974775186e-17,4.73984104106736e-17,4.7509543846572016e-17,4.762067728247043e-17,4.7731810718368845e-17,4.7842944154267257e-17,4.795407759016567e-17,4.8065211026064086e-17,4.81763444619625e-17,4.8287477897860915e-17,4.8398611333759327e-17,4.850974476965774e-17,4.8620878205556156e-17,4.873201164145457e-17,4.8843145077352985e-17,4.8954278513251397e-17,4.906541194914981e-17,4.9176545385048226e-17,4.928767882094664e-17,4.9398812256845055e-17,4.950994569274347e-17,4.962107912864188e-17,4.9732212564540296e-17,4.984334600043871e-17,4.9954479436337126e-17,5.006561287223554e-17,5.017674630813395e-17,5.0287879744032366e-17,5.039901317993078e-17,5.0510146615829196e-17,5.062128005172761e-17,5.0732413487626025e-17,5.0843546923524437e-17,5.095468035942285e-17,5.1065813795321266e-17,5.117694723121968e-17,5.1288080667118095e-17,5.1399214103016507e-17,5.151034753891492e-17,5.1621480974813336e-17,5.173261441071175e-17,5.1843747846610165e-17,5.1954881282508577e-17,5.206601471840699e-17,5.2177148154305406e-17,5.228828159020382e-17,5.2399415026102235e-17,5.251054846200065e-17,5.262168189789906e-17,5.2732815333797476e-17,5.284394876969589e-17,5.2955082205594306e-17,5.306621564149272e-17,5.317734907739113e-17,5.3288482513289546e-17,5.339961594918796e-17,5.3510749385086376e-17,5.362188282098479e-17,5.37330162568832e-17,5.3844149692781617e-17,5.395528312868003e-17,5.4066416564578446e-17,5.417755000047686e-17,5.4288683436375275e-17,5.4399816872273687e-17,5.45109503081721e-17,5.4622083744070516e-17,5.473321717996893e-17,5.4844350615867345e-17,5.4955484051765757e-17,5.506661748766417e-17,5.5177750923562586e-17,5.5288884359461e-17,5.5400017795359415e-17,5.551115123125783e-17],"x":[-5.551115123125783e-17,-5.5400017795359415e-17,-5.5288884359461e-17,-5.5177750923562586e-17,-5.506661748766417e-17,-5.4955484051765757e-17,-5.4844350615867345e-17,-5.473321717996893e-17,-5.4622083744070516e-17,-5.45109503081721e-17,-5.4399816872273687e-17,-5.4288683436375275e-17,-5.417755000047686e-17,-5.4066416564578446e-17,-5.395528312868003e-17,-5.3844149692781617e-17,-5.37330162568832e-17,-5.362188282098479e-17,-5.3510749385086376e-17,-5.339961594918796e-17,-5.3288482513289546e-17,-5.317734907739113e-17,-5.306621564149272e-17,-5.2955082205594306e-17,-5.284394876969589e-17,-5.2732815333797476e-17,-5.262168189789906e-17,-5.251054846200065e-17,-5.2399415026102235e-17,-5.228828159020382e-17,-5.2177148154305406e-17,-5.206601471840699e-17,-5.1954881282508577e-17,-5.1843747846610165e-17,-5.173261441071175e-17,-5.1621480974813336e-17,-5.151034753891492e-17,-5.1399214103016507e-17,-5.1288080667118095e-17,-5.117694723121968e-17,-5.1065813795321266e-17,-5.095468035942285e-17,-5.0843546923524437e-17,-5.0732413487626025e-17,-5.062128005172761e-17,-5.0510146615829196e-17,-5.039901317993078e-17,-5.0287879744032366e-17,-5.017674630813395e-17,-5.006561287223554e-17,-4.9954479436337126e-17,-4.984334600043871e-17,-4.9732212564540296e-17,-4.962107912864188e-17,-4.950994569274347e-17,-4.9398812256845055e-17,-4.928767882094664e-17,-4.9176545385048226e-17,-4.906541194914981e-17,-4.8954278513251397e-17,-4.8843145077352985e-17,-4.873201164145457e-17,-4.8620878205556156e-17,-4.850974476965774e-17,-4.8398611333759327e-17,-4.8287477897860915e-17,-4.81763444619625e-17,-4.8065211026064086e-17,-4.795407759016567e-17,-4.7842944154267257e-17,-4.7731810718368845e-17,-4.762067728247043e-17,-4.7509543846572016e-17,-4.73984104106736e-17,-4.7287276974775186e-17,-4.7176143538876775e-17,-4.706501010297836e-17,-4.6953876667079946e-17,-4.684274323118153e-17,-4.6731609795283116e-17,-4.66204763593847e-17,-4.650934292348629e-17,-4.6398209487587875e-17,-4.628707605168946e-17,-4.6175942615791046e-17,-4.606480917989263e-17,-4.5953675743994217e-17,-4.5842542308095805e-17,-4.573140887219739e-17,-4.5620275436298976e-17,-4.550914200040056e-17,-4.5398008564502147e-17,-4.5286875128603735e-17,-4.517574169270532e-17,-4.5064608256806906e-17,-4.495347482090849e-17,-4.4842341385010077e-17,-4.4731207949111665e-17,-4.462007451321325e-17,-4.4508941077314836e-17,-4.439780764141642e-17,-4.4286674205518006e-17,-4.4175540769619595e-17,-4.406440733372118e-17,-4.3953273897822766e-17,-4.384214046192435e-17,-4.3731007026025936e-17,-4.3619873590127525e-17,-4.350874015422911e-17,-4.3397606718330695e-17,-4.328647328243228e-17,-4.3175339846533866e-17,-4.306420641063545e-17,-4.2953072974737037e-17,-4.2841939538838625e-17,-4.273080610294021e-17,-4.2619672667041796e-17,-4.250853923114338e-17,-4.2397405795244967e-17,-4.2286272359346555e-17,-4.217513892344814e-17,-4.2064005487549726e-17,-4.195287205165131e-17,-4.1841738615752897e-17,-4.1730605179854485e-17,-4.161947174395607e-17,-4.1508338308057656e-17,-4.139720487215924e-17,-4.1286071436260826e-17,-4.1174938000362415e-17,-4.1063804564464e-17,-4.0952671128565586e-17,-4.084153769266717e-17,-4.0730404256768756e-17,-4.0619270820870345e-17,-4.050813738497193e-17,-4.0397003949073515e-17,-4.02858705131751e-17,-4.0174737077276686e-17,-4.0063603641378275e-17,-3.9952470205479857e-17,-3.9841336769581445e-17,-3.973020333368303e-17,-3.9619069897784616e-17,-3.95079364618862e-17,-3.9396803025987787e-17,-3.9285669590089375e-17,-3.917453615419096e-17,-3.9063402718292546e-17,-3.895226928239413e-17,-3.8841135846495717e-17,-3.8730002410597305e-17,-3.861886897469889e-17,-3.8507735538800476e-17,-3.839660210290206e-17,-3.8285468667003646e-17,-3.8174335231105235e-17,-3.806320179520682e-17,-3.7952068359308406e-17,-3.784093492340999e-17,-3.7729801487511576e-17,-3.7618668051613165e-17,-3.750753461571475e-17,-3.7396401179816335e-17,-3.728526774391792e-17,-3.7174134308019506e-17,-3.7063000872121095e-17,-3.6951867436222677e-17,-3.6840734000324265e-17,-3.672960056442585e-17,-3.6618467128527436e-17,-3.6507333692629024e-17,-3.6396200256730607e-17,-3.6285066820832195e-17,-3.617393338493378e-17,-3.6062799949035366e-17,-3.595166651313695e-17,-3.5840533077238537e-17,-3.5729399641340125e-17,-3.561826620544171e-17,-3.5507132769543296e-17,-3.539599933364488e-17,-3.5284865897746466e-17,-3.5173732461848055e-17,-3.506259902594964e-17,-3.4951465590051226e-17,-3.484033215415281e-17,-3.4729198718254396e-17,-3.4618065282355985e-17,-3.450693184645757e-17,-3.4395798410559155e-17,-3.428466497466074e-17,-3.4173531538762326e-17,-3.4062398102863915e-17,-3.3951264666965497e-17,-3.3840131231067085e-17,-3.372899779516867e-17,-3.3617864359270256e-17,-3.3506730923371844e-17,-3.3395597487473427e-17,-3.3284464051575015e-17,-3.31733306156766e-17,-3.3062197179778186e-17,-3.295106374387977e-17,-3.2839930307981357e-17,-3.2728796872082945e-17,-3.261766343618453e-17,-3.2506530000286116e-17,-3.23953965643877e-17,-3.2284263128489286e-17,-3.2173129692590875e-17,-3.206199625669246e-17,-3.1950862820794046e-17,-3.183972938489563e-17,-3.1728595948997216e-17,-3.1617462513098805e-17,-3.150632907720039e-17,-3.1395195641301975e-17,-3.128406220540356e-17,-3.1172928769505146e-17,-3.1061795333606735e-17,-3.0950661897708317e-17,-3.0839528461809905e-17,-3.072839502591149e-17,-3.0617261590013076e-17,-3.0506128154114664e-17,-3.0394994718216247e-17,-3.0283861282317835e-17,-3.017272784641942e-17,-3.0061594410521006e-17,-2.9950460974622594e-17,-2.9839327538724177e-17,-2.9728194102825765e-17,-2.961706066692735e-17,-2.9505927231028936e-17,-2.939479379513052e-17,-2.9283660359232106e-17,-2.9172526923333695e-17,-2.906139348743528e-17,-2.8950260051536866e-17,-2.883912661563845e-17,-2.8727993179740036e-17,-2.8616859743841625e-17,-2.850572630794321e-17,-2.8394592872044795e-17,-2.828345943614638e-17,-2.8172326000247966e-17,-2.8061192564349555e-17,-2.7950059128451137e-17,-2.7838925692552725e-17,-2.772779225665431e-17,-2.7616658820755896e-17,-2.750552538485748e-17,-2.7394391948959067e-17,-2.7283258513060655e-17,-2.717212507716224e-17,-2.7060991641263826e-17,-2.694985820536541e-17,-2.6838724769466997e-17,-2.6727591333568582e-17,-2.661645789767017e-17,-2.6505324461771756e-17,-2.639419102587334e-17,-2.6283057589974926e-17,-2.6171924154076512e-17,-2.60607907181781e-17,-2.5949657282279686e-17,-2.583852384638127e-17,-2.5727390410482856e-17,-2.5616256974584442e-17,-2.550512353868603e-17,-2.5393990102787615e-17,-2.52828566668892e-17,-2.5171723230990786e-17,-2.506058979509237e-17,-2.4949456359193957e-17,-2.4838322923295545e-17,-2.472718948739713e-17,-2.4616056051498716e-17,-2.45049226156003e-17,-2.4393789179701887e-17,-2.4282655743803475e-17,-2.417152230790506e-17,-2.4060388872006646e-17,-2.394925543610823e-17,-2.3838122000209817e-17,-2.3726988564311405e-17,-2.361585512841299e-17,-2.3504721692514576e-17,-2.339358825661616e-17,-2.3282454820717746e-17,-2.3171321384819332e-17,-2.306018794892092e-17,-2.2949054513022506e-17,-2.283792107712409e-17,-2.2726787641225676e-17,-2.2615654205327262e-17,-2.250452076942885e-17,-2.2393387333530435e-17,-2.228225389763202e-17,-2.2171120461733606e-17,-2.205998702583519e-17,-2.194885358993678e-17,-2.1837720154038365e-17,-2.172658671813995e-17,-2.1615453282241536e-17,-2.150431984634312e-17,-2.1393186410444707e-17,-2.1282052974546295e-17,-2.117091953864788e-17,-2.1059786102749466e-17,-2.094865266685105e-17,-2.0837519230952637e-17,-2.0726385795054225e-17,-2.061525235915581e-17,-2.0504118923257396e-17,-2.039298548735898e-17,-2.0281852051460566e-17,-2.0170718615562155e-17,-2.005958517966374e-17,-1.9948451743765326e-17,-1.983731830786691e-17,-1.9726184871968496e-17,-1.9615051436070082e-17,-1.950391800017167e-17,-1.9392784564273255e-17,-1.928165112837484e-17,-1.9170517692476426e-17,-1.905938425657801e-17,-1.89482508206796e-17,-1.8837117384781185e-17,-1.872598394888277e-17,-1.8614850512984356e-17,-1.850371707708594e-17,-1.839258364118753e-17,-1.8281450205289115e-17,-1.81703167693907e-17,-1.8059183333492286e-17,-1.794804989759387e-17,-1.7836916461695457e-17,-1.7725783025797045e-17,-1.761464958989863e-17,-1.7503516154000216e-17,-1.73923827181018e-17,-1.7281249282203386e-17,-1.7170115846304975e-17,-1.705898241040656e-17,-1.6947848974508146e-17,-1.683671553860973e-17,-1.6725582102711316e-17,-1.6614448666812905e-17,-1.650331523091449e-17,-1.6392181795016075e-17,-1.628104835911766e-17,-1.6169914923219246e-17,-1.605878148732083e-17,-1.594764805142242e-17,-1.5836514615524005e-17,-1.572538117962559e-17,-1.5614247743727176e-17,-1.550311430782876e-17,-1.539198087193035e-17,-1.5280847436031935e-17,-1.516971400013352e-17,-1.5058580564235106e-17,-1.494744712833669e-17,-1.483631369243828e-17,-1.4725180256539865e-17,-1.461404682064145e-17,-1.4502913384743036e-17,-1.439177994884462e-17,-1.4280646512946206e-17,-1.4169513077047795e-17,-1.405837964114938e-17,-1.3947246205250966e-17,-1.3836112769352551e-17,-1.3724979333454138e-17,-1.3613845897555723e-17,-1.350271246165731e-17,-1.3391579025758895e-17,-1.328044558986048e-17,-1.3169312153962068e-17,-1.3058178718063653e-17,-1.2947045282165238e-17,-1.2835911846266825e-17,-1.272477841036841e-17,-1.2613644974469997e-17,-1.2502511538571583e-17,-1.2391378102673168e-17,-1.2280244666774755e-17,-1.216911123087634e-17,-1.2057977794977926e-17,-1.1946844359079513e-17,-1.1835710923181098e-17,-1.1724577487282685e-17,-1.161344405138427e-17,-1.1502310615485856e-17,-1.1391177179587443e-17,-1.1280043743689028e-17,-1.1168910307790613e-17,-1.10577768718922e-17,-1.0946643435993786e-17,-1.0835510000095371e-17,-1.0724376564196958e-17,-1.0613243128298543e-17,-1.050210969240013e-17,-1.0390976256501715e-17,-1.02798428206033e-17,-1.0168709384704888e-17,-1.0057575948806473e-17,-9.946442512908058e-18,-9.835309077009645e-18,-9.72417564111123e-18,-9.613042205212817e-18,-9.501908769314403e-18,-9.390775333415988e-18,-9.279641897517575e-18,-9.16850846161916e-18,-9.057375025720746e-18,-8.946241589822333e-18,-8.835108153923918e-18,-8.723974718025505e-18,-8.61284128212709e-18,-8.501707846228676e-18,-8.390574410330263e-18,-8.279440974431848e-18,-8.168307538533433e-18,-8.05717410263502e-18,-7.946040666736606e-18,-7.834907230838192e-18,-7.723773794939778e-18,-7.612640359041363e-18,-7.50150692314295e-18,-7.390373487244535e-18,-7.27924005134612e-18,-7.168106615447708e-18,-7.056973179549293e-18,-6.94583974365088e-18,-6.834706307752465e-18,-6.723572871854051e-18,-6.612439435955637e-18,-6.501306000057223e-18,-6.390172564158809e-18,-6.279039128260395e-18,-6.1679056923619804e-18,-6.0567722564635666e-18,-5.945638820565153e-18,-5.834505384666739e-18,-5.723371948768324e-18,-5.61223851286991e-18,-5.5011050769714964e-18,-5.3899716410730825e-18,-5.278838205174668e-18,-5.167704769276254e-18,-5.05657133337784e-18,-4.945437897479426e-18,-4.834304461581012e-18,-4.723171025682598e-18,-4.612037589784184e-18,-4.50090415388577e-18,-4.389770717987355e-18,-4.2786372820889415e-18,-4.1675038461905276e-18,-4.056370410292114e-18,-3.945236974393699e-18,-3.834103538495285e-18,-3.722970102596871e-18,-3.6118366666984575e-18,-3.500703230800043e-18,-3.389569794901629e-18,-3.278436359003215e-18,-3.167302923104801e-18,-3.056169487206387e-18,-2.9450360513079727e-18,-2.833902615409559e-18,-2.7227691795111445e-18,-2.6116357436127307e-18,-2.5005023077143164e-18,-2.3893688718159025e-18,-2.2782354359174883e-18,-2.1671020000190744e-18,-2.05596856412066e-18,-1.9448351282222463e-18,-1.833701692323832e-18,-1.7225682564254181e-18,-1.611434820527004e-18,-1.50030138462859e-18,-1.389167948730176e-18,-1.2780345128317619e-18,-1.1669010769333478e-18,-1.0557676410349337e-18,-9.446342051365197e-19,-8.335007692381055e-19,-7.223673333396914e-19,-6.112338974412774e-19,-5.001004615428633e-19,-3.8896702564444924e-19,-2.7783358974603517e-19,-1.667001538476211e-19,-5.556671794920703e-20,5.556671794920703e-20,1.667001538476211e-19,2.7783358974603517e-19,3.8896702564444924e-19,5.001004615428633e-19,6.112338974412774e-19,7.223673333396914e-19,8.335007692381055e-19,9.446342051365197e-19,1.0557676410349337e-18,1.1669010769333478e-18,1.2780345128317619e-18,1.389167948730176e-18,1.50030138462859e-18,1.611434820527004e-18,1.7225682564254181e-18,1.833701692323832e-18,1.9448351282222463e-18,2.05596856412066e-18,2.1671020000190744e-18,2.2782354359174883e-18,2.3893688718159025e-18,2.5005023077143164e-18,2.6116357436127307e-18,2.7227691795111445e-18,2.833902615409559e-18,2.9450360513079727e-18,3.056169487206387e-18,3.167302923104801e-18,3.278436359003215e-18,3.389569794901629e-18,3.500703230800043e-18,3.6118366666984575e-18,3.722970102596871e-18,3.834103538495285e-18,3.945236974393699e-18,4.056370410292114e-18,4.1675038461905276e-18,4.2786372820889415e-18,4.389770717987355e-18,4.50090415388577e-18,4.612037589784184e-18,4.723171025682598e-18,4.834304461581012e-18,4.945437897479426e-18,5.05657133337784e-18,5.167704769276254e-18,5.278838205174668e-18,5.3899716410730825e-18,5.5011050769714964e-18,5.61223851286991e-18,5.723371948768324e-18,5.834505384666739e-18,5.945638820565153e-18,6.0567722564635666e-18,6.1679056923619804e-18,6.279039128260395e-18,6.390172564158809e-18,6.501306000057223e-18,6.612439435955637e-18,6.723572871854051e-18,6.834706307752465e-18,6.94583974365088e-18,7.056973179549293e-18,7.168106615447708e-18,7.27924005134612e-18,7.390373487244535e-18,7.50150692314295e-18,7.612640359041363e-18,7.723773794939778e-18,7.834907230838192e-18,7.946040666736606e-18,8.05717410263502e-18,8.168307538533433e-18,8.279440974431848e-18,8.390574410330263e-18,8.501707846228676e-18,8.61284128212709e-18,8.723974718025505e-18,8.835108153923918e-18,8.946241589822333e-18,9.057375025720746e-18,9.16850846161916e-18,9.279641897517575e-18,9.390775333415988e-18,9.501908769314403e-18,9.613042205212817e-18,9.72417564111123e-18,9.835309077009645e-18,9.946442512908058e-18,1.0057575948806473e-17,1.0168709384704888e-17,1.02798428206033e-17,1.0390976256501715e-17,1.050210969240013e-17,1.0613243128298543e-17,1.0724376564196958e-17,1.0835510000095371e-17,1.0946643435993786e-17,1.10577768718922e-17,1.1168910307790613e-17,1.1280043743689028e-17,1.1391177179587443e-17,1.1502310615485856e-17,1.161344405138427e-17,1.1724577487282685e-17,1.1835710923181098e-17,1.1946844359079513e-17,1.2057977794977926e-17,1.216911123087634e-17,1.2280244666774755e-17,1.2391378102673168e-17,1.2502511538571583e-17,1.2613644974469997e-17,1.272477841036841e-17,1.2835911846266825e-17,1.2947045282165238e-17,1.3058178718063653e-17,1.3169312153962068e-17,1.328044558986048e-17,1.3391579025758895e-17,1.350271246165731e-17,1.3613845897555723e-17,1.3724979333454138e-17,1.3836112769352551e-17,1.3947246205250966e-17,1.405837964114938e-17,1.4169513077047795e-17,1.4280646512946206e-17,1.439177994884462e-17,1.4502913384743036e-17,1.461404682064145e-17,1.4725180256539865e-17,1.483631369243828e-17,1.494744712833669e-17,1.5058580564235106e-17,1.516971400013352e-17,1.5280847436031935e-17,1.539198087193035e-17,1.550311430782876e-17,1.5614247743727176e-17,1.572538117962559e-17,1.5836514615524005e-17,1.594764805142242e-17,1.605878148732083e-17,1.6169914923219246e-17,1.628104835911766e-17,1.6392181795016075e-17,1.650331523091449e-17,1.6614448666812905e-17,1.6725582102711316e-17,1.683671553860973e-17,1.6947848974508146e-17,1.705898241040656e-17,1.7170115846304975e-17,1.7281249282203386e-17,1.73923827181018e-17,1.7503516154000216e-17,1.761464958989863e-17,1.7725783025797045e-17,1.7836916461695457e-17,1.794804989759387e-17,1.8059183333492286e-17,1.81703167693907e-17,1.8281450205289115e-17,1.839258364118753e-17,1.850371707708594e-17,1.8614850512984356e-17,1.872598394888277e-17,1.8837117384781185e-17,1.89482508206796e-17,1.905938425657801e-17,1.9170517692476426e-17,1.928165112837484e-17,1.9392784564273255e-17,1.950391800017167e-17,1.9615051436070082e-17,1.9726184871968496e-17,1.983731830786691e-17,1.9948451743765326e-17,2.005958517966374e-17,2.0170718615562155e-17,2.0281852051460566e-17,2.039298548735898e-17,2.0504118923257396e-17,2.061525235915581e-17,2.0726385795054225e-17,2.0837519230952637e-17,2.094865266685105e-17,2.1059786102749466e-17,2.117091953864788e-17,2.1282052974546295e-17,2.1393186410444707e-17,2.150431984634312e-17,2.1615453282241536e-17,2.172658671813995e-17,2.1837720154038365e-17,2.194885358993678e-17,2.205998702583519e-17,2.2171120461733606e-17,2.228225389763202e-17,2.2393387333530435e-17,2.250452076942885e-17,2.2615654205327262e-17,2.2726787641225676e-17,2.283792107712409e-17,2.2949054513022506e-17,2.306018794892092e-17,2.3171321384819332e-17,2.3282454820717746e-17,2.339358825661616e-17,2.3504721692514576e-17,2.361585512841299e-17,2.3726988564311405e-17,2.3838122000209817e-17,2.394925543610823e-17,2.4060388872006646e-17,2.417152230790506e-17,2.4282655743803475e-17,2.4393789179701887e-17,2.45049226156003e-17,2.4616056051498716e-17,2.472718948739713e-17,2.4838322923295545e-17,2.4949456359193957e-17,2.506058979509237e-17,2.5171723230990786e-17,2.52828566668892e-17,2.5393990102787615e-17,2.550512353868603e-17,2.5616256974584442e-17,2.5727390410482856e-17,2.583852384638127e-17,2.5949657282279686e-17,2.60607907181781e-17,2.6171924154076512e-17,2.6283057589974926e-17,2.639419102587334e-17,2.6505324461771756e-17,2.661645789767017e-17,2.6727591333568582e-17,2.6838724769466997e-17,2.694985820536541e-17,2.7060991641263826e-17,2.717212507716224e-17,2.7283258513060655e-17,2.7394391948959067e-17,2.750552538485748e-17,2.7616658820755896e-17,2.772779225665431e-17,2.7838925692552725e-17,2.7950059128451137e-17,2.8061192564349555e-17,2.8172326000247966e-17,2.828345943614638e-17,2.8394592872044795e-17,2.850572630794321e-17,2.8616859743841625e-17,2.8727993179740036e-17,2.883912661563845e-17,2.8950260051536866e-17,2.906139348743528e-17,2.9172526923333695e-17,2.9283660359232106e-17,2.939479379513052e-17,2.9505927231028936e-17,2.961706066692735e-17,2.9728194102825765e-17,2.9839327538724177e-17,2.9950460974622594e-17,3.0061594410521006e-17,3.017272784641942e-17,3.0283861282317835e-17,3.0394994718216247e-17,3.0506128154114664e-17,3.0617261590013076e-17,3.072839502591149e-17,3.0839528461809905e-17,3.0950661897708317e-17,3.1061795333606735e-17,3.1172928769505146e-17,3.128406220540356e-17,3.1395195641301975e-17,3.150632907720039e-17,3.1617462513098805e-17,3.1728595948997216e-17,3.183972938489563e-17,3.1950862820794046e-17,3.206199625669246e-17,3.2173129692590875e-17,3.2284263128489286e-17,3.23953965643877e-17,3.2506530000286116e-17,3.261766343618453e-17,3.2728796872082945e-17,3.2839930307981357e-17,3.295106374387977e-17,3.3062197179778186e-17,3.31733306156766e-17,3.3284464051575015e-17,3.3395597487473427e-17,3.3506730923371844e-17,3.3617864359270256e-17,3.372899779516867e-17,3.3840131231067085e-17,3.3951264666965497e-17,3.4062398102863915e-17,3.4173531538762326e-17,3.428466497466074e-17,3.4395798410559155e-17,3.450693184645757e-17,3.4618065282355985e-17,3.4729198718254396e-17,3.484033215415281e-17,3.4951465590051226e-17,3.506259902594964e-17,3.5173732461848055e-17,3.5284865897746466e-17,3.539599933364488e-17,3.5507132769543296e-17,3.561826620544171e-17,3.5729399641340125e-17,3.5840533077238537e-17,3.595166651313695e-17,3.6062799949035366e-17,3.617393338493378e-17,3.6285066820832195e-17,3.6396200256730607e-17,3.6507333692629024e-17,3.6618467128527436e-17,3.672960056442585e-17,3.6840734000324265e-17,3.6951867436222677e-17,3.7063000872121095e-17,3.7174134308019506e-17,3.728526774391792e-17,3.7396401179816335e-17,3.750753461571475e-17,3.7618668051613165e-17,3.7729801487511576e-17,3.784093492340999e-17,3.7952068359308406e-17,3.806320179520682e-17,3.8174335231105235e-17,3.8285468667003646e-17,3.839660210290206e-17,3.8507735538800476e-17,3.861886897469889e-17,3.8730002410597305e-17,3.8841135846495717e-17,3.895226928239413e-17,3.9063402718292546e-17,3.917453615419096e-17,3.9285669590089375e-17,3.9396803025987787e-17,3.95079364618862e-17,3.9619069897784616e-17,3.973020333368303e-17,3.9841336769581445e-17,3.9952470205479857e-17,4.0063603641378275e-17,4.0174737077276686e-17,4.02858705131751e-17,4.0397003949073515e-17,4.050813738497193e-17,4.0619270820870345e-17,4.0730404256768756e-17,4.084153769266717e-17,4.0952671128565586e-17,4.1063804564464e-17,4.1174938000362415e-17,4.1286071436260826e-17,4.139720487215924e-17,4.1508338308057656e-17,4.161947174395607e-17,4.1730605179854485e-17,4.1841738615752897e-17,4.195287205165131e-17,4.2064005487549726e-17,4.217513892344814e-17,4.2286272359346555e-17,4.2397405795244967e-17,4.250853923114338e-17,4.2619672667041796e-17,4.273080610294021e-17,4.2841939538838625e-17,4.2953072974737037e-17,4.306420641063545e-17,4.3175339846533866e-17,4.328647328243228e-17,4.3397606718330695e-17,4.350874015422911e-17,4.3619873590127525e-17,4.3731007026025936e-17,4.384214046192435e-17,4.3953273897822766e-17,4.406440733372118e-17,4.4175540769619595e-17,4.4286674205518006e-17,4.439780764141642e-17,4.4508941077314836e-17,4.462007451321325e-17,4.4731207949111665e-17,4.4842341385010077e-17,4.495347482090849e-17,4.5064608256806906e-17,4.517574169270532e-17,4.5286875128603735e-17,4.5398008564502147e-17,4.550914200040056e-17,4.5620275436298976e-17,4.573140887219739e-17,4.5842542308095805e-17,4.5953675743994217e-17,4.606480917989263e-17,4.6175942615791046e-17,4.628707605168946e-17,4.6398209487587875e-17,4.650934292348629e-17,4.66204763593847e-17,4.6731609795283116e-17,4.684274323118153e-17,4.6953876667079946e-17,4.706501010297836e-17,4.7176143538876775e-17,4.7287276974775186e-17,4.73984104106736e-17,4.7509543846572016e-17,4.762067728247043e-17,4.7731810718368845e-17,4.7842944154267257e-17,4.795407759016567e-17,4.8065211026064086e-17,4.81763444619625e-17,4.8287477897860915e-17,4.8398611333759327e-17,4.850974476965774e-17,4.8620878205556156e-17,4.873201164145457e-17,4.8843145077352985e-17,4.8954278513251397e-17,4.906541194914981e-17,4.9176545385048226e-17,4.928767882094664e-17,4.9398812256845055e-17,4.950994569274347e-17,4.962107912864188e-17,4.9732212564540296e-17,4.984334600043871e-17,4.9954479436337126e-17,5.006561287223554e-17,5.017674630813395e-17,5.0287879744032366e-17,5.039901317993078e-17,5.0510146615829196e-17,5.062128005172761e-17,5.0732413487626025e-17,5.0843546923524437e-17,5.095468035942285e-17,5.1065813795321266e-17,5.117694723121968e-17,5.1288080667118095e-17,5.1399214103016507e-17,5.151034753891492e-17,5.1621480974813336e-17,5.173261441071175e-17,5.1843747846610165e-17,5.1954881282508577e-17,5.206601471840699e-17,5.2177148154305406e-17,5.228828159020382e-17,5.2399415026102235e-17,5.251054846200065e-17,5.262168189789906e-17,5.2732815333797476e-17,5.284394876969589e-17,5.2955082205594306e-17,5.306621564149272e-17,5.317734907739113e-17,5.3288482513289546e-17,5.339961594918796e-17,5.3510749385086376e-17,5.362188282098479e-17,5.37330162568832e-17,5.3844149692781617e-17,5.395528312868003e-17,5.4066416564578446e-17,5.417755000047686e-17,5.4288683436375275e-17,5.4399816872273687e-17,5.45109503081721e-17,5.4622083744070516e-17,5.473321717996893e-17,5.4844350615867345e-17,5.4955484051765757e-17,5.506661748766417e-17,5.5177750923562586e-17,5.5288884359461e-17,5.5400017795359415e-17,5.551115123125783e-17]}
},{}],44:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var incrspace = require( '@stdlib/math/utils/incrspace' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var expm1 = require( './../lib' );


// FIXTURES //

var cppMediumPositive = require( './fixtures/cpp/medium_positive.json' );
var cppMediumNegative = require( './fixtures/cpp/medium_negative.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var tiny = require( './fixtures/julia/tiny.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof expm1, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function agrees with `exp(x) - 1` for most `x`', function test( t ) {
	var expected;
	var delta;
	var val;
	var tol;
	var x;
	var y;
	var i;
	x = incrspace( -10.0, 50.0, 0.5 );
	for ( i = 0; i < x.length; i++ ) {
		val = x[ i ];
		y = expm1( val );
		expected = exp( val ) - 1.0;
		delta = abs( y - expected );
		tol = 1e-12 * abs( expected );
		t.ok( delta <= tol, 'within tolerance. x: '+x+'. y: '+y+'. Δ: '+delta+'. E: '+ expected+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative medium numbers (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = cppMediumNegative.x;
	expected = cppMediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive medium numbers (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = cppMediumPositive.x;
	expected = cppMediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for very small `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function returns `+infinity` for very large `x`', function test( t ) {
	t.equal( expm1( 800.0 ), PINF, 'equals +infinity' );
	t.equal( expm1( 900.0 ), PINF, 'equals +infinity' );
	t.equal( expm1( 1000.0 ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `-1` for negative large `x`', function test( t ) {
	t.equal( expm1( -800.0 ), -1.0, 'equals -1' );
	t.equal( expm1( -900.0 ), -1.0, 'equals -1' );
	t.equal( expm1( -1000.0 ), -1.0, 'equals -1' );
	t.end();
});

tape( 'the function returns `x` for `x` smaller than `2**-54`', function test( t ) {
	var val = pow( 2.0, -80 );
	t.equal( expm1( val ), val, 'equals input value' );
	val = pow( 2.0, -55 );
	t.equal( expm1( val ), val, 'equals input value' );
	val = pow( 2.0, -60 );
	t.equal( expm1( val ), val, 'equals input value' );
	t.end();
});

tape( 'the function returns `-1` if provided `-infinity`', function test( t ) {
	t.equal( expm1( NINF ), -1.0, 'equals -1' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	t.equal( expm1( PINF ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `0` if provided `0`', function test( t ) {
	var v = expm1( 0.0 );
	t.equal( isPositiveZero( v ), true, 'equals 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0` (IEEE 754-2008)', function test( t ) {
	var v = expm1( -0.0 );
	t.equal( isNegativeZero( v ), true, 'equals -0' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var val = expm1( NaN );
	t.equal( isnan( val ), true, 'equals NaN' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/expm1/test/test.js")
},{"./../lib":36,"./fixtures/cpp/medium_negative.json":37,"./fixtures/cpp/medium_positive.json":38,"./fixtures/julia/medium_negative.json":39,"./fixtures/julia/medium_positive.json":40,"./fixtures/julia/small_negative.json":41,"./fixtures/julia/small_positive.json":42,"./fixtures/julia/tiny.json":43,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/assert/is-negative-zero":20,"@stdlib/math/base/assert/is-positive-zero":24,"@stdlib/math/base/special/abs":27,"@stdlib/math/base/special/exp":34,"@stdlib/math/base/special/pow":49,"@stdlib/math/constants/float64-eps":87,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":96,"@stdlib/math/utils/incrspace":100,"tape":166}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"./floor.js":45}],47:[function(require,module,exports){
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

},{"./ldexp.js":48}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":14,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/copysign":31,"@stdlib/math/base/utils/float64-exponent":64,"@stdlib/math/base/utils/float64-from-words":66,"@stdlib/math/base/utils/float64-normalize":74,"@stdlib/math/base/utils/float64-to-words":82,"@stdlib/math/constants/float64-exponent-bias":88,"@stdlib/math/constants/float64-max-base2-exponent":93,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":92,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":94,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":96}],49:[function(require,module,exports){
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

},{"./pow.js":52}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":62,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-set-high-word":77,"@stdlib/math/base/utils/float64-set-low-word":79,"@stdlib/math/constants/float64-exponent-bias":88}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":62,"@stdlib/math/base/utils/float64-set-low-word":79}],52:[function(require,module,exports){
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

},{"./log2ax.js":50,"./logx.js":51,"./pow2.js":53,"./x_is_zero.js":54,"./y_is_huge.js":55,"./y_is_infinite.js":56,"@stdlib/math/base/assert/is-infinite":14,"@stdlib/math/base/assert/is-integer":16,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/assert/is-odd":22,"@stdlib/math/base/special/abs":27,"@stdlib/math/base/special/sqrt":57,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-get-low-word":72,"@stdlib/math/base/utils/float64-set-low-word":79,"@stdlib/math/base/utils/float64-to-words":82,"@stdlib/math/base/utils/uint32-to-int32":85,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":96}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":47,"@stdlib/math/base/tools/evalpoly":62,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-set-high-word":77,"@stdlib/math/base/utils/float64-set-low-word":79,"@stdlib/math/base/utils/uint32-to-int32":85,"@stdlib/math/constants/float64-exponent-bias":88,"@stdlib/math/constants/float64-ln-two":91}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":22,"@stdlib/math/base/special/copysign":31,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":96}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":70}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":27,"@stdlib/math/constants/float64-pinf":96}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"./trunc.js":59}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":29,"@stdlib/math/base/special/floor":46}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{"./evalpoly.js":60}],62:[function(require,module,exports){
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

},{"./evalpoly.js":60,"./factory.js":61,"@stdlib/utils/define-read-only-property":102}],63:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/constants/float64-exponent-bias":88,"@stdlib/math/constants/float64-high-word-exponent-mask":90}],64:[function(require,module,exports){
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

},{"./exponent.js":63}],65:[function(require,module,exports){
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

},{"./indices.js":67}],66:[function(require,module,exports){
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

},{"./from_words.js":65}],67:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],68:[function(require,module,exports){
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

},{"./high.js":69}],69:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],70:[function(require,module,exports){
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

},{"./get_high_word.js":68}],71:[function(require,module,exports){
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

},{"./low.js":73}],72:[function(require,module,exports){
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

},{"./get_low_word.js":71}],73:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],74:[function(require,module,exports){
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

},{"./normalize.js":75}],75:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":14,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/abs":27,"@stdlib/math/constants/float64-smallest-normal":97}],76:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":69}],77:[function(require,module,exports){
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

},{"./set_high_word.js":78}],78:[function(require,module,exports){
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

},{"./high.js":76}],79:[function(require,module,exports){
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

},{"./set_low_word.js":81}],80:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":73}],81:[function(require,module,exports){
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

},{"./low.js":80}],82:[function(require,module,exports){
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

},{"./to_words.js":84}],83:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":67}],84:[function(require,module,exports){
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

},{"./indices.js":83}],85:[function(require,module,exports){
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

},{"./uint32_to_int32.js":86}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/math/constants/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/math/constants/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* The maximum unsigned 32-bit integer is given by
*
* ``` tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

},{}],99:[function(require,module,exports){
'use strict';

// MODULES //

var ceil = require( '@stdlib/math/base/special/ceil' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Generates a linearly spaced numeric array using a provided increment.
*
* @param {number} x1 - first array value
* @param {number} x2 - array element bound
* @param {number} [increment=1] - increment
* @throws {TypeError} first argument must be numeric
* @throws {TypeError} second argument must be numeric
* @throws {TypeError} third argument must be numeric
* @throws {RangeError} length of created array must be less than `4294967295` (`2**32 - 1`)
* @returns {Array} linearly spaced numeric array
*
* @example
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
*/
function incrspace( x1, x2, increment ) {
	var arr;
	var len;
	var inc;
	var i;
	if ( !isNumber( x1 ) || isnan( x1 ) ) {
		throw new TypeError( 'invalid input argument. Start must be numeric. Value: `' + x1 + '`.' );
	}
	if ( !isNumber( x2 ) || isnan( x2 ) ) {
		throw new TypeError( 'invalid input argument. Stop must be numeric. Value: `' + x2 + '`.' );
	}
	if ( arguments.length < 3 ) {
		inc = 1;
	} else {
		inc = increment;
		if ( !isNumber( inc ) || isnan( inc ) ) {
			throw new TypeError( 'invalid input argument. Increment must be numeric. Value: `' + inc + '`.' );
		}
	}
	len = ceil( ( x2-x1 ) / inc );

	if ( len > MAX_LENGTH ) {
		throw new RangeError( 'invalid input arguments. Generated array exceeds maximum array length.' );
	}
	if ( len <= 1 ) {
		return [ x1 ];
	}
	if ( len > 64000 ) {
		// Ensure fast elements...
		arr = [];
		arr.push( x1 );
		for ( i = 1; i < len; i++ ) {
			arr.push( x1 + (inc*i) );
		}
	} else {
		arr = new Array( len );
		arr[ 0 ] = x1;
		for ( i = 1; i < len; i++ ) {
			arr[ i ] = x1 + (inc*i);
		}
	}
	return arr;
} // end FUNCTION incrspace()


// EXPORTS //

module.exports = incrspace;

},{"@stdlib/assert/is-number":7,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/ceil":29,"@stdlib/math/constants/uint32-max":98}],100:[function(require,module,exports){
'use strict';

/**
* Generate a linearly spaced numeric array using a provided increment.
*
* @module @stdlib/math/utils/incrspace
*
* @example
* var incrspace = require( '@stdlib/math/utils/incrspace' );
*
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
*/

// MODULES //

var incrspace = require( './incrspace.js' );


// EXPORTS //

module.exports = incrspace;

},{"./incrspace.js":99}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{"./define_read_only_property.js":101}],103:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
} // end FUNCTION hasSymbolSupport()


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],104:[function(require,module,exports){
'use strict';

/**
* Tests for native `Symbol` support.
*
* @module @stdlib/utils/detect-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/utils/detect-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './detect_symbol_support.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./detect_symbol_support.js":103}],105:[function(require,module,exports){
'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/utils/detect-symbol-support' )();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( hasSymbols && typeof Symbol.toStringTag === 'symbol' );
} // end FUNCTION hasToStringTagSupport()


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":104}],106:[function(require,module,exports){
'use strict';

/**
* Tests for native `toStringTag` support.
*
* @module @stdlib/utils/detect-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/utils/detect-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './has_tostringtag_support.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./has_tostringtag_support.js":105}],107:[function(require,module,exports){
'use strict';

/**
* Returns a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();


// MAIN //

var nativeClass;
if ( hasToStringTag ) {
	nativeClass = require( './polyfill.js' );
} else {
	nativeClass = require( './native_class.js' );
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":108,"./polyfill.js":109,"@stdlib/utils/detect-tostringtag-support":106}],108:[function(require,module,exports){
'use strict';

// MODULES //

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":110}],109:[function(require,module,exports){
'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":110,"./tostringtag.js":111,"@stdlib/assert/has-own-property":2}],110:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],111:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){

},{}],114:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"dup":113}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{"base64-js":112,"ieee754":135}],117:[function(require,module,exports){
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
},{"../../is-buffer/index.js":137}],118:[function(require,module,exports){
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

},{"./lib/is_arguments.js":119,"./lib/keys.js":120}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],121:[function(require,module,exports){
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

},{"foreach":131,"object-keys":140}],122:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],123:[function(require,module,exports){
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

},{"./helpers/isFinite":124,"./helpers/isNaN":125,"./helpers/mod":126,"./helpers/sign":127,"es-to-primitive/es5":128,"has":134,"is-callable":138}],124:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],125:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],126:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],127:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],128:[function(require,module,exports){
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

},{"./helpers/isPrimitive":129,"is-callable":138}],129:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){

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


},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":132}],134:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":133}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"./isArguments":141}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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
},{"_process":115}],143:[function(require,module,exports){
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
},{"_process":115}],144:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":145}],145:[function(require,module,exports){
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
},{"./_stream_readable":147,"./_stream_writable":149,"core-util-is":117,"inherits":136,"process-nextick-args":143}],146:[function(require,module,exports){
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
},{"./_stream_transform":148,"core-util-is":117,"inherits":136}],147:[function(require,module,exports){
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
},{"./_stream_duplex":145,"./internal/streams/BufferList":150,"./internal/streams/destroy":151,"./internal/streams/stream":152,"_process":115,"core-util-is":117,"events":130,"inherits":136,"isarray":153,"process-nextick-args":143,"safe-buffer":160,"string_decoder/":154,"util":113}],148:[function(require,module,exports){
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
},{"./_stream_duplex":145,"core-util-is":117,"inherits":136}],149:[function(require,module,exports){
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
},{"./_stream_duplex":145,"./internal/streams/destroy":151,"./internal/streams/stream":152,"_process":115,"core-util-is":117,"inherits":136,"process-nextick-args":143,"safe-buffer":160,"util-deprecate":172}],150:[function(require,module,exports){
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
},{"safe-buffer":160}],151:[function(require,module,exports){
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
},{"process-nextick-args":143}],152:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":130}],153:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],154:[function(require,module,exports){
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
},{"safe-buffer":160}],155:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":156}],156:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":145,"./lib/_stream_passthrough.js":146,"./lib/_stream_readable.js":147,"./lib/_stream_transform.js":148,"./lib/_stream_writable.js":149}],157:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":156}],158:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":149}],159:[function(require,module,exports){
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
},{"_process":115,"through":171}],160:[function(require,module,exports){
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

},{"buffer":116}],161:[function(require,module,exports){
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

},{"events":130,"inherits":136,"readable-stream/duplex.js":144,"readable-stream/passthrough.js":155,"readable-stream/readable.js":156,"readable-stream/transform.js":157,"readable-stream/writable.js":158}],162:[function(require,module,exports){
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

},{"es-abstract/es5":123,"function-bind":133}],163:[function(require,module,exports){
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

},{"./implementation":162,"./polyfill":164,"./shim":165,"define-properties":121,"function-bind":133}],164:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":162}],165:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":164,"define-properties":121}],166:[function(require,module,exports){
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
},{"./lib/default_stream":167,"./lib/results":169,"./lib/test":170,"_process":115,"defined":122,"through":171}],167:[function(require,module,exports){
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
},{"_process":115,"fs":114,"through":171}],168:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":115}],169:[function(require,module,exports){
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
},{"_process":115,"events":130,"function-bind":133,"has":134,"inherits":136,"object-inspect":139,"resumer":159,"through":171}],170:[function(require,module,exports){
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
},{"./next_tick":168,"deep-equal":118,"defined":122,"events":130,"has":134,"inherits":136,"path":142,"string.prototype.trim":163}],171:[function(require,module,exports){
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
},{"_process":115,"stream":161}],172:[function(require,module,exports){
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
},{}]},{},[44]);
