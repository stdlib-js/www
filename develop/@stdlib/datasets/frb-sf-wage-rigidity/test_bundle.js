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

/**
* Test if a value is array-like.
*
* @module @stdlib/assert/is-array-like
*
* @example
* var isArrayLike = require( '@stdlib/assert/is-array-like' );
*
* var bool = isArrayLike( [] );
* // returns true
*
* bool = isArrayLike( { 'length': 10 } );
* // returns true
*
* bool = isArrayLike( 'beep' );
* // returns true
*/

// MODULES //

var isArrayLike = require( './is_array_like.js' );


// EXPORTS //

module.exports = isArrayLike;

},{"./is_array_like.js":4}],4:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Tests if a value is array-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is array-like
*
* @example
* var bool = isArrayLike( [] );
* // returns true
*
* @example
* var bool = isArrayLike( {'length':10} );
* // returns true
*/
function isArrayLike( value ) {
	return (
		value !== void 0 &&
		value !== null &&
		typeof value !== 'function' &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
} // end FUNCTION isArrayLike()


// EXPORTS //

module.exports = isArrayLike;

},{"@stdlib/math/base/assert/is-integer":50,"@stdlib/math/constants/uint32-max":58}],5:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './is_array.js' );


// EXPORTS //

module.exports = isArray;

},{"./is_array.js":6}],6:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
} // end FUNCTION isArray()


// EXPORTS //

module.exports = Array.isArray || isArray;

},{"@stdlib/utils/native-class":81}],7:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './is_buffer.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./is_buffer.js":8}],8:[function(require,module,exports){
'use strict';

// MODULES //

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
* @example
* var v = isBuffer( {} );
* // returns false
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&
				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
} // end FUNCTION isBuffer()


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":32}],9:[function(require,module,exports){
'use strict';

/**
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var isError = require( './is_error.js' );


// EXPORTS //

module.exports = isError;

},{"./is_error.js":10}],10:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
} // end FUNCTION isError()


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":75,"@stdlib/utils/native-class":81}],11:[function(require,module,exports){
'use strict';

/**
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './is_function.js' );


// EXPORTS //

module.exports = isFunction;

},{"./is_function.js":12}],12:[function(require,module,exports){
'use strict';

// MODULES //

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
} // end FUNCTION isFunction()


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":92}],13:[function(require,module,exports){
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
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isInteger( -3.14 );
* // returns false
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./object.js":16,"./primitive.js":17}],14:[function(require,module,exports){
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

},{"./generic.js":13,"./object.js":16,"./primitive.js":17,"@stdlib/utils/define-read-only-property":68}],15:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
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

},{"@stdlib/math/base/assert/is-integer":50,"@stdlib/math/constants/float64-ninf":56,"@stdlib/math/constants/float64-pinf":57}],16:[function(require,module,exports){
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

},{"./integer.js":15,"@stdlib/assert/is-number":27}],17:[function(require,module,exports){
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

},{"./integer.js":15,"@stdlib/assert/is-number":27}],18:[function(require,module,exports){
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
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*/
function isnan( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"./object.js":20,"./primitive.js":21}],19:[function(require,module,exports){
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

},{"./generic.js":18,"./object.js":20,"./primitive.js":21,"@stdlib/utils/define-read-only-property":68}],20:[function(require,module,exports){
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
* bool = isnan( new Number( NaN ) );
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

},{"@stdlib/assert/is-number":27,"@stdlib/math/base/assert/is-nan":52}],21:[function(require,module,exports){
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
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
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

},{"@stdlib/assert/is-number":27,"@stdlib/math/base/assert/is-nan":52}],22:[function(require,module,exports){
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
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":24,"./primitive.js":25}],23:[function(require,module,exports){
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

},{"./generic.js":22,"./object.js":24,"./primitive.js":25,"@stdlib/utils/define-read-only-property":68}],24:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":14}],25:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":14}],26:[function(require,module,exports){
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

},{"./object.js":28,"./primitive.js":29}],27:[function(require,module,exports){
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

},{"./generic.js":26,"./object.js":28,"./primitive.js":29,"@stdlib/utils/define-read-only-property":68}],28:[function(require,module,exports){
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

},{"./try2serialize.js":31,"@stdlib/utils/detect-tostringtag-support":72,"@stdlib/utils/native-class":81}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],31:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
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

},{"./tostring.js":30}],32:[function(require,module,exports){
'use strict';

/**
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './is_object_like.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./is_object_like.js":33,"@stdlib/assert/tools/array-function":45,"@stdlib/utils/define-read-only-property":68}],33:[function(require,module,exports){
'use strict';

/**
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
} // end FUNCTION isObjectLike()


// EXPORTS //

module.exports = isObjectLike;

},{}],34:[function(require,module,exports){
'use strict';

/**
* Test if a value is an object.
*
* @module @stdlib/assert/is-object
*
* @example
* var isObject = require( '@stdlib/assert/is-object' );
*
* var bool = isObject( {} );
* // returns true
*
* bool = isObject( true );
* // returns false
*/

// MODULES //

var isObject = require( './is_object.js' );


// EXPORTS //

module.exports = isObject;

},{"./is_object.js":35}],35:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an object; e.g., {}.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an object
*
* @example
* var bool = isObject( {} );
* // returns true
*
* @example
* var bool = isObject( null );
* // returns false
*/
function isObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		!isArray( value )
	);
} // end FUNCTION isObject()


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":5}],36:[function(require,module,exports){
'use strict';

/**
* Test if a value is a plain object.
*
* @module @stdlib/assert/is-plain-object
*
* @example
* var isPlainObject = require( '@stdlib/assert/is-plain-object' );
*
* var bool = isPlainObject( {} );
* // returns true
*
* bool = isPlainObject( null );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isPlainObject = require( './is_plain_object.js' );


// MAIN //

setReadOnly( isPlainObject, 'isPlainObjectArray', arrayfun( isPlainObject ) );


// EXPORTS //

module.exports = isPlainObject;

},{"./is_plain_object.js":37,"@stdlib/assert/tools/array-function":45,"@stdlib/utils/define-read-only-property":68}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var objectPrototype = Object.prototype;


// FUNCTIONS //

/**
* Tests that an object only has own properties.
*
* @private
* @param {Object} obj - value to test
* @returns {boolean} boolean indicating if an object only has own properties
*/
function ownProps( obj ) {
	var key;

	// NOTE: possibility of perf boost if key enumeration order is known (see http://stackoverflow.com/questions/18531624/isplainobject-thing).
	for ( key in obj ) {
		if ( !hasOwnProp( obj, key ) ) {
			return false;
		}
	}
	return true;
} // end FUNCTION ownProps()


// MAIN //

/**
* Tests if a value is a plain object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a plain object
*
* @example
* var bool = isPlainObject( {} );
* // returns true
*
* @example
* var bool = isPlainObject( null );
* // returns false
*/
function isPlainObject( value ) {
	var proto;

	// Screen for obvious non-objects...
	if ( !isObject( value ) ) {
		return false;
	}
	// Objects with no prototype (e.g., `Object.create( null )`) are plain...
	proto = getPrototypeOf( value );
	if ( !proto ) {
		return true;
	}
	// Objects having a prototype are plain if and only if they are constructed with a global `Object` function and the prototype points to the prototype of a plain object...
	return (
		// Cannot have own `constructor` property:
		!hasOwnProp( value, 'constructor' ) &&

		// Prototype `constructor` property must be a function (see also https://bugs.jquery.com/ticket/9897 and http://stackoverflow.com/questions/18531624/isplainobject-thing):
		hasOwnProp( proto, 'constructor' ) &&
		isFunction( proto.constructor ) &&
		nativeClass( proto.constructor ) === '[object Function]' &&

		// Test for object-specific method:
		hasOwnProp( proto, 'isPrototypeOf' ) &&
		isFunction( proto.isPrototypeOf ) &&

		(
			// Test if the prototype matches the global `Object` prototype (same realm):
			proto === objectPrototype ||

			// Test that all properties are own properties (cross-realm; *most* likely a plain object):
			ownProps( value )
		)
	);
} // end FUNCTION isPlainObject()


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":11,"@stdlib/assert/is-object":34,"@stdlib/utils/get-prototype-of":75,"@stdlib/utils/native-class":81}],38:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string
*/
function isString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./object.js":40,"./primitive.js":41}],39:[function(require,module,exports){
'use strict';

