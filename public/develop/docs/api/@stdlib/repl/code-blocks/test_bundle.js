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

},{"@stdlib/math/base/assert/is-integer":46,"@stdlib/math/constants/uint32-max":54}],5:[function(require,module,exports){
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
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
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

},{"@stdlib/math/base/assert/is-integer":46,"@stdlib/math/constants/float64-ninf":52,"@stdlib/math/constants/float64-pinf":53}],16:[function(require,module,exports){
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

},{"@stdlib/assert/is-number":27,"@stdlib/math/base/assert/is-nan":48}],21:[function(require,module,exports){
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

},{"@stdlib/assert/is-number":27,"@stdlib/math/base/assert/is-nan":48}],22:[function(require,module,exports){
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

var isPlainObject = require( './is_plain_object.js' );


// EXPORTS //

module.exports = isPlainObject;

},{"./is_plain_object.js":37}],37:[function(require,module,exports){
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
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns true
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
*
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
*
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
* @private
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

},{"./is_integer.js":47}],47:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":51}],48:[function(require,module,exports){
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

},{"./is_nan.js":49}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{"./floor.js":50}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
// This file is generated by scripts/build.js.
'use strict';

/* eslint-disable quotes, max-lines */

module.exports = {
	"AFINN_111": "list = AFINN_111()\n",
	"AFINN_96": "list = AFINN_96()\n",
	"any": "arr = [ 0, 0, 0, 0, 1 ];\nbool = any( arr )\n",
	"anyBy": "function negative( v ) { return ( v < 0 ); };\narr = [ 1, 2, 3, 4, -1 ];\nbool = anyBy( arr, negative )\n",
	"anyByAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 3000, 2500, 1000 ];\nanyByAsync( arr, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\nanyByAsync( arr, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\nanyByAsync( arr, opts, predicate, done )\n",
	"anyByRight": "function negative( v ) { return ( v < 0 ); };\narr = [ -1, 1, 2, 3, 4 ];\nbool = anyByRight( arr, negative )\n",
	"anyByRightAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 1000, 2500, 3000 ];\nanyByRightAsync( arr, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 1000, 2500, 3000 ];\nanyByRightAsync( arr, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 1000, 2500, 3000 ];\nanyByRightAsync( arr, opts, predicate, done )\n",
	"append": "\n// Arrays:\narr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\narr = append( arr, [ 6.0, 7.0 ] )\n\n// Typed arrays:\narr = new Float64Array( [ 1.0, 2.0 ] );\narr = append( arr, [ 3.0, 4.0 ] )\n\n// Array-like object:\narr = { 'length': 0 };\narr = append( arr, [ 1.0, 2.0 ] )\n",
	"argumentFunction": "argn = argumentFunction( 1 );\nv = argn( 3.14, -3.14, 0.0 )\nv = argn( -1.0, -0.0, 1.0 )\nv = argn( 'beep', 'boop', 'bop' )\nv = argn( 'beep' )\n",
	"ARGV": "execPath = ARGV[ 0 ]\n",
	"base.abs": "y = base.abs( -1.0 )\ny = base.abs( 2.0 )\ny = base.abs( 0.0 )\ny = base.abs( -0.0 )\ny = base.abs( NaN )\n",
	"base.abs2": "y = base.abs2( -1.0 )\ny = base.abs2( 2.0 )\ny = base.abs2( 0.0 )\ny = base.abs2( -0.0 )\ny = base.abs2( NaN )\n",
	"base.absdiff": "d = base.absdiff( 2.0, 5.0 )\nd = base.absdiff( -1.0, 3.14 )\nd = base.absdiff( 10.1, -2.05 )\nd = base.absdiff( -0.0, 0.0 )\nd = base.absdiff( NaN, 5.0 )\nd = base.absdiff( PINF, NINF )\nd = base.absdiff( PINF, PINF )\n",
	"base.absInt32": "v = base.absInt32( -1|0 )\nv = base.absInt32( 2|0 )\nv = base.absInt32( 0|0 )\n",
	"base.acos": "y = base.acos( 1.0 )\ny = base.acos( 0.707 )\ny = base.acos( NaN )\n",
	"base.acosh": "y = base.acosh( 1.0 )\ny = base.acosh( 2.0 )\ny = base.acosh( NaN )\n",
	"base.acovercos": "y = base.acovercos( -1.5 )\ny = base.acovercos( -0.0 )\n",
	"base.acoversin": "y = base.acoversin( 1.5 )\ny = base.acoversin( 0.0 )\n",
	"base.ahavercos": "y = base.ahavercos( 0.5 )\ny = base.ahavercos( 0.0 )\n",
	"base.ahaversin": "y = base.ahaversin( 0.5 )\ny = base.ahaversin( 0.0 )\n",
	"base.asin": "y = base.asin( 0.0 )\ny = base.asin( PI/2.0 )\ny = base.asin( -PI/6.0 )\ny = base.asin( NaN )\n",
	"base.asinh": "y = base.asinh( 0.0 )\ny = base.asinh( 2.0 )\ny = base.asinh( -2.0 )\ny = base.asinh( NaN )\ny = base.asinh( NINF )\ny = base.asinh( PINF )\n",
	"base.asum": "\n// Standard usage:\nx = [ -2.0, 1.0, 3.0, -5.0, 4.0, 0.0, -1.0, -3.0 ];\nsum = base.asum( x.length, x, 1 )\n\n// Sum every other value:\nN = base.floor( x.length / 2 );\nstride = 2;\nsum = base.asum( N, x, stride )\n\n// Use view offset; e.g., starting at 2nd element:\nx0 = new Float64Array( [ 1.0, -2.0, 3.0, -4.0, 5.0, -6.0 ] );\nx1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\nN = base.floor( x0.length / 2 );\nsum = base.asum( N, x1, stride )\n",
	"base.atan": "y = base.atan( 0.0 )\ny = base.atan( -PI/4.0 )\ny = base.atan( PI/4.0 )\ny = base.atan( NaN )\n",
	"base.atan2": "v = base.atan2( 2.0, 2.0 )\nv = base.atan2( 6.0, 2.0 )\nv = base.atan2( -1.0, -1.0 )\nv = base.atan2( 3.0, 0.0 )\nv = base.atan2( -2.0, 0.0 )\nv = base.atan2( 0.0, 0.0 )\nv = base.atan2( 3.0, NaN )\nv = base.atan2( NaN, 2.0 )\n",
	"base.atanh": "y = base.atanh( 0.0 )\ny = base.atanh( 0.9 )\ny = base.atanh( 1.0 )\ny = base.atanh( -1.0 )\ny = base.atanh( NaN )\n",
	"base.avercos": "y = base.avercos( -1.5 )\ny = base.avercos( -0.0 )\n",
	"base.aversin": "y = base.aversin( 1.5 )\ny = base.aversin( 0.0 )\n",
	"base.axpy": "\n// Standard usage:\nx = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\ny = [ 1.0, 1.0, 1.0, 1.0, 1.0 ];\nalpha = 5.0;\nbase.axpy( x.length, alpha, x, 1, y, 1 )\n\n// Using `N` and `stride` parameters:\nN = base.floor( x.length / 2 );\nbase.axpy( N, alpha, x, 2, y, -1 )\n\n// Using view offsets:\nx0 = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny0 = new Float64Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nx1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\ny1 = new Float64Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 );\nN = base.floor( x0.length / 2 );\nbase.axpy( N, 5.0, x1, -2, y1, 1 )\ny0\n",
	"base.besselj0": "y = base.besselj0( 0.0 )\ny = base.besselj0( 1.0 )\ny = base.besselj0( PINF )\ny = base.besselj0( NINF )\ny = base.besselj0( NaN )\n",
	"base.beta": "v = base.beta( 0.0, 0.0 )\nv = base.beta( 1.0, 1.0 )\nv = base.beta( -1.0, 2.0 )\nv = base.beta( 5.0, 0.2 )\nv = base.beta( 4.0, 1.0 )\nv = base.beta( NaN, 2.0 )\n",
	"base.betainc": "y = base.betainc( 0.5, 2.0, 2.0 )\ny = base.betainc( 0.5, 2.0, 2.0, false )\ny = base.betainc( 0.2, 1.0, 2.0 )\ny = base.betainc( 0.2, 1.0, 2.0, true, true )\ny = base.betainc( NaN, 1.0, 1.0 )\ny = base.betainc( 0.8, NaN, 1.0 )\ny = base.betainc( 0.8, 1.0, NaN )\ny = base.betainc( 1.5, 1.0, 1.0 )\ny = base.betainc( -0.5, 1.0, 1.0 )\ny = base.betainc( 0.5, -2.0, 2.0 )\ny = base.betainc( 0.5, 2.0, -2.0 )\n",
	"base.betaincinv": "y = base.betaincinv( 0.2, 3.0, 3.0 )\ny = base.betaincinv( 0.4, 3.0, 3.0 )\ny = base.betaincinv( 0.4, 3.0, 3.0, true )\ny = base.betaincinv( 0.4, 1.0, 6.0 )\ny = base.betaincinv( 0.8, 1.0, 6.0 )\ny = base.betaincinv( NaN, 1.0, 1.0 )\ny = base.betaincinv( 0.5, NaN, 1.0 )\ny = base.betaincinv( 0.5, 1.0, NaN )\ny = base.betaincinv( 1.2, 1.0, 1.0 )\ny = base.betaincinv( -0.5, 1.0, 1.0 )\ny = base.betaincinv( 0.5, -2.0, 2.0 )\ny = base.betaincinv( 0.5, 0.0, 2.0 )\ny = base.betaincinv( 0.5, 2.0, -2.0 )\ny = base.betaincinv( 0.5, 2.0, 0.0 )\n",
	"base.betaln": "v = base.betaln( 0.0, 0.0 )\nv = base.betaln( 1.0, 1.0 )\nv = base.betaln( -1.0, 2.0 )\nv = base.betaln( 5.0, 0.2 )\nv = base.betaln( 4.0, 1.0 )\nv = base.betaln( NaN, 2.0 )\n",
	"base.binet": "y = base.binet( 0.0 )\ny = base.binet( 1.0 )\ny = base.binet( 2.0 )\ny = base.binet( 3.0 )\ny = base.binet( 4.0 )\ny = base.binet( 5.0 )\ny = base.binet( NaN )\n",
	"base.binomcoef": "v = base.binomcoef( 8, 2 )\nv = base.binomcoef( 0, 0 )\nv = base.binomcoef( -4, 2 )\nv = base.binomcoef( 5, 3 )\nv = base.binomcoef( NaN, 3 )\nv = base.binomcoef( 5, NaN )\nv = base.binomcoef( NaN, NaN )\n",
	"base.binomcoefln": "v = base.binomcoefln( 8, 2 )\nv = base.binomcoefln( 0, 0 )\nv = base.binomcoefln( -4, 2 )\nv = base.binomcoefln( 88, 3 )\nv = base.binomcoefln( NaN, 3 )\nv = base.binomcoefln( 5, NaN )\nv = base.binomcoefln( NaN, NaN )\n",
	"base.cabs": "y = base.cabs( 5.0, 3.0 )\n",
	"base.cabs2": "y = base.cabs2( 5.0, 3.0 )\n",
	"base.cadd": "y = base.cadd( 5.0, 3.0, -2.0, 1.0 )\n\n// Provide an output array:\nout = new Float32Array( 2 );\ny = base.cadd( out, 5.0, 3.0, -2.0, 1.0 )\nbool = ( y === out )\n",
	"base.cbrt": "y = base.cbrt( 64.0 )\ny = base.cbrt( 27.0 )\ny = base.cbrt( 0.0 )\ny = base.cbrt( -0.0 )\ny = base.cbrt( -9.0 )\ny = base.cbrt( NaN )\n",
	"base.cceil": "out = base.cceil( 5.5, 3.3 )\n\n// Provide an output array:\nout = new Float64Array( 2 );\nv = base.cceil( out, 5.5, 3.3 )\nbool = ( v === out )\n",
	"base.cdiv": "y = base.cdiv( -13.0, -1.0, -2.0, 1.0 )\nout = new Float64Array( 2 );\nv = base.cdiv( out, -13.0, -1.0, -2.0, 1.0 )\nbool = ( v === out )\n",
	"base.ceil": "y = base.ceil( 3.14 )\ny = base.ceil( -4.2 )\ny = base.ceil( -4.6 )\ny = base.ceil( 9.5 )\ny = base.ceil( -0.0 )\n",
	"base.ceil10": "y = base.ceil10( 3.14 )\ny = base.ceil10( -4.2 )\ny = base.ceil10( -4.6 )\ny = base.ceil10( 9.5 )\ny = base.ceil10( 13.0 )\ny = base.ceil10( -13.0 )\ny = base.ceil10( -0.0 )\n",
	"base.ceil2": "y = base.ceil2( 3.14 )\ny = base.ceil2( -4.2 )\ny = base.ceil2( -4.6 )\ny = base.ceil2( 9.5 )\ny = base.ceil2( 13.0 )\ny = base.ceil2( -13.0 )\ny = base.ceil2( -0.0 )\n",
	"base.ceilb": "\n// Round to 4 decimal places:\ny = base.ceilb( 3.14159, -4, 10 )\n\n// If `n = 0` or `b = 1`, standard round behavior:\ny = base.ceilb( 3.14159, 0, 2 )\n\n// Round to nearest multiple of two toward positive infinity:\ny = base.ceilb( 5.0, 1, 2 )\n",
	"base.ceiln": "\n// Round to 2 decimal places:\ny = base.ceiln( 3.14159, -2 )\n\n// If `n = 0`, standard round toward positive infinity behavior:\ny = base.ceiln( 3.14159, 0 )\n\n// Round to nearest thousand:\ny = base.ceiln( 12368.0, 3 )\n",
	"base.ceilsd": "y = base.ceilsd( 3.14159, 5 )\ny = base.ceilsd( 3.14159, 1 )\ny = base.ceilsd( 12368.0, 2 )\ny = base.ceilsd( 0.0313, 2, 2 )\n",
	"base.cfloor": "out = base.cfloor( 5.5, 3.3 )\n",
	"base.cinv": "y = base.cinv( 2.0, 4.0 )\nout = new Float64Array( 2 );\nv = base.cinv( out, 2.0, 4.0 )\nbool = ( v === out )\n",
	"base.cmul": "y = base.cmul( 5.0, 3.0, -2.0, 1.0 )\n",
	"base.continuedFraction": "\n// Continued fraction for (e-1)^(-1):\nfunction closure() {\ni = 0;\nreturn function() {\ni++;\nreturn [ i, i ];\n};\n}\ngen = closure()\nout = base.continuedFraction( gen )\n\n// Using an ES6 generator:\nfunction* generator() {\ni = 0;\nwhile ( true ) {\ni++;\nyield [ i, i ];\n}\n}\ngen = generator();\nout = base.continuedFraction( gen )\n\n// Set options:\nout = base.continuedFraction( generator(), { 'keep': true } )\nout = base.continuedFraction( generator(), { 'maxIter': 10 } )\nout = base.continuedFraction( generator(), { 'tolerance': 1e-1 } )\n",
	"base.copy": "\n// Standard usage:\nx = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\ny = [ 6.0, 7.0, 8.0, 9.0, 10.0 ];\nbase.copy( x.length, x, 1, y, 1 )\n\n// Advanced indexing:\nx = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ];\ny = [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ];\nN = base.floor( x.length / 2 );\nbase.copy( N, x, -2, y, 1 )\n\n// Using typed array views:\nx0 = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny0 = new Float64Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nx1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\ny1 = new Float64Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 );\nN = base.floor( x0.length / 2 );\nbase.copy( N, x1, -2, y1, 1 )\ny0\n",
	"base.copysign": "z = base.copysign( -3.14, 10.0 )\nz = base.copysign( 3.14, -1.0 )\nz = base.copysign( 1.0, -0.0 )\nz = base.copysign( -3.14, -0.0 )\nz = base.copysign( -0.0, 1.0 )\n",
	"base.cos": "y = base.cos( 0.0 )\ny = base.cos( PI/4.0 )\ny = base.cos( -PI/6.0 )\ny = base.cos( NaN )\n",
	"base.cosh": "y = base.cosh( 0.0 )\ny = base.cosh( 2.0 )\ny = base.cosh( -2.0 )\ny = base.cosh( NaN )\n",
	"base.cosm1": "y = base.cosm1( 0.0 )\ny = base.cosm1( PI/4.0 )\ny = base.cosm1( -PI/6.0 )\ny = base.cosm1( NaN )\n",
	"base.cospi": "y = base.cospi( 0.0 )\ny = base.cospi( 0.5 )\ny = base.cospi( 0.1 )\ny = base.cospi( NaN )\n",
	"base.covercos": "y = base.covercos( 3.14 )\ny = base.covercos( -4.2 )\ny = base.covercos( -4.6 )\ny = base.covercos( 9.5 )\ny = base.covercos( -0.0 )\n",
	"base.coversin": "y = base.coversin( 3.14 )\ny = base.coversin( -4.2 )\ny = base.coversin( -4.6 )\ny = base.coversin( 9.5 )\ny = base.coversin( -0.0 )\n",
	"base.cphase": "phi = base.cphase( 5.0, 3.0 )\n",
	"base.cpolar": "out = base.cpolar( 5.0, 3.0 )\n",
	"base.cround": "out = base.cround( 5.5, 3.3 )\n",
	"base.csub": "y = base.csub( 5.0, 3.0, -2.0, 1.0 )\n",
	"base.dasum": "\n// Standard usage:\nx = new Float64Array( [ -2.0, 1.0, 3.0, -5.0, 4.0, 0.0, -1.0, -3.0 ] );\nsum = base.dasum( x.length, x, 1 )\n\n// Sum every other value:\nN = base.floor( x.length / 2 );\nstride = 2;\nsum = base.dasum( N, x, stride )\n\n// Use view offset; e.g., starting at 2nd element:\nx0 = new Float64Array( [ 1.0, -2.0, 3.0, -4.0, 5.0, -6.0 ] );\nx1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\nN = base.floor( x0.length / 2 );\nsum = base.dasum( N, x1, stride )\n",
	"base.daxpy": "\n// Standard usage:\nx = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );\ny = new Float64Array( [ 1.0, 1.0, 1.0, 1.0, 1.0 ] );\nalpha = 5.0;\nbase.daxpy( x.length, alpha, x, 1, y, 1 )\n\n// Using `N` and `stride` parameters:\nN = base.floor( x.length / 2 );\nbase.daxpy( N, alpha, x, 2, y, -1 )\n\n// Using view offsets:\nx0 = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny0 = new Float64Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nx1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\ny1 = new Float64Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 );\nN = base.floor( x0.length / 2 );\nbase.daxpy( N, 5.0, x1, -2, y1, 1 )\ny0\n",
	"base.dcopy": "\n// Standard usage:\nx = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );\ny = new Float64Array( [ 6.0, 7.0, 8.0, 9.0, 10.0 ] );\nbase.dcopy( x.length, x, 1, y, 1 )\n\n// Advanced indexing:\nx = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny = new Float64Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nN = base.floor( x.length / 2 );\nbase.dcopy( N, x, -2, y, 1 )\n\n// Using typed array views:\nx0 = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny0 = new Float64Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nx1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\ny1 = new Float64Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 );\nN = base.floor( x0.length / 2 );\nbase.dcopy( N, x1, -2, y1, 1 )\ny0\n",
	"base.deg2rad": "r = base.deg2rad( 90.0 )\nr = base.deg2rad( -45.0 )\nr = base.deg2rad( NaN )\n",
	"base.digamma": "y = base.digamma( -2.5 )\ny = base.digamma( 1.0 )\ny = base.digamma( 10.0 )\ny = base.digamma( NaN )\ny = base.digamma( -1.0 )\n",
	"base.diracDelta": "y = base.diracDelta( 3.14 )\ny = base.diracDelta( 0.0 )\n",
	"base.dist.arcsine.Arcsine": "arcsine = base.dist.arcsine.Arcsine( 0.0, 1.0 );\narcsine.a\narcsine.b\narcsine.entropy\narcsine.kurtosis\narcsine.mean\narcsine.median\narcsine.mode\narcsine.skewness\narcsine.stdev\narcsine.variance\narcsine.cdf( 0.8 )\narcsine.logpdf( 1.0 )\narcsine.pdf( 0.8 )\narcsine.quantile( 0.8 )\n",
	"base.dist.arcsine.cdf": "y = base.dist.arcsine.cdf( 9.0, 0.0, 10.0 )\ny = base.dist.arcsine.cdf( 0.5, 0.0, 2.0 )\ny = base.dist.arcsine.cdf( PINF, 2.0, 4.0 )\ny = base.dist.arcsine.cdf( NINF, 2.0, 4.0 )\ny = base.dist.arcsine.cdf( NaN, 0.0, 1.0 )\ny = base.dist.arcsine.cdf( 0.0, NaN, 1.0 )\ny = base.dist.arcsine.cdf( 0.0, 0.0, NaN )\ny = base.dist.arcsine.cdf( 2.0, 1.0, 0.0 )\n",
	"base.dist.arcsine.entropy": "v = base.dist.arcsine.entropy( 0.0, 1.0 )\nv = base.dist.arcsine.entropy( 4.0, 12.0 )\nv = base.dist.arcsine.entropy( 2.0, 8.0 )\n",
	"base.dist.arcsine.kurtosis": "v = base.dist.arcsine.kurtosis( 0.0, 1.0 )\nv = base.dist.arcsine.kurtosis( 4.0, 12.0 )\nv = base.dist.arcsine.kurtosis( 2.0, 8.0 )\n",
	"base.dist.arcsine.logpdf": "y = base.dist.arcsine.logpdf( 2.0, 0.0, 4.0 )\ny = base.dist.arcsine.logpdf( 5.0, 0.0, 4.0 )\ny = base.dist.arcsine.logpdf( 0.25, 0.0, 1.0 )\ny = base.dist.arcsine.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.arcsine.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.arcsine.logpdf( 0.0, 0.0, NaN )\ny = base.dist.arcsine.logpdf( 2.0, 3.0, 1.0 )\n",
	"base.dist.arcsine.mean": "v = base.dist.arcsine.mean( 0.0, 1.0 )\nv = base.dist.arcsine.mean( 4.0, 12.0 )\nv = base.dist.arcsine.mean( 2.0, 8.0 )\n",
	"base.dist.arcsine.median": "v = base.dist.arcsine.median( 0.0, 1.0 )\nv = base.dist.arcsine.median( 4.0, 12.0 )\nv = base.dist.arcsine.median( 2.0, 8.0 )\n",
	"base.dist.arcsine.mode": "v = base.dist.arcsine.mode( 0.0, 1.0 )\nv = base.dist.arcsine.mode( 4.0, 12.0 )\nv = base.dist.arcsine.mode( 2.0, 8.0 )\n",
	"base.dist.arcsine.pdf": "y = base.dist.arcsine.pdf( 2.0, 0.0, 4.0 )\ny = base.dist.arcsine.pdf( 5.0, 0.0, 4.0 )\ny = base.dist.arcsine.pdf( 0.25, 0.0, 1.0 )\ny = base.dist.arcsine.pdf( NaN, 0.0, 1.0 )\ny = base.dist.arcsine.pdf( 0.0, NaN, 1.0 )\ny = base.dist.arcsine.pdf( 0.0, 0.0, NaN )\ny = base.dist.arcsine.pdf( 2.0, 3.0, 1.0 )\n",
	"base.dist.arcsine.quantile": "y = base.dist.arcsine.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.arcsine.quantile( 0.5, 0.0, 10.0 )\ny = base.dist.arcsine.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.arcsine.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.arcsine.quantile( NaN, 0.0, 1.0 )\ny = base.dist.arcsine.quantile( 0.0, NaN, 1.0 )\ny = base.dist.arcsine.quantile( 0.0, 0.0, NaN )\ny = base.dist.arcsine.quantile( 0.5, 2.0, 1.0 )\n",
	"base.dist.arcsine.skewness": "v = base.dist.arcsine.skewness( 0.0, 1.0 )\nv = base.dist.arcsine.skewness( 4.0, 12.0 )\nv = base.dist.arcsine.skewness( 2.0, 8.0 )\n",
	"base.dist.arcsine.stdev": "v = base.dist.arcsine.stdev( 0.0, 1.0 )\nv = base.dist.arcsine.stdev( 4.0, 12.0 )\nv = base.dist.arcsine.stdev( 2.0, 8.0 )\n",
	"base.dist.arcsine.variance": "v = base.dist.arcsine.variance( 0.0, 1.0 )\nv = base.dist.arcsine.variance( 4.0, 12.0 )\nv = base.dist.arcsine.variance( 2.0, 8.0 )\n",
	"base.dist.beta.Beta": "beta = base.dist.beta.Beta( 1.0, 1.0 );\nbeta.alpha\nbeta.beta\nbeta.entropy\nbeta.kurtosis\nbeta.mean\nbeta.median\nbeta.mode\nbeta.skewness\nbeta.stdev\nbeta.variance\nbeta.cdf( 0.8 )\nbeta.logpdf( 1.0 )\nbeta.mgf( 3.14 )\nbeta.pdf( 1.0 )\nbeta.quantile( 0.8 )\n",
	"base.dist.beta.cdf": "y = base.dist.beta.cdf( 0.5, 1.0, 1.0 )\ny = base.dist.beta.cdf( 0.5, 2.0, 4.0 )\ny = base.dist.beta.cdf( 0.2, 2.0, 2.0 )\ny = base.dist.beta.cdf( 0.8, 4.0, 4.0 )\ny = base.dist.beta.cdf( -0.5, 4.0, 2.0 )\ny = base.dist.beta.cdf( 1.5, 4.0, 2.0 )\ny = base.dist.beta.cdf( 2.0, -1.0, 0.5 )\ny = base.dist.beta.cdf( 2.0, 0.5, -1.0 )\ny = base.dist.beta.cdf( NaN, 1.0, 1.0 )\ny = base.dist.beta.cdf( 0.0, NaN, 1.0 )\ny = base.dist.beta.cdf( 0.0, 1.0, NaN )\n",
	"base.dist.beta.entropy": "v = base.dist.beta.entropy( 1.0, 1.0 )\nv = base.dist.beta.entropy( 4.0, 12.0 )\nv = base.dist.beta.entropy( 8.0, 2.0 )\nv = base.dist.beta.entropy( 1.0, -0.1 )\nv = base.dist.beta.entropy( -0.1, 1.0 )\nv = base.dist.beta.entropy( 2.0, NaN )\nv = base.dist.beta.entropy( NaN, 2.0 )\n",
	"base.dist.beta.kurtosis": "v = base.dist.beta.kurtosis( 1.0, 1.0 )\nv = base.dist.beta.kurtosis( 4.0, 12.0 )\nv = base.dist.beta.kurtosis( 8.0, 2.0 )\nv = base.dist.beta.kurtosis( 1.0, -0.1 )\nv = base.dist.beta.kurtosis( -0.1, 1.0 )\nv = base.dist.beta.kurtosis( 2.0, NaN )\nv = base.dist.beta.kurtosis( NaN, 2.0 )\n",
	"base.dist.beta.logpdf": "y = base.dist.beta.logpdf( 0.5, 1.0, 1.0 )\ny = base.dist.beta.logpdf( 0.5, 2.0, 4.0 )\ny = base.dist.beta.logpdf( 0.2, 2.0, 2.0 )\ny = base.dist.beta.logpdf( 0.8, 4.0, 4.0 )\ny = base.dist.beta.logpdf( -0.5, 4.0, 2.0 )\ny = base.dist.beta.logpdf( 1.5, 4.0, 2.0 )\ny = base.dist.beta.logpdf( 0.5, -1.0, 0.5 )\ny = base.dist.beta.logpdf( 0.5, 0.5, -1.0 )\ny = base.dist.beta.logpdf( NaN, 1.0, 1.0 )\ny = base.dist.beta.logpdf( 0.5, NaN, 1.0 )\ny = base.dist.beta.logpdf( 0.5, 1.0, NaN )\n",
	"base.dist.beta.mean": "v = base.dist.beta.mean( 1.0, 1.0 )\nv = base.dist.beta.mean( 4.0, 12.0 )\nv = base.dist.beta.mean( 8.0, 2.0 )\n",
	"base.dist.beta.median": "v = base.dist.beta.median( 1.0, 1.0 )\nv = base.dist.beta.median( 4.0, 12.0 )\nv = base.dist.beta.median( 8.0, 2.0 )\nv = base.dist.beta.median( 1.0, -0.1 )\nv = base.dist.beta.median( -0.1, 1.0 )\nv = base.dist.beta.median( 2.0, NaN )\nv = base.dist.beta.median( NaN, 2.0 )\n",
	"base.dist.beta.mgf": "y = base.dist.beta.mgf( 0.5, 1.0, 1.0 )\ny = base.dist.beta.mgf( 0.5, 2.0, 4.0 )\ny = base.dist.beta.mgf( 3.0, 2.0, 2.0 )\ny = base.dist.beta.mgf( -0.8, 4.0, 4.0 )\ny = base.dist.beta.mgf( NaN, 1.0, 1.0 )\ny = base.dist.beta.mgf( 0.0, NaN, 1.0 )\ny = base.dist.beta.mgf( 0.0, 1.0, NaN )\ny = base.dist.beta.mgf( 2.0, -1.0, 0.5 )\ny = base.dist.beta.mgf( 2.0, 0.0, 0.5 )\ny = base.dist.beta.mgf( 2.0, 0.5, -1.0 )\ny = base.dist.beta.mgf( 2.0, 0.5, 0.0 )\n",
	"base.dist.beta.mode": "v = base.dist.beta.mode( 4.0, 12.0 )\nv = base.dist.beta.mode( 8.0, 2.0 )\nv = base.dist.beta.mode( 1.0, 1.0 )\n",
	"base.dist.beta.pdf": "y = base.dist.beta.pdf( 0.5, 1.0, 1.0 )\ny = base.dist.beta.pdf( 0.5, 2.0, 4.0 )\ny = base.dist.beta.pdf( 0.2, 2.0, 2.0 )\ny = base.dist.beta.pdf( 0.8, 4.0, 4.0 )\ny = base.dist.beta.pdf( -0.5, 4.0, 2.0 )\ny = base.dist.beta.pdf( 1.5, 4.0, 2.0 )\ny = base.dist.beta.pdf( 0.5, -1.0, 0.5 )\ny = base.dist.beta.pdf( 0.5, 0.5, -1.0 )\ny = base.dist.beta.pdf( NaN, 1.0, 1.0 )\ny = base.dist.beta.pdf( 0.5, NaN, 1.0 )\ny = base.dist.beta.pdf( 0.5, 1.0, NaN )\n",
	"base.dist.beta.quantile": "y = base.dist.beta.quantile( 0.8, 2.0, 1.0 )\ny = base.dist.beta.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.beta.quantile( 1.1, 1.0, 1.0 )\ny = base.dist.beta.quantile( -0.2, 1.0, 1.0 )\ny = base.dist.beta.quantile( NaN, 1.0, 1.0 )\ny = base.dist.beta.quantile( 0.5, NaN, 1.0 )\ny = base.dist.beta.quantile( 0.5, 1.0, NaN )\ny = base.dist.beta.quantile( 0.5, -1.0, 1.0 )\ny = base.dist.beta.quantile( 0.5, 1.0, -1.0 )\n",
	"base.dist.beta.skewness": "v = base.dist.beta.skewness( 1.0, 1.0 )\nv = base.dist.beta.skewness( 4.0, 12.0 )\nv = base.dist.beta.skewness( 8.0, 2.0 )\nv = base.dist.beta.skewness( 1.0, -0.1 )\nv = base.dist.beta.skewness( -0.1, 1.0 )\nv = base.dist.beta.skewness( 2.0, NaN )\nv = base.dist.beta.skewness( NaN, 2.0 )\n",
	"base.dist.beta.stdev": "v = base.dist.beta.stdev( 1.0, 1.0 )\nv = base.dist.beta.stdev( 4.0, 12.0 )\nv = base.dist.beta.stdev( 8.0, 2.0 )\nv = base.dist.beta.stdev( 1.0, -0.1 )\nv = base.dist.beta.stdev( -0.1, 1.0 )\nv = base.dist.beta.stdev( 2.0, NaN )\nv = base.dist.beta.stdev( NaN, 2.0 )\n",
	"base.dist.beta.variance": "v = base.dist.beta.variance( 1.0, 1.0 )\nv = base.dist.beta.variance( 4.0, 12.0 )\nv = base.dist.beta.variance( 8.0, 2.0 )\nv = base.dist.beta.variance( 1.0, -0.1 )\nv = base.dist.beta.variance( -0.1, 1.0 )\nv = base.dist.beta.variance( 2.0, NaN )\nv = base.dist.beta.variance( NaN, 2.0 )\n",
	"base.dist.betaprime.BetaPrime": "betaprime = base.dist.betaprime.BetaPrime( 6.0, 5.0 );\nbetaprime.alpha\nbetaprime.beta\nbetaprime.kurtosis\nbetaprime.mean\nbetaprime.mode\nbetaprime.skewness\nbetaprime.stdev\nbetaprime.variance\nbetaprime.cdf( 0.8 )\nbetaprime.logpdf( 1.0 )\nbetaprime.pdf( 1.0 )\nbetaprime.quantile( 0.8 )\n",
	"base.dist.betaprime.cdf": "y = base.dist.betaprime.cdf( 0.5, 1.0, 1.0 )\ny = base.dist.betaprime.cdf( 0.5, 2.0, 4.0 )\ny = base.dist.betaprime.cdf( 0.2, 2.0, 2.0 )\ny = base.dist.betaprime.cdf( 0.8, 4.0, 4.0 )\ny = base.dist.betaprime.cdf( -0.5, 4.0, 2.0 )\ny = base.dist.betaprime.cdf( 2.0, -1.0, 0.5 )\ny = base.dist.betaprime.cdf( 2.0, 0.5, -1.0 )\ny = base.dist.betaprime.cdf( NaN, 1.0, 1.0 )\ny = base.dist.betaprime.cdf( 0.0, NaN, 1.0 )\ny = base.dist.betaprime.cdf( 0.0, 1.0, NaN )\n",
	"base.dist.betaprime.kurtosis": "v = base.dist.betaprime.kurtosis( 2.0, 6.0 )\nv = base.dist.betaprime.kurtosis( 4.0, 12.0 )\nv = base.dist.betaprime.kurtosis( 8.0, 6.0 )\nv = base.dist.betaprime.kurtosis( 1.0, 2.8 )\nv = base.dist.betaprime.kurtosis( 1.0, -0.1 )\nv = base.dist.betaprime.kurtosis( -0.1, 5.0 )\nv = base.dist.betaprime.kurtosis( 2.0, NaN )\nv = base.dist.betaprime.kurtosis( NaN, 6.0 )\n",
	"base.dist.betaprime.logpdf": "y = base.dist.betaprime.logpdf( 0.5, 1.0, 1.0 )\ny = base.dist.betaprime.logpdf( 0.5, 2.0, 4.0 )\ny = base.dist.betaprime.logpdf( 0.2, 2.0, 2.0 )\ny = base.dist.betaprime.logpdf( 0.8, 4.0, 4.0 )\ny = base.dist.betaprime.logpdf( -0.5, 4.0, 2.0 )\ny = base.dist.betaprime.logpdf( 0.5, -1.0, 0.5 )\ny = base.dist.betaprime.logpdf( 0.5, 0.5, -1.0 )\ny = base.dist.betaprime.logpdf( NaN, 1.0, 1.0 )\ny = base.dist.betaprime.logpdf( 0.5, NaN, 1.0 )\ny = base.dist.betaprime.logpdf( 0.5, 1.0, NaN )\n",
	"base.dist.betaprime.mean": "v = base.dist.betaprime.mean( 1.0, 2.0 )\nv = base.dist.betaprime.mean( 4.0, 12.0 )\nv = base.dist.betaprime.mean( 8.0, 2.0 )\n",
	"base.dist.betaprime.mode": "v = base.dist.betaprime.mode( 1.0, 2.0 )\nv = base.dist.betaprime.mode( 4.0, 12.0 )\nv = base.dist.betaprime.mode( 8.0, 2.0 )\n",
	"base.dist.betaprime.pdf": "y = base.dist.betaprime.pdf( 0.5, 1.0, 1.0 )\ny = base.dist.betaprime.pdf( 0.5, 2.0, 4.0 )\ny = base.dist.betaprime.pdf( 0.2, 2.0, 2.0 )\ny = base.dist.betaprime.pdf( 0.8, 4.0, 4.0 )\ny = base.dist.betaprime.pdf( -0.5, 4.0, 2.0 )\ny = base.dist.betaprime.pdf( 0.5, -1.0, 0.5 )\ny = base.dist.betaprime.pdf( 0.5, 0.5, -1.0 )\ny = base.dist.betaprime.pdf( NaN, 1.0, 1.0 )\ny = base.dist.betaprime.pdf( 0.5, NaN, 1.0 )\ny = base.dist.betaprime.pdf( 0.5, 1.0, NaN )\n",
	"base.dist.betaprime.quantile": "y = base.dist.betaprime.quantile( 0.8, 2.0, 1.0 )\ny = base.dist.betaprime.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.betaprime.quantile( 1.1, 1.0, 1.0 )\ny = base.dist.betaprime.quantile( -0.2, 1.0, 1.0 )\ny = base.dist.betaprime.quantile( NaN, 1.0, 1.0 )\ny = base.dist.betaprime.quantile( 0.5, NaN, 1.0 )\ny = base.dist.betaprime.quantile( 0.5, 1.0, NaN )\ny = base.dist.betaprime.quantile( 0.5, -1.0, 1.0 )\ny = base.dist.betaprime.quantile( 0.5, 1.0, -1.0 )\n",
	"base.dist.betaprime.skewness": "v = base.dist.betaprime.skewness( 2.0, 4.0 )\nv = base.dist.betaprime.skewness( 4.0, 12.0 )\nv = base.dist.betaprime.skewness( 8.0, 4.0 )\nv = base.dist.betaprime.skewness( 1.0, 2.8 )\nv = base.dist.betaprime.skewness( 1.0, -0.1 )\nv = base.dist.betaprime.skewness( -0.1, 4.0 )\nv = base.dist.betaprime.skewness( 2.0, NaN )\nv = base.dist.betaprime.skewness( NaN, 4.0 )\n",
	"base.dist.betaprime.stdev": "v = base.dist.betaprime.stdev( 1.0, 2.5 )\nv = base.dist.betaprime.stdev( 4.0, 12.0 )\nv = base.dist.betaprime.stdev( 8.0, 2.5 )\nv = base.dist.betaprime.stdev( 8.0, 1.0 )\nv = base.dist.betaprime.stdev( 1.0, -0.1 )\nv = base.dist.betaprime.stdev( -0.1, 3.0 )\nv = base.dist.betaprime.stdev( 2.0, NaN )\nv = base.dist.betaprime.stdev( NaN, 3.0 )\n",
	"base.dist.betaprime.variance": "v = base.dist.betaprime.variance( 1.0, 2.5 )\nv = base.dist.betaprime.variance( 4.0, 12.0 )\nv = base.dist.betaprime.variance( 8.0, 2.5 )\nv = base.dist.betaprime.variance( 8.0, 1.0 )\nv = base.dist.betaprime.variance( 1.0, -0.1 )\nv = base.dist.betaprime.variance( -0.1, 3.0 )\nv = base.dist.betaprime.variance( 2.0, NaN )\nv = base.dist.betaprime.variance( NaN, 3.0 )\n",
	"base.dist.binomial.Binomial": "binomial = base.dist.binomial.Binomial( 8, 0.5 );\nbinomial.n\nbinomial.p\nbinomial.kurtosis\nbinomial.mean\nbinomial.median\nbinomial.mode\nbinomial.skewness\nbinomial.stdev\nbinomial.variance\nbinomial.cdf( 2.9 )\nbinomial.mgf( 0.2 )\nbinomial.pmf( 3.0 )\nbinomial.quantile( 0.8 )\n",
	"base.dist.binomial.cdf": "y = base.dist.binomial.cdf( 3.0, 20, 0.2 )\ny = base.dist.binomial.cdf( 21.0, 20, 0.2 )\ny = base.dist.binomial.cdf( 5.0, 10, 0.4 )\ny = base.dist.binomial.cdf( 0.0, 10, 0.4 )\ny = base.dist.binomial.cdf( NaN, 20, 0.5 )\ny = base.dist.binomial.cdf( 0.0, NaN, 0.5 )\ny = base.dist.binomial.cdf( 0.0, 20, NaN )\ny = base.dist.binomial.cdf( 2.0, 1.5, 0.5 )\ny = base.dist.binomial.cdf( 2.0, -2.0, 0.5 )\ny = base.dist.binomial.cdf( 2.0, 20, -1.0 )\ny = base.dist.binomial.cdf( 2.0, 20, 1.5 )\n",
	"base.dist.binomial.entropy": "v = base.dist.binomial.entropy( 100, 0.1 )\nv = base.dist.binomial.entropy( 20, 0.5 )\nv = base.dist.binomial.entropy( 10.3, 0.5 )\nv = base.dist.binomial.entropy( 20, 1.1 )\nv = base.dist.binomial.entropy( 20, NaN )\n",
	"base.dist.binomial.kurtosis": "v = base.dist.binomial.kurtosis( 100, 0.1 )\nv = base.dist.binomial.kurtosis( 20, 0.5 )\nv = base.dist.binomial.kurtosis( 10.3, 0.5 )\nv = base.dist.binomial.kurtosis( 20, 1.1 )\nv = base.dist.binomial.kurtosis( 20, NaN )\n",
	"base.dist.binomial.mean": "v = base.dist.binomial.mean( 100, 0.1 )\nv = base.dist.binomial.mean( 20, 0.5 )\nv = base.dist.binomial.mean( 10.3, 0.5 )\nv = base.dist.binomial.mean( 20, 1.1 )\nv = base.dist.binomial.mean( 20, NaN )\n",
	"base.dist.binomial.median": "v = base.dist.binomial.median( 100, 0.1 )\nv = base.dist.binomial.median( 20, 0.5 )\nv = base.dist.binomial.median( 10.3, 0.5 )\nv = base.dist.binomial.median( 20, 1.1 )\nv = base.dist.binomial.median( 20, NaN )\n",
	"base.dist.binomial.mgf": "y = base.dist.binomial.mgf( 0.5, 20, 0.2 )\ny = base.dist.binomial.mgf( 5.0, 20, 0.2 )\ny = base.dist.binomial.mgf( 0.9, 10, 0.4 )\ny = base.dist.binomial.mgf( 0.0, 10, 0.4 )\ny = base.dist.binomial.mgf( NaN, 20, 0.5 )\ny = base.dist.binomial.mgf( 0.0, NaN, 0.5 )\ny = base.dist.binomial.mgf( 0.0, 20, NaN )\ny = base.dist.binomial.mgf( 2.0, 1.5, 0.5 )\ny = base.dist.binomial.mgf( 2.0, -2.0, 0.5 )\ny = base.dist.binomial.mgf( 2.0, 20, -1.0 )\ny = base.dist.binomial.mgf( 2.0, 20, 1.5 )\n",
	"base.dist.binomial.mode": "v = base.dist.binomial.mode( 100, 0.1 )\nv = base.dist.binomial.mode( 20, 0.5 )\nv = base.dist.binomial.mode( 10.3, 0.5 )\nv = base.dist.binomial.mode( 20, 1.1 )\nv = base.dist.binomial.mode( 20, NaN )\n",
	"base.dist.binomial.pmf": "y = base.dist.binomial.pmf( 3.0, 20, 0.2 )\ny = base.dist.binomial.pmf( 21.0, 20, 0.2 )\ny = base.dist.binomial.pmf( 5.0, 10, 0.4 )\ny = base.dist.binomial.pmf( 0.0, 10, 0.4 )\ny = base.dist.binomial.pmf( NaN, 20, 0.5 )\ny = base.dist.binomial.pmf( 0.0, NaN, 0.5 )\ny = base.dist.binomial.pmf( 0.0, 20, NaN )\ny = base.dist.binomial.pmf( 2.0, 1.5, 0.5 )\ny = base.dist.binomial.pmf( 2.0, -2.0, 0.5 )\ny = base.dist.binomial.pmf( 2.0, 20, -1.0 )\ny = base.dist.binomial.pmf( 2.0, 20, 1.5 )\n",
	"base.dist.binomial.quantile": "y = base.dist.binomial.quantile( 0.4, 20, 0.2 )\ny = base.dist.binomial.quantile( 0.8, 20, 0.2 )\ny = base.dist.binomial.quantile( 0.5, 10, 0.4 )\ny = base.dist.binomial.quantile( 0.0, 10, 0.4 )\ny = base.dist.binomial.quantile( 1.0, 10, 0.4 )\ny = base.dist.binomial.quantile( NaN, 20, 0.5 )\ny = base.dist.binomial.quantile( 0.2, NaN, 0.5 )\ny = base.dist.binomial.quantile( 0.2, 20, NaN )\ny = base.dist.binomial.quantile( 0.5, 1.5, 0.5 )\ny = base.dist.binomial.quantile( 0.5, -2.0, 0.5 )\ny = base.dist.binomial.quantile( 0.5, 20, -1.0 )\ny = base.dist.binomial.quantile( 0.5, 20, 1.5 )\n",
	"base.dist.binomial.skewness": "v = base.dist.binomial.skewness( 100, 0.1 )\nv = base.dist.binomial.skewness( 20, 0.5 )\nv = base.dist.binomial.skewness( 10.3, 0.5 )\nv = base.dist.binomial.skewness( 20, 1.1 )\nv = base.dist.binomial.skewness( 20, NaN )\n",
	"base.dist.binomial.stdev": "v = base.dist.binomial.stdev( 100, 0.1 )\nv = base.dist.binomial.stdev( 20, 0.5 )\nv = base.dist.binomial.stdev( 10.3, 0.5 )\nv = base.dist.binomial.stdev( 20, 1.1 )\nv = base.dist.binomial.stdev( 20, NaN )\n",
	"base.dist.binomial.variance": "v = base.dist.binomial.variance( 100, 0.1 )\nv = base.dist.binomial.variance( 20, 0.5 )\nv = base.dist.binomial.variance( 10.3, 0.5 )\nv = base.dist.binomial.variance( 20, 1.1 )\nv = base.dist.binomial.variance( 20, NaN )\n",
	"base.dist.cauchy.Cauchy": "cauchy = base.dist.cauchy.Cauchy( 0.0, 1.0 );\ncauchy.x0\ncauchy.gamma\ncauchy.entropy\ncauchy.median\ncauchy.mode\ncauchy.cdf( 0.8 )\ncauchy.logcdf( 1.0 )\ncauchy.logpdf( 1.0 )\ncauchy.pdf( 1.0 )\ncauchy.quantile( 0.8 )\n",
	"base.dist.cauchy.cdf": "y = base.dist.cauchy.cdf( 4.0, 0.0, 2.0 )\ny = base.dist.cauchy.cdf( 1.0, 0.0, 2.0 )\ny = base.dist.cauchy.cdf( 1.0, 3.0, 2.0 )\ny = base.dist.cauchy.cdf( NaN, 0.0, 2.0 )\ny = base.dist.cauchy.cdf( 1.0, 2.0, NaN )\ny = base.dist.cauchy.cdf( 1.0, NaN, 3.0 )\n",
	"base.dist.cauchy.entropy": "v = base.dist.cauchy.entropy( 10.0, 7.0 )\nv = base.dist.cauchy.entropy( 22.0, 0.5 )\nv = base.dist.cauchy.entropy( 10.3, -0.5 )\n",
	"base.dist.cauchy.logcdf": "y = base.dist.cauchy.logcdf( 4.0, 0.0, 2.0 )\ny = base.dist.cauchy.logcdf( 1.0, 0.0, 2.0 )\ny = base.dist.cauchy.logcdf( 1.0, 3.0, 2.0 )\ny = base.dist.cauchy.logcdf( NaN, 0.0, 2.0 )\ny = base.dist.cauchy.logcdf( 1.0, 2.0, NaN )\ny = base.dist.cauchy.logcdf( 1.0, NaN, 3.0 )\n",
	"base.dist.cauchy.logpdf": "y = base.dist.cauchy.logpdf( 2.0, 1.0, 1.0 )\ny = base.dist.cauchy.logpdf( 4.0, 3.0, 0.1 )\ny = base.dist.cauchy.logpdf( 4.0, 3.0, 3.0 )\ny = base.dist.cauchy.logpdf( NaN, 1.0, 1.0 )\ny = base.dist.cauchy.logpdf( 2.0, NaN, 1.0 )\ny = base.dist.cauchy.logpdf( 2.0, 1.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.cauchy.logpdf( 2.0, 1.0, -2.0 )\n",
	"base.dist.cauchy.median": "v = base.dist.cauchy.median( 10.0, 5.0 )\nv = base.dist.cauchy.median( 7.0, 0.5 )\nv = base.dist.cauchy.median( 10.3, -0.5 )\n",
	"base.dist.cauchy.mode": "v = base.dist.cauchy.mode( 10.0, 5.0 )\nv = base.dist.cauchy.mode( 7.0, 0.5 )\nv = base.dist.cauchy.mode( 10.3, -0.5 )\n",
	"base.dist.cauchy.pdf": "y = base.dist.cauchy.pdf( 2.0, 1.0, 1.0 )\ny = base.dist.cauchy.pdf( 4.0, 3.0, 0.1 )\ny = base.dist.cauchy.pdf( 4.0, 3.0, 3.0 )\ny = base.dist.cauchy.pdf( NaN, 1.0, 1.0 )\ny = base.dist.cauchy.pdf( 2.0, NaN, 1.0 )\ny = base.dist.cauchy.pdf( 2.0, 1.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.cauchy.pdf( 2.0, 1.0, -2.0 )\n",
	"base.dist.cauchy.quantile": "y = base.dist.cauchy.quantile( 0.3, 2.0, 2.0 )\ny = base.dist.cauchy.quantile( 0.8, 10, 2.0 )\ny = base.dist.cauchy.quantile( 0.1, 10.0, 2.0 )\ny = base.dist.cauchy.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.cauchy.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.cauchy.quantile( NaN, 0.0, 1.0 )\ny = base.dist.cauchy.quantile( 0.0, NaN, 1.0 )\ny = base.dist.cauchy.quantile( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.cauchy.quantile( 0.5, 0.0, -1.0 )\n",
	"base.dist.chi.cdf": "y = base.dist.chi.cdf( 2.0, 3.0 )\ny = base.dist.chi.cdf( 1.0, 0.5 )\ny = base.dist.chi.cdf( -1.0, 4.0 )\ny = base.dist.chi.cdf( NaN, 1.0 )\ny = base.dist.chi.cdf( 0.0, NaN )\n\n// Negative degrees of freedom:\ny = base.dist.chi.cdf( 2.0, -1.0 )\n\n// Degenerate distribution when `k = 0`:\ny = base.dist.chi.cdf( 2.0, 0.0 )\ny = base.dist.chi.cdf( -2.0, 0.0 )\ny = base.dist.chi.cdf( 0.0, 0.0 )\n",
	"base.dist.chi.Chi": "chi = base.dist.chi.Chi( 6.0 );\nchi.k\nchi.entropy\nchi.kurtosis\nchi.mean\nchi.mode\nchi.skewness\nchi.stdev\nchi.variance\nchi.cdf( 1.0 )\nchi.pdf( 1.5 )\nchi.quantile( 0.5 )\n",
	"base.dist.chi.entropy": "v = base.dist.chi.entropy( 11.0 )\nv = base.dist.chi.entropy( 1.5 )\n",
	"base.dist.chi.kurtosis": "v = base.dist.chi.kurtosis( 9.0 )\nv = base.dist.chi.kurtosis( 1.5 )\n",
	"base.dist.chi.mean": "v = base.dist.chi.mean( 11.0 )\nv = base.dist.chi.mean( 4.5 )\n",
	"base.dist.chi.mode": "v = base.dist.chi.mode( 11.0 )\nv = base.dist.chi.mode( 1.5 )\n",
	"base.dist.chi.pdf": "y = base.dist.chi.pdf( 0.3, 4.0 )\ny = base.dist.chi.pdf( 0.7, 0.7 )\ny = base.dist.chi.pdf( -1.0, 0.5 )\ny = base.dist.chi.pdf( 0.0, NaN )\ny = base.dist.chi.pdf( NaN, 2.0 )\n\n// Negative degrees of freedom:\ny = base.dist.chi.pdf( 2.0, -1.0 )\n\n// Degenerate distribution when `k = 0`:\ny = base.dist.chi.pdf( 2.0, 0.0, 2.0 )\ny = base.dist.chi.pdf( 0.0, 0.0, 2.0 )\n",
	"base.dist.chi.quantile": "y = base.dist.chi.quantile( 0.8, 1.0 )\ny = base.dist.chi.quantile( 0.5, 4.0 )\ny = base.dist.chi.quantile( 0.8, 0.1 )\ny = base.dist.chi.quantile( -0.2, 0.5 )\ny = base.dist.chi.quantile( 1.1, 0.5 )\ny = base.dist.chi.quantile( NaN, 1.0 )\ny = base.dist.chi.quantile( 0.0, NaN )\n\n// Negative degrees of freedom:\ny = base.dist.chi.quantile( 0.5, -1.0 )\n\n// Degenerate distribution when `k = 0`:\ny = base.dist.chi.quantile( 0.3, 0.0 )\ny = base.dist.chi.quantile( 0.9, 0.0 )\n",
	"base.dist.chi.skewness": "v = base.dist.chi.skewness( 11.0 )\nv = base.dist.chi.skewness( 1.5 )\n",
	"base.dist.chi.stdev": "v = base.dist.chi.stdev( 11.0 )\nv = base.dist.chi.stdev( 1.5 )\n",
	"base.dist.chi.variance": "v = base.dist.chi.variance( 11.0 )\nv = base.dist.chi.variance( 1.5 )\n",
	"base.dist.chisquare.cdf": "y = base.dist.chisquare.cdf( 2.0, 3.0 )\ny = base.dist.chisquare.cdf( 1.0, 0.5 )\ny = base.dist.chisquare.cdf( -1.0, 4.0 )\ny = base.dist.chisquare.cdf( NaN, 1.0 )\ny = base.dist.chisquare.cdf( 0.0, NaN )\n\n// Negative degrees of freedom:\ny = base.dist.chisquare.cdf( 2.0, -1.0 )\n\n// Degenerate distribution when `k = 0`:\ny = base.dist.chisquare.cdf( 2.0, 0.0 )\ny = base.dist.chisquare.cdf( -2.0, 0.0 )\ny = base.dist.chisquare.cdf( 0.0, 0.0 )\n",
	"base.dist.chisquare.ChiSquare": "chisquare = base.dist.chisquare.ChiSquare( 6.0 );\nchisquare.k\nchisquare.entropy\nchisquare.kurtosis\nchisquare.mean\nchisquare.mode\nchisquare.skewness\nchisquare.stdev\nchisquare.variance\nchisquare.cdf( 3.0 )\nchisquare.mgf( 0.2 )\nchisquare.pdf( 1.5 )\nchisquare.quantile( 0.5 )\n",
	"base.dist.chisquare.entropy": "v = base.dist.chisquare.entropy( 11.0 )\nv = base.dist.chisquare.entropy( 1.5 )\n",
	"base.dist.chisquare.kurtosis": "v = base.dist.chisquare.kurtosis( 9.0 )\nv = base.dist.chisquare.kurtosis( 1.5 )\n",
	"base.dist.chisquare.mean": "v = base.dist.chisquare.mean( 11.0 )\nv = base.dist.chisquare.mean( 4.5 )\n",
	"base.dist.chisquare.mode": "v = base.dist.chisquare.mode( 11.0 )\nv = base.dist.chisquare.mode( 1.5 )\n",
	"base.dist.chisquare.pdf": "y = base.dist.chisquare.pdf( 0.3, 4.0 )\ny = base.dist.chisquare.pdf( 0.7, 0.7 )\ny = base.dist.chisquare.pdf( -1.0, 0.5 )\ny = base.dist.chisquare.pdf( 0.0, NaN )\ny = base.dist.chisquare.pdf( NaN, 2.0 )\n\n// Negative degrees of freedom:\ny = base.dist.chisquare.pdf( 2.0, -1.0 )\n\n// Degenerate distribution when `k = 0`:\ny = base.dist.chisquare.pdf( 2.0, 0.0, 2.0 )\ny = base.dist.chisquare.pdf( 0.0, 0.0, 2.0 )\n",
	"base.dist.chisquare.quantile": "y = base.dist.chisquare.quantile( 0.8, 1.0 )\ny = base.dist.chisquare.quantile( 0.5, 4.0 )\ny = base.dist.chisquare.quantile( 0.8, 0.1 )\ny = base.dist.chisquare.quantile( -0.2, 0.5 )\ny = base.dist.chisquare.quantile( 1.1, 0.5 )\ny = base.dist.chisquare.quantile( NaN, 1.0 )\ny = base.dist.chisquare.quantile( 0.0, NaN )\n\n// Negative degrees of freedom:\ny = base.dist.chisquare.quantile( 0.5, -1.0 )\n\n// Degenerate distribution when `k = 0`:\ny = base.dist.chisquare.quantile( 0.3, 0.0 )\ny = base.dist.chisquare.quantile( 0.9, 0.0 )\n",
	"base.dist.chisquare.skewness": "v = base.dist.chisquare.skewness( 11.0 )\nv = base.dist.chisquare.skewness( 1.5 )\n",
	"base.dist.chisquare.stdev": "v = base.dist.chisquare.stdev( 11.0 )\nv = base.dist.chisquare.stdev( 1.5 )\n",
	"base.dist.chisquare.variance": "v = base.dist.chisquare.variance( 11.0 )\nv = base.dist.chisquare.variance( 1.5 )\n",
	"base.dist.cosine.cdf": "y = base.dist.cosine.cdf( 2.0, 0.0, 3.0 )\ny = base.dist.cosine.cdf( 9.0, 10.0, 3.0 )\ny = base.dist.cosine.cdf( 2.0, 0.0, NaN )\ny = base.dist.cosine.cdf( 2.0, NaN, 1.0 )\ny = base.dist.cosine.cdf( NaN, 0.0, 1.0 )\n\n// Degenerate distribution centered at `μ` when `s = 0.0`:\ny = base.dist.cosine.cdf( 2.0, 8.0, 0.0 )\ny = base.dist.cosine.cdf( 8.0, 8.0, 0.0 )\ny = base.dist.cosine.cdf( 10.0, 8.0, 0.0 )\n",
	"base.dist.cosine.Cosine": "cosine = base.dist.cosine.Cosine( -2.0, 3.0 );\ncosine.mu\ncosine.s\ncosine.kurtosis\ncosine.mean\ncosine.median\ncosine.mode\ncosine.skewness\ncosine.stdev\ncosine.variance\ncosine.cdf( 0.5 )\ncosine.logpdf( -1.0 )\ncosine.mgf( 0.2 )\ncosine.pdf( -2.0 )\ncosine.quantile( 0.9 )\n",
	"base.dist.cosine.kurtosis": "y = base.dist.cosine.kurtosis( 0.0, 1.0 )\ny = base.dist.cosine.kurtosis( 4.0, 2.0 )\ny = base.dist.cosine.kurtosis( NaN, 1.0 )\ny = base.dist.cosine.kurtosis( 0.0, NaN )\ny = base.dist.cosine.kurtosis( 0.0, 0.0 )\n",
	"base.dist.cosine.logpdf": "y = base.dist.cosine.logpdf( 2.0, 0.0, 3.0 )\ny = base.dist.cosine.logpdf( -1.0, 2.0, 4.0 )\ny = base.dist.cosine.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.cosine.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.cosine.logpdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.cosine.logpdf( 2.0, 0.0, -1.0 )\n\n// Degenerate distribution at `s = 0.0`:\ny = base.dist.cosine.logpdf( 2.0, 8.0, 0.0 )\ny = base.dist.cosine.logpdf( 8.0, 8.0, 0.0 )\n",
	"base.dist.cosine.mean": "y = base.dist.cosine.mean( 0.0, 1.0 )\ny = base.dist.cosine.mean( 4.0, 2.0 )\ny = base.dist.cosine.mean( NaN, 1.0 )\ny = base.dist.cosine.mean( 0.0, NaN )\ny = base.dist.cosine.mean( 0.0, 0.0 )\n",
	"base.dist.cosine.median": "y = base.dist.cosine.median( 0.0, 1.0 )\ny = base.dist.cosine.median( 4.0, 2.0 )\ny = base.dist.cosine.median( NaN, 1.0 )\ny = base.dist.cosine.median( 0.0, NaN )\ny = base.dist.cosine.median( 0.0, 0.0 )\n",
	"base.dist.cosine.mgf": "y = base.dist.cosine.mgf( 2.0, 0.0, 3.0 )\ny = base.dist.cosine.mgf( 9.0, 10.0, 3.0 )\ny = base.dist.cosine.mgf( 0.5, 0.0, NaN )\ny = base.dist.cosine.mgf( 0.5, NaN, 1.0 )\ny = base.dist.cosine.mgf( NaN, 0.0, 1.0 )\n",
	"base.dist.cosine.mode": "y = base.dist.cosine.mode( 0.0, 1.0 )\ny = base.dist.cosine.mode( 4.0, 2.0 )\ny = base.dist.cosine.mode( NaN, 1.0 )\ny = base.dist.cosine.mode( 0.0, NaN )\ny = base.dist.cosine.mode( 0.0, 0.0 )\n",
	"base.dist.cosine.pdf": "y = base.dist.cosine.pdf( 2.0, 0.0, 3.0 )\ny = base.dist.cosine.pdf( 2.4, 4.0, 2.0 )\ny = base.dist.cosine.pdf( NaN, 0.0, 1.0 )\ny = base.dist.cosine.pdf( 0.0, NaN, 1.0 )\ny = base.dist.cosine.pdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.cosine.pdf( 2.0, 0.0, -1.0 )\ny = base.dist.cosine.pdf( 2.0, 8.0, 0.0 )\ny = base.dist.cosine.pdf( 8.0, 8.0, 0.0 )\n",
	"base.dist.cosine.quantile": "y = base.dist.cosine.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.cosine.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.cosine.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.cosine.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.cosine.quantile( NaN, 0.0, 1.0 )\ny = base.dist.cosine.quantile( 0.0, NaN, 1.0 )\ny = base.dist.cosine.quantile( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.cosine.quantile( 0.5, 0.0, -1.0 )\n",
	"base.dist.cosine.skewness": "y = base.dist.cosine.skewness( 0.0, 1.0 )\ny = base.dist.cosine.skewness( 4.0, 2.0 )\ny = base.dist.cosine.skewness( NaN, 1.0 )\ny = base.dist.cosine.skewness( 0.0, NaN )\ny = base.dist.cosine.skewness( 0.0, 0.0 )\n",
	"base.dist.cosine.stdev": "y = base.dist.cosine.stdev( 0.0, 1.0 )\ny = base.dist.cosine.stdev( 4.0, 2.0 )\ny = base.dist.cosine.stdev( NaN, 1.0 )\ny = base.dist.cosine.stdev( 0.0, NaN )\ny = base.dist.cosine.stdev( 0.0, 0.0 )\n",
	"base.dist.cosine.variance": "y = base.dist.cosine.variance( 0.0, 1.0 )\ny = base.dist.cosine.variance( 4.0, 2.0 )\ny = base.dist.cosine.variance( NaN, 1.0 )\ny = base.dist.cosine.variance( 0.0, NaN )\ny = base.dist.cosine.variance( 0.0, 0.0 )\n",
	"base.dist.degenerate.cdf": "y = base.dist.degenerate.cdf( 2.0, 3.0 )\ny = base.dist.degenerate.cdf( 4.0, 3.0 )\ny = base.dist.degenerate.cdf( 3.0, 3.0 )\ny = base.dist.degenerate.cdf( NaN, 0.0 )\ny = base.dist.degenerate.cdf( 0.0, NaN )\n",
	"base.dist.degenerate.logcdf": "y = base.dist.degenerate.logcdf( 2.0, 3.0 )\ny = base.dist.degenerate.logcdf( 4.0, 3.0 )\ny = base.dist.degenerate.logcdf( 3.0, 3.0 )\ny = base.dist.degenerate.logcdf( NaN, 0.0 )\ny = base.dist.degenerate.logcdf( 0.0, NaN )\n",
	"base.dist.degenerate.logpdf": "y = base.dist.degenerate.logpdf( 2.0, 3.0 )\ny = base.dist.degenerate.logpdf( 3.0, 3.0 )\ny = base.dist.degenerate.logpdf( NaN, 0.0 )\ny = base.dist.degenerate.logpdf( 0.0, NaN )\n",
	"base.dist.degenerate.mgf": "y = base.dist.degenerate.mgf( 1.0, 1.0 )\ny = base.dist.degenerate.mgf( 2.0, 3.0 )\ny = base.dist.degenerate.mgf( NaN, 0.0 )\ny = base.dist.degenerate.mgf( 0.0, NaN )\n",
	"base.dist.degenerate.pdf": "y = base.dist.degenerate.pdf( 2.0, 3.0 )\ny = base.dist.degenerate.pdf( 3.0, 3.0 )\ny = base.dist.degenerate.pdf( NaN, 0.0 )\ny = base.dist.degenerate.pdf( 0.0, NaN )\n",
	"base.dist.degenerate.pmf": "y = base.dist.degenerate.pmf( 2.0, 3.0 )\ny = base.dist.degenerate.pmf( 3.0, 3.0 )\ny = base.dist.degenerate.pmf( NaN, 0.0 )\ny = base.dist.degenerate.pmf( 0.0, NaN )\n",
	"base.dist.degenerate.quantile": "y = base.dist.degenerate.quantile( 0.5, 2.0 )\ny = base.dist.degenerate.quantile( 0.9, 4.0 )\ny = base.dist.degenerate.quantile( 1.1, 0.0 )\ny = base.dist.degenerate.quantile( -0.2, 0.0 )\ny = base.dist.degenerate.quantile( NaN, 0.0 )\ny = base.dist.degenerate.quantile( 0.0, NaN )\n",
	"base.dist.erlang.cdf": "y = base.dist.erlang.cdf( 2.0, 1, 1.0 );\ny = base.dist.erlang.cdf( 2.0, 3, 1.0 )\ny = base.dist.erlang.cdf( 2.0, 2.5, 1.0 )\ny = base.dist.erlang.cdf( -1.0, 2, 2.0 )\ny = base.dist.erlang.cdf( PINF, 4, 2.0 )\ny = base.dist.erlang.cdf( NINF, 4, 2.0 )\ny = base.dist.erlang.cdf( NaN, 0, 1.0 )\ny = base.dist.erlang.cdf( 0.0, NaN, 1.0 )\ny = base.dist.erlang.cdf( 0.0, 0, NaN )\ny = base.dist.erlang.cdf( 2.0, -1, 1.0 )\ny = base.dist.erlang.cdf( 2.0, 1, -1.0 )\n",
	"base.dist.erlang.entropy": "v = base.dist.erlang.entropy( 1, 1.0 )\nv = base.dist.erlang.entropy( 4, 12.0 )\nv = base.dist.erlang.entropy( 8, 2.0 )\n",
	"base.dist.erlang.Erlang": "erlang = base.dist.erlang.Erlang( 6, 5.0 );\nerlang.k\nerlang.lambda\nerlang.entropy\nerlang.kurtosis\nerlang.mean\nerlang.mode\nerlang.skewness\nerlang.stdev\nerlang.variance\nerlang.cdf( 3.0 )\nerlang.mgf( -0.5 )\nerlang.pdf( 3.0 )\nerlang.quantile( 0.8 )\n",
	"base.dist.erlang.kurtosis": "v = base.dist.erlang.kurtosis( 1, 1.0 )\nv = base.dist.erlang.kurtosis( 4, 12.0 )\nv = base.dist.erlang.kurtosis( 8, 2.0 )\n",
	"base.dist.erlang.mean": "v = base.dist.erlang.mean( 1, 1.0 )\nv = base.dist.erlang.mean( 4, 12.0 )\nv = base.dist.erlang.mean( 8, 2.0 )\n",
	"base.dist.erlang.mgf": "y = base.dist.erlang.mgf( 0.3, 1, 1.0 )\ny = base.dist.erlang.mgf( 2.0, 2, 3.0 )\ny = base.dist.erlang.mgf( -1.0, 2, 2.0 )\ny = base.dist.erlang.mgf( NaN, 1, 1.0 )\ny = base.dist.erlang.mgf( 0.0, NaN, 1.0 )\ny = base.dist.erlang.mgf( 0.0, 1, NaN )\ny = base.dist.erlang.mgf( 0.2, -2, 0.5 )\ny = base.dist.erlang.mgf( 0.2, 0.5, 0.5 )\ny = base.dist.erlang.mgf( 0.2, 1, 0.0 )\ny = base.dist.erlang.mgf( 0.2, 1, -5.0 )\n",
	"base.dist.erlang.mode": "v = base.dist.erlang.mode( 1, 1.0 )\nv = base.dist.erlang.mode( 4, 12.0 )\nv = base.dist.erlang.mode( 8, 2.0 )\n",
	"base.dist.erlang.pdf": "y = base.dist.erlang.pdf( 0.1, 1, 1.0 )\ny = base.dist.erlang.pdf( 0.5, 2, 2.5 )\ny = base.dist.erlang.pdf( -1.0, 4, 2.0 )\ny = base.dist.erlang.pdf( NaN, 1, 1.0 )\ny = base.dist.erlang.pdf( 0.0, NaN, 1.0 )\ny = base.dist.erlang.pdf( 0.0, 1, NaN )\ny = base.dist.erlang.pdf( 2.0, -2, 0.5 )\ny = base.dist.erlang.pdf( 2.0, 0.5, 0.5 )\ny = base.dist.erlang.pdf( 2.0, 0.0, 2.0 )\ny = base.dist.erlang.pdf( 0.0, 0.0, 2.0 )\ny = base.dist.erlang.pdf( 2.0, 1, 0.0 )\ny = base.dist.erlang.pdf( 2.0, 1, -1.0 )\n",
	"base.dist.erlang.quantile": "y = base.dist.erlang.quantile( 0.8, 2, 1.0 )\ny = base.dist.erlang.quantile( 0.5, 4, 2.0 )\ny = base.dist.erlang.quantile( 1.1, 1, 1.0 )\ny = base.dist.erlang.quantile( -0.2, 1, 1.0 )\ny = base.dist.erlang.quantile( NaN, 1, 1.0 )\ny = base.dist.erlang.quantile( 0.0, NaN, 1.0 )\ny = base.dist.erlang.quantile( 0.0, 1, NaN )\n\n// Non-integer shape parameter:\ny = base.dist.erlang.quantile( 0.5, 0.5, 1.0 )\n\n// Non-positive shape parameter:\ny = base.dist.erlang.quantile( 0.5, -1, 1.0 )\n\n// Non-positive rate parameter:\ny = base.dist.erlang.quantile( 0.5, 1, -1.0 )\n",
	"base.dist.erlang.skewness": "v = base.dist.erlang.skewness( 1, 1.0 )\nv = base.dist.erlang.skewness( 4, 12.0 )\nv = base.dist.erlang.skewness( 8, 2.0 )\n",
	"base.dist.erlang.stdev": "v = base.dist.erlang.stdev( 1, 1.0 )\nv = base.dist.erlang.stdev( 4, 12.0 )\nv = base.dist.erlang.stdev( 8, 2.0 )\n",
	"base.dist.erlang.variance": "v = base.dist.erlang.variance( 1, 1.0 )\nv = base.dist.erlang.variance( 4, 12.0 )\nv = base.dist.erlang.variance( 8, 2.0 )\n",
	"base.dist.exponential.cdf": "y = base.dist.exponential.cdf( 2.0, 0.1 )\ny = base.dist.exponential.cdf( 1.0, 2.0 )\ny = base.dist.exponential.cdf( -1.0, 4.0 )\ny = base.dist.exponential.cdf( NaN, 1.0 )\ny = base.dist.exponential.cdf( 0.0, NaN )\n\n// Negative rate parameter:\ny = base.dist.exponential.cdf( 2.0, -1.0 )\n",
	"base.dist.exponential.entropy": "v = base.dist.exponential.entropy( 11.0 )\nv = base.dist.exponential.entropy( 4.5 )\n",
	"base.dist.exponential.Exponential": "exponential = base.dist.exponential.Exponential( 6.0 );\nexponential.lambda\nexponential.entropy\nexponential.kurtosis\nexponential.mean\nexponential.median\nexponential.mode\nexponential.skewness\nexponential.stdev\nexponential.variance\nexponential.cdf( 1.0 )\nexponential.mgf( -0.5 )\nexponential.pdf( 1.5 )\nexponential.quantile( 0.5 )\n",
	"base.dist.exponential.kurtosis": "v = base.dist.exponential.kurtosis( 11.0 )\nv = base.dist.exponential.kurtosis( 4.5 )\n",
	"base.dist.exponential.mean": "v = base.dist.exponential.mean( 11.0 )\nv = base.dist.exponential.mean( 4.5 )\n",
	"base.dist.exponential.median": "v = base.dist.exponential.median( 11.0 )\nv = base.dist.exponential.median( 4.5 )\n",
	"base.dist.exponential.mode": "v = base.dist.exponential.mode( 11.0 )\nv = base.dist.exponential.mode( 4.5 )\n",
	"base.dist.exponential.pdf": "y = base.dist.exponential.pdf( 0.3, 4.0 )\ny = base.dist.exponential.pdf( 2.0, 0.7 )\ny = base.dist.exponential.pdf( -1.0, 0.5 )\ny = base.dist.exponential.pdf( 0, NaN )\ny = base.dist.exponential.pdf( NaN, 2.0 )\n\n// Negative rate:\ny = base.dist.exponential.pdf( 2.0, -1.0 )\n",
	"base.dist.exponential.quantile": "y = base.dist.exponential.quantile( 0.8, 1.0 )\ny = base.dist.exponential.quantile( 0.5, 4.0 )\ny = base.dist.exponential.quantile( 0.5, 0.1 )\ny = base.dist.exponential.quantile( -0.2, 0.1 )\ny = base.dist.exponential.quantile( NaN, 1.0 )\ny = base.dist.exponential.quantile( 0.0, NaN )\n\n// Negative rate parameter:\ny = base.dist.exponential.quantile( 0.5, -1.0 )\n",
	"base.dist.exponential.skewness": "v = base.dist.exponential.skewness( 11.0 )\nv = base.dist.exponential.skewness( 4.5 )\n",
	"base.dist.exponential.stdev": "v = base.dist.exponential.stdev( 9.0 )\nv = base.dist.exponential.stdev( 1.0 )\n",
	"base.dist.exponential.variance": "v = base.dist.exponential.variance( 9.0 )\nv = base.dist.exponential.variance( 1.0 )\n",
	"base.dist.f.cdf": "y = base.dist.f.cdf( 2.0, 1.0, 1.0 )\ny = base.dist.f.cdf( 2.0, 8.0, 4.0 )\ny = base.dist.f.cdf( -1.0, 2.0, 2.0 )\ny = base.dist.f.cdf( PINF, 4.0, 2.0 )\ny = base.dist.f.cdf( NINF, 4.0, 2.0 )\ny = base.dist.f.cdf( NaN, 1.0, 1.0 )\ny = base.dist.f.cdf( 0.0, NaN, 1.0 )\ny = base.dist.f.cdf( 0.0, 1.0, NaN )\ny = base.dist.f.cdf( 2.0, 1.0, -1.0 )\ny = base.dist.f.cdf( 2.0, -1.0, 1.0 )\n",
	"base.dist.f.entropy": "v = base.dist.f.entropy( 3.0, 7.0 )\nv = base.dist.f.entropy( 4.0, 12.0 )\nv = base.dist.f.entropy( 8.0, 2.0 )\n",
	"base.dist.f.F": "f = base.dist.f.F( 6.0, 9.0 );\nf.d1\nf.d2\nf.entropy\nf.kurtosis\nf.mean\nf.mode\nf.skewness\nf.stdev\nf.variance\nf.cdf( 3.0 )\nf.pdf( 2.5 )\nf.quantile( 0.8 )\n",
	"base.dist.f.kurtosis": "v = base.dist.f.kurtosis( 3.0, 9.0 )\nv = base.dist.f.kurtosis( 4.0, 12.0 )\nv = base.dist.f.kurtosis( 8.0, 9.0 )\n",
	"base.dist.f.mean": "v = base.dist.f.mean( 3.0, 5.0 )\nv = base.dist.f.mean( 4.0, 12.0 )\nv = base.dist.f.mean( 8.0, 4.0 )\n",
	"base.dist.f.mode": "v = base.dist.f.mode( 3.0, 5.0 )\nv = base.dist.f.mode( 4.0, 12.0 )\nv = base.dist.f.mode( 8.0, 4.0 )\n",
	"base.dist.f.pdf": "y = base.dist.f.pdf( 2.0, 0.5, 1.0 )\ny = base.dist.f.pdf( 0.1, 1.0, 1.0 )\ny = base.dist.f.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.f.pdf( NaN, 1.0, 1.0 )\ny = base.dist.f.pdf( 0.0, NaN, 1.0 )\ny = base.dist.f.pdf( 0.0, 1.0, NaN )\ny = base.dist.f.pdf( 2.0, 1.0, -1.0 )\ny = base.dist.f.pdf( 2.0, -1.0, 1.0 )\n",
	"base.dist.f.quantile": "y = base.dist.f.quantile( 0.8, 1.0, 1.0 )\ny = base.dist.f.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.f.quantile( 1.1, 1.0, 1.0 )\ny = base.dist.f.quantile( -0.2, 1.0, 1.0 )\ny = base.dist.f.quantile( NaN, 1.0, 1.0 )\ny = base.dist.f.quantile( 0.5, NaN, 1.0 )\ny = base.dist.f.quantile( 0.5, 1.0, NaN )\ny = base.dist.f.quantile( 0.5, -1.0, 1.0 )\ny = base.dist.f.quantile( 0.5, 1.0, -1.0 )\n",
	"base.dist.f.skewness": "v = base.dist.f.skewness( 3.0, 7.0 )\nv = base.dist.f.skewness( 4.0, 12.0 )\nv = base.dist.f.skewness( 8.0, 7.0 )\n",
	"base.dist.f.stdev": "v = base.dist.f.stdev( 3.0, 5.0 )\nv = base.dist.f.stdev( 4.0, 12.0 )\nv = base.dist.f.stdev( 8.0, 5.0 )\n",
	"base.dist.f.variance": "v = base.dist.f.variance( 3.0, 5.0 )\nv = base.dist.f.variance( 4.0, 12.0 )\nv = base.dist.f.variance( 8.0, 5.0 )\n",
	"base.dist.frechet.cdf": "y = base.dist.frechet.cdf( 10.0, 2.0, 3.0, 0.0 )\ny = base.dist.frechet.cdf( -1.0, 2.0, 3.0, -3.0 )\ny = base.dist.frechet.cdf( 2.5, 2.0, 1.0, 2.0 )\ny = base.dist.frechet.cdf( NaN, 1.0, 1.0, 0.0 )\ny = base.dist.frechet.cdf( 0.0, NaN, 1.0, 0.0 )\ny = base.dist.frechet.cdf( 0.0, 1.0, NaN, 0.0 )\ny = base.dist.frechet.cdf( 0.0, 1.0, 1.0, NaN )\ny = base.dist.frechet.cdf( 0.0, -1.0, 1.0, 0.0 )\ny = base.dist.frechet.cdf( 0.0, 1.0, -1.0, 0.0 )\n",
	"base.dist.frechet.entropy": "y = base.dist.frechet.entropy( 1.0, 1.0, 1.0 )\ny = base.dist.frechet.entropy( 4.0, 2.0, 1.0 )\ny = base.dist.frechet.entropy( NaN, 1.0, 0.0 )\ny = base.dist.frechet.entropy( 1.0, NaN, 0.0 )\ny = base.dist.frechet.entropy( 1.0, 1.0, NaN )\n",
	"base.dist.frechet.Frechet": "frechet = base.dist.frechet.Frechet( 1.0, 1.0, 0.0 );\nfrechet.alpha\nfrechet.s\nfrechet.m\nfrechet.entropy\nfrechet.kurtosis\nfrechet.mean\nfrechet.median\nfrechet.mode\nfrechet.skewness\nfrechet.stdev\nfrechet.variance\nfrechet.cdf( 0.8 )\nfrechet.logpdf( 0.8 )\nfrechet.pdf( 0.8 )\nfrechet.quantile( 0.8 )\n",
	"base.dist.frechet.kurtosis": "y = base.dist.frechet.kurtosis( 5.0, 2.0, 1.0 )\ny = base.dist.frechet.kurtosis( 5.0, 10.0, -3.0 )\ny = base.dist.frechet.kurtosis( 3.5, 2.0, 1.0 )\ny = base.dist.frechet.kurtosis( NaN, 1.0, 0.0 )\ny = base.dist.frechet.kurtosis( 1.0, NaN, 0.0 )\ny = base.dist.frechet.kurtosis( 1.0, 1.0, NaN )\n",
	"base.dist.frechet.logpdf": "y = base.dist.frechet.logpdf( 10.0, 1.0, 3.0, 5.0 )\ny = base.dist.frechet.logpdf( -2.0, 1.0, 3.0, -3.0 )\ny = base.dist.frechet.logpdf( 0.0, 2.0, 1.0, -1.0 )\ny = base.dist.frechet.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.frechet.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.frechet.logpdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.frechet.logpdf( 0.0, 0.0, -1.0 )\n",
	"base.dist.frechet.mean": "y = base.dist.frechet.mean( 4.0, 2.0, 1.0 )\ny = base.dist.frechet.mean( 0.5, 2.0, 1.0 )\ny = base.dist.frechet.mean( NaN, 1.0, 0.0 )\ny = base.dist.frechet.mean( 1.0, NaN, 0.0 )\ny = base.dist.frechet.mean( 1.0, 1.0, NaN )\n",
	"base.dist.frechet.median": "y = base.dist.frechet.median( 4.0, 2.0, 1.0 )\ny = base.dist.frechet.median( 4.0, 2.0, -3.0 )\ny = base.dist.frechet.median( 0.5, 2.0, 1.0 )\ny = base.dist.frechet.median( NaN, 1.0, 0.0 )\ny = base.dist.frechet.median( 1.0, NaN, 0.0 )\ny = base.dist.frechet.median( 1.0, 1.0, NaN )\n",
	"base.dist.frechet.mode": "y = base.dist.frechet.mode( 4.0, 2.0, 1.0 )\ny = base.dist.frechet.mode( 4.0, 2.0, -3.0 )\ny = base.dist.frechet.mode( 0.5, 2.0, 1.0 )\ny = base.dist.frechet.mode( NaN, 1.0, 0.0 )\ny = base.dist.frechet.mode( 1.0, NaN, 0.0 )\ny = base.dist.frechet.mode( 1.0, 1.0, NaN )\n",
	"base.dist.frechet.pdf": "y = base.dist.frechet.pdf( 10.0, 0.0, 3.0 )\ny = base.dist.frechet.pdf( -2.0, 0.0, 3.0 )\ny = base.dist.frechet.pdf( 0.0, 0.0, 1.0 )\ny = base.dist.frechet.pdf( NaN, 0.0, 1.0 )\ny = base.dist.frechet.pdf( 0.0, NaN, 1.0 )\ny = base.dist.frechet.pdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.frechet.pdf( 0.0, 0.0, -1.0 )\n",
	"base.dist.frechet.quantile": "y = base.dist.frechet.quantile( 0.3, 10.0, 2.0, 3.0 )\ny = base.dist.frechet.quantile( 0.2, 3.0, 3.0, 3.0 )\ny = base.dist.frechet.quantile( 0.9, 1.0, 1.0, -3.0 )\ny = base.dist.frechet.quantile( NaN, 1.0, 1.0, 0.0 )\ny = base.dist.frechet.quantile( 0.0, NaN, 1.0, 0.0)\ny = base.dist.frechet.quantile( 0.0, 1.0, NaN, 0.0 )\ny = base.dist.frechet.quantile( 0.0, 1.0, 1.0, NaN )\ny = base.dist.frechet.quantile( 0.0, -1.0, 1.0, 0.0 )\ny = base.dist.frechet.quantile( 0.0, 1.0, -1.0, 0.0 )\n",
	"base.dist.frechet.skewness": "y = base.dist.frechet.skewness( 4.0, 2.0, 1.0 )\ny = base.dist.frechet.skewness( 4.0, 2.0, -3.0 )\ny = base.dist.frechet.skewness( 0.5, 2.0, 1.0 )\ny = base.dist.frechet.skewness( NaN, 1.0, 0.0 )\ny = base.dist.frechet.skewness( 1.0, NaN, 0.0 )\ny = base.dist.frechet.skewness( 1.0, 1.0, NaN )\n",
	"base.dist.frechet.stdev": "y = base.dist.frechet.stdev( 4.0, 2.0, 1.0 )\ny = base.dist.frechet.stdev( 4.0, 2.0, -3.0 )\ny = base.dist.frechet.stdev( 0.5, 2.0, 1.0 )\ny = base.dist.frechet.stdev( NaN, 1.0, 0.0 )\ny = base.dist.frechet.stdev( 1.0, NaN, 0.0 )\ny = base.dist.frechet.stdev( 1.0, 1.0, NaN )\n",
	"base.dist.frechet.variance": "y = base.dist.frechet.variance( 4.0, 2.0, 1.0 )\ny = base.dist.frechet.variance( 4.0, 2.0, -3.0 )\ny = base.dist.frechet.variance( 0.5, 2.0, 1.0 )\ny = base.dist.frechet.variance( NaN, 1.0, 0.0 )\ny = base.dist.frechet.variance( 1.0, NaN, 0.0 )\ny = base.dist.frechet.variance( 1.0, 1.0, NaN )\n",
	"base.dist.gamma.cdf": "y = base.dist.gamma.cdf( 2.0, 1.0, 1.0 )\ny = base.dist.gamma.cdf( 2.0, 3.0, 1.0 )\ny = base.dist.gamma.cdf( -1.0, 2.0, 2.0 )\ny = base.dist.gamma.cdf( PINF, 4.0, 2.0 )\ny = base.dist.gamma.cdf( NINF, 4.0, 2.0 )\ny = base.dist.gamma.cdf( NaN, 0.0, 1.0 )\ny = base.dist.gamma.cdf( 0.0, NaN, 1.0 )\ny = base.dist.gamma.cdf( 0.0, 0.0, NaN )\ny = base.dist.gamma.cdf( 2.0, -1.0, 1.0 )\ny = base.dist.gamma.cdf( 2.0, 1.0, -1.0 )\n\n// Degenerate distribution centered at `0` when `α = 0.0`:\ny = base.dist.gamma.cdf( 2.0, 0.0, 2.0 )\ny = base.dist.gamma.cdf( -2.0, 0.0, 2.0 )\ny = base.dist.gamma.cdf( 0.0, 0.0, 2.0 )\n",
	"base.dist.gamma.entropy": "v = base.dist.gamma.entropy( 1.0, 1.0 )\nv = base.dist.gamma.entropy( 4.0, 12.0 )\nv = base.dist.gamma.entropy( 8.0, 2.0 )\n",
	"base.dist.gamma.Gamma": "gamma = base.dist.gamma.Gamma( 6.0, 5.0 );\ngamma.alpha\ngamma.beta\ngamma.entropy\ngamma.kurtosis\ngamma.mean\ngamma.mode\ngamma.skewness\ngamma.stdev\ngamma.variance\ngamma.cdf( 0.8 )\ngamma.logpdf( 1.0 )\ngamma.mgf( -0.5 )\ngamma.pdf( 1.0 )\ngamma.quantile( 0.8 )\n",
	"base.dist.gamma.kurtosis": "v = base.dist.gamma.kurtosis( 1.0, 1.0 )\nv = base.dist.gamma.kurtosis( 4.0, 12.0 )\nv = base.dist.gamma.kurtosis( 8.0, 2.0 )\n",
	"base.dist.gamma.logpdf": "y = base.dist.gamma.logpdf( 2.0, 0.5, 1.0 )\ny = base.dist.gamma.logpdf( 0.1, 1.0, 1.0 )\ny = base.dist.gamma.logpdf( -1.0, 4.0, 2.0 )\ny = base.dist.gamma.logpdf( NaN, 0.6, 1.0 )\ny = base.dist.gamma.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.gamma.logpdf( 0.0, 1.0, NaN )\n\n// Negative shape parameter:\ny = base.dist.gamma.logpdf( 2.0, -1.0, 1.0 )\n\n// Non-positive rate parameter:\ny = base.dist.gamma.logpdf( 2.0, 1.0, -1.0 )\n\n// Degenerate distribution centered at `0.0` when `α = 0.0`:\ny = base.dist.gamma.logpdf( 2.0, 0.0, 2.0 )\ny = base.dist.gamma.logpdf( 0.0, 0.0, 2.0 )\n",
	"base.dist.gamma.mean": "v = base.dist.gamma.mean( 1.0, 1.0 )\nv = base.dist.gamma.mean( 4.0, 12.0 )\nv = base.dist.gamma.mean( 8.0, 2.0 )\n",
	"base.dist.gamma.mgf": "y = base.dist.gamma.mgf( 0.5, 0.5, 1.0 )\ny = base.dist.gamma.mgf( 0.1, 1.0, 1.0 )\ny = base.dist.gamma.mgf( -1.0, 4.0, 2.0 )\ny = base.dist.gamma.mgf( NaN, 1.0, 1.0 )\ny = base.dist.gamma.mgf( 0.0, NaN, 1.0 )\ny = base.dist.gamma.mgf( 0.0, 1.0, NaN )\ny = base.dist.gamma.mgf( 2.0, 4.0, 1.0 )\ny = base.dist.gamma.mgf( 2.0, -0.5, 1.0 )\ny = base.dist.gamma.mgf( 2.0, 1.0, 0.0 )\ny = base.dist.gamma.mgf( 2.0, 1.0, -1.0 )\n",
	"base.dist.gamma.mode": "v = base.dist.gamma.mode( 1.0, 1.0 )\nv = base.dist.gamma.mode( 4.0, 12.0 )\nv = base.dist.gamma.mode( 8.0, 2.0 )\n",
	"base.dist.gamma.pdf": "y = base.dist.gamma.pdf( 2.0, 0.5, 1.0 )\ny = base.dist.gamma.pdf( 0.1, 1.0, 1.0 )\ny = base.dist.gamma.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.gamma.pdf( NaN, 0.6, 1.0 )\ny = base.dist.gamma.pdf( 0.0, NaN, 1.0 )\ny = base.dist.gamma.pdf( 0.0, 1.0, NaN )\n\n// Negative shape parameter:\ny = base.dist.gamma.pdf( 2.0, -1.0, 1.0 )\n\n// Non-positive rate parameter:\ny = base.dist.gamma.pdf( 2.0, 1.0, -1.0 )\n\n// Degenerate distribution centered at `0.0` when `α = 0.0`:\ny = base.dist.gamma.pdf( 2.0, 0.0, 2.0 )\ny = base.dist.gamma.pdf( 0.0, 0.0, 2.0 )\n",
	"base.dist.gamma.quantile": "y = base.dist.gamma.quantile( 0.8, 2.0, 1.0 )\ny = base.dist.gamma.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.gamma.quantile( 1.1, 1.0, 1.0 )\ny = base.dist.gamma.quantile( -0.2, 1.0, 1.0 )\ny = base.dist.gamma.quantile( NaN, 1.0, 1.0 )\ny = base.dist.gamma.quantile( 0.0, NaN, 1.0 )\ny = base.dist.gamma.quantile( 0.0, 1.0, NaN )\n\n// Non-positive shape parameter:\ny = base.dist.gamma.quantile( 0.5, -1.0, 1.0 )\n\n// Non-positive rate parameter:\ny = base.dist.gamma.quantile( 0.5, 1.0, -1.0 )\n\n// Degenerate distribution centered at `0.0` when `α = 0.0`:\ny = base.dist.gamma.quantile( 0.3, 0.0, 2.0 );\ny = base.dist.gamma.quantile( 0.9, 0.0, 2.0 );\n",
	"base.dist.gamma.skewness": "v = base.dist.gamma.skewness( 1.0, 1.0 )\nv = base.dist.gamma.skewness( 4.0, 12.0 )\nv = base.dist.gamma.skewness( 8.0, 2.0 )\n",
	"base.dist.gamma.stdev": "v = base.dist.gamma.stdev( 1.0, 1.0 )\nv = base.dist.gamma.stdev( 4.0, 12.0 )\nv = base.dist.gamma.stdev( 8.0, 2.0 )\n",
	"base.dist.gamma.variance": "v = base.dist.gamma.variance( 1.0, 1.0 )\nv = base.dist.gamma.variance( 4.0, 12.0 )\nv = base.dist.gamma.variance( 8.0, 2.0 )\n",
	"base.dist.geometric.cdf": "y = base.dist.geometric.cdf( 2.0, 0.5 )\ny = base.dist.geometric.cdf( 2.0, 0.1 )\ny = base.dist.geometric.cdf( -1.0, 4.0 )\ny = base.dist.geometric.cdf( NaN, 0.5 )\ny = base.dist.geometric.cdf( 0.0, NaN )\n\n// Invalid probability\ny = base.dist.geometric.cdf( 2.0, 1.4 )\n",
	"base.dist.geometric.entropy": "v = base.dist.geometric.entropy( 0.1 )\nv = base.dist.geometric.entropy( 0.5 )\n",
	"base.dist.geometric.Geometric": "geometric = base.dist.geometric.Geometric( 0.6 );\ngeometric.p\ngeometric.entropy\ngeometric.kurtosis\ngeometric.mean\ngeometric.median\ngeometric.mode\ngeometric.skewness\ngeometric.stdev\ngeometric.variance\ngeometric.cdf( 3.0 )\ngeometric.logcdf( 3.0 )\ngeometric.logpmf( 4.0 )\ngeometric.mgf( 0.5 )\ngeometric.pmf( 2.0 )\ngeometric.quantile( 0.7 )\n",
	"base.dist.geometric.kurtosis": "v = base.dist.geometric.kurtosis( 0.1 )\nv = base.dist.geometric.kurtosis( 0.5 )\n",
	"base.dist.geometric.logcdf": "y = base.dist.geometric.logcdf( 2.0, 0.5 )\ny = base.dist.geometric.logcdf( 2.0, 0.1 )\ny = base.dist.geometric.logcdf( -1.0, 4.0 )\ny = base.dist.geometric.logcdf( NaN, 0.5 )\ny = base.dist.geometric.logcdf( 0.0, NaN )\n\n// Invalid probability\ny = base.dist.geometric.logcdf( 2.0, 1.4 )\n",
	"base.dist.geometric.logpmf": "y = base.dist.geometric.logpmf( 4.0, 0.3 )\ny = base.dist.geometric.logpmf( 2.0, 0.7 )\ny = base.dist.geometric.logpmf( -1.0, 0.5 )\ny = base.dist.geometric.logpmf( 0.0, NaN )\ny = base.dist.geometric.logpmf( NaN, 0.5 )\n\n// Invalid success probability:\ny = base.dist.geometric.logpmf( 2.0, 1.5 )\n",
	"base.dist.geometric.mean": "v = base.dist.geometric.mean( 0.1 )\nv = base.dist.geometric.mean( 0.5 )\n",
	"base.dist.geometric.median": "v = base.dist.geometric.median( 0.1 )\nv = base.dist.geometric.median( 0.5 )\n",
	"base.dist.geometric.mgf": "y = base.dist.geometric.mgf( 0.2, 0.5 )\ny = base.dist.geometric.mgf( 0.4, 0.5 )\n\n// Case: t >= -ln(1-p)\ny = base.dist.geometric.mgf( 0.8, 0.5 )\ny = base.dist.geometric.mgf( NaN, 0.0 )\ny = base.dist.geometric.mgf( 0.0, NaN )\ny = base.dist.geometric.mgf( -2.0, -1.0 )\ny = base.dist.geometric.mgf( 0.2, 2.0 )\n",
	"base.dist.geometric.mode": "v = base.dist.geometric.mode( 0.1 )\nv = base.dist.geometric.mode( 0.5 )\n",
	"base.dist.geometric.pmf": "y = base.dist.geometric.pmf( 4.0, 0.3 )\ny = base.dist.geometric.pmf( 2.0, 0.7 )\ny = base.dist.geometric.pmf( -1.0, 0.5 )\ny = base.dist.geometric.pmf( 0.0, NaN )\ny = base.dist.geometric.pmf( NaN, 0.5 )\n\n// Invalid success probability:\ny = base.dist.geometric.pmf( 2.0, 1.5 )\n",
	"base.dist.geometric.quantile": "y = base.dist.geometric.quantile( 0.8, 0.4 )\ny = base.dist.geometric.quantile( 0.5, 0.4 )\ny = base.dist.geometric.quantile( 0.9, 0.1 )\ny = base.dist.geometric.quantile( -0.2, 0.1 )\ny = base.dist.geometric.quantile( NaN, 0.8 )\ny = base.dist.geometric.quantile( 0.4, NaN )\ny = base.dist.geometric.quantile( 0.5, -1.0 )\ny = base.dist.geometric.quantile( 0.5, 1.5 )\n",
	"base.dist.geometric.skewness": "v = base.dist.geometric.skewness( 0.1 )\nv = base.dist.geometric.skewness( 0.5 )\n",
	"base.dist.geometric.stdev": "v = base.dist.geometric.stdev( 0.1 )\nv = base.dist.geometric.stdev( 0.5 )\n",
	"base.dist.geometric.variance": "v = base.dist.geometric.variance( 0.1 )\nv = base.dist.geometric.variance( 0.5 )\n",
	"base.dist.gumbel.cdf": "y = base.dist.gumbel.cdf( 10.0, 0.0, 3.0 )\ny = base.dist.gumbel.cdf( -2.0, 0.0, 3.0 )\ny = base.dist.gumbel.cdf( 0.0, 0.0, 1.0 )\ny = base.dist.gumbel.cdf( NaN, 0.0, 1.0 )\ny = base.dist.gumbel.cdf( 0.0, NaN, 1.0 )\ny = base.dist.gumbel.cdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.gumbel.cdf( 0.0, 0.0, -1.0 )\n",
	"base.dist.gumbel.entropy": "y = base.dist.gumbel.entropy( 0.0, 1.0 )\ny = base.dist.gumbel.entropy( 4.0, 2.0 )\ny = base.dist.gumbel.entropy( NaN, 1.0 )\ny = base.dist.gumbel.entropy( 0.0, NaN )\ny = base.dist.gumbel.entropy( 0.0, 0.0 )\n",
	"base.dist.gumbel.Gumbel": "gumbel = base.dist.gumbel.Gumbel( -2.0, 3.0 );\ngumbel.mu\ngumbel.beta\ngumbel.entropy\ngumbel.kurtosis\ngumbel.mean\ngumbel.median\ngumbel.mode\ngumbel.skewness\ngumbel.stdev\ngumbel.variance\ngumbel.cdf( 0.8 )\ngumbel.logcdf( 0.8 )\ngumbel.logpdf( 1.0 )\ngumbel.mgf( 0.2 )\ngumbel.pdf( 1.0 )\ngumbel.quantile( 0.8 )\n",
	"base.dist.gumbel.kurtosis": "y = base.dist.gumbel.kurtosis( 0.0, 1.0 )\ny = base.dist.gumbel.kurtosis( 4.0, 2.0 )\ny = base.dist.gumbel.kurtosis( NaN, 1.0 )\ny = base.dist.gumbel.kurtosis( 0.0, NaN )\ny = base.dist.gumbel.kurtosis( 0.0, 0.0 )\n",
	"base.dist.gumbel.logcdf": "y = base.dist.gumbel.logcdf( 10.0, 0.0, 3.0 )\ny = base.dist.gumbel.logcdf( -2.0, 0.0, 3.0 )\ny = base.dist.gumbel.logcdf( 0.0, 0.0, 1.0 )\ny = base.dist.gumbel.logcdf( NaN, 0.0, 1.0 )\ny = base.dist.gumbel.logcdf( 0.0, NaN, 1.0 )\ny = base.dist.gumbel.logcdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.gumbel.logcdf( 0.0, 0.0, -1.0 )\n",
	"base.dist.gumbel.logpdf": "y = base.dist.gumbel.logpdf( 0.0, 0.0, 2.0 )\ny = base.dist.gumbel.logpdf( 0.0, 0.0, 1.0 )\ny = base.dist.gumbel.logpdf( 1.0, 3.0, 2.0 )\ny = base.dist.gumbel.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.gumbel.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.gumbel.logpdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.gumbel.logpdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.gumbel.mean": "y = base.dist.gumbel.mean( 0.0, 1.0 )\ny = base.dist.gumbel.mean( 4.0, 2.0 )\ny = base.dist.gumbel.mean( NaN, 1.0 )\ny = base.dist.gumbel.mean( 0.0, NaN )\ny = base.dist.gumbel.mean( 0.0, 0.0 )\n",
	"base.dist.gumbel.median": "y = base.dist.gumbel.median( 0.0, 1.0 )\ny = base.dist.gumbel.median( 4.0, 2.0 )\ny = base.dist.gumbel.median( NaN, 1.0 )\ny = base.dist.gumbel.median( 0.0, NaN )\ny = base.dist.gumbel.median( 0.0, 0.0 )\n",
	"base.dist.gumbel.mgf": "y = base.dist.gumbel.mgf( -1.0, 0.0, 3.0 )\ny = base.dist.gumbel.mgf( 0.0, 0.0, 1.0 )\ny = base.dist.gumbel.mgf( 0.1, 0.0, 3.0 )\ny = base.dist.gumbel.mgf( NaN, 0.0, 1.0 )\ny = base.dist.gumbel.mgf( 0.0, NaN, 1.0 )\ny = base.dist.gumbel.mgf( 0.0, 0.0, NaN )\n\n// Case: `t >= 1/beta`\ny = base.dist.gumbel.mgf( 0.8, 0.0, 2.0 )\n\n// Non-positive scale parameter:\ny = base.dist.gumbel.mgf( 0.0, 0.0, -1.0 )\n",
	"base.dist.gumbel.mode": "y = base.dist.gumbel.mode( 0.0, 1.0 )\ny = base.dist.gumbel.mode( 4.0, 2.0 )\ny = base.dist.gumbel.mode( NaN, 1.0 )\ny = base.dist.gumbel.mode( 0.0, NaN )\ny = base.dist.gumbel.mode( 0.0, 0.0 )\n",
	"base.dist.gumbel.pdf": "y = base.dist.gumbel.pdf( 0.0, 0.0, 2.0 )\ny = base.dist.gumbel.pdf( 0.0, 0.0, 1.0 )\ny = base.dist.gumbel.pdf( 1.0, 3.0, 2.0 )\ny = base.dist.gumbel.pdf( NaN, 0.0, 1.0 )\ny = base.dist.gumbel.pdf( 0.0, NaN, 1.0 )\ny = base.dist.gumbel.pdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.gumbel.pdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.gumbel.quantile": "y = base.dist.gumbel.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.gumbel.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.gumbel.quantile( 0.5, 4.0, 4.0 )\ny = base.dist.gumbel.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.gumbel.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.gumbel.quantile( NaN, 0.0, 1.0 )\ny = base.dist.gumbel.quantile( 0.0, NaN, 1.0 )\ny = base.dist.gumbel.quantile( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.gumbel.quantile( 0.5, 0.0, -1.0 )\n",
	"base.dist.gumbel.skewness": "y = base.dist.gumbel.skewness( 0.0, 1.0 )\ny = base.dist.gumbel.skewness( 4.0, 2.0 )\ny = base.dist.gumbel.skewness( NaN, 1.0 )\ny = base.dist.gumbel.skewness( 0.0, NaN )\ny = base.dist.gumbel.skewness( 0.0, 0.0 )\n",
	"base.dist.gumbel.stdev": "y = base.dist.gumbel.stdev( 0.0, 1.0 )\ny = base.dist.gumbel.stdev( 4.0, 2.0 )\ny = base.dist.gumbel.stdev( NaN, 1.0 )\ny = base.dist.gumbel.stdev( 0.0, NaN )\ny = base.dist.gumbel.stdev( 0.0, 0.0 )\n",
	"base.dist.gumbel.variance": "y = base.dist.gumbel.variance( 0.0, 1.0 )\ny = base.dist.gumbel.variance( 4.0, 2.0 )\ny = base.dist.gumbel.variance( NaN, 1.0 )\ny = base.dist.gumbel.variance( 0.0, NaN )\ny = base.dist.gumbel.variance( 0.0, 0.0 )\n",
	"base.dist.hypergeometric.cdf": "y = base.dist.hypergeometric.cdf( 1.0, 8, 4, 2 )\ny = base.dist.hypergeometric.cdf( 1.5, 8, 4, 2 )\ny = base.dist.hypergeometric.cdf( 2.0, 8, 4, 2 )\ny = base.dist.hypergeometric.cdf( 0, 8, 4, 2)\ny = base.dist.hypergeometric.cdf( NaN, 10, 5, 2 )\ny = base.dist.hypergeometric.cdf( 0.0, NaN, 5, 2 )\ny = base.dist.hypergeometric.cdf( 0.0, 10, NaN, 2 )\ny = base.dist.hypergeometric.cdf( 0.0, 10, 5, NaN )\ny = base.dist.hypergeometric.cdf( 2.0, 10.5, 5, 2 )\ny = base.dist.hypergeometric.cdf( 2.0, 10, 1.5, 2 )\ny = base.dist.hypergeometric.cdf( 2.0, 10, 5, -2.0 )\ny = base.dist.hypergeometric.cdf( 2.0, 10, 5, 12 )\ny = base.dist.hypergeometric.cdf( 2.0, 8, 3, 9 )\n",
	"base.dist.hypergeometric.Hypergeometric": "hypergeometric = base.dist.hypergeometric.Hypergeometric( 100, 70, 20 );\nhypergeometric.N\nhypergeometric.K\nhypergeometric.n\nhypergeometric.kurtosis\nhypergeometric.mean\nhypergeometric.mode\nhypergeometric.skewness\nhypergeometric.stdev\nhypergeometric.variance\nhypergeometric.cdf( 2.9 )\nhypergeometric.pmf( 10 )\nhypergeometric.quantile( 0.8 )\n",
	"base.dist.hypergeometric.kurtosis": "v = base.dist.hypergeometric.kurtosis( 16, 11, 4 )\nv = base.dist.hypergeometric.kurtosis( 4, 2, 2 )\nv = base.dist.hypergeometric.kurtosis( 10, 5, 12 )\nv = base.dist.hypergeometric.kurtosis( 10.3, 10, 4 )\nv = base.dist.hypergeometric.kurtosis( 10, 5.5, 4 )\nv = base.dist.hypergeometric.kurtosis( 10, 5, 4.5 )\nv = base.dist.hypergeometric.kurtosis( NaN, 10, 4 )\nv = base.dist.hypergeometric.kurtosis( 20, NaN, 4 )\nv = base.dist.hypergeometric.kurtosis( 20, 10, NaN )\n",
	"base.dist.hypergeometric.mean": "v = base.dist.hypergeometric.mean( 16, 11, 4 )\nv = base.dist.hypergeometric.mean( 2, 1, 1 )\nv = base.dist.hypergeometric.mean( 10, 5, 12 )\nv = base.dist.hypergeometric.mean( 10.3, 10, 4 )\nv = base.dist.hypergeometric.mean( 10, 5.5, 4 )\nv = base.dist.hypergeometric.mean( 10, 5, 4.5 )\nv = base.dist.hypergeometric.mean( NaN, 10, 4 )\nv = base.dist.hypergeometric.mean( 20, NaN, 4 )\nv = base.dist.hypergeometric.mean( 20, 10, NaN )\n",
	"base.dist.hypergeometric.mode": "v = base.dist.hypergeometric.mode( 16, 11, 4 )\nv = base.dist.hypergeometric.mode( 2, 1, 1 )\nv = base.dist.hypergeometric.mode( 10, 5, 12 )\nv = base.dist.hypergeometric.mode( 10.3, 10, 4 )\nv = base.dist.hypergeometric.mode( 10, 5.5, 4 )\nv = base.dist.hypergeometric.mode( 10, 5, 4.5 )\nv = base.dist.hypergeometric.mode( NaN, 10, 4 )\nv = base.dist.hypergeometric.mode( 20, NaN, 4 )\nv = base.dist.hypergeometric.mode( 20, 10, NaN )\n",
	"base.dist.hypergeometric.pmf": "y = base.dist.hypergeometric.pmf( 1.0, 8, 4, 2 )\ny = base.dist.hypergeometric.pmf( 2.0, 8, 4, 2 )\ny = base.dist.hypergeometric.pmf( 0.0, 8, 4, 2 )\ny = base.dist.hypergeometric.pmf( 1.5, 8, 4, 2 )\ny = base.dist.hypergeometric.pmf( NaN, 10, 5, 2 )\ny = base.dist.hypergeometric.pmf( 0.0, NaN, 5, 2 )\ny = base.dist.hypergeometric.pmf( 0.0, 10, NaN, 2 )\ny = base.dist.hypergeometric.pmf( 0.0, 10, 5, NaN )\ny = base.dist.hypergeometric.pmf( 2.0, 10.5, 5, 2 )\ny = base.dist.hypergeometric.pmf( 2.0, 5, 1.5, 2 )\ny = base.dist.hypergeometric.pmf( 2.0, 10, 5, -2.0 )\ny = base.dist.hypergeometric.pmf( 2.0, 10, 5, 12 )\ny = base.dist.hypergeometric.pmf( 2.0, 8, 3, 9 )\n",
	"base.dist.hypergeometric.quantile": "y = base.dist.hypergeometric.quantile( 0.4, 40, 20, 10 )\ny = base.dist.hypergeometric.quantile( 0.8, 60, 40, 20 )\ny = base.dist.hypergeometric.quantile( 0.5, 100, 10, 10 )\ny = base.dist.hypergeometric.quantile( 0.0, 100, 40, 20 )\ny = base.dist.hypergeometric.quantile( 1.0, 100, 40, 20 )\ny = base.dist.hypergeometric.quantile( NaN, 40, 20, 10 )\ny = base.dist.hypergeometric.quantile( 0.2, NaN, 20, 10 )\ny = base.dist.hypergeometric.quantile( 0.2, 40, NaN, 10 )\ny = base.dist.hypergeometric.quantile( 0.2, 40, 20, NaN )\n",
	"base.dist.hypergeometric.skewness": "v = base.dist.hypergeometric.skewness( 16, 11, 4 )\nv = base.dist.hypergeometric.skewness( 4, 2, 2 )\nv = base.dist.hypergeometric.skewness( 10, 5, 12 )\nv = base.dist.hypergeometric.skewness( 10.3, 10, 4 )\nv = base.dist.hypergeometric.skewness( 10, 5.5, 4 )\nv = base.dist.hypergeometric.skewness( 10, 5, 4.5 )\nv = base.dist.hypergeometric.skewness( NaN, 10, 4 )\nv = base.dist.hypergeometric.skewness( 20, NaN, 4 )\nv = base.dist.hypergeometric.skewness( 20, 10, NaN )\n",
	"base.dist.hypergeometric.stdev": "v = base.dist.hypergeometric.stdev( 16, 11, 4 )\nv = base.dist.hypergeometric.stdev( 2, 1, 1 )\nv = base.dist.hypergeometric.stdev( 10, 5, 12 )\nv = base.dist.hypergeometric.stdev( 10.3, 10, 4 )\nv = base.dist.hypergeometric.stdev( 10, 5.5, 4 )\nv = base.dist.hypergeometric.stdev( 10, 5, 4.5 )\nv = base.dist.hypergeometric.stdev( NaN, 10, 4 )\nv = base.dist.hypergeometric.stdev( 20, NaN, 4 )\nv = base.dist.hypergeometric.stdev( 20, 10, NaN )\n",
	"base.dist.hypergeometric.variance": "v = base.dist.hypergeometric.variance( 16, 11, 4 )\nv = base.dist.hypergeometric.variance( 2, 1, 1 )\nv = base.dist.hypergeometric.variance( 10, 5, 12 )\nv = base.dist.hypergeometric.variance( 10.3, 10, 4 )\nv = base.dist.hypergeometric.variance( 10, 5.5, 4 )\nv = base.dist.hypergeometric.variance( 10, 5, 4.5 )\nv = base.dist.hypergeometric.variance( NaN, 10, 4 )\nv = base.dist.hypergeometric.variance( 20, NaN, 4 )\nv = base.dist.hypergeometric.variance( 20, 10, NaN )\n",
	"base.dist.invgamma.cdf": "y = base.dist.invgamma.cdf( 2.0, 1.0, 1.0 )\ny = base.dist.invgamma.cdf( 2.0, 3.0, 1.0 )\ny = base.dist.invgamma.cdf( -1.0, 2.0, 2.0 )\ny = base.dist.invgamma.cdf( PINF, 4.0, 2.0 )\ny = base.dist.invgamma.cdf( NINF, 4.0, 2.0 )\ny = base.dist.invgamma.cdf( NaN, 0.0, 1.0 )\ny = base.dist.invgamma.cdf( 0.0, NaN, 1.0 )\ny = base.dist.invgamma.cdf( 0.0, 0.0, NaN )\ny = base.dist.invgamma.cdf( 2.0, -1.0, 1.0 )\ny = base.dist.invgamma.cdf( 2.0, 1.0, -1.0 )\n",
	"base.dist.invgamma.entropy": "v = base.dist.invgamma.entropy( 1.0, 1.0 )\nv = base.dist.invgamma.entropy( 4.0, 12.0 )\nv = base.dist.invgamma.entropy( 8.0, 2.0 )\n",
	"base.dist.invgamma.InvGamma": "invgamma = base.dist.invgamma.InvGamma( 6.0, 5.0 );\ninvgamma.alpha\ninvgamma.beta\ninvgamma.entropy\ninvgamma.kurtosis\ninvgamma.mean\ninvgamma.mode\ninvgamma.skewness\ninvgamma.stdev\ninvgamma.variance\ninvgamma.cdf( 0.8 )\ninvgamma.pdf( 1.0 )\ninvgamma.quantile( 0.8 )\n",
	"base.dist.invgamma.kurtosis": "v = base.dist.invgamma.kurtosis( 7.0, 5.0 )\nv = base.dist.invgamma.kurtosis( 6.0, 12.0 )\nv = base.dist.invgamma.kurtosis( 8.0, 2.0 )\n",
	"base.dist.invgamma.mean": "v = base.dist.invgamma.mean( 4.0, 12.0 )\nv = base.dist.invgamma.mean( 8.0, 2.0 )\n",
	"base.dist.invgamma.mode": "v = base.dist.invgamma.mode( 1.0, 1.0 )\nv = base.dist.invgamma.mode( 4.0, 12.0 )\nv = base.dist.invgamma.mode( 8.0, 2.0 )\n",
	"base.dist.invgamma.pdf": "y = base.dist.invgamma.pdf( 2.0, 0.5, 1.0 )\ny = base.dist.invgamma.pdf( 0.2, 1.0, 1.0 )\ny = base.dist.invgamma.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.invgamma.pdf( NaN, 1.0, 1.0 )\ny = base.dist.invgamma.pdf( 0.0, NaN, 1.0 )\ny = base.dist.invgamma.pdf( 0.0, 1.0, NaN )\n\n// Negative shape parameter:\ny = base.dist.invgamma.pdf( 2.0, -1.0, 1.0 )\n\n// Negative scale parameter:\ny = base.dist.invgamma.pdf( 2.0, 1.0, -1.0 )\n",
	"base.dist.invgamma.quantile": "y = base.dist.invgamma.quantile( 0.8, 2.0, 1.0 )\ny = base.dist.invgamma.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.invgamma.quantile( 1.1, 1.0, 1.0 )\ny = base.dist.invgamma.quantile( -0.2, 1.0, 1.0 )\ny = base.dist.invgamma.quantile( NaN, 1.0, 1.0 )\ny = base.dist.invgamma.quantile( 0.0, NaN, 1.0 )\ny = base.dist.invgamma.quantile( 0.0, 1.0, NaN )\n\n// Non-positive shape parameter:\ny = base.dist.invgamma.quantile( 0.5, -1.0, 1.0 )\n\n// Non-positive rate parameter:\ny = base.dist.invgamma.quantile( 0.5, 1.0, -1.0 )\n",
	"base.dist.invgamma.skewness": "v = base.dist.invgamma.skewness( 4.0, 12.0 )\nv = base.dist.invgamma.skewness( 8.0, 2.0 )\n",
	"base.dist.invgamma.stdev": "v = base.dist.invgamma.stdev( 5.0, 7.0 )\nv = base.dist.invgamma.stdev( 4.0, 12.0 )\nv = base.dist.invgamma.stdev( 8.0, 2.0 )\n",
	"base.dist.invgamma.variance": "v = base.dist.invgamma.variance( 5.0, 7.0 )\nv = base.dist.invgamma.variance( 4.0, 12.0 )\nv = base.dist.invgamma.variance( 8.0, 2.0 )\n",
	"base.dist.kumaraswamy.cdf": "y = base.dist.kumaraswamy.cdf( 0.5, 1.0, 1.0 )\ny = base.dist.kumaraswamy.cdf( 0.5, 2.0, 4.0 )\ny = base.dist.kumaraswamy.cdf( 0.2, 2.0, 2.0 )\ny = base.dist.kumaraswamy.cdf( 0.8, 4.0, 4.0 )\ny = base.dist.kumaraswamy.cdf( -0.5, 4.0, 2.0 )\ny = base.dist.kumaraswamy.cdf( 1.5, 4.0, 2.0 )\ny = base.dist.kumaraswamy.cdf( 2.0, -1.0, 0.5 )\ny = base.dist.kumaraswamy.cdf( 2.0, 0.5, -1.0 )\ny = base.dist.kumaraswamy.cdf( NaN, 1.0, 1.0 )\ny = base.dist.kumaraswamy.cdf( 0.0, NaN, 1.0 )\ny = base.dist.kumaraswamy.cdf( 0.0, 1.0, NaN )\n",
	"base.dist.kumaraswamy.Kumaraswamy": "kumaraswamy = base.dist.kumaraswamy.Kumaraswamy( 6.0, 5.0 );\nkumaraswamy.a\nkumaraswamy.b\nkumaraswamy.kurtosis\nkumaraswamy.mean\nkumaraswamy.mode\nkumaraswamy.skewness\nkumaraswamy.stdev\nkumaraswamy.variance\nkumaraswamy.cdf( 0.8 )\nkumaraswamy.pdf( 1.0 )\nkumaraswamy.quantile( 0.8 )\n",
	"base.dist.kumaraswamy.kurtosis": "v = base.dist.kumaraswamy.kurtosis( 1.0, 1.0 )\nv = base.dist.kumaraswamy.kurtosis( 4.0, 12.0 )\nv = base.dist.kumaraswamy.kurtosis( 16.0, 8.0 )\n",
	"base.dist.kumaraswamy.mean": "v = base.dist.kumaraswamy.mean( 1.5, 1.5 )\nv = base.dist.kumaraswamy.mean( 4.0, 12.0 )\nv = base.dist.kumaraswamy.mean( 16.0, 8.0 )\n",
	"base.dist.kumaraswamy.median": "v = base.dist.kumaraswamy.median( 1.0, 1.0 )\nv = base.dist.kumaraswamy.median( 4.0, 12.0 )\nv = base.dist.kumaraswamy.median( 16.0, 8.0 )\n",
	"base.dist.kumaraswamy.mode": "v = base.dist.kumaraswamy.mode( 1.5, 1.5 )\nv = base.dist.kumaraswamy.mode( 4.0, 12.0 )\nv = base.dist.kumaraswamy.mode( 16.0, 8.0 )\n",
	"base.dist.kumaraswamy.pdf": "y = base.dist.kumaraswamy.pdf( 0.5, 1.0, 1.0 )\ny = base.dist.kumaraswamy.pdf( 0.5, 2.0, 4.0 )\ny = base.dist.kumaraswamy.pdf( 0.2, 2.0, 2.0 )\ny = base.dist.kumaraswamy.pdf( 0.8, 4.0, 4.0 )\ny = base.dist.kumaraswamy.pdf( -0.5, 4.0, 2.0 )\ny = base.dist.kumaraswamy.pdf( 1.5, 4.0, 2.0 )\ny = base.dist.kumaraswamy.pdf( 2.0, -1.0, 0.5 )\ny = base.dist.kumaraswamy.pdf( 2.0, 0.5, -1.0 )\ny = base.dist.kumaraswamy.pdf( NaN, 1.0, 1.0 )\ny = base.dist.kumaraswamy.pdf( 0.0, NaN, 1.0 )\ny = base.dist.kumaraswamy.pdf( 0.0, 1.0, NaN )\n",
	"base.dist.kumaraswamy.skewness": "v = base.dist.kumaraswamy.skewness( 1.0, 1.0 )\nv = base.dist.kumaraswamy.skewness( 4.0, 12.0 )\nv = base.dist.kumaraswamy.skewness( 16.0, 8.0 )\n",
	"base.dist.kumaraswamy.stdev": "v = base.dist.kumaraswamy.stdev( 1.0, 1.0 )\nv = base.dist.kumaraswamy.stdev( 4.0, 12.0 )\nv = base.dist.kumaraswamy.stdev( 16.0, 8.0 )\n",
	"base.dist.kumaraswamy.variance": "v = base.dist.kumaraswamy.variance( 1.0, 1.0 )\nv = base.dist.kumaraswamy.variance( 4.0, 12.0 )\nv = base.dist.kumaraswamy.variance( 16.0, 8.0 )\n",
	"base.dist.laplace.cdf": "y = base.dist.laplace.cdf( 2.0, 0.0, 1.0 )\ny = base.dist.laplace.cdf( 5.0, 10.0, 3.0 )\ny = base.dist.laplace.cdf( NaN, 0.0, 1.0 )\ny = base.dist.laplace.cdf( 2, NaN, 1.0 )\ny = base.dist.laplace.cdf( 2.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.laplace.cdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.laplace.entropy": "y = base.dist.laplace.entropy( 0.0, 1.0 )\ny = base.dist.laplace.entropy( 4.0, 2.0 )\ny = base.dist.laplace.entropy( NaN, 1.0 )\ny = base.dist.laplace.entropy( 0.0, NaN )\ny = base.dist.laplace.entropy( 0.0, 0.0 )\n",
	"base.dist.laplace.kurtosis": "y = base.dist.laplace.kurtosis( 0.0, 1.0 )\ny = base.dist.laplace.kurtosis( 4.0, 2.0 )\ny = base.dist.laplace.kurtosis( NaN, 1.0 )\ny = base.dist.laplace.kurtosis( 0.0, NaN )\ny = base.dist.laplace.kurtosis( 0.0, 0.0 )\n",
	"base.dist.laplace.Laplace": "laplace = base.dist.laplace.Laplace( -2.0, 3.0 );\nlaplace.mu\nlaplace.b\nlaplace.entropy\nlaplace.kurtosis\nlaplace.mean\nlaplace.median\nlaplace.mode\nlaplace.skewness\nlaplace.stdev\nlaplace.variance\nlaplace.cdf( 0.8 )\nlaplace.logcdf( 0.8 )\nlaplace.logpdf( 1.0 )\nlaplace.mgf( 0.2 )\nlaplace.pdf( 2.0 )\nlaplace.quantile( 0.9 )\n",
	"base.dist.laplace.logcdf": "y = base.dist.laplace.logcdf( 2.0, 0.0, 1.0 )\ny = base.dist.laplace.logcdf( 5.0, 10.0, 3.0 )\ny = base.dist.laplace.logcdf( NaN, 0.0, 1.0 )\ny = base.dist.laplace.logcdf( 2, NaN, 1.0 )\ny = base.dist.laplace.logcdf( 2.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.laplace.logcdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.laplace.logpdf": "y = base.dist.laplace.logpdf( 2.0, 0.0, 1.0 )\ny = base.dist.laplace.logpdf( -1.0, 2.0, 3.0 )\ny = base.dist.laplace.logpdf( 2.5, 2.0, 3.0 )\ny = base.dist.laplace.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.laplace.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.laplace.logpdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.laplace.logpdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.laplace.mean": "y = base.dist.laplace.mean( 0.0, 1.0 )\ny = base.dist.laplace.mean( 4.0, 2.0 )\ny = base.dist.laplace.mean( NaN, 1.0 )\ny = base.dist.laplace.mean( 0.0, NaN )\ny = base.dist.laplace.mean( 0.0, 0.0 )\n",
	"base.dist.laplace.median": "y = base.dist.laplace.median( 0.0, 1.0 )\ny = base.dist.laplace.median( 4.0, 2.0 )\ny = base.dist.laplace.median( NaN, 1.0 )\ny = base.dist.laplace.median( 0.0, NaN )\ny = base.dist.laplace.median( 0.0, 0.0 )\n",
	"base.dist.laplace.mgf": "y = base.dist.laplace.mgf( 0.5, 0.0, 1.0 )\ny = base.dist.laplace.mgf( 0.0, 0.0, 1.0 )\ny = base.dist.laplace.mgf( -1.0, 4.0, 0.2 )\ny = base.dist.laplace.mgf( NaN, 0.0, 1.0 )\ny = base.dist.laplace.mgf( 0.0, NaN, 1.0 )\ny = base.dist.laplace.mgf( 0.0, 0.0, NaN )\ny = base.dist.laplace.mgf( 1.0, 0.0, 2.0 )\ny = base.dist.laplace.mgf( -0.5, 0.0, 4.0 )\ny = base.dist.laplace.mgf( 2.0, 0.0, 0.0 )\ny = base.dist.laplace.mgf( 2.0, 0.0, -1.0 )\n",
	"base.dist.laplace.mode": "y = base.dist.laplace.mode( 0.0, 1.0 )\ny = base.dist.laplace.mode( 4.0, 2.0 )\ny = base.dist.laplace.mode( NaN, 1.0 )\ny = base.dist.laplace.mode( 0.0, NaN )\ny = base.dist.laplace.mode( 0.0, 0.0 )\n",
	"base.dist.laplace.pdf": "y = base.dist.laplace.pdf( 2.0, 0.0, 1.0 )\ny = base.dist.laplace.pdf( -1.0, 2.0, 3.0 )\ny = base.dist.laplace.pdf( 2.5, 2.0, 3.0 )\ny = base.dist.laplace.pdf( NaN, 0.0, 1.0 )\ny = base.dist.laplace.pdf( 0.0, NaN, 1.0 )\ny = base.dist.laplace.pdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.laplace.pdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.laplace.quantile": "y = base.dist.laplace.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.laplace.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.laplace.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.laplace.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.laplace.quantile( NaN, 0.0, 1.0 )\ny = base.dist.laplace.quantile( 0.0, NaN, 1.0 )\ny = base.dist.laplace.quantile( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.laplace.quantile( 0.5, 0.0, -1.0 )\n",
	"base.dist.laplace.skewness": "y = base.dist.laplace.skewness( 0.0, 1.0 )\ny = base.dist.laplace.skewness( 4.0, 2.0 )\ny = base.dist.laplace.skewness( NaN, 1.0 )\ny = base.dist.laplace.skewness( 0.0, NaN )\ny = base.dist.laplace.skewness( 0.0, 0.0 )\n",
	"base.dist.laplace.stdev": "y = base.dist.laplace.stdev( 0.0, 1.0 )\ny = base.dist.laplace.stdev( 4.0, 2.0 )\ny = base.dist.laplace.stdev( NaN, 1.0 )\ny = base.dist.laplace.stdev( 0.0, NaN )\ny = base.dist.laplace.stdev( 0.0, 0.0 )\n",
	"base.dist.laplace.variance": "y = base.dist.laplace.variance( 0.0, 1.0 )\ny = base.dist.laplace.variance( 4.0, 2.0 )\ny = base.dist.laplace.variance( NaN, 1.0 )\ny = base.dist.laplace.variance( 0.0, NaN )\ny = base.dist.laplace.variance( 0.0, 0.0 )\n",
	"base.dist.levy.cdf": "y = base.dist.levy.cdf( 2.0, 0.0, 1.0 )\ny = base.dist.levy.cdf( 12.0, 10.0, 3.0 )\ny = base.dist.levy.cdf( 9.0, 10.0, 3.0 )\ny = base.dist.levy.cdf( NaN, 0.0, 1.0 )\ny = base.dist.levy.cdf( 2, NaN, 1.0 )\ny = base.dist.levy.cdf( 2.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.levy.cdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.levy.entropy": "y = base.dist.levy.entropy( 0.0, 1.0 )\ny = base.dist.levy.entropy( 4.0, 2.0 )\ny = base.dist.levy.entropy( NaN, 1.0 )\ny = base.dist.levy.entropy( 0.0, NaN )\ny = base.dist.levy.entropy( 0.0, 0.0 )\n",
	"base.dist.levy.Levy": "levy = base.dist.levy.Levy( -2.0, 3.0 );\nlevy.mu\nlevy.c\nlevy.entropy\nlevy.mean\nlevy.median\nlevy.mode\nlevy.stdev\nlevy.variance\nlevy.cdf( 0.8 )\nlevy.logpdf( 1.0 )\nlevy.pdf( 1.0 )\nlevy.quantile( 0.8 )\n",
	"base.dist.levy.logpdf": "y = base.dist.levy.logpdf( 2.0, 0.0, 1.0 )\ny = base.dist.levy.logpdf( -1.0, 4.0, 2.0 )\ny = base.dist.levy.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.levy.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.levy.logpdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.levy.logpdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.levy.mean": "y = base.dist.levy.mean( 0.0, 1.0 )\ny = base.dist.levy.mean( 4.0, 3.0 )\ny = base.dist.levy.mean( NaN, 1.0 )\ny = base.dist.levy.mean( 0.0, NaN )\ny = base.dist.levy.mean( 0.0, 0.0 )\n",
	"base.dist.levy.median": "y = base.dist.levy.median( 0.0, 1.0 )\ny = base.dist.levy.median( 4.0, 3.0 )\ny = base.dist.levy.median( NaN, 1.0 )\ny = base.dist.levy.median( 0.0, NaN )\ny = base.dist.levy.median( 0.0, 0.0 )\n",
	"base.dist.levy.mode": "y = base.dist.levy.mode( 0.0, 1.0 )\ny = base.dist.levy.mode( 4.0, 3.0 )\ny = base.dist.levy.mode( NaN, 1.0 )\ny = base.dist.levy.mode( 0.0, NaN )\ny = base.dist.levy.mode( 0.0, 0.0 )\n",
	"base.dist.levy.pdf": "y = base.dist.levy.pdf( 2.0, 0.0, 1.0 )\ny = base.dist.levy.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.levy.pdf( NaN, 0.0, 1.0 )\ny = base.dist.levy.pdf( 0.0, NaN, 1.0 )\ny = base.dist.levy.pdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.levy.pdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.levy.quantile": "y = base.dist.levy.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.levy.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.levy.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.levy.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.levy.quantile( NaN, 0.0, 1.0 )\ny = base.dist.levy.quantile( 0.0, NaN, 1.0 )\ny = base.dist.levy.quantile( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.levy.quantile( 0.5, 0.0, -1.0 )\n",
	"base.dist.levy.stdev": "y = base.dist.levy.stdev( 0.0, 1.0 )\ny = base.dist.levy.stdev( 4.0, 3.0 )\ny = base.dist.levy.stdev( NaN, 1.0 )\ny = base.dist.levy.stdev( 0.0, NaN )\ny = base.dist.levy.stdev( 0.0, 0.0 )\n",
	"base.dist.levy.variance": "y = base.dist.levy.variance( 0.0, 1.0 )\ny = base.dist.levy.variance( 4.0, 3.0 )\ny = base.dist.levy.variance( NaN, 1.0 )\ny = base.dist.levy.variance( 0.0, NaN )\ny = base.dist.levy.variance( 0.0, 0.0 )\n",
	"base.dist.logistic.cdf": "y = base.dist.logistic.cdf( 2.0, 0.0, 1.0 )\ny = base.dist.logistic.cdf( 5.0, 10.0, 3.0 )\ny = base.dist.logistic.cdf( 2.0, 0.0, NaN )\ny = base.dist.logistic.cdf( 2.0, NaN, 1.0 )\ny = base.dist.logistic.cdf( NaN, 0.0, 1.0 )\n\n// Degenerate distribution centered at `μ` when `s = 0.0`:\ny = base.dist.logistic.cdf( 2.0, 8.0, 0.0 )\ny = base.dist.logistic.cdf( 8.0, 8.0, 0.0 )\ny = base.dist.logistic.cdf( 10.0, 8.0, 0.0 )\n",
	"base.dist.logistic.entropy": "y = base.dist.logistic.entropy( 0.0, 1.0 )\ny = base.dist.logistic.entropy( 4.0, 2.0 )\ny = base.dist.logistic.entropy( NaN, 1.0 )\ny = base.dist.logistic.entropy( 0.0, NaN )\ny = base.dist.logistic.entropy( 0.0, 0.0 )\n",
	"base.dist.logistic.kurtosis": "y = base.dist.logistic.kurtosis( 0.0, 1.0 )\ny = base.dist.logistic.kurtosis( 4.0, 2.0 )\ny = base.dist.logistic.kurtosis( NaN, 1.0 )\ny = base.dist.logistic.kurtosis( 0.0, NaN )\ny = base.dist.logistic.kurtosis( 0.0, 0.0 )\n",
	"base.dist.logistic.logcdf": "y = base.dist.logistic.logcdf( 2.0, 0.0, 1.0 )\ny = base.dist.logistic.logcdf( 5.0, 10.0, 3.0 )\ny = base.dist.logistic.logcdf( 2.0, 0.0, NaN )\ny = base.dist.logistic.logcdf( 2, NaN, 1.0 )\ny = base.dist.logistic.logcdf( NaN, 0.0, 1.0 )\n",
	"base.dist.logistic.Logistic": "logistic = base.dist.logistic.Logistic( -2.0, 3.0 );\nlogistic.mu\nlogistic.s\nlogistic.entropy\nlogistic.kurtosis\nlogistic.mean\nlogistic.median\nlogistic.mode\nlogistic.skewness\nlogistic.stdev\nlogistic.variance\nlogistic.cdf( 0.8 )\nlogistic.logcdf( 0.8 )\nlogistic.logpdf( 2.0 )\nlogistic.mgf( 0.2 )\nlogistic.pdf( 2.0 )\nlogistic.quantile( 0.9 )\n",
	"base.dist.logistic.logpdf": "y = base.dist.logistic.logpdf( 2.0, 0.0, 1.0 )\ny = base.dist.logistic.logpdf( -1.0, 4.0, 2.0 )\ny = base.dist.logistic.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.logistic.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.logistic.logpdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.logistic.logpdf( 2.0, 0.0, -1.0 )\n\n// Degenerate distribution at `s = 0.0`:\ny = base.dist.logistic.logpdf( 2.0, 8.0, 0.0 )\ny = base.dist.logistic.logpdf( 8.0, 8.0, 0.0 )\n",
	"base.dist.logistic.mean": "y = base.dist.logistic.mean( 0.0, 1.0 )\ny = base.dist.logistic.mean( 4.0, 2.0 )\ny = base.dist.logistic.mean( NaN, 1.0 )\ny = base.dist.logistic.mean( 0.0, NaN )\ny = base.dist.logistic.mean( 0.0, 0.0 )\n",
	"base.dist.logistic.median": "y = base.dist.logistic.median( 0.0, 1.0 )\ny = base.dist.logistic.median( 4.0, 2.0 )\ny = base.dist.logistic.median( NaN, 1.0 )\ny = base.dist.logistic.median( 0.0, NaN )\ny = base.dist.logistic.median( 0.0, 0.0 )\n",
	"base.dist.logistic.mgf": "y = base.dist.logistic.mgf( 0.9, 0.0, 1.0 )\ny = base.dist.logistic.mgf( 0.1, 4.0, 4.0 )\ny = base.dist.logistic.mgf( -0.2, 4.0, 4.0 )\ny = base.dist.logistic.mgf( 0.5, 0.0, -1.0 )\ny = base.dist.logistic.mgf( 0.5, 0.0, 4.0 )\ny = base.dist.logistic.mgf( NaN, 0.0, 1.0 )\ny = base.dist.logistic.mgf( 0.0, NaN, 1.0 )\ny = base.dist.logistic.mgf( 0.0, 0.0, NaN )\n",
	"base.dist.logistic.mode": "y = base.dist.logistic.mode( 0.0, 1.0 )\ny = base.dist.logistic.mode( 4.0, 2.0 )\ny = base.dist.logistic.mode( NaN, 1.0 )\ny = base.dist.logistic.mode( 0.0, NaN )\ny = base.dist.logistic.mode( 0.0, 0.0 )\n",
	"base.dist.logistic.pdf": "y = base.dist.logistic.pdf( 2.0, 0.0, 1.0 )\ny = base.dist.logistic.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.logistic.pdf( NaN, 0.0, 1.0 )\ny = base.dist.logistic.pdf( 0.0, NaN, 1.0 )\ny = base.dist.logistic.pdf( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.logistic.pdf( 2.0, 0.0, -1.0 )\ny = base.dist.logistic.pdf( 2.0, 8.0, 0.0 )\ny = base.dist.logistic.pdf( 8.0, 8.0, 0.0 )\n",
	"base.dist.logistic.quantile": "y = base.dist.logistic.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.logistic.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.logistic.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.logistic.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.logistic.quantile( NaN, 0.0, 1.0 )\ny = base.dist.logistic.quantile( 0.0, NaN, 1.0 )\ny = base.dist.logistic.quantile( 0.0, 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.logistic.quantile( 0.5, 0.0, -1.0 )\n",
	"base.dist.logistic.skewness": "y = base.dist.logistic.skewness( 0.0, 1.0 )\ny = base.dist.logistic.skewness( 4.0, 2.0 )\ny = base.dist.logistic.skewness( NaN, 1.0 )\ny = base.dist.logistic.skewness( 0.0, NaN )\ny = base.dist.logistic.skewness( 0.0, 0.0 )\n",
	"base.dist.logistic.stdev": "y = base.dist.logistic.stdev( 0.0, 1.0 )\ny = base.dist.logistic.stdev( 4.0, 2.0 )\ny = base.dist.logistic.stdev( NaN, 1.0 )\ny = base.dist.logistic.stdev( 0.0, NaN )\ny = base.dist.logistic.stdev( 0.0, 0.0 )\n",
	"base.dist.logistic.variance": "y = base.dist.logistic.variance( 0.0, 1.0 )\ny = base.dist.logistic.variance( 4.0, 2.0 )\ny = base.dist.logistic.variance( NaN, 1.0 )\ny = base.dist.logistic.variance( 0.0, NaN )\ny = base.dist.logistic.variance( 0.0, 0.0 )\n",
	"base.dist.lognormal.cdf": "y = base.dist.lognormal.cdf( 2.0, 0.0, 1.0 )\ny = base.dist.lognormal.cdf( 5.0, 10.0, 3.0 )\ny = base.dist.lognormal.cdf( 2.0, 0.0, NaN )\ny = base.dist.lognormal.cdf( 2.0, NaN, 1.0 )\ny = base.dist.lognormal.cdf( NaN, 0.0, 1.0 )\n\n// Non-positive scale parameter `σ`:\ny = base.dist.lognormal.cdf( 2.0, 0.0, -1.0 )\ny = base.dist.lognormal.cdf( 2.0, 0.0, 0.0 )\n",
	"base.dist.lognormal.entropy": "y = base.dist.lognormal.entropy( 0.0, 1.0 )\ny = base.dist.lognormal.entropy( 5.0, 2.0 )\ny = base.dist.lognormal.entropy( NaN, 1.0 )\ny = base.dist.lognormal.entropy( 0.0, NaN )\ny = base.dist.lognormal.entropy( 0.0, 0.0 )\n",
	"base.dist.lognormal.kurtosis": "y = base.dist.lognormal.kurtosis( 0.0, 1.0 )\ny = base.dist.lognormal.kurtosis( 5.0, 2.0 )\ny = base.dist.lognormal.kurtosis( NaN, 1.0 )\ny = base.dist.lognormal.kurtosis( 0.0, NaN )\ny = base.dist.lognormal.kurtosis( 0.0, 0.0 )\n",
	"base.dist.lognormal.LogNormal": "lognormal = base.dist.lognormal.LogNormal( -2.0, 3.0 );\nlognormal.mu\nlognormal.sigma\nlognormal.entropy\nlognormal.kurtosis\nlognormal.mean\nlognormal.median\nlognormal.mode\nlognormal.skewness\nlognormal.stdev\nlognormal.variance\nlognormal.cdf( 0.8 )\nlognormal.pdf( 2.0 )\nlognormal.quantile( 0.9 )\n",
	"base.dist.lognormal.mean": "y = base.dist.lognormal.mean( 0.0, 1.0 )\ny = base.dist.lognormal.mean( 4.0, 2.0 )\ny = base.dist.lognormal.mean( NaN, 1.0 )\ny = base.dist.lognormal.mean( 0.0, NaN )\ny = base.dist.lognormal.mean( 0.0, 0.0 )\n",
	"base.dist.lognormal.median": "y = base.dist.lognormal.median( 0.0, 1.0 )\ny = base.dist.lognormal.median( 5.0, 2.0 )\ny = base.dist.lognormal.median( NaN, 1.0 )\ny = base.dist.lognormal.median( 0.0, NaN )\ny = base.dist.lognormal.median( 0.0, 0.0 )\n",
	"base.dist.lognormal.mode": "y = base.dist.lognormal.mode( 0.0, 1.0 )\ny = base.dist.lognormal.mode( 5.0, 2.0 )\ny = base.dist.lognormal.mode( NaN, 1.0 )\ny = base.dist.lognormal.mode( 0.0, NaN )\ny = base.dist.lognormal.mode( 0.0, 0.0 )\n",
	"base.dist.lognormal.pdf": "y = base.dist.lognormal.pdf( 2.0, 0.0, 1.0 )\ny = base.dist.lognormal.pdf( 1.0, 0.0, 1.0 )\ny = base.dist.lognormal.pdf( 1.0, 3.0, 1.0 )\ny = base.dist.lognormal.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.lognormal.pdf( NaN, 0.0, 1.0 )\ny = base.dist.lognormal.pdf( 0.0, NaN, 1.0 )\ny = base.dist.lognormal.pdf( 0.0, 0.0, NaN )\n\n// Non-positive scale parameter `σ`:\ny = base.dist.lognormal.pdf( 2.0, 0.0, -1.0 )\ny = base.dist.lognormal.pdf( 2.0, 0.0, 0.0 )\n",
	"base.dist.lognormal.quantile": "y = base.dist.lognormal.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.lognormal.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.lognormal.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.lognormal.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.lognormal.quantile( NaN, 0.0, 1.0 )\ny = base.dist.lognormal.quantile( 0.0, NaN, 1.0 )\ny = base.dist.lognormal.quantile( 0.0, 0.0, NaN )\n\n// Non-positive scale parameter `σ`:\ny = base.dist.lognormal.quantile( 0.5, 0.0, -1.0 )\ny = base.dist.lognormal.quantile( 0.5, 0.0, 0.0 )\n",
	"base.dist.lognormal.skewness": "y = base.dist.lognormal.skewness( 0.0, 1.0 )\ny = base.dist.lognormal.skewness( 5.0, 2.0 )\ny = base.dist.lognormal.skewness( NaN, 1.0 )\ny = base.dist.lognormal.skewness( 0.0, NaN )\ny = base.dist.lognormal.skewness( 0.0, 0.0 )\n",
	"base.dist.lognormal.stdev": "y = base.dist.lognormal.stdev( 0.0, 1.0 )\ny = base.dist.lognormal.stdev( 4.0, 2.0 )\ny = base.dist.lognormal.stdev( NaN, 1.0 )\ny = base.dist.lognormal.stdev( 0.0, NaN )\ny = base.dist.lognormal.stdev( 0.0, 0.0 )\n",
	"base.dist.lognormal.variance": "y = base.dist.lognormal.variance( 0.0, 1.0 )\ny = base.dist.lognormal.variance( 4.0, 2.0 )\ny = base.dist.lognormal.variance( NaN, 1.0 )\ny = base.dist.lognormal.variance( 0.0, NaN )\ny = base.dist.lognormal.variance( 0.0, 0.0 )\n",
	"base.dist.negativeBinomial.cdf": "y = base.dist.negativeBinomial.cdf( 5.0, 20.0, 0.8 )\ny = base.dist.negativeBinomial.cdf( 21.0, 20.0, 0.5 )\ny = base.dist.negativeBinomial.cdf( 5.0, 10.0, 0.4 )\ny = base.dist.negativeBinomial.cdf( 0.0, 10.0, 0.9 )\ny = base.dist.negativeBinomial.cdf( 21.0, 15.5, 0.5 )\ny = base.dist.negativeBinomial.cdf( 5.0, 7.4, 0.4 )\ny = base.dist.negativeBinomial.cdf( 2.0, 0.0, 0.5 )\ny = base.dist.negativeBinomial.cdf( 2.0, -2.0, 0.5 )\ny = base.dist.negativeBinomial.cdf( NaN, 20.0, 0.5 )\ny = base.dist.negativeBinomial.cdf( 0.0, NaN, 0.5 )\ny = base.dist.negativeBinomial.cdf( 0.0, 20.0, NaN )\ny = base.dist.negativeBinomial.cdf( 2.0, 20, -1.0 )\ny = base.dist.negativeBinomial.cdf( 2.0, 20, 1.5 )\n",
	"base.dist.negativeBinomial.kurtosis": "v = base.dist.negativeBinomial.kurtosis( 100, 0.2 )\nv = base.dist.negativeBinomial.kurtosis( 20, 0.5 )\n",
	"base.dist.negativeBinomial.mean": "v = base.dist.negativeBinomial.mean( 100, 0.2 )\nv = base.dist.negativeBinomial.mean( 20, 0.5 )\n",
	"base.dist.negativeBinomial.mgf": "y = base.dist.negativeBinomial.mgf( 0.05, 20.0, 0.8 )\ny = base.dist.negativeBinomial.mgf( 0.1, 20.0, 0.1 )\ny = base.dist.negativeBinomial.mgf( 0.5, 10.0, 0.4 )\ny = base.dist.negativeBinomial.mgf( 0.1, 0.0, 0.5 )\ny = base.dist.negativeBinomial.mgf( 0.1, -2.0, 0.5 )\ny = base.dist.negativeBinomial.mgf( NaN, 20.0, 0.5 )\ny = base.dist.negativeBinomial.mgf( 0.0, NaN, 0.5 )\ny = base.dist.negativeBinomial.mgf( 0.0, 20.0, NaN )\ny = base.dist.negativeBinomial.mgf( 0.2, 20, -1.0 )\ny = base.dist.negativeBinomial.mgf( 0.2, 20, 1.5 )\n",
	"base.dist.negativeBinomial.mode": "v = base.dist.negativeBinomial.mode( 100, 0.2 )\nv = base.dist.negativeBinomial.mode( 20, 0.5 )\n",
	"base.dist.negativeBinomial.NegativeBinomial": "nbinomial = base.dist.negativeBinomial.NegativeBinomial( 8.0, 0.5 );\nnbinomial.r\nnbinomial.p\nnbinomial.kurtosis\nnbinomial.mean\nnbinomial.mode\nnbinomial.skewness\nnbinomial.stdev\nnbinomial.variance\nnbinomial.cdf( 2.9 )\nnbinomial.mgf( 0.2 )\nnbinomial.pmf( 3.0 )\nnbinomial.quantile( 0.8 )\n",
	"base.dist.negativeBinomial.pmf": "y = base.dist.negativeBinomial.pmf( 5.0, 20.0, 0.8 )\ny = base.dist.negativeBinomial.pmf( 21.0, 20.0, 0.5 )\ny = base.dist.negativeBinomial.pmf( 5.0, 10.0, 0.4 )\ny = base.dist.negativeBinomial.pmf( 0.0, 10.0, 0.9 )\ny = base.dist.negativeBinomial.pmf( 21.0, 15.5, 0.5 )\ny = base.dist.negativeBinomial.pmf( 5.0, 7.4, 0.4 )\ny = base.dist.negativeBinomial.pmf( 2.0, 0.0, 0.5 )\ny = base.dist.negativeBinomial.pmf( 2.0, -2.0, 0.5 )\ny = base.dist.negativeBinomial.pmf( 2.0, 20, -1.0 )\ny = base.dist.negativeBinomial.pmf( 2.0, 20, 1.5 )\ny = base.dist.negativeBinomial.pmf( NaN, 20.0, 0.5 )\ny = base.dist.negativeBinomial.pmf( 0.0, NaN, 0.5 )\ny = base.dist.negativeBinomial.pmf( 0.0, 20.0, NaN )\n",
	"base.dist.negativeBinomial.quantile": "y = base.dist.negativeBinomial.quantile( 0.9, 20.0, 0.2 )\ny = base.dist.negativeBinomial.quantile( 0.9, 20.0, 0.8 )\ny = base.dist.negativeBinomial.quantile( 0.5, 10.0, 0.4 )\ny = base.dist.negativeBinomial.quantile( 0.0, 10.0, 0.9 )\ny = base.dist.negativeBinomial.quantile( 1.1, 20.0, 0.5 )\ny = base.dist.negativeBinomial.quantile( -0.1, 20.0, 0.5 )\ny = base.dist.negativeBinomial.quantile( 21.0, 15.5, 0.5 )\ny = base.dist.negativeBinomial.quantile( 5.0, 7.4, 0.4 )\ny = base.dist.negativeBinomial.quantile( 0.5, 0.0, 0.5 )\ny = base.dist.negativeBinomial.quantile( 0.5, -2.0, 0.5 )\ny = base.dist.negativeBinomial.quantile( 0.3, 20.0, -1.0 )\ny = base.dist.negativeBinomial.quantile( 0.3, 20.0, 1.5 )\ny = base.dist.negativeBinomial.quantile( NaN, 20.0, 0.5 )\ny = base.dist.negativeBinomial.quantile( 0.3, NaN, 0.5 )\ny = base.dist.negativeBinomial.quantile( 0.3, 20.0, NaN )\n",
	"base.dist.negativeBinomial.skewness": "v = base.dist.negativeBinomial.skewness( 100, 0.2 )\nv = base.dist.negativeBinomial.skewness( 20, 0.5 )\n",
	"base.dist.negativeBinomial.stdev": "v = base.dist.negativeBinomial.stdev( 100, 0.2 )\nv = base.dist.negativeBinomial.stdev( 20, 0.5 )\n",
	"base.dist.negativeBinomial.variance": "v = base.dist.negativeBinomial.variance( 100, 0.2 )\nv = base.dist.negativeBinomial.variance( 20, 0.5 )\n",
	"base.dist.normal.cdf": "y = base.dist.normal.cdf( 2.0, 0.0, 1.0 )\ny = base.dist.normal.cdf( -1.0, -1.0, 2.0 )\ny = base.dist.normal.cdf( -1.0, 4.0, 2.0 )\ny = base.dist.normal.cdf( NaN, 0.0, 1.0 )\ny = base.dist.normal.cdf( 0.0, NaN, 1.0 )\ny = base.dist.normal.cdf( 0.0, 0.0, NaN )\n\n// Negative standard deviation:\ny = base.dist.normal.cdf( 2.0, 0.0, -1.0 )\n\n// Degenerate distribution centered at `μ` when `σ = 0.0`:\ny = base.dist.normal.cdf( 2.0, 8.0, 0.0 )\ny = base.dist.normal.cdf( 8.0, 8.0, 0.0 )\ny = base.dist.normal.cdf( 10.0, 8.0, 0.0 )\n",
	"base.dist.normal.entropy": "y = base.dist.normal.entropy( 0.0, 1.0 )\ny = base.dist.normal.entropy( 4.0, 3.0 )\ny = base.dist.normal.entropy( NaN, 1.0 )\ny = base.dist.normal.entropy( 0.0, NaN )\ny = base.dist.normal.entropy( 0.0, 0.0 )\n",
	"base.dist.normal.kurtosis": "y = base.dist.normal.kurtosis( 0.0, 1.0 )\ny = base.dist.normal.kurtosis( 4.0, 3.0 )\ny = base.dist.normal.kurtosis( NaN, 1.0 )\ny = base.dist.normal.kurtosis( 0.0, NaN )\ny = base.dist.normal.kurtosis( 0.0, 0.0 )\n",
	"base.dist.normal.mean": "y = base.dist.normal.mean( 0.0, 1.0 )\ny = base.dist.normal.mean( 4.0, 2.0 )\ny = base.dist.normal.mean( NaN, 1.0 )\ny = base.dist.normal.mean( 0.0, NaN )\ny = base.dist.normal.mean( 0.0, 0.0 )\n",
	"base.dist.normal.median": "y = base.dist.normal.median( 0.0, 1.0 )\ny = base.dist.normal.median( 4.0, 2.0 )\ny = base.dist.normal.median( NaN, 1.0 )\ny = base.dist.normal.median( 0.0, NaN )\ny = base.dist.normal.median( 0.0, 0.0 )\n",
	"base.dist.normal.mgf": "y = base.dist.normal.mgf( 2.0, 0.0, 1.0 )\ny = base.dist.normal.mgf( 0.0, 0.0, 1.0 )\ny = base.dist.normal.mgf( -1.0, 4.0, 2.0 )\ny = base.dist.normal.mgf( NaN, 0.0, 1.0 )\ny = base.dist.normal.mgf( 0.0, NaN, 1.0 )\ny = base.dist.normal.mgf( 0.0, 0.0, NaN )\ny = base.dist.normal.mgf( 2.0, 0.0, 0.0 )\n",
	"base.dist.normal.mode": "y = base.dist.normal.mode( 0.0, 1.0 )\ny = base.dist.normal.mode( 4.0, 2.0 )\ny = base.dist.normal.mode( NaN, 1.0 )\ny = base.dist.normal.mode( 0.0, NaN )\ny = base.dist.normal.mode( 0.0, 0.0 )\n",
	"base.dist.normal.Normal": "normal = base.dist.normal.Normal( -2.0, 3.0 );\nnormal.mu\nnormal.sigma\nnormal.entropy\nnormal.kurtosis\nnormal.mean\nnormal.median\nnormal.mode\nnormal.skewness\nnormal.stdev\nnormal.variance\nnormal.cdf( 0.8 )\nnormal.mgf( 0.2 )\nnormal.pdf( 2.0 )\nnormal.quantile( 0.9 )\n",
	"base.dist.normal.pdf": "y = base.dist.normal.pdf( 2.0, 0.0, 1.0 )\ny = base.dist.normal.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.normal.pdf( NaN, 0.0, 1.0 )\ny = base.dist.normal.pdf( 0.0, NaN, 1.0 )\ny = base.dist.normal.pdf( 0.0, 0.0, NaN )\n\n// Negative standard deviation:\ny = base.dist.normal.pdf( 2.0, 0.0, -1.0 )\n\n// Degenerate distribution centered at `μ` when `σ = 0.0`:\ny = base.dist.normal.pdf( 2.0, 8.0, 0.0 )\ny = base.dist.normal.pdf( 8.0, 8.0, 0.0 )\n",
	"base.dist.normal.quantile": "y = base.dist.normal.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.normal.quantile( 0.5, 4.0, 2.0 )\ny = base.dist.normal.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.normal.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.normal.quantile( NaN, 0.0, 1.0 )\ny = base.dist.normal.quantile( 0.0, NaN, 1.0 )\ny = base.dist.normal.quantile( 0.0, 0.0, NaN )\n\n// Negative standard deviation:\ny = base.dist.normal.quantile( 0.5, 0.0, -1.0 )\n\n// Degenerate distribution centered at `μ` when `σ = 0.0`:\ny = base.dist.normal.quantile( 0.3, 8.0, 0.0 );\ny = base.dist.normal.quantile( 0.9, 8.0, 0.0 );\n",
	"base.dist.normal.skewness": "y = base.dist.normal.skewness( 0.0, 1.0 )\ny = base.dist.normal.skewness( 4.0, 3.0 )\ny = base.dist.normal.skewness( NaN, 1.0 )\ny = base.dist.normal.skewness( 0.0, NaN )\ny = base.dist.normal.skewness( 0.0, 0.0 )\n",
	"base.dist.normal.stdev": "y = base.dist.normal.stdev( 0.0, 1.0 )\ny = base.dist.normal.stdev( 4.0, 3.0 )\ny = base.dist.normal.stdev( NaN, 1.0 )\ny = base.dist.normal.stdev( 0.0, NaN )\ny = base.dist.normal.stdev( 0.0, 0.0 )\n",
	"base.dist.normal.variance": "y = base.dist.normal.variance( 0.0, 1.0 )\ny = base.dist.normal.variance( 4.0, 3.0 )\ny = base.dist.normal.variance( NaN, 1.0 )\ny = base.dist.normal.variance( 0.0, NaN )\ny = base.dist.normal.variance( 0.0, 0.0 )\n",
	"base.dist.pareto1.cdf": "y = base.dist.pareto1.cdf( 2.0, 1.0, 1.0 )\ny = base.dist.pareto1.cdf( 5.0, 2.0, 4.0 )\ny = base.dist.pareto1.cdf( 4.0, 2.0, 2.0 )\ny = base.dist.pareto1.cdf( 1.9, 2.0, 2.0 )\ny = base.dist.pareto1.cdf( PINF, 4.0, 2.0 )\ny = base.dist.pareto1.cdf( 2.0, -1.0, 0.5 )\ny = base.dist.pareto1.cdf( 2.0, 0.5, -1.0 )\ny = base.dist.pareto1.cdf( NaN, 1.0, 1.0 )\ny = base.dist.pareto1.cdf( 0.0, NaN, 1.0 )\ny = base.dist.pareto1.cdf( 0.0, 1.0, NaN )\n",
	"base.dist.pareto1.entropy": "v = base.dist.pareto1.entropy( 0.8, 1.0 )\nv = base.dist.pareto1.entropy( 4.0, 12.0 )\nv = base.dist.pareto1.entropy( 8.0, 2.0 )\n",
	"base.dist.pareto1.kurtosis": "v = base.dist.pareto1.kurtosis( 5.0, 1.0 )\nv = base.dist.pareto1.kurtosis( 4.5, 12.0 )\nv = base.dist.pareto1.kurtosis( 8.0, 2.0 )\n",
	"base.dist.pareto1.mean": "v = base.dist.pareto1.mean( 0.8, 1.0 )\nv = base.dist.pareto1.mean( 4.0, 12.0 )\nv = base.dist.pareto1.mean( 8.0, 2.0 )\n",
	"base.dist.pareto1.median": "v = base.dist.pareto1.median( 0.8, 1.0 )\nv = base.dist.pareto1.median( 4.0, 12.0 )\nv = base.dist.pareto1.median( 8.0, 2.0 )\n",
	"base.dist.pareto1.mode": "v = base.dist.pareto1.mode( 0.8, 1.0 )\nv = base.dist.pareto1.mode( 4.0, 12.0 )\nv = base.dist.pareto1.mode( 8.0, 2.0 )\n",
	"base.dist.pareto1.Pareto1": "pareto1 = base.dist.pareto1.Pareto1( 6.0, 5.0 );\npareto1.alpha\npareto1.beta\npareto1.entropy\npareto1.kurtosis\npareto1.mean\npareto1.median\npareto1.mode\npareto1.skewness\npareto1.variance\npareto1.cdf( 7.0 )\npareto1.pdf( 5.0 )\npareto1.quantile( 0.8 )\n",
	"base.dist.pareto1.pdf": "y = base.dist.pareto1.pdf( 4.0, 1.0, 1.0 )\ny = base.dist.pareto1.pdf( 20.0, 1.0, 10.0 )\ny = base.dist.pareto1.pdf( 7.0, 2.0, 6.0 )\ny = base.dist.pareto1.pdf( 7.0, 6.0, 3.0 )\ny = base.dist.pareto1.pdf( 1.0, 4.0, 2.0 )\ny = base.dist.pareto1.pdf( 1.5, 4.0, 2.0 )\ny = base.dist.pareto1.pdf( 0.5, -1.0, 0.5 )\ny = base.dist.pareto1.pdf( 0.5, 0.5, -1.0 )\ny = base.dist.pareto1.pdf( NaN, 1.0, 1.0 )\ny = base.dist.pareto1.pdf( 0.5, NaN, 1.0 )\ny = base.dist.pareto1.pdf( 0.5, 1.0, NaN )\n",
	"base.dist.pareto1.quantile": "y = base.dist.pareto1.quantile( 0.8, 2.0, 1.0 )\ny = base.dist.pareto1.quantile( 0.8, 1.0, 10.0 )\ny = base.dist.pareto1.quantile( 0.1, 1.0, 10.0 )\ny = base.dist.pareto1.quantile( 1.1, 1.0, 1.0 )\ny = base.dist.pareto1.quantile( -0.2, 1.0, 1.0 )\ny = base.dist.pareto1.quantile( NaN, 1.0, 1.0 )\ny = base.dist.pareto1.quantile( 0.5, NaN, 1.0 )\ny = base.dist.pareto1.quantile( 0.5, 1.0, NaN )\ny = base.dist.pareto1.quantile( 0.5, -1.0, 1.0 )\ny = base.dist.pareto1.quantile( 0.5, 1.0, -1.0 )\n",
	"base.dist.pareto1.skewness": "v = base.dist.pareto1.skewness( 3.5, 1.0 )\nv = base.dist.pareto1.skewness( 4.0, 12.0 )\nv = base.dist.pareto1.skewness( 8.0, 2.0 )\n",
	"base.dist.pareto1.variance": "v = base.dist.pareto1.variance( 0.8, 1.0 )\nv = base.dist.pareto1.variance( 4.0, 12.0 )\nv = base.dist.pareto1.variance( 8.0, 2.0 )\n",
	"base.dist.poisson.cdf": "y = base.dist.poisson.cdf( 2.0, 0.5 )\ny = base.dist.poisson.cdf( 2.0, 10.0 )\ny = base.dist.poisson.cdf( -1.0, 4.0 )\ny = base.dist.poisson.cdf( NaN, 1.0 )\ny = base.dist.poisson.cdf( 0.0, NaN )\n\n// Negative mean parameter:\ny = base.dist.poisson.cdf( 2.0, -1.0 )\n\n// Degenerate distribution at `λ = 0`:\ny = base.dist.poisson.cdf( -2.0, 0.0 );\ny = base.dist.poisson.cdf( 0.0, 0.0 );\ny = base.dist.poisson.cdf( 10.0, 0.0 );\n",
	"base.dist.poisson.entropy": "v = base.dist.poisson.entropy( 11.0 )\nv = base.dist.poisson.entropy( 4.5 )\n",
	"base.dist.poisson.kurtosis": "v = base.dist.poisson.kurtosis( 11.0 )\nv = base.dist.poisson.kurtosis( 4.5 )\n",
	"base.dist.poisson.mean": "v = base.dist.poisson.mean( 11.0 )\nv = base.dist.poisson.mean( 4.5 )\n",
	"base.dist.poisson.median": "v = base.dist.poisson.median( 11.0 )\nv = base.dist.poisson.median( 4.5 )\n",
	"base.dist.poisson.mode": "v = base.dist.poisson.mode( 11.0 )\nv = base.dist.poisson.mode( 4.5 )\n",
	"base.dist.poisson.pmf": "y = base.dist.poisson.pmf( 4.0, 3.0 )\ny = base.dist.poisson.pmf( 1.0, 3.0 )\ny = base.dist.poisson.pmf( -1.0, 2.0 )\ny = base.dist.poisson.pmf( 0.0, NaN )\ny = base.dist.poisson.pmf( NaN, 0.5 )\n\n// Negative mean parameter:\ny = base.dist.poisson.pmf( 2.0, -0.5 )\n\n// Degenerate distribution at `λ = 0`:\ny = base.dist.poisson.pmf( 2.0, 0.0 )\ny = base.dist.poisson.pmf( 0.0, 0.0 )\n",
	"base.dist.poisson.Poisson": "poisson = base.dist.poisson.Poisson( 6.0 );\npoisson.lambda\npoisson.entropy\npoisson.kurtosis\npoisson.mean\npoisson.median\npoisson.mode\npoisson.skewness\npoisson.stdev\npoisson.variance\npoisson.cdf( 4.0 )\npoisson.mgf( 0.5 )\npoisson.pmf( 2.0 )\npoisson.quantile( 0.5 )\n",
	"base.dist.poisson.quantile": "y = base.dist.poisson.quantile( 0.5, 2.0 )\ny = base.dist.poisson.quantile( 0.9, 4.0 )\ny = base.dist.poisson.quantile( 0.1, 200.0 )\ny = base.dist.poisson.quantile( 1.1, 0.0 )\ny = base.dist.poisson.quantile( -0.2, 0.0 )\ny = base.dist.poisson.quantile( NaN, 0.5 )\ny = base.dist.poisson.quantile( 0.0, NaN )\n\n// Negative mean parameter:\ny = base.dist.poisson.quantile( 2.0, -1.0 )\n\n// Degenerate distribution at `λ = 0`:\ny = base.dist.poisson.quantile( 0.1, 0.0 );\ny = base.dist.poisson.quantile( 0.9, 0.0 );\n",
	"base.dist.poisson.skewness": "v = base.dist.poisson.skewness( 11.0 )\nv = base.dist.poisson.skewness( 4.5 )\n",
	"base.dist.poisson.stdev": "v = base.dist.poisson.stdev( 11.0 )\nv = base.dist.poisson.stdev( 4.5 )\n",
	"base.dist.poisson.variance": "v = base.dist.poisson.variance( 11.0 )\nv = base.dist.poisson.variance( 4.5 )\n",
	"base.dist.rayleigh.cdf": "y = base.dist.rayleigh.cdf( 2.0, 3.0 )\ny = base.dist.rayleigh.cdf( 1.0, 2.0 )\ny = base.dist.rayleigh.cdf( -1.0, 4.0 )\ny = base.dist.rayleigh.cdf( NaN, 1.0 )\ny = base.dist.rayleigh.cdf( 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.rayleigh.cdf( 2.0, -1.0 )\n\n// Degenerate distribution when `sigma = 0.0`:\ny = base.dist.rayleigh.cdf( -2.0, 0.0 );\ny = base.dist.rayleigh.cdf( 0.0, 0.0 );\ny = base.dist.rayleigh.cdf( 2.0, 0.0 );\n",
	"base.dist.rayleigh.entropy": "v = base.dist.rayleigh.entropy( 11.0 )\nv = base.dist.rayleigh.entropy( 4.5 )\n",
	"base.dist.rayleigh.kurtosis": "v = base.dist.rayleigh.kurtosis( 11.0 )\nv = base.dist.rayleigh.kurtosis( 4.5 )\n",
	"base.dist.rayleigh.logcdf": "y = base.dist.rayleigh.logcdf( 2.0, 3.0 )\ny = base.dist.rayleigh.logcdf( 1.0, 2.0 )\ny = base.dist.rayleigh.logcdf( -1.0, 4.0 )\ny = base.dist.rayleigh.logcdf( NaN, 1.0 )\ny = base.dist.rayleigh.logcdf( 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.rayleigh.logcdf( 2.0, -1.0 )\n",
	"base.dist.rayleigh.logpdf": "y = base.dist.rayleigh.logpdf( 0.3, 1.0 )\ny = base.dist.rayleigh.logpdf( 2.0, 0.8 )\ny = base.dist.rayleigh.logpdf( -1.0, 0.5 )\ny = base.dist.rayleigh.logpdf( 0.0, NaN )\ny = base.dist.rayleigh.logpdf( NaN, 2.0 )\n\n// Negative scale parameter:\ny = base.dist.rayleigh.logpdf( 2.0, -1.0 )\n",
	"base.dist.rayleigh.mean": "v = base.dist.rayleigh.mean( 11.0 )\nv = base.dist.rayleigh.mean( 4.5 )\n",
	"base.dist.rayleigh.median": "v = base.dist.rayleigh.median( 11.0 )\nv = base.dist.rayleigh.median( 4.5 )\n",
	"base.dist.rayleigh.mgf": "y = base.dist.rayleigh.mgf( 1.0, 3.0 )\ny = base.dist.rayleigh.mgf( 1.0, 2.0 )\ny = base.dist.rayleigh.mgf( -1.0, 4.0 )\ny = base.dist.rayleigh.mgf( NaN, 1.0 )\ny = base.dist.rayleigh.mgf( 0.0, NaN )\ny = base.dist.rayleigh.mgf( 0.5, -1.0 )\n",
	"base.dist.rayleigh.mode": "v = base.dist.rayleigh.mode( 11.0 )\nv = base.dist.rayleigh.mode( 4.5 )\n",
	"base.dist.rayleigh.pdf": "y = base.dist.rayleigh.pdf( 0.3, 1.0 )\ny = base.dist.rayleigh.pdf( 2.0, 0.8 )\ny = base.dist.rayleigh.pdf( -1.0, 0.5 )\ny = base.dist.rayleigh.pdf( 0.0, NaN )\ny = base.dist.rayleigh.pdf( NaN, 2.0 )\n\n// Negative scale parameter:\ny = base.dist.rayleigh.pdf( 2.0, -1.0 )\n\n// Degenerate distribution when `sigma = 0.0`:\ny = base.dist.rayleigh.pdf( -2.0, 0.0 )\ny = base.dist.rayleigh.pdf( 0.0, 0.0 )\ny = base.dist.rayleigh.pdf( 2.0, 0.0 )\n",
	"base.dist.rayleigh.Rayleigh": "rayleigh = base.dist.rayleigh.Rayleigh( 6.0 );\nrayleigh.sigma\nrayleigh.entropy\nrayleigh.kurtosis\nrayleigh.mean\nrayleigh.median\nrayleigh.mode\nrayleigh.skewness\nrayleigh.stdev\nrayleigh.variance\nrayleigh.cdf( 1.0 )\nrayleigh.mgf( -0.5 )\nrayleigh.pdf( 1.5 )\nrayleigh.quantile( 0.5 )\n",
	"base.dist.rayleigh.quantile": "y = base.dist.rayleigh.quantile( 0.8, 1.0 )\ny = base.dist.rayleigh.quantile( 0.5, 4.0 )\ny = base.dist.rayleigh.quantile( 1.1, 1.0 )\ny = base.dist.rayleigh.quantile( -0.2, 1.0 )\ny = base.dist.rayleigh.quantile( NaN, 1.0 )\ny = base.dist.rayleigh.quantile( 0.0, NaN )\n\n// Negative scale parameter:\ny = base.dist.rayleigh.quantile( 0.5, -1.0 )\n",
	"base.dist.rayleigh.skewness": "v = base.dist.rayleigh.skewness( 11.0 )\nv = base.dist.rayleigh.skewness( 4.5 )\n",
	"base.dist.rayleigh.stdev": "v = base.dist.rayleigh.stdev( 9.0 )\nv = base.dist.rayleigh.stdev( 4.5 )\n",
	"base.dist.rayleigh.variance": "v = base.dist.rayleigh.variance( 9.0 )\nv = base.dist.rayleigh.variance( 4.5 )\n",
	"base.dist.t.cdf": "y = base.dist.t.cdf( 2.0, 0.1 )\ny = base.dist.t.cdf( 1.0, 2.0 )\ny = base.dist.t.cdf( -1.0, 4.0 )\ny = base.dist.t.cdf( NaN, 1.0 )\ny = base.dist.t.cdf( 0.0, NaN )\ny = base.dist.t.cdf( 2.0, -1.0 )\n",
	"base.dist.t.entropy": "v = base.dist.t.entropy( 11.0 )\nv = base.dist.t.entropy( 4.5 )\n",
	"base.dist.t.kurtosis": "v = base.dist.t.kurtosis( 11.0 )\nv = base.dist.t.kurtosis( 4.5 )\n",
	"base.dist.t.mean": "v = base.dist.t.mean( 11.0 )\nv = base.dist.t.mean( 4.5 )\n",
	"base.dist.t.median": "v = base.dist.t.median( 11.0 )\nv = base.dist.t.median( 4.5 )\n",
	"base.dist.t.mode": "v = base.dist.t.mode( 11.0 )\nv = base.dist.t.mode( 4.5 )\n",
	"base.dist.t.pdf": "y = base.dist.t.pdf( 0.3, 4.0 )\ny = base.dist.t.pdf( 2.0, 0.7 )\ny = base.dist.t.pdf( -1.0, 0.5 )\ny = base.dist.t.pdf( 0.0, NaN )\ny = base.dist.t.pdf( NaN, 2.0 )\ny = base.dist.t.pdf( 2.0, -1.0 )\n",
	"base.dist.t.T": "t = base.dist.t.T( 6.0 );\nt.v\nt.entropy\nt.kurtosis\nt.mean\nt.median\nt.mode\nt.skewness\nt.stdev\nt.variance\nt.cdf( 1.0 )\nt.pdf( 1.5 )\nt.quantile( 0.8 )\n",
	"base.dist.t.quantile": "y = base.dist.t.quantile( 0.8, 1.0 )\ny = base.dist.t.quantile( 0.1, 1.0 )\ny = base.dist.t.quantile( 0.5, 0.1 )\ny = base.dist.t.quantile( -0.2, 0.1 )\ny = base.dist.t.quantile( NaN, 1.0 )\ny = base.dist.t.quantile( 0.0, NaN )\ny = base.dist.t.quantile( 0.5, -1.0 )\n",
	"base.dist.t.skewness": "v = base.dist.t.skewness( 11.0 )\nv = base.dist.t.skewness( 4.5 )\n",
	"base.dist.t.stdev": "v = base.dist.t.stdev( 9.0 )\nv = base.dist.t.stdev( 4.5 )\n",
	"base.dist.t.variance": "v = base.dist.t.variance( 9.0 )\nv = base.dist.t.variance( 4.5 )\n",
	"base.dist.triangular.cdf": "y = base.dist.triangular.cdf( 0.5, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.cdf( 0.5, -1.0, 1.0, 0.5 )\ny = base.dist.triangular.cdf( -10.0, -20.0, 0.0, -2.0 )\ny = base.dist.triangular.cdf( -2.0, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.cdf( NaN, 0.0, 1.0, 0.5 )\ny = base.dist.triangular.cdf( 0.0, NaN, 1.0, 0.5 )\ny = base.dist.triangular.cdf( 0.0, 0.0, NaN, 0.5 )\ny = base.dist.triangular.cdf( 2.0, 1.0, 0.0, NaN )\ny = base.dist.triangular.cdf( 2.0, 1.0, 0.0, 1.5 )\n",
	"base.dist.triangular.entropy": "v = base.dist.triangular.entropy( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.entropy( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.entropy( 2.0, 8.0, 5.0 )\n",
	"base.dist.triangular.kurtosis": "v = base.dist.triangular.kurtosis( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.kurtosis( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.kurtosis( 2.0, 8.0, 5.0 )\n",
	"base.dist.triangular.mean": "v = base.dist.triangular.mean( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.mean( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.mean( 2.0, 8.0, 5.0 )\n",
	"base.dist.triangular.median": "v = base.dist.triangular.median( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.median( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.median( 2.0, 8.0, 5.0 )\n",
	"base.dist.triangular.mgf": "y = base.dist.triangular.mgf( 0.5, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.mgf( 0.5, -1.0, 1.0, 0.5 )\ny = base.dist.triangular.mgf( -0.3, -20.0, 0.0, -2.0 )\ny = base.dist.triangular.mgf( -2.0, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.mgf( NaN, 0.0, 1.0, 0.5 )\ny = base.dist.triangular.mgf( 0.0, NaN, 1.0, 0.5 )\ny = base.dist.triangular.mgf( 0.0, 0.0, NaN, 0.5 )\ny = base.dist.triangular.mgf( 0.5, 1.0, 0.0, NaN )\ny = base.dist.triangular.mgf( 0.5, 1.0, 0.0, 1.5 )\n",
	"base.dist.triangular.mode": "v = base.dist.triangular.mode( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.mode( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.mode( 2.0, 8.0, 5.0 )\n",
	"base.dist.triangular.pdf": "y = base.dist.triangular.pdf( 0.5, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.pdf( 0.5, -1.0, 1.0, 0.5 )\ny = base.dist.triangular.pdf( -10.0, -20.0, 0.0, -2.0 )\ny = base.dist.triangular.pdf( -2.0, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.pdf( NaN, 0.0, 1.0, 0.5 )\ny = base.dist.triangular.pdf( 0.0, NaN, 1.0, 0.5 )\ny = base.dist.triangular.pdf( 0.0, 0.0, NaN, 0.5 )\ny = base.dist.triangular.pdf( 2.0, 1.0, 0.0, NaN )\ny = base.dist.triangular.pdf( 2.0, 1.0, 0.0, 1.5 )\n",
	"base.dist.triangular.quantile": "y = base.dist.triangular.quantile( 0.9, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.quantile( 0.1, -1.0, 1.0, 0.5 )\ny = base.dist.triangular.quantile( 0.1, -20.0, 0.0, -2.0 )\ny = base.dist.triangular.quantile( 0.8, 0.0, 20.0, 0.0 )\ny = base.dist.triangular.quantile( 1.1, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.quantile( -0.1, -1.0, 1.0, 0.0 )\ny = base.dist.triangular.quantile( NaN, 0.0, 1.0, 0.5 )\ny = base.dist.triangular.quantile( 0.3, NaN, 1.0, 0.5 )\ny = base.dist.triangular.quantile( 0.3, 0.0, NaN, 0.5 )\ny = base.dist.triangular.quantile( 0.3, 1.0, 0.0, NaN )\ny = base.dist.triangular.quantile( 0.3, 1.0, 0.0, 1.5 )\n",
	"base.dist.triangular.skewness": "v = base.dist.triangular.skewness( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.skewness( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.skewness( 2.0, 8.0, 5.0 )\n",
	"base.dist.triangular.stdev": "v = base.dist.triangular.stdev( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.stdev( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.stdev( 2.0, 8.0, 5.0 )\n",
	"base.dist.triangular.Triangular": "triangular = base.dist.triangular.Triangular( 0.0, 1.0, 0.5 );\ntriangular.a\ntriangular.b\ntriangular.c\ntriangular.entropy\ntriangular.kurtosis\ntriangular.mean\ntriangular.median\ntriangular.mode\ntriangular.skewness\ntriangular.stdev\ntriangular.variance\ntriangular.cdf( 0.8 )\ntriangular.mgf( 0.8 )\ntriangular.pdf( 0.8 )\ntriangular.quantile( 0.8 )\n",
	"base.dist.triangular.variance": "v = base.dist.triangular.variance( 0.0, 1.0, 0.8 )\nv = base.dist.triangular.variance( 4.0, 12.0, 5.0 )\nv = base.dist.triangular.variance( 2.0, 8.0, 5.0 )\n",
	"base.dist.uniform.cdf": "y = base.dist.uniform.cdf( 9.0, 0.0, 10.0 )\ny = base.dist.uniform.cdf( 0.5, 0.0, 2.0 )\ny = base.dist.uniform.cdf( PINF, 2.0, 4.0 )\ny = base.dist.uniform.cdf( NINF, 2.0, 4.0 )\ny = base.dist.uniform.cdf( NaN, 0.0, 1.0 )\ny = base.dist.uniform.cdf( 0.0, NaN, 1.0 )\ny = base.dist.uniform.cdf( 0.0, 0.0, NaN )\ny = base.dist.uniform.cdf( 2.0, 1.0, 0.0 )\n",
	"base.dist.uniform.entropy": "v = base.dist.uniform.entropy( 0.0, 1.0 )\nv = base.dist.uniform.entropy( 4.0, 12.0 )\nv = base.dist.uniform.entropy( 2.0, 8.0 )\n",
	"base.dist.uniform.kurtosis": "v = base.dist.uniform.kurtosis( 0.0, 1.0 )\nv = base.dist.uniform.kurtosis( 4.0, 12.0 )\nv = base.dist.uniform.kurtosis( 2.0, 8.0 )\n",
	"base.dist.uniform.logcdf": "y = base.dist.uniform.logcdf( 9.0, 0.0, 10.0 )\ny = base.dist.uniform.logcdf( 0.5, 0.0, 2.0 )\ny = base.dist.uniform.logcdf( PINF, 2.0, 4.0 )\ny = base.dist.uniform.logcdf( NINF, 2.0, 4.0 )\ny = base.dist.uniform.logcdf( NaN, 0.0, 1.0 )\ny = base.dist.uniform.logcdf( 0.0, NaN, 1.0 )\ny = base.dist.uniform.logcdf( 0.0, 0.0, NaN )\ny = base.dist.uniform.logcdf( 2.0, 1.0, 0.0 )\n",
	"base.dist.uniform.logpdf": "y = base.dist.uniform.logpdf( 2.0, 0.0, 4.0 )\ny = base.dist.uniform.logpdf( 5.0, 0.0, 4.0 )\ny = base.dist.uniform.logpdf( 0.25, 0.0, 1.0 )\ny = base.dist.uniform.logpdf( NaN, 0.0, 1.0 )\ny = base.dist.uniform.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.uniform.logpdf( 0.0, 0.0, NaN )\ny = base.dist.uniform.logpdf( 2.0, 3.0, 1.0 )\n",
	"base.dist.uniform.mean": "v = base.dist.uniform.mean( 0.0, 1.0 )\nv = base.dist.uniform.mean( 4.0, 12.0 )\nv = base.dist.uniform.mean( 2.0, 8.0 )\n",
	"base.dist.uniform.median": "v = base.dist.uniform.median( 0.0, 1.0 )\nv = base.dist.uniform.median( 4.0, 12.0 )\nv = base.dist.uniform.median( 2.0, 8.0 )\n",
	"base.dist.uniform.mgf": "y = base.dist.uniform.mgf( 2.0, 0.0, 4.0 )\ny = base.dist.uniform.mgf( -0.2, 0.0, 4.0 )\ny = base.dist.uniform.mgf( 2.0, 0.0, 1.0 )\ny = base.dist.uniform.mgf( 0.5, 3.0, 2.0 )\ny = base.dist.uniform.mgf( 0.5, 3.0, 3.0 )\ny = base.dist.uniform.mgf( NaN, 0.0, 1.0 )\ny = base.dist.uniform.mgf( 0.0, NaN, 1.0 )\ny = base.dist.uniform.mgf( 0.0, 0.0, NaN )\n",
	"base.dist.uniform.pdf": "y = base.dist.uniform.pdf( 2.0, 0.0, 4.0 )\ny = base.dist.uniform.pdf( 5.0, 0.0, 4.0 )\ny = base.dist.uniform.pdf( 0.25, 0.0, 1.0 )\ny = base.dist.uniform.pdf( NaN, 0.0, 1.0 )\ny = base.dist.uniform.pdf( 0.0, NaN, 1.0 )\ny = base.dist.uniform.pdf( 0.0, 0.0, NaN )\ny = base.dist.uniform.pdf( 2.0, 3.0, 1.0 )\n",
	"base.dist.uniform.quantile": "y = base.dist.uniform.quantile( 0.8, 0.0, 1.0 )\ny = base.dist.uniform.quantile( 0.5, 0.0, 10.0 )\ny = base.dist.uniform.quantile( 1.1, 0.0, 1.0 )\ny = base.dist.uniform.quantile( -0.2, 0.0, 1.0 )\ny = base.dist.uniform.quantile( NaN, 0.0, 1.0 )\ny = base.dist.uniform.quantile( 0.0, NaN, 1.0 )\ny = base.dist.uniform.quantile( 0.0, 0.0, NaN )\ny = base.dist.uniform.quantile( 0.5, 2.0, 1.0 )\n",
	"base.dist.uniform.skewness": "v = base.dist.uniform.skewness( 0.0, 1.0 )\nv = base.dist.uniform.skewness( 4.0, 12.0 )\nv = base.dist.uniform.skewness( 2.0, 8.0 )\n",
	"base.dist.uniform.stdev": "v = base.dist.uniform.stdev( 0.0, 1.0 )\nv = base.dist.uniform.stdev( 4.0, 12.0 )\nv = base.dist.uniform.stdev( 2.0, 8.0 )\n",
	"base.dist.uniform.Uniform": "uniform = base.dist.uniform.Uniform( 0.0, 1.0 );\nuniform.a\nuniform.b\nuniform.entropy\nuniform.kurtosis\nuniform.mean\nuniform.median\nuniform.skewness\nuniform.stdev\nuniform.variance\nuniform.cdf( 0.8 )\nuniform.logcdf( 0.5 )\nuniform.logpdf( 1.0 )\nuniform.mgf( 0.8 )\nuniform.pdf( 0.8 )\nuniform.quantile( 0.8 )\n",
	"base.dist.uniform.variance": "v = base.dist.uniform.variance( 0.0, 1.0 )\nv = base.dist.uniform.variance( 4.0, 12.0 )\nv = base.dist.uniform.variance( 2.0, 8.0 )\n",
	"base.dist.weibull.cdf": "y = base.dist.weibull.cdf( 2.0, 1.0, 1.0 )\ny = base.dist.weibull.cdf( -1.0, 2.0, 2.0 )\ny = base.dist.weibull.cdf( PINF, 4.0, 2.0 )\ny = base.dist.weibull.cdf( NINF, 4.0, 2.0 )\ny = base.dist.weibull.cdf( NaN, 0.0, 1.0 )\ny = base.dist.weibull.cdf( 0.0, NaN, 1.0 )\ny = base.dist.weibull.cdf( 0.0, 0.0, NaN )\ny = base.dist.weibull.cdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.weibull.entropy": "v = base.dist.weibull.entropy( 1.0, 1.0 )\nv = base.dist.weibull.entropy( 4.0, 12.0 )\nv = base.dist.weibull.entropy( 8.0, 2.0 )\n",
	"base.dist.weibull.kurtosis": "v = base.dist.weibull.kurtosis( 1.0, 1.0 )\nv = base.dist.weibull.kurtosis( 4.0, 12.0 )\nv = base.dist.weibull.kurtosis( 8.0, 2.0 )\n",
	"base.dist.weibull.logcdf": "y = cdf( 2.0, 1.0, 1.0 )\ny = base.dist.weibull.logcdf( -1.0, 2.0, 2.0 )\ny = base.dist.weibull.logcdf( PINF, 4.0, 2.0 )\ny = base.dist.weibull.logcdf( NINF, 4.0, 2.0 )\ny = base.dist.weibull.logcdf( NaN, 0.0, 1.0 )\ny = base.dist.weibull.logcdf( 0.0, NaN, 1.0 )\ny = base.dist.weibull.logcdf( 0.0, 0.0, NaN )\ny = base.dist.weibull.logcdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.weibull.logpdf": "y = base.dist.weibull.logpdf( 2.0, 1.0, 0.5 )\ny = base.dist.weibull.logpdf( 0.1, 1.0, 1.0 )\ny = base.dist.weibull.logpdf( -1.0, 4.0, 2.0 )\ny = base.dist.weibull.logpdf( NaN, 0.6, 1.0 )\ny = base.dist.weibull.logpdf( 0.0, NaN, 1.0 )\ny = base.dist.weibull.logpdf( 0.0, 0.0, NaN )\ny = base.dist.weibull.logpdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.weibull.mean": "v = base.dist.weibull.mean( 1.0, 1.0 )\nv = base.dist.weibull.mean( 4.0, 12.0 )\nv = base.dist.weibull.mean( 8.0, 2.0 )\n",
	"base.dist.weibull.median": "v = base.dist.weibull.median( 1.0, 1.0 )\nv = base.dist.weibull.median( 4.0, 12.0 )\nv = base.dist.weibull.median( 8.0, 2.0 )\n",
	"base.dist.weibull.mgf": "y = base.dist.weibull.mgf( 1.0, 1.0, 0.5 )\ny = base.dist.weibull.mgf( -1.0, 4.0, 4.0 )\ny = base.dist.weibull.mgf( NaN, 1.0, 1.0 )\ny = base.dist.weibull.mgf( 0.0, NaN, 1.0 )\ny = base.dist.weibull.mgf( 0.0, 1.0, NaN )\ny = base.dist.weibull.mgf( 0.2, -1.0, 0.5 )\ny = base.dist.weibull.mgf( 0.2, 0.0, 0.5 )\ny = base.dist.weibull.mgf( 0.2, 0.5, -1.0 )\ny = base.dist.weibull.mgf( 0.2, 0.5, 0.0 )\n",
	"base.dist.weibull.mode": "v = base.dist.weibull.mode( 1.0, 1.0 )\nv = base.dist.weibull.mode( 4.0, 12.0 )\nv = base.dist.weibull.mode( 8.0, 2.0 )\n",
	"base.dist.weibull.pdf": "y = base.dist.weibull.pdf( 2.0, 1.0, 0.5 )\ny = base.dist.weibull.pdf( 0.1, 1.0, 1.0 )\ny = base.dist.weibull.pdf( -1.0, 4.0, 2.0 )\ny = base.dist.weibull.pdf( NaN, 0.6, 1.0 )\ny = base.dist.weibull.pdf( 0.0, NaN, 1.0 )\ny = base.dist.weibull.pdf( 0.0, 0.0, NaN )\ny = base.dist.weibull.pdf( 2.0, 0.0, -1.0 )\n",
	"base.dist.weibull.quantile": "y = base.dist.weibull.quantile( 0.8, 1.0, 1.0 )\ny = base.dist.weibull.quantile( 0.5, 2.0, 4.0 )\ny = base.dist.weibull.quantile( 1.1, 1.0, 1.0 )\ny = base.dist.weibull.quantile( -0.2, 1.0, 1.0 )\ny = base.dist.weibull.quantile( NaN, 0.0, 1.0 )\ny = base.dist.weibull.quantile( 0.0, NaN, 1.0 )\ny = base.dist.weibull.quantile( 0.0, 0.0, NaN )\ny = base.dist.weibull.quantile( 0.5, 1.0, -1.0 )\n",
	"base.dist.weibull.skewness": "v = base.dist.weibull.skewness( 1.0, 1.0 )\nv = base.dist.weibull.skewness( 4.0, 12.0 )\nv = base.dist.weibull.skewness( 8.0, 2.0 )\n",
	"base.dist.weibull.stdev": "v = base.dist.weibull.stdev( 1.0, 1.0 )\nv = base.dist.weibull.stdev( 4.0, 12.0 )\nv = base.dist.weibull.stdev( 8.0, 2.0 )\n",
	"base.dist.weibull.variance": "v = base.dist.weibull.variance( 1.0, 1.0 )\nv = base.dist.weibull.variance( 4.0, 12.0 )\nv = base.dist.weibull.variance( 8.0, 2.0 )\n",
	"base.dist.weibull.Weibull": "weibull = base.dist.weibull.Weibull( 6.0, 5.0 );\nweibull.k\nweibull.lambda\nweibull.entropy\nweibull.kurtosis\nweibull.mean\nweibull.median\nweibull.mode\nweibull.skewness\nweibull.stdev\nweibull.variance\nweibull.cdf( 3.0 )\nweibull.logcdf( 3.0 )\nweibull.logpdf( 1.0 )\nweibull.mgf( -0.5 )\nweibull.pdf( 3.0 )\nweibull.quantile( 0.8 )\n",
	"base.epsdiff": "d = base.epsdiff( 12.15, 12.149999999999999 )\nd = base.epsdiff( 2.4341309458983933, 2.4341309458633909, 'mean-abs' )\n\n// Custom scale function:\nfunction scale( x, y ) { return ( x > y ) ? y : x; };\nd = base.epsdiff( 1.0000000000000002, 1.0000000000000100, scale )\n",
	"base.eta": "y = base.eta( 0.0 )\ny = base.eta( -1.0 )\ny = base.eta( 1.0 )\ny = base.eta( 3.14 )\ny = base.eta( NaN )\n",
	"base.erf": "y = base.erf( 2.0 )\ny = base.erf( -1.0 )\ny = base.erf( -0.0 )\ny = base.erf( NaN )\n",
	"base.erfc": "y = base.erfc( 2.0 )\ny = base.erfc( -1.0 )\ny = base.erfc( 0.0 )\ny = base.erfc( PINF )\ny = base.erfc( NINF )\ny = base.erfc( NaN )\n",
	"base.erfcinv": "y = base.erfcinv( 0.5 )\ny = base.erfcinv( 0.8 )\ny = base.erfcinv( 0.0 )\ny = base.erfcinv( 2.0 )\ny = base.erfcinv( NaN )\n",
	"base.erfinv": "y = base.erfinv( 0.5 )\ny = base.erfinv( 0.8 )\ny = base.erfinv( 0.0 )\ny = base.erfinv( -0.0 )\ny = base.erfinv( -1.0 )\ny = base.erfinv( 1.0 )\ny = base.erfinv( NaN )\n",
	"base.evalpoly": "arr = [ 3.0, 2.0, 1.0 ];\n\n// 3*10^0 + 2*10^1 + 1*10^2\nv = base.evalpoly( arr, 10.0 )\n",
	"base.evalrational": "\n// 2x^3 + 4x^2 - 5x^1 - 6x^0\nP = [ -6.0, -5.0, 4.0, 2.0 ];\n\n// 0.5x^1 + 3x^0\nQ = [ 3.0, 0.5, 0.0, 0.0 ]; // zero-padded\n\n// Evaluate the rational function:\nv = base.evalrational( P, Q, 6.0 )\n",
	"base.exp": "y = base.exp( 4.0 )\ny = base.exp( -9.0 )\ny = base.exp( 0.0 )\ny = base.exp( NaN )\n",
	"base.exponent": "exponent = base.exponent( 3.14e-307 )\nexponent = base.exponent( -3.14 )\nexponent = base.exponent( 0.0 )\nexponent = base.exponent( NaN )\n",
	"base.exponentf": "exponent = base.exponentf( base.float64ToFloat32( 3.14e34 ) )\nexponent = base.exponentf( base.float64ToFloat32( 3.14e-34 ) )\nexponent = base.exponentf( base.float64ToFloat32( -3.14 ) )\nexponent = base.exponentf( 0.0 )\nexponent = base.exponentf( NaN )\n",
	"base.exp10": "y = base.exp10( 3.0 )\ny = base.exp10( -9.0 )\ny = base.exp10( 0.0 )\ny = base.exp10( NaN )\n",
	"base.exp2": "y = base.exp2( 3.0 )\ny = base.exp2( -9.0 )\ny = base.exp2( 0.0 )\ny = base.exp2( NaN )\n",
	"base.expm1": "y = base.expm1( 0.2 )\ny = base.expm1( -9.0 )\ny = base.expm1( 0.0 )\ny = base.expm1( NaN )\n",
	"base.factorial": "y = base.factorial( 3.0 )\ny = base.factorial( -1.5 )\ny = base.factorial( -0.5 )\ny = base.factorial( 0.5 )\ny = base.factorial( -10.0 )\ny = base.factorial( 171.0 )\ny = base.factorial( NaN )\n",
	"base.factorialln": "y = base.factorialln( 3.0 )\ny = base.factorialln( 2.4 )\ny = base.factorialln( -1.0 )\ny = base.factorialln( -1.5 )\ny = base.factorialln( NaN )\n",
	"base.fallingFactorial": "v = base.fallingFactorial( 0.9, 5 )\nv = base.fallingFactorial( -9.0, 3 )\nv = base.fallingFactorial( 0.0, 2 )\nv = base.fallingFactorial( 3.0, -2 )\n",
	"base.fibonacci": "y = base.fibonacci( 0 )\ny = base.fibonacci( 1 )\ny = base.fibonacci( 2 )\ny = base.fibonacci( 3 )\ny = base.fibonacci( 4 )\ny = base.fibonacci( 79 )\ny = base.fibonacci( NaN )\n",
	"base.fibonacciIndex": "n = base.fibonacciIndex( 2 )\nn = base.fibonacciIndex( 3 )\nn = base.fibonacciIndex( 5 )\nn = base.fibonacciIndex( NaN )\nn = base.fibonacciIndex( 1 )\n",
	"base.fibpoly": "\n// 2^4 + 3*2^2 + 1\nv = base.fibpoly( 5, 2.0 )\n",
	"base.flipsign": "z = base.flipsign( -3.14, 10.0 )\nz = base.flipsign( -3.14, -1.0 )\nz = base.flipsign( 1.0, -0.0 )\nz = base.flipsign( -3.14, -0.0 )\nz = base.flipsign( -0.0, 1.0 )\nz = base.flipsign( 0.0, -1.0 )\n",
	"base.floor": "y = base.floor( 3.14 )\ny = base.floor( -4.2 )\ny = base.floor( -4.6 )\ny = base.floor( 9.5 )\ny = base.floor( -0.0 )\n",
	"base.floor10": "y = base.floor10( 3.14 )\ny = base.floor10( -4.2 )\ny = base.floor10( -4.6 )\ny = base.floor10( 9.5 )\ny = base.floor10( 13.0 )\ny = base.floor10( -13.0 )\ny = base.floor10( -0.0 )\n",
	"base.floor2": "y = base.floor2( 3.14 )\ny = base.floor2( -4.2 )\ny = base.floor2( -4.6 )\ny = base.floor2( 9.5 )\ny = base.floor2( 13.0 )\ny = base.floor2( -13.0 )\ny = base.floor2( -0.0 )\n",
	"base.floorb": "\n// Round to 4 decimal places:\ny = base.floorb( 3.14159, -4, 10 )\n\n// If `n = 0` or `b = 1`, standard round behavior:\ny = base.floorb( 3.14159, 0, 2 )\n\n// Round to nearest multiple of two toward negative infinity:\ny = base.floorb( 5.0, 1, 2 )\n",
	"base.floorn": "\n// Round to 4 decimal places:\ny = base.floorn( 3.14159, -4 )\n\n// If `n = 0`, standard round toward negative infinity behavior:\ny = base.floorn( 3.14159, 0 )\n\n// Round to nearest thousand:\ny = base.floorn( 12368.0, 3 )\n",
	"base.floorsd": "y = base.floorsd( 3.14159, 5 )\ny = base.floorsd( 3.14159, 1 )\ny = base.floorsd( 12368.0, 2 )\ny = base.floorsd( 0.0313, 2, 2 )\n",
	"base.float32ToInt32": "y = base.float32ToInt32( base.float64ToFloat32( 4294967295.0 ) )\ny = base.float32ToInt32( base.float64ToFloat32( 3.14 ) )\ny = base.float32ToInt32( base.float64ToFloat32( -3.14 ) )\ny = base.float32ToInt32( base.float64ToFloat32( NaN ) )\ny = base.float32ToInt32( FLOAT32_PINF )\ny = base.float32ToInt32( FLOAT32_NINF )\n",
	"base.float32ToUint32": "y = base.float32ToUint32( base.float64ToFloat32( 4294967297.0 ) )\ny = base.float32ToUint32( base.float64ToFloat32( 3.14 ) )\ny = base.float32ToUint32( base.float64ToFloat32( -3.14 ) )\ny = base.float32ToUint32( base.float64ToFloat32( NaN ) )\ny = base.float32ToUint32( FLOAT32_PINF )\ny = base.float32ToUint32( FLOAT32_NINF )\n",
	"base.float64ToFloat32": "y = base.float64ToFloat32( 1.337 )\n",
	"base.float64ToInt32": "y = base.float64ToInt32( 4294967295.0 )\ny = base.float64ToInt32( 3.14 )\ny = base.float64ToInt32( -3.14 )\ny = base.float64ToInt32( NaN )\ny = base.float64ToInt32( PINF )\ny = base.float64ToInt32( NINF )\n",
	"base.float64ToUint32": "y = base.float64ToUint32( 4294967297.0 )\ny = base.float64ToUint32( 3.14 )\ny = base.float64ToUint32( -3.14 )\ny = base.float64ToUint32( NaN )\ny = base.float64ToUint32( PINF )\ny = base.float64ToUint32( NINF )\n",
	"base.frexp": "out = base.frexp( 4.0 )\nout = base.frexp( 0.0 )\nout = base.frexp( -0.0 )\nout = base.frexp( NaN )\nout = base.frexp( PINF )\nout = base.frexp( NINF )\n",
	"base.fromBinaryString": "bstr;\nbstr = '0100000000010000000000000000000000000000000000000000000000000000';\nval = base.fromBinaryString( bstr )\nbstr = '0100000000001001001000011111101101010100010001000010110100011000';\nval = base.fromBinaryString( bstr )\nbstr = '1111111111100001110011001111001110000101111010111100100010100000';\nval = base.fromBinaryString( bstr )\n\n// The function handles subnormals:\nbstr = '1000000000000000000000000000000000000000000000000001100011010011';\nval = base.fromBinaryString( bstr )\nbstr = '0000000000000000000000000000000000000000000000000000000000000001';\nval = base.fromBinaryString( bstr )\n\n// The function handles special values:\nbstr = '0000000000000000000000000000000000000000000000000000000000000000';\nval = base.fromBinaryString( bstr )\nbstr = '1000000000000000000000000000000000000000000000000000000000000000';\nval = base.fromBinaryString( bstr )\nbstr = '0111111111111000000000000000000000000000000000000000000000000000';\nval = base.fromBinaryString( bstr )\nbstr = '0111111111110000000000000000000000000000000000000000000000000000';\nval = base.fromBinaryString( bstr )\nbstr = '1111111111110000000000000000000000000000000000000000000000000000';\nval = base.fromBinaryString( bstr )\n",
	"base.fromBinaryStringf": "bstr = '01000000100000000000000000000000';\nval = base.fromBinaryStringf( bstr )\nbstr = '01000000010010010000111111011011';\nval = base.fromBinaryStringf( bstr )\nbstr = '11111111011011000011101000110011';\nval = base.fromBinaryStringf( bstr )\n\n// The function handles subnormals:\nbstr = '10000000000000000000000000010110';\nval = base.fromBinaryStringf( bstr )\nbstr = '00000000000000000000000000000001';\nval = base.fromBinaryStringf( bstr )\n\n// The function handles special values:\nbstr = '00000000000000000000000000000000';\nval = base.fromBinaryStringf( bstr )\nbstr = '10000000000000000000000000000000';\nval = base.fromBinaryStringf( bstr )\nbstr = '01111111110000000000000000000000';\nval = base.fromBinaryStringf( bstr )\nbstr = '01111111100000000000000000000000';\nval = base.fromBinaryStringf( bstr )\nbstr = '11111111100000000000000000000000';\nval = base.fromBinaryStringf( bstr )\n",
	"base.fromBinaryStringUint16": "bstr = '0101010101010101';\nval = base.fromBinaryStringUint16( bstr )\nbstr = '0000000000000000';\nval = base.fromBinaryStringUint16( bstr )\nbstr = '0000000000000010';\nval = base.fromBinaryStringUint16( bstr )\nbstr = '1111111111111111';\nval = base.fromBinaryStringUint16( bstr )\n",
	"base.fromBinaryStringUint32": "bstr = '01010101010101010101010101010101';\nval = base.fromBinaryStringUint32( bstr )\nbstr = '00000000000000000000000000000000';\nval = base.fromBinaryStringUint32( bstr )\nbstr = '00000000000000000000000000000010';\nval = base.fromBinaryStringUint32( bstr )\nbstr = '11111111111111111111111111111111';\nval = base.fromBinaryStringUint32( bstr )\n",
	"base.fromBinaryStringUint8": "bstr = '01010101';\nval = base.fromBinaryStringUint8( bstr )\nbstr = '00000000';\nval = base.fromBinaryStringUint8( bstr )\nbstr = '00000010';\nval = base.fromBinaryStringUint8( bstr )\nbstr = '11111111';\nval = base.fromBinaryStringUint8( bstr )\n",
	"base.fromWordf": "word = 1068180177; // => 0 01111111 01010110010001011010001\nf32 = base.fromWordf( word ) // when printed, promoted to float64\n",
	"base.fromWords": "v = base.fromWords( 1774486211, 2479577218 )\nv = base.fromWords( 3221823995, 1413754136 )\nv = base.fromWords( 0, 0 )\nv = base.fromWords( 2147483648, 0 )\nv = base.fromWords( 2146959360, 0 )\nv = base.fromWords( 2146435072, 0 )\nv = base.fromWords( 4293918720, 0 )\n",
	"base.gamma": "y = base.gamma( 4.0 )\ny = base.gamma( -1.5 )\ny = base.gamma( -0.5 )\ny = base.gamma( 0.5 )\ny = base.gamma( 0.0 )\ny = base.gamma( -0.0 )\ny = base.gamma( NaN )\n",
	"base.gamma1pm1": "y = base.gamma1pm1( 0.2 )\ny = base.gamma1pm1( -6.7 )\ny = base.gamma1pm1( 0.0 )\ny = base.gamma1pm1( NaN )\n",
	"base.gammaDeltaRatio": "y = base.gammaDeltaRatio( 2.0, 3.0 )\ny = base.gammaDeltaRatio( 4.0, 0.5 )\ny = base.gammaDeltaRatio( 100.0, 0.0 )\ny = base.gammaDeltaRatio( NaN, 3.0 )\ny = base.gammaDeltaRatio( 5.0, NaN )\ny = base.gammaDeltaRatio( NaN, NaN )\n",
	"base.gammainc": "y = base.gammainc( 6.0, 2.0 )\ny = base.gammainc( 1.0, 2.0, true, true )\ny = base.gammainc( 7.0, 5.0 )\ny = base.gammainc( 7.0, 5.0, false )\ny = base.gammainc( NaN, 2.0 )\ny = base.gammainc( 6.0, NaN )\n",
	"base.gammaincinv": "y = base.gammaincinv( 0.5, 2.0 )\ny = base.gammaincinv( 0.1, 10.0 )\ny = base.gammaincinv( 0.75, 3.0 )\ny = base.gammaincinv( 0.75, 3.0, true )\ny = base.gammaincinv( 0.75, NaN )\ny = base.gammaincinv( NaN, 3.0 )\n",
	"base.gammaLanczosSum": "y = base.gammaLanczosSum( 4.0 )\ny = base.gammaLanczosSum( -1.5 )\ny = base.gammaLanczosSum( -0.5 )\ny = base.gammaLanczosSum( 0.5 )\ny = base.gammaLanczosSum( 0.0 )\ny = base.gammaLanczosSum( NaN )\n",
	"base.gammaLanczosSumExpGScaled": "y = base.gammaLanczosSumExpGScaled( 4.0 )\ny = base.gammaLanczosSumExpGScaled( -1.5 )\ny = base.gammaLanczosSumExpGScaled( -0.5 )\ny = base.gammaLanczosSumExpGScaled( 0.5 )\ny = base.gammaLanczosSumExpGScaled( 0.0 )\ny = base.gammaLanczosSumExpGScaled( NaN )\n",
	"base.gammaln": "y = base.gammaln( 1.0 )\ny = base.gammaln( 2.0 )\ny = base.gammaln( 4.0 )\ny = base.gammaln( -0.5 )\ny = base.gammaln( 0.5 )\ny = base.gammaln( 0.0 )\ny = base.gammaln( NaN )\n",
	"base.gcd": "v = base.gcd( 48, 18 )\n",
	"base.getHighWord": "w = base.getHighWord( 3.14e201 )\n",
	"base.getLowWord": "w = base.getLowWord( 3.14e201 )\n",
	"base.hacovercos": "y = base.hacovercos( 3.14 )\ny = base.hacovercos( -4.2 )\ny = base.hacovercos( -4.6 )\ny = base.hacovercos( 9.5 )\ny = base.hacovercos( -0.0 )\n",
	"base.hacoversin": "y = base.hacoversin( 3.14 )\ny = base.hacoversin( -4.2 )\ny = base.hacoversin( -4.6 )\ny = base.hacoversin( 9.5 )\ny = base.hacoversin( -0.0 )\n",
	"base.havercos": "y = base.havercos( 3.14 )\ny = base.havercos( -4.2 )\ny = base.havercos( -4.6 )\ny = base.havercos( 9.5 )\ny = base.havercos( -0.0 )\n",
	"base.haversin": "y = base.haversin( 3.14 )\ny = base.haversin( -4.2 )\ny = base.haversin( -4.6 )\ny = base.haversin( 9.5 )\ny = base.haversin( -0.0 )\n",
	"base.heaviside": "y = base.heaviside( 3.14 )\ny = base.heaviside( -3.14 )\ny = base.heaviside( 0.0 )\ny = base.heaviside( 0.0, 'half-maximum' )\ny = base.heaviside( 0.0, 'left-continuous' )\ny = base.heaviside( 0.0, 'right-continuous' )\n",
	"base.hypot": "h = base.hypot( -5.0, 12.0 )\nh = base.hypot( NaN, 12.0 )\nh = base.hypot( -0.0, -0.0 )\n",
	"base.int32ToUint32": "y = base.int32ToUint32( base.float64ToInt32( -32 ) )\ny = base.int32ToUint32( base.float64ToInt32( 3 ) )\n",
	"base.inv": "y = base.inv( -1.0 )\ny = base.inv( 2.0 )\ny = base.inv( 0.0 )\ny = base.inv( -0.0 )\ny = base.inv( NaN )\n",
	"base.isEven": "bool = base.isEven( 5.0 )\nbool = base.isEven( -2.0 )\nbool = base.isEven( 0.0 )\nbool = base.isEven( NaN )\n",
	"base.isEvenInt32": "bool = base.isEvenInt32( 5 )\nbool = base.isEvenInt32( -2 )\nbool = base.isEvenInt32( 0 )\n",
	"base.isFinite": "bool = base.isFinite( 5.0 )\nbool = base.isFinite( -2.0e64 )\nbool = base.isFinite( PINF )\nbool = base.isFinite( NINF )\n",
	"base.isInfinite": "bool = base.isInfinite( PINF )\nbool = base.isInfinite( NINF )\nbool = base.isInfinite( 5.0 )\nbool = base.isInfinite( NaN )\n",
	"base.isInteger": "bool = base.isInteger( 1.0 )\nbool = base.isInteger( 3.14 )\n",
	"base.isnan": "bool = base.isnan( NaN )\nbool = base.isnan( 7.0 )\n",
	"base.isNegativeInteger": "bool = base.isNegativeInteger( -1.0 )\nbool = base.isNegativeInteger( 0.0 )\nbool = base.isNegativeInteger( 10.0 )\n",
	"base.isNegativeZero": "bool = base.isNegativeZero( -0.0 )\nbool = base.isNegativeZero( 0.0 )\n",
	"base.isNonNegativeInteger": "bool = base.isNonNegativeInteger( 1.0 )\nbool = base.isNonNegativeInteger( 0.0 )\nbool = base.isNonNegativeInteger( -10.0 )\n",
	"base.isNonPositiveInteger": "bool = base.isNonPositiveInteger( -1.0 )\nbool = base.isNonPositiveInteger( 0.0 )\nbool = base.isNonPositiveInteger( 10.0 )\n",
	"base.isOdd": "bool = base.isOdd( 5.0 )\nbool = base.isOdd( -2.0 )\nbool = base.isOdd( 0.0 )\nbool = base.isOdd( NaN )\n",
	"base.isOddInt32": "bool = base.isOddInt32( 5 )\nbool = base.isOddInt32( -2 )\nbool = base.isOddInt32( 0 )\n",
	"base.isPositiveInteger": "bool = base.isPositiveInteger( 1.0 )\nbool = base.isPositiveInteger( 0.0 )\nbool = base.isPositiveInteger( 10.0 )\n",
	"base.isPositiveZero": "bool = base.isPositiveZero( 0.0 )\nbool = base.isPositiveZero( -0.0 )\n",
	"base.isPow2Uint32": "bool = base.isPow2Uint32( 2 )\nbool = base.isPow2Uint32( 5 )\n",
	"base.isProbability": "bool = base.isProbability( 0.5 )\nbool = base.isProbability( 3.14 )\nbool = base.isProbability( NaN )\n",
	"base.isSafeInteger": "bool = base.isSafeInteger( 1.0 )\nbool = base.isSafeInteger( 2.0e200 )\nbool = base.isSafeInteger( 3.14 )\n",
	"base.kernelCos": "out = base.kernelCos( 0.0, 0.0 )\nout = base.kernelCos( PI/6.0, 0.0 )\nout = base.kernelCos( 0.785, -1.144e-17 )\nout = base.kernelCos( NaN )\n",
	"base.kernelSin": "y = base.kernelSin( 0.0, 0.0 )\ny = base.kernelSin( PI/6.0, 0.0 )\ny = base.kernelSin( 0.619, 9.279e-18 )\ny = base.kernelSin( NaN, 0.0 )\ny = base.kernelSin( 2.0, NaN )\ny = base.kernelSin( NaN, NaN )\n",
	"base.kernelTan": "out = base.kernelTan( PI/4.0, 0.0, 1 )\nout = base.kernelTan( PI/4.0, 0.0, -1 )\nout = base.kernelTan( PI/6.0, 0.0, 1 )\nout = base.kernelTan( 0.664, 5.288e-17, 1 )\nout = base.kernelTan( NaN, 0.0, 1 )\nout = base.kernelTan( 3.0, NaN, 1 )\nout = base.kernelTan( 3.0, 0.0, NaN )\n",
	"base.kroneckerDelta": "y = base.kroneckerDelta( 3.14, 0.0 )\ny = base.kroneckerDelta( 3.14, 3.14 )\n",
	"base.lcm": "v = base.lcm( 21, 6 )\n",
	"base.ldexp": "x = base.ldexp( 0.5, 3 )\nx = base.ldexp( 4.0, -2 )\nx = base.ldexp( 0.0, 20 )\nx = base.ldexp( -0.0, 39 )\nx = base.ldexp( NaN, -101 )\nx = base.ldexp( PINF, 11 )\nx = base.ldexp( NINF, -118 )\n",
	"base.ln": "y = base.ln( 4.0 )\ny = base.ln( 0.0 )\ny = base.ln( PINF )\ny = base.ln( NaN )\ny = base.ln( -4.0 )\n",
	"base.log": "y = base.log( 100.0, 10.0 )\ny = base.log( 16.0, 2.0 )\ny = base.log( 5.0, 1.0 )\ny = base.log( NaN, 2.0 )\ny = base.log( 1.0, NaN )\ny = base.log( -4.0, 2.0 )\ny = base.log( 4.0, -2.0 )\n",
	"base.log10": "y = base.log10( 100.0 )\ny = base.log10( 8.0 )\ny = base.log10( 0.0 )\ny = base.log10( PINF )\ny = base.log10( NaN )\ny = base.log10( -4.0 )\n",
	"base.log1p": "y = base.log1p( 4.0 )\ny = base.log1p( -1.0 )\ny = base.log1p( 0.0 )\ny = base.log1p( -0.0 )\ny = base.log1p( -2.0 )\ny = base.log1p( NaN )\n",
	"base.log2": "y = base.log2( 4.0 )\ny = base.log2( 8.0 )\ny = base.log2( 0.0 )\ny = base.log2( PINF )\ny = base.log2( NaN )\ny = base.log2( -4.0 )\n",
	"base.logit": "y = base.logit( 0.2 )\ny = base.logit( 0.9 )\ny = base.logit( -4.0 )\ny = base.logit( 1.5 )\ny = base.logit( NaN )\n",
	"base.lucas": "y = base.lucas( 0 )\ny = base.lucas( 1 )\ny = base.lucas( 2 )\ny = base.lucas( 3 )\ny = base.lucas( 4 )\ny = base.lucas( 77 )\ny = base.lucas( NaN )\n",
	"base.lucaspoly": "\n// 2^5 + 5*2^3 + 5*2\nv = base.lucaspoly( 5, 2.0 )\n",
	"base.max": "v = base.max( 3.14, 4.2 )\nv = base.max( 5.9, 3.14, 4.2 )\nv = base.max( 3.14, NaN )\nv = base.max( +0.0, -0.0 )\n",
	"base.maxabs": "v = base.maxabs( 3.14, -4.2 )\nv = base.maxabs( 5.9, 3.14, 4.2 )\nv = base.maxabs( 3.14, NaN )\nv = base.maxabs( +0.0, -0.0 )\n",
	"base.min": "v = base.min( 3.14, 4.2 )\nv = base.min( 5.9, 3.14, 4.2 )\nv = base.min( 3.14, NaN )\nv = base.min( +0.0, -0.0 )\n",
	"base.minabs": "v = base.minabs( 3.14, -4.2 )\nv = base.minabs( 5.9, 3.14, 4.2 )\nv = base.minabs( 3.14, NaN )\nv = base.minabs( +0.0, -0.0 )\n",
	"base.modf": "parts = base.modf( 3.14 )\nparts = base.modf( 3.14 )\nparts = base.modf( +0.0 )\nparts = base.modf( -0.0 )\nparts = base.modf( PINF )\nparts = base.modf( NINF )\nparts = base.modf( NaN )\n",
	"base.negafibonacci": "y = base.negafibonacci( 0 )\ny = base.negafibonacci( -1 )\ny = base.negafibonacci( -2 )\ny = base.negafibonacci( -3 )\ny = base.negafibonacci( -4 )\ny = base.negafibonacci( -79 )\ny = base.negafibonacci( -80 )\ny = base.negafibonacci( NaN )\n",
	"base.negalucas": "y = base.negalucas( 0 )\ny = base.negalucas( -1 )\ny = base.negalucas( -2 )\ny = base.negalucas( -3 )\ny = base.negalucas( -4 )\ny = base.negalucas( -77 )\ny = base.negalucas( -78 )\ny = base.negalucas( NaN )\n",
	"base.nonfibonacci": "v = base.nonfibonacci( 1 )\nv = base.nonfibonacci( 2 )\nv = base.nonfibonacci( 3 )\nv = base.nonfibonacci( NaN )\n",
	"base.normalize": "out = base.normalize( 3.14e-319 );\ny = out[ 0 ];\nexponent = out[ 1 ];\nbool = ( y*base.pow(2.0, exponent) === 3.14e-319 )\n\n// Special cases:\nout = base.normalize( 0.0 )\nout = base.normalize( PINF )\nout = base.normalize( NINF )\nout = base.normalize( NaN )\n",
	"base.normalizef": "out = base.normalizef( base.float64ToFloat32( 1.401e-45 ) )\ny = out[ 0 ];\nexp = out[ 1 ];\nbool = ( y*base.pow(2,exp) === base.float64ToFloat32(1.401e-45) )\n\n// Special cases:\nout = base.normalizef( FLOAT32_PINF )\nout = base.normalizef( FLOAT32_NINF )\nout = base.normalizef( NaN )\n",
	"base.pdiff": "v = base.pdiff( 5.9, 3.14 )\nv = base.pdiff( 3.14, 4.2 )\nv = base.pdiff( 3.14, NaN )\nv = base.pdiff( -0.0, +0.0 )\n",
	"base.pow": "y = base.pow( 2.0, 3.0 )\ny = base.pow( 4.0, 0.5 )\ny = base.pow( 100.0, 0.0 )\ny = base.pow( PI, 5.0 )\ny = base.pow( PI, -0.2 )\ny = base.pow( NaN, 3.0 )\ny = base.pow( 5.0, NaN )\ny = base.pow( NaN, NaN )\n",
	"base.powm1": "y = base.powm1( 2.0, 3.0 )\ny = base.powm1( 4.0, 0.5 )\ny = base.powm1( 0.0, 100.0 )\ny = base.powm1( 100.0, 0.0 )\ny = base.powm1( 0.0, 0.0 )\ny = base.powm1( PI, 5.0 )\ny = base.powm1( NaN, 3.0 )\ny = base.powm1( 5.0, NaN )\n",
	"base.rad2deg": "d = base.rad2deg( PI/2.0 )\nd = base.rad2deg( -PI/4.0 )\nd = base.rad2deg( NaN )\n\n// Due to finite precision, canonical values may not be returned:\nd = base.rad2deg( PI/6.0 )\n",
	"base.ramp": "y = base.ramp( 3.14 )\ny = base.ramp( -3.14 )\n",
	"base.random.arcsine": "r = base.random.arcsine( 2.0, 5.0 )\n",
	"base.random.beta": "r = base.random.beta( 2.0, 5.0 );\n",
	"base.random.betaprime": "r = base.random.betaprime( 2.0, 5.0 );\n",
	"base.random.binomial": "r = base.random.binomial( 20, 0.8 );\n",
	"base.random.boxMuller": "r = base.random.boxMuller();\n",
	"base.random.cauchy": "r = base.random.cauchy( 2.0, 5.0 );\n",
	"base.random.chi": "r = base.random.chi( 2 );\n",
	"base.random.chisquare": "r = base.random.chisquare( 2 );\n",
	"base.random.cosine": "r = base.random.cosine( 2.0, 5.0 );\n",
	"base.random.erlang": "r = base.random.erlang( 2, 5.0 );\n",
	"base.random.exponential": "r = base.random.exponential( 7.9 );\n",
	"base.random.f": "r = base.random.f( 2.0, 5.0 );\n",
	"base.random.frechet": "r = base.random.frechet( 2.0, 5.0, 3.33 );\n",
	"base.random.gamma": "r = base.random.gamma( 2.0, 5.0 );\n",
	"base.random.geometric": "r = base.random.geometric( 0.8 );\n",
	"base.random.gumbel": "r = base.random.gumbel( 2.0, 5.0 );\n",
	"base.random.hypergeometric": "r = base.random.hypergeometric( 20, 10, 7 );\n",
	"base.random.improvedZiggurat": "r = base.random.improvedZiggurat();\n",
	"base.random.invgamma": "r = base.random.invgamma( 2.0, 5.0 );\n",
	"base.random.kumaraswamy": "r = base.random.kumaraswamy( 2.0, 5.0 );\n",
	"base.random.laplace": "r = base.random.laplace( 2.0, 5.0 );\n",
	"base.random.levy": "r = base.random.levy( 2.0, 5.0 );\n",
	"base.random.logistic": "r = base.random.logistic( 2.0, 5.0 );\n",
	"base.random.lognormal": "r = base.random.lognormal( 2.0, 5.0 );\n",
	"base.random.minstd": "r = base.random.minstd();\n",
	"base.random.minstdShuffle": "r = base.random.minstdShuffle();\n",
	"base.random.negativeBinomial": "r = base.random.negativeBinomial( 20, 0.8 );\n",
	"base.random.normal": "r = base.random.normal( 2.0, 5.0 );\n",
	"base.random.pareto1": "r = base.random.pareto1( 2.0, 5.0 );\n",
	"base.random.poisson": "r = base.random.poisson( 7.9 );\n",
	"base.random.randn": "r = base.random.randn();\n",
	"base.random.randu": "r = base.random.randu();\n",
	"base.random.rayleigh": "r = base.random.rayleigh( 2.5 );\n",
	"base.random.t": "r = base.random.t( 2.0 );\n",
	"base.random.triangular": "r = base.random.triangular( 2.0, 5.0, 3.33 );\n",
	"base.random.uniform": "r = base.random.uniform( 2.0, 5.0 );\n",
	"base.random.weibull": "r = base.random.weibull( 2.0, 5.0 );\n",
	"base.rempio2": "y = new Array( 2 );\nn = base.rempio2( 128.0, y )\ny1 = y[ 0 ]\ny2 = y[ 1 ]\n",
	"base.reldiff": "d = base.reldiff( 2.0, 5.0 )\nd = base.reldiff( -1.0, 3.14 )\nd = base.reldiff( -2.0, 5.0, 'max-abs' )\nd = base.reldiff( -2.0, 5.0, 'max' )\nd = base.reldiff( -2.0, 5.0, 'min-abs' )\nd = base.reldiff( -2.0, 5.0, 'min' )\nd = base.reldiff( -2.0, 5.0, 'mean-abs' )\nd = base.reldiff( -2.0, 5.0, 'mean' )\nd = base.reldiff( -2.0, 5.0, 'x' )\nd = base.reldiff( 5.0, -2.0, 'x' )\nd = base.reldiff( -2.0, 5.0, 'y' )\nd = base.reldiff( 5.0, -2.0, 'y' )\n\n// Custom scale function:\nfunction scale( x, y ) {\ns;\n\nx = base.abs( x );\ny = base.abs( y );\n\n// Maximum absolute value:\ns = (x < y ) ? y : x;\n\n// Scale in units of epsilon:\nreturn s * EPS;\n};\nd = base.reldiff( 12.15, 12.149999999999999, scale )\n",
	"base.rotl32": "x = 2147483649;\nbStr = base.toBinaryStringUint32( x )\ny = base.rotl32( x, 10 )\nbstr = base.toBinaryStringUint32( y )\n",
	"base.rotr32": "x = 1;\nbStr = base.toBinaryStringUint32( x )\ny = base.rotr32( x, 10 )\nbstr = base.toBinaryStringUint32( y )\n",
	"base.risingFactorial": "v = base.risingFactorial( 0.9, 5 )\nv = base.risingFactorial( -9.0, 3 )\nv = base.risingFactorial( 0.0, 2 )\nv = base.risingFactorial( 3.0, -2 )\n",
	"base.round": "y = base.round( 3.14 )\ny = base.round( -4.2 )\ny = base.round( -4.6 )\ny = base.round( 9.5 )\ny = base.round( -0.0 )\n",
	"base.round10": "y = base.round10( 3.14 )\ny = base.round10( -4.2 )\ny = base.round10( -4.6 )\ny = base.round10( 9.5 )\ny = base.round10( 13.0 )\ny = base.round10( -13.0 )\ny = base.round10( -0.0 )\n",
	"base.round2": "y = base.round2( 3.14 )\ny = base.round2( -4.2 )\ny = base.round2( -4.6 )\ny = base.round2( 9.5 )\ny = base.round2( 13.0 )\ny = base.round2( -13.0 )\ny = base.round2( -0.0 )\n",
	"base.roundb": "\n// Round to 2 decimal places:\ny = base.roundb( 3.14159, -2, 10 )\n\n// If `n = 0` or `b = 1`, standard round behavior:\ny = base.roundb( 3.14159, 0, 2 )\n\n// Round to nearest multiple of two:\ny = base.roundb( 5.0, 1, 2 )\n",
	"base.roundn": "\n// Round to 2 decimal places:\ny = base.roundn( 3.14159, -2 )\n\n// If `n = 0`, standard round behavior:\ny = base.roundn( 3.14159, 0 )\n\n// Round to nearest thousand:\ny = base.roundn( 12368.0, 3 )\n",
	"base.roundsd": "y = base.roundsd( 3.14159, 3 )\ny = base.roundsd( 3.14159, 1 )\ny = base.roundsd( 12368.0, 2 )\ny = base.roundsd( 0.0313, 2, 2 )\n",
	"base.sasum": "\n// Standard usage:\nx = new Float32Array( [ -2.0, 1.0, 3.0, -5.0, 4.0, 0.0, -1.0, -3.0 ] );\nsum = base.sasum( x.length, x, 1 )\n\n// Sum every other value:\nN = base.floor( x.length / 2 );\nstride = 2;\nsum = base.sasum( N, x, stride )\n\n// Use view offset; e.g., starting at 2nd element:\nx0 = new Float32Array( [ 1.0, -2.0, 3.0, -4.0, 5.0, -6.0 ] );\nx1 = new Float32Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\nN = base.floor( x0.length / 2 );\nsum = base.sasum( N, x1, stride )\n",
	"base.saxpy": "\n// Standard usage:\nx = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );\ny = new Float32Array( [ 1.0, 1.0, 1.0, 1.0, 1.0 ] );\nalpha = 5.0;\nbase.saxpy( x.length, alpha, x, 1, y, 1 )\n\n// Using `N` and `stride` parameters:\nN = base.floor( x.length / 2 );\nbase.saxpy( N, alpha, x, 2, y, -1 )\n\n// Using view offsets:\nx0 = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny0 = new Float32Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nx1 = new Float32Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\ny1 = new Float32Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 );\nN = base.floor( x0.length / 2 );\nbase.saxpy( N, 5.0, x1, -2, y1, 1 )\ny0\n",
	"base.scopy": "\n// Standard usage:\nx = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );\ny = new Float32Array( [ 6.0, 7.0, 8.0, 9.0, 10.0 ] );\nbase.scopy( x.length, x, 1, y, 1 )\n\n// Advanced indexing:\nx = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny = new Float32Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nN = base.floor( x.length / 2 );\nbase.scopy( N, x, -2, y, 1 )\n\n// Using typed array views:\nx0 = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );\ny0 = new Float32Array( [ 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );\nx1 = new Float32Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 );\ny1 = new Float32Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 );\nN = base.floor( x0.length / 2 );\nbase.scopy( N, x1, -2, y1, 1 )\ny0\n",
	"base.setHighWord": "\n// Set the higher order bits of `+infinity` to return `1`:\nhigh = 1072693248 >>> 0;\ny = base.setHighWord( PINF, high )\n",
	"base.setLowWord": "low = 5 >>> 0;\nx = 3.14e201;\ny = base.setLowWord( x, low )\n\n// Special cases:\nlow = 12345678;\ny = base.setLowWord( PINF, low )\ny = base.setLowWord( NINF, low )\ny = base.setLowWord( NaN, low )\n",
	"base.sici": "y = base.sici( 3.0 )\ny = base.sici( 0.0 )\ny = base.sici( -9.0 )\ny = base.sici( NaN )\n",
	"base.signbit": "bool = base.signbit( 4.0 )\nbool = base.signbit( -9.14e-34 )\nbool = base.signbit( 0.0 )\nbool = base.signbit( -0.0 )\n",
	"base.signbitf": "bool = base.signbitf( base.float64ToFloat32( 4.0 ) )\nbool = base.signbitf( base.float64ToFloat32( -9.14e-34 ) )\nbool = base.signbitf( 0.0 )\nbool = base.signbitf( -0.0 )\n",
	"base.significandf": "s = base.significandf( base.float64ToFloat32( 3.14e34 ) )\ns = base.significandf( base.float64ToFloat32( 3.14e-34 ) )\ns = base.significandf( base.float64ToFloat32( -3.14 ) )\ns = base.significandf( 0.0 )\ns = base.significandf( NaN )\n",
	"base.signum": "sign = base.signum( -5.0 )\nsign = base.signum( 5.0 )\nsign = base.signum( -0.0 )\nsign = base.signum( 0.0 )\nsign = base.signum( NaN )\n",
	"base.sin": "y = base.sin( 0.0 )\ny = base.sin( PI/2.0 )\ny = base.sin( -PI/6.0 )\ny = base.sin( NaN )\n",
	"base.sinc": "y = base.sinc( 0.5 )\ny = base.sinc( -1.2 )\ny = base.sinc( 0.0 )\ny = base.sinc( NaN )\n",
	"base.sincos": "y = base.sincos( 0.0 )\ny = base.sincos( PI/2.0 )\ny = base.sincos( -PI/6.0 )\ny = base.sincos( NaN )\nout = new Float64Array( 2 );\nv = base.sincos( out, 0.0 )\nbool = ( v === out )\n",
	"base.sincospi": "y = base.sincospi( 0.0 )\ny = base.sincospi( 0.5 )\ny = base.sincospi( 0.1 )\ny = base.sincospi( NaN )\nout = new Float64Array( 2 );\nv = base.sincospi( out, 0.0 )\nbool = ( v === out )\n",
	"base.sinh": "y = base.sinh( 0.0 )\ny = base.sinh( 2.0 )\ny = base.sinh( -2.0 )\ny = base.sinh( NaN )\n",
	"base.sinpi": "y = base.sinpi( 0.0 )\ny = base.sinpi( 0.5 )\ny = base.sinpi( 0.9 )\ny = base.sinpi( NaN )\n",
	"base.spence": "y = base.spence( 3.0 )\ny = base.spence( 0.0 )\ny = base.spence( -9.0 )\ny = base.spence( NaN )\n",
	"base.sqrt": "y = base.sqrt( 4.0 )\ny = base.sqrt( 9.0 )\ny = base.sqrt( 0.0 )\ny = base.sqrt( -4.0 )\ny = base.sqrt( NaN )\n",
	"base.sqrt1pm1": "y = base.sqrt1pm1( 3.0 )\ny = base.sqrt1pm1( 0.5 )\ny = base.sqrt1pm1( 0.02 )\ny = base.sqrt1pm1( -0.5 )\ny = base.sqrt1pm1( -1.1 )\ny = base.sqrt1pm1( NaN )\n",
	"base.sumSeries": "\n// Using an ES6 generator function:\nfunction* geometricSeriesGenerator( x ) {\nexponent = 0;\nwhile ( true ) {\nyield Math.pow( x, exponent );\nexponent += 1;\n}\n}\ngen = geometricSeriesGenerator( 0.9 );\nout = base.sumSeries( gen )\n\n// Using a closure:\nfunction geometricSeriesClosure( x ) {\nexponent = -1;\nreturn function() {\nexponent += 1;\nreturn Math.pow( x, exponent );\n};\n}\ngen = geometricSeriesClosure( 0.9 )\nout = base.sumSeries( gen )\n\n// Setting an initial value for the sum:\nout = base.sumSeries( geometricSeriesGenerator( 0.5 ), { 'initialValue': 1 } )\n\n// Changing the maximum number of terms to be summed:\nout = base.sumSeries( geometricSeriesGenerator( 0.5 ), { 'maxTerms': 10 } )\n\n// Adjusting the used tolerance:\nout = base.sumSeries( geometricSeriesGenerator( 0.5 ), { 'tolerance': 1e-3 } )\n",
	"base.tan": "y = base.tan( 0.0 )\ny = base.tan( -PI/4.0 )\ny = base.tan( PI/4.0 )\ny = base.tan( NaN )\n",
	"base.tanh": "y = base.tanh( 0.0 )\ny = base.tanh( -0.0 )\ny = base.tanh( 2.0 )\ny = base.tanh( -2.0 )\ny = base.tanh( NaN )\n",
	"base.toBinaryString": "str = base.toBinaryString( 4.0 )\nstr = base.toBinaryString( PI )\nstr = base.toBinaryString( -1.0e308 )\nstr = base.toBinaryString( -3.14e-320 )\nstr = base.toBinaryString( 5.0e-324 )\nstr = base.toBinaryString( 0.0 )\nstr = base.toBinaryString( -0.0 )\nstr = base.toBinaryString( NaN )\nstr = base.toBinaryString( PINF )\nstr = base.toBinaryString( NINF )\n",
	"base.toBinaryStringf": "str = base.toBinaryStringf( base.float64ToFloat32( 4.0 ) )\nstr = base.toBinaryStringf( base.float64ToFloat32( PI ) )\nstr = base.toBinaryStringf( base.float64ToFloat32( -1.0e38 ) )\nstr = base.toBinaryStringf( base.float64ToFloat32( -3.14e-39 ) )\nstr = base.toBinaryStringf( base.float64ToFloat32( 1.4e-45 ) )\nstr = base.toBinaryStringf( 0.0 )\nstr = base.toBinaryStringf( -0.0 )\nstr = base.toBinaryStringf( NaN )\nstr = base.toBinaryStringf( FLOAT32_PINF )\nstr = base.toBinaryStringf( FLOAT32_NINF )\n",
	"base.toBinaryStringUint16": "a = new Uint16Array( [ 1, 4, 9 ] );\nstr = base.toBinaryStringUint16( a[ 0 ] )\nstr = base.toBinaryStringUint16( a[ 1 ] )\nstr = base.toBinaryStringUint16( a[ 2 ] )\n",
	"base.toBinaryStringUint32": "a = new Uint32Array( [ 1, 4, 9 ] );\nstr = base.toBinaryStringUint32( a[ 0 ] )\nstr = base.toBinaryStringUint32( a[ 1 ] )\nstr = base.toBinaryStringUint32( a[ 2 ] )\n",
	"base.toBinaryStringUint8": "a = new Uint8Array( [ 1, 4, 9 ] );\nstr = base.toBinaryStringUint8( a[ 0 ] )\nstr = base.toBinaryStringUint8( a[ 1 ] )\nstr = base.toBinaryStringUint8( a[ 2 ] )\n",
	"base.toWordf": "f32 = base.float64ToFloat32( 1.337 )\nw = base.toWordf( f32 )\n",
	"base.toWords": "w = base.toWords( 3.14e201 )\n",
	"base.trigamma": "y = base.trigamma( -2.5 )\ny = base.trigamma( 1.0 )\ny = base.trigamma( 10.0 )\ny = base.trigamma( NaN )\ny = base.trigamma( -1.0 )\n",
	"base.trunc": "y = base.trunc( 3.14 )\ny = base.trunc( -4.2 )\ny = base.trunc( -4.6 )\ny = base.trunc( 9.5 )\ny = base.trunc( -0.0 )\n",
	"base.trunc10": "y = base.trunc10( 3.14 )\ny = base.trunc10( -4.2 )\ny = base.trunc10( -4.6 )\ny = base.trunc10( 9.5 )\ny = base.trunc10( 13.0 )\ny = base.trunc10( -13.0 )\ny = base.trunc10( -0.0 )\n",
	"base.trunc2": "y = base.trunc2( 3.14 )\ny = base.trunc2( -4.2 )\ny = base.trunc2( -4.6 )\ny = base.trunc2( 9.5 )\ny = base.trunc2( 13.0 )\ny = base.trunc2( -13.0 )\ny = base.trunc2( -0.0 )\n",
	"base.truncb": "\n// Round to 4 decimal places:\ny = base.truncb( 3.14159, -4, 10 )\n\n// If `n = 0` or `b = 1`, standard round behavior:\ny = base.truncb( 3.14159, 0, 2 )\n\n// Round to nearest multiple of two toward zero:\ny = base.truncb( 5.0, 1, 2 )\n",
	"base.truncn": "\n// Round to 4 decimal places:\ny = base.truncn( 3.14159, -4 )\n\n// If `n = 0`, standard round behavior:\ny = base.truncn( 3.14159, 0 )\n\n// Round to nearest thousand:\ny = base.truncn( 12368.0, 3 )\n",
	"base.truncsd": "y = base.truncsd( 3.14159, 5 )\ny = base.truncsd( 3.14159, 1 )\ny = base.truncsd( 12368.0, 2 )\ny = base.truncsd( 0.0313, 2, 2 )\n",
	"base.uint32ToInt32": "y = base.uint32ToInt32( base.float64ToUint32( 4294967295 ) )\ny = base.uint32ToInt32( base.float64ToUint32( 3 ) )\n",
	"base.vercos": "y = base.vercos( 3.14 )\ny = base.vercos( -4.2 )\ny = base.vercos( -4.6 )\ny = base.vercos( 9.5 )\ny = base.vercos( -0.0 )\n",
	"base.versin": "y = base.versin( 3.14 )\ny = base.versin( -4.2 )\ny = base.versin( -4.6 )\ny = base.versin( 9.5 )\ny = base.versin( -0.0 )\n",
	"base.xlogy": "out = base.xlogy( 3.0, 2.0 )\nout = base.xlogy( 1.5, 5.9 )\nout = base.xlogy( 0.9, 1.0 )\nout = base.xlogy( 0.0, -2.0 )\nout = base.xlogy( 1.5, NaN )\nout = base.xlogy( 0.0, NaN )\nout = base.xlogy( NaN, 2.3 )\n",
	"base.xlog1py": "out = base.xlog1py( 3.0, 2.0 )\nout = base.xlog1py( 1.5, 5.9 )\nout = base.xlog1py( 0.9, 1.0 )\nout = base.xlog1py( 1.0, 0.0 )\nout = base.xlog1py( 0.0, -2.0 )\nout = base.xlog1py( 1.5, NaN )\nout = base.xlog1py( 0.0, NaN )\nout = base.xlog1py( NaN, 2.3 )\n",
	"base.zeta": "y = base.zeta( 1.1 )\ny = base.zeta( -4.0 )\ny = base.zeta( 70.0 )\ny = base.zeta( 0.5 )\ny = base.zeta( NaN )\n\n// Evaluate at a pole:\ny = base.zeta( 1.0 )\n",
	"bifurcate": "collection = [ 'beep', 'boop', 'foo', 'bar' ];\nf = [ true, true, false, true ];\nout = bifurcate( collection, f )\nf = [ 1, 1, 0, 1 ];\nout = bifurcate( collection, f )\n\n// Output group results as indices:\nf = [ true, true, false, true ];\nopts = { 'returns': 'indices' };\nout = bifurcate( collection, opts, f )\n\n// Output group results as index-element pairs:\nopts = { 'returns': '*' };\nout = bifurcate( collection, opts, f )\n",
	"bifurcateBy": "function predicate( v ) { v[ 0 ] === 'b' };\ncollection = [ 'beep', 'boop', 'foo', 'bar' ];\nout = bifurcateBy( collection, predicate )\n\n// Output group results as indices:\nopts = { 'returns': 'indices' };\nout = bifurcateBy( collection, opts, predicate )\n\n// Output group results as index-value pairs:\nopts = { 'returns': '*' };\nout = bifurcateBy( collection, opts, predicate )\n",
	"bifurcateByAsync": "\n// Basic usage:\nfunction predicate( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\narr = [ 3000, 2500, 1000 ];\nbifurcateByAsync( arr, predicate, done )\n\n// Output group results as indices:\nopts = { 'returns': 'indices' };\nbifurcateByAsync( arr, opts, predicate, done )\n\n// Output group results as index-value pairs:\nopts = { 'returns': '*' };\nbifurcateByAsync( arr, opts, predicate done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\nbifurcateByAsync( arr, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\nbifurcateByAsync( arr, opts, predicate, done )\n",
	"bifurcateIn": "function Foo() { this.a = 'beep'; this.b = 'boop'; return this; };\nFoo.prototype = Object.create( null );\nFoo.prototype.c = 'foo';\nFoo.prototype.d = 'bar';\nobj = new Foo();\nfunction predicate( v ) { v[ 0 ] === 'b' };\nout = bifurcateIn( obj, predicate )\n\n// Output group results as keys:\nopts = { 'returns': 'keys' };\nout = bifurcateIn( obj, opts, predicate )\n\n// Output group results as key-value pairs:\nopts = { 'returns': '*' };\nout = bifurcateIn( obj, opts, predicate )\n",
	"bifurcateOwn": "function predicate( v ) { v[ 0 ] === 'b' };\nobj = { 'a': 'beep', 'b': 'boop', 'c': 'foo', 'd': 'bar' };\nout = bifurcateOwn( obj, predicate )\n\n// Output group results as keys:\nopts = { 'returns': 'keys' };\nout = bifurcateOwn( obj, opts, predicate )\n\n// Output group results as key-value pairs:\nopts = { 'returns': '*' };\nout = bifurcateOwn( obj, opts, predicate )\n",
	"capitalize": "out = capitalize( 'beep' )\nout = capitalize( 'Boop' )\n",
	"capitalizeKeys": "obj = { 'aa': 1, 'bb': 2 };\nout = capitalizeKeys( obj )\n",
	"CATALAN": "CATALAN\n",
	"chi2gof": "\n// Use probabilities for `y`:\nx = [ 89, 37, 30, 28, 2 ];\np = [ 0.40, 0.20, 0.20, 0.15, 0.05 ];\nout = chi2gof( x, p )\ntable = out.print()\n\n// Set significance level:\nout = chi2gof( x, p, { 'alpha': 0.01 });\ntable = out.print()\n\n// Calculate the p-value via Monte Carlo simulation:\nx = [ 89, 37, 30, 28, 2 ];\np = [ 0.40, 0.20, 0.20, 0.15, 0.05 ];\nout = chi2gof( x, p, { 'simulate': true, 'iterations': 1000 })\n\n// Verify that data comes from Poisson distribution:\nlambda = 3.0;\nrpois = base.random.poisson.factory( lambda );\nlen = 400;\nx = new Array( len );\nfor ( var i = 0; i < len; i++ ) { x[ i ] = rpois(); }\n\n// Generate frequency table:\nfreqs = [];\nfor ( i = 0; i < len; i++ ) {\n  val = x[ i ];\n  freqs[ val ] === void 0 ? freqs[ val ] = 1 : freqs[ val ] += 1;\n}\n\n// Fill holes in array:\nfor ( i = 0; i < freqs.length; i++ ) {\n  if ( freqs[ i ] === void 0 ) { freqs[ i ] = 0; }\n}\nout = chi2gof( freqs, 'poisson', lambda );\n",
	"complex": "z = complex( 5.0, 3.0, 'float64' )\nz = complex( 5.0, 3.0, 'float32' )\n",
	"Complex128": "z = Complex128( 5.0, 3.0 )\nz.re\nz.im\n",
	"COMPLEX128_NUM_BYTES": "COMPLEX128_NUM_BYTES\n",
	"Complex64": "z = Complex64( 5.0, 3.0 )\nz.re\nz.im\n",
	"COMPLEX64_NUM_BYTES": "COMPLEX64_NUM_BYTES\n",
	"compose": "function a( x ) {\n   return 2 * x;\n}\nfunction b( x ) {\n   return x + 3;\n}\nfunction c( x ) {\n   return x / 5;\n}\nf = compose( c, b, a );\nz = f( 6 )\n",
	"composeAsync": "function a( x, next ) {\n   setTimeout( onTimeout, 0 );\n   function onTimeout() {\n     next( null, 2*x );\n   }\n};\nfunction b( x, next ) {\n   setTimeout( onTimeout, 0 );\n   function onTimeout() {\n     next( null, x+3 );\n   }\n};\nfunction c( x, next ) {\n   setTimeout( onTimeout, 0 );\n   function onTimeout() {\n     next( null, x/5 );\n   }\n};\nf = composeAsync( c, b, a );\nfunction done( error, result ) {\n   if ( error ) {\n     throw error;\n   }\n   console.log( result );\n};\nf( 6, done )\n",
	"conj": "z = new Complex128( 5.0, 3.0 );\nz.toString()\nv = conj( z );\nv.toString()\n",
	"constantFunction": "fcn = constantFunction( 3.14 );\nv = fcn()\nv = fcn()\nv = fcn()\n",
	"constructorName": "v = constructorName( 'a' )\nv = constructorName( {} )\nv = constructorName( true )\n",
	"contains": "bool = contains( 'Hello World', 'World' )\nbool = contains( 'Hello World', 'world' )\nbool = contains( [ 1, 2, 3, 4 ], 2 )\nbool = contains( [ NaN, 2, 3, 4 ], NaN )\n\n// Supply a position:\nbool = contains( 'Hello World', 'Hello', 6 )\nbool = contains( [ true, NaN, false ], true, 1 )\n",
	"convertPath": "out = convertPath( '/c/foo/bar/beep.c', 'win32' )\nout = convertPath( '/c/foo/bar/beep.c', 'mixed' )\nout = convertPath( '/c/foo/bar/beep.c', 'posix' )\nout = convertPath( 'C:\\\\\\\\foo\\\\bar\\\\beep.c', 'win32' )\nout = convertPath( 'C:\\\\\\\\foo\\\\bar\\\\beep.c', 'mixed' )\nout = convertPath( 'C:\\\\\\\\foo\\\\bar\\\\beep.c', 'posix' )\n",
	"copy": "value = [ { 'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ];\nout = copy( value )\nbool = ( value[ 0 ].c === out[ 0 ].c )\n\n// Set the `level` option to limit the copy depth:\nvalue = [ { 'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ];\nout = copy( value, 1 );\nbool = ( value[ 0 ] === out[ 0 ] )\nbool = ( value[ 0 ].c === out[ 0 ].c )\n",
	"countBy": "function indicator( v ) {\n  if ( v[ 0 ] === 'b' ) {\n      return 'b';\n  }\n  return 'other';\n};\ncollection = [ 'beep', 'boop', 'foo', 'bar' ];\nout = countBy( collection, indicator )\n",
	"countByAsync": "\n// Basic usage:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) ? 'even': 'odd' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\narr = [ 3000, 2500, 1000 ];\ncountByAsync( arr, indicator, done )\n\n// Limit number of concurrent invocations:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) ? 'even' : 'odd' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\ncountByAsync( arr, opts, indicator, done )\n\n// Process sequentially:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) ? 'even' : 'odd' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\ncountByAsync( arr, opts, indicator, done )\n",
	"curry": "function add( x, y ) { return x + y; };\nf = curry( add );\nsum = f( 2 )( 3 )\n\n// Supply arity:\nfunction add() { return arguments[ 0 ] + arguments[ 1 ]; };\nf = curry( add, 2 );\nsum = f( 2 )( 3 )\n\n// Provide function context:\nobj = {\n  'name': 'Ada',\n  'greet': function greet( word1, word2 ) {\n     return word1 + ' ' + word2 + ', ' + this.name + '!'\n  }\n};\nf = curry( obj.greet, obj );\nstr = f( 'Hello' )( 'there' )\n",
	"curryRight": "function add( x, y ) { return x + y; };\nf = curryRight( add );\nsum = f( 2 )( 3 )\n\n// Supply arity:\nfunction add() { return arguments[ 0 ] + arguments[ 1 ]; };\nf = curryRight( add, 2 );\nsum = f( 2 )( 3 )\n\n// Provide function context:\nobj = {\n  'name': 'Ada',\n  'greet': function greet( word1, word2 ) {\n      return word1 + ' ' + word2 + ', ' + this.name + '!'\n  }\n};\nf = curryRight( obj.greet, obj );\nstr = f( 'Hello' )( 'there' )\n",
	"cwd": "dir = cwd()\n",
	"DALE_CHALL_NEW": "list = DALE_CHALL_NEW()\n",
	"datasets": "out = datasets( 'MONTH_NAMES_EN' )\nopts = { 'data': 'cities' };\nout = datasets( 'MINARD_NAPOLEONS_MARCH', opts )\n",
	"dayOfQuarter": "day = dayOfQuarter()\nday = dayOfQuarter( new Date() )\nday = dayOfQuarter( 12, 31, 2017 )\n\n// Other ways to supply month:\nday = dayOfQuarter( 'dec', 31, 2017 )\nday = dayOfQuarter( 'december', 31, 2017 )\n",
	"dayOfYear": "day = dayOfYear()\nday = dayOfYear( new Date() )\nday = dayOfYear( 12, 31, 2016 )\n\n// Other ways to supply month:\nday = dayOfYear( 'dec', 31, 2016 )\nday = dayOfYear( 'december', 31, 2016 )\n",
	"daysInMonth": "num = daysInMonth()\nnum = daysInMonth( 2 )\nnum = daysInMonth( 2, 2016 )\nnum = daysInMonth( 2, 2017 )\n\n// Other ways to supply month:\nnum = daysInMonth( 'feb', 2016 )\nnum = daysInMonth( 'february', 2016 )\n",
	"daysInYear": "num = daysInYear()\nnum = daysInYear( 2016 )\nnum = daysInYear( 2017 )\n",
	"deepGet": "obj = { 'a': { 'b': { 'c': 'd' } } };\nval = deepGet( obj, 'a.b.c' )\n\n// Specify a custom separator via the `sep` option:\nobj = { 'a': { 'b': { 'c': 'd' } } };\nval = deepGet( obj, 'a/b/c', { 'sep': '/' } )\n",
	"deepPluck": "arr = [\n  { 'a': { 'b': { 'c': 1 } } },\n  { 'a': { 'b': { 'c': 2 } } }\n];\nout = deepPluck( arr, 'a.b.c' )\narr = [\n  { 'a': [ 0, 1, 2 ] },\n  { 'a': [ 3, 4, 5 ] }\n];\nout = deepPluck( arr, [ 'a', 1 ] )\n",
	"deepSet": "obj = { 'a': { 'b': { 'c': 'd' } } };\nbool = deepSet( obj, 'a.b.c', 'beep' )\n\n// Specify an alternative separator via the sep option:\nobj = { 'a': { 'b': { 'c': 'd' } } };\nbool = deepSet( obj, 'a/b/c', 'beep', { 'sep': '/' } );\nobj\n\n// To create a key path which does not exist, set the create option to true:\nbool = deepSet( obj, 'a.e.c', 'boop', { 'create': true } );\nobj\n",
	"dirname": "dir = dirname( './foo/bar/index.js' )\n",
	"doUntil": "function predicate( i ) { return ( i >= 5 ); };\nfunction beep( i ) { console.log( 'boop: %d', i ); };\ndoUntil( beep, predicate )\n",
	"doUntilAsync": "function fcn( i, next ) {\n  setTimeout( onTimeout, i );\n  function onTimeout() {\n      next( null, 'boop'+i );\n  }\n};\nfunction predicate( i, clbk ) { clbk( null, i >= 5 ); };\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\ndoUntilAsync( fcn, predicate, done )\n",
	"doUntilEach": "function predicate( v ) { return v !== v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, 2, 3, 4, NaN, 5 ];\ndoUntilEach( arr, logger, predicate )\n",
	"doUntilEachRight": "function predicate( v ) { return v !== v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, NaN, 2, 3, 4, 5 ];\ndoUntilEachRight( arr, logger, predicate )\n",
	"doWhile": "function predicate( i ) { return ( i < 5 ); };\nfunction beep( i ) { console.log( 'boop: %d', i ); };\ndoWhile( beep, predicate )\n",
	"doWhileAsync": "function fcn( i, next ) {\n  setTimeout( onTimeout, i );\n  function onTimeout() {\n      next( null, 'boop'+i );\n  }\n};\nfunction predicate( i, clbk ) { clbk( null, i < 5 ); };\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\ndoWhileAsync( fcn, predicate, done )\n",
	"doWhileEach": "function predicate( v ) { return v === v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, 2, 3, 4, NaN, 5 ];\ndoWhileEach( arr, logger, predicate )\n",
	"doWhileEachRight": "function predicate( v ) { return v === v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, NaN, 2, 3, 4, 5 ];\ndoWhileEachRight( arr, logger, predicate )\n",
	"E": "E\n",
	"endsWith": "bool = endsWith( 'beep', 'ep' )\nbool = endsWith( 'Beep', 'op' )\nbool = endsWith( 'Beep', 'ee', 3 )\nbool = endsWith( 'Beep', 'ee', -1 )\nbool = endsWith( 'beep', '' )\n",
	"ENV": "user = ENV.USER\n",
	"EPS": "EPS\n",
	"EULERGAMMA": "EULERGAMMA\n",
	"err2json": "err = new Error( 'beep' );\njson = err2json( err )\n",
	"evil": "v = evil( '5*4*3*2*1' );\n",
	"every": "arr = [ 1, 1, 1, 1, 1 ];\nbool = every( arr )\n",
	"everyBy": "function positive( v ) { return ( v > 0 ); };\narr = [ 1, 2, 3, 4 ];\nbool = everyBy( arr, positive )\n",
	"everyByAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, true );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 3000, 2500, 1000 ];\neveryByAsync( arr, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, true );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\neveryByAsync( arr, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, true );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\neveryByAsync( arr, opts, predicate, done )\n",
	"everyByRight": "function positive( v ) { return ( v > 0 ); };\narr = [ 1, 2, 3, 4 ];\nbool = everyByRight( arr, positive )\n",
	"everyByRightAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, true );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 1000, 2500, 3000 ];\neveryByRightAsync( arr, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, true );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 1000, 2500, 3000 ];\neveryByRightAsync( arr, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, true );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 1000, 2500, 3000 ];\neveryByRightAsync( arr, opts, predicate, done )\n",
	"exists": "function done( error, bool ) { console.log( bool ); };\nexists( './beep/boop', done );\n",
	"expandContractions": "str = 'I won\\'t be able to get y\\'all out of this one.';\nout = expandContractions( str )\nstr = 'It oughtn't to be my fault, because, you know, I didn't know';\nout = expandContractions( str )\n",
	"extname": "ext = extname( 'index.js' )\n",
	"fast.abs": "v = fast.abs( -1.0 )\nv = fast.abs( 2.0 )\nv = fast.abs( 0.0 )\nv = fast.abs( -0.0 )\nv = fast.abs( NaN )\n",
	"fast.acosh": "v = fast.acosh( 1.0 )\nv = fast.acosh( 2.0 )\nv = fast.acosh( NaN )\n\n// The function overflows for large `x`:\nv = fast.acosh( 1.0e308 )\n",
	"fast.ampbm": "h = fast.ampbm( 5.0, 12.0 )\n",
	"fast.asinh": "v = fast.asinh( 0.0 )\nv = fast.asinh( 2.0 )\nv = fast.asinh( -2.0 )\nv = fast.asinh( NaN )\n\n// The function overflows for large `x`:\nv = fast.asinh( 1.0e200 )\n\n// The function underflows for small `x`:\nv = fast.asinh( 1.0e-50 )\n",
	"fast.atanh": "v = fast.atanh( 0.0 )\nv = fast.atanh( 0.9 )\nv = fast.atanh( 1.0 )\nv = fast.atanh( -1.0 )\nv = fast.atanh( NaN )\n\n// The function underflows for small `x`:\nv = fast.atanh( 1.0e-17 )\n",
	"fast.hypot": "h = fast.hypot( -5.0, 12.0 )\n\n// For a sufficiently large `x` and/or `y`, the function overflows:\nh = fast.hypot( 1.0e154, 1.0e154 )\n\n// For sufficiently small `x` and/or `y`, the function underflows:\nh = fast.hypot( 1e-200, 1.0e-200 )\n",
	"fast.log2Uint32": "v = fast.log2Uint32( 4 >>> 0 )\nv = fast.log2Uint32( 8 >>> 0 )\nv = fast.log2Uint32( 9 >>> 0 )\n",
	"fast.max": "v = fast.max( 3.14, 4.2 )\nv = fast.max( 3.14, NaN )\nv = fast.max( NaN, 3.14 )\nv = fast.max( -0.0, +0.0 )\nv = fast.max( +0.0, -0.0 )\n",
	"fast.min": "v = fast.min( 3.14, 4.2 )\nv = fast.min( 3.14, NaN )\nv = fast.min( NaN, 3.14 )\nv = fast.min( -0.0, +0.0 )\nv = fast.min( +0.0, -0.0 )\n",
	"fast.pow": "v = fast.pow( 2.0, 3 )\nv = fast.pow( 3.14, 0 )\nv = fast.pow( 2.0, -2 )\nv = fast.pow( 0.0, 0 )\nv = fast.pow( -3.14, 1 )\nv = fast.pow( NaN, 0 )\n",
	"fast.sqrtUint32": "v = fast.sqrtUint32( 9 >>> 0 )\nv = fast.sqrtUint32( 2 >>> 0 )\nv = fast.sqrtUint32( 3 >>> 0 )\nv = fast.sqrtUint32( 0 >>> 0 )\n",
	"FEMALE_FIRST_NAMES_EN": "list = FEMALE_FIRST_NAMES_EN()\n",
	"find": "data = [ 30, 20, 50, 60, 10 ];\nfunction condition( val ) { return val > 20; };\nvals = find( data, condition )\n\n// Limit number of results:\ndata = [ 30, 20, 50, 60, 10 ];\nopts = { 'k': 2, 'returns': 'values' };\nvals = find( data, opts, condition )\n\n// Return both indices and values as index-value pairs:\ndata = [ 30, 20, 50, 60, 10 ];\nopts = { 'k': -2, 'returns': '*' };\nvals = find( data, opts, condition )\n",
	"flattenArray": "arr = [ 1, [ 2, [ 3, [ 4, [ 5 ], 6 ], 7 ], 8 ], 9 ];\nout = flattenArray( arr )\n\n// Set the maximum depth:\narr = [ 1, [ 2, [ 3, [ 4, [ 5 ], 6 ], 7 ], 8 ], 9 ];\nout = flattenArray( arr, { 'depth': 2 } )\nbool = ( arr[ 1 ][ 1 ][ 1 ] === out[ 3 ] )\n\n// Deep copy:\narr = [ 1, [ 2, [ 3, [ 4, [ 5 ], 6 ], 7 ], 8 ], 9 ];\nout = flattenArray( arr, { 'depth': 2, 'copy': true } )\nbool = ( arr[ 1 ][ 1 ][ 1 ] === out[ 3 ] )\n",
	"flattenObject": "obj = { 'a': { 'b': { 'c': 'd' } } };\nout = flattenObject( obj )\n\n// Set the `depth` option to flatten to a specified depth:\nobj = { 'a': { 'b': { 'c': 'd' } } };\nout = flattenObject( obj, { 'depth': 1 } )\nbool = ( obj.a.b === out[ 'a.b' ] )\n\n// Set the `delimiter` option:\nobj = { 'a': { 'b': { 'c': 'd' } } };\nout = flattenObject( obj, { 'delimiter': '-|-' } )\n\n// Flatten arrays:\nobj = { 'a': { 'b': [ 1, 2, 3 ] } };\nout = flattenObject( obj, { 'flattenArrays': true } )\n",
	"FLOAT16_EPS": "FLOAT16_EPS\n",
	"FLOAT16_EXPONENT_BIAS": "FLOAT16_EXPONENT_BIAS\n",
	"FLOAT16_MAX": "FLOAT16_MAX\n",
	"FLOAT16_MAX_SAFE_INTEGER": "FLOAT16_MAX_SAFE_INTEGER\n",
	"FLOAT16_MIN_SAFE_INTEGER": "FLOAT16_MIN_SAFE_INTEGER\n",
	"FLOAT16_NINF": "FLOAT16_NINF\n",
	"FLOAT16_NUM_BYTES": "FLOAT16_NUM_BYTES\n",
	"FLOAT16_PINF": "FLOAT16_PINF\n",
	"FLOAT16_PRECISION": "FLOAT16_PRECISION\n",
	"FLOAT16_SMALLEST_NORMAL": "FLOAT16_SMALLEST_NORMAL\n",
	"FLOAT16_SMALLEST_SUBNORMAL": "FLOAT16_SMALLEST_SUBNORMAL\n",
	"FLOAT16_SQRT_EPS": "FLOAT16_SQRT_EPS\n",
	"Float32Array": "arr = new Float32Array()\n",
	"FLOAT32_EPS": "FLOAT32_EPS\n",
	"FLOAT32_EXPONENT_BIAS": "FLOAT32_EXPONENT_BIAS\n",
	"FLOAT32_MAX": "FLOAT32_MAX\n",
	"FLOAT32_MAX_SAFE_INTEGER": "FLOAT32_MAX_SAFE_INTEGER\n",
	"FLOAT32_MIN_SAFE_INTEGER": "FLOAT32_MIN_SAFE_INTEGER\n",
	"FLOAT32_NINF": "FLOAT32_NINF\n",
	"FLOAT32_NUM_BYTES": "FLOAT32_NUM_BYTES\n",
	"FLOAT32_PINF": "FLOAT32_PINF\n",
	"FLOAT32_PRECISION": "FLOAT32_PRECISION\n",
	"FLOAT32_SMALLEST_NORMAL": "FLOAT32_SMALLEST_NORMAL\n",
	"FLOAT32_SMALLEST_SUBNORMAL": "FLOAT32_SMALLEST_SUBNORMAL\n",
	"FLOAT32_SQRT_EPS": "FLOAT32_SQRT_EPS\n",
	"Float64Array": "arr = new Float64Array()\n",
	"FLOAT64_EXPONENT_BIAS": "FLOAT64_EXPONENT_BIAS\n",
	"FLOAT64_HIGH_WORD_EXPONENT_MASK": "FLOAT64_HIGH_WORD_EXPONENT_MASK\nbase.toBinaryStringUint32( FLOAT64_HIGH_WORD_EXPONENT_MASK )\n",
	"FLOAT64_HIGH_WORD_SIGNIFICAND_MASK": "FLOAT64_HIGH_WORD_SIGNIFICAND_MASK\nbase.toBinaryStringUint32( FLOAT64_HIGH_WORD_SIGNIFICAND_MASK )\n",
	"FLOAT64_MAX": "FLOAT64_MAX\n",
	"FLOAT64_MAX_BASE10_EXPONENT": "FLOAT64_MAX_BASE10_EXPONENT\n",
	"FLOAT64_MAX_BASE10_EXPONENT_SUBNORMAL": "FLOAT64_MAX_BASE10_EXPONENT_SUBNORMAL\n",
	"FLOAT64_MAX_BASE2_EXPONENT": "FLOAT64_MAX_BASE2_EXPONENT\n",
	"FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL": "FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL\n",
	"FLOAT64_MAX_LN": "FLOAT64_MAX_LN\n",
	"FLOAT64_MAX_SAFE_FIBONACCI": "FLOAT64_MAX_SAFE_FIBONACCI\n",
	"FLOAT64_MAX_SAFE_INTEGER": "FLOAT64_MAX_SAFE_INTEGER\n",
	"FLOAT64_MAX_SAFE_LUCAS": "FLOAT64_MAX_SAFE_LUCAS\n",
	"FLOAT64_MAX_SAFE_NTH_FIBONACCI": "FLOAT64_MAX_SAFE_NTH_FIBONACCI\n",
	"FLOAT64_MAX_SAFE_NTH_LUCAS": "FLOAT64_MAX_SAFE_NTH_LUCAS\n",
	"FLOAT64_MIN_BASE10_EXPONENT": "FLOAT64_MIN_BASE10_EXPONENT\n",
	"FLOAT64_MIN_BASE10_EXPONENT_SUBNORMAL": "FLOAT64_MIN_BASE10_EXPONENT_SUBNORMAL\n",
	"FLOAT64_MIN_BASE2_EXPONENT": "FLOAT64_MIN_BASE2_EXPONENT\n",
	"FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL": "FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL\n",
	"FLOAT64_MIN_LN": "FLOAT64_MIN_LN\n",
	"FLOAT64_MIN_SAFE_INTEGER": "FLOAT64_MIN_SAFE_INTEGER\n",
	"FLOAT64_NUM_BYTES": "FLOAT64_NUM_BYTES\n",
	"FLOAT64_PRECISION": "FLOAT64_PRECISION\n",
	"FLOAT64_SMALLEST_NORMAL": "FLOAT64_SMALLEST_NORMAL\n",
	"FLOAT64_SMALLEST_SUBNORMAL": "FLOAT64_SMALLEST_SUBNORMAL\n",
	"forEach": "function logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, 2, 3, 4 ];\nforEach( arr, logger )\n",
	"forEachAsync": "\n// Basic usage:\nfunction onDuration( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next();\n  }\n};\nfunction done( error ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( 'Done.' );\n};\narr = [ 3000, 2500, 1000 ];\nforEachAsync( arr, onDuration, done )\n\n// Limit number of concurrent invocations:\nfunction onDuration( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next();\n  }\n};\nfunction done( error ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( 'Done.' );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\nforEachAsync( arr, opts, onDuration, done )\n\n// Process sequentially:\nfunction onDuration( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next();\n  }\n};\nfunction done( error ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( 'Done.' );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\nforEachAsync( arr, opts, onDuration, done )\n",
	"forEachRight": "function logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, 2, 3, 4 ];\nforEachRight( arr, logger )\n",
	"forEachRightAsync": "\n// Basic usage:\nfunction onDuration( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next();\n  }\n};\nfunction done( error ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( 'Done.' );\n};\narr = [ 1000, 2500, 3000 ];\nforEachRightAsync( arr, onDuration, done )\n\n// Limit number of concurrent invocations:\nfunction onDuration( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next();\n  }\n};\nfunction done( error ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( 'Done.' );\n};\nopts = { 'limit': 2 };\narr = [ 1000, 2500, 3000 ];\nforEachRightAsync( arr, opts, onDuration, done )\n\n// Process sequentially:\nfunction onDuration( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next();\n  }\n};\nfunction done( error ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( 'Done.' );\n};\nopts = { 'series': true };\narr = [ 1000, 2500, 3000 ];\nforEachRightAsync( arr, opts, onDuration, done )\n",
	"forIn": "function logger( v, k ) { console.log( '%s: %d', k, v ); };\nfunction Foo() { return this; };\nFoo.prototype.beep = 'boop';\nobj = new Foo();\nforIn( obj, logger )\n",
	"forOwn": "function logger( v, k ) { console.log( '%s: %d', k, v ); };\nobj = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };\nforOwn( obj, logger )\n",
	"FOURTH_PI": "FOURTH_PI\n",
	"FOURTH_ROOT_EPS": "FOURTH_ROOT_EPS\n",
	"FRB_SF_WAGE_RIGIDITY": "data = FRB_SF_WAGE_RIGIDITY()\n",
	"fromCodePoint": "out = fromCodePoint( 9731 )\nout = fromCodePoint( [ 9731 ] )\nout = fromCodePoint( 97, 98, 99 )\nout = fromCodePoint( [ 97, 98, 99 ] )\n",
	"functionName": "v = functionName( String )\nv = functionName( function foo(){} )\nv = functionName( function(){} )\n",
	"functionSequence": "function a( x ) { return 2 * x; };\nfunction b( x ) { return x + 3; };\nfunction c( x ) { return x / 5; };\nf = functionSequence( a, b, c );\nz = f( 6 )\n",
	"functionSequenceAsync": "function a( x, next ) {\n   setTimeout( onTimeout, 0 );\n   function onTimeout() {\n     next( null, 2*x );\n   }\n};\nfunction b( x, next ) {\n   setTimeout( onTimeout, 0 );\n   function onTimeout() {\n     next( null, x+3 );\n   }\n};\nfunction c( x, next ) {\n   setTimeout( onTimeout, 0 );\n   function onTimeout() {\n     next( null, x/5 );\n   }\n};\nf = functionSequenceAsync( a, b, c );\nfunction done( error, result ) {\n   if ( error ) {\n     throw error;\n   }\n   console.log( result );\n};\nf( 6, done )\n",
	"GAMMA_LANCZOS_G": "GAMMA_LANCZOS_G\n",
	"getPrototypeOf": "proto = getPrototypeOf( {} )\n",
	"getuid": "uid = getuid();\n",
	"GLAISHER": "GLAISHER\n",
	"group": "collection = [ 'beep', 'boop', 'foo', 'bar' ];\ngroups = [ 'b', 'b', 'f', 'b' ];\nout = group( collection, groups )\ngroups = [ 1, 1, 2, 1 ];\nout = group( collection, groups )\n\n// Output group results as indices:\ngroups = [ 'b', 'b', 'f', 'b' ];\nopts = { 'returns': 'indices' };\nout = group( collection, opts, groups )\n\n// Output group results as index-element pairs:\nopts = { 'returns': '*' };\nout = group( collection, opts, groups )\n",
	"groupBy": "function indicator( v ) {\n  if ( v[ 0 ] === 'b' ) {\n      return 'b';\n  }\n  return 'other';\n};\ncollection = [ 'beep', 'boop', 'foo', 'bar' ];\nout = groupBy( collection, indicator )\n\n// Output group results as indices:\nopts = { 'returns': 'indices' };\nout = groupBy( collection, opts, indicator )\n\n// Output group results as index-value pairs:\nopts = { 'returns': '*' };\nout = groupBy( collection, opts, indicator )\n",
	"groupByAsync": "\n// Basic usage:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\narr = [ 3000, 2500, 1000 ];\ngroupByAsync( arr, indicator, done )\n\n// Output group results as indices:\nopts = { 'returns': 'indices' };\ngroupByAsync( arr, opts, indicator, done )\n\n// Output group results as index-value pairs:\nopts = { 'returns': '*' };\ngroupByAsync( arr, opts, indicator done )\n\n// Limit number of concurrent invocations:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\ngroupByAsync( arr, opts, indicator, done )\n\n// Process sequentially:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\ngroupByAsync( arr, opts, indicator, done )\n",
	"groupIn": "function indicator( v ) {\n  if ( v[ 0 ] === 'b' ) {\n      return 'b';\n  }\n  return 'other';\n};\nfunction Foo() { this.a = 'beep'; this.b = 'boop'; return this; };\nFoo.prototype = Object.create( null );\nFoo.prototype.c = 'foo';\nFoo.prototype.d = 'bar';\nobj = new Foo();\nout = groupIn( obj, indicator )\n\n// Output group results as keys:\nopts = { 'returns': 'keys' };\nout = groupIn( obj, opts, indicator )\n\n// Output group results as key-value pairs:\nopts = { 'returns': '*' };\nout = groupIn( obj, opts, indicator )\n",
	"groupOwn": "function indicator( v ) {\n  if ( v[ 0 ] === 'b' ) {\n      return 'b';\n  }\n  return 'other';\n};\nobj = { 'a': 'beep', 'b': 'boop', 'c': 'foo', 'd': 'bar' };\nout = groupOwn( obj, indicator )\n\n// Output group results as keys:\nopts = { 'returns': 'keys' };\nout = groupOwn( obj, opts, indicator )\n\n// Output group results as key-value pairs:\nopts = { 'returns': '*' };\nout = groupOwn( obj, opts, indicator )\n",
	"HALF_LN2": "HALF_LN2\n",
	"HALF_PI": "HALF_PI\n",
	"hasClassSupport": "bool = hasClassSupport()\n",
	"hasFloat32ArraySupport": "bool = hasFloat32ArraySupport()\n",
	"hasFloat64ArraySupport": "bool = hasFloat64ArraySupport()\n",
	"hasFunctionNameSupport": "bool = hasFunctionNameSupport()\n",
	"hasGeneratorSupport": "bool = hasGeneratorSupport()\n",
	"hasInt16ArraySupport": "bool = hasInt16ArraySupport()\n",
	"hasInt32ArraySupport": "bool = hasInt32ArraySupport()\n",
	"hasInt8ArraySupport": "bool = hasInt8ArraySupport()\n",
	"hasMapSupport": "bool = hasMapSupport()\n",
	"hasOwnProp": "beep = { 'boop': true };\nbool = hasOwnProp( beep, 'boop' )\nbool = hasOwnProp( beep, 'bop' )\n",
	"hasProp": "beep = { 'boop': true };\nbool = hasProp( beep, 'boop' )\nbool = hasProp( beep, 'toString' )\nbool = hasProp( beep, 'bop' )\n",
	"hasPrototype": "function Foo() { return this; };\nfunction Bar() { return this; };\ninherit( Bar, Foo );\nbar = new Bar();\nbool = hasPrototype( bar, Foo.prototype )\n",
	"hasProxySupport": "bool = hasProxySupport()\n",
	"hasSetSupport": "bool = hasSetSupport()\n",
	"hasSymbolSupport": "bool = hasSymbolSupport()\n",
	"hasToStringTagSupport": "bool = hasToStringTagSupport()\n",
	"hasUint16ArraySupport": "bool = hasUint16ArraySupport()\n",
	"hasUint32ArraySupport": "bool = hasUint32ArraySupport()\n",
	"hasUint8ArraySupport": "bool = hasUint8ArraySupport()\n",
	"hasUint8ClampedArraySupport": "bool = hasUint8ClampedArraySupport()\n",
	"hasWeakMapSupport": "bool = hasWeakMapSupport()\n",
	"hasWeakSetSupport": "bool = hasWeakSetSupport()\n",
	"hasWebAssemblySupport": "bool = hasWebAssemblySupport()\n",
	"HOURS_IN_DAY": "days = 3.14;\nhrs = days * HOURS_IN_DAY\n",
	"HOURS_IN_WEEK": "wkrs = 3.14;\nhrs = wks * HOURS_IN_WEEK\n",
	"hoursInMonth": "num = hoursInMonth()\nnum = hoursInMonth( 2 )\nnum = hoursInMonth( 2, 2016 )\nnum = hoursInMonth( 2, 2017 )\n\n// Other ways to supply month:\nnum = hoursInMonth( 'feb', 2016 )\nnum = hoursInMonth( 'february', 2016 )\n",
	"hoursInYear": "num = hoursInYear()\nnum = hoursInYear( 2016 )\nnum = hoursInYear( 2017 )\n",
	"httpServer": "\n// Basic usage:\ncreateServer = httpServer()\n\n// Provide a request callback:\nfunction onRequest( request, response ) {\nconsole.log( request.url );\nresponse.end( 'OK' );\n};\ncreateServer = httpServer( onRequest )\n\n// Specify a specific port:\nopts = { 'port': 7331 };\ncreateServer = httpServer( opts )\n",
	"identity": "v = identity( 3.14 )\n",
	"ifelse": "z = ifelse( true, 1.0, -1.0 )\nz = ifelse( false, 1.0, -1.0 )\n",
	"ifelseAsync": "function predicate( clbk ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      clbk( null, true );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nifelseAsync( predicate, 'beep', 'boop', done )\n",
	"ifthen": "function x() { return 1.0; };\nfunction y() { return -1.0; };\nz = ifthen( true, x, y )\nz = ifthen( false, x, y )\n",
	"ifthenAsync": "function predicate( clbk ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      clbk( null, false );\n  }\n};\nfunction x( clbk ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      clbk( null, 'beep' );\n  }\n};\nfunction y( clbk ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      clbk( null, 'boop' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nifthenAsync( predicate, x, y, done )\n",
	"imag": "z = new Complex128( 5.0, 3.0 );\nim = imag( z )\n",
	"IMG_ACANTHUS_MOLLIS": "img = IMG_ACANTHUS_MOLLIS()\n",
	"IMG_AIRPLANE_FROM_ABOVE": "img = IMG_AIRPLANE_FROM_ABOVE()\n",
	"IMG_ALLIUM_OREOPHILUM": "img = IMG_ALLIUM_OREOPHILUM()\n",
	"IMG_BLACK_CANYON": "img = IMG_BLACK_CANYON()\n",
	"IMG_DUST_BOWL_HOME": "img = IMG_DUST_BOWL_HOME()\n",
	"IMG_FRENCH_ALPINE_LANDSCAPE": "img = IMG_FRENCH_ALPINE_LANDSCAPE()\n",
	"IMG_LOCOMOTION_HOUSE_CAT": "img = IMG_LOCOMOTION_HOUSE_CAT()\n",
	"IMG_LOCOMOTION_NUDE_MALE": "img = IMG_LOCOMOTION_NUDE_MALE()\n",
	"IMG_MARCH_PASTORAL": "img = IMG_MARCH_PASTORAL()\n",
	"IMG_NAGASAKI_BOATS": "img = IMG_NAGASAKI_BOATS()\n",
	"incrspace": "arr = incrspace( 0, 11, 2 )\n",
	"indexOf": "\n// Basic usage:\narr = [ 4, 3, 2, 1 ];\nidx = indexOf( arr, 3 );\narr = [ 4, 3, 2, 1 ];\nidx = indexOf( arr, 5 );\n\n// Using a `fromIndex`:\narr = [ 1, 2, 3, 4, 5, 2, 6 ];\nidx = indexOf( arr, 2, 3 )\n\n// `fromIndex` which exceeds `array` length:\narr = [ 1, 2, 3, 4, 2, 5 ];\nidx = indexOf( arr, 2, 10 )\n\n// Negative `fromIndex`:\narr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];\nidx = indexOf( arr, 2, -4 )\nidx = indexOf( arr, 2, -1 )\n\n// Negative `fromIndex` exceeding input `array` length:\narr = [ 1, 2, 3, 4, 5, 2, 6 ];\nidx = indexOf( arr, 2, -10 )\n\n// Array-like objects:\nstr = 'bebop';\nidx = indexOf( str, 'o' )\n",
	"inherit": "\n// Create a parent constructor:\nfunction Foo() { return this; };\nFoo.prototype.beep = function beep() { return 'boop'; };\n\n// Create a child constructor:\nfunction Bar() { Foo.call( this ); return this; };\n\n// Setup inheritance:\ninherit( Bar, Foo );\nbar = new Bar();\nv = bar.beep()\n",
	"inmap": "function foo( v, i ) { return v * i; };\narr = [ 1.0, 2.0, 3.0 ];\nout = inmap( arr, foo )\nbool = ( out === arr )\n",
	"inmapAsync": "\n// Basic usage:\nfunction fcn( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, value*index );\n  }\n};\nfunction done( error, collection ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( collection === arr );\n  console.log( collection );\n};\narr = [ 3000, 2500, 1000 ];\ninmapAsync( arr, fcn, done )\n\n// Limit number of concurrent invocations:\nfunction fcn( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, value*index );\n  }\n};\nfunction done( error, collection ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( collection === arr );\n  console.log( collection );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\ninmapAsync( arr, opts, fcn, done )\n\n// Process sequentially:\nfunction fcn( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, value*index );\n  }\n};\nfunction done( error, collection ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( collection === arr );\n  console.log( collection );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\ninmapAsync( arr, opts, fcn, done )\n",
	"inmapRight": "function foo( v, i ) { console.log( '%s: %d', i, v ); return v * i; };\narr = [ 1.0, 2.0, 3.0 ];\nout = inmapRight( arr, foo )\nbool = ( out === arr )\n",
	"inmapRightAsync": "\n// Basic usage:\nfunction fcn( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, value*index );\n  }\n};\nfunction done( error, collection ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( collection === arr );\n  console.log( collection );\n};\narr = [ 1000, 2500, 3000 ];\ninmapRightAsync( arr, fcn, done )\n\n// Limit number of concurrent invocations:\nfunction fcn( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, value*index );\n  }\n};\nfunction done( error, collection ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( collection === arr );\n  console.log( collection );\n};\nopts = { 'limit': 2 };\narr = [ 1000, 2500, 3000 ];\ninmapRightAsync( arr, opts, fcn, done )\n\n// Process sequentially:\nfunction fcn( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, value*index );\n  }\n};\nfunction done( error, collection ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( collection === arr );\n  console.log( collection );\n};\nopts = { 'series': true };\narr = [ 1000, 2500, 3000 ];\ninmapRightAsync( arr, opts, fcn, done )\n",
	"instanceOf": "bool = instanceOf( [], Array )\nbool = instanceOf( {}, Object )\nbool = instanceOf( null, Object )\n",
	"Int16Array": "arr = new Int16Array()\n",
	"INT16_MAX": "INT16_MAX\n",
	"INT16_MIN": "INT16_MIN\n",
	"INT16_NUM_BYTES": "INT16_NUM_BYTES\n",
	"Int32Array": "arr = new Int32Array()\n",
	"INT32_MAX": "INT32_MAX\n",
	"INT32_MIN": "INT32_MIN\n",
	"INT32_NUM_BYTES": "INT32_NUM_BYTES\n",
	"Int8Array": "arr = new Int8Array()\n",
	"INT8_MAX": "INT8_MAX\n",
	"INT8_MIN": "INT8_MIN\n",
	"INT8_NUM_BYTES": "INT8_NUM_BYTES\n",
	"isAbsolutePath": "\n// Windows environment:\nbool = isAbsolutePath( 'C:\\\\foo\\\\bar\\\\baz' )\n\n// POSIX environment:\nbool = isAbsolutePath( '/foo/bar/baz' )\n",
	"isAlphagram": "out = isAlphagram( 'beep' )\nout = isAlphagram( 'zba' )\nout = isAlphagram( '' )\n",
	"isAnagram": "str1 = 'I am a weakish speller';\nstr2 = 'William Shakespeare';\nbool = isAnagram( str1, str2 )\nbool = isAnagram( 'bat', 'tabba' )\n",
	"isArguments": "function foo() { return arguments; };\nbool = isArguments( foo() )\nbool = isArguments( [] )\n",
	"isArray": "bool = isArray( [] )\nbool = isArray( {} )\n",
	"isArrayArray": "bool = isArrayArray( [ [], [] ] )\nbool = isArrayArray( [ {}, {} ] )\nbool = isArrayArray( [] )\n",
	"isArrayBuffer": "bool = isArrayBuffer( new ArrayBuffer( 10 ) )\nbool = isArrayBuffer( [] )\n",
	"isArrayLength": "bool = isArrayLength( 5 )\nbool = isArrayLength( 2.0e200 )\nbool = isArrayLength( -3.14 )\nbool = isArrayLength( null )\n",
	"isArrayLike": "bool = isArrayLike( [] )\nbool = isArrayLike( { 'length': 10 } )\nbool = isArrayLike( 'beep' )\nbool = isArrayLike( null )\n",
	"isArrayLikeObject": "bool = isArrayLikeObject( [] )\nbool = isArrayLikeObject( { 'length': 10 } )\nbool = isArrayLikeObject( 'beep' )\n",
	"isASCII": "str = 'beep boop';\nbool = isASCII( str )\nbool = isASCII( fromCodePoint( 130 ) )\n",
	"isBetween": "bool = isBetween( 3.14, 3.0, 4.0 )\nbool = isBetween( 3.0, 3.0, 4.0 )\nbool = isBetween( 4.0, 3.0, 4.0 )\nbool = isBetween( 3.0, 3.14, 4.0 )\nbool = isBetween( 3.14, 3.14, 4.0, 'open', 'closed' )\nbool = isBetween( 3.14, 3.0, 3.14, 'closed', 'open' )\n",
	"isBetweenArray": "arr = [ 3.0, 3.14, 4.0 ];\nbool = isBetweenArray( arr, 3.0, 4.0 )\nbool = isBetweenArray( arr, 3.14, 4.0 )\nbool = isBetweenArray( arr, 3.0, 3.14 )\nbool = isBetweenArray( arr, 3.0, 4.0, 'open', 'closed' )\nbool = isBetweenArray( arr, 3.0, 4.0, 'closed', 'open' )\n",
	"isBinaryString": "bool = isBinaryString( '1000101' )\nbool = isBinaryString( 'beep' )\nbool = isBinaryString( '' )\n",
	"isBoolean": "bool = isBoolean( false )\nbool = isBoolean( new Boolean( false ) )\n",
	"isBooleanArray": "bool = isBooleanArray( [ true, false, true ] )\nbool = isBooleanArray( [ true, 'abc', false ] )\n",
	"isBuffer": "bool = isBuffer( new Buffer( 'beep' ) )\nbool = isBuffer( new Buffer( [ 1, 2, 3, 4 ] ) )\nbool = isBuffer( {} )\nbool = isBuffer( [] )\n",
	"isCapitalized": "bool = isCapitalized( 'Hello' )\nbool = isCapitalized( 'world' )\n",
	"isCollection": "bool = isCollection( [] )\nbool = isCollection( { 'length': 0 } )\nbool = isCollection( {} )\n",
	"isDateObject": "bool = isDateObject( new Date() )\nbool = isDateObject( '2017-01-01' )\n",
	"isDigitString": "bool = isDigitString( '0123456789' )\nbool = isDigitString( 'abcdef' )\nbool = isDigitString( '0xff' )\nbool = isDigitString( '' )\n",
	"isEmailAddress": "bool = isEmailAddress( 'beep@boop.com' )\nbool = isEmailAddress( 'beep' )\nbool = isEmailAddress( null )\n",
	"isEmptyArray": "bool = isEmptyArray( [] )\nbool = isEmptyArray( [ 1, 2, 3 ] )\nbool = isEmptyArray( {} )\n",
	"isEmptyObject": "bool = isEmptyObject( {} )\nbool = isEmptyObject( { 'beep': 'boop' } )\nbool = isEmptyObject( [] )\n",
	"isEmptyString": "bool = isEmptyString( '' )\nbool = isEmptyString( new String( '' ) )\nbool = isEmptyString( 'beep' )\nbool = isEmptyString( [] )\n",
	"isEnumerableProperty": "beep = { 'boop': true };\nbool = isEnumerableProperty( beep, 'boop' )\nbool = isEnumerableProperty( beep, 'hasOwnProperty' )\n",
	"isError": "bool = isError( new Error( 'beep' ) )\nbool = isError( {} )\n",
	"isEvalError": "bool = isEvalError( new EvalError( 'beep' ) )\nbool = isEvalError( {} )\n",
	"isEven": "bool = isEven( 4.0 )\nbool = isEven( new Number( 4.0 ) )\nbool = isEven( 3.0 )\nbool = isEven( -3.14 )\nbool = isEven( null )\n",
	"isFalsy": "bool = isFalsy( false )\nbool = isFalsy( '' )\nbool = isFalsy( 0 )\nbool = isFalsy( null )\nbool = isFalsy( void 0 )\nbool = isFalsy( NaN )\nbool = isFalsy( {} )\nbool = isFalsy( [] )\n",
	"isFalsyArray": "bool = isFalsyArray( [ null, '' ] )\nbool = isFalsyArray( [ {}, [] ] )\nbool = isFalsyArray( [] )\n",
	"isFinite": "bool = isFinite( 5.0 )\nbool = isFinite( new Number( 5.0 ) )\nbool = isFinite( 1.0/0.0 )\nbool = isFinite( null )\n",
	"isFiniteArray": "bool = isFiniteArray( [ -3.0, new Number(0.0), 2.0 ] )\nbool = isFiniteArray( [ -3.0, 1.0/0.0 ] )\n",
	"isFloat32Array": "bool = isFloat32Array( new Float32Array( 10 ) )\nbool = isFloat32Array( [] )\n",
	"isFloat64Array": "bool = isFloat64Array( new Float64Array( 10 ) )\nbool = isFloat64Array( [] )\n",
	"isFunction": "function beep() {};\nbool = isFunction( beep )\nbool = isFunction( {} )\n",
	"isFunctionArray": "function beep() {};\nfunction boop() {};\nbool = isFunctionArray( [ beep, boop ] )\nbool = isFunctionArray( [ {}, beep ] )\nbool = isFunctionArray( [] )\n",
	"isHexString": "bool = isHexString( '0123456789abcdefABCDEF' )\nbool = isHexString( '0xffffff' )\nbool = isHexString( 'x' )\nbool = isHexString( '' )\n",
	"isInfinite": "bool = isInfinite( 1.0/0.0 )\nbool = isInfinite( new Number( -1.0/0.0 ) )\nbool = isInfinite( 5.0 )\nbool = isInfinite( '1.0/0.0' )\n",
	"isInt16Array": "bool = isInt16Array( new Int16Array( 10 ) )\nbool = isInt16Array( [] )\n",
	"isInt32Array": "bool = isInt32Array( new Int32Array( 10 ) )\nbool = isInt32Array( [] )\n",
	"isInt8Array": "bool = isInt8Array( new Int8Array( 10 ) )\nbool = isInt8Array( [] )\n",
	"isInteger": "bool = isInteger( 5.0 )\nbool = isInteger( new Number( 5.0 ) )\nbool = isInteger( -3.14 )\nbool = isInteger( null )\n",
	"isIntegerArray": "bool = isIntegerArray( [ -3.0, new Number(0.0), 2.0 ] )\nbool = isIntegerArray( [ -3.0, '3.0' ] )\n",
	"isJSON": "bool = isJSON( '{\"a\":5}' )\nbool = isJSON( '{a\":5}' )\n",
	"isLeapYear": "bool = isLeapYear( new Date() )\nbool = isLeapYear( 1996 )\nbool = isLeapYear( 2001 )\n",
	"isLowercase": "bool = isLowercase( 'hello' )\nbool = isLowercase( 'World' )\n",
	"isnan": "bool = isnan( NaN )\nbool = isnan( new Number( NaN ) )\nbool = isnan( 3.14 )\nbool = isnan( null )\n",
	"isNaNArray": "bool = isNaNArray( [ NaN, NaN, NaN ] )\nbool = isNaNArray( [ NaN, 2 ] )\n",
	"isNativeFunction": "bool = isNativeFunction( Date )\nfunction beep() {};\nbool = isNativeFunction( beep )\nbool = isNativeFunction( {} )\n",
	"isNegativeInteger": "bool = isNegativeInteger( -5.0 )\nbool = isNegativeInteger( new Number( -5.0 ) )\nbool = isNegativeInteger( 5.0 )\nbool = isNegativeInteger( -3.14 )\nbool = isNegativeInteger( null )\n",
	"isNegativeIntegerArray": "bool = isNegativeIntegerArray( [ -3.0, new Number(-3.0) ] )\nbool = isNegativeIntegerArray( [ -3.0, '-3.0' ] )\n",
	"isNegativeNumber": "bool = isNegativeNumber( -5.0 )\nbool = isNegativeNumber( new Number( -5.0 ) )\nbool = isNegativeNumber( -3.14 )\nbool = isNegativeNumber( 5.0 )\nbool = isNegativeNumber( null )\n",
	"isNegativeNumberArray": "bool = isNegativeNumberArray( [ -3.0, new Number(-3.0) ] )\nbool = isNegativeNumberArray( [ -3.0, '-3.0' ] )\n",
	"isNegativeZero": "bool = isNegativeZero( -0.0 )\nbool = isNegativeZero( new Number( -0.0 ) )\nbool = isNegativeZero( -3.14 )\nbool = isNegativeZero( 0.0 )\nbool = isNegativeZero( null )\n",
	"isNodeDuplexStreamLike": "Stream = require( 'stream' ).Duplex;\ns = new Stream();\nbool = isNodeDuplexStreamLike( s )\nbool = isNodeDuplexStreamLike( {} )\n",
	"isNodeReadableStreamLike": "Stream = require( 'stream' ).Readable;\ns = new Stream();\nbool = isNodeReadableStreamLike( s )\nbool = isNodeReadableStreamLike( {} )\n",
	"isNodeREPL": "bool = isNodeREPL()\n",
	"isNodeStreamLike": "Stream = require( 'stream' ).Stream;\ns = new Stream();\nbool = isNodeStreamLike( s )\nbool = isNodeStreamLike( {} )\n",
	"isNodeTransformStreamLike": "Stream = require( 'stream' ).Transform;\ns = new Stream();\nbool = isNodeTransformStreamLike( s )\nbool = isNodeTransformStreamLike( {} )\n",
	"isNodeWritableStreamLike": "Stream = require( 'stream' ).Writable;\ns = new Stream();\nbool = isNodeWritableStreamLike( s )\nbool = isNodeWritableStreamLike( {} )\n",
	"isNonNegativeInteger": "bool = isNonNegativeInteger( 5.0 )\nbool = isNonNegativeInteger( new Number( 5.0 ) )\nbool = isNonNegativeInteger( 3.14 )\nbool = isNonNegativeInteger( -5.0 )\nbool = isNonNegativeInteger( null )\n",
	"isNonNegativeIntegerArray": "bool = isNonNegativeIntegerArray( [ 3.0, new Number(3.0) ] )\nbool = isNonNegativeIntegerArray( [ 3.0, '3.0' ] )\n",
	"isNonNegativeNumber": "bool = isNonNegativeNumber( 5.0 )\nbool = isNonNegativeNumber( new Number( 5.0 ) )\nbool = isNonNegativeNumber( 3.14 )\nbool = isNonNegativeNumber( -5.0 )\nbool = isNonNegativeNumber( null )\n",
	"isNonNegativeNumberArray": "bool = isNonNegativeNumberArray( [ 3.0, new Number(3.0) ] )\nbool = isNonNegativeNumberArray( [ 3.0, '3.0' ] )\n",
	"isNonPositiveInteger": "bool = isNonPositiveInteger( -5.0 )\nbool = isNonPositiveInteger( new Number( -5.0 ) )\nbool = isNonPositiveInteger( 5.0 )\nbool = isNonPositiveInteger( -3.14 )\nbool = isNonPositiveInteger( null )\n",
	"isNonPositiveIntegerArray": "bool = isNonPositiveIntegerArray( [ -3.0, new Number(-3.0) ] )\nbool = isNonPositiveIntegerArray( [ -3.0, '-3.0' ] )\n",
	"isNonPositiveNumber": "bool = isNonPositiveNumber( -5.0 )\nbool = isNonPositiveNumber( new Number( -5.0 ) )\nbool = isNonPositiveNumber( -3.14 )\nbool = isNonPositiveNumber( 5.0 )\nbool = isNonPositiveNumber( null )\n",
	"isNonPositiveNumberArray": "bool = isNonPositiveNumberArray( [ -3.0, new Number(-3.0) ] )\nbool = isNonPositiveNumberArray( [ -3.0, '-3.0' ] )\n",
	"isNull": "bool = isNull( null )\nbool = isNull( true )\n",
	"isNullArray": "bool = isNullArray( [ null, null, null ] )\nbool = isNullArray( [ NaN, 2, null ] )\n",
	"isNumber": "bool = isNumber( 3.14 )\nbool = isNumber( new Number( 3.14 ) )\nbool = isNumber( NaN )\nbool = isNumber( null )\n",
	"isNumberArray": "bool = isNumberArray( [ 1, 2, 3 ] )\nbool = isNumberArray( [ '1', 2, 3 ] )\n",
	"isNumericArray": "bool = isNumericArray( new Int8Array( 10 ) )\nbool = isNumericArray( [ 1, 2, 3 ] )\nbool = isNumericArray( [ '1', '2', '3' ] )\n",
	"isObject": "bool = isObject( {} )\nbool = isObject( true )\n",
	"isObjectArray": "bool = isObjectArray( [ {}, new Number(3.0) ] )\nbool = isObjectArray( [ {}, { 'beep': 'boop' } ] )\nbool = isObjectArray( [ {}, '3.0' ] )\n",
	"isObjectLike": "bool = isObjectLike( {} )\nbool = isObjectLike( [] )\nbool = isObjectLike( null )\n",
	"isOdd": "bool = isOdd( 5.0 )\nbool = isOdd( new Number( 5.0 ) )\nbool = isOdd( 4.0 )\nbool = isOdd( new Number( 4.0 ) )\nbool = isOdd( -3.14 )\nbool = isOdd( null )\n",
	"isoWeeksInYear": "num = isoWeeksInYear()\nnum = isoWeeksInYear( 2015 )\nnum = isoWeeksInYear( 2017 )\n",
	"isPlainObject": "bool = isPlainObject( {} )\nbool = isPlainObject( null )\n",
	"isPlainObjectArray": "bool = isPlainObjectArray( [ {}, { 'beep': 'boop' } ] )\nbool = isPlainObjectArray( [ {}, new Number(3.0) ] )\nbool = isPlainObjectArray( [ {}, '3.0' ] )\n",
	"isPositiveInteger": "bool = isPositiveInteger( 5.0 )\nbool = isPositiveInteger( new Number( 5.0 ) )\nbool = isPositiveInteger( 3.14 )\nbool = isPositiveInteger( -5.0 )\nbool = isPositiveInteger( null )\n",
	"isPositiveIntegerArray": "bool = isPositiveIntegerArray( [ 3.0, new Number(3.0) ] )\nbool = isPositiveIntegerArray( [ 3.0, '3.0' ] )\n",
	"isPositiveNumber": "bool = isPositiveNumber( 5.0 )\nbool = isPositiveNumber( new Number( 5.0 ) )\nbool = isPositiveNumber( 3.14 )\nbool = isPositiveNumber( -5.0 )\nbool = isPositiveNumber( null )\n",
	"isPositiveNumberArray": "bool = isPositiveNumberArray( [ 3.0, new Number(3.0) ] )\nbool = isPositiveNumberArray( [ 3.0, '3.0' ] )\n",
	"isPositiveZero": "bool = isPositiveZero( 0.0 )\nbool = isPositiveZero( new Number( 0.0 ) )\nbool = isPositiveZero( -3.14 )\nbool = isPositiveZero( -0.0 )\nbool = isPositiveZero( null )\n",
	"isPrimitive": "bool = isPrimitive( true )\nbool = isPrimitive( {} )\n",
	"isPrimitiveArray": "bool = isPrimitiveArray( [ '3', 2, null ] )\nbool = isPrimitiveArray( [ {}, 2, 1 ] )\nbool = isPrimitiveArray( [ new String('abc'), '3.0' ] )\n",
	"isProbability": "bool = isProbability( 0.5 )\nbool = isProbability( new Number( 0.5 ) )\nbool = isProbability( 3.14 )\nbool = isProbability( -5.0 )\nbool = isProbability( null )\n",
	"isProbabilityArray": "bool = isProbabilityArray( [ 0.5, new Number(0.8) ] )\nbool = isProbabilityArray( [ 0.8, 1.2 ] )\nbool = isProbabilityArray( [ 0.8, '0.2' ] )\n",
	"isRangeError": "bool = isRangeError( new RangeError( 'beep' ) )\nbool = isRangeError( {} )\n",
	"isReferenceError": "bool = isReferenceError( new ReferenceError( 'beep' ) )\nbool = isReferenceError( {} )\n",
	"isRegExp": "bool = isRegExp( /\\.+/ )\nbool = isRegExp( {} )\n",
	"isRegExpString": "bool = isRegExpString( '/beep/' )\nbool = isRegExpString( 'beep' )\nbool = isRegExpString( '' )\nbool = isRegExpString( null )\n",
	"isRelativePath": "\n// Windows environments:\nbool = isRelativePath( 'foo\\\\bar\\\\baz' )\n\n// POSIX environments:\nbool = isRelativePath( './foo/bar/baz' )\n",
	"isSafeInteger": "bool = isSafeInteger( 5.0 )\nbool = isSafeInteger( new Number( 5.0 ) )\nbool = isSafeInteger( 2.0e200 )\nbool = isSafeInteger( -3.14 )\nbool = isSafeInteger( null )\n",
	"isSafeIntegerArray": "arr = [ -3.0, new Number(0.0), 2.0 ];\nbool = isSafeIntegerArray( arr )\narr = [ -3.0, '3.0' ];\nbool = isSafeIntegerArray( arr )\n",
	"isSameValue": "bool = isSameValue( true, true )\nbool = isSameValue( {}, {} )\nbool = isSameValue( -0.0, -0.0 )\nbool = isSameValue( -0.0, 0.0 )\nbool = isSameValue( NaN, NaN )\n",
	"isStrictEqual": "bool = isStrictEqual( true, true )\nbool = isStrictEqual( {}, {} )\nbool = isStrictEqual( -0.0, -0.0 )\nbool = isStrictEqual( -0.0, 0.0 )\nbool = isStrictEqual( NaN, NaN )\n",
	"isString": "bool = isString( 'beep' )\nbool = isString( new String( 'beep' ) )\nbool = isString( 5 )\n",
	"isStringArray": "bool = isStringArray( [ 'abc', 'def' ] )\nbool = isStringArray( [ 'abc', 123 ] )\n",
	"isSymbol": "bool = isSymbol( Symbol( 'beep' ) )\nbool = isSymbol( Object( Symbol( 'beep' ) ) )\nbool = isSymbol( {} )\nbool = isSymbol( null )\nbool = isSymbol( true )\n",
	"isSymbolArray": "bool = isSymbolArray( [ Symbol( 'beep' ), Symbol( 'boop' ) ] )\nbool = isSymbolArray( Symbol( 'beep' ) )\nbool = isSymbolArray( [] )\nbool = isSymbolArray( {} )\nbool = isSymbolArray( null )\nbool = isSymbolArray( true )\n",
	"isSyntaxError": "bool = isSyntaxError( new SyntaxError( 'beep' ) )\nbool = isSyntaxError( {} )\n",
	"isTruthy": "bool = isTruthy( {} )\nbool = isTruthy( [] )\nbool = isTruthy( false )\nbool = isTruthy( '' )\nbool = isTruthy( 0 )\nbool = isTruthy( null )\nbool = isTruthy( void 0 )\nbool = isTruthy( NaN )\n",
	"isTruthyArray": "bool = isTruthyArray( [ {}, [] ] )\nbool = isTruthyArray( [ null, '' ] )\nbool = isTruthyArray( [] )\n",
	"isTypeError": "bool = isTypeError( new TypeError( 'beep' ) )\nbool = isTypeError( {} )\n",
	"isTypedArray": "bool = isTypedArray( new Int8Array( 10 ) );\n",
	"isTypedArrayLike": "bool = isTypedArrayLike( new Int16Array() )\nbool = isTypedArrayLike({\n'length': 10,\n'byteOffset': 0,\n'byteLength': 10,\n'BYTES_PER_ELEMENT': 4\n})\n",
	"isUint16Array": "bool = isUint16Array( new Uint16Array( 10 ) )\nbool = isUint16Array( [] )\n",
	"isUint32Array": "bool = isUint32Array( new Uint32Array( 10 ) )\nbool = isUint32Array( [] )\n",
	"isUint8Array": "bool = isUint8Array( new Uint8Array( 10 ) )\nbool = isUint8Array( [] )\n",
	"isUint8ClampedArray": "bool = isUint8ClampedArray( new Uint8ClampedArray( 10 ) )\nbool = isUint8ClampedArray( [] )\n",
	"isUNCPath": "bool = isUNCPath( '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz' )\nbool = isUNCPath( '/foo/bar/baz' )\n",
	"isUndefined": "bool = isUndefined( void 0 )\nbool = isUndefined( null )\n",
	"isUndefinedOrNull": "bool = isUndefinedOrNull( void 0 )\nbool = isUndefinedOrNull( null )\nbool = isUndefinedOrNull( false )\n",
	"isUnityProbabilityArray": "bool = isUnityProbabilityArray( [ 0.25, 0.5, 0.25 ] )\nbool = isUnityProbabilityArray( Uint8Array( [ 0, 1 ] )\nbool = isUnityProbabilityArray( [ 0.4, 0.4, 0.4 ] )\nbool = isUnityProbabilityArray( [ 3.14, 0.0 ] )\n",
	"isUppercase": "bool = isUppercase( 'HELLO' )\nbool = isUppercase( 'World' )\n",
	"isURI": "bool = isURI( 'http://google.com' )\nbool = isURI( 'http://localhost/' )\nbool = isURI( 'http://example.w3.org/path%20with%20spaces.html' )\nbool = isURI( 'ftp://ftp.is.co.za/rfc/rfc1808.txt' )\n\n// No scheme:\nbool = isURI( '' )\nbool = isURI( 'foo@bar' )\nbool = isURI( '://foo/' )\n\n// Illegal characters:\nbool = isURI( 'http://<foo>' )\n\n// Invalid path:\nbool = isURI( 'http:////foo.html' )\n\n// Incomplete hex escapes:\nbool = isURI( 'http://example.w3.org/%a' )\n",
	"isURIError": "bool = isURIError( new URIError( 'beep' ) )\nbool = isURIError( {} )\n",
	"isWhitespace": "bool = isWhitespace( '       ' )\nbool = isWhitespace( 'abcdef' )\nbool = isWhitespace( '' )\n",
	"IS_BROWSER": "IS_BROWSER\n",
	"IS_DARWIN": "IS_DARWIN\n",
	"IS_ELECTRON": "IS_ELECTRON\n",
	"IS_ELECTRON_MAIN": "IS_ELECTRON_MAIN\n",
	"IS_ELECTRON_RENDERER": "IS_ELECTRON_RENDERER\n",
	"IS_LITTLE_ENDIAN": "IS_LITTLE_ENDIAN\n",
	"IS_NODE": "IS_NODE\n",
	"IS_WEB_WORKER": "IS_WEB_WORKER\n",
	"IS_WINDOWS": "IS_WINDOWS\n",
	"keysIn": "function Foo() { this.beep = 'boop'; return this; };\nFoo.prototype.foo = 'bar';\nobj = new Foo();\nkeys = keysIn( obj )\n",
	"keyBy": "function toKey( v ) { return v.a; };\narr = [ { 'a': 1 }, { 'a': 2 } ];\nkeyBy( arr, toKey )\n",
	"keyByRight": "function toKey( v ) { return v.a; };\narr = [ { 'a': 1 }, { 'a': 2 } ];\nkeyByRight( arr, toKey )\n",
	"kstest": "\n// Verify that data is drawn from a normal distribution:\nrnorm = base.random.normal.factory({ 'seed': 4839 });\nx = new Array( 100 );\nfor ( var i = 0; i < 100; i++ ) { x[ i ] = rnorm( 3.0, 1.0 ); }\n\n// Test against N(0,1)\nout = kstest( x, 'normal', 0.0, 1.0 );\n\n// Test against N(3,1)\nout = kstest( x, 'normal', 3.0, 1.0 )\n\n// Verify that data is drawn from a uniform distribution:\nrunif = base.random.uniform.factory( 0.0, 1.0, { 'seed': 8798 })\nx = new Array( 100 );\nfor ( i = 0; i < x.length; i++ ) { x[ i ] = runif(); }\nout = kstest( x, 'uniform', 0.0, 1.0 )\n\n// Print output:\nout.print()\n\n// Set custom significance level:\nout = kstest( x, 'uniform', 0.0, 1.0, { 'alpha': 0.1 })\n\n// Carry out one-sided hypothesis tests:\nrunif = base.random.uniform.factory( 0.0, 1.0, { 'seed': 8798 });\nx = new Array( 100 );\nfor ( i = 0; i < x.length; i++ ) { x[ i ] = runif(); }\nout = kstest( x, 'uniform', 0.0, 1.0, { 'alternative': 'less' });\nout = kstest( x, 'uniform', 0.0, 1.0, { 'alternative': 'greater' });\n\n// Set `sorted` option to true when data is in increasing order:\n",
	"LIU_NEGATIVE_OPINION_WORDS_EN": "list = LIU_NEGATIVE_OPINION_WORDS_EN()\n",
	"LIU_POSITIVE_OPINION_WORDS_EN": "list = LIU_POSITIVE_OPINION_WORDS_EN()\n",
	"LN_HALF": "LN_HALF\n",
	"LN_PI": "LN_PI\n",
	"LN_SQRT_TWO_PI": "LN_SQRT_TWO_PI\n",
	"LN_TWO_PI": "LN_TWO_PI\n",
	"LN2": "LN2\n",
	"linspace": "arr = linspace( 0, 100, 6 )\n",
	"logspace": "arr = logspace( 0, 2, 6 )\n",
	"lowercase": "out = lowercase( 'bEEp' )\n",
	"lowercaseKeys": "obj = { 'A': 1, 'B': 2 };\nout = lowercaseKeys( obj )\n",
	"lpad": "out = lpad( 'a', 5 )\nout = lpad( 'beep', 10, 'b' )\nout = lpad( 'boop', 12, 'beep' )\n",
	"ltrim": "out = ltrim( ' \\r\\n\\t  Beep \\t\\t\\n  ' )\n",
	"MALE_FIRST_NAMES_EN": "list = MALE_FIRST_NAMES_EN()\n",
	"mapFun": "function fcn( i ) { return i; };\narr = mapFun( fcn, 5 )\n",
	"mapFunAsync": "\n// Basic usage:\nfunction fcn( i, next ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      next( null, i );\n  }\n};\nfunction done( error, arr ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( arr );\n};\nmapFunAsync( fcn, 10, done )\n\n// Limit number of concurrent invocations:\nfunction fcn( i, next ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      next( null, i );\n  }\n};\nfunction done( error, arr ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( arr );\n};\nopts = { 'limit': 2 };\nmapFunAsync( fcn, 10, opts, done )\n\n// Sequential invocation:\nfunction fcn( i, next ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      next( null, i );\n  }\n};\nfunction done( error, arr ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( arr );\n};\nopts = { 'series': true };\nmapFunAsync( fcn, 10, opts, done )\n",
	"mapKeys": "function transform( key, value ) { return key + value; };\nobj = { 'a': 1, 'b': 2 };\nout = mapKeys( obj, transform )\n",
	"mapKeysAsync": "\n// Basic usage:\nfunction transform( key, value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      next( null, key+':'+value );\n  }\n};\nfunction done( error, out ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( out );\n};\nobj = { 'a': 1, 'b': 2 };\nmapKeysAsync( obj, transform, done )\n\n// Limit number of concurrent invocations:\nfunction transform( key, value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      next( null, key+':'+value );\n  }\n};\nfunction done( error, out ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( out );\n};\nopts = { 'limit': 2 };\nobj = { 'a': 1, 'b': 2, 'c': 3 };\nmapKeysAsync( obj, opts, transform, done )\n\n// Process sequentially:\nfunction transform( key, value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      next( null, key+':'+value );\n  }\n};\nfunction done( error, out ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( out );\n};\nopts = { 'series': true };\nobj = { 'a': 1, 'b': 2, 'c': 3 };\nmapKeysAsync( obj, opts, transform, done )\n",
	"mapValues": "function transform( value, key ) { return key + value; };\nobj = { 'a': 1, 'b': 2 };\nout = mapValues( obj, transform )\n",
	"mapValuesAsync": "\n// Basic usage:\nfunction transform( value, key, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      next( null, key+':'+value );\n  }\n};\nfunction done( error, out ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( out );\n};\nobj = { 'a': 1, 'b': 2 };\nmapValuesAsync( obj, transform, done )\n\n// Limit number of concurrent invocations:\nfunction transform( value, key, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      next( null, key+':'+value );\n  }\n};\nfunction done( error, out ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( out );\n};\nopts = { 'limit': 2 };\nobj = { 'a': 1, 'b': 2, 'c': 3 };\nmapValuesAsync( obj, opts, transform, done )\n\n// Process sequentially:\nfunction transform( value, key, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      next( null, key+':'+value );\n  }\n};\nfunction done( error, out ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( out );\n};\nopts = { 'series': true };\nobj = { 'a': 1, 'b': 2, 'c': 3 };\nmapValuesAsync( obj, opts, transform, done )\n",
	"memoize": "function factorial( n ) {\n  var prod;\n  var i;\n  prod = 1;\n  for ( i = n; i > 1; i-- ) {\n      prod *= i;\n  }\n  return prod;\n};\nmemoized = memoize( factorial );\nv = memoized( 5 )\nv = memoized( 5 )\n",
	"merge": "target = { 'a': 'beep' };\nsource = { 'a': 'boop', 'b': 'bap' };\nout = merge( target, source )\nbool = ( out === target )\n",
	"MILLISECONDS_IN_DAY": "days = 3.14;\nms = days * MILLISECONDS_IN_DAY\n",
	"MILLISECONDS_IN_HOUR": "hrs = 3.14;\nms = hrs * MILLISECONDS_IN_HOUR\n",
	"MILLISECONDS_IN_MINUTE": "mins = 3.14;\nms = mins * MILLISECONDS_IN_MINUTE\n",
	"MILLISECONDS_IN_SECOND": "secs = 3.14;\nms = secs * MILLISECONDS_IN_SECOND\n",
	"MILLISECONDS_IN_WEEK": "weeks = 3.14;\nms = weeks * MILLISECONDS_IN_WEEK\n",
	"MINARD_NAPOLEONS_MARCH": "data = MINARD_NAPOLEONS_MARCH();\narmy = data.army\ncities = data.cities\nlabels = data.labels\nriver = data.river\nt = data.temperature\n",
	"MINUTES_IN_DAY": "days = 3.14;\nmins = days * MINUTES_IN_DAY\n",
	"MINUTES_IN_HOUR": "hrs = 3.14;\nmins = hrs * MINUTES_IN_HOUR\n",
	"MINUTES_IN_WEEK": "wks = 3.14;\nmins = wks * MINUTES_IN_WEEK\n",
	"minutesInMonth": "num = minutesInMonth()\nnum = minutesInMonth( 2 )\nnum = minutesInMonth( 2, 2016 )\nnum = minutesInMonth( 2, 2017 )\n\n// Other ways to supply month:\nnum = minutesInMonth( 'feb', 2016 )\nnum = minutesInMonth( 'february', 2016 )\n",
	"minutesInYear": "num = minutesInYear()\nnum = minutesInYear( 2016 )\nnum = minutesInYear( 2017 )\n",
	"MOBY_DICK": "data = MOBY_DICK()\n",
	"MONTHS_IN_YEAR": "yrs = 3.14;\nmons = yrs * MONTHS_IN_YEAR\n",
	"MONTH_NAMES_EN": "list = MONTH_NAMES_EN()\n",
	"moveProperty": "obj1 = { 'a': 'b' };\nobj2 = {};\nbool = moveProperty( obj1, 'a', obj2 )\nbool = moveProperty( obj1, 'c', obj2 )\n",
	"nativeClass": "str = nativeClass( 'a' )\nstr = nativeClass( 5 )\nfunction Beep(){};\nstr = nativeClass( new Beep() )\n",
	"NIGHTINGALES_ROSE": "data = NIGHTINGALES_ROSE()\n",
	"NINF": "NINF\n",
	"NODE_VERSION": "NODE_VERSION\n",
	"none": "arr = [ 0, 0, 0, 0, 0 ];\nbool = none( arr )\n",
	"noneBy": "function negative( v ) { return ( v < 0 ); };\narr = [ 1, 2, 3, 4 ];\nbool = noneBy( arr, negative )\n",
	"noneByAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 3000, 2500, 1000 ];\nnoneByAsync( arr, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\nnoneByAsync( arr, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\nnoneByAsync( arr, opts, predicate, done )\n",
	"noneByRight": "function positive( v ) { return ( v > 0 ); };\narr = [ -1, -2, -3, -4 ];\nbool = noneByRight( arr, positive )\n",
	"noneByRightAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 1000, 2500, 3000 ];\nnoneByRightAsync( arr, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 1000, 2500, 3000 ];\nnoneByRightAsync( arr, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 1000, 2500, 3000 ];\nnoneByRightAsync( arr, opts, predicate, done )\n",
	"noop": "noop();\n",
	"now": "ts = now()\n",
	"NUM_CPUS": "NUM_CPUS\n",
	"objectEntries": "obj = { 'beep': 'boop', 'foo': 'bar' };\nentries = objectEntries( obj )\n",
	"objectEntriesIn": "function Foo() { this.beep = 'boop'; return this; };\nFoo.prototype.foo = 'bar';\nobj = new Foo();\nentries = objectEntriesIn( obj )\n",
	"objectFromEntries": "entries = [ [ 'beep', 'boop' ], [ 'foo', 'bar' ] ];\nobj = objectFromEntries( entries )\n",
	"objectInverse": "\n// Basic usage:\nobj = { 'a': 'beep', 'b': 'boop' };\nout = objectInverse( obj )\n\n// Duplicate values:\nobj = { 'a': 'beep', 'b': 'beep' };\nout = objectInverse( obj )\n\n// Override duplicate values:\nobj = {};\nobj.a = 'beep';\nobj.b = 'boop';\nobj.c = 'beep';\nout = objectInverse( obj, { 'duplicates': false } )\n",
	"objectInverseBy": "\n// Basic usage:\nfunction transform( key, value ) { return key + value; };\nobj = { 'a': 'beep', 'b': 'boop' };\nout = objectInverseBy( obj, transform )\n\n// Duplicate values:\nfunction transform( key, value ) { return value; };\nobj = { 'a': 'beep', 'b': 'beep' };\nout = objectInverseBy( obj, transform )\n\n// Override duplicate values:\nobj = {};\nobj.a = 'beep';\nobj.b = 'boop';\nobj.c = 'beep';\nout = objectInverseBy( obj, { 'duplicates': false }, transform )\n",
	"objectValues": "obj = { 'beep': 'boop', 'foo': 'bar' };\nvals = objectValues( obj )\n",
	"objectValuesIn": "function Foo() { this.beep = 'boop'; return this; };\nFoo.prototype.foo = 'bar';\nobj = new Foo();\nvalues = objectValuesIn( obj )\n",
	"omit": "obj1 = { 'a': 1, 'b': 2 };\nobj2 = omit( obj1, 'b' )\n",
	"omitBy": "function predicate( key, value ) { return ( value > 1 ); };\nobj1 = { 'a': 1, 'b': 2 };\nobj2 = omitBy( obj1, predicate )\n",
	"openURL": "out = openURL( 'https://google.com' );\n",
	"pad": "\n// Standard usage:\nout = pad( 'a', 5 )\n\n// Left pad:\nout = pad( 'a', 10, { 'lpad': 'b' })\n\n// Right pad:\nout = pad( 'a', 12, { 'rpad': 'b' })\n\n// Center an input string:\nopts = { 'lpad': 'a', 'rpad': 'c' };\nout = pad( 'b', 11, opts )\n\n// Left center:\nopts.centerRight = false;\nout = pad( 'b', 10, opts )\n\n// Right center:\nopts.centerRight = true;\nout = pad( 'b', 10, opts )\n\n// Output string always length `len`:\nopts = { 'lpad': 'boop', 'rpad': 'woot' };\nout = pad( 'beep', 10, opts )\n\n// Pad right, trim right:\nout = pad( 'beep', 2 )\n\n// Pad left, trim left:\nopts = { 'lpad': 'b' };\nout = pad( 'beep', 2, opts )\n\n// Pad both, trim both:\nopts = { 'lpad': '@', 'rpad': '!' };\nout = pad( 'beep', 2, opts )\n\n// Pad both, trim both starting from left:\nout = pad( 'abcdef', 3, opts )\n\n// Pad both, trim both starting from right:\nopts.centerRight = true;\nout = pad( 'abcdef', 3, opts )\n",
	"papply": "function add( x, y ) { return x + y; };\nadd2 = papply( add, 2 );\nsum = add2( 3 )\n",
	"papplyRight": "function say( text, name ) { return text + ', ' + name + '.'; };\ntoGrace = papplyRight( say, 'Grace Hopper' );\nstr = toGrace( 'Hello' )\nstr = toGrace( 'Thank you' )\n",
	"parallel": "function done( error ) { if ( error ) { throw error; } };\nfiles = [ './a.js', './b.js' ];\nparallel( files, done );\n\n// Specify the number of workers:\nopts = { 'workers': 8 };\nparallel( files, opts, done );\n",
	"parseJSON": "obj = parseJSON( '{\"beep\":\"boop\"}' )\n\n// Provide a reviver:\nfunction reviver( key, value ) {\n  if ( key === '' ) { return value; }\n  if ( key === 'beep' ) { return value; }\n};\nstr = '{\"beep\":\"boop\",\"a\":\"b\"}';\nout = parseJSON( str, reviver )\n",
	"PATH_DELIMITER": "PATH_DELIMITER\n\n// POSIX environment:\npath = '/usr/bin:/bin:/usr/sbin';\nparts = path.split( PATH_DELIMITER )\n\n// Windows environment:\npath = 'C:\\\\Windows\\\\system32;C:\\\\Windows';\nparts = path.split( PATH_DELIMITER )\n",
	"PATH_DELIMITER_POSIX": "PATH_DELIMITER_POSIX\nPATH = '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin';\npaths = PATH.split( PATH_DELIMITER_POSIX )\n",
	"PATH_DELIMITER_WIN32": "PATH_DELIMITER_WIN32\nPATH = 'C:\\\\Windows\\\\system32;C:\\\\Windows;C:\\\\Program Files\\\\node\\\\';\npaths = PATH.split( PATH_DELIMITER_WIN32 )\n",
	"PATH_SEP": "PATH_SEP\n\n// Windows environment:\nparts = 'foo\\\\bar\\\\baz'.split( PATH_SEP )\n\n// POSIX environment:\nparts = 'foo/bar/baz'.split( PATH_SEP )\n",
	"PATH_SEP_POSIX": "PATH_SEP_POSIX\nparts = 'foo/bar/baz'.split( PATH_SEP_POSIX )\n",
	"PATH_SEP_WIN32": "PATH_SEP_WIN32\nparts = 'foo\\\\bar\\\\baz'.split( PATH_SEP_WIN32 )\n",
	"pcorrtest": "rho = 0.5;\nx = new Array( 300 );\ny = new Array( 300 );\nfor ( var i = 0; i < 300; i++ ) {\n   x[ i ] = base.random.normal( 0.0, 1.0 );\n   y[ i ] = ( rho * x[ i ] ) + base.random.normal( 0.0, base.sqrt( 1.0 - (rho*rho) ) );\n}\nout = pcorrtest( x, y )\n\n// Print output:\ntable = out.print()\n",
	"percentEncode": "out = percentEncode( '☃' )\n",
	"PHI": "PHI\n",
	"PI": "PI\n",
	"PI_SQUARED": "PI_SQUARED\n",
	"pick": "obj1 = { 'a': 1, 'b': 2 };\nobj2 = pick( obj1, 'b' )\n",
	"pickBy": "function predicate( key, value ) {\n  return ( value > 1 );\n};\nobj1 = { 'a': 1, 'b': 2 };\nobj2 = pickBy( obj1, predicate )\n",
	"PINF": "PINF\n",
	"PLATFORM": "PLATFORM\n",
	"pluck": "arr = [\n  { 'a': 1, 'b': 2 },\n  { 'a': 0.5, 'b': 3 }\n];\nout = pluck( arr, 'a' )\narr = [\n  { 'a': 1, 'b': 2 },\n  { 'a': 0.5, 'b': 3 }\n];\nout = pluck( arr, 'a', { 'copy': false } )\nbool = ( arr[ 0 ] === out[ 0 ] )\n",
	"pop": "\n// Arrays:\narr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\nout = pop( arr )\n\n// Typed arrays:\narr = new Float64Array( [ 1.0, 2.0 ] );\nout = pop( arr )\n\n// Array-like object:\narr = { 'length': 2, '0': 1.0, '1': 2.0 };\nout = pop( arr )\n",
	"prepend": "\n// Arrays:\narr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\narr = prepend( arr, [ 6.0, 7.0 ] )\n\n// Typed arrays:\narr = new Float64Array( [ 1.0, 2.0 ] );\narr = prepend( arr, [ 3.0, 4.0 ] )\n\n// Array-like object:\narr = { 'length': 1, '0': 1.0 };\narr = prepend( arr, [ 2.0, 3.0 ] )\n",
	"push": "\n// Arrays:\narr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\narr = push( arr, 6.0, 7.0 )\n\n// Typed arrays:\narr = new Float64Array( [ 1.0, 2.0 ] );\narr = push( arr, 3.0, 4.0 )\n\n// Array-like object:\narr = { 'length': 0 };\narr = push( arr, 1.0, 2.0 )\n",
	"quarterOfYear": "q = quarterOfYear( new Date() )\nq = quarterOfYear( 4 )\nq = quarterOfYear( 'June' )\n\n// Other ways to supply month:\nq = quarterOfYear( 'April' )\nq = quarterOfYear( 'apr' )\n",
	"readDir": "function onRead( error, data ) {\n  if ( error ) {\n      console.error( error.message );\n  } else {\n      console.log( data );\n  }\n};\nreadDir( './beep/boop', onRead );\n",
	"readFile": "function onRead( error, data ) {\n  if ( error ) {\n      console.error( error.message );\n  } else {\n      console.log( data );\n  }\n};\nreadFile( './beep/boop.js', onRead );\n",
	"readFileList": "function onRead( error, data ) {\n  if ( error ) {\n      console.error( error.message );\n  } else {\n      console.log( data );\n  }\n};\nfilepaths = [ './beep/boop.txt', './foo/bar.txt' ];\nreadFileList( filepaths, onRead );\n",
	"readJSON": "function onRead( error, data ) {\n  if ( error ) {\n      console.error( error.message );\n  } else {\n      console.log( data );\n  }\n};\nreadJSON( './beep/boop.json', onRead );\n",
	"readWASM": "function onRead( error, data ) {\n  if ( error ) {\n      console.error( error.message );\n  } else {\n      console.log( data );\n  }\n};\nreadWASM( './beep/boop.wasm', onRead );\n",
	"real": "z = new Complex128( 5.0, 3.0 );\nre = real( z )\n",
	"realmax": "m = realmax( 'float16' )\nm = realmax( 'float32' )\n",
	"realmin": "m = realmin( 'float16' )\nm = realmin( 'float32' )\n",
	"reduce": "function sum( acc, v ) { return acc + v; };\narr = [ 1.0, 2.0, 3.0 ];\nout = reduce( arr, 0, sum )\n",
	"reduceAsync": "\n// Basic usage:\nfunction fcn( acc, value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      acc.sum += value;\n      next( null, acc );\n  }\n};\nfunction done( error, acc ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( acc.sum );\n};\narr = [ 3000, 2500, 1000 ];\nacc = { 'sum': 0 };\nreduceAsync( arr, acc, fcn, done )\n\n// Limit number of concurrent invocations:\nfunction fcn( acc, value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      acc.sum += value;\n      next( null, acc );\n  }\n};\nfunction done( error, acc ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( acc.sum );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\nacc = { 'sum': 0 };\nreduceAsync( arr, acc, opts, fcn, done )\n\n// Process concurrently:\nfunction fcn( acc, value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      acc.sum += value;\n      next( null, acc );\n  }\n};\nfunction done( error, acc ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( acc.sum );\n};\nopts = { 'series': false };\narr = [ 3000, 2500, 1000 ];\nacc = { 'sum': 0 };\nreduceAsync( arr, acc, opts, fcn, done )\n",
	"reduceRight": "function sum( acc, v ) { console.log( '%s: %d', i, v ); return acc + v; };\narr = [ 1.0, 2.0, 3.0 ];\nout = reduceRight( arr, 0, sum )\n",
	"reduceRightAsync": "\n// Basic usage:\nfunction fcn( acc, value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      acc.sum += value;\n      next( null, acc );\n  }\n};\nfunction done( error, acc ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( acc.sum );\n};\narr = [ 1000, 2500, 3000 ];\nacc = { 'sum': 0 };\nreduceRightAsync( arr, acc, fcn, done )\n\n// Limit number of concurrent invocations:\nfunction fcn( acc, value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      acc.sum += value;\n      next( null, acc );\n  }\n};\nfunction done( error, acc ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( acc.sum );\n};\nopts = { 'limit': 2 };\narr = [ 1000, 2500, 3000 ];\nacc = { 'sum': 0 };\nreduceRightAsync( arr, acc, opts, fcn, done )\n\n// Process concurrently:\nfunction fcn( acc, value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      acc.sum += value;\n      next( null, acc );\n  }\n};\nfunction done( error, acc ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( acc.sum );\n};\nopts = { 'series': false };\narr = [ 1000, 2500, 3000 ];\nacc = { 'sum': 0 };\nreduceRightAsync( arr, acc, opts, fcn, done )\n",
	"reFromString": "re = reFromString( '/beep/' )\nre = reFromString( '/beep' )\n",
	"reim": "z = new Complex128( 5.0, 3.0 );\nout = reim( z )\n",
	"removeFirst": "out = removeFirst( 'beep' )\nout = removeFirst( 'Boop' )\n",
	"removeLast": "out = removeLast( 'beep' )\nout = removeLast( 'Boop' )\n",
	"removePunctuation": "str = 'Sun Tzu said: \"A leader leads by example not by force.\"';\nout = {{alias }}( str )\nstr = 'This function removes these characters: `{}[]:,!/<>().;~|?\\'\"';\nout = removePunctuation( str )\n",
	"removeUTF8BOM": "out = removeUTF8BOM( '\\ufeffbeep' )\n",
	"removeWords": "out = removeWords( 'beep boop Foo bar', [ 'boop', 'foo' ] )\n\n// Case-insensitive:\nout = removeWords( 'beep boop Foo bar', [ 'boop', 'foo' ], true )\n",
	"reorderArguments": "function foo( a, b, c ) { return [ a, b, c ]; };\nbar = reorderArguments( foo, [ 2, 0, 1 ] );\nout = bar( 1, 2, 3 )\n",
	"repeat": "out = repeat( 'a', 5 )\nout = repeat( '', 100 )\nout = repeat( 'beep', 0 )\n",
	"replace": "\n// Standard usage:\nout = replace( 'beep', 'e', 'o' )\n\n// Replacer function:\nfunction replacer( match, p1 ) { return '/'+p1+'/'; };\nstr = 'Oranges and lemons';\nout = replace( str, /([^\\s]+)/gi, replacer )\n\n// Replace only first match:\nout = replace( 'beep', /e/, 'o' )\n",
	"rescape": "str = rescape( '[A-Z]*' )\n",
	"resolveParentPath": "function onPath( error, path ) {\n  if ( error ) {\n      console.error( error.message );\n  } else {\n      console.log( path );\n  }\n};\nresolveParentPath( 'package.json', onPath );\n",
	"reverseArguments": "function foo( a, b, c ) { return [ a, b, c ]; };\nbar = reverseArguments( foo );\nout = bar( 1, 2, 3 )\n",
	"reverseString": "out = reverseString( 'foo' )\nout = reverseString( 'abcdef' )\n",
	"reviveComplex": "str = '{\"type\":\"Complex128\",\"re\":5,\"im\":3}';\nz = parseJSON( str, reviveComplex )\n",
	"reviveComplex128": "str = '{\"type\":\"Complex128\",\"re\":5,\"im\":3}';\nz = parseJSON( str, reviveComplex128 )\n",
	"reviveComplex64": "str = '{\"type\":\"Complex64\",\"re\":5,\"im\":3}';\nz = parseJSON( str, reviveComplex64 )\n",
	"reviveError": "str = '{\"type\":\"TypeError\",\"message\":\"beep\"}';\nerr = JSON.parse( str, reviveError )\n",
	"reviveTypedArray": "str = '{\"type\":\"Float64Array\",\"data\":[5,3]}';\narr = parseJSON( str, reviveTypedArray )\n",
	"RE_BASENAME": "base = RE_BASENAME.exec( '/foo/bar/index.js' )[ 1 ]\n",
	"RE_BASENAME_POSIX": "base = RE_BASENAME_POSIX.exec( '/foo/bar/index.js' )[ 1 ]\nbase = RE_BASENAME_POSIX.exec( './foo/bar/.gitignore' )[ 1 ]\nbase = RE_BASENAME_POSIX.exec( 'foo/file.pdf' )[ 1 ]\nbase = RE_BASENAME_POSIX.exec( '/foo/bar/file' )[ 1 ]\nbase = RE_BASENAME_POSIX.exec( 'index.js' )[ 1 ]\nbase = RE_BASENAME_POSIX.exec( '.' )[ 1 ]\nbase = RE_BASENAME_POSIX.exec( './' )[ 1 ]\nbase = RE_BASENAME_POSIX.exec( '' )[ 1 ]\n",
	"RE_BASENAME_WINDOWS": "base = RE_BASENAME_WINDOWS.exec( '\\\\foo\\\\bar\\\\index.js' )[ 1 ]\nbase = RE_BASENAME_WINDOWS.exec( 'C:\\\\foo\\\\bar\\\\.gitignore' )[ 1 ]\nbase = RE_BASENAME_WINDOWS.exec( 'foo\\\\file.pdf' )[ 1 ]\nbase = RE_BASENAME_WINDOWS.exec( 'foo\\\\bar\\\\file' )[ 1 ]\nbase = RE_BASENAME_WINDOWS.exec( 'index.js' )[ 1 ]\nbase = RE_BASENAME_WINDOWS.exec( '.' )[ 1 ]\nbase = RE_BASENAME_WINDOWS.exec( '' )[ 1 ]\n",
	"RE_COLOR_HEXADECIMAL": "bool = RE_COLOR_HEXADECIMAL.test( 'ffffff' )\nbool = RE_COLOR_HEXADECIMAL.test( '000' )\nbool = RE_COLOR_HEXADECIMAL.test( 'beep' )\n",
	"RE_DECIMAL_NUMBER": "bool = RE_DECIMAL_NUMBER.test( '1.234' )\nbool = RE_DECIMAL_NUMBER.test( '-1.234' )\nbool = RE_DECIMAL_NUMBER.test( '0.0' )\nbool = RE_DECIMAL_NUMBER.test( '.0' )\nbool = RE_DECIMAL_NUMBER.test( '0' )\nbool = RE_DECIMAL_NUMBER.test( 'beep' )\n\n// Create a RegExp to capture all decimal numbers:\nre = new RegExp( RE_DECIMAL_NUMBER.source, 'g' );\nstr = '1.234 5.6, 7.8';\nout = str.match( re );\n",
	"RE_DIRNAME": "dir = RE_DIRNAME.exec( '/foo/bar/index.js' )[ 1 ]\n",
	"RE_DIRNAME_POSIX": "dir = RE_DIRNAME_POSIX.exec( '/foo/bar/index.js' )[ 1 ]\ndir = RE_DIRNAME_POSIX.exec( './foo/bar/.gitignore' )[ 1 ]\ndir = RE_DIRNAME_POSIX.exec( 'foo/file.pdf' )[ 1 ]\ndir = RE_DIRNAME_POSIX.exec( '/foo/bar/file' )[ 1 ]\ndir = RE_DIRNAME_POSIX.exec( 'index.js' )[ 1 ]\ndir = RE_DIRNAME_POSIX.exec( '.' )[ 1 ]\ndir = RE_DIRNAME_POSIX.exec( './' )[ 1 ]\ndir = RE_DIRNAME_POSIX.exec( '' )[ 1 ]\n",
	"RE_DIRNAME_WINDOWS": "dir = RE_DIRNAME_WINDOWS.exec( 'foo\\\\bar\\\\index.js' )[ 1 ]\ndir = RE_DIRNAME_WINDOWS.exec( 'C:\\\\foo\\\\bar\\\\.gitignore' )[ 1 ]\ndir = RE_DIRNAME_WINDOWS.exec( 'foo\\\\file.pdf' )[ 1 ]\ndir = RE_DIRNAME_WINDOWS.exec( '\\\\foo\\\\bar\\\\file' )[ 1 ]\ndir = RE_DIRNAME_WINDOWS.exec( 'index.js' )[ 1 ]\ndir = RE_DIRNAME_WINDOWS.exec( '' )[ 1 ]\n",
	"RE_EOL": "bool = RE_EOL.test( '\\n' )\nbool = RE_EOL.test( '\\r\\n' )\nbool = RE_EOL.test( '\\\\r\\\\n' )\n",
	"RE_EXTENDED_LENGTH_PATH": "path = '\\\\\\\\?\\\\C:\\\\foo\\\\bar';\nbool = RE_EXTENDED_LENGTH_PATH.test( path )\npath = '\\\\\\\\?\\\\UNC\\\\server\\\\share';\nbool = RE_EXTENDED_LENGTH_PATH.test( path )\npath = 'C:\\\\foo\\\\bar';\nbool = RE_EXTENDED_LENGTH_PATH.test( path )\npath = '/c/foo/bar';\nbool = RE_EXTENDED_LENGTH_PATH.test( path )\npath = '/foo/bar';\nbool = RE_EXTENDED_LENGTH_PATH.test( path )\n",
	"RE_EXTNAME": "dir = RE_EXTNAME.exec( '/foo/bar/index.js' )[ 1 ]\n",
	"RE_EXTNAME_POSIX": "ext = RE_EXTNAME_POSIX.exec( '/foo/bar/index.js' )[ 1 ]\next = RE_EXTNAME_POSIX.exec( './foo/bar/.gitignore' )[ 1 ]\next = RE_EXTNAME_POSIX.exec( 'foo/file.pdf' )[ 1 ]\next = RE_EXTNAME_POSIX.exec( '/foo/bar/file' )[ 1 ]\next = RE_EXTNAME_POSIX.exec( 'index.js' )[ 1 ]\next = RE_EXTNAME_POSIX.exec( '.' )[ 1 ]\next = RE_EXTNAME_POSIX.exec( './' )[ 1 ]\next = RE_EXTNAME_POSIX.exec( '' )[ 1 ]\n",
	"RE_EXTNAME_WINDOWS": "ext = RE_EXTNAME_WINDOWS.exec( 'C:\\\\foo\\\\bar\\\\index.js' )[ 1 ]\next = RE_EXTNAME_WINDOWS.exec( 'C:\\\\foo\\\\bar\\\\.gitignore' )[ 1 ]\next = RE_EXTNAME_WINDOWS.exec( 'foo\\\\file.pdf' )[ 1 ]\next = RE_EXTNAME_WINDOWS.exec( '\\\\foo\\\\bar\\\\file' )[ 1 ]\next = RE_EXTNAME_WINDOWS.exec( beep\\\\boop.' )[ 1 ]\next = RE_EXTNAME_WINDOWS.exec( 'index.js' )[ 1 ]\next = RE_EXTNAME_WINDOWS.exec( '' )[ 1 ]\n",
	"RE_FILENAME": "f = '/foo/bar/index.js';\nparts = RE_FILENAME.exec( f ).slice()\n",
	"RE_FILENAME_POSIX": "parts = RE_FILENAME_POSIX.exec( '/foo/bar/index.js' ).slice()\nparts = RE_FILENAME_POSIX.exec( './foo/bar/.gitignore' ).slice()\nparts = RE_FILENAME_POSIX.exec( 'foo/file.pdf' ).slice()\nparts = RE_FILENAME_POSIX.exec( '/foo/bar/file' ).slice()\nparts = RE_FILENAME_POSIX.exec( 'index.js' ).slice()\nparts = RE_FILENAME_POSIX.exec( '.' ).slice()\nparts = RE_FILENAME_POSIX.exec( './' ).slice()\nparts = RE_FILENAME_POSIX.exec( '' ).slice()\n",
	"RE_FILENAME_WINDOWS": "parts = RE_FILENAME_WINDOWS.exec( 'C:\\\\foo\\\\bar\\\\index.js' ).slice()\nparts = RE_FILENAME_WINDOWS.exec( '\\\\foo\\\\bar\\\\.gitignore' ).slice()\nparts = RE_FILENAME_WINDOWS.exec( 'foo\\\\file.pdf' ).slice()\nparts = RE_FILENAME_WINDOWS.exec( '\\\\foo\\\\bar\\\\file' ).slice()\nparts = RE_FILENAME_WINDOWS.exec( 'index.js' ).slice()\nparts = RE_FILENAME_WINDOWS.exec( '.' ).slice()\nparts = RE_FILENAME_WINDOWS.exec( './' ).slice()\nparts = RE_FILENAME_WINDOWS.exec( '' ).slice()\n",
	"RE_FUNCTION_NAME": "function beep() { return 'boop'; };\nname = RE_FUNCTION_NAME.exec( beep.toString() )[ 1 ]\nname = RE_FUNCTION_NAME.exec( function () {} )[ 1 ]\n",
	"RE_NATIVE_FUNCTION": "bool = RE_NATIVE_FUNCTION.test( Date.toString() )\nbool = RE_NATIVE_FUNCTION.test( (function noop() {}).toString() )\n",
	"RE_REGEXP": "bool = RE_REGEXP.test( '/^beep$/' )\nbool = RE_REGEXP.test( '/boop' )\n\n// Escape regular expression strings:\nbool = RE_REGEXP.test( '/^\\/([^\\/]+)\\/(.*)$/' )\nbool = RE_REGEXP.test( '/^\\\\/([^\\\\/]+)\\\\/(.*)$/' )\n",
	"RE_UNC_PATH": "path = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz:a:b';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz::b';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz:a';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\\\\\share';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\\\\\\\\\server\\\\share';\nbool = RE_UNC_PATH.test( path )\npath = 'beep boop \\\\\\\\server\\\\share';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\';\nbool = RE_UNC_PATH.test( path )\npath = '';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz:';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz:a:';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz::';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\baz:a:b:c';\nbool = RE_UNC_PATH.test( path )\npath = '\\\\\\\\server\\\\share\\\\foo\\\\bar\\\\';\nbool = RE_UNC_PATH.test( path )\npath = '//server/share';\nbool = RE_UNC_PATH.test( path )\npath = '/foo/bar';\nbool = RE_UNC_PATH.test( path )\npath = 'foo/bar';\nbool = RE_UNC_PATH.test( path )\npath = './foo/bar';\nbool = RE_UNC_PATH.test( path )\npath = '/foo/../bar';\nbool = RE_UNC_PATH.test( path )\n",
	"RE_UTF16_SURROGATE_PAIR": "bool = RE_UTF16_SURROGATE_PAIR.test( 'abc\\uD800\\uDC00def' )\nbool = RE_UTF16_SURROGATE_PAIR.test( 'abcdef' )\n",
	"RE_UTF16_UNPAIRED_SURROGATE": "bool = RE_UTF16_UNPAIRED_SURROGATE.test( 'abc' )\nbool = RE_UTF16_UNPAIRED_SURROGATE.test( '\\uD800' )\n",
	"RE_WHITESPACE": "bool = RE_WHITESPACE.test( '\\n' )\nbool = RE_WHITESPACE.test( ' ' )\nbool = RE_WHITESPACE.test( 'a' )\n",
	"rpad": "out = rpad( 'a', 5 )\nout = rpad( 'beep', 10, 'p' )\nout = rpad( 'beep', 12, 'boop' )\n",
	"rtrim": "out = rtrim( ' \\t\\t\\n  Beep \\r\\n\\t  ' )\n",
	"safeintmax": "m = safeintmax( 'float16' )\nm = safeintmax( 'float32' )\n",
	"safeintmin": "m = safeintmin( 'float16' )\nm = safeintmin( 'float32' )\n",
	"sample": "out = sample( 'abc' )\nout = sample( [ 3, 6, 9 ] )\nbool = ( out.length === 3 )\nout = sample( [ 3, null, NaN, 'abc', function(){} ] )\n\n// Set sample size:\nout = sample( [ 3, 6, 9 ], { 'size': 10 })\nout = sample( [ 0, 1 ], { 'size': 20 })\n\n// Draw without replacement:\nout = sample( [ 1, 2, 3, 4, 5, 6 ], { 'replace': false, 'size': 3 })\nout = sample( [ 0, 1 ], { 'replace': false })\n\n// Assigning non-uniform element probabilities:\nx = [ 1, 2, 3, 4, 5, 6 ];\nprobs = [ 0.1, 0.1, 0.1, 0.1, 0.1, 0.5 ];\nout = sample( x, { 'probs': probs })\nout = sample( x, { 'probs': probs, 'size': 3, 'replace': false })\n",
	"SAVOY_STOPWORDS_FIN": "list = SAVOY_STOPWORDS_FIN()\n",
	"SAVOY_STOPWORDS_FR": "list = SAVOY_STOPWORDS_FR()\n",
	"SAVOY_STOPWORDS_GER": "list = SAVOY_STOPWORDS_GER()\n",
	"SAVOY_STOPWORDS_IT": "list = SAVOY_STOPWORDS_IT()\n",
	"SAVOY_STOPWORDS_POR": "list = SAVOY_STOPWORDS_POR()\n",
	"SAVOY_STOPWORDS_SP": "list = SAVOY_STOPWORDS_SP()\n",
	"SAVOY_STOPWORDS_SWE": "list = SAVOY_STOPWORDS_SWE()\n",
	"SECONDS_IN_DAY": "days = 3.14;\nsecs = days * SECONDS_IN_DAY\n",
	"SECONDS_IN_HOUR": "hrs = 3.14;\nsecs = hrs * SECONDS_IN_HOUR\n",
	"SECONDS_IN_MINUTE": "mins = 3.14;\nsecs = mins * SECONDS_IN_MINUTE\n",
	"SECONDS_IN_WEEK": "wks = 3.14;\nsecs = wks * SECONDS_IN_WEEK\n",
	"secondsInMonth": "num = secondsInMonth()\nnum = secondsInMonth( 2 )\nnum = secondsInMonth( 2, 2016 )\nnum = secondsInMonth( 2, 2017 )\n\n// Other ways to supply month:\nnum = secondsInMonth( 'feb', 2016 )\nnum = secondsInMonth( 'february', 2016 )\n",
	"secondsInYear": "num = secondsInYear()\nnum = secondsInYear( 2016 )\nnum = secondsInYear( 2017 )\n",
	"setReadOnly": "obj = {};\nsetReadOnly( obj, 'foo', 'bar' );\nobj.foo = 'boop';\nobj\n",
	"shift": "\n// Arrays:\narr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\nout = shift( arr )\n\n// Typed arrays:\narr = new Float64Array( [ 1.0, 2.0 ] );\nout = shift( arr )\n\n// Array-like object:\narr = { 'length': 2, '0': 1.0, '1': 2.0 };\nout = shift( arr )\n",
	"sizeOf": "s = sizeOf( 'int8' )\ns = sizeOf( 'uint32' )\n",
	"some": "arr = [ 0, 0, 1, 2, 3 ];\nbool = some( arr, 3 )\n",
	"someBy": "function negative( v ) { return ( v < 0 ); };\narr = [ 1, 2, -3, 4, -1 ];\nbool = someBy( arr, 2, negative )\n",
	"someByAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 3000, 2500, 1000 ];\nsomeByAsync( arr, 2, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000 ];\nsomeByAsync( arr, 2, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000 ];\nsomeByAsync( arr, 2, opts, predicate, done )\n",
	"someByRight": "function negative( v ) { return ( v < 0 ); };\narr = [ -1, 1, -2, 3, 4 ];\nbool = someByRight( arr, 2, negative )\n",
	"someByRightAsync": "\n// Basic usage:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\narr = [ 1000, 2500, 3000 ];\nsomeByRightAsync( arr, 2, predicate, done )\n\n// Limit number of concurrent invocations:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'limit': 2 };\narr = [ 1000, 2500, 3000 ];\nsomeByRightAsync( arr, 2, opts, predicate, done )\n\n// Process sequentially:\nfunction predicate( value, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, false );\n  }\n};\nfunction done( error, bool ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( bool );\n};\nopts = { 'series': true };\narr = [ 1000, 2500, 3000 ];\nsomeByRightAsync( arr, 2, opts, predicate, done )\n",
	"SOTU": "out = SOTU()\n\n// Retrieve addresses by one or more Presidents...\nopts = { 'name': 'Barack Obama' };\nout = SOTU( opts )\n\n// Retrieve addresses by one or more political parties...\nopts = { 'party': [ 'Democratic', 'Federalist' ] };\nout = SOTU( opts )\n\n// Retrieve addresses from one or more years...\nopts = { 'year': [ 2008, 2009, 2011 ] };\nout = SOTU( opts )\n\n// Retrieve addresses from a range of consecutive years...\nopts = { 'range': [ 2008-2016 ] }\nout = SOTU( opts )\n",
	"SPACHE_REVISED": "list = SPACHE_REVISED()\n",
	"SPAM_ASSASSIN": "data = SPAM_ASSASSIN()\n",
	"SQRT_EPS": "SQRT_EPS\n",
	"SQRT_HALF": "SQRT_HALF\n",
	"SQRT_HALF_PI": "SQRT_HALF_PI\n",
	"SQRT_PHI": "SQRT_PHI\n",
	"SQRT_PI": "SQRT_PI\n",
	"SQRT_THREE": "SQRT_THREE\n",
	"SQRT_TWO": "SQRT_TWO\n",
	"SQRT_TWO_PI": "SQRT_TWO_PI\n",
	"startcase": "out = startcase( 'beep boop' )\n",
	"startsWith": "bool = startsWith( 'Beep', 'Be' )\nbool = startsWith( 'Beep', 'ep' )\nbool = startsWith( 'Beep', 'ee', 1 )\nbool = startsWith( 'Beep', 'ee', -3 )\nbool = startsWith( 'Beep', '' )\n",
	"STOPWORDS_EN": "list = STOPWORDS_EN()\n",
	"tabulate": "collection = [ 'beep', 'boop', 'foo', 'beep' ];\nout = tabulate( collection )\n",
	"tabulateBy": "function indicator( value ) { return value[ 0 ]; };\ncollection = [ 'beep', 'boop', 'foo', 'beep' ];\nout = tabulateBy( collection, indicator )\n",
	"tabulateByAsync": "\n// Basic usage:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) ? 'even': 'odd' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\narr = [ 3000, 2500, 1000, 750 ];\ntabulateByAsync( arr, indicator, done )\n\n// Limit number of concurrent invocations:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) ? 'even' : 'odd' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'limit': 2 };\narr = [ 3000, 2500, 1000, 750 ];\ntabulateByAsync( arr, opts, indicator, done )\n\n// Process sequentially:\nfunction indicator( value, index, next ) {\n  setTimeout( onTimeout, value );\n  function onTimeout() {\n      console.log( value );\n      next( null, ( index%2 === 0 ) ? 'even' : 'odd' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nopts = { 'series': true };\narr = [ 3000, 2500, 1000, 750 ];\ntabulateByAsync( arr, opts, indicator, done )\n",
	"tic": "t = tic()\n",
	"timeit": "code = 'var x = Math.pow( Math.random(), 3 );';\ncode += 'if ( x !== x ) {';\ncode += 'throw new Error( \\'Something went wrong.\\' );';\ncode += '}';\nfunction done( error, results ) {\n  if ( error ) {\n      throw error;\n  }\n  console.dir( results );\n};\ntimeit( code, done );\n",
	"tmpdir": "dir = tmpdir()\n",
	"toc": "start = tic();\ndelta = toc( start )\n",
	"tokenize": "out = tokenize( 'Hello Mrs. Maple, could you call me back?' )\nout = tokenize( 'Hello World!', true )\n",
	"trim": "out = trim( ' \\t\\t\\n  Beep \\r\\n\\t  ' )\n",
	"trycatch": "function x() {\n  if ( base.random.randu() < 0.5 ) {\n      throw new Error( 'beep' );\n  }\n  return 1.0;\n};\nz = trycatch( x, -1.0 )\n",
	"trycatchAsync": "function x( clbk ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      clbk( new Error( 'beep' ) );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      // process error...\n  }\n  console.log( result );\n};\ntrycatchAsync( x, 'boop', done )\n",
	"tryFunction": "function fcn() { throw new Error( 'beep boop' ); };\nf = wrap( fcn );\nout = f();\nout.message\n",
	"tryRequire": "out = tryRequire( '_unknown_module_id_' )\n",
	"trythen": "function x() {\n  if ( base.random.randu() < 0.5 ) {\n      throw new Error( 'beep' );\n  }\n  return 1.0;\n};\nfunction y() {\n  return -1.0;\n};\nz = trythen( x, y )\n",
	"trythenAsync": "function x( clbk ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      clbk( new Error( 'beep' ) );\n  }\n};\nfunction y( clbk ) {\n  setTimeout( onTimeout, 0 );\n  function onTimeout() {\n      clbk( null, 'boop' );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\ntrythenAsync( x, y, done )\n",
	"ttest": "\n// One-sample t-test:\nrnorm = base.random.normal.factory( 0.0, 2.0, { 'seed': 5776 });\nx = new Array( 100 );\nfor ( var i = 0; i < x.length; i++ ) {\n  x[ i ] = rnorm();\n}\nout = ttest( x )\n\n// Paired t-test:\nrnorm = base.random.normal.factory( 1.0, 2.0, { 'seed': 786 });\nx = new Array( 100 );\ny = new Array( 100 );\nfor ( i = 0; i < x.length; i++ ) {\n  x[ i ] = rnorm();\n  y[ i ] = rnorm();\n}\nout = ttest( x, y )\n\n// Print formatted output:\ntable = out.print()\n\n// Choose custom significance level:\narr = [ 2, 4, 3, 1, 0 ];\nout = ttest( arr, { 'alpha': 0.01 });\ntable = out.print()\n\n// Test for a mean equal to five:\narr = [ 4, 4, 6, 6, 5 ];\nout = ttest( arr, { 'mu': 5 })\n\n// Perform one-sided tests:\narr = [ 4, 4, 6, 6, 5 ];\nout = ttest( arr, { 'alternative': 'less' });\ntable = out.print()\nout = ttest( arr, { 'alternative': 'greater' });\ntable = out.print()\n",
	"ttest2": "\n// Student's sleep data:\nx = [ 0.7, -1.6, -0.2, -1.2, -0.1, 3.4, 3.7, 0.8, 0.0, 2.0 ];\ny = [ 1.9, 0.8, 1.1, 0.1, -0.1, 4.4, 5.5, 1.6, 4.6, 3.4 ];\nout = ttest2( x, y )\n\n// Print table output:\ntable = out.print();\n\n// Choose a different significance level than `0.05`:\nout = ttest2( x, y, { 'alpha': 0.1 });\ntable = out.print();\n\n// Perform one-sided tests:\nout = ttest2( x, y, { 'alternative': 'less' });\ntable = out.print()\nout = ttest2( x, y, { 'alternative': 'greater' });\ntable = out.print()\n\n// Run tests with equal variances assumption:\nx = [ 2, 3, 1, 4 ];\ny = [ 1, 2, 3, 1, 2, 5, 3, 4 ];\nout = ttest2( x, y, { 'variance': 'equal' });\ntable = out.print();\n\n// Test for a difference in means besides zero:\nrnorm = base.random.normal.factory({ 'seed': 372 });\nx = new Array( 100 );\nfor ( i = 0; i < x.length; i++ ) {\n  x[ i ] = rnorm( 2.0, 3.0 );\n}\ny = new Array( 100 );\nfor ( i = 0; i < x.length; i++ ) {\n  y[ i ] = rnorm( 1.0, 3.0 );\n}\nout = ttest2( x, y, { 'difference': 1.0, 'variance': 'equal' })\n",
	"TWO_PI": "TWO_PI\n",
	"typedarray2json": "arr = new Float64Array( 2 );\narr[ 0 ] = 5.0;\narr[ 1 ] = 3.0;\njson = typedarray2json( arr )\n",
	"typedarray": "arr = typedarray()\narr = typedarray( 'float32' )\n",
	"typemax": "m = typemax( 'int8' )\nm = typemax( 'uint32' )\n",
	"typemin": "m = typemin( 'int8' )\nm = typemin( 'uint32' )\n",
	"typeOf": "\n// Built-ins:\nt = typeOf( 'a' )\nt = typeOf( 5 )\nt = typeOf( NaN )\nt = typeOf( true )\nt = typeOf( false )\nt = typeOf( null )\nt = typeOf( undefined )\nt = typeOf( [] )\nt = typeOf( {} )\nt = typeOf( function noop() {} )\nt = typeOf( new Symbol( 'beep' ) )\nt = typeOf( /.+/ )\nt = typeOf( new String( 'beep' ) )\nt = typeOf( new Number( 5 ) )\nt = typeOf( new Boolean( false ) )\nt = typeOf( new Array() )\nt = typeOf( new Object() )\nt = typeOf( new Int8Array( 10 ) )\nt = typeOf( new Uint8Array( 10 ) )\nt = typeOf( new Uint8ClampedArray( 10 ) )\nt = typeOf( new Int16Array( 10 ) )\nt = typeOf( new Uint16Array( 10 ) )\nt = typeOf( new Int32Array( 10 ) )\nt = typeOf( new Uint32Array( 10 ) )\nt = typeOf( new Float32Array( 10 ) )\nt = typeOf( new Float64Array( 10 ) )\nt = typeOf( new ArrayBuffer( 10 ) )\nt = typeOf( new Date() )\nt = typeOf( new RegExp( '.+ )') )\nt = typeOf( new Map() )\nt = typeOf( new Set() )\nt = typeOf( new WeakMap() )\nt = typeOf( new WeakSet() )\nt = typeOf( new Error( 'beep' ) )\nt = typeOf( new TypeError( 'beep' ) )\nt = typeOf( new SyntaxError( 'beep' ) )\nt = typeOf( new ReferenceError( 'beep' ) )\nt = typeOf( new URIError( 'beep' ) )\nt = typeOf( new RangeError( 'beep' ) )\nt = typeOf( new EvalError( 'beep' ) )\nt = typeOf( Math )\nt = typeOf( JSON )\n\n// Arguments object:\nfunction beep() { return arguments; };\nt = typeOf( beep() )\n\n// Node.js Buffer object:\nt = typeOf( new Buffer( 10 ) )\n\n// Custom constructor:\nfunction Person() { return this };\nt = typeOf( new Person() )\n\n// Anonymous constructor:\nFoo = function () { return this; };\nt = typeOf new Foo() )\n",
	"Uint16Array": "arr = new Uint16Array()\n",
	"UINT16_MAX": "UINT16_MAX\n",
	"UINT16_NUM_BYTES": "UINT16_NUM_BYTES\n",
	"Uint32Array": "arr = new Uint32Array()\n",
	"UINT32_MAX": "UINT32_MAX\n",
	"UINT32_NUM_BYTES": "UINT32_NUM_BYTES\n",
	"Uint8Array": "arr = new Uint8Array()\n",
	"Uint8ClampedArray": "arr = new Uint8ClampedArray()\n",
	"UINT8_MAX": "UINT8_MAX\n",
	"UINT8_NUM_BYTES": "UINT8_NUM_BYTES\n",
	"uncapitalize": "out = uncapitalize( 'Beep' )\nout = uncapitalize( 'bOOp' )\n",
	"uncapitalizeKeys": "obj = { 'AA': 1, 'BB': 2 };\nout = uncapitalizeKeys( obj )\n",
	"uncurry": "function addX( x ) {\n  return function addY( y ) {\n      return x + y;\n  };\n};\nfcn = uncurry( addX );\nsum = fcn( 2, 3 )\n\n// To enforce a fixed number of parameters, provide an `arity` argument:\nfunction add( x ) {\n  return function add( y ) {\n      return x + y;\n  };\n};\nfcn = uncurry( add, 2 );\nsum = fcn( 9 )\n\n// To specify an execution context, provide a `thisArg` argument:\nfunction addX( x ) {\n  this.x = x;\n  return addY;\n};\nfunction addY( y ) {\n  return this.x + y;\n};\nfcn = uncurry( addX, {} );\nsum = fcn( 2, 3 )\n",
	"uncurryRight": "function addX( x ) {\n  return function addY( y ) {\n      return x + y;\n  };\n};\nfcn = uncurryRight( addX );\nsum = fcn( 3, 2 )\n\n// To enforce a fixed number of parameters, provide an `arity` argument:\nfunction add( y ) {\n  return function add( x ) {\n      return x + y;\n  };\n};\nfcn = uncurryRight( add, 2 );\nsum = fcn( 9 )\n\n// To specify an execution context, provide a `thisArg` argument:\nfunction addY( y ) {\n  this.y = y;\n  return addX;\n};\nfunction addX( x ) {\n  return x + this.y;\n};\nfcn = uncurryRight( addY, {} );\nsum = fcn( 3, 2 )\n",
	"UNICODE_MAX": "UNICODE_MAX\n",
	"UNICODE_MAX_BMP": "UNICODE_MAX_BMP\n",
	"unshift": "\n// Arrays:\narr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];\narr = unshift( arr, 6.0, 7.0 )\n\n// Typed arrays:\narr = new Float64Array( [ 1.0, 2.0 ] );\narr = unshift( arr, 3.0, 4.0 )\n\n// Array-like object:\narr = { 'length': 1, '0': 1.0 };\narr = unshift( arr, 2.0, 3.0 )\n",
	"until": "function predicate( i ) { return ( i >= 5 ); };\nfunction beep( i ) { console.log( 'boop: %d', i ); };\nuntil( predicate, beep )\n",
	"untilAsync": "function predicate( i, clbk ) { clbk( null, i >= 5 ); };\nfunction fcn( i, next ) {\n  setTimeout( onTimeout, i );\n  function onTimeout() {\n      next( null, 'boop'+i );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nuntilAsync( predicate, fcn, done )\n",
	"untilEach": "function predicate( v ) { return v !== v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, 2, 3, 4, NaN, 5 ];\nuntilEach( arr, predicate, logger )\n",
	"untilEachRight": "function predicate( v ) { return v !== v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, NaN, 2, 3, 4, 5 ];\nuntilEachRight( arr, predicate, logger )\n",
	"unzip": "\n// Basic usage:\narr = [ [ 1, 'a', 3 ], [ 2, 'b', 4 ] ];\nout = unzip( arr )\n\n// Provide indices:\narr = [ [ 1, 'a', 3 ], [ 2, 'b', 4 ] ];\nout = unzip( arr, [ 0, 2 ] )\n",
	"uppercase": "out = uppercase( 'bEEp' )\n",
	"uppercaseKeys": "obj = { 'a': 1, 'b': 2 };\nout = uppercaseKeys( obj )\n",
	"US_STATES_ABBR": "list = US_STATES_ABBR()\n",
	"US_STATES_CAPITALS": "list = US_STATES_CAPITALS()\n",
	"US_STATES_CAPITALS_NAMES": "out = US_STATES_CAPITALS_NAMES()\n",
	"US_STATES_NAMES": "list = US_STATES_NAMES()\n",
	"US_STATES_NAMES_CAPITALS": "out = US_STATES_NAMES_CAPITALS()\n",
	"utf16ToUTF8Array": "str = '☃';\nout = utf16ToUTF8Array( str )\n",
	"waterfall": "function foo( next ) { next( null, 'beep' ); };\nfunction bar( str, next ) { console.log( str ); next(); };\nfunction done( error ) { if ( error ) { throw error; } };\nfcns = [ foo, bar ];\nwaterfall( fcns, done );\n",
	"whilst": "function predicate( i ) { return ( i < 5 ); };\nfunction beep( i ) { console.log( 'boop: %d', i ); };\nwhilst( predicate, beep )\n",
	"whileAsync": "function predicate( i, clbk ) { clbk( null, i < 5 ); };\nfunction fcn( i, next ) {\n  setTimeout( onTimeout, i );\n  function onTimeout() {\n      next( null, 'boop'+i );\n  }\n};\nfunction done( error, result ) {\n  if ( error ) {\n      throw error;\n  }\n  console.log( result );\n};\nwhileAsync( predicate, fcn, done )\n",
	"whileEach": "function predicate( v ) { return v === v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, 2, 3, 4, NaN, 5 ];\nwhileEach( arr, predicate, logger )\n",
	"whileEachRight": "function predicate( v ) { return v === v; };\nfunction logger( v, i ) { console.log( '%s: %d', i, v ); };\narr = [ 1, NaN, 2, 3, 4, 5 ];\nwhileEachRight( arr, predicate, logger )\n",
	"zip": "\n// Basic usage:\nout = zip( [ 1, 2 ], [ 'a', 'b' ] )\n\n// Turn off truncation:\nopts = { 'trunc': false };\nout = zip( [ 1, 2, 3 ], [ 'a', 'b' ], opts )\n",
	"ztest": "\n// One-sample z-test:\nrnorm = base.random.normal.factory( 0.0, 2.0, { 'seed': 212 });\nx = new Array( 100 );\nfor ( var i = 0; i < x.length; i++ ) {\n  x[ i ] = rnorm();\n}\nout = ztest( x, 2.0 )\n\n// Choose custom significance level and print output:\narr = [ 2, 4, 3, 1, 0 ];\nout = ztest( arr, 2.0, { 'alpha': 0.01 });\ntable = out.print()\n\n// Test for a mean equal to five:\narr = [ 4, 4, 6, 6, 5 ];\nout = ztest( arr, 1.0, { 'mu': 5 })\n\n// Perform one-sided tests:\narr = [ 4, 4, 6, 6, 5 ];\nout = ztest( arr, 1.0, { 'alternative': 'less' });\nout = ztest( arr, 1.0, { 'alternative': 'greater' });\n",
	"ztest2": "\n// Drawn from Normal(0,2):\nx = [ -0.21, 0.14, 1.65, 2.11, -1.86, -0.29, 1.48, 0.81, 0.86, 1.04 ];\n\n// Drawn from Normal(1,2):\ny = [ -1.53, -2.93, 2.34, -1.15, 2.7, -0.12, 4.22, 1.66, 3.43, 4.66 ];\nout = ztest2( x, y, 2.0, 2.0 )\n\n// Print table output:\ntable = out.print();\n\n// Choose a different significance level than `0.05`:\nout = ztest2( x, y, 2.0, 2.0, { 'alpha': 0.4 });\ntable = out.print();\n\n// Perform one-sided tests:\nout = ztest2( x, y, 2.0, 2.0, { 'alternative': 'less' });\ntable = out.print()\nout = ztest2( x, y, 2.0, 2.0, { 'alternative': 'greater' });\ntable = out.print()\n\n// Test for a difference in means besides zero:\nrnorm = base.random.normal.factory({ 'seed': 372 });\nx = new Array( 100 );\nfor ( i = 0; i < x.length; i++ ) {\n  x[ i ] = rnorm( 2.0, 1.0 );\n}\ny = new Array( 100 );\nfor ( i = 0; i < x.length; i++ ) {\n  y[ i ] = rnorm( 0.0, 2.0 );\n}\nout = ztest2( x, y, 1.0, 2.0, { 'difference': 2.0 })\n"
};

},{}],58:[function(require,module,exports){
'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var EXAMPLES = require( './db.js' );


// MAIN //

/**
* Returns REPL examples.
*
* @returns {Object} examples
*
* @example
* var o = examples();
* // returns {...}
*/
function examples() {
	return copy( EXAMPLES );
} // end FUNCTION examples()


// EXPORTS //

module.exports = examples;

},{"./db.js":57,"@stdlib/utils/copy":65}],59:[function(require,module,exports){
'use strict';

/**
* REPL examples.
*
* @module @stdlib/repl/code-blocks
*
* @example
* var examples = require( '@stdlib/repl/code-blocks' );
*
* var o = examples();
* // returns {...}
*/

// MODULES //

var examples = require( './examples.js' );


// EXPORTS //

module.exports = examples;

},{"./examples.js":58}],60:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isPlainObject = require( '@stdlib/assert/is-plain-object' );
var examples = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof examples, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns REPL examples', function test( t ) {
	var o1;
	var o2;

	o1 = examples();
	t.strictEqual( isPlainObject( o1 ), true, 'returns an object' );

	o2 = examples();
	t.strictEqual( isPlainObject( o2 ), true, 'returns an object' );
	t.notEqual( o1, o2, 'returns new reference' );

	t.end();
});


}).call(this,"/lib/node_modules/@stdlib/repl/code-blocks/test/test.js")
},{"./../lib":59,"@stdlib/assert/is-plain-object":36,"tape":153}],61:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":7,"@stdlib/regexp/function-name":55,"@stdlib/utils/native-class":81}],62:[function(require,module,exports){
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
* var value = [
*     {
*         'a': 1,
*         'b': true,
*         'c': [ 1, 2, 3 ]
*     }
* ];
* var out = copy( value );
* // returns [ { 'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ]
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

},{"./deep_copy.js":64,"@stdlib/assert/is-array":5,"@stdlib/assert/is-nonnegative-integer":23,"@stdlib/math/constants/float64-pinf":53}],64:[function(require,module,exports){
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
* var value = [
*     {
*         'a': 1,
*         'b': true,
*         'c': [ 1, 2, 3 ]
*     }
* ];
* var out = copy( value );
* // returns [ {'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ]
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

},{"@stdlib/assert/is-string":39,"@stdlib/regexp/regexp":56}],87:[function(require,module,exports){
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

},{"./helpers/isFinite":107,"./helpers/isNaN":108,"./helpers/mod":109,"./helpers/sign":110,"es-to-primitive/es5":111,"has":117,"is-callable":121}],107:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
'use strict';

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
},{}]},{},[60]);
