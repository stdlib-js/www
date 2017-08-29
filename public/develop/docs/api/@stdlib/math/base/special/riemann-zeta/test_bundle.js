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

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an integer
*
* @example
* var bool = isInteger( 5.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isInteger( -3.14 );
* // returns false
*
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./object.js":6,"./primitive.js":7}],4:[function(require,module,exports){
'use strict';

/**
* Test if a value is an integer.
*
* @module @stdlib/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/assert/is-integer' );
*
* var bool = isInteger( 5.0 );
* // returns true
*
* bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isInteger( -3.14 );
* // returns false
*
* bool = isInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
*
* var bool = isInteger( -3.0 );
* // returns true
*
* bool = isInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
*
* var bool = isInteger( 3.0 );
* // returns false
*
* bool = isInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./generic.js":3,"./object.js":6,"./primitive.js":7,"@stdlib/utils/define-read-only-property":144}],5:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a number primitive is an integer value
*/
function isInteger( value ) {
	return (
		value < PINF &&
		value > NINF &&
		isInt( value )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/assert/is-integer":25,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136}],6:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number object having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an integer value
*
* @example
* var bool = isInteger( 3.0 );
* // returns false
*
* @example
* var bool = isInteger( new Number( 3.0 ) );
* // returns true
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value.valueOf() )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":5,"@stdlib/assert/is-number":16}],7:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number primitive having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an integer value
*
* @example
* var bool = isInteger( -3.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( -3.0 ) );
* // returns false
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":5,"@stdlib/assert/is-number":16}],8:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],9:[function(require,module,exports){
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

},{"./is_little_endian.js":10}],10:[function(require,module,exports){
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

},{"./ctors.js":8}],11:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonnegative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":13,"./primitive.js":14}],12:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a nonnegative integer.
*
* @module @stdlib/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* bool = isNonNegativeInteger( null );
* // returns false
*
* @example
* // Use interface to check for nonnegative integer primitives...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonnegative integer objects...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonNegativeInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./generic.js":11,"./object.js":13,"./primitive.js":14,"@stdlib/utils/define-read-only-property":144}],13:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() >= 0
	);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":4}],14:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value >= 0
	);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":4}],15:[function(require,module,exports){
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

},{"./object.js":17,"./primitive.js":18}],16:[function(require,module,exports){
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

},{"./generic.js":15,"./object.js":17,"./primitive.js":18,"@stdlib/utils/define-read-only-property":144}],17:[function(require,module,exports){
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

},{"./try2serialize.js":20,"@stdlib/utils/detect-tostringtag-support":148,"@stdlib/utils/native-class":149}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],20:[function(require,module,exports){
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

},{"./tostring.js":19}],21:[function(require,module,exports){
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

},{"./is_even.js":22}],22:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":25}],23:[function(require,module,exports){
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

},{"./is_infinite.js":24}],24:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136}],25:[function(require,module,exports){
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

},{"./is_integer.js":26}],26:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":47}],27:[function(require,module,exports){
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

},{"./is_nan.js":28}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./is_negative_zero.js":30}],30:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":134}],31:[function(require,module,exports){
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

},{"./is_odd.js":32}],32:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":21}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./abs.js":33}],35:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":103,"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/base/utils/float64-to-words":119}],38:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":54,"@stdlib/math/base/special/kernel-sin":56,"@stdlib/math/base/special/rempio2":72,"@stdlib/math/base/utils/float64-get-high-word":107}],40:[function(require,module,exports){
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

},{"./cos.js":39}],41:[function(require,module,exports){
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

},{"./expmulti.js":42,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/trunc":92,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136}],42:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":58,"@stdlib/math/base/tools/evalpoly":96}],43:[function(require,module,exports){
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

},{"./exp.js":41}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/tools/evalpoly":96,"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/base/utils/float64-set-high-word":114,"@stdlib/math/constants/float64-exponent-bias":126,"@stdlib/math/constants/float64-half-ln-two":127,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136}],45:[function(require,module,exports){
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

},{"./expm1.js":44}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{"./floor.js":46}],48:[function(require,module,exports){
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

},{"./small_approximation.js":50,"./stirling_approximation.js":51,"@stdlib/math/base/assert/is-integer":25,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/assert/is-negative-zero":29,"@stdlib/math/base/special/abs":34,"@stdlib/math/base/special/floor":47,"@stdlib/math/base/special/sin":87,"@stdlib/math/base/tools/evalrational":99,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pi":135,"@stdlib/math/constants/float64-pinf":136}],49:[function(require,module,exports){
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

},{"./gamma.js":48}],50:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":125}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":43,"@stdlib/math/base/special/pow":62,"@stdlib/math/base/tools/evalpoly":96,"@stdlib/math/constants/float64-sqrt-two-pi":139}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":23,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/abs":34,"@stdlib/math/base/special/ln":60,"@stdlib/math/base/special/sinpi":89,"@stdlib/math/base/special/trunc":92,"@stdlib/math/base/tools/evalpoly":96,"@stdlib/math/constants/float64-pi":135,"@stdlib/math/constants/float64-pinf":136}],53:[function(require,module,exports){
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

},{"./gammaln.js":52}],54:[function(require,module,exports){
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

},{"./kernel_cos.js":55}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":96}],56:[function(require,module,exports){
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

},{"./kernel_sin.js":57}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"./ldexp.js":59}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":23,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/copysign":38,"@stdlib/math/base/utils/float64-exponent":101,"@stdlib/math/base/utils/float64-from-words":103,"@stdlib/math/base/utils/float64-normalize":111,"@stdlib/math/base/utils/float64-to-words":119,"@stdlib/math/constants/float64-exponent-bias":126,"@stdlib/math/constants/float64-max-base2-exponent":132,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":131,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":133,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136}],60:[function(require,module,exports){
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

},{"./ln.js":61}],61:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/tools/evalpoly":96,"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/base/utils/float64-set-high-word":114,"@stdlib/math/base/utils/float64-to-words":119,"@stdlib/math/constants/float64-exponent-bias":126,"@stdlib/math/constants/float64-ninf":134}],62:[function(require,module,exports){
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

},{"./pow.js":65}],63:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":96,"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/base/utils/float64-set-high-word":114,"@stdlib/math/base/utils/float64-set-low-word":116,"@stdlib/math/constants/float64-exponent-bias":126}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":96,"@stdlib/math/base/utils/float64-set-low-word":116}],65:[function(require,module,exports){
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

},{"./log2ax.js":63,"./logx.js":64,"./pow2.js":66,"./x_is_zero.js":67,"./y_is_huge.js":68,"./y_is_infinite.js":69,"@stdlib/math/base/assert/is-infinite":23,"@stdlib/math/base/assert/is-integer":25,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/assert/is-odd":31,"@stdlib/math/base/special/abs":34,"@stdlib/math/base/special/sqrt":91,"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/base/utils/float64-get-low-word":109,"@stdlib/math/base/utils/float64-set-low-word":116,"@stdlib/math/base/utils/float64-to-words":119,"@stdlib/math/base/utils/uint32-to-int32":122,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":58,"@stdlib/math/base/tools/evalpoly":96,"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/base/utils/float64-set-high-word":114,"@stdlib/math/base/utils/float64-set-low-word":116,"@stdlib/math/base/utils/uint32-to-int32":122,"@stdlib/math/constants/float64-exponent-bias":126,"@stdlib/math/constants/float64-ln-two":130}],67:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":31,"@stdlib/math/base/special/copysign":38,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136}],68:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":107}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":34,"@stdlib/math/constants/float64-pinf":136}],70:[function(require,module,exports){
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

},{"./powm1.js":71}],71:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/abs":34,"@stdlib/math/base/special/expm1":45,"@stdlib/math/base/special/ln":60,"@stdlib/math/base/special/pow":62,"@stdlib/math/base/special/trunc":92}],72:[function(require,module,exports){
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

},{"./rempio2.js":74}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":47,"@stdlib/math/base/special/ldexp":58}],74:[function(require,module,exports){
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

},{"./kernel_rempio2.js":73,"./rempio2_medium.js":75,"@stdlib/math/base/utils/float64-from-words":103,"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/base/utils/float64-get-low-word":109}],75:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":85,"@stdlib/math/base/utils/float64-get-high-word":107}],76:[function(require,module,exports){
module.exports=[1.00000000000000000000000000000000000000000,
0.166666666666666666666666666666666666666667,
-0.0333333333333333333333333333333333333333333,
0.0238095238095238095238095238095238095238095,
-0.0333333333333333333333333333333333333333333,
0.0757575757575757575757575757575757575757576,
-0.253113553113553113553113553113553113553114,
1.16666666666666666666666666666666666666667,
-7.09215686274509803921568627450980392156863,
54.9711779448621553884711779448621553884712,
-529.124242424242424242424242424242424242424,
6192.12318840579710144927536231884057971014,
-86580.2531135531135531135531135531135531136,
1.42551716666666666666666666666666666666667e6,
-2.72982310678160919540229885057471264367816e7,
6.01580873900642368384303868174835916771401e8,
-1.51163157670921568627450980392156862745098e10,
4.29614643061166666666666666666666666666667e11,
-1.37116552050883327721590879485616327721591e13,
4.88332318973593166666666666666666666666667e14,
-1.92965793419400681486326681448632668144863e16,
8.41693047573682615000553709856035437430786e17,
-4.03380718540594554130768115942028985507246e19,
2.11507486380819916056014539007092198581560e21,
-1.20866265222965259346027311937082525317819e23,
7.50086674607696436685572007575757575757576e24,
-5.03877810148106891413789303052201257861635e26,
3.65287764848181233351104308429711779448622e28,
-2.84987693024508822262691464329106781609195e30,
2.38654274996836276446459819192192149717514e32,
-2.13999492572253336658107447651910973926742e34,
2.05009757234780975699217330956723102516667e36,
-2.09380059113463784090951852900279701847092e38,
2.27526964884635155596492603527692645814700e40,
-2.62577102862395760473030497361582020814490e42,
3.21250821027180325182047923042649852435219e44,
-4.15982781667947109139170744952623589366896e46,
5.69206954820352800238834562191210586444805e48,
-8.21836294197845756922906534686173330145509e50,
1.25029043271669930167323398297028955241772e53,
-2.00155832332483702749253291988132987687242e55,
3.36749829153643742333966769033387530162196e57,
-5.94709705031354477186604968440515408405791e59,
1.10119103236279775595641307904376916046305e62,
-2.13552595452535011886583850190410656789733e64,
4.33288969866411924196166130593792062184514e66,
-9.18855282416693282262005552155018971389604e68,
2.03468967763290744934550279902200200659751e71,
-4.70038339580357310785752555350060606545967e73,
1.13180434454842492706751862577339342678904e76,
-2.83822495706937069592641563364817647382847e78,
7.40642489796788506297508271409209841768797e80,
-2.00964548027566044834656196727153631868673e83,
5.66571700508059414457193460305193569614195e85,
-1.65845111541362169158237133743199123014950e88,
5.03688599504923774192894219151801548124424e90,
-1.58614682376581863693634015729664387827410e93,
5.17567436175456269840732406825071225612408e95,
-1.74889218402171173396900258776181591451415e98,
6.11605199949521852558245252642641677807677e100,
-2.21227769127078349422883234567129324455732e103,
8.27227767987709698542210624599845957312047e105,
-3.19589251114157095835916343691808148735263e108,
1.27500822233877929823100243029266798669572e111,
-5.25009230867741338994028246245651754469199e113,
2.23018178942416252098692981988387281437383e116,
-9.76845219309552044386335133989802393011669e118,
4.40983619784529542722726228748131691918758e121,
-2.05085708864640888397293377275830154864566e124,
9.82144332797912771075729696020975210414919e126,
-4.84126007982088805087891967099634127611305e129,
2.45530888014809826097834674040886903996737e132,
-1.28069268040847475487825132786017857218118e135,
6.86761671046685811921018885984644004360924e137,
-3.78464685819691046949789954163795568144895e140,
2.14261012506652915508713231351482720966602e143,
-1.24567271371836950070196429616376072194583e146,
7.43457875510001525436796683940520613117807e148,
-4.55357953046417048940633332233212748767721e151,
2.86121128168588683453638472510172325229190e154,
-1.84377235520338697276882026536287854875414e157,
1.21811545362210466995013165065995213558174e160,
-8.24821871853141215484818457296893447301419e162,
5.72258779378329433296516498142978615918685e165,
-4.06685305250591047267679693831158655602196e168,
2.95960920646420500628752695815851870426379e171,
-2.20495225651894575090311752273445984836379e174,
1.68125970728895998058311525151360665754464e177,
-1.31167362135569576486452806355817153004431e180,
1.04678940094780380821832853929823089643829e183,
-8.54328935788337077185982546299082774593270e185,
7.12878213224865423522884066771438224721245e188,
-6.08029314555358993000847118686477458461988e191,
5.29967764248499239300942910043247266228490e194,
-4.71942591687458626443646229013379911103761e197,
4.29284137914029810894168296541074669045521e200,
-3.98767449682322074434477655542938795106651e203,
3.78197804193588827138944181161393327898220e206,
-3.66142336836811912436858082151197348755196e209,
3.61760902723728623488554609298914089477541e212,
-3.64707726451913543621383088655499449048682e215,
3.75087554364544090983452410104814189306842e218,
-3.93458672964390282694891288533713429355657e221,
4.20882111481900820046571171111494898242731e224,
-4.59022962206179186559802940573325591059371e227,
5.10317257726295759279198185106496768539760e230,
-5.78227623036569554015377271242917142512200e233,
6.67624821678358810322637794412809363451080e236,
-7.85353076444504163225916259639312444428230e239,
9.41068940670587255245443288258762485293948e242,
-1.14849338734651839938498599206805592548354e246,
1.42729587428487856771416320087122499897180e249,
-1.80595595869093090142285728117654560926719e252,
2.32615353076608052161297985184708876161736e255,
-3.04957517154995947681942819261542593785327e258,
4.06858060764339734424012124124937318633684e261,
-5.52310313219743616252320044093186392324280e264,
7.62772793964343924869949690204961215533859e267,
-1.07155711196978863132793524001065396932667e271,
1.53102008959691884453440916153355334355847e274,
-2.22448916821798346676602348865048510824835e277,
3.28626791906901391668189736436895275365183e280,
-4.93559289559603449020711938191575963496999e283,
7.53495712008325067212266049779283956727824e286,
-1.16914851545841777278088924731655041783900e290,
1.84352614678389394126646201597702232396492e293,
-2.95368261729680829728014917350525183485207e296,
4.80793212775015697668878704043264072227967e299,
-7.95021250458852528538243631671158693036798e302,
1.33527841873546338750122832017820518292039e306]

},{}],77:[function(require,module,exports){
module.exports=[
	-0.5,
	1.644934066848226436472415166646025189218949901206798437735,
	1.082323233711138191516003696541167902774750951918726907682,
	1.017343061984449139714517929790920527901817490032853561842,
	1.004077356197944339378685238508652465258960790649850020329,
	1.000994575127818085337145958900319017006019531564477517257,
	1.000246086553308048298637998047739670960416088458003404533,
	1.000061248135058704829258545105135333747481696169154549482,
	1.000015282259408651871732571487636722023237388990471531153,
	1.000003817293264999839856461644621939730454697218953331143,
	1.000000953962033872796113152038683449345943794187410595750,
	1.000000238450502727732990003648186752994935041821779658269,
	1.000000059608189051259479612440207935801227503918837302795,
	1.000000014901554828365041234658506630698628864788167885910,
	1.000000003725334024788457054819204018402423232893059295811,
	1.000000000931327432419668182871764735021219813567955136816,
	1.000000000232831183367650549200145597594049502482982284530,
	1.000000000058207720879027008892436859891063054173122604617,
	1.000000000014551921891041984235929632245318420983808894124,
	1.000000000003637979547378651190237236355873273512646028384,
	1.000000000000909494784026388928253311838694908753860000990,
	1.000000000000227373684582465251522682157797869121382982198,
	1.000000000000056843419876275856092771829675240685530571588,
	1.000000000000014210854828031606769834307141739537678698605,
	1.000000000000003552713691337113673298469534059342992145655,
	1.000000000000000888178421093081590309609138639138632560887,
	1.000000000000000222044605079804198399932009420465396423665,
	1.000000000000000055511151248454812437237365905094302816723
]

},{}],78:[function(require,module,exports){
'use strict';

/**
* Evaluate the Riemann zeta function.
*
* @module @stdlib/math/base/special/riemann-zeta
*
* @example
* var zeta = require( '@stdlib/math/base/special/riemann-zeta' );
*
* var v = zeta( 1.1 );
* // returns ~10.584
*
* v = zeta( -4.0 );
* // returns 0.0
*
* v = zeta( 70.0 );
* // returns 1.0
*
* v = zeta( 0.5 );
* // returns ~-1.46
*
* v = zeta( 1.0 ); // pole
* // returns NaN
*
* v = zeta( NaN );
* // returns NaN
*/

// MODULES //

var zeta = require( './zeta.js' );


// EXPORTS //

module.exports = zeta;

},{"./zeta.js":81}],79:[function(require,module,exports){
module.exports=[
	1.202056903159594285399738161511449990764986292340498881792,
	1.036927755143369926331365486457034168057080919501912811974,
	1.008349277381922826839797549849796759599863560565238706417,
	1.002008392826082214417852769232412060485605851394888756548,
	1.000494188604119464558702282526469936468606435758208617119,
	1.000122713347578489146751836526357395714275105895509845136,
	1.000030588236307020493551728510645062587627948706858177506,
	1.000007637197637899762273600293563029213088249090262679095,
	1.000001908212716553938925656957795101353258571144838630235,
	1.000000476932986787806463116719604373045966446694784937600,
	1.000000119219925965311073067788718882326387254997784519858,
	1.000000029803503514652280186063705069366011844730919543312,
	1.000000007450711789835429491981004170604119454719031882565,
	1.000000001862659723513049006403909945416948061665330469200,
	1.000000000465662906503378407298923325122007106269185336947,
	1.000000000116415501727005197759297383545630951652247172763,
	1.000000000029103850444970996869294252278840464106981987433,
	1.000000000007275959835057481014520869012338059264850925555,
	1.000000000001818989650307065947584832100730085030589309618,
	1.000000000000454747378304215402679911202948857033904529911,
	1.000000000000113686840768022784934910483802590643743590284,
	1.000000000000028421709768893018554550737049426620743688265,
	1.000000000000007105427395210852712877354479956800022742043,
	1.000000000000001776356843579120327473349014400279570155508,
	1.000000000000000444089210314381336419777094026812133645960,
	1.000000000000000111022302514106613372054456992138270248322,
	1.000000000000000027755575621361241725816324538540697689849,
	1.000000000000000006938893904544153697446085326249809274836,
	1.000000000000000001734723476047576572048972969937595907478,
	1.000000000000000000433680869002065048749702356590624136125,
	1.000000000000000000108420217249424140630127111654613825894,
	1.000000000000000000027105054312234688319546213119497764319,
	1.000000000000000000006776263578045189097995298741556686206,
	1.000000000000000000001694065894509799165406492747124861940,
	1.000000000000000000000423516473627283334786227048335793441,
	1.000000000000000000000105879118406802338522650015392383985,
	1.000000000000000000000026469779601698529611341166842038716,
	1.000000000000000000000006617444900424404067355245332308220,
	1.000000000000000000000001654361225106075646229923677181049,
	1.000000000000000000000000413590306276516092600938245550814,
	1.000000000000000000000000103397576569128709932840955917459,
	1.000000000000000000000000025849394142282142681277617708450,
	1.000000000000000000000000006462348535570531803438002161122,
	1.000000000000000000000000001615587133892632521206011405705,
	1.000000000000000000000000000403896783473158082562226281299,
	1.000000000000000000000000000100974195868289515336192507001,
	1.000000000000000000000000000025243548967072378244674341938,
	1.000000000000000000000000000006310887241768094495682609394,
	1.000000000000000000000000000001577721810442023616644432783,
	1.000000000000000000000000000000394430452610505903352639355,
	1.000000000000000000000000000000098607613152626475748329968,
	1.000000000000000000000000000000024651903288156618927101395,
	1.000000000000000000000000000000006162975822039154730666338,
	1.000000000000000000000000000000001540743955509788682543361,
	1.000000000000000000000000000000000385185988877447170622149,
	1.000000000000000000000000000000000096296497219361792654016
]

},{}],80:[function(require,module,exports){
'use strict';

// MODULES //

var pow = require( '@stdlib/math/base/special/pow' );
var powm1 = require( '@stdlib/math/base/special/powm1' );


// VARIABLES //

// -ln(eps)/2 => -ln(2.220446049250313e-16)/2 = 18.021826694558577
var N = 18|0; // asm type annotation

// 2**N
var TWO_N = 262144|0; // asm type annotation
var NEG_TWO_N = -TWO_N;


// MAIN //

/**
* Evaluates the Riemann zeta function using a polynomial series.
*
* #### References
*
* * P. Borwein. "An Efficient Algorithm for the Riemann Zeta Function". Canadian Mathematical Society, Conference Proceedings. See algorithm [3]{@link http://www.cecm.sfu.ca/personal/pborwein/PAPERS/P155.pdf}.
*
*
* @param {number} s - input value
* @returns {number} function value
*
* @example
* var v = zeta( 3.0 );
* // returns ~1.202
*/
function series( s ) {
	var sign;
	var term;
	var sum;
	var tmp;
	var N2;
	var i;

	sum = 0.0;
	sign = 1;
	for ( i = 0; i < N; i++ ) {
		sum += sign * NEG_TWO_N / pow(i+1, s);
		sign *= -1; // flip the sign
	}
	tmp = 1.0;
	term = 1.0;
	N2 = 2 * N;
	for ( i = N; i <= N2-1; i++ ) {
		sum += sign * (tmp - TWO_N) / pow(i+1, s);
		sign *= -1; // flip the sign
		term *= N2 - i;
		term /= i - N + 1.0;
		tmp += term;
	}
	return sum / (TWO_N * powm1(2.0, 1.0-s));
} // end FUNCTION series()


// EXPORTS //

module.exports = series;

},{"@stdlib/math/base/special/pow":62,"@stdlib/math/base/special/powm1":70}],81:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/zeta.hpp}.
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

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var TWO_PI = require( '@stdlib/math/constants/float64-two-pi' );
var SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
var ODD_POSITIVE_INTEGERS = require( './odd_positive_integers.json' );
var EVEN_NONNEGATIVE_INTEGERS = require( './even_nonnegative_integers.json' );
var BERNOULLI = require( './bernoulli.json' );


// VARIABLES //

var MAX_BERNOULLI_2N = 129;
var MAX_FACTORIAL = 170; // TODO: consider making external constant
var MAX_LN = 709; // TODO: consider making external constant

// Polynomial coefficients...
var Y1 = 1.2433929443359375;
var P1 = [
	0.24339294433593750202,
	-0.49092470516353571651,
	0.0557616214776046784287,
	-0.00320912498879085894856,
	0.000451534528645796438704,
	-0.933241270357061460782e-5
];
var Q1 = [
	1.0,
	-0.279960334310344432495,
	0.0419676223309986037706,
	-0.00413421406552171059003,
	0.00024978985622317935355,
	-0.101855788418564031874e-4
];
var P2 = [
	0.577215664901532860516,
	0.243210646940107164097,
	0.0417364673988216497593,
	0.00390252087072843288378,
	0.000249606367151877175456,
	0.110108440976732897969e-4
];
var Q2 = [
	1.0,
	0.295201277126631761737,
	0.043460910607305495864,
	0.00434930582085826330659,
	0.000255784226140488490982,
	0.10991819782396112081e-4
];
var Y3 = 0.6986598968505859375;
var P3 = [
	-0.0537258300023595030676,
	0.0445163473292365591906,
	0.0128677673534519952905,
	0.00097541770457391752726,
	0.769875101573654070925e-4,
	0.328032510000383084155e-5,
	0.0
];
var Q3 = [
	1.0,
	0.33383194553034051422,
	0.0487798431291407621462,
	0.00479039708573558490716,
	0.000270776703956336357707,
	0.106951867532057341359e-4,
	0.236276623974978646399e-7
];
var P4 = [
	-2.49710190602259410021,
	-2.60013301809475665334,
	-0.939260435377109939261,
	-0.138448617995741530935,
	-0.00701721240549802377623,
	-0.229257310594893932383e-4,
	0.0,
	0.0,
	0.0
];
var Q4 = [
	1.0,
	0.706039025937745133628,
	0.15739599649558626358,
	0.0106117950976845084417,
	-0.36910273311764618902e-4,
	0.493409563927590008943e-5,
	-0.234055487025287216506e-6,
	0.718833729365459760664e-8,
	-0.1129200113474947419e-9
];
var P5 = [
	-4.78558028495135619286,
	-1.89197364881972536382,
	-0.211407134874412820099,
	-0.000189204758260076688518,
	0.00115140923889178742086,
	0.639949204213164496988e-4,
	0.139348932445324888343e-5,
	0.0,
	0.0
];
var Q5 = [
	1.0,
	0.244345337378188557777,
	0.00873370754492288653669,
	-0.00117592765334434471562,
	-0.743743682899933180415e-4,
	-0.21750464515767984778e-5,
	0.471001264003076486547e-8,
	-0.833378440625385520576e-10,
	0.699841545204845636531e-12
];
var P6 = [
	-10.3948950573308896825,
	-2.85827219671106697179,
	-0.347728266539245787271,
	-0.0251156064655346341766,
	-0.00119459173416968685689,
	-0.382529323507967522614e-4,
	-0.785523633796723466968e-6,
	-0.821465709095465524192e-8
];
var Q6 = [
	1.0,
	0.208196333572671890965,
	0.0195687657317205033485,
	0.00111079638102485921877,
	0.408507746266039256231e-4,
	0.955561123065693483991e-6,
	0.118507153474022900583e-7,
	0.222609483627352615142e-14
];


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var rateval1 = evalrational( P1, Q1 );
var rateval2 = evalrational( P2, Q2 );
var rateval3 = evalrational( P3, Q3 );
var rateval4 = evalrational( P4, Q4 );
var rateval5 = evalrational( P5, Q5 );
var rateval6 = evalrational( P6, Q6 );


// MAIN //

/**
* Evaluates the Riemann zeta function.
*
* #### Method
*
* 1. First, we use the reflection formula
*
*   ``` tex
*   \zeta(1-s) = 2 \sin\biggl(\frac{\pi(1-s)}{2}\biggr)(2\pi^{-s})\Gamma(s)\zeta(s)
*   ```
*
*   to make \\(s\\) positive.
*
* 2. For \\(s \in (0,1)\\), we use the approximation
*
*   ``` tex
*   \zeta(s) = \frac{C + \operatorname{R}(1-s) - s}{1-s}
*   ```
*
*   with rational approximation \\(\operatorname{R}(1-z)\\) and constant \\(C\\).
*
* 3. For \\(s \in (1,4)\\), we use the approximation
*
*   ``` tex
*   \zeta(s) = C + \operatorname{R}(s-n) + \frac{1}{s-1}
*   ```
*
*   with rational approximation \\(\operatorname{R}(z-n)\\), constant \\(C\\), and integer \\(n\\).
*
* 4. For \\(s > 4\\), we use the approximation
*
*   ``` tex
*   \zeta(s) = 1 + e^{\operatorname{R}(z-n)}
*   ```
*
*   with rational approximation \\(\operatorname{R}(z-n)\\) and integer \\(n\\).
*
* 5. For negative odd integers, we use the closed form
*
*   ``` tex
*   \zeta(-n) = \frac{(-1)^n}{n+1} B_{n+1}
*   ```
*
*   where \\(B_{n+1}\\) is a Bernoulli number.
*
* 6. For negative even integers, we use the closed form
*
*   ``` tex
*   \zeta(-2n) = 0
*   ```
*
* 7. For nonnegative even integers, we could use the closed form
*
*   ``` tex
*   \zeta(2n) = \frac{(-1)^{n-1}2^{2n-1}\pi^{2n}}{(2n)!} B_{2n}
*   ```
*
*   where \\(B_{2n}\\) is a Bernoulli number. However, to speed computation, we use precomputed values (Wolfram Alpha).
*
* 8. For positive negative integers, we use precomputed values (Wolfram Alpha), as these values are useful for certain infinite series calculations.
*
*
* #### Notes
*
* * \\([\approx 1.5\mbox{e-}8, 1)\\)
*    - max deviation: \\(2.020\mbox{e-}18\\)
*    - expected error: \\(-2.020\mbox{e-}18\\)
*    - max error found (double): \\(3.994987\mbox{e-}17\\)
* * \\([1,2]\\)
*    - max deviation: \\(9.007\mbox{e-}20\\)
*    - expected error: \\(9.007\mbox{e-}20\\)
* * \\((2,4]\\)
*    - max deviation: \\(5.946\mbox{e-}22\\)
*    - expected error: \\(-5.946\mbox{e-}22\\)
* * \\((4,7]\\)
*    - max deviation: \\(2.955\mbox{e-}17\\)
*    - expected error: \\(2.955\mbox{e-}17\\)
*    - max error found (double): \\(2.009135\mbox{e-}16\\)
* * \\((7,15)\\)
*    - max deviation: \\(7.117\mbox{e-}16\\)
*    - expected error: \\(7.117\mbox{e-}16\\)
*    - max error found (double): \\(9.387771\mbox{e-}16\\)
* * \\([15,36)\\)
*    - max error (in interpolated form): \\(1.668\mbox{e-}17\\)
*    - max error found (long double): \\(1.669714\mbox{e-}17\\)
*
*
* @param {number} s - input value
* @returns {number} function value
*
* @example
* var v = zeta( 1.1 );
* // returns ~10.584
*
* @example
* var v = zeta( -4.0 );
* // returns 0.0
*
* @example
* var v = zeta( 70.0 );
* // returns 1.0
*
* @example
* var v = zeta( 0.5 );
* // returns ~-1.46
*
* @example
* var v = zeta( 1.0 ); // pole
* // returns NaN
*
* @example
* var v = zeta( NaN );
* // returns NaN
*/
function zeta( s ) {
	var tmp;
	var sc;
	var as;
	var is;
	var r;
	var n;

	// Check for `NaN`:
	if ( isnan( s ) ) {
		return NaN;
	}
	// Check for a pole:
	if ( s === 1.0 ) {
		return NaN;
	}
	// Check for large value:
	if ( s >= 56.0 ) {
		return 1.0;
	}
	// Check for a closed form (integers):
	if ( isInteger( s ) ) {
		// Cast `s` to a 32-bit signed integer:
		is = s|0; // asm type annotation

		// Check that `s` does not exceed MAX_INT32:
		if ( is === s ) {
			if ( is < 0 ) {
				as = (-is)|0; // asm type annotation

				// Check if even negative integer:
				if ( (as&1) === 0 ) {
					return 0.0;
				}
				n = ( (as+1) / 2 )|0; // asm type annotation

				// Check if less than max Bernoulli number:
				if ( n <= MAX_BERNOULLI_2N ) {
					return -BERNOULLI[ n ] / (as+1.0);
				}
				// fall through...
			}
			// Check if even nonnegative integer:
			else if ( (is&1) === 0 ) {
				return EVEN_NONNEGATIVE_INTEGERS[ is/2 ];
			}
			// Must be a odd positive integer:
			else {
				return ODD_POSITIVE_INTEGERS[ (is-3)/2 ];
			}
		}
		// fall through...
	}
	if ( abs(s) < SQRT_EPSILON ) {
		return -0.5 - (LN_SQRT_TWO_PI * s);
	}
	sc = 1.0 - s;
	if ( s < 0.0 ) {
		// Check if even negative integer:
		if ( floor(s/2.0) === s/2.0 ) {
			return 0.0;
		}
		// Swap `s` and `sc`:
		tmp = s;
		s = sc;
		sc = tmp;

		// Determine if computation will overflow:
		if ( s > MAX_FACTORIAL ) {
			tmp = sinpi( 0.5*sc ) * 2.0 * zeta( s );
			r = gammaln( s );
			r -= s * ln( TWO_PI );
			if ( r > MAX_LN ) {
				return ( tmp < 0.0 ) ? NINF : PINF;
			}
			return tmp * exp( r );
		}
		return sinpi( 0.5*sc ) * 2.0 * pow( TWO_PI, -s ) *
			gamma( s ) * zeta( s );
	}
	if ( s < 1.0 ) {
		tmp = rateval1( sc );
		tmp -= Y1;
		tmp += sc;
		tmp /= sc;
		return tmp;
	}
	if ( s <= 2.0 ) {
		sc = -sc;
		tmp = 1.0 / sc;
		return tmp + rateval2( sc );
	}
	if ( s <= 4.0 ) {
		tmp = Y3 + ( 1.0 / (-sc) );
		return tmp + rateval3( s-2.0 );
	}
	if ( s <= 7.0 ) {
		tmp = rateval4( s-4.0 );
		return 1.0 + exp( tmp );
	}
	if ( s < 15.0 ) {
		tmp = rateval5( s-7.0 );
		return 1.0 + exp( tmp );
	}
	if ( s < 36.0 ) {
		tmp = rateval6( s-15.0 );
		return 1.0 + exp( tmp );
	}
	// s < 56
	return 1.0 + pow( 2.0, -s );
} // end FUNCTION zeta()