/**
* Test if a value is a string.
*
* @module @stdlib/assert/is-string
*
* @example
* var isString = require( '@stdlib/assert/is-string' );
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 5 );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isObject;
*
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 'beep' );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isString = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./generic.js":38,"./object.js":40,"./primitive.js":41,"@stdlib/utils/define-read-only-property":68}],40:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


// MAIN //

/**
* Tests if a value is a string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string object
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
* @example
* var bool = isString( 'beep' );
* // returns false
*/
function isString( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":42,"@stdlib/utils/detect-tostringtag-support":72,"@stdlib/utils/native-class":81}],41:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' );
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{}],42:[function(require,module,exports){
'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to extract a string value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a string can be extracted
*/
function test( value ) {
	try {
		valueOf.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./valueof.js":43}],43:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],44:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;
	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	} // end FUNCTION every()
} // end FUNCTION arrayfcn()


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":5}],45:[function(require,module,exports){
'use strict';

/**
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":44}],46:[function(require,module,exports){
module.exports=[{"date":"01/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1980","all_workers":6.605164004,"hourly_workers":7.104569512,"non_hourly_workers":6.089417002,"less_than_high_school":8.28481217,"high_school":7.281848362,"some_college":5.50403719,"college":5.038206096,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1981","all_workers":6.613395683,"hourly_workers":7.166187353,"non_hourly_workers":6.044343441,"less_than_high_school":8.166002965,"high_school":7.446082868,"some_college":5.487812896,"college":4.882943201,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1981","all_workers":6.698321332,"hourly_workers":7.301069476,"non_hourly_workers":6.081341208,"less_than_high_school":8.383310233,"high_school":7.424598583,"some_college":5.816367758,"college":4.902602406,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1981","all_workers":6.786410398,"hourly_workers":7.418991085,"non_hourly_workers":6.14224366,"less_than_high_school":8.462105071,"high_school":7.521579458,"some_college":5.835253271,"college":5.095279757,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1981","all_workers":6.746292475,"hourly_workers":7.38139413,"non_hourly_workers":6.098611264,"less_than_high_school":8.233543516,"high_school":7.419256357,"some_college":5.795610165,"college":5.313319155,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1981","all_workers":6.804213559,"hourly_workers":7.50587854,"non_hourly_workers":6.110139377,"less_than_high_school":8.399559537,"high_school":7.382049651,"some_college":5.894952822,"college":5.352117773,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1981","all_workers":6.766506465,"hourly_workers":7.372852509,"non_hourly_workers":6.175362441,"less_than_high_school":8.232407227,"high_school":7.464768672,"some_college":5.69337059,"college":5.399902748,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1981","all_workers":6.714488832,"hourly_workers":7.250957444,"non_hourly_workers":6.188415615,"less_than_high_school":7.815633305,"high_school":7.505814521,"some_college":5.700551939,"college":5.504374931,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1981","all_workers":6.771237799,"hourly_workers":7.327654156,"non_hourly_workers":6.220570379,"less_than_high_school":8.075662921,"high_school":7.531962805,"some_college":5.806987498,"college":5.389206907,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1981","all_workers":6.834380846,"hourly_workers":7.29015341,"non_hourly_workers":6.38296932,"less_than_high_school":7.762953867,"high_school":7.715970146,"some_college":5.606468302,"college":5.734542824,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1981","all_workers":6.71974826,"hourly_workers":7.294971158,"non_hourly_workers":6.129639712,"less_than_high_school":7.883559292,"high_school":7.598497038,"some_college":5.364468615,"college":5.553996336,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1981","all_workers":6.809544528,"hourly_workers":7.289689894,"non_hourly_workers":6.323234594,"less_than_high_school":7.820955944,"high_school":7.603187313,"some_college":5.695126432,"college":5.715222075,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1981","all_workers":6.853673281,"hourly_workers":7.336819217,"non_hourly_workers":6.362484466,"less_than_high_school":7.915469551,"high_school":7.610101317,"some_college":5.823828544,"college":5.783081752,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1982","all_workers":7.070893022,"hourly_workers":7.565211166,"non_hourly_workers":6.560735613,"less_than_high_school":8.058904503,"high_school":7.895762386,"some_college":6.039168924,"college":5.917987211,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1982","all_workers":7.223751619,"hourly_workers":7.694840099,"non_hourly_workers":6.735779285,"less_than_high_school":8.046550861,"high_school":8.25660797,"some_college":5.951159227,"college":5.996599858,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1982","all_workers":7.207361283,"hourly_workers":7.59295524,"non_hourly_workers":6.797106562,"less_than_high_school":8.088235551,"high_school":8.27906598,"some_college":5.829134651,"college":5.927387013,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1982","all_workers":7.447707886,"hourly_workers":7.890444748,"non_hourly_workers":6.977171052,"less_than_high_school":8.769259529,"high_school":8.596601758,"some_college":5.828994481,"college":6.020824686,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1982","all_workers":7.524754105,"hourly_workers":7.878140373,"non_hourly_workers":7.118327516,"less_than_high_school":8.945988444,"high_school":8.7044787,"some_college":5.731535398,"college":6.176430053,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1982","all_workers":7.589252499,"hourly_workers":8.143638464,"non_hourly_workers":6.94948471,"less_than_high_school":9.176355409,"high_school":8.635573311,"some_college":6.126335596,"college":6.029568292,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1982","all_workers":7.777255214,"hourly_workers":8.467181654,"non_hourly_workers":6.960567672,"less_than_high_school":9.882724307,"high_school":8.684223458,"some_college":6.501993159,"college":5.877065742,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1982","all_workers":7.968119413,"hourly_workers":8.796952933,"non_hourly_workers":6.962974229,"less_than_high_school":10.18881029,"high_school":8.869823878,"some_college":6.858449196,"college":5.843260478,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1982","all_workers":8.206600744,"hourly_workers":9.187172479,"non_hourly_workers":7.021806212,"less_than_high_school":10.61141969,"high_school":8.995495646,"some_college":7.358363911,"college":5.985412267,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1982","all_workers":8.338959653,"hourly_workers":9.361256093,"non_hourly_workers":7.102449664,"less_than_high_school":10.71355461,"high_school":9.15455153,"some_college":7.452073246,"college":6.09276843,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1982","all_workers":8.499250127,"hourly_workers":9.776521369,"non_hourly_workers":6.986288876,"less_than_high_school":11.07620773,"high_school":9.36927983,"some_college":7.523218425,"college":6.106294079,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1982","all_workers":8.47743302,"hourly_workers":9.834615871,"non_hourly_workers":6.876907502,"less_than_high_school":11.1094949,"high_school":9.338919802,"some_college":7.522591213,"college":6.043622731,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1983","all_workers":8.646243372,"hourly_workers":10.02621054,"non_hourly_workers":7.024938191,"less_than_high_school":11.68147051,"high_school":9.181901342,"some_college":7.807626803,"college":6.297392797,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1983","all_workers":8.851582764,"hourly_workers":10.45071713,"non_hourly_workers":6.972123686,"less_than_high_school":12.5754163,"high_school":9.360123947,"some_college":7.931956441,"college":6.181586071,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1983","all_workers":9.127227774,"hourly_workers":10.97679308,"non_hourly_workers":6.996468717,"less_than_high_school":12.96434469,"high_school":9.562341303,"some_college":8.571997643,"college":6.26094965,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1983","all_workers":9.340419212,"hourly_workers":11.26859192,"non_hourly_workers":7.122879617,"less_than_high_school":13.12803945,"high_school":9.781554826,"some_college":9.041196826,"college":6.273900905,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1983","all_workers":9.567663577,"hourly_workers":11.60441376,"non_hourly_workers":7.230102154,"less_than_high_school":13.214013,"high_school":10.12465125,"some_college":9.275475649,"college":6.417598266,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1983","all_workers":9.938205457,"hourly_workers":12.0003693,"non_hourly_workers":7.566503783,"less_than_high_school":14.28786322,"high_school":10.72897645,"some_college":9.073737325,"college":6.440334752,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1983","all_workers":10.17172112,"hourly_workers":12.1822263,"non_hourly_workers":7.860389539,"less_than_high_school":14.25352491,"high_school":11.26081774,"some_college":8.929253256,"college":6.747409834,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1983","all_workers":10.35044546,"hourly_workers":12.34230003,"non_hourly_workers":8.043397261,"less_than_high_school":14.17194093,"high_school":11.47001082,"some_college":9.102479229,"college":7.062149906,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1983","all_workers":10.36908751,"hourly_workers":12.350553,"non_hourly_workers":8.019221077,"less_than_high_school":14.22270531,"high_school":11.44442711,"some_college":9.343203973,"college":6.706840917,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1983","all_workers":10.67477337,"hourly_workers":12.67574512,"non_hourly_workers":8.257403022,"less_than_high_school":14.6837149,"high_school":11.79930881,"some_college":9.553169561,"college":6.933799557,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1983","all_workers":10.77108255,"hourly_workers":12.69448981,"non_hourly_workers":8.402334956,"less_than_high_school":14.98183092,"high_school":11.84536456,"some_college":9.625824056,"college":7.039187744,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1983","all_workers":10.8995757,"hourly_workers":12.86823814,"non_hourly_workers":8.462928472,"less_than_high_school":14.88443831,"high_school":12.19457897,"some_college":9.689497136,"college":7.070477241,"construction":16.63677121,"finance":8.000214068,"manufacturing":9.711154487},{"date":"01/01/1984","all_workers":11.02510626,"hourly_workers":13.11804493,"non_hourly_workers":8.4270202,"less_than_high_school":15.28898185,"high_school":12.3721637,"some_college":9.683449795,"college":7.155946939,"construction":17.69305371,"finance":7.953861956,"manufacturing":9.767120296},{"date":"02/01/1984","all_workers":11.01843905,"hourly_workers":13.04358792,"non_hourly_workers":8.492251699,"less_than_high_school":14.88934475,"high_school":12.44876872,"some_college":9.997966774,"college":7.001205796,"construction":16.94236571,"finance":8.201049538,"manufacturing":9.712146629},{"date":"03/01/1984","all_workers":11.0043617,"hourly_workers":12.96892263,"non_hourly_workers":8.497482867,"less_than_high_school":14.87911364,"high_school":12.4703242,"some_college":9.778025177,"college":7.116078169,"construction":16.78842115,"finance":8.048330304,"manufacturing":9.428739925},{"date":"04/01/1984","all_workers":10.982221,"hourly_workers":12.98475882,"non_hourly_workers":8.436065166,"less_than_high_school":14.79480859,"high_school":12.22505745,"some_college":9.911240332,"college":7.366850459,"construction":15.76929314,"finance":8.506128478,"manufacturing":9.846048459},{"date":"05/01/1984","all_workers":11.03597003,"hourly_workers":13.1514754,"non_hourly_workers":8.327401253,"less_than_high_school":14.91466003,"high_school":12.24073167,"some_college":10.18547871,"college":7.281487538,"construction":16.45091428,"finance":8.397711548,"manufacturing":9.670401222},{"date":"06/01/1984","all_workers":10.90096189,"hourly_workers":12.97622219,"non_hourly_workers":8.215348749,"less_than_high_school":14.23433554,"high_school":12.0607497,"some_college":10.38378043,"college":7.265583961,"construction":16.23214942,"finance":7.83044864,"manufacturing":9.359190271},{"date":"07/01/1984","all_workers":10.92628826,"hourly_workers":13.10063479,"non_hourly_workers":8.135161151,"less_than_high_school":14.57880185,"high_school":11.81433391,"some_college":10.47250295,"college":7.47354524,"construction":16.10883732,"finance":7.526125299,"manufacturing":9.541071024},{"date":"08/01/1984","all_workers":10.8918442,"hourly_workers":13.08417318,"non_hourly_workers":8.080001303,"less_than_high_school":15.023889,"high_school":11.72443574,"some_college":10.46713146,"college":7.236336538,"construction":15.40254852,"finance":8.180936411,"manufacturing":10.11835931},{"date":"09/01/1984","all_workers":10.9505091,"hourly_workers":13.29520288,"non_hourly_workers":7.958800844,"less_than_high_school":15.18597793,"high_school":12.0118115,"some_college":10.2422391,"college":7.254893108,"construction":15.6259249,"finance":8.231173702,"manufacturing":10.53117022},{"date":"10/01/1984","all_workers":10.77862334,"hourly_workers":13.06787124,"non_hourly_workers":7.889092071,"less_than_high_school":15.28905659,"high_school":11.71802384,"some_college":10.03405019,"college":7.224188165,"construction":15.5469333,"finance":7.76427564,"manufacturing":10.86925678},{"date":"11/01/1984","all_workers":10.79908955,"hourly_workers":13.16455102,"non_hourly_workers":7.814707358,"less_than_high_school":15.01766991,"high_school":11.70669932,"some_college":10.19862244,"college":7.169693607,"construction":15.52691417,"finance":7.536052351,"manufacturing":10.89818966},{"date":"12/01/1984","all_workers":10.99722191,"hourly_workers":13.44821659,"non_hourly_workers":7.874651173,"less_than_high_school":15.44753442,"high_school":11.69062626,"some_college":10.57586582,"college":7.216018254,"construction":15.49816581,"finance":7.214929444,"manufacturing":11.12858586},{"date":"01/01/1985","all_workers":10.97296749,"hourly_workers":13.47974568,"non_hourly_workers":7.77232338,"less_than_high_school":15.26310303,"high_school":11.74475808,"some_college":10.46321962,"college":7.296010464,"construction":14.74114645,"finance":7.201338173,"manufacturing":11.32383585},{"date":"02/01/1985","all_workers":11.31767738,"hourly_workers":13.82519273,"non_hourly_workers":8.083814741,"less_than_high_school":15.89942088,"high_school":11.96741904,"some_college":10.48858974,"college":7.895862365,"construction":14.63537304,"finance":7.153411238,"manufacturing":11.57641261},{"date":"03/01/1985","all_workers":11.35369938,"hourly_workers":13.78667661,"non_hourly_workers":8.214892959,"less_than_high_school":15.32521553,"high_school":12.1705369,"some_college":10.46385871,"college":8.05237383,"construction":14.53668113,"finance":7.504763461,"manufacturing":11.98508692},{"date":"04/01/1985","all_workers":11.43143601,"hourly_workers":14.0505439,"non_hourly_workers":8.070243735,"less_than_high_school":15.45485409,"high_school":12.58824225,"some_college":10.13697981,"college":7.867589549,"construction":15.50629813,"finance":7.007363982,"manufacturing":11.83827806},{"date":"05/01/1985","all_workers":11.32716582,"hourly_workers":13.80517486,"non_hourly_workers":8.153930104,"less_than_high_school":15.40581692,"high_school":12.34139042,"some_college":10.17600753,"college":7.781392187,"construction":14.88669927,"finance":7.605542261,"manufacturing":12.03503411},{"date":"06/01/1985","all_workers":11.40853122,"hourly_workers":13.90307616,"non_hourly_workers":8.229236829,"less_than_high_school":15.4654566,"high_school":12.53606388,"some_college":10.18025536,"college":7.796344748,"construction":14.46759472,"finance":9.083690564,"manufacturing":12.52257225},{"date":"07/01/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1987","all_workers":11.92838516,"hourly_workers":14.97824714,"non_hourly_workers":7.72118393,"less_than_high_school":16.80699422,"high_school":12.82447989,"some_college":12.12984978,"college":7.493046738,"construction":17.76631638,"finance":8.585744465,"manufacturing":13.71091293},{"date":"10/01/1987","all_workers":11.89171511,"hourly_workers":14.98385363,"non_hourly_workers":7.647088007,"less_than_high_school":16.66963042,"high_school":12.92312719,"some_college":12.01537508,"college":7.31747086,"construction":17.83193116,"finance":8.500772544,"manufacturing":13.1586075},{"date":"11/01/1987","all_workers":11.9987395,"hourly_workers":15.21270449,"non_hourly_workers":7.567624956,"less_than_high_school":16.47291531,"high_school":13.19650738,"some_college":12.18399448,"college":7.180614301,"construction":18.74433452,"finance":8.281909135,"manufacturing":13.40778068},{"date":"12/01/1987","all_workers":12.16051308,"hourly_workers":15.43873392,"non_hourly_workers":7.581432812,"less_than_high_school":16.00545077,"high_school":13.46484319,"some_college":12.47643992,"college":7.317588134,"construction":19.15077029,"finance":8.865288667,"manufacturing":13.36406352},{"date":"01/01/1988","all_workers":12.25816033,"hourly_workers":15.55953443,"non_hourly_workers":7.639264135,"less_than_high_school":16.21956446,"high_school":13.58251786,"some_college":12.48791075,"college":7.359746943,"construction":20.30466201,"finance":8.667965167,"manufacturing":13.3106964},{"date":"02/01/1988","all_workers":12.32853422,"hourly_workers":15.59486656,"non_hourly_workers":7.807580577,"less_than_high_school":16.37570208,"high_school":13.66516475,"some_college":12.46424029,"college":7.614141765,"construction":18.85898266,"finance":8.728646981,"manufacturing":13.44903733},{"date":"03/01/1988","all_workers":12.3168411,"hourly_workers":15.49280402,"non_hourly_workers":7.903109899,"less_than_high_school":16.62125741,"high_school":13.63307759,"some_college":12.44434883,"college":7.585911563,"construction":18.87320372,"finance":8.465178474,"manufacturing":12.81999791},{"date":"04/01/1988","all_workers":12.20475082,"hourly_workers":15.37580355,"non_hourly_workers":7.80428687,"less_than_high_school":16.80193391,"high_school":13.55736423,"some_college":11.91384703,"college":7.711577691,"construction":20.14349049,"finance":8.342523697,"manufacturing":12.36424134},{"date":"05/01/1988","all_workers":12.37111266,"hourly_workers":15.4051047,"non_hourly_workers":8.112097498,"less_than_high_school":16.90498347,"high_school":13.56715987,"some_college":11.8851628,"college":8.403126592,"construction":20.19277352,"finance":8.427308283,"manufacturing":12.2807693},{"date":"06/01/1988","all_workers":12.12079304,"hourly_workers":15.16454876,"non_hourly_workers":7.841097575,"less_than_high_school":16.93502999,"high_school":13.34722361,"some_college":11.46857483,"college":8.073305034,"construction":19.33098824,"finance":8.353101634,"manufacturing":11.93983049},{"date":"07/01/1988","all_workers":11.89607714,"hourly_workers":14.71921402,"non_hourly_workers":7.918402023,"less_than_high_school":16.05277534,"high_school":13.12960449,"some_college":11.15729317,"college":8.281781375,"construction":18.59802116,"finance":8.299378991,"manufacturing":11.32941967},{"date":"08/01/1988","all_workers":11.85269717,"hourly_workers":14.5916716,"non_hourly_workers":7.988392924,"less_than_high_school":16.06844698,"high_school":13.09185143,"some_college":11.11323231,"college":8.107689142,"construction":19.07564786,"finance":8.733115314,"manufacturing":11.23349204},{"date":"09/01/1988","all_workers":11.99219597,"hourly_workers":14.84415444,"non_hourly_workers":7.965205606,"less_than_high_school":15.94117989,"high_school":13.49384344,"some_college":11.18604626,"college":8.10947546,"construction":19.24260105,"finance":9.740141735,"manufacturing":11.2089852},{"date":"10/01/1988","all_workers":11.970035,"hourly_workers":14.71442485,"non_hourly_workers":8.082121312,"less_than_high_school":16.19666626,"high_school":13.4130061,"some_college":11.15062482,"college":8.049451512,"construction":18.47460294,"finance":9.791502092,"manufacturing":11.86672406},{"date":"11/01/1988","all_workers":11.83693431,"hourly_workers":14.55251364,"non_hourly_workers":8.009205896,"less_than_high_school":16.22364434,"high_school":13.41961247,"some_college":10.69260169,"college":8.048636464,"construction":18.14749427,"finance":9.590986788,"manufacturing":11.98686431},{"date":"12/01/1988","all_workers":11.82746513,"hourly_workers":14.57525031,"non_hourly_workers":7.995525506,"less_than_high_school":16.60521565,"high_school":13.57824011,"some_college":10.38182728,"college":8.058370655,"construction":18.32928722,"finance":8.909353752,"manufacturing":12.25378526},{"date":"01/01/1989","all_workers":11.63119538,"hourly_workers":14.34749769,"non_hourly_workers":7.821776432,"less_than_high_school":16.77296808,"high_school":13.20322117,"some_college":10.33143248,"college":7.821561161,"construction":18.03668221,"finance":8.917113056,"manufacturing":11.84648734},{"date":"02/01/1989","all_workers":11.52855988,"hourly_workers":14.16311886,"non_hourly_workers":7.787711141,"less_than_high_school":16.9738826,"high_school":12.84765238,"some_college":10.26218069,"college":7.727499684,"construction":17.94537421,"finance":9.111478931,"manufacturing":11.63307437},{"date":"03/01/1989","all_workers":11.6825413,"hourly_workers":14.49156744,"non_hourly_workers":7.697872534,"less_than_high_school":17.04600302,"high_school":13.01224679,"some_college":10.43998486,"college":7.784479919,"construction":19.64912429,"finance":9.241496366,"manufacturing":12.05189862},{"date":"04/01/1989","all_workers":11.62735128,"hourly_workers":14.49819343,"non_hourly_workers":7.590986589,"less_than_high_school":16.2890262,"high_school":12.88747316,"some_college":10.88031959,"college":7.745017232,"construction":18.30361563,"finance":9.7589528,"manufacturing":12.0867307},{"date":"05/01/1989","all_workers":11.38002911,"hourly_workers":14.35154569,"non_hourly_workers":7.217278445,"less_than_high_school":16.20838522,"high_school":12.80330721,"some_college":10.71955214,"college":6.932578753,"construction":17.44672842,"finance":9.796089524,"manufacturing":12.07497937},{"date":"06/01/1989","all_workers":11.43557238,"hourly_workers":14.30394296,"non_hourly_workers":7.448968537,"less_than_high_school":15.87948432,"high_school":12.87085171,"some_college":10.79614183,"college":7.211202476,"construction":17.09562478,"finance":9.950591538,"manufacturing":12.43935203},{"date":"07/01/1989","all_workers":11.25092134,"hourly_workers":14.22176516,"non_hourly_workers":7.127170558,"less_than_high_school":15.98882325,"high_school":12.70999336,"some_college":10.47863937,"college":6.933440912,"construction":17.65235875,"finance":9.407310698,"manufacturing":12.40244984},{"date":"08/01/1989","all_workers":11.08706165,"hourly_workers":13.98515846,"non_hourly_workers":7.07430248,"less_than_high_school":15.74414848,"high_school":12.48488189,"some_college":10.36271521,"college":6.931669212,"construction":17.15155503,"finance":8.997992981,"manufacturing":12.13262881},{"date":"09/01/1989","all_workers":10.81910116,"hourly_workers":13.67691084,"non_hourly_workers":6.890151297,"less_than_high_school":15.60013483,"high_school":11.96736495,"some_college":10.20622578,"college":6.869701856,"construction":17.35262942,"finance":8.172733757,"manufacturing":11.86516784},{"date":"10/01/1989","all_workers":10.55985291,"hourly_workers":13.37855426,"non_hourly_workers":6.678494635,"less_than_high_school":15.07784228,"high_school":11.80091854,"some_college":9.644049851,"college":6.912413526,"construction":17.44404251,"finance":7.684633902,"manufacturing":11.52605936},{"date":"11/01/1989","all_workers":10.50235281,"hourly_workers":13.30444633,"non_hourly_workers":6.630845041,"less_than_high_school":15.00912789,"high_school":11.81125979,"some_college":9.426176504,"college":6.913578712,"construction":17.16500224,"finance":8.099003195,"manufacturing":11.58839174},{"date":"12/01/1989","all_workers":10.32130042,"hourly_workers":13.10752488,"non_hourly_workers":6.440717553,"less_than_high_school":14.99565896,"high_school":11.35156248,"some_college":9.539396468,"college":6.631674422,"construction":17.43804504,"finance":7.738538662,"manufacturing":11.24517166},{"date":"01/01/1990","all_workers":10.38527859,"hourly_workers":13.22910425,"non_hourly_workers":6.464773793,"less_than_high_school":15.00474645,"high_school":11.68410076,"some_college":9.363712335,"college":6.759359821,"construction":16.78058662,"finance":8.241920097,"manufacturing":11.53333263},{"date":"02/01/1990","all_workers":10.25164903,"hourly_workers":13.16928739,"non_hourly_workers":6.27837087,"less_than_high_school":14.19986105,"high_school":11.72648527,"some_college":9.423220112,"college":6.618095881,"construction":17.22714069,"finance":8.191088523,"manufacturing":11.26841107},{"date":"03/01/1990","all_workers":10.11669334,"hourly_workers":12.99484158,"non_hourly_workers":6.236293187,"less_than_high_school":14.03738204,"high_school":11.67520419,"some_college":9.378488631,"college":6.375245636,"construction":15.2268724,"finance":8.42417151,"manufacturing":10.91512318},{"date":"04/01/1990","all_workers":10.03973056,"hourly_workers":12.79518443,"non_hourly_workers":6.313072171,"less_than_high_school":14.19560534,"high_school":11.53260328,"some_college":9.143988307,"college":6.316249035,"construction":14.79456199,"finance":7.832377706,"manufacturing":10.94132868},{"date":"05/01/1990","all_workers":9.953768673,"hourly_workers":12.55967656,"non_hourly_workers":6.442904994,"less_than_high_school":13.77227789,"high_school":11.37670891,"some_college":8.86299591,"college":6.662509819,"construction":14.5876034,"finance":7.149350267,"manufacturing":10.7455063},{"date":"06/01/1990","all_workers":9.698083427,"hourly_workers":12.37442843,"non_hourly_workers":6.124656026,"less_than_high_school":13.60351474,"high_school":11.15072859,"some_college":8.619138546,"college":6.457262364,"construction":15.04325712,"finance":6.535847508,"manufacturing":10.28379741},{"date":"07/01/1990","all_workers":9.672247129,"hourly_workers":12.23471519,"non_hourly_workers":6.281193146,"less_than_high_school":13.16134611,"high_school":11.00020912,"some_college":8.831338996,"college":6.623931345,"construction":14.14356834,"finance":6.937592043,"manufacturing":10.2884253},{"date":"08/01/1990","all_workers":9.674433361,"hourly_workers":12.3401009,"non_hourly_workers":6.14535242,"less_than_high_school":12.92065808,"high_school":11.05210351,"some_college":8.767928041,"college":6.713037998,"construction":14.67122804,"finance":7.317330978,"manufacturing":9.863159981},{"date":"09/01/1990","all_workers":9.694181141,"hourly_workers":12.322799,"non_hourly_workers":6.226290423,"less_than_high_school":13.16019099,"high_school":11.06763033,"some_college":8.774591634,"college":6.658193004,"construction":14.15468035,"finance":7.704405062,"manufacturing":9.77730175},{"date":"10/01/1990","all_workers":9.766757715,"hourly_workers":12.43319337,"non_hourly_workers":6.273438537,"less_than_high_school":13.59860322,"high_school":10.85687467,"some_college":8.990682713,"college":6.813545526,"construction":14.35032079,"finance":7.818343593,"manufacturing":9.612242621},{"date":"11/01/1990","all_workers":9.704133801,"hourly_workers":12.2980132,"non_hourly_workers":6.338757557,"less_than_high_school":13.23354889,"high_school":10.71786692,"some_college":9.127853234,"college":6.826402259,"construction":14.07907326,"finance":7.789408122,"manufacturing":9.41196681},{"date":"12/01/1990","all_workers":9.535516467,"hourly_workers":12.06148387,"non_hourly_workers":6.327538988,"less_than_high_school":13.0000299,"high_school":10.55800136,"some_college":8.787068467,"college":6.908105262,"construction":13.14190547,"finance":8.181499411,"manufacturing":9.335191895},{"date":"01/01/1991","all_workers":9.395761428,"hourly_workers":11.7830338,"non_hourly_workers":6.390322826,"less_than_high_school":12.38585658,"high_school":10.12715967,"some_college":9.16277769,"college":6.740786836,"construction":12.57598218,"finance":8.174604735,"manufacturing":9.112689692},{"date":"02/01/1991","all_workers":9.274702365,"hourly_workers":11.64907196,"non_hourly_workers":6.267380196,"less_than_high_school":12.33091233,"high_school":9.871516172,"some_college":9.057534045,"college":6.746384427,"construction":12.40371202,"finance":7.733409854,"manufacturing":9.072777789},{"date":"03/01/1991","all_workers":9.198578028,"hourly_workers":11.5480786,"non_hourly_workers":6.239616933,"less_than_high_school":12.08372447,"high_school":9.812610812,"some_college":8.886367209,"college":6.851464859,"construction":12.79743697,"finance":7.631041207,"manufacturing":9.005970289},{"date":"04/01/1991","all_workers":9.136452341,"hourly_workers":11.5780814,"non_hourly_workers":6.056412236,"less_than_high_school":12.07225466,"high_school":10.0139635,"some_college":8.744625413,"college":6.602139766,"construction":12.92505498,"finance":7.705151094,"manufacturing":8.438146506},{"date":"05/01/1991","all_workers":9.076025705,"hourly_workers":11.5778224,"non_hourly_workers":5.927371428,"less_than_high_school":12.59616872,"high_school":9.746842413,"some_college":9.019340144,"college":6.417256976,"construction":13.21793906,"finance":8.6756473,"manufacturing":8.293996381},{"date":"06/01/1991","all_workers":9.214698937,"hourly_workers":11.73181468,"non_hourly_workers":6.023535623,"less_than_high_school":12.56701292,"high_school":9.861902403,"some_college":9.30202802,"college":6.384075169,"construction":13.53480957,"finance":8.66385026,"manufacturing":8.327139294},{"date":"07/01/1991","all_workers":9.280451153,"hourly_workers":11.92999983,"non_hourly_workers":5.906228136,"less_than_high_school":13.10761581,"high_school":10.05324643,"some_college":9.181977097,"college":6.285653027,"construction":14.51988752,"finance":8.726276628,"manufacturing":8.319472061},{"date":"08/01/1991","all_workers":9.292087839,"hourly_workers":11.90203034,"non_hourly_workers":6.012489081,"less_than_high_school":13.17303612,"high_school":9.987216685,"some_college":9.260537308,"college":6.254871828,"construction":13.9853728,"finance":8.884809304,"manufacturing":8.725080366},{"date":"09/01/1991","all_workers":9.30420399,"hourly_workers":11.85824588,"non_hourly_workers":6.102927229,"less_than_high_school":13.06459741,"high_school":10.01112183,"some_college":9.329151204,"college":6.216177097,"construction":14.00208651,"finance":8.497086885,"manufacturing":9.09445587},{"date":"10/01/1991","all_workers":9.393777761,"hourly_workers":11.99453902,"non_hourly_workers":6.117036157,"less_than_high_school":13.34772266,"high_school":10.26879587,"some_college":9.276157081,"college":6.192592466,"construction":14.33071666,"finance":8.719190378,"manufacturing":9.118071819},{"date":"11/01/1991","all_workers":9.397759024,"hourly_workers":11.90465056,"non_hourly_workers":6.214461082,"less_than_high_school":13.68711386,"high_school":10.11320773,"some_college":9.346619692,"college":6.102848095,"construction":14.84634071,"finance":8.399065796,"manufacturing":9.007747785},{"date":"12/01/1991","all_workers":9.489111891,"hourly_workers":12.00699877,"non_hourly_workers":6.277855136,"less_than_high_school":13.5154573,"high_school":10.24915164,"some_college":9.265319949,"college":6.336994685,"construction":14.30192545,"finance":8.278140651,"manufacturing":9.20190593},{"date":"01/01/1992","all_workers":9.626393439,"hourly_workers":12.08527311,"non_hourly_workers":6.484202395,"less_than_high_school":13.98678885,"high_school":10.31992052,"some_college":9.383943398,"college":6.446820594,"construction":14.81874063,"finance":8.297381884,"manufacturing":9.313690785},{"date":"02/01/1992","all_workers":9.847315068,"hourly_workers":12.43382077,"non_hourly_workers":6.55805832,"less_than_high_school":14.42041588,"high_school":10.62088472,"some_college":9.440601711,"college":6.618694675,"construction":15.46125271,"finance":8.126149188,"manufacturing":9.610533328},{"date":"03/01/1992","all_workers":9.942408464,"hourly_workers":12.5793997,"non_hourly_workers":6.59772964,"less_than_high_school":14.74488574,"high_school":10.62546243,"some_college":9.70363968,"college":6.595781548,"construction":15.48465958,"finance":8.230390792,"manufacturing":9.910408883},{"date":"04/01/1992","all_workers":10.01303204,"hourly_workers":12.66992008,"non_hourly_workers":6.664534428,"less_than_high_school":14.58380011,"high_school":10.3397679,"some_college":10.12033315,"college":6.906634385,"construction":15.5244332,"finance":8.34331484,"manufacturing":10.26817511},{"date":"05/01/1992","all_workers":10.21834471,"hourly_workers":12.84493193,"non_hourly_workers":6.880715482,"less_than_high_school":14.28995287,"high_school":10.75923613,"some_college":10.17124423,"college":7.040970771,"construction":16.4263691,"finance":8.081817509,"manufacturing":10.15906315},{"date":"06/01/1992","all_workers":10.30406056,"hourly_workers":12.9949744,"non_hourly_workers":6.928252759,"less_than_high_school":14.57076032,"high_school":10.85223806,"some_college":10.11846077,"college":7.186193551,"construction":15.8362432,"finance":8.376940919,"manufacturing":10.21769829},{"date":"07/01/1992","all_workers":10.37433037,"hourly_workers":13.11484987,"non_hourly_workers":6.916988336,"less_than_high_school":14.64778509,"high_school":10.94054469,"some_college":10.15390934,"college":7.187640544,"construction":14.79070365,"finance":8.067734995,"manufacturing":10.15146846},{"date":"08/01/1992","all_workers":10.38299536,"hourly_workers":13.19403018,"non_hourly_workers":6.810469635,"less_than_high_school":14.92157837,"high_school":10.97178636,"some_college":10.0770434,"college":7.127783847,"construction":14.99104208,"finance":7.775734145,"manufacturing":9.874845014},{"date":"09/01/1992","all_workers":10.45267062,"hourly_workers":13.3109446,"non_hourly_workers":6.826873439,"less_than_high_school":15.390974,"high_school":11.05051532,"some_college":9.866674197,"college":7.310681901,"construction":15.20971868,"finance":7.744679796,"manufacturing":9.61529521},{"date":"10/01/1992","all_workers":10.40304588,"hourly_workers":13.236382,"non_hourly_workers":6.806273655,"less_than_high_school":14.69206698,"high_school":11.2195994,"some_college":9.810683945,"college":7.236456416,"construction":15.68044515,"finance":7.479324299,"manufacturing":9.635625597},{"date":"11/01/1992","all_workers":10.53909046,"hourly_workers":13.57350626,"non_hourly_workers":6.684813484,"less_than_high_school":15.19442723,"high_school":11.31566214,"some_college":10.041405,"college":7.327681173,"construction":16.47439978,"finance":7.547202144,"manufacturing":9.637318659},{"date":"12/01/1992","all_workers":10.422798,"hourly_workers":13.43108021,"non_hourly_workers":6.595172707,"less_than_high_school":15.31200505,"high_school":11.02185756,"some_college":10.29274892,"college":7.098406727,"construction":16.73746805,"finance":7.500645518,"manufacturing":9.570028382},{"date":"01/01/1993","all_workers":10.41595093,"hourly_workers":13.49662932,"non_hourly_workers":6.472011931,"less_than_high_school":14.76141605,"high_school":11.25155495,"some_college":10.05954317,"college":7.169155413,"construction":16.42451909,"finance":7.213672357,"manufacturing":9.6827027},{"date":"02/01/1993","all_workers":10.36146919,"hourly_workers":13.38575426,"non_hourly_workers":6.494944637,"less_than_high_school":14.82286872,"high_school":11.2186285,"some_college":9.984578709,"college":7.085838169,"construction":16.15515895,"finance":7.430928701,"manufacturing":9.441709379},{"date":"03/01/1993","all_workers":10.34706115,"hourly_workers":13.37297647,"non_hourly_workers":6.457524504,"less_than_high_school":14.52159208,"high_school":11.21053687,"some_college":10.16380276,"college":7.004223272,"construction":16.7670127,"finance":7.587998421,"manufacturing":9.272672671},{"date":"04/01/1993","all_workers":10.37561493,"hourly_workers":13.3730713,"non_hourly_workers":6.509237373,"less_than_high_school":14.79690326,"high_school":11.4570216,"some_college":9.943011343,"college":6.842370493,"construction":16.9306261,"finance":7.348841639,"manufacturing":9.674839272},{"date":"05/01/1993","all_workers":10.27362069,"hourly_workers":13.34393273,"non_hourly_workers":6.335525396,"less_than_high_school":15.39752544,"high_school":11.31933437,"some_college":9.803962538,"college":6.585859408,"construction":16.20213401,"finance":7.107711699,"manufacturing":9.807474967},{"date":"06/01/1993","all_workers":10.28488919,"hourly_workers":13.27714539,"non_hourly_workers":6.391525096,"less_than_high_school":15.68883861,"high_school":11.18707853,"some_college":9.926995063,"college":6.596855486,"construction":16.10287465,"finance":6.965982827,"manufacturing":9.573341651},{"date":"07/01/1993","all_workers":10.28035192,"hourly_workers":13.20794906,"non_hourly_workers":6.4837165,"less_than_high_school":15.86027947,"high_school":11.15916981,"some_college":10.05831023,"college":6.437674841,"construction":16.98676718,"finance":7.284629756,"manufacturing":9.826816232},{"date":"08/01/1993","all_workers":10.29163478,"hourly_workers":13.15661552,"non_hourly_workers":6.592355277,"less_than_high_school":15.94629547,"high_school":11.19797266,"some_college":10.21681008,"college":6.315473577,"construction":16.47171742,"finance":7.173852946,"manufacturing":10.06963073},{"date":"09/01/1993","all_workers":10.27249917,"hourly_workers":13.12209996,"non_hourly_workers":6.563881694,"less_than_high_school":15.79752933,"high_school":11.13679751,"some_college":10.30808701,"college":6.330318969,"construction":16.26053505,"finance":7.190996157,"manufacturing":10.11461332},{"date":"10/01/1993","all_workers":10.36949535,"hourly_workers":13.24239408,"non_hourly_workers":6.61854854,"less_than_high_school":15.91665032,"high_school":10.97343335,"some_college":10.60089816,"college":6.54273382,"construction":15.54755542,"finance":7.324407787,"manufacturing":10.64978017},{"date":"11/01/1993","all_workers":10.33843047,"hourly_workers":13.18973358,"non_hourly_workers":6.622198826,"less_than_high_school":15.36322995,"high_school":11.14291938,"some_college":10.33124712,"college":6.623074722,"construction":14.75754013,"finance":7.482752432,"manufacturing":11.10572656},{"date":"12/01/1993","all_workers":10.47686769,"hourly_workers":13.40517005,"non_hourly_workers":6.666482858,"less_than_high_school":15.12443753,"high_school":11.43001703,"some_college":10.51464418,"college":6.592264939,"construction":15.02254084,"finance":7.714856821,"manufacturing":10.94871807},{"date":"01/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/01/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/01/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/01/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/01/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/01/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/01/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/01/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/01/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/01/1997","all_workers":11.22262399,"hourly_workers":14.84808763,"non_hourly_workers":6.330391006,"less_than_high_school":18.28218149,"high_school":12.39250648,"some_college":11.57592433,"college":7.437424336,"construction":15.84851833,"finance":10.38351134,"manufacturing":10.57434906},{"date":"09/01/1997","all_workers":11.02009478,"hourly_workers":14.52341543,"non_hourly_workers":6.278534987,"less_than_high_school":18.37148461,"high_school":12.20460522,"some_college":11.34592963,"college":7.181272482,"construction":16.30753637,"finance":10.58288625,"manufacturing":10.47523995},{"date":"10/01/1997","all_workers":11.14036951,"hourly_workers":14.61167065,"non_hourly_workers":6.435751817,"less_than_high_school":17.37816078,"high_school":12.21083049,"some_college":11.78033803,"college":7.406533767,"construction":16.43601246,"finance":10.54033566,"manufacturing":10.60536413},{"date":"11/01/1997","all_workers":11.06441156,"hourly_workers":14.26868718,"non_hourly_workers":6.712954324,"less_than_high_school":17.3520625,"high_school":12.01914495,"some_college":11.58346359,"college":7.506432562,"construction":16.32481762,"finance":10.28574321,"manufacturing":10.88136393},{"date":"12/01/1997","all_workers":11.08095704,"hourly_workers":14.38492627,"non_hourly_workers":6.67262765,"less_than_high_school":16.69632127,"high_school":12.10465658,"some_college":11.61392505,"college":7.665673147,"construction":16.54178205,"finance":10.45183794,"manufacturing":10.92331365},{"date":"01/01/1998","all_workers":11.0870896,"hourly_workers":14.55805374,"non_hourly_workers":6.432704687,"less_than_high_school":16.56103547,"high_school":12.42668363,"some_college":11.47506648,"college":7.506983375,"construction":17.81358283,"finance":10.34929776,"manufacturing":11.09059481},{"date":"02/01/1998","all_workers":10.81555011,"hourly_workers":14.34969014,"non_hourly_workers":6.133655918,"less_than_high_school":15.73090484,"high_school":12.46241817,"some_college":11.14224843,"college":7.207450105,"construction":18.25296499,"finance":10.07354722,"manufacturing":10.47417814},{"date":"03/01/1998","all_workers":10.90644714,"hourly_workers":14.52515613,"non_hourly_workers":6.148632541,"less_than_high_school":15.55226364,"high_school":12.49775092,"some_college":11.21808405,"college":7.40472128,"construction":17.88051496,"finance":10.11765765,"manufacturing":10.50235436},{"date":"04/01/1998","all_workers":10.62299406,"hourly_workers":14.1889311,"non_hourly_workers":5.968444088,"less_than_high_school":14.96105788,"high_school":12.07051029,"some_college":11.05645044,"college":7.273176548,"construction":17.26437953,"finance":8.838242044,"manufacturing":9.992697133},{"date":"05/01/1998","all_workers":10.47215408,"hourly_workers":13.99866201,"non_hourly_workers":5.859762406,"less_than_high_school":14.92388011,"high_school":11.73498627,"some_college":11.28203874,"college":6.969171278,"construction":16.77772805,"finance":8.539859846,"manufacturing":10.20614574},{"date":"06/01/1998","all_workers":10.49872189,"hourly_workers":14.22363168,"non_hourly_workers":5.616179816,"less_than_high_school":15.11461902,"high_school":12.12698019,"some_college":11.18576034,"college":6.688019369,"construction":16.29726547,"finance":9.068991831,"manufacturing":10.2191011},{"date":"07/01/1998","all_workers":10.42780953,"hourly_workers":14.08461612,"non_hourly_workers":5.493800469,"less_than_high_school":14.8682539,"high_school":12.12411859,"some_college":11.11419389,"college":6.508673109,"construction":16.80691734,"finance":8.927213106,"manufacturing":10.27324885},{"date":"08/01/1998","all_workers":10.30715753,"hourly_workers":13.9436105,"non_hourly_workers":5.409867802,"less_than_high_school":13.61628076,"high_school":12.23492585,"some_college":11.06117185,"college":6.509451291,"construction":15.17100852,"finance":8.324504778,"manufacturing":10.49647691},{"date":"09/01/1998","all_workers":10.5739952,"hourly_workers":14.30326042,"non_hourly_workers":5.552478132,"less_than_high_school":13.92938533,"high_school":12.52013227,"some_college":11.20072515,"college":6.83228212,"construction":14.64279552,"finance":9.200814207,"manufacturing":10.77325756},{"date":"10/01/1998","all_workers":10.42674729,"hourly_workers":14.10755344,"non_hourly_workers":5.505234223,"less_than_high_school":14.37401947,"high_school":12.47337358,"some_college":10.70523627,"college":6.721291811,"construction":14.39677266,"finance":9.190825899,"manufacturing":10.78549937},{"date":"11/01/1998","all_workers":10.47757787,"hourly_workers":14.25074748,"non_hourly_workers":5.46338216,"less_than_high_school":14.0222302,"high_school":12.50703348,"some_college":10.84318561,"college":6.812715723,"construction":13.86615165,"finance":8.950431371,"manufacturing":10.82319998},{"date":"12/01/1998","all_workers":10.44796489,"hourly_workers":14.17989795,"non_hourly_workers":5.457790161,"less_than_high_school":14.39578323,"high_school":12.3724203,"some_college":10.82352465,"college":6.766422634,"construction":13.4488763,"finance":8.407646463,"manufacturing":10.35446932},{"date":"01/01/1999","all_workers":10.26793509,"hourly_workers":13.86283517,"non_hourly_workers":5.481256704,"less_than_high_school":14.30300443,"high_school":12.08858064,"some_college":10.78407175,"college":6.531316502,"construction":11.87975753,"finance":8.482490618,"manufacturing":9.987460816},{"date":"02/01/1999","all_workers":10.29543831,"hourly_workers":13.82608438,"non_hourly_workers":5.56974908,"less_than_high_school":14.75626031,"high_school":11.95507175,"some_college":10.58082409,"college":6.767171891,"construction":11.70693636,"finance":8.182494553,"manufacturing":10.30367004},{"date":"03/01/1999","all_workers":10.23912487,"hourly_workers":13.72713235,"non_hourly_workers":5.543255517,"less_than_high_school":14.36832569,"high_school":12.06619427,"some_college":10.55109018,"college":6.664592407,"construction":11.95563393,"finance":7.969601688,"manufacturing":10.26462801},{"date":"04/01/1999","all_workers":10.43976811,"hourly_workers":14.08674021,"non_hourly_workers":5.563809555,"less_than_high_school":14.55831611,"high_school":12.34274277,"some_college":10.67234733,"college":6.902280028,"construction":12.59591408,"finance":8.565249296,"manufacturing":10.65520651},{"date":"05/01/1999","all_workers":10.57982142,"hourly_workers":14.17120533,"non_hourly_workers":5.806252798,"less_than_high_school":14.84838159,"high_school":12.70669275,"some_college":10.70828851,"college":6.84792293,"construction":13.60504195,"finance":8.360525308,"manufacturing":10.30119402},{"date":"06/01/1999","all_workers":10.35041494,"hourly_workers":13.79666569,"non_hourly_workers":5.742219785,"less_than_high_school":14.37919569,"high_school":12.11826942,"some_college":10.37905197,"college":7.144260559,"construction":12.97211282,"finance":7.778789555,"manufacturing":9.845692286},{"date":"07/01/1999","all_workers":10.44377057,"hourly_workers":13.93296306,"non_hourly_workers":5.894322647,"less_than_high_school":14.68505145,"high_school":12.2988758,"some_college":10.58200558,"college":7.021549411,"construction":12.66517757,"finance":7.765863553,"manufacturing":10.32674961},{"date":"08/01/1999","all_workers":10.41080622,"hourly_workers":13.96966906,"non_hourly_workers":5.808858369,"less_than_high_school":15.15047396,"high_school":12.37651393,"some_college":10.27371113,"college":6.993615435,"construction":12.64628182,"finance":7.745866191,"manufacturing":10.24485941},{"date":"09/01/1999","all_workers":10.35158921,"hourly_workers":13.85580008,"non_hourly_workers":5.830199469,"less_than_high_school":15.05022544,"high_school":12.27294071,"some_college":10.2156929,"college":7.073129565,"construction":13.00128995,"finance":6.92577321,"manufacturing":9.816324201},{"date":"10/01/1999","all_workers":10.46736358,"hourly_workers":14.10290362,"non_hourly_workers":5.79025432,"less_than_high_school":15.16343096,"high_school":12.44874857,"some_college":10.45730421,"college":7.022870955,"construction":13.07105334,"finance":7.215849401,"manufacturing":10.1447241},{"date":"11/01/1999","all_workers":10.3062278,"hourly_workers":14.00050813,"non_hourly_workers":5.614904111,"less_than_high_school":14.94736292,"high_school":12.36946932,"some_college":10.29851007,"college":6.842142086,"construction":12.69580283,"finance":7.032167215,"manufacturing":10.35427408},{"date":"12/01/1999","all_workers":10.35457824,"hourly_workers":14.04442452,"non_hourly_workers":5.719638473,"less_than_high_school":15.1234307,"high_school":12.69748678,"some_college":10.06305675,"college":6.910069005,"construction":13.41384525,"finance":7.288814291,"manufacturing":10.80400222},{"date":"01/01/2000","all_workers":10.60517634,"hourly_workers":14.42287372,"non_hourly_workers":5.782614944,"less_than_high_school":16.19665089,"high_school":12.72452132,"some_college":10.15556833,"college":7.365727916,"construction":14.10304731,"finance":7.245923197,"manufacturing":10.80050639},{"date":"02/01/2000","all_workers":10.68094088,"hourly_workers":14.53762058,"non_hourly_workers":5.818996703,"less_than_high_school":16.40220691,"high_school":12.79761834,"some_college":10.40616259,"college":7.270416131,"construction":14.16592576,"finance":7.796288104,"manufacturing":10.67403563},{"date":"03/01/2000","all_workers":10.76730529,"hourly_workers":14.63851345,"non_hourly_workers":5.936250416,"less_than_high_school":16.2648876,"high_school":12.86968608,"some_college":10.46934585,"college":7.469734787,"construction":14.60558353,"finance":8.374325553,"manufacturing":10.62803296},{"date":"04/01/2000","all_workers":10.61873032,"hourly_workers":14.29745055,"non_hourly_workers":5.999822606,"less_than_high_school":16.58158921,"high_school":12.76138827,"some_college":10.30767472,"college":7.144314387,"construction":13.94679216,"finance":8.858396311,"manufacturing":10.3358071},{"date":"05/01/2000","all_workers":10.76345665,"hourly_workers":14.56678593,"non_hourly_workers":5.960318454,"less_than_high_school":17.21917127,"high_school":12.59855953,"some_college":10.43776031,"college":7.457359507,"construction":13.57132381,"finance":9.482872299,"manufacturing":10.73132707},{"date":"06/01/2000","all_workers":11.16016537,"hourly_workers":15.02403508,"non_hourly_workers":6.338679131,"less_than_high_school":18.06675411,"high_school":13.30289432,"some_college":11.1269743,"college":7.262763996,"construction":14.58194358,"finance":9.453592656,"manufacturing":11.21994105},{"date":"07/01/2000","all_workers":10.99180807,"hourly_workers":14.88015042,"non_hourly_workers":6.134114309,"less_than_high_school":17.83724549,"high_school":13.27763344,"some_college":10.73273276,"college":7.184892826,"construction":13.78991898,"finance":9.425779617,"manufacturing":10.78162543},{"date":"08/01/2000","all_workers":11.20942258,"hourly_workers":15.11894889,"non_hourly_workers":6.294770652,"less_than_high_school":17.08700378,"high_school":13.53878024,"some_college":11.09908447,"college":7.537633578,"construction":15.41097347,"finance":9.181437029,"manufacturing":11.06183864},{"date":"09/01/2000","all_workers":11.13283085,"hourly_workers":15.13902437,"non_hourly_workers":6.188536201,"less_than_high_school":17.15532357,"high_school":13.465695,"some_college":11.17226884,"college":7.298513735,"construction":16.10557437,"finance":9.310830643,"manufacturing":10.95984294},{"date":"10/01/2000","all_workers":11.23452765,"hourly_workers":15.16724063,"non_hourly_workers":6.336149637,"less_than_high_school":17.57152719,"high_school":13.50582089,"some_college":10.94820496,"college":7.681345964,"construction":16.49664525,"finance":9.499762482,"manufacturing":11.02832265},{"date":"11/01/2000","all_workers":11.24501708,"hourly_workers":15.00218432,"non_hourly_workers":6.558972152,"less_than_high_school":18.52430065,"high_school":13.14249238,"some_college":10.82036131,"college":7.956583589,"construction":16.79271821,"finance":9.555612654,"manufacturing":10.8438666},{"date":"12/01/2000","all_workers":11.31286857,"hourly_workers":14.9581712,"non_hourly_workers":6.749830181,"less_than_high_school":18.50867063,"high_school":12.80949756,"some_college":11.23466241,"college":8.094589232,"construction":15.64642166,"finance":9.956664839,"manufacturing":10.88671193},{"date":"01/01/2001","all_workers":11.43702209,"hourly_workers":14.95340129,"non_hourly_workers":7.020423849,"less_than_high_school":18.14541531,"high_school":12.88837166,"some_college":11.50296468,"college":8.21591219,"construction":15.86326166,"finance":10.47429472,"manufacturing":11.13790936},{"date":"02/01/2001","all_workers":11.33783112,"hourly_workers":14.87769721,"non_hourly_workers":6.895447718,"less_than_high_school":17.81779221,"high_school":12.85730413,"some_college":11.33610296,"college":8.173696982,"construction":15.79673854,"finance":10.08160237,"manufacturing":10.87776587},{"date":"03/01/2001","all_workers":11.45561876,"hourly_workers":15.01872797,"non_hourly_workers":6.973928207,"less_than_high_school":18.22794907,"high_school":13.02744682,"some_college":11.52762627,"college":8.134214649,"construction":16.63194053,"finance":9.737610365,"manufacturing":11.43430326},{"date":"04/01/2001","all_workers":11.47280787,"hourly_workers":14.97009357,"non_hourly_workers":7.104601991,"less_than_high_school":18.49258093,"high_school":12.73913536,"some_college":11.70003626,"college":8.286271714,"construction":17.68352387,"finance":8.969497476,"manufacturing":11.86751866},{"date":"05/01/2001","all_workers":11.37372737,"hourly_workers":14.78721419,"non_hourly_workers":7.11689288,"less_than_high_school":17.49050931,"high_school":13.10643621,"some_college":11.44549388,"college":8.209270077,"construction":16.77440752,"finance":8.9597754,"manufacturing":11.86507144},{"date":"06/01/2001","all_workers":11.23068954,"hourly_workers":14.7561938,"non_hourly_workers":6.756372558,"less_than_high_school":17.22284782,"high_school":13.02978217,"some_college":11.10312214,"college":8.11641881,"construction":16.11814954,"finance":8.884418626,"manufacturing":12.02620654},{"date":"07/01/2001","all_workers":11.30138706,"hourly_workers":14.65959194,"non_hourly_workers":7.069773044,"less_than_high_school":17.12060802,"high_school":13.00613742,"some_college":11.30422056,"college":8.262887628,"construction":16.80071854,"finance":8.924020869,"manufacturing":12.17630665},{"date":"08/01/2001","all_workers":11.08392068,"hourly_workers":14.27867767,"non_hourly_workers":7.085044185,"less_than_high_school":17.42194216,"high_school":12.77801612,"some_college":10.93310489,"college":8.051347282,"construction":15.82614393,"finance":9.669942292,"manufacturing":12.10412143},{"date":"09/01/2001","all_workers":11.25062583,"hourly_workers":14.32438888,"non_hourly_workers":7.399459354,"less_than_high_school":17.5273618,"high_school":12.76113417,"some_college":11.0382752,"college":8.412856687,"construction":14.88427626,"finance":9.283953516,"manufacturing":12.77695614},{"date":"10/01/2001","all_workers":11.1692162,"hourly_workers":14.32421366,"non_hourly_workers":7.279628967,"less_than_high_school":17.41934463,"high_school":12.66452782,"some_college":11.18628882,"college":8.13905008,"construction":14.24375223,"finance":8.540331514,"manufacturing":12.77679686},{"date":"11/01/2001","all_workers":11.29728297,"hourly_workers":14.5721346,"non_hourly_workers":7.246184113,"less_than_high_school":16.8156475,"high_school":13.31806539,"some_college":11.13332509,"college":8.097681696,"construction":14.50968904,"finance":8.959811666,"manufacturing":12.70995569},{"date":"12/01/2001","all_workers":11.4029701,"hourly_workers":14.75344941,"non_hourly_workers":7.242333487,"less_than_high_school":16.93510515,"high_school":13.80843701,"some_college":10.92506361,"college":8.120062393,"construction":15.77283382,"finance":8.51412775,"manufacturing":13.18549724},{"date":"01/01/2002","all_workers":11.23998135,"hourly_workers":14.73731336,"non_hourly_workers":6.996440245,"less_than_high_school":16.04309025,"high_school":14.16412419,"some_college":10.66748497,"college":7.763077455,"construction":14.90256226,"finance":8.293733845,"manufacturing":13.71726067},{"date":"02/01/2002","all_workers":11.51342957,"hourly_workers":15.01015874,"non_hourly_workers":7.220454958,"less_than_high_school":16.78402509,"high_school":14.70993786,"some_college":10.73330099,"college":7.885725638,"construction":15.45619926,"finance":9.465351251,"manufacturing":14.33352704},{"date":"03/01/2002","all_workers":11.47128708,"hourly_workers":14.90920133,"non_hourly_workers":7.257259217,"less_than_high_school":17.1706491,"high_school":14.35458418,"some_college":10.77398977,"college":7.888937236,"construction":14.27467718,"finance":9.400174236,"manufacturing":14.05209095},{"date":"04/01/2002","all_workers":11.6960495,"hourly_workers":15.21355392,"non_hourly_workers":7.383165921,"less_than_high_school":17.08123572,"high_school":14.88359152,"some_college":10.70964649,"college":8.151945483,"construction":13.94632152,"finance":9.487987512,"manufacturing":14.06456843},{"date":"05/01/2002","all_workers":11.6753007,"hourly_workers":15.19505792,"non_hourly_workers":7.37850292,"less_than_high_school":17.3385561,"high_school":14.5251459,"some_college":10.99953618,"college":8.068645627,"construction":14.1505568,"finance":9.409015314,"manufacturing":14.24498793},{"date":"06/01/2002","all_workers":11.67300468,"hourly_workers":15.03844432,"non_hourly_workers":7.648790973,"less_than_high_school":16.80908412,"high_school":14.42498358,"some_college":11.38338315,"college":8.001331701,"construction":14.37959621,"finance":9.955732225,"manufacturing":14.25978416},{"date":"07/01/2002","all_workers":11.69427176,"hourly_workers":15.21490245,"non_hourly_workers":7.437385081,"less_than_high_school":17.02064731,"high_school":14.34083701,"some_college":11.23110651,"college":8.250700789,"construction":14.28023408,"finance":10.01496923,"manufacturing":14.34585497},{"date":"08/01/2002","all_workers":11.89795108,"hourly_workers":15.59873153,"non_hourly_workers":7.414381823,"less_than_high_school":17.89221707,"high_school":14.28186376,"some_college":11.68969665,"college":8.292226037,"construction":14.52588606,"finance":9.569096747,"manufacturing":14.63581313},{"date":"09/01/2002","all_workers":11.9748067,"hourly_workers":15.8694852,"non_hourly_workers":7.218572437,"less_than_high_school":18.30030087,"high_school":14.53832339,"some_college":11.74353266,"college":8.232759099,"construction":15.4203024,"finance":10.42897256,"manufacturing":14.73185802},{"date":"10/01/2002","all_workers":12.02305598,"hourly_workers":15.87017644,"non_hourly_workers":7.295453192,"less_than_high_school":17.96156103,"high_school":14.94366858,"some_college":11.5287157,"college":8.370472605,"construction":15.79087026,"finance":10.74625557,"manufacturing":14.39125136},{"date":"11/01/2002","all_workers":12.13950576,"hourly_workers":16.16839421,"non_hourly_workers":7.212420177,"less_than_high_school":17.86855188,"high_school":15.44830526,"some_college":11.99954873,"college":7.979103915,"construction":15.53931374,"finance":10.30885621,"manufacturing":14.55763238},{"date":"12/01/2002","all_workers":12.06974213,"hourly_workers":16.11789418,"non_hourly_workers":7.099645732,"less_than_high_school":17.53178715,"high_school":15.3647679,"some_college":12.14741569,"college":7.773705843,"construction":15.48189047,"finance":10.13801223,"manufacturing":14.12291129},{"date":"01/01/2003","all_workers":12.32571669,"hourly_workers":16.30797722,"non_hourly_workers":7.361114594,"less_than_high_school":18.23031057,"high_school":15.46826646,"some_college":12.2744126,"college":8.133224743,"construction":16.61647224,"finance":10.07578399,"manufacturing":14.02629699},{"date":"02/01/2003","all_workers":12.19190355,"hourly_workers":16.12836393,"non_hourly_workers":7.309796811,"less_than_high_school":18.15788325,"high_school":15.10953543,"some_college":12.02882597,"college":8.284811583,"construction":15.90276702,"finance":9.855005253,"manufacturing":13.79725153},{"date":"03/01/2003","all_workers":12.29300441,"hourly_workers":16.36529277,"non_hourly_workers":7.231538291,"less_than_high_school":18.70520192,"high_school":15.39119882,"some_college":11.99449777,"college":8.192684744,"construction":16.9334348,"finance":9.999884249,"manufacturing":14.39613389},{"date":"04/01/2003","all_workers":12.23323322,"hourly_workers":16.40370518,"non_hourly_workers":6.985678271,"less_than_high_school":18.67988482,"high_school":15.3308693,"some_college":12.23366603,"college":7.789227461,"construction":16.24105215,"finance":10.11378544,"manufacturing":14.43463501},{"date":"05/01/2003","all_workers":12.2149996,"hourly_workers":16.3031797,"non_hourly_workers":7.025041514,"less_than_high_school":18.98981435,"high_school":15.3277867,"some_college":12.09315242,"college":7.809255314,"construction":17.25912758,"finance":9.8400059,"manufacturing":13.95054131},{"date":"06/01/2003","all_workers":12.40710646,"hourly_workers":16.44694988,"non_hourly_workers":7.258315563,"less_than_high_school":19.97173512,"high_school":15.52367107,"some_college":11.69695639,"college":8.298349146,"construction":17.3556336,"finance":9.188870401,"manufacturing":13.94382237},{"date":"07/01/2003","all_workers":12.63972822,"hourly_workers":16.76103764,"non_hourly_workers":7.391819704,"less_than_high_school":19.98333334,"high_school":15.83474728,"some_college":12.28996152,"college":8.209465781,"construction":18.55537532,"finance":9.810705621,"manufacturing":13.87639096},{"date":"08/01/2003","all_workers":12.6731404,"hourly_workers":16.93515967,"non_hourly_workers":7.330514596,"less_than_high_school":20.0438959,"high_school":16.01163465,"some_college":12.057281,"college":8.415633556,"construction":19.26934323,"finance":9.899781649,"manufacturing":13.97637871},{"date":"09/01/2003","all_workers":12.82942392,"hourly_workers":16.97191926,"non_hourly_workers":7.550339107,"less_than_high_school":20.21230212,"high_school":15.87099004,"some_college":12.18765408,"college":8.788521276,"construction":18.852917,"finance":9.382792431,"manufacturing":14.02857919},{"date":"10/01/2003","all_workers":12.9136579,"hourly_workers":17.08191678,"non_hourly_workers":7.547775205,"less_than_high_school":19.31877837,"high_school":16.0763699,"some_college":12.4278827,"college":8.750773575,"construction":19.68406889,"finance":9.578057723,"manufacturing":14.70702005},{"date":"11/01/2003","all_workers":12.8175588,"hourly_workers":16.76152736,"non_hourly_workers":7.678668957,"less_than_high_school":19.78466694,"high_school":15.25431616,"some_college":12.3902804,"college":9.046479065,"construction":21.36094279,"finance":9.626514241,"manufacturing":14.63307757},{"date":"12/01/2003","all_workers":13.01531445,"hourly_workers":17.01529029,"non_hourly_workers":7.800728974,"less_than_high_school":20.44483753,"high_school":15.26814469,"some_college":12.55786385,"college":9.366397288,"construction":21.6728138,"finance":10.08031319,"manufacturing":15.37999912},{"date":"01/01/2004","all_workers":12.83188441,"hourly_workers":16.75772827,"non_hourly_workers":7.693958787,"less_than_high_school":20.73018513,"high_school":14.91242492,"some_college":12.44435233,"college":9.197873495,"construction":21.50925821,"finance":10.02761025,"manufacturing":14.9921183},{"date":"02/01/2004","all_workers":13.00541193,"hourly_workers":17.08789558,"non_hourly_workers":7.664493489,"less_than_high_school":19.97813151,"high_school":15.20967144,"some_college":12.97479518,"college":9.157948132,"construction":21.94030905,"finance":9.582629055,"manufacturing":15.32211933},{"date":"03/01/2004","all_workers":12.99382768,"hourly_workers":17.1666808,"non_hourly_workers":7.579628814,"less_than_high_school":19.18757364,"high_school":15.13015649,"some_college":13.1824665,"college":9.320822892,"construction":21.91455025,"finance":9.86042179,"manufacturing":14.72367481},{"date":"04/01/2004","all_workers":13.11441298,"hourly_workers":17.41469369,"non_hourly_workers":7.549112421,"less_than_high_school":19.41517437,"high_school":15.09251296,"some_college":13.25536533,"college":9.602161622,"construction":23.05464894,"finance":10.23630608,"manufacturing":14.76586442},{"date":"05/01/2004","all_workers":13.39902328,"hourly_workers":17.84880045,"non_hourly_workers":7.710494339,"less_than_high_school":19.63222521,"high_school":15.4035852,"some_college":13.52358178,"college":9.851485745,"construction":21.64022095,"finance":10.17793035,"manufacturing":15.75579863},{"date":"06/01/2004","all_workers":13.50637495,"hourly_workers":18.10507541,"non_hourly_workers":7.649064439,"less_than_high_school":20.20088173,"high_school":15.12251246,"some_college":13.79241943,"college":10.0516143,"construction":22.17645236,"finance":11.420075,"manufacturing":15.9057922},{"date":"07/01/2004","all_workers":13.45957011,"hourly_workers":18.04391584,"non_hourly_workers":7.623954845,"less_than_high_school":19.8160768,"high_school":15.09660312,"some_college":13.72007248,"college":10.03908754,"construction":21.15980985,"finance":10.91638402,"manufacturing":16.17116098},{"date":"08/01/2004","all_workers":13.5093923,"hourly_workers":17.96945022,"non_hourly_workers":7.726571572,"less_than_high_school":19.49866624,"high_school":15.37097787,"some_college":13.74741055,"college":9.973609565,"construction":20.63802363,"finance":10.51902612,"manufacturing":15.56741399},{"date":"09/01/2004","all_workers":13.07650986,"hourly_workers":17.49126876,"non_hourly_workers":7.442408969,"less_than_high_school":18.61771764,"high_school":15.13740171,"some_college":13.66494286,"college":9.18977601,"construction":20.48164324,"finance":10.72509567,"manufacturing":15.03674478},{"date":"10/01/2004","all_workers":13.1179794,"hourly_workers":17.54500015,"non_hourly_workers":7.394800912,"less_than_high_school":19.7170386,"high_school":14.8056767,"some_college":13.85406124,"college":9.186267326,"construction":19.6155183,"finance":11.35152347,"manufacturing":14.73792515},{"date":"11/01/2004","all_workers":13.15860089,"hourly_workers":17.70837026,"non_hourly_workers":7.299414018,"less_than_high_school":19.96123602,"high_school":14.8941801,"some_college":13.77164807,"college":9.270291872,"construction":18.22193069,"finance":11.71378486,"manufacturing":15.01583146},{"date":"12/01/2004","all_workers":13.14030944,"hourly_workers":17.67221906,"non_hourly_workers":7.30526297,"less_than_high_school":19.79928417,"high_school":14.88657369,"some_college":13.93030344,"college":9.106618119,"construction":16.98658765,"finance":11.70107359,"manufacturing":14.54582911},{"date":"01/01/2005","all_workers":13.13699075,"hourly_workers":17.75784239,"non_hourly_workers":7.248218006,"less_than_high_school":19.56101621,"high_school":14.88349662,"some_college":13.96160735,"college":9.147154876,"construction":16.88857923,"finance":11.9983907,"manufacturing":14.61786471},{"date":"02/01/2005","all_workers":13.14846232,"hourly_workers":17.62245803,"non_hourly_workers":7.509972247,"less_than_high_school":20.00295543,"high_school":14.36866751,"some_college":13.94024112,"college":9.505986019,"construction":17.29850709,"finance":11.64759321,"manufacturing":14.19893615},{"date":"03/01/2005","all_workers":13.16858321,"hourly_workers":17.51446067,"non_hourly_workers":7.635029469,"less_than_high_school":20.2537501,"high_school":14.73570715,"some_college":13.68975364,"college":9.407103185,"construction":16.57139737,"finance":10.83407664,"manufacturing":14.48104625},{"date":"04/01/2005","all_workers":12.99118762,"hourly_workers":17.26492297,"non_hourly_workers":7.630517617,"less_than_high_school":19.93601476,"high_school":15.00445694,"some_college":13.31448561,"college":9.204630548,"construction":15.90771867,"finance":10.79802518,"manufacturing":14.53250427},{"date":"05/01/2005","all_workers":12.92745785,"hourly_workers":17.20422825,"non_hourly_workers":7.571434038,"less_than_high_school":19.05470749,"high_school":15.00729177,"some_college":13.32693105,"college":9.269465685,"construction":17.17295371,"finance":11.17665309,"manufacturing":13.85107134},{"date":"06/01/2005","all_workers":12.6706327,"hourly_workers":16.89756071,"non_hourly_workers":7.388488957,"less_than_high_school":18.41568392,"high_school":14.94256654,"some_college":12.93694341,"college":9.089195228,"construction":16.96250214,"finance":9.932019828,"manufacturing":13.50982918},{"date":"07/01/2005","all_workers":12.51418072,"hourly_workers":16.48297543,"non_hourly_workers":7.570537833,"less_than_high_school":18.46407863,"high_school":14.76824949,"some_college":12.52683785,"college":9.168893654,"construction":16.36578643,"finance":9.627424105,"manufacturing":13.04328816},{"date":"08/01/2005","all_workers":12.36105518,"hourly_workers":16.24561007,"non_hourly_workers":7.544410279,"less_than_high_school":18.57760785,"high_school":14.53644171,"some_college":12.46321378,"college":8.890841572,"construction":16.2274447,"finance":9.747231188,"manufacturing":13.15392231},{"date":"09/01/2005","all_workers":12.70802205,"hourly_workers":16.69643746,"non_hourly_workers":7.6501746,"less_than_high_school":19.34526855,"high_school":14.59382095,"some_college":12.66537089,"college":9.496145466,"construction":16.53026925,"finance":10.1304165,"manufacturing":12.90903577},{"date":"10/01/2005","all_workers":12.65724359,"hourly_workers":16.66032559,"non_hourly_workers":7.737371612,"less_than_high_school":18.84202324,"high_school":14.53690004,"some_college":12.91429765,"college":9.416561499,"construction":17.01814451,"finance":9.112419953,"manufacturing":12.81336432},{"date":"11/01/2005","all_workers":12.70150477,"hourly_workers":16.7581871,"non_hourly_workers":7.672526559,"less_than_high_school":18.64097084,"high_school":14.65590109,"some_college":13.05859291,"college":9.280672107,"construction":17.14857807,"finance":8.764411549,"manufacturing":12.70420867},{"date":"12/01/2005","all_workers":12.67318477,"hourly_workers":16.72388847,"non_hourly_workers":7.625839165,"less_than_high_school":18.79845522,"high_school":14.63387997,"some_college":12.62569323,"college":9.6001452,"construction":17.92563461,"finance":8.92044153,"manufacturing":12.64483331},{"date":"01/01/2006","all_workers":12.7159712,"hourly_workers":16.73258358,"non_hourly_workers":7.709207584,"less_than_high_school":19.08006263,"high_school":14.76444489,"some_college":12.40352048,"college":9.764620937,"construction":17.96103096,"finance":8.36489611,"manufacturing":12.79235314},{"date":"02/01/2006","all_workers":12.54205207,"hourly_workers":16.55553548,"non_hourly_workers":7.512854617,"less_than_high_school":19.05016589,"high_school":14.92277482,"some_college":12.09862258,"college":9.446426338,"construction":17.38242861,"finance":8.752344208,"manufacturing":12.66493977},{"date":"03/01/2006","all_workers":12.4541169,"hourly_workers":16.33529876,"non_hourly_workers":7.616709163,"less_than_high_school":18.09080956,"high_school":14.55170629,"some_college":12.06062429,"college":9.730130115,"construction":17.29968435,"finance":8.755301028,"manufacturing":12.74599267},{"date":"04/01/2006","all_workers":12.55306397,"hourly_workers":16.56686689,"non_hourly_workers":7.590031358,"less_than_high_school":18.60783696,"high_school":14.45942167,"some_college":12.29431494,"college":9.716809187,"construction":16.68815491,"finance":9.200031402,"manufacturing":12.39081702},{"date":"05/01/2006","all_workers":12.2617725,"hourly_workers":16.08726481,"non_hourly_workers":7.532842651,"less_than_high_school":18.67873785,"high_school":14.30395178,"some_college":11.79066976,"college":9.411458681,"construction":15.49389374,"finance":9.008102996,"manufacturing":12.39360721},{"date":"06/01/2006","all_workers":12.38436777,"hourly_workers":16.21688372,"non_hourly_workers":7.581058396,"less_than_high_school":18.06094527,"high_school":14.51576369,"some_college":12.07581974,"college":9.476650106,"construction":14.54481614,"finance":9.177690476,"manufacturing":12.70809198},{"date":"07/01/2006","all_workers":12.48616229,"hourly_workers":16.46717219,"non_hourly_workers":7.502622663,"less_than_high_school":18.70115638,"high_school":14.29890861,"some_college":12.36285346,"college":9.548927198,"construction":15.28143067,"finance":8.875734375,"manufacturing":13.23240095},{"date":"08/01/2006","all_workers":12.49493046,"hourly_workers":16.49926873,"non_hourly_workers":7.442260134,"less_than_high_school":18.92862531,"high_school":14.32279131,"some_college":12.07780732,"college":9.742571904,"construction":15.03394748,"finance":8.643006264,"manufacturing":13.43275595},{"date":"09/01/2006","all_workers":12.28016642,"hourly_workers":16.25536419,"non_hourly_workers":7.379861618,"less_than_high_school":18.56584789,"high_school":14.16601307,"some_college":12.14447552,"college":9.294695448,"construction":14.73441865,"finance":8.337693599,"manufacturing":14.18913492},{"date":"10/01/2006","all_workers":12.25686733,"hourly_workers":16.29244085,"non_hourly_workers":7.249333781,"less_than_high_school":18.95473363,"high_school":14.19288432,"some_college":11.80813665,"college":9.352682735,"construction":14.02082522,"finance":8.975551316,"manufacturing":14.38449784},{"date":"11/01/2006","all_workers":12.08661243,"hourly_workers":15.98647499,"non_hourly_workers":7.339391128,"less_than_high_school":18.68786385,"high_school":14.06346647,"some_college":11.53667158,"college":9.351213482,"construction":13.82337964,"finance":9.704713378,"manufacturing":14.2451229},{"date":"12/01/2006","all_workers":11.86619977,"hourly_workers":15.74649048,"non_hourly_workers":7.227900505,"less_than_high_school":18.53703666,"high_school":13.63224574,"some_college":11.58089944,"college":9.03657997,"construction":13.92214975,"finance":9.210876027,"manufacturing":14.13905918},{"date":"01/01/2007","all_workers":11.66153198,"hourly_workers":15.43015392,"non_hourly_workers":7.142872492,"less_than_high_school":17.38093448,"high_school":13.26836197,"some_college":11.79314831,"college":8.831364631,"construction":12.67937936,"finance":9.758801884,"manufacturing":13.67987446},{"date":"02/01/2007","all_workers":11.6308659,"hourly_workers":15.37816533,"non_hourly_workers":7.136733084,"less_than_high_school":16.75427929,"high_school":13.24145124,"some_college":11.94646481,"college":8.771767567,"construction":12.56943266,"finance":9.799440007,"manufacturing":13.7948377},{"date":"03/01/2007","all_workers":11.48718018,"hourly_workers":15.18857924,"non_hourly_workers":7.052891523,"less_than_high_school":17.18729343,"high_school":13.05842546,"some_college":11.82190862,"college":8.532765132,"construction":12.23015148,"finance":11.27942262,"manufacturing":12.89508363},{"date":"04/01/2007","all_workers":11.36799223,"hourly_workers":14.94410812,"non_hourly_workers":6.972709579,"less_than_high_school":17.38990363,"high_school":12.65217436,"some_college":11.62516584,"college":8.555938539,"construction":13.47396234,"finance":10.49430759,"manufacturing":12.96410238},{"date":"05/01/2007","all_workers":11.47183954,"hourly_workers":15.16118796,"non_hourly_workers":6.942637405,"less_than_high_school":18.24627593,"high_school":12.36757518,"some_college":11.88799088,"college":8.642395905,"construction":14.19114485,"finance":10.83054412,"manufacturing":13.01832507},{"date":"06/01/2007","all_workers":11.402925,"hourly_workers":15.1312946,"non_hourly_workers":6.84556816,"less_than_high_school":18.65501102,"high_school":12.61814822,"some_college":11.86264261,"college":8.195124457,"construction":13.81925603,"finance":11.00218955,"manufacturing":13.01493237},{"date":"07/01/2007","all_workers":11.15313688,"hourly_workers":14.84008604,"non_hourly_workers":6.662986787,"less_than_high_school":17.45466384,"high_school":12.60001308,"some_college":11.77494475,"college":7.883066762,"construction":14.15176908,"finance":11.22237271,"manufacturing":12.06554789},{"date":"08/01/2007","all_workers":11.03287973,"hourly_workers":14.56547955,"non_hourly_workers":6.78985861,"less_than_high_school":17.22232273,"high_school":12.19734257,"some_college":11.87841834,"college":7.922989046,"construction":14.1902673,"finance":11.9906194,"manufacturing":11.33487203},{"date":"09/01/2007","all_workers":11.13049508,"hourly_workers":14.64814737,"non_hourly_workers":6.861568418,"less_than_high_school":16.91220626,"high_school":12.52299785,"some_college":11.43705036,"college":8.412239023,"construction":14.20714363,"finance":12.85265788,"manufacturing":10.69123533},{"date":"10/01/2007","all_workers":10.97513026,"hourly_workers":14.44530981,"non_hourly_workers":6.837079359,"less_than_high_school":16.12102469,"high_school":12.33407421,"some_college":11.41700396,"college":8.350769092,"construction":14.72383744,"finance":12.50527026,"manufacturing":10.40873146},{"date":"11/01/2007","all_workers":10.89873808,"hourly_workers":14.38862714,"non_hourly_workers":6.718406679,"less_than_high_school":15.39948141,"high_school":12.18709482,"some_college":11.53233229,"college":8.317511279,"construction":13.89822703,"finance":12.07687344,"manufacturing":10.00473486},{"date":"12/01/2007","all_workers":10.99991565,"hourly_workers":14.59788256,"non_hourly_workers":6.680609167,"less_than_high_school":15.40808589,"high_school":12.45030795,"some_college":11.761247,"college":8.221711511,"construction":13.63883045,"finance":12.05203053,"manufacturing":10.16345881},{"date":"01/01/2008","all_workers":11.16485964,"hourly_workers":14.95290657,"non_hourly_workers":6.649564156,"less_than_high_school":16.22436309,"high_school":12.40952372,"some_college":11.78175022,"college":8.510956954,"construction":13.97516634,"finance":12.02907363,"manufacturing":10.39461187},{"date":"02/01/2008","all_workers":11.13731169,"hourly_workers":15.07399608,"non_hourly_workers":6.495723336,"less_than_high_school":17.55801321,"high_school":12.46832116,"some_college":11.59135776,"college":8.304208927,"construction":13.95747973,"finance":11.6975857,"manufacturing":10.38045818},{"date":"03/01/2008","all_workers":11.05853211,"hourly_workers":15.02146,"non_hourly_workers":6.380348019,"less_than_high_school":17.46124644,"high_school":12.5135659,"some_college":11.4727848,"college":8.176785202,"construction":14.12532263,"finance":10.77704175,"manufacturing":10.74100383},{"date":"04/01/2008","all_workers":11.05863626,"hourly_workers":15.13714815,"non_hourly_workers":6.312735842,"less_than_high_school":16.46438176,"high_school":12.66708674,"some_college":11.7455842,"college":8.138448373,"construction":13.69669706,"finance":10.48474485,"manufacturing":10.66113252},{"date":"05/01/2008","all_workers":11.07272816,"hourly_workers":15.25501256,"non_hourly_workers":6.228568253,"less_than_high_school":16.29291772,"high_school":12.77500076,"some_college":11.87614052,"college":8.083725644,"construction":14.00100966,"finance":10.32497181,"manufacturing":11.03392352},{"date":"06/01/2008","all_workers":10.94142501,"hourly_workers":15.10246159,"non_hourly_workers":6.173038792,"less_than_high_school":16.2315997,"high_school":12.32738201,"some_college":11.59846168,"college":8.288733692,"construction":14.19917342,"finance":10.4737457,"manufacturing":10.57000305},{"date":"07/01/2008","all_workers":11.15920259,"hourly_workers":15.3219866,"non_hourly_workers":6.30305454,"less_than_high_school":17.17665364,"high_school":12.30707611,"some_college":11.65736273,"college":8.620645022,"construction":14.03863471,"finance":10.58552326,"manufacturing":11.54770137},{"date":"08/01/2008","all_workers":11.36076018,"hourly_workers":15.46712107,"non_hourly_workers":6.580607267,"less_than_high_school":16.67118224,"high_school":12.74990716,"some_college":11.87002767,"college":8.75712517,"construction":14.27002436,"finance":10.46473838,"manufacturing":11.77963596},{"date":"09/01/2008","all_workers":11.32263784,"hourly_workers":15.49416852,"non_hourly_workers":6.518368871,"less_than_high_school":16.98926962,"high_school":12.8851131,"some_college":12.07851184,"college":8.368594975,"construction":14.18001315,"finance":9.494445636,"manufacturing":11.96322238},{"date":"10/01/2008","all_workers":11.35958457,"hourly_workers":15.37153309,"non_hourly_workers":6.666293185,"less_than_high_school":17.36695521,"high_school":12.85924033,"some_college":12.11846138,"college":8.378192921,"construction":13.80813417,"finance":9.463544982,"manufacturing":11.98934778},{"date":"11/01/2008","all_workers":11.56934115,"hourly_workers":15.6783483,"non_hourly_workers":6.782813139,"less_than_high_school":17.6339162,"high_school":13.37836513,"some_college":12.2792906,"college":8.446423187,"construction":15.09165169,"finance":9.702740392,"manufacturing":12.74412135},{"date":"12/01/2008","all_workers":11.5976025,"hourly_workers":15.49866773,"non_hourly_workers":7.034246739,"less_than_high_school":18.72654805,"high_school":13.50567096,"some_college":11.89305841,"college":8.497940844,"construction":16.29286054,"finance":9.571726957,"manufacturing":12.51990516},{"date":"01/01/2009","all_workers":11.60843933,"hourly_workers":15.40550311,"non_hourly_workers":7.159391765,"less_than_high_school":18.26132794,"high_school":13.92762434,"some_college":11.88715703,"college":8.311245673,"construction":16.9732731,"finance":9.2709294,"manufacturing":13.13578657},{"date":"02/01/2009","all_workers":11.57454252,"hourly_workers":15.32564295,"non_hourly_workers":7.127775785,"less_than_high_school":17.69369669,"high_school":13.78794855,"some_college":11.97424197,"college":8.359449362,"construction":17.01014515,"finance":9.105682407,"manufacturing":12.95058951},{"date":"03/01/2009","all_workers":11.94114459,"hourly_workers":16.03077976,"non_hourly_workers":7.099754544,"less_than_high_school":18.52585264,"high_school":13.95795274,"some_college":12.55898682,"college":8.619258561,"construction":17.82542593,"finance":8.654114374,"manufacturing":13.48319645},{"date":"04/01/2009","all_workers":12.24289825,"hourly_workers":16.09299569,"non_hourly_workers":7.653148658,"less_than_high_school":18.5785631,"high_school":14.36805216,"some_college":12.6444103,"college":9.073674865,"construction":17.68112742,"finance":9.423357712,"manufacturing":14.04867746},{"date":"05/01/2009","all_workers":12.44813508,"hourly_workers":16.14834167,"non_hourly_workers":8.04111557,"less_than_high_school":18.37905706,"high_school":14.84520814,"some_college":12.62924825,"college":9.393506632,"construction":18.1780096,"finance":9.711786672,"manufacturing":13.94562147},{"date":"06/01/2009","all_workers":12.71644485,"hourly_workers":16.38793068,"non_hourly_workers":8.334899749,"less_than_high_school":18.57979367,"high_school":15.17111508,"some_college":13.03494168,"college":9.569788839,"construction":19.39453451,"finance":10.07806352,"manufacturing":14.84451268},{"date":"07/01/2009","all_workers":12.74787066,"hourly_workers":16.56361988,"non_hourly_workers":8.292031866,"less_than_high_school":18.08724653,"high_school":15.41449688,"some_college":13.17645078,"college":9.478842159,"construction":19.31691163,"finance":10.05272699,"manufacturing":14.31735846},{"date":"08/01/2009","all_workers":12.96763131,"hourly_workers":17.05210374,"non_hourly_workers":8.115712792,"less_than_high_school":18.22593154,"high_school":15.78720049,"some_college":13.55315875,"college":9.467823609,"construction":19.43146882,"finance":10.53239759,"manufacturing":15.20962501},{"date":"09/01/2009","all_workers":13.15701659,"hourly_workers":17.20629238,"non_hourly_workers":8.277677616,"less_than_high_school":17.93035168,"high_school":15.83074336,"some_college":13.66351781,"college":9.872915697,"construction":20.18930503,"finance":11.44226493,"manufacturing":15.13493327},{"date":"10/01/2009","all_workers":13.48728402,"hourly_workers":17.60419623,"non_hourly_workers":8.559141655,"less_than_high_school":18.44711387,"high_school":16.17876877,"some_college":14.04944376,"college":10.08580161,"construction":20.41771472,"finance":11.76054559,"manufacturing":15.45700159},{"date":"11/01/2009","all_workers":13.6556446,"hourly_workers":17.85026508,"non_hourly_workers":8.663140508,"less_than_high_school":19.31551246,"high_school":16.07847537,"some_college":14.08754433,"college":10.4255895,"construction":19.82858423,"finance":12.11722616,"manufacturing":15.41818778},{"date":"12/01/2009","all_workers":14.02298503,"hourly_workers":18.2671985,"non_hourly_workers":8.975314467,"less_than_high_school":18.47921091,"high_school":16.57720454,"some_college":14.68178279,"college":10.81908706,"construction":20.1874549,"finance":12.83582808,"manufacturing":15.30943078},{"date":"01/01/2010","all_workers":14.22392842,"hourly_workers":18.53605464,"non_hourly_workers":9.056928404,"less_than_high_school":18.8525766,"high_school":16.45167135,"some_college":15.18008001,"college":11.00108993,"construction":20.86388031,"finance":13.04588769,"manufacturing":14.44292375},{"date":"02/01/2010","all_workers":14.60784184,"hourly_workers":18.94687957,"non_hourly_workers":9.375904979,"less_than_high_school":18.53050901,"high_school":16.92018833,"some_college":15.7600264,"college":11.27870735,"construction":21.07525202,"finance":13.75657367,"manufacturing":15.38231711},{"date":"03/01/2010","all_workers":14.82413481,"hourly_workers":19.05664275,"non_hourly_workers":9.703688097,"less_than_high_school":18.03611606,"high_school":17.10885814,"some_college":15.99583157,"college":11.59404376,"construction":21.3512052,"finance":14.86154259,"manufacturing":15.34002596},{"date":"04/01/2010","all_workers":14.83105534,"hourly_workers":19.23157535,"non_hourly_workers":9.530670527,"less_than_high_school":18.74623539,"high_school":16.96879233,"some_college":15.90287549,"college":11.66658915,"construction":21.65388519,"finance":14.29762385,"manufacturing":15.19686763},{"date":"05/01/2010","all_workers":15.02069466,"hourly_workers":19.61975131,"non_hourly_workers":9.453038257,"less_than_high_school":18.84667896,"high_school":17.10767253,"some_college":16.22652101,"college":11.75098473,"construction":22.00778272,"finance":15.07792607,"manufacturing":15.16036774},{"date":"06/01/2010","all_workers":15.26923704,"hourly_workers":20.01933071,"non_hourly_workers":9.553126189,"less_than_high_school":19.25621048,"high_school":17.30332823,"some_college":16.70564947,"college":11.80842089,"construction":21.49827575,"finance":15.38364132,"manufacturing":15.2503388},{"date":"07/01/2010","all_workers":15.59085945,"hourly_workers":20.45648143,"non_hourly_workers":9.72954411,"less_than_high_school":19.4427112,"high_school":17.47798109,"some_college":17.13436504,"college":12.19981154,"construction":21.09392699,"finance":15.65162575,"manufacturing":15.81912015},{"date":"08/01/2010","all_workers":15.64143279,"hourly_workers":20.51104275,"non_hourly_workers":9.763023521,"less_than_high_school":19.91325954,"high_school":17.34799524,"some_college":17.17858538,"college":12.27547859,"construction":20.87388478,"finance":15.31965289,"manufacturing":15.60575315},{"date":"09/01/2010","all_workers":15.73789381,"hourly_workers":20.80572887,"non_hourly_workers":9.741783387,"less_than_high_school":20.7456154,"high_school":17.73178402,"some_college":17.35924636,"college":11.95940307,"construction":20.94078237,"finance":14.67822535,"manufacturing":16.04426036},{"date":"10/01/2010","all_workers":15.89439392,"hourly_workers":20.93498061,"non_hourly_workers":9.907525252,"less_than_high_school":20.29965634,"high_school":18.24419556,"some_college":17.2089823,"college":12.23934461,"construction":21.499824,"finance":15.25247338,"manufacturing":16.33542349},{"date":"11/01/2010","all_workers":15.79476796,"hourly_workers":20.67379735,"non_hourly_workers":9.958412795,"less_than_high_school":20.26661593,"high_school":17.83044728,"some_college":17.1563849,"college":12.33733723,"construction":21.35718849,"finance":14.35177253,"manufacturing":16.37269548},{"date":"12/01/2010","all_workers":15.88824166,"hourly_workers":21.00935035,"non_hourly_workers":9.711111384,"less_than_high_school":20.48634664,"high_school":17.91201901,"some_college":17.39316586,"college":12.30201941,"construction":20.94646623,"finance":14.45061291,"manufacturing":16.59575991},{"date":"01/01/2011","all_workers":16.03740964,"hourly_workers":21.13490953,"non_hourly_workers":9.848214365,"less_than_high_school":21.1680963,"high_school":18.37193919,"some_college":17.45597204,"college":12.23004037,"construction":21.9786604,"finance":14.96318592,"manufacturing":16.89479296},{"date":"02/01/2011","all_workers":16.08557355,"hourly_workers":21.1540295,"non_hourly_workers":9.922341268,"less_than_high_school":21.90196585,"high_school":18.14343892,"some_college":17.54377163,"college":12.33784685,"construction":21.72428503,"finance":15.75932522,"manufacturing":16.53770106},{"date":"03/01/2011","all_workers":16.0669447,"hourly_workers":21.11072506,"non_hourly_workers":10.00685383,"less_than_high_school":21.68388851,"high_school":18.17876645,"some_college":17.63551909,"college":12.29844966,"construction":21.82159712,"finance":16.16694496,"manufacturing":16.47687708},{"date":"04/01/2011","all_workers":16.25443149,"hourly_workers":21.412368,"non_hourly_workers":10.07491639,"less_than_high_school":21.64401467,"high_school":18.17427879,"some_college":18.16949297,"college":12.38024633,"construction":21.77826403,"finance":16.51524098,"manufacturing":16.63276012},{"date":"05/01/2011","all_workers":16.44848895,"hourly_workers":21.60392195,"non_hourly_workers":10.24144897,"less_than_high_school":21.84402619,"high_school":18.67972698,"some_college":18.02732973,"college":12.58947901,"construction":21.51971432,"finance":15.53726028,"manufacturing":16.40773007},{"date":"06/01/2011","all_workers":16.2887708,"hourly_workers":21.29176008,"non_hourly_workers":10.23390424,"less_than_high_school":20.67869917,"high_school":18.8962215,"some_college":17.70629789,"college":12.55383145,"construction":21.5132352,"finance":15.64493785,"manufacturing":15.92663785},{"date":"07/01/2011","all_workers":16.39110234,"hourly_workers":21.26921615,"non_hourly_workers":10.44843131,"less_than_high_school":20.45899911,"high_school":19.42295156,"some_college":17.93929636,"college":12.26738664,"construction":22.02023672,"finance":15.72525888,"manufacturing":16.19290603},{"date":"08/01/2011","all_workers":16.26764332,"hourly_workers":21.03507035,"non_hourly_workers":10.56015628,"less_than_high_school":20.06327075,"high_school":19.47780535,"some_college":17.2733686,"college":12.53711603,"construction":21.94242973,"finance":15.24401659,"manufacturing":16.45079928},{"date":"09/01/2011","all_workers":16.55614608,"hourly_workers":21.33208619,"non_hourly_workers":10.80624926,"less_than_high_school":19.2329541,"high_school":19.63744995,"some_college":17.60508974,"college":13.1355552,"construction":21.5599204,"finance":14.85891321,"manufacturing":16.8106094},{"date":"10/01/2011","all_workers":16.32484788,"hourly_workers":21.13791349,"non_hourly_workers":10.56029062,"less_than_high_school":19.98879931,"high_school":19.05260443,"some_college":17.50956224,"college":12.85851753,"construction":20.82333281,"finance":13.98634811,"manufacturing":17.2335446},{"date":"11/01/2011","all_workers":16.2190872,"hourly_workers":21.14975707,"non_hourly_workers":10.33536439,"less_than_high_school":19.20124297,"high_school":19.47719259,"some_college":17.36159922,"college":12.52123784,"construction":21.10612508,"finance":14.20061092,"manufacturing":16.39461988},{"date":"12/01/2011","all_workers":16.02136776,"hourly_workers":20.7615344,"non_hourly_workers":10.42299758,"less_than_high_school":18.42058372,"high_school":19.21282301,"some_college":16.93996211,"college":12.64397485,"construction":21.67207806,"finance":14.11773348,"manufacturing":17.01557824},{"date":"01/01/2012","all_workers":15.91428157,"hourly_workers":20.55859311,"non_hourly_workers":10.45809243,"less_than_high_school":17.32729084,"high_school":18.66269583,"some_college":16.76189016,"college":13.05401514,"construction":20.40394286,"finance":13.52130759,"manufacturing":16.84491372},{"date":"02/01/2012","all_workers":16.05508556,"hourly_workers":20.74498931,"non_hourly_workers":10.65010994,"less_than_high_school":18.05876474,"high_school":19.1559119,"some_college":16.57949324,"college":13.22555475,"construction":21.42335643,"finance":13.23021987,"manufacturing":16.54256819},{"date":"03/01/2012","all_workers":15.91968476,"hourly_workers":20.41527215,"non_hourly_workers":10.65653032,"less_than_high_school":18.23812883,"high_school":18.9284429,"some_college":16.25500744,"college":13.21414529,"construction":21.14507971,"finance":12.33884718,"manufacturing":16.3747204},{"date":"04/01/2012","all_workers":15.87557595,"hourly_workers":20.09658468,"non_hourly_workers":10.93639796,"less_than_high_school":18.58867717,"high_school":19.0802246,"some_college":15.74779992,"college":13.34998143,"construction":21.45642847,"finance":11.93018658,"manufacturing":15.63739612},{"date":"05/01/2012","all_workers":15.73612457,"hourly_workers":19.84338159,"non_hourly_workers":10.94469359,"less_than_high_school":19.6810566,"high_school":18.36784408,"some_college":15.76355056,"college":13.34138577,"construction":21.23385372,"finance":12.108703,"manufacturing":15.85334407},{"date":"06/01/2012","all_workers":16.00652301,"hourly_workers":20.16893472,"non_hourly_workers":11.12406909,"less_than_high_school":20.20511271,"high_school":18.45789854,"some_college":16.24037933,"college":13.4809081,"construction":22.21976028,"finance":12.74426946,"manufacturing":15.73944858},{"date":"07/01/2012","all_workers":15.94163478,"hourly_workers":20.04871742,"non_hourly_workers":11.1313653,"less_than_high_school":21.5798911,"high_school":17.94653787,"some_college":15.59945563,"college":13.96459501,"construction":23.23278632,"finance":13.55612762,"manufacturing":15.80853679},{"date":"08/01/2012","all_workers":16.09283829,"hourly_workers":20.32755885,"non_hourly_workers":11.06309065,"less_than_high_school":21.31734827,"high_school":17.77399291,"some_college":16.5482283,"college":13.80188347,"construction":23.57316251,"finance":14.54594313,"manufacturing":15.19204296},{"date":"09/01/2012","all_workers":15.74554677,"hourly_workers":19.83223159,"non_hourly_workers":10.84962814,"less_than_high_school":20.53627886,"high_school":17.33205002,"some_college":16.60678437,"college":13.2448263,"construction":23.92772719,"finance":15.39728921,"manufacturing":14.51485489},{"date":"10/01/2012","all_workers":15.93072041,"hourly_workers":20.25453791,"non_hourly_workers":10.68764306,"less_than_high_school":20.34183996,"high_school":17.62307908,"some_college":16.75713653,"college":13.42521994,"construction":24.4221661,"finance":16.20098481,"manufacturing":13.68729107},{"date":"11/01/2012","all_workers":15.97518509,"hourly_workers":20.25632583,"non_hourly_workers":10.74008834,"less_than_high_school":20.36788977,"high_school":17.69561615,"some_college":16.89937559,"college":13.34955691,"construction":23.55862065,"finance":16.13065875,"manufacturing":14.41466917},{"date":"12/01/2012","all_workers":15.85886282,"hourly_workers":20.2511379,"non_hourly_workers":10.43906956,"less_than_high_school":20.29896184,"high_school":17.68743772,"some_college":16.9085689,"college":13.03642912,"construction":23.00078854,"finance":16.22821554,"manufacturing":13.61814909},{"date":"01/01/2013","all_workers":15.68466548,"hourly_workers":20.13317279,"non_hourly_workers":10.21877067,"less_than_high_school":20.69272606,"high_school":18.0139101,"some_college":16.67597386,"college":12.48572731,"construction":22.28472326,"finance":15.74883371,"manufacturing":14.34523633},{"date":"02/01/2013","all_workers":15.59598882,"hourly_workers":20.1308727,"non_hourly_workers":9.953861633,"less_than_high_school":19.91299351,"high_school":18.10242364,"some_college":16.70233604,"college":12.18895163,"construction":23.09439239,"finance":14.63413357,"manufacturing":14.57248154},{"date":"03/01/2013","all_workers":15.78934359,"hourly_workers":20.58797198,"non_hourly_workers":9.890758985,"less_than_high_school":19.5187523,"high_school":18.56319377,"some_college":16.87177617,"college":12.32162798,"construction":22.6695965,"finance":14.48315653,"manufacturing":14.5918674},{"date":"04/01/2013","all_workers":15.80257507,"hourly_workers":20.79478624,"non_hourly_workers":9.676857941,"less_than_high_school":19.70044179,"high_school":18.4137091,"some_college":17.18350048,"college":12.15839137,"construction":22.1066822,"finance":15.35191992,"manufacturing":15.14014187},{"date":"05/01/2013","all_workers":15.87141218,"hourly_workers":21.02177929,"non_hourly_workers":9.587570062,"less_than_high_school":19.71257472,"high_school":18.79213808,"some_college":17.27629564,"college":12.0251532,"construction":21.82101953,"finance":16.00970324,"manufacturing":15.44148862},{"date":"06/01/2013","all_workers":15.78174514,"hourly_workers":21.06683426,"non_hourly_workers":9.342428166,"less_than_high_school":21.15729386,"high_school":18.85033743,"some_college":16.90303902,"college":11.84362423,"construction":21.21281179,"finance":14.41452915,"manufacturing":15.40529946},{"date":"07/01/2013","all_workers":15.65949686,"hourly_workers":20.98794524,"non_hourly_workers":9.201349812,"less_than_high_school":19.27489542,"high_school":19.00635291,"some_college":17.01653347,"college":11.62190935,"construction":19.95475669,"finance":13.11335641,"manufacturing":15.08772583},{"date":"08/01/2013","all_workers":15.52749282,"hourly_workers":20.86916929,"non_hourly_workers":9.028479558,"less_than_high_school":19.42634996,"high_school":19.29455818,"some_college":16.34788459,"college":11.59474837,"construction":20.46828145,"finance":12.38030083,"manufacturing":14.87463969},{"date":"09/01/2013","all_workers":15.53894805,"hourly_workers":20.86872605,"non_hourly_workers":9.142167322,"less_than_high_school":20.68991978,"high_school":19.48412485,"some_college":15.67630941,"college":11.80114069,"construction":20.12529354,"finance":11.5721539,"manufacturing":14.46207318},{"date":"10/01/2013","all_workers":15.35157644,"hourly_workers":20.44303686,"non_hourly_workers":9.289241762,"less_than_high_school":20.85555769,"high_school":19.35326281,"some_college":15.3790766,"college":11.65597488,"construction":19.02600812,"finance":11.08562602,"manufacturing":14.42110285},{"date":"11/01/2013","all_workers":15.49349142,"hourly_workers":20.67916833,"non_hourly_workers":9.360908885,"less_than_high_school":21.1231735,"high_school":19.28870975,"some_college":15.45501166,"college":11.98906595,"construction":19.44779498,"finance":11.87275908,"manufacturing":13.92104113},{"date":"12/01/2013","all_workers":15.59655897,"hourly_workers":20.8064773,"non_hourly_workers":9.436110738,"less_than_high_school":21.93810791,"high_school":19.21328468,"some_college":15.55215535,"college":12.06797321,"construction":18.50520944,"finance":11.76063077,"manufacturing":14.43837572},{"date":"01/01/2014","all_workers":15.8849417,"hourly_workers":21.12118813,"non_hourly_workers":9.722106397,"less_than_high_school":21.53693805,"high_school":19.19161987,"some_college":15.92516958,"college":12.60251978,"construction":19.19437063,"finance":12.26132802,"manufacturing":14.12693288},{"date":"02/01/2014","all_workers":15.82119744,"hourly_workers":20.86701231,"non_hourly_workers":9.908216192,"less_than_high_school":22.21752125,"high_school":18.91521909,"some_college":15.74454561,"college":12.66771722,"construction":17.14481067,"finance":13.27907481,"manufacturing":14.49764236},{"date":"03/01/2014","all_workers":15.60299997,"hourly_workers":20.66585939,"non_hourly_workers":9.680434671,"less_than_high_school":22.93198477,"high_school":18.52623599,"some_college":15.43745672,"college":12.4767003,"construction":17.72361122,"finance":13.67626652,"manufacturing":14.76871436},{"date":"04/01/2014","all_workers":15.57671608,"hourly_workers":20.57166034,"non_hourly_workers":9.788615667,"less_than_high_school":22.78393173,"high_school":18.64536685,"some_college":15.29308342,"college":12.49851989,"construction":17.93965716,"finance":13.83413439,"manufacturing":14.33401088},{"date":"05/01/2014","all_workers":15.32385881,"hourly_workers":20.13015479,"non_hourly_workers":9.729734926,"less_than_high_school":22.04900472,"high_school":18.12410778,"some_college":15.13177842,"college":12.36980273,"construction":17.7614781,"finance":13.59079642,"manufacturing":13.68912254},{"date":"06/01/2014","all_workers":15.3722664,"hourly_workers":20.23093058,"non_hourly_workers":9.786096707,"less_than_high_school":20.66425022,"high_school":18.06584852,"some_college":15.28991772,"college":12.65397072,"construction":18.50523982,"finance":14.11330164,"manufacturing":14.09299816},{"date":"07/01/2014","all_workers":15.44439431,"hourly_workers":20.35823335,"non_hourly_workers":9.815577785,"less_than_high_school":22.18219571,"high_school":18.36416642,"some_college":15.2376308,"college":12.55505468,"construction":19.59058988,"finance":14.90189684,"manufacturing":13.94515121},{"date":"08/01/2014","all_workers":15.45936733,"hourly_workers":20.25911474,"non_hourly_workers":10.03916179,"less_than_high_school":22.36415546,"high_school":18.14852589,"some_college":15.43226407,"college":12.54105581,"construction":18.25271278,"finance":14.48217843,"manufacturing":13.95263031},{"date":"09/01/2014","all_workers":15.49073502,"hourly_workers":20.12137747,"non_hourly_workers":10.15317616,"less_than_high_school":22.85644365,"high_school":17.69702934,"some_college":15.79749232,"college":12.60834074,"construction":18.5462935,"finance":14.11194925,"manufacturing":14.57198212},{"date":"10/01/2014","all_workers":15.56342606,"hourly_workers":20.12687211,"non_hourly_workers":10.25940925,"less_than_high_school":22.54709874,"high_school":17.30477402,"some_college":15.83450065,"college":13.088393,"construction":18.85754617,"finance":14.28872884,"manufacturing":14.6919733},{"date":"11/01/2014","all_workers":15.44374988,"hourly_workers":19.83151375,"non_hourly_workers":10.29799962,"less_than_high_school":22.64523392,"high_school":17.61923787,"some_college":15.67590822,"college":12.68593507,"construction":19.10620305,"finance":13.45606531,"manufacturing":15.24808409},{"date":"12/01/2014","all_workers":15.3924056,"hourly_workers":19.78531526,"non_hourly_workers":10.35772907,"less_than_high_school":22.56749954,"high_school":17.50091721,"some_college":15.53687965,"college":12.80292073,"construction":19.87277423,"finance":13.89669969,"manufacturing":14.88181094},{"date":"01/01/2015","all_workers":15.43429467,"hourly_workers":19.71995756,"non_hourly_workers":10.51860409,"less_than_high_school":23.49232263,"high_school":17.6200506,"some_college":15.43194737,"college":12.74787177,"construction":20.14908191,"finance":13.62438761,"manufacturing":14.33268378},{"date":"02/01/2015","all_workers":15.249301,"hourly_workers":19.76120155,"non_hourly_workers":10.17705372,"less_than_high_school":23.52928398,"high_school":17.14490607,"some_college":15.18549387,"college":12.81805027,"construction":20.7863865,"finance":13.37167298,"manufacturing":13.57256528},{"date":"03/01/2015","all_workers":15.35263764,"hourly_workers":19.65344887,"non_hourly_workers":10.50657534,"less_than_high_school":24.0466607,"high_school":17.23420955,"some_college":15.57097872,"college":12.67099241,"construction":20.88316616,"finance":13.44488698,"manufacturing":14.43512648},{"date":"04/01/2015","all_workers":15.09088629,"hourly_workers":19.18824608,"non_hourly_workers":10.43267823,"less_than_high_school":23.7448291,"high_school":16.67546938,"some_college":15.35670807,"college":12.57622485,"construction":19.87097596,"finance":12.62989619,"manufacturing":15.14625829},{"date":"05/01/2015","all_workers":15.36718765,"hourly_workers":19.66128698,"non_hourly_workers":10.59443128,"less_than_high_school":22.6519148,"high_school":17.45044663,"some_college":15.93051645,"college":12.67710454,"construction":20.02597354,"finance":12.15536932,"manufacturing":15.90684393},{"date":"06/01/2015","all_workers":15.38105001,"hourly_workers":19.40080137,"non_hourly_workers":10.95584279,"less_than_high_school":22.35465116,"high_school":17.1992,"some_college":16.23293527,"college":12.74087637,"construction":19.08570017,"finance":12.29100768,"manufacturing":15.65047641},{"date":"07/01/2015","all_workers":15.0977356,"hourly_workers":19.12088059,"non_hourly_workers":10.72846126,"less_than_high_school":20.86855369,"high_school":16.65261554,"some_college":16.15363149,"college":12.60810704,"construction":17.493703,"finance":11.88056969,"manufacturing":15.19225965},{"date":"08/01/2015","all_workers":15.00774435,"hourly_workers":19.12688385,"non_hourly_workers":10.57951643,"less_than_high_school":19.59856634,"high_school":16.23439842,"some_college":16.34533485,"college":12.72990679,"construction":18.47008412,"finance":12.81594509,"manufacturing":15.31940757},{"date":"09/01/2015","all_workers":15.11635922,"hourly_workers":19.46451279,"non_hourly_workers":10.49042608,"less_than_high_school":19.59730203,"high_school":16.37786744,"some_college":16.37476693,"college":12.88279096,"construction":18.71242662,"finance":13.30902252,"manufacturing":15.20270868},{"date":"10/01/2015","all_workers":15.17209062,"hourly_workers":19.82970963,"non_hourly_workers":10.27225088,"less_than_high_school":20.21458949,"high_school":17.09631003,"some_college":16.51722552,"college":12.39652893,"construction":19.49559693,"finance":13.63610736,"manufacturing":15.63128497},{"date":"11/01/2015","all_workers":15.22068553,"hourly_workers":19.83567553,"non_hourly_workers":10.41237471,"less_than_high_school":20.13955295,"high_school":16.99025772,"some_college":16.24591906,"college":12.79866538,"construction":18.89841943,"finance":13.7655374,"manufacturing":15.45020158},{"date":"12/01/2015","all_workers":15.31834299,"hourly_workers":19.79530725,"non_hourly_workers":10.584722,"less_than_high_school":20.14852741,"high_school":17.47792987,"some_college":16.17435793,"college":12.84288997,"construction":17.73277871,"finance":14.34379321,"manufacturing":16.03207103},{"date":"01/01/2016","all_workers":15.06566044,"hourly_workers":19.72650334,"non_hourly_workers":10.07891163,"less_than_high_school":19.38037477,"high_school":17.51973345,"some_college":16.0789447,"college":12.451565,"construction":18.12536888,"finance":14.72166032,"manufacturing":16.82511285},{"date":"02/01/2016","all_workers":15.08836175,"hourly_workers":19.57152231,"non_hourly_workers":10.19941279,"less_than_high_school":18.55265821,"high_school":17.79967174,"some_college":16.27206933,"college":12.28353248,"construction":17.92037585,"finance":13.80247339,"manufacturing":16.82838281},{"date":"03/01/2016","all_workers":14.88218651,"hourly_workers":19.54789467,"non_hourly_workers":9.795581088,"less_than_high_school":17.24267342,"high_school":17.84547398,"some_college":15.84553925,"college":12.28702409,"construction":17.80523332,"finance":13.40713677,"manufacturing":16.15056945}]

},{}],47:[function(require,module,exports){
'use strict';

/**
* Wage rates of U.S. workers that have not changed jobs within the year.
*
* @module @stdlib/datasets/frb-sf-wage-rigidity
*
* @example
* var wages = require( '@stdlib/datasets/frb-sf-wage-rigidity' );
*
* var data = wages();
* // returns [{...},{...},...]
*/

// MODULES //

var wages = require( './wages.js' );


// EXPORTS //

module.exports = wages;

},{"./wages.js":48}],48:[function(require,module,exports){
'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var data = require( './../data/data.json' );


// MAIN //

/**
* Returns wage rates of U.S. workers that have not changed jobs within the year.
*
* @returns {ObjectArray} data
*
* @example
* var data = wages();
* // returns [{...},{...},...]
*/
function wages() {
	return copy( data );
} // end FUNCTION wages()


// EXPORTS //

module.exports = wages;

},{"./../data/data.json":46,"@stdlib/utils/copy":65}],49:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isObjectArray = require( '@stdlib/assert/is-plain-object' ).isPlainObjectArray;
var wages = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof wages, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an array of objects', function test( t ) {
	var data = wages();
	t.equal( isObjectArray( data ), true, 'returns an array of objects' );
	t.end();
});

