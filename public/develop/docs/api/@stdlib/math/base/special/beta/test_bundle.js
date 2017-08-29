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
* Tests if a value is `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( null );
* // returns false
*/
function isnan( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"./object.js":8,"./primitive.js":9}],7:[function(require,module,exports){
'use strict';

/**
* Test if a value is `NaN`.
*
* @module @stdlib/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*
* @example
* // Use interface to check for `NaN` primitives...
* var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns false
*
* @example
* // Use interface to check for `NaN` objects...
* var isnan = require( '@stdlib/assert/is-nan' ).isObject;
*
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isnan = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isnan, 'isPrimitive', isPrimitive );
setReadOnly( isnan, 'isObject', isObject );


// EXPORTS //

module.exports = isnan;

},{"./generic.js":6,"./object.js":8,"./primitive.js":9,"@stdlib/utils/define-read-only-property":101}],8:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a number object having a value of `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value of `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value.valueOf() )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":11,"@stdlib/math/base/assert/is-nan":22}],9:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a `NaN` number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `NaN` number primitive
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns false
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":11,"@stdlib/math/base/assert/is-nan":22}],10:[function(require,module,exports){
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

},{"./object.js":12,"./primitive.js":13}],11:[function(require,module,exports){
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

},{"./generic.js":10,"./object.js":12,"./primitive.js":13,"@stdlib/utils/define-read-only-property":101}],12:[function(require,module,exports){
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

},{"./try2serialize.js":15,"@stdlib/utils/detect-tostringtag-support":105,"@stdlib/utils/native-class":106}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],15:[function(require,module,exports){
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

},{"./tostring.js":14}],16:[function(require,module,exports){
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

},{"./is_even.js":17}],17:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":20}],18:[function(require,module,exports){
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

},{"./is_infinite.js":19}],19:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":97,"@stdlib/math/constants/float64-pinf":98}],20:[function(require,module,exports){
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

},{"./is_integer.js":21}],21:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":43}],22:[function(require,module,exports){
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

},{"./is_nan.js":23}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./is_odd.js":25}],25:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":16}],26:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":22,"@stdlib/math/base/special/abs":27,"@stdlib/math/base/special/exp":41,"@stdlib/math/base/special/log1p":46,"@stdlib/math/base/special/pow":48,"@stdlib/math/base/special/sqrt":56,"@stdlib/math/base/tools/evalrational":64,"@stdlib/math/constants/float64-e":89,"@stdlib/math/constants/float64-eps":90}],29:[function(require,module,exports){
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

},{"./beta.js":28}],30:[function(require,module,exports){
module.exports={
  "a": [
    21.08949474737369,
    89.10545272636318,
    47.72616308154078,
    46.97653826913457,
    49.37533766883442,
    16.49179589794898,
    25.88709354677339,
    66.26688344172085,
    70.21490745372687,
    90.10495247623811,
    87.05647823911956,
    18.09099549774888,
    91.65417708854427,
    58.62071035517759,
    2.648724362181091,
    84.70765382691346,
    62.66868434217109,
    16.9415707853927,
    39.43031515757879,
    6.646723361680841,
    9.645222611305654,
    4.397848924462231,
    80.45977988994497,
    36.28189094547274,
    55.37233616808405,
    44.17793896948474,
    92.95352676338169,
    66.96653326663332,
    4.197948974487243,
    49.6751875937969,
    51.02451225612807,
    14.4927963981991,
    70.06498249124562,
    10.24492246123062,
    63.91805902951476,
    97.45127563781891,
    0.499799899949975,
    57.02151075537769,
    93.25337668834418,
    11.34437218609305,
    23.3383691845923,
    23.13846923461731,
    70.41480740370184,
    65.81710855427714,
    76.81160580290145,
    52.67368684342171,
    58.82061030515258,
    30.63471735867934,
    53.92306153076539,
    73.41330665332666,
    36.08199099549775,
    71.41430715357679,
    53.77313656828414,
    20.83961980990496,
    86.60670335167583,
    5.947073536768384,
    69.36533266633316,
    20.08999499749875,
    11.59424712356178,
    44.87758879439721,
    84.90755377688843,
    91.80410205102551,
    26.63671835917959,
    4.997548774387194,
    79.46028014007003,
    10.99454727363682,
    87.55622811405702,
    52.37383691845923,
    72.86358179089544,
    20.040020010005,
    58.87058529264633,
    69.71515757878939,
    82.20890445222611,
    31.18444222111056,
    60.91955977988995,
    89.50525262631315,
    98.80060030015007,
    58.37083541770886,
    0.7496748374187093,
    94.55272636318159,
    57.07148574287144,
    33.93306653326663,
    86.30685342671336,
    67.96603301650825,
    44.32786393196599,
    61.51925962981491,
    27.78614307153577,
    94.50275137568784,
    49.22541270635318,
    67.91605802901451,
    3.498299149574787,
    30.98454227113557,
    8.945572786393196,
    69.81510755377688,
    88.65567783891946,
    44.52776388194097,
    25.33736868434217,
    65.31735867933966,
    62.96853426713357,
    42.72866433216608,
    38.23091545772887,
    66.71665832916457,
    25.13746873436719,
    33.28339169584793,
    18.14097048524262,
    42.62871435717859,
    14.59274637318659,
    64.067983991996,
    41.07948974487244,
    74.21290645322661,
    36.8815907953977,
    86.95652826413206,
    55.42231115557779,
    33.53326663331666,
    33.73316658329165,
    78.51075537768884,
    85.55722861430715,
    3.648224112056028,
    27.63621810905453,
    90.80460230115057,
    10.74467233616808,
    26.03701850925463,
    10.39484742371186,
    85.90705352676338,
    20.63971985992997,
    8.995547773886944,
    89.20540270135068,
    54.02301150575288,
    16.89159579789895,
    30.18494247123562,
    93.90305152576288,
    29.53526763381691,
    69.86508254127064,
    77.21140570285142,
    2.848624312156078,
    57.17143571785893,
    72.76363181590796,
    93.65317658829414,
    95.70215107553777,
    46.67668834417209,
    11.19444722361181,
    98.70065032516258,
    66.66668334167083,
    79.06048024012006,
    51.82411205602801,
    91.45427713856928,
    23.73816908454227,
    67.71615807903952,
    55.97203601800901,
    12.74367183591796,
    18.5407703851926,
    91.904052026013,
    84.95752876438219,
    3.748174087043522,
    74.3128564282141,
    15.89209604802401,
    4.297898949474737,
    47.62621310655328,
    93.10345172586293,
    84.40780390195097,
    63.26838419209605,
    85.15742871435718,
    94.05297648824411,
    40.03001500750376,
    83.30835417708855,
    52.52376188094048,
    43.12846423211606,
    38.68069034517259,
    1.849124562281141,
    94.15292646323161,
    65.5672336168084,
    0.2998999499749875,
    89.90505252626313,
    62.21890945472737,
    87.50625312656328,
    34.98254127063532,
    1.149474737368684,
    10.64472236118059,
    26.98654327163582,
    42.67868934467234,
    60.0200100050025,
    92.40380190095047,
    84.60770385192596,
    12.79364682341171,
    93.50325162581291,
    48.02601300650326,
    94.4527763881941,
    92.20390195097549,
    69.56523261630815,
    41.82911455727864,
    3.198449224612306,
    39.88009004502251,
    50.4248124062031,
    6.196948474237119,
    22.53876938469235,
    64.51775887943971,
    95.40230115057528,
    82.85857928964482,
    90.05497748874437,
    13.59324662331166,
    92.05397698849424,
    31.68419209604803,
    96.90155077538769,
    77.31135567783892,
    47.52626313156578,
    36.1319659829915,
    39.83011505752877,
    83.00850425212606,
    61.36933466733367,
    17.89109554777389,
    96.45177588794397,
    43.42831415707854,
    83.10845422711355,
    8.046023011505753,
    69.46528264132066,
    3.94807403701851,
    90.95452726363182,
    31.83411705852927,
    10.69469734867434,
    77.86108054027014,
    54.17293646823412,
    89.45527763881941,
    49.82511255627814,
    69.91505752876438,
    14.99254627313657,
    77.51125562781391,
    26.48679339669835,
    23.48829414707354,
    99.40030015007504,
    57.92106053026514,
    63.06848424212107,
    25.6871935967984,
    22.38884442221111,
    40.82961480740371,
    27.2863931965983,
    22.28889444722362,
    27.58624312156078,
    76.06198099049524,
    80.15992996498248,
    84.50775387693847,
    32.88359179589795,
    82.15892946473237,
    58.67068534267134,
    24.98754377188595,
    22.73866933466734,
    76.0120060030015,
    58.92056028014007,
    50.97453726863432,
    88.8056028014007,
    85.85707853926964,
    90.45477738869434,
    32.083991995998,
    80.10995497748874,
    65.46728364182091,
    42.92856428214107,
    31.53426713356679,
    82.25887943971986,
    58.97053526763382,
    58.4208104052026,
    83.55822911455728,
    74.61270635317659,
    94.70265132566283,
    6.796648324162081,
    19.74017008504253,
    68.51575787893947,
    2.898599299649825,
    18.84062031015508,
    10.4448224112056,
    61.46928464232116,
    91.20440220110055,
    34.38284142071036,
    50.27488744372187,
    16.24192096048024,
    95.30235117558779,
    91.10445222611305,
    8.39584792396198,
    54.87258629314658,
    40.27988994497249,
    84.80760380190095,
    97.40130065032515,
    36.33186593296649,
    95.65217608804402,
    13.14347173586793,
    50.07498749374687,
    72.46378189094547,
    11.24442221110555,
    82.60870435217609,
    22.93856928464232,
    90.35482741370686,
    59.52026013006503,
    30.43481740870435,
    64.8176088044022,
    69.96503251625812,
    57.47128564282141,
    89.85507753876938,
    87.60620310155078,
    24.53776888444222,
    61.11945972986494,
    13.69319659829915,
    14.74267133566783,
    58.72066033016509,
    36.93156578289145,
    42.32886443221611,
    14.39284642321161,
    24.18794397198599,
    17.6911955977989,
    97.5512256128064,
    91.55422711355678,
    32.98354177088545,
    88.30585292646323,
    24.83761880940471,
    41.92906453226614,
    75.912056028014,
    54.07298649324662,
    86.15692846423211,
    12.24392196098049,
    24.88759379689845,
    44.07798899449725,
    59.87008504252126,
    78.41080540270134,
    40.17993996998499,
    1.549274637318659,
    98.4008004002001,
    87.40630315157578,
    37.18144072036019,
    61.61920960480241,
    10.89459729864932,
    13.7431715857929,
    57.27138569284643,
    78.81060530265133,
    52.22391195597799,
    59.3703351675838,
    34.03301650825413,
    50.82461230615308,
    92.55372686343172,
    3.698199099549775,
    66.01700850425212,
    21.83911955977989,
    86.3568284142071,
    73.11345672836418,
    51.12446223111556,
    71.31435717858929,
    4.847623811905953,
    9.795147573786894,
    40.97953976988494,
    87.25637818909455,
    49.62521260630316,
    98.55072536268133,
    59.97003501750876,
    60.56973486743372,
    59.32036018009005,
    46.4767883941971,
    25.08749374687344,
    17.09149574787394,
    88.85557778889445,
    38.18094047023512,
    81.15942971485742,
    79.81010505252625,
    37.08149074537269,
    33.38334167083542,
    32.28389194597299,
    34.08299149574788,
    76.7616308154077,
    82.35882941470734,
    24.58774387193597,
    75.76213106553277,
    49.52526263131566,
    19.14047023511756,
    63.56823411705853,
    71.71415707853927,
    61.41930965482742,
    4.597748874437219,
    30.68469234617309,
    27.18644322161081,
    76.61170585292646,
    59.42031015507754,
    15.49229614807404,
    69.61520760380189,
    7.996048024012006,
    66.56673336668334,
    92.15392696348174,
    57.37133566783392,
    88.45577788894447,
    96.95152576288145,
    24.28789394697349,
    83.65817908954477,
    10.09499749874938,
    4.947573786893447,
    68.61570785392696,
    82.05897948974487,
    10.84462231115558,
    37.53126563281641,
    53.7231615807904,
    98.45077538769384,
    61.81910955477739,
    27.48629314657329,
    45.37733866933467,
    90.55472736368183,
    70.3648324162081,
    76.96153076538269,
    68.06598299149574,
    36.68169084542271,
    11.79414707353677,
    37.33136568284142,
    99.45027513756878,
    1.649224612306153,
    44.97753876938469,
    20.8895947973987,
    79.31035517758879,
    13.34337168584292,
    30.88459229614808,
    48.82561280640321,
    87.85607803901951,
    66.76663331665833,
    5.397348674337168,
    49.92506253126564,
    6.746673336668334,
    23.98804402201101,
    41.42931465732867,
    36.98154077038519,
    21.23941970985493,
    26.58674337168585,
    41.12946473236619,
    84.15792896448224,
    34.6327163581791,
    45.12746373186594,
    58.27088544272137,
    82.65867933966983,
    85.6072036018009,
    16.1919459729865,
    93.20340170085042,
    53.17343671835918,
    1.449324662331166,
    33.7831415707854,
    59.77013506753377,
    69.11545772886443,
    24.0879939969985,
    18.69069534767384,
    35.38234117058529,
    43.2783891945973,
    70.81460730365183,
    2.798649324662331,
    36.58174087043522,
    12.94357178589295,
    66.46678339169584,
    74.76263131565783,
    39.18044022011006,
    91.60420210105052,
    16.14197098549275,
    65.86708354177088,
    91.85407703851925,
    23.43831915957979,
    54.32286143071536,
    70.5647323661831,
    74.11295647823911,
    18.04102051025513,
    67.56623311655828,
    6.246923461730865,
    56.0719859929965,
    7.046523261630815,
    29.23541770885443,
    17.84112056028014,
    79.86008004002001,
    38.73066533266633,
    5.647223611805903,
    22.63871935967984,
    96.25187593796898,
    50.77463731865933,
    40.47978989494748,
    33.13346673336669,
    76.56173086543271,
    88.75562781390695,
    73.06348174087043,
    27.13646823411706,
    32.43381690845423,
    5.897098549274637,
    14.19294647323662,
    89.75512756378188,
    52.32386193096549,
    97.6511755877939,
    38.98054027013507,
    5.797148574287143,
    43.77813906953477,
    14.04302151075538,
    59.12046023011506,
    66.86658329164582,
    72.7136568284142,
    68.8655827913957,
    79.9600300150075,
    55.52226113056528,
    65.36733366683342,
    1.349374687343672,
    81.60920460230115,
    23.58824412206103,
    19.54027013506754,
    88.6057028514257,
    74.5127563781891,
    74.91255627813906,
    42.82861430715358,
    21.38934467233617,
    5.297398699349674,
    26.28689344672337,
    33.03351675837919,
    26.23691845922962,
    4.24792396198099,
    95.25237618809405,
    69.66518259129565,
    48.52576288144073,
    78.71065532766383,
    34.88259129564783,
    83.70815407703851,
    12.8935967983992,
    82.80860430215107,
    30.83461730865433,
    69.51525762881441,
    77.56123061530765,
    28.93556778389195,
    85.30735367683842,
    11.04452226113056,
    52.42381190595298,
    12.0440220110055,
    37.58124062031015,
    30.08499249624813,
    53.42331165582792,
    97.70115057528764,
    51.67418709354678,
    32.53376688344172,
    69.16543271635818,
    62.01900950475238,
    41.72916458229115,
    78.06098049024511,
    79.76013006503251,
    75.86208104052025,
    17.99104552276138,
    12.69369684842421,
    65.41730865432716,
    8.545772886443222,
    41.32936468234117,
    19.09049524762381,
    52.72366183091546,
    15.59224612306153,
    77.36133066533266,
    53.97303651825914,
    23.38834417208605,
    21.58924462231116,
    57.72116058029015,
    98.10095047523761,
    39.98004002001001,
    78.61070535267633,
    18.89059529764883,
    10.19494747373687,
    31.88409204602301,
    44.37783891945973,
    20.43981990995498,
    71.36433216608305,
    62.4687843921961,
    78.2608804402201,
    70.86458229114557,
    58.47078539269635,
    37.6312156078039,
    13.24342171085543,
    38.88059029514758,
    17.79114557278639,
    12.19394697348674,
    63.71815907953977,
    47.02651325662832,
    5.84712356178089,
    38.43081540770385,
    45.82711355677839,
    47.3263631815908,
    73.76313156578288,
    93.6032016008004,
    75.96203101550775,
    64.6177088544272,
    53.12346173086544,
    51.22441220610305,
    12.54377188594297,
    86.90655327663832,
    35.18244122061031,
    75.41230615307653,
    68.016008004002,
    17.54127063531766,
    25.93706853426714,
    30.28489244622311,
    26.68669334667334,
    43.32836418209105,
    95.60220110055027,
    85.20740370185092,
    60.76963481740871,
    67.11645822911456,
    52.92356178089045,
    22.5887443721861,
    54.4727863931966,
    89.30535267633816,
    24.73766883441721,
    62.61870935467734,
    27.23641820910456,
    51.72416208104053,
    56.62171085542771,
    79.61020510255128,
    34.58274137068535,
    62.26888444222111,
    11.64422211105553,
    38.28089044522262,
    89.40530265132566,
    95.90205102551275,
    15.3423711855928,
    1.999049524762381,
    44.42781390695348,
    19.94007003501751,
    78.76063031515757,
    1.299399699849925,
    28.8855927963982,
    62.86858429214607,
    5.497298649324662,
    25.28739369684843,
    33.23341670835418,
    53.57323661830916,
    7.596248124062031,
    92.45377688844422,
    79.51025512756378,
    7.44632316158079,
    37.88109054527264,
    76.46178089044523,
    22.13896948474237,
    5.147473736868434,
    19.79014507253627,
    42.77863931965983,
    24.9375687843922,
    4.547773886943472,
    20.53976988494247,
    85.45727863931965,
    44.27788894447224,
    65.26738369184592,
    46.17693846923462,
    62.51875937968985,
    25.23741870935468,
    50.47478739369685,
    47.87608804402201,
    40.32986493246624,
    69.01550775387693,
    41.02951475737869,
    79.66018009004502,
    81.95902951475738,
    4.09799899949975,
    55.62221110555278,
    68.26588294147074,
    70.01500750375187,
    95.80210105052527,
    40.22991495747874,
    61.26938469234618,
    45.02751375687844,
    55.17243621810906,
    17.59124562281141,
    7.196448224112056,
    96.20190095047523,
    84.20790395197598,
    40.0799899949975,
    93.95302651325663,
    76.16193096548274,
    92.7536268134067,
    33.88309154577289,
    87.1064532266133,
    31.38434217108555,
    51.47428714357179,
    48.17593796898449,
    6.4967983991996,
    32.38384192096049,
    23.03851925962982,
    53.37333666833417,
    92.0040020010005,
    2.049024512256128,
    83.20840420210105,
    45.6272136068034,
    3.2983991995998,
    81.05947973986993,
    90.4048024012006,
    87.90605302651325,
    81.45927963981991,
    40.57973986993497,
    77.96103051525762,
    53.22341170585293,
    23.18844422211106,
    71.1144572286143,
    49.57523761880941,
    75.66218109054527,
    68.96553276638319,
    9.595247623811906,
    0.2499249624812406,
    18.94057028514257,
    60.96953476738369,
    7.146473236618309,
    15.19244622311156,
    35.33236618309155,
    45.57723861930966,
    5.547273636818409,
    75.71215607803902,
    23.83811905952977,
    72.56373186593297,
    85.50725362681341,
    1.749174587293647,
    64.86758379189594,
    86.50675337668834,
    45.22741370685343,
    11.39434717358679,
    83.80810405202601,
    1.499299649824913,
    47.77613806903452,
    9.395347673836918,
    8.89559779889945,
    29.33536768384192,
    6.146973486743372,
    8.0959979989995,
    85.35732866433216,
    44.72766383191596,
    35.2823911955978,
    9.895097548774388,
    2.698699349674837,
    31.3343671835918,
    79.16043021510755,
    81.65917958979489,
    89.05547773886943,
    97.90105052526263,
    60.61970985492746,
    56.171935967984,
    0.6996998499249625,
    78.3608304152076,
    50.87458729364683,
    47.82611305652826,
    95.75212606303151,
    65.01750875437719,
    35.43231615807904,
    64.66768384192096,
    70.96453226613306,
    87.80610305152577,
    23.08849424712356,
    17.94107053526763,
    43.17843921960981,
    40.72966483241621,
    2.34887443721861,
    52.77363681840921,
    28.33586793396699,
    39.23041520760381,
    59.07048524262132,
    73.66318159079539,
    82.45877938969484,
    88.20590295147574,
    51.3743371685843,
    61.96903451725863,
    67.36633316658329,
    22.98854427213607,
    16.99154577288645,
    52.17393696848425,
    17.49129564782391,
    27.43631815907954,
    61.01950975487744,
    2.998549274637319,
    1.899099549774887,
    17.64122061030515,
    0.1,
    41.27938969484742,
    3.898099049524763,
    93.80310155077538,
    52.07398699349675,
    81.5592296148074,
    74.01300650325162,
    28.83561780890446,
    9.095497748874438,
    67.41630815407703,
    59.17043521760881,
    73.26338169084542,
    60.26988494247124,
    87.15642821410705,
    53.62321160580291,
    79.36033016508254,
    79.91005502751375,
    32.9335667833917,
    83.40830415207604,
    11.14447223611806,
    80.35982991495747,
    59.2703851925963,
    8.495797898949474,
    37.7311655827914,
    37.28139069534767,
    2.298899449724863,
    51.2743871935968,
    58.57073536768385,
    46.77663831915958,
    6.047023511755878,
    72.8136068034017,
    63.01850925462732,
    3.398349174587294,
    55.02251125562782,
    45.7271635817909,
    54.72266133066534,
    46.02701350675338,
    72.9135567783892,
    55.27238619309655,
    99.70015007503751,
    84.8575787893947,
    37.78114057028515,
    0.7996498249124563,
    48.62571285642822,
    40.37983991995998,
    52.62371185592797,
    72.01400700350175,
    7.646223111555778,
    57.32136068034017,
    9.745172586293146,
    47.47628814407204,
    1.599249624812406,
    4.697698849424712,
    85.40730365182591,
    3.598249124562281,
    56.82161080540271,
    67.21640820410205,
    31.63421710855428,
    1.049524762381191,
    22.78864432216108,
    96.7016508254127,
    31.03451725862932,
    48.77563781890946,
    70.11495747873937,
    8.145972986493247,
    96.85157578789395,
    50.17493746873437,
    51.92406203101551,
    7.746173086543272,
    35.58224112056028,
    92.50375187593797,
    28.53576788394197,
    19.19044522261131,
    14.84262131065533,
    48.67568784392196,
    46.07698849424713,
    37.38134067033517,
    31.58424212106053,
    14.24292146073036,
    54.77263631815908,
    97.60120060030015,
    48.32586293146574,
    72.51375687843921,
    97.35132566283141,
    17.34137068534267,
    65.91705852926462,
    66.36683341670835,
    39.48029014507254,
    32.58374187093547,
    90.25487743871936,
    33.6831915957979,
    59.47028514257129,
    56.47178589294648,
    84.6576788394197,
    22.88859429714858,
    36.03201600800401,
    20.33986993496748,
    41.22941470735368,
    40.9295647823912,
    10.29489744872436,
    26.38684342171086,
    29.88509254627314,
    29.58524262131066,
    72.31385692846423,
    46.12696348174087,
    27.98604302151076,
    96.1519259629815,
    26.73666833416708,
    15.04252126063031,
    21.7391695847924,
    6.096998499249625,
    32.33386693346674,
    38.53076538269135,
    94.60270135067533,
    13.54327163581791,
    8.445822911455728,
    71.0145072536268,
    49.27538769384692,
    39.28039019509755,
    45.32736368184092,
    0.4498249124562281,
    64.16793396698348,
    16.69169584792396,
    21.53926963481741,
    20.48979489744872,
    38.33086543271636,
    80.6097048524262,
    45.87708854427214,
    92.8535767883942,
    14.69269634817409,
    15.14247123561781,
    90.85457728864432,
    95.45227613806904,
    17.29139569784893,
    71.66418209104552,
    54.97253626813407,
    99.95002501250625,
    30.13496748374187,
    65.06748374187093,
    18.49079539769885,
    68.41580790395197,
    94.10295147573787,
    7.796148074037019,
    50.22491245622812,
    86.00700350175087,
    30.03501750875438,
    85.80710355177588,
    37.93106553276639,
    29.48529264632316,
    84.7576288144072,
    1.249424712356178,
    58.77063531765883,
    53.07348674337169,
    36.48179089544772,
    7.096498249124562,
    21.18944472236118,
    10.14497248624312,
    63.51825912956479,
    96.65167583791896,
    4.747673836918459,
    44.92756378189095,
    98.95052526263132,
    46.42681340670335,
    90.15492746373187,
    0.1999499749874938,
    21.6392196098049,
    39.3303651825913,
    76.26188094047023,
    49.97503751875939,
    11.74417208604302,
    78.91055527763882,
    92.103951975988,
    93.05347673836918,
    88.35582791395697,
    3.098499249624813,
    21.48929464732366,
    53.52326163081541,
    42.02901450725363,
    94.20290145072536,
    76.91155577788894,
    86.55672836418209,
    11.89409704852426,
    18.79064532266133,
    3.14847423711856,
    95.35232616308154,
    7.296398199099549,
    33.5832416208104,
    83.9080540270135,
    7.896098049024512,
    70.31485742871435,
    95.00250125062531,
    12.09399699849925,
    15.74217108554277,
    99.55022511255628,
    71.964032016008,
    28.9855427713857,
    90.2049024512256,
    93.40330165082541,
    90.3048524262131,
    0.8496248124062031,
    86.80660330165082,
    24.38784392196098,
    58.17093546773387,
    5.347373686843421,
    4.147973986993496,
    99.20040020010005,
    54.12296148074037,
    22.03901950975488,
    20.9895447723862,
    34.83261630815408,
    38.63071535767885,
    91.1544272136068,
    12.59374687343672,
    55.3223611805903,
    81.10945472736368,
    98.90055027513756,
    46.22691345672837,
    90.90455227613806,
    93.30335167583792,
    57.57123561780891,
    28.23591795897949,
    89.95502751375687,
    1.6991995997999,
    54.42281140570285,
    5.247423711855927,
    32.48379189594797,
    77.16143071535768,
    98.35082541270636,
    53.67318659329665,
    9.145472736368184,
    95.20240120060029,
    21.88909454727364,
    5.197448724362181,
    26.18694347173587,
    58.07098549274637,
    17.44132066033017,
    57.87108554277139,
    32.73366683341671,
    34.33286643321661,
    24.78764382191096,
    19.34037018509255,
    99.60020010005002,
    48.9255627813907,
    47.92606303151576,
    87.00650325162582,
    67.86608304152075,
    21.98904452226113,
    30.38484242121061,
    68.21590795397698,
    81.70915457728864,
    86.05697848924461,
    47.67618809404703,
    19.99004502251126,
    52.57373686843422,
    76.51175587793897,
    93.85307653826914,
    37.43131565782892,
    56.67168584292146,
    72.0639819909955,
    28.0360180090045,
    89.5552276138069,
    34.68269134567284,
    76.6616808404202,
    16.8416208104052,
    19.2903951975988,
    18.24092046023012,
    42.37883941970986,
    5.097498749374687,
    2.448824412206103,
    75.36233116558279,
    14.54277138569285,
    22.18894447223612,
    49.07548774387194,
    67.61620810405202,
    74.26288144072036,
    32.03401700850425,
    28.63571785892947,
    63.11845922961481,
    42.47878939469735,
    89.80510255127564,
    29.18544272136068,
    97.50125062531265,
    39.03051525762881,
    54.22291145572787,
    6.596748374187094,
    36.23191595797899,
    79.71015507753877,
    89.6551775887944,
    61.7191595797899,
    77.76113056528264,
    82.55872936468234,
    21.33936968484242,
    97.95102551275637,
    28.73566783391696,
    31.78414207103552,
    41.6791895947974,
    75.01250625312656,
    35.68219109554778,
    4.797648824412206,
    34.4328164082041,
    56.42181090545273,
    16.34187093546774,
    35.88209104552276,
    54.52276138069035,
    24.43781890945473,
    10.79464732366183,
    26.5367683841921,
    25.73716858429215,
    2.098999499749875,
    67.0664832416208,
    19.89009504752377,
    74.71265632816407,
    70.4647823911956,
    98.00100050025013,
    61.66918459229615,
    69.06548274137069,
    52.47378689344673,
    2.948574287143572,
    97.05147573786893,
    19.64022011005503,
    83.85807903951975,
    55.87208604302151,
    54.82261130565283,
    13.79314657328664,
    76.111955977989,
    20.78964482241121,
    86.75662831415707,
    34.5327663831916,
    13.6432216108054,
    55.12246123061531,
    29.83511755877939,
    87.35632816408204,
    2.248924462231116,
    78.16093046523261,
    21.13946973486744,
    73.86308154077038,
    54.67268634317159,
    79.26038019009505,
    86.85657828914457,
    38.78064032016008,
    75.0624812406203,
    47.37633816908455,
    11.84412206103051,
    28.28589294647324,
    8.845622811405702,
    21.28939469734868,
    18.74067033516759,
    33.63321660830415,
    56.37183591795898,
    4.497798899449725,
    63.61820910455228,
    82.75862931465733,
    33.43331665832917,
    25.53726863431716,
    18.34087043521761,
    45.47728864432217,
    45.52726363181591,
    43.57823911955978,
    29.7351675837919,
    75.61220610305152,
    77.11145572786393,
    78.66068034017009,
    53.87308654327164,
    26.43681840920461,
    13.99304652326163,
    84.45777888944473,
    3.048524262131066,
    25.58724362181091,
    91.05447723861931,
    24.33786893446723,
    13.19344672336168,
    8.595747873936968,
    73.81310655327664,
    98.15092546273137,
    26.13696848424213,
    36.43181590795398,
    76.8615807903952,
    38.5807403701851,
    53.82311155577789,
    3.798149074537269,
    57.97103551775889,
    62.56873436718359,
    81.85907953976988,
    84.05797898949474,
    84.35782891445723,
    54.5727363681841,
    31.98404202101051,
    60.81960980490246,
    67.1664332166083,
    36.53176588294147,
    7.396348174087043,
    60.06998499249625,
    99.35032516258129,
    31.13446723361681,
    74.96253126563282,
    48.57573786893447,
    12.44382191095548,
    19.84012006003002,
    70.66468234117058,
    48.22591295647824,
    7.496298149074537,
    6.396848424212106,
    71.81410705352675,
    66.16693346673337,
    27.83611805902952,
    4.347873936968484,
    50.67468734367184,
    71.91405702851425,
    27.88609304652326,
    94.95252626313156,
    16.29189594797399,
    88.40580290145073,
    70.16493246623311,
    32.13396698349175,
    30.58474237118559,
    87.30635317658829,
    61.56923461730866,
    39.38034017008505,
    29.68519259629815,
    41.57923961980991,
    8.745672836418208,
    56.12196098049025,
    15.79214607303652,
    18.39084542271136,
    48.12596298149075,
    65.21740870435217,
    2.198949474737369,
    99.05047523761881,
    64.56773386693347,
    86.65667833916959,
    42.97853926963482,
    98.85057528764382,
    37.03151575787894,
    7.696198099049525,
    67.01650825412706,
    21.03951975987994,
    74.36283141570784,
    68.36583291645823,
    78.21090545272637,
    1.399349674837419,
    42.12896448224112,
    12.143971985993,
    46.52676338169085,
    24.03801900950475,
    29.03551775887944,
    83.60820410205102,
    74.56273136568284,
    42.22891445722862,
    55.47228614307154,
    78.11095547773887,
    99.50025012506254,
    27.93606803401701,
    88.90555277638819,
    18.29089544772386,
    85.05747873936969,
    29.43531765882942,
    99.9000500250125,
    98.2009004502251,
    35.63221610805403,
    25.83711855927964,
    94.00300150075037,
    61.31935967983993,
    11.69419709854927,
    72.66368184092046,
    78.01100550275137,
    71.61420710355178,
    88.7056528264132,
    59.02051025512757,
    91.25437718859429,
    7.346373186593296,
    76.71165582791396,
    41.47928964482242,
    62.71865932966484,
    21.43931965982992,
    16.04202101050526,
    88.25587793896948,
    6.896598299149574,
    35.93206603301651,
    31.73416708354177,
    80.75962981490746,
    98.05097548774387,
    16.79164582291146,
    81.30935467733866,
    61.06948474237119,
    65.76713356678339,
    51.17443721860931,
    63.86808404202102,
    43.02851425712857,
    78.96053026513256,
    19.69019509754878,
    82.90855427713856,
    77.01150575287643,
    9.345372686343172,
    96.8016008004002,
    45.42731365682842,
    71.46428214107053,
    78.86058029014507,
    73.91305652826414,
    91.70415207603801,
    53.02351175587794,
    28.43581790895448,
    30.53476738369185,
    61.76913456728364,
    77.61120560280139,
    40.12996498249124,
    62.31885942971486,
    50.57473736868435,
    64.21790895447724,
    0.5997498749374688,
    7.946073036518259,
    46.5767383691846,
    20.28989494747374,
    43.72816408204103,
    18.99054527263632,
    20.38984492246123,
    47.07648824412206,
    40.87958979489745,
    66.3168584292146,
    89.15542771385692,
    33.33336668334167,
    58.22091045522762,
    82.4088044022011,
    4.8975987993997,
    76.31185592796398,
    29.08549274637319,
    95.50225112556278,
    37.68119059529765,
    28.68569284642322,
    2.748674337168584,
    66.5167583791896,
    44.57773886943472,
    56.9215607803902,
    54.62271135567784,
    34.93256628314158,
    52.1239619809905,
    30.78464232116058,
    5.997048524262131,
    32.68369184592297,
    13.89309654827414,
    98.5007503751876,
    2.548774387193597,
    68.6656828414207,
    53.32336168084042,
    9.995047523761881,
    35.23241620810406,
    28.18594297148574,
    51.77413706853427,
    7.246423211605803,
    99.25037518759379,
    43.07848924462231,
    39.93006503251626,
    52.97353676838419,
    41.17943971985994,
    73.51325662831415,
    59.62021010505253,
    77.46128064032015,
    10.49479739869935,
    70.91455727863932,
    27.73616808404202,
    66.4168084042021,
    24.68769384692346,
    99.10045022511255,
    13.39334667333667,
    9.495297648824412,
    81.80910455227614,
    45.92706353176589,
    20.23991995997999,
    82.95852926463232,
    37.13146573286644,
    89.00550275137569,
    2.598749374687344,
    35.98204102051026,
    51.62421210605303,
    34.48279139569785,
    35.78214107053527,
    95.10245122561281,
    80.65967983991996,
    36.63171585792897,
    32.63371685842922,
    56.72166083041521,
    29.28539269634818,
    9.19544772386193,
    85.25737868934468,
    73.36333166583292,
    4.647723861930965,
    0.5497748874437218,
    47.17643821910956,
    74.46278139069534,
    1.949074537268634,
    57.12146073036519,
    50.72466233116559,
    73.96303151575788,
    90.5047523761881,
    70.76463231615807,
    46.87658829414708,
    8.295897948974487,
    46.92656328164082,
    27.33636818409205,
    64.41780890445223,
    77.41130565282641,
    51.07448724362182,
    20.93956978489245,
    37.83111555777889,
    50.92456228114057,
    62.36883441720861,
    99.75012506253127,
    36.18194097048524,
    54.27288644322162,
    56.02201100550275,
    43.92806403201601,
    10.34487243621811,
    65.66718359179589,
    46.37683841920961,
    63.46828414207104,
    26.33686843421711,
    93.45327663831915,
    10.5447723861931,
    42.5287643821911,
    83.1584292146073,
    93.00350175087543,
    47.57623811905953,
    80.20990495247624,
    99.85007503751876,
    15.29239619809905,
    91.50425212606302,
    20.1399699849925,
    44.02801400700351,
    15.64222111055528,
    74.66268134067033,
    97.75112556278138,
    85.00750375187593,
    78.5607303651826,
    25.18744372186093,
    5.597248624312156,
    17.19144572286143,
    60.36983491745873,
    38.38084042021011,
    64.11795897948974,
    96.50175087543772,
    88.50575287643822,
    40.62971485742872,
    68.56573286643321,
    73.31335667833916,
    59.72016008004002,
    97.00150075037519,
    34.18294147073537,
    29.13546773386694,
    95.05247623811906,
    62.16893446723362,
    86.10695347673837,
    35.08249124562281,
    23.63821910955478,
    60.31985992996498,
    40.52976488244122,
    12.39384692346173,
    59.22041020510255,
    28.78564282141071,
    94.2528764382191,
    0.6497248624312156,
    4.447823911955978,
    6.946573286643321,
    80.95952976488243,
    32.18394197098549,
    6.696698349174588,
    30.73466733366683,
    6.846623311655827,
    42.57873936968485,
    96.55172586293146,
    56.32186093046523,
    83.45827913956978,
    66.11695847923961,
    33.08349174587294,
    62.41880940470236,
    68.91555777888944,
    14.34287143571786,
    82.10895447723861,
    75.1624312156078,
    43.97803901950976,
    83.50825412706352,
    91.35432716358179,
    11.09449724862431,
    44.127963981991,
    79.56023011505752,
    72.21390695347674,
    72.11395697848924,
    71.76413206603301,
    80.25987993996998,
    13.04352176088044,
    72.16393196598298,
    41.97903951975988,
    18.64072036018009,
    37.48129064532267,
    75.21240620310155,
    38.03101550775388,
    8.195947973986993,
    20.58974487243622,
    13.29339669834918,
    71.2144072036018,
    11.49429714857429,
    29.6352176088044,
    0.89959979989995,
    59.57023511755878,
    64.7176588294147,
    48.87558779389695,
    49.77513756878439,
    57.82111055527764,
    73.61320660330165,
    30.93456728364182,
    46.62671335667834,
    75.26238119059529,
    91.95402701350675,
    60.71965982991496,
    71.06448224112056,
    20.68969484742371,
    80.90955477738869,
    36.38184092046023,
    35.73216608304153,
    12.99354677338669,
    50.02501250625313,
    27.53626813406704,
    65.16743371685843,
    26.83661830915458,
    98.60070035017509,
    99.15042521260631,
    49.72516258129065,
    68.46578289144571,
    39.78014007003502,
    60.66968484242121,
    83.95802901450725,
    60.8695847923962,
    85.70715357678839,
    15.94207103551776,
    13.09349674837419,
    39.08049024512256,
    36.78164082041021,
    79.1104552276138,
    1.799149574787394,
    35.53226613306654,
    43.62821410705353,
    80.30985492746373,
    75.11245622811406,
    19.04052026013007,
    98.3008504252126,
    92.70365182591296,
    6.446823411705853,
    26.08699349674838,
    55.92206103051526,
    13.94307153576788,
    15.44232116058029,
    21.78914457228614,
    81.50925462731365,
    72.36383191595797,
    51.87408704352176,
    74.06298149074537,
    60.11995997999,
    94.40280140070035,
    92.60370185092546,
    70.51475737868934,
    91.00450225112556,
    47.2264132066033,
    96.75162581290645,
    9.445322661330666,
    86.2568784392196,
    17.24142071035518,
    5.69719859929965,
    12.64372186093047,
    71.86408204102051,
    43.52826413206603,
    71.51425712856428,
    72.41380690345173,
    75.46228114057028,
    65.71715857928965,
    97.85107553776888,
    23.53826913456729,
    53.47328664332166,
    88.00600300150074,
    60.16993496748375,
    49.87508754377189,
    91.40430215107554,
    73.21340670335167,
    60.2199099549775,
    51.42431215607805,
    97.80110055027514,
    20.73966983491746,
    88.55572786393196,
    66.61670835417709,
    93.15342671335668,
    69.26538269134566,
    39.63021510755378,
    22.33886943471736,
    6.996548274137068,
    77.26138069034516,
    22.43881940970486,
    63.41830915457729,
    68.31585792896448,
    22.68869434717359,
    43.47828914457229,
    72.96353176588293,
    15.2424212106053,
    71.26438219109555,
    31.08449224612306,
    41.62921460730365,
    5.747173586793396,
    35.03251625812906,
    2.148974487243622,
    94.80260130065032,
    87.45627813906954,
    85.75712856428214,
    34.73266633316658,
    99.65017508754377,
    41.87908954477239,
    23.93806903451726,
    51.57423711855928,
    12.49379689844922,
    69.41530765382691,
    28.38584292146073,
    83.35832916458229,
    82.70865432716359,
    67.26638319159579,
    31.48429214607304,
    21.68919459729865,
    53.27338669334668,
    56.77163581790896,
    9.295397698849424,
    45.27738869434717,
    86.4567783891946,
    39.53026513256629,
    49.42531265632817,
    52.02401200600301,
    88.0559779889945,
    96.35182591295647,
    59.92006003001501,
    96.6017008504252,
    17.14147073536769,
    76.21190595297648,
    67.31635817908955,
    96.051975987994,
    70.2648824412206,
    0.3998499249624813,
    11.54427213606803,
    100,
    15.69219609804902,
    18.59074537268635,
    48.47578789394698,
    86.40680340170084,
    96.30185092546273,
    72.26388194097048,
    25.63721860930465,
    59.67018509254628,
    85.95702851425713,
    85.10745372686343,
    97.10145072536268,
    43.3783391695848,
    73.46328164082041,
    12.29389694847424,
    84.008004002001,
    14.44282141070535,
    74.16293146573287,
    78.4607803901951,
    45.17743871935969,
    31.93406703351676,
    28.48579289644823,
    33.18344172086043,
    47.12646323161581,
    39.13046523261631,
    94.90255127563782,
    48.42581290645323,
    9.245422711355678,
    81.00950475237619,
    9.945072536268134,
    42.87858929464733,
    58.02101050525263,
    55.72216108054027,
    48.97553776888444,
    92.35382691345673,
    60.41980990495248,
    30.23491745872937,
    57.42131065532767,
    95.55222611305652,
    68.7656328164082,
    83.05847923961981,
    6.546773386693347,
    75.56223111555778,
    14.94257128564282,
    66.91655827913957,
    96.40180090045023,
    79.01050525262632,
    6.296898449224612,
    1.199449724862431,
    38.83061530765383,
    92.30385192596297,
    16.74167083541771,
    70.61470735367683,
    2.49879939969985,
    77.06148074037019,
    65.96703351675838,
    28.58574287143572,
    40.77963981990996,
    64.26788394197098,
    64.76763381690846,
    13.44332166083042,
    61.16943471735868,
    16.39184592296148,
    34.13296648324162,
    89.25537768884442,
    21.93906953476739,
    1.099499749874937,
    81.90905452726363,
    8.645722861430714,
    55.57223611805903,
    67.81610805402701,
    42.17893946973487,
    15.39234617308654,
    15.09249624812406,
    97.25137568784392,
    73.71315657828914,
    24.23791895947974,
    74.81260630315157,
    26.78664332166083,
    67.46628314157078,
    9.04552276138069,
    90.60470235117559,
    55.67218609304653,
    23.2384192096048,
    62.06898449224612,
    63.81810905452727,
    42.27888944472237,
    45.97703851925963,
    92.25387693846923,
    14.29289644822411,
    67.51625812906452,
    52.27388694347174,
    90.65467733866933,
    83.75812906453227,
    69.31535767883942,
    54.92256128064032,
    58.12096048024012,
    38.08099049524763,
    16.44182091045523,
    38.4807903951976,
    67.66618309154578,
    89.60520260130065,
    64.96753376688343,
    54.37283641820911,
    64.9175587793897,
    32.8336168084042,
    71.16443221610805,
    94.75262631315658,
    57.6711855927964,
    16.64172086043022,
    98.65067533766883,
    87.70615307653827,
    43.87808904452226,
    74.86258129064532,
    57.62121060530266,
    43.22841420710355,
    25.38734367183592,
    44.47778889444723,
    25.03751875937969,
    81.25937968984492,
    56.57173586793397,
    64.46778389194597,
    50.32486243121561,
    0.9995497748874437,
    3.448324162081041,
    3.248424212106053,
    98.25087543771886,
    68.16593296648324,
    63.76813406703352,
    41.52926463231616,
    95.9520260130065,
    40.67968984492246,
    33.48329164582292,
    23.28839419709855,
    38.93056528264133,
    6.346873436718359,
    9.54527263631816,
    4.048024012006003,
    76.36183091545773,
    82.00900450225112,
    10.04502251125563,
    97.30135067533767,
    29.38534267133567,
    75.81210605302651,
    49.02551275637819,
    88.155927963982,
    11.94407203601801,
    17.04152076038019,
    97.15142571285642,
    11.99404702351176,
    62.76863431715859,
    62.11895947973987,
    45.07748874437219,
    50.37483741870935,
    66.06698349174587,
    77.71115557778889,
    39.68019009504753,
    28.08599299649825,
    37.98104052026013,
    83.25837918959479,
    11.44432216108054,
    78.31085542771386,
    63.36833416708355,
    68.81560780390195,
    94.85257628814406,
    63.66818409204603,
    88.10595297648824,
    31.28439219609805,
    56.97153576788394,
    62.81860930465233,
    61.21940970485243,
    31.23441720860431,
    88.95552776388193,
    19.49029514757379,
    26.93656828414207,
    15.84212106053027,
    27.08649324662331,
    27.3863431715858,
    61.86908454227114,
    55.07248624312157,
    14.14297148574287,
    41.37933966983492,
    70.71465732866433,
    25.98704352176088,
    12.84362181090545,
    48.27588794397199,
    22.23891945972987,
    84.25787893946973,
    93.35332666333166,
    95.15242621310655,
    26.88659329664832,
    59.82011005502752,
    92.90355177588795,
    49.32536268134067,
    16.091995997999,
    18.44082041020511,
    84.1079539769885,
    9.6951975987994,
    60.51975987993998,
    29.93506753376689,
    9.84512256128064,
    30.33486743371686,
    42.07898949474738,
    63.96803401700851,
    32.23391695847924,
    87.65617808904452,
    17.39134567283642,
    8.24592296148074,
    14.79264632316158,
    35.13246623311656,
    28.135967983992,
    58.5207603801901,
    68.71565782891446,
    20.18994497248624,
    24.63771885942972,
    23.78814407203602,
    25.48729364682341,
    19.59024512256128,
    80.55972986493246,
    42.4288144072036,
    96.10195097548774,
    34.23291645822912,
    14.89259629814907,
    46.82661330665333,
    8.345872936468234,
    75.51225612806402,
    22.83861930965483,
    74.4128064032016,
    22.08899449724863,
    3.998049024512256,
    16.59174587293647,
    63.16843421710855,
    98.75062531265633,
    55.82211105552777,
    79.2104052026013,
    23.88809404702351,
    0.3498749374687344,
    50.12496248124062,
    68.11595797898948,
    49.47528764382191,
    29.78514257128565,
    80.50975487743872,
    46.72666333166583,
    90.00500250125063,
    96.00200100050024,
    32.78364182091046,
    65.51725862931465,
    90.75462731365683,
    67.76613306653326,
    57.52126063031516,
    46.32686343171586,
    55.77213606803402,
    35.48229114557279,
    79.41030515257629,
    49.12546273136569,
    77.66118059029515,
    66.81660830415207,
    18.19094547273637,
    37.23141570785393,
    8.695697848924462,
    10.59474737368684,
    94.65267633816909,
    23.68819409704853,
    64.31785892946473,
    80.01000500250125,
    56.87158579289645,
    92.6536768384192,
    15.99204602301151,
    19.39034517258629,
    51.52426213106553,
    94.3528264132066,
    84.5577288644322,
    80.85957978989495,
    48.72566283141571,
    11.2943971985993,
    81.40930465232616,
    36.73166583291646,
    95.852076038019,
    81.20940470235118,
    91.30435217608805,
    99.80010005002501,
    16.54177088544272,
    69.76513256628314,
    65.11745872936469,
    25.43731865932967,
    8.795647823911956,
    55.2224112056028,
    3.348374187093547,
    94.30285142571286,
    36.83161580790396,
    73.56323161580791,
    82.5087543771886,
    43.67818909454728,
    13.49329664832416,
    73.01350675337669,
    56.52176088044023,
    84.30785392696347,
    0.1499749874937469,
    0.9495747873936968,
    29.98504252126063,
    57.77113556778389,
    30.4847923961981,
    44.62771385692847,
    62.91855927963982,
    17.74117058529265,
    51.32436218109055,
    86.70665332666333,
    81.75912956478238,
    3.848124062031016,
    41.7791395697849,
    65.61720860430215,
    24.48779389694848,
    80.059979989995,
    44.67768884442221,
    35.83211605802902,
    72.6137068534267,
    24.13796898449225,
    80.40980490245123,
    58.32086043021511,
    25.78714357178589,
    73.16343171585793,
    63.2184092046023,
    14.64272136068034,
    47.97603801900951,
    39.58024012006003,
    64.01800900450225,
    87.75612806403201,
    56.22191095547774,
    15.54227113556778,
    93.55322661330665,
    46.27688844422212,
    57.22141070535268,
    14.09299649824912,
    97.20140070035018,
    48.075987993997,
    80.7096548274137,
    40.42981490745373,
    27.03651825912957,
    49.17543771885943,
    75.31235617808905,
    43.82811405702851,
    76.41180590295147,
    48.37583791895948,
    38.13096548274137,
    45.67718859429715,
    3.548274137068534,
    69.21540770385192,
    90.70465232616309,
    92.80360180090045,
    5.047523761880941,
    77.81110555277638,
    12.34387193596798,
    44.82761380690346,
    89.35532766383191,
    47.27638819409705,
    87.956028014007,
    52.82361180590296,
    52.8735867933967,
    60.46978489244623,
    50.62471235617809,
    66.21690845422711,
    91.75412706353177,
    93.70315157578789,
    99.30035017508754,
    61.91905952976489,
    51.97403701850926,
    47.4263131565783,
    77.91105552776388,
    33.98304152076038,
    7.846123061530765,
    50.5247623811906,
    71.56423211605802,
    34.28289144572286,
    7.546273136568284,
    2.398849424712356,
    81.35932966483242,
    63.3183591795898,
    33.83311655827914,
    93.75312656328164,
    87.20640320160079,
    31.43431715857929,
    19.44032016008004,
    27.68619309654828,
    44.22791395697849,
    82.3088544272136,
    39.73016508254128,
    22.4887943971986,
    5.447323661830915,
    45.77713856928465,
    10.94457228614307,
    19.24042021010505,
    64.36783391695847,
    80.8096048024012,
    13.84312156078039,
    99.00050025012506,
    85.65717858929465,
    89.70515257628814,
    34.78264132066033,
    56.27188594297149,
    86.20690345172586,
    44.77763881940971
  ],
  "b": [
    11.64422211105553,
    32.8336168084042,
    26.98654327163582,
    45.02751375687844,
    47.07648824412206,
    59.92006003001501,
    10.04502251125563,
    82.20890445222611,
    12.19394697348674,
    11.94407203601801,
    19.19044522261131,
    20.43981990995498,
    24.53776888444222,
    60.0200100050025,
    72.6137068534267,
    36.23191595797899,
    34.68269134567284,
    17.79114557278639,
    87.00650325162582,
    5.097498749374687,
    4.797648824412206,
    21.23941970985493,
    69.66518259129565,
    84.25787893946973,
    97.90105052526263,
    53.97303651825914,
    33.73316658329165,
    94.70265132566283,
    35.23241620810406,
    31.58424212106053,
    11.44432216108054,
    76.41180590295147,
    37.03151575787894,
    23.98804402201101,
    57.17143571785893,
    65.36733366683342,
    26.78664332166083,
    76.6616808404202,
    84.40780390195097,
    6.646723361680841,
    95.05247623811906,
    8.89559779889945,
    21.48929464732366,
    19.64022011005503,
    31.68419209604803,
    7.346373186593296,
    40.32986493246624,
    16.44182091045523,
    33.28339169584793,
    85.95702851425713,
    63.81810905452727,
    77.51125562781391,
    79.01050525262632,
    79.2104052026013,
    3.348374187093547,
    73.51325662831415,
    16.99154577288645,
    50.72466233116559,
    85.70715357678839,
    86.15692846423211,
    57.47128564282141,
    55.3223611805903,
    21.93906953476739,
    8.745672836418208,
    62.16893446723362,
    51.72416208104053,
    90.80460230115057,
    81.35932966483242,
    35.68219109554778,
    81.40930465232616,
    63.71815907953977,
    94.75262631315658,
    98.75062531265633,
    45.17743871935969,
    45.07748874437219,
    55.57223611805903,
    45.97703851925963,
    62.96853426713357,
    55.77213606803402,
    72.46378189094547,
    25.53726863431716,
    69.31535767883942,
    53.17343671835918,
    21.33936968484242,
    95.20240120060029,
    45.52726363181591,
    90.90455227613806,
    47.12646323161581,
    95.70215107553777,
    23.08849424712356,
    28.33586793396699,
    46.92656328164082,
    33.83311655827914,
    49.32536268134067,
    59.2703851925963,
    2.848624312156078,
    53.92306153076539,
    82.5087543771886,
    43.82811405702851,
    51.77413706853427,
    83.75812906453227,
    58.62071035517759,
    80.10995497748874,
    5.497298649324662,
    18.89059529764883,
    53.77313656828414,
    80.40980490245123,
    54.87258629314658,
    22.5887443721861,
    5.947073536768384,
    65.61720860430215,
    14.39284642321161,
    52.8735867933967,
    85.20740370185092,
    30.98454227113557,
    87.90605302651325,
    5.347373686843421,
    87.35632816408204,
    80.55972986493246,
    12.79364682341171,
    52.97353676838419,
    10.89459729864932,
    74.96253126563282,
    87.956028014007,
    6.296898449224612,
    22.38884442221111,
    97.10145072536268,
    77.56123061530765,
    98.85057528764382,
    35.73216608304153,
    2.148974487243622,
    92.70365182591296,
    91.85407703851925,
    16.39184592296148,
    95.80210105052527,
    78.5607303651826,
    67.1664332166083,
    23.63821910955478,
    7.596248124062031,
    88.45577788894447,
    98.35082541270636,
    73.61320660330165,
    49.22541270635318,
    27.13646823411706,
    95.75212606303151,
    65.81710855427714,
    97.6511755877939,
    95.00250125062531,
    7.44632316158079,
    59.02051025512757,
    32.23391695847924,
    52.72366183091546,
    18.94057028514257,
    93.80310155077538,
    80.30985492746373,
    28.38584292146073,
    40.22991495747874,
    62.66868434217109,
    54.02301150575288,
    59.57023511755878,
    17.34137068534267,
    85.65717858929465,
    32.78364182091046,
    18.74067033516759,
    63.51825912956479,
    77.26138069034516,
    38.23091545772887,
    1.399349674837419,
    77.01150575287643,
    9.945072536268134,
    59.97003501750876,
    47.17643821910956,
    77.81110555277638,
    70.61470735367683,
    80.65967983991996,
    98.2009004502251,
    83.45827913956978,
    20.53976988494247,
    84.95752876438219,
    11.59424712356178,
    15.79214607303652,
    38.08099049524763,
    28.135967983992,
    16.69169584792396,
    39.08049024512256,
    64.21790895447724,
    93.6032016008004,
    27.23641820910456,
    98.55072536268133,
    64.56773386693347,
    75.1624312156078,
    87.1064532266133,
    55.67218609304653,
    73.86308154077038,
    31.88409204602301,
    73.31335667833916,
    63.36833416708355,
    88.50575287643822,
    35.33236618309155,
    83.80810405202601,
    68.6656828414207,
    24.63771885942972,
    60.11995997999,
    68.21590795397698,
    53.32336168084042,
    11.54427213606803,
    19.54027013506754,
    98.5007503751876,
    14.14297148574287,
    56.52176088044023,
    61.01950975487744,
    70.86458229114557,
    92.30385192596297,
    61.16943471735868,
    28.58574287143572,
    77.46128064032015,
    86.70665332666333,
    25.03751875937969,
    20.33986993496748,
    55.87208604302151,
    26.43681840920461,
    73.46328164082041,
    17.64122061030515,
    59.52026013006503,
    48.52576288144073,
    94.40280140070035,
    52.82361180590296,
    57.87108554277139,
    24.33786893446723,
    18.19094547273637,
    53.47328664332166,
    26.68669334667334,
    46.5767383691846,
    14.54277138569285,
    6.896598299149574,
    0.6497248624312156,
    3.098499249624813,
    73.66318159079539,
    27.48629314657329,
    44.127963981991,
    28.43581790895448,
    42.82861430715358,
    34.93256628314158,
    17.94107053526763,
    38.13096548274137,
    99.20040020010005,
    60.8695847923962,
    19.74017008504253,
    65.16743371685843,
    48.42581290645323,
    14.79264632316158,
    8.995547773886944,
    65.31735867933966,
    44.87758879439721,
    0.89959979989995,
    18.79064532266133,
    80.059979989995,
    3.898099049524763,
    68.56573286643321,
    38.33086543271636,
    91.55422711355678,
    37.93106553276639,
    26.38684342171086,
    16.64172086043022,
    66.61670835417709,
    34.23291645822912,
    7.246423211605803,
    3.2983991995998,
    22.83861930965483,
    57.6711855927964,
    9.04552276138069,
    54.67268634317159,
    75.36233116558279,
    40.27988994497249,
    50.47478739369685,
    31.63421710855428,
    12.69369684842421,
    48.22591295647824,
    100,
    78.91055527763882,
    68.16593296648324,
    39.63021510755378,
    34.58274137068535,
    59.62021010505253,
    58.47078539269635,
    70.2648824412206,
    19.94007003501751,
    97.15142571285642,
    47.72616308154078,
    58.72066033016509,
    67.41630815407703,
    43.3783391695848,
    18.34087043521761,
    32.68369184592297,
    71.964032016008,
    92.0040020010005,
    4.397848924462231,
    19.44032016008004,
    16.29189594797399,
    49.52526263131566,
    58.37083541770886,
    23.38834417208605,
    10.14497248624312,
    82.05897948974487,
    74.91255627813906,
    56.57173586793397,
    57.92106053026514,
    72.76363181590796,
    12.74367183591796,
    5.797148574287143,
    27.93606803401701,
    81.15942971485742,
    58.4208104052026,
    20.28989494747374,
    49.47528764382191,
    2.548774387193597,
    44.07798899449725,
    32.88359179589795,
    92.103951975988,
    6.146973486743372,
    28.63571785892947,
    6.846623311655827,
    91.60420210105052,
    1.849124562281141,
    60.2199099549775,
    0.5497748874437218,
    29.03551775887944,
    61.06948474237119,
    55.27238619309655,
    25.58724362181091,
    57.22141070535268,
    37.48129064532267,
    34.38284142071036,
    86.4567783891946,
    89.00550275137569,
    70.76463231615807,
    14.69269634817409,
    89.75512756378188,
    2.098999499749875,
    20.9895447723862,
    90.00500250125063,
    97.95102551275637,
    31.48429214607304,
    33.43331665832917,
    56.47178589294648,
    2.34887443721861,
    30.43481740870435,
    36.28189094547274,
    66.11695847923961,
    46.67668834417209,
    25.18744372186093,
    31.53426713356679,
    42.22891445722862,
    88.25587793896948,
    22.43881940970486,
    9.595247623811906,
    71.56423211605802,
    38.03101550775388,
    60.51975987993998,
    84.80760380190095,
    85.30735367683842,
    61.56923461730866,
    19.34037018509255,
    82.25887943971986,
    27.2863931965983,
    22.33886943471736,
    86.75662831415707,
    56.62171085542771,
    16.1919459729865,
    11.99404702351176,
    49.27538769384692,
    82.65867933966983,
    60.26988494247124,
    10.99454727363682,
    10.59474737368684,
    12.34387193596798,
    30.28489244622311,
    75.61220610305152,
    5.447323661830915,
    37.33136568284142,
    87.20640320160079,
    51.12446223111556,
    7.946073036518259,
    17.04152076038019,
    39.78014007003502,
    67.46628314157078,
    72.66368184092046,
    97.85107553776888,
    51.82411205602801,
    16.59174587293647,
    80.95952976488243,
    69.91505752876438,
    43.62821410705353,
    92.80360180090045,
    94.15292646323161,
    91.65417708854427,
    93.70315157578789,
    58.77063531765883,
    40.82961480740371,
    64.41780890445223,
    67.31635817908955,
    5.997048524262131,
    5.147473736868434,
    54.97253626813407,
    78.06098049024511,
    48.32586293146574,
    44.72766383191596,
    90.15492746373187,
    9.645222611305654,
    33.38334167083542,
    26.23691845922962,
    81.05947973986993,
    34.33286643321661,
    4.347873936968484,
    54.42281140570285,
    89.40530265132566,
    78.3608304152076,
    86.85657828914457,
    37.7311655827914,
    51.17443721860931,
    94.95252626313156,
    12.94357178589295,
    14.99254627313657,
    57.57123561780891,
    50.02501250625313,
    98.80060030015007,
    83.60820410205102,
    85.40730365182591,
    80.8096048024012,
    81.60920460230115,
    0.2499249624812406,
    70.06498249124562,
    72.9135567783892,
    57.37133566783392,
    94.2528764382191,
    47.4263131565783,
    71.46428214107053,
    44.47778889444723,
    43.42831415707854,
    64.51775887943971,
    32.18394197098549,
    35.43231615807904,
    70.31485742871435,
    38.18094047023512,
    45.87708854427214,
    84.45777888944473,
    2.648724362181091,
    94.50275137568784,
    64.16793396698348,
    74.01300650325162,
    86.30685342671336,
    43.52826413206603,
    94.90255127563782,
    45.47728864432217,
    9.295397698849424,
    92.6536768384192,
    44.42781390695348,
    13.39334667333667,
    34.83261630815408,
    95.30235117558779,
    89.05547773886943,
    28.28589294647324,
    29.28539269634818,
    96.6017008504252,
    37.18144072036019,
    22.53876938469235,
    28.93556778389195,
    27.83611805902952,
    67.56623311655828,
    12.24392196098049,
    73.01350675337669,
    56.22191095547774,
    38.88059029514758,
    45.82711355677839,
    88.8056028014007,
    40.52976488244122,
    59.22041020510255,
    50.37483741870935,
    24.43781890945473,
    55.97203601800901,
    62.86858429214607,
    91.20440220110055,
    44.37783891945973,
    91.75412706353177,
    88.00600300150074,
    53.67318659329665,
    58.22091045522762,
    10.24492246123062,
    66.66668334167083,
    21.43931965982992,
    83.20840420210105,
    81.30935467733866,
    46.37683841920961,
    16.8416208104052,
    52.07398699349675,
    51.02451225612807,
    85.90705352676338,
    98.10095047523761,
    74.06298149074537,
    26.13696848424213,
    37.58124062031015,
    37.28139069534767,
    95.55222611305652,
    82.3088544272136,
    99.80010005002501,
    18.24092046023012,
    5.297398699349674,
    58.97053526763382,
    69.51525762881441,
    33.7831415707854,
    52.62371185592797,
    10.79464732366183,
    93.90305152576288,
    16.091995997999,
    59.87008504252126,
    44.52776388194097,
    31.93406703351676,
    14.44282141070535,
    20.040020010005,
    36.38184092046023,
    63.2184092046023,
    74.66268134067033,
    76.31185592796398,
    40.47978989494748,
    54.4727863931966,
    50.92456228114057,
    59.67018509254628,
    76.51175587793897,
    65.26738369184592,
    9.495297648824412,
    42.57873936968485,
    74.16293146573287,
    26.73666833416708,
    7.546273136568284,
    93.75312656328164,
    27.3863431715858,
    78.16093046523261,
    71.86408204102051,
    31.28439219609805,
    57.27138569284643,
    76.111955977989,
    4.297898949474737,
    72.41380690345173,
    5.747173586793396,
    19.69019509754878,
    60.61970985492746,
    52.42381190595298,
    93.65317658829414,
    34.88259129564783,
    15.09249624812406,
    45.57723861930966,
    54.62271135567784,
    73.36333166583292,
    29.48529264632316,
    35.2823911955978,
    65.76713356678339,
    64.01800900450225,
    71.36433216608305,
    5.197448724362181,
    69.11545772886443,
    66.06698349174587,
    62.11895947973987,
    27.78614307153577,
    17.24142071035518,
    99.55022511255628,
    38.78064032016008,
    77.31135567783892,
    86.2568784392196,
    94.4527763881941,
    36.8815907953977,
    92.7536268134067,
    75.11245622811406,
    13.54327163581791,
    1.549274637318659,
    37.83111555777889,
    97.40130065032515,
    84.008004002001,
    32.38384192096049,
    7.696198099049525,
    8.345872936468234,
    25.28739369684843,
    27.58624312156078,
    75.86208104052025,
    27.98604302151076,
    94.55272636318159,
    8.695697848924462,
    85.50725362681341,
    69.71515757878939,
    74.21290645322661,
    94.05297648824411,
    72.11395697848924,
    65.71715857928965,
    64.6177088544272,
    93.40330165082541,
    5.647223611805903,
    47.67618809404703,
    2.948574287143572,
    74.36283141570784,
    11.34437218609305,
    68.36583291645823,
    49.02551275637819,
    9.445322661330666,
    22.98854427213607,
    83.1584292146073,
    6.696698349174588,
    74.81260630315157,
    49.87508754377189,
    87.55622811405702,
    29.18544272136068,
    11.79414707353677,
    0.5997498749374688,
    94.20290145072536,
    70.96453226613306,
    84.15792896448224,
    57.97103551775889,
    63.96803401700851,
    35.58224112056028,
    56.12196098049025,
    39.13046523261631,
    44.22791395697849,
    79.86008004002001,
    32.083991995998,
    51.3743371685843,
    92.60370185092546,
    55.72216108054027,
    76.0120060030015,
    1.649224612306153,
    9.19544772386193,
    69.26538269134566,
    54.22291145572787,
    67.66618309154578,
    82.80860430215107,
    76.7616308154077,
    13.59324662331166,
    79.9600300150075,
    38.53076538269135,
    49.42531265632817,
    59.42031015507754,
    86.65667833916959,
    29.38534267133567,
    56.42181090545273,
    84.8575787893947,
    61.46928464232116,
    9.795147573786894,
    2.798649324662331,
    63.56823411705853,
    24.28789394697349,
    3.598249124562281,
    36.93156578289145,
    24.68769384692346,
    56.97153576788394,
    52.27388694347174,
    93.10345172586293,
    97.20140070035018,
    66.96653326663332,
    0.4498249124562281,
    5.69719859929965,
    83.65817908954477,
    36.63171585792897,
    4.697698849424712,
    73.76313156578288,
    97.00150075037519,
    18.04102051025513,
    45.92706353176589,
    79.56023011505752,
    30.63471735867934,
    4.847623811905953,
    69.16543271635818,
    52.52376188094048,
    99.9000500250125,
    3.14847423711856,
    56.0719859929965,
    41.92906453226614,
    42.27888944472237,
    64.66768384192096,
    28.53576788394197,
    28.48579289644823,
    1.249424712356178,
    84.90755377688843,
    15.94207103551776,
    36.43181590795398,
    65.11745872936469,
    14.94257128564282,
    65.46728364182091,
    76.81160580290145,
    32.98354177088545,
    76.91155577788894,
    11.74417208604302,
    82.00900450225112,
    30.38484242121061,
    78.11095547773887,
    71.61420710355178,
    96.25187593796898,
    77.91105552776388,
    92.15392696348174,
    8.845622811405702,
    21.98904452226113,
    91.70415207603801,
    41.82911455727864,
    84.1079539769885,
    79.41030515257629,
    71.81410705352675,
    68.06598299149574,
    90.4048024012006,
    8.595747873936968,
    76.06198099049524,
    86.3568284142071,
    29.68519259629815,
    83.10845422711355,
    3.798149074537269,
    7.046523261630815,
    92.45377688844422,
    65.51725862931465,
    21.58924462231116,
    83.00850425212606,
    72.96353176588293,
    22.28889444722362,
    43.2783891945973,
    91.30435217608805,
    72.21390695347674,
    6.4967983991996,
    28.8855927963982,
    29.13546773386694,
    62.31885942971486,
    43.67818909454728,
    96.50175087543772,
    50.67468734367184,
    13.29339669834918,
    69.96503251625812,
    77.36133066533266,
    1.749174587293647,
    70.4647823911956,
    15.44232116058029,
    99.15042521260631,
    9.895097548774388,
    67.76613306653326,
    99.30035017508754,
    38.83061530765383,
    89.6551775887944,
    58.07098549274637,
    39.88009004502251,
    19.99004502251126,
    54.32286143071536,
    31.83411705852927,
    90.95452726363182,
    61.66918459229615,
    39.68019009504753,
    7.096498249124562,
    86.10695347673837,
    28.9855427713857,
    58.32086043021511,
    42.97853926963482,
    27.43631815907954,
    3.998049024512256,
    0.6996998499249625,
    29.88509254627314,
    83.70815407703851,
    56.67168584292146,
    63.66818409204603,
    42.72866433216608,
    1.299399699849925,
    41.52926463231616,
    88.10595297648824,
    38.43081540770385,
    85.15742871435718,
    3.94807403701851,
    52.37383691845923,
    39.58024012006003,
    29.78514257128565,
    97.60120060030015,
    77.71115557778889,
    30.58474237118559,
    71.66418209104552,
    25.93706853426714,
    75.21240620310155,
    55.42231115557779,
    29.6352176088044,
    34.03301650825413,
    71.0145072536268,
    31.73416708354177,
    71.2144072036018,
    55.02251125562782,
    60.41980990495248,
    81.95902951475738,
    67.26638319159579,
    91.904052026013,
    27.63621810905453,
    33.88309154577289,
    8.195947973986993,
    18.14097048524262,
    90.3048524262131,
    77.61120560280139,
    96.65167583791896,
    32.48379189594797,
    69.36533266633316,
    97.75112556278138,
    63.76813406703352,
    61.91905952976489,
    4.09799899949975,
    90.55472736368183,
    32.58374187093547,
    51.62421210605303,
    21.08949474737369,
    66.01700850425212,
    58.12096048024012,
    38.93056528264133,
    24.38784392196098,
    89.25537768884442,
    41.02951475737869,
    30.23491745872937,
    72.0639819909955,
    72.86358179089544,
    43.07848924462231,
    90.2049024512256,
    60.46978489244623,
    13.44332166083042,
    71.76413206603301,
    52.17393696848425,
    27.53626813406704,
    96.75162581290645,
    70.21490745372687,
    64.9175587793897,
    41.7791395697849,
    15.74217108554277,
    8.495797898949474,
    12.8935967983992,
    68.8655827913957,
    76.16193096548274,
    50.87458729364683,
    6.346873436718359,
    57.62121060530266,
    38.98054027013507,
    85.25737868934468,
    85.10745372686343,
    51.2743871935968,
    75.66218109054527,
    81.45927963981991,
    20.8895947973987,
    43.22841420710355,
    27.18644322161081,
    37.53126563281641,
    21.03951975987994,
    70.66468234117058,
    66.36683341670835,
    29.23541770885443,
    64.76763381690846,
    8.945572786393196,
    76.61170585292646,
    77.41130565282641,
    74.71265632816407,
    54.27288644322162,
    17.74117058529265,
    35.18244122061031,
    18.5407703851926,
    16.49179589794898,
    41.17943971985994,
    99.45027513756878,
    1.599249624812406,
    0.9495747873936968,
    84.35782891445723,
    17.59124562281141,
    57.72116058029015,
    80.75962981490746,
    51.87408704352176,
    84.7576288144072,
    4.747673836918459,
    62.76863431715859,
    4.497798899449725,
    87.85607803901951,
    17.29139569784893,
    92.25387693846923,
    18.29089544772386,
    0.7996498249124563,
    98.00100050025013,
    28.73566783391696,
    97.5512256128064,
    41.22941470735368,
    1.349374687343672,
    43.92806403201601,
    65.5672336168084,
    43.12846423211606,
    48.77563781890946,
    81.75912956478238,
    46.07698849424713,
    6.996548274137068,
    65.86708354177088,
    55.17243621810906,
    12.29389694847424,
    54.92256128064032,
    43.87808904452226,
    10.4448224112056,
    58.92056028014007,
    46.4767883941971,
    0.3998499249624813,
    77.21140570285142,
    88.7056528264132,
    25.43731865932967,
    66.26688344172085,
    36.33186593296649,
    96.7016508254127,
    84.30785392696347,
    92.95352676338169,
    53.07348674337169,
    99.60020010005002,
    17.49129564782391,
    22.63871935967984,
    21.28939469734868,
    48.37583791895948,
    41.27938969484742,
    37.98104052026013,
    8.046023011505753,
    1.049524762381191,
    95.60220110055027,
    91.05447723861931,
    86.00700350175087,
    1.799149574787394,
    13.19344672336168,
    7.896098049024512,
    3.698199099549775,
    58.67068534267134,
    78.96053026513256,
    98.60070035017509,
    79.46028014007003,
    74.26288144072036,
    69.86508254127064,
    30.33486743371686,
    29.98504252126063,
    2.248924462231116,
    73.26338169084542,
    75.56223111555778,
    48.12596298149075,
    41.72916458229115,
    40.97953976988494,
    64.8176088044022,
    41.42931465732867,
    24.58774387193597,
    30.68469234617309,
    13.99304652326163,
    39.18044022011006,
    24.0879939969985,
    82.10895447723861,
    72.31385692846423,
    12.84362181090545,
    51.47428714357179,
    36.98154077038519,
    50.62471235617809,
    73.71315657828914,
    85.00750375187593,
    59.77013506753377,
    21.13946973486744,
    37.6312156078039,
    27.33636818409205,
    25.78714357178589,
    84.5577288644322,
    49.92506253126564,
    25.38734367183592,
    31.98404202101051,
    66.16693346673337,
    16.79164582291146,
    2.298899449724863,
    82.60870435217609,
    20.08999499749875,
    73.16343171585793,
    44.67768884442221,
    78.71065532766383,
    49.72516258129065,
    3.648224112056028,
    18.69069534767384,
    95.10245122561281,
    45.77713856928465,
    80.50975487743872,
    49.07548774387194,
    5.047523761880941,
    7.996048024012006,
    75.26238119059529,
    18.59074537268635,
    48.47578789394698,
    41.12946473236619,
    64.36783391695847,
    45.42731365682842,
    79.31035517758879,
    18.44082041020511,
    47.37633816908455,
    1.999049524762381,
    0.7496748374187093,
    68.46578289144571,
    89.95502751375687,
    35.93206603301651,
    42.32886443221611,
    21.53926963481741,
    60.91955977988995,
    63.3183591795898,
    19.14047023511756,
    15.04252126063031,
    39.73016508254128,
    37.23141570785393,
    88.85557778889445,
    86.20690345172586,
    61.61920960480241,
    23.68819409704853,
    98.45077538769384,
    83.55822911455728,
    32.03401700850425,
    75.912056028014,
    42.5287643821911,
    15.49229614807404,
    10.09499749874938,
    5.84712356178089,
    11.69419709854927,
    53.42331165582792,
    25.98704352176088,
    75.51225612806402,
    22.93856928464232,
    37.43131565782892,
    72.16393196598298,
    93.20340170085042,
    10.94457228614307,
    55.47228614307154,
    92.55372686343172,
    52.22391195597799,
    10.19494747373687,
    63.41830915457729,
    27.68619309654828,
    17.99104552276138,
    55.62221110555278,
    35.38234117058529,
    15.89209604802401,
    36.48179089544772,
    30.18494247123562,
    21.88909454727364,
    45.12746373186594,
    37.88109054527264,
    74.86258129064532,
    39.83011505752877,
    90.25487743871936,
    72.56373186593297,
    15.54227113556778,
    13.24342171085543,
    28.08599299649825,
    9.54527263631816,
    30.13496748374187,
    31.13446723361681,
    37.78114057028515,
    35.53226613306654,
    0.2998999499749875,
    42.67868934467234,
    64.11795897948974,
    66.5167583791896,
    46.62671335667834,
    44.82761380690346,
    34.4328164082041,
    58.27088544272137,
    75.41230615307653,
    14.19294647323662,
    29.08549274637319,
    49.17543771885943,
    59.72016008004002,
    96.45177588794397,
    93.45327663831915,
    0.499799899949975,
    54.77263631815908,
    78.81060530265133,
    23.58824412206103,
    18.39084542271136,
    65.96703351675838,
    17.39134567283642,
    80.35982991495747,
    53.12346173086544,
    78.01100550275137,
    7.196448224112056,
    0.1999499749874938,
    3.748174087043522,
    22.13896948474237,
    42.77863931965983,
    14.34287143571786,
    35.83211605802902,
    76.56173086543271,
    40.77963981990996,
    79.66018009004502,
    56.02201100550275,
    16.04202101050526,
    3.548274137068534,
    99.75012506253127,
    26.88659329664832,
    48.27588794397199,
    21.6392196098049,
    35.13246623311656,
    45.22741370685343,
    58.17093546773387,
    14.4927963981991,
    83.85807903951975,
    46.72666333166583,
    74.61270635317659,
    6.196948474237119,
    85.75712856428214,
    96.40180090045023,
    46.77663831915958,
    36.1319659829915,
    52.47378689344673,
    34.98254127063532,
    13.14347173586793,
    82.85857928964482,
    93.30335167583792,
    11.19444722361181,
    18.64072036018009,
    68.81560780390195,
    32.53376688344172,
    57.02151075537769,
    68.016008004002,
    25.13746873436719,
    55.52226113056528,
    44.97753876938469,
    92.05397698849424,
    93.50325162581291,
    13.49329664832416,
    87.25637818909455,
    26.18694347173587,
    59.32036018009005,
    32.63371685842922,
    8.24592296148074,
    17.09149574787394,
    41.37933966983492,
    80.7096548274137,
    13.94307153576788,
    80.20990495247624,
    69.81510755377688,
    10.69469734867434,
    19.49029514757379,
    11.84412206103051,
    88.40580290145073,
    95.45227613806904,
    28.68569284642322,
    59.3703351675838,
    23.28839419709855,
    80.01000500250125,
    30.53476738369185,
    18.99054527263632,
    18.84062031015508,
    21.7391695847924,
    87.05647823911956,
    24.9375687843922,
    63.11845922961481,
    5.897098549274637,
    85.85707853926964,
    65.41730865432716,
    43.02851425712857,
    8.0959979989995,
    21.83911955977989,
    88.55572786393196,
    75.0624812406203,
    45.37733866933467,
    87.50625312656328,
    38.5807403701851,
    3.848124062031016,
    44.02801400700351,
    33.93306653326663,
    51.22441220610305,
    39.23041520760381,
    75.46228114057028,
    81.65917958979489,
    78.86058029014507,
    32.73366683341671,
    85.05747873936969,
    52.67368684342171,
    96.051975987994,
    60.36983491745873,
    62.26888444222111,
    78.41080540270134,
    16.24192096048024,
    90.75462731365683,
    12.54377188594297,
    41.62921460730365,
    50.4248124062031,
    8.645722861430714,
    33.53326663331666,
    44.62771385692847,
    33.23341670835418,
    81.80910455227614,
    44.92756378189095,
    26.63671835917959,
    30.78464232116058,
    49.97503751875939,
    87.75612806403201,
    52.92356178089045,
    35.78214107053527,
    92.20390195097549,
    68.91555777888944,
    67.0664832416208,
    41.6791895947974,
    97.70115057528764,
    89.15542771385692,
    50.97453726863432,
    77.66118059029515,
    75.71215607803902,
    88.65567783891946,
    9.145472736368184,
    81.70915457728864,
    8.545772886443222,
    73.21340670335167,
    54.12296148074037,
    17.89109554777389,
    11.04452226113056,
    35.48229114557279,
    40.67968984492246,
    90.05497748874437,
    67.36633316658329,
    9.395347673836918,
    50.27488744372187,
    85.45727863931965,
    38.63071535767885,
    27.73616808404202,
    67.11645822911456,
    4.8975987993997,
    52.02401200600301,
    1.949074537268634,
    0.8496248124062031,
    22.23891945972987,
    3.448324162081041,
    99.70015007503751,
    53.37333666833417,
    63.86808404202102,
    25.63721860930465,
    10.5447723861931,
    17.84112056028014,
    52.1239619809905,
    40.87958979489745,
    94.60270135067533,
    26.48679339669835,
    23.73816908454227,
    22.08899449724863,
    83.25837918959479,
    84.6576788394197,
    31.08449224612306,
    86.80660330165082,
    91.10445222611305,
    98.05097548774387,
    47.02651325662832,
    90.5047523761881,
    64.86758379189594,
    84.20790395197598,
    37.68119059529765,
    94.10295147573787,
    36.83161580790396,
    88.35582791395697,
    10.74467233616808,
    69.76513256628314,
    29.33536768384192,
    42.62871435717859,
    48.67568784392196,
    93.55322661330665,
    0.9995497748874437,
    26.5367683841921,
    35.08249124562281,
    8.445822911455728,
    33.48329164582292,
    47.52626313156578,
    87.40630315157578,
    76.21190595297648,
    4.24792396198099,
    71.71415707853927,
    80.45977988994497,
    66.71665832916457,
    15.3423711855928,
    97.45127563781891,
    91.50425212606302,
    64.31785892946473,
    31.18444222111056,
    6.246923461730865,
    30.03501750875438,
    59.12046023011506,
    83.50825412706352,
    66.3168584292146,
    90.60470235117559,
    6.396848424212106,
    30.4847923961981,
    24.78764382191096,
    32.43381690845423,
    4.997548774387194,
    48.075987993997,
    96.20190095047523,
    53.22341170585293,
    97.25137568784392,
    46.27688844422212,
    57.82111055527764,
    71.26438219109555,
    66.76663331665833,
    13.69319659829915,
    50.5247623811906,
    84.05797898949474,
    15.64222111055528,
    26.83661830915458,
    22.88859429714858,
    61.26938469234618,
    84.50775387693847,
    55.12246123061531,
    8.795647823911956,
    7.646223111555778,
    40.37983991995998,
    31.23441720860431,
    67.51625812906452,
    49.57523761880941,
    63.16843421710855,
    6.796648324162081,
    40.57973986993497,
    4.447823911955978,
    12.64372186093047,
    67.91605802901451,
    6.047023511755878,
    49.77513756878439,
    19.59024512256128,
    82.4088044022011,
    34.73266633316658,
    30.08499249624813,
    74.5127563781891,
    44.77763881940971,
    95.35232616308154,
    31.03451725862932,
    32.13396698349175,
    32.9335667833917,
    73.11345672836418,
    80.15992996498248,
    73.41330665332666,
    36.68169084542271,
    30.93456728364182,
    93.05347673836918,
    63.26838419209605,
    68.71565782891446,
    90.10495247623811,
    96.1519259629815,
    9.245422711355678,
    13.34337168584292,
    31.78414207103552,
    26.58674337168585,
    76.71165582791396,
    68.7656328164082,
    75.01250625312656,
    23.43831915957979,
    92.90355177588795,
    62.36883441720861,
    48.02601300650326,
    20.63971985992997,
    75.96203101550775,
    24.98754377188595,
    99.00050025012506,
    68.51575787893947,
    78.61070535267633,
    48.17593796898449,
    62.41880940470236,
    99.85007503751876,
    23.53826913456729,
    93.25337668834418,
    9.095497748874438,
    70.16493246623311,
    68.41580790395197,
    62.71865932966484,
    21.68919459729865,
    99.50025012506254,
    53.57323661830916,
    10.29489744872436,
    82.70865432716359,
    51.32436218109055,
    78.66068034017009,
    79.76013006503251,
    70.91455727863932,
    42.17893946973487,
    57.12146073036519,
    78.76063031515757,
    46.87658829414708,
    61.7191595797899,
    56.77163581790896,
    9.995047523761881,
    76.96153076538269,
    93.15342671335668,
    46.52676338169085,
    37.08149074537269,
    70.01500750375187,
    71.91405702851425,
    30.83461730865433,
    29.58524262131066,
    33.03351675837919,
    8.295897948974487,
    12.59374687343672,
    60.66968484242121,
    28.18594297148574,
    84.70765382691346,
    17.14147073536769,
    55.07248624312157,
    96.00200100050024,
    40.62971485742872,
    61.51925962981491,
    43.57823911955978,
    1.899099549774887,
    8.145972986493247,
    20.58974487243622,
    30.73466733366683,
    87.15642821410705,
    42.37883941970986,
    74.56273136568284,
    22.4887943971986,
    68.31585792896448,
    44.27788894447224,
    30.88459229614808,
    36.78164082041021,
    99.25037518759379,
    95.90205102551275,
    4.547773886943472,
    62.4687843921961,
    64.46778389194597,
    88.155927963982,
    69.61520760380189,
    27.03651825912957,
    66.81660830415207,
    2.49879939969985,
    37.13146573286644,
    52.57373686843422,
    19.04052026013007,
    12.44382191095548,
    23.93806903451726,
    32.28389194597299,
    67.96603301650825,
    89.10545272636318,
    39.03051525762881,
    51.57423711855928,
    23.13846923461731,
    93.00350175087543,
    74.3128564282141,
    3.198449224612306,
    19.2903951975988,
    82.90855427713856,
    7.796148074037019,
    41.57923961980991,
    49.12546273136569,
    7.296398199099549,
    34.5327663831916,
    83.95802901450725,
    34.13296648324162,
    29.93506753376689,
    61.21940970485243,
    51.52426213106553,
    56.171935967984,
    79.16043021510755,
    45.67718859429715,
    47.47628814407204,
    46.12696348174087,
    92.50375187593797,
    6.546773386693347,
    13.84312156078039,
    50.07498749374687,
    14.09299649824912,
    53.52326163081541,
    54.82261130565283,
    41.07948974487244,
    22.78864432216108,
    39.3303651825913,
    40.17993996998499,
    56.82161080540271,
    20.93956978489245,
    82.15892946473237,
    29.43531765882942,
    85.35732866433216,
    11.2943971985993,
    69.56523261630815,
    33.33336668334167,
    47.57623811905953,
    66.86658329164582,
    75.76213106553277,
    68.96553276638319,
    99.95002501250625,
    39.48029014507254,
    70.81460730365183,
    91.80410205102551,
    73.96303151575788,
    39.53026513256629,
    87.60620310155078,
    48.9255627813907,
    24.03801900950475,
    16.14197098549275,
    13.09349674837419,
    5.597248624312156,
    13.79314657328664,
    2.198949474737369,
    74.46278139069534,
    60.71965982991496,
    98.70065032516258,
    16.9415707853927,
    24.18794397198599,
    80.90955477738869,
    81.25937968984492,
    26.93656828414207,
    48.87558779389695,
    55.92206103051526,
    17.44132066033017,
    39.38034017008505,
    75.31235617808905,
    42.07898949474738,
    62.61870935467734,
    96.30185092546273,
    62.01900950475238,
    61.81910955477739,
    56.9215607803902,
    95.50225112556278,
    87.70615307653827,
    94.80260130065032,
    86.95652826413206,
    91.35432716358179,
    60.76963481740871,
    92.35382691345673,
    99.35032516258129,
    36.73166583291646,
    41.87908954477239,
    2.898599299649825,
    56.32186093046523,
    47.27638819409705,
    48.62571285642822,
    6.446823411705853,
    1.149474737368684,
    33.6831915957979,
    98.95052526263132,
    60.06998499249625,
    90.65467733866933,
    52.32386193096549,
    66.4168084042021,
    24.83761880940471,
    60.81960980490246,
    51.97403701850926,
    25.73716858429215,
    1.499299649824913,
    98.90055027513756,
    67.21640820410205,
    69.06548274137069,
    26.33686843421711,
    43.72816408204103,
    67.71615807903952,
    60.56973486743372,
    11.14447223611806,
    99.65017508754377,
    34.28289144572286,
    79.26038019009505,
    22.73866933466734,
    20.18994497248624,
    15.69219609804902,
    86.55672836418209,
    53.62321160580291,
    2.598749374687344,
    97.50125062531265,
    46.42681340670335,
    3.498299149574787,
    13.7431715857929,
    33.13346673336669,
    45.32736368184092,
    9.745172586293146,
    20.1399699849925,
    46.22691345672837,
    24.88759379689845,
    96.35182591295647,
    17.19144572286143,
    93.85307653826914,
    21.78914457228614,
    10.34487243621811,
    22.68869434717359,
    73.56323161580791,
    95.852076038019,
    95.25237618809405,
    58.5207603801901,
    49.6751875937969,
    22.18894447223612,
    1.449324662331166,
    9.345372686343172,
    78.31085542771386,
    12.99354677338669,
    81.5592296148074,
    21.38934467233617,
    29.53526763381691,
    35.88209104552276,
    82.95852926463232,
    98.3008504252126,
    15.39234617308654,
    91.40430215107554,
    81.85907953976988,
    47.87608804402201,
    76.46178089044523,
    33.98304152076038,
    73.06348174087043,
    15.19244622311156,
    4.947573786893447,
    81.10945472736368,
    91.1544272136068,
    63.46828414207104,
    23.2384192096048,
    39.93006503251626,
    86.40680340170084,
    58.87058529264633,
    58.57073536768385,
    79.61020510255128,
    49.62521260630316,
    39.98004002001001,
    62.91855927963982,
    43.47828914457229,
    25.88709354677339,
    61.36933466733367,
    64.7176588294147,
    77.76113056528264,
    65.21740870435217,
    57.32136068034017,
    88.75562781390695,
    89.80510255127564,
    65.06748374187093,
    31.43431715857929,
    19.09049524762381,
    62.06898449224612,
    97.35132566283141,
    83.05847923961981,
    98.65067533766883,
    54.72266133066534,
    24.13796898449225,
    27.08649324662331,
    0.1499749874937469,
    81.50925462731365,
    93.35332666333166,
    40.72966483241621,
    33.08349174587294,
    23.78814407203602,
    1.099499749874937,
    41.47928964482242,
    76.26188094047023,
    15.84212106053027,
    89.70515257628814,
    67.86608304152075,
    36.18194097048524,
    89.5552276138069,
    6.596748374187094,
    85.55722861430715,
    62.51875937968985,
    47.2264132066033,
    70.41480740370184,
    89.30535267633816,
    47.92606303151576,
    56.87158579289645,
    45.27738869434717,
    40.12996498249124,
    27.88609304652326,
    83.30835417708855,
    51.42431215607805,
    51.92406203101551,
    89.85507753876938,
    15.99204602301151,
    87.80610305152577,
    7.396348174087043,
    79.36033016508254,
    72.36383191595797,
    80.25987993996998,
    78.51075537768884,
    40.9295647823912,
    65.91705852926462,
    12.09399699849925,
    37.38134067033517,
    15.29239619809905,
    14.24292146073036,
    15.14247123561781,
    73.81310655327664,
    6.946573286643321,
    54.37283641820911,
    91.00450225112556,
    68.61570785392696,
    94.3528264132066,
    88.20590295147574,
    41.97903951975988,
    12.143971985993,
    25.23741870935468,
    43.17843921960981,
    19.24042021010505,
    18.49079539769885,
    23.18844422211106,
    50.82461230615308,
    70.11495747873937,
    87.30635317658829,
    96.95152576288145,
    48.97553776888444,
    72.8136068034017,
    11.09449724862431,
    86.05697848924461,
    34.18294147073537,
    46.17693846923462,
    77.96103051525762,
    96.85157578789395,
    85.80710355177588,
    88.95552776388193,
    4.597748874437219,
    44.32786393196599,
    74.11295647823911,
    69.01550775387693,
    97.05147573786893,
    20.23991995997999,
    51.67418709354678,
    45.7271635817909,
    2.998549274637319,
    42.87858929464733,
    7.746173086543272,
    5.247423711855927,
    57.07148574287144,
    63.91805902951476,
    53.82311155577789,
    66.91655827913957,
    69.41530765382691,
    48.57573786893447,
    13.04352176088044,
    43.32836418209105,
    64.067983991996,
    25.6871935967984,
    4.048024012006003,
    15.2424212106053,
    9.84512256128064,
    28.23591795897949,
    39.43031515757879,
    55.2224112056028,
    5.547273636818409,
    69.46528264132066,
    71.16443221610805,
    14.89259629814907,
    77.16143071535768,
    79.71015507753877,
    2.448824412206103,
    78.21090545272637,
    48.82561280640321,
    16.89159579789895,
    40.03001500750376,
    99.05047523761881,
    74.76263131565783,
    13.6432216108054,
    82.55872936468234,
    28.0360180090045,
    96.90155077538769,
    99.40030015007504,
    39.28039019509755,
    38.68069034517259,
    99.10045022511255,
    41.32936468234117,
    29.7351675837919,
    47.3263631815908,
    80.6097048524262,
    44.17793896948474,
    89.90505252626313,
    61.86908454227114,
    98.25087543771886,
    56.72166083041521,
    72.51375687843921,
    24.48779389694848,
    69.21540770385192,
    20.83961980990496,
    72.7136568284142,
    10.64472236118059,
    14.29289644822411,
    51.07448724362182,
    46.82661330665333,
    19.84012006003002,
    61.31935967983993,
    57.52126063031516,
    66.21690845422711,
    64.96753376688343,
    59.47028514257129,
    87.65617808904452,
    12.39384692346173,
    20.38984492246123,
    52.77363681840921,
    90.45477738869434,
    55.82211105552777,
    61.41930965482742,
    97.30135067533767,
    35.03251625812906,
    23.3383691845923,
    20.78964482241121,
    63.06848424212107,
    88.6057028514257,
    34.48279139569785,
    90.35482741370686,
    28.83561780890446,
    23.88809404702351,
    65.66718359179589,
    26.08699349674838,
    82.75862931465733,
    67.81610805402701,
    46.97653826913457,
    6.096998499249625,
    20.73966983491746,
    50.17493746873437,
    42.92856428214107,
    66.46678339169584,
    49.82511255627814,
    44.57773886943472,
    79.81010505252625,
    70.51475737868934,
    19.39034517258629,
    23.03851925962982,
    79.1104552276138,
    7.146473236618309,
    11.39434717358679,
    59.07048524262132,
    65.01750875437719,
    78.4607803901951,
    20.68969484742371,
    53.87308654327164,
    82.35882941470734,
    75.81210605302651,
    58.02101050525263,
    36.58174087043522,
    71.51425712856428,
    70.71465732866433,
    91.95402701350675,
    22.03901950975488,
    3.248424212106053,
    47.82611305652826,
    80.85957978989495,
    72.26388194097048,
    15.59224612306153,
    50.22491245622812,
    32.33386693346674,
    36.03201600800401,
    11.24442221110555,
    60.96953476738369,
    86.50675337668834,
    76.8615807903952,
    19.79014507253627,
    94.00300150075037,
    17.54127063531766,
    13.89309654827414,
    93.95302651325663,
    36.53176588294147,
    61.11945972986494,
    12.0440220110055,
    79.06048024012006,
    33.18344172086043,
    74.4128064032016,
    42.02901450725363,
    77.86108054027014,
    25.08749374687344,
    43.97803901950976,
    94.85257628814406,
    83.9080540270135,
    11.89409704852426,
    96.55172586293146,
    98.4008004002001,
    10.49479739869935,
    7.496298149074537,
    50.77463731865933,
    60.16993496748375,
    55.37233616808405,
    95.65217608804402,
    60.31985992996498,
    50.57473736868435,
    71.06448224112056,
    25.48729364682341,
    16.54177088544272,
    77.06148074037019,
    4.647723861930965,
    82.45877938969484,
    86.60670335167583,
    54.52276138069035,
    54.17293646823412,
    7.846123061530765,
    33.5832416208104,
    47.97603801900951,
    3.398349174587294,
    45.6272136068034,
    48.72566283141571,
    54.07298649324662,
    12.49379689844922,
    53.02351175587794,
    35.98204102051026,
    67.01650825412706,
    87.45627813906954,
    10.39484742371186,
    68.11595797898948,
    5.397348674337168,
    91.25437718859429,
    78.2608804402201,
    16.34187093546774,
    17.6911955977989,
    38.38084042021011,
    81.20940470235118,
    2.698699349674837,
    38.73066533266633,
    98.15092546273137,
    85.6072036018009,
    94.65267633816909,
    38.4807903951976,
    14.74267133566783,
    95.15242621310655,
    2.398849424712356,
    67.61620810405202,
    23.48829414707354,
    42.12896448224112,
    62.21890945472737,
    36.08199099549775,
    14.64272136068034,
    47.77613806903452,
    46.32686343171586,
    89.45527763881941,
    53.27338669334668,
    35.63221610805403,
    50.32486243121561,
    24.73766883441721,
    61.76913456728364,
    64.26788394197098,
    56.27188594297149,
    54.5727363681841,
    33.63321660830415,
    23.83811905952977,
    24.23791895947974,
    79.51025512756378,
    89.60520260130065,
    42.4288144072036,
    81.00950475237619,
    9.6951975987994,
    91.45427713856928,
    71.41430715357679,
    40.0799899949975,
    26.28689344672337,
    94.30285142571286,
    89.50525262631315,
    96.10195097548774,
    70.5647323661831,
    53.7231615807904,
    14.04302151075538,
    68.26588294147074,
    92.40380190095047,
    46.02701350675338,
    14.59274637318659,
    62.81860930465233,
    4.197948974487243,
    96.8016008004002,
    43.77813906953477,
    2.748674337168584,
    97.80110055027514,
    89.35532766383191,
    88.30585292646323,
    40.42981490745373,
    90.85457728864432,
    42.47878939469735,
    57.42131065532767,
    63.01850925462732,
    84.60770385192596,
    6.746673336668334,
    81.90905452726363,
    38.28089044522262,
    56.37183591795898,
    63.61820910455228,
    71.31435717858929,
    77.11145572786393,
    90.70465232616309,
    26.03701850925463,
    71.1144572286143,
    10.84462231115558,
    21.18944472236118,
    59.82011005502752,
    2.049024512256128,
    28.78564282141071,
    18.09099549774888,
    11.49429714857429,
    86.90655327663832,
    95.40230115057528,
    76.36183091545773,
    83.40830415207604,
    25.33736868434217,
    29.83511755877939,
    47.62621310655328,
    31.38434217108555,
    88.0559779889945,
    3.048524262131066,
    4.147973986993496,
    70.3648324162081,
    88.90555277638819,
    25.83711855927964,
    92.8535767883942,
    19.89009504752377,
    1.6991995997999,
    59.17043521760881,
    89.20540270135068,
    58.82061030515258,
    0.1,
    61.96903451725863,
    72.01400700350175,
    34.6327163581791,
    34.78264132066033,
    1.199449724862431,
    16.74167083541771,
    20.48979489744872,
    83.35832916458229,
    49.37533766883442,
    79.91005502751375,
    66.56673336668334,
    57.77113556778389,
    95.9520260130065,
    8.39584792396198,
    50.12496248124062,
    0.3498749374687344,
    73.91305652826414,
    31.3343671835918,
    34.08299149574788,
    14.84262131065533,
    62.56873436718359
  ],
  "expected": [
    5.148763361179066e-10,
    7.265606549963737e-32,
    3.617464878756895e-22,
    1.077659703965533e-28,
    4.855352271751834e-30,
    3.442999352660765e-18,
    5.330369838601526e-10,
    1.969238326049849e-45,
    7.795997706096324e-16,
    7.793941549705507e-17,
    1.018852785658874e-22,
    2.203107986293844e-12,
    5.537631653212376e-27,
    8.976703684382109e-37,
    0.00001694714261412221,
    4.282871045878669e-33,
    1.556475725743533e-28,
    3.033416638208907e-11,
    4.04464130474485e-35,
    0.0004870954393276532,
    0.0001470766398162172,
    0.00001056407927378975,
    3.893322915443378e-46,
    4.737124706068627e-33,
    1.207953492149463e-44,
    2.364272604129311e-30,
    6.590106837316112e-33,
    9.421688536590119e-49,
    0.000002063176934039449,
    1.506899009210975e-24,
    9.941644519238428e-14,
    3.454325762524471e-18,
    5.22215510600124e-31,
    7.987575654076244e-10,
    1.950917618024725e-37,
    9.379274368774782e-49,
    0.3444282113681553,
    1.068677473550456e-40,
    1.551690859881503e-54,
    0.000008874616059348666,
    1.74312843962911e-26,
    6.037523126658264e-9,
    1.217606083562523e-22,
    6.375820741403917e-21,
    1.848599551551281e-29,
    2.047093921300607e-10,
    4.137576327122801e-30,
    4.564051814413313e-14,
    3.654481103059218e-26,
    6.92326108432262e-49,
    2.189666509763268e-29,
    6.884703097798813e-46,
    5.290450477988811e-40,
    3.621472682734898e-23,
    8.779307741594882e-7,
    7.17511002754898e-10,
    1.722830793358755e-19,
    3.018164114710806e-19,
    2.906701754129203e-16,
    1.236572813175515e-37,
    8.46003598376749e-43,
    2.120069466118543e-43,
    2.173943657878701e-15,
    0.0001755009464139883,
    2.841225665185953e-43,
    1.905335918792428e-13,
    7.871155406701936e-55,
    5.830441527468e-40,
    7.202357159265613e-31,
    7.978294206531423e-23,
    6.249833776811303e-38,
    8.298645446424102e-50,
    2.68113250748568e-55,
    2.189414902923616e-23,
    2.000866350025042e-32,
    5.002507139821436e-43,
    2.252110187767882e-40,
    1.480391025830242e-37,
    0.06024509130961797,
    8.963848646647079e-51,
    3.90056200847981e-23,
    2.126872149179069e-29,
    2.394084324255145e-41,
    2.945805733234843e-22,
    6.015095716622138e-39,
    9.722934624976773e-33,
    4.845049984946613e-29,
    3.350496757437227e-40,
    2.045563662554232e-41,
    2.500797423547469e-23,
    0.00002373152763604872,
    1.058936895715749e-23,
    2.830148523443193e-10,
    3.747210557560469e-36,
    2.346748410789149e-44,
    0.00003317411679698278,
    1.631818340444259e-22,
    3.580753664222805e-45,
    1.967616180450852e-32,
    2.855457180740219e-29,
    5.605707801141086e-34,
    1.086890826192969e-38,
    4.285181550117965e-26,
    1.566935224607332e-7,
    5.950306102073624e-12,
    9.390357107780031e-30,
    1.443342049709015e-18,
    1.034004664850652e-36,
    6.858728317844991e-19,
    6.794300149432103e-10,
    4.280747679453995e-30,
    7.432776592592336e-19,
    1.24925284784449e-33,
    1.036161901761154e-31,
    2.188099680853221e-20,
    4.070616716729064e-51,
    1.669814151855924e-9,
    3.077029303637243e-7,
    1.106121466804754e-27,
    1.142381835390684e-17,
    2.354882936987525e-13,
    1.703493474382025e-10,
    1.546973010319985e-14,
    1.769749989393288e-53,
    5.035365969237886e-7,
    6.824985284483135e-9,
    3.586896733400421e-57,
    9.055163740521419e-40,
    8.528340442405767e-22,
    1.127949141855413e-20,
    0.00006101747850202734,
    2.349818368494478e-30,
    3.710347719980208e-49,
    9.487695170984841e-20,
    0.000003857774604706206,
    3.277886613986698e-41,
    3.579088251715656e-43,
    1.461505555151346e-26,
    1.567614361349205e-12,
    6.759316936397593e-39,
    1.613584093565558e-16,
    3.247742135155134e-52,
    2.286566670445616e-35,
    3.43624541868887e-27,
    1.243279156120161e-42,
    1.501456653656663e-47,
    5.103226968171575e-27,
    4.134199096101635e-49,
    1.076263517322998e-10,
    2.066103474232346e-15,
    2.473165683085943e-15,
    2.716354902081118e-42,
    2.394222580899075e-22,
    1.694300182903849e-7,
    1.291097379186976e-47,
    2.212063663469732e-13,
    9.453443967968745e-7,
    8.486660397162196e-34,
    4.216287472597829e-43,
    1.666069655031799e-43,
    4.041113782786889e-19,
    1.460467541044788e-52,
    1.6954518241099e-32,
    7.41115969666769e-17,
    1.00746667728001e-44,
    4.105472307453098e-39,
    2.086837589258615e-25,
    0.005290511037720795,
    0.0003038873741312848,
    4.759530678711125e-15,
    8.236787751331547e-39,
    0.944210705003065,
    1.956854041609328e-51,
    5.868969952490903e-41,
    1.061240410509477e-51,
    2.444813749451247e-34,
    0.005765741318343913,
    1.933955150943155e-9,
    7.821206030583599e-28,
    4.964659364309235e-13,
    1.012180805280222e-17,
    2.940974145306175e-35,
    1.690045896517032e-28,
    1.618726226932934e-9,
    5.828583784842258e-36,
    2.516490276956794e-34,
    8.992932775991014e-58,
    7.752748827288098e-29,
    1.194616063467749e-50,
    5.403552323439481e-32,
    0.000002309324014910373,
    2.300843821277923e-35,
    6.409530667259924e-33,
    3.59533062136912e-10,
    6.428214964337025e-17,
    1.831422858367246e-42,
    1.690117527321999e-47,
    1.093059959399258e-52,
    2.07639756181765e-33,
    5.907060383223153e-18,
    9.176673247084446e-49,
    1.168229463520803e-17,
    1.719396747341331e-46,
    8.623770334878688e-45,
    2.592513747816863e-31,
    2.95323767618166e-12,
    3.21122840114437e-17,
    1.661940969734405e-55,
    1.136381718848898e-16,
    1.021774508654978e-18,
    9.038277052208019e-47,
    5.292486201644951e-34,
    7.579910259471652e-54,
    1.495649218671687e-11,
    1.115286949954357e-26,
    1.81798719217351e-7,
    1.308494793643858e-54,
    7.664300601008401e-18,
    1.994078415369869e-9,
    1.495468773381665e-40,
    4.218979260049716e-23,
    7.851609860005991e-50,
    1.018414859562805e-17,
    7.309708756717585e-40,
    6.274447002601001e-16,
    1.566398718462312e-52,
    6.890706913024483e-23,
    3.583515198975038e-22,
    1.295954620598677e-27,
    4.495240345532742e-19,
    5.734132609207122e-36,
    1.204333583871397e-16,
    8.557409786867678e-20,
    1.09635750093228e-14,
    3.711236184370689e-8,
    0.1852997138265328,
    0.00006725067353064385,
    3.546781160289437e-46,
    1.531242085409545e-27,
    5.562469175274969e-37,
    2.632599555763564e-19,
    6.081289749707452e-36,
    7.488886596160433e-28,
    1.666478125599445e-13,
    2.265046887453685e-18,
    3.213451397556488e-53,
    4.058195972778692e-37,
    4.354862348818178e-19,
    1.129658664177519e-46,
    3.368133641503814e-39,
    1.96590723686217e-19,
    4.006484502845849e-10,
    1.482964158452331e-44,
    2.039505044373753e-33,
    0.03635760415941106,
    2.661298502208306e-15,
    5.486146218349952e-50,
    6.029413185841471e-7,
    3.980295664585037e-39,
    5.380495978143655e-34,
    8.856707732911653e-51,
    1.614428771582227e-35,
    5.389509932142486e-8,
    1.070533782382322e-11,
    9.171836047426746e-42,
    0.0000601767506320539,
    2.245356664383314e-7,
    0.0008358166952685945,
    2.522702251553857e-22,
    2.911235116353265e-44,
    2.11457258595844e-10,
    1.376303211367164e-32,
    1.771957643444336e-19,
    7.100325008033785e-37,
    3.911669727130495e-41,
    1.157960646679912e-9,
    5.235334225791984e-15,
    1.745218241250262e-27,
    1.613235374954522e-56,
    8.447346674954979e-54,
    2.486792035091195e-30,
    1.395927216443538e-36,
    5.172772890520335e-13,
    6.94575170025336e-34,
    3.589609040403244e-40,
    5.081686125581196e-15,
    7.232407499208951e-23,
    2.145290624283438e-26,
    9.79821495117636e-40,
    1.179708349175213e-36,
    2.48458264442719e-27,
    1.125050529611837e-32,
    1.686621040504627e-20,
    1.261285330954e-26,
    2.074740494407237e-49,
    3.380767982691617e-55,
    0.000005842164227525468,
    3.043525920256226e-20,
    9.761490775544095e-10,
    6.960225554363964e-16,
    2.623982526480183e-36,
    2.142415563400868e-18,
    5.707137421438152e-12,
    1.61281690398247e-18,
    7.106281657897439e-25,
    1.347065796608119e-18,
    1.085914583515207e-45,
    3.970385346542705e-50,
    1.478070121417279e-12,
    3.821818154605921e-10,
    9.880759793556951e-17,
    2.448914590858797e-35,
    4.992376343969407e-41,
    7.747425052375159e-20,
    1.007457538303916e-39,
    0.001993115557908766,
    1.638110700316637e-20,
    8.915917705950108e-24,
    2.329075826514274e-45,
    2.875150058302129e-10,
    3.13372371961144e-21,
    0.04253447386052311,
    2.613283659943617e-58,
    0.0002407439498027174,
    3.921090254794963e-29,
    0.168103038576408,
    6.167810469858857e-11,
    2.399396457665817e-16,
    6.370186425634125e-35,
    3.22870798529977e-26,
    6.098369276528777e-34,
    4.446157264583489e-29,
    1.546312215642391e-21,
    2.254150708401148e-40,
    8.542334211126996e-56,
    5.599304219344004e-7,
    1.699905131863733e-17,
    6.580420454443285e-25,
    0.00008901676637170404,
    1.271288017649734e-22,
    3.27650442455936e-41,
    3.564514971963993e-51,
    7.877369855570469e-7,
    8.259908648799529e-11,
    8.198711458338471e-30,
    0.00003261824015127489,
    4.687196908691592e-24,
    3.869930831704014e-35,
    5.75833381931553e-39,
    6.268444237366249e-33,
    2.621061042776883e-23,
    8.041136614533843e-24,
    3.136616509479811e-20,
    3.456177868182134e-21,
    3.016589901092522e-25,
    3.579684710788812e-11,
    5.838861037677434e-47,
    3.224662216979614e-33,
    3.7397130913819e-29,
    1.433399759571777e-31,
    5.021548233546503e-31,
    4.73250010521799e-28,
    7.071496389905791e-22,
    1.090652187922169e-50,
    1.820378311535235e-16,
    8.414847811155605e-24,
    7.289621456655118e-40,
    1.682882145815995e-19,
    2.338603522653241e-18,
    9.101782909918954e-16,
    4.457993867637818e-34,
    1.849912658528351e-8,
    3.122442854799967e-26,
    1.003792009825742e-10,
    8.11748260714553e-15,
    3.892108365654745e-15,
    1.489475514924252e-13,
    9.040600048170822e-45,
    0.0001625515696038832,
    1.758491763918543e-30,
    4.08156985438583e-55,
    1.26414285495728e-33,
    1.134059118854022e-12,
    8.65217835398688e-22,
    2.222832133808224e-19,
    3.148719177260012e-46,
    3.979585749751219e-14,
    2.850242567155055e-9,
    8.297364275013422e-37,
    2.650462431087573e-20,
    2.705486271163243e-15,
    3.269805926156562e-31,
    4.280197222339412e-30,
    1.054340703009494e-58,
    1.341996853535335e-46,
    6.174910477933771e-29,
    3.261086101857143e-39,
    1.421812807052139e-44,
    8.817256479960383e-33,
    2.041664443045061e-43,
    7.619094009693221e-42,
    3.355610152632096e-8,
    0.00004089847275296754,
    4.75595338109023e-28,
    5.059556846597359e-54,
    0.001485520029641294,
    5.261596204144561e-28,
    2.948973340951854e-24,
    4.745350968464375e-14,
    5.950494805631974e-13,
    5.152266520246215e-18,
    2.061148956181318e-38,
    1.546339209184994e-32,
    9.902377245137227e-8,
    1.537795157332064e-8,
    1.470105724649186e-40,
    5.88708588292744e-11,
    4.160767357020248e-26,
    9.132005499888894e-25,
    4.957133185301907e-27,
    6.043458641771208e-25,
    1.192445700069815e-11,
    5.432934278255466e-15,
    1.142020038263311e-42,
    7.438960417894045e-26,
    6.038721814120532e-40,
    8.127973299003812e-43,
    1.011448796628624e-51,
    3.341500293000879e-51,
    5.950277540521885e-20,
    1.168815185535229,
    1.163156072497382e-37,
    0.001760054408498673,
    4.33526372611506e-27,
    8.77754710171187e-46,
    2.98252015356039e-35,
    2.199402038128414e-24,
    1.513829387527863e-17,
    1.621106145376387e-24,
    1.439811703242294e-32,
    8.845480853504262e-29,
    0.0000720244427643026,
    7.62131270585659e-31,
    2.223312660863262e-13,
    4.880529281991592e-34,
    6.291662949006145e-49,
    0.000084719008685032,
    3.563713267903276e-57,
    2.213255029109662e-18,
    4.204599789879019e-43,
    9.577712405958055e-55,
    9.542662942111077e-20,
    1.367843379294845e-43,
    8.593522122040016e-35,
    1.920667078804092e-13,
    2.74758419916043e-22,
    1.042411080029568e-33,
    0.000005708875555372204,
    2.863526790824199e-27,
    7.153418968195252e-12,
    1.005267123850803e-29,
    3.269852037549687e-14,
    1.470681816347283e-28,
    3.097496859941994e-36,
    6.42936074926432e-8,
    1.88508880257568e-14,
    2.151482182363021e-30,
    3.836037951661099e-23,
    4.610775608381904e-32,
    2.727358631471562e-12,
    4.028884410385983e-46,
    3.870965575815088e-43,
    2.007423740804356e-32,
    7.448325545584835e-22,
    1.356756987194567e-31,
    2.365246972008265e-8,
    1.649490797266457e-16,
    7.9083637524736e-41,
    8.577341269497915e-22,
    7.33837803028679e-45,
    1.89658211620793e-30,
    3.18455533442861e-10,
    1.556065803826342e-27,
    7.381642733070663e-19,
    3.763718813116939e-44,
    4.911360209188139e-37,
    3.792569285369053e-40,
    4.84133716318959e-14,
    5.5281364517456e-45,
    1.078074052444831e-20,
    2.283625211713319e-45,
    0.002350891685694587,
    1.864134036511148e-37,
    9.5654203730703e-13,
    3.952462570696521e-19,
    6.849767847128298e-41,
    3.047784727471438e-49,
    1.51461354633986e-52,
    2.137938994048339e-34,
    4.59680954739719e-15,
    1.286412928383352e-7,
    1.218750280679645e-19,
    7.691176772355115e-33,
    4.787811782475094e-27,
    2.484825135415302e-8,
    1.198373669051687e-22,
    5.576057607054177e-9,
    3.536852153559632e-33,
    1.317457194700123e-45,
    1.308473114406441e-21,
    1.438544931709036e-40,
    8.487151451284543e-8,
    3.418258459015477e-54,
    6.113355047797595e-14,
    7.139037827970298e-40,
    7.709923037024439e-36,
    3.301705033560056e-19,
    8.70560967755984e-19,
    1.558905535221667e-9,
    4.304693067034507e-27,
    3.366106852982419e-15,
    4.199973008062956e-32,
    1.639926831303861e-28,
    6.92045991739337e-29,
    3.332221079631877e-44,
    6.478985942501416e-32,
    5.530678639321257e-27,
    7.030743995546409e-45,
    2.237201050920613e-39,
    1.963784890247397e-11,
    4.611640818523505e-35,
    2.071143315844135e-47,
    1.550944604894109e-26,
    2.039730571793678e-7,
    9.646557179424781e-18,
    2.027912323570249e-25,
    6.890320917652369e-13,
    2.673211725024726e-33,
    2.225711417459324e-15,
    4.072172881761141e-34,
    4.868005013336804e-19,
    6.168083666318129e-8,
    1.566576662663335e-38,
    6.170245698806848e-7,
    3.075946300581945e-13,
    1.13727948129651e-36,
    2.390406295659174e-43,
    1.839521539130891e-36,
    1.989335794399214e-31,
    6.351943177605942e-11,
    2.645336245385728e-12,
    1.048637953922431e-25,
    6.32611266767129e-35,
    1.546582412110086e-15,
    2.059564408840926e-30,
    1.155240627503873e-39,
    1.277678341809831e-43,
    6.450655436423458e-44,
    1.772973976284985e-8,
    4.165331085027668e-31,
    2.207737789873822e-16,
    3.00979367724775e-30,
    4.40261377641855e-14,
    2.013502152680338e-9,
    1.506728531828463e-48,
    1.198014711119097e-26,
    7.050397961731345e-10,
    1.739722031667434e-34,
    1.458874219276524e-39,
    4.732069774095506e-26,
    8.663163162873452e-51,
    1.746978411897208e-51,
    2.248839417088695e-17,
    0.001384317067466414,
    8.111335979383836e-28,
    1.157940285271895e-42,
    4.871673087831867e-17,
    2.639074318811684e-31,
    1.737804609347607e-9,
    1.475719304771915e-12,
    1.237092407347138e-24,
    6.185660948653107e-14,
    4.638868912185904e-26,
    1.986087508489346e-18,
    9.773633865853241e-29,
    5.971868343654781e-11,
    1.49726265387854e-55,
    2.035119301759708e-47,
    1.974137366109722e-41,
    1.171341535816188e-48,
    4.567977702046096e-38,
    9.573448011211746e-23,
    1.006377968273548e-36,
    3.882567786018816e-56,
    5.474306236517478e-7,
    8.370372365852256e-34,
    0.0001010443036074441,
    3.884022358410451e-38,
    4.014595631135391e-14,
    1.809306706369058e-45,
    1.326842438972255e-25,
    6.475836449266412e-13,
    2.265442817799073e-10,
    6.638677647160882e-34,
    2.854192963945759e-11,
    5.820018632503253e-52,
    2.601426445019101e-16,
    0.0001294710172473472,
    2.033484148907641e-22,
    7.483839178824734e-10,
    0.1087598305268299,
    0.002438213305676698,
    4.571116371767889e-27,
    1.081801377406161e-44,
    8.590433021267118e-9,
    4.640094173178518e-24,
    1.216030706174797e-21,
    4.703805005598469e-34,
    9.863570267933038e-10,
    1.960918830034881e-38,
    4.212248052192556e-49,
    5.091650798931769e-9,
    2.02846202518441e-27,
    1.071826547160605e-51,
    4.106368630499357e-21,
    5.446706051437741e-9,
    0.006376473459421499,
    2.687604412248406e-11,
    1.332080095537175e-24,
    1.395883237375866e-7,
    1.029015522172804e-21,
    8.78611745182593e-52,
    1.431510039923801e-35,
    1.363604966113753e-16,
    4.839009177029069e-37,
    3.476106975789949e-30,
    1.112371395696728e-21,
    5.736483028128353e-34,
    4.162124224640643e-39,
    1.491968877258691e-21,
    1.47437969169122e-38,
    1.469795237853097e-35,
    4.530036367888307e-43,
    2.490900422842974e-14,
    0.01916357182398532,
    7.926825776784509e-37,
    4.351631489359479e-24,
    7.967049421733572e-7,
    4.004583901093471e-35,
    1.208734418553118e-19,
    1.272943818051094e-36,
    3.428047250293151e-30,
    1.334246915082619e-43,
    2.901089815524271e-22,
    5.478876470689626e-11,
    0.2527541934651477,
    6.633580733906841e-10,
    6.91778392175087e-35,
    1.081913646641218e-34,
    1.98834239003258e-8,
    8.663163162873452e-51,
    1.560534407495892e-33,
    7.620890181910949e-22,
    1.229750018649957e-23,
    3.346669846595101e-39,
    7.850479846230528e-24,
    0.0006674716410318648,
    1.315190869546806e-28,
    4.150481043846803e-21,
    4.02781927215444e-44,
    0.000001457399059570016,
    0.0002617357062424109,
    1.047844203402435e-35,
    1.972378848397974e-27,
    0.000002694672794866007,
    2.780336594686142e-28,
    2.006528470609013e-29,
    0.003370584827665275,
    3.345390326450007e-51,
    1.860767649986282e-15,
    4.139546320522935e-32,
    2.007052960084692e-36,
    6.833176801989507e-12,
    3.707723579265967e-42,
    7.922534042781776e-38,
    5.683038074183644e-30,
    6.312085334314039e-45,
    4.636205161793703e-7,
    1.206963015510201,
    3.993996271048465e-15,
    1.679316145672404e-42,
    3.901421194054243e-11,
    3.700156792781335e-20,
    1.517079741541689e-31,
    4.845261425400011e-39,
    0.00009413718066010611,
    1.442160225510514e-23,
    1.656738207597036e-26,
    1.16925253664691e-33,
    3.382860239159266e-52,
    0.0004329875498805356,
    3.673072296519765e-42,
    3.60760143661333e-47,
    1.451959708977277e-38,
    0.000001340679613537469,
    3.591439591743029e-49,
    0.001102985620974319,
    2.382760399229255e-23,
    5.52267062651869e-14,
    0.0006812800759279724,
    1.823930684495881e-8,
    1.075469495523509e-10,
    7.90811140509394e-12,
    2.636257924341662e-24,
    5.569402282951171e-37,
    1.085738765725697e-30,
    2.294150086532114e-9,
    0.00005622966919347688,
    2.805836803954757e-31,
    1.295090018657941e-46,
    8.751757696723363e-11,
    1.649349166024645e-29,
    1.03706885566508e-30,
    4.498869649228833e-38,
    9.715233817685459e-31,
    0.0531307321549853,
    1.295267432595909e-38,
    4.710204916537239e-15,
    1.329300250847737e-35,
    7.88437020075165e-53,
    0.0006131984681858213,
    2.514547234001207e-30,
    6.291648981601036e-18,
    2.514951236452034e-51,
    1.03696780773672e-14,
    2.613805112971703e-23,
    1.05097570942428e-22,
    1.28239248956593e-25,
    3.25493901757474e-36,
    0.00008412726673103136,
    1.665211056155822e-28,
    4.304728537713254e-15,
    1.230835560693964e-28,
    1.503542621272258e-26,
    2.724074898944473e-50,
    7.810853211393639e-44,
    1.923929344981073e-35,
    4.171729708486246e-10,
    8.024395960822351e-45,
    1.432469354502343e-26,
    5.799221745631537e-22,
    2.158335291031195e-16,
    3.201075645306735e-23,
    0.0000466087048229227,
    0.1284442981994523,
    5.589597113584548e-26,
    0.000003307817998927209,
    0.0004432248598765897,
    2.298548244125713e-19,
    6.542256177844713,
    0.007104733119693928,
    0.00000227605343062074,
    7.074127633363926e-56,
    8.543848662073507e-28,
    2.630468161439685e-51,
    2.168677252337968e-7,
    6.642636643037388e-24,
    6.125514827210439e-11,
    5.371828791440946e-27,
    3.09344301780934e-46,
    1.556574608781913e-46,
    3.484826978137661e-26,
    1.322338384679038e-48,
    9.244883410429962e-23,
    1.257639254754319e-47,
    7.427991797268741e-41,
    1.016201750015078e-19,
    1.014223217015781e-31,
    5.569960652452001e-15,
    5.179768056289081e-30,
    4.007862571954949e-40,
    1.306641754739342e-11,
    2.08997925791517e-29,
    3.358952987776956e-33,
    0.00007164706870687476,
    1.198324953407583e-41,
    1.896525404174023e-24,
    8.36149286096731e-25,
    0.00008303937307216424,
    1.212928104926643e-20,
    3.313038201994488e-46,
    0.00000106776867411931,
    3.035130467309563e-44,
    5.089861692249112e-24,
    4.775961164428163e-38,
    3.186876319866101e-40,
    4.185296891510413e-42,
    2.958453257035206e-36,
    4.113590359161279e-8,
    6.527699662049702e-54,
    4.79382635674483e-22,
    0.04979378379442308,
    1.812237453192328e-19,
    1.063702563953076e-31,
    2.519350448582617e-34,
    2.995252307397343e-32,
    2.376803819118092e-8,
    1.065097787852445e-43,
    1.484678927314117e-11,
    1.627510254599009e-23,
    0.0009489266926938571,
    2.435873947561325e-8,
    1.199372018334989e-36,
    3.248436761313726e-7,
    2.415680211444972e-36,
    1.241630085602799e-16,
    1.191552362722251e-28,
    0.01533610325512802,
    6.330632075311217e-16,
    2.099698375093359e-59,
    4.312045132213721e-28,
    8.952328716881335e-35,
    3.827967463150809e-33,
    2.410431016637501e-7,
    1.351549247510472e-13,
    1.055613453959828e-14,
    6.617851502270023e-37,
    5.772622108857165e-12,
    2.015087091185011e-26,
    6.079132641341632e-11,
    9.976855905218105e-25,
    6.714895832210575e-17,
    4.024120140742649e-19,
    3.660966297582223e-39,
    2.899255155373214e-30,
    3.491157711912139e-32,
    4.356468331878837e-30,
    4.337021448084347e-11,
    3.187067391824446e-30,
    2.130702651875412e-29,
    1.541348839702956e-26,
    1.373430751623849e-22,
    8.712541854082301e-51,
    1.928537160759785e-19,
    1.799444457907616e-26,
    1.482343351386452e-40,
    8.10514708117001e-11,
    6.552941343562707e-30,
    2.143511475541089e-51,
    3.506744412206235e-30,
    3.05527501849846e-35,
    1.287499287833261e-18,
    1.577209903401792e-32,
    3.3443526089863e-13,
    4.793952666607816e-15,
    7.562558355658576e-18,
    5.149529781296106e-38,
    0.00233330706366693,
    0.1129813799700982,
    2.191742766872404e-27,
    1.935865685294278e-14,
    3.002677928357859e-25,
    4.271431896562253e-47,
    1.898179239101113e-30,
    1.998012209347668e-28,
    5.810881296817786e-9,
    1.151457064570625e-24,
    0.00003628253764921769,
    1.178868031016905e-24,
    0.000001780462548366775,
    5.379033708927391e-32,
    2.238726719987046e-16,
    0.03065645479887052,
    8.971382472018823e-19,
    2.208835783370785e-9,
    5.760287256176016e-51,
    4.321046345833762e-28,
    0.00625539251869462,
    7.282418647861218e-28,
    0.3005065083136185,
    1.97998230250035e-32,
    5.15938153821199e-17,
    6.553947084393844e-24,
    9.512566971370404e-19,
    3.547082942597589e-9,
    7.063891210581419e-45,
    2.936186074715145e-31,
    2.575529073238096e-17,
    1.944065498495286e-16,
    1.906112336052741e-15,
    2.074983882001089e-15,
    1.105187459480835e-45,
    4.639045417376237e-17,
    0.4027585712062405,
    4.694858903861474e-40,
    8.283906817157282e-58,
    1.543931753234275e-17,
    1.284015247329067e-40,
    4.345104712361583e-16,
    8.922329455392229e-50,
    9.671767747387073e-55,
    1.147216726677455e-12,
    4.125090302898996e-32,
    8.139750252291847e-57,
    1.997534176624071e-14,
    4.425938820400635e-25,
    1.086306742048759e-17,
    2.166892930201616e-23,
    1.154051111400922e-35,
    0.009595289323870802,
    2.027860080205359e-11,
    0.01506353780034059,
    7.645495525275444e-35,
    8.534514489023761e-12,
    4.372310479207662e-24,
    0.0134616607176174,
    3.891776734340438e-16,
    6.56222662434516e-13,
    0.005485267241718723,
    8.095606454606603e-32,
    3.240351416461254e-54,
    1.449912582690415e-40,
    4.722320663247047e-52,
    1.942741607693974,
    1.133687450329496e-22,
    1.162687086696251e-21,
    1.894366696649216e-28,
    0.0001665452199862349,
    1.183730996204084e-15,
    1.322264524531362e-47,
    3.038819485624342e-40,
    2.815956891081478e-37,
    3.983875677348047e-36,
    0.000005085095763866063,
    1.911977345735169e-18,
    4.546904038725501e-22,
    1.875404125925102e-22,
    5.792182182594194e-19,
    2.86899690163821e-33,
    3.838663814507044e-26,
    2.461695715654259e-16,
    4.754135242934723e-21,
    0.0005814447363749973,
    2.137940130331615e-42,
    2.547151803874844e-9,
    1.421835591242384e-25,
    1.983767922911231e-48,
    1.743327088638548e-12,
    4.694693414314766e-40,
    7.105560686106159e-25,
    8.735801554143001e-13,
    4.170584383989125e-13,
    1.198397025167157e-28,
    5.098796938120973e-48,
    1.720312753003895e-23,
    2.110703157579504e-27,
    6.159284577761073e-32,
    2.079484853183834e-47,
    0.1016726350657682,
    0.00004006089154931815,
    6.620421556610071e-26,
    2.850009142057158e-20,
    3.771260989950423e-9,
    8.992269938011667e-7,
    3.431877659255213e-54,
    2.967642296008433e-32,
    0.00004007964189908432,
    9.734304318187318e-13,
    7.800392567385142e-34,
    2.897588983486104e-26,
    1.126178094172702e-52,
    2.210851117328152e-14,
    3.435530419001134e-8,
    1.943531162132034e-12,
    7.159380055333171e-53,
    9.341507340474442e-18,
    3.483209538916519e-40,
    5.231434842017948e-37,
    1.080449392645679e-37,
    3.052829698939636e-22,
    6.009546196405754e-52,
    0.006220293233212066,
    1.444659304272865e-31,
    0.03054688531709207,
    0.09045444762948432,
    7.846586631675731e-45,
    9.105438120095679e-58,
    3.371787188266314e-27,
    3.209497982688857e-11,
    3.435266531125741e-25,
    1.06449796483083e-21,
    1.188008046169981e-8,
    2.976122065095949e-14,
    5.300294556759545e-17,
    3.865637376478958e-16,
    1.187052690443892e-28,
    8.972641565441015e-32,
    2.683138075686643e-32,
    1.934999312912177e-23,
    1.073249492884176e-13,
    8.599065679216836e-61,
    5.789590506288002e-39,
    2.392992451119739e-24,
    5.207454792147827e-50,
    5.412488923888619e-33,
    7.684462289692231e-12,
    1.227972214900942e-10,
    1.431958382528801e-9,
    3.962071690805258e-16,
    2.121287476532433e-41,
    1.048306659683871e-21,
    3.329465284973448e-22,
    4.596861531519472e-21,
    2.346089383281199e-32,
    1.71954500492712e-50,
    5.036682729954352e-35,
    8.314446808211277e-14,
    5.366327200687239e-39,
    2.161078417197898e-29,
    1.320751167214033e-41,
    3.244328678488072e-11,
    5.415921665264782e-43,
    1.166393488240389e-13,
    5.064747919456541e-12,
    7.972574703426888e-19,
    3.064412415591817e-24,
    0.00001148618579311789,
    0.0001829314173014794,
    1.98826183459406e-28,
    1.942427264817779e-11,
    1.915560507915734e-19,
    7.458309215735207e-27,
    6.519972038933196e-44,
    4.364945715044918e-33,
    1.481747675937556e-31,
    3.645121683020191e-27,
    7.478369407679852e-18,
    4.258884092660172e-14,
    4.215279392437501e-29,
    3.820175971054703e-10,
    2.651590227311822e-31,
    7.128528979117715e-22,
    4.698858072651772e-28,
    1.236219583209774e-8,
    1.022681646438338,
    2.027750317886073e-35,
    1.771566199022355e-46,
    1.211697808134866e-39,
    8.58244182183158e-37,
    6.094265051283167e-37,
    5.320829361519926e-17,
    6.364021271133051e-46,
    1.253392771392311e-27,
    3.673498825174835e-13,
    9.349586954294258e-22,
    2.851887687444868e-37,
    2.16937014589386e-28,
    4.891079730276518e-9,
    2.224742938743401e-33,
    0.2367743839877113,
    1.598610163843262e-17,
    5.673082226001893e-32,
    1.031305375346775e-21,
    1.529435188334874e-13,
    2.40263541419306e-14,
    1.21282316513755e-13,
    1.68690035267082e-26,
    0.0002448000271514904,
    1.343057476882563e-44,
    1.709911790848897e-7,
    1.940384840543868,
    4.863974371968509e-7,
    6.947476794062539e-26,
    1.007039380087443e-31,
    1.731281802181149e-17,
    6.896819427079048e-27,
    0.000005121248221747209,
    2.075913176096349e-37,
    2.265545007580529e-22,
    5.491071280664042e-42,
    1.891286588061976e-17,
    0.000002184723983227718,
    4.185143334284074e-19,
    1.172744248741318e-26,
    2.961273482147585e-19,
    1.773570092651772e-24,
    6.4562884334426e-22,
    1.122324786564963e-14,
    3.865784863093296e-35,
    5.503395671813105e-13,
    1.145314096397041e-52,
    0.0001933508767983844,
    4.33883667117854e-47,
    5.135116985545355e-7,
    5.528802945154234e-49,
    4.856587338025439e-44,
    3.659943697479375e-37,
    2.263824173338404e-33,
    5.054882164046305e-28,
    6.737611794723978e-31,
    1.384914045037909e-14,
    2.471854593254703e-16,
    1.225496150892424e-29,
    0.000001216033348744665,
    8.340251251553463e-13,
    1.180281196899278e-20,
    7.537392178063896e-21,
    3.465775424715251e-35,
    5.92011237274617e-8,
    6.317249372246529e-24,
    1.531153989952319e-41,
    3.353593781744103e-24,
    1.060516485449836e-27,
    1.36112021388448e-22,
    1.315004418121077e-14,
    3.860957319552119e-38,
    5.545305991511742e-21,
    1.31538868680144e-25,
    8.824864495255114e-30,
    1.568600565754229e-12,
    2.089035255463844e-20,
    2.504113225548328e-29,
    5.649428732537991e-27,
    3.726775185657802e-9,
    1.113027518728443e-50,
    0.00000478807728618122,
    2.568183522207019e-10,
    2.740674338446705e-23,
    1.038692302417281e-10,
    6.837938056885226e-18,
    1.179482151500686e-13,
    2.25716977432974e-27,
    1.958091717175488e-46,
    1.030924509912359e-15,
    1.89513638031363e-32,
    7.695762516483871e-29,
    9.888018574228374e-17,
    5.864527716032359e-19,
    0.0000309309260317683,
    1.764998216283167e-43,
    1.159817234529094e-23,
    3.227192507376196e-44,
    3.809507284018959e-10,
    2.230234845037213e-52,
    5.698514120920913e-37,
    3.484736174760707e-23,
    1.399742709890602e-11,
    1.796657762763726e-22,
    7.637320602494675e-34,
    1.516004841644894e-11,
    2.495208031176584e-32,
    3.016623946720694e-57,
    9.315263820599168e-22,
    2.823727091509004e-7,
    7.77169168331393e-29,
    1.617737845921873e-12,
    3.523447971907923e-19,
    3.958671993099652e-32,
    5.557819485613215e-37,
    6.457946042302839e-12,
    1.420972265415891e-10,
    3.183607922631924e-29,
    4.028363325080851e-46,
    1.682378131392295e-23,
    2.103715282184474e-8,
    2.731062165905631e-34,
    2.487706934785231e-41,
    1.502415164296868e-27,
    5.617988742764472e-21,
    1.008132921007562e-20,
    2.671494841746856e-17,
    4.340184304928821e-33,
    6.147504320883254e-25,
    1.008580934814396e-9,
    5.182805767557595e-32,
    2.063691276158697e-32,
    1.063875987953102e-22,
    4.694675833586796e-29,
    5.25030548681006e-27,
    2.519235327055434e-9,
    1.649660633053046e-25,
    1.311668475628643e-16,
    3.612273789523664e-22,
    2.137778322749322e-31,
    1.602056843487311e-29,
    0.00005191584696793023,
    1.632556624687049e-50,
    1.061186356541766e-40,
    3.460510626897932e-36,
    1.148989688772202e-38,
    1.194975915841774e-57,
    5.295532329566069e-27,
    5.648949518935801e-12,
    5.942071495519579e-44,
    3.148549286861467e-24,
    2.614007109178595e-13,
    4.957978305514409e-46,
    6.854477915967857e-13,
    0.00217372814295038,
    1.157808914728867e-29,
    1.486008182279828e-9,
    5.055335482468504e-13,
    2.433861758686478e-18,
    1.675546659550073e-21,
    2.266441075823823e-53,
    9.544946107715158e-44,
    2.108833006007067e-11,
    8.165106201765735e-33,
    2.673624111120347e-50,
    1.335915539640235e-36,
    1.175970480374584e-17,
    2.014384597807373e-47,
    0.000008345809359553963,
    1.335136833590695e-40,
    0.001302131426509532,
    0.02227562214732831,
    5.621672673682312e-26,
    0.00001246431304237563,
    1.06876608646684e-28,
    5.410702001647414e-43,
    9.514594211027177e-39,
    7.431310685174229e-11,
    1.528251137393572e-14,
    6.534783223447133e-21,
    1.204328589290903e-37,
    3.91423666842866e-36,
    1.515005064341183e-45,
    3.048290614529891e-28,
    4.445471726355386e-8,
    9.604173200931421e-24,
    1.687838471311551e-35,
    9.303855360937449e-45,
    2.661399337851695e-16,
    3.145791581382127e-20,
    3.898539421710207e-55,
    8.936801945000686e-12,
    1.247611717956333e-25,
    2.062417346931072e-31,
    1.448910513562304e-44,
    8.605487893091207e-56,
    1.802842609426849e-15,
    9.512713979289322e-54,
    3.674355502042412e-29,
    8.659434823737687e-47,
    3.310101078619213e-13,
    2.933055121977265e-41,
    3.64930458355089e-22,
    2.956504816468757e-35,
    1.005716189681333e-18,
    3.957618171758874e-54,
    0.01301391487077683,
    1.111940392510468e-9,
    3.291617472315255e-34,
    6.553389174096286e-11,
    1.522709475629247e-29,
    2.100786438803284e-37,
    1.913713740470239e-49,
    2.254933312021481e-51,
    3.439348324531304e-7,
    6.251238342728363e-27,
    2.348795434334821e-29,
    1.023676712184164e-39,
    5.808870000238398e-19,
    4.023911067831907e-37,
    3.309040873582967e-46,
    2.791104746291112e-35,
    3.600378371723657e-27,
    0.5060682159057786,
    3.502285682452002e-9,
    1.578354939898067e-32,
    3.331470818378352e-23,
    3.775027654211447e-33,
    7.224714723355584e-23,
    4.640819796278645e-7,
    1.568137917570993e-23,
    8.015988675478956e-20,
    3.810451010730061e-28,
    3.844054780846105e-9,
    6.756246708389651e-25,
    1.526317793774391e-45,
    1.549371250329532e-40,
    3.434224460736945e-9,
    2.408371994118762e-36,
    4.991631344704267e-25,
    1.44637249597132e-50,
    1.121116193797341e-30,
    2.179528540519579e-12,
    0.00003185486290283592,
    5.397280259067719e-46,
    7.750146079305871e-16,
    9.040906785912515e-24,
    2.342659449315356e-21,
    2.253456275738083e-28,
    1.578268551727427e-40,
    2.570392175222071e-25,
    0.00006213388045034145,
    3.17765071079504e-9,
    3.07248756509723e-14,
    4.113639290740731e-32,
    0.00002907124291839168,
    5.605236532015038e-36,
    6.065060032701598e-36,
    0.00001515933450347686,
    1.054413699209288e-23,
    0.00000296381175313188,
    1.108667338754253e-14,
    4.409159333149544e-11,
    9.424580671768376e-11,
    7.443362756799912e-29,
    2.915194035273314e-17,
    1.960870911406442e-40,
    1.071982955434715e-23,
    4.241665235115925e-28,
    4.184225076666211e-41,
    6.264789207788155e-36,
    1.140423245661545e-15,
    3.336305577252264e-28,
    7.278146766572459e-19,
    2.092195157872321e-28,
    5.88984885255041e-25,
    1.119580171274902e-54,
    4.581691886220601e-17,
    5.950546664873258e-11,
    9.020458185116973e-30,
    2.283106217127964e-39,
    5.290960772758756e-21,
    1.75665989628288e-46,
    2.120222616432848e-34,
    7.748730511776631e-57,
    0.003578579096228304,
    2.526392953635561e-13,
    4.784346387347093e-25,
    4.479589588343307e-19,
    1.417926631660356e-31,
    1.560205418103272e-49,
    6.130493933063196e-48,
    2.37117492537974e-18,
    2.940394440352886e-32,
    7.446355979429871e-37,
    3.118676622588433e-23,
    9.968301363606337e-9,
    1.521859029414736e-49,
    3.609147920404461e-25,
    6.983354003671792e-9,
    0.1585467319937267,
    3.338422775904432e-37,
    9.595597664995264e-37,
    0.0003057925291361377,
    8.401208150319214e-46,
    4.514270643055644e-21,
    5.485362909219561e-51,
    5.324879124859968e-14,
    1.595589230135812e-43,
    7.086145343291933e-35,
    7.104917234044433e-12,
    1.673975896192756e-19,
    1.060897321273998e-29,
    2.316681413143832e-36,
    1.403796393876887e-14,
    1.040719874713327e-39,
    8.387196293452668e-20,
    6.360172542642276e-33,
    5.090607708365689e-39,
    4.327219061931676e-41,
    1.443087200704126e-38,
    4.674189841336455e-28,
    3.835272451230127e-40,
    7.904510880174363e-32,
    3.51733786923769e-32,
    2.531489642073404e-13,
    1.277953363887158e-13,
    1.603085325261388e-36,
    4.928332540663066e-47,
    1.215041456874046e-21,
    7.203433191549935e-35,
    2.20714737834087e-14,
    7.813934987977009e-34,
    6.68100730339573e-30,
    2.012573669445031e-30,
    1.154546335883476e-24,
    1.018308191747435e-12,
    5.660346265905068e-18,
    1.949410058797539e-17,
    2.29760557366509e-29,
    3.296100108305671e-23,
    1.252917190577821e-16,
    4.26803265812725e-17,
    6.220727772338129e-52,
    1.953258961484201e-37,
    2.166525260823636e-44,
    1.30395259319723e-35,
    0.002029960657675602,
    0.0001297345417476474,
    4.067648944723295e-12,
    2.835893297458073e-26,
    1.325447685543632e-34,
    4.059370168246767e-32,
    5.068956452695746e-52,
    3.012324518150237e-25,
    2.791970843673514e-32,
    7.243978186201254e-34,
    1.690412942302328e-28,
    7.364846475893967e-29,
    3.035215561261325e-60,
    1.451415519635314e-33,
    0.000002087800322488086,
    4.647825272864894e-47,
    3.446521177360183e-39,
    1.339824129380187e-53,
    5.241412897672976e-30,
    4.423498221324334e-16,
    2.816052369210864e-39,
    0.000121904993909154,
    6.564455017596235e-13,
    1.288621335585659e-34,
    8.109720240710318e-15,
    1.558965464260915e-17,
    0.1768401352933231,
    0.000001672773688727899,
    9.074708875514352e-11,
    2.992607529686687e-52,
    3.039919457185604e-22,
    9.80770308743776e-10,
    7.191048823307199e-17,
    1.460147905212581e-11,
    2.45739482366235e-34,
    0.000001047202713909437,
    1.492612521749421e-19,
    3.230195763038607e-51,
    1.464950289948636e-11,
    3.180761432817703e-23,
    2.799983414509056e-34,
    3.531649482194922e-11,
    1.128314354058683e-13,
    4.017784315745637e-51,
    1.744905522751203e-30,
    1.282693131479732e-22,
    6.409407723643025e-44,
    1.18471812335176e-41,
    6.892853480448328e-14,
    5.650419972184908e-36,
    9.64111405238855e-37,
    5.747267101439483e-36,
    2.146868430363145e-35,
    5.21270656193094e-50,
    8.541404421874857e-11,
    7.962770001589273e-9,
    5.477754002674536e-37,
    1.447797893906449e-14,
    8.445652678307513e-19,
    4.487241857031719e-28,
    7.734577054347867e-34,
    2.259401844823975e-18,
    3.151479586459383e-10,
    8.645798997302742e-18,
    1.252958171424114e-15,
    2.231803851495847e-22,
    5.70827160767128e-16,
    1.08247744927667e-18,
    0.01958139705660261,
    2.594281881665925e-14,
    1.786621807319534e-41,
    4.431031184120145e-25,
    2.583910683495758e-30,
    1.828576228184393e-38,
    4.508254954236472e-46,
    7.714629298346228e-28,
    6.844829058339084e-41,
    4.135193670645232e-33,
    1.57879712558229e-49,
    1.228874009592393e-45,
    9.444502270969686e-45,
    1.019502977774434e-17,
    8.265948221109275e-52,
    2.901137365909333e-26,
    2.136464284766994e-18,
    1.894967484656234e-9,
    7.92094013928045e-15,
    3.438486631700906e-7,
    9.734451214637059e-17,
    0.0007572867584279084,
    1.667512511279235e-52,
    3.251265576991467e-47,
    3.430869639219304e-42,
    2.283004227728784e-19,
    2.452607249744297e-19,
    4.372769245130197e-43,
    7.34486310740933e-51,
    1.802094556746856e-24,
    2.274852057141918e-39,
    2.175529543199941e-17,
    8.106200002550738e-10,
    1.365733081508017e-24,
    7.863117936678443e-32,
    4.965047465319137e-35,
    0.0005389299779223144,
    2.118031361578871e-34,
    3.905658968821129e-32,
    2.328315154059207e-43,
    2.783171869558595e-40,
    2.644437510226846e-23,
    5.059063269323763e-57,
    1.331416586340235e-57,
    6.758068258178123e-11,
    5.441645232438666e-28,
    3.836611553917645e-36,
    8.325102675234417e-19,
    1.417135526189061e-20,
    1.133333033663562e-17,
    2.234116642715177e-35,
    0.00000716050984613982,
    1.425201846495341e-33,
    2.740558117319246e-36,
    1.636697547964214e-33,
    4.040270100786446e-11,
    0.00511670107537019,
    1.753056479674802e-29,
    2.829993406764062e-58,
    5.299101023561629e-33,
    1.558471773220425e-57,
    3.00042902874354e-12,
    1.639634396788618e-46,
    3.391040054863511e-13,
    3.994951399036652e-9,
    1.060962281673422e-14,
    2.036335376115224e-25,
    0.003067739409107956,
    1.78064617182619e-51,
    4.343565894451729e-43,
    1.498409267730821e-44,
    6.782166945452713e-25,
    4.461141192326691e-39,
    1.427104603507471e-23,
    2.747675493235985e-35,
    5.872820605042985e-16,
    4.384687554178931e-47,
    1.105016418845677e-25,
    2.502662663849437e-52,
    9.182873548787061e-24,
    1.355198133482296e-20,
    1.02260469726659e-16,
    1.661383153175422e-56,
    4.985072911635863e-20,
    0.00001214445173157055,
    2.925869421934631e-49,
    1.25826777016611e-39,
    0.000001135201840262408,
    4.736384148341215e-14,
    3.969559293031769e-17,
    1.184947527916434e-9,
    4.819865217328564e-14,
    1.253685469373886e-13,
    1.852618201024748e-33,
    1.913625120930318e-24,
    3.864152800652522e-26,
    1.411786975044802e-16,
    8.827147730184176e-51,
    1.073549397820135e-11,
    2.819110059021742e-14,
    8.724872564893826e-17,
    9.103803035135836e-34,
    2.786674949774567e-10,
    5.709453824526831e-34,
    0.000167258516225779,
    1.835844937587627e-41,
    6.206883934187671e-25,
    0.001392169129903042,
    1.20243877641255e-10,
    3.665148272198176e-54,
    7.242617429709161e-14,
    1.70432050318064e-25,
    4.383248834981813e-20,
    6.654589529743752e-12,
    2.373828609496222e-30,
    1.933056198143544e-28,
    1.428584579791414e-55,
    2.153909494296927e-19,
    4.380216426941141e-48,
    4.346253540108698e-30,
    1.16681776128491e-19,
    3.178213037820069e-39,
    4.706719532035488e-27,
    2.177800069161658e-13,
    1.175252638400918e-15,
    5.192323921563029e-9,
    3.534187161151032e-34,
    1.145618084186322e-40,
    1.418889681620501e-35,
    1.008318690432986e-25,
    7.551277134659897e-37,
    4.202823991599042e-44,
    6.680188779125147e-46,
    1.786568628519752e-18,
    5.170960188424678e-48,
    1.128753782072552e-35,
    7.882261384303939e-37,
    4.317188543138061e-41,
    0.4923750528319302,
    8.09201058006941e-11,
    1.149565316238273e-47,
    4.10414658580575e-18,
    1.947088492277389e-21,
    9.77702946065214e-35,
    4.484404636221911e-43,
    8.44116855567373e-57,
    1.6747690472702e-49,
    2.054435150117186e-24,
    1.779848442933363e-26,
    1.510588789182684e-22,
    1.271067605697967e-44,
    1.047666022451132e-59,
    2.300226799763977e-36,
    3.796430806907441e-52,
    1.072861008195361e-14,
    6.73095443933808e-26,
    1.831330101029371e-12,
    3.26421162416924,
    2.855585346177374e-49,
    4.693708165864229e-39,
    1.355139846828903e-22,
    2.2328045714524e-19,
    1.042527967409087e-17,
    0.01374600756140833,
    3.143175196677861e-25,
    3.18213289688292e-52,
    1.887370867578935e-16,
    3.997328243128586e-14,
    1.128299411196946e-45,
    3.266817700481301e-11,
    2.835328741695694e-37,
    5.853098577327226e-10,
    3.054646350652964e-42,
    2.990189758045443e-34,
    7.253912198564363e-40,
    2.658814738986002e-40,
    2.310489501943641e-30,
    1.462163506535793e-32,
    7.84679163956848e-45,
    2.568437254742836e-34,
    8.283048281622288e-35,
    5.872302537707463e-8,
    7.211638251578126e-49,
    3.142013293724181e-16,
    2.014983498180692e-36,
    3.523601996850562e-57,
    1.378901961725029e-19,
    9.631087792292678e-11,
    0.08200526516775733,
    1.560131101842405e-33,
    3.559536970522048e-50,
    2.839325934373767e-20,
    6.520429540241335e-46,
    0.0001190032473619185,
    5.923255127509756e-44,
    1.906620103743618e-15,
    1.560932996127698e-20,
    4.070197155754265e-15,
    5.278792691079158e-17,
    1.019708982552936e-17,
    3.894906298479841e-17,
    1.827835453278188e-10,
    1.649329811361617e-17,
    7.184690384194443e-33,
    4.667775244145401e-48,
    2.078381317103085e-25,
    0.006903827344447053,
    1.696458645260694e-35,
    8.374655162722217e-7,
    9.754594630567904e-23,
    2.98056102113506e-33,
    1.810550050459079e-17,
    6.338137202971619e-11,
    5.922251752912143e-12,
    1.895308624425718e-42,
    2.213410767166716e-44,
    2.532387424929398e-26,
    3.177914656054988e-52,
    2.551762527932522e-22,
    2.776716861889753e-43,
    0.000001092463121171109,
    2.644034104130604e-54,
    6.53457155573253e-27,
    3.868682859983213e-20,
    7.410861961964477e-43,
    5.323623037030299e-48,
    2.473432645302575e-36,
    1.16281986450259e-38,
    1.127818194522668e-8,
    5.547624237232754e-15,
    1.142578400779442e-43,
    4.518131136850785e-37,
    1.277544657405219e-57,
    3.426685375133387e-23,
    6.359143671951073e-37,
    3.852274605859349e-31,
    0.000009726009853162827,
    2.745406304509013e-25,
    2.862165275383411e-7,
    1.275265065842314e-7,
    1.997248164899257e-38,
    2.170250314493865e-46,
    1.359540308569391e-36,
    2.703387673295416e-37,
    1.704381543498563e-41,
    8.18451567965825e-25,
    1.30216208521538e-16,
    2.277723863963776e-38,
    1.215569622084896e-37,
    3.805399526121823e-13,
    5.075595111747111e-8,
    1.249389496276153e-19,
    6.878278131187102e-12,
    2.872937185912913e-27,
    1.757616044348157e-29,
    2.45084002297132e-30,
    5.721540611658892e-7,
    3.826859241017865e-34,
    6.503896755332281e-25,
    7.079560604826531e-19,
    1.192498409616472e-40,
    3.737311754981811e-44,
    0.00008429618865976445,
    0.01281442917450823,
    0.000004337037599597244,
    0.0002130860866452779,
    3.45896301722141e-37,
    3.201542100690295e-50,
    1.316045811093085e-42,
    3.118921162818209e-14,
    1.141418029650257e-54,
    4.104910823808214e-21,
    2.776778194778728e-33,
    7.405773113896124e-27,
    1.626952516053502e-24,
    1.212392075035712e-8,
    7.821000765652112e-15,
    0.000001580485380331513,
    2.523629604774918e-28,
    5.916673237546973e-38,
    1.653898797714137e-14,
    3.225872716263444e-39,
    6.386536667814561e-30,
    3.123875417752987e-42,
    8.921398956383267e-42,
    3.245263403741268e-43,
    8.882971993974394e-16,
    4.905599254941365e-13,
    3.455732262831471e-50,
    3.999217796604291e-10,
    1.024679182765216e-41,
    5.893392209936035e-14,
    4.49674404004463e-15,
    1.444887288440523e-31,
    2.584443711339336e-34,
    2.537937126142398e-22,
    2.089286515972074e-30,
    1.720207103860321e-24,
    1.058377677169761e-30,
    3.087860548697764e-45,
    1.995496559101669e-14,
    5.555558267033661e-51,
    1.712168027668864e-15,
    9.49234456727887e-22,
    6.851485008199222e-43,
    1.714075118293582e-46,
    7.804002139480332e-43,
    1.004315326361025e-26,
    3.14445066633562e-45,
    1.01239586036548e-28,
    1.418757764331278e-22,
    4.475222390797232e-16,
    6.522262607474339e-46,
    4.443825795889598e-23,
    3.340749953342712e-19,
    2.552275179320981e-20,
    1.014223365283492e-17,
    2.917673589875603e-16,
    1.908406350663904e-39,
    4.400925311597597e-23,
    2.342689718534691e-18,
    1.68988615429789e-32,
    1.963431812300721e-35,
    1.918011778223395e-7,
    1.779292296212671e-10,
    1.191235856008938e-30,
    4.488153282201061e-19,
    5.003108113389026e-46,
    2.901551813655338e-41,
    4.597829797472754e-39,
    3.895847519027965e-27,
    3.989925471216846e-40,
    2.289973316390775e-23,
    1.38329365404468e-20,
    1.129990035016898e-19,
    2.930977580098803e-7,
    5.496379150593017e-16,
    6.238576846170893e-13,
    7.877622724767896e-39,
    9.796555284955179e-29,
    4.51043803801195e-9,
    7.167391794925529e-25,
    1.261985484685493e-35,
    5.887346923003961e-43,
    1.567381531312356e-26,
    9.825358365763291e-34,
    5.549154662484751e-20,
    3.100309392346527e-12,
    1.567448446255572e-19,
    1.913832702498752e-17,
    0.00004398295926772167,
    8.134608616044885e-33,
    6.346863519459164e-46,
    5.347135948115774e-22,
    1.766083921926242e-12,
    4.104062323134483e-21,
    3.93194073786856e-18,
    1.502728062021111e-16,
    1.201952382063939e-15,
    1.999397777926735e-31,
    5.121424411109847e-56,
    8.221768165011026e-31,
    4.444109603884724e-11,
    5.721837891749485e-40,
    9.121179157723828e-8,
    1.244659847938152e-17,
    5.050366102986028e-26,
    1.492427090250954e-31,
    7.646227988532171e-22,
    0.0001812898367405849,
    4.662332492422793e-20,
    6.125311838838679e-28,
    1.598556967492984e-52,
    4.762271219753535e-30,
    2.099263608381418e-48,
    1.320495139339372e-15,
    0.6795825349970777,
    1.110025280780261e-41,
    1.604437763424301e-46,
    6.402309897805628e-14,
    5.706159722304038e-31,
    1.283230578056967e-54,
    1.242242623895276e-12,
    3.196537724144989e-12,
    3.39742271018617e-42,
    3.416331670435235e-27,
    2.851402944226702e-37,
    3.016667931586724e-57,
    1.528563285495343e-39,
    1.745771890699129e-33,
    3.008354214810558e-35,
    6.742704320890061e-23,
    5.584180036824618e-15,
    3.225525673514809e-48,
    1.668293717643164e-7,
    2.685835727073247e-49,
    9.602572435006519e-47,
    1.174340369764294e-18,
    7.921981151802447e-28,
    0.00001342391762294804,
    2.402094734544927e-11,
    1.23561932524843e-40,
    0.00005378360581335317,
    1.920832582763834e-33,
    3.746336985748414e-38,
    1.978662103367993e-34,
    1.7102017933393e-17,
    4.276700385299595e-17,
    1.899694782684646e-16,
    2.657388966085789e-36,
    7.907693941523782e-56,
    4.735877786669474e-15,
    1.015761807521386e-45,
    2.726973233224249e-8,
    2.857413205034403e-16,
    3.525651524900543e-49,
    4.402184257196851e-15,
    3.01496588772369e-22,
    1.252150997816996e-33,
    6.020284043131807e-53,
    0.00000607343949896093,
    1.66236547367368e-15,
    1.241032773523153e-50,
    7.07770797203773e-46,
    6.595841577603751e-28,
    1.292986531148342e-10,
    1.672041739721618e-16,
    6.432090021679424e-7,
    0.00002236616282556218,
    1.859793910783122e-30,
    2.821283844782067e-24,
    1.122912306503972e-35,
    3.356165997937189e-32,
    2.003875842713728e-13,
    4.819370353995281e-18,
    2.85890147641258e-32,
    5.889763210786622e-38,
    3.173244156083298,
    0.02367641674267349,
    1.405398028505882e-20,
    1.805482081260424e-33,
    2.187353255927127e-17,
    1.849613996079769e-32,
    2.317137531098317e-39,
    1.360463411907787e-18,
    6.79745604395695e-33,
    5.546715281339902e-32,
    1.880860143744861e-25,
    0.00001883996898292291,
    5.769598687398914e-35,
    4.923027735046189e-47,
    5.234056742851045e-20,
    1.293493223177377e-49,
    7.615256591746499e-12,
    6.888496727952031e-34,
    1.849617283359088e-44,
    2.232756546803194e-19,
    7.60634304536456e-27,
    3.441032599528529e-45,
    1.369846984577278e-27,
    2.059030632260864e-51,
    2.839835168393931e-41,
    2.808279926801466e-16,
    2.991127204973394e-15,
    8.180639736703642e-32,
    4.447256273049742e-47,
    1.825714913003557e-38,
    1.678411969704646e-16,
    7.993555830339114e-18,
    3.831305035033173e-8,
    3.469889775112253e-40,
    4.883735383068678e-31,
    0.0009490310763862052,
    7.152486612485798e-60,
    1.037384377387993e-39,
    6.06263950855376e-52,
    2.549310593528968e-25,
    1.48484585845148e-28,
    1.72611301763216e-28,
    1.628866056954861e-40,
    1.916050611136255e-32,
    1.647574573446099e-49,
    1.320786853559396e-9,
    1.27365874619913e-33,
    4.063112734192724e-26,
    0.000001983368380326804,
    5.058212628494771e-41,
    2.146326530875089e-49,
    5.663999303189763e-52,
    3.034667961121007e-9,
    2.280729017751452e-26,
    5.037260252265878e-16,
    1.022759880011901e-12,
    2.110099701059001e-24,
    5.885315028127001e-33,
    0.0001047637603592335,
    5.743117235307664e-24,
    2.190786232392533e-18,
    1.524028458555446e-14,
    2.236821402146851e-40,
    1.265567959547181e-48,
    1.942232012535895e-51,
    2.46320872275855e-54,
    2.609897257954161e-28,
    4.132045759602039e-26,
    5.768465779351389e-31,
    5.651248549178089e-24,
    5.824588576568777e-51,
    0.00004108143332276498,
    0.0006819149925216775,
    9.652791298032258e-37,
    5.03702156938803e-49,
    9.492078654537755e-19,
    2.233908435349024e-12,
    0.0008772075706591504,
    0.0005116817776787239,
    6.530021608291114e-38,
    1.895389609558642e-32,
    2.778456472477204e-45,
    6.088499603690863,
    6.785512969762706e-27,
    1.823183396016322e-21,
    1.644086266761111e-19,
    1.648281345584015e-24,
    0.004622537722178436,
    9.090060045894037e-16,
    9.307857918466176e-14,
    1.432827677445656e-9,
    1.253625350569069e-29,
    2.491170962009314e-15,
    9.573649581379305e-21,
    9.292451889920544e-38,
    4.468058537908574e-54,
    4.399450138268814e-7,
    1.955204790380463e-42,
    0.5375219929345195,
    4.714284327157476e-50,
    8.473638005880017e-21,
    5.405800154831667e-27,
    3.455166858391714e-19,
    1.048559412241208e-32
  ]
}

},{}],31:[function(require,module,exports){
module.exports=[43.75,72.25,51,36.25,38.5,35.25,57.5,91.75,8.5,4.5,98.75,25,75.25,50.75,34.5,43,73.25,95.5,44.5,38.75,68.5,58.5,78.25,36.5,43,40.5,81.75,41.5,95.25,44.5,1.25,6.25,37.25,55.5,60,94,50,94.5,67.5,59,82.5,27.5,27.25,23.5,76,72.75,85.5,27.75,35.25,95.5,89.25,38,65.75,94.75,89,23,95,20.5,10,75,12,74.75,75,52.5,49.25,14,23.25,1.25,24.75,91.75,78.25,3.75,75.75,68.25,87,73.5,18.75,68.5,1.75,15,62.75,81.25,1.5,47.75,20.25,14.25,47,65.25,41,35.25,39.75,46,7,16.5,20.5,93.25,25.25,53.75,97.25,82,26.25,74.25,54.25,51.5,46,77.75,70.5,90,13.25,31.75,10,82,41.5,43,24.5,25.75,80.5,60,92.25,98,69,88.5,21.75,88.25,82,24.25,51.5,85.25,13.25,87.25,53.5,94.25,85.25,83.75,28.25,100,73.25,6.75,26.5,36.75,83.75,7.5,49.5,42.75,17.75,99.5,70,87.75,15.75,72.5,18.75,26,14.25,17.5,63.5,77,18.5,22,28.5,80.25,24,4.25,59,81.75,25,29.25,74.75,39.25,55.25,81.75,89.25,43.5,75.75,21.75,61.75,39.25,29.25,62.75,18,81.75,88.5,39.75,78.5,52.75,48.5,42.5,48.75,66.75,60.5,26.25,64.25,45.75,76,26.5,68,26.25,32,82,43.25,85.5,76.75,50,80.75,63.75,65.75,83.25,63.5,2,45.5,78.5,74.25,65.5,97.25,44.5,13.75,6,86.25,41.5,81,69.5,59.25,95,93.75,68,98.25,9.25,98.25,42,20.75,21,31,56,74.75,53,18.75,67.75,90.75,40.5,12,68,77.25,87,87,3.75,21.25,87.25,99.75,43.75,95,18,100,73.25,48.75,36.25,74.75,20.25,18.5,50.5,45,16.5,15.75,50.25,22.25,65.5,45.75,72.25,59,23,35.5,40.5,53,85.25,84.5,83.25,59.5,8,86.25,77.75,86.75,13.5,73.5,15.5,33.75,23,16.75,34.5,30.75,11.5,56.25,29.5,32.5,13,78,56,67.75,63,19.75,19,84.25,7.25,98.75,61.5,72.5,64,13,48.5,68,58,16.75,24.25,64.25,58.75,6.5,61,6.5,96.25,69.5,48,80.25,32.75,85.75,10.5,35.75,65.25,22.25,82.75,79.25,24.5,16.25,62.5,37.25,42.25,62.5,96.5,8.25,59.5,64,91,95,20.25,74,5.25,93.25,97.5,56.5,99,93.5,16.5,48.5,71.75,71.5,38.5,75.5,68.5,26,67.5,83.5,50.5,32.25,26,46.75,62.25,83.25,47.25,34.5,68,70.25,92,24.25,64.5,48.5,3.75,62.25,42,33.25,89,9.25,38.25,5.25,68,31.5,15.25,17,39.25,13.5,20,80.75,4.5,27.5,21.75,14.75,31.5,73.25,70,58,37.75,85,60,57.5,74.75,19.75,96.75,45.75,58.5,91.25,82.25,73.75,71.25,61.75,88.25,44.5,22.25,44.5,61.75,93,63,67.25,4.75,69.75,19.75,95,42.25,61.25,87,62.75,77,50.25,78.5,57.25,55.25,7,93.75,49.5,20.75,69.5,14,22.75,43,14.75,5,0.75,17.5,11.75,67,32,24.25,94.25,50.25,29.75,95.25,50.75,53.5,40,40.25,53.25,13,33.75,63,96,13,28,34.75,2.75,84,84.5,29,54.25,17.5,50.5,22,62.75,27,79.25,34.75,65.25,80,47.75,97.75,37.5,42.25,55,91.5,43,91.75,2.75,67.25,19.75,92,88.5,93.5,66.5,40.5,11.75,3.5,79.5,74.5,8,7,72.25,94.75,81.25,11,55.25,84.5,81.75,43.5,88,54,84.25,76.25,94.5,70.5,30.75,50,52.5,84.25,58,51.25,22.5,55.5,7.5,87.25,53.5,95.25,67.5,59.25,5.25,35.25,65.25,78.75,85,91.75,59.5,72,20.5,81.5,15.25,66,52.5,92.25,21.75,27.25,9,35,36.75,7.75,39.5,40.5,13.75,99.75,70,84.5,46,98,89.5,83.5,98.5,41.75,15.75,73,67.25,63.5,3,41.25,8.75,9.75,4.5,36,6.5,58.25,62.5,44,89,2,66.75,12.5,23,85.75,21,74.75,22.5,15.75,4.75,70.75,16.5,44.25,56.75,71,23.5,36.25,93.75,55.75,29.75,25.75,100,10.5,79.25,29.75,89.75,64,32.5,68.75,30.25,40.25,89,12.75,10,97.75,65,52,99.75,59.75,75.25,76.75,12.75,22.75,39.25,84.5,34.25,47.5,8.75,63.5,41.25,62.5,1.5,82,80.5,28.25,69.25,41.5,66.25,79.75,27.75,91.5,61,4.25,32.75,46.5,32.5,42.25,23,64.75,23,29.75,41.75,73.25,63,52.5,83.75,27.75,26.25,30,24,37,63.25,53.75,90.25,53,79,6.25,99.5,89.5,86.75,84.25,11.25,45.5,62.75,30.5,69.5,49.75,89.25,76,49.5,17.5,30.25,41.25,14.5,23.5,77,72.75,80.75,85.25,39.75,49.75,64.5,43.25,91.25,82.75,25.75,92,48.75,57.75,70.75,66.25,23.25,59,3.25,61.25,24.75,3.5,17.75,23,10,66.5,94.5,28.5,87.75,31.5,29,15.5,36.75,14.5,33.25,68.75,14.75,44.5,48.25,4,72.25,53.25,42,43.75,40.75,41.5,59.5,25,83.25,18.25,44.75,88.5,51.75,27,98.75,13.75,15.75,32.75,48.5,91,16.5,13.75,42.75,8,21.5,47,36.75,16.5,70.5,53.5,89.25,79,55.25,62.25,47.5,46,40.5,38,72.5,87.75,15.25,52,16.5,14,20.5,36.5,83.75,59.75,81.25,12.25,8.75,93.75,18.5,42.5,80.25,69.5,40,77.25,2,52.5,17.75,77.25,28.25,69,59.75,91,49.75,69.25,17.75,7.75,23,80.5,0.75,4,94.75,11.75,63.25,3,45,97.25,47.25,42.75,49.5,20.25,59,67.75,27.25,95.75,40.75,88.25,56.25,90.5,6,65.25,5.5,9,51.5,59.5,81.5,34.5,23,7.5,75,50.25,96.25,64.75,18,10,45.5,71.25,75.75,92.25,31.75,27.5,44,9.5,92.75,75,5,37.5,93.5,78.25,69,88,14.75,78.25,49.5,93.75,81.25,96.25,75.5,62.5,29,84.25,70.5,86.5,44,71.25,58.5,5,73.75,17.5,77.25,87.5,55.75,62.75,82.5,53.25,15.75,97.25,79,73.75,45.75,72,44.75,38.25,57.75,19.25,97.75,26.75,54.25,29.5,56,96.25,2.25,4.75,73,51.75,77.5,38,91.75,67.75,13.75,96,63.75,78.75,35,70.5,94,29.75,49.75,61.5,91,81.75,71.5,74.25,23.5,53.5,33.75,2.25,66.25,18.25,67.25,83,7,49.75,78.25,63.25,38.5,86.25,10.5,42.5,23.75,92.5,76.75,16.5,74.25,3.25,12.25,52,10.5,75,7.5,51.5,94.75,97,96.75,16.5,24,44.5,77.5,16.75,14.5,1,33,58.25,89.5,81.25,3.75,32.75,21.75,65.75,50.5,77.75,52.5,69,14.5,99,56.75,86.75,74,27.5,46.75,94.75,20.75,39.5,57.75,40.5,11.25,34,43,21.75,5.75,55.5,45.25,60.5,40,26.75,31,9,61.75,65.5,6.75,63.25,82.25,89.25,75.5,41.5,92.25,3,16.5,64.75,83,52.75,39.5,46.75,6,66.5,91.5,79.5,96.25,65]

},{}],32:[function(require,module,exports){
module.exports=[25.5,93.75,17.5,19.25,7,90,51.5,11.75,58,99.25,74,16.5,80.5,91.25,17,81.5,27.75,79.25,55.75,84.75,74,23,61.5,11,60,40,87.25,87,70.5,34.75,8.25,88,91.25,32.25,81.5,92.75,80.75,93.5,24,84.75,70,21.5,87.25,92,39.75,39.75,99.25,75.5,54.75,35.5,54.5,20.75,58.25,7,21.75,65,31.75,98,63.5,48.75,27.5,18,90.5,50.25,5.5,92.5,78.75,23.5,79.5,13,40.5,21.75,66.75,91.5,32,61,31.25,69.75,35.25,60,2.5,43.75,25.25,98.75,44,43.75,3.75,20.75,56.75,56,20.25,15,71,92.75,46.5,81.75,46.75,83.5,42,48.5,78.5,70.25,23.75,20.75,95.25,41.75,42.25,8.5,72,69,72,93,90,47.75,79.5,40,17.75,33.75,50.75,90.25,23,29.25,3,19,57,47.5,64.5,26,48,59,92.5,51.75,17.75,17.5,61.75,27,33.5,95.75,56.25,60.75,63,89.5,86.5,85,28,13,90.5,36.25,0.75,47,54.5,50,12.25,53.25,21.75,0.75,45,56,69,88.75,86.25,46.25,7,43,18.75,70.75,40.75,39,29.75,28.75,49.75,94.5,9.25,84,68.25,45,14,85,63.75,1.5,30,56.75,49.5,29.75,66.25,41.25,69.5,80.5,56.25,84.25,39.75,68.5,99.5,12.75,9.75,75.25,94.75,21,78.5,19.75,15.5,35.25,2.5,97,45.25,67.25,87.5,42,83.5,84.5,83,18,71.5,93.75,37,51,67,53.75,31.5,75,54.75,22.5,75,50.25,1.5,96.75,14.75,31.25,21.75,90.75,12.75,6.25,57.25,68,99.75,59.75,40.25,12,3.25,66.5,50.5,35.25,25.75,31,32.25,7.25,18.75,59.25,48.5,3,55.5,24,89.25,80,11.75,93.75,27.25,1.5,86.25,18,78,1.25,81.5,6.5,60.5,13.75,70,82.25,64.5,35.25,0.5,19,71,43.75,99.5,4,37.25,48,96.5,82.75,8.5,74,32.75,48.25,93.5,20.5,48,35.75,97,86.25,92.75,30.75,84,28.75,40.5,5.25,17.25,97.5,82.5,72,66.5,44.5,3.75,28.75,97.25,62.75,8.5,64.75,79.5,45.25,98.75,34.5,15.75,83.5,2.25,47.75,9.75,95.25,47,46.75,92,58.25,91.5,8.25,73.5,33.5,46.75,7.25,24.75,47.75,28,76.25,16.5,70.75,3.5,91.75,53,94.5,44,50,2.5,73.25,50.5,85.25,80.75,58.25,90.75,15.75,69.5,38.25,87.5,48.25,45.25,5.25,33.75,75,13.5,33.25,33.25,54,40,59.5,39.25,92,54.5,94.75,70.25,77.25,12.75,94,15.75,71.5,22,44,46.75,10.75,54.25,32,26.75,76.5,74.5,28.5,60,76,78.5,29.25,52.5,15.25,73.25,9.25,25,99.25,97.25,8.5,68.5,98,95.75,55.75,10.25,62.5,1.75,41,94,74.25,8.75,27.5,21.5,93.25,23.25,76.75,78.75,20.75,4.75,44.75,10,27.5,66.5,94.25,86,10.75,93.5,89,93,10.25,47.25,13.25,10.5,59.25,37.75,52.5,97.75,79.75,60.5,75,75.25,68.25,2.5,70.75,3.5,27.75,52.75,84,43.75,27.75,28.5,72,48.5,27.5,19.25,25,95.5,55.5,59.5,91.75,23,93.5,21,43,47.25,37.25,28,70.25,70,3.25,50,43.75,34.5,43.75,79.25,92.25,63.25,18.75,32.75,40.5,40.5,51,23.5,35.75,97,17.75,59.25,1,9.5,26.75,49.75,18.25,21.5,2.25,43.75,29.5,74.25,15.25,16.5,69.25,12.25,3.25,22.75,62.75,14.75,98.5,61.5,47.5,20,76.5,34.25,17.75,71.75,67,71.25,23.75,78.25,24,96,1.75,79,57.5,78.75,4.75,46.75,55.25,95.5,3.5,91,9.5,59.25,96.75,20,67.25,77,81.75,76,52,90.75,51.75,49.5,2.75,52.25,64.75,92.75,3.75,38.25,15.75,96.75,62.75,94,54.75,51.75,26.25,58.75,96,42.75,89.5,90.5,55.25,4.5,15.5,49.75,53,15,59.25,96.5,97,61,29.25,6,80.25,24,16.5,12.5,77,12.25,24.5,2.25,90,21,94.25,86,25.25,72.5,96,15.75,20.25,2.5,36,76,96,58.75,43.25,34.5,36.25,93,28,35,79.25,93.75,28.75,5.5,99.5,19,18.75,88,55.25,51.5,61.75,69,25.5,39,44,6.75,14,85.25,89.25,56,97.25,55,25.75,44.25,86.25,80.75,5,52.5,60.75,85.75,44.75,95.75,40.75,5.5,39.5,47,77.25,55.5,17.25,84.25,1,19.75,92.25,80.5,90.75,39.5,31,17.5,96.75,78.25,23.5,21.75,33.75,57.25,75.75,39.5,31.25,59.75,48.5,53.25,89.75,28.25,76,58.25,4.5,39.25,65.25,27.25,69.75,78,5.25,7.25,11.25,48.5,6.25,27.5,85.25,10.5,42.25,3.75,23.5,73.5,6.75,83.75,17.75,12.75,81.75,21.25,14.5,35,41.25,1,65.75,38.5,55.5,9.5,11.25,15.5,18.75,65.5,50.75,15,6.25,24.75,98.75,91.25,16,91.5,41.25,3.75,93.5,58.25,17.5,94.25,54.75,65.75,51,54,57,66.5,77,30,43,90.75,1,88.5,38.25,50,71,21.5,82.5,31.5,50.5,51.5,49,48,19.75,76,19.25,40.5,51.75,55,55.75,65.25,9.75,85.5,52.25,89.75,23.75,88.25,81.25,64,50.75,100,49.5,86.5,67,72.75,12,90.25,60.5,43,15.75,74.5,38.75,59,86.75,54,36.5,78.25,91.25,11.25,70.25,23,9,79.75,21.75,31,66.5,45,13.5,30,30.5,16.75,1.5,95,22.25,32.5,68.25,3.25,89.5,72,0.5,10,34.75,97,53.75,12.75,1.5,41.5,69.75,1.75,64.5,90.75,64.25,52.25,32.25,87,26,4,69.5,78,62,85.75,88,27,83,25,94.5,26.25,35,54,43.5,39,0.5,32,39.75,68.5,44.75,47.75,85,21.5,39.5,62.25,16,27,40.5,15,7.25,45.25,99.5,64,73.5,51,96.75,2.5,72.5,93.25,70,62.5,14.75,43,22.75,31.25,28.5,37.5,60,30.5,91.25,56.25,55,41,29,23.75,40.25,10,37,83.5,84,17,52.5,68.5,18.25,17.75,62.25,12.5,72,78.5,75.75,73.75,97.5,64.5,27.75,81.75,95.75,30.75,40.25,61.5,61.75,52.25,62,50,34.25,9.25,50,75,81.25,42.5,81.25,41.25,67,75,77.5,32.75,77.25,65,19,74.75,43.75,45.5,35.5,97,38,31.25,19,92.75,31,12.75,31.75,2.5,99,47.5,53.75,60.25,70.25,80.25,65.5,40,81.25,30,55.5,80.25,47.5,20,44.5,82.75,92,3,42.5,98,21.75,6.25,52.5,7.25,79.75,4.75,40.5,10.25,10.75,34,1.5,66,13,20.25,64.5,19,95.5,25.25,72.75,78.25,19,36.5,5,59.25,2.5,77.25,10,31.75,89.25,58,16.5,48.75,0.5,37.25,92,46,90.75,78.25,62.75,40.5,21,33.25,36.25,73,5.75,27,34.5,98.5,91.25,74.5,65.25,17.5,51.5,56,67.25,60.5,63.5,0.75,90.5,64.75,44,47,100,60.5,54.75,27,90.5]

},{}],33:[function(require,module,exports){
module.exports=[1.01802746958386e-20,1.69749170219848e-50,8.67602759698749e-18,1.96580154330093e-16,3.42399682571327e-09,2.34931610813104e-33,8.76094283417707e-34,9.75187667336275e-17,8.50467981070618e-12,1.11263253576237e-08,2.27131692385332e-52,6.1824403916174e-13,5.72616847510926e-48,2.75701193683147e-41,4.87138658250801e-15,6.6874575362704e-36,9.11807515159224e-27,2.01853815494864e-53,6.30803322541804e-31,2.10031857911383e-34,5.93790012360903e-44,5.38255140873478e-22,9.98691752175466e-43,5.95902775337446e-12,2.02664001822413e-31,3.28351395287637e-25,5.6474930863898e-52,3.70581142451777e-36,3.20452265656646e-50,1.44490098864231e-24,0.0636460294054685,1.08285276872338e-10,1.23196972675868e-34,4.83139716502854e-26,5.58456171481116e-43,2.2363816558186e-57,7.59726650614128e-39,9.35708439539867e-58,8.12336271207039e-24,2.30763224187256e-43,8.43975093350337e-47,1.8622202082493e-15,2.84542289490751e-28,2.6602887561744e-26,2.26348379492932e-33,9.17297466351487e-33,1.49884165157923e-56,4.44894440697201e-27,3.68798440374646e-27,2.84852901850771e-34,1.60130404814029e-42,1.85337480242623e-17,2.66642751452424e-38,8.45574138729128e-12,8.99418379125797e-25,6.76648133217472e-23,5.33969552822958e-32,1.20718370822023e-24,1.73202570612642e-13,4.27233306638629e-37,2.55732119015522e-11,9.98586210677742e-21,1.22608411823758e-50,5.96016335005986e-32,2.01843831737346e-08,7.25162743111694e-19,9.89834436155757e-25,0.0174031997942614,8.88117528406979e-26,6.50070619441968e-18,3.90233677906215e-34,3.40462713503219e-05,7.1053465850942e-44,1.78486604768963e-48,4.25262882068973e-31,2.52668564227508e-41,3.17212564372526e-15,1.03668750120148e-42,0.00176939785455149,3.65495042281369e-17,4.13771708023542e-05,3.35208101890857e-36,0.00688314388808428,3.03694280101364e-41,2.76254776440884e-18,6.94989463303188e-15,2.13189621082822e-06,1.46236287949087e-21,6.91370370954734e-30,1.98357207867453e-27,1.50335534342651e-17,1.25327207737562e-15,5.94047935051395e-11,4.86924760869031e-21,8.03585374187458e-19,1.15913763357599e-53,3.42681041325283e-21,5.46700683653087e-41,4.3817202106251e-38,1.82837833203586e-38,1.38656174717246e-26,1.40061019934544e-44,9.36807340791604e-22,1.00277883958836e-19,8.75112289248805e-40,1.26480677559204e-34,2.00244015760042e-33,2.43604821091431e-13,7.63968655667377e-17,2.9223524191013e-28,5.3237012463584e-14,1.12221442673153e-53,1.16276470218475e-36,2.87430848911298e-28,1.27853569394405e-25,4.8601124937227e-20,4.60303554170024e-21,1.34635733995295e-27,1.77167140306985e-41,9.2067024781801e-58,2.06180370180498e-23,1.15448419921163e-29,0.000170186740059696,1.12089032214907e-22,5.958189704745e-42,7.32879481013041e-21,1.1725582761856e-35,3.02707792728737e-27,1.00577306432809e-14,6.21428477783756e-44,9.4266874978228e-43,2.59040640529401e-42,1.82140827645952e-21,3.78282055302889e-21,2.74237171292686e-25,1.58663225381089e-29,7.54173530624532e-30,1.57491073653251e-11,1.72968493597323e-23,4.63546954085082e-29,1.21638646737304e-44,3.29723938523033e-12,8.40410069896942e-40,2.0351835550415e-36,4.11576358373707e-14,2.40774083981244e-18,7.18557273673763e-49,1.43286012646743e-33,0.155917358566143,7.76537472547573e-36,5.42149737726591e-19,3.80310943869957e-22,1.12041275527646e-08,4.49831170425142e-18,5.8925574987458e-22,0.0472002114489763,1.59802513651224e-17,4.46795284814628e-21,1.45842512656866e-26,6.39992332839411e-52,4.74182297691092e-26,6.00354045310168e-07,2.0519833371074e-10,6.01291782432242e-36,8.14972123620008e-14,3.12520344047712e-27,1.33809971623562e-33,1.5825001379177e-24,7.19155440829059e-25,1.68563349022735e-28,1.88778301632444e-40,2.0525620251809e-38,1.7556476351754e-13,2.77755394988206e-24,3.81269985187439e-40,2.90502890144182e-26,1.22325229743925e-12,7.48649602151462e-45,1.29489793705984e-19,0.00119351864556491,4.05246512465383e-30,2.0902749515671e-29,3.68312274258402e-38,2.1724392320466e-24,5.39382612331182e-35,3.41005924543143e-26,7.40352547465871e-36,3.72638055359125e-45,3.59800289272943e-36,2.75283158325896e-27,4.60425845988781e-31,1.89934942579329e-34,2.73614251436007e-53,1.54161912759615e-11,1.5449195764811e-13,3.62212607084026e-26,4.05463736298524e-32,1.46693934833372e-23,1.88459220869317e-35,5.37059807049523e-23,5.10553348969054e-19,4.33372370807173e-26,2.21706249950131e-05,5.25962905802579e-48,1.25474283825899e-33,4.78193494526346e-46,9.84574410122791e-46,0.000553709856035437,1.99411751421959e-37,3.75896509593778e-50,2.35507425999684e-48,8.39837632990743e-20,4.46720906082778e-51,8.6609681063333e-39,1.06095971948276e-13,5.13319048280188e-09,1.01206233997339e-46,2.42897756413516e-29,5.64875319368437e-30,1.47193426133962e-44,2.47812503540694e-35,7.06703074462777e-26,1.7553489415492e-51,4.50372499873606e-36,0.000906554863146929,2.02260564118528e-14,6.85583451481437e-20,1.16773507196558e-22,1.25874293093514e-13,2.16025220733709e-24,2.87738866497272e-12,1.65036834937986e-09,2.59328717369107e-40,4.39747660054673e-37,2.12173425744319e-23,2.38135446192737e-39,3.81338043034323e-36,4.6005620885367e-13,0.000596852750026921,1.41804951530864e-41,2.66897188849136e-38,6.45478406499065e-33,2.76088327547468e-27,9.62222565953911e-06,1.7258563770782e-16,7.62436333789152e-12,2.12173425744319e-23,1.59258594933628e-31,6.03430405192175e-41,0.000292397660818713,4.14738441878602e-45,1.48634343267566e-24,5.34387807697935e-40,2.35455808312665e-32,9.38441480399235e-16,4.27032346607597e-24,2.97872898727717e-14,0.00245134277921935,1.04196465973576e-37,3.65937748298625e-11,2.57634562759246e-19,0.00675394117242391,2.28157047321402e-24,3.45616504752759e-10,1.42519067591459e-32,2.85963533672068e-17,1.04308209233999e-39,5.94608001994302e-25,2.95204286972815e-29,1.09387923400468e-23,0.244040140184613,2.03690746251814e-22,1.12528203921255e-47,1.4223065989954e-36,9.10701523692327e-47,0.000757575757575758,7.16780352301948e-34,2.25014169331259e-37,3.30188347046583e-56,8.35541698012733e-18,1.26443059699548e-12,8.56576104425576e-19,5.95884537774549e-21,2.19912167431995e-20,2.66672666268407e-21,1.1814247684647e-16,7.67765146120823e-24,3.50634543145641e-12,7.46018659864177e-45,1.56967609054572e-29,3.694101748112e-32,2.2989462983953e-12,7.54637896644273e-50,1.5337422080816e-24,4.14407815567449e-32,1.05951117238656e-08,6.58511091126955e-12,1.98443598778683e-23,2.49458620896229e-51,2.91398368671284e-11,1.70009758537198e-49,2.39664666019491e-32,4.35524553364248e-07,6.52773644790754e-26,3.18770211814975e-18,3.88524621925531e-34,2.37049390529917e-12,6.11455095432096e-38,3.23558442646536e-20,1.90434364741721e-20,1.36299613432915e-48,1.11171788442623e-27,1.72546180846857e-06,7.78625633219528e-44,0.0137637429750495,8.26166565278524e-41,1.26449247364966e-13,9.41626648512084e-41,1.8479657871407e-37,2.31459482463326e-24,1.30540168738923e-54,1.46724132234478e-13,7.53595933534085e-34,5.76989119054249e-12,1.74086604756423e-23,2.47718135061941e-31,3.77678599779304e-37,4.18978716067895e-08,8.89793619024342e-13,8.41590038255158e-34,2.7697939222147e-20,1.44305926271851e-34,1.82802246723801e-18,1.29229991769683e-50,0.00128086780555334,3.93622080801801e-45,4.71289262062338e-36,5.49398457530533e-57,9.49631976364725e-39,3.15074851500144e-19,2.75201448509769e-05,4.91684779125099e-09,1.48633530006706e-41,5.44472767518674e-56,1.81134793179295e-41,3.98261410415621e-46,1.29476334351706e-56,1.7575653737808e-10,9.25697890391108e-36,6.90812293886876e-32,1.2267822178236e-48,7.22977055158506e-27,9.72957406202403e-36,6.92086059614364e-09,1.12163292648012e-18,6.5096979132895e-44,7.45889846459422e-18,2.06643809262437e-25,1.20104312355527e-20,7.41194529246436e-23,5.41225252196623e-27,1.05069315768751e-37,2.09233566662696e-34,8.189846724479e-40,8.52395411038718e-27,3.69354085621317e-49,2.14951329879034e-43,8.28550214778524e-52,3.91275656134729e-11,1.24296712550445e-47,2.10760973757886e-16,4.58366750219009e-07,6.0897521936829e-22,7.17418708507076e-27,1.48225309506992e-24,1.26866220407405e-15,3.20685838830535e-12,5.67063366821798e-22,7.62042076134258e-07,1.70410158027813e-44,5.2216258276721e-29,4.15423139739824e-13,1.53892649381622e-18,3.88678088621297e-33,1.61966031068899e-17,2.61698664856665e-15,7.02836982504849e-40,3.42037312860093e-05,1.26462504429814e-26,6.19035005441658e-09,3.41125630641433e-12,2.28329031345749e-32,9.99248493048387e-52,1.87600377881732e-12,5.76259940846897e-39,6.78870879031845e-36,1.99846744005165e-55,7.23207560907253e-36,2.68961011305328e-13,3.59143180277448e-42,0.00480804515051176,1.76365343540388e-37,1.90510135313522e-39,1.22323760922099e-40,1.16401521038783e-13,8.14075133218356e-28,4.99117259635238e-23,5.22417140073857e-50,1.3413549985442e-22,1.2512277325702e-50,4.62829171863692e-36,8.97953384820061e-14,2.02190538203903e-07,1.67954802401219e-32,4.69464591841583e-15,4.19735230662905e-25,2.37652821730127e-41,6.33103929008939e-09,1.23139086781756e-47,2.4305781927321e-09,6.62966867446247e-58,7.20897015273973e-37,4.08867810115679e-46,4.98100276127115e-15,1.11517760486281e-33,3.35193514165344e-17,6.12927246113901e-13,5.68656467488314e-42,9.98469584282899e-29,1.83789848818609e-33,6.84252374319208e-12,3.9754851758185e-53,6.43529482041249e-34,1.14590904658839e-22,1.24860545383272e-44,3.73755746803916e-17,0.000497046294543786,8.49807105089076e-34,0.000204149183673579,1.03570145275758e-06,0.0627173312470895,3.60685769602083e-21,2.9954172710469e-13,7.42765452836982e-26,4.39997702981203e-19,1.50060234431524e-24,8.24128270369011e-41,6.87950124653542e-23,4.06918992006977e-15,1.14134001444004e-27,4.3220765182941e-42,7.55398204190593e-34,3.92305916089721e-30,2.64171201567674e-36,3.33761109662673e-21,5.15981182598684e-18,1.03391398211464e-16,4.08874029068814e-32,1.59462733083829e-40,2.71511333500295e-13,9.3386665975831e-18,5.85199231201032e-30,1.31096825745596e-05,1.36083532632327e-06,1.27692570897827e-39,3.41882947992444e-22,9.64663220948126e-27,8.68253967057517e-17,9.80886341797856e-39,2.93372366200727e-25,5.265640149236e-39,2.70573346708642e-14,2.10996926088352e-30,1.61282025092384e-23,1.37080507914657e-31,4.20745472940704e-39,1.5219600559349e-20,1.00699933567721e-34,1.30017615298405e-35,1.06738133993752e-16,2.06113132865783e-35,0.010928961748634,1.50206406987227e-11,1.80642552625951e-28,3.30755214400051e-05,3.71487429106177e-20,3.11943787941842e-13,4.25708066366329e-05,1.61987050517527e-37,1.98313219178978e-30,2.23907283660137e-43,4.71095740956368e-15,4.51843918376635e-09,1.12994596656554e-06,1.69395744156783e-16,1.99916872034557e-06,2.30526837247578e-08,1.35978352553205e-10,4.57209138138486e-18,2.50876432324547e-59,1.78252994248072e-43,4.4330743502286e-13,7.85216864036334e-20,1.65365933176888e-49,1.37976327049549e-31,6.89261970794177e-17,7.43644862188822e-49,3.47860089296978e-37,1.07793634759967e-47,9.21666753148995e-25,8.19339094463301e-53,3.29868280295797e-24,1.6496620331115e-31,0.000964926967097883,1.70883055828147e-39,1.16093356736229e-42,1.4405408520221e-41,1.05982496208252e-07,7.0389070037909e-20,2.18766105168505e-34,2.06003115937616e-12,5.09759985153635e-07,1.88338936828146e-42,1.25558034201824e-14,4.0885003334213e-39,4.29847925419187e-46,3.09901590372274e-06,1.17140519075375e-29,1.03592681434264e-43,1.97241346437709e-49,1.74397178985247e-49,6.08947646475448e-42,6.51699367939109e-45,1.35201583414599e-37,2.73834093499808e-19,8.66949520895122e-06,1.59390503349207e-16,1.9305119361189e-40,2.32595676680108e-42,1.79100817714401e-07,5.84041218620199e-18,4.30573303020916e-13,3.78093607512659e-14,1.07963555559631e-28,9.1555581560851e-35,6.51709604043343e-11,4.11498270016974e-28,2.35344443343423e-20,3.84344921864986e-16,4.4043582341492e-60,1.55386948170795e-33,1.70857372153103e-53,5.96793843781991e-39,1.30975221731812e-44,1.75705198456584e-08,1.53595558010137e-19,3.62479532225673e-42,3.04950425493341e-29,5.09518369739119e-10,1.38800210074944e-40,2.80392131716297e-49,6.63771582048531e-48,8.39397983766081e-06,1.0164777012208e-21,6.35198353276178e-05,3.35683146210896e-14,5.24222414286149e-06,4.80614774665372e-15,6.1532163061576e-06,3.1013189760336e-41,2.6101610096319e-15,2.53559456938345e-20,4.58443753185797e-05,0.00012210012210011,6.73013012385101e-22,1.37955648065483e-17,2.3904024682683e-25,8.06508064006046e-27,1.46311180519248e-22,5.79244588189562e-52,4.61590421047772e-12,1.63626370798723e-11,0.0190835005713542,1.19729609273366e-30,9.94255329451096e-20,4.85242921895198e-39,8.09823883338935e-36,5.90331272913123e-34,6.6735257181412e-18,8.84654641840159e-23,2.23036987717393e-57,3.88140150518218e-24,2.50303820125975e-20,2.26278510706052e-26,1.89021815019146e-59,1.14814769944045e-10,1.61409217241605e-09,2.7395892197362e-31,8.37266920672017e-23,3.8853615674871e-20,1.60092184404869e-31,4.4561090329386e-38,2.31560469400655e-24,9.84602083044713e-31,3.92174301862114e-48,2.31242869139418e-11,1.52888462960385e-11,3.36078713180349e-39,1.96448808543272e-10,1.17110304712268e-15,1.33337673831526e-56,1.11223993110195e-44,5.64615815222459e-40,5.37004109695217e-53,4.63092403097359e-15,1.9984704419315e-15,4.68178653864082e-26,1.5403567017022e-52,1.96498793940516e-31,8.09230210010858e-08,1.13887960828716e-11,1.83735615672641e-38,8.04765249954205e-36,1.11527376034905e-32,0.000942197120604099,6.31991861175344e-35,1.48442416938912e-09,6.38486027133515e-21,4.094925948087e-35,2.04588530164416e-34,1.64423654241147e-37,1.27694096692733e-20,3.22171635985544e-28,0.010928961748634,2.01837068778743e-20,3.42853519227865e-08,1.37009828818805e-30,3.11661800408372e-39,1.77377210874543e-22,1.2608452531214e-22,7.48444889800408e-13,2.37183058565277e-48,1.6387141137423e-24,9.37263893054776e-17,1.25717311591251e-18,5.63383150497581e-30,3.32927832384344e-37,9.27838913004322e-39,1.29366512627047e-34,1.26371934557758e-18,6.18923106964817e-24,1.23432257479516e-23,1.00675482258907e-21,2.82288404971755e-34,1.56148701853216e-25,2.66019250488928e-39,2.70134767025327e-44,1.75161585238332e-07,1.12938556213433e-33,6.60075552198052e-10,1.2129817736835e-29,1.57529346263981e-48,1.25675413216543e-50,2.40429035847999e-09,5.0514817136072e-06,4.4904128327962e-13,3.88524621925531e-34,5.88577948055613e-08,4.32529210804002e-26,1.15741941712343e-39,2.18195376195925e-15,1.61240007625378e-34,1.76468341419542e-06,5.62699468069006e-13,3.46907553178597e-28,3.60816968938625e-09,9.97193757572184e-19,4.53416886135184e-13,8.96828866900533e-17,1.62882359278812e-47,1.31478537101265e-23,7.85313065470371e-19,2.13426751697695e-23,3.18153380824145e-28,0.0155038759689911,7.86094072994378e-33,2.6282184758685e-35,1.56973678517763e-41,1.15115815981169e-09,2.89481668226261e-16,2.81476629366595e-16,2.10876912391269e-19,4.59911448358825e-42,7.89805645277164e-36,6.26933357436715e-12,1.20781034429903e-09,6.53722151971185e-05,2.3585740648997e-47,4.3759354557347e-27,0.000156752642149812,5.76569856422459e-22,4.13492516315214e-19,0.000492941805163459,2.71873076567405e-48,3.35078559849893e-45,4.10641092312821e-14,6.8221246313871e-56,1.45916014034267e-25,2.53487217377311e-26,1.52275733630418e-16,1.34379265290053e-27,1.62954610571329e-16,1.42285001721821e-28,7.01611395837945e-45,3.8433691453564e-13,2.48817239328624e-27,4.73243010102268e-40,0.25,3.68725783385846e-49,5.2323527580996e-28,1.50506969321642e-28,3.62560711406539e-34,2.52242766415562e-18,2.24763837569941e-35,1.78373982622544e-26,9.30791800273132e-22,5.30500313978159e-40,5.81753198454385e-18,6.63902422160028e-29,2.89777447488596e-23,1.60283343761968e-38,1.72536792409591e-14,1.62172424627834e-37,1.84756728689244e-15,3.68592374167097e-17,2.60028592244687e-26,9.4030302149695e-35,1.04486696275379e-14,1.67995237580421e-20,1.64140058972067e-15,3.04051399703421e-37,1.70552375524629e-08,1.60078311715131e-24,1.16541653766639e-37,1.01852401373246e-29,3.80980032443352e-17,2.39798217600081e-51,5.28123892740792e-32,4.80469548319296e-54,7.65950768437184e-45,4.37335879214692e-39,4.33535736129998e-15,1.30513005381335e-39,1.15313580559793e-32,4.17854002878228e-26,5.74680516747711e-15,2.35363884282689e-45,6.86196436373763e-35,3.06053866660171e-17,6.1114785437983e-41,1.55242630782612e-17,8.96710271442841e-14,7.78333770619457e-23,3.1582425351685e-34,7.86777773054654e-16,4.96444677753026e-40,7.62927805635796e-25,5.73221872570663e-07,3.59736977132843e-13,3.24510770860835e-25,4.58617204718201e-15,1.09129533300267e-32,1.41166842987801e-36,7.39950822997123e-17,1.05394246037962e-21,7.06090043026423e-29,0.00336346436829937,0.00231325462012144,3.12362002701369e-22,6.56104413273415e-24,3.87484989203557e-19,2.07340610952128e-42,4.04705150326243e-06,1.7349642370286e-55,8.00282125438766e-37,0.213377668639726,1.32799886288607e-08,1.72485097039404e-09,1.99951488462616e-26,2.49879287202395e-40,0.182946048858321,0.101587301587302,1.97906608349382e-37,2.00373585032214e-15,0.000641228108406903,7.11880891648594e-06,1.62397297787421e-38,2.91243610897959e-48,6.38190452360363e-31,3.24624734348306e-23,6.69886806228935e-40,1.27743586687871e-14,4.48153160824254e-07,2.09251598867159e-42,4.03792673139586e-27,5.06637180137497e-47,1.42086784470222e-35,3.32056579247396e-54,9.75693768881443e-24,2.64985516982584e-53,2.8068993586235e-07,4.85871448006154e-48,5.25779130186976e-07,1.9703276711367e-10,8.78711668752446e-33,1.72148116768689e-31,5.51403683600607e-34,0.302857870587235,4.00378123302677e-17,1.05970176519683e-09,3.08354111682095e-44,1.52921486332159e-29,8.26166565278524e-41,1.36266171240048e-45,1.21075729755256e-12,1.36309122361842e-11,6.63736568130869e-33,6.14373374358263e-19,1.12343217068361e-26,1.63174569017991e-36,1.43642560913746e-13,1.97658406210327e-08,7.29373246174543e-28,8.43630452644222e-15,3.76506460716645e-47,8.22897795294559e-46,5.74917334073803e-08,1.41151581817542e-35,1.54155683169053e-05,1.9028015239344e-46,3.53586805663492e-49,3.07500304869167e-48,3.20104784653152e-17,1.5510936513134e-18,9.40364322609537e-29,6.1109171136121e-26,7.180662161639e-30,4.10850235966301e-30,3.26638574795396e-32,6.19347492537144e-38,8.16118653781827e-19,6.43912592932858e-54,7.00405001924455e-39,3.77054713104979e-42,1.48733146885612e-26,3.59079124671603e-27,2.07802711464201e-22,1.78770273265719e-07,4.24471800264057e-14,1.01641362225629e-15,1.82078362126865e-49,9.38813000438066e-53,4.63844658823365e-18,1.50135468124212e-35,2.7540343123199e-46,1.57142182054045e-18,7.63954419441339e-11,1.89361744288383e-47,1.09490001039198e-16,5.60444955060842e-45,1.45680690556808e-36,1.4445065399593e-45,3.65156425444792e-35,4.21562640241467e-36,8.67171709126621e-38,1.15065788762115e-14,7.09006625649648e-55,6.58629179222735e-29,3.94375564325613e-25,1.41105091926076e-21,2.24596935930729e-36,4.99420515363527e-47,0.000150306204394278,4.41448108335057e-08,3.77191329244695e-37,4.30038755054972e-26,1.43641217161091e-13,3.97210883476727e-27,5.76994723909117e-51,1.06795581986746e-45,2.02975982778272e-14,3.07064368548452e-54,1.40542149422893e-31,8.93878332035543e-45,6.76378983914751e-31,1.36675914590113e-45,1.80356737256693e-32,1.84827746848177e-28,3.74355664162996e-35,5.19740669017103e-20,1.10645519131998e-50,2.70107931682539e-36,5.28045198751642e-35,5.10420829294094e-31,8.71545801072206e-27,5.69690536442225e-28,1.7766148364155e-20,0.00139906871322874,5.0820078779998e-48,5.89724310980041e-15,4.4393533423602e-16,2.12343651386772e-30,0.00802334919981979,2.95337982426535e-42,2.88176061910844e-37,4.12643416368722e-36,1.08876754572577e-29,7.08729796301385e-48,6.28512876552462e-15,1.79938772464578e-32,3.41293067142916e-19,2.72910934211545e-53,1.57995582047802e-28,1.04235628905374e-17,1.4065766052696e-47,8.40151840975178e-06,4.59828919498245e-10,6.13217788369818e-30,4.63410809247314e-15,4.96714716192307e-51,0.00330237358101136,4.04863504066311e-29,3.52059705907351e-59,1.65912234570783e-25,6.08553976771933e-11,2.33513548147093e-17,4.78669807217801e-08,2.95722493178636e-36,1.57232946486077e-08,6.85794949993804e-16,5.28644921750716e-08,0.0930232558139539,4.1974278961267e-21,0.0019807107372372,3.74953023751454e-47,2.85487022536556e-17,4.38055782557642e-05,5.61630214060366e-28,4.6998585675567e-13,1.82908051376907e-48,7.04298442486098e-22,2.20484073821268e-46,2.51261288019408e-39,7.53317963048976e-21,4.69103459524944e-14,2.28463737293209e-09,5.76965066524527e-36,1.85629540401714e-05,1.24586084976793e-46,3.35648406207878e-10,5.72269901523455e-24,1.63938702325229e-56,1.21932093092659e-20,1.33090592727186e-15,6.23286189511559e-33,0.279375170655432,3.35512174724412e-12,6.23572582175293e-33,9.06122266157687e-28,6.14350706163695e-25,8.60504490988225e-10,1.46300612094475e-36,9.53420168897933e-27,4.0552631636263e-21,7.17596342814205e-23,1.42755598278655e-19,1.64018762467045e-28,7.09537446826187e-05,1.20893885205266e-24,5.51903666949223e-29,1.30799168034277e-11,1.63124605733982e-46,3.16613761303806e-48,8.22995956565613e-47,1.96898966480408e-20,9.07284478991912e-29,8.82099457986297e-44,6.292384803517e-06,2.95077684290284e-18,1.10282652383333e-39,0.044613395144071,5.03396996759186e-42,4.61602816031083e-31,2.6437489846387e-28,8.18658068792154e-09,8.9380712730694e-50,1.75866867093172e-45,1.68943543234314e-40,3.96440198039031e-29,5.16281471165491e-47]

},{}],34:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var beta = require( './../lib' );


// FIXTURES //

var a1 = require( './fixtures/r/arg1.json' );
var b1 = require( './fixtures/r/arg2.json' );
var expected1 = require( './fixtures/r/expected.json' );
var cpp = require( './fixtures/cpp/output.json' );
var expected2 = cpp.expected;
var a2 = cpp.a;
var b2 = cpp.b;
var i;
var v;
for ( i = 0; i < expected1.length; i++ ) {
	v = expected1[ i ];
	if ( v === 'Inf' ) {
		expected1[ i ] = PINF;
	}
	else if ( v === 'NaN' ) {
		expected1[ i ] = NaN;
	}
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.ok( typeof beta === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var val = beta( NaN, 2.0 );
	t.ok( isnan( val ), 'returns NaN' );
	val = beta( 2.0, NaN );
	t.ok( isnan( val ), 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided negative values', function test( t ) {
	var val = beta( -2.0, 5.0 );
	t.ok( isnan( val ), 'returns NaN' );
	val = beta( 4.0, -3.0 );
	t.ok( isnan( val ), 'returns NaN' );
	t.end();
});

tape( 'the function returns +Infinity if at least one argument is zero', function test( t ) {
	var val = beta( 0.0, 2.0 );
	t.equal( val, PINF, 'returns +Infinity' );
	val = beta( 1.0, 0.0 );
	t.equal( val, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'the function evaluates the beta function (tested against R)', function test( t ) {
	var actual;
	var y1;
	var y2;
	var i;
	for ( i = 0; i < a1.length; i++ ) {
		actual = beta( a1[ i ], b1[ i ] );

		y1 = isInfinite( actual );
		y2 = isInfinite( expected1[ i ] );
		t.equal( y1, y2, 'returned result is ' + ( (y2) ? 'not finite' : 'finite' ) );

		y1 = isnan( actual );
		y2 = isnan( expected1[ i ] );
		t.equal( y1, y2, 'returned result is ' + ( (y1) ? '' : 'not' ) + ' NaN' );
		if ( !y1 ) {
			t.ok( abs( actual - expected1[ i ] ) < 8e-15, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected1[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the beta function (tested against Boost)', function test( t ) {
	var delta;
	var tol;
	var i;
	var y;

	for ( i = 0; i < a2.length; i++ ) {
		y = beta( a2[i], b2[i] );
		if ( y === expected2[i] ) {
			t.equal( y, expected2[i], 'y: '+y+'. a: '+a2[i]+'. b: '+b2[i]+', expected: '+expected2[i] );
		} else {
			delta = abs( y - expected2[ i ] );
			tol = 160.0 * EPS * abs( expected2[ i ] );
			t.ok( delta <= tol, 'within tolerance. a: '+a2[i]+'. b: '+b2[i]+'. y: '+y+'. E: '+expected2[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});


}).call(this,"/lib/node_modules/@stdlib/math/base/special/beta/test/test.js")
},{"./../lib":29,"./fixtures/cpp/output.json":30,"./fixtures/r/arg1.json":31,"./fixtures/r/arg2.json":32,"./fixtures/r/expected.json":33,"@stdlib/assert/is-nan":7,"@stdlib/math/base/assert/is-infinite":18,"@stdlib/math/base/special/abs":27,"@stdlib/math/constants/float64-eps":90,"@stdlib/math/constants/float64-pinf":98,"tape":165}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"./ceil.js":35}],37:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":68,"@stdlib/math/base/utils/float64-get-high-word":72,"@stdlib/math/base/utils/float64-to-words":84}],38:[function(require,module,exports){
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

},{"./copysign.js":37}],39:[function(require,module,exports){
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

},{"./expmulti.js":40,"@stdlib/math/base/assert/is-nan":22,"@stdlib/math/base/special/trunc":57,"@stdlib/math/constants/float64-ninf":97,"@stdlib/math/constants/float64-pinf":98}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":44,"@stdlib/math/base/tools/evalpoly":61}],41:[function(require,module,exports){
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

},{"./exp.js":39}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"./floor.js":42}],44:[function(require,module,exports){
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

},{"./ldexp.js":45}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":18,"@stdlib/math/base/assert/is-nan":22,"@stdlib/math/base/special/copysign":38,"@stdlib/math/base/utils/float64-exponent":66,"@stdlib/math/base/utils/float64-from-words":68,"@stdlib/math/base/utils/float64-normalize":76,"@stdlib/math/base/utils/float64-to-words":84,"@stdlib/math/constants/float64-exponent-bias":91,"@stdlib/math/constants/float64-max-base2-exponent":95,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":94,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":96,"@stdlib/math/constants/float64-ninf":97,"@stdlib/math/constants/float64-pinf":98}],46:[function(require,module,exports){
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

},{"./log1p.js":47}],47:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":22,"@stdlib/math/base/tools/evalpoly":61,"@stdlib/math/base/utils/float64-get-high-word":72,"@stdlib/math/base/utils/float64-set-high-word":79,"@stdlib/math/constants/float64-exponent-bias":91,"@stdlib/math/constants/float64-ninf":97,"@stdlib/math/constants/float64-pinf":98}],48:[function(require,module,exports){
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

},{"./pow.js":51}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":61,"@stdlib/math/base/utils/float64-get-high-word":72,"@stdlib/math/base/utils/float64-set-high-word":79,"@stdlib/math/base/utils/float64-set-low-word":81,"@stdlib/math/constants/float64-exponent-bias":91}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":61,"@stdlib/math/base/utils/float64-set-low-word":81}],51:[function(require,module,exports){
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

},{"./log2ax.js":49,"./logx.js":50,"./pow2.js":52,"./x_is_zero.js":53,"./y_is_huge.js":54,"./y_is_infinite.js":55,"@stdlib/math/base/assert/is-infinite":18,"@stdlib/math/base/assert/is-integer":20,"@stdlib/math/base/assert/is-nan":22,"@stdlib/math/base/assert/is-odd":24,"@stdlib/math/base/special/abs":27,"@stdlib/math/base/special/sqrt":56,"@stdlib/math/base/utils/float64-get-high-word":72,"@stdlib/math/base/utils/float64-get-low-word":74,"@stdlib/math/base/utils/float64-set-low-word":81,"@stdlib/math/base/utils/float64-to-words":84,"@stdlib/math/base/utils/uint32-to-int32":87,"@stdlib/math/constants/float64-ninf":97,"@stdlib/math/constants/float64-pinf":98}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":44,"@stdlib/math/base/tools/evalpoly":61,"@stdlib/math/base/utils/float64-get-high-word":72,"@stdlib/math/base/utils/float64-set-high-word":79,"@stdlib/math/base/utils/float64-set-low-word":81,"@stdlib/math/base/utils/uint32-to-int32":87,"@stdlib/math/constants/float64-exponent-bias":91,"@stdlib/math/constants/float64-ln-two":93}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":24,"@stdlib/math/base/special/copysign":38,"@stdlib/math/constants/float64-ninf":97,"@stdlib/math/constants/float64-pinf":98}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":72}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":27,"@stdlib/math/constants/float64-pinf":98}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"./trunc.js":58}],58:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":36,"@stdlib/math/base/special/floor":43}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./evalpoly.js":59}],61:[function(require,module,exports){
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

},{"./evalpoly.js":59,"./factory.js":60,"@stdlib/utils/define-read-only-property":101}],62:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":27}],63:[function(require,module,exports){
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

},{"./evalrational.js":62}],64:[function(require,module,exports){
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

},{"./evalrational.js":62,"./factory.js":63,"@stdlib/utils/define-read-only-property":101}],65:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":72,"@stdlib/math/constants/float64-exponent-bias":91,"@stdlib/math/constants/float64-high-word-exponent-mask":92}],66:[function(require,module,exports){
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

},{"./exponent.js":65}],67:[function(require,module,exports){
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

},{"./indices.js":69}],68:[function(require,module,exports){
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

},{"./from_words.js":67}],69:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],70:[function(require,module,exports){
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

},{"./high.js":71}],71:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],72:[function(require,module,exports){
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

},{"./get_high_word.js":70}],73:[function(require,module,exports){
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

},{"./low.js":75}],74:[function(require,module,exports){
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

},{"./get_low_word.js":73}],75:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],76:[function(require,module,exports){
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

},{"./normalize.js":77}],77:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":18,"@stdlib/math/base/assert/is-nan":22,"@stdlib/math/base/special/abs":27,"@stdlib/math/constants/float64-smallest-normal":99}],78:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":71}],79:[function(require,module,exports){
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

},{"./set_high_word.js":80}],80:[function(require,module,exports){
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

},{"./high.js":78}],81:[function(require,module,exports){
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

},{"./set_low_word.js":83}],82:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":75}],83:[function(require,module,exports){
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

},{"./low.js":82}],84:[function(require,module,exports){
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

},{"./to_words.js":86}],85:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":69}],86:[function(require,module,exports){
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

},{"./indices.js":85}],87:[function(require,module,exports){
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

},{"./uint32_to_int32.js":88}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"./define_read_only_property.js":100}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{"./detect_symbol_support.js":102}],104:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":103}],105:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":104}],106:[function(require,module,exports){
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

},{"./native_class.js":107,"./polyfill.js":108,"@stdlib/utils/detect-tostringtag-support":105}],107:[function(require,module,exports){
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

},{"./tostring.js":109}],108:[function(require,module,exports){
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

},{"./tostring.js":109,"./tostringtag.js":110,"@stdlib/assert/has-own-property":2}],109:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],110:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){

},{}],113:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"dup":112}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{"base64-js":111,"ieee754":134}],116:[function(require,module,exports){
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
},{"../../is-buffer/index.js":136}],117:[function(require,module,exports){
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

},{"./lib/is_arguments.js":118,"./lib/keys.js":119}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],120:[function(require,module,exports){
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

},{"foreach":130,"object-keys":139}],121:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],122:[function(require,module,exports){
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

},{"./helpers/isFinite":123,"./helpers/isNaN":124,"./helpers/mod":125,"./helpers/sign":126,"es-to-primitive/es5":127,"has":133,"is-callable":137}],123:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],124:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],125:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],126:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],127:[function(require,module,exports){
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

},{"./helpers/isPrimitive":128,"is-callable":137}],128:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){

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


},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":131}],133:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":132}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{"./isArguments":140}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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
},{"_process":114}],142:[function(require,module,exports){
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
},{"_process":114}],143:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":144}],144:[function(require,module,exports){
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
},{"./_stream_readable":146,"./_stream_writable":148,"core-util-is":116,"inherits":135,"process-nextick-args":142}],145:[function(require,module,exports){
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
},{"./_stream_transform":147,"core-util-is":116,"inherits":135}],146:[function(require,module,exports){
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
},{"./_stream_duplex":144,"./internal/streams/BufferList":149,"./internal/streams/destroy":150,"./internal/streams/stream":151,"_process":114,"core-util-is":116,"events":129,"inherits":135,"isarray":152,"process-nextick-args":142,"safe-buffer":159,"string_decoder/":153,"util":112}],147:[function(require,module,exports){
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
},{"./_stream_duplex":144,"core-util-is":116,"inherits":135}],148:[function(require,module,exports){
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
},{"./_stream_duplex":144,"./internal/streams/destroy":150,"./internal/streams/stream":151,"_process":114,"core-util-is":116,"inherits":135,"process-nextick-args":142,"safe-buffer":159,"util-deprecate":171}],149:[function(require,module,exports){
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
},{"safe-buffer":159}],150:[function(require,module,exports){
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
},{"process-nextick-args":142}],151:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":129}],152:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],153:[function(require,module,exports){
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
},{"safe-buffer":159}],154:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":155}],155:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":144,"./lib/_stream_passthrough.js":145,"./lib/_stream_readable.js":146,"./lib/_stream_transform.js":147,"./lib/_stream_writable.js":148}],156:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":155}],157:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":148}],158:[function(require,module,exports){
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
},{"_process":114,"through":170}],159:[function(require,module,exports){
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

},{"buffer":115}],160:[function(require,module,exports){
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

},{"events":129,"inherits":135,"readable-stream/duplex.js":143,"readable-stream/passthrough.js":154,"readable-stream/readable.js":155,"readable-stream/transform.js":156,"readable-stream/writable.js":157}],161:[function(require,module,exports){
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

},{"es-abstract/es5":122,"function-bind":132}],162:[function(require,module,exports){
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

},{"./implementation":161,"./polyfill":163,"./shim":164,"define-properties":120,"function-bind":132}],163:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":161}],164:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":163,"define-properties":120}],165:[function(require,module,exports){
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
},{"./lib/default_stream":166,"./lib/results":168,"./lib/test":169,"_process":114,"defined":121,"through":170}],166:[function(require,module,exports){
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
},{"_process":114,"fs":113,"through":170}],167:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":114}],168:[function(require,module,exports){
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
},{"_process":114,"events":129,"function-bind":132,"has":133,"inherits":135,"object-inspect":138,"resumer":158,"through":170}],169:[function(require,module,exports){
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
},{"./next_tick":167,"deep-equal":117,"defined":121,"events":129,"has":133,"inherits":135,"path":141,"string.prototype.trim":162}],170:[function(require,module,exports){
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
},{"_process":114,"stream":160}],171:[function(require,module,exports){
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
},{}]},{},[34]);