// EXPORTS //

module.exports = zeta;

},{"./bernoulli.json":76,"./even_nonnegative_integers.json":77,"./odd_positive_integers.json":79,"@stdlib/math/base/assert/is-integer":25,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/abs":34,"@stdlib/math/base/special/exp":43,"@stdlib/math/base/special/floor":47,"@stdlib/math/base/special/gamma":49,"@stdlib/math/base/special/gammaln":53,"@stdlib/math/base/special/ln":60,"@stdlib/math/base/special/pow":62,"@stdlib/math/base/special/sinpi":89,"@stdlib/math/base/tools/evalrational":99,"@stdlib/math/constants/float64-ln-sqrt-two-pi":129,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136,"@stdlib/math/constants/float64-sqrt-eps":138,"@stdlib/math/constants/float64-two-pi":140}],82:[function(require,module,exports){
module.exports={"program_message":"{\n  \"x\": [-50,-49.949974987493746426,-49.899949974987492851,-49.849924962481239277,-49.799899949974985702,-49.749874937468732128,-49.699849924962478553,-49.649824912456224979,-49.59979989994997851,-49.549774887443724936,-49.499749874937471361,-49.449724862431217787,-49.399699849924964212,-49.349674837418710638,-49.299649824912457063,-49.249624812406203489,-49.199599799899949915,-49.14957478739369634,-49.099549774887442766,-49.049524762381189191,-48.999499749874935617,-48.949474737368682042,-48.899449724862428468,-48.849424712356174894,-48.799399699849928425,-48.74937468734367485,-48.699349674837421276,-48.649324662331167701,-48.599299649824914127,-48.549274637318660552,-48.499249624812406978,-48.449224612306153404,-48.399199599799899829,-48.349174587293646255,-48.29914957478739268,-48.249124562281139106,-48.199099549774885531,-48.149074537268631957,-48.099049524762378383,-48.049024512256124808,-47.998999499749878339,-47.948974487243624765,-47.89894947473737119,-47.848924462231117616,-47.798899449724864041,-47.748874437218610467,-47.698849424712356893,-47.648824412206103318,-47.598799399699849744,-47.548774387193596169,-47.498749374687342595,-47.44872436218108902,-47.398699349674835446,-47.348674337168581872,-47.298649324662328297,-47.248624312156081828,-47.198599299649828254,-47.148574287143574679,-47.098549274637321105,-47.04852426213106753,-46.998499249624813956,-46.948474237118560382,-46.898449224612306807,-46.848424212106053233,-46.798399199599799658,-46.748374187093546084,-46.698349174587292509,-46.648324162081038935,-46.598299149574785361,-46.548274137068531786,-46.498249124562278212,-46.448224112056024637,-46.398199099549778168,-46.348174087043524594,-46.298149074537271019,-46.248124062031017445,-46.198099049524763871,-46.148074037018510296,-46.098049024512256722,-46.048024012006003147,-45.997998999499749573,-45.947973986993495998,-45.897948974487242424,-45.84792396198098885,-45.797898949474735275,-45.747873936968481701,-45.697848924462235232,-45.647823911955981657,-45.597798899449728083,-45.547773886943474508,-45.497748874437220934,-45.44772386193096736,-45.397698849424713785,-45.347673836918460211,-45.297648824412206636,-45.247623811905953062,-45.197598799399699487,-45.147573786893445913,-45.097548774387192339,-45.047523761880938764,-44.99749874937468519,-44.947473736868431615,-44.897448724362178041,-44.847423711855924466,-44.797398699349677997,-44.747373686843424423,-44.697348674337170849,-44.647323661830917274,-44.5972986493246637,-44.547273636818410125,-44.497248624312156551,-44.447223611805902976,-44.397198599299649402,-44.347173586793395827,-44.297148574287142253,-44.247123561780888679,-44.197098549274635104,-44.14707353676838153,-44.097048524262135061,-44.047023511755881486,-43.996998499249627912,-43.946973486743374337,-43.896948474237120763,-43.846923461730867189,-43.796898449224613614,-43.74687343671836004,-43.696848424212106465,-43.646823411705852891,-43.596798399199599316,-43.546773386693345742,-43.496748374187092168,-43.446723361680838593,-43.396698349174585019,-43.346673336668331444,-43.29664832416207787,-43.246623311655831401,-43.196598299149577826,-43.146573286643324252,-43.096548274137070678,-43.046523261630817103,-42.996498249124563529,-42.946473236618309954,-42.89644822411205638,-42.846423211605802805,-42.796398199099549231,-42.746373186593295657,-42.696348174087042082,-42.646323161580788508,-42.596298149074534933,-42.546273136568288464,-42.49624812406203489,-42.446223111555781315,-42.396198099049527741,-42.346173086543274167,-42.296148074037020592,-42.246123061530767018,-42.196098049024513443,-42.146073036518259869,-42.096048024012006294,-42.04602301150575272,-41.995997998999499146,-41.945972986493245571,-41.895947973986991997,-41.845922961480738422,-41.795897948974484848,-41.745872936468231273,-41.695847923961977699,-41.645822911455724125,-41.595797898949477656,-41.545772886443224081,-41.495747873936970507,-41.445722861430716932,-41.395697848924463358,-41.345672836418209783,-41.295647823911956209,-41.245622811405702635,-41.19559779889944906,-41.145572786393195486,-41.095547773886941911,-41.045522761380688337,-40.995497748874441868,-40.945472736368188293,-40.895447723861934719,-40.845422711355681145,-40.79539769884942757,-40.745372686343173996,-40.695347673836920421,-40.645322661330666847,-40.595297648824413272,-40.545272636318159698,-40.495247623811906124,-40.445222611305652549,-40.395197598799398975,-40.3451725862931454,-40.295147573786891826,-40.245122561280638251,-40.195097548774384677,-40.145072536268131103,-40.095047523761877528,-40.045022511255631059,-39.994997498749377485,-39.94497248624312391,-39.894947473736870336,-39.844922461230616761,-39.794897448724363187,-39.744872436218109613,-39.694847423711856038,-39.644822411205602464,-39.594797398699348889,-39.544772386193095315,-39.49474737368684174,-39.444722361180595271,-39.394697348674341697,-39.344672336168088123,-39.294647323661834548,-39.244622311155580974,-39.194597298649327399,-39.144572286143073825,-39.09454727363682025,-39.044522261130566676,-38.994497248624313102,-38.944472236118059527,-38.894447223611805953,-38.844422211105552378,-38.794397198599298804,-38.744372186093045229,-38.694347173586791655,-38.644322161080538081,-38.594297148574284506,-38.544272136068030932,-38.494247123561777357,-38.444222111055530888,-38.394197098549277314,-38.344172086043023739,-38.294147073536770165,-38.244122061030516591,-38.194097048524263016,-38.144072036018009442,-38.094047023511755867,-38.044022011005502293,-37.993996998499248718,-37.943971985992995144,-37.89394697348674157,-37.843921960980495101,-37.793896948474241526,-37.743871935967987952,-37.693846923461734377,-37.643821910955480803,-37.593796898449227228,-37.543771885942973654,-37.49374687343672008,-37.443721860930466505,-37.393696848424212931,-37.343671835917959356,-37.293646823411705782,-37.243621810905452207,-37.193596798399198633,-37.143571785892945059,-37.093546773386691484,-37.04352176088043791,-36.993496748374184335,-36.943471735867930761,-36.893446723361684292,-36.843421710855430717,-36.793396698349177143,-36.743371685842923569,-36.693346673336669994,-36.64332166083041642,-36.593296648324162845,-36.543271635817909271,-36.493246623311655696,-36.443221610805402122,-36.393196598299148548,-36.343171585792894973,-36.293146573286648504,-36.24312156078039493,-36.193096548274141355,-36.143071535767887781,-36.093046523261634206,-36.043021510755380632,-35.992996498249127058,-35.942971485742873483,-35.892946473236619909,-35.842921460730366334,-35.79289644822411276,-35.742871435717859185,-35.692846423211605611,-35.642821410705352037,-35.592796398199098462,-35.542771385692844888,-35.492746373186591313,-35.442721360680337739,-35.392696348174084164,-35.34267133566783059,-35.292646323161584121,-35.242621310655330547,-35.192596298149076972,-35.142571285642823398,-35.092546273136569823,-35.042521260630316249,-34.992496248124062674,-34.9424712356178091,-34.892446223111555526,-34.842421210605301951,-34.792396198099048377,-34.742371185592794802,-34.692346173086548333,-34.642321160580294759,-34.592296148074041184,-34.54227113556778761,-34.492246123061534036,-34.442221110555280461,-34.392196098049026887,-34.342171085542773312,-34.292146073036519738,-34.242121060530266163,-34.192096048024012589,-34.142071035517759015,-34.09204602301150544,-34.042021010505251866,-33.991995997998998291,-33.941970985492744717,-33.891945972986491142,-33.841920960480237568,-33.791895947973983994,-33.741870935467730419,-33.691845922961476845,-33.641820910455230376,-33.591795897948976801,-33.541770885442723227,-33.491745872936469652,-33.441720860430216078,-33.391695847923962504,-33.341670835417708929,-33.291645822911455355,-33.241620810405208886,-33.191595797898955311,-33.141570785392701737,-33.091545772886448162,-33.041520760380194588,-32.991495747873941013,-32.941470735367687439,-32.891445722861433865,-32.84142071035518029,-32.791395697848926716,-32.741370685342673141,-32.691345672836419567,-32.641320660330165992,-32.591295647823912418,-32.541270635317658844,-32.491245622811405269,-32.441220610305151695,-32.39119559779889812,-32.341170585292644546,-32.291145572786390971,-32.241120560280137397,-32.191095547773883823,-32.141070535267630248,-32.091045522761376674,-32.041020510255130205,-31.99099549774887663,-31.940970485242623056,-31.890945472736369481,-31.840920460230115907,-31.790895447723862333,-31.740870435217608758,-31.690845422711355184,-31.640820410205105162,-31.590795397698851588,-31.540770385192598013,-31.490745372686344439,-31.440720360180090864,-31.39069534767383729,-31.340670335167583715,-31.290645322661330141,-31.240620310155080119,-31.190595297648826545,-31.14057028514257297,-31.090545272636319396,-31.040520260130065822,-30.990495247623812247,-30.940470235117558673,-30.890445222611305098,-30.840420210105055077,-30.790395197598801502,-30.740370185092547928,-30.690345172586294353,-30.640320160080040779,-30.590295147573787204,-30.54027013506753363,-30.490245122561283608,-30.440220110055030034,-30.390195097548776459,-30.340170085042522885,-30.290145072536269311,-30.240120060030015736,-30.190095047523762162,-30.140070035017508587,-30.090045022511258566,-30.040020010005004991,-29.989994997498751417,-29.939969984992497842,-29.889944972486244268,-29.839919959979990693,-29.789894947473737119,-29.739869934967483545,-29.689844922461233523,-29.639819909954979948,-29.589794897448726374,-29.5397698849424728,-29.489744872436219225,-29.439719859929965651,-29.389694847423712076,-29.339669834917458502,-29.28964482241120848,-29.239619809904954906,-29.189594797398701331,-29.139569784892447757,-29.089544772386194182,-29.039519759879940608,-28.989494747373687034,-28.939469734867433459,-28.889444722361183437,-28.839419709854929863,-28.789394697348676289,-28.739369684842422714,-28.68934467233616914,-28.639319659829915565,-28.589294647323661991,-28.539269634817408416,-28.489244622311158395,-28.43921960980490482,-28.389194597298651246,-28.339169584792397671,-28.289144572286144097,-28.239119559779890523,-28.189094547273636948,-28.139069534767383374,-28.089044522261133352,-28.039019509754879778,-27.988994497248626203,-27.938969484742372629,-27.888944472236119054,-27.83891945972986548,-27.788894447223611905,-27.738869434717358331,-27.688844422211108309,-27.638819409704854735,-27.58879439719860116,-27.538769384692347586,-27.488744372186094012,-27.438719359679840437,-27.388694347173586863,-27.338669334667336841,-27.288644322161083267,-27.238619309654829692,-27.188594297148576118,-27.138569284642322543,-27.088544272136068969,-27.038519259629815394,-26.98849424712356182,-26.938469234617311798,-26.888444222111058224,-26.838419209604804649,-26.788394197098551075,-26.738369184592297501,-26.688344172086043926,-26.638319159579790352,-26.588294147073536777,-26.538269134567286756,-26.488244122061033181,-26.438219109554779607,-26.388194097048526032,-26.338169084542272458,-26.288144072036018883,-26.238119059529765309,-26.188094047023511735,-26.138069034517261713,-26.088044022011008138,-26.038019009504754564,-25.98799399699850099,-25.937968984492247415,-25.887943971985993841,-25.837918959479740266,-25.787893946973486692,-25.73786893446723667,-25.687843921960983096,-25.637818909454729521,-25.587793896948475947,-25.537768884442222372,-25.487743871935968798,-25.437718859429715224,-25.387693846923461649,-25.337668834417211627,-25.287643821910958053,-25.237618809404704479,-25.187593796898450904,-25.13756878439219733,-25.087543771885943755,-25.037518759379690181,-24.987493746873436606,-24.937468734367186585,-24.88744372186093301,-24.837418709354679436,-24.787393696848425861,-24.737368684342172287,-24.687343671835918713,-24.637318659329665138,-24.587293646823411564,-24.537268634317161542,-24.487243621810907968,-24.437218609304654393,-24.387193596798400819,-24.337168584292147244,-24.28714357178589367,-24.237118559279640095,-24.187093546773390074,-24.137068534267136499,-24.087043521760882925,-24.03701850925462935,-23.986993496748375776,-23.936968484242122202,-23.886943471735868627,-23.836918459229615053,-23.786893446723365031,-23.736868434217111457,-23.686843421710857882,-23.636818409204604308,-23.586793396698350733,-23.536768384192097159,-23.486743371685843584,-23.43671835917959001,-23.386693346673339988,-23.336668334167086414,-23.286643321660832839,-23.236618309154579265,-23.186593296648325691,-23.136568284142072116,-23.086543271635818542,-23.036518259129564967,-22.986493246623314946,-22.936468234117061371,-22.886443221610807797,-22.836418209104554222,-22.786393196598300648,-22.736368184092047073,-22.686343171585793499,-22.636318159079539925,-22.586293146573289903,-22.536268134067036328,-22.486243121560782754,-22.43621810905452918,-22.386193096548275605,-22.336168084042022031,-22.286143071535768456,-22.236118059029514882,-22.18609304652326486,-22.136068034017011286,-22.086043021510757711,-22.036018009004504137,-21.985992996498250562,-21.935967983991996988,-21.885942971485743413,-21.835917958979489839,-21.785892946473239817,-21.735867933966986243,-21.685842921460732668,-21.635817908954479094,-21.58579289644822552,-21.535767883941971945,-21.485742871435718371,-21.435717858929464796,-21.385692846423214775,-21.3356678339169612,-21.285642821410707626,-21.235617808904454051,-21.185592796398200477,-21.135567783891946902,-21.085542771385693328,-21.035517758879443306,-20.985492746373189732,-20.935467733866936157,-20.885442721360682583,-20.835417708854429009,-20.785392696348175434,-20.73536768384192186,-20.685342671335668285,-20.635317658829418264,-20.585292646323164689,-20.535267633816911115,-20.48524262131065754,-20.435217608804403966,-20.385192596298150391,-20.335167583791896817,-20.285142571285643243,-20.235117558779393221,-20.185092546273139646,-20.135067533766886072,-20.085042521260632498,-20.035017508754378923,-19.984992496248125349,-19.934967483741871774,-19.8849424712356182,-19.834917458729368178,-19.784892446223114604,-19.734867433716861029,-19.684842421210607455,-19.63481740870435388,-19.584792396198100306,-19.534767383691846732,-19.484742371185593157,-19.434717358679343135,-19.384692346173089561,-19.334667333666835987,-19.284642321160582412,-19.234617308654328838,-19.184592296148075263,-19.134567283641821689,-19.084542271135568114,-19.034517258629318093,-18.984492246123064518,-18.934467233616810944,-18.884442221110557369,-18.834417208604303795,-18.784392196098050221,-18.734367183591796646,-18.684342171085543072,-18.63431715857929305,-18.584292146073039476,-18.534267133566785901,-18.484242121060532327,-18.434217108554278752,-18.384192096048025178,-18.334167083541771603,-18.284142071035518029,-18.234117058529268007,-18.184092046023014433,-18.134067033516760858,-18.084042021010507284,-18.03401700850425371,-17.983991995998003688,-17.933966983491750113,-17.883941970985496539,-17.833916958479242965,-17.78389194597298939,-17.733866933466735816,-17.683841920960482241,-17.633816908454228667,-17.583791895947975092,-17.533766883441721518,-17.483741870935467944,-17.433716858429214369,-17.383691845922960795,-17.33366683341670722,-17.283641820910460751,-17.233616808404207177,-17.183591795897953602,-17.133566783391700028,-17.083541770885446454,-17.033516758379192879,-16.983491745872939305,-16.93346673336668573,-16.883441720860432156,-16.833416708354178581,-16.783391695847925007,-16.733366683341671433,-16.683341670835417858,-16.633316658329164284,-16.583291645822910709,-16.533266633316657135,-16.483241620810410666,-16.433216608304157091,-16.383191595797903517,-16.333166583291649943,-16.283141570785396368,-16.233116558279142794,-16.183091545772889219,-16.133066533266635645,-16.08304152076038207,-16.033016508254128496,-15.982991495747874922,-15.932966483241621347,-15.882941470735367773,-15.832916458229114198,-15.782891445722860624,-15.732866433216607049,-15.68284142071036058,-15.632816408204107006,-15.582791395697853432,-15.532766383191599857,-15.482741370685346283,-15.432716358179092708,-15.382691345672839134,-15.332666333166585559,-15.282641320660331985,-15.232616308154078411,-15.182591295647824836,-15.132566283141571262,-15.082541270635317687,-15.032516258129064113,-14.982491245622810538,-14.932466233116556964,-14.882441220610310495,-14.832416208104056921,-14.782391195597803346,-14.732366183091549772,-14.682341170585296197,-14.632316158079042623,-14.582291145572789048,-14.532266133066535474,-14.4822411205602819,-14.432216108054028325,-14.382191095547774751,-14.332166083041521176,-14.282141070535267602,-14.232116058029014027,-14.182091045522760453,-14.132066033016513984,-14.08204102051026041,-14.032016008004006835,-13.981990995497753261,-13.931965982991499686,-13.881940970485246112,-13.831915957978992537,-13.781890945472738963,-13.731865932966485389,-13.681840920460231814,-13.63181590795397824,-13.581790895447724665,-13.531765882941471091,-13.481740870435217516,-13.431715857928963942,-13.381690845422710368,-13.331665832916463899,-13.281640820410210324,-13.23161580790395675,-13.181590795397703175,-13.131565782891449601,-13.081540770385196026,-13.031515757878942452,-12.981490745372688878,-12.931465732866435303,-12.881440720360181729,-12.831415707853928154,-12.78139069534767458,-12.731365682841421005,-12.681340670335167431,-12.631315657828913857,-12.581290645322660282,-12.531265632816413813,-12.481240620310160239,-12.431215607803906664,-12.38119059529765309,-12.331165582791399515,-12.281140570285145941,-12.231115557778892367,-12.181090545272638792,-12.131065532766385218,-12.081040520260131643,-12.031015507753878069,-11.980990495247624494,-11.93096548274137092,-11.880940470235117346,-11.830915457728863771,-11.780890445222610197,-11.730865432716363728,-11.680840420210110153,-11.630815407703856579,-11.580790395197603004,-11.53076538269134943,-11.480740370185095856,-11.430715357678842281,-11.380690345172588707,-11.330665332666335132,-11.280640320160081558,-11.230615307653827983,-11.180590295147574409,-11.130565282641320835,-11.08054027013506726,-11.030515257628813686,-10.980490245122567217,-10.930465232616313642,-10.880440220110060068,-10.830415207603806493,-10.780390195097552919,-10.730365182591299344,-10.68034017008504577,-10.630315157578792196,-10.580290145072538621,-10.530265132566285047,-10.480240120060031472,-10.430215107553777898,-10.380190095047524323,-10.330165082541270749,-10.280140070035017175,-10.2301150575287636,-10.180090045022517131,-10.130065032516263557,-10.080040020010009982,-10.030015007503756408,-9.9799899949975028335,-9.9299649824912492591,-9.8799399699849956846,-9.8299149574787421102,-9.7798899449724885358,-9.7298649324662349613,-9.6798399199599813869,-9.6298149074537278125,-9.5797898949474742381,-9.5297648824412206636,-9.4797398699349670892,-9.4297148574287135148,-9.3796898449224670458,-9.3296648324162134713,-9.2796398199099598969,-9.2296148074037063225,-9.179589794897452748,-9.1295647823911991736,-9.0795397698849455992,-9.0295147573786920248,-8.9794897448724384503,-8.9294647323661848759,-8.8794397198599313015,-8.829414707353677727,-8.7793896948474241526,-8.7293646823411705782,-8.6793396698349170038,-8.6293146573286634293,-8.5792896448224169603,-8.5292646323161633859,-8.4792396198099098115,-8.429214607303656237,-8.3791895947974026626,-8.3291645822911490882,-8.2791395697848955137,-8.2291145572786419393,-8.1790895447723883649,-8.1290645322661347905,-8.079039519759881216,-8.0290145072536276416,-7.9789894947473740672,-7.9289644822411204927,-7.8789394697348669183,-7.8289144572286204493,-7.7788894447223668749,-7.7288644322161133005,-7.678839419709859726,-7.6288144072036061516,-7.5787893946973525772,-7.5287643821910990027,-7.4787393696848454283,-7.4287143571785918539,-7.3786893446723382795,-7.328664332166084705,-7.2786393196598311306,-7.2286143071535775562,-7.1785892946473239817,-7.1285642821410704073,-7.0785392696348168329,-7.0285142571285703639,-6.9784892446223167894,-6.928464232116063215,-6.8784392196098096406,-6.8284142071035560662,-6.7783891945973024917,-6.7283641820910489173,-6.6783391695847953429,-6.6283141570785417684,-6.578289144572288194,-6.5282641320660346196,-6.4782391195597810452,-6.4282141070535274707,-6.3781890945472738963,-6.3281640820410203219,-6.2781390695347667474,-6.2281140570285202784,-6.178089044522266704,-6.1280640320160131296,-6.0780390195097595551,-6.0280140070035059807,-5.9779889944972524063,-5.9279639819909988319,-5.8779389694847452574,-5.827913956978491683,-5.7778889444722381086,-5.7278639319659845341,-5.6778389194597309597,-5.6278139069534773853,-5.5777888944472238109,-5.5277638819409702364,-5.477738869434716662,-5.427713856928470193,-5.3776888444222166186,-5.3276638319159630441,-5.2776388194097094697,-5.2276138069034558953,-5.1775887943972023209,-5.1275637818909487464,-5.077538769384695172,-5.0275137568784415976,-4.9774887443721880231,-4.9274637318659344487,-4.8774387193596808743,-4.8274137068534272998,-4.7773886943471737254,-4.727363681840920151,-4.677338669334673682,-4.6273136568284201076,-4.5772886443221665331,-4.5272636318159129587,-4.4772386193096593843,-4.4272136068034058098,-4.3771885942971522354,-4.327163581790898661,-4.2771385692846450866,-4.2271135567783915121,-4.1770885442721379377,-4.1270635317658843633,-4.0770385192596307888,-4.0270135067533772144,-3.97698849424712364,-3.9269634817408700656,-3.8769384692346235965,-3.8269134567283700221,-3.7768884442221164477,-3.7268634317158628733,-3.6768384192096092988,-3.6268134067033557244,-3.57678839419710215,-3.5267633816908485755,-3.4767383691845950011,-3.4267133566783414267,-3.3766883441720878523,-3.3266633316658342778,-3.2766383191595807034,-3.226613306653327129,-3.1765882941470735545,-3.1265632816408199801,-3.0765382691345735111,-3.0265132566283199367,-2.9764882441220663623,-2.9264632316158127878,-2.8764382191095592134,-2.826413206603305639,-2.7763881940970520645,-2.7263631815907984901,-2.6763381690845449157,-2.6263131565782913412,-2.5762881440720377668,-2.5262631315657841924,-2.476238119059530618,-2.4262131065532770435,-2.3761880940470234691,-2.3261630815407698947,-2.2761380690345234257,-2.2261130565282698512,-2.1760880440220162768,-2.1260630315157627024,-2.076038019009509128,-2.0260130065032555535,-1.9759879939970019791,-1.9259629814907484047,-1.8759379689844948302,-1.8259129564782412558,-1.7758879439719876814,-1.725862931465734107,-1.6758379189594805325,-1.6258129064532269581,-1.5757878939469733837,-1.5257628814407269147,-1.4757378689344733402,-1.4257128564282197658,-1.3756878439219661914,-1.3256628314157126169,-1.2756378189094590425,-1.2256128064032054681,-1.1755877938969518937,-1.1255627813906983192,-1.0755377688844447448,-1.0255127563781911704,-0.97548774387193759594,-0.92546273136568402151,-0.87543771885943044708,-0.82541270635317687265,-0.77538769384692329822,-0.72536268134067682922,-0.67533766883442325479,-0.62531265632816968036,-0.57528764382191610594,-0.52526263131566253151,-0.47523761880940895708,-0.42521260630315538265,-0.37518759379690180822,-0.32516258129064823379,-0.27513756878439465936,-0.22511255627814108493,-0.1750875437718875105,-0.12506253126563393607,-0.075037518759380361644,-0.025012506253126787215,0.025012506253126787215,0.075037518759373256216,0.12506253126562683065,0.17508754377188040507,0.2251125562781339795,0.27513756878438755393,0.32516258129064112836,0.37518759379689470279,0.42521260630314827722,0.47523761880940185165,0.52526263131565542608,0.57528764382190900051,0.62531265632816257494,0.67533766883441614937,0.7253626813406697238,0.77538769384692329822,0.82541270635317687265,0.87543771885942334166,0.92546273136567691608,0.97548774387193049051,1.0255127563781840649,1.0755377688844376394,1.1255627813906912138,1.1755877938969447882,1.2256128064031983627,1.2756378189094519371,1.3256628314157055115,1.3756878439219590859,1.4257128564282126604,1.4757378689344662348,1.5257628814407198092,1.5757878939469733837,1.6258129064532198527,1.6758379189594734271,1.7258629314657270015,1.775887943971980576,1.8259129564782341504,1.8759379689844877248,1.9259629814907412992,1.9759879939969948737,2.0260130065032484481,2.0760380190095020225,2.126063031515755597,2.1760880440220091714,2.2261130565282627458,2.2761380690345163202,2.3261630815407698947,2.3761880940470234691,2.4262131065532699381,2.4762381190595235125,2.526263131565777087,2.5762881440720306614,2.6263131565782842358,2.6763381690845378102,2.7263631815907913847,2.7763881940970449591,2.8264132066032985335,2.876438219109552108,2.9264632316158056824,2.9764882441220592568,3.0265132566283128313,3.0765382691345664057,3.1265632816408199801,3.1765882941470735545,3.2266133066533200235,3.276638319159573598,3.3266633316658271724,3.3766883441720807468,3.4267133566783343213,3.4767383691845878957,3.5267633816908414701,3.5767883941970950445,3.626813406703348619,3.6768384192096021934,3.7268634317158557678,3.7768884442221093423,3.8269134567283629167,3.8769384692346164911,3.9269634817408700656,3.97698849424712364,4.027013506753370109,4.0770385192596236834,4.1270635317658772578,4.1770885442721308323,4.2271135567783844067,4.2771385692846379811,4.3271635817908915556,4.37718859429714513,4.4272136068033987044,4.4772386193096522788,4.5272636318159058533,4.5772886443221594277,4.6273136568284130021,4.6773386693346665766,4.727363681840920151,4.77738869434716662,4.8274137068534201944,4.8774387193596737688,4.9274637318659273433,4.9774887443721809177,5.0275137568784344921,5.0775387693846880666,5.127563781890941641,5.1775887943971952154,5.2276138069034487899,5.2776388194097023643,5.3276638319159559387,5.3776888444222095131,5.4277138569284630876,5.477738869434716662,5.5277638819409702364,5.5777888944472167054,5.6278139069534702799,5.6778389194597238543,5.7278639319659774287,5.7778889444722310031,5.8279139569784845776,5.877938969484738152,5.9279639819909917264,5.9779889944972453009,6.0280140070034988753,6.0780390195097524497,6.1280640320160060242,6.1780890445222595986,6.228114057028513173,6.2781390695347667474,6.3281640820410203219,6.3781890945472667909,6.4282141070535203653,6.4782391195597739397,6.5282641320660275142,6.5782891445722810886,6.628314157078534663,6.6783391695847882374,6.7283641820910418119,6.7783891945972953863,6.8284142071035489607,6.8784392196098025352,6.9284642321160561096,6.978489244622309684,7.0285142571285632584,7.0785392696348168329,7.1285642821410704073,7.1785892946473168763,7.2286143071535704507,7.2786393196598240252,7.3286643321660775996,7.378689344672331174,7.4287143571785847485,7.4787393696848383229,7.5287643821910918973,7.5787893946973454717,7.6288144072035990462,7.6788394197098526206,7.728864432216106195,7.7788894447223597695,7.8289144572286133439,7.8789394697348669183,7.9289644822411133873,7.9789894947473669617,8.0290145072536205362,8.0790395197598741106,8.129064532266127685,8.1790895447723812595,8.2291145572786348339,8.2791395697848884083,8.3291645822911419828,8.3791895947973955572,8.4292146073036491316,8.479239619809902706,8.5292646323161562805,8.5792896448224098549,8.6293146573286634293,8.6793396698349170038,8.7293646823411634728,8.7793896948474170472,8.8294147073536706216,8.879439719859924196,8.9294647323661777705,8.9794897448724313449,9.0295147573786849193,9.0795397698849384938,9.1295647823911920682,9.1795897948974456426,9.229614807403699217,9.2796398199099527915,9.3296648324162063659,9.3796898449224599403,9.4297148574287135148,9.4797398699349670892,9.5297648824412135582,9.5797898949474671326,9.6298149074537207071,9.6798399199599742815,9.7298649324662278559,9.7798899449724814303,9.8299149574787350048,9.8799399699849885792,9.9299649824912421536,9.9799899949974957281,10.030015007503749302,10.080040020010002877,10.130065032516256451,10.180090045022510026,10.2301150575287636,10.280140070035017175,10.330165082541263644,10.380190095047517218,10.430215107553770792,10.480240120060024367,10.530265132566277941,10.580290145072531516,10.63031515757878509,10.680340170085038665,10.730365182591292239,10.780390195097545813,10.830415207603799388,10.880440220110052962,10.930465232616306537,10.980490245122560111,11.030515257628813686,11.080540270135060155,11.130565282641313729,11.180590295147567304,11.230615307653820878,11.280640320160074452,11.330665332666328027,11.380690345172581601,11.430715357678835176,11.48074037018508875,11.530765382691342325,11.580790395197595899,11.630815407703849473,11.680840420210103048,11.730865432716356622,11.780890445222610197,11.830915457728863771,11.88094047023511024,11.930965482741363815,11.980990495247617389,12.031015507753870963,12.081040520260124538,12.131065532766378112,12.181090545272631687,12.231115557778885261,12.281140570285138836,12.33116558279139241,12.381190595297645984,12.431215607803899559,12.481240620310153133,12.531265632816406708,12.581290645322660282,12.631315657828913857,12.681340670335160326,12.7313656828414139,12.781390695347667474,12.831415707853921049,12.881440720360174623,12.931465732866428198,12.981490745372681772,13.031515757878935347,13.081540770385188921,13.131565782891442495,13.18159079539769607,13.231615807903949644,13.281640820410203219,13.331665832916456793,13.381690845422710368,13.431715857928963942,13.481740870435210411,13.531765882941463985,13.58179089544771756,13.631815907953971134,13.681840920460224709,13.731865932966478283,13.781890945472731858,13.831915957978985432,13.881940970485239006,13.931965982991492581,13.981990995497746155,14.032016008003992624,14.082041020510246199,14.132066033016499773,14.182091045522753348,14.232116058029006922,14.282141070535260496,14.332166083041514071,14.382191095547767645,14.43221610805402122,14.482241120560274794,14.532266133066528369,14.582291145572781943,14.632316158079035517,14.682341170585289092,14.732366183091542666,14.782391195597796241,14.832416208104049815,14.88244122061030339,14.932466233116556964,14.982491245622810538,15.032516258129064113,15.082541270635317687,15.132566283141571262,15.182591295647824836,15.232616308154078411,15.282641320660331985,15.332666333166585559,15.382691345672839134,15.432716358179078497,15.482741370685332072,15.532766383191585646,15.582791395697839221,15.632816408204092795,15.68284142071034637,15.732866433216599944,15.782891445722853518,15.832916458229107093,15.882941470735360667,15.932966483241614242,15.982991495747867816,16.033016508254121391,16.083041520760374965,16.133066533266628539,16.183091545772882114,16.233116558279135688,16.283141570785389263,16.333166583291642837,16.383191595797896412,16.433216608304149986,16.48324162081040356,16.533266633316657135,16.583291645822910709,16.633316658329164284,16.683341670835417858,16.733366683341671433,16.783391695847925007,16.833416708354178581,16.883441720860432156,16.93346673336668573,16.983491745872939305,17.033516758379178668,17.083541770885432243,17.133566783391685817,17.183591795897939392,17.233616808404192966,17.28364182091044654,17.333666833416700115,17.383691845922953689,17.433716858429207264,17.483741870935460838,17.533766883441714413,17.583791895947967987,17.633816908454221561,17.683841920960475136,17.73386693346672871,17.783891945972982285,17.833916958479235859,17.883941970985489434,17.933966983491743008,17.983991995997996582,18.034017008504250157,18.084042021010503731,18.134067033516757306,18.18409204602301088,18.234117058529264455,18.284142071035518029,18.334167083541771603,18.384192096048025178,18.434217108554278752,18.484242121060532327,18.534267133566785901,18.584292146073025265,18.634317158579278839,18.684342171085532414,18.734367183591785988,18.784392196098039562,18.834417208604293137,18.884442221110546711,18.934467233616800286,18.98449224612305386,19.034517258629307435,19.084542271135561009,19.134567283641814583,19.184592296148068158,19.234617308654321732,19.284642321160575307,19.334667333666828881,19.384692346173082456,19.43471735867933603,19.484742371185589604,19.534767383691843179,19.584792396198096753,19.634817408704350328,19.684842421210603902,19.734867433716857477,19.784892446223111051,19.834917458729364625,19.8849424712356182,19.934967483741871774,19.984992496248125349,20.035017508754378923,20.085042521260632498,20.135067533766886072,20.185092546273125436,20.23511755877937901,20.285142571285632584,20.335167583791886159,20.385192596298139733,20.435217608804393308,20.485242621310646882,20.535267633816900457,20.585292646323154031,20.635317658829407605,20.68534267133566118,20.735367683841914754,20.785392696348168329,20.835417708854421903,20.885442721360675478,20.935467733866929052,20.985492746373182626,21.035517758879436201,21.085542771385689775,21.13556778389194335,21.185592796398196924,21.235617808904450499,21.285642821410704073,21.335667833916957647,21.385692846423211222,21.435717858929464796,21.485742871435718371,21.535767883941971945,21.58579289644822552,21.635817908954479094,21.685842921460732668,21.735867933966972032,21.785892946473225606,21.835917958979479181,21.885942971485732755,21.93596798399198633,21.985992996498239904,22.036018009004493479,22.086043021510747053,22.136068034017000628,22.186093046523254202,22.236118059029507776,22.286143071535761351,22.336168084042014925,22.3861930965482685,22.436218109054522074,22.486243121560775649,22.536268134067029223,22.586293146573282797,22.636318159079536372,22.686343171585789946,22.736368184092043521,22.786393196598297095,22.83641820910455067,22.886443221610804244,22.936468234117057818,22.986493246623311393,23.036518259129564967,23.086543271635818542,23.136568284142072116,23.186593296648325691,23.236618309154579265,23.286643321660832839,23.336668334167072203,23.386693346673325777,23.436718359179579352,23.486743371685832926,23.536768384192086501,23.586793396698340075,23.63681840920459365,23.686843421710847224,23.736868434217100798,23.786893446723354373,23.836918459229607947,23.886943471735861522,23.936968484242115096,23.986993496748368671,24.037018509254622245,24.087043521760875819,24.137068534267129394,24.187093546773382968,24.237118559279636543,24.287143571785890117,24.337168584292143692,24.387193596798397266,24.43721860930465084,24.487243621810904415,24.537268634317157989,24.587293646823411564,24.637318659329665138,24.687343671835918713,24.737368684342172287,24.787393696848425861,24.837418709354679436,24.887443721860918799,24.937468734367172374,24.987493746873425948,25.037518759379679523,25.087543771885933097,25.137568784392186672,25.187593796898440246,25.23761880940469382,25.287643821910947395,25.337668834417200969,25.387693846923454544,25.437718859429708118,25.487743871935961693,25.537768884442215267,25.587793896948468841,25.637818909454722416,25.68784392196097599,25.737868934467229565,25.787893946973483139,25.837918959479736714,25.887943971985990288,25.937968984492243862,25.987993996998497437,26.038019009504751011,26.088044022011004586,26.13806903451725816,26.188094047023511735,26.238119059529765309,26.288144072036018883,26.338169084542272458,26.388194097048526032,26.438219109554779607,26.48824412206101897,26.538269134567272545,26.588294147073526119,26.638319159579779694,26.688344172086033268,26.738369184592286842,26.788394197098540417,26.838419209604793991,26.888444222111047566,26.93846923461730114,26.988494247123554715,27.038519259629808289,27.088544272136061863,27.138569284642315438,27.188594297148569012,27.238619309654822587,27.288644322161076161,27.338669334667329736,27.38869434717358331,27.438719359679836884,27.488744372186090459,27.538769384692344033,27.588794397198597608,27.638819409704851182,27.688844422211104757,27.738869434717358331,27.788894447223611905,27.83891945972986548,27.888944472236119054,27.938969484742372629,27.988994497248626203,28.039019509754865567,28.089044522261119141,28.139069534767372716,28.18909454727362629,28.239119559779879864,28.289144572286133439,28.339169584792387013,28.389194597298640588,28.439219609804894162,28.489244622311147737,28.539269634817401311,28.589294647323654885,28.63931965982990846,28.689344672336162034,28.739369684842415609,28.789394697348669183,28.839419709854922758,28.889444722361176332,28.939469734867429906,28.989494747373683481,29.039519759879937055,29.08954477238619063,29.139569784892444204,29.189594797398697779,29.239619809904951353,29.289644822411204927,29.339669834917458502,29.389694847423712076,29.439719859929965651,29.489744872436219225,29.5397698849424728,29.589794897448726374,29.639819909954965738,29.689844922461219312,29.739869934967472886,29.789894947473726461,29.839919959979980035,29.88994497248623361,29.939969984992487184,29.989994997498740759,30.040020010004994333,30.090045022511247907,30.140070035017501482,30.190095047523755056,30.240120060030008631,30.290145072536262205,30.34017008504251578,30.390195097548769354,30.440220110055022928,30.490245122561276503,30.540270135067530077,30.590295147573783652,30.640320160080037226,30.690345172586290801,30.740370185092544375,30.790395197598797949,30.840420210105051524,30.890445222611305098,30.940470235117558673,30.990495247623812247,31.040520260130065822,31.090545272636319396,31.14057028514257297,31.190595297648812334,31.240620310155065908,31.290645322661319483,31.340670335167573057,31.390695347673826632,31.440720360180080206,31.490745372686333781,31.540770385192587355,31.590795397698840929,31.640820410205094504,31.690845422711348078,31.740870435217601653,31.790895447723855227,31.840920460230108802,31.890945472736362376,31.94097048524261595,31.990995497748869525,32.041020510255123099,32.091045522761376674,32.141070535267630248,32.191095547773883823,32.241120560280137397,32.291145572786390971,32.341170585292644546,32.39119559779889812,32.441220610305151695,32.491245622811405269,32.541270635317658844,32.591295647823912418,32.641320660330165992,32.691345672836419567,32.741370685342673141,32.791395697848912505,32.841420710355166079,32.891445722861419654,32.941470735367673228,32.991495747873926803,33.041520760380180377,33.091545772886433951,33.141570785392687526,33.1915957978989411,33.241620810405194675,33.291645822911448249,33.341670835417701824,33.391695847923955398,33.441720860430208973,33.491745872936462547,33.541770885442716121,33.591795897948969696,33.64182091045522327,33.691845922961476845,33.741870935467730419,33.791895947973983994,33.841920960480237568,33.891945972986491142,33.941970985492744717,33.991995997998998291,34.042021010505251866,34.09204602301150544,34.142071035517759015,34.192096048024012589,34.242121060530266163,34.292146073036519738,34.342171085542759101,34.392196098049012676,34.44222111055526625,34.492246123061519825,34.542271135567773399,34.592296148074026974,34.642321160580280548,34.692346173086534122,34.742371185592787697,34.792396198099041271,34.842421210605294846,34.89244622311154842,34.942471235617801995,34.992496248124055569,35.042521260630309143,35.092546273136562718,35.142571285642816292,35.192596298149069867,35.242621310655323441,35.292646323161577016,35.34267133566783059,35.392696348174084164,35.442721360680337739,35.492746373186591313,35.542771385692844888,35.592796398199098462,35.642821410705352037,35.692846423211605611,35.742871435717859185,35.79289644822411276,35.842921460730366334,35.892946473236619909,35.942971485742859272,35.992996498249112847,36.043021510755366421,36.093046523261619996,36.14307153576787357,36.193096548274127144,36.243121560780380719,36.293146573286634293,36.343171585792887868,36.393196598299141442,36.443221610805395017,36.493246623311648591,36.543271635817902165,36.59329664832415574,36.643321660830409314,36.693346673336662889,36.743371685842916463,36.793396698349170038,36.843421710855423612,36.893446723361677186,36.943471735867930761,36.993496748374184335,37.04352176088043791,37.093546773386691484,37.143571785892945059,37.193596798399198633,37.243621810905452207,37.293646823411705782,37.343671835917959356,37.393696848424212931,37.443721860930466505,37.493746873436705869,37.543771885942959443,37.593796898449213018,37.643821910955466592,37.693846923461720166,37.743871935967973741,37.793896948474227315,37.84392196098048089,37.893946973486734464,37.943971985992988039,37.993996998499241613,38.044022011005495187,38.094047023511748762,38.144072036018002336,38.194097048524255911,38.244122061030509485,38.29414707353676306,38.344172086043016634,38.394197098549270208,38.444222111055523783,38.494247123561777357,38.544272136068030932,38.594297148574284506,38.644322161080538081,38.694347173586791655,38.744372186093045229,38.794397198599298804,38.844422211105552378,38.894447223611805953,38.944472236118059527,38.994497248624313102,39.044522261130566676,39.09454727363680604,39.144572286143059614,39.194597298649313188,39.244622311155566763,39.294647323661820337,39.344672336168073912,39.394697348674327486,39.444722361180581061,39.494747373686834635,39.544772386193088209,39.594797398699341784,39.644822411205595358,39.694847423711848933,39.744872436218102507,39.794897448724356082,39.844922461230609656,39.89494747373686323,39.944972486243116805,39.994997498749370379,40.045022511255623954,40.095047523761877528,40.145072536268131103,40.195097548774384677,40.245122561280638251,40.295147573786891826,40.3451725862931454,40.395197598799398975,40.445222611305652549,40.495247623811906124,40.545272636318159698,40.595297648824413272,40.645322661330652636,40.69534767383690621,40.745372686343159785,40.795397698849413359,40.845422711355666934,40.895447723861920508,40.945472736368174083,40.995497748874427657,41.045522761380681231,41.095547773886934806,41.14557278639318838,41.195597798899441955,41.245622811405695529,41.295647823911949104,41.345672836418202678,41.395697848924456252,41.445722861430709827,41.495747873936963401,41.545772886443216976,41.59579789894947055,41.645822911455724125,41.695847923961977699,41.745872936468231273,41.795897948974484848,41.845922961480738422,41.895947973986991997,41.945972986493245571,41.995997998999499146,42.04602301150575272,42.096048024012006294,42.146073036518259869,42.196098049024513443,42.246123061530752807,42.296148074037006381,42.346173086543259956,42.39619809904951353,42.446223111555767105,42.496248124062020679,42.546273136568274253,42.596298149074527828,42.646323161580781402,42.696348174087034977,42.746373186593288551,42.796398199099542126,42.8464232116057957,42.896448224112049274,42.946473236618302849,42.996498249124556423,43.046523261630809998,43.096548274137063572,43.146573286643317147,43.196598299149570721,43.246623311655824295,43.29664832416207787,43.346673336668331444,43.396698349174585019,43.446723361680838593,43.496748374187092168,43.546773386693345742,43.596798399199599316,43.646823411705852891,43.696848424212106465,43.74687343671836004,43.796898449224599403,43.846923461730852978,43.896948474237106552,43.946973486743360127,43.996998499249613701,44.047023511755867275,44.09704852426212085,44.147073536768374424,44.197098549274627999,44.247123561780881573,44.297148574287135148,44.347173586793388722,44.397198599299642297,44.447223611805895871,44.497248624312149445,44.54727363681840302,44.597298649324656594,44.647323661830910169,44.697348674337163743,44.747373686843417318,44.797398699349670892,44.847423711855924466,44.897448724362178041,44.947473736868431615,44.99749874937468519,45.047523761880938764,45.097548774387192339,45.147573786893445913,45.197598799399699487,45.247623811905953062,45.297648824412206636,45.347673836918460211,45.397698849424699574,45.447723861930953149,45.497748874437206723,45.547773886943460298,45.597798899449713872,45.647823911955967446,45.697848924462221021,45.747873936968474595,45.79789894947472817,45.847923961980981744,45.897948974487235319,45.947973986993488893,45.997998999499742467,46.048024012005996042,46.098049024512249616,46.148074037018503191,46.198099049524756765,46.24812406203101034,46.298149074537263914,46.348174087043517488,46.398199099549771063,46.448224112056024637,46.498249124562278212,46.548274137068531786,46.598299149574785361,46.648324162081038935,46.698349174587292509,46.748374187093546084,46.798399199599799658,46.848424212106053233,46.898449224612306807,46.948474237118546171,46.998499249624799745,47.04852426213105332,47.098549274637306894,47.148574287143560468,47.198599299649814043,47.248624312156067617,47.298649324662321192,47.348674337168574766,47.398699349674828341,47.448724362181081915,47.498749374687335489,47.548774387193589064,47.598799399699842638,47.648824412206096213,47.698849424712349787,47.748874437218603362,47.798899449724856936,47.84892446223111051,47.898949474737364085,47.948974487243617659,47.998999499749871234,48.049024512256124808,48.099049524762378383,48.149074537268631957,48.199099549774885531,48.249124562281139106,48.29914957478739268,48.349174587293646255,48.399199599799899829,48.449224612306153404,48.499249624812406978,48.549274637318646342,48.599299649824899916,48.64932466233115349,48.699349674837407065,48.749374687343660639,48.799399699849914214,48.849424712356167788,48.899449724862421363,48.949474737368674937,48.999499749874928511,49.049524762381182086,49.09954977488743566,49.149574787393689235,49.199599799899942809,49.249624812406196384,49.299649824912449958,49.349674837418703532,49.399699849924957107,49.449724862431210681,49.499749874937464256,49.54977488744371783,49.599799899949971405,49.649824912456224979,49.699849924962478553,49.749874937468732128,49.799899949974985702,49.849924962481239277,49.899949974987492851,49.949974987493746426,50],  \"expected\": [0,-8.4435256904056324489e+22,-1.5169293874378656501e+23,-2.0398171100248815541e+23,-2.4332238506650531738e+23,-2.715524722543475441e+23,-2.9033269225977392451e+23,-3.0115496361427486324e+23,-3.053514710843218188e+23,-3.0410446560678816147e+23,-2.9845650676336445673e+23,-2.8932090626669887776e+23,-2.7749217386397526131e+23,-2.6365630485584242383e+23,-2.4840078148111725652e+23,-2.3222418912792628796e+23,-2.1554537308814330718e+23,-1.9871208274894345418e+23,-1.8200906807120557507e+23,-1.6566560827857310004e+23,-1.4986246519187500643e+23,-1.3473826388842958868e+23,-1.2039531161963537734e+23,-1.0690487243631820276e+23,-9.4311919980984911528e+22,-8.2639394619760939368e+22,-7.1891993694470913655e+22,-6.2059525347637280637e+22,-5.3119857262818685354e+22,-4.504149190483673455e+22,-3.7785799558664812495e+22,-3.130893975677967532e+22,-2.5563500643895700619e+22,-2.0499884534168293474e+22,-1.606746643695294795e+22,-1.221555072074684511e+22,-8.8941493996920766464e+21,-6.0546038035967712952e+21,-3.6500696643052796641e+21,-1.63588394560176128e+21,30169917662717149184,1.3876833059888326246e+21,2.4735166886288954491e+21,3.3217547890878825103e+21,3.9637119023191246766e+21,4.4279778848320420577e+21,4.7404965061194374185e+21,4.92466892274269474e+21,5.0014760166461422961e+21,4.9896142294796048794e+21,4.9056403284212790067e+21,4.7641212603834753352e+21,4.5777858951801518162e+21,4.3576760291661221724e+21,4.1132945241204032799e+21,3.8527488968968990884e+21,3.5828890587308307251e+21,3.3094382340952875336e+21,3.0371163725124856709e+21,2.7697556074080753418e+21,2.510407518380086526e+21,2.2614421213136648929e+21,2.0246386485100114084e+21,1.8012682920371083018e+21,1.5921691711940547052e+21,1.3978138523752435548e+21,1.2183697995186039685e+21,1.0537531682545814733e+21,9.036763791192761303e+20,7.6768991679801327616e+20,6.4521880514258901402e+20,5.3559420326550051226e+20,4.3808055777289142272e+20,3.5189873139125446246e+20,2.7624550994480067379e+20,2.1030986877399842816e+20,1.5328635704245570765e+20,1.0438593462567936e+20,62844571972399718400,27929898940007542784,-1053835491535299712,-24762254225036419072,-43808578037656256512,-58762392481181474816,-70149282122893058048,-78451177831850147840,-84107280796444393472,-87515443622344425472,-89033904203855790080,-88983282104582569984,-87648759959083417600,-85282383962549780480,-82105427906184773632,-78310774504635170816,-74065276015805431808,-69512063442713296896,-64772780002995290112,-59949720125437280256,-55127860054588751872,-50376770282287570944,-45752403544366776320,-41298755084467478528,-37049394353857265664,-33028869341918564352,-29253986368206471168,-25734969461510320128,-22476504448208576512,-19478673611571339264,-16737787302177636352,-14247119210262575104,-11997552183339145216,-9978141513367865344,-8176602550645591040,-6579729347254573056,-5173750809597915136,-3944630563140021760,-2878316416712487936,-1960944970425675264,-1179006550367245824,-519475283307703936,30091247405889048,481478691949372800,845765257314959616,1133290299010701952,1353639149539762944,1515641468251729408,1627380694962911488,1696212468199134976,1728790127538607872,1731095658214311168,1708474655072807424,1665674082625523968,1606881788911996928,1535766894015982848,1455520320240603648,1368894861142156032,1278244301878177536,1185561204704668928,1092513062025368064,1000476596210231424,910570051491582208,823683379613927680,740506268512735232,661554003036275456,587191179458228736,517653322057191616,453066471106069760,393464827906257728,338806554648783552,288987835462442240,243855310539181696,203216998180703456,166851820409134240,134517846806184480,105959368822345520,80912913225009472,59112298888924592,40292835997700272,24194761113830296,10565995651622970,-835690808030432,-10241037073161490,-17868097588683682,-23921437189449520,-28591655979108912,-32055192532166612,-34474358925057720,-35997566115694136,-36759702892166648,-36882635990048288,-36475803030292064,-35636873657563516,-34452457667769596,-32998842012771992,-31342741371699736,-29542049495847860,-27646580783283944,-25698793536395908,-23734488117705632,-21783474763590456,-19870207159306868,-18014379038829412,-16231482065987638,-14533324095048114,-12928507614427632,-11422868760947266,-10019877767451960,-8721002086308681,-7526033726942352,-6433382567945719,-5440337563282928,-4543297866699229,-3737975956809168.5,-3019574864815374.5,-2382941593996771.5,-1822698780866190,-1333356587426849.75,-909406736823494.875,-545400514877885.8125,-236012460980373.4375,23908633444455.332031,239299909630947.5,414854410568137.25,554999546022368.3125,663882873599278.75,745364121663712,803012481823686.25,840108296032301.125,859648355637218.5,864354116541601.125,856682215802730.625,838836750372242.25,812782848260877.125,780261126258230.75,742802686587390.625,701744357712120.5,658243932167153.5,613295197008164,567742590556551.5,522295352838995.6875,477541066794207.0625,433958513243021.6875,391929785094349.5625,351751625583901.4375,313645971801607.625,277769698632503.53125,244223569776899.71875,213060411976933.25,184292536191051.78125,157898435442919.40625,133828793628147.65625,112011842876848.76562,92358109312428.65625,74764588372447.765625,59118391406004.421875,45299905160891.109375,33185505135700.210938,22649862698312.554688,13567884451977.833984,5816320642027.234375,-724922491333.40393066,-6171733536356.7324219,-10634979148149.707031,-14219891103485.710938,-17025630744975.544922,-19145006537928.140625,-20664322567609.722656,-21663337842947.582031,-22215318229426.273438,-22387164697056.652344,-22239603330272.078125,-21827424199634.765625,-21199757736956.257812,-20400378684531.777344,-19468029006053.742188,-18436752353211.578125,-17336233780955.648438,-16192139399765.070312,-15026451549577.867188,-13857795882404.65625,-12701757454507.166016,-11571183560064.716797,-10476471592276.828125,-9425840700679.0917969,-8425586430850.7041016,-7480317890290.6591797,-6593177287515.9345703,-5766041945611.8115234,-4999709101547.0722656,-4294063973269.7680664,-3648231712355.9462891,-3060713964929.7495117,-2529510841544.1928711,-2052229151244.3813477,-1626177789371.3408203,-1248451185760.6362305,-916001722527.43835449,-625702021019.46655273,-374397977933.90020752,-158953402955.07357788,23712923710.728908539,176596994349.296875,302585380099.46234131,404436408205.34143066,484766063868.64422607,546038017162.61334229,590557222112.14697266,620466580998.44165039,637746211737.69311523,644214899432.96520996,641533354610.50720215,631208940003.87695312,614601564882.15588379,592930480728.24768066,567281744502.74963379,538616145761.04742432,507777421542.58404541,475500608265.33618164,442420402902.23303223,409079426573.32348633,375936302456.20111084,343373476705.59716797,311704725996.49530029,281182308483.39782715,252003726523.48388672,224318079565.62823486,198231994281.58300781,173815126428.3828125,151105235197.01687622,130112836031.46051025,110825442199.71873474,93211408863.496047974,77223396119.184326172,62801469557.191818237,49875858390.296890259,38369392209.541412354,28199638006.896247864,19280759320.286148071,11525119265.531764984,4844648872.8007354736,-847998411.55438268185,-5638485922.1395196915,-9610007392.2388153076,-12842656670.714670181,-15412936245.323080063,-17393388355.494915009,-18852333579.61271286,-19853702892.048381805,-20456950288.640602112,-20717034163.346214294,-20684456673.263374329,-20405351345.872451782,-19921610154.790168762,-19271042213.760356903,-18487557109.592655182,-17601366711.088829041,-16639200051.478883743,-15624526586.225389481,-14577783776.668838501,-13516605543.943935394,-12456048678.430469513,-11408814779.672870636,-10385465742.46622467,-9394631199.1576519012,-8443206678.8085069656,-7536541553.4669752121,-6678616113.2294607162,-5872207347.8500156403,-5119043216.1922597885,-4419945358.5542917252,-3774960353.5007052422,-3183479742.873872757,-2644349148.5815248489,-2155966884.8955698013,-1716372532.5404009819,-1323325987.8510792255,-974377533.65474939346,-666929500.04262781143,-398290094.48474812508,-165719983.2876560688,33527798.434948924929,202174042.08539715409,342885116.02396786213,458249741.0182145834,550760283.81987214088,622798087.6064786911,676622385.34457504749,714362370.55808126926,738012029.00524628162,749427363.94093024731,750325676.59665465355,742286591.93858551979,726754547.4092425108,705042489.01715028286,678336544.64927053452,647701468.72222220898,614086675.17263305187,578332697.25710046291,541177932.65633797646,503265550.94687199593,465150457.62603348494,427306224.57692813873,390131911.17716419697,353958713.23643451929,319056388.64979535341,285639419.13819956779,253872876.78225645423,223877972.30959454179,195737269.34192606807,169499555.11744081974,145184363.64930832386,122786151.93263664842,102278133.73927509785,83615778.808895617723,66739987.920017406344,51579956.466733552516,38055740.833631306887,26080543.106885623187,15562730.534419117495,6407606.6994316354394,-1481048.356942538172,-8199651.796640727669,-13843688.33400551416,-18506760.520132157952,-22279802.690936665982,-25250442.902650345117,-27502497.862245798111,-29115586.61143893376,-30164849.522461216897,-30720759.995203830302,-30849017.094202101231,-30610508.217907618731,-30061331.741248913109,-29252870.406770106405,-28231907.052334100008,-27040775.048526849598,-25717536.571776367724,-24296182.556160360575,-22806848.845257036388,-21276043.703359864652,-19726882.441846683621,-18179325.471012488008,-16650416.6003365051,-15154518.881508458406,-13703545.719524623826,-12307185.369020335376,-10973117.287245461717,-9707219.1333946157247,-8513763.4882266372442,-7395603.6199903907254,-6354347.8446297934279,-5390522.222115165554,-4503721.4985940614715,-3692748.3478990294971,-2955741.0877954224125,-2290290.1481288578361,-1693543.6516161456238,-1162302.5352041255683,-693105.69240336143412,-282305.65639938187087,73864.628430612254306,379233.38129959005164,637639.33196371200029,852888.26451170106884,1028716.1879502256634,1168758.5743190466892,1276525.1203919355758,1355379.5080476338044,1408523.660371720558,1438986.014798801858,1449613.3605228401721,1443065.8144626291469,1421814.537804919295,1388141.8231575139798,1344143.2102829965297,1291731.3159571336582,1232641.0904579975177,1168436.2393396934494,1100516.5743137586396,1030126.0811226534424,958361.51514502428472,886181.35705091827549,814414.981080407626,743771.9074260344496,674851.02775069884956,608149.70907738164533,544072.69616670126561,482940.74608613428427,424998.94101263943594,370424.63644777960144,319335.01201616722392,271794.20092355273664,227819.98203201498836,187390.02543109125691,150447.68840982404072,116907.36393103640876,86659.388140013921657,59574.517168471407786,35507.986582738594734,14303.169332005496472,-4205.1499649520646926,-20187.865043362980941,-33818.981881007057382,-45273.375282251683529,-54724.846588799569872,-62344.460831604665145,-68299.141765090156696,-72750.503558851851267,-75853.898430449567968,-77757.660155479228706,-78602.524160629633116,-78521.205767182618729,-77638.119084368547192,-76069.220034489699174,-73921.958007408014964,-71295.321675631028484,-68279.965539564727806,-64958.40480413883779,-61405.267203217314091,-57687.591378828808956,-53865.162381532580184,-49990.875780705217039,-46111.122754874602833,-42266.189369169209385,-38490.664037108799675,-34813.847905826849455,-31260.163596517711994,-27849.558375255277497,-24597.898423649017786,-21517.351424869193579,-18616.755179547399166,-15901.97041942789474,-13376.216396128356791,-11040.388189932345995,-8893.3550112466109567,-6932.2390574377750454,-5152.674742486003197,-3549.0483385769925917,-2114.7182597313567385,-842.21638014638256209,276.56908360610918862,1250.2284848114275064,2087.6827207191104208,2798.0514647917366347,3390.5367998557253486,3874.3213571951059748,4258.4800429106890078,4551.9044214748300874,4763.2388257713537314,4900.827271566185118,4972.6702709514438538,4986.3906626007274099,4949.2076055254046878,4867.9179163917642654,4748.883967405607109,4598.0274014460846956,4420.8279627757574417,4222.3267845937716629,4007.1335183386067911,3779.4367334645362462,3543.0170599598877743,3301.2625887571148269,3057.1860870764799074,2813.4436263707029866,2572.3542596743645845,2335.9204226268743696,2105.8487680933194497,1883.5711780497135805,1670.2657281575459365,1466.8774101849155613,1274.1384451217547849,1092.5880454885532345,922.59150897768608957,764.35854723224883855,617.96077331431092716,483.34828930723784879,360.36533160943355369,248.76494589070344432,148.22267648439344612,58.349266268291621884,-21.29762706095118574,-91.202683898323641642,-151.88312312735689602,-203.87982217446366917,-247.7493238156364157,-284.05669271877815163,-313.36918147050255357,-336.25066339534555482,-353.25678774724423192,-364.93081176178247915,-371.80006353038817224,-374.37298962632576149,-373.1367418130181477,-368.55525793838194204,-361.06779320920577447,-351.08785939612641869,-339.00253109563607268,-325.17207992800427974,-309.92989944017102744,-293.58268547548368588,-276.41083883611582905,-258.66905917110324253,-240.58710114823355752,-222.37066608988405392,-204.2024043522296779,-186.24300578782683147,-168.63235763953389323,-151.49075115747393738,-134.9201201007507791,-119.00529607431036538,-103.81526735268475647,-89.404429452150779412,-75.813817227949840571,-63.07230969200926296,-51.197800068381710048,-40.198324828697288069,-30.073146579429419489,-20.813786708590431118,-12.405004643987384227,-4.8257214314443812597,1.9501138872865890761,7.9527159270718366102,13.215712859659015876,17.775454239116204036,21.67037595891305557,24.940421140559575264,27.626515407257716817,29.770094705248702383,31.412683596187683577,32.595521751695741841,33.359236232127585708,33.743557021570318,33.787073216328025183,33.527027220988138367,32.999144291127258555,32.237494771496571389,31.274386410027865679,30.140284178306284701,28.863755095551212548,27.471435633110289132,25.988019367674322524,24.436262651725805028,22.837006177176334631,21.209210420962143928,19.570003077931858115,17.934736705241462573,16.317054922375913151,14.728965630706547074,13.180919835165550325,11.681894767307612781,10.23948012297654131,8.859966338380690587,7.5484339350615421438,6.3088430665911268136,5.1441224975073369663,4.0562573377288835275,3.0463749432916800153,2.1148284765935354557,1.2612776963512708495,0.48476661915941343661,-0.21620223908534944024,-0.84359727248639915231,-1.3997910197510068375,-1.8874973476456562427,-2.3097126606525373305,-2.6696611726253824948,-2.9707442391368417134,-3.2164937163389613062,-3.4105292833008311604,-3.5565196397146481289,-3.6581474693407458609,-3.7190780413592801068,-3.7429313066774505536,-3.7332573339747625596,-3.6935149206273263367,-3.627053206413039188,-3.537096112847077034,-3.4267294279224045361,-3.2988903547335572952,-3.1563593427516694057,-3.0017540222131708916,-2.8375250650113339468,-2.6659537994767519287,-2.4891514113477937187,-2.3090595689230837273,-2.1274523167233136967,-1.9459390888472345438,-1.7659687004744257788,-1.5888341835427879367,-1.4156783404182906594,-1.2474998972939186359,-1.0851601470278509076,-0.92938997909081533244,-0.78079720217721815256,-0.63987407279445340791,-0.50700495073087070708,-0.38247400967798678151,-0.26647293841245611734,-0.15910857480064055647,-0.060410421450772570917,0.029662001913028607919,0.11121200835765379655,0.18439882934430187889,0.24943096419790974916,0.30655981671079679529,0.35607363759077026444,0.39829178724704239478,0.43355932952630132915,0.46224196345886608972,0.48472129684277576178,0.50139046257096309134,0.51265007598271317146,0.51890452918251528391,0.52055861620425070146,0.51801448109262382413,0.5116688794126618145,0.5019107423675437385,0.48911903159038200295,0.47366087176227711364,0.45588994748249417333,0.43614515026266270636,0.41474946112143906696,0.39200905400541791179,0.3682126051429240321,0.34363079343696589785,0.31851597710950357856,0.29310203200991702399,0.26760433728454380287,0.24221989446104422172,0.21712756642100811133,0.19248842320726272659,0.16844618212996564921,0.14512773018957328408,0.12264371741756878442,0.10108921034040228848,0.080544395392012177459,0.061075322729686173928,0.042734681541559044193,0.025562598566901805625,0.0095874521783197528407,-0.0051733050059986204414,-0.018712321404800436736,-0.031031525484092034595,-0.042141313754097423083,-0.052059752457302800599,-0.060811797119265681433,-0.068428533624174933681,-0.074946443991701541809,-0.080406699571361331391,-0.084854483936044070025,-0.088338347347934678688,-0.090909594287933312429,-0.09262170518385122453,-0.093529793142920425453,-0.093690096190161026302,-0.093159505235407724655,-0.091995127737711290816,-0.090253886805678876226,-0.08799215526531668774,-0.08526542404221067184,-0.08212800404149937783,-0.078632760566078832576,-0.074830879189817595121,-0.070771661897210208503,-0.066502352212800458497,-0.06206798797179616245,-0.057511280326508332217,-0.052872517540517999235,-0.048189492092757295338,-0.043497449595958352642,-0.038829058027161189592,-0.034214395771226216447,-0.029680956990561991465,-0.025253672854725572883,-0.020954947191217109664,-0.016804705152889540948,-0.012820453537102769262,-0.0090173514363171038133,-0.0054082899485241630114,-0.0020039797280795449211,0.0011869547875027371131,0.0041578755820000845231,0.0069040267444584278028,0.0094224266208760270452,0.01171175736095718227,0.013772252726198981609,0.015605584964583361571,0.01721475149660904938,0.018603962097655746266,0.019778527202974155452,0.020744747904229126484,0.021509808150685299361,0.022081669614017536418,0.022468969623513784101,0.022680922528253370796,0.022727224794803411317,0.022617964103169838075,0.022363532660237626926,0.021974544908786659142,0.021461759771407021985,0.020836007532275855475,0.020108121425796012666,0.019288873969524614888,0.01838891804960322493,0.017418732740014750138,0.016388573812377533329,0.015308428870595395047,0.014187977024447925509,0.013036552998058203653,0.011863115553040882652,0.010676220091931309941,0.0094839952951431463063,0.008294123634110750487,0.0071138255943549236204,0.0059498474348759957525,0.0048084523044358805366,0.0036954145308491512592,0.0026160168962701614744,0.0015750507095538797755,0.00057681848598018100292,-0.00037486095510299633805,-0.0012766451629485416758,-0.0021256586845305900854,-0.0029194818333735414288,-0.0036561377777503721934,-0.0043340781236763104012,-0.0049521671633236119536,-0.0055096649541866308045,-0.0060062093885997359238,-0.0064417974071169182768,-0.0068167655028606452886,-0.0071317696572949533171,-0.0073877648410266604298,-0.0075859842062389049033,-0.0077279180902577208553,-0.00781529294259115416,-0.0078500502805965415715,-0.0078343257717662963258,-0.0077704285335062775811,-0.0076608207342454539765,-0.0075080975727884599266,-0.0073149677060288156166,-0.0070842341885022433456,-0.0068187759807964241215,-0.0065215300775630169819,-0.0061954742998147739955,-0.0058436107903479736492,-0.0054689502455188320276,-0.0050744969112309600001,-0.0046632343658656793747,-0.0042381121080154243383,-0.003802032962261423215,-0.0033578413118796261554,-0.0029083121632571501229,-0.0024561410429596005137,-0.0020039347248038477667,-0.0015542027809590133573,-0.001109349948016911426,-0.00067166929613744937033,-0.00024333618677932573253,0.00017359699783420925816,0.00057720537249724768788,0.00096569533494494268818,0.0013374076425110947679,0.0016908198036042713236,0.0020245478093808039373,0.0023373472321005697022,0.0026281137175748927985,0.0028958828998705875638,0.0031398297670245322276,0.0033592675069599171704,0.0035536458630869311587,0.0037225490292259184703,0.0038656931135187789193,0.0039829232009031571501,0.0040742100435222873209,0.0041396464081395814572,0.0041794431092292052415,0.0041939247559300042723,0.0041835252404878392821,0.004148782995178083334,0.0040903360440030407663,0.0040089168747050717839,0.0039053471558320729251,0.0037805323227439388556,0.0036354560555627475626,0.003471174671151501176,0.0032888114502617402102,0.0030895509200244012163,0.0028746331109758263209,0.0026453478068163664705,0.0024030288040969116463,0.002149048198022863055,0.0018848107095593077953,0.0016117480680188564762,0.0013313134623179944185,0.0010449760731014031637,0.00075421569696061403331,0.00046051747301258501516,0.00016536672116253142728,-0.00012975609954953766273,-0.00042338030502258710555,-0.00071404976597465904652,-0.0010003275478743195535,-0.001280800406003371238,-0.0015540831315407736563,-0.0018188227453421509493,-0.0020737025368476624289,-0.0023174459462830237361,-0.0025488202890239812157,-0.0027666403216735119437,-0.0029697716500536545242,-0.0031571339799406224723,-0.0033277042119722408803,-0.0034805193827336499551,-0.0036146794545777729754,-0.00372934995726569192,-0.0038237644850173044264,-0.0038972270530465771832,-0.0039491143181192367786,-0.0039788776681151999046,-0.0039860451860047945924,-0.0039702234940583959119,-0.0039310994845050805518,-0.0038684419432390834345,-0.003782103073544968927,-0.0036720199271756130861,-0.0035382157504731917737,-0.003380801253575267673,-0.0031999758110967638398,-0.0029960286030286621337,-0.002769339704946405939,-0.0025203811369794173157,-0.0022497178813603844506,-0.0019580088787525345116,-0.0016460080139484997101,-0.0013145651019494768164,-0.00096462688587231127432,-0.00059723805859941399374,-0.00021354232058690193773,0.00018521651321463648864,0.00059769334378903754643,0.0010224405416613866447,0.0014579066088199227769,0.0019024347333321406112,0.0023542612202059193249,0.0028115137811310681078,0.0032722096647313527427,0.0037342536078454049639,0.0041954355871263058694,0.0046534283488893941894,0.0051057846936301415353,0.0055499344899610277698,0.005983181390858302931,0.0064026992230439483053,0.0068055280180298284229,0.0071885696507914542686,0.0075485830491858483052,0.0078821789340451173939,0.0081858140463236615109,0.0084557848137037632669,0.0086882204046219210086,0.0088790751126999814535,0.009024120008986693392,0.009118933793153316536,0.0091588927677510555136,0.0091391598517229707954,0.0090546725404472248877,0.0089001297095324428954,0.0086699771482278975565,0.0083583916954640558733,0.0079592638369856711505,0.0074661786055274844548,0.006872394607217596936,0.0061708209760320056891,0.0053539920337626663999,0.004414039405132483794,0.0033426613058304428111,0.0021310886847070538083,0.00077004785937895042953,-0.00075028076386613644713,-0.0024403083507884022058,-0.0043110882100326894037,-0.0063743718784487254231,-0.0086426714122917139976,-0.011129328677120764804,-0.013848592547712479384,-0.016815705068139098766,-0.020046997785273090037,-0.023559999661180781871,-0.027373558197037961559,-0.03150797567053260223,-0.035985162709136188364,-0.040828811804044531919,-0.046064593827710512142,-0.051720381168682182105,-0.057826501762249030159,-0.064416029101009325553,-0.071525114289843885751,-0.079193367408077613989,-0.087464296913012787305,-0.096385817634482326421,-0.10601084016137123089,-0.11639795722762780184,-0.12761224622359268466,-0.1397262113948701534,-0.15282089491960523797,-0.16698719324280289489,-0.18232742428851109184,-0.19895720314083872871,-0.21700769940819292225,-0.23662837004392131557,-0.257990288686146374,-0.28129022914084750306,-0.3067557101025545907,-0.33465127585751419659,-0.36528638128441709432,-0.39902538048273700211,-0.4363003042426836231,-0.47762737910214314585,-0.52362863180671648244,-0.57506050441321643341,-0.63285228589044917324,-0.69815852731023331224,-0.77243175986840906244,-0.85752532385886348631,-0.9558419332537980706,-1.0705536083280950965,-1.2059364555461604684,-1.3678969325332455131,-1.5648308410724174333,-1.809089382179574157,-2.1196196209836282165,-2.52704605918855707,-3.0843058384346284662,-3.8914957964380083588,-5.1634365247328819493,-7.4600413843085586763,-12.844345986005066607,-40.2204904892451367,39.775148669832383064,13.821098816649525887,8.5504250083327537624,6.2850067894726731055,5.0257660485451980392,4.224860910613768894,3.6710649821398808612,3.2656558540572646621,2.9563140607763664924,2.7127261658319850035,2.5161156766947061492,2.354231345292592259,2.2187391611997311358,2.1037726008766544084,2.0050823602295615444,1.9195150106410645563,1.8446811197025967388,1.7787370940497055916,1.7202377375628066236,1.6680341529422895164,1.6212015111042346049,1.5789869685115847098,1.5407714669795407048,1.506041282509734458,1.4743665388535736049,1.445384774668542649,1.4187882298604213016,1.3943139047544488296,1.3717357112893773241,1.3508582199911705057,1.3315116366026864547,1.3135477351998805506,1.2968365418462119987,1.2812636120038982668,1.2667277812652655289,1.2531392961004732545,1.2404182517624371407,1.2284932800289256605,1.2173004413693699899,1.2067822853190708354,1.1968870499957511289,1.1875679772949649937,1.1787827247164881506,1.1704928582760678601,1.1626634137510025724,1.1552625157495435282,1.1482610459019224614,1.1416323529360836719,1.1353519985947184701,1.1293975343266724476,1.1237483044883385119,1.1183852724529310674,1.1132908665743248555,1.1084488434086228192,1.1038441659777242787,1.0994628951784923832,1.0952920927095763926,1.0913197341144016406,1.0875346307304534221,1.0839263594976211724,1.080485199716817446,1.0772020759682747748,1.0740685065001038812,1.071076556484519493,1.0682187956138746721,1.0654882595730958972,1.0628784149808396808,1.0603831274400037366,1.0579966323801750505,1.055713508411129764,1.0535286529383582899,1.0514372598194434705,1.0494347988645162939,1.047516997005419892,1.0456798209770390429,1.0439194613708306925,1.0422323179352157574,1.0406149860104347837,1.0390642439969015598,1.0375770417662593115,1.0361504899333446872,1.03478184991530342,1.0334685247112329609,1.0322080503421153796,1.0309980878964977169,1.0298364161324728983,1.0287209245910868827,1.0276496071803919996,1.0266205561930481505,1.025631956723689564,1.0246820814552501933,1.0237692857861340201,1.0228920032725421496,1.0220487413624677053,1.0212380773998430694,1.0204586548791343414,1.0197091799323012573,1.018988418031523846,1.0182951908924391393,1.017628373563856492,1.0169868916910358436,1.0163697189406235566,1.0157758745762706099,1.0152044211748023628,1.0146544624735802653,1.0141251413404070991,1.013615637857969709,1.0131251675154098191,1.012652979500156869,1.0121983550836550769,1.0117606060950772306,1.011339073477538264,1.010933125921711806,1.0105421585721081623,1.0101655918016012592,1.0098028700500998323,1.0094534607235325918,1.009116853149583104,1.0087925575868414985,1.0084801042842674867,1.0081790425880625683,1.0078889400932389275,1.0076093818373448308,1.0073399695339777526,1.0070803208438587895,1.0068300686813871359,1.0065888605547250734,1.0063563579375813806,1.00613223567097676,1.0059161813933805707,1.0057078949977020788,1.0055070881137171401,1.0053134836145891651,1.0051268151462287026,1.0049468266783045944,1.0047732720757960312,1.0046059146900303549,1.004444526968220508,1.0042888900805664321,1.0041387935640413431,1.003994034982032435,1.0038544195990506402,1.0037197600697698174,1.0035898761416939262,1.0034645943707927174,1.0033437478494786621,1.0032271759463338157,1.003114724057027507,1.0030062433658923915,1.0029015906176586004,1.0028006278988699229,1.0027032224285292727,1.0026092463575499991,1.0025185765766011503,1.0024310945319694355,1.0023466860490652941,1.0022652411632333447,1.0021866539575319255,1.0021108224071726411,1.0020376482303219312,1.0019670367449811099,1.0018988967316762029,1.001833140301704228,1.0017696827706885632,1.0017084425372164702,1.0016493409663342895,1.0015923022776942464,1.0015372534381490333,1.0014841240586065396,1.0014328462949633192,1.0013833547529407131,1.0013355863966615367,1.0012894804608090116,1.0012449783662178415,1.0012020236387526584,1.0011605618313397237,1.0011205404490188808,1.0010819088768918572,1.0010446183108492324,1.0010086216909590551,1.0009738736374107493,1.0009403303889110592,1.0009079497434292261,1.00087669100119947,1.0008465149098895175,1.0008173836118468003,1.0007892605933392804,1.000762110635713853,1.0007358997683919455,1.0007105952236334812,1.0006861653929970402,1.0006625797854287185,1.0006398089869179557,1.0006178246216577143,1.0005965993146492821,1.000576106655697739,1.0005563211647405808,1.00053721825846198,1.0005187742181393951,1.0005009661586770076,1.0004837719987789146,1.00046717043222122,1.0004511409001755062,1.0004356635645499374,1.0004207192823044714,1.0004062895807050992,1.0003923566334818052,1.0003789032378536117,1.0003659127923922867,1.0003533692756876317,1.0003412572257903701,1.0003295617203962209,1.0003182683577507284,1.0003073632382430969,1.0002968329466634945,1.0002866645351022878,1.0002768455064643405,1.000267363798575726,1.0002582077688635387,1.0002493661795830437,1.0002408281835779569,1.0002325833105476516,1.0002246214538070834,1.0002169328575210017,1.0002095081043931302,1.0002023381037932204,1.0001954140803108739,1.0001887275627130425,1.0001822703732969888,1.000176034617620946,1.0001700126745995956,1.0001641971869501546,1.0001585810519790787,1.0001531574126933943,1.0001479196492266688,1.0001428613705705128,1.0001379764065951861,1.0001332588003544188,1.0001287028006597968,1.0001243028549196001,1.0001200536022272214,1.0001159498666949421,1.0001119866510206347,1.0001081591302829477,1.000104462645952097,1.0001008927001131532,1.0000974449498898355,1.0000941152020663694,1.0000908994078963055,1.0000877936580929717,1.0000847941779971162,1.0000818973229110842,1.0000790995735993061,1.0000763975319426624,1.0000737879167480582,1.0000712675597012158,1.0000688334014631309,1.0000664824879017534,1.0000642119664548968,1.0000620190826201572,1.0000599011765667345,1.0000578556798662699,1.0000558801123367036,1.0000539720789956011,1.0000521292671196161,1.000050349443407427,1.0000486304512394842,1.0000469702080339029,1.0000453667026933946,1.0000438179931425697,1.0000423222039482862,1.0000408775240243742,1.0000394822044145204,1.0000381345561542012,1.0000368329482032248,1.0000355758054537691,1.0000343616068039232,1.0000331888833007277,1.0000320562163451665,1.0000309622359606632,1.0000299056191215286,1.0000288850881380309,1.0000278994090978646,1.000026947390362464,1.0000260278811134995,1.0000251397699506661,1.000024281983537433,1.0000234534852940893,1.0000226532741349761,1.0000218803832505721,1.0000211338789297688,1.0000204128594245567,1.0000197164538529027,1.000019043821138931,1.0000183941489912964,1.0000177666529153075,1.0000171605752588011,1.0000165751842930995,1.0000160097733223896,1.000015463659825965,1.000014936184630443,1.000014426711107518,1.0000139346244034666,1.000013459330690635,1.0000130002564486809,1.0000125568477680194,1.0000121285696779161,1.000011714905498339,1.0000113153562126822,1.0000109294398631388,1.0000105566909665011,1.00001019665995039,1.0000098489126079127,1.0000095130295720836,1.000009188605807342,1.000008875250119722,1.0000085725846821205,1.0000082802445779961,1.00000799787735839,1.0000077251426164882,1.0000074617115746189,1.0000072072666870149,1.0000069615012552315,1.000006724119057111,1.000006494833989068,1.0000062733697190342,1.0000060594593529473,1.0000058528451121198,1.0000056532780208229,1.0000054605176060818,1.0000052743316065751,1.0000050944956917487,1.0000049207931911432,1.0000047530148321595,1.0000045909584878157,1.000004434428931166,1.0000042832376014879,1.0000041372023742436,1.0000039961473432548,1.000003859902606429,1.0000037283040619229,1.0000036011932089686,1.0000034784169573587,1.0000033598274418178,1.0000032452818445883,1.0000031346422213474,1.0000030277753364505,1.0000029245525012822,1.0000028248494183813,1.000002728546032893,1.000002635526386463,1.0000025456784780165,1.0000024588941278658,1.0000023750688480373,1.0000022941017161493,1.0000022158952528439,1.0000021403553049915,1.0000020673909322255,1.0000019969142963649,1.0000019288405563866,1.000001863087765841,1.000001799576774042,1.000001738231130366,1.0000016789769923253,1.0000016217430365284,1.0000015664603727483,1.0000015130624606563,1.0000014614850301076,1.0000014116660029817,1.0000013635454185756,1.0000013170653616612,1.0000012721698927631,1.0000012288049797693,1.000001186918434426,1.0000011464598475008,1.0000011073805299411,1.0000010696334526994,1.0000010331731912228,1.0000009979558697193,1.0000009639391091998,1.0000009310819757413,1.0000008993449318595,1.0000008686897876586,1.0000008390796562008,1.0000008104789086527,1.0000007828531309872,1.0000007561690822389,1.0000007303946560899,1.0000007054988402366,1.0000006814516799736,1.0000006582242426667,1.000000635788581782,1.000000614117703579,1.000000593185535358,1.0000005729668930421,1.0000005534374514227,1.0000005345737146278,1.0000005163529879226,1.0000004987533508416,1.0000004817536296553,1.0000004653333729454,1.0000004494728269577,1.0000004341529107332,1.0000004193551943477,1.0000004050618760409,1.0000003912557615671,1.0000003779202419896,1.0000003650392750298,1.0000003525973659713,1.0000003405795474531,1.0000003289713630394,1.000000317758848789,1.0000003069285168245,1.0000002964673395667,1.0000002863627330818,1.0000002766025428702,1.0000002671750281014,1.0000002580688489573,1.0000002492730521997,1.0000002407770571811,1.0000002325706449646,1.0000002246439443354,1.0000002169874209201,1.0000002095918651968,1.0000002024483816143,1.0000001955483781568,1.000000188883555019,1.0000001824458961686,1.000000176227658466,1.000000170221362561,1.0000001644197840101,1.0000001588159455057,1.0000001534031062178,1.0000001481747562426,1.0000001431246072769,1.0000001382465850686,1.0000001335348225329,1.0000001289836528695,1.0000001245876020128,1.0000001203413830808,1.0000001162398890475,1.0000001122781865259,1.000000108451511327,1.0000001047552609101,1.0000001011849897203,1.000000097736403637,1.000000094405355533,1.0000000911878390575,1.0000000880799844172,1.0000000850780539352,1.0000000821784373883,1.000000079377647566,1.0000000766723158296,1.0000000740591887816,1.0000000715351236025,1.0000000690970847206,1.0000000667421402589,1.0000000644674580386,1.0000000622703022479,1.0000000601480305562,1.0000000580980907827,1.0000000561180175662,1.0000000542054294783,1.000000052358026803,1.000000050573587318,1.0000000488499654061,1.000000047185087837,1.0000000455769528784,1.0000000440236263,1.0000000425232402623,1.000000041073990209,1.000000039674133312,1.000000038321986251,1.0000000370159227714,1.0000000357543723517,1.0000000345358177611,1.0000000333587937273,1.000000032221884716,1.0000000311237235984,1.0000000300629894312,1.0000000290384070123,1.0000000280487439941,1.0000000270928102175,1.0000000261694561576,1.0000000252775715914,1.0000000244160838214,1.0000000235839567875,1.0000000227801897346,1.0000000220038165466,1.0000000212539030819,1.0000000205295476174,1.0000000198298795162,1.0000000191540567851,1.0000000185012671849,1.000000017870725566,1.000000017261673646,1.0000000166733788998,1.0000000161051341152,1.000000015556255617,1.0000000150260839327,1.000000014513980906,1.0000000140193310294,1.0000000135415394453,1.0000000130800315024,1.000000012634252311,1.0000000122036658556,1.0000000117877543282,1.0000000113860174622,1.0000000109979723106,1.0000000106231521357,1.000000010261106187,1.0000000099113990348,1.000000009573610571,1.0000000092473340096,1.0000000089321774421,1.0000000086277618383,1.0000000083337208245,1.0000000080497011279,1.0000000077753610217,1.0000000075103707697,1.0000000072544115159,1.0000000070071757285,1.0000000067683660898,1.000000006537695052,1.0000000063148857254,1.0000000060996696583,1.0000000058917886125,1.000000005690992122,1.0000000054970392682,1.0000000053096962382,1.0000000051287381009,1.0000000049539470304,1.0000000047851131946,1.0000000046220332006,1.0000000044645112052,1.0000000043123578042,1.0000000041653895888,1.0000000040234304777,1.0000000038863092744,1.0000000037538614439,1.0000000036259273362,1.0000000035023532963,1.0000000033829909984,1.0000000032676965578,1.0000000031563314185,1.0000000030487616876,1.0000000029448579131,1.000000002844495306,1.000000002747553296,1.0000000026539148656,1.0000000025634678824,1.0000000024761033224,1.0000000023917163805,1.0000000023102051383,1.0000000022314721182,1.0000000021554220631,1.0000000020819641566,1.0000000020110095811,1.0000000019424732933,1.0000000018762726928,1.0000000018123280654,1.0000000017505630279,1.0000000016909027512,1.0000000016332759589,1.0000000015776129292,1.0000000015238470485,1.00000000147191348,1.000000001421749829,1.0000000013732959214,1.0000000013264931376,1.0000000012812855221,1.0000000012376186742,1.0000000011954399692,1.000000001154698781,1.0000000011153460377,1.0000000010773344439,1.0000000010406182582,1.000000001005153516,1.0000000009708973625,1.0000000009378084975,1.0000000009058476191,1.0000000008749758695,1.0000000008451561673,1.0000000008163527632,1.0000000007885312403,1.0000000007616576259,1.0000000007356999454,1.0000000007106268907,1.0000000006864082636,1.0000000006630151983,1.0000000006404192732,1.0000000006185936208,1.0000000005975115958,1.0000000005771481071,1.0000000005574785078,1.0000000005384794832,1.0000000005201277187,1.0000000005024016758,1.0000000004852793722,1.0000000004687408239,1.0000000004527660469,1.0000000004373355011,1.0000000004224309791,1.000000000408034273,1.0000000003941282856,1.0000000003806961413,1.000000000367721853,1.0000000003551896555,1.0000000003430846718,1.000000000331392247,1.0000000003200981702,1.0000000003091891188,1.00000000029865177,1.0000000002884736894,1.0000000002786422204,1.0000000002691460388,1.0000000002599733762,1.0000000002511133523,1.0000000002425553092,1.0000000002342890326,1.0000000002263043086,1.0000000002185918113,1.0000000002111419928,1.0000000002039461933,1.000000000196995531,1.0000000001902820124,1.0000000001837969776,1.0000000001775330993,1.0000000001714826059,1.0000000001656383919,1.0000000001599935739,1.0000000001545408246,1.0000000001492739266,1.0000000001441866626,1.0000000001392728155,1.000000000134526168,1.000000000129941613,1.0000000001255131554,1.0000000001212354661,1.0000000001171036601,1.0000000001131128524,1.000000000109257936,1.000000000105534248,1.0000000001019375695,1.0000000000984636817,1.0000000000951079215,1.0000000000918665144,1.0000000000887356855,1.00000000008571166,1.0000000000827904412,1.0000000000799689204,1.0000000000772435449,1.0000000000746109841,1.0000000000720683513,1.0000000000696120939,1.0000000000672397693,1.000000000064948269,1.0000000000627347063,1.0000000000605966388,1.000000000058531624,1.0000000000565367753,1.0000000000546098722,1.0000000000527489163,1.0000000000509512432,1.0000000000492146324,1.0000000000475375295,1.00000000004591727,1.0000000000443525217,1.000000000042840842,1.0000000000413808987,1.0000000000399706934,1.0000000000386084498,1.0000000000372926134,1.0000000000360216301,1.0000000000347939455,1.0000000000336082273,1.0000000000324629212,1.000000000031356473,1.0000000000302877723,1.000000000029255709,1.0000000000282585066,1.0000000000272954992,1.0000000000263653543,1.0000000000254667398,1.0000000000245987675,1.0000000000237605491,1.0000000000229507524,1.0000000000221684893,1.0000000000214130935,1.0000000000206832329,1.0000000000199784633,1.0000000000192974525,1.0000000000186397564,1.0000000000180044868,1.0000000000173909775,1.0000000000167983405,1.0000000000162256875,1.0000000000156727964,1.0000000000151385571,1.0000000000146227475,1.0000000000141244794,1.0000000000136430867,1.0000000000131781253,1.000000000012728929,1.0000000000122950539,1.0000000000118760557,1.0000000000114712684,1.0000000000110804699,1.000000000010702772,1.0000000000103379527,1.00000000000998579,1.0000000000096453956,1.0000000000093167696,1.0000000000089992458,1.0000000000086923801,1.0000000000083961726,1.0000000000081101792,1.0000000000078337337,1.000000000007566614,1.0000000000073088202,1.0000000000070596862,1.0000000000068192119,1.0000000000065867312,1.0000000000063622441,1.0000000000061455285,1.0000000000059359184,1.0000000000057336358,1.0000000000055382365,1.0000000000053494986,1.0000000000051672,1.0000000000049911186,1.0000000000048210325,1.0000000000046567195,1.0000000000044979576,1.0000000000043447468,1.000000000004196643,1.0000000000040536463,1.0000000000039155346,1.0000000000037820858,1.0000000000036530778,1.0000000000035287329,1.0000000000034083847,1.0000000000032922554,1.0000000000031801228,1.000000000003071543,1.00000000000296696,1.0000000000028659297,1.0000000000027682301,1.0000000000026738611,1.0000000000025828228,1.0000000000024946711,1.0000000000024096281,1.0000000000023274715,1.0000000000022482016,1.0000000000021715962,1.0000000000020976554,1.000000000002026157,1.0000000000019571011,1.0000000000018902657,1.0000000000018258728,1.0000000000017637003,1.0000000000017035262,1.0000000000016455726,1.0000000000015893953,1.0000000000015352164,1.0000000000014830359,1.0000000000014324097,1.0000000000013835599,1.0000000000013364865,1.0000000000012909673,1.0000000000012470025,1.0000000000012043699,1.0000000000011632917,1.0000000000011237677,1.000000000001085354,1.0000000000010484946,1.0000000000010127454,1.0000000000009781065,1.0000000000009447998,1.0000000000009126033,1.0000000000008815171,1.0000000000008515411,1.0000000000008224532,1.0000000000007944756,1.0000000000007673862,1.0000000000007411849,1.0000000000007158718,1.0000000000006916689,1.0000000000006679102,1.0000000000006452616,1.0000000000006232792,1.0000000000006019629,1.0000000000005815348,1.0000000000005617729,1.000000000000542455,1.0000000000005240253,1.0000000000005062617,1.0000000000004889422,1.0000000000004722889,1.0000000000004560796,1.0000000000004405365,1.0000000000004256595,1.0000000000004110046,1.0000000000003970158,1.000000000000383471,1.0000000000003705924,1.0000000000003579359,1.0000000000003457234,1.0000000000003339551,1.0000000000003224088,1.0000000000003115286,1.0000000000003008704,1.0000000000002906564,1.0000000000002806644,1.0000000000002711165,1.0000000000002620126,1.0000000000002529088,1.0000000000002444711,1.0000000000002360334,1.0000000000002280398,1.0000000000002202682,1.0000000000002127187,1.0000000000002053913,1.0000000000001985079,1.0000000000001916245,1.0000000000001851852,1.000000000000178968,1.0000000000001727507,1.0000000000001669775,1.0000000000001612044,1.0000000000001556533,1.0000000000001503242,1.0000000000001452172,1.0000000000001403322,1.0000000000001354472,1.0000000000001310063,1.0000000000001265654,1.0000000000001221245,1.0000000000001179057,1.0000000000001139089,1.0000000000001101341,1.0000000000001063594,1.0000000000001028067,1.0000000000000992539,1.0000000000000959233,1.0000000000000925926,1.000000000000089484,1.0000000000000863754,1.0000000000000834888,1.0000000000000806022,1.0000000000000777156,1.0000000000000752731,1.0000000000000726086,1.0000000000000701661,1.0000000000000677236,1.0000000000000655032,1.0000000000000632827,1.0000000000000610623,1.0000000000000590639,1.0000000000000570655,1.0000000000000550671,1.0000000000000530687,1.0000000000000512923,1.0000000000000495159,1.0000000000000479616,1.0000000000000461853,1.000000000000044631,1.0000000000000430767,1.0000000000000417444,1.0000000000000401901,1.0000000000000388578,1.0000000000000375255,1.0000000000000361933,1.000000000000035083,1.0000000000000337508,1.0000000000000326406,1.0000000000000315303,1.0000000000000304201,1.0000000000000295319,1.0000000000000284217,1.0000000000000275335,1.0000000000000266454,1.0000000000000257572,1.000000000000024869,1.0000000000000239808,1.0000000000000230926,1.0000000000000224265,1.0000000000000215383,1.0000000000000208722,1.0000000000000202061,1.0000000000000195399,1.0000000000000188738,1.0000000000000182077,1.0000000000000175415,1.0000000000000168754,1.0000000000000164313,1.0000000000000157652,1.0000000000000153211,1.0000000000000146549,1.0000000000000142109,1.0000000000000137668,1.0000000000000133227,1.0000000000000128786,1.0000000000000124345,1.0000000000000119904,1.0000000000000115463,1.0000000000000111022,1.0000000000000108802,1.0000000000000104361,1.000000000000009992,1.00000000000000977,1.0000000000000093259,1.0000000000000091038,1.0000000000000086597,1.0000000000000084377,1.0000000000000082157,1.0000000000000079936,1.0000000000000075495,1.0000000000000073275,1.0000000000000071054,1.0000000000000068834,1.0000000000000066613,1.0000000000000064393,1.0000000000000062172,1.0000000000000059952,1.0000000000000057732,1.0000000000000055511,1.0000000000000053291,1.000000000000005107,1.000000000000005107,1.000000000000004885,1.0000000000000046629,1.0000000000000044409,1.0000000000000044409,1.0000000000000042188,1.0000000000000039968,1.0000000000000039968,1.0000000000000037748,1.0000000000000037748,1.0000000000000035527,1.0000000000000033307,1.0000000000000033307,1.0000000000000031086,1.0000000000000031086,1.0000000000000028866,1.0000000000000028866,1.0000000000000028866,1.0000000000000026645,1.0000000000000026645,1.0000000000000024425,1.0000000000000024425,1.0000000000000024425,1.0000000000000022204,1.0000000000000022204,1.0000000000000022204,1.0000000000000019984,1.0000000000000019984,1.0000000000000019984,1.0000000000000017764,1.0000000000000017764,1.0000000000000017764,1.0000000000000015543,1.0000000000000015543,1.0000000000000015543,1.0000000000000015543,1.0000000000000013323,1.0000000000000013323,1.0000000000000013323,1.0000000000000013323,1.0000000000000013323,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000008882,1.0000000000000008882,1.0000000000000008882,1.0000000000000008882]}\n","program_output":"{\n  \"x\": [-50,-49.949974987493746426,-49.899949974987492851,-49.849924962481239277,-49.799899949974985702,-49.749874937468732128,-49.699849924962478553,-49.649824912456224979,-49.59979989994997851,-49.549774887443724936,-49.499749874937471361,-49.449724862431217787,-49.399699849924964212,-49.349674837418710638,-49.299649824912457063,-49.249624812406203489,-49.199599799899949915,-49.14957478739369634,-49.099549774887442766,-49.049524762381189191,-48.999499749874935617,-48.949474737368682042,-48.899449724862428468,-48.849424712356174894,-48.799399699849928425,-48.74937468734367485,-48.699349674837421276,-48.649324662331167701,-48.599299649824914127,-48.549274637318660552,-48.499249624812406978,-48.449224612306153404,-48.399199599799899829,-48.349174587293646255,-48.29914957478739268,-48.249124562281139106,-48.199099549774885531,-48.149074537268631957,-48.099049524762378383,-48.049024512256124808,-47.998999499749878339,-47.948974487243624765,-47.89894947473737119,-47.848924462231117616,-47.798899449724864041,-47.748874437218610467,-47.698849424712356893,-47.648824412206103318,-47.598799399699849744,-47.548774387193596169,-47.498749374687342595,-47.44872436218108902,-47.398699349674835446,-47.348674337168581872,-47.298649324662328297,-47.248624312156081828,-47.198599299649828254,-47.148574287143574679,-47.098549274637321105,-47.04852426213106753,-46.998499249624813956,-46.948474237118560382,-46.898449224612306807,-46.848424212106053233,-46.798399199599799658,-46.748374187093546084,-46.698349174587292509,-46.648324162081038935,-46.598299149574785361,-46.548274137068531786,-46.498249124562278212,-46.448224112056024637,-46.398199099549778168,-46.348174087043524594,-46.298149074537271019,-46.248124062031017445,-46.198099049524763871,-46.148074037018510296,-46.098049024512256722,-46.048024012006003147,-45.997998999499749573,-45.947973986993495998,-45.897948974487242424,-45.84792396198098885,-45.797898949474735275,-45.747873936968481701,-45.697848924462235232,-45.647823911955981657,-45.597798899449728083,-45.547773886943474508,-45.497748874437220934,-45.44772386193096736,-45.397698849424713785,-45.347673836918460211,-45.297648824412206636,-45.247623811905953062,-45.197598799399699487,-45.147573786893445913,-45.097548774387192339,-45.047523761880938764,-44.99749874937468519,-44.947473736868431615,-44.897448724362178041,-44.847423711855924466,-44.797398699349677997,-44.747373686843424423,-44.697348674337170849,-44.647323661830917274,-44.5972986493246637,-44.547273636818410125,-44.497248624312156551,-44.447223611805902976,-44.397198599299649402,-44.347173586793395827,-44.297148574287142253,-44.247123561780888679,-44.197098549274635104,-44.14707353676838153,-44.097048524262135061,-44.047023511755881486,-43.996998499249627912,-43.946973486743374337,-43.896948474237120763,-43.846923461730867189,-43.796898449224613614,-43.74687343671836004,-43.696848424212106465,-43.646823411705852891,-43.596798399199599316,-43.546773386693345742,-43.496748374187092168,-43.446723361680838593,-43.396698349174585019,-43.346673336668331444,-43.29664832416207787,-43.246623311655831401,-43.196598299149577826,-43.146573286643324252,-43.096548274137070678,-43.046523261630817103,-42.996498249124563529,-42.946473236618309954,-42.89644822411205638,-42.846423211605802805,-42.796398199099549231,-42.746373186593295657,-42.696348174087042082,-42.646323161580788508,-42.596298149074534933,-42.546273136568288464,-42.49624812406203489,-42.446223111555781315,-42.396198099049527741,-42.346173086543274167,-42.296148074037020592,-42.246123061530767018,-42.196098049024513443,-42.146073036518259869,-42.096048024012006294,-42.04602301150575272,-41.995997998999499146,-41.945972986493245571,-41.895947973986991997,-41.845922961480738422,-41.795897948974484848,-41.745872936468231273,-41.695847923961977699,-41.645822911455724125,-41.595797898949477656,-41.545772886443224081,-41.495747873936970507,-41.445722861430716932,-41.395697848924463358,-41.345672836418209783,-41.295647823911956209,-41.245622811405702635,-41.19559779889944906,-41.145572786393195486,-41.095547773886941911,-41.045522761380688337,-40.995497748874441868,-40.945472736368188293,-40.895447723861934719,-40.845422711355681145,-40.79539769884942757,-40.745372686343173996,-40.695347673836920421,-40.645322661330666847,-40.595297648824413272,-40.545272636318159698,-40.495247623811906124,-40.445222611305652549,-40.395197598799398975,-40.3451725862931454,-40.295147573786891826,-40.245122561280638251,-40.195097548774384677,-40.145072536268131103,-40.095047523761877528,-40.045022511255631059,-39.994997498749377485,-39.94497248624312391,-39.894947473736870336,-39.844922461230616761,-39.794897448724363187,-39.744872436218109613,-39.694847423711856038,-39.644822411205602464,-39.594797398699348889,-39.544772386193095315,-39.49474737368684174,-39.444722361180595271,-39.394697348674341697,-39.344672336168088123,-39.294647323661834548,-39.244622311155580974,-39.194597298649327399,-39.144572286143073825,-39.09454727363682025,-39.044522261130566676,-38.994497248624313102,-38.944472236118059527,-38.894447223611805953,-38.844422211105552378,-38.794397198599298804,-38.744372186093045229,-38.694347173586791655,-38.644322161080538081,-38.594297148574284506,-38.544272136068030932,-38.494247123561777357,-38.444222111055530888,-38.394197098549277314,-38.344172086043023739,-38.294147073536770165,-38.244122061030516591,-38.194097048524263016,-38.144072036018009442,-38.094047023511755867,-38.044022011005502293,-37.993996998499248718,-37.943971985992995144,-37.89394697348674157,-37.843921960980495101,-37.793896948474241526,-37.743871935967987952,-37.693846923461734377,-37.643821910955480803,-37.593796898449227228,-37.543771885942973654,-37.49374687343672008,-37.443721860930466505,-37.393696848424212931,-37.343671835917959356,-37.293646823411705782,-37.243621810905452207,-37.193596798399198633,-37.143571785892945059,-37.093546773386691484,-37.04352176088043791,-36.993496748374184335,-36.943471735867930761,-36.893446723361684292,-36.843421710855430717,-36.793396698349177143,-36.743371685842923569,-36.693346673336669994,-36.64332166083041642,-36.593296648324162845,-36.543271635817909271,-36.493246623311655696,-36.443221610805402122,-36.393196598299148548,-36.343171585792894973,-36.293146573286648504,-36.24312156078039493,-36.193096548274141355,-36.143071535767887781,-36.093046523261634206,-36.043021510755380632,-35.992996498249127058,-35.942971485742873483,-35.892946473236619909,-35.842921460730366334,-35.79289644822411276,-35.742871435717859185,-35.692846423211605611,-35.642821410705352037,-35.592796398199098462,-35.542771385692844888,-35.492746373186591313,-35.442721360680337739,-35.392696348174084164,-35.34267133566783059,-35.292646323161584121,-35.242621310655330547,-35.192596298149076972,-35.142571285642823398,-35.092546273136569823,-35.042521260630316249,-34.992496248124062674,-34.9424712356178091,-34.892446223111555526,-34.842421210605301951,-34.792396198099048377,-34.742371185592794802,-34.692346173086548333,-34.642321160580294759,-34.592296148074041184,-34.54227113556778761,-34.492246123061534036,-34.442221110555280461,-34.392196098049026887,-34.342171085542773312,-34.292146073036519738,-34.242121060530266163,-34.192096048024012589,-34.142071035517759015,-34.09204602301150544,-34.042021010505251866,-33.991995997998998291,-33.941970985492744717,-33.891945972986491142,-33.841920960480237568,-33.791895947973983994,-33.741870935467730419,-33.691845922961476845,-33.641820910455230376,-33.591795897948976801,-33.541770885442723227,-33.491745872936469652,-33.441720860430216078,-33.391695847923962504,-33.341670835417708929,-33.291645822911455355,-33.241620810405208886,-33.191595797898955311,-33.141570785392701737,-33.091545772886448162,-33.041520760380194588,-32.991495747873941013,-32.941470735367687439,-32.891445722861433865,-32.84142071035518029,-32.791395697848926716,-32.741370685342673141,-32.691345672836419567,-32.641320660330165992,-32.591295647823912418,-32.541270635317658844,-32.491245622811405269,-32.441220610305151695,-32.39119559779889812,-32.341170585292644546,-32.291145572786390971,-32.241120560280137397,-32.191095547773883823,-32.141070535267630248,-32.091045522761376674,-32.041020510255130205,-31.99099549774887663,-31.940970485242623056,-31.890945472736369481,-31.840920460230115907,-31.790895447723862333,-31.740870435217608758,-31.690845422711355184,-31.640820410205105162,-31.590795397698851588,-31.540770385192598013,-31.490745372686344439,-31.440720360180090864,-31.39069534767383729,-31.340670335167583715,-31.290645322661330141,-31.240620310155080119,-31.190595297648826545,-31.14057028514257297,-31.090545272636319396,-31.040520260130065822,-30.990495247623812247,-30.940470235117558673,-30.890445222611305098,-30.840420210105055077,-30.790395197598801502,-30.740370185092547928,-30.690345172586294353,-30.640320160080040779,-30.590295147573787204,-30.54027013506753363,-30.490245122561283608,-30.440220110055030034,-30.390195097548776459,-30.340170085042522885,-30.290145072536269311,-30.240120060030015736,-30.190095047523762162,-30.140070035017508587,-30.090045022511258566,-30.040020010005004991,-29.989994997498751417,-29.939969984992497842,-29.889944972486244268,-29.839919959979990693,-29.789894947473737119,-29.739869934967483545,-29.689844922461233523,-29.639819909954979948,-29.589794897448726374,-29.5397698849424728,-29.489744872436219225,-29.439719859929965651,-29.389694847423712076,-29.339669834917458502,-29.28964482241120848,-29.239619809904954906,-29.189594797398701331,-29.139569784892447757,-29.089544772386194182,-29.039519759879940608,-28.989494747373687034,-28.939469734867433459,-28.889444722361183437,-28.839419709854929863,-28.789394697348676289,-28.739369684842422714,-28.68934467233616914,-28.639319659829915565,-28.589294647323661991,-28.539269634817408416,-28.489244622311158395,-28.43921960980490482,-28.389194597298651246,-28.339169584792397671,-28.289144572286144097,-28.239119559779890523,-28.189094547273636948,-28.139069534767383374,-28.089044522261133352,-28.039019509754879778,-27.988994497248626203,-27.938969484742372629,-27.888944472236119054,-27.83891945972986548,-27.788894447223611905,-27.738869434717358331,-27.688844422211108309,-27.638819409704854735,-27.58879439719860116,-27.538769384692347586,-27.488744372186094012,-27.438719359679840437,-27.388694347173586863,-27.338669334667336841,-27.288644322161083267,-27.238619309654829692,-27.188594297148576118,-27.138569284642322543,-27.088544272136068969,-27.038519259629815394,-26.98849424712356182,-26.938469234617311798,-26.888444222111058224,-26.838419209604804649,-26.788394197098551075,-26.738369184592297501,-26.688344172086043926,-26.638319159579790352,-26.588294147073536777,-26.538269134567286756,-26.488244122061033181,-26.438219109554779607,-26.388194097048526032,-26.338169084542272458,-26.288144072036018883,-26.238119059529765309,-26.188094047023511735,-26.138069034517261713,-26.088044022011008138,-26.038019009504754564,-25.98799399699850099,-25.937968984492247415,-25.887943971985993841,-25.837918959479740266,-25.787893946973486692,-25.73786893446723667,-25.687843921960983096,-25.637818909454729521,-25.587793896948475947,-25.537768884442222372,-25.487743871935968798,-25.437718859429715224,-25.387693846923461649,-25.337668834417211627,-25.287643821910958053,-25.237618809404704479,-25.187593796898450904,-25.13756878439219733,-25.087543771885943755,-25.037518759379690181,-24.987493746873436606,-24.937468734367186585,-24.88744372186093301,-24.837418709354679436,-24.787393696848425861,-24.737368684342172287,-24.687343671835918713,-24.637318659329665138,-24.587293646823411564,-24.537268634317161542,-24.487243621810907968,-24.437218609304654393,-24.387193596798400819,-24.337168584292147244,-24.28714357178589367,-24.237118559279640095,-24.187093546773390074,-24.137068534267136499,-24.087043521760882925,-24.03701850925462935,-23.986993496748375776,-23.936968484242122202,-23.886943471735868627,-23.836918459229615053,-23.786893446723365031,-23.736868434217111457,-23.686843421710857882,-23.636818409204604308,-23.586793396698350733,-23.536768384192097159,-23.486743371685843584,-23.43671835917959001,-23.386693346673339988,-23.336668334167086414,-23.286643321660832839,-23.236618309154579265,-23.186593296648325691,-23.136568284142072116,-23.086543271635818542,-23.036518259129564967,-22.986493246623314946,-22.936468234117061371,-22.886443221610807797,-22.836418209104554222,-22.786393196598300648,-22.736368184092047073,-22.686343171585793499,-22.636318159079539925,-22.586293146573289903,-22.536268134067036328,-22.486243121560782754,-22.43621810905452918,-22.386193096548275605,-22.336168084042022031,-22.286143071535768456,-22.236118059029514882,-22.18609304652326486,-22.136068034017011286,-22.086043021510757711,-22.036018009004504137,-21.985992996498250562,-21.935967983991996988,-21.885942971485743413,-21.835917958979489839,-21.785892946473239817,-21.735867933966986243,-21.685842921460732668,-21.635817908954479094,-21.58579289644822552,-21.535767883941971945,-21.485742871435718371,-21.435717858929464796,-21.385692846423214775,-21.3356678339169612,-21.285642821410707626,-21.235617808904454051,-21.185592796398200477,-21.135567783891946902,-21.085542771385693328,-21.035517758879443306,-20.985492746373189732,-20.935467733866936157,-20.885442721360682583,-20.835417708854429009,-20.785392696348175434,-20.73536768384192186,-20.685342671335668285,-20.635317658829418264,-20.585292646323164689,-20.535267633816911115,-20.48524262131065754,-20.435217608804403966,-20.385192596298150391,-20.335167583791896817,-20.285142571285643243,-20.235117558779393221,-20.185092546273139646,-20.135067533766886072,-20.085042521260632498,-20.035017508754378923,-19.984992496248125349,-19.934967483741871774,-19.8849424712356182,-19.834917458729368178,-19.784892446223114604,-19.734867433716861029,-19.684842421210607455,-19.63481740870435388,-19.584792396198100306,-19.534767383691846732,-19.484742371185593157,-19.434717358679343135,-19.384692346173089561,-19.334667333666835987,-19.284642321160582412,-19.234617308654328838,-19.184592296148075263,-19.134567283641821689,-19.084542271135568114,-19.034517258629318093,-18.984492246123064518,-18.934467233616810944,-18.884442221110557369,-18.834417208604303795,-18.784392196098050221,-18.734367183591796646,-18.684342171085543072,-18.63431715857929305,-18.584292146073039476,-18.534267133566785901,-18.484242121060532327,-18.434217108554278752,-18.384192096048025178,-18.334167083541771603,-18.284142071035518029,-18.234117058529268007,-18.184092046023014433,-18.134067033516760858,-18.084042021010507284,-18.03401700850425371,-17.983991995998003688,-17.933966983491750113,-17.883941970985496539,-17.833916958479242965,-17.78389194597298939,-17.733866933466735816,-17.683841920960482241,-17.633816908454228667,-17.583791895947975092,-17.533766883441721518,-17.483741870935467944,-17.433716858429214369,-17.383691845922960795,-17.33366683341670722,-17.283641820910460751,-17.233616808404207177,-17.183591795897953602,-17.133566783391700028,-17.083541770885446454,-17.033516758379192879,-16.983491745872939305,-16.93346673336668573,-16.883441720860432156,-16.833416708354178581,-16.783391695847925007,-16.733366683341671433,-16.683341670835417858,-16.633316658329164284,-16.583291645822910709,-16.533266633316657135,-16.483241620810410666,-16.433216608304157091,-16.383191595797903517,-16.333166583291649943,-16.283141570785396368,-16.233116558279142794,-16.183091545772889219,-16.133066533266635645,-16.08304152076038207,-16.033016508254128496,-15.982991495747874922,-15.932966483241621347,-15.882941470735367773,-15.832916458229114198,-15.782891445722860624,-15.732866433216607049,-15.68284142071036058,-15.632816408204107006,-15.582791395697853432,-15.532766383191599857,-15.482741370685346283,-15.432716358179092708,-15.382691345672839134,-15.332666333166585559,-15.282641320660331985,-15.232616308154078411,-15.182591295647824836,-15.132566283141571262,-15.082541270635317687,-15.032516258129064113,-14.982491245622810538,-14.932466233116556964,-14.882441220610310495,-14.832416208104056921,-14.782391195597803346,-14.732366183091549772,-14.682341170585296197,-14.632316158079042623,-14.582291145572789048,-14.532266133066535474,-14.4822411205602819,-14.432216108054028325,-14.382191095547774751,-14.332166083041521176,-14.282141070535267602,-14.232116058029014027,-14.182091045522760453,-14.132066033016513984,-14.08204102051026041,-14.032016008004006835,-13.981990995497753261,-13.931965982991499686,-13.881940970485246112,-13.831915957978992537,-13.781890945472738963,-13.731865932966485389,-13.681840920460231814,-13.63181590795397824,-13.581790895447724665,-13.531765882941471091,-13.481740870435217516,-13.431715857928963942,-13.381690845422710368,-13.331665832916463899,-13.281640820410210324,-13.23161580790395675,-13.181590795397703175,-13.131565782891449601,-13.081540770385196026,-13.031515757878942452,-12.981490745372688878,-12.931465732866435303,-12.881440720360181729,-12.831415707853928154,-12.78139069534767458,-12.731365682841421005,-12.681340670335167431,-12.631315657828913857,-12.581290645322660282,-12.531265632816413813,-12.481240620310160239,-12.431215607803906664,-12.38119059529765309,-12.331165582791399515,-12.281140570285145941,-12.231115557778892367,-12.181090545272638792,-12.131065532766385218,-12.081040520260131643,-12.031015507753878069,-11.980990495247624494,-11.93096548274137092,-11.880940470235117346,-11.830915457728863771,-11.780890445222610197,-11.730865432716363728,-11.680840420210110153,-11.630815407703856579,-11.580790395197603004,-11.53076538269134943,-11.480740370185095856,-11.430715357678842281,-11.380690345172588707,-11.330665332666335132,-11.280640320160081558,-11.230615307653827983,-11.180590295147574409,-11.130565282641320835,-11.08054027013506726,-11.030515257628813686,-10.980490245122567217,-10.930465232616313642,-10.880440220110060068,-10.830415207603806493,-10.780390195097552919,-10.730365182591299344,-10.68034017008504577,-10.630315157578792196,-10.580290145072538621,-10.530265132566285047,-10.480240120060031472,-10.430215107553777898,-10.380190095047524323,-10.330165082541270749,-10.280140070035017175,-10.2301150575287636,-10.180090045022517131,-10.130065032516263557,-10.080040020010009982,-10.030015007503756408,-9.9799899949975028335,-9.9299649824912492591,-9.8799399699849956846,-9.8299149574787421102,-9.7798899449724885358,-9.7298649324662349613,-9.6798399199599813869,-9.6298149074537278125,-9.5797898949474742381,-9.5297648824412206636,-9.4797398699349670892,-9.4297148574287135148,-9.3796898449224670458,-9.3296648324162134713,-9.2796398199099598969,-9.2296148074037063225,-9.179589794897452748,-9.1295647823911991736,-9.0795397698849455992,-9.0295147573786920248,-8.9794897448724384503,-8.9294647323661848759,-8.8794397198599313015,-8.829414707353677727,-8.7793896948474241526,-8.7293646823411705782,-8.6793396698349170038,-8.6293146573286634293,-8.5792896448224169603,-8.5292646323161633859,-8.4792396198099098115,-8.429214607303656237,-8.3791895947974026626,-8.3291645822911490882,-8.2791395697848955137,-8.2291145572786419393,-8.1790895447723883649,-8.1290645322661347905,-8.079039519759881216,-8.0290145072536276416,-7.9789894947473740672,-7.9289644822411204927,-7.8789394697348669183,-7.8289144572286204493,-7.7788894447223668749,-7.7288644322161133005,-7.678839419709859726,-7.6288144072036061516,-7.5787893946973525772,-7.5287643821910990027,-7.4787393696848454283,-7.4287143571785918539,-7.3786893446723382795,-7.328664332166084705,-7.2786393196598311306,-7.2286143071535775562,-7.1785892946473239817,-7.1285642821410704073,-7.0785392696348168329,-7.0285142571285703639,-6.9784892446223167894,-6.928464232116063215,-6.8784392196098096406,-6.8284142071035560662,-6.7783891945973024917,-6.7283641820910489173,-6.6783391695847953429,-6.6283141570785417684,-6.578289144572288194,-6.5282641320660346196,-6.4782391195597810452,-6.4282141070535274707,-6.3781890945472738963,-6.3281640820410203219,-6.2781390695347667474,-6.2281140570285202784,-6.178089044522266704,-6.1280640320160131296,-6.0780390195097595551,-6.0280140070035059807,-5.9779889944972524063,-5.9279639819909988319,-5.8779389694847452574,-5.827913956978491683,-5.7778889444722381086,-5.7278639319659845341,-5.6778389194597309597,-5.6278139069534773853,-5.5777888944472238109,-5.5277638819409702364,-5.477738869434716662,-5.427713856928470193,-5.3776888444222166186,-5.3276638319159630441,-5.2776388194097094697,-5.2276138069034558953,-5.1775887943972023209,-5.1275637818909487464,-5.077538769384695172,-5.0275137568784415976,-4.9774887443721880231,-4.9274637318659344487,-4.8774387193596808743,-4.8274137068534272998,-4.7773886943471737254,-4.727363681840920151,-4.677338669334673682,-4.6273136568284201076,-4.5772886443221665331,-4.5272636318159129587,-4.4772386193096593843,-4.4272136068034058098,-4.3771885942971522354,-4.327163581790898661,-4.2771385692846450866,-4.2271135567783915121,-4.1770885442721379377,-4.1270635317658843633,-4.0770385192596307888,-4.0270135067533772144,-3.97698849424712364,-3.9269634817408700656,-3.8769384692346235965,-3.8269134567283700221,-3.7768884442221164477,-3.7268634317158628733,-3.6768384192096092988,-3.6268134067033557244,-3.57678839419710215,-3.5267633816908485755,-3.4767383691845950011,-3.4267133566783414267,-3.3766883441720878523,-3.3266633316658342778,-3.2766383191595807034,-3.226613306653327129,-3.1765882941470735545,-3.1265632816408199801,-3.0765382691345735111,-3.0265132566283199367,-2.9764882441220663623,-2.9264632316158127878,-2.8764382191095592134,-2.826413206603305639,-2.7763881940970520645,-2.7263631815907984901,-2.6763381690845449157,-2.6263131565782913412,-2.5762881440720377668,-2.5262631315657841924,-2.476238119059530618,-2.4262131065532770435,-2.3761880940470234691,-2.3261630815407698947,-2.2761380690345234257,-2.2261130565282698512,-2.1760880440220162768,-2.1260630315157627024,-2.076038019009509128,-2.0260130065032555535,-1.9759879939970019791,-1.9259629814907484047,-1.8759379689844948302,-1.8259129564782412558,-1.7758879439719876814,-1.725862931465734107,-1.6758379189594805325,-1.6258129064532269581,-1.5757878939469733837,-1.5257628814407269147,-1.4757378689344733402,-1.4257128564282197658,-1.3756878439219661914,-1.3256628314157126169,-1.2756378189094590425,-1.2256128064032054681,-1.1755877938969518937,-1.1255627813906983192,-1.0755377688844447448,-1.0255127563781911704,-0.97548774387193759594,-0.92546273136568402151,-0.87543771885943044708,-0.82541270635317687265,-0.77538769384692329822,-0.72536268134067682922,-0.67533766883442325479,-0.62531265632816968036,-0.57528764382191610594,-0.52526263131566253151,-0.47523761880940895708,-0.42521260630315538265,-0.37518759379690180822,-0.32516258129064823379,-0.27513756878439465936,-0.22511255627814108493,-0.1750875437718875105,-0.12506253126563393607,-0.075037518759380361644,-0.025012506253126787215,0.025012506253126787215,0.075037518759373256216,0.12506253126562683065,0.17508754377188040507,0.2251125562781339795,0.27513756878438755393,0.32516258129064112836,0.37518759379689470279,0.42521260630314827722,0.47523761880940185165,0.52526263131565542608,0.57528764382190900051,0.62531265632816257494,0.67533766883441614937,0.7253626813406697238,0.77538769384692329822,0.82541270635317687265,0.87543771885942334166,0.92546273136567691608,0.97548774387193049051,1.0255127563781840649,1.0755377688844376394,1.1255627813906912138,1.1755877938969447882,1.2256128064031983627,1.2756378189094519371,1.3256628314157055115,1.3756878439219590859,1.4257128564282126604,1.4757378689344662348,1.5257628814407198092,1.5757878939469733837,1.6258129064532198527,1.6758379189594734271,1.7258629314657270015,1.775887943971980576,1.8259129564782341504,1.8759379689844877248,1.9259629814907412992,1.9759879939969948737,2.0260130065032484481,2.0760380190095020225,2.126063031515755597,2.1760880440220091714,2.2261130565282627458,2.2761380690345163202,2.3261630815407698947,2.3761880940470234691,2.4262131065532699381,2.4762381190595235125,2.526263131565777087,2.5762881440720306614,2.6263131565782842358,2.6763381690845378102,2.7263631815907913847,2.7763881940970449591,2.8264132066032985335,2.876438219109552108,2.9264632316158056824,2.9764882441220592568,3.0265132566283128313,3.0765382691345664057,3.1265632816408199801,3.1765882941470735545,3.2266133066533200235,3.276638319159573598,3.3266633316658271724,3.3766883441720807468,3.4267133566783343213,3.4767383691845878957,3.5267633816908414701,3.5767883941970950445,3.626813406703348619,3.6768384192096021934,3.7268634317158557678,3.7768884442221093423,3.8269134567283629167,3.8769384692346164911,3.9269634817408700656,3.97698849424712364,4.027013506753370109,4.0770385192596236834,4.1270635317658772578,4.1770885442721308323,4.2271135567783844067,4.2771385692846379811,4.3271635817908915556,4.37718859429714513,4.4272136068033987044,4.4772386193096522788,4.5272636318159058533,4.5772886443221594277,4.6273136568284130021,4.6773386693346665766,4.727363681840920151,4.77738869434716662,4.8274137068534201944,4.8774387193596737688,4.9274637318659273433,4.9774887443721809177,5.0275137568784344921,5.0775387693846880666,5.127563781890941641,5.1775887943971952154,5.2276138069034487899,5.2776388194097023643,5.3276638319159559387,5.3776888444222095131,5.4277138569284630876,5.477738869434716662,5.5277638819409702364,5.5777888944472167054,5.6278139069534702799,5.6778389194597238543,5.7278639319659774287,5.7778889444722310031,5.8279139569784845776,5.877938969484738152,5.9279639819909917264,5.9779889944972453009,6.0280140070034988753,6.0780390195097524497,6.1280640320160060242,6.1780890445222595986,6.228114057028513173,6.2781390695347667474,6.3281640820410203219,6.3781890945472667909,6.4282141070535203653,6.4782391195597739397,6.5282641320660275142,6.5782891445722810886,6.628314157078534663,6.6783391695847882374,6.7283641820910418119,6.7783891945972953863,6.8284142071035489607,6.8784392196098025352,6.9284642321160561096,6.978489244622309684,7.0285142571285632584,7.0785392696348168329,7.1285642821410704073,7.1785892946473168763,7.2286143071535704507,7.2786393196598240252,7.3286643321660775996,7.378689344672331174,7.4287143571785847485,7.4787393696848383229,7.5287643821910918973,7.5787893946973454717,7.6288144072035990462,7.6788394197098526206,7.728864432216106195,7.7788894447223597695,7.8289144572286133439,7.8789394697348669183,7.9289644822411133873,7.9789894947473669617,8.0290145072536205362,8.0790395197598741106,8.129064532266127685,8.1790895447723812595,8.2291145572786348339,8.2791395697848884083,8.3291645822911419828,8.3791895947973955572,8.4292146073036491316,8.479239619809902706,8.5292646323161562805,8.5792896448224098549,8.6293146573286634293,8.6793396698349170038,8.7293646823411634728,8.7793896948474170472,8.8294147073536706216,8.879439719859924196,8.9294647323661777705,8.9794897448724313449,9.0295147573786849193,9.0795397698849384938,9.1295647823911920682,9.1795897948974456426,9.229614807403699217,9.2796398199099527915,9.3296648324162063659,9.3796898449224599403,9.4297148574287135148,9.4797398699349670892,9.5297648824412135582,9.5797898949474671326,9.6298149074537207071,9.6798399199599742815,9.7298649324662278559,9.7798899449724814303,9.8299149574787350048,9.8799399699849885792,9.9299649824912421536,9.9799899949974957281,10.030015007503749302,10.080040020010002877,10.130065032516256451,10.180090045022510026,10.2301150575287636,10.280140070035017175,10.330165082541263644,10.380190095047517218,10.430215107553770792,10.480240120060024367,10.530265132566277941,10.580290145072531516,10.63031515757878509,10.680340170085038665,10.730365182591292239,10.780390195097545813,10.830415207603799388,10.880440220110052962,10.930465232616306537,10.980490245122560111,11.030515257628813686,11.080540270135060155,11.130565282641313729,11.180590295147567304,11.230615307653820878,11.280640320160074452,11.330665332666328027,11.380690345172581601,11.430715357678835176,11.48074037018508875,11.530765382691342325,11.580790395197595899,11.630815407703849473,11.680840420210103048,11.730865432716356622,11.780890445222610197,11.830915457728863771,11.88094047023511024,11.930965482741363815,11.980990495247617389,12.031015507753870963,12.081040520260124538,12.131065532766378112,12.181090545272631687,12.231115557778885261,12.281140570285138836,12.33116558279139241,12.381190595297645984,12.431215607803899559,12.481240620310153133,12.531265632816406708,12.581290645322660282,12.631315657828913857,12.681340670335160326,12.7313656828414139,12.781390695347667474,12.831415707853921049,12.881440720360174623,12.931465732866428198,12.981490745372681772,13.031515757878935347,13.081540770385188921,13.131565782891442495,13.18159079539769607,13.231615807903949644,13.281640820410203219,13.331665832916456793,13.381690845422710368,13.431715857928963942,13.481740870435210411,13.531765882941463985,13.58179089544771756,13.631815907953971134,13.681840920460224709,13.731865932966478283,13.781890945472731858,13.831915957978985432,13.881940970485239006,13.931965982991492581,13.981990995497746155,14.032016008003992624,14.082041020510246199,14.132066033016499773,14.182091045522753348,14.232116058029006922,14.282141070535260496,14.332166083041514071,14.382191095547767645,14.43221610805402122,14.482241120560274794,14.532266133066528369,14.582291145572781943,14.632316158079035517,14.682341170585289092,14.732366183091542666,14.782391195597796241,14.832416208104049815,14.88244122061030339,14.932466233116556964,14.982491245622810538,15.032516258129064113,15.082541270635317687,15.132566283141571262,15.182591295647824836,15.232616308154078411,15.282641320660331985,15.332666333166585559,15.382691345672839134,15.432716358179078497,15.482741370685332072,15.532766383191585646,15.582791395697839221,15.632816408204092795,15.68284142071034637,15.732866433216599944,15.782891445722853518,15.832916458229107093,15.882941470735360667,15.932966483241614242,15.982991495747867816,16.033016508254121391,16.083041520760374965,16.133066533266628539,16.183091545772882114,16.233116558279135688,16.283141570785389263,16.333166583291642837,16.383191595797896412,16.433216608304149986,16.48324162081040356,16.533266633316657135,16.583291645822910709,16.633316658329164284,16.683341670835417858,16.733366683341671433,16.783391695847925007,16.833416708354178581,16.883441720860432156,16.93346673336668573,16.983491745872939305,17.033516758379178668,17.083541770885432243,17.133566783391685817,17.183591795897939392,17.233616808404192966,17.28364182091044654,17.333666833416700115,17.383691845922953689,17.433716858429207264,17.483741870935460838,17.533766883441714413,17.583791895947967987,17.633816908454221561,17.683841920960475136,17.73386693346672871,17.783891945972982285,17.833916958479235859,17.883941970985489434,17.933966983491743008,17.983991995997996582,18.034017008504250157,18.084042021010503731,18.134067033516757306,18.18409204602301088,18.234117058529264455,18.284142071035518029,18.334167083541771603,18.384192096048025178,18.434217108554278752,18.484242121060532327,18.534267133566785901,18.584292146073025265,18.634317158579278839,18.684342171085532414,18.734367183591785988,18.784392196098039562,18.834417208604293137,18.884442221110546711,18.934467233616800286,18.98449224612305386,19.034517258629307435,19.084542271135561009,19.134567283641814583,19.184592296148068158,19.234617308654321732,19.284642321160575307,19.334667333666828881,19.384692346173082456,19.43471735867933603,19.484742371185589604,19.534767383691843179,19.584792396198096753,19.634817408704350328,19.684842421210603902,19.734867433716857477,19.784892446223111051,19.834917458729364625,19.8849424712356182,19.934967483741871774,19.984992496248125349,20.035017508754378923,20.085042521260632498,20.135067533766886072,20.185092546273125436,20.23511755877937901,20.285142571285632584,20.335167583791886159,20.385192596298139733,20.435217608804393308,20.485242621310646882,20.535267633816900457,20.585292646323154031,20.635317658829407605,20.68534267133566118,20.735367683841914754,20.785392696348168329,20.835417708854421903,20.885442721360675478,20.935467733866929052,20.985492746373182626,21.035517758879436201,21.085542771385689775,21.13556778389194335,21.185592796398196924,21.235617808904450499,21.285642821410704073,21.335667833916957647,21.385692846423211222,21.435717858929464796,21.485742871435718371,21.535767883941971945,21.58579289644822552,21.635817908954479094,21.685842921460732668,21.735867933966972032,21.785892946473225606,21.835917958979479181,21.885942971485732755,21.93596798399198633,21.985992996498239904,22.036018009004493479,22.086043021510747053,22.136068034017000628,22.186093046523254202,22.236118059029507776,22.286143071535761351,22.336168084042014925,22.3861930965482685,22.436218109054522074,22.486243121560775649,22.536268134067029223,22.586293146573282797,22.636318159079536372,22.686343171585789946,22.736368184092043521,22.786393196598297095,22.83641820910455067,22.886443221610804244,22.936468234117057818,22.986493246623311393,23.036518259129564967,23.086543271635818542,23.136568284142072116,23.186593296648325691,23.236618309154579265,23.286643321660832839,23.336668334167072203,23.386693346673325777,23.436718359179579352,23.486743371685832926,23.536768384192086501,23.586793396698340075,23.63681840920459365,23.686843421710847224,23.736868434217100798,23.786893446723354373,23.836918459229607947,23.886943471735861522,23.936968484242115096,23.986993496748368671,24.037018509254622245,24.087043521760875819,24.137068534267129394,24.187093546773382968,24.237118559279636543,24.287143571785890117,24.337168584292143692,24.387193596798397266,24.43721860930465084,24.487243621810904415,24.537268634317157989,24.587293646823411564,24.637318659329665138,24.687343671835918713,24.737368684342172287,24.787393696848425861,24.837418709354679436,24.887443721860918799,24.937468734367172374,24.987493746873425948,25.037518759379679523,25.087543771885933097,25.137568784392186672,25.187593796898440246,25.23761880940469382,25.287643821910947395,25.337668834417200969,25.387693846923454544,25.437718859429708118,25.487743871935961693,25.537768884442215267,25.587793896948468841,25.637818909454722416,25.68784392196097599,25.737868934467229565,25.787893946973483139,25.837918959479736714,25.887943971985990288,25.937968984492243862,25.987993996998497437,26.038019009504751011,26.088044022011004586,26.13806903451725816,26.188094047023511735,26.238119059529765309,26.288144072036018883,26.338169084542272458,26.388194097048526032,26.438219109554779607,26.48824412206101897,26.538269134567272545,26.588294147073526119,26.638319159579779694,26.688344172086033268,26.738369184592286842,26.788394197098540417,26.838419209604793991,26.888444222111047566,26.93846923461730114,26.988494247123554715,27.038519259629808289,27.088544272136061863,27.138569284642315438,27.188594297148569012,27.238619309654822587,27.288644322161076161,27.338669334667329736,27.38869434717358331,27.438719359679836884,27.488744372186090459,27.538769384692344033,27.588794397198597608,27.638819409704851182,27.688844422211104757,27.738869434717358331,27.788894447223611905,27.83891945972986548,27.888944472236119054,27.938969484742372629,27.988994497248626203,28.039019509754865567,28.089044522261119141,28.139069534767372716,28.18909454727362629,28.239119559779879864,28.289144572286133439,28.339169584792387013,28.389194597298640588,28.439219609804894162,28.489244622311147737,28.539269634817401311,28.589294647323654885,28.63931965982990846,28.689344672336162034,28.739369684842415609,28.789394697348669183,28.839419709854922758,28.889444722361176332,28.939469734867429906,28.989494747373683481,29.039519759879937055,29.08954477238619063,29.139569784892444204,29.189594797398697779,29.239619809904951353,29.289644822411204927,29.339669834917458502,29.389694847423712076,29.439719859929965651,29.489744872436219225,29.5397698849424728,29.589794897448726374,29.639819909954965738,29.689844922461219312,29.739869934967472886,29.789894947473726461,29.839919959979980035,29.88994497248623361,29.939969984992487184,29.989994997498740759,30.040020010004994333,30.090045022511247907,30.140070035017501482,30.190095047523755056,30.240120060030008631,30.290145072536262205,30.34017008504251578,30.390195097548769354,30.440220110055022928,30.490245122561276503,30.540270135067530077,30.590295147573783652,30.640320160080037226,30.690345172586290801,30.740370185092544375,30.790395197598797949,30.840420210105051524,30.890445222611305098,30.940470235117558673,30.990495247623812247,31.040520260130065822,31.090545272636319396,31.14057028514257297,31.190595297648812334,31.240620310155065908,31.290645322661319483,31.340670335167573057,31.390695347673826632,31.440720360180080206,31.490745372686333781,31.540770385192587355,31.590795397698840929,31.640820410205094504,31.690845422711348078,31.740870435217601653,31.790895447723855227,31.840920460230108802,31.890945472736362376,31.94097048524261595,31.990995497748869525,32.041020510255123099,32.091045522761376674,32.141070535267630248,32.191095547773883823,32.241120560280137397,32.291145572786390971,32.341170585292644546,32.39119559779889812,32.441220610305151695,32.491245622811405269,32.541270635317658844,32.591295647823912418,32.641320660330165992,32.691345672836419567,32.741370685342673141,32.791395697848912505,32.841420710355166079,32.891445722861419654,32.941470735367673228,32.991495747873926803,33.041520760380180377,33.091545772886433951,33.141570785392687526,33.1915957978989411,33.241620810405194675,33.291645822911448249,33.341670835417701824,33.391695847923955398,33.441720860430208973,33.491745872936462547,33.541770885442716121,33.591795897948969696,33.64182091045522327,33.691845922961476845,33.741870935467730419,33.791895947973983994,33.841920960480237568,33.891945972986491142,33.941970985492744717,33.991995997998998291,34.042021010505251866,34.09204602301150544,34.142071035517759015,34.192096048024012589,34.242121060530266163,34.292146073036519738,34.342171085542759101,34.392196098049012676,34.44222111055526625,34.492246123061519825,34.542271135567773399,34.592296148074026974,34.642321160580280548,34.692346173086534122,34.742371185592787697,34.792396198099041271,34.842421210605294846,34.89244622311154842,34.942471235617801995,34.992496248124055569,35.042521260630309143,35.092546273136562718,35.142571285642816292,35.192596298149069867,35.242621310655323441,35.292646323161577016,35.34267133566783059,35.392696348174084164,35.442721360680337739,35.492746373186591313,35.542771385692844888,35.592796398199098462,35.642821410705352037,35.692846423211605611,35.742871435717859185,35.79289644822411276,35.842921460730366334,35.892946473236619909,35.942971485742859272,35.992996498249112847,36.043021510755366421,36.093046523261619996,36.14307153576787357,36.193096548274127144,36.243121560780380719,36.293146573286634293,36.343171585792887868,36.393196598299141442,36.443221610805395017,36.493246623311648591,36.543271635817902165,36.59329664832415574,36.643321660830409314,36.693346673336662889,36.743371685842916463,36.793396698349170038,36.843421710855423612,36.893446723361677186,36.943471735867930761,36.993496748374184335,37.04352176088043791,37.093546773386691484,37.143571785892945059,37.193596798399198633,37.243621810905452207,37.293646823411705782,37.343671835917959356,37.393696848424212931,37.443721860930466505,37.493746873436705869,37.543771885942959443,37.593796898449213018,37.643821910955466592,37.693846923461720166,37.743871935967973741,37.793896948474227315,37.84392196098048089,37.893946973486734464,37.943971985992988039,37.993996998499241613,38.044022011005495187,38.094047023511748762,38.144072036018002336,38.194097048524255911,38.244122061030509485,38.29414707353676306,38.344172086043016634,38.394197098549270208,38.444222111055523783,38.494247123561777357,38.544272136068030932,38.594297148574284506,38.644322161080538081,38.694347173586791655,38.744372186093045229,38.794397198599298804,38.844422211105552378,38.894447223611805953,38.944472236118059527,38.994497248624313102,39.044522261130566676,39.09454727363680604,39.144572286143059614,39.194597298649313188,39.244622311155566763,39.294647323661820337,39.344672336168073912,39.394697348674327486,39.444722361180581061,39.494747373686834635,39.544772386193088209,39.594797398699341784,39.644822411205595358,39.694847423711848933,39.744872436218102507,39.794897448724356082,39.844922461230609656,39.89494747373686323,39.944972486243116805,39.994997498749370379,40.045022511255623954,40.095047523761877528,40.145072536268131103,40.195097548774384677,40.245122561280638251,40.295147573786891826,40.3451725862931454,40.395197598799398975,40.445222611305652549,40.495247623811906124,40.545272636318159698,40.595297648824413272,40.645322661330652636,40.69534767383690621,40.745372686343159785,40.795397698849413359,40.845422711355666934,40.895447723861920508,40.945472736368174083,40.995497748874427657,41.045522761380681231,41.095547773886934806,41.14557278639318838,41.195597798899441955,41.245622811405695529,41.295647823911949104,41.345672836418202678,41.395697848924456252,41.445722861430709827,41.495747873936963401,41.545772886443216976,41.59579789894947055,41.645822911455724125,41.695847923961977699,41.745872936468231273,41.795897948974484848,41.845922961480738422,41.895947973986991997,41.945972986493245571,41.995997998999499146,42.04602301150575272,42.096048024012006294,42.146073036518259869,42.196098049024513443,42.246123061530752807,42.296148074037006381,42.346173086543259956,42.39619809904951353,42.446223111555767105,42.496248124062020679,42.546273136568274253,42.596298149074527828,42.646323161580781402,42.696348174087034977,42.746373186593288551,42.796398199099542126,42.8464232116057957,42.896448224112049274,42.946473236618302849,42.996498249124556423,43.046523261630809998,43.096548274137063572,43.146573286643317147,43.196598299149570721,43.246623311655824295,43.29664832416207787,43.346673336668331444,43.396698349174585019,43.446723361680838593,43.496748374187092168,43.546773386693345742,43.596798399199599316,43.646823411705852891,43.696848424212106465,43.74687343671836004,43.796898449224599403,43.846923461730852978,43.896948474237106552,43.946973486743360127,43.996998499249613701,44.047023511755867275,44.09704852426212085,44.147073536768374424,44.197098549274627999,44.247123561780881573,44.297148574287135148,44.347173586793388722,44.397198599299642297,44.447223611805895871,44.497248624312149445,44.54727363681840302,44.597298649324656594,44.647323661830910169,44.697348674337163743,44.747373686843417318,44.797398699349670892,44.847423711855924466,44.897448724362178041,44.947473736868431615,44.99749874937468519,45.047523761880938764,45.097548774387192339,45.147573786893445913,45.197598799399699487,45.247623811905953062,45.297648824412206636,45.347673836918460211,45.397698849424699574,45.447723861930953149,45.497748874437206723,45.547773886943460298,45.597798899449713872,45.647823911955967446,45.697848924462221021,45.747873936968474595,45.79789894947472817,45.847923961980981744,45.897948974487235319,45.947973986993488893,45.997998999499742467,46.048024012005996042,46.098049024512249616,46.148074037018503191,46.198099049524756765,46.24812406203101034,46.298149074537263914,46.348174087043517488,46.398199099549771063,46.448224112056024637,46.498249124562278212,46.548274137068531786,46.598299149574785361,46.648324162081038935,46.698349174587292509,46.748374187093546084,46.798399199599799658,46.848424212106053233,46.898449224612306807,46.948474237118546171,46.998499249624799745,47.04852426213105332,47.098549274637306894,47.148574287143560468,47.198599299649814043,47.248624312156067617,47.298649324662321192,47.348674337168574766,47.398699349674828341,47.448724362181081915,47.498749374687335489,47.548774387193589064,47.598799399699842638,47.648824412206096213,47.698849424712349787,47.748874437218603362,47.798899449724856936,47.84892446223111051,47.898949474737364085,47.948974487243617659,47.998999499749871234,48.049024512256124808,48.099049524762378383,48.149074537268631957,48.199099549774885531,48.249124562281139106,48.29914957478739268,48.349174587293646255,48.399199599799899829,48.449224612306153404,48.499249624812406978,48.549274637318646342,48.599299649824899916,48.64932466233115349,48.699349674837407065,48.749374687343660639,48.799399699849914214,48.849424712356167788,48.899449724862421363,48.949474737368674937,48.999499749874928511,49.049524762381182086,49.09954977488743566,49.149574787393689235,49.199599799899942809,49.249624812406196384,49.299649824912449958,49.349674837418703532,49.399699849924957107,49.449724862431210681,49.499749874937464256,49.54977488744371783,49.599799899949971405,49.649824912456224979,49.699849924962478553,49.749874937468732128,49.799899949974985702,49.849924962481239277,49.899949974987492851,49.949974987493746426,50],  \"expected\": [0,-8.4435256904056324489e+22,-1.5169293874378656501e+23,-2.0398171100248815541e+23,-2.4332238506650531738e+23,-2.715524722543475441e+23,-2.9033269225977392451e+23,-3.0115496361427486324e+23,-3.053514710843218188e+23,-3.0410446560678816147e+23,-2.9845650676336445673e+23,-2.8932090626669887776e+23,-2.7749217386397526131e+23,-2.6365630485584242383e+23,-2.4840078148111725652e+23,-2.3222418912792628796e+23,-2.1554537308814330718e+23,-1.9871208274894345418e+23,-1.8200906807120557507e+23,-1.6566560827857310004e+23,-1.4986246519187500643e+23,-1.3473826388842958868e+23,-1.2039531161963537734e+23,-1.0690487243631820276e+23,-9.4311919980984911528e+22,-8.2639394619760939368e+22,-7.1891993694470913655e+22,-6.2059525347637280637e+22,-5.3119857262818685354e+22,-4.504149190483673455e+22,-3.7785799558664812495e+22,-3.130893975677967532e+22,-2.5563500643895700619e+22,-2.0499884534168293474e+22,-1.606746643695294795e+22,-1.221555072074684511e+22,-8.8941493996920766464e+21,-6.0546038035967712952e+21,-3.6500696643052796641e+21,-1.63588394560176128e+21,30169917662717149184,1.3876833059888326246e+21,2.4735166886288954491e+21,3.3217547890878825103e+21,3.9637119023191246766e+21,4.4279778848320420577e+21,4.7404965061194374185e+21,4.92466892274269474e+21,5.0014760166461422961e+21,4.9896142294796048794e+21,4.9056403284212790067e+21,4.7641212603834753352e+21,4.5777858951801518162e+21,4.3576760291661221724e+21,4.1132945241204032799e+21,3.8527488968968990884e+21,3.5828890587308307251e+21,3.3094382340952875336e+21,3.0371163725124856709e+21,2.7697556074080753418e+21,2.510407518380086526e+21,2.2614421213136648929e+21,2.0246386485100114084e+21,1.8012682920371083018e+21,1.5921691711940547052e+21,1.3978138523752435548e+21,1.2183697995186039685e+21,1.0537531682545814733e+21,9.036763791192761303e+20,7.6768991679801327616e+20,6.4521880514258901402e+20,5.3559420326550051226e+20,4.3808055777289142272e+20,3.5189873139125446246e+20,2.7624550994480067379e+20,2.1030986877399842816e+20,1.5328635704245570765e+20,1.0438593462567936e+20,62844571972399718400,27929898940007542784,-1053835491535299712,-24762254225036419072,-43808578037656256512,-58762392481181474816,-70149282122893058048,-78451177831850147840,-84107280796444393472,-87515443622344425472,-89033904203855790080,-88983282104582569984,-87648759959083417600,-85282383962549780480,-82105427906184773632,-78310774504635170816,-74065276015805431808,-69512063442713296896,-64772780002995290112,-59949720125437280256,-55127860054588751872,-50376770282287570944,-45752403544366776320,-41298755084467478528,-37049394353857265664,-33028869341918564352,-29253986368206471168,-25734969461510320128,-22476504448208576512,-19478673611571339264,-16737787302177636352,-14247119210262575104,-11997552183339145216,-9978141513367865344,-8176602550645591040,-6579729347254573056,-5173750809597915136,-3944630563140021760,-2878316416712487936,-1960944970425675264,-1179006550367245824,-519475283307703936,30091247405889048,481478691949372800,845765257314959616,1133290299010701952,1353639149539762944,1515641468251729408,1627380694962911488,1696212468199134976,1728790127538607872,1731095658214311168,1708474655072807424,1665674082625523968,1606881788911996928,1535766894015982848,1455520320240603648,1368894861142156032,1278244301878177536,1185561204704668928,1092513062025368064,1000476596210231424,910570051491582208,823683379613927680,740506268512735232,661554003036275456,587191179458228736,517653322057191616,453066471106069760,393464827906257728,338806554648783552,288987835462442240,243855310539181696,203216998180703456,166851820409134240,134517846806184480,105959368822345520,80912913225009472,59112298888924592,40292835997700272,24194761113830296,10565995651622970,-835690808030432,-10241037073161490,-17868097588683682,-23921437189449520,-28591655979108912,-32055192532166612,-34474358925057720,-35997566115694136,-36759702892166648,-36882635990048288,-36475803030292064,-35636873657563516,-34452457667769596,-32998842012771992,-31342741371699736,-29542049495847860,-27646580783283944,-25698793536395908,-23734488117705632,-21783474763590456,-19870207159306868,-18014379038829412,-16231482065987638,-14533324095048114,-12928507614427632,-11422868760947266,-10019877767451960,-8721002086308681,-7526033726942352,-6433382567945719,-5440337563282928,-4543297866699229,-3737975956809168.5,-3019574864815374.5,-2382941593996771.5,-1822698780866190,-1333356587426849.75,-909406736823494.875,-545400514877885.8125,-236012460980373.4375,23908633444455.332031,239299909630947.5,414854410568137.25,554999546022368.3125,663882873599278.75,745364121663712,803012481823686.25,840108296032301.125,859648355637218.5,864354116541601.125,856682215802730.625,838836750372242.25,812782848260877.125,780261126258230.75,742802686587390.625,701744357712120.5,658243932167153.5,613295197008164,567742590556551.5,522295352838995.6875,477541066794207.0625,433958513243021.6875,391929785094349.5625,351751625583901.4375,313645971801607.625,277769698632503.53125,244223569776899.71875,213060411976933.25,184292536191051.78125,157898435442919.40625,133828793628147.65625,112011842876848.76562,92358109312428.65625,74764588372447.765625,59118391406004.421875,45299905160891.109375,33185505135700.210938,22649862698312.554688,13567884451977.833984,5816320642027.234375,-724922491333.40393066,-6171733536356.7324219,-10634979148149.707031,-14219891103485.710938,-17025630744975.544922,-19145006537928.140625,-20664322567609.722656,-21663337842947.582031,-22215318229426.273438,-22387164697056.652344,-22239603330272.078125,-21827424199634.765625,-21199757736956.257812,-20400378684531.777344,-19468029006053.742188,-18436752353211.578125,-17336233780955.648438,-16192139399765.070312,-15026451549577.867188,-13857795882404.65625,-12701757454507.166016,-11571183560064.716797,-10476471592276.828125,-9425840700679.0917969,-8425586430850.7041016,-7480317890290.6591797,-6593177287515.9345703,-5766041945611.8115234,-4999709101547.0722656,-4294063973269.7680664,-3648231712355.9462891,-3060713964929.7495117,-2529510841544.1928711,-2052229151244.3813477,-1626177789371.3408203,-1248451185760.6362305,-916001722527.43835449,-625702021019.46655273,-374397977933.90020752,-158953402955.07357788,23712923710.728908539,176596994349.296875,302585380099.46234131,404436408205.34143066,484766063868.64422607,546038017162.61334229,590557222112.14697266,620466580998.44165039,637746211737.69311523,644214899432.96520996,641533354610.50720215,631208940003.87695312,614601564882.15588379,592930480728.24768066,567281744502.74963379,538616145761.04742432,507777421542.58404541,475500608265.33618164,442420402902.23303223,409079426573.32348633,375936302456.20111084,343373476705.59716797,311704725996.49530029,281182308483.39782715,252003726523.48388672,224318079565.62823486,198231994281.58300781,173815126428.3828125,151105235197.01687622,130112836031.46051025,110825442199.71873474,93211408863.496047974,77223396119.184326172,62801469557.191818237,49875858390.296890259,38369392209.541412354,28199638006.896247864,19280759320.286148071,11525119265.531764984,4844648872.8007354736,-847998411.55438268185,-5638485922.1395196915,-9610007392.2388153076,-12842656670.714670181,-15412936245.323080063,-17393388355.494915009,-18852333579.61271286,-19853702892.048381805,-20456950288.640602112,-20717034163.346214294,-20684456673.263374329,-20405351345.872451782,-19921610154.790168762,-19271042213.760356903,-18487557109.592655182,-17601366711.088829041,-16639200051.478883743,-15624526586.225389481,-14577783776.668838501,-13516605543.943935394,-12456048678.430469513,-11408814779.672870636,-10385465742.46622467,-9394631199.1576519012,-8443206678.8085069656,-7536541553.4669752121,-6678616113.2294607162,-5872207347.8500156403,-5119043216.1922597885,-4419945358.5542917252,-3774960353.5007052422,-3183479742.873872757,-2644349148.5815248489,-2155966884.8955698013,-1716372532.5404009819,-1323325987.8510792255,-974377533.65474939346,-666929500.04262781143,-398290094.48474812508,-165719983.2876560688,33527798.434948924929,202174042.08539715409,342885116.02396786213,458249741.0182145834,550760283.81987214088,622798087.6064786911,676622385.34457504749,714362370.55808126926,738012029.00524628162,749427363.94093024731,750325676.59665465355,742286591.93858551979,726754547.4092425108,705042489.01715028286,678336544.64927053452,647701468.72222220898,614086675.17263305187,578332697.25710046291,541177932.65633797646,503265550.94687199593,465150457.62603348494,427306224.57692813873,390131911.17716419697,353958713.23643451929,319056388.64979535341,285639419.13819956779,253872876.78225645423,223877972.30959454179,195737269.34192606807,169499555.11744081974,145184363.64930832386,122786151.93263664842,102278133.73927509785,83615778.808895617723,66739987.920017406344,51579956.466733552516,38055740.833631306887,26080543.106885623187,15562730.534419117495,6407606.6994316354394,-1481048.356942538172,-8199651.796640727669,-13843688.33400551416,-18506760.520132157952,-22279802.690936665982,-25250442.902650345117,-27502497.862245798111,-29115586.61143893376,-30164849.522461216897,-30720759.995203830302,-30849017.094202101231,-30610508.217907618731,-30061331.741248913109,-29252870.406770106405,-28231907.052334100008,-27040775.048526849598,-25717536.571776367724,-24296182.556160360575,-22806848.845257036388,-21276043.703359864652,-19726882.441846683621,-18179325.471012488008,-16650416.6003365051,-15154518.881508458406,-13703545.719524623826,-12307185.369020335376,-10973117.287245461717,-9707219.1333946157247,-8513763.4882266372442,-7395603.6199903907254,-6354347.8446297934279,-5390522.222115165554,-4503721.4985940614715,-3692748.3478990294971,-2955741.0877954224125,-2290290.1481288578361,-1693543.6516161456238,-1162302.5352041255683,-693105.69240336143412,-282305.65639938187087,73864.628430612254306,379233.38129959005164,637639.33196371200029,852888.26451170106884,1028716.1879502256634,1168758.5743190466892,1276525.1203919355758,1355379.5080476338044,1408523.660371720558,1438986.014798801858,1449613.3605228401721,1443065.8144626291469,1421814.537804919295,1388141.8231575139798,1344143.2102829965297,1291731.3159571336582,1232641.0904579975177,1168436.2393396934494,1100516.5743137586396,1030126.0811226534424,958361.51514502428472,886181.35705091827549,814414.981080407626,743771.9074260344496,674851.02775069884956,608149.70907738164533,544072.69616670126561,482940.74608613428427,424998.94101263943594,370424.63644777960144,319335.01201616722392,271794.20092355273664,227819.98203201498836,187390.02543109125691,150447.68840982404072,116907.36393103640876,86659.388140013921657,59574.517168471407786,35507.986582738594734,14303.169332005496472,-4205.1499649520646926,-20187.865043362980941,-33818.981881007057382,-45273.375282251683529,-54724.846588799569872,-62344.460831604665145,-68299.141765090156696,-72750.503558851851267,-75853.898430449567968,-77757.660155479228706,-78602.524160629633116,-78521.205767182618729,-77638.119084368547192,-76069.220034489699174,-73921.958007408014964,-71295.321675631028484,-68279.965539564727806,-64958.40480413883779,-61405.267203217314091,-57687.591378828808956,-53865.162381532580184,-49990.875780705217039,-46111.122754874602833,-42266.189369169209385,-38490.664037108799675,-34813.847905826849455,-31260.163596517711994,-27849.558375255277497,-24597.898423649017786,-21517.351424869193579,-18616.755179547399166,-15901.97041942789474,-13376.216396128356791,-11040.388189932345995,-8893.3550112466109567,-6932.2390574377750454,-5152.674742486003197,-3549.0483385769925917,-2114.7182597313567385,-842.21638014638256209,276.56908360610918862,1250.2284848114275064,2087.6827207191104208,2798.0514647917366347,3390.5367998557253486,3874.3213571951059748,4258.4800429106890078,4551.9044214748300874,4763.2388257713537314,4900.827271566185118,4972.6702709514438538,4986.3906626007274099,4949.2076055254046878,4867.9179163917642654,4748.883967405607109,4598.0274014460846956,4420.8279627757574417,4222.3267845937716629,4007.1335183386067911,3779.4367334645362462,3543.0170599598877743,3301.2625887571148269,3057.1860870764799074,2813.4436263707029866,2572.3542596743645845,2335.9204226268743696,2105.8487680933194497,1883.5711780497135805,1670.2657281575459365,1466.8774101849155613,1274.1384451217547849,1092.5880454885532345,922.59150897768608957,764.35854723224883855,617.96077331431092716,483.34828930723784879,360.36533160943355369,248.76494589070344432,148.22267648439344612,58.349266268291621884,-21.29762706095118574,-91.202683898323641642,-151.88312312735689602,-203.87982217446366917,-247.7493238156364157,-284.05669271877815163,-313.36918147050255357,-336.25066339534555482,-353.25678774724423192,-364.93081176178247915,-371.80006353038817224,-374.37298962632576149,-373.1367418130181477,-368.55525793838194204,-361.06779320920577447,-351.08785939612641869,-339.00253109563607268,-325.17207992800427974,-309.92989944017102744,-293.58268547548368588,-276.41083883611582905,-258.66905917110324253,-240.58710114823355752,-222.37066608988405392,-204.2024043522296779,-186.24300578782683147,-168.63235763953389323,-151.49075115747393738,-134.9201201007507791,-119.00529607431036538,-103.81526735268475647,-89.404429452150779412,-75.813817227949840571,-63.07230969200926296,-51.197800068381710048,-40.198324828697288069,-30.073146579429419489,-20.813786708590431118,-12.405004643987384227,-4.8257214314443812597,1.9501138872865890761,7.9527159270718366102,13.215712859659015876,17.775454239116204036,21.67037595891305557,24.940421140559575264,27.626515407257716817,29.770094705248702383,31.412683596187683577,32.595521751695741841,33.359236232127585708,33.743557021570318,33.787073216328025183,33.527027220988138367,32.999144291127258555,32.237494771496571389,31.274386410027865679,30.140284178306284701,28.863755095551212548,27.471435633110289132,25.988019367674322524,24.436262651725805028,22.837006177176334631,21.209210420962143928,19.570003077931858115,17.934736705241462573,16.317054922375913151,14.728965630706547074,13.180919835165550325,11.681894767307612781,10.23948012297654131,8.859966338380690587,7.5484339350615421438,6.3088430665911268136,5.1441224975073369663,4.0562573377288835275,3.0463749432916800153,2.1148284765935354557,1.2612776963512708495,0.48476661915941343661,-0.21620223908534944024,-0.84359727248639915231,-1.3997910197510068375,-1.8874973476456562427,-2.3097126606525373305,-2.6696611726253824948,-2.9707442391368417134,-3.2164937163389613062,-3.4105292833008311604,-3.5565196397146481289,-3.6581474693407458609,-3.7190780413592801068,-3.7429313066774505536,-3.7332573339747625596,-3.6935149206273263367,-3.627053206413039188,-3.537096112847077034,-3.4267294279224045361,-3.2988903547335572952,-3.1563593427516694057,-3.0017540222131708916,-2.8375250650113339468,-2.6659537994767519287,-2.4891514113477937187,-2.3090595689230837273,-2.1274523167233136967,-1.9459390888472345438,-1.7659687004744257788,-1.5888341835427879367,-1.4156783404182906594,-1.2474998972939186359,-1.0851601470278509076,-0.92938997909081533244,-0.78079720217721815256,-0.63987407279445340791,-0.50700495073087070708,-0.38247400967798678151,-0.26647293841245611734,-0.15910857480064055647,-0.060410421450772570917,0.029662001913028607919,0.11121200835765379655,0.18439882934430187889,0.24943096419790974916,0.30655981671079679529,0.35607363759077026444,0.39829178724704239478,0.43355932952630132915,0.46224196345886608972,0.48472129684277576178,0.50139046257096309134,0.51265007598271317146,0.51890452918251528391,0.52055861620425070146,0.51801448109262382413,0.5116688794126618145,0.5019107423675437385,0.48911903159038200295,0.47366087176227711364,0.45588994748249417333,0.43614515026266270636,0.41474946112143906696,0.39200905400541791179,0.3682126051429240321,0.34363079343696589785,0.31851597710950357856,0.29310203200991702399,0.26760433728454380287,0.24221989446104422172,0.21712756642100811133,0.19248842320726272659,0.16844618212996564921,0.14512773018957328408,0.12264371741756878442,0.10108921034040228848,0.080544395392012177459,0.061075322729686173928,0.042734681541559044193,0.025562598566901805625,0.0095874521783197528407,-0.0051733050059986204414,-0.018712321404800436736,-0.031031525484092034595,-0.042141313754097423083,-0.052059752457302800599,-0.060811797119265681433,-0.068428533624174933681,-0.074946443991701541809,-0.080406699571361331391,-0.084854483936044070025,-0.088338347347934678688,-0.090909594287933312429,-0.09262170518385122453,-0.093529793142920425453,-0.093690096190161026302,-0.093159505235407724655,-0.091995127737711290816,-0.090253886805678876226,-0.08799215526531668774,-0.08526542404221067184,-0.08212800404149937783,-0.078632760566078832576,-0.074830879189817595121,-0.070771661897210208503,-0.066502352212800458497,-0.06206798797179616245,-0.057511280326508332217,-0.052872517540517999235,-0.048189492092757295338,-0.043497449595958352642,-0.038829058027161189592,-0.034214395771226216447,-0.029680956990561991465,-0.025253672854725572883,-0.020954947191217109664,-0.016804705152889540948,-0.012820453537102769262,-0.0090173514363171038133,-0.0054082899485241630114,-0.0020039797280795449211,0.0011869547875027371131,0.0041578755820000845231,0.0069040267444584278028,0.0094224266208760270452,0.01171175736095718227,0.013772252726198981609,0.015605584964583361571,0.01721475149660904938,0.018603962097655746266,0.019778527202974155452,0.020744747904229126484,0.021509808150685299361,0.022081669614017536418,0.022468969623513784101,0.022680922528253370796,0.022727224794803411317,0.022617964103169838075,0.022363532660237626926,0.021974544908786659142,0.021461759771407021985,0.020836007532275855475,0.020108121425796012666,0.019288873969524614888,0.01838891804960322493,0.017418732740014750138,0.016388573812377533329,0.015308428870595395047,0.014187977024447925509,0.013036552998058203653,0.011863115553040882652,0.010676220091931309941,0.0094839952951431463063,0.008294123634110750487,0.0071138255943549236204,0.0059498474348759957525,0.0048084523044358805366,0.0036954145308491512592,0.0026160168962701614744,0.0015750507095538797755,0.00057681848598018100292,-0.00037486095510299633805,-0.0012766451629485416758,-0.0021256586845305900854,-0.0029194818333735414288,-0.0036561377777503721934,-0.0043340781236763104012,-0.0049521671633236119536,-0.0055096649541866308045,-0.0060062093885997359238,-0.0064417974071169182768,-0.0068167655028606452886,-0.0071317696572949533171,-0.0073877648410266604298,-0.0075859842062389049033,-0.0077279180902577208553,-0.00781529294259115416,-0.0078500502805965415715,-0.0078343257717662963258,-0.0077704285335062775811,-0.0076608207342454539765,-0.0075080975727884599266,-0.0073149677060288156166,-0.0070842341885022433456,-0.0068187759807964241215,-0.0065215300775630169819,-0.0061954742998147739955,-0.0058436107903479736492,-0.0054689502455188320276,-0.0050744969112309600001,-0.0046632343658656793747,-0.0042381121080154243383,-0.003802032962261423215,-0.0033578413118796261554,-0.0029083121632571501229,-0.0024561410429596005137,-0.0020039347248038477667,-0.0015542027809590133573,-0.001109349948016911426,-0.00067166929613744937033,-0.00024333618677932573253,0.00017359699783420925816,0.00057720537249724768788,0.00096569533494494268818,0.0013374076425110947679,0.0016908198036042713236,0.0020245478093808039373,0.0023373472321005697022,0.0026281137175748927985,0.0028958828998705875638,0.0031398297670245322276,0.0033592675069599171704,0.0035536458630869311587,0.0037225490292259184703,0.0038656931135187789193,0.0039829232009031571501,0.0040742100435222873209,0.0041396464081395814572,0.0041794431092292052415,0.0041939247559300042723,0.0041835252404878392821,0.004148782995178083334,0.0040903360440030407663,0.0040089168747050717839,0.0039053471558320729251,0.0037805323227439388556,0.0036354560555627475626,0.003471174671151501176,0.0032888114502617402102,0.0030895509200244012163,0.0028746331109758263209,0.0026453478068163664705,0.0024030288040969116463,0.002149048198022863055,0.0018848107095593077953,0.0016117480680188564762,0.0013313134623179944185,0.0010449760731014031637,0.00075421569696061403331,0.00046051747301258501516,0.00016536672116253142728,-0.00012975609954953766273,-0.00042338030502258710555,-0.00071404976597465904652,-0.0010003275478743195535,-0.001280800406003371238,-0.0015540831315407736563,-0.0018188227453421509493,-0.0020737025368476624289,-0.0023174459462830237361,-0.0025488202890239812157,-0.0027666403216735119437,-0.0029697716500536545242,-0.0031571339799406224723,-0.0033277042119722408803,-0.0034805193827336499551,-0.0036146794545777729754,-0.00372934995726569192,-0.0038237644850173044264,-0.0038972270530465771832,-0.0039491143181192367786,-0.0039788776681151999046,-0.0039860451860047945924,-0.0039702234940583959119,-0.0039310994845050805518,-0.0038684419432390834345,-0.003782103073544968927,-0.0036720199271756130861,-0.0035382157504731917737,-0.003380801253575267673,-0.0031999758110967638398,-0.0029960286030286621337,-0.002769339704946405939,-0.0025203811369794173157,-0.0022497178813603844506,-0.0019580088787525345116,-0.0016460080139484997101,-0.0013145651019494768164,-0.00096462688587231127432,-0.00059723805859941399374,-0.00021354232058690193773,0.00018521651321463648864,0.00059769334378903754643,0.0010224405416613866447,0.0014579066088199227769,0.0019024347333321406112,0.0023542612202059193249,0.0028115137811310681078,0.0032722096647313527427,0.0037342536078454049639,0.0041954355871263058694,0.0046534283488893941894,0.0051057846936301415353,0.0055499344899610277698,0.005983181390858302931,0.0064026992230439483053,0.0068055280180298284229,0.0071885696507914542686,0.0075485830491858483052,0.0078821789340451173939,0.0081858140463236615109,0.0084557848137037632669,0.0086882204046219210086,0.0088790751126999814535,0.009024120008986693392,0.009118933793153316536,0.0091588927677510555136,0.0091391598517229707954,0.0090546725404472248877,0.0089001297095324428954,0.0086699771482278975565,0.0083583916954640558733,0.0079592638369856711505,0.0074661786055274844548,0.006872394607217596936,0.0061708209760320056891,0.0053539920337626663999,0.004414039405132483794,0.0033426613058304428111,0.0021310886847070538083,0.00077004785937895042953,-0.00075028076386613644713,-0.0024403083507884022058,-0.0043110882100326894037,-0.0063743718784487254231,-0.0086426714122917139976,-0.011129328677120764804,-0.013848592547712479384,-0.016815705068139098766,-0.020046997785273090037,-0.023559999661180781871,-0.027373558197037961559,-0.03150797567053260223,-0.035985162709136188364,-0.040828811804044531919,-0.046064593827710512142,-0.051720381168682182105,-0.057826501762249030159,-0.064416029101009325553,-0.071525114289843885751,-0.079193367408077613989,-0.087464296913012787305,-0.096385817634482326421,-0.10601084016137123089,-0.11639795722762780184,-0.12761224622359268466,-0.1397262113948701534,-0.15282089491960523797,-0.16698719324280289489,-0.18232742428851109184,-0.19895720314083872871,-0.21700769940819292225,-0.23662837004392131557,-0.257990288686146374,-0.28129022914084750306,-0.3067557101025545907,-0.33465127585751419659,-0.36528638128441709432,-0.39902538048273700211,-0.4363003042426836231,-0.47762737910214314585,-0.52362863180671648244,-0.57506050441321643341,-0.63285228589044917324,-0.69815852731023331224,-0.77243175986840906244,-0.85752532385886348631,-0.9558419332537980706,-1.0705536083280950965,-1.2059364555461604684,-1.3678969325332455131,-1.5648308410724174333,-1.809089382179574157,-2.1196196209836282165,-2.52704605918855707,-3.0843058384346284662,-3.8914957964380083588,-5.1634365247328819493,-7.4600413843085586763,-12.844345986005066607,-40.2204904892451367,39.775148669832383064,13.821098816649525887,8.5504250083327537624,6.2850067894726731055,5.0257660485451980392,4.224860910613768894,3.6710649821398808612,3.2656558540572646621,2.9563140607763664924,2.7127261658319850035,2.5161156766947061492,2.354231345292592259,2.2187391611997311358,2.1037726008766544084,2.0050823602295615444,1.9195150106410645563,1.8446811197025967388,1.7787370940497055916,1.7202377375628066236,1.6680341529422895164,1.6212015111042346049,1.5789869685115847098,1.5407714669795407048,1.506041282509734458,1.4743665388535736049,1.445384774668542649,1.4187882298604213016,1.3943139047544488296,1.3717357112893773241,1.3508582199911705057,1.3315116366026864547,1.3135477351998805506,1.2968365418462119987,1.2812636120038982668,1.2667277812652655289,1.2531392961004732545,1.2404182517624371407,1.2284932800289256605,1.2173004413693699899,1.2067822853190708354,1.1968870499957511289,1.1875679772949649937,1.1787827247164881506,1.1704928582760678601,1.1626634137510025724,1.1552625157495435282,1.1482610459019224614,1.1416323529360836719,1.1353519985947184701,1.1293975343266724476,1.1237483044883385119,1.1183852724529310674,1.1132908665743248555,1.1084488434086228192,1.1038441659777242787,1.0994628951784923832,1.0952920927095763926,1.0913197341144016406,1.0875346307304534221,1.0839263594976211724,1.080485199716817446,1.0772020759682747748,1.0740685065001038812,1.071076556484519493,1.0682187956138746721,1.0654882595730958972,1.0628784149808396808,1.0603831274400037366,1.0579966323801750505,1.055713508411129764,1.0535286529383582899,1.0514372598194434705,1.0494347988645162939,1.047516997005419892,1.0456798209770390429,1.0439194613708306925,1.0422323179352157574,1.0406149860104347837,1.0390642439969015598,1.0375770417662593115,1.0361504899333446872,1.03478184991530342,1.0334685247112329609,1.0322080503421153796,1.0309980878964977169,1.0298364161324728983,1.0287209245910868827,1.0276496071803919996,1.0266205561930481505,1.025631956723689564,1.0246820814552501933,1.0237692857861340201,1.0228920032725421496,1.0220487413624677053,1.0212380773998430694,1.0204586548791343414,1.0197091799323012573,1.018988418031523846,1.0182951908924391393,1.017628373563856492,1.0169868916910358436,1.0163697189406235566,1.0157758745762706099,1.0152044211748023628,1.0146544624735802653,1.0141251413404070991,1.013615637857969709,1.0131251675154098191,1.012652979500156869,1.0121983550836550769,1.0117606060950772306,1.011339073477538264,1.010933125921711806,1.0105421585721081623,1.0101655918016012592,1.0098028700500998323,1.0094534607235325918,1.009116853149583104,1.0087925575868414985,1.0084801042842674867,1.0081790425880625683,1.0078889400932389275,1.0076093818373448308,1.0073399695339777526,1.0070803208438587895,1.0068300686813871359,1.0065888605547250734,1.0063563579375813806,1.00613223567097676,1.0059161813933805707,1.0057078949977020788,1.0055070881137171401,1.0053134836145891651,1.0051268151462287026,1.0049468266783045944,1.0047732720757960312,1.0046059146900303549,1.004444526968220508,1.0042888900805664321,1.0041387935640413431,1.003994034982032435,1.0038544195990506402,1.0037197600697698174,1.0035898761416939262,1.0034645943707927174,1.0033437478494786621,1.0032271759463338157,1.003114724057027507,1.0030062433658923915,1.0029015906176586004,1.0028006278988699229,1.0027032224285292727,1.0026092463575499991,1.0025185765766011503,1.0024310945319694355,1.0023466860490652941,1.0022652411632333447,1.0021866539575319255,1.0021108224071726411,1.0020376482303219312,1.0019670367449811099,1.0018988967316762029,1.001833140301704228,1.0017696827706885632,1.0017084425372164702,1.0016493409663342895,1.0015923022776942464,1.0015372534381490333,1.0014841240586065396,1.0014328462949633192,1.0013833547529407131,1.0013355863966615367,1.0012894804608090116,1.0012449783662178415,1.0012020236387526584,1.0011605618313397237,1.0011205404490188808,1.0010819088768918572,1.0010446183108492324,1.0010086216909590551,1.0009738736374107493,1.0009403303889110592,1.0009079497434292261,1.00087669100119947,1.0008465149098895175,1.0008173836118468003,1.0007892605933392804,1.000762110635713853,1.0007358997683919455,1.0007105952236334812,1.0006861653929970402,1.0006625797854287185,1.0006398089869179557,1.0006178246216577143,1.0005965993146492821,1.000576106655697739,1.0005563211647405808,1.00053721825846198,1.0005187742181393951,1.0005009661586770076,1.0004837719987789146,1.00046717043222122,1.0004511409001755062,1.0004356635645499374,1.0004207192823044714,1.0004062895807050992,1.0003923566334818052,1.0003789032378536117,1.0003659127923922867,1.0003533692756876317,1.0003412572257903701,1.0003295617203962209,1.0003182683577507284,1.0003073632382430969,1.0002968329466634945,1.0002866645351022878,1.0002768455064643405,1.000267363798575726,1.0002582077688635387,1.0002493661795830437,1.0002408281835779569,1.0002325833105476516,1.0002246214538070834,1.0002169328575210017,1.0002095081043931302,1.0002023381037932204,1.0001954140803108739,1.0001887275627130425,1.0001822703732969888,1.000176034617620946,1.0001700126745995956,1.0001641971869501546,1.0001585810519790787,1.0001531574126933943,1.0001479196492266688,1.0001428613705705128,1.0001379764065951861,1.0001332588003544188,1.0001287028006597968,1.0001243028549196001,1.0001200536022272214,1.0001159498666949421,1.0001119866510206347,1.0001081591302829477,1.000104462645952097,1.0001008927001131532,1.0000974449498898355,1.0000941152020663694,1.0000908994078963055,1.0000877936580929717,1.0000847941779971162,1.0000818973229110842,1.0000790995735993061,1.0000763975319426624,1.0000737879167480582,1.0000712675597012158,1.0000688334014631309,1.0000664824879017534,1.0000642119664548968,1.0000620190826201572,1.0000599011765667345,1.0000578556798662699,1.0000558801123367036,1.0000539720789956011,1.0000521292671196161,1.000050349443407427,1.0000486304512394842,1.0000469702080339029,1.0000453667026933946,1.0000438179931425697,1.0000423222039482862,1.0000408775240243742,1.0000394822044145204,1.0000381345561542012,1.0000368329482032248,1.0000355758054537691,1.0000343616068039232,1.0000331888833007277,1.0000320562163451665,1.0000309622359606632,1.0000299056191215286,1.0000288850881380309,1.0000278994090978646,1.000026947390362464,1.0000260278811134995,1.0000251397699506661,1.000024281983537433,1.0000234534852940893,1.0000226532741349761,1.0000218803832505721,1.0000211338789297688,1.0000204128594245567,1.0000197164538529027,1.000019043821138931,1.0000183941489912964,1.0000177666529153075,1.0000171605752588011,1.0000165751842930995,1.0000160097733223896,1.000015463659825965,1.000014936184630443,1.000014426711107518,1.0000139346244034666,1.000013459330690635,1.0000130002564486809,1.0000125568477680194,1.0000121285696779161,1.000011714905498339,1.0000113153562126822,1.0000109294398631388,1.0000105566909665011,1.00001019665995039,1.0000098489126079127,1.0000095130295720836,1.000009188605807342,1.000008875250119722,1.0000085725846821205,1.0000082802445779961,1.00000799787735839,1.0000077251426164882,1.0000074617115746189,1.0000072072666870149,1.0000069615012552315,1.000006724119057111,1.000006494833989068,1.0000062733697190342,1.0000060594593529473,1.0000058528451121198,1.0000056532780208229,1.0000054605176060818,1.0000052743316065751,1.0000050944956917487,1.0000049207931911432,1.0000047530148321595,1.0000045909584878157,1.000004434428931166,1.0000042832376014879,1.0000041372023742436,1.0000039961473432548,1.000003859902606429,1.0000037283040619229,1.0000036011932089686,1.0000034784169573587,1.0000033598274418178,1.0000032452818445883,1.0000031346422213474,1.0000030277753364505,1.0000029245525012822,1.0000028248494183813,1.000002728546032893,1.000002635526386463,1.0000025456784780165,1.0000024588941278658,1.0000023750688480373,1.0000022941017161493,1.0000022158952528439,1.0000021403553049915,1.0000020673909322255,1.0000019969142963649,1.0000019288405563866,1.000001863087765841,1.000001799576774042,1.000001738231130366,1.0000016789769923253,1.0000016217430365284,1.0000015664603727483,1.0000015130624606563,1.0000014614850301076,1.0000014116660029817,1.0000013635454185756,1.0000013170653616612,1.0000012721698927631,1.0000012288049797693,1.000001186918434426,1.0000011464598475008,1.0000011073805299411,1.0000010696334526994,1.0000010331731912228,1.0000009979558697193,1.0000009639391091998,1.0000009310819757413,1.0000008993449318595,1.0000008686897876586,1.0000008390796562008,1.0000008104789086527,1.0000007828531309872,1.0000007561690822389,1.0000007303946560899,1.0000007054988402366,1.0000006814516799736,1.0000006582242426667,1.000000635788581782,1.000000614117703579,1.000000593185535358,1.0000005729668930421,1.0000005534374514227,1.0000005345737146278,1.0000005163529879226,1.0000004987533508416,1.0000004817536296553,1.0000004653333729454,1.0000004494728269577,1.0000004341529107332,1.0000004193551943477,1.0000004050618760409,1.0000003912557615671,1.0000003779202419896,1.0000003650392750298,1.0000003525973659713,1.0000003405795474531,1.0000003289713630394,1.000000317758848789,1.0000003069285168245,1.0000002964673395667,1.0000002863627330818,1.0000002766025428702,1.0000002671750281014,1.0000002580688489573,1.0000002492730521997,1.0000002407770571811,1.0000002325706449646,1.0000002246439443354,1.0000002169874209201,1.0000002095918651968,1.0000002024483816143,1.0000001955483781568,1.000000188883555019,1.0000001824458961686,1.000000176227658466,1.000000170221362561,1.0000001644197840101,1.0000001588159455057,1.0000001534031062178,1.0000001481747562426,1.0000001431246072769,1.0000001382465850686,1.0000001335348225329,1.0000001289836528695,1.0000001245876020128,1.0000001203413830808,1.0000001162398890475,1.0000001122781865259,1.000000108451511327,1.0000001047552609101,1.0000001011849897203,1.000000097736403637,1.000000094405355533,1.0000000911878390575,1.0000000880799844172,1.0000000850780539352,1.0000000821784373883,1.000000079377647566,1.0000000766723158296,1.0000000740591887816,1.0000000715351236025,1.0000000690970847206,1.0000000667421402589,1.0000000644674580386,1.0000000622703022479,1.0000000601480305562,1.0000000580980907827,1.0000000561180175662,1.0000000542054294783,1.000000052358026803,1.000000050573587318,1.0000000488499654061,1.000000047185087837,1.0000000455769528784,1.0000000440236263,1.0000000425232402623,1.000000041073990209,1.000000039674133312,1.000000038321986251,1.0000000370159227714,1.0000000357543723517,1.0000000345358177611,1.0000000333587937273,1.000000032221884716,1.0000000311237235984,1.0000000300629894312,1.0000000290384070123,1.0000000280487439941,1.0000000270928102175,1.0000000261694561576,1.0000000252775715914,1.0000000244160838214,1.0000000235839567875,1.0000000227801897346,1.0000000220038165466,1.0000000212539030819,1.0000000205295476174,1.0000000198298795162,1.0000000191540567851,1.0000000185012671849,1.000000017870725566,1.000000017261673646,1.0000000166733788998,1.0000000161051341152,1.000000015556255617,1.0000000150260839327,1.000000014513980906,1.0000000140193310294,1.0000000135415394453,1.0000000130800315024,1.000000012634252311,1.0000000122036658556,1.0000000117877543282,1.0000000113860174622,1.0000000109979723106,1.0000000106231521357,1.000000010261106187,1.0000000099113990348,1.000000009573610571,1.0000000092473340096,1.0000000089321774421,1.0000000086277618383,1.0000000083337208245,1.0000000080497011279,1.0000000077753610217,1.0000000075103707697,1.0000000072544115159,1.0000000070071757285,1.0000000067683660898,1.000000006537695052,1.0000000063148857254,1.0000000060996696583,1.0000000058917886125,1.000000005690992122,1.0000000054970392682,1.0000000053096962382,1.0000000051287381009,1.0000000049539470304,1.0000000047851131946,1.0000000046220332006,1.0000000044645112052,1.0000000043123578042,1.0000000041653895888,1.0000000040234304777,1.0000000038863092744,1.0000000037538614439,1.0000000036259273362,1.0000000035023532963,1.0000000033829909984,1.0000000032676965578,1.0000000031563314185,1.0000000030487616876,1.0000000029448579131,1.000000002844495306,1.000000002747553296,1.0000000026539148656,1.0000000025634678824,1.0000000024761033224,1.0000000023917163805,1.0000000023102051383,1.0000000022314721182,1.0000000021554220631,1.0000000020819641566,1.0000000020110095811,1.0000000019424732933,1.0000000018762726928,1.0000000018123280654,1.0000000017505630279,1.0000000016909027512,1.0000000016332759589,1.0000000015776129292,1.0000000015238470485,1.00000000147191348,1.000000001421749829,1.0000000013732959214,1.0000000013264931376,1.0000000012812855221,1.0000000012376186742,1.0000000011954399692,1.000000001154698781,1.0000000011153460377,1.0000000010773344439,1.0000000010406182582,1.000000001005153516,1.0000000009708973625,1.0000000009378084975,1.0000000009058476191,1.0000000008749758695,1.0000000008451561673,1.0000000008163527632,1.0000000007885312403,1.0000000007616576259,1.0000000007356999454,1.0000000007106268907,1.0000000006864082636,1.0000000006630151983,1.0000000006404192732,1.0000000006185936208,1.0000000005975115958,1.0000000005771481071,1.0000000005574785078,1.0000000005384794832,1.0000000005201277187,1.0000000005024016758,1.0000000004852793722,1.0000000004687408239,1.0000000004527660469,1.0000000004373355011,1.0000000004224309791,1.000000000408034273,1.0000000003941282856,1.0000000003806961413,1.000000000367721853,1.0000000003551896555,1.0000000003430846718,1.000000000331392247,1.0000000003200981702,1.0000000003091891188,1.00000000029865177,1.0000000002884736894,1.0000000002786422204,1.0000000002691460388,1.0000000002599733762,1.0000000002511133523,1.0000000002425553092,1.0000000002342890326,1.0000000002263043086,1.0000000002185918113,1.0000000002111419928,1.0000000002039461933,1.000000000196995531,1.0000000001902820124,1.0000000001837969776,1.0000000001775330993,1.0000000001714826059,1.0000000001656383919,1.0000000001599935739,1.0000000001545408246,1.0000000001492739266,1.0000000001441866626,1.0000000001392728155,1.000000000134526168,1.000000000129941613,1.0000000001255131554,1.0000000001212354661,1.0000000001171036601,1.0000000001131128524,1.000000000109257936,1.000000000105534248,1.0000000001019375695,1.0000000000984636817,1.0000000000951079215,1.0000000000918665144,1.0000000000887356855,1.00000000008571166,1.0000000000827904412,1.0000000000799689204,1.0000000000772435449,1.0000000000746109841,1.0000000000720683513,1.0000000000696120939,1.0000000000672397693,1.000000000064948269,1.0000000000627347063,1.0000000000605966388,1.000000000058531624,1.0000000000565367753,1.0000000000546098722,1.0000000000527489163,1.0000000000509512432,1.0000000000492146324,1.0000000000475375295,1.00000000004591727,1.0000000000443525217,1.000000000042840842,1.0000000000413808987,1.0000000000399706934,1.0000000000386084498,1.0000000000372926134,1.0000000000360216301,1.0000000000347939455,1.0000000000336082273,1.0000000000324629212,1.000000000031356473,1.0000000000302877723,1.000000000029255709,1.0000000000282585066,1.0000000000272954992,1.0000000000263653543,1.0000000000254667398,1.0000000000245987675,1.0000000000237605491,1.0000000000229507524,1.0000000000221684893,1.0000000000214130935,1.0000000000206832329,1.0000000000199784633,1.0000000000192974525,1.0000000000186397564,1.0000000000180044868,1.0000000000173909775,1.0000000000167983405,1.0000000000162256875,1.0000000000156727964,1.0000000000151385571,1.0000000000146227475,1.0000000000141244794,1.0000000000136430867,1.0000000000131781253,1.000000000012728929,1.0000000000122950539,1.0000000000118760557,1.0000000000114712684,1.0000000000110804699,1.000000000010702772,1.0000000000103379527,1.00000000000998579,1.0000000000096453956,1.0000000000093167696,1.0000000000089992458,1.0000000000086923801,1.0000000000083961726,1.0000000000081101792,1.0000000000078337337,1.000000000007566614,1.0000000000073088202,1.0000000000070596862,1.0000000000068192119,1.0000000000065867312,1.0000000000063622441,1.0000000000061455285,1.0000000000059359184,1.0000000000057336358,1.0000000000055382365,1.0000000000053494986,1.0000000000051672,1.0000000000049911186,1.0000000000048210325,1.0000000000046567195,1.0000000000044979576,1.0000000000043447468,1.000000000004196643,1.0000000000040536463,1.0000000000039155346,1.0000000000037820858,1.0000000000036530778,1.0000000000035287329,1.0000000000034083847,1.0000000000032922554,1.0000000000031801228,1.000000000003071543,1.00000000000296696,1.0000000000028659297,1.0000000000027682301,1.0000000000026738611,1.0000000000025828228,1.0000000000024946711,1.0000000000024096281,1.0000000000023274715,1.0000000000022482016,1.0000000000021715962,1.0000000000020976554,1.000000000002026157,1.0000000000019571011,1.0000000000018902657,1.0000000000018258728,1.0000000000017637003,1.0000000000017035262,1.0000000000016455726,1.0000000000015893953,1.0000000000015352164,1.0000000000014830359,1.0000000000014324097,1.0000000000013835599,1.0000000000013364865,1.0000000000012909673,1.0000000000012470025,1.0000000000012043699,1.0000000000011632917,1.0000000000011237677,1.000000000001085354,1.0000000000010484946,1.0000000000010127454,1.0000000000009781065,1.0000000000009447998,1.0000000000009126033,1.0000000000008815171,1.0000000000008515411,1.0000000000008224532,1.0000000000007944756,1.0000000000007673862,1.0000000000007411849,1.0000000000007158718,1.0000000000006916689,1.0000000000006679102,1.0000000000006452616,1.0000000000006232792,1.0000000000006019629,1.0000000000005815348,1.0000000000005617729,1.000000000000542455,1.0000000000005240253,1.0000000000005062617,1.0000000000004889422,1.0000000000004722889,1.0000000000004560796,1.0000000000004405365,1.0000000000004256595,1.0000000000004110046,1.0000000000003970158,1.000000000000383471,1.0000000000003705924,1.0000000000003579359,1.0000000000003457234,1.0000000000003339551,1.0000000000003224088,1.0000000000003115286,1.0000000000003008704,1.0000000000002906564,1.0000000000002806644,1.0000000000002711165,1.0000000000002620126,1.0000000000002529088,1.0000000000002444711,1.0000000000002360334,1.0000000000002280398,1.0000000000002202682,1.0000000000002127187,1.0000000000002053913,1.0000000000001985079,1.0000000000001916245,1.0000000000001851852,1.000000000000178968,1.0000000000001727507,1.0000000000001669775,1.0000000000001612044,1.0000000000001556533,1.0000000000001503242,1.0000000000001452172,1.0000000000001403322,1.0000000000001354472,1.0000000000001310063,1.0000000000001265654,1.0000000000001221245,1.0000000000001179057,1.0000000000001139089,1.0000000000001101341,1.0000000000001063594,1.0000000000001028067,1.0000000000000992539,1.0000000000000959233,1.0000000000000925926,1.000000000000089484,1.0000000000000863754,1.0000000000000834888,1.0000000000000806022,1.0000000000000777156,1.0000000000000752731,1.0000000000000726086,1.0000000000000701661,1.0000000000000677236,1.0000000000000655032,1.0000000000000632827,1.0000000000000610623,1.0000000000000590639,1.0000000000000570655,1.0000000000000550671,1.0000000000000530687,1.0000000000000512923,1.0000000000000495159,1.0000000000000479616,1.0000000000000461853,1.000000000000044631,1.0000000000000430767,1.0000000000000417444,1.0000000000000401901,1.0000000000000388578,1.0000000000000375255,1.0000000000000361933,1.000000000000035083,1.0000000000000337508,1.0000000000000326406,1.0000000000000315303,1.0000000000000304201,1.0000000000000295319,1.0000000000000284217,1.0000000000000275335,1.0000000000000266454,1.0000000000000257572,1.000000000000024869,1.0000000000000239808,1.0000000000000230926,1.0000000000000224265,1.0000000000000215383,1.0000000000000208722,1.0000000000000202061,1.0000000000000195399,1.0000000000000188738,1.0000000000000182077,1.0000000000000175415,1.0000000000000168754,1.0000000000000164313,1.0000000000000157652,1.0000000000000153211,1.0000000000000146549,1.0000000000000142109,1.0000000000000137668,1.0000000000000133227,1.0000000000000128786,1.0000000000000124345,1.0000000000000119904,1.0000000000000115463,1.0000000000000111022,1.0000000000000108802,1.0000000000000104361,1.000000000000009992,1.00000000000000977,1.0000000000000093259,1.0000000000000091038,1.0000000000000086597,1.0000000000000084377,1.0000000000000082157,1.0000000000000079936,1.0000000000000075495,1.0000000000000073275,1.0000000000000071054,1.0000000000000068834,1.0000000000000066613,1.0000000000000064393,1.0000000000000062172,1.0000000000000059952,1.0000000000000057732,1.0000000000000055511,1.0000000000000053291,1.000000000000005107,1.000000000000005107,1.000000000000004885,1.0000000000000046629,1.0000000000000044409,1.0000000000000044409,1.0000000000000042188,1.0000000000000039968,1.0000000000000039968,1.0000000000000037748,1.0000000000000037748,1.0000000000000035527,1.0000000000000033307,1.0000000000000033307,1.0000000000000031086,1.0000000000000031086,1.0000000000000028866,1.0000000000000028866,1.0000000000000028866,1.0000000000000026645,1.0000000000000026645,1.0000000000000024425,1.0000000000000024425,1.0000000000000024425,1.0000000000000022204,1.0000000000000022204,1.0000000000000022204,1.0000000000000019984,1.0000000000000019984,1.0000000000000019984,1.0000000000000017764,1.0000000000000017764,1.0000000000000017764,1.0000000000000015543,1.0000000000000015543,1.0000000000000015543,1.0000000000000015543,1.0000000000000013323,1.0000000000000013323,1.0000000000000013323,1.0000000000000013323,1.0000000000000013323,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000011102,1.0000000000000008882,1.0000000000000008882,1.0000000000000008882,1.0000000000000008882]}\n","status":"0"}

},{}],83:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var linspace = require( '@stdlib/math/utils/linspace' );
var pow = require( '@stdlib/math/base/special/pow' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var zeta = require( './../lib' );


// FIXTURES //

// FIXME: fix once fixture output is updated
var data = require( './fixtures/boost/output.json' ).program_message;
data = JSON.parse( data );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof zeta, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var v = zeta( NaN );
	t.equal( isnan( v ), true, 'returns NaN when provided a NaN' );
	t.end();
});