tape( 'the function returns a copy', function test( t ) {
	var d1;
	var d2;
	var v;

	d1 = wages();
	d2 = wages();

	t.notEqual( d1, d2, 'different references' );

	v = d2[ 5 ];
	d1[ 5 ] = 'beep';

	t.equal( d1[ 5 ], 'beep', 'expected element' );
	t.notEqual( d1[ 5 ], d2[ 5 ], 'no shared state' );
	t.equal( d2[ 5 ], v, 'expected element' );

	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/datasets/frb-sf-wage-rigidity/test/test.js")
},{"./../lib":47,"@stdlib/assert/is-plain-object":36,"tape":153}],50:[function(require,module,exports){
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

},{"./is_integer.js":51}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":55}],52:[function(require,module,exports){
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

},{"./is_nan.js":53}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{"./floor.js":54}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
'use strict';

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
* @type {RegExp}
*
* @example
* var RE_FUNCTION_NAME = require( '@stdlib/utils/regexp/function-name' );
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* * `/^\s*`
*   - Match zero or more spaces at beginning
* * `function`
*   - Match the word `function`
* * `\s*`
*   - Match zero or more spaces after the word `function`
* * `()`
*   - Capture
* * `[^(]*`
*   - Match anything except a left parenthesis `(` zero or more times
* * `/i`
*   - ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = /^\s*function\s*([^(]*)/i;


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{}],60:[function(require,module,exports){
'use strict';

/**
* Regular expression to parse a regular expression string.
*
* @module @stdlib/regexp/regexp
* @type {RegExp}
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var bool = RE_REGEXP.test( '/^beep$/' );
* // returns true
*
* bool = RE_REGEXP.test( '' );
* // returns false
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var parts = RE_REGEXP.exec( '/^.*$/ig' );
* // returns [ '/^.*$/ig', '^.*$', 'ig', 'index': 0, 'input': '/^.*$/ig' ]
*/


// MAIN //

/**
* Matches parts of a regular expression string.
*
* Regular expression: `/^\/((?:\\\/|[^\/])+)\/([imgy]*)$/`
*
* * `/^\/`
*   - match a string that begins with a `/`
* * `()`
*   - capture
* * `(?:)+`
*   - capture, but do not remember, a group of characters which occur one or more times
* * `\\\/`
*   - match the literal `\/`
* * `|`
*   - OR
* * `[^\/]`
*   - anything which is not the literal `\/`
* * `\/`
*   - match the literal `/`
* * `([imgy]*)`
*   - capture any characters matching `imgy` occurring zero or more times
* * `$/`
*   - string end
*
*
* @constant
* @type {RegExp}
* @default /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/
*/
var RE_REGEXP = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_REGEXP;

},{}],61:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' );
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
* @example
* var v = constructorName( 5 );
* // returns 'Number'
* @example
* var v = constructorName( null );
* // returns 'Null'
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
* @example
* var v = constructorName( function noop(){} );
* // returns 'Function'
*/
function constructorName( v ) {
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		return RE.exec( ctor.toString() )[ 1 ];
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
} // end FUNCTION constructorName()


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":7,"@stdlib/regexp/function-name":59,"@stdlib/utils/native-class":81}],62:[function(require,module,exports){
'use strict';

/**
* Determines the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './constructor_name.js' );


// EXPORTS //

module.exports = constructorName;

},{"./constructor_name.js":61}],63:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var deepCopy = require( './deep_copy.js' );


// MAIN //

/**
* Copies or deep clones a value to an arbitrary depth.
*
* @param {*} value - value to copy
* @param {NonNegativeInteger} [level=+infinity] - copy depth
* @returns {*} value copy
*
* @example
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var value = [{'a':1,'b':true,'c':[1,2,3]}];
* var out = copy( value );
* // returns [{'a':1,'b':true,'c':[1,2,3]}]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/
function copy( value, level ) {
	var out;
	if ( arguments.length > 1 ) {
		if ( !isNonNegativeInteger( level ) ) {
			throw new TypeError( 'invalid input argument. `level` must be a nonnegative integer. Value: `' + level + '`.' );
		}
		if ( level === 0 ) {
			return value;
		}
	} else {
		level = PINF;
	}
	out = ( isArray(value) ) ? [] : {};
	return deepCopy( value, out, [value], [out], level );
} // end FUNCTION copy()


// EXPORTS //

module.exports = copy;

},{"./deep_copy.js":64,"@stdlib/assert/is-array":5,"@stdlib/assert/is-nonnegative-integer":23,"@stdlib/math/constants/float64-pinf":57}],64:[function(require,module,exports){
(function (Buffer){
'use strict';

// MODULES //

var objectKeys = require( 'object-keys' ).shim();
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var isError = require( '@stdlib/assert/is-error' );
var typeOf = require( '@stdlib/utils/type-of' );
var regexp = require( '@stdlib/utils/regexp-from-string' );
var indexOf = require( '@stdlib/utils/index-of' );
var typedArrays = require( './typed_arrays.js' );


// FUNCTIONS //

/**
* Clones a class instance.
*
* #### Notes
*
* * This should __only__ be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered __fragile__.
* * The function is greedy, disregarding the notion of a `level`. Instead, the function deep copies all properties, as we assume the concept of `level` applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
*
*
* @private
* @param {Object} val - class instance
* @returns {Object} new instance
*/
function cloneInstance( val ) {
	var cache = [];
	var refs = [];
	var names;
	var name;
	var desc;
	var tmp;
	var ref;
	var i;

	ref = Object.create( Object.getPrototypeOf( val ) );
	cache.push( val );
	refs.push( ref );

	names = Object.getOwnPropertyNames( val );
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		desc = Object.getOwnPropertyDescriptor( val, name );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( val[name] ) ) ? [] : {};
			desc.value = deepCopy( val[name], tmp, cache, refs, -1 );
		}
		Object.defineProperty( ref, name, desc );
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( ref );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( ref );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( ref );
	}
	return ref;
} // end FUNCTION cloneInstance()