tape( 'the function evaluates the Riemann zeta function', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;
	var i;

	s = data.x;
	expected = data.expected;
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[i] );
		delta = abs( v - expected[i] );
		tol = 34.0 * EPS * abs( expected[i] );
		t.ok( delta <= tol, 'within tolerance. s: '+s[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. Tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function evaluates the Riemann zeta function for very small values', function test( t ) {
	var v = zeta( 1.0e-10 );

	// Checked against Julia:
	t.equal( v, -0.5000000000918938 );

	t.end();
});

tape( 'if evaluated at a pole (`s = 1`), the function returns `NaN`', function test( t ) {
	var v = zeta( 1.0 );
	t.equal( isnan( v ), true, 'returns NaN when provided 1' );
	t.end();
});

tape( 'the function returns `1` for all input values greater or equal than `56`', function test( t ) {
	var s;
	var v;
	var i;

	s = linspace( 56.0, 100.0, 200 );
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[ i ] );
		t.equal( v, 1.0, 'returns 1 when provided '+s[i] );
	}
	v = zeta( PINF );
	t.equal( v, 1.0, 'returns 1 when provided +infinity' );

	t.end();
});

tape( 'the function returns `0` for all even negative integers', function test( t ) {
	var s;
	var v;
	var i;

	s = linspace( -2.0, -200.0, 100 );
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[ i ] );
		t.equal( v, 0.0, 'returns 0 when provided '+s[i] );
	}
	s = -pow( 2.0, 32 ); // |s| is greater than MAX_INT32
	v = zeta( s );
	t.equal( v, 0.0, 'returns 0 when provided '+s );
	t.end();
});

tape( 'the function handles negative values which are larger in magnitude than the maximum factorial', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	// Wolfram: zeta( -170.7 )
	expected = 4.236821692180446371109004075383326908604561232133963e171;

	s = -170.7;
	v = zeta( s );
	delta = abs( v - expected );
	tol = 53.0 * EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );

	// Wolfram: zeta( -171.1 )
	expected = 1.762429756041972327545919944532107376580768035147432e172;

	s = -171.1;
	v = zeta( s );
	delta = abs( v - expected );

	// Note: FF seems to return less precise results (https://travis-ci.org/math-io/riemann-zeta/jobs/115748766). For Node/Chrome, 286.0*eps.
	tol = 355.0 * EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );

	t.end();
});

tape( 'the function handles negative integer values which are larger in magnitude than twice the index of the maximum Bernoulli number', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	// Only value satisfies this criterion without overflowing: -259. (|-257|+1)/2| = 128, which is the index of the largest Bernoulli number. -261 overflows.

	// Wolfram: zeta( -259 )
	expected = 8.760156344622921514904073013488223219302793651253880e306;

	s = -259;
	v = zeta( s );
	delta = abs( v - expected );
	tol = 352.0 * EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );

	t.end();
});

tape( 'the function returns `+-infinity` for large negative non-integer values', function test( t ) {
	var s;
	var v;
	var i;

	s = linspace( -259.78778778778684, -10000.123, 103 );
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[ i ] );
		t.ok( v === PINF || v === NINF, 'returns '+v+' when provided '+s[i] );
	}
	t.end();
});