/**
* Copies an error object.
*
* @private
* @param {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error - error to copy
* @returns {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error copy
*
* @example
* var err1 = new TypeError( 'beep' );
*
* var err2 = copyError( err1 );
* // returns <TypeError>
*/
function copyError( error ) {
	/* jshint newcap:false */ // TODO: eslint
	var cache = [];
	var refs = [];
	var keys;
	var desc;
	var tmp;
	var key;
	var err;
	var i;

	// Create a new error...
	err = new error.constructor( error.message );

	cache.push( error );
	refs.push( err );

	// If a `stack` property is present, copy it over...
	if ( error.stack ) {
		err.stack = error.stack;
	}
	// Node.js specific (system errors)...
	if ( error.code ) {
		err.code = error.code;
	}
	if ( error.errno ) {
		err.errno = error.errno;
	}
	if ( error.syscall ) {
		err.syscall = error.syscall;
	}
	// Any enumerable properties...
	keys = objectKeys( error );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		desc = Object.getOwnPropertyDescriptor( error, key );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( error[ key ] ) ) ? [] : {};
			desc.value = deepCopy( error[ key ], tmp, cache, refs, -1 );
		}
		Object.defineProperty( err, key, desc );
	}
	return err;
} // end FUNCTION copyError()


// MAIN //