tape( 'if provided `0` (special value), the function returns `-0.5`', function test( t ) {
	var v = zeta( 0.0 );
	t.equal( v, -0.5, 'returns -0.5' );
	t.end();
});

tape( 'if provided `-1` (special value), the function returns `-1/12`', function test( t ) {
	var v = zeta( -1.0 );
	t.equal( v, -1.0/12.0, 'returns -1/12' );
	t.end();
});

tape( 'if provided `-13` (special value), the function returns `-1/12`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	expected = -1.0/12.0;

	s = -13.0;
	v = zeta( s );
	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );
	t.end();
});

tape( 'if provided `4` (special value), the function returns `~1.0823`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	// https://oeis.org/A0013662
	expected = 1.082323233711138191516003696541167;

	s = 4.0;
	v = zeta( s );
	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );
	t.end();
});

tape( 'if provided `3` (special value), the function returns `~1.202`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	// https://oeis.org/A002117
	expected = 1.2020569031595942853997;

	s = 3.0;
	v = zeta( s );
	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );
	t.end();
});

tape( 'if provided `2` (special value), the function returns `~1.645`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	// https://oeis.org/A013661
	expected = 1.6449340668482264364724151666460251892189499012067984377355582293700074704032;

	s = 2.0;
	v = zeta( s );
	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );
	t.end();
});

tape( 'if provided `3/2` (special value), the function returns `~2.612`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	// https://oeis.org/A078434
	expected = 2.61237534868548834334856756792407163057080065240006340757332824881492776768827286099624386812631195238297;

	s = 1.5;
	v = zeta( s );
	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );
	t.end();
});

tape( 'if provided `1/2` (special value), the function returns `~-1.46`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;

	// https://oeis.org/A059750
	expected = -1.4603545088095868128894991525152980124672293310125814905428860878;

	s = 0.5;
	v = zeta( s );
	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. s: '+s+'. v: '+v+'. E: '+expected+' Δ: '+delta+'. tol: '+tol );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/riemann-zeta/test/test.js")
},{"./../lib":78,"./fixtures/boost/output.json":82,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/abs":34,"@stdlib/math/base/special/pow":62,"@stdlib/math/constants/float64-eps":124,"@stdlib/math/constants/float64-ninf":134,"@stdlib/math/constants/float64-pinf":136,"@stdlib/math/utils/linspace":141,"tape":208}],84:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( '@stdlib/math/base/special/abs' );
var linspace = require( '@stdlib/math/utils/linspace' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var zeta = require( './../lib/polynomial_series.js' );


// FIXTURES //

var data = require( './../lib/odd_positive_integers.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof zeta, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the Riemann zeta function for odd positive integers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var s;
	var v;
	var i;

	s = linspace( 3.0, 103.0, 51 );
	expected = data;
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[i] );
		delta = abs( v - expected[i] );
		tol = EPS * abs( expected[i] );
		t.ok( delta <= tol, 'within tolerance. s: '+s[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. Tol: '+tol+'.' );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/riemann-zeta/test/test.polynomial_series.js")
},{"./../lib/odd_positive_integers.json":79,"./../lib/polynomial_series.js":80,"@stdlib/math/base/special/abs":34,"@stdlib/math/constants/float64-eps":124,"@stdlib/math/utils/linspace":141,"tape":208}],85:[function(require,module,exports){
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

},{"./round.js":86}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{"./sin.js":88}],88:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":54,"@stdlib/math/base/special/kernel-sin":56,"@stdlib/math/base/special/rempio2":72,"@stdlib/math/base/utils/float64-get-high-word":107}],89:[function(require,module,exports){
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

},{"./sinpi.js":90}],90:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":23,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/abs":34,"@stdlib/math/base/special/copysign":38,"@stdlib/math/base/special/cos":40,"@stdlib/math/base/special/sin":87,"@stdlib/math/constants/float64-pi":135}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./trunc.js":93}],93:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":36,"@stdlib/math/base/special/floor":47}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./evalpoly.js":94}],96:[function(require,module,exports){
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

},{"./evalpoly.js":94,"./factory.js":95,"@stdlib/utils/define-read-only-property":144}],97:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":34}],98:[function(require,module,exports){
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

},{"./evalrational.js":97}],99:[function(require,module,exports){
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

},{"./evalrational.js":97,"./factory.js":98,"@stdlib/utils/define-read-only-property":144}],100:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":107,"@stdlib/math/constants/float64-exponent-bias":126,"@stdlib/math/constants/float64-high-word-exponent-mask":128}],101:[function(require,module,exports){
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

},{"./exponent.js":100}],102:[function(require,module,exports){
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

},{"./indices.js":104}],103:[function(require,module,exports){
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

},{"./from_words.js":102}],104:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":9}],105:[function(require,module,exports){
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

},{"./high.js":106}],106:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":9}],107:[function(require,module,exports){
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

},{"./get_high_word.js":105}],108:[function(require,module,exports){
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

},{"./low.js":110}],109:[function(require,module,exports){
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

},{"./get_low_word.js":108}],110:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":9}],111:[function(require,module,exports){
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

},{"./normalize.js":112}],112:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":23,"@stdlib/math/base/assert/is-nan":27,"@stdlib/math/base/special/abs":34,"@stdlib/math/constants/float64-smallest-normal":137}],113:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":9,"dup":106}],114:[function(require,module,exports){
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

},{"./set_high_word.js":115}],115:[function(require,module,exports){
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

},{"./high.js":113}],116:[function(require,module,exports){
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

},{"./set_low_word.js":118}],117:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":9,"dup":110}],118:[function(require,module,exports){
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

},{"./low.js":117}],119:[function(require,module,exports){
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

},{"./to_words.js":121}],120:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":9,"dup":104}],121:[function(require,module,exports){
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

},{"./indices.js":120}],122:[function(require,module,exports){
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

},{"./uint32_to_int32.js":123}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π` times `2`.
*
* @module @stdlib/math/constants/float64-two-pi
* @type {number}
*
* @example
* var TWO_PI = require( '@stdlib/math/constants/float64-two-pi' );
* // returns 6.283185307179586
*/


// MAIN //

/**
* The mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 6.283185307179586
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var TWO_PI = 6.28318530717958647692528676655900576839433879875021164194988918461563281257241799725606965068423413596429617303; // eslint-disable-line max-len


// EXPORTS //

module.exports = TWO_PI;

},{}],141:[function(require,module,exports){
'use strict';

/**
* Generate a linearly spaced numeric array.
*
* @module @stdlib/math/utils/linspace
*
* @example
* var linspace = require( '@stdlib/math/utils/linspace' );
*
* var arr = linspace( 0, 100, 6 );
* // returns [ 0, 20, 40, 60, 80, 100 ]
*/

// MODULES //

var linspace = require( './linspace.js' );


// EXPORTS //

module.exports = linspace;

},{"./linspace.js":142}],142:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Generates a linearly spaced numeric array.
*
* @param {number} x1 - first array value
* @param {number} x2 - last array value
* @param {NonNegativeInteger} [len=100] - length of output array
* @throws {TypeError} first argument must be numeric
* @throws {TypeError} second argument must be numeric
* @throws {TypeError} third argument must be a nonnegative integer
* @returns {Array} linearly spaced numeric array
*
* @example
* var arr = linspace( 0, 100, 6 );
* // returns [ 0, 20, 40, 60, 80, 100 ]
*/
function linspace( x1, x2, len ) {
	var arr;
	var end;
	var tmp;
	var d;
	var i;
	if ( !isNumber( x1 ) || isnan( x1 ) ) {
		throw new TypeError( 'invalid input argument. Start must be numeric. Value: `' + x1 + '`.' );
	}
	if ( !isNumber( x2 ) || isnan( x2 ) ) {
		throw new TypeError( 'invalid input argument. Stop must be numeric. Value: `' + x2 + '`.' );
	}
	if ( arguments.length < 3 ) {
		len = 100;
	} else {
		if ( !isNonNegativeInteger( len ) ) {
			throw new TypeError( 'invalid input argument. Length must be a nonnegative integer. Value: `' + len + '`.' );
		}
		if ( len === 0 ) {
			return [];
		}
	}
	// Calculate the increment:
	end = len - 1;
	d = ( x2-x1 ) / end;

	// Build the output array...
	arr = new Array( len );
	tmp = x1;
	arr[ 0 ] = tmp;
	for ( i = 1; i < end; i++ ) {
		tmp += d;
		arr[ i ] = tmp;
	}
	arr[ end ] = x2;
	return arr;
} // end FUNCTION linspace()


// EXPORTS //

module.exports = linspace;

},{"@stdlib/assert/is-nonnegative-integer":12,"@stdlib/assert/is-number":16,"@stdlib/math/base/assert/is-nan":27}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"./define_read_only_property.js":143}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{"./detect_symbol_support.js":145}],147:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":146}],148:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":147}],149:[function(require,module,exports){
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

},{"./native_class.js":150,"./polyfill.js":151,"@stdlib/utils/detect-tostringtag-support":148}],150:[function(require,module,exports){
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

},{"./tostring.js":152}],151:[function(require,module,exports){
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

},{"./tostring.js":152,"./tostringtag.js":153,"@stdlib/assert/has-own-property":2}],152:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],153:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){

},{}],156:[function(require,module,exports){
arguments[4][155][0].apply(exports,arguments)
},{"dup":155}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{"base64-js":154,"ieee754":177}],159:[function(require,module,exports){
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
},{"../../is-buffer/index.js":179}],160:[function(require,module,exports){
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

},{"./lib/is_arguments.js":161,"./lib/keys.js":162}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],163:[function(require,module,exports){
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

},{"foreach":173,"object-keys":182}],164:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],165:[function(require,module,exports){
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

},{"./helpers/isFinite":166,"./helpers/isNaN":167,"./helpers/mod":168,"./helpers/sign":169,"es-to-primitive/es5":170,"has":176,"is-callable":180}],166:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],167:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],168:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],169:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],170:[function(require,module,exports){
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

},{"./helpers/isPrimitive":171,"is-callable":180}],171:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){

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


},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":174}],176:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":175}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{"./isArguments":183}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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
},{"_process":157}],185:[function(require,module,exports){
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
},{"_process":157}],186:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":187}],187:[function(require,module,exports){
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
},{"./_stream_readable":189,"./_stream_writable":191,"core-util-is":159,"inherits":178,"process-nextick-args":185}],188:[function(require,module,exports){
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
},{"./_stream_transform":190,"core-util-is":159,"inherits":178}],189:[function(require,module,exports){
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
},{"./_stream_duplex":187,"./internal/streams/BufferList":192,"./internal/streams/destroy":193,"./internal/streams/stream":194,"_process":157,"core-util-is":159,"events":172,"inherits":178,"isarray":195,"process-nextick-args":185,"safe-buffer":202,"string_decoder/":196,"util":155}],190:[function(require,module,exports){
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
},{"./_stream_duplex":187,"core-util-is":159,"inherits":178}],191:[function(require,module,exports){
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
},{"./_stream_duplex":187,"./internal/streams/destroy":193,"./internal/streams/stream":194,"_process":157,"core-util-is":159,"inherits":178,"process-nextick-args":185,"safe-buffer":202,"util-deprecate":214}],192:[function(require,module,exports){
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
},{"safe-buffer":202}],193:[function(require,module,exports){
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
},{"process-nextick-args":185}],194:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":172}],195:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],196:[function(require,module,exports){
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
},{"safe-buffer":202}],197:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":198}],198:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":187,"./lib/_stream_passthrough.js":188,"./lib/_stream_readable.js":189,"./lib/_stream_transform.js":190,"./lib/_stream_writable.js":191}],199:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":198}],200:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":191}],201:[function(require,module,exports){
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
},{"_process":157,"through":213}],202:[function(require,module,exports){
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

},{"buffer":158}],203:[function(require,module,exports){
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

},{"events":172,"inherits":178,"readable-stream/duplex.js":186,"readable-stream/passthrough.js":197,"readable-stream/readable.js":198,"readable-stream/transform.js":199,"readable-stream/writable.js":200}],204:[function(require,module,exports){
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

},{"es-abstract/es5":165,"function-bind":175}],205:[function(require,module,exports){
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

},{"./implementation":204,"./polyfill":206,"./shim":207,"define-properties":163,"function-bind":175}],206:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":204}],207:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":206,"define-properties":163}],208:[function(require,module,exports){
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
},{"./lib/default_stream":209,"./lib/results":211,"./lib/test":212,"_process":157,"defined":164,"through":213}],209:[function(require,module,exports){
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
},{"_process":157,"fs":156,"through":213}],210:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":157}],211:[function(require,module,exports){
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
},{"_process":157,"events":172,"function-bind":175,"has":176,"inherits":178,"object-inspect":181,"resumer":201,"through":213}],212:[function(require,module,exports){
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
},{"./next_tick":210,"deep-equal":160,"defined":164,"events":172,"has":176,"inherits":178,"path":184,"string.prototype.trim":205}],213:[function(require,module,exports){
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
},{"_process":157,"stream":203}],214:[function(require,module,exports){
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
},{}]},{},[83,84]);