/**
* Recursively performs a deep copy of an input object.
*
* @private
* @param {*} val - value to copy
* @param {(Array|Object)} copy - copy
* @param {Array} cache - an array of visited objects
* @param {Array} refs - an array of object references
* @param {NonNegativeInteger} level - copy depth
* @returns {*} deep copy
*/
function deepCopy( val, copy, cache, refs, level ) {
	var parent;
	var keys;
	var name;
	var desc;
	var ctor;
	var key;
	var ref;
	var x;
	var i;
	var j;

	level -= 1;

	// Primitives and functions...
	if (
		typeof val !== 'object' ||
		val === null
	) {
		return val;
	}
	if ( isBuffer( val ) ) {
		return new Buffer( val );
	}
	if ( isError( val ) ) {
		return copyError( val );
	}
	// Objects...
	name = typeOf( val );

	if ( name === 'date' ) {
		return new Date( +val );
	}
	if ( name === 'regexp' ) {
		return regexp( val.toString() );
	}
	if ( name === 'set' ) {
		return new Set( val );
	}
	if ( name === 'map' ) {
		return new Map( val );
	}
	if (
		name === 'string' ||
		name === 'boolean' ||
		name === 'number'
	) {
		// If provided an `Object`, return an equivalent primitive!
		return val.valueOf();
	}
	ctor = typedArrays[ name ];
	if ( ctor ) {
		return ctor( val );
	}
	// Class instances...
	if (
		name !== 'array' &&
		name !== 'object'
	) {
		// Cloning requires ES5 or higher...
		if ( typeof Object.freeze === 'function' ) {
			return cloneInstance( val );
		}
		return {};
	}
	// Arrays and plain objects...
	keys = objectKeys( val );
	if ( level > 0 ) {
		parent = name;
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			x = val[ key ];

			// Primitive, Buffer, special class instance...
			name = typeOf( x );
			if (
				typeof x !== 'object' ||
				x === null ||
				(
					name !== 'array' &&
					name !== 'object'
				) ||
				isBuffer( x )
			) {
				if ( parent === 'object' ) {
					desc = Object.getOwnPropertyDescriptor( val, key );
					if ( hasOwnProp( desc, 'value' ) ) {
						desc.value = deepCopy( x );
					}
					Object.defineProperty( copy, key, desc );
				} else {
					copy[ key ] = deepCopy( x );
				}
				continue;
			}
			// Circular reference...
			i = indexOf( cache, x );
			if ( i !== -1 ) {
				copy[ key ] = refs[ i ];
				continue;
			}
			// Plain array or object...
			ref = ( isArray(x) ) ? [] : {};
			cache.push( x );
			refs.push( ref );
			if ( parent === 'array' ) {
				copy[ key ] = deepCopy( x, ref, cache, refs, level );
			} else {
				desc = Object.getOwnPropertyDescriptor( val, key );
				if ( hasOwnProp( desc, 'value' ) ) {
					desc.value = deepCopy( x, ref, cache, refs, level );
				}
				Object.defineProperty( copy, key, desc );
			}
		}
	} else if ( name === 'array' ) {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			copy[ key ] = val[ key ];
		}
	} else {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			desc = Object.getOwnPropertyDescriptor( val, key );
			Object.defineProperty( copy, key, desc );
		}
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( copy );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( copy );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( copy );
	}
	return copy;
} // end FUNCTION deepCopy()


// EXPORTS //

module.exports = deepCopy;

}).call(this,require("buffer").Buffer)
},{"./typed_arrays.js":66,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-array":5,"@stdlib/assert/is-buffer":7,"@stdlib/assert/is-error":9,"@stdlib/utils/index-of":79,"@stdlib/utils/regexp-from-string":87,"@stdlib/utils/type-of":92,"buffer":99,"object-keys":123}],65:[function(require,module,exports){
'use strict';

/**
* Copy or deep clone a value to an arbitrary depth.
*
* @module @stdlib/utils/copy
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var value = [{'a':1,'b':true,'c':[1,2,3]}];
* var out = copy( value );
* // returns [{'a':1,'b':true,'c':[1,2,3]}]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/

// MODULES //

var copy = require( './copy.js' );


// EXPORTS //

module.exports = copy;

},{"./copy.js":63}],66:[function(require,module,exports){
/* eslint-disable no-new-func */
'use strict';

// MAIN //

var ctors = [
	'Int8Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Int16Array',
	'Uint16Array',
	'Int32Array',
	'Uint32Array',
	'Float32Array',
	'Float64Array'
];

/**
* Create functions for copying typed arrays.
*
* @private
* @returns {Object} typed array functions
*/
function createTypedArrayFcns() {
	var typedArrays = {};
	var ctor;
	var i;
	for ( i = 0; i < ctors.length; i++ ) {
		ctor = ctors[ i ];
		typedArrays[ ctor.toLowerCase() ] = new Function( 'arr', 'return new '+ctor+'( arr );' );
	}
	return typedArrays;
} // end FUNCTION createTypedArrayFcns()


// EXPORTS //

module.exports = createTypedArrayFcns();

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{"./define_read_only_property.js":67}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{"./detect_symbol_support.js":69}],71:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":70}],72:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":71}],73:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = require( './native.js' );
} else {
	getProto = require( './polyfill.js' );
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":76,"./polyfill.js":77,"@stdlib/assert/is-function":11}],74:[function(require,module,exports){
'use strict';

// MODULES //

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":73}],75:[function(require,module,exports){
'use strict';

/**
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":74}],76:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],77:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":78,"@stdlib/utils/native-class":81}],78:[function(require,module,exports){
'use strict';

/**
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
} // end FUNCTION getProto()


// EXPORTS //

module.exports = getProto;

},{}],79:[function(require,module,exports){
'use strict';

/**
* Return the first index at which a given element can be found.
*
* @module @stdlib/utils/index-of
*
* @example
* var indexOf = require( '@stdlib/utils/index-of' );
*
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* arr = [ 4, 3, 2, 1 ];
* idx = indexOf( arr, 5 );
* // returns -1
*
* // Using a `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, 3 );
* // returns 5
*
* // `fromIndex` which exceeds `array` length:
* arr = [ 1, 2, 3, 4, 2, 5 ];
* idx = indexOf( arr, 2, 10 );
* // returns -1
*
* // Negative `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* // Negative `fromIndex` exceeding input `array` length:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, -10 );
* // returns 1
*
* // Array-like objects:
* var str = 'bebop';
* idx = indexOf( str, 'o' );
* // returns 3
*/

// MODULES //

var indexOf = require( './index_of.js' );


// EXPORTS //

module.exports = indexOf;

},{"./index_of.js":80}],80:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/assert/is-nan' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Returns the first index at which a given element can be found.
*
* @param {ArrayLike} arr - array-like object
* @param {*} searchElement - element to find
* @param {integer} [fromIndex] - starting index (if negative, the start index is determined relative to last element)
* @throws {TypeError} must provide an array-like object
* @throws {TypeError} `fromIndex` must be an integer
* @returns {integer} index or -1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 5 );
* // returns -1
*
* @example
* // Using a `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, 3 );
* // returns 5
*
* @example
* // `fromIndex` which exceeds `array` length:
* var arr = [ 1, 2, 3, 4, 2, 5 ];
* var idx = indexOf( arr, 2, 10 );
* // returns -1
*
* @example
* // Negative `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* var idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* @example
* // Negative `fromIndex` exceeding input `array` length:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, -10 );
* // returns 1
*
* @example
* // Array-like objects:
* var str = 'bebop';
* var idx = indexOf( str, 'o' );
* // returns 3
*/
function indexOf( arr, searchElement, fromIndex ) {
	var len;
	var i;
	if ( !isArrayLike( arr ) ) {
		throw new TypeError( 'invalid input argument. First argument must be an array-like object. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( len === 0 ) {
		return -1;
	}
	if ( arguments.length === 3 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( 'invalid input argument. `fromIndex` must be an integer. Value: `' + fromIndex + '`.' );
		}
		if ( fromIndex >= 0 ) {
			if ( fromIndex >= len ) {
				return -1;
			}
			i = fromIndex;
		} else {
			i = len + fromIndex;
			if ( i < 0 ) {
				i = 0;
			}
		}
	} else {
		i = 0;
	}
	// Check for `NaN`...
	if ( isnan( searchElement ) ) {
		for ( ; i < len; i++ ) {
			if ( isnan( arr[i] ) ) {
				return i;
			}
		}
	} else {
		for ( ; i < len; i++ ) {
			if ( arr[ i ] === searchElement ) {
				return i;
			}
		}
	}
	return -1;
} // end FUNCTION indexOf()


// EXPORTS //

module.exports = indexOf;

},{"@stdlib/assert/is-array-like":3,"@stdlib/assert/is-integer":14,"@stdlib/assert/is-nan":19}],81:[function(require,module,exports){
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

},{"./native_class.js":82,"./polyfill.js":83,"@stdlib/utils/detect-tostringtag-support":72}],82:[function(require,module,exports){
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

},{"./tostring.js":84}],83:[function(require,module,exports){
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

},{"./tostring.js":84,"./tostringtag.js":85,"@stdlib/assert/has-own-property":2}],84:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],85:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],86:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE = require( '@stdlib/regexp/regexp' );


// MAIN //

/**
* Parses a regular expression string and returns a new regular expression.
*
* @param {string} str - regular expression string
* @returns {(RegExp|null)} regular expression or null
*
* @example
* var re = reFromString( '/beep/' )
* // returns /beep/
*/
function reFromString( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Capture the regular expression pattern and any flags:
	str = RE.exec( str );

	// Create a new regular expression:
	return ( str ) ? new RegExp( str[1], str[2] ) : null;
} // end FUNCTION reFromString()


// EXPORTS //

module.exports = reFromString;

},{"@stdlib/assert/is-string":39,"@stdlib/regexp/regexp":60}],87:[function(require,module,exports){
'use strict';

/**
* Create a regular expression from a regular expression string.
*
* @module @stdlib/utils/regexp-from-string
*
* @example
* var reFromString = require( '@stdlib/utils/regexp-from-string' );
*
* var re = reFromString( '/beep/' );
* // returns /beep/
*/

// MODULES //

var reFromString = require( './from_string.js' );


// EXPORTS //

module.exports = reFromString;

},{"./from_string.js":86}],88:[function(require,module,exports){
'use strict';

// MODULES //

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||
		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||
		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
} // end FUNCTION check()


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":89,"./fixtures/re.js":90,"./fixtures/typedarray.js":91}],89:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":150}],90:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],91:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],92:[function(require,module,exports){
'use strict';

/**
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// EXPORTS //

module.exports = ( usePolyfill() ) ? polyfill : typeOf;

},{"./check.js":88,"./polyfill.js":93,"./typeof.js":94}],93:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":62}],94:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ``` text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":62}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){

},{}],97:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"dup":96}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"base64-js":95,"ieee754":118}],100:[function(require,module,exports){
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
},{"../../is-buffer/index.js":120}],101:[function(require,module,exports){
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

},{"./lib/is_arguments.js":102,"./lib/keys.js":103}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],104:[function(require,module,exports){
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

},{"foreach":114,"object-keys":123}],105:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],106:[function(require,module,exports){
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

},{"./helpers/isFinite":107,"./helpers/isNaN":108,"./helpers/mod":109,"./helpers/sign":110,"es-to-primitive/es5":111,"is-callable":121}],107:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],108:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],109:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],110:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],111:[function(require,module,exports){
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

},{"./helpers/isPrimitive":112,"is-callable":121}],112:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){

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


},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":115}],117:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":116}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{"./isArguments":124}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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
},{"_process":98}],126:[function(require,module,exports){
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
},{"_process":98}],127:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":128}],128:[function(require,module,exports){
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
},{"./_stream_readable":130,"./_stream_writable":132,"core-util-is":100,"inherits":119,"process-nextick-args":126}],129:[function(require,module,exports){
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
},{"./_stream_transform":131,"core-util-is":100,"inherits":119}],130:[function(require,module,exports){
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
},{"./_stream_duplex":128,"./internal/streams/BufferList":133,"./internal/streams/destroy":134,"./internal/streams/stream":135,"_process":98,"core-util-is":100,"events":113,"inherits":119,"isarray":136,"process-nextick-args":126,"safe-buffer":143,"string_decoder/":137,"util":96}],131:[function(require,module,exports){
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
},{"./_stream_duplex":128,"core-util-is":100,"inherits":119}],132:[function(require,module,exports){
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
},{"./_stream_duplex":128,"./internal/streams/destroy":134,"./internal/streams/stream":135,"_process":98,"core-util-is":100,"inherits":119,"process-nextick-args":126,"safe-buffer":143,"util-deprecate":159}],133:[function(require,module,exports){
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
},{"safe-buffer":143}],134:[function(require,module,exports){
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
},{"process-nextick-args":126}],135:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":113}],136:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],137:[function(require,module,exports){
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
},{"safe-buffer":143}],138:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":139}],139:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":128,"./lib/_stream_passthrough.js":129,"./lib/_stream_readable.js":130,"./lib/_stream_transform.js":131,"./lib/_stream_writable.js":132}],140:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":139}],141:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":132}],142:[function(require,module,exports){
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
},{"_process":98,"through":158}],143:[function(require,module,exports){
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

},{"buffer":99}],144:[function(require,module,exports){
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

},{"events":113,"inherits":119,"readable-stream/duplex.js":127,"readable-stream/passthrough.js":138,"readable-stream/readable.js":139,"readable-stream/transform.js":140,"readable-stream/writable.js":141}],145:[function(require,module,exports){
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

},{"es-abstract/es5":106,"function-bind":116}],146:[function(require,module,exports){
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

},{"./implementation":145,"./polyfill":147,"./shim":148,"define-properties":104,"function-bind":116}],147:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":145}],148:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":147,"define-properties":104}],149:[function(require,module,exports){
(function (global){
/* globals self, window, global */
/* eslint no-negated-condition: 0, no-new-func: 0 */

'use strict';

if (typeof self !== 'undefined') {
	module.exports = self;
} else if (typeof window !== 'undefined') {
	module.exports = window;
} else if (typeof global !== 'undefined') {
	module.exports = global;
} else {
	module.exports = Function('return this')();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],150:[function(require,module,exports){
'use strict';

var defineProperties = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = getPolyfill();

var getGlobal = function () { return polyfill; };

defineProperties(getGlobal, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = getGlobal;

},{"./implementation":149,"./polyfill":151,"./shim":152,"define-properties":104}],151:[function(require,module,exports){
(function (global){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (typeof global !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
		return implementation;
	}
	return global;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./implementation":149}],152:[function(require,module,exports){
(function (global){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimGlobal() {
	var polyfill = getPolyfill();
	if (define.supportsDescriptors) {
		var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'global');
		if (!descriptor || (descriptor.configurable && (descriptor.enumerable || descriptor.writable || global !== polyfill))) {
			Object.defineProperty(polyfill, 'global', {
				configurable: true,
				enumerable: false,
				value: polyfill,
				writable: false
			});
		}
	} else if (typeof global !== 'object' || global !== polyfill) {
		polyfill.global = polyfill;
	}
	return polyfill;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polyfill":151,"define-properties":104}],153:[function(require,module,exports){
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
},{"./lib/default_stream":154,"./lib/results":156,"./lib/test":157,"_process":98,"defined":105,"through":158}],154:[function(require,module,exports){
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
},{"_process":98,"fs":97,"through":158}],155:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":98}],156:[function(require,module,exports){
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
},{"_process":98,"events":113,"function-bind":116,"has":117,"inherits":119,"object-inspect":122,"resumer":142,"through":158}],157:[function(require,module,exports){
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
},{"./next_tick":155,"deep-equal":101,"defined":105,"events":113,"has":117,"inherits":119,"path":125,"string.prototype.trim":146}],158:[function(require,module,exports){
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
},{"_process":98,"stream":144}],159:[function(require,module,exports){
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
},{}]},{},[49]);
